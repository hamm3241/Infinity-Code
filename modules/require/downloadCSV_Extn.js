define(function () {
  return {
    commonDownloadCSV: function(list, fileName){
      
      var json = list;

      var fields = Object.keys(json[0]);
      var replacer = function(key, value) { return value === null ? '' : value; }; 
      var csv = json.map(function(row){
        return fields.map(function(fieldName){
          return JSON.stringify(row[fieldName], replacer);
        }).join(',');
      });
      csv.unshift(fields.join(',')); 
      var csvcontent = "data:text/csv;charset=utf-8," + csv.join('\r\n');
      var encodedUri = encodeURI(csvcontent);

      var downloadLink = document.createElement("a");
      downloadLink.href = encodedUri;
      downloadLink.download = fileName;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
   /* downloads csv file with given data
    * @param: csv data, filename
    */
    downloadCSVFileFromCSVResponse : function(csvData,fileName){
      var csvcontent = "data:text/csv;charset=utf-8," + csvData;
      var encodedUri = encodeURI(csvcontent);
      var downloadLink = document.createElement("a");
      downloadLink.href = encodedUri;
      downloadLink.download = fileName+".csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      kony.adminConsole.utils.hideProgressBar(this.view);
      kony.print("---- CSV file downloaded----");
    },
    
    callDownloadCSVService : function(mfDownloadURL,fileName){
      try {
        var self =this;
        var xhr = new kony.net.HttpRequest();
        xhr.open(constants.HTTP_METHOD_POST, mfDownloadURL, false);
        var authToken = KNYMobileFabric.currentClaimToken;
        xhr.setRequestHeader("X-Kony-Authorization", authToken);
        function downloadCallback()
        {
          try 
          {
            if(xhr.readyState === 4 && xhr.status === 200)
            {
              self.downloadCSVFileFromCSVResponse(xhr.response,fileName);
              kony.print("---- CSV response Fetched successfully ----");
            }
            else if (xhr.status !== 200) {
              kony.print(" ERROR: Error downloadin csv");
            }
          }
          catch(err)
          { 
           kony.print(" ERROR:" + err);
          }
        }
        xhr.onReadyStateChange = downloadCallback; 
        xhr.send();
      } catch (err) {
        kony.print(" ERROR:" + err);
      }
    }
  };
});
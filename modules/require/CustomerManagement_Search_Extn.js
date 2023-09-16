define(function () {
  return {
    search: function(SegmentWidget, searchParameters, rtxMsg, defaultScrollWidget, NumberofRecords, LoadMoreRow, listOfWidgetsToHide){
          //Show progress bar
          kony.adminConsole.utils.showProgressBar(this.view);

          var data = (SegmentWidget.info && SegmentWidget.info.data)?SegmentWidget.info.data:[];
          data = data.filter(searchFilter);
          if(data.length === 0){
            rtxMsg.setVisibility(true);
            this.changeVisibility(listOfWidgetsToHide, false);
            SegmentWidget.setVisibility(false);
            
          }else{
            rtxMsg.setVisibility(false);
            this.changeVisibility(listOfWidgetsToHide, true);
            SegmentWidget.setVisibility(true);
            
            SegmentWidget.info.searchAndSortData = data;
            
            if(data.length > NumberofRecords) {
              var newData = data.slice(0,NumberofRecords);
              newData.push(LoadMoreRow);
              SegmentWidget.setData(newData);
            }
            else {
              SegmentWidget.setData(data);
            }
          }
          this.view.forceLayout();
          //Scroll to certain height
          if(kony.application.getCurrentForm().id !== "frmCompanies"){
            if(defaultScrollWidget === "TOEND"){
              this.view.flxMainContent.scrollToEnd();
            }else{
              this.view.flxMainContent.scrollToWidget(defaultScrollWidget);
            }
          }
          //Hide progress bar
          kony.adminConsole.utils.hideProgressBar(this.view);
          
          //Search function
          function searchFilter(searchModel) {
            var flag = false;
            for(var i=0; i<searchParameters.length; i++){
              if(flag) break;
              else{
                if(typeof searchParameters[i].searchValue === 'string' && searchParameters[i].searchValue.length >0){
                  var searchKey = searchModel[""+searchParameters[i].searchKey] ? ((typeof searchModel[""+searchParameters[i].searchKey] === 'string') ?
                                                                                   searchModel[""+searchParameters[i].searchKey] : searchModel[""+searchParameters[i].searchKey].info) :
                                                                                   "";
                  flag = (searchKey || "").toLowerCase().indexOf(searchParameters[i].searchValue.toLowerCase()) !== -1;
                }else{
                  return true;
                }
              }
            }
            return flag;
          }
      },
      clearSearch : function(SegmentWidget, rtxMsg, defaultScrollWidget,NumberofRecords, LoadMoreRow, listOfWidgetsToHide){
        if(SegmentWidget.info.data.length === 0){
          rtxMsg.setVisibility(true);
          this.changeVisibility(listOfWidgetsToHide, false);
          SegmentWidget.setVisibility(false);
        }else{
          rtxMsg.setVisibility(false);
          this.changeVisibility(listOfWidgetsToHide, true);
          SegmentWidget.setVisibility(true);
          
          SegmentWidget.info.searchAndSortData = SegmentWidget.info.data;

          if(SegmentWidget.info.data.length > NumberofRecords) {
            var newData = SegmentWidget.info.data.slice(0,NumberofRecords);
            newData.push(LoadMoreRow);
            SegmentWidget.setData(newData);
          }
          else {
            SegmentWidget.setData(SegmentWidget.info.data);
          }
        }
        this.view.forceLayout();
        if(kony.application.getCurrentForm().id !== "frmCompanies"){
          if(defaultScrollWidget === "TOEND"){
            this.view.flxMainContent.scrollToEnd();
          }else{
            this.view.flxMainContent.scrollToWidget(defaultScrollWidget);
          }
        }
      },
      changeVisibility : function(listOfWidgets, visibility){
        if(listOfWidgets){
          for(var i=0; i<listOfWidgets.length; i++){
            listOfWidgets[i].setVisibility(visibility);
          }
        }
      }
  };
});
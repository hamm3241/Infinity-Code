define(function () {
  function MasterResetBusinessController(){

  }
  
  MasterResetBusinessController.prototype.doMasterReset = function(serviceConfig, callBack) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(serviceConfig.objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(serviceConfig.objName);
    for(var key in serviceConfig.payload){
      dataObject.addField(key,serviceConfig.payload[key]);
    }
    var options = {
      "dataObject": dataObject
    };

    objSvc.customVerb(
      serviceConfig.operationName, 
      options,
      function(response) {
        kony.print("Master Reset Network Call Success");
        let res = {};
        res.action = serviceConfig.operationName;
        res.result = response.opstatus === 0 &&
                     response.responseCode === "0" &&
                     response.successCode === "200" ? "Success" : "Failed";
        callBack(res);
      },
      function(error) {
        kony.print("Master Reset Network Call Failed: "+error);
        let res = {};
        res.action = serviceConfig.operationName;
        res.result = "Failed";
        callBack(res);
      });
  };

  return MasterResetBusinessController;
});
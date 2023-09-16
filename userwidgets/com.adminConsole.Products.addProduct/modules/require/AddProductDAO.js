define(function () {
  function AddProductDAO() {
  }
  
  AddProductDAO.prototype.fetchProductInformation = function(objServiceName, objName, operationName, payload, callBack, isCreateEditJSON){
    let isCreateProduct = false;
    let isEditProduct = false;
    let createEditMsg = "";
    if(isCreateEditJSON!==null){
      isCreateProduct = isCreateEditJSON.isCreateProduct;
      isEditProduct = isCreateEditJSON.isEditProduct;
      if(isCreateProduct) createEditMsg="New Product Added Successfully.";
      else if(isEditProduct) createEditMsg="Product Edited Successfully.";
    }
    
    callBack({ 
      progressBar: {show:"success"}
    });
    let objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(let key in payload){
      dataObject.addField(key,payload[key]);
    }
    let options = {
      "dataObject": dataObject
    };

    function setProgressBarVisibility(showProgressBar = false){
      callBack({
        progressBar: {
          show: showProgressBar === true ? "success" : "hide"
        }
      });
    }
    
    function successcallback(response){
      kony.print("Backend Call for " + operationName + " is successful. " + JSON.stringify(response));
      response.action = operationName;
      if(isCreateProduct || isEditProduct){
        callBack({
          progressBar: {show:"hide"},
        });
        callBack({
          toastModel:{
            status : "success",
            message: createEditMsg
          }
        });
        callBack(response);
      } else {
        callBack(response);
        if(response.action === 'createProductFacility'){
          setProgressBarVisibility(true); 
        } else {
          setProgressBarVisibility(false);
        }
      }
    }
    
    function failurecallback(error) {
      kony.print("Backend Call for " + operationName + " has failed. " + JSON.stringify(error));
      callBack({
        progressBar: {show : "hide"},
        toastModel:{
          status : "fail",
          message: error.dbpErrMsg
        }
      });
    }
    function completionCallBack(response) {
      if (response.dbpErrCode||response.status==="Failure") failurecallback(response);
      else successcallback(response);
    }
      objSvc.customVerb(operationName,options,completionCallBack);
    };
  
  return AddProductDAO;
});
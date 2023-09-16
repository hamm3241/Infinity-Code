define(function () {
  function viewProductsDAO(){

  }

  viewProductsDAO.prototype.productOperations = function(objServiceName, objName, operationName, criteria, callBack, unicode) {
    callBack({ 
      progressBar : {
        show : "success"
      }
    });
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options = {
      "dataObject": dataObject
    };
    function errorCallBack(error) {
      kony.print("Failed to perform operation: " + JSON.stringify(error));
      var errMsg = error ? (error.message || error.dbpErrMsg) :"";
      callBack({ 
        progressBar : {
          show : "fail"
        },
        toastModel : {
          status : "fail",
          message: errMsg? errMsg : "Failed to perform operation, please check network call"
        }
      });
    }
    function sucessCallBack(response) {
      if(response.dbpErrMsg){
        errorCallBack(response);
      } else{
        response.action = operationName;
        callBack(response);
        kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
        callBack({ 
          progressBar : {
            show : "fail"
          },
        });
      }
    }
    objSvc.customVerb(
      operationName, 
      options,
      sucessCallBack,
      errorCallBack);
  };

  return viewProductsDAO;
});
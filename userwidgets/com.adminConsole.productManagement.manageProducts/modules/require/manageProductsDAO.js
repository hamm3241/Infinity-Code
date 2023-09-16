define(function () {
  function manageProductsDAO(){

  }

  manageProductsDAO.prototype.productOperations = function(objServiceName, objName, operationName, criteria, callBack, unicode) {
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

    objSvc.customVerb(
      operationName, 
      options,
      function(response) {
        response.action = operationName;
        callBack(response);
        kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
        callBack({ 
          progressBar : {
            show : "fail"
          },
        });
      },
      function(error) {
        kony.print("Failed to perform operation: " + JSON.stringify(error));
        callBack({ 
          progressBar : {
            show : "fail"
          },
          toastModel : {
            status : "fail",
			message: error? error.message? error.message : "Failed to perform operation, please check network call" : "Failed to perform operation, please check network call"
          }
        });
      });
  };

  return manageProductsDAO;
});
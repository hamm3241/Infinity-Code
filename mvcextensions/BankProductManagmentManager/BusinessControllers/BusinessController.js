define(['ModelManager'], function (ModelManager) {
  /**
     * BankProductManagmentManager manages models: product
     */
  function BankProductManagmentManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(BankProductManagmentManager, kony.mvc.Business.Delegator);

  BankProductManagmentManager.prototype.initializeBusinessController = function () {

  };


  /**
     * @name getProducts
     * @member BankProductManagmentManager.businessController
     * @param {} context
     * @param (...callbackArgs:{records : [{lastmodifiedts : object, productId : object, Status_id : object, rates : object, createdts : object, softdeleteflag : object, productName : object, productTypeId : object, termsAndConditions : object, features : object, createdby : object, modifiedby : object, synctimestamp : object, productType : object, productDescription : object, info : object, Type_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BankProductManagmentManager.prototype.getProducts = function(context, onSuccess, onError){
    ModelManager.invoke("product", "getProductList", context, onSuccess, onError);
  };
  
  BankProductManagmentManager.prototype.getProductListFromMS = function(context, onSuccess, onError){
    ModelManager.invoke("product", "getProductListFromMS", context, onSuccess, onError);
  };

  BankProductManagmentManager.prototype.getFacilities = function(context, onSuccess, onError){
    ModelManager.invoke("bankFacility", "getFacilities", context, onSuccess, onError);
  };

  BankProductManagmentManager.prototype.getFacilityDetails = function(payload, onSuccess, onError){
    ModelManager.invoke("bankFacility", "getFacilities", payload, onSuccess, onError);
  };

  BankProductManagmentManager.prototype.createFacility = function(payload, onSuccess, onError){
    ModelManager.invoke("bankFacility", "createFacility", payload, onSuccess, onError);
  };
  BankProductManagmentManager.prototype.editFacility = function(payload, onSuccess, onError){
    ModelManager.invoke("bankFacility", "editFacility", payload, onSuccess, onError);
  };
  return BankProductManagmentManager;
});
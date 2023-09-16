define(['ModelManager'], function (ModelManager) {
  /**
     * MasterDataManager manages models: systemconfiguration
     */
  function MasterDataManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(MasterDataManager, kony.mvc.Business.Delegator);

  MasterDataManager.prototype.initializeBusinessController = function () {

  };

  /**
   * @name getPhraseStatus
   * @member SecurityModule.businessController
   * @param {} payload
   * @param (response:string)=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.getPhraseStatus = function(payload, onSuccess, onError){
    kony.print("Inside getPhraseStatus() of MasterDataManager.BusinessController");
    var  self  =  this;

    try {
      ModelManager.invoke('systemconfiguration','getSystemConfiguration',{}, function(response){
        var phraseStatus = "";
          for (var i = 0; i < Object.keys(response).length; ++i) {
            if (response[i].PropertyName === "IS_PHRASE_ALLOWED") {
              phraseStatus = response[i].PropertyValue;
              break;
            }
          }
          onSuccess(phraseStatus);
      }, onError);
    } catch (err) {
      onError(err);
    }

  };

  /**
   * @name editPhraseStatus
   * @member SecurityModule.businessController
   * @param {phraseStatus : number} phraseJSON
   * @param (response:{opstatus : number, updatedRecords : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.editPhraseStatus = function(payload, onSuccess, onError){
    ModelManager.invoke('systemconfiguration', 'updateSystemConfiguration',{
      "user_ID" : kony.mvc.MDAApplication.getSharedInstance().appContext.userID , 
      "propertyName" : "IS_PHRASE_ALLOWED" , 
      "propertyValue" : payload.phraseStatus
    },onSuccess, onError);
  };
  /**
   * @name getApplications
   * @member MasterDataManager.businessController
   * @param (response:{})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.getApplications = function(payload, onSuccess, onError){
    ModelManager.invoke('app', 'getApplications',payload,onSuccess, onError);
  };
  /**
   * @name getCustomerTypes
   * @member MasterDataManager.businessController
   * @param (response:{})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.getCustomerTypes = function(payload, onSuccess, onError){
    ModelManager.invoke('customertype', 'getCustomerTypes',payload,onSuccess, onError);
  };
  /**
   * @name getLocales
   * @member MasterDataManager.businessController
   * @param (response:{})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.getLocales = function(payload, onSuccess, onError){
    ModelManager.invoke('locale', 'getLocales',payload,onSuccess, onError);
  };
  /**
   * @name getLimitGroups
   * @member MasterDataManager.businessController
   * @param (response:{})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.getLimitGroups = function(context,onSuccess, onError){
    ModelManager.invoke('feature', 'getLimitGroups',context,onSuccess, onError);
  };
  /**
   * @name editLimitGroup
   * @member MasterDataManager.businessController
   * @param (response:{})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.editLimitGroup = function(context,onSuccess, onError){
    ModelManager.invoke('feature', 'editLimitGroup',context,onSuccess, onError);
  };
  /**
   * @name getJWTToken
   * @member MasterDataManager.businessController
   * @param (response:{})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  MasterDataManager.prototype.getJWTToken = function(payload, onSuccess, onError){
    ModelManager.invoke('Analytics', 'GetJWTToken',payload,onSuccess, onError);
  };


  return MasterDataManager;
});
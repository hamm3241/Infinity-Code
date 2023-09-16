define(['ModelManager'], function (ModelManager) {
  /**
     * TermsAndConditionsManager manages models: termsAndConditions
     */
  function TermsAndConditionsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(TermsAndConditionsManager, kony.mvc.Business.Delegator);

  TermsAndConditionsManager.prototype.initializeBusinessController = function () {

  };

  /**
   * @name getAllTermsAndConditions
   * @member TermsAndConditionsManager.businessController
   * @param {} context
   * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  TermsAndConditionsManager.prototype.getAllTermsAndConditions = function(context, onSuccess, onError) {
    ModelManager.invoke('termsandconditions', 'getAllTermsAndConditions', {}, onSuccess, onError);
  };
  /**
   * @name editTermsAndConditions
   * @member TermsAndConditionsManager.businessController
   * @param {} context
   * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  TermsAndConditionsManager.prototype.editTermsAndConditions = function(context, onSuccess, onError) {
    ModelManager.invoke('termsandconditions', 'editTermsAndConditions', context, onSuccess, onError);
  };
  /**
   * @name getTermsAndConditions
   * @member TermsAndConditionsManager.businessController
   * @param (...callbackArgs)=>any onError
   */
  TermsAndConditionsManager.prototype.getTermsAndConditions = function(context, onSuccess, onError) {
    ModelManager.invoke('termsandconditions', 'getTermsAndConditions', context, onSuccess, onError);
  };
  /**
   * @name createContentVer
   * @member TermsAndConditionsManager.businessController
   * @param (...callbackArgs)=>any onError
   */
  TermsAndConditionsManager.prototype.createContentVer = function(context, onSuccess, onError) {
    ModelManager.invoke('termsandconditions', 'createTermsAndConditionsVersion', context, onSuccess, onError);
  };
  /**
   * @name deleteContentVer
   * @member TermsAndConditionsManager.businessController
   * @param (...callbackArgs)=>any onError
   */
  TermsAndConditionsManager.prototype.deleteContentVer = function(context, onSuccess, onError) {
    ModelManager.invoke('termsandconditions', 'deleteTermsAndConditionsVersion', context, onSuccess, onError);
  };

  return TermsAndConditionsManager;
});
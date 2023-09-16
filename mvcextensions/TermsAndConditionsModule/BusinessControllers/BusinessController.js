define([],function () {

    function TermsAndConditionsModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(TermsAndConditionsModule_BusinessController, kony.mvc.Business.Delegator);
    
    TermsAndConditionsModule_BusinessController.prototype.initializeBusinessController = function(){
    };
    /**
     * @name getTermsAndCond
     * @member TermsAndConditionsModule.businessController
     * @param {} context
     * @param (response:{records : [{lastmodifiedts : object, Description : object, createdby : object, Status_id : object, modifiedby : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    TermsAndConditionsModule_BusinessController.prototype.getTermsAndCond = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.getTermsAndCond(context, onSuccess, onError);
    };
      
    TermsAndConditionsModule_BusinessController.prototype.addTermsAndCond = function(createdData, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.addTermsAndCond(createdData, onSuccess, onError);
    };
     TermsAndConditionsModule_BusinessController.prototype.getAllLocaleLanguagesList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.getLocales(context, onSuccess, onError);
    };
    TermsAndConditionsModule_BusinessController.prototype.updateTermsAndCond = function(editedData, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.updateTermsAndCond(editedData, onSuccess, onError);
    };
    
    TermsAndConditionsModule_BusinessController.prototype.deleteTermsAndCond = function(deletedData, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.deleteTermsAndCond(deletedData, onSuccess, onError);
    };
    /**
     * @name getAllTermsAndConditions
     * @member TermsAndConditionsModule.businessController
     * @param {} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    TermsAndConditionsModule_BusinessController.prototype.getAllTermsAndConditions = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("TermsAndConditionsManager")
        .businessController.getAllTermsAndConditions(context, onSuccess, onError);
    };
    /**
     * @name editTermsAndConditions
     * @member TermsAndConditionsModule.businessController
     * @param {} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    TermsAndConditionsModule_BusinessController.prototype.editTermsAndConditions = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("TermsAndConditionsManager")
        .businessController.editTermsAndConditions(context, onSuccess, onError);
    };
    /**
     * @name getTermsAndConditions
     * @member TermsAndConditionsModule.businessController
     * @param {} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    TermsAndConditionsModule_BusinessController.prototype.getTermsAndConditions = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("TermsAndConditionsManager")
        .businessController.getTermsAndConditions(context, onSuccess, onError);
    };
  /**
     * @name createContentVer
     * @member TermsAndConditionsModule.businessController
     * @param {termsAndConditionsCode: object,languageCode: object,contentType: object,termsAndConditionsContent: object,isSave: object}context
     * @param (response:{"opstatus": 0,"status": "Success","httpStatusCode": 0})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  TermsAndConditionsModule_BusinessController.prototype.createContentVer = function(createdData, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("TermsAndConditionsManager")
        .businessController.createContentVer(createdData, onSuccess, onError);
    };
  TermsAndConditionsModule_BusinessController.prototype.deleteTermsAndCond = function(deletedData, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("TermsAndConditionsManager")
        .businessController.deleteContentVer(deletedData, onSuccess, onError);
    };
    TermsAndConditionsModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  
    return TermsAndConditionsModule_BusinessController;
});
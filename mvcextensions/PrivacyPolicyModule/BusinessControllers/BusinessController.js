define([],function () {

  function PrivacyPolicyModule_BusinessController(){
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(PrivacyPolicyModule_BusinessController, kony.mvc.Business.Delegator);

  PrivacyPolicyModule_BusinessController.prototype.initializeBusinessController = function(){
  };


  /**
     * @name getPrivacyPolicy
     * @member PrivacyPolicyModule.businessController
     * @param {} payload
     * @param (response:{privacypolicy : [], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  PrivacyPolicyModule_BusinessController.prototype.getPrivacyPolicy = function(payload, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("StaticContentManager")
      .businessController.getPrivacyPolicy(payload, onSuccess, onError);
  };


  /**
     * @name addPrivacyPolicy
     * @member PrivacyPolicyModule.businessController
     * @param {user_ID : string, PrivacyPolicyData : {Status_id : string, Description : string, Channel_id : string}} createParam
     * @param (response:{PrivacyPolicyCreateStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  PrivacyPolicyModule_BusinessController.prototype.addPrivacyPolicy = function(createParam, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("StaticContentManager")
      .businessController.addPrivacyPolicy(createParam, onSuccess, onError);
  };


  /**
     * @name updatePrivacyPolicy
     * @member PrivacyPolicyModule.businessController
     * @param {user_ID : string, PrivacyPolicyData : {Status_id : string}} updateParam
     * @param (response:{PrivacyPolicyEditStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  PrivacyPolicyModule_BusinessController.prototype.updatePrivacyPolicy = function(updateParam, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("StaticContentManager")
      .businessController.updatePrivacyPolicy(updateParam, onSuccess, onError);
  };


  /**
     * @name deletePrivacyPolicy
     * @member PrivacyPolicyModule.businessController
     * @param {user_ID : string, id : string} deleteParam
     * @param (response:{opstatus : number, PrivacyPolicyDeleteStatus : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  PrivacyPolicyModule_BusinessController.prototype.deletePrivacyPolicy = function(deleteParam, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("StaticContentManager")
      .businessController.deletePrivacyPolicy(deleteParam, onSuccess, onError);
  };



  PrivacyPolicyModule_BusinessController.prototype.execute = function(command){
    kony.mvc.Business.Controller.prototype.execute.call(this,command);
  };

  return PrivacyPolicyModule_BusinessController;
});
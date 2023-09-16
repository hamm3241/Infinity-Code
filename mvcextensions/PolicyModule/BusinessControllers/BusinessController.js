define([],function () {

    function PolicyModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(PolicyModule_BusinessController, kony.mvc.Business.Delegator);
    
    PolicyModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	/**
     * @name getUsernameAndPasswordPolicies
     * @member PolicyModule.businessController
     * @param {} payload
     * @param (response:[{id : string, policyDescription : string, policyName : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PolicyModule_BusinessController.prototype.getUsernameAndPasswordPolicies = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.getUsernameAndPasswordPolicies(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.fetchUsernamePoliciesCustomer = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.fetchUsernamePoliciesCustomer(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.getLocaleList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.getLocaleList(payload, onSuccess, onError);
    };
   PolicyModule_BusinessController.prototype.fetchPasswordPoliciesCustomer = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.fetchPasswordPoliciesCustomer(payload, onSuccess, onError);
    };
   PolicyModule_BusinessController.prototype.createPasswordPolicy = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.createPasswordPolicy(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.createUsernamePolicy = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.createUsernamePolicy(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.getUsernamePolicy = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.getUsernamePolicy(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.getPasswordPolicy = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.getPasswordPolicy(payload, onSuccess, onError);
    };
   PolicyModule_BusinessController.prototype.updatePasswordRules = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.updatePasswordRules(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.updateUsernameRules = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.updateUsernameRules(payload, onSuccess, onError);
    };
   PolicyModule_BusinessController.prototype.deleteUsernamePolicy = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.deleteUsernamePolicy(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.deletePasswordPolicy = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.deletePasswordPolicy(payload, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.getPasswordRules = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.getPasswordRules({}, onSuccess, onError);
    };
  PolicyModule_BusinessController.prototype.getUsernameRules = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("PoliciesManager")
        .businessController.getUsernameRules({}, onSuccess, onError);
    };
    return PolicyModule_BusinessController;
});
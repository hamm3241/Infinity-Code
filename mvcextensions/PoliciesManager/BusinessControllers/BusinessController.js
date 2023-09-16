define(['ModelManager'], function (ModelManager) {
  /**
     * PoliciesManager manages models: policies
     */
  function PoliciesManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(PoliciesManager, kony.mvc.Business.Delegator);

  PoliciesManager.prototype.initializeBusinessController = function () {

  };

	/**
     * @name getUsernameAndPasswordRulesAndPolicies
     * @member PoliciesManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{id : string, policyDescription : string, policyName : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  PoliciesManager.prototype.getUsernameAndPasswordPolicies = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getUsernameAndPasswordPolicies', {}, onSuccess, onError);
  };
   PoliciesManager.prototype.getPasswordRules = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getPasswordRules', {}, onSuccess, onError);
  };
   PoliciesManager.prototype.getUsernameRules = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getUsernameRules', {}, onSuccess, onError);
  };
  PoliciesManager.prototype.fetchUsernamePoliciesCustomer = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getUsernameRulesAndPolicy', {"usernamePolicyForAllLocales": true}, onSuccess, onError);
  };
  PoliciesManager.prototype.getLocaleList = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getLocaleList', {}, onSuccess, onError);
  };
   PoliciesManager.prototype.fetchPasswordPoliciesCustomer = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getPasswordRulesAndPolicy', {"ruleForCustomer": true,"policyForCustomer": true,"passwordPolicyForAllLocales": true}, onSuccess, onError);
  };
  PoliciesManager.prototype.createPasswordPolicy = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'createPasswordPolicy', payload, onSuccess, onError);
  };
  PoliciesManager.prototype.createUsernamePolicy = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'createUsernamePolicy', payload, onSuccess, onError);
  };
  PoliciesManager.prototype.getUsernamePolicy = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getUsernamePolicy', {"usernamePolicyForAllLocales": true}, onSuccess, onError);
  };
  PoliciesManager.prototype.getPasswordPolicy = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'getPasswordPolicy', {"passwordPolicyForAllLocales": true}, onSuccess, onError);
  };
  PoliciesManager.prototype.updatePasswordRules = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'updatePasswordRules', payload, onSuccess, onError);
  };
  PoliciesManager.prototype.updateUsernameRules = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'updateUsernameRules', payload, onSuccess, onError);
  };
  PoliciesManager.prototype.deleteUsernamePolicy = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'deleteUsernamePolicy', payload, onSuccess, onError);
  };
  PoliciesManager.prototype.deletePasswordPolicy = function(payload, onSuccess, onError){
    ModelManager.invoke('identitymanagement', 'deletePasswordPolicy', payload, onSuccess, onError);
  };
  return PoliciesManager;
});
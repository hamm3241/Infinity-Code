define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {

  function Policy_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.policyViewModel = {
      policyList: null,
      usernameRulesPolicies: null,
      localeList: null,
      passwordRulesPolicies: null,
      usernamePolicies: null,
      passwordPolicies: null,
      usernameRules:null,
      passwordRules:null,
      error:null
    };

  }

  inheritsFrom(Policy_PresentationController, kony.mvc.Presentation.BasePresenter);
  Policy_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmPolicies',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  /**
     * @name showPasswordPolicy
     * @member PolicyModule.presentationController
     * 
     */
  /**
     * @name fetchPolicyList
     * @member PolicyModule.presentationController
     * 
     */
   Policy_PresentationController.prototype.getLocaleList = function () {
    var self = this;
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.localeList = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }
    function failureCallback(error) {
      self.hideLoadingScreen();
      kony.print('ERROR : Not able to fetch locale list', error);
    }

    self.businessController.getLocaleList({}, successCallback, failureCallback);
  };
  Policy_PresentationController.prototype.makeAllFieldsNull = function () {
    this.policyViewModel = {
      policyList: null,
      usernameRulesPolicies: null,
      localeList: null,
      passwordRulesPolicies: null,
      usernamePolicies: null,
      passwordPolicies: null,
      usernameRules:null,
      passwordRules:null,
      error:null
    };
  };
  
  Policy_PresentationController.prototype.showUserPasswordPolicies = function () {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.policyViewModel.policyList = response;
      self.getLocaleList();
    }

    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.getUsernameAndPasswordPolicies({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
 Policy_PresentationController.prototype.getUsernamePolicy = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.usernamePolicies = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }

    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.getUsernamePolicy(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
 Policy_PresentationController.prototype.getPasswordPolicy = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.passwordPolicies = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }

    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.getPasswordPolicy(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
 Policy_PresentationController.prototype.updateUsernameRules= function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.policyViewModel.update = true;
      self.fetchUsernamePoliciesCustomer();
    }
    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.updateUsernameRules(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
 Policy_PresentationController.prototype.updatePasswordRules = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.policyViewModel.update = true;
      self.fetchPasswordPoliciesCustomer();
    }
    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.updatePasswordRules(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
 Policy_PresentationController.prototype.createUsernamePolicy = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.presentUserInterface("frmPolicies",{toast:{"status":"success","message":kony.i18n.getLocalizedString("i18n.frmPolicies.UpdatePolicyDesc")}});
      self.getUsernamePolicy();
    }
    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.createUsernamePolicy(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
Policy_PresentationController.prototype.createPasswordPolicy = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.presentUserInterface("frmPolicies",{toast:{"status":"success","message":kony.i18n.getLocalizedString("i18n.frmPolicies.UpdatePolicyDesc")}});
      self.getPasswordPolicy();
    }
    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.createPasswordPolicy(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };

Policy_PresentationController.prototype.fetchUsernamePoliciesCustomer = function () {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.usernameRulesPolicies = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }

    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.fetchUsernamePoliciesCustomer({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  Policy_PresentationController.prototype.fetchPasswordPoliciesCustomer = function () {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.passwordRulesPolicies = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }

    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }
    self.businessController.fetchPasswordPoliciesCustomer({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
    Policy_PresentationController.prototype.getUsernameRules = function () {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.usernameRules = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }

    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.getUsernameRules({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  Policy_PresentationController.prototype.getPasswordRules = function () {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.hideLoadingScreen();
      self.policyViewModel.passwordRules = response;
      self.presentUserInterface('frmPolicies', self.policyViewModel);
    }

    function failureCallback(error) {
     self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.getPasswordRules({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  Policy_PresentationController.prototype.deleteUsernamePolicy = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.getUsernamePolicy();
    }
    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }
    self.businessController.deleteUsernamePolicy(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  Policy_PresentationController.prototype.deletePasswordPolicy = function (context) {
    var self = this;
    self.makeAllFieldsNull();
    function successCallback(response) {
      self.getPasswordPolicy();
    }
    function failureCallback(error) {
      self.policyViewModel.error=ErrorInterceptor.errorMessage(error);
      self.presentUserInterface("frmPolicies",self.policyViewModel);
    }

    self.businessController.deletePasswordPolicy(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
 /**
     * @name updatePolicy
     * @member PolicyModule.presentationController
     * @param {id : string, description : string} paramData
     * @param ()=>any successCB
     * @param (...callbackArgs)=>any failureCB
     */
  Policy_PresentationController.prototype.updatePolicy = function (paramData, successCB, failureCB) {
    var self = this;

    function successCallback(response) {
      self.hideLoadingScreen();
      if (typeof successCB === 'function') successCB();
      self.fetchPolicyList();
    }

    function failureCallback(error) {
      self.hideLoadingScreen();
      kony.print('Not able to update policy', error);
    }

    self.businessController.updatePolicy(paramData, successCallback, failureCallback);
    self.showLoadingScreen();
  };
	/**
     * @name showLoadingScreen
     * @member PolicyModule.presentationController
     * 
     */
  Policy_PresentationController.prototype.showLoadingScreen = function(){
    this.presentUserInterface('frmPolicies', {
      action : 'showLoadingScreen'
    });
  };
  /**
     * @name hideLoadingScreen
     * @member PolicyModule.presentationController
     * 
     */
  Policy_PresentationController.prototype.hideLoadingScreen = function(){
    this.presentUserInterface('frmPolicies', {
      action : 'hideLoadingScreen'
    });
  };
  return Policy_PresentationController;

});
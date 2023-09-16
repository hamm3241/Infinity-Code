define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {

  function PrivacyPolicy_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.privacyPolicyViewModel = {
      action: null,
      privacyPolicy: null,
      response: null
    };
  }

  inheritsFrom(PrivacyPolicy_PresentationController, kony.mvc.Presentation.BasePresenter);

  PrivacyPolicy_PresentationController.prototype.initializePresentationController = function () {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmPrivacyPolicy',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };

  PrivacyPolicy_PresentationController.prototype.showPrivacyPolicy = function () {
    this.showPrivacyPolicyForm({"action":"initializeUi"}); // fix to get rid of intermittent issue AAC-8282
  };

  PrivacyPolicy_PresentationController.prototype.showLoadingScreen = function(){
    this.showPrivacyPolicyForm({action : 'showLoadingScreen'});
  };

  PrivacyPolicy_PresentationController.prototype.hideLoadingScreen = function(){
    this.showPrivacyPolicyForm({action : 'hideLoadingScreen'});
  };

  PrivacyPolicy_PresentationController.prototype.showPrivacyPolicyForm = function (data) {
    var self = this;
    self.presentUserInterface('frmPrivacyPolicy', data);
  };


  /**
     * @name getPrivacyPolicy
     * @member PrivacyPolicyModule.presentationController
     * @param undefined data
     */
  PrivacyPolicy_PresentationController.prototype.getPrivacyPolicy = function (data) {
    var self = this;

    function successCallBack(response) {
      self.privacyPolicyViewModel.toast = null;
      if(data==="updatePrivacyPolicy") {
        self.privacyPolicyViewModel.action = "updatePrivacyPolicy"; 
      }
      else {
        self.privacyPolicyViewModel.action = "showPrivacyPolicy";
      }
      self.privacyPolicyViewModel.privacyPolicy = response.privacypolicy[0];
      self.showPrivacyPolicyForm(self.privacyPolicyViewModel);
      self.hideLoadingScreen();
    }

    function failureCallBack(response) {
      self.privacyPolicyViewModel.action = "showPrivacyPolicy";
      self.privacyPolicyViewModel.privacyPolicy=null;
      self.privacyPolicyViewModel.toast = "error";
      self.privacyPolicyViewModel.response = response; 
      self.privacyPolicyViewModel.message = ErrorInterceptor.errorMessage(response);
      self.showPrivacyPolicyForm(self.privacyPolicyViewModel);
      kony.print('ERROR : Not able to get privacy policies', response);
      self.hideLoadingScreen();
    }

    self.businessController.getPrivacyPolicy({}, successCallBack, failureCallBack);
    self.showPrivacyPolicyForm();
    self.showLoadingScreen();
  };


  /**
     * @name createPrivacyPolicy
     * @member PrivacyPolicyModule.presentationController
     * @param {user_ID : string, PrivacyPolicyData : {Status_id : string, Description : string, Channel_id : string}} createParam
     */
  PrivacyPolicy_PresentationController.prototype.createPrivacyPolicy = function (createParam) {
    var self = this;

    function successCallBack(response) {
      self.privacyPolicyViewModel.action = "createPrivacyPolicy";
      self.privacyPolicyViewModel.response = response;
      self.showPrivacyPolicyForm(self.privacyPolicyViewModel);
    }

    function failureCallBack(response) {
      self.privacyPolicyViewModel.action = "createPrivacyPolicy";
      self.privacyPolicyViewModel.response = response;
      self.showPrivacyPolicyForm(self.privacyPolicyViewModel);
      kony.print('ERROR : Not able create privacy policies', response);
    }

    self.businessController.addPrivacyPolicy(createParam, successCallBack, failureCallBack);
  };


  /**
     * @name updatePrivacyPolicy
     * @member PrivacyPolicyModule.presentationController
     * @param {user_ID : string, PrivacyPolicyData : {Status_id : string}} updateParam
     */
  PrivacyPolicy_PresentationController.prototype.updatePrivacyPolicy = function (updateParam) {
    var self = this;

    function successCallBack(response) {
      self.privacyPolicyViewModel.action = "updatePrivacyPolicy";
      self.privacyPolicyViewModel.response = response;
      self.getPrivacyPolicy("updatePrivacyPolicy");
    }

    function failureCallBack(response) {
      self.privacyPolicyViewModel.action = "updatePrivacyPolicy";
      self.privacyPolicyViewModel.response = response;
      self.getPrivacyPolicy("updatePrivacyPolicy");
      kony.print('ERROR : Not able update privacy policies', response);
    }

    self.businessController.updatePrivacyPolicy(updateParam, successCallBack, failureCallBack);
  };


  /**
     * @name deletePrivacyPolicy
     * @member PrivacyPolicyModule.presentationController
     * @param {user_ID : string, id : string} deleteParam
     */
  PrivacyPolicy_PresentationController.prototype.deletePrivacyPolicy = function (deleteParam) {
    var self = this;

    function successCallBack(response) {
      self.privacyPolicyViewModel.action = "deletePrivacyPolicy";
      self.privacyPolicyViewModel.response = response;
      self.showPrivacyPolicyForm(self.privacyPolicyViewModel);
    }

    function failureCallBack(response) {
      self.privacyPolicyViewModel.action = "deletePrivacyPolicy";
      self.privacyPolicyViewModel.response = response;
      self.showPrivacyPolicyForm(self.privacyPolicyViewModel);
      kony.print('ERROR : Not able delete privacy policies', response);
    }

    self.businessController.deletePrivacyPolicy(deleteParam, successCallBack, failureCallBack);
  };


  return PrivacyPolicy_PresentationController;
});
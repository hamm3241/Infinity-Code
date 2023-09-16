define(['ErrorInterceptor', 'ErrorIsNetworkDown','Promisify'], function (ErrorInterceptor, isNetworkDown,Promisify) {

  function TermsAndConditions_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.termsAndConditionsViewModel = {
      termsAndConditions: null
    };
    this.toastModel = {
      message : null,
      status : null
    };
  }

  inheritsFrom(TermsAndConditions_PresentationController, kony.mvc.Presentation.BasePresenter);

  TermsAndConditions_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmTermsAndConditions',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  /**
   * @name showTermsAndConditions
   * @member TermsAndConditionsModule.presentationController
   * @param {progressBar : {show : boolean}} context
  */
  TermsAndConditions_PresentationController.prototype.showTermsAndConditions = function(context) {
    this.presentUserInterface("frmTermsAndConditions",context);
  };

   /**
     * @name fetchTermsConditions
     * @member TermsAndConditionsModule.presentationController
     * 
     */
  TermsAndConditions_PresentationController.prototype.fetchTermsConditionsList =function(){
      this.presentUserInterface('frmTermsAndConditions', {});
  };
  TermsAndConditions_PresentationController.prototype.fetchTermsConditions =function(){
    var self = this;

    function successCallback(response) {
      self.termsAndConditionsViewModel.termsAndConditions = response.records[0];
      if(typeof self.termsAndConditionsViewModel.termsAndConditions === 'undefined'){
        self.termsAndConditionsViewModel.termsAndConditions = null;
      }
      self.presentUserInterface('frmTermsAndConditions',{"termsAndConditionsViewModel":self.termsAndConditionsViewModel});
      self.hideLoadingScreen();
    }

    function failureCallBack(response) {
      self.hideLoadingScreen();
      kony.print('ERROR : Not able to fetch terms & conditions', response);
    }

    self.businessController.getTermsAndCond({}, successCallback, failureCallBack);
    self.showLoadingScreen();
  };
  TermsAndConditions_PresentationController.prototype.fetchLanguageList =function(){
    var self = this;

    function successCallback(response) {
      self.termsAndConditionsViewModel.languageList = response;
      if(typeof self.termsAndConditionsViewModel.languageList === 'undefined'){
        self.termsAndConditionsViewModel.languageList = null;
      }
      self.presentUserInterface('frmTermsAndConditions',{"languageList":self.termsAndConditionsViewModel.languageList});
      self.hideLoadingScreen();
    }

    function failureCallBack(response) {
      self.hideLoadingScreen();
      kony.print('ERROR : Not able to fetch terms & conditions', response);
    }

    self.businessController.getAllLocaleLanguagesList({}, successCallback, failureCallBack);
    self.showLoadingScreen();
  };

  /*
    * function to call command handler to create terms & Conditions
    * @param: terms&conditions to create
    */
  TermsAndConditions_PresentationController.prototype.createTermsConditions =function(createdData){
    var self = this;
	var code = createdData.termsAndConditionsCode;
	var languageCode = createdData.languageCode;
    function successCallback(response) {
      self.hideLoadingScreen();
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmTermsAndConditions.addToastMsg");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
      self.getTermsAndConditions();
    }

    function failureCallBack(error) {
      self.hideLoadingScreen();
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
      self.getTermsAndConditions();
    }

    self.businessController.createContentVer(createdData, successCallback, failureCallBack);
    self.showLoadingScreen();
  };

  /*
    * function to call command handler to edit the terms & conditions
    * @param: edited data
    */
  TermsAndConditions_PresentationController.prototype.editTermsConditions =function(editedData){
    var self = this;

    function successCallback(response) {
      self.hideLoadingScreen();
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmTermsAndConditions.updateToastMsg");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
      self.getTermsAndConditions();
    }

    function failureCallBack(error) {
      self.hideLoadingScreen();
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
      self.getTermsAndConditions();
    }

    self.businessController.updateTermsAndCond(editedData, successCallback, failureCallBack);
    self.showLoadingScreen();
  };

  /*
    * function to call command handler to edit the terms & conditions
    * @param: edited data
    */
  TermsAndConditions_PresentationController.prototype.deleteTermsAndConditions =function(deletedData){
    var self = this;

    function successCallback(response) {
      self.hideLoadingScreen();
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmTermsAndConditions.deleteToastMsg");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
      self.getTermsAndConditions();
    }

    function failureCallBack(error) {
      self.hideLoadingScreen();
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
      self.getTermsAndConditions();
    }

    self.businessController.deleteTermsAndCond(deletedData, successCallback, failureCallBack);
    self.showLoadingScreen();
  };
  /**
   * @name getAllTermsAndConditions
   * @member TermsAndConditionsModule.presentationController
   * 
   */
  TermsAndConditions_PresentationController.prototype.getAllTermsAndConditions =function(){
    var self = this;
    function onSuccess(response) {
      var context = {
            "action": "showTermsAndConditionsList",
            "tncs": response.termsAndConditions,
        };
      self.showTermsAndConditions(context);
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.hideLoadingScreen();
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
    }
    self.businessController.getAllTermsAndConditions({}, onSuccess, onError);
    self.showLoadingScreen();
  };
  
  /**
   * @name fetchTermsConditions
   * @member TermsAndConditionsModule.presentationController
   * 
   */
  TermsAndConditions_PresentationController.prototype.editTermsAndConditions =function(context){
    var self = this;
    var code = context.termsAndConditionsCode;
	var languageCode = context.languageCode;
    self.showLoadingScreen();
    function onSuccess(response){
      self.toastModel.message = "Terms and conditions successfully updated ";
      self.toastModel.status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS");
      self.getAllTermsAndConditions();
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
    }
    function onError(error){
      self.hideLoadingScreen();
      self.toastModel.message = "Failed to update terms and condtions ";
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
    }
    this.businessController.editTermsAndConditions(context, onSuccess, onError);
  };
  /**
   * @name fetchTermsConditions
   * @member TermsAndConditionsModule.presentationController
   * 
   */
  TermsAndConditions_PresentationController.prototype.getTermsAndConditions =function(){
    var self = this;
    function onSuccess(response) {
      var context = {
            "action": "showContentVerList",
            "tcData": response.termsAndConditions,
        };
      self.showTermsAndConditions(context);
      self.hideLoadingScreen();
    }

    function onError(error) {
      self.hideLoadingScreen();
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmTermsAndConditions',{"toastModel":self.toastModel});
    }
    self.businessController.getAllTermsAndConditions({}, onSuccess, onError);
    self.showLoadingScreen();
};
   /**
     * @name showLoadingScreen
     * @member TermsAndConditionsModule.presentationController
     * 
     */

  TermsAndConditions_PresentationController.prototype.showLoadingScreen = function(){
    this.presentUserInterface('frmTermsAndConditions',{"action":"showLoadingScreen"});
  };
  /**
     * @name hideLoadingScreen
     * @member TermsAndConditionsModule.presentationController
     * 
     */
  TermsAndConditions_PresentationController.prototype.hideLoadingScreen = function(){
    this.presentUserInterface('frmTermsAndConditions',{"action":"hideLoadingScreen"});
  };

  return TermsAndConditions_PresentationController;
});
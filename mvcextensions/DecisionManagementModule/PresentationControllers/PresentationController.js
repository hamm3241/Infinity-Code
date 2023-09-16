define(['Promisify','ErrorInterceptor', 'ErrorIsNetworkDown'], function(Promisify, ErrorInterceptor, isNetworkDown) {
    /**
     * User defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

    /**
     * Overridden Method of kony.mvc.Presentation.BasePresenter
     * This method gets called when presentation controller gets initialized
     * @method
     */
   PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmDecisionManagement',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
   PresentationController.prototype.showLoadingScreen = function() {
        this.presentUserInterface("frmDecisionManagement",{"loadingScreen":{"focus":true}});
    };
    PresentationController.prototype.hideLoadingScreen = function() {
        this.presentUserInterface("frmDecisionManagement",{"loadingScreen":{"focus":false}});
    };
    PresentationController.prototype.showToastMessage = function(status,message) {
       this.presentUserInterface("frmDecisionManagement",{"toastMessage":{"status":status,
                                                                  "message":message}});
    };
   
    PresentationController.prototype.showDecisionManagement = function(context){
       this.fetchDecisions(context);
    };
    PresentationController.prototype.fetchFilesByDecision = function(context){
    var self = this;
     var onSuccess = function(response){
     self.hideLoadingScreen();
     self.presentUserInterface('frmDecisionManagement', {
        "fetchFilesByDecisionStatus" : "success",
        "files" : response.rulesFileList
      });
    };
    var onError = function(error){
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    };
    this.showLoadingScreen();
    this.businessController.GetAllFilesofDecisionRule(context,onSuccess,onError);
    };
    
    PresentationController.prototype.fetchDecisions = function(context){
       var self = this;
    self.showLoadingScreen();

    var promiseFetchAllDecisions = Promisify(this.businessController, 'getDecisionRules');

    Promise.all([
      promiseFetchAllDecisions({}),
    ]).then(function (response) {
     self.hideLoadingScreen();
      self.presentUserInterface('frmDecisionManagement', {
        "fetchAllDecisionsStatus" : "success",
        "decisions" : response[0].decisions,
      });
    }).catch(function (error) {
      self.hideLoadingScreen();
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),"Error");
      self.presentUserInterface('frmDecisionManagement', {"fetchAllDecisionsStatus" : "error"});
    });
    };
  PresentationController.prototype.updateDeleteDecision = function (context,flag) {
    var self = this;
    function completionUpdateDecisionCallback(response) {
      self.hideLoadingScreen();
      self.presentUserInterface('frmDecisionManagement', {
        "updateDeleteDecision": response.status
      });
      if(flag === "update"){
      	self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.decisionManagement.toastMessageDecisionUpdated"));
      }
      else{
        self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.decisionManagement.toastMessageDecisionDeleted"));
      }
    }


    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.editDecisionRule(context, completionUpdateDecisionCallback, onError);
  };
   PresentationController.prototype.createDecision = function (context) {
    var self = this;
    function completionCreateDecisionCallback(response) {
      self.hideLoadingScreen();
      self.presentUserInterface('frmDecisionManagement', {
        "createDecision": response.status
      });
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),kony.i18n.getLocalizedString("i18n.decisionManagement.toastMessageDecisionCreated"));
    }


    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
      self.hideLoadingScreen();
    }
    this.showLoadingScreen();
    this.businessController.createDecisionRule(context, completionCreateDecisionCallback, onError);
  };
   PresentationController.prototype.uploadFile = function(context) {
        var self = this;

        function completionUploadFileCallback(response) {
            self.hideLoadingScreen();
            self.presentUserInterface('frmDecisionManagement', {
                "uploadFileResponse": response
            });
          self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"), kony.i18n.getLocalizedString("i18n.decisionManagement.toastMessageVersionUpload"));
   
        }

        function onError(error) {
            self.hideLoadingScreen();
            self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
        }
        this.showLoadingScreen();
        this.businessController.UploadRuleFile(context, completionUploadFileCallback, onError);
    };
  PresentationController.prototype.downloadFile = function(context) {
    var self = this;

    function completionUploadFileCallback(response) {
      self.presentUserInterface('frmDecisionManagement', {
        "downloadFileResponse": response
      });

    }

    function onError(error) {
      self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"), ErrorInterceptor.errorMessage(error));
    }
    this.businessController.downloadFile(context, completionUploadFileCallback, onError);
  };
     return PresentationController;
});
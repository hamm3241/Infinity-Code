define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {
  var StatusConstants = {
    active: "SID_ACTIVE",
    inactive: "SID_INACTIVE"
  };
  function OutageMessage_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.outageMessageModel = {
      outageMessageList: null,
      serviceViewList: null
    };
  }

  inheritsFrom(OutageMessage_PresentationController, kony.mvc.Presentation.BasePresenter);

  OutageMessage_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface("frmOutageMessage",{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  OutageMessage_PresentationController.prototype.showOutageMessage = function() {
    //this.presentUserInterface("frmOutageMessage");
    this.fetchOutageMessage();
  };
  /**
     * @name fetchOutageMessage
     * @member OutageMessageModule.presentationController
     * 
     */
  OutageMessage_PresentationController.prototype.fetchOutageMessage = function() {
    var self = this;
    function onSuccess(response) {
      self.hideLoadingScreen();
      self.outageMessageModel.outageMessageList = response.records;
      self.outageMessageModel.context = "viewOutageMessages";
      self.fetchApplications();
    }
    
    function onError(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(response), "error");
      kony.print("ERROR : Not able to fetch outage message", response);
      
    }
    self.businessController.fetchOutageMessage({}, onSuccess, onError);
    self.showLoadingScreen();
  };
   /**
     * @name fetchServiceView
     * @member OutageMessageModule.presentationController
     * 
     */
  OutageMessage_PresentationController.prototype.fetchServiceView = function() {
    var self = this;
    function onSuccess(response) {
      self.outageMessageModel.serviceViewList = response.Services;
      self.showOutageMessageScreen(self.outageMessageModel);
      self.hideLoadingScreen();
    }

    function onError(response) {
      kony.print("ERROR : Not able to fetch outage message", response);
      self.showOutageMessageScreen(self.outageMessageModel);
      self.hideLoadingScreen();
    }

    self.businessController.getServices({}, onSuccess, onError);
    self.showLoadingScreen();
  };
  OutageMessage_PresentationController.prototype.fetchApplications = function() {
    var self = this;
    function onSuccess(response) {
      self.outageMessageModel.appsList = response.apps;
      self.showOutageMessageScreen(self.outageMessageModel);
      self.hideLoadingScreen();
    }

    function onError(response) {
      kony.print("ERROR : Not able to fetch outage message", response);
      self.showOutageMessageScreen(self.outageMessageModel);
      self.hideLoadingScreen();
    }

    self.businessController.fetchApplicationsList({}, onSuccess, onError);
    self.showLoadingScreen();
  };
  OutageMessage_PresentationController.prototype.fetchAddedData = function() {
     var self = this;
     function onSuccess(response) {
       self.hideLoadingScreen();
       self.presentUserInterface("frmOutageMessage", {
         context: "createOutageMessage",
         data: response
       });
       self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Outage_Message_Updated_successfully"), "success");
     }
     
     function onError(response) {
       self.hideLoadingScreen();
       self.showToastMessageFlex(ErrorInterceptor.errorMessage(response), "error");
       kony.print("ERROR : Not able to fetch outage message", response);
     }
     self.businessController.fetchOutageMessage({}, onSuccess, onError);
     self.showLoadingScreen();
  };
   /**
     * @name editOutageMessage
     * @member OutageMessageModule.presentationController
     * @param [{Service_id : string, MessageText : string, Status_id : string, id : string, modifiedby : string}] editedData
     * @param boolean stayOnCurrPage
     */
  OutageMessage_PresentationController.prototype.editOutageMessage = function(editedData) {
    var self = this;
    kony.print(JSON.stringify(editedData));
    
    function onSuccess(response) {
      self.showOutageMessageScreen({"action":"createEditOutageMessageSuccess"});
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Outage_Message_Updated_successfully"), "success");
    }
    
    function onError(response) {
      self.showOutageMessageScreen({
        "action": "createEditOutageMessageFailure",
        "response": response
      });
    }
    self.businessController.updateOutageMessage(editedData, onSuccess, onError);
  };
  
  /**
     * @name createOutageMessage
     * @member OutageMessageModule.presentationController
     * @param {ServiceName : string, Service_id : string, MessageText : string, Status_id : string} createData
     * @param boolean stayOnCurrPage
     */
  OutageMessage_PresentationController.prototype.createOutageMessage = function(createData) {
    var self = this;
    function onSuccess(response) {
      self.showOutageMessageScreen({"action":"createEditOutageMessageSuccess"});
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Outage_Message_Saved_successfully"), "success");
    }
    
    function onError(response) {
      self.showOutageMessageScreen({
        "action": "createEditOutageMessageFailure",
        "response": response
      });
    }
    self.businessController.addOutageMessage(createData, onSuccess, onError);
    };
  /**
     * @name updateStatusOutageMessage
     * @member OutageMessageModule.presentationController
     * @param [{id : string, Status_id : string, Service_id : string, MessageText : string, modifiedby : string}] editedData
     */
  OutageMessage_PresentationController.prototype.updateStatusOutageMessage = function(editedData) {
    var self = this;
    var updateStatusTo = "SID_OUTAGE_ACTIVE";
    function onSuccess(response) {
      self.hideLoadingScreen();
      self.fetchOutageMessage();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.outage.messagesupdatedsuccessfully"), "success");
    }

    function onError(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.outage.messagesupdationfailed"), "error");
      kony.print("ERROR : Unable to update outage message", response);
    }
    self.businessController.updateOutageMessage(editedData, onSuccess, onError);
    self.showLoadingScreen();
  };

  /**
     * @name bulkUpdateOutageMessage
     * @member OutageMessageModule.presentationController
     * @param [{id : string, Status_id : string, Service_id : string, MessageText : string, modifiedby : string}] editedData
     */
    OutageMessage_PresentationController.prototype.bulkUpdateOutageMessage = function(payload) {
      var self = this;
      function onSuccess(response) {
        self.hideLoadingScreen();
        self.fetchOutageMessage();
        self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmoutage.updatedsuccessfully"), "success");
      }
  
      function onError(response) {
        self.hideLoadingScreen();
        self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmoutage.updationfailed"), "error");
        kony.print("ERROR : Unable to update outage message", response);
      }
      self.businessController.bulkUpdateOutageMessage(payload, onSuccess, onError);
      self.showLoadingScreen();
    };

  /**
     * @name deleteOutageMessage
     * @member OutageMessageModule.presentationController
     * @param [{id : string}] request
     */
  OutageMessage_PresentationController.prototype.deleteOutageMessage = function(request) {
    var self = this;
    function onSuccess(response) {
      self.hideLoadingScreen();
      self.fetchOutageMessage();
      self.showToastMessageFlex(kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Deleted_Outage_Message_successfully"), "success");
    }

    function onError(response) {
      self.hideLoadingScreen();
      self.showToastMessageFlex(ErrorInterceptor.errorMessage(response), "error");
      kony.print("ERROR : Unable to update outage message", response);
    }

    self.businessController.deleteOutageMessage(request, onSuccess, onError);
    self.showLoadingScreen();
  };
  /**
     * @name showOutageMessageScreen
     * @member OutageMessageModule.presentationController
     * @param undefined viewModel
     */
  OutageMessage_PresentationController.prototype.showOutageMessageScreen = function(viewModel) {
    this.presentUserInterface("frmOutageMessage", viewModel);
  };
  OutageMessage_PresentationController.prototype.showLoadingScreen = function(viewModel) {
    this.showOutageMessageScreen({"context":"showLoadingScreen"});
  };
  OutageMessage_PresentationController.prototype.hideLoadingScreen = function(viewModel) {
    this.showOutageMessageScreen({"context":"hideLoadingScreen"});
  };
  OutageMessage_PresentationController.prototype.showToastMessageFlex = function (msg, status) {
    var self = this;
    var toast ={"toast": {
        message: msg,
        status: status
      }
    };
    self.presentUserInterface("frmOutageMessage", toast);
  };
  return OutageMessage_PresentationController;
});

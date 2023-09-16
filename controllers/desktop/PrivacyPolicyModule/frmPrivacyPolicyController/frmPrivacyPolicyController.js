define({

  //Type your controller code here 


  editPage: 0,
  statusUpdate: false,
  /**
    * Function preshow of actions
  **/
  privacyPolicyPreShowActions: function (privacyPolicy) {
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setHeaderButtonsVisibility();
    this.setHeaderText();
    this.flowActions();
    this.view.flxAddPrivacyPolicy.isVisible = false;
    this.view.staticData.skin = "skntxtAreaLato0i538905e260549Stat"; 
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.flxPhraseStatus.setVisibility(false);
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    //this.view.flxDetailPrivacyPolicy.height=kony.os.deviceInfo().screenHeight - 190+ "px";
    //this.view.staticData.height=kony.os.deviceInfo().screenHeight - 140 + "px";
    this.view.staticData.flxStaticContantData.height=kony.os.deviceInfo().screenHeight - 290 + "px";
    // this.view.leftMenu.showSubMenuWithoutAnimation(this.view.leftMenu.flxServiceMgmntSubMenu);
    // this.highlightSubmenu();
  },


  setHeaderButtonsVisibility: function () {
    this.view.mainHeader.flxButtons.setVisibility(false);
  },
  setHeaderText: function () {
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Privacy_Policy");
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.staticData.lblStaticContentHeader.text =kony.i18n.getLocalizedString("i18n.PrivacyPolicy.konyMessage");
  },
  setPrivacyPolicyData: function (privacyPolicy) {
    this.view.flxBreadcrumb.setVisibility(false);
    if (privacyPolicy === undefined || privacyPolicy === null) {
      this.view.flxDetailPrivacyPolicy.setVisibility(false);
      this.view.noStaticData.btnAddStaticContent.text =kony.i18n.getLocalizedString("i18n.PrivacyPolicy.addPolicyBtn");
      this.view.noStaticData.lblNoStaticContentMsg.text = kony.i18n.getLocalizedString("i18n.PrivacyPolicy.addPolicyMessage");
      this.view.noStaticData.lblNoStaticContentCreated.text = kony.i18n.getLocalizedString("i18n.PrivacyPolicy.noPolicyMessage");
      this.view.flxNoPrivacyPolicy.setVisibility(true);
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantData.rtxViewer.privacyPolicyID = undefined;
    } else {
      this.setHeaderText();
      this.view.flxDetailPrivacyPolicy.setVisibility(true);
      this.view.flxNoPrivacyPolicy.setVisibility(false);
      if(document.getElementById("iframe_rtxViewer")){
        if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
          document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = privacyPolicy.Description;
        } else {
          if(!document.getElementById("iframe_rtxViewer").newOnload) {
            document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
          }
          document.getElementById("iframe_rtxViewer").onload = function() {
            document.getElementById("iframe_rtxViewer").newOnload();
            document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = privacyPolicy.Description;
          };
        }
      }
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantData.rtxViewer.privacyPolicyID = privacyPolicy.id;
      this.view.staticData.setVisibility(true);
      this.setStatusLblImg(privacyPolicy.Status_id);
    }
  },
  setStatusLblImg: function (status) {
    if (status === "SID_ACTIVE") {
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantHeader.flxStatus.lblstaticContentStatus.text = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantHeader.flxStatus.lblstaticContentStatus.skin = "sknlblLato5bc06cBold14px";
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantHeader.flxStatus.fontIconImgStaticContentStatus.skin = "sknFontIconActivate";

      this.view.flxDetailPrivacyPolicy.staticData.flxSelectOptions.flxSelectOptionsInner.flxDeactivateOption.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.flxDetailPrivacyPolicy.staticData.flxSelectOptions.flxSelectOptionsInner.flxDeactivateOption.fontIconOption4.text = "";

    } else {
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantHeader.flxStatus.lblstaticContentStatus.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantHeader.flxStatus.lblstaticContentStatus.skin = "sknlblLatocacacaBold12px";
      this.view.flxDetailPrivacyPolicy.staticData.flxStaticContantHeader.flxStatus.fontIconImgStaticContentStatus.skin = "sknfontIconInactive";
      this.view.flxDetailPrivacyPolicy.staticData.flxSelectOptions.flxSelectOptionsInner.flxDeactivateOption.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.flxDetailPrivacyPolicy.staticData.flxSelectOptions.flxSelectOptionsInner.flxDeactivateOption.fontIconOption4.src = "";
    }
    this.view.flxDetailPrivacyPolicy.staticData.flxSelectOptions.flxSelectOptionsInner.flxDeactivateOption.setVisibility(false);
  },
  flowActions: function () {
    var scopeObj = this;

    scopeObj.view.mainHeader.flxHeaderSeperator.isVisible = false;
    scopeObj.view.mainHeader.btnAddNewOption.isVisible = false;
    scopeObj.view.mainHeader.btnDropdownList.isVisible = false;
    scopeObj.view.commonButtons.btnNext.isVisible = false;
    scopeObj.view.flxLoading.setVisibility(false);
    // Add Static content

    this.view.noStaticData.btnAddStaticContent.onClick = function () {
      scopeObj.view.flxAddPrivacyPolicy.isVisible = true;
      scopeObj.view.flxNoPrivacyPolicy.isVisible = false;
      scopeObj.view.SwitchToggleStatus.selectedIndex = 0;
      scopeObj.view.flxNoPrivacyPolicyError.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Add_Policy");

      var privacyPolicyEditorDocument = document.getElementById("iframe_rtxPrivacyPolicy").contentWindow.document;
      privacyPolicyEditorDocument.getElementById("editor").innerHTML = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Add_Privacy_Policy");
      privacyPolicyEditorDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
    };

    // On Add T&C Cancel btn 
    this.view.commonButtons.btnCancel.onClick = function () {
      scopeObj.view.flxAddPrivacyPolicy.isVisible = false;
      if (scopeObj.editPage === 0){
        scopeObj.view.flxNoPrivacyPolicy.isVisible = true;
        scopeObj.view.flxBreadcrumb.setVisibility(false);
      } else {
        scopeObj.view.flxDetailPrivacyPolicy.isVisible = true;
        scopeObj.view.staticData.flxSelectOptions.isVisible = false;
        scopeObj.setHeaderText();
        scopeObj.view.flxBreadcrumb.setVisibility(false);
      }
    };
    // On Add T&C Save btn 
    this.view.commonButtons.btnSave.onClick = function () {
      var privacyPolicyText = document.getElementById("iframe_rtxPrivacyPolicy").contentWindow.document.getElementById("editor").innerHTML;
      kony.print("privacyPolicyText (after encoding): "+privacyPolicyText);
      if (privacyPolicyText === "" || privacyPolicyText === "<br>") {
        scopeObj.view.flxNoPrivacyPolicyError.isVisible = true;
      } else {
        privacyPolicyText = window.btoa(encodeURI(privacyPolicyText));
        scopeObj.editPage = 1;
        scopeObj.setHeaderText();
        scopeObj.view.flxAddPrivacyPolicy.isVisible = false;
        scopeObj.view.flxNoPrivacyPolicy.isVisible = false;
        scopeObj.view.flxDetailPrivacyPolicy.isVisible = true;
        scopeObj.view.staticData.flxSelectOptions.isVisible = false;
        var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var updateData = {
          "user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
          "PrivacyPolicyData": {
            "Status_id": scopeObj.view.SwitchToggleStatus.selectedIndex === 1 ? "SID_INACTIVE" : "SID_ACTIVE",
            "Description": privacyPolicyText
          }
        };
        if(scopeObj.view.flxDetailPrivacyPolicy.staticData.flxStaticContantData.rtxViewer.privacyPolicyID!==undefined){
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          privacyPolicyModule.presentationController.updatePrivacyPolicy(updateData);
        }else{
          updateData.PrivacyPolicyData.Channel_id="CH_ID_MOB_INT";
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          var privacyPolicyViewerDocument = document.getElementById("iframe_rtxViewer").contentWindow.document;
          privacyPolicyViewerDocument.getElementById("viewer").innerHTML = "";
          privacyPolicyModule.presentationController.createPrivacyPolicy(updateData);
        }
      }
    };
    // For Edit click
    this.view.staticData.flxEditOption.onTouchStart = function () {
      scopeObj.editPage=1;
      scopeObj.view.flxAddPrivacyPolicy.isVisible = true;
      scopeObj.view.flxNoPrivacyPolicy.isVisible = false;
      scopeObj.view.flxDetailPrivacyPolicy.isVisible = false;
      scopeObj.view.flxNoPrivacyPolicyError.setVisibility(false);
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.PRIVACY_POLICY");
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.EDIT_POLICY");
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Edit_Privacy_Policy");
      scopeObj.view.flxBreadcrumb.setVisibility(true);
      var privacyPolicyEditorDocument = document.getElementById("iframe_rtxPrivacyPolicy").contentWindow.document;
      var privacyPolicyViewerDocument = document.getElementById("iframe_rtxViewer").contentWindow.document;
      privacyPolicyEditorDocument.getElementById("editor").innerHTML = privacyPolicyViewerDocument.getElementById("viewer").innerHTML;
      privacyPolicyEditorDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";

      if(scopeObj.view.staticData.lblstaticContentStatus.text === kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")){
        scopeObj.view.SwitchToggleStatus.selectedIndex = 1;
      }
      else{
        scopeObj.view.SwitchToggleStatus.selectedIndex = 0;
      }
      scopeObj.view.forceLayout();
    };

    // For Delete  click
    this.view.staticData.flxDeleteOption.onTouchStart = function () {
      scopeObj.view.popUpDelete.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      scopeObj.view.popUpDelete.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.PrivacyPolicy.delete");
      scopeObj.view.popUpDelete.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.PrivacyPolicy.deleteMessage1");
      scopeObj.view.popUpDelete.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
      scopeObj.view.flxDeletePrivacyPolicy.isVisible = true;
      scopeObj.view.forceLayout();
      scopeObj.view.staticData.flxSelectOptions.isVisible = false;
    };

    // On  Delete message kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Leave_as_it_it_selected")
    this.view.popUpDelete.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxDeletePrivacyPolicy.isVisible = false;
    };

    // On  Delete message kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Leave_as_it_it_selected")
    this.view.popUpDelete.btnPopUpDelete.onClick = function () {
      var updateData = {
        "user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
        "id": scopeObj.view.flxDetailPrivacyPolicy.staticData.flxStaticContantData.rtxViewer.privacyPolicyID
      };
      scopeObj.view.flxDetailPrivacyPolicy.isVisible = false;
      scopeObj.view.flxAddPrivacyPolicy.isVisible = false;
      scopeObj.view.flxDeletePrivacyPolicy.isVisible = false;
      var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      privacyPolicyModule.presentationController.deletePrivacyPolicy(updateData);
    };


    // For Deactivate click
    this.view.staticData.flxDeactivateOption.onClick = function () {
      scopeObj.view.staticData.flxSelectOptions.isVisible = false;
      scopeObj.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      if (scopeObj.view.staticData.lblstaticContentStatus.text === kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")) { //To activate
        var updateStatus = "SID_ACTIVE";
        scopeObj.view.staticData.lblstaticContentStatus.text = kony.i18n.getLocalizedString("i18n.secureimage.Active");
        scopeObj.view.staticData.lblstaticContentStatus.skin = "sknlblLato5bc06cBold14px";
        scopeObj.view.staticData.fontIconImgStaticContentStatus.skin = "sknFontIconActivate";
        scopeObj.view.staticData.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        scopeObj.view.staticData.flxSelectOptions.isVisible = false;
        scopeObj.deactivateActivatePolicy(updateStatus);
      } else { //to deactivate
        scopeObj.view.flxDeactivatePrivacyPolicy.isVisible = true;
        scopeObj.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
        scopeObj.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.PrivacyPolicy.deactivate");
        scopeObj.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.deactivate_Privacy_Policy_Message");
      }
      scopeObj.view.forceLayout();
    };

    //On Deactivate confirm
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function () {
      var updateStatus = "SID_INACTIVE";
      scopeObj.view.staticData.lblstaticContentStatus.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
      scopeObj.view.staticData.lblstaticContentStatus.skin = "sknlblLatocacacaBold12px";
      scopeObj.view.staticData.fontIconImgStaticContentStatus.skin = "sknfontIconInactive";
      scopeObj.view.staticData.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      scopeObj.view.staticData.flxSelectOptions.isVisible = false; 
      scopeObj.view.flxDeactivatePrivacyPolicy.isVisible = false;
      scopeObj.deactivateActivatePolicy(updateStatus);
    };

    // On Deactivate cancel message kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Leave_as_it_it_selected")
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxDeactivatePrivacyPolicy.isVisible = false;
      if (scopeObj.view.SwitchToggleStatus.selectedindex === 0) {
        scopeObj.view.SwitchToggleStatus.selectedindex = 1;
        scopeObj.view.forceLayout();
      } else {
        scopeObj.view.SwitchToggleStatus.selectedindex = 0;
        scopeObj.view.forceLayout();
      }
    };
    this.view.staticData.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
    this.view.popUpDelete.flxPopUpClose.onTouchStart = function () {
      scopeObj.view.flxDeletePrivacyPolicy.isVisible = false;
    };
    this.view.popUpDeactivate.flxPopUpClose.onTouchStart = function () {
      scopeObj.view.flxDeactivatePrivacyPolicy.isVisible = false;
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.view.flxAddPrivacyPolicy.isVisible = false;
      scopeObj.setHeaderText();
      if (scopeObj.editPage === 0)
        scopeObj.view.flxNoPrivacyPolicy.isVisible = true;
      else {
        scopeObj.view.flxDetailPrivacyPolicy.isVisible = true;
        scopeObj.view.staticData.flxSelectOptions.isVisible = false;
      }
    };
  },
  onDropDownsHoverCallback:function(widget,context){
    var self=this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      self.view.staticData.flxSelectOptions.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.view.staticData.flxSelectOptions.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      self.view.staticData.flxSelectOptions.setVisibility(false);
      self.view.staticData.flxOptions.skin = "sknFlxBorffffff1pxRound";
    }
    self.view.forceLayout();
  },
  getPrivacyPolicyData: function(){
    var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
    kony.adminConsole.utils.showProgressBar(this.view);
    privacyPolicyModule.presentationController.showPrivacyPolicy();
  },
  deactivateActivatePolicy : function(updateStatus){
    var updateData = {
      "user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
      "PrivacyPolicyData": {
        "Status_id": ""
      }
    };
    updateData.PrivacyPolicyData.Status_id = updateStatus;
    //Calling Presentation Controller
    var scopeObj = this;
    var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
    scopeObj.statusUpdate = true;
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    privacyPolicyModule.presentationController.updatePrivacyPolicy(updateData);
  },
  willUpdateUI: function (context) {
    if (context !== undefined) {
      this.updateLeftMenu(context);
      if(context.action==="initializeUi"){ // fix to get rid of intermittent issue AAC-8282
        this.presenter.getPrivacyPolicy();
      }
      else if (context.action === "showPrivacyPolicy") {
        if ((context.privacyPolicy === undefined || context.privacyPolicy === null)&&context.toast!=="error") {
          this.setPrivacyPolicyData(undefined);
        }else if(context.toast==="error"){
          this.view.toastMessage.showErrorToastMessage(context.message,this);
        } else {
          this.setPrivacyPolicyData(context.privacyPolicy);
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      else if (context.action === "updatePrivacyPolicy") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        if (context.response.PrivacyPolicyEditStatus === 'Failure') {
          this.view.toastMessage.lbltoastMessage.text = this.failedMsg;
          this.view.toastMessage.showErrorToastMessage(this.errorMessage(context.response),this);
        } else {
          if(!this.statusUpdate) {
            this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Policy_updated_successfully"),this);
          } else {
            if(context.privacyPolicy.Status_id === "SID_INACTIVE") {
              this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Policy_deactivated_successfully"),this);
            } else {
              this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Policy_activated_successfully"),this);
            }
            this.statusUpdate = false;
          }
          //this.getPrivacyPolicyData();
          this.setPrivacyPolicyData(context.privacyPolicy);
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      else if (context.action === "deletePrivacyPolicy") {
        if (context.response.opstatus !== 0) {
          this.view.toastMessage.lbltoastMessage.text = this.failedMsg;
          this.view.toastMessage.showErrorToastMessage(this.errorMessage(context.response),this);
        } else {
          this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Policy_deleted_successfully"),this);
          this.getPrivacyPolicyData();
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      else if (context.action === "createPrivacyPolicy") {
        if (context.response.opstatus !== 0) {
          this.view.toastMessage.lbltoastMessage.text = this.failedMsg;
          this.view.toastMessage.showErrorToastMessage(this.errorMessage(context.response),this);
        } else {
          this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPrivacyPolicyController.Policy_added_successfully"),this);
          this.getPrivacyPolicyData();
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }else if(context.action === "hideLoadingScreen"){
        kony.adminConsole.utils.hideProgressBar(this.view);
      }else if(context.action === "showLoadingScreen"){
        kony.adminConsole.utils.showProgressBar(this.view);
      }
    }
    this.view.forceLayout();
  }

});

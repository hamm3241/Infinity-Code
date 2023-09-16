define([], function() {
 var mfaConfigEditState = {};
 var mouseYCoordinate = 0;
 var STATUS_CONTANTS = {
  active: "SID_ACTIVE",
  inactive: "SID_INACTIVE"
 };
 return {
  willUpdateUI: function(model) {
   this.updateLeftMenu(model);
   if (model.action === "hideLoadingScreen") {
    kony.adminConsole.utils.hideProgressBar(this.view);
   } else if (model.loadingScreen) {
    if (model.loadingScreen.focus)
     kony.adminConsole.utils.showProgressBar(this.view);
    else
     kony.adminConsole.utils.hideProgressBar(this.view);
   } else if (model && model.getMFAConfigurations) {
     this.processMFAConfigsForView(model.getMFAConfigurations);
   } else if (model && model.updateMFAConfiguration) {
    this.editPopupYesClickHandler();
    this.presenter.getAllMFAConfigurations({});
   } else if (model.toastMessage) {
    if (model.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
     this.view.toastMessage.showToastMessage(model.toastMessage.message, this);
    } else if (model.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
     this.view.toastMessage.showErrorToastMessage(model.toastMessage.message, this);
    }
   }
  },
  initActions: function() {
   var scopeObj = this;
  },
   preshow: function() {
     var scopeObj = this;
     this.setFlowActions();
     this.editPopupYesClickHandler();
     this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
     scopeObj.view.flxToastMessage.setVisibility(false);
     scopeObj.view.breadcrumbs.setVisibility(false);
     scopeObj.view.backToPageRight.btnBack.text = "Back to MFA Scenarios";
     
     scopeObj.view.popUpCancelEdits.btnPopUpCancel.skin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
     scopeObj.view.popUpCancelEdits.btnPopUpCancel.focusSkin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";

     scopeObj.view.commonButtonsEditMFAConfig.btnCancel.skin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
     scopeObj.view.commonButtonsEditMFAConfig.btnCancel.focusSkin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";      

     scopeObj.view.commonButtonsEditMFAConfig.btnSave.skin = "sknBtnBg003e75R20pxF13pxLatoReg";
     scopeObj.view.commonButtonsEditMFAConfig.btnSave.hoverSkin = "sknBtnBg005198R20pxF13pxLatoReg";
     scopeObj.view.commonButtonsEditMFAConfig.btnSave.focusSkin = "sknBtnBg003e75R20pxF13pxLatoReg";

     scopeObj.view.mainHeader.lblHeading.skin = "sknlblLato485c7522Px";
     
     scopeObj.view.textBoxEntry.tbxEnterValue.placeholder = "";
     scopeObj.view.textBoxEntry.btnCheck.text =  kony.i18n.getLocalizedString("i18n.MFAConfigrations.mins");
     scopeObj.view.textBoxEntry.tbxEnterValue.padding = [7,0,0,0];
     scopeObj.view.textBoxEntry.btnCheck.setEnabled(false);
   },
   postShow:function(){
     document.getElementById("frmMFAConfigurations_radioAfterMaxFailedAttempts").children[1].style["padding-left"] = "20px";     
   },
  setFlowActions: function() {
   var scopeObj = this;
    this.view.flxCheckboxLockUser.onClick = function() {
      var img = scopeObj.view.imgLockUserCheckImage.src;
      if (img === "checkboxdisable.png") {
        scopeObj.view.imgLockUserCheckImage.src = "checkboxnormal.png";
      } else {
        scopeObj.view.imgLockUserCheckImage.src = "checkboxdisable.png";
        scopeObj.view.imgLogoutUserCheck.src = "checkboxdisable.png";
      }
    };
    this.view.flxCheckboxLogoutUser.onClick = function() {
      var img = scopeObj.view.imgLogoutUserCheck.src;
      if (img === "checkboxdisable.png") {
        scopeObj.view.imgLogoutUserCheck.src = "checkboxnormal.png";
      } else {
        scopeObj.view.imgLogoutUserCheck.src = "checkboxdisable.png";
      }
    };

    this.view.commonButtonsEditMFAConfig.btnCancel.onClick = function() {
      scopeObj.view.flxEditMFAConfig.setVisibility(false);
    };
    this.view.commonButtonsEditMFAConfig.btnSave.onClick = function() {
      if(scopeObj.validateEdit()){
        scopeObj.onUpdateClickHandler();
      }
    };
    this.view.flxPopUpClose.onClick = function(){
      scopeObj.view.commonButtonsEditMFAConfig.btnCancel.onClick();
    };
    this.view.backToPageRight.btnBack.onClick = function() {
      scopeObj.presenter.navigateBackToMFAScenario();
    };
    this.view.backToPageRight.flxBack.onClick = function(){
      scopeObj.view.backToPageRight.btnBack.onClick();
    };
    this.view.radioAfterMaxFailedAttempts.onSelection = function(eventobject) {
      kony.print(eventobject.selectedKey);
      if (mfaConfigEditState.mfaConfigurations) {
        if (eventobject.selectedKey === "LOCK_USER") {
          mfaConfigEditState.mfaConfigurations["LOCK_USER"] = {
            mfaValue: "true",
            mfaKey: "LOCK_USER"
          };
          mfaConfigEditState.mfaConfigurations["LOGOUT_USER"] = {
            mfaValue: "true",
            mfaKey: "LOGOUT_USER"
          };
        } else {
          mfaConfigEditState.mfaConfigurations["LOGOUT_USER"] = {
            mfaValue: "true",
            mfaKey: "LOGOUT_USER"
          };
          mfaConfigEditState.mfaConfigurations["LOCK_USER"] = {
            mfaValue: "false",
            mfaKey: "LOCK_USER"
          };
        }
      }
    };
    this.view.btnEditConfigLeft.onClick =function(){
      scopeObj.showMFAConfigEdit(scopeObj.view.btnEditConfigLeft.info.data);
    };
    this.view.btnEditConfigRight.onClick = function(){
      scopeObj.showMFAConfigEdit(scopeObj.view.btnEditConfigRight.info.data);
    };
    this.view.textBoxEntry.tbxEnterValue.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmMFAConfigurations_textBoxEntry_tbxEnterValue");
    };
    this.view.textBoxEntry.tbxEnterValue.onKeyUp = function(){
      var min = scopeObj.view.textBoxEntry.tbxEnterValue.info.min;
      var max = scopeObj.view.textBoxEntry.tbxEnterValue.info.max;
      var tbxText = parseInt(scopeObj.view.textBoxEntry.tbxEnterValue.text,10);
      if((tbxText < min)){
        scopeObj.view.textBoxEntry.lblErrorText.text =  kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " " + min;
        scopeObj.view.textBoxEntry.flxInlineError.setVisibility(true);
      } else if((tbxText > max)){
        scopeObj.view.textBoxEntry.lblErrorText.text =  kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than")+" "+ max;
        scopeObj.view.textBoxEntry.flxInlineError.setVisibility(true); 
      } else{
        scopeObj.view.textBoxEntry.flxInlineError.setVisibility(false);
      }
      scopeObj.view.forceLayout(); 
      mfaConfigEditState.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.mfaValue = tbxText;
    };
  },
  /**
   * Format mfa configurations response to segment data
   * @param {Array} mfaConfigs 
   */
   processMFAConfigsForView: function(mfaConfigs) {
     var scopeObj = this;
     scopeObj.view.flxScrollMainContent.setVisibility(true);
     if (mfaConfigs) {
       for(var i=0;i<mfaConfigs.length;i++){
         var rec = mfaConfigs[i];
         switch (mfaConfigs[i].mfaTypeId) {
           case "SECURE_ACCESS_CODE":
             scopeObj.view.lblConfigHeaderLeft.text = mfaConfigs[i].mfaTypeName;
             scopeObj.view.detailsRow11.lblData1.text = rec.mfaConfigurations.SAC_CODE_LENGTH.mfaValue + " characters";
             scopeObj.view.detailsRow11.lblData2.text = rec.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.mfaValue + (rec.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.mfaValue == 1 ? " minute" : " minutes");
             scopeObj.view.detailsRow12.lblData1.text = rec.mfaConfigurations.SAC_MAX_RESEND_REQUESTS_ALLOWED.mfaValue + "";
             scopeObj.view.detailsRow13.lblData1.text = rec.mfaConfigurations.MAX_FAILED_ATTEMPTS_ALLOWED.mfaValue;
             if (rec.mfaConfigurations.LOCK_USER.mfaValue === "true") {
               scopeObj.view.detailsRow13.lblData2.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Logout_Lock_User");
             } else if (rec.mfaConfigurations.LOGOUT_USER.mfaValue === "true") {
               scopeObj.view.detailsRow13.lblData2.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Logout_User");
             }
             this.view.btnEditConfigLeft.info = {"data":mfaConfigs[i] };
             break;
           case "SECURITY_QUESTIONS":
             scopeObj.view.lblConfigHeaderRight.text = mfaConfigs[i].mfaTypeName;
             scopeObj.view.detailsRow21.lblData1.text = rec.mfaConfigurations.SQ_NUMBER_OF_QUESTION_ASKED.mfaValue + "";
             scopeObj.view.detailsRow23.lblData1.text = rec.mfaConfigurations.MAX_FAILED_ATTEMPTS_ALLOWED.mfaValue;
             if (rec.mfaConfigurations.LOCK_USER.mfaValue === "true") {
               scopeObj.view.detailsRow23.lblData2.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Logout_Lock_User");
             } else if (rec.mfaConfigurations.LOGOUT_USER.mfaValue === "true") {
               scopeObj.view.detailsRow23.lblData2.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Logout_User");
             }
             this.view.btnEditConfigRight.info = {"data":mfaConfigs[i] };
             break;
         }
       }
     }
     this.view.forceLayout();
   },
   /**
   * Called when clicked on options button. Handle options menu.
   */
  toggleVisibility: function() {
   this.handleMFAConfigEditClick();
   this.view.forceLayout();
  },
  /**
   * Maps data to edit screen and displays edit form.
   * @param {object} data 
   */
   showMFAConfigEdit: function(data) {
     this.view.textBoxEntry.flxInlineError.setVisibility(false);
     this.view.flxEditMFAConfig.setVisibility(true);
     Object.assign(mfaConfigEditState, data);
     if (mfaConfigEditState.mfaTypeId === "SECURE_ACCESS_CODE") {
       this.view.flxRow2.isVisible = true;
       this.view.flxColumn12.isVisible = true;
       this.view.lblHeader11.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Code_Length");

       this.view.valueSelector11.setValues(parseInt(mfaConfigEditState.mfaConfigurations.SAC_CODE_LENGTH.minLength),
                                           parseInt(mfaConfigEditState.mfaConfigurations.SAC_CODE_LENGTH.maxLength));
       this.view.valueSelector11.setSkinForSelected(parseInt(mfaConfigEditState.mfaConfigurations.SAC_CODE_LENGTH.mfaValue));

       this.view.valueSelector21.setValues(parseInt(mfaConfigEditState.mfaConfigurations.SAC_MAX_RESEND_REQUESTS_ALLOWED.minLength),
                                           parseInt(mfaConfigEditState.mfaConfigurations.SAC_MAX_RESEND_REQUESTS_ALLOWED.maxLength));
       this.view.valueSelector21.setSkinForSelected(parseInt(mfaConfigEditState.mfaConfigurations.SAC_MAX_RESEND_REQUESTS_ALLOWED.mfaValue));
       this.view.textBoxEntry.tbxEnterValue.text = mfaConfigEditState.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.mfaValue;
       this.view.textBoxEntry.tbxEnterValue.info = {"min":parseInt(mfaConfigEditState.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.minLength),
                                                    "max":parseInt(mfaConfigEditState.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.maxLength)};
     } else if (mfaConfigEditState.mfaTypeId === "SECURITY_QUESTIONS") {
       this.view.flxRow2.isVisible = false;
       this.view.flxColumn12.isVisible = false;
       this.view.lblHeader11.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Number_Of_Questions_Asked_At_A_Time");

       this.view.valueSelector11.setValues(parseInt(mfaConfigEditState.mfaConfigurations.SQ_NUMBER_OF_QUESTION_ASKED.minLength),
                                           parseInt(mfaConfigEditState.mfaConfigurations.SQ_NUMBER_OF_QUESTION_ASKED.maxLength));
       this.view.valueSelector11.setSkinForSelected(parseInt(mfaConfigEditState.mfaConfigurations.SQ_NUMBER_OF_QUESTION_ASKED.mfaValue));
     }
     this.view.valueSelector31.setValues(1,parseInt(mfaConfigEditState.mfaConfigurations.MAX_FAILED_ATTEMPTS_ALLOWED.maxLength));

     this.view.valueSelector31.setSkinForSelected( parseInt(mfaConfigEditState.mfaConfigurations.MAX_FAILED_ATTEMPTS_ALLOWED.mfaValue));
     this.view.lblMFAConfigName.text = mfaConfigEditState.mfaTypeName;
     if (mfaConfigEditState.mfaConfigurations.LOCK_USER.mfaValue === "true") {
       this.view.radioAfterMaxFailedAttempts.selectedKey = "LOCK_USER";
     } else if (mfaConfigEditState.mfaConfigurations.LOGOUT_USER.mfaValue === "true") {
       this.view.radioAfterMaxFailedAttempts.selectedKey = "LOGOUT_USER";
     }
     this.view.forceLayout();
     document.getElementById("frmMFAConfigurations_radioAfterMaxFailedAttempts").children[1].style["padding-left"] = "20px";
   },
  /**
   * Called when clicked on yes in confirmation popup.
   */
  editPopupYesClickHandler: function() {
   this.view.flxEditMFAConfig.isVisible = false;
   this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.manageConfiguration");
  },
  /**
   * Called when clicked on update in edit form. It will invoke update service.
   */
  onUpdateClickHandler: function() {
   kony.print(JSON.stringify(mfaConfigEditState));
   mfaConfigEditState.mfaConfigurations.MAX_FAILED_ATTEMPTS_ALLOWED.mfaValue = this.view.valueSelector31.selectedValue;
   var updatedObject = {
    "mfaTypeId": mfaConfigEditState.mfaTypeId + "",
    "mfaConfigurations": [{
      "mfaKey": "MAX_FAILED_ATTEMPTS_ALLOWED",
      "mfaValue": mfaConfigEditState.mfaConfigurations.MAX_FAILED_ATTEMPTS_ALLOWED.mfaValue + ""
     },
     {
      "mfaKey": "LOGOUT_USER",
      "mfaValue": mfaConfigEditState.mfaConfigurations.LOGOUT_USER.mfaValue + ""
     },
     {
      "mfaKey": "LOCK_USER",
      "mfaValue": mfaConfigEditState.mfaConfigurations.LOCK_USER.mfaValue + ""
     }
    ]
   };
   if (mfaConfigEditState.mfaTypeId === "SECURE_ACCESS_CODE") {
    mfaConfigEditState.mfaConfigurations.SAC_CODE_LENGTH.mfaValue = this.view.valueSelector11.selectedValue;
     mfaConfigEditState.mfaConfigurations.SAC_MAX_RESEND_REQUESTS_ALLOWED.mfaValue = this.view.valueSelector21.selectedValue;
     
    updatedObject.mfaConfigurations.push({
     "mfaKey": "SAC_CODE_LENGTH",
     "mfaValue": mfaConfigEditState.mfaConfigurations.SAC_CODE_LENGTH.mfaValue + ""
    });
    updatedObject.mfaConfigurations.push({
     "mfaKey": "SAC_CODE_EXPIRES_AFTER",
     "mfaValue": mfaConfigEditState.mfaConfigurations.SAC_CODE_EXPIRES_AFTER.mfaValue + ""
    });
    updatedObject.mfaConfigurations.push({
     "mfaKey": "SAC_MAX_RESEND_REQUESTS_ALLOWED",
     "mfaValue": mfaConfigEditState.mfaConfigurations.SAC_MAX_RESEND_REQUESTS_ALLOWED.mfaValue + ""
    });
   } else {
     mfaConfigEditState.mfaConfigurations.SQ_NUMBER_OF_QUESTION_ASKED.mfaValue = this.view.valueSelector11.selectedValue;
    updatedObject.mfaConfigurations.push({
     "mfaKey": "SQ_NUMBER_OF_QUESTION_ASKED",
     "mfaValue": mfaConfigEditState.mfaConfigurations.SQ_NUMBER_OF_QUESTION_ASKED.mfaValue + ""
    });
   }
   this.presenter.updateMFAConfiguration(updatedObject);
  },
  validateEdit : function(){
    if(this.view.textBoxEntry.flxInlineError.isVisible === true){
      return false;
    }else{
      return true;
    }
  }
 };
});
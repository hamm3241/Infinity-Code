define({
  passwordAgeAndLockoutValues : {
    passwordValidity : null,
    passwordHistoryCount : null,
    passwordExpiryWarningRequired : false,
    passwordExpiryWarningThreshold : null,
    accountLockoutThreshold : null,
    accountLockoutTime : null,
    recoveryEmailLinkValidity : null
  },
  numberRegex : new RegExp("^([0-9]+)$"),
  
  willUpdateUI: function (context) {
    this.updateLeftMenu(context);
    if(context.LoadingScreen) {
      if(context.LoadingScreen.focus) {
        kony.adminConsole.utils.showProgressBar(this.view);
      }
      else {
        kony.adminConsole.utils.hideProgressBar(this.view);
      } 
    }
    if(context.getPasswordLockoutSettingsResponse) {
      this.getResponse(context.getPasswordLockoutSettingsResponse);
    }
    else if(context.updatePasswordLockoutSettingsResponse) {
      this.updateResponse(context.updatePasswordLockoutSettingsResponse);
    }
    this.view.forceLayout();
  },

  passwordAgeAndLockoutPreShow : function() {
    this.view.flxUpdateSettings.setVisibility(false);
    this.view.flxViewSettings.setVisibility(false);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.Title");
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.flxMainContent.height = (kony.os.deviceInfo().screenHeight - 106) + "px";
    this.view.flxUpdateSettings.height = ((kony.os.deviceInfo().screenHeight - 106 - 20) + "px");    
    this.view.flxEditContainerScroll.height = ((kony.os.deviceInfo().screenHeight - 106 - 20-80) + "px"); 
    this.setFlowActions();
    this.view.forceLayout();
  },

  setFlowActions : function() {
    var scopeObj = this;

    this.view.btnUpdate.onClick = function() {
      scopeObj.showUpdateSettingsPage();
    };

    this.view.btnCancelUpdate.onClick = function() {
      scopeObj.view.flxPasswordAgeLockoutCancel.setVisibility(true);
    };
    this.view.btnDoUpdate.onClick = function() {
      scopeObj.closeAndShowSettingsViewPage();
    };

    this.view.flxExpiryWarningRadioYes.onClick = function() {
      scopeObj.expiryWarningRadioClickYes();
    };
    this.view.flxExpiryWarningRadioNo.onClick = function() {
      scopeObj.expiryWarningRadioClickNo();
    };

    this.view.tbxUpdatePasswordValidityVal.onBeginEditing = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmPasswordAgeAndLockoutSettings_tbxUpdatePasswordValidityVal");
      scopeObj.onBeginEditingUpdatePasswordValidityVal();
    };
    this.view.tbxUpdatePasswordValidityVal.onEndEditing = function() {
      scopeObj.onEndEditingUpdatePasswordValidityVal();
    };

    this.view.tbxUpdatePasswordHistoryCountVal.onBeginEditing = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmPasswordAgeAndLockoutSettings_tbxUpdatePasswordHistoryCountVal");
      scopeObj.onBeginEditingUpdatePasswordHistoryCountVal();
    };
    this.view.tbxUpdatePasswordHistoryCountVal.onEndEditing = function() {
      scopeObj.onEndEditingUpdatePasswordHistoryCountVal();
    };

    this.view.tbxUpdatePasswordExpiryThresholdVal.onBeginEditing = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmPasswordAgeAndLockoutSettings_tbxUpdatePasswordExpiryThresholdVal");
      scopeObj.onBeginEditingUpdatePasswordExpiryThresholdVal();
    };
    this.view.tbxUpdatePasswordExpiryThresholdVal.onEndEditing = function() {
      scopeObj.onEndEditingUpdatePasswordExpiryThresholdVal();
    };

    this.view.tbxUpdateAccountLockoutThresholdVal.onBeginEditing = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmPasswordAgeAndLockoutSettings_tbxUpdateAccountLockoutThresholdVal");
      scopeObj.onBeginEditingUpdateAccountLockoutThresholdVal();
    };
    this.view.tbxUpdateAccountLockoutThresholdVal.onEndEditing = function() {
      scopeObj.onEndEditingUpdateAccountLockoutThresholdVal();
    };

    this.view.tbxUpdateAccountLockoutTimeVal.onBeginEditing = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmPasswordAgeAndLockoutSettings_tbxUpdateAccountLockoutTimeVal");
      scopeObj. onBeginEditingUpdateAccountLockoutTimeVal();
    };
    this.view.tbxUpdateAccountLockoutTimeVal.onEndEditing = function() {
      scopeObj.onEndEditingUpdateAccountLockoutTimeVal();
    };

    this.view.tbxUpdateActivationAndRecoveryEmailVal.onBeginEditing = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmPasswordAgeAndLockoutSettings_tbxUpdateActivationAndRecoveryEmailVal");
      scopeObj.onBeginEditingUpdateActivationAndRecoveryEmailVal();
    };
    this.view.tbxUpdateActivationAndRecoveryEmailVal.onEndEditing = function() {
      scopeObj.onEndEditingUpdateActivationAndRecoveryEmailVal();
    };
    this.view.popUpDelete.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxPasswordAgeLockoutCancel.setVisibility(false);
    };
    this.view.popUpDelete.flxPopUpClose.onClick = function() {
      scopeObj.view.flxPasswordAgeLockoutCancel.setVisibility(false);
    };
    this.view.popUpDelete.btnPopUpDelete.onClick = function() {
      scopeObj.onCancelButtonClicked();
    };
  },

  expiryWarningRadioClickYes : function() {
    var scopeObj = this;

    if(scopeObj.view.imgExpiryWarningRadioYes.src === "radio_notselected.png") {
      scopeObj.view.imgExpiryWarningRadioYes.src = "radio_selected.png";
      scopeObj.view.imgExpiryWarningRadioNo.src = "radio_notselected.png";
      scopeObj.view.flxUpdatePasswordExpiryWarningThreshold.setVisibility(true);
    }
  },

  expiryWarningRadioClickNo : function() {
    var scopeObj = this;

    if(scopeObj.view.imgExpiryWarningRadioNo.src === "radio_notselected.png") {
      scopeObj.view.imgExpiryWarningRadioNo.src = "radio_selected.png";
      scopeObj.view.imgExpiryWarningRadioYes.src = "radio_notselected.png";
      scopeObj.view.tbxUpdatePasswordExpiryThresholdVal.text = "";
      scopeObj.view.flxUpdatePasswordExpiryWarningThreshold.setVisibility(false);
    }
  },

  populateSettingsViewPage: function(context) {
    var scopeObj = this;

    scopeObj.passwordAgeAndLockoutValues.passwordValidity = context.passwordValidity;
    scopeObj.passwordAgeAndLockoutValues.passwordHistoryCount = context.passwordHistoryCount;
    scopeObj.passwordAgeAndLockoutValues.passwordExpiryWarningRequired = context.passwordExpiryWarningRequired;
    scopeObj.passwordAgeAndLockoutValues.passwordExpiryWarningThreshold = context.passwordExpiryWarningThreshold;
    scopeObj.passwordAgeAndLockoutValues.accountLockoutThreshold = context.accountLockoutThreshold;
    scopeObj.passwordAgeAndLockoutValues.accountLockoutTime = context.accountLockoutTime;
    scopeObj.passwordAgeAndLockoutValues.recoveryEmailLinkValidity = context.recoveryEmailLinkValidity;

    this.view.lblViewPasswordValidityVal.text = context.passwordValidity + ' days';
    this.view.lblViewPasswordHistoryCountVal.text = context.passwordHistoryCount + ' previous password(s)';
    if(context.passwordExpiryWarningRequired) {
      this.view.lblViewPasswordExpiryWarningVal.text = 'Yes';
    }
    else {
      this.view.lblViewPasswordExpiryWarningVal.text = 'No';
    }
    if(context.passwordExpiryWarningThreshold !== -1) {
      this.view.lblViewPasswordExpiryThresholdVal.text = context.passwordExpiryWarningThreshold + ' days';
    }
    else {
      this.view.lblViewPasswordExpiryThresholdVal.text = 'Not applicable';
    }

    this.view.lblAccountLockoutThresholdVal.text = context.accountLockoutThreshold + ' attempt(s)';
    this.view.lblViewAccountLockoutTimeVal.text = context.accountLockoutTime + ' minute(s)';
    this.view.lblViewActivationAndRecoveryEmailVal.text = context.recoveryEmailLinkValidity + ' minute(s)';

    this.view.flxUpdateSettings.setVisibility(false);
    this.view.flxViewSettings.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.Title");
    this.view.forceLayout();
  },
  
    showUpdateSettingsPage: function() {
    var scopeObj = this;

    this.view.flxPasswordValidityError.setVisibility(false);
    this.view.flxPasswordHistoryCountError.setVisibility(false);
    this.view.flxUpdatePasswordExpiryWarningThresholdError.setVisibility(false);
    this.view.flxUpdateAccountLockoutThresholdError.setVisibility(false);
    this.view.flxUpdateAccountLockoutTimeError.setVisibility(false);
    this.view.flxUpdateActivationAndRecoveryEmailError.setVisibility(false);

    this.view.flxUpdatePasswordValidityVal.skin = "sknUpdatePasswordSettingsNormal";
    this.view.flxUpdatePasswordHistoryCountVal.skin = "sknUpdatePasswordSettingsNormal";
    this.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsNormal";
    this.view.flxUpdateAccountLockoutThresholdVal.skin = "sknUpdatePasswordSettingsNormal";
    this.view.flxUpdateAccountLockoutTimeVal.skin = "sknUpdatePasswordSettingsNormal";
    this.view.flxUpdateActivationAndRecoveryEmailVal.skin = "sknUpdatePasswordSettingsNormal";

    this.view.tbxUpdatePasswordValidityVal.text = scopeObj.passwordAgeAndLockoutValues.passwordValidity;
    this.view.tbxUpdatePasswordHistoryCountVal.text = scopeObj.passwordAgeAndLockoutValues.passwordHistoryCount;
    if(scopeObj.passwordAgeAndLockoutValues.passwordExpiryWarningRequired) {
      this.view.imgExpiryWarningRadioYes.src = "radio_selected.png";
      this.view.imgExpiryWarningRadioNo.src = "radio_notselected.png";
      this.view.flxUpdatePasswordExpiryWarningThreshold.setVisibility(true);
    }
    else {
      this.view.imgExpiryWarningRadioYes.src = "radio_notselected.png";
      this.view.imgExpiryWarningRadioNo.src = "radio_selected.png";
      this.view.flxUpdatePasswordExpiryWarningThreshold.setVisibility(false);
    }
    if(scopeObj.passwordAgeAndLockoutValues.passwordExpiryWarningRequired && scopeObj.passwordAgeAndLockoutValues.passwordExpiryWarningThreshold !== -1) {
      this.view.tbxUpdatePasswordExpiryThresholdVal.text = scopeObj.passwordAgeAndLockoutValues.passwordExpiryWarningThreshold;
    }
    else {
      this.view.tbxUpdatePasswordExpiryThresholdVal.text = "";
    }
    this.view.tbxUpdateAccountLockoutThresholdVal.text = scopeObj.passwordAgeAndLockoutValues.accountLockoutThreshold;
    this.view.tbxUpdateAccountLockoutTimeVal.text = scopeObj.passwordAgeAndLockoutValues.accountLockoutTime;
    this.view.tbxUpdateActivationAndRecoveryEmailVal.text = scopeObj.passwordAgeAndLockoutValues.recoveryEmailLinkValidity;

    this.view.flxViewSettings.setVisibility(false);
    this.view.flxUpdateSettings.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.TitleEdit");
    this.view.forceLayout();
  },
  
  closeAndShowSettingsViewPage: function() {
    if(this.areInputsValid())
    {
      var updatePasswordAgeAndLockoutData = {
        "passwordValidity" : this.view.tbxUpdatePasswordValidityVal.text,
        "passwordHistoryCount" : this.view.tbxUpdatePasswordHistoryCountVal.text,
        "accountLockoutThreshold" : this.view.tbxUpdateAccountLockoutThresholdVal.text,
        "accountLockoutTime" : this.view.tbxUpdateAccountLockoutTimeVal.text,
        "recoveryEmailLinkValidity" : this.view.tbxUpdateActivationAndRecoveryEmailVal.text
      };

      if(this.view.imgExpiryWarningRadioYes.src === "radio_selected.png") {
        updatePasswordAgeAndLockoutData.passwordExpiryWarningRequired = true;
        updatePasswordAgeAndLockoutData.passwordExpiryWarningThreshold = this.view.tbxUpdatePasswordExpiryThresholdVal.text;
      }
      else {
        updatePasswordAgeAndLockoutData.passwordExpiryWarningRequired = false;
        updatePasswordAgeAndLockoutData.passwordExpiryWarningThreshold = "-1";
      }

      this.presenter.updatePasswordLockoutSettings(updatePasswordAgeAndLockoutData);
      this.view.flxViewSettings.setVisibility(true);
      this.view.flxUpdateSettings.setVisibility(false);
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.Title");
      this.view.forceLayout();
    }
    else {
      kony.print("Invalid Inputs");
    }
  },
  
  onCancelButtonClicked: function() {
    this.view.flxUpdateSettings.setVisibility(false);
    this.view.flxViewSettings.setVisibility(true);
    this.view.flxPasswordAgeLockoutCancel.setVisibility(false);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.Title");
    this.view.forceLayout();
  },

  areInputsValid: function() {
    var scopeObj = this;
    var flag = true;

    if(this.view.tbxUpdatePasswordValidityVal.text === "") {
      this.view.lblPasswordValidityError.text = "Field must not be empty";
      this.view.flxPasswordValidityError.setVisibility(true);
      this.view.flxUpdatePasswordValidityVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(scopeObj.numberRegex.test(this.view.tbxUpdatePasswordValidityVal.text) === false) {
      this.view.lblPasswordValidityError.text = "This field can only contain a positive number";
      this.view.flxPasswordValidityError.setVisibility(true);
      this.view.flxUpdatePasswordValidityVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(parseInt(this.view.tbxUpdatePasswordValidityVal.text) < 1 || parseInt(this.view.tbxUpdatePasswordValidityVal.text) > 999) {
      this.view.lblPasswordValidityError.text = "Field can contain numbers between 1 and 999";
      this.view.flxPasswordValidityError.setVisibility(true);
      this.view.flxUpdatePasswordValidityVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }

    if(this.view.tbxUpdatePasswordHistoryCountVal.text === "") {
      this.view.lblPasswordHistoryCountError.text = "Field must not be empty";
      this.view.flxPasswordHistoryCountError.setVisibility(true);
      this.view.flxUpdatePasswordHistoryCountVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(scopeObj.numberRegex.test(this.view.tbxUpdatePasswordHistoryCountVal.text) === false) {
      this.view.lblPasswordHistoryCountError.text = "This field can only contain a positive number";
      this.view.flxPasswordHistoryCountError.setVisibility(true);
      this.view.flxUpdatePasswordHistoryCountVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(parseInt(this.view.tbxUpdatePasswordHistoryCountVal.text) < 1 || parseInt(this.view.tbxUpdatePasswordHistoryCountVal.text) > 9) {
      this.view.lblPasswordHistoryCountError.text = "Field can contain numbers between 1 and 9";
      this.view.flxPasswordHistoryCountError.setVisibility(true);
      this.view.flxUpdatePasswordHistoryCountVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }

    if(this.view.imgExpiryWarningRadioYes.src === "radio_selected.png") {
      if(this.view.tbxUpdatePasswordExpiryThresholdVal.text === "") {
        this.view.lblUpdatePasswordExpiryWarningThresholdError.text = "Field must not be empty";
        this.view.flxUpdatePasswordExpiryWarningThresholdError.setVisibility(true);
        this.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsError";
        flag = false;
      }
      else if(scopeObj.numberRegex.test(this.view.tbxUpdatePasswordExpiryThresholdVal.text) === false) {
        this.view.lblUpdatePasswordExpiryWarningThresholdError.text = "This field can only contain a positive number";
        this.view.flxUpdatePasswordExpiryWarningThresholdError.setVisibility(true);
        this.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsError";
        flag = false;
      }
      else if(parseInt(this.view.tbxUpdatePasswordExpiryThresholdVal.text) < 1 || parseInt(this.view.tbxUpdatePasswordExpiryThresholdVal.text) > 99) {
        this.view.lblUpdatePasswordExpiryWarningThresholdError.text = "Field can contain numbers between 1 and 99";
        this.view.flxUpdatePasswordExpiryWarningThresholdError.setVisibility(true);
        this.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsError";
        flag = false;
      }
      else if(parseInt(this.view.tbxUpdatePasswordExpiryThresholdVal.text) > parseInt(this.view.tbxUpdatePasswordValidityVal.text)){
        this.view.lblUpdatePasswordExpiryWarningThresholdError.text = "Can’t be greater than the expiration period.";
        this.view.flxUpdatePasswordExpiryWarningThresholdError.setVisibility(true);
        this.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsError";
        flag = false;
      }
    }

    if(this.view.tbxUpdateAccountLockoutThresholdVal.text === "") {
      this.view.lblUpdateAccountLockoutThresholdError.text = "Field must not be empty";
      this.view.flxUpdateAccountLockoutThresholdError.setVisibility(true);
      this.view.flxUpdateAccountLockoutThresholdVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(scopeObj.numberRegex.test(this.view.tbxUpdateAccountLockoutThresholdVal.text) === false) {
      this.view.lblUpdateAccountLockoutThresholdError.text = "This field can only contain a positive number";
      this.view.flxUpdateAccountLockoutThresholdError.setVisibility(true);
      this.view.flxUpdateAccountLockoutThresholdVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(parseInt(this.view.tbxUpdateAccountLockoutThresholdVal.text) < 1 || parseInt(this.view.tbxUpdateAccountLockoutThresholdVal.text) > 99) {
      this.view.lblUpdateAccountLockoutThresholdError.text = "Field can contain numbers between 1 and 99";
      this.view.flxUpdateAccountLockoutThresholdError.setVisibility(true);
      this.view.flxUpdateAccountLockoutThresholdVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }

    if(this.view.tbxUpdateAccountLockoutTimeVal.text === "") {
      this.view.lblUpdateAccountLockoutTimeError.text = "Field must not be empty";
      this.view.flxUpdateAccountLockoutTimeError.setVisibility(true);
      this.view.flxUpdateAccountLockoutTimeVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(scopeObj.numberRegex.test(this.view.tbxUpdateAccountLockoutTimeVal.text) === false) {
      this.view.lblUpdateAccountLockoutTimeError.text = "This field can only contain a positive number";
      this.view.flxUpdateAccountLockoutTimeError.setVisibility(true);
      this.view.flxUpdateAccountLockoutTimeVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(parseInt(this.view.tbxUpdateAccountLockoutTimeVal.text) < 1 || parseInt(this.view.tbxUpdateAccountLockoutTimeVal.text) > 9999) {
      this.view.lblUpdateAccountLockoutTimeError.text = "Field can contain numbers between 1 and 9999";
      this.view.flxUpdateAccountLockoutTimeError.setVisibility(true);
      this.view.flxUpdateAccountLockoutTimeVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }

    if(this.view.tbxUpdateActivationAndRecoveryEmailVal.text === "") {
      this.view.lblUpdateActivationAndRecoveryEmailError.text = "Field must not be empty";
      this.view.flxUpdateActivationAndRecoveryEmailError.setVisibility(true);
      this.view.flxUpdateActivationAndRecoveryEmailVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(scopeObj.numberRegex.test(this.view.tbxUpdateActivationAndRecoveryEmailVal.text) === false) {
      this.view.lblUpdateActivationAndRecoveryEmailError.text = "This field can only contain a positive number";
      this.view.flxUpdateActivationAndRecoveryEmailError.setVisibility(true);
      this.view.flxUpdateActivationAndRecoveryEmailVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }
    else if(parseInt(this.view.tbxUpdateActivationAndRecoveryEmailVal.text) < 1 || parseInt(this.view.tbxUpdateActivationAndRecoveryEmailVal.text) > 9999) {
      this.view.lblUpdateActivationAndRecoveryEmailError.text = "Field can contain numbers between 1 and 9999";
      this.view.flxUpdateActivationAndRecoveryEmailError.setVisibility(true);
      this.view.flxUpdateActivationAndRecoveryEmailVal.skin = "sknUpdatePasswordSettingsError";
      flag = false;
    }

    return flag;
  },

  getResponse : function(response) {
    var scopeObj = this;

    if(response.status === "success") {
      scopeObj.populateSettingsViewPage(response.passwordAgeAndLockoutData.passwordlockoutsettings);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage("Failed to fetch password settings", scopeObj);
    }
  },

  updateResponse : function(response) {
    var scopeObj = this;

    if(response.status === "success") {
      scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.Password_settings_updated_msg"), scopeObj);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.PasswordAgeAndLockout.Password_settings_failed_update_msg"), scopeObj);
    }
  },


  onBeginEditingUpdatePasswordValidityVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdatePasswordValidityVal.skin = "sknUpdatePasswordSettingsFocus";
    scopeObj.view.flxPasswordValidityError.setVisibility(false);
  },
  onEndEditingUpdatePasswordValidityVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdatePasswordValidityVal.skin = "sknUpdatePasswordSettingsNormal";
  },

  onBeginEditingUpdatePasswordHistoryCountVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdatePasswordHistoryCountVal.skin = "sknUpdatePasswordSettingsFocus";
    scopeObj.view.flxPasswordHistoryCountError.setVisibility(false);
  },
  onEndEditingUpdatePasswordHistoryCountVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdatePasswordHistoryCountVal.skin = "sknUpdatePasswordSettingsNormal";
  },

  onBeginEditingUpdatePasswordExpiryThresholdVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsFocus";
    scopeObj.view.flxUpdatePasswordExpiryWarningThresholdError.setVisibility(false);
  },
  onEndEditingUpdatePasswordExpiryThresholdVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdatePasswordExpiryWarningThresholdVal.skin = "sknUpdatePasswordSettingsNormal";
  },

  onBeginEditingUpdateAccountLockoutThresholdVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdateAccountLockoutThresholdVal.skin = "sknUpdatePasswordSettingsFocus";
    scopeObj.view.flxUpdateAccountLockoutThresholdError.setVisibility(false);
  },
  onEndEditingUpdateAccountLockoutThresholdVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdateAccountLockoutThresholdVal.skin = "sknUpdatePasswordSettingsNormal";
  },

  onBeginEditingUpdateAccountLockoutTimeVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdateAccountLockoutTimeVal.skin = "sknUpdatePasswordSettingsFocus";
    scopeObj.view.flxUpdateAccountLockoutTimeError.setVisibility(false);
  },
  onEndEditingUpdateAccountLockoutTimeVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdateAccountLockoutTimeVal.skin = "sknUpdatePasswordSettingsNormal";
  },

  onBeginEditingUpdateActivationAndRecoveryEmailVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdateActivationAndRecoveryEmailVal.skin = "sknUpdatePasswordSettingsFocus";
    scopeObj.view.flxUpdateActivationAndRecoveryEmailError.setVisibility(false);
  },
  onEndEditingUpdateActivationAndRecoveryEmailVal : function() {
    var scopeObj = this;
    scopeObj.view.flxUpdateActivationAndRecoveryEmailVal.skin = "sknUpdatePasswordSettingsNormal";
  }
});
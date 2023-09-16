define({ 

  username : null,
  
  getPresenter : function(){
    return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule").presentationController;
  },

  /**
   * Function  to update UI
   * Parameters: context
   */
  willUpdateUI: function (context) {

    if(context !== undefined) {
      if(context.username)
        this.username = context.username;
      if (context.action === "passwordExpired") {
        this.passwordExpiredUI();
      }
      else if (context.action === "resetPasswordConfirm") {
        this.resetPasswordConfirmUI();
      }
      else if (context.action === "changePassword") {
        this.changePasswordUI();
      }
      else if (context.action === "downTime") {
        this.downTimeUI();
      }
      else if (context.action === "exceddedAttempts") {
        this.exceddedAttemptsUI();
      }
      else if (context.action === "forgotEmail") {
        this.forgotEmailUI();
      }
      else if(context.action === "showIncorrectEmailFlex"){
        this.showIncorrectEmailFlexUI(context);
      }
      else if(context.action === "emailNotPresentInDB" || context.action === "multipleProfilesForEmail"){
        this.showIncorrectEmailFlexUI(context);
      }
      else if(context.action === "showEmailSentFlex"){
        this.showEmailSentFlexUI(context);
      }
      else if(context.action === "changePasswordForgotUser"){
        this.changePasswordForgotUserUI(context);
      }
      else if(context.action === "resetLinkExpired"){
        this.resetLinkExpiredUI();
      }
      else if(context.action === "resetLinkResend"){
        this.resetLinkResendUI();
      }
      else if(context.action === "resetLinkNotSend"){
        this.resetLinkNotSendUI(context.emailMessage);
      }
      else if(context.action === "resetLinkInvalid"){
        this.resetLinkInvalidUI();
      }
      else if(context.action === "resetPassword"){
        this.resetLinkResendUI();
      }
    }
    this.view.forceLayout();
  },
  /**
    * Function preshow of form
  **/
  preshowLoginError: function(){
    this.preshowActions();
    this.view.txtCurrentPassword.text="";
    this.view.txtNewPassword.text="";
    this.view.flxForgotEmailErrorMsg.isVisible = false;
    this.view.registertextbox.skin = "skinPasswordTextField";
    this.view.registertextbox.text="";
    this.view.txtReenterPassword.text="";
    this.view.txtReenterPassword.text="";
    this.view.txtNewPassword.text="";
    this.view.txtCurrentPassword.text="";
    this.view.txtNewPassword.skin="skinPasswordTextField";
    this.view.txtCurrentPassword.skin="skinPasswordTextField";
    this.view.txtReenterPassword.skin="skinPasswordTextField";
    this.view.lblIncorrectCurrentPassword.isVisible=false;
    this.view.lblErrorIconCurrentPassword.isVisible=false;
    this.view.lblPasswordNotValid.isVisible=false;
    this.view.lblErrorIconNewPassword.isVisible=false;
    this.view.lblPasswordDontMatch.isVisible=false;
    this.view.lblErrorIconReenterNewPassword.isVisible=false;
    this.view.txtNewPassword1.text = "";
    this.view.txtReenterPassword1.text="";
    this.view.txtReenterPassword1.skin="skinPasswordTextField";
    this.view.lblErrorMsgNewPasswordFP.isVisible=false;
    this.view.pwdrules.setVisibility(false);
    this.view.imgDownArrowFP.setVisibility(false);
    this.view.flxPwdRules.setVisibility(false);
    this.view.imgDownArrowCP.setVisibility(false);
    this.view.flxEyeiconCPCurrent.setVisibility(false);
    this.view.flxEyecrossCPCurrent.setVisibility(true);
    this.view.flxEyeiconCPNew.setVisibility(false);
    this.view.flxEyecrossCPNew.setVisibility(true);
    this.view.flxEyeiconCPReEnter.setVisibility(false);
    this.view.flxEyecrossCPReEnter.setVisibility(true);
    this.view.flxEyeiconFP.setVisibility(false);
    this.view.flxEyecrossFP.setVisibility(true);
    this.view.flxEyeiconFPReEnter.setVisibility(false);
    this.view.flxEyecrossFPReEnter.setVisibility(true);
    this.view.txtNewPassword1.secureTextEntry = true;
    this.view.txtReenterPassword1.secureTextEntry = true;
    this.view.txtCurrentPassword.secureTextEntry = true;
    this.view.txtNewPassword.secureTextEntry = true;
    this.view.txtReenterPassword.secureTextEntry = true;
	this.view.txtUserName.setEnabled(false);
  },
  /**
    * Function preshow actions
  **/
  preshowActions: function(){
    var scopeObj=this;

    this.view.registertextbox.onBeginEditing=function(){
      scopeObj.view.flxForgotEmailErrorMsg.isVisible = false;
      scopeObj.view.registertextbox.skin = "skinPasswordTextField";

    };
    this.view.txtUserName.onEndEditing=function(){
      scopeObj.view.txtUserName.text=this.username;
    };

    this.view.lblRulesFP.onClick=function(){
      if (scopeObj.view.pwdrules.isVisible) {
        scopeObj.view.pwdrules.isVisible = false;
        scopeObj.view.imgDownArrowFP.isVisible = false;
      } else {
        scopeObj.view.pwdrules.isVisible = true;
        scopeObj.view.imgDownArrowFP.isVisible = true;
      }
    };

    this.view.lblRules.onClick=function(){
      if (scopeObj.view.flxPwdRules.isVisible) {
        scopeObj.view.flxPwdRules.isVisible = false;
        scopeObj.view.imgDownArrowCP.isVisible = false;
      } else {
        scopeObj.view.flxPwdRules.isVisible = true;
        scopeObj.view.imgDownArrowCP.isVisible = true;
      }
    };

    this.view.btnResetPassword1.onClick=function(){
      scopeObj.setForgetPasswordValidation();
    };

    this.view.btnResetPassword.onClick=function(){
      scopeObj.changePasswordValidation();

    };

    this.view.flxCancelText.onClick=function(){
      scopeObj.cancelResetPassword();
    };
    this.view.flxCancel.onClick=function(){
      scopeObj.showLoginPage();
    };
    this.view.ContinueButton.onClick=function(){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      var userEmailId = scopeObj.view.registertextbox.text;
      var emailCheck = (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(userEmailId));
      if (emailCheck === true) {
        scopeObj.view.flxForgotEmailErrorMsg.isVisible = false;
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        authModule.presentationController.sendResetPasswordEmail(scopeObj, {"emailType" : "resetPassword", "emailId" : userEmailId});
      } else {
        scopeObj.view.flxForgotEmailErrorMsg.isVisible = true;
        scopeObj.view.registerErrorMsgTextbox.text = userEmailId === ""? kony.i18n.getLocalizedString("i18n.frmErrorLogin.enterEmailErrMsg") : kony.i18n.getLocalizedString("i18n.frmErrorLogin.incorrectEmailErrMsg");
        scopeObj.view.registertextbox.skin = "skinredbg";

      }
    };
    this.view.btnRelogin.onClick=function(){
      location.reload();
      scopeObj.showLoginPage();
    };
    this.view.Resendlbl.onClick=function(){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      var userEmailId = scopeObj.view.lblEmail.text;
      scopeObj.view.Resendlbl.isVisible = false;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      authModule.presentationController.sendResetPasswordEmail(scopeObj, {"emailType" : "resetPassword", "emailId" : userEmailId});
    };
    this.view.btnRetry.onClick=function(){
      scopeObj.showLoginPage();
    };

    this.view.txtNewPassword1.onTouchStart=function(){
      scopeObj.resetTextBoxSkinFP();
    };
    this.view.txtReenterPassword1.onTouchStart=function(){
      scopeObj.resetTextBoxSkinFP();
    };

    this.view.txtCurrentPassword.onTouchStart=function(){
      scopeObj.resetTextBoxSkinCP();
    };
    this.view.txtNewPassword.onTouchStart=function(){
      scopeObj.resetTextBoxSkinCP();
    };
    this.view.txtReenterPassword.onTouchStart=function(){
      scopeObj.resetTextBoxSkinCP();
    };

    this.view.flxEyeiconFP.onClick=function(){
      scopeObj.maskText("lblErrorMsgNewPasswordFP", "txtNewPassword1", "flxEyeiconFP", "flxEyecrossFP");
    };
    this.view.flxEyecrossFP.onClick=function(){
      scopeObj.maskText("lblErrorMsgNewPasswordFP", "txtNewPassword1", "flxEyeiconFP", "flxEyecrossFP");
    };
    this.view.flxEyeiconFPReEnter.onClick=function(){
      scopeObj.maskText("lblErrorMsgReenterPasswordFP", "txtReenterPassword1", "flxEyeiconFPReEnter", "flxEyecrossFPReEnter");
    };
    this.view.flxEyecrossFPReEnter.onClick=function(){
      scopeObj.maskText("lblErrorMsgReenterPasswordFP", "txtReenterPassword1", "flxEyeiconFPReEnter", "flxEyecrossFPReEnter");
    };

    this.view.flxEyeiconCPCurrent.onClick=function(){
      scopeObj.maskText("lblIncorrectCurrentPassword", "txtCurrentPassword", "flxEyeiconCPCurrent", "flxEyecrossCPCurrent");
    };
    this.view.flxEyecrossCPCurrent.onClick=function(){
      scopeObj.maskText("lblIncorrectCurrentPassword", "txtCurrentPassword", "flxEyeiconCPCurrent", "flxEyecrossCPCurrent");
    };
    this.view.flxEyeiconCPNew.onClick=function(){
      scopeObj.maskText("lblPasswordNotValid", "txtNewPassword", "flxEyeiconCPNew", "flxEyecrossCPNew");
    };
    this.view.flxEyecrossCPNew.onClick=function(){
      scopeObj.maskText("lblPasswordNotValid", "txtNewPassword", "flxEyeiconCPNew", "flxEyecrossCPNew");
    };
    this.view.flxEyeiconCPReEnter.onClick=function(){
      scopeObj.maskText("lblPasswordDontMatch", "txtReenterPassword", "flxEyeiconCPReEnter", "flxEyecrossCPReEnter");
    };
    this.view.flxEyecrossCPReEnter.onClick=function(){
      scopeObj.maskText("lblPasswordDontMatch", "txtReenterPassword", "flxEyeiconCPReEnter", "flxEyecrossCPReEnter");
    };
    this.view.btnSendNewLink.onClick=function(){
      if(scopeObj.view.btnSendNewLink.text === kony.i18n.getLocalizedString("i18n.frmErrorLogin.btnResetPassword")){
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        var userEmailId = kony.mvc.MDAApplication.getSharedInstance().appContext.emailID; // get email id
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        authModule.presentationController.sendResetPasswordEmail(scopeObj, {"emailType" : "resetPassword", "emailId" : userEmailId, "isLinkExpiredEmailResent" : true});
      } 
      else if(scopeObj.view.btnSendNewLink.text === kony.i18n.getLocalizedString("i18n.frmErrorLogin.backToLoginCAPS")){
        scopeObj.showLoginPage();
      }
    };
    this.view.btnClose.onClick=function(){
      scopeObj.showLoginPage();
    };
    this.view.forceLayout();
  },

  /**
   * reset password call
   */
  ConsecutiveCharsMoreThan4 :function(str){
    for(var i=1, c=1; i<str.length;i++){
      if(str[i]==str[i-1]){
        c++;
        if(c>4)
          return true;
      }
      else c=1;
    }
    return false;
  },

  /**
   *reset text boxes in forget password screen.
   */
  resetTextBoxSkinFP : function(){
    var scopeObj = this;
    scopeObj.view.txtNewPassword1.skin = "skinPasswordTextField"; //normal skin
    scopeObj.view.lblErrorMsgNewPasswordFP.setVisibility(false);
    scopeObj.view.lblErrorIconNewPasswordFP.setVisibility(false);
    scopeObj.view.txtReenterPassword1.skin = "skinPasswordTextField"; //normal skin
    scopeObj.view.lblErrorMsgReenterPasswordFP.setVisibility(false);
    scopeObj.view.lblErrorIconReenterPasswordFP.setVisibility(false);
    scopeObj.view.flxFPToastContainer.setVisibility(false);
    scopeObj.view.forceLayout();
  },

  /**
   *reset text boxes in change password screen.
   */
  resetTextBoxSkinCP : function(){
    var scopeObj = this;
    scopeObj.view.txtCurrentPassword.skin = "skinPasswordTextField"; //normal skin
    scopeObj.view.lblIncorrectCurrentPassword.setVisibility(false);
    scopeObj.view.lblErrorIconCurrentPassword.setVisibility(false);
    scopeObj.view.txtNewPassword.skin = "skinPasswordTextField"; //normal skin
    scopeObj.view.lblPasswordNotValid.setVisibility(false);
    scopeObj.view.lblErrorIconNewPassword.setVisibility(false);
    scopeObj.view.txtReenterPassword.skin = "skinPasswordTextField"; //normal skin
    scopeObj.view.lblPasswordDontMatch.setVisibility(false);
    scopeObj.view.lblErrorIconReenterNewPassword.setVisibility(false);
    scopeObj.view.flxToastContainer.setVisibility(false);
    scopeObj.view.forceLayout();
  },

  /**
   * shows error msg for forget password UI.
   */
  setForgetPasswordValidation: function() {
    var scopeObj = this;
    if(this.view.txtNewPassword1.text === ""||this.view.txtReenterPassword1.text === ""){
      if(this.view.txtNewPassword1.text === ""){
        this.view.txtNewPassword1.skin="skinredbg";
        this.view.lblErrorMsgNewPasswordFP.isVisible=true;
        this.view.lblErrorIconNewPasswordFP.isVisible=true;
        this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_new_password_empty");
      }
      if(this.view.txtReenterPassword1.text === ""){
        this.view.txtReenterPassword1.skin="skinredbg";
        this.view.lblErrorMsgReenterPasswordFP.isVisible=true;
        this.view.lblErrorIconReenterPasswordFP.isVisible=true;
        this.view.lblErrorMsgReenterPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_reenter_password_empty");
      }
    }
    else if(this.view.txtNewPassword1.text===this.username){
      this.view.txtReenterPassword1.skin="skinredbg";
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_new_password_userID_same");
    }
    else if(this.view.txtReenterPassword1.text !== this.view.txtNewPassword1.text){
      this.view.txtReenterPassword1.skin="skinredbg";
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text="The passwords don't match.";
    }
    else if(!this.view.txtNewPassword1.text.match(/[!@#\$%\^&\*]/)){
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_1_special_char");
    }
    else if(!this.view.txtNewPassword1.text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)){
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_alphanumeric");
    }
    else if(this.ConsecutiveCharsMoreThan4(this.view.txtNewPassword1.text)){
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_4_consecutive_char");
    }
    else if(this.view.txtNewPassword1.text.length<8 || this.view.txtNewPassword1.text.length>64){
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_length_between_8_64");
    }
    else if(this.view.txtNewPassword1.text.match(/[0]/)){
      this.view.txtNewPassword1.skin="skinredbg";
      this.view.lblErrorMsgNewPasswordFP.isVisible=true;
      this.view.lblErrorIconNewPasswordFP.isVisible=true;
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_cant_contain_0");
    }
    else
      scopeObj.resetPasswordForForgotPasswordCall();
    this.view.forceLayout();
  },

  /**
   * shows error msg for change password UI.
   */
  changePasswordValidation: function() {
    var scopeObj = this;
    if(this.view.txtCurrentPassword.text === ""||this.view.txtNewPassword.text === ""||this.view.txtReenterPassword.text === ""){
      if(this.view.txtCurrentPassword.text === ""){
        this.view.txtCurrentPassword.skin="skinredbg";
        this.view.lblIncorrectCurrentPassword.isVisible=true;
        this.view.lblErrorIconCurrentPassword.isVisible=true;
        this.view.lblIncorrectCurrentPassword.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_current_password_empty");
      }
      if(this.view.txtNewPassword.text === ""){
        this.view.txtNewPassword.skin="skinredbg";
        this.view.lblPasswordNotValid.isVisible=true;
        this.view.lblErrorIconNewPassword.isVisible=true;
        this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_new_password_empty");
      }
      if(this.view.txtReenterPassword.text === ""){
        this.view.txtReenterPassword.skin="skinredbg";
        this.view.lblPasswordDontMatch.isVisible=true;
        this.view.lblErrorIconReenterNewPassword.isVisible=true;
        this.view.lblPasswordDontMatch.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_reenter_password_empty");
      }
    }
    else if(this.view.txtNewPassword.text===kony.mvc.MDAApplication.getSharedInstance().appContext.userName){
      this.view.txtReenterPassword.skin="skinredbg";
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_new_password_userID_same");
    }
    else if(this.view.txtReenterPassword.text !== this.view.txtNewPassword.text){
      this.view.txtReenterPassword.skin="skinredbg";
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text="The passwords don't match.";
    }
    else if(!this.view.txtNewPassword.text.match(/[!@#\$%\^&\*]/)){
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_1_special_char");
    }
    else if(!this.view.txtNewPassword.text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)){
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_alphanumeric");
    }
    else if(this.ConsecutiveCharsMoreThan4(this.view.txtNewPassword.text)){
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_4_consecutive_char");
    }
    else if(this.view.txtNewPassword.text.length<8 || this.view.txtNewPassword.text.length>64){
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_length_between_8_64");
    }
    else if(this.view.txtNewPassword.text.match(/[0]/)){
      this.view.txtNewPassword.skin="skinredbg";
      this.view.lblPasswordNotValid.isVisible=true;
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_cant_contain_0");
    }
    else
      scopeObj.resetPasswordCall();
    this.view.forceLayout();
  },

  /**
   * reset forget password call
   */
  resetPasswordForForgotPasswordCall : function()
  {
    var userDetailsForForgotPasswordJSON = {
      "password" : this.view.txtNewPassword1.text,
      "confirmPassword" : this.view.txtReenterPassword1.text,
      "id" : kony.mvc.MDAApplication.getSharedInstance().appContext.resetPasswordAttributesJSON.id,
      "qp" : kony.mvc.MDAApplication.getSharedInstance().appContext.resetPasswordAttributesJSON.qp
    };
    kony.adminConsole.utils.showProgressBar(this.view);
    this.getPresenter().toResetPasswordForForgotPassword(userDetailsForForgotPasswordJSON, this.toResetPasswordForForgotResponse);
  },

  /**
   * reset change password call
   */
  resetPasswordCall :function() {
    var userName = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    var currentPassword = this.view.txtCurrentPassword.text;
    var newPassword = this.view.txtNewPassword.text;

    if(this.view.txtNewPassword.text !== "" && this.view.txtCurrentPassword.text !== "" &&
       this.view.txtReenterPassword.text !== "") {
      kony.adminConsole.utils.showProgressBar(this.view);
      this.getPresenter().toResetPassword(userName, currentPassword, newPassword, this.toResetPasswordResponse);
    }
    else {
      this.view.txtNewPassword.skin="skinPasswordTextField";
      this.view.txtCurrentPassword.skin="skinPasswordTextField";
      this.view.txtReenterPassword.skin="skinPasswordTextField";
      this.view.lblPasswordDontMatch.isVisible=true;
      this.view.lblErrorIconReenterNewPassword.isVisible=true;
      this.view.lblPasswordDontMatch.text="Fields cannot be empty";
    }
  },

  /**
     * function to show Forget Password Confirmation Screen
     * Parameters: form controller,response
     */
  toResetPasswordForForgotResponse : function(response) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    kony.application.dismissLoadingScreen();

    var context;
    if (response === "Reset password for forgot password successful") {
      context = {
        "action": "resetPasswordConfirm"
      };
      this.getPresenter().showErrorLoginScreen(context);
    }
    else {
      if(response === "Session expired") {
        context = {
          "action": "SessionExpired"
        };
        this.getPresenter().showLoginScreen(context);
      }
      else if(response === "New password & confirm password don't match" || response === "New password fails criteria") {
        this.resetPasswordForForgotPasswordMismatchOrFailedCriteriaUI(response);
      }
      else {
        this.resetPasswordForForgotPasswordFailureUI(response);
      }
    }
  },

  /**
     * function to show Reset Confirmation Screen
     * Parameters: form controller,response
     */
  toResetPasswordResponse: function(response) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    kony.application.dismissLoadingScreen();

    var context;
    if (response === "Reset password successful") {
      context = {
        "action": "resetPasswordConfirm"
      };
      this.getPresenter().doLogout(context);
    }
    else if(response === "Session expired") {
      context = {
        "action": "SessionExpired"
      };
      this.getPresenter().showLoginScreen(context);
    }
    else {
      this.resetPasswordFailureUI(response);
    }
  },

  /**
   * Function to update UI for Reset Password for Forgot Password Mismatch or Failed Criteria page
    */
  resetPasswordForForgotPasswordMismatchOrFailedCriteriaUI : function(errmsg){
    this.view.flxErrorLoginInner.isVisible=true;
    this.view.txtUserName.text=this.username;
    this.view.txtUserName.setEnabled(false);
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxForgotPassword.isVisible=true;

    this.view.lblErrorMsgNewPasswordFP.isVisible=true;
    this.view.lblErrorIconNewPasswordFP.isVisible=true;
    if(errmsg === "New password & confirm password don't match") {
      this.view.lblErrorMsgNewPasswordFP.text="The passwords don't match.";
    }
    else if(errmsg === "New password fails criteria") {
      this.view.lblErrorMsgNewPasswordFP.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_not_valid");
    }

    this.view.txtNewPassword1.skin="skinredbg";
    this.view.txtReenterPassword1.skin="skinredbg";
    this.adjustIconWidth();
    this.view.forceLayout();
  },

  /**
   * Function to update UI for Reset Password for Forgot Password Failure page
    */
  resetPasswordForForgotPasswordFailureUI: function(errmsg){
    this.view.flxErrorLoginInner.isVisible=true;
    this.view.txtUserName.text=this.username;
    this.view.txtUserName.setEnabled(false);
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxForgotPassword.isVisible=true;

    this.view.flxFPToastContainer.isVisible=true;
    if(errmsg === "Invalid reset password request") {
      this.view.lblFPtoastMessage.text = "Invalid reset password request";
    }
    else {
      this.view.lblFPtoastMessage.text = "FAILURE";
    }

    this.view.txtNewPassword1.skin="skinredbg";
    this.view.txtReenterPassword1.skin="skinredbg";
    this.adjustIconWidth();
    this.view.forceLayout();
  },

  /**
   * Function  to update UI for reset Password Failure page
    */
  resetPasswordFailureUI: function(response) {
    this.view.flxChangePassword.isVisible=true;
    if(response === "Incorrect current password") {
      this.view.lblIncorrectCurrentPassword.setVisibility(true);
      this.view.lblErrorIconCurrentPassword.setVisibility(true);
      this.view.lblIncorrectCurrentPassword.text="The entered password is incorrect.";
      this.view.txtCurrentPassword.skin = "skinredbg";
      this.view.txtNewPassword.text="";
    }
    else if(response === "Current password & new password are same") {
      this.view.lblPasswordNotValid.setVisibility(true);
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_old_password_new_password_same");
      this.view.txtNewPassword.skin = "skinredbg";
      this.view.txtReenterPassword.skin = "skinredbg";
      this.view.txtCurrentPassword.text="";
    }
    else if(response === "New password fails criteria") {
      this.view.lblPasswordNotValid.setVisibility(true);
      this.view.lblErrorIconNewPassword.isVisible=true;
      this.view.lblPasswordNotValid.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.errorMsg_password_not_valid");
      this.view.txtNewPassword.skin = "skinredbg";
      this.view.txtCurrentPassword.text="";
    }
    else {
      this.view.flxToastContainer.isVisible=true;
    }
    this.view.flxMail.isVisible=false;
    this.view.txtReenterPassword.text="";
    this.adjustIconWidth();
    this.view.forceLayout();
  },

  showLoginPage: function() {
    var scopeObj = this;
    scopeObj.getPresenter().showLoginScreen({"action": "login"});
  },

  /**
   * Function  to update UI for showIncorrectEmailFlexUI
    */
  showIncorrectEmailFlexUI: function(context){
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.flxMail.isVisible=false;
    if(context.action === "emailNotPresentInDB") {
      this.view.flxDownTime.isVisible=false;
      this.view.flxForgotEmail.isVisible=true;
      this.view.registerErrorMsgTextbox.text=context.emailMessage;
      this.view.flxForgotEmailErrorMsg.isVisible=true;
      this.view.registertextbox.skin = "skinredbg";
    } else if(context.action === "multipleProfilesForEmail") {
      this.view.flxDownTime.isVisible=false;
      this.view.flxForgotEmail.isVisible=true;
      this.view.registerErrorMsgTextbox.text=context.emailMessage;
      this.view.flxForgotEmailErrorMsg.isVisible=true;
      this.view.registertextbox.skin = "skinredbg";
    } 
    else {
      this.view.flxForgotEmail.isVisible=false;
      this.view.flxDownTime.isVisible=true;
    }
    this.adjustIconWidth();
  },
  /**
   * Function  to update UI for showEmailSentFlexUI
    */
  showEmailSentFlexUI: function(context){
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxMail.isVisible=true;
    this.view.lblEmail.text=context.emailId;
    this.adjustIconWidth();

  },
  /**
   * Function  to update UI for changePasswordForgotUser
    */
  changePasswordForgotUserUI: function(context){
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.flxErrorLoginInner.isVisible=true;
    this.username = context.username;
    this.view.txtUserName.text=context.username;
    this.view.txtUserName.setEnabled(false);
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotPassword.isVisible=true;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.view.setpwdText.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.createNewPassword");
    this.view.btnResetPassword1.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.btnResetPassword");
    this.adjustIconWidth();
  },
  /**
   * Function  to update UI for reset Password Confirm
    */
  resetPasswordConfirmUI: function() {
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=true;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxDownTime.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.adjustIconWidth();
  },

  /**
   * Function  to update UI when password expired
    */
  passwordExpiredUI: function() {
    this.view.flxChangePassword.isVisible=true;
    this.view.flxMail.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxDownTime.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.view.lblTimeForNewPassword.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.createNewPassword");
    this.view.btnResetPassword.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.updatePasswordCAPS");
    this.adjustIconWidth();
  },
  /**
   * Function  to update UI when change Password is called
    */
  changePasswordUI: function(){
    this.view.flxChangePassword.isVisible=true;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.lblPasswordExpired.isVisible=false;
    this.view.lblTimeForNewPassword.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.changePassword");
    this.view.flxChangePassword.isVisible=true;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxToastContainer.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.view.btnResetPassword.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.changePasswordCAPS");
    this.adjustIconWidth();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /**
   * Function  to update UI for downtime page
    */
  downTimeUI: function(){
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxDownTime.isVisible=true;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.adjustIconWidth();
  },
  /**
   * Function  to update UI when excedded Attempts error page
    */
  exceddedAttemptsUI: function(){
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxExcededAttempts.isVisible=true;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxDownTime.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.adjustIconWidth();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /**
   * Function  to update UI for forgot Email page
    */
  forgotEmailUI: function(){
    this.view.flxChangePassword.isVisible=false;
    this.view.flxMail.isVisible=false;
    this.view.flxExcededAttempts.isVisible=false;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxForgotEmail.isVisible=true;
    this.view.flxDownTime.isVisible=false;
    this.view.flxResetPasswordConfirm.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.adjustIconWidth();
  },
  
  resetLinkExpiredUI: function(){
    this.view.flxErrorLoginInner.isVisible=true;
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=true;
    this.adjustIconWidth();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  
  resetLinkResendUI: function(){
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=true;
    this.view.lblNewLinkSendMsg.text=kony.i18n.getLocalizedString("i18n.frmErrorLogin.EmailLinkSendMsg");
    this.adjustIconWidth();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  
  resetLinkNotSendUI: function(msg){
    this.view.flxErrorLoginInner.isVisible=true;
    this.view.flxExpiredForgetPasswordLink.isVisible=false;
    this.view.flxNewForgetPasswordLinkSend.isVisible=true;
    this.view.lblNewLinkSendHeader="Email not sent";
    this.view.lblNewLinkSendMsg.text=msg;
    this.adjustIconWidth();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  
  resetLinkInvalidUI: function(){
    this.view.lblExpiredLinkHeader.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.invalid_Password_Link_Header");
    this.view.lblExpiredLinkMsg.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.invalid_Password_Link_Body");
	this.view.btnSendNewLink.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.backToLoginCAPS");
    this.view.btnSendNewLink.width = "170dp";
    this.view.flxForgotEmail.isVisible=false;
    this.view.flxForgotPassword.isVisible=false;
    this.view.flxExpiredForgetPasswordLink.isVisible=true;
    this.view.flxErrorLoginInner.isVisible=true;
    this.adjustIconWidth();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  
  adjustIconWidth : function(){
    var forgotMailVis = this.view.flxForgotEmail.isVisible;
    var newForgetPswdVis =this.view.flxNewForgetPasswordLinkSend.isVisible;
    var expiredPswdVis = this.view.flxExpiredForgetPasswordLink.isVisible;
    if( forgotMailVis || newForgetPswdVis || expiredPswdVis){
      this.view.flxIconContainer.width = "385dp";
    }else{
      this.view.flxIconContainer.width = "350dp";
    }
  },

  /**
    * Function to check if password contains 9 consecutive digits
  **/
  consecutiveDigits: function(input) {
    var count = 9;
    var i = 0;
    for(i in input) {
      if( input[i] <= 0  && input[i] > 9)
        count--;
      else
        count = 9;
    }
    if(count === 0)
      return true;
    return false;
  },

  /**
   * password check between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter,
   * one numeric digit, and one special character
   */
  isPasswordValid : function(enteredPassword) {
    var password= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,20}$/;
    var userName = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    if(enteredPassword.match(password) && enteredPassword !== userName){
      return true;
    }
    return false;
  },


  cancelResetPassword:function(){
    if(this.canNavigateBack()){
      this.navigateBack();
    }else{
      this.getPresenter().showLoginScreen({"action":"login"});
    }
  },



  /**
  * Function to mask and unmask password field
  */
  maskText : function(lblPasswordErrorMsg, txtPassword, flxEyeicon, flxEyecross) {
    if(this.view[lblPasswordErrorMsg].isVisible === false) {
      this.view[txtPassword].skin = "skinpwdfield";
    }
    else {
      this.view[txtPassword].skin = "skinpwdfieldRed";
    }
    if (this.view[txtPassword].text !== "") {
      if (this.view[txtPassword].secureTextEntry) {
        this.view[txtPassword].secureTextEntry = false;
        this.view[flxEyecross].isVisible = false;
        this.view[flxEyeicon].isVisible = true;
      } else {
        this.view[txtPassword].secureTextEntry = true;
        this.view[flxEyecross].isVisible = true;
        this.view[flxEyeicon].isVisible = false;
      }
    }
    this.view.forceLayout();
  },
});

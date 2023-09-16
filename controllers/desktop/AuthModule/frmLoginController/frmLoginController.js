define({
  /**
   * Function  to update UI
   * Parameters: context
     */
  willUpdateUI : function (context) {
    if(context !== undefined) {
      if (context.action === "SessionExpired") {
        this.sessionExpiredUI();
      }
      else if (context.action === kony.i18n.getLocalizedString("i18n.frmLandingController.logout")) {
        this.logoutUI();
      }
      else if (context.action === kony.i18n.getLocalizedString("i18n.frmLoginController.login")) {
        this.loginUI();
      }
      else if (context.action === "incorrectPassword") {
        this.incorrectPasswordUI();
      }
      else if (context.action === "incorrectPasswordMultipleTimes") {
        this.incorrectPasswordMultipleTimesUI();
      }
      else if (context.action === "userIdNotEntered") {
        this.userIdNotEnteredUI();
      }
      else if (context.action === "passwordNotEntered") {
        this.passwordNotEnteredUI();
      } 
      else if (context.action === "passwordNotSet") {
        this.passwordNotSetUI();
      } 
      else if (context.action === "userIdAndPasswordNotEntered") {
        this.userIdAndPasswordNotEnteredUI();
      }
    }
    this.view.forceLayout();
  },
  /**
    * Function preshow of form
  **/
  preshowLogin : function() {    
    this.view.flxMainLogin.height = kony.os.deviceInfo().screenHeight + "dp";
    this.presenter.getLoginTypeConfiguration(this.onFetchLoginTypeSuccess, this.onFetchLoginTypeError);
	//this.onFetchLoginTypeSuccess({"isKeyCloakEnabled":true});
  },
  onFetchLoginTypeSuccess : function(response){
    var keyCloakEnabled=response.isKeyCloakEnabled;
    this.onFetchLoginTypeResponse(keyCloakEnabled);
  },
  onFetchLoginTypeError : function(errorMessage){
    this.view.toastMessage.showErrorToastMessage (errorMessage,this);
    console.log("----ERROR: fetching login type " +errorMessage);
  },
  onFetchLoginTypeResponse : function(keyCloakEnabled){   
    this.view.flxRedirect.setVisibility(keyCloakEnabled);
    this.view.flxLogin.setVisibility(keyCloakEnabled===true?false:true);    
    this.view.flxMainLogin.setVisibility(true);
    if(keyCloakEnabled===true){
      this.loginViaKeyCloak();
    }
    else{
      this.attachModule();
      this.rememberMePopulated();
      this.presenter.checkSessionTimedout();
      this.preShowActions();
      this.view.flxMainLogin.height = kony.os.deviceInfo().screenHeight + "dp";
      this.view.flxEyeicon.isVisible=false;
      this.view.flxEyecross.isVisible=true;
      this.view.txtPassword.secureTextEntry = true;
    }
    this.view.forceLayout();
  },
  /** 
    * Functionto attach initial module
  **/
  attachModule : function() {
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.AuthModule"));
    this.attachToModule(authModule);
  },
  /**
    * Function for remember me of checkbox
  **/
  rememberMePopulated : function() {
    this.view.txtPassword.text=""; 		
    if(kony.ds.read('AdminConsoleNames')) {
      kony.mvc.MDAApplication.getSharedInstance().appContext.username=kony.ds.read('AdminConsoleNames');
      this.view.txtUserName.text = kony.ds.read('AdminConsoleNames');
      this.view.imgLoginRememberMe.src = "checkboxselected.png";
    } else {
      this.view.txtUserName.text = "";
    }
  },
  /**
    * Function preshow of actions
  **/
  preShowActions : function() {
    var scopeObj=this;
    this.view.btnLogin.onClick=function(){
      scopeObj.login();
    };
    this.view.txtPassword.onDone=function(){
      scopeObj.login();
    };
    this.view.txtUserName.onBeginEditing=function(){
      scopeObj.view.flxErrorAlert.isVisible=false;
      scopeObj.view.flxTimeExpired.isVisible=false;
      scopeObj.view.flxUsernameErrorMsg.isVisible=false;
      scopeObj.view.flxPasswordErrorMsg.isVisible=false;
      scopeObj.view.txtUserName.skin='skinPasswordLogin';
      scopeObj.view.txtPassword.skin='skinPasswordLogin';
    };
    this.view.txtPassword.onBeginEditing=function(){
      scopeObj.view.flxErrorAlert.isVisible=false;
      scopeObj.view.flxTimeExpired.isVisible=false;
      scopeObj.view.flxUsernameErrorMsg.isVisible=false;
      scopeObj.view.flxPasswordErrorMsg.isVisible=false;
      scopeObj.view.txtUserName.skin='skinPasswordLogin';
      scopeObj.view.txtPassword.skin='skinPasswordLogin';
    };
    this.view.flxForgotCredentials.onClick=function(){
      scopeObj.presenter.showErrorLoginScreen({
        action: "forgotEmail"
      });
    };
    this.view.flxEyecross.onClick=function(){
      scopeObj.maskText();
    };
    this.view.flxEyeicon.onClick=function(){
      scopeObj.maskText();
    };
    this.view.lblCross.onTouchStart=function(){
      scopeObj.view.flxTimeExpired.isVisible=false;
    };
    this.view.flxRememberMe.onClick = function() {
      if(scopeObj.view.imgLoginRememberMe.src === "checkboxnormal.png")
        scopeObj.view.imgLoginRememberMe.src = "checkboxselected.png";
      else
        scopeObj.view.imgLoginRememberMe.src = "checkboxnormal.png";
    };
  },
  /**
   * Function  to update UI for logout
     */
  logoutUI : function() {
    this.view.flxTimeExpired.isVisible=false;
    this.view.flxErrorAlert.isVisible=false;
    this.view.txtPassword.skin='skinPasswordLogin';  //NORMAL
    this.view.flxPasswordErrorMsg.isVisible=false;
    this.view.txtError1.text='';
  },
  /**
   * Function  to update UI for Session Expired
     */
  sessionExpiredUI : function() {
    // When the session is expired
    this.view.flxTimeExpired.isVisible=true;
    this.view.lblTimeExpired.text=kony.i18n.getLocalizedString("i18n.frmLoginController.session_expired");
    this.view.flxErrorAlert.isVisible=false;
    this.view.txtPassword.skin='skinPasswordLogin';  //NORMAL
    this.view.flxPasswordErrorMsg.isVisible=false;
    this.view.txtError1.text='';
    this.rememberMePopulated();
  },
  /**
   * Function  to update UI for login
     */
  loginUI : function() {
    this.view.flxTimeExpired.isVisible=false;
    this.view.flxErrorAlert.isVisible=false;
    this.view.txtUserName.skin='skinPasswordLogin';
    this.view.flxUsernameErrorMsg.isVisible=false;
    this.view.txtPassword.skin='skinPasswordLogin';  //NORMAL
    this.view.flxPasswordErrorMsg.isVisible=false;
    this.view.txtError1.text=''; 
  },
  /**
   * Function  to update UI for incorrect Password
     */
  incorrectPasswordUI : function() {
    this.view.txtUserName.skin="skinredbg";
    this.view.txtPassword.skin='skinredbg';
    this.view.flxTimeExpired.isVisible=false;
    this.view.flxPasswordErrorMsg.isVisible=true;
    this.view.lblPasswordErrorMsg.text='User ID or Password entered is wrong';
  },
  /**
   * Function  to update UI for incorrect Password Multiple Times
     */
  incorrectPasswordMultipleTimesUI : function() {
    this.view.flxTimeExpired.isVisible=false;
    this.view.flxErrorAlert.isVisible=true;
    this.view.txtPassword.skin='skinredbg';
    this.view.txtError.isVisible=true;
    this.view.txtError1.isVisible=false;
    this.view.txtError1.skin='skinLabelError';
    this.view.flxPasswordErrorMsg.isVisible=true;
    this.view.lblPasswordErrorMsg.text='The Password you entered is wrong';

  },
  /**
   * Function  to update UI for userId Not Entered
     */
  userIdNotEnteredUI : function() {
    this.view.txtUserName.text="";
    this.view.flxUsernameErrorMsg.isVisible=true;
    this.view.flxPasswordErrorMsg.isVisible=false;
    this.view.txtUserName.skin="skinredbg";
    this.view.txtPassword.skin='skinPasswordLogin';  
    this.view.txtError.isVisible=false;
    this.view.lblUsernameErrorMsg.text='The User ID field cannot be empty';
  },
  /**
   * Function  to update UI for password Not Entered
     */
  passwordNotEnteredUI : function() {
    this.view.txtError.isVisible=false;
    this.view.txtPassword.skin='skinredbg';
    this.view.flxPasswordErrorMsg.isVisible=true;
    this.view.lblPasswordErrorMsg.text='The Password field cannot be empty';
  },
  /**
   * Function  to update UI for Password not set for account
     */
  passwordNotSetUI : function() {
    this.view.txtUserName.skin="skinredbg";
    this.view.txtPassword.skin='skinredbg';
    this.view.flxTimeExpired.isVisible=false;
    this.view.flxPasswordErrorMsg.isVisible=true;
    this.view.lblPasswordErrorMsg.text=kony.i18n.getLocalizedString("i18n.frmAuthModule.password_not_set");
  },
  /**
   * Function  to update UI for userId And Password Not Entered
     */
  userIdAndPasswordNotEnteredUI : function() {
    this.view.txtUserName.text="";
    this.view.flxPasswordErrorMsg.isVisible=true;
    this.view.txtPassword.skin='skinredbg';
    this.view.flxUsernameErrorMsg.isVisible=true;
    this.view.txtUserName.skin="skinredbg";
    this.view.txtError.isVisible=false;
    this.view.lblUsernameErrorMsg.text='The User ID field cannot be empty';
    this.view.lblPasswordErrorMsg.text='The Password field cannot be empty';
  },
  /**
  * Function to mask and unmask password field
  */
  maskText : function() {
    if(this.view.flxPasswordErrorMsg.isVisible === false) {
      this.view.txtPassword.skin = "skinpwdfield";
    }
    else {
      this.view.txtPassword.skin = "skinpwdfieldRed";
    }
    if (this.view.txtPassword.text !== "") {
      if (this.view.txtPassword.secureTextEntry) {
        this.view.txtPassword.secureTextEntry = false;
        this.view.flxEyecross.isVisible = false;
        this.view.flxEyeicon.isVisible = true;
      } else {
        this.view.txtPassword.secureTextEntry = true;
        this.view.flxEyecross.isVisible = true;
        this.view.flxEyeicon.isVisible = false;
      }
    }
    this.view.forceLayout();
  },
  /**
  * Function to make login call
  */
  login : function() {
    var authModule=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.AuthModule"));
    var usernamePasswordObj={
      "username":this.view.txtUserName.text,
      "password":this.view.txtPassword.text,
      "rememberMe":this.view.imgLoginRememberMe.src === "checkboxnormal.png" ? null : "true"
    };
    if(usernamePasswordObj.username==='' || usernamePasswordObj.password===''){
      this.presenter.userIdPasswordNotEntered(usernamePasswordObj);
    }
    else{
      kony.print("usernamePasswordObj: "+JSON.stringify(usernamePasswordObj));
      kony.adminConsole.utils.showProgressBar(this.view);
      authModule.presentationController.onLogin(usernamePasswordObj,this.loginSuccessCallBack,this.loginFailureCallBack);
    }
  },
  /**
     * Function called when the user enters the valid credentials.
     * Login Successcallback
     **/
  loginSuccessCallBack : function(response, usernamePasswordObj) {
    kony.print(kony.i18n.getLocalizedString("i18n.frmLoginController.login_successful"));
    this.presenter.saveUserName(usernamePasswordObj);
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.presenter.showDashboard();
    this.presenter.setIdleTimeout();
  },
  /**
     * Function to display the appropriate error message depending on ServerDownTime or Invalid App Credentials.
     * Parameters: Response receiving from the command.
     * login Error Call Back
      **/
  loginFailureCallBack : function(response) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    kony.print(kony.i18n.getLocalizedString("i18n.frmLoginController.Failed_Authentication"));
    var context;
    kony.print(JSON.stringify(response));
    var errCode;
    var responseJSON;
    if(response.details===undefined || response.details.errmsg===undefined||response.details.errmsg===null||response.opstatus===kony.sdk.errorcodes.connectivity_error_code )
    {
      errCode=-4;
      context = {
        "action": kony.i18n.getLocalizedString("i18n.frmLandingController.downTime")
      };
    }
    else
    {
      responseJSON=JSON.parse(response.details.errmsg);
      errCode=responseJSON.code; //getting the errorcode
    }

    kony.print("errCode: "+errCode);
    if(errCode===-1||errCode===-3){
      context = {
        "action": "incorrectPassword"
      };
      kony.print("incorrectPassword");

      if(typeof responseJSON.incorrectLoginAttempsCount !== "undefined"){ // Normal Admin User
        kony.mvc.MDAApplication.getSharedInstance().appContext.noOfAttempts=responseJSON.incorrectLoginAttempsCount;
        if(responseJSON.incorrectLoginAttempsCount===4){
          context = {
            "action": "incorrectPasswordMultipleTimes"
          };
        }
      }
      this.presenter.showLoginScreen(context);
    }
    else if(errCode===-2){
      kony.print("exceddedAttempts");
      context = {
        "action": "exceddedAttempts"
      };
      this.presenter.showErrorLoginScreen(context);
    }
    else if(errCode===-5){
      kony.print("passwordExpired");
      context = {
        "action": "passwordExpired",
      };
      this.presenter.showErrorLoginScreen(context);
    }
    else if(errCode===-3){
      kony.print("forgotEmail");
      context = {
        "action": "forgotEmail"
      };
      this.presenter.showErrorLoginScreen(context);
    }
    else if(errCode===-4){
      kony.print(kony.i18n.getLocalizedString("i18n.frmLandingController.downTime"));
      context = {
        "action": kony.i18n.getLocalizedString("i18n.frmLandingController.downTime")
      };
      this.presenter.showErrorLoginScreen(context);
    }
    else if(errCode===-9){
      kony.print(kony.i18n.getLocalizedString("i18n.frmAuthModule.password_not_set"));
      context = {
        "action": "passwordNotSet"
      };
      this.presenter.showLoginScreen(context);
    }
  },
  loginViaKeyCloak : function(){
    var options = {};
    options.include_profile = true;
    var loginOptions = {};
    loginOptions.isSSOEnabled = true;
    loginOptions.continueOnRefreshError = false;
    loginOptions.persistLoginResponse = false;
    options.loginOptions = loginOptions;
    this.presenter.doLoginViaKeyCloak(options);
  }

});
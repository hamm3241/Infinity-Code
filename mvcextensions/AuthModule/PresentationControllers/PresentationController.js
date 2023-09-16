define(['ErrorInterceptor','LegalEntityPermission_Form_Extn','Promisify'], function(ErrorInterceptor, LegalEntityPermissionExtn,Promisify) {
  function Auth_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.isKeyCloakEnabled=null;
  }
  inheritsFrom(Auth_PresentationController, kony.mvc.Presentation.BasePresenter);

  Auth_PresentationController.prototype.initializePresentationController = function() {};
  /**
   * Function called to show Login screen.
   * @name showLoginScreen
   * @member AuthModule.presentationController
   * @param {action : string} context
   */
  Auth_PresentationController.prototype.showLoginScreen = function(context) {
    this.presentUserInterface("frmLogin",context);
  };
  /**
   * Is called after successfull login to show the Dashboard screen
   * @name showDashboard
   * @member AuthModule.presentationController
   * @param undefined context
   */
  Auth_PresentationController.prototype.showDashboard = function(context) {
    this.navigateTo('DashboardModule', 'fetchDashBoardData');
  };

  /**
   * Function called to show Change Password screen.
   * @name showChangePasswordScreen
   * @member AuthModule.presentationController
   */
  Auth_PresentationController.prototype.showChangePasswordScreen = function() {
    this.showErrorLoginScreen({"action": "changePassword"});
  };

  /**
   * Function called to show ErrorLogin screen.
   * @name showErrorLoginScreen
   * @member AuthModule.presentationController
   * @param {action : string} context for UI changes
   */
  Auth_PresentationController.prototype.showErrorLoginScreen = function(context) {
    this.presentUserInterface("frmErrorLogin",context);
  };

  /**
   * Function called when the user clicks LogIn button .
   * Parameters: usernamePasswordObj - username ,password and rememberme Status
   * @name onLogin
   * @member AuthModule.presentationController
   * @param {username : string, password : string, rememberMe : null} usernamePasswordObj
   * @param ()=>any loginSuccessCallBack
   * @param (...callbackArgs)=>any loginFailureCallBack
   */
  Auth_PresentationController.prototype.onLogin = function(usernamePasswordObj,loginSuccessCallBack,loginFailureCallBack) {
    var self=this;
    this.businessController.doLogin(usernamePasswordObj, onSuccess, onError);
    function onSuccess(response) {
      kony.mvc.MDAApplication.getSharedInstance().appContext.userName=usernamePasswordObj.username;
      self.businessController.getServerTimeZoneOffset(); 
      kony.application.dismissLoadingScreen();
      loginSuccessCallBack(response, usernamePasswordObj);
    }
    function onError(response) {
      kony.mvc.MDAApplication.getSharedInstance().appContext.userName=usernamePasswordObj.username;
      kony.application.dismissLoadingScreen();
      loginFailureCallBack(response);
    }
  };

  Auth_PresentationController.prototype.setPermissionLegalEntity = function (isKeycloakLogin) {
    var self = this;
    var permissionToLeMap = {};
     var promiseGetLEPermissions = Promisify(this.businessController, 'getPermissionsForLegalEntities');
    var promiseFetchAllLE = Promisify(this.businessController, 'getLegalEntities');
    Promise.all([
      promiseGetLEPermissions({}),
      promiseFetchAllLE({}),
    ]).then(function (response){
      var allLegalEntities = response[0] && response[0].companyLegalUnits ? response[0].companyLegalUnits :[];
      LegalEntityPermissionExtn.setAllLEList(allLegalEntities);
      var permissionsObj = response[1] && response[1].legalEntityToRoleMapping ? JSON.parse(response[1].legalEntityToRoleMapping) : {};
      var legalEntityPermObj = {};
      var legalEntityKeys = Object.keys(permissionsObj);
      for(var i=0; i<legalEntityKeys.length; i++){
        legalEntityPermObj[legalEntityKeys[i]] = permissionsObj[legalEntityKeys[i]].split(",");
      }
      if (legalEntityKeys[0]==="ALL"){
        var legalEntities ={};
        var allPermission = legalEntityPermObj.ALL.toString();
        
        for(var j=0;j<allLegalEntities.length;j++){
          legalEntities[allLegalEntities[j].id] = allPermission;
        }
        LegalEntityPermissionExtn.setAllLEPermissions(legalEntities);
      }
      else{
        LegalEntityPermissionExtn.setAllLEPermissions(legalEntityPermObj);
      }
      if(isKeycloakLogin){
        self.navigateTo('DashboardModule', 'fetchDashBoardData');
      }
    }).catch(function (res) {
      LegalEntityPermissionExtn.setAllLEList([]);
      LegalEntityPermissionExtn.setAllLEPermissions({});
      if(isKeycloakLogin){
        self.navigateTo('DashboardModule', 'fetchDashBoardData');
      }
    });
  };  
  /**
   * Function to set Idle Timeout and it internally calls onSessionExpire function
   * @name setIdleTimeout
   * @member AuthModule.presentationController
   */
  Auth_PresentationController.prototype.setIdleTimeout = function(timeout) {
    var self = this;

    function idleTimeoutCompletionCallback(response) {
      self.onSessionExpire();
    }
    this.businessController.registerIdleTimeout(timeout, idleTimeoutCompletionCallback);
  };

  /**
   * @name checkSessionTimedout
   * @member AuthModule.presentationController
   */
  Auth_PresentationController.prototype.checkSessionTimedout = function(){
    var sessionExpiredTime = kony.ds.read('SessionExpired');
    if(sessionExpiredTime && (new Date() - new Date(sessionExpiredTime)) < 10000){
      var context = {
        "action": "SessionExpired"
      };
      this.showLoginScreen(context);
    }
  };

  /**
     * Function to logout once the session is expired
     */
  Auth_PresentationController.prototype.onSessionExpire = function() {
    kony.ds.save(new Date(),'SessionExpired',{dsmode:"cache"});
    this.doLogout();
  };

  /**
   * Function specifies the action like Logout/SessionExpired
   * @name doLogout
   * @member AuthModule.presentationController
   * @param undefined context
   * @param undefined logoutSuccessCallback
   * @param undefined logoutErrorCallback
   */
  Auth_PresentationController.prototype.doLogout = function() {
    var self = this;
    if(self.isKeyCloakEnabled===true)
	    self.doKeyCloakLogout();
    else
        self.doRegularLogout();
  };
  Auth_PresentationController.prototype.doRegularLogout = function(context,logoutSuccessCallback,logoutErrorCallback) {
    var self = this;
    logoutSuccessCallback = logoutSuccessCallback || self.logoutSuccessCallback.bind(self);
    logoutErrorCallback = logoutErrorCallback || self.logoutErrorCallback.bind(self);
    function onLogoutSuccess() {
      if(context && context.action === "resetPasswordConfirm"){
		self.showErrorLoginScreen(context);
      }
      else{
        self.businessController.resetLocalStorage({}, function successfullyClearedData() {}, function failedToReload() {});
        logoutSuccessCallback(context);
      }
    }
    self.businessController.doLogout({}, onLogoutSuccess, logoutErrorCallback);
  };
  /**
     * Function to De Register the Idle Time Out
     * Parameters: context
     * @name setIdleTimeout
     * @member AuthModule.presentationController
     * 
     */
  Auth_PresentationController.prototype.deRegisterIdleTimeout = function(context) {
    var self = this;

    function deregisterCompletionCallback() {
      self.deregisterSuccessCallback(context);
    }
    self.businessController.deregisterIdleTimeout({}, deregisterCompletionCallback);
  };

  /**
     * Function to De Register the Idle Time Out Completion Callback
     * Parameters: context
     */
  Auth_PresentationController.prototype.deregisterSuccessCallback = function(context) {
    // alert("Logout Successful");
    //Removed the login screen as it is causing a jerk 
    //The login screen will be shown after browser refresh 
    //this.showLoginScreen(context);
  };

  /**
   * Function to reset password
   * @name toResetPassword
   * @member AuthModule.presentationController
   * @param string userName
   * @param string currentPassword
   * @param string newPassword
   * @param (...callbackArgs)=>any toResetPasswordResponse
   */
  Auth_PresentationController.prototype.toResetPassword = function(userName,currentPassword,newPassword,toResetPasswordResponse) {
    var self = this;

    var userDetails = {"userid" : userName, "previousPassword" : currentPassword, "newPassword" : newPassword};
    this.businessController.resetPassword(userDetails, resetPasswordSuccess, resetPasswordError);

    function resetPasswordSuccess(response) {
      toResetPasswordResponse(response);
    }

    function resetPasswordError(response) {
      toResetPasswordResponse(response);
    }
  };

  /**
   * function to show Login page with message: "User ID & password not entered"
   * @name userIdPasswordNotEntered
   * @member AuthModule.presentationController
   * @param {username : string, password : string, rememberMe : null} usernamePasswordObj
   */
  Auth_PresentationController.prototype.userIdPasswordNotEntered = function(usernamePasswordObj) {
    var context;
    if(usernamePasswordObj.username==="" && usernamePasswordObj.password===""){
      context = {
        "action": "userIdAndPasswordNotEntered"
      };

    }
    else if(usernamePasswordObj.username===""){
      context = {
        "action": "userIdNotEntered"
      };
    }
    else if(usernamePasswordObj.password===""){
      context = {
        "action": "passwordNotEntered"
      };
    }
    this.showLoginScreen(context);
  }; 

  /**
   * Function to save username in local storage 
   * @name saveUserName
   * @member AuthModule.presentationController
   * @param {username : string, password : string, rememberMe : null} usernamePasswordObj
   */
  Auth_PresentationController.prototype.saveUserName = function(usernamePasswordObj) {
    this.businessController.saveUserName({
      "username":usernamePasswordObj.username,
      "rememberme": usernamePasswordObj.rememberMe,
    });  
  };

  /** 
  * Function to send reset password link to the email id of user 
  * @name sendResetPasswordEmail
  * @member AuthModule.presentationController
  * @param FormController emailView
  * @param {emailType : string, emailId : string} emailJSON
  */
  Auth_PresentationController.prototype.sendResetPasswordEmail = function(emailView, emailJSON) {
    var self=this;

    // alert("emailJSON: "+JSON.stringify(emailJSON));
    this.businessController.sendEmail(emailJSON, onSuccess, onError);

    function onSuccess(response) {
      if(response.resetPassword) {
        self.showErrorLoginScreen({
          "action": "resetPassword"
        });
      }
      else if(emailJSON.isLinkExpiredEmailResent){
        self.showErrorLoginScreen({
          "action": "resetLinkResend"
        });
      }
      else{ 
        self.showErrorLoginScreen({
          "action": "showEmailSentFlex",
          "emailId": response.emailId
        });
      }
    }

    function onError(response) {
      if(emailJSON.isLinkExpiredEmailResent){
        self.showErrorLoginScreen({
          "action": "resetLinkNotSend",
          "emailMessage": response
        });
      } else if(response.dbpErrCode === 22121 ){
        self.showErrorLoginScreen({
          "action": "resetPassword",
          //"emailMessage": response.dbpErrMsg
        });
      }else if(response.dbpErrCode === 22120 ){
        self.showErrorLoginScreen({
          "action": "multipleProfilesForEmail",
          "emailMessage": response.dbpErrMsg
        });
      }
      else{ 
        self.showErrorLoginScreen({
          "action": "showIncorrectEmailFlex",
          "emailMessage": response.errMsg
        });
      }
    }
  };

  /**
  * Function to open Reset Password form
  */
  Auth_PresentationController.prototype.openResetPasswordForm = function(qpJSON) {
    var self=this;

    var decodedVal = atob(qpJSON.qp);
    var qp = decodedVal.substring(0, decodedVal.indexOf("_-_"));
    var id = decodedVal.substring(decodedVal.indexOf("_-_") + 3, decodedVal.lastIndexOf("_-_"));
    var username = decodedVal.substring(decodedVal.lastIndexOf("_-_") + 3);
    kony.mvc.MDAApplication.getSharedInstance().appContext.resetPasswordAttributesJSON = {"qp" : qp, "id" : id};
	self.verifyResetLink({"qp" : qp, "id" : id, "username" : username});
  }; 

  Auth_PresentationController.prototype.toResetPasswordForForgotPassword = function(userDetailsForForgotPasswordJSON, toResetPasswordForForgotResponse){
    var self = this;

    this.businessController.resetPasswordForForgotPassword(userDetailsForForgotPasswordJSON, 
                                                           resetPasswordForForgotPasswordSuccess, resetPasswordForForgotPasswordError);

    function resetPasswordForForgotPasswordSuccess(response) {
      toResetPasswordForForgotResponse(response);
    }

    function resetPasswordForForgotPasswordError(response) {
      if(response == "Link expired") {
        var context = {
          "action" : "resetLinkExpired"
        };
        self.showErrorLoginScreen(context);
      }
      else {
        toResetPasswordForForgotResponse(response);
      }
    }
  };
  
  Auth_PresentationController.prototype.verifyResetLink = function(userDetails){
    var self = this;
    function successCallBack(response) {
      var context = {
        "action" : "changePasswordForgotUser",
        "username" : userDetails.username
      };
      self.showErrorLoginScreen(context);
    }
    function failureCallback(response) {
      if(response == "Link expired") {
        var context = {
          "action" : "resetLinkExpired"
        };
        self.showErrorLoginScreen(context);
      }
      else {
        if(response == "Incorrect Password Reset Link") {
          var context = {
            "action" : "resetLinkInvalid"
          };
          self.showErrorLoginScreen(context);
        }
      }
    }
    this.businessController.verifyResetLink(userDetails, successCallBack, failureCallback);
  };


  /**
     * Function on logout Success calls deRegisterIdleTimeout 
     * @name logoutSuccessCallback
     * @member AuthModule.presentationController
     * @param undefined context
     */
  Auth_PresentationController.prototype.logoutSuccessCallback = function(context) {
    this.deRegisterIdleTimeout(context);
  };

  /**
     * Function on logout failure navigates to serverdown screen 
     * Parameters: context
     * Logout Error Callback 
     */
  Auth_PresentationController.prototype.logoutErrorCallback = function(context) {
    //Logout Failed navigate to downtime page.  
    if(context && context.opstatus===107)
      {
         this.showLoginScreen(context);
      }
    else
      {
      context = {
       "action": "downTime"
       };
        this.showErrorLoginScreen(context);
      }
  };
  
  Auth_PresentationController.prototype.doLoginViaKeyCloak = function(options) {
    var self=this;

    function onSuccess(response) {
      self.businessController.getServerTimeZoneOffset();
      self.setIdleTimeout(kony.mvc.MDAApplication.getSharedInstance().appContext.IDLE_TIMEOUT);
      self.navigateTo('DashboardModule', 'fetchDashBoardData');
    }
    function onError(response) {
      kony.application.dismissLoadingScreen();
      var context = {
        "action": "downTime"
      };
      self.showErrorLoginScreen(context);
    }
    
    this.businessController.doLoginViaKeyCloak(options, onSuccess, onError);
  };

  Auth_PresentationController.prototype.getLoginTypeConfiguration = function(onSuccess,onError) {
    var self=this;
    function onFetchSuccess(response){
        self.isKeyCloakEnabled=response.isKeyCloakEnabled;
        onSuccess(response);
    }
    function onFetchError(error){
        onError(ErrorInterceptor.errorMessage(error));
    }
    if(self.isKeyCloakEnabled===null)
    	this.businessController.getLoginTypeConfiguration({}, onFetchSuccess, onFetchError);
    else
      onSuccess({"isKeyCloakEnabled":self.isKeyCloakEnabled});
  };
  Auth_PresentationController.prototype.doKeyCloakLogout = function(logoutSuccessCallback,logoutErrorCallback) {
    var self = this;
    logoutSuccessCallback = logoutSuccessCallback || self.logoutSuccessCallback.bind(self);
    logoutErrorCallback = logoutErrorCallback || self.logoutErrorCallback.bind(self);
    var loadingIndicatorComponent = new com.adminConsole.common.loadingIndicator({
            "id": "loadingKeycloakLogout1",
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_DEFAULT
          }, {}, {});
    loadingIndicatorComponent.setVisibility(true);
    kony.application.getCurrentForm().add(loadingIndicatorComponent)
    function onLogoutSuccess() {
      loadingIndicatorComponent.setVisibility(false);
      self.businessController.resetLocalStorage({}, function successfullyClearedData() {}, function failedToReload() {});
      //self.showLoginScreen();
    }
    self.businessController.doKeyCloakLogout({}, onLogoutSuccess,logoutErrorCallback);
  };

  return Auth_PresentationController;
});


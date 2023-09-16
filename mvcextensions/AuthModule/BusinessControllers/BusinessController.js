define(['ModelManager', 'permissionsConfig', 'WidgetConfig_FormExtn', 'LegalEntityPermission_Form_Extn', 'WidgetConfigImporter','Promisify'], function (ModelManager, permissionsConfig, configurationJSON, LegalEntityPermissionExtn,configurationImporter,Promisify) {

  function AuthModule_BusinessController() {
    kony.mvc.Business.Delegator.call(this);
    this.identityProvider = "KonyBankingAdminConsoleIdentityService";
  }

  inheritsFrom(AuthModule_BusinessController, kony.mvc.Business.Delegator);

  AuthModule_BusinessController.prototype.initializeBusinessController = function () {};


  /**
     * @name sendEmail
     * @member AuthModule.businessController
     * @param {emailType : string, emailId : string} context
     * @param (response:{emailId : string})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  AuthModule_BusinessController.prototype.sendEmail = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("EmailManager")
      .businessController.sendEmail(context, onSuccess, onError);
  };

  /**
     * @name doLogin
     * @member AuthModule.businessController
     * @param {username : string, password : string, rememberMe : null} context
     * @param (response:{provider : string, params : {security_attributes : {session_token : object, _provider_token : object, content_type : object, Permissions : object, ServicesAuthData : object, raw_response : object, session_ttl : object}, phone : string, opstatus : number, user_attributes : {Email : object, CreatedBy : object, roleId : object, FirstName : object, MiddleName : object, SyncTimeStamp : object, LastModifiedTimeStamp : object, content_type : object, user_id : object, UserRole : object, LastName : object, SoftDeleteFlag : object, raw_response : object, username : object}, raw_response : string, display_name : null, httpStatusCode : number}, value : string})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  AuthModule_BusinessController.prototype.doLogin = function (context, onSuccess, onError) {
    var self = this;
    var authParams = {
      "userid": context.username,
      "inputPassword": context.password,
      "loginOptions": {
        "isSSOEnabled": true,
        "isOfflineEnabled": false
      }
    };

    function successCallback(resSuccess) {
      //kony.mvc.MDAApplication.getSharedInstance().appContext.userID = KNYMobileFabric.getUserId();
      kony.print("successCallback" + JSON.stringify(resSuccess));
      var options = {
        "IdentityServiceName": "KonyBankingAdminConsoleIdentityService",
        "AuthParams": {
          "loginOptions": {
            "isOfflineEnabled": false
          }
        }
      };

      function TokenSuccessCallback(session_token) {
        kony.print("TokenSuccessCallback" + JSON.stringify(session_token));
        kony.mvc.MDAApplication.getSharedInstance().appContext.session_token = session_token.value;
        kony.setUserID(context.username);
        self.getUserPermissions(session_token,onSuccess,onError);
        self.getAttribute({
          "attribute" : "currencyCode, isSingleEntity"
        });
      }

      function tokenErrorCallback(resTokenError) {
        kony.print("tokenErrorCallback" + JSON.stringify(resTokenError));
        onError(resTokenError);
      }
      try {
        authClient.getBackendToken(false, options, TokenSuccessCallback, tokenErrorCallback);
      } catch (err) {
        onError(err);
      }
    }

    function errorCallback(error) {
      onError(error);
    }
    try {
      authClient = KNYMobileFabric.getIdentityService("KonyBankingAdminConsoleIdentityService");
      authClient.login(authParams, successCallback, errorCallback);
    } catch (err) {
      kony.print(err);
      onError(err);
    }
  };
       
       
       
       
   AuthModule_BusinessController.prototype.getUserPermissions = function (session_token, onSuccess, onError) {
    var self = this;
    var permissionToLeMap = {};
     var promiseGetLEPermissions = Promisify(this, 'getPermissionsForLegalEntities');
    var promiseFetchAllLE = Promisify(this, 'getLegalEntities');
    Promise.all([
      promiseGetLEPermissions({}),
      promiseFetchAllLE({}),
    ]).then(function (response){
      var allLegalEntities = response[1] && response[1].companyLegalUnits ? response[1].companyLegalUnits :[];
      LegalEntityPermissionExtn.setAllLEList(allLegalEntities);
      var permissionsObj = response[0] && response[0].legalEntityToRoleMapping ? JSON.parse(response[0].legalEntityToRoleMapping) : {};
      var legalEntityPermObj = {};
      var legalEntityKeys = Object.keys(permissionsObj);
      for(var i=0; i<legalEntityKeys.length; i++){
        legalEntityPermObj[legalEntityKeys[i]] = permissionsObj[legalEntityKeys[i]].split(",");
      }
      var permissionsString = response[0].permissions;
      
     kony.mvc.MDAApplication.getSharedInstance().appContext.accessDetails = JSON.parse(permissionsString);
      permissionsConfig.registerConfig(configurationJSON);
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
      
      self.getUserAttributes(session_token, onSuccess, onError);
      
    }).catch(function (res) {
      LegalEntityPermissionExtn.setAllLEList([]);
      LegalEntityPermissionExtn.setAllLEPermissions({});
      self.getUserAttributes(session_token, onSuccess, onError);
    });
  };  

  /**
     * @name getUserAttributes
     * @member AuthModule.businessController
     * @param {provider : string, params : {security_attributes : {session_token : object, _provider_token : object, content_type : object, Permissions : object, ServicesAuthData : object, raw_response : object, session_ttl : object}, phone : string, opstatus : number, user_attributes : {Email : object, CreatedBy : object, roleId : object, FirstName : object, MiddleName : object, SyncTimeStamp : object, LastModifiedTimeStamp : object, content_type : object, user_id : object, UserRole : object, LastName : object, SoftDeleteFlag : object, raw_response : object, username : object}, raw_response : string, display_name : null, httpStatusCode : number}, value : string} session_token
     * @param (...callbackArgs:{provider : string, params : {security_attributes : {session_token : object, _provider_token : object, content_type : object, Permissions : object, ServicesAuthData : object, raw_response : object, session_ttl : object}, phone : string, opstatus : number, user_attributes : {Email : object, CreatedBy : object, roleId : object, FirstName : object, MiddleName : object, SyncTimeStamp : object, LastModifiedTimeStamp : object, content_type : object, user_id : object, UserRole : object, LastName : object, SoftDeleteFlag : object, raw_response : object, username : object}, raw_response : string, display_name : null, httpStatusCode : number}, value : string})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  AuthModule_BusinessController.prototype.getUserAttributes = function (session_token, onSuccess, onError) {
   try{
      kony.mvc.MDAApplication.getSharedInstance().appContext.userFirstName = session_token.params.user_attributes.FirstName;     
      var firstName=session_token.params.user_attributes.FirstName||"";
      var middleName=session_token.params.user_attributes.MiddleName?session_token.params.user_attributes.MiddleName+" ":"";
      var lastName=session_token.params.user_attributes.LastName||"";
      var legalEntityId =  session_token.params.user_attributes.legalEntityId?session_token.params.user_attributes.legalEntityId.split(","):[];
      kony.mvc.MDAApplication.getSharedInstance().appContext.userFullName = firstName+" "+middleName+""+lastName;  
      kony.mvc.MDAApplication.getSharedInstance().appContext.userID = session_token.params.user_attributes.user_id;
      kony.mvc.MDAApplication.getSharedInstance().appContext.id = session_token.params.user_attributes.id;
      kony.mvc.MDAApplication.getSharedInstance().appContext.legalEntityId = legalEntityId;
      onSuccess(session_token);
    }
    catch (err) {
      kony.print(err);
      onError(err);
    }
  };

  /**
     * @name getSecurityDetails
     * @member AuthModule.businessController
     * @param {provider : string, params : {security_attributes : {session_token : object, _provider_token : object, content_type : object, Permissions : object, ServicesAuthData : object, raw_response : object, session_ttl : object}, phone : string, opstatus : number, user_attributes : {Email : object, CreatedBy : object, roleId : object, FirstName : object, MiddleName : object, SyncTimeStamp : object, LastModifiedTimeStamp : object, content_type : object, user_id : object, UserRole : object, LastName : object, SoftDeleteFlag : object, raw_response : object, username : object}, raw_response : string, display_name : null, httpStatusCode : number}, value : string} session_token
     * @param (...callbackArgs:{provider : string, params : {security_attributes : {session_token : object, _provider_token : object, content_type : object, Permissions : object, ServicesAuthData : object, raw_response : object, session_ttl : object}, phone : string, opstatus : number, user_attributes : {Email : object, CreatedBy : object, roleId : object, FirstName : object, MiddleName : object, SyncTimeStamp : object, LastModifiedTimeStamp : object, content_type : object, user_id : object, UserRole : object, LastName : object, SoftDeleteFlag : object, raw_response : object, username : object}, raw_response : string, display_name : null, httpStatusCode : number}, value : string})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  AuthModule_BusinessController.prototype.getSecurityDetails = function (session_token, onSuccess, onError) {
    var self = this;

    function securityAttributesOnSuccess(resAttributesSuccess) {
      kony.print("securityAttributes SuccessCallback" + JSON.stringify(resAttributesSuccess));
      kony.mvc.MDAApplication.getSharedInstance().appContext.accessDetails = resAttributesSuccess.Permissions.map(function (e) {
        return e.Permission_name;
      });
      self.getUserAttributes(session_token, onSuccess, onError);
    }

    function securityAttributesOnError(resAttributesError) {
      kony.print("securityAttributes ErrorCallback" + JSON.stringify(resAttributesError));
      onError(resAttributesError);
    }
    
    try {
      //get configurationJSON
      permissionsConfig.registerConfig(configurationJSON);
      // ModelManager.invoke('permissions', 'getGrantedPermissions', {}, securityAttributesOnSuccess, securityAttributesOnError);
    } catch (err) {
      onError(err);
    }
  };

  /**
     * @name saveUserName
     * @member AuthModule.businessController
     * @param {username : string, rememberme : null} context
     * @param undefined onSuccess
     * @param undefined onError
     */
  AuthModule_BusinessController.prototype.saveUserName = function (context, onSuccess, onError) {
    var username = context.username;
    var rememberme = context.rememberme;
    try {
      var rememberMeValue;
      if (rememberme === null) {
        rememberMeValue = false;
      } else {
        rememberMeValue = true;
      }
      if (rememberMeValue === true) {
        kony.ds.save(username,"AdminConsoleNames",{dsmode:"cache"});
      } else {
        kony.ds.remove("AdminConsoleNames");
      }
    } catch (err) {
      kony.print(err);
    }
  };

  /**
     * @name deregisterIdleTimeout
     * @member AuthModule.businessController
     * @param {} context
     * @param ()=>any onSuccess
     * @param undefined onError
     */
  AuthModule_BusinessController.prototype.deregisterIdleTimeout = function (context, onSuccess, onError) {
    kony.application.unregisterForIdleTimeout();
    onSuccess({});
  };

  /**
     * @name registerIdleTimeout
     * @member AuthModule.businessController
     * @param {} context
     * @param (...callbackArgs)=>any onSuccess
     * @param undefined onError
     */
  AuthModule_BusinessController.prototype.registerIdleTimeout = function (timeout, onSuccess, onError) {
    if(timeout===undefined)
      timeout=5;
    kony.mvc.MDAApplication.getSharedInstance().appContext.IDLE_TIMEOUT = timeout;

    function timeOutCallback() {
      onSuccess({});
    }
    kony.application.registerForIdleTimeout(kony.mvc.MDAApplication.getSharedInstance().appContext.IDLE_TIMEOUT, timeOutCallback);
  };

  /**
     * @name doLogout
     * @member AuthModule.businessController
     * @param {} context
     * @param ()=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  AuthModule_BusinessController.prototype.doLogout = function (context, onSuccess, onError) {
    var self = this;
    var integrationClient;
    var serviceName = "CustomIdentity";
    var operationName = "logout";
    var params = {};
    // var headers = {
    //   session_token : kony.mvc.MDAApplication.getSharedInstance().appContext.session_token,
    //   "Content-Type":"application/json"
    // };
    var options = {
      "httpRequestOptions": {
        "timeoutIntervalForRequest": 60,
        "timeoutIntervalForResource": 600
      }
    };
    try {
      integrationClient = KNYMobileFabric.getIdentityService("KonyBankingAdminConsoleIdentityService");
      integrationClient.logout(
        function (result) {
          kony.print("Integration Service Response is :" + JSON.stringify(result));
          kony.mvc.MDAApplication.getSharedInstance().appContext.session_token = "";
          //Remove all the active OLB CSR assist windows
          var activeWindows = kony.mvc.MDAApplication.getSharedInstance().appContext.activeCSRAssistWindows;
          if (activeWindows && activeWindows.length > 0) {
            for (var count = 0; count < activeWindows.length; count++) {
              activeWindows[count].windowObject.close();
            }
          }
          //Remove all the active Loans CSR assist windows
          activeWindows = kony.mvc.MDAApplication.getSharedInstance().appContext.activeLoansCSRAssistWindows;
          if (activeWindows && activeWindows.length > 0) {
            for (count = 0; count < activeWindows.length; count++) {
              activeWindows[count].windowObject.close();
            }
          }
          onSuccess();
        },
        function (error) {
          kony.print(error);
          onError(error);
        }, options);
    } catch (exception) {
      onError(exception);
      kony.print("Exception" + exception.message);
    }
  };

  /**
     * @name resetPassword
     * @member AuthModule.businessController
     * @param {inputUserName : string, previousPassword : string, newPassword : string} context
     * @param (response:string)=>any onSuccess
     * @param (response:string)=>any onError
     */
  AuthModule_BusinessController.prototype.resetPassword = function (context, onSuccess, onError) {
    kony.print("Inside resetPassword() of AuthModule_BusinessController");
    var self = this;

    var options = {
      "httpRequestOptions": {
        "timeoutIntervalForRequest": 60,
        "timeoutIntervalForResource": 600
      }
    };

    var integrationClient = new kony.sdk();
    var serviceName = "CustomIdentity";
    var headers = {};
    var operationName = "updatePassword";
    try {
      integrationClient = KNYMobileFabric.getIntegrationService(serviceName);
      integrationClient.invokeOperation(operationName, headers, context, operationSuccess, operationFailure, options);
    } 
    catch (err) {
      kony.print(err);
      onError(err);
    }

    function operationSuccess(res) {
      if (!res.dbpErrCode) {
        onSuccess("Reset password successful");
      }
      else if (res.dbpErrCode === 20935) {
        onError("Current password & new password are same");
      }
      else if (res.dbpErrCode === 20936) {
        onError("New password fails criteria");
      }
      else if (res.dbpErrCode === 20938) {
        onError("Incorrect current password");
      }
      else {
        onError("Reset password failure");
      }
    }

    function operationFailure(res) {
      if (kony.sdk.isSessionOrTokenExpired(res.mfcode)) {
        onError("Session expired");
      } 
      else {
        onError("Reset password failure");
      }
    }
  };


  AuthModule_BusinessController.prototype.resetPasswordForForgotPassword = function (context, onSuccess, onError) {
    kony.print("Inside resetPasswordForForgotPassword() of AuthModule_BusinessController");
    var self = this;

    var password = context.password;
    var confirmPassword = context.confirmPassword;
    var id = context.id;
    var qp = context.qp;

    var queryParams = {
      "UserID": id,
      "NewPassword": password,
      "NewConfirmPassword": confirmPassword,
      "ResetPasswordURL": qp
    };

    var headers = {};
    var options = {};

    try {
      var integrationObj = KNYMobileFabric.getIntegrationService("CustomIdentity");
      integrationObj.invokeOperation("resetPassword", headers, queryParams, operationSuccess, operationFailure);
    } catch (err) {
      kony.print(err);
      onError(err);
    }

    function operationSuccess(res) {
      if (!res.dbpErrCode) {
        onSuccess("Reset password for forgot password successful");
      } 
      else if (res.dbpErrCode === 20939) {
        onError("Link expired");
      }
      else if (res.dbpErrCode === 20930) {
        onError("New password & confirm password don't match");
      }
      else if (res.dbpErrCode === 20936) {
        onError("New password fails criteria");
      }
      else if (res.dbpErrCode === 20931) {
        onError("Invalid reset password request");
      }
      else {
        onError("Reset password for forgot password failure");
      }
    }

    function operationFailure(res) {
      if (kony.sdk.isSessionOrTokenExpired(res.mfcode)) {
        onError("Session expired");
      } 
      else {
        onError("Reset password for forgot password failure");
      }
    }
  };
  
  AuthModule_BusinessController.prototype.verifyResetLink = function(context, onSuccess, onError) {
    var self = this;

    function operationSuccess(res) {
      if (!res.dbpErrCode) {
        onSuccess("Link valid");
      } else if (res.dbpErrCode === 20939) {
        kony.mvc.MDAApplication.getSharedInstance().appContext.emailID = res.email;
        onError("Link expired");
      } else if (res.dbpErrCode === 20931) {
        onError("Incorrect Password Reset Link");
      } else if (res.dbpErrCode === 20981) {
        onError("Error at database adapter layer invoking password service");
      } else {
        onError("Reset password link verification failure");
      }
    }

    function operationFailure(res) {
      if (kony.sdk.isSessionOrTokenExpired(res.mfcode)) {
        onError("Session expired");
      } else {
        onError("Reset password link verification failure");
      }
    }
    var queryParams = {
      "UserID": context.id,
      "ResetPasswordURL": context.qp
    };
    var headers = {};
    try {
      var integrationObj = KNYMobileFabric.getIntegrationService("CustomIdentity");
      integrationObj.invokeOperation("verifyResetLink", headers, queryParams, operationSuccess, operationFailure);
    } catch (err) {
      kony.print(err);
      onError(err);
    }
  };
  
  /**
     * @name resetLocalStorage
     * @member AuthModule.businessController
     * @param {} context
     * @param ()=>any onSuccess
     * @param ()=>any onError
     */
  AuthModule_BusinessController.prototype.resetLocalStorage = function (context, onSuccess, onError) {
    try {
      location.reload();
      onSuccess();
    } catch (e) {
      onError(e);
    }
  };

  /**
     * @name getServerTimeZoneOffset
     * @member AuthModule.businessController
     * @param undefined context
     */
  AuthModule_BusinessController.prototype.getServerTimeZoneOffset = function (context, onSuccess, onError) {

    try{
      function completionCallback(status,response,error){
        var serverTimezoneOffsetInMinutes = "0";
        if(status===kony.mvc.constants.STATUS_SUCCESS){
          serverTimezoneOffsetInMinutes = response.ZoneOffsetInMinutes;
        }else{
          kony.print("Failed to fetch server timezone offset. Assuming server is at UTC");
        }

        //getTimezoneOffset() api returns timezone offset in minutes
        var localTimezoneOffsetInMinutes = new Date().getTimezoneOffset();
        var offsetDifferenceInMinutes = parseInt(serverTimezoneOffsetInMinutes) + parseInt(localTimezoneOffsetInMinutes);
        //Set offset difference globally
        kony.mvc.MDAApplication.getSharedInstance().appContext.TIME_ZONE_OFFSET_DIFFERENCE = (offsetDifferenceInMinutes * (-1));

        if(onSuccess){
          onSuccess();
        }
      }

      kony.mvc.MDAApplication.getSharedInstance().modelStore.
      getModelDefinition("server").
      customVerb("getServerTimeZoneOffset", {}, completionCallback);
    }catch(exception){
      if(onError)
        onError(exception);
      else
        throw exception;
    }
  };

  AuthModule_BusinessController.prototype.forceRefreshClaimsToken = function () {
    var callback = function(){ };
    var options = {
      "IdentityServiceName": this.identityProvider,
      "AuthParams": {
        "loginOptions": {
          "isOfflineEnabled": false
        }
      }
    };
    var authClient = KNYMobileFabric.getIdentityService(this.identityProvider);
    try {
      authClient.getBackendToken(true, options ,callback , callback);
    } catch (err) {
      kony.print(err);
    }
  };

  AuthModule_BusinessController.prototype.execute = function (command) {
    kony.mvc.Business.Controller.prototype.execute.call(this, command);
  };
  AuthModule_BusinessController.prototype.doLoginViaKeyCloak = function (context, onSuccess, onError) {
    var self = this;
    function successCallback(resSuccess) {
      kony.print("successCallback" + JSON.stringify(resSuccess));
      var options = {
        "IdentityServiceName": "DbxKeyCloakLogin",
        "AuthParams": {
          "loginOptions": {
            "isOfflineEnabled": false
          }
        }
      };

      function TokenSuccessCallback(session_token) {
        kony.mvc.MDAApplication.getSharedInstance().appContext.userName=session_token.params.username;
        //var timeout=session_token.params.expires_in;
        //kony.mvc.MDAApplication.getSharedInstance().appContext.IDLE_TIMEOUT=timeout?(timeout/60):5;  
        kony.mvc.MDAApplication.getSharedInstance().appContext.IDLE_TIMEOUT=5;  //TODO to be retrieved from keycloak
        kony.print("TokenSuccessCallback" + JSON.stringify(session_token));
        kony.mvc.MDAApplication.getSharedInstance().appContext.session_token = session_token.value;
        kony.setUserID(session_token.params.username);
        self.getUserPermissions(session_token,onSuccess,onError);
        self.getAttribute({
          "attribute" : "currencyCode, isSingleEntity"
        });  
      }

      function tokenErrorCallback(resTokenError) {
        kony.print("tokenErrorCallback" + JSON.stringify(resTokenError));
        onError(resTokenError);
      }
      try {
        authClient.getBackendToken(false, options, TokenSuccessCallback, tokenErrorCallback);
      } catch (err) {
        onError(err);
      }
    }

    function errorCallback(error) {
      onError(error);
    }
    try {
      authClient = KNYMobileFabric.getIdentityService("DbxKeyCloakLogin");
      authClient.login(context, successCallback, errorCallback);
    } catch (err) {
      kony.print(err);
      onError(err);
    }
  };
   AuthModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
     permissionsConfig.registerConfig(configurationJSON);
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
  };
    /**
     * @name getPermissionsForLegalEntities

     */
  AuthModule_BusinessController.prototype.getPermissionsForLegalEntities = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.getPermissionsForLegalEntities(context, onSuccess, onError);
  };

  
  AuthModule_BusinessController.prototype.doKeyCloakLogout = function (context, onSuccess, onError) {
    var self = this;
    var integrationClient;
    var options = {
      "httpRequestOptions": {
        "timeoutIntervalForRequest": 60,
        "timeoutIntervalForResource": 600
      }
    };
    try {
      integrationClient = KNYMobileFabric.getIdentityService("DbxKeyCloakLogin");
      integrationClient.logout(
        function (result) {
          kony.print("Integration Service Response is :" + JSON.stringify(result));
          kony.mvc.MDAApplication.getSharedInstance().appContext.session_token = "";
          //Remove all the active OLB CSR assist windows
          var activeWindows = kony.mvc.MDAApplication.getSharedInstance().appContext.activeCSRAssistWindows;
          if (activeWindows && activeWindows.length > 0) {
            for (var count = 0; count < activeWindows.length; count++) {
              activeWindows[count].windowObject.close();
            }
          }
          //Remove all the active Loans CSR assist windows
          activeWindows = kony.mvc.MDAApplication.getSharedInstance().appContext.activeLoansCSRAssistWindows;
          if (activeWindows && activeWindows.length > 0) {
            for (count = 0; count < activeWindows.length; count++) {
              activeWindows[count].windowObject.close();
            }
          }
          onSuccess();
        },
        function (error) {
          kony.print(error);
          onError(error);
        }, options);
    } catch (exception) {
      onError(exception);
      kony.print("Exception" + exception.message);
    }
  };
  AuthModule_BusinessController.prototype.getAttribute = function (context) {
    var self = this;
    var onSuccessCallBack = function(response){
      kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY = response.isSingleEntity && response.isSingleEntity === 'true' ? true : false;
      kony.mvc.MDAApplication.getSharedInstance().appContext.BASE_CURRENCY = response.currencyCode;
      kony.mvc.MDAApplication.getSharedInstance().appContext.CURRENCY_SYMBOL_TO_USE = 
          kony.servicesapp.preferenceConfigHandler.getInstance().getPreferenceValue("CurrencySymbolToUse")?kony.servicesapp.preferenceConfigHandler.getInstance().getPreferenceValue("CurrencySymbolToUse"):"BASE_CURRENCY";
    };
    var onErrorCallBack = function(err){
      kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY = false;
      kony.mvc.MDAApplication.getSharedInstance().appContext.BASE_CURRENCY = null;
      kony.mvc.MDAApplication.getSharedInstance().appContext.CURRENCY_SYMBOL_TO_USE = null;
    };
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getAttribute(context, onSuccessCallBack, onErrorCallBack);
  };
  
 AuthModule_BusinessController.prototype.getLegalEntities = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MultiEntityManager")
      .businessController.getLegalEntities(context, onSuccess, onError);
  };
  return AuthModule_BusinessController;
});
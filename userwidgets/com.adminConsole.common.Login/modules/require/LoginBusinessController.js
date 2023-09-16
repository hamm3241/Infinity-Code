define(['permissionsConfig','WidgetConfig_FormExtn'],function(permissionsConfig,configurationJSON) {
  function loginBusinessController(){
    this.identityServiceName = "DbxKeyCloakLogin";//"KonyBankingAdminConsoleIdentityService";//
  }
  loginBusinessController.prototype.login = function(payload,onSuccess,onError) {
    var self=this;

    var authClient = KNYMobileFabric.getIdentityService(self.identityServiceName);
    function successCallback(resSuccess) {
      //kony.mvc.MDAApplication.getSharedInstance().appContext.userID = KNYMobileFabric.getUserId();
      kony.print("successCallback" + JSON.stringify(resSuccess));
      var options = {
        "IdentityServiceName": self.identityServiceName,
        "AuthParams": {
          "loginOptions": {
            "isOfflineEnabled": false
          }
        }
      };
      function tokenSuccessCallback(session_token) {
        kony.print("TokenSuccessCallback" + JSON.stringify(session_token));
        kony.mvc.MDAApplication.getSharedInstance().appContext.userName=session_token.params.username;
        kony.mvc.MDAApplication.getSharedInstance().appContext.session_token = session_token.value;
        kony.setUserID(session_token.params.username);
        var permissionsString;
        if(session_token.params && session_token.params.security_attributes && session_token.params.security_attributes.permissions){
          permissionsString = session_token.params.security_attributes.permissions;
        }else{
          onError("Unable to parse the permissions from indentity scope");
        }

        kony.mvc.MDAApplication.getSharedInstance().appContext.accessDetails = JSON.parse(permissionsString);
        permissionsConfig.registerConfig(configurationJSON);
        kony.mvc.MDAApplication.getSharedInstance().appContext.BASE_CURRENCY = 
          kony.servicesapp.preferenceConfigHandler.getInstance().getPreferenceValue("BaseCurrency");
        kony.mvc.MDAApplication.getSharedInstance().appContext.CURRENCY_SYMBOL_TO_USE = 
          kony.servicesapp.preferenceConfigHandler.getInstance().getPreferenceValue("CurrencySymbolToUse");
        self.getUserAttributes(session_token, onSuccess, onError);
        //kony.mvc.MDAApplication.getSharedInstance().appContext.userName=usernamePasswordObj.username;//TODO
        self.getServerTimeZoneOffset();
      }

      function tokenErrorCallback(resTokenError) {
        kony.print("tokenErrorCallback" + JSON.stringify(resTokenError));
        onError(resTokenError);
      }
      try {
        authClient.getBackendToken(false, options, tokenSuccessCallback, tokenErrorCallback);
      } catch (err) {
        onError(err);
      }
    }
    function onErrorCallback(error) {
     // kony.mvc.MDAApplication.getSharedInstance().appContext.userName=usernamePasswordObj.username;//TODO
      onError(error);
    }
    try {
      authClient.login(payload, successCallback, onErrorCallback);
    } catch (err) {
      kony.print(err);
      onError(err);
    }
  };
  loginBusinessController.prototype.getUserAttributes = function (session_token, onSuccess, onError) {
    var authClient = KNYMobileFabric.getIdentityService(this.identityServiceName);
    function userAttributesSuccessCallback(userAttributesSuccess) {
      kony.print("userAttributes SuccessCallback" + JSON.stringify(userAttributesSuccess));
      kony.mvc.MDAApplication.getSharedInstance().appContext.userFirstName = userAttributesSuccess.FirstName;
      kony.mvc.MDAApplication.getSharedInstance().appContext.userID = userAttributesSuccess.user_id;
      onSuccess(session_token);
    }

    function userAttributesErrorCallback(userAttributesError) {
      kony.print("userAttributes ErrorCallback" + JSON.stringify(userAttributesError));
      onError(userAttributesError);
    }
    try {
      authClient.getUserAttributes(userAttributesSuccessCallback, userAttributesErrorCallback);
    } catch (err) {
      onError(err);
    }

  };
  loginBusinessController.prototype.getServerTimeZoneOffset = function (context, onSuccess, onError) {
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
    try{ kony.mvc.MDAApplication.getSharedInstance().modelStore.
      getModelDefinition("server").
      customVerb("getServerTimeZoneOffset", {}, completionCallback);
    }catch(exception){
      if(onError)
        onError(exception);
      else
        throw exception;
    }
  };
  loginBusinessController.prototype.saveUserName = function (context, onSuccess, onError) {
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
  return loginBusinessController;
});
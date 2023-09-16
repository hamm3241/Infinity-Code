define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {

  function PasswordAgeAndLockout_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(PasswordAgeAndLockout_PresentationController, kony.mvc.Presentation.BasePresenter);
  PasswordAgeAndLockout_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmPasswordAgeAndLockoutSettings',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  PasswordAgeAndLockout_PresentationController.prototype.showLoadingScreen = function() {
    var self = this;
    self.presentUserInterface('frmPasswordAgeAndLockoutSettings',{
      "LoadingScreen": {
        "focus": true
      }
    });
  };
  PasswordAgeAndLockout_PresentationController.prototype.hideLoadingScreen = function() {
    var self = this;
    self.presentUserInterface('frmPasswordAgeAndLockoutSettings',{
      "LoadingScreen": {
        "focus": false
      }
    });
  };
  PasswordAgeAndLockout_PresentationController.prototype.getPasswordLockoutSettings = function() {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      var context = {
        "getPasswordLockoutSettingsResponse" : {
          "status" : "success",
          "passwordAgeAndLockoutData" : response
        }
      };
      self.presentUserInterface('frmPasswordAgeAndLockoutSettings', context);
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      var context = {
        "getPasswordLockoutSettingsResponse" : {"status" : "failure"}
      };
      self.presentUserInterface('frmPasswordAgeAndLockoutSettings', context);
      self.hideLoadingScreen();
    }

    this.businessController.getPasswordLockoutSettings({}, successCallback, failureCallback);
  };
  PasswordAgeAndLockout_PresentationController.prototype.updatePasswordLockoutSettings = function(updatePasswordAgeAndLockoutData) {
    var self = this;
    self.showLoadingScreen();

    function successCallback(response) {
      var context = {
        "updatePasswordLockoutSettingsResponse" : {"status" : "success"}
      };
      self.presentUserInterface('frmPasswordAgeAndLockoutSettings', context);
      self.getPasswordLockoutSettings();
    }

    function failureCallback(error) {
      var context = {
        "updatePasswordLockoutSettingsResponse" : {"status" : "failure"}
      };
      self.presentUserInterface('frmPasswordAgeAndLockoutSettings', context);
      self.hideLoadingScreen();
    }

    this.businessController.updatePasswordLockoutSettings(updatePasswordAgeAndLockoutData, successCallback, failureCallback);
  };
  return PasswordAgeAndLockout_PresentationController;

});
define(['./LoginBusinessController','Navigation_Presentation_Extn'],function(LoginBusinessController,navigation) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    this.LoginBusinessController = new LoginBusinessController();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    preShow : function(){
      var scopeObj=this;
      scopeObj.login();
    },
    login : function() {
//       var usernamePasswordObj={
//         "inputUsername":this.view.txtUserName.text,
//         "inputPassword":this.view.txtPassword.text,
//         "loginOptions": {
//           "isSSOEnabled": true,
//           "isOfflineEnabled": false
//         }
//       };
//       kony.print("usernamePasswordObj: "+JSON.stringify(usernamePasswordObj));
      kony.adminConsole.utils.showProgressBar(this.view);
      var options = {};
      options.include_profile = true;
      //browserWidget is mandatory if using the MVC Architecture
      var loginOptions = {};
      loginOptions.isSSOEnabled = false;
      loginOptions.continueOnRefreshError = false;
      loginOptions.persistLoginResponse = true;
      options.loginOptions = loginOptions;
      this.LoginBusinessController.login(options, this.onLoginSuccess, this.onLoginFailure);
    },
    onLoginSuccess : function(){
      kony.application.dismissLoadingScreen();
      navigation.navigateTo('DashboardModule', 'fetchDashBoardData');
      //loginSuccessCallBack(response, usernamePasswordObj);
    },
    onLoginFailure : function(){
      kony.application.dismissLoadingScreen();
      //loginFailureCallBack(response);
    }
    
  };
});
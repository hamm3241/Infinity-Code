define(function() {

  return {
    setActions: function(){
      var scopeObj = this;
      this.view.flxOuterActions.onHover =  scopeObj.onHoverEventCallback;
      
      this.view.flxChangePassword.onClick = function(){
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.showChangePasswordScreen();
      };
      this.view.flxSignOut.onClick = function(){
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.doLogout();
      };
      this.view.lblIconDownArrow.onClick = function(){
        scopeObj.showDropDown();
      };
      this.view.lblUserName.onClick = function(){
        scopeObj.showDropDown();
      };
    },

    preShow: function(){
      this.setActions();
      this.view.flxDropdown.setVisibility(false);
      this.view.lblUserName.text = "Hello, "+kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      if(authModule){
        authModule.presentationController.getLoginTypeConfiguration(this.onFetchLoginTypeSuccess, function onError(){});
      }
  },
  onFetchLoginTypeSuccess : function(response){
    var iskeyCloakEnabled=response.isKeyCloakEnabled;
    this.view.flxChangePassword.setVisibility(!iskeyCloakEnabled);
  },
    showDropDown : function(){
      var self = this;
        var currForm = kony.application.getCurrentForm();
        if(currForm.dropdownMainHeader.flxDropdown.isVisible === true){
          self.view.flxDropdown.setVisibility(false);
        }  else{
          self.view.flxDropdown.setVisibility(true);
          self.view.flxDropdown.top = "28px";
        }
        currForm.forceLayout();
    },
    onHoverEventCallback:function(widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widget.parent.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.parent.setVisibility(false);
        var currForm = kony.application.getCurrentForm();
        currForm.forceLayout();
      }
    },
  };
});
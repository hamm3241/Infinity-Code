define(function () {
  var VisibleState = function(initialState){
    this.isVisible = initialState;
    this.setVisiblity = function(show){
      this.isVisible = show;
    };
  };
  var controller = {
    imgLogout_onTouchStart: function () {
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authModule.presentationController.doLogout();
    },
    frmCSR_btnCreateNewMessage : new VisibleState(true),
    frmCSR_btnCreateMessageTemplate : new VisibleState(true),
    frmCSR_setBtnDropDownText: function (text) {
      if(text === kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_MESSAGE")){
        this.view.btnDropdownList.text = text;
        this.view.btnDropdownList.isVisible = controller.frmCSR_btnCreateNewMessage.isVisible;
      }else if(text === kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_TEMPLATE")){
        this.view.btnDropdownList.text = text;
        this.view.btnDropdownList.isVisible = controller.frmCSR_btnCreateMessageTemplate.isVisible;
      }
    }
  };
  return controller;
});
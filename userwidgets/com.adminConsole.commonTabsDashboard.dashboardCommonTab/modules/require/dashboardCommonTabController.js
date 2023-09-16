define(function() {
return {
	setFlowActions: function(){
    this.view.btnProfile.onClick = function(){
      var customerManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      customerManagementModule.presentationController.navigateToContactsTab(); 
    };
    this.view.btnLoans.onClick = function(){
      var customerManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      customerManagementModule.presentationController.showLoansForm(); 
    };
    this.view.btnDeposits.onClick = function(){
      var customerManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      customerManagementModule.presentationController.showApplicationsTab();
    };
    this.view.btnCDP.onClick = function(){
      var customerManagementModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      customerManagementModule.presentationController.showCDPTab();
    };
  }
};
});
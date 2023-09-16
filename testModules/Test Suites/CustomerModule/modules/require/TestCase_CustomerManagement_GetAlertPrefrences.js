define([], function() {

  	function TestCase_CustomerManagement_GetAlertPrefrences(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetAlertPrefrences, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetAlertPrefrences.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
        var reqParam = {userName :"konyolbuser"};
		function onFetchCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.AlertPrefrences) {
						expect(viewModel.AlertPrefrences, 'to have Data object').to.have.property("data");
						expect(viewModel.AlertPrefrences.data, 'to have alerts object').to.have.property("alertTypes");
						expect(viewModel.AlertPrefrences.data.alertTypes, 'to verify alerts type list length').to.have.length.above(0);
						expect(viewModel.AlertPrefrences.data.alertTypes[0], 'to verify fields in alert type record').to.include.all.
							keys(['alertType', 'isSelected', 'canBeSelected', 'alerts']);
						expect(viewModel.AlertPrefrences.data.alertTypes[0], 'to have sub-alerts object').to.have.property("alerts");
						expect(viewModel.AlertPrefrences.data.alertTypes[0].alerts, 'to verify sub-alerts  list length').to.have.length.above(0);
						expect(viewModel.AlertPrefrences.data.alertTypes[0].alerts[0], 'to verify fields in sub-alert record').to.include.all.
							keys(['alertId', 'name', 'isPushActive', 'isEmailActive', 'isSmsActive', 'isSelected', 'canBeSelected', 'canEmailBeSelected', 'canPushBeSelected', 'canSmsBeSelected']);
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
			customerModule.presentationController.getAlertPrefrences(reqParam);
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetAlertPrefrences.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetAlertPrefrences;
    
});
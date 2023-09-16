define([], function() {

  	function TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {
			"customerUsername": "konyolbuser"
		};
		function onFetchCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.CustomerRequestAndNotificationCount) {
						expect(viewModel.CustomerRequestAndNotificationCount, 'to verify count atrributes in object').to.include.all.
							keys(['notificationCount', 'requestCount']);
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
			customerModule.presentationController.getCustomerRequestAndNotificationCount(reqParam);
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount;
    
});
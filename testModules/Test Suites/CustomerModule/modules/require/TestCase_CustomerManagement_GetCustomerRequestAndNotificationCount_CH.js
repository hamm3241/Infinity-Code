define([], function() {

  	function TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount_CH.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {
			"customerUsername": "konyolbuser"
		};
		function onFetchCompletion(response) {
			try {
				expect(response.data, 'to have required attributes').to.include.all.keys(['notificationCount', 'requestCount', 'opstatus']);
				expect(response.data.opstatus, 'to verify opstatus').to.equal(0);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			customerModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerRequestAndNotificationCount", reqParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount_CH.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCustomerRequestAndNotificationCount_CH;
    
});
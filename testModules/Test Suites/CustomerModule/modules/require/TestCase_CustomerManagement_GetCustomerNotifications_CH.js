define([], function() {

  	function TestCase_CustomerManagement_GetCustomerNotifications_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCustomerNotifications_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCustomerNotifications_CH.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {
			"$filter": "customer_Id eq 1"
		};
		function onFetchCompletion(response) {
			try {
				expect(response.data, 'to verify response').to.include.all.keys(['opstatus','customernotifications_view']);
				expect(response.data.opstatus, 'to verify opstatus').to.equal(0);
				expect(response.data.customernotifications_view, 'to verify notifications list exist').to.have.length.above(0);
				expect(response.data.customernotifications_view[0], 'to verify fields in customer notification record').to.include.all.
					keys(['Name', 'ExpirationDate', 'StartDate', 'Status_id', 'Description', 'isread']);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			customerModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerNotifications", reqParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetCustomerNotifications_CH.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCustomerNotifications_CH;
    
});
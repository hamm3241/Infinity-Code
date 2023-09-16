define([], function() {

  	function TestCase_CustomerManagement_GetCardRequests_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCardRequests_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCardRequests_CH.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {
			"Username":"konyolbuser"
		};
		function onFetchCompletion(response) {
			try {
				expect(response.data, 'to verify response').to.include.all.keys(['CardAccountRequests','opstatus']);
				expect(response.data.opstatus, 'to verify opstatus').to.equal(0);
				expect(response.data.CardAccountRequests, 'to verify requests length').to.have.length.above(0);
				expect(response.data.CardAccountRequests[0], 'to verify fields in card-requests record').to.include.all.
					keys(['Request_id', 'Status', 'Type', 'Date','DeliveryMode','DeliveryDetails']);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			customerModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.GetCardRequests", reqParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetCardRequests_CH.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCardRequests_CH;
    
});
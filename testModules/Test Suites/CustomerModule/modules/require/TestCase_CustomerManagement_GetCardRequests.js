define([], function() {

  	function TestCase_CustomerManagement_GetCardRequests(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCardRequests, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCardRequests.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
        var reqParam = {Username : "konyolbuser"};
		function onFetchCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.CardRequests) {
						expect(viewModel.CardRequests.opstatus, 'to verify opstatus').to.equal(0);
						expect(viewModel.CardRequests.CardAccountRequests, 'to verify card Requests list length').to.have.length.above(0);
						expect(viewModel.CardRequests.CardAccountRequests[0], 'to verify fields in cards request record').to.include.all.
							keys(['Request_id', 'Status', 'Type', 'Date', 'DeliveryMode', 'DeliveryDetails']);
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
			customerModule.presentationController.getCardRequests(reqParam);
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetCardRequests.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCardRequests;
    
});
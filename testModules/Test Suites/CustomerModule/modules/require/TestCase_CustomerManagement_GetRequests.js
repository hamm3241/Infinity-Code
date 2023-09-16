define([], function() {

  	function TestCase_CustomerManagement_GetRequests(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetRequests, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetRequests.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
        var reqParam = {customerID : "1"};
		function onFetchCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.CustomerRequests) {
						expect(viewModel.CustomerRequests, 'to verify customer Requests list length').to.have.length.above(0);
						expect(viewModel.CustomerRequests[0], 'to verify fields in customer request record').to.include.all.
							keys(['accountid', 'customer_id', 'msgids', 'id', 'unreadmsgs', 'totalmsgs','status_id','statusIdentifier','readmsgs',
                                 'requestcategory_id','requestsubject','totalAttachments']);
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
			customerModule.presentationController.getCustomerRequests(reqParam);
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetRequests.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetRequests;
    
});
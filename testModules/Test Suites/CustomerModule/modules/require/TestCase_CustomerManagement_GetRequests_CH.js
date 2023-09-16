define([], function() {

  	function TestCase_CustomerManagement_GetRequests_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetRequests_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetRequests_CH.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {"$filter":"customer_id eq 1"}
		function onFetchCompletion(response) {
			try {
				expect(response.data, 'to verify response').to.include.all.keys(['customerrequests_view','opstatus']);
				expect(response.data.opstatus, 'to verify opstatus').to.equal(0);
				expect(response.data.customerrequests_view, 'to verify requests length').to.have.length.above(0);
				expect(response.data.customerrequests_view[0], 'to verify fields in customer requests record').to.include.all.
					keys(['accountid', 'id', 'customer_id', 'msgids','requestcategory_id','requestsubject','status_id',
                         'statusIdentifier','unreadmsgs','totalmsgs','readmsgs']);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			customerModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerRequests", reqParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetRequests_CH.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetRequests_CH;
    
});
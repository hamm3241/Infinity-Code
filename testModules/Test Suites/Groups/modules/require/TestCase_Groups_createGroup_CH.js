define([], function() {

  	function TestCase_Groups_createGroup_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_createGroup_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_createGroup_CH.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var createRequestParam = {
			"Name": "TestGroup1",
			"Description": "testing group",
			"Status_id": "SID_ACTIVE",
			"User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
			"Entitlements": [{
					"Service_id": "SERVICE_ID_1",
					"TransactionFee_id": "TID1",
					"TransactionLimit_id": "TID1"
				}],
			"Customers": [{"Customer_id": "1"}]
		};
		function onCreateCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to verify create group response').to.include.all.keys(['Status', 'opstatus']);
				expect(response.data.Status, 'to verify create group status').to.equal("Success");
				expect(response.data.opstatus, 'to verify create group opstatus').to.equal(0);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to verify groups list exist').to.have.length.above(0);
				var recordLength = response.data.length;
				//creating name
				createRequestParam.Name = "Test_" + (recordLength + 1) + " Group";
				createRequestParam.Description = "Test_" + (recordLength + 1) + " Group Description";
				groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.addCustomerGroups", createRequestParam, onCreateCompletion));
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.getCustomerGroupsView", {}, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_Groups_createGroup_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_createGroup_CH;
    
});
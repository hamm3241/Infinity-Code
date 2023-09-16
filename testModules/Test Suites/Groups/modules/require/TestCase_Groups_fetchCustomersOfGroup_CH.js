define([], function() {

  	function TestCase_Groups_fetchCustomersOfGroup_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchCustomersOfGroup_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchCustomersOfGroup_CH.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var requestParam = {
			"Group_id": "GROUP_PLATINUM"
		};
		function onFetchCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				if (response.data.length > 0) {
					expect(response.data, 'to verify customer exist').to.have.length.above(0);
					expect(response.data[0], 'to verify fields in customer record').to.include.all.
								keys(['Customer_id', 'Status_id', 'Username', 'FullName', 'Email', 'UpdatedOn']);
				}
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.getGroupCustomers", requestParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_Groups_fetchCustomersOfGroup_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchCustomersOfGroup_CH;
    
});
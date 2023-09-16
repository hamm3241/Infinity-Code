define([], function() {

  	function TestCase_Groups_createGroup(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_createGroup, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_createGroup.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var testModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TestModule");
		var self = this;
		var expect = chai.expect;
		var recordLength = 0;
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
			"Customers": [{
					"Customer_id": "1"
				}]
		};

		function onCreateCompletion(viewModel) {
			try {
				if (viewModel) {
                    if(viewModel.toast){
                      expect(viewModel.toast,'to verify toast message status').to.have.property('status',"success");
                    }
					if (viewModel.custGroupsList && viewModel.context === "") {
						validateFetchResponse(viewModel);
						expect(viewModel.custGroupsList.length, 'to verify no of records').to.equal(recordLength + 1);
						var newRecord = viewModel.custGroupsList.find(function (rec) {
								return ((createRequestParam.Name === rec.Group_Name) && (createRequestParam.Description === rec.Group_Desc));
							});
						expect(newRecord, 'to verify new group name that is added').to.have.property('Group_Name', createRequestParam.Name);
						expect(newRecord, 'to verify new group description that is added').to.have.property('Group_Desc', createRequestParam.Description);
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.custGroupsList && viewModel.context === "") {
						validateFetchResponse(viewModel);
						recordLength = viewModel.custGroupsList.length;
						createRequestParam.Name = "Test_" + (recordLength + 1) + " Group";
						createRequestParam.Description = "Test_" + (recordLength + 1) + " Group Description";
						command.context.onPresentForm('frmGroups', onCreateCompletion);
						groupsModule.presentationController.createCustomerGroups(createRequestParam);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmGroups', onFetchCompletion);
			groupsModule.presentationController.navigateTo('CustomerGroupsModule', 'fetchCustomerGroups');
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
        function validateFetchResponse(viewModel){
          expect(viewModel.custGroupsList, 'to get groups').to.have.length.above(0);
		  expect(viewModel.custGroupsList[0], 'to verify fields in group record').to.include.all.
					keys(['Customers_Count', 'Entitlements_Count', 'Group_Desc', 'Group_Name', 'Group_id', 'Status_id']);
       }  
    };
	
	TestCase_Groups_createGroup.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_createGroup;
    
});
define([], function() {

  	function TestCase_Groups_fetchCustomersOfGroup(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchCustomersOfGroup, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchCustomersOfGroup.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var groupId = "";
		function onFetchCustomerCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.customersOfGroup && viewModel.context === "") {
						expect(viewModel.customersOfGroup, 'to get customers of groups').to.have.length.above(0);
						expect(viewModel.customersOfGroup[0], 'to verify fields of customer record').to.include.all.
									keys(['Customer_id', 'FullName', 'Status_id', 'Username', 'Email', 'UpdatedOn']);
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchGroupCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.custGroupsList && viewModel.context === "") {
						expect(viewModel.custGroupsList, 'to get groups').to.have.length.above(0);
						expect(viewModel.custGroupsList[0], 'to verify fields in group record').to.include.all.
									keys(['Customers_Count', 'Entitlements_Count', 'Group_Desc', 'Group_Name', 'Group_id', 'Status_id']);
						var groupRecord = viewModel.custGroupsList.filter(function (rec) {
								if (rec.Customers_Count > 0) {
									return rec;
								}
							});
						command.context.onPresentForm('frmGroups', onFetchCustomerCompletion);
						groupsModule.presentationController.fetchCustomersOfGroup(groupRecord[0].Group_id, false);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmGroups', onFetchGroupCompletion);
			groupsModule.presentationController.navigateTo('CustomerGroupsModule', 'fetchCustomerGroups');
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_Groups_fetchCustomersOfGroup.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchCustomersOfGroup;
    
});
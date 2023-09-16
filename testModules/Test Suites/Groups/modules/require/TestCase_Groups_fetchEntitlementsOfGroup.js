define([], function() {

  	function TestCase_Groups_fetchEntitlementsOfGroup(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchEntitlementsOfGroup, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchEntitlementsOfGroup.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var groupId = "";
		function onFetchCustomerCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.entitlementsOfGroup && viewModel.context === "") {
						expect(viewModel.entitlementsOfGroup, 'to get entitlements of groups').to.have.length.above(0);
						expect(viewModel.entitlementsOfGroup[0], 'to verify fields of entitlement record').to.include.all.
									keys(['Service_id', 'Group_id', 'Description', 'TransactionFee_id', 'TransactionLimit_id', 'Name']);
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
								if (rec.Entitlements_Count > 0) {
									return rec;
								}
							});
						command.context.onPresentForm('frmGroups', onFetchCustomerCompletion);
						groupsModule.presentationController.fetchEntitlementsOfGroup(groupRecord[0].Group_id, false);
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
	
	TestCase_Groups_fetchEntitlementsOfGroup.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchEntitlementsOfGroup;
    
});
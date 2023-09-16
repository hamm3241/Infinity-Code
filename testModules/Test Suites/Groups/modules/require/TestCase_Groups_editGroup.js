define([], function() {

  	function TestCase_Groups_editGroup(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_editGroup, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_editGroup.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var groupId = "";
		var editReqParam = {
			"Group_id": "GROUP_GOLD",
			"Status_id": "SID_ACTIVE",
			"Name": "Gold",
			"Description": "Gold Description",
			"User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
			"removedEntitlementIds": [],
			"addedEntitlementIds": [{
					"Service_id": "SERVICE_ID_1",
					"TransactionLimit_id": "TID1",
					"TransactionFee_id": "TID1"
				}],
			"removedCustomerIds": [],
			"addedCustomerIds": [{"Customer_id": "1"},
								 {"Customer_id": "2"}]
		};
		function onUpdateCompletion(viewModel) {
			try {
				if (viewModel) {
                    if(viewModel.toast){
                      expect(viewModel.toast,'to verify toast message status').to.have.property('status',"success");
                    }
					if (viewModel.custGroupsList && viewModel.context === "") {
                        validateFetchResponse(viewModel);
						var editedRecord = viewModel.custGroupsList.find(function (rec) {
								return editReqParam.Group_id === rec.Group_id;
							});
						expect(editedRecord.Entitlements_Count, 'to verify the entitlements count').to.equal("1");
						expect(editedRecord.Customers_Count, 'to verify the customers count').to.equal("2");
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchEntCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.context === "editGroup") {
						expect(viewModel, 'to get entitlements,customers of group').to.include.all.keys(['entitlements', 'customersOfGroup', 'entitlementsOfGroup']);
						expect(viewModel.entitlements, 'to verify entitlements').to.have.length.above(0);
						expect(viewModel.entitlements[0], 'to verify fields in entitlement record').to.include.all.
						keys(['Description', 'TransactionFee_id', 'Channel_id', 'Name', 'id', 'Status_id', 'TransactionLimit_id', 'Type_id']);
						if (viewModel.customersOfGroup.length > 0) { //removing customers if exist
							var removeCust = viewModel.customersOfGroup.map(function (rec) {
									return {"Customer_id": rec.Customer_id}
								});
							editReqParam.removedCustomerIds = removeCust;
						}
						if (viewModel.entitlementsOfGroup.length > 0) { //removing entitlements if exist
							var removeEnt = viewModel.entitlementsOfGroup.map(function (rec) {
									return {
										"Service_id": rec.Service_id,
										"Group_id": editReqParam.Group_id,
									};
								});
							editReqParam.removedEntitlementIds = removeEnt;
						}
						command.context.onPresentForm('frmGroups', onUpdateCompletion);
						groupsModule.presentationController.updateCustomerGroups(editReqParam);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchGroupCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.custGroupsList && viewModel.context === ""){
                        validateFetchResponse(viewModel);
						editReqParam.Group_id = viewModel.custGroupsList[0].Group_id;
						editReqParam.Name = viewModel.custGroupsList[0].Group_Name;
						editReqParam.Description = viewModel.custGroupsList[0].Group_Desc;
						editReqParam.Status_id = viewModel.custGroupsList[0].Status_id;

						command.context.onPresentForm('frmGroups', onFetchEntCompletion);
						groupsModule.presentationController.fetchEntitlements(true, viewModel.custGroupsList[0].Group_id, 3);
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
        function validateFetchResponse(viewModel){
          expect(viewModel.custGroupsList, 'to get groups').to.have.length.above(0);
		  expect(viewModel.custGroupsList[0], 'to verify fields in group record').to.include.all.
					keys(['Customers_Count', 'Entitlements_Count', 'Group_Desc', 'Group_Name', 'Group_id', 'Status_id']);
       }  
    };
	TestCase_Groups_editGroup.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_editGroup;
    
});
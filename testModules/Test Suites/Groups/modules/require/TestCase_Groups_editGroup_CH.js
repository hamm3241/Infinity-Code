define([], function() {

  	function TestCase_Groups_editGroup_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_editGroup_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_editGroup_CH.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var editRequestParam = {
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
								 {"Customer_id": "2"}
			]
		};
		function onEditCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to verify edit group response').to.include.all.keys(['Status', 'opstatus']);
				expect(response.data.Status, 'to verify edit group status').to.equal("Success");
				expect(response.data.opstatus, 'to verify edit group opstatus').to.equal(0);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchCustCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				if (response.data.length > 0) {
					expect(response.data, 'to verify customer exist').to.have.length.above(0);
					expect(response.data[0], 'to verify fields in customer record').to.include.all.
								keys(['Customer_id', 'Status_id', 'Username', 'FullName', 'Email', 'UpdatedOn']);
					//removing customers if exists
					var removeCust = response.data.map(function (rec) {
							return {
								"Customer_id": rec.Customer_id
							}
						});
					editRequestParam.removedCustomerIds = removeCust;
				}
				groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.updateCustomerGroups", editRequestParam, onEditCompletion));
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchEntCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				if (response.data.length > 0) {
					expect(response.data, 'to verify entitlements exist').to.have.length.above(0);
					expect(response.data[0], 'to verify fields in entitlement record').to.include.all.
								keys(['Service_id', 'Group_id', 'Description', 'TransactionLimit_id', 'TransactionFee_id', 'Name']);
					//removing entitlements if exist
					var removeEnt = response.data.map(function (rec) {
							return {
								"Service_id": rec.Service_id,
								"Group_id": editRequestParam.Group_id,
							};
						});
					editRequestParam.removedEntitlementIds = removeEnt;
				}
				var inputParam = {
					"Group_id": editRequestParam.Group_id
				};
				groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.getGroupCustomers", inputParam, onFetchCustCompletion));
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to verify groups list exist').to.have.length.above(0);
				expect(response.data[0], 'to verify fields in group record').to.include.all.
							keys(['Customers_Count', 'Entitlements_Count', 'Group_Desc', 'Group_Name', 'Group_id', 'Status_id']);

				editRequestParam.Group_id = response.data[0].Group_id;
				editRequestParam.Name = response.data[0].Group_Name;
				editRequestParam.Description = response.data[0].Group_Desc;
				editRequestParam.Status_id = response.data[0].Status_id;
				var inputParam = {
					"Group_id": response.data[0].Group_id
				};
				groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.getEntitlements", inputParam, onFetchEntCompletion));

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
	
	TestCase_Groups_editGroup_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_editGroup_CH;
    
});
define([], function() {

  	function TestCase_Groups_searchCustomers(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_searchCustomers, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_searchCustomers.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var inputRequest = {
			"_searchType": "GROUP_SEARCH",
			"_name": "john",
			"_id": "john",
			"_username": "john",
			"_branchIDS": null,
			"_productIDS": null,
			"_cityIDS": null,
			"_entitlementIDS": null,
			"_groupIDS": null,
			"_customerStatus": null,
			"_before": null,
			"_after": null,
			"_pageOffset": "0",
			"_pageSize": 20,
			"_sortVariable": "name",
			"_sortDirection": "ASC"
		};
		function onFetchCompletion(viewModel) {
			try {
				if (viewModel) {
					if (viewModel.searchResult) {
						expect(viewModel.searchResult.opstatus, 'to verify opstatus code').to.equal(0);
						expect(viewModel.searchResult, 'to get search records').to.have.property('records');
						if (viewModel.searchResult.records.length > 0) {
							expect(viewModel.searchResult.records[0], 'to verify fields in customer record').to.include.all.
									keys(['id', 'FirstName', 'LastName', 'City_name', 'City_id', 'branch_name', 'customer_status', 'branch_id', 'Username']);
						}
						self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
					}
				}
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			command.context.onPresentForm('frmGroups', onFetchCompletion);
			groupsModule.presentationController.searchCustomers(inputRequest);
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_Groups_searchCustomers.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_searchCustomers;
    
});
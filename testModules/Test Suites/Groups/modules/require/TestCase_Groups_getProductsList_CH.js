define([], function() {

  	function TestCase_Groups_getProductsList_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_getProductsList_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_getProductsList_CH.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
		var self = this;
		var expect = chai.expect;
		var requestParam = {
			"Group_id": "GROUP_PLATINUM"
		};
		function onFetchCompletion(response) {
			try {
				expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data,'to verify response').to.include.all.keys(["product", "opstatus"]);
				expect(response.data.opstatus, 'to verify opstatus ').to.equal(0);
				if (response.data.product.length > 0) {
					expect(response.data.product, 'to verify products exist').to.have.length.above(0);
					expect(response.data.product[0], 'to verify fields in product record').to.include.all.
								keys(['Name', 'ProductCode', 'Status_id', 'id', 'Type_id', 'ProductFeatures']);
				}
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.getProductsList", {}, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_Groups_getProductsList_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_getProductsList_CH;
    
});
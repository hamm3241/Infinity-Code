define([], function() {

  	function TestCase_Groups_editGroupStatus_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_editGroupStatus_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_editGroupStatus_CH.prototype.execute = function(command){
        var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
        var self = this;
        var expect = chai.expect;
        var editStatusReqParam = {
        	"Group_id": "GROUP_PLATINUM",
        	"Status_id": "SID_INACTIVE",
        	"User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID
        };
        function onEditCompletion(response) {
        	try {
        		expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
        		expect(response.data, 'to verify update group status response').to.include.all.keys(['Status', 'opstatus']);
        		expect(response.data.Status, 'to verify update group status').to.equal("SUCCESS");
        		expect(response.data.opstatus, 'to verify update group opstatus').to.equal(0);
        		self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
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

        		editStatusReqParam.Group_id = response.data[0].Group_id;
        		editStatusReqParam.Status_id = response.data[0].Status_id === "SID_ACTIVE" ? "SID_INACTIVE" : "SID_ACTIVE";
        		groupsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerGroups.updateCustomerGroupStatus", editStatusReqParam, onEditCompletion));
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
	
	TestCase_Groups_editGroupStatus_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_editGroupStatus_CH;
    
});
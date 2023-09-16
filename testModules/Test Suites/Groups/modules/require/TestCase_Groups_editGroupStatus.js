define([], function() {

  	function TestCase_Groups_editGroupStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_editGroupStatus, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_editGroupStatus.prototype.execute = function(command){
      var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
      var self = this;
      var expect = chai.expect;
      var groupId = "";
      var editStatusReqParam = {
      	"Group_id": "GROUP_PLATINUM",
      	"Status_id": "SID_INACTIVE",
      	"User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID
      };
      function onUpdateStatusCompletion(viewModel) {
      	try {
      		if (viewModel) {
                if(viewModel.toast){
                     expect(viewModel.toast,'to verify toast message status').to.have.property('status',"success");
                }
      			if (viewModel.custGroupsList && viewModel.context === "") {
      				validateFetchResponse(viewModel);
      				var updatedRecord = viewModel.custGroupsList.find(function (rec) {
      						return editStatusReqParam.Group_id === rec.Group_id;
      					});
      				expect(updatedRecord, 'to verify the updated status').to.have.property('Status_id', editStatusReqParam.Status_id)
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
      				validateFetchResponse(viewModel);

      				editStatusReqParam.Group_id = viewModel.custGroupsList[0].Group_id;
      				editStatusReqParam.Status_id = viewModel.custGroupsList[0].Status_id === "SID_ACTIVE" ? "SID_INACTIVE" : "SID_ACTIVE";

      				command.context.onPresentForm('frmGroups', onUpdateStatusCompletion);
      				groupsModule.presentationController.updateStatusOfCustomerGroups(editStatusReqParam);
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
	
	TestCase_Groups_editGroupStatus.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_editGroupStatus;
    
});
define([], function() {

  	function TestCase_CustomerManagement_UpdateCustomerContactInfo(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_UpdateCustomerContactInfo, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_UpdateCustomerContactInfo.prototype.execute = function(command){
		var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var data={"ModifiedByName":"admin2","Customer_id":"1","PreferredContactMethod":"Call, Email","PreferredContactTime":"Morning, Afternoon"};
        function onCompletion(viewModel) {
            if(viewModel && viewModel.toastModel){
                try {
                expect(viewModel.toastModel, 'to get update status').to.include.keys("status","message");
                expect(viewModel.toastModel.status, 'to check if status changed successfully').to.equal("SUCCESS");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.editCustomerContactInfo(data);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_CustomerManagement_UpdateCustomerContactInfo.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_UpdateCustomerContactInfo;
    
});
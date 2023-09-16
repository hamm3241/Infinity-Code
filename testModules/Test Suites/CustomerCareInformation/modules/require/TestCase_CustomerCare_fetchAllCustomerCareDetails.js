define([], function() {

  	function TestCase_CustomerCare_fetchAllCustomerCareDetails(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerCare_fetchAllCustomerCareDetails, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerCare_fetchAllCustomerCareDetails.prototype.execute = function(command){
		var customerCareModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.contacts){
					expect(viewModel, 'to get customer care information').to.include.keys("contacts");
                expect(viewModel.contacts, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.contacts[0], 'for customer care information to have fields').to.include.keys(['Communication_Records','Service_Description', 'Service_Name', 'Service_SoftDeleteFlag', 'Service_Status_id','Service_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmCustomerCare', onCompletion);
            customerCareModule.presentationController.navigateTo('MasterDataModule','fetchAllCustomerCareDetails');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_CustomerCare_fetchAllCustomerCareDetails.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerCare_fetchAllCustomerCareDetails;
    
});
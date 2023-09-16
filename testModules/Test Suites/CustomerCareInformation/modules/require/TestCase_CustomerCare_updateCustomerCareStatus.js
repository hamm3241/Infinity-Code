define([], function() {

  	function TestCase_CustomerCare_updateCustomerCareStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerCare_updateCustomerCareStatus, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerCare_updateCustomerCareStatus.prototype.execute = function(command){
		var customerCareModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");
        var self = this;
        var expect = chai.expect;
        var inputParam = {"User_ID":"admin2","Status_id":"SID_INACTIVE","Service_id":"CUST_SERV_1","Service_Details":{"Status_id":"SID_INACTIVE"}};
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.contacts){
					expect(viewModel, 'to update customer care details').to.include.keys("contacts");
                expect(viewModel.contacts, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.contacts[0], 'for customer care to have fields').to.include.keys(['Communication_Records','Service_Description', 'Service_Name', 'Service_SoftDeleteFlag', 'Service_Status_id','Service_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
      function onFetchCompletion(viewModel){
   try{
               if(viewModel&&viewModel.contacts){
                    command.context.onPresentForm('frmCustomerCare', onCompletion);
                    customerCareModule.presentationController.updateCustomerCareStatus(inputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
        try {
            command.context.onPresentForm('frmCustomerCare', onFetchCompletion);
            customerCareModule.presentationController.navigateTo('MasterDataModule','fetchAllCustomerCareDetails');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_CustomerCare_updateCustomerCareStatus.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerCare_updateCustomerCareStatus;
    
});
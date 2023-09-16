define([], function() {

  	function TestCase_CustomerCare_editCustomerCareInfo(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerCare_editCustomerCareInfo, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerCare_editCustomerCareInfo.prototype.execute = function(command){
		var customerCareModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");
        var self = this;
        var expect = chai.expect;
        var inputParam = {
          "User_ID":"admin2",
          "Service_id":"c0a62e2b-eb10-4c57-a41b-4b4f4a6705bc",
          "Status_id":"SID_ACTIVE",
          "Service_Details":
          {
            "Name":"serv121",
           "Channel_id":"CH_ID_MOB_INT",
            "Status_id":"SID_ACTIVE"},
          "Communication_Records":
          [{"Priority":"1","Value":"1234567890","Type":"COMM_TYPE_PHONE","Status_id":"SID_ACTIVE","Extension":"ext1","Description":"1234567890 DESC","communicationID":"08f23bd2-b276-45c4-b2bc-137613af97be"},{"Priority":"1","Value":"abc@gmail.com","Type":"COMM_TYPE_EMAIL","Status_id":"SID_ACTIVE","Extension":"ext1","Description":"abc@gmail.com DESC","communicationID":"268140f5-86ea-4050-8764-d1fff415a80b"}]};
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.contacts){
					expect(viewModel, 'to insert customer care details').to.include.keys("contacts");
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
                    customerCareModule.presentationController.editCustomerCareInfo(inputParam);
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
	
	TestCase_CustomerCare_editCustomerCareInfo.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerCare_editCustomerCareInfo;
    
});
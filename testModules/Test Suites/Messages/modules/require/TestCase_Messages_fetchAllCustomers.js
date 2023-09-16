define([], function() {

  	function TestCase_Messages_fetchAllCustomers(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchAllCustomers, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchAllCustomers.prototype.execute = function(command){
        var CSRModule =  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.customers){
					expect(viewModel, 'to get messages').to.include.keys("customers");
                expect(viewModel.customers, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.customers[0], 'for Roles to have fields').to.include.keys(['customer_FirstName','customer_Gender', 'customer_LastName', 'customer_MiddleName', 'customer_Salutation','customer_Username','customer_id','customercommunication_Value']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmCSR', onCompletion);
            CSRModule.presentationController.navigateTo('CSRModule','fetchAllCustomers');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Messages_fetchAllCustomers.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchAllCustomers;
    
});
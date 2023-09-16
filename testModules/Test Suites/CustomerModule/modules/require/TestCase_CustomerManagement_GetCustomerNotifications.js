define([], function() {

  	function TestCase_CustomerManagement_GetCustomerNotifications(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCustomerNotifications, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCustomerNotifications.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var reqParam = {customerID : "1"};
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.CustomerNotifications ){
                    expect(viewModel.CustomerNotifications,'to verify customer notifications list length').to.have.length.above(0);
                    expect(viewModel.CustomerNotifications[0], 'to verify fields in customer notifications record').to.include.all.
                      keys(['Name', 'ExpirationDate', 'StartDate','Status_id','isread','Description']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
            customerModule.presentationController.getCustomerNotifications(reqParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_CustomerManagement_GetCustomerNotifications.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCustomerNotifications;
    
});
define([], function() {

  	function TestCase_CustomerManagement_GetTravelNotifications(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetTravelNotifications, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetTravelNotifications.prototype.execute = function(command){
		var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var data={"Username":"konyolbuser"};

        function onCompletion(viewModel) {
            if(viewModel && viewModel.TravelNotifications){
                try {
                expect(viewModel.TravelNotifications, 'to get travel notifications').to.include.keys("TravelRequests");
                expect(viewModel.TravelNotifications.TravelRequests, 'to have more than 0 records ').to.have.length.above(0);
                expect(viewModel.TravelNotifications.TravelRequests[0], 'for notification to have fields').to.include.keys(['endDate','additionalNotes','cardCount','cardNumber','contactNumber','destinations','notificationId','startDate','status']);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getTravelNotifications(data);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	TestCase_CustomerManagement_GetTravelNotifications.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetTravelNotifications;
    
});
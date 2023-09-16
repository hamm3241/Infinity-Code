define([], function() {
   function TestCase_CustomerManagement_CancelTravelNotifications(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
 
    inheritsFrom(TestCase_CustomerManagement_CancelTravelNotifications, kony.mvc.Business.CommandHandler);
  
   TestCase_CustomerManagement_CancelTravelNotifications.prototype.execute = function(command){
  var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
		var cancelResponse = {"notificationId":"","username":"konyolbuser"};
     	var cust_id={"Username":"konyolbuser"};
     	function validateGetTravelNotification(viewModel){
		   try{
					   if(viewModel){
						 if(viewModel.TravelNotifications ){
			 				expect(viewModel.TravelNotifications.opstatus,'to verify opstatus').to.equal(0);
							expect(viewModel.TravelNotifications.TravelRequests,'to verify travel notification list length').to.have.length.above(0);
							expect(viewModel.TravelNotifications.TravelRequests[0], 'to verify fields in trvael Notification record').to.include.all.
							  keys(['startDate', 'endDate', 'notificationId','status','contactNumber','destinations']);
                           return true;
						 }
					  }
		   }catch(e){
			self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		   }
		  }
		function onUpdateCompletion(viewModel){
		   if(validateGetTravelNotification(viewModel)){
		   var rec = (viewModel.TravelNotifications.TravelRequests).filter(function (record) {
			if (record.notificationId === cancelResponse.notificationId)
			 return record;
		   });
		   try {
			expect(rec, 'to verify updated status').to.have.property('status', "Cancelled");
			self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
		   } catch (e) {
			self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		   }
           }
		}
		function onFetchCompletion(viewModel){
		  if(validateGetTravelNotification(viewModel)){
          if(viewModel&&viewModel.TravelNotifications){
		   var activeNotf = (viewModel.TravelNotifications.TravelRequests).filter(function (record) {
			if (record.status === "Active")
			 return record;
		   });
		   if (activeNotf.length > 0) {
			cancelResponse.notificationId = activeNotf[0].notificationId;
			try {
			 command.context.onPresentForm('frmCustomerManagement', onUpdateCompletion);
			 customerModule.presentationController.cancelNotification(cancelResponse);
			} catch (e) {
			 this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		   }
		}
        }
        }
	  try {
				command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
				customerModule.presentationController.getTravelNotifications(cust_id);
			} catch (e) {
				this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
    };
 
 TestCase_CustomerManagement_CancelTravelNotifications.prototype.validate = function(){
  
    };
    
    return TestCase_CustomerManagement_CancelTravelNotifications;
    
});

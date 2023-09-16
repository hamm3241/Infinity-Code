define([], function() {

  	function TestCase_ServicesManagement_UpdateStatusOfService(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_UpdateStatusOfService, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_UpdateStatusOfService.prototype.execute = function(command){
		var servicesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServicesManagementModule");
        var self = this;
        var expect = chai.expect;
		var editInputParam={"id":"","Status_id":"","User_id":"UID11",};
        function onUpdateCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to get update status').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if status changed successfully').to.equal("success");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
		  function onFetchCompletion(viewModel){
			try{
               if(viewModel&&viewModel.servicesList){
                    command.context.onPresentForm('frmServiceManagement', onUpdateCompletion);
					editInputParam.Service_id=viewModel.servicesList[0].id;
                 	editInputParam.Status_id=viewModel.servicesList[0].Status_id==="SID_ACTIVE"?"SID_INACTIVE":"SID_ACTIVE";
                    servicesModule.presentationController.updateStatusOfService(editInputParam);
              }
         }catch(e){
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
         }
        }
        try {
            command.context.onPresentForm('frmServiceManagement',onFetchCompletion);
            servicesModule.presentationController.navigateTo('ServicesManagementModule','fetchAllServices');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_ServicesManagement_UpdateStatusOfService.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_UpdateStatusOfService;
    
});
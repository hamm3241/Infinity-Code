define([], function() {

  	function TestCase_OutageMessages_UpdateStatusOutageMessage(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_OutageMessages_UpdateStatusOutageMessage, kony.mvc.Business.CommandHandler);
  
  	TestCase_OutageMessages_UpdateStatusOutageMessage.prototype.execute = function(command){
		var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("OutageMessageModule");
        var self = this;
        var expect = chai.expect;
		var editInputParam=[{"id":"","Status_id":"","Service_id":"","MessageText":"","modifiedby":"kony"}];
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
               if(viewModel&&viewModel.outageMessageList){
                    command.context.onPresentForm('frmOutageMessage', onUpdateCompletion);
					editInputParam[0].id=viewModel.outageMessageList[0].id;
                 	editInputParam[0].Status_id=viewModel.outageMessageList[0].Status_id==="SID_ACTIVE"?"SID_INACTIVE":"SID_ACTIVE";
                 	editInputParam[0].Service_id=viewModel.outageMessageList[0].Service_id;
                    messagesModule.presentationController.updateStatusOutageMessage(editInputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
        try {
            command.context.onPresentForm('frmOutageMessage',onFetchCompletion);
            messagesModule.presentationController.navigateTo('OutageMessageModule','fetchOutageMessage');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_OutageMessages_UpdateStatusOutageMessage.prototype.validate = function(){
		
    };
    
    return TestCase_OutageMessages_UpdateStatusOutageMessage;
    
});
define([], function() {

  	function TestCase_OutageMessages_DeleteOutageMessage(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_OutageMessages_DeleteOutageMessage, kony.mvc.Business.CommandHandler);
  
  	TestCase_OutageMessages_DeleteOutageMessage.prototype.execute = function(command){
		var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("OutageMessageModule");
        var self = this;
        var expect = chai.expect;
		var deleteInputParam=[{"id":""}];
        function onDeleteCompletion(viewModel) {
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
                 	expect(viewModel.outageMessageList, 'to get more than zero').to.have.length.above(0);
                    command.context.onPresentForm('frmOutageMessage', onDeleteCompletion);
					deleteInputParam[0].id=viewModel.outageMessageList[viewModel.outageMessageList.length-1].id;
                    messagesModule.presentationController.deleteOutageMessage(deleteInputParam);
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
	
	TestCase_OutageMessages_DeleteOutageMessage.prototype.validate = function(){
		
    };
    
    return TestCase_OutageMessages_DeleteOutageMessage;
    
});
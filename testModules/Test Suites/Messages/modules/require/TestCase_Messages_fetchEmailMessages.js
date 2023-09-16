define([], function() {

  	function TestCase_Messages_fetchEmailMessages(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchEmailMessages, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchEmailMessages.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
        var requestIDParam = {"requestID":"REC023725"};
        var msgStatus = "SID_ARCHIVED";
        var requestId = "REC023725";
        var subject = "Communication Information Change";
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.emailMessages){
					expect(viewModel, 'to get Messages').to.include.keys(["emailMessages","msgStatus","requestId","subject"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        function onFetchCompletion(viewModel){
   try{
               if(viewModel){
                    command.context.onPresentForm('frmCSR', onCompletion);
                    CSRModule.presentationController.fetchEmailMessages(requestIDParam,msgStatus,requestId,subject);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
        try {
            command.context.onPresentForm('frmCSR', onFetchCompletion);
            CSRModule.presentationController.navigateTo('CSRModule','showCSR');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Messages_fetchEmailMessages.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchEmailMessages;
    
});
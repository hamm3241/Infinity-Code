define([], function() {

  	function TestCase_Messages_discardMessage(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_discardMessage, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_discardMessage.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
      var input = {
          "isDiscardRequest":true,
          "isNewRequest":false,
          "messagestatus":"DISCARD",
          "requestid":"",
          "requestmessage_id":""
        };
      function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.message){
					expect(viewModel, 'to get Messages').to.include.keys(["message"]);
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
                    CSRModule.presentationController.discardMessage(input);
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
	
	TestCase_Messages_discardMessage.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_discardMessage;
    
});
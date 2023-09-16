define([], function() {

  	function TestCase_OutageMessages_getOutageMessages(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_OutageMessages_getOutageMessages, kony.mvc.Business.CommandHandler);
  
  	TestCase_OutageMessages_getOutageMessages.prototype.execute = function(command){
		var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("OutageMessageModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.outageMessageList){
                expect(viewModel, 'to get outage messages').to.include.keys("outageMessageList");
                expect(viewModel.outageMessageList, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.outageMessageList[0], 'for messages to have fields').to.include.keys(['MessageText','Name','Service_id','Status_id','id','service_Status_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmOutageMessage',onCompletion);
            messagesModule.presentationController.navigateTo('OutageMessageModule','fetchOutageMessage');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_OutageMessages_getOutageMessages.prototype.validate = function(){
		
    };
    
    return TestCase_OutageMessages_getOutageMessages;
    
});
define([], function() {

  	function TestCase_Messages_fetchAssignedToUser(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchAssignedToUser, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchAssignedToUser.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.requests && viewModel.users){
					expect(viewModel, 'to get assigned users').to.include.keys(["requests","users"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmCSR', onCompletion);
            CSRModule.presentationController.navigateTo('CSRModule','fetchAssignedToUser');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Messages_fetchAssignedToUser.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchAssignedToUser;
    
});
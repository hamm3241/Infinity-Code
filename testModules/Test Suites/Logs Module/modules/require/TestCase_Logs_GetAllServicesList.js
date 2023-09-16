define([], function() {

  	function TestCase_Logs_GetAllServicesList(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetAllServicesList, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetAllServicesList.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.servicesList){
				expect(viewModel.servicesList, 'to get servcies more than zero').to.have.length.above(0);
                expect(viewModel.servicesList[0], 'to have fields').to.include.keys("id","Name");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchAllServicesList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetAllServicesList.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetAllServicesList;
    
});
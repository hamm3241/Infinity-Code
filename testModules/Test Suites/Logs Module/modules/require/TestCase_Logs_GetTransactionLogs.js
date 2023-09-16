define([], function() {

  	function TestCase_Logs_GetTransactionLogs(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetTransactionLogs, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetTransactionLogs.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;
		var inputParam=[{"FilterData":{"StartDate":"06/06/2018","EndDate":"06/06/2018","ServiceName":"Select service"}}];
        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.transactionLogsData){
                expect(viewModel.transactionLogsData, 'to get logs').to.include.keys("logs","count","page","pageSize");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchTransactionLogs',inputParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetTransactionLogs.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetTransactionLogs;
    
});
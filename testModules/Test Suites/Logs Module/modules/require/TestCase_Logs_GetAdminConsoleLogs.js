define([], function() {

  	function TestCase_Logs_GetAdminConsoleLogs(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetAdminConsoleLogs, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetAdminConsoleLogs.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;
		var inputParam=[{"FilterData":{"StartDate":"06/06/2018","EndDate":"06/06/2018"}}];
        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.adminConsoleLogsData){
                expect(viewModel.adminConsoleLogsData, 'to get logs').to.include.keys("logs","count");
                expect(viewModel.adminConsoleLogsData.logs[0], 'to get filter data').to.include.keys("description","event","id","logType","moduleName","status","userRole","username");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchAdminConsoleLogs',inputParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetAdminConsoleLogs.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetAdminConsoleLogs;
    
});
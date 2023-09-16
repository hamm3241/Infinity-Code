define([], function() {

  	function TestCase_Logs_GetCustomerActivityLogs(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetCustomerActivityLogs, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetCustomerActivityLogs.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;
		var inputParam=[{"FilterData":{"userName":"konyolbuser","id":"1","isMemberActivity":true,"noOfRecords":"10","startDate":"05/31/2016 ","endDate":" 05/31/2018","sortDirection":"desc"}}];
        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.records){
                expect(viewModel, 'to get logs').to.include.keys("records","count","page","pageSize");
                expect(viewModel.records[0], 'to get filter data').to.include.keys("activityType","browser","channel","deviceId","errorCode","id","ipAddress","logType","referenceId","sessionId","username");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchCustomerActivityLogs',inputParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetCustomerActivityLogs.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetCustomerActivityLogs;
    
});
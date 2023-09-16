define([], function() {

  	function TestCase_Logs_CreateFilter(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_CreateFilter, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_CreateFilter.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;
		var inputParam=[{"FilterData":{"LogType":"Transactional","ViewName":"Testing filter","Description":"Optional description","ViewData":{"type":"SERVICE_ID_1","amount":"5000-10000","date":"05/09/2018 - 06/07/2018","range":"Last 30 days"}}}];
        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.filtersData){
                expect(viewModel.filtersData, 'to get logs').to.include.keys("operationRecord","operationStatusCodeParam","operationStatusParam");
                //expect(viewModel.filtersData.logs[0], 'to get filter data').to.include.keys("description","event","id","logType","moduleName","status","userRole","username");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','saveFilter',inputParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_CreateFilter.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_CreateFilter;
    
});
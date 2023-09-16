define([], function() {

  	function TestCase_Logs_GetAllFilters(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetAllFilters, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetAllFilters.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.filtersData){
                expect(viewModel.filtersData, 'to get filters').to.include.keys("AdmincConsoleCount","TransactionalCount","CustomerActivityCount","FilterData");
                expect(viewModel.filtersData.FilterData[0], 'to get filter data').to.include.keys("Description","ViewData","LogType","id","Name");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchAllFilters');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetAllFilters.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetAllFilters;
    
});
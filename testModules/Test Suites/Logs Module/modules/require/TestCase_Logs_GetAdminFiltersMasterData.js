define([], function() {

  	function TestCase_Logs_GetAdminFiltersMasterData(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetAdminFiltersMasterData, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetAdminFiltersMasterData.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.filtersData){
                expect(viewModel.filtersData, 'to get services').to.include.keys("Events","ModuleNames","Roles","Status");
                expect(viewModel.filtersData.Events, 'to get account types more than zero').to.have.length.above(0);
				expect(viewModel.filtersData.ModuleNames, 'to get channel list names more than zero').to.have.length.above(0);
                expect(viewModel.filtersData.Status,'to get status list more than zero').to.have.length.above(0);
				expect(viewModel.filtersData.Roles, 'to get type list more than zero').to.have.length.above(0);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchAdminFiltersMasterData');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetAdminFiltersMasterData.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetAdminFiltersMasterData;
    
});
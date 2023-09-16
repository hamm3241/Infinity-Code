define([], function() {

  	function TestCase_Logs_GetCustomerActivityMasterData(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_GetCustomerActivityMasterData, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_GetCustomerActivityMasterData.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.adminActivities&&viewModel.roles){
                expect(viewModel.adminActivities, 'to get admin activities more than zero').to.have.length.above(0);
				expect(viewModel.roles, 'to get roles more than zero').to.have.length.above(0);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmLogs',onCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchCustomerActivityMasterData');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_GetCustomerActivityMasterData.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_GetCustomerActivityMasterData;
    
});
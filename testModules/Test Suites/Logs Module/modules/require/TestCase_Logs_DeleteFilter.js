define([], function() {

  	function TestCase_Logs_DeleteFilter(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Logs_DeleteFilter, kony.mvc.Business.CommandHandler);
  
  	TestCase_Logs_DeleteFilter.prototype.execute = function(command){
		var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");
        var self = this;
        var expect = chai.expect;
		var inputParam={"view_ID":""};
        function onDeleteCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.filtersData){
                expect(viewModel.filtersData.opstatus, 'to delete a filter successfully').to.equal(0);
                //expect(viewModel.filtersData.logs[0], 'to get filter data').to.include.keys("description","event","id","logType","moduleName","status","userRole","username");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
		function onFetchCompletion(viewModel){
			try{
               if(viewModel&&viewModel.filtersData&&viewModel.filtersData.FilterData){
                expect(viewModel.filtersData, 'to get filters').to.include.keys("AdmincConsoleCount","TransactionalCount","CustomerActivityCount","FilterData");
                command.context.onPresentForm('frmLogs', onDeleteCompletion);
				inputParam.view_ID=viewModel.filtersData.FilterData[0].id;
                logsModule.presentationController.deleteFilter(inputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
        try {
            command.context.onPresentForm('frmLogs',onFetchCompletion);
            logsModule.presentationController.navigateTo('LogsModule','fetchAllFilters');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Logs_DeleteFilter.prototype.validate = function(){
		
    };
    
    return TestCase_Logs_DeleteFilter;
    
});
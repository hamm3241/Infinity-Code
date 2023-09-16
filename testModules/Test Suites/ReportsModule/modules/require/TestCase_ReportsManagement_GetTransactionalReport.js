define([], function() {

  	function TestCase_ReportsManagement_GetTransactionalReport(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ReportsManagement_GetTransactionalReport, kony.mvc.Business.CommandHandler);
  
  	TestCase_ReportsManagement_GetTransactionalReport.prototype.execute = function(command){
		var reportsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ReportsManagementModule");
        var self = this;
        var expect = chai.expect;
		var param={"startDate":"05/24/2018","endDate":"05/24/2018"};
        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.transactionalReport){
                expect(viewModel.transactionalReport, 'to get transactional report more than zero').to.have.length.above(0);
				expect(viewModel.transactionalReport[0], 'for transactional reports to have fields').to.include.keys(["channel","serviceName","transactionDate","value","volume"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmReportsManagement',onCompletion);
            reportsModule.presentationController.navigateTo('ReportsManagementModule','getTransactionalReport',[param]);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_ReportsManagement_GetTransactionalReport.prototype.validate = function(){
		
    };
    
    return TestCase_ReportsManagement_GetTransactionalReport;
    
});
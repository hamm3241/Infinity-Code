define([], function() {

  	function TestCase_ReportsManagement_ShowReportTabs(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ReportsManagement_ShowReportTabs, kony.mvc.Business.CommandHandler);
  
  	TestCase_ReportsManagement_ShowReportTabs.prototype.execute = function(command){
		var reportsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ReportsManagementModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.reportsInfo){
                expect(viewModel.reportsInfo, 'to get services').to.include.keys("category","csrNames");
                expect(viewModel.reportsInfo.category, 'to get reports categories more than zero').to.have.length.above(0);
				expect(viewModel.reportsInfo.csrNames, 'to get reports CSR names more than zero').to.have.length.above(0);
                expect(viewModel.reportsInfo.category[0], 'for category to have fields').to.include.keys(["id","name"]);
				expect(viewModel.reportsInfo.csrNames[0], 'for CSR names to have fields').to.include.keys(["id","name"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmReportsManagement',onCompletion);
            reportsModule.presentationController.navigateTo('ReportsManagementModule','showReportTabs');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_ReportsManagement_ShowReportTabs.prototype.validate = function(){
		
    };
    
    return TestCase_ReportsManagement_ShowReportTabs;
    
});
define([], function() {

  	function TestCase_ReportsManagement_GetMessagesReport(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ReportsManagement_GetMessagesReport, kony.mvc.Business.CommandHandler);
  
  	TestCase_ReportsManagement_GetMessagesReport.prototype.execute = function(command){
		var reportsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ReportsManagementModule");
        var self = this;
        var expect = chai.expect;
		var param={"user_ID":"UID11","startDate":"05/24/2018","endDate":"05/24/2018","category":"RCID_ATM","csrName":"UID11"};
        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.messagesReport){
                expect(viewModel.messagesReport, 'to get services').to.include.keys("messages","threads");
                expect(viewModel.messagesReport.messages, 'to get messages more than zero').to.have.length.above(0);
				expect(viewModel.messagesReport.threads, 'to get threads more than zero').to.have.length.above(0);
                expect(viewModel.messagesReport.messages[0], 'for messages to have fields').to.include.keys(["name","value"]);
				expect(viewModel.messagesReport.threads[0], 'for threads to have fields').to.include.keys(["value","name"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmReportsManagement',onCompletion);
            reportsModule.presentationController.navigateTo('ReportsManagementModule','getMessagesReport',[param]);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_ReportsManagement_GetMessagesReport.prototype.validate = function(){
		
    };
    
    return TestCase_ReportsManagement_GetMessagesReport;
    
});
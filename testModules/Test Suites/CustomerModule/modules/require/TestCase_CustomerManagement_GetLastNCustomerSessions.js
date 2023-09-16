define([], function () {

    function TestCase_CustomerManagement_GetLastNCustomerSession(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetLastNCustomerSession, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetLastNCustomerSession.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var data={"customerUsername":"konyolbuser"};

        function onCompletion(viewModel) {
            if(viewModel && viewModel.CustomerSessions){
                try {
                expect(viewModel, 'to get sessions list').to.include.keys("CustomerSessions");
                expect(viewModel.CustomerSessions[0], 'to get customer sessions list').to.include.keys([ 'channel','deviceId','endDate','numberOfActivities','sessionId','startDate']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getLastNCustomerSessions(data);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_GetLastNCustomerSession.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetLastNCustomerSession;

});
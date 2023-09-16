define([], function () {

    function TestCase_CustomerManagement_GetAllActivitiesInACustomerSession(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetAllActivitiesInACustomerSession, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetAllActivitiesInACustomerSession.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionOfSessionFetch);
            customer.presentationController.getLastNCustomerSessions({"customerUsername":"konyolbuser"});
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionOfSessionFetch(viewModel) {
              try {
              	if(viewModel.CustomerSessions&&viewModel.CustomerSessions.length)
              	{
              	var data={"sessionId":viewModel.CustomerSessions[0].sessionId};
              	command.context.onPresentForm('frmCustomerManagement', onCompletion);
                customer.presentationController.getAllActivitiesInACustomerSession(data);
              	}
                 //self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
        }

        function onCompletion(viewModel) {
            if(viewModel && viewModel.CustomerSessionActivities){
                try {
                expect(viewModel, 'to get list of activities in a session').to.include.keys("CustomerSessionActivities");
                expect(viewModel.CustomerSessionActivities[0], 'to get activities in a session').to.include.keys(['activityType', 'channel','deviceId','eventts','id','sessionId','status','username']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
    
    };

    TestCase_CustomerManagement_GetAllActivitiesInACustomerSession.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetAllActivitiesInACustomerSession;

});
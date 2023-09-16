define([], function () {

    function TestCase_CustomerManagement_GetLastNCustomerSessions_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetLastNCustomerSessions_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetLastNCustomerSessions_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var data={"username":"konyolbuser","sessionCount":"4"};

        function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'to have success operation ').to.include.keys("OperationStatus");
                  expect(response.data.OperationStatus).to.equal("Success");
                  expect(response.data, 'success of fetch of last n sessions List').to.include.keys("records");
                  expect(response.data.records[0], 'for sessions to have fields').to.include.keys([ 'channel','deviceId','endDate','numberOfActivities','sessionId','startDate']);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.GetLastNCustomerSessions",data, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetLastNCustomerSessions_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetLastNCustomerSessions_CH;

});
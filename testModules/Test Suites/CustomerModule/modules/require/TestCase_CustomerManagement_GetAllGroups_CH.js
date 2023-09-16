define([], function () {

    function TestCase_CustomerManagement_GetAllGroups_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetAllGroups_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetAllGroups_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        
        function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of groups List ').to.include.keys("membergroup");
                  expect(response.data.membergroup[0], 'for group to have fields').to.include.keys(['Name', 'Status_id','id']);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getAllGroups",{}, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetAllGroups_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetAllGroups_CH;

});
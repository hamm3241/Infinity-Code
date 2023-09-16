define([], function () {

    function TestCase_SecurityQuestions_GetSecurityQuestions_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_GetSecurityQuestions_CH, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_GetSecurityQuestions_CH.prototype.execute = function (command) {
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(response) {
                try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'to get security questions').to.include.keys("records");
                  expect(response.data.records[0], 'for security questions to have fields').to.include.keys(['SecurityQuestion', 'SecurityQuestion_Status', 'SecurityQuestion_id','UserCount']);
                 self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
             securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.getSecurityQuestions",{}, onCompletion));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_SecurityQuestions_GetSecurityQuestions_CH.prototype.validate = function () {

    };

    return TestCase_SecurityQuestions_GetSecurityQuestions_CH;

});
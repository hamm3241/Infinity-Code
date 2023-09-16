define([], function () {

    function TestCase_SecurityQuestions_CreateSecurityQuestion_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_CreateSecurityQuestion_CH, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_CreateSecurityQuestion_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
        var data={"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                  "SecurityQuestionsList":[{
                                        "Question":"dummy question 3 added for testing",
                                        "Status_id":"SID_ACTIVE",
                }]};

        function onCompletionOfCreate(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of creation of question ').to.include.keys("Successful Insert Count");
                  expect(response.data['Successful Insert Count']).to.equal("1");
                  expect(response.data, 'success of creation of question ').to.include.keys("Failed Insert Count");
                  expect(response.data['Failed Insert Count']).to.equal("0");
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.addSecurityQuestions",data, onCompletionOfCreate));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_SecurityQuestions_CreateSecurityQuestion_CH.prototype.validate = function () {};

    return TestCase_SecurityQuestions_CreateSecurityQuestion_CH;

});
define([], function () {

    function TestCase_SecurityQuestions_DeleteSecurityQuestion_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_DeleteSecurityQuestion_CH, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_DeleteSecurityQuestion_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

        function onCompletionOfFetch(response) {
            if(response.data.opstatus===0 ){
                try {
               var finalData = {
                  user_ID: kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                  "id": response.data.records[0].SecurityQuestion_id,
                };
              securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.deleteSecurityQuestions",finalData, onCompletionOfDelete));
           } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        function onCompletionOfDelete(response) {
            try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of deletion of question ').to.include.keys("deletedRecords");
                  expect(response.data.deletedRecords).to.equal(1);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
         try {
             securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.getSecurityQuestions",{}, onCompletionOfFetch));
          } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

    };
    TestCase_SecurityQuestions_DeleteSecurityQuestion_CH.prototype.validate = function () {};

    return TestCase_SecurityQuestions_DeleteSecurityQuestion_CH;

});
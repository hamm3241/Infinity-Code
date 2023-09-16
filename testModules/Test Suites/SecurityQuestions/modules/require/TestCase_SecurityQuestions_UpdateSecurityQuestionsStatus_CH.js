define([], function () {

    function TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus_CH, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var data,id,status;
       //testUtils.setCommand(command, self.sendResponse);
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
        

        function onCompletionOfFetch(response) {
            if(response.data.opstatus===0 ){
                try {
               data=response.data.records[0];
               id=response.data.records[0].SecurityQuestion_id;
               if(response.data.records[0].SecurityQuestion_Status==="SID_ACTIVE") status="SID_INACTIVE";
               else status="SID_ACTIVE";
               var finalData = {
                  user_ID: kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                  "id": id,
                  "status_ID": status
                };
               securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.editSecurityQuestions",finalData, onCompletionOfEdit));
         
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        function onCompletionOfEdit(response) {
          try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of status change ').to.include.keys("updatedRecords");
                  expect(response.data.updatedRecords).to.equal(1);
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

    TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus_CH.prototype.validate = function () {};

    return TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus_CH;

});
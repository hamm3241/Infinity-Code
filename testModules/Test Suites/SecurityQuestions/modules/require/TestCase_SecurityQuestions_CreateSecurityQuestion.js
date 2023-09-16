define([], function () {

    function TestCase_SecurityQuestions_CreateSecurityQuestion(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_CreateSecurityQuestion, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_CreateSecurityQuestion.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
        var data={"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                  "SecurityQuestionsList":[{
                                        "Question":"dummy question 1 added for testing",
                                        "Status_id":"SID_ACTIVE",
                },{
                                        "Question":"dummy question 2 added for testing",
                                        "Status_id":"SID_INACTIVE",
                }]};

        function onCompletionOfCreate(viewModel) {
          if(viewModel && viewModel.action==='addedNewQuestions'){
               try {
                   //expect(viewModel.action).to.equal('addedNewQuestions');
                  // expect(viewModel.opStatusCode,'status to be success').to.equal(0);
                   self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
        }
         try {
            command.context.onPresentForm('frmSecurityQuestions', onCompletionOfCreate);
            securityModule.presentationController.addNewSecurityQuestion(data);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

    };

    TestCase_SecurityQuestions_CreateSecurityQuestion.prototype.validate = function () {};

    return TestCase_SecurityQuestions_CreateSecurityQuestion;

});
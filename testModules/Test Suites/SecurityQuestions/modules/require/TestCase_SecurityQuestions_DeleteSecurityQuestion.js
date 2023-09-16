define([], function () {

    function TestCase_SecurityQuestions_DeleteSecurityQuestion(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_DeleteSecurityQuestion, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_DeleteSecurityQuestion.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

        function onCompletionOfFetch(viewModel) {
            if(viewModel && viewModel.questions){
                try {
               var finalData = {
                  user_ID: kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                  "id": viewModel.questions[0].SecurityQuestion_id,
                };
               command.context.onPresentForm('frmSecurityQuestions', onCompletionOfDelete);
               securityModule.presentationController.deleteSecurityQuestion(finalData);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        function onCompletionOfDelete(viewModel) {
           if(viewModel && viewModel.action==='deletedSuccesfull'){
            try {
                 //expect(viewModel.action).to.equal('deletedSuccesfull');
                 //expect(viewModel.opStatusCode,'status to be success').to.equal(0);  
                 self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }
        }
         try {
            command.context.onPresentForm('frmSecurityQuestions', onCompletionOfFetch);
            securityModule.presentationController.navigateTo('SecurityModule','fetchAllSecurityQuestions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

    };
    TestCase_SecurityQuestions_DeleteSecurityQuestion.prototype.validate = function () {};

    return TestCase_SecurityQuestions_DeleteSecurityQuestion;

});
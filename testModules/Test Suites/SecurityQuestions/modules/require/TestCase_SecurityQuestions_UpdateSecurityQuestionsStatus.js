define([], function () {

    function TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var data,id,status;
       //testUtils.setCommand(command, self.sendResponse);
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
        

        function onCompletionOfFetch(viewModel) {
            if(viewModel && viewModel.questions){
                try {
               data=viewModel.questions[0];
               id=viewModel.questions[0].SecurityQuestion_id;
               if(viewModel.questions[0].SecurityQuestion_Status==="SID_ACTIVE") status="SID_INACTIVE";
               else status="SID_ACTIVE";
               var finalData = {
                  user_ID: kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                  "id": id,
                  "status_ID": status
                };
               command.context.onPresentForm('frmSecurityQuestions', onCompletionOfEdit);
               securityModule.presentationController.editSecurityQuestion(finalData);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        function onCompletionOfEdit(viewModel) {
           if(viewModel && viewModel.action==='changedStatus'){
            try {
                 //expect(viewModel).to.have.property('action');
                 expect(viewModel).to.have.property('isActive');
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

    TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus.prototype.validate = function () {};

    return TestCase_SecurityQuestions_UpdateSecurityQuestionsStatus;

});
define([], function () {

    function TestCase_SecurityQuestions_GetSecurityQuestions(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_SecurityQuestions_GetSecurityQuestions, kony.mvc.Business.CommandHandler);

    TestCase_SecurityQuestions_GetSecurityQuestions.prototype.execute = function (command) {
        var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            if(viewModel && viewModel.questions){
                try {

                expect(viewModel, 'to get security questions').to.include.keys("questions");
                expect(viewModel.questions, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.questions[0], 'for security questions to have fields').to.include.keys(['SecurityQuestion', 'SecurityQuestion_Status', 'SecurityQuestion_id','UserCount']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmSecurityQuestions', onCompletion);
            securityModule.presentationController.navigateTo('SecurityModule','fetchAllSecurityQuestions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_SecurityQuestions_GetSecurityQuestions.prototype.validate = function () {

    };

    return TestCase_SecurityQuestions_GetSecurityQuestions;

});
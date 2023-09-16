define([], function () {

    function TestCase_TermsAndCond_GetTermsAndCond(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_TermsAndCond_GetTermsAndCond, kony.mvc.Business.CommandHandler);

    TestCase_TermsAndCond_GetTermsAndCond.prototype.execute = function(command) {
        var termsAndCondModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsModule");
        var self = this;
        var expect = chai.expect;
        
         try {
            command.context.onPresentForm('frmTermsAndConditions', onCompletion);
            termsAndCondModule.presentationController.navigateTo('TermsAndConditionsModule', 'fetchTermsConditions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletion(viewModel) {
        
        if(viewModel && viewModel.termsAndConditionsViewModel){
            try {
                expect(viewModel, 'to get terms and cond').to.include.keys("termsAndConditionsViewModel");
                expect(viewModel.termsAndConditionsViewModel, 'to get terms and cond').to.include.keys("termsAndConditions");
                expect(viewModel.termsAndConditionsViewModel.termsAndConditions, 'for T&C to have fields').to.include.keys(["Description", "createdby", "Status_id", "id", "synctimestamp", "createdts", "softdeleteflag"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
            }
        }
       
    };
    
    return TestCase_TermsAndCond_GetTermsAndCond;
});


define([], function() {

  	function TestCase_TermsAndCond_deleteTermsAndCond(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_TermsAndCond_deleteTermsAndCond, kony.mvc.Business.CommandHandler);
  
  	TestCase_TermsAndCond_deleteTermsAndCond.prototype.execute = function(command){
		var termsAndCondModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsModule");
        var self = this;
        var expect = chai.expect;
       
        
        try {
            command.context.onPresentForm('frmTermsAndConditions', onCompletionFetch);
            termsAndCondModule.presentationController.navigateTo('TermsAndConditionsModule', 'fetchTermsConditions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionFetch(viewModel) {
            if (viewModel && viewModel.termsAndConditionsViewModel) {
                try {
                    expect(viewModel, 'to get terms and cond').to.include.keys("termsAndConditionsViewModel");
                    expect(viewModel.termsAndConditionsViewModel, 'to get terms and cond').to.include.keys("termsAndConditions");
                    expect(viewModel.termsAndConditionsViewModel.termsAndConditions, 'for T&C to have fields').to.include.keys(["Description", "createdby", "id"]);
                    var data = {
                        "id": viewModel.termsAndConditionsViewModel.termsAndConditions.id,
                        user_ID: viewModel.termsAndConditionsViewModel.termsAndConditions.createdby
                    };
                   
                        command.context.onPresentForm('frmTermsAndConditions', onCompletionDelete);
                        termsAndCondModule.presentationController.deleteTermsAndConditions(data);
                   
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }

        function onCompletionDelete(viewModel) {
            if (viewModel && viewModel.toastModel) {
                try {
                    expect(viewModel, 'to delete terms and cond').to.include.keys("toastModel");
                    expect(viewModel.toastModel, 'to delete terms and cond').to.include.keys("status");
                    expect(viewModel.toastModel.status, 'to delete terms and cond').to.equal("SUCCESS");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }
		
		
    };
	
	TestCase_TermsAndCond_deleteTermsAndCond.prototype.validate = function(){
		
    };
    
    return TestCase_TermsAndCond_deleteTermsAndCond;
    
});
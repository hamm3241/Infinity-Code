define('TestCase_TermsAndCond_CreateTermCondition',[], function() {
    function TestCase_TermsAndCond_CreateTermCondition(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
    inheritsFrom(TestCase_TermsAndCond_CreateTermCondition, kony.mvc.Business.CommandHandler);
    TestCase_TermsAndCond_CreateTermCondition.prototype.execute = function(command) {
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
                if(viewModel.termsAndConditionsViewModel!== null){
                    expect(viewModel, 'to get terms and cond').to.include.keys("termsAndConditionsViewModel");
                    expect(viewModel.termsAndConditionsViewModel, 'to get terms and cond').to.include.keys("termsAndConditions");
                    expect(viewModel.termsAndConditionsViewModel.termsAndConditions, 'for T&C to have fields').to.include.keys(["lastmodifiedts", "Description", "createdby", "id"]);
                    var data = {
                        "id": viewModel.termsAndConditionsViewModel.termsAndConditions.id,
                        user_ID: viewModel.termsAndConditionsViewModel.termsAndConditions.createdby
                    };
                   
                        command.context.onPresentForm('frmTermsAndConditions', onCompletionDelete);
                        termsAndCondModule.presentationController.deleteTermsAndConditions(data);
                        }else{
                        var data2 = {
                        "TermsAndConditionsData": {
                            Status_id: "SID_ACTIVE",
                            Description: btoa("abc <div>abc </div><div>abc</div>")
                        },
                        "user_ID": "admin2"
                    };
                    command.context.onPresentForm('frmTermsAndConditions', onCompletionCreate);
                    termsAndCondModule.presentationController.createTermsConditions(data2);
                        }
                   
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
                    var data2 = {
                        "TermsAndConditionsData": {
                            Status_id: "SID_ACTIVE",
                            Description: btoa("abc <div>abc </div><div>abc</div>")
                        },
                        "user_ID": "admin2"
                    };
                    command.context.onPresentForm('frmTermsAndConditions', onCompletionCreate);
                    termsAndCondModule.presentationController.createTermsConditions(data2);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }

        function onCompletionCreate(viewModel) {
            if (viewModel && viewModel.toastModel) {
                try {
                    expect(viewModel, 'to get terms and cond').to.include.keys("toastModel");
                    expect(viewModel.toastModel, 'to get terms and cond').to.include.keys("status");
                    expect(viewModel.toastModel.status, 'to get terms and cond').to.equal("SUCCESS");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }
    };
    //  TestCase_TermsAndCond_CreateTermCondition.prototype.validate = function () {
    //};
    return TestCase_TermsAndCond_CreateTermCondition;
});

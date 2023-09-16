define([], function () {

    function TestCase_CustomerManagement_GetApplicantNotes(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetApplicantNotes, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetApplicantNotes.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.getApplicantNotes(testPayload);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.ApplicantNotes){
                try {
                    if(viewModel.ApplicantNotes.length > 0){
                        expect(viewModel.ApplicantNotes[0], 'Customer notes').to.include.keys(['InternalUser_id', 'applicant_Status',
                    'InternalUser_Email','applicant_id','Note','InternalUser_Username','id']);
                    }
                    
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }else if(viewModel && viewModel.toastModel && viewModel.toastModel.operation === "GetApplicantNotes" && viewModel.toastModel.status === "FAILURE"){
                assert.isTrue(false,"Failed to fetch applicant notes");
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
    
    };

    TestCase_CustomerManagement_GetApplicantNotes.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetApplicantNotes;

});
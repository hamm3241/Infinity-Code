define([], function () {

    function TestCase_CustomerManagement_CreateCustomerOrApplicantNotes(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_CreateCustomerOrApplicantNotes, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_CreateCustomerOrApplicantNotes.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.createNote(testPayload);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.toastModel && viewModel.toastModel.operation === "CreateNote"){
                if(viewModel.toastModel.status === "FAILURE"){
                    assert.isTrue(false,"Failed to create customer note");
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }else{
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                }
            }
        }
    
    };

    TestCase_CustomerManagement_CreateCustomerOrApplicantNotes.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_CreateCustomerOrApplicantNotes;

});
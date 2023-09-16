define([], function () {

    function TestCase_CustomerManagement_EnrollACustomer(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_EnrollACustomer, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_EnrollACustomer.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.enrollACustomer(testPayload);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.toastModel && viewModel.toastModel.operation === "enrollACustomer"){
                if(viewModel.toastModel.status === "SUCCESS"){
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                }else{
                    assert.isTrue(false,"Enroll a customer failed.");
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }
    };
    TestCase_CustomerManagement_EnrollACustomer.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_EnrollACustomer;

});
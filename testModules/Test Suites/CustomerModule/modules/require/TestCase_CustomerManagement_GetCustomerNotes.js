define([], function () {

    function TestCase_CustomerManagement_GetCustomerNotes(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerNotes, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerNotes.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.getCustomerNotes(testPayload);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.CustomerNotes){
                try {
                    if(viewModel.CustomerNotes.length > 0){
                        expect(viewModel.CustomerNotes[0], 'Customer notes').to.include.keys(['Note', 'Customer_id',
                    'Customer_Status_id','InternalUser_Email','Customer_Username','InternalUser_Username','id']);
                    }
                    
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }else if(viewModel && viewModel.toastModel && viewModel.toastModel.operation === "GetCustomerNotes" && viewModel.toastModel.status === "FAILURE"){
                assert.isTrue(false,"Failed to fetch customer notes");
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
    
    };

    TestCase_CustomerManagement_GetCustomerNotes.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetCustomerNotes;

});
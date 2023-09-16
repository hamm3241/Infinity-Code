define([], function () {

    function TestCase_CustomerManagement_GetStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetStatus, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetStatus.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.getStatusGroup(testPayload);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.StatusGroup){
                try {
                    assert.isTrue(viewModel.StatusGroup.length > 0, 'Status master data');
                    expect(viewModel.StatusGroup[0], 'Status attributes').to.include.keys(['lastmodifiedts', 'Description', 'id','Type_id']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
        }
        }
    
    };

    TestCase_CustomerManagement_GetStatus.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetStatus;

});
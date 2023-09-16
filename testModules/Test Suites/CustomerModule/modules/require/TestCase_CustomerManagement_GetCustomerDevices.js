define([], function () {

    function TestCase_CustomerManagement_GetCustomerDevices(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerDevices, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerDevices.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var data={"$filter":"customer_Id eq 1"};

        function onCompletion(viewModel) {
            if(viewModel && viewModel.CustomerDevices){
                try {
                expect(viewModel, 'to get devices list').to.include.keys("CustomerDevices");
                expect(viewModel.CustomerDevices[0], 'for device to have fields').to.include.keys(['Channel_id', 'Customer_id','Device_id','Registered_Date','Status_id','Status_name']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getCustomerDevices(data);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_GetCustomerDevices.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetCustomerDevices;

});
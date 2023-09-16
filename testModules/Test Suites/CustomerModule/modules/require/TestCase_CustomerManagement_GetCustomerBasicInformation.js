define([], function () {

    function TestCase_CustomerManagement_GetCustomerBasicInformation(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerBasicInformation, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerBasicInformation.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.getCustomerBasicInfo(testPayload,"InfoScreen");
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.CustomerBasicInfo){
                try {
                    expect(viewModel.CustomerBasicInfo, 'Customer basic info').to.include.keys("customer");
                    expect(viewModel.CustomerBasicInfo.customer, 'Customer lock status fetched from OLB').to.include.keys("OLBCustomerFlags");
                    expect(viewModel.CustomerBasicInfo.customer, 'Customer basic info').to.include.keys(['Name', 'IsStaffMember', 'OLBCustomerFlags','EmployementStatus_name',
                    'MaritalStatus_name','CustomerType_id','MaritalStatus_id','IsAssistConsented','CustomerFlag_ids',
                    'IsEnrolledForOlb','Customer_id','CustomerSince','LastName']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }
    
    };

    TestCase_CustomerManagement_GetCustomerBasicInformation.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetCustomerBasicInformation;

});
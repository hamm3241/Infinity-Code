define([], function () {

    function TestCase_CustomerManagement_GetCustomerEntitlement(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerEntitlement, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerEntitlement.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        
        function onCompletion(viewModel) {
            if(viewModel && viewModel.CustomerEntitlements){
                try {
                expect(viewModel, 'to get customer group list').to.include.keys("CustomerEntitlements");
                expect(viewModel.CustomerEntitlements, 'to have AllEntitlements key').to.include.keys("AllEntitlements");
                expect(viewModel.CustomerEntitlements, 'to have Assigned Entitlements key').to.include.keys("AssignedEntitlements");
                expect(viewModel.CustomerEntitlements, 'to have Customer Indirect Entitlements key').to.include.keys("CustomerIndirectEntitlements");
               if(viewModel.CustomerEntitlements.AssignedEntitlements.length){
                expect(viewModel.CustomerEntitlements.AssignedEntitlements[0], 'for Entitlements to have fields').to.include.keys(['Channel_id','ServiceType_id', 'Status_id','Customer_id','Service_id']);
                }self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getCustomerEntitlements({"customerID":"1"},"infoScreen");
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_GetCustomerEntitlement.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetCustomerEntitlement;

});
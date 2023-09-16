define([], function () {

    function TestCase_CustomerManagement_GetCustomerGroups(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerGroups, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerGroups.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        
        function onCompletion(viewModel) {
            if(viewModel && viewModel.CustomerGroups){
                try {
                expect(viewModel, 'to get customer group list').to.include.keys("CustomerGroups");
                expect(viewModel.CustomerGroups, 'to have AllGroups key').to.include.keys("AllGroups");
                expect(viewModel.CustomerGroups, 'to have Assigned Group key').to.include.keys("AssignedGroups");
                if(viewModel.CustomerGroups.AssignedGroups.length){
                expect(viewModel.CustomerGroups.AssignedGroups[0], 'for customer group to have fields').to.include.keys(['Customer_id','GroupStatus_name', 'GroupStatus_id','Group_id','Group_name']);
                }
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getCustomerGroups({"customerID":"1"},"infoScreen");
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_GetCustomerGroups.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetCustomerGroups;

});
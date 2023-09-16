define([], function () {

    function TestCase_CustomerManagement_GetAllGroups(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetAllGroups, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetAllGroups.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        
        function onCompletion(viewModel) {
            if(viewModel && viewModel.AllGroups){
                try {
                expect(viewModel, 'to get devices list').to.include.keys("AllGroups");
                expect(viewModel.AllGroups[0], 'for group to have fields').to.include.keys(['Name', 'Status_id','id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getAllGroups({});
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_GetAllGroups.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetAllGroups;

});
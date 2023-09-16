define([], function () {

    function TestCase_CustomerManagement_GetCustomerProducts(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerProducts, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerProducts.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        
        function onCompletion(viewModel) {
            if(viewModel && viewModel.CustomerAccounts){
                try {
                expect(viewModel, 'to get product list').to.include.keys("CustomerAccounts");
                if(viewModel.CustomerAccounts.length){
                expect(viewModel.CustomerAccounts[0], 'for product to have fields').to.include.keys(['accountID', 'accountHolder','statusDesc']);
               } self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        }
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletion);
            customer.presentationController.getCustomerAccounts({"CustomerUsername":"konyolbuser"});
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_GetCustomerProducts.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_GetCustomerProducts;

});
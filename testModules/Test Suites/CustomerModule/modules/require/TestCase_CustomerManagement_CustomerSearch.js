define([], function () {

    function TestCase_CustomerManagement_CustomerSearch(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_CustomerSearch, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_CustomerSearch.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        var testPayload = command.context.forInput;
        try {
            customer.presentationController.navigateTo('CustomerManagementModule','showCustomerManagement'); 
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallback);
            customer.presentationController.searchCustomers(testPayload);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallback(viewModel) {
            if(viewModel && viewModel.searchModel){
                try {
                    expect(viewModel.searchModel.customers, 'List of search records').to.include.keys("records");
                    expect(viewModel.searchModel.customers, 'Number of records fetched').to.include.keys("TotalResultsFound");
                    assert.isAtMost(viewModel.searchModel.customers.records.length, viewModel.searchModel.customers.PageSize,"Records returned are not less than page size");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
        }
        }
    
    };

    TestCase_CustomerManagement_CustomerSearch.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_CustomerSearch;

});
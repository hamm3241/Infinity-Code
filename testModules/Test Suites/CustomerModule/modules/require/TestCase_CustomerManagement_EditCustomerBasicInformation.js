define([], function () {

    function TestCase_CustomerManagement_EditCustomerBasicInformation(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_EditCustomerBasicInformation, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_EditCustomerBasicInformation.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var assert = chai.assert;
        try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionCallbackForFetch);
            customer.presentationController.getCustomerBasicInfo({"Customer_id":"100"},"EditScreen");
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

        function onCompletionCallbackForFetch(viewModel) {
            if(viewModel && viewModel.CustomerBasicInfo){
                try {
                    expect(viewModel.CustomerBasicInfo, 'Customer basic info').to.include.keys("customer");
                    expect(viewModel.CustomerBasicInfo.customer, 'Customer lock status fetched from OLB').to.include.keys("OLBCustomerFlags");

                    var listOfRemovedRisks = viewModel.CustomerBasicInfo.customer.CustomerFlag_ids && viewModel.CustomerBasicInfo.customer.CustomerFlag_ids.trim().length > 0 ?
                        viewModel.CustomerBasicInfo.customer.CustomerFlag_ids.split(',').map(function(ele){return ele.trim();}):[];
                    var editTestPayload = {
                        "Customer_id":"100",
                        "Salutation":"Mrs",
                        "MaritalStatus_id":"SID_MARRIED",
                        "EmployementStatus_id":"SID_EMPLOYED",
                        "Status_id":"SID_CUS_SUSPENDED",
                        "SpouseName":"ABCD",
                        "ModifiedByName":"UID1",
                        "BankingAccess":"1",
                        "listOfRemovedRisks":listOfRemovedRisks,
                        "listOfAddedRisks":[]
                    };

                    command.context.onPresentForm('frmCustomerManagement', onCompletionCallbackForUpdate);
                    customer.presentationController.editCustomerBasicInfo(editTestPayload);
                } catch (e) {
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }

        function onCompletionCallbackForUpdate(viewModel){
            if(viewModel && viewModel.toastModel && viewModel.toastModel.operation === "editCustomerBasicInfo"){
                if(viewModel.toastModel.status ===  "SUCCESS"){
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                }else{
                    assert.isTrue(false,"Edit customer basic information failed.");
                    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                }
            }
        }
    
    };

    TestCase_CustomerManagement_EditCustomerBasicInformation.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_EditCustomerBasicInformation;

});
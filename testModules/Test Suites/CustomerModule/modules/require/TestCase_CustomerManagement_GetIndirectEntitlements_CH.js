define([], function () {

    function TestCase_CustomerManagement_GetIndirectEntitlements_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetIndirectEntitlements_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetIndirectEntitlements_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var data={"$filter":"customer_Id eq 1"};

        function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of Customer Indirect Entitlments List ').to.include.keys("customer_indirect_permissions_view");
                  if(response.data.customer_indirect_permissions_view.length){
                  expect(response.data.customer_indirect_permissions_view[0], 'for Entitlement to have fields').to.include.keys(['Group_id', 'Service_id','Customer_id','Service_Status_id']);
                  }self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerIndirectEntitlements",data, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetIndirectEntitlements_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetIndirectEntitlements_CH;

});
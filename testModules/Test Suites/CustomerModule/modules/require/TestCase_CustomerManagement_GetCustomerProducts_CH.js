define([], function () {

    function TestCase_CustomerManagement_GetCustomerProducts_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerProducts_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerProducts_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        
        function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of products List ').to.include.keys("Accounts");
                  if(response.data.Accounts.length){
                  expect(response.data.Accounts[0], 'for product to have fields').to.include.keys(['accountID', 'accountHolder','statusDesc']);
                  }self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerAccounts",{"CustomerUsername":"konyolbuser"}, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetCustomerProducts_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetCustomerProducts_CH;

});
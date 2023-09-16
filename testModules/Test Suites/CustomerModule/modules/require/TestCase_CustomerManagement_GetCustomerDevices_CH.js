define([], function () {

    function TestCase_CustomerManagement_GetCustomerDevices_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetCustomerDevices_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetCustomerDevices_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var data={"$filter":"customer_Id eq 1"};

        function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of devices List ').to.include.keys("customer_device_information_view");
                  expect(response.data.customer_device_information_view[0], 'for devices to have fields').to.include.keys(['Channel_id', 'Customer_id','Device_id','Registered_Date','Status_id','Status_name']);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.GetCustomerDevices",data, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetCustomerDevices_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetCustomerDevices_CH;

});
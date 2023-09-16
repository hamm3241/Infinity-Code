define([], function () {

    function TestCase_CustomerManagement_CustomerUpdateDeviceInformation_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_CustomerUpdateDeviceInformation_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_CustomerUpdateDeviceInformation_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
      
        var data={"$filter":"customer_Id eq 1"};
        function onCompletionOfFetch(response) {
          var dataToUpdate;
          try {
           if(response.data.opstatus===0 ){
                   if(response.data.customer_device_information_view.length>0){
                    // for(var i=0;i<response.data.customer_device_information_view.length;i++){
                    //   if(response.data.customer_device_information_view[i].Status_id==="SID_DEVICE_ACTIVE")
                    //     {
                          dataToUpdate=response.data.customer_device_information_view[0];
                        //   break;
                        // }}
              
               var finalData = {
                  "Device_id": dataToUpdate.Device_id,
                  "Customer_id": dataToUpdate.Customer_id,
                  "Status_id": "SID_DEVICE_INACTIVE"
                };
               customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.CustomerUpdateDeviceInformation",finalData, onCompletionOfUpdate));
            }
                }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }

        function onCompletionOfUpdate(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'to have successful update ').to.include.keys("Status");
                  expect(response.data.Status).to.equal("Update successful");
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

    TestCase_CustomerManagement_CustomerUpdateDeviceInformation_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_CustomerUpdateDeviceInformation_CH;

});
define([], function () {

    function TestCase_CustomerManagement_CustomerUpdateDeviceInformation(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_CustomerUpdateDeviceInformation, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_CustomerUpdateDeviceInformation.prototype.execute = function (command) {
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
         var data={"$filter":"customer_Id eq 1"};
        
        function onCompletionOfFetch(viewModel) {
          var dataToUpdate;
          try {
            if(viewModel && viewModel.CustomerDevices){
                   if(viewModel.CustomerDevices.length>0){
                    // for(var i=0;i<viewModel.CustomerDevices.length;i++){
                    //   if(viewModel.CustomerDevices[i].Status_id==="SID_DEVICE_ACTIVE")
                    //     {
                          dataToUpdate=viewModel.CustomerDevices[0];
                        //   break;
                        // }}
              
               var finalData = {
                  "Device_id": dataToUpdate.Device_id,
                  "Customer_id": dataToUpdate.Customer_id,
                  "Status_id": "SID_DEVICE_INACTIVE"
                };

                command.context.onPresentForm('frmCustomerManagement', onCompletionOfUpdate);
                customer.presentationController.customerUpdateDeviceInformation(finalData);
            }
                }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }

        function onCompletionOfUpdate(viewModel) {
              try {
                  if(viewModel && viewModel.toastModel && viewModel.toastModel.message){
                expect(viewModel.toastModel.message, 'to get devices list').to.equal("Device deactivated successfully");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
            } } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
          }
        
       
        try {
             command.context.onPresentForm('frmCustomerManagement', onCompletionOfFetch);
            customer.presentationController.getCustomerDevices(data);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };

    TestCase_CustomerManagement_CustomerUpdateDeviceInformation.prototype.validate = function () {

    };

    return TestCase_CustomerManagement_CustomerUpdateDeviceInformation;

});
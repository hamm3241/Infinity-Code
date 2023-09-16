define([], function () {

    function TestCase_CustomerManagement_GetCustomerGroups_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
    
    inheritsFrom(TestCase_CustomerManagement_GetCustomerGroups_CH, kony.mvc.Business.CommandHandler);

    this.allGroups=null;
    TestCase_CustomerManagement_GetCustomerGroups_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var data={"$filter":"customer_Id eq 1"};

        function onCompletionOfFetch(response) {
          var self=this;
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of customer group').to.include.keys("customergroupinfo_view");
                  expect(response.data.customergroupinfo_view[0], 'for devices to have fields').to.include.keys(['Customer_id','GroupStatus_name', 'GroupStatus_id','Group_id','Group_name']);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerGroups",data, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetCustomerGroups_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetCustomerGroups_CH;

});
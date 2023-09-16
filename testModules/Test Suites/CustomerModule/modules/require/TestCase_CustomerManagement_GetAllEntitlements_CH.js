define([], function () {

    function TestCase_CustomerManagement_GetAllEntitlements_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetAllEntitlements_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetAllEntitlements_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        
        function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of entitlments List ').to.include.keys("service");
                  if(response.data.service.length){
                  expect(response.data.service[0], 'for Entitlement to have fields').to.include.keys(['Type_id', 'Status_id','id','Category_id','Channel_id']);
                  }self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getAllEntitlements",{}, onCompletionOfFetch));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_GetAllEntitlements_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetAllEntitlements_CH;

});
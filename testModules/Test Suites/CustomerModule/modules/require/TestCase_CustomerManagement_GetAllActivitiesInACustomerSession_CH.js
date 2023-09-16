define([], function () {

    function TestCase_CustomerManagement_GetAllActivitiesInACustomerSession_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_GetAllActivitiesInACustomerSession_CH, kony.mvc.Business.CommandHandler);

    TestCase_CustomerManagement_GetAllActivitiesInACustomerSession_CH.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        
          try {
          	customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.GetLastNCustomerSessions",{"username":"konyolbuser","sessionCount":"4"}, onCompletionOfSessionFetch));
              } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  				}    

         
          function onCompletionOfSessionFetch(response) {
              try {
              	if(response.data.records.length)
              	{
              	var data={"sessionId":response.data.records[0].sessionId};
              	customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.GetAllActivitiesInACustomerSession",data, onCompletionOfFetch));
              	}
                 //self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
          function onCompletionOfFetch(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'success of fetch of all activities in a session').to.include.keys("records");
                  expect(response.data.records[0], 'for activities to have fields').to.include.keys(['activityType', 'channel','deviceId','eventts','id','sessionId','status','username']);
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
               }

    };

    TestCase_CustomerManagement_GetAllActivitiesInACustomerSession_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_GetAllActivitiesInACustomerSession_CH;

});
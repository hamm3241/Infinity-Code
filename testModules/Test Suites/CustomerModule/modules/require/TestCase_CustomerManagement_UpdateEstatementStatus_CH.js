define([], function () {

    function TestCase_CustomerManagement_UpdateEstatementStatus_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_UpdateEstatementStatus_CH, kony.mvc.Business.CommandHandler);
     var allGroups=null;

    TestCase_CustomerManagement_UpdateEstatementStatus_CH.prototype.execute = function (command) {
        var self = this;
        var allProducts=null;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");

        function onCompletionOfFetch(response) {
         try {
           if(response.data.opstatus===0 ){
            if(response.data.Accounts.length){
              self.allProducts=response.data.Accounts;
              customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getContactInfo",{"Customer_id":"1"}, onCompletionOfFetchContacts));
              }
                }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }

          function onCompletionOfFetchContacts(response) {
         try {
           if(response.data.opstatus===0 ){
            if(response.data.EmailIds.length){
             var finalData = {"customerID":"1",
                              "accountID":self.allProducts[0].accountID,
                              "eStatementStatus":true,
                              "eStatementEmail":response.data.EmailIds[0].Value};
            
               customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.UpdateEstatementStatus",finalData, onCompletionOfUpdate));
            }
            }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }
         
        function onCompletionOfUpdate(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'to have successful edit of eStatement').to.include.keys("eStatementUpdateStatus");
                  expect(response.data.eStatementUpdateStatus).to.equal("success");
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
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

    TestCase_CustomerManagement_UpdateEstatementStatus_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_UpdateEstatementStatus_CH;

});
define([], function () {

    function TestCase_CustomerManagement_UpdateEstatementStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_UpdateEstatementStatus, kony.mvc.Business.CommandHandler);
     var allGroups=null;

    TestCase_CustomerManagement_UpdateEstatementStatus.prototype.execute = function (command) {
        var self = this;
        var allProducts=null;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");

        function onCompletionOfFetch(viewModel) {
         try {
            if(viewModel && viewModel.CustomerAccounts){
            if(viewModel.CustomerAccounts.length){
             self.allProducts=viewModel.CustomerAccounts;
              command.context.onPresentForm('frmCustomerManagement', onCompletionOfFetchContacts);
              customer.presentationController.getCustomerContactInfo({"customerID":"1"});
               }
                }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }

          function onCompletionOfFetchContacts(viewModel) {
         try {
         if(viewModel && viewModel.CustomerContactInfo){
            if(viewModel.CustomerContactInfo.Emails.length){
             var finalData = {"customerID":"1",
                              "accountID":self.allProducts[0].accountID,
                              "eStatementStatus":true,
                              "eStatementEmail":viewModel.CustomerContactInfo.Emails[0].Value};
               command.context.onPresentForm('frmCustomerManagement', onCompletionOfUpdate);
               customer.presentationController.updateEstatementStatus(finalData);
             }
            }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }
         
        function onCompletionOfUpdate(viewModel) {
              try {
                  if(viewModel && viewModel.eStatementUpdateStatus ){
                  expect(viewModel.eStatementUpdateStatus).to.equal("success");
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                }
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
           command.context.onPresentForm('frmCustomerManagement', onCompletionOfFetch);
            customer.presentationController.getCustomerAccounts({"CustomerUsername":"konyolbuser"});
          } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_UpdateEstatementStatus.prototype.validate = function () {};

    return TestCase_CustomerManagement_UpdateEstatementStatus;

});
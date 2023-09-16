define([], function () {

    function TestCase_CustomerManagement_EditCustomerEntitlements(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_EditCustomerEntitlements, kony.mvc.Business.CommandHandler);
     var allGroups=null;

    TestCase_CustomerManagement_EditCustomerEntitlements.prototype.execute = function (command) {
        var self = this;
        var allEntitlements=null;
        var allCustomerEntitlements=null;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
         
        try {
          customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getAllEntitlements",{}, onCompletionOfgetAllEntitlements)); 
           } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
          }

        function onCompletionOfgetAllEntitlements(response) {
         try {
           if(response.data.opstatus===0 ){
            if(response.data.service.length){
              self.allEntitlements=response.data.service;
              command.context.onPresentForm('frmCustomerManagement', onCompletionOfGetCustomerEntitlements);
              customer.presentationController.getCustomerEntitlements({"customerID":"1"},"infoScreen");
          }
               } }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }

        function onCompletionOfGetCustomerEntitlements(viewModel) {
         try {
          if(viewModel && viewModel.CustomerEntitlements){
           if(viewModel.CustomerEntitlements.AssignedEntitlements.length){
              self.allCustomerEntitlements=viewModel.CustomerEntitlements.AssignedEntitlements;
               var added=[];
          var removed=[];
          for(i=0;i<self.allCustomerEntitlements.length;i++)
              {
                removed.push(self.allCustomerEntitlements[i].Service_id);
              }
              added.push({"Service_id":self.allEntitlements[0].id});
              added.push({"Service_id":self.allEntitlements[1].id});
              added.push({"Service_id":self.allEntitlements[2].id});
              var finalData = { "Customer_id":"1",
                                "ModifiedByID":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                                "ModifiedByName":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                                "listOfAddedPermissions":added,
                                "listOfRemovedPermissions":removed};
          command.context.onPresentForm('frmCustomerManagement', onCompletionOfUpdate);
          customer.presentationController.editCustomerEntitlements(finalData);  }
               } } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
         
        function onCompletionOfUpdate(viewModel) {
             try {
                if(viewModel && viewModel.toastModel && viewModel.toastModel.message){
                expect(viewModel.toastModel.message, 'for edit entitlement success ').to.equal("Edit customer entitlements successful.");
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                     }
    };
}
    TestCase_CustomerManagement_EditCustomerEntitlements.prototype.validate = function () {};

    return TestCase_CustomerManagement_EditCustomerEntitlements;

});
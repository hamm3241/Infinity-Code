define([], function () {

    function TestCase_CustomerManagement_EditCustomerGroups(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_EditCustomerGroups, kony.mvc.Business.CommandHandler);
    

    TestCase_CustomerManagement_EditCustomerGroups.prototype.execute = function (command) {
        var self = this;
        var allGroups=null;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        
        function onCompletionOfFetch(viewModel) {
          try {
          if(viewModel && viewModel.AllGroups){
            self.allGroups= viewModel.AllGroups;
            command.context.onPresentForm('frmCustomerManagement', onCompletionOfFetchAssignedGroups);
            customer.presentationController.getCustomerGroups({"customerID":"1"},"infoScreen");
             } } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }

        function onCompletionOfFetchAssignedGroups(viewModel) {
            try {
          if(viewModel && viewModel.CustomerGroups){
             if(viewModel.CustomerGroups.AssignedGroups.length){
              var added=[];
              var removed=[];
              for(i=0;i<viewModel.CustomerGroups.AssignedGroups.length;i++)
              {
                removed.push(viewModel.CustomerGroups.AssignedGroups[i].Group_id);
              }
              added.push(self.allGroups[0].id);
              added.push(self.allGroups[1].id);
              added.push(self.allGroups[2].id);
              var finalData = {"Customer_id":"1",
                                "ModifiedByID":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                                "ModifiedByName":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                                "listOfAddedGroups":added,
                                "listOfRemovedGroups":removed};
               command.context.onPresentForm('frmCustomerManagement', onCompletionOfUpdate);
               customer.presentationController.editCustomerGroups(finalData);
               }}
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }
         
        function onCompletionOfUpdate(viewModel) {
              try {
                if(viewModel && viewModel.toastModel && viewModel.toastModel.message){
                expect(viewModel.toastModel.message, 'for edit group success ').to.equal("Edit customer groups successful.");
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                } }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
         }
         try {
            command.context.onPresentForm('frmCustomerManagement', onCompletionOfFetch);
            customer.presentationController.getAllGroups({});
            } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_EditCustomerGroups.prototype.validate = function () {};

    return TestCase_CustomerManagement_EditCustomerGroups;

});
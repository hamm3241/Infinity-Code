define([], function () {

    function TestCase_CustomerManagement_EditCustomerGroups_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_EditCustomerGroups_CH, kony.mvc.Business.CommandHandler);
     var allGroups=null;

    TestCase_CustomerManagement_EditCustomerGroups_CH.prototype.execute = function (command) {
        var self = this;
        var allGroups=null;
        var expect = chai.expect;
        var customer = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        
        function onCompletionOfFetch(response) {
         try {
           if(response.data.opstatus===0 ){
            self.allGroups=response.data.membergroup;
            customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerGroups",{"$filter":"customer_Id eq 1"}, onCompletionOfFetchAssignedGroups));
             } } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }

        function onCompletionOfFetchAssignedGroups(response) {
         try {
           if(response.data.opstatus===0 ){
             if(response.data.customergroupinfo_view.length){
              var added=[];
              var removed=[];
              for(i=0;i<response.data.customergroupinfo_view.length;i++)
              {
                removed.push(response.data.customergroupinfo_view[i].Group_id);
              }
              added.push(self.allGroups[0].id);
              added.push(self.allGroups[1].id);
              added.push(self.allGroups[2].id);
              var finalData = {"Customer_id":"1",
                                "ModifiedByID":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                                "ModifiedByName":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                                "listOfAddedGroups":added,
                                "listOfRemovedGroups":removed}
               customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.editCustomerGroups",finalData, onCompletionOfUpdate));
            }
                }} catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
             }
         
        function onCompletionOfUpdate(response) {
              try {
                  expect(response.data, 'to have success status ').to.include.keys("opstatus");
                  expect(response.data.opstatus).to.equal(0);
                  expect(response.data, 'to have successful edit ').to.include.keys("Status");
                  expect(response.data.Status).to.equal("Edit successful");
                  self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
                } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
                       }
                     }
         try {
          customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getAllGroups",{}, onCompletionOfFetch));
           } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
  }

    };

    TestCase_CustomerManagement_EditCustomerGroups_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_EditCustomerGroups_CH;

});
define([], function () {

    function TestCase_CustomerManagement_EditCustomerEntitlements_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_CustomerManagement_EditCustomerEntitlements_CH, kony.mvc.Business.CommandHandler);
     var allGroups=null;

    TestCase_CustomerManagement_EditCustomerEntitlements_CH.prototype.execute = function (command) {
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
              customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.getCustomerEntitlements",{"$filter":"customer_Id eq 1"}, onCompletionOfGetCustomerEntitlements));}
               } }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }

        function onCompletionOfGetCustomerEntitlements(response) {
         try {
           if(response.data.opstatus===0 ){
            if(response.data.customerpermissions_view.length){
              self.allCustomerEntitlements=response.data.customerpermissions_view;
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
                                "listOfRemovedPermissions":removed}
          customer.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.editCustomerEntitlements",finalData, onCompletionOfUpdate));
           }
               } } catch (e) {
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
    };

    TestCase_CustomerManagement_EditCustomerEntitlements_CH.prototype.validate = function () {};

    return TestCase_CustomerManagement_EditCustomerEntitlements_CH;

});
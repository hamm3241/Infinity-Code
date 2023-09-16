define([], function() {

  	function TestCase_Groups_getGroups(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_getGroups, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_getGroups.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
        var self = this;
        var expect = chai.expect;
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.custGroupsList && viewModel.context === ""){
                    expect(viewModel.custGroupsList,'to get groups').to.have.length.above(0);
                    expect(viewModel.custGroupsList[0], 'to verify fields in group record').to.include.all.
                      keys(['Customers_Count', 'Entitlements_Count', 'Group_Desc','Group_Name','Group_id','Status_id']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmGroups', onFetchCompletion);
            groupsModule.presentationController.navigateTo('CustomerGroupsModule','fetchCustomerGroups');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Groups_getGroups.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_getGroups;
    
});
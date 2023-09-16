define([], function() {

  	function TestCase_Roles_fetchAllActiveUsersAndAllActivePermissions(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Roles_fetchAllActiveUsersAndAllActivePermissions, kony.mvc.Business.CommandHandler);
  
  	TestCase_Roles_fetchAllActiveUsersAndAllActivePermissions.prototype.execute = function(command){
		var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.fetchRoleUpdates){
					expect(viewModel, 'to get Roles').to.include.keys("fetchRoleUpdates");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmRoles', onCompletion);
            RoleModule.presentationController.navigateTo('RoleModule','fetchAllActiveUsersAndAllActivePermissions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Roles_fetchAllActiveUsersAndAllActivePermissions.prototype.validate = function(){
		
    };
    
    return TestCase_Roles_fetchAllActiveUsersAndAllActivePermissions;
    
});
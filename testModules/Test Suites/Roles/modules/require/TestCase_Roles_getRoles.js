define([], function() {

  	function TestCase_Roles_getRoles(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Roles_getRoles, kony.mvc.Business.CommandHandler);
  
  	TestCase_Roles_getRoles.prototype.execute = function(command){
		var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.fetchRoleList){
					expect(viewModel, 'to get Roles').to.include.keys("fetchRoleList");
                expect(viewModel.fetchRoleList, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.fetchRoleList[0], 'for Roles to have fields').to.include.keys(['Status_Desc','Status_id', 'Users_Count', 'permission_Count', 'roleType_id','role_Desc','role_Name','role_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmRoles', onCompletion);
            RoleModule.presentationController.navigateTo('RoleModule','fetchRoleList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Roles_getRoles.prototype.validate = function(){
		
    };
    
    return TestCase_Roles_getRoles;
    
});
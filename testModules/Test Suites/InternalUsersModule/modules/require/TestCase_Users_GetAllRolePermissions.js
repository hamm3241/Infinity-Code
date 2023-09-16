define([], function() {

  	function TestCase_Users_GetAllRolePermissions(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetAllRolePermissions, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetAllRolePermissions.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.RolePermissions){
                expect(viewModel, 'to get all permissions').to.include.keys("RolePermissions");
                expect(viewModel.RolePermissions, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.RolePermissions[0], 'for role permissions to have fields').to.include.keys(['Permission_id','Role_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmUsers',onCompletion);
            usersModule.presentationController.navigateTo('InternalUserModule','fetchAllRolePermissions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_GetAllRolePermissions.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetAllRolePermissions;
    
});
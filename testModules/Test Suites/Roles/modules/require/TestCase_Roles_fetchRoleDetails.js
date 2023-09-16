define([], function() {

  	function TestCase_Roles_fetchRoleDetails(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Roles_fetchRoleDetails, kony.mvc.Business.CommandHandler);
  
  	TestCase_Roles_fetchRoleDetails.prototype.execute = function(command){
		var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        var self = this;
        var expect = chai.expect;
         var inputParam = {
           "roleId":""
         };
      function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.fetchRoleDetails){
					expect(viewModel, 'to get Roles details').to.include.keys("fetchRoleDetails");
                expect(viewModel.fetchRoleList, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.fetchRoleList[0], 'for Roles to have fields').to.include.keys(["Status_Desc", "Status_id", "Users_Count", "permission_Count", "roleType_id", "role_Desc", "role_Name", "role_id"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
      function onFetchCompletion(viewModel){
   try{
               if(viewModel&&viewModel.fetchRoleList){
                    command.context.onPresentForm('frmRoles', onCompletion);
					inputParam.roleId=viewModel.fetchRoleList[0].role_id;
                    RoleModule.presentationController.fetchRoleDetails("",inputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
        try {
            command.context.onPresentForm('frmRoles', onFetchCompletion);
            RoleModule.presentationController.navigateTo('RoleModule','fetchRoleList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Roles_fetchRoleDetails.prototype.validate = function(){
		
    };
    
    return TestCase_Roles_fetchRoleDetails;
    
});
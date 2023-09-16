define([], function() {

  	function TestCase_Role_updateRole_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Role_updateRole_CommandHandler, kony.mvc.Business.CommandHandler);
  
  	TestCase_Role_updateRole_CommandHandler.prototype.execute = function(command){
		var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        var self = this;
        var expect = chai.expect;
		var inputParam =  {
          "role_id":"",
          "Role_Name": "role 1",
          "Role_Desc":"role 1 description",
          "Status_id":"SID_ACTIVE",
          "system_user":"admin2",
          "Permission_ids":["PID49"],
          "User_ids":["UID12"]
        };
         function onFetchCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                 expect(response.data,'to verify Roles response').to.include.all.keys(["httpStatusCode","opstatus","httpresponse","roles_view"]);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        function onFetchRolesCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to verify Roles response').to.include.all.keys(["roles_view","httpStatusCode","httpresponse","opstatus"]);
                expect(response.data.roles_view, 'to verify Roles exsist').to.have.length.above(0);
                expect(response.data.opstatus, 'to verify fetch opstatus ').to.equal(0);
                inputParam.role_id = response.data.roles_view[0].role_id;
                RoleModule.businessController.execute(new kony.mvc.Business.Command("com.kony.role.updateRole", role_id, onFetchCompletion));
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try{
            RoleModule.businessController.execute(new kony.mvc.Business.Command("com.kony.role.fetchAllRoles", inputParam, onFetchCompletion));
        }catch(e){
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Role_updateRole_CommandHandler.prototype.validate = function(){
		
    };
    
    return TestCase_Role_updateRole_CommandHandler;
    
});
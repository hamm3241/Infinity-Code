define([], function() {

  	function TestCase_Role_createRole_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Role_createRole_CommandHandler, kony.mvc.Business.CommandHandler);
  
  	TestCase_Role_createRole_CommandHandler.prototype.execute = function(command){
       var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        var self = this;
        var expect = chai.expect;
		var inputParam =  {
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
                 expect(response.data,'to verify Roles response').to.include.all.keys(["httpStatusCode","Status","opstatus","httpresponse"]);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try{
            RoleModule.businessController.execute(new kony.mvc.Business.Command("com.kony.role.createRole", inputParam, onFetchCompletion));
        }catch(e){
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Role_createRole_CommandHandler.prototype.validate = function(){
		
    };
    
    return TestCase_Role_createRole_CommandHandler;
    
});
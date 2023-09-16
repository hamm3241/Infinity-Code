define([], function() {

  	function TestCase_Role_fetchActivePermissions_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Role_fetchActivePermissions_CommandHandler, kony.mvc.Business.CommandHandler);
  
  	TestCase_Role_fetchActivePermissions_CommandHandler.prototype.execute = function(command){
		var RoleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        var self = this;
        var expect = chai.expect;

         function onFetchCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data, 'to verify Roles exsist').to.have.length.above(0);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try{
            RoleModule.businessController.execute(new kony.mvc.Business.Command("com.kony.role.fetchActivePermissions", {}, onFetchCompletion));
        }catch(e){
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Role_fetchActivePermissions_CommandHandler.prototype.validate = function(){
		
    };
    
    return TestCase_Role_fetchActivePermissions_CommandHandler;
    
});
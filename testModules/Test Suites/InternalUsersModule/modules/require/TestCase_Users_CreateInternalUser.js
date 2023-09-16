define([], function() {

  	function TestCase_Users_CreateInternalUser(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_CreateInternalUser, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_CreateInternalUser.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var createInputParam={"userData":{"firstName": "admin","lastName": "console","middleName": "","userName": "","email": ""},"homeAddrData": {
		"addressLine1": "hyd","addressLine2": "","city_id": "CITY936","region_id": "R18","country_id": "Con1","zipcode": "76rfg878"},"workAddrData": {	"location": "C1","branch": "ae14a74c-a8c0-42bf-8871-e6515fb3cec8","workAddress": "xyz, , Hyderabad, Telangana, India, 121212","zipcode": ""},"roleData": {"user_id": "","role_id": "0dfde914-94f1-4c09-85a3-4672911f88ad"},"permissionList": ["PID01"]};
        function onCreateCompletion(viewModel){
			try{
               if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to get update status').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if status changed successfully').to.equal("SUCCESS");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
  }
  function onFetchCompletion(viewModel){
   try{
               if(viewModel&&viewModel.usersList){
                    command.context.onPresentForm('frmUsers', onCreateCompletion);
					createInputParam.userData.userName="TestUser"+viewModel.usersList.length;
					createInputParam.userData.email="TestUser"+viewModel.usersList.length+"@kony.com";
                    usersModule.presentationController.onSaveBtnClick(createInputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
  try {
            command.context.onPresentForm('frmUsers', onFetchCompletion);
            usersModule.presentationController.navigateTo('InternalUserModule','fetchUsersList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_CreateInternalUser.prototype.validate = function(){
		
    };
    
    return TestCase_Users_CreateInternalUser;
    
});
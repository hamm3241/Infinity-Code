define([], function() {

  	function TestCase_Users_CreateInternalUser_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_CreateInternalUser_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_CreateInternalUser_CH.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var createInputParam={"userData":{"firstName": "admin","lastName": "console","middleName": "","userName": "","email": ""},"homeAddrData": {
		"addressLine1": "hyd","addressLine2": "","city_id": "CITY936","region_id": "R18","country_id": "Con1","zipcode": "76rfg878"},"workAddrData": {	"location": "C1","branch": "ae14a74c-a8c0-42bf-8871-e6515fb3cec8","workAddress": "xyz, , Hyderabad, Telangana, India, 121212","zipcode": ""},"roleData": {"user_id": "","role_id": "0dfde914-94f1-4c09-85a3-4672911f88ad"},"permissionList": ["PID01"]};
        function onCreateCompletion(response){
			try{
               if(response&&response.data.UserStatus){
                expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to create user').to.include.keys("AddressStatus","EmailStatus","RoleStatus","UserStatus");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
  }
  function onFetchCompletion(response){
   try{
               if(response&&response.data.internalusers_view){
					createInputParam.userData.userName="TestUser"+response.data.internalusers_view.length;
					createInputParam.userData.email="TestUser"+response.data.internalusers_view.length+"@kony.com";
                    usersModule.businessController.execute(new kony.mvc.Business.Command("com.kony.internalUser.createInternalUser", createInputParam, onCreateCompletion));
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
  try {
            usersModule.businessController.execute(new kony.mvc.Business.Command("com.kony.internalUser.fetchInternalUsers", {}, onFetchCompletion));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_CreateInternalUser_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Users_CreateInternalUser_CH;
    
});
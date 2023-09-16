define([], function() {

  	function TestCase_Users_EditInternalUser_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_EditInternalUser_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_EditInternalUser_CH.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var editInputParam={"User_id":"","ModifiedByID":"admin2","ModifiedByName":"admin2","FirstName":"","LastName":"","MiddleName":"","UserName":"TestUser23","Email":"TestUser23@kony.com","addr1":"hyd","addr2":"","City_id":"CITY936","State_id":"R18","Country_id":"Con1","City_Name":"Nongstoin","State_Name":"Meghalaya","Country_Name":"India","Zipcode":"76rfg878","BranchLocation_Name":"New York Service Center Branch","BranchLocation_id":"LID1","zipcode":"76rfg878","Role_id":"47de472f-fb9a-421f-a647-6d46178743be","Role_Name":"role 3","listOfAddedPermissionsNames":["ViewUser","ViewDashboard"],"listOfRemovedPermissionsNames":["updateMember"],"listOfAddedPermissions":["PID02","PID01"],"listOfRemovedPermissions":["PID03"]};
        function onUpdateCompletion(response){
			try{
               if(response&&response.data.Status){
                expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to update user').to.include.keys("EmailStatus","Status");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
  }
  function onFetchCompletion(response){
   try{
               if(response&&response.data){
					editInputParam.User_id=response.data.internalusers_view[3].User_id;
                 	editInputParam.FirstName=response.data.internalusers_view[3].FirstName.slice(0,4)+"a";
                 	editInputParam.LastName=response.data.internalusers_view[3].LastName.slice(0,4)+"b";
                    usersModule.businessController.execute(new kony.mvc.Business.Command("com.kony.internalUser.editInternalUser", editInputParam, onUpdateCompletion));
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
	
	TestCase_Users_EditInternalUser_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Users_EditInternalUser_CH;
    
});
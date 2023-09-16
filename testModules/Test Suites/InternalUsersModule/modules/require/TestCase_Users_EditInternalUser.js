define([], function() {

  	function TestCase_Users_EditInternalUser(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_EditInternalUser, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_EditInternalUser.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var editInputParam={"User_id":"","ModifiedByID":"admin2","ModifiedByName":"admin2","FirstName":"","LastName":"","MiddleName":"","UserName":"TestUser23","Email":"TestUser23@kony.com","addr1":"hyd","addr2":"","City_id":"CITY936","State_id":"R18","Country_id":"Con1","City_Name":"Nongstoin","State_Name":"Meghalaya","Country_Name":"India","Zipcode":"76rfg878","BranchLocation_Name":"New York Service Center Branch","BranchLocation_id":"LID1","zipcode":"76rfg878","Role_id":"47de472f-fb9a-421f-a647-6d46178743be","Role_Name":"role 3","listOfAddedPermissionsNames":["ViewUser","ViewDashboard"],"listOfRemovedPermissionsNames":["updateMember"],"listOfAddedPermissions":["PID02","PID01"],"listOfRemovedPermissions":["PID03"]};
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
					editInputParam.User_id=viewModel.usersList[3].User_id;
                 	editInputParam.FirstName=viewModel.usersList[3].FirstName+"a";
                 	editInputParam.LastName=viewModel.usersList[3].LastName+"b";
                    usersModule.presentationController.editInternalUser(editInputParam);
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
	
	TestCase_Users_EditInternalUser.prototype.validate = function(){
		
    };
    
    return TestCase_Users_EditInternalUser;
    
});
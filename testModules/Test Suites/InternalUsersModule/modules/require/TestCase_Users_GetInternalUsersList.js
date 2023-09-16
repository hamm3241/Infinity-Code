define([], function() {

  	function TestCase_Users_GetInternalUsersList(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetInternalUsersList, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetInternalUsersList.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.usersList){
                expect(viewModel, 'to get users').to.include.keys("usersList");
                expect(viewModel.usersList, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.usersList[0], 'for users to have fields').to.include.keys(['User_id','Name','Username','Status_id','FirstName','Email','LastName','Work_Zipcode','Work_CountryID','Work_StateID','Home_CountryID','Work_AddressLine1','Work_CityID','Home_StateID','Work_AddressID','Home_AddressID','Home_Zipcode','Home_AddressLine1','Home_CityID']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmUsers',onCompletion);
            usersModule.presentationController.navigateTo('InternalUserModule','fetchUsersList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_GetInternalUsersList.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetInternalUsersList;
    
});
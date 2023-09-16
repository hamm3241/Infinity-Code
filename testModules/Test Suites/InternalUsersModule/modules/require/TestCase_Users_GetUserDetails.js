define([], function() {

  	function TestCase_Users_GetUserDetails(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetUserDetails, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetUserDetails.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
		   "User_id":"",
           "isEdit":false         
		};
        function onGetCompletion(viewModel){
			try{
               if(viewModel&&viewModel.userDetails){
                expect(viewModel, 'to get user details').to.include.keys("userDetails");
                expect(viewModel.userDetails.internalusers_view, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.userDetails.internalusers_view[0], 'for policy to have fields').to.include.keys(['User_id','Name','Username','Status_id','FirstName','Email','LastName','Work_Zipcode','Work_CountryID','Work_StateID','Home_CountryID','Work_AddressLine1','Work_CityID','Home_StateID','Work_AddressID','Home_AddressID','Home_Zipcode','Home_AddressLine1','Home_CityID']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
  }
  function onFetchCompletion(viewModel){
   try{
               if(viewModel&&viewModel.usersList){
                    command.context.onPresentForm('frmUsers', onGetCompletion);
					inputParam.User_id=viewModel.usersList[1].User_id;
                    usersModule.presentationController.fetchUserDetails("",inputParam);
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
	
	TestCase_Users_GetUserDetails.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetUserDetails;
    
});
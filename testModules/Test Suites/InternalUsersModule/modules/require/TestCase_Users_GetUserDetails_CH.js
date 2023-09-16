define([], function() {

  	function TestCase_Users_GetUserDetails_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetUserDetails_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetUserDetails_CH.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
		   "User_id":"",
           "isEdit":false         
		};
        function onEditCompletion(response){
			try{
               if(response&&response.data.internalusers_view){
                expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
				expect(response.data, 'to get user details').to.include.keys("internalusers_view","userdirectpermission_view","userpermission_view");
                expect(response.data.internalusers_view, 'to get more than zero').to.have.length.above(0);
                expect(response.data.internalusers_view[0], 'for policy to have fields').to.include.keys(['User_id','Name','Username','Status_id','FirstName','Email','LastName','Work_Zipcode','Work_CountryID','Work_StateID','Home_CountryID','Work_AddressLine1','Work_CityID','Home_StateID','Work_AddressID','Home_AddressID','Home_Zipcode','Home_AddressLine1','Home_CityID']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
  }
  function onFetchCompletion(response){
   try{
               if(response&&response.data){
 				expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data.internalusers_view, 'to get more than zero').to.have.length.above(0);
                expect(response.data.internalusers_view[0], 'for users to have fields').to.include.keys(['User_id','Name','Username','Status_id','FirstName','Email','LastName','Work_Zipcode','Work_CountryID','Work_StateID','Home_CountryID','Work_AddressLine1','Work_CityID','Home_StateID','Work_AddressID','Home_AddressID','Home_Zipcode','Home_AddressLine1','Home_CityID']);
				inputParam.User_id=response.data.internalusers_view[1].User_id;
                usersModule.businessController.execute(new kony.mvc.Business.Command("com.kony.internalUser.fetchUserProfile",inputParam, onEditCompletion));
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
	
	TestCase_Users_GetUserDetails_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetUserDetails_CH;
    
});
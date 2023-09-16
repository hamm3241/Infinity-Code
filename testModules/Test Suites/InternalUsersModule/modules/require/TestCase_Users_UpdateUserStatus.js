define([], function() {

  	function TestCase_Users_UpdateUserStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_UpdateUserStatus, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_UpdateUserStatus.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
		   "Systemuser_id":"",
           "Status_id":""		   
		};
        function onEditCompletion(viewModel){
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
                    command.context.onPresentForm('frmUsers', onEditCompletion);
					inputParam.Systemuser_id=viewModel.usersList[1].User_id;
					inputParam.Status_id=viewModel.usersList[1].Status_id==="SID_ACTIVE"?"SID_INACTIVE":"SID_ACTIVE";
                    usersModule.presentationController.updateUserStatus("",inputParam);
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
	
	TestCase_Users_UpdateUserStatus.prototype.validate = function(){
		
    };
    
    return TestCase_Users_UpdateUserStatus;
    
});
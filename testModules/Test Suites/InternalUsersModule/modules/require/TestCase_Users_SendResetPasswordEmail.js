define([], function() {

  	function TestCase_Users_SendResetPasswordEmail(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_SendResetPasswordEmail, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_SendResetPasswordEmail.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
		   "emailId":"",
           "emailType":"resetPassword"		   
		};
        function onSendCompletion(viewModel){
			try{
               if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to check for keys').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if mail sent successfully').to.equal("SUCCESS");
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
					inputParam.emailId="anusha.vemula@kony.com";//viewModel.usersList[1].Email;
                    usersModule.presentationController.sendResetPasswordEmail(inputParam);
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
	
	TestCase_Users_SendResetPasswordEmail.prototype.validate = function(){
		
    };
    
    return TestCase_Users_SendResetPasswordEmail;
    
});
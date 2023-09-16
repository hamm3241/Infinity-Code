define([], function() {

  	function TestCase_PrivacyPolicy_deletePrivacyPolicy(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_deletePrivacyPolicy, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_deletePrivacyPolicy.prototype.execute = function(command){
		var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var self = this;
        var expect = chai.expect;
        var deleteRequestParam = {
            "user_ID":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
            "id":""
        };
        function onDeleteCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.action === "deletePrivacyPolicy"){
                    expect(viewModel, 'to get delete privacypolicy response feilds').to.include.keys(["privacyPolicy","action","response"]);
                    expect(viewModel.response, 'to verify the deleted field in privacypolicy').to.have.property('PrivacyPolicyDeleteStatus',"Successful");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onGetCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.action === "showPrivacyPolicy"){
                    expect(viewModel, 'to get response fields').to.include.keys(["privacyPolicy","action","response"]);
                    expect(viewModel.privacyPolicy, 'to verify id of privacypolicy').to.have.property('id');
                    if(viewModel.privacyPolicy.id){
                        deleteRequestParam.id = viewModel.privacyPolicy.id;
                        command.context.onPresentForm('frmPrivacyPolicy', onDeleteCompletion);
                        privacyPolicyModule.presentationController.deletePrivacyPolicy(deleteRequestParam);
                    }
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmPrivacyPolicy', onGetCompletion);
            privacyPolicyModule.presentationController.navigateTo('PrivacyPolicyModule','getPrivacyPolicy');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_deletePrivacyPolicy.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_deletePrivacyPolicy;
    
});
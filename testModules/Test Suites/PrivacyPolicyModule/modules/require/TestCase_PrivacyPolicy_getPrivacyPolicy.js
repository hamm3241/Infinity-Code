define([], function() {

  	function TestCase_PrivacyPolicy_getPrivacyPolicy(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_getPrivacyPolicy, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_getPrivacyPolicy.prototype.execute = function(command){
		var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var self = this;
        var expect = chai.expect;
		function onCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.action === "showPrivacyPolicy"){
                    expect(viewModel, 'to get privacypolicy').to.include.keys(["privacyPolicy","action","response"]);
                    expect(viewModel.privacyPolicy, 'for privacypolicy fields').to.include.all.
                      keys(['Description', 'Status_id', 'Channel_id','id','createdby']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmPrivacyPolicy', onCompletion);
            privacyPolicyModule.presentationController.navigateTo('PrivacyPolicyModule','getPrivacyPolicy');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_getPrivacyPolicy.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_getPrivacyPolicy;
    
});
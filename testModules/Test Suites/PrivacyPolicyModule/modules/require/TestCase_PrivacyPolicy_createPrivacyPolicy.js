define([], function() {

  	function TestCase_PrivacyPolicy_createPrivacyPolicy(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_createPrivacyPolicy, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_createPrivacyPolicy.prototype.execute = function(command){
		var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var self = this;
        var expect = chai.expect;
        var createRequestParam = {
            "user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
            "PrivacyPolicyData": {
                "Status_id": "SID_ACTIVE",
                "Description": btoa("abc <div>abc </div><div>abc</div>"),
                "Channel_id": "CH_ID_MOB_INT"
            }
        };
		function onCreateCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.action === "createPrivacyPolicy"){
                    expect(viewModel, 'to verify create privacypolicy response fields').to.include.keys(["action","response"]);
                    expect(viewModel.response, 'to verify create status ').to.have.property('PrivacyPolicyCreateStatus',"Successful");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmPrivacyPolicy', onCreateCompletion);
            privacyPolicyModule.presentationController.createPrivacyPolicy(createRequestParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_createPrivacyPolicy.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_createPrivacyPolicy;
    
});
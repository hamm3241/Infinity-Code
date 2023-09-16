define([], function() {

  	function TestCase_PrivacyPolicy_editPrivacyPolicy(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_editPrivacyPolicy, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_editPrivacyPolicy.prototype.execute = function(command){
		var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
			"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID, 
			"PrivacyPolicyData": {
				"Status_id": "SID_INACTIVE",
                "Description": btoa("abc <div>abc </div><div>abc abc</div>")
            }           
        };
        function onEditCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.action === "updatePrivacyPolicy"){
                    expect(viewModel, 'to get updated privacypolicy').to.include.keys(["privacyPolicy","action","response"]);
                    expect(viewModel.response, 'to get updated status of privacypolicy').to.have.property('PrivacyPolicyEditStatus',"Successful");
                    expect(viewModel.privacyPolicy, 'to verify the updated field in privacypolicy').to.have.property('Status_id',"SID_INACTIVE");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.action === "showPrivacyPolicy"){
                    command.context.onPresentForm('frmPrivacyPolicy', onEditCompletion);
                    privacyPolicyModule.presentationController.updatePrivacyPolicy(inputParam);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmPrivacyPolicy', onFetchCompletion);
            privacyPolicyModule.presentationController.navigateTo('PrivacyPolicyModule','getPrivacyPolicy');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_editPrivacyPolicy.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_editPrivacyPolicy;
    
});
define([], function() {

  	function TestCase_Policy_GetCredentialPolicies(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Policy_GetCredentialPolicies, kony.mvc.Business.CommandHandler);
  
  	TestCase_Policy_GetCredentialPolicies.prototype.execute = function(command){
		var policyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PolicyModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.policyList){
                expect(viewModel, 'to get policies').to.include.keys("policyList");
                expect(viewModel.policyList, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.policyList[0], 'for policy to have fields').to.include.keys(['id', 'policyDescription', 'policyName']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmPolicies', onCompletion);
            policyModule.presentationController.navigateTo('PolicyModule','fetchPolicyList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
		
    };
	
	TestCase_Policy_GetCredentialPolicies.prototype.validate = function(){
		
    };
    
    return TestCase_Policy_GetCredentialPolicies;
    
});
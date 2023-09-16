define([], function() {

  	function TestCase_Policy_GetCredentialPoliciesSuccessCommand(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Policy_GetCredentialPoliciesSuccessCommand, kony.mvc.Business.CommandHandler);
  
  	TestCase_Policy_GetCredentialPoliciesSuccessCommand.prototype.execute = function(command){
		var policyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PolicyModule");
        var self = this;
        var expect = chai.expect;
		function onCompletion(response) {
            try {
              if(response&&response.data){
				expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data, 'to get more than zero').to.have.length.above(0);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
              }
			}catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_FAILURE, e);
        }
        }
          try{
            policyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.policy.fetchPolicyList", {}, onCompletion));
          }catch (e) {
             this.sendResponse(command, kony.mvc.constants.STATUS_FAILURE, e);
          }
    };
	TestCase_Policy_GetCredentialPoliciesSuccessCommand.prototype.validate = function(){
		
    };
    
    return TestCase_Policy_GetCredentialPoliciesSuccessCommand;
    
});
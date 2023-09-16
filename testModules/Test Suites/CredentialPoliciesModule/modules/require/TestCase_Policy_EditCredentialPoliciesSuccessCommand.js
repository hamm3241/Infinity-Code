define([], function() {

  	function TestCase_Policy_EditCredentialPoliciesSuccessCommand(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Policy_EditCredentialPoliciesSuccessCommand, kony.mvc.Business.CommandHandler);
  
  	TestCase_Policy_EditCredentialPoliciesSuccessCommand.prototype.execute = function(command){
      var policyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PolicyModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
		   "id": "POLID1", 
		   "description":btoa("abc <div>abc </div><div>abc abc</div>")//"YWJjJm5ic3A7PGRpdj5hYmMmbmJzcDs8L2Rpdj48ZGl2PmFiYyBhYmM8L2Rpdj4="           
		};
      function onEditCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data.totalRecords, 'for policy to have total records').to.equal(1);
                expect(response.data.opstatus, 'to verify edit opstatus ').to.equal(0);    
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
         try {
            policyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.policy.updatePolicy", inputParam, onEditCompletion));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
		
    };
	
	TestCase_Policy_EditCredentialPoliciesSuccessCommand.prototype.validate = function(){
		
    };
    
    return TestCase_Policy_EditCredentialPoliciesSuccessCommand;
    
});
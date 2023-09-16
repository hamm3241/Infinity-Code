define([], function() {

  	function TestCase_Policy_EditCredentialPolicies(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Policy_EditCredentialPolicies, kony.mvc.Business.CommandHandler);
  
  	TestCase_Policy_EditCredentialPolicies.prototype.execute = function(command){
		var policyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PolicyModule");
        var self = this;
        var expect = chai.expect;
		var inputParam = {
		   "id": "", 
		   "description":btoa("abc <div>abc </div><div>abc abc</div>")//"YWJjJm5ic3A7PGRpdj5hYmMmbmJzcDs8L2Rpdj48ZGl2PmFiYyBhYmM8L2Rpdj4="           
		};
        function onEditCompletion(viewModel){
			try{
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
  function onFetchCompletion(viewModel){
   try{
               if(viewModel&&viewModel.policyList){
                    command.context.onPresentForm('frmPolicies', onEditCompletion);
					inputParam.id=viewModel.policyList[1].id;
                    policyModule.presentationController.updatePolicy(inputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
  try {
            command.context.onPresentForm('frmPolicies', onFetchCompletion);
            policyModule.presentationController.navigateTo('PolicyModule','fetchPolicyList');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }

		
    };
	
	TestCase_Policy_EditCredentialPolicies.prototype.validate = function(){
		
    };
    
    return TestCase_Policy_EditCredentialPolicies;
    
});

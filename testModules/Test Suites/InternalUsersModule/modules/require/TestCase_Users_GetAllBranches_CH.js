define([], function() {

  	function TestCase_Users_GetAllBranches_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetAllBranches_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetAllBranches_CH.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(response) {
            try {
              if(response&&response.data){
 				expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data.branch_view, 'to get more than zero').to.have.length.above(0);
                expect(response.data.branch_view[0], 'for branches to have fields').to.include.keys(['Address_id','Branch_Code','Branch_Complete_Addr','Branch_EmailId','Branch_MainBranchCode','Branch_Status_id','Branch_Typeid','Branch_WorkSchedule_id','Branch_id','City_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
			usersModule.businessController.execute(new kony.mvc.Business.Command("com.kony.internalUser.fetchAllBranches",{},onCompletion));
            } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_GetAllBranches_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetAllBranches_CH;
    
});
define([], function() {

  	function TestCase_Users_GetAllBranches(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetAllBranches, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetAllBranches.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.Branches){
                expect(viewModel, 'to get all branches').to.include.keys("Branches");
                expect(viewModel.Branches.branch_view, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.Branches.branch_view[0], 'for branches to have fields').to.include.keys(['Address_id','Branch_Code','Branch_Complete_Addr','Branch_EmailId','Branch_MainBranchCode','Branch_Status_id','Branch_Typeid','Branch_WorkSchedule_id','Branch_id','City_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmUsers',onCompletion);
            usersModule.presentationController.navigateTo('InternalUserModule','fetchAllBranches');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_GetAllBranches.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetAllBranches;
    
});
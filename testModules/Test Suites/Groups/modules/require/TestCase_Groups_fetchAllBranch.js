define([], function() {

  	function TestCase_Groups_fetchAllBranch(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchAllBranch, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchAllBranch.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
        var self = this;
        var expect = chai.expect;
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.branches && viewModel.context === ""){
                    expect(viewModel.branches,'to get branches').to.have.length.above(0);
                    expect(viewModel.branches[0], 'to verify fields in branch').to.include.all.
                      keys(['Branch_Code', 'Branch_Description', 'Branch_Name','Branch_id','Branch_DisplayName']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS,viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmGroups', onFetchCompletion);
            groupsModule.presentationController.navigateTo('CustomerGroupsModule','fetchAllBranches');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Groups_fetchAllBranch.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchAllBranch;
    
});
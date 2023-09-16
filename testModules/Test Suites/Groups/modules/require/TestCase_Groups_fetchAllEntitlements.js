define([], function() {

  	function TestCase_Groups_fetchAllEntitlements(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchAllEntitlements, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchAllEntitlements.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
        var self = this;
        var expect = chai.expect;
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.context === "createGroup"){
                    expect(viewModel,'to verify entitlements records').to.have.property('entitlements');
                    expect(viewModel.entitlements,'to get entitlements').to.have.length.above(0);
                    expect(viewModel.entitlements[0], 'to verify fields in entitlement record').to.include.all.
                      keys(['Description', 'TransactionFee_id', 'Channel_id','Name','id','Status_id','TransactionLimit_id','Type_id']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmGroups', onFetchCompletion);
            groupsModule.presentationController.fetchEntitlements(false,"");
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Groups_fetchAllEntitlements.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchAllEntitlements;
    
});
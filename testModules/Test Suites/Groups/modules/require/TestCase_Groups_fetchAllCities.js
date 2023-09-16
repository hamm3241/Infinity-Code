define([], function() {

  	function TestCase_Groups_fetchAllCities(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchAllCities, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchAllCities.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
        var self = this;
        var expect = chai.expect;
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.cities && viewModel.context === ""){
                    expect(viewModel.cities,'to get cities').to.have.length.above(0);
                    expect(viewModel.cities[0], 'to verify fields in city').to.include.all.
                      keys(['id', 'Name', 'Country_id','Region_id']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS,viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmGroups', onFetchCompletion);
            groupsModule.presentationController.navigateTo('CustomerGroupsModule','fetchAllCities');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Groups_fetchAllCities.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchAllCities;
    
});
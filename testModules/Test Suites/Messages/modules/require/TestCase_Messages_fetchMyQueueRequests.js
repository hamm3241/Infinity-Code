define([], function() {

  	function TestCase_Messages_fetchMyQueueRequests(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchMyQueueRequests, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchMyQueueRequests.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
        var inputParam = {"csrRepID":"admin1","currPageIndex":"1","recordsPerPage":10,"requestAssignedTo":"admin1","requestStatusID":"[SID_OPEN,SID_INPROGRESS]","sortCriteria":"","sortOrder":"asc"};
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.messages){
					expect(viewModel, 'to get Messages').to.include.keys(["messages"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        function onFetchCompletion(viewModel){
   try{
               if(viewModel){
                    command.context.onPresentForm('frmCSR', onCompletion);
                    CSRModule.presentationController.fetchMyQueueRequests(inputParam);
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
        try {
            command.context.onPresentForm('frmCSR', onFetchCompletion);
            CSRModule.presentationController.navigateTo('CSRModule','showCSR');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Messages_fetchMyQueueRequests.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchMyQueueRequests;
    
});
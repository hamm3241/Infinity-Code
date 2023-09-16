define([], function() {

  	function TestCase_Messages_fetchSearchRequests(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchSearchRequests, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchSearchRequests.prototype.execute = function(command){
        var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
        var inputParam ={"csrRepID":"UID10","searchKey":"j","requestAssignedTo":"","requestCategory":"","messageRepliedBy":"","dateInitialPoint":"","dateFinalPoint":"","requestStatusID":"[SID_OPEN]","currPageIndex":"1","sortCriteria":"","recordsPerPage":10,"sortOrder":"asc"};
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
                    CSRModule.presentationController.fetchSearchRequests(inputParam);
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
	
	TestCase_Messages_fetchSearchRequests.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchSearchRequests;
    
});
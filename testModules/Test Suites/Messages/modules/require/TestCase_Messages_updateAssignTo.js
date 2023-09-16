define([], function() {

  	function TestCase_Messages_updateAssignTo(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_updateAssignTo, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_updateAssignTo.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
      var input = {
          "assignedto":"",
        "requestid":"REC035509",
        "requeststatus":"SID_INPROGRESS"
        };
      var currentStatus = "Mark as IN PROGRESS";
      var showToastMsg = true;
      function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.categories){
					expect(viewModel, 'to get Messages').to.include.keys(["categories","requests","users"]);
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
                    CSRModule.presentationController.updateRequestStatus(input,currentStatus,showToastMsg);
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
	
	TestCase_Messages_updateAssignTo.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_updateAssignTo;
    
});
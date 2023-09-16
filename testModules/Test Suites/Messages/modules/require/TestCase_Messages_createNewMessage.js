define([], function() {

  	function TestCase_Messages_createNewMessage(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_createNewMessage, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_createNewMessage.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
      var input = {
          "attachments":[],
          "customer_id":"",
          "messagedescription":"SGkgJmx0OzxjdXN0b21lcm5hbWU+Jmd0Oyw8YnI+PGJyPktvbnkgQmFuayBjb252ZXlzIGEgbm90ZSBvZiB0aGFua3MgZm9yIGJlaW5nIGl0J3MgY3VzdG9tZXIuPGJyPjxicj5SZWdhcmRzLDxicj48YnI+Jmx0OzxjdXN0b21lciBzZXJ2aWNlPSIiIHJlcD0iIiBuYW1lPSIiPiZndDs8YnI+S29ueSBCYW5rPC9jdXN0b21lcj48L2N1c3RvbWVybmFtZT4=",
          "messagestatus":"SENT",
          "priority":"High",
          "requestcategory_id":"RCID_ACCOUNTS",
          "requestid":"",
          "requestmessage_id":"",
          "requeststatus":"SID_INPROGRESS",
          "requestsubject":"ashbfhsc",
          "username":",Cavanaugh@123"
        };
      function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.templates){
					expect(viewModel, 'to get Messages').to.include.keys(["templates"]);
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
                    CSRModule.presentationController.createNewMessage(input);
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
	
	TestCase_Messages_createNewMessage.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_createNewMessage;
    
});
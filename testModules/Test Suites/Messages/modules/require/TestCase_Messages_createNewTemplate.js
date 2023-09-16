define([], function() {

  	function TestCase_Messages_createNewTemplate(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_createNewTemplate, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_createNewTemplate.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
      var input = {
          "additionalNote":"mhasdj",
        "templateBody":"bXNqYWJkamhkZ3M=",
        "templateName":"gxhasgdj"
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
                    CSRModule.presentationController.createNewTemplate(input);
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
	
	TestCase_Messages_createNewTemplate.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_createNewTemplate;
    
});
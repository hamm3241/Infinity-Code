define([], function() {

  	function TestCase_Messages_fetchTemplateByID(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchTemplateByID, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchTemplateByID.prototype.execute = function(command){
		var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
        var inputParam ={"templateID":"MSG_TEMPLATE_ID_01"};
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
                    CSRModule.presentationController.fetchTemplateByID(inputParam);
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
	
	TestCase_Messages_fetchTemplateByID.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchTemplateByID;
    
});
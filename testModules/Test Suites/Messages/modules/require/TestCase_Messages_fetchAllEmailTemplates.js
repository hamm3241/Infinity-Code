define([], function() {

  	function TestCase_Messages_fetchAllEmailTemplates(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchAllEmailTemplates, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchAllEmailTemplates.prototype.execute = function(command){
		 var CSRModule =  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.templates ){
					expect(viewModel, 'to get email templates').to.include.keys("templates");
                expect(viewModel.templates.data.messagetemplate, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.templates.data.messagetemplate[0], 'for messageTemplates to have fields').to.include.keys(['AdditionalInfo','Body', 'Name', 'id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmCSR',  onCompletion);
            CSRModule.presentationController.navigateTo('CSRModule','fetchAllEmailTemplates');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Messages_fetchAllEmailTemplates.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchAllEmailTemplates;
    
});
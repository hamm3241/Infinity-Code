define([], function() {

  	function TestCase_Messages_fetchAllCategories(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Messages_fetchAllCategories, kony.mvc.Business.CommandHandler);
  
  	TestCase_Messages_fetchAllCategories.prototype.execute = function(command){
		 var CSRModule =  kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CSRModule");
        var self = this;
        var expect = chai.expect;
         function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.templates){
					expect(viewModel, 'to get templates').to.include.keys("templates");
                expect(viewModel.templates.data.messagetemplate, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.templates.data.messagetemplate[0], 'for templates to have fields').to.include.keys(['AdditionalInfo','Body', 'Name', 'creadtedts', 'createdby','id','lastmodifiedts','softdeleteflag']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmCSR', onCompletion);
            CSRModule.presentationController.navigateTo('CSRModule','fetchAllCategories');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Messages_fetchAllCategories.prototype.validate = function(){
		
    };
    
    return TestCase_Messages_fetchAllCategories;
    
});
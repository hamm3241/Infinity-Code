define([], function() {

  	function TestCase_FAQS_getFAQCategories(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_FAQS_getFAQCategories, kony.mvc.Business.CommandHandler);
  
  	TestCase_FAQS_getFAQCategories.prototype.execute = function(command){
		var FAQsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FAQsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.categories){
					expect(viewModel, 'to get FAQ Categories').to.include.keys("categories","context","opt");
                expect(viewModel.categories, 'to get more than zero').to.have.length.above(0);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmFAQ', onCompletion);
            FAQsModule.presentationController.navigateTo('FAQsModule','fetchCategories');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_FAQS_getFAQCategories.prototype.validate = function(){
		
    };
    
    return TestCase_FAQS_getFAQCategories;
    
});
define([], function() {

  	function TestCase_FAQS_getFAQs(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_FAQS_getFAQs, kony.mvc.Business.CommandHandler);
  
  	TestCase_FAQS_getFAQs.prototype.execute = function(command){
		var FAQsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FAQsModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
				if(viewModel && viewModel.records){
					expect(viewModel, 'to get FAQs').to.include.keys("records");
                expect(viewModel.records, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.records[0], 'for FAQs to have fields').to.include.keys(['Answer','CategoryId', 'CategoryName', 'Channel_id', 'Question','QuestionCode','Status_id','id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
				}
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmFAQ', onCompletion);
            FAQsModule.presentationController.navigateTo('FAQsModule','fetchFAQs');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_FAQS_getFAQs.prototype.validate = function(){
		
    };
    
    return TestCase_FAQS_getFAQs;
    
});
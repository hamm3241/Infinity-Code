define([], function() {

  	function TestCase_FAQS_editFAQs(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_FAQS_editFAQs, kony.mvc.Business.CommandHandler);
  
  	TestCase_FAQS_editFAQs.prototype.execute = function(command){
		var FAQsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FAQsModule");
        var self = this;
        var expect = chai.expect;
		var inputParam =  {
          "user_ID": "admin2",
          "listOfFAQs": [
            {
               "id": "",
               "QuestionCode": "Q04_Code",
               "Question": "Question 04 New",
               "Answer": "Question 04 New Answer",
               "Channel_id": "CH_01",
               "Status_id": "SID_ACTIVE"
            }
          ]
        };
        function onEditCompletion(viewModel){
			try{
               if(viewModel&&viewModel.records){
                expect(viewModel, 'to edit FAQs').to.include.keys("httpStatusCode","httpresponse","opstatus","records");
                expect(viewModel.records, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.records[0], 'for FAQs to have fields').to.include.keys(["Answer","CategoryId","CategoryName","Channel_id","Question","QuestionCode","Status_id","id"]);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
  }
  function onFetchCompletion(viewModel){
   try{
               if(viewModel&&viewModel.records){
                    command.context.onPresentForm('frmFAQ', onEditCompletion);
					inputParam.id=viewModel.records[1].id;
                    FAQsModule.presentationController.updateFAQs(inputParam,"callFetch",function callback(){kony.print("successful");});
              }
   }catch(e){
    self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
   }
  }
  try {
            command.context.onPresentForm('frmFAQ', onFetchCompletion);
            FAQsModule.presentationController.navigateTo('FAQsModule','fetchFAQs');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_FAQS_editFAQs.prototype.validate = function(){
		
    };
    
    return TestCase_FAQS_editFAQs;
    
});
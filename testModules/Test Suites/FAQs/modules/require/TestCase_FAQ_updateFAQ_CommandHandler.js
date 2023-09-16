define([], function() {
    function TestCase_FAQ_updateFAQ_CommandHandler(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
    inheritsFrom(TestCase_FAQ_updateFAQ_CommandHandler, kony.mvc.Business.CommandHandler);
    TestCase_FAQ_updateFAQ_CommandHandler.prototype.execute = function(command) {
        var expect = chai.expect;
        var FAQsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FAQsModule");
        var inputParam = {
            "user_ID": "admin2",
            "listOfFAQs": [{
                "id": "",
                "QuestionCode": "",
                "Question": "",
                "Answer": "Question 04 New Answer",
                "Channel_id": "",
                "Status_id": "SID_ACTIVE"
            }]
        };

        function onUpdateCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data, 'to verify FAQ edit success').to.have.property('failureFAQManageOpRecord', "httpStatusCode", "httpresponse", "successFAQManageOpRecord");
                expect(response.data.opstatus, 'to verify edit opstatus ').to.equal(0);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }

        function onFetchCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data, 'to verify FAQs response').to.include.all.keys(["httpStatusCode", "httpresponse", "opstatus", "records"]);
                expect(response.data.records, 'to verify FAQs exsist').to.have.length.above(0);
                expect(response.data.opstatus, 'to verify fetch opstatus ').to.equal(0);
                inputParam.listOfFAQs.id = response.data.records[0].id;
                inputParam.listOfFAQs.QuestionCode = response.data.records[0].QuestionCode;
                inputParam.listOfFAQs.Question = response.data.records[0].Question;
                inputParam.listOfFAQs.Channel_id = response.data.records[0].Channel_id;
                FAQsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.faqs.updateFAQs", inputParam, onUpdateCompletion));
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            FAQsModule.businessController.execute(new kony.mvc.Business.Command("com.kony.faqs.fetchAllFAQs", {}, onFetchCompletion));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
    TestCase_FAQ_updateFAQ_CommandHandler.prototype.validate = function() {};
    return TestCase_FAQ_updateFAQ_CommandHandler;
});
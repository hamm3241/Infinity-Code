define([], function() {

  function TestCase_Security_editPhraseStatus_CH_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_editPhraseStatus_CH_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_editPhraseStatus_CH_CommandHandler.prototype.execute = function (command) {
    var self = this;

    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

    var testInput = {"phraseStatus" : 1};

    securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.editPhraseStatus", testInput, onEditPhraseStatusCompletion));

    function onEditPhraseStatusCompletion(response) {
      if(response.data) {
        try {
          // Response JSON structure comparison
          expect(response.data, 'response.data to have fields').to.include.keys(['httpStatusCode', 'opstatus', 'updatedRecords']);
          // JSON values comparison
          expect(response.data.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
          expect(response.data.opstatus,'opstatus to be 0').to.equal(0);
          expect(response.data.updatedRecords, 'response.data.updatedRecords to be 1').to.equal(1);

          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
        } 
        catch (e) {
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    };
  };

  TestCase_Security_editPhraseStatus_CH_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_editPhraseStatus_CH_CommandHandler;

});
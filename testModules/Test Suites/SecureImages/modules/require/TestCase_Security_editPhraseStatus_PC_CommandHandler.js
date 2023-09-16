define([], function() {

  function TestCase_Security_editPhraseStatus_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_editPhraseStatus_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_editPhraseStatus_PC_CommandHandler.prototype.execute = function (command) {
    var self = this;

    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

    var testInput = {"phraseStatus" : 1};

    command.context.onPresentForm('frmSecureImage', onEditPhraseStatusCompletion);
    securityModule.presentationController.editPhraseStatus(testInput);

    function onEditPhraseStatusCompletion(response) {
      if(response.action == "showPhrase") {
        try {
          // Response JSON structure comparison
          expect(response, 'response to have fields').to.include.keys(['phrase']);
          // JSON values comparison
          expect(response.phrase, 'response.phrase to be either 0 or 1').to.satisfy(
            function() {
              if(response.phrase == "0" || response.phrase == "1") {
                return true;
              }
              else {
                return false;
              }
            }
          );

          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
        } 
        catch (e) {
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    };
  };

  TestCase_Security_editPhraseStatus_PC_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_editPhraseStatus_PC_CommandHandler;

});
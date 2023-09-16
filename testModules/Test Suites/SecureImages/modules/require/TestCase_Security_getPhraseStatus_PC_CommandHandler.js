define([], function() {

  function TestCase_Security_getPhraseStatus_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_getPhraseStatus_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_getPhraseStatus_PC_CommandHandler.prototype.execute = function (command) {
    var self = this;

    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

    command.context.onPresentForm('frmSecureImage', onCompletion);
    securityModule.presentationController.getPhraseStatus();

    function onCompletion(viewModel) {
      if(viewModel.action == "showPhrase") {
        try {
          // Response JSON structure comparison
          expect(viewModel, 'response to have fields').to.include.keys(['phrase']);
          // JSON values comparison
          expect(viewModel.phrase, 'response.data to be either 0 or 1').to.satisfy(
            function() {
              if(viewModel.phrase == "0" || viewModel.phrase == "1") {
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
    }
  };

  TestCase_Security_getPhraseStatus_PC_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_getPhraseStatus_PC_CommandHandler;

});
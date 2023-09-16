define([], function() {

  function TestCase_Security_getPhraseStatus_CH_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_getPhraseStatus_CH_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_getPhraseStatus_CH_CommandHandler.prototype.execute = function (command) {
    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

    securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.getPhraseStatus", {}, onCompletion));

    function onCompletion(response) {
      try {
        expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
        // Response JSON structure comparison
        expect(response, 'response to have fields').to.include.keys(['data']);
        // JSON values comparison
        expect(response.data, 'response.data to be either 0 or 1').to.satisfy(
          function() {
            if(response.data == "0" || response.data == "1") {
              return true;
            }
            else {
              return false;
            }
          }
        );

        this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
      } 
      catch (e) {
        this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
  };

  TestCase_Security_getPhraseStatus_CH_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_getPhraseStatus_CH_CommandHandler;

});
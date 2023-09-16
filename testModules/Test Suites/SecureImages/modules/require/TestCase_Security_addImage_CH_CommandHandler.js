define([], function() {

  function TestCase_Security_addImage_CH_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_addImage_CH_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_addImage_CH_CommandHandler.prototype.execute = function (command) {
    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    
    var testInput = [];
    var testImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    testInput.push(testImage);
    
    securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.addImage", testInput, onCompletion));

    function onCompletion(response) {
      try {
        expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
        this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
      } 
      catch (e) {
        this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
  };

  TestCase_Security_addImage_CH_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_addImage_CH_CommandHandler;

});
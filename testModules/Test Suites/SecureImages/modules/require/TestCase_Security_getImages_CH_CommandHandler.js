define([], function() {

  function TestCase_Security_getImages_CH_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_getImages_CH_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_getImages_CH_CommandHandler.prototype.execute = function (command) {
    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");
    
    securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.getImages", {}, onCompletion));

    function onCompletion(response) {
      try {
        expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
        // Response JSON structure comparison
        expect(response.data, 'response to have fields').to.include.keys(['records']);
        // JSON values comparison
        if(response.data.records.length > 0) {
          expect(response.data.records[0], 'response.records to have fields').to.include.keys
        	(['UserCount', 'SecurityImage_id', 'SecurityImage_Status', 'softdeleteflag', 'SecurityImageBase64String']);
        }
        
        this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
      } 
      catch (e) {
        this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
  };

  TestCase_Security_getImages_CH_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_getImages_CH_CommandHandler;

});
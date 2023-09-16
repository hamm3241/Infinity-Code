define([], function() {

  function TestCase_Security_deleteImage_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_deleteImage_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_deleteImage_CommandHandler.prototype.execute = function (command) {
    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

    securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.getImages", {}, onGetImagesCompletion));

    function onGetImagesCompletion(getImagesResponse) {
      if(getImagesResponse.data.records.length > 0) {
        try {
          var testInput = {"id" : getImagesResponse.data.records[0].SecurityImage_id};

          securityModule.businessController.execute(new kony.mvc.Business.Command("com.kony.security.deleteImage", testInput, onDeleteImageCompletion));

          function onDeleteImageCompletion(response) {
            try {
              expect(response.status,'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
              this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } 
            catch (e) {
              this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
          };
        } 
        catch (e) {
          this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    }
  };

  TestCase_Security_deleteImage_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_deleteImage_CommandHandler;

});
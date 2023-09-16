define([], function() {

  function TestCase_Security_addImage_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Security_addImage_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_Security_addImage_PC_CommandHandler.prototype.execute = function (command) {
    var self = this;
    
    var expect = chai.expect;
    var securityModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SecurityModule");

    var testInput = [];
    var testImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    testInput.push(testImage);

    command.context.onPresentForm('frmSecureImage', onCompletion);
    securityModule.presentationController.addNewImage(testInput);

    function onCompletion(viewModel) {
      if(viewModel.action == "showImages") {
        try {
          expect(viewModel.images.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
          expect(viewModel.images.opstatus,'opstatus to be 0').to.equal(0);
          // Response JSON structure comparison
          expect(viewModel.images, 'viewModel.images to have fields').to.include.keys(['records']);
          // JSON values comparison
          if(viewModel.images.records.length > 0) {
            expect(viewModel.images.records[0], 'viewModel.images.records to have fields').to.include.keys
            (['UserCount', 'SecurityImage_id', 'SecurityImage_Status', 'softdeleteflag', 'SecurityImageBase64String']);
          }
          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
        } 
        catch (e) {
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    }
  };

  TestCase_Security_addImage_PC_CommandHandler.prototype.validate = function(){
  };

  return TestCase_Security_addImage_PC_CommandHandler;

});
define([], function() {

  function TestCase_changeLocationStatus_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_changeLocationStatus_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_changeLocationStatus_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");

    masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.fetchAllLocations", {}, onFetchLocationsCompletion));

    function onFetchLocationsCompletion(fetchLocationsResponse) {
      if(fetchLocationsResponse.data.data.length > 0) {
        try {

          masterDataModule.presentationController.changeStatusOfLocation("SID_INACTIVE", fetchLocationsResponse.data.data[0].id, changeStatusOfLocationCallback);

          function changeStatusOfLocationCallback(changeStatusOfLocationResponse) {
            try {
              expect(changeStatusOfLocationResponse,'changeStatusOfLocationResponse to be success').to.equal(undefined);
              self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } 
            catch (e) {
              self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
          }
        } 
        catch (e) {
          this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    }
  };

  TestCase_changeLocationStatus_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_changeLocationStatus_PC_CommandHandler;
});
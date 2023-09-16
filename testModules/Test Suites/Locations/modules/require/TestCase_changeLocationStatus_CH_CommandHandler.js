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
          var changeLocationParam = {
            "Location_id": fetchLocationsResponse.data.data[0].id,
            "Status_id": "SID_INACTIVE"
          };

          masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.changeLocationStatus", changeLocationParam, onChangeLocationStatusCompletion));

          function onChangeLocationStatusCompletion(changeLocationResponse) {
            try {
              expect(changeLocationResponse.data.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
              expect(changeLocationResponse.data.opstatus,'opstatus to be 0').to.equal(0);
              // Response JSON structure comparison
              expect(changeLocationResponse.data, 'changeLocationResponse.data to have fields').to.include.keys(['ManageLocation']);
              expect(changeLocationResponse.data.ManageLocation, 'changeLocationResponse.data.ManageLocation to have fields').to.include.keys(['ManageLocationStatus']);
              // JSON values comparison
              expect(changeLocationResponse.data.ManageLocation.ManageLocationStatus,'ManageLocationStatus to be Success').to.equal("Success");
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
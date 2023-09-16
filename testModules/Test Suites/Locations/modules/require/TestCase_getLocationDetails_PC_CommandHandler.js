define([], function() {

  function TestCase_getLocationDetails_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_getLocationDetails_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_getLocationDetails_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");

    masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.fetchAllLocations", {}, onFetchLocationsCompletion));

    function onFetchLocationsCompletion(fetchLocationsResponse) {
      if(fetchLocationsResponse.data.data.length > 0) {
        try {

          masterDataModule.presentationController.getLocationDetails(fetchLocationsResponse.data.data[0].id, getLocationDetailsCallback);

          function getLocationDetailsCallback(getLocationDetailsResponse) {
            try {
              expect(getLocationDetailsResponse, 'getLocationDetailsResponse to have fields').to.include.keys
              (['ADDRESS', 'Location_id', 'Location_Code', 'Location_Name', 'Location_Display_Name', 'Location_Description', 
                'Location_EmailId', 'Location_Phone_Number', 'Location_IsMainBranch', 'Location_Latitude', 'Location_Longitude',
                'Location_Status_id', 'Location_Type_id', 'Location_Address_id', 'Location_WorkScheduleId', 'Location_DeleteFlag']);
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

  TestCase_getLocationDetails_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_getLocationDetails_PC_CommandHandler;
});
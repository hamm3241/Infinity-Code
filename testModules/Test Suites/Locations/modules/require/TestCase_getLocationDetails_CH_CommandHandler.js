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
          var getLocationParam = {
            "Location_id": fetchLocationsResponse.data.data[0].id
          };

          masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.getLocationDetails", getLocationParam, onGetLocationDetailsCompletion));

          function onGetLocationDetailsCompletion(getLocationsResponse) {
            try {
              expect(getLocationsResponse.data.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
              expect(getLocationsResponse.data.opstatus,'opstatus to be 0').to.equal(0);
              // Response JSON structure comparison
              expect(getLocationsResponse.data, 'getLocationsResponse.data to have fields').to.include.keys(['records']);
              // JSON values comparison
              if(getLocationsResponse.data.records.length > 0) {
                expect(getLocationsResponse.data.records[0], 'getLocationsResponse.data.data to have fields').to.include.keys
                (['ADDRESS', 'Location_Address_id', 'Location_Code', 'Location_DeleteFlag', 'Location_Description', 'Location_Display_Name', 'Location_EmailId', 
                  'Location_IsMainBranch', 'Location_Latitude', 
                  'Location_Longitude', 'Location_Name', 'Location_Phone_Number', 'Location_Status_id', 'Location_Type_id', 'Location_WorkScheduleId', 
                  'Location_id', 'Weekday_EndTime', 'Weekday_StartTime']);
              }
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
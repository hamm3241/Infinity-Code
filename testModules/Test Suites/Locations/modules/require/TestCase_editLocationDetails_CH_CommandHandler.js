define([], function() {

  function TestCase_editLocationDetails_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_editLocationDetails_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_editLocationDetails_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");

    masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.fetchAllLocations", {}, onFetchLocationsCompletion));

    function onFetchLocationsCompletion(fetchLocationsResponse) {
      if(fetchLocationsResponse.data.data.length > 0) {
        try {
          var editLocationParam = {
            "User_ID": "UID11",
            "Location_id": fetchLocationsResponse.data.data[0].id,
            "Status_id": "SID_ACTIVE",
            "Location_Details": {
              "Name": "Test Location Name",
              "DisplayName": "Test Location Display Name",
              "Description": "Test Location Description",
              "Type_id": kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch"),
              "Code": fetchLocationsResponse.data.data[0].Code,
              "Email": "test@bank.com",
              "IsMainBranch": "false",
              "PhoneNumber": "9000000000"
            },
            "Service_Details": {
              "AddedServices": [],
              "RemovedServices": []
            },
            "Address_Details": {
              "AddressID": fetchLocationsResponse.data.data[0].Address_id,
              "City_id": "C1",
              "AddressLine1": "Test Location Address",
              "Longitude": "90",
              "Latitude": "90",
              "ZipCode": "500081",
              "Region_id": "R1",
              "Country_id": "Con1"
            },
            "Schedule_Details": {
              "WorkScheduleID": fetchLocationsResponse.data.data[0].WorkSchedule_id,
              "WorkScheduleDescription": "",
              "WeekendWorkingDays": {
                "AddedDays": [],
                "RemovedDays": []
              },
              "WeekDayStartTime": "",
              "WeekDayEndTime": "",
              "WeekEndStartTime": "",
              "WeekEndEndTime": ""
            }
          };

          masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.editLocationDetails", editLocationParam, onEditLocationCompletion));

          function onEditLocationCompletion(editLocationResponse) {
            try {
              expect(editLocationResponse.data.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
              expect(editLocationResponse.data.opstatus,'opstatus to be 0').to.equal(0);
              // Response JSON structure comparison
              expect(editLocationResponse.data, 'addLocationResponse.data to have fields').to.include.keys
              (['ManageLocation', 'ManageLocationAddress', 'ManageLocationServices', 'ManageLocationWorkSchedule']);
              expect(editLocationResponse.data.ManageLocation, 'ManageLocation to have fields').to.include.keys(['ManageLocationStatus']);
              expect(editLocationResponse.data.ManageLocationAddress, 'ManageLocationAddress to have fields').to.include.keys(['ManageLocationAddressStatus']);
              // JSON values comparison
              expect(editLocationResponse.data.ManageLocation.ManageLocationStatus,'ManageLocationStatus to be Success').to.equal("Success");
              expect(editLocationResponse.data.ManageLocationAddress.ManageLocationAddressStatus,'ManageLocationAddressStatus to be Success').to.equal("Success");
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

  TestCase_editLocationDetails_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_editLocationDetails_PC_CommandHandler;
});
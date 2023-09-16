define([], function() {

  function TestCase_addNewLocation_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_addNewLocation_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_addNewLocation_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");

    var addNewLocationParam = {
      "User_ID": "UID11",
      "Location_id": "NULL",
      "Status_id": "SID_ACTIVE",
      "Location_Details": {
        "Name": "Test Location Name",
        "DisplayName": "Test Location Display Name",
        "Description": "Test Location Description",
        "Type_id": kony.i18n.getLocalizedString("i18n.frmLocationsController.Branch"),
        "Code": String(parseInt(Math.random()*100000, 10)),
        "Email": "test@bank.com",
        "IsMainBranch": "false",
        "PhoneNumber": "9000000000"
      },
      "Service_Details": {
        "AddedServices": [],
        "RemovedServices": []
      },
      "Address_Details": {
        "AddressID": "NULL",
        "City_id": "C1",
        "AddressLine1": "Test Location Address",
        "Longitude": "90",
        "Latitude": "90",
        "ZipCode": "500081",
        "Region_id": "R1",
        "Country_id": "Con1"
      },
      "Schedule_Details": {
        "WorkScheduleID": "NULL",
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
    
    masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.addNewLocation", addNewLocationParam, onAddLocationCompletion));

    function onAddLocationCompletion(addLocationResponse) {
      try {
        expect(addLocationResponse.data.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
        expect(addLocationResponse.data.opstatus,'opstatus to be 0').to.equal(0);
        // Response JSON structure comparison
        expect(addLocationResponse.data, 'addLocationResponse.data to have fields').to.include.keys
        	(['ManageLocation', 'ManageLocationAddress', 'ManageLocationServices', 'ManageLocationWorkSchedule']);
        expect(addLocationResponse.data.ManageLocation, 'ManageLocation to have fields').to.include.keys(['ManageLocationStatus']);
        expect(addLocationResponse.data.ManageLocationAddress, 'ManageLocationAddress to have fields').to.include.keys(['ManageLocationAddressStatus']);
        // JSON values comparison
        expect(addLocationResponse.data.ManageLocation.ManageLocationStatus,'ManageLocationStatus to be Success').to.equal("Success");
        expect(addLocationResponse.data.ManageLocationAddress.ManageLocationAddressStatus,'ManageLocationAddressStatus to be Success').to.equal("Success");
        
        self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
      }
      catch (e) {
        self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
  };

  TestCase_addNewLocation_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_addNewLocation_PC_CommandHandler;
});
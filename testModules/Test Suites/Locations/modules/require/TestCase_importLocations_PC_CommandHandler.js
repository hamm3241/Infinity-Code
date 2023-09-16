define([], function() {

  function TestCase_importLocations_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_importLocations_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_importLocations_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");

    var importLocationsContent = "Code,Name,Display Name,Email ID,Type (Branch/ATM),Status (Active/Inactive),Main Branch (Yes/No),Description,"+
        "Street Address,City,Region,Zipcode,Country,Phone Number,Latitude,Longitude,"+
        "Weekday timings from,Weekday timings to,Weekend (Yes/No),[If yes] Weekend days (Saturday/Sunday),"+
        "[If yes] Weekend timings from,[If yes] Weekend timings to,List of services\r\n"+
        String(parseInt(Math.random()*100000, 10))+",Import Locations Bank,Import Locations Bank,importLocations@bank.com,Branch,Active,Yes,"+
        "Import Locations Bank Description,Import Locations Bank Address,Hyderabad,Telangana,500090,India,9123456789,"+
        "17.385044,78.486671,11:00 AM,7:00 PM,Yes,Sunday,11:00 AM,6:00 PM,P2P";

    var importLocationsFile = new File([importLocationsContent], "importLocations.csv", {type: "text/csv"});
    var importLocationsJSON = {
      csvFile: importLocationsFile
    };

    command.context.onPresentForm('frmLocations', onImportLocationsCompletion);
    masterDataModule.presentationController.importLocationsCSVFile(importLocationsJSON);

    function onImportLocationsCompletion(viewModel) {
      if(viewModel.action == "showImportLocationsResponseCount") {
        try {
          expect(viewModel.locationsResponse, 'viewModel.locationsResponse to have fields').to.include.keys(['importLocationsResponse']);
          expect(viewModel.locationsResponse.importLocationsResponse, 'importLocationsResponse to have fields').to.include.keys
          (['opstatus', 'httpStatusCode', 'correctTemplate', 'successCount', 'failureCount']);
          // Response JSON structure comparison
          expect(viewModel.locationsResponse.importLocationsResponse.correctTemplate, 'correctTemplate to be true').to.equal(true);
          expect(viewModel.locationsResponse.importLocationsResponse.opstatus, 'opstatus to be 0').to.equal(0);
          expect(viewModel.locationsResponse.importLocationsResponse.httpStatusCode, 'httpStatusCode to be 0').to.equal(0);
          expect(viewModel.locationsResponse.importLocationsResponse.successCount, 'successCount to be 1').to.equal(1);
          expect(viewModel.locationsResponse.importLocationsResponse.failureCount, 'failureCount to be 0').to.equal(0);

          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
        }
        catch (e) {
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    }
  };

  TestCase_importLocations_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_importLocations_PC_CommandHandler;
});
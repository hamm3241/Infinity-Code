define([], function() {

  function TestCase_importLocations_CH_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_importLocations_CH_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_importLocations_CH_CommandHandler.prototype.execute = function(command) {
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
    var importLocationsParam = {
      csvFile: importLocationsFile
    };
    
    masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.importLocationsCSVFile", importLocationsParam, onImportLocationsCompletion));

    function onImportLocationsCompletion(importResponse) {
      try {
        expect(importResponse, 'importResponse to have fields').to.include.keys(['data']);
        expect(importResponse.data, 'importResponse.data to have fields').to.include.keys(['importLocationsResponse']);
        // Response JSON structure comparison
        expect(importResponse.data.importLocationsResponse.httpStatusCode, 'httpStatusCode to be 0').to.equal(0);
        expect(importResponse.data.importLocationsResponse.opstatus, 'opstatus to be 0').to.equal(0);
        expect(importResponse.data.importLocationsResponse, 'importResponse.data.importLocationsResponse to have fields').to.include.keys
        (['correctTemplate', 'successCount', 'failureCount']);
        expect(viewModel.locationsResponse.importLocationsResponse.correctTemplate, 'correctTemplate to be true').to.equal(true);
        expect(importResponse.data.importLocationsResponse.successCount, 'successCount to be 1').to.equal(1);
        expect(importResponse.data.importLocationsResponse.failureCount, 'failureCount to be 0').to.equal(0);
        
        self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
      }
      catch (e) {
        self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
  };

  TestCase_importLocations_CH_CommandHandler.prototype.validate = function() {};

  return TestCase_importLocations_CH_CommandHandler;
});
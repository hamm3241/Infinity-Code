define([], function() {

  function TestCase_fetchAllLocations_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_fetchAllLocations_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_fetchAllLocations_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");
    
    masterDataModule.businessController.execute(new kony.mvc.Business.Command("com.kony.masterData.fetchAllLocations", {}, onFetchLocationsCompletion));

    function onFetchLocationsCompletion(fetchLocationsResponse) {
        try {
          expect(fetchLocationsResponse.data.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
          expect(fetchLocationsResponse.data.opstatus,'opstatus to be 0').to.equal(0);
          // Response JSON structure comparison
          expect(fetchLocationsResponse.data, 'fetchLocationsResponse.data to have fields').to.include.keys(['data']);
          // JSON values comparison
          if(fetchLocationsResponse.data.data.length > 0) {
            expect(fetchLocationsResponse.data.data[0], 'fetchLocationsResponse.data.data to have fields').to.include.keys
            (['Address_id', 'Code', 'Description', 'DisplayName', 'EmailId', 'IsMainBranch', 'Name', 'PhoneNumber', 'PhoneNumber', 
              'Status_id', 'Type_id', 'WorkSchedule_id', 'createdts', 'id', 'lastmodifiedts', 'softdeleteflag', 'synctimestamp']);
          }
          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
        } 	
        catch (e) {
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    }
  };

  TestCase_fetchAllLocations_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_fetchAllLocations_PC_CommandHandler;
});
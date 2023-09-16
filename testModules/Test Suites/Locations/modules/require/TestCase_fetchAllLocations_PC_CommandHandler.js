define([], function() {

  function TestCase_fetchAllLocations_PC_CommandHandler(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_fetchAllLocations_PC_CommandHandler, kony.mvc.Business.CommandHandler);

  TestCase_fetchAllLocations_PC_CommandHandler.prototype.execute = function(command) {
    var self = this;

    var expect = chai.expect;
    var masterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");

    command.context.onPresentForm('frmLocations', onCompletion);
    masterDataModule.presentationController.fetchAllLocationDetails();

    function onCompletion(viewModel) {
      if(viewModel.action == "locationsList") {
        try {
          expect(viewModel.locations.httpStatusCode,'httpStatusCode to be 0').to.equal(0);
          expect(viewModel.locations.opstatus,'opstatus to be 0').to.equal(0);
          // Response JSON structure comparison
          expect(viewModel.locations, 'viewModel.locations to have fields').to.include.keys(['data']);
          // JSON values comparison
          if(viewModel.locations.data.length > 0) {
            expect(viewModel.locations.data[0], 'viewModel.locations.records to have fields').to.include.keys
            (['Address_id', 'Code', 'Description', 'DisplayName', 'EmailId', 'IsMainBranch', 'Name', 'PhoneNumber', 'PhoneNumber', 
              'Status_id', 'Type_id', 'WorkSchedule_id', 'createdts', 'id', 'lastmodifiedts', 'softdeleteflag', 'synctimestamp']);
          }
          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
        } 
        catch (e) {
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
      }
    }
  };

  TestCase_fetchAllLocations_PC_CommandHandler.prototype.validate = function() {};

  return TestCase_fetchAllLocations_PC_CommandHandler;
});
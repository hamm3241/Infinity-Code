define(["TestCase_Utils"], function(testUtils) {
  var command, module;
  var expect = chai.expect;
  var setCommand = function(commandId, that) {
    command = commandId;
    module = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(command.context.actionableModule);
  };

  var fetchModuleData = function() {
    command.context.onPresentForm(command.context.actionableFormName, testUtils.unpauseGenerator);
    module.presentationController[command.context.fetchModuleDataMethod]();
  };

  var validateModuleDataModel = function(viewModel) {
    var moduleData = command.context.dataKey ? viewModel[command.context.dataKey] : viewModel;
    // expect(viewModel).to.include.keys(command.context.dataKey);
    expect(moduleData).to.have.length.above(0);
    expect(moduleData[0]).to.include.keys(command.context.validationKeys);
  };
  
  var getModuleData = function() {
    module.businessController.execute(
      new kony.mvc.Business.Command(command.context.fetchDataCommand, {}, function(response) {
        testUtils.runGenerator(response);
      })
    );
  };

  var validateFetchedDataAndInvokeActionOnModule = function(idOfModuleObject, editModuleDataPayload) {
    return function(response) {
      validateModuleDataModel(response);
      var OriginalModuleObject = response[command.context.dataKey].find(obj => obj[command.context.moduleObjectIdKey] === idOfModuleObject);
      command.context.onPresentForm(command.context.actionableFormName, testUtils.unpauseGenerator);
      var actionPayload = Object.assign(
        {
          User_id: kony.mvc.MDAApplication.getSharedInstance().appContext.userID
        },
        command.context.editModuleDataPayload
      );
      module.presentationController[command.context.updateModuleDataMethod](actionPayload);
    };
  };

  return {
    setCommand: setCommand,
    getModuleData: getModuleData,
    fetchModuleData: fetchModuleData,
    validateModuleDataModel: validateModuleDataModel,
    validateFetchedDataAndInvokeActionOnModule: validateFetchedDataAndInvokeActionOnModule
  };
});

define(["TestCase_Utils", "TestCase_Module_Utils"], function(testUtils, moduleUtils) {
  function TestCase_UpdatePermission_CheckerDataDriven(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_UpdatePermission_CheckerDataDriven, kony.mvc.Business.CommandHandler);

  TestCase_UpdatePermission_CheckerDataDriven.prototype.execute = function(command) {
    var self = this;
    var expect = chai.expect;
    moduleUtils.setCommand(command);
    testUtils.setCommand(command, self.sendResponse);

    var roleModule = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("RoleModule");
    var idOfModuleObject = command.context.moduleObjectId;
    var invokeActionOnModule = moduleUtils.validateFetchedDataAndInvokeActionOnModule(idOfModuleObject, command.context.editModuleDataPayload);

    testUtils.runTestCases([
      testUtils.loginByCredentials(command.context.userCredentials),
      moduleUtils.fetchModuleData,
      invokeActionOnModule,
      assertActionFail,
      testUtils.loginByCredentials(command.context.adminCredentials),
      provideAccessToUser,
      testUtils.loginByCredentials(command.context.userCredentials),
      moduleUtils.fetchModuleData,
      invokeActionOnModule,
      assertActionSuccess
    ]);

    function assertActionFail(viewModel) {
      var payload = command.context.editModuleDataPayload;
      if (command.context.editModuleDataPayloadKey)
        payload = command.context.editModuleDataPayload[command.context.editModuleDataPayloadKey];
      moduleUtils.validateModuleDataModel(viewModel);
      var EditedModuleObject = viewModel[command.context.dataKey].find(obj => obj[command.context.moduleObjectIdKey] === idOfModuleObject);
      expect(EditedModuleObject[command.context.moduleObjectKeyCheck1]).to.not.equal(payload[command.context.payloadKeyCheck1]);
      expect(EditedModuleObject[command.context.moduleObjectKeyCheck2]).to.not.equal(payload[command.context.payloadKeyCheck2]);
      testUtils.unpauseGenerator.call(null, viewModel);
    }

    function provideAccessToUser() {
      command.context.onPresentForm("frmRoles", testUtils.runGenerator);
      roleModule.presentationController.UpdateRoleDetails({
        User_id: "UID11",
        Role_Details: {
          id: command.context.userRole
        },
        AssignedTo: {
          permissionsList: [command.context.permissionId]
        }
      });
    }

    function assertActionSuccess(viewModel) {
      var payload = command.context.editModuleDataPayload;
      if (command.context.editModuleDataPayloadKey)
        payload = command.context.editModuleDataPayload[command.context.editModuleDataPayloadKey];
      moduleUtils.validateModuleDataModel(viewModel);
      var EditedModuleObject = viewModel[command.context.dataKey].find(obj => obj[command.context.moduleObjectIdKey] === idOfModuleObject);
      expect(EditedModuleObject[command.context.moduleObjectKeyCheck1]).to.equal(payload[command.context.payloadKeyCheck1]);
      expect(EditedModuleObject[command.context.moduleObjectKeyCheck2]).to.equal(payload[command.context.payloadKeyCheck2]);
      self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
    }
  };

  TestCase_UpdatePermission_CheckerDataDriven.prototype.validate = function() {};

  return TestCase_UpdatePermission_CheckerDataDriven;
});

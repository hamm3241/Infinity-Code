define(["TestCase_Utils", "TestCase_Module_Utils"], function(testUtils, moduleUtils) {
  function TestCase_ViewPermission_CheckerDataDriven(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_ViewPermission_CheckerDataDriven, kony.mvc.Business.CommandHandler);

  TestCase_ViewPermission_CheckerDataDriven.prototype.execute = function(command) {
    var self = this;
    var expect = chai.expect;
    moduleUtils.setCommand(command);
    testUtils.setCommand(command, self.sendResponse);

    var roleModule = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("RoleModule");
    var idOfModuleObject = command.context.moduleObjectId;

    testUtils.runTestCases([
      testUtils.loginByCredentials(command.context.userCredentials),
      moduleUtils.getModuleData,
      assertFetchFail,
      testUtils.loginByCredentials(command.context.adminCredentials),
      provideAccessToUser,
      testUtils.loginByCredentials(command.context.userCredentials),
      moduleUtils.getModuleData,
      assertFetchSuccess
    ]);

    function assertFetchFail(response) {
      expect(response.status).to.not.equal(kony.mvc.constants.STATUS_SUCCESS);
      testUtils.runGenerator.call(null, response);
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

    function assertFetchSuccess(response) {
      expect(response.status).to.equal(kony.mvc.constants.STATUS_SUCCESS);
      moduleUtils.validateModuleDataModel(response.data);
      self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, response);
    }
  };

  TestCase_ViewPermission_CheckerDataDriven.prototype.validate = function() {};

  return TestCase_ViewPermission_CheckerDataDriven;
});

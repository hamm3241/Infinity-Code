define(["TestCase_Utils", "TestCase_Permissions_Utils"], function(testUtils, permUtils) {
  function TestCase_Permissions_IncorrectEditPermission(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Permissions_IncorrectEditPermission, kony.mvc.Business.CommandHandler);

  TestCase_Permissions_IncorrectEditPermission.prototype.execute = function(command) {
    var self = this;
    var expect = chai.expect;
    permUtils.setCommand(command);
    testUtils.setCommand(command, self.sendResponse);
    var permissionsModule = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("PermissionsModule");

    var permissionsFetched;
    var permissionIdOfEditedPermission = "PID07";
    var permissionStatusOfEditedPermission = "SID_ACTIVE";

    var editPermissionWithInvalidInput = permUtils.validateFetchedDataAndEditPermissions(permissionIdOfEditedPermission, {
      id: permissionIdOfEditedPermission,
      Name: "",
      Description: "",
      Status_id: permissionStatusOfEditedPermission
    });

    testUtils.runTestCases([
        permUtils.fetchPermissions,
        editPermissionWithInvalidInput,
        assertPermissionEditFailure
    ]);

    function assertPermissionEditFailure(viewModel) {
      permUtils.validatePermissionDataModel(viewModel);
      var EditedPermission = viewModel.permissions.find(permission => permission.Permission_id === permissionIdOfEditedPermission);
      expect(EditedPermission.Status_id).to.equal(permissionStatusOfEditedPermission);
      self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
    }
  };

  TestCase_Permissions_IncorrectEditPermission.prototype.validate = function() {};

  return TestCase_Permissions_IncorrectEditPermission;
});

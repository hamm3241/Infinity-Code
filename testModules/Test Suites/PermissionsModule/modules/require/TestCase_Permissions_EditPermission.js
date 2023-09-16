define(["TestCase_Utils", "TestCase_Permissions_Utils"], function(testUtils, permUtils) {
  function TestCase_Permissions_EditPermission(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_Permissions_EditPermission, kony.mvc.Business.CommandHandler);

  TestCase_Permissions_EditPermission.prototype.execute = function(command) {
    var self = this;
    var expect = chai.expect;
    permUtils.setCommand(command);
    testUtils.setCommand(command, self.sendResponse);
    var permissionsModule = kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager()
      .getModule("PermissionsModule");

    var permissionIdOfEditedPermission = "PID07";
    var permissionDescriptionOfEditedPermission = "Permission to update a member's group (add and remove) from the member's details page";
    var permissionStatusOfEditedPermission = "SID_ACTIVE";

    var editPermissionWithValidData = permUtils.validateFetchedDataAndEditPermissions(permissionIdOfEditedPermission, {
      id: permissionIdOfEditedPermission,
      Name: "AssignMemberGroup",
      Description: permissionDescriptionOfEditedPermission,
      Status_id: permissionStatusOfEditedPermission
    });

    testUtils.runTestCases([
        permUtils.fetchPermissions,
        editPermissionWithValidData,
        assertPermissionEditSuccess
    ]);

    function assertPermissionEditSuccess(viewModel) {
      permUtils.validatePermissionDataModel(viewModel);
      var EditedPermission = viewModel.permissions.find(permission => permission.Permission_id === permissionIdOfEditedPermission);
      expect(EditedPermission.Status_id).to.equal(permissionStatusOfEditedPermission);
      expect(EditedPermission.Permission_Desc).to.equal(permissionDescriptionOfEditedPermission);
      self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
    }
  };

  TestCase_Permissions_EditPermission.prototype.validate = function() {};

  return TestCase_Permissions_EditPermission;
});

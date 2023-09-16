define(["TestCase_Utils"], function(testUtils) {
  var command;
  var expect = chai.expect;
  var permissionsModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("PermissionsModule");

  var setCommand = function(commandId) {
    command = commandId;
  };

  var fetchPermissions = function() {
    command.context.onPresentForm("frmPermissions", testUtils.runGenerator);
    permissionsModule.presentationController.fetchPermissions();
  };

  var validatePermissionDataModel = function(viewModel) {
    expect(viewModel).to.include.keys("permissions");
    expect(viewModel.permissions).to.have.length.above(0);
    expect(viewModel.permissions[0]).to.include.keys(["Permission_id", "Status_id", "Status_Desc"]);
  };

  var validateFetchedDataAndEditPermissions = function(permissionId, permissionDetail) {
    return function(permissions) {
      validatePermissionDataModel(permissions);
      var OriginalPermission = permissions.permissions.find(permission => permission.Permission_id === permissionId);
      permissionStatusOfEditedPermission = OriginalPermission.Status_id === "SID_INACTIVE" ? "SID_ACTIVE" : "SID_INACTIVE";
      command.context.onPresentForm("frmPermissions", testUtils.runGenerator);
      permissionsModule.presentationController.updatePermission({
        permissionDetail: permissionDetail,
        User_id: kony.mvc.MDAApplication.getSharedInstance().appContext.userID
      });
    };
  };

  return {
    setCommand: setCommand,
    fetchPermissions: fetchPermissions,
    validatePermissionDataModel: validatePermissionDataModel,
    validateFetchedDataAndEditPermissions: validateFetchedDataAndEditPermissions
  };
});

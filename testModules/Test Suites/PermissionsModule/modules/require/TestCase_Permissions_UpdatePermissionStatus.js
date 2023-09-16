define(['TestCase_Utils', 'TestCase_Permissions_Utils'], function (testUtils, permUtils) {

    function TestCase_Permissions_UpdatePermissionStatus(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_Permissions_UpdatePermissionStatus, kony.mvc.Business.CommandHandler);

    TestCase_Permissions_UpdatePermissionStatus.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        permUtils.setCommand(command);
        testUtils.setCommand(command, self.sendResponse);
        var permissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");

        var permissionStatusOfChangedPermission;
        var permissionIdOfChangedPermission = "PID19";

        testUtils.runTestCases([
            permUtils.fetchPermissions,
            changePermissionStatus,
            assertPermissionStatusChange
        ]);

        function changePermissionStatus(viewModel) {
            permUtils.validatePermissionDataModel(viewModel);
            permissionStatusOfChangedPermission = viewModel.permissions[0].Status_id;
            command.context.onPresentForm('frmPermissions', testUtils.runGenerator);
            permissionsModule.presentationController.changeStatusOfPermission({
                permissionId: permissionIdOfChangedPermission,
                statusId: viewModel.permissions[0].Status_id
            });
        }

        function assertPermissionStatusChange(viewModel) {
            permUtils.validatePermissionDataModel(viewModel);
            var changedPermission = viewModel.permissions.find(permission => permission.Permission_id === permissionIdOfChangedPermission);
            expect(changedPermission.Status_id).to.not.equal(permissionStatusOfChangedPermission);
            self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
        }
    };

    TestCase_Permissions_UpdatePermissionStatus.prototype.validate = function () {};

    return TestCase_Permissions_UpdatePermissionStatus;

});
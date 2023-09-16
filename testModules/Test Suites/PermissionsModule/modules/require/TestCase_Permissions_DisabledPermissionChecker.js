define(['TestCase_Utils', 'TestCase_Permissions_Utils'], function (testUtils, permUtils) {

    function TestCase_Permissions_DisabledPermissionChecker(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_Permissions_DisabledPermissionChecker, kony.mvc.Business.CommandHandler);

    TestCase_Permissions_DisabledPermissionChecker.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        permUtils.setCommand(command);
        testUtils.setCommand(command, self.sendResponse);
        var permissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");
        var roleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
        
        var viewRolePermissionId = "PID14";

        testUtils.runTestCases([
            permUtils.fetchPermissions,
            inactivateViewRolesPermission,
            testUtils.doLogin('admin2', 'Konyadmin@2'),
            attemptToFetchRoles,
            validateFetchRolesResponse
        ]);

        function inactivateViewRolesPermission(viewModel) {
            permUtils.validatePermissionDataModel(viewModel);
            var viewRolePermission = viewModel.permissions.find(permission => permission.Permission_id === viewRolePermissionId);
            command.context.onPresentForm('frmPermissions', testUtils.runGenerator);
            permissionsModule.presentationController.changeStatusOfPermission({
                permissionId: viewRolePermissionId,
                statusId: viewRolePermission.Status_id
            });
        }

        function attemptToFetchRoles(response) {
            command.context.onPresentForm('frmRoles', testUtils.runGenerator);
            roleModule.presentationController.fetchRoleList();
        }

        function validateFetchRolesResponse(viewModel) {
            expect(viewModel.fetchRoleList).to.have.length.above(0);
            self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
        }
    };

    TestCase_Permissions_DisabledPermissionChecker.prototype.validate = function () {};

    return TestCase_Permissions_DisabledPermissionChecker;

});
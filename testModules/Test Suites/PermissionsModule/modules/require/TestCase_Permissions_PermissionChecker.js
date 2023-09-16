define(['TestCase_Utils', 'TestCase_Permissions_Utils'], function (testUtils, permUtils) {

    function TestCase_Permissions_PermissionChecker(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }

    inheritsFrom(TestCase_Permissions_PermissionChecker, kony.mvc.Business.CommandHandler);

    TestCase_Permissions_PermissionChecker.prototype.execute = function (command) {
        var self = this;
        var expect = chai.expect;
        permUtils.setCommand(command);
        testUtils.setCommand(command, self.sendResponse);
        var permissionsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PermissionsModule");
        var roleModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");

        var permissionIdOfEditedPermission = "PID20";
        var permissionDescriptionOfEditedPermission = "Provision for Updating Permissions";
        var permissionStatusOfEditedPermission = "SID_INACTIVE";

        var editPermissions = permUtils.validateFetchedDataAndEditPermissions(permissionIdOfEditedPermission, {
            "id": permissionIdOfEditedPermission,
            "Name": "UpdatePermission",
            "Description": permissionDescriptionOfEditedPermission,
            "Status_id": permissionStatusOfEditedPermission,
        });

        testUtils.runTestCases([
            testUtils.doLogin('iris.watson', 'demo1234'),
            permUtils.fetchPermissions,
            editPermissions,
            assertPermissionEditFailWithoutAccess,
            testUtils.doLogin('admin2', 'Konyadmin@2'),
            providePermissionEditAccessToDemoUser,
            testUtils.doLogin('iris.watson', 'demo1234'),
            permUtils.fetchPermissions,
            editPermissions,
            assertSuccessfulPermissionEdit
        ]);

        function assertPermissionEditFailWithoutAccess(viewModel) {
            permUtils.validatePermissionDataModel(viewModel);
            var EditedPermission = viewModel.permissions.find(permission => permission.Permission_id === permissionIdOfEditedPermission);
            expect(EditedPermission.Status_id).to.not.equal(permissionStatusOfEditedPermission);
            expect(EditedPermission.Permission_Desc).to.not.equal(permissionDescriptionOfEditedPermission);
            testUtils.runGenerator.call(null, viewModel);
        }

        function providePermissionEditAccessToDemoUser() {
            command.context.onPresentForm('frmRoles', testUtils.runGenerator);
            roleModule.presentationController.UpdateRoleDetails({
                "User_id": "UID11",
                "Role_Details": {
                    "id": "RID_FRONTLINE_STAFF",
                    "Name": "Front Line Staff",
                    "Description": "This role has minimal permissions that help the users perform the dedicated tasks in the admin console. Branch members who want to support",
                    "Status_id": "SID_ACTIVE"
                },
                "AssignedTo": {
                    "permissionsList": ["PID20"],
                    "usersList": []
                },
                "RemovedFrom": {
                    "permissionsList": [],
                    "usersList": []
                }
            });
        }

        function assertSuccessfulPermissionEdit(viewModel) {
            permUtils.validatePermissionDataModel(viewModel);
            var EditedPermission = viewModel.permissions.find(permission => permission.Permission_id === permissionIdOfEditedPermission);
            expect(EditedPermission.Status_id).to.equal(permissionStatusOfEditedPermission);
            expect(EditedPermission.Permission_Desc).to.equal(permissionDescriptionOfEditedPermission);
            self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
        }
    };

    TestCase_Permissions_PermissionChecker.prototype.validate = function () {};

    return TestCase_Permissions_PermissionChecker;
});
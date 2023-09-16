define(function() {
  var testData = [
    {
      testId: "Check UpdatePermission Functionality",
      testDescription: "Test Whether the ability to edit permission is controlled by UpdatePermission access",
      userCredentials: {
        },
      adminCredentials: {
        },
      permissionId: "PID20",
      userRole: "RID_FRONTLINE_STAFF",
      actionableModule: "PermissionsModule",
      actionableFormName: "frmPermissions",
      dataKey: "permissions",
      validationKeys: ["Permission_id", "Status_id", "Status_Desc"],
      moduleObjectId: "PID20",
      moduleObjectIdKey: "Permission_id",
      fetchModuleDataMethod: "fetchPermissions",
      updateModuleDataMethod: "updatePermission",
      editModuleDataPayloadKey: "permissionDetail",
      editModuleDataPayload: {
        permissionDetail: {
          id: "PID20",
          Name: "UpdatePermission",
          Description: "Provision for Updating Permissions",
          Status_id: "SID_INACTIVE"
        }
      },
      moduleObjectKeyCheck1: "Status_id",
      moduleObjectKeyCheck2: "Permission_Desc",
      payloadKeyCheck1: "Status_id",
      payloadKeyCheck2: "Description"
    },
    {
      testId: "Check UpdateRole Functionality",
      testDescription: "Test Whether the ability to edit role is controlled by UpdateRole access",
      userCredentials: {
        },
      adminCredentials: {
        },
      permissionId: "PID16",
      userRole: "RID_FRONTLINE_STAFF",
      actionableModule: "RoleModule",
      actionableFormName: "frmRoles",
      dataKey: "fetchRoleList",
      validationKeys: ["role_id", "role_Name", "Status_id", "Status_Desc"],
      moduleObjectId: "RID_FRONTLINE_STAFF",
      moduleObjectIdKey: "role_id",
      fetchModuleDataMethod: "fetchRoleList",
      updateModuleDataMethod: "UpdateRoleDetails",
      editModuleDataPayloadKey: "Role_Details",
      editModuleDataPayload: {
        Role_Details: {
          id: "RID_FRONTLINE_STAFF",
          Name: "Frontline Staffers",
          Description: "Role with minimal permissions"
        }
      },
      moduleObjectKeyCheck1: "role_Name",
      moduleObjectKeyCheck2: "role_Desc",
      payloadKeyCheck1: "Name",
      payloadKeyCheck2: "Description"
    },
    {
      testId: "Check UpdateUser Functionality",
      testDescription: "Test Whether the ability to edit user is controlled by UpdateUser access",
      userCredentials: {
        },
      adminCredentials: {
        },
      permissionId: "PID40",
      userRole: "RID_FRONTLINE_STAFF",
      actionableModule: "InternalUserModule",
      actionableFormName: "frmUsers",
      dataKey: "usersList",
      validationKeys: ["User_id", "Role_Name", "Status_id"],
      moduleObjectId: "UID1",
      moduleObjectIdKey: "User_id",
      fetchModuleDataMethod: "fetchUsersList",
      updateModuleDataMethod: "editInternalUser",
      editModuleDataPayloadKey: "",
      editModuleDataPayload: {
        User_id: "UID1",
        FirstName: "Bryan",
        LastName: "Bendis",
        MiddleName: "M"
      },
      moduleObjectKeyCheck1: "FirstName",
      moduleObjectKeyCheck2: "LastName",
      payloadKeyCheck1: "FirstName",
      payloadKeyCheck2: "LastName"
    }
  ];

  return testData;
});

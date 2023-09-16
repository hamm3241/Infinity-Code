define(function() {
    var testData = [
      {
        testId: "Check ViewPermission Functionality",
        testDescription: "Test Whether the ability to view permission is controlled by ViewPermission access",
        userCredentials: {
          },
        adminCredentials: {
         },
        permissionId: "PID18",
        userRole: "RID_FRONTLINE_STAFF",
        actionableModule: "PermissionsModule",
        actionableFormName: "frmPermissions",
        dataKey: "",
        validationKeys: ["Permission_id", "Status_id", "Status_Desc"],
        fetchDataCommand: "com.kony.permissions.fetchPermissions"
      },
      {
        testId: "Check ViewRole Functionality",
        testDescription: "Test Whether the ability to view role is controlled by ViewRole access",
        userCredentials: {
          },
        adminCredentials: {
          },
        permissionId: "PID14",
        userRole: "RID_FRONTLINE_STAFF",
        actionableModule: "RoleModule",
        actionableFormName: "frmRoles",
        dataKey: "roles_view",
        validationKeys: ["role_id", "role_Name", "Status_id", "Status_Desc"],
        fetchDataCommand: "com.kony.role.fetchAllRoles"
      },
      {
        testId: "Check ViewUser Functionality",
        testDescription: "Test Whether the ability to view user is controlled by ViewUser access",
        userCredentials: {
          },
        adminCredentials: {
          },
        permissionId: "PID02",
        userRole: "RID_FRONTLINE_STAFF",
        actionableModule: "InternalUserModule",
        actionableFormName: "frmUsers",
        dataKey: "internalusers_view",
        validationKeys: ["User_id", "Role_Name", "Status_id"],
        fetchDataCommand: "com.kony.internalUser.fetchInternalUsers"
      },
      {
        testId: "Check ViewGroups Functionality",
        testDescription: "Test Whether the ability to view groups is controlled by ViewGroup access",
        userCredentials: {
          },
        adminCredentials: {
          },
        permissionId: "PID05",
        userRole: "RID_FRONTLINE_STAFF",
        actionableModule: "CustomerGroupsModule",
        actionableFormName: "frmGroups",
        dataKey: "",
        validationKeys: ["Group_Name", "Group_id", "Group_Desc", "Status_id"],
        fetchDataCommand: "com.kony.CustomerGroups.getCustomerGroupsView"
      },
      {
        testId: "Check View Locations Functionality",
        testDescription: "Test Whether the ability to view locations is controlled by ViewAppContent access",
        userCredentials: {
          },
        adminCredentials: {
          },
        permissionId: "PID33",
        userRole: "RID_FRONTLINE_STAFF",
        actionableModule: "MasterDataModule",
        actionableFormName: "frmLocations",
        dataKey: "data",
        validationKeys: ["DisplayName", "Code", "Type_id", "Status_id"],
        fetchDataCommand: "com.kony.masterData.fetchAllLocations"
      }
    ];
  
    return testData;
  });
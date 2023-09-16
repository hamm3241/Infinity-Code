define({
  //See permissionsConfig.js for expected format
  components: {
    leftMenuNew: {
      "virtualDOM": {
        "Dashboard": "ViewDashboard",
        "Messages": "ViewMessages",
        "Alerts": "ViewAlerts",
        "REPORTS & LOGS": {
          "Reports": "ViewReports",
          "Logs": "ViewLogs"
        },
        "MEMBER MANAGEMENT": {
          "Customers": "ViewCustomer",
          "Customer Roles": "ViewGroup",
          "Contracts": "ViewContract"
        },
        "EMPLOYEE MANAGEMENT": {
          "Users": "ViewUser",
          "Roles": "ViewRoles",
          "Permissions": "ViewPermissions"
        },
        "CONFIGURATIONS": {
          "Configuration Bundles": "ViewConfigurationBundles",
          "Business Configurations": "ViewConfigurations",
          "Service Definition Configurations" : "ViewServiceDefinition"
        },
        "APPLICATIONS CONTENT MANAGEMENT": {
          "Privacy Policies": "ViewAppContent",
          "FAQs": "ViewAppContent",
          "Credential Policies": "ViewAppContent",
          "T&C": "ViewAppContent",
          "Service Outage Message": "ViewAppContent",
          "Locations": "ViewAppContent",
          "Customer Care Information": "ViewAppContent",
        },
        "MASTER DATA MANAGEMENT": {
          "Products": "ViewProduct",
          "Banks for transfer": "NotImplemented",
          "Services": "ViewFeatureConfig",
          "Schedule Master": "NotImplemented",
          "Secure Images": "ViewAppContent",
          "Security Questions": "ViewAppContent",
          "Decision Management": "ViewDecisionFiles"
        },
        "Change Password": "ChangePassword",
        "SECURITY & AUTHENTICATION": {
          "Credential Policy": "ViewIdentityManagement",
          "Password Settings": "ViewIdentityManagement",
          "MFA Configurations": "ViewMFAConfig",
          "MFA Scenarios": "ViewMFAConfig"
        },
        "ENGAGEMENTS": {
          "Ad Management" : "ViewCampaign",
          "Segments" : "ViewProfile"
        }
      }
    }
  },
  forms: {
    frmDashboard: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "flxTabs": "ViewMessages",
      "flxAlertSegment": "ViewDashboard",
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmLoansDashboard: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "dashboardCommonTab": {
        "btnBanking": "NotImplemented"
      }
    },
    frmGuestDashboard: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCSR: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "frmCSR_btnCreateNewMessage": "CreateNewMessage",
        "frmCSR_btnCreateMessageTemplate": "CreateMessageTemplate"
      },
      "MessageFilter": {
        "SegSearchResult": [
          "segment",
          {
            "flxOptions": "UpdateMessages"
          }
        ],
        "flxAssignTo":"UpdateMessages"
      },
      "editMessages": {
        "btnStatus": "UpdateMessages",
        "btnAssign": "UpdateMessages",
        "btnReply": "UpdateMessages"
      },
      "TemplateMessage": {
        "btnAdd": "UpdateMessageTemplate",
        "btnEdit": "UpdateMessageTemplate"
      },
      "listingSegment": {
        "segListing": [
          "segment",
          {
            "flxOptions": "UpdateMessageTemplate"
          }
        ]
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmProduct: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "mainHeader": {
        "btnDropdownList": "CreateUpdateProduct"
      },
      "flxSettings": "mangeProdLineGroupFeature",
      "viewProducts": {
        "segProducts": [
          "segment",
          {
            "flxOptions": "CreateUpdateProduct"
          }
        ],
        "flxOptions": "CreateUpdateProduct"
      },
    },
    frmAssistedOnboarding: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmConfigurationBundles: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "mainHeader": {
        "btnAddNewOption": "UpdateConfigurationBundles"
      },
      "lblFonticonBundleEdit": "UpdateConfigurationBundles",
      "flxAddConfigurationButton": "UpdateConfigurationBundles",
      "configurationData": {
        "segConfiguration": [
          "segment",
          {
            "flxOptions": "UpdateConfigurationBundles"
          }
        ]
      },
      "bundle0": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle1": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle2": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle3": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle4": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle5": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle6": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      },
      "bundle7": {
        "lblBundleEdit": "UpdateConfigurationBundles",
        "lblBundleDelete": "UpdateConfigurationBundles"
      }
    },
    frmBusinessConfigurations: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "flxAddButton": "UpdateConfigurations",
      "criteriaList": {
        "segCriteria": [
          "segment",
          {
            "flxOptions": "UpdateConfigurations"
          }
        ]
      },
      "btnAdd": "UpdateConfigurations"
    },
    frmPolicies: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "flxPolicyDescription": {
        "flxAddNewButton": {
          "btnAddNew": "CreateUpdateIdentityManagement"
        },
        "flxAddNewPolicyDescription": {
          "flxCommonButtons": {
            "btnSave": "CreateUpdateIdentityManagement"
          }
        },
        "segPolicyDescriptions": [
          "segment",
          {
            "lblEdit": "CreateUpdateIdentityManagement",
            "lblDelete": "CreateUpdateIdentityManagement"
          }
        ]
      },
      "customersPolicies": {
        "lblEditIconUsername": "CreateUpdateIdentityManagement",
        "lblEditIconPassword": "CreateUpdateIdentityManagement"
      },
      "policiesRulesView": {
        "lblIconOption1": "CreateUpdateIdentityManagement"
      },
      "commonButtons": {
        "btnSave": "CreateUpdateIdentityManagement"
      }
    },
    frmPasswordAgeAndLockoutSettings: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "btnUpdate": "CreateUpdateIdentityManagement"
    },
    frmAlertsManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateAlerts",
      },
      "btnAddCategory":"CreateAlerts",
      "btnsave": "UpdateAlerts",
      "btnUpdateSequencePopup": "UpdateAlerts",
      "btnTemplateSave": "UpdateAlerts",
      "btnAddAlerts": "CreateAlerts",
      "btnReorderAlertTypes": "UpdateAlerts",
      "btnCategoryReorder" : "UpdateAlerts",
      "btnAddSubAlerts": "CreateAlerts",
      "popUpDeactivate": {
        "btnPopUpDelete": "UpdateAlerts"
      },
      "addAlertTypeButtons": {
        "btnSave": "UpdateAlerts"
      },
      "EditAlertCategoryButtons": {
        "btnSave": "UpdateAlerts"
      },
      "noResultsWithButton":{
        "btnAddRecord" :"CreateAlerts"
      },
      "noResultsWithButtonAlerts":{
        "btnAddRecord":"CreateAlerts"
      },
      "flxGroupsListContextualMenu" : "UpdateAlerts",
      "flxCategoryOptions": "UpdateAlerts",
      "flxOptions": "UpdateAlerts",
      "flxOptionsSubAlerts": [
        "all",[
          "UpdateAlerts",
          "ViewAppContent"
        ]],
      "flxAddTemplateButton": [
        "all",[
          "UpdateAlerts",
          "ViewAppContent"
        ]],
      "flxOptionEdit": [
        "all",[
          "UpdateAlerts",
          "ViewAppContent"
        ]],
      "segListing": [
        "segment",
        {
          "flxOptions": "UpdateAlerts"
        }
      ],
      "segSubAlerts": [
        "segment",
        {
          "flxOptions": [
            "all",[
              "UpdateAlerts",
              "ViewAppContent"
            ]]
        }
      ],
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmMoneyMovementScheduling: {
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmLogs: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "flxLogDefaultTabs1": "ViewTransactionLogs",
      "flxLogDefaultTabs2": "ViewAdminLogs",
      "flxLogDefaultTabs3": "ViewCustomerActivityLogs",
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmReportsManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateReport",
        "btnDropdownList": "ViewDataSource"
      },
      "segReports": {
        "segListing" :[
          "segment",
          {
            "flxOptions": "DeleteReport",
          }
        ]
      },
      "flxDeleteOption": "DeleteReport",
      "flxBtnShare": "ShareReport",
      "search": {
        "flxDownload": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmServiceManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "commonButtons": {
        "btnNext": "NotImplemented"
      },
      /*"mainHeader": {
        "btnAddNewOption": "NotImplemented"
      },*/
      "flxFeatureDetailsOptions": "UpdateFeatureConfig",
      "segFeatures": [
        "segment",
        {
          "flxOptions": "UpdateFeatureConfig",
        }
        ],
      "btnEditActionLimits":"UpdateFeatureConfig",
       "segActionList" : [
         "segment",
        {
          "flxOptions": "UpdateFeatureConfig",
        }
      ],
      "flxActionDetailsOptions" : "UpdateFeatureConfig",
      "flxOperations": "NotImplemented",
      "lblSchedule": "NotImplemented",
      "flxScheduleClick": "NotImplemented",
      "verticalTabs": {
        "flxOption2": [
          "all",
          [
            "NotImplemented",
            "NotImplemented"
          ]
        ],
        "flxOption3": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      leftMenuNew: ["component", "leftMenuNew"],
      btnCreateCustomer: "DoAssistedOnboarding"
    },
    frmCustomerProfileAccounts: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "entitlementsContextualMenu": {
        "flxOption1": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileActivityHistory: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "tabs": {
        "btnTabName8": [
          "all",
          [
            "UpdateCustomerDevice"
          ]
        ],
      },
      "entitlementsContextualMenu": {
        "flxOption1": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileAlerts: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions:"UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "tabs": {
        "btnTabName8": [
          "all",
          [
            "UpdateCustomerDevice"
          ]
        ]
      },
      "entitlementsContextualMenu": {
        "flxOption1": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileContacts: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "flxGeneralInfoWrapperUnEnrolled":{
        "generalInfoHeader":{
          "btnEnrollNow":"CreateCustomer"
        },
      },
      "ContactPrefTimeMethod": {
        "btnEdit": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ]
      },
      "Address": {
        "btnEdit": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ],
        "btnAdd": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ]
      },
      "ContactNum": {
        "btnEdit": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ],
        "btnAdd": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ]
      },
      "ContactEmail": {
        "btnEdit": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ],
        "btnAdd": [
          "any",
          [
            "UpdateCustomer",
            "UpdateCustomerContact"
          ]
        ]
      },
      "tabs": {
        "btnTabName8": [
          "all",
          [
            "UpdateCustomerDevice"
          ]
        ],
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileContracts: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "btnContractsEditCust" :"UpdateCustomer",
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileDeviceInfo: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "tabs": {
        "btnTabName8": [
          "all",
          [
            "UpdateCustomerDevice"
          ]
        ]
      },
      "entitlementsContextualMenu": {
        "flxOption1": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileEntitlements: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      }
    },
    frmCustomerProfileHelpCenter: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "tabs": {
        "btnTabName8": [
          "all",
          [
            "UpdateCustomerDevice"
          ]
        ]
      },
      "entitlementsContextualMenu": {
        "flxOption1": "NotImplemented"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileLimits: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerProfileRoles: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateCustomer"
      },
      flxGeneralInfoWrapper: {
        generalInfoHeader: {
          flxCSRAssist: "CSRAssist",
          flxUnlock: "UpdateCustomer"
        },
        dashboardCommonTab: {
          "btnBanking": "NotImplemented"
        },
        flxSelectOptions: "UpdateCustomer",
        flxGeneralInfoEditButton:"UpdateCustomer"
      },
      "btnRolesEdit":[
        "any",
        [
          "UpdateCustomer",
          "UpdateCustomerGroup",
          "AssignCustomerGroup"
        ]
      ],
      "btnRolesBusinessEdit":[
        "all",
        [
          "UpdateCustomerGroup",
          "UpdateBusinessUsers",
        ]
      ]
    },
     frmServiceDefinition: {
       "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateServiceDefinition"
      },
      "listingSegmentClient": {
        "segListing": [
          "segment",
          {
            "flxOptions":["any",[ "UpdateServiceDefinition","DeleteServiceDefinition"]]
          }
        ],
        "contextualMenu":{
          "flxOption2": "UpdateServiceDefinition",
          "flxOption4": "UpdateServiceDefinition",
          "flxOption3": "DeleteServiceDefinition"
        }
      },
      "flxOptions1" : ["any",[ "UpdateServiceDefinition","DeleteServiceDefinition"]],
       "contextualMenu1":{
          "flxOption1": "UpdateServiceDefinition",
          "flxOption4": "UpdateServiceDefinition",
          "flxOption3": "DeleteServiceDefinition"
        },
       "flxRolesEdit": "UpdateServiceDefinition"
      
    },
    frmGroups: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "noStaticData": {
        "btnAddStaticContent": "CreateGroup"
      },
      "listingSegmentClient": {
        "segListing": [
          "segment",
          {
            "flxOptions":["any",[ "UpdateGroup","CreateGroup"]]
          }
        ],
        "contextualMenu":{
          "flxOption2": "UpdateGroup",
          "flxOption4": "UpdateGroup",
          "flxOptionsSeperator":["all",[ "UpdateGroup","CreateGroup"]],
          "flxOption3": "CreateGroup"
        }
      },
      "btnAddGroupNext": "UpdateGroup",
      "flxOptions":["any",[ "UpdateGroup","CreateGroup"]],
      "assignContextualMenu":{
          "flxOption1": "UpdateGroup",
          "flxOption2": "UpdateGroup",
          "flxOptionsSeperator":["all",[ "UpdateGroup","CreateGroup"]],
          "flxOption3": "CreateGroup"
        },
      "btnEdit": "UpdateGroup",
      "verticalTabs": {
        "flxOption1": "UpdateGroup",
        "flxOption2": "UpdateGroup",
        "flxOption4": "UpdateGroup"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateGroup"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmUsers: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateUser"
      },
      "flxViewEditButton": "UpdateUser",
      "segUsers": [
        "segment",
        {
          "flxOptions": [
            "any",
            [
              "AssignUserRole",
              "AssignUserPermission",
              "ModifyUserStatus",
              "UpdateUser"
            ]
          ]
        }
      ],
      "lblDescription": [
        "any",
        [
          "AssignUserRole",
          "AssignUserPermission",
          "UpdateUser"
        ]
      ],
      "flxOption2": "UpdateUser",
      "flxOption3": "ModifyUserStatus",
      "flxOption4": "ModifyUserStatus",
      "btnRoles": [
        "any",
        [
          "AssignUserRole",
          "UpdateUser"
        ]
      ],
      "btnPermissions": [
        "any",
        [
          "AssignUserPermission",
          "UpdateUser"
        ]
      ],
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmRoles: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateRoles"
      },
      "flxViewEditButton": "UpdateRoles",
      "segPermissions": [
        "segment",
        {
          "flxOptions": [
            "any",
            [
              "AssignUserRole",
              "ModifyRoleStatus",
              "UpdateRoles"
            ]
          ]
        }
      ],
      "lblDescription": [
        "any",
        [
          "AssignUserRole",
          "AssignRolePermissions",
          "UpdateRoles"
        ]
      ],
      "flxOption2": "UpdateRoles",
      "flxOption4": "ModifyRoleStatus",
      "btnRoles": [
        "any",
        [
          "AssignUserRole",
          "UpdateRoles"
        ]
      ],
      "btnPermissions": [
        "any",
        [
          "AssignRolePermissions",
          "UpdateRoles"
        ]
      ],
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmPermissions: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "flxViewEditButton": "UpdatePermission",
      "segPermissions": [
        "segment",
        {
          "flxOptions": [
            "any",
            [
              "AssignUserPermission",
              "ModifyPermissionStatus",
              "UpdatePermission"
            ]
          ]
        }
      ],
      "lblDescription": [
        "any",
        [
          "AssignUserPermission",
          "AssignRolePermissions",
          "UpdatePermission"
        ]
      ],
      "flxOption2": "UpdatePermission",
      "flxOption4": "ModifyPermissionStatus",
      "btnRoles": [
        "any",
        [
          "AssignRolePermissions",
          "UpdatePermission"
        ]
      ],
      "btnPermissions": [
        "any",
        [
          "AssignUserPermission",
          "UpdatePermission"
        ]
      ],
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmSecureImage: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "flxPhraseStatus": "ModifyAppContentStatus",
      "segUploadedImageListKA": [
        "segment",
        {
          "flxOptions": [
            "any",
            [
              "UpdateAppContent",
              "ModifyAppContentStatus"
            ]
          ]
        }
      ],
      "flxUploadImage2KA": "CreateAppContent",
      "flxBrowseOrDrag2": "CreateAppContent",
      "flxOption2": "ModifyAppContentStatus",
      "flxOption4": "UpdateAppContent",
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmSecurityQuestions: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainSegment": {
        "segMain": [
          "segment",
          {
            "flxOptions": [
              "any",
              [
                "UpdateAppContent",
                "ModifyAppContentStatus"
              ]
            ]
          }
        ],
        "flxOption1": "ModifyAppContentStatus",
        "flxOption2": "UpdateAppContent"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateAppContent"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmTermsAndConditions: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "noStaticData": {
        "btnAddStaticContent": "CreateAppContent",
        "lblNoStaticContentMsg": "CreateAppContent"
      },
      "staticData": {
        "flxOptions": [
          "any",
          [
            "UpdateAppContent",
            "ModifyAppContentStatus"
          ]
        ],
        "flxEditOption": "UpdateAppContent",
        "flxDeleteOption": "UpdateAppContent",
        "flxDeactivateOption": "ModifyAppContentStatus"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmPrivacyPolicy: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "noStaticData": {
        "btnAddStaticContent": "CreateAppContent",
        "lblNoStaticContentMsg": "CreateAppContent"
      },
      "staticData": {
        "flxOptions": [
          "any",
          [
            "UpdateAppContent",
            "ModifyAppContentStatus"
          ]
        ],
        "flxEditOption": "UpdateAppContent",
        "flxDeleteOption": "UpdateAppContent",
        "flxDeactivateOption": "ModifyAppContentStatus"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmFAQ: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateAppContent"
      },
      "noStaticData": {
        "btnAddStaticContent": "CreateAppContent",
        "lblNoStaticContentMsg": "CreateAppContent"
      },
      "flxEdit": "UpdateAppContent",
      "flxDelete": "UpdateAppContent",
      "flxDeactivate": "ModifyAppContentStatus",
      "flxDeleteOption": "UpdateAppContent",
      "tableView": {
        "flxHeaderCheckbox": [
          "any",
          [
            "UpdateAppContent",
            "ModifyAppContentStatus"
          ]
        ],
        "segServicesAndFaq": [
          "segment",
          {
            "flxOptions": [
              "any",
              [
                "UpdateAppContent",
                "ModifyAppContentStatus"
              ]
            ],
            "flxCheckbox": [
              "any",
              [
                "UpdateAppContent",
                "ModifyAppContentStatus"
              ]
            ]
          }
        ]
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmOutageMessage: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateAppContent"
      },
      "flxSelectOptionsHeader": ["any",
                                 [
                                   "UpdateAppContent",
                                   "ModifyAppContentStatus"
                                 ]],
      "noStaticData": {
        "btnAddStaticContent": "CreateAppContent",
        "lblNoStaticContentMsg": "CreateAppContent"
      },
      "flxPause" : "ModifyAppContentStatus",
      "flxResume" : "ModifyAppContentStatus",
      "flxTerminate" : "ModifyAppContentStatus",
      "flxDeleteAction": "UpdateAppContent",
      "flxViewEditButton" : "UpdateAppContent",
      "flxEdit": "UpdateAppContent",
      "flxResumeOption" : "ModifyAppContentStatus",
      "flxPauseOutage" : "ModifyAppContentStatus",
      "flxTerminateOutage" : "ModifyAppContentStatus",
      "flxDelete": "UpdateAppContent",
      "flxCopy": "CreateAppContent",
      "segOutageMessages": [
        "segment",
        {
          "flxOptions": [
            "any",
            [
              "CreateAppContent",
              "UpdateAppContent",
              "ModifyAppContentStatus"
            ]
          ]
        }
      ],
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmLocations: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "flxViewEditButton": "UpdateAppContent",
      "btnAddCase": "CreateAppContent",
      "mainHeader": {
        "btnAddNewOption": "CreateAppContent"
      },
      "btnImport": "CreateAppContent",
      "listingSegment": {
        "segListing": [
          "segment",
          {
            "flxOptions": [
              "any",
              [
                "UpdateAppContent",
                "ModifyAppContentStatus"
              ]
            ]
          }
        ],
        "contextualMenu": {
          "flxOption1": "UpdateAppContent",
          "flxOption2": "ModifyAppContentStatus",
          "flxOption3": "UpdateAppContent"
        }
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCustomerCare: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "mainHeader": {
        "btnAddNewOption": "CreateAppContent"
      },
      "addNewRow": {
        "btnAddMore": "CreateAppContent"
      },
      "listingSegment": {
        "segListing": [
          "segment",
          {
            "flxOptions": [
              "any",
              [
                "UpdateAppContent",
                "ModifyAppContentStatus"
              ]
            ]
          }
        ],
        "contextualMenu": {
          "flxOption1": "UpdateAppContent",
          "flxOption2": "ModifyAppContentStatus",
          "flxOption3": "UpdateAppContent"
        }
      },
      "noStaticData": {
        "lblNoStaticContentMsg": "CreateAppContent",
        "btnAddStaticContent": "CreateAppContent"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmCompanies: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "btnCompanyDetailEdit": "UpdateContract",
      "btnShowSuspendFeature" : "UpdateCompany",
      "segCompanyDetailAccount": [
        "segment",
        {
          "flxUnlink": "UpdateCompany"
        }
      ],
      "btnAddCustomer": "UpdateBusinessUsers",
      "btnCreateCustomer": "UpdateBusinessUsers",
      "lblNoCustomers": "UpdateBusinessUsers",
      "segCompanyDetailCustomer": [
        "segment",
        {
          "flxOptions":"UpdateBusinessUsers"
        }
      ],
      "flxViewTab6": "ViewSignatoryGroup",
      "flxOptionsSignatory": "UpdateSignatoryGroup",
      "flxContractGroupsContainer": ['dynamicComponent', {
        "btnEdit": "CreateSignatoryGroup",
         "segAccountFeatures":["segment",  {
                      "flxOptions": "UpdateSignatoryGroup",
                      "flxDelete": "UpdateSignatoryGroup"
                  }],
          }
      ],
      "flxViewTab5":"ViewApprovalMatrix",
      "flxConfigAM":"UpdateApprovalMatrix",
      "flxDynamicWidCustLevelAM":['dynamicComponent', {
         "segFeatureActions":["segment",  {
                      "flxApprovalEdit": "UpdateApprovalMatrix",
                      "btnAddApproval": "CreateApprovalMatrix"
                  }],
          }
      ],
      "flxDynamicWidAccLevelAM":['dynamicComponent', {
         "segFeatureActions":["segment",  {
                      "flxApprovalEdit": "UpdateApprovalMatrix",
                      "btnAddApproval": "CreateApprovalMatrix"
                  }],
          }
      ],
      
    },
    frmContractSearch:{
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "mainHeader": {
        "btnAddNewOption": "CreateContract"
      },
    },
    frmCustomerCreate: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ]
    },
    frmMFAConfigurations: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "btnEditConfigLeft":"CreateUpdateMFAConfig",
      "btnEditConfigRight":"CreateUpdateMFAConfig"
    },
    frmMFAScenarios: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "segMFAScenarios": [
        "segment",
        {
          "flxOptions": "CreateUpdateMFAConfig"
        }
      ],
      "flxEditFooterButtons": "CreateUpdateMFAConfig",
      "mainHeader": {
        "btnAddNewOption": "CreateUpdateMFAConfig"
      },
      "flxOptions": "CreateUpdateMFAConfig"
    },
    frmUpgradeUser: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      leftMenuNew: ["component", "leftMenuNew"]
    },
    frmDecisionManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "mainHeader": {
        "btnAddNewOption": "UpdateDecision"
      },
      "noStaticData": {
        "btnAddStaticContent": "UpdateDecision"
      },
      "decision0": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision1": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision2": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision3": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision4": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision5": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision6": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision7": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision8": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      },
      "decision9": {
        "flxLblImgEdit": "UpdateDecision",
        "flxDelete": "DeleteDecision"
      }
    },
    frmNewCustomer: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      leftMenuNew: ["component", "leftMenuNew"]
    },
    frmLeadManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      leftMenuNew: ["component", "leftMenuNew"]
    },
    frmDepositsDashboard: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      leftMenuNew: ["component", "leftMenuNew"]
    },
    frmAdManagement: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "mainHeader": {
        "btnDropdownList": "CreateUpdateCampaign",
        "btnAddNewOption": "ViewDefaultCampaign" 
      },
      "segCampaigns": [
        "segment",
        {
          "flxOptions": "CreateUpdateCampaign"
        }
      ],
      "flxSettings": "ViewDefaultCampaign",
      "flxOptions": "CreateUpdateCampaign",
      "flxOptionsDefault" : "UpdateDefaultCampaign"
    },
    frmProfiles: {
      "dropdownMainHeader": {
        "flxChangePassword": "ChangePassword"
      },
      "leftMenuNew": [
        "component",
        "leftMenuNew"
      ],
      "mainHeader": {
        "btnDropdownList": "CreateUpdateProfile"
      },
      "segProfiles": [
        "segment",
        {
          "flxOptions": "CreateUpdateProfile"
        }
      ],
      "flxOptions": "CreateUpdateProfile",
    }
  }
});

define({
gblselIndex :0,
//preshow
    rolesPreshow : function(){
        this.setFlowActions();
        this.showRoles();
        this.setSelectedOptionsSegmentData();
        this.setRolesSegmentData();
        this.setHeaderText();
//skins for left menu
        this.view.leftMenu.flxRoles.skin = "leftMenuhightlightSkn";
        this.view.leftMenu.imgRoles.src = "rolesactive.png";
        this.view.leftMenu.lblRolesLeftMenu.skin = "lblHighlightSkn";
        this.view.leftMenu.flxsubMenuActivePatch1.isVisible = true;
        this.view.leftMenu.flxAdminUsers.skin = "flxNonHighlightSkn";
        this.view.leftMenu.imgUsers.src = "usersinactive.png";
        this.view.leftMenu.lblUsers.skin = "lblNonHighlightSkn";
        this.view.leftMenu.flxsubMenuActivePatch.isVisible = false;
        this.view.leftMenu.flxPerm.skin = "flxNonHighlightSkn";
        this.view.leftMenu.imgPerm.src = "imgpermissions.png";
        this.view.leftMenu.flxPermLeft.skin = "lblNonHighlightSkn";
        this.view.leftMenu.flxPermPatch3.isVisible = false;
    },

//hide functions
    hideAll : function(){
        this.view.flxViews.setVisibility(false);
        this.view.flxPermissions.setVisibility(false);
        this.view.flxDeactivatePermission.setVisibility(false);
        this.view.flxSelectOptions.setVisibility(false);
        this.hideViews();
    },
    hideViews : function(){
        this.view.flxAddMainContainer.setVisibility(false);
        this.view.flxViewPermissions.setVisibility(false);
        this.hideOptions();
    },
    hideOptions : function(){
        this.view.flxAddPermissionDetails.setVisibility(false);
        this.view.flxAddRoleDetails.setVisibility(false);
        this.view.flxAddOptionsContainer.setVisibility(false);
    },
    hideMainHeaderButtons : function(){
        this.view.mainHeader.flxAddNewOption.setVisibility(false);
        this.view.mainHeader.flxDownloadList.setVisibility(false);
    },
    hideAllOptionsButtonImages : function(){
        this.view.imgSelected1.setVisibility(false);
        this.view.imgSelected2.setVisibility(false);
        this.view.imgSelected3.setVisibility(false);
        this.view.imgSelected4.setVisibility(false);
    },

//show functions
    setHeaderText : function(){
        this.view.mainHeader.lblHeading.text="Roles";
        this.view.mainHeader.lblAddNewOption.text="ADD NEW ROLES";
    },
    toggleRtxVisibility : function(){
        if(this.view.rtxViewDescription.isVisible===true){
            this.view.rtxViewDescription.setVisibility(false);
        }
        else{
            this.view.rtxViewDescription.setVisibility(true);   
        }
    },
    showMainHeaderButtons : function(){
        this.view.mainHeader.flxAddNewOption.setVisibility(true);
        this.view.mainHeader.flxDownloadList.setVisibility(true);
    },
    showRoles: function(){
        this.hideAll();
        this.view.flxPermissions.setVisibility(true);
        this.view.flxMainSubHeader.setVisibility(true);
        this.showMainHeaderButtons();
        this.setRolesSegmentData();
    },
    toggleSegmentMenuPopup : function(){
        var popMenu=this.view.flxSelectOptions;
        if(popMenu.visibility===false){
        popMenu.setVisibility(true);
        }
        else{
        popMenu.setVisibility(false);
        }
    },
    toggleDeactivatePopup : function(){
        if(this.view.flxDeactivatePermission.visibility===false){
        this.view.flxDeactivatePermission.setVisibility(true);
        }
        else{
        this.view.flxDeactivatePermission.setVisibility(false);
        }
    },
    showAddNewPermissions : function(){
        this.hideAll();
        this.hideOptions();
        this.hideMainHeaderButtons();
        this.view.flxMainSubHeader.setVisibility(false);
        this.view.flxViews.setVisibility(true);
        this.view.flxAddMainContainer.setVisibility(true);
        this.view.flxAddPermissionDetails.setVisibility(true);
        this.view.lblAddOptionsHeading.text="Details";
        
    },
    showAddPermissions : function(){
        this.hideAll();
        this.hideOptions();
        this.hideMainHeaderButtons();
        this.setSelectedOptionsSegmentData();
        this.hideAllOptionsButtonImages();
        this.view.imgSelected2.setVisibility(true);
        this.view.flxViews.setVisibility(true);
        this.view.flxMainSubHeader.setVisibility(false);
        this.view.flxAddMainContainer.setVisibility(true);
        this.view.lblAddOptionsHeading.text="ADD PERMISSIONS";
        this.view.lblSelectedOption.text="Selected Permissions";
        this.view.lblAvailableOptionsHeading.text="Available Permissions";
        this.view.flxAddOptionsContainer.setVisibility(true);
        this.view.btnNext.setVisibility(true);
        this.setAddPermissionsSegmentData();
    },
    showAddUsers : function(){
        this.hideAll();
        this.hideOptions();
        this.hideMainHeaderButtons();
        this.setSelectedOptionsSegmentData();
        this.hideAllOptionsButtonImages();
        this.view.imgSelected3.setVisibility(true);
        this.view.flxViews.setVisibility(true);
        this.view.flxMainSubHeader.setVisibility(false);
        this.view.flxAddMainContainer.setVisibility(true);
        this.view.lblAddOptionsHeading.text="ADD USERS";
        this.view.lblSelectedOption.text="Selected Users";
        this.view.lblAvailableOptionsHeading.text="Available Users";
        this.view.flxAddOptionsContainer.setVisibility(true);
        this.view.btnNext.setVisibility(false);
        this.setAddUsersSegmentData();
    },
    showAddRoles : function(){
        this.hideAll();
        this.hideOptions();
        this.hideMainHeaderButtons();
        this.setSelectedOptionsSegmentData();
        this.hideAllOptionsButtonImages();
        this.view.imgSelected4.setVisibility(true);
        this.view.flxViews.setVisibility(true);
        this.view.flxMainSubHeader.setVisibility(false);
        this.view.flxAddMainContainer.setVisibility(true);
        this.view.lblAddOptionsHeading.text="ADD ROLES";
        this.view.lblSelectedOption.text="Selected Roles";
        this.view.lblAvailableOptionsHeading.text="Available Roles";
        this.view.flxAddOptionsContainer.setVisibility(true);
        this.view.btnNext.setVisibility(true);
        this.setAddRolesSegmentData();
    },
    showViewPermissionSegmentAndHeader : function(){
        this.view.flxPermissions.setVisibility(false);
        this.view.flxViews.setVisibility(true);
        this.view.flxAddMainContainer.setVisibility(false);
        this.view.flxViewPermissions.setVisibility(true);
        this.view.flxTabUnderline1.setVisibility(true);
        this.view.flxTabUnderline2.setVisibility(false);
        this.view.flxPermissionsHeader.setVisibility(true);
        this.view.flxUsersHeader.setVisibility(false);
        this.view.flxMainSubHeader.setVisibility(false);
        this.setViewPermissionSegmentData();
    },
    showViewUsersSegmentAndHeader : function(){
        this.view.flxTabUnderline1.setVisibility(false);
        this.view.flxTabUnderline2.setVisibility(true);
        this.view.flxPermissionsHeader.setVisibility(false);
        this.view.flxUsersHeader.setVisibility(true);
        this.setViewUsersSegmentData();
    },
    showAddNewRoles : function(){
        this.hideAll();
        this.hideOptions();
        this.hideMainHeaderButtons();
        this.view.flxMainSubHeader.setVisibility(false);
        this.view.flxViews.setVisibility(true);
        this.view.flxAddMainContainer.setVisibility(true);
        this.view.flxAddRoleDetails.setVisibility(true);
        this.view.lblAddOptionsHeading.text="Details";
    },
    setFlowActions : function(){
        var scopeObj=this;
        this.view.flxViewDescription.onClick=function(){
            scopeObj.toggleRtxVisibility();
        };
        this.view.flxViewEditButton.onClick=function(){
            scopeObj.showAddNewPermissions();
        };
      this.view.btnDeactivate.onClick = function(){
           scopeObj.DeactivatePermission();
         };
        this.view.btnLeaveAsItIs.onClick= function(){
           scopeObj.view.flxDeactivatePermission.setVisibility(false);
        };
        this.view.flxOption2.onClick=function(){
          scopeObj.showAddNewRoles();
        };
      this.view.flxOption4.onClick=function(){
        scopeObj.onClickActiveDeactive();
      };
      this.view.lblRoles.onTouchEnd=function(){
        scopeObj.showAddUsers();
      };
        this.view.lblPremissions.onTouchEnd=function(){
        scopeObj.showAddPermissions();
      };
        this.view.btnOptionDetails.onClick= function(){
            scopeObj.hideAllOptionsButtonImages();
            scopeObj.view.imgSelected1.setVisibility(true);
            scopeObj.showAddNewRoles();
        };
        this.view.btnAddPermissions.onClick= function(){
            scopeObj.hideAllOptionsButtonImages();
            scopeObj.view.imgSelected2.setVisibility(true);
            scopeObj.showAddPermissions();
        };
        this.view.btnAddUsers.onClick= function(){
            scopeObj.hideAllOptionsButtonImages();
            scopeObj.view.imgSelected3.setVisibility(true);
            scopeObj.showAddUsers();
        };
        this.view.btnAddRoles.onClick= function(){
            scopeObj.hideAllOptionsButtonImages();
            scopeObj.view.imgSelected4.setVisibility(true);
            scopeObj.showAddRoles();
        };
        this.view.lblTabName1.onTouchEnd= function(){
            scopeObj.showViewPermissionSegmentAndHeader();
        };
        this.view.lblTabName2.onTouchEnd= function(){
            scopeObj.showViewUsersSegmentAndHeader();
        };
        this.view.mainHeader.flxAddNewOption.onClick=function(){
            scopeObj.showAddNewRoles();
            scopeObj.hideAllOptionsButtonImages();
            scopeObj.view.imgSelected1.setVisibility(true);
        };
        this.view.btnBackToMain.onClick= function(){
            scopeObj.showRoles();
        };
        this.view.btnCancel.onClick= function(){
            scopeObj.showRoles();
        };
        this.view.btnAddRoleCancel.onClick= function(){
            scopeObj.showRoles();
        };
        this.view.btnAddPermissionCancel.onClick= function(){
            scopeObj.showRoles();
        };
        this.view.btnAddRoleNext.onClick= function(){
            scopeObj.showAddPermissions();
        };
        this.view.btnAddPermissionNext.onClick= function(){
            scopeObj.showAddRoles();
        };
        this.view.btnNext.onClick= function(){
            var from=scopeObj.view.lblAddOptionsHeading.text;
            if(from==="ADD ROLES"||from==="ADD PERMISSIONS"){
                scopeObj.showAddUsers();
            }
            else if(from==="ADD USERS"){
                //code to gofrom add users
            }
        };
        this.view.btnSave.onClick= function(){
            scopeObj.showRoles();
        };
        this.view.btnAddRoleSave.onClick= function(){
            scopeObj.showRoles();
        };
        this.view.btnAddPermissionSave.onClick= function(){
            scopeObj.showRoles();
        };
        
        /*
        this.view..onClick= function(){
            scopeObj.();
        };
        */

    },
    setRolesSegmentData : function(){
        var dataMap={
            "flxRoleHeaderDescription": "flxRoleHeaderDescription",
            "flxRoleHeaderName": "flxRoleHeaderName",
            "flxRoleHeaderPermissions": "flxRoleHeaderPermissions",
            "flxRoleHeaderStatus": "flxRoleHeaderStatus",
            "flxRoleHeaderUsers": "flxRoleHeaderUsers",
            "flxRoleHeaderValidTill": "flxRoleHeaderValidTill",
            "flxRolesHeader": "flxRolesHeader",
            "imgSortName": "imgSortName",
            "imgSortPermissions": "imgSortPermissions",
            "imgSortStatus": "imgSortStatus",
            "imgSortUsers": "imgSortUsers",
            "imgValidTillSort": "imgValidTillSort",
            "lblRoleHeaderDescription": "lblRoleHeaderDescription",
            "lblRoleHeaderName": "lblRoleHeaderName",
            "lblRoleHeaderPermissions": "lblRoleHeaderPermissions",
            "lblRoleHeaderSeperator": "lblRoleHeaderSeperator",
            "lblRoleHeaderStatus": "lblRoleHeaderStatus",
            "lblRoleHeaderUsers": "lblRoleHeaderUsers",
            "lblRoleHeaderValidTill": "lblRoleHeaderValidTill",
            "flxOptions": "flxOptions",
            "flxRoles": "flxRoles",
            "flxStatus": "flxStatus",
            "imgOptions": "imgOptions",
            "imgRoleStatus": "imgRoleStatus",
            "lblDescription": "lblDescription",
            "lblHeaderSeperator":"lblHeaderSeperator",
            "lblNoOfUsers": "lblNoOfUsers",
            "lblPermissions": "lblPermissions",
            "lblRoleName": "lblRoleName",
            "lblRoleStatus": "lblRoleStatus",
            "lblSeperator": "lblSeperator",
            "lblValidTillDate": "lblValidTillDate"
        };
        var data=
        [
            [
                {
                    "imgSortName": "sorting3x.png",
                    "imgSortPermissions": "sorting3x.png",
                    "imgSortStatus": "sorting3x.png",
                    "imgSortUsers": "sorting3x.png",
                    "imgValidTillSort": "sorting3x.png",
                    "lblHeaderSeperator":"-",
                    "lblRoleHeaderDescription": "DESCRIPTION",
                    "lblRoleHeaderName": "NAME",
                    "lblRoleHeaderPermissions": "PERMISSIONS",
                    "lblRoleHeaderSeperator": "-",
                    "lblRoleHeaderStatus": "STATUS",
                    "lblRoleHeaderUsers": "USERS",
                    "lblRoleHeaderValidTill": "VALID TILL",
                    "template":"flxRolesHeader"

                },
                [
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    },
                    {
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "template":"flxRoles"
                    }
                ]
            ]
        ];
        this.view.segPermissions.widgetDataMap=dataMap;
        this.view.segPermissions.setData(data);
        this.view.forceLayout();
    },
    setAddPermissionsSegmentData : function(){
        var dataMap={
            "btnAdd": "btnAdd",
            "flxAddPermissions": "flxAddPermissions",
            "flxAddWrapper": "flxAddWrapper",
            "lblPermissionsName": "lblPermissionsName",
            "rtxPermissionDescription": "rtxPermissionDescription"
        };
        var data=[{
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        },
        {
            "btnAdd": "Add",
            "lblPermissionsName": "View Permission",
            "rtxPermissionDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "template":"flxAddPermissions"
        }];
        this.view.segAddOptions.widgetDataMap=dataMap;
        this.view.segAddOptions.setData(data);
        this.view.forceLayout();
    },
    setAddUsersSegmentData : function(){
        var dataMap={
                "btnAdd": "btnAdd",
                "flxAddRole": "flxAddRole",
                "flxAddWrapper": "flxAddWrapper",
                "lblRoleName": "lblRoleName",
                "rtxRoleDescription": "rtxRoleDescription"
            };
        var data=[{
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            },
            {
                "btnAdd": "Add",
                "lblRoleName": "CSR Agent",
                "rtxRoleDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "template":"flxAddRole"
            }
        ];
        this.view.segAddOptions.widgetDataMap=dataMap;
        this.view.segAddOptions.setData(data);
        this.view.forceLayout();
    },
    setAddRolesSegmentData : function(){
        var dataMap={
            "btnAdd": "btnAdd",
            "flxAddUsers": "flxAddUsers",
            "flxAddUsersWrapper": "flxAddUsersWrapper",
            "flxxUsernameWrapper": "flxxUsernameWrapper",
            "lblFullName": "lblFullName",
            "lblUserIdValue": "lblUserIdValue",
            "lblUsername": "lblUsername"
        };
        var data=[
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            },
            {
                "btnAdd": "Add",
                "lblFullName": "John Doe",
                "lblUserIdValue": "TDU34256987",
                "lblUsername": "USERNAME",
                "template":"flxAddUsers"
            }
        ];
        this.view.segAddOptions.widgetDataMap=dataMap;
        this.view.segAddOptions.setData(data);
        this.view.forceLayout();
    },
    setViewUsersSegmentData : function(){
        var dataMap={
            "flxViewUsers": "flxViewUsers",
            "lblViewEmailId": "lblViewEmailId",
            "lblViewFullName": "lblViewFullName",
            "lblViewSeperator": "lblViewSeperator",
            "lblViewUpdatedBy": "lblViewUpdatedBy",
            "lblViewUpdatedDate": "lblViewUpdatedDate",
            "lblViewUpdatedTime": "lblViewUpdatedTime",
            "lblViewUsername": "lblViewUsername"
        };
        var data=[
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            },
            {
                "lblViewEmailId": "john.doe@kony.com",
                "lblViewFullName": "John Doe",
                "lblViewSeperator": "-",
                "lblViewUpdatedBy": "Chester Dean",
                "lblViewUpdatedDate": "17/08/2017",
                "lblViewUpdatedTime": "10:30 AM PST",
                "lblViewUsername": "john.doe",
                "template":"flxViewUsers"
            }
        ];
        this.view.segViewSegment.widgetDataMap=dataMap;
        this.view.segViewSegment.setData(data);
        this.view.forceLayout();
    },
    setViewPermissionSegmentData : function(){
        var dataMap={
            "flxViewPermissions": "flxViewPermissions",
            "lblDescription": "lblDescription",
            "lblPermissionName": "lblPermissionName",
            "lblSeperator": "lblSeperator"
        };
        var data=[
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            },
            {
            "lblDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
            "lblPermissionName": "View Permission",
            "lblSeperator": "-",
            "template": "flxViewPermissions"
            }
        ];
        this.view.segViewSegment.widgetDataMap=dataMap;
        this.view.segViewSegment.setData(data);
        this.view.forceLayout();
    },
    setSelectedOptionsSegmentData : function(){
        var dataMap={
            "flxAddOptionWrapper": "flxAddOptionWrapper",
            "flxClose": "flxClose",
            "flxOptionAdded": "flxOptionAdded",
            "imgClose": "imgClose",
            "lblOption": "lblOption"
        };
        var data=[{}];
        this.view.segSelectedOptions.widgetDataMap=dataMap;
        this.view.segSelectedOptions.setData(data);
        this.view.forceLayout();
    },
  
       onClickOptions : function(){
        var selItems = this.view.segPermissions.selectedItems[0];
          this.gblselIndex = this.view.segPermissions.selectedIndex[1];
          
         if(selItems.lblRoleStatus.text === "Active"){
             this.view.segPermissions.setDataAt({
                        "imgOptions": selItems.imgOptions,
                        "imgRoleStatus": selItems.imgRoleStatus,
                        "lblDescription": selItems.lblDescription,
                        "lblNoOfUsers": selItems.lblNoOfUsers,
                        "lblPermissions": selItems.lblPermissions,
                        "lblRoleName": selItems.lblRoleName,
                        "lblRoleStatus": selItems.lblRoleStatus,
                        "lblSeperator": selItems.lblSeperator,
                        "lblValidTillDate": selItems.lblValidTillDate,
                       "flxOptions" : {"skin" : "sknflxffffffop100Border424242Radius100px"},
                        "template":"flxRoles"
                    },this.gblselIndex);
             this.view.lblRoles.text = "Users";
             this.view.lblRoles.setVisibility(true);
             this.view.lblPremissions.text = "Permissions";
             this.view.lblPremissions.setVisibility(true);
             this.view.lblOption2.text = "Edit";
             this.view.lblOption4.text = "Deactivate";
             this.view.flxSelectOptions.setVisibility(true);  
         }else{
            this.view.segPermissions.setDataAt({
                        "imgOptions": selItems.imgOptions,
                        "imgRoleStatus": selItems.imgRoleStatus,
                        "lblDescription": selItems.lblDescription,
                        "lblNoOfUsers": selItems.lblNoOfUsers,
                        "lblPermissions": selItems.lblPermissions,
                        "lblRoleName": selItems.lblRoleName,
                        "lblRoleStatus": selItems.lblRoleStatus,
                        "lblSeperator": selItems.lblSeperator,
                        "lblValidTillDate": selItems.lblValidTillDate,
                       "flxOptions" : {"skin" : "sknflxffffffop100Border424242Radius100px"},
                        "template":"flxRoles"
                    },this.gblselIndex);
            this.view.lblRoles.text = "Users";
             this.view.lblRoles.setVisibility(false);
             this.view.lblPremissions.text = "Permissions";
             this.view.lblPremissions.setVisibility(false);
             this.view.lblOption2.text = "Edit";
             this.view.lblOption4.text = "Activate";
             this.view.flxSelectOptions.setVisibility(true);  
         }
        
         
  },
   onClickActiveDeactive:function(){
        if(this.view.lblOption4.text === "Activate"){
            this.view.lblDeactivePermission.text = "Activate Role?";
            this.view.RichTextDisclaimer.text = "Are you sure to activate \"<b>Role Admin</b>\"?<br><br>The role has been assigned to few Permissions and Users. Activating this may impact their ability to perform certain actions.";
            this.view.btnDeactivate.text = "Yes,activate";
            this.view.flxDeactivatePermission.setVisibility(true);
            this.view.flxSelectOptions.setVisibility(false);
        }
     else  if(this.view.lblOption4.text === "Deactivate"){
            this.view.lblDeactivePermission.text = "Deactivate Role?";
            this.view.RichTextDisclaimer.text = "Are you sure to deactivate \"<b>Role Admin</b>\"?<br><br>The role has been assigned to few Permissions and Users. Deactivating this may impact their ability to perform certain actions.";
            this.view.btnDeactivate.text = "Yes,deactivate";
            this.view.flxDeactivatePermission.setVisibility(true);
            this.view.flxSelectOptions.setVisibility(false);
        }
   },
  
  DeactivatePermission:function(){
      if(this.view.btnDeactivate.text === "Yes,deactivate")
        {
             this.view.flxDeactivatePermission.setVisibility(false);
             this.view.lbltoastMessage.text = "Role successfully deactivated.";
             kony.timer.schedule("mytimer", this.callBackTimer, 2, false);
             this.view.flxToastMessage.setVisibility(true);
             this.view.segPermissions.setDataAt({
                        "imgOptions": "dots3x.png",
                        "imgRoleStatus": "inactive_circel2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Inactive","skin":"sknlblLatoDeactive"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "flxOptions" : {"skin" : "sknFlxTrans"},
                        "template":"flxRoles"
                    },this.gblselIndex);
        }
    else
      {
           this.view.flxDeactivatePermission.setVisibility(false);
           this.view.lbltoastMessage.text = "Role successfully activated.";
           kony.timer.schedule("mytimer", this.callBackTimer, 2, false);
            this.view.flxToastMessage.setVisibility(true);
           this.view.segPermissions.setDataAt({
                       "imgOptions": "dots3x.png",
                        "imgRoleStatus": "active_circle2x.png",
                        "lblDescription": "Lorem ipsum dolor sit amet, consectetur.",
                        "lblNoOfUsers": "25",
                        "lblPermissions": "20",
                        "lblRoleName": "Admin Role",
                        "lblRoleStatus": {"text":"Active","skin":"sknlblLato5bc06cBold14px"},
                        "lblSeperator": "-",
                        "lblValidTillDate": "01/12/2018",
                        "flxOptions" : {"skin" : "sknFlxTrans"},
                        "template":"flxRoles"
                    },this.gblselIndex);
      }
  },
 callBackTimer : function() 
  {
    kony.timer.cancel("mytimer");
   this.view.flxToastMessage.setVisibility(false);
}

});
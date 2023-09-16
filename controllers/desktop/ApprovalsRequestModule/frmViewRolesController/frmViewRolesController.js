define({
  currentPage:1,
  recordsSize:20,
  gblsegRoles:0,
  roleId:"0",
  mouseYCoordinate:0,
  roleDetails:{},
  selectedArrowArray : [],
  isKeyCloakEnabled :false,
  serviceTypes :{"TYPE_ID_RETAIL":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking"),
                 "TYPE_ID_BUSINESS":kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking"),
                 "TYPE_ID_WEALTH":kony.i18n.getLocalizedString("i18n.frmGroupsController.WealthBanking")
                },
  MAX_TEXTLIMIT_TEXTAREACOMMENT: 150,
  rolesPreshow : function(){
    /*kony.adminConsole.utils.showProgressBar(this.view);
    this.skipTop = 0;
    this.skipBottom=0;
    this.end =0;
    this.endTop=0;
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    var roleModule=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.flxDownloadList.skin = "sknflxSuccessToast1F844D";
    this.view.mainHeader.lblDownloadList.skin = "sknFontIconSearchImgFFFFFF";
    this.view.popUp.btnPopUpCancel.setVisibility(false);
    this.view.popUp.btnPopUpDelete.text=kony.i18n.getLocalizedString("i18n.SecurityQuestions.OK");
    this.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Cannot_Create_Role_Details");
    this.view.popUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmRolesController.select_at_least_one_permission");
    this.view.popUp.btnPopUpDelete.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.btnPopUpDelete.focusSkin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.btnPopUpDelete.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.flxPopUpTopColor.skin="sknFlxee6565Op100NoBorder";
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName1);
    this.selectedArrowArray=[this.view.fontIconImgSelected1,this.view.fontIconImgSelected3,this.view.lblIconCustomerAccessSelected,
                            this.view.lblIconSysPermisionsSelected];
    this.view.lblRoleDescriptionSize.setVisibility(false);
    this.view.lblRoleNameSize.setVisibility(false);
    this.view.rtxAvailabletxt.setVisibility(false);
    this.view.btnAddAll.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(false);
    this.view.flxRoleStatusFilter.setVisibility(false);
    this.setFlowActions();
    this.showRoles();
    //this.view.flxPermissions.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = 
    kony.i18n.getLocalizedString("i18n.permission.ROLES");
    this.view.breadcrumbs.btnBackToMain.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
      var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxViewPermissions.height = screenHeight-145 +"px";
    this.setHeaderText();
    this.clearRoleDefaults();*/
    this.view.flxMain.height = kony.os.deviceInfo().screenHeight+"px";
    var self = this;
    this.view.flxToastMessage.setVisibility(false);
    this.view.mainHeader.ButtonApprove.onClick = function(){
      self.view.flxLoading.setVisibility(true);
      var request = {
        "requestStatus" : "Approved"
      };
      self.approveRole(request);
    };
    
    this.view.mainHeader.ButtonReject.onClick = function () {
      self.view.flxApproveRejectRequestConfirmation.setVisibility(true);      
    };
  },
  shouldUpdateUI: function (viewModel) {
    return viewModel !== undefined && viewModel !== null;
  },
  clearRoleDefaults: function() {
    this.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
    this.view.flxNoRoleNameError.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(false);
    this.currentPage = 1;
    this.view.searchBoxRoles.tbxSearchBox.text = "";
    this.view.searchBoxRoles.flxSearchCancel.setVisibility(false);
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
    //this.view.lbxPagination.selectedKey = this.currentPage;
  },
   will: function (viewModel){
      this.updateLeftMenu(viewModel);
     //if(roleModel.context === "fetchRoleDetails"){
     this.roleDetailsObj = {
       "roleDetails": {
         "roleId": "RID_BUSINESS",
         "roleName": "Business",
         "roleDesc": "This role is for business users who want to view the admin console capabilties, review data but not make major changes. These users can also send messages to customers and view/update their details",
         "roleStatus": "SID_ACTIVE"
       }
     } ;
     this.view.flxRolesBreadCrumb.setVisibility(true);
     this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.View_Roles");
     //var segIndex = this.view.segPermissions.selectedRowIndex[1];
     //var segData = this.view.segPermissions.data[segIndex];
     this.view.breadcrumbs.lblCurrentScreen.text=this.roleDetailsObj.roleDetails.roleName.toUpperCase();
     //this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
     this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
     this.view.lblViewValue1.text = this.roleDetailsObj.roleDetails.roleName ;
     this.view.rtxViewDescription.text = this.roleDetailsObj.roleDetails.roleDesc ;
     //this.view.fontIconViewValue2.skin = segData.fontIconStatusImg.skin;
     if(this.roleDetailsObj.roleDetails.roleStatus === this.AdminConsoleCommonUtils.constantConfig.ACTIVE){
       this.view.lblViewValue2.text =  kony.i18n.getLocalizedString("i18n.secureimage.Active") ;
        this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px" ;
      }else{
        this.view.lblViewValue2.text =  kony.i18n.getLocalizedString("i18n.secureimage.Inactive") ;
        this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px" ;
      }
      this.showViewPermissionSegmentAndHeader();
      kony.adminConsole.utils.hideProgressBar(this.view);
  //}
   },
  willUpdateUI: function (roleModel) {
    this.updateLeftMenu(roleModel);
    if(roleModel.isKeyCloakEnabled){
      this.isKeyCloakEnabled=roleModel.isKeyCloakEnabled;
    }
    else if (roleModel.context  === "viewRoles"||roleModel.context  === kony.i18n.getLocalizedString("i18n.frmRolesController.update")||roleModel.context  === "create") {
      this.clearRoleDefaults();
      this.sortBy = this.getObjectSorter('role_Name');
      this.determineSortFontIcon(this.sortBy,"role_Name",this.view.fontIconSortName);
      this.resetSortFontIcons();
      this.view.mainHeader.flxDownloadList.info=undefined;
      this.loadPageData = function(){
        this.showRoles();
        this.view.flxSegmentPermmissions.setVisibility(true);
        this.view.flxRolesHeader.setVisibility(true);
        this.setRolesSegmentData(roleModel.fetchRoleList.filter(this.searchFilter).sort(this.sortBy.sortData));
        //           if(this.nextPageDisabled){
        //               this.view.flxNext.hoverSkin ="sknDisableCursor";
        //               this.view.fontIconImgNext.skin="sknFontIconPrevNextDisable";
        //             }else{
        //               this.view.flxNext.hoverSkin ="sknCursor";
        //               this.view.fontIconImgNext.skin= "sknFontIconPrevNextPage";
        //             }
        //             if(this.prevPageDisabled){
        //               this.view.flxPrevious.hoverSkin ="sknDisableCursor";
        //               this.view.fontIconImgPrevious.skin="sknFontIconPrevNextDisable";
        //             }else{
        //               this.view.flxPrevious.hoverSkin ="sknCursor";
        //               this.view.fontIconImgPrevious.skin="sknFontIconPrevNextPage";
        //             } 
        kony.adminConsole.utils.hideProgressBar(this.view);
        if((this.fromEditRoles === true && roleModel.status === true) || (this.fromCreateRole === true && roleModel.status=== true))
          this.showSuccessMessage();
        else if((this.fromEditRoles === true && roleModel.status === false) || (this.fromCreateRole === true && roleModel.status === false))
          this.showErrorMessage();
      };
      this.loadPageData();
    }
    else if (roleModel.context === "updateRole" || roleModel.context === "createRole") {
      this.allPermissionsData = this.parseAllPermissionsData(roleModel.fetchRoleUpdates.fetchActivePermissions);
      this.orgRolePermissions = this.parseRolePermissionsData(roleModel.fetchRoleUpdates.fetchRolePermissions);
      if(this.isKeyCloakEnabled===false){
      this.orgRoleUsers = this.parseRoleUsersData(roleModel.fetchRoleUpdates.fetchRoleUsers);
      this.allUsersData = this.parseAllUserData(roleModel.fetchRoleUpdates.fetchActiveUsers);        
      this.roleUsers = this.parseRoleUsersData(roleModel.fetchRoleUpdates.fetchRoleUsers);
      }
      this.rolePermissions = this.parseRolePermissionsData(roleModel.fetchRoleUpdates.fetchRolePermissions);
      this.view.segCustAccess.info = {"orgServiceList":[],"segData" :[],"editServiceList":[] };
      this.view.segCustAccess.info.segData = this.parseAllServiceDefinitions(roleModel.fetchRoleUpdates.fetchAllServiceDef,roleModel.fetchRoleUpdates.fetchRoleServiceDef);
      this.view.segCustAccess.info.editServiceList = roleModel.fetchRoleUpdates.fetchRoleServiceDef;
      kony.adminConsole.utils.hideProgressBar(this.view);

      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
      if(roleModel.context === "updateRole"){
        for(var i=0;i<roleModel.fetchRoleList.length;i++){
          if(roleModel.fetchRoleList[i].role_id===this.roleId)
            this.view.breadcrumbs.lblCurrentScreen.text = roleModel.fetchRoleList[i].role_Name.toUpperCase();
        }
      }
      else {
        this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.CREATE");
        this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Add_Roles");
      }
     // this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      if(this.addNewRolePath !==true){
        this.addNewRolePath = false;
        this.showAddNewRoles();
      }
      if(this.directUsers === true){
        this.view.mainHeader.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmRolesController.Edit_Roles");
        this.directUsers = false;
        this.addNewRolePath = false;
        this.showAddUsers();
      }
      if(this.directPermissions === true){
        this.view.mainHeader.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmRolesController.Edit_Roles");
        this.showAddServiceDefinitions();
        this.addNewRolePath = false;
        this.directPermissions = false;
      }
    }
    else if(roleModel.context === "fetchRoleDetails"){
      this.roleDetailsObj = roleModel.fetchRoleDetails ;
      this.view.flxRolesBreadCrumb.setVisibility(true);
      this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.View_Roles");
      //var segIndex = this.view.segPermissions.selectedRowIndex[1];
      //var segData = this.view.segPermissions.data[segIndex];
      //this.view.breadcrumbs.lblCurrentScreen.text=this.roleDetailsObj.roleDetails.roleName.toUpperCase();
      //this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
     //res.records[0].rolepermission_approval_view[0].Permission_Description //this.view.lblViewValue1.text = this.roleDetailsObj.roleDetails.roleName ;
      //this.view.fontIconViewValue2.skin = segData.fontIconStatusImg.skin;
      this.view.lblViewValue1.text = (roleModel.fetchRoleDetails.rolePermissions[0] && roleModel.fetchRoleDetails.rolePermissions[0].Role_Name) ? roleModel.fetchRoleDetails.rolePermissions[0].Role_Name : "";
      this.view.rtxViewDescription.text = (roleModel.fetchRoleDetails.rolePermissions[0] && roleModel.fetchRoleDetails.rolePermissions[0].Role_Description) ? roleModel.fetchRoleDetails.rolePermissions[0].Role_Description : "";      //this.view.fontIconViewValue2.skin = segData.fontIconStatusImg.skin;
      if (roleModel.fetchRoleDetails.rolePermissions[0] && roleModel.fetchRoleDetails.rolePermissions[0].Role_Status_id) {
        if (roleModel.fetchRoleDetails.rolePermissions[0].Role_Status_id === this.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
          this.view.lblViewValue2.text = kony.i18n.getLocalizedString("i18n.secureimage.Active");
          this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px";
          this.view.fontIconViewValue2.skin = "sknFontIconActivate";
        } else if (roleModel.fetchRoleDetails.rolePermissions[0].Role_Status_id === this.AdminConsoleCommonUtils.constantConfig.INACTIVE) {
          this.view.lblViewValue2.text = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
          this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px";
          this.view.fontIconViewValue2.skin = "sknfontIconInactive";
        }
      }
      this.showViewPermissionSegmentAndHeader();
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else if(roleModel.context === "fetchCompositeActions"){
      this.setDataToCSRAssistSegment(roleModel.fetchCompositeActions.CompositeActions)
    }else if(roleModel.context === "fileId"){
      this.downloadCSV(roleModel.fileId)
    }else if(roleModel.toast){
      kony.adminConsole.utils.hideProgressBar(this.view);
      if(roleModel.toast === "Success"){
        this.view.toastMessage.showToastMessage(roleModel.message,this);
      }else{
        this.view.toastMessage.showErrorToastMessage (roleModel.message,this);
      }
    }
    else if(roleModel.LoadingScreen){
      if(roleModel.LoadingScreen.focus===true)
        kony.adminConsole.utils.showProgressBar(this.view);
      else if(roleModel.LoadingScreen.focus===false)
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if(roleModel.successMessage === "createRole"){
      var msg = kony.i18n.getLocalizedString("i18n.createRole.successMessage");
	  var requestId = "Request Id: " + roleModel.requestId;
      var toastMsg = msg+requestId; 
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }  
    else if(roleModel.successMessage === "createRoleWithoutApproval"){
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.createRoleWithoutApproval.successMessage"),this);
    }
     else if(roleModel.successMessage === "updateRole"){
      var msg = kony.i18n.getLocalizedString("i18n.updateRole.successMessage");
	  var requestId = "Request Id: " + roleModel.requestId;
      var toastMsg = msg+requestId; 
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }  
    else if(roleModel.successMessage === "updateRoleWithoutApproval"){
       this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateRoleWithoutApproval.successMessage"),this);
    }
    else if(roleModel.successMessage === "deactivate"){
      var toastMsg = roleModel.message + "Request Id: " + roleModel.requestId;
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }
    else if(roleModel.successMessage === "deactiveWithoutApproval"){
      var toastMsg = roleModel.message;
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }
    else if(roleModel.successMessage === "activate"){
      var toastMsg = roleModel.message + "Request Id: " + roleModel.requestId;
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }
    else if(roleModel.successMessage === "activeWithoutApproval"){
      var toastMsg = roleModel.message;
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }
    else if(roleModel.action === "fromBackend"){
      this.view.flxApproveRejectRequestConfirmation.setVisibility(false);
      if (roleModel.roleToast === "success") {
        this.view.flxLoading.setVisibility(false);
        let toastMessage = "";
        if (roleModel.approvalRequest && roleModel.request && roleModel.approvalRequest.statusMessage === 'Data Migration Success') {
          if (roleModel.request.status === "Approved") {
            toastMessage = kony.i18n.getLocalizedString("i18n.approvalsRequest.approvedSuccessMessage");
          } else if (roleModel.request.status === "Rejected") {
            toastMessage = kony.i18n.getLocalizedString("i18n.approvalsRequest.rejectedSuccessMessage");
          }
        }
        this.view.toastMessage.showToastMessage(toastMessage, this);
      }
      else if(roleModel.roleToast === "Approved Already"){
        this.view.flxLoading.setVisibility(false);
        let toastMessage = "The role '"+roleModel.roleName +"' has been approved already";
        this.view.toastMessage.showErrorToastMessage(toastMessage, this);
      }
      this.presenter.callingApprovalsData();
    }
  },
  
  parseRoleUsersData : function(roleUsers){
    var self=this;
    var data = roleUsers.map(function(roleUsers) {
      var fullname = roleUsers.FirstName+" "+(roleUsers.MiddleName===null ? "" : roleUsers.MiddleName) + " " + roleUsers.LastName ;
      return{
        "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmRolesController.remove_user")}, 
        "lblOption": fullname ,
        "userId": roleUsers.User_id,
        "sourceData": {
          "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
          "lblFullName": fullname,
          "lblUserIdValue":{
            "text" : roleUsers.User_id,
            "isVisible" : false
          },
          "lblUsername": roleUsers.Username,
          "template":"flxAddUsers",
          "userId":roleUsers.User_id},
        "flxClose":{"isVisible":false,"onClick":self.unSelectedOption},
        "flxAddOptionWrapper":{
          "onHover":self.onHoverEventCallback

        }
      };

    });
    return data;
  },
  parseAllPermissionsData: function(rolePermissions){
    var self = this;
    var data = rolePermissions.map(function(rolePermissions) {
      return{
        "btnAdd": {
          "text":kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
          "onClick":self.addPermissionstoRole
        },
        "lblPermissionsName": rolePermissions.Permission_Name,
        "rtxPermissionDescription": rolePermissions.Permission_Desc,
        "template":"flxAddPermissions",
        "permissionId":rolePermissions.Permission_id
      };
    });
    return data;
  },
  parseRolePermissionsData : function(rolePermissions) {
    var self=this;
    var data = rolePermissions.map(function(rolePermissions) {
      return{
        "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmRolesController.remove_permission")}, 
        "lblOption": rolePermissions.Permission_Name,
        "permissionId": rolePermissions.Permission_id,
        "sourceData": {
          "btnAdd": {
            "text":kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
            "onClick":self.addPermissionstoRole
          },
          "lblPermissionsName": rolePermissions.Permission_Name,
          "rtxPermissionDescription": rolePermissions.Permission_Description,
          "template":"flxAddPermissions",
          "permissionId":rolePermissions.Permission_id
        },
        "flxClose":{"isVisible":false,"onClick":function(){self.showRemovePermissionPopup(1);}},
        "flxAddOptionWrapper":{
          "onHover":self.onHoverEventCallback

        }

      };
    });
    return data;
  },
  parseAllUserData : function(userData) {
    var data = userData.map(function(userData) {
      var fullname = userData.FirstName+" "+(userData.MiddleName===null ? "": userData.MiddleName) + " " + userData.LastName;
      return {
        "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
        "lblFullName": fullname,
        "lblUserIdValue":{
          "text" : userData.UserID,
          "isVisible" : false
        },
        "lblUsername": userData.Username,
        "template":"flxAddUsers",
        "userId":userData.UserID
      };
    });
    return data;
  },
  /*
  * map service definition segment data
  * @param: all service definition list, service def of role
  * @return : mapped segment data
  */
  parseAllServiceDefinitions : function(allServiceDef,roleServiceDef){
    var self =this;
    var groupedServiceDefList = this.getServiceDefBasedOnType(allServiceDef);
    
    var serviceTypes = Object.keys(groupedServiceDefList);
    var actualData = [];
    var roleServiceId = [];
    //get id for service definition assigned to selected role
    if(roleServiceDef){
      for(var j=0; j<roleServiceDef.length; j++){
        roleServiceId.push(roleServiceDef[j].ServiceDefinition_id);
      }
    }
    var segData = serviceTypes.map(function(record){
      var rowsData = [], selRowCount =0;
      var serviceDef = groupedServiceDefList[record];
      for(var i=0; i<serviceDef.length; i++){
        rowsData.push({
          "id":serviceDef[i].id,
          "type": serviceDef[i].serviceType,
          "isEnabled": roleServiceId.indexOf(serviceDef[i].id) >= 0 ? true : false,
          "typeName":self.serviceTypes[serviceDef[i].serviceType] || kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "flxRolesServiceDefRow":{"isVisible":false,
                                   "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxCheckbox":{"onClick":self.onCheckServiceDefCheckbox.bind(self,self.view.segCustAccess,false)},
          "imgCheckbox":{"src": roleServiceId.indexOf(serviceDef[i].id) >= 0 ? self.AdminConsoleCommonUtils.checkboxSelected : self.AdminConsoleCommonUtils.checkboxnormal},
          "lblServiceDefName":{"text":serviceDef[i].name},
          "lblServiceDefDesc":{"text":serviceDef[i].description || kony.i18n.getLocalizedString("i18n.Applications.NA")},
          "template":"flxRolesServiceDefRow",
        });
        if(roleServiceId.indexOf(serviceDef[i].id) >= 0){
          selRowCount = selRowCount +1;
        }
      }
      
      var sectionData = {
        "type":record,
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "lblFeatureName": {"text": self.serviceTypes[record] || kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "flxToggleArrow": {"onClick": self.toggleServiceDefRows.bind(self, self.view.segCustAccess)},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknIcon00000015px"},
        "lblAvailableActions":{"text":"Selected Services: "},
        "lblCountActions":{"text": selRowCount+""},
        "lblTotalActions":{"text":" of "+ rowsData.length},
        "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
        "lblSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
        "imgSectionCheckbox":{"src":self.getHeaderCheckboxImage(rowsData,true,true)},
        "flxCheckbox":{"onClick":self.onCheckServiceDefCheckbox.bind(self,self.view.segCustAccess,true)},
        "flxHeaderContainer":{"isVisible":false,"height":"40dp"},
        "lblAccountNumber":{"text":"SERVICE"},
        "flxAccountType":"flxAccountType",
        "lblAccountType":{"text":"DESCRIPTION"},
        "template":"flxEnrollSelectedAccountsSec"
      };
      actualData.push({"sectionData":sectionData,"rowData":rowsData});
      return [sectionData,rowsData];
    });
    this.view.segCustAccess.info.orgServiceList = actualData;
    return segData;
  },
  /*
  * get grouped service definitions based on the type
  * @param: service definition list
  * @return: grouped service def list
  */
  getServiceDefBasedOnType : function(serviceList){
    var groupedServiceDef = {};
    if(serviceList && serviceList.length > 0){
      groupedServiceDef = serviceList.reduce(function(group, serviceDef) {
        var serviceType = serviceDef.serviceType || serviceDef.ServiceDefinition_Type_id;
        (group[serviceType] = group[serviceType] || []).push(serviceDef);
        return group;
      }, {});
    }
    return groupedServiceDef;
  },
  //   gotoPage : function(){
  //     this.currentPage = this.view.lbxPagination.selectedKey;
  //     this.loadPageData();
  //     this.view.lbxPagination.selectedKey = this.currentPage;
  //   },
  //   nextPage: function () {
  //     if (this.nextPageDisabled) {
  //       return;
  //     }
  //     this.currentPage++;
  //     this.view.lbxPagination.selectedKey = this.currentPage;
  //     this.loadPageData();
  //   },
  //   prevPage: function () {
  //     if (this.prevPageDisabled) {
  //       return;
  //     }
  //     this.currentPage--;
  //     this.view.lbxPagination.selectedKey = this.currentPage;
  //     this.loadPageData();
  //   },
  searchData:function(){
    this.loadPageData();
  },
  searchFilter: function (Role) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.searchBoxRoles.tbxSearchBox.text);
    if(typeof searchText === 'string' && searchText.length >0){
      return Role.role_Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }else{
      return true;
    }
  },

  rolesPostShow : function(){
    this.namesFlag = true;
    this.userCountFlag = true;
    this.permissionFlag = true;
    this.statusFlag = true;
  },
  //scrollHeightSetting
  setScrollHeight :function(opt){
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    if(opt===1){ //with subheader
      scrollHeight= screenHeight-106;
    }
    else{ //without subheader
      scrollHeight= screenHeight-106-63;    
    }
    this.view.flxScrollMainContent.height=scrollHeight+"px";
    this.view.flxAddMainContainer.height = scrollHeight - 40 + "px";
    this.view.flxCreateRoleMainCont.height = scrollHeight -30+"dp";
    this.view.flxSegRoles.height = screenHeight - 250 + "px";
  },


  //hide functions
  hideAll : function(){
    this.view.flxRoleStatusFilter.setVisibility(false);
    this.view.flxViews.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(false);
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
    this.view.flxAssignCustomerAccess.setVisibility(false);
  },
  hideMainHeaderButtons : function(){
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
  },
  hideMainSubHeader : function(){
    this.view.flxMainSubHeader.setVisibility(false);
    this.setScrollHeight(1);
  },
  hideAllOptionsButtonImages : function(){
    this.view.fontIconImgSelected1.setVisibility(false);
    this.view.fontIconImgSelected2.setVisibility(false);
    this.view.fontIconImgSelected3.setVisibility(false);
    this.view.fontIconImgSelected4.setVisibility(false);
  },
  togglePermissionSuboptions: function(isTrue){
    if(isTrue){  // for permissions tab
      this.view.flxAddPermissions.height = "125dp";
      this.view.lblIconDropPermissions.text = "\ue920";
      this.view.lblIconDropPermissions.skin = "sknIcon12pxBlack";
      this.view.flxSubPermissions.setVisibility(true);
    }else{ // for users tab
      this.view.flxAddPermissions.height = "45dp";
      this.view.lblIconDropPermissions.text = "\ue906";
      this.view.lblIconDropPermissions.skin = "sknicon15pxBlack";
      this.view.flxSubPermissions.setVisibility(false);
    }
  },
  //show functions
  setHeaderText : function(){
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
    this.view.mainHeader.btnAddNewOption.text=kony.i18n.getLocalizedString("i18n.roles.ADDNEWROLES");
  },
  showMainHeaderButtons : function(){
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.flxDownloadList.setVisibility(true);
  },
  showRoles: function(){
    this.hideAll();
    this.setScrollHeight(2);
    this.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
    this.view.txtRoleDescription.skin = "skntxtAreaLato35475f14Px";
    this.view.flxNoRoleNameError.setVisibility(false);
    this.view.flxNoRoleDescriptionError.setVisibility(false);
    this.view.flxPermissions.setVisibility(true);
    this.view.flxMainSubHeader.setVisibility(true);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
    this.showMainHeaderButtons();
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
    this.hideMainSubHeader();
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected1);
    
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddPermissionDetails.setVisibility(true);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.DETAILS");


  },
  navigateToAddNewRoleForm : function(){
    this.addNewRolePath=true;
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.togglePermissionSuboptions(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.CREATE");
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Add_Roles");
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
   // this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.btnSave.text=kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");

    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected1);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.tbxRoleNameValue.text="";
    this.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
    this.view.flxNoRoleNameError.setVisibility(false);
    this.view.flxNoRoleDescriptionError.isVisible = false;
    this.view.txtRoleDescription.skin = "skntxtAreaLato35475f14Px"; 
    this.view.switchStatus.selectedIndex=0;	
    this.view.txtRoleDescription.text=""; 
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxValidity.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    var that=this;
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.DETAILS");
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.view.btnOptionDetails.onClick = function() {
      that.showNewRoleTab();
    };
  },
  showAddNewRoles : function(){
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.togglePermissionSuboptions(false);
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected1);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.fillRoleData();
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.DETAILS");
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.view.forceLayout();
  },
  updateRoleData:function(updateData){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.UpdateRoleDetails(updateData);
   // this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Updated_Successfully"),this);
  },
  getRolePermissions: function(role_id){
    var roleNameObj={"role_id":role_id};
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchRolePermissions(this,roleNameObj);
  },
  getAllUpdateRoles: function(id){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchAllUpdateRoles(this,id);
  },
  getActiveUsers: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchActiveUsers(this);
  },
  getAllActivePermissionsAndAllActiveUsers: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchAllActiveUsersAndAllActivePermissions(this);
  },
  getRoleData: function(role_id){
    var roleNameObj={"role_id":role_id};
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchUpdateRoleData(this,roleNameObj);
  },
  getActivePermissions: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchActivePermissions(this);
  },
  getRoleUsers: function(role_id){
    var roleNameObj={"role_id":role_id};
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchRoleUsers(this,roleNameObj);
  },
  fillRoleData: function()
  {
    var scopeObj=this;
    var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
    var selectedData = scopeObj.view.segPermissions.data[segIndex];
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES");
    scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Edit_Roles");
    this.view.breadcrumbs.lblCurrentScreen.text = selectedData.lblRoleName.toUpperCase();
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    //this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.tbxRoleNameValue.text=this.roleDetails.lblRoleName;
    this.view.txtRoleDescription.text=this.roleDetails.lblDescription;
    this.view.btnSave.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
    if(selectedData.lblRoleStatus.text===kony.i18n.getLocalizedString("i18n.secureimage.Active"))
      this.view.switchStatus.selectedIndex=0;
    else
      this.view.switchStatus.selectedIndex=1;
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxValidity.setVisibility(false);
    this.view.forceLayout();
  },
  showNewRoleTab: function(data)
  {
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected1);
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.togglePermissionSuboptions(false);
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxAddPermissionDetails.setVisibility(false);
    this.view.flxAddOptionsContainer.setVisibility(false);
    this.view.flxAssignCustomerAccess.setVisibility(false);
  },
  createRoleData: function(data)
  {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.createRoleDetails(this,data);
   // this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmRolesController.Role_created_Successfully"),this);
  },
  saveRoleData: function(data)
  {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.UpdateRoleDetails(this,data);
  }, 
  showAddPermissions : function(){
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.togglePermissionSuboptions(true);
    this.view.tbxSearchBox.text = "";
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnAddPermissions);
    var widgetArray2 = [this.view.btnAddSysPermissions,this.view.btnAddCustomerAccess];
    this.tabUtilVerticleButtonFunction(widgetArray2,this.view.btnAddSysPermissions);
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.lblIconSysPermisionsSelected);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.roles.SelectedPermissions");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.roles.AvailablePermissions");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.flxClearSearch.setVisibility(false);
    this.view.btnNext.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.setSelectedOptionsSegmentData();
    this.setAddPermissionsSegmentData();
  },
  showAddUsers : function(){
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.togglePermissionSuboptions(false);
    this.view.tbxSearchBox.text = "";
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected3);
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnAddUsers);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.permission.SelectedUsers");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.permission.AvailableUsers");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.btnNext.setVisibility(false);
    this.view.flxClearSearch.setVisibility(false);
    this.setSelectedOptionsSegmentData();
    this.setAddUsersSegmentData();
    //enable the buttons
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,true);
    this.view.flxOptions.setEnabled(true);
  },
  showAddRoles : function(){
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.togglePermissionSuboptions(false);
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected4);
    var widgetArray = [this.view.btnAddRoles,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnAddRoles);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.permission.SelectedRoles");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.permission.AvailableRoles");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.btnNext.setVisibility(true);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.setSelectedOptionsSegmentData();
    this.setAddRolesSegmentData();
  },
  showViewPermissionSegmentAndHeader : function(){
    //this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.ROLES");
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxViewPermissions.setVisibility(true);  
    this.view.flxViewTab2.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName1);
    this.subTabsButtonWithBgUtilFunction([this.view.tabs.btnTab1,this.view.tabs.btnTab2],this.view.tabs.btnTab1);
    this.view.flxPermissionsHeader.setVisibility(true);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(true);
    this.view.flxViewSegmentAndHeaders.top = "105dp";
    this.view.flxViewSegment.top = "61dp";
    this.setViewPermissionSegmentData();
    this.view.forceLayout();
  },
  showViewUsersSegmentAndHeader : function(){
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName2);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(true);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.top = "45dp";
    this.view.flxViewSegment.top = "61dp";
    this.setViewUsersSegmentData();
  },
  downloadRolesList : function(){
  var scopeObj = this;
    var searchText = "";
    var status = "";
     if(scopeObj.view.searchBoxRoles.tbxSearchBox.text !== "") {
        searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.searchBoxRoles.tbxSearchBox.text);
     }
     var downloadRolesFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

    if(downloadRolesFilterJSON !== undefined && downloadRolesFilterJSON.selectedStatusList !== undefined) {
       status = "&status=" + downloadRolesFilterJSON.selectedStatusList;
    }
    var payload = {"searchText":searchText,"status":status};
    this.presenter.generateRolesList(payload);
    
},
  downloadCSV:function(fileId) {
    var scopeObj = this;

    //var authToken = KNYMobileFabric.currentClaimToken;
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/RolesAndPermissionsObjService/operations/role/downloadRoleList?fileId=" + fileId ;

    /*if(scopeObj.view.subHeader.tbxSearchBox.text !== "") {
       var searchText=(scopeObj.view.subHeader.tbxSearchBox.text).replace("<","&lt").replace(">","&gt");
      downloadURL = downloadURL + "&searchText=" + searchText;
    }

    var downloadRolesFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

    if(downloadRolesFilterJSON !== undefined && downloadRolesFilterJSON.selectedStatusList !== undefined) {
      var status = "&status=" + downloadRolesFilterJSON.selectedStatusList;
      downloadURL = downloadURL + status;
    }*/

    var encodedURI = encodeURI(downloadURL);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedURI;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },

  setFlowActions : function(){
    var scopeObj=this;
//     this.view.segPermissions.onScroll=function(){
//       scopeObj.contextualMenuOff();
//     };
    this.view.flxClearSearch.onClick = function(){
      scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
      var area = scopeObj.view.lblAddOptionsHeading.text;
      scopeObj.view.tbxSearchBox.text = "";
      scopeObj.view.segAddOptions.setVisibility(true);
      scopeObj.view.rtxAvailableOptionsMessage.setVisibility(false);
      scopeObj.view.flxClearSearch.setVisibility(false);
      if(area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
        scopeObj.setAddPermissionsSegmentData();
      }else if(area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")){
        scopeObj.setAddUsersSegmentData();
      }else if(area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
        scopeObj.setAddPermissionsSegmentData();
      }
    };
    this.view.mainHeader.flxDownloadList.onClick = function(){
      if(scopeObj.view.flxNoResultFound.isVisible === false) {
        scopeObj.downloadRolesList();
      }
    };
    this.view.txtRoleDescription.onEndEditing = function(){
      if(scopeObj.view.lblRoleDescriptionSize.isVisible){
        scopeObj.view.lblRoleDescriptionSize.setVisibility(false);
      }
      scopeObj.roleDetails.lblDescription = scopeObj.view.txtRoleDescription.text;
    };
    this.view.txtRoleDescription.onKeyUp = function(){
      scopeObj.view.flxNoRoleDescriptionError.isVisible = false;
      scopeObj.view.txtRoleDescription.skin = "skntxtAreaLato35475f14Px";

      if(scopeObj.view.txtRoleDescription.text.length===0)
      {
        scopeObj.view.lblRoleDescriptionSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblRoleDescriptionSize.setVisibility(true);
        scopeObj.view.lblRoleDescriptionSize.text=scopeObj.view.txtRoleDescription.text.length+"/300";
      }
      scopeObj.view.forceLayout();
    };
    this.view.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
    };
    this.view.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    };
    this.view.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.tbxSearchBox.text === ""){
        scopeObj.view.segAddOptions.setVisibility(true);
        scopeObj.view.flxClearSearch.setVisibility(false);
        scopeObj.view.rtxAvailableOptionsMessage.setVisibility(false);
      }
      else{
        scopeObj.view.flxClearSearch.setVisibility(true);
        scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
      } 
      scopeObj.searchFromList();
    };
    this.view.searchBoxRoles.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchBoxRoles.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.searchBoxRoles.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchBoxRoles.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    };
    const searchRoles = function () {
      scopeObj.loadPageData();
    };
    const debounce = function(func, delay){
      var self = this;
      let timer;
      return function () {
        let context = self,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          func.apply(context, args);
        }, delay);
      };
    };
    const searchRolesCall = debounce(searchRoles,300);
    this.view.searchBoxRoles.tbxSearchBox.onKeyUp = function() {
      scopeObj.currentPage = 1;
      //scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage;
      if (scopeObj.view.searchBoxRoles.tbxSearchBox.text === "") {
        //scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.searchBoxRoles.flxSearchCancel.setVisibility(false);
      }
      else {
        scopeObj.view.searchBoxRoles.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        scopeObj.view.searchBoxRoles.flxSearchCancel.setVisibility(true);
      } 
      searchRolesCall();
    };

    this.view.searchBoxRoles.flxSearchCancel.onClick=function(){
      scopeObj.view.searchBoxRoles.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
      scopeObj.view.searchBoxRoles.tbxSearchBox.text="";
      scopeObj.view.searchBoxRoles.flxSearchCancel.setVisibility(false);
      scopeObj.loadPageData();
    };
    //     this.view.lbxPagination.onSelection = function(){
    //         scopeObj.gotoPage();
    //     };
    this.view.flxViewEditButton.onClick=function(){
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.ROLES");
      scopeObj.view.btnSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      kony.adminConsole.utils.showProgressBar(this.view);
      scopeObj.roleId = scopeObj.roleDetailsObj.roleDetails.roleId ;
      var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
      var selectedData = scopeObj.view.segPermissions.data[segIndex];
      scopeObj.roleDetails.lblRoleName = selectedData.lblRoleName; 
      scopeObj.roleDetails.lblDescription = selectedData.lblDescription.text;
      scopeObj.addNewRolePath=false;
      scopeObj.getRoleData(scopeObj.roleId);
    }; 
    this.view.tbxRoleNameValue.onTouchStart=function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmRoles_tbxRoleNameValue");
    };
    this.view.tbxRoleNameValue.onKeyUp=function(){
      scopeObj.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
      scopeObj.view.flxNoRoleNameError.setVisibility(false); 
      if(scopeObj.view.tbxRoleNameValue.text.length===0)
      {
        scopeObj.view.lblRoleNameSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblRoleNameSize.text=scopeObj.view.tbxRoleNameValue.text.length+"/25";
        scopeObj.view.lblRoleNameSize.setVisibility(true);
      }
      scopeObj.roleDetails.lblRoleName = scopeObj.view.tbxRoleNameValue.text;
      scopeObj.view.forceLayout();
    };
    this.view.popUp.btnPopUpDelete.onClick= function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick= function(){
      scopeObj.DeactivatePermission();
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick= function(){
      scopeObj.view.flxDeactivatePermission.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick= function(){
      scopeObj.view.flxDeactivatePermission.setVisibility(false);
    };
    this.view.flxOption2.onClick=function(){
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmRoles.RoleList_UC");
      scopeObj.view.btnSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      kony.adminConsole.utils.showProgressBar(this.view);
      var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
      var selectedData = scopeObj.view.segPermissions.data[segIndex];
      scopeObj.roleDetails.lblRoleName = selectedData.lblRoleName; 
      scopeObj.roleDetails.lblDescription = selectedData.lblDescription.text;
      scopeObj.addNewRolePath=false;
      scopeObj.getRoleData(scopeObj.roleId);
    };
    this.view.flxOption4.onClick=function(){
      var roleName = scopeObj.roleData[scopeObj.gblselIndex].role_Name;
      scopeObj.onClickActiveDeactive(roleName); 
    };
    this.view.btnRoles.onClick=function(){
      scopeObj.directUsers = true;
      scopeObj.addNewRolePath = true;
      var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
      var selectedData = scopeObj.view.segPermissions.data[segIndex];
      scopeObj.roleDetails.lblRoleName = selectedData.lblRoleName; 
      scopeObj.roleDetails.lblDescription = selectedData.lblDescription.text; 
      scopeObj.getRoleData(scopeObj.roleId);
      scopeObj.fillRoleData();
      scopeObj.showAddUsers();
    };
    this.view.btnPermissions.onClick=function(){
      scopeObj.directPermissions = true;
      scopeObj.addNewRolePath = true;
      var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
      var selectedData = scopeObj.view.segPermissions.data[segIndex];
      scopeObj.roleDetails.lblRoleName = selectedData.lblRoleName; 
      scopeObj.roleDetails.lblDescription = selectedData.lblDescription.text; 
      scopeObj.getRoleData(scopeObj.roleId);
      scopeObj.fillRoleData();
      scopeObj.showAddServiceDefinitions();
    };
    this.view.btnOptionDetails.onClick= function(){
      scopeObj.savedEditedDataInTextBox();
      scopeObj.showAddNewRoles();
    };
    this.view.btnAddPermissions.onClick= function(){
      if(scopeObj.validateRoleName()){
        scopeObj.showAddServiceDefinitions();
      }
      else
        scopeObj.errorRoleName();
    };
    this.view.btnAddUsers.onClick= function(){
      if(scopeObj.validateRoleName()){
        scopeObj.showAddUsers();
      }
      else
        scopeObj.errorRoleName();
    };
    this.view.btnAddRoles.onClick= function(){
      scopeObj.showAddRoles();
    };
    this.view.lblTabName1.onTouchEnd= function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                     scopeObj.view.lblTabName2],scopeObj.view.lblTabName1);
      scopeObj.showViewPermissionSegmentAndHeader();
    };
    this.view.lblTabName2.onTouchEnd= function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                     scopeObj.view.lblTabName2],scopeObj.view.lblTabName2);
      scopeObj.showViewUsersSegmentAndHeader();
    };
    this.view.mainHeader.btnAddNewOption.onClick=function(){
      scopeObj.navigateToAddNewRoleForm();
     // scopeObj.showAddRoleScreen();
      scopeObj.getAllActivePermissionsAndAllActiveUsers();
    };
    this.view.breadcrumbs.btnBackToMain.onClick= function(){
      //scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
      scopeObj.view.flxLoading.setVisibility(true);
      scopeObj.presenter.navToDashboard();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick= function(){
      //scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
      scopeObj.view.flxLoading.setVisibility(true);
      scopeObj.presenter.callingApprovalsData();
    };
    this.view.btnCancel.onClick= function(){
      scopeObj.showRoles();
    };
    this.view.btnAddRoleCancel.onClick= function(){
      scopeObj.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
      scopeObj.view.flxNoRoleNameError.setVisibility(false);
      scopeObj.presenter.fetchRoleList();
      kony.adminConsole.utils.showProgressBar(this.view);
      scopeObj.showRoles();
    };
    this.view.btnAddPermissionCancel.onClick= function(){
      scopeObj.showRoles();
    };
    this.view.btnAddRoleNext.onClick= function(){
      if(scopeObj.validateRoleName()){
        scopeObj.showAddServiceDefinitions();
      }
      else
        scopeObj.errorRoleName();
    };
    this.view.btnAddPermissionNext.onClick= function(){
      if(scopeObj.validateRoleName()){
        scopeObj.showAddRoles();
      }
      else
        scopeObj.errorRoleName();

    };
    this.view.btnNext.onClick= function(){
      var from=scopeObj.view.lblAddOptionsHeading.text;
      if(scopeObj.validateRoleName()){
        if(from===kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
          scopeObj.showAddUsers();
        }
        else if(from===kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")){
          scopeObj.showAddUsers();   
        }
        else if(from===kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")){
          //code to gofrom add users
        }
      }
      else
        scopeObj.errorRoleName();
    };
    //     this.view.tbxSearchBox.onKeyUp(function() {
    //       scopeObj.searchFromList();
    //     });
    this.view.popUp.flxPopUpClose.onClick= function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.btnSave.onClick= function(){
      if(scopeObj.validateRoleName()){
        if(scopeObj.rolePermissions.length >= 1){
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.prepareUpdateRoleRequest(scopeObj.roleId);
        }
        else{
          scopeObj.view.flxErrorPopup.setVisibility(true);
        }
      }
      else
        scopeObj.errorRoleName();
    };
    //     this.view.flxPrevious.onTouchStart=function(){
    //        scopeObj.prevPage();
    //      };
    //     this.view.flxNext.onTouchStart=function(){
    //       scopeObj.nextPage();
    //     };
    //     this.view.btnAddRoleSave.onClick= function(){
    //          if(scopeObj.validateRoleName()){
    //            if(scopeObj.rolePermissions.length>=1){
    //             kony.adminConsole.utils.showProgressBar(scopeObj.view);
    //           scopeObj.prepareUpdateRoleRequest(scopeObj.roleId);
    //            }
    //            else{
    //       scopeObj.view.flxErrorPopup.setVisibility(true);
    //            }
    //       }
    //       else
    //         scopeObj.errorRoleName();
    //     };
    this.view.btnAddPermissionSave.onClick= function(){
      scopeObj.showRoles();
    };
    scopeObj.permissionSorter = scopeObj.getObjectSorter('lblPermissionName.info.value');
    scopeObj.determineSortFontIcon(scopeObj.permissionSorter,'lblPermissionName.info.value',scopeObj.view.fontImgViewPermissionNameSort);
    this.view.flxViewPermissionName.onClick = function(){
      scopeObj.permissionSorter.column("lblPermissionName.info.value");
      scopeObj.determineSortFontIcon(scopeObj.permissionSorter,'lblPermissionName.info.value',scopeObj.view.fontImgViewPermissionNameSort);
      var dataSet=scopeObj.view.segViewSegment.data;
      var sortedDataSet;
      if(dataSet.length!==0){
        dataSet[0].lblSeperator.isVisible=true;
        sortedDataSet=dataSet.sort(scopeObj.permissionSorter.sortData);
        sortedDataSet[0].lblSeperator.isVisible=false;
      }
      scopeObj.view.segViewSegment.setData(sortedDataSet);
    };
    scopeObj.userSorter = scopeObj.getObjectSorter('lblViewFullName');
    scopeObj.setUserSortIcons = function(){
      var setImageSrc = function(imgWidgetID, objColumnName){
        scopeObj.determineSortFontIcon(scopeObj.userSorter, objColumnName,scopeObj.view[imgWidgetID]);
      };
      setImageSrc('fontImgViewUsersNameSort','lblViewFullName');
      setImageSrc('fontImgViewUsersUsernameSort','lblViewUsername');
      setImageSrc('fontImgSortEmail','lblViewEmailId');
      setImageSrc('fontImgSortRole','lblViewUpdatedBy');
      setImageSrc('fontImgSortPermissions','lblViewUpdatedDate');
    };
    scopeObj.setUserSortIcons();
    this.view.flxViewUsersFullName.onClick = function(){
      scopeObj.userSorter.column("lblViewFullName");
      scopeObj.setUserSortIcons();
      scopeObj.view.segViewSegment.setData(scopeObj.sortSegData(scopeObj.userSorter));
    };
    this.view.flxViewUsersUsername.onClick = function(){
      scopeObj.userSorter.column("lblViewUsername");
      scopeObj.setUserSortIcons();
      scopeObj.view.segViewSegment.setData(scopeObj.sortSegData(scopeObj.userSorter));
    };
    this.view.flxViewUsersEmailId.onClick = function(){
      scopeObj.userSorter.column("lblViewEmailId");
      scopeObj.setUserSortIcons();
      scopeObj.view.segViewSegment.setData(scopeObj.sortSegData(scopeObj.userSorter));
    };
    this.view.flxViewUsersUpdatedBy.onClick = function(){
      scopeObj.userSorter.column("lblViewUpdatedBy");
      scopeObj.setUserSortIcons();
      scopeObj.view.segViewSegment.setData(scopeObj.sortSegData(scopeObj.userSorter));
    };
    this.view.flxViewUsersUpdatedOn.onClick = function(){
      scopeObj.userSorter.column("lblViewUpdatedDate");
      scopeObj.setUserSortIcons();
      scopeObj.view.segViewSegment.setData(scopeObj.sortSegData(scopeObj.userSorter));
    };
    this.view.segPermissions.onHover=this.saveScreenY;
    this.view.btnAddAll.onClick=function(){
      scopeObj.selectAllRecords();
    };
    this.view.btnRemoveAll.onClick=function(){
      if(scopeObj.view.btnAddUsers.skin === "sknBtnUtilActive485b7512pxBold"){ //users
        scopeObj.unselectAllRecords();
      } else{ //permissions
        scopeObj.showRemovePermissionPopup(2);
      }
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performStatusFilter();
    };
    this.view.segPermissions.onHover=this.saveScreenY;
    this.view.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
    this.view.flxRoleStatusFilter.onHover = this.onDropDownsHoverCallback;
    /*
        this.view..onClick= function(){
            scopeObj.();
        };
        */
    this.view.tbxRoleNameValue.onEndEditing = function(){
      scopeObj.view.lblRoleNameSize.setVisibility(false);
    };
    this.view.flxRoleHeaderName.onClick=function(){
      scopeObj.sortBy.column("role_Name");
      scopeObj.resetSortFontIcons();
      scopeObj.currentPage=1;
      //scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage; 
      scopeObj.loadPageData();
    };
    this.view.flxRoleHeaderUsers.onClick=function(){
      scopeObj.sortBy.column("Users_Count");
      scopeObj.resetSortFontIcons();
      scopeObj.currentPage=1;
      //      scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage;
      scopeObj.loadPageData();
    };
    this.view.flxRoleHeaderPermissions.onClick=function(){
      scopeObj.sortBy.column("permission_Count");
      scopeObj.resetSortFontIcons();
      scopeObj.currentPage=1;
      //      scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage;
      scopeObj.loadPageData();
    };
    this.view.flxRoleHeaderStatus.onClick= function () {
      scopeObj.view.flxSelectOptions.setVisibility(false);
      if(scopeObj.view.segPermissions.selectedRowIndex){
        var selIndex=scopeObj.view.segPermissions.selectedRowIndex[1];
        scopeObj.view.segPermissions.data[selIndex].flxOptions.skin="slFbox";
        scopeObj.view.segPermissions.setDataAt(scopeObj.view.segPermissions.data[selIndex],selIndex);
      }
      scopeObj.view.flxRoleStatusFilter.setVisibility(!scopeObj.view.flxRoleStatusFilter.isVisible);
      var flxRight = scopeObj.view.flxRolesHeader.frame.width - scopeObj.view.flxRoleHeaderStatus.frame.x - scopeObj.view.flxRoleHeaderStatus.frame.width;
      var iconRight = scopeObj.view.flxRoleHeaderStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
      scopeObj.view.flxRoleStatusFilter.right = (flxRight + iconRight - 13) +"px";
    };
    this.view.viewConfigureCSRAssist.backToPageHeader.btnBack.onClick = function(){
      scopeObj.view.flxViewSegmentAndHeaders.setVisibility(true);
      scopeObj.view.flxViewConfigureCsrCont.setVisibility(false);
    };
    this.view.btnAddCustomerAccess.onClick  = function(){
      scopeObj.showAddServiceDefinitions();
    };
    this.view.btnAddSysPermissions.onClick = function(){
      if(scopeObj.validateRoleName()){
        scopeObj.showAddPermissions();
      }
      else
        scopeObj.errorRoleName();
    };

    this.view.searchBoxCustAccess.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchBoxCustAccess.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.searchBoxCustAccess.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchBoxCustAccess.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.searchBoxCustAccess.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchBoxCustAccess.tbxSearchBox.text === ""){
        scopeObj.view.searchBoxCustAccess.flxSearchCancel.setVisibility(false);
      }else{
        scopeObj.view.searchBoxCustAccess.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchBoxCustAccess.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      }
      scopeObj.searchServiceDefinitionsList();
    };
    this.view.searchBoxCustAccess.flxSearchCancel.onClick = function(){
      scopeObj.view.searchBoxCustAccess.tbxSearchBox.text = "";
      scopeObj.view.searchBoxCustAccess.flxSearchCancel.setVisibility(false);
      scopeObj.view.searchBoxCustAccess.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.searchServiceDefinitionsList();
    };
    this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.showRoles();
    };
    this.view.commonButtons.btnSave.onClick = function(){
      if(scopeObj.validateRoleName()){
       scopeObj.showAddPermissions();   
      }
      else
        scopeObj.errorRoleName();
    };
    this.view.tabs.btnTab1.onClick = function(){
       scopeObj.showViewPermissionSegmentAndHeader();
    };
    this.view.tabs.btnTab2.onClick = function(){
      scopeObj.viewServiceDefinitionsForARole();
    };
    
    
    //new actions
    this.view.verticalTabsCreateRole.btnOption1.onClick = function(){
      scopeObj.showAddRoleDetailsScreen();
    };
    this.view.verticalTabsCreateRole.btnOption2.onClick = function(){
      scopeObj.showAddRoleFAScreen();
    };
    this.view.flxRoleLegalSelectedValue.onClick = function(){
      scopeObj.view.flxLegalEntityListCont.setVisibility(!scopeObj.view.flxLegalEntityListCont.isVisible);
      if(scopeObj.view.flxRoleLegalEntityError.isVisible === true){
        scopeObj.clearAddRoleDetailsErrors(3, scopeObj.view.flxRoleLegalSelectedValue, scopeObj.view.flxRoleLegalEntityError);
      }
    };
    this.view.commonButtonsCreateRole.btnCancel.onClick = function(){
      scopeObj.showRoles();
    };
    this.view.commonButtonsCreateRole.btnSave.onClick = function(){
      scopeObj.showRoles();
    };
    this.view.commonButtonsCreateRoleFA.btnCancel.onClick = function(){
      scopeObj.showRoles();
    };
    this.view.commonButtonsCreateRoleFA.btnSave.onClick = function(){
      scopeObj.showRoles();
    };
    this.view.searchBoxRoleFA.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchBoxRoleFA.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.searchBoxRoleFA.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchBoxRoleFA.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.searchBoxRoleFA.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchBoxRoleFA.tbxSearchBox.text === ""){
        scopeObj.view.searchBoxRoleFA.flxSearchCancel.setVisibility(false);
      }else{
        scopeObj.view.searchBoxRoleFA.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchBoxRoleFA.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      }
      scopeObj.searchRoleFAList();
    };
    this.view.searchBoxRoleFA.flxSearchCancel.onClick = function(){
      scopeObj.view.searchBoxRoleFA.tbxSearchBox.text = "";
      scopeObj.view.searchBoxRoleFA.flxSearchCancel.setVisibility(false);
      scopeObj.view.searchBoxRoleFA.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.searchRoleFAList();
    };

    /*
    // button yes onclick for reject request confirmation popup
    this.view.popUpWithComment.btnPopUpYes.onClick = function(){
      var requestStatus = "Rejected";
      var reason = scopeObj.view.popUpWithComment.textAreaComment.text; 
      var request = {
        "requestStatus" : requestStatus,
        "reason" : reason
      }
      scopeObj.approveRole(request);
    }

    // button no onclick for reject request confirmation popup
    this.view.popUpWithComment.btnPopUpNo.onClick = function(){
      scopeObj.view.flxApproveRejectRequestConfirmation.setVisibility(false);
    }

    // button close onclick for reject request confirmation popup
    this.view.popUpWithComment.flxPopUpClose.onClick = function(){
      scopeObj.view.flxApproveRejectRequestConfirmation.setVisibility(false);
    }
    */
    
    this.view.popUpWithComment1.maxTextAreaLimit = this.MAX_TEXTLIMIT_TEXTAREACOMMENT;
    this.view.popUpWithComment1.heading = kony.i18n.getLocalizedString("i18n.view.rejectRequestTitle");
    this.view.popUpWithComment1.subheading = kony.i18n.getLocalizedString("i18n.view.rejectRequestQuestion");
  },

  rejectRequestYesCallback: function(context){
    var requestStatus = "Rejected";
    var reason = context.textData;
    var request = {
      "requestStatus" : requestStatus,
      "reason" : reason
    }
    this.approveRole(request);
  },

  rejectRequestNoCallback: function(){
    this.view.flxApproveRejectRequestConfirmation.setVisibility(false);
  },

  resetSortFontIcons:function(){
    this.determineSortFontIcon(this.sortBy,'permission_Count',this.view.fontIconSortPermissions);
    this.determineSortFontIcon(this.sortBy,'Users_Count',this.view.fontIconSortUser);
    this.determineSortFontIcon(this.sortBy,'role_Name',this.view.fontIconSortName);
  },
  onDropDownsHoverCallback:function(widget,context){
    var self=this;
    var widgetId = widget.id;

    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      self.view[widgetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.view[widgetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      self.view[widgetId].setVisibility(false);
      if(widgetId==="flxSelectOptions"){
      var selIndex=self.view.segPermissions.selectedRowIndex[1];
      self.view.segPermissions.data[selIndex].flxOptions.skin="slFbox";
	  self.view.segPermissions.setDataAt(self.view.segPermissions.data[selIndex],selIndex);
    }
    }
    self.view.forceLayout();
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
    // kony.print(this.mouseYCoordinate);
  },
  sortSegData :function(sortBy){
    var dataSet;
    var sortedDataSet;
    dataSet=this.view.segViewSegment.data;
    if(dataSet.length!==0){
      dataSet[0].lblViewSeperator.isVisible=true;
      sortedDataSet=dataSet.sort(sortBy.sortData);
      sortedDataSet[0].lblViewSeperator.isVisible=false;
    }
    return sortedDataSet;
  },
  showSuccessMessage : function() {
    if(this.fromEditRoles === true){
      this.view.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_successfully_Edited");
      kony.timer.schedule("mytimer", this.callBackTimer, 2, false);
      this.view.flxToastMessage.setVisibility(true);
      this.view.forceLayout();
      this.fromEditRoles = false;
    }
    else if(this.fromCreateRole === true) {
      this.view.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_successfully_created");
      kony.timer.schedule("mytimer", this.callBackTimer, 2, false);
      this.view.flxToastMessage.setVisibility(true);
      this.view.forceLayout();
      this.fromCreateRole = false;

    }
  } ,
  setRolesSegmentData : function(response,isFilter){
    var self = this;
    //response=response.concat(response).concat(response).concat(response).concat(response).concat(response).concat(response).concat(response);
    // response=response.concat(response).concat(response).concat(response).concat(response).concat(response).concat(response).concat(response);

    this.view.flxRoleHeaderUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    if(response.length === 0){
      var searchText= self.AdminConsoleCommonUtils.getEncodedTextInput(self.view.searchBoxRoles.tbxSearchBox.text);
      self.view.rtxSearchMesg.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      self.view.flxNoResultFound.setVisibility(true);
      self.view.flxNoResultFound.top="0px";
      self.view.flxPermissionsContainer.height="43%";
      self.view.flxSegRoles.setVisibility(false);
      self.view.segPermissions.setData(response);
      self.view.flxRolesHeader.setVisibility(false);	
      //self.view.flxPagination.setVisibility(false);
    }else{
      self.view.flxNoResultFound.setVisibility(false);
      self.view.flxRolesHeader.setVisibility(true);
      self.view.flxSegRoles.setVisibility(true);
      self.view.flxPermissionsContainer.height="100%";
      var dataMap={
        "flxRoleHeaderDescription": "flxRoleHeaderDescription",
        "flxRoleHeaderName": "flxRoleHeaderName",
        "flxRoleHeaderPermissions": "flxRoleHeaderPermissions",
        "flxRoleHeaderStatus": "flxRoleHeaderStatus",
        "flxRoleHeaderUsers": "flxRoleHeaderUsers",
        "flxRoleHeaderValidTill": "flxRoleHeaderValidTill",
        "flxRolesHeader": "flxRolesHeader",
        "fontIconSortName": "fontIconSortName",
        "fontIconSortPermissions": "fontIconSortPermissions",
        "fontIconFilterStatus": "fontIconFilterStatus",
        "fontIconSortUser": "fontIconSortUser",
        "fontIconSortValidTill": "fontIconSortValidTill",
        "lblRoleHeaderDescription": "lblRoleHeaderDescription",
        "lblRoleHeaderName": "lblRoleHeaderName",
        "lblRoleHeaderPermissions": "lblRoleHeaderPermissions",
        "lblRoleHeaderSeperator": "lblRoleHeaderSeperator",
        "lblRoleHeaderStatus": "lblRoleHeaderStatus",
        "lblRoleHeaderUsers": "lblRoleHeaderUsers",
        "lblRoleHeaderValidTill": "lblRoleHeaderValidTill",
        "flxOptions": "flxOptions",
        "flxRoles": "flxRoles",
        "flxRolesContainer": "flxRolesContainer",
        "flxStatus": "flxStatus",
        "lblIconImgOptions": "lblIconImgOptions",
        "fontIconStatusImg": "fontIconStatusImg",
        "lblDescription": "lblDescription",
        "lblHeaderSeperator":"lblHeaderSeperator",
        "lblNoOfUsers": "lblNoOfUsers",
        "lblPermissions": "lblPermissions",
        "lblRoleName": "lblRoleName",
        "lblRoleStatus": "lblRoleStatus",
        "lblSeperator": "lblSeperator",
        //"lblValidTillDate": "lblValidTillDate"
      };
      var sortIconFor = function(column){
        return self.determineSortIconForSeg(self.sortBy,column);
      };

      var data = [];
      var statusList=[];
      if (typeof response !== 'undefined') {
        data = response.map(function(roleViewData) {
          if(!statusList.contains(roleViewData.Status_Desc))
            statusList.push(roleViewData.Status_Desc);
          return {
            "roleId": roleViewData.role_id,
            "statusId":roleViewData.Status_id,
            "lblIconImgOptions": {"text":"\ue91f"},
            "fontIconStatusImg": roleViewData.Status_Desc === kony.i18n.getLocalizedString("i18n.secureimage.Active")?{"skin":"sknFontIconActivate"} : {"skin":"sknfontIconInactive"},
            "lblDescription": {"text":roleViewData.role_Desc,"width":(self.isKeyCloakEnabled===true)?"48%":"38%"},
            "lblNoOfUsers": {"text": roleViewData.Users_Count,"isVisible":(self.isKeyCloakEnabled===true)?false:true},
            "lblPermissions": roleViewData.permission_Count,
            "lblRoleName": roleViewData.role_Name,
            "lblRoleStatus": roleViewData.Status_Desc === kony.i18n.getLocalizedString("i18n.secureimage.Active")?{"text":roleViewData.Status_Desc,"skin":"sknlblLato5bc06cBold14px"}: {"text":roleViewData.Status_Desc,"skin":"sknlblLatoDeactive"},                
            "lblSeperator": "-",
            "template":"flxRoles",
            "flxOptions": {
              "onClick": function () {
                kony.print(kony.i18n.getLocalizedString("i18n.frmCSRController.accounts_EDIT_Message"));
                self.roleId = roleViewData.role_id;
                self.statusId = roleViewData.Status_id;
                self.onClickOptions();
              },
              "skin":"slFbox"
            },
            "flxRoles" : {
              "onClick" : function () {
                self.fetchRoleDetails(roleViewData.role_id,roleViewData.role_Name,
                                      roleViewData.role_Desc,roleViewData.Status_id);
              }
            }
          };

        });
      }
      if(!isFilter){
        self.roleData = response;
        self.SetStatusFilterData(statusList);
      }
      this.view.segPermissions.widgetDataMap=dataMap;
      //this.view.segPermissions.setData(data);   
      this.rolesData = data;
      data[0].lblSeperator.isVisible = false;
      this.view.segPermissions.setData(data);
    }
    this.view.forceLayout();
  },
  contextualMenuOff: function(context) {
    if(this.gblselIndex!==undefined){
      this.view.segPermissions.data[this.gblselIndex].flxOptions.skin="slFbox";
      this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex],this.gblselIndex);
    }
    this.view.flxSelectOptions.isVisible = false;
    this.view.forceLayout();
  },
  fixContextualMenu:function(heightVal){
    if(((this.view.flxSelectOptions.frame.height+heightVal)>(this.view.segPermissions.frame.height+50))&&this.view.flxSelectOptions.frame.height<this.view.segPermissions.frame.height){
      this.view.flxTopArrowImage.setVisibility(false);
      this.view.flxDownArrowImage.setVisibility(true);
      this.view.flxMenuOptions.top="0px";
      this.view.flxSelectOptions.top=((heightVal-this.view.flxSelectOptions.frame.height)-29)+"px";
    }
    else{
      this.view.flxTopArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxMenuOptions.top="-1px";
      this.view.flxSelectOptions.top=(heightVal)+"px";
    }
    this.view.forceLayout();
  }, 


  SetStatusFilterData:function(segData){
    var self = this;
    var maxSizeText="";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var data = segData.map(function(segData){
      maxSizeText=segData.length>maxSizeText.length?segData:maxSizeText;
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": segData,
        "imgCheckBox":{
          "src":"checkbox.png"
        }
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxRoleStatusFilter.width=flexWidth+"px";
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    //self.view.flxRoleStatusFilter.setVisibility(true);

  },
  //   getNumPerPage: function () {
  //     return this.view.subHeader.lbxPageNumbers.selectedKeyValue
  //     ? this.view.subHeader.lbxPageNumbers.selectedKeyValue[1]
  //   : "10";
  //   },
  //   assignPageList: function (pageData) {
  //     var selectedPage = Number(this.view.lbxPagination.selectedKey) || 1;
  //     this.view.lbxPagination.masterData = pageData;
  //     this.view.lbxPagination.selectedKey = selectedPage;
  //   },
  addPermissionstoRole: function() {
    var self=this;
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    var sourceSegment = kony.application.getCurrentForm().segAddOptions;
    var selected = sourceSegment.selectedItems[0];
    var targetSegment = kony.application.getCurrentForm().segSelectedOptions;
    var toAdd = {
      "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmRolesController.remove_permission")}, 
      "lblOption": "" + selected.lblPermissionsName,
      "permissionId": selected.permissionId,
      "sourceData": selected,
      "flxClose":{"isVisible":false,"onClick":function(){self.showRemovePermissionPopup(1);}},
      "flxAddOptionWrapper":{
        "onHover":self.onHoverEventCallback

      }
    };
    targetSegment.data.push(toAdd);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    if( sourceSegment.data.length===0){
      this.view.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
      this.view.btnAddAll.setVisibility(false);
      sourceSegment.setVisibility(false);
    }
    else{
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
      this.view.btnAddAll.setVisibility(true);
      targetSegment.setVisibility(true);
    }
    sourceSegment.setData(sourceSegment.data);
    this.rolePermissions = targetSegment.data;
    this.showHidePlaceHolder();
    kony.application.getCurrentForm().forceLayout();
  },
  addUserstoRole: function(){
    var self=this;
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    var sourceSegment = kony.application.getCurrentForm().segAddOptions;
    var selected = sourceSegment.selectedItems[0];
    var targetSegment = kony.application.getCurrentForm().segSelectedOptions;
    var toAdd={
      "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmRolesController.remove_user")}, 
      "lblOption": selected.lblFullName,
      "userId": "" + selected.userId,
      "sourceData": selected,
      "flxClose":{"isVisible":false,"onClick":self.unSelectedOption},
      "flxAddOptionWrapper":{
        "onHover":self.onHoverEventCallback

      }
    };
    if(targetSegment.data.length===0)
      targetSegment.setVisibility(true);
    targetSegment.data.push(toAdd);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    if( sourceSegment.data.length===0){
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBox.text);
      if(searchText.length>0){
        this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      }
      else
        this.view.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
      this.view.btnAddAll.setVisibility(false);
      sourceSegment.setVisibility(false);
    }
    else{
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
      this.view.btnAddAll.setVisibility(true);
      sourceSegment.setVisibility(true);
    }
    sourceSegment.setData(sourceSegment.data);
    this.roleUsers = targetSegment.data;
    this.showHidePlaceHolder();
    kony.application.getCurrentForm().forceLayout();
  },
  showHidePlaceHolder : function(){
    if (this.view.lblAddOptionsHeading.text === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
      this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmRolesController.select_a_permission");
    }else if (this.view.lblAddOptionsHeading.text === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")){
      this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Click_Add_to_select_a_user");
    }
    if(this.view.segSelectedOptions.data.length <= 0){
      this.view.rtxSelectedOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_to_select_the_item");
      this.view.rtxSelectedOptionsMessage.isVisible = true;
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnSave,true,false);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,false);
      this.view.flxOptions.setEnabled(false);
    }else{
      this.view.rtxSelectedOptionsMessage.isVisible = false;
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnSave,true,true);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,true);
      this.view.flxOptions.setEnabled(true);
    }

  },
  unSelectedOption: function() {
    this.view.rtxAvailableOptionsMessage.setVisibility(false);
    var sourceSegment = kony.application.getCurrentForm().segSelectedOptions;
    var selectedRow = sourceSegment.selectedRowIndex[1];
    var selected = sourceSegment.data[selectedRow];
    var targetSegment = kony.application.getCurrentForm().segAddOptions;
    targetSegment.data.push(selected.sourceData);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    if( sourceSegment.data.length===0){
      this.view.rtxSelectedOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_to_select_the_item");
      this.view.rtxSelectedOptionsMessage.setVisibility(true);
      this.view.btnRemoveAll.setVisibility(false);
    }
    else{
      this.view.rtxSelectedOptionsMessage.setVisibility(false);
      this.view.btnRemoveAll.setVisibility(true);
    }
    sourceSegment.setData(sourceSegment.data);
    this.view.flxClearSearch.onClick();
    this.view.segAddOptions.setVisibility(targetSegment.data.length!==0);
    this.view.segSelectedOptions.setVisibility(sourceSegment.data.length!==0);
    this.view.btnAddAll.setVisibility(targetSegment.data.length!==0);
    this.view.btnRemoveAll.setVisibility(sourceSegment.data.length!==0);
    this.showHidePlaceHolder();
    kony.application.getCurrentForm().forceLayout();
  },
  searchFromList: function() {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBox.text);
    var searchKey = searchText.toLowerCase();
    var area = this.view.lblAddOptionsHeading.text;
    if(searchKey === ""){
      this.view.flxClearSearch.setVisibility(false);
      this.view.segAddOptions.setVisibility(true);
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
    }
    else{
      this.view.flxClearSearch.setVisibility(true);
    }
    if(area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
      if(searchKey.length > 0) {
        this.setAddPermissionsSegmentDataAfterSearch(searchKey);
      } else {
        this.setAddPermissionsSegmentData();
      }
    } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
      if(searchKey.length > 0) {
        this.setAddUsersSegmentDataAfterSearch(searchKey);
      } else {
        this.setAddUsersSegmentData();
      }
    }
  },
  prepareUpdateRoleRequest: function(roleId) {
    var rolePermissions = this.rolePermissions.slice(0);
    var orgRolePermissions = this.orgRolePermissions.slice(0);
    var roleName = this.view.tbxRoleNameValue.text.trim();
    var roleUserIds = [];
    var rolePermissionIds = [];
    var orgRoleUserIds = [];
    var orgRolePermissionIds = [];
    var roleUserIdsAdded = [];
    var rolePermissionIdsAdded = [];
    var roleUserIdsRemoved = [];
    var rolePermissionIdsRemoved = [];
    var request = {};
    for(var i = 0; i < rolePermissions.length; i++) {
      rolePermissionIds[rolePermissionIds.length] = "" + rolePermissions[i].permissionId;
    }
    for(var j = 0; j < orgRolePermissions.length; j++) {
      orgRolePermissionIds[orgRolePermissionIds.length] = "" + orgRolePermissions[j].permissionId;
    }
    if(this.isKeyCloakEnabled===false){
    var orgRoleUsers = this.orgRoleUsers.slice(0);
    var roleUsers = this.roleUsers.slice(0);    
    for(var k = 0; k < roleUsers.length; k++) {
      roleUserIds[roleUserIds.length] = "" + roleUsers[k].userId;
    }
    for(var m = 0; m < orgRoleUsers.length; m++) {
      orgRoleUserIds[orgRoleUserIds.length] = "" + orgRoleUsers[m].userId;
    }    
    roleUserIdsRemoved = this.updatedIdUsersPermissions(orgRoleUserIds,roleUserIds);    
    roleUserIdsAdded = this.updatedIdUsersPermissions(roleUserIds,orgRoleUserIds);
    }
    rolePermissionIdsRemoved = this.updatedIdUsersPermissions(orgRolePermissionIds,rolePermissionIds);
    rolePermissionIdsAdded  = this.updatedIdUsersPermissions(rolePermissionIds,orgRolePermissionIds);

    if(this.addNewRolePath === true){
      this.fromCreateRole = true;
      this.fromEditRoles = false;
      request = {
        "Role_Name" : this.roleDetails.lblRoleName,
        "Role_Desc" : this.roleDetails.lblDescription,
        "Status_id" : this.view.switchStatus.selectedIndex === 1 ?
                       this.AdminConsoleCommonUtils.constantConfig.INACTIVE : this.AdminConsoleCommonUtils.constantConfig.ACTIVE,
        "system_user" : kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
        "Permission_ids" : rolePermissionIdsAdded,
        "User_ids" : roleUserIdsAdded,
        "AddedServiceDefinitions":this.getUpdatedServiceDefList().AddedServiceDefinitions
      };
      this.createRoleData(request);
    }

    else{
      this.fromCreateRole = false;
      this.fromEditRoles = true;
      request = {
        "User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
        "Role_Details": {
          "id": roleId,
          "Name": roleName,
          "Description": this.view.txtRoleDescription.text.trim(),
          "Status_id": this.view.switchStatus.selectedIndex === 1 ?
                       this.AdminConsoleCommonUtils.constantConfig.INACTIVE:this.AdminConsoleCommonUtils.constantConfig.ACTIVE
        },
        "AssignedTo": {
          "permissionList": rolePermissionIdsAdded,
          "usersList": roleUserIdsAdded
        },
        "RemovedFrom": {
          "permissionList": rolePermissionIdsRemoved,
          "usersList": roleUserIdsRemoved
        },
        "AddedServiceDefinitions":this.getUpdatedServiceDefList().AddedServiceDefinitions,
        "RemovedServiceDefinitions":this.getUpdatedServiceDefList().RemovedServiceDefinitions
      };
      this.updateRoleData(request);
    }     
  },
  setAddPermissionsSegmentData : function(){
    var dataMap={
      "btnAdd": "btnAdd",
      "flxAddPermissions": "flxAddPermissions",
      "flxAddWrapper": "flxAddWrapper",
      "lblPermissionsName": "lblPermissionsName",
      "rtxPermissionDescription": "rtxPermissionDescription"
    };
    this.view.segAddOptions.widgetDataMap=dataMap;
    var data = this.allPermissionsData.slice(0);
    var removalIds = [];
    for(var i = 0; i < this.rolePermissions.length; i++) {
      removalIds[removalIds.length] = this.rolePermissions[i].permissionId;
    }
    var j = 0;
    while (j < data.length) {
      if (removalIds.indexOf(data[j].permissionId) > -1) {
        data.remove(data[j]);
      } else {
        j++;
      }
    }
    this.view.segAddOptions.setVisibility(true);
    this.view.segAddOptions.setData(data);
    if(data.length === 0 ){
      this.view.btnAddAll.setVisibility(false);
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text =kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    }
    this.view.btnAddAll.setVisibility(this.view.segAddOptions.data.length!==0);
    this.view.forceLayout();
  },
  setAddPermissionsSegmentDataAfterSearch : function(searchKey) {
    var dataMap={
      "btnAdd": "btnAdd",
      "flxAddPermissions": "flxAddPermissions",
      "flxAddWrapper": "flxAddWrapper",
      "lblPermissionsName": "lblPermissionsName",
      "rtxPermissionDescription": "rtxPermissionDescription"
    };
    var data = this.allPermissionsData.slice(0);
    var removalIds = [];
    for(var i = 0; i < this.rolePermissions.length; i++) {
      removalIds[removalIds.length] = this.rolePermissions[i].permissionId;
    }
    var j = 0;
    while (j < data.length) {
      if (removalIds.indexOf(data[j].permissionId) > -1  || data[j].lblPermissionsName.toLowerCase().indexOf(searchKey) === -1) {
        data.remove(data[j]);
      } else {
        j++;
      }
    }
    if(data.length > 0){
      this.view.segAddOptions.setVisibility(true);
      this.view.rtxAvailableOptionsMessage.text =kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
    }else{
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchKey+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    } 
    this.view.segAddOptions.setData(data);
    this.view.btnAddAll.setVisibility(this.view.segAddOptions.data.length!==0);
    this.view.forceLayout(); 
  },
  setAddUsersSegmentData : function() {
    var dataMap={
      "btnAdd": "btnAdd",
      "flxAddUsers": "flxAddUsers",
      "flxAddUsersWrapper": "flxAddUsersWrapper",
      "flxxUsernameWrapper": "flxxUsernameWrapper",
      "lblFullName": "lblFullName",
      "lblUserIdValue": "lblUserIdValue",
      "lblUsername": "lblUsername"
    };
    this.view.segAddOptions.widgetDataMap=dataMap;
    var data = this.allUsersData.slice(0);
    var removalIds = [];
    for(var i = 0; i < this.roleUsers.length; i++) {
      removalIds[removalIds.length] = this.roleUsers[i].userId;
    }
    var j = 0;
    while (j < data.length) {
      if (removalIds.indexOf(data[j].userId) > -1) {
        data.remove(data[j]);
      } else {
        j++;
      }
    }
    this.view.segAddOptions.setVisibility(true);
    this.view.segAddOptions.setData(data);
    if(data.length === 0 ){
      this.view.btnAddAll.setVisibility(false);
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text =kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    }
    this.view.btnAddAll.setVisibility(this.view.segAddOptions.data.length!==0);
    this.view.forceLayout();
  },
  setAddUsersSegmentDataAfterSearch : function(searchKey) {
    var dataMap={
      "btnAdd": "btnAdd",
      "flxAddUsers": "flxAddUsers",
      "flxAddUsersWrapper": "flxAddUsersWrapper",
      "flxxUsernameWrapper": "flxxUsernameWrapper",
      "lblFullName": "lblFullName",
      "lblUserIdValue": "lblUserIdValue",
      "lblUsername": "lblUsername"
    };
    var data = this.allUsersData.slice(0);
    var removalIds = [];
    for(var i = 0; i < this.roleUsers.length; i++) {
      removalIds[removalIds.length] = this.roleUsers[i].userId;
    }
    var j = 0;
    while (j < data.length) {
      if (removalIds.indexOf(data[j].userId) > -1 || data[j].lblFullName.toLowerCase().indexOf(searchKey) === -1) {
        data.remove(data[j]);
      } else {
        j++;
      }
    }
    if(data.length > 0){
      this.view.segAddOptions.setVisibility(true);
      this.view.rtxAvailableOptionsMessage.text =kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
    }else{
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchKey+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    } 
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
    var data=[];
    this.view.segAddOptions.widgetDataMap=dataMap;
    this.view.segAddOptions.setData(data);
    this.view.forceLayout();
  },
  setViewUsersSegmentData : function(){
    var users = this.roleDetailsObj.roleUsers ;
    var self = this;
    var data = users.map(function(user) {
      var fullname = user.FirstName + " " + (user.MiddleName===null ? "" : user.MiddleName) + " " + user.LastName;
      return {
        "template": "flxViewUsers",
        "lblViewEmailId": user.Email,
        "lblViewFullName": fullname,
        "lblViewSeperator": {"isVisible":true,"text":"-"},
        "lblViewUpdatedBy": user.UpdatedBy,
        "lblViewUpdatedDate": self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(user.LastModifiedTimeStamp)),
        "lblViewUpdatedTime": "",
        "lblViewUsername": user.Username
      };
    });
    if(data){
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
      this.view.segViewSegment.widgetDataMap=dataMap;
      this.view.segViewSegment.setData(data.sort(this.userSorter.sortData));
      if (data.length !== 0) {
        data[0].lblViewSeperator.isVisible=false;
        this.view.segViewSegment.setData(data);
        this.view.flxUsersHeader.setVisibility(true);
        this.view.rtxAvailabletxt.setVisibility(false);
      } else {
        this.view.flxUsersHeader.setVisibility(false);
        this.view.rtxAvailabletxt.setVisibility(true);
        this.view.rtxAvailabletxt.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      }
      this.view.forceLayout();
    }
  },
  setViewPermissionSegmentData : function(){
    var self  = this;
    var rolePermissions = self.roleDetailsObj.rolePermissions || [];
    var data = rolePermissions.map(function(permission) {

      var actionIcon = "";
      if(permission.Permission_isComposite === "true"){
        actionIcon= self.getActionItem();
      }
      return {
        "lblDescription": permission.Permission_Description,
        "lblPermissionName": {"text":self.AdminConsoleCommonUtils.getTruncatedString(permission.Permission_Name,28,26),
                              "tooltip":permission.Permission_Name,
                              "info":{"value":permission.Permission_Name}
                             },
        "flxActionIcon": {
          "isVisible": permission.Permission_isComposite === "true" ? true : false,
          "onClick": function () {
            self.navigateToConfigureViewCSRPerm();
          }
        },
        "lblIconAction": actionIcon,
        "Permission_id": permission.Permission_id,
        "Role_id": permission.Role_id,
        "lblSeperator": {
          "isVisible": true,
          "text": "-"
        },
        "template": "flxViewPermissions",
      };
    });
    var dataMap={
      "flxViewPermissions": "flxViewPermissions",
      "lblDescription": "lblDescription",
      "lblPermissionName": "lblPermissionName",
      "lblSeperator": "lblSeperator",
      "flxActionIcon": "flxActionIcon",
      "lblIconAction": "lblIconAction",
      "Permission_id": "Permission_id",
      "Role_id": "Role_id"
    };
    this.view.segViewSegment.widgetDataMap=dataMap;
    this.view.segViewSegment.setData(data);    
    if (data.length !== 0) {
      data[0].lblSeperator.isVisible=false;
      this.view.segViewSegment.setData(data);
      this.view.rtxAvailabletxt.setVisibility(false);
      this.view.flxPermissionsHeader.setVisibility(true);
    } else {
      this.view.flxPermissionsHeader.setVisibility(false);
      this.view.rtxAvailabletxt.setVisibility(true);
      this.view.rtxAvailabletxt.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
    }
    this.view.forceLayout();
    this.setFlowActions();
  },
  setSelectedOptionsSegmentData : function(){
    var data;
    var dataMap={
      "flxAddOptionWrapper": "flxAddOptionWrapper",
      "flxClose": "flxClose",
      "flxOptionAdded": "flxOptionAdded",
      "fontIconClose": "fontIconClose",
      "lblOption": "lblOption"
    };
    var area = this.view.lblAddOptionsHeading.text;
    if(area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
      data = this.rolePermissions;
    } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
      data = this.roleUsers;
    }
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    if(data > 0){
      this.view.segSelectedOptions.setVisibility(true);
    }  
    this.view.segSelectedOptions.widgetDataMap=dataMap;
    this.view.segSelectedOptions.setData(data);
    this.view.btnRemoveAll.setVisibility(this.view.segSelectedOptions.data.length!==0);
    this.showHidePlaceHolder();
    this.view.forceLayout();
  },



  onClickOptions:function()
  {
    var segData=this.view.segPermissions.data;
    var selItems = this.view.segPermissions.selectedItems[0];
    //  this.roleId = id;
    //  this.statusId=statusId;
    this.view.flxRoleStatusFilter.setVisibility(false);
    var clckd_selectedRowIndex = this.view.segPermissions.selectedRowIndex[1];
    kony.print("clckd_selectedRowIndex----"+JSON.stringify(clckd_selectedRowIndex));    

    kony.print("selItems roles- skin---"+JSON.stringify(selItems));
    if(this.gblselIndex!==undefined&&this.view.segPermissions.data[this.gblselIndex]){
      this.view.segPermissions.data[this.gblselIndex].flxOptions.skin="slFbox";
      this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex],this.gblselIndex);
    }
    this.gblselIndex = this.view.segPermissions.selectedRowIndex[1];

    if(selItems.lblRoleStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")){

      //this.view.flxSelectOptions.setVisibility(true);  

      if(this.view.flxSelectOptions.isVisible === true)
      {

        kony.print("this.gblsegRoles-- after setting the value-  if visible true-"+this.gblselIndex);

        kony.print("this.clckd_selectedRowIndex-- after setting the value-  if visible true-"+clckd_selectedRowIndex);

//         if(clckd_selectedRowIndex === this.gblselIndex)
//         {

          this.view.segPermissions.setDataAt({
            "flxOptions":{"skin":"slFbox"},
            "lblIconImgOptions": selItems.lblIconImgOptions,
            "fontIconStatusImg": selItems.fontIconStatusImg,
            "lblDescription": selItems.lblDescription,
            "lblNoOfUsers": selItems.lblNoOfUsers,
            "lblPermissions": selItems.lblPermissions,
            "lblRoleName": selItems.lblRoleName,
            "lblRoleStatus": selItems.lblRoleStatus,
            "lblSeperator": selItems.lblSeperator,
            //"lblValidTillDate": selItems.lblValidTillDate,
            "template":"flxRoles"
          },this.gblselIndex);
          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnRoles.setVisibility(this.isKeyCloakEnabled===true?false:true);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
          this.view.btnPermissions.setVisibility(true);
          this.view.lblDescription.setVisibility(true);
          this.view.flxSeperator.setVisibility(true);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
          this.view.fontIconDeactivate.text = "";          
          this.view.flxSelectOptions.isVisible = false; //flxTranspSknNormal
          this.view.forceLayout();
        //}
      }
      else if(this.view.flxSelectOptions.isVisible === false)
      {
        this.gblsegRoles = clckd_selectedRowIndex;
        var hgtValue = (((clckd_selectedRowIndex + 1) * 50)+65);
        this.view.flxSelectOptions.top = this.mouseYCoordinate-148 +"px";
        this.view.segPermissions.setDataAt({
          "flxOptions": {skin:"sknflxffffffop100Border424242Radius100px"},
          "lblIconImgOptions":  selItems.lblIconImgOptions,
          "fontIconStatusImg": selItems.fontIconStatusImg,
          "lblDescription": selItems.lblDescription,
          "lblNoOfUsers": selItems.lblNoOfUsers,
          "lblPermissions": selItems.lblPermissions,
          "lblRoleName": selItems.lblRoleName,
          "lblRoleStatus": selItems.lblRoleStatus,
          "lblSeperator": selItems.lblSeperator,
          //"lblValidTillDate": selItems.lblValidTillDate,
          "template":"flxRoles"
        },this.gblselIndex);
        this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
        this.view.btnRoles.setVisibility(this.isKeyCloakEnabled===true?false:true);
        this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
        this.view.btnPermissions.setVisibility(true);
        this.view.lblDescription.setVisibility(true);
        this.view.flxSeperator.setVisibility(true);
        this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
        this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        this.view.fontIconDeactivate.text = "";
        this.view.flxSelectOptions.isVisible = true;
        this.view.forceLayout();
        this.fixContextualMenu(this.mouseYCoordinate-145);
      }
    }else{
      if(this.view.flxSelectOptions.isVisible === true)
      {

//         if(clckd_selectedRowIndex === this.gblsegRoles)
//         {
          this.view.flxSelectOptions.isVisible = false;  //flxTranspSknNormal
          this.view.forceLayout();
          this.view.segPermissions.setDataAt({
            "flxOptions":{"skin":"slFbox"},
            "lblIconImgOptions":  selItems.lblIconImgOptions,
            "fontIconStatusImg": selItems.fontIconStatusImg,
            "lblDescription": selItems.lblDescription,
            "lblNoOfUsers": selItems.lblNoOfUsers,
            "lblPermissions": selItems.lblPermissions,
            "lblRoleName": selItems.lblRoleName,
            "lblRoleStatus": selItems.lblRoleStatus,
            "lblSeperator": selItems.lblSeperator,
            //"lblValidTillDate": selItems.lblValidTillDate,
            "template":"flxRoles"
          },this.gblselIndex);


          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnRoles.setVisibility(false);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
          this.view.btnPermissions.setVisibility(false);
          this.view.lblDescription.setVisibility(false);
          this.view.flxSeperator.setVisibility(false);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
          this.view.fontIconDeactivate.text = "";
        //}
      }
      else if(this.view.flxSelectOptions.isVisible === false)
      {

        this.gblsegRoles = clckd_selectedRowIndex;
        var hgtValue = (((clckd_selectedRowIndex + 1) * 50)+65);
        kony.print("hgtValue in permissions------"+hgtValue);
        this.view.flxSelectOptions.top = this.mouseYCoordinate-148+"px";

        this.view.segPermissions.setDataAt({
          "flxOptions":{"skin":"sknflxffffffop100Border424242Radius100px"},
          "lblIconImgOptions":  selItems.lblIconImgOptions,
          "fontIconStatusImg": selItems.fontIconStatusImg,
          "lblDescription": selItems.lblDescription,
          "lblNoOfUsers":selItems.lblNoOfUsers,
          "lblPermissions": selItems.lblPermissions,
          "lblRoleName": selItems.lblRoleName,
          "lblRoleStatus": selItems.lblRoleStatus,
          "lblSeperator": selItems.lblSeperator,
          //"lblValidTillDate": selItems.lblValidTillDate,
          "template":"flxRoles"
        },this.gblselIndex);

        this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
        this.view.btnRoles.setVisibility(false);
        this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
        this.view.btnPermissions.setVisibility(false);
        this.view.lblDescription.setVisibility(false);
        this.view.flxSeperator.setVisibility(false);
        this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
        this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
        this.view.fontIconDeactivate.text = "";
        this.view.flxSelectOptions.isVisible = true;   
        this.view.forceLayout();
        this.fixContextualMenu(this.mouseYCoordinate-148);
      }
    }
  },
  onClickActiveDeactive:function(roleName){
    var self =this;
    if(this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate")){
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Yes__Activate");
      this.view.flxSelectOptions.setVisibility(false);
      this.DeactivatePermission();
    }
    else  if(this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")){
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Deactivate_Role");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmRolesController.deactivate_Role_popup")+roleName+kony.i18n.getLocalizedString("i18n.frmRolesController.deactivate_Role_popupContent");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
      this.view.flxDeactivatePermission.setVisibility(true);
      this.view.flxSelectOptions.setVisibility(false);
    }
    this.view.popUpDeactivate.btnPopUpDelete.onClick= function(){
      self.DeactivatePermission();
    };
    if(this.gblselIndex!==undefined){
      this.view.segPermissions.data[this.gblselIndex].flxOptions.skin="slFbox";
      this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex],this.gblselIndex);
    }
  },

  DeactivatePermission:function(){
    var user_id=kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.view.flxDeactivatePermission.setVisibility(false);
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.changeStatusOf(this.roleId, this.statusId,user_id);
  },
  callBackTimer : function() 
  {
    kony.timer.cancel("mytimer");
    this.view.flxToastMessage.setVisibility(false);
  },
  createNewUserData: function(data){
    this.activeUsers=data.map(this.newUserData);
  },
  newUserData: function(userData){
    return{
      "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
      "lblFullName": userData.fullName,
      "lblUserIdValue": userData.user_id,
      "lblUsername": userData.userName,
      "template":"flxAddUsers"
    };
  },
  createNewPermData:function(data){
    this.activePermissions=data.map(this.newPermData);
  },
  newPermData: function(PermData){
    return{
      "btnAdd": {
        "text":kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
        "onClick":this.addPermissionstoRole
      },
      "lblPermissionsName": PermData.permissionName,
      "rtxPermissionDescription": PermData.permissionDesc,
      "template":"flxAddPermissions"

    };
  },
  fetchRoleDetails: function(roleId,roleName,roleDesc,roleStatus){
    var roleObj={"roleId":roleId,"roleName":roleName,"roleDesc":roleDesc,"roleStatus":roleStatus};
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchRoleDetails(this,roleObj);
  },
  updatedIdUsersPermissions: function(a1,a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    }); 
  },
  validateRoleName:function(){
    var returnValue;
    if(this.view.tbxRoleNameValue.text.trim()==="")
    {
      this.view.lblNoRoleNameError.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Name_cannot_be_empty");
      this.view.tbxRoleNameValue.skin="skinredbg";
      this.view.flxNoRoleNameError.setVisibility(true);
      return false;
    }
    else if(this.view.tbxRoleNameValue.text.trim().length<5)
    {
      this.view.tbxRoleNameValue.skin="skinredbg";
      this.view.flxNoRoleNameError.setVisibility(true);
      this.view.lblNoRoleNameError.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Name_Min_Limit");
      return false;
    }
    else{
      this.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
      this.view.flxNoRoleNameError.setVisibility(false);
      returnValue  = true;
    }
    if(this.view.txtRoleDescription.text === "" || this.view.txtRoleDescription.text.trim() ===""){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_Cannot_Be_empty");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    }else if(this.view.txtRoleDescription.text.trim().length<5){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_min_limit");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    }else if(this.view.txtRoleDescription.text.trim().length>300){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_max_limit");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    }
    else{
      this.view.txtRoleDescription.skin="skntbxLato35475f14px";
      this.view.flxNoRoleDescriptionError.setVisibility(false);
      returnValue  = true;
    }
    return returnValue;
  },
  errorRoleName: function(){
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected1);
    this.view.flxAddPermissionDetails.setVisibility(false);
    this.view.flxAddRoleDetails.setVisibility(false);
    this.view.flxAddOptionsContainer.setVisibility(false);
    this.view.flxAssignCustomerAccess.setVisibility(false);
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxValidity.setVisibility(false);
    this.view.forceLayout(); 
  },
  selectAllRecords: function(){
    var self = this;
    var toAdd;
    var availableRecords = this.view.segAddOptions.data;
    var data = this.view.segSelectedOptions.data;
    this.view.btnRemoveAll.setVisibility(true);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);

    for (var i = 0; i < availableRecords.length; i++) {
      if(availableRecords[i].lblPermissionsName){
        self.view.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
        toAdd = {
          "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmRolesController.remove_permission")}, 
          "lblOption": "" + availableRecords[i].lblPermissionsName,
          "permissionId": availableRecords[i].permissionId,
          "sourceData": availableRecords[i],
          "flxClose":{"isVisible":false,"onClick":function(){self.showRemovePermissionPopup(1);}},
          "flxAddOptionWrapper":{
            "onHover":self.onHoverEventCallback

          }
        };
      }
      else{
        self.view.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
        toAdd = {
          "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmRolesController.remove_user")},
          "lblOption": availableRecords[i].lblFullName,
          "userId": "" + availableRecords[i].userId,
          "sourceData": availableRecords[i],
          "flxClose":{"isVisible":false,"onClick":self.unSelectedOption},
          "flxAddOptionWrapper":{
            "onHover":self.onHoverEventCallback

          }
        };
      }
      data.push(toAdd);
    }
    if(availableRecords[0].lblPermissionsName){
      this.rolePermissions = data;
    }else{
      this.roleUsers = data;
    }
    this.view.segAddOptions.removeAll();
    this.view.btnAddAll.setVisibility(false);
    if(data.length > 0){
      this.view.segSelectedOptions.isVisible = true;
    }
    this.view.segSelectedOptions.setData(data);
    this.view.rtxAvailableOptionsMessage.setVisibility(true);
    //enable the buttons
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,true);
    this.view.flxOptions.setEnabled(true);
    this.view.forceLayout();
  },
  unselectAllRecords: function(){
    var self = this;
    var toAddData;
    var selRecords = this.view.segSelectedOptions.data;
    var  availableRecords = this.view.segAddOptions.data;
    this.view.btnAddAll.setVisibility(true);
    this.view.segAddOptions.setVisibility(true);
    for(var i=0; i<selRecords.length;i++ )
    {
      if(selRecords[i].sourceData.lblFullName){
        toAddData = {
          "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
          "lblFullName": selRecords[i].sourceData.lblFullName,
          "lblUserIdValue": selRecords[i].sourceData.lblUserIdValue,
          "lblUsername": selRecords[i].sourceData.lblUsername,
          "template":"flxAddUsers",
          "userId":selRecords[i].sourceData.UserId
        };
      }
      else{
        toAddData={
          "btnAdd": {
            "text":kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
            "onClick":self.addPermissionstoRole
          },
          "lblPermissionsName":  selRecords[i].sourceData.lblPermissionsName,
          "rtxPermissionDescription": selRecords[i].sourceData.rtxPermissionDescription,
          "template":"flxAddPermissions",
          "permissionId": selRecords[i].sourceData.permissionId
        };
      }
      availableRecords.push(toAddData);
    }
    if(selRecords[0].sourceData.lblFullName){
      this.roleUsers = [];
    }else{
      this.rolePermissions = [];
    }
    this.view.segAddOptions.setData(availableRecords);
    this.view.rtxAvailableOptionsMessage.setVisibility(availableRecords.length === 0);
    this.view.flxClearSearch.onClick();
    //remove data from right
    this.view.segSelectedOptions.removeAll();
    //disnable the buttons
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnSave,true,false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,false);
    this.view.flxOptions.setEnabled(false);
    this.view.btnRemoveAll.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_to_select_the_item");
    this.view.rtxSelectedOptionsMessage.setVisibility(true);
  },
  onHoverEventCallback:function(widget,context){
    var self=this;
    var rowData = self.view.segSelectedOptions.data[context.rowIndex];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      //rowData.flxAddOptionWrapper.skin = "sknFlxSegRowHover11abeb"; 
      if(rowData.flxClose.isVisible===false){ 
        rowData.flxClose.isVisible = true;
        if(rowData.permissionId){ //in case of permission show popup
          rowData.flxClose.onClick = function(){self.showRemovePermissionPopup(1);};
        }else{
          rowData.flxClose.onClick = self.unSelectedOption;
        }
        self.view.segSelectedOptions.setDataAt(rowData, context.rowIndex, context.sectionIndex);
      }
    }  else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      // rowData.flxAddOptionWrapper.skin = "sknflxffffffop0e"; 
      rowData.flxClose.isVisible = false;
      rowData.flxClose.onClick = {};
      self.view.segSelectedOptions.setDataAt(rowData, context.rowIndex, context.sectionIndex);
    }
    for(var i=0;i<self.view.segSelectedOptions.data.length;i++){
      rowData=self.view.segSelectedOptions.data[i];
      if(i!==context.rowIndex){ 
        rowData.flxClose.isVisible = false;
        rowData.flxClose.onClick = {};
        self.view.segSelectedOptions.setDataAt(rowData, i , i);
      }
    }
    self.view.forceLayout();

  },
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.roleData;
    var segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      var statuses = "";
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
        statuses = statuses + self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription + "_";
      }
      if(self.view.mainHeader.flxDownloadList.info === undefined) {
        self.view.mainHeader.flxDownloadList.info = {};
      }
      self.view.mainHeader.flxDownloadList.info.selectedStatusList = statuses.substring(0, statuses.length-1);

      self.view.flxNoResultFound.setVisibility(false);
      self.view.flxPermissionsContainer.height="100%";
      self.view.flxRolesHeader.setVisibility(true);
      self.view.flxSegRoles.setVisibility(true);

      //self.view.flxPagination.setVisibility(true);
      if (selInd.length === segStatusData.length) { //all are selected
        self.setRolesSegmentData(self.roleData,true);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.Status_Desc) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setRolesSegmentData(dataToShow,true);
        } else {
          self.view.rtxSearchMesg.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          self.view.flxNoResultFound.setVisibility(true);
          self.view.flxNoResultFound.top="60px";
          self.view.flxPermissionsContainer.height="53%";
          self.view.flxRolesHeader.setVisibility(true);
          self.view.flxSegRoles.setVisibility(false);
          //         self.view.flxPagination.setVisibility(false);
          self.view.segPermissions.setData([]);
        }
      }
    } else {
      self.view.rtxSearchMesg.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.flxNoResultFound.setVisibility(true);
      self.view.flxNoResultFound.top="60px";
      self.view.flxPermissionsContainer.height="53%";
      self.view.flxRolesHeader.setVisibility(true);
      self.view.flxSegRoles.setVisibility(false);
      //         self.view.flxPagination.setVisibility(false);
      self.view.segPermissions.setData([]);
    }
  },
  savedEditedDataInTextBox : function(){
    var scopeObj = this;
    scopeObj.view.tbxRoleNameValue.text=scopeObj.roleDetails.lblRoleName;
    scopeObj.view.txtRoleDescription.text=scopeObj.roleDetails.lblDescription;
  },
  setDataToCSRAssistSegment: function (data) {
    var scopeObj = this;
    var widgetMap = {
      "id": "id",
      "isEnabled": "isEnabled",
      "Action_id": "Action_id",
      "lblIconArrow": "lblIconArrow",
      "lblName": "lblName",
      "lblLine": "lblLine",
      "flxEnableToggle": "flxEnableToggle",
      "lblEnable": "lblEnable",
      "switchToggle": "switchToggle",
      "flxEnableTick": "flxEnableTick",
      "lblIconGreenTick": "lblIconGreenTick",
      "lblEnabled": "lblEnabled",
      "flxViewConfigureDesc": "flxViewConfigureDesc",
      "lblLine2": "lblLine2",
      "lblHeadingDesc": "lblHeadingDesc",
      "rtxDescription": "rtxDescription",
    };
    var index = scopeObj.view.segViewSegment.selectedRowIndex;
    var rowData;
    if (index) {
      rowData = scopeObj.view.segViewSegment.data[index[1]];
    }
    var segData = data.map(function (record) {
      return {
        "id": record.id,
        "isEnabled": record.isEnabled,
        "Action_id": record.Action_id,
        "lblIconArrow": {
          "skin": "sknfontIconDescRightArrow14px",
          "text": "\ue922"
        },
        "lblName": record.Name,
        "rtxDescription": record.Description,
        "flxEnableToggle": {
          "isVisible": rowData.lblIconAction.text === "\ue952" ? true : false
        },
        "switchToggle": {
          "selectedIndex": record.isEnabled === "true" ? 0 : 1,
          "onSlide": function () {
            scopeObj.updateRoleCompositeActions();
          }
        },
        "flxEnableTick": {
          "isVisible": (rowData.lblIconAction.text === "\ue948" && record.isEnabled === "true") ? true : false
        },
        "flxViewConfigureDesc": {
          "isVisible": false
        },
        "lblLine": "-",
        "lblEnable": kony.i18n.getLocalizedString("i18n.userwidgetmodel.ViewConfigureCSR.Enable"),					
        "lblIconGreenTick": {
          "text": "\ue94f"
        },
        "lblEnabled": kony.i18n.getLocalizedString("i18n.userwidgetmodel.ViewConfigureCSR.Enabled"),	
        "lblLine2": "-",
        "lblHeadingDesc": kony.i18n.getLocalizedString("i18n.permission.DESCRIPTION"),
      };
    });
    kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    scopeObj.view.viewConfigureCSRAssist.segViewConfigureCSR.widgetDataMap = widgetMap;
    scopeObj.view.viewConfigureCSRAssist.segViewConfigureCSR.setData(segData);
    scopeObj.view.forceLayout();
  },
  getActionItem: function () {
    var self = this;
    var rolePermissions = self.roleDetailsObj.rolePermissions;
    var iconValue = {"text":"\ue948", "skin":"sknEyeIcon30px"};
    var roleNames = rolePermissions.map(function (perm) {
      return (perm.Permission_Name).toLowerCase();
    });
    if (roleNames.indexOf("updateroles") >= 0) {
      iconValue = {"text":"\ue952", "skin":"sknIcon20px","tooltip":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Configure")}; //configure-icon
    } else if (roleNames.indexOf("viewroles") >= 0) {
      iconValue = {"text":"\ue948", "skin":"sknEyeIcon30px","tooltip":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.View")}; //view-icon
    }
    return iconValue;
  },
  navigateToConfigureViewCSRPerm: function () {
    var self = this;
    var index = self.view.segViewSegment.selectedRowIndex;
    var data;
    if (index) {
      data = self.view.segViewSegment.data[index[1]];
    }
    if(data!==undefined&&data!==null){
      var inputParam = {
        "Role_id": data.Role_id,
        "Permission_id": data.Permission_id
      };
      self.view.flxViewSegmentAndHeaders.setVisibility(false);
      self.view.flxViewConfigureCsrCont.setVisibility(true);
      kony.adminConsole.utils.showProgressBar(this.view);
      self.presenter.fetchCompositeActions(inputParam);
    }
  },
  updateRoleCompositeActions : function(){
    var self = this;
    var inputReq ={
      "roleId":"",
      "addedCompositeActions":[],
      "removedCompositeActions":[]
    };
    var opt = "";
    var rowData;
    var roleSegIndex = self.view.segPermissions.selectedRowIndex;
    var index = self.view.viewConfigureCSRAssist.segViewConfigureCSR.selectedRowIndex;
    if(index && roleSegIndex){
      rowData = self.view.viewConfigureCSRAssist.segViewConfigureCSR.data[index[1]];
      var roleData = self.view.segPermissions.data[roleSegIndex[1]];
      inputReq.roleId = roleData.roleId;
      if(rowData.switchToggle.selectedIndex === 1){
        inputReq.removedCompositeActions.push(rowData.id);
        opt = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Remove");
      }else{
        inputReq.addedCompositeActions.push(rowData.id);
        opt = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add");
      }
      self.presenter.updateRoleCompositeActions(inputReq,opt);
    }
  },
  /*show add-remove customer roles screen*/
  showAddServiceDefinitions : function(){
    var self = this;
    self.hideAll();
    self.hideOptions();
    self.hideMainHeaderButtons();
    self.togglePermissionSuboptions(true);
    self.view.searchBoxCustAccess.tbxSearchBox.text = "";
    self.view.searchBoxCustAccess.flxSearchCancel.setVisibility(false);
    var widgetArray = [self.view.btnAddPermissions,self.view.btnAddUsers,self.view.btnOptionDetails];
    self.tabUtilVerticleButtonFunction(widgetArray,self.view.btnAddPermissions);
    var widgetArray2 = [self.view.btnAddSysPermissions,self.view.btnAddCustomerAccess];
    self.tabUtilVerticleButtonFunction(widgetArray2,self.view.btnAddCustomerAccess);
    self.tabUtilVerticleArrowVisibilityFunction(self.selectedArrowArray,self.view.lblIconCustomerAccessSelected);
    self.view.flxViews.setVisibility(true);
    self.hideMainSubHeader();
    self.view.flxAddMainContainer.setVisibility(true);
    self.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    self.view.flxAssignCustomerAccess.setVisibility(true);
    self.view.flxRolesBreadCrumb.setVisibility(true);
    self.setServiceDefSegDataCreate();
    self.view.forceLayout();
  },
  /*
  * widget data map for service definition listing segment
  * @return : seg widgetDataMap json
  */
  getWidgetMapForServiceDefSeg : function(){
    var widgetMap = {
      "flxEnrollSelectedAccountsSec":"flxEnrollSelectedAccountsSec",
      "flxAccountSectionCont":"flxAccountSectionCont",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "lblFeatureName":"lblFeatureName",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "flxHeadingCheckbox":"flxHeadingCheckbox",
      "flxRow2":"flxRow2",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "lblSectionLine":"lblSectionLine",
      "flxHeaderContainer":"flxHeaderContainer",
      "imgSectionCheckbox":"imgSectionCheckbox",
      "flxCheckbox":"flxCheckbox",
      "flxAccountNumCont":"flxAccountNumCont",
      "lblAccountNumber":"lblAccountNumber",
      "flxAccountType":"flxAccountType",
      "lblAccountType":"lblAccountType",
      "lblSeperator":"lblSeperator",
      "flxRolesServiceDefRow":"flxRolesServiceDefRow",
      "flxServiceDefDesc":"flxServiceDefDesc",
      "flxServiceDefName":"flxServiceDefName",
      "imgCheckbox":"imgCheckbox",
      "lblServiceDefName":"lblServiceDefName",
      "lblServiceDefDesc":"lblServiceDefDesc",
      "id":"id",
      "type":"type",
      "isEnabled":"isEnabled",
      "typeName":"typeName",
      
      };
    return widgetMap;
  },
  /* 
  * map available service definitions data to segment
  */
  setServiceDefSegDataCreate: function(){
    var availableData = this.view.segCustAccess.info.segData;
    this.view.segCustAccess.widgetDataMap =this.getWidgetMapForServiceDefSeg(); 
    this.view.segCustAccess.setData(availableData);
    this.view.forceLayout();
  },
  /* search for service definitions in create/edit role screen */
  searchServiceDefinitionsList: function(){
    var segData = this.view.segCustAccess.info.orgServiceList;
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.searchBoxCustAccess.tbxSearchBox.text);
    var filteredResults =[];
    for(var i=0; i<segData.length; i++){
      var sectionData = segData[i].sectionData;
      var rowsList = segData[i].rowData;
      var filteredRows =[], selectedCount =0;
      for(var j=0; j<rowsList.length;j++){
        if(rowsList[j].lblServiceDefName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          (rowsList[j].typeName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)){
          filteredRows.push(rowsList[j]);
          if(rowsList[j].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected){
            selectedCount = selectedCount+1;
          }
        }
      }
      if(filteredRows.length > 0){
        sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
        sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
        sectionData.flxHeaderContainer.isVisible = false;
        sectionData.lblSectionLine.isVisible = false;
        sectionData.imgSectionCheckbox.src = this.getHeaderCheckboxImage(filteredRows,true,true);
        sectionData.lblCountActions.text = selectedCount +"";
        filteredRows = this.showHideSegRowFlex(filteredRows,false);
        sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
        filteredResults.push([sectionData,filteredRows]);
      }
    }
    if(filteredResults.length > 0){
      this.view.segCustAccess.setData(filteredResults);
      this.view.flxServiceDefinitionSegment.setVisibility(true);
      this.view.flxCustAccessNoResults.setVisibility(false);
    } else{
      this.view.segCustAccess.setData([]);
      this.view.lblCustAccessNoResults.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText+
        "\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.flxServiceDefinitionSegment.setVisibility(false);
      this.view.flxCustAccessNoResults.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /* get added and removed service definitions
   *  @return: { "AddedServiceDefinitions":[],"RemovedServiceDefinitions"[] }
   */
  getUpdatedServiceDefList : function(){
    var orginalList = this.view.segCustAccess.info.editServiceList || [];
    var modifiedList = this.view.segCustAccess.data;
    var orginalListID =[],modifiedListID =[];
    for(var i=0;i<orginalList.length; i++){
      orginalListID.push(orginalList[i].ServiceDefinition_id);
    }
    for(var m=0;m<modifiedList.length; m++){
      for(var n=0;n<modifiedList[m][1].length; n++){
        if(modifiedList[m][1][n].isEnabled === true){
          modifiedListID.push(modifiedList[m][1][n].id);
        }
      }
    }
    var addedId = this.updatedIdUsersPermissions(modifiedListID,orginalListID);
    var removedId = this.updatedIdUsersPermissions(orginalListID,modifiedListID);
    return {
      "AddedServiceDefinitions":addedId,
      "RemovedServiceDefinitions":removedId
    };
  },
  /* show confirmation popup on removing system permissions*/
  showRemovePermissionPopup : function(context){
    var self =this;
    this.view.flxDeactivatePermission.setVisibility(true);
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmRoles.RevokePermissionsHeading");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmRoles.revokePermissionsMsg");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    //button proceed on click
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.view.flxDeactivatePermission.setVisibility(false);
      if(context === 1){ // remove one permission
        self.unSelectedOption();
      }else if(context === 2){  // remove all permissions
        self.unselectAllRecords();
      }
      
      self.view.forceLayout();
    }; 
  },
  viewServiceDefinitionsForARole : function(){
    this.tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2],this.view.lblTabName1);
    this.subTabsButtonWithBgUtilFunction([this.view.tabs.btnTab1,this.view.tabs.btnTab2],this.view.tabs.btnTab2);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewSegment.top = "0dp";
    var serviceDefList = this.roleDetailsObj.roleServiceDefinition;
    var allServiceDefList = this.roleDetailsObj.allServiceDefinitions;
    this.view.segViewSegment.widgetDataMap = this.getWidgetMapForServiceDefSeg();
    var segData = this.setServiceDefinitionViewSegData(serviceDefList,allServiceDefList);
    this.view.segViewSegment.setData(segData);
    //this.view.flxViewSegment.setVisibility(segData.length > 0);
    this.view.rtxAvailabletxt.setVisibility(segData.length <= 0);  
    this.view.rtxAvailabletxt.text =  kony.i18n.getLocalizedString("i18n.frmRoles.NoServiceDefinitionsAvailable");
    this.view.forceLayout();
  },
  /*
  * get mapped data for view service definition segment
  * @param: service definition list assigned to role, all service definition list
  * @return : mapped data for view segment
  */
  setServiceDefinitionViewSegData : function(data,allServiceDefList){
    var self =this;
    var groupedServiceDefList = this.getServiceDefBasedOnType(data);
    var groupedAllServiceDefList = this.getServiceDefBasedOnType(allServiceDefList);
    var serviceTypes = Object.keys(groupedServiceDefList);
    var segData = serviceTypes.map(function(record){
      var rowsData = [];
      var serviceDef = groupedServiceDefList[record] || [];
      for(var i=0; i<serviceDef.length; i++){
        rowsData.push({
          "flxRolesServiceDefRow":{"isVisible":false,
                                   "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxCheckbox":{"isVisible": false},
          "lblServiceDefName":{"text":serviceDef[i].ServiceDefinition_Name,"left":"25dp"},
          "lblServiceDefDesc":{"text":serviceDef[i].ServiceDefinition_Description || kony.i18n.getLocalizedString("i18n.Applications.NA")},
          "template":"flxRolesServiceDefRow",
        });
      }
      var sectionData = {
        "flxHeadingCheckbox": {"isVisible":false},
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "lblFeatureName": {"text": self.serviceTypes[record] || kony.i18n.getLocalizedString("i18n.Applications.NA")},
        "flxToggleArrow": {"onClick": self.toggleServiceDefRows.bind(self, self.view.segViewSegment)},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknIcon00000015px"},
        "lblAvailableActions":{"text":"Selected Services: "},
        "lblCountActions":{"text": rowsData.length},
        "lblTotalActions":{"text":" of "+ groupedAllServiceDefList[record].length},
        "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
        "lblSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
        "flxCheckbox":{"isVisible":false},
        "flxHeaderContainer":{"isVisible":false,"height":"40dp"},
        "lblAccountNumber":{"text":"SERVICE"},
        "flxAccountNumCont":{"left":"30dp"},
        "lblAccountType":{"text":"DESCRIPTION"},
        "template":"flxEnrollSelectedAccountsSec"
      };
      return [sectionData,rowsData];
    });
    return segData;
  },
    /*
  * check if all the rows of segment are selected or not
  * @param: data,rowData or section data, is partial selection behaviour
  * @return: image to be set (checked/unchecked/partial)
  */
  getHeaderCheckboxImage : function(data,isRowData,hasPartialSelection){
    var img = this.AdminConsoleCommonUtils.checkboxnormal;
    var currImg = (isRowData === true) ? "imgCheckbox" :"imgSectionCheckbox";
    var selCount = 0, partialCount = 0,unselCount = 0;
    for(var i=0; i<data.length; i++){
      var list = (isRowData === true) ? data[i] : data[i][0];
        if(list[currImg].src === this.AdminConsoleCommonUtils.checkboxSelected || list[currImg].src === this.AdminConsoleCommonUtils.checkboxPartial){
          selCount  = selCount +1;
          partialCount = (list[currImg].src === this.AdminConsoleCommonUtils.checkboxPartial) ? partialCount +1 : partialCount;
        }
      }
    if(hasPartialSelection){
      if(selCount !== 0 && selCount === data.length)
        img = partialCount === 0 ? this.AdminConsoleCommonUtils.checkboxSelected: this.AdminConsoleCommonUtils.checkboxPartial;
      else if(selCount !== 0 && selCount < data.length)
        img = this.AdminConsoleCommonUtils.checkboxPartial;
    } else{
      if(selCount === data.length)
        img = this.AdminConsoleCommonUtils.checkboxSelected;
    }
    return img;
      
  },
  /*
  * check/uncheck checkbox in services tab header
  * @param: segment widget path, is header(true/false)
  */
  onCheckServiceDefCheckbox : function(segmentPath, isHeader,eventObj,context) {
    var selSecInd = context.sectionIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0;
    //on section checkbox click
    if(isHeader){
      var img = (segSecData.imgSectionCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ?
          this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      segSecData.imgSectionCheckbox.src = img;
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].imgCheckbox.src =img;
        rowsData[i].isEnabled = img === this.AdminConsoleCommonUtils.checkboxnormal ? false : true;
      }
      selectedRowsCount = img === this.AdminConsoleCommonUtils.checkboxnormal ? "0" : "" + rowsData.length;
      segSecData.lblCountActions = selectedRowsCount;
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].isEnabled = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? true : false;
      rowsData[selInd].imgCheckbox.src = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      segSecData.imgSectionCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      selectedRowsCount = this.getSelectedRowsCount(rowsData);
      segSecData.lblCountActions = selectedRowsCount;
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
  },
 /*
  * get the selected rows count
  * @param: rows data
  */
  getSelectedRowsCount : function(rowsList){
    var rowCount = 0;
    for(var i=0;i < rowsList.length; i++){
      if(rowsList[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected)
        rowCount = rowCount +1;
    }
    return (rowCount+"");
  },
  /*
  * expand/collapse the selected service definition
  */
  toggleServiceDefRows : function(segmentPath,context){
    var selSecInd = context.rowContext.sectionIndex;
    var selRowInd = context.rowContext.rowIndex;
    var segData = segmentPath.data;
    for(var i=0; i<segData.length; i++){
      if(selSecInd !== i){
        segData[i][0].lblIconToggleArrow.text = "\ue922"; //right-arrow
        segData[i][0].lblIconToggleArrow.skin = "sknIcon00000015px";
        segData[i][0].flxHeaderContainer.isVisible = false;
        segData[i][0].lblSectionLine.isVisible = false;
        segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
        segData[i][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";

      }
    }
    if(segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px"){
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue915"; //down-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000014px";
      segData[selSecInd][0].flxHeaderContainer.isVisible = true;
      segData[selSecInd][0].lblSectionLine.isVisible = true;
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],true);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
    } else{
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue922"; //right-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000015px";
      segData[selSecInd][0].flxHeaderContainer.isVisible = false;
      segData[selSecInd][0].lblSectionLine.isVisible = false;
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],false);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    }
    segmentPath.setData(segData);
  },
  /*
  * set segment rows visibility
  * @params: rows array, visibility - true/false
  * @return: updated rows data with visibilty
  */
  showHideSegRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      if(rowsData[i].flxContractEnrollFeaturesEditRow)
        rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
      else
        rowsData[i].flxRolesServiceDefRow.isVisible = visibility;
      if(visibility === true && (i === rowsData.length-1)){
        if(rowsData[i].flxContractEnrollFeaturesEditRow)
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound"; 
        else
          rowsData[i].flxRolesServiceDefRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
      }
    }
    return rowsData;
  },
  /*
  * show create role UI
  */
  showAddRoleScreen : function(){
    this.addNewRolePath=true;
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.view.flxViews.setVisibility(true);
    this.view.flxCreateRoleMainCont.setVisibility(true);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.common.newCAPS");
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Add_Roles");
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    //this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.commonButtonsCreateRoleFA.btnSave.text=kony.i18n.getLocalizedString("i18n.frmRoles.AddRole_UC");
    //clear data
    this.view.tbxRoleName.text="";
    this.view.switchRoleStatus.selectedIndex=0;	
    this.view.txtAreaRoleDescription.text=""; 
    this.showAddRoleDetailsScreen();
    this.setLegaEntityMasterData();
  },
  /*
  * show role details screen
  */
  showAddRoleDetailsScreen : function(){
    var verticalTabArrowWidArr = [this.view.verticalTabsCreateRole.lblSelected1,this.view.verticalTabsCreateRole.lblSelected2];
    this.tabUtilVerticleArrowVisibilityFunction(verticalTabArrowWidArr,this.view.verticalTabsCreateRole.lblSelected1);
    var widgetArray = [this.view.verticalTabsCreateRole.btnOption1,this.view.verticalTabsCreateRole.btnOption2];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.verticalTabsCreateRole.btnOption1);
    this.view.flxRoleDetailsScreen.setVisibility(true);
    this.view.flxRoleFeatureActionsScreen.setVisibility(false);
    this.clearAddRoleDetailsErrors();
  },
  /*
  * show role features actions screen
  */
  showAddRoleFAScreen : function(){
    var verticalTabArrowWidArr = [this.view.verticalTabsCreateRole.lblSelected1,this.view.verticalTabsCreateRole.lblSelected2];
    this.tabUtilVerticleArrowVisibilityFunction(verticalTabArrowWidArr,this.view.verticalTabsCreateRole.lblSelected2);
    var widgetArray = [this.view.verticalTabsCreateRole.btnOption1,this.view.verticalTabsCreateRole.btnOption2];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.verticalTabsCreateRole.btnOption2);
    this.view.flxRoleDetailsScreen.setVisibility(false);
    this.view.flxRoleFeatureActionsScreen.setVisibility(true);
    this.view.searchBoxRoleFA.tbxSearchBox.text = "";
    this.view.searchBoxRoleFA.flxSearchCancel.setVisibility(false);
    this.view.searchBoxRoleFA.flxSearchContainer.skin = "sknflxd5d9ddop100";
    
    this.setAddRolesFASegData();
  },
  /*
  * clear add/edit role details screen inline errors
  * @params: border change widget ref, error flex wid ref, widget type
  */
  clearAddRoleDetailsErrors : function(widType,borderWidget,errorFlxWidget){
    if(widType === 1){ //textbox
      borderWidget.skin = "sknTbxBgFFFFFFBrD7D9E01pxR3px";
      errorFlxWidget.setvisibility(false);
    } else if(widType === 2){ //textarea
      borderWidget.skin = "skntxtAread7d9e0";
      errorFlxWidget.setvisibility(false);
    }else if(widType === 3){ //flex
      borderWidget.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3pxHov";
      errorFlxWidget.setvisibility(false);
    } else{ //clear all fields
      this.view.tbxRoleName.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
      this.view.txtAreaRoleDescription.skin = "skntxtAread7d9e0";
      this.view.flxRoleLegalSelectedValue.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3pxHov";
      this.view.flxRoleNameError.setVisibility(false);
      this.view.flxRoleDescriptionError.setVisibility(false);
      this.view.flxRoleOrgUnitError.setVisibility(false);
      this.view.flxRoleLegalEntityError.setVisibility(false);
    }
  },
  /*
  * set legal entity dropdown data
  * @params: 
  */
  setLegaEntityMasterData : function(){
    var self =this;
    var data = [{"name":"Argentina","currCode":"ARS"},
               {"name":"Australia","currCode":"AUD"},
               {"name":"Canada","currCode":"CAD"},
               {"name":"United Kingdom","currCode":"GBP"}];
    var widgetMap = {
      "flxRolesLegalEntity":"flxRolesLegalEntity",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "flxCheckbox":"flxCheckbox",
      "imgCheckBox":"imgCheckBox",
      "flxFlagImg":"flxFlagImg",
      "imgFlag":"imgFlag",
      "lblValue":"lblValue",
      "lblCurrencyValue":"lblCurrencyValue",
      "id":"id",
    };
    var segHeaderData = {
      "flxCheckbox":{"onClick" :""},
      "imgCheckBox":{"src":this.AdminConsoleCommonUtils.checkboxnormal},
      "flxFlagImg":{"isVisble":false},
      "lblValue":{"text":"COUNTRY","left":"45dp"},
      "lblCurrencyValue":{"text":"CUR"},
      "template":"flxRolesLegalEntity"
    };
    var segRowData = data.map(function(rec){
      return{
        "flxCheckbox":{"onClick" :self.onCheckLegalEntityItem.bind(self)},
        "imgCheckBox":{"src":self.AdminConsoleCommonUtils.checkboxnormal},
        "flxFlagImg":{"isVisble":true, "onClick" :""},
        "imgFlag":{"src":"visa.png"},
        "lblValue":{"text":rec.name},
        "lblCurrencyValue":{"text":rec.currCode},
        "template":"flxRolesLegalEntity"
      };
    });
    var segData =[[segHeaderData,segRowData] ];
    this.view.dropdownLegalEntity.segStatusFilterDropdown.hasSections =true;
    this.view.dropdownLegalEntity.segStatusFilterDropdown.widgetDataMap = widgetMap;
    
    this.view.dropdownLegalEntity.segStatusFilterDropdown.setData(segData);
    this.view.forceLayout();
  },
  /*
  * check/uncheck legal entity item in dropdown list
  * @param: isHeader checkbox(true/false)
  */
  onCheckLegalEntityItem : function(isHeader,eventObj){
    var count = 0;
    var selRowInd = eventObj.rowContext.rowIndex;
    var segData = this.view.dropdownLegalEntity.segStatusFilterDropdown.data;
    
    if(isHeader){ //update all rows
      var headerImgToSet = segData[0].imgCheckBox.src === this.AdminConsoleCommonUtils.checkboxnormal ?
          this.AdminConsoleCommonUtils.checkboxSelected :this.AdminConsoleCommonUtils.checkboxnormal;
      for(var i=0; i<segData[1].length; i++){
        segData[1][i].imgCheckBox.src = headerImgToSet;
      }
    } //update slected row
    else{
      segData[1][selRowInd].imgCheckBox.src = segData[1][selRowInd].imgCheckBox.src === this.AdminConsoleCommonUtils.checkboxnormal ?
        this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
    }
    segData[0].imgCheckBox.src = this.getHeaderCheckboxImage(segData[1], true, true);
    this.view.dropdownLegalEntity.segStatusFilterDropdown.setData(segData);
    this.view.forceLayout();
  },
  /*
  * search for legal entity from dropdown list
  */
  searchLegalEntityList : function(){
    var searchText = this.view.dropdownLegalEntity.tbxSearchBox.text.trim().toLowerCase();
    var actualData =[];
    var searchResults = actualData.filter(function(rec){
      if(searchText.indexOf(rec.lblValue.text.toLowerCase()) >= 0)
        return rec;
    });
    if(searchResults.length > 0){
      searchResults[0].imgCheckBox.src = this.getHeaderCheckboxImage(searchResults[1], true, true);
      this.view.dropdownLegalEntity.segStatusFilterDropdown.setData();
      this.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(true);
      this.view.dropdownLegalEntity.flxNoResultFound.setVisibility(false);
    }else{
      this.view.dropdownLegalEntity.segStatusFilterDropdown.setData([]);
      this.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(false);
      this.view.dropdownLegalEntity.flxNoResultFound.setVisibility(true);
    }
  },
  /*
  * validate add/edit screen role details
  */
  validateAddRoleDetails : function(){
    var isValid = true;
    if(this.view.tbxRoleName.text.trim().length <= 0){
      isValid = false;
      this.view.tbxRoleName.skin ="skntbxBordereb30173px";
      this.view.flxRoleNameError.setVisibility(true);
    } else if(this.view.txtAreaRoleDescription.text.trim().length <= 0){
      isValid = false;
      this.view.txtAreaRoleDescription.skin = "sknTxtError";
      this.view.flxRoleDescriptionError.setVisibility(true);
    }
    return isValid;
  },
  /*
  * widget data map for features actions listing segment
  * @return : seg widgetDataMap json
  */
  getWidgetMapForRoleFASeg : function(){
    var widgetMap = {
      "flxEnrollSelectedAccountsSec":"flxEnrollSelectedAccountsSec",
      "flxAccountSectionCont":"flxAccountSectionCont",
      "flxActionsHeaderContainer":"flxActionsHeaderContainer",
      "flxHeaderContainer":"flxHeaderContainer",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "flxHeadingCheckbox":"flxHeadingCheckbox",
      "imgTopCheckbox":"imgTopCheckbox",
      "flxDetailsCont":"flxDetailsCont",
      "lblFeatureName":"lblFeatureName", 
      "flxRow2":"flxRow2",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "flxRight":"flxRight",
      "lblIconStatus":"lblIconStatus",
      "lblStatusValue":"lblStatusValue",
      "lblSectionLine":"lblSectionLine",
      "flxActionNameHeading":"flxActionNameHeading",
      "flxActionStatusHeading":"flxActionStatusHeading",
      "lblActionStatus":"lblActionStatus",
      "lblActionName":"lblActionName",
      "lblActionSeperator":"lblActionSeperator",
      //row template
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "flxFeatureNameCont":"flxFeatureNameCont",
      "flxStatus":"flxStatus",
      "lblStatus":"lblStatus",
      "flxCheckbox":"flxCheckbox",
      "imgCheckbox":"imgCheckbox",
      "lblSeperator":"lblSeperator",
      "id":"id",
      "actions":"actions",
      "isEnabled":"isEnabled",
      
      };
    return widgetMap;
  },
  /*
  * map add role feature actions segment data
  * @param: all service definition list, service def of role
  * @return : mapped segment data
  */
  setAddRolesFASegData : function(){
    var self =this;
    var actualData =[];
    var featuresData = [{"featureId":"F1",
                         "featureName":"Service Definition",
                         "featureStatus":"SID_ACTIVE",
                         "actions":[
                           {"actionId":"A1",
                            "actionName":"View service definitions",
                            "actionStatus":"SID_ACTIVE",
                            "isEnabled":true},
                           {"actionId":"A2",
                            "actionName":"Create service definitions",
                            "actionStatus":"SID_ACTIVE",
                            "isEnabled":false},
                           {"actionId":"A3",
                            "actionName":"Delete service defintion",
                            "actionStatus":"SID_ACTIVE",
                            "isEnabled":true},
                         ]}];
    var segData = featuresData.map(function(record){
      var rowsData = [], selRowCount =0;
      var actions = record.actions;
      for(var i=0; i<actions.length; i++){
        rowsData.push({
          "id":actions[i].actionId,
          "isEnabled": actions[i].isEnabled,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false,
                                   "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxFeatureNameCont":{"left":"40dp"},
          "flxCheckbox":{ "onClick":self.onCheckFeatureCheckbox.bind(self,self.view.segRoleFAList,false)},
          "imgCheckbox":{"src": (actions[i].isEnabled === true) ? self.AdminConsoleCommonUtils.checkboxSelected : self.AdminConsoleCommonUtils.checkboxnormal},
          "lblFeatureName":{"text":actions[i].actionName},
          "lblIconStatus":{"text":"\ue921",
                            "skin":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
          "lblStatus":{"text":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                              kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
          "template":"flxContractEnrollFeaturesEditRow",
        });
        if(actions[i].isEnabled === true){
          selRowCount = selRowCount +1;
        }
      }
      
      var sectionData = {
        "actions":record.actions,
        "flxHeaderContainer":{"isVisible":false},
        "flxActionsHeaderContainer":{"isVisible":false},
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "lblFeatureName": {"text": record.featureName},
        "flxToggleArrow": {"onClick": self.toggleRoleFeatureRows.bind(self,self.view.segRoleFAList)},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknIcon00000015px"},
        "lblAvailableActions":{"text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon")},
        "lblCountActions":{"text": self.getTwoDigitNumber(selRowCount)},
        "lblTotalActions":{"text":" of "+  self.getTwoDigitNumber(rowsData.length)},
        "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
        "lblActionSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
        "imgTopCheckbox":{"src":self.AdminConsoleCommonUtils.checkboxSelected},
        "flxHeadingCheckbox":{"onClick":self.onCheckFeatureCheckbox.bind(self,self.view.segRoleFAList,true),"isVisible":true},
        "flxRight":{"isVisible":true},
        "lblIconStatus":{"text":"\ue921",
                          "skin":record.featureStatus === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblStatusValue":{"text":record.featureStatus === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                              kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "flxActionNameHeading":{"left":"55dp"},
        "lblActionName":{"text":"ACTION"},
        "flxActionCheckbox":{"isVisible":false},
        "lblActionStatus":{"text":"STATUS"},
        "template":"flxEnrollSelectedAccountsSec"
      };
      actualData.push({"sectionData":sectionData,"rowData":rowsData});
      return [sectionData,rowsData];
    });
    this.view.segRoleFAList.info.orgFAList = actualData;
    this.view.segRoleFAList.widgetDataMap = this.getWidgetMapForRoleFASeg();
    this.view.segRoleFAList.setData(segData);
  },
  /*
  * check/uncheck checkbox in features/actions
  * @param: segment widget ref, is header(true/false)
  */
  onCheckFeatureCheckbox : function(segmentPath, isHeader,eventObj,context) {
    var selSecInd = context.sectionIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0;
    //on section checkbox click
    if(isHeader){
      var img = (segSecData.imgTopCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ?
          this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      segSecData.imgTopCheckbox.src = img;
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].imgCheckbox.src =img;
        rowsData[i].isEnabled = img === this.AdminConsoleCommonUtils.checkboxnormal ? false : true;
      }
      selectedRowsCount = img === this.AdminConsoleCommonUtils.checkboxnormal ? "0" : "" + rowsData.length;
      segSecData.lblCountActions = this.getTwoDigitNumber(selectedRowsCount);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].isEnabled = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? true : false;
      rowsData[selInd].imgCheckbox.src = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      segSecData.imgTopCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"imgCheckbox",false);
      segSecData.lblCountActions = selectedRowsCount;
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    }
    this.view.lblRoleFASelectedCountVal.text = this.getSelectedFeatureActionCount(segmentPath.data, "imgTopCheckbox", true);
  },
 /*
  * expand/collapse the selected feature actions card
  * @param: segment wid ref
  */
  toggleRoleFeatureRows : function(segmentPath,context){
    var selSecInd = context.rowContext.sectionIndex;
    var selRowInd = context.rowContext.rowIndex;
    var segData = segmentPath.data;
    for(var i=0; i<segData.length; i++){
      if(selSecInd !== i){ //collapse
        segData[i][0] = this.getCollapsedSectionProperties(segData[i][0]);
        segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
      }
    }
    if(segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px"){
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue915"; //down-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000014px";
      segData[selSecInd][0].flxActionsHeaderContainer.isVisible = true;
      segData[selSecInd][0].lblSectionLine.isVisible = true;
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],true);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
    } else{ //collapse
      segData[selSecInd][0] = this.getCollapsedSectionProperties(segData[selSecInd][0]);
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],false);
    }
    segmentPath.setData(segData);
  },
  /* 
   * search for features actions in create/edit role screen 
  */
  searchRoleFAList: function(){
    var features = this.view.segRoleFAList.info.orgFAList;
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.searchBoxRoleFA.tbxSearchBox.text).trim();
    var searchResults = [], updatedFeature;
    var filteredRows = [], featureHeader,featureRows, selActions;
    if(searchText.trim().length > 0){
      for(var i=0; i<features.length; i++){
        updatedFeature ="";
        featureHeader = features[i].sectionData;
        featureRows = features[i].rowData;
        //search for features
        if(featureHeader.lblFeatureName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
          updatedFeature = this.setFeatureCardOnSearch(features[i]);
          searchResults.push(updatedFeature);
        }//search for actions 
        else{ 
          filteredRows = this.searchActions(featureRows,searchText);
          if(filteredRows.length > 0){
            updatedFeature = this.setFeatureCardOnSearch(features[i],filteredRows);
            searchResults.push(updatedFeature);
          }
        }
      }
    } else{
      updatedFeature ="";
      for(var j=0; j<features.length; j++){
        updatedFeature = this.setFeatureCardOnSearch(features[j]);
        searchResults.push(updatedFeature);
      }
    }
    if(searchResults.length > 0){
      this.view.segRoleFAList.setData(searchResults);
      this.view.lblRoleFASelectedCountVal.text = this.getSelectedFeatureActionCount(this.view.segRoleFAList.data, "imgTopCheckbox", true);
      this.view.segRoleFAList.setVisibility(true);
      this.view.lblRoleFANoFeatures.setVisibility(false);
    } else{
      this.view.segRoleFAList.setData([]);
      this.view.lblRoleFANoFeatures.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText+
        "\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.segRoleFAList.setVisibility(false);
      this.view.lblRoleFANoFeatures.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /* 
   * reset ui for features card on search
   * @params: curr feature obj
   * @return: updated feature obj
   */
  setFeatureCardOnSearch : function(feature,filterRowData){
    var updateFeatureCard = "";
    var featureHeader = feature.sectionData;
    var featureRows = filterRowData ? filterRowData : feature.rowData;
    featureRows = this.showHideSegRowFlex(featureRows,false);
    featureHeader = this.getCollapsedSectionProperties(featureHeader);
    featureHeader.lblTotalActions.text = "of " + this.getTwoDigitNumber(featureRows.length);
    var selActions = this.getSelectedFeatureActionCount(featureRows, "imgCheckbox", false);
    featureHeader.lblCountActions.text = selActions;
    featureHeader.imgTopCheckbox.src = this.getHeaderCheckboxImage(featureRows,true,true);
    updateFeatureCard = [featureHeader,featureRows];
    return updateFeatureCard;
  },
  /* 
   * search for actions in add role features 
   * @params: actions arrary, searchText
   * @return: matched actions
   */
  searchActions : function(actions,searchText){
    var filteredActions = [];
    for(var j=0;j<actions.length;j++){
      if(actions[j].lblFeatureName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
        actions[j].flxContractEnrollFeaturesEditRow.isVisible = false;
        filteredActions.push(actions[j]);
      }
    }
    return filteredActions;
  },
  /* 
   *set collapsed section properties
   *2param: selected card section data
   */
  getCollapsedSectionProperties : function(sectionData){
    sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
    sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
    sectionData.flxActionsHeaderContainer.isVisible = false;
    sectionData.lblSectionLine.isVisible = false;
    sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    return sectionData;
  },
  /* 
  * get 2 digit string for number 
  * @param: count val
  * @return two digit val
  */
  getTwoDigitNumber : function(count){
    var updatedCount =0;
    count = parseInt(count,10);
    if(count > 9){
      updatedCount = count;
    } else{
      updatedCount = "0"+count;
    }
    return updatedCount+"";
  },
  /*
   * get the selected features/actions count
   * @param: actions segment data,checkboc img id,isSection(true/false)
   * @returns" selected actions count
   */
  getSelectedFeatureActionCount : function(segData,imgCheckboxId,isSection){
    var selectedCount = 0;
    for(var i=0;i < segData.length; i++){
      var data = (isSection === true) ? segData[i][0] : segData[i];
      if(data[imgCheckboxId].src === this.AdminConsoleCommonUtils.checkboxSelected ||
         data[imgCheckboxId].src === this.AdminConsoleCommonUtils.checkboxPartial)
        selectedCount = selectedCount +1;
    }
    selectedCount =  this.getTwoDigitNumber(selectedCount);
    return selectedCount;
  },
  
  approveRole : function(request){
    var userId=kony.mvc.MDAApplication.getSharedInstance().appContext.id;
    var payload = {
      "requestId":this.roleDetailsObj.roleDetails[0].ApprovalRequestId,
      "context":"APPROVAL",
      "recordId":this.roleDetailsObj.roleDetails[0].recordId,
      "roleName": this.roleDetailsObj.rolePermissions[0].Role_Name,
      "expAPIOperationName":(this.roleDetailsObj.roleDetails[0].action==="Create Role"?"RolesAndPermissionsObjService_role_createRole":"RolesAndPermissionsObjService_role_manageRole"),
      "status": request.requestStatus,
      "userId": userId,
      "reason": (request.reason ? request.reason : "")
    }
    this.view.flxApproveRejectRequestConfirmation.setVisibility(false);
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.approveRole([payload]);
  }
  
});

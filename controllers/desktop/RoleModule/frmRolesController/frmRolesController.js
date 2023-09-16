define({
  currentPage:1,
  recordsSize:20,
  gblsegRoles:0,
  roleId:"0",
  mouseYCoordinate:0,
  totalServicesCount: 0,
  roleDetails:{},
  permissions : [],
  editPermissions : "",
  backFunctionRolePermissions : [],
  AllPermissionsAfterRemoving:[],
  selectedArrowArray : [],
  isKeyCloakEnabled :false,
  isSingleEntity: false,
  orgPermissions:[],
  legalEntitiesPermissionDataForRole: [],
  legalEntitiesServiceDataForRole: [],
  legalEntitiesServicDefsDataForRole: [],
  legalEntityIdsForRole: [],
  legalEntityIdsForCreateRole:[],
  selLEList : [],
  selLEStatus :{},
  servicesMappingCreateRole: {},
  selectedLegalEntity: "",
  selectedOBJ : [],
  legalEntityIdsAllServiceDefsDataMap : {},
  legalEntityNamesAllServiceDefsDataMap : {},
  legalEntityIdsRoleServiceDefsDataMap : {},
  legalEntityNamesRoleServiceDefsDataMap: {},
  legalEntityListForEditFlow: {},
  selectedRoleDetails: {},
  multiEntityStatusFilter : {
    isActiveFilter : false,
    isInActiveFilter : false
  },
  serviceTypes :{"TYPE_ID_RETAIL":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking"),
                 "TYPE_ID_BUSINESS":kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking"),
                 "TYPE_ID_WEALTH":kony.i18n.getLocalizedString("i18n.frmGroupsController.WealthBanking")
                },
  entitySegData: [],
  name : [],
  rolesPreshow : function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.skipTop = 0;
    this.skipBottom=0;
    this.end =0;
    this.endTop=0;
    if (this.isSingleEntity === true) {
      this.view.statusFilterMenu.segEntityFilterDropdown.setVisibility(false);
      this.view.statusFilterMenu.flxChechboxOuter.lblSeparator.setVisibility(false);
      this.view.statusFilterMenu.flxActiveInactiveContainer.setVisibility(false);
      this.view.statusFilterMenu.segStatusFilterDropdown.setVisibility(true);
      this.view.lblRoleHeaderStatus.width = "45px";
      this.view.lblRoleHeaderStatus.text = "STATUS";
    } else {
      this.view.statusFilterMenu.segEntityFilterDropdown.setVisibility(true);
      this.view.statusFilterMenu.flxChechboxOuter.lblSeparator.setVisibility(true);
      this.view.statusFilterMenu.flxActiveInactiveContainer.setVisibility(true);
      this.view.statusFilterMenu.segStatusFilterDropdown.setVisibility(false);
      this.view.lblRoleHeaderStatus.width = "150px";
      this.view.lblRoleHeaderStatus.text = "LEGAL ENTITY & STATUS";
    };
    this.view.segPermission.setData([]);
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.addLegalEntityPopup.imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal;
    this.view.addLegalEntityPopup.flxCheckboxImg.onClick = this.toggleHeaderCheckbox.bind(this, "addLegalEntityPopup","segEntityList");
    this.name = ["Money Bank Argentina", "Money Bank Australia", "Money Bank Canada", "Money Bank Ghana", "Money Bank Kenya", "Money Bank United Kingdom", "Money Bank United States"];
    var roleModule=kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("RoleModule");
    this.view.addLegalEntityPopup.imgHeaderCheckbox.onTouchEnd = this.toggleHeaderCheckbox.bind(this,"addLegalEntityPopup", "segEntityList");
    this.view.copySystemPermissionsPopup.imgHeaderCheckbox.onTouchEnd = this.toggleHeaderCheckbox.bind(this,"copySystemPermissionsPopup", "SegCopyPermissions");
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.flxDownloadList.skin = "sknflxSuccessToast1F844D";
    this.view.mainHeader.lblDownloadList.skin = "sknFontIconSearchImgFFFFFF";
    this.view.popUp.btnPopUpCancel.setVisibility(false);
    this.view.popUp.btnPopUpDelete.text=kony.i18n.getLocalizedString("i18n.SecurityQuestions.OK");
    this.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmRolesController.AssignPermissions");
    this.view.popUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmRolesController.AtleastonePermission");
    this.view.popUp.btnPopUpDelete.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.btnPopUpDelete.focusSkin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.btnPopUpDelete.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.flxPopUpTopColor.skin="sknFlxee61919p100NoBorder";
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName1);
    this.selectedArrowArray=[this.view.fontIconImgSelected1,this.view.fontIconImgSelected3,this.view.lblIconCustomerAccessSelected,
                            this.view.lblIconSysPermisionsSelected];
    this.view.lblRoleDescriptionSize.setVisibility(false);
    this.view.lblRoleNameSize.setVisibility(false);
    this.view.lblNoResults.setVisibility(false);
    this.view.btnAddAll.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(false);
    this.view.flxRoleStatusFilter.setVisibility(false);
    this.setFlowActions();
    this.showRoles();
    //this.view.flxPermissions.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.ROLES");
    this.view.breadcrumbs.btnBackToMain.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
      var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxViewPermissions.height = screenHeight-145 +"px";
    this.setHeaderText();
    this.clearRoleDefaults();
    kony.adminConsole.utils.hideProgressBar(this.view);
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
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.view.searchBoxRoles.flxSearchCancel.setVisibility(false);
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
    //this.view.lbxPagination.selectedKey = this.currentPage;
  },
  willUpdateUI: function (roleModel) {
    this.updateLeftMenu(roleModel);
    if(roleModel.isKeyCloakEnabled){
      this.isKeyCloakEnabled=roleModel.isKeyCloakEnabled;
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
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateRoleWithoutApproval.successMessage"), this);
    }
    else if(roleModel.successMessage === "updateRolePendingApproval"){
       this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateRolePendingApproval.successMessage"),this);
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
    else if(roleModel.successMessage === "statusPendingApproval"){
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateRolePendingApproval.successMessage"),this);
    }
    else if (roleModel.context  === "viewRoles"||roleModel.context  === kony.i18n.getLocalizedString("i18n.frmRolesController.update")||roleModel.context  === "create") {
      this.clearRoleDefaults();
      this.isSingleEntity = kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY;
      this.legalEntityList = roleModel.legalEntityList;
      this.currUserLegalEntityList = roleModel.currUserLegalEntityList;
      if (this.isSingleEntity) {
        this.view.flxOption4.setVisibility(true);
        this.view.flxchangeStatus.setVisibility(false);
      } else {
        this.view.flxOption4.setVisibility(false);
        this.view.flxchangeStatus.setVisibility(true);
      }
      this.sortBy = this.getObjectSorter('role_Name');
      this.determineSortFontIcon(this.sortBy,"role_Name",this.view.fontIconSortName);
      this.resetSortFontIcons();
      this.view.mainHeader.flxDownloadList.info = undefined;
      this.loadPageData = function(){
        this.showRoles();
        this.view.flxSegmentPermmissions.setVisibility(true);
        this.view.flxRolesHeader.setVisibility(true);
        let rolesList = roleModel.fetchRoleList;
        rolesList.forEach(data => data.role_Name = data.legalEntitiesRoleInfo[0].role_Name);
        let rolesFilteredList = rolesList.filter(this.searchFilter);
        this.setRolesSegmentData(rolesFilteredList.sort(this.sortBy.sortData));
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
      this.setRolePermissionsMappingBasedOnLegalEntity(this.rolePermissions);
      this.view.segCustAccess.info = {"orgServiceList":[],"segData" :[],"editServiceList":[] };
      this.editPermissions = roleModel.fetchRoleUpdates.fetchRolePermissions;
      this.roleList = roleModel.fetchRoleList;
      this.setAllServiceDefinitionsMappingBasedOnLegalEntity(roleModel.fetchRoleUpdates.fetchAllServiceDef);
      this.setRoleServiceDefinitionsMappingBasedOnLegalEntity(roleModel.fetchRoleUpdates.fetchRoleServiceDef);
      this.view.segCustAccess.info.segData = this.parseAllServiceDefinitions(roleModel.fetchRoleUpdates.fetchAllServiceDef,roleModel.fetchRoleUpdates.fetchRoleServiceDef);
      this.view.segCustAccess.info.editServiceList = roleModel.fetchRoleUpdates.fetchRoleServiceDef;
      kony.adminConsole.utils.hideProgressBar(this.view);

      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
      this.view.tbxRoleNameValue.text = "";
      this.view.tbxRoleNameValue.enable = true;
      this.view.txtRoleDescription.text = "";
      if (roleModel.context === "createRole") {
        this.view.btnAdd.text = "+" + kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add");
        this.view.tbxRoleNameValue.enable = true;
        this.view.tbxRoleNameValue.skin = "skntbxLato35475f14px";
        this.view.addLegalEntityPopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmRoles.addLegalEntity");
        this.view.addLegalEntityPopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmRoles.SaveCAPS");
        this.view.lblAddServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.addServices");
      }
      if (roleModel.context === "updateRole") {
        for (var i = 0; i < roleModel.fetchRoleList.length; i++) {
          if (roleModel.fetchRoleList[i].role_id === this.roleId) {
            this.view.breadcrumbs.lblCurrentScreen.text = roleModel.fetchRoleList[i].legalEntitiesRoleInfo[0].role_Name.toUpperCase();
            this.roleName = roleModel.fetchRoleList[i].legalEntitiesRoleInfo[0].role_Name.toUpperCase();
            if (this.isSingleEntity) {
              this.view.switchStatus.selectedIndex = roleModel.fetchRoleList[i].legalEntitiesRoleInfo[0].Status_id 
                                                     === this.AdminConsoleCommonUtils.constantConfig.ACTIVE 
                                                     ? 0 : 1;
            }
            break;
          }
        }
        this.view.btnAdd.text = "+" + kony.i18n.getLocalizedString("i18n.common.modifiy");
        this.view.tbxRoleNameValue.enable = false;
        this.view.tbxRoleNameValue.skin = "sknTxtBoxf3f3f3Rad3pxbr1px";
        this.view.addLegalEntityPopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmRoles.modifyLegalEntity");
        this.view.addLegalEntityPopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.products.Update_CAPS");
        this.view.lblAddServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.editServices");
      }
      else {
        this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.CREATE");
        this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Add_Roles");
      }
      this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
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
      // for users tab
      this.view.flxViewTab2.setVisibility(false);
      this.roleDetailsObj = roleModel.fetchRoleDetails ;
      this.view.flxRolesBreadCrumb.setVisibility(true);
      this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.View_Roles");
      var segIndex = this.view.segPermissions.selectedRowIndex[1];
      var segData = this.view.segPermissions.data[segIndex];
      this.view.breadcrumbs.lblCurrentScreen.text=this.roleDetailsObj.roleDetails.roleName.toUpperCase();
      this.roleName = this.roleDetailsObj.roleDetails.roleName.toUpperCase();
      this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
      this.view.lblViewValue1.text = this.roleDetailsObj.roleDetails.roleName ;
      this.view.rtxViewDescription.text = this.roleDetailsObj.roleDetails.roleDesc ;
      if(this.isSingleEntity){
        this.view.fontIconViewValue2.skin = segData.fontIconStatusImg.skin;
        if(this.roleDetailsObj.roleDetails.roleStatus === this.AdminConsoleCommonUtils.constantConfig.ACTIVE){
          this.view.lblViewValue2.text =  kony.i18n.getLocalizedString("i18n.secureimage.Active") ;
          this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px" ;
        }else{
          this.view.lblViewValue2.text =  kony.i18n.getLocalizedString("i18n.secureimage.Inactive") ;
          this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px" ;
        }
        this.view.flxViewKeyValue2.setVisibility(true);
      } else {
        this.view.flxViewKeyValue2.setVisibility(false);
      }
      this.setLegalEntitiesData(this.roleDetailsObj.roleDetails.roleLegalEntitiesData);
      if(this.isSingleEntity) {
        this.showViewPermissionSegmentAndHeader();
      } else {
        this.currentView = "LegalEntityPermissions";
        this.showViewRoles();
      }
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else if(roleModel.context === "fetchCompositeActions"){
      this.setDataToCSRAssistSegment(roleModel.fetchCompositeActions.CompositeActions)
//     }else if(roleModel.context === "fileId"){
//       this.downloadCSV(roleModel.fileId)
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
  },

  setLegalEntitiesData: function (roleLegalEntitiesData) {
    let self = this;
    var legalEntitites = roleLegalEntitiesData;
    this.view.lblStatusIconLegalEntity1.setVisibility(false);
    this.view.lblNameLegalEntity1.setVisibility(false);
    this.view.lblStatusIconLegalEntity2.setVisibility(false);
    this.view.lblNameLegalEntity2.setVisibility(false);
    this.view.lblStatusIconLegalEntity3.setVisibility(false);
    this.view.lblNameLegalEntity3.setVisibility(false);
    if (legalEntitites.length > 0 && legalEntitites[0]) {
      this.view.lblNameLegalEntity1.setVisibility(true);
      this.view.lblNameLegalEntity1.text = this.getEntityNameForLegalEntityId(legalEntitites[0].legalEntityId);
      if(!this.isSingleEntity) {
        this.view.lblStatusIconLegalEntity1.skin = legalEntitites[0].Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive";
        this.view.lblStatusIconLegalEntity1.setVisibility(true);
      }
      if (legalEntitites.length > 1 && legalEntitites[1] && !this.isSingleEntity) {
        this.view.lblStatusIconLegalEntity2.setVisibility(true);
        this.view.lblNameLegalEntity2.setVisibility(true);
        this.view.lblStatusIconLegalEntity2.skin = legalEntitites[1].Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive";
        this.view.lblNameLegalEntity2.text = this.getEntityNameForLegalEntityId(legalEntitites[1].legalEntityId);
        if (legalEntitites.length > 2 && legalEntitites[2]) {
          this.view.lblStatusIconLegalEntity3.setVisibility(true);
          this.view.lblNameLegalEntity3.setVisibility(true);
          this.view.lblStatusIconLegalEntity3.skin = legalEntitites[2].Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive";
          this.view.lblNameLegalEntity3.text = this.getEntityNameForLegalEntityId(legalEntitites[2].legalEntityId);
        }
      }
    }
    if (legalEntitites.length > 3 && !this.isSingleEntity) {
      this.view.lblMoreLegalEntities.text = "+" + (legalEntitites.length - 3) + " " + kony.i18n.getLocalizedString("i18n.frmRoles.More");
      this.view.lblMoreLegalEntities.onHover = this.handleMoreLegalEntitiesVisibility.bind(this); 
      var widgetMap = {
        "lblStatusIcon": "lblStatusIcon",
        "lblName": "lblName",
      };
      this.view.segActiveLegalEntitites.widgetDataMap = widgetMap;
      this.view.segInActiveLegalEntitites.widgetDataMap = widgetMap;

      var segActiveLegalEntititiesData = [];
      var segInActiveLegalEntititiesData = [];
      let maxSizeText = 0;

      legalEntitites.slice(3).forEach(function(entity) {
        let legalEntityName = self.getEntityNameForLegalEntityId(entity.legalEntityId);
        var data = {
          "lblStatusIcon": {
              "skin": entity.Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive",
              "text": "",
              "isVisible": entity.Status_id === "SID_ACTIVE" ? true : false
          },
          "lblName": {
              "text": legalEntityName,
              "skin": "sknlblLatoBold35475f14px",
              "left": entity.Status_id === "SID_ACTIVE" ? "6dp" : "12dp",
          }
        };
        if(maxSizeText < legalEntityName.length){
          maxSizeText = legalEntityName.length;
        }
        entity.Status_id === "SID_ACTIVE" ? segActiveLegalEntititiesData.push(data) : segInActiveLegalEntititiesData.push(data);
      });
      var flexWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText) + 55;
      flexWidth = flexWidth > 200 ? flexWidth : 200;
      this.view.flxSegMoreLegalEntities.width = flexWidth + "dp";
      this.view.segActiveLegalEntitites.setData(segActiveLegalEntititiesData);
      if(segInActiveLegalEntititiesData.length > 0){
        this.view.segInActiveLegalEntitites.setData(segInActiveLegalEntititiesData);
        if(segActiveLegalEntititiesData.length === 0){
          this.view.flxSepratorLegalEntities.setVisibility(false);
        } else {
          this.view.flxSepratorLegalEntities.setVisibility(true);
        }
        this.view.flxInactiveLegalEntityHeading.setVisibility(true);
        this.view.segInActiveLegalEntitites.setVisibility(true);
      } else {
        this.view.flxSepratorLegalEntities.setVisibility(false);
        this.view.flxInactiveLegalEntityHeading.setVisibility(false);
        this.view.segInActiveLegalEntitites.setVisibility(false);
      }
      this.view.flxMoreLegalEntities.setVisibility(true);
    } else {
      this.view.flxMoreLegalEntities.setVisibility(false);
    }
  },

  handleMoreLegalEntitiesVisibility: function(widget, context) {
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      this.view.flxSegMoreLegalEntities.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.flxSegMoreLegalEntities.setVisibility(false);
    }
    this.view.forceLayout();
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
        },
        "legalEntityId":rolePermissions.companyLegalUnit || rolePermissions.legalEntityId || ""
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
      let legalEntitiesRoleInfo = Role.legalEntitiesRoleInfo;
      for(var index=0; index < legalEntitiesRoleInfo.length; index++){
        if(legalEntitiesRoleInfo[index].role_Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
          return true;
        }
      }
      return false;
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
    this.view.mainHeader.flxDropdownList.setVisibility(false);
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
    this.view.mainHeader.btnAddNewOption.text=kony.i18n.getLocalizedString("i18n.frmRoles.AddNewRole_UC");
  },
  showMainHeaderButtons : function(){
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.mainHeader.flxDropdownList.setVisibility(true);
  },
  showRoles: function(){
    this.hideAll();
    this.setScrollHeight(2);
    this.selLEList = [];
    this.view.lblLegalEntityValue.text = kony.i18n.getLocalizedString("i18n.frmRoles.SelectLegalEntity");
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
    // this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddUsers.setVisibility(false);
    this.view.flxAddPermissionDetails.setVisibility(true);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.DETAILS");


  },
  navigateToAddNewRoleForm : function(){
    this.addNewRolePath=true;
    var scope = this;
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.togglePermissionSuboptions(false);
    if(this.isSingleEntity){
      this.view.btnAdd.isVisible = false;
      this.view.lblLegalEntityValue.text = this.legalEntityList[0].companyName;
      this.view.lblLegalEntityValue.skin ="sknLbl485C75LatoRegular13Px";
      this.view.flxLegalEntityValue.skin ="sknFlxbgF3F3F3bdrd7d9e0";
      this.view.flxRoleStatus.isVisible = true;
    }
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.CREATE");
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Add_Roles");
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.btnSave.text=kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");
    this.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");
    this.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");

    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray,this.view.fontIconImgSelected1);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(true);
    // this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddSeperator2.setVisibility(false);
    this.view.flxAddUsers.setVisibility(false);
    this.view.tbxRoleNameValue.text="";
    this.view.tbxRoleNameValue.skin="skntbxLato35475f14px";
    this.view.flxNoRoleNameError.setVisibility(false);
    this.view.flxNoRoleDescriptionError.isVisible = false;
    this.view.txtRoleDescription.skin = "skntxtAreaLato35475f14Px"; 
    this.view.switchStatus.selectedIndex=0;	
    this.view.txtRoleDescription.text=""; 
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxAddServices.setVisibility(false);
    this.view.flxAddPermissions.setVisibility(true);
    this.view.flxValidity.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.segCustAccess.setData([]);
    this.view.segServices.setData([]);
    this.view.segPermission.setData([]);
    this.rolePermissions = [];
    this.legalEntityListForEditFlow = {};
    this.selectedRoleDetails = {};
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmRolesController.DETAILS");
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.view.btnOptionDetails.onClick = function() {
      scope.view.flxAddPermssions.setVisibility(false);
      scope.showNewRoleTab();
      if (scope.isSingleEntity) {
        scope.view.lblLegalEntityValue.skin = "sknLbl485C75LatoRegular13Px";
        scope.view.flxLegalEntityValue.skin = "sknFlxbgF3F3F3bdrd7d9e0";
        scope.view.btnAdd.setVisibility(false);
        scope.view.flxRoleStatus.setVisibility(true);
      } else {
        scope.view.flxLegalEntityValue.skin = "CopysknFlxffffffbordere0fa70ae09eb4f45";
        scope.view.btnAdd.setVisibility(true);
        scope.view.flxRoleStatus.setVisibility(false);
      }
      if(!scope.addNewRolePath){
        scope.view.tbxRoleNameValue.enable = false;
        scope.view.tbxRoleNameValue.skin = "sknTxtBoxf3f3f3Rad3pxbr1px";
      } else {
        scope.view.tbxRoleNameValue.enable = true;
        scope.view.tbxRoleNameValue.skin = "skntbxLato35475f14px";
      }
    };
  },
  
  changeStatus: function() {
    var scope = this;
    let selSegRowIndex = this.view.segPermissions.selectedRowIndex[1];
    let selRoleSegRowData = this.view.segPermissions.data[selSegRowIndex];
    this.view.StatusOfAdminTestingPopUp.lblPopUpMainMessage.text = "Status for "+ selRoleSegRowData.lblRoleName;
    var data = [];
    var dataMap = {
      "flxEntity": "flxEntity",
      "flxDependencyDetails": "flxDependencyDetails",
      "flxCheckbox": "flxCheckbox",
      "imgCheckbox": "imgCheckbox",
      "lblEntityName": "lblEntityName",
      "statusSwitch": "statusSwitch",
      "lblSeperatorLine": "lblSeperatorLine",
    }
    this.view.StatusOfAdminTestingPopUp.segAdminTestingList.widgetDataMap = dataMap;
    this.view.StatusOfAdminTestingPopUp.segAdminTestingList.setData([]);
    this.view.flxStatusAdminTestingPopup.setVisibility(true);
    let legalEntitiesRoleInfoData = this.selectedRoleLegalEntitiesData;
    if(legalEntitiesRoleInfoData && legalEntitiesRoleInfoData.length > 0) {
      data = legalEntitiesRoleInfoData.map(function (legalEntityRoleInfoData) {
        let legalEntityId = legalEntityRoleInfoData.legalEntityId;
        let isLegalEntityAccessRestricted = scope.isLegalEntityAccessRestricted(legalEntityId);
        return {
          "flxCheckbox": {
            "onClick": scope.toggleCheckbox.bind(scope, "addLegalEntityPopup", "segEntityList")
          },
          "imgCheckbox": {
            "src": "checkboxselected.png"
          },
          "lblEntityName": {
            "text": scope.getEntityNameForLegalEntityId(legalEntityId) +
              (isLegalEntityAccessRestricted
                ? "  (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")"
                : ""),
            "tooltip": scope.getEntityNameForLegalEntityId(legalEntityId) +
              (isLegalEntityAccessRestricted
                ? "  (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")"
                : ""),
            "legalEntityId": legalEntityRoleInfoData.legalEntityId,
            "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknLbl485C75LatoRegular13Px"
          },
          "statusSwitch": {
            "selectedIndex": legalEntityRoleInfoData.Status === "Active" ? 0 : 1,
            "isVisible": isLegalEntityAccessRestricted ? false : true,
            "onSlide": function () {
              scope.toggleSwitchChangeStatus();
            }
          },
          "lblSeperatorLine": {}
        };
      });
    }
    this.view.StatusOfAdminTestingPopUp.segAdminTestingList.setData(data);
    this.view.forceLayout();
  },
  onRoleUpdateChangeStatus: function() {
    var self = this;
    let user_id = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.view.flxStatusAdminTestingPopup.setVisibility(false);
    let roleLegalEntitiesStatusData = this.view.StatusOfAdminTestingPopUp.segAdminTestingList.data;
    let legalEntitiesRoleInfo = [];
    if (roleLegalEntitiesStatusData && roleLegalEntitiesStatusData.length > 0) {
      roleLegalEntitiesStatusData.forEach(function (data) {
        let isLegalEntityAccessRestricted = self.isLegalEntityAccessRestricted(data.lblEntityName.legalEntityId);
        if (!isLegalEntityAccessRestricted) {
          legalEntitiesRoleInfo.push({
            "legalEntityId": data.lblEntityName.legalEntityId,
            "Role_Details": {
              "id": self.roleId,
              "Status_id": data.statusSwitch.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE"
            }
          });
        }
      });
    }
    if (legalEntitiesRoleInfo && legalEntitiesRoleInfo.length > 0) {
      kony.adminConsole.utils.showProgressBar(this.view);
      this.presenter.onRoleUpdateChangeStatus(this.roleId, user_id, legalEntitiesRoleInfo);
    }
  },
  toggleSwitchChangeStatus: function () {
    var selRow = this.view.StatusOfAdminTestingPopUp.segAdminTestingList.selectedRowItems[0];
    var index = (selRow.statusSwitch.selectedIndex === 1) ? 1 : 0;
    this.view.StatusOfAdminTestingPopUp.segAdminTestingList.selectedRowItems[0].statusSwitch.selectedIndex = index;
    var data = this.view.StatusOfAdminTestingPopUp.segAdminTestingList.data;
    this.view.StatusOfAdminTestingPopUp.segAdminTestingList.setData(data);
  },
  setEntityData: function (response) {
    var scope = this;
    scope.view.addLegalEntityPopup.flxCheckboxImg.isVisible = true;
    if (response === undefined) {
      this.view.flxAddLegalEntityPopup.setVisibility(true);
      var dataMap = {
        "flxEntity": "flxEntity",
        "flxDependencyDetails": "flxDependencyDetails",
        "flxCheckbox": "flxCheckbox",
        "imgCheckbox": "imgCheckbox",
        "lblEntityName": "lblEntityName",
        "statusSwitch": "statusSwitch",
        "lblSeperatorLine": "lblSeperatorLine",
        "legalEntityId": "legalEntityId"
      };
      if (!(this.view.lblLegalEntityValue.text.includes("Selected"))) {
        scope.view.addLegalEntityPopup.imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
        this.view.addLegalEntityPopup.segEntityList.widgetDataMap = dataMap;
        var data = [];
        var filteredLE = this.getLEListForFormAction("frmRoles","CREATE");
        data = filteredLE.map(function (response) {
          return {
            "flxCheckbox": {
              "isVisible": true,
              "onClick": 
                scope.toggleCheckbox.bind(scope, "addLegalEntityPopup","segEntityList")
              
            },
            "imgCheckbox": {
              "src": "checkboxselected.png"
            },
            "lblEntityName": {
              "text": response.companyName,
              "tooltip": response.companyName,
            },
            "statusSwitch": {
              "selectedIndex": 0,
              "enable": true,
              "onSlide": function () {
                scope.toggleSwitch()
              }
            },
            "lblSeperatorLine": {},
            "legalEntityId": response.id
          };
        });
        this.view.addLegalEntityPopup.segEntityList.setData(data);
        this.view.addLegalEntityPopup.segEntityList.info = {
          "data" : data
        };
        this.entitySegData = data;
      } else if (this.addNewRolePath === false) {
        let data = [];
        this.view.addLegalEntityPopup.flxCheckboxImg.isVisible = false;
        for (var legalEntity in this.legalEntityListForEditFlow) {
          var rowdata = {};
          let legalEntityId = this.legalEntityListForEditFlow[legalEntity].legalEntityId ? this.legalEntityListForEditFlow[legalEntity].legalEntityId : "";
          let isLegalEntityAccessRestricted = this.isLegalEntityAccessRestricted(legalEntityId);
          if (this.legalEntityListForEditFlow[legalEntity].isExisting) {
            rowdata.flxCheckbox = {
              "isVisible": false
            };
          } if (this.legalEntityListForEditFlow[legalEntity].isCheckBoxSelected === false && this.legalEntityListForEditFlow[legalEntity].isExisting !== true) {
            rowdata.imgCheckbox = {
              "src": "checkboxnormal.png"
            };
            rowdata.flxCheckbox = {
              "isVisible": true,
                "onClick": scope.toggleCheckbox.bind(scope, "addLegalEntityPopup","segEntityList")
            };
          } else if (this.legalEntityListForEditFlow[legalEntity].isCheckBoxSelected === true && this.legalEntityListForEditFlow[legalEntity].isExisting !== true) {
            rowdata.imgCheckbox = {
              "src": "checkboxselected.png"
            };
            rowdata.flxCheckbox = {
              "isVisible": true,
              "onClick": scope.toggleCheckbox.bind(scope, "addLegalEntityPopup","segEntityList")
            };
          }
          rowdata.statusSwitch = {
            "isVisible": isLegalEntityAccessRestricted ? !isLegalEntityAccessRestricted : true,
            "selectedIndex": !isLegalEntityAccessRestricted ? (this.legalEntityListForEditFlow[legalEntity].status && this.legalEntityListForEditFlow[legalEntity].status === "SID_ACTIVE" ? 0 : 1) : null,
            "enable": !isLegalEntityAccessRestricted ? (this.legalEntityListForEditFlow[legalEntity].status && this.legalEntityListForEditFlow[legalEntity].status === "SID_ACTIVE" ? true : false) : false,
            "onSlide": function () {
              if (!isLegalEntityAccessRestricted)
                scope.toggleSwitch()
            }
          };
          rowdata.lblEntityName = {
            "text": isLegalEntityAccessRestricted ? this.legalEntityListForEditFlow[legalEntity].companyName + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" : this.legalEntityListForEditFlow[legalEntity].companyName,
            "tooltip": isLegalEntityAccessRestricted ? this.legalEntityListForEditFlow[legalEntity].companyName + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" : this.legalEntityListForEditFlow[legalEntity].companyName,
            "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "slLabel29327645px",
          };
          rowdata.legalEntityId = this.legalEntityListForEditFlow[legalEntity].legalEntityId;
          rowdata.lblSeperatorLine = {};
          data.push(rowdata);
        }
        this.view.addLegalEntityPopup.segEntityList.widgetDataMap = dataMap;
        this.view.addLegalEntityPopup.segEntityList.setData(data);
        this.view.addLegalEntityPopup.segEntityList.info = {
          "data" : data
        };
      }
    } else {
      if (response.length === 0) {
        this.view.addLegalEntityPopup.flxNoResult.isVisible = true;
        this.view.addLegalEntityPopup.flxNoResult.top = "20dp";
        var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.addLegalEntityPopup.searchBox.tbxSearchBox.text);
        this.view.addLegalEntityPopup.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\"" + searchText + "\"" + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
        this.view.addLegalEntityPopup.flxLegalEntityStatus.isVisible = false;
      } else {
        var scope = this;
        var segData = [];
        this.view.addLegalEntityPopup.flxNoResult.isVisible = false;
        this.view.addLegalEntityPopup.flxLegalEntityStatus.isVisible = true;
        if (this.addNewRolePath === false) {
          this.view.addLegalEntityPopup.flxCheckboxImg.isVisible = false;
        }
        segData = response.map(function (res) {
          return {
            "flxCheckbox": {
              "onClick": scope.toggleCheckbox.bind(scope, "addLegalEntityPopup","segEntityList") 
            },
            "imgCheckbox": res.imgCheckbox && res.imgCheckbox.src ? {
              "src": res.imgCheckbox.src
            } : {},
            "lblEntityName": {
              "text": res.lblEntityName.text,
              "tooltip": res.lblEntityName.text,
            },
            "statusSwitch": {
              "selectedIndex": res.statusSwitch.selectedIndex,
              "onSlide": function () {
                scope.toggleSwitch()
              }
            },
            "lblSeperatorLine": {},
            "legalEntityId": scope.getEntityIdForLegalEntityName(res.lblEntityName.text)
          };
        });
        this.view.addLegalEntityPopup.segEntityList.setData(segData);
        this.view.addLegalEntityPopup.segEntityList.info = {
          "data" : segData
        };
      }
    }
    this.addModifyLegalEntityPopupSegData = JSON.parse(JSON.stringify(this.view.addLegalEntityPopup.segEntityList.data));
    this.view.forceLayout();
  },
  toggleHeaderCheckbox: function(component, segment) {
    var data = this.view[component][segment].data;
    let segInfoData = this.view[component][segment].info.data;
    if (this.view[component].imgHeaderCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected) {
      this.view[component].imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal;
      data.forEach(x => {
        x.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal
        x.statusSwitch.selectedIndex = 1;
        x.statusSwitch.enable = false;
      });
      segInfoData.forEach(x => {
        x.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal;
        x.statusSwitch.selectedIndex = 1;
        x.statusSwitch.enable = false;
      });
      this.addLegalEntityPopUpBtnSaveEnableDisable(false);
    } else {
      this.view[component].imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
      data.forEach(x => {
        x.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
        x.statusSwitch.enable = true;
      });
      segInfoData.forEach(x => {
        x.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
        x.statusSwitch.enable = true;
      });
      this.addLegalEntityPopUpBtnSaveEnableDisable(true);
    }
    this.view[component][segment].setData(data);
  },
  toggleCheckbox: function (component, segment) {
    var selRow = this.view[component][segment].selectedRowItems[0];
    let selRowLegalEntityId = selRow.legalEntityId;
    let img = "";
    let statusSwitch = "";
    let isEnabled = false;
    if (selRow.imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected) {
      img = this.AdminConsoleCommonUtils.checkboxnormal;
      statusSwitch = 1;
      isEnabled = false;
    } else {
      img = this.AdminConsoleCommonUtils.checkboxSelected;
      statusSwitch = selRow.statusSwitch.selectedIndex;
      isEnabled = true;
    }
    this.view[component][segment].selectedRowItems[0].imgCheckbox.src = img;
    this.view[component][segment].selectedRowItems[0].statusSwitch.selectedIndex = statusSwitch;
    this.view[component][segment].selectedRowItems[0].statusSwitch.enable = isEnabled;
    var data = this.view[component][segment].data;
    this.view[component][segment].info.data.forEach(record => {
      if(record.legalEntityId === selRowLegalEntityId){
        record.imgCheckbox.src = img;
        record.statusSwitch.selectedIndex = statusSwitch;
        record.statusSwitch.enable = isEnabled;
      }
    });
    let segInfoData = this.view[component][segment].info.data;
    if (segInfoData.every(a => {
      return (a.flxCheckbox.isVisible && a.imgCheckbox.src === "checkboxselected.png")
    })) {
      this.view[component].imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
      this.addLegalEntityPopUpBtnSaveEnableDisable(true);
    } else if (segInfoData.some(a => {
      return (a.flxCheckbox.isVisible && a.imgCheckbox.src === "checkboxselected.png")
    })) {
      this.view[component].imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxPartial;
      this.addLegalEntityPopUpBtnSaveEnableDisable(true);
    } else if (segInfoData.every(a => {
      return (a.flxCheckbox.isVisible && a.imgCheckbox.src === "checkboxnormal.png")
    })) {
      this.view[component].imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal;
      this.addLegalEntityPopUpBtnSaveEnableDisable(false);
    }
    this.view[component][segment].setData(data);
  },
  toggleSwitch: function () {
    var selRow = this.view.addLegalEntityPopup.segEntityList.selectedRowItems[0];
    if (selRow.statusSwitch.selectedIndex === 0) {
      var index = 0;
    } else {
      var index = 1;
    }
    this.view.addLegalEntityPopup.segEntityList.selectedRowItems[0].statusSwitch.selectedIndex = index;
    var data = this.view.addLegalEntityPopup.segEntityList.data;
    this.view.addLegalEntityPopup.segEntityList.setData(data);
    this.view.addLegalEntityPopup.segEntityList.info = {
      "data" : data
    };
  },
  addLegalEntityPopUpBtnSaveEnableDisable: function (isEnabled) {
    if (this.addNewRolePath) {
      this.view.addLegalEntityPopup.btnPopUpDelete.enable = isEnabled;
      if (isEnabled) {
        this.view.addLegalEntityPopup.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      } else {
        this.view.addLegalEntityPopup.btnPopUpDelete.skin = "btnSkinGrey";
      }
    } else {
      this.view.addLegalEntityPopup.btnPopUpDelete.enable = true;
      this.view.addLegalEntityPopup.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    }
  },
  setLegalEntity: function () {
    var data = this.view.addLegalEntityPopup.segEntityList.data;
    var count = 0;
    if (this.addNewRolePath) {
      var selectedEntitiesData = this.selLEList;
      var selectedEntitiesStatus = this.selLEStatus;
      for (var i = 0; i < data.length; i++) {
        if (data[i].imgCheckbox && data[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected) {
          var roleLegalEntityDetails = {
            "legalEntityId": data[i].legalEntityId,
            "Role_Details": {
              "Name": "",
              "Description": "",
              "Status_id": data[i].statusSwitch.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE"
            },
            "permissions": [],
            "users": [],
            "servicedefinitions": []
          };
          this.legalEntityIdsForCreateRole.push(roleLegalEntityDetails);
          count++;
          if (!selectedEntitiesData.contains(data[i].legalEntityId)) selectedEntitiesData.push(data[i].legalEntityId);
          selectedEntitiesStatus[this.getEntityNameForLegalEntityId(data[i].legalEntityId)] = data[i].statusSwitch;
        }
      }
      if(count > 0){
        this.view.flxLegalEntityError.setVisibility(false);
        this.view.flxLegalEntityValue.skin = "skntbxLato35475f14px";
      }
      this.view.flxAddLegalEntityPopup.setVisibility(false);
      this.view.lblLegalEntityValue.text = count + " Selected";
      this.view.lblLegalEntityValue.skin = "sknlblLato696c7313px";
    } else {
      for (var i = 0; i < data.length; i++) {
        let entity = this.getEntityNameForLegalEntityId(data[i].legalEntityId);
        if (data[i].imgCheckbox && data[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected) {
          this.legalEntityListForEditFlow[entity].isCheckBoxSelected = true;
        } else if (data[i].imgCheckbox && data[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) {
          this.legalEntityListForEditFlow[entity].isCheckBoxSelected = false;
          delete this.selectedRoleDetails[entity];
        } if (data[i].statusSwitch && data[i].statusSwitch.isVisible) {
          this.legalEntityListForEditFlow[entity].status = data[i].statusSwitch.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE";
        }
      }
      for (var legalEntity in this.legalEntityListForEditFlow) {
        if (this.legalEntityListForEditFlow[legalEntity].isCheckBoxSelected || this.legalEntityListForEditFlow[legalEntity].isExisting)
          count++;
      }
      this.view.flxAddLegalEntityPopup.setVisibility(false);
      this.view.lblLegalEntityValue.text = count + " Selected";
      this.view.lblLegalEntityValue.skin = "sknlblLato696c7313px";
      this.setSelectedRoleDataForEditFlow();
    }
  },
  setSelectedRoleDataForEditFlow: function () {
    var scope = this;
    if (!scope.addNewRolePath) {
      if (!this.isSingleEntity) {
        var data = scope.view.addLegalEntityPopup.segEntityList.data;
        for (var index = 0; index < data.length; index++) {
          let entityName = this.getEntityNameForLegalEntityId(data[index].legalEntityId);
          let isLegalEntityAccessRestricted = this.isLegalEntityAccessRestricted(data[index].legalEntityId);
          var roleLegalEntityDetails = {};
          var orginalList = [];
          orginalList = scope.legalEntityIdsRoleServiceDefsDataMap[data[index].legalEntityId] || [];
          var orginalListID = [];
          var LEPermissionsCount = {};
          for (var i = 0; i < orginalList.length; i++) {
            orginalListID.push(orginalList[i].ServiceDefinition_id);
          }
          scope.roleList.forEach(function (roleData) {
            if (roleData.role_id === scope.roleId && roleData.legalEntitiesRoleInfo) {
              roleData.legalEntitiesRoleInfo.forEach(function (legalEntityRoleInfo) {
                let legalEntityName = scope.getEntityNameForLegalEntityId(legalEntityRoleInfo.legalEntityId);
                let permission_Count = legalEntityRoleInfo.permission_Count;
                LEPermissionsCount[legalEntityName] = permission_Count;
              })
            }
          });

          if (data[index].imgCheckbox && data[index].imgCheckbox.src === scope.AdminConsoleCommonUtils.checkboxSelected
            || (data[index].flxCheckbox && data[index].flxCheckbox.isVisible === false) && kony.sdk.isNullOrUndefined(data[index].imgCheckbox) || isLegalEntityAccessRestricted) {
            roleLegalEntityDetails = {
              "legalEntityId": data[index].legalEntityId,
              "roleName": scope.roleDetails.lblRoleName,
              "roleDesc": scope.roleDetails.lblDescription,
              "status_id": !kony.sdk.isNullOrUndefined(data[index].statusSwitch.selectedIndex) ? (data[index].statusSwitch.selectedIndex === 0 ? scope.AdminConsoleCommonUtils.constantConfig.ACTIVE : scope.AdminConsoleCommonUtils.constantConfig.INACTIVE) : null,
              "orgServiceDefinitions": scope.selectedRoleDetails[entityName] && scope.selectedRoleDetails[entityName].orgServiceDefinitions 
                                       ? scope.selectedRoleDetails[entityName].orgServiceDefinitions 
                                       : orginalListID,
              "addedServiceDefinitions": scope.selectedRoleDetails[entityName] && scope.selectedRoleDetails[entityName].addedServiceDefinitions 
                                         ? scope.selectedRoleDetails[entityName].addedServiceDefinitions : [],
              "removedServiceDefinitions": scope.selectedRoleDetails[entityName] && scope.selectedRoleDetails[entityName].removedServiceDefinitions
                                           ? scope.selectedRoleDetails[entityName].removedServiceDefinitions : [],
              "isLegalEntityAccessRestricted": isLegalEntityAccessRestricted,
              "permission_Count": LEPermissionsCount[entityName] ? LEPermissionsCount[entityName] : "0"
            };
            scope.selectedRoleDetails[entityName] = roleLegalEntityDetails;
          }
        }
      } else {
        let legalEntityId = scope.currUserLegalEntityList[0].id;
        let legalEntityName = scope.getEntityNameForLegalEntityId(legalEntityId);
        let orginalList = scope.legalEntityIdsRoleServiceDefsDataMap[legalEntityId] || [];
        let orginalListID = [];
        for (var i = 0; i < orginalList.length; i++) {
          orginalListID.push(orginalList[i].ServiceDefinition_id);
        }
        let roleLegalEntityDetails = {
          "legalEntityId": legalEntityId,
          "roleName": scope.roleDetails.lblRoleName,
          "roleDesc": scope.roleDetails.lblDescription,
          "status_id": scope.view.switchStatus.selectedIndex === 0 ? scope.AdminConsoleCommonUtils.constantConfig.ACTIVE : scope.AdminConsoleCommonUtils.constantConfig.INACTIVE,
          "orgServiceDefinitions": orginalListID
        };
        scope.selectedRoleDetails[legalEntityName] = roleLegalEntityDetails;
      }
    }
  },
  setCopyPermissionsData: function (response) {
    this.view.flxCopySystemPermissionsPopup.setVisibility(true);
    var entity = this.getEntityNameForLegalEntityId(this.view.segPermission.selectedItems[0].legalEntityId);
    this.view.copySystemPermissionsPopup.lblDetailsHeading.text = "Copy System Permissions of " + entity + " to Other Entities";
    var scope = this;
    var dataMap = {
      "flxEntityPermissionsList": "flxEntityPermissionsList",
      "flxDependencyDetails": "flxDependencyDetails",
      "flxCheckbox": "flxCheckbox",
      "imgCheckbox": "imgCheckbox",
      "lblEntityName": "lblEntityName",
      "lblSeperatorLine": "lblSeperatorLine",
      "legalEntityId": "legalEntityId"
    }
    this.view.copySystemPermissionsPopup.SegCopyPermissions.widgetDataMap = dataMap;
    var data = [];
    if (this.addNewRolePath) {
      response = [...this.selLEList];
      for (let ent of response) {
        if (this.getEntityNameForLegalEntityId(ent) === entity) {
          response.remove(ent)
        }
      }
    } else {
      response = [...Object.keys(this.selectedRoleDetails)];
      for (let item of response) {
        if (!this.isLegalEntityAccessRestricted(this.selectedRoleDetails[item].legalEntityId)) {
          if (this.getEntityNameForLegalEntityId(this.selectedRoleDetails[item].legalEntityId) === entity) {
            response.remove(item)
          }
        }
      }
    }
    data = response.map(function (response) {
      return {
        "flxCheckbox": {
          "isVisible": scope.addNewRolePath ? true : (!scope.isLegalEntityAccessRestricted(scope.selectedRoleDetails[response].legalEntityId) ? true : false),
          "onClick": scope.toggleCheckbox.bind(this, "copySystemPermissionsPopup", "SegCopyPermissions")
        },
        "imgCheckbox": {
          "isVisible": scope.addNewRolePath ? true : (!scope.isLegalEntityAccessRestricted(scope.selectedRoleDetails[response].legalEntityId) ? true : false),
          "src": "checkboxselected.png"
        },
        "lblEntityName": {
          "text": scope.addNewRolePath? scope.getEntityNameForLegalEntityId(response): scope.isLegalEntityAccessRestricted(scope.selectedRoleDetails[response].legalEntityId)? response  + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" : response ,
          "tooltip": scope.addNewRolePath ? scope.getEntityNameForLegalEntityId(response) : response,
          "skin": !scope.addNewRolePath ? (!scope.isLegalEntityAccessRestricted(scope.selectedRoleDetails[response].legalEntityId) ? "sknlblLatoBold35475f14px" : "sknLblLato485c7513pxOp60") : "sknlblLatoBold35475f14px"
        },
        "lblSeperatorLine": {
          "isVisible": true,
          "text": "-"
        },
        "legalEntityId": scope.addNewRolePath ? response : scope.getEntityIdForLegalEntityName(response)
      }
    });
    this.view.copySystemPermissionsPopup.SegCopyPermissions.setData(data);
    this.view.copySystemPermissionsPopup.SegCopyPermissions.info = {
      "data": data
    };
    this.view.copySystemPermissionsPopup.imgHeaderCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
    this.view.forceLayout();
  },
  copyPermissions: function (entity) {
    var data = "";
    var data = this.view.copySystemPermissionsPopup.SegCopyPermissions.data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected && data[i].lblEntityName.text !== entity) {
        this.rolePermissions[data[i].lblEntityName.text] = [...this.rolePermissions[entity]];
      }
    }
  },
  loadEntityData: function () {
    var data = this.entitySegData;
    var scope = this;
    this.setEntityData(data.filter(EntityFilter = function (data) {
      var searchText = scope.AdminConsoleCommonUtils.getEncodedTextInput(scope.view.addLegalEntityPopup.searchBox.tbxSearchBox.text);
      if (typeof searchText === 'string' && searchText.length > 0) {
        return data.lblEntityName.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      } else {
        return true;
      }
    }).sort(this.sortBy.sortData));
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
    // this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddUsers.setVisibility(false);
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
    let legalEntityIdsList = this.getLegalEntityIdsListFromLEList(this.currUserLegalEntityList);
    let legalEntityId = this.getCSVLegalEntityIds(legalEntityIdsList);
    let params = {
      "legalEntityId": legalEntityId
    }
    this.presenter.fetchAllActiveUsersAndAllActivePermissions(this, params);
  },
  getRoleData: function(role_id){
    let legalEntityIdsList = this.legalEntityIdsForRole;
    let legalEntityId = this.getCSVLegalEntityIds(legalEntityIdsList);
    let params = {
      "role_id": role_id,
      "legalEntityId": legalEntityId
    };
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchUpdateRoleData(this,params);
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
  fillRoleData: function () {
    var scopeObj = this;
    var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
    var selectedData = scopeObj.view.segPermissions.data[segIndex];
    this.view.lblAddOptionsHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES");
    scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Edit_Roles");
    this.view.breadcrumbs.lblCurrentScreen.text = selectedData.lblRoleName.toUpperCase();
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.tbxRoleNameValue.text = this.roleDetails.lblRoleName;
    if(!this.addNewRolePath){
      this.view.tbxRoleNameValue.enable = false;
      this.view.tbxRoleNameValue.skin = "sknTxtBoxf3f3f3Rad3pxbr1px";
    } else {
      this.view.tbxRoleNameValue.enable = true;
      this.view.tbxRoleNameValue.skin = "skntbxLato35475f14px";
    }
    this.view.txtRoleDescription.text = this.roleDetails.lblDescription;
    this.view.lblLegalEntityValue.skin = "sknLbl485C75LatoRegular13Px";
    if (!this.isSingleEntity) {
      this.view.lblLegalEntityValue.text = this.roleDetails.legalEntityIds.length > 0 ? this.roleDetails.legalEntityIds.length + " Selected" : kony.i18n.getLocalizedString("i18n.frmRoles.SelectLegalEntity");
      this.view.flxLegalEntityValue.skin = "CopysknFlxffffffbordere0fa70ae09eb4f45";
      this.view.btnAdd.setVisibility(true);
      this.view.flxRoleStatus.setVisibility(false);
    } else {
      this.view.lblLegalEntityValue.text = this.getEntityNameForLegalEntityId(this.roleDetails.legalEntityIds);
      this.view.flxLegalEntityValue.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      this.view.btnAdd.setVisibility(false);
      this.view.flxRoleStatus.setVisibility(true);
    }
    this.view.btnSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxAddServices.setVisibility(false);
    this.view.flxAddPermssions.setVisibility(false);
    this.view.flxValidity.setVisibility(false);
    this.setLegalEntitiesForEditFlow(selectedData);
    this.view.forceLayout();
  },
  setLegalEntitiesForEditFlow: function (selectedData) {
    var scope = this;
    var count = 0;
    if (this.addNewRolePath === false && !this.isSingleEntity) {
      if (Object.keys(scope.legalEntityListForEditFlow).length === 0) {
        let legalEntitiesStatusData = selectedData.legalEntitiesStatusData;
        let legalEntityIds = selectedData.legalEntityIds;
        let legalEntityList = this.currUserLegalEntityList;
        legalEntityList.forEach(function (response) {
          let legalEntityInfo = {};
          legalEntityInfo.legalEntityId = response.id;
          legalEntityInfo.companyName = response.companyName;
          legalEntityInfo.isCheckBoxSelected = false;
          legalEntityInfo.isExisting = false;
          legalEntityInfo.status = scope.AdminConsoleCommonUtils.constantConfig.INACTIVE;
          scope.legalEntityListForEditFlow[response.companyName] = legalEntityInfo;
        });
        legalEntityIds.forEach(function (legalEntityId) {
          let legalEntityInfo = {};
          legalEntityInfo.legalEntityId = legalEntityId;
          legalEntityInfo.companyName = scope.getEntityNameForLegalEntityId(legalEntityId);
          legalEntityInfo.isExisting = true;
          if (legalEntitiesStatusData[scope.getEntityNameForLegalEntityId(legalEntityId)]["status_id"])
            legalEntityInfo.status = legalEntitiesStatusData[scope.getEntityNameForLegalEntityId(legalEntityId)]["status_id"];
          scope.legalEntityListForEditFlow[scope.getEntityNameForLegalEntityId(legalEntityId)] = legalEntityInfo;
        });
      }
      for (var legalEntity in scope.legalEntityListForEditFlow) {
        if (scope.legalEntityListForEditFlow[legalEntity].isCheckBoxSelected || scope.legalEntityListForEditFlow[legalEntity].isExisting)
          count++;
      }
      this.view.lblLegalEntityValue.text = count + " Selected";
      this.setEntityData();
      this.view.flxAddLegalEntityPopup.setVisibility(false);
    }
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
    this.view.flxAddServices.setVisibility(false);
    this.view.flxAddPermssions.setVisibility(false);
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
  showAddPermissionsSingleEntity: function() {
    var scope = this;
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
    // this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddUsers.setVisibility(false);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.roles.SelectedPermissions");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.roles.AvailablePermissions");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.btnCancel.left = "3px";
    if(this.addNewRolePath){
      this.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");
      this.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");
    } else {
      this.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      this.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
    }
    this.view.btnNewCreateRole.setVisibility(true);
    this.view.btnNewSave.setVisibility(false);
    this.view.flxBack.setVisibility(false);
    this.view.flxAssignPermissionsHeader.setVisibility(true);
    this.view.lblAssignPermissions.setVisibility(true);
    this.view.lblPermissionsLegalEntityValue.setVisibility(true);
    this.view.lblPermissionsLegalEntityValue.text = "(" + this.view.lblLegalEntityValue.text + ")";
    this.view.lblAvailableOptionsNoRecords.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.flxClearSearch.setVisibility(false);
    this.view.btnNext.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.setSelectedOptionsSegmentData();
    this.setAddPermissionsSegmentData();
  },
  showAddPermissions: function() {
      var scope = this;
      this.hideAll();
      this.hideOptions();
      this.hideMainHeaderButtons();
      this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.togglePermissionSuboptions(true);
      this.view.tbxSearchBox.text = "";
      var widgetArray = [this.view.btnAddPermissions, this.view.btnAddUsers, this.view.btnOptionDetails];
      this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnAddPermissions);
      var widgetArray2 = [this.view.btnAddSysPermissions, this.view.btnAddCustomerAccess];
      this.tabUtilVerticleButtonFunction(widgetArray2, this.view.btnAddSysPermissions);
      this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray, this.view.lblIconSysPermisionsSelected);
      this.view.flxViews.setVisibility(true);
      this.hideMainSubHeader();
      this.view.flxAddMainContainer.setVisibility(true);
      // this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
      this.view.flxAddUsers.setVisibility(false);
      this.view.lblAddOptionsHeading.text = kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS");
      this.view.lblSelectedOption.text = kony.i18n.getLocalizedString("i18n.roles.SelectedPermissions");
      this.view.lblAvailableOptionsHeading.text = kony.i18n.getLocalizedString("i18n.roles.AvailablePermissions");
      this.view.flxAddOptionsContainer.setVisibility(true);
      if(this.addNewRolePath){
        this.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");
        this.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmRoles.CreateRole_UC");
      } else {
        this.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
        this.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      }
      for (var i = 0; i < this.view.segPermission.data.length; i++) {
        let entity = this.getEntityNameForLegalEntityId(this.view.segPermission.data[i].legalEntityId);
        if (this.rolePermissions[entity] === undefined) {
            this.rolePermissions[entity] = [];
            this.AllPermissionsAfterRemoving[entity] = [];
        }
        this.backFunctionRolePermissions[entity] = [...this.rolePermissions[entity]]
      };
      this.view.btnNewSave.setVisibility(true);
      this.view.btnNewCreateRole.setVisibility(false);
      this.view.flxBack.setVisibility(true);
      var enName = this.getEntityNameForLegalEntityId(this.view.segPermission.selectedItems[0].legalEntityId);
      this.view.lblSelEntity.text = "Selected Legal Entity: " + enName;
      this.view.btnBack.onClick = function() {
        for (var i = 0; i < scope.view.segPermission.data.length; i++) {
          let entity = scope.getEntityNameForLegalEntityId(scope.view.segPermission.data[i].legalEntityId);
          scope.rolePermissions[entity] = [...scope.backFunctionRolePermissions[entity]]
        }
        scope.view.flxAddOptionsContainer.setVisibility(false);
        var segPermissionsData = scope.view.segPermission.data;
        if (scope.addNewRolePath) {
          scope.showAddPermissionsLegalEntity(segPermissionsData);
        } else {
            scope.view.segPermission.selectedItems[0].lblPermissions1.text = scope.view.segSelectedOptions.data.length;
            var response = scope.selectedRoleDetails;
            var entity = scope.getEntityNameForLegalEntityId(scope.view.segPermission.selectedItems[0].legalEntityId);
            scope.showAddPermissionsLegalEntityForEdits(response);
            scope.getUpdatedPermissionList(entity);
        }
      }
      this.view.lblAvailableOptionsNoRecords.setVisibility(false);
      this.view.rtxSelectedOptionsMessage.setVisibility(false);
      this.view.flxRolesBreadCrumb.setVisibility(true);
      this.view.flxClearSearch.setVisibility(false);
      this.view.btnNext.setVisibility(this.isKeyCloakEnabled === true ? false : true);
      this.setSelectedOptionsSegmentData();
      this.setAddPermissionsSegmentData();
    },
    showAddUsers: function() {
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
    // this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddUsers.setVisibility(false);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.permission.SelectedUsers");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.permission.AvailableUsers");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.lblAvailableOptionsNoRecords.setVisibility(false);
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
    //this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddUsers.setVisibility(false);
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
    this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);
    this.view.backToViewRole.setVisibility(false);
    this.view.flxLegalEntityDetails.setVisibility(false);
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmRoles.SearchByPermission");
    this.view.searchBoxViewSegment.tbxSearchBox.onKeyUp = this.searchPermissions.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
    this.view.searchBoxViewSegment.flxSearchCancel.onClick = this.searchCancelPermissions.bind(this);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.ROLES");
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxViewPermissions.setVisibility(true);  
    // this.view.flxViewTab2.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxViewTab2.setVisibility(false);
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName1);
    this.subTabsButtonWithBgUtilFunction([this.view.tabs.btnTab1,this.view.tabs.btnTab2],this.view.tabs.btnTab1);
    this.view.flxPermissionsHeader.setVisibility(true);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.mainHeader.flxDropdownList.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(true);
    this.view.flxViewSegmentAndHeaders.top = "105dp";
    this.view.flxViewSegment.top = "110dp";
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
    this.view.mainHeader.flxDropdownList.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(false);
    this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);
    this.view.searchBoxViewSegment.setVisibility(false);
    this.view.backToViewRole.setVisibility(false);
    this.view.flxLegalEntityDetails.setVisibility(false);
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
     var downloadRolesFilterJSON = scopeObj.view.mainHeader.flxDownloadList.info;

    if(downloadRolesFilterJSON !== undefined && downloadRolesFilterJSON.selectedStatusList !== undefined) {
       status = "&status=" + downloadRolesFilterJSON.selectedStatusList;
    }
    var payload = {"searchText":searchText,"status":status};
//     this.presenter.generateRolesList(payload);
    
  },

  downloadCSV: function () {
    var scopeObj = this;
    var paramCount = 0;
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/RolesAndPermissionsObjService/operations/role_view/downloadRolesList";
    searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.searchBoxRoles.tbxSearchBox.text);
    if (searchText !== "") {
      paramCount = paramCount + 1;
      downloadURL = downloadURL + "?searchText=" + searchText;
    }
    var downloadRolesFilterJSON = scopeObj.view.mainHeader.flxDownloadList.info;
    if (downloadRolesFilterJSON !== undefined) {
      if (downloadRolesFilterJSON.selectedTypeList !== undefined) {
        var typeParam = paramCount > 0 ? "&type=" : "?type=";
        downloadURL += typeParam + downloadRolesFilterJSON.selectedTypeList;
        paramCount = paramCount + 1;
      }
      if (downloadRolesFilterJSON.selectedStatusList !== undefined) {
        var statusParam = paramCount > 0 ? "&status=" : "?status=";
        downloadURL += statusParam + downloadRolesFilterJSON.selectedStatusList;
        paramCount = paramCount + 1;
      }
      if (downloadRolesFilterJSON.selectedLegalEntityList !== undefined) {
        var legalEntityParam = paramCount > 0 ? "&legalEntityId=" : "?legalEntityId=";
        downloadURL += legalEntityParam + downloadRolesFilterJSON.selectedLegalEntityList;
      }
    }
    if(!downloadRolesFilterJSON || !downloadRolesFilterJSON.selectedLegalEntityList 
        || downloadRolesFilterJSON.selectedLegalEntityList.length === 0) {
      let selectedLegalEntityList = "";
      if(this.isSingleEntity) {
        selectedLegalEntityList = this.legalEntityList[0].id;
      } else {
        let legalEntityList = this.currUserLegalEntityList;
        let entities = "";
        for (var i = 0; i< legalEntityList.length;i++){
          entities += legalEntityList[i].id + "_";
        }
        selectedLegalEntityList = entities.substring(0, entities.length-1);
      }
      var legalEntityParam = paramCount > 0 ? "&legalEntityId=" : "?legalEntityId=";
      downloadURL += legalEntityParam + selectedLegalEntityList;
    }
    this.callDownloadCSVService(downloadURL, "Roles");
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
      scopeObj.view.lblAvailableOptionsNoRecords.setVisibility(false);
      scopeObj.view.flxClearSearch.setVisibility(false);
      if(area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
        scopeObj.setAddPermissionsSegmentData();
      }else if(area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")){
        scopeObj.setAddUsersSegmentData();
      }else if(area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
        scopeObj.setAddPermissionsSegmentData();
      }
    };
    this.view.flxLegalEntityValue.onClick = function () {
      scopeObj.view.addLegalEntityPopup.searchBox.tbxSearchBox.text = "";
      scopeObj.setEntityData();
      scopeObj.searchCancelAddModifyLegalEntityPopup();
      scopeObj.addModifyLegalEntityPopupSegData = JSON.parse(JSON.stringify(scopeObj.view.addLegalEntityPopup.segEntityList.data));
    };
    this.view.btnAdd.onClick = function () {
      scopeObj.view.addLegalEntityPopup.searchBox.tbxSearchBox.text = "";
      scopeObj.setEntityData();
      scopeObj.searchCancelAddModifyLegalEntityPopup();
      scopeObj.addModifyLegalEntityPopupSegData = JSON.parse(JSON.stringify(scopeObj.view.addLegalEntityPopup.segEntityList.data));
    };
    this.view.mainHeader.flxDownloadList.onClick = function(){
      if(scopeObj.view.flxNoResultFound.isVisible === false) {
        scopeObj.downloadCSV();
      }
    };
    this.view.mainHeader.flxDropdownList.onClick = function(){
      if(scopeObj.view.flxNoResultFound.isVisible === false) {
        scopeObj.downloadCSV();
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
        scopeObj.view.lblAvailableOptionsNoRecords.setVisibility(false);
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
    this.view.searchBoxViewSegment.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchBoxViewSegment.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.searchBoxViewSegment.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchBoxViewSegment.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
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

    //Entity Search
    this.view.addLegalEntityPopup.searchBox.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.addLegalEntityPopup.searchBox.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.addLegalEntityPopup.searchBox.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.addLegalEntityPopup.searchBox.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    };
    const searchEntity = function () {
      scopeObj.loadEntityData();
    };
    const anim = function(func, delay){
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
    const searchEntityCall = anim(searchEntity,300);
    
    this.view.addLegalEntityPopup.searchBox.tbxSearchBox.onKeyUp = function () {
      scopeObj.searchEntityAddModifyLegalEntityPopup();
      // searchEntityCall();
    };

    this.view.addLegalEntityPopup.searchBox.flxSearchCancel.onClick = function () {
      scopeObj.view.addLegalEntityPopup.searchBox.tbxSearchBox.text = "";
      scopeObj.searchCancelAddModifyLegalEntityPopup();
      // scopeObj.loadEntityData();
    };

    //     this.view.lbxPagination.onSelection = function(){
    //         scopeObj.gotoPage();
    //     };
    this.view.flxViewEditButton.onClick=function(){
      scopeObj.view.flxAddSeperator2.setVisibility(false);
      scopeObj.view.flxAddUsers.setVisibility(false);
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.ROLES");
      scopeObj.view.btnSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      scopeObj.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      scopeObj.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      kony.adminConsole.utils.showProgressBar(this.view);
      scopeObj.roleId = scopeObj.roleDetailsObj.roleDetails.roleId;
      var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
      var selectedData = scopeObj.view.segPermissions.data[segIndex];
      scopeObj.roleDetails.lblRoleName = selectedData.lblRoleName; 
      scopeObj.roleDetails.lblDescription = selectedData.lblDescription.text;
      if(scopeObj.isSingleEntity) {
        scopeObj.roleDetails.legalEntityIds = scopeObj.currUserLegalEntityList[0].id;
      } else {
        scopeObj.roleDetails.legalEntityIds = scopeObj.legalEntityIdsForRole;
      }
      scopeObj.addNewRolePath = false;
      scopeObj.view.segCustAccess.setData([]);
      scopeObj.view.segServices.setData([]);
      scopeObj.view.segPermission.setData([]);
      scopeObj.legalEntityListForEditFlow = {};
      scopeObj.selectedRoleDetails = {};
      scopeObj.rolePermissions = [];
      scopeObj.getRoleData(scopeObj.roleId);
    }; 
    this.view.tbxRoleNameValue.onTouchStart=function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmRoles_tbxRoleNameValue");
    };
	  this.view.txtRoleDescription.onTouchStart=function(){
      let specialCharactersSet = "[~#^|$%&‘*+!@()}{][/|?><`:;\\";
      scopeObj.view.txtRoleDescription.restrictcharactersset = specialCharactersSet;
    };
    this.view.tbxRoleNameValue.onKeyUp = function () {
      scopeObj.view.tbxRoleNameValue.skin = "skntbxLato35475f14px";
      scopeObj.view.flxNoRoleNameError.setVisibility(false);
      if (scopeObj.view.tbxRoleNameValue.text.length === 0) {
        scopeObj.view.lblRoleNameSize.setVisibility(false);
      }
      else {
        scopeObj.view.lblRoleNameSize.text = scopeObj.view.tbxRoleNameValue.text.length + "/50";
        scopeObj.view.lblRoleNameSize.setVisibility(true);
      }
      scopeObj.roleDetails.lblRoleName = scopeObj.view.tbxRoleNameValue.text;
      scopeObj.view.forceLayout();
    };
    this.view.popUp.btnPopUpDelete.onClick= function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.StatusOfAdminTestingPopUp.btnPopUpDelete.onClick = function() {
        scopeObj.onRoleUpdateChangeStatus();
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
    this.view.addLegalEntityPopup.btnPopUpDelete.onClick= function(){
      scopeObj.selLEList = [];
      scopeObj.view.addLegalEntityPopup.searchBox.tbxSearchBox.text = "";
      scopeObj.searchCancelAddModifyLegalEntityPopup();
      scopeObj.setLegalEntity();
    };
    this.view.addLegalEntityPopup.btnPopUpCancel.onClick= function(){
      let segData = scopeObj.addModifyLegalEntityPopupSegData;
      scopeObj.view.addLegalEntityPopup.segEntityList.setData(segData);
      scopeObj.view.addLegalEntityPopup.segEntityList.info = {"data" : segData};
      scopeObj.view.flxAddLegalEntityPopup.setVisibility(false);
    };
    this.view.addLegalEntityPopup.flxPopUpClose.onClick= function(){
      let segData = scopeObj.addModifyLegalEntityPopupSegData;
      scopeObj.view.addLegalEntityPopup.segEntityList.setData(segData);
      scopeObj.view.addLegalEntityPopup.segEntityList.info = {"data" : segData};
      scopeObj.view.flxAddLegalEntityPopup.setVisibility(false);
    };
    this.view.copySystemPermissionsPopup.btnNewCopy.onClick = function () {
      var selIndex = scopeObj.getEntityNameForLegalEntityId(scopeObj.view.segPermission.selectedItems[0].legalEntityId);
      scopeObj.copyPermissions(selIndex);
      var response = scopeObj.view.segPermission.data;
      if (scopeObj.addNewRolePath) {
        scopeObj.showAddPermissionsLegalEntity(response);
      } else {
        scopeObj.showAddPermissionsLegalEntityForEdits(response);
      }
      scopeObj.view.flxCopySystemPermissionsPopup.setVisibility(false);
    };
    this.view.copySystemPermissionsPopup.btnNewCancel.onClick= function() {
      scopeObj.view.flxCopySystemPermissionsPopup.setVisibility(false);
    };
    this.view.copySystemPermissionsPopup.flxPopUpClose.onClick= function() {
      scopeObj.view.flxCopySystemPermissionsPopup.setVisibility(false);
    };
    this.view.flxStatusAdminTestingPopup.StatusOfAdminTestingPopUp.flxPopUpClose.onClick = function() {
      scopeObj.view.flxStatusAdminTestingPopup.setVisibility(false);
    };
    this.view.flxStatusAdminTestingPopup.StatusOfAdminTestingPopUp.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxStatusAdminTestingPopup.setVisibility(false);
    };
    this.view.flxchangeStatus.onClick = function() {
        scopeObj.changeStatus();
    },
    this.view.flxOption2.onClick=function(){
      scopeObj.view.flxAddSeperator2.setVisibility(false);
      scopeObj.view.flxAddUsers.setVisibility(false);
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmRoles.RoleList_UC");
      scopeObj.view.btnSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      scopeObj.view.btnAddPerNext.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      scopeObj.view.btnNewCreateRole.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      kony.adminConsole.utils.showProgressBar(this.view);
      var segIndex = scopeObj.view.segPermissions.selectedRowIndex[1];
      var selectedData = scopeObj.view.segPermissions.data[segIndex];
      scopeObj.roleDetails.lblRoleName = selectedData.lblRoleName; 
      scopeObj.roleDetails.lblDescription = selectedData.lblDescription.text;
      if(scopeObj.isSingleEntity) {
        scopeObj.roleDetails.legalEntityIds = scopeObj.currUserLegalEntityList[0].id;
      } else {
        scopeObj.roleDetails.legalEntityIds = scopeObj.legalEntityIdsForRole;
      }
      scopeObj.addNewRolePath = false;
      scopeObj.view.segCustAccess.setData([]);
      scopeObj.view.segServices.setData([]);
      scopeObj.view.segPermission.setData([]);
      scopeObj.legalEntityListForEditFlow = {};
      scopeObj.selectedRoleDetails = {};
      scopeObj.rolePermissions = [];
      scopeObj.getRoleData(scopeObj.roleId);
    };
    this.view.flxOption4.onClick=function(){
      var roleName = scopeObj.roleData[scopeObj.gblselIndex].legalEntitiesRoleInfo[0].role_Name;
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
	this.view.btnAddPermissions.onClick = function() {
	  scopeObj.setSelectedRoleDataForEditFlow();
      if (scopeObj.validateRoleName()) {
         if (scopeObj.isSingleEntity) {
             scopeObj.showAddServiceDefinitionsSingleEntity();
             } else {
			  let segServicesData = scopeObj.view.segServices.data;
             if (segServicesData && segServicesData.length > 0) {
                scopeObj.showAddServices(segServicesData);
               } else {
                scopeObj.showAddServices();
                    }
                }
            }
      else scopeObj.errorRoleName();
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
      if (scopeObj.isSingleEntity) {
        scopeObj.showViewPermissionSegmentAndHeader();
      } else {
        scopeObj.showViewLegalEntitiesPermissionSegmentAndHeader();
      }
    };
    this.view.lblTabName2.onTouchEnd= function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                     scopeObj.view.lblTabName2],scopeObj.view.lblTabName2);
      scopeObj.showViewUsersSegmentAndHeader();
    };
    this.view.mainHeader.btnAddNewOption.onClick=function(){
      scopeObj.navigateToAddNewRoleForm();
      scopeObj.view.flxAddPermssions.setVisibility(false);
     // scopeObj.showAddRoleScreen();
      scopeObj.getAllActivePermissionsAndAllActiveUsers();
    };
    this.view.breadcrumbs.btnBackToMain.onClick= function(){
      scopeObj.legalEntitiesPermissionDataForRole = [];
      scopeObj.legalEntitiesServiceDataForRole = [];
      scopeObj.legalEntitiesServicDefsDataForRole = [];
      scopeObj.legalEntityIdsForRole = [];
      scopeObj.selectedLegalEntity = "";
      scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
      scopeObj.showRoles();
    };
    this.view.btnCancel.onClick= function(){
      scopeObj.showRoles();
    };
    this.view.btnNewSave.onClick = function () {
      var legalEntityName = scopeObj.getEntityNameForLegalEntityId(scopeObj.view.segPermission.selectedRowItems[0].legalEntityId);
      scopeObj.view.segPermission.selectedRowItems[0].selectedCountsforPer = scopeObj.rolePermissions[legalEntityName].length;
      selectedPermissionRow = scopeObj.view.segPermission.selectedItems[0];
      var resPons = scopeObj.view.segPermission.data;
      if (scopeObj.addNewRolePath) {
        scopeObj.showAddPermissionsLegalEntity(resPons);
      } else {
        scopeObj.view.segPermission.selectedItems[0].lblPermissions1.text = scopeObj.view.segSelectedOptions.data.length;
        var response = scopeObj.selectedRoleDetails;
        scopeObj.showAddPermissionsLegalEntityForEdits(response);
      }
      scopeObj.view.flxAddOptionsContainer.setVisibility(false);
    };
    this.view.btnAddRoleCancel.onClick = function () {
      scopeObj.selLEList = [];
      if (this.addNewRolePath === true)
        scopeObj.view.lblLegalEntityValue.text = kony.i18n.getLocalizedString("i18n.frmRoles.SelectLegalEntity");
      scopeObj.view.tbxRoleNameValue.skin = "skntbxLato35475f14px";
      scopeObj.view.flxNoRoleNameError.setVisibility(false);
      scopeObj.presenter.fetchRoleList();
      kony.adminConsole.utils.showProgressBar(this.view);
      scopeObj.showRoles();
    };
    this.view.btnAddPermissionCancel.onClick= function(){
      scopeObj.showRoles();
    };
    this.view.btnAddRoleNext.onClick = function() {
      scopeObj.setSelectedRoleDataForEditFlow();
      if (scopeObj.validateRoleName()) {
        if (scopeObj.isSingleEntity) {
          scopeObj.showAddServiceDefinitionsSingleEntity();
        } else {
          let segServicesData = scopeObj.view.segServices.data;
          if(segServicesData && segServicesData.length > 0){
            scopeObj.showAddServices(segServicesData);
          } else {
            scopeObj.showAddServices();
          }
        }
      } else scopeObj.errorRoleName();
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
    this.view.btnAddPerNext.onClick = function () {
      // for multiple entity flow
      if (scopeObj.validateRoleName()) {
        var count = 0;
        if (scopeObj.addNewRolePath) {
          for (var k = 0; k < scopeObj.selLEList.length; k++) {
            let legalEntityName = scopeObj.getEntityNameForLegalEntityId(scopeObj.selLEList[k]);
            if (scopeObj.rolePermissions[legalEntityName] && scopeObj.rolePermissions[legalEntityName].length === 0) {
              count++;
            }
          }
        } else {
          for (var k = 0; k < Object.keys(scopeObj.selectedRoleDetails).length; k++) {
            if (!scopeObj.selectedRoleDetails[Object.keys(scopeObj.selectedRoleDetails)[k]].isLegalEntityAccessRestricted) {
              let legalEntityName = scopeObj.getEntityNameForLegalEntityId(Object.keys(scopeObj.selectedRoleDetails)[k]);
              if (scopeObj.rolePermissions[legalEntityName] === undefined || scopeObj.rolePermissions[legalEntityName].length === 0) {
                count++;
              }
            }
          }
        }
        if (count === 0) {
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.prepareUpdateRoleRequest(scopeObj.roleId);
        } else {
          scopeObj.view.flxErrorPopup.setVisibility(true);
        }
      } else scopeObj.errorRoleName();
    };
    this.view.btnNewCreateRole.onClick = function() {
      // for single entity flow
      if (scopeObj.validateRoleName()) {
          let legalEntityName = scopeObj.view.lblLegalEntityValue.text;
          if (scopeObj.rolePermissions[legalEntityName] && scopeObj.rolePermissions[legalEntityName].length >= 1) {
              kony.adminConsole.utils.showProgressBar(scopeObj.view);
              scopeObj.prepareUpdateRoleRequest(scopeObj.roleId);
          } else {
              scopeObj.view.flxErrorPopup.setVisibility(true);
          }
      } else scopeObj.errorRoleName();
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
    this.LegalEntitySorter = this.getObjectSorter('lblName.info.value');
    this.determineSortFontIcon(this.LegalEntitySorter, 'lblName.info.value', this.view.lblfontImgViewLegalEntityNameSort);
    this.view.flxViewLegalEntityName.onClick = function(){
      scopeObj.LegalEntitySorter.column("lblName.info.value");
      scopeObj.determineSortFontIcon(scopeObj.LegalEntitySorter, 'lblName.info.value', scopeObj.view.lblfontImgViewLegalEntityNameSort);
      var dataSet = scopeObj.view.segViewSegment.data;
      var sortedDataSet = [];
      if (dataSet.length !== 0) {
        dataSet[0].lblSeperator.isVisible = true;
        sortedDataSet = dataSet.sort(scopeObj.LegalEntitySorter.sortData);
        sortedDataSet[0].lblSeperator.isVisible = false;
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
    this.view.statusFilterMenu.segEntityFilterDropdown.onRowClick = function() {
      scopeObj.performEntityStatusFilter();
  };
  this.view.statusFilterMenu.flxInactive.onClick = function(){
      if (scopeObj.view.statusFilterMenu.imgCheckBox1.src === "checkboxselected.png") {
          scopeObj.view.statusFilterMenu.imgCheckBox1.src = "checkbox.png";
          scopeObj.multiEntityStatusFilter.isInActiveFilter = false;
      } else {
          scopeObj.view.statusFilterMenu.imgCheckBox1.src = "checkboxselected.png"
          scopeObj.multiEntityStatusFilter.isInActiveFilter = true;
      }
      scopeObj.performEntityStatusFilter();
  };
  this.view.statusFilterMenu.flxActive.onClick = function(){
    if (scopeObj.view.statusFilterMenu.imgCheckBox.src === "checkboxselected.png") {
        scopeObj.view.statusFilterMenu.imgCheckBox.src = "checkbox.png";
        scopeObj.multiEntityStatusFilter.isActiveFilter = false;
    } else {
        scopeObj.view.statusFilterMenu.imgCheckBox.src = "checkboxselected.png"
        scopeObj.multiEntityStatusFilter.isActiveFilter = true;
    }
    scopeObj.performEntityStatusFilter();
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
    this.view.btnAddCustomerAccess.onClick = function () {
      if (scopeObj.isSingleEntity) {
        scopeObj.showAddServiceDefinitionsSingleEntity();
      } else {
        let segServicesData = scopeObj.view.segServices.data;
        if(scopeObj.prevSegServicesData && scopeObj.prevSegServicesData.length > 0){
          segServicesData = scopeObj.prevSegServicesData;
        }
        segServicesData = segServicesData && segServicesData.length > 0
                          ? segServicesData 
                          : [];
        scopeObj.showAddServices(segServicesData);
      }
      scopeObj.view.flxAddPermssions.setVisibility(false);
      scopeObj.view.flxAddOptionsContainer.setVisibility(false);
    };
    this.view.btnAddSysPermissions.onClick = function () {
      scopeObj.view.flxAssignCustomerAccess.setVisibility(false);
      if (scopeObj.validateRoleName()) {
        if (scopeObj.isSingleEntity) {
          scopeObj.showAddPermissionsSingleEntity();
        } else {
          scopeObj.view.flxAddServices.setVisibility(false);
          scopeObj.view.flxAddOptionsContainer.setVisibility(false);
          if (scopeObj.addNewRolePath === false) {
            var response = scopeObj.selectedRoleDetails;
            scopeObj.showAddPermissionsLegalEntityForEdits(response);
          } else {
            var response = scopeObj.view.segPermission.data;
            scopeObj.showAddPermissionsLegalEntity(response);
          }
        }
      } else scopeObj.errorRoleName();
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
    this.view.commonButtons.btnNext.onClick = function () {
      scopeObj.showAddPermissionsSingleEntity();
    };
    this.view.commonButtons.btnSave.onClick = function () {
      var entityName = scopeObj.getEntityNameForLegalEntityId(scopeObj.view.segServices.selectedItems[0].legalEntityId);
      var addServicesBtn = scopeObj.view.segServices.selectedItems[0].btnAddServices.text;
      // scopeObj.totalServicesCount = scopeObj.getTotalServicesCount();
      scopeObj.view.segServices.selectedRowItems[0].selectedCounts = scopeObj.getSelectedServiceDefCount();
      var ResPonse = scopeObj.view.segServices.data;
      scopeObj.showAddServices(ResPonse);
      scopeObj.view.flxAssignCustomerAccess.setVisibility(false);
      if (addServicesBtn === "Edit Services" && scopeObj.addNewRolePath) {
        scopeObj.editServices(entityName);
      } else {
        scopeObj.selservices(entityName);
      }
      /*if (scopeObj.validateRoleName()) {
      scopeObj.showAddPermissions();   
      } else scopeObj.errorRoleName();*/
    };
    this.view.tabs.btnTab1.onClick = function(){
      if(scopeObj.isSingleEntity){
        scopeObj.showViewPermissionSegmentAndHeader();
      } else{
        scopeObj.showViewLegalEntitiesPermissionSegmentAndHeader();
      }
    };
    this.view.tabs.btnTab2.onClick = function(){
      if(scopeObj.isSingleEntity){
        scopeObj.viewServiceDefinitionsForARole();
      } else{
        scopeObj.showViewLegalEntitiesServiceSegmentAndHeader();
      }
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
  setRolesSegmentData: function (response, isFilter) {
    var self = this;
    if (response.length === 0) {
      var searchText = self.AdminConsoleCommonUtils.getEncodedTextInput(self.view.searchBoxRoles.tbxSearchBox.text, false);
      if(searchText !== ""){
        self.view.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") 
                                     + "\"" + searchText + "\"."+"\n" 
                                     + kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
      } else {
        self.view.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_roles_are_available");
      }
      self.view.flxNoResultFound.setVisibility(true);
      self.view.flxNoResultFound.top = "0px";
      self.view.flxPermissionsContainer.height = "43%";
      self.view.flxSegRoles.setVisibility(false);
      self.view.segPermissions.setData(response);
      self.view.flxRolesHeader.setVisibility(false);
      //self.view.flxPagination.setVisibility(false);
    } else {
      self.view.flxNoResultFound.setVisibility(false);
      self.view.flxRolesHeader.setVisibility(true);
      self.view.flxSegRoles.setVisibility(true);
      self.view.flxPermissionsContainer.height = "100%";
      var dataMap = {
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
        "fontIconStatusImg1": "fontIconStatusImg1",
        "lblDescription": "lblDescription",
        "lblHeaderSeperator": "lblHeaderSeperator",
        //"lblNoOfUsers": "lblNoOfUsers",
        //"lblPermissions": "lblPermissions",
        "lblRoleName": "lblRoleName",
        "lblRoleStatus": "lblRoleStatus",
        "lblRoleStatus1": "lblRoleStatus1",
        "lblSeperator": "lblSeperator",
        "lblNoOfEntities": "lblNoOfEntities",
        "roleId": "roleId",
        "statusId": "statusId",
        "legalEntityIds": "legalEntityIds",
        "legalEntitiesRoleInfo": "legalEntitiesRoleInfo",
        "legalEntitiesStatusData": "legalEntitiesStatusData"
        //"lblValidTillDate": "lblValidTillDate"
      };
      var sortIconFor = function (column) {
        return self.determineSortIconForSeg(self.sortBy, column);
      };

      var data = [];
      var statusList = [];
      if (typeof response !== 'undefined') {
        data = response.map(function (roleViewData) {
          let legalEntitiesRoleInfo = roleViewData.legalEntitiesRoleInfo;
          let legalEntityRoleData = undefined;
          let inActivelegalEntityRoleData = undefined;

          let firstActiveLegalEntityRoleData = legalEntitiesRoleInfo.find(legalEntityRoleInfo => {
            if (legalEntityRoleInfo.Status_id === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
              return legalEntityRoleInfo;
            }
          });

          let firstInActiveLegalEntityRoleData = legalEntitiesRoleInfo.find(legalEntityRoleInfo => {
            if (legalEntityRoleInfo.Status_id === self.AdminConsoleCommonUtils.constantConfig.INACTIVE) {
              return legalEntityRoleInfo;
            }
          });

          if (!firstActiveLegalEntityRoleData) {
            legalEntityRoleData = firstInActiveLegalEntityRoleData;
          } else {
            legalEntityRoleData = firstActiveLegalEntityRoleData;
            inActivelegalEntityRoleData = firstInActiveLegalEntityRoleData;
          }

          let remainingNoOfEntities = 0;
          if (!self.isSingleEntity) {
            let EntitiesCount = legalEntitiesRoleInfo.length;
            remainingNoOfEntities = inActivelegalEntityRoleData && inActivelegalEntityRoleData.legalEntityId
              ? (EntitiesCount - 2 > 0 ? EntitiesCount - 2 : 0)
              : (EntitiesCount - 1 > 0 ? EntitiesCount - 1 : 0);
          }

          let legalEntityList = [];
          let legalEntitiesStatusData = {};

          legalEntitiesRoleInfo.forEach(function (legalEntityRoleInfo) {
            let legalEntityId = legalEntityRoleInfo.legalEntityId;
            legalEntityList.push(legalEntityId);
            if (!statusList.contains(legalEntityRoleInfo.Status_Desc)) {
              statusList.push(legalEntityRoleInfo.Status_Desc);
            }
            legalEntitiesStatusData[self.getEntityNameForLegalEntityId(legalEntityId)] = {
              "status_id": legalEntityRoleInfo.Status_id,
              "legalEntityId": legalEntityId
            };
          });

          return {
            "roleId": legalEntityRoleData.role_id,
            "statusId": legalEntityRoleData.Status_id,
            "lblIconImgOptions": { "text": "\ue91f" },
            "fontIconStatusImg": legalEntityRoleData.Status_Desc === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? { "skin": "sknFontIconActivate" } : { "skin": "sknfontIconInactive" },
            "fontIconStatusImg1": {
              // if any inactive legalEntity exist for role
              "skin": "sknfontIconInactive",
              "isVisible": inActivelegalEntityRoleData && inActivelegalEntityRoleData.legalEntityId && !self.isSingleEntity
                ? true
                : false
            },
            "lblDescription": { "text": legalEntityRoleData.role_Desc, "width": "38%" },
            "lblNoOfUsers": { "text": legalEntityRoleData.Users_Count, "isVisible": false },
            "lblPermissions": legalEntityRoleData.permission_Count,
            "lblRoleName": legalEntityRoleData.role_Name,
            "lblRoleStatus": {
              "text": self.isSingleEntity
                ? legalEntityRoleData.Status
                : self.getEntityNameForLegalEntityId(legalEntityRoleData.legalEntityId),
              "skin": "sknlblLato5bc06cBold14px"
            },
            "lblRoleStatus1": {
              // if any inactive legalEntity exist for role
              "text": inActivelegalEntityRoleData && inActivelegalEntityRoleData.legalEntityId && !self.isSingleEntity
                ? self.getEntityNameForLegalEntityId(inActivelegalEntityRoleData.legalEntityId)
                : "",
              "isVisible": inActivelegalEntityRoleData && inActivelegalEntityRoleData.legalEntityId && !self.isSingleEntity
                ? true
                : false,
              "skin": "sknlblLato5bc06cBold14px"
            },
            "lblNoOfEntities": {
              "text": remainingNoOfEntities > 0 ? `+${remainingNoOfEntities} More` : "",
              "isVisible": self.isSingleEntity ? false : true,
            },
            //"lblRoleStatus": roleViewData.Status_Desc === kony.i18n.getLocalizedString("i18n.secureimage.Active")?{"text":roleViewData.Status_Desc,"skin":"sknlblLato5bc06cBold14px"}: {"text":roleViewData.Status_Desc,"skin":"sknlblLatoDeactive"},                
            "lblSeperator": "-",
            "template": "flxRoles",
            "legalEntityIds": legalEntityList,
            "legalEntitiesRoleInfo": legalEntitiesRoleInfo,
            "legalEntitiesStatusData": legalEntitiesStatusData,
            "flxOptions": {
              "onClick": function () {
                self.onClickOptions();
              },
              "skin": "slFbox"
            },
            "flxRoles": {
              "onClick": function () {
                self.fetchRoleDetails(legalEntityRoleData.role_id, legalEntityRoleData.role_Name,
                  legalEntityRoleData.role_Desc, legalEntityRoleData.Status_id, legalEntitiesRoleInfo, legalEntityList);
              }
            }
          };
        });
      }
      if (!isFilter) {
        self.roleData = response;
        self.SetStatusFilterData(statusList);
        self.setEntityFilterData(response);
      }
      this.view.segPermissions.widgetDataMap = dataMap;
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
    for(index = 0; index < data.length; index++){
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
  setEntityFilterData: function (response) {
    var self = this;
    var maxSizeText = 0;
    var widgetMap = {
      "flxCheckBox": "flxCheckBox",
      "flxEntityFilterDropDown": "flxEntityFilterDropDown",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    this.view.statusFilterMenu.segEntityFilterDropdown.widgetDataMap = widgetMap;
    var data = [];
    var EntityData = [];
    var legalEntityName = "";
		response.map(function(roleViewData) {
			legalEntitiesRoleInfo = roleViewData.legalEntitiesRoleInfo;
			legalEntitiesRoleInfo.map(function(legalEntitiesRoleInfo){
				legalEntityName = self.getEntityNameForLegalEntityId(legalEntitiesRoleInfo.legalEntityId);
				if(maxSizeText < legalEntityName.length)
					maxSizeText = legalEntityName.length;
				if(!EntityData.contains(legalEntityName)) 
					EntityData.push(legalEntityName);
			});
		});
		data = EntityData.map(function(EntityData) {
			return {
				"flxCheckBox": "flxCheckBox",
				"flxEntityFilterDropDown": "flxEntityFilterDropDown",
				"imgCheckBox": {
					"src": "checkbox.png"
				},
				"lblDescription": EntityData
			}
        });
        var flexWidth = maxSizeText !== 0 ? this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText) +16 +55 : 200;
		flexWidth =  flexWidth > 200 ? flexWidth : 216;
        this.view.flxRoleStatusFilter.width = flexWidth + "dp";
        this.view.statusFilterMenu.segEntityFilterDropdown.setData(data);
    },
  addPermissionstoRole: function() {
    var self = this;
    var entity = "";
    if(this.isSingleEntity) {
      entity = self.view.lblLegalEntityValue.text;
    } else {
      entity = self.getEntityNameForLegalEntityId(self.view.segPermission.selectedItems[0].legalEntityId);
    }
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
      },
      "legalEntityName": entity
    };
    targetSegment.data.push(toAdd);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    if( sourceSegment.data.length===0){
      this.view.lblAvailableOptionsNoRecords.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
      this.view.lblAvailableOptionsNoRecords.setVisibility(true);
      this.view.btnAddAll.setVisibility(false);
      sourceSegment.setVisibility(false);
    }
    else{
      this.view.lblAvailableOptionsNoRecords.setVisibility(false);
      this.view.btnAddAll.setVisibility(true);
      targetSegment.setVisibility(true);
    }
    sourceSegment.setData(sourceSegment.data);
    this.AllPermissionsAfterRemoving[entity] = sourceSegment.data;
    this.rolePermissions[entity] = targetSegment.data;
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
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBox.text, false);
      if(searchText.length>0){
        this.view.lblAvailableOptionsNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText
          +"\"."+ "\n" +kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
      }
      else
        this.view.lblAvailableOptionsNoRecords.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.lblAvailableOptionsNoRecords.setVisibility(true);
      this.view.btnAddAll.setVisibility(false);
      sourceSegment.setVisibility(false);
    }
    else{
      this.view.lblAvailableOptionsNoRecords.setVisibility(false);
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
    var entity = "";
    if(!this.isSingleEntity) {
      entity = this.getEntityNameForLegalEntityId(this.view.segPermission.selectedItems[0].legalEntityId);
    } else {
      entity = this.view.lblLegalEntityValue.text;
    }
    this.view.lblAvailableOptionsNoRecords.setVisibility(false);
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
    this.rolePermissions[entity] = sourceSegment.data;
  },
  searchFromList: function() {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBox.text, false);
    var searchKey = searchText.toLowerCase();
    var area = this.view.lblAddOptionsHeading.text;
    if(searchKey === ""){
      this.view.flxClearSearch.setVisibility(false);
      this.view.segAddOptions.setVisibility(true);
      this.view.lblAvailableOptionsNoRecords.setVisibility(false);
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
    var scope = this;
    var orgRolePermissions = this.orgRolePermissions.slice(0);
    var roleName = this.view.tbxRoleNameValue.text.trim();
    var roleUserIds = [];
    var rolePermissionIds = [];
    var orgRoleUserIds = [];
    var serDefIds = {};
    var orgRolePermissionIds = [];
    var roleUserIdsAdded = [];
    var rolePermissionIdsAdded = [];
    var roleUserIdsRemoved = [];
    var rolePermissionIdsRemoved = [];
    var request = {};
    // for (var j = 0; j < orgRolePermissions.length; j++) {
    //     orgRolePermissionIds[orgRolePermissionIds.length] = "" + orgRolePermissions[j].permissionId;
    // }
    // rolePermissionIdsRemoved = this.updatedIdUsersPermissions(orgRolePermissionIds, rolePermissionIds);
    // rolePermissionIdsAdded = this.updatedIdUsersPermissions(rolePermissionIds, orgRolePermissionIds);
    if (this.isKeyCloakEnabled === false) {
      var orgRoleUsers = this.orgRoleUsers.slice(0);
      var roleUsers = this.roleUsers.slice(0);
      for (var k = 0; k < roleUsers.length; k++) {
          roleUserIds[roleUserIds.length] = "" + roleUsers[k].userId;
      }
      for (var m = 0; m < orgRoleUsers.length; m++) {
          orgRoleUserIds[orgRoleUserIds.length] = "" + orgRoleUsers[m].userId;
      }
      roleUserIdsRemoved = this.updatedIdUsersPermissions(orgRoleUserIds, roleUserIds);
      roleUserIdsAdded = this.updatedIdUsersPermissions(roleUserIds, orgRoleUserIds);
    }
    if (this.addNewRolePath === true) {
        // create role flow
        if (!this.isSingleEntity) {
          // for service definitions
          for (var n = 0; n < this.legalEntityIdsForCreateRole.length; n++) {
            let entity = this.getEntityNameForLegalEntityId(this.legalEntityIdsForCreateRole[n].legalEntityId);
            serDefIds[entity] = this.legalEntityIdsForCreateRole[n].servicedefinitions;
          }

          // for role permissions
          for (var i = 0; i < this.selLEList.length; i++) {
            let entity = this.getEntityNameForLegalEntityId(this.selLEList[i]);
            var array = [];
            for (var j = 0; j < this.rolePermissions[entity].length; j++) {
              array.push(this.rolePermissions[entity][j].permissionId);
            }
            rolePermissionIds[entity] = array;
          }
        } else {
          // for service definitions 
          var entity = this.view.lblLegalEntityValue.text;
          serDefIds[entity] = (this.legalEntityIdsForCreateRole[0] && this.legalEntityIdsForCreateRole[0].servicedefinitions) ? this.legalEntityIdsForCreateRole[0].servicedefinitions : [] ;

          // for role permissions
          var array = [];
          for (var j = 0; j < this.rolePermissions[entity].length; j++) {
            array.push(this.rolePermissions[entity][j].permissionId);
          }
          rolePermissionIds[entity] = array;
        }
        // preparing payload for create role
        this.fromCreateRole = true;
        this.fromEditRoles = false;
        var legalEntitiesRoleInfo = {};
        if(this.isSingleEntity) {
            let entity = this.view.lblLegalEntityValue.text;
            legalEntitiesRoleInfo = [{
                    "legalEntityId": scope.legalEntityList[0].id,
                    "Role_Name": scope.roleDetails.lblRoleName,
                    "Role_Desc": scope.roleDetails.lblDescription,
                    "Status_id": scope.view.switchStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
                    "system_user": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                    "Permission_ids": rolePermissionIds[entity],
                    "User_ids": roleUserIdsAdded,
                    "AddedServiceDefinitions": serDefIds[entity],
                }];
        } else {
            var legalEntitiesSelected = this.selLEList;
            legalEntitiesRoleInfo = legalEntitiesSelected.map(function(response) {
                return {
                    "legalEntityId": response,
                    "Role_Name": scope.roleDetails.lblRoleName,
                    "Role_Desc": scope.roleDetails.lblDescription,
                    "Status_id": scope.selLEStatus[scope.getEntityNameForLegalEntityId(response)].selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
                    "system_user": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                    "Permission_ids": rolePermissionIds[scope.getEntityNameForLegalEntityId(response)],
                    "User_ids": roleUserIdsAdded,
                    "AddedServiceDefinitions": serDefIds[scope.getEntityNameForLegalEntityId(response)]
                };
            });
        }
        this.CreateRolePayload = {};
        this.CreateRolePayload.legalEntitiesRoleInfo = legalEntitiesRoleInfo;
        this.createRoleData(this.CreateRolePayload);
    } else if (this.addNewRolePath === false) {
      // preparing payload for edit role
      this.fromCreateRole = false;
      this.fromEditRoles = true;
      var selectedRoleDetails = this.selectedRoleDetails;
      var request = {};
      var legalEntitiesRoleInfo = [];
      if(this.isSingleEntity) {
        let entity = this.view.lblLegalEntityValue.text;
        legalEntitiesRoleInfo = [{
          "legalEntityId": scope.legalEntityList[0].id,
          "Role_Details": {
            "id": this.roleId,
            "Name": scope.roleDetails.lblRoleName,
            "Description": scope.roleDetails.lblDescription,
            "Status_id": scope.view.switchStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE"
          },
          "AssignedTo": {
            "permissionList": this.getUpdatedPermissionList(entity).AddedPermissions,
            "usersList": []
          },
          "RemovedFrom": {
            "permissionList": this.getUpdatedPermissionList(entity).RemovedPermissions,
            "usersList": []
          },
          "AddedServiceDefinitions": selectedRoleDetails[scope.legalEntityList[0].companyName].addedServiceDefinitions || [],
          "RemovedServiceDefinitions": selectedRoleDetails[scope.legalEntityList[0].companyName].removedServiceDefinitions || []
        }];
      } else {
        for (var legalEntity in selectedRoleDetails) {
          if (!selectedRoleDetails[legalEntity].isLegalEntityAccessRestricted) {
            let entity = this.getEntityNameForLegalEntityId(selectedRoleDetails[legalEntity].legalEntityId);
            let legalEntityRoleInfo = {
              "legalEntityId": selectedRoleDetails[legalEntity].legalEntityId,
              "Role_Details": {
                "id": this.roleId,
                "Name": selectedRoleDetails[legalEntity].roleName,
                "Description": selectedRoleDetails[legalEntity].roleDesc,
                "Status_id": selectedRoleDetails[legalEntity].status_id
              },
              "AssignedTo": {
                "permissionList": this.getUpdatedPermissionList(entity).AddedPermissions,
                "usersList": []
              },
              "RemovedFrom": {
                "permissionList": this.getUpdatedPermissionList(entity).RemovedPermissions,
                "usersList": []
              },
              "AddedServiceDefinitions": selectedRoleDetails[legalEntity].addedServiceDefinitions || [],
              "RemovedServiceDefinitions": selectedRoleDetails[legalEntity].removedServiceDefinitions || []
            }
            legalEntitiesRoleInfo.push(legalEntityRoleInfo);
          }
        }
      }
      request.legalEntitiesRoleInfo = legalEntitiesRoleInfo;
      request.User_id = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
      this.updateRoleData(request);
  } else {
        this.fromCreateRole = false;
        this.fromEditRoles = true;
        request = {
            "User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
            "Role_Details": {
                "id": roleId,
                "Name": roleName,
                "Description": this.view.txtRoleDescription.text.trim(),
                "Status_id": this.view.switchStatus.selectedIndex === 1 ? this.AdminConsoleCommonUtils.constantConfig.INACTIVE : this.AdminConsoleCommonUtils.constantConfig.ACTIVE
            },
            "AssignedTo": {
                "permissionList": rolePermissionIdsAdded,
                "usersList": roleUserIdsAdded
            },
            "RemovedFrom": {
                "permissionList": rolePermissionIdsRemoved,
                "usersList": roleUserIdsRemoved
            },
            "AddedServiceDefinitions": this.getUpdatedServiceDefList().AddedServiceDefinitions,
            "RemovedServiceDefinitions": this.getUpdatedServiceDefList().RemovedServiceDefinitions
        };
        this.updateRoleData(request);
    }
  },
  setAddPermissionsSegmentData: function() {
    var entity = "";
    if(this.isSingleEntity){
        entity = this.legalEntityList[0].companyName;
    }else{
        entity = this.getEntityNameForLegalEntityId(this.view.segPermission.selectedItems[0].legalEntityId);
    }
    var dataMap = {
        "btnAdd": "btnAdd",
        "flxAddPermissions": "flxAddPermissions",
        "flxAddWrapper": "flxAddWrapper",
        "lblPermissionsName": "lblPermissionsName",
        "rtxPermissionDescription": "rtxPermissionDescription",
        "legalEntityId": "legalEntityId"
    };
    this.view.segAddOptions.widgetDataMap = dataMap;
    var data = this.allPermissionsData.slice(0);
    var removalIds = [];
    if(this.isSingleEntity){
        for (var i = 0; i < this.rolePermissions[entity].length; i++) {
            removalIds[removalIds.length] = this.rolePermissions[entity][i].permissionId;
        }
    }else{
        if (this.addNewRolePath === false) {
            if (this.rolePermissions[entity] === undefined) {
                removalIds = [];
            } else {
                for (var m = 0; m < this.rolePermissions[entity].length; m++) {
                    removalIds[removalIds.length] = this.rolePermissions[entity][m].permissionId;
                }
            }
        } else {
            if (this.rolePermissions[entity] === undefined) {
                removalIds = [];
            } else {
                for (var i = 0; i < this.rolePermissions[entity].length; i++) {
                    removalIds[removalIds.length] = this.rolePermissions[entity][i].permissionId;
                }
            }
        }
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
    if (data.length === 0) {
        this.view.btnAddAll.setVisibility(false);
        this.view.segAddOptions.setVisibility(false);
        this.view.lblAvailableOptionsNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
        this.view.lblAvailableOptionsNoRecords.setVisibility(true);
    }
    this.view.btnAddAll.setVisibility(this.view.segAddOptions.data.length !== 0);
    this.view.forceLayout();
  },
  setAddPermissionsSegmentDataAfterSearch: function(searchKey) {
    var entity = "";
    if(this.isSingleEntity){
        entity = this.legalEntityList[0].companyName;
    }else{
        entity = this.getEntityNameForLegalEntityId(this.view.segPermission.selectedItems[0].legalEntityId);
    }
    var dataMap = {
        "btnAdd": "btnAdd",
        "flxAddPermissions": "flxAddPermissions",
        "flxAddWrapper": "flxAddWrapper",
        "lblPermissionsName": "lblPermissionsName",
        "rtxPermissionDescription": "rtxPermissionDescription"
    };
    var data = this.allPermissionsData.slice(0);
    var removalIds = [];
    if(this.isSingleEntity){
        for (var i = 0; i < this.rolePermissions.length; i++) {
            removalIds[removalIds.length] = this.rolePermissions[i].permissionId;
        }
    }else{
        if (this.rolePermissions[entity] === undefined) {
            removalIds = [];
        } else {
            for (var i = 0; i < this.rolePermissions[entity].length; i++) {
                removalIds[removalIds.length] = this.rolePermissions[entity][i].permissionId;
            }
        }
    }
    var j = 0;
    while (j < data.length) {
        if (removalIds.indexOf(data[j].permissionId) > -1 || data[j].lblPermissionsName.toLowerCase().indexOf(searchKey) === -1) {
            data.remove(data[j]);
        } else {
            j++;
        }
    }
    if (data.length > 0) {
        this.view.segAddOptions.setVisibility(true);
        this.view.lblAvailableOptionsNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
        this.view.lblAvailableOptionsNoRecords.setVisibility(false);
    } else {
        this.view.segAddOptions.setVisibility(false);
        this.view.lblAvailableOptionsNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\"" + searchKey
          + "\"." + "\n"+kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
        this.view.lblAvailableOptionsNoRecords.setVisibility(true);
    }
    this.view.segAddOptions.setData(data);
    this.view.btnAddAll.setVisibility(this.view.segAddOptions.data.length !== 0);
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
      this.view.lblAvailableOptionsNoRecords.text =kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.lblAvailableOptionsNoRecords.setVisibility(true);
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
      this.view.lblAvailableOptionsNoRecords.text =kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.lblAvailableOptionsNoRecords.setVisibility(false);
    }else{
      this.view.segAddOptions.setVisibility(false);
      this.view.lblAvailableOptionsNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchKey+"\"."
        +"\n" + kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
      this.view.lblAvailableOptionsNoRecords.setVisibility(true);
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
    if(!users || users === null|| users.length === 0){
      this.view.segViewSegment.setData([]);
      this.view.flxUsersHeader.setVisibility(false);
      this.view.lblNoResults.setVisibility(true);
      this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.forceLayout();
    }
    else {
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
        this.view.lblNoResults.setVisibility(false);
      } else {
        this.view.flxUsersHeader.setVisibility(false);
        this.view.lblNoResults.setVisibility(true);
        this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      }
      this.view.forceLayout();
    }
    }
  },
  setViewPermissionSegmentData : function(){
    var self  = this;
    var rolePermissions = [];
    if(this.isSingleEntity) {
      rolePermissions = self.roleDetailsObj.rolePermissions;
    } else {
      rolePermissions = self.legalEntitiesPermissionDataForRole[self.selectedLegalEntity];
    }
    var data = [];
    if (rolePermissions) {
    data = rolePermissions.map(function(permission) {

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
    }
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
    var segData = data.sort(this.permissionSorter.sortData);
    this.view.segViewSegment.setData(segData);
    this.view.segViewSegment.info = {
      "segData": []
    }
    this.view.segViewSegment.info.segData = segData.length > 0 ? segData : [];    
    if (data.length !== 0) {
      data[0].lblSeperator.isVisible=false;
      this.view.segViewSegment.setData(data);
      this.view.lblNoResults.setVisibility(false);
      this.view.flxPermissionsHeader.setVisibility(true);
      this.view.searchBoxViewSegment.setVisibility(true);
    } else {
      this.view.flxPermissionsHeader.setVisibility(false);
      this.view.lblNoResults.setVisibility(true);
      this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
      this.view.searchBoxViewSegment.setVisibility(false);
    }
    this.view.forceLayout();
  },

  setSelectedOptionsSegmentData: function () {
    var entity = "";
    if (this.isSingleEntity) {
        entity = this.legalEntityList[0].companyName;
    } else {
        entity = this.getEntityNameForLegalEntityId(this.view.segPermission.selectedItems[0].legalEntityId);
    }
    var data = [];
    var dataMap = {
        "flxAddOptionWrapper": "flxAddOptionWrapper",
        "flxClose": "flxClose",
        "flxOptionAdded": "flxOptionAdded",
        "fontIconClose": "fontIconClose",
        "lblOption": "lblOption",
        "legalEntityId": "legalEntityId"
    };
    var area = this.view.lblAddOptionsHeading.text;
    if (this.isSingleEntity) {
      if (this.addNewRolePath) {
        if (area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
          data = [];
        } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
          data = this.roleUsers;
        }
      } else {
        if (area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
          data = this.rolePermissions[entity];
        } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
          data = this.roleUsers;
        }
      }
    } else {
        if (area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
            if (this.view.segPermission.selectedItems[0].btnAddPermission.text === 'Add Permissions') {
                data = [];
            } else if (this.view.segPermission.selectedItems[0].btnAddPermission.text === 'Edit Permissions' && this.addNewRolePath) {
                data = this.rolePermissions[entity];
            } else {
              data = this.rolePermissions[entity] || this.orgPermissions[entity];
            }
        } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
            data = this.roleUsers;
        }
    }
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    if (data > 0) {
        this.view.segSelectedOptions.setVisibility(true);
    }
    this.view.segSelectedOptions.widgetDataMap = dataMap;
    this.view.segSelectedOptions.setData(data);
    this.view.btnRemoveAll.setVisibility(this.view.segSelectedOptions.data.length !== 0);
    this.showHidePlaceHolder();
    this.view.forceLayout();
  },

  onClickOptions: function () {
    let self = this;
    var segData = this.view.segPermissions.data;
    var selItems = this.view.segPermissions.selectedItems[0];
    
    this.roleId = selItems.roleId;
    this.selectedRoleLegalEntitiesData = selItems.legalEntitiesRoleInfo;
    this.legalEntityIdsForRole = selItems.legalEntityIds;
    
    let rowDataUpdatedTo = {
      "lblIconImgOptions": selItems.lblIconImgOptions,
      "fontIconStatusImg": selItems.fontIconStatusImg,
      "fontIconStatusImg1": selItems.fontIconStatusImg1,
      "lblDescription": selItems.lblDescription,
      "lblNoOfUsers": selItems.lblNoOfUsers,
      "lblPermissions": selItems.lblPermissions,
      "lblRoleName": selItems.lblRoleName,
      "lblRoleStatus": selItems.lblRoleStatus,
      "lblRoleStatus1": selItems.lblRoleStatus1,
      "lblSeperator": selItems.lblSeperator,
      "lblNoOfEntities": selItems.lblNoOfEntities,
      "roleId": selItems.roleId,
      "statusId": selItems.statusId,
      "legalEntityIds": selItems.legalEntityIds,
      "legalEntitiesRoleInfo": selItems.legalEntitiesRoleInfo,
      "legalEntitiesStatusData": selItems.legalEntitiesStatusData,
      //"lblValidTillDate": selItems.lblValidTillDate,
      "template": "flxRoles",
      "flxOptions": {
        "skin": this.view.flxSelectOptions.isVisible
          ? "slFbox"
          : "sknflxffffffop100Border424242Radius100px",
        "onClick": function () {
          self.onClickOptions();
        }
      },
      "flxRoles": {
        "onClick": function () {
          self.fetchRoleDetails(selItems.roleId, selItems.lblRoleName,
            selItems.lblDescription.text, selItems.statusId, selItems.legalEntitiesRoleInfo, selItems.legalEntityIds);
        }
      }
    };
    this.view.flxRoleStatusFilter.setVisibility(false);
    var clckd_selectedRowIndex = this.view.segPermissions.selectedRowIndex[1];
    kony.print("clckd_selectedRowIndex----" + JSON.stringify(clckd_selectedRowIndex));

    kony.print("selItems roles- skin---" + JSON.stringify(selItems));
    if (this.gblselIndex !== undefined && this.view.segPermissions.data[this.gblselIndex]) {
      this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
      this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
    }
    this.gblselIndex = this.view.segPermissions.selectedRowIndex[1];
    kony.print("this.gblsegRoles-- after setting the value-  if visible true-" + this.gblselIndex);
    kony.print("this.clckd_selectedRowIndex-- after setting the value-  if visible true-" + clckd_selectedRowIndex);
    if (this.isSingleEntity) {
      this.view.lblDescription.setVisibility(true);
      this.view.btnPermissions.setVisibility(true);
      if (selItems.lblRoleStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {

        if (this.view.flxSelectOptions.isVisible === true) {
          this.view.segPermissions.setDataAt(rowDataUpdatedTo, this.gblselIndex);
          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnRoles.setVisibility(this.isKeyCloakEnabled === true ? false : true);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
          this.view.btnPermissions.setVisibility(true);
          this.view.lblDescription.setVisibility(true);
          this.view.flxSeperator.setVisibility(true);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
          this.view.fontIconDeactivate.text = "";
          this.view.flxSelectOptions.isVisible = false; //flxTranspSknNormal
          this.view.forceLayout();
        }
        else if (this.view.flxSelectOptions.isVisible === false) {
          this.gblsegRoles = clckd_selectedRowIndex;
          var hgtValue = (((clckd_selectedRowIndex + 1) * 50) + 65);
          this.view.flxSelectOptions.top = this.mouseYCoordinate - 148 + "px";
          this.view.segPermissions.setDataAt(rowDataUpdatedTo, this.gblselIndex);
          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnRoles.setVisibility(this.isKeyCloakEnabled === true ? false : true);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
          this.view.btnPermissions.setVisibility(true);
          this.view.lblDescription.setVisibility(true);
          this.view.flxSeperator.setVisibility(true);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
          this.view.fontIconDeactivate.text = "";
          this.view.flxSelectOptions.isVisible = true;
          this.view.forceLayout();
          this.fixContextualMenu(this.mouseYCoordinate - 145);
        }
      } else {
        if (this.view.flxSelectOptions.isVisible === true) {
          this.view.flxSelectOptions.isVisible = false;  //flxTranspSknNormal
          this.view.forceLayout();
          this.view.segPermissions.setDataAt(rowDataUpdatedTo, this.gblselIndex);
          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnRoles.setVisibility(false);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
          this.view.btnPermissions.setVisibility(false);
          this.view.lblDescription.setVisibility(false);
          this.view.flxSeperator.setVisibility(false);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
          this.view.fontIconDeactivate.text = "";
        }
        else if (this.view.flxSelectOptions.isVisible === false) {

          this.gblsegRoles = clckd_selectedRowIndex;
          var hgtValue = (((clckd_selectedRowIndex + 1) * 50) + 65);
          kony.print("hgtValue in permissions------" + hgtValue);
          this.view.flxSelectOptions.top = this.mouseYCoordinate - 148 + "px";

          this.view.segPermissions.setDataAt(rowDataUpdatedTo, this.gblselIndex);

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
          this.fixContextualMenu(this.mouseYCoordinate - 148);
        }
      }
    } else {
      if (this.view.flxSelectOptions.isVisible === true) {
        this.view.segPermissions.setDataAt(rowDataUpdatedTo, this.gblselIndex);
        this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
        this.view.btnRoles.setVisibility(this.isKeyCloakEnabled === true ? false : true);
        this.view.btnRoles.setVisibility(false);
        this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
        this.view.btnPermissions.setVisibility(false);
        this.view.lblDescription.setVisibility(false);
        this.view.flxSeperator.setVisibility(false);
        this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
        this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        this.view.fontIconDeactivate.text = "";
        this.view.flxSelectOptions.isVisible = false; //flxTranspSknNormal
        this.view.forceLayout();
        //}
      }
      else if (this.view.flxSelectOptions.isVisible === false) {
        this.gblsegRoles = clckd_selectedRowIndex;
        var hgtValue = (((clckd_selectedRowIndex + 1) * 50) + 65);
        this.view.flxSelectOptions.top = this.mouseYCoordinate - 148 + "px";
        this.view.segPermissions.setDataAt(rowDataUpdatedTo, this.gblselIndex);
        this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
        this.view.btnRoles.setVisibility(this.isKeyCloakEnabled === true ? false : true);
        this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
        this.view.btnPermissions.setVisibility(false);
        this.view.lblDescription.setVisibility(false);
        this.view.flxSeperator.setVisibility(false);
        this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
        this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        this.view.fontIconDeactivate.text = "";
        this.view.flxSelectOptions.isVisible = true;
        this.view.forceLayout();
        this.fixContextualMenu(this.mouseYCoordinate - 145);
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

  // this is for single legal entity for activating / deactivating role
  DeactivatePermission: function () {
    var user_id = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.view.flxDeactivatePermission.setVisibility(false);
    let updateStatusTo = this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate") 
                         ? "SID_ACTIVE" : "SID_INACTIVE";
    let data = this.selectedRoleLegalEntitiesData[0];
    let legalEntitiesRoleInfo = [{
      "legalEntityId": data.legalEntityId,
      "Role_Details": {
        "id": this.roleId,
        "Status_id": data.Status_id === 'SID_ACTIVE' ? 'SID_INACTIVE' : 'SID_ACTIVE'
      }
    }];
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.onRoleUpdateChangeStatus(this.roleId, user_id, legalEntitiesRoleInfo, updateStatusTo);
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
  fetchRoleDetails: function(roleId,roleName,roleDesc,roleStatus,legalEntitiesRoleInfo,legalEntityIdsList){
    this.legalEntityIdsForRole = legalEntityIdsList;
    let legalEntityId = this.getCSVLegalEntityIds(legalEntityIdsList);
    var roleObj = { "roleId": roleId,  
                    "roleName": roleName,
                    "roleDesc": roleDesc,
                    "roleStatus": roleStatus,
                    "roleLegalEntitiesData": legalEntitiesRoleInfo,
                    "legalEntityId": legalEntityId
                  };
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
    else if(this.view.tbxRoleNameValue.text.trim().length < 5)
    {
      this.view.tbxRoleNameValue.skin="skinredbg";
      this.view.flxNoRoleNameError.setVisibility(true);
      this.view.lblNoRoleNameError.text=kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Name_Min_Limit");
      return false;
    }
    else if(this.view.tbxRoleNameValue.text.trim().length > 50)
    {
      this.view.tbxRoleNameValue.skin="skinredbg";
      this.view.flxNoRoleNameError.setVisibility(true);
      this.view.lblNoRoleNameError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Name_Max_Limit");
      return false;
    }
    else if (this.view.tbxRoleNameValue.enable && this.roleData && this.roleData.map(function (element) { return element.legalEntitiesRoleInfo[0].role_Name }).contains(this.roleDetails.lblRoleName)) {
      this.view.tbxRoleNameValue.skin = "skinredbg";
      this.view.flxNoRoleNameError.setVisibility(true);
      this.view.lblNoRoleNameError.text = "The role with this name already exists. Please rephrase the name";
      return false;
    } else if(this.view.tbxRoleNameValue.text.trim().match(new RegExp("[^a-zA-Z0-9 ]"))){
      this.view.tbxRoleNameValue.skin = "skinredbg";
      this.view.flxNoRoleNameError.setVisibility(true);
      this.view.lblNoRoleNameError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Name_cannot_conatin_specialCharacters");
      return false;
    } else {
      if(this.addNewRolePath){
        this.view.tbxRoleNameValue.skin = "skntbxLato35475f14px";
      } else {
        this.view.tbxRoleNameValue.skin = "sknTxtBoxf3f3f3Rad3pxbr1px";
      }
      this.view.flxNoRoleNameError.setVisibility(false);
      returnValue  = true;
    }
    if(this.view.txtRoleDescription.text === "" || this.view.txtRoleDescription.text.trim() ===""){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_Cannot_Be_empty");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    }else if(this.view.txtRoleDescription.text.trim().length < 5){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_min_limit");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    }else if(this.view.txtRoleDescription.text.trim().length > 300){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_max_limit");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    } else if(this.view.txtRoleDescription.text.trim().match(new RegExp("[^'\\\"a-zA-Z0-9 ,._-]"))){
      this.view.lblNoRoleDescriptionError.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Role_Description_Cannot_Conatin_specialCharacters");
      this.view.txtRoleDescription.skin = "skinredbg";
      this.view.flxNoRoleDescriptionError.isVisible = true;
      return false;
    } else {
      this.view.txtRoleDescription.skin="skntbxLato35475f14px";
      this.view.flxNoRoleDescriptionError.setVisibility(false);
      returnValue  = true;
    }
    if(this.view.flxLegalEntityVal.lblLegalEntityValue.text === "Select Legal Entity" || this.view.flxLegalEntityVal.lblLegalEntityValue.text === "0 Selected"){
      this.view.flxLegalEntityError.setVisibility(true);
      this.view.flxLegalEntityValue.skin = "skinredbg";
      return false;
    }else{
      this.view.flxLegalEntityValue.skin = "skntbxLato35475f14px";
      this.view.flxLegalEntityError.setVisibility(false);
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
    //this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled===true?false:true);
    this.view.flxAddUsers.setVisibility(false);
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddUsers,this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.view.flxAddRoleDetails.setVisibility(true);
    this.view.flxValidity.setVisibility(false);
    this.view.forceLayout(); 
  },
  selectAllRecords: function(){
    var self = this;
    var toAdd;
    var entity = "";
    if(!this.isSingleEntity) {
      entity = self.getEntityNameForLegalEntityId(self.view.segPermission.selectedItems[0].legalEntityId);
    } else {
      entity = self.view.lblLegalEntityValue.text;
    }
    var availableRecords = this.view.segAddOptions.data;
    var data = this.view.segSelectedOptions.data;
    this.view.btnRemoveAll.setVisibility(true);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);

    for (var i = 0; i < availableRecords.length; i++) {
      if(availableRecords[i].lblPermissionsName){
        self.view.lblAvailableOptionsNoRecords.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
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
        self.view.lblAvailableOptionsNoRecords.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
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
    this.rolePermissions[entity] = data;
    this.view.segAddOptions.removeAll();
    this.view.btnAddAll.setVisibility(false);
    if(data.length > 0){
      this.view.segSelectedOptions.isVisible = true;
    }
    this.view.segSelectedOptions.setData(data);
    this.view.lblAvailableOptionsNoRecords.setVisibility(true);
    //enable the buttons
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnNext,false,true);
    this.view.flxOptions.setEnabled(true);
    this.view.forceLayout();
  },
  unselectAllRecords: function(){
    var self = this;
    var toAddData;
    var entity = "";
    if(!this.isSingleEntity) {
      entity = self.getEntityNameForLegalEntityId(self.view.segPermission.selectedItems[0].legalEntityId);
    } else {
      entity = self.view.lblLegalEntityValue.text;
    }
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
    this.rolePermissions[entity] = [];
    this.view.segAddOptions.setData(availableRecords);
    this.view.lblAvailableOptionsNoRecords.setVisibility(availableRecords.length === 0);
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

  /**
   * performEntityStatusFilter- This function is used to filter the rolesList data based on 
   * legal entity names and statuses only for multiple legal entity
   */
  performEntityStatusFilter: function(){
    var self = this;
    var selEntity = [];
    var selEntityIndex;
    var entityDataToShow=[];
    var allEntityData = self.roleData;
    var segEntityData = self.view.statusFilterMenu.segEntityFilterDropdown.data;
    var entityIndices = self.view.statusFilterMenu.segEntityFilterDropdown.selectedIndices;
    let multiEntityActiveFilter = self.multiEntityStatusFilter.isActiveFilter;
    let multiEntityInActiveFilter = self.multiEntityStatusFilter.isInActiveFilter;
    if (self.view.mainHeader.flxDownloadList.info === undefined) {
      self.view.mainHeader.flxDownloadList.info = {};
    }
    let statuses = "";
    if (multiEntityActiveFilter) {
      statuses = statuses + "Active" + "_";
    }
    if (multiEntityInActiveFilter) {
      statuses = statuses + "Inactive" + "_";
    }
    if(statuses.length>0) {
      self.view.mainHeader.flxDownloadList.info.selectedStatusList = statuses.substring(0, statuses.length - 1);
    }
    let isFilterApplied = false;
    if (entityIndices !== null) {
        selEntityIndex = entityIndices[0][1];
        var entities = "";
        for (var i = 0; i< selEntityIndex.length;i++){
            let legalEntityName = segEntityData[selEntityIndex[i]].lblDescription;
            selEntity.push(legalEntityName);
            let legalEntityId = this.getEntityIdForLegalEntityName(legalEntityName);
            entities += legalEntityId + "_";
        }
        if(self.view.mainHeader.flxDownloadList.info === undefined) {
          self.view.mainHeader.flxDownloadList.info = {};
        }
        self.view.mainHeader.flxDownloadList.info.selectedLegalEntityList = entities.substring(0, entities.length-1);
    }
    isFilterApplied = selEntity.length > 0 || multiEntityActiveFilter || multiEntityInActiveFilter ? true : false;
    for (i = 0; i < allEntityData.length; i++) {
        legalEntitiesRoleInfo = allEntityData[i].legalEntitiesRoleInfo;
        for (j = 0; j < legalEntitiesRoleInfo.length; j++) {
            let legalEntityName = this.getEntityNameForLegalEntityId(legalEntitiesRoleInfo[j].legalEntityId);
            let Entitystatus = legalEntitiesRoleInfo[j].Status;
            let EntityFlag = selEntity.length > 0 ? selEntity.contains(legalEntityName) : false;
            if (EntityFlag || (Entitystatus === "Active" && multiEntityActiveFilter) || (Entitystatus === "Inactive" && multiEntityInActiveFilter)) {
                if (!entityDataToShow.contains(allEntityData[i]))
                    entityDataToShow.push(allEntityData[i]);
            }
        }
    }
    if (isFilterApplied) {
        if(entityDataToShow.length > 0 ){
            self.setRolesSegmentData(entityDataToShow, true);
        } else {
            self.view.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
            self.view.flxNoResultFound.setVisibility(true);
            self.view.flxNoResultFound.top = "60px";
            self.view.flxPermissionsContainer.height = "53%";
            self.view.flxRolesHeader.setVisibility(true);
            self.view.flxSegRoles.setVisibility(false);
            self.view.segPermissions.setData([]);
        }
    }
    else {
        self.setRolesSegmentData(allEntityData, false);
    }
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
        dataToShow = allData.filter(function (rec) {
          let legalEntityRoleInfo = rec.legalEntitiesRoleInfo[0];
          if (selStatus.indexOf(legalEntityRoleInfo.Status_Desc) >= 0) {
              return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setRolesSegmentData(dataToShow,true);
        } else {
          self.view.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
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
      self.view.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
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
      self.view.flxViewConfigureCsrCont.top = self.isSingleEntity ? "105dp" : "15dp";
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

  showAddServiceDefinitionsSingleEntity: function() {
      var self = this;
      self.hideAll();
      self.hideOptions();
      self.hideMainHeaderButtons();
      self.togglePermissionSuboptions(true);
      self.view.searchBoxCustAccess.tbxSearchBox.text = "";
      self.view.searchBoxCustAccess.flxSearchCancel.setVisibility(false);
      var widgetArray = [self.view.btnAddPermissions, self.view.btnAddUsers, self.view.btnOptionDetails];
      self.tabUtilVerticleButtonFunction(widgetArray, self.view.btnAddPermissions);
      var widgetArray2 = [self.view.btnAddSysPermissions, self.view.btnAddCustomerAccess];
      self.tabUtilVerticleButtonFunction(widgetArray2, self.view.btnAddCustomerAccess);
      self.tabUtilVerticleArrowVisibilityFunction(self.selectedArrowArray, self.view.lblIconCustomerAccessSelected);
      self.view.flxViews.setVisibility(true);
      self.hideMainSubHeader();
      self.view.flxAddMainContainer.setVisibility(true);
      // self.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
      self.view.flxAddUsers.setVisibility(false);
      self.view.flxAssignCustomerAccess.setVisibility(true);
      self.view.flxAddServices.setVisibility(false);
      self.view.commonButtons.btnCancel.left = "5px";
      self.view.commonButtons.btnSave.setVisibility(false);
      self.view.commonButtons.btnNext.setVisibility(true);
      self.view.commonButtons.btnNext.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      self.view.commonButtons.btnNext.hoverSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      self.view.btnBackCustAccess.setVisibility(false);
      self.view.ImageIcon.setVisibility(false);
      if(self.addNewRolePath){
        self.view.lblCustAccessHeading.text = kony.i18n.getLocalizedString("i18n.frmRoles.addServices");
      } else {
        self.view.lblCustAccessHeading.text = kony.i18n.getLocalizedString("i18n.frmRoles.editServices");
      }
      self.view.lblCustAccessHeading.setVisibility(true);
      self.view.lblCustAccessHeading.skin = "sknLblLatoRegular22px";
      self.view.flxRolesBreadCrumb.setVisibility(true);
      if(!self.legalEntityIdsForCreateRole || self.legalEntityIdsForCreateRole.length === 0){
        self.legalEntityIdsForCreateRole = [];
        self.legalEntityIdsForCreateRole[0] = {};
        self.legalEntityIdsForCreateRole[0].servicedefinitions = [];
      }
      self.setServiceDefSegDataCreate();
      self.view.flxSelectAllServices.setVisibility(true);
      self.view.lblSelectedEntity.setVisibility(false);
      if(self.view.segCustAccess.data && self.view.segCustAccess.data.length > 0) {
        self.view.lblSelectAllServices.setVisibility(true);
        self.view.searchBoxCustAccess.setVisibility(true);
        if(self.isAllServiceDefsSelected()) {
          self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.unSelectAllServices");
        } else {
          self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.selectAllServices");
        }
      } else {
        self.view.lblSelectAllServices.setVisibility(false);
        self.view.searchBoxCustAccess.setVisibility(false);
      }
      self.view.lblSelectAllServices.onClick = function() {
        let segCustAccessData = self.view.segCustAccess.data;
        let isAllServicesSelected = false; 
        if(self.isAllServiceDefsSelected()) {
          isAllServicesSelected = true;
        } else {
          isAllServicesSelected = false;
        }
        let srcimgCheckBox = 'checkboxselected.png';
        let isEnabled = true;
        let servDefIds = [];

        if(!isAllServicesSelected) {
          self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.unSelectAllServices");
          srcimgCheckBox = 'checkboxselected.png';
          isEnabled = true; 
        } else {
          self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.selectAllServices");
          srcimgCheckBox = 'checkboxnormal.png';
          isEnabled = false;
        }
 
        for (var i = 0; i < segCustAccessData.length; i++) {
          segCustAccessData[i][0].imgSectionCheckbox.src = srcimgCheckBox;
          let countOfServices = !isAllServicesSelected ? segCustAccessData[i][1].length : 0;
          segCustAccessData[i][0].lblCountActions.text = countOfServices;
          for (var j = 0; j < segCustAccessData[i][1].length; j++) {
            segCustAccessData[i][1][j].imgCheckbox.src = srcimgCheckBox;
            segCustAccessData[i][1][j].isEnabled = isEnabled;
            servDefIds.push(segCustAccessData[i][1][j].id);
          }
        }

        self.view.segCustAccess.setData(segCustAccessData);
        self.view.segCustAccess.info.segData = segCustAccessData;

        let LegalEntity = self.view.lblLegalEntityValue.text;
  
        if(self.addNewRolePath) {
          // for create role
          if (!isAllServicesSelected) {
            self.legalEntityIdsForCreateRole[0].servicedefinitions = servDefIds;
          } else {
            self.legalEntityIdsForCreateRole[0].servicedefinitions = [];
          }
        } else {
          // for edit role
          let orginalList = self.legalEntityNamesRoleServiceDefsDataMap[LegalEntity] || [];
          self.selectedRoleDetails[LegalEntity].addedServiceDefinitions = self.getUpdatedServiceDefListForLegalEntity(orginalList).AddedServiceDefinitions;
          self.selectedRoleDetails[LegalEntity].removedServiceDefinitions = self.getUpdatedServiceDefListForLegalEntity(orginalList).RemovedServiceDefinitions;
        }
      }
      self.view.flxAddPermssions.setVisibility(false);
      self.view.forceLayout();
  },
  /*show add-remove customer roles screen*/
  showAddServiceDefinitions: function () {
    var self = this;
    self.hideAll();
    self.hideOptions();
    self.hideMainHeaderButtons();
    self.togglePermissionSuboptions(true);
    self.view.searchBoxCustAccess.tbxSearchBox.text = "";
    self.view.searchBoxCustAccess.flxSearchCancel.setVisibility(false);
    var widgetArray = [self.view.btnAddPermissions, self.view.btnAddUsers, self.view.btnOptionDetails];
    self.tabUtilVerticleButtonFunction(widgetArray, self.view.btnAddPermissions);
    var widgetArray2 = [self.view.btnAddSysPermissions, self.view.btnAddCustomerAccess];
    self.tabUtilVerticleButtonFunction(widgetArray2, self.view.btnAddCustomerAccess);
    self.tabUtilVerticleArrowVisibilityFunction(self.selectedArrowArray, self.view.lblIconCustomerAccessSelected);
    self.view.flxViews.setVisibility(true);
    self.hideMainSubHeader();
    self.view.flxAddMainContainer.setVisibility(true);
    self.view.flxAssignCustomerAccess.setVisibility(true);
    self.view.flxAddServices.setVisibility(false);
    self.view.lblCustAccessHeading.setVisibility(false);
    self.view.ImageIcon.setVisibility(true);
    self.view.btnBackCustAccess.setVisibility(true);
    self.view.commonButtons.btnCancel.left = "20px";
    self.view.commonButtons.btnSave.setVisibility(true);
    self.view.commonButtons.btnNext.setVisibility(false);
    let entityName = self.getEntityNameForLegalEntityId(self.view.segServices.selectedItems[0].legalEntityId);
    self.view.lblSelectedEntity.text = "Selected Legal Entity: " + entityName;
    let entityId = self.getEntityIdForLegalEntityName(entityName);

    self.view.flxRolesBreadCrumb.setVisibility(true);
    self.setServiceDefSegDataCreate();

    // previous selected service definitions data for selected legal entity used for on back click
    let selectLEPrevServDefData = {
      "entityName": self.getEntityNameForLegalEntityId(self.view.segServices.selectedItems[0].legalEntityId),
      "addServiceBtnText": self.view.segServices.selectedItems[0].btnAddServices.text,
      "prevSegCustAccessData": JSON.parse(JSON.stringify(self.view.segCustAccess.data))
    };

    if (this.addNewRolePath === false) {
      // for edit role
      selectLEPrevServDefData = {
        ...selectLEPrevServDefData,
        "addedServiceDefinitions": self.selectedRoleDetails[entityName].addedServiceDefinitions || [],
        "orgServiceDefinitions": self.selectedRoleDetails[entityName].orgServiceDefinitions || [],
        "removedServiceDefinitions": self.selectedRoleDetails[entityName].removedServiceDefinitions || []
      };
    } else {
      // for create role
      let servDefIds = [];
      let segCustAccessData = self.view.segCustAccess.data;
      for (var i = 0; i < segCustAccessData.length; i++) {
        for (var j = 0; j < segCustAccessData[i][1].length; j++) {
          if(segCustAccessData[i][1][j].isEnabled || segCustAccessData[i][1][j].imgCheckbox.src === 'checkboxselected.png'){
            servDefIds.push(segCustAccessData[i][1][j].id);
          }
        }
      }
      selectLEPrevServDefData = {
        ...selectLEPrevServDefData,
        "servicedefinitions": servDefIds 
      };
    }

    self.view.btnBackCustAccess.onClick = function () {
      self.view.flxAssignCustomerAccess.setVisibility(false);
      // roll back to prev service def selected
      self.view.segCustAccess.setData(selectLEPrevServDefData.prevSegCustAccessData);
      self.view.segCustAccess.info.segData = selectLEPrevServDefData.prevSegCustAccessData;
      self.view.segServices.selectedRowItems[0].selectedCounts = self.getSelectedServiceDefCount();
      if (self.addNewRolePath === false) {
        // for edit role flow
        self.selectedRoleDetails[entityName].addedServiceDefinitions = selectLEPrevServDefData.addedServiceDefinitions;
        self.selectedRoleDetails[entityName].orgServiceDefinitions = selectLEPrevServDefData.orgServiceDefinitions;
        self.selectedRoleDetails[entityName].removedServiceDefinitions = selectLEPrevServDefData.removedServiceDefinitions;
      } else {
        // for create role flow
        for(let j=0; j<self.legalEntityIdsForCreateRole.length; j++){
          if(self.legalEntityIdsForCreateRole[j].legalEntityId === entityId){
            self.legalEntityIdsForCreateRole[j].servicedefinitions = selectLEPrevServDefData.serviceDefinitions || selectLEPrevServDefData.servicedefinitions || [];
            break;
          }
        }
      }
      let Response = self.view.segServices.data;
      self.showAddServices(Response);
      if (selectLEPrevServDefData.addServiceBtnText === "Edit Services" && self.addNewRolePath) {
        self.editServices(selectLEPrevServDefData.entityName);
      } else {
        self.selservices(selectLEPrevServDefData.entityName);
      }
    };

    self.view.lblSelectAllServices.onClick = function () {
      let segCustAccessData = self.view.segCustAccess.data;
      let isAllServicesSelected = false;
      if (self.isAllServiceDefsSelected()) {
        isAllServicesSelected = true;
      } else {
        isAllServicesSelected = false;
      }
      let srcimgCheckBox = 'checkboxselected.png';
      let isEnabled = true;
      let servDefIds = [];

      if (!isAllServicesSelected) {
        isAllServicesSelected = true;
        self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.unSelectAllServices");
        srcimgCheckBox = 'checkboxselected.png';
        isEnabled = true;
      } else {
        isAllServicesSelected = false;
        self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.selectAllServices");
        srcimgCheckBox = 'checkboxnormal.png';
        isEnabled = false;
      }

      for (var i = 0; i < segCustAccessData.length; i++) {
        segCustAccessData[i][0].imgSectionCheckbox.src = srcimgCheckBox;
        let countOfServices = isAllServicesSelected ? segCustAccessData[i][1].length : 0;
        segCustAccessData[i][0].lblCountActions.text = countOfServices;
        for (var j = 0; j < segCustAccessData[i][1].length; j++) {
          segCustAccessData[i][1][j].imgCheckbox.src = srcimgCheckBox;
          segCustAccessData[i][1][j].isEnabled = isEnabled;
          servDefIds.push(segCustAccessData[i][1][j].id);
        }
      }

      self.view.segCustAccess.setData(segCustAccessData);
      self.view.segCustAccess.info.segData = segCustAccessData;

      var LegalEntity = selectLEPrevServDefData.entityName;
      let segCustAccess = self.view.segCustAccess.data;

      if (self.addNewRolePath) {
        // for create role
        for (var i = 0; i < self.legalEntityIdsForCreateRole.length; i++) {
          let legalEntityId = self.legalEntityIdsForCreateRole[i].legalEntityId;
          let legalEntityName = self.getEntityNameForLegalEntityId(legalEntityId);
          if (legalEntityName === LegalEntity) {
            if (isAllServicesSelected) {
              self.legalEntityIdsForCreateRole[i].servicedefinitions = servDefIds;
            } else {
              self.legalEntityIdsForCreateRole[i].servicedefinitions = [];
            }
          }
        }
      } else {
        // for edit role
        let orginalList = self.legalEntityNamesRoleServiceDefsDataMap[LegalEntity] || [];
        self.selectedRoleDetails[LegalEntity].addedServiceDefinitions = self.getUpdatedServiceDefListForLegalEntity(orginalList).AddedServiceDefinitions;
        self.selectedRoleDetails[LegalEntity].removedServiceDefinitions = self.getUpdatedServiceDefListForLegalEntity(orginalList).RemovedServiceDefinitions;
      }
    };

    if (self.view.segCustAccess.data && self.view.segCustAccess.data.length > 0) {
      self.view.lblSelectAllServices.setVisibility(true);
      self.view.searchBoxCustAccess.setVisibility(true);
      if (self.isAllServiceDefsSelected()) {
        self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.unSelectAllServices");
      } else {
        self.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.selectAllServices");
      }
    } else {
      self.view.lblSelectAllServices.setVisibility(false);
      self.view.searchBoxCustAccess.setVisibility(false);
    }

    self.view.forceLayout();
  },
  getSelectedServiceDefCount: function () {
    var modifiedListID = [];
    var modifiedList = this.view.segCustAccess.data;
    for (var m = 0; m < modifiedList.length; m++) {
      for (var n = 0; n < modifiedList[m][1].length; n++) {
        if (modifiedList[m][1][n].isEnabled === true) {
          modifiedListID.push(modifiedList[m][1][n].id);
        }
      }
    }
    return modifiedListID.length;
  },
  isAllServiceDefsSelected: function () {
    let isAllServiceDefsSelected = true;
    var segList = this.view.segCustAccess.data;
    for (var m = 0; m < segList.length; m++) {
      for (var n = 0; n < segList[m][1].length; n++) {
        if (segList[m][1][n].isEnabled === false) {
          isAllServiceDefsSelected = false;
          break;
        }
      }
    }
    return isAllServiceDefsSelected;
  },
 showAddServices: function(ResPonse) {
    var self = this;
    self.togglePermissionSuboptions(true);
    self.view.flxViews.setVisibility(true);
    var widgetArray = [self.view.btnAddPermissions, self.view.btnAddUsers, self.view.btnOptionDetails];
    self.tabUtilVerticleButtonFunction(widgetArray, self.view.btnAddPermissions);
    var widgetArray2 = [self.view.btnAddSysPermissions, self.view.btnAddCustomerAccess];
    self.tabUtilVerticleButtonFunction(widgetArray2, self.view.btnAddCustomerAccess);
    self.tabUtilVerticleArrowVisibilityFunction(self.selectedArrowArray, self.view.lblIconCustomerAccessSelected);
    // self.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? true : false);
    self.view.flxAddUsers.setVisibility(false);
    self.view.flxAddServices.setVisibility(true);
    self.view.flxAddRoleDetails.setVisibility(false);
    self.view.flxAddPermssions.setVisibility(false);
    self.view.btnAddServiceCancel.onClick = function() {
        self.showRoles();
    }
    self.view.btnAddServiceNext.onClick = function() {
        self.view.flxAddServices.setVisibility(false);
        if (self.addNewRolePath === false) {
            var response = self.selectedRoleDetails;
            self.showAddPermissionsLegalEntityForEdits(response);
        } else {
            var response = self.view.segPermission.data;
            self.showAddPermissionsLegalEntity(response);
        }
    }
    var dataMap = {
        "flxServices": "flxServices",
        "flxRolesContainer": "flxRolesContainer",
        "lblLegalEntity": "lblLegalEntity",
        "lblServices": "lblServices",
        "btnAddServices": "btnAddServices",
        "lblSeperator": "lblSeperator",
        "lblRowSeparator": "lblRowSeparator",
        "legalEntityId": "legalEntityId"
    }
    this.view.segServices.widgetDataMap = dataMap;
    if (ResPonse === undefined) {
        if (self.addNewRolePath) {
            let selData = [];
            selData = this.selLEList.map(function(response) {
                let legalEntityName = self.getEntityNameForLegalEntityId(response);
                let finalSelectedCount = 0;
                let finalCount = 0;
                let allServiceDefsList = self.legalEntityNamesAllServiceDefsDataMap;
                if (allServiceDefsList && allServiceDefsList[legalEntityName]) {
                    finalCount = allServiceDefsList[legalEntityName].length;
                }
                return {
                    "btnAddServices": {
                        "text": (finalSelectedCount > 0 ? "Edit Services" : "Add Services"),
                        "onClick": function() {
                            self.showAddServiceDefinitions();
                        },
                    },
                    "lblLegalEntity": {
                        "text": self.getEntityNameForLegalEntityId(response),
                    },
                    "lblServices": {
                        "text": finalSelectedCount > 0 ?
                            finalSelectedCount + " of " + finalCount :
                            "00"
                    },
                    "lblSeperator": {},
                    "selectedCounts": 0,
                    "legalEntityId": response
                };
            });
            this.view.segServices.setData(selData);
            this.prevSegServicesData = JSON.parse(JSON.stringify(selData));
        } else {
            let selData = [];
            for (var legalEntity in self.selectedRoleDetails) {
                let legalEntityId = self.selectedRoleDetails[legalEntity].legalEntityId;
                let legalEntityName = self.getEntityNameForLegalEntityId(legalEntityId);
                let isLegalEntityAccessRestricted = self.selectedRoleDetails[legalEntity].isLegalEntityAccessRestricted;
                let serDefSize = self.legalEntityIdsAllServiceDefsDataMap && self.legalEntityIdsAllServiceDefsDataMap[legalEntityId] ? self.legalEntityIdsAllServiceDefsDataMap[legalEntityId].length : 0;
                let roleSerDefSize = self.legalEntityIdsRoleServiceDefsDataMap && self.legalEntityIdsRoleServiceDefsDataMap[legalEntityId] ? self.legalEntityIdsRoleServiceDefsDataMap[legalEntityId].length : 0;
                let rowData = {};
                rowData = {
                    "btnAddServices": {
                        "isVisible": isLegalEntityAccessRestricted ? !isLegalEntityAccessRestricted : true,
                        "text": roleSerDefSize > 0 ? "Edit Services" : "Add Services",
                        "onClick": function() {
                            if (!isLegalEntityAccessRestricted)
                                self.showAddServiceDefinitions();
                        },
                    },
                    "lblLegalEntity": {
                        "text": legalEntityName + (isLegalEntityAccessRestricted ?
                            " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" :
                            ""),
                        "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
                        "top": "10dp"
                    },
                    "lblServices": {
                        "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
                        "text": roleSerDefSize > 0 ? roleSerDefSize + " of " + serDefSize : "00"
                    },
                    "lblSeperator": {},
                    "selectedCounts": roleSerDefSize,
                    "legalEntityId": legalEntityId
                };
                selData.push(rowData);
            }
            this.view.segServices.setData(selData);
            this.prevSegServicesData = JSON.parse(JSON.stringify(selData));
        }
    } else {
      if (self.addNewRolePath) {
        var selectData = [];
        var legalEntitiesSelected = self.selLEList;
        var arr = [],existingDataJson ={};
        var seg = self.view.addLegalEntityPopup.segEntityList.data;
        for (var i = 0; i < ResPonse.length; i++) {
          existingDataJson[ResPonse[i].legalEntityId] = ResPonse[i];
        }
        for (let k = 0; k < legalEntitiesSelected.length; k++) {
          arr.push({
            "legalEntityId": legalEntitiesSelected[k],
            "selectedCounts": existingDataJson[legalEntitiesSelected[k]] ? existingDataJson[legalEntitiesSelected[k]].selectedCounts : 0
          });
        }

        selectData = arr.map(function(respon) {
            let finalSelectedCount = 0;
            let legalEntityName = self.getEntityNameForLegalEntityId(respon.legalEntityId);
            let finalCount = 0;
            let allServiceDefsList = self.legalEntityNamesAllServiceDefsDataMap;
            let isLegalEntityAccessRestricted = self.isLegalEntityAccessRestricted(respon.legalEntityId);
            if (allServiceDefsList && allServiceDefsList[legalEntityName]) {
                finalCount = allServiceDefsList[legalEntityName].length;
            }
            return {
                "btnAddServices": {
                    "isVisible": isLegalEntityAccessRestricted ? !isLegalEntityAccessRestricted : true,
                    "text": (respon.selectedCounts > 0 ? "Edit Services" : "Add Services"),
                    "onClick": function() {
                        if (!isLegalEntityAccessRestricted)
                            self.showAddServiceDefinitions();
                    },
                },
                "lblLegalEntity": {
                    "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
                    "text": legalEntityName + (isLegalEntityAccessRestricted ?
                        " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" :
                        "")
                },
                "lblServices": {
                    "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
                    "text": (respon.selectedCounts > 0 ? respon.selectedCounts + " of " + finalCount : "00")
                },
                "lblSeperator": {},
                "selectedCounts": respon.selectedCounts,
                "legalEntityId": respon.legalEntityId
            };
        });
        this.view.segServices.setData(selectData);
        this.prevSegServicesData = JSON.parse(JSON.stringify(selectData));
      }else{
        var selectData = [],selLEListJson = {},segDataToShow =[];
        var selectedLE = Object.values(self.selectedRoleDetails);
        for(let j=0; j<ResPonse.length; j++){
          selLEListJson[ResPonse[j].legalEntityId] = ResPonse[j];
        }
        //to get the selected LE list from detail screen
        for(let i=0; i<selectedLE.length; i++){
          var segLEIdArr = Object.keys(selLEListJson);
          if(!segLEIdArr.includes(selectedLE[i].legalEntityId)){ //if LE is selected newly
            segDataToShow.push({
              "legalEntityId": selectedLE[i].legalEntityId,
              "selectedCounts": 0
            });
          } else{ //if LE is already added
            segDataToShow.push(selLEListJson[selectedLE[i].legalEntityId]);
          }
        }
        selectData = segDataToShow.map(function(respon) {
          let legalEntityName = self.getEntityNameForLegalEntityId(respon.legalEntityId);
          let finalCount = 0;
          let allServiceDefsList = self.legalEntityNamesAllServiceDefsDataMap;
          let isLegalEntityAccessRestricted = self.isLegalEntityAccessRestricted(respon.legalEntityId);
          if (allServiceDefsList && allServiceDefsList[legalEntityName]) {
            finalCount = allServiceDefsList[legalEntityName].length;
          }
          return {
            "btnAddServices": {
              "isVisible": isLegalEntityAccessRestricted ? !isLegalEntityAccessRestricted : true,
              "text": (respon.selectedCounts > 0 ? "Edit Services" : "Add Services"),
              "onClick": function() {
                if (!isLegalEntityAccessRestricted) self.showAddServiceDefinitions();
              },
            },
            "lblLegalEntity": {
              "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
              "text": legalEntityName + (isLegalEntityAccessRestricted ? " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" : "")
            },
            "lblServices": {
              "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
              "text": (respon.selectedCounts > 0 ? respon.selectedCounts + " of " + finalCount : "00")
            },
            "lblSeperator": {},
            "selectedCounts": respon.selectedCounts,
            "legalEntityId": respon.legalEntityId
          };
        });
        this.view.segServices.setData(selectData);
        this.prevSegServicesData = JSON.parse(JSON.stringify(selectData));        
      }        
    }
 },
  showAddPermissionsLegalEntityForEdits: function (response) {
    var self = this;
    for (let LegalEntity in response) {
      if (!response[LegalEntity].isLegalEntityAccessRestricted) {
        let entity = self.getEntityNameForLegalEntityId(response[LegalEntity].legalEntityId);
        if (this.rolePermissions[entity] === undefined) {
          this.rolePermissions[entity] = [];
          this.AllPermissionsAfterRemoving[entity] = [];
        }
      }
    }
    var data = self.editPermissions;
    this.togglePermissionSuboptions(true);
    var widgetArray = [this.view.btnAddPermissions, this.view.btnAddUsers, this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnAddPermissions);
    var widgetArray2 = [this.view.btnAddSysPermissions, this.view.btnAddCustomerAccess];
    this.tabUtilVerticleButtonFunction(widgetArray2, this.view.btnAddSysPermissions);
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray, this.view.lblIconSysPermisionsSelected);
    // self.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? true : false);
    self.view.flxAddUsers.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    self.view.flxAddPermssions.setVisibility(true);
    self.view.btnAddPerCancel.onClick = function () {
      self.showRoles();
    }
    var dataMap = {
      "flxPermissions1": "flxPermissions1",
      "flxRolesContainer": "flxRolesContainer",
      "lblLegalEntity": "lblLegalEntity",
      "lblPermissions1": "lblPermissions1",
      "btnAddPermission": "btnAddPermission",
      "ImageCopyPer": "ImageCopyPer",
      "lblSeperator": "lblSeperator",
      "lblRowSeparator": "lblRowSeparator",
      "legalEntityId": "legalEntityId",
      "legalEntityName": "legalEntityName"
    };
    var data = [];
    var length = Object.keys(response).length;
    var selectedRoleDetails = this.selectedRoleDetails;
    for (var legalEntity in selectedRoleDetails) {
      let isLegalEntityAccessRestricted = self.selectedRoleDetails[legalEntity].isLegalEntityAccessRestricted;
      let legalEntityId = self.selectedRoleDetails[legalEntity].legalEntityId;
      let rowData = {};
      rowData = {
        "btnAddPermission": {
          "isVisible": isLegalEntityAccessRestricted ? !isLegalEntityAccessRestricted : true,
          "text": !isLegalEntityAccessRestricted ? (self.rolePermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length > 0 ? "Edit Permissions" : "Add Permissions") : "",
          "onClick": function () {
            self.view.flxAddPermssions.setVisibility(false);
            self.showAddPermissions();
          },
        },
        "lblLegalEntity": {
          "text": isLegalEntityAccessRestricted ? self.getEntityNameForLegalEntityId(legalEntityId) + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" 
                                                : self.getEntityNameForLegalEntityId(legalEntityId),
          "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px"
        },
        "ImageCopyPer": {
          "isVisible": (!isLegalEntityAccessRestricted && length > 1 && self.rolePermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length > 0) ? true : false,
          "onClick": function () {
            if (!isLegalEntityAccessRestricted) self.setCopyPermissionsData();
          },
        },
        "lblPermissions1": {
          "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
          "text": isLegalEntityAccessRestricted
            ? self.orgPermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length
            : (self.rolePermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length > 0)
              ? self.rolePermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length : "00"
        },
        "lblSeperator": {},
        "legalEntityId": legalEntityId,
        "selectedCountsforPer": isLegalEntityAccessRestricted
            ? self.orgPermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length
            : (self.rolePermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length > 0)
              ? self.rolePermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length : 0
      };
      data.push(rowData);
    };
    this.view.segPermission.widgetDataMap = dataMap;
    this.view.segPermission.setData(data);
  },
  showAddPermissionsLegalEntityForEdit: function () {
    var self = this;
    this.togglePermissionSuboptions(true);
    var widgetArray = [this.view.btnAddPermissions, this.view.btnAddUsers, this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnAddPermissions);
    var widgetArray2 = [this.view.btnAddSysPermissions, this.view.btnAddCustomerAccess];
    this.tabUtilVerticleButtonFunction(widgetArray2, this.view.btnAddSysPermissions);
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray, this.view.lblIconSysPermisionsSelected);
    //self.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? true : false);
    self.view.flxAddUsers.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    self.view.flxAddPermssions.setVisibility(true);
    self.view.btnAddPerCancel.onClick = function () {
      self.showRoles();
    }
    var dataMap = {
      "flxPermissions1": "flxPermissions1",
      "flxRolesContainer": "flxRolesContainer",
      "lblLegalEntity": "lblLegalEntity",
      "lblPermissions1": "lblPermissions1",
      "btnAddPermission": "btnAddPermission",
      "ImageCopyPer": "ImageCopyPer",
      "lblSeperator": "lblSeperator",
      "lblRowSeparator": "lblRowSeparator",
      "legalEntityId": "legalEntityId",
      "legalEntityName": "legalEntityName"
    };
    var data = [];
    var selectedRoleDetails = this.selectedRoleDetails;
    for (var legalEntity in self.selectedRoleDetails) {
      let isLegalEntityAccessRestricted = self.selectedRoleDetails[legalEntity].isLegalEntityAccessRestricted;
      let legalEntityId = self.selectedRoleDetails[legalEntity].legalEntityId;
      let permission_Count = self.selectedRoleDetails[legalEntity].permission_Count;
      let rowData = {};
      rowData = {
        "btnAddPermission": {
          "isVisible": isLegalEntityAccessRestricted ? !isLegalEntityAccessRestricted : true,
          "text": permission_Count > 0 ? "Edit Permissions" : "Add Permissions",
          "onClick": function () {
            if (!isLegalEntityAccessRestricted) {
              self.view.flxAddPermssions.setVisibility(false);
              self.showAddPermissions();
            }
          },
        },
        "lblLegalEntity": {
          "text": isLegalEntityAccessRestricted ? self.getEntityNameForLegalEntityId(legalEntityId) + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")" : self.getEntityNameForLegalEntityId(legalEntityId),
          "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px"
        },
        "ImageCopyPer": {
          "isVisible": (Object.keys(selectedRoleDetails).length > 1 && permission_Count > 0 && !isLegalEntityAccessRestricted) ? true : false,
          "onClick": function () {
            if (!isLegalEntityAccessRestricted)
              self.setCopyPermissionsData();
          },
        },
        "lblPermissions1": {
          "skin": isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "sknlblLatoBold35475f14px",
          "text": isLegalEntityAccessRestricted ? self.orgPermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length
                                                : permission_Count > 0 ? permission_Count : "00"
        },
        "lblSeperator": {},
        "legalEntityId": legalEntityId,
        "selectedCountsforPer": isLegalEntityAccessRestricted 
                                ? self.orgPermissions[self.getEntityNameForLegalEntityId(legalEntityId)].length
                                : permission_Count > 0 ? permission_Count : 0
      };
      data.push(rowData);
    }
    this.view.segPermission.widgetDataMap = dataMap;
    this.view.segPermission.setData(data);
  },
  showAddPermissionsLegalEntity: function(resPons) {
    var self = this;
    for (var i = 0; i < this.view.segPermission.data.length; i++) {
        let entity = this.getEntityNameForLegalEntityId(this.view.segPermission.data[i].legalEntityId);
        if (this.rolePermissions[entity] === undefined) {
            this.rolePermissions[entity] = [];
            this.AllPermissionsAfterRemoving[entity] = [];
        }
    }
    this.togglePermissionSuboptions(true);
    var widgetArray = [this.view.btnAddPermissions, this.view.btnAddUsers, this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnAddPermissions);
    var widgetArray2 = [this.view.btnAddSysPermissions, this.view.btnAddCustomerAccess];
    this.tabUtilVerticleButtonFunction(widgetArray2, this.view.btnAddSysPermissions);
    this.tabUtilVerticleArrowVisibilityFunction(this.selectedArrowArray, this.view.lblIconSysPermisionsSelected);
    //self.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? true : false);
    self.view.flxAddUsers.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    self.view.flxAddPermssions.setVisibility(true);
    self.view.btnAddPerCancel.onClick = function() {
        self.showRoles();
    }
    if (resPons === undefined || resPons.length === 0) {
        var dataMap = {
            "flxPermissions1": "flxPermissions1",
            "flxRolesContainer": "flxRolesContainer",
            "lblLegalEntity": "lblLegalEntity",
            "lblPermissions1": "lblPermissions1",
            "btnAddPermission": "btnAddPermission",
            "ImageCopyPer": "ImageCopyPer",
            "lblSeperator": "lblSeperator",
            "lblRowSeparator": "lblRowSeparator",
            "legalEntityId": "legalEntityId"
        }
        this.view.segPermission.widgetDataMap = dataMap;
        var selectedPerCount = 0;
        var legalEntityIds = this.selLEList;
        var selPerData = [];
        selPerData = legalEntityIds.map(function(response) {
            return {
                "btnAddPermission": {
                    "text": (selectedPerCount > 0 ? "Edit Permissions" : "Add Permissions"),
                    "onClick": function() {
                        self.view.flxAddPermssions.setVisibility(false);
                        self.showAddPermissions();
                    },
                },
                "lblLegalEntity": {
                    "text": self.getEntityNameForLegalEntityId(response)
                },
                "ImageCopyPer": {
                    "isVisible": selectedPerCount > 0 ? true : false,
                    "onClick": function() {
                        self.setCopyPermissionsData(self.getEntityNameForLegalEntityId(response));
                    },
                },
                "lblPermissions1": {
                    "text": selectedPerCount
                },
                "lblSeperator": {},
                "legalEntityId": response,
                "selectedCountsforPer": 0
            };
        });
        this.view.segPermission.setData(selPerData);
    } else {
        var selPermissionsData = [];
        var length = resPons.length;
        var legalEntityIds = this.selLEList;
        var Response = [];
        segData = this.view.segServices.data;
        for (var i = 0; i < segData.length; i++) {
            for (var k = 0; k < legalEntityIds.length; k++) {
                if (legalEntityIds[k] == segData[i].legalEntityId) {
                    if (resPons[k] != undefined && resPons[k]==legalEntityIds[k]) {
                        Response.push(
                            resPons[k]
                        )
                   }else if (resPons[k] === undefined || resPons[k]!=legalEntityIds[k]) {
                        var data = this.getWidgetMapdataEntity(legalEntityIds[k]);
                        Response.push(data[0])
                    }
                }
            }
        }
        selPermissionsData = Response.map(function(Res) {
            let entityName = self.getEntityNameForLegalEntityId(Res.legalEntityId);
            return {
                "btnAddPermission": {
                    "text": self.rolePermissions[entityName] ? (self.rolePermissions[entityName].length > 0 ? "Edit Permissions" : "Add Permissions") : "Add Permissions",
                    "onClick": function() {
                        self.view.flxAddPermssions.setVisibility(false);
                        self.showAddPermissions();
                    },
                },
                "lblLegalEntity": {
                    "text": entityName
                },
                "ImageCopyPer": {
                    "isVisible": self.rolePermissions[entityName]? (length > 1 && self.rolePermissions[entityName].length > 0) ? true : false :false,
                    "onClick": function() {
                        self.setCopyPermissionsData(Res);
                    },
                },
                "lblPermissions1": {
                    "text": self.rolePermissions[entityName] ? (self.rolePermissions[entityName].length > 0 ? self.rolePermissions[entityName].length : "00") : "00",
                },
                "lblSeperator": {},
                "legalEntityId": Res.legalEntityId,
                "selectedCountsforPer": self.rolePermissions[entityName] ? self.rolePermissions[entityName].length : 0
            };
        });
        this.view.segPermission.setData(selPermissionsData);
      } 
  },
  getWidgetMapdataEntity: function(legalEntityIds) {
    var self = this;
    var selPerData = [];
    var selectedPerCount = 0;
    selPerData = [legalEntityIds].map(function(response) {
        return {
            "btnAddPermission": {
                "text": (selectedPerCount > 0 ? "Edit Permissions" : "Add Permissions"),
                "onClick": function() {
                    self.view.flxAddPermssions.setVisibility(false);
                    self.showAddPermissions();
                },
            },
            "lblLegalEntity": {
                "text": self.getEntityNameForLegalEntityId(response)
            },
            "ImageCopyPer": {
                "isVisible": selectedPerCount > 0 ? true : false,
                "onClick": function() {
                    self.setCopyPermissionsData(self.getEntityNameForLegalEntityId(response));
                },
            },
            "lblPermissions1": {
                "text": selectedPerCount
            },
            "lblSeperator": {},
            "legalEntityId": response,
            "selectedCountsforPer": 0
        };
    });
    return selPerData;
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
    let legalEntityName = "";
    if(this.isSingleEntity){
      legalEntityName = this.view.lblLegalEntityValue.text;
    } else {
      legalEntityName = this.getEntityNameForLegalEntityId(this.view.segServices.selectedItems[0].legalEntityId);
    }
    let legalEntityNamesAllSerDefsMap = this.legalEntityNamesAllServiceDefsDataMap;
    let legalEntityNamesRoleSerDefsDataMap = this.legalEntityNamesRoleServiceDefsDataMap;
    let allServiceDefs = [];
    let roleServiceDefs = [];
    if(legalEntityNamesAllSerDefsMap && Object.keys(legalEntityNamesAllSerDefsMap).contains(legalEntityName)){
      allServiceDefs = legalEntityNamesAllSerDefsMap[legalEntityName];
    } 
    if(legalEntityNamesRoleSerDefsDataMap && Object.keys(legalEntityNamesRoleSerDefsDataMap).contains(legalEntityName)){
      roleServiceDefs = legalEntityNamesRoleSerDefsDataMap[legalEntityName];
    }
    let availableData = this.parseAllServiceDefinitions(allServiceDefs,roleServiceDefs);
    this.view.segCustAccess.widgetDataMap = this.getWidgetMapForServiceDefSeg();
    if(this.isSingleEntity){
      // check if the prev segment date of services is same as of servDefs response
      if(this.view.segCustAccess.data && this.view.segCustAccess.data.length !== 0 
        && JSON.stringify(availableData) !== JSON.stringify(this.view.segCustAccess.data)){
        availableData = this.view.segCustAccess.data;
      } 
    }
    else {
      let seletedData = this.servicesMappingCreateRole;
      let servicesdata = this.view.segServices.data;
      for (var k = 0; k < servicesdata.length; k++) {
        if (this.getEntityNameForLegalEntityId(servicesdata[k].legalEntityId) === legalEntityName) {
          if (servicesdata[k].btnAddServices.text === 'Add Services') {
            for (var i = 0; i < availableData.length; i++) {
              availableData[i][0].imgSectionCheckbox.src = 'checkboxnormal.png';
              availableData[i][0].lblCountActions.text = "0";
              for (var j = 0; j < availableData[i][1].length; j++) {
                availableData[i][1][j].imgCheckbox.src = 'checkboxnormal.png';
                availableData[i][1][j].isEnabled = false;
              }
            }
          }
          else if (servicesdata[k].btnAddServices.text === 'Edit Services') {
            if (Object.keys(seletedData).contains(legalEntityName)) {
              let servDefsForSelectedLE = seletedData[legalEntityName];
              for (var j = 0; j < servDefsForSelectedLE.types.length; j++) {
                for (var m = 0; m < availableData.length; m++) {
                  let checkBoxSelectedCount = 0;
                  if (availableData[m][0].type === servDefsForSelectedLE.types[j].id) {
                    availableData[m][0].imgSectionCheckbox.src = servDefsForSelectedLE.types[j].selimgforRow;
                    for (var n = 0, s = 0; n < availableData[m][1].length; n++) {
                      for(var s = 0; s < servDefsForSelectedLE.types[j].sectionData.length; s++)
                        if (availableData[m][1][n].id === servDefsForSelectedLE.types[j].sectionData[s].roleId) {
                          availableData[m][1][n].imgCheckbox.src = servDefsForSelectedLE.types[j].sectionData[s].selimgforSection;
                          availableData[m][1][n].isEnabled = servDefsForSelectedLE.types[j].sectionData[s].isEnabled;
                          if (availableData[m][1][n].imgCheckbox.src === 'checkboxselected.png') {
                            checkBoxSelectedCount++;
                          }
                        }
                    }
                    availableData[m][0].lblCountActions.text = checkBoxSelectedCount;
                  }
                }
              }
            }
          }
        }
      }
    }
    if(availableData && availableData.length > 0){
      this.view.segCustAccess.setData(availableData);
      this.view.segCustAccess.info.segData = availableData;
      this.view.flxServiceDefinitionSegment.setVisibility(true);
      this.view.flxCustAccessNoResults.setVisibility(false);
    } else{
      this.view.segCustAccess.setData([]);
      this.view.segCustAccess.info.segData = [];
      this.view.lblCustAccessNoResults.text = kony.i18n.getLocalizedString("i18n.frmRoles.NoServiceDefinitionsAvailable");
      this.view.flxServiceDefinitionSegment.setVisibility(false);
      this.view.flxCustAccessNoResults.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /* search for service definitions in create/edit role screen */
  searchServiceDefinitionsList: function(){
    var segData = this.view.segCustAccess.info.orgServiceList;
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.searchBoxCustAccess.tbxSearchBox.text, false);
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
        "\"."+ "\n" +kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
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
  getUpdatedPermissionList: function (entity) {
    var originalList = this.orgPermissions[entity];
    var modifiedList = this.rolePermissions[entity];
    var orginalListID = [],
      modifiedListID = [];
    var addedId = [];
    var removedId = [];
    if (originalList === undefined && modifiedList) {
      for (var k = 0; k < modifiedList.length; k++) {
        modifiedListID.push(modifiedList[k].permissionId);
      }
      addedId[entity] = modifiedListID;
      removedId[entity] = [];
    } else if (modifiedList === undefined && originalList) {
      for (var i = 0; i < originalList.length; i++) {
        orginalListID.push(originalList[i].permissionId);
      }
      removedId[entity] = [];
      addedId[entity] = [];
    } else {
      for (var i = 0; i < originalList.length; i++) {
        orginalListID.push(originalList[i].permissionId);
      }
      for (var k = 0; k < modifiedList.length; k++) {
        modifiedListID.push(modifiedList[k].permissionId);
      }
      addedId[entity] = this.updatedIdUsersPermissions(modifiedListID, orginalListID);
      removedId[entity] = this.updatedIdUsersPermissions(orginalListID, modifiedListID);
    }
    return {
      "AddedPermissions": addedId[entity],
      "RemovedPermissions": removedId[entity]
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
    this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);
    this.view.backToViewRole.setVisibility(false);
    this.view.flxLegalEntityDetails.setVisibility(false);
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmRoles.SearchByServiceTypeorService");
    this.view.searchBoxViewSegment.tbxSearchBox.onKeyUp = this.searchServices.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
    this.view.searchBoxViewSegment.flxSearchCancel.onClick = this.searchCancelServices.bind(this);
    this.tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2],this.view.lblTabName1);
    this.subTabsButtonWithBgUtilFunction([this.view.tabs.btnTab1,this.view.tabs.btnTab2],this.view.tabs.btnTab2);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.mainHeader.flxDropdownList.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewSegment.top = this.isSingleEntity ? "61dp" : "110dp";
    this.view.flxViewSegmentAndHeaders.top = "105dp";
    this.setLegalEntitiesServicDefsDataForRole();
    var serviceDefList = [];
    var allServiceDefList = [];
    if(this.isSingleEntity){
      serviceDefList = this.roleDetailsObj.roleServiceDefinition;
      allServiceDefList = this.roleDetailsObj.allServiceDefinitions;
    } else {
      serviceDefList = this.legalEntitiesServiceDataForRole[this.selectedLegalEntity];
      allServiceDefList = this.legalEntitiesServicDefsDataForRole[this.selectedLegalEntity];
    }
    this.view.segViewSegment.widgetDataMap = this.getWidgetMapForServiceDefSeg();
    var segData = this.setServiceDefinitionViewSegData(serviceDefList,allServiceDefList);
    this.view.segViewSegment.info = {
      "segData" : []
    };
    this.view.segViewSegment.info.segData = segData.length > 0 ? segData : [];
    this.view.segViewSegment.setData(segData);
    //this.view.flxViewSegment.setVisibility(segData.length > 0);
    if(segData.length > 0){
      this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmRoles.SearchByServiceTypeorService");
      this.view.searchBoxViewSegment.setVisibility(true);
    } else {
      this.view.searchBoxViewSegment.setVisibility(false);
    }
    this.view.lblNoResults.setVisibility(segData.length <= 0);  
    this.view.lblNoResults.text =  kony.i18n.getLocalizedString("i18n.frmRoles.NoServiceDefinitionsAvailable");
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
        "lblCountActions":{"text": self.getFormattedDigit(rowsData.length)},
        "lblTotalActions":{"text": ""},
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
  onCheckServiceDefCheckbox: function (segmentPath, isHeader, eventObj, context) {
    var selSecInd = context.sectionIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0;
    //on section checkbox click
    if (isHeader) {
        var img = (segSecData.imgSectionCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ?
            this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
        segSecData.imgSectionCheckbox.src = img;
        for (var i = 0; i < rowsData.length; i++) {
            rowsData[i].imgCheckbox.src = img;
            rowsData[i].isEnabled = img === this.AdminConsoleCommonUtils.checkboxnormal ? false : true;
            if (this.addNewRolePath) {
                let legalEntity = "";
                if (this.isSingleEntity) {
                    legalEntity = this.view.lblLegalEntityValue.text;
                    if(this.legalEntityIdsForCreateRole === undefined || this.legalEntityIdsForCreateRole.length ===0){
                        this.legalEntityIdsForCreateRole = [];
                        this.legalEntityIdsForCreateRole[0] = {};
                        this.legalEntityIdsForCreateRole[0].servicedefinitions = [];
                    }
                    if (rowsData[i].isEnabled) {
                        if (!this.legalEntityIdsForCreateRole[0].servicedefinitions.contains(rowsData[i].id))
                            this.legalEntityIdsForCreateRole[0].servicedefinitions.push(rowsData[i].id);
                    } else {
                        if (this.legalEntityIdsForCreateRole[0].servicedefinitions.contains(rowsData[i].id))
                            this.legalEntityIdsForCreateRole[0].servicedefinitions.remove(rowsData[i].id);
                    }
                } else {
                    legalEntity = this.getEntityNameForLegalEntityId(this.view.segServices.selectedItems[0].legalEntityId);
                    for (j = 0; j < this.selLEList.length; j++) {
                        if (this.getEntityNameForLegalEntityId(this.selLEList[j]) === legalEntity) {
                            if (rowsData[i].isEnabled) {
                                if (!this.legalEntityIdsForCreateRole[j].servicedefinitions.contains(rowsData[i].id))
                                    this.legalEntityIdsForCreateRole[j].servicedefinitions.push(rowsData[i].id);
                            } else {
                                if (this.legalEntityIdsForCreateRole[j].servicedefinitions.contains(rowsData[i].id))
                                    this.legalEntityIdsForCreateRole[j].servicedefinitions.remove(rowsData[i].id);
                            }
                        }
                    }
                }
            } else {
                let legalEntity = "";
                for (var legalEntityName in this.selectedRoleDetails) {
                    if (this.isSingleEntity || (!this.isSingleEntity 
                        && legalEntityName === this.getEntityNameForLegalEntityId(this.view.segServices.selectedItems[0].legalEntityId))) {
                        legalEntity = legalEntityName;
                        break;
                    }
                }
                var orginalList = this.legalEntityNamesRoleServiceDefsDataMap[legalEntity] || [];
                this.selectedRoleDetails[legalEntity].addedServiceDefinitions = this.getUpdatedServiceDefListForLegalEntity(orginalList).AddedServiceDefinitions;
                this.selectedRoleDetails[legalEntity].removedServiceDefinitions = this.getUpdatedServiceDefListForLegalEntity(orginalList).RemovedServiceDefinitions;
            }
        }
        selectedRowsCount = img === this.AdminConsoleCommonUtils.checkboxnormal ? "0" : "" + rowsData.length;
        segSecData.lblCountActions.text = selectedRowsCount;
        segmentPath.setSectionAt([segSecData, rowsData], selSecInd);
    }
    //on row checkbox click
    else {
        var selInd = segmentPath.selectedRowIndex[1];
        rowsData[selInd].isEnabled = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? true : false;
        rowsData[selInd].imgCheckbox.src = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
        segSecData.imgSectionCheckbox.src = this.getHeaderCheckboxImage(rowsData, true, true);
        selectedRowsCount = this.getSelectedRowsCount(rowsData);
        segSecData.lblCountActions.text = selectedRowsCount;
        if (this.addNewRolePath) {
            let legalEntity = "";
            if (this.isSingleEntity) {
                legalEntity = this.view.lblLegalEntityValue.text;
                if(this.legalEntityIdsForCreateRole === undefined || this.legalEntityIdsForCreateRole.length ===0){
                    this.legalEntityIdsForCreateRole = [];
                    this.legalEntityIdsForCreateRole[0] = {};
                    this.legalEntityIdsForCreateRole[0].servicedefinitions = [];
                }
                if (rowsData[selInd].isEnabled) {
                    if (!this.legalEntityIdsForCreateRole[0].servicedefinitions.contains(rowsData[selInd].id))
                        this.legalEntityIdsForCreateRole[0].servicedefinitions.push(rowsData[selInd].id);
                } else {
                    if (this.legalEntityIdsForCreateRole[0].servicedefinitions.contains(rowsData[selInd].id))
                        this.legalEntityIdsForCreateRole[0].servicedefinitions.remove(rowsData[selInd].id);
                }
            } else {
                legalEntity = this.getEntityNameForLegalEntityId(this.view.segServices.selectedItems[0].legalEntityId);
                for (j = 0; j < this.selLEList.length; j++) {
                    if (this.getEntityNameForLegalEntityId(this.selLEList[j]) === legalEntity) {
                        if (rowsData[selInd].isEnabled) {
                            if (!this.legalEntityIdsForCreateRole[j].servicedefinitions.contains(rowsData[selInd].id))
                                this.legalEntityIdsForCreateRole[j].servicedefinitions.push(rowsData[selInd].id);
                        } else {
                            if (this.legalEntityIdsForCreateRole[j].servicedefinitions.contains(rowsData[selInd].id))
                                this.legalEntityIdsForCreateRole[j].servicedefinitions.remove(rowsData[selInd].id);
                        }
                    }
                }
            }
        } else {
            let legalEntity = "";
            for (var legalEntityName in this.selectedRoleDetails) {
                if (this.isSingleEntity || (!this.isSingleEntity 
                  && legalEntityName === this.getEntityNameForLegalEntityId(this.view.segServices.selectedItems[0].legalEntityId))) {
                    legalEntity = legalEntityName;
                    break;
                }
            }
            var orginalList = this.legalEntityNamesRoleServiceDefsDataMap[legalEntity] || [];
            this.selectedRoleDetails[legalEntity].addedServiceDefinitions = this.getUpdatedServiceDefListForLegalEntity(orginalList).AddedServiceDefinitions;
            this.selectedRoleDetails[legalEntity].removedServiceDefinitions = this.getUpdatedServiceDefListForLegalEntity(orginalList).RemovedServiceDefinitions;
        }
        segmentPath.setSectionAt([segSecData, rowsData], selSecInd);
    }
    if(this.isAllServiceDefsSelected()) {
      this.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.unSelectAllServices");
    } else {
      this.view.lblSelectAllServices.text = kony.i18n.getLocalizedString("i18n.frmRoles.selectAllServices");
    }
  },
  getUpdatedServiceDefListForLegalEntity : function(orginalList){
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
        return (rowCount + "");
  },
  editServices: function (entity) {
    var LegalEntity = entity;
    var serseg = this.view.segCustAccess.data;
    if (Object.entries(this.servicesMappingCreateRole).length != 0 && Object.keys(this.servicesMappingCreateRole).contains(LegalEntity)) {
      let servicesForSelectedLE = this.servicesMappingCreateRole[LegalEntity];
      for (j = 0; j < servicesForSelectedLE.types.length; j++) {
        for (m = 0; m < serseg.length; m++) {
          if (servicesForSelectedLE.types[j].id === serseg[m][0].type) {
            servicesForSelectedLE.types[j].selimgforRow = serseg[m][0].imgSectionCheckbox.src;
          }
          for (k = 0; k < servicesForSelectedLE.types[j].sectionData.length; k++) {
            for (n = 0; n < serseg[m][1].length; n++) {
              if (servicesForSelectedLE.types[j].sectionData[k].roleId === serseg[m][1][n].id) {
                servicesForSelectedLE.types[j].sectionData[k].isEnabled = serseg[m][1][n].isEnabled;
                servicesForSelectedLE.types[j].sectionData[k].selimgforSection = serseg[m][1][n].imgCheckbox.src;
              }
            }
          }
        }
      }
    }
  },
  selservices: function (entity) {
    var LegalEntity = entity;
    var serseg = this.view.segCustAccess.data;
    var selImgRow = false;
    var selectedSer = {
      entityId: "",
      types: []
    };
    selectedSer.entityId = LegalEntity;
    for (i = 0; i < serseg.length; i++) {
      /*for row data*/
      var type = {
        id: "",
        selimgforRow: "",
        sectionData: []
      }
      type.id = serseg[i][0].type;
      type.selimgforRow = serseg[i][0].imgSectionCheckbox.src;
      if (serseg[i][0].imgSectionCheckbox.src === 'checkboxselected.png') {
        selImgRow = true
      } else {
        selImgRow = false
      }
      /*for section data*/
      for (k = 0; k < serseg[i][1].length; k++) {
        var secData = {
          roleId: "",
          isEnabled: "",
          selimgforSection: "",
        };
        secData.roleId = serseg[i][1][k].id;
        secData.isEnabled = serseg[i][1][k].isEnabled;
        secData.selimgforSection = serseg[i][1][k].imgCheckbox.src;
        type.sectionData.push(secData)
      }
      selectedSer.types.push(type)
    }
    this.servicesMappingCreateRole[LegalEntity] = selectedSer;
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
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
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
      "flxFlagImg":{"isVisible":false},
      "lblValue":{"text":"COUNTRY","left":"45dp"},
      "lblCurrencyValue":{"text":"CUR"},
      "template":"flxRolesLegalEntity"
    };
    var segRowData = data.map(function(rec){
      return{
        "flxCheckbox":{"onClick" :self.onCheckLegalEntityItem.bind(self)},
        "imgCheckBox":{"src":self.AdminConsoleCommonUtils.checkboxnormal},
        "flxFlagImg":{"isVisible":true, "onClick" :""},
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
      segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].isEnabled = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? true : false;
      rowsData[selInd].imgCheckbox.src = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      segSecData.imgTopCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"imgCheckbox",false);
      segSecData.lblCountActions.text = selectedRowsCount;
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
  
  searchEntityAddModifyLegalEntityPopup: function () {
    let scope = this;
    let segData = this.view.addLegalEntityPopup.segEntityList.info.data;
    let searchText = scope.AdminConsoleCommonUtils.getEncodedTextInput(scope.view.addLegalEntityPopup.searchBox.tbxSearchBox.text, false);
    let segFilteredData = [];
    if (searchText === "") {
      segFilteredData = segData;
      scope.view.addLegalEntityPopup.searchBox.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scope.view.addLegalEntityPopup.searchBox.flxSearchCancel.setVisibility(false);
    } else {
      scope.view.addLegalEntityPopup.searchBox.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      scope.view.addLegalEntityPopup.searchBox.flxSearchCancel.setVisibility(true);
      segFilteredData = segData.filter(function (segRecord) {
        let entityName = segRecord.lblEntityName.text;
        if (entityName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          return segRecord;
        }
      });
      segFilteredData.sort(this.sortBy.sortData);
    }
    if (segFilteredData.length === 0) {
      this.view.addLegalEntityPopup.flxNoResult.top = "20dp";
      this.view.addLegalEntityPopup.lblNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\""
        + searchText + "\"." + "\n"+ kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
      this.view.addLegalEntityPopup.flxNoResult.setVisibility(true);
      this.view.addLegalEntityPopup.flxLegalEntityStatus.setVisibility(false);
    } else {
      this.view.addLegalEntityPopup.flxNoResult.setVisibility(false);
      this.view.addLegalEntityPopup.flxLegalEntityStatus.setVisibility(true);
    }
    this.view.addLegalEntityPopup.segEntityList.setData(segFilteredData);
    this.view.forceLayout();
  },

  searchCancelAddModifyLegalEntityPopup: function(){
    this.view.addLegalEntityPopup.searchBox.tbxSearchBox.text = "";
    this.searchEntityAddModifyLegalEntityPopup();
  },
  
  searchCancelLegalEntity: function(){
    this.view.searchBoxViewSegment.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.searchLegalEntity();
  },

  searchCancelPermissions: function(){
    this.view.searchBoxViewSegment.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.searchPermissions();
  },

  searchCancelServices: function(){
    this.view.searchBoxViewSegment.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.searchServices();
  },

  searchLegalEntity: function() {
    var segData = this.view.segViewSegment.info.segData;
    var segFilteredData = [];
    var searchText = this.view.searchBoxViewSegment.tbxSearchBox.text;
    if (this.view.searchBoxViewSegment.tbxSearchBox.text === "") {
        segFilteredData = segData;
        this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
        this.view.flxLegalEntityPermissionServiceHeader.setVisibility(true);
        this.view.lblNoResults.setVisibility(false);
    }
    else {
        this.view.searchBoxViewSegment.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(true);
        segFilteredData = segData.filter(function (entity) {
            if (entity.lblName.text.toLowerCase().includes(searchText.toLowerCase())) {
              return entity;
            }
        });
        if(segFilteredData.length === 0){
          this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);
          this.view.lblNoResults.setVisibility(true);
          var encodedText = this.AdminConsoleCommonUtils.getEncodedTextInput(searchText, false);
          this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+encodedText+"\"."
            +"\n"+kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
        } else {
          this.view.flxLegalEntityPermissionServiceHeader.setVisibility(true);
          this.view.lblNoResults.setVisibility(false);
        }
    }
    (segFilteredData.length > 0) ? segFilteredData[0].lblSeperator.isVisible = false : "";
    this.view.segViewSegment.setData(segFilteredData);
    this.view.forceLayout();
  },

  searchPermissions: function() {
    var segData = this.view.segViewSegment.info.segData;
    var searchText = this.view.searchBoxViewSegment.tbxSearchBox.text;
    var segFilteredData = [];
    if (this.view.searchBoxViewSegment.tbxSearchBox.text === "") {
      segFilteredData = segData;
      this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
      this.view.flxPermissionsHeader.setVisibility(true);  
      this.view.lblNoResults.setVisibility(false);
    }
    else {
        this.view.searchBoxViewSegment.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(true);
        segFilteredData = segData.filter(function (permission) {
            if (permission.lblPermissionName.text.toLowerCase().includes(searchText.toLowerCase())) {
              return permission;
            }
        });
        if(segFilteredData.length === 0){
          this.view.flxPermissionsHeader.setVisibility(false);
          this.view.lblNoResults.setVisibility(true);
          var encodedText = this.AdminConsoleCommonUtils.getEncodedTextInput(searchText, false);
          this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+encodedText+"\"."
            +"\n"+kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
        } else {
          this.view.flxPermissionsHeader.setVisibility(true);  
          this.view.lblNoResults.setVisibility(false);
        }
    }
    (segFilteredData.length > 0) ? segFilteredData[0].lblSeperator.isVisible = false : "";
    this.view.segViewSegment.setData(segFilteredData);
    this.view.forceLayout(); 
  },

  searchServices: function() {
    var segData = this.view.segViewSegment.info.segData;
    var searchText = this.view.searchBoxViewSegment.tbxSearchBox.text;
    var segFilteredData = [];
    if (this.view.searchBoxViewSegment.tbxSearchBox.text === "") {
      segFilteredData = segData;
      this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
      this.view.lblNoResults.setVisibility(false);
    } else {
      this.view.searchBoxViewSegment.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(true);
      segFilteredData = segData.filter(function(segRecord) {
        var servicTypeName = segRecord[0].lblFeatureName.text;
        if (servicTypeName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
          return segRecord;
        } else {
          for (var j = 0; j < segRecord[1].length; j++) {
            var serviceName = segRecord[1][j].lblServiceDefName.text;
            if (serviceName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
              return segRecord;
            }
          }
        }
      });
      if(segFilteredData.length === 0){
        this.view.lblNoResults.setVisibility(true);
        var encodedText = this.AdminConsoleCommonUtils.getEncodedTextInput(searchText, false);
        this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+encodedText+"\"."+"\n"
          +kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
      } else {
        this.view.lblNoResults.setVisibility(false);
      }
    }
    this.view.segViewSegment.setData(segFilteredData);
    this.view.forceLayout();
  },
  
  showViewRoles: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.view.flxViewContainer1.setVisibility(true);
    this.view.flxViewTabs.setVisibility(true);
    this.view.flxViewDetailsSubTabs.setVisibility(true);
    this.view.flxLegalEntityPermissionServiceHeader.setVisibility(true);
    this.view.flxPermissionsHeader.setVisibility(false);

    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.text = this.roleName;
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.backToViewRole.setVisibility(false);

    this.view.flxLegalEntityDetails.top = "0dp";
    this.view.flxLegalEntityDetails.setVisibility(false);
    this.view.flxPermissionsHeader.top = "50dp";
    this.view.flxViewSegment.top = "110dp";
    this.view.flxViewSegmentAndHeaders.top = "105dp";
    this.view.lblNoResults.top = "80dp";
    this.view.forceLayout();

    this.currentView === "LegalEntityPermissions" 
    ? this.showViewLegalEntitiesPermissionSegmentAndHeader() 
    : this.showViewLegalEntitiesServiceSegmentAndHeader();
    kony.adminConsole.utils.hideProgressBar(this.view);
  },

  viewLegalEntityPermissions: function(legalEntityId){
    let legalEntityInfo = {};
    let roleLegalEntitiesData = this.roleDetailsObj.roleDetails.roleLegalEntitiesData;
    roleLegalEntitiesData.map(function (roleLegalEntityData) {
      if (roleLegalEntityData.legalEntityId && roleLegalEntityData.legalEntityId === legalEntityId) {
        legalEntityInfo = roleLegalEntityData;
      }
    });
    this.view.lblLegalEntityName.text = this.getEntityNameForLegalEntityId(legalEntityInfo.legalEntityId);
    this.selectedLegalEntity = legalEntityInfo.legalEntityId;
    this.view.lblLegalEntityStatusValue.text = legalEntityInfo.Status === "Active" ? "Active" : "InActive";
    this.view.lblLegalEntityStatusIcon.skin = legalEntityInfo.Status === "Active" ? "sknFontIconActivate" : "sknfontIconInactive";
    kony.adminConsole.utils.showProgressBar(this.view);
    this.setViewPermissionSegmentData();

    this.currentView = "LegalEntityPermissions";
    this.view.flxViewContainer1.setVisibility(false);
    this.view.flxViewTabs.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(false);
    this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);

    this.view.backToViewRole.setVisibility(true);
    this.view.backToViewRole.flxBack.onClick = this.showViewRoles.bind(this);
    this.view.backToViewRole.btnBack.onClick = this.showViewRoles.bind(this);

    // breadcrumb
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.text = this.roleName;
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.onClick = this.showViewRoles.bind(this);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.roles.SYSTEM_PERMISSIONS");
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);

    //searchbox
    this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmRoles.SearchByPermission");
    this.view.searchBoxViewSegment.tbxSearchBox.onKeyUp = this.searchPermissions.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.onClick = this.searchCancelPermissions.bind(this);

    this.view.flxLegalEntityDetails.top = "50dp";
    this.view.flxLegalEntityDetails.setVisibility(true);
    this.view.flxPermissionsHeader.top = "110dp";
    this.view.flxViewSegment.top = "170dp";
    this.view.flxViewSegmentAndHeaders.top = "10dp";
    this.view.lblNoResults.top = "120dp";
    this.view.forceLayout();

    var segData = this.view.segViewSegment.data;
    this.view.segViewSegment.info = {
      "segData": []
    }
    this.view.segViewSegment.info.segData = segData.length > 0 ? segData : [];
    kony.adminConsole.utils.hideProgressBar(this.view);
  },

  viewLegalEntityServices: function(legalEntityId){
    let legalEntityInfo = {};
    let roleLegalEntitiesData = this.roleDetailsObj.roleDetails.roleLegalEntitiesData;
    roleLegalEntitiesData.map(function (roleLegalEntityData) {
      if (roleLegalEntityData.legalEntityId && roleLegalEntityData.legalEntityId === legalEntityId) {
        legalEntityInfo = roleLegalEntityData;
      }
    });
    this.view.lblLegalEntityName.text = this.getEntityNameForLegalEntityId(legalEntityInfo.legalEntityId);
    this.selectedLegalEntity = legalEntityInfo.legalEntityId;
    this.view.lblLegalEntityStatusValue.text = legalEntityInfo.Status === "Active" ? "Active" : "InActive";
    this.view.lblLegalEntityStatusIcon.skin = legalEntityInfo.Status === "Active" ? "sknFontIconActivate" : "sknfontIconInactive";
    kony.adminConsole.utils.showProgressBar(this.view);
    this.viewServiceDefinitionsForARole();

    this.currentView = "LegalEntityServices"; 
    this.view.flxViewContainer1.setVisibility(false);
    this.view.flxViewTabs.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(false);
    this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);

    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.backToViewRole.setVisibility(true);
    this.view.backToViewRole.flxBack.onClick = this.showViewRoles.bind(this);
    this.view.backToViewRole.btnBack.onClick = this.showViewRoles.bind(this);

    // breadcrumb
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.text = this.roleName;
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.onClick = this.showViewRoles.bind(this);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.roles.CUSTOMER_ACCESS");
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);

    //searchbox
    this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmRoles.SearchByServiceTypeorService");
    this.view.searchBoxViewSegment.tbxSearchBox.onKeyUp = this.searchServices.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.onClick = this.searchCancelServices.bind(this);

    this.view.flxLegalEntityDetails.top = "50dp";
    this.view.flxLegalEntityDetails.setVisibility(true);
    this.view.flxPermissionsHeader.top = "110dp";
    this.view.flxViewSegment.top = "110dp";
    this.view.flxViewSegmentAndHeaders.top = "10dp";
    this.view.lblNoResults.top = "120dp";

    this.view.forceLayout();
    var segData = this.view.segViewSegment.data;
    this.view.segViewSegment.info = {
      "segData": []
    }
    this.view.segViewSegment.info.segData = segData.length > 0 ? segData : [];
    kony.adminConsole.utils.hideProgressBar(this.view);
  },

  showViewLegalEntitiesPermissionSegmentAndHeader: function(){
    var scopeObj = this;

    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.ROLES");
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxRolesBreadCrumb.setVisibility(true);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxViewPermissions.setVisibility(true);
    this.tabUtilLabelFunction([this.view.lblTabName1, this.view.lblTabName2], this.view.lblTabName1);
    this.subTabsButtonWithBgUtilFunction([this.view.tabs.btnTab1, this.view.tabs.btnTab2], this.view.tabs.btnTab1);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.mainHeader.flxDropdownList.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewDetailsSubTabs.setVisibility(true);
    this.view.flxViewSegmentAndHeaders.top = "105dp";
    this.view.flxViewSegment.top = "110dp";
    this.view.forceLayout();

    this.view.lblViewPermissionServiceCount.text = kony.i18n.getLocalizedString("i18n.permission.PERMISSIONS");
    
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.legalEntity.searchLegalEntity");
    this.view.searchBoxViewSegment.tbxSearchBox.onKeyUp = this.searchLegalEntity.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.onClick = this.searchCancelLegalEntity.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
    this.view.searchBoxViewSegment.setVisibility(true);

    let legalEntitiesPermissionsDataForRole = this.getLegalEntitiesPermissionsDataForRole();
    var dataMap = {
      "lblName": "lblName",
      "lblDescription": "lblDescription",
      "lblSeperator": "lblSeperator",
      "template": "template"
    };
    var segData = [];
    for (legalEntity in legalEntitiesPermissionsDataForRole) {
      let legalEntityId = legalEntity;
      let isLegalEntityAccessRestricted = this.isLegalEntityAccessRestricted(legalEntityId,"VIEW");
      let legalEntityName = this.getEntityNameForLegalEntityId(legalEntityId);
      let legalEntityPermissionRoleData = legalEntitiesPermissionsDataForRole[legalEntityId];
      segData.push({
        "lblDescription": {
                        "text": scopeObj.getFormattedDigit(legalEntityPermissionRoleData.length),
                        "skin" : isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "slLabel29327645px",
                      },
        "lblName": { "text": isLegalEntityAccessRestricted ? legalEntityName + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")": legalEntityName,
                     "tooltip": isLegalEntityAccessRestricted ? legalEntityName + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") +")": legalEntityName,
                     "skin" : isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "slLabel29327645px",
                     "info": {"value": legalEntityName}
                   },
        "lblSeperator": {
          "isVisible": true,
          "text": "-"
        },
        "template": "flxViewLegalEntity",
        "onRowClick" : function(){
          if(!isLegalEntityAccessRestricted) {
            scopeObj.viewLegalEntityPermissions(legalEntityId);
          }
        }
      });
    }
    segData = segData.sort(this.LegalEntitySorter.sortData);
    this.view.segViewSegment.widgetDataMap = dataMap;
    this.view.segViewSegment.info = {
      "segData": []
    }
    this.view.segViewSegment.info.segData = segData.length > 0 ? segData : [];
    if (segData.length !== 0) {
      segData[0].lblSeperator.isVisible=false;
      this.view.segViewSegment.setData(segData);
      this.view.lblNoResults.setVisibility(false);
      this.view.flxLegalEntityPermissionServiceHeader.setVisibility(true);
    } else {
      this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);
      this.view.searchBoxViewSegment.setVisibility(false);
      this.view.segViewSegment.setData([]);
      this.view.lblNoResults.setVisibility(true);
      this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
    }
  },

  showViewLegalEntitiesServiceSegmentAndHeader: function(){
    var scopeObj = this;
    this.view.searchBoxViewSegment.tbxSearchBox.text = "";
    this.view.searchBoxViewSegment.flxSearchCancel.setVisibility(false);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
    this.view.mainHeader.flxDropdownList.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCsrCont.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.top = "105dp";
    this.view.flxViewSegment.top = "110dp";
    this.view.forceLayout();
    
    this.tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2],this.view.lblTabName1);
    this.subTabsButtonWithBgUtilFunction([this.view.tabs.btnTab1,this.view.tabs.btnTab2],this.view.tabs.btnTab2);
    
    this.view.lblViewPermissionServiceCount.text = kony.i18n.getLocalizedString("i18n.frmServiceManagementController.SERVICES");
    this.view.searchBoxViewSegment.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.legalEntity.searchLegalEntity");
    this.view.searchBoxViewSegment.tbxSearchBox.onKeyUp = this.searchLegalEntity.bind(this);
    this.view.searchBoxViewSegment.flxSearchCancel.onClick = this.searchCancelLegalEntity.bind(this);
    this.view.searchBoxViewSegment.setVisibility(true);
    
    let legalEntitiesServicesDataForRole = this.getLegalEntitiesServicesDataForRole();
    var dataMap = {
      "lblName": "lblName",
      "lblDescription": "lblDescription",
      "lblSeperator": "lblSeperator",
      "template": "template"
    };
    var segData = [];
    this.setLegalEntitiesServicDefsDataForRole();
    for (legalEntity in legalEntitiesServicesDataForRole) {
      let legalEntityId = legalEntity;
      let isLegalEntityAccessRestricted = this.isLegalEntityAccessRestricted(legalEntityId);
      let legalEntitiesServiceDataForRole = legalEntitiesServicesDataForRole[legalEntityId];
      let legalEntityName = this.getEntityNameForLegalEntityId(legalEntityId);
      let legalEntityServDefCount = scopeObj.getFormattedDigit(legalEntitiesServiceDataForRole.length) + " of " + 
                            scopeObj.getFormattedDigit(this.legalEntitiesServicDefsDataForRole[legalEntityId].length);
      segData.push({
        "lblDescription": {
                        "text": legalEntityServDefCount,
                        "skin" : isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "slLabel29327645px",
                      },
        "lblName": { "text": isLegalEntityAccessRestricted ? legalEntityName + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")": legalEntityName,
                     "tooltip": isLegalEntityAccessRestricted ? legalEntityName + " (" + kony.i18n.getLocalizedString("i18n.frmRoles.accessRestricted") + ")": legalEntityName,
                     "skin" : isLegalEntityAccessRestricted ? "sknLblLato485c7513pxOp60" : "slLabel29327645px",  
                     "info": {"value": legalEntityName}
                   },
        "lblSeperator": {
          "isVisible": true,
          "text": "-"
        },
        "template": "flxViewLegalEntity",
        "onRowClick" : function(){
          if(!isLegalEntityAccessRestricted) {
            scopeObj.viewLegalEntityServices(legalEntityId);
          }
        }

      });
    }
    segData = segData.sort(this.LegalEntitySorter.sortData);
    this.view.segViewSegment.widgetDataMap = dataMap;
    this.view.segViewSegment.info = {
      "segData": []
    }
    this.view.segViewSegment.info.segData = segData.length > 0 ? segData : [];
    if (segData.length !== 0) {
      segData[0].lblSeperator.isVisible=false;
      this.view.segViewSegment.setData(segData);
      this.view.lblNoResults.setVisibility(false);
      this.view.flxLegalEntityPermissionServiceHeader.setVisibility(true);
    } else {
      this.view.flxLegalEntityPermissionServiceHeader.setVisibility(false);
      this.view.searchBoxViewSegment.setVisibility(false);
      this.view.segViewSegment.setData([]);
      this.view.lblNoResults.setVisibility(true);
      this.view.lblNoResults.text = kony.i18n.getLocalizedString("i18n.frmRoles.NoServiceDefinitionsAvailable");
    }
  },

  isLegalEntityAccessRestricted: function (legalEntityId,context) {
    if (legalEntityId) {
      let isAccessRestricted = true,isUserRestricted = true, isPermissionRestricted = true;
      let currUserLegalEntityList = this.currUserLegalEntityList;
      var screen = (context && context === "VIEW") ? "VIEW": (this.addNewRolePath === true ? "CREATE":"UPDATE");
      let lePermissionsList = this.getLEListForFormAction("frmRoles", screen);
      let AllLegalEntityList = this.legalEntityList;
      for (let i = 0; i < currUserLegalEntityList.length; i++) {
        if (currUserLegalEntityList[i].id === legalEntityId) {
          isUserRestricted = false;
          break;
        }
      }
      for( let j=0; j<lePermissionsList.length; j++){
        if(lePermissionsList[j].id === legalEntityId){
          isPermissionRestricted = false;
          break;
        }
      }
      isAccessRestricted = isUserRestricted  || isPermissionRestricted ;
      return isAccessRestricted;
    }
  },

  getFormattedDigit: function(number){
    if(number > 0 && number < 10){
      return "0"+number;
    } else return ""+number;
  },

  getLegalEntitiesPermissionsDataForRole: function(){
    let permissionsDataForRole = this.roleDetailsObj.rolePermissions;
    let legalEntitiesPermissionDataForRole = {};
    let legalEntityIdsList = [];
    if(permissionsDataForRole)
    {
      permissionsDataForRole.forEach(function(permissionData) {
        if(!legalEntityIdsList.contains(permissionData.companyLegalUnit)){
          legalEntitiesPermissionDataForRole[permissionData.companyLegalUnit] = [];
          legalEntityIdsList.push(permissionData.companyLegalUnit);
        }
        legalEntitiesPermissionDataForRole[permissionData.companyLegalUnit].push(permissionData);
      });
      this.legalEntitiesPermissionDataForRole = legalEntitiesPermissionDataForRole;
    }
    return legalEntitiesPermissionDataForRole;
  },

  setRolePermissionsMappingBasedOnLegalEntity: function(permissionsSegData){
    let self = this;
    let legalEntityIdsList = [];
    let legalEntityNamesPermissionsDataMap = {};
    this.rolePermissions = [];
    if(permissionsSegData && permissionsSegData.length > 0)
    { 
      // for update role flow
      permissionsSegData.forEach(function(permissionsData) {
        let legalEntityName = self.getEntityNameForLegalEntityId(permissionsData.legalEntityId);
        if (!legalEntityIdsList.contains(permissionsData.legalEntityId)) {
          legalEntityNamesPermissionsDataMap[legalEntityName] = [];
          legalEntityIdsList.push(permissionsData.legalEntityId);
        }
        legalEntityNamesPermissionsDataMap[legalEntityName].push(permissionsData);
      });
      for(let legalEntity in legalEntityNamesPermissionsDataMap){
        this.rolePermissions[legalEntity] = [...legalEntityNamesPermissionsDataMap[legalEntity]];
        this.orgPermissions[legalEntity] =  [...legalEntityNamesPermissionsDataMap[legalEntity]];
      }
    } else {
      // for create role flow
      let currUserLegalEntityList = this.currUserLegalEntityList; 
      for(let i=0; i<currUserLegalEntityList.length; i++) {
        let legalEntity = currUserLegalEntityList[0].companyName;
        this.rolePermissions[legalEntity] = [];
        this.orgPermissions[legalEntity] = [];
      }
    }
  },

  setAllServiceDefinitionsMappingBasedOnLegalEntity: function(allServiceDefsList) {
    let self = this;
    let legalEntityIdsList = [];
    let legalEntityIdsServiceDataMap = {};
    let legalEntityNamesServiceDataMap = {};
    if(allServiceDefsList)
    {
      allServiceDefsList.forEach(function(servicesData) {
        let legalEntityName = self.getEntityNameForLegalEntityId(servicesData.legalEntityId);
        if(!legalEntityIdsList.contains(servicesData.legalEntityId)){
          legalEntityIdsServiceDataMap[servicesData.legalEntityId] = [];
          legalEntityNamesServiceDataMap[legalEntityName] = [];
          legalEntityIdsList.push(servicesData.legalEntityId);
        }
        legalEntityIdsServiceDataMap[servicesData.legalEntityId].push(servicesData);
        legalEntityNamesServiceDataMap[legalEntityName].push(servicesData);
      });
      this.legalEntityIdsAllServiceDefsDataMap = legalEntityIdsServiceDataMap;
      this.legalEntityNamesAllServiceDefsDataMap = legalEntityNamesServiceDataMap;
    }
  },

  setRoleServiceDefinitionsMappingBasedOnLegalEntity: function(roleServiceDefsList) {
    let self = this;
    let legalEntityIdsList = [];
    let legalEntityIdsServiceDataMap = {};
    let legalEntityNamesServiceDataMap = {};
    if(roleServiceDefsList)
    {
      roleServiceDefsList.forEach(function(servicesData) {
        let legalEntityName = self.getEntityNameForLegalEntityId(servicesData.companyLegalUnit);
        if(!legalEntityIdsList.contains(servicesData.companyLegalUnit)){
          legalEntityIdsServiceDataMap[servicesData.companyLegalUnit] = [];
          legalEntityNamesServiceDataMap[legalEntityName] = [];
          legalEntityIdsList.push(servicesData.companyLegalUnit);
        }
        legalEntityIdsServiceDataMap[servicesData.companyLegalUnit].push(servicesData);
        legalEntityNamesServiceDataMap[legalEntityName].push(servicesData);
      });
      this.legalEntityIdsRoleServiceDefsDataMap = legalEntityIdsServiceDataMap;
      this.legalEntityNamesRoleServiceDefsDataMap = legalEntityNamesServiceDataMap;
    }
  },

  getLegalEntitiesServicesDataForRole: function(){
    let servicesDataForRole = this.roleDetailsObj.roleServiceDefinition;
    let legalEntitiesServiceDataForRole = {};
    let legalEntityIdsList = [];
    if(servicesDataForRole)
    {
      servicesDataForRole.forEach(function(servicesData) {
        if(!legalEntityIdsList.contains(servicesData.companyLegalUnit)){
          legalEntitiesServiceDataForRole[servicesData.companyLegalUnit] = [];
          legalEntityIdsList.push(servicesData.companyLegalUnit);
        }
        legalEntitiesServiceDataForRole[servicesData.companyLegalUnit].push(servicesData);
      });
      this.legalEntitiesServiceDataForRole = legalEntitiesServiceDataForRole;
    }
    return legalEntitiesServiceDataForRole;
  },

  setLegalEntitiesServicDefsDataForRole : function(){
    let serviceDefsDataForRole = this.roleDetailsObj.allServiceDefinitions;
    let legalEntitiesServicDefsDataForRole = {};
    let legalEntityIdsList = [];
    if(serviceDefsDataForRole)
    {
      serviceDefsDataForRole.forEach(function(serviceDefData) {
        if(!legalEntityIdsList.contains(serviceDefData.legalEntityId)){
          legalEntitiesServicDefsDataForRole[serviceDefData.legalEntityId] = [];
          legalEntityIdsList.push(serviceDefData.legalEntityId);
        }
        legalEntitiesServicDefsDataForRole[serviceDefData.legalEntityId].push(serviceDefData);
      });
      this.legalEntitiesServicDefsDataForRole = legalEntitiesServicDefsDataForRole;
    }
  },

  getLegalEntityIdsListFromLEList: function(legalEntityList){
    let legalEntityIdsList = [];
    if(legalEntityList){
      legalEntityIdsList = legalEntityList.map(legalEntityObj => legalEntityObj.id);
    }
    return legalEntityIdsList;
  },

  getCSVLegalEntityIds: function(legalEntityIdsList) {
    let legalEntityId = "";
    if(legalEntityIdsList && legalEntityIdsList.length > 0){
      if(this.isSingleEntity) {
        legalEntityId = legalEntityIdsList[0];
      } else {
        legalEntityIdsList.forEach((legalEntityID, index, list) => {
          legalEntityId += legalEntityID;
          if(index !== list.length - 1){
            legalEntityId += ", ";
          }
        });
      }
    }
    return legalEntityId;
  },

  getEntityNameForLegalEntityId: function (legalEntityId) {
    let legalEntityName = "";
    let legalEntityList = this.legalEntityList;
    for (var index = 0; index < legalEntityList.length; index++) {
      if (legalEntityId && legalEntityList[index].id === legalEntityId) {
        legalEntityName = legalEntityList[index].companyName;
        break;
      }
    }
    if (legalEntityName && legalEntityName != "")
      return legalEntityName;
    else
      return legalEntityId ? legalEntityId : "";
  },

  getEntityIdForLegalEntityName: function (legalEntityName) {
    let legalEntityId = "";
    let legalEntityList = this.legalEntityList;
    for (var index = 0; index < legalEntityList.length; index++) {
      if (legalEntityName && legalEntityList[index].companyName === legalEntityName) {
        legalEntityId = legalEntityList[index].id;
        break;
      }
    }
    if (legalEntityId && legalEntityId != "")
      return legalEntityId;
    else
      return legalEntityName ? legalEntityName : "";
  }
});

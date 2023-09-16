define({
  currentPage: 1,
  recordsSize: 20,
  editData: {
    permissionDetails: {},
    allRoles: [],
    allUsers: [],
    allPermissions: [],
    permissionRoles: [],
    permissionUsers: [],
    mouseYCoordinate: 0,
  },
  editStatus: "",
  isKeyCloakEnabled: false,
  MAX_TEXTLIMIT_TEXTAREACOMMENT: 150,

  searchFilter: function (Permission) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if (typeof searchText === 'string' && searchText.length > 0) {
      return Permission.Permission_Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },

  clearPermissionDefaults: function () {
    this.view.tbxPermissionNameValue.skin = "skntbxLato35475f14px";
    this.view.flxNoPermissionNameError.setVisibility(false);
    this.view.txtPermissionDescription.skin = "skntxtAreaLato35475f14Px";
    this.view.flxNoPermissionDescriptionError.isVisible = false;
    this.currentPage = 1;
    this.view.subHeader.tbxSearchBox.text = "";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.view.lbxPagination.selectedKey = this.currentPage;
    this.view.rtxAvailabletxt.setVisibility(false);
  },

  shouldUpdateUI: function (viewModel) {
    return viewModel !== undefined;
  },

  willUpdateUI: function (viewModel) {
    this.updateLeftMenu(viewModel);
    if (viewModel.action === "fileId") {
      this.downloadCSV(viewModel.fileId)
    }
    else if (viewModel.successMessage === "updatePermission") {
      var msg = kony.i18n.getLocalizedString("i18n.updatePermission.successMessage");
      var requestId = "RequestId: " + viewModel.requestId;
      var toastMsg = msg + requestId;
      this.view.toastMessage.showToastMessage(toastMsg, this);
    }
    else if (viewModel.successMessage === "updatePermissionWithoutApproval") {
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updatePermissionWithoutApproval.successMessage"), this);
    }
    else if (viewModel.successMessage === "deactivatePermission") {
      var toastMsg = viewModel.message + " Request Id: " + viewModel.requestId;
      this.view.toastMessage.showToastMessage(toastMsg, this);
    }
    else if (viewModel.successMessage === "deactivePermissionWithoutApproval") {
      var toastMsg = viewModel.message;
      this.view.toastMessage.showToastMessage(toastMsg, this);
    }
    else if (viewModel.successMessage === "activatePermission") {
      var toastMsg = viewModel.message + " Request Id: " + viewModel.requestId;
      this.view.toastMessage.showToastMessage(toastMsg, this);
    }
    else if (viewModel.successMessage === "activePermissionWithoutApproval") {
      var toastMsg = viewModel.message;
      this.view.toastMessage.showToastMessage(toastMsg, this);
    }
    else if (viewModel.successMessage === "statusPendingApproval") {
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateRolePendingApproval.successMessage"), this);
    }
    else if (viewModel && viewModel.permissions) {
      this.isKeyCloakEnabled = viewModel.isKeyCloakEnabled;
      this.sortBy = this.getObjectSorter('Permission_Name');
      this.determineSortFontIcon(this.sortBy, "Permission_Name", this.view.fontIconSortName);
      this.resetSortFontIcons();
      this.clearPermissionDefaults();
      //this.view.mainHeader.btnDropdist.info="";
      this.loadPageData = function () {
        this.view.flxHeaderPermissions.setVisibility(true);
        this.showPermissions();
        this.setPermissionSegmentData(viewModel.permissions.filter(this.searchFilter).sort(this.sortBy.sortData));
        kony.adminConsole.utils.hideProgressBar(this.view);
        //To display disable/enable buttons for pagination
        //             if(this.nextPageDisabled){
        //               this.view.flxNext.hoverSkin ="sknDisableCursor";
        //               this.view.fontIconNext.skin="sknFontIconPrevNextDisable";
        //             }else{
        //               this.view.flxNext.hoverSkin ="sknCursor";
        //               this.view.fontIconNext.skin= "sknFontIconPrevNextPage";
        //             }
        //             if(this.prevPageDisabled){
        //               this.view.flxPrevious.hoverSkin ="sknDisableCursor";
        //               this.view.fontIconPrevious.skin="sknFontIconPrevNextDisable";
        //             }else{
        //               this.view.flxPrevious.hoverSkin ="sknCursor";
        //               this.view.fontIconPrevious.skin="sknFontIconPrevNextPage";
        //             }
      };

      this.loadPageData();
    }
    else if (viewModel.LoadingScreen) {
      if (viewModel.LoadingScreen.focus)
        kony.adminConsole.utils.showProgressBar(this.view);
      else
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if (viewModel.toastMessage) {
      if (viewModel.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
        this.view.toastMessage.showToastMessage(viewModel.toastMessage.message, this);
      } else if (viewModel.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
        this.view.toastMessage.showErrorToastMessage(viewModel.toastMessage.message, this);
      }
    }
    else if (viewModel.context === "ApprovalRequest_ViewPermission") {
      var responses = viewModel.responses;
      this.isKeyCloakEnabled = viewModel.isKeyCloakEnabled;
      this.responseFetchRolesPermissions = responses.fetchRolesPermissions;
      this.responseFetchUsersPermissions = responses.fetchUsersPermissions; 
      this.responseFetchPermission = responses.fetchPermissionById;
      this.requestData = viewModel.request;
      this.permissionId = viewModel.permissionId;
    }
    else if(viewModel.action === "fromBackend"){
      this.view.flxApproveRejectRequestConfirmation.setVisibility(false);
      if (viewModel.permissionToast === "success") {
        this.view.flxLoading.setVisibility(false);
        let toastMessage = "";
        if (viewModel.approvalRequest && viewModel.request && viewModel.approvalRequest.statusMessage === 'Data Migration Success') {
          if (viewModel.request.status === "Approved") {
            toastMessage = kony.i18n.getLocalizedString("i18n.approvalsRequest.approvedSuccessMessage");
          } else if (viewModel.request.status === "Rejected") {
            toastMessage = kony.i18n.getLocalizedString("i18n.approvalsRequest.rejectedSuccessMessage");
          }
        }
        this.view.toastMessage.showToastMessage(toastMessage, this);
      }
      this.presenter.callingApprovalsData();
    }
  },

  searchData: function () {
    this.loadPageData();
  },
  // 	  changeNumberOfRecordsPerPage: function () {
  // 		  this.currentPage = 1;
  // 		  this.loadPageData();
  // 	  },

  // 	  gotoPage : function(){
  // 		this.currentPage = this.view.lbxPagination.selectedKey;
  // 		this.loadPageData();
  // 		this.view.lbxPagination.selectedKey = this.currentPage;
  // 	}, 


  // 	  nextPage: function () {
  // 		  if (this.nextPageDisabled) {
  // 			  return;
  // 		  }
  // 		  this.currentPage++;
  // 		  this.view.lbxPagination.selectedKey = this.currentPage;
  // 		  this.loadPageData();
  // 	  },
  // 	  prevPage: function () {
  // 		  if (this.prevPageDisabled) {
  // 			  return;
  // 		  }
  // 		  this.currentPage--;
  // 		  this.view.lbxPagination.selectedKey = this.currentPage;
  // 		  this.loadPageData();
  // 	  },
  // 	  selectPage: function () {
  // 		  this.currentPage = this.view.lbxPagination.selectedKey;
  // 		  this.loadPageData();
  // 	  },
  gblselIndex: 0,
  gblsegRoles: 0,
  //preshow
  permissionPreShow: function () {
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    kony.adminConsole.utils.showProgressBar(this.view);
    this.view.lblPermissiondescriptionSize.setVisibility(false);
    this.view.lblPermissionNameSize.setVisibility(false);
    /*
    this.view.flxPermissionBreadCrumb.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.permission.PERMISSIONS");
    this.view.breadcrumbs.btnBackToMain.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(false);
    */
    this.view.btnSelectAll.setVisibility(false);
    this.skipTop = 0;
    this.skipBottom = 0;
    this.end = 0;
    this.endTop = 0;
    this.view.btnRemoveAll.setVisibility(false);
    this.view.flxPermissionStatusFilter.setVisibility(false);
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setFlowActions();
    // this.showPermissions();
    this.view.flxPermissions.setVisibility(false);
    // this.setHeaderText();
    // this.leftMenuNavigation();
    this.hideAllOptionsButtonImages();
    this.tabUtilLabelFunction([this.view.lblTabName1,
    this.view.lblTabName2], this.view.lblTabName1);
    this.view.flxMain.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.fontIconRightArrow1.setVisibility(true);
    
    this.view.flxToastMessage.setVisibility(false);  
    this.setPermissionsData();
    this.showViewRoleSegmentAndPermissionHeader();
    var self = this;
    this.view.mainHeader.ButtonApprove.onClick = function () {
      var request = {
        "requestStatus" : "Approved"
      };
      self.updatePermissionRequestStatus(request);
    };
    this.view.mainHeader.ButtonReject.onClick = function () {
      self.view.flxApproveRejectRequestConfirmation.setVisibility(true);      
    };
  },

  leftMenuNavigation: function () {

    this.view.leftMenu.flxAdminSubMenu.height = "120dp";
    this.view.leftMenu.imgMinus.src = "imgminus.png";
    this.view.leftMenu.imgAdmin.src = "icon_administrations_hover_2x.png";
    this.view.leftMenu.lblAdmin.skin = "lblHighlightSkn";
    this.view.leftMenu.lblAdmin.hoverSkin = "lblHighlightSkn";


    //Service Management Tab
    this.view.leftMenu.flxServiceManagementLink.skin = "flxNonHighlightSkn";
    this.view.leftMenu.flxServiceMgmntSubMenu.height = "0dp";
    this.view.leftMenu.imgPlus.src = "imgplus.png";
    this.view.leftMenu.imgServiceMangement.src = "icon_servicemanagement_2x.png";
    this.view.leftMenu.lblServiceManage.skin = "lblNonHighlightSkn";

    this.view.leftMenu.flxPerm.skin = "leftMenuhightlightSkn";
    this.view.leftMenu.imgPerm.src = "permissionsactive.png";
    this.view.leftMenu.flxPermLeft.skin = "lblHighlightSkn";
    this.view.leftMenu.flxPermPatch3.isVisible = true;

    this.view.leftMenu.flxAdminUsers.skin = "flxNonHighlightSkn";
    this.view.leftMenu.imgUsers.src = "usersinactive.png";
    this.view.leftMenu.lblUsers.skin = "lblNonHighlightSkn";
    this.view.leftMenu.flxsubMenuActivePatch.isVisible = false;

    this.view.leftMenu.flxRoles.skin = "flxNonHighlightSkn";
    this.view.leftMenu.imgRoles.src = "imgroles.png";
    this.view.leftMenu.lblRolesLeftMenu.skin = "lblNonHighlightSkn";
    this.view.leftMenu.flxsubMenuActivePatch1.isVisible = false;

  },
  //scrollHeightSetting
  setScrollHeight: function (opt) {
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    if (opt === 1) {
      //var scrollHeight= screenHeight-this.view.flxMainHeader.height;
      scrollHeight = screenHeight - 106;
    }
    else {
      //var scrollHeight= screenHeight-this.view.flxMainHeader.height-this.view.flxMainSubHeader.height;
      scrollHeight = screenHeight - 106 - 63;
    }
    this.view.flxScrollMainContent.height = scrollHeight + "px";
    this.view.segPermissions.height = scrollHeight - 80 + "px";
  },


  //hide functions
  hideAll: function () {
    this.view.flxViews.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxDeactivatePermission.setVisibility(false);
    this.view.flxSelectOptions.setVisibility(false);
    if (this.gblselIndex !== undefined && this.view.segPermissions.data.length !== 0 && this.view.segPermissions.data.length >= this.gblselIndex) {
      // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
      // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
    }
    this.view.flxPermissionBreadCrumb.setVisibility(false);
    this.hideViews();
  },
  hideViews: function () {
    this.view.rtxViewDescription.setVisibility(false);
    this.view.fontIconViewDescription.text = ""; //font-icon value for desc arrow
    this.view.fontIconViewDescription.skin = "sknfontIconDescRightArrow14px";
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxViewPermissions.setVisibility(false);
    this.hideOptions();
  },
  hideOptions: function () {
    this.view.flxAddPermissionDetails.setVisibility(false);
    this.view.flxAddRoleDetails.setVisibility(false);
    this.view.flxAddOptionsContainer.setVisibility(false);
  },
  hideMainHeaderButtons: function () {
    this.view.mainHeader.flxAddNewOption.setVisibility(false);
    this.view.mainHeader.flxDownloadList.setVisibility(false);
  },
  hideMainSubHeader: function () {
    this.view.flxMainSubHeader.setVisibility(false);
    this.setScrollHeight(1);
  },
  hideAllOptionsButtonImages: function () {
    this.view.fontIconRightArrow1.setVisibility(false);
    this.view.fontIconRightArrow2.setVisibility(false);
    this.view.fontIconRightArrow3.setVisibility(false);
    this.view.fontIconRightArrow4.setVisibility(false);
  },

  //show functions
  toggleRtxVisibility: function () {
    if (this.view.rtxViewDescription.isVisible === true) {
      this.view.fontIconViewDescription.text = "";//font-icon value for desc arrow
      this.view.fontIconViewDescription.skin = "sknfontIconDescRightArrow14px";
      this.view.rtxViewDescription.setVisibility(false);
    }
    else {
      this.view.fontIconViewDescription.text = "";//font-icon value for down arrow
      this.view.fontIconViewDescription.skin = "sknfontIconDescDownArrow12px";
      this.view.rtxViewDescription.setVisibility(true);
    }
  },
  toggleSwitchStatus: function (widgetPath) {
    if (widgetPath.src === "selectedSwitch.png") {
      widgetPath.src = "unSelectedSwitch.png";
    }
    else {
      //widgetPath.src="selectedSwitch.png";
    }
  },
  showMainHeaderButtons: function () {
    //this.view.mainHeader.flxAddNewOption.setVisibility(true);
    this.view.mainHeader.flxDownloadList.setVisibility(true);
  },
  setHeaderText: function () {
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.roles.PERMISSIONS");
    this.view.mainHeader.lblAddNewOption.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.ADD_NEW_PERMISSIONS");
  },
  clearSearchBox: function () {
    this.view.tbxSearchBox.text = "";
    this.loadPageData();
  },
  showPermissions: function () {
    this.hideAll();
    this.view.flxPermissions.setVisibility(true);
    this.setScrollHeight(2);
    this.view.flxMainSubHeader.setVisibility(true);
    this.view.flxSegmentPermmissions.setVisibility(true);
    this.view.mainHeader.btnDropdownList.setVisibility(true);
    this.showMainHeaderButtons();
    this.view.flxPermissionBreadCrumb.setVisibility(true);
    this.view.tbxPermissionNameValue.skin = "skntbxLato35475f14px";
    this.view.flxNoPermissionNameError.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
    this.view.forceLayout();
    this.view.flxPermissionStatusFilter.setVisibility(false);
    //         this.setPermissionSegmentData();
  },
  viewPermissions: function () {
    this.showPermissions();
    //this.presenter.fetchPermissions();
  },
  toggleSegmentMenuPopup: function () {
    var popMenu = this.view.flxSelectOptions;
    if (popMenu.visibility === false) {
      popMenu.setVisibility(true);
    }
    else {
      popMenu.setVisibility(false);
    }
  },
  toggleDeactivatePopup: function () {
    if (this.view.flxDeactivatePermission.visibility === false) {
      this.view.flxDeactivatePermission.setVisibility(true);
    }
    else {
      this.view.flxDeactivatePermission.setVisibility(false);
    }
  },
  showAddNewPermissions: function () {
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.hideAllOptionsButtonImages();
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
    this.view.flxAddPermissionDetails.setVisibility(true);
    this.view.flxPermissionBreadCrumb.setVisibility(true);
    this.view.fontIconRightArrow1.setVisibility(true);
    //this.view.breadcrumbs.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.CREATE");
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.lblAddOptionsHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES");
    var widgetArray = [this.view.btnAddUsers, this.view.btnAddRoles, this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnOptionDetails);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    scrollHeight = screenHeight - 106 - 63;
    this.view.flxAddMainContainer.height = scrollHeight + "px";
  },
  showAddPermissions: function () {
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.setSelectedOptionsSegmentData();
    this.hideAllOptionsButtonImages();
    this.view.fontIconRightArrow2.setVisibility(true);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
    this.view.flxPermissionBreadCrumb.setVisibility(true);
    this.view.lblAddOptionsHeading.text = kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS");
    this.view.lblSelectedOption.text = kony.i18n.getLocalizedString("i18n.roles.SelectedPermissions");
    this.view.lblAvailableOptionsHeading.text = kony.i18n.getLocalizedString("i18n.roles.AvailablePermissions");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.btnNext.setVisibility(true);
    this.setAddPermissionsSegmentData();
  },
  unSelectedOption: function () {
    var sourceSegment = kony.application.getCurrentForm().segSelectedOptions;
    var selected = sourceSegment.selectedItems[0];
    var targetSegment = kony.application.getCurrentForm().segAddOptions;
    targetSegment.data.push(selected.sourceData);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    sourceSegment.setData(sourceSegment.data);
    this.view.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.segAddOptions.setVisibility(targetSegment.data.length !== 0);
    this.view.segSelectedOptions.setVisibility(sourceSegment.data.length !== 0);
    this.view.btnSelectAll.setVisibility(targetSegment.data.length !== 0);
    this.view.btnRemoveAll.setVisibility(sourceSegment.data.length !== 0);
    this.showHidePlaceHolder();
    kony.application.getCurrentForm().forceLayout();
  },
  showAddUsers: function () {
    this.prefillData();
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideAllOptionsButtonImages();
    this.view.tbxSearchBox.text = "";
    this.view.fontIconRightArrow3.setVisibility(true);
    var widgetArray = [this.view.btnAddUsers, this.view.btnAddRoles, this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnAddUsers);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Edit_Permissions");
    this.view.lblAddOptionsHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS");
    this.view.lblSelectedOption.text = kony.i18n.getLocalizedString("i18n.permission.SelectedUsers");
    this.view.lblAvailableOptionsHeading.text = kony.i18n.getLocalizedString("i18n.permission.AvailableUsers");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    this.view.btnSelectAll.setVisibility(true);
    this.view.flxPermissionBreadCrumb.setVisibility(true);
    this.view.btnNext.setVisibility(false);
    this.setSelectedOptionsSegmentData();
    this.view.flxSearchCrossImg.setVisibility(false);
    this.setAddUsersSegmentData();
  },
  showAddRoles: function () {
    this.prefillData();
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideAllOptionsButtonImages();
    this.view.tbxSearchBox.text = "";
    this.view.fontIconRightArrow4.setVisibility(true);
    var widgetArray = [this.view.btnAddUsers, this.view.btnAddRoles, this.view.btnOptionDetails];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.btnAddRoles);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Edit_Permissions");
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxAddUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
    this.view.lblAddOptionsHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES");
    this.view.lblSelectedOption.text = kony.i18n.getLocalizedString("i18n.permission.SelectedRoles");
    this.view.lblAvailableOptionsHeading.text = kony.i18n.getLocalizedString("i18n.permission.AvailableRoles");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.flxPermissionBreadCrumb.setVisibility(true);
    this.view.rtxAvailableOptionsMessage.setVisibility(false);
    this.view.btnSelectAll.setVisibility(true);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    this.view.flxSearchCrossImg.setVisibility(false);
    this.view.btnNext.setVisibility(this.isKeyCloakEnabled === true ? false : true);

    this.setSelectedOptionsSegmentData();
    this.setAddPermissionsSegmentData();
  },
  showViewRoleSegmentAndPermissionHeader: function () {
    this.view.flxPermissions.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxViewPermissions.setVisibility(true);
    this.view.flxViewTab2.setVisibility(this.isKeyCloakEnabled === true ? false : true);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(false);
    this.view.flxPermissionsHeader.setVisibility(true);
    this.view.flxUsersHeader.setVisibility(false);
    this.view.flxPermissionBreadCrumb.setVisibility(true);
    this.hideMainSubHeader();
    this.tabUtilLabelFunction([this.view.lblTabName1, this.view.lblTabName2], this.view.lblTabName1);

    this.setViewPermissionSegmentData(this.responseFetchRolesPermissions);
    // var self = this;

    // var callBack = function (roles) {
    //   self.editData.permissionRoles = roles;
    //   self.setViewPermissionSegmentData(roles);
    // };
    // this.getRolesDirectlyWithPermission(callBack);


    // if (this.isKeyCloakEnabled === false) {
    //   var callBack1 = function (users) {
    //     self.editData.permissionUsers = users;
    //   };
    //   this.getUsersDirectlyWithPermission(callBack1);
    // }

  },
  getAllAssigUsersAndRoles: function (cb) {
    var self = this;
    var cbCompleted = 0;
    var complete = function () {
      cbCompleted++;
      if ((self.isKeyCloakEnabled === false && cbCompleted === 2) || (self.isKeyCloakEnabled === true && cbCompleted === 1)) cb();
    };
    var callBack = function (roles) {
      self.editData.permissionRoles = roles;
      complete();
    };
    this.getRolesDirectlyWithPermission(callBack);
    if (this.isKeyCloakEnabled === false) {
      var callBack1 = function (users) {
        self.editData.permissionUsers = users;
        complete();
      };
      this.getUsersDirectlyWithPermission(callBack1);
    }
  },
  mappingRoles: function (data) {
    return {
      "flxViewPermissions": "flxViewPermissions",
      "lblDescription": data.Role_Description,
      "lblPermissionName": data.Role_Name,
      "lblSeperator": { "isVisible": true, "text": "-" },
      "role_id": data.Role_id,
      "template": "flxViewPermissions"
    };
  },
  mappingUser: function (data) {
    var self = this;
    return {
      "flxViewUsers": "flxViewUsers",
      "lblViewEmailId": data.Email,
      "lblViewFullName": data.fullName,
      "lblViewSeperator": { "isVisible": true, "text": "-" },
      "lblViewUpdatedBy": data.updatedby,
      "lblViewUpdatedDate": self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(data.updatedts)),
      "lblViewUpdatedTime": "",
      "lblViewUsername": data.UserName,
      "User_id": data.User_id,
      "template": "flxViewUsers"
    };
  },
  showViewUsersSegmentAndHeader: function () {
    this.tabUtilLabelFunction([this.view.lblTabName1,
    this.view.lblTabName2], this.view.lblTabName2);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(true);
    var self = this;
    // var callBack = function (users) {
    //   self.editData.permissionUsers = users;
    //   self.setViewUsersSegmentData(users);
    // };
    // var data = this.getUsersDirectlyWithPermission(callBack);
    self.setViewUsersSegmentData(this.responseFetchUsersPermissions);
    this.view.forceLayout();
  },
  generateAllDataForEdit: function (cb) {
    var scopeObj = this;
    var cbCompleted = 0;
    var complete = function () {
      cbCompleted++;
      if ((scopeObj.isKeyCloakEnabled === false && cbCompleted === 2) || (scopeObj.isKeyCloakEnabled === true && cbCompleted === 1)) {
        scopeObj.allRolesData = scopeObj.parseAllRolesData(scopeObj.editData.allRoles);
        scopeObj.orgPermissionRoles = scopeObj.parsePermissionRolesData(scopeObj.editData.permissionRoles);
        scopeObj.permissionRoles = scopeObj.parsePermissionRolesData(scopeObj.editData.permissionRoles);
        scopeObj.allUsersData = scopeObj.parseAllUserData(scopeObj.editData.allUsers);
        scopeObj.orgPermissionUsers = scopeObj.parsePermissionUsersData(scopeObj.editData.permissionUsers);
        scopeObj.permissionUsers = scopeObj.parsePermissionUsersData(scopeObj.editData.permissionUsers);
        cb();
      }
    };
    var callBackRoles = function (roles) {
      scopeObj.editData.allRoles = roles;
      complete();
    };
    var formName = "viewPermission"
    scopeObj.presenter.getActiveRoles(callBackRoles,formName);
    if (scopeObj.isKeyCloakEnabled === false) {
      var callBackUsers = function (users) {
        scopeObj.editData.allUsers = users;
        complete();
      };
      scopeObj.presenter.getActiveUsers(callBackUsers);
    }
  },
  parsePermissionUsersData: function (permissionUsers) {
    var self = this;
    var data = permissionUsers.map(function (permissionUsers) {
      var fullname = permissionUsers.FirstName + " " + (permissionUsers.MiddleName === null ? "" : permissionUsers.MiddleName) + " " + permissionUsers.LastName;
      return {
        "fontIconClose": { "text": "", "tooltip": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_User") },
        "lblOption": fullname,
        "userId": permissionUsers.User_id,
        "sourceData": {
          "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
          "lblFullName": fullname,
          "lblUserIdValue": {
            "text": permissionUsers.User_id,
            "isVisible": false
          },
          "lblUsername": permissionUsers.UserName,
          "template": "flxAddUsers",
          "userId": permissionUsers.User_id
        },
        "flxAddOptionWrapper": {
          "skin": "sknflxffffffop0e",
          "onHover": self.onHoverEventCallback
        },
        "flxClose": { "isVisible": false, "onClick": self.unSelectedOption }
      };

    });
    this.permissionUsers = data;
    return data;
  },
  parseAllRolesData: function (allRoles) {
    var self = this;
    var data = allRoles.map(function (allRoles) {
      return {
        "btnAdd": {
          "text": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
          "onClick": self.addPermissionstoRole
        },
        "lblPermissionsName": allRoles.role_Name,
        "rtxPermissionDescription": allRoles.role_Desc,
        "template": "flxAddPermissions",
        "permissionId": allRoles.role_id
      };
    });
    this.allRolesData = data;
    return data;
  },
  parsePermissionRolesData: function (permissionRoles) {
    var self = this;
    var data = permissionRoles.map(function (permissionRoles) {
      return {
        "fontIconClose": { "text": "", "tooltip": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_Role") },
        "lblOption": permissionRoles.Role_Name,
        "permissionId": permissionRoles.Role_id,
        "sourceData": {
          "btnAdd": {
            "text": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
            "onClick": self.addPermissionstoRole
          },
          "lblPermissionsName": permissionRoles.Role_Name,
          "rtxPermissionDescription": permissionRoles.Role_Description,
          "template": "flxAddPermissions",
          "permissionId": permissionRoles.Role_id
        },
        "flxAddOptionWrapper": {
          "skin": "sknflxffffffop0e",
          "onHover": self.onHoverEventCallback
        },
        "flxClose": { "isVisible": false, "onClick": self.unSelectedOption }

      };
    });
    this.permissionRoles = data;
    return data;
  },
  parseAllUserData: function (userData) {
    var data = userData.map(function (userData) {
      return {
        "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
        "lblFullName": userData.FirstName + " " + (userData.MiddleName === null ? "" : userData.MiddleName) + " " + userData.LastName,
        "lblUserIdValue": {
          "text": userData.UserID,
          "isVisible": false
        },
        "lblUsername": userData.Username,
        "template": "flxAddUsers",
        "userId": userData.UserID
      };
    });
    this.allUsersData = data;
    return data;
  },
  setFlowActions: function () {
    var scopeObj = this;
    this.view.popUp.flxPopUpClose.onClick = function () {
      scopeObj.view.flxDeactivatePermission.setVisibility(false);
    };
    this.view.mainHeader.btnDropdownList.onClick = function () {
      if (scopeObj.view.flxNoResultsFound.isVisible === false) {
        scopeObj.downloadPermissionsList();
      }
    };
    this.view.tbxSearchBox.onTouchStart = function () {
      scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.tbxSearchBox.onKeyUp = function () {
      if (scopeObj.view.tbxSearchBox.text === "") {
        //scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.flxSearchCrossImg.setVisibility(false);
      } else {
        scopeObj.view.flxSearchCrossImg.setVisibility(true);
        scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      }
      scopeObj.searchFromList();
    };
    this.view.flxSearchCrossImg.onClick = function () {
      var area = scopeObj.view.lblAddOptionsHeading.text;
      scopeObj.view.tbxSearchBox.text = "";
      scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.flxSearchCrossImg.setVisibility(false);
      scopeObj.view.segAddOptions.setVisibility(true);
      scopeObj.view.rtxAvailableOptionsMessage.setVisibility(false);
      if (area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS") || area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")) {
        scopeObj.setAddPermissionsSegmentData();
      } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
        scopeObj.setAddUsersSegmentData();
      }
    };
    this.view.flxPermissionStatus.onClick = function () {
      scopeObj.toggleSwitchStatus(scopeObj.view.imgPermissionStatus);
    };
    this.view.flxViewDescription.onClick = function () {
      scopeObj.toggleRtxVisibility();
    };
    this.view.popUp.btnPopUpDelete.onClick = function () {
      scopeObj.DeactivatePermission();
    };
    this.view.popUp.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxDeactivatePermission.setVisibility(false);
    };
    // var fetchDataForEditAndAssign = function (afterFetch) {
    //   kony.adminConsole.utils.showProgressBar(scopeObj.view);
    //   scopeObj.getAllAssigUsersAndRoles(
    //     function () {
    //       scopeObj.generateAllDataForEdit(function () {
    //         afterFetch();
    //         kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    //       });
    //     }
    //   );
    // };
    this.view.flxViewEditButton.onClick = function () {
      fetchDataForEditAndAssign(function () {
        scopeObj.prefillData();
        scopeObj.editStatus = "";
        scopeObj.showAddNewPermissions();
      });
    };
    this.view.flxOption2.onClick = function () {
      fetchDataForEditAndAssign(function () {
        if ((scopeObj.view.lblOption2.text).toLowerCase() === kony.i18n.getLocalizedString("i18n.frmPoliciesController.edit")) {
          scopeObj.editStatus = "";
          scopeObj.prefillData();
        }
      });
      scopeObj.showAddNewPermissions();
    };
    this.view.flxOption4.onClick = function () {
      scopeObj.onClickActiveDeactive();
    };
    this.view.btnRoles.onClick = function () {
      fetchDataForEditAndAssign(function () {
        scopeObj.editStatus = "";
        scopeObj.showAddRoles();
      });
    };
    this.view.btnPermissions.onClick = function () {
      fetchDataForEditAndAssign(function () {
        scopeObj.editStatus = "";
        scopeObj.showAddUsers();
      });
    };
    this.view.btnOptionDetails.onClick = function () {
      scopeObj.hideAllOptionsButtonImages();
      scopeObj.view.fontIconRightArrow1.setVisibility(true);
      scopeObj.showAddNewPermissions();
      scopeObj.savedEditedDataInTextBox();
    };
    this.view.btnAddPermissions.onClick = function () {
      scopeObj.hideAllOptionsButtonImages();
      scopeObj.view.fontIconRightArrow2.setVisibility(true);
      scopeObj.showAddPermissions();
    };
    this.view.btnAddUsers.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        scopeObj.hideAllOptionsButtonImages();
        scopeObj.view.fontIconRightArrow3.setVisibility(true);
        scopeObj.showAddUsers();
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.btnAddRoles.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        scopeObj.hideAllOptionsButtonImages();
        scopeObj.view.fontIconRightArrow4.setVisibility(true);
        scopeObj.showAddRoles();
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.lblTabName1.onTouchEnd = function () {
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
      scopeObj.view.lblTabName2], scopeObj.view.lblTabName1);
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.showViewRoleSegmentAndPermissionHeader();
    };
    this.view.lblTabName2.onTouchEnd = function () {
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
      scopeObj.view.lblTabName2], scopeObj.view.lblTabName2);
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.showViewUsersSegmentAndHeader();
    };
    // this.view.leftMenu.flxPerm.onClick=function(){
    // 	scopeObj.viewPermissions();
    // };
    this.view.txtPermissionDescription.onKeyUp = function () {
      scopeObj.view.txtPermissionDescription.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoPermissionDescriptionError.isVisible = false;

      if (scopeObj.view.txtPermissionDescription.text.length === 0) {
        scopeObj.view.lblPermissiondescriptionSize.setVisibility(false);
      }
      else {
        scopeObj.view.lblPermissiondescriptionSize.setVisibility(true);
        scopeObj.view.lblPermissiondescriptionSize.text = scopeObj.view.txtPermissionDescription.text.length + "/300";
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtPermissionDescription.onEndEditing = function () {
      if (scopeObj.view.lblPermissiondescriptionSize.isVisible) {
        scopeObj.view.lblPermissiondescriptionSize.setVisibility(false);
      }
      scopeObj.editData.permissionDetails.lblDescription = scopeObj.view.txtPermissionDescription.text;
    };
    //     this.view.txtPermissionDescription.onKeyUp = function(){
    //       if(scopeObj.view.txtPermissionDescription.text.trim().length===0)
    //         {
    //       scopeObj.view.lblPermissiondescriptionSize.setVisibility(false);
    //         }
    //       else
    //         {
    //       scopeObj.view.lblPermissiondescriptionSize.setVisibility(true);
    //       scopeObj.view.lblPermissiondescriptionSize.text=scopeObj.view.txtPermissionDescription.text.trim().length+"/150";
    //         }
    //      scopeObj.view.forceLayout();
    //     }
    this.view.mainHeader.flxAddNewOption.onClick = function () {
      scopeObj.showAddNewPermissions();
      scopeObj.hideAllOptionsButtonImages();
      scopeObj.hideMainSubHeader();
      scopeObj.view.fontIconRightArrow1.setVisibility(true);
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function () {
      scopeObj.view.flxLoading.setVisibility(true);
      scopeObj.presenter.navToDashboard();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function () {
      scopeObj.view.flxLoading.setVisibility(true);
      scopeObj.presenter.callingApprovalsData();
    };
    this.view.btnCancel.onClick = function () {
      scopeObj.clearSearchBox();
      scopeObj.showPermissions();
    };
    this.view.btnAddRoleCancel.onClick = function () {
      scopeObj.clearSearchBox();
      scopeObj.showPermissions();
    };
    this.view.btnAddPermissionCancel.onClick = function () {
      scopeObj.clearSearchBox();
      scopeObj.clearPermissionDefaults();
      scopeObj.showPermissions();
    };
    this.view.btnAddRoleNext.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        scopeObj.showAddPermissions();
        scopeObj.hideAllOptionsButtonImages();
        scopeObj.view.fontIconRightArrow2.setVisibility(true);
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.btnAddPermissionNext.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        scopeObj.showAddRoles();
        scopeObj.view.fontIconRightArrow4.setVisibility(true);
        scopeObj.showAddRoles();
      }
      else
        scopeObj.errorPermissionName();
    };
    //       this.view.tbxPermissionNameValue.onEndEditing=function(){
    //         	if(!scopeObj.validatePermissionName())
    //         			scopeObj.errorPermissionName();
    //       };
    this.view.tbxPermissionNameValue.onKeyUp = function () {
      scopeObj.view.tbxPermissionNameValue.skin = "skntbxLato35475f14px";
      scopeObj.view.flxNoPermissionNameError.setVisibility(false);
      if (scopeObj.view.tbxPermissionNameValue.text.length === 0) {
        scopeObj.view.lblPermissionNameSize.setVisibility(false);
      }
      else {
        scopeObj.view.lblPermissionNameSize.setVisibility(true);
        scopeObj.view.lblPermissionNameSize.text = scopeObj.view.tbxPermissionNameValue.text.length + "/50";
      }
      scopeObj.editData.permissionDetails.lblPermissionName.tooltip = scopeObj.view.tbxPermissionNameValue.text;
      scopeObj.view.forceLayout();
    };
    this.view.switchPermissionStatus.onSlide = function () {
      scopeObj.editStatus = scopeObj.view.switchPermissionStatus.selectedIndex;
    };
    this.view.btnNext.onClick = function () {
      var from = scopeObj.view.lblAddOptionsHeading.text;
      if (scopeObj.validatePermissionName()) {
        if (from === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES") || from === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")) {
          scopeObj.showAddUsers();
          scopeObj.hideAllOptionsButtonImages();
          scopeObj.view.fontIconRightArrow3.setVisibility(true);
        }
        else if (from === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
          //code to gofrom add users
        }
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.btnSave.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.onClickeditPermissionSave();
        scopeObj.showPermissions();
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.btnAddRoleSave.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.onClickeditPermissionSave();
        scopeObj.showPermissions();
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.btnAddPermissionSave.onClick = function () {
      if (scopeObj.validatePermissionName()) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.onClickeditPermissionSave();
        scopeObj.showPermissions();
      }
      else
        scopeObj.errorPermissionName();
    };
    this.view.btnSelectAll.onClick = function () {
      scopeObj.selectAllRecords();
    };
    this.view.btnRemoveAll.onClick = function () {
      scopeObj.unselectAllRecords();
    };
    // this.view.mainHeader.flxDownloadList.onClick= function(){
    // 	scopeObj.presenter.downloadCSV();
    // };
    // 		this.view.lbxPagination.onSelection = function(){
    // 			scopeObj.gotoPage();
    // 		};
    // 		this.view.subHeader.lbxPageNumbers.onSelection = function(){
    // 			scopeObj.changeNumberOfRecordsPerPage();
    // 		};
    this.view.subHeader.tbxSearchBox.onTouchStart = function () {
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.subHeader.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    const searchPermissions = function () {
      scopeObj.loadPageData();
    };
    const debounce = function (func, delay) {
      var self = this;
      let timer;
      return function () {
        let context = self,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      };
    };
    const searchPermissionsCall = debounce(searchPermissions, 300);
    this.view.subHeader.tbxSearchBox.onKeyUp = function () {
      scopeObj.currentPage = 1;
      scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage;
      if (scopeObj.view.subHeader.tbxSearchBox.text === "") {
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
        // scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
      } else {
        scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      }
      searchPermissionsCall();
    };
    this.view.subHeader.flxClearSearchImage.onClick = function () {
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.loadPageData();
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.performStatusFilter();
    };
    this.view.segPermissions.onHover = this.saveScreenY;
    this.view.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
    this.view.flxPermissionStatusFilter.onHover = this.onDropDownsHoverCallback;
    this.view.tbxPermissionNameValue.onEndEditing = function () {
      scopeObj.view.lblPermissionNameSize.setVisibility(false);
    };
    this.view.flxPermName.onClick = function () {
      scopeObj.sortBy.column("Permission_Name");
      scopeObj.resetSortFontIcons();
      scopeObj.currentPage = 1;
      scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage
      scopeObj.loadPageData();
    };
    this.view.flxRoles.onClick = function () {
      scopeObj.sortBy.column("Role_Count");
      scopeObj.resetSortFontIcons();
      scopeObj.currentPage = 1;
      scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage;
      scopeObj.loadPageData();
    };
    this.view.flxUsers.onClick = function () {
      scopeObj.sortBy.column("Users_Count");
      scopeObj.resetSortFontIcons();
      scopeObj.currentPage = 1;
      scopeObj.view.lbxPagination.selectedKey = scopeObj.currentPage;
      scopeObj.loadPageData();
    };
    this.view.flxHeaderStatus.onClick = function () {
      scopeObj.view.flxPermissionStatusFilter.setVisibility(!scopeObj.view.flxPermissionStatusFilter.isVisible);
      if (scopeObj.view.flxSelectOptions.isVisible === true) {
        if (this.gblselIndex !== undefined) {
          // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
          // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
        }
        scopeObj.view.flxSelectOptions.isVisible = false;
      }
      var flxRight = scopeObj.view.flxHeaderPermissionInner.frame.width - scopeObj.view.flxHeaderStatus.frame.x - scopeObj.view.flxHeaderStatus.frame.width;
      var iconRight = scopeObj.view.flxHeaderStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
      scopeObj.view.flxPermissionStatusFilter.right = (flxRight + iconRight + 25) + "px";
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
      scopeObj.updatePermissionRequestStatus(request);
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
    this.updatePermissionRequestStatus(request);
  },

  rejectRequestNoCallback: function(){
    this.view.flxApproveRejectRequestConfirmation.setVisibility(false);
  },

  resetSortFontIcons: function () {
    this.determineSortFontIcon(this.sortBy, "Users_Count", this.view.fontIconSortUser);
    this.determineSortFontIcon(this.sortBy, "Role_Count", this.view.fontIconSortRoles);
    this.determineSortFontIcon(this.sortBy, "Permission_Name", this.view.fontIconSortName);
  },
  saveScreenY: function (widget, context) {
    this.mouseYCoordinate = context.screenY;
  },
  toPermissionSegment: function (permission) {
    var self = this;
    if (permission.Role_Count === null) {
      permission.Role_Count = "0";
    }
    if (permission.Users_Count === null) {
      permission.Users_Count = "0";
    }
    return {
      "flxOptions": { "skin": "slFbox" },
      "permissionId": permission.Permission_id,
      "statusId": permission.Status_id,
      "lblIconOptions": { "text": "\ue91f" },
      "fontIconStatusImg": permission.Status_id === "SID_ACTIVE" ? { "skin": "sknFontIconActivate" } : { "skin": "sknfontIconInactive" },
      "lblDescription": permission.Permission_Desc,
      "lblNoOfRoles": { "text": permission.Role_Count, "width": (this.isKeyCloakEnabled === true) ? "74%" : "60%" },
      "lblNoOfUsers": { "text": permission.Users_Count, "isVisible": (this.isKeyCloakEnabled === true) ? false : true },
      "lblPermissionName": {
        "text": self.AdminConsoleCommonUtils.getTruncatedString(permission.Permission_Name, 18, 15),
        "tooltip": permission.Permission_Name
      },
      "lblPermissionStatus": permission.Status_id === "SID_ACTIVE" ? {
        "text": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
        "skin": "sknlblLato5bc06cBold14px"
      } : {
        "text": kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive"),
        "skin": "sknlblLato5bc06cBold14px"
      },
      "lblSeperator": "-",
      "template": "flxPermissions"
    };
  },
  setPermissionSegmentData: function (permissions, isFilter) {
    //permissions = permissions.concat(permissions).concat(permissions).concat(permissions);
    var self = this;
    this.view.flxUsers.setVisibility(this.isKeyCloakEnabled === true ? false : true);
    this.view.flxRoles.width = (this.isKeyCloakEnabled === true ? "74%" : "60%");
    if (permissions.length === 0) {
      var searchText = self.AdminConsoleCommonUtils.getEncodedTextInput(self.view.subHeader.tbxSearchBox.text);
      self.view.rtxSearchMesg.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\"" + searchText + "\"" + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      self.view.flxNoResultsFound.setVisibility(true);
      self.view.flxPermissionsContainer.height = "45%";
      self.view.segPermissions.setData(permissions);
      self.view.flxSegmentPermmissions.setVisibility(false);
      self.view.flxHeaderPermissions.setVisibility(false);
      //self.view.flxPagination.setVisibility(false);
    } else {
      self.view.flxNoResultsFound.setVisibility(false);
      self.view.flxPermissionsContainer.height = "98%";
      self.view.flxSegmentPermmissions.setVisibility(true);
      var dataMap = {
        "flxPermDesc": "flxPermDesc",
        "flxPermName": "flxPermName",
        "flxRoles": "flxRoles",
        "flxHeaderStatus": "flxHeaderStatus",
        "flxUsers": "flxUsers",
        "fontIconSortName": "fontIconSortName",
        "fontIconFilterStatus": "fontIconFilterStatus",
        "fontIconSortRoles": "fontIconSortRoles",
        "fontIconSortUser": "fontIconSortUser",
        "lblHeaderDesc": "lblHeaderDesc",
        "lblName": "lblName",
        "lblRoles": "lblRoles",
        "lblHeaderSeperator": "lblHeaderSeperator",
        "lblStatus": "lblStatus",
        "lblUsers": "lblUsers",
        "flxOptions": "flxOptions",
        "flxPermissions": "flxPermissions",
        "flxPermissionsContainer": "flxPermissionsContainer",
        "flxStatus": "flxStatus",
        "lblIconOptions": "lblIconOptions",
        "fontIconStatusImg": "fontIconStatusImg",
        "lblDescription": "lblDescription",
        "lblNoOfRoles": "lblNoOfRoles",
        "lblNoOfUsers": "lblNoOfUsers",
        "lblPermissionName": "lblPermissionName",
        "lblPermissionStatus": "lblPermissionStatus",
        "lblSeperator": "lblSeperator",
        "permission_id": "permissionId",
        "status_id": "statusId"
      };
      var sortIconFor = function (column) {
        return self.determineSortIconForSeg(self.sortBy, column);
      };
      var allData = [];
      // 		[
      // 			[
      // 				{
      // 					"fontIconSortName": sortIconFor('Permission_Name'),
      //                   	"fontIconFilterStatus": {"text":"\ue916","skin":"sknIcon15px"},
      // 					"fontIconSortRoles": sortIconFor('Role_Count'),
      // 					"fontIconSortUser": sortIconFor('Users_Count'),
      // 					"lblHeaderDesc": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
      // 					"lblName": kony.i18n.getLocalizedString("i18n.permission.NAME"),
      // 					"lblRoles": kony.i18n.getLocalizedString("i18n.permission.ROLES"),
      // 					"lblHeaderSeperator": "-",
      // 					"lblStatus": kony.i18n.getLocalizedString("i18n.roles.STATUS"),
      // 					"lblUsers": kony.i18n.getLocalizedString("i18n.users.Users"),
      // 					"template":"flxPermissionsHeader",
      // 					"flxName": {
      // 						"onClick": function () {
      // 							var data=self.sortBy.column("Permission_Name");
      //                             self.currentPage =1;
      //                             self.view.lbxPagination.selectedKey = self.currentPage;
      // 							self.loadPageData();
      // 						}
      // 					},
      // 					"flxRoles": {
      // 						"onClick": function () {
      // 							var data=self.sortBy.column("Role_Count");
      //                             self.currentPage =1;
      //                             self.view.lbxPagination.selectedKey = self.currentPage;
      // 							self.loadPageData();
      // 						}
      // 					},
      // 					"flxUsers": {
      // 						"onClick": function () {
      // 							var data=self.sortBy.column("Users_Count");
      //                             self.currentPage =1;
      //                             self.view.lbxPagination.selectedKey = self.currentPage;
      // 							self.loadPageData();
      // 						}
      // 					},
      // 					"flxHeaderStatus": {
      // 						"onClick": function () {
      // 							self.view.flxPermissionStatusFilter.setVisibility(!self.view.flxPermissionStatusFilter.isVisible);
      // 						}
      // 					}
      // 				},  this.getPageRecords(permissions,
      // 					 this.getNumPerPage.bind(this),
      // 					 this.assignPageList.bind(this)).map(this.toPermissionSegment)
      // 			]
      // 		];
      //allData=this.getPageRecords(permissions,this.getNumPerPage.bind(this),this.assignPageList.bind(this)).map(this.toPermissionSegment);
      this.allPermissions = permissions.map(this.toPermissionSegment);
      var statusList = [];
      for (var i = 0; i < permissions.length; i++) {
        if (!statusList.contains(permissions[i].Status_Desc))
          statusList.push(permissions[i].Status_Desc);
      }
      if (!isFilter) {
        this.permissionsData = permissions;
        this.setStatusFilterData(statusList);
      }
      this.view.segPermissions.widgetDataMap = dataMap;
      this.skipTop = 0;
      this.skipBottom = 0;
      this.end = 0;
      this.endTop = 0;
      this.permissionAllData = this.allPermissions;
      var segmntData = [];
      segmntData = this.permissionAllData;
      this.view.segPermissions.setData(segmntData);
      //document.getElementById("frmPermissions_segPermissions").onscroll = this.contextualMenuOff;
    }
    this.view.forceLayout();
  },
  contextualMenuOff: function (context) {
    if (this.gblselIndex !== undefined) {
      // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
      // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
    }
    this.view.flxSelectOptions.isVisible = false;
  },
  setStatusFilterData: function (segData) {
    var self = this;
    var maxSizeText = "";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var data = segData.map(function (segData) {
      maxSizeText = segData.length > maxSizeText.length ? segData : maxSizeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": segData,
        "imgCheckBox": {
          "src": "checkbox.png"
        }
      };
    });
    var flexWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText) + 55;
    this.view.flxPermissionStatusFilter.width = flexWidth + "px";
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    //self.view.flxPermissionStatusFilter.setVisibility(true);

    var indices = [];
    for (var index = 0; index < data.length; index++) {
      indices.push(index);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, indices]];
  },
  getNumPerPage: function () {
    return this.view.subHeader.lbxPageNumbers.selectedKeyValue
      ? this.view.subHeader.lbxPageNumbers.selectedKeyValue[1]
      : "10";
  },
  downloadPermissionsList: function () {
    var scopeObj = this;
    var searchWord = "";
    var status = "";
    var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);
    if (searchText !== "") {
      searchWord = searchText;
    }
    var downloadPermissionsFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

    if (downloadPermissionsFilterJSON !== undefined && downloadPermissionsFilterJSON.selectedStatusList !== undefined) {
      status = downloadPermissionsFilterJSON.selectedStatusList;
    }
    var payload = { "searchText": searchWord, "status": status };
    this.presenter.generatePermissionsList(payload);

  },
  downloadCSV: function (fileId) {
    var scopeObj = this;

    //var authToken = KNYMobileFabric.currentClaimToken;
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/RolesAndPermissionsObjService/operations/permissions_view/downloadPermissionList?fileId=" + fileId;

    /*if(scopeObj.view.subHeader.tbxSearchBox.text !== "") {      
      var searchText=(scopeObj.view.subHeader.tbxSearchBox.text).replace("<","&lt").replace(">","&gt");
      downloadURL = downloadURL + "&searchText=" + searchText;
    }

    var downloadPermissionsFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

    if(downloadPermissionsFilterJSON !== undefined && downloadPermissionsFilterJSON.selectedStatusList !== undefined) {
      var status = "&status=" + downloadPermissionsFilterJSON.selectedStatusList;
      downloadURL = downloadURL + status;
    }*/

    var encodedURI = encodeURI(downloadURL);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedURI;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },

  assignPageList: function (pageData) {
    var selectedPage = Number(this.view.lbxPagination.selectedKey) || 1;
    this.view.lbxPagination.masterData = pageData;
    this.view.lbxPagination.selectedKey = selectedPage;
  },
  setAddPermissionsSegmentData: function () {
    var dataMap = {
      "btnAdd": "btnAdd",
      "flxAddPermissions": "flxAddPermissions",
      "flxAddWrapper": "flxAddWrapper",
      "lblPermissionsName": "lblPermissionsName",
      "rtxPermissionDescription": "rtxPermissionDescription"
    };
    this.view.segAddOptions.widgetDataMap = dataMap;
    var data = this.allRolesData.slice(0);
    var removalIds = [];
    for (var i = 0; i < this.permissionRoles.length; i++) {
      removalIds[removalIds.length] = this.permissionRoles[i].permissionId;
    }
    i = 0;
    while (i < data.length) {
      if (removalIds.indexOf(data[i].permissionId) > -1) {
        data.remove(data[i]);
      } else {
        i++;
      }
    }
    this.view.segAddOptions.setVisibility(true);
    this.view.segAddOptions.setData(data);
    if (data.length === 0) {
      this.view.btnSelectAll.setVisibility(false);
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Roles_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    }
    this.view.forceLayout();
  },
  setAddPermissionsSegmentDataAfterSearch: function (searchKey) {
    var dataMap = {
      "btnAdd": "btnAdd",
      "flxAddPermissions": "flxAddPermissions",
      "flxAddWrapper": "flxAddWrapper",
      "lblPermissionsName": "lblPermissionsName",
      "rtxPermissionDescription": "rtxPermissionDescription"
    };
    var data = this.allRolesData.slice(0);
    var removalIds = [];
    for (var i = 0; i < this.permissionRoles.length; i++) {
      removalIds[removalIds.length] = this.permissionRoles[i].permissionId;
    }
    i = 0;
    while (i < data.length) {
      if (removalIds.indexOf(data[i].permissionId) > -1 || data[i].lblPermissionsName.toLowerCase().indexOf(searchKey) === -1) {
        data.remove(data[i]);
      } else {
        i++;
      }
    }
    this.view.segAddOptions.widgetDataMap = dataMap;
    if (data.length > 0) {
      this.view.segAddOptions.setVisibility(true);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Permissions_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
    } else {
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\"" + searchKey + "\"" + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    }
    this.view.segAddOptions.setData(data);
    this.view.forceLayout();
  },
  setAddUsersSegmentData: function () {
    var dataMap = {
      "btnAdd": "btnAdd",
      "flxAddUsers": "flxAddUsers",
      "flxAddUsersWrapper": "flxAddUsersWrapper",
      "flxxUsernameWrapper": "flxxUsernameWrapper",
      "lblFullName": "lblFullName",
      "lblUserIdValue": "lblUserIdValue",
      "lblUsername": "lblUsername"
    };
    this.view.segAddOptions.widgetDataMap = dataMap;
    var data = this.allUsersData.slice(0);
    var removalIds = [];
    for (var i = 0; i < this.permissionUsers.length; i++) {
      removalIds[removalIds.length] = this.permissionUsers[i].userId;
    }
    i = 0;
    while (i < data.length) {
      if (removalIds.indexOf(data[i].userId) > -1) {
        data.remove(data[i]);
      } else {
        i++;
      }
    }
    this.view.segAddOptions.setVisibility(true);
    this.view.segAddOptions.setData(data);
    if (data.length === 0) {
      this.view.btnSelectAll.setVisibility(false);
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    }
    this.view.forceLayout();
  },
  setAddUsersSegmentDataAfterSearch: function (searchKey) {
    var dataMap = {
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
    for (var i = 0; i < this.permissionUsers.length; i++) {
      removalIds[removalIds.length] = this.permissionUsers[i].userId;
    }
    i = 0;
    while (i < data.length) {
      if (removalIds.indexOf(data[i].userId) > -1 || data[i].lblFullName.toLowerCase().indexOf(searchKey) === -1) {
        data.remove(data[i]);
      } else {
        i++;
      }
    }
    this.view.segAddOptions.widgetDataMap = dataMap;
    if (data.length > 0) {
      this.view.segAddOptions.setVisibility(true);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
    } else {
      this.view.segAddOptions.setVisibility(false);
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\"" + searchKey + "\"" + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
    }
    this.view.segAddOptions.setData(data);
    this.view.forceLayout();
  },
  setViewUsersSegmentData: function (data) {
    //kony.adminConsole.utils.showProgressBar(this.view);
    var self = this;
    data.forEach(function (user) {
      user.fullName = "" + user.FirstName + " " + (user.MiddleName === null ? "" : user.MiddleName) + " " + user.LastName;
    });
    //data=data.map(self.mappingUser);
    var dataMap = {
      "flxViewUsers": "flxViewUsers",
      "lblViewEmailId": "lblViewEmailId",
      "lblViewFullName": "lblViewFullName",
      "lblViewSeperator": "lblViewSeperator",
      "lblViewUpdatedBy": "lblViewUpdatedBy",
      "lblViewUpdatedDate": "lblViewUpdatedDate",
      "lblViewUpdatedTime": "lblViewUpdatedTime",
      "lblViewUsername": "lblViewUsername"
    };
    var sortBy = this.getObjectSorter('lblViewFullName');
    var dataSet;
    var setUserSortIcons = function () {
      var setImageSrc = function (lblWidgetID, objColumnName) {
        self.determineSortFontIcon(sortBy, objColumnName, self.view[lblWidgetID]);
      };
      setImageSrc('fontIconViewUsersNameSort', 'lblViewFullName');
      setImageSrc('fontIconViewUsersUsrNameSort', 'lblViewUsername');
      setImageSrc('fontIconViewUsersEmailSort', 'lblViewEmailId');
      setImageSrc('fontIconViewUpdateBySort', 'lblViewUpdatedBy');
      setImageSrc('fontIconViewUpdatedOnSort', 'lblViewUpdatedDate');
    };
    setUserSortIcons();
    this.view.flxViewUsersFullName.onClick = function () {
      sortBy.column('lblViewFullName');
      setUserSortIcons();
      dataSet = self.sortSegData(sortBy);
      self.view.segViewSegment.setData(dataSet);
      self.view.forceLayout();
    };
    this.view.flxViewUsersUsername.onClick = function () {
      sortBy.column('lblViewUsername');
      setUserSortIcons();
      dataSet = self.sortSegData(sortBy);
      self.view.segViewSegment.setData(dataSet);
      self.view.forceLayout();
    };
    this.view.flxViewUsersEmailId.onClick = function () {
      sortBy.column('lblViewEmailId');
      setUserSortIcons();
      dataSet = self.sortSegData(sortBy);
      self.view.segViewSegment.setData(dataSet);
      self.view.forceLayout();
    };
    this.view.flxViewUsersUpdatedBy.onClick = function () {
      sortBy.column('lblViewUpdatedBy');
      setUserSortIcons();
      dataSet = self.sortSegData(sortBy);
      self.view.segViewSegment.setData(dataSet);
      self.view.forceLayout();
    };
    this.view.flxViewUsersUpdatedOn.onClick = function () {
      sortBy.column('lblViewUpdatedDate');
      setUserSortIcons();
      dataSet = self.sortSegData(sortBy);
      self.view.segViewSegment.setData(dataSet);
      self.view.forceLayout();
    };
    this.view.segViewSegment.widgetDataMap = dataMap;
    this.view.segViewSegment.setData(data.sort(sortBy.sortData).map(self.mappingUser));
    var segData = this.view.segViewSegment.data;
    this.view.flxPermissionsHeader.setVisibility(false);
    if (segData.length !== 0) {
      segData[0].lblViewSeperator.isVisible = false;
      this.view.segViewSegment.setData(segData);
      this.view.rtxAvailabletxt.setVisibility(false);
      this.view.flxUsersHeader.setVisibility(true);
    } else {
      this.view.rtxAvailabletxt.setVisibility(true);
      this.view.flxUsersHeader.setVisibility(false);
      this.view.rtxAvailabletxt.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_users_are_available");
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  sortSegData: function (sortBy) {
    var dataSet;
    var dataSetSort;
    dataSet = this.view.segViewSegment.data;
    if (dataSet.length !== 0) {
      dataSet[0].lblViewSeperator.isVisible = true;
      dataSetSort = dataSet.sort(sortBy.sortData);
      dataSetSort[0].lblViewSeperator.isVisible = false;
    }
    return dataSetSort;
  },
  setViewPermissionSegmentData: function (data) {
    //kony.adminConsole.utils.showProgressBar(this.view);
    var self = this;
    var dataMap = {
      "flxViewPermissions": "flxViewPermissions",
      "lblDescription": "lblDescription",
      "lblPermissionName": "lblPermissionName",
      "lblSeperator": "lblSeperator"
    };
    var sortBy = this.getObjectSorter('lblPermissionName');
    var dataSet;
    var dataSetSort;
    self.determineSortFontIcon(sortBy, 'lblPermissionName', self.view.fontIconViewPermsnNameSort);
    this.view.flxViewPermissionName.onClick = function () {
      sortBy.column('lblPermissionName');
      self.determineSortFontIcon(sortBy, 'lblPermissionName', self.view.fontIconViewPermsnNameSort);
      dataSet = self.view.segViewSegment.data;
      if (dataSet.length !== 0) {
        dataSet[0].lblSeperator.isVisible = true;
        dataSetSort = dataSet.sort(sortBy.sortData);
        dataSetSort[0].lblSeperator.isVisible = false;
      }
      self.view.segViewSegment.setData(dataSetSort);
      self.view.forceLayout();
    };
    this.view.segViewSegment.widgetDataMap = dataMap;
    data = data.sort(sortBy.sortData).map(self.mappingRoles);
    this.view.segViewSegment.setData(data);
    this.view.flxUsersHeader.setVisibility(false);
    if (data.length !== 0) {
      data[0].lblSeperator.isVisible = false;
      this.view.flxPermissionsHeader.setVisibility(true);
      this.view.segViewSegment.setData(data);
      this.view.rtxAvailabletxt.setVisibility(false);
    } else {
      this.view.flxPermissionsHeader.setVisibility(false);
      this.view.rtxAvailabletxt.setVisibility(true);
      this.view.rtxAvailabletxt.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_roles_are_available");
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  setPermissionsData: function () {
    var permissionResponse = this.responseFetchPermission;
    if (permissionResponse && permissionResponse.length !== 0 && permissionResponse[0]) {
        var permissionDataObj = permissionResponse[0];
        this.view.lblViewValue1.text = permissionDataObj.Permission_Name;
        this.view.fontIconViewValue2.skin = permissionDataObj.Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive";
        this.view.lblViewValue2.skin = "sknlbl485C75LatoSemiBold13px";
        this.view.lblViewValue2.text = permissionDataObj.Status_Desc;
        this.view.rtxViewDescription.text = permissionDataObj.Permission_Desc;
        this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    }
  },
  getRolesDirectlyWithPermission: function (callBack) {
    this.presenter.getRolesDirectlyWithPermission(this.permissionId, callBack);
  },
  getUsersDirectlyWithPermission: function (callBack) {
    this.presenter.getUsersDirectlyWithPermission(this.permissionId, callBack);
  },
  setSelectedOptionsSegmentData: function () {
    var data;
    var dataMap = {
      "flxAddOptionWrapper": "flxAddOptionWrapper",
      "flxClose": "flxClose",
      "flxOptionAdded": "flxOptionAdded",
      "fontIconClose": "fontIconClose",
      "lblOption": "lblOption"
    };
    var area = this.view.lblAddOptionsHeading.text;
    if (area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS") || area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")) {
      data = this.permissionRoles;
    } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
      data = this.permissionUsers;
    }
    this.view.segSelectedOptions.widgetDataMap = dataMap;
    this.view.segSelectedOptions.setData(data);
    this.view.btnRemoveAll.setVisibility(this.view.segSelectedOptions.data.length !== 0);
    this.showHidePlaceHolder();
    this.view.forceLayout();
  },
  showHidePlaceHolder: function () {
    if (this.view.lblAddOptionsHeading.text === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")) {
      this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Click_Add_to_select_a_role");
    } else if (this.view.lblAddOptionsHeading.text === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
      this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Click_Add_to_select_a_user");
    }
    if (this.view.segSelectedOptions.data.length <= 0) {
      this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_to_select_the_item");
      this.view.rtxSelectedOptionsMessage.setVisibility(true);
    } else {
      this.view.rtxSelectedOptionsMessage.setVisibility(false);
    }

  },
  addPermissionstoRole: function () {
    var self = this;
    var sourceSegment = kony.application.getCurrentForm().segAddOptions;
    var selected = sourceSegment.selectedItems[0];
    var targetSegment = kony.application.getCurrentForm().segSelectedOptions;
    this.view.btnRemoveAll.setVisibility(true);
    var toAdd = {
      "fontIconClose": { "text": "", "tooltip": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_Role") },
      "lblOption": "" + selected.lblPermissionsName,
      "permissionId": selected.permissionId,
      "sourceData": selected,
      "flxAddOptionWrapper": {
        "skin": "sknflxffffffop0e",
        "onHover": self.onHoverEventCallback
      },
      "flxClose": { "isVisible": false, "onClick": self.unSelectedOption }
    };
    targetSegment.data.push(toAdd);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    sourceSegment.setData(sourceSegment.data);
    sourceSegment.setVisibility(sourceSegment.data.length !== 0);
    targetSegment.setVisibility(targetSegment.data.length !== 0);
    if (sourceSegment.data.length === 0) {
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Roles_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
      this.view.btnSelectAll.setVisibility(false);
    }
    else {
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
      this.view.btnSelectAll.setVisibility(true);
    }
    this.permissionRoles = targetSegment.data;
    this.showHidePlaceHolder();
    kony.application.getCurrentForm().forceLayout();
  },
  addUserstoRole: function () {
    var sourceSegment = kony.application.getCurrentForm().segAddOptions;
    var selected = sourceSegment.selectedItems[0];
    var targetSegment = kony.application.getCurrentForm().segSelectedOptions;
    this.view.btnRemoveAll.setVisibility(true);
    var toAdd = {
      "fontIconClose": { "text": "", "tooltip": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_User") },
      "lblOption": selected.lblFullName,
      "userId": "" + selected.userId,
      "sourceData": selected,
      "flxAddOptionWrapper": {
        "onHover": this.onHoverEventCallback
      },
      "flxClose": { "isVisible": false, "onClick": this.unSelectedOption }
    };
    targetSegment.data.push(toAdd);
    targetSegment.setData(targetSegment.data);
    sourceSegment.data.remove(selected);
    sourceSegment.setData(sourceSegment.data);
    this.view.segAddOptions.setVisibility(sourceSegment.data.length !== 0);
    this.view.segSelectedOptions.setVisibility(targetSegment.data.length !== 0);
    if (sourceSegment.data.length === 0) {
      this.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
      this.view.rtxAvailableOptionsMessage.setVisibility(true);
      this.view.btnSelectAll.setVisibility(false);
    }
    else {
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
      this.view.btnSelectAll.setVisibility(true);
    }
    this.permissionUsers = targetSegment.data;
    this.showHidePlaceHolder();
    kony.application.getCurrentForm().forceLayout();
  },
  searchFromList: function () {
    var searchKey = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.tbxSearchBox.text).toLowerCase();
    var area = this.view.lblAddOptionsHeading.text;
    if (searchKey === "") {
      this.view.flxSearchCrossImg.setVisibility(false);
      this.view.segAddOptions.setVisibility(true);
      this.view.rtxAvailableOptionsMessage.setVisibility(false);
    } else {
      searchKey = (searchKey).replace("<", "&lt").replace(">", "&gt");
      this.view.flxSearchCrossImg.setVisibility(true);
    }
    if (area === kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS") || area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")) {
      if (searchKey.length > 0) {
        this.setAddPermissionsSegmentDataAfterSearch(searchKey);
      } else {
        this.setAddPermissionsSegmentData();
      }
    } else if (area === kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_USERS")) {
      if (searchKey.length > 0) {
        this.setAddUsersSegmentDataAfterSearch(searchKey);
      } else {
        this.setAddUsersSegmentData();
      }
    }
  },
  fixContextualMenu: function (heightVal) {
    if (((this.view.flxSelectOptions.frame.height + heightVal) > (this.view.segPermissions.frame.height + 50)) && this.view.flxSelectOptions.frame.height < this.view.segPermissions.frame.height) {
      this.view.flxTopArrowImage.setVisibility(false);
      this.view.flxDownArrowImage.setVisibility(true);
      this.view.flxMenuOptions.top = "0px";
      this.view.flxSelectOptions.top = ((heightVal - this.view.flxSelectOptions.frame.height) - 39) + "px";
    }
    else {
      this.view.flxTopArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxMenuOptions.top = "-1px";
      this.view.flxSelectOptions.top = (heightVal) + "px";
    }
    this.view.forceLayout();
  },
  onClickOptions: function () {
    /* functions required to get data for 
    assigning roles and user from options */
    var hgtValue;
    var selItems = this.view.segPermissions.selectedItems[0];
    if (this.gblselIndex !== undefined && this.view.segPermissions.data[this.gblselIndex]) {
      // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
      // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
    }
    this.gblselIndex = this.view.segPermissions.selectedRowIndex[1];
    var clckd_selectedRowIndex = this.view.segPermissions.selectedRowIndex[1];
    kony.print("clckd_selectedRowIndex----" + JSON.stringify(clckd_selectedRowIndex));
    if (this.view.flxSelectOptions.isVisible === true) {
      // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
      // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
      this.view.flxSelectOptions.isVisible = false;
      this.view.forceLayout();
    } else {
      if (selItems.lblPermissionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        if (this.view.flxSelectOptions.isVisible === false) {

          this.gblsegRoles = clckd_selectedRowIndex;

          hgtValue = ((clckd_selectedRowIndex + 1) * 50) + 65 - this.view.segPermissions.contentOffsetMeasured.y;
          kony.print("hgtValue in roles------" + hgtValue);
          this.view.flxSelectOptions.top = this.mouseYCoordinate - 148 + "px";
          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
          this.view.btnRoles.setVisibility(true);
          this.view.flxSelectOptions.isVisible = true;
          // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
          // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnPermissions.setVisibility(this.isKeyCloakEnabled === true ? false : true);
          this.view.lblDescription.setVisibility(true);
          this.view.flxSeperator.setVisibility(true);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
          this.view.fontIconOption4.text = "";
          this.view.forceLayout();
          this.fixContextualMenu(this.mouseYCoordinate - 148);
        }

      } else {
        if (this.view.flxSelectOptions.isVisible === false) {
          this.gblsegRoles = clckd_selectedRowIndex;
          hgtValue = ((clckd_selectedRowIndex + 1) * 50) + 65 - this.view.segPermissions.contentOffsetMeasured.y;
          kony.print("hgtValue in permissions------" + hgtValue);
          this.view.flxSelectOptions.top = this.mouseYCoordinate - 148 + "px";
          this.view.flxSelectOptions.isVisible = true;
          // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
          // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
          this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
          this.view.btnRoles.setVisibility(false);
          this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.leftmenu.Users");
          this.view.btnPermissions.setVisibility(false);
          this.view.lblDescription.setVisibility(false);
          this.view.flxSeperator.setVisibility(false);
          this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
          this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
          this.view.fontIconOption4.text = "";
          this.view.forceLayout();
          this.fixContextualMenu(this.mouseYCoordinate - 148);
        }

      }
    }
    if (this.view.flxPermissionStatusFilter.isVisible === true)
      this.view.flxPermissionStatusFilter.isVisible = false;

  },


  onClickActiveDeactive: function () {
    var ind = this.gblselIndex;
    var selIt = this.view.segPermissions.data;
    if (this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate")) {
      this.view.flxSelectOptions.setVisibility(false);
      this.DeactivatePermission();
    }
    else if (this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
      var permName = selIt[ind].lblPermissionName.tooltip;
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Deactivate_Permission");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Are_you_sure_to_deactivate") + "\"" + permName + "\"?" + kony.i18n.getLocalizedString("i18n.permission.deactivateMsgDesc");
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
      this.view.flxDeactivatePermission.setVisibility(true);
      this.view.flxSelectOptions.setVisibility(false);
    }
    if (this.gblselIndex !== undefined) {
      // this.view.segPermissions.data[this.gblselIndex].flxOptions.skin = "slFbox";
      // this.view.segPermissions.setDataAt(this.view.segPermissions.data[this.gblselIndex], this.gblselIndex);
    }
  },

  DeactivatePermission: function () {
    var segIndex = this.gblselIndex;
    var segData = this.view.segPermissions.data[segIndex];
    if (this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
      this.view.flxDeactivatePermission.setVisibility(false);
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.permission.SuccessfullyDeactivated"), this);
    } else {
      this.view.flxDeactivatePermission.setVisibility(false);
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.permission.SuccessfullyActivated"), this);
    }
    if (segData !== null) {
      this.presenter.changeStatusOfPermission(this.view.segPermissions.data[segIndex]);
    }
  },
  getEditedData: function () {
    this.editData.permissionDetails.lblPermissionName.tooltip = this.view.tbxPermissionNameValue.text.trim();
    this.editData.permissionDetails.lblDescription = this.view.txtPermissionDescription.text.trim();
    if (this.view.switchPermissionStatus.selectedIndex === 1)
      this.editData.permissionDetails.statusId = "SID_INACTIVE";
    else
      this.editData.permissionDetails.statusId = "SID_ACTIVE";
  },
  prefillData: function () {
    var scopeobj = this;
    var segIndex = this.view.segPermissions.selectedRowIndex[1];
    var segData = this.view.segPermissions.data[segIndex];
    scopeobj.editData.permissionDetails = segData;
    scopeobj.editData.permissionDetails.lblPermissionName.tooltip = segData.lblPermissionName.tooltip;
    scopeobj.editData.permissionDetails.lblDescription = segData.lblDescription;
    scopeobj.view.tbxPermissionNameValue.text = scopeobj.editData.permissionDetails.lblPermissionName.tooltip;
    scopeobj.view.txtPermissionDescription.text = scopeobj.editData.permissionDetails.lblDescription;
    scopeobj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    scopeobj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Edit_Permissions");
    scopeobj.view.breadcrumbs.lblCurrentScreen.text = segData.lblPermissionName.tooltip.toUpperCase();
    scopeobj.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    scopeobj.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    scopeobj.view.mainHeader.btnDropdownList.setVisibility(false);
    var segStatus = segData.statusId === "SID_ACTIVE" ? 0 : 1;
    scopeobj.view.switchPermissionStatus.selectedIndex = scopeobj.editStatus === "" ? segStatus : scopeobj.editStatus;
    scopeobj.view.forceLayout();
  },
  onClickeditPermissionSave: function () {
    var addedTo = {
      rolesList: [],
      usersList: []
    };
    var removedFrom = {
      rolesList: [],
      usersList: []
    };
    var permissionRolesIds = [];
    var permissionUsersIds = [];
    var orgPermissionRolesIds = [];
    var orgPermissionUsersIds = [];
    this.getEditedData();
    var data = this.editData;
    for (var i = 0; i < this.permissionRoles.length; i++) {
      permissionRolesIds[permissionRolesIds.length] = "" + this.permissionRoles[i].permissionId;
    }
    for (var j = 0; j < this.permissionUsers.length; j++) {
      permissionUsersIds[permissionUsersIds.length] = "" + this.permissionUsers[j].userId;
    }
    for (var k = 0; k < this.orgPermissionRoles.length; k++) {
      orgPermissionRolesIds[orgPermissionRolesIds.length] = "" + this.orgPermissionRoles[k].permissionId;
    }
    for (var m = 0; m < this.orgPermissionUsers.length; m++) {
      orgPermissionUsersIds[orgPermissionUsersIds.length] = "" + this.orgPermissionUsers[m].userId;
    }
    removedFrom.usersList = this.updatedIdUsersRoles(orgPermissionUsersIds, permissionUsersIds);
    removedFrom.rolesList = this.updatedIdUsersRoles(orgPermissionRolesIds, permissionRolesIds);
    addedTo.usersList = this.updatedIdUsersRoles(permissionUsersIds, orgPermissionUsersIds);
    addedTo.rolesList = this.updatedIdUsersRoles(permissionRolesIds, orgPermissionRolesIds);
    var finalObject = {
      permissionDetail: {
        "id": data.permissionDetails.permissionId,
        "Name": data.permissionDetails.lblPermissionName.tooltip,
        "Description": data.permissionDetails.lblDescription,
        "Status_id": data.permissionDetails.statusId,
      },
      addedTo: addedTo,
      removedFrom: removedFrom,
      "User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
    };
    this.presenter.updatePermission(finalObject);
    // this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPermissionsController.Permission_updated_successfully"),this);
  },
  updatedIdUsersRoles: function (a1, a2) {
    return a1.filter(function (x) {
      if (a2.indexOf(x) >= 0) return false;
      else return true;
    });
  },
  validatePermissionName: function () {
    var returnValue;
    if (this.view.tbxPermissionNameValue.text.trim() === "") {
      this.view.tbxPermissionNameValue.skin = "skinredbg";
      this.view.flxNoPermissionNameError.setVisibility(true);
      returnValue = false;
    } else {
      this.view.tbxPermissionNameValue.skin = "skntbxLato35475f14px";
      this.view.flxNoPermissionNameError.setVisibility(false);
      returnValue = true;
    }
    if (this.view.txtPermissionDescription.text === "") {
      this.view.txtPermissionDescription.skin = "skinredbg";
      this.view.flxNoPermissionDescriptionError.isVisible = true;
      returnValue = false;
    }
    return returnValue;
  },
  errorPermissionName: function () {
    this.view.forceLayout();
  },
  selectAllRecords: function () {
    var self = this;
    var toAdd;
    var availableRecords = this.view.segAddOptions.data;
    var data = this.view.segSelectedOptions.data;
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(true);
    this.view.btnSelectAll.setVisibility(false);
    for (var i = 0; i < availableRecords.length; i++) {
      if (availableRecords[i].lblPermissionsName) {
        self.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Roles_Available");
        toAdd = {
          "fontIconClose": { "text": "", "tooltip": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_Role") },
          "lblOption": "" + availableRecords[i].lblPermissionsName,
          "permissionId": availableRecords[i].permissionId,
          "sourceData": availableRecords[i],
          "flxClose": { "isVisible": false, "onClick": self.unSelectedOption },
          "flxAddOptionWrapper": {
            "skin": "sknflxffffffop0e",
            "onHover": self.onHoverEventCallback

          }
        };
      }
      else {
        self.view.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_Users_Available");
        toAdd = {
          "fontIconClose": { "text": "", "tooltip": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_User") },
          "lblOption": availableRecords[i].lblFullName,
          "userId": "" + availableRecords[i].userId,
          "sourceData": availableRecords[i],
          "flxClose": { "isVisible": false, "onClick": self.unSelectedOption },
          "flxAddOptionWrapper": {
            "skin": "sknflxffffffop0e",
            "onHover": self.onHoverEventCallback
          }
        };
      }
      data.push(toAdd);
    }
    if (availableRecords[0].lblPermissionsName) {
      this.permissionRoles = data;
    } else {
      this.permissionUsers = data;
    }
    this.view.segAddOptions.removeAll();
    this.view.segSelectedOptions.setData(data);
    if (data.length > 0) {
      this.view.segSelectedOptions.setVisibility(true);
    }
    this.view.rtxAvailableOptionsMessage.setVisibility(true);
    this.view.forceLayout();
  },
  unselectAllRecords: function () {
    var self = this;
    var toAddData;
    var selRecords = this.view.segSelectedOptions.data;
    var availableRecords = this.view.segAddOptions.data;
    this.view.btnSelectAll.setVisibility(true);
    this.view.segAddOptions.setVisibility(true);
    for (var i = 0; i < selRecords.length; i++) {
      if (selRecords[i].sourceData.lblFullName) {
        toAddData = {
          "btnAdd": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
          "lblFullName": selRecords[i].sourceData.lblFullName,
          "lblUserIdValue": selRecords[i].sourceData.lblUserIdValue,
          "lblUsername": selRecords[i].sourceData.lblUsername,
          "template": "flxAddUsers",
          "userId": selRecords[i].sourceData.UserId
        };
      }
      else {
        toAddData = {
          "btnAdd": {
            "text": kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
            "onClick": this.addPermissionstoRole
          },
          "lblPermissionsName": selRecords[i].sourceData.lblPermissionsName,
          "rtxPermissionDescription": selRecords[i].sourceData.rtxPermissionDescription,
          "template": "flxAddPermissions",
          "permissionId": selRecords[i].sourceData.permissionId
        };
      }
      availableRecords.push(toAddData);
    }
    if (selRecords[0].sourceData.lblFullName) {
      this.permissionUsers = [];
    } else {
      this.permissionRoles = [];
    }
    this.view.segAddOptions.setData(availableRecords);
    this.view.rtxAvailableOptionsMessage.setVisibility(availableRecords.length === 0);
    this.view.btnRemoveAll.setVisibility(false);
    this.view.segSelectedOptions.removeAll();
    this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_to_select_the_item");
    this.view.rtxSelectedOptionsMessage.setVisibility(true);
  },
  onHoverEventCallback: function (widget, context) {
    var self = this;
    var rowData = self.view.segSelectedOptions.data[context.rowIndex];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if (rowData.flxClose.isVisible === false) {
        rowData.flxClose.isVisible = true;
        rowData.flxClose.onClick = self.unSelectedOption;
        //rowData.flxAddOptionWrapper.skin = "sknFlxSegRowHover11abeb";
        self.view.segSelectedOptions.setDataAt(rowData, context.rowIndex, context.sectionIndex);
      }
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      rowData.flxClose.isVisible = false;
      rowData.flxClose.onClick = {};
      //rowData.flxAddOptionWrapper.skin = "sknflxffffffop0e";
      self.view.segSelectedOptions.setDataAt(rowData, context.rowIndex, context.sectionIndex);
    }
    for (var i = 0; i < self.view.segSelectedOptions.data.length; i++) {
      rowData = self.view.segSelectedOptions.data[i];
      if (i !== context.rowIndex) {
        rowData.flxClose.isVisible = false;
        rowData.flxClose.onClick = {};
        self.view.segSelectedOptions.setDataAt(rowData, i, i);
      }
    }
    self.view.forceLayout();

  },
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.permissionsData;
    var segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      var statuses = "";
      for (var i = 0; i < selInd.length; i++) {
        selStatus.push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
        statuses = statuses + self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription + "_";
      }
      if (self.view.mainHeader.btnDropdownList.info === undefined) {
        self.view.mainHeader.btnDropdownList.info = {};
      }
      self.view.mainHeader.btnDropdownList.info.selectedStatusList = statuses.substring(0, statuses.length - 1);

      self.view.flxNoResultsFound.setVisibility(false);
      self.view.flxPermissionsContainer.height = "98%";
      self.view.flxSegmentPermmissions.setVisibility(true);
      //self.view.flxPagination.setVisibility(true);
      if (selInd.length === segStatusData.length) { //all are selected
        self.setPermissionSegmentData(self.permissionsData, true);
      } else {
        dataToShow = allData.filter(function (rec) {
          if (selStatus.indexOf(rec.Status_Desc) >= 0) {
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setPermissionSegmentData(dataToShow, true);
        } else {
          self.view.rtxSearchMesg.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          self.view.flxNoResultsFound.setVisibility(true);
          self.view.flxPermissionsContainer.height = "55%";
          self.view.flxSegmentPermmissions.setVisibility(false);
          //self.view.flxPagination.setVisibility(false);
          self.view.segPermissions.setData([]);
        }
      }
    } else {
      self.view.rtxSearchMesg.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.flxNoResultsFound.setVisibility(true);
      self.view.flxPermissionsContainer.height = "55%";
      self.view.flxSegmentPermmissions.setVisibility(false);
      //self.view.flxPagination.setVisibility(false);
      self.view.segPermissions.setData([]);
    }
  },
  onDropDownsHoverCallback: function (widget, context) {
    var self = this;
    var widgetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.view[widgetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if (widgetId === "flxSelectOptions") {
        var selIndex = self.view.segPermissions.selectedRowIndex[1];
        // self.view.segPermissions.data[selIndex].flxOptions.skin = "slFbox";
        // self.view.segPermissions.setDataAt(self.view.segPermissions.data[selIndex], selIndex);
      }
      self.view[widgetId].setVisibility(false);
    }
    self.view.forceLayout();
  },
  savedEditedDataInTextBox: function () {
    var scopeObj = this;
    scopeObj.view.tbxPermissionNameValue.text = scopeObj.editData.permissionDetails.lblPermissionName.tooltip;
    scopeObj.view.txtPermissionDescription.text = scopeObj.editData.permissionDetails.lblDescription;
  },

  updatePermissionRequestStatus: function (request) {
    var userId = kony.mvc.MDAApplication.getSharedInstance().appContext.id;
    var payload = {
      "requestId": this.requestData.ApprovalRequestId,
      "context": "APPROVAL",
      "recordId": this.requestData.recordId,
      "expAPIOperationName": this.requestData.action,
      "status": request.requestStatus,
      "userId": userId,
      "reason": (request.reason ? request.reason : "")
    }
    this.view.flxApproveRejectRequestConfirmation.setVisibility(false);
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.updatePermissionRequestStatus(payload);
  }
});

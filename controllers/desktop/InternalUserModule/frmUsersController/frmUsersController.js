define({
  currentPage: 1,
  recordsSize:20,
  gblselIndex:0,
  gblsegRoles:0,
  userDetails:{},
  editDetails:{},
  isInEditForm:false,
  isKeyCloakEnabled:false,
  checkboxselected : "checkboxselected.png",
  checkboxnormal : "checkboxnormal.png",
  checkbox :"checkbox.png",
  usersSectionindex:0,
  groupsData:null,
  finalresult:[],
  usersRowIndex:0,
  mainUsersJSON:null,
  listUsersJSON:null,
  createUserModel:{},
  editUserModel:{},
  addressData:{},
  currFormNo:0,
  scrollFlag:true,
  unassignedPermissions:[],
  assignedPermissions:[],
  unassignedRoles:[],
  assignedRole:[],
  AllPermissions:[],
  AllRolePermissions:[],
  IntialPermissions:[],
  RoleRelatedPermissions:[],
  validationFlag : 0,
  selectedRoleNames:[],
  selectedStatus:[],
  appendText:0,
  filterdList:[],
  legalEntitiesArray:[],
  segViewSegmentData:{},
  UniqueRoleNames : [],
  userLegalEntities:["Company entity for India region","Company entity for USA region"],
  pageCount : {
     PAGE_OFFSET: 0,
     TOTAL_PAGES:0
     },
  isSingleEntity: true,
  //preshow
  usersPreShow : function(){
    this.view.mainHeader.flxDownloadList.skin = "sknflxSuccessToast1F844D";
    this.view.mainHeader.lblDownloadList.skin = "sknIcon20pxWhite";
    this.view.mainHeader.lblDownloadList.text = "\uE93C";
    this.isKeyCloakEnabled = false;
    this.hideUserListUi(false);
    this.presenter.getKeyCloakStatus();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.skipTop = 0;
    this.skipBottom=0;
    this.end =0;
    this.endTop=0;
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.customCalUpdatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.customCalCreatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.isSingleEntity = kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY; 
    this.setFlowActions();
    this.hideMainHeaderButtons();
    this.disableValidation();
    this.view.rtxAvailabletxt.setVisibility(false);
    this.view.flxUsersBreadCrumb.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.users.Users");
    this.view.breadcrumbs.btnBackToMain.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(false);
    this.view.flxUserStatusFilter.setVisibility(false);
    this.view.lblSelectRole.text="Select Role";
    this.view.lblSelectStatus.text="Select Status";
    this.view.subHeader.tbxSearchBox.placeholder=kony.i18n.getLocalizedString("i18n.users.Search_by_Username_Fullname");
    this.view.lblTabName2.text = kony.i18n.getLocalizedString("i18n.roles.PERMISSIONS");
    this.view.lblDropDown1.text="";
    this.view.lblDropDown2.text="";
    this.view.flxViews.isVisible=false;
    this.setHeaderText();
    this.tabUtilLabelFunction([this.view.lblTabName1, this.view.lblTabName2], this.view.lblTabName1);
    this.view.lblViewRolesNameSort.setVisibility(false);//because user has only one role and it does not need sorting
    this.view.flxToastMessage.setVisibility(false);
  },

  AdvancedSearch : function(){
    if(this.view.tbxSearchBox.text === "John"){
      this.view.flxAdvansedSearch.isVisible = true;
      this.view.flxViews.isVisible = false;
      this.view.flxPermissions.isVisible = false;
    }
  },

  shouldUpdateUI: function (viewModel) {
    return viewModel !== undefined && viewModel !== null;
  },

  clearUserDefaults: function() {
    this.currentPage = 1;
    this.view.subHeader.tbxSearchBox.text = "";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.view.subHeader.flxSearchContainer.skin="sknflxd5d9ddop100";
    this.view.flxUsersHeader.top="0px";
    this.view.flxSegmentUsers.top="65px";
    this.view.flxUserStatusFilter.top="40px";
    this.view.segUsers.height= kony.os.deviceInfo().screenHeight-80+"px";
    this.view.flxAdvancedSearch.isVisible=false;
    this.view.flxFilterDropdown.isVisible=false;
    this.view.flxStatusFilterDropdown.isVisible=false;
  },

  willUpdateUI: function (userModel) {
    this.updateLeftMenu(userModel);
    if(userModel.LoadingScreen&&userModel.LoadingScreen.focus===true)
      kony.adminConsole.utils.showProgressBar(this.view);
    else if(userModel.LoadingScreen&&userModel.LoadingScreen.focus===false)
      kony.adminConsole.utils.hideProgressBar(this.view);
    if (userModel.usersList) {
      this.view.toastMessage.hideToastMessage(this);
      this.clearUserDefaults();
      this.sortBy = this.getObjectSorter('Name');
      this.determineSortFontIcon(this.sortBy,"Name",this.view.lblSortName);
      this.resetSortFontIcons();
      this.currentPage=1;
      this.view.subHeader.tbxSearchBox.text="";
      var status="Status_id",statusVal="SID_INACTIVE";
      userModel.usersList.concat(userModel.usersList)
       this.mainUsersJSON=userModel.usersList;
      this.filterDeactiveUsers(status,statusVal);
      this.view.btnApply.info=undefined;
      this.loadPageData = function(){
        this.resetPaginationValues(this.mainUsersJSON);
        this.showUsers();
      };
       if(userModel.successMessage === "updateUser"){
      var msg = kony.i18n.getLocalizedString("i18n.updateUser.successMessage");
      var requestId = "RequestId: " + userModel.requestId;
      var toastMsg = msg + requestId;
      this.view.toastMessage.showToastMessage(toastMsg,this);
    }
    else if(userModel.successMessage === "updateUserWithoutApproval"){
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateUserWithoutApproval.successMessage"),this);
    }
    else if(userModel.successMessage === "statusPendingApproval"){
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.updateRolePendingApproval.successMessage"),this);
    }
      this.loadPageData();
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    if(userModel.isKeyCloakLogin) {
      this.isKeyCloakEnabled = userModel.isKeyCloakLogin.focus;
    }
    if(userModel.action == "masterDataBusinessAttributes") {
      this.setMasterDataForUserFields(userModel);
    }
    if (userModel.updateUserStatusInView) {
      if (userModel.updateUserStatusInView.Status_id === "SID_INACTIVE") {
        this.presenter.fetchUsersList(this);
        this.showUsers();
      }else {
        this.updateViewUIPostStatusUpdate(userModel.updateUserStatusInView);
        this.updateListUsersJSON(userModel.updateUserStatusInView);
      }
    }
    if(userModel.updatedUsersList ){
      this.sortBy = this.getObjectSorter('Name');
      this.determineSortFontIcon(this.sortBy,"Name",this.view.lblSortName);
      this.resetSortFontIcons();
      this.mainUsersJSON=userModel.updatedUsersList;
      var userSatus="Status_id",userStatusVal="SID_INACTIVE";
      this.filterDeactiveUsers(userSatus,userStatusVal);
      this.view.btnApply.info=undefined;
      if(userModel.updatedUsersListCond===1){
      this.view.subHeader.flxClearSearchImage.onClick(); 
      }
      if(this.view.subHeader.tbxSearchBox.text!=="")
        this.searchInternalUsers();
      else
        this.showUsers();   
    }

    if(userModel.toast&&userModel.toast.status === "SUCCESS")
      this.view.toastMessage.showToastMessage(userModel.toast.message,this);
    else if(userModel.toast&&userModel.toast.status === "FAILURE")
      this.view.toastMessage.showErrorToastMessage (userModel.toast.message,this);      
    if(userModel.editDetails){
      this.unassignedPermissions=[];
      this.assignedPermissions=[];
      this.unassignedRoles=[];
      this.assignedRole=[];
      if(this.isKeyCloakEnabled === false){
        this.parseUnassignedRoles(userModel.editDetails);
        this.parseAssignedPermissions(userModel.editDetails);
        this.parseAssignedRole(userModel.editDetails);
        this.parsePermissions(userModel.editDetails);
        this.parseAllRolePermissions(userModel.editDetails.RolePermissions);
        this.updateUnassignedPermissions();
      }
      this.editDetails = userModel.editDetails;
      this.showEditUsers(userModel.editDetails.target);
    }
    if(userModel.userDetails) {
      this.parseUserDetails(userModel.userDetails);
      this.fillUserProfileDetails();
    }
    if (userModel.roles_view) {
      this.parseAllRoles(userModel.roles_view);
    }
    if (userModel.permissions_view) {
      this.parseAllPermissions(userModel.permissions_view);
    }
    if (userModel.RolePermissions) {
      this.parseAllRolePermissions(userModel.RolePermissions);
    }
    if(userModel.compositePermissionsCSR){
      this.setDataToCSRAssistSegment(userModel.compositePermissionsCSR.CompositeActions);
    }
    if(userModel.status===kony.i18n.getLocalizedString("i18n.frmRolesController.Error")){
      kony.adminConsole.utils.hideProgressBar(this.view);
      this.view.toastMessage.showErrorToastMessage (userModel.message,this);
    }
      },

  updateViewUIPostStatusUpdate : function(statusObj){
    var statusId,iconSkin,iconText;
    if(statusObj.Status_id==="SID_ACTIVE"){
      statusId=kony.i18n.getLocalizedString("i18n.secureimage.Active");
      iconSkin="sknFontIconActivate";
      iconText = "";
    }
    else if(statusObj.Status_id==="SID_SUSPENDED"){
      statusId=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
      iconSkin="sknFontIconPause";
      iconText = "";
    }
    this.view.lblViewValue2.text = statusId;
    this.view.lblViewValue2.skin="sknlbl485C75LatoSemiBold13px";
    this.view.fontIconActive.text = iconText;
    this.view.fontIconActive.skin=iconSkin;
    this.view.forceLayout();
  },

  updateListUsersJSON : function(statusObj) {
    let statusDesc,status_id = "";
    if(statusObj.Status_id==="SID_ACTIVE"){
      statusDesc = "Active";
      status_id = "SID_ACTIVE";
    } else {
      statusDesc = "Suspended";
      status_id = "SID_SUSPENDED";
    }
    let userRowIndex = this.listUsersJSON.findIndex((currRec) => currRec.User_id === statusObj.userId);
    if (userRowIndex > -1) {
      this.listUsersJSON[userRowIndex].Status_Desc = statusDesc;
      this.listUsersJSON[userRowIndex].Status_id = status_id;
    }
  },

  hideUserListUi:function(keyCloakStatus){
    this.view.lblDescription.setVisibility(!keyCloakStatus);
    this.view.btnRoles.setVisibility(!keyCloakStatus);
    this.view.btnPermissions.setVisibility(!keyCloakStatus);
    this.view.flxSeperator.setVisibility(!keyCloakStatus);
    this.view.flxOption3.setVisibility(!keyCloakStatus);
    this.view.flxOption4.setVisibility(!keyCloakStatus);
    this.view.forceLayout();
  },

  setMasterDataForUserFields:function(masterData){
    this.setUserTypeMasterData(masterData.userTypeList);
    this.setLineOfBusinessMasterData(masterData.lineOfBusinessList);
    this.setBranchMasterData(masterData.branchList);
    if(this.isInEditForm) {
      this.setBusinessDetailsInEditMode();
      this.setReportingManagerMasterData(this.editDetails.internalusers_view[0].Username);
    }else{
      this.setReportingManagerMasterData();
    }
  },

  setReportingManagerMasterData : function(userUserName = "") {
    var reportingManager=[];
    var widgetMap = {
      "reportingManager": "reportingManager",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "btnExt":"btnExt",
      "lblDescription": "lblDescription"
    };
    var data = this.mainUsersJSON.slice(0);
    var i=0;
    var status="SID_INACTIVE";
    while (i < data.length) {
      if (data[i]["Status_id"].toLowerCase().indexOf(status.toLowerCase()) > -1) {
        data.remove(data[i]);
      }  else {
        i++;
      }
    }
    let reportingManagerList =data.map((rec) =>  
      rec.Username
    );
    reportingManagerList = reportingManagerList.filter((rec) => 
     (rec!==userUserName)
    );
    reportingManager = reportingManagerList.map(function(rec){     
      return {
        "reportingManager": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "btnExt" : {"isVisible" :false},
        "flxCheckBox": {"isVisible":false},
        "lblDescription":{"text":rec,"tooltip": rec,}
      };
    });
    this.view.dropDownReportingManager.sgmentData.widgetDataMap = widgetMap;
    this.view.dropDownReportingManager.sgmentData.setData(reportingManager);
    this.view.dropDownReportingManager.sgmentData.info={"data":reportingManager};
    this.view.dropDownReportingManager.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmUsers.suggestion");
    this.view.forceLayout();
  },

  setUserTypeMasterData:function(userTypeList) {
    var userListData=[];
    var widgetMap = {
      "userTypeId": "userTypeId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "btnExt":"btnExt",
      "lblDescription": "lblDescription"
    };
    var userListData = userTypeList.map(function(rec){     
      return {
        "userTypeId": rec.id,
        "flxSearchDropDown": "flxSearchDropDown",
        "btnExt" : {"isVisible" :false},
        "flxCheckBox": {"isVisible":false},
        "lblDescription":{"text":rec.name,"tooltip": rec.id,}
      };
    });
    this.view.DropDownUserType.sgmentData.widgetDataMap = widgetMap;
    this.view.DropDownUserType.sgmentData.setData(userListData);
    this.view.DropDownUserType.sgmentData.info={"data":userListData};
    this.view.DropDownUserType.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.forceLayout();
  },

  setLineOfBusinessMasterData : function (lineOfBusinessList) {
    let self = this;
    var lineOfBusinessListData=[];
    var widgetMap = {
      "lineOfBusinessTypeId": "lineOfBusinessTypeId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "btnExt":"btnExt",
      "lblDescription": "lblDescription",
      "isSelected":false
    };
    var lineOfBusinessListData = lineOfBusinessList.map(function(rec){     
      return {
        "isSelected":false,
        "lineOfBusinessTypeId": rec.lob_id,
        "flxSearchDropDown": "flxSearchDropDown",
        "btnExt" : {"isVisible":false},
        "imgCheckBox" : {"src":self.checkbox},
        "lblDescription":{"text":rec.lobtext_displayName,"tooltip": rec.lob_id,}
      };
    });
    this.view.dropDownLineOfBusiness.sgmentData.widgetDataMap = widgetMap;
    this.view.dropDownLineOfBusiness.sgmentData.setData(lineOfBusinessListData);
    this.view.dropDownLineOfBusiness.sgmentData.info={"data":lineOfBusinessListData};
    this.view.dropDownLineOfBusiness.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.dropDownLineOfBusiness.sgmentData.selectionBehaviorConfig = {};
    this.view.forceLayout();
  },

  setBranchMasterData : function(branchNameList) {
    var branchData=[];
    var widgetMap = {
      "branchId": "branchId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "btnExt":"btnExt",
      "lblDescription": "lblDescription",
      "branchAddress":"branchAddress"
    };
    var branchData = branchNameList.map(function(rec){     
      return {
        "branchId": rec.Branch_id,
        "branchAddress" : rec.Branch_Complete_Addr,
        "flxSearchDropDown": "flxSearchDropDown",
        "btnExt" : {"isVisible" :false},
        "flxCheckBox": {"isVisible":false},
        "lblDescription":{"text":rec.Branch_DisplayName,"tooltip": rec.Branch_id,}
      };
    });
    this.view.DropDownBranchName.sgmentData.widgetDataMap = widgetMap;
    this.view.DropDownBranchName.sgmentData.setData(branchData);
    this.view.DropDownBranchName.sgmentData.info={"data":branchData};
    this.view.DropDownBranchName.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.forceLayout();
  },

  filterDeactiveUsers:function(key, val){
    var i=0;
    var data = this.mainUsersJSON.slice(0);
    this.listUsersJSON = data;
    while (i < data.length) {
      if (key === "Status_id" && data[i][key].toLowerCase().indexOf(val.toLowerCase()) > -1) {
        data.remove(data[i]);
        this.listUsersJSON = data;
      }  else {
        i++;
      }
    }
  },
  searchUsers : function(searchKey){
    var roleNames=[];
    var statusData=[];
    this.filterdList=[];
    this.view.btnApply.info = undefined;
    var requiredUser = function(user){
      return user.Username.toLowerCase().indexOf(searchKey.toLowerCase()) > -1|| user.Name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
    };
    this.listUsersJSON = this.mainUsersJSON.filter(requiredUser);
    if (this.listUsersJSON.length !== 0) {
      for (var i = 0; i < this.listUsersJSON.length; i++) {
        for (var j = 0; j < this.listUsersJSON[i].roleDetails.length; j++) {
          if (!roleNames.contains(this.listUsersJSON[i].roleDetails[j].rolename) &&
              this.listUsersJSON[i].roleDetails[j].rolename !== undefined)
            roleNames.push(this.listUsersJSON[i].roleDetails[j].rolename);
        }
        if (this.listUsersJSON[i].Status_id === "SID_ACTIVE") {
          if (!statusData.contains(kony.i18n.getLocalizedString("i18n.secureimage.Active")))
            statusData.push(kony.i18n.getLocalizedString("i18n.secureimage.Active"));
        } else if (this.listUsersJSON[i].Status_id === "SID_INACTIVE") {
          if (!statusData.contains(kony.i18n.getLocalizedString("i18n.users.disabled")) )
            statusData.push( kony.i18n.getLocalizedString("i18n.users.disabled"));
        } else if (!statusData.contains( kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended")))
          statusData.push(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended") );
      }

      this.view.flxAdvancedSearch.isVisible = true;
      //this.view.flxFilterCol1.setVisibility(!this.isKeyCloakEnabled);//hide roles filter for keycloak config
      if (this.isKeyCloakEnabled) {
        this.view.flxFilterCol1.setVisibility(false); 
        this.view.lblAdvSearchParam2.setVisibility(false);
        this.view.flxStatus.setVisibility(false);
        this.view.flxFilterCol2.left = "20px";
      } else {
        this.view.flxFilterCol1.setVisibility(true);
        this.view.lblAdvSearchParam2.setVisibility(true);
        this.view.flxStatus.setVisibility(true);
      }
      this.view.flxUsersHeader.top = "100px";
      this.view.flxSegmentUsers.top = "165px";
      this.view.flxUserStatusFilter.top = "140px";
      this.view.flxPermissions.height = "100%";
      this.populateStatusDropdownSegment(statusData);
      this.populateRoleDropdownSegment(roleNames);
      this.view.flxRtxNoResults.setVisibility(false);
      if (this.view.flxUserStatusFilter.isVisible === true)
        this.view.flxUserStatusFilter.isVisible = false;
      if (this.view.flxSelectOptions.isVisible === true) {
        this.view.segUsers.data[this.usersRowIndex].flxOptions.skin = "slFbox";
        this.view.segUsers.setDataAt(
          this.view.segUsers.data[this.usersRowIndex],
          this.usersRowIndex
        );
        this.view.flxSelectOptions.isVisible = false;
      }
      this.loadPageData();
    } else {
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(
        this.view.subHeader.tbxSearchBox.text
      );
      this.view.rtxAvailableOptionsMessage.text =
        kony.i18n.getLocalizedString(
          "i18n.frmPoliciesController.No_results_found"
        ) +
        '"' +
        searchText +
        '"' +
        kony.i18n.getLocalizedString(
          "i18n.frmPoliciesController.Try_with_another_keyword"
        );
      this.view.flxRtxNoResults.setVisibility(true);
      this.view.flxPermissions.height = "55%";
      this.view.flxUsersHeader.top = "0px";
      this.view.flxSegmentUsers.top = "65px";
      this.view.flxUserStatusFilter.top = "40px";
      this.view.segUsers.height = kony.os.deviceInfo().screenHeight - 80 + "px";
      this.view.flxAdvancedSearch.isVisible = false;
      this.view.flxSegmentUsers.setVisibility(false);
      this.view.flxUsersHeader.setVisibility(false);
      this.view.segUsers.setData(this.listUsersJSON);
      this.view.forceLayout();
    }
  },
  advSearchUsers : function(){
    this.currentPage=1;
    var roleFilteredList=[];
    this.filterdList=[];
    var statusFilterdList=[];
    var updatedDateList=[];
    var createdDateList=[];
    var fromDate ="",toDate ="";
    var segData;
    if (this.selectedRoleNames.length !== 0) {
      segData = this.view.segUsers.data;
      for (var i = 0; i < this.selectedRoleNames.length; i++) {
        for (var j = 0; j < segData.length; j++) {
            for (var k = 0; k < segData[j].roleDetails.length; k++) {
              if ( this.selectedRoleNames[i] === segData[j].roleDetails[k].rolename) {
                roleFilteredList.push(segData[j]);
              }
            }
        }
      }
      this.view.segUsers.data = roleFilteredList;
      this.filterdList = roleFilteredList;
    }
    if(this.selectedStatus.length!==0){
      segData=this.view.segUsers.data;
      for(var x=0;x<this.selectedStatus.length;x++){
        for(var y=0;y<segData.length;y++){
          if(segData[y].Status_Desc === "Inactive")
            segData[y].Status_Desc = "Disabled";
          if(this.selectedStatus[x]===segData[y].Status_Desc){
            statusFilterdList.push(segData[y]);
          }

        }
      }
      this.view.segUsers.data=statusFilterdList;
      this.filterdList=statusFilterdList;
    }
    if(this.view.customCalUpdatedDate.value!==""){
      fromDate=this.view.customCalUpdatedDate.value.slice(0,10);
      toDate=this.view.customCalUpdatedDate.value.slice(13);
      var modifiedDate;
      segData=this.view.segUsers.data;
      for(var m=0;m<segData.length;m++){
        modifiedDate=segData[m].lastmodifiedts.substr(5,2)+"/"+segData[m].lastmodifiedts.substr(8,2)+"/"+segData[m].lastmodifiedts.substr(0,4);
        if(this.validateDates(fromDate,modifiedDate)){
          if(this.validateDates(modifiedDate,toDate))
            updatedDateList.push(segData[m]);
        }
      }
      this.view.segUsers.data=updatedDateList;
      this.filterdList=updatedDateList;
    }
    if(this.view.customCalCreatedDate.value!==""){
      fromDate=this.view.customCalCreatedDate.value.slice(0,10);
      toDate=this.view.customCalCreatedDate.value.slice(13);
      var createdDate;
      segData=this.view.segUsers.data;
      for(var n=0;n<segData.length;n++){
        createdDate=segData[n].createdts.substr(5,2)+"/"+segData[n].createdts.substr(8,2)+"/"+segData[n].createdts.substr(0,4);
        if(this.validateDates(fromDate,createdDate)){
          if(this.validateDates(createdDate,toDate))
            createdDateList.push(segData[n]);
        }
      }
      this.view.segUsers.data=createdDateList;
      this.filterdList=createdDateList;
    }
    if(this.filterdList.length!==0){
      this.view.flxUsersHeader.setVisibility(true);
      this.view.flxRtxNoResults.setVisibility(false);
      this.view.flxPermissions.height="100%";
      this.setUsersSegmentData(0,10,"adv",false);
    }
    else{
      this.view.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      this.view.flxRtxNoResults.setVisibility(true);
      this.view.flxPermissions.height="80%";
      this.view.flxUsersHeader.setVisibility(false);
      segData=this.filterdList;
      this.view.segUsers.setData(segData);
      this.view.forceLayout();
    }

    var downloadUsersFilterJSON = {};

    if(this.selectedRoleNames.length !== 0) {
      downloadUsersFilterJSON.selectedRolesList = this.selectedRoleNames;
    }
    if(this.selectedStatus.length !== 0) {
      downloadUsersFilterJSON.selectedStatusList = this.selectedStatus;
    }
    if(this.view.customCalCreatedDate.value !== "") {
      downloadUsersFilterJSON.createdStartDate = this.view.customCalCreatedDate.value.slice(0,10);
      downloadUsersFilterJSON.createdEndDate = this.view.customCalCreatedDate.value.slice(13);
    }
    if(this.view.customCalUpdatedDate.value !== "") {
      downloadUsersFilterJSON.updatedStartDate = this.view.customCalUpdatedDate.value.slice(0,10);
      downloadUsersFilterJSON.updatedEndDate = this.view.customCalUpdatedDate.value.slice(13);
    }

    this.view.btnApply.info = downloadUsersFilterJSON;
  },
  //scrollHeightSetting
  setScrollHeight :function(opt){
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    if(opt===1){
      scrollHeight= screenHeight-106;
    }
    else{
      scrollHeight= screenHeight-106-63;
    }
    this.view.flxScrollMainContent.height=scrollHeight+"px";
    this.view.flxSegmentUsers.height=scrollHeight-50+"px";
    this.view.segUsers.height=scrollHeight-80+"px";
  },


  //hide functions
  hideAll : function(){
    // if(this.view.segUsers.data.length!==0){
    //     this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="slFbox";
    //     this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
    // }
    this.view.flxViews.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxDeactivateUser.setVisibility(false);
    this.view.flxSelectOptions.setVisibility(false);
    this.hideViews();
  },
  hideViews : function(){
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxViewUsers.setVisibility(false);
    this.hideOptions();
  },
  hideOptions : function(){
    this.view.flxAddUsersDetails.setVisibility(false);
    this.view.flxAddOptionsContainer.setVisibility(false);
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
    this.view.fontIconRightArrow2.setVisibility(false);
    this.view.fontIconRightArrow3.setVisibility(false);
    this.view.fontIconRightArrow4.setVisibility(false);
  },

  //show functions
  showMainHeaderButtons : function(){
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.flxDownloadList.setVisibility(true);
  },
  setHeaderText : function(){
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Users");
    this.view.mainHeader.btnAddNewOption.text=kony.i18n.getLocalizedString("i18n.users.ADDNEWUSER");
    // this.view.mainHeader.flxDownloadList.text=kony.i18n.getLocalizedString("i18n.mainHeader.DOWNLOADLIST");
  },

  showUsers: function(){
    this.hideAll();
    this.view.RoleFilterMenu.tbxSearchBox.text="";
    this.view.flxRoleFilterDropdown.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxNoResultsFound.isVisible=false;
    this.view.flxScrollMainContent.top = "0dp";
    this.view.flxPermissions.setVisibility(true);
    this.setScrollHeight(2);
    this.view.flxMainSubHeader.setVisibility(true);
    this.showMainHeaderButtons();
    this.view.flxUsersBreadCrumb.setVisibility(false);
    this.view.flxUsersHeader.setVisibility(true);
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.Users");
    this.view.flxSegmentUsers.setVisibility(true);
    this.setUsersSegmentData(0,10);
    this.view.flxUsersHeaderRole.setVisibility(true);
    this.view.flxUsersHeaderStatus.setVisibility(!this.isKeyCloakEnabled);
    this.view.lblRoleFilterStatus.setVisibility(this.isKeyCloakEnabled);
    if(this.view.flxAdvancedSearch.isVisible){
      this.view.segUsers.height= kony.os.deviceInfo().screenHeight-365+"px";
      this.view.flxSegmentUsers.height=kony.os.deviceInfo().screenHeight-360+"px";
    }
   this.resetPaginationValues(this.mainUsersJSON.length);
    this.view.forceLayout();
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
    if(this.view.flxDeactivateUser.visibility===false){
      this.view.flxDeactivateUser.setVisibility(true);
    }
    else{
      this.view.flxDeactivateUser.setVisibility(false);
    }
  },
  toggleRolesAddButton : function(){
    if(this.view.lblAddOptionsHeading.text===kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
      var rolesData=this.view.segAddOptions.data;
      for(var i=0;i<rolesData.length;i++){
        if (rolesData[i].btnAdd.isVisible===true) {
          rolesData[i].btnAdd.isVisible=false;
        }
        else{
          rolesData[i].btnAdd.isVisible=true;
        }
      }
      this.view.segAddOptions.setData(rolesData);

    }
    this.view.forceLayout();
  },
  /*
	 * function to add rows in selected segment of roles
	 */
  addRoleRowInOptionsSelected: function(){
    var index = this.view.segAddOptions.selectedIndex;
    var rowIndex = index[1];
    var data = this.view.segAddOptions.data;
    var id=data[rowIndex].roleId;
    var lblOptionText=data[rowIndex].lblRoleName;
    var toAdd={
      "id": id,
      "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmUsersController.Remove_role")},
      "lblOption": ""+lblOptionText
    };
    var data2 = this.view.segSelectedOptions.data;
    data2.push(toAdd);
    this.view.segSelectedOptions.setData(data2);
    this.view.segSelectedOptions.setVisibility(true);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.toggleRolesAddButton();
  },
  removeOptionsAddedRow: function(){
    var index = this.view.segSelectedOptions.selectedIndex;
    var rowIndex = index[0];
    this.view.segSelectedOptions.removeAt(rowIndex);
    this.toggleRolesAddButton();
  },

  setRoleAndPermissionOptionVisibility : function(status) {
    this.view.flxAddRoles.setVisibility(status);
    this.view.flxAddPermissions.setVisibility(status);
    this.view.btnAddUsersNext.setVisibility(status);
  },

  showEditUsers : function(target){
    this.setRoleAndPermissionOptionVisibility(!this.isKeyCloakEnabled);  
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.hideAllOptionsButtonImages();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    this.view.fontIconRightArrow2.setVisibility(true);
    this.view.flxScrollMainContent.top = "-7dp";
    this.view.flxAddMainContainer.height=kony.os.deviceInfo().screenHeight-150+"px";
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxUserDetailsData.height=kony.os.deviceInfo().screenHeight-235+"px";
    this.view.flxAddUsersDetails.setVisibility(true);
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmUsersController.Edit_Users");
    this.view.breadcrumbs.lblCurrentScreen.text=this.editDetails.internalusers_view[0].Name.toUpperCase();
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.flxUsersBreadCrumb.setVisibility(true);
    this.view.flxSpecificPermission.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
    //add user form widgets hiding and data setting
    this.view.flxPasswordUser.setVisibility(false);
    this.view.flxReenterPasswordUser.setVisibility(false);
    this.view.btnCheckAvailabilityUser.setVisibility(false);
    this.view.flxVerifyOption.setVisibility(false);
    this.view.txtbxUserNameUser.width = "100%";
    this.view.flxDisableTbxUserName.setVisibility(true);
    if(this.isKeyCloakEnabled) {
      this.view.btnResetPassword.setVisibility(false);
      this.view.flxDisableTbxEmail.setVisibility(true);
      this.view.flxDisableTbxLastName.setVisibility(true);
      this.view.flxDisableTbxMiddleName.setVisibility(true);
      this.view.flxDisableTbxFirstName.setVisibility(true);
    }else {
      this.view.btnResetPassword.setVisibility(true);
      this.view.flxDisableTbxEmail.setVisibility(false);
      this.view.flxDisableTbxLastName.setVisibility(false);
      this.view.flxDisableTbxMiddleName.setVisibility(false);
      this.view.flxDisableTbxFirstName.setVisibility(false);
    }
    this.view.lblFirstNameCount.setVisibility(false);
    this.view.lblMiddleNameCount.setVisibility(false);
    this.view.lblLastNameCount.setVisibility(false);
    this.view.lblEmailIdCount.setVisibility(false);
    this.view.lblUserNameCount.setVisibility(false);
    this.view.flxUserNameNA.setVisibility(false);
    this.view.flxUserNameAvailable.setVisibility(false);
    this.view.forceLayout();
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.users.USERDETAILS");
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddRoles,this.view.btnOptionDetails];
    var ArrowArray = [this.view.fontIconRightArrow2,this.view.fontIconRightArrow3,this.view.fontIconRightArrow4];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.tabUtilVerticleArrowVisibilityFunction(ArrowArray,this.view.fontIconRightArrow2);
    this.view.txtbxFirstNameUser.text=this.editDetails.internalusers_view[0].FirstName;
    this.view.txtbxMiddleNameUser.text=this.editDetails.internalusers_view[0].MiddleName;
    this.view.txtbxLastNameUser.text=this.editDetails.internalusers_view[0].LastName;
    this.view.txtbxEmailIDUser.text=this.editDetails.internalusers_view[0].Email;
    this.view.txtbxUserNameUser.text=this.editDetails.internalusers_view[0].Username;
    this.presenter.fetchMasterdataUsers();
    this.view.flxUserDetailsData.setContentOffset({
      y:0,
      x: 0
    });
    if(target === "2"){
      this.showAddRoles();
    }else if(target === "3"){
      this.showAddPermissions();
    }
  },
  setBusinessDetailsInEditMode : function() {
    this.resetBusinessFields();
    if (this.editDetails.internalusers_view[0].lobId) {
      let selectedLobs = this.editDetails.internalusers_view[0].lobId;
      let selectedLObsAry = selectedLobs.split(",");
      this.view.lblSelectedRowsLineOfBusiness.text = selectedLObsAry.length + " Selected";
      this.view.lblSelectedRowsLineOfBusiness.skin = "sknLblFontColor485c75";
      this.setPreselectLobs(selectedLObsAry);
    }
    if(this.editDetails.internalusers_view[0].userTypeName) {
      this.view.lblSelectedRowsUserType.text = this.editDetails.internalusers_view[0].userTypeName;
      this.view.lblSelectedRowsUserType.skin = "sknLblFontColor485c75";
    }
    if(this.editDetails.internalusers_view[0].ReportingManager) {
      this.view.lblSelectedRowsReportingManager.text = this.editDetails.internalusers_view[0].ReportingManager;
      this.view.lblSelectedRowsReportingManager.skin = "sknLblFontColor485c75";
    }
    if(this.editDetails.internalusers_view[0].branchName) {
      this.view.lblSelectedRowsBranchName.text = this.editDetails.internalusers_view[0].branchName;
      this.view.lblSelectedRowsBranchName.skin = "sknLblFontColor485c75";
      this.view.flxBranchAddress.setVisibility(true);
      this.view.lblBranchAddressDetails.text = (this.editDetails.internalusers_view[0].Work_Addr) ? this.editDetails.internalusers_view[0].Work_Addr : "N/A";
    }
  },

  resetBusinessFields : function() {
    this.view.lblSelectedRowsUserType.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectUserType");
    this.view.lblSelectedRowsUserType.skin = "sknlbl0h2ff0d6b13f947AD";
    this.view.lblSelectedRowsLineOfBusiness.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectLineOfBusiness");
    this.view.lblSelectedRowsLineOfBusiness.skin = "sknlbl0h2ff0d6b13f947AD";
    this.view.lblSelectedRowsBranchName.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectBranch");
    this.view.lblSelectedRowsBranchName.skin = "sknlbl0h2ff0d6b13f947AD";
    this.view.lblSelectedRowsReportingManager.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectReportingManager");
    this.view.lblSelectedRowsReportingManager.skin = "sknlbl0h2ff0d6b13f947AD";
    this.view.dropDownReportingManager.sgmentData.setVisibility(false);
    this.view.dropDownReportingManager.richTexNoResult.setVisibility(true);
    this.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmUsers.suggestion");
    this.view.dropDownReportingManager.tbxSearchBox.text = "";
    this.hideBusinesFieldsDropDown();
  },

  setPreselectLobs : function(preselectedLOBsAry) {
    let segData  = this.view.dropDownLineOfBusiness.sgmentData.data;
    let self = this;
    segData.forEach((currObj,index) => {
      if (preselectedLOBsAry.includes(currObj.lineOfBusinessTypeId)) {
        currObj.isSelected = true;
        currObj.imgCheckBox.src = self.checkboxselected;
        self.view.dropDownLineOfBusiness.sgmentData.setDataAt(currObj, index);
      }
    })
  },

  hideBusinesFieldsDropDown:function(){
    this.view.flxDropDownDetailUserType.setVisibility(false);
    this.view.flxDropDownDetailLineOfBusiness.setVisibility(false);
    this.view.flxDropDownDetailReportingManager.setVisibility(false);
    this.view.flxDropDownDetailBranchName.setVisibility(false);
    this.view.flxBranchAddress.setVisibility(false);// Branch Address..
  },

  showAddNewUsers : function(isFirstTime){
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideMainSubHeader();
    this.hideAllOptionsButtonImages();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxNoResultsFound.isVisible=false;
    this.view.flxViews.setVisibility(true);
    this.view.fontIconRightArrow2.setVisibility(true);
    this.view.flxScrollMainContent.top = "-7dp";
    this.view.flxAddMainContainer.height=kony.os.deviceInfo().screenHeight-140+"px";
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.flxUserDetailsData.height=kony.os.deviceInfo().screenHeight-232+"px";
    this.view.flxAddUsersDetails.setVisibility(true);
    this.view.lblFirstNameCount.setVisibility(false);
    this.view.lblMiddleNameCount.setVisibility(false);
    this.view.lblLastNameCount.setVisibility(false);
    this.view.lblEmailIdCount.setVisibility(false);
    this.view.lblUserNameCount.setVisibility(false);
    this.view.flxUserNameNA.setVisibility(false);
    this.view.flxUserNameAvailable.setVisibility(false);
    this.view.flxDropDownDetailUserType.setVisibility(false);
    this.view.flxDropDownDetailLineOfBusiness.setVisibility(false);
    this.view.flxDropDownDetailBranchName.setVisibility(false);
    this.view.flxDropDownDetailReportingManager.setVisibility(false);
    this.view.flxSpecificPermission.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
    this.view.dropDownReportingManager.sgmentData.setVisibility(false);
    this.view.dropDownReportingManager.richTexNoResult.setVisibility(true);
    this.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmUsers.suggestion");
    this.view.dropDownReportingManager.tbxSearchBox.text = "";
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddRoles,this.view.btnOptionDetails];
    var ArrowArray = [this.view.fontIconRightArrow2,this.view.fontIconRightArrow3,this.view.fontIconRightArrow4];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnOptionDetails);
    this.tabUtilVerticleArrowVisibilityFunction(ArrowArray,this.view.fontIconRightArrow2);
    ////add user form widgets hiding and data setting
    if(this.view.breadcrumbs.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.users.ADDNEWUSER") && isFirstTime){
      this.view.flxPasswordUser.setVisibility(false);
      this.view.btnCheckAvailabilityUser.setVisibility(true);
      this.view.flxVerifyOption.setVisibility(true);
      this.view.flxBranchAddress.setVisibility(false);
      this.view.txtbxUserNameUser.width = "70%";
      this.view.flxReenterPasswordUser.setVisibility(false);
      this.view.btnResetPassword.setVisibility(false);
      this.view.flxDisableTbxUserName.setVisibility(false);
      this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.users.USERDETAILS");
      this.view.txtbxFirstNameUser.text="";
      this.view.txtbxMiddleNameUser.text="";
      this.view.txtbxLastNameUser.text="";
      this.view.txtbxEmailIDUser.text="";
      this.view.txtbxUserNameUser.text="";
      this.view.flxDisableTbxEmail.setVisibility(false);
      this.view.flxDisableTbxLastName.setVisibility(false);
      this.view.flxDisableTbxMiddleName.setVisibility(false);
      this.view.flxDisableTbxFirstName.setVisibility(false);
      this.view.lblSelectedRowsUserType.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectUserType");
      this.view.lblSelectedRowsUserType.skin = "sknlbl0h2ff0d6b13f947AD";
      this.view.lblSelectedRowsLineOfBusiness.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectLineOfBusiness");
      this.view.lblSelectedRowsLineOfBusiness.skin = "sknlbl0h2ff0d6b13f947AD";
      this.view.lblSelectedRowsBranchName.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectBranch");
      this.view.lblSelectedRowsBranchName.skin = "sknlbl0h2ff0d6b13f947AD";
      this.view.lblSelectedRowsReportingManager.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectReportingManager");
      this.view.lblSelectedRowsReportingManager.skin = "sknlbl0h2ff0d6b13f947AD";
    }
    this.view.flxUserDetailsData.setContentOffset({
      y:0,
      x: 0
    });
    this.view.forceLayout();
  },
  showAddPermissions : function(data){
    this.currFormNo = 2;
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideAllOptionsButtonImages();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.tbxSearchBox.text = "";
    this.view.fontIconRightArrow4.setVisibility(true);
    this.view.flxSearchCrossImg.setVisibility(false);
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddRoles,this.view.btnOptionDetails];
    var ArrowArray = [this.view.fontIconRightArrow2,this.view.fontIconRightArrow3,this.view.fontIconRightArrow4];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnAddPermissions);
    this.tabUtilVerticleArrowVisibilityFunction(ArrowArray,this.view.fontIconRightArrow4);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxScrollMainContent.top = "-7dp";
    this.view.flxAddMainContainer.height=kony.os.deviceInfo().screenHeight-140+"px";
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.roles.SelectedPermissions");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.roles.AvailablePermissions");
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.rtxAvailableOptionsMessage1.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnNext.setVisibility(false);
    this.drawPermissionSelection();
  },
  showAddRoles : function(data){
    this.currFormNo = 1;
    this.hideAll();
    this.hideOptions();
    this.hideMainHeaderButtons();
    this.hideAllOptionsButtonImages();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.tbxSearchBox.text = "";
    this.view.flxSearchCrossImg.setVisibility(false);
    this.view.fontIconRightArrow3.setVisibility(true);
    var widgetArray = [this.view.btnAddPermissions,this.view.btnAddRoles,this.view.btnOptionDetails];
    var ArrowArray = [this.view.fontIconRightArrow2,this.view.fontIconRightArrow3,this.view.fontIconRightArrow4];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnAddRoles);
    this.tabUtilVerticleArrowVisibilityFunction(ArrowArray,this.view.fontIconRightArrow3);
    this.view.flxViews.setVisibility(true);
    this.hideMainSubHeader();
    this.view.flxScrollMainContent.top = "-7dp";
    this.view.flxAddMainContainer.height=kony.os.deviceInfo().screenHeight-140+"px";
    this.view.flxAddMainContainer.setVisibility(true);
    this.view.lblAddOptionsHeading.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES");
    this.view.lblSelectedOption.text=kony.i18n.getLocalizedString("i18n.permission.SelectedRoles");
    this.view.lblAvailableOptionsHeading.text=kony.i18n.getLocalizedString("i18n.permission.AvailableRoles");
    this.drawRolesSelection();
    this.view.flxAddOptionsContainer.setVisibility(true);
    this.view.rtxAvailableOptionsMessage1.setVisibility(false);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.btnAddAll.setVisibility(false);
    this.view.btnRemoveAll.setVisibility(false);
    this.view.btnNext.setVisibility(true);

  },
  showViewRolesSegmentAndHeader : function(){
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    if (this.isKeyCloakEnabled) {
      this.view.flxViewKeyValue2.setVisibility(false);         
    } else {
      this.view.flxViewKeyValue2.setVisibility(true);  
    }
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxScrollMainContent.top = "-7dp";
    this.view.flxViewUsers.height=kony.os.deviceInfo().screenHeight-130+"px";
    this.view.flxViewUsers.setVisibility(true);
    this.view.flxPermissionsHeader.setVisibility(false);
    this.view.flxRolesHeader.setVisibility(true);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCSRPermissions.setVisibility(false);
    this.hideMainSubHeader();
    this.hideMainHeaderButtons();
    this.setViewRolesSegmentData();
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName1);
    this.view.forceLayout();
  },
  showViewPermissionSegmentAndHeader : function(){
    this.setViewPermissionSegmentData();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxPermissions.setVisibility(false);
    this.view.flxViews.setVisibility(true);
    this.view.flxAddMainContainer.setVisibility(false);
    this.view.flxScrollMainContent.top = "-7dp";
    this.view.flxViewUsers.height=kony.os.deviceInfo().screenHeight-130+"px";
    this.view.flxViewUsers.setVisibility(true);
    this.view.searchBoxUsers.tbxSearchBox.text="";
    this.view.searchBoxUsers.flxSearchCancel.setVisibility(false);
    this.view.flxPermissionsHeader.setVisibility(true);
    this.view.flxRolesHeader.setVisibility(false);
    this.view.flxViewSegmentAndHeaders.setVisibility(true);
    this.view.flxViewConfigureCSRPermissions.setVisibility(false);
    this.tabUtilLabelFunction([this.view.lblTabName1,
                               this.view.lblTabName2],this.view.lblTabName2);
  },
  sortListBoxData : function(listBoxData,sortParam){
    this.sortBy = this.getObjectSorter(sortParam); 
    var sortedData = listBoxData.sort(this.sortBy.sortData);
    return sortedData;
  },
  getSelectedLineOfBusinessFields: function() {
    let segData = this.view.dropDownLineOfBusiness.sgmentData.data;
    let selectedLineOfBusinessOption = segData.filter((rec) => { 
      return (rec.isSelected) ? true : false;
    });
    return selectedLineOfBusinessOption;
  },

  validateLOBField : function() {
    let selectedRowDetailsLOB = this.getSelectedLineOfBusinessFields();
    if (selectedRowDetailsLOB.length === 0) {
      this.showError(this.view.flxDropDownLineOfBusiness, this.view.flxErrorLineOfBusiness);
    } else {
      this.showNoError(this.view.flxDropDownLineOfBusiness, this.view.flxErrorLineOfBusiness);
    }
  },
  
  validateUserTypeField : function() {
    if (this.view.lblSelectedRowsUserType.text === kony.i18n.getLocalizedString("i18n.frmUsers.selectUserType")) {
      this.showError(this.view.flxDropDownUserType, this.view.flxErrorUserType);
    } else {
      this.showNoError(this.view.flxDropDownUserType, this.view.flxErrorUserType);
    }
  },

  validateReportingManagerField : function() {
    if (this.view.lblSelectedRowsReportingManager.text === kony.i18n.getLocalizedString("i18n.frmUsers.selectReportingManager")) {
      this.showError(this.view.flxDropDownReportingManager, this.view.flxErrorReportingManager);
    } else {
      this.showNoError(this.view.flxDropDownReportingManager, this.view.flxErrorReportingManager);
    }
  },

  validateBranchNameField : function() {
    if (this.view.lblSelectedRowsBranchName.text === kony.i18n.getLocalizedString("i18n.frmUsers.selectBranch")) {
      this.showError(this.view.flxDropDownBranchName, this.view.flxErrorBranchName);
    } else {
      this.showNoError(this.view.flxDropDownBranchName, this.view.flxErrorBranchName);
    }
  },

  setFlowActions : function(){
    var scopeObj=this;
    scopeObj.view.flxRoleFilterDropdown.onHover = this.onDropDownsHoverCallback;
    scopeObj.view.segUsers.onRowClick = function(){
      scopeObj.getInternalUserProfileData();
    };
    scopeObj.view.popUp.flxPopUpClose.onClick = function(){
      scopeObj.view.flxDeactivateUser.setVisibility(false);
    };

    scopeObj.permissionSorter = this.getObjectSorter('lblPermissionName');
    scopeObj.sortBy = this.getObjectSorter('Name');

    scopeObj.view.flxDropDownUserType.onClick = function(){
      scopeObj.view.flxDropDownDetailUserType.setVisibility(!scopeObj.view.flxDropDownDetailUserType.isVisible);
    };

    scopeObj.view.flxDropDownLineOfBusiness.onClick = function(){
      let isdropDownIsVisible = scopeObj.view.flxDropDownDetailLineOfBusiness.isVisible;
      scopeObj.view.flxDropDownDetailLineOfBusiness.setVisibility(!isdropDownIsVisible);
      if (isdropDownIsVisible) {
        let selectedRowDetailsLOB = scopeObj.getSelectedLineOfBusinessFields();
        if (selectedRowDetailsLOB.length > 0) {
          scopeObj.view.lblSelectedRowsLineOfBusiness.text = selectedRowDetailsLOB.length + " Selected";
          scopeObj.view.lblSelectedRowsLineOfBusiness.skin = "sknLblFontColor485c75";
        }else {
          scopeObj.view.lblSelectedRowsLineOfBusiness.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectLineOfBusiness");
          scopeObj.view.lblSelectedRowsLineOfBusiness.skin = "sknlbl0h2ff0d6b13f947AD";
        }
      }
    };

    scopeObj.view.flxDropDownReportingManager.onClick = function(){
      scopeObj.view.flxDropDownDetailReportingManager.setVisibility(!scopeObj.view.flxDropDownDetailReportingManager.isVisible);
    };

    scopeObj.view.flxDropDownBranchName.onClick = function(){
      scopeObj.view.flxDropDownDetailBranchName.setVisibility(!scopeObj.view.flxDropDownDetailBranchName.isVisible);
    };

    this.view.dropDownLineOfBusiness.sgmentData.onRowClick = function() {
      let segData = scopeObj.view.dropDownLineOfBusiness.sgmentData.data;
      let selectedIndex = scopeObj.view.dropDownLineOfBusiness.sgmentData.selectedRowIndex[1];
      let selectedRowDetails = segData[selectedIndex];
      if (selectedRowDetails.isSelected) {
        selectedRowDetails.isSelected = false;
        selectedRowDetails.imgCheckBox.src = scopeObj.checkbox;
      }else {
        selectedRowDetails.isSelected = true;
        selectedRowDetails.imgCheckBox.src = scopeObj.checkboxselected;
      }
      scopeObj.view.dropDownLineOfBusiness.sgmentData.setDataAt(selectedRowDetails, selectedIndex);
      if(scopeObj.view.flxErrorLineOfBusiness.isVisible){
        scopeObj.showNoError(scopeObj.view.flxDropDownLineOfBusiness, scopeObj.view.flxErrorLineOfBusiness);
      }
      let selectedRowDetailsLOB = scopeObj.getSelectedLineOfBusinessFields();
      if (selectedRowDetailsLOB.length > 0) {
        scopeObj.view.lblSelectedRowsLineOfBusiness.text = selectedRowDetailsLOB.length + " Selected";
        scopeObj.view.lblSelectedRowsLineOfBusiness.skin = "sknLblFontColor485c75";
      }else {
        scopeObj.view.lblSelectedRowsLineOfBusiness.text = kony.i18n.getLocalizedString("i18n.frmUsers.selectLineOfBusiness");
        scopeObj.view.lblSelectedRowsLineOfBusiness.skin = "sknlbl0h2ff0d6b13f947AD";
      }
      scopeObj.view.forceLayout();
    };

    this.view.DropDownUserType.sgmentData.onRowClick = function() {
      let segData = scopeObj.view.DropDownUserType.sgmentData.data;
      let selectedIndex = scopeObj.view.DropDownUserType.sgmentData.selectedRowIndex[1];
      let selectedRowDetails = segData[selectedIndex];
      scopeObj.view.lblSelectedRowsUserType.text = selectedRowDetails.lblDescription.text;
      scopeObj.view.lblSelectedRowsUserType.skin = "sknLblFontColor485c75";
      scopeObj.view.flxDropDownDetailUserType.setVisibility(false);
      if(scopeObj.view.flxErrorUserType.isVisible){
        scopeObj.showNoError(scopeObj.view.flxDropDownUserType, scopeObj.view.flxErrorUserType);
      }
    };

    this.view.DropDownBranchName.sgmentData.onRowClick = function() {
      let segData = scopeObj.view.DropDownBranchName.sgmentData.data;
      let selectedIndex = scopeObj.view.DropDownBranchName.sgmentData.selectedRowIndex[1];
      let selectedRowDetails = segData[selectedIndex];
      scopeObj.view.lblSelectedRowsBranchName.text = selectedRowDetails.lblDescription.text;
      scopeObj.view.lblSelectedRowsBranchName.skin = "sknLblFontColor485c75";
      if (selectedRowDetails.branchAddress) {
        scopeObj.view.lblBranchAddressDetails.text = selectedRowDetails.branchAddress;
      }
      scopeObj.view.flxBranchAddress.setVisibility(true);
      scopeObj.view.flxDropDownDetailBranchName.setVisibility(false);
      if(scopeObj.view.flxErrorBranchName.isVisible){
        scopeObj.showNoError(scopeObj.view.flxDropDownBranchName, scopeObj.view.flxErrorBranchName);
      }  
    };

    this.view.dropDownReportingManager.sgmentData.onRowClick = function() {
      let segData = scopeObj.view.dropDownReportingManager.sgmentData.data;
      let selectedIndex = scopeObj.view.dropDownReportingManager.sgmentData.selectedRowIndex[1];
      let selectedRowDetails = segData[selectedIndex];
      scopeObj.view.lblSelectedRowsReportingManager.text = selectedRowDetails.lblDescription.text;
      scopeObj.view.lblSelectedRowsReportingManager.skin = "sknLblFontColor485c75";
      scopeObj.view.dropDownReportingManager.flxSearchCancel.setVisibility(false);
      scopeObj.view.dropDownReportingManager.tbxSearchBox.text="";
      var totalRecords=scopeObj.view.dropDownReportingManager.sgmentData.info.data;
      scopeObj.view.dropDownReportingManager.sgmentData.setData(totalRecords);
      scopeObj.view.flxDropDownDetailReportingManager.setVisibility(false);
      scopeObj.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmUsers.suggestion");
      scopeObj.view.dropDownReportingManager.richTexNoResult.setVisibility(true);
      scopeObj.view.dropDownReportingManager.sgmentData.setVisibility(false);
      if(scopeObj.view.flxErrorReportingManager.isVisible){
        scopeObj.showNoError(scopeObj.view.flxDropDownReportingManager, scopeObj.view.flxErrorReportingManager);
      }
    };

    this.view.dropDownReportingManager.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.dropDownReportingManager.tbxSearchBox.text.trim().length>2){
        scopeObj.view.dropDownReportingManager.flxSearchCancel.setVisibility(true);
        var segData=scopeObj.view.dropDownReportingManager.sgmentData.data;
        var searchText= scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.dropDownReportingManager.tbxSearchBox.text);
        var statusName="";
        var filteredData=segData.filter(function(rec){
          statusName=rec.lblDescription.text.toLowerCase();
          if(statusName.indexOf(searchText)>=0)
            return rec;
        });
        if(filteredData.length===0){
          scopeObj.view.dropDownReportingManager.sgmentData.setVisibility(false);
          scopeObj.view.dropDownReportingManager.richTexNoResult.setVisibility(true);
          scopeObj.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
        }else{
          scopeObj.view.dropDownReportingManager.sgmentData.setData(filteredData);
          scopeObj.view.dropDownReportingManager.sgmentData.setVisibility(true);
          scopeObj.view.dropDownReportingManager.richTexNoResult.setVisibility(false);
        }
      }else{
        scopeObj.view.dropDownReportingManager.flxSearchCancel.setVisibility(false);
        var totalRecords= scopeObj.view.dropDownReportingManager.sgmentData.info.data;
        scopeObj.view.dropDownReportingManager.sgmentData.setData(totalRecords);
        scopeObj.view.dropDownReportingManager.sgmentData.setVisibility(false);
        scopeObj.view.dropDownReportingManager.richTexNoResult.setVisibility(true);
        scopeObj.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmUsers.suggestion");
      }
      scopeObj.view.forceLayout();
    };
    this.view.dropDownReportingManager.flxSearchCancel.onClick = function(){
      scopeObj.view.dropDownReportingManager.flxSearchCancel.setVisibility(false);
      scopeObj.view.dropDownReportingManager.tbxSearchBox.text="";
      var totalRecords=scopeObj.view.dropDownReportingManager.sgmentData.info.data;
      scopeObj.view.dropDownReportingManager.sgmentData.setData(totalRecords);
      scopeObj.view.dropDownReportingManager.richTexNoResult.text = kony.i18n.getLocalizedString("i18n.frmUsers.suggestion");
      scopeObj.view.dropDownReportingManager.richTexNoResult.setVisibility(true);
      scopeObj.view.dropDownReportingManager.sgmentData.setVisibility(false);
      scopeObj.view.forceLayout();
    };
        this.view.searchBoxUsers.tbxSearchBox.onKeyUp = function(){
        scopeObj.view.searchBoxUsers.flxSearchCancel.setVisibility(true);
        var segData=scopeObj.userDetails.permissions;
           var filteredData=[];
        var searchText= scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.searchBoxUsers.tbxSearchBox.text);
          if(searchText==="")
          {
            scopeObj.view.searchBoxUsers.flxSearchCancel.setVisibility(false);
          }
          
         if(searchText.length >=3 || searchText.length ===0){
        var permissionName="";
         filteredData=segData.filter(function(rec){
          permissionName=rec.lblPermissionName.text.toLowerCase();
          if(permissionName.indexOf(searchText)>=0)
            return rec;
        });
        if(filteredData.length===0){
          scopeObj.view.flxViewSegment.setVisibility(false);
          scopeObj.view.rtxAvailabletxt.setVisibility(true);
          scopeObj.view.flxViewPermissionsHeader.setVisibility(false);
          scopeObj.view.flxViewPermissionSeperator.setVisibility(false);
        }else{
          scopeObj.view.segViewSegment.setData(filteredData);
          scopeObj.view.flxViewSegment.setVisibility(true);
          scopeObj.view.rtxAvailabletxt.setVisibility(false);
          scopeObj.view.flxViewPermissionsHeader.setVisibility(true);
          scopeObj.view.flxViewPermissionSeperator.setVisibility(true);
        }
      }
      scopeObj.view.forceLayout();
    };
    this.view.searchBoxUsers.flxSearchCancel.onClick = function(){
      scopeObj.view.searchBoxUsers.flxSearchCancel.setVisibility(false);
       scopeObj.view.flxViewPermissionsHeader.setVisibility(true);
      scopeObj.view.flxViewPermissionSeperator.setVisibility(true);
      scopeObj.view.searchBoxUsers.tbxSearchBox.text="";
      var totalRecords=scopeObj.userDetails.permissions;
      scopeObj.view.segViewSegment.setData(totalRecords);
      if(scopeObj.view.flxViewSegment.isVisible===false)
        {
          scopeObj.view.rtxAvailabletxt.setVisibility(false);
          scopeObj.view.flxViewSegment.isVisible=true;
         
        }
      scopeObj.view.forceLayout();
    };

    this.view.segDropDown.onRowClick=function(){
      var selIndeces=[];
      scopeObj.selectedRoleNames=[];
      scopeObj.view.lblDropDown1.text="";
      if(scopeObj.view.segDropDown.selectedIndices!==null)
        selIndeces=scopeObj.view.segDropDown.selectedIndices[0][1];
      if(scopeObj.view.segDropDown.selectedIndices!==null){
        for(var i=0;i<selIndeces.length;i++){
          if(!scopeObj.selectedRoleNames.contains(scopeObj.view.segDropDown.data[selIndeces[i]].lblDescription)){
            scopeObj.selectedRoleNames.push(scopeObj.view.segDropDown.data[selIndeces[i]].lblDescription);
          }

        }
      }
      if(selIndeces.length===0){
        scopeObj.view.lblSelectRole.text="Select Role";
        scopeObj.view.lblDropDown1.text="";
        scopeObj.selectedRoleNames=[];
      }
      else if(selIndeces.length===1)
        scopeObj.view.lblSelectRole.text=scopeObj.view.segDropDown.data[selIndeces[0]].lblDescription;
      else
        scopeObj.view.lblSelectRole.text=selIndeces.length+" Selected";
    };
    this.view.segStatusDropDown.onRowClick=function(){
      var selIndeces=[];
      scopeObj.selectedStatus=[];
      scopeObj.view.lblDropDown2.text="";
      if(scopeObj.view.segStatusDropDown.selectedIndices!==null)
        selIndeces=scopeObj.view.segStatusDropDown.selectedIndices[0][1];
      if(scopeObj.view.segStatusDropDown.selectedIndices!==null){
        for(var i=0;i<selIndeces.length;i++){
          if(!scopeObj.selectedStatus.contains(scopeObj.view.segStatusDropDown.data[selIndeces[i]].lblDescription)){
            scopeObj.selectedStatus.push(scopeObj.view.segStatusDropDown.data[selIndeces[i]].lblDescription);
          }

        }

      }
      if(selIndeces.length===0){
        scopeObj.view.lblSelectStatus.text="Select Status";
        scopeObj.view.lblDropDown2.text="";
        scopeObj.selectedStatus=[];
      }
      else if(selIndeces.length===1)
        scopeObj.view.lblSelectStatus.text=scopeObj.view.segStatusDropDown.data[selIndeces[0]].lblDescription;
      else
        scopeObj.view.lblSelectStatus.text=selIndeces.length+" Selected";
    };
    this.view.flxDropDown1.onClick=function(){
      if(scopeObj.view.lblDropDown1.text===""){
        scopeObj.view.lblSelectRole.text="Select Role";
        scopeObj.view.lblDropDown1.text="";
        scopeObj.selectedRoleNames=[];
        var segData=scopeObj.view.segDropDown.data;
        for(var i=0;i<segData.length;i++){
          segData[i].imgCheckBox={
            "src":"checkbox.png"
          };
        }
        scopeObj.view.segDropDown.setData(segData);
        scopeObj.view.forceLayout();
      }
      else{
        scopeObj.view.flxFilterDropdown.left=(scopeObj.view.lblAdvSearchParam1.frame.x+35)+"px";
        if (scopeObj.view.flxFilterDropdown.isVisible)
          scopeObj.view.flxFilterDropdown.setVisibility(false);
        else{
          scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
          scopeObj.view.flxFilterDropdown.setVisibility(true);
        }
      }

    };
    this.view.flxDropDown2.onClick=function(){
      if(scopeObj.view.lblDropDown2.text===""){
        scopeObj.view.lblSelectStatus.text="Select Status";
        scopeObj.view.lblDropDown2.text="";
        scopeObj.selectedStatus=[];
        var segData=scopeObj.view.segStatusDropDown.data;
        for(var i=0;i<segData.length;i++){
          segData[i].imgCheckBox={
            "src":"checkbox.png"
          };
        }
        scopeObj.view.segStatusDropDown.setData(segData);
        scopeObj.view.forceLayout();
      }
      else{
        scopeObj.view.flxStatusFilterDropdown.left=(scopeObj.view.lblAdvSearchParam2.frame.x+35)+"px";
        if (scopeObj.view.flxStatusFilterDropdown.isVisible)
          scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
        else {
          scopeObj.view.flxStatusFilterDropdown.setVisibility(true);
          scopeObj.view.flxFilterDropdown.setVisibility(false);
        }

      }

    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.finalresult =scopeObj.filterBasedOnTypeStatus();
       scopeObj.setUsersSegmentData(0,10,scopeObj.finalresult,true);
    };
this.view.RoleFilterMenu.segStatusFilterDropdown.onRowClick = function(eventObj,context){
      
       scopeObj.checkboxfun(eventObj,context);
       scopeObj.finalresult =scopeObj.filterBasedOnTypeStatus();
       scopeObj.setUsersSegmentData(0,10,scopeObj.finalresult,true);
    };
    this.view.flxRoleDropDown.onClick = function(){
      scopeObj.view.flxFilterDropdown.left=(scopeObj.view.lblAdvSearchParam1.frame.x+35)+"px";
      if (scopeObj.view.flxFilterDropdown.isVisible) {
        scopeObj.view.flxFilterDropdown.setVisibility(false);
      } else {
        scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
        scopeObj.view.flxFilterDropdown.setVisibility(true);
      }

    };
    this.view.flxUpdatedRangePicker.onClick=function(){
      scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
      scopeObj.view.flxFilterDropdown.setVisibility(false);
    };
    this.view.flxCreatedRangePicker.onClick=function(){
      scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
      scopeObj.view.flxFilterDropdown.setVisibility(false);
    };
    this.view.btnApply.onClick = function(){
      scopeObj.view.flxFilterDropdown.setVisibility(false);
      scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
      scopeObj.view.segUsers.data=scopeObj.listUsersJSON;
      if(scopeObj.selectedRoleNames.length===0&&scopeObj.selectedStatus.length===0&&scopeObj.view.customCalUpdatedDate.value===""&&scopeObj.view.customCalCreatedDate.value===""){
        scopeObj.view.btnApply.info = undefined; 
        var searchText= scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);       
        scopeObj.searchUsers(searchText);
      }
      else
        scopeObj.advSearchUsers();
    };
    this.view.flxStatusDropDown.onClick = function(){
      scopeObj.view.flxStatusFilterDropdown.left=(scopeObj.view.lblAdvSearchParam2.frame.x+207)+"px";
      if (scopeObj.view.flxStatusFilterDropdown.isVisible) {
        scopeObj.view.flxStatusFilterDropdown.setVisibility(false);
      } else {
        scopeObj.view.flxFilterDropdown.setVisibility(false);
        scopeObj.view.flxStatusFilterDropdown.setVisibility(true);
      }
    };


    this.view.flxOption0ViewUser.onClick = function() {
      scopeObj.view.flxViewEditButton.onClick();
    };
    this.view.flxContextMenu.onClick = function() {
      var iconSkin,iconText,statusId = "";
      var status = scopeObj.view.lblViewValue2.text;
      if (status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended")) {
        statusId = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      }else {
        statusId = kony.i18n.getLocalizedString("i18n.permission.Suspend");
      }
      scopeObj.view.lblOption1ViewUser.text = statusId;

      let contextMenuVisibility = scopeObj.view.flxSelectOptionsViewUser.isVisible;
      if(contextMenuVisibility) {
        scopeObj.view.flxSelectOptionsViewUser.setVisibility(false);
        scopeObj.view.flxContextMenu.skin = "slFbox";
      }else {
        scopeObj.view.flxSelectOptionsViewUser.setVisibility(true);
        scopeObj.view.flxContextMenu.skin = "sknflxffffffop100Border424242Radius100px";
      }
    };

    this.view.flxContextMenu.onHover = function(widget,context) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.view.flxContextMenu.skin = "sknflxffffffop100Border424242Radius100px";
      } else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.flxContextMenu.skin = "sknflxffffffop100Border424242Radius100px";
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE && !scopeObj.view.flxSelectOptionsViewUser.isVisible) {
        scopeObj.view.flxContextMenu.skin = "slFbox";
      }
    },

    this.view.flxSelectOptionsViewUser.onHover = this.onDropDownsHoverCallback;

    this.view.flxOption2ViewUser.onClick = function() {
      var userFullName=scopeObj.userDetails.internalusers_view[0].Name;
      if(scopeObj.view.lblOption2ViewUser.text === kony.i18n.getLocalizedString("i18n.users.disable")){
        var popupDetails = {};
        popupDetails.headerText = kony.i18n.getLocalizedString("i18n.frmUsersController.Disable_User");
        popupDetails.message = kony.i18n.getLocalizedString("i18n.frmUsersController.Disable_user_popup")+userFullName+"</b>\"?<br><br>"+kony.i18n.getLocalizedString("i18n.frmUsersController.DisableMessage")+"<br>";
        popupDetails.confirmMsg = kony.i18n.getLocalizedString("i18n.PopUp.YesDisable");
      }
      scopeObj.view.flxSelectOptionsViewUser.setVisibility(false);

      var deactiveUser = function() {
        var user_id = scopeObj.userDetails.internalusers_view[0].User_id;
        var status_id="SID_INACTIVE";
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.updateUserStatus(scopeObj,{"Systemuser_id":user_id,"Status_id":status_id},"");
        scopeObj.view.flxDeactivateUser.setVisibility(false);
      };
      scopeObj.openConfirm({
        header: popupDetails.headerText,
        message:  popupDetails.message,
        action: deactiveUser,
        confirmMsg: popupDetails.confirmMsg,
      });
    },

    this.view.flxOption1VIewUser.onClick = function()  {
      var user_id,status_id;
      var userFullName=scopeObj.userDetails.internalusers_view[0].Name;
      var suspendUser = function () {
        user_id = scopeObj.userDetails.internalusers_view[0].User_id;
        status_id="SID_SUSPENDED";
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.updateUserStatus(scopeObj,{"Systemuser_id":user_id,"Status_id":status_id},"view");
        scopeObj.view.flxDeactivateUser.setVisibility(false);
      };
      if(scopeObj.view.lblOption1ViewUser.text===kony.i18n.getLocalizedString("i18n.permission.Suspend")){
        let popupDetails = {};
        popupDetails.headerText = kony.i18n.getLocalizedString("i18n.frmUsersController.Suspend_User");
        popupDetails.message =  kony.i18n.getLocalizedString("i18n.frmUsersController.Are_you_sure_to_Suspend")+userFullName+"</b>\"?<br>";
        popupDetails.confirmMsg =  kony.i18n.getLocalizedString("i18n.frmUsersController.YES__SUSPEND");
        scopeObj.view.flxSelectOptionsViewUser.setVisibility(false);
        scopeObj.openConfirm({
          header: popupDetails.headerText,
          message:  popupDetails.message,
          action: suspendUser,
          confirmMsg: popupDetails.confirmMsg,
        });
      }else {
        user_id = scopeObj.userDetails.internalusers_view[0].User_id;
        status_id="SID_ACTIVE";
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.updateUserStatus(scopeObj,{"Systemuser_id":user_id,"Status_id":status_id},"view");
      }
    },
   
    this.view.flxViewPermissionName.onClick = function() {
      var dataMap={
        "flxViewPermissions": "flxViewPermissions",
        "lblDescription": "lblDescription",
        "lblPermissionName": "lblPermissionName",
        "rTextLegalEntity": "rTextLegalEntity",
        "lblSeperator": "lblSeperator"
      };
      scopeObj.view.segViewSegment.widgetDataMap=dataMap;
      scopeObj.permissionSorter.column("lblPermissionName");
      var dataSet=scopeObj.view.segViewSegment.data;
      if(dataSet.length!==0){
        dataSet[0].lblSeperator.isVisible=true;
        dataSet.sort(scopeObj.permissionSorter.sortData);
        dataSet[0].lblSeperator.isVisible=false;
      }
      scopeObj.view.segViewSegment.setData(dataSet);
      scopeObj.determineSortFontIcon(scopeObj.permissionSorter,'lblPermissionName.text',scopeObj.view.lblViewPermissionNameSort);
      scopeObj.view.forceLayout();
    };
    scopeObj.determineSortFontIcon(scopeObj.permissionSorter,'lblPermissionName.text',scopeObj.view.lblViewPermissionNameSort);
    this.view.tbxSearchBox.onTouchStart=function(){
      scopeObj.view.flxSearchContainer.skin="slFbox0ebc847fa67a243Search";
    };
    this.view.tbxSearchBox.onKeyUp = function(){
      var from = scopeObj.view.lblAddOptionsHeading.text;
      var searchKey = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxSearchBox.text);
      if(searchKey.length!==0){
        scopeObj.view.flxSearchCrossImg.setVisibility(true);
      } else{
        scopeObj.view.flxSearchCrossImg.setVisibility(false);
      }
      if(from===kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
        scopeObj.searchForRoles(searchKey);
      }
      else if(from===kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")){
        scopeObj.searchForPermissions(searchKey);
      }
    };
    this.view.tbxSearchBox.onEndEditing=function(){
      scopeObj.view.flxSearchContainer.skin="sknflxd5d9ddop100";
    };
    this.view.flxSearchCrossImg.onClick = function () {
      scopeObj.view.tbxSearchBox.text="";
      scopeObj.view.flxSearchContainer.skin="sknflxd5d9ddop100";
      scopeObj.view.flxSearchCrossImg.setVisibility(false);
      var from = scopeObj.view.lblAddOptionsHeading.text;
      if(from===kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
        scopeObj.searchForRoles("");
      }
      else if(from===kony.i18n.getLocalizedString("i18n.users.ADDPERMISSIONS")){
        scopeObj.searchForPermissions("");
      }
    };
    this.view.searchBox.tbxSearchBox.onKeyUp = function(){
     // var from = scopeObj.view.lblPermissionName.text;
      var searchKey = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.searchBox.tbxSearchBox.text);
      if(searchKey.length!==0){
        scopeObj.view.searchBox.flxSearchCancel.setVisibility(true);
      } else{
        scopeObj.view.searchBox.flxSearchCancel.setVisibility(false);
      }
      scopeObj.view.forceLayout();
      scopeObj.searchPermissionsFilter();
    };
    this.view.searchBox.tbxSearchBox.onEndEditing=function(){
      scopeObj.view.searchBox.flxSearchContainer.skin="sknflxd5d9ddop100";
    };
    this.view.searchBox.flxSearchCancel.onClick = function () {
      scopeObj.view.searchBox.tbxSearchBox.text="";
      scopeObj.view.searchBox.flxSearchContainer.skin="sknflxd5d9ddop100";
      scopeObj.view.searchBox.flxSearchCancel.setVisibility(false);
      scopeObj.searchPermissionsFilter();
    };
    this.view.searchBox.tbxSearchBox.onTouchStart=function(){
      scopeObj.view.searchBox.flxSearchContainer.skin="slFbox0ebc847fa67a243Search";
    };
    this.view.toastMessage.flxRightImage.onClick = function () {
      scopeObj.view.flxToastMessage.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.mainHeader.flxDownloadList.onClick=function(){
      if(scopeObj.view.flxRtxNoResults.isVisible === false) {
        scopeObj.downloadCSV();
      }
    };
    this.view.flxViewEditButton.onClick=function(){
      scopeObj.isInEditForm = true;
      scopeObj.disableValidation();
      scopeObj.invokeGetEditInformation("1");
    };
    this.view.popUp.btnPopUpDelete.onClick = function(){
      if(scopeObj.view.popUp.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.frmUsersController.Disable_User")){
        scopeObj.deactivateUser();
      }
      else{
        scopeObj.setSuspendUserData();
      }
    };
    this.view.popUp.btnPopUpCancel.onClick= function(){
      scopeObj.view.flxDeactivateUser.setVisibility(false);
      scopeObj.view.popUp.btnPopUpDelete.onClick = function(){
        if(scopeObj.view.popUp.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.frmUsersController.Disable_User")){
          scopeObj.deactivateUser();
        }
        else{
          scopeObj.setSuspendUserData();
        }
      };
    };
    //check this method
    this.view.flxOption2.onClick=function(){
      scopeObj.view.flxViewEditButton.onClick();
    };
    this.view.flxOption3.onClick=function(){
      if(scopeObj.view.lblOption3.text===kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate"))
        scopeObj.setSuspendUserData();
      else
        scopeObj.suspendUser();
    };
    this.view.flxOption4.onClick=function(){
      scopeObj.onClickActiveDeactive();
    };
    this.view.btnRoles.onClick=function(){
      scopeObj.isInEditForm = true;
      scopeObj.disableValidation();
      scopeObj.invokeGetEditInformation("2");
      scopeObj.showAddRoles();
    };
    this.view.btnPermissions.onClick=function(){
      scopeObj.isInEditForm = true;
      scopeObj.disableValidation();
      scopeObj.invokeGetEditInformation("3");
      scopeObj.showAddPermissions();
    };
    this.view.btnOptionDetails.onClick= function(){
      scopeObj.showAddNewUsers(false);
    };
    this.view.btnAddPermissions.onClick= function(){
      scopeObj.ValidateUserDetails();
      if(scopeObj.validationFlag === 0){
        scopeObj.updateUnassignedPermissions();
        scopeObj.showAddPermissions();
      }
    };
    this.view.btnAddRoles.onClick= function(){
      scopeObj.ValidateUserDetails();
      if(scopeObj.validationFlag === 0){
        if(scopeObj.isInEditForm){
          scopeObj.saveUserDetails();
        }else{
          scopeObj.getNewUserFormData();
        }
        scopeObj.showAddRoles();
      }
    };
    this.view.lblTabName1.onTouchEnd= function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                     scopeObj.view.lblTabName2],scopeObj.view.lblTabName1);
      scopeObj.showViewRolesSegmentAndHeader();
    };
    this.view.lblTabName2.onTouchEnd= function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTabName1,
                                     scopeObj.view.lblTabName2],scopeObj.view.lblTabName2);
      scopeObj.showViewPermissionSegmentAndHeader();
    };
    this.view.mainHeader.btnAddNewOption.onClick=function(){
      if (scopeObj.isKeyCloakEnabled) {
        scopeObj.presenter.openKeyCloakConsole();
      }else {
        scopeObj.setRoleAndPermissionOptionVisibility(true);
        scopeObj.disableValidation();
        scopeObj.isInEditForm = false;
        scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmUsersController.Add_Users");
        scopeObj.view.breadcrumbs.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.users.ADDNEWUSER");
        scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
        scopeObj.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
        scopeObj.view.flxUsersBreadCrumb.setVisibility(true);
        scopeObj.unassignedPermissions = [];
        scopeObj.unassignedRoles = [];
        scopeObj.assignedRole = [];
        scopeObj.assignedPermissions = [];
        scopeObj.IntialPermissions =[];
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.fetchAllRolePermissions();
        scopeObj.presenter.fetchAllPermissions();
        scopeObj.presenter.fetchAllRoles();
        scopeObj.presenter.fetchMasterdataUsers();
        scopeObj.showAddNewUsers(true);
        scopeObj.hideMainSubHeader();
      }
    };
    this.view.breadcrumbs.btnBackToMain.onClick= function(){
      scopeObj.showUsers();
      
      
    };
    this.view.btnCancel.onClick= function(){
      scopeObj.showUsers();
    };
    this.view.btnAddUsersCancel.onClick= function(){
      scopeObj.showUsers();
    };
    this.view.btnAddUsersNext.onClick= function(){
      scopeObj.view.btnAddRoles.onClick();
    };
    this.view.btnNext.onClick= function(){
      var from=scopeObj.view.lblAddOptionsHeading.text;
      if(from===kony.i18n.getLocalizedString("i18n.frmPermissionsController.ADD_ROLES")){
        scopeObj.updateUnassignedPermissions();
        scopeObj.showAddPermissions();
      }
    };
    this.view.btnSave.onClick= function(){
      if(scopeObj.isInEditForm){
        scopeObj.saveUserDetails();
        scopeObj.invokeEditCall();
      }else{
        scopeObj.saveRolesPermissions();
      }
      scopeObj.showUsers();
    };
    this.view.btnAddUsersSave.onClick= function(){
      scopeObj.ValidateUserDetails();
      if(scopeObj.validationFlag === 0){
        if(scopeObj.isInEditForm){
          scopeObj.saveUserDetails();
          scopeObj.invokeEditCall();
      //    scopeObj.showUsers();
        }else{
          scopeObj.onClickOfSaveUserData();
          scopeObj.showUsers();
        }
      }
    };
    this.view.subHeader.tbxSearchBox.onTouchStart=function(){
      scopeObj.view.subHeader.flxSearchContainer.skin="slFbox0ebc847fa67a243Search";
      scopeObj.view.forceLayout();
    };
    const searchInternalUsers1 = function () {
      scopeObj.searchInternalUsers();
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
    const searchInternalUsersCall = debounce(searchInternalUsers1,300);
    this.view.subHeader.tbxSearchBox.onKeyUp=function(){
      scopeObj.currentPage=1;
      if (scopeObj.view.subHeader.tbxSearchBox.text === "") {
        scopeObj.view.customCalUpdatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
        scopeObj.view.customCalCreatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      }
      else
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      scopeObj.view.forceLayout();
      //scopeObj.searchInternalUsers();
      searchInternalUsersCall();
    };
    this.view.subHeader.tbxSearchBox.onEndEditing=function(){
      scopeObj.view.subHeader.flxSearchContainer.skin="sknflxd5d9ddop100";
      scopeObj.view.forceLayout();
    };
    this.view.customCalUpdatedDate.event=function(){
      scopeObj.view.flxCloseCal2.setVisibility(true);
      scopeObj.view.forceLayout();
    };

    this.view.customCalCreatedDate.event=function(){
      scopeObj.view.flxCloseCal1.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal1.onClick=function(){
      scopeObj.view.customCalCreatedDate.value="";
      scopeObj.view.customCalCreatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
      scopeObj.view.flxCloseCal1.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal2.onClick=function(){
      scopeObj.view.customCalUpdatedDate.value="";
      scopeObj.view.customCalUpdatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
      scopeObj.view.flxCloseCal2.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.subHeader.flxClearSearchImage.onClick=function(){
      scopeObj.view.subHeader.tbxSearchBox.text="";
      scopeObj.view.flxAdvancedSearch.isVisible=false;
      scopeObj.view.subHeader.flxSearchContainer.skin="sknflxd5d9ddop100";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.lblSelectRole.text="Select Role";
      scopeObj.view.lblSelectStatus.text="Select Status";
      scopeObj.view.customCalUpdatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
      scopeObj.view.customCalCreatedDate.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
      scopeObj.view.lblDropDown1.text="";
      scopeObj.view.lblDropDown2.text="";
      scopeObj.view.flxCloseCal1.setVisibility(false);
      scopeObj.view.flxCloseCal2.setVisibility(false);
      scopeObj.view.forceLayout();
      scopeObj.selectedRoleNames = [];
      scopeObj.selectedStatus = [];
      scopeObj.view.btnApply.info = undefined;
      scopeObj.searchInternalUsers();
    };
    this.view.btnCheckAvailabilityUser.onClick = function(){
      scopeObj.validateUsernameField();
    };
    this.view.txtbxFirstNameUser.onKeyUp=function(){
      if(scopeObj.view.txtbxFirstNameUser.text.trim().length===0)
      {
        scopeObj.view.lblFirstNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblFirstNameCount.text=scopeObj.view.txtbxFirstNameUser.text.trim().length+"/35";
        scopeObj.view.lblFirstNameCount.setVisibility(true);
      }
      scopeObj.showNoError(scopeObj.view.txtbxFirstNameUser, scopeObj.view.flxErrorFirstName);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxFirstNameUser.onEndEditing=function(){
      scopeObj.view.lblFirstNameCount.setVisibility(false);
    };
    this.view.txtbxMiddleNameUser.onEndEditing=function(){
      scopeObj.view.lblMiddleNameCount.setVisibility(false);
    };
    this.view.txtbxLastNameUser.onEndEditing=function(){
      scopeObj.view.lblLastNameCount.setVisibility(false);
    };
    this.view.txtbxEmailIDUser.onEndEditing=function(){
      scopeObj.view.lblEmailIdCount.setVisibility(false);
      scopeObj.toCheckEmailAvailability();
    };
    this.view.txtbxMiddleNameUser.onKeyUp=function(){
      if(scopeObj.view.txtbxMiddleNameUser.text.trim().length===0)
      {
        scopeObj.view.lblMiddleNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblMiddleNameCount.text=scopeObj.view.txtbxMiddleNameUser.text.trim().length+"/35";
        scopeObj.view.lblMiddleNameCount.setVisibility(true);
      }
      scopeObj.view.forceLayout();

    };
    this.view.txtbxLastNameUser.onKeyUp=function(){
      if(scopeObj.view.txtbxLastNameUser.text.trim().length===0)
      {
        scopeObj.view.lblLastNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblLastNameCount.text=scopeObj.view.txtbxLastNameUser.text.trim().length+"/35";
        scopeObj.view.lblLastNameCount.setVisibility(true);
      }
      scopeObj.showNoError(scopeObj.view.txtbxLastNameUser, scopeObj.view.flxErrorLastName);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxEmailIDUser.onKeyUp=function(){
      if(scopeObj.view.txtbxEmailIDUser.text.trim().length===0)
      {
        scopeObj.view.lblEmailIdCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblEmailIdCount.text=scopeObj.view.txtbxEmailIDUser.text.trim().length+"/70";
        scopeObj.view.lblEmailIdCount.setVisibility(true);
      }
      scopeObj.showNoError(scopeObj.view.txtbxEmailIDUser, scopeObj.view.flxErrorEmailId);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxEmailIDUser.onDone=function(){
      scopeObj.view.lblEmailIdCount.setVisibility(false);
      scopeObj.validateEmailField();
      scopeObj.view.forceLayout();
    };
    this.view.txtbxUserNameUser.onTouchStart = function(){
      scopeObj.restricSpecialCharForUsername("frmUsers_txtbxUserNameUser");
    },
    this.view.txtbxUserNameUser.onEndEditing=function(){
      scopeObj.view.lblUserNameCount.setVisibility(false);
      scopeObj.validateUsernameField();
      scopeObj.view.forceLayout();
    };
    this.view.txtbxUserNameUser.onKeyUp=function(){
      var username= scopeObj.view.txtbxUserNameUser.text;
      if(username.length===0)
      {
        scopeObj.view.lblUserNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblUserNameCount.text=username.length+"/35";
        scopeObj.view.lblUserNameCount.setVisibility(true);
      }
      scopeObj.showNoError(scopeObj.view.txtbxUserNameUser, scopeObj.view.flxUserNameNA);
      scopeObj.view.forceLayout();
    };

    this.view.btnResetPassword.onClick = function(){
      var resetAction = function() {
        var email = scopeObj.editDetails.internalusers_view[0].Email;
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.sendResetPasswordEmail({
          "emailId": email,
          "emailType" : "resetPassword"
        });
      };
      scopeObj.openConfirm({
        header: 'Reset Password',
        message: 'Are you sure you want to reset your password?',
        action: resetAction,
        confirmMsg: 'Yes',
      });
    };

    this.view.btnAddAll.onClick=function(){
      scopeObj.selectAllRecords();
    };
    this.view.btnRemoveAll.onClick=function(){
      scopeObj.unselectAllRecords();
    };
    this.view.flxUsersHeaderFullName.onClick=function(){
      scopeObj.currentPage=1;
      scopeObj.sortBy.column("Name");
      scopeObj.resetSortFontIcons();
      scopeObj.loadPageData();
    };
    this.view.RoleFilterMenu.tbxSearchBox.onKeyUp=function(){

      if(scopeObj.view.RoleFilterMenu.tbxSearchBox.text!==""){
        scopeObj.view.RoleFilterMenu.flxClearSearchImage.setVisibility(true);
      }else{
        scopeObj.view.RoleFilterMenu.flxClearSearchImage.setVisibility(false);
      }
      scopeObj.view.forceLayout();
      scopeObj.searchFilter();
    };
    this.view.reportPagination.flxPrevious.onClick = function(){
      var currentValue = parseInt(scopeObj.view.reportPagination.lblNumber.text);
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal<scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.view.reportPagination.tbxPageNumber.text=prevVal+1;
      }
      else if(currentValue<=0){
        scopeObj.view.reportPagination.tbxPageNumber.text=2;
      }else{
        scopeObj.view.reportPagination.tbxPageNumber.text=prevVal;

      }
      if(prevVal> 0){
        scopeObj.onSegmentProductPaginationChange(prevVal);
      }      
    } ;
    this.view.reportPagination.flxnext.onClick = function(){
      var currentValue = parseInt(scopeObj.view.reportPagination.lblNumber.text)+1;

      if(currentValue < scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.view.reportPagination.tbxPageNumber.text=currentValue+1;
      }else{
        scopeObj.view.reportPagination.tbxPageNumber.text= scopeObj.pageCount.TOTAL_PAGES;
      }
      if(currentValue <=scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentProductPaginationChange(currentValue);
      }
    };
    this.view.reportPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){                                                                                                 
        scopeObj.onSegmentProductPaginationChange(currentValue);
      }
    };
    this.view.flxUsersHeaderUsername.onClick=function(){
      scopeObj.currentPage=1;
      scopeObj.sortBy.column(kony.i18n.getLocalizedString("i18n.frmGroupsController.Username"));
      scopeObj.resetSortFontIcons()
      scopeObj.loadPageData();
    };
     this.view.RoleFilterMenu.flxClearSearchImage.onClick=function(){
       scopeObj.view.RoleFilterMenu.tbxSearchBox.text="";
        scopeObj.view.RoleFilterMenu.flxClearSearchImage.setVisibility(false);
       scopeObj.view.forceLayout();
         scopeObj.searchFilter();
       
     };
    this.view.flxUsersHeaderEmailId.onClick=function(){
      scopeObj.currentPage=1;
      scopeObj.sortBy.column("Email");
      scopeObj.resetSortFontIcons();
      scopeObj.loadPageData();
    };
    this.view.flxUsersHeaderPermissions.onClick=function(){
      scopeObj.currentPage=1;
      scopeObj.sortBy.column("Permission_Count");
      scopeObj.resetSortFontIcons();
      scopeObj.loadPageData();
    };
    this.view.flxUsersHeaderRole.onClick=function(){
      var flxRight = scopeObj.view.flxUsersHeader.frame.width - scopeObj.view.flxUsersHeaderRole.frame.x - scopeObj.view.flxUsersHeaderRole.frame.width;
      var iconRight = scopeObj.view.flxUsersHeaderRole.frame.width - scopeObj.view.lblRoleFilterStatus.frame.x;
      scopeObj.view.flxRoleFilterDropdown.right = (flxRight + iconRight + 24) +"px";
      if(scopeObj.isKeyCloakEnabled === true) {
        if(scopeObj.view.flxRoleFilterDropdown.isVisible===false){
          scopeObj.view.flxRoleFilterDropdown.isVisible=true;
        }else{
          scopeObj.view.flxRoleFilterDropdown.isVisible=false;
        }
        scopeObj.view.forceLayout();
      }
    };
    this.view.flxUsersHeaderStatus.onClick=function(){
      var flxRight = scopeObj.view.flxUsersHeader.frame.width - scopeObj.view.flxUsersHeaderStatus.frame.x - scopeObj.view.flxUsersHeaderStatus.frame.width;
      var iconRight = scopeObj.view.flxUsersHeaderStatus.frame.width - scopeObj.view.lblFilterStatus.frame.x;
      scopeObj.view.flxUserStatusFilter.right = (flxRight + iconRight - 10) +"px";
      scopeObj.view.flxUserStatusFilter.setVisibility(!scopeObj.view.flxUserStatusFilter.isVisible);
      if (scopeObj.view.flxSelectOptions.isVisible === true) {
        this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="slFbox";
        this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
        scopeObj.view.flxSelectOptions.isVisible = false;
      }
    };
    this.view.viewConfigureCSRAssist.backToPageHeader.btnBack.onClick = function(){
      scopeObj.view.flxViewConfigureCSRPermissions.setVisibility(false);
      scopeObj.view.flxViewSegmentAndHeaders.setVisibility(true);
    };
    this.view.segUsers.onHover=this.saveScreenY;
    this.view.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
    this.view.flxUserStatusFilter.onHover = this.onDropDownsHoverCallback;
    this.view.flxFilterDropdown.onHover = this.onDropDownsHoverCallback;
    this.view.flxStatusFilterDropdown.onHover = this.onDropDownsHoverCallback;
    this.view.flxDropDownDetailLineOfBusiness.onHover = this.onDropDownsHoverCallback;
    this.view.flxDropDownDetailUserType.onHover = this.onDropDownsHoverCallback;
    this.view.flxDropDownDetailBranchName.onHover = this.onDropDownsHoverCallback;
    this.view.flxDropDownDetailReportingManager.onHover = this.onDropDownsHoverCallback;
  },
  resetSortFontIcons:function(){
   // this.determineSortFontIcon(this.sortBy,"Role_Name",this.view.lblSortRole);
    this.determineSortFontIcon(this.sortBy,"Permission_Count",this.view.lblSortPermissions);
    this.determineSortFontIcon(this.sortBy,"Email",this.view.lblSortEmail);
    this.determineSortFontIcon(this.sortBy,"Username",this.view.lblSortUsername);
    this.determineSortFontIcon(this.sortBy,"Name",this.view.lblSortName);
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY-this.view.segUsers.contentOffsetMeasured.y;
  },
  invokeGetEditInformation : function(target){
    var data = {};
    this.usersRowIndex = this.view.segUsers.selectedRowIndex[1];
    data.User_id = this.listUsersJSON[this.usersRowIndex].User_id;
    this.editUserModel.User_id = data.User_id;
    data.isEdit = true;
    data.target = target;
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchUserDetails(this, data);
  },
  setSuspendUserData : function(){
    var userObj,user_id,status_id;
    var data=this.view.segUsers.data;
    this.usersRowIndex = this.view.segUsers.selectedRowIndex[1];
    if (data[this.usersRowIndex].lblUsersStatus.text===kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      userObj = this.listUsersJSON[this.usersRowIndex];
      user_id = userObj.User_id;
      status_id="SID_SUSPENDED";
      kony.adminConsole.utils.showProgressBar(this.view);
      this.presenter.updateUserStatus(this,{"Systemuser_id":user_id,"Status_id":status_id},"");
    }
    else{
      userObj = this.listUsersJSON[this.usersRowIndex];
      user_id = userObj.User_id;
      status_id="SID_ACTIVE";
      kony.adminConsole.utils.showProgressBar(this.view);
      this.presenter.updateUserStatus(this,{"Systemuser_id":user_id,"Status_id":status_id},"");
    }
    this.view.flxDeactivateUser.setVisibility(false);
  },
  deactivateUser : function(){
    var dologout = false;
    var userObj = this.listUsersJSON[this.usersRowIndex];
    this.listUsersJSON[this.usersRowIndex].Status_id="SID_INACTIVE";
    var user_id = userObj.User_id;
    var status_id ="SID_INACTIVE";
    kony.adminConsole.utils.showProgressBar(this.view);
    if (kony.mvc.MDAApplication.getSharedInstance().appContext.userID === userObj.Username) {
      dologout = true;
    }
    this.presenter.updateUserStatus(this,{"Systemuser_id":user_id,"Status_id":status_id},"",dologout);
    var rowObj = {
      sectionIndex : this.usersSectionindex,
      rowIndex : this.usersRowIndex
    };
    // this.AdminConsoleCommonUtils.rowLeftSwipeAnimation(this,this.view.segUsers,rowObj);
    // // this.listUsersJSON.remove(userObj);
    this.view.flxDeactivateUser.setVisibility(false);
  },
  searchForPermissions : function(searchKey) {
    var dataMap={
      "Permission_id":"Permission_id",
      "btnAdd": "btnAdd",
      "flxAddPermissions": "flxAddPermissions",
      "flxAddWrapper": "flxAddWrapper",
      "lblPermissionsName": "lblPermissionsName",
      "rtxPermissionDescription": "rtxPermissionDescription"
    };
    var data = this.unassignedPermissions.slice(0); // to copy array to new array
    var i = 0;
    //Loop to remove all assigned data and compare search key
    if(searchKey.length>0){
      while (i < data.length) {
        if (data[i].Permission_Name.toLowerCase().indexOf(searchKey.toLowerCase()) === -1) {
          data.remove(data[i]);
        } else {
          i++;
        }
      }
    }
    kony.print(data);
    this.view.segAddOptions.widgetDataMap = dataMap;
    this.view.segAddOptions.setData(data.map(this.toUnselectedPermissionSegmentStructure.bind(this)));
    if(data.length>0){
      this.view.rtxAvailableOptionsMessage1.setVisibility(false);
    }
    else{
      this.view.rtxAvailableOptionsMessage1.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchKey+"\""+kony.i18n.getLocalizedString("i18n.frmUsersController.Try_with_another_keyword");
      this.view.rtxAvailableOptionsMessage1.setVisibility(true);
    }

    this.view.forceLayout();
  },
  searchForRoles : function(searchKey) {
    var dataMap={
      "Role_id": "Role_id",
      "btnAdd": "btnAdd",
      "flxAddRole": "flxAddRole",
      "flxAddWrapper": "flxAddWrapper",
      "lblRoleName": "lblRoleName",
      "rtxRoleDescription": "rtxRoleDescription"
    };
    var data = this.unassignedRoles.slice(0); // to copy array to new array
    var i = 0;
    //Loop to remove all assigned data and compare search key
    if(searchKey.length>0){
      while (i < data.length) {
        if (data[i].Role_Name.toLowerCase().indexOf(searchKey.toLowerCase()) === -1) {
          data.remove(data[i]);
        } else {
          i++;
        }
      }
    }
    kony.print(data);
    this.view.segAddOptions.widgetDataMap = dataMap;
    this.view.segAddOptions.setData(data.map(this.toUnselectedRoleSegmentStructure.bind(this)));
    if(data.length>0){
      this.view.rtxAvailableOptionsMessage1.setVisibility(false);
    }
    else{
      this.view.rtxAvailableOptionsMessage1.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchKey+"\""+kony.i18n.getLocalizedString("i18n.frmUsersController.Try_with_another_keyword");
      this.view.rtxAvailableOptionsMessage1.setVisibility(true);
    }
    this.view.forceLayout();
  },
  addPermission: function(){
    var index = this.view.segAddOptions.selectedIndex;
    var rowIndex = index[1];
    var data = this.view.segAddOptions.data;
    var id = data[rowIndex].permId;
    var lblOptionText=data[rowIndex].lblPermissionsName;
    var toAdd={
      "id":id,
      "fontIconClose":{"text":"","tooltip":kony.i18n.getLocalizedString("i18n.frmUsersController.Remove_permission")},
      "lblOption": ""+lblOptionText
    };
    var data2 = this.view.segSelectedOptions.data;
    data2.push(toAdd);
    this.view.segSelectedOptions.setData(data2);
    this.view.segSelectedOptions.setVisibility(true);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.forceLayout();
  },
  setUsersSegmentData : function(start,end,datam,isFilter){
    this.view.flxRtxNoResults.setVisibility(false);
    this.view.flxRoleNoResultsFound.setVisibility(false);
    this.view.flxPermissions.height="100%";
    var self = this;
    var response;
    var dataMap={
      "flxOptions": "flxOptions",
      "flxStatus": "flxStatus",
      "flxUsers": "flxUsers",
      "flxUsersContainer":"flxUsersContainer",
      "lblFontIconOptions": "lblFontIconOptions",
      "fontIconStatusImg": "fontIconStatusImg",
      "lblEmailId": "lblEmailId",
      "lblFullName": "lblFullName",
      "lblPermissions": "lblPermissions",
      "lblRole": "lblRole",
      "lblSeperator": "lblSeperator",
      "lblUsername": "lblUsername",
      "lblUsersStatus": "lblUsersStatus",
      "lblFilterStatus":"lblFilterStatus",
      "flxUsersHeader": "flxUsersHeader",
      "flxUsersHeaderEmailId": "flxUsersHeaderEmailId",
      "flxUsersHeaderFullName": "flxUsersHeaderFullName",
      "flxUsersHeaderPermissions": "flxUsersHeaderPermissions",
      "flxUsersHeaderRole": "flxUsersHeaderRole",
      "flxRoleFilterDropdown":"flxRoleFilterDropdown",
      "lblRoleFilterStatus":"lblRoleFilterStatus",
     "flxUsersHeaderStatus": "flxUsersHeaderStatus",
      "flxUsersHeaderUsername": "flxUsersHeaderUsername",
      "lblSortEmail": "lblSortEmail",
      "lblSortName": "lblSortName",
      "lblSortPermissions": "lblSortPermissions",
      //"lblSortRole": "lblSortRole",
      "lblSortUsername": "lblSortUsername",
      "lblUsersHeaderEmail": "lblUsersHeaderEmail",
      "lblUsersHeaderName": "lblUsersHeaderName",
      "lblUsersHeaderPermissions": "lblUsersHeaderPermissions",
      "lblUsersHeaderRole": "lblUsersHeaderRole",
      "lblUsersHeaderSeperator": "lblUsersHeaderSeperator",
     // "lblUsersHeaderStatus": "lblUsersHeaderStatus",
      "lblUsersHeaderUsername": "lblUsersHeaderUsername"
    };
    var sortIconFor = function(column){
      return self.determineSortIconForSeg(self.sortBy,column);
    };
    var data=[];
    var statusList=[];
    		var rolesList=[];
    var allRolesNames="",allRolesIds="";
    if(this.filterdList.length!==0&&datam!==undefined&&!isFilter)
      response=this.filterdList.sort(this.sortBy.sortData);
    else if(datam!==undefined&&isFilter)
      response=datam.sort(this.sortBy.sortData);
    else
      response=this.listUsersJSON.sort(this.sortBy.sortData);
    end=response.length<end?response.length:end;
 
    for(var j=start;j<end;j++){
      var status,skin,iconSkin,iconText;
      if(response[j].Status_id==="SID_ACTIVE"){
        status=kony.i18n.getLocalizedString("i18n.secureimage.Active");
        skin="sknlblLato5bc06cBold14px";
        iconSkin="sknFontIconActivate";
        iconText = "";
      }
      else if(response[j].Status_id==="SID_SUSPENDED"){
        status=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
        skin="sknlblLato5bc06cBold14px";
        iconSkin="sknFontIconPause";
        iconText = "";
      }
      else if(response[j].Status_id==="SID_INACTIVE"){
        status=kony.i18n.getLocalizedString("i18n.users.disabled");
        skin="sknlblLato5bc06cBold14px";
        iconSkin="sknfontIconInactive";
        iconText = "";
      }
      if(response[j].Permission_Count===null){
        response[j].Permission_Count="0";
      }
      allRolesNames='';
      for( var k=0;k<response[j].roleDetails.length;k++){
        allRolesNames+=response[j].roleDetails[k].rolename+","
      }
     var rowObj= {
       "lblFontIconOptions": {"text":"\ue91f","skin":"sknFontIconOptionMenu"},
       "fontIconStatusImg":{"skin" : iconSkin,
                            "text" : iconText,"isVisible": self.isKeyCloakEnabled === false ? true: false} ,
        
        "lblEmailId": {"text":self.truncateFunction((self.AdminConsoleCommonUtils.getTruncatedString(response[j].Email, 37, 26)),26),"tooltip":response[j].Email},
        "lblFullName": {"text":self.AdminConsoleCommonUtils.getTruncatedString(response[j].Name, 14, 17),"toolTip":response[j].Name},
        "lblPermissions": { "text" :response[j].Permission_Count,"isVisible" : false},
        "lblRole": {"text": allRolesNames.substring(0,allRolesNames.length-1),"isVisible":true},
        "lblSeperator":"-",
        "lblUsername": {"text":self.AdminConsoleCommonUtils.getTruncatedString(response[j].Username, 28, 25),"tooltip":response[j].Username,"info":response[j].Username},
        "lblUsersStatus": {"text":status,"skin":skin,"isVisible": self.isKeyCloakEnabled === false ? true: false},
        "template":"flxUsers",
       "flxOptions" : {
          "skin" : "slFbox",
          "isVisible" : status === 'Disabled' ? false : true
        },
        "userId": response[j].User_id,
        "flxStatus": {"isVisible": self.isKeyCloakEnabled === false ? true: false},
      };
      data.push(rowObj);
    }

    let UniqueRoleIds=[];
    this.UniqueRoleNames=[];
    for (var i = 0; i < response.length; i++) {
      if (!statusList.contains(response[i].Status_Desc))
        statusList.push(response[i].Status_Desc);

      allRolesNames = "";
      allRolesIds = "";
      for (let j = 0; j < response[i].roleDetails.length; j++) {
        allRolesNames += response[i].roleDetails[j].rolename + ",";
        allRolesIds += response[i].roleDetails[j].roleId + ",";
        if ( this.UniqueRoleNames.indexOf(response[i].roleDetails[j].rolename) <0 &&
          UniqueRoleIds.indexOf(response[i].roleDetails[j].roleId) < 0) {
          rolesList.push({
            id: response[i].roleDetails[j].roleId,
            name: response[i].roleDetails[j].rolename,
          });
        }
        if (!this.UniqueRoleNames.includes(response[i].roleDetails[j].rolename)) {
          this.UniqueRoleNames.push(response[i].roleDetails[j].rolename);
        }
        if (!UniqueRoleIds.includes(response[i].roleDetails[j].roleId)) {
          UniqueRoleIds.push(response[i].roleDetails[j].roleId);
        }
      }
    }  
    if(!isFilter){
      self.userData = response;
      self.SetRoleFilterData(rolesList);
    }
    if(!isFilter){
      self.userData = response;
      self.SetStatusFilterData(statusList);
    }
    this.view.segUsers.widgetDataMap=dataMap;
    this.view.forceLayout();
    var segmntData =[];
    segmntData = data;
    this.usersData=data;
    this.view.segUsers.setData(segmntData);
    this.view.segUsers.info={"segData":segmntData,"isFilter":isFilter};
    this.view.segUsers.stopRerenderOnSetDataAt=true;
    document.getElementById("frmUsers_segUsers").onscroll = this.contextualMenuOff;
    this.view.forceLayout();
    self.pagination(response);
    kony.adminConsole.utils.hideProgressBar(this.view);
    
    if (start === 0){
      start = 1;
    }
    else{
      start=start;
    }
    this.view.reportPagination.lblShowing.text = "Showing" + " " + (start) + " - " + end + " " + "Of " + response.length;
  },
  sliceFullName: function(name){
    return name.length> 10? name.slice(0,9)+"..":name;
  },
  contextualMenuOff: function(context) {
    if(this.scrollFlag===false){
      this.scrollFlag=true;
    }else{
        this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="slFbox";
        this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
      this.view.flxSelectOptions.isVisible = false;
      this.scrollFlag=false;
    }
  }, 
 
  SetRoleFilterData:function(segData){
 
    var self = this;
    var maxSizeText="";
    var rolesList=[];
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "lblDescription": "lblDescription",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "id":"id"
    };
    var data = segData.map((rec) => {
     maxSizeText=rec.name.length>maxSizeText.length?rec.name:maxSizeText;
      return{
        "id":rec.id,
        "flxSearchDropDown": "flxSearchDropDown",
        "lblDescription": rec.name,
        "flxCheckBox": {
          "isVisible": true
         
        },
        "imgCheckBox": {
          "isVisible": true, 
		           "src":self.checkboxselected
          
        }
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
   self.view.flxRoleFilterDropdown.width=flexWidth+"px";
    self.view.RoleFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.RoleFilterMenu.segStatusFilterDropdown.setData(data);
     self.view.RoleFilterMenu.segStatusFilterDropdown.info={"segData":data};
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
self.view.RoleFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    //self.view.RoleFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
  },
  SetStatusFilterData:function(segData){
    var self = this;
    var maxSizeText="";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "lblDescription": "lblDescription",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox"
    };
    var data = segData.map(function(segData){
      maxSizeText=segData.length>maxSizeText.length?segData:maxSizeText;
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "lblDescription": segData,
        "flxCheckBox": {
          "isVisible": true
        },
        "imgCheckBox": {
          "isVisible": true
        }
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    self.view.flxUserStatusFilter.width=flexWidth+"px";
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
  },
  parseAllRoles : function(data){
    this.unassignedRoles = [];
    function toRoleStructure(role){
      for(var i=0;i<role.legalEntitiesRoleInfo.length;i++){
      return {
        "Role_Name": role.legalEntitiesRoleInfo[i].role_Name,
        "Role_id":role.legalEntitiesRoleInfo[i].role_id,
        "Role_Desc":role.legalEntitiesRoleInfo[i].role_Desc,
      }
      };
    }
    this.unassignedRoles = data.map(toRoleStructure);
  },
  parseAllPermissions : function(data){
    this.AllPermissions = [];
    function toPermissionStructure(permission){
      return{
        "Permission_id":permission.Permission_id,
        "Permission_Name": permission.Permission_Name,
        "Permission_Desc": permission.Permission_Desc,
      };
    }
    this.AllPermissions = data.map(toPermissionStructure);
  },
  parseUnassignedRoles: function(data){
    this.unassignedRoles = [];
    var isRoleAssigned = false;
    if(data.internalusers_view&&typeof(data.internalusers_view[0].Role_id) !== 'undefined'){
      isRoleAssigned = true;
    }

    function toRoleStructure(role){
      return {
        "Role_Name": role.Name,
        "Role_id":role.id,
        "Role_Desc":role.Description,
      };
    }
    this.unassignedRoles = data.unassigned_Roles.map(toRoleStructure);
  },
  parseUnassignedPermissions: function(data){

    this.unassignedPermissions = [];
    var unassigned_Permissions = data.unassigned_Permissions;
    if(unassigned_Permissions !== null){
      for (var i = 0; i < unassigned_Permissions.length; i++) {
        this.unassignedPermissions.push({

          "Permission_id":unassigned_Permissions[i].id,
          "Permission_Name": unassigned_Permissions[i].Name,
          "Permission_Desc": unassigned_Permissions[i].Description,

        });
      }
    }
  },
  parseAssignedPermissions: function(data){

    this.assignedPermissions = [];
    var assigned_Permissions = data.userdirectpermission_view;
    if(assigned_Permissions !== null){
      for (var i = 0; i < assigned_Permissions.length; i++) {
        this.assignedPermissions.push({

          "Permission_Name": assigned_Permissions[i].Permission_Name,
          "Permission_id":assigned_Permissions[i].Permission_id,
          "Permission_Desc":assigned_Permissions[i].Permission_Description,
        });
      }
      this.IntialPermissions = this.assignedPermissions.concat([]);
    }
  },
  parseAssignedRole: function(data){
    var userDetails = data.internalusers_view[0];
    if(userDetails !== null){
      this.assignedRole = [];
      if(typeof(userDetails.Role_id) !== 'undefined'){
        this.assignedRole.push({
          "Role_Name": userDetails.Role_Name,
          "Role_id":userDetails.Role_id,
          "Role_Desc":userDetails.Role_Desc,
        });
      }
    }
  },
  parsePermissions: function(data){
    this.AllPermissions = [];
    function toPermissionStructure(permission){
      return{
        "Permission_id":permission.id,
        "Permission_Name": permission.Name,
        "Permission_Desc": permission.Description,
      };
    }
    this.AllPermissions = data.Permissions.map(toPermissionStructure);
  },
  parseAllRolePermissions: function(data){
    this.AllRolePermissions = [];
    function toRolePermissionStructure(rolepermission){
      return{
        "Permission_id":rolepermission.Permission_id,
        "Role_id": rolepermission.Role_id
      };
    }
    this.AllRolePermissions = data.map(toRolePermissionStructure);
  },
  updateUnassignedPermissions: function(){

    var initialPermissionIds = [];
    for(var i=0; i<this.IntialPermissions.length; i++){
      initialPermissionIds.push(this.IntialPermissions[i].Permission_id);
    }

    if(typeof(this.assignedRole[0]) === 'undefined'){

      if(this.IntialPermissions.length > 0){
        this.unassignedPermissions  = (this.AllPermissions).filter(function(x) { if(initialPermissionIds.indexOf(x.Permission_id) >= 0) return false;
                                                                                else return true; });
        this.assignedPermissions = this.IntialPermissions.concat([]);
      }else{
        this.unassignedPermissions  = this.AllPermissions;
        this.assignedPermissions = [];
      }
      this.RoleRelatedPermissions = [];
    }else{
      var Roleid = this.assignedRole[0].Role_id;
      function filterRolePermissions(RolePermission){
        return RolePermission.Role_id === Roleid;
      }
      var RolePermissions = this.AllRolePermissions.filter(filterRolePermissions);
      this.RoleRelatedPermissions = RolePermissions;

      //Filtering left panel
      var permissionsToRemove = [];
      for(i=0; i<RolePermissions.length; i++){
        permissionsToRemove.push(RolePermissions[i].Permission_id);
      }
      for(i=0;i<initialPermissionIds.length;i++) {
        if(permissionsToRemove.indexOf(initialPermissionIds[i]) < 0) {
          permissionsToRemove.push(initialPermissionIds[i]);
        }
      }

      var filteredPermissions = this.AllPermissions;
      filteredPermissions = filteredPermissions.filter(function(permission){
        if(permissionsToRemove.indexOf(permission.Permission_id) >= 0) return false;
        else return true;
      });
      //Filtering right panel
      var filteredRolePermissions = [];
      var newAssignedPermissions = JSON.parse(JSON.stringify(this.IntialPermissions));
      for (var j = 0; j < RolePermissions.length; j++) {
        filteredRolePermissions = filteredRolePermissions.concat(this.AllPermissions.filter(function(permission) {
          return permission.Permission_id === RolePermissions[j].Permission_id;
        }));
        newAssignedPermissions = newAssignedPermissions.filter(function(permission) {
          return permission.Permission_id !== RolePermissions[j].Permission_id;
        });
      }

      this.assignedPermissions = newAssignedPermissions;
      this.RoleRelatedPermissions = filteredRolePermissions;
      this.unassignedPermissions = filteredPermissions;
    }
  },
  toSelectedRoleSegmentStructure : function(roleModel){
    var self=this;
    return {
      "fontIconClose":  {"isVisible": true,"tooltip":kony.i18n.getLocalizedString("i18n.frmUsersController.Remove_role")},
      "lblOption": roleModel.Role_Name,
      "Role_id":roleModel.Role_id,
      "Role_desc":roleModel.Role_Desc,
      "flxClose":{"isVisible":false},
      "template":"flxOptionAdded",
      "flxAddOptionWrapper":{
        "skin": "sknflxffffffop0e",
        "hoverSkin": "sknFlxSegRowHover11abeb",
        "onHover":self.onHoverEventCallback

      }
    };
  },
  toUnselectedRoleSegmentStructure : function(roleModel){
    return {
      "Role_id": roleModel.Role_id,
      "btnAdd": {
        "text": kony.i18n.getLocalizedString("i18n.DragBox.ADD"),
        "isVisible": this.assignedRole.length === 0 ? true : false,
        "onClick":this.addRole
      },
      "lblRoleName": roleModel.Role_Name,
      "rtxRoleDescription": roleModel.Role_Desc,
      "template": "flxAddRole"
    };
  },
  truncateFunction : function(orignalString,stringLength){
    var finalString = orignalString;
    if(orignalString.length > stringLength){
      finalString = orignalString.substr(0,stringLength)+"...";
    }
    return finalString;
  },
  toSelectedPermissionSegmentStructure : function(permissionModel){
    var self=this;
    return {
      "fontIconClose":  {"isVisible": true,"tooltip":kony.i18n.getLocalizedString("i18n.frmUsersController.Remove_permission")},
      "lblOption":  {
        "text":self.truncateFunction(permissionModel.Permission_Name,20),
        "skin":"sknlbl485c7514px",
        "toolTip" : permissionModel.Permission_Name
      },
      "Permission_id":permissionModel.Permission_id,
      "Permission_Desc":permissionModel.Permission_Desc,
      "flxClose":{"isVisible":false},
      "template":"flxOptionAdded",
      "flxAddOptionWrapper":{
        "skin": "sknflxffffffop0e",
        "hoverSkin": "sknFlxSegRowHover11abeb",
        "onHover":self.onHoverEventCallback
      }
    };
  },
  toRoleSelectedPermissionSegmentStructure : function(rolePermissionModel){
    var self = this;
    return {
      "fontIconClose":  {"isVisible": false},
      "lblOption": {
        "text":self.truncateFunction(rolePermissionModel.Permission_Name,20),
        "skin":"lblfffffflatoregular14px",
        "toolTIp" :rolePermissionModel.Permission_Name
      },
      "Permission_id":rolePermissionModel.Permission_id,
      "Permission_Desc":rolePermissionModel.Permission_Desc,
      "flxClose":{"isVisible":false},
      "template":"flxOptionAdded",
      "flxAddOptionWrapper":{
        "skin":"sknflx5E7A91Br5E7A913px",
        "hoverSkin":"sknflx5E7A91Br5E7A913pxDisabled"
      }
    };
  },
  toUnselectedPermissionSegmentStructure : function(permissionModel){
    return{
      "btnAdd": {
        "text":kony.i18n.getLocalizedString("i18n.DragBox.ADD"),
        "onClick":this.addPermissionstoRole
      },
      "permId":permissionModel.Permission_id,
      "lblPermissionsName": permissionModel.Permission_Name,
      "rtxPermissionDescription": permissionModel.Permission_Desc,
      "template":"flxAddPermissions"
    };
  },
  drawRolesSelection: function(){
    this.view.tbxSearchBox.text = "";
    this.view.flxSearchCrossImg.setVisibility(false);
    var dataMap = {
      "Role_id": "Role_id",
      "btnAdd": "btnAdd",
      "flxAddRole": "flxAddRole",
      "flxAddWrapper": "flxAddWrapper",
      "lblRoleName": "lblRoleName",
      "rtxRoleDescription": "rtxRoleDescription"
    };
    this.view.segAddOptions.widgetDataMap = dataMap;
    this.view.segAddOptions.setData(this.unassignedRoles.map(this.toUnselectedRoleSegmentStructure.bind(this)));
    var dataMap2 = {
      "flxAddOptionWrapper": "flxAddOptionWrapper",
      "flxClose": "flxClose",
      "flxOptionAdded": "flxOptionAdded",
      "fontIconClose": "fontIconClose",
      "lblOption": "lblOption"
    };
    this.view.segSelectedOptions.widgetDataMap = dataMap2;
    this.view.segSelectedOptions.setData(this.assignedRole.map(this.toSelectedRoleSegmentStructure));
    this.view.segSelectedOptions.setVisibility(true);
    this.view.forceLayout();
  },
  addRoleToAUser: function(){
    if(this.assignedRole.length === 0){
      this.view.rtxSelectedOptionsMessage.setVisibility(false);
      var index = this.view.segAddOptions.selectedIndex;
      var rowIndex = index[1];
      var roleToAdd = this.view.segAddOptions.data[rowIndex];
      var role = {
        "Role_id":roleToAdd.Role_id,
        "Role_Name":roleToAdd.lblRoleName,
        "Role_Desc":roleToAdd.rtxRoleDescription
      };
      this.assignedRole.push(role);
      var notTheSelectedRole = function(role){
        return role.Role_id !== roleToAdd.Role_id;
      };
      this.unassignedRoles = this.unassignedRoles.filter(notTheSelectedRole);
      this.drawRolesSelection();
    }else{
      kony.print('Only one role per user!');
    }
  },
  removeRoleFromAUser: function(){
    if(this.assignedRole.length > 0){
      this.unassignedRoles.push(this.assignedRole[0]);
      this.assignedRole = [];
      this.view.rtxSelectedOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.One_role_for_a_user");
      this.view.rtxSelectedOptionsMessage.setVisibility(true);
      this.drawRolesSelection();
    }else{
      kony.print('No roles assigned yet.');

    }
  },

  addToUser : function(){
    if(this.currFormNo === 1){
      this.addRoleToAUser();
    }else if(this.currFormNo === 2){
      this.view.btnAddAll.setVisibility(true);
      this.view.btnRemoveAll.setVisibility(true);
      this.addPermissionToAUser();
    }
  },
  removeFromUser : function(){
    if(this.currFormNo === 1){
      this.removeRoleFromAUser();

    }else if(this.currFormNo === 2){
      this.removePermissionToAUser();
    }
  },
  drawPermissionSelection: function(){
    this.view.tbxSearchBox.text = "";
    this.view.flxSearchCrossImg.setVisibility(false);
    var dataMap={
      "Permission_id":"Permission_id",
      "btnAdd": "btnAdd",
      "flxAddPermissions": "flxAddPermissions",
      "flxAddWrapper": "flxAddWrapper",
      "lblPermissionsName": "lblPermissionsName",
      "rtxPermissionDescription": "rtxPermissionDescription"
    };
    this.view.segAddOptions.widgetDataMap = dataMap;
    this.view.segAddOptions.setData(this.unassignedPermissions.map(this.toUnselectedPermissionSegmentStructure.bind(this)));
    var dataMap2 = {
      "flxAddOptionWrapper": "flxAddOptionWrapper",
      "flxClose": "flxClose",
      "flxOptionAdded": "flxOptionAdded",
      "fontIconClose": "fontIconClose",
      "lblOption": "lblOption"
    };
    this.view.segSelectedOptions.widgetDataMap = dataMap2;
    this.view.segSelectedOptions.setData((this.assignedPermissions.map(this.toSelectedPermissionSegmentStructure)).concat(this.RoleRelatedPermissions.map(this.toRoleSelectedPermissionSegmentStructure)));
    this.view.segSelectedOptions.setVisibility(true);
    if(this.view.segSelectedOptions.data.length!==0){
      if(this.assignedPermissions.length>0)
        this.view.btnRemoveAll.setVisibility(true);
      else
        this.view.btnRemoveAll.setVisibility(false);
      this.view.rtxSelectedOptionsMessage.setVisibility(false);
    }
    else{
      this.view.rtxSelectedOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Click_add_to_select_the_item");
      this.view.rtxSelectedOptionsMessage.setVisibility(true);
      this.view.btnRemoveAll.setVisibility(false);
    }
    if(this.unassignedPermissions.length>0){
      this.view.rtxAvailableOptionsMessage1.setVisibility(false);
      this.view.btnAddAll.setVisibility(true);
    }
    else{
      this.view.rtxAvailableOptionsMessage1.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_Permission_available");
      this.view.rtxAvailableOptionsMessage1.setVisibility(true);
      this.view.btnAddAll.setVisibility(false);
    }
    this.view.forceLayout();
  },
  addPermissionToAUser: function(){
    this.view.btnRemoveAll.setVisibility(true);
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    var index = this.view.segAddOptions.selectedIndex;
    var rowIndex = index[1];
    var permissionToAdd = this.view.segAddOptions.data[rowIndex];
    var permission = {
      "Permission_id":permissionToAdd.permId,
      "Permission_Name":permissionToAdd.lblPermissionsName,
      "Permission_Desc":permissionToAdd.rtxPermissionDescription
    };
    this.assignedPermissions.push(permission);
    var notTheSelectedPermission = function(permission){
      return permission.Permission_id !== permissionToAdd.permId;
    };
    this.unassignedPermissions = this.unassignedPermissions.filter(notTheSelectedPermission);
    this.drawPermissionSelection();
  },
  removePermissionToAUser: function(){
    this.view.btnAddAll.setVisibility(true);
    if(this.assignedPermissions.length > 0){
      this.view.rtxAvailableOptionsMessage1.setVisibility(false);
      var index = this.view.segSelectedOptions.selectedIndex;
      var rowIndex = index[1];
      var permissionToRemove = this.view.segSelectedOptions.data[rowIndex];
      var permission = {
        "Permission_id":permissionToRemove.Permission_id,
        "Permission_Name":permissionToRemove.lblOption.text,
        "Permission_Desc":permissionToRemove.Permission_Desc
      };
      this.unassignedPermissions.push(permission);
      var notTheSelectedPermission = function(permission){
        return permission.Permission_id !== permissionToRemove.Permission_id;
      };
      this.assignedPermissions = this.assignedPermissions.filter(notTheSelectedPermission);
      this.drawPermissionSelection();
    }else{
      kony.print('No permissions assigned yet.');
      this.view.rtxSelectedOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.Click_add_to_select_the_item");
      this.view.rtxSelectedOptionsMessage.setVisibility(true);
    }
  },

  unSelectedOption: function() {
    this.removeFromUser();
  },

  addPermissionstoRole: function(){
    this.addToUser();
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
    var data=[];
    this.view.segViewSegment.widgetDataMap=dataMap;
    this.view.segViewSegment.setData(data);
    this.view.forceLayout();
  },
  setViewRolesSegmentData : function(){
    this.view.flxViewSegment.setVisibility(true);
    this.view.segViewSegment.setVisibility(true);
    var dataMap={
      "flxViewRoles": "flxViewRoles",
      "lblDescription": "lblDescription",
      "lblRoleName": "lblRoleName",
      "rTextLegalEntity": "rTextLegalEntity",
      "lblSeperator": "lblSeperator"
    };
    var data=this.userDetails.role;
    this.view.segViewSegment.widgetDataMap=dataMap;
    if (data.length !== 0) {
      for(var i=0;i<data.length;i++){
      if (this.isSingleEntity){
        data[i].rTextLegalEntity.isVisible = false;
      }
      else{
        data[i].rTextLegalEntity.isVisible = true; 
      }
      }
      data[0].lblSeperator.isVisible=false;
      this.view.segViewSegment.setData(data);
      this.view.flxRolesHeader.setVisibility(true);
      this.view.rtxAvailabletxt.setVisibility(false);
      this.view.segViewSegment.setVisibility(true);
    } else {
      this.view.segViewSegment.setVisibility(false);
      this.view.flxRolesHeader.setVisibility(false);
      this.view.rtxAvailabletxt.setVisibility(true);
      this.view.rtxAvailabletxt.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.No_roles_are_available");
    }
    this.view.forceLayout();
  },
  setViewPermissionSegmentData : function(){
    this.view.flxViewSegment.setVisibility(true);
    this.view.segViewSegment.setVisibility(true);
    var actionIcon = {};
    var finalDataSort;
    var self =this;
    var dataMap={
      "flxViewPermissions": "flxViewPermissions",
      "lblDescription": "lblDescription",
      "lblPermissionName": "lblPermissionName",
      "lblSeperator": "lblSeperator",
      "flxActionIcon":"flxActionIcon",
      "lblIconAction":"lblIconAction",
      "Permission_id":"Permission_id",
      "Role_id":"Role_id",
      "User_id":"User_id",
      "Legalentity_Id":"Legalentity_Id"
    };
   // var data = this.userDetails.permissions;
    let userLegalArr = this.getCurrentUserLEArr();
    var allFlag = false, restrictedLE = -1;
    for(let k=0;k<this.legalEntitiesArray.length;k++)
      if(this.legalEntitiesArray[k].id==="ALL"){
        allFlag=true;
        break;
      }
    //check to identify the permissions view screen type
    if(allFlag === false && this.legalEntitiesArray.length === 1){
      restrictedLE = 0;
      for (let k = 0; k < userLegalArr.length; k++) {
        if( this.legalEntitiesArray[0].id === userLegalArr[k].id){
          restrictedLE = restrictedLE+1;
          break;
        }
      }
    }
    var isLETypeDisplay = allFlag === true ? true: (restrictedLE === 0);

    if(this.isKeyCloakEnabled === false){
      this.view.lblViewPermissionName.text = "PERMISSION NAME";
      this.view.lblViewPermissionDescription.text = "DESCRIPTION";
      this.view.lblViewPermissionName.skin = "sknlblLato696c7312pxBold";
      this.view.lblViewPermissionDescription.skin = "sknlblLato696c7312pxBold";
      this.view.searchBoxUsers.setVisibility(true);
    }else{
      if (isLETypeDisplay === false && this.isSingleEntity === true) {
        this.view.lblViewPermissionName.text = "PERMISSION NAME";
        this.view.lblViewPermissionDescription.text = "DESCRIPTION";
        this.view.lblViewPermissionName.skin = "sknlblLato696c7312pxBold";
        this.view.lblViewPermissionDescription.skin = "sknlblLato696c7312pxBold";
        this.view.searchBoxUsers.setVisibility(true);
      } else if (this.legalEntitiesArray.length > 1 || isLETypeDisplay === true || this.isSingleEntity === false) {
        this.view.lblViewPermissionName.text = "LEGAL ENTITY";
        this.view.lblViewPermissionDescription.text = "PERMISSIONS";
        this.view.lblViewPermissionName.skin = "sknlblLato696c7312px";
        this.view.lblViewPermissionDescription.skin = "sknlblLato696c7312px";
      }
    }
    var data1 = [];
      if (this.isKeyCloakEnabled === true) {
        if (this.isSingleEntity === false) {
          var permissions = this.getPermissions();
          if (allFlag) {
            let data = this.getAllLEListArr();
            data1 = data.map((rec) => {
              return {
                lblPermissionName: {
                  text: rec.companyName,
                  skin: "sknlblLatoBold35475f14px",
                  hoverSkin: "sknLbl29327613pxHov",
                  onTouchStart: self.Openclose.bind(self),
                },
                lblDescription: permissions["ALL"].length,
                lblSeperator: { text: "-", isVisible: true },
                User_id: { text: rec.id },
                permissions: permissions["ALL"],
              };
            });
          } else {
            data1 = this.legalEntitiesArray.map((rec) => {
              return {
                lblPermissionName: {
                  text: rec.companyName,
                  skin: "sknlblLatoBold35475f14px",
                  hoverSkin: "sknLbl29327613pxHov",
                  onTouchStart: self.Openclose.bind(self),
                },
                lblDescription: permissions[rec.id]
                  ? permissions[rec.id].length
                  : "0",
                lblSeperator: { text: "-", isVisible: true },
                User_id: { text: rec.id },
                permissions: permissions[rec.id] ? permissions[rec.id] : [],
              };
            });
          }
        } else if (
          this.legalEntitiesArray.length <= 1 &&
          isLETypeDisplay === false
        ) {
          data1 = this.getPermissionsListData();
        }
      } else {
        data1 = this.getPermissionsListData();
      }
    this.segViewSegmentData=data1;


    this.view.segViewSegment.widgetDataMap=dataMap;
    let userLegalEntities = kony.mvc.MDAApplication.getSharedInstance().appContext.legalEntityId;
    if (data1.length !== 0) {
      if(this.view.lblViewPermissionName.text=="LEGAL ENTITY"){
        for(var i=0;i<data1.length;i++)
        {
          if(userLegalEntities.indexOf(data1[i].User_id.text)>=0){
            data1[i].lblPermissionName.skin="sknLbl29327613px";
            data1[i].lblPermissionName.onTouchStart=function(context){ 
              self.Openclose(context);
            };
            this.segViewSegmentData[i].lblPermissionName.hoverSkin="sknLbl29327613pxHov";
          }
          else{
            data1[i].lblPermissionName.skin="sknLabel7B7B7B";
            this.segViewSegmentData[i].lblPermissionName.hoverSkin="sknLabel0dc920e77Hov";
            data1[i].lblPermissionName.text=data1[i].lblPermissionName.text+" (Access Restricted)";
            data1[i].lblPermissionName.onTouchStart=function(){ 
            };
          }
        }        
      }   
      this.view.segViewSegment.setData(data1);
      this.view.flxPermissionsHeader.setVisibility(true);
      this.view.rtxAvailabletxt.setVisibility(false);
      this.view.flxViewPermissionsHeader.setVisibility(true);
      this.view.flxViewPermissionSeperator.setVisibility(true);
      this.view.segViewSegment.setVisibility(true);
    } else {
      this.view.flxPermissionsHeader.setVisibility(false);
      this.view.rtxAvailabletxt.setVisibility(true);
      this.view.flxViewPermissionsHeader.setVisibility(false);
      this.view.flxViewPermissionSeperator.setVisibility(false);
      this.view.segViewSegment.setVisibility(false);
      this.view.rtxAvailabletxt.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_permissions_are_available");
    }
    this.view.forceLayout();
  },
  getPermissionsListData : function(){
    var self = this;
     var data1=self.userDetails.permissions;
      var finalData = data1.map(function (record) {
        var actionIcon={};
        if (record.Permission_isComposite === "true") { //to assign icon based on permission
          actionIcon = self.getActionItem();
        }
        record.lblIconAction = actionIcon;
        record.flxActionIcon = {
          "isVisible": record.Permission_isComposite === "true" ? true : false,
          "onClick": function () {
            self.navigateToConfigureViewCSRPerm();
          }
        };
        return record;
      });
    return finalData;
  },
  onClickOptions: function() {
    var selItems = this.view.segUsers.selectedItems[0];
    var hgtValue;
    var usersindex = this.view.segUsers.selectedIndex;
    this.usersSectionindex=usersindex[0];
    if (this.view.segUsers.data.length - 1  >= this.gblselIndex ) {
      this.view.segUsers.data[this.gblselIndex].flxOptions.skin="slFbox";
      this.view.segUsers.setDataAt(this.view.segUsers.data[this.gblselIndex],this.gblselIndex);
    }
    this.usersRowIndex = this.view.segUsers.selectedRowIndex[1];
    this.gblselIndex = this.view.segUsers.selectedRowIndex[1];
    var clckd_selectedRowIndex = this.view.segUsers.selectedRowIndex[1];
    var flexLeft = this.view.segUsers.clonedTemplates[clckd_selectedRowIndex].flxOptions.frame.x;
    this.view.flxSelectOptions.left=parseInt((flexLeft-110),10) + "px";
    kony.print("clckd_selectedRowIndex----" + JSON.stringify(clckd_selectedRowIndex));
    if (selItems.lblUsersStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.gblsegRoles = clckd_selectedRowIndex;
      hgtValue = (((clckd_selectedRowIndex + 1) * 50)+65)-this.view.segUsers.contentOffsetMeasured.y;
      kony.print("hgtValue in roles------" + hgtValue);
      this.view.flxSelectOptions.top = hgtValue+ "px";
      this.view.segUsers.setDataAt({
        "lblFontIconOptions": selItems.lblFontIconOptions,
        "fontIconStatusImg":selItems.fontIconStatusImg,
        "lblFullName": {"text":selItems.lblFullName.text,"toolTip":selItems.lblFullName.toolTip},
        "lblUsername": {"text":selItems.lblUsername.text,"tooltip":selItems.lblUsername.info,"info":selItems.lblUsername.info},
        "lblEmailId": {"text":selItems.lblEmailId.text,"tooltip":selItems.lblEmailId.tooltip},
        "lblRole": {"text":selItems.lblRole.text,"isVisibe":selItems.lblRole.isVisible},
        "lblPermissions": selItems.lblPermissions,
        "lblUsersStatus": selItems.lblUsersStatus,
        "lblSeperator": selItems.lblSeperator,
        "userId": selItems.userId,
        "template": "flxUsers"
      }, this.gblselIndex);
      this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
      this.view.btnRoles.setVisibility(true);
      this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
      this.view.btnPermissions.setVisibility(true);
      this.view.lblDescription.setVisibility(true);
      this.view.flxSeperator.setVisibility(true);
      this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
      this.view.lblOption3.text = kony.i18n.getLocalizedString("i18n.permission.Suspend");
      this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.users.disable");
      this.view.fontIconDeactivate.text = "\ue91c";
      this.view.fontIconSuspend.text = "\ue91d";
      this.view.flxSelectOptions.frame.height=234;
      this.fixContextualMenu(hgtValue);
    } else {
      this.gblsegRoles = clckd_selectedRowIndex;
      hgtValue = (((clckd_selectedRowIndex + 1) * 50)+65)-this.view.segUsers.contentOffsetMeasured.y;
      kony.print("hgtValue in permissions------" + hgtValue);
      this.view.flxSelectOptions.top = hgtValue + "px";
      this.view.segUsers.setDataAt({
        "lblFontIconOptions": selItems.lblFontIconOptions,
        "fontIconStatusImg":selItems.fontIconStatusImg,
        "lblFullName": {"text":selItems.lblFullName.text,"toolTip":selItems.lblFullName.toolTip},
        "lblUsername": {"text":selItems.lblUsername.text,"tooltip":selItems.lblUsername.info,"info":selItems.lblUsername.info},
        "lblEmailId": {"text":selItems.lblEmailId.text, "tooltip": selItems.lblEmailId.tooltip},
        "lblRole": {"text":selItems.lblRole.text,"isVisibe":selItems.lblRole.isVisible},
        "lblPermissions": selItems.lblPermissions,
        "lblUsersStatus": selItems.lblUsersStatus,
        "lblSeperator": selItems.lblSeperator,
        "userId": selItems.userId,
        "template": "flxUsers"
      }, this.gblselIndex);
      this.view.btnRoles.text = kony.i18n.getLocalizedString("i18n.leftmenu.Roles");
      this.view.btnRoles.setVisibility(false);
      this.view.btnPermissions.text = kony.i18n.getLocalizedString("i18n.users.Permissions");
      this.view.btnPermissions.setVisibility(false);
      this.view.lblDescription.setVisibility(false);
      this.view.flxSeperator.setVisibility(false);
      this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
      this.view.lblOption3.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.lblOption4.text = kony.i18n.getLocalizedString("i18n.users.disable");
      this.view.fontIconSuspend.text = "\ue91d";
      this.view.flxSelectOptions.frame.height=115;
      this.fixContextualMenu(hgtValue);
    }
    if(this.view.flxUserStatusFilter.isVisible===true)
      this.view.flxUserStatusFilter.isVisible=false;
    if (this.view.flxSelectOptions.isVisible===true) {
      this.scrollFlag=false;
      this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="slFbox";
      this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
      this.view.flxSelectOptions.isVisible = false;
    }
    else{
      this.scrollFlag=false;
      this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="sknflxffffffop100Border424242Radius100px";
      this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
      this.view.flxSelectOptions.isVisible = true;
    }
    this.view.forceLayout();
  },
  fixContextualMenu:function(heightVal){
    if (this.isKeyCloakEnabled) { 
      this.view.flxSelectOptions.frame.height = 47; 
      this.hideUserListUi(this.isKeyCloakEnabled);
    }
    if(((this.view.flxSelectOptions.frame.height+heightVal)>(this.view.segUsers.frame.height+90))&&this.view.flxSelectOptions.frame.height<this.view.segUsers.frame.height){
      this.view.flxTopArrowImage.setVisibility(false);
      this.view.flxDownArrowImage.setVisibility(true);
      this.view.flxMenuOptions.top="0px";
      if(this.view.flxAdvancedSearch.isVisible===true)
        this.view.flxSelectOptions.top=((heightVal-this.view.flxSelectOptions.frame.height)+47)+"px";
      else
        this.view.flxSelectOptions.top=((heightVal-this.view.flxSelectOptions.frame.height)-49)+"px";
    }
    else{
      this.view.flxTopArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxMenuOptions.top="-1px";
      if(this.view.flxAdvancedSearch.isVisible===true)
        this.view.flxSelectOptions.top=(heightVal+this.view.flxAdvancedSearch.frame.height-10)+"px";//10 is for height of arrow
      else
        this.view.flxSelectOptions.top = heightVal-10 + "px";
    }
    this.view.forceLayout();
  },
  openConfirm : function(popupModel){
    this.view.popUp.lblPopUpMainMessage.text = popupModel.header;
    this.view.popUp.rtxPopUpDisclaimer.text = popupModel.message;
    this.view.popUp.btnPopUpDelete.text = popupModel.confirmMsg;
    var backUpAction = this.view.popUp.btnPopUpDelete.onClick;
    var self = this;
    this.view.popUp.btnPopUpDelete.onClick = function(){
      popupModel.action();
      self.view.flxDeactivateUser.setVisibility(false);
      self.view.popUp.btnPopUpDelete.onClick = backUpAction;
    };
    this.view.flxDeactivateUser.setVisibility(true);
  },
  onClickActiveDeactive:function(){

    var userFullName=this.view.segUsers.data[this.usersRowIndex].lblFullName.toolTip;
    if(this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.users.disable")){
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Disable_User");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Disable_user_popup")+userFullName+"</b>\"?<br><br>"+kony.i18n.getLocalizedString("i18n.frmUsersController.DisableMessage")+"<br>";
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDisable");
      this.view.flxDeactivateUser.setVisibility(true);
    }
    else  if(this.view.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate")){
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Yes__Activate");
    }
    this.view.flxSelectOptions.setVisibility(false);
    this.view.forceLayout();
  },
  suspendUser : function(){
    this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="slFbox";
      this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
    var userFullName=this.view.segUsers.data[this.usersRowIndex].lblFullName.toolTip;
    if(this.view.segUsers.data[this.usersRowIndex].lblUsersStatus.text===kony.i18n.getLocalizedString("i18n.secureimage.Active")){
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Suspend_User");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Are_you_sure_to_Suspend")+userFullName+"</b>\"?<br>";
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmUsersController.YES__SUSPEND");
      this.view.flxDeactivateUser.setVisibility(true);
    }
    else{
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmRolesController.Yes__Activate");
    }
    this.view.flxSelectOptions.setVisibility(false);

  },
  searchInternalUsers:function()
  {
    var value= this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if(value===""){
      this.clearUserDefaults();
      this.sortBy = this.getObjectSorter('Name');
      this.determineSortFontIcon(this.sortBy,"Name",this.view.lblSortName);
      this.resetSortFontIcons();
      var status="Status_id",statusVal="SID_INACTIVE";
      this.filterDeactiveUsers(status,statusVal);
      this.loadPageData();
    }else{
      this.searchUsers(value);
    }
    this.view.forceLayout();
  },

  resetViewUI : function() {
    this.view.flxSelectOptionsViewUser.setVisibility(false);
    this.view.flxContextMenu.skin = "slFbox";
    this.view.flxViewEditButton.setVisibility(false);
    this.view.forceLayout();
  },
  
  fillUserProfileDetails: function(userDetails) {
    this.resetViewUI();
    var skin,statusId,iconSkin,iconText;
    var checker = function(val) {
      if(val) return val;
      else return "N/A";
    };
    if (this.isKeyCloakEnabled) {
      if(this.isSingleEntity === false ){
      	this.view.flxViewRolesLegalEntity.setVisibility(true);
      }
      else{
        this.view.flxViewRolesLegalEntity.setVisibility(false);
      }
      this.view.flxContextMenu.setVisibility(false);
      this.view.flxViewEditButton.setVisibility(true);
    } else {
      this.view.flxContextMenu.setVisibility(true);
      this.view.flxViewEditButton.setVisibility(false);
      this.view.flxViewRolesLegalEntity.setVisibility(false);
    }
    this.view.flxViewKeyValue2.right = "0dp";
    statusId=checker(this.userDetails.internalusers_view[0].Status_id);
    if(statusId==="SID_ACTIVE"){
      statusId=kony.i18n.getLocalizedString("i18n.secureimage.Active");
      skin="sknlblLato5bc06cBold14px";
      iconSkin="sknFontIconActivate";
      iconText = "";
      // this.view.flxViewEditButton.isVisible=true;
    }
    else if(statusId==="SID_SUSPENDED"){
      statusId=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
      skin="sknlblLato5bc06cBold14px";
      iconSkin="sknFontIconPause";
      iconText = "";
      // this.view.flxViewEditButton.isVisible=true;
    }
    else if(statusId==="SID_INACTIVE"){
      statusId=kony.i18n.getLocalizedString("i18n.users.disabled");
      skin="sknlblLato5bc06cBold14px";
      iconSkin="sknfontIconInactive";
      iconText = "";
      this.view.flxViewEditButton.isVisible = false;
      this.view.flxContextMenu.isVisible = false;
      this.view.flxViewKeyValue2.right = "37dp";
    }
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmUsersController.View_Users");
    var name = checker(this.userDetails.internalusers_view[0].Name);
    this.view.lblViewValue1.text = this.AdminConsoleCommonUtils.getTruncatedString(name, 38, 35);
    this.view.lblViewValue1.toolTip = name;
    this.view.lblViewValue2.text = statusId;
    this.view.lblViewValue2.skin="sknlbl485C75LatoSemiBold13px";
    this.view.fontIconActive.text = iconText;
    this.view.fontIconActive.skin=iconSkin;
    var emailId = checker(this.userDetails.internalusers_view[0].Email);
    this.view.lblViewValue3.text = this.AdminConsoleCommonUtils.getTruncatedString(emailId, 38, 35);
    this.view.lblViewValue3.toolTip = emailId;
    var username = checker(this.userDetails.internalusers_view[0].Username);
    this.view.lblViewValue4.text = this.AdminConsoleCommonUtils.getTruncatedString(username, 38, 35);
    this.view.lblViewValue4.toolTip = username;
    this.view.lblViewUserTypeValue.text = checker(this.userDetails.internalusers_view[0].userTypeName);
    this.view.lblViewLineOfBusinessValue.text = checker(this.userDetails.internalusers_view[0].lobName);
    this.view.lblViewReportingManagerValue.text = checker(this.userDetails.internalusers_view[0].ReportingManager);
    this.view.lblViewBranchNameValue.text = checker(this.userDetails.internalusers_view[0].branchName);
    this.view.lblViewBranchAddressValue.text = checker(this.userDetails.internalusers_view[0].Work_Addr);
    this.view.rtxLabellastlogin.text = this.userDetails.internalusers_view[0].lastLogints? this.getLocaleDateAndTime(this.getDateInstanceFromDBDateTime(this.userDetails.internalusers_view[0].lastLogints)): "N.A";
    this.view.breadcrumbs.lblCurrentScreen.text=this.view.lblViewValue1.text.toUpperCase();
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
    this.view.flxUsersBreadCrumb.setVisibility(true);
    this.showViewRolesSegmentAndHeader();
    this.view.flxSpecificPermission.setVisibility(false);
    },
  getInternalUserProfileData: function() {
    var data = {"User_id":this.view.segUsers.selecteditems[0].userId,"isEdit":false};
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchUserDetails(this, data);
  },
  checkAccess: function(data1){
    let userLegalEntities = kony.mvc.MDAApplication.getSharedInstance().appContext.legalEntityId;
    let isAccess=true;
    let count=0;
    if (data1.length !== 0) {
        for(var i=0;i<data1.length;i++)
           {
             if(userLegalEntities.indexOf(data1[i].id)>=0){
             count++;
             }
           }        
         } 
    if(count===0 && this.isKeyCloakEnabled===true)
      isAccess=false;
    else
      isAccess=true;
    return isAccess;
  },
  parseUserDetails: function(userDetails) {
    var self=this;
    this.userDetails = userDetails; 
    this.userDetails.permissions =  (userDetails.userpermission_view.map(function(perm) {
      return {
        "lblDescription": perm.Permission_Desc,
        "lblPermissionName": {"text":perm.Permission_Name},//"onTouchStart":self.Openclose.bind(self)
        "lblSeperator": {"text": "-","isVisible": true},
        "Permission_id": perm.Permission_id,
        "Role_id": perm.Role_id,
        "User_id": perm.User_id,
        "Legalentity_id":perm.LegalEntityID ||"",
//         "Legalentity_id":"GB0010002,ALL",
        "Permission_isComposite": perm.Permission_isComposite,
        "lblIconAction": "",
        "template": "flxViewPermissions"
      };
    }).concat((userDetails.userdirectpermission_view ||[]).map(function(perm) {
      return {
        "lblDescription": perm.Permission_Description,
        "lblPermissionName":{"text":perm.Permission_Name},//"onTouchStart":self.Openclose.bind(self)
        "lblSeperator": "-",
        "Permission_id":perm.Permission_id,
        "Role_id": userDetails.internalusers_view[0].Role_id,
        "User_id":perm.User_id,
        "Legalentity_id":perm.LegalEntityID ||"",
        "Permission_isComposite":perm.Permission_isComposite,
        "lblIconAction":"",
        "template": "flxViewPermissions"
      };
    }))).filter(function(el) {
      return typeof(el.lblPermissionName) !== 'undefined' && Object.keys(el).length > 0;
    });
    var legalEntityData = this.getAllLEListArr();
    var entitiesArr = [];
    let roleDetails = userDetails.internalusers_view[0].roleDetails;
    var uniqueLegalEntityItems = [];
    this.legalEntitiesArray = [];
    if (roleDetails.length > 0) {
      this.userDetails.role = roleDetails.map((rec) => {
        var legalEntityDataStr = [],
          checkCount = 0;
        if (this.isKeyCloakEnabled === true) {
          let roleDetailsLegalEntityIdSplitted = [];
          roleDetailsLegalEntityIdSplitted = rec.legalEntityId
            ? rec.legalEntityId.split(",")
            : [];
          if (roleDetailsLegalEntityIdSplitted.indexOf("ALL") != -1) {
            for (let i = 0; i < roleDetailsLegalEntityIdSplitted.length; i++) {
              if (roleDetailsLegalEntityIdSplitted[i].id == "ALL") {
                this.legalEntitiesArray.push({ id: "ALL", companyName: "ALL" });
                break;
              }
            }

            let data = this.getLEDesc("ALL");
            for (let i = 0; i < data.length; i++)
              legalEntityDataStr.push(data[i].companyName);
          } else {
            for (let i = 0; i < roleDetailsLegalEntityIdSplitted.length; i++) {
              for (let j = 0; j < legalEntityData.length; j++) {
                if (
                  roleDetailsLegalEntityIdSplitted[i] == legalEntityData[j].id
                ) {
                  if (
                    uniqueLegalEntityItems.indexOf(legalEntityData[j].companyName) ==
                    -1
                  ) {
                    this.legalEntitiesArray.push({
                      id: legalEntityData[j].id,
                      companyName: legalEntityData[j].companyName,
                    });
                    uniqueLegalEntityItems.push(legalEntityData[j].companyName);
                  }
                  let data = this.getLEDesc(
                    roleDetailsLegalEntityIdSplitted[i]
                  );
                  for (let i = 0; i < data.length; i++)
                    legalEntityDataStr.push(data[i].companyName);
                }
              }
            }
          }
        }
        var legalEntities = legalEntityDataStr.join("</br></br>");
        return {
          lblDescription: rec.roledesc,
          lblRoleName: rec.rolename,
          rTextLegalEntity:{ text: legalEntities || "", isVisible: true },
          lblSeperator: { text: "-", isVisible: true },
          template: "flxViewRoles",
          id: rec.legalEntityId,
        };
      });
    } else {
      this.userDetails.role = [];
    }
    //var isAccess=this.checkAccess(this.userDetails.role);
  },
  getNewUserFormData: function(){
    this.createUserModel = {
      userData: {
        "firstName": this.view.txtbxFirstNameUser.text.trim(),
        "lastName": this.view.txtbxLastNameUser.text.trim(),
        "middleName": this.view.txtbxMiddleNameUser.text.trim(),
        "userName": this.view.txtbxUserNameUser.text,
        "email": this.view.txtbxEmailIDUser.text.trim()
      },
      businessData: {
        "userType":this.getSelectedData('userType'),
        "reportingManager":this.getSelectedData('reportingManager'),
        "branchName":this.getSelectedData('branchName'),
        "lobId":this.getSelectedLineOfBusiness(),
      },
      roleData: {},
      permissionList: []
    };
  },

  getSegmentWidgetFieldMapping : function(key) {
    let segmentWidgetMapping = {
      "userType" : this.view.DropDownUserType.sgmentData,
      "lineOfBusiness":this.view.dropDownLineOfBusiness.sgmentData,
      "reportingManager":this.view.dropDownReportingManager.sgmentData,
      "branchName":this.view.DropDownBranchName.sgmentData,
    };
    return segmentWidgetMapping[key];
  },

  getLblWidgetFieldMapping : function(key) {
    let lblWidgetMapping = {
      "userType" : this.view.lblSelectedRowsUserType,
      "lineOfBusiness":this.view.lblSelectedRowsLineOfBusiness,
      "reportingManager":this.view.lblSelectedRowsReportingManager,
      "branchName":this.view.lblSelectedRowsBranchName,
    };
    return lblWidgetMapping[key];
  },

  getDataKeyIdMapping : function(key) {
    let dataIdMapping = {
      "userType" : "userTypeId",
      "lineOfBusiness": "lineOfBusinessTypeId",
      "reportingManager":"reportingManager",
      "branchName":"branchId",
    };
    return dataIdMapping[key];
  },

  getSelectedData : function(dataKey){
    let sgmentRef = this.getSegmentWidgetFieldMapping(dataKey);
    let segData = sgmentRef.info.data;
    let lblRef = this.getLblWidgetFieldMapping(dataKey);
    let selectedData = lblRef.text;
    if (dataKey === "reportingManager") {
      return selectedData;
    }
    let selectedObj = segData.filter((rec) => {
      if (rec.lblDescription.text === selectedData) 
        return true;
    });
    let dataKeyId = this.getDataKeyIdMapping(dataKey);
    return selectedObj[0][dataKeyId];
  },

  getSelectedLineOfBusiness : function () {
    let lineOfBusinessSegData = this.view.dropDownLineOfBusiness.sgmentData.data;
    let selectedLObs = "";
    let selectedLObObjects =  lineOfBusinessSegData.filter((currObj)=> {
      if(currObj.isSelected) {
       return  currObj.lineOfBusinessTypeId;
      }
    });
    for (let itr = 0 ; itr < selectedLObObjects.length ; itr++ ) {
      if (itr != selectedLObObjects.length - 1) {
        selectedLObs = selectedLObs + selectedLObObjects[itr].lineOfBusinessTypeId + ",";
      }else {
        selectedLObs = selectedLObs + selectedLObObjects[itr].lineOfBusinessTypeId;
      }
    }
    return selectedLObs;
  },

  saveUserDetails: function(){
    this.editUserModel.ModifiedByID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.editUserModel.ModifiedByName = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.editUserModel.FirstName = this.view.txtbxFirstNameUser.text.trim();
    this.editUserModel.LastName = this.view.txtbxLastNameUser.text.trim();
    this.editUserModel.MiddleName = this.view.txtbxMiddleNameUser.text ? this.view.txtbxMiddleNameUser.text.trim(): null;
    this.editUserModel.UserName = this.view.txtbxUserNameUser.text;
    this.editUserModel.Email = this.view.txtbxEmailIDUser.text.trim();
    this.editUserModel.BranchLocation_Name = this.view.lblSelectedRowsBranchName.text;
    this.editUserModel.BranchLocation_id = this.getSelectedData('branchName');
    this.editUserModel.userType = this.getSelectedData('userType');
    this.editUserModel.lineOfBusiness = this.getSelectedLineOfBusiness();
    this.editUserModel.reportingManager = this.getSelectedData('reportingManager');
  },
  /*
   * function called on click of save button in create new user
   */
  onClickOfSaveUserData: function () {
    this.getNewUserFormData();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.onSaveBtnClick(this.createUserModel);
  },
  /*
   * function called to check userName availability
   */
  toCheckUserAvailability: function () {
    var currentUsername = this.view.txtbxUserNameUser.text;
    var allUsers = this.mainUsersJSON;
    var existingUsernames = [];
    var doesExsist = false;
    for (var i = 0; i < allUsers.length; i++) {
      existingUsernames.push(allUsers[i].Username);
    }
    if(this.isInEditForm){
      var editUsername = this.editDetails.internalusers_view[0].Username;
      existingUsernames = existingUsernames.filter(function(user){return user !== editUsername;});
    }
    for (var j = 0; j < existingUsernames.length; j++) {
      if (currentUsername.toLowerCase() === existingUsernames[j].toLowerCase()) {
        doesExsist = true;
        break;
      } else {
        doesExsist = false;
      }
    }
    if (doesExsist) {
      if(this.view.txtbxUserNameUser.skin !== "skntbxBordereb30173px"){
        this.validationFlag += 1;
        this.view.flxUserNameAvailable.setVisibility(false);
        this.view.flxUserNameNA.setVisibility(true);
        this.view.lblUserNameNA.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Not_Available");
        this.view.lblUserNameNA.skin = "sknLabelRed";
        this.view.txtbxUserNameUser.skin = "skntbxBordereb30173px";
      }
    } else {
      if(this.view.lblUserNameNA.text === kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Not_Available") && this.view.flxUserNameNA.isVisible && this.validationFlag > 0){
        this.validationFlag -= 1;
      }
      this.view.flxUserNameNA.setVisibility(false);
      this.view.flxUserNameAvailable.setVisibility(true);
      this.view.lblUserNameAvailable.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Available");
      this.view.lblUserNameAvailable.skin = "sknlblLato5bc06cBold14px";
      this.view.txtbxUserNameUser.skin = "skntxtbxDetails0bbf1235271384a";
    }
  },

  downloadCSV : function() {
    /*var authToken = KNYMobileFabric.currentClaimToken;*/
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/InternalusersObjService/operations/internalUsers_view/downloadUsersList";
    var downloadUsersFilterJSON = this.view.btnApply.info;
    var status ="";
    var role ="";
    var createdStartDate = "";
    var createdEndDate = "";
    var updatedStartDate="";
    var updatedEndDate ="";
    var paramCount = 0;
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if(searchText !== "") {
      downloadURL = downloadURL + "?searchText=" + searchText;
      paramCount = paramCount+1;
    }
    if(downloadUsersFilterJSON !== undefined && downloadUsersFilterJSON.selectedRolesList !== undefined) {
      var selectedRolesList = downloadUsersFilterJSON.selectedRolesList;
      for(var r=0; r<selectedRolesList.length-1; ++r) {
        role = role + selectedRolesList[r] + "_";
      }
      role = role + selectedRolesList[selectedRolesList.length-1];
      var typeParam = paramCount > 0 ? "&role=" : "?role=";
            downloadURL += typeParam + role;
            paramCount = paramCount + 1;
    }
    if(downloadUsersFilterJSON !== undefined && downloadUsersFilterJSON.selectedStatusList !== undefined) {
      var selectedStatusList = downloadUsersFilterJSON.selectedStatusList;
      for(var s=0; s<selectedStatusList.length-1; ++s) {
        status = status + selectedStatusList[s] + "_";
      }
      status = status + selectedStatusList[selectedStatusList.length-1];
        var typeParam = paramCount > 0 ? "&status=" : "?status=";
            downloadURL += typeParam + status;
            paramCount = paramCount + 1;
    }
    if(downloadUsersFilterJSON !== undefined && downloadUsersFilterJSON.createdStartDate !== undefined && downloadUsersFilterJSON.createdEndDate !== undefined) {
      createdStartDate= downloadUsersFilterJSON.createdStartDate;
      createdEndDate = downloadUsersFilterJSON.createdEndDate;
        downloadURL=    downloadURL +"&createdStartDate"  + createdStartDate +"&createdEndDate"+createdEndDate;
        
    } 
    if(downloadUsersFilterJSON !== undefined && downloadUsersFilterJSON.updatedStartDate !== undefined && downloadUsersFilterJSON.updatedEndDate !== undefined) {
      updatedStartDate= downloadUsersFilterJSON.updatedStartDate;
      updatedEndDate=downloadUsersFilterJSON.updatedEndDate;
       downloadURL=    downloadURL +"&updatedStartDate"  + updatedStartDate +"&updatedEndDate"+updatedEndDate;
        
    }
    var params = {"searchText":searchText,"status":status,"role":role,"createdStartDate":createdStartDate,"createdEndDate":createdEndDate,"updatedStartTime":updatedStartDate,"updatedEndDate":updatedEndDate};
     kony.adminConsole.utils.showProgressBar(this.view);
    this.callDownloadCSVService(downloadURL,"Users",this.view);
  },
  /*
   * function called onClick of Save button in Assign Role/Permissions
   */
  saveRolesPermissions: function () {
    var self = this;

    if(typeof(this.assignedRole[0]) !== 'undefined'){
      this.createUserModel.roleData ={
        "user_id": "",
        "role_id": this.assignedRole[0].Role_id
      }; 
    }
    this.createUserModel.permissionList = [];
    for(var i=0; i<this.assignedPermissions.length; i++){
      this.createUserModel.permissionList.push(this.assignedPermissions[i].Permission_id);
    }
    kony.adminConsole.utils.showProgressBar(self.view);
    self.presenter.onSaveBtnClick(this.createUserModel);
  },
  invokeEditCall: function () {
    var self = this;
    var orgPermissionIds = [];
    var Permission_ids = [];
    var orgPermissionNames = [];
    var Permission_Names = [];
    if(typeof(this.assignedRole[0]) !== 'undefined'){
      this.editUserModel.Role_id = this.assignedRole[0].Role_id;
      this.editUserModel.Role_Name = this.assignedRole[0].Role_Name;
    }else{
      this.editUserModel.Role_id = "";
      this.editUserModel.Role_Name = "";
    }
    for(var i=0; i<this.assignedPermissions.length; i++){
      Permission_Names.push(this.assignedPermissions[i].Permission_Name);
      Permission_ids.push(this.assignedPermissions[i].Permission_id);
    }
    for(i=0; i<this.IntialPermissions.length; i++){
      orgPermissionNames.push(this.IntialPermissions[i].Permission_Name);
      orgPermissionIds.push(this.IntialPermissions[i].Permission_id);
    }
    this.editUserModel.listOfAddedPermissionsNames = this.updatedIdUsersPermissions(Permission_Names,orgPermissionNames);
    this.editUserModel.listOfRemovedPermissionsNames = this.updatedIdUsersPermissions(orgPermissionNames,Permission_Names);
    this.editUserModel.listOfAddedPermissions = this.updatedIdUsersPermissions(Permission_ids,orgPermissionIds);
    this.editUserModel.listOfRemovedPermissions = this.updatedIdUsersPermissions(orgPermissionIds,Permission_ids);
    kony.adminConsole.utils.showProgressBar(self.view);
    self.presenter.editInternalUser(this.editUserModel);
  },

  invokeGetUsers: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchUsersList(this);
  },

  getCityCountryData: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchAddressData();
  },

  updatedIdUsersPermissions: function(a1,a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    });
  },
  ValidateUserDetails : function(){
    var self = this;
    this.validateFirstName();
    this.validateLastName();
    this.validateEmailField();
    this.validateUsernameField();
    this.validateLOBField();
    this.validateBranchNameField();
    this.validateUserTypeField()
    this.validateReportingManagerField();
  },
  disableValidation : function(){
    var self = this;
    self.editUserModel = {};
    self.showNoError(this.view.txtbxFirstNameUser, this.view.flxErrorFirstName);
    self.showNoError(this.view.txtbxLastNameUser, this.view.flxErrorLastName);
    self.showNoError(this.view.txtbxEmailIDUser, this.view.flxErrorEmailId);
    self.showNoError(this.view.txtbxUserNameUser, this.view.flxUserNameNA);
    this.showNoError(this.view.flxDropDownLineOfBusiness, this.view.flxErrorLineOfBusiness);
    this.showNoError(this.view.flxDropDownUserType, this.view.flxErrorUserType);
    this.showNoError(this.view.flxDropDownBranchName, this.view.flxErrorBranchName);
    this.showNoError(this.view.flxDropDownReportingManager, this.view.flxErrorReportingManager);
    this.validationFlag = 0;
  },
  showError : function(tbxWidget,flxError){
    if(!flxError.isVisible){
      this.validationFlag += 1;
      if(tbxWidget.wType === "TextField") {
        tbxWidget.skin = "skntbxBordereb30173px";
      }else if (tbxWidget.wType === "Label") {
        tbxWidget.skin = "sknlbxeb30173px";
      }else{
        tbxWidget.skin = "sknFlxBordere324161px"
      }
      flxError.isVisible=true;
    }
  },
  showNoError : function(tbxWidget,flxError){
    if(flxError.isVisible){
      if(this.validationFlag > 0)
        this.validationFlag -= 1;
      if(tbxWidget.wType === "TextField") {
        tbxWidget.skin = "skntxtbxDetails0bbf1235271384a";
      } else if (tbxWidget.wType === "Label") {
        tbxWidget.skin = "sknlstbxNormal0f9abd8e88aa64a";
      } else {
        tbxWidget.skin = "sknflxffffffoptemplateop3px";
      }
      flxError.isVisible=false;
    }
  },
  validateEmailField : function(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!(re.test(this.view.txtbxEmailIDUser.text))){
      if(!this.view.flxErrorEmailId.isVisible){
        this.validationFlag += 1;
        this.view.txtbxEmailIDUser.skin = "skntbxBordereb30173px";
        this.view.lblErrorEmailId.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_a_valid_Email-id");
        this.view.flxErrorEmailId.isVisible = true;
      }
    }
    else if(this.view.flxErrorEmailId.isVisible === true && this.view.lblErrorEmailId.text === "Email already exists"){
      this.validationFlag += 1;
    }
    else{
      if(this.view.flxErrorEmailId.isVisible){
        if(this.validationFlag > 0)this.validationFlag -= 1;
        this.view.txtbxEmailIDUser.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.flxErrorEmailId.isVisible = false;
      }
    }
  },
  validateUsernameField : function(){
    var username = this.view.txtbxUserNameUser.text;
    if(username === ""){
      if(this.view.txtbxUserNameUser.skin !== "skntbxBordereb30173px"){
        this.validationFlag += 1;
        this.view.flxUserNameAvailable.setVisibility(false);
        this.view.flxUserNameNA.setVisibility(true);
        this.view.lblUserNameNA.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_Username");
        this.view.lblUserNameNA.skin = "sknLabelRed";
        this.view.txtbxUserNameUser.skin = "skntbxBordereb30173px";
      }
    }else{
      if(this.view.lblUserNameNA.text === kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_Username") && this.view.flxUserNameNA.isVisible && this.validationFlag > 0){
        this.validationFlag -= 0;
      }
      this.toCheckUserAvailability();
    }
  },
  validateFirstName : function(){
    var reg = /^[A-Za-z]+$/;
    if(this.view.txtbxFirstNameUser.text.trim() === ""){
      if(this.view.txtbxFirstNameUser.skin !== "skntbxBordereb30173px"){
        this.validationFlag += 1;
        this.view.flxErrorFirstName.setVisibility(true);
        this.view.lblErrorFirstName.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_Firstname");
        this.view.lblErrorFirstName.skin = "sknLabelRed";
        this.view.txtbxFirstNameUser.skin = "skntbxBordereb30173px";
      }
    }else if(!(reg.test(this.view.txtbxFirstNameUser.text))) {
      if(this.view.txtbxFirstNameUser.skin !== "skntbxBordereb30173px"){
        this.validationFlag += 1;
        this.view.flxErrorFirstName.setVisibility(true);
        this.view.lblErrorFirstName.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Not_a_valid_name");
        this.view.lblErrorFirstName.skin = "sknLabelRed";
        this.view.txtbxFirstNameUser.skin = "skntbxBordereb30173px";
      }
    }else{
      if(this.view.flxErrorFirstName.isVisible){
        if(this.validationFlag > 0)this.validationFlag -= 1;
        this.view.txtbxFirstNameUser.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.flxErrorFirstName.isVisible = false;
      }
    }

  },
  validateLastName : function(){

    var reg = /^[A-Za-z]+$/;
    if(this.view.txtbxLastNameUser.text.trim() === ""){
      if(this.view.txtbxLastNameUser.skin !== "skntbxBordereb30173px"){
        this.validationFlag += 1;
        this.view.flxErrorLastName.setVisibility(true);
        this.view.lblErrorLastName.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_Lastname");
        this.view.lblErrorLastName.skin = "sknLabelRed";
        this.view.txtbxLastNameUser.skin = "skntbxBordereb30173px";
      }
    }else if(!(reg.test(this.view.txtbxLastNameUser.text))) {
      if(this.view.txtbxLastNameUser.skin !== "skntbxBordereb30173px"){
        this.validationFlag += 1;
        this.view.flxErrorLastName.setVisibility(true);
        this.view.lblErrorLastName.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Not_a_valid_name");
        this.view.lblErrorLastName.skin = "sknLabelRed";
        this.view.txtbxLastNameUser.skin = "skntbxBordereb30173px";
      }
    }else{
      if(this.view.flxErrorLastName.isVisible){
        if(this.validationFlag > 0)this.validationFlag -= 1;
        this.view.txtbxLastNameUser.skin = "skntxtbxDetails0bbf1235271384a";
        this.view.flxErrorLastName.isVisible = false;
      }
    }
  },
  populateRoleDropdownSegment:function(dataToPopulate){
    var dataMap={
      "flxSearchDropDown":"flxSearchDropDown",
      "lblDescription":"lblDescription",
      "flxCheckBox":"flxCheckBox",
      "imgCheckBox":"imgCheckBox"
    };
    var data=dataToPopulate.map(function(dataToPopulate) {
      return{
        "template":"flxSearchDropDown",
        "lblDescription":dataToPopulate,
        "flxCheckBox": {
          "isVisible": true
        },
        "imgCheckBox": {
          "isVisible": true
        }
      };
    });
    this.view.lblSelectStatus.text="Select Status";
    this.view.lblDropDown2.text="";
    this.selectedStatus=[];
    this.view.segDropDown.widgetDataMap=dataMap;
    this.view.segDropDown.data=data;
  },
  populateStatusDropdownSegment:function(statusData){
    var dataMap={
      "flxSearchDropDown":"flxSearchDropDown",
      "lblDescription":"lblDescription",
      "flxCheckBox":"flxCheckBox",
      "imgCheckBox":"imgCheckBox"
    };
    var data=statusData.map(function(statusData) {
      return{
        "template":"flxSearchDropDown",
        "lblDescription":statusData,
        "flxCheckBox": {
          "isVisible": true
        },
        "imgCheckBox": {
          "isVisible": true
        }
      };
    });
    this.view.lblSelectRole.text="Select Role";
    this.view.lblDropDown1.text="";
    this.selectedRoleNames=[];
    this.view.segStatusDropDown.widgetDataMap=dataMap;
    this.view.segStatusDropDown.data=data;
  },
  validateDates:function(endDate,startDate){
    var regExp = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/;
    if(parseInt(endDate.replace(regExp, "$3$1$2")) > parseInt(startDate.replace(regExp, "$3$1$2"))){
      return false;
    }
    else
      return true;

  },
  selectAllRecords: function(){
    var availableRecords = this.view.segAddOptions.data;
    this.view.btnRemoveAll.setVisibility(true);
    for(var i=0;i<availableRecords.length;i++){
      var permissionToAdd = this.view.segAddOptions.data[i];
      var permission = {
        "Permission_id":permissionToAdd.permId,
        "Permission_Name":permissionToAdd.lblPermissionsName,
        "Permission_Desc":permissionToAdd.rtxPermissionDescription
      };
      this.assignedPermissions.push(permission);
    }
    this.unassignedPermissions=[];
    this.view.rtxSelectedOptionsMessage.setVisibility(false);
    this.drawPermissionSelection();
    this.view.segAddOptions.removeAll();
    this.view.btnAddAll.setVisibility(false);
    this.view.rtxAvailableOptionsMessage1.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_permission_available");
    this.view.rtxAvailableOptionsMessage1.setVisibility(true);
    this.view.forceLayout();
  },
  unselectAllRecords: function(){
    this.view.rtxAvailableOptionsMessage1.setVisibility(false);
    this.view.btnAddAll.setVisibility(true);
    for(var y=0;y<this.assignedPermissions.length;y++){
      var permissionToRemove = this.assignedPermissions[y];
      var permission = {
        "Permission_id":permissionToRemove.Permission_id,
        "Permission_Name":permissionToRemove.Permission_Name,
        "Permission_Desc":permissionToRemove.Permission_Desc
      };
      this.unassignedPermissions.push(permission);
    }
    this.assignedPermissions=[];
    this.drawPermissionSelection();
  },
  onHoverEventCallback:function(widget,context){
    var self=this;
    var segRowData;
    var rowData = self.view.segSelectedOptions.data[context.rowIndex];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if(rowData.flxClose.isVisible===false){
        rowData.flxClose.isVisible = true;
        rowData.flxClose.onClick = self.unSelectedOption;
        self.view.segSelectedOptions.setDataAt(rowData, context.rowIndex, context.sectionIndex);
      }
    }
    else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      rowData.flxClose.isVisible = false;
      rowData.flxClose.onClick = {};
      self.view.segSelectedOptions.setDataAt(rowData, context.rowIndex, context.sectionIndex);
    }
    for(var i=0;i<self.view.segSelectedOptions.data.length;i++){
      segRowData=self.view.segSelectedOptions.data[i];
      if(i!==context.rowIndex && (segRowData.flxClose.isVisible === true)){
        segRowData.flxClose.isVisible = false;
        rowData.flxClose.onClick = {};
        self.view.segSelectedOptions.setDataAt(segRowData, i , i);
      }
    }
    self.view.forceLayout();

  },
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.userData;
    var segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.setUsersSegmentData(self.userData,true);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.Status_Desc) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setUsersSegmentData(0,10,dataToShow,true);
        } else {
          self.view.segUsers.setData([]);
        }
      }

      var downloadUsersFilterJSON = {};
      if(selStatus.length !== 0) {
        downloadUsersFilterJSON.selectedStatusList = selStatus;
      }
      this.view.btnApply.info = downloadUsersFilterJSON;
    }
    else {
      self.view.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.flxRtxNoResults.setVisibility(true);
      self.view.flxRtxNoResults.top="35px";
      self.view.flxPermissions.height="55%";
      var data=self.view.segUsers.data;
      data=[];
      self.view.segUsers.setData(data);

      if(this.view.btnApply.info.downloadUsersFilterJSON) {
        this.view.btnApply.info.downloadUsersFilterJSON = undefined;
      }
    }
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
        this.view.segUsers.data[this.usersRowIndex].flxOptions.skin="slFbox";
        this.view.segUsers.setDataAt(this.view.segUsers.data[this.usersRowIndex],this.usersRowIndex);
      }
      if (widgetId==="flxSelectOptionsViewUser") {
        this.view.flxContextMenu.skin="slFbox";
      }
    }
    self.view.forceLayout();
  },

  toCheckEmailAvailability: function () {
    var scopeObj = this;

    var currentEmail = this.view.txtbxEmailIDUser.text.trim();
    var allUsers = this.mainUsersJSON;
    var emailExists = false;

    for (var j = 0; j < allUsers.length; j++) {
      var username = this.view.txtbxUserNameUser.text;
      if (allUsers[j].Email === currentEmail && allUsers[j].Username!== username) {
        emailExists = true;
        break;
      }
    }

    if (emailExists) {
      scopeObj.view.flxErrorEmailId.isVisible = true;
      scopeObj.view.lblErrorEmailId.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Email_ID_Already_Exists");
      scopeObj.view.txtbxEmailIDUser.skin = "skntbxBordereb30173px";
      scopeObj.view.forceLayout();
    }
    else {
      scopeObj.view.flxErrorEmailId.isVisible = false;
      scopeObj.view.txtbxEmailIDUser.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.forceLayout();
    }
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
            scopeObj.updateUserCompositeActions();
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
    scopeObj.view.viewConfigureCSRAssist.segViewConfigureCSR.widgetDataMap = widgetMap;
    scopeObj.view.viewConfigureCSRAssist.segViewConfigureCSR.setData(segData);
    scopeObj.view.forceLayout();
  },
  getActionItem: function () {
    var self = this;
    var userPermissions = self.userDetails.permissions;
    var iconValue = {"text":"\ue948", "skin":"sknEyeIcon30px"};
    var permNames = userPermissions.map(function (perm) {
      return (perm.lblPermissionName.text).toLowerCase();
    });
    if (permNames.indexOf("updateuser") >= 0) {
      iconValue = {
        "text": "\ue952",
        "skin": "sknIcon20px",
        "tooltip": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Configure")
      }; //configure-icon
    } else if (permNames.indexOf("viewuser") >= 0) {
      iconValue = {
        "text": "\ue948",
        "skin": "sknEyeIcon30px",
        "tooltip": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.View")
      }; //view-icon
    }
    return iconValue;
  },
  navigateToConfigureViewCSRPerm: function () {
    var self = this;
    var index = self.view.segViewSegment.selectedRowIndex;
    var data, inputParam = {};
    if (index) {
      data = self.view.segViewSegment.data[index[1]];
      inputParam = {
        "User_id": data.User_id,
        "Role_id": data.Role_id,
        "Permission_id": data.Permission_id
      };
    }
    self.view.flxViewSegmentAndHeaders.setVisibility(false);
    self.view.flxViewConfigureCSRPermissions.setVisibility(true);
    self.presenter.fetchCompositeActions(inputParam);
  },
  updateUserCompositeActions : function(){
    var self = this;
    var inputReq ={
      "userId":"",
      "addedCompositeActions":[],
      "removedCompositeActions":[]
    };
    var rowData;
    var userSegIndex = self.view.segUsers.selectedRowIndex;
    var index = self.view.viewConfigureCSRAssist.segViewConfigureCSR.selectedRowIndex;
    if(index && userSegIndex){
      rowData = self.view.viewConfigureCSRAssist.segViewConfigureCSR.data[index[1]];
      var userData = self.view.segUsers.data[userSegIndex[1]];
      inputReq.userId = userData.userId;
      if(rowData.switchToggle.selectedIndex === 1){
        inputReq.removedCompositeActions.push(rowData.id);
      }else{
        inputReq.addedCompositeActions.push(rowData.id);
      }
      self.presenter.updateUserCompositeActions(inputReq);
    }
  },
  addRole: function(){
    var index = kony.application.getCurrentForm().segAddOptions.selectedIndex;
    var rowIndex = index[0];
    var data = kony.application.getCurrentForm().segAddOptions.data;
    var lblOptionText=data[rowIndex].lblRoleName;
    var toAdd={
      "imgClose": "close_blue.png",
      "lblOption": ""+lblOptionText
    };
    var data2 = kony.application.getCurrentForm().segSelectedOptions.data;
    data2.push(toAdd);
    kony.application.getCurrentForm().segSelectedOptions.setData(data2);
    kony.application.getCurrentForm().forceLayout();
    this.addToUser();
  },
  /*
  * allows only alphabet,numbers,fewspecial chars for username
  */
  restricSpecialCharForUsername : function (widgetID) {
    var text = document.getElementById(widgetID);
    text.onkeypress = text.onpaste = restrictSpecialChar;
    function restrictSpecialChar(e) {
      var regExCheck = /[^\d|a-z|A-Z|@_.]/i;
      e = e || event;
      var char = e.type === 'keypress' ? String.fromCharCode(e.keyCode || e.which)
      : (e.clipboardData || window.clipboardData).getData('Text');

      if (regExCheck.test(char)) {
        return false;
      }
    }
  },
  pagination:function(segList){
   var count=0,scrollHeight=0;
    var segData = segList ? segList :this.mainUsersJSON;
      var screenHeight = kony.os.deviceInfo().screenHeight;
    scrollHeight = screenHeight - 106 ;
    var extraHeight;
  // this.view.segUsers.height=scrollHeight-80+"px";
   if(this.view.flxAdvancedSearch.isVisible){
     extraHeight=100;
   }
    else{
      extraHeight=0;
    }
    for(var i=0;i<segData.length;i++){
      count+=1;
    }
    if(count>10){
       this.view.segUsers.height=scrollHeight-80-110-extraHeight+"px";
      this.view.flxPagination.isVisible=true;
    }
    else{
       this.view.segUsers.height=scrollHeight-140-extraHeight+"px";
      this.view.flxPagination.isVisible=false;
    }
    
  },
  onSegmentProductPaginationChange : function(currentValue){
    var self =this;
    var cardsToAppend;
    var isFilter =  this.view.segUsers.info.isFilter;
    var searchText = this.view.subHeader.tbxSearchBox.text;
    var isSearch = searchText.length> 0 ? true: false;
    //cardsToAppend = isSearch === false ? this.mainUsersJSON: this.listUsersJSON 
    if (isSearch===true  ){
      cardsToAppend= this.listUsersJSON;
     if (this.view.btnApply.info) {
       cardsToAppend =this.filterdList;
     }
    }
    else{
         cardsToAppend = this.mainUsersJSON;
    }

    if(isFilter){
      cardsToAppend =this.finalresult;

    }
    kony.adminConsole.utils.showProgressBar(this.view);
    var offsetVal = currentValue *10;
    self.setUsersSegmentData(offsetVal-10, offsetVal,cardsToAppend, isFilter);
    self.pageCount.PAGE_OFFSET = offsetVal;
    this.view.reportPagination.lblNumber.text = currentValue;
    var endVal = cardsToAppend.length < self.pageCount.PAGE_OFFSET  ? cardsToAppend.length : self.pageCount.PAGE_OFFSET;
    this.view.reportPagination.lblShowing.text = "Showing" + " " + (offsetVal-9) + " - " + endVal + " " + "Of " + cardsToAppend.length;
  },    
  
  
//    set pagination values to initial page
  resetPaginationValues : function(dataLen){
    this.pageCount = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : 0
    };
    this.view.reportPagination.lblNumber.text = "1";
    this.view.reportPagination.lblShowing.text = "Showing 1 - 10 Of " + dataLen;
    this.view.reportPagination.tbxPageNumber.text = "2";
  },

  sefgtem1:{},
  setSData :function(rowIndex)
  {
    var widMap = {
      "lblspcViewPermissionName":"lblspcViewPermissionName",
      "lblspcViewPermissionDescription":"lblspcViewPermissionDescription",
      "lblspcpermission":"lblspcpermission",
      "flxViewPermissions":"flxViewPermissions",
      "lblPermissionName":"lblPermissionName",
      "tbxSearchBox":"tbxSearchBox",
	      "lblDescription":"lblDescription",

    };
   
   var req=this.view.segViewSegment.data[rowIndex]; 
   var records=req.permissions;
   if(records.length>0){
    var mappedData=records.map(function(rec){
      //var pcode=rec.Legalentity_id.split(",");
      return {
        "lblPermissionName":{"text":rec.lblPermissionName.text},
        "lblDescription":{"text":rec.lblDescription},
        "flxViewPermissions":{"hoverSkin":"sknflxffffffop100"},
        "template":"flxViewPermissions",
    };
    });
   
    this.view.segSpfcPermission.widgetDataMap = widMap;
    this.view.segSpfcPermission.setData(mappedData);
    this.view.segSpfcPermission.info ={"segData":mappedData}; 
    this.view.flxNoResultFound.isVisible=false;
    this.view.flxSegspfcpermission.isVisible=true;
    this.view.forceLayout();  
   }
  },

  getPermissions :function(){
     var self=this;
   var legalEntitiesId={};
   var data=this.userDetails.permissions;
   let legalEntitiesIdLen;
    for (var i = 0; i < data.length; i++) {            
            legalEntitiesIdLen = data[i].Legalentity_id.split(",");            
            for (var j = 0; j < legalEntitiesIdLen.length; j++) {                
                if (legalEntitiesId[legalEntitiesIdLen[j]]) {                    
                    let legalEntitiesIdData = legalEntitiesId[legalEntitiesIdLen[j]];                     
                    legalEntitiesIdData.push(data[i]);                    
                    //let len = legalEntitiesId[legalEntitiesIdLen[j]].length;                    
                    legalEntitiesId[legalEntitiesIdLen[j]] = legalEntitiesIdData;                     //legalEntitiesId[legalEntitiesIdLen[j]].push(data[i]);
                                    
                } else {                     //legalEntitiesId[legalEntitiesIdLen[j]]= [].push(data[i]);     
                                        
                    let legalEntitiesIdData = legalEntitiesId[legalEntitiesIdLen[j]] || [];                    
                    legalEntitiesIdData.push(data[i]);
                   // legalEntitiesId[legalEntitiesIdLen[j]] = [];                    
                    legalEntitiesId[legalEntitiesIdLen[j]] = legalEntitiesIdData;                
                }            
            }        
        }
        return legalEntitiesId;
  },

  Openclose: function(context){
    var self = this;
    if (context.rowContext){
    let ri= context.rowContext.rowIndex;
    if(this.view.flxSpecificPermission.isVisible=== false){
      this.view.flxSpecificPermission.isVisible=true;
      this.setSData(ri);
    }
    this.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(true);
    var req=this.view.segViewSegment.data;
    this.view.breadcrumbs.btnPreviousPage1.text=this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.breadcrumbs.lblCurrentScreen.text=req[ri].lblPermissionName.text.toUpperCase();
    this.view.lblspcpermission.text=req[ri].lblPermissionName.text.charAt(0).toUpperCase()+req[ri].lblPermissionName.text.slice(1);
    this.view.breadcrumbs.lblCurrentScreen.text="PERMISSIONS";  
    this.view.breadcrumbs.btnPreviousPage1.onClick = function() {
      self.view.flxSpecificPermission.isVisible=false;
      self.view.breadcrumbs.lblCurrentScreen.text=self.view.breadcrumbs.btnPreviousPage1.text;
      self.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
      self.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
    };
    this.view.flxSpecificPermission.height=kony.os.deviceInfo().screenHeight-120+"px";
    this.view.searchBox.tbxSearchBox.text="";
    this.view.searchBox.flxSearchCancel.isVisible=false;
    this.view.forceLayout();
    this.view.flxSegspfcpermission.height =this.view.flxSpecificPermission.frame.height-115+"px";
  }
  },

  searchFilter: function() {
    var searchText =  this.view.RoleFilterMenu.tbxSearchBox.text;
    var segData =  this.view.RoleFilterMenu.segStatusFilterDropdown.info.segData;
    var filterData = [];
    for(var i=0;i<segData.length;i++){
      if(segData[i].lblDescription.toLowerCase().indexOf(searchText.toLowerCase()) >=0){
        filterData.push(segData[i]);
      }
    }

    if(searchText===null || searchText===""){
      this.view.flxRoleNoResultsFound.isVisible=false;
      this.view.RoleFilterMenu.segStatusFilterDropdown.setData(segData);
    }
    else if(filterData.length===0){
      this.view.flxRoleNoResultsFound.isVisible=true;
    }
    else{
      this.view.flxRoleNoResultsFound.isVisible=false;
      this.view.RoleFilterMenu.segStatusFilterDropdown.setData(segData);
    }
    this.view.RoleFilterMenu.segStatusFilterDropdown.setData(filterData);
    this.view.forceLayout();

  },
   searchPermissionsFilter : function() {
    var searchText = this.view.searchBox.tbxSearchBox.text;
     if (searchText.length>=3 || searchText.length===0 ){
    var segData = this.view.segSpfcPermission.info.segData;
    var filterData = [];
    for(var i=0;i<segData.length;i++){
      if(segData[i].lblPermissionName.text.toLowerCase().indexOf(searchText.toLowerCase()) >=0){
        filterData.push(segData[i]);
      }
    }
    this.view.segSpfcPermission.setData(filterData);
    
    if (filterData.length<=0){
       this.view.flxNoResultFound.isVisible=true;
    }
    else{
      this.view.flxNoResultFound.isVisible=false;
    }
    this.view.forceLayout();
     }   
  },
  filterBasedOnTypeStatus : function(data){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var groupsList = data || this.mainUsersJSON;
    var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;

    var segData =  this.view.RoleFilterMenu.segStatusFilterDropdown.info.segData; 
    var Rarray=[];
    for(var i=0;i<segData.length;i++){
      if(segData[i].imgCheckBox.src===this.checkboxselected){
        Rarray.push(segData[i].id);
      }
    }
    // var businessTypeIndices= self.view.RoleFilterMenu.segStatusFilterDropdown.Rarray;
    selFilter[0][1] = [];
    //selFilter[0][0] = [];
    selFilter[0][2] = [];
    var selStatusInd = null;
    var selTypeInd = null;
    var selBusinessTypeInd = null;
    var businessTypes = "";
    // selBusinessTypeInd = businessTypeIndices ? businessTypeIndices[0][1] : [];
    for (i = 0; i < Rarray.length; i++) {
      selFilter[0][2].push(Rarray[i]);
      businessTypes += Rarray[i] + ",";
    }
    //get selected status
    var statuses = "";
    selStatusInd = statusIndices ? statusIndices[0][1] : [];
    for (var j = 0; j < selStatusInd.length; j++) {
      selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].lblDescription);
      statuses += self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].lblDescription + ",";
    }

    if(self.view.mainHeader.btnDropdownList.info === undefined) {
      self.view.mainHeader.btnDropdownList.info = {};
    }
    // self.view.mainHeader.btnDropdownList.info.selectedTypeList = types.substring(0, types.length-1);
    // self.view.mainHeader.btnDropdownList.info.selectedBusinessTypeList = businessTypes.substring(0, businessTypes.length-1);
    // self.view.mainHeader.btnDropdownList.info.selectedStatusList = statuses.substring(0, statuses.length-1);

    if (selFilter[0][1].length === 0 || selFilter[0][2].length === 0) { //none selected - show no results
      dataToShow = [];
    }else if(selFilter[0][1].length==self.view.statusFilterMenu.segStatusFilterDropdown.data.length&& selFilter[0][2].length==self.view.RoleFilterMenu.segStatusFilterDropdown.data.length)
      dataToShow=groupsList;
    else if (selFilter[0][1].length > 0 && selFilter[0][2].length>0) {//both filters selected
      dataToShow = self.filterGroupsData(groupsList,selFilter);
    } else { //single filter selected
    }
    if(dataToShow.length===0){
      this.view.flxNoResultsFound.setVisibility(true);
    }
    else{
      this.view.flxNoResultsFound.setVisibility(false);
    }
    return dataToShow;
  },
  filterGroupsData(rolesList,selFilter){
    var self=this;
    var filteredArr=[];
    var checkedArr=selFilter[0][2];
    // var dataToReturn= groupsList.filter(function (rec) {
    
    for (var i = 0; i < rolesList.length; i++) {
        for (var j = 0; j < rolesList[i].roleDetails.length; j++) {
          if (checkedArr.indexOf(rolesList[i].roleDetails[j].roleId) >= 0) {
            filteredArr.push(rolesList[i]);
            break;
          }
        }
    }
    return filteredArr;
  },
  checkboxfun:function(eventObj,context){

    this.view.flxNoResultsFound.setVisibility(false);
    var segdata = this.view.RoleFilterMenu.segStatusFilterDropdown.data;
    var rowInd = eventObj.selectedRowIndex ? eventObj.selectedRowIndex[1]:0;

    if(segdata[rowInd].imgCheckBox.src===this.checkboxselected){
      segdata[rowInd].imgCheckBox.src=this.checkboxnormal;
    }
    else{
      segdata[rowInd].imgCheckBox.src=this.checkboxselected;
    }
    this.view.RoleFilterMenu.segStatusFilterDropdown.setDataAt(segdata[rowInd], rowInd);

  }


});

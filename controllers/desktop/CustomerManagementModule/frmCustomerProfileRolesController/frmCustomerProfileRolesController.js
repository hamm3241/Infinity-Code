define({
  allMonActionsList:null,
  removeCount : 0,
  selectedFeatureIndex : 0,
  prevSelectedFeature:[],
  currentCustomerType:"",
  additionalFeaturesAndActions : [],
  allRetailFeatures:[],
  actualAssignedActions : [],
  willUpdateUI: function (context) {
    if (context) {
      this.updateLeftMenu(context);

      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus) {
          kony.adminConsole.utils.showProgressBar(this.view);
        } else {
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      } else if (context.toastModel) {
        if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
        }
      } else if (context.CustomerBasicInfo) {
        this.view.flxGeneralInfoWrapper.setBasicInformation(context.CustomerBasicInfo, this);
        this.view.tabs.setCustomerProfileTabs(this);
        this.showToggleButtons(context.CustomerBasicInfo.customer);
        this.currentCustomerType = context.CustomerBasicInfo.customer.CustomerType_id;
      } else if (context.CustomerGroups) {
        this.setRolesVerticalTabsData();
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName4);
        //this.unloadOnScrollEvent();
         var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
              (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
          : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
        if (context.CustomerGroups.target === "InfoScreen") {
          this.showRolesScreen(context.CustomerGroups);
          this.view.toggleButtons.btnToggleLeft.info = {"groupsData":context.CustomerGroups};
          
        } else {
          this.CustomerRoles=context.CustomerGroups;
          this.setDataForRolesEditScreen(context.CustomerGroups);
          this.showRolesEditScreen(customerType);
        }

      } else if(context.additionalFeaturesAndActions){
        this.additionalFeaturesAndActions = context.additionalFeaturesAndActions;
        this.showAdditionalFeaturesList();
        
      } else if (context.allFeatures){
        this.filterRetailFeatures(context.allFeatures);
        
      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.enrollACustomer) {
        this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

      } else if(context.userNameRulesPolicy){
        this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
        
      } else if(context.linkProfilesList){
        this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList,this);
      } else if(context.userNameIsAvailable){
        this.view.delinkProfilePopup.checkUserNameAvailability(context.userNameIsAvailable);
      } else if(context.checkAuthSignatory){ 
        //for business user,to get isauthSignatory flag in case not available in basicInfo
        var custType = context.checkAuthSignatory.customer.CustomerType_id;
        var status = context.checkAuthSignatory.customer.CustomerStatus_id;
         //hiding link/delink profile buttons
        /*if (status === "LOCKED" || status === "SUSPENDED" || status === "NEW") {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,custType,false);
        }  else {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,custType,true);
        }*/
      }
    }
  },
  CustomerProfileRolesPreshow: function () {
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName4);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 115 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.setFlowActions();
    this.currencyValue = this.defaultCurrencyCode();
  },
  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileRoles_flxMainContent").onscroll = function () { };
  },
  /*
  * call respective roles UI and data functions
  * @param: roles assigned to customer
  */
  showRolesScreen: function (rolesContext) {
    this.view.flxGroupsWrapper.setVisibility(true);
    if(this.currentCustomerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      this.setDataForRolesSegment(rolesContext, this.currentCustomerType);
      this.showRolesScreenBasedOnType(this.currentCustomerType);  
    } else if(this.currentCustomerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0 &&
             this.currentCustomerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0 ){
      this.setDataForRolesSegment(rolesContext, this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
      this.showRolesScreenBasedOnType(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
    } else{
      this.setDataForRolesSegment(rolesContext, this.currentCustomerType);
      this.showRolesScreenBasedOnType(this.currentCustomerType, this.currentCustomerType);
    }
  },
  /*
  * show roles screenUI changes based on customer type
  * @param: customer type
  */
  showRolesScreenBasedOnType: function (customerType) {
    var self =this;
    this.view.flxRolesListing.setVisibility(true);
    this.view.flxRolesEditContainer.setVisibility(false);
    this.toggleSelectedRow();
    if(customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      this.view.flxRolesLeftTabs.setVisibility(false);
      this.view.flxRolesListing.left = "0dp";
      this.view.lblAssignedRoles.setVisibility(true);
      this.view.btnAssignRoles.onClick = function(){
        self.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
      };
    } else{
      this.view.flxRolesLeftTabs.setVisibility(true);
      this.view.flxRolesListing.left = "230dp";
      this.view.lblAssignedRoles.setVisibility(false);
      this.view.btnAssignRoles.onClick = function(){
        self.fillEditRoleDetails();
      };
    }
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  showRolesEditScreen: function (customerType) {
    this.view.flxGroupsWrapper.setVisibility(true);
    this.view.flxRolesLeftTabs.setVisibility(false);
    this.view.flxRolesListing.setVisibility(false);
    this.view.flxRolesEditContainer.setVisibility(true);
    this.view.tbxSearchBox.text = "";
    this.view.flxClearSearchImage.setVisibility(false);
    this.view.flxSearchContainer.skin="sknflxd5d9ddop100";
    if(customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      this.view.btnSelectAll.setVisibility(false);
    } else{
      this.view.btnSelectAll.setVisibility(true);
    }
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  setFlowActions: function () {
    var scopeObj = this;
    this.view.btnRolesEdit.onClick = function () {
      scopeObj.fillEditRoleDetails();
    };
    this.view.btnRolesBusinessEdit.onClick = function(){
      scopeObj.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
    };
    this.view.btnAssignRoles.onClick = function(){
      if(scopeObj.currentCustomerType === scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        scopeObj.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
      } else{
        scopeObj.fillEditRoleDetails();
      }
    };
    this.view.RoleEditButtons.btnSave.onClick = function(){
      if(scopeObj.view.lblSelectedRolesCount.text !== 0)
     	scopeObj.showConfirmationPopUp();
      else{
        scopeObj.view.flxRoleError.setVisibility(true);
        scopeObj.view.flxRolesEditHeader.top="60dp";
        scopeObj.view.segCustomerRolesEdit.top="155dp";
        scopeObj.view.segCustomerRolesEdit.height="440dp";
      }
      scopeObj.view.forceLayout();
    };
    this.view.RoleEditButtons.btnCancel.onClick = function(){
      scopeObj.showCancelPopUp();
    };
    this.view.flxRoleClosePopup.onClick = function(){
      scopeObj.view.flxViewRolePopup.setVisibility(false);
    };
    this.view.btnSelectAll.onClick = function(){
      if(scopeObj.view.btnSelectAll.text===kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll")){
        scopeObj.view.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
        scopeObj.removeAllSelectedRoles();
      }else{
        scopeObj.view.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
        scopeObj.addAllRoles();
      }
    };
    this.view.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.tbxSearchBox.text === ""){
        scopeObj.view.flxClearSearchImage.setVisibility(false);
        scopeObj.view.flxSearchContainer.skin="sknflxd5d9ddop100";
      }else{
        scopeObj.view.flxClearSearchImage.setVisibility(true);
        scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      }
      scopeObj.searchRoles();
    };
    this.view.flxClearSearchImage.onClick = function(){
      scopeObj.view.tbxSearchBox.text="";
      scopeObj.view.flxClearSearchImage.setVisibility(false);
      scopeObj.view.flxSearchContainer.skin="sknflxd5d9ddop100";
      scopeObj.view.segCustomerRolesEdit.setData(scopeObj.view.segCustomerRolesEdit.info.data);
      scopeObj.view.flxSearchNoRoles.setVisibility(false);
      scopeObj.view.segCustomerRolesEdit.setVisibility(true);
      scopeObj.updateRolesCount();
      scopeObj.view.forceLayout();
    };
    this.view.backToRolesListing.btnBack.onClick = function(){
      scopeObj.showCancelPopUp();
    };
    this.view.popUpConfirmation.flxPopUpClose.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.segRolesVerticalTabs.onRowClick = function(){
      scopeObj.toggleSelectedRow();
    };
    this.view.btnEditAdditionalFeatures.onClick = function(){
      scopeObj.view.flxNoFeatureError.setVisibility(false);
      scopeObj.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
      scopeObj.view.flxAddFeaturesActions.top="0dp";
      scopeObj.view.flxAddFeaturesActions.height="470dp";
      scopeObj.setFeaturesSegData(scopeObj.additionalFeaturesAndActions,false); 
      scopeObj.hideActionsList();
    };
    this.view.btnAddFeaturesActions.onClick =  function(){
      scopeObj.view.flxNoFeatureError.setVisibility(false);
      scopeObj.view.flxAddFeaturesActions.top="0dp";
      scopeObj.view.flxAddFeaturesActions.height="470dp";
      scopeObj.prevSelectedFeature = [];
      scopeObj.hideActionsList();
      scopeObj.setFeaturesSegData(scopeObj.additionalFeaturesAndActions, false);
    };
    this.view.addFeaturesAndActions.btnSelectAll.onClick = function(){
      var isValid = scopeObj.validateActionLimitsEntered();
      if (isValid) {
        if (scopeObj.view.addFeaturesAndActions.btnSelectAll.text === kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll")) {
          scopeObj.removeAllFeatures();
          scopeObj.view.addFeaturesAndActions.btnSelectAll.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
        } else {
          scopeObj.addAllFeatures();
          scopeObj.view.addFeaturesAndActions.btnSelectAll.text = kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
        }
      }
    };
    this.view.addFeaturesAndActions.tbxSearchAvailableItems.onTouchStart = function(){
      scopeObj.view.addFeaturesAndActions.flxSearchCont.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.addFeaturesAndActions.tbxSearchAvailableItems.onEndEditing = function(){
      scopeObj.view.addFeaturesAndActions.flxSearchCont.skin = "sknflxd5d9ddop100";
    };
    this.view.addFeaturesAndActions.tbxSearchAvailableItems.onKeyUp = function(){
      if(scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex){
        var rowInd=scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxSelectedArrow.isVisible=false;
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxFeatureNameContainer.skin="sknflxffffffBorderE1E5EERadius3px";
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxFeatureNameContainer.hoverSkin="sknflxffffffBorderE1E5EERadius3pxPointer";
        scopeObj.hideActionsList();
      }
      if(scopeObj.view.addFeaturesAndActions.tbxSearchAvailableItems.text.length!==0){
        scopeObj.view.addFeaturesAndActions.flxClearSearch.setVisibility(true);
      }else{
        scopeObj.view.addFeaturesAndActions.flxClearSearch.setVisibility(false);
      }
      scopeObj.searchFeatures();
    };
    this.view.addFeaturesAndActions.flxClearSearch.onClick = function(){
      scopeObj.view.addFeaturesAndActions.tbxSearchAvailableItems.text="";
      scopeObj.view.addFeaturesAndActions.flxSearchCont.skin = "sknflxd5d9ddop100";
      scopeObj.view.addFeaturesAndActions.flxClearSearch.setVisibility(false);
      scopeObj.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(false);
      scopeObj.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
      if(scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex){
        var rowInd=scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxSelectedArrow.isVisible=false;
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxFeatureNameContainer.skin="sknflxffffffBorderE1E5EERadius3px";
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxFeatureNameContainer.hoverSkin="sknflxffffffBorderE1E5EERadius3pxPointer";
        scopeObj.hideActionsList();
      }
      scopeObj.view.addFeaturesAndActions.segAddOptions.setData(scopeObj.view.addFeaturesAndActions.segAddOptions.info);
      scopeObj.updateFeaturesCount();
    };
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performFeatureStatusFilter();
    };
    this.view.addFeaturesAndActions.btnViewActions.onClick = function(){
      scopeObj.fillFeatureDetails();
    };
    this.view.addFeaturesAndActions.fontIconFeatureTypeFilter.onTouchStart = function(){
      var isValid = scopeObj.validateActionLimitsEntered();
      if(scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.isVisible && isValid)
      	scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.setVisibility(false);
      else if(isValid && (scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.isVisible === false)){
        scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.left=scopeObj.view.addFeaturesAndActions.fontIconFeatureTypeFilter.frame.x-90+"px";
        scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.addFeaturesAndActions.segAddOptions.onRowClick = function(){
      scopeObj.featuresRowClickHandler();
    };
    this.view.addFeaturesAndActions.btnResetActions.onClick =function(){
      var isValid = scopeObj.validateActionLimitsEntered();
      if(isValid) scopeObj.showResetActionsPopup();
    };
    this.view.flxFeatureDetailsClose.onClick = function(){
      scopeObj.view.flxViewFeatureDetails.setVisibility(false);
    };
    this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.view.flxAddFeaturesActionsContainer.setVisibility(false);
      if(scopeObj.view.commonButtons.btnCancel.info.areFeaturesAvailable === true){
        scopeObj.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(true);
        scopeObj.view.flxNoFeaturesActionsCont.setVisibility(false);
      } else{
        scopeObj.view.flxNoFeaturesActionsCont.setVisibility(true);
        scopeObj.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
      }
    };
    this.view.commonButtons.btnSave.onClick = function(){
      if(scopeObj.validateFeatures() && scopeObj.validateActionLimitsEntered()){
        scopeObj.updateAddedFeatures();
      }
    };
    this.view.addFeaturesAndActions.flxFeatureTypeFilter.onHover = scopeObj.onDropdownHoverCallback;
    this.view.popUpConfirmation.flxPopUpClose.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.popUpConfirmation.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.toggleButtons.btnToggleLeft.onClick = function(){
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],1);
      scopeObj.setDataForRolesSegment(scopeObj.view.toggleButtons.btnToggleLeft.info.groupsData, scopeObj.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
      scopeObj.setRolesVerticalTabsData();
      scopeObj.view.segRolesVerticalTabs.selectedRowIndex = [0,0];
      scopeObj.showRolesScreenBasedOnType(scopeObj.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
    };
    this.view.toggleButtons.btnToggleRight.onClick = function(){
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],2);
      scopeObj.setDataForRolesSegment(scopeObj.view.toggleButtons.btnToggleLeft.info.groupsData, scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE);
      scopeObj.view.segRolesVerticalTabs.selectedRowIndex = [0,0];
      scopeObj.showRolesScreenBasedOnType(scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE);
    };
  },
  setDataForRolesEditScreen: function (CustomerGroups) {
    var self = this;
    var allRoles=CustomerGroups.AllGroups;
    var assignedRoles= CustomerGroups.AssignedGroups;
    var isSelected=false;
    var SelectedRolesCount=0;
    var dataMap = {
      "flxCustomerProfileRoles": "flxCustomerProfileRoles",
      "flxRoleNameContainer": "flxRoleNameContainer",
      "flxRoleCheckbox": "flxRoleCheckbox",
      "imgRoleCheckbox": "imgRoleCheckbox",
      "flxRoleInfo": "flxRoleInfo",
      "lblRoleName": "lblRoleName",
      "lblRoleDesc": "lblRoleDesc",
      "btnViewDetails": "btnViewDetails",
    };
    var data = [];
    var toAdd;
    for (var i = 0; i < allRoles.length; i++) {
      for(var j=0;j<assignedRoles.length;j++){
        if(allRoles[i].id===assignedRoles[j].Group_id &&
           assignedRoles[j].Group_Type_id === this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
          isSelected=true;
          ++SelectedRolesCount;
          break;
        }
      }
      if(allRoles[i].type === this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
        toAdd = {
          "flxCustomerProfileRoles": "flxCustomerProfileRoles",
          "flxRoleNameContainer": "flxRoleNameContainer",
          "flxRoleCheckbox": {"isVisible":true,"onClick":self.toggleCheckboxEditRoles},
          "imgRoleCheckbox": {"src":isSelected?"checkboxselected.png":"checkboxnormal.png"},
          "flxRoleInfo": "flxRoleInfo",
          "lblRoleName": allRoles[i].name,
          "lblRoleDesc": allRoles[i].description,
          "features":allRoles[i].features,
          "btnViewDetails": {"text":"View Details","isVisible":true,"onClick":function(){self.viewRoleDetails(2);}},
          "template": "flxCustomerProfileRoles",
          "id": allRoles[i].id,
        };
        isSelected=false;
        data.push(toAdd);
      }

    }
    this.view.lblSelectedRoles.text="Selected Roles";
    this.view.lblSelectedRolesCount.text = SelectedRolesCount;
    this.view.lblSelectedRolesTotalCount.text="of "+data.length;
    this.view.segCustomerRolesEdit.widgetDataMap = dataMap;
    this.view.segCustomerRolesEdit.setData(data);
    this.view.segCustomerRolesEdit.info = {
      "data":this.view.segCustomerRolesEdit.data,
      "addedRoles":[],
      "removedRoles":[]
    };
    this.updateRolesCount();
    this.view.flxRolesEditContainer.setVisibility(true);
    if(data.length > 0 ){
      this.view.flxSearchNoRoles.setVisibility(false);
      this.view.segCustomerRolesEdit.setVisibility(true);
    } else{
      this.view.flxSearchNoRoles.setVisibility(true);
      this.view.segCustomerRolesEdit.setVisibility(false);
    }
    this.view.forceLayout();
  },
  setDataForRolesEditScreenBBUser : function(CustomerGroups){
    var self = this;
    var allRoles=CustomerGroups.AllGroups;
    var assignedRoles= this.view.btnRolesEdit.info.assignedRoles ;
    var dataMap = {
      "flxCustomerProfileRoles": "flxCustomerProfileRoles",
      "flxRoleNameContainer": "flxRoleNameContainer",
      "flxRoleCheckbox": "flxRoleCheckbox",
      "flxRoleRadio": "flxRoleRadio",
      "imgRoleRadio":"imgRoleRadio",
      "flxRoleInfo": "flxRoleInfo",
      "lblRoleName": "lblRoleName",
      "lblRoleDesc": "lblRoleDesc",
      "btnViewDetails": "btnViewDetails",
    };
    var data = [];
    var isSelected = false;
    data = allRoles.map(function(role){
      if(assignedRoles[0].id === role.id)
        isSelected=true;
      else
        isSelected = false;

      return {
        "flxCustomerProfileRoles": "flxCustomerProfileRoles",
        "flxRoleNameContainer": "flxRoleNameContainer",
        "flxRoleCheckbox": {"isVisible":false},
        "flxRoleRadio":{"isVisible":true, "onClick":self.toggleRadioButton},
        "imgRoleRadio": {"src": isSelected ? "radio_selected.png":"radio_notselected.png"},
        "flxRoleInfo": "flxRoleInfo",
        "lblRoleName": role.name,
        "lblRoleDesc": role.description,
        "features":role.features,
        "btnViewDetails": {"text":"View Details","isVisible":true,"onClick":function(){self.viewRoleDetails(2);}},
        "template": "flxCustomerProfileRoles",
        "id": role.id,
      };
    });
    this.view.lblSelectedRoles.text="Selected Roles";
    this.view.lblSelectedRolesCount.text = 1;
    this.view.lblSelectedRolesTotalCount.text="of "+data.length;
    this.view.segCustomerRolesEdit.widgetDataMap = dataMap;
    this.view.segCustomerRolesEdit.setData(data);
    this.view.segCustomerRolesEdit.info = {
        "data":data,
      };
    this.view.flxRolesEditContainer.setVisibility(true);
    if(data.length > 0 ){
      this.view.flxSearchNoRoles.setVisibility(false);
      this.view.segCustomerRolesEdit.setVisibility(true);
    } else{
      this.view.flxSearchNoRoles.setVisibility(true);
      this.view.segCustomerRolesEdit.setVisibility(false);
    }
    this.view.forceLayout();
  },
  getAllAddedGroups: function () {
    var assignedRoles = this.CustomerRoles.AssignedGroups;

    var originalGroupIds = assignedRoles.map(function (g) {
      return g.Group_id;
    });
    var Group_ids = this.view.segCustomerRolesEdit.data.map(function (g) {
      return g.id;
    });
    return this.updatedCollection(Group_ids, originalGroupIds);
  },
  getAllRemovedGroups: function () {
    var assignedRoles = this.CustomerRoles.AssignedGroups;

    var originalGroupIds = assignedRoles.map(function (g) {
      return g.Group_id;
    });
    var Group_ids = this.view.segCustomerRolesEdit.data.map(function (g) {
      return g.id;
    });
    return this.updatedCollection(originalGroupIds, Group_ids);
  },
  updatedCollection: function (a1, a2) {
    return a1.filter(function (x) {
      var result = false;
      if (a2.indexOf(x) < 0) result = true;
      return result;
    });
  },
  setDataForRolesSegment : function(CustomerGroups,custType){
    var self =this;
    var assignedRoles = CustomerGroups.AssignedGroups;
    var allRoles = CustomerGroups.AllGroups;
    var dataMap = {
      "flxCustomerProfileRoles": "flxCustomerProfileRoles",
      "flxRoleNameContainer": "flxRoleNameContainer",
      "flxRoleCheckbox": "flxRoleCheckbox",
      "imgRoleCheckbox": "imgRoleCheckbox",
      "flxRoleInfo": "flxRoleInfo",
      "lblRoleName": "lblRoleName",
      "lblRoleDesc": "lblRoleDesc",
      "btnViewDetails": "btnViewDetails",
      "groupType":"groupType",
      "features":"features"
    };
    var data = [];
    var toAdd;
    if (assignedRoles.length > 0) {
      //hide edit button if customer is not accessible
      if (this.presenter.getCurrentCustomerDetails().isCustomerAccessiable === false) {
        this.view.btnRolesEdit.setVisibility(false);
        this.view.btnRolesBusinessEdit.setVisibility(false);
      } else {
        if (custType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
          this.view.btnRolesBusinessEdit.setVisibility(true);
          this.view.btnRolesEdit.setVisibility(false);
        } else{
          this.view.btnRolesEdit.setVisibility(true);
          this.view.btnRolesBusinessEdit.setVisibility(false);
        }
      }
      for (var i = 0; i < assignedRoles.length; i++) {
        if(assignedRoles[i].Group_Type_id === custType){
          var roleFeatures =[];
          //to get features of assigned group 
          for(var j=0; j<allRoles.length; j++){
            if(allRoles[j].id === assignedRoles[i].Group_id){
              roleFeatures = allRoles[j].features;
              break;
            }
          }
          toAdd = {
            "flxCustomerProfileRoles": "flxCustomerProfileRoles",
            "flxRoleNameContainer": "flxRoleNameContainer",
            "flxRoleCheckbox": {"isVisible":false},
            "imgRoleCheckbox": "imgRoleCheckbox",
            "flxRoleInfo": "flxRoleInfo",
            "lblRoleName": assignedRoles[i].Group_name,
            "lblRoleDesc": assignedRoles[i].Group_Desc,
            "features": roleFeatures,
            "btnViewDetails": (custType === this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)?
                              {"isVisible": true,"text":"View Details","onClick": function(){self.viewRoleDetails(1);}}:{"isVisible":false ,"text":"","onClick":{}},
            "template": "flxCustomerProfileRoles",
            "id": assignedRoles[i].Group_id,
            "groupType" : assignedRoles[i].Group_Type_id
          };
          data.push(toAdd);
        }
      }
      this.view.lblAssignedRoles.text="Assigned Role";
      this.view.segCustomerRoles.widgetDataMap = dataMap;
      this.view.segCustomerRoles.setData(data);
      this.view.btnRolesEdit.info = {"assignedRoles":data};
      this.view.segCustomerRoles.info = {
        "data": data,
        "searchAndSortData": data
      };
      this.view.flxRolesListing.setVisibility(true);
      this.view.segCustomerRoles.setVisibility(data.length > 0);
      this.view.flxNoAssignedRolesAvailable.setVisibility(data.length <= 0);
      if(custType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        this.view.btnRolesBusinessEdit.setVisibility(data.length > 0);
      } else{
        this.view.btnRolesEdit.setVisibility(data.length > 0);
      }
    } else {
      this.view.segCustomerRoles.setData([]);
      this.view.flxNoAssignedRolesAvailable.setVisibility(true);
      if(custType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        this.view.btnRolesBusinessEdit.setVisibility(false);
      } else{
        this.view.btnRolesEdit.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  toggleCheckboxEditRoles : function(){
    var rowIndex=this.view.segCustomerRolesEdit.selectedRowIndex[1];
    var segData=this.view.segCustomerRolesEdit.data;
    var addedRoles=this.view.segCustomerRolesEdit.info.addedRoles;
    var removedRoles= this.view.segCustomerRolesEdit.info.removedRoles;
    if(segData[rowIndex].imgRoleCheckbox.src==="checkboxnormal.png"){
      segData[rowIndex].imgRoleCheckbox.src="checkboxselected.png";
      if(!removedRoles.includes(segData[rowIndex].id))
      	addedRoles.push(segData[rowIndex].id);
      else
        removedRoles.remove(segData[rowIndex].id);
      if(this.view.flxRoleError.isVisible===true){
        this.view.flxRoleError.setVisibility(false);
        this.view.flxRolesEditHeader.top="0dp";
        this.view.segCustomerRolesEdit.top="95dp";
        this.view.segCustomerRolesEdit.height="500dp";
      }
    } else{
      segData[rowIndex].imgRoleCheckbox.src="checkboxnormal.png";
      if(this.view.btnSelectAll.text===kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll"))
      	this.view.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
      if(addedRoles.includes(segData[rowIndex].id))
      	addedRoles.remove(segData[rowIndex].id);
      else
        removedRoles.push(segData[rowIndex].id);
    }
    this.view.segCustomerRolesEdit.info.addedRoles=addedRoles;
    this.view.segCustomerRolesEdit.info.removedRoles=removedRoles;
    this.view.segCustomerRolesEdit.setDataAt(segData[rowIndex],rowIndex);
    this.updateRolesCount();
    this.view.forceLayout();
  },
  toggleRadioButton : function(){
    var rowIndex = this.view.segCustomerRolesEdit.selectedRowIndex[1];
    var segData = this.view.segCustomerRolesEdit.data;
    for(var i=0;i<segData.length;i++){
      if(i === rowIndex){
        if(segData[i].imgRoleRadio.src === "radio_notselected.png"){
          segData[i].imgRoleRadio.src = "radio_selected.png";
        }else{
          segData[i].imgRoleRadio.src = "radio_notselected.png";
        }
        this.view.segCustomerRolesEdit.setDataAt(segData[i], i);
      }else{
        if(segData[i].imgRoleRadio.src === "radio_selected.png"){
          segData[i].imgRoleRadio.src = "radio_notselected.png";
          this.view.segCustomerRolesEdit.setDataAt(segData[i], i);
        }
      }
    }
  },
  /*
  * show popup for selected role's features and actions
  * @param: screen- 1(view)/2(edit)
  */
  viewRoleDetails : function(screen){
    var selRowIndex = "";
    var segData = [];
    if(screen === 1){ //view screen
      selRowIndex=this.view.segCustomerRoles.selectedRowIndex[1];
      segData=this.view.segCustomerRoles.data;
    }else{ //edit screen
      selRowIndex=this.view.segCustomerRolesEdit.selectedRowIndex[1];
      segData=this.view.segCustomerRolesEdit.data;
    }
    
    this.view.lbViewRoleName.text=segData[selRowIndex].lblRoleName;
    this.view.lblViewRoleDescriptionValue.text=segData[selRowIndex].lblRoleDesc;
    this.showViewFeaturesList(segData[selRowIndex].features);
    this.view.flxViewRolePopup.setVisibility(true);
  },
  showViewFeaturesList : function(features){
    var self=this;
    self.view.flxFeaturesList.removeAll();
    if(features.length>0){
      for (var i = 0; i < features.length; i++) {
        var ViewRoleFeaturesActionsToAdd = new com.adminConsole.customerRoles.ViewRoleFeaturesActions({
          "id": "dynamicsegment" + i,
          "isVisible": true,
          "masterType": constants.MASTER_TYPE_DEFAULT
        }, {}, {});
        ViewRoleFeaturesActionsToAdd.lblFeatureName.text=features[i].name;
        ViewRoleFeaturesActionsToAdd.statusIcon.skin = features[i].status===self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?"sknFontIconActivate":"sknfontIconInactive";
        ViewRoleFeaturesActionsToAdd.statusValue.text=features[i].status===self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
        ViewRoleFeaturesActionsToAdd.SegActions.setData(features[i].actions.map(self.mapFeatureActionsData.bind(self)));
        self.view.flxFeaturesList.add(ViewRoleFeaturesActionsToAdd);
      }
    self.view.forceLayout();
    }
  },
  mapFeatureActionsData : function(dataToMap){
    return{
      "flxRoleDetailsActions":"flxRoleDetailsActions",
      "lblActionName":dataToMap.name,
      "lblActionDescription":dataToMap.description      
    };
  },
  searchRoles : function(){
    var searchText=this.view.tbxSearchBox.text;
    var rolesData=this.view.segCustomerRolesEdit.info.data.concat([]);
    var i = 0;
    while (i < rolesData.length) {
      if (rolesData[i].lblRoleName.toLowerCase().indexOf(searchText) === -1) {
        rolesData.remove(rolesData[i]);
      } else {
        i++;
      }
    }
    this.view.segCustomerRolesEdit.setData(rolesData);
    this.view.lblNoRolesAvailableForSearch.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found_with_parameters") +
      												this.view.tbxSearchBox.text+"'"+ kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
    if(rolesData.length > 0){
      this.view.flxSearchNoRoles.setVisibility(false);
      this.view.segCustomerRolesEdit.setVisibility(true);
    } else{
      this.view.flxSearchNoRoles.setVisibility(true);
      this.view.segCustomerRolesEdit.setVisibility(false);
    }
    this.updateRolesCount();
    this.view.forceLayout();
    },
  showCancelPopUp : function(){
    var self=this;
    this.view.popUpConfirmation.lblPopUpMainMessage.text="Discard Changes";
    this.view.popUpConfirmation.rtxPopUpDisclaimer.text="Are you sure you want to discard the changes made to the roles selection?\n\nAfter canceling, the changes made to the roles selection will not be saved.";
    this.view.flxPopUpConfirmation.setVisibility(true);
    this.view.popUpConfirmation.btnPopUpDelete.text="YES, PROCEED";
    this.view.popUpConfirmation.btnPopUpCancel.text="NO, LEAVE AS IS";
    this.view.popUpConfirmation.btnPopUpDelete.onClick = function(){
      self.view.flxPopUpConfirmation.setVisibility(false);
      self.showRolesScreenBasedOnType(self.currentCustomerType);
    };
    this.view.popUpConfirmation.btnPopUpCancel.onClick = function(){
      self.view.flxPopUpConfirmation.setVisibility(false);
    };
  },
  showConfirmationPopUp : function(){
     var self=this;
    this.view.popUpConfirmation.lblPopUpMainMessage.text="Save Changes";
    this.view.popUpConfirmation.rtxPopUpDisclaimer.text="Are you sure you want to save the changes made to the roles selection?\n\nAfter saving changes, the role selection changes will update.";
    this.view.flxPopUpConfirmation.setVisibility(true);
    this.view.popUpConfirmation.btnPopUpDelete.text="YES";
    this.view.popUpConfirmation.btnPopUpCancel.text="NO";
    this.view.popUpConfirmation.btnPopUpDelete.onClick = function(){
      self.view.flxPopUpConfirmation.setVisibility(false);
      var customerType = self.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
          (self.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? self.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : self.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
      : self.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
      if(customerType === self.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        self.saveRolesForBBUser();
      } else{
		self.saveRoles();
      }
      
    };
    this.view.popUpConfirmation.btnPopUpCancel.onClick = function(){
      self.view.flxPopUpConfirmation.setVisibility(false);
    };
  },
  saveRoles : function(){
    var self=this;
    var id = self.presenter.getCurrentCustomerDetails().Customer_id;
      self.presenter.editCustomerGroups({
        "ModifiedByID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
    	"ModifiedByName": kony.mvc.MDAApplication.getSharedInstance().appContext.userName,
        "Customer_id": id,
        "listOfAddedGroups": self.view.segCustomerRolesEdit.info.addedRoles,
        "listOfRemovedGroups": self.view.segCustomerRolesEdit.info.removedRoles
      });
    this.showRolesScreenBasedOnType(self.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
  },
  saveRolesForBBUser: function(){
    var segData = this.view.segCustomerRolesEdit.data;
    var assignedRole = this.view.btnRolesEdit.info.assignedRoles.length > 0 ? this.view.btnRolesEdit.info.assignedRoles[0] : [];
    var selectedRole = "";
    var added = [],removed =[];
    for(var i=0;i< segData.length;i++){
      if(segData[i].imgRoleRadio.src === "radio_selected.png"){
        selectedRole = segData[i];
        break;
      }
    }
    //if same role is selected again
    if(selectedRole && selectedRole.id === assignedRole.id){
      added = [];
      removed=[];
    }else{
      added.push(selectedRole.id);
      removed.push(assignedRole.id);
    }
    var id = this.presenter.getCurrentCustomerDetails().Customer_id;
      this.presenter.editCustomerGroups({
        "ModifiedByID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
    	"ModifiedByName": kony.mvc.MDAApplication.getSharedInstance().appContext.userName,
        "Customer_id": id,
        "listOfAddedGroups": added,
        "listOfRemovedGroups": removed
      });
    this.showRolesScreenBasedOnType(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE);
  },
  addAllRoles : function(){
    var allRoles=this.view.segCustomerRolesEdit.data;
    for(var i=0;i<allRoles.length;i++){
      allRoles[i].imgRoleCheckbox.src = "checkboxselected.png";
    }
    this.view.segCustomerRolesEdit.info.removedRoles=[];
   	this.view.segCustomerRolesEdit.info.addedRoles=this.getAllAddedGroups();
    this.view.segCustomerRolesEdit.setData(allRoles);
    this.updateRolesCount();
    this.view.forceLayout();
  },
  removeAllSelectedRoles : function(){
    var allRoles=this.view.segCustomerRolesEdit.data;
    var assignedRoles = this.CustomerRoles.AssignedGroups;

    var originalGroupIds = assignedRoles.map(function (g) {
      return g.Group_id;
    });
    for(var i=0;i<allRoles.length;i++){
      allRoles[i].imgRoleCheckbox.src = "checkboxnormal.png";
    }
    this.view.segCustomerRolesEdit.info.removedRoles=originalGroupIds;
   	this.view.segCustomerRolesEdit.info.addedRoles=[];
    this.view.segCustomerRolesEdit.setData(allRoles);
    this.updateRolesCount();
    this.view.forceLayout();
  },
  updateRolesCount : function(){
    var segData=this.view.segCustomerRolesEdit.data;
    var count;
    var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
        (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
    : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
    if (customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      count = segData.reduce(function(totalCount, rec) {
        if(rec.imgRoleRadio.src === "radio_selected.png"){
          totalCount = totalCount+1;
        }
        return totalCount;
      }, 0);
    }else{
      count = segData.reduce(function(totalCount, rec) {
        if(rec.imgRoleCheckbox.src === "checkboxselected.png"){
          totalCount = totalCount+1;
        }
        return totalCount;
      }, 0);
      if(count===this.view.segCustomerRolesEdit.data.length)
        this.view.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
      else
        this.view.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
    }

    this.view.lblSelectedRolesCount.text = count;
    this.view.lblSelectedRolesTotalCount.text="of "+segData.length;
    this.view.forceLayout();
  },
  fillEditRoleDetails : function(){
    var id = this.presenter.getCurrentCustomerDetails().Customer_id;
      var target = "EditScreen";
      this.presenter.getCustomerGroups({
        "customerID": id
      }, target);
    this.view.flxRoleError.setVisibility(false);
    this.view.flxRolesEditHeader.top="0dp";
    this.view.segCustomerRolesEdit.top="95dp";
    this.view.segCustomerRolesEdit.height="500dp";
  },
  /*****START: add/remove additional features and actions tab *****/
  /*
  * create json with all the moetary actions of all features
  */
  getAllFeaturesActions : function(allFeatures){
    var self = this;
    var actions = [], featuresList = [];
    var monActions = {}, typeId="";
    featuresList = JSON.parse(allFeatures);
    //filter all monetary actions 
    for(var i=0; i< featuresList.length; i++){
      actions = featuresList[i].actions;
      for(var j=0; j<actions.length; j++){
        if(actions[j].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY){
          monActions[actions[j].id] = actions[j].limits;
        }
      }

    }
    self.allMonActionsList = monActions;
  },
  /*
   * map actions data to actions segment
   * @param: list of actions for a feature 
   */
  setDataToActionsSegment : function(actions){
    var self = this;
    var widgetMap = {
      "id":"id",
      "featureId":"featureId",
      "isAssigned":"isAssigned",
      "description":"description",
      "isMFAApplicable":"isMFAApplicable",
      "isAccountLevel":"isAccountLevel",
      "isPrimaryAction": "isPrimaryAction",
      "type":"type",
      "limits":"limits",
      "displaySequence":"displaySequence",
      "dependencyActionToCheck":"dependencyActionToCheck",
      "dependencyActionToUncheck":"dependencyActionToUncheck",
      "flxCustRolesSelectedActions":"flxCustRolesSelectedActions",
      "flxActionNameContainer":"flxActionNameContainer",
      "flxActionLimits":"flxActionLimits",
      "flxActionCheckbox":"flxActionCheckbox",
      "imgActionCheckbox":"imgActionCheckbox",
      "lblActionName":"lblActionName",
      "lblRowHeading1":"lblRowHeading1",
      "lblCurrencySymbol1":"lblCurrencySymbol1",
      "tbxLimitValue1":"tbxLimitValue1",
      "flxLimitError1":"flxLimitError1",
      "lblLimitErrorIcon1":"lblLimitErrorIcon1",
      "lblLimitErrorMsg1":"lblLimitErrorMsg1",
      "flxLimitValue1":"flxLimitValue1",
      "lblRowHeading2":"lblRowHeading2",
      "lblCurrencySymbol2":"lblCurrencySymbol2",
      "tbxLimitValue2":"tbxLimitValue2",
      "flxLimitError2":"flxLimitError2",
      "lblLimitErrorIcon2":"lblLimitErrorIcon2",
      "lblLimitErrorMsg2":"lblLimitErrorMsg2",
      "flxLimitValue2":"flxLimitValue2",
      "lblRowHeading3":"lblRowHeading3",
      "lblCurrencySymbol3":"lblCurrencySymbol3",
      "tbxLimitValue3":"tbxLimitValue3",
      "flxLimitError3":"flxLimitError3",
      "lblLimitErrorIcon3":"lblLimitErrorIcon3",
      "lblLimitErrorMsg3":"lblLimitErrorMsg3",
      "flxLimitValue3":"flxLimitValue3",
      "flxActionDisabled":"flxActionDisabled",
      "lblNoDesc":"lblNoDesc",
      "flxActionRowCont":"flxActionRowCont",
      "lblMandatory":"lblMandatory",

    };
    var dependencyToCheck = null,dependencyToUncheck = null;
    var segData = actions.map(function(rec){
      var limitsMap;
      //create limits JSON map
      if(rec.limits && (rec.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY)){
        limitsMap = rec.limits.reduce(function(map, obj) {
          map[obj.id] = obj.value;
          return map;
        }, {});
      }
      if(rec.dependency){ //for approval actions
        dependencyToCheck = rec.dependency;
        dependencyToUncheck = rec.id;
      }
      return{
        "id":rec.id,
        "featureId":rec.featureId,
        "displaySequence":rec.displaySequence,
        "isAssigned":rec.isAssigned?(rec.isAssigned==="1"?"true":"false"):rec.isImgChecked,
        "description":rec.description,
        "isMFAApplicable":rec.isMFAApplicable,
        "isAccountLevel":rec.isAccountLevel,
        "isPrimaryAction": rec.isPrimary,
        "type":rec.type,
        "dependencyActionToCheck": rec.dependency || null,
        "dependencyActionToUncheck": null,
        "limits":rec.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY ? rec.limits : null,
        "updatedLimits" : rec.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY ? rec.limits : null,
        "isImgChecked": rec.isImgChecked,
        "flxActionDisabled":{"isVisible":(rec.isImgChecked === "true") ? false :true,
                             "height":"180dp"},
        "lblNoDesc":".",
        "flxActionNameContainer": {"skin":"sknflxffffffBorderE1E5EERadius3px"},
        "flxActionLimits":{"isVisible":rec.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY ? true : false},
        "flxActionCheckbox": {"onClick": self.checkUncheckActions},
        "imgActionCheckbox": {"src":(rec.isImgChecked === "true") ? "checkboxselected.png" :"checkboxnormal.png"},
        "lblActionName":{"text": rec.name},
        "lblMandatory":{"text": kony.i18n.getLocalizedString("i18n.frmGroupsController.MandatoryAction"),
                        "isVisible":rec.isPrimary === "true" ? true : false},
        "lblRowHeading1": kony.i18n.getLocalizedString("i18n.frmServiceManagement.PerTransactionLimitLC"),
        "lblCurrencySymbol1":{"text":self.currencyValue},
        "tbxLimitValue1":{"text":limitsMap? limitsMap.MAX_TRANSACTION_LIMIT : "",
                          "skin":(rec.isImgChecked === "true") ? "sknTbxBgFFFFFFf485c7513pxNoBorder" : "txtD7d9e0disabledf3f3f3NoBorder",
                          "onTextChange":self.updateLimitsValues,
                          "onKeyUp": self.clearLimitErrors,
                          "info":{"name":"MAX_TRANSACTION_LIMIT"}},
        "flxLimitError1":{"isVisible":false},
        "lblLimitErrorIcon1":"",
        "lblLimitErrorMsg1":{"text":""},
        "flxLimitValue1":{"skin": (rec.isImgChecked === "true") ?"sknFlxbgFFFFFFbdrD7D9E0rd3px" : "sknFlxbgF3F3F3bdrd7d9e0"},
        "lblRowHeading2": kony.i18n.getLocalizedString("i18n.frmServiceManagement.DailyTransactionLimitLC"),
        "lblCurrencySymbol2":{"text":self.currencyValue},
        "tbxLimitValue2":{"text":limitsMap ? limitsMap.DAILY_LIMIT : "",
                          "skin":(rec.isImgChecked === "true") ? "sknTbxBgFFFFFFf485c7513pxNoBorder" : "txtD7d9e0disabledf3f3f3NoBorder",
                          "onTextChange":self.updateLimitsValues,
                          "onKeyUp": self.clearLimitErrors,
                          "info":{"name":"DAILY_LIMIT"}},
        "flxLimitError2":{"isVisible":false},
        "lblLimitErrorIcon2":"",
        "lblLimitErrorMsg2":{"text":""},
        "flxLimitValue2":{"skin": (rec.isImgChecked === "true") ?"sknFlxbgFFFFFFbdrD7D9E0rd3px" : "sknFlxbgF3F3F3bdrd7d9e0"},
        "lblRowHeading3": kony.i18n.getLocalizedString("i18n.frmServiceManagement.WeeklyTransLimitLC"),
        "lblCurrencySymbol3":{"text":self.currencyValue},
        "tbxLimitValue3":{"text":limitsMap ? limitsMap.WEEKLY_LIMIT : "",
                          "skin":(rec.isImgChecked === "true") ? "sknTbxBgFFFFFFf485c7513pxNoBorder" : "txtD7d9e0disabledf3f3f3NoBorder",
                          "onTextChange":self.updateLimitsValues,
                          "onKeyUp": self.clearLimitErrors,
                          "info":{"name":"WEEKLY_LIMIT"}},
        "flxLimitError3":{"isVisible":false},
        "lblLimitErrorIcon3":"",
        "lblLimitErrorMsg3":{"text":""},
        "flxLimitValue3":{"skin": (rec.isImgChecked === "true") ?"sknFlxbgFFFFFFbdrD7D9E0rd3px" : "sknFlxbgF3F3F3bdrd7d9e0"},
        "template":"flxCustRolesSelectedActions",
      };
    });
    this.view.addFeaturesAndActions.segSelectedOptions.widgetDataMap = widgetMap;
    //arrange based on display sequence
    this.sortBy = this.getObjectSorter("displaySequence");
    this.sortBy.inAscendingOrder = true;
    if(segData.length > 0){
      var sortData = segData.sort(this.sortBy.sortData);
      for(var i=0;i<sortData.length;i++){
        if(sortData[i].id === dependencyToCheck){
          sortData[i].dependencyActionToUncheck = dependencyToUncheck;
          break;
        }
      }
      this.view.addFeaturesAndActions.segSelectedOptions.setData(sortData);
      this.showActionsList();
      this.setActionsCount();
    }else{
      this.view.addFeaturesAndActions.segSelectedOptions.setData([]);
      this.hideActionsList();
    }
    this.view.forceLayout();
  },
  /*
  * show actions list segment and other details when feature is selected
  */
  showActionsList : function(){
    this.view.addFeaturesAndActions.btnResetActions.setVisibility(true);
    this.view.addFeaturesAndActions.flxActionDetailsContainer.setVisibility(true);
    this.view.addFeaturesAndActions.flxSegActionsList.setVisibility(true);
    this.view.addFeaturesAndActions.rtxSelectedOptionsMessage.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * hide actions list segment and other details when any feature is not selected
  */
  hideActionsList : function(){
    this.view.addFeaturesAndActions.btnResetActions.setVisibility(false);
    this.view.addFeaturesAndActions.flxActionDetailsContainer.setVisibility(false);
    this.view.addFeaturesAndActions.flxSegActionsList.setVisibility(false);
    this.view.addFeaturesAndActions.rtxSelectedOptionsMessage.setVisibility(true);
    this.view.addFeaturesAndActions.flxActionsMessage.setVisibility(false);
    this.view.addFeaturesAndActions.lblSelectedOption.text = kony.i18n.getLocalizedString("i18n.frmOutageMessage.Actions")+ "(0)";
    this.view.forceLayout();
  },
  /*
  * add or remove an action when checked/unchecked a row
  */
  checkUncheckActions: function () {
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var res = {};
    var added = self.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removed = self.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    // add limits key only for monetary
    if(segData[selInd].updatedLimits)
      res["limits"] = segData[selInd].updatedLimits;
    res["id"] = segData[selInd].id;
    //selecting checkbox
    if (segData[selInd].imgActionCheckbox.src === "checkboxnormal.png") {
      segData[selInd].imgActionCheckbox.src = "checkboxselected.png";
      //enable limits textboxes
      segData[selInd] = this.enableDisableLimitsTextbox(segData[selInd],selInd,true);

      if (segData[selInd].isAssigned==="true") {
        delete removed[segData[selInd].id];
      } else {
        added[segData[selInd].id] = res;
      }
      self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(segData[selInd], selInd);
      //select the primary action on click of other actions
      if(segData[selInd].isPrimaryAction === "false"){
        self.checkPrimaryAction();
      }
      //select the dependency's action
      if(segData[selInd].dependencyActionToCheck){
        self.checkUncheckDependentAction(1);
      }
    } else if (segData[selInd].imgActionCheckbox.src === "checkboxselected.png") { //un selecting checkbox
      if(segData[selInd].isPrimaryAction === "true"){
        //uncheck all action when primary action is unchecked
        self.removeAllActions(false);
      } else{
        segData[selInd].imgActionCheckbox.src = "checkboxnormal.png";
        if (segData[selInd].flxActionLimits.isVisible === true) {
          //disable limit's textboxes
          segData[selInd] = this.enableDisableLimitsTextbox(segData[selInd],selInd,false);
        }
        if (segData[selInd].isAssigned==="true") {
          removed[segData[selInd].id] = res;
        } else {
          delete added[segData[selInd].id];
        }
        self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(segData[selInd], selInd);
        //unselect the dependency's action
        if(segData[selInd].dependencyActionToUncheck){
          self.checkUncheckDependentAction(2);
        }
      }
    }
    self.setFeaturesCheckbox();
    self.setActionsCount();
  },
  /*
  * check/add all the actions of the selected feature
  */
  selectAllActions : function(opt){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var segFeaturesData = self.view.addFeaturesAndActions.segAddOptions.data[selInd];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var added = self.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removed = self.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    var res = {}, actions = [];
    var check = ((self.prevSelectedFeature.length === 1 && (selInd === self.prevSelectedFeature[0])) ||
                 (self.prevSelectedFeature.length > 1 && (selInd === self.prevSelectedFeature[1])));
    //actions shown are of current feature
    if(check){
      actions = self.view.addFeaturesAndActions.segSelectedOptions.data;
    } else{ //actions shown are not of current feature
      actions = segFeaturesData.actions;
    }
    for(var i=0;i< actions.length;i++){
      res = {};
      if(check && actions[i].updatedLimits){
        res["limits"] = actions[i].updatedLimits;
      } else if(!check && actions[i].limits){
        res["limits"] = actions[i].limits;
      }
      res["id"] = actions[i].id;
      if (actions[i].isAssigned==="true" || actions[i].isAssigned==="1") {
       /* if(self.groupsCurrAction === self.groupActionConfig.COPY) added[actions[i].id] = res;
        else delete removed[actions[i].id];*/
        delete removed[actions[i].id];
      } else {
        added[actions[i].id] = res;
      }
      if(check){
        actions[i].isImgChecked = "true";
        actions[i].imgActionCheckbox.src = "checkboxselected.png";
        if (actions[i].flxActionLimits.isVisible === true) {
          //enable limits textboxes
          actions[i] = this.enableDisableLimitsTextbox(actions[i],i,true);
        }
      }
    }
    if(check) self.view.addFeaturesAndActions.segSelectedOptions.setData(actions);
    this.view.forceLayout();
  },
  /*
  * unchecks/remove's all the actions of that feature
  */
  removeAllActions : function(forAllFeatures,rowInd){
    var self = this;
    var selInd = forAllFeatures ? rowInd :self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var segFeaturesData = self.view.addFeaturesAndActions.segAddOptions.data[selInd];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var added = self.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removed = self.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    var res = {}, actions = [];
    var check = ((self.prevSelectedFeature.length === 1 && (selInd === self.prevSelectedFeature[0])) ||
                 (self.prevSelectedFeature.length > 1 && (selInd === self.prevSelectedFeature[1])));
    //actions shown are of current feature
    if(check){
      actions = self.view.addFeaturesAndActions.segSelectedOptions.data;
    } else{ //actions shown are not of current feature
      actions = segFeaturesData.actions;
    }
    for(var i=0; i<actions.length; i++){
      res = {};
      if(check && actions[i].updatedLimits){
        res["limits"] = actions[i].updatedLimits;
      } else if(!check && actions[i].limits){
        res["limits"] = actions[i].limits;
      }
      res["id"] = actions[i].id;
      if (actions[i].isAssigned==="true" || actions[i].isAssigned==="1") {
       /* if(self.groupsCurrAction === self.groupActionConfig.COPY) delete added[actions[i].id]; 
        else removed[actions[i].id] = res;*/
        removed[actions[i].id] = res;
      } else {
        delete added[actions[i].id]; 
      }
      if(check){
        actions[i].isImgChecked = "false";
        actions[i].imgActionCheckbox.src = "checkboxnormal.png";
        if (actions[i].flxActionLimits.isVisible === true) {
          //disable limit's textboxes
          actions[i] = this.enableDisableLimitsTextbox(actions[i],i,false);
        }
      }
    }
    if(check) self.view.addFeaturesAndActions.segSelectedOptions.setData(actions);
    this.view.forceLayout();
  },
  /*
   * check primary action when clicked on other non-primary actions first
   */
  checkPrimaryAction : function(){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var added = self.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removed = self.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    var primaryAction = "";
    for(var i=0;i<segData.length;i++){
      if(segData[i].isPrimaryAction === "true"){
        primaryAction = segData[i];

        if(primaryAction.imgActionCheckbox.src === "checkboxnormal.png"){
          primaryAction.imgActionCheckbox.src = "checkboxselected.png";
          var res = {};
          if(primaryAction.updatedLimits)
            res["limits"] = primaryAction.updatedLimits;
          res["id"] = primaryAction.id;
          if (primaryAction.isAssigned && primaryAction.isAssigned === "true") {
            delete removed[primaryAction.id];
          } else {
            added[primaryAction.id] = res;
          }
          self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(primaryAction,i);
        }
      }
    }
  },
  /*
   * check the dependents parent action on selecting a dependent action
   */
  checkUncheckDependentAction : function(opt){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var added = self.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removed = self.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    var dependencyAction = opt === 1 ? segData[selInd].dependencyActionToCheck : segData[selInd].dependencyActionToUncheck;
    var parentActionToCheck = "";
    for(var i=0;i<segData.length;i++){
      if(dependencyAction === segData[i].id){
        parentActionToCheck = segData[i];
        //check the  dependency action checkbox
        if(parentActionToCheck.imgActionCheckbox.src === "checkboxnormal.png" && (opt === 1)){
          parentActionToCheck.imgActionCheckbox.src = "checkboxselected.png";
          var res = {};
          if(parentActionToCheck.updatedLimits)
            res["limits"] = parentActionToCheck.updatedLimits;
          res["id"] = parentActionToCheck.id;
          if (parentActionToCheck.isAssigned && parentActionToCheck.isAssigned === "true") {
           /* if(self.groupsCurrAction === self.groupActionConfig.COPY) added[parentActionToCheck.id] = res;
            else delete removed[parentActionToCheck.id];*/
            delete removed[parentActionToCheck.id];
          } else {
            added[parentActionToCheck.id] = res;
          }
          self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(parentActionToCheck,i);
        }else if(parentActionToCheck.imgActionCheckbox.src === "checkboxselected.png" && (opt === 2)) { //uncheck the dependency action checkbox also
          parentActionToCheck.imgActionCheckbox.src = "checkboxnormal.png";
          var res = {};
          if(parentActionToCheck.updatedLimits)
            res["limits"] = parentActionToCheck.updatedLimits;
          res["id"] = parentActionToCheck.id;
          if (parentActionToCheck.isAssigned && parentActionToCheck.isAssigned === "true") {
            /*if(self.groupsCurrAction === self.groupActionConfig.COPY) delete added[parentActionToCheck.id];
            else removed[parentActionToCheck.id] = res;*/
            removed[parentActionToCheck.id] = res;
          } else {
            delete added[parentActionToCheck.id];
          }
          self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(parentActionToCheck,i);
        }
        break;
      }
    }
  },
  /*
   * filter the actions of a feature for updating added/removed actions
   */
  filterFeatureActionsforUpdatedRecords: function () {
    var selectedIndex = this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var segData = this.view.addFeaturesAndActions.segAddOptions.data;
    var selActions = segData[selectedIndex].actions;
    var addedAction = Object.keys(this.view.addFeaturesAndActions.segSelectedOptions.info.added);
    var removedAction = Object.keys(this.view.addFeaturesAndActions.segSelectedOptions.info.removed);
    for (var i = 0; i < selActions.length; i++) {
      if (addedAction.contains(selActions[i].id)) {
        selActions[i].limits = this.view.addFeaturesAndActions.segSelectedOptions.info.added[selActions[i].id].limits ?
          this.view.addFeaturesAndActions.segSelectedOptions.info.added[selActions[i].id].limits : [];
        selActions[i].isImgChecked = "true";
      } else if (removedAction.contains(selActions[i].id)) {
        selActions[i].isImgChecked = "false";
      } else {
        if(selActions[i].isAssigned ){
          selActions[i].isImgChecked = selActions[i].isAssigned === "1"? "true":"false";
        } else{
          selActions[i].isImgChecked = "false";
        }
      }
    }
    return selActions;
  },
  /*
   * update limit values on text change
   */
  updateLimitsValues: function (param) {
    var selInd = this.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var rowData = this.view.addFeaturesAndActions.segSelectedOptions.data[selInd];
    var addedRec = Object.keys(this.view.addFeaturesAndActions.segSelectedOptions.info.added);
    var limits = rowData.updatedLimits;
    var newLimits = [];
    var limitsId = limits.reduce(function (list, rec) {
      if(rec.id !== "MIN_TRANSACTION_LIMIT")
        list.push(rec.id);
      return list;
    }, []);
    for (var i = 0; i < limits.length; i++) {
      //update exsisting limit values
      if (limits[i].id === param.info.name) {
        limits[i].value = param.text;
        break;
      } else if (!limitsId.contains(param.info.name) && (limitsId[i] !== "MIN_TRANSACTION_LIMIT")) { //add new limit if not present
        newLimits.push({
          "id": param.info.name,
          "value": param.text
        });
        break;
      }
    }
    rowData.updatedLimits = limits.concat(newLimits);
    this.view.addFeaturesAndActions.segSelectedOptions.setDataAt(rowData, selInd);
    if (rowData.imgActionCheckbox.src === "checkboxselected.png") {
      this.view.addFeaturesAndActions.segSelectedOptions.info.added[rowData.id] = {
        "id": rowData.id,
        "limits": limits.concat(newLimits)
      };
    }
  },
  /*
   * set limit values in the popup
   * @param: limits json
   */
  setLimitsToPopup : function(limits){
    this.view.lblMaxValue12.text = limits.MAX_TRANSACTION_LIMIT=== undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+limits.MAX_TRANSACTION_LIMIT);
    this.view.lblMaxDailyLimitValue21.text = limits.DAILY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+limits.DAILY_LIMIT);
    this.view.lblWeeklyLimitValue22.text = limits.WEEKLY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+limits.WEEKLY_LIMIT);
    this.view.flxViewLimitsPopup.setVisibility(true);
    this.view.forceLayout();

  },
  showAssignFeatures : function(){
    var self = this;
    this.prevSelectedFeature = [];
    this.hideActionsList();
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.diableWidgetActionOnError(false);
    this.view.forceLayout();
  },
  validateActionLimitsEntered : function(){
    var selInd = this.prevSelectedFeature[0];
    var rowData = this.view.addFeaturesAndActions.segAddOptions.data[selInd];
    var actionsSegData = this.view.addFeaturesAndActions.segSelectedOptions.data;
    var actionData = "",actionInd = 0;
    var isValid = true;
    if(actionsSegData.length > 0){
      for(var j=0;j< actionsSegData.length;j++){
        if((actionsSegData[j].type === this.AdminConsoleCommonUtils.constantConfig.MONETARY) &&
           actionsSegData[j].imgActionCheckbox.src === "checkboxselected.png"){
          actionData = actionsSegData[j];
          actionInd = j;
          break;
        }
      }
      if(actionData !== ""){
        var limitsEntered = {};
        for(var j=0;j<actionData.updatedLimits.length;j++){
          limitsEntered[actionData.updatedLimits[j].id] = parseFloat(actionData.updatedLimits[j].value);
        }
        var currAction = this.allMonActionsList[actionData.id];
        if(currAction){
          for(var i=1;i<= 3;i++){
            var featureLevelLimit = currAction.filter(function(rec){
              if(rec.id === actionData["tbxLimitValue"+i].info.name)
                return rec;
            });
            var limit = featureLevelLimit[0]?featureLevelLimit[0].value:0;
            if(actionData["tbxLimitValue"+i].text === "" || actionData["tbxLimitValue"+i].text === undefined ){
              actionData["flxLimitValue"+i].skin = "sknFlxCalendarError";
              actionData["flxLimitError"+i].isVisible = true;
              actionData["lblLimitErrorMsg"+i].text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
              this.view.flxNoFeatureError.setVisibility(true);
              this.view.flxAddFeaturesActions.top="60dp";
              this.view.flxAddFeaturesActions.height="410dp";
              isValid = false;
              this.diableWidgetActionOnError(true);
            } else if(parseFloat(actionData["tbxLimitValue"+i].text) > parseFloat(limit) ){
              actionData["flxLimitValue"+i].skin = "sknFlxCalendarError";
              actionData["flxLimitError"+i].isVisible = true;
              actionData["lblLimitErrorMsg"+i].text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than")+" $" + currAction[i].value; 
              this.view.flxNoFeatureError.setVisibility(true);
              this.view.flxAddFeaturesActions.top="60dp";
              this.view.flxAddFeaturesActions.height="410dp";
              isValid = false;
              this.diableWidgetActionOnError(true);
            } else if(parseFloat(actionData["tbxLimitValue"+i].text) < 0){
              actionData["flxLimitValue"+i].skin = "sknFlxCalendarError";
              actionData["flxLimitError"+i].isVisible = true;
              actionData["lblLimitErrorMsg"+i].text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") +" $0"; 
              this.view.flxNoFeatureError.setVisibility(true);
              this.view.flxAddFeaturesActions.top="60dp";
              this.view.flxAddFeaturesActions.height="410dp";
              isValid = false;
              this.diableWidgetActionOnError(true);
            } else if(limitsEntered["MAX_TRANSACTION_LIMIT"] > limitsEntered["DAILY_LIMIT"] && (actionData["tbxLimitValue"+i].info.name === "DAILY_LIMIT")){
              actionData["flxLimitValue"+i].skin = "sknFlxCalendarError";
              actionData["flxLimitError"+i].isVisible = true;
              actionData["lblLimitErrorMsg"+i].text = kony.i18n.getLocalizedString("i18n.frmCompanies.ValueCannotBeLessThanPerTransactionLimit"); 
              this.view.flxNoFeatureError.setVisibility(true);
              this.view.flxAddFeaturesActions.top="60dp";
              this.view.flxAddFeaturesActions.height="410dp";
              isValid = false;
              this.diableWidgetActionOnError(true);
            } else if(limitsEntered["DAILY_LIMIT"] > limitsEntered["WEEKLY_LIMIT"] &&(actionData["tbxLimitValue"+i].info.name === "WEEKLY_LIMIT")){
              actionData["flxLimitValue"+i].skin = "sknFlxCalendarError";
              actionData["flxLimitError"+i].isVisible = true;
              actionData["lblLimitErrorMsg"+i].text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ValueCannotBeLessThanDailyLimit"); 
              this.view.flxNoFeatureError.setVisibility(true);
              this.view.flxAddFeaturesActions.top="60dp";
              this.view.flxAddFeaturesActions.height="410dp";
              isValid = false;
              this.diableWidgetActionOnError(true);
            }
          }
          this.view.lblNoFeatureErrorValue.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.PleaseCorrectErrorsToProceedFurther");
          this.view.addFeaturesAndActions.segSelectedOptions.setDataAt(actionData, actionInd);
        }
        this.view.forceLayout();
      }
    }

    return isValid;
  },
  fillFeatureDetails : function(){
    var selItem=this.view.addFeaturesAndActions.segAddOptions.data[this.selectedFeatureIndex];
    this.view.lblFeatureDetailsHeader2.text=selItem.lblFeatureName.tooltip;
    this.view.fontIconActive.text=selItem.lblIconStatus.text;
    this.view.fontIconActive.skin=selItem.lblIconStatus.skin;
    this.view.lblStatus.text=selItem.lblFeatureStatusValue.text;
    this.view.lblFeatureDescriptionValue.text=selItem.description;
    this.setViewFeatureActionsData(selItem.allActions);
    this.view.flxViewFeatureDetails.setVisibility(true);
    this.view.forceLayout();
  },
  setViewFeatureActionsData : function(actionsList){
    var scopeObj = this;
    if (actionsList === undefined||actionsList.length===0) {
      this.view.segActions.setData([]);
    } else {
      var dataMap = {
        "flxFeatureDetailsActions": "flxFeatureDetailsActions",
        "lblActionName":"lblActionName",
        "lblActionDescription":"lblActionDescription",
        "lblSeparator": "lblSeparator"
      };
      var data = actionsList.map(function(actionRec){
        return{
          "lblActionName":actionRec.name,
          "lblActionDescription":actionRec.description,
          "lblSeparator":"."
        }
      });
      scopeObj.view.segActions.widgetDataMap = dataMap;
      scopeObj.view.segActions.setData(data);
    }
    scopeObj.view.forceLayout();
  },
  searchFeatures : function(){
    var searchText=this.view.addFeaturesAndActions.tbxSearchAvailableItems.text;
    var features=[];
    var orginalData=this.view.addFeaturesAndActions.segAddOptions.info;
    this.hideActionsList();
    if (searchText !== "") {
      var requiredData = function (entData) {
        return entData.lblFeatureName.tooltip.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      };
      features = orginalData.filter(requiredData);
      if(features.length!==0){
        this.view.addFeaturesAndActions.segAddOptions.setData(features);
        this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(false);
        this.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
        this.setFeaturesFilterData();
      }else{
        this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+" \'"+searchText+kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Try_with_another_keyword");
        this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(true);
        this.view.addFeaturesAndActions.segAddOptions.setVisibility(false);
      }
    }else{
      this.view.addFeaturesAndActions.segAddOptions.setData(this.view.addFeaturesAndActions.segAddOptions.info);
      this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(false);
      this.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
      this.setFeaturesFilterData();
    }
    this.view.forceLayout();
  },
  setFeaturesFilterData : function(){
    var featuresData=this.view.addFeaturesAndActions.segAddOptions.data;
    var statusList=[];
    for(var i=0;i<featuresData.length;i++){
      if(!statusList.contains(featuresData[i].lblFeatureStatusValue.text))
        statusList.push(featuresData[i].lblFeatureStatusValue.text);
    }
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "lblDescription": "lblDescription",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox"
    };
    var data = statusList.map(function(segData){
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
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    this.view.forceLayout();
  },
  performFeatureStatusFilter : function(){
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = this.view.addFeaturesAndActions.segAddOptions.info;
    var segStatusData = self.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
    if(self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex){
      var rowInd=self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
      allData[rowInd].flxSelectedArrow.isVisible=false;
      allData[rowInd].flxFeatureNameContainer.skin="sknflxffffffBorderE1E5EERadius3px";
      allData[rowInd].flxFeatureNameContainer.hoverSkin="sknflxffffffBorderE1E5EERadius3pxPointer";
      self.hideActionsList();
    }
    this.hideActionsList();
    if (indices !== null) { //show selected indices data
      self.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(false);
      self.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        if(self.view.addFeaturesAndActions.tbxSearchAvailableItems.text.length==="")
          self.view.addFeaturesAndActions.segAddOptions.setData(self.view.addFeaturesAndActions.segAddOptions.info);
        else
          self.searchFeatures();
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.lblFeatureStatusValue.text) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.view.addFeaturesAndActions.segAddOptions.setData(dataToShow);
        } else {
          self.view.addFeaturesAndActions.segAddOptions.setData([]);
        }
      }
    }
    else {
      self.view.addFeaturesAndActions.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(true);
      self.view.addFeaturesAndActions.segAddOptions.setVisibility(false);
    }
    self.view.forceLayout();
  },
  updateFeaturesCount : function(){
    var data=this.view.addFeaturesAndActions.segAddOptions.data;
    var count = data.reduce(function(totalCount, rec) {
      if(rec.imgFeatureCheckbox.src === "checkboxselected.png"||rec.imgFeatureCheckbox.src === "checkboxpartial.png"){
        totalCount = totalCount+1;
      }
      return totalCount;
    }, 0);
    var txt = "";
    if(count === 1){
      txt = kony.i18n.getLocalizedString("i18n.frmGroupsController.FeatureSelected");
    } else{
      txt = kony.i18n.getLocalizedString("i18n.frmGroupsController.FeaturesSelected");
    }
    if(this.view.addFeaturesAndActions.tbxSearchAvailableItems.text.trim().length==0)
      this.view.addFeaturesAndActions.lblAvailableOptionsHeading.text = count+ " "+ txt;
    this.view.forceLayout();
  },
  addAllFeatures : function(){
    var allFeatures=this.view.addFeaturesAndActions.segAddOptions.data;
    var allActions = {};
    for(var i=0;i<allFeatures.length;i++){
      var added = allFeatures[i].actions.reduce(function(list, rec) {
        var res = {};
        res["id"] =  rec.id;
        if(rec.limits)
          res["limits"] = rec.limits;
        list[rec.id] = res;
        return list;
      }, {});
      allFeatures[i].imgFeatureCheckbox.src = "checkboxselected.png";
      Object.assign(allActions, added);
    }
    this.view.addFeaturesAndActions.segSelectedOptions.info = {"removed":{},"added":allActions};
    this.view.addFeaturesAndActions.segAddOptions.setData(allFeatures);
    this.updateFeaturesCount();
    this.view.forceLayout();
  },
  removeAllFeatures : function(){
    var allFeatures=this.view.addFeaturesAndActions.segAddOptions.data;
    var selInd = this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex;
    //remove row highlight for currently selected feature if any
    if(selInd){
      allFeatures[selInd[1]].flxSelectedArrow.isVisible=false;
      allFeatures[selInd[1]].flxFeatureNameContainer.skin="sknflxffffffBorderE1E5EERadius3px";
      allFeatures[selInd[1]].flxFeatureNameContainer.hoverSkin="sknflxffffffBorderE1E5EERadius3pxPointer";
    }
    for(var i=0; i<allFeatures.length; i++){
      allFeatures[i].imgFeatureCheckbox.src = "checkboxnormal.png";
    }
    this.onClickOfRemoveAll();
    this.hideActionsList();
    this.view.addFeaturesAndActions.segAddOptions.setData(allFeatures);
    this.view.addFeaturesAndActions.segSelectedOptions.info = {"removed":this.view.addFeaturesAndActions.segSelectedOptions.info.removed,"added":{}};
    this.updateFeaturesCount();
    this.view.forceLayout();
  },
  /*
  * on click of remove all features button
  */
  onClickOfRemoveAll : function(){
    var self = this;
    var added = self.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removed = self.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    var res = {}, actions = [];

    actions = self.actualAssignedActions;
    for(var i=0; i<actions.length; i++){
      res = {};
      if(actions[i].limits){
        res["limits"] = actions[i].limits;
      }
      res["id"] = actions[i].id;
      if (actions[i].isAssigned==="true" || actions[i].isAssigned==="1") {
        removed[actions[i].id] = res;
      }
    }
    this.view.forceLayout();
  },
  checkForPartialFeature : function(featureData){
    var selActionsCount=0;
    var checkboxImg;
    var actions=featureData.actions;
    for(var i=0;i<actions.length;i++){
      if(actions[i].isAssigned)
        selActionsCount++;
    }
    if(selActionsCount===actions.length)
      checkboxImg="checkboxselected.png";
    else
      checkboxImg="checkboxpartial.png";
    return checkboxImg;
  },
  toggleCheckbox : function(){
    var rowIndex=this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var segData=this.view.addFeaturesAndActions.segAddOptions.data;
    var count = segData.reduce(function(totalCount, rec) {
      if(rec.imgFeatureCheckbox.src === "checkboxselected.png"){
        totalCount = totalCount+1;
      }
      return totalCount;
    }, 1);
    if(segData[rowIndex].imgFeatureCheckbox.src==="checkboxnormal.png"){
      this.selectAllActions();
      segData[rowIndex].imgFeatureCheckbox.src="checkboxselected.png";
      if(count===this.view.addFeaturesAndActions.segAddOptions.info.length){
        this.view.addFeaturesAndActions.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
      }
      if(this.view.flxNoFeatureError.isVisible===true &&
         (this.view.lblNoFeatureErrorValue.text === kony.i18n.getLocalizedString("i18n.CustomerProfileEntitle.select_atlease_one_feature")))
        this.view.flxNoFeatureError.setVisibility(false);
    } else{
      this.removeAllActions(false);
      segData[rowIndex].imgFeatureCheckbox.src="checkboxnormal.png";
      if(this.view.addFeaturesAndActions.btnSelectAll.text===kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll"))
        this.view.addFeaturesAndActions.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
    }
    this.view.addFeaturesAndActions.segAddOptions.setDataAt(segData[rowIndex],rowIndex);
    this.updateFeaturesCount();
    this.view.forceLayout();
  },
  featuresRowClickHandler : function(){
    var selectedIndex=this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    this.selectedFeatureIndex=selectedIndex;
    var segData=this.view.addFeaturesAndActions.segAddOptions.data;
    var isChecked = (segData[selectedIndex].imgFeatureCheckbox.src === "checkboxnormal.png") ? false : true;
    //store [previous,current] selected feature index for validation purpose
    if(this.prevSelectedFeature.length < 2&&!(this.prevSelectedFeature.contains(selectedIndex))){
      this.prevSelectedFeature.push(selectedIndex);
    }else{ //update index
      this.prevSelectedFeature.shift();
      this.prevSelectedFeature.push(selectedIndex);
    }
    var isValid = this.validateActionLimitsEntered();

    if(isValid){
      for(var i=0;i<segData.length;i++){
        if(i===selectedIndex){
          segData[i].flxSelectedArrow.isVisible=true;
          segData[i].flxFeatureNameContainer.skin="sknflxffffffop100Border006ccaRadius3px";
          segData[i].flxFeatureNameContainer.hoverSkin="sknflxffffffop100Border006ccaRadius3pxPointer";
        }
        else{
          segData[i].flxSelectedArrow.isVisible=false;
          segData[i].flxFeatureNameContainer.skin="sknflxffffffBorderE1E5EERadius3px";
          segData[i].flxFeatureNameContainer.hoverSkin="sknflxffffffBorderE1E5EERadius3pxPointer";
        }
      }
      this.view.addFeaturesAndActions.lblFeatureNameValue.text = segData[selectedIndex].lblFeatureName.tooltip;
      this.view.addFeaturesAndActions.segAddOptions.setData(segData);

      if(this.view.flxNoFeatureError.isVisible === true &&
         (this.view.lblNoFeatureErrorValue.text === kony.i18n.getLocalizedString("i18n.frmGroupsController.PleaseCorrectErrorsToProceedFurther"))){
        this.view.flxNoFeatureError.setVisibility(false);
        this.view.flxAddFeaturesActions.top="0dp";
        this.view.flxAddFeaturesActions.height="470dp";
      }

      var actionsList = this.filterFeatureActionsforUpdatedRecords();
      this.setDataToActionsSegment(actionsList);
      //show Message in actions
      if(segData[selectedIndex].status_id === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
        this.showMessageInActions(true);
      } else{
        this.showMessageInActions(false);
      }
      this.view.addFeaturesAndActions.flxSegActionsList.setContentOffset({x:0,y:0});
    } else {
      //on error reverting back the selected row index to currently selected row
      if(this.prevSelectedFeature.length >= 1)
        this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex = [0,this.prevSelectedFeature[0]];
      var temp = this.prevSelectedFeature[0];
      this.prevSelectedFeature[0] = this.prevSelectedFeature[1];
      this.prevSelectedFeature[1] = temp;
    }
    this.view.forceLayout();
  },
  /*
  * update count of selected actions
  */
  setActionsCount : function(){
    var segData = this.view.addFeaturesAndActions.segSelectedOptions.data;
    var count = segData.reduce(function(totalCount, rec) {
      if(rec.imgActionCheckbox.src === "checkboxselected.png"){
        totalCount = totalCount+1;
      }
      return totalCount;
    }, 0);
    var txt = "";
    if(count === 1){
      txt = kony.i18n.getLocalizedString("i18n.frmGroupsController.ActionSelected");
    } else{
      txt = kony.i18n.getLocalizedString("i18n.frmGroupsController.ActionsSelected");
    }
    this.view.addFeaturesAndActions.lblSelectedOption.text = count+ " "+ txt;
  },
  setFeaturesSegData : function(featuresData,isFilter){
    var scopeObj = this;
    if (featuresData === undefined) {
      this.view.addFeaturesAndActions.segAddOptions.setData([]);
    } else {
      scopeObj.actualAssignedActions = [];
      var records = featuresData;
      if (records.length === 0) {
        if(isFilter){
          this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");          
        }
        this.view.addFeaturesAndActions.segAddOptions.setVisibility(false);
        this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(true);
      }else {
        this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(false);
        var dataMap = {
          //required fields mappings
          "featureId": "featureId",
          "actions": "actions",
          "orginalActions":"orginalActions",
          "description":"description",
          "status_id":"status_id",
          "flxCustRolesFeatures": "flxCustRolesFeatures",
          "flxFeatureNameContainer" : "flxFeatureNameContainer",
          "flxFeatureCheckbox": "flxFeatureCheckbox",
          "imgFeatureCheckbox": "imgFeatureCheckbox",
          "lblFeatureName": "lblFeatureName",
          "flxSelectedArrow" : "flxSelectedArrow",
          "lblIconSelectedArrow" : "lblIconSelectedArrow",
          "flxFeatureStatus":"flxFeatureStatus",
          "lblIconStatus": "lblIconStatus",
          "lblFeatureStatusValue": "lblFeatureStatusValue"
        };
        this.view.addFeaturesAndActions.segSelectedOptions.info = {"removed":{},"added":{}};
        var data = featuresData.map(scopeObj.mapFeaturesSegment.bind(scopeObj));
        scopeObj.view.addFeaturesAndActions.segAddOptions.info=data;
        scopeObj.view.addFeaturesAndActions.segAddOptions.widgetDataMap = dataMap;
        scopeObj.view.addFeaturesAndActions.segAddOptions.setData(data);
        scopeObj.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
        scopeObj.setFeaturesFilterData();
        scopeObj.updateFeaturesCount();
        //data changes for selected actions segment
        this.view.addFeaturesAndActions.segSelectedOptions.setData([]);
        this.view.addFeaturesAndActions.flxSegActionsList.setVisibility(false);
        this.view.addFeaturesAndActions.rtxSelectedOptionsMessage.setVisibility(true);
        //this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
        this.view.flxAddFeaturesActionsContainer.setVisibility(true);
        this.view.forceLayout();
      }
    }
  },
  mapFeaturesSegment: function(feature) {
    var scopeObj = this;
    var status ="",statusSkin="";
    var allFeatures= this.allRetailFeatures.concat([]);
    var totalActionsList=[];
    if(feature.status === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE){
      status = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      statusSkin = "sknFontIconActivate";
    }else if(feature.status === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
      status = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      statusSkin = "sknfontIconInactive";
    }else{
      status = kony.i18n.getLocalizedString("i18n.common.Unavailable");
      statusSkin = "sknIconBgE61919S12px";
    }
    //adding new key(isImgChecked) for tracking image selection
    var modifiedActions = feature.actions;
    for(var i=0; i<modifiedActions.length; i++){
      modifiedActions[i]["featureId"] = feature.id;
      modifiedActions[i]["isImgChecked"] = modifiedActions[i].isAssigned ? (modifiedActions[i].isAssigned === "1" ? "true" :"false" ): "false";
      if(modifiedActions[i].limits){
        //remove mintransaction limit
        var filteredLimits = modifiedActions[i].limits.filter(function(record){
          if(record.id !== "MIN_TRANSACTION_LIMIT")
            return record;
        });
        modifiedActions[i].limits = filteredLimits;
        //store asigned actions for remove all functionality
        this.storeAssignedActionsForRemoveAll(modifiedActions[i]);
      }
    }
    if((!feature.isAssigned) && this.view.addFeaturesAndActions.btnSelectAll.isVisible===false)
      this.view.addFeaturesAndActions.btnSelectAll.setVisibility(true);
    for(var j=0;j<allFeatures.length;j++){
      if(allFeatures[j].id===feature.id){
        totalActionsList=allFeatures[j].actions;
        break;
      }
    }
    return {
      "featureId": feature.id,
      "actions":modifiedActions,
      "orginalActions": JSON.stringify(modifiedActions),
      "allActions": totalActionsList,
      "description":feature.description,
      "status_id":feature.status,
      "lblFeatureName": {
        "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(feature.name,30,26),
        "tooltip":feature.name || ""
      },
      "flxFeatureCheckbox":{"onClick":scopeObj.toggleCheckbox},
      "imgFeatureCheckbox":{"src":(feature.isAssigned==="false"||feature.isAssigned===undefined)?"checkboxnormal.png":scopeObj.checkForPartialFeature(feature)},
      "flxSelectedArrow": {"isVisible":false},
      "lblIconSelectedArrow":{"text":""},
      "flxFeatureNameContainer":{"skin":"sknflxffffffBorderE1E5EERadius3px","hoverSkin":"sknflxffffffBorderE1E5EERadius3pxPointer"},
      "lblIconStatus": {
        "text": "\ue921",
        "skin": statusSkin
      },
      "lblFeatureStatusValue": {
        "text": status
      },
      "template": "flxCustRolesFeatures",
    };
  },
   /*
  * store the list of actual actioned assigned to group
  * @param: action data
  */
  storeAssignedActionsForRemoveAll : function(action){
    var self =this;
    if(action.isAssigned === "1"){
      self.actualAssignedActions.push(action);
    }
  },
  /*
  * clear action limit's error on key up
  */
  clearLimitErrors : function(eventObj){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var rowData = self.view.addFeaturesAndActions.segSelectedOptions.data[selInd];
    var widId = eventObj.parent.id.substring(eventObj.parent.id.length-1,eventObj.parent.id.length);
    if(rowData["flxLimitError"+widId].isVisible === true){
      self.diableWidgetActionOnError(false);
      if(self.view.flxNoFeatureError.isVisible === true &&
         (self.view.lblNoFeatureErrorValue.text === kony.i18n.getLocalizedString("i18n.frmGroupsController.PleaseCorrectErrorsToProceedFurther"))){
        self.view.flxNoFeatureError.setVisibility(false);
        self.view.flxAddFeaturesActions.top="0dp";
        self.view.flxAddFeaturesActions.height="470dp";
      }
      self.view.forceLayout();
      rowData["flxLimitValue"+widId].skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      rowData["flxLimitError"+widId].isVisible = false;
      self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(rowData, selInd);
    }
    self.view.forceLayout();
  },
  /*
   * enable/disable limit's textboxes based on feature/action selection
   */
  enableDisableLimitsTextbox : function(rowData,rowInd,isEnable){
    if(isEnable){
      //enable limts textboxes
      rowData.tbxLimitValue1.skin = "sknTbxBgFFFFFFf485c7513pxNoBorder";
      rowData.tbxLimitValue2.skin = "sknTbxBgFFFFFFf485c7513pxNoBorder";
      rowData.tbxLimitValue3.skin = "sknTbxBgFFFFFFf485c7513pxNoBorder";
      rowData.flxLimitValue1.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      rowData.flxLimitValue2.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      rowData.flxLimitValue3.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      rowData.flxActionDisabled.isVisible = false;
    } else{
      //disable limit's textboxes
      var height = this.view.addFeaturesAndActions.segSelectedOptions.clonedTemplates[rowInd].flxActionLimits.frame.height;
      rowData.tbxLimitValue1.skin = "txtD7d9e0disabledf3f3f3NoBorder";
      rowData.tbxLimitValue2.skin = "txtD7d9e0disabledf3f3f3NoBorder";
      rowData.tbxLimitValue3.skin = "txtD7d9e0disabledf3f3f3NoBorder";
      rowData.flxLimitValue1.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      rowData.flxLimitValue2.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      rowData.flxLimitValue3.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      rowData.flxActionDisabled.height = height + "dp";
      rowData.flxActionDisabled.isVisible = true;
    }
    return rowData;
  },
  /*
   * disable/enables all the other actions in assign features screen while validating limits
   */
  diableWidgetActionOnError: function(opt) {
    if (opt === false) {
      this.view.addFeaturesAndActions.btnResetActions.setEnabled(true);
      this.view.addFeaturesAndActions.btnSelectAll.setEnabled(true);
      this.view.addFeaturesAndActions.tbxSearchAvailableItems.setEnabled(true);
    } else {
      this.view.addFeaturesAndActions.btnResetActions.setEnabled(false);
      this.view.addFeaturesAndActions.btnSelectAll.setEnabled(false);
      this.view.addFeaturesAndActions.tbxSearchAvailableItems.setEnabled(false);
    }
  },
  /*
  * popup shown on click of reset actions buttons
  */
  showResetActionsPopup: function () {
    var self = this;
    this.view.popUpConfirmation.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ResetActions");
    this.view.popUpConfirmation.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ResetActionsPopupMessage");
    this.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUpConfirmation.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.flxPopUpConfirmation.setVisibility(true);
    this.view.popUpConfirmation.btnPopUpDelete.onClick = function (event) {
      self.view.flxPopUpConfirmation.setVisibility(false);
      self.resetFeatureActions();
    };
    this.view.forceLayout();
  },
  /*
  * reset actions segment data and update added/removed actions list
  */
  resetFeatureActions : function(){
    var selFeatureInd = this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex;
    var featuresData = this.view.addFeaturesAndActions.segAddOptions.data;
    if(selFeatureInd){
      var actions = featuresData[selFeatureInd[1]].orginalActions;
      this.setDataToActionsSegment(JSON.parse(actions));
      var added = Object.keys(this.view.addFeaturesAndActions.segSelectedOptions.info.added);
      var removed = Object.keys(this.view.addFeaturesAndActions.segSelectedOptions.info.removed);
      var actionsData = this.view.addFeaturesAndActions.segSelectedOptions.data;
      for(var i=0; i<actionsData.length; i++){
        if(added.contains(actionsData[i].id)){
          delete this.view.addFeaturesAndActions.segSelectedOptions.info.added[actionsData[i].id];
        }
        if(removed.contains(actionsData[i].id)){
          delete this.view.addFeaturesAndActions.segSelectedOptions.info.removed[actionsData[i].id];
        }
      }
    }
    this.setFeaturesCheckbox();
  },
  /*
  * toggle the message flex in the actions segment to show info/warnings
  * @param: showMsg-(true/false)
  */
  showMessageInActions : function(showFlex){
    var totalHeight = this.view.addFeaturesAndActions.flxSegSelectedOptions.frame.height;
    var subFlexHeight = this.view.addFeaturesAndActions.flxActionDetailsContainer.frame.height;
    if(showFlex === true){
      subFlexHeight = subFlexHeight+50;
      this.view.addFeaturesAndActions.flxActionsMessage.setVisibility(true);
      this.view.addFeaturesAndActions.lblActionMsg.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.FeatureInactiveWarningMessage");
    } else if(showFlex === false){
      this.view.addFeaturesAndActions.flxActionsMessage.setVisibility(false);
    }
    var segHeight = (totalHeight - subFlexHeight - 15) + "px";
    this.view.addFeaturesAndActions.flxSegActionsList.height = segHeight;
    this.view.forceLayout();
  },
  setFeaturesCheckbox : function(){
    var self = this;
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var featuresSegData=self.view.addFeaturesAndActions.segAddOptions.data;
    var featureRowIndex=self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var actionFeatureId = segData.length > 0 ? segData[0].featureId : "";
    //update the selected row index value with the feature that is selected instead of the one checked
    if(actionFeatureId !== featuresSegData[featureRowIndex].featureId){
      featureRowIndex = self.prevSelectedFeature.length > 1 ? self.prevSelectedFeature[1] : self.prevSelectedFeature[0];
    }  
    var res = {};
    var allSelected=true;
    var nonSelected=true;
    for(var x=0;x<segData.length;x++){
      if(segData[x].imgActionCheckbox.src === "checkboxnormal.png"){
        allSelected=false;
      }else if(segData[x].imgActionCheckbox.src === "checkboxselected.png")
        nonSelected=false;
    }
    if(nonSelected===false){
      self.view.flxNoFeatureError.setVisibility(false);
      self.view.flxAddFeaturesActions.top="0dp";
      self.view.flxAddFeaturesActions.height="470dp";
      if(allSelected===true)
        featuresSegData[featureRowIndex].imgFeatureCheckbox.src="checkboxselected.png";
      else
        featuresSegData[featureRowIndex].imgFeatureCheckbox.src="checkboxpartial.png";
    }else{
      featuresSegData[featureRowIndex].imgFeatureCheckbox.src="checkboxnormal.png";
    }
    self.view.addFeaturesAndActions.segAddOptions.setDataAt(featuresSegData[featureRowIndex],featureRowIndex);
    self.updateFeaturesCount();
    self.view.forceLayout();
  },
  updateAddedFeatures : function(){
    var addedActions=this.view.addFeaturesAndActions.segSelectedOptions.info.added;
    var removedActions=this.view.addFeaturesAndActions.segSelectedOptions.info.removed;
    var updateParam={
      "Type_id": "TYPE_ID_RETAIL",
      "userName": "",
      "removedActions":Object.keys(removedActions),
      "updatedActions":Object.values(addedActions)
    };
    this.presenter.updateAdditionalFeaturesList(updateParam);
  },
  validateFeatures : function(){
    var self = this;
    var featuresSegData=self.view.addFeaturesAndActions.segAddOptions.data;
    var featuresCount=0;
    for(var x=0;x<featuresSegData.length;x++){
      if(featuresSegData[x].imgFeatureCheckbox.src === "checkboxselected.png"|| featuresSegData[x].imgFeatureCheckbox.src === "checkboxpartial.png")
        featuresCount++;
    }
    if(featuresCount===0){
      if(self.view.flxNoFeatureError.isVisible===false){
        self.view.flxNoFeatureError.setVisibility(true);
        self.view.lblNoFeatureErrorValue.text = kony.i18n.getLocalizedString("i18n.CustomerProfileEntitle.select_atlease_one_feature");
        self.view.flxAddFeaturesActions.top="60dp";
        self.view.flxAddFeaturesActions.height="410dp";
      }
      return false;
    }else
      return true;
  },
  filterRetailFeatures : function(allFeatures){
    for(var i=0;i<allFeatures.length;i++){
      if(allFeatures[i].groupid===this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
        this.allRetailFeatures=allFeatures[i].features;
        break;
      }
    }
  },
  /**** END ****/
  /*
  * set data to roles vertical tabs
  */
  setRolesVerticalTabsData : function(){
    var widgetMap = {
      "flxRow":"flxRow",
      "lblSeperator":"lblSeperator",
      "btnOption1":"btnOption1",
      "flxImgArrow":"flxImgArrow",
      "lblSelected1":"lblSelected1"
    };
    var tabNames = [{"name":kony.i18n.getLocalizedString("i18n.frmCustomerProfileRoles.AssignedRoles_UC"),
                     "isSelected":1},
                    {"name": kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.AdditionalFeaturesAndActions_UC"),
                     "isSelected":2}];
    var segData = tabNames.map(function(rec){
      return {
        "lblSeperator":"-",
        "btnOption1":{"text":rec.name,
                      "skin":rec.isSelected === 1 ? "sknBtnLatoBold485c7512PxNoBorder" :"sknBtn737678LatoReg12pxNoBgBorder"},
        "flxImgArrow":{"isVisible":rec.isSelected === 1 ? true : false},
        "lblSelected1":{"text":"\ue918"},
        "template":"flxRow",
      }
    });
    this.view.segRolesVerticalTabs.widgetDataMap = widgetMap;
    this.view.segRolesVerticalTabs.setData(segData);
    this.view.forceLayout();
  },
  /*
  * change the selected tab in vertical tabs
  */
  toggleSelectedRow : function(){
    var segData=this.view.segRolesVerticalTabs.data;
    var selectedRowIndex = this.view.segRolesVerticalTabs.selectedRowIndex ? this.view.segRolesVerticalTabs.selectedRowIndex[1] : 0;
    for(var i=0; i<segData.length; i++){
      if(i === selectedRowIndex){
        segData[i].btnOption1.skin="sknBtnLatoBold485c7512PxNoBorder";
        segData[i].flxImgArrow.isVisible=true;
      }
      else{
        segData[i].btnOption1.skin="sknBtn737678LatoReg12pxNoBgBorder";
        segData[i].flxImgArrow.isVisible=false;
      }
    }
    this.view.segRolesVerticalTabs.setData(segData);
    if(selectedRowIndex === 0){ //roles tabs
      this.view.flxRolesListing.setVisibility(true);
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
      this.view.flxNoFeaturesActionsCont.setVisibility(false);
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
    } else{ //additional features tab
      this.presenter.getAdditionalFeaturesAndActions({ "username": this.presenter.getCurrentCustomerDetails().Username}, "InfoScreen");
      this.view.lblNoFeaturesActionsHeader.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
      this.view.flxRolesListing.setVisibility(false);
      this.view.flxNoFeaturesActionsCont.setVisibility(true);
      this.view.btnAddFeaturesActions.setVisibility(false);
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * show or hide the toggle buttons based on customer type
  * @param: customer info
  */
  showToggleButtons : function(customerInfo){
    var custType = customerInfo.CustomerType_id;
    if(custType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0 &&
             custType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0){
      this.toggleButtonsUtilFunction([this.view.toggleButtons.btnToggleLeft,this.view.toggleButtons.btnToggleRight],1);
      this.view.flxToggleButtonsContainer.setVisibility(true);
      this.view.flxGroupsWrapper.top = "60dp";
    } else {
      this.view.flxToggleButtonsContainer.setVisibility(false);
      this.view.flxGroupsWrapper.top = "0dp";
    }
    this.view.forceLayout();
  },
  /*
   * display list of additional features by dynamically adding component
   */
  showAdditionalFeaturesList : function(){
    var flag=false;
    var featuresList= this.additionalFeaturesAndActions;
    if(featuresList.length>0){
      this.view.flxOtherAddtionalFeaturesActions.removeAll();
      this.view.flxOtherAddtionalFeaturesActions.setVisibility(true);
      this.createAdditionalFeaturesRow(featuresList);
    } else{ //no other featuresActions available
      this.view.flxNoFeaturesActionsCont.setVisibility(true);
      this.view.btnAddFeaturesActions.setVisibility(false);
      this.view.flxOtherFeatureActionsEdit.setVisibility(false);
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
    }
    this.view.forceLayout();
  },
   /*
  * create rows dynamically for given additional features
  * @param: additional features list
  */
  createAdditionalFeaturesRow : function(addFeatures){
    var flag = false;
    for (var i = 0; i < addFeatures.length; i++) {
      if(addFeatures[i].isAssigned && (addFeatures[i].isAssigned === "1")){
        flag=true;
        var collapsibleSegmentToAdd = new com.adminConsole.customerRoles.collapsibleSegment({
          "id": "additionalFeatureRow" + i,
          "isVisible": true,
          "width": "100%",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": "20px"
        }, {}, {});
        this.view.flxOtherAddtionalFeaturesActions.add(collapsibleSegmentToAdd);
        this.setAdditionalFeaturesDataForRow(addFeatures[i],collapsibleSegmentToAdd);
        this.setAdditionalActionsDataForFeature(addFeatures[i].actions,collapsibleSegmentToAdd);
      }
    }
    if(flag === false){ //no additionalFeaturesAndActions are assigned
      this.view.flxOtherFeatureActionsEdit.setVisibility(false);
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
      this.view.flxNoFeaturesActionsCont.setVisibility(true);
      this.view.btnAddFeaturesActions.setVisibility(true);
      this.view.lblNoFeaturesActionsHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.NoFeaturesAndActionsAdded");
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
      this.view.commonButtons.btnCancel.info = {"areFeaturesAvailable": false};
    }else if (flag === true){
      this.view.flxOtherFeatureActionsEdit.setVisibility(true);
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(true);
      this.view.flxNoFeaturesActionsCont.setVisibility(false);
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
      this.view.commonButtons.btnCancel.info = {"areFeaturesAvailable": true};
    }
    
  },
  /*
   * set feature name,description,status to dynamically created row
   * @param: feature details, component path
   */
  setAdditionalFeaturesDataForRow : function(featureDetails,collapsibleSegmentToAdd){
    var actionsCount=0;
    collapsibleSegmentToAdd.lblFeatureName.text = featureDetails.name;
        for(var i=0;i<featureDetails.actions.length;i++){
      if(featureDetails.actions[i].isAssigned && (featureDetails.actions[i].isAssigned === "1"))
        actionsCount++;
    }
    collapsibleSegmentToAdd.lblCountActions.text = actionsCount;
    collapsibleSegmentToAdd.lblTotalActions.text = " of "+featureDetails.totalActions;
    collapsibleSegmentToAdd.statusValue.text = featureDetails.status=== this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    collapsibleSegmentToAdd.statusIcon.skin = featureDetails.status=== this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?"sknFontIconActivate":"sknfontIconInactive";
    collapsibleSegmentToAdd.lblView.setVisibility(false);
  },
  /*
   * set actions for a feature
   * @param: list of actions, component
   */
  setAdditionalActionsDataForFeature : function(actions,componentPath){
    var self =this;
    var actionsData=[];
    var widgetMap = {
      "flxFeatureActions":"flxFeatureActions",
      "lblActionName":"lblActionName",
      "lblDescription":"lblDescription",
      "lblSeperator":"lblSeperator"
    };
    for(var i=0;i<actions.length;i++){
      if(actions[i].isAssigned && (actions[i].isAssigned === "1")){
        actionsData.push({
        "template":"flxFeatureActions",
        "lblActionName":actions[i].name,
        "lblDescription":actions[i].description,
        "lblSeperator":"-"
      });
      }
    }
    componentPath.SegActions.widgetDataMap = widgetMap;
    componentPath.SegActions.setData(actionsData);
    self.view.forceLayout();
    self.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  
});
define({
  selectedFeatureIndex : 0,
  groupActionConfig :{
    CREATE:"CREATE",
    EDIT:"EDIT",
    COPY: "COPY"
  },
  removeCount : 0,
  recordsSize:20,
  prevIndex : -1,
  featureRecordsSize : 5,
  statusFontIcon:{
      "ASCENDING_IMAGE":'\ue92a',
      "ASCENDING_SKIN":"sknIcon12pxBlack",
      "DESCENDING_IMAGE":'\ue920',
      "DESCENDING_SKIN":"sknIcon12pxBlack",
    },
  activeFeatureStatus : "SID_FEATURE_ACTIVE",
  custToAdd:[],
  advanceSelectionFlag:true,
  featureactionmap:[],
  accessPolicies:[],
  masterData:[],
  roleFeatures:[],
  featuresegData:[],
  groupFeatures:[],
  serviceDefinitions: [],
  searchfilterlist : [],
  isFeatureSelectionPage: false,
  isFeaturedataset:0,
  isReviewDataset:0,
  createRequestParam:null,
  editRequestParam:null,
  allMonActionsList :null,
  prevSelectedFeature:[],
  orgAssignedCust:[],
  filterTag:null,
  groupsData:null,
  segmentRecordsSize : 40,
  searchResult :[],
  loadMoreModel:null,
  getMoreDataModel : null,
  getMoreDataModelAdvSel:null,
  selectedCustomerId:[],
  isFeaturesFetched: false,
  deletedCustomerId:[],
  limitForPaginationSearch:20,
  segmentYCoordinate : 0,
  groupsCurrAction:"",
  actualAssignedActions : [],
  selectedFeatureActionObj:{},
  test: {},
  allRegionData : {},
  selectedEntityId :"",
  entityValues : [],
  entityRegion : "",
  entityCompanyName:"",
  regionForCreate : "",
  idForCreate : "",
  legalEntityIdForView : "",
  regionForEdit : "",
  idForEdit : "",
  custRolesData : [],
  entityIdForEdit : "",
  custRoleSegData:[],
  legalentitychange: false,
  assignorginalvalueFlag: true,
  alldata: [],
  PreShowGroups : function(){
    this.setFlowActions();
    this.setPreshowData();
    this.showGroupUIChanges();
    this.setHeight();
  },
  willUpdateUI: function (groupsModel) {
    this.updateLeftMenu(groupsModel);
    if (groupsModel === undefined) {}
    else if(groupsModel.LoadingScreen){
      if(groupsModel.LoadingScreen.focus)
        kony.adminConsole.utils.showProgressBar(this.view);
      else
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if (groupsModel.custGroupsList && groupsModel.context === "" ) {
      kony.adminConsole.utils.showProgressBar(this.view);
      if (groupsModel.custGroupsList.length > 0) {
        this.setTypesDataToListBox();
        this.view.flxGroupList.setVisibility(true);
        this.view.flxGroupListContainer.setVisibility(true);
        this.sortBy = this.getObjectSorter("Group_Name");
        this.groupsData = groupsModel.custGroupsList;
        this.resetSortImages("grouplist");
        this.listOfProgressGroup = [];
        this.view.mainHeader.lblDropdownList.info = undefined;
        /*if(groupsModel.importProgressId.entityIds.length > 0){
          this.listOfProgressGroup = JSON.parse(groupsModel.importProgressId.entityIds);
        }
        var progressId = groupsModel.importProgressId;*/
        this.loadPageData = function () {
          var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
          if(searchText.length>3) {
          	 searchfilterlist = this.groupsData.filter(this.searchFilter);
          } else {
           searchfilterlist = this.groupsData;
          }
          var groupsList = searchfilterlist.sort(this.sortBy.sortData);
          var filteredGroupList = this.filterBasedOnTypeStatus(groupsList);
          this.showGroupList(filteredGroupList);
        };
        this.loadPageData();
      } else {
        this.groupsData = [];
        this.view.flxNoGroups.setVisibility(true);
      }
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
   else if (groupsModel.emptyCustGroupsList){
      this.groupsData = [];
      this.view.flxGroupList.setVisibility(false);
	  this.showGroupList();
    }
    else if (groupsModel.emptyCustGroupsListForCreate){
      this.groupsData = [];
      this.view.flxGroupList.setVisibility(true);
      this.view.flxGroupListContainer.setVisibility(false);
      this.view.flxGroupHeader.setVisibility(false);
    this.view.flxGroupSeparator.setVisibility(false);
    this.view.lblNoRecordFound.setVisibility(true);
      //this.showGroupList();
    }
    else if (groupsModel.entityValues) {
      var scopeObj = this;
      if(groupsModel.entityValues.list){
        var entityValuesResponse = groupsModel.entityValues.list;
        var parsedData;
        var entityArr = [];
        if(entityValuesResponse[0] && entityValuesResponse[0].id === undefined){
          parsedData = JSON.parse(entityValuesResponse);
          entityArr.push(parsedData);
          entityValues = entityArr;
        }
        else{
          entityValues = entityValuesResponse;
        }
        entityValues.sort((a, b) => {
          let regionOne = a.companyName.toLowerCase(),
              regionTwo = b.companyName.toLowerCase();
          if (regionOne < regionTwo) {
            return -1;
          }
          if (regionOne > regionTwo) {
            return 1;
          }
          return 0;
        });
        var entityId  = entityValues[0].id;
        entityRegion = entityValues[0].region;
        this.entityCompanyName = entityValues[0].companyName;
        this.view.lblSelectLegalEntity.text = this.entityCompanyName ;
        scopeObj.presenter.fetchCustomerGroupsWithEntity(entityId);
        selectedEntityId = entityValues;
      }
    }
    else if (groupsModel.getGroupsResponse){
      var scopeObj = this;
      if(groupsModel.getGroupsResponse.list){
        var response  = groupsModel.getGroupsResponse.list.GroupRecords;
        scopeObj.showCustomeRolesData(response);
        scopeObj.sortBy = scopeObj.getObjectSorter("Group_Name");
        scopeObj.resetSortImages("grouplist");
        scopeObj.groupsData = response;
        scopeObj.setListFiltersData();
        scopeObj.sortData = function() {
          scopeObj.showCustomeRolesData(response.filter(scopeObj.searchFilter).sort(scopeObj.sortBy.sortData));
        };
        scopeObj.sortData();
      }
    }
    else if (groupsModel.groupFeaturesForEdit) {
      var self = this;
      self.isFeaturesFetched = true;
      self.roleFeatures = groupsModel.features;
      self.masterData = JSON.parse(JSON.stringify(self.roleFeatures));
      self.setactions(self.roleFeatures);
      self.initialiseFeatureActionMap(self.roleFeatures);
      self.groupFeatures = groupsModel.groupFeaturesForEdit;
      if (self.groupFeatures.length > 0) {
        self.selectedFeatureActionObj ={};
        self.fillFeatureActionMapForEdit();
        self.SetIsSelectedForEdit();
        self.createRequest();
        if(groupsModel.tab === 1){ // show features/limits
          this.onNavigateToFeaturesTab();
        }else if(groupsModel.tab === 2){
          this.showAssignLimits();
        }
      } else{ //if no features from service so add screen
        if(groupsModel.tab === 1){
          this.showAssignFeatures();
        }
      }
      this.filterRoleTypeFeaturesList();
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if(groupsModel.toast){
      if(groupsModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")){
        this.view.toastMessage.showToastMessage(groupsModel.toast.message,this);
      }else if(groupsModel.toast.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")){
        this.view.toastMessage.showErrorToastMessage (groupsModel.toast.message,this);
      }else{}
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    //SEARCH RELATEd
    else if(groupsModel.fetchFeaturesAndActions){
      this.setViewFeaturesList(groupsModel.fetchFeaturesAndActions);
    }
    else if(groupsModel.allFeaturesAndActions){
      this.featuresList=groupsModel.allFeaturesAndActions;
      this.showServiceDefBasedOnType();
      this.filterRoleTypeFeaturesList();
      this.isFeaturesFetched = true;
      if(this.groupsCurrAction === this.groupActionConfig.CREATE)
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if(groupsModel.roleServiceDefinitions){
      this.serviceDefinitions = groupsModel.roleServiceDefinitions;
      if(this.groupsCurrAction === this.groupActionConfig.EDIT ||
        this.groupsCurrAction === this.groupActionConfig.COPY)
        this.showServiceDefBasedOnType();
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if(groupsModel.accessPolicies) {
      this.accessPolicies = groupsModel.accessPolicies;
    } 
  },

  setHeight : function(){
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    scrollHeight= screenHeight-106;
    this.view.flxGroupListContainer.height=screenHeight-255+"px";
    this.view.flxGroupList.height=scrollHeight+"px";
    this.view.flxGroupListContainer.height = scrollHeight - 130 + "px";
    //this.view.flxViewSegment.height = kony.os.deviceInfo().screenHeight - 150 - 160 +"px";
  },
  setFlowActions: function(){
    var scopeObj = this;

    this.view.listingSegmentClient.flxContextualMenu.onHover = scopeObj.onDropdownHoverCallback;

    this.view.noStaticData.btnAddStaticContent.onClick = function(){
      scopeObj.showAddGroupDetails(1);
    };
    this.view.verticalTabs.btnOption1.onClick = function(){
        var isValid = true;
        if(scopeObj.createRequestParam.featureactions.length > 0 && scopeObj.view.flxAssignLimitsComponent.isVisible === true)
            isValid = scopeObj.validateLimits();
        if (isValid === true && scopeObj.groupsCurrAction === scopeObj.groupActionConfig.CREATE) { //create
          scopeObj.showAddGroupDetails(1);
          var createData = {
            "Name": scopeObj.createRequestParam.name,
            "Description": scopeObj.createRequestParam.description,
            "Status": scopeObj.createRequestParam.status,
            "Type_id": scopeObj.createRequestParam.typeId,
            "isEAgreementActive": scopeObj.createRequestParam.isEAgreementActive,
            "servicedefinitions": scopeObj.createRequestParam.servicedefinitions,
            "isApplicabletoAllServices": scopeObj.createRequestParam.isApplicabletoAllServices,
            //"addedOrUpdatedBusinessTypes": scopeObj.createRequestParam.addedOrUpdatedBusinessTypes,
            "featureactions": scopeObj.createRequestParam.featureactions,
            //"legalEntityId": "GB0010001"//payload
          };
          scopeObj.fillDataForEdit(createData);
        } else if(isValid === true && scopeObj.groupsCurrAction === scopeObj.groupActionConfig.EDIT){
          var editData = {
            //pending; to update keys on edit integration
            "Name": scopeObj.createRequestParam.name,
            "Description": scopeObj.createRequestParam.description,
            "Status": scopeObj.createRequestParam.status,
            "Type_id": scopeObj.createRequestParam.typeId,
            "isEAgreementActive": scopeObj.createRequestParam.isEAgreementActive,
            //"addedOrUpdatedBusinessTypes" : scopeObj.editRequestParam.addedOrUpdatedBusinessTypes,
            //"removedBusinessTypes" : scopeObj.editRequestParam.removedBusinessTypes,
            "servicedefinitions": scopeObj.createRequestParam.servicedefinitions,
            "isApplicabletoAllServices": scopeObj.createRequestParam.isApplicabletoAllServices,
            "featureactions": scopeObj.createRequestParam.featureactions
          };
          var groupData = scopeObj.getGroupSetData();
          var leDetails =  scopeObj.getLEDesc(groupData.legalEntityId);
          scopeObj.showAddGroupDetails(2, groupData.orginalName);
          scopeObj.fillDataForEdit(editData, leDetails[0].companyName);
        } else if(isValid === true && scopeObj.groupsCurrAction === scopeObj.groupActionConfig.COPY) { //copy
          scopeObj.showAddGroupDetails(3);
          var copyData = {
            "Name": scopeObj.createRequestParam.name,
            "Description": scopeObj.createRequestParam.description,
            "Status": scopeObj.createRequestParam.status,
            "Type_id": scopeObj.createRequestParam.typeId,
            "isEAgreementActive": scopeObj.createRequestParam.isEAgreementActive,
            //"addedOrUpdatedBusinessTypes" : scopeObj.editRequestParam.addedOrUpdatedBusinessTypes,
            //"removedBusinessTypes" : scopeObj.editRequestParam.removedBusinessTypes,
            "servicedefinitions": scopeObj.createRequestParam.servicedefinitions,
            "isApplicabletoAllServices": scopeObj.createRequestParam.isApplicabletoAllServices,
            "featureactions": scopeObj.createRequestParam.featureactions
          };
          var selectedLE = scopeObj.view.lstBoxEntity.selectedKeyValue;
          var selectedLeName = selectedLE && selectedLE.length > 0 ? selectedLE[1] : "";
          scopeObj.fillDataForEdit(copyData, selectedLeName);
        }
    };
    this.view.verticalTabs.btnOption2.onClick = function(){
      var index = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex;
      var isValid = scopeObj.checkGroupDetailsValidation();
      if(scopeObj.createRequestParam.featureactions.length > 0 && scopeObj.view.flxAssignLimitsComponent.isVisible === true)
        isValid = scopeObj.validateLimits();
      if (isValid) {
        if (scopeObj.createRequestParam.featureactions.length === 0) {
          if(scopeObj.groupsCurrAction !== scopeObj.groupActionConfig.CREATE && scopeObj.isFeaturesFetched === false){
            var groupData = scopeObj.getGroupSetData();
            var request={"group_id":groupData.groupId,"type":groupData.Type_id,"legalEntityId": entityIdForEdit}; //entity changes
            scopeObj.presenter.fetchFeaturesForEdit(request, 1);
          }else{
            scopeObj.showAssignFeatures();
          }
        } else {
            scopeObj.onNavigateToFeaturesTab();
        }
      }
      //this.getlstdisabled();
    };
    this.view.verticalTabs.btnOption4.onClick = function() {
      var isValid = scopeObj.checkGroupDetailsValidation();
      if (isValid ){
        if(scopeObj.createRequestParam.featureactions.length >0 ) {
          scopeObj.hideAllGroups();
          scopeObj.showAssignLimits();
        } else{
          if(scopeObj.groupsCurrAction !== scopeObj.groupActionConfig.CREATE && scopeObj.isFeaturesFetched === false){
            var groupData = scopeObj.getGroupSetData();
            var request={"group_id":groupData.groupId,"type":groupData.Type_id,"legalEntityId": entityIdForEdit};
            scopeObj.presenter.fetchFeaturesForEdit(request, 2);
          }
        }
      }
    };
    this.view.btnCreate.onClick = function() {
      var isValid = scopeObj.validateLimits();
      if (isValid) {
        if (scopeObj.groupsCurrAction === scopeObj.groupActionConfig.EDIT){
          scopeObj.updateCustomerRole();                    
        }
        else
          scopeObj.createCustomerRole();
      }
    };
    this.view.featureAndActions.commonButtons.btnSave.onClick = function() {
      if (scopeObj.groupsCurrAction === scopeObj.groupActionConfig.EDIT){
        scopeObj.updateCustomerRole();                     
      }
      else
        scopeObj.createCustomerRole();
    };
    this.view.featureAndActions.commonButtons.btnNext.onClick = function() {
      if (scopeObj.createRequestParam.featureactions.length >0) {
        scopeObj.hideAllGroups();
        scopeObj.showAssignLimits();
      }else{
        if(scopeObj.groupsCurrAction !== scopeObj.groupActionConfig.CREATE && scopeObj.isFeaturesFetched === false){
          var groupData = scopeObj.getGroupSetData();
          var request={"group_id":groupData.groupId,"type":groupData.Type_id};
          scopeObj.presenter.fetchFeaturesForEdit(request, 2);
        }
      }
    };
    this.view.btnAddGroupCancel.onClick = function(){
      scopeObj.onCancelCreateEditScreen();
    };
    this.view.btnAddpermissions.onClick = function(){
      scopeObj.hideAllGroups();
      scopeObj.hideAll();
      scopeObj.isFeatureSelectionPage = true;
      scopeObj.hideShowHeadingSeperator(false);
      scopeObj.view.flxBreadCrumbs.setVisibility(true);
      scopeObj.view.flxAddGroups.setVisibility(true);
      scopeObj.view.flxFeatureComponent.setVisibility(true);
      scopeObj.view.featureAndActions.flxReview.setVisibility(false);
      scopeObj.view.verticalTabs.flxOption4.setVisibility(true);
      var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
      scopeObj.view.featureAndActions.segFeatures.setData(data);
      scopeObj.view.featureAndActions.flxFeatures.setVisibility(true);
      scopeObj.featuresegData=scopeObj.view.featureAndActions.segFeatures.data;
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
    };
    this.view.featureAndActions.btnAddPermission.onClick = function() {
      scopeObj.isFeatureSelectionPage = true;
      scopeObj.view.featureAndActions.flxReview.setVisibility(false);
      var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
      scopeObj.view.featureAndActions.segFeatures.setData(data);
      scopeObj.view.featureAndActions.flxFeatures.setVisibility(true);
      scopeObj.view.verticalTabs.flxOption4.setVisibility(true);
      scopeObj.featuresegData=scopeObj.view.featureAndActions.segFeatures.data;
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
    };
    this.view.featureAndActions.btnCancel.onClick = function(){
      scopeObj.onCancelCreateEditScreen();
    };
        
    this.view.featureAndActions.commonButtons.btnCancel.onClick = function(){
        scopeObj.onCancelCreateEditScreen();
    };
    this.view.btnCancel1.onClick = function(){
        scopeObj.onCancelCreateEditScreen();
    };
    this.view.btnCancel.onClick = function() {
        scopeObj.onCancelCreateEditScreen();
    };
    this.view.btnOption1.onClick = function() {
      scopeObj.showResetAllLimitsPopup();
    };
    this.view.featureAndActions.flxAssignActions.onClick = function (){    
      var data =scopeObj.view.featureAndActions.segDropdown.data;
      scopeObj.clearSelection(data);
      if (scopeObj.view.featureAndActions.flxDropDown.isVisible === true) 
      {
        scopeObj.view.featureAndActions.lblIconDownArrow.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.fontIconBreadcrumbsDown");   
        scopeObj.view.featureAndActions.flxDropDown.setVisibility(false);
      }
      else 
      {
        scopeObj.view.featureAndActions.flxDropDown.setVisibility(true);   
        scopeObj.view.featureAndActions.lblIconDownArrow.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.fontIconUpArrow");
      }
    };    
      //LEGAL ENTITY DROPdOWN
    this.view.flxLegalEntityDropdown.onClick = function () {
      // TO POPULATE DATA IN THE SEGMENT
      scopeObj.view.flxDropdownClick.setVisibility(true);
      var segDataRegion = [];
      var storeDataRegion;
      for (var i = 0; i < entityValues.length; i++) {
        storeDataRegion = {
          Details: entityValues[i].companyName,
        };
        segDataRegion.push(storeDataRegion);
      }
      scopeObj.view.segLegalEntity.widgetDataMap = {
        lblLegalEntityList: "Details",
      };
      scopeObj.view.segLegalEntity.setData(segDataRegion);
      allRegionData = segDataRegion;
      //onclick dropdown
      if (scopeObj.view.flxLegalDropdown.isVisible === true) {
        scopeObj.view.flxLegalDropdown.setVisibility(false);
        scopeObj.view.flxLegalSearch.setVisibility(false);
        scopeObj.view.flxDropdownClick.setVisibility(false);
      } else {
        scopeObj.view.flxLegalDropdown.setVisibility(true);
        scopeObj.view.flxLegalSearch.setVisibility(true);
      }
    };
    this.view.flxDropdownClick.onClick = function() {
        scopeObj.view.flxLegalDropdown.setVisibility(false);
        scopeObj.view.flxLegalSearch.setVisibility(false);
        scopeObj.view.flxDropdownClick.setVisibility(false);
    };
    //Legal Entity Dropdown in Add Customer Role Page
    this.view.flxLegalEntityDropdown1.onClick = function() {
      // TO POPULATE DATA IN THE SEGMENTS
      var segDataRegion = [];
      var storeDataRegion;
      var segDataRegion1 = scopeObj.getLEListForFormAction("frmGroups", 'CREATE');
      scopeObj.sortBy = scopeObj.getObjectSorter("companyName");
      scopeObj.sortBy.inAscendingOrder = true;
      segDataRegion1 = segDataRegion1.sort(scopeObj.sortBy.sortData);
      for (var i = 0; i < segDataRegion1.length; i++) {
        storeDataRegion = {
          Details: segDataRegion1[i].companyName,
        };
        segDataRegion.push(storeDataRegion);
      }
      scopeObj.view.segLegalEntity1.widgetDataMap = {
        lblLegalEntityList: "Details",
      };
      scopeObj.view.segLegalEntity1.setData(segDataRegion);
      allRegionData = segDataRegion;
      //onclick dropdown
      if (scopeObj.view.flxLegalDropdown1.isVisible === true) {
          scopeObj.view.flxLegalDropdown1.setVisibility(false);
          scopeObj.view.flxLegalSearch1.setVisibility(false);
      } else {
          scopeObj.view.flxLegalDropdown1.setVisibility(true);
          scopeObj.view.flxLegalSearch1.setVisibility(true);
      }

      entityValues.sort((a, b) => {
          let regionOne = a.companyName.toLowerCase(),
              regionTwo = b.companyName.toLowerCase();

              if (regionOne < regionTwo) {
                   return -1;
              }
              if (regionOne > regionTwo) {
                   return 1;
              }
              return 0;
       });
      };

     //SEARCH FUNCTIONALITY IN LEGAL ENTITY DROPDOWN1
    scopeObj.view.txtLegalSearch1.onKeyUp = function () {  
        if (scopeObj.view.txtLegalSearch1.text.trim().length > 0) {
          var segTest = scopeObj.view.segLegalEntity1.data;
          var search = scopeObj.view.txtLegalSearch1.text;
          var status = "";
          var filterData = segTest.filter(function (response) {
            status = response.Details.toLowerCase();
            if (status.indexOf(search) >= 0) return response;
          });
          if (filterData.length === 0) {
            scopeObj.view.segLegalEntity1.setVisibility(false);
            scopeObj.view.flxNoRecords1.setVisibility(true);
          } else {
            scopeObj.view.segLegalEntity1.setData(filterData);
            scopeObj.view.segLegalEntity1.setVisibility(true);
            scopeObj.view.flxNoRecords1.setVisibility(false);
          }
        } else {
        scopeObj.view.segLegalEntity1.setData(allRegionData);
        scopeObj.view.segLegalEntity1.setVisibility(true);
        scopeObj.view.flxNoRecords1.setVisibility(false);
        }
        scopeObj.view.forceLayout();
      };

    //SEARCH FUNCTIONALITY IN LEGAL ENTITY DROPDOWN
    scopeObj.view.txtLegalSearch.onKeyUp = function () {
      if (scopeObj.view.txtLegalSearch.text.trim().length > 0) {
        var segTest = scopeObj.view.segLegalEntity.data;
        var search = scopeObj.view.txtLegalSearch.text;
        var status = "";
        var filterData = segTest.filter(function (response) {
          status = response.Details.toLowerCase();
          if (status.indexOf(search) >= 0) return response;
        });
        if (filterData.length === 0) {
          scopeObj.view.segLegalEntity.setVisibility(false);
          scopeObj.view.flxNoRecords.setVisibility(true);
        } else {
          scopeObj.view.segLegalEntity.setData(filterData);
          scopeObj.view.segLegalEntity.setVisibility(true);
          scopeObj.view.flxNoRecords.setVisibility(false);
        }
      } else {
        scopeObj.view.segLegalEntity.setData(allRegionData);
        scopeObj.view.segLegalEntity.setVisibility(true);
        scopeObj.view.flxNoRecords.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    
    // checkbox to select all Action Policies of Assign Action DropDown
    this.view.featureAndActions.imgCheckBox.onClick= function(){
      scopeObj.selectAllSegmentData(scopeObj.view.featureAndActions.imgCheckBox,scopeObj.view.featureAndActions.segDropdown);
    },
    // checkbox to select all features in order to assign the actions to all the selected features
    this.view.featureAndActions.imgFeatureCheckbox.onClick = function() {
      scopeObj.selectAllSegmentData(scopeObj.view.featureAndActions.imgFeatureCheckbox,scopeObj.view.featureAndActions.segFeatures);
    };
    // to apply all the action policies to selected features from selected policies of Assign Action DropDown 
    this.view.featureAndActions.btnApply.onClick = function(){
      var segPolicyData = scopeObj.getSelectedData(scopeObj.view.featureAndActions.segDropdown);
      var featureData = scopeObj.getSelectedData(scopeObj.view.featureAndActions.segFeatures);
      if(segPolicyData.length > 0 && featureData.length >0){
          scopeObj.setFeatureactionMapping();
          var data=scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
          scopeObj.view.featureAndActions.segFeatures.setData(data);
          scopeObj.featuresegData=scopeObj.view.featureAndActions.segFeatures.data;
      }
      if(segPolicyData.length == 0)
        scopeObj.selectAllSegmentData(scopeObj.view.featureAndActions.imgFeatureCheckbox,scopeObj.view.featureAndActions.segFeatures);
      scopeObj.view.featureAndActions.flxDropDown.setVisibility(false);
      scopeObj.view.featureAndActions.lblIconDownArrow.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.fontIconBreadcrumbsDown");
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
      scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.configurations.searchByServiceDefinition");
      //scopeObj.view.featureAndActions.flxAssignActions.setVisibility(false);
    };
    this.view.btnAdvancedSelection.onClick = function() {
      scopeObj.showAdvanceSelectionUI();
    };
    
    this.view.featureAndActions.btnSelection.onClick = function() {
        scopeObj.showAdvanceSelectionUI();
    };
    this.view.featureAndActions.btnAdvancedSelection.onClick = function() {
        scopeObj.showAdvanceSelectionUI();
    };
    this.view.btnCancelAdvSel.onClick = function() { 
      if(scopeObj.isFeatureActionMapEmpty() === 1)
          scopeObj.showfeaturesPage();
      else{
        scopeObj.hideAllGroups();
        if(scopeObj.isFeatureSelectionPage === true){
          scopeObj.view.flxFeatureComponent.setVisibility(true);
          var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
          scopeObj.view.featureAndActions.segFeatures.setData(data);
          scopeObj.view.featureAndActions.flxFeatures.setVisibility(true);
        }
        else{
          scopeObj.view.flxFeatureComponent.setVisibility(true);
          scopeObj.view.featureAndActions.flxReview.setVisibility(true);
        }
          //var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
          //scopeObj.showReviewPage(data);
      }
    };
    this.view.btnSave.onClick = function() {
        scopeObj.setFeatureactionMappingForComponent();
        if (scopeObj.isFeatureActionMapEmpty() === 1) 
            scopeObj.showfeaturesPage();
        else {
            scopeObj.isFeatureSelectionPage = false;
            var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
            scopeObj.showReviewPage(data);
            scopeObj.createRequest();
        }
    };
    this.view.tbxSearchBox1.onDone = function(){
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxSearchBox1.text);
      if(searchText && searchText.trim().length >= 3){
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.searchAdvanceSelection();
      }
    };

    this.view.flxClearSearchImage1.onClick = function(){
        scopeObj.view.tbxSearchBox1.text = "";
        scopeObj.searchAdvanceSelection();
    };
    this.view.featureAndActions.subHeader.tbxSearchBox.onDone = function() {
      if(scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text.length >=3 ){
        if(!scopeObj.containSpecialChars(scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text)){
			            scopeObj.loadFeatureData();
        }
        if (scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text === "") {
            scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
        } else {
            scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(true);
            scopeObj.view.featureAndActions.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        }
      }
    };
     // Search function in featureAndActions
     this.view.featureAndActions.subHeader.tbxSearchBox.onKeyUp = function(){
        if (scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text.trim().length > 0) {
            var segTest = scopeObj.view.featureAndActions.segFeatures.data;
            var search = scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text;
            var status = "";
            if (scopeObj.assignorginalvalueFlag) { // for the segment data
                scopeObj.alldata = segTest;
                scopeObj.assignorginalvalueFlag = false;
            }
            var filterData = segTest.filter(function(segTest) {
                status = segTest.lblFeatureName.toLowerCase();
                if (status.indexOf(search) >= 0) return segTest;
            });
            if (filterData.length === 0) {
                scopeObj.view.featureAndActions.segFeatures.setVisibility(false);
                scopeObj.view.flxNoFeaturesAction.setVisibility(true);
            } else {
                scopeObj.view.featureAndActions.segFeatures.setData(filterData);
                scopeObj.view.featureAndActions.segFeatures.setVisibility(true);
                scopeObj.view.flxNoFeaturesAction.setVisibility(false);
            }
        } else {
            scopeObj.view.featureAndActions.segFeatures.setData(scopeObj.alldata);
            scopeObj.view.featureAndActions.segFeatures.setVisibility(true);
            scopeObj.view.flxNoFeaturesAction.setVisibility(false);
        }
        scopeObj.view.forceLayout();
    };
    this.view.featureAndActions.subHeader.flxClearSearchImage.onClick = function(){
          scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
          scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
          scopeObj.view.featureAndActions.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";    
          scopeObj.loadFeatureData();
    };
    this.view.btnAddGroupNext.onClick = function(){
	  if (kony.os.deviceInfo().deviceWidth >= 1790 && kony.os.deviceInfo().deviceWidth <= 1800) {
       scopeObj.view.flxFeaturePermissions.left = "333dp";
      }
      var index = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex;
      var isValid = scopeObj.checkGroupDetailsValidation();
      var selectedType = scopeObj.view.lstBoxType.selectedKey;
//       scopeObj.view.featureAndActions.lblEntityRegion.setVisibility(true);
//       scopeObj.view.featureAndActions.lblEntityRegion.text = regionForCreate;
//       scopeObj.view.lblEntityDisplay.text = regionForCreate;
      if(isValid){
        if (scopeObj.createRequestParam.featureactions.length === 0) {
          if(scopeObj.groupsCurrAction !== scopeObj.groupActionConfig.CREATE && scopeObj.isFeaturesFetched === false){
            var groupData = scopeObj.getGroupSetData();
            var request={"group_id":groupData.groupId,"type":groupData.Type_id,"legalEntityId":entityIdForEdit};
            scopeObj.presenter.fetchFeaturesForEdit(request, 1);
          }else{
            scopeObj.showAssignFeatures();
          }
        } else {
           scopeObj.onNavigateToFeaturesTab();
        }
      }
    };
    this.view.featureAndActions.btnSave.onClick = function(){
      //var data = scopeObj.view.featureAndActions.segFeatures.data;
      var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, 1); //scopeObj.isReviewDataset); recheck;
      scopeObj.showReviewPage(data);
      scopeObj.createRequest();
      scopeObj.isFeatureSelectionPage = false;
    };
    this.view.popUpCancelEdits.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
    };
    this.view.popUpCancelEdits.lblPopupClose.onClick = function() {
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
    };
    this.view.txtGroupDescription.onEndEditing = function(){
      if(scopeObj.view.lblGroupDescriptionCount.isVisible === true){
        scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
      } 
    };
    const groupDesc = function(){
      scopeObj.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoGroupDescriptionError.setVisibility(false);
      scopeObj.editRequestParam.Description = scopeObj.view.txtGroupDescription.text; 
      scopeObj.createRequestParam.description = scopeObj.view.txtGroupDescription.text;
      if(scopeObj.view.txtGroupDescription.text.trim().length===0)
      {
        scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
      }else{
        scopeObj.view.lblGroupDescriptionCount.setVisibility(true);
        scopeObj.view.lblGroupDescriptionCount.text=scopeObj.view.txtGroupDescription.text.trim().length+"/250";
      }
      scopeObj.view.forceLayout();
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
    const groupDescKeyUp = debounce(groupDesc,200);
    this.view.txtGroupDescription.onKeyUp = function(){
      groupDescKeyUp();
    };
    const groupName = function () {
      scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
      scopeObj.view.flxNoGroupNameError.setVisibility(false);
      scopeObj.editRequestParam.name = scopeObj.view.tbxGroupNameValue.text; 
      scopeObj.createRequestParam.name = scopeObj.view.tbxGroupNameValue.text;
      if(scopeObj.view.tbxGroupNameValue.text.trim().length===0)
      {
        scopeObj.view.lblGroupNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblGroupNameCount.setVisibility(true);
        scopeObj.view.lblGroupNameCount.text=scopeObj.view.tbxGroupNameValue.text.trim().length+"/100";
      }
      scopeObj.view.forceLayout();
    };
    const groupNameKeyUp = debounce(groupName,200);
    this.view.tbxGroupNameValue.onKeyUp = function(){
      groupNameKeyUp();
    };
    this.view.tbxGroupNameValue.onEndEditing = function(){
      if(scopeObj.view.lblGroupNameCount.isVisible === true){
        scopeObj.view.lblGroupNameCount.setVisibility(false);
      } 
    };
    // ADD CUSTOMER ROLE button
    this.view.mainHeader.btnAddNewOption.onClick = function(){
     scopeObj.view.flxType.left = "3%";
     if (kony.os.deviceInfo().deviceWidth >= 1790 && kony.os.deviceInfo().deviceWidth <= 1800) {
                scopeObj.view.flxIconDownArrow.width = "12.5%";
                scopeObj.view.lblIconDownArrow1.left = "60%";
                scopeObj.view.flxType.left = "20dp";
                scopeObj.view.flxLegalEntity1.left = "49%";
                scopeObj.view.flxLegalEntity1.width = "49.5%";
                scopeObj.view.tbxGroupNameValue.paddingInPixel =true;
                scopeObj.view.lstBoxType.paddingInPixel =true;
                scopeObj.view.tbxGroupNameValue.padding = [10, 0, 0, 0];
                scopeObj.view.lstBoxType.padding = [6, 0, 0, 0];
                scopeObj.view.txtGroupDescription.paddingInPixel =true;
                scopeObj.view.txtGroupDescription.padding = [10, 10, 0, 0];
      }
      var currentpageflow = "add";
      scopeObj.view.flxEntity.setVisibility(false);
      scopeObj.view.flxLegalEntity1.setVisibility(true);
      scopeObj.view.lblLegalEntity1.setVisibility(true);
      scopeObj.view.lblEntityHeader.setVisibility(false);
      regionForCreate = scopeObj.view.lblSelectLegalEntity.text;
//       scopeObj.view.lblSelectLegalEntity1.text = regionForCreate;
      scopeObj.view.lblSelectLegalEntity1.text = "Select Legal Entity";
      if (typeof selectedEntityId === 'undefined') {
        serviceDefinitionParam = entityValues[0].id;
      }
      else{         
        serviceDefinitionParam = selectedEntityId[0].id;
      }
      scopeObj.presenter.fetchRoleServiceDefinitions(null,serviceDefinitionParam,"create");
      scopeObj.groupsCurrAction = scopeObj.groupActionConfig.CREATE;
      scopeObj.isFeaturesFetched = false;
      scopeObj.isFeatureSelectionPage = false;
      scopeObj.orgAssignedCust = [];
      scopeObj.custToAdd= [];
      scopeObj.deletedCustomerId =[];
      scopeObj.selectedCustomerId = [];
      scopeObj.preCreateInitialization();
      scopeObj.view.BusinessTypesToolTip.setVisibility(false);
      scopeObj.createRequestParam = {
          "name": "",
          "description": "",
          "status": scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE,
          "typeId": "",
          "isEAgreementActive": 0,
          "servicedefinitions":[],
          "featureactions": [],
          "isApplicabletoAllServices":0,
           "legalEntityId":""
        };
      scopeObj.currentFlow(currentpageflow, regionForCreate);
      scopeObj.showAddGroupDetails(1);
    };
    this.view.mainHeader.lblDropdownList.onClick = function(){
      if(scopeObj.view.listingSegmentClient.rtxNoResultsFound.isVisible === false) {
        scopeObj.downloadGroupsCSV();
      }
    };
    this.view.listingSegmentClient.contextualMenu.flxOption2.onClick = function(){
      scopeObj.view.lblEntityHeader.setVisibility(true);
      scopeObj.view.flxLegalEntity1.setVisibility(false);
      scopeObj.isFeaturesFetched = false;
      scopeObj.onEditGroupClick();
      //scopeObj.hideUIBasedOnRoleType();
      //scopeObj.hideUIBasedOnStatusSelection();
    };
    this.view.listingSegmentClient.contextualMenu.flxOption4.onClick = function(){
      if(scopeObj.view.listingSegmentClient.contextualMenu.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")){
        scopeObj.showGroupDeactive();
      }else{
        scopeObj.changeStatusOfGroup();
        scopeObj.ToggleActive();
      }
    };
    this.view.listingSegmentClient.contextualMenu.flxOption3.onClick = function(){
      scopeObj.isFeaturesFetched = false;
      scopeObj.view.flxEntity.setVisibility(false);
      scopeObj.view.flxLegalEntity1.setVisibility(true);
      scopeObj.view.lblLegalEntity1.setVisibility(true);
      scopeObj.onCopyGroupClick();
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      scopeObj.view.flxDeactivateGroup.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxDeactivateGroup.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      scopeObj.changeStatusOfGroup();
      scopeObj.ToggleActive();
      var status = scopeObj.view.listingSegmentClient.contextualMenu.lblOption4.text;
    };
    this.view.popUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.popUp.flxPopUpClose.onClick = function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.listingSegmentClient.segListing.onRowClick = function(){
      scopeObj.showGroupViewDetails();
    };
    //LEGAL ENTITY
    this.view.segLegalEntity.onRowClick = function(){
      scopeObj.legalentitychange = true; //flag to reset the segment data for search
      scopeObj.insertvaluetolbl();
    };
    this.view.segLegalEntity1.onRowClick = function() {
      scopeObj.setTypesDataToListBox();
      scopeObj.view.flxBusinessTypesContainer.setVisibility(false);
      scopeObj.view.lblSelectLegalEntity1.text = scopeObj.view.segLegalEntity1.selectedRowItems[0].Details; //inserts the selected value from the dropdown
      var region = scopeObj.view.lblSelectLegalEntity1.text;
      regionForCreate = region;
      scopeObj.view.featureAndActions.lblEntityRegion.text = "( " + regionForCreate + " )";
      scopeObj.view.lblEntityDisplay.text = "( " + regionForCreate + " )";
      scopeObj.view.flxLegalDropdown1.setVisibility(false);
      scopeObj.view.flxLegalSearch1.setVisibility(false);
      selectedEntityId = entityValues.filter(function(item) {
          if (item.companyName === region) return item.id;
      });
      if (typeof selectedEntityId === 'undefined') {
        idForCreate = entityValues[0].id;
      } else {
        idForCreate = selectedEntityId[0].id;
      }
      scopeObj.presenter.fetchRoleServiceDefinitions(null,idForCreate,"create");
  };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.getAllGroups();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.navigateBreadcrum();
    };
    // SEARCH FUNCTION IN CUSTOMER ROLES PAGE
    this.view.subHeader.tbxSearchBox.onKeyUp = function() {
      if (scopeObj.view.subHeader.tbxSearchBox.text.trim().length > 0) {
        var status = "";
        var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);
        if(scopeObj.assignorginalvalueFlag || scopeObj.legalentitychange){      // for the segment data
          scopeObj.alldata = custRoleSegData;
          scopeObj.assignorginalvalueFlag = false;
          scopeObj.legalentitychange = false;
        }
        var filterData = scopeObj.alldata.filter(function (custRolesData) {
          status = custRolesData.lblGroupName.text.toLowerCase();
          if (status.indexOf(searchText) >= 0) return custRolesData;
        });
        if (filterData.length === 0) {
          scopeObj.view.flxGroupHeader.setVisibility(true);
          scopeObj.view.flxGroupSeparator.setVisibility(true);
          scopeObj.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + searchText + ".";
          scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
          scopeObj.view.listingSegmentClient.segListing.setVisibility(false);
        } else {
          scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
          scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
          scopeObj.view.listingSegmentClient.segListing.setData(filterData);
        }
      } else {
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
        scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
        scopeObj.view.listingSegmentClient.segListing.setData(scopeObj.alldata);
      }
//       if (searchText === "") {
//           scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
//       } else {
//           scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
//           scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
//       }
      // if (scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices === null || scopeObj.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices === null) {
      //     scopeObj.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      //     scopeObj.view.flxGroupHeader.setVisibility(true);
      //     scopeObj.view.flxGroupSeparator.setVisibility(true);
      //     scopeObj.view.listingSegmentClient.segListing.setData([]);
      //     scopeObj.view.forceLayout();
      // }
    };
    this.view.subHeader.flxClearSearchImage.onClick = function(){
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";    
      scopeObj.loadPageData();
      if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices === null &&
        scopeObj.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices === null && scopeObj.view.BusinessTypeFilterMenu.segStatusFilterDropdown.selectedIndices === null){
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        scopeObj.view.flxGroupHeader.setVisibility(true);
        scopeObj.view.flxGroupSeparator.setVisibility(true);
        scopeObj.view.listingSegmentClient.segListing.setData([]);
        scopeObj.view.forceLayout();
      }
    };
    this.view.flxGroupName.onClick = function () {
      var data = scopeObj.sortBy.column("Group_Name");
      scopeObj.resetSortImages("grouplist");
      scopeObj.sortData();
    };
    this.view.flxGroupCustomers.onClick = function () {
      var data = scopeObj.sortBy.column("Customers_Count");
      scopeObj.resetSortImages("grouplist");
      scopeObj.sortData();
    };
    this.view.flxGroupHeaderStatus.onClick = function(){
      if(scopeObj.view.flxStatusFilter.isVisible){
        scopeObj.view.flxStatusFilter.setVisibility(false);
      }else{
        scopeObj.view.flxStatusFilter.onHover = scopeObj.onDropdownHoverCallback;
        scopeObj.view.flxStatusFilter.setVisibility(true);
      }
      if(scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible){
        scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      }
      scopeObj.view.flxTypeFilter.setVisibility(false);
      scopeObj.view.flxBusinessTypeFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxGroupHeader.frame.width - scopeObj.view.flxGroupHeaderStatus.frame.x - scopeObj.view.flxGroupHeaderStatus.frame.width;
      var iconRight = scopeObj.view.flxGroupHeaderStatus.frame.width - scopeObj.view.fontIconGroupStatusFilter.frame.x;
      scopeObj.view.flxStatusFilter.right = (flxRight + iconRight - 10) +"px";
    };
    this.view.flxGroupType.onClick = function(){
      if(scopeObj.view.flxTypeFilter.isVisible){
        scopeObj.view.flxTypeFilter.setVisibility(false);
      }else{
        scopeObj.view.flxTypeFilter.onHover = scopeObj.onDropdownHoverCallback;
        scopeObj.view.flxTypeFilter.setVisibility(true);
      }
      if(scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible){
        scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      }
      scopeObj.view.flxStatusFilter.setVisibility(false);
      scopeObj.view.flxBusinessTypeFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxGroupHeader.frame.width - scopeObj.view.flxGroupType.frame.x - scopeObj.view.flxGroupType.frame.width;
      var iconRight = scopeObj.view.flxGroupType.frame.width - scopeObj.view.fontIconFilterGrpType.frame.x;
      scopeObj.view.flxTypeFilter.right = (flxRight + iconRight - 8) +"px";
    };
    this.view.flxGroupBusinessTypes.onClick = function(){
      if(scopeObj.view.flxBusinessTypeFilter.isVisible){
        scopeObj.view.flxBusinessTypeFilter.setVisibility(false);
      }else{
        scopeObj.view.flxBusinessTypeFilter.onHover = scopeObj.onDropdownHoverCallback;
        scopeObj.view.flxBusinessTypeFilter.setVisibility(true);
      }
      if(scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible){
        scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      }
      scopeObj.view.flxStatusFilter.setVisibility(false);
      scopeObj.view.flxTypeFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxGroupHeader.frame.width - scopeObj.view.flxGroupBusinessTypes.frame.x - scopeObj.view.flxGroupBusinessTypes.frame.width;
      var iconRight = scopeObj.view.flxGroupBusinessTypes.frame.width - scopeObj.view.fontIconFilterBusinessTypes.frame.x;
      scopeObj.view.flxBusinessTypeFilter.right = (flxRight + iconRight - 8) +"px";
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var data = scopeObj.filterBasedOnTypeStatus();
      scopeObj.showCustomeRolesData(data.sort(scopeObj.sortBy.sortData));
      scopeObj.view.flxGroupHeader.setVisibility(true);
      scopeObj.view.flxGroupSeparator.setVisibility(true);
      scopeObj.view.subHeader.flxSearchContainer.setVisibility(data.length > 0);
      scopeObj.view.forceLayout();
    };
    this.view.typeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.view.statusFilterMenu.segStatusFilterDropdown.onRowClick();
    };
    this.view.BusinessTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.view.statusFilterMenu.segStatusFilterDropdown.onRowClick();
    };
    this.view.lstBoxType.onSelection = function(){
      scopeObj.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.view.flxTypeError.setVisibility(false);

      scopeObj.view.switchEAgreement.selectedIndex = 1;  // switch it off on change 
      scopeObj.createRequestParam.isEAgreementActive = 0;

      scopeObj.createRequestParam.servicedefinitions = [];
      scopeObj.createRequestParam.featureactions = [];

      scopeObj.createRequestParam.typeId = scopeObj.view.lstBoxType.selectedKey;
      var typeId = scopeObj.view.lstBoxType.selectedKey !== "select" ? scopeObj.view.lstBoxType.selectedKey : null;
      if (typeof selectedEntityId === 'undefined') {
        entityChosen = entityValues[0].id;}
      else{
        entityChosen = selectedEntityId[0].id;
      }
      var allFeaturesAndActionsParam = entityChosen;
      scopeObj.presenter.fetchAllFeaturesAndActions(typeId,allFeaturesAndActionsParam);
      //using stringify as changes made to segment are indirectly reflected in global variable also
      //var featuresList = JSON.stringify(scopeObj.featuresList);
      //scopeObj.getAllFeaturesActions(featuresList);
    };
    //legal entity
    this.view.lstBoxEntity.onSelection = function(){
      scopeObj.view.lstBoxEntity.skin  = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.view.flxEntityError.setVisibility(false);

      scopeObj.view.switchEAgreement.selectedIndex = 1;  // switch it off on change 
      scopeObj.createRequestParam.isEAgreementActive = 0;

      scopeObj.createRequestParam.servicedefinitions = [];
      scopeObj.createRequestParam.featureactions = [];
      //scopeObj.createRequestParam.legalEntityId = scopeObj.view.lstBoxEntity.selectedKey;
      // var legalEntityId = scopeObj.view.lstBoxEntity.selectedKey !== "select" ? scopeObj.view.lstBoxEntity.selectedKey : null;
      // scopeObj.presenter.fetchAllFeaturesAndActions(legalEntityId);
    }
    //
    this.view.switchStatus.onSlide = function(){
      scopeObj.createRequestParam.status = scopeObj.view.switchStatus.selectedIndex === 0 ?
        scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE : scopeObj.AdminConsoleCommonUtils.constantConfig.INACTIVE;
      scopeObj.editRequestParam.status = scopeObj.view.switchStatus.selectedIndex === 0 ?
        scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE : scopeObj.AdminConsoleCommonUtils.constantConfig.INACTIVE;
      //scopeObj.hideUIBasedOnStatusSelection();
    };
    this.view.switchEAgreement.onSlide = function(){
      //changing values for backend request
      scopeObj.createRequestParam.isEAgreementActive = scopeObj.view.switchEAgreement.selectedIndex === 0 ? 1 : 0;
      scopeObj.editRequestParam.isEAgreementActive = scopeObj.view.switchEAgreement.selectedIndex === 0 ? 1 :0;
    };
    this.view.flxToggle.onClick = function(){
      scopeObj.toggleDescription();
    };
    this.view.lblDescription.onClick = function(){
      scopeObj.toggleDescription();
    };
    this.view.flxFeaturesHeader.onClick = function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblFeatures,
                                     scopeObj.view.lblLimitsFix
                                    ], scopeObj.view.lblFeatures);
      scopeObj.view.flxFeaturesHeader.info.selectedTab = 1;
      scopeObj.showGroupViewEntitlements(false); // 2179
      //scopeObj.getEntitlementsForGroup(scopeObj.getSelectedGroupId());
    };
    this.view.flxLimits.onClick = function() {
			scopeObj.tabUtilLabelFunction([scopeObj.view.lblFeatures,
                                  scopeObj.view.lblLimitsFix
                                ], scopeObj.view.lblLimitsFix);
      scopeObj.view.flxFeaturesHeader.info.selectedTab = 2;
      scopeObj.viewLimits();
    };
    this.view.flxCheckboxSelect2.onClick = function() {
      if (scopeObj.view.imgCheckBoxSelect2.src === "checkboxnormal.png") {
        scopeObj.createRequestParam.isApplicabletoAllServices = 1;
        scopeObj.view.imgCheckBoxSelect2.src = "checkboxselected.png";
      }
      else {
        scopeObj.createRequestParam.isApplicabletoAllServices = 0;
        scopeObj.view.imgCheckBoxSelect2.src = "checkboxnormal.png";
      }
    };
    this.view.flxCheckboxSelect.onClick = function() {
      scopeObj.toggleAllServiceCheckBoxes();
    };
    this.view.flxOptions.onClick = function(){
       var UpdateLegalEntities=scopeObj.getLEListForFormAction("frmGroups",'UPDATE');
       for (var i = 0; i < UpdateLegalEntities.length; i++) {
            if (UpdateLegalEntities[i].companyName.indexOf(scopeObj.view.lblSelectLegalEntity.text) === 0) {
                scopeObj.view.assignContextualMenu.flxOption2.isVisible = true;
				scopeObj.view.assignContextualMenu.flxOption1.isVisible = true;
                scopeObj.view.assignContextualMenu.contextualMenu1Inner.height="Preferred";
                scopeObj.view.assignContextualMenu.flxOption3.top="80px";
                break;
            } else {
                scopeObj.view.assignContextualMenu.flxOption2.isVisible = false;
				scopeObj.view.assignContextualMenu.flxOption1.isVisible = false; 
                scopeObj.view.assignContextualMenu.contextualMenu1Inner.height="50px";
                scopeObj.view.assignContextualMenu.flxOption3.top="10px";             
            }
        }
		
      scopeObj.view.assignContextualMenu.setVisibility(!scopeObj.view.assignContextualMenu.isVisible);
    };
    this.view.assignContextualMenu.onHover = this.onDropdownHoverCallback;
    this.view.assignContextualMenu.flxOption2.onClick = function(){
      scopeObj.showGroupDeactive();
      if(scopeObj.view.assignContextualMenu.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")){
        scopeObj.showGroupDeactive();
      }else{
        scopeObj.changeStatusOfGroup();
        scopeObj.ToggleActive();
      }
    };
    this.view.assignContextualMenu.flxOption1.onClick = function(){
      scopeObj.isFeaturesFetched = false;
      scopeObj.onEditGroupClick();
    };
    this.view.assignContextualMenu.flxOption3.onClick = function(){
      scopeObj.isFeaturesFetched = false;
      scopeObj.onCopyGroupClick();
    };
    this.view.listingSegmentClient.segListing.onHover=this.saveScreenY;
    this.view.flxMoreTypes.onHover = function(widget,context){
      scopeObj.onHoverCallBack(widget,context,scopeObj.view.flxMoreTypes.info);
    };
    this.view.flxMoreDefaultTypes.onHover = function(widget,context){
      scopeObj.onHoverCallBack(widget,context,scopeObj.view.flxMoreDefaultTypes.info);
    };
    this.view.flxDefaultInfo.onHover = scopeObj.onHoverCallBack;
  },
  delayTimer : null,
  delayedSearch : function() {
    var scopeObj = this;
    clearTimeout(scopeObj.delayTimer);
    scopeObj.delayTimer = setTimeout(function() {
      scopeObj.loadPageData();
    }, 300);
  },
  showToastMessage : function(){
    this.view.flxToastMessageSearch.isVisible =true;
    kony.timer.schedule("mytimer", this.callBackTimer, 2, false);
  },
  callBackTimer : function() 
  {
    this.view.flxToastMessageSearch.isVisible =false;
  },
  navigateBreadcrum : function(){
    if(this.view.breadcrumbs.lblCurrentScreen.text === kony.i18n.getLocalizedString("i18n.frmGroupsController.CONFIGURE"))
      this.showGroupViewEntitlements(true);
  },
  hideAll : function(){
    this.view.verticalTabs.flxOption4.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxNoGroups.setVisibility(false);
    this.view.flxAddGroups.setVisibility(false);
    this.view.flxGroupList.setVisibility(false);
    this.view.flxViewRoles.setVisibility(false);
    this.view.flxDeactivateGroup.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.assignContextualMenu.setVisibility(false);
  },
  setPreshowData : function(){
    var flxGroupListVisibility = this.view.flxGroupList.isVisible;
    var flxNoGroupsVisibility = this.view.flxNoGroups.isVisible;
    this.hideAll();
    this.advanceSelectionFlag = kony.sdk.isNullOrUndefined(kony.adminConsole.utils.clientProperties.ADVANCED_FEATURE_SELECTION)===true? "true":kony.adminConsole.utils.clientProperties.ADVANCED_FEATURE_SELECTION.toLowerCase();
    this.view.subHeader.tbxSearchBox.text = "";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    // this.view.mainHeader.lblDropdownList.skin = "sknBtnDownloadCustomerRoles";
    // this.view.mainHeader.lblDropdownList.hoverSkin = "sknBtnDownloadHover";
    this.view.lblGroupDescriptionCount.text="0/250";
    this.view.lblGroupNameCount.text="0/100";
    this.view.subHeader.lbxPageNumbers.selectedKey ="lbl1";
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.subHeader.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmGroups.Search_by_Group_Name");
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.Groups.Heading");
    this.view.verticalTabs.btnOption1.text = kony.i18n.getLocalizedString("i18n.Group.GroupDetails");
    this.view.verticalTabs.btnOption2.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.AssignFeaturesAndActions_UC");
    this.view.verticalTabs.btnOption3.text = kony.i18n.getLocalizedString("i18n.Group.ASSIGNCUSTOMERS");
    this.view.verticalTabs.btnOption3.info = {"firstClick" : true};
    this.showGroupList();
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.flxGroupList.setVisibility(flxGroupListVisibility);
    this.view.flxNoGroups.setVisibility(flxNoGroupsVisibility);
    this.view.flxNoGroupNameError.setVisibility(false);
    this.view.flxNoBusinessTypeError.setVisibility(false);
    this.view.flxNoGroupDescriptionError.setVisibility(false);
    this.view.flxStatusFilter.setVisibility(false);
    this.view.flxTypeFilter.setVisibility(false);
    this.tabUtilVerticleArrowVisibilityFunction([this.view.verticalTabs.lblSelected1,this.view.verticalTabs.lblSelected2,
   											    this.view.verticalTabs.lblSelected4],"");
    this.view.flxToastMessage.setVisibility(false);
    this.tabUtilLabelFunction([this.view.lblFeatures,
                               this.view.lblCustomersFix],this.view.lblFeatures);
    this.view.Description.rtxDescription.skin="sknlbl485C75LatoSemiBold13px";
    if(this.advanceSelectionFlag==="false"){
      this.view.btnAdvancedSelection.setVisibility(false);
      this.view.featureAndActions.btnSelection.setVisibility(false);
      this.view.featureAndActions.btnAdvancedSelection.setVisibility(false);
      this.view.featureAndActions.btnAddPermission.right="20dp";
      this.view.flxFeatureButtons.left="180dp";
    }
    this.view.forceLayout();
    this.editRequestParam = {};
    //this.currency= this.defaultCurrencyCode();// global variable to handle the currency symbol based on rqeuirement
    //When UpdateGroup permission isnt there edit and deactivate are not vsible
    if(!this.view.listingSegmentClient.contextualMenu.flxOption2.isVisible){
      this.view.listingSegmentClient.contextualMenu.flxOption3.top="10px";
    }
    if(!this.view.assignContextualMenu.flxOption1.isVisible){
      this.view.assignContextualMenu.flxOption3.top="10px";
    }
    this.view.segRoleBusinessTypes.info={"addedOrUpdatedBusinessTypes":[],"removedBusinessTypes":[]};
  },
  showAddGroupDetails : function(opt,grpName){
    this.hideAllGroups();
    this.hideAll();
    this.view.BusinessTypesToolTip.setVisibility(false);
    this.view.flxAddGroups.setVisibility(true);
    this.hideShowHeadingSeperator(false);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.verticalTabs.flxOption3.setVisibility(false);
    this.view.verticalTabs.flxOption4.setVisibility(true);
    this.view.imgCheckBoxSelect2.src = "checkboxnormal.png";
    this.tabUtilVerticleArrowVisibilityFunction([this.view.verticalTabs.lblSelected1,this.view.verticalTabs.lblSelected2,
   											    this.view.verticalTabs.lblSelected4],this.view.verticalTabs.lblSelected1);
    this.view.calValidStartDate.dateEditable = false;
    this.view.calValidEndDate.dateEditable = false;
    this.view.flxGroupDetails.setVisibility(true);
    this.view.flxDefaultType.setVisibility(false);
    this.getAccessPolicies();
    this.view.lstBoxType.setEnabled(true);
    this.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    this.view.lstBoxType.hoverSkin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    //legal entity
    this.view.lstBoxEntity.setEnabled(true);
    this.view.lstBoxEntity.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    this.view.lstBoxEntity.hoverSkin = "sknlbxBgffffffBorderc1c9ceRadius3Px";//
    this.view.flxLegalDropdown1.setVisibility(false);
    this.view.flxLegalSearch1.setVisibility(false);
    //Hiding visibility as not inplementing for now
    this.view.lblValidity.setVisibility(false);
    this.view.CopylblValidity0d9c3f33b4acc44.setVisibility(false);
    this.view.calValidEndDate.setVisibility(false);
    this.view.calValidStartDate.setVisibility(false);
    var widgetArray = [this.view.verticalTabs.btnOption1,this.view.verticalTabs.btnOption2,this.view.verticalTabs.btnOption4];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.verticalTabs.btnOption1);
    
    this.view.tbxGroupNameValue.text = "";
    this.view.txtGroupDescription.text = "";
    this.enableDisableStatusSwitch();
    if(opt === 1){ //create group
      this.view.calValidStartDate.date = null;
      this.view.calValidEndDate.date = null;
      this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GROUPS");
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.NEW");
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);  
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      this.view.listingSegmentClient.segListing.selectedIndex = null;
      this.view.listingSegmentClient.segListing.selectedRowIndex = null;
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_Group");
      this.view.btnAddGroupSave.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateRoleCAPS");
      this.view.lblEditBusinessTypeMsg.setVisibility(false);
    }
    else if(opt === 2){ //edit group
      this.view.calValidStartDate.date ="";
      this.view.calValidEndDate.date = "";
      this.view.lstBoxType.setEnabled(false);
      this.view.lstBoxType.skin = "lstBxBre1e5edR3pxBgf5f6f8Disable";
      this.view.lstBoxType.hoverSkin = "sknLstBxBre1e5edBgf5f6f813pxDisableHover";
      //legal entity
      this.view.lstBoxEntity.setEnabled(false);
      this.view.lstBoxEntity.skin = "lstBxBre1e5edR3pxBgf5f6f8Disable";
      this.view.lstBoxEntity.hoverSkin = "sknLstBxBre1e5edBgf5f6f813pxDisableHover";//
      this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GROUPS");
      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
      this.view.breadcrumbs.lblCurrentScreen.text = grpName.toUpperCase();
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Edit_Group");
      this.view.btnAddGroupSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      this.view.lblEditBusinessTypeMsg.setVisibility(true);
    }
    else if(opt === 3){ //copy group
      this.view.calValidStartDate.date ="";
      this.view.calValidEndDate.date = "";
      this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GROUPS");
      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.NEW");
      this.view.lstBoxType.setEnabled(false);
      this.view.lstBoxType.skin = "lstBxBre1e5edR3pxBgf5f6f8Disable";
      this.view.lstBoxType.hoverSkin = "sknLstBxBre1e5edBgf5f6f813pxDisableHover";
      //legal entity
      this.view.lstBoxEntity.setEnabled(false);
      this.view.lstBoxEntity.skin = "lstBxBre1e5edR3pxBgf5f6f8Disable";
      this.view.lstBoxEntity.hoverSkin = "sknLstBxBre1e5edBgf5f6f813pxDisableHover";//
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.CopyCustomerRole");
      this.view.btnAddGroupSave.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateRoleCAPS");
      this.view.lblEditBusinessTypeMsg.setVisibility(false);      
    }

  },
  showAssignFeatures : function(){
    this.hideAll();
    this.hideAllGroups();
    this.hideShowHeadingSeperator(false);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxAddGroups.setVisibility(true);
    this.view.flxGroupDetails.setVisibility(false);
    this.view.flxSelectFeatures.setVisibility(true);
    this.view.verticalTabs.flxOption4.setVisibility(true);
    this.tabUtilVerticleArrowVisibilityFunction([this.view.verticalTabs.lblSelected1,this.view.verticalTabs.lblSelected2,
   											    this.view.verticalTabs.lblSelected4],this.view.verticalTabs.lblSelected2);
    var widgetArray = [this.view.verticalTabs.btnOption1,this.view.verticalTabs.btnOption2,this.view.verticalTabs.btnOption4];
    this.tabUtilVerticleButtonFunction(widgetArray,this.view.verticalTabs.btnOption2);
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  showGroupUIChanges : function(){
   // this.hideAll();
    this.view.flxGroupList.setVisibility(true);
    this.view.mainHeader.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.subHeader.flxMenu.left = "0dp";
    this.view.subHeader.flxSearch.right = "0dp";
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
  },
    onCancelCreateEditScreen : function(){
    this.view.flxAddGroups.setVisibility(false);
    this.showGroupUIChanges();
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.Groups.Heading");
    this.view.flxStatusFilter.setVisibility(false);
    this.hideShowHeadingSeperator(true);
    this.view.forceLayout();
  },
  showGroupList : function(response){
    var scopeObj = this;
   //scopeObj.presenter.fetchLegalEntity();
  },
  
  showCustomeRolesData:function(response){
    this.setTypesDataToListBox();
    custRolesData = response;
    this.hideAll();
    this.view.flxGroupList.setVisibility(true);
    this.view.flxGroupListContainer.setVisibility(true);
    this.view.flxGroupHeader.setVisibility(true);
    this.view.flxGroupSeparator.setVisibility(true);
    this.view.lblNoRecordFound.setVisibility(false);
    this.view.mainHeader.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.subHeader.flxMenu.left = "0dp";
    this.view.subHeader.flxSearch.right = "0dp";
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    if(this.view.flxAddDynamicSegments.children.length > 0)
        this.view.flxAddDynamicSegments.removeAll();
    if(this.view.flxDynamicLimits.children.length > 0)
        this.view.flxDynamicLimits.removeAll();
    if(this.view.flxAdvanceSelectionContent.children.length > 0)
        this.view.flxAdvanceSelectionContent.removeAll();
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.forceLayout();
    this.view.flxStatusFilter.setVisibility(false);
    this.hideShowHeadingSeperator(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.Groups.Heading"); 
    var self = this;
    this.groupId = undefined ;
    var data;
    //segGroupListData
    var dataMap = {
      "Group_id": "Group_id",
      "Status_id":"Status_id",
      "flxGroupseg": "flxGroupseg",
      "flxGroupsegmain": "flxGroupsegmain",
      "flxOptions": "flxOptions",
      "flxSegMain": "flxSegMain",
      "flxDropdown": "flxDropdown",
      "fonticonArrow":"fonticonArrow",
      "flxRowBusinessTypes": "flxRowBusinessTypes",
      "flxMore": "flxMore",
      "lblMore": "lblMore",
      "flxStatus": "flxStatus",
      "fontIconGroupStatus":"fontIconGroupStatus",
      "fontIconOptions":"fontIconOptions",
      "lblGroupCustomers": "lblGroupCustomers",
      "lblGroupType": "lblGroupType",
      "lblGroupName": "lblGroupName",
      "lblGroupStatus": "lblGroupStatus",
      "lblGroupBusinessType": "lblGroupBusinessType",
      "lblSeparator": "lblSeparator",
      "Type_id": "Type_id",
      "lblDescriptionHeader":"lblDescriptionHeader",
      "lblDescriptionValue":"lblDescriptionValue",
      "isEAgreementActive": "isEAgreementActive",
      "isApplicabletoAllServices": "isApplicabletoAllServices",
      "Customers_Count":"Customers_Count",
      "segGroupList": "segGroupList"
    };
    if (typeof response !== 'undefined' || response !== null) {
      self.view.subHeader.tbxSearchBox.setEnabled(true);
      self.view.mainHeader.lblDropdownList.setEnabled(true);
      // self.view.mainHeader.lblDropdownList.skin = "sknBtnDownloadCustomerRoles";
      // self.view.mainHeader.lblDropdownList.hoverSkin = "sknBtnDownloadHover";
      if(response.length > 0){
        data=response.map(function (groupViewData) {
          var isOptionsVisible = true;
          var flxMoreVisible=false;
          var moreData=[];
          var businessTypesData="";
          var addedOrUpdatedBusinessTypes=[];
          if(groupViewData.businessTypes.length!==0){
            businessTypesData=groupViewData.businessTypes[0].name;
            addedOrUpdatedBusinessTypes.push({"id":groupViewData.businessTypes[0].id,
                                              "isDefault":(groupViewData.businessTypes[0].isDefaultGroup==="true" ||groupViewData.businessTypes[0].isDefaultGroup==="1")?"1":"0"});
            for (var i=1;i<groupViewData.businessTypes.length;i++){
              addedOrUpdatedBusinessTypes.push({"id":groupViewData.businessTypes[i].id,
                                                "isDefault":(groupViewData.businessTypes[i].isDefaultGroup==="true" ||groupViewData.businessTypes[i].isDefaultGroup==="1")?"1":"0"});
            if(businessTypesData !== undefined){
              if(businessTypesData.concat(", "+groupViewData.businessTypes[i].name).length<40)
                businessTypesData= businessTypesData.concat(", "+groupViewData.businessTypes[i].name);
              else{
                flxMoreVisible=true;
                moreData.push(groupViewData.businessTypes[i].name);
              }
            }
            }
          }
          return {
            "Group_id": groupViewData.Group_id,
            "fontIconGroupStatus":{
              "skin":(groupViewData.Status_id === self.AdminConsoleCommonUtils.constantConfig.ACTIVE)?"sknFontIconActivate":"sknfontIconInactive"
            },
            "Status_id" : groupViewData.Status_id,
            "fontIconOptions":{"text":"\ue91f"},
            "lblGroupCustomers": {
              "text": groupViewData.Customers_Count
            },
            "lblGroupType": {
              "text": groupViewData.Type_Name
            },
            "lblGroupName": {
              "text": groupViewData.Group_Name
            },
            "lblGroupStatus": (groupViewData.Status_id === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) ? {
              "text": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
              "skin": "sknlblLato5bc06cBold14px"
            }: {
              "text": kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
              "skin": "sknlblLatocacacaBold12px"
            },
            "lblGroupBusinessType": {
              "text": businessTypesData!==undefined?businessTypesData:"-",
              "info": {"addedOrUpdatedBusinessTypes":addedOrUpdatedBusinessTypes,"businessTypesData": groupViewData.businessTypes},
            },
            "lblMore":{"text":"+"+moreData.length+"more",info:groupViewData.businessTypes},
            "flxMore": {"isVisible":flxMoreVisible,
                        "onHover":function(widget,context){
                          if(moreData.length>0)
                          self.onHoverCallBack(widget,context,moreData);
                        }
                       },
            "lblSeparator": ".",
            "flxOptions": {
              "isVisible": isOptionsVisible,
              "skin":"slFbox",
              "onClick": function () {
                self.toggleContextualMenu(50);
              }
            },
            "flxDropdown": {
              "onClick":self.expandGroupRowClick
            },
            "fonticonArrow": {
              "text": "\ue922",
              "skin": "sknfontIconDescRightArrow14px"
            },
            "Type_id": groupViewData.Type_id,
            "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
            "lblDescriptionValue":{
              "text":groupViewData.Group_Desc
            },
            "isEAgreementActive" : groupViewData.isEAgreementActive === "true" ? 1 : 0,
            "isApplicabletoAllServices": groupViewData.isApplicabletoAllServices === "true" ? 1 : 0,
            "Customers_Count":groupViewData.Customers_Count,
            "template": "flxGroupseg"
          };

        });
        self.view.listingSegmentClient.segListing.setVisibility(true);
        self.view.flxGroupHeader.setVisibility(true);
        self.view.flxGroupSeparator.setVisibility(true);
        self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
        self.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
        self.view.listingSegmentClient.segListing.setData(data);
//         if(document.getElementById("frmGroups_listingSegmentClient_segListing"))
//           document.getElementById("frmGroups_listingSegmentClient_segListing").onscroll = this.contextualMenuOff;
        this.view.forceLayout();
      }else{
        self.view.subHeader.tbxSearchBox.setEnabled(false);
        self.view.mainHeader.lblDropdownList.setEnabled(false);
        // self.view.mainHeader.lblDropdownList.skin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
        // self.view.mainHeader.lblDropdownList.hoverSkin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
        var searchText = self.AdminConsoleCommonUtils.getEncodedTextInput(self.view.subHeader.tbxSearchBox.text);
        if(searchText !== ""){
          self.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + searchText + kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
        }else{
          self.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        }
        self.view.flxGroupHeader.setVisibility(false);
        self.view.flxGroupSeparator.setVisibility(false);
        self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
        self.view.listingSegmentClient.segListing.setVisibility(false);
        this.view.forceLayout();
      }
    }
    custRoleSegData = data;
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  
  contextualMenuOff: function(context) {
    var self = this;
    var newYCoordinate = this.view.listingSegmentClient.segListing.contentOffsetMeasured.y;
      if (this.view.listingSegmentClient.flxContextualMenu.isVisible) {
        if(this.segmentYCoordinate !== undefined && (this.segmentYCoordinate !== newYCoordinate)){
          this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
          var index=self.view.listingSegmentClient.segListing.selectedRowIndex;
          self.optionButtonStateChange(index[1], false);
        }
      }
    this.segmentYCoordinate = newYCoordinate;
  },
  optionButtonStateChange : function(selectedIndex,condition){
    var data = this.view.listingSegmentClient.segListing.data;
    var scopeObj = this;
    if(scopeObj.prevIndex !=-1 && (scopeObj.prevIndex < data.length)){ // check to prevent error while filter is appied
      var tempDataPrev = data[scopeObj.prevIndex];
      tempDataPrev.flxOptions.skin = "slFbox";
      scopeObj.view.listingSegmentClient.segListing.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
    scopeObj.view.listingSegmentClient.segListing.setDataAt(tempDataCurrent, selectedIndex, 0);
    scopeObj.prevIndex = selectedIndex;
  },
  toggleContextualMenu : function(rowHeight){
    var scopeObj = this;
    var UpdateLegalEntities=scopeObj.getLEListForFormAction("frmGroups",'UPDATE');
    var ModifyLegalEntities=scopeObj.getLEListForFormAction("frmGroups",'MODIFY'); 
    var index=this.view.listingSegmentClient.segListing.selectedIndex;
    for(var i=0; i<UpdateLegalEntities.length; i++){
      if(UpdateLegalEntities[i].companyName.indexOf(this.view.lblSelectLegalEntity.text) === 0){
        this.view.listingSegmentClient.contextualMenu.flxOption2.isVisible = true;
        this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible = true;
        this.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.height="Preferred"
		this.view.listingSegmentClient.contextualMenu.flxOption3.top="90px";
        break;
      }
      else{
        this.view.listingSegmentClient.contextualMenu.flxOption2.isVisible = false;
        this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible = false;
		this.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.height="50px";
		this.view.listingSegmentClient.contextualMenu.flxOption3.top="10px";
        this.view.listingSegmentClient.contextualMenu.flxOption3.isVisible=true;
      }
    }
    //for(var i=0; i<ModifyLegalEntities.length; i++){
      //if(ModifyLegalEntities[i].companyName.indexOf(this.view.lblSelectLegalEntity.text) === 0){
        //this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible = true;
        //break;
     // }
      //else{
        //this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible = false;
     // }
   // }
    this.sectionIndex=index[0];
    var rowIndex=index[1];
    var templateArray = this.view.listingSegmentClient.segListing.clonedTemplates;
    if (this.view.listingSegmentClient.flxContextualMenu.isVisible===false) {
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(true);
      this.optionButtonStateChange(index[1],true);
    }
    else{
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      this.optionButtonStateChange(index[1],false);
    }
    this.view.forceLayout();
    //to caluclate top from preffered row heights
    var finalHeight = 0;
    for(var i = 0; i < rowIndex; i++){
      finalHeight = finalHeight + templateArray[i].flxGroupseg.frame.height;
    }
    var flexLeft = this.view.listingSegmentClient.segListing.clonedTemplates[rowIndex].flxOptions.frame.x;
    var data = this.view.listingSegmentClient.segListing.data;
    if (data[rowIndex].lblGroupStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.listingSegmentClient.contextualMenu.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption4.text= "\ue91c";
    } else {
      this.view.listingSegmentClient.contextualMenu.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption4.text= "\ue931";
    }
    var segmentWidget = this.view.listingSegmentClient.segListing;
    var contextualWidget =this.view.listingSegmentClient.contextualMenu;
    finalHeight = ((finalHeight + 45)- segmentWidget.contentOffsetMeasured.y);
    
    if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
      finalHeight = finalHeight - contextualWidget.frame.height - 34;
      scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(true);
      scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "0px";
    }else{
      finalHeight = finalHeight - 13;
      scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(true);
      scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "-1px";
    }
    this.view.listingSegmentClient.flxContextualMenu.top= finalHeight + "px";
    
    if(this.view.flxStatusFilter.isVisible){
      this.view.flxStatusFilter.setVisibility(false);
    }
    kony.print(kony.i18n.getLocalizedString("i18n.frmGroupsController.called_in_form_controller"));
  },
  updateContextualMenu : function(rowIndex){
    kony.print(kony.i18n.getLocalizedString("i18n.frmGroupsController.updating_contextual_menu"));


  },
  ToggleActive : function(){
    var index = this.view.listingSegmentClient.segListing.selectedRowIndex;
    var rowIndex = index[1];
    var data = this.view.listingSegmentClient.segListing.data;
    if(data[rowIndex].lblGroupStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")){
      data[rowIndex].lblGroupStatus.text = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      data[rowIndex].lblGroupStatus.skin = "sknlblLatocacacaBold12px";
      data[rowIndex].fontIconGroupStatus.skin = "sknfontIconInactive";
    }
    else{
      data[rowIndex].lblGroupStatus.text = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      data[rowIndex].lblGroupStatus.skin = "sknlblLato5bc06cBold14px";
      data[rowIndex].fontIconGroupStatus.skin = "sknFontIconActivate";
    }
    this.view.listingSegmentClient.segListing.setDataAt(data[rowIndex], rowIndex);
    this.view.flxDeactivateGroup.setVisibility(false);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.forceLayout();
  },
  showGroupDeactive : function(){
    var self = this;
    var index = [];
    var row = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var grpName = "";
    var custCount="";
    var isDefault=false;
    if(row !== null){
      index = row[1];
      grpName= self.view.listingSegmentClient.segListing.data[index].lblGroupName.text;
      custCount=self.view.listingSegmentClient.segListing.data[index].lblGroupCustomers.text;
      isDefault=self.isDefaultForServiceDefinition(self.view.listingSegmentClient.segListing.data[index].lblGroupBusinessType.info.businessTypesData);
    }else{
      grpName = "";
    }
    if(custCount==="0" && !isDefault){
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Deactivate_Group");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.deactivate_Group_Message")+
        "\""+grpName+"\" ?";
      this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
      this.view.flxDeactivateGroup.setVisibility(true);
      //btn deactivate on click
      this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
        self.changeStatusOfGroup();
        self.ToggleActive();
        var status = self.view.listingSegmentClient.contextualMenu.lblOption4.text;
      };
    }else if(custCount!="0") {
      this.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Deactivate_Group");
      this.view.popUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Deactivate_Group_ErrorMsg1")+" \""+grpName+"\" "+ kony.i18n.getLocalizedString("i18n.frmGroupsController.Deactivate_Group_ErrorMsg2");
      this.view.popUp.flxPopUpTopColor.skin="sknFlxBge61919";
      this.view.popUp.btnPopUpCancel.skin="sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      this.view.flxErrorPopup.setVisibility(true);
    }else{
      this.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Deactivate_Group");
      this.view.popUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Deactivate_Group_ErrorMsg1")+" \""+grpName+"\" " +  kony.i18n.getLocalizedString("i18n.frmGroupsController.ErrMsg3");
      this.view.popUp.flxPopUpTopColor.skin="sknFlxBge61919";
      this.view.popUp.btnPopUpCancel.skin="sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      this.view.flxErrorPopup.setVisibility(true);
    }
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.forceLayout();
  },
  
  isDefaultForServiceDefinition : function (servicesList){
    if(!kony.sdk.isNullOrUndefined(servicesList)){
    for(var i=0; i<servicesList.length; i++){
      if(servicesList[i].isDefaultGroup==="true" || servicesList[i].isDefaultGroup==="1")
        return true;
    }
    }
    return false;
  },
  
  showGroupViewDetails : function(){
    this.hideAll();
    this.tabUtilLabelFunction([this.view.lblFeatures,this.view.lblLimitsFix], this.view.lblFeatures);
    var data =this.view.listingSegmentClient.segListing.data;
    var Index = this.view.listingSegmentClient.segListing.selectedRowIndex;
    var rowIndex = Index[1];
    var rowData = data[rowIndex];
    
    var groupId = rowData.Group_id;
    var legalEntityRegion = "";
    custRolesData.forEach(function(data){
      if(data.Group_id === groupId){
        legalEntityIdForView = data.legalEntityId;
      }
    });
    
    entityValues.forEach(function(data){
      if(data.id === legalEntityIdForView){
        legalEntityRegion = data.companyName;
      }
    });
    
    var iconSkin,statusSkin;
    var businessTypes=rowData.lblMore.info;
    var viewMoreData=[];
    var viewMoreDefault=[];
    var businessTypesData="-";
    var defaultBusinessTypes="";
    if(rowData.Status_id === this.AdminConsoleCommonUtils.constantConfig.ACTIVE){
      iconSkin = "sknFontIconActivate";
      statusSkin = "sknlblLato5bc06cBold14px";
    }else{
      iconSkin = "sknfontIconInactive";
      statusSkin = "sknlblLatocacacaBold12px";
    }
    this.view.Description.lblDescription.skin="sknlblLato5d6c7f12px";
    this.view.Description.lblDescription.hoverSkin="sknlbl485c7512pxHoverCursor";
    this.hideShowHeadingSeperator(false);
    this.view.flxViewRoles.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.lblViewGroupTypeValue.text = rowData.lblGroupType.text ||kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.breadcrumbs.lblCurrentScreen.text = (rowData.lblGroupName.text).toUpperCase();
    this.view.lblViewNameValue.text = rowData.lblGroupName.text;
    this.view.lblViewGroupTypeValue.text = rowData.lblGroupType.text || kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.lblViewAgreementValue.text = rowData.isEAgreementActive === 1 ? kony.i18n.getLocalizedString("i18n.frmGroups.Required") : kony.i18n.getLocalizedString("i18n.frmGroups.Not_Required");
    this.view.lblViewApplyToAllValue.text= rowData.isApplicabletoAllServices===1 ? kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.YES") : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.No");
    this.view.Description.rtxDescription.text = rowData.lblDescriptionValue.text;
    this.view.Description.lblToggleDescription.text = "\ue922";
    this.view.statusIcon.skin = iconSkin;
    this.view.statusValue.skin = statusSkin;
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GROUPS");
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmRolesController.View_Roles");
    this.view.statusValue.text = rowData.lblGroupStatus.text;
    if(businessTypes.length!==0){
      businessTypesData=businessTypes[0].name;
      defaultBusinessTypes= (businessTypes[0].isDefaultGroup==="true" || businessTypes[0].isDefaultGroup==="1")?businessTypes[0].name+", ":"";
      for (var i=1;i<businessTypes.length;i++){
        if(businessTypesData.concat(", "+businessTypes[i].name).length<110)
          businessTypesData= businessTypesData.concat(", "+businessTypes[i].name);
        else{
          viewMoreData.push(businessTypes[i].name);
        }
        if((businessTypes[i].isDefaultGroup==="true" || businessTypes[i].isDefaultGroup==="1")&&
           defaultBusinessTypes.concat(", "+businessTypes[i].name).length<110){
          defaultBusinessTypes= defaultBusinessTypes.concat(businessTypes[i].name+", ");
        }else if(businessTypes[i].isDefaultGroup==="true" || businessTypes[i].isDefaultGroup==="1"){
          viewMoreDefault.push(businessTypes[i].name);
        }
      }
    }
    this.view.lblViewBusinessTypesValue.text=businessTypesData;
    //this.getlstdisabled();
    this.view.lblLglEntityValue.text = legalEntityRegion;//selectedEntity[0].region;
    if(viewMoreData.length>0){
      this.view.flxMoreTypes.info=viewMoreData;
      this.view.lblMoreTypes.text="+"+viewMoreData.length+"more";
      this.view.flxMoreTypes.setVisibility(true);
    }else
      this.view.flxMoreTypes.setVisibility(false);
    this.view.lblViewGroupDefaultTypeValue.text=defaultBusinessTypes==""?"-":defaultBusinessTypes.substr(0,defaultBusinessTypes.length-2);
    if(viewMoreDefault.length>0){
      this.view.flxMoreDefaultTypes.info=viewMoreDefault;
      this.view.lblMoreDefaultTypes.text="+"+viewMoreDefault.length+"more";
      this.view.flxMoreDefaultTypes.setVisibility(true);
    }else
      this.view.flxMoreDefaultTypes.setVisibility(false);
    if (this.view.statusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.assignContextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.assignContextualMenu.lblIconOption2.text= "\ue91c";
    } else {
      this.view.assignContextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.assignContextualMenu.lblIconOption2.text= "\ue931";
    }
    this.view.flxGroupViewValidTill.setVisibility(false);
    this.view.flxFeaturesHeader.info ={"selectedTab" :1};
    this.showGroupViewEntitlements(true);
    /*this.toggleViewGroupDetailsScreenTabs(rowData.Type_id);
    if(rowData.Type_id === this.AdminConsoleCommonUtils.constantConfig.CAMPAIGN_TYPE){
      this.getCustomerInprogressList();
      this.showViewCustomers(); 
    } else {
      this.showGroupViewEntitlements();
    }*/
    this.view.forceLayout();
  },
    // LEGAL ENTITY - TO DISPLAY THE TEXT IN THE LABEL
  insertvaluetolbl: function () {
    this.view.lblSelectLegalEntity.text =
      this.view.segLegalEntity.selectedRowItems[0].Details; //inserts the selected value from the dropdown
      var region = this.view.lblSelectLegalEntity.text;
      this.view.flxLegalDropdown.setVisibility(false);
      this.view.flxLegalSearch.setVisibility(false);
      this.view.flxDropdownClick.setVisibility(false);
      this.view.subHeader.tbxSearchBox.text = "";
       selectedEntityId = entityValues.filter(function(item) {
            if (item.companyName === region) return item.id;
        });
    this.presenter.fetchCustomerGroupsWithEntity(selectedEntityId[0].id);
    
  },  
  showGroupViewEntitlements : function(isServiceCall){
    var groupId = this.getSelectedGroupId();
    // if(this.view.flxAddDynamicSegments.children.length <= 0)
    if(isServiceCall === true){  
    this.getEntitlementsForGroup(groupId);     
    }
    // this.view.flxCustomersHeader.setVisibility(false);
    this.view.flxDynamicLimits.setVisibility(false);
    this.view.flxCustRoleViewFeatures.setVisibility(true);
    this.tabUtilLabelFunction([this.view.lblFeatures,
                               this.view.lblCustomersFix],this.view.lblFeatures);
    this.view.forceLayout();
  },
  searchFilter:function(Group) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if(typeof searchText === 'string' && searchText.length >0){
      return Group.Group_Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }else{
      return true;
    }
  },
  /*
   * function to fetch the listView data of groups
   */
  getAllGroups: function () {
    var scopeObj = this;
    scopeObj.presenter.fetchCustomerGroupsWithEntity(selectedEntityId[0].id);
  },
  /*
   * function called to fetch  entitlements of particular group
   * @param : groupid
   */
  getEntitlementsForGroup: function (groupId) {
    var self = this;
    var featuresActionsGroup={
      "group_id":groupId,
      "legalEntityId":legalEntityIdForView//"GB0010001"
    };
    self.presenter.fetchFeaturesAndActionsForGroup(featuresActionsGroup);
  },
  /*
   * function called to fetch  Customers of particular group
   * @param : groupid
   */
  getCustomersOfGroup: function (groupId,isEdit) {
    var self = this;
    self.presenter.fetchCustomersOfGroup(groupId,isEdit);
  },
  storeGroupDetailsEdit : function(){
    var self = this;
    var index = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var rowIndex = index[1];
    var rowData = self.view.listingSegmentClient.segListing.data[rowIndex];
    var status = self.AdminConsoleCommonUtils.constantConfig.ACTIVE;
    var addedOrUpdatedBusinessTypes=self.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes;
    var removedBusinessTypes =self.view.segRoleBusinessTypes.info.removedBusinessTypes;
    if (self.view.switchStatus.selectedIndex === 0) {
      status = self.AdminConsoleCommonUtils.constantConfig.ACTIVE;
    } else {
      status = self.AdminConsoleCommonUtils.constantConfig.INACTIVE;
    }
    var reqParam = {
      "Group_id": rowData.Group_id,
      "Status_id": status,
      "Name": self.view.tbxGroupNameValue.text.trim(),
      "Description": self.view.txtGroupDescription.text.trim(),
      "Type_id" : self.view.lstBoxType.selectedKey,
	  "isEAgreementActive" :  self.view.flxEAgreement.isVisible ? (self.view.switchEAgreement.selectedIndex === 0 ? 1:0): 0,
      "addedOrUpdatedBusinessTypes" : addedOrUpdatedBusinessTypes,
      "removedBusinessTypes" : removedBusinessTypes,
      "User_id": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
      "removedActions": [],
      "addedOrUpdatedActions": [],
      "removedCustomerIds": [],
      "addedCustomerIds": [],
      "IsRemoveAll": false
    };
    self.editRequestParam = reqParam;
  },
  /*
   * function to get data that is set
   */
  getGroupSetData : function(){
    var self = this;
    var statusVal;
    var index = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var rowIndex = index[1];
    var rowData = self.view.listingSegmentClient.segListing.data[rowIndex];
    var groupId = rowData.Group_id;
    var legalEntityId = "";
    custRolesData.forEach(function(data){
      if(data.Group_id === groupId){
        legalEntityId = data.legalEntityId;
      }
    });
    self.editRequestParam = {
        "name": rowData.lblGroupName.text,
        "description": rowData.lblDescriptionValue.text,
        "status": rowData.Status_id,
        "typeId": rowData.Type_id,
        "servicedefinitions" : self.getServiceDefs(rowData.lblGroupBusinessType.info.businessTypesData),
        "isEAgreementActive": rowData.isEAgreementActive ? 1 : 0,
        "featureactions":[],
        "isApplicabletoAllServices": rowData.isApplicabletoAllServices,
        "legalEntityId" : legalEntityId
        //"addedOrUpdatedBusinessTypes": rowData.lblGroupBusinessType.info.addedOrUpdatedBusinessTypes,
        //"removedBusinessTypes": []
    };
    var data = {
      "Name": self.editRequestParam.name,
      "Description": self.editRequestParam.description,
      "Status": self.editRequestParam.status,
      "groupId": rowData.Group_id,
      "orginalName": rowData.lblGroupName.text,
      "Type_id": self.editRequestParam.typeId,
      "isEAgreementActive": self.editRequestParam.isEAgreementActive,
      "servicedefinitions": self.editRequestParam.servicedefinitions,
      "isApplicabletoAllServices": self.editRequestParam.isApplicabletoAllServices,
      "legalEntityId" : self.editRequestParam.legalEntityId
      //"addedOrUpdatedBusinessTypes": self.editRequestParam.addedOrUpdatedBusinessTypes
    };
    return data;
  },
  getlstdisabled: function() {
    var data = {
        "Status": "Active",
        "Customers_Count": "0",
        "Status_id": "SID_ACTIVE",
        "Type_Name": "Retail Banking",
        "isEAgreementActive": "false",
        "businessTypes": [],
        "Entitlements_Count": "0",
        "Group_id": "GROUP_SERVICE",
        "legalEntityId": "GB0010001",
        "Group_Name": "Service",
        "isApplicabletoAllServices": "false",
        "Group_Desc": "Service Desc",
        "Type_id": "TYPE_ID_RETAIL"
    }
    selectedEntity = entityValues.filter(function(item) {
        if (item.id === data.legalEntityId) return item;
    });
    regionForEdit = selectedEntity[0].companyName;
    idForEdit = selectedEntity[0].companyName;

    var listBoxData = [
        ['select', kony.i18n.getLocalizedString("i18n.frmGroups.Select_role_type")],
        ['legalEntityRegion', selectedEntity[0].companyName]
        ];
    this.view.lstBoxEntity.masterData = listBoxData;
    this.view.lstBoxEntity.selectedKey = "legalEntityRegion";
},
  //service defs for edit and copy
  getServiceDefs : function(businessTypes){
    var self = this;
    var serviceDefs =[];
    for(var i =0; i< businessTypes.length; i++){
        var obj = {"id" : businessTypes[i].id, 
                   "isDefault" : (businessTypes[i].isDefaultGroup === "true" ||businessTypes[i].isDefaultGroup === "1" ) &&  self.groupsCurrAction === self.groupActionConfig.EDIT ? "1": "0"};
        serviceDefs.push(obj);
    }
    return serviceDefs;
  },
  /*
   * function to prefill data on click of edit option
   */
  fillDataForEdit : function(data,entityCompanyName){
    var self = this;
    var statusVal = 0,eAgreement = 0;
    self.view.flxBreadCrumbs.setVisibility(true);
    self.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    self.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.GROUPS");
    self.view.tbxGroupNameValue.text = data.Name;
    self.view.txtGroupDescription.text = data.Description;
    self.view.lblGroupDescriptionCount.text = self.view.txtGroupDescription.text.length+"/250";
    self.view.lblGroupNameCount.text = self.view.tbxGroupNameValue.text.length+"/100";
    self.view.lstBoxType.selectedKey = data.Type_id;
    
    
    var listBoxData = [
        ['select', kony.i18n.getLocalizedString("i18n.frmGroups.Select_role_type")],
        ['legalEntityRegion', entityCompanyName]
        ];
    this.view.lstBoxEntity.masterData = listBoxData;
    this.view.lstBoxEntity.selectedKey = "legalEntityRegion";
    //self.view.lstBoxEntity.selectedKey = data.legalEntityId;
    //self.view.flxBusinessTypesContainer.setVisibility(true);
    self.view.imgCheckBoxSelect2.src = data.isApplicabletoAllServices === 0 ? "checkboxnormal.png" : "checkboxselected.png";
    /*if(data.Type_id===self.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      self.view.flxBusinessTypesContainer.setVisibility(true);
    }else{
      self.view.flxBusinessTypesContainer.setVisibility(false);
    }*/
    eAgreement = data.isEAgreementActive;
    statusVal = data.Status;
    if (statusVal === 0 || statusVal === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      self.view.switchStatus.selectedIndex = 0;
    } else {
      self.view.switchStatus.selectedIndex = 1;
    }
    if(eAgreement === 0){
      self.view.switchEAgreement.selectedIndex = 1;
    } else{
      self.view.switchEAgreement.selectedIndex = 0;
    }
  },
  /*
   * function called to activate/deactivate a group
   */
  changeStatusOfGroup : function(){
    var self = this;
    var index = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var rowIndex = index[1];
    var rowData = self.view.listingSegmentClient.segListing.data[rowIndex];
    var currStatus = rowData.Status_id;
    var status;
    if(currStatus === self.AdminConsoleCommonUtils.constantConfig.ACTIVE){
      status = self.AdminConsoleCommonUtils.constantConfig.INACTIVE;
    }else{
      status = self.AdminConsoleCommonUtils.constantConfig.ACTIVE;
    }
//     if (typeof selectedEntityId === 'undefined') {
//        deactivateEntityId = entityValues[0].id;
//     }
//     else{
//        deactivateEntityId = selectedEntityId[0].id;
//     }
    var leCompanyName = this.view.lblSelectLegalEntity.text;
    selectedEntityId = entityValues.filter(function(item) {
      if (item.companyName === leCompanyName) return item.id;
    });
    var reqParam = {
      "Group_id":rowData.Group_id,
      "Status_id":status,
      "User_id":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
      "legalEntityId": selectedEntityId[0].id
    };
    self.presenter.updateStatusOfCustomerGroups(reqParam);
  },
  /*
   * function called on click of download list to download the CSV file
   */  
  downloadGroupsCSV:function() {
    var scopeObj = this;
    var paramCount = 0;
    //var entityChosen = selectedEntityId[0].id;
//     if (typeof selectedEntityId === 'undefined') {
//          entityChosen = entityValues[0].id;
//      }
//     else{
//          entityChosen = selectedEntityId[0].id;
//      }
    var region = scopeObj.view.lblSelectLegalEntity.text;
    selectedEntityId = entityValues.filter(function(item) {
      if (item.companyName === region) return item.id;
    });
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/CustomerGroupsAndEntitlObjSvc/operations/Group/downloadGroupsList" ;
    var searchText= scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);
    if(searchText !== "") {
      paramCount = paramCount +1;
      downloadURL = downloadURL + "?searchText=" + searchText;
    }

    var downloadGroupsFilterJSON = scopeObj.view.mainHeader.lblDropdownList.info;

    if(downloadGroupsFilterJSON !== undefined) {
      if(downloadGroupsFilterJSON.selectedTypeList !== undefined) {
        var typeParam = paramCount > 0 ?  "&type=" : "?type=";
        downloadURL += typeParam + downloadGroupsFilterJSON.selectedTypeList;
        paramCount = paramCount +1;
      }
      if(downloadGroupsFilterJSON.selectedStatusList !== undefined) {
        var statusParam = paramCount > 0 ?  "&status=" : "?status=";
        downloadURL += statusParam + downloadGroupsFilterJSON.selectedStatusList;
      }
      var entityParam = paramCount > 0 ?  "&legalEntityId=" : "?legalEntityId=";
      downloadURL += entityParam + selectedEntityId[0].id;//downloadGroupsFilterJSON.selectedStatusList;
    }
    scopeObj.callDownloadCSVService(downloadURL,"CustomerRoles");
  },
  /*
   * function called on click of save to update edited data
   */
  callUpdate : function(reqParams,importReq){
    var self = this;
    self.presenter.updateCustomerGroups(reqParams,importReq);
  },
  /*
   * function to validate name,description in group details page
   */
  checkGroupDetailsValidation : function(){
    var self =this;
    var isValid = false;
    var groupName = self.view.tbxGroupNameValue.text.trim();
    var groupDesc = self.view.txtGroupDescription.text.trim();
	var selectedItem = self.view.lstBoxType.selectedKey;
    var businessTypesData= this.view.segRoleBusinessTypes.data;
    var busiTypeCount=0;
    if(this.view.flxBusinessTypesContainer.isVisible){
      for(var i=0;i<businessTypesData.length;i++){
        if(businessTypesData[i].imgCheckBoxSelect.src==="checkboxselected.png" || businessTypesData[i].imgCheckBoxSelect.src === "checkboxDisableBg_2x.png"){
          busiTypeCount++;
          break;
        }
      }
    }
    if(groupName === "" || groupDesc === "" || selectedItem === "select"){
      isValid = false;
      if(groupName === "") {
        self.view.tbxGroupNameValue.skin = "skntbxBordereb30173px";
        self.view.flxNoGroupNameError.setVisibility(true);
      }
      if( groupDesc === "") {
        self.view.txtGroupDescription.skin = "skinredbg";
        self.view.flxNoGroupDescriptionError.setVisibility(true);
        if(self.view.flxBusinessTypesContainer.isVisible)
        	self.view.flxAddGroupDetails.setContentOffset({x:0,y:self.view.flxDescription.frame.y});
        else
          self.view.flxAddGroupDetails.setContentOffset({x:0,y:0});
      }
	  if(selectedItem === "select"){
		self.view.lstBoxType.skin = "redListBxSkin";
		self.view.flxTypeError.setVisibility(true);
    //legal entity
    self.view.lstBoxEntity.skin = "redListBxSkin";
		self.view.flxEntityError.setVisibility(true);//
	  }
      if(self.view.flxBusinessTypesContainer.isVisible&&busiTypeCount ===0 &&  businessTypesData.length > 0){
        self.view.flxNoBusinessTypeError.setVisibility(true);
      } 
    } 
     else if(this.containSpecialChars(groupName)) {
      isValid = false;
      self.view.tbxGroupNameValue.skin = "skntbxBordereb30173px";
      self.view.lblNoGroupNameError.text = kony.i18n.getLocalizedString("kony.i18n.namespecialchar");
      self.view.flxNoGroupNameError.setVisibility(true);
    }
     else if(this.containSpecialChars(groupDesc)) {
      isValid = false;
      self.view.txtGroupDescription.skin = "skntbxBordereb30173px";
      self.view.lblNoGroupDescriptionError.text = kony.i18n.getLocalizedString("kony.i18n.descspecialchar");
     self.view.flxNoGroupDescriptionError.setVisibility(true);
    }else if(self.view.flxBusinessTypesContainer.isVisible && busiTypeCount ===0 &&  businessTypesData.length > 0){
      isValid = false;
      self.view.flxNoBusinessTypeError.setVisibility(true);
    }else if(self.view.flxBusinessTypesContainer.isVisible && businessTypesData.length === 0){
      isValid = false;
    } else {
      isValid = true;
      self.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
      self.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
	  self.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    self.view.lstBoxEntity.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      self.view.flxNoGroupNameError.setVisibility(false);
      self.view.flxNoGroupDescriptionError.setVisibility(false);
	  self.view.flxTypeError.setVisibility(false);
    //legal entity
    self.view.flxEntityError.setVisibility(false);//
      self.view.flxNoBusinessTypeError.setVisibility(false);
    }
    return isValid;
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },

 containSpecialChars: function(name){
    var regex = /[+=\\\\|<>^*%]/;  
    if(regex.test(name)){
      return true;
    }
    return false;
  },

  resetSortImages: function(context,fontIconName) {
    var self = this;    
    if (context === "grouplist") {
      self.sortIconFor('Group_Name', 'fontIconSortName');
      self.sortIconFor('Customers_Count', 'fontIconSortCustomers');
    } else if (context === "viewgroup") {
      //self.sortIconFor('Name', 'fontIconViewEntmntNameSort');
      if (this.view.fontIconViewCustNameSort.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconViewCustNameSort") {
        this.view.fontIconViewCustNameSort.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconViewCustNameSort.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
      if (this.view.fontIconViewCustUsrnameSort.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconViewCustUsrnameSort") {
        this.view.fontIconViewCustUsrnameSort.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconViewCustUsrnameSort.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
      if (this.view.fontIconViewCustMailSort.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconViewCustMailSort") {
        this.view.fontIconViewCustMailSort.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconViewCustMailSort.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
      if (this.view.fontIconCustUpdatedOnSort.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconCustUpdatedOnSort") {
        this.view.fontIconCustUpdatedOnSort.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconCustUpdatedOnSort.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
    }else if (context === "assigncust") {  //CustAssignedPage
      if (this.view.fontIconAsgCustSortName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconAsgCustSortName") {
        this.view.fontIconAsgCustSortName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconAsgCustSortName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
      if (this.view.fontIconAsgCustSortUsername.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconAsgCustSortUsername") {
        this.view.fontIconAsgCustSortUsername.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconAsgCustSortUsername.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
      if (this.view.fontIconAsgCustIdSort.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE && fontIconName !== "fontIconAsgCustIdSort") {
        this.view.fontIconAsgCustIdSort.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
        this.view.fontIconAsgCustIdSort.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
      }
    } else if(context === "assigncust_create"){ //CustAssignedPage while create
      self.sortIconFor('lblName.text', 'fontIconAsgCustSortName');
      self.sortIconFor('lblUserName.info.text', 'fontIconAsgCustSortUsername');
      self.sortIconFor('lblCustID.info.text', 'fontIconAsgCustIdSort');
    } else {}
  },
  /* commonWidgetDataMapForListBox : function(){
    var self = this;
    var dataMap = {
      "id":"id",
      "flxCheckBox":"flxCheckBox",
      "imgCheckBox":"imgCheckBox",
      "lblDescription":"lblDescription"

    };
    return dataMap;
  }, */
  /*
   * function to populates ENTITLEMENTS in listbox in advance search
   */
  /* setDataForEntitlementsListBox :function(entitlementsList){
    var self = this;
    kony.adminConsole.utils.showProgressBar(this.view);
    var widgetMap =self.commonWidgetDataMapForListBox();
    var data = entitlementsList.map(function(record){
      return{
        "id":record.id,
        "flxCheckBox":"flxCheckBox",
        "imgCheckBox":"checkbox.png",
        "lblDescription":{"text":record.Name,"tooltip":record.Name},
        "template":"flxSearchDropDown"
      };
    });

    self.view.AdvancedSearch.AdvancedSearchDropDown03.sgmentData.widgetDataMap = widgetMap;
    self.view.AdvancedSearch.AdvancedSearchDropDown03.sgmentData.setData(data);
    self.view.AdvancedSearch.AdvancedSearchDropDown03.sgmentData.info = {"data":data,"searchAndSortData":data};
    kony.adminConsole.utils.hideProgressBar(this.view);
  }, */
  /*
   * function to populates GROUPS in listbox in advance search
   */
  /* setDataForGroupsListBox : function(groupsList){
    var self = this;
    var widgetMap =self.commonWidgetDataMapForListBox();
    var data = groupsList.map(function(record){
      return{
        "id":record.Group_id,
        "flxCheckBox":"flxCheckBox",
        "imgCheckBox":"checkbox.png",
        "lblDescription":{"text":record.Group_Name,"tooltip":record.Group_Name},
        "template":"flxSearchDropDown"
      };
    });
    self.view.AdvancedSearch.AdvancedSearchDropDown12.sgmentData.widgetDataMap = widgetMap;
    self.view.AdvancedSearch.AdvancedSearchDropDown12.sgmentData.setData(data);
    self.view.AdvancedSearch.AdvancedSearchDropDown12.sgmentData.info = {"data":data,"searchAndSortData":data};
  }, */
  /* search: function(SegmentWidget, searchParameters, rtxMsg){

    //var sampleSearch=[{"searchKey":"lblRequestNumber","searchValue":scopeObj.view.RequestsSearch.tbxSearchBox.text},{	"searchKey":"lblCategory","searchValue":scopeObj.view.RequestsSearch.tbxSearchBox.text}];
    var data = SegmentWidget.info.data;
    data = data.filter(searchFilter);  
    SegmentWidget.info.searchAndSortData = data;

    if(data.length === 0){
      rtxMsg.setVisibility(true);
      SegmentWidget.setVisibility(false);
    }else{
      rtxMsg.setVisibility(false);
      SegmentWidget.setVisibility(true);

      SegmentWidget.setData(data.map(function(segmentData){
        if(SegmentWidget.info.selectedData && SegmentWidget.info.selectedData.indexOf(segmentData) > -1)
          segmentData.imgCheckBox = 'checkboxselected.png';
        else
          segmentData.imgCheckBox = 'checkbox.png';
        return segmentData;
      }));

    }

    this.view.forceLayout();

    function searchFilter(searchModel) {
      var flag = false;
      for(var i=0; i<searchParameters.length; i++){
        if(flag) break;
        else{
          if(typeof searchParameters[i].searchValue === 'string' && searchParameters[i].searchValue.length >0){
            flag = flag || (searchModel[""+searchParameters[i].searchKey].text|| "").toLowerCase().indexOf(searchParameters[i].searchValue.toLowerCase()) !== -1;
          }else{
            return true;
          }
        }
      }
      return flag;
    }
  }, */
  /*
  * function to set data to type and status filter segments
  */
  setListFiltersData: function () {
    var self = this;
    var statusList=[],typeList=[],businessTypeList=[];
    var maxSizeTypeText="", maxSizeBTypeText="",maxSizeStatusText=kony.i18n.getLocalizedString("i18n.secureimage.Active");
    for(var i=0;i<self.groupsData.length;i++){
      if(!statusList.contains(self.groupsData[i].Status_id))
        statusList.push(self.groupsData[i].Status_id);
      if(!typeList.contains(self.groupsData[i].Type_Name)){
        typeList.push(self.groupsData[i].Type_Name);
      }
      for(var j=0;j<self.groupsData[i].businessTypes.length;j++){
        if(!businessTypeList.contains(self.groupsData[i].businessTypes[j].name)){
        businessTypeList.push(self.groupsData[i].businessTypes[j].name);
      }
      }
        
    }
    var widgetMap = {
      "Status_id": "Status_id",
      "Type_id": "Type_id",
      "BusinessType_id": "BusinessType_id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){
      if(rec !== self.AdminConsoleCommonUtils.constantConfig.ACTIVE)
        maxSizeStatusText=kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": (rec === self.AdminConsoleCommonUtils.constantConfig.ACTIVE)? kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive")
      };
    });
    var typeData = typeList.map(function(rec){
      maxSizeTypeText=rec.length> maxSizeTypeText.length?rec: maxSizeTypeText;
      return {
        "Type_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    var businessTypeData = businessTypeList.map(function(rec){
     maxSizeBTypeText = rec===undefined?"undefined": rec;
      return {
        "BusinessType_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.typeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(statusData);
    self.view.typeFilterMenu.segStatusFilterDropdown.setData(typeData);
    self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.setData(businessTypeData);
    self.view.flxStatusFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeStatusText)+55+"px";
    self.view.flxTypeFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeTypeText)+55+"px";
    self.view.flxBusinessTypeFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeBTypeText)+55+"px";

    var selStatusInd = [],selTypeInd = [],selBusiTypeInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    for(var k=0;k<typeList.length;k++){
      selTypeInd.push(k);
    }
    for(var l=0;l<businessTypeList.length;l++){
      selBusiTypeInd.push(l);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selTypeInd]];
    self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selBusiTypeInd]];
    self.view.forceLayout();
  },
  /*
   * filters groups list based on selected type and status
   * @param: groups backend data
   * @return : filtered data
   */
  filterBasedOnTypeStatus : function(data){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var groupsList = data || self.groupsData;
    var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    var typeIndices = self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices;
    var businessTypeIndices= self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    selFilter[0][2] = [];
    var selStatusInd = null;
    var selTypeInd = null;
    var selBusinessTypeInd = null;
    //get selected types
      var types = "";
      selTypeInd = typeIndices ? typeIndices[0][1] : [];
      for (var i = 0; i < selTypeInd.length; i++) {
        selFilter[0][0].push(self.view.typeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].Type_id);
        types += self.view.typeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].Type_id + ",";
      }
    //get selected business types
      var businessTypes = "";
      selBusinessTypeInd = businessTypeIndices ? businessTypeIndices[0][1] : [];
      for (var i = 0; i < selBusinessTypeInd.length; i++) {
        selFilter[0][2].push(self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.data[selBusinessTypeInd[i]].BusinessType_id);
        businessTypes += self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.data[selBusinessTypeInd[i]].BusinessType_id + ",";
      }
    //get selected status
      var statuses = "";
      selStatusInd = statusIndices ? statusIndices[0][1] : [];
      for (var j = 0; j < selStatusInd.length; j++) {
        selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id);
        statuses += self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id + ",";
      }
    
      if(self.view.mainHeader.lblDropdownList.info === undefined) {
        self.view.mainHeader.lblDropdownList.info = {};
      }
      self.view.mainHeader.lblDropdownList.info.selectedTypeList = types.substring(0, types.length-1);
      self.view.mainHeader.lblDropdownList.info.selectedBusinessTypeList = businessTypes.substring(0, businessTypes.length-1);
      self.view.mainHeader.lblDropdownList.info.selectedStatusList = statuses.substring(0, statuses.length-1);
  
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0 || selFilter[0][2].length === 0) { //none selected - show no results
      dataToShow = [];
    }else if(selFilter[0][1].length==self.view.statusFilterMenu.segStatusFilterDropdown.data.length&&selFilter[0][0].length==self.view.typeFilterMenu.segStatusFilterDropdown.data.length&& selFilter[0][2].length==self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.data.length)
      dataToShow=groupsList;
    else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0 && selFilter[0][2].length>0) {//both filters selected
      dataToShow = self.filterGroupsData(groupsList,selFilter);
    } else { //single filter selected
    }
    return dataToShow;
  },
  filterGroupsData(groupsList,selFilter){
    var self=this;
    var dataToReturn= groupsList.filter(function (rec) {
      if(rec.businessTypes.length>0){//for business banking customer role
        for(var x=0;x<rec.businessTypes.length;x++){
          if(selFilter[0][2].indexOf(rec.businessTypes[x].name) >=0){
            if (selFilter[0][1].indexOf(rec.Status_id) >= 0 && selFilter[0][0].indexOf(rec.Type_Name) >= 0) {
              return rec;
            }
          }
        }
      }else if (selFilter[0][2].length==self.view.BusinessTypeFilterMenu.segStatusFilterDropdown.data.length&&selFilter[0][1].indexOf(rec.Status_id) >= 0 && selFilter[0][0].indexOf(rec.Type_Name) >= 0) {//for retail banking customer role
        return rec;
      }
    });
    return dataToReturn;
  },
  /*
   * call back function for dropdowns visibility 
   */
  onDropdownHoverCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) { //for filter dropdown
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widget.setVisibility(true);
        if(scopeObj.prevIndex !== undefined && scopeObj.prevIndex !== null) {
          scopeObj.optionButtonStateChange(scopeObj.prevIndex, true);
        }
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.setVisibility(false);
        if(scopeObj.prevIndex !== undefined && scopeObj.prevIndex !== null) {
          scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
        }
      }
    }
  },
  /*
   * set data to role type listbox in group add/edit screens
   *@param: role types data
   */
  setTypesDataToListBox : function(){
    var self = this;
    var listBoxData = [
      ['select', kony.i18n.getLocalizedString("i18n.frmGroups.Select_role_type")],
      [this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking")],
      [this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE, kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking")],
      [this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE, kony.i18n.getLocalizedString("i18n.frmGroupsController.WealthBanking")]
    ];
    self.view.lstBoxType.masterData = listBoxData;
    self.view.lstBoxType.selectedKey = "select";
  },
  /*
  * shows the service definitions box in customer role details tab based on type selection
  */
  showServiceDefBasedOnType : function(){
    var self = this;
    var selectedItem = self.view.lstBoxType.selectedKey;
    var index = this.view.listingSegmentClient.segListing.selectedRowIndex;
    var status_id = self.view.switchStatus.selectedIndex;
    self.view.verticalTabs.flxOption3.setVisibility(false);
    self.view.verticalTabs.flxOption2.setVisibility(true);
    if(selectedItem){
      // kony.adminConsole.utils.showProgressBar(self.view);
      if(selectedItem === self.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        self.view.lblBusinessTypeName.text = kony.i18n.getLocalizedString("i18n.Group.BusinessServices");
        self.view.lblApplyToServices.text = kony.i18n.getLocalizedString("i18n.Group.ApplyToOther") + self.view.lblBusinessTypeName.text;
        self.setServiceDefListBasedOnRoleType(self.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE);
        self.view.flxEAgreement.setVisibility(true);
      }else if (selectedItem === self.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) {
        self.view.lblBusinessTypeName.text = kony.i18n.getLocalizedString("i18n.Group.RetailServices");
        self.view.lblApplyToServices.text = kony.i18n.getLocalizedString("i18n.Group.ApplyToOther") + self.view.lblBusinessTypeName.text;
        self.setServiceDefListBasedOnRoleType(self.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
        self.view.flxEAgreement.setVisibility(false);
      }else if (selectedItem === this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE) {
        self.view.lblBusinessTypeName.text = "Wealth Services";
        self.view.lblApplyToServices.text = kony.i18n.getLocalizedString("i18n.Group.ApplyToOther") + self.view.lblBusinessTypeName.text;
        self.setServiceDefListBasedOnRoleType(this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE);
        self.view.flxEAgreement.setVisibility(false);
      }
    }
    self.view.flxBusinessTypesContainer.setVisibility(true);
    self.view.forceLayout();
  },
  setServiceDefListBasedOnRoleType : function( type ) {
    var serviceList = this.serviceDefinitions.filter(x => x.serviceType === type);
    this.setBusinessTypesData(serviceList);
  },
  /*
  * enables/disables the status switch in add/edit screen based on customers assigned
  */
  enableDisableStatusSwitch : function(){
    if (this.groupsCurrAction === this.groupActionConfig.CREATE || this.groupsCurrAction === this.groupActionConfig.COPY) {
      this.view.switchStatus.setEnabled(true);
      this.view.switchStatus.skin = "sknSwitchServiceManagement";
    }
    else{
      var selInd = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
      var data = this.view.listingSegmentClient.segListing.data;
      if(data[selInd].Customers_Count === "0" && !this.isDefaultForServiceDefinition(data[selInd].lblGroupBusinessType.info.businessTypesData)){
        this.view.switchStatus.setEnabled(true);
        this.view.switchStatus.skin = "sknSwitchServiceManagement";
      }
      else{
        this.view.switchStatus.setEnabled(false);
        this.view.switchStatus.skin = "sknSwitchActiveDisabled";
      }
    }
    /*var checkDeletedCust = this.checkAllCustomersRemoved();
    if(this.groupsCurrAction === this.groupActionConfig.CREATE ||
       this.groupsCurrAction === this.groupActionConfig.COPY){
      if(this.custToAdd.length === 0){
        this.view.switchStatus.setEnabled(true);
        this.view.switchStatus.skin = "sknSwitchServiceManagement"; 
      } else if(checkDeletedCust === true ){
        this.view.switchStatus.setEnabled(true);
        this.view.switchStatus.skin = "sknSwitchServiceManagement";
      } else{
        this.view.switchStatus.setEnabled(false);
        this.view.switchStatus.skin = "sknSwitchActiveDisabled";
      }
    } else if(this.groupsCurrAction === this.groupActionConfig.EDIT){
      var selInd = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
      var data = this.view.listingSegmentClient.segListing.data;
      if(data[selInd].lblGroupCustomers.text === "0" && this.custToAdd.length === 0){
        this.view.switchStatus.setEnabled(true);
        this.view.switchStatus.skin = "sknSwitchServiceManagement";
      } else if(checkDeletedCust === true){
        this.view.switchStatus.setEnabled(true);
        this.view.switchStatus.skin = "sknSwitchServiceManagement";
      } else{
        this.view.switchStatus.setEnabled(false);
        this.view.switchStatus.skin = "sknSwitchActiveDisabled";
      }
    }*/

  },
  /*
   * set all UI as needed for create group
   */
  preCreateInitialization : function(){
    var scopeObj = this;
    scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
    scopeObj.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
    scopeObj.view.flxNoGroupNameError.setVisibility(false);
    scopeObj.view.flxNoBusinessTypeError.setVisibility(false);
    scopeObj.view.flxNoGroupDescriptionError.setVisibility(false);
    scopeObj.view.lblGroupDescriptionCount.text="0/250";
    scopeObj.view.lblGroupDescriptionCount.isVisible=false;
    scopeObj.view.lblGroupNameCount.text="0/100";
    scopeObj.view.lblGroupNameCount.isVisible=false;
    scopeObj.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    scopeObj.view.flxTypeError.setVisibility(false);
    //legal entity
    scopeObj.view.lstBoxEntity.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    scopeObj.view.flxEntityError.setVisibility(false);//
    scopeObj.view.switchStatus.selectedIndex = 0;
    scopeObj.view.lstBoxType.selectedKey = "select";
    scopeObj.view.switchEAgreement.selectedIndex = 1;
    scopeObj.view.flxEAgreement.setVisibility(false);
    scopeObj.view.verticalTabs.flxOption3.setVisibility(true);
    // scopeObj.view.segAssignedCustomers.setData([]);
    // scopeObj.view.commonButtons.btnNext.setVisibility(true);
    scopeObj.view.verticalTabs.btnOption3.info.firstClick = true;
    scopeObj.view.switchStatus.skin = "sknSwitchServiceManagement";
    // scopeObj.view.flxNoFeatureError.setVisibility(false);
    scopeObj.view.flxBusinessTypesContainer.setVisibility(false);
    // scopeObj.view.flxFeaturesActionsList.top="0dp";
    scopeObj.prevSelectedFeature = [];
    // scopeObj.hideActionsList();
    scopeObj.view.forceLayout();
  },
  /**
  Check for empty
  **/
  checkForUndefined: function(value) {
    var self = this;
    var returnValue = "";
    if(value === undefined || value === "undefined") {
      return returnValue;
    } else {
      return value;
    }
  },
  hideShowHeadingSeperator : function(value){
    if(value){
      this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    } else{
      this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    }
  },
  /*
   * create search request param to fetch customers list assigned to a group
   * @return: searchrequest param json
   */
  getDefaultSearchParam : function(){
    var self =this;
    var groupId = self.getSelectedGroupId();
    var searchParam = {
      "_searchType": "GROUP_SEARCH",
      "_groupIDS": groupId,
      "_pageOffset": "0",
      "_pageSize": self.segmentRecordsSize,
      "_sortVariable": "name",
      "_sortDirection": "ASC"
    };
    return searchParam;
  },
  /*
   * get currently selected group id
   * @return: group id
   */
  getSelectedGroupId: function(){
    var self =this;
    var selRow = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var groupId ="";
    if(selRow) 
      groupId = self.view.listingSegmentClient.segListing.data[selRow[1]].Group_id;
    else
      groupId = null;
    return groupId;
  },
  /*
  * sets paginated record to cust roles view features segment
  * @param: start ind, end ind
  */
  setDynamicFeatures: function(start, end) {
    var self = this;
    var c = this.getMoreDataModel.PAGE_OFFSET;
    var flag = false;
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var features = self.view.lblFeatures.info.features;
    if(end >= features.length)
      end = features.length;
    self.setViewCustRolesFeatureSegData(start,end);
    for (var i = start; i < end; i++) {
      flag =true;
      c=c+1;
    }
    if(flag === false && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.flxCustRoleViewFeatures.setVisibility(false);
      this.view.flxNoResultMessage.setVisibility(true);
    }else if (flag === true && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.flxCustRoleViewFeatures.setVisibility(true);
      this.view.flxNoResultMessage.setVisibility(false);
    }
    self.view.forceLayout();
  },
 /*
  * set paginated record to cust roles view features segment
  * @param: start ind, end ind
  */
  setViewCustRolesFeatureSegData : function(start,end){
    var self =this;
    this.view.segViewCustRoleFeatures.widgetDataMap = this.getWidgetMapCustRoleFASeg();
    var actualData =[],segData =[];
    var featuresData = self.view.lblFeatures.info.features;
    for (var j = start; j < end; j++) {
      var rowsData = [], selRowCount =0;
      var actions = featuresData[j].actions;
      for(var i=0; i<actions.length; i++){
        rowsData.push({
          "id":actions[i].id,
          "featureId":featuresData[j].id,
          "isSelected": actions[i].isSelected,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false,
                                              "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxFeatureNameCont":{"left":"40dp"},
          "flxCheckbox":{"isVisible": false},
          "lblFeatureName":{"text": actions[i].name,
                            "tag": actions[i].accessPolicy, "left":"0px"},
          "lblIconStatus":{"text":"\ue921",
                           "skin":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
          "lblStatus":{"text":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                       kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
          "dependentActions": actions[i].dependentActions,
          "template":"flxContractEnrollFeaturesEditRow",
        });
      }
      if(rowsData.length >= 1)
        rowsData[rowsData.length -1].flxFeatureNameCont.bottom = "10dp";
      var sectionData = {
        "id": featuresData[j].id,
        "actions": featuresData[j].actions,
        "isSelected":  featuresData[j].isSelected,
        "flxHeaderContainer":{"isVisible":false},
        "flxActionsHeaderContainer":{"isVisible":false},
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "lblFeatureName": {"text":  featuresData[j].name},
        "flxToggleArrow": {"onClick": self.toggleAdvSelectionFeatureRows.bind(self,self.view.segViewCustRoleFeatures,2)},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknIcon00000015px"},
        "lblAvailableActions":{"text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon")},
        "lblCountActions":{"text": self.getTwoDigitNumber(rowsData.length)},
        "lblTotalActions":{"text":" of "+  self.getTwoDigitNumber(rowsData.length)},
        "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
        "lblActionSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
        "flxActionCheckbox":{"isVisible":false},
        "flxRight":{"isVisible":true},
        "lblIconStatus":{"text":"\ue921",
                         "skin": featuresData[j].status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblStatusValue":{"text": featuresData[j].status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "flxActionNameHeading":{"left":"40dp"},
        "lblActionName":{"text":"ACTION","left":"0px"},
        "lblActionStatus":{"text":"STATUS"},
        "template":"flxEnrollSelectedAccountsSec"
      };
      var secData = [sectionData, rowsData]
      this.view.segViewCustRoleFeatures.addSectionAt([secData], j);
    }  
    this.view.segViewCustRoleFeatures.setVisibility(true);
    this.view.flxAddDynamicSegments.setVisibility(false);
  },
  setDynamicLimitsView: function(start, end) {
    var self = this;
    var c = this.getMoreDataModel.PAGE_OFFSET;
    var flag = false;
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var limits= self.view.lblFeatures.info.limits;
    if(end >= limits.length)
      end = limits.length;
    for (var i = start; i < end; i++) {
      flag = true;
      var collapsibleSegmentToAddLimit = new com.adminConsole.common.assignLimits({
        "id": "limitRow" +c,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": "20px"
      }, {}, {});
      self.view.flxDynamicLimits.add(collapsibleSegmentToAddLimit);
      self.setLimitsData(limits[i], collapsibleSegmentToAddLimit);  
      c=c+1;
      if(i === (limits.length-1))
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    if(flag === false && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.flxDynamicLimits.setVisibility(false);
      this.view.flxNoResultMessage.setVisibility(true);
    }else if (flag === true && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.flxDynamicLimits.setVisibility(true);
      this.view.flxNoResultMessage.setVisibility(false);
    }
    self.view.forceLayout();
  },	
  toggleFeaturesonClick : function(collapsibleSegmentToAdd,eventObj){
    var parentFlexCont = this.view.flxAddDynamicSegments;
    var featureCards = parentFlexCont.widgets();
    for(var i=0; i<featureCards.length; i++){
      if(featureCards[i].id === collapsibleSegmentToAdd.id){ //toggle selected card
        if(collapsibleSegmentToAdd.flxHideDisplayContent.isVisible === true){
          collapsibleSegmentToAdd.lblToggle.text = "\ue922";
          collapsibleSegmentToAdd.flxHideDisplayContent.setVisibility(false);
        } else{
          collapsibleSegmentToAdd.lblToggle.text = "\ue915";
          collapsibleSegmentToAdd.flxHideDisplayContent.setVisibility(true);
        }
      } else{ //toggle any remaining cards
        if(featureCards[i].flxHideDisplayContent.isVisible === true){
          featureCards[i].lblToggle.text = "\ue922";
          featureCards[i].flxHideDisplayContent.setVisibility(false);
        }
        
      }
    }
  },
  setFeatureSegmentData: function(feature,collapsibleSegmentToAdd, c) {
    //kony.adminConsole.utils.hideProgressBar(this.view);
    var actions = feature.actions;
    var self = this;
    var dataMap = {
      "lblActionName" : "lblActionName",
      "lblDescription" : "lblDescription",
      //"lblView" : "lblView",
      "statusIcon": "statusIcon",
      "statusValue": "statusValue",
      "template" : "template"
    };
    var count=0;
    var data = actions.map(function (rec) {
      if(rec.limits !== undefined)
        count++;
      return {
        "lblActionName": rec.name || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblDescription": rec.description || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "statusValue": (rec.actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE) ? kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
        "statusIcon": {
          "isVisible": true,
          "text": kony.i18n.getLocalizedString("i18n.frmAlertsManagement.lblViewAlertStatusKey"),
          "skin": (rec.actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?"sknFontIconActivate":"sknfontIconInactive"
        },
        /*"lblView": {
          "text": rec.type === "MONETARY" ? kony.i18n.getLocalizedString("i18n.frmAdManagement.View") : kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "skin": rec.type === "MONETARY" ? "sknLblLatoReg117eb013px" : "sknLbl485C75LatoRegular13Px",
          "hoverSkin": rec.type === "MONETARY" ? "sknLbl117eb013pxHov" : "sknLbl485C75LatoRegular13Px",
          "onClick" :  rec.type === "MONETARY" ? function(){
            self.setViewLimits(rec.limits);
          }:undefined
        },*/
        "template": "flxActionStatus"
      };
    });
    collapsibleSegmentToAdd.SegActions.widgetDataMap = dataMap;
    collapsibleSegmentToAdd.SegActions.setData(data);
    collapsibleSegmentToAdd.lblFeatureName.text = feature.name;
    collapsibleSegmentToAdd.lblCountActions.text = self.getTwoDigitNumber(actions.length);
    collapsibleSegmentToAdd.lblTotalActions.text = "of " + self.getTwoDigitNumber(feature.totalActions);
    collapsibleSegmentToAdd.statusValue.text = (feature.status === self.activeFeatureStatus )?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    collapsibleSegmentToAdd.statusIcon.skin = (feature.status === "SID_FEATURE_ACTIVE")?"sknFontIconActivate":"sknfontIconInactive";
    collapsibleSegmentToAdd.flxToggle.hoverSkin="sknFlxPointer";
    //this.view.forceLayout();
  },
  setViewLimits : function(limits){
    var map;
    if(limits === undefined || limits === null)
      map="";
    else{
      map= limits.reduce(function(map, obj) {
        map[obj.id] = obj.value;
        return map;
      }, {});
    }
    this.view.lblMaxValue12.text = map.MAX_TRANSACTION_LIMIT=== undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currency+" "+map.MAX_TRANSACTION_LIMIT);
    this.view.lblMaxDailyLimitValue21.text = map.DAILY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currency+" "+map.DAILY_LIMIT);
    this.view.lblWeeklyLimitValue22.text = map.WEEKLY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currency+" "+map.WEEKLY_LIMIT);
    this.view.flxViewLimitsPopup.setVisibility(true);
    this.view.forceLayout();
  },
  toggleDescription : function(){
    if(this.view.flxToggleContent.isVisible){
      this.view.lblToggleDescription.text = "\ue922";
      this.view.flxToggleContent.setVisibility(false);
    }
    else{
      this.view.lblToggleDescription.text = "\ue915";
      this.view.flxToggleContent.setVisibility(true);
    }
  },
  setLimitsData: function(feature,collapsibleSegmentToAdd) {
    var actions = feature.actions;
    var self = this;
    var dataMap = {
      "lblActionName": "lblActionName",
      "tbxLimitValue1": "tbxLimitValue1",
      "tbxLimitValue2": "tbxLimitValue2",     
      "tbxLimitValue3": "tbxLimitValue3",      
      "flxLimitValue1": "flxLimitValue1",
      "flxLimitValue2": "flxLimitValue2",
      "flxLimitValue3": "flxLimitValue3",
      "lblCurrencySymbol1": "lblCurrencySymbol1",
      "lblCurrencySymbol2": "lblCurrencySymbol2",
      "lblCurrencySymbol3": "lblCurrencySymbol3",
      "template" : "template"
    };
    var data = actions.filter(function(rec) {
      if (rec.limits !== undefined) {
        return rec;
      }
    });
    data=data.map(function(rec)  { 
      var maplimits; 
      maplimits = rec.limits.reduce(function(maplimits, obj) {
        maplimits[obj.id] = obj.value;
        return maplimits;

      },{});
      return {
        "lblActionName": rec.name || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "flxLimitValue1": {
          "skin" : "flxTranspSknNormal",
        },
        "flxLimitValue2": {
          "skin" : "flxTranspSknNormal",
        },
        "flxLimitValue3": {
          "skin" : "flxTranspSknNormal",
        },
        "lblCurrencySymbol1": self.currency,
        "lblCurrencySymbol2": self.currency,
        "lblCurrencySymbol3": self.currency,
        "tbxLimitValue1": {
          "enable": false,
          "text" : maplimits.MAX_TRANSACTION_LIMIT === undefined ? kony.i18n.getLocalizedString("i18n.Applications.NA") : maplimits.MAX_TRANSACTION_LIMIT
        },
        "tbxLimitValue2": {
          "enable": false,
          "text" : maplimits.DAILY_LIMIT === undefined ? kony.i18n.getLocalizedString("i18n.Applications.NA") : maplimits.DAILY_LIMIT
        },
        "tbxLimitValue3": {
          "enable": false,
          "text" : maplimits.WEEKLY_LIMIT === undefined ? kony.i18n.getLocalizedString("i18n.Applications.NA") : maplimits.WEEKLY_LIMIT
        },
        "template": "flxActionsLimits"
      };
    });
    collapsibleSegmentToAdd.SegActionsLimits.widgetDataMap = dataMap;
    collapsibleSegmentToAdd.SegActionsLimits.setData(data);
    collapsibleSegmentToAdd.SegActionsLimits.setVisibility(true);
    collapsibleSegmentToAdd.lblFeatureName.text = feature.name;
    collapsibleSegmentToAdd.featureStatus.text = (feature.status === "SID_FEATURE_ACTIVE" )?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    collapsibleSegmentToAdd.featureStatusIcon.skin = (feature.status === "SID_FEATURE_ACTIVE")?"sknFontIconActivate":"sknfontIconInactive";
    collapsibleSegmentToAdd.flxDefaultInfo1.onHover = function(widget, context) {
      var info = "This is per transaction value for " + collapsibleSegmentToAdd.lblFeatureName.text + " submitted over the online banking channel.";
      self.onHoverCallBackForLimits(widget, context, collapsibleSegmentToAdd, info);
    };
    collapsibleSegmentToAdd.flxDefaultInfo2.onHover = function(widget, context) {
      var info = "This is daily transaction value for " + collapsibleSegmentToAdd.lblFeatureName.text + " submitted over the online banking channel.";
      self.onHoverCallBackForLimits(widget, context, collapsibleSegmentToAdd, info);
    };
    collapsibleSegmentToAdd.flxDefaultInfo3.onHover = function(widget, context) {
      var info = "This is weekly transaction value for " + collapsibleSegmentToAdd.lblFeatureName.text + " submitted over the online banking channel.";
      self.onHoverCallBackForLimits(widget, context, collapsibleSegmentToAdd, info);
    };
    //this.view.forceLayout();
  },
  onHoverCallBackForLimits :function(widget, context, segment, info) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.showOnHoverInfoForLimits(segment, widGetId, info);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.showOnHoverInfo(segment, widGetId, info);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        segment.ToolTip.setVisibility(false);
      }
    }
  },
  showOnHoverInfoForLimits: function(segment, widGetId, info) {
    var scopeObj = this;
    var leftVal = 0;
    switch (widGetId) {
        case 'flxDefaultInfo1':
            leftVal = segment.flxDefaultInfo1.parent.frame.x - 75;
            break;
        case 'flxDefaultInfo2':
            leftVal = segment.flxDefaultInfo2.parent.frame.x - 65;
            break;
        case 'flxDefaultInfo3':
            leftVal = segment.flxDefaultInfo3.parent.frame.x - 54;
            break;
    }
    segment.ToolTip.left = leftVal + "dp";
    segment.ToolTip.lblNoConcentToolTip.text = info;
//     segment.ToolTip.lblarrow.skin =  "sknfontIconDescRightArrow14px";
    segment.ToolTip.imgUpArrow.setVisibility(true);
    segment.ToolTip.lblarrow.setVisibility(false);
    segment.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
    segment.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    segment.ToolTip.setVisibility(true);
    scopeObj.view.forceLayout();
  },
  viewLimits: function() {
    this.view.flxCustRoleViewFeatures.setVisibility(false);
    this.view.flxDynamicLimits.setVisibility(true);
  },
  /*
  * on click of edit customer role
  */
  onEditGroupClick : function(){
    var scopeObj = this;
    var currentpageflow = "edit";
    scopeObj.editRequestParam = null;
    scopeObj.groupsCurrAction = scopeObj.groupActionConfig.EDIT;
    scopeObj.isFeatureSelectionPage = false;
    this.view.segBusinessTypes.setData([]);
    var groupData = scopeObj.getGroupSetData();
    var request={"group_id":groupData.groupId,"type":groupData.Type_id};
    scopeObj.view.flxBusinessTypesContainer.setVisibility(false);
    scopeObj.presenter.fetchRoleServiceDefinitions(groupData.Type_id,groupData.legalEntityId,"edit");
    scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
    scopeObj.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
    scopeObj.view.flxNoGroupNameError.setVisibility(false);
    scopeObj.view.flxNoBusinessTypeError.setVisibility(false);
    scopeObj.view.flxNoGroupDescriptionError.setVisibility(false);
    scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
    scopeObj.view.lblGroupNameCount.setVisibility(false);
    scopeObj.view.BusinessTypesToolTip.setVisibility(false);
    scopeObj.view.flxEntity.setVisibility(true);
    scopeObj.view.flxLegalEntity1.setVisibility(false);
    scopeObj.view.verticalTabs.btnOption3.info.firstClick = true;
    scopeObj.custToAdd = [];
    scopeObj.deletedCustomerId =[];
    scopeObj.selectedCustomerId = [];
    scopeObj.prevSelectedFeature = [];
    scopeObj.showAddGroupDetails(2,groupData.orginalName);
    
    // scopeObj.clearSearchBoxToDefaults();
    // scopeObj.diableWidgetActionOnError(false);
    scopeObj.view.flxViewRoles.setVisibility(false);
    var entityRegion = "";
    var entityCompanyName="";
    //scopeObj.getlstdisabled();
    entityValues.forEach(function(data){
      if(data.id === groupData.legalEntityId)
        entityRegion = data.region;
        //entityCompanyName = data.companyName;
    });
    entityCompanyName= selectedEntityId[0].companyName;
    entityIdForEdit = groupData.legalEntityId;
    
    scopeObj.fillDataForEdit(groupData,entityCompanyName);
    
    //var selectedEntityRegion = selectedEntity[0].region;
    //scopeObj.view.featureAndActions.lblEntityRegion.text = "("+entityRegion+")";
    //this.view.lblEntityDisplay.text = "("+entityRegion+")";
    scopeObj.currentFlow(currentpageflow, entityCompanyName);
    // scopeObj.view.segAssignedCustomers.selectedRowIndices = null;
    scopeObj.createRequestParam = {
      "id": groupData.groupId,
      "name": groupData.Name,
      "typeId": groupData.Type_id,
      "description": groupData.Description,
      "status": groupData.Status,
      "featureactions": [],
      "isApplicabletoAllServices": groupData.isApplicabletoAllServices,
      "servicedefinitions":[],//groupData.servicedefinitions,
      "isEAgreementActive":groupData.isEAgreementActive,
      "legalEntityId" :groupData.legalEntityId // updated payload
    };
  },
  currentFlow: function(customerRoleFlow,entityCompanyName) {
    if(customerRoleFlow){
        if(customerRoleFlow === "add"){
            regionForCreate = entityCompanyName;
            this.view.featureAndActions.lblEntityRegion.setVisibility(true);
            this.view.featureAndActions.lblEntityRegion.text = "( "+regionForCreate+" )";
            this.view.lblEntityDisplay.text = "( "+regionForCreate+" )";
        }
        if(customerRoleFlow === "edit"){
            this.view.featureAndActions.lblEntityRegion.text = "("+entityCompanyName+")";
            this.view.lblEntityDisplay.text = "("+entityCompanyName+")";
        }
    }
},

    /*
  * navigates to features tab on click of next/assign features when features already available
  */
  onNavigateToFeaturesTab : function(){
    var scopeObj =this;
    scopeObj.hideAllGroups();
    scopeObj.tabUtilVerticleArrowVisibilityFunction([scopeObj.view.verticalTabs.lblSelected1, scopeObj.view.verticalTabs.lblSelected2, scopeObj.view.verticalTabs.lblSelected4 ], scopeObj.view.verticalTabs.lblSelected2);
    var widgetArray = [scopeObj.view.verticalTabs.btnOption1, scopeObj.view.verticalTabs.btnOption2, scopeObj.view.verticalTabs.btnOption4];
    scopeObj.tabUtilVerticleButtonFunction(widgetArray, scopeObj.view.verticalTabs.btnOption2);
    if (scopeObj.isFeatureSelectionPage === true) {
      scopeObj.view.btnAddpermissions.onClick();
    } else 
      scopeObj.view.featureAndActions.btnSave.onClick();
  },
  filterRoleTypeFeaturesList : function(){
    if(this.groupsCurrAction === this.groupActionConfig.CREATE){
      var allFeaturesList = this.featuresList;
      var roleType = this.view.lstBoxType.selectedKey;
      var typeFilteredList = [];
//       if (allFeaturesList) {
          for (var i = 0; i < allFeaturesList.length; i++) {
              if (allFeaturesList[i].groupid === roleType) {
                  typeFilteredList = allFeaturesList[i].features;
                  break;
              }
          }
//       }
      typeFilteredList = allFeaturesList && allFeaturesList.length > 0 ? allFeaturesList[0].features : [];
      this.masterData = JSON.parse(JSON.stringify(typeFilteredList));
      this.setactions(typeFilteredList);
      this.initialiseFeatureActionMap(typeFilteredList);
      this.roleFeatures = typeFilteredList;
      this.selectedFeatureActionObj ={};
    }
    this.setFeaturesPageSegment();
    var data = this.setFeatureData(this.view.featureAndActions.segFeatures, this.isFeaturedataset);
    this.view.featureAndActions.segFeatures.setData(data);
    if(this.advanceSelectionFlag === "true"){
      this.view.segAdvanceSelFeatures.setData([]);
      this.settingAdvanceSelComp();//setAdvanceSelectionContent();
    }
    if (this.view.flxScrollAssignLimits.children.length > 0) this.view.flxScrollAssignLimits.removeAll();
    this.setDynamicActionsLimits();
    //this.setFeaturesSegData(typeFilteredList, false);
  },
  /*sets isSelected and retained flag for all the actions*/
  setactions: function(array) {
    var scopeObj = this;
    for (var i = 0; i < array.length; i++) {
        for (j = 0; j < array[i].actions.length; j++) {
            array[i].actions[j].isSelected = 0;
            array[i].actions[j].retained= 0;
        }
    }
  },

  getAccessPolicies: function(){
	var scopeObj=this;
    if(scopeObj.accessPolicies.length == 0){
      scopeObj.presenter.getAccessPolicies();
    }
  },
  
  containsAccesspolicy(policy){
    var scopeObj=this;
    for (var j=0;j<scopeObj.accessPolicies.length;j++){
      if(scopeObj.accessPolicies[j].name===policy)
        return true;
    }
    return false;
  },
  // featureActionMap is list of features' action policies selected or not
  initialiseFeatureActionMap:function(features){
    var scopeObj=this;
    var arr;
    for(var i=0 ;i<features.length;i++){
        arr=[]
        for (var j=0;j<scopeObj.accessPolicies.length;j++){
            arr[j]=0;
        }
        scopeObj.featureactionmap[i]=arr;
    }   
  },
  // Assign Action segment is set based on the action policies
  setFeaturesPageSegment: function() {
    var scopeObj=this;
    var dropdownWidgetMap = {
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
    };
    var dropdownSegData = scopeObj.accessPolicies.map(function(rec) {
        return {
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": {
                "src":"checkboxnormal.png",
                "onClick": function() {
                    //scopeObj.toggleCheckBox(2);
                    scopeObj.toggleCheckBox(scopeObj.view.featureAndActions.imgCheckBox,scopeObj.view.featureAndActions.segDropdown);
                }
            },
            "lblDescription": rec.name
        };
    });
    this.view.featureAndActions.segDropdown.widgetDataMap = dropdownWidgetMap;
    this.view.featureAndActions.segDropdown.setData(dropdownSegData);
    this.view.forceLayout();
  },
  toggleCheckBox: function(imgcheckbox,segmentwidget) {
    this.view.featureAndActions.flxAssignActions.setVisibility(true);
    var segData = segmentwidget.data;
    var seglength = segData.length;
    var selIndex = segmentwidget.selectedRowIndex[1];
    var rowData = segData[selIndex];
    var data=rowData;
    var count = 0;
    for (var i = 0; i < segData.length; i++) {
        if (segData[i].imgCheckBox.src === "checkboxselected.png") count = count + 1;
    }
    if (rowData.imgCheckBox.src === "checkboxnormal.png") {
        data.imgCheckBox.src = "checkboxselected.png";
        count++;
    } else {
        data.imgCheckBox.src = "checkboxnormal.png";
        count--;
    }
    segmentwidget.setDataAt(data, selIndex, 0);
    if (count === 0) {
        //this.view.featureAndActions.flxAssignActions.setVisibility(false);
        imgcheckbox.src = "checkboxnormal.png";
    } else {
        // this.view.featureAndActions.flxAssignActions.setVisibility(true);
        if (count === seglength) imgcheckbox.src = "checkboxselected.png";
        else imgcheckbox.src = "checkboxpartial.png";
    }        
    this.view.forceLayout();
  },
  setFeatureData: function(widget,flag) {
    var widgetmap = this.setWidgetdataForReviewPage();
    widget.widgetDataMap = widgetmap;
    var data = [];
    var reviewpageVisible = (widget.id==='segReview');
    var widgetdata = widget.data ;
    var flxdata = [];
    for (var i = 0; i < this.roleFeatures.length; i++) {
        var visibleflexes = 0;
        for (var rem = 0; rem < 20; rem++) {
            flxdata[rem] = {
                "isVisible": false
            }
        }
        if(this.featureactionmap.length >0){
            for (var j = 0; j < this.featureactionmap[i].length; j++) {
                if (this.featureactionmap[i][j] !== 0) {
                    flxdata[visibleflexes] = {
                        "isVisible": true,
                        "text": this.accessPolicies[j].name,
                        "value":this.featureactionmap[i][j]
                    };
                    visibleflexes++;
                }
            }
        }
        data[i] = {
            "visibleflexes": visibleflexes,
            "flxFeaturesListSelected": "flxFeaturesListSelected",
            "flxFeatureNameContainer": "flxFeatureNameContainer",
            "flxFeatureCheckbox": {
                "isVisible": reviewpageVisible === true ? false : true
            },
            "imgCheckBox": {
                "isVisible": true,
                "src": "checkboxnormal.png",
                "onClick": function() {
                    scopeObj.toggleCheckBox(scopeObj.view.featureAndActions.imgFeatureCheckbox, scopeObj.view.featureAndActions.segFeatures);
                }
            },
            "flxFeatureStatus": "flxFeatureStatus",
            "flxMain1": {
                "isVisible": true
            },
            "flxMain2": {
                "isVisible":  false
            },
            "flxMain3": {
                "isVisible": false
            },
            "flxMain4": {
                "isVisible":  false
            },
            "flxRemove1": {
                 "isVisible": (reviewpageVisible) ? ((visibleflexes === 1)? false :((visibleflexes <= 4) ? true : false)) : false,
                "onClick": scopeObj.showRemovePopup
            },
            "flxRemove2": {
                "isVisible": false,
                "onClick": scopeObj.showRemovePopup,
                "left": visibleflexes > 4 ? (visibleflexes>=6 ? "10dp" : "0dp") : "0dp",
            },
            "flxRemove3": {
                "isVisible": false,
                "onClick": scopeObj.showRemovePopup
            },
            "flxRemove4": {
                "isVisible": false,
                "onClick": scopeObj.showRemovePopup
            },
            "btnView1": {
                "isVisible": visibleflexes > 4 ? true : false,
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
                    var wid=scopeObj.view.featureAndActions.segFeatures;
                    else var wid = scopeObj.view.featureAndActions.segReview;
                     scopeObj.onclickofViewMore(wid.selectedIndex[1], wid);
                }
            },
            "btnView2": {
                "isVisible": false,
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
                    var wid=scopeObj.view.featureAndActions.segFeatures;
                    else var wid = scopeObj.view.featureAndActions.segReview;
                    scopeObj.onclickofViewLess(wid.selectedIndex[1],wid);
                }
            },
            "btnView3": {
                "isVisible": false,
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
                    var wid=scopeObj.view.featureAndActions.segFeatures;
                    else var wid = scopeObj.view.featureAndActions.segReview;
                    scopeObj.onclickofViewLess(wid.selectedIndex[1],wid);
                }
            },
            "btnView4": {
                "isVisible": false,
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
                    var wid=scopeObj.view.featureAndActions.segFeatures;
                    else var wid = scopeObj.view.featureAndActions.segReview;
                    scopeObj.onclickofViewLess(wid.selectedIndex[1],wid);
                }
            },
            "lblSeparator": "lblSeparator",
            "lblIconStatus": {
                "isVisible": true,
                "skin": (scopeObj.roleFeatures[i].status === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) ? "sknFontIconActivate" : "sknfontIconInactive",
                "text": ""
            },
            "lblFeatureStatusValue": (scopeObj.roleFeatures[i].status === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
            "flxAction1": flxdata[0],
            "flxAction2": flxdata[1],
            "flxAction3": flxdata[2],
            "flxAction4": flxdata[3],
            "flxAction5": flxdata[4],
            "flxAction6": flxdata[5],
            "flxAction7": flxdata[6],
            "flxAction8": flxdata[7],
            "flxAction9": flxdata[8],
            "flxAction10": flxdata[9],
            "flxAction11": flxdata[10],
            "flxAction12": flxdata[11],
            "flxAction13": flxdata[12],
            "flxAction14": flxdata[13],
            "flxAction15": flxdata[14],
            "flxAction16": flxdata[15],
            "flxAction17": flxdata[16],
            "flxAction18": flxdata[17],
            "flxAction19": flxdata[18],
            "flxAction20": flxdata[19],
            "lblRemove1":{
                "isVisible":true
            },
            "lblRemove2":{
                "isVisible":true
            },
            "lblRemove3":{
                "isVisible":true
            },
            "lblRemove4":{
                "isVisible":true
            },
            "lblIconRemove1":{
                "isVisible":true,
                "skin":"sknlblFontIconDelete",
                "text": "\ue91b"
            },
            "lblIconRemove2":{
                "isVisible":true,
                "skin":"sknlblFontIconDelete",
                "text": "\ue91b"
            },
            "lblIconRemove3":{
                "isVisible":true,
                "skin":"sknlblFontIconDelete",
                "text": "\ue91b"
            },
            "lblIconRemove4":{
                "isVisible":true,
                "skin":"sknlblFontIconDelete",
                "text": "\ue91b"
            },
            "lblAction1": {
                "text": flxdata[0].text
            },
            "lblAction2": {
                "text": flxdata[1].text
            },
            "lblAction3": {
                "text": flxdata[2].text
            },
            "lblAction4": {
                "text": flxdata[3].text
            },
            "lblAction5": {
                "text": flxdata[4].text
            },
            "lblAction6": {
                "text": flxdata[5].text
            },
            "lblAction7": {
                "text": flxdata[6].text
            },
            "lblAction8": {
                "text": flxdata[7].text
            },
            "lblAction9": {
                "text": flxdata[8].text
            },
            "lblAction10": {
                "text": flxdata[9].text
            },
            "lblAction11": {
                "text": flxdata[10].text
            },
            "lblAction12": {
                "text": flxdata[11].text
            },
            "lblAction13": {
                "text": flxdata[12].text
            },
            "lblAction14": {
                "text": flxdata[13].text
            },
            "lblAction15": {
                "text": flxdata[14].text
            },
            "lblAction16": {
                "text": flxdata[15].text
            },
            "lblAction17": {
                "text": flxdata[16].text
            },
            "lblAction18": {
                "text": flxdata[17].text
            },
            "lblAction19": {
                "text": flxdata[18].text
            },
            "lblAction20": {
                "text": flxdata[19].text
            },
            "fontIconCross1": {
                "isVisible": true,
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata,rowdata.lblAction1);
                }
            },
            "fontIconCross2": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction2);
                }
            },
            "fontIconCross3": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction3);
                }
            },
            "fontIconCross4": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction4);
                }
            },
            "fontIconCross5": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction5);
                }
            },
            "fontIconCross6": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction6);
                }
            },
            "fontIconCross7": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction7);
                }
            },
            "fontIconCross8": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction8);
                }
            },
            "fontIconCross9": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction9);
                }
            },
            "fontIconCross10": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction10);
                }
            },
            "fontIconCross11": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction11);
                }
            },
            "fontIconCross12": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction12);
                }
            },
            "fontIconCross13": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction13);
                }
            },
            "fontIconCross14": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction14);
                }
            },
            "fontIconCross15": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction15);
                }
            },
            "fontIconCross16": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction16);
                }
            },
            "fontIconCross17": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                    if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction17);
                }
            },
            "fontIconCross18": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction18);
                }
            },
            "fontIconCross19": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction19);
                }
            },
            "fontIconCross20": {
                "text": "",
                "skin": "sknFontIcon10pxSearchCrossD7D9E0",
                "onClick": function() {
                   if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
                    var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
                    }else{
                    var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
                    var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
                    }
                    scopeObj.onTagRemoval(rowdata, rowdata.lblAction20);
                }
            },
            "lblIcon1": {
                "isVisible": true,
                "skin": flxdata[0].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[0].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon2": {
                "isVisible": true,
                "skin": flxdata[1].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[1].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon3": {
                "isVisible": true,
                "skin": flxdata[2].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[2].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon4": {
                "isVisible": true,
                "skin": flxdata[3].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[3].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon5": {
                "isVisible": true,
                "skin": flxdata[4].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[4].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon6": {
                "isVisible": true,
                "skin": flxdata[5].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[5].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon7": {
                "isVisible": true,
                "skin": flxdata[6].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[6].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon8": {
                "isVisible": true,
                "skin": flxdata[7].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[7].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon9": {
                "isVisible": true,
                "skin": flxdata[8].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[8].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon10": {
                "isVisible": true,
                "skin": flxdata[9].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[9].value === 1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon11": {
                "isVisible": true,
                "skin": flxdata[10].value ===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[10].value ===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon12": {
                "isVisible": true,
                "skin": flxdata[11].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[11].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon13": {
                "isVisible": true,
                "skin": flxdata[12].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[12].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon14": {
                "isVisible": true,
                "skin": flxdata[13].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[13].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon15": {
                "isVisible": true,
                "skin": flxdata[14].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[14].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon16": {
                "isVisible": true,
                "skin": flxdata[15].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[15].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon17": {
                "isVisible": true,
                "skin": flxdata[16].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[16].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon18": {
                "isVisible": true,
                "skin": flxdata[17].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[17].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon19": {
                "isVisible": true,
                "skin": flxdata[18].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[18].value===1 ? "\ue9ae" : "\ue960"
            },
            "lblIcon20": {
                "isVisible": true,
                "skin": flxdata[19].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
                "text": flxdata[19].value===1 ? "\ue9ae" : "\ue960"
            },
            "flxFeatureNameContainer": "flxFeatureNameContainer",
            "lblFeatureName": scopeObj.roleFeatures[i].name,
            "template": visibleflexes > 0 ? "flxFeaturesListSelected" : "flxFeaturesList"
        };
      widgetdata[i] = data[i];
    }
    if (flag === 0) {
        flag = 1;
        if (reviewpageVisible) {
            var selecteddata = scopeObj.filteredData(data);
            return selecteddata;
        } else {
            scopeObj.setVisibilityOfSave();
           for (var i = 0; i < data.length; i++) {
                if (data[i].visibleflexes >= 1) {
                    data[i].imgCheckBox.src = "checkboxselected.png";
                } else {
                    data[i].imgCheckBox.src = "checkboxnormal.png";
                }
            }
            return data;
        }
    } else {
         if (reviewpageVisible) {
            var selecteddata = scopeObj.filteredData(widgetdata);
            return selecteddata;
        } else {
            scopeObj.setVisibilityOfSave();
            return widgetdata;
        }
    }
  },
  setWidgetdataForReviewPage :function(){
    scopeObj = this;
    var widgetMap = {
          "flxFeaturesList": "flxFeaturesList",
          "flxFeaturesListSelected": "flxFeaturesListSelected",
          "flxFeatureNameContainer": "flxFeatureNameContainer",
          "flxFeatureCheckbox":"flxFeatureCheckbox",
         "imgCheckBox":"imgCheckBox",
//          "lblCheckbox":"lblCheckbox",
          "flxFeatureStatus": "flxFeatureStatus",
          "flxMain1": "flxMain1",
          "flxMain2": "flxMain2",
          "flxMain3": "flxMain3",
          "flxMain4": "flxMain4",
          "flxRemove1":"flxRemove1",
          "flxRemove2":"flxRemove2",
          "flxRemove3":"flxRemove3",
          "flxRemove4":"flxRemove4",
          "lblRemove1": "lblRemove1",
          "lblRemove2": "lblRemove2",
          "lblRemove3": "lblRemove3",
          "lblRemove4": "lblRemove4",
          "lblIconRemove1": "lblIconRemove1",
          "lblIconRemove2": "lblIconRemove2",
          "lblIconRemove3": "lblIconRemove3",
          "lblIconRemove4": "lblIconRemove4",
          "btnView1":"btnView1",
          "btnView2":"btnView2",
          "btnView3":"btnView3",
          "btnView4":"btnView4",
          "lblSeparator": "lblSeparator",
          "lblIconStatus": "lblIconStatus",
          "lblFeatureStatusValue": "lblFeatureStatusValue",
          "flxAction1": "flxAction1",
          "flxAction2": "flxAction2",
          "flxAction3": "flxAction3",
          "flxAction4": "flxAction4",
          "flxAction5": "flxAction5",
          "flxAction6": "flxAction6",
          "flxAction7": "flxAction7",
          "flxAction8": "flxAction8",
          "flxAction9": "flxAction9",
          "flxAction10": "flxAction10",
          "flxAction11": "flxAction11",
          "flxAction12": "flxAction12",
          "flxAction13": "flxAction13",
          "flxAction14": "flxAction14",
          "flxAction15": "flxAction15",
          "flxAction16": "flxAction16",
          "flxAction17": "flxAction17",
          "flxAction18": "flxAction18",
          "flxAction19": "flxAction19",
          "flxAction20": "flxAction20",
          "lblAction1": "lblAction1",
          "lblAction2": "lblAction2",
          "lblAction3": "lblAction3",
          "lblAction4": "lblAction4",
          "lblAction5": "lblAction5",
          "lblAction6": "lblAction6",
          "lblAction7": "lblAction7",
          "lblAction8": "lblAction8",
          "lblAction9": "lblAction9",
          "lblAction10": "lblAction10",
          "lblAction11": "lblAction11",
          "lblAction12": "lblAction12",
          "lblAction13": "lblAction13",
          "lblAction14": "lblAction14",
          "lblAction15": "lblAction15",
          "lblAction16": "lblAction16",
          "lblAction17": "lblAction17",
          "lblAction18": "lblAction18",
          "lblAction19": "lblAction19",
          "lblAction20": "lblAction20",
          "fontIconCross1": "fontIconCross1",
          "fontIconCross2": "fontIconCross2",
          "fontIconCross3": "fontIconCross3",
          "fontIconCross4": "fontIconCross4",
          "fontIconCross5": "fontIconCross5",
          "fontIconCross6": "fontIconCross6",
          "fontIconCross7": "fontIconCross7",
          "fontIconCross8": "fontIconCross8",
          "fontIconCross9": "fontIconCross9",
          "fontIconCross10": "fontIconCross10",
          "fontIconCross11": "fontIconCross11",
          "fontIconCross12": "fontIconCross12",
          "fontIconCross13": "fontIconCross13",
          "fontIconCross14": "fontIconCross14",
          "fontIconCross15": "fontIconCross15",
          "fontIconCross16": "fontIconCross16",
          "fontIconCross17": "fontIconCross17",
          "fontIconCross18": "fontIconCross18",
          "fontIconCross19": "fontIconCross19",
          "fontIconCross20": "fontIconCross20",
          "lblIcon1": "lblIcon1",
          "lblIcon2": "lblIcon2",
          "lblIcon3": "lblIcon3",
          "lblIcon4": "lblIcon4",
          "lblIcon5": "lblIcon5",
          "lblIcon6": "lblIcon6",
          "lblIcon7": "lblIcon7",
          "lblIcon8": "lblIcon8",
          "lblIcon9": "lblIcon9",
          "lblIcon10": "lblIcon10",
          "lblIcon11": "lblIcon11",
          "lblIcon12": "lblIcon12",
          "lblIcon13": "lblIcon13",
          "lblIcon14": "lblIcon14",
          "lblIcon15": "lblIcon15",
          "lblIcon16": "lblIcon16",
          "lblIcon17": "lblIcon17",
          "lblIcon18": "lblIcon18",
          "lblIcon19": "lblIcon19",
          "lblIcon20": "lblIcon20",
          "flxFeatureNameContainer": "flxFeatureNameContainer",
          "lblFeatureName": "lblFeatureName"
      };
      return widgetMap;
  },
  showRemovePopup :function(){
    var scopeObj=this;
    scopeObj.view.popUpCancelEdits.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.serviceDefinition.RemoveFeature");
    scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.CustomerGroup.Disclaimer");
    scopeObj.view.popUpCancelEdits.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.serviceDefinition.REMOVE");
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.width = "116dp";
    scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.width = "80%";
    scopeObj.view.flxEditCancelConfirmation.setVisibility(true);
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.onClick=function(){
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
      scopeObj.removeFeature();
    }
    scopeObj.view.forceLayout();
  },
  removeFeature:function(){
    var scopeObj=this;
    var selIndex=scopeObj.view.featureAndActions.segReview.selectedIndex;
    var rowdata=scopeObj.view.featureAndActions.segReview.data[selIndex[1]];
    var ind=0;
    for(var i=0;i<scopeObj.roleFeatures.length;i++){
        if(scopeObj.roleFeatures[i].name === rowdata.lblFeatureName)
            ind=i;
    }         
    var len = scopeObj.featureactionmap[ind].length;
    for (var i=0;i<len;i++){
        scopeObj.featureactionmap[ind][i] = 0;
        scopeObj.setIsSelectedForActions(ind,null,0,true);
    }

    var data=scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
    scopeObj.view.featureAndActions.segReview.setData(data);
    scopeObj.createRequest();
    if (scopeObj.isFeatureActionMapEmpty() === 1) 
      scopeObj.showfeaturesPage();
  },
  onclickofViewMore: function(selIndex, widget) {
    var scopeObj = this;
    var segdata = widget.data[selIndex];
    var flxcount = segdata.visibleflexes;
    var reviewpageVisible = (widget.id==='segReview');
    segdata.flxMain2.isVisible = (flxcount > 4) ? true : false;
    segdata.flxMain3.isVisible = (flxcount > 10) ? true : false;
    segdata.flxMain4.isVisible = (flxcount > 15) ? true : false;
    segdata.btnView1.isVisible = false;
    segdata.btnView2.isVisible = (flxcount > 4 && flxcount < 10) ? true : false;
    segdata.btnView3.isVisible = (flxcount > 10 && flxcount < 15) ? true : false;
    segdata.btnView4.isVisible = (flxcount > 15 && flxcount < 20) ? true : false;
    segdata.flxRemove2.isVisible = reviewpageVisible ? ( (flxcount > 4 && flxcount < 10) ? true : false) : false;
    segdata.flxRemove3.isVisible = reviewpageVisible ? ( (flxcount > 10 && flxcount < 15) ? true : false) : false;
    segdata.flxRemove4.isVisible = reviewpageVisible ? ( (flxcount > 15 && flxcount < 20) ? true : false) : false;
    widget.setDataAt(segdata, selIndex);
  },
  onclickofViewLess: function(selIndex,widget){
    var scopeObj=this;
    var segdata = widget.data[selIndex];
    segdata.flxMain2.isVisible= false;
    segdata.flxMain3.isVisible= false;
    segdata.flxMain4.isVisible= false;
    segdata.btnView1.isVisible=true;
    widget.setDataAt(segdata,selIndex);
  },
  onTagRemoval: function(rowdata, widget) {
    var scopeObj = this;
    var policydata = scopeObj.accessPolicies;
    var index=scopeObj.getFeatureIndex(rowdata.lblFeatureName);
    if (scopeObj.view.featureAndActions.flxFeatures.isVisible){
        var wid=scopeObj.view.featureAndActions.segFeatures;
        var flag = scopeObj.isFeaturedataset;
    }else{
        var wid=scopeObj.view.featureAndActions.segReview;
        var flag= scopeObj.isReviewDataset;
    }
    var tempPolicy = [];
    for (var k = 0; k < scopeObj.roleFeatures[index].actions.length; k++) {
      for (var l = 0; l < policydata.length; l++) {
        if (tempPolicy[l] === undefined) tempPolicy[l] = 0;
        if (scopeObj.roleFeatures[index].actions[k].accessPolicy === policydata[l].name) tempPolicy[l]++;
      }
    }
    for (var i = 0; i < policydata.length; i++) {
        if (widget.text === policydata[i].name) {
            scopeObj.featureactionmap[index][i] = 0;
            var temp = [];               
            temp=scopeObj.setIsSelectedForActions(index,policydata[i].name,0,false);
            for (var k = 0; k < temp.length; k++) {
              var count = 0;
              var totalCount;
              for (var l = 0; l < scopeObj.roleFeatures[index].actions.length; l++) {
                if (scopeObj.roleFeatures[index].actions[l].isSelected === 0 && scopeObj.roleFeatures[index].actions[l].accessPolicy === temp[k]) {
                  count++;
                }
              }
              for (var l = 0; l < policydata.length; l++) {
                if (policydata[l].name === temp[k]) {
                  totalCount = tempPolicy[l];
                  if (count === totalCount) 
                    scopeObj.featureactionmap[index][l] = 0;
                  else 
                    scopeObj.featureactionmap[index][l] = 2;
                  break;
                }
              }
            }
            var data=scopeObj.setFeatureData(wid, flag);
            wid.setData(data);
        }
    }
    if(wid.id==="segReview"){
        scopeObj.createRequest();
        if(scopeObj.isFeatureActionMapEmpty() ===1)
            scopeObj.showfeaturesPage();
    }
  },
  getFeatureIndex:function(name){
    var scopeObj=this;
    for (var i=0 ;i<scopeObj.roleFeatures.length;i++){
        if(scopeObj.roleFeatures[i].name===name)
            return i;
    }
    return 0;       
  },
  setIsSelectedForActions:function(featureIndex,policyName,val,entirefeature){
    var scopeObj=this;
    if(!entirefeature){
      var dependentPolicies=[];
        for (var i = 0; i < scopeObj.roleFeatures[featureIndex].actions.length; i++) {
          if (scopeObj.roleFeatures[featureIndex].actions[i].accessPolicy === policyName) {
            scopeObj.roleFeatures[featureIndex].actions[i].isSelected = val;
            if(val===1){
              for(var j=0;j<scopeObj.roleFeatures[featureIndex].actions[i].dependentActions.length;j++){
                for (var k = 0; k < scopeObj.roleFeatures[featureIndex].actions.length; k++) {
                  if(scopeObj.roleFeatures[featureIndex].actions[i].dependentActions[j].id===scopeObj.roleFeatures[featureIndex].actions[k].id){
                    if(!dependentPolicies.contains(scopeObj.roleFeatures[featureIndex].actions[k].accessPolicy))
                      dependentPolicies.push(scopeObj.roleFeatures[featureIndex].actions[k].accessPolicy);
                    scopeObj.roleFeatures[featureIndex].actions[k].isSelected = val;
                  }
                }
              }
            }
            else if(val===0){
              for (var k = 0; k < scopeObj.roleFeatures[featureIndex].actions.length; k++) {
                for(var j=0;j<scopeObj.roleFeatures[featureIndex].actions[k].dependentActions.length;j++){
                  if(scopeObj.roleFeatures[featureIndex].actions[k].dependentActions[j].id===scopeObj.roleFeatures[featureIndex].actions[i].id){
                    if(!dependentPolicies.contains(scopeObj.roleFeatures[featureIndex].actions[k].accessPolicy))
                      dependentPolicies.push(scopeObj.roleFeatures[featureIndex].actions[k].accessPolicy);
                    scopeObj.roleFeatures[featureIndex].actions[k].isSelected = val;
                  }
                }
              }
            }
          }
        }
      return dependentPolicies;
    }else {
        for (var i = 0; i < scopeObj.roleFeatures[featureIndex].actions.length; i++) {
        scopeObj.roleFeatures[featureIndex].actions[i].isSelected = val;
        }   
    }
  },
  /*enable or disable save button in features page based on actions selected*/
  setVisibilityOfSave:function(){
    var scopeObj= this;
    if(scopeObj.isFeatureActionMapEmpty() ===1)
      scopeObj.disableBtn(scopeObj.view.featureAndActions.btnSave);
    else
      scopeObj.enableBtn(scopeObj.view.featureAndActions.btnSave);
  },
  isFeatureActionMapEmpty:function(){
    var scopeObj=this;
    if(this.featureactionmap.length === 0)
      return 1;
    for (var i = 0; i < this.featureactionmap.length; i++) {      
      for (var j = 0; j < this.accessPolicies.length ; j++) 
        if(this.featureactionmap[i][j]===1 || this.featureactionmap[i][j]===2)
          return 0;
    }
    return 1;
  },
  disableBtn: function(widget){
      widget.setEnabled(false);
      widget.skin="sknBtnDisable7B7B7Brad20px";
  },

  enableBtn:function(widget){
      widget.setEnabled(true);
      widget.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
  },
  clearSelection: function(data){
    var scopeObj=this;
    data = data.map(function(rec){
        rec.imgCheckBox.src="checkboxnormal.png";
        return rec;
    });
    scopeObj.view.featureAndActions.imgCheckBox.src="checkboxnormal.png";
    scopeObj.view.featureAndActions.segDropdown.setData(data);
  },
  selectAllSegmentData: function(checkboxwidget,segwidget) {
    this.view.featureAndActions.flxAssignActions.setVisibility(true);
    var scopeObj = this;
    var segData = segwidget.data;
    var seglength = segData.length;

    if (checkboxwidget.src === "checkboxnormal.png") {
      //  this.view.featureAndActions.flxAssignActions.setVisibility(true);
      for (var cnt = 0; cnt < seglength; cnt++) {
        segData[cnt].imgCheckBox =  {
          "src": "checkboxselected.png",
          "onClick": function() {
            scopeObj.toggleCheckBox(checkboxwidget,segwidget);
          }
        };
      }
      checkboxwidget.src = "checkboxselected.png";
    } else {
      //  this.view.featureAndActions.flxAssignActions.setVisibility(false);
      for (var cnt = 0; cnt < seglength; cnt++) {
        segData[cnt].imgCheckBox = {
          "src": "checkboxnormal.png",
          "onClick": function() {
            scopeObj.toggleCheckBox(checkboxwidget,segwidget);
          }
        };
      }
      checkboxwidget.src = "checkboxnormal.png";
    }
    segwidget.setData(segData);
    this.view.forceLayout();
  },
  getSelectedData:  function(widget) {
    var data = widget.data;
    var selData=[]
    selData = data.filter(function(rec){
        if (rec.imgCheckBox.src==="checkboxselected.png")
            return rec;
    });
    
    selData.data = data.filter(function(rec){
        if (rec.imgCheckBox.src==="checkboxselected.png")
            return rec;
    });
    return selData;
  },
  hideAllGroups : function(){
    this.view.flxAddGroups.setVisibility(true);   
    this.view.flxGroupDetails.setVisibility(false);
    this.view.flxSelectFeatures.setVisibility(false);
    this.view.flxFeatureComponent.setVisibility(false);
    this.view.flxAdvancedSelectionComponent.setVisibility(false);
    this.view.flxAssignLimitsComponent.setVisibility(false);
  },
  /*this sets featureactionmap */
  setFeatureactionMapping:function(){
    var scopeObj=this;
    var policydata = scopeObj.view.featureAndActions.segDropdown.data;
    var featuredata = scopeObj.view.featureAndActions.segFeatures.data;
    var arr ;
    var ind;
    for ( var i = 0 ;i<featuredata.length;i++){
        ind = scopeObj.getindexForFeature(featuredata[i].lblFeatureName);
         if(ind !== -1){
          if(featuredata[i].template==="flxFeaturesList"){
            arr =[];
            var tempPolicy=[];
            for(var k=0;k<scopeObj.roleFeatures[i].actions.length;k++){
              for (var l=0;l<policydata.length;l++){
                if(tempPolicy[l]===undefined)
                    tempPolicy[l]=0;
                if(scopeObj.roleFeatures[i].actions[k].accessPolicy===policydata[l].lblDescription)
                  tempPolicy[l]++;
              }
            }
              
            for (var j=0;j<policydata.length;j++){
              var temp=[];
              if (featuredata[i].imgCheckBox.src==="checkboxselected.png" && policydata[j].imgCheckBox.src==="checkboxselected.png"  && scopeObj.isActionApplicable(ind,policydata[j].lblDescription)){               
                arr[j]=1
                temp=scopeObj.setIsSelectedForActions(ind,policydata[j].lblDescription,1,false);  
                for(var k=0;k<temp.length;k++){
                  var count=0;
                  var totalCount;
                  for (var l=0;l<scopeObj.roleFeatures[i].actions.length;l++){
                    if(scopeObj.roleFeatures[i].actions[l].isSelected===1 && scopeObj.roleFeatures[i].actions[l].accessPolicy===temp[k]){
                      count++;
                    }
                  }
                  for (var l=0;l<policydata.length;l++){
                    if(policydata[l].lblDescription===temp[k]){
                      totalCount=tempPolicy[l];
                      if(count===totalCount)
                        arr[l]=1;
                      else
                        arr[l]=2;
                      break;
                    }
                  }     
                }
              }else if(arr[j]===undefined)
                arr[j]=0
            }
          }else{
            arr =this.featureactionmap[ind];
            var tempPolicy=[];
            for(var k=0;k<scopeObj.roleFeatures[i].actions.length;k++){
              for (var l=0;l<policydata.length;l++){
                if(tempPolicy[l]===undefined)
                    tempPolicy[l]=0;
                if(scopeObj.roleFeatures[i].actions[k].accessPolicy===policydata[l].lblDescription)
                  tempPolicy[l]++;
              }
            }
            for (var j=0;j<policydata.length;j++){
              if (featuredata[i].imgCheckBox.src==="checkboxselected.png" && policydata[j].imgCheckBox.src==="checkboxselected.png"  && scopeObj.isActionApplicable(ind,policydata[j].lblDescription)){
                    arr[j]=1
                    temp=scopeObj.setIsSelectedForActions(ind,policydata[j].lblDescription,1,false);  
                    for(var k=0;k<temp.length;k++){
                      var count=0;
                      var totalCount;
                      for (var l=0;l<scopeObj.roleFeatures[i].actions.length;l++){
                        if(scopeObj.roleFeatures[i].actions[l].isSelected===1 && scopeObj.roleFeatures[i].actions[l].accessPolicy===temp[k]){
                          count++;
                        }
                      }
                      for (var l=0;l<policydata.length;l++){
                        if(policydata[l].lblDescription===temp[k]){
                          totalCount=tempPolicy[l];
                          if(count===totalCount)
                            arr[l]=1;
                          else
                            arr[l]=2;
                          break;
                        }
                      }     
                    }
                }
            }
          }
         this.featureactionmap[ind]=arr;
        }
    }
  },
  getindexForFeature:function(featureName){
    for(var i=0;i<scopeObj.roleFeatures.length;i++){
        if(scopeObj.roleFeatures[i].name === featureName)
            return i;
    }
    return -1;
  },
  isActionApplicable: function(index,policyName){
    for(var i=0;i<scopeObj.roleFeatures[index].actions.length;i++){
        if(scopeObj.roleFeatures[index].actions[i].accessPolicy===policyName)
            return true;
    }
    return false;
  },
  showReviewPage: function(data) {
    var scopeObj = this;
    scopeObj.hideAllGroups();
    var selecteddata = scopeObj.filteredData(data);
    selecteddata = selecteddata.map(function(rec){
        rec.flxFeatureCheckbox.isVisible=false;
        return rec;
    });
    scopeObj.tabUtilVerticleArrowVisibilityFunction([this.view.verticalTabs.lblSelected1, this.view.verticalTabs.lblSelected2,
      this.view.verticalTabs.lblSelected4
    ], this.view.verticalTabs.lblSelected2);
    var widgetArray = [this.view.verticalTabs.btnOption1, this.view.verticalTabs.btnOption2, this.view.verticalTabs.btnOption4];
    scopeObj.tabUtilVerticleButtonFunction(widgetArray, this.view.verticalTabs.btnOption2);
    scopeObj.view.featureAndActions.flxFeatures.setVisibility(false);
    scopeObj.view.featureAndActions.flxReview.setVisibility(true);
    scopeObj.view.flxFeatureComponent.setVisibility(true);
    scopeObj.view.featureAndActions.segReview.widgetDataMap = scopeObj.setWidgetdataForReviewPage();
    scopeObj.view.featureAndActions.segReview.setData(selecteddata);
    scopeObj.isReviewDataset = 1;
    scopeObj.view.featureAndActions.commonButtons.btnSave.setVisibility(true);
    if(scopeObj.groupsCurrAction=== scopeObj.groupActionConfig.EDIT){
      scopeObj.view.featureAndActions.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
      scopeObj.view.btnCreate.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Updaterole_UC");
    }else {
      scopeObj.view.featureAndActions.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateRoleCAPS");
      scopeObj.view.btnCreate.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateRoleCAPS");
    }
    scopeObj.view.forceLayout();
  },
  filteredData:function(data){
    var selecteddata = data.filter(function(rec) {
        if (rec.visibleflexes !== undefined && rec.visibleflexes > 0) {
            return rec;
        }
    });
    return selecteddata;
  },
  showAdvanceSelectionUI: function() {
    this.hideAllGroups();
    this.view.tbxSearchBox1.text = "";
    this.view.flxAdvancedSelectionComponent.setVisibility(true);
    this.view.flxAdvSelectionSegCont.setVisibility(true);
    var screenWidth = kony.os.deviceInfo().screenWidth;
    this.view.flxClearSearchImage1.onClick();
    if(this.view.segAdvanceSelFeatures.data.length > 0)
      this.updateAdvSelFeaturesData();
    
    this.view.forceLayout();
  },
  settingAdvanceSelComp: function() {
    this.getMoreDataModelAdvSel = {
        "PAGE_OFFSET": 0
    };
    document.getElementById("frmGroups_flxAdvSelectionSegCont").onscroll = this.appendMoreRecordsReachingEndAdvSel;
    this.setAdvanceSelectionContent(0, 10, false);
    this.getMoreDataModelAdvSel.PAGE_OFFSET = 10;
  },
  appendMoreRecordsReachingEndAdvSel: function(context) {
      var self = this;
      var offsetHeight = Math.ceil(context.currentTarget.offsetHeight);
      var scrollTop = Math.ceil(context.currentTarget.scrollTop);
      var scrollHeight = Math.ceil(context.currentTarget.scrollHeight);
      if (offsetHeight + scrollTop === scrollHeight) {
        var isSearch = self.view.tbxSearchBox1.text.length >  0;
        var featuresData = isSearch === false ? self.roleFeatures : self.view.segAdvanceSelFeatures.info.searchResult;
          if (self.getMoreDataModelAdvSel.PAGE_OFFSET < featuresData.length) {
              //kony.adminConsole.utils.showProgressBar(self.view);
              self.setAdvanceSelectionContent(self.getMoreDataModelAdvSel.PAGE_OFFSET, self.getMoreDataModelAdvSel.PAGE_OFFSET + 10, isSearch);
              self.getMoreDataModelAdvSel.PAGE_OFFSET = self.getMoreDataModelAdvSel.PAGE_OFFSET + 10;
          }
      }
  },
  /*
  * set paginated record to features advance selection segment
  * @param: start index, end index, isSearch(true/false)
  */
  setAdvanceSelectionContent: function(start, end, isSearch) {
    var featuresData = isSearch === false ? this.roleFeatures : this.view.segAdvanceSelFeatures.info.searchResult;
    if (end > featuresData.length) {
        end = featuresData.length;
    }
    var actualData =[],featuresList=[];
    this.view.segAdvanceSelFeatures.widgetDataMap = this.getWidgetMapCustRoleFASeg();
    for (var j = start; j < end; j++) {
      var rowsData = this.getMappedAdvSelFeatureActionData(featuresData[j]);
      this.view.segAdvanceSelFeatures.addSectionAt([rowsData], j);
    }
    this.view.forceLayout();
  },
  /*
  * widget data map for features actions listing segment
  * @return : seg widgetDataMap json
  */
  getWidgetMapCustRoleFASeg : function(){
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
      //"imgActionHeaderCheckbox":"imgActionHeaderCheckbox",
      "lblActionHeaderCheckbox":"lblActionHeaderCheckbox",
      "flxActionCheckbox":"flxActionCheckbox",
      "lblActionSeperator":"lblActionSeperator",
      //row template
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "flxFeatureNameCont":"flxFeatureNameCont",
      "flxStatus":"flxStatus",
      "lblStatus":"lblStatus",
      "flxCheckbox":"flxCheckbox",
      //"imgCheckbox":"imgCheckbox",
      "lblCheckbox":"lblCheckbox",
      "lblSeperator":"lblSeperator",
      "id":"id",
      "actions":"actions",
      "isEnabled":"isEnabled",
      
      };
    return widgetMap;
  },
  /*
  * map feature data to segment row
  * @param: feature data obj
  * @return: mapped feature row( [section data,rows arr])
  */
  getMappedAdvSelFeatureActionData : function(featureData){
    var self =this;
    var rowsData =[],actualData=[], selRowCount = 0;
    var actions = featureData.actions;
    for(var i=0; i<actions.length; i++){
      rowsData.push({
        "id":actions[i].id,
        "featureId":featureData.id,
        "isSelected": actions[i].isSelected,
        "flxContractEnrollFeaturesEditRow":{"isVisible":true,
                                            "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
        "flxFeatureNameCont":{"left":"40dp"},
        "flxCheckbox":{ "onClick":self.onCheckFeatureCheckbox.bind(self,self.view.segAdvanceSelFeatures,false)},
        //"imgCheckbox":{"src": (actions[i].isSelected === 1) ? self.AdminConsoleCommonUtils.checkboxSelected : self.AdminConsoleCommonUtils.checkboxnormal},
        "lblCheckbox":{
          "isVisible":true,"text":(actions[i].isSelected === 1) ? self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl,
         },
        "lblFeatureName":{"text": actions[i].name,
                          "tag": actions[i].accessPolicy},
        "lblIconStatus":{"text":"\ue921",
                         "skin":actions[i].status === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblStatus":{"text":actions[i].status === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                     kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "dependentActions": actions[i].dependentActions,
        "template":"flxContractEnrollFeaturesEditRow",
      });
      if(actions[i].isSelected === 1){
        selRowCount = selRowCount +1;
      }
    }
    if(rowsData.length >= 1){
      rowsData[rowsData.length -1].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
      rowsData[rowsData.length -1].flxFeatureNameCont.bottom = "10dp";
    }
    
    var sectionData = {
      "id": featureData.id,
      "actions": featureData.actions,
      "isSelected":  featureData.isSelected,
      "flxHeaderContainer":{"isVisible":false},
      "flxActionsHeaderContainer":{"isVisible":true},
      "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound"},
      "lblFeatureName": {"text":  featureData.name},
      "flxToggleArrow": {"onClick": self.toggleAdvSelectionFeatureRows.bind(self,self.view.segAdvanceSelFeatures,1)},
      "lblIconToggleArrow":{"text":"\ue915","skin":"sknIcon00000014px"},
      "lblAvailableActions":{"text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon")},
      "lblCountActions":{"text": self.getTwoDigitNumber(selRowCount)},
      "lblTotalActions":{"text":" of "+  self.getTwoDigitNumber(rowsData.length)},
      "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
      "lblActionSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
     // "imgActionHeaderCheckbox":{"src": self.getHeaderCheckboxImage(rowsData,true,true)},
      "lblActionHeaderCheckbox":{"text":self.getHeaderCheckboxImage(rowsData,true,true)},
      "flxActionCheckbox":{"onClick":self.onCheckFeatureCheckbox.bind(self,self.view.segAdvanceSelFeatures,true),
                            "isVisible":true},
      "flxRight":{"isVisible":true},
      "lblIconStatus":{"text":"\ue921",
                       "skin": featureData.status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
      "lblStatusValue":{"text": featureData.status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                        kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
      "flxActionNameHeading":{"left":"40dp"},
      "lblActionName":{"text":"ACTION"},
      "lblActionStatus":{"text":"STATUS"},
      "template":"flxEnrollSelectedAccountsSec"
    };
    actualData[featureData.featureId] = {"sectionData":sectionData,"rowData":rowsData};
    return [sectionData,rowsData];
  },
   applyCheckboxSkin : function(lblPath){
    var skinVal = (lblPath.text== this.AdminConsoleCommonUtils.checkboxnormallbl)?"sknBgB7B7B7Sz20pxCheckbox": "sknIconBg0066CASz20pxCheckbox" ;
    return skinVal;
  },
  /*
  * expand/collapse the selected feature actions card
  * @param: segment wid ref
  */
  toggleAdvSelectionFeatureRows : function(segmentPath,category,context){
    var selSecInd = context.rowContext ? context.rowContext.sectionIndex : -1;
    var selRowInd = context.rowContext ? context.rowContext.rowIndex: -1;
    var segData = segmentPath.data;
    if(category === 2){
      for(var i=0; i<segData.length; i++){
        if(selSecInd !== i){ //collapse
           if(segData[i][0].lblIconToggleArrow.skin === "sknIcon00000014px"){
            segData[i][0] = this.getCollapsedSectionProperties(segData[i][0]);
            segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
            segmentPath.setSectionAt(segData[i], i);
          }
        }
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
    segmentPath.setSectionAt(segData[selSecInd], selSecInd);
    
  },
  /* 
   *set collapsed section properties
   *@param: selected card section data
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
  * set segment rows visibility
  * @params: rows array, visibility - true/false
  * @return: updated rows data with visibilty
  */
  showHideSegRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
      if(visibility === true && (i === rowsData.length-1)){
        rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";    
      } else{
        rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"; 
      }
    }
    return rowsData;
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
      var img = (segSecData.lblActionHeaderCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
          this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segSecData.lblActionHeaderCheckbox.text = img;
      segSecData.lblActionHeaderCheckbox.skin = this.applyCheckboxSkin(segSecData.lblActionHeaderCheckbox);
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].lblCheckbox.text=img;
        rowsData[i].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[i].lblCheckbox);
        rowsData[i].isSelected = img === this.AdminConsoleCommonUtils.checkboxnormallbl ? 0 : 1;
        this.addRemoveSelectedFeatureAction(rowsData[i],rowsData[i].isSelected);
      }
      selectedRowsCount = img === this.AdminConsoleCommonUtils.checkboxnormallbl ? "0" : "" + rowsData.length;
      segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].isSelected = (rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? 1 : 0;
      rowsData[selInd].lblCheckbox.text = (rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      rowsData[selInd].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[selInd].lblCheckbox);
      if(rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
        rowsData = this.deselectDependentActions(rowsData,rowsData[selInd].id);
      } else{
        rowsData = this.selectDependentActions(rowsData,rowsData[selInd].dependentActions);
      }
      this.addRemoveSelectedFeatureAction(rowsData[selInd],rowsData[selInd].isSelected);
      segSecData.lblActionHeaderCheckbox.text = this.getHeaderCheckboxImage(rowsData,true,true);
      segSecData.lblActionHeaderCheckbox.skin=this.applyCheckboxSkin(segSecData.lblActionHeaderCheckbox);
      selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"lblCheckbox",false);
      segSecData.lblCountActions.text= selectedRowsCount;
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    }

  },
   /*
  * check if all the rows of segment are selected or not
  * @param: data,rowData or section data, is partial selection behaviour
  * @return: image to be set (checked/unchecked/partial)
  */
  getHeaderCheckboxImage : function(data,isRowData,hasPartialSelection){
    var img = this.AdminConsoleCommonUtils.checkboxnormallbl;
    var currImg = (isRowData === true) ? "lblCheckbox" :"lblActionHeaderCheckbox";
    var selCount = 0, partialCount = 0,unselCount = 0;
    for(var i=0; i<data.length; i++){
      var list = (isRowData === true) ? data[i] : data[i][0];
      if(list[currImg].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl || list[currImg].text === this.AdminConsoleCommonUtils.checkboxPartiallbl){
        selCount  = selCount +1;
        partialCount = (list[currImg].src === this.AdminConsoleCommonUtils.checkboxPartiallbl) ? partialCount +1 : partialCount;
      }
    }
    if(hasPartialSelection){
      if(selCount !== 0 && selCount === data.length)
        img = partialCount === 0 ? this.AdminConsoleCommonUtils.checkboxSelectedlbl: this.AdminConsoleCommonUtils.checkboxPartiallbl;
      else if(selCount !== 0 && selCount < data.length)
        img = this.AdminConsoleCommonUtils.checkboxPartiallbl;
    } else{
      if(selCount === data.length)
        img = this.AdminConsoleCommonUtils.checkboxSelectedlbl;
    }
    return img;
      
  },
    /*
   * get the selected features/actions count
   * @param: actions segment data,checkboc img id,isSection(true/false)
   * @returns" selected actions count
   */
  getSelectedFeatureActionCount : function(segData,lblCheckboxId,isSection){
    var selectedCount = 0;
    for(var i=0;i < segData.length; i++){
      var data = (isSection === true) ? segData[i][0] : segData[i];
      if(data[lblCheckboxId].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl ||
         data[lblCheckboxId].text === this.AdminConsoleCommonUtils.checkboxPartiallbl)
        selectedCount = selectedCount +1;
    }
    selectedCount =  this.getTwoDigitNumber(selectedCount);
    return selectedCount;
  },
  /*
   * add/remove features from selected features obj
   * @param:seg row data,category(1:add,0:remove)
   */
  addRemoveSelectedFeatureAction : function(rowData, category){
    var featureActionId = rowData.featureId+ "#"+ rowData.id;
    if(category === 1){
      this.selectedFeatureActionObj[featureActionId] = rowData;
    } else if(category === 0){
      delete this.selectedFeatureActionObj[featureActionId];
    }
    //update the global features isSelected value in case of selections in search results
    var searchText=this.view.tbxSearchBox1.text;
    if(searchText && searchText.trim().length > 0){
      for(var i=0; i< this.roleFeatures.length; i++){
        if(rowData.featureId === this.roleFeatures[i].id){
          this.roleFeatures[i].isSelected = category;
          for(var j=0; j<this.roleFeatures[i].actions.length; j++){
            if(rowData.id === this.roleFeatures[i].actions[j].id){
              this.roleFeatures[i].actions[j].isSelected = category;
              break;
            }
          }
          break;
        }
      }
    }
  },
  toggleActionHeaderonClick: function(collapsibleSegmentToAdd) {
    var scopeObj = this;
    collapsibleSegmentToAdd.flxFeatureNameContainer.onClick = function() {
      collapsibleSegmentToAdd.toggleContent();
      scopeObj.view.forceLayout();
    };
  },
  selectDependentActions: function(segData,dependencies){
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<dependencies.length;j++){
        if(segData[i].actionId=== dependencies[j].id && 
           segData[i].lblCheckbox.text=== this.AdminConsoleCommonUtils.checkboxnormallbl){
          segData[i].lblCheckbox.text = this.AdminConsoleCommonUtils.checkboxSelectedlbl;
          segData[i].lblCheckbox.skin= this.applyCheckboxSkin(segData[i].lblCheckbox);
          segData[i].isSelected = 1;
          this.addRemoveSelectedFeatureAction(segData[i],segData[i].isSelected);
        }
      }      
    }    
    return segData;
  },
  deselectDependentActions: function(segData,actionId){
    for(var i=0;i<segData.length;i++){
      var dependencies=segData[i].dependentActions;
      for(var j=0;j<dependencies.length;j++){
        if(actionId===dependencies[j].id && 
           segData[i].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxSelectedlbl){
          segData[i].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
          segData[i].lblCheckbox.skin= this.applyCheckboxSkin(segData[i].lblCheckbox);
          segData[i].isSelected = 0;
          this.addRemoveSelectedFeatureAction(segData[i], segData[i].isSelected);
        }
      }      
    }
    return segData;
  },
  updateAdvSelFeaturesData: function() {
    var scopeObj = this;
    var featureActionId,segData;
    for (var i = 0; i < scopeObj.roleFeatures.length; i++) {
      var advSelSegData = this.getMappedAdvSelFeatureActionData(scopeObj.roleFeatures[i]);
      if (advSelSegData && advSelSegData.length >0) {
        var actionData = advSelSegData[1];
        for (var k = 0; k < this.accessPolicies.length; k++) {
          if (this.featureactionmap[i][k] === 1) { //all selected
            for (let j = 0; j < actionData.length; j++) {
              featureActionId= scopeObj.roleFeatures[i].id+"#"+actionData[j].id;
              if (actionData[j]  && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                  actionData[j].lblCheckbox.text === scopeObj.AdminConsoleCommonUtils.checkboxnormallbl) {
                actionData[j].lblCheckbox.text = scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl;
                actionData[j].lblCheckbox.skin= this.applyCheckboxSkin(actionData[j].lblCheckbox);
                actionData[j].isSelected = 1;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j], 1);
              }
            }
          } else if (this.featureactionmap[i][k] === 2) { //partial selections
            for (let j = 0; j < actionData.length; j++) {
              featureActionId= scopeObj.roleFeatures[i].id+"#"+actionData[j].id;
              if (actionData[j] && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                  scopeObj.roleFeatures[i].actions.isSelected === 1){
                actionData[j].lblCheckbox.text = scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl;
                actionData[j].lblCheckbox.skin= this.applyCheckboxSkin(actionData[j].lblCheckbox);
                actionData[j].isSelected = 1;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j], 1);
              }
              else if (actionData[j] && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                       scopeObj.roleFeatures[i].actions.isSelected === 0){ 
                actionData[j].lblCheckbox.text = scopeObj.AdminConsoleCommonUtils.checkboxnormallbl;
                actionData[j].lblCheckbox.skin = this.applyCheckboxSkin(actionData[j].lblCheckbox);
                actionData[j].isSelected= 0;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j], 0);
              }
            }
          } else if (this.featureactionmap[i][k] === 0) {
            for (let j = 0; j < actionData.length; j++) {
              featureActionId= scopeObj.roleFeatures[i].id+"#"+actionData[j].id;
              if (actionData[j] && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                  actionData[j].lblCheckbox.text === scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl) {
                  actionData[j].lblCheckbox.text= scopeObj.AdminConsoleCommonUtils.checkboxnormallbl;
                  actionData[j].lblCheckbox.skin= this.applyCheckboxSkin(actionData[j].lblCheckbox);
                  actionData[j].isSelected = 0;
                  scopeObj.addRemoveSelectedFeatureAction(actionData[j],0);
              }
            }
          }
        }
        //update section header count, checkbox img
        advSelSegData[0].lblCountActions.text = scopeObj.getSelectedFeatureActionCount(actionData,"lblCheckbox",false)
        advSelSegData[0].lblActionHeaderCheckbox.text = scopeObj.getHeaderCheckboxImage(actionData,true,true);
        advSelSegData[0].lblActionHeaderCheckbox.skin= this.applyCheckboxSkin(advSelSegData[0].lblActionHeaderCheckbox);
        advSelSegData[1] = actionData;
        scopeObj.view.segAdvanceSelFeatures.setSectionAt(advSelSegData, i);
      }
    }
  },
  /*
  * update the selected features selected in advance selction screen
  */
  setFeatureactionMappingForComponent: function() {
    var scopeObj = this;
    var arr = [];
    for (var i = 0; i < scopeObj.roleFeatures.length; i++) {
      var featureSelected = 0;
      var advSelSegData = scopeObj.view.segAdvanceSelFeatures.data;
      for (var k = 0; k < this.featureactionmap[i].length; k++) {
        var actions = scopeObj.roleFeatures[i].actions;
        var c = 0;
        var d = 0;
        for (var j = 0; j < actions.length; j++) {
          var featureActionId= scopeObj.roleFeatures[i].id+"#"+actions[j].id;
          var actionData = scopeObj.selectedFeatureActionObj[featureActionId];
          if (actionData && actionData.lblFeatureName.tag === this.accessPolicies[k].name) d++;
          if (actionData && actionData.lblCheckbox.text === scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl &&
              actionData.lblFeatureName.tag === this.accessPolicies[k].name) {
            c++;
            featureSelected = 1;
            this.roleFeatures[i].actions[j].isSelected = 1;
          } else if (actionData && actionData.lblCheckbox.text === scopeObj.AdminConsoleCommonUtils.checkboxnormallbl){
            this.roleFeatures[i].actions[j].isSelected = 0;
          } else if(actionData === undefined){
            this.roleFeatures[i].actions[j].isSelected = 0;
          }
        }
        if (c === 0 || d === 0)
          scopeObj.featureactionmap[i][k] = 0; //no access policies
        else if (c === d)
          scopeObj.featureactionmap[i][k] = 1;//all access policies
        else
          scopeObj.featureactionmap[i][k] = 2;//partial
      }
      if (featureSelected === 1)
        arr.push(i);
    }
  },
  showfeaturesPage: function() {
    this.hideAllGroups();
    this.view.flxSelectFeatures.setVisibility(true);
    //this.setLeftMenu(this.view.verticalTabs.btnOption2, this.view.verticalTabs.flxImgArrow2);
  },
  searchAdvanceSelection: function() {
    var scopeObj=this;
    var filterdResults =[];
    var searchText=scopeObj.view.tbxSearchBox1.text.toLowerCase();
    var len = scopeObj.roleFeatures.length;
    if(searchText != ""){
      this.view.flxClearSearchImage1.setVisibility(true);
    }
    else{
      this.view.flxClearSearchImage1.setVisibility(false);
    }
    //clear the seg data, based on search criteria new rows are added
    scopeObj.view.segAdvanceSelFeatures.setData([]);
    if(searchText.length > 0){
      for (var i = 0; i < len; i++) {
        if(scopeObj.roleFeatures[i].name.toLowerCase().indexOf(searchText)  >= 0){
          filterdResults.push(scopeObj.roleFeatures[i]);
        }
      }
      var maxLimit = filterdResults.length >= 10 ? 10 :filterdResults.length;
      scopeObj.view.segAdvanceSelFeatures.info = {"searchResult":filterdResults };
      scopeObj.getMoreDataModelAdvSel.PAGE_OFFSET = 10;
      this.view.flxAdvSelectionSegCont.setContentOffset({x:0,y:0});
      scopeObj.setAdvanceSelectionContent(0,maxLimit,true);
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    } else{
      scopeObj.setAdvanceSelectionContent(0, 10,false);
      scopeObj.getMoreDataModelAdvSel.PAGE_OFFSET = 10;
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    }
    this.view.forceLayout();
  },
  loadFeatureData : function (){
    var list = this.featuresegData.filter(this.featureSearch);
    if(list.length>0){
        this.view.featureAndActions.segFeatures.setVisibility(true);
        this.view.featureAndActions.segFeatures.setData(list);
    }else{
        this.view.featureAndActions.segFeatures.setVisibility(false);   
    }
  },
  featureSearch:   function (feature) {
    var  searchText  =  this.view.featureAndActions.subHeader.tbxSearchBox.text;
    if (typeof  searchText  ===  'string'  &&  searchText.length  > 0) {
        return  feature.lblFeatureName.toLowerCase().indexOf(searchText.toLowerCase())  !==  -1;
    } else {
        return  true;
    }
  },
  createRequest:function(){
    var scopeObj=this;
    var featureRequest = scopeObj.createRequestParam.featureactions
    if(featureRequest.length ===0){
      scopeObj.createRequestParam.featureactions= scopeObj.getFeatureActionIds();
      // to track the newly selected access policies in selectedFeatureAction obj
      for(var p=0; p<scopeObj.roleFeatures.length; p++){
        var segSectionData = scopeObj.getMappedAdvSelFeatureActionData(scopeObj.roleFeatures[p]);
        for(var q=0; q<scopeObj.roleFeatures[p].actions.length; q++){
          if(scopeObj.roleFeatures[p].actions[q].isSelected === 1)
            scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][q], 1);
        }
      }
    }else{
        for (var i = 0; i < scopeObj.roleFeatures.length; i++) {
          //get segment mapped data for curr feature actions
          var segSectionData = scopeObj.getMappedAdvSelFeatureActionData(scopeObj.roleFeatures[i]);
            for (var j = 0; j < scopeObj.roleFeatures[i].actions.length; j++) {
             
                if(scopeObj.roleFeatures[i].actions[j].isSelected === 1 && !scopeObj.containsActionId(featureRequest,scopeObj.roleFeatures[i].actions[j].id)){
                    scopeObj.addActionToRequest(scopeObj.roleFeatures[i].actions[j]);
                    scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][j], 1);
                }else if(scopeObj.roleFeatures[i].actions[j].isSelected === 0 && scopeObj.containsActionId(featureRequest,scopeObj.roleFeatures[i].actions[j].id)){
                    scopeObj.removeActionFromRequest(scopeObj.roleFeatures[i].actions[j].id);
                    scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][j], 0);
                }
                
                if(scopeObj.roleFeatures[i].actions[j].isSelected===1)
                    scopeObj.roleFeatures[i].actions[j].retained=1;
                else
                    scopeObj.roleFeatures[i].actions[j].retained=0;


            }
        }
    }
  },
  /*checks if request contains the action id*/
  containsActionId:function(featureArray, actionId){
    if (featureArray.some(rec => rec.id === actionId))
        return true;
    return false;
  },
  addActionToRequest: function(action){
      var obj={"id":action.id};
      if (action.type === scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY && action.limits !== undefined) {
        var limits = JSON.parse(JSON.stringify(action.limits));
        //if(scopeObj.groupsCurrAction=== scopeObj.groupActionConfig.EDIT)
        limits = limits.filter(x => x.id !== "MIN_TRANSACTION_LIMIT");
        obj.limits = limits;
      }
      else 
          obj.limits = [];
      scopeObj.createRequestParam.featureactions.push(obj);
  },
  removeActionFromRequest:function(actionId){
    scopeObj.createRequestParam.featureactions = scopeObj.createRequestParam.featureactions.filter(function(rec){
        if(rec.id !== actionId )
            return rec;
    });
  },
  /*
  * fetches all the action ids which are selected
  * @returns: all selected actions arr
  */
  getFeatureActionIds:function(){
    var scopeObj=this;
    var actions=[];
    var action_id;
    for(var i=0;i<scopeObj.roleFeatures.length;i++){
      for(var j=0;j<scopeObj.roleFeatures[i].actions.length;j++){
        action_id ={};
        if(scopeObj.roleFeatures[i].actions[j].isSelected===1){
          action_id = {"id":scopeObj.roleFeatures[i].actions[j].id};
          if(scopeObj.roleFeatures[i].actions[j].type===scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY && scopeObj.roleFeatures[i].actions[j].limits !== undefined)
            action_id.limits = JSON.parse(JSON.stringify(scopeObj.roleFeatures[i].actions[j].limits.filter(function(rec){
              if(rec.id !== "MIN_TRANSACTION_LIMIT") return rec;
            })));
          else 
            action_id.limits = [];
          actions.push(action_id);
          scopeObj.roleFeatures[i].actions[j].retained=1;
        }else {
          scopeObj.roleFeatures[i].actions[j].retained=0;
        }
      }
    }
    return actions;
  },
  showAssignLimits: function() {
    this.hideAllGroups();
    this.view.flxAssignLimitsComponent.setVisibility(true);
    this.view.verticalTabs.flxOption4.setVisibility(true);
    //this.setLeftMenu(this.view.verticalTabs.btnOption4, this.view.verticalTabs.flxImgArrow4);
    var widgetArray = [this.view.verticalTabs.btnOption1, this.view.verticalTabs.btnOption2, this.view.verticalTabs.btnOption4];
    this.tabUtilVerticleButtonFunction(widgetArray, this.view.verticalTabs.btnOption4);
    this.tabUtilVerticleArrowVisibilityFunction([this.view.verticalTabs.lblSelected1, this.view.verticalTabs.lblSelected2,
        this.view.verticalTabs.lblSelected3, this.view.verticalTabs.lblSelected4
    ], this.view.verticalTabs.lblSelected4);
    this.getMoreDataModel = {
      "PAGE_OFFSET": 0
    };
    this.view.flxScrollAssignLimits.setVisibility(true);
    this.setDynamicActionsLimits();
  },
  setDynamicActionsLimits: function() {
    var self = this;
    var flag = false;
    self.view.flxNoLimitsForFeatureSelected.setVisibility(false);
    self.view.flxBtnContainer.setVisibility(true);
    var screenWidth = kony.os.deviceInfo().screenWidth;
    for(var i = 0; i < self.roleFeatures.length ; i++){
      if(self.roleFeatures[i].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY){
        flag = true;
        var featureSegment = this.view.flxScrollAssignLimits.widgets().filter( x => x.id === "actionLimits"+i)[0];
        if(featureSegment === undefined){
          featureSegment = new com.adminConsole.common.assignLimits({
            "id": "actionLimits" + i,
            "isVisible": true,
            "width": 99 + "%",
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "top": "0px"
          }, {}, {});
          this.view.flxScrollAssignLimits.add(featureSegment);
        }
        featureSegment.setVisibility(true);
        var legalEntity= this.getLEDesc(self.roleFeatures[0].legalEntityId);
        this.currency=  this.defaultCurrencyCode(legalEntity[0].baseCurrency,true);
        self.setActionLimitsData(featureSegment,self.roleFeatures[i], i);
      }
    }
    if(this.createRequestParam.featureactions.filter(x => x.limits.length >0).length === 0){
      self.view.flxBtnContainer.setVisibility(false);
      self.view.flxNoLimitsForFeatureSelected.setVisibility(true);
    }
    self.view.forceLayout();
  },
  setActionLimitsData : function(featureSegment, feature, featureIndex){
    var self = this;
    var actionPresent = false;
    var actions = feature.actions;
    for(var i = 0; i < actions.length ; i++){

        if( actions[i].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY){
            var actionFlx = featureSegment.flxActionsLimitsSegment.widgets().filter( widget => widget.id === "flxActionsLimits" + i)[0];
            
            if(actionFlx === undefined){
                actionFlx = featureSegment.flxActionsLimitsSegment.flxActionsLimits.clone("x" + i);
                actionFlx = self.getDynamicWidgets(actionFlx, i);

                actionFlx.widgets()[0].widgets()[0].text = actions[i].name;

                featureSegment.flxActionsLimitsSegment.add(actionFlx);

                self.addEventsOnTextBox(actionFlx, actions[i], featureIndex, i);
            }
          featureSegment["lblCurrencySymbolA"+i].text = self.currency;
          //featureSegment["lblCurrencySymbolA"+i].padding = [10, 3, 0, 0];
          featureSegment["lblCurrencySymbolB"+i].text = self.currency;
          //featureSegment["lblCurrencySymbolB"+i].padding = [10, 3, 0, 0];
          featureSegment["lblCurrencySymbolC"+i].text = self.currency;
          //featureSegment["lblCurrencySymbolC"+i].padding = [10, 3, 0, 0];
            if (actions[i].isSelected !== undefined && actions[i].isSelected === 1 && actions[i].retained === 1){
                actionPresent = true;
                actionFlx.setVisibility(true);
            }
            else actionFlx.setVisibility(false);
        }
    }
    
    featureSegment.lblFeatureName.text =  feature.name;
    featureSegment.flxDefaultInfo1.onHover = function(widget, context) {
        var info = "This is per transaction value for " + feature.name + " submitted over the online banking channel.";
        self.onHoverCallBackForLimits(widget, context, featureSegment, info);
    };
    featureSegment.flxDefaultInfo2.onHover = function(widget, context) {
        var info = "This is daily transaction value for " + feature.name + " submitted over the online banking channel.";
        self.onHoverCallBackForLimits(widget, context, featureSegment, info);
    };
    featureSegment.flxDefaultInfo3.onHover = function(widget, context) {
        var info = "This is weekly transaction value for " + feature.name + " submitted over the online banking channel.";
        self.onHoverCallBackForLimits(widget, context, featureSegment, info);
    };
    if(!actionPresent)
        featureSegment.setVisibility(false);
  },
  getDynamicWidgets: function(actionFlx, i) {
    actionFlx.id = "flxActionsLimits" + i;
    actionFlx.widgets()[0].widgets()[3].id = "flxLimitValueC" + i;
    actionFlx.widgets()[0].widgets()[2].id = "flxLimitValueB" + i;
    actionFlx.widgets()[0].widgets()[1].id = "flxLimitValueA" + i;
    actionFlx.widgets()[0].widgets()[4].id = "flxLimitRangeA" + i;
    actionFlx.widgets()[0].widgets()[5].id = "flxLimitRangeB" + i;
    actionFlx.widgets()[0].widgets()[6].id = "flxLimitRangeC" + i;
    actionFlx.widgets()[0].widgets()[7].id = "lblSeparatorA" + i;
    actionFlx.widgets()[0].id = "flxLimitsRow" + i;
    actionFlx.widgets()[0].widgets()[1].widgets()[0].id = "lblCurrencySymbolA" + i;
    actionFlx.widgets()[0].widgets()[2].widgets()[0].id = "lblCurrencySymbolB" + i;
    actionFlx.widgets()[0].widgets()[3].widgets()[0].id = "lblCurrencySymbolC" + i;
    actionFlx.widgets()[0].widgets()[1].widgets()[0].text = this.currency;
    actionFlx.widgets()[0].widgets()[2].widgets()[0].text = this.currency;
    actionFlx.widgets()[0].widgets()[3].widgets()[0].text = this.currency;
    actionFlx.widgets()[0].widgets()[1].widgets()[1].id = "tbxLimitValueA" + i;
    actionFlx.widgets()[0].widgets()[2].widgets()[1].id = "tbxLimitValueB" + i;
    actionFlx.widgets()[0].widgets()[3].widgets()[1].id = "tbxLimitValueC" + i;
    actionFlx.widgets()[0].widgets()[4].widgets()[0].id = "lblRangeA" + i;
    actionFlx.widgets()[0].widgets()[5].widgets()[0].id = "lblRangeB" + i;
    actionFlx.widgets()[0].widgets()[6].widgets()[0].id = "lblRangeC" + i;
     actionFlx.widgets()[0].widgets()[4].widgets()[1].id = "flxErrorA" + i;
    actionFlx.widgets()[0].widgets()[5].widgets()[1].id = "flxErrorB" + i;
    actionFlx.widgets()[0].widgets()[6].widgets()[1].id = "flxErrorC" + i;
    actionFlx.widgets()[0].widgets()[4].widgets()[1].widgets()[1].id = "lblErrorA" + i;
    actionFlx.widgets()[0].widgets()[5].widgets()[1].widgets()[1].id = "lblErrorB" + i;
    actionFlx.widgets()[0].widgets()[6].widgets()[1].widgets()[1].id = "lblErrorC" + i;
    actionFlx.widgets()[0].widgets()[0].id = "lblActionName" + i;
    return actionFlx;
  },
  addEventsOnTextBox : function(actionFlx, action, featureIndex , actionIndex){
    var self = this;
    var componentname = "actionLimits"+ featureIndex;
    var tbxIntials = "tbxLimitValue";
    var limitsObj ={};
    for(let i=0; i< action.limits.length; i++){
      limitsObj[action.limits[i].id] = action.limits[i].value;
    }
    var masterLimits = self.masterData[featureIndex].actions[actionIndex].limits||[];
    var masterLimitsObj = {};
    for(let i=0; i< masterLimits.length; i++){
      masterLimitsObj[masterLimits[i].id] = masterLimits[i].value;
    }
    //per transaction
    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].text = limitsObj["MAX_TRANSACTION_LIMIT"];

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].onBeginEditing = function(widget) {
      //widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      widget.parent.skin = "sknFlxBorder117eb0radius3pxbgfff";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeA"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["flxErrorA"+actionIndex].setVisibility(false);
      self.view.flxScrollAssignLimits[componentname]["lblRangeA"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["lblRangeA"+actionIndex].skin = "sknIcon485C7513px";
      self.view.flxScrollAssignLimits[componentname]["lblRangeA"+actionIndex].text = "Range: " + self.currency + (masterLimitsObj["MIN_TRANSACTION_LIMIT"] ||"0") +
        " - " + self.currency +  masterLimitsObj["MAX_TRANSACTION_LIMIT"];
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].onEndEditing = function(widget) {
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeA"+actionIndex].setVisibility(false);
      widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].onTextChange = function(widget) {
      var currAction = self.createRequestParam.featureactions.filter(x => x.id === self.roleFeatures[featureIndex].actions[actionIndex].id)[0];
      for(let j=0; j<currAction.limits.length; j++){
        if(currAction.limits[j].id === "MAX_TRANSACTION_LIMIT"){
          currAction.limits[j].value = widget.text;
          break;
        }
      }
    }

    //daily transaction
    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].text = limitsObj["DAILY_LIMIT"];

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].onBeginEditing = function(widget) {
      //widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      widget.parent.skin = "sknFlxBorder117eb0radius3pxbgfff";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeB"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["flxErrorB"+actionIndex].setVisibility(false);
      self.view.flxScrollAssignLimits[componentname]["lblRangeB"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["lblRangeB"+actionIndex].skin = "sknIcon485C7513px";
      self.view.flxScrollAssignLimits[componentname]["lblRangeB"+actionIndex].text = "Range: " + self.currency +  (masterLimitsObj["MIN_TRANSACTION_LIMIT"]|| "0") +
        " - " + self.currency +  masterLimitsObj["DAILY_LIMIT"];
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].onEndEditing = function(widget) {
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeB"+actionIndex].setVisibility(false);
      widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].onTextChange = function(widget) {
      var currAction = self.createRequestParam.featureactions.filter(x => x.id === self.roleFeatures[featureIndex].actions[actionIndex].id)[0];
      for(let j=0; j<currAction.limits.length; j++){
        if(currAction.limits[j].id === "DAILY_LIMIT"){
          currAction.limits[j].value = widget.text;
          break;
        }
      }
    }

    //weekly transaction
    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].text =  limitsObj["WEEKLY_LIMIT"];

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].onBeginEditing = function(widget) {
      //widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      widget.parent.skin = "sknFlxBorder117eb0radius3pxbgfff";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeC"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["flxErrorC"+actionIndex].setVisibility(false);
      self.view.flxScrollAssignLimits[componentname]["lblRangeC"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["lblRangeC"+actionIndex].skin = "sknIcon485C7513px";
      self.view.flxScrollAssignLimits[componentname]["lblRangeC"+actionIndex].text = "Range: " + self.currency + (masterLimitsObj["MIN_TRANSACTION_LIMIT"]||"0") +
        " - " + self.currency + masterLimitsObj["WEEKLY_LIMIT"];
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].onEndEditing = function(widget) {
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeC"+actionIndex].setVisibility(false);
      widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].onTextChange = function(widget) {
      var currAction = self.createRequestParam.featureactions.filter(x => x.id === self.roleFeatures[featureIndex].actions[actionIndex].id)[0];
      for(let j=0; j<currAction.limits.length; j++){
        if(currAction.limits[j].id === "WEEKLY_LIMIT"){
          currAction.limits[j].value = widget.text;
          break;
        }
      }
    }
  },
  validateLimits : function(){
    var self = this;
    var action = self.createRequestParam.featureactions[2];
    var isValid = true;
    for(var i= 0; i< self.roleFeatures.length; i++){
        var feature = self.roleFeatures[i];
        if(feature.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY ){
            for(var j=0; j < feature.actions.length; j++){
                if(feature.actions[j].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY && feature.actions[j].isSelected === 1 && feature.actions[j].retained === 1){
                    if(!self.validateActionLimitsEntered(self.masterData[i].actions[j], i, j))
                      isValid = false;
                    self.view.forceLayout();
                }
            }
        }           
    }
    return isValid;
  },
  validateActionLimitsEntered: function(action, featureIndex, actionIndex) {
    var self = this;
    var componentname = "actionLimits" + featureIndex;
    var tbxIntials = "tbxLimitValue";
    var isValid = true,errCount = 0;

    var actualLimits = [];
    actualLimits[0] = (action.limits.filter(x => x.id === "MAX_TRANSACTION_LIMIT"))[0].value;  // per transaction value
    actualLimits[1] = (action.limits.filter(x => x.id === "DAILY_LIMIT"))[0].value;  // daily transaction value
    actualLimits[2] = (action.limits.filter(x => x.id === "WEEKLY_LIMIT"))[0].value;  // weekly transaction value
    actualLimits[3] = (action.limits.filter(x => x.id === "MIN_TRANSACTION_LIMIT"))[0].value;
    var minTransLimit = actualLimits[3];
    var perVal = parseFloat(self.view.flxScrollAssignLimits[componentname][tbxIntials + 'A' + actionIndex].text);
    var dailyVal = parseFloat(self.view.flxScrollAssignLimits[componentname][tbxIntials + 'B' + actionIndex].text);
    var weeklyVal = parseFloat(self.view.flxScrollAssignLimits[componentname][tbxIntials + 'C' + actionIndex].text);

    for (var k = 0; k < 3; k++) {
		 isValid = true;
      var limit = actualLimits[k];
      var tbxId = String.fromCharCode(65 + k); // can be A, B or C
      var tbxname = tbxIntials + String.fromCharCode(65 + k) + actionIndex;
      var value = self.view.flxScrollAssignLimits[componentname][tbxname].text;
	  //min/max range validations
      if (value === "" || value === undefined) {
                  var errorMsg = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
        self.showErrorOnTbx(componentname, tbxname, tbxId, actionIndex , errorMsg);
        self.view.flxScrollAssignLimits[componentname][tbxname].parent.skin = "sknFlxCalendarError";
        isValid = false;
      } 
      else if (parseFloat(value) < 0) {
        var errorMsg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " " + self.currency + "0";
        self.showErrorOnTbx(componentname, tbxname, tbxId, actionIndex , errorMsg);
        isValid = false;
      }
      else if (parseFloat(value) > parseFloat(limit) || parseFloat(value) < parseFloat(minTransLimit)) {
        var errorMsg ="";
        if(parseFloat(value) > parseFloat(limit))
          errorMsg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than") + " " + self.currency + parseFloat(limit);
        else
           errorMsg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " " + self.currency + minTransLimit;
        self.showErrorOnTbx(componentname, tbxname, tbxId, actionIndex , errorMsg);
        isValid = false;
      }
      if(isValid === true){ //compare within limit values only if no min/max range validations
        if (perVal > dailyVal && k === 0 && dailyVal >= parseFloat(minTransLimit)) {
          var errorMsg = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
          self.showErrorOnTbx(componentname, tbxIntials+"A"+actionIndex, "A", actionIndex , errorMsg);
          isValid = false;
        }
       else if (dailyVal > weeklyVal && k === 1 && weeklyVal >= parseFloat(minTransLimit)) {
          var errorMsg = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
          self.showErrorOnTbx(componentname, tbxIntials+"B"+actionIndex, "B", actionIndex , errorMsg);
          isValid = false;
		   if(perVal > weeklyVal && (perVal <= dailyVal)){
            var errorMsg2 = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
            self.showErrorOnTbx(componentname, tbxIntials+"A"+actionIndex, "A", actionIndex , errorMsg2);
          }
      
        }
	  }
	   errCount = isValid === false ? errCount +1 : errCount;
           if(isValid === true){
          self.view.flxScrollAssignLimits[componentname][tbxname].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
          self.view.flxScrollAssignLimits[componentname]["flxLimitRange" + tbxId + actionIndex].setVisibility(false);
      }
    }
    return (errCount === 0);
  },
  showErrorOnTbx: function(componentname, tbxname, tbxId, actionIndex, errorMsg) {
    var self = this;
    self.view.flxScrollAssignLimits[componentname][tbxname].parent.skin = "sknFlxCalendarError";
    self.view.flxScrollAssignLimits[componentname]["flxLimitRange" + tbxId + actionIndex].setVisibility(true);
    self.view.flxScrollAssignLimits[componentname]["lblRange" + tbxId + actionIndex].setVisibility(false);
    self.view.flxScrollAssignLimits[componentname]["flxError" + tbxId + actionIndex].setVisibility(true);
    self.view.flxScrollAssignLimits[componentname]["lblError" + tbxId + actionIndex].text = errorMsg;
    if(errorMsg.indexOf(self.currency)>-1)
      self.view.flxScrollAssignLimits[componentname]["lblError" + tbxId + actionIndex].skin = "sknFontIconError";//if text includes currency icon assigning fonticon skin
    else
    self.view.flxScrollAssignLimits[componentname]["lblError" + tbxId + actionIndex].skin = "sknlblError";
  },
  showResetAllLimitsPopup: function() {
    var scopeObj = this;
    scopeObj.view.popUpCancelEdits.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.ResetLimits");
    scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.common.Disclaimer");
    scopeObj.view.popUpCancelEdits.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.common.RESET");
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.width = "116dp";
    scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.width = "80%";
    scopeObj.view.flxEditCancelConfirmation.setVisibility(true);
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
      scopeObj.resetAllLimits();
    }
    scopeObj.view.forceLayout();
  },
  resetAllLimits: function() {
    for(var i=0;i<this.roleFeatures.length;i++){
        if(this.roleFeatures[i].type === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
            var componentname= "actionLimits"+i;
            var component=this.view.flxScrollAssignLimits[componentname];
            for(var j=0;j<this.roleFeatures[i].actions.length;j++){
                if(this.roleFeatures[i].actions[j].type === this.AdminConsoleCommonUtils.constantConfig.MONETARY && this.roleFeatures[i].actions[j].limits !== undefined && this.roleFeatures[i].actions[j].retained === 1){
                    var perTxLimit= "tbxLimitValueA"+j;
                    var dailyLimit= "tbxLimitValueB"+j;
                    var weeklyLimit= "tbxLimitValueC"+j;
                    var maplimits; 
                    maplimits = this.roleFeatures[i].actions[j].limits.reduce(function(maplimits, obj) {
                      maplimits[obj.id] = obj.value;
                      return maplimits;
                    },{});
                    this.view.flxScrollAssignLimits[componentname][perTxLimit].text = maplimits.MAX_TRANSACTION_LIMIT;
                    this.view.flxScrollAssignLimits[componentname][perTxLimit].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
                    this.view.flxScrollAssignLimits[componentname]["flxLimitRangeA"+j].setVisibility(false);
                                
                    this.view.flxScrollAssignLimits[componentname][dailyLimit].text = maplimits.DAILY_LIMIT;
                    this.view.flxScrollAssignLimits[componentname][dailyLimit].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
                    this.view.flxScrollAssignLimits[componentname]["flxLimitRangeB"+j].setVisibility(false);
                                
                    this.view.flxScrollAssignLimits[componentname][weeklyLimit].text = maplimits.WEEKLY_LIMIT;
                    this.view.flxScrollAssignLimits[componentname][weeklyLimit].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
                    this.view.flxScrollAssignLimits[componentname]["flxLimitRangeC"+j].setVisibility(false);

                    this.createRequestParam.featureactions.filter(x => x.id === this.roleFeatures[i].actions[j].id)[0].limits[0].value = this.view.flxScrollAssignLimits[componentname][weeklyLimit].text;
                    this.createRequestParam.featureactions.filter(x => x.id === this.roleFeatures[i].actions[j].id)[0].limits[1].value = this.view.flxScrollAssignLimits[componentname][perTxLimit].text;
                    this.createRequestParam.featureactions.filter(x => x.id === this.roleFeatures[i].actions[j].id)[0].limits[2].value = this.view.flxScrollAssignLimits[componentname][dailyLimit].text;
                }
            }
        }
    }
  },
  createCustomerRole : function(){
    var scopeObj=this;
    if (typeof selectedEntityId === 'undefined') {
      idForCreate = entityValues[0].id;
    } else {
      idForCreate = selectedEntityId[0].id;
    }
    scopeObj.createRequestParam.name = scopeObj.createRequestParam.name.trim();
    scopeObj.createRequestParam.description = scopeObj.createRequestParam.description.trim();
    scopeObj.createRequestParam.legalEntityId = idForCreate;
    scopeObj.presenter.createCustomerGroups(scopeObj.createRequestParam);
  },
  updateCustomerRole: function() {
    var scopeObj = this;
	//add 'isNewAction' key to newly added actions
    var addedActions = scopeObj.getNewlyAddedActionsOnEdit();
    var actionsArr = scopeObj.createRequestParam.featureactions;
    for(var i=0; i<actionsArr.length; i++){
      if(addedActions.includes(actionsArr[i].id)){
        actionsArr[i]["isNewAction"] = true;
      }
    }
	scopeObj.createRequestParam.featureactions = JSON.stringify(actionsArr);
    scopeObj.createRequestParam.name = scopeObj.createRequestParam.name.trim();
    scopeObj.createRequestParam.description = scopeObj.createRequestParam.description.trim();
    scopeObj.createRequestParam.servicedefinitions = JSON.stringify(scopeObj.createRequestParam.servicedefinitions)
    scopeObj.presenter.updateCustomerGroups(scopeObj.createRequestParam);
  },
  fillFeatureActionMapForEdit:function(){
    var scopeObj=this;
    for (var i=0;i< scopeObj.groupFeatures.length ;i++){
        ind = scopeObj.getFeatureIndex(scopeObj.groupFeatures[i].name);
        for (var j=0 ;j<scopeObj.accessPolicies.length;j++){
              actual=0;
              selected=0;
              
                for(var k=0;k<scopeObj.roleFeatures[ind].actions.length;k++)
                  if(scopeObj.roleFeatures[ind].actions[k].accessPolicy===scopeObj.accessPolicies[j].name)
                      actual++;
                
                for(var k=0;k<scopeObj.groupFeatures[i].actions.length;k++)
                  if(scopeObj.groupFeatures[i].actions[k].accessPolicy===scopeObj.accessPolicies[j].name)
                      selected++;

                  if(selected===0)
                      scopeObj.featureactionmap[ind][j]=0;
                  else if(actual===selected)
                      scopeObj.featureactionmap[ind][j]=1;
                  else if(selected<actual)
                      scopeObj.featureactionmap[ind][j]=2;
        }
    } 
  },

  SetIsSelectedForEdit:function(){
      var scopeObj=this;
      for (var i=0;i<scopeObj.groupFeatures.length;i++){
          var ind = scopeObj.getFeatureIndex(scopeObj.groupFeatures[i].name);
          for(var j=0;j<scopeObj.groupFeatures[i].actions.length;j++){
              for(k=0;k<scopeObj.roleFeatures[ind].actions.length;k++){
                  if(scopeObj.groupFeatures[i].actions[j].id===scopeObj.roleFeatures[ind].actions[k].id){
                    scopeObj.roleFeatures[ind].actions[k].isSelected=1;
                    //get segment mapped data for curr feature actions
                    var segSectionData = scopeObj.getMappedAdvSelFeatureActionData(scopeObj.roleFeatures[ind]);
                    scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][k], 1);
                    if(scopeObj.roleFeatures[ind].actions[k].type===scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY && scopeObj.groupFeatures[i].actions[j].limits !== undefined){
                      var minTransactionLimit = scopeObj.roleFeatures[ind].actions[k].limits[3];
                      scopeObj.roleFeatures[ind].actions[k].limits=JSON.parse(JSON.stringify(scopeObj.groupFeatures[i].actions[j].limits));
                      for(let x=0;x<scopeObj.roleFeatures[ind].actions[k].limits.length;x++){
                        if(scopeObj.roleFeatures[ind].actions[k].limits[x].id===minTransactionLimit.id){
                          scopeObj.roleFeatures[ind].actions[k].limits[x] = minTransactionLimit;
                          break;
                        }
                      }
                    }
                  }
              }
          }
      }
  },
  /*
   * on click of copy customer role option
   */
  onCopyGroupClick : function(){
    this.groupsCurrAction = this.groupActionConfig.COPY;
    this.isFeatureSelectionPage = false;
    this.view.flxBusinessTypesContainer.setVisibility(false);
    var groupData = this.getGroupSetData();
    //UI changes for copy role
    var request={"group_id":groupData.groupId,"type":groupData.Type_id,"legalEntityId": groupData.legalEntityId};
    if (typeof selectedEntityId === 'undefined') {
      serviceDefinitionParam = entityValues[0].id;
    } else {
      serviceDefinitionParam = selectedEntityId[0].id;
    }
    this.presenter.fetchRoleServiceDefinitions(null, groupData.legalEntityId, "create");
    this.presenter.fetchFeaturesForEdit(request);
    this.view.lblGroupDescriptionCount.text =  "0/250";
    this.view.lblGroupNameCount.text = "0/100";
    this.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
    this.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
    this.view.flxNoGroupNameError.setVisibility(false);
    this.view.flxNoBusinessTypeError.setVisibility(false);
    this.view.flxTypeError.setVisibility(false);
    this.view.flxNoGroupDescriptionError.setVisibility(false);
    this.view.lblGroupDescriptionCount.setVisibility(false);
    this.view.lblGroupNameCount.setVisibility(false);
    this.view.BusinessTypesToolTip.setVisibility(false);
    this.view.verticalTabs.btnOption3.info.firstClick = true;
    this.view.flxEntity.setVisibility(true);
    this.view.flxLegalEntity1.setVisibility(false);
    this.showAddGroupDetails(3, groupData.orginalName);
    this.custToAdd = [];
    this.deletedCustomerId = [];
    this.selectedCustomerId = [];
    // this.clearSearchBoxToDefaults();
    this.view.flxViewRoles.setVisibility(false);
    // this.view.segAssignedCustomers.selectedRowIndices = null;
    // this.hideActionsList(); 
    this.createRequestParam = {
      "name": "",
      "typeId": groupData.Type_id,
      "description": "",
      "status": groupData.Status,
      "featureactions": [],
      "isApplicabletoAllServices": groupData.isApplicabletoAllServices,
      "servicedefinitions":groupData.servicedefinitions,
      "isEAgreementActive":groupData.isEAgreementActive
    };
    
    //data changes for copy role
    this.view.lstBoxType.selectedKey = groupData.Type_id;
    var leDetails =  this.getLEDesc(groupData.legalEntityId);
    var listBoxData = [
      ['select', kony.i18n.getLocalizedString("i18n.frmGroups.Select_role_type")],
      [leDetails[0].id, leDetails[0].companyName]
    ];
    this.view.lstBoxEntity.masterData = listBoxData;
    this.view.lstBoxEntity.selectedKey = leDetails[0].id;
    var eAgreement = groupData.isEAgreementActive;
    var statusVal = groupData.Status;
    var isApplicabletoAllServices = groupData.isApplicabletoAllServices;
    if (statusVal === 0 || statusVal === this.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      this.view.switchStatus.selectedIndex = 0;
    } else {
      this.view.switchStatus.selectedIndex = 1;
    }
    if (eAgreement === 0) {
      this.view.switchEAgreement.selectedIndex = 1;
    } else {
      this.view.switchEAgreement.selectedIndex = 0;
    }
    if(isApplicabletoAllServices === 0) {
      this.view.imgCheckBoxSelect2.src = "checkboxnormal.png";
    } else {
      this.view.imgCheckBoxSelect2.src = "checkboxselected.png";
    }
    this.view.forceLayout();
  },
  expandGroupRowClick : function(){
      var index = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
      var data = this.view.listingSegmentClient.segListing.data;
      var selIndices = this.view.listingSegmentClient.segListing.selectedRowIndices;
      for(var i=0;i<data.length;i++) {
        if(i === index  &&  data[i].template === "flxGroupseg") {
          data[i].fonticonArrow.text = "\ue915";
          data[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
          data[i].template = "flxGroupsListSelected";
          this.view.listingSegmentClient.segListing.setDataAt(data[i], i);
        }
        else if(data[i].template === "flxGroupsListSelected") {
          data[i].fonticonArrow.text = "\ue922";
          data[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
          data[i].template = "flxGroupseg";
          this.view.listingSegmentClient.segListing.setDataAt(data[i], i);
        }
      }
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
    this.mouseXCoordinate=context.screenX;
  },
  setFlxMoreData: function(moreData){
    var heightVal= this.mouseYCoordinate-155;
    var maxSizeText="";
     var widgetMap = {
      "flxMore": "flxMore",
      "lblName": "lblName"
    };
    var data = moreData.map(function(segData){
      maxSizeText=segData.length>maxSizeText.length?segData:maxSizeText;
      return{
        "lblName" : segData
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+35;
    this.view.segBusinessTypes.widgetDataMap = widgetMap;
    this.view.segBusinessTypes.setData(data);
    this.view.flxSegMore.setVisibility(true);
    this.view.flxSegMore.width=flexWidth+"px";
    this.view.flxSegMore.left=this.view.flxGroupBusinessTypes.frame.x + 18 + "dp";//-(flexWidth/2)+40+"px";
    if(((this.view.flxSegMore.frame.height+heightVal)>(this.view.listingSegmentClient.segListing.frame.height+50))&&this.view.flxSegMore.frame.height<this.view.listingSegmentClient.segListing.frame.height){
      this.view.imgDownArrow.centerX = "10%";
      this.view.flxUpArrowImage.setVisibility(false);
      this.view.flxDownArrowImage.setVisibility(true);
      this.view.flxBusinessTypesOuter.top="0px";
      this.view.flxSegMore.top=((heightVal-this.view.flxSegMore.frame.height)-19)+"px";
    }
    else{
      this.view.imgUpArrow.centerX = "10%";
      this.view.flxUpArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxBusinessTypesOuter.top="-1px";
      this.view.flxSegMore.top=(heightVal)+"px";
    }
    this.view.forceLayout();
  },
  setFlxViewMoreData: function(moreData,widGetId){
    var heightVal;
    var leftVal;
    if(widGetId==="flxMoreTypes"){
      leftVal= this.view.flxMoreTypes.frame.x-50+"px";
    }else{
      leftVal= this.view.flxMoreDefaultTypes.frame.x+260+"px";
    }
     var widgetMap = {
      "flxMore": "flxMore",
      "lblName": "lblName"
    };
    var data = moreData.map(function(segData){
      return{
        "lblName" : segData
      };
    });
    this.view.segViewBusinessTypes.widgetDataMap = widgetMap;
    this.view.segViewBusinessTypes.setData(data);
    this.view.flxViewSegMore.left=leftVal;
    //this.view.flxViewSegMore.top=(heightVal)+"px";
    this.view.flxViewSegMore.setVisibility(true);
    this.view.forceLayout();
  },
   onHoverCallBack:function(widget, context,data) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        if(widGetId==="flxMore")
          scopeObj.setFlxMoreData(data);
        else if(widget.id==="flxDefaultInfo")
          scopeObj.showOnHoverInfo();
        else
          scopeObj.setFlxViewMoreData(data,widGetId);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        if(widGetId==="flxMore")
          scopeObj.view.flxSegMore.setVisibility(true);
        else if(widget.id==="flxDefaultInfo")
          scopeObj.view.BusinessTypesToolTip.setVisibility(true);
        else
          scopeObj.view.flxViewSegMore.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        if(widGetId==="flxMore")
          scopeObj.view.flxSegMore.setVisibility(false);
        else if(widget.id==="flxDefaultInfo")
          scopeObj.view.BusinessTypesToolTip.setVisibility(false);
        else
          scopeObj.view.flxViewSegMore.setVisibility(false);
      }
    }
  },
  setBusinessTypesData : function(businessTypesData){
    var self=this;
    var widgetMap = {
      "flxRoleBusinessTypes": "flxRoleBusinessTypes",
      "lblDescription": "lblDescription",
      "flxCheckboxSelect": "flxCheckboxSelect",
      "imgCheckBoxSelect": "imgCheckBoxSelect",
      "flxCheckboxDefault": "flxCheckboxDefault",
      "imgCheckBoxDefault": "imgCheckBoxDefault",
      "BusinessType_id": "BusinessType_id",
      "DefaultGroupCustomers_Count" : "DefaultGroupCustomers_Count",
      "Customers_Count" :"Customers_Count",
      "Default_group" :"Default_group"
    };
    var data = businessTypesData.map(function(segData){
      return{
        "lblDescription" : segData.name,
        "BusinessType_id" :segData.id,
        "isDefault" : "0",
        "Customers_Count" :segData.Customers_Count,
        "Groups_count" :segData.numberOfRoles,
        "Default_group" :segData.defaultGroup?segData.defaultGroup:"",
        "DefaultGroupCustomers_Count" :segData.DefaultGroupCustomers_Count,
        "flxCheckboxSelect" : {"onClick":self.toggleBusiTypeCheckox,"Enabled":true},
        "imgCheckBoxSelect" : {"src":"checkboxnormal.png"},
        "flxCheckboxDefault" : {
          "onClick":self.toggleDefaultTypeCheckbox,
          "isVisible":false,
          "Enabled": segData.defaultGroup?false:true
        },
        "imgCheckBoxDefault" : {"src":"checkboxnormal.png"},        
      };
    });
    this.view.segRoleBusinessTypes.info={"addedOrUpdatedBusinessTypes":[],"removedBusinessTypes":[]};
    this.view.segRoleBusinessTypes.widgetDataMap = widgetMap;
    this.view.segRoleBusinessTypes.setData(data);
    this.view.imgCheckBoxSelect.src = "checkboxnormal.png";
    //show error in case no services available
    if(businessTypesData && businessTypesData.length > 0){
      this.view.flxNoServiceAvailableError.setVisibility(false);
      this.view.lblSelectBusinessType.setVisibility(true);
      this.view.flxCheckboxSelect.setVisibility(true);
      this.view.flxSelectOtherServices.setVisibility(true);
    } else{
      this.view.flxNoServiceAvailableError.setVisibility(true);
      this.view.lblSelectBusinessType.setVisibility(false);
      this.view.flxCheckboxSelect.setVisibility(false);
      this.view.flxSelectOtherServices.setVisibility(false);
    }
    if(self.groupsCurrAction === self.groupActionConfig.COPY) {
      self.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes=self.createRequestParam.addedOrUpdatedBusinessTypes;
      self.setRolebusinessTypesDataForEdit(self.createRequestParam.addedOrUpdatedBusinessTypes);
    }else if(self.groupsCurrAction === self.groupActionConfig.EDIT){
      self.setRolebusinessTypesDataForEdit(self.editRequestParam.addedOrUpdatedBusinessTypes);
    }
    this.view.forceLayout();
  },
  toggleBusiTypeCheckox : function(){
    var segData=this.view.segRoleBusinessTypes.data;
    var selIndex=this.view.segRoleBusinessTypes.selectedRowIndex[1];
    var rowData=segData[selIndex];

    var serviceDefs = this.createRequestParam.servicedefinitions;
    var addedServiceIds = this.createRequestParam.servicedefinitions.map(function(e) {
        return e.id;
    });

    /*var addedBusiTypeIds=this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes.map(function(e){return e.id;});
    var removedBusiTypeIds=this.view.segRoleBusinessTypes.info.removedBusinessTypes.map(function(e){return e.id;});*/
    var count=0;
    for(var i=0;i<segData.length;i++){
      if(segData[i].imgCheckBoxSelect.src==="checkboxselected.png"  || segData[i].imgCheckBoxSelect.src === "checkboxDisableBg_2x.png")
        count=count+1;
    }
    if(rowData.imgCheckBoxSelect.src==="checkboxnormal.png"){
      rowData.imgCheckBoxSelect.src="checkboxselected.png";
      count++;
      this.view.flxNoBusinessTypeError.setVisibility(false);
      if(rowData.Groups_count==="0"){
        rowData.imgCheckBoxDefault={src:"checkboxselected.png"};
        rowData.isDefault="1";
        rowData.flxCheckboxDefault.isVisible=true;
      }
      else{
        rowData.imgCheckBoxDefault.src="checkboxnormal.png";
        rowData.isDefault="0";
        rowData.flxCheckboxDefault.isVisible=true;
      }
      if (!addedServiceIds.contains(rowData.BusinessType_id)) {
        serviceDefs.push({
            "id": rowData.BusinessType_id,
            "isDefault": rowData.isDefault
        });
      }
      /*if(!removedBusiTypeIds.contains(rowData.BusinessType_id)){
        this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes.push({"id": rowData.BusinessType_id, "isDefault": rowData.isDefault});
      }else{
        for (var x=0;x<removedBusiTypeIds.length;x++){
          if(this.view.segRoleBusinessTypes.info.removedBusinessTypes[x].id===rowData.BusinessType_id){
            this.view.segRoleBusinessTypes.info.removedBusinessTypes.splice(x,1);
            break;
          }
        }
      }*/
    }else{
      rowData.imgCheckBoxSelect.src="checkboxnormal.png";
      count--;
      if (addedServiceIds.contains(rowData.BusinessType_id)) {
        for (var x = 0; x < serviceDefs.length; x++) {
            if (serviceDefs[x].id === rowData.BusinessType_id) {
                serviceDefs.splice(x, 1);
                break;
            }
        }
      }
      /*if(!addedBusiTypeIds.contains(rowData.BusinessType_id)){
        this.view.segRoleBusinessTypes.info.removedBusinessTypes.push({"id": rowData.BusinessType_id, "isDefault": rowData.isDefault});
      }else{
        for (var x=0;x<addedBusiTypeIds.length;x++){
          if(this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes[x].id===rowData.BusinessType_id){
            this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes.splice(x,1);
            break;
          }
        }
      }*/
      rowData.flxCheckboxDefault.isVisible=false;
    }
    this.view.segRoleBusinessTypes.setDataAt(rowData, selIndex, 0);
    this.createRequestParam.servicedefinitions = serviceDefs;
    if (count === 0) {
      this.view.flxDefaultType.setVisibility(false);
      this.view.imgCheckBoxSelect.src = "checkboxnormal.png";
    }
    else {
      this.view.flxDefaultType.setVisibility(true);
      if(count === segData.length)
        this.view.imgCheckBoxSelect.src = "checkboxselected.png";
      else 
        this.view.imgCheckBoxSelect.src = "checkboxpartial.png";
    }
    this.view.forceLayout();
  },
  toggleDefaultTypeCheckbox : function(){
    var selIndex=this.view.segRoleBusinessTypes.selectedRowIndex[1];
    var rowData=this.view.segRoleBusinessTypes.data[selIndex];

    var serviceDefs = this.createRequestParam.servicedefinitions;
    var addedServiceIds = this.createRequestParam.servicedefinitions.map(function(e) {
        return e.id;
    });
    /*var busiTypeInfo=this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes;
    var businessIds= this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes.map(function(e){return e.id;});*/
    if(rowData.imgCheckBoxDefault.src==="checkboxnormal.png"){
      rowData.isDefault="1";
      rowData.imgCheckBoxDefault.src="checkboxselected.png";
    }else{
      rowData.isDefault="0";
      rowData.imgCheckBoxDefault.src="checkboxnormal.png";
      if(rowData.Groups_count==="0"){
        this.toggleBusiTypeCheckox();
      }
    }
    if (!addedServiceIds.contains(rowData.BusinessType_id)) {
      serviceDefs.push({
          "id": rowData.BusinessType_id,
          "isDefault": rowData.isDefault
      });
    } else {
        for (var x = 0; x < serviceDefs.length; x++) {
            if (serviceDefs[x].id === rowData.BusinessType_id) {
                serviceDefs[x].isDefault = rowData.isDefault;
                break;
            }
        }
    }
    this.createRequestParam.servicedefinitions = serviceDefs;
    //this.view.segRoleBusinessTypes.info.addedOrUpdatedBusinessTypes=busiTypeInfo;
    this.view.segRoleBusinessTypes.setDataAt(rowData, selIndex, 0);
    this.view.forceLayout();
  },
  toggleAllServiceCheckBoxes: function() {
    var segData = this.view.segRoleBusinessTypes.data;
    var img;
    var visibility;
    var count = 0;
    var serviceDefs = this.createRequestParam.servicedefinitions;
    var addedServiceIds = this.createRequestParam.servicedefinitions.map(function(e) {
        return e.id;
    });

    if ( this.view.imgCheckBoxSelect.src === "checkboxselected.png" ) {
      this.view.imgCheckBoxSelect.src = "checkboxnormal.png";
      this.view.flxDefaultType.setVisibility(false);
      img = "checkboxnormal.png";
      visibility = false;
    } else if (this.view.imgCheckBoxSelect.src === "checkboxnormal.png" || this.view.imgCheckBoxSelect.src === "checkbox.png" || this.view.imgCheckBoxSelect.src === "checkboxpartial.png"){
      this.view.imgCheckBoxSelect.src = "checkboxselected.png";
      this.view.flxDefaultType.setVisibility(true);
      img = "checkboxselected.png";
      visibility = true;
    }
    if (img !== undefined && visibility !== undefined) {
      for (var i = 0; i < segData.length; i++) {
          
        if(segData[i].imgCheckBoxSelect.src === "checkboxDisableBg_2x.png"){
                this.view.imgCheckBoxSelect.src = "checkboxpartial.png";
                segData[i].flxCheckboxDefault.isVisible = true;
                this.view.flxDefaultType.setVisibility(true);
                count++;
        }
        else{
            if (visibility) {
              segData[i].imgCheckBoxSelect.src = img;
              segData[i].flxCheckboxDefault.isVisible = visibility;
              if (segData[i].Groups_count === "0") {
                segData[i].imgCheckBoxDefault = {
                  src: "checkboxselected.png"
                };
                segData[i].isDefault = "1";
              } else {
                segData[i].imgCheckBoxDefault.src = "checkboxnormal.png";
                segData[i].isDefault = "0";
              }
              // if checkbox is checked then add the serviceDefs
              if (!addedServiceIds.contains(segData[i].BusinessType_id)) {
                serviceDefs.push({
                  "id": segData[i].BusinessType_id,
                  "isDefault": segData[i].isDefault
                });
              }
              count++;
            } else {
              segData[i].imgCheckBoxSelect.src = img;
              segData[i].flxCheckboxDefault.isVisible = visibility;
              segData[i].imgCheckBoxDefault.src = "checkboxnormal.png";
              segData[i].isDefault = "0";
              if (addedServiceIds.contains(segData[i].BusinessType_id)) {
                for (var x = 0; x < serviceDefs.length; x++) {
                  if (serviceDefs[x].id === segData[i].BusinessType_id) {
                    serviceDefs.splice(x, 1);
                    break;
                  }
                }
              }
            }
          }
            
        }
        if(count === segData.length) {
          this.view.imgCheckBoxSelect.src = "checkboxselected.png";
        }
    }
    this.view.segRoleBusinessTypes.setData(segData);
    this.view.forceLayout();
  },
  showOnHoverInfo : function(widget){
    var leftVal=this.view.flxDefaultType.frame.x-15;
    var topVal= this.view.flxDefaultType.frame.y+390-this.view.flxAddGroupDetails.contentOffsetMeasured.y;
    this.view.BusinessTypesToolTip.lblNoConcentToolTip.text = "This role will be used for new users";
    this.view.BusinessTypesToolTip.left =leftVal;
    this.view.BusinessTypesToolTip.top = topVal;
    this.view.BusinessTypesToolTip.width = "170dp";
    this.view.BusinessTypesToolTip.lblNoConcentToolTip.width = "170dp";
    this.view.BusinessTypesToolTip.setVisibility(true);
    this.view.forceLayout();
  },
  setRolebusinessTypesDataForEdit : function(businessTypesData){
    var segData=this.view.segRoleBusinessTypes.data;
    var selIndex=this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var groupBusiTypesData=this.view.listingSegmentClient.segListing.data[selIndex].lblMore.info;
    var self=this;
    var businessData,serviceDefForPayload = [];
    var count = 0;
    /*if(self.groupsCurrAction === self.groupActionConfig.COPY)
      businessData=businessTypesData;
    else*/
    businessData= groupBusiTypesData;
    for (var i=0;i<segData.length;i++){
      for(var j=0;j<businessData.length;j++){
        if(businessData[j].id==segData[i].BusinessType_id){
          this.view.flxDefaultType.setVisibility(true);
          if(businessData[j].customerCount === "0"|| self.groupsCurrAction === self.groupActionConfig.COPY){
            segData[i].imgCheckBoxSelect.src="checkboxselected.png";
            segData[i].flxCheckboxSelect= {"Enabled":true, "onClick":self.toggleBusiTypeCheckox};
            segData[i].imgCheckBoxDefault.src="checkboxnormal.png";
            segData[i].flxCheckboxDefault= {
              "onClick":self.toggleDefaultTypeCheckbox,
              "isVisible":true,
              "Enabled": true
            };
          }else{
            segData[i].imgCheckBoxSelect.src="checkboxDisableBg_2x.png";
            segData[i].flxCheckboxSelect= {"Enabled":false};
            segData[i].flxCheckboxDefault.isVisible=true;
          }
          if((businessData[j].isDefaultGroup === "true" || businessData[j].isDefaultGroup === "1")&&self.groupsCurrAction !== self.groupActionConfig.COPY){
            segData[i].imgCheckBoxSelect.src = "checkboxDisableBg_2x.png";
            segData[i].flxCheckboxSelect = {
              "Enabled": false
            };
            segData[i].imgCheckBoxDefault.src="checkboxDisableBg_2x.png";
            segData[i].flxCheckboxDefault= {
              "isVisible":true,
              "Enabled": false
            };
          }
          if(segData[i].imgCheckBoxSelect.src === "checkboxselected.png" || segData[i].imgCheckBoxSelect.src === "checkboxDisableBg_2x.png") {
            count++;
          }
          var serviceDefObj = {"id" : businessData[j].id, 
                   "isDefault" : (businessData[j].isDefaultGroup === "true" ||businessData[j].isDefaultGroup === "1" ) &&  self.groupsCurrAction === self.groupActionConfig.EDIT ? "1": "0"};
          serviceDefForPayload.push(serviceDefObj);
          continue;
        }
      }
    }
    if(count === segData.length){
      this.view.imgCheckBoxSelect.src = "checkboxselected.png";
    }
    else if (count === 0){
      this.view.imgCheckBoxSelect.src = "checkboxnormal.png";
    }
    else
      this.view.imgCheckBoxSelect.src = "checkboxpartial.png";
    self.view.segRoleBusinessTypes.setData(segData);
    if(self.groupsCurrAction !== self.groupActionConfig.COPY)
      self.view.segRoleBusinessTypes.info={"addedOrUpdatedBusinessTypes":[],"removedBusinessTypes":[]};
    
    //update servicedef param in payload
    self.createRequestParam.servicedefinitions = serviceDefForPayload;
    self.view.forceLayout();
  },
  setViewFeaturesList : function(response){
    var self=this;
    var featuresList= response.features;
    var limitsList = self.filterForMonetaryFeatures(JSON.stringify(response.features));
    var selRow = self.view.listingSegmentClient.segListing.selectedRowIndex;
    document.getElementById("frmGroups_flxGroupview").onscroll = this.appendMoreOnEndForViewFeatures;
    self.getMoreDataModel = {
      "PAGE_OFFSET": 0
    };
    self.view.segViewCustRoleFeatures.setData([]);
    self.view.lblFeatures.info={"features":featuresList,"limits":limitsList };
    //self.view.lblFeatures.text = kony.i18n.getLocalizedString("i18n.leftmenu.ServicesLC").toUpperCase()+" ("+featuresList.length+")"; 
    //self.view.lblCustomersFix.text = kony.i18n.getLocalizedString("i18n.Group.Customers")+" ("+self.view.listingSegmentClient.segListing.data[selRow[1]].lblGroupCustomers.text+")"; 
    // self.view.flxTableView.setVisibility(false);
    if(featuresList.length>0){
      self.view.flxDynamicLimits.removeAll();
      self.setDynamicFeatures(0,10);
      if(limitsList.length > 0)
        self.setDynamicLimitsView(0, 10);
      self.getMoreDataModel.PAGE_OFFSET = 10;
      self.view.flxNoResultMessage.setVisibility(false);
      self.view.flxCustRoleViewFeatures.setVisibility(true);
    }else{
      self.view.flxNoResultMessage.setVisibility(true);
      self.view.flxCustRoleViewFeatures.setVisibility(false);
    }
    self.view.flxDynamicLimits.setVisibility(false);
    self.view.forceLayout();
  },
  filterForMonetaryFeatures : function(features){ 
    var monetaryFeatures =[];
    var allFeatures = JSON.parse(features);
    for(var i=0; i<allFeatures.length; i++){
      var monetaryActions = [];
      for(var j=0; j<allFeatures[i].actions.length; j++){
        if(allFeatures[i].actions[j].limits){
          monetaryActions.push(allFeatures[i].actions[j]);
        }
      }
      allFeatures[i].actions = monetaryActions;
      if(monetaryActions.length > 0){
        monetaryFeatures.push(allFeatures[i]);
      } 
    }
    return monetaryFeatures;
  },
  appendMoreOnEndForViewFeatures: function(context){
    var self = this;
    var offsetHeight = Math.ceil(context.currentTarget.offsetHeight);
    var scrollTop = Math.ceil(context.currentTarget.scrollTop);
    var scrollHeight = Math.ceil(context.currentTarget.scrollHeight);
    
    if( offsetHeight + scrollTop >= scrollHeight - offsetHeight -50 && offsetHeight + scrollTop <= scrollHeight) {
      var featuresToAppend;
      //features tab
      if(self.view.flxFeaturesHeader.info.selectedTab === 1){
        featuresToAppend= self.view.lblFeatures.info.features;
        if(self.getMoreDataModel.PAGE_OFFSET < featuresToAppend.length){
          self.setDynamicFeatures(self.getMoreDataModel.PAGE_OFFSET,self.getMoreDataModel.PAGE_OFFSET + 10);
          self.getMoreDataModel.PAGE_OFFSET = self.getMoreDataModel.PAGE_OFFSET + 10;
        }
      } //limits tab 
      else if(self.view.flxFeaturesHeader.info.selectedTab === 2){
        featuresToAppend= self.view.lblFeatures.info.limits;
        if(self.getMoreDataModel.PAGE_OFFSET < featuresToAppend.length){
          self.setDynamicLimitsView(self.getMoreDataModel.PAGE_OFFSET,self.getMoreDataModel.PAGE_OFFSET + 3);
          self.getMoreDataModel.PAGE_OFFSET = self.getMoreDataModel.PAGE_OFFSET + 3;
        }
      }
    }
  },
    /*
  * append more features data when scroll reaches to end 
  */
  appendMoreRecordsReachingEnd: function(context){
    var self = this ;
    if(Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight)){
      var featuresToAppend= self.view.lblFeatures.info.features;
        if(self.getMoreDataModel.PAGE_OFFSET < featuresToAppend.length){
          kony.adminConsole.utils.showProgressBar(self.view);
          self.setDynamicFeatures(featuresToAppend.slice(self.getMoreDataModel.PAGE_OFFSET,self.getMoreDataModel.PAGE_OFFSET + self.featureRecordsSize));
          self.getMoreDataModel.PAGE_OFFSET = self.getMoreDataModel.PAGE_OFFSET + self.featureRecordsSize; 
        }
    }
  },
  /*
  * store the list of actual actioned assigned to group
  * @param: action data
  */
  storeAssignedActionsForRemoveAll : function(action){
    var self =this;
    var assignedAction = [];
    if(action.isSelected === "true"){
      self.actualAssignedActions.push(action);
    }
  },
  /*
  * get 2 digit string number
  * @param: number
  * @return: 2-digit sting number
  */
  getTwoDigitNumber : function(count){
    var updatedCount =0;
    count = parseInt(count,10);
    if(count <= 9){
      updatedCount = "0"+count;
    } else{
      updatedCount = count;
    }
    return updatedCount+ "";
  },
   /*
  * checks for the newly added actions while edit
  */
  getNewlyAddedActionsOnEdit : function(){
    var addedActions =[], initialActions =[];
    //initial actions assigned to cust role
    for(var p=0; p<this.groupFeatures.length; p++){
      for(var q=0; q<this.groupFeatures[p].actions.length; q++){
        initialActions.push(this.groupFeatures[p].actions[q].id);
      }
    }
    //newly added actions
    for(var i=0;i<this.roleFeatures.length;i++){
      for(var j=0;j<this.roleFeatures[i].actions.length;j++){
        if(!initialActions.includes(this.roleFeatures[i].actions[j].id) &&
            this.roleFeatures[i].actions[j].isSelected===1){
          addedActions.push(this.roleFeatures[i].actions[j].id);
        }
      }
    }
    return addedActions;
  },
});
define(['AdminConsoleCommonUtilities'],function( CommonUtilities) {
  return {
    createServiceReqParam: null,
    editFeatureReqParam : null,
    editFacilityReqParam: null,  
    actionStatusReqParam : null,
    editLimitGroupReqParam : null,
    globalSelectedItem : 0,
    currSelectedIndex : 0,
    featuresRecList:null,
    actionsRecList:null,
    firstLoad : false,
    prevIndex : -1,
    isActionEdit : false,
    currSuccessMsg:"",
    successMsgParam :{
      EDIT:"EDIT"
    },
    facilityOption: "",
    facilityOptionView: "", 
    facilitiesListResponse: [],
    facilityFeaturesEdit: [],
    facilityFeaturesAdd: [],
    listFeaturesComponentsOfFacility: [],
    currencyIconValue: "\ue96c",
    selectedLegalEntity: null,
    selectedLegalEntityId: null,
    selectedLegalEntityCurrency: null,
    legalEntityList:[],
    preShowActions : function() {
      this.setFlowActions();
      this.preShowData();
      this.setScrollHeight();
    },

    preShowData: function(){
      // To do: Fetch the data from the back end service

      /*  As the data has to get from the service we are giving static data here*/

      var statusData=[];
      var self = this;

      var widgetMap = {
        //"customerStatusId": "customerStatusId",
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblCheckbox": "lblCheckbox",
        "lblDescription": "lblDescription",
        "legalEntityId": "legalEntityId"
      };
     // this.legalEntityList = this.presenter.fetchCurrUserLegalEntityList();
      var LEDataPermissionRelated=this.getLEListForFormAction("frmServiceManagement",'VIEW');
      var records =
        [...LEDataPermissionRelated].sort((a, b) => {
          let fa = a.companyName.toLowerCase(),
            fb = b.companyName.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      var statusData = records.map(function(rec){    
        return {
          // "customerStatusId": rec.id,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": {"isVisible": false},
          "lblDescription": rec.companyName,
          "legalEntityId": rec.id,
          "onRowClick": function() {
            self.segRowClick(rec);
          }
        };
      });
      this.view.segFacilities.setData([]);
      this.view.statusFilterMenu.segEntityFilterDropdown.setVisibility(false);
      this.view.statusFilterMenu.lblSeparator.setVisibility(false);
      this.view.statusFilterMenu.flxActiveInactiveContainer.setVisibility(false);
      this.view.TypeFilterMenu.segEntityFilterDropdown.setVisibility(false);
      this.view.TypeFilterMenu.lblSeparator.setVisibility(false);
      this.view.TypeFilterMenu.flxActiveInactiveContainer.setVisibility(false);
      this.view.actionStatusDetailsFilter.segEntityFilterDropdown.setVisibility(false);
      this.view.actionStatusDetailsFilter.lblSeparator.setVisibility(false);
      this.view.actionStatusDetailsFilter.flxActiveInactiveContainer.setVisibility(false);
      this.view.lblSelectedRowsServType.text= records[0].companyName;
      this.selectedLegalEntity = records[0].companyName;
      this.selectedLegalEntityId = records[0].id;
      this.selectedLegalEntityCurrency = records[0].baseCurrency;
      this.view.flxDropDownServType.onClick = this.toggleDropdown;

      //this.view.AdvancedSearchDropDownServType.sgmentData.height = (40 * records.length) + "dp";

      this.view.AdvancedSearchDropDownServType.sgmentData.widgetDataMap = widgetMap;
      this.view.AdvancedSearchDropDownServType.sgmentData.setData(statusData);
      this.view.AdvancedSearchDropDownServType.sgmentData.info={"data":statusData};
      this.view.AdvancedSearchDropDownServType.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
      this.view.flxServiceManagement.height = kony.os.deviceInfo().screenHeight + "px";
      this.view.flxMainContent.setVisibility(true);
      this.view.mainHeader.lblHeading.centerY = "80";
      this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.FeaturesAndFacilities");
      this.view.flxFeatureStatusFilter.setVisibility(false);
      this.view.flxContextualMenu.setVisibility(false);
      this.view.flxContextualMenuAction.setVisibility(false);
      this.view.searchBoxFeatures.tbxSearchBox.text="";
      this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Search_by_Service_Name");
      this.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
      // for the search in the page of the list of facilities
      this.view.subHeaderFacilities.tbxSearchBox.text="";
      this.view.subHeaderFacilities.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Search_by_Facility_Name");
      this.view.subHeaderFacilities.flxClearSearchImage.setVisibility(false);
      // for the search in the facility details view page
      this.view.viewDetailsAction.search.tbxSearchBox.text="";
      this.view.viewDetailsAction.search.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Search_by_Feature_Action_Name");
      this.view.viewDetailsAction.search.flxSearchCancel.setVisibility(false);

      this.view.contextualMenu.lblHeader.setVisibility(false);
      this.view.contextualMenu.btnLink1.setVisibility(false);
      this.view.contextualMenu.btnLink2.setVisibility(false);
      this.view.contextualMenu.flxOptionsSeperator.setVisibility(false);
      this.view.contextualMenu.flxOption4.setVisibility(false);
      this.view.contextualMenu.flxOption3.setVisibility(false);
      this.view.contextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
      this.view.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.contextualMenuAction.lblHeader.setVisibility(false);
      this.view.contextualMenuAction.btnLink1.setVisibility(false);
      this.view.contextualMenuAction.btnLink2.setVisibility(false);
      this.view.contextualMenuAction.flxOptionsSeperator.setVisibility(false);
      this.view.contextualMenuAction.flxOption4.setVisibility(false);
      this.view.contextualMenuAction.flxOption3.setVisibility(false);
      this.view.contextualMenuAction.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
      this.view.contextualMenuAction.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.flxToastMessage.setVisibility(false);
      this.view.flxScrollViewServices.setVisibility(true);
      this.view.flxViewServiceData.setVisibility(false);
      this.setSegmentSelectionProperty();
      this.view.FeaturesFacilitiesTabs.flxSelected1.setVisibility(true);
      this.view.FeaturesFacilitiesTabs.flxSelected2.setVisibility(false);
      this.view.FeaturesFacilitiesTabs.flxSelectedBorder1.setVisibility(false);
      this.view.FeaturesFacilitiesTabs.flxSelectedBorder2.setVisibility(true);  
      this.view.FeaturesFacilitiesTabs.lblStatus1.skin = "sknLabelTabs";
      this.view.FeaturesFacilitiesTabs.lblStatus2.skin = "sknLabelTabs";
      this.view.FeaturesFacilitiesTabs.lblStatus1.height = 13 + "px";
      this.view.FeaturesFacilitiesTabs.lblStatus2.height = 13 + "px";
      this.view.FeaturesFacilitiesTabs.flxFacilities.lblCount2.text = " ";    
      this.view.FeaturesFacilitiesTabs.flxFeatures.lblCount1.text = " ";     
      this.currencyIconValue = this.defaultCurrencyCode(this.selectedLegalEntityCurrency,true);
      this.view.flxDropDownDetailServType.setVisibility(false);
     // this.view.AdvancedSearchDropDownServType.sgmentData.onRowClick = this.segRowClick
      this.view.AdvancedSearchDropDownServType.tbxSearchBox.onKeyUp = this.entitySearch.bind(this); 
      this.view.AdvancedSearchDropDownServType.tbxSearchBox.text = "";
      this.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
      this.view.forceLayout();
    },
    //function for selecting the row in the segment
    segRowClick: function (rowObject) {
      const selectedData = this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowItems[0];
      this.view.flxDropDownDetailServType.setVisibility(false);
      this.view.lblSelectedRowsServType.text = rowObject.companyName;
      this.selectedLegalEntity = rowObject.companyName;
      this.selectedLegalEntityId = rowObject.id;
      this.selectedLegalEntityCurrency = rowObject.baseCurrency;
      this.currencyIconValue = this.defaultCurrencyCode(rowObject.baseCurrency,true);
      this.view.segFeatures.setData([]);
      this.presenter.fetchAllFeatures(this.selectedLegalEntityId);
    },

    //function for searcing the entity in the drop down

    entitySearch: function(){
      // scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(segData);
      if (this.view.AdvancedSearchDropDownServType.tbxSearchBox.text.trim().length > 0) {
        this.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(true);
        // var segData=entityData;
        var segData = this.view.AdvancedSearchDropDownServType.sgmentData.data;
        var searchText = this.view.AdvancedSearchDropDownServType.tbxSearchBox.text.toLowerCase();
        var statusName = "";
        var filteredData = segData.filter(function(rec) {
          statusName = rec.lblDescription.toLowerCase();
          if (statusName.indexOf(searchText) >= 0) return rec;
        });
        if (filteredData.length === 0) {
          this.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(false);
          this.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(true);
        } else {
          this.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
          this.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
          this.view.AdvancedSearchDropDownServType.sgmentData.setData(filteredData);
        }
      } else {
          this.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
          this.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
          this.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
          var totalRecords = this.view.AdvancedSearchDropDownServType.sgmentData.info.data;
          this.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
      }
      this.view.forceLayout();
    },





    willUpdateUI: function(serviceModel) {
      this.updateLeftMenu(serviceModel);
      var scopeObj = this;

      // View or Edit a facility
      if (serviceModel.facilityFeaturesList) {
        scopeObj.facilityFeaturesEdit = serviceModel.facilityFeaturesList.facilities[0];
        // After click on Edit Option
        if (serviceModel.context == "editFacility") {
          var index = scopeObj.view.segFacilities.selectedRowIndex;
          var rowInd = index[1];
          var rowData = scopeObj.view.segFacilities.data[rowInd];
          this.prefillFacilityDataForEdit(scopeObj.facilityFeaturesEdit.features, "", rowData.code, rowData.facilityId, scopeObj.facilityFeaturesEdit.facilityName, scopeObj.facilityFeaturesEdit.description);
        } else {

          // View
          scopeObj.showViewFacilityScreen();
          scopeObj.setViewFacilityData("detailsView");
        }

      } else if (serviceModel.allFeaturesForEmptyFacilitiesList) {
        scopeObj.facilitiesListResponse = scopeObj.setFacilitiesSegmentDataForEmptyFacilitiesList(serviceModel.allFeaturesForEmptyFacilitiesList);
        // Click add facility button in facility list header section
        // Click NEW add facility button in the facility list that has no facilities
        scopeObj.showAddFacilitiesBasicDetailsScreen("addFacility",scopeObj.facilitiesListResponse.facilities[0].features);
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.products.Add_Facility");  

      } 
      if (serviceModel.facilitiesList) {   
        //scopeObj.facilitiesListResponse = scopeObj.getMockFacilitiesList();      
        scopeObj.facilitiesListResponse = serviceModel.facilitiesList.facilities;
        //scopeObj.presenter.getAccountLevelFeatureAction();
        scopeObj.setFacilitiesSegmentData(scopeObj.facilitiesListResponse);
        scopeObj.sortBy = scopeObj.getObjectSorter("facilityName");
        scopeObj.resetSortImagesOnFacilities();
        // for the search in the page of the list of facilities
        if (scopeObj.facilitiesListResponse.length === 0) {
          scopeObj.view.subHeaderFacilities.flxSearch.setVisibility(false);
          scopeObj.view.subHeaderFacilities.flxVerticalSeparator.setVisibility(false);
        }
        scopeObj.view.subHeaderFacilities.tbxSearchBox.text="";
        scopeObj.loadPageDataFacilities = function() {
          var searchResult = scopeObj.facilitiesListResponse
          .filter(scopeObj.searchFilterFacilities)
          .sort(scopeObj.sortBy.sortData);
          scopeObj.setFacilitiesSegmentData(searchResult);
        };
        scopeObj.view.FeaturesFacilitiesTabs.flxFacilities.lblCount2.text = (scopeObj.facilitiesListResponse.length < 10) ? "0" + scopeObj.facilitiesListResponse.length : scopeObj.facilitiesListResponse.length;    
        scopeObj.loadPageDataFacilities();
        scopeObj.viewFacilities();
        if (scopeObj.facilityOption == "editFacility") {
          // Reload the data in view screen after an update
          scopeObj.setViewFacilityData("detailsView");
        }
      } 
      if (serviceModel.featuresList) {      
        // Read the facilities list - API call
        if(serviceModel.featuresList.length === 0){
          scopeObj.view.segFeatures.setData([]);
          scopeObj.view.flxAddServiceMainNoFeature.setVisibility(true);
          scopeObj.view.FeaturesFacilitiesTabs.flxFeatures.lblCount1.text = "0";
          scopeObj.view.FeaturesFacilitiesTabs.flxSelected1.setVisibility(true);
          scopeObj.view.FeaturesFacilitiesTabs.flxSelected2.setVisibility(false);
          scopeObj.showAddService();
        }else{
          scopeObj.featuresRecList = serviceModel.featuresList;
          scopeObj.setListFiltersData();
          scopeObj.firstLoad = true;
          scopeObj.sortBy = scopeObj.getObjectSorter("name");
          scopeObj.resetSortImages();
          scopeObj.view.searchBoxFeatures.tbxSearchBox.text="";
           this.view.flxViewServicesWrapper.setVisibility(true);
          scopeObj.loadPageData = function() {
            var searchResult = scopeObj.featuresRecList
            .filter(scopeObj.searchFilter)
            .sort(scopeObj.sortBy.sortData);
            scopeObj.records = scopeObj.featuresRecList.filter(scopeObj.searchFilter).length;
            var searchFiltered = scopeObj.filterBasedOnTypeStatus(searchResult);
            scopeObj.setFeaturesSegmentData(searchFiltered);
          };
          scopeObj.loadPageData();
          scopeObj.viewServices();
          scopeObj.view.FeaturesFacilitiesTabs.flxFeatures.lblCount1.text = (scopeObj.featuresRecList.length < 10) ? "0" + scopeObj.featuresRecList.length : scopeObj.featuresRecList.length;   
        }
      }else if (serviceModel.masterDataServices) {
        if (serviceModel.masterDataServices.serviceChannel || serviceModel.masterDataServices.serviceType ||serviceModel.masterDataServices.serviceCategory) {
          // scopeObj.addServicesMasterDataMappings(serviceModel.masterDataServices);
        }
      }else if (serviceModel.toast) {
        if (serviceModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(serviceModel.toast.message, this);        
        } else {
          this.view.toastMessage.showErrorToastMessage(serviceModel.toast.message, this);
        }
      }else if(serviceModel.LoadingScreen){
        if(serviceModel.LoadingScreen.show){
          kony.adminConsole.utils.showProgressBar(this.view);
        }else{
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      } else if(serviceModel.statusUpdateTo){
        this.updateFeatureDetailScreenStatus(serviceModel.statusUpdateTo);
      } else if(serviceModel.actionsOfFeature && serviceModel.context === "detailsView"){
        if(this.currSuccessMsg===this.successMsgParam.EDIT)
          this.showViewFeatureScreen();
        this.actionsRecList = serviceModel.actionsOfFeature;
        this.mapActionsList(serviceModel.actionsOfFeature);
      }
      else if(serviceModel.actionsOfFeature && serviceModel.context === "editView"){
        this.setFeaturedActionsData(serviceModel.actionsOfFeature,true);
        this.view.flxEditFeaturePopup.setVisibility(true);
        if(this.isActionEdit===true){
          scopeObj.isActionEdit=false;
          var selInd=scopeObj.view.segActionList.selectedRowIndex;
          scopeObj.subTabsButtonUtilFunction([scopeObj.view.btnFeatures,scopeObj.view.btnActions],scopeObj.view.btnActions);
          scopeObj.view.segFeaturedActions.selectedRowIndex= selInd;
          scopeObj.toggleSelectedRow();
          scopeObj.mapDependencies(scopeObj.view.segFeaturedActions.data[selInd[1]].dependentActions);
          scopeObj.view.flxFeaturedAction.setVisibility(true);
          scopeObj.view.flxFeatureContainer.setVisibility(false);
          scopeObj.view.forceLayout();
        }
      }
      else if(serviceModel.actionsOfFeature && serviceModel.context === "editLimits"){
        this.setFeaturedActionsData(serviceModel.actionsOfFeature, false);
        this.selectRequiredLimit();
        this.view.flxEditFeaturePopup.setVisibility(true);
      }
      if (serviceModel.localeLanguages) {
        this.setLanguagesList(serviceModel.localeLanguages, true);
      }
      if (serviceModel.limitGroups) {
        scopeObj.setLimitGroupsData(serviceModel.limitGroups.limitGroups);
      }
      scopeObj.view.forceLayout();
    },
    setScrollHeight: function () {
      var screenHeight = kony.os.deviceInfo().screenHeight;
      var scrollHeight = screenHeight - 150;
      this.view.flxMainContent.height = scrollHeight + "px";
    },
    toggleDropdown: function () {
      if (this.view.flxDropDownDetailServType.isVisible) {
        this.view.flxDropDownDetailServType.setVisibility(false);
        //this.view.lblSelectedRowsMultipleEntity.text = "";
      } else {
        this.view.flxDropDownDetailServType.setVisibility(true);
        // this.view.lblSelectedRowsMultipleEntity.text = "";
      }
    },

    setFlowActions: function () {
      var scopeObj = this;

      this.view.flxContextualMenu.onHover = scopeObj.onHoverEventCallback;
      this.view.flxContextualMenuAction.onHover = scopeObj.onHoverEventCallback;
      this.view.flxFeatureStatusFilter.onHover = scopeObj.onHoverEventCallback;
      this.view.flxFeatureTypeFilter.onHover = scopeObj.onHoverEventCallback;
      this.view.flxLanguages.onHover = scopeObj.onHoverEventCallback;
      this.view.flxFeatureDetailsContextualMenu.onHover = scopeObj.onHoverEventCallback;
      this.view.flxActionDetailsContextualMenu.onHover = scopeObj.onHoverEventCallback;
      this.view.flxDetailsActionTypeFilter.onHover = scopeObj.onHoverEventCallback;
      this.view.flxTCPopupLanguages.onHover = scopeObj.onHoverEventCallback;
      this.view.flxFeatureLanguages.onHover = scopeObj.onHoverEventCallback;
      this.view.flxActionLanguages.onHover = scopeObj.onHoverEventCallback;
      this.view.displayContentView.flxLanguages.onHover = scopeObj.onHoverEventCallback;
      this.view.flxFeaturesSettingsDropdown.onHover = scopeObj.onHoverEventCallback;

      // features and facilities tab

      this.view.FeaturesFacilitiesTabs.flxFeatures.onTouchEnd = function (){
        scopeObj.view.flxMainContent.setVisibility(true); 
        scopeObj.view.flxMainContentFacilities.setVisibility(false);   
        scopeObj.view.FeaturesFacilitiesTabs.flxSelected1.setVisibility(true);
        scopeObj.view.FeaturesFacilitiesTabs.flxSelected2.setVisibility(false); 
        scopeObj.view.FeaturesFacilitiesTabs.flxSelectedBorder1.setVisibility(false); 
        scopeObj.view.FeaturesFacilitiesTabs.flxSelectedBorder2.setVisibility(true);
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus1.skin = "sknLabelTabs";
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus2.skin = "sknLabelTabs";
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus1.height = 13 + "px";
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus2.height = 13 + "px";
        scopeObj.view.flxFacilities.setVisibility(false); 
      };

      this.view.FeaturesFacilitiesTabs.flxFacilities.onTouchEnd = function (){
        scopeObj.view.flxMainContent.setVisibility(false); 
        scopeObj.view.flxMainContentFacilities.setVisibility(true); 
        scopeObj.view.flxScrollViewFacilities.setVisibility(true);
        scopeObj.view.FeaturesFacilitiesTabs.flxSelected1.setVisibility(false);   
        scopeObj.view.FeaturesFacilitiesTabs.flxSelected2.setVisibility(true);
        scopeObj.view.FeaturesFacilitiesTabs.flxSelectedBorder1.setVisibility(true);  
        scopeObj.view.FeaturesFacilitiesTabs.flxSelectedBorder2.setVisibility(false);
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus1.skin = "sknLabelTabs";
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus2.skin = "sknLabelTabs";
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus1.height = 13 + "px";
        scopeObj.view.FeaturesFacilitiesTabs.lblStatus2.height = 13 + "px";
        scopeObj.view.flxFacilities.setVisibility(false);   
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.FeaturesAndFacilities");
      };

      this.view.btnFeatures.onClick = function(){
        if(scopeObj.view.flxFeaturedAction.isVisible&&scopeObj.validateLimitFields()&&scopeObj.validateFieldsAction()){
          scopeObj.subTabsButtonUtilFunction([scopeObj.view.btnFeatures,scopeObj.view.btnActions],scopeObj.view.btnFeatures);
          scopeObj.view.flxFeaturedAction.setVisibility(false);
          scopeObj.view.flxFeatureContainer.setVisibility(true);
          scopeObj.view.forceLayout();      
        }
      };
      this.view.btnActions.onClick = function(){
        scopeObj.prevSelLang=scopeObj.view.lblSelectedLanguage.info.selLang.langCode;
        if(scopeObj.view.flxFeatureContainer.isVisible&&scopeObj.validateFields()){
          scopeObj.subTabsButtonUtilFunction([scopeObj.view.btnFeatures,scopeObj.view.btnActions],scopeObj.view.btnActions);
          scopeObj.view.segFeaturedActions.selectedRowIndex=[0,0];
          var selInd=scopeObj.view.segFeaturedActions.selectedRowIndex;
          scopeObj.toggleSelectedRow();
          scopeObj.mapDependencies(scopeObj.view.segFeaturedActions.data[selInd[1]].dependentActions);
          scopeObj.view.flxFeaturedAction.setVisibility(true);
          scopeObj.view.flxFeatureContainer.setVisibility(false);
          scopeObj.view.forceLayout();
        }
      };
      this.view.breadcrumbs.btnPreviousPage.onClick = function(){
        scopeObj.showViewFeatureScreen();
      };

      /*################ ADD and EDIT FACILITY events ################ START*/

      this.view.subHeaderFacilities.btnAddFacilities.onClick = function() {
        scopeObj.presenter.getAccountLevelFeatureAction();  
      };
      this.view.btnAddNewFacilities.onClick = function() {    
        scopeObj.presenter.getAccountLevelFeatureAction();
      };	
      this.view.addFacility.flxOption1Container.onClick = function() {
        if(scopeObj.facilityOption === "addFacility") {
          scopeObj.showAddFacilitiesBasicDetailsScreen("addFacilityBasicClick");
        } else if(scopeObj.facilityOption === "editFacility") {
          scopeObj.showAddFacilitiesBasicDetailsScreen("editFacilityBasicClick");
        } else {
          scopeObj.showAddFacilitiesBasicDetailsScreen(scopeObj.facilityOption);
        } 
      };
      this.view.addFacility.flxOption2Container.onClick = function() {
        scopeObj.showAddFacilitiesFeaturesAndActionsScreen();
      };
      this.view.addFacility.btnAddFacilityNext.onClick = function() {
        scopeObj.showAddFacilitiesFeaturesAndActionsScreen();
      };
      this.view.addFacility.btnAddFacility.onClick = function() {
        scopeObj.addFacilityDetails();
      };
      this.view.addFacility.btnCancelAddFacility.onClick = function() {
        scopeObj.cancelAddFacilitiesScreen(scopeObj.facilityOptionView);
        if (scopeObj.facilityOptionView == "") {
          scopeObj.presenter.getAllFacilities();
        }
      };

      this.view.addFacility.tbxAddFacilityName.onKeyDown = function(){
        var isSpecialCharacter = scopeObj.restrictSpecialCharactersFacilityName('frmServiceManagement_addFacility_tbxAddFacilityName');
        if(!isSpecialCharacter){
          scopeObj.view.addFacility.tbxAddFacilityName.onKeyUp = function(){
            scopeObj.view.addFacility.tbxAddFacilityName.skin = "skntbxLato35475f14px";
            scopeObj.view.addFacility.flxErrorMsg1.isVisible = false;
            scopeObj.view.addFacility.lblFacilityNameTextCounter.text=(scopeObj.view.addFacility.tbxAddFacilityName.text.length) +"/50";
            scopeObj.view.forceLayout();
          }
        } else {
          return false;
        }

      };
      this.view.addFacility.tbxAddFacilityCode.onKeyUp = function(){
        scopeObj.view.addFacility.tbxAddFacilityCode.skin = "skntbxLato35475f14px";
        scopeObj.view.addFacility.lblFacilityCodeTextCounter.text=scopeObj.view.addFacility.tbxAddFacilityCode.text.length+"/50";
        scopeObj.view.addFacility.flxErrorMsg2.isVisible = false;
        scopeObj.view.forceLayout();
      };
      this.view.addFacility.txtAreaFacilityDescription.onKeyUp = function(){
        scopeObj.view.addFacility.txtAreaFacilityDescription.skin = "skntbxLato35475f14px";
        scopeObj.view.addFacility.lblFacilityDescTextCounter.text=scopeObj.view.addFacility.txtAreaFacilityDescription.text.length+"/300";
        scopeObj.view.forceLayout();
      };
      this.view.addFacility.btnUpdateFacility.onClick = function(){
        scopeObj.updateFacilityDetails();
      };
      this.view.viewDetailsAction.flxViewEditButton.onClick = function(){
        scopeObj.presenter.getFacilityDetails(scopeObj.view.segFacilities.data[scopeObj.view.segFacilities.selectedRowIndex[1]].facilityId,"editFacility");
      };
      // for treatments of search amongst the features and actions of the current facility, in the facility details add page
      this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.onKeyUp = function() {
        if(scopeObj.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text.length >= 0 ) {
          if(!scopeObj.containSpecialChars(scopeObj.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text)){
            scopeObj.filterFeaturesActionsOnAddEditFacilityPage(this.facilityOption);
          }
          if(scopeObj.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text === "") {
            scopeObj.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false);
          } else {
            scopeObj.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(true);
          }
        } else {
          scopeObj.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false);
        }
        scopeObj.view.forceLayout();
      };
      
      this.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick = function(){
               var totalRecords = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.info.data;
                scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
                scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text = ""; 
                scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
                scopeObj.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
                scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
              };

      // for treatments of search amongst the features and actions of the current facility, in the facility details add page, to cancel search
      this.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.onClick = function() {
        scopeObj.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text = "";
        scopeObj.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false);
        scopeObj.filterFeaturesActionsOnAddEditFacilityPage(this.facilityOption);
        scopeObj.view.forceLayout();
      };

      this.view.addFacility.flxSelectAllFeatures.onClick = function(){
        scopeObj.selectUnselectAllFeatures("selectAll");
      };
      this.view.addFacility.lblUnselectAllFeatures.onClick = function(){
        scopeObj.selectUnselectAllFeatures("unselectAll");
      };
      this.view.addFacility.breadcrumbs.btnBackToMain.onClick = function() {
        scopeObj.cancelAddFacilitiesScreen("");
        scopeObj.presenter.getAllFacilities();
      };

      this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.onTouchStart = function(){
        scopeObj.view.addFacility.searchBoxAddProdFeatures.setSearchBoxFocus(true);
      };
      this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.onEndEditing = function(){
        scopeObj.view.addFacility.searchBoxAddProdFeatures.setSearchBoxFocus(false);
      };

      /*################ ADD and EDIT FACILITY events ################ END*/

      this.view.segFeatures.onRowClick = function(){
        scopeObj.showViewFeatureScreen();
        scopeObj.setViewFeatureData();
        var selRowData = scopeObj.view.segFeatures.selectedRowItems;
        var inputReq = {"context": "detailsView",
                        "requestParam": {"featureId": selRowData[0].id , "legalEntityId":selRowData[0].legalEntityId}
                       };
        scopeObj.presenter.getActionsOfFeature(inputReq);
      };

      /* Display the facility details view page, when clicking a row in segment */
      this.view.segFacilities.onRowClick = function(){
        scopeObj.presenter.getFacilityDetails(scopeObj.view.segFacilities.selectedRowItems[0].facilityId, "detailsView");
      };

      this.view.segActionList.onRowClick = function(){
        var selRowData = scopeObj.view.segActionList.selectedRowItems;
        scopeObj.showViewActionScreen();
        scopeObj.setViewActionData();
        scopeObj.mapDependencies(selRowData[0].dependentActions);
      };
      this.view.breadcrumbs.btnBackToMain.onClick = function() {
        scopeObj.getAllFeatures(scopeObj.selectedLegalEntityId);
        scopeObj.hideService();
      };
      this.view.contextualMenu.flxOption2.onClick = function(){
        if(scopeObj.view.contextualMenu.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
          scopeObj.showDeactivatePopup(1);
        }
        else {
          scopeObj.deactivateService();
          scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
        }
      };
      this.view.contextualMenuAction.flxOption2.onClick = function(){
        var index = scopeObj.view.segFeatures.selectedRowIndex;
        var rowInd = index[1];
        var rowData = scopeObj.view.segFeatures.data[rowInd];
        if(scopeObj.view.contextualMenuAction.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
          scopeObj.showDeactivatePopup(2);
        }
        else if(scopeObj.view.contextualMenuAction.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate") && scopeObj.view.lblFeatureDetailsStatusValue.text === "Inactive"){
          scopeObj.showActivatePopup(1);
        }
        else {
          scopeObj.deactivateAction(rowData);
        }
      };
      this.view.contextualMenu.flxOption1.onClick = function(){
        scopeObj.prefillFeatureDataForEdit();
        scopeObj.view.flxFeaturedAction.setVisibility(false);
      };
      this.view.contextualMenuAction.flxOption1.onClick = function(){
        scopeObj.isActionEdit=true;
        scopeObj.prefillFeatureDataForEdit();      
      };
      this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
        scopeObj.deactivateService();
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      };

      this.view.popUpDeactivate.btnPopUpCancel.onClick = function() {
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      };
      this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      };
      this.view.popupError.flxPopUpClose.onClick = function(){
        scopeObj.view.flxActivateActionPopup.setVisibility(false);
      };
      this.view.popupError.btnPopUpCancel.onClick = function(){
        scopeObj.view.flxActivateActionPopup.setVisibility(false);
      };
      this.view.flxCloseDependency.onClick = function(){
        scopeObj.view.flxDependencyPopup.setVisibility(false);
      };
      this.view.flxCloseLimitGroup.onClick = function(){
        scopeObj.view.flxLimitGroupPopup.setVisibility(false);
      };
      this.view.btnCancelLimitGroupPopup.onClick = function(){
        scopeObj.view.flxLimitGroupPopup.setVisibility(false);
      };
      this.view.btnUpdateLimitGroup.onClick = function(){ 
        scopeObj.prevSelLangLimitGroup = scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode;
        if(scopeObj.validateFieldsLimitGroup()){
          scopeObj.view.flxLimitGroupPopup.setVisibility(false);
          scopeObj.presenter.editLimitGroup(scopeObj.editLimitGroupReqParam);
        }
      };
      this.view.btnEditLimitGroup.onClick = function(){
        scopeObj.showEditLimitGroupPopup();
      };
      this.view.flxFeatureName.onClick = function () {
        scopeObj.sortData("name");
        scopeObj.view.segFeatures.height = "100%";
      };
      this.view.flxFeatureCode.onClick = function () {
        scopeObj.sortData("id");
        scopeObj.view.segFeatures.height = "100%";
      };
      this.view.flxFacilityName.onClick = function () {
        scopeObj.sortDataFacilities("facilityName");
        scopeObj.view.segFacilities.height = "100%";
      };
      this.view.flxNbOfFeatures.onClick = function () {
        scopeObj.sortDataFacilities("numOfFeatures");
        scopeObj.view.segFacilities.height = "100%";
      };
      this.view.flxFeatureType.onClick = function(){
        var flxRight = scopeObj.view.flxHeaderFeatures.frame.width - scopeObj.view.flxFeatureType.frame.x - scopeObj.view.flxFeatureType.frame.width;
        var iconRight = scopeObj.view.flxFeatureType.frame.width - scopeObj.view.fontIconTypeFilter.frame.x;
        scopeObj.view.flxFeatureTypeFilter.right = (flxRight + iconRight - 8) +"px";
        scopeObj.view.flxFeatureTypeFilter.setVisibility(!scopeObj.view.flxFeatureTypeFilter.isVisible);
        if(scopeObj.view.flxContextualMenu.isVisible){
          scopeObj.view.flxContextualMenu.setVisibility(false);
        }
        if(scopeObj.view.flxFeatureStatusFilter.isVisible){
          scopeObj.view.flxFeatureStatusFilter.setVisibility(false);
        }
      };
      this.view.flxFeatureStatus.onClick = function(){
        var flxRight = scopeObj.view.flxHeaderFeatures.frame.width - scopeObj.view.flxFeatureStatus.frame.x - scopeObj.view.flxFeatureStatus.frame.width;
        var iconRight = scopeObj.view.flxFeatureStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
        scopeObj.view.flxFeatureStatusFilter.right = (flxRight + iconRight - 8) +"px";
        scopeObj.view.flxFeatureStatusFilter.setVisibility(!scopeObj.view.flxFeatureStatusFilter.isVisible);
        if(scopeObj.view.flxContextualMenu.isVisible){
          scopeObj.view.flxContextualMenu.setVisibility(false);
        }
        if(scopeObj.view.flxFeatureTypeFilter.isVisible){
          scopeObj.view.flxFeatureTypeFilter.setVisibility(false);
        }

      };
      this.view.flxFeaturesSettings.onClick = function(){
        scopeObj.view.flxFeaturesSettingsDropdown.setVisibility(true);
      };
      this.view.featureSettingOptions.flxOption1.onClick = function(){
        scopeObj.showViewLimitGroupScreen();
        scopeObj.presenter.getLimitGroups();
      };
      this.view.featureSettingOptions.flxOption2.onClick = function(){
        if(scopeObj.view.rtxNoResultsFound.isVisible === false) {
          scopeObj.downloadServicesCSV();
        }
      };

      // search Features
      this.view.searchBoxFeatures.tbxSearchBox.onTouchStart = function(){
        scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
      };
      this.view.searchBoxFeatures.tbxSearchBox.onEndEditing = function(){
        scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
      };
      this.view.searchBoxFeatures.tbxSearchBox.onKeyUp = function() {
        var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.searchBoxFeatures.tbxSearchBox.text);
        if(searchText.length >=0 ){
          scopeObj.sortBy = scopeObj.getObjectSorter("name");
          scopeObj.loadPageData();
        } 
        if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text === ""){
          scopeObj.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
        }else{
          scopeObj.view.searchBoxFeatures.flxSearchCancel.setVisibility(true);
          scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
          scopeObj.view.forceLayout();
        }

        if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices === null ||
           scopeObj.view.TypeFilterMenu.segStatusFilterDropdown.selectedRowIndices === null){
          scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          scopeObj.view.flxHeaderFeatures.setVisibility(true);
          scopeObj.view.segFeatures.setData([]);
          scopeObj.view.forceLayout();
        }
      };

      // search Facilities
      this.view.subHeaderFacilities.tbxSearchBox.onTouchStart = function(){
        scopeObj.view.subHeaderFacilities.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
      };
      this.view.subHeaderFacilities.tbxSearchBox.onEndEditing = function(){
        scopeObj.view.subHeaderFacilities.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
      };
      this.view.subHeaderFacilities.tbxSearchBox.onKeyUp = function() {
        if(scopeObj.view.subHeaderFacilities.tbxSearchBox.text.length >= 0 ) {
          if(!scopeObj.containSpecialChars(scopeObj.view.subHeaderFacilities.tbxSearchBox.text)){
            scopeObj.sortBy = scopeObj.getObjectSorter("facilityName");
            scopeObj.loadPageDataFacilities();
          }
        } 
        if(scopeObj.view.subHeaderFacilities.tbxSearchBox.text === "") {
          scopeObj.view.subHeaderFacilities.flxClearSearchImage.setVisibility(false);
        } else {
          scopeObj.view.subHeaderFacilities.flxClearSearchImage.setVisibility(true);
          scopeObj.view.subHeaderFacilities.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
          scopeObj.view.forceLayout();
        }
      };

      // for treatments of search amongst the features and actions of the current facility, in the facility details view page
      this.view.viewDetailsAction.search.tbxSearchBox.onTouchStart = function(){
        scopeObj.view.viewDetailsAction.search.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
      };
      this.view.viewDetailsAction.search.tbxSearchBox.onEndEditing = function(){
        scopeObj.view.viewDetailsAction.search.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
      };
      this.view.viewDetailsAction.search.tbxSearchBox.onKeyUp = function() {
        scopeObj.view.viewDetailsAction.flxNoRecordsFound.setVisibility(false);
        //scopeObj.view.viewDetailsAction.flxActionView.height = 420 + "px";
        scopeObj.view.viewDetailsAction.flxActionView.setVisibility(true);
        if(scopeObj.view.viewDetailsAction.search.tbxSearchBox.text.length >= 0 ) {
          if(!scopeObj.containSpecialChars(scopeObj.view.viewDetailsAction.search.tbxSearchBox.text)){
            scopeObj.loadPageDataFeaturesActionsOfFacility();
          }

        }     
        if(scopeObj.view.viewDetailsAction.search.tbxSearchBox.text === "") {
          scopeObj.view.viewDetailsAction.search.flxSearchCancel.setVisibility(false);
        } else {
          scopeObj.view.viewDetailsAction.search.flxSearchCancel.setVisibility(true);
          scopeObj.view.viewDetailsAction.search.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
        }
        scopeObj.view.forceLayout();
      };

      this.view.searchBoxFeatures.flxSearchCancel.onClick = function() {
        scopeObj.view.searchBoxFeatures.tbxSearchBox.text = "";
        scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
        scopeObj.loadPageData();
        if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices === null ||
           scopeObj.view.TypeFilterMenu.segStatusFilterDropdown.selectedRowIndices === null){
          scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          scopeObj.view.flxHeaderFeatures.setVisibility(true);
          scopeObj.view.segFeatures.setData([]);
          scopeObj.view.forceLayout();
        }
      };

      this.view.subHeaderFacilities.flxClearSearchImage.onClick = function() {
        scopeObj.view.subHeaderFacilities.tbxSearchBox.text = "";
        scopeObj.view.subHeaderFacilities.flxSearchContainer.skin = "sknflxd5d9ddop100";
        scopeObj.view.subHeaderFacilities.flxClearSearchImage.setVisibility(false);
        scopeObj.loadPageDataFacilities();
      };

      // for treatments of search amongst the features and actions of the current facility, in the facility details view page
      this.view.viewDetailsAction.search.flxSearchCancel.onClick = function() {
        scopeObj.view.viewDetailsAction.search.tbxSearchBox.text = "";
        scopeObj.view.viewDetailsAction.search.flxSearchCancel.setVisibility(false);
        scopeObj.view.viewDetailsAction.search.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Search_by_Feature_Action_Name");
        scopeObj.view.viewDetailsAction.flxNoRecordsFound.setVisibility(false);
        //scopeObj.view.viewDetailsAction.flxActionView.height = 420 + "px";
        scopeObj.view.viewDetailsAction.flxActionView.setVisibility(true);
        scopeObj.loadPageDataFeaturesActionsOfFacility();
        scopeObj.view.forceLayout();
      };

      this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
        var filterData = scopeObj.filterBasedOnTypeStatus();
        scopeObj.setFeaturesSegmentData(filterData.sort(scopeObj.sortBy.sortData), true);
      };
      this.view.TypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
        var filterData = scopeObj.filterBasedOnTypeStatus();
        scopeObj.setFeaturesSegmentData(filterData.sort(scopeObj.sortBy.sortData), true);
      };
      this.view.flxFeatureDetailsOptions.onClick = function(){
        var left = scopeObj.view.flxFeatureDetailsOptions.frame.x - 60;
        scopeObj.view.flxFeatureDetailsContextualMenu.left = left +"dp";
        scopeObj.view.flxFeatureDetailsContextualMenu.setVisibility(scopeObj.view.flxFeatureDetailsContextualMenu.isVisible === false);
        scopeObj.view.contextualMenuFeatureDetails.flxOption4.setVisibility(true);
        if (scopeObj.view.lblFeatureDetailsStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
          scopeObj.view.contextualMenuFeatureDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
          scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.text = "\ue91c";
          scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.skin = "sknIcon20px";
        } else if(scopeObj.view.lblFeatureDetailsStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
          scopeObj.view.contextualMenuFeatureDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
          scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.text = "\ue931";
          scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.skin = "sknIcon20px";
        }else{
          scopeObj.view.contextualMenuFeatureDetails.flxOption4.setVisibility(false);
        }
        scopeObj.view.forceLayout();
      };
      this.view.flxActionDetailsOptions.onClick = function(){
        var left = scopeObj.view.flxActionDetailsOptions.frame.x - 60;
        scopeObj.view.flxActionDetailsContextualMenu.left = left +"dp";
        scopeObj.view.flxActionDetailsContextualMenu.setVisibility(scopeObj.view.flxActionDetailsContextualMenu.isVisible === false);
        scopeObj.view.contextualMenuActionDetails.flxOption4.setVisibility(true);
        if (scopeObj.view.lblActionStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
          scopeObj.view.contextualMenuActionDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
          scopeObj.view.contextualMenuActionDetails.lblIconOption4.text = "\ue91c";
          scopeObj.view.contextualMenuActionDetails.lblIconOption4.skin = "sknIcon20px";
        } else if(scopeObj.view.lblActionStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
          scopeObj.view.contextualMenuActionDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
          scopeObj.view.contextualMenuActionDetails.lblIconOption4.text = "\ue931";
          scopeObj.view.contextualMenuActionDetails.lblIconOption4.skin = "sknIcon20px";
        }else{
          scopeObj.view.contextualMenuActionDetails.flxOption4.setVisibility(false);
        }
        scopeObj.view.forceLayout();
      };
      this.view.flxDropdownLanguages.onClick = function(){
        var left = scopeObj.view.lblIconArrowDescription.frame.x  +68 ;
        var top = scopeObj.view.flxViewServiceDataHeader.frame.height + scopeObj.view.flxServiceDescription.frame.y +
            scopeObj.view.flxServiceDescriptionContent.frame.y -20;
        scopeObj.view.flxLanguages.top = top +"dp";
        scopeObj.view.flxLanguages.left = left + "dp";
        scopeObj.view.flxLanguages.setVisibility(scopeObj.view.flxLanguages.isVisible === false);
        scopeObj.view.forceLayout();
      };
      this.view.flxActionDropdownLanguages.onClick = function(){
        var left = scopeObj.view.lblIconArrowActionDescription.frame.x  +68 ;
        var top = scopeObj.view.flxViewActionDetailsHeader.frame.height + scopeObj.view.flxActionDisplayContent.frame.y +
            scopeObj.view.flxActionDescriptionContent.frame.y -20;
        scopeObj.view.flxActionLanguages.top = top +"dp";
        scopeObj.view.flxActionLanguages.left = left + "dp";
        scopeObj.view.flxActionLanguages.setVisibility(scopeObj.view.flxActionLanguages.isVisible === false);
        scopeObj.view.forceLayout();
      };
      this.view.displayContentEdit.flxLanguageHeader.onClick = function(){
        var left = 165+scopeObj.view.displayContentEdit.lblSelectedLanguage.frame.width-115;
        scopeObj.view.displayContentEdit.flxLanguagesEdit.left = left + "dp";
        if(scopeObj.view.displayContentEdit.flxLanguagesEdit.isVisible===true)
          scopeObj.view.displayContentEdit.flxLanguagesEdit.setVisibility(false);
        else
          scopeObj.view.displayContentEdit.flxLanguagesEdit.setVisibility(true);
        scopeObj.view.forceLayout();
      };
      this.view.displayContentView.flxDropdownLanguages.onClick = function(){      
        var left = scopeObj.view.displayContentView.lblIconArrowDescription.frame.x  +12 ;
        var top = scopeObj.view.displayContentView.flxDescriptionHeader.frame.height + scopeObj.view.displayContentView.flxDisplayContent.frame.y +
            scopeObj.view.displayContentView.flxDescriptionContent.frame.y -40;
        scopeObj.view.displayContentView.flxLanguages.top = top +"dp";
        scopeObj.view.displayContentView.flxLanguages.left = left + "dp";
        scopeObj.view.displayContentView.flxLanguages.setVisibility(scopeObj.view.displayContentView.flxLanguages.isVisible === false);
        scopeObj.view.forceLayout();
      };
      this.view.displayContentLimitGroupEdit.flxLanguageHeader.onClick = function(){
        var left = 165+scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage.frame.width-115;
        scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.left = left + "dp";
        if(scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.isVisible===true)
          scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(false);
        else
          scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(true);
        scopeObj.view.forceLayout();
      };
      this.view.ValueEntry.tbxEnterValue.onKeyUp = function() {
        scopeObj.view.ValueEntry.flxValueTextBox.skin = "skntxtAreaLato35475f14Px";
        scopeObj.view.flxNoServiceFee.setVisibility(false);

      };
      this.view.displayContentEdit.tbxEditName.onKeyUp = function() {
        scopeObj.view.displayContentEdit.tbxEditName.skin = "skntxtAreaLato35475f14Px";
        scopeObj.view.displayContentEdit.flxNoEditNameError.setVisibility(false);
        scopeObj.view.displayContentEdit.lblNameCount.text = scopeObj.view.displayContentEdit.tbxEditName.text.length + "/60";
      };
      this.view.tbxEditFeatureName.onKeyUp = function(){
        scopeObj.view.tbxEditFeatureName.skin = "skntbxLato35475f14px";
        scopeObj.view.flxNoEditFeatureNameError.isVisible = false;
        /*if(scopeObj.view.tbxEditFeatureName.text.length===0){
        scopeObj.view.lblFeatureNameCount.setVisibility(false);
      }else{*/
        scopeObj.view.lblFeatureNameCount.setVisibility(true);
        scopeObj.view.lblFeatureNameCount.text=scopeObj.view.tbxEditFeatureName.text.length+"/60";
        //}
        scopeObj.view.forceLayout();
      };
      /*this.view.tbxEditFeatureName.onEndEditing = function(){
      if(scopeObj.view.lblFeatureNameCount.isVisible===true)
      	scopeObj.view.lblFeatureNameCount.setVisibility(false);
    };*/
      this.view.displayContentEdit.txtareaEditDescription.onKeyUp = function() {
        scopeObj.view.displayContentEdit.txtareaEditDescription.skin = "skntxtAreaLato35475f14Px";
        scopeObj.view.displayContentEdit.flxNoEditDescriptionError.setVisibility(false);
        scopeObj.view.displayContentEdit.lblDescriptionCount.text = scopeObj.view.displayContentEdit.txtareaEditDescription.text.length + "/100";
      };
      this.view.txtareaEditFeatureDescription.onKeyUp= function(){
        scopeObj.view.txtareaEditFeatureDescription.skin = "skntxtAreaLato35475f14Px";
        scopeObj.view.flxNoEditFeatureDescriptionError.isVisible = false;
        /*if(scopeObj.view.txtareaEditFeatureDescription.text.length===0){
        scopeObj.view.lblFeatureDescriptionCount.setVisibility(false);
      }else{*/
        scopeObj.view.lblFeatureDescriptionCount.setVisibility(true);
        scopeObj.view.lblFeatureDescriptionCount.text=scopeObj.view.txtareaEditFeatureDescription.text.length+"/100";
        //}
        scopeObj.view.forceLayout();
      };
      /*this.view.txtareaEditFeatureDescription.onEndEditing = function(){
      if(scopeObj.view.lblFeatureDescriptionCount.isVisible)
      	scopeObj.view.lblFeatureDescriptionCount.setVisibility(false);
    };*/
      this.view.flxLanguageHeader.onClick = function(){
        var left = 165+scopeObj.view.lblSelectedLanguage.frame.width-115;
        scopeObj.view.flxFeatureLanguages.left = left + "dp";
        if(scopeObj.view.flxFeatureLanguages.isVisible===true)
          scopeObj.view.flxFeatureLanguages.setVisibility(false);
        else
          scopeObj.view.flxFeatureLanguages.setVisibility(true);
      };
      this.view.flxCloseFeature.onClick = function(){
        scopeObj.view.flxEditFeaturePopup.setVisibility(false);
      };
      this.view.btnEditCancel.onClick = function(){
        scopeObj.view.flxEditFeaturePopup.setVisibility(false);
      };
      this.view.btnUpdate.onClick = function(){
        scopeObj.prevSelLang=scopeObj.view.lblSelectedLanguage.info.selLang.langCode;
        if((scopeObj.view.flxFeaturedAction.isVisible && scopeObj.validateFieldsAction() && scopeObj.validateLimitFields()) || 
           (scopeObj.view.flxFeaturedAction.isVisible === false && scopeObj.validateFields())){
          scopeObj.updateFeatureDetails();
        }
        /*if((scopeObj.view.flxFeatureContainer.isVisible&&scopeObj.validateFields())||(scopeObj.validateFieldsAction())||(scopeObj.view.flxFeaturedAction.isVisible&&scopeObj.validateLimitFields()))
        scopeObj.updateFeatureDetails();*/
      };
      this.view.flxActionTCClosePopup.onClick = function(){
        scopeObj.view.flxViewActionTCPopup.setVisibility(false);
      };
      this.view.flxCloseLimits.onClick = function(){
        scopeObj.view.flxViewEditLimitsPopup.setVisibility(false);
      };
      this.view.btnEditActionLimits.onClick = function(){
        scopeObj.prefillFeatureDataForEdit(1);
        scopeObj.view.flxViewEditLimitsPopup.setVisibility(false);
      };

      this.view.viewDetailsAction.breadcrumbs1.btnBackToMain.onClick = function(){
        // click on breadcrumbs button Facilities View
        scopeObj.view.flxScrollViewFacilities.setVisibility(true);
        scopeObj.view.flxTabsFeaturesAndFacilities.setVisibility(true);
        //scopeObj.view.viewDetailsAction.flxActionView.height = 420 + "px";
        scopeObj.view.viewDetailsAction.flxActionView.setVisibility(true);
        scopeObj.view.viewDetailsAction.flxNoRecordsFound.setVisibility(false);
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.FeaturesAndFacilities");
        scopeObj.view.flxFacilities.setVisibility(false); 
        scopeObj.facilityOptionView = "";     
        scopeObj.presenter.getAllFacilities();
      }
      this.view.featuresLangList.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.updateLanguagesDropdown(scopeObj.view.featuresLangList.segStatusFilterDropdown,scopeObj.view.lblFeatureDetailsSelectedLang);
        scopeObj.view.flxLanguages.setVisibility(false);
        scopeObj.displaySelectedLanguageContent();
      };
      this.view.actionLangList.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.updateLanguagesDropdown(scopeObj.view.actionLangList.segStatusFilterDropdown,scopeObj.view.lblActionDetailsSelectedLang);
        scopeObj.view.flxActionLanguages.setVisibility(false);
        scopeObj.displaySelectedLanguageContentAction();
      };
      this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.prevSelLangAction = scopeObj.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode;
        scopeObj.updateLanguagesDropdown(scopeObj.view.displayContentEdit.EditLangList.segStatusFilterDropdown,scopeObj.view.displayContentEdit.lblSelectedLanguage);
        scopeObj.view.displayContentEdit.flxLanguagesEdit.setVisibility(false);
        scopeObj.displaySelectedLangActionEditMode("langClick");
      };
      this.view.displayContentView.EditLangList.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.updateLanguagesDropdown(scopeObj.view.displayContentView.EditLangList.segStatusFilterDropdown,scopeObj.view.displayContentView.lblDetailsSelectedLang);
        scopeObj.view.displayContentView.flxLanguages.setVisibility(false);
        scopeObj.displaySelectedLangLimitGroup();
      };
      this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.prevSelLangLimitGroup = scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode;
        scopeObj.updateLanguagesDropdown(scopeObj.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown,scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage);
        scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(false);
        scopeObj.displaySelectedLangLimitGroupEditMode("langClick");
      };
      this.view.flxActionTypeFilterIcon.onClick = function(){
        var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionTypeHeader.frame.x - scopeObj.view.flxActionTypeHeader.frame.width;
        var iconRight = scopeObj.view.flxActionTypeHeader.frame.width - scopeObj.view.flxActionTypeFilterIcon.frame.x;
        scopeObj.view.flxDetailsActionTypeFilter.right = (flxRight + iconRight -10) +"px";
        scopeObj.view.flxDetailsActionTypeFilter.setVisibility(!scopeObj.view.flxDetailsActionTypeFilter.isVisible);
      };
      this.view.flxActionCategoryFilterIcon.onClick = function(){
        var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionCategoryHeader.frame.x - scopeObj.view.flxActionCategoryHeader.frame.width;
        var iconRight = scopeObj.view.flxActionCategoryHeader.frame.width - scopeObj.view.flxActionCategoryFilterIcon.frame.x;
        scopeObj.view.flxDetailsActionCategoryFilter.right = (flxRight + iconRight -10) +"px";
        scopeObj.view.flxDetailsActionCategoryFilter.setVisibility(!scopeObj.view.flxDetailsActionCategoryFilter.isVisible);
      };
      this.view.flxActionLimitGroupFilterIcon.onClick = function(){
        var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionLimitGroupHeader.frame.x - scopeObj.view.flxActionLimitGroupHeader.frame.width;
        var iconRight = scopeObj.view.flxActionLimitGroupHeader.frame.width - scopeObj.view.flxActionLimitGroupFilterIcon.frame.x;
        scopeObj.view.flxDetailsActionLimitGroupFilter.right = (flxRight + iconRight -10) +"px";
        scopeObj.view.flxDetailsActionLimitGroupFilter.setVisibility(!scopeObj.view.flxDetailsActionLimitGroupFilter.isVisible);
      };
      this.view.flxActionStatusFilterIcon.onClick = function(){
        var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionStatusHeader.frame.x - scopeObj.view.flxActionStatusHeader.frame.width;
        var iconRight = scopeObj.view.flxActionStatusHeader.frame.width - scopeObj.view.flxActionStatusFilterIcon.frame.x;
        scopeObj.view.flxDetailsActionStatusFilter.right = (flxRight + iconRight -10) +"px";
        scopeObj.view.flxDetailsActionStatusFilter.setVisibility(!scopeObj.view.flxDetailsActionStatusFilter.isVisible);
      };
      this.view.actionTypeDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.performFilterOnActionTypes();
      };
      this.view.actionCategoryDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.performFilterOnActionCategory();
      };
      this.view.actionStatusDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.performFilterOnActionStatus();
      };
      this.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.performFilterOnActionLimitGroup();
      };
      this.view.flxTcLanguageDropdown.onClick = function(){
        var left = scopeObj.view.flxTcLanguageDropdown.frame.x-3;
        scopeObj.view.flxTCPopupLanguages.left = left + "dp";
        scopeObj.view.flxTCPopupLanguages.setVisibility(!scopeObj.view.flxTCPopupLanguages.isVisible);

      };
      this.view.languagesListTCPopup.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.updateLanguagesDropdown(scopeObj.view.languagesListTCPopup.segStatusFilterDropdown,scopeObj.view.lblSelectedLangTCPopup);
        scopeObj.view.flxTCPopupLanguages.setVisibility(false);
        if(scopeObj.view.flxEditFeaturePopup.isVisible===false)
          scopeObj.displaySelectedLanguageTC(scopeObj.view.segActionList.data[scopeObj.view.segActionList.selectedRowIndex[1]].termsAndConditions);
        else
          scopeObj.displaySelectedLanguageTC(scopeObj.view.segFeaturedActions.selectedRowIndex ? scopeObj.view.segFeaturedActions.data[scopeObj.view.segFeaturedActions.selectedRowIndex[1]].termsAndConditions :scopeObj.view.segFeaturedActions.data[0].termsAndConditions);
      };
      this.view.contextualMenuFeatureDetails.flxOption2.onClick = function(){
        scopeObj.prefillFeatureDataForEdit();
        scopeObj.view.flxFeaturedAction.setVisibility(false);
      };
      this.view.contextualMenuActionDetails.flxOption2.onClick = function(){
        scopeObj.isActionEdit=true;
        scopeObj.prefillFeatureDataForEdit();
      };
      this.view.contextualMenuFeatureDetails.flxOption4.onClick = function(){
        if(scopeObj.view.lblFeatureDetailsStatusValue.text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active")) {
          scopeObj.showDeactivatePopup(1);
        }
        else {
          scopeObj.deactivateFeatureDetails();
          scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
        }
      };
      this.view.contextualMenuActionDetails.flxOption4.onClick = function(){
        var index = scopeObj.view.segFeatures.selectedRowIndex;
        var rowInd = index[1];
        var rowData = scopeObj.view.segFeatures.data[rowInd];
        if(scopeObj.view.contextualMenuActionDetails.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
          scopeObj.showDeactivatePopup(2);
        }
        else if(scopeObj.view.contextualMenuActionDetails.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate") && scopeObj.view.lblFeatureDetailsStatusValue.text === "Inactive"){
          scopeObj.showActivatePopup(1);
        }
        else {
          scopeObj.deactivateAction(rowData);
        }
      };
      this.view.flxActionNameHeader.onClick = function(){
        var segData = scopeObj.view.segActionList.data;
        scopeObj.sortBy.column("lblActionName");
        scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblActionName', scopeObj.view.lblIconActionNameSort);
        scopeObj.view.segActionList.setData(segData.sort(scopeObj.sortBy.sortData));
      };
      this.view.flxActionCodeHeader.onClick = function(){
        var segData = scopeObj.view.segActionList.data;
        scopeObj.sortBy.column("lblActionCode");
        scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblActionCode', scopeObj.view.lblIconActionCodeSort);
        scopeObj.view.segActionList.setData(segData.sort(scopeObj.sortBy.sortData));
      };
      this.view.flxLimitGroupNameHeader.onClick = function() {
        var segData = scopeObj.view.segLimitGroup.data;
        scopeObj.sortBy.column("lblLimitGroupName");
        scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblLimitGroupName', scopeObj.view.fontIconSortLimitGroup);
        scopeObj.view.segLimitGroup.setData(segData.sort(scopeObj.sortBy.sortData));
      };
      this.view.lblTAndCView.onTouchStart = function(){
        scopeObj.showTermsConditionsPopupEditMode();
      };
      this.view.valueEntryMinValueLimit.tbxEnterValue.onTextChange = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
      };
      this.view.valueEntryMinValueLimit.tbxEnterValue.onEndEditing = function(){
        if(scopeObj.view.valueEntryMinValueLimit.tbxEnterValue.text===""){
          scopeObj.view.lblMinValueLimitErrorMsg.text="Please enter a valid number";
          scopeObj.view.valueEntryMinValueLimit.flxValueTextBox.skin = "sknBorderRed";
          scopeObj.view.flxMinValueError.setVisibility(true);
          scopeObj.view.forceLayout();
        }
      };
      this.view.valueEntryMaxValueLimit.tbxEnterValue.onTextChange = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
      };
      this.view.valueEntryMaxValueLimit.tbxEnterValue.onEndEditing = function(){
        if(scopeObj.view.valueEntryMaxValueLimit.tbxEnterValue.text===""){
          scopeObj.view.lblMaxValueLimitErrorMsg.text="Please enter a valid number";
          scopeObj.view.valueEntryMaxValueLimit.flxValueTextBox.skin = "sknBorderRed";
          scopeObj.view.flxMaxValueExceedError.setVisibility(true);
          scopeObj.view.forceLayout();
        }
      };
      this.view.valueEntryMaxDailyValue.tbxEnterValue.onTextChange = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
      };
      this.view.valueEntryMaxDailyValue.tbxEnterValue.onEndEditing = function(){
        if(scopeObj.view.valueEntryMaxDailyValue.tbxEnterValue.text===""){
          scopeObj.view.lblDailyLimitValueErrorMsg.text="Please enter a valid number";
          scopeObj.view.valueEntryMaxDailyValue.flxValueTextBox.skin = "sknBorderRed";
          scopeObj.view.flxMaxDailyLimitError.setVisibility(true);
          scopeObj.view.forceLayout();
        }
      };
      this.view.valueEntryWeeklyLimitValue.tbxEnterValue.onTextChange = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
      };
      this.view.displayContentEdit.tbxEditName.onTextChange = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isContentEdited=true;
      };
      this.view.displayContentEdit.txtareaEditDescription.onTextChange = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isContentEdited=true;
      };
      this.view.actionStatusSwitch.switchToggle.onTouchEnd = function(){
        scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isStatusEdited=true;
      };
      this.view.valueEntryWeeklyLimitValue.tbxEnterValue.onEndEditing = function(){
        if(scopeObj.view.valueEntryWeeklyLimitValue.tbxEnterValue.text===""){
          scopeObj.view.lblWeeklyLimitValueErrorMsg.text="Please enter a valid number";
          scopeObj.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin = "sknBorderRed";
          scopeObj.view.flxWeeklyLimitValueError.setVisibility(true);
          scopeObj.view.forceLayout();
        }
      };
      this.view.valueEntryMinValueLimit.tbxEnterValue.onTouchStart=function(){
        scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryMinValueLimit_tbxEnterValue');
        scopeObj.view.valueEntryMinValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        scopeObj.view.flxMinValueError.setVisibility(false);
      };
      this.view.valueEntryMaxValueLimit.tbxEnterValue.onTouchStart=function(){
        scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryMaxValueLimit_tbxEnterValue');
        scopeObj.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        scopeObj.view.flxMaxValueExceedError.setVisibility(false);
      };
      this.view.valueEntryMaxDailyValue.tbxEnterValue.onTouchStart=function(){
        scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryMaxDailyValue_tbxEnterValue');
        scopeObj.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        scopeObj.view.flxMaxDailyLimitError.setVisibility(false);
      };
      this.view.valueEntryWeeklyLimitValue.tbxEnterValue.onTouchStart=function(){
        scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryWeeklyLimitValue_tbxEnterValue');
        scopeObj.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        scopeObj.view.flxWeeklyLimitValueError.setVisibility(false);
      };
      this.view.EditFeatureLangList.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.view.flxFeatureLanguages.setVisibility(false);
        scopeObj.prevSelLang=scopeObj.view.lblSelectedLanguage.info.selLang.langCode;
        scopeObj.updateLanguagesDropdown(scopeObj.view.EditFeatureLangList.segStatusFilterDropdown, scopeObj.view.lblSelectedLanguage);
        scopeObj.displaySelectedLanguageContentEditMode("langClick");
      };
      this.view.fontIconActionTypes.onHover = function(widget, context) {
        var info = "Specifies that the action is applicable to Feature types indicated.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconActionCategory.onHover = function(widget, context) {
        var info = "Specifies if the Action involves financial transactions or not. Possible values are MONETARY and NON MONETARY.";
        scopeObj.onHoverCallBack(widget, context, info);
      };	
      this.view.fontIconActionDependencies.onHover = function(widget, context) {
        var info = "Shows the list of actions, which the current action is dependent on, with in the feature.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconActionLimitGroup.onHover = function(widget, context) {
        var info = "For the Monetary Actions, Limit Group specified indicates the logical group at which limit controls can be set up.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconFeatureDetailsRow11Header.onHover = function(widget, context) {
        var info = "Specifies that this feature is applicable to Service types indicated.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMinPerTxLimit.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum per transaction value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMaxTxLimit.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum transaction limit value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMaxDailyLimit.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum daily limit value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMaxWeeklyLimit.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum weekly limit value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconActionType.onHover = function(widget, context) {
        var info = "Specifies that the action is applicable to Feature types indicated.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconViewActionCategory.onHover = function(widget, context) {
        var info = "Specifies if the Action involves financial transactions or not. Possible values are MONETARY and NON MONETARY.";
        scopeObj.onHoverCallBack(widget, context, info);
      };	
      this.view.fontIconViewDependency.onHover = function(widget, context) {
        var info = "Shows the list of actions, which the current action is dependent on, with in the feature.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconViewLimitGroup.onHover = function(widget, context) {
        var info = "For the Monetary Actions, Limit Group specified indicates the logical group at which limit controls can be set up.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconData2.onHover = function(widget, context) {
        var info = "Specifies that this feature is applicable to Service types indicated.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMinVal.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum per transaction value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMaxVal.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum transaction limit value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMaxDailyVal.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum daily limit value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
      this.view.fontIconMaxWeeklyVal.onHover = function(widget, context) {
        var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
        var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
        var info = "This is the maximum weekly limit value for any " + featureName + " transaction submitted over the online banking channel.";
        scopeObj.onHoverCallBack(widget, context, info);
      };
    },
    //Hiding unnecessary flexes
    hideAll: function(){
      this.view.breadcrumbs.setVisibility(false);
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.flxAddService.setVisibility(false);
      this.view.flxScrollViewServices.setVisibility(false);
      this.view.flxLanguages.setVisibility(false);
      this.view.flxActionLanguages.setVisibility(false);
      this.view.flxViewServiceData.setVisibility(false);
      if(this.currSuccessMsg==="")
        this.view.flxToastMessage.setVisibility(false);
      this.view.flxViewActionData.setVisibility(false);
      this.view.flxViewLimitsGroup.setVisibility(false);
      this.view.flxMainContentFacilities.setVisibility(false);
      this.view.flxAddFacility.setVisibility(false);
      this.view.flxFacilities.setVisibility(false);
    },  

    //Hiding unnecessary flexes
    hideAllOnFacility: function(){
      this.view.viewDetailsAction.breadcrumbs1.setVisibility(false);
      this.view.viewDetailsAction.breadcrumbs1.btnBackToMain.setVisibility(false);
      this.view.viewDetailsAction.breadcrumbs1.fontIconBreadcrumbsRight.setVisibility(false);
      this.view.viewDetailsAction.breadcrumbs1.lblCurrentScreen.setVisibility(false);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.flxAddFacility.setVisibility(false);
      this.view.flxScrollViewFacilities.setVisibility(false);
      //    this.view.flxLanguages.setVisibility(false);
      //    this.view.flxActionLanguages.setVisibility(false);
      //    this.view.flxViewServiceData.setVisibility(false);
      if(this.currSuccessMsg==="")
        this.view.flxToastMessage.setVisibility(false);
      this.view.flxViewActionData.setVisibility(false);
      //    this.view.flxViewLimitsGroup.setVisibility(false);
    },  

    /*overwritting component widget level selection property
  */
    setSegmentSelectionProperty : function(){
      var selectionProp = {
        imageIdentifier: "imgCheckBox",
        selectedStateImage: "checkboxselected.png",
        unselectedStateImage: "checkboxnormal.png"
      };
      this.view.EditFeatureLangList.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
      this.view.EditFeatureLangList.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
      if(this.view.EditFeatureLangList.flxSearchContainer)
        this.view.EditFeatureLangList.flxSearchContainer.setVisibility(false);
      this.view.featuresLangList.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
      this.view.featuresLangList.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
      if(this.view.featuresLangList.flxSearchContainer)
        this.view.featuresLangList.flxSearchContainer.setVisibility(false);
      this.view.languagesListTCPopup.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
      this.view.languagesListTCPopup.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
      if(this.view.languagesListTCPopup.flxSearchContainer)
        this.view.languagesListTCPopup.flxSearchContainer.setVisibility(false);
      this.view.forceLayout();
    },

    validateFields : function(){
      var isValid=true;
      var phoneRegex= /^\d+(\.\d{0,2})?$/g; // /^\d+(\.\d\d)?$/g;
      if(this.view.ValueEntry.tbxEnterValue.text===""){
        isValid=false;
        this.view.ValueEntry.flxValueTextBox.skin = "sknFlxCalendarError";
        this.view.flxNoServiceFee.setVisibility(true);
        this.view.lblNoServiceFeeError.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ServiceFeeCannotBeEmpty");
      } else if(phoneRegex.test(this.view.ValueEntry.tbxEnterValue.text) === false){
        isValid=false;
        this.view.ValueEntry.flxValueTextBox.skin = "sknFlxCalendarError";
        this.view.flxNoServiceFee.setVisibility(true);
        this.view.lblNoServiceFeeError.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.EnterValidServiceFee");
      }
      if (this.view.tbxEditFeatureName.text.trim().length === 0) {
        isValid = false;
        this.view.tbxEditFeatureName.skin = "sknTxtError";
        this.view.flxNoEditFeatureNameError.setVisibility(true);
      }
      if(this.view.txtareaEditFeatureDescription.text.trim().length===0){
        isValid=false;
        this.view.txtareaEditFeatureDescription.skin="sknTxtError";
        this.view.flxNoEditFeatureDescriptionError.setVisibility(true);
      }
      if(isValid)
        this.displaySelectedLanguageContentEditMode("langClick");
      return isValid;
    },
    validateFieldsLimitGroup : function(){
      var isValid=true;
      if(this.view.displayContentLimitGroupEdit.txtareaEditDescription.text.trim().length===0){
        isValid=false;
        this.view.displayContentLimitGroupEdit.txtareaEditDescription.skin="sknTxtError";
        this.view.displayContentLimitGroupEdit.flxNoEditDescriptionError.setVisibility(true);
      }else{
        this.view.displayContentLimitGroupEdit.txtareaEditDescription.skin="skntxtAreaLato35475f14Px";
        this.view.displayContentLimitGroupEdit.flxNoEditDescriptionError.setVisibility(false);
      }
      if(this.view.displayContentLimitGroupEdit.tbxEditName.text.trim().length===0){
        isValid=false;
        this.view.displayContentLimitGroupEdit.tbxEditName.skin="sknTxtError";
        this.view.displayContentLimitGroupEdit.flxNoEditNameError.setVisibility(true);
      }else{
        this.view.displayContentLimitGroupEdit.tbxEditName.skin="skntbxLato35475f14px";
        this.view.displayContentLimitGroupEdit.flxNoEditNameError.setVisibility(false);
      }
      if(isValid)
        this.displaySelectedLangLimitGroupEditMode("langClick");
      return isValid;
    },
    validateFieldsAction : function(){
      var isValid=true;
      this.prevSelLangAction = this.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode;
      if (this.view.displayContentEdit.tbxEditName.text.trim().length === 0) {
        isValid = false;
        this.view.displayContentEdit.tbxEditName.skin = "sknTxtError";
        this.view.displayContentEdit.flxNoEditNameError.setVisibility(true);
      }
      if(this.view.displayContentEdit.txtareaEditDescription.text.trim().length===0){
        isValid=false;
        this.view.displayContentEdit.txtareaEditDescription.skin="sknTxtError";
        this.view.displayContentEdit.flxNoEditDescriptionError.setVisibility(true);
      }
      if(isValid)
        this.updateActionEditPayload();
      return isValid;
    },
    showDeactivatePopup : function(opt) {
      var scopeObj = this;
      this.view.popUpDeactivate.flxPopUp.top="250px";
      this.view.popUpDeactivate.flxDependencyViewContainer.setVisibility(false);
      this.view.popUpDeactivate.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagementController.Deactivate_Service");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmServiceManagementController.deactivate_Service_popup")+""+kony.i18n.getLocalizedString("i18n.frmServiceManagementController.Service_deactive_messageDesc");
      this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
      this.view.flxDeactivateServiceManagement.setVisibility(true);
      if(opt === 1){
        this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
          scopeObj.deactivateService();
          scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
        };
      }
      else if(opt === 2){
        this.view.popUpDeactivate.flxDependencyViewContainer.setVisibility(true);
        this.mapPopupDependencies();
        this.view.popUpDeactivate.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagement.deactivateAction");
        this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.deactivateActionMessage")+""+kony.i18n.getLocalizedString("i18n.frmServiceManagement.deactivateActionMessage_desc");
        this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
          var index = scopeObj.view.segFeatures.selectedRowIndex;
          var rowInd = index[1];
          var rowData = scopeObj.view.segFeatures.data[rowInd];
          scopeObj.deactivateAction(rowData);
          scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
        };
      }
      else{
        this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
          scopeObj.deactivateFeatureDetails();
          scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
        };
      }

      this.view.forceLayout();
    },
    showActivatePopup : function(opt) {
      var scopeObj = this;
      this.view.popupError.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagement.activateAction");
      this.view.popupError.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.activateActionMessage");
      this.view.flxActivateActionPopup.setVisibility(true);
      this.view.forceLayout();
    },
    deactivateService : function() {
      var self = this;
      var index = self.view.segFeatures.selectedRowIndex;
      var rowInd = index[1];
      var rowData = self.view.segFeatures.data[rowInd];
      var statusId = "";
      if(rowData !== null){
        if (rowData.Status_id === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) {
          statusId = self.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE;
        } else {
          statusId = self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE;
        }

        self.changeStatusOfService(rowData,statusId,1);
      }
      this.view.forceLayout();
    },
    deactivateAction : function(rowData) {
      var self = this;
      var featureIndex = self.view.segFeatures.selectedRowIndex;
      var actionIndex = self.view.segActionList.selectedRowIndex;
      var featureData = self.view.segFeatures.data[featureIndex[1]];
      var actionData = self.view.segActionList.data[actionIndex[1]];
      var statusId = "";
      this.actionStatusReqParam={
        "actionId":actionData.actionCode,
        "status":(actionData.lblActionStatus.text === "Active")?this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE:this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE,
        //ToDo
        //Need to get the data from the legal entity dropdown as of now hardcoded to check the integration
        "legalEntityId":rowData.legalEntityId
      };
      self.currSuccessMsg=self.successMsgParam.EDIT;
      this.presenter.updateStatusOfAction(this.actionStatusReqParam,featureData.id);
      this.view.forceLayout();
    },
    /* deactivate feature from details screen*/
    deactivateFeatureDetails : function(){
      var self=this;
      var status = this.view.lblFeatureDetailsStatusValue.text;
      var serviceFee=this.view.lblFeatureDetailsRow13Value.text.slice(2);
      var index = self.view.segFeatures.selectedRowIndex;
      var rowInd = index[1];
      var legalEntityId = self.view.segFeatures.data[rowInd].legalEntityId;
      var statusId = "";
      var data = {"id": this.view.lblFeatureDetailsName.info.id,
                  "Service_fee" :this.checkForNull(serviceFee, ""),
                  "legalEntityId" : legalEntityId
                 };
      if(status.toLowerCase() === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active").toLowerCase()){
        statusId = this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE;
      } else{
        statusId = this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE;
      }
      this.changeStatusOfService(data,statusId,2);

    },
    //show add facilities screen,when no facility exists
    showAddFacilities : function() {
      this.view.viewDetailsAction.flxFacilitiesBreadCrumb.breadcrumbs1.setVisibility(false);

      this.view.flxScrollViewFacilties.setVisibility(false);
      this.view.flxMainContentFacilities.setVisibility(true);
      this.view.flxAddFacility.setVisibility(true);
      this.view.forceLayout();
    },
    //show add service screen,when no services exists
    showAddService : function() {
      this.view.breadcrumbs.setVisibility(false);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(false);

      this.view.flxScrollViewServices.setVisibility(true);
       this.view.flxViewServicesWrapper.setVisibility(false);
      this.view.flxMainContent.setVisibility(true);
      this.view.flxAddService.setVisibility(true);
      this.view.forceLayout();
    },
    //hide edit/add screen
    hideService : function() {
      this.view.breadcrumbs.setVisibility(false);
      this.view.flxAddService.setVisibility(false);
      this.view.flxMainContent.setVisibility(true);
      this.view.flxTabsFeaturesAndFacilities.setVisibility(true);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      this.view.breadcrumbs.btnBackToMain.text = "Features";
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.FeaturesAndFacilities");

      this.view.flxViewServiceData.setVisibility(false);
      this.view.flxScrollViewServices.setVisibility(true);
      this.view.flxContextualMenu.setVisibility(false);
    },
    //show  view service details screen on row click
    showViewFeatureScreen : function() {
      this.hideAll();
      this.view.breadcrumbs.setVisibility(true);
      this.view.breadcrumbs.btnBackToMain.text = "FEATURES";
      this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFeature");

      this.view.flxAddService.setVisibility(false);
      this.view.flxScrollViewServices.setVisibility(false);
      if(this.view.flxFeatureDetailsContextualMenu.isVisible)
        this.view.flxFeatureDetailsContextualMenu.setVisibility(false);
      this.view.flxTabsFeaturesAndFacilities.setVisibility(false);
      this.view.flxViewServiceData.setVisibility(true);
      this.adjustFeaturesContTop(false);
      this.view.forceLayout();
    },
    //show  view facility details screen on row click
    showViewFacilityScreen : function() {

      this.view.flxAddFacility.isVisible = false; 
      this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text = "";
      this.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false); 
      this.view.flxMainContentFacilities.isVisible = true;
      this.view.mainHeader.lblHeading.text  = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFacility");
      this.view.flxFacilities.isVisible = true; 

      this.hideAllOnFacility();
      this.view.viewDetailsAction.breadcrumbs1.setVisibility(true);
      this.view.viewDetailsAction.breadcrumbs1.btnBackToMain.text = "FACILITY LIST";
      this.view.viewDetailsAction.breadcrumbs1.btnBackToMain.setVisibility(true);
      this.view.viewDetailsAction.breadcrumbs1.fontIconBreadcrumbsRight.setVisibility(true);
      this.view.viewDetailsAction.breadcrumbs1.lblCurrentScreen.setVisibility(true);
      this.view.flxTabsFeaturesAndFacilities.setVisibility(false);    
      this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFacility");
      this.view.flxAddFacility.setVisibility(false);
      this.view.flxScrollViewFacilities.setVisibility(false);
      //    if(this.view.flxFeatureDetailsContextualMenu.isVisible)
      //    	this.view.flxFeatureDetailsContextualMenu.setVisibility(false);
      this.view.flxFacilities.setVisibility(true);
      this.facilityOptionView = "viewFacility";
      this.view.forceLayout();
    },
    //show  view action details screen on row click
    showViewActionScreen: function() {
      this.hideAll();
      this.view.breadcrumbs.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
      this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      this.view.breadcrumbs.btnBackToMain.text = "FEATURES";
      this.view.breadcrumbs.btnPreviousPage.text = this.view.breadcrumbs.lblCurrentScreen.text;
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFeature");
      if(this.view.flxActionDetailsContextualMenu.isVisible)
        this.view.flxActionDetailsContextualMenu.setVisibility(false);
      this.view.flxViewActionData.setVisibility(true);
      this.adjustFeaturesContTop(false);
      this.view.forceLayout();
    },
    //show  view limits group screen on row click
    showViewLimitGroupScreen: function() {
      this.hideAll();
      this.view.breadcrumbs.setVisibility(true);
      this.view.breadcrumbs.btnBackToMain.text = "FEATURES";
      this.view.breadcrumbs.lblCurrentScreen.text= "LIMIT GROUPS";
      this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.mainHeader.lblHeading.text = "View Limit Groups";    
      this.view.flxViewLimitsGroup.setVisibility(true);
      this.view.flxTabsFeaturesAndFacilities.setVisibility(false);
      this.adjustFeaturesContTop(false);
      this.view.forceLayout();
    },
    /*
   * adjust the features content top based on feture-facility tabs visibility
   */
    adjustFeaturesContTop : function(isTabVisible){
      if(isTabVisible === true){
        this.view.flxMainContent.top = "150dp";
      } else{
        this.view.flxMainContent.top ="127dp";
      }
    },
    /*
   * function to set data to view limits group screen, called on click of btnaddnewoption
   */
    setLimitGroupsData: function(response) {
      var self = this;
      var widgetMap = {
        "flxArrow":"flxArrow",
        "lblArrow":"lblArrow",
        "lblLimitGroupName":"lblLimitGroupName",
        "flxLimitGroupDetails":"flxLimitGroupDetails",
        "lblLimitGroupCode":"lblLimitGroupCode",
        "flxOptions": "flxOptions",
        "lblIconImgOptions":"lblIconImgOptions",
        "flxDescription":"flxDescription",
        "lblDescriptionValue":"lblDescriptionValue",
        "lblDescriptionHeader":"lblDescriptionHeader",
        "lblSeperatorLine":"lblSeperatorLine",
        "displayContent":"displayContent"
      };

      var segData = response.map(function(rec){
        return {       
          "lblLimitGroupName": rec.name,
          "lblLimitGroupCode": rec.id,
          "flxArrow": {
            "onClick": self.toggleLimitDescription
          },
          "lblArrow": {
            "text": "\ue922",
            "skin": "sknfontIconDescRightArrow14px"
          },  
          "flxLimitGroupDetails": {
            "onClick": self.showViewLimitGroupPopup,
          },
          "flxOptions": {
            "onClick": self.showEditLimitGroupPopup
          },
          "lblIconImgOptions": {
            "text":kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconOption1")
          },
          "flxDescription": {
            "isVisible": false
          },
          "lblDescriptionValue": rec.description,
          "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
          "lblSeperatorLine": "-",
          "displayContent":rec.limitGroupDisplayName,
          "template": "flxLimitGroup"
        };
      });
      self.sortBy = self.getObjectSorter("lblLimitGroupName");
      self.determineSortFontIcon(self.sortBy, 'lblLimitGroupName', self.view.fontIconSortLimitGroup);
      self.view.segLimitGroup.widgetDataMap = widgetMap;
      self.view.segLimitGroup.setData(segData.sort(self.sortBy.sortData));
      self.view.segLimitGroup.info = {"segData":segData};
      self.view.forceLayout();
    },
    /*
   * function to set data to view service details screen, called on click of seg row
   */
    setViewActionData : function(){
      var index = this.view.segActionList.selectedIndex;
      var rowIndex = index[1];
      var rowData = this.view.segActionList.data[rowIndex];
      this.view.breadcrumbs.lblCurrentScreen.text = (rowData.lblActionName).toUpperCase();
      this.view.lblActionDetailsName.text = this.checkForNull(rowData.lblActionName,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.lblActionDetailsName.info = {"id":rowData.id};
      this.view.lblActionStatusValue.text = this.checkForNull(rowData.lblActionStatus.text,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.lblIconActionStatus.text = rowData.fontIconStatusImg.text;
      this.view.lblIconActionStatus.skin = rowData.fontIconStatusImg.skin;
      this.view.lblActionCategoryValue.text=rowData.lblActionCategory;
      this.view.lblActionCodeValue.text=rowData.actionCode; 
      this.view.lblActionTnCValue.text=rowData.lblActionTaCLink.text;
      this.view.lblActionTnCValue.skin=rowData.lblActionTaCLink.skin;
      this.view.lblActionTnCValue.hoverSkin=rowData.lblActionTaCLink.hoverSkin;
      this.view.lblActionMFAValue.text=(rowData.actionMfa === true)? "Yes": kony.i18n.getLocalizedString("i18n.Applications.NA");
      this.view.lblActionTypesValue.text=rowData.lblActionType;
      this.view.lblActionLevelValue.text=rowData.actionLevel.toUpperCase();
      this.view.lblActionAccessLevelValue.text=rowData.accessLevel.toUpperCase();
      this.view.lblActionDependenciesValue.text=rowData.lblDependencies.text;
      this.view.lblActionDependenciesValue.skin=rowData.lblDependencies.skin;
      this.view.lblActionDependenciesValue.hoverSkin=rowData.lblDependencies.hoverSkin;   
      this.view.lblActionDependenciesValue.onClick=rowData.lblDependencies.onClick;
      if(this.view.lblActionStatusValue.text === "Inactive"){
        this.view.flxActionDetailsWarning.setVisibility(true);
      }else{
        this.view.flxActionDetailsWarning.setVisibility(false);
      }   
      var langList = this.view.actionLangList.segStatusFilterDropdown.info.lang;
      this.setLanguagesList(langList,false);    
      this.displaySelectedLanguageContentAction();
      if(rowData.lblActionCategory.toUpperCase() === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
        this.view.flxLimit.setVisibility(true);
        this.view.flxActionLimitGroup.setVisibility(true);
        this.view.lblActionLimitGroupValue.text=rowData.lblActionLimitGroup;
        var maplimits; 
        maplimits = rowData.limits.reduce(function(maplimits, obj) {
          maplimits[obj.type] = obj.value;
          return maplimits;
        },{});
        this.view.lblMinPerTxLimitValue.text = maplimits.MIN_TRANSACTION_LIMIT;
        this.view.lblMaxTxLimitValue.text = maplimits.MAX_TRANSACTION_LIMIT;
        this.view.lblMaxDailyLimitValue.text = maplimits.DAILY_LIMIT;
        this.view.lblMaxWeeklyLimitValue.text = maplimits.WEEKLY_LIMIT;
        this.view.lblCurrency1.text =  this.currencyIconValue;
        this.view.lblCurrency2.text =  this.currencyIconValue;
        this.view.lblCurrency3.text =  this.currencyIconValue;
        this.view.lblCurrency4.text =  this.currencyIconValue;
      }
      else{
        this.view.flxLimit.setVisibility(false);
        this.view.flxActionLimitGroup.setVisibility(false);
      }
      document.getElementById("frmServiceManagement_flxViewServiceData").onscroll = this.hideOptionMenuOnScroll;
    },
    /*
   * function called on click of save from create service to call presentation controller
   */
    saveService : function () {
      var self = this;
      var condition = self.validation();
      if (condition) {
        self.presenter.createService(self.createServiceReqParam);
        self.viewServices();
        self.hideService();
      }
    },

    viewFacilities : function() {
      this.view.subHeaderFacilities.flxClearSearchImage.setVisibility(false);
      this.view.flxMainContentFacilities.setVisibility(true);
      this.view.flxScrollViewFacilities.setVisibility(true);
      this.view.flxTabsFeaturesAndFacilities.setVisibility((this.facilityOptionView === "viewFacility")?false:true);
      this.view.FeaturesFacilitiesTabs.flxSelected1.setVisibility(false);
      this.view.FeaturesFacilitiesTabs.flxSelected2.setVisibility(true);
      this.view.FeaturesFacilitiesTabs.flxSelectedBorder1.setVisibility(true);
      this.view.FeaturesFacilitiesTabs.flxSelectedBorder2.setVisibility(false); 
      this.view.FeaturesFacilitiesTabs.lblStatus1.skin = "sknLabelTabs";
      this.view.FeaturesFacilitiesTabs.lblStatus2.skin = "sknLabelTabs";
      this.view.FeaturesFacilitiesTabs.lblStatus1.height = 13 + "px";
      this.view.FeaturesFacilitiesTabs.lblStatus2.height = 13 + "px";

      //this.view.forceLayout();
    },

    //show services segment list
    viewServices : function() {
      this.hideAll();
      this.view.breadcrumbs.setVisibility(false);
      //this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.FeaturesAndFacilities");
      this.view.flxContextualMenu.setVisibility(false);
      this.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
      this.view.flxViewServiceData.setVisibility(false);
      this.view.flxAddService.setVisibility(false);
      this.view.flxMainContent.setVisibility(true);
      this.view.flxScrollViewServices.setVisibility(true);
      this.view.flxTabsFeaturesAndFacilities.setVisibility(true);
      this.adjustFeaturesContTop(true);
      this.view.FeaturesFacilitiesTabs.flxSelected1.setVisibility(true);
      this.view.FeaturesFacilitiesTabs.flxSelected2.setVisibility(false);
      this.view.FeaturesFacilitiesTabs.flxSelectedBorder1.setVisibility(false);
      this.view.FeaturesFacilitiesTabs.flxSelectedBorder2.setVisibility(true); 
      this.view.FeaturesFacilitiesTabs.lblStatus1.skin = "sknLabelTabs";
      this.view.FeaturesFacilitiesTabs.lblStatus2.skin = "sknLabelTabs";
      this.view.FeaturesFacilitiesTabs.lblStatus1.height = 13 + "px";
      this.view.FeaturesFacilitiesTabs.lblStatus2.height = 13 + "px";
      this.view.forceLayout();
    },

    getMockFacilitiesList : function() {
      var facilitiesList = 
          {"facilities": [
            {
              "facilityId": "FC2345678445",
              "code": "dummy code value",
              "facilityName": "Electronic Statement",
              "description": "When you register for e-Statements, we will send you monthly e-Statements. This increased frequency enables you to track your account better",
              "features":[
                {
                  "featureId": "ACH_COLLECTION_1",
                  "featureName":"DomesticWireTransfer_1",
                  "featureDescription":"WireTransferswithinthecountry",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_1_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_1_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_2",
                  "featureName":"DomesticWireTransfer_2",
                  "featureDescription":"WireTransferswithinthecountry_2",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_2_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_2_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_3",
                  "featureName":"DomesticWireTransfer_3",
                  "featureDescription":"WireTransferswithinthecountry_3",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_3_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_3_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_4",
                  "featureName":"DomesticWireTransfer_4",
                  "featureDescription":"WireTransferswithinthecountry_4",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_4_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_4_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_4_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_4_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_5",
                  "featureName":"DomesticWireTransfer_5",
                  "featureDescription":"WireTransferswithinthecountry_5",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_5_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_5_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_5_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_5_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_6",
                  "featureName":"DomesticWireTransfer_6",
                  "featureDescription":"WireTransferswithinthecountry_6",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_6_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_6_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_6_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_6_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_7",
                  "featureName":"DomesticWireTransfer_7",
                  "featureDescription":"WireTransferswithinthecountry_7",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_7_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_7_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_7_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_7_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_8",
                  "featureName":"DomesticWireTransfer_8",
                  "featureDescription":"WireTransferswithinthecountry_8",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_8_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_8_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_8_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_8_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_9",
                  "featureName":"DomesticWireTransfer_9",
                  "featureDescription":"WireTransferswithinthecountry_9",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_9_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_9_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_9_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_9_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_10",
                  "featureName":"DomesticWireTransfer_10",
                  "featureDescription":"WireTransferswithinthecountry_10",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_10_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_10_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_10_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_10_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "ACH_COLLECTION_11",
                  "featureName":"DomesticWireTransfer_11",
                  "featureDescription":"WireTransferswithinthecountry_11",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_11_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_11_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "ACH_COLLECTION_CREATE_11_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_11_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],

                }

              ]
            },
            {
              "facilityId": "FC2345678446",
              "code": "dummy code value",
              "facilityName": "Cheque Book Premium",
              "description": "This facility provides a cheque book",
              "features":[
                {
                  "featureId": "CHEQUE_BOOK_1",
                  "featureName":"ChequeBookPremium_1",
                  "featureDescription":"WireTransferswithinthecountry",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "CHEQUE_BOOK_1_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_1_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "CHEQUE_BOOK_2",
                  "featureName":"DomesticWireTransfer_2",
                  "featureDescription":"WireTransferswithinthecountry_2",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "CHEQUE_BOOK_2_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CHEQUE_BOOK_2_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "CHEQUE_BOOK_3",
                  "featureName":"DomesticWireTransfer_3",
                  "featureDescription":"WireTransferswithinthecountry_3",
                  "featureStatus":"SID_FEATURE_ACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "CHEQUE_BOOK_3_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CHEQUE_BOOK_3_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                }                  
              ]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Credit Card234567890 2345678901234567890 234567890",
              "description": "Credit Card Bla bla0123456789012345678901234567890123456789012345678901234567890 234567890 234567890Credit Card Bla bla0123456789012345678901234567890123456789012345678901234567890 234567890 234567890Credit Card Bla bla0123456789012345678901234567890123456789012345678901234567890 234567890 234567890",
              "features":[
                {
                  "featureId": "CREDIT_CARD_1",
                  "featureName":"DomesticWireTransfer_1",
                  "featureDescription":"WireTransferswithinthecountry",
                  "featureStatus":"SID_FEATURE_INACTIVE",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "CREDIT_CARD_1_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_1_1",
                      "actionStatus":"SID_ACTION_INACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "CREDIT_CARD_2",
                  "featureName":"DomesticWireTransfer_2",
                  "featureDescription":"WireTransferswithinthecountry_2",
                  "featureStatus":"SID_FEATURE_SUSPENDED",
                  "isSelected":"true",
                  "actions": [
                    {
                      "actionsId": "CREDIT_CARD_2_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CREDIT_CARD_2_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    },
                    {
                      "actionsId": "CREDIT_CARD_2_3",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_2_3",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"true" 
                    }
                  ],
                },
                {
                  "featureId": "CREDIT_CARD_3",
                  "featureName":"DomesticWireTransfer_3",
                  "featureDescription":"WireTransferswithinthecountry_3",
                  "featureStatus":"SID_FEATURE_UNAVAILABLE",
                  "isSelected":"false",
                  "actions": [
                    {
                      "actionsId": "CREDIT_CARD_3_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CREDIT_CARD_3_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_2",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CREDIT_CARD_3_3",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_3_3",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    }
                  ],
                },
                {
                  "featureId": "CREDIT_CARD_4",
                  "featureName":"DomesticWireTransfer_4",
                  "featureDescription":"WireTransferswithinthecountry_4",
                  "featureStatus":"SID_FEATURE_INACTIVE",
                  "isSelected":"false",
                  "actions": [
                    {
                      "actionsId": "CREDIT_CARD_4_1",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_4_1",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CREDIT_CARD_4_2",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_4_2",
                      "actionStatus":"SID_ACTION_INACTIVE",
                      "isSelected":"false" 
                    },
                    {
                      "actionsId": "CREDIT_CARD_4_3",
                      "actionDescription":"AutomatedClearingHousePaymentService",
                      "actionName":"AutomatedClearingHousePaymentService_4_3",
                      "actionStatus":"SID_ACTION_ACTIVE",
                      "isSelected":"false" 
                    }
                  ],
                }                   
              ]
            },                
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },                
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
            {
              "facilityId": "FC2345678447",
              "code": "dummy code value",
              "facilityName": "Facility without features",
              "description": "Facility without features Bla bla",
              "features":[]
            },
          ]};


      return facilitiesList.facilities;  
    }, 

    setFacilitiesSegmentData: function(facilitiesList) {
      var scopeObj = this;
      this.gblServicesData = [
        [
          this.gblServicesList
        ]
      ];
      if (facilitiesList === undefined) {
        scopeObj.view.segFacilities.setData([]);
      } else {
        var records = facilitiesList;
        if (records.length === 0) {
          scopeObj.showNoResultsFacilitiesFound();
          if (scopeObj.view.subHeaderFacilities.flxSearch.isVisible === false) {
            scopeObj.view.subHeaderFacilities.btnAddFacilities.setVisibility(false);
            scopeObj.view.btnAddNewFacilities.setVisibility(true);
            scopeObj.view.rtxNoResultsFacilitiesFound.text = kony.i18n.getLocalizedString("frmServiceManagement.No_Facilities_Found");
            scopeObj.cancelAddFacilitiesScreen("addFacility");
          }
        } else {
          var dataMap = {
            //widget mappings
            "lblFacilityName": "facilityName",
            "lblFacilityCode" : "code",
            "lblFacilityNbOfFeatures" : "numOfFeatures",
            "lblDescriptionHeader": "lblDescriptionHeader",
            "lblDescriptionValue": "lblDescriptionValue",
            "fonticonArrowFacility":"fonticonArrowFacility",
            "lblIconImgEditFacility" : "lblIconImgEditFacility",
            "flxDropdownFacility" : "flxDropdownFacility",
            "flxFacilityDescriptionContent" : "flxFacilityDescriptionContent",
            "flxEditFacility": "flxEditFacility",
            "featuresList": "featuresList",
            "lblSeparatorSegFacility": "lblSeparatorSegFacility"
          };
          scopeObj.hideNoResultsFacilitiesFound();
          scopeObj.facilityOptionView ?
            scopeObj.cancelAddFacilitiesScreen(scopeObj.facilityOptionView) :
          scopeObj.cancelAddFacilitiesScreen(scopeObj.facilityOption);
          var data = facilitiesList.map(scopeObj.toViewFacilitiesSegment.bind(scopeObj)); 
          scopeObj.view.segFacilities.widgetDataMap = dataMap;
          scopeObj.view.segFacilities.setData(data);
          scopeObj.view.forceLayout();
        }
      }
    },

    // Populate an empty facility, and all the features  
    setFacilitiesSegmentDataForEmptyFacilitiesList: function(featuresList) {
      var scopeObj = this;
      this.gblServicesData = [
        [
          this.gblServicesList
        ]
      ];

      scopeObj.view.segFacilities.setData([]);

      var parsedFeaturesList = [];
      var parsedActionsList = [];

      featuresList.features.forEach(feature => {	
        parsedActionsList = [];
        feature.actions.forEach(action => {
          parsedActionsList.push(
            {
              "actionId": action.id,
              "actionDescription":action.description,
              "actionName":action.name,
              "actionStatus":action.status,
              "isSelected":"false"               
            }         
          );
        });
        parsedFeaturesList.push(
          {
            "featureId": feature.id,
            "featureName":feature.name,
            "featureDescription":feature.description,
            "featureStatus":feature.status,
            "isSelected":"false",
            "actions": parsedActionsList                    
          }
        );
      });


      var featuresListForEmptyFacilitiesList = 
          {"facilities": [    
            {
              "facilityId": "",
              "code": "",
              "facilityName": "",
              "description": "",
              "features": parsedFeaturesList
            }
          ]};

      return featuresListForEmptyFacilitiesList;  
    },

    setFeaturesSegmentData: function (featuresList,isFilter) {

      var scopeObj = this;
      this.gblServicesData = [
        [
          this.gblServicesList
        ]
      ];
      if (featuresList === undefined) {
        scopeObj.view.segFeatures.setData([]);
      } else {
        var records = featuresList;
        if (records.length === 0) {
          scopeObj.showNoResultsFound();
          if(isFilter){
            this.view.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
            this.view.flxHeaderFeatures.setVisibility(true);
          }
        } else {
          var dataMap = {
            //required fields mappings
            "id": "id",
            "name": "name",
            "Type_id":"Type_id",
            "Status_id":"Status_id",
            "DisplayName": "DisplayName",
            "DisplayDesc": "DisplayDesc",
            "Service_fee":"Service_fee",
            "displayContent":"displayContent",
            "featureIds":"featureIds",
            "legalEntityId":"legalEntityId",
            //widget mappings
            "lblFeatureName": "lblFeatureName",
            "lblFeatureCode" : "lblFeatureCode",
            "lblIconImgOptions": "lblIconImgOptions",
            "lblFeatureType": "lblFeatureType",
            "lblFeatureStatus": "lblFeatureStatus",
            "fontIconStatusImg" : "fontIconStatusImg",
            "flxFeatureStatus" : "flxFeatureStatus",
            "lblSeperator":"lblSeperator",
            "flxOptions":"flxOptions",
            "flxDropdown":"flxDropdown",
            "fonticonArrow":"fonticonArrow",
            "flxFeatureDescriptionContent":"flxFeatureDescriptionContent",
            "lblDescriptionHeader": "lblDescriptionHeader",
            "lblDescriptionValue": "lblDescriptionValue"
          };
          scopeObj.hideNoResultsFound();
          var data = featuresList.map(scopeObj.toViewFeaturesSegment.bind(scopeObj)); 
          scopeObj.view.segFeatures.widgetDataMap = dataMap;
          scopeObj.view.segFeatures.setData(data);
          if (document.getElementById("frmServiceManagement_listingSegmentClient_segListing"))
            document.getElementById("frmServiceManagement_flxSegmentFeatures").onscroll = scopeObj.contextualMenuOff;
          scopeObj.view.forceLayout();
        }
      }
    },
    contextualMenuOff: function(context) {
      var scopeObj = this;
      scopeObj.view.flxContextualMenu.setVisibility(false);
      scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
      this.view.forceLayout();
    },
    /*
  * function to set data to type and status filter segments
  */
    setListFiltersData: function () {
      var self = this;
      var statusList=[],typeList=[],maxStatusText = "",maxTypeText ="";
      for(var i=0;i<self.featuresRecList.length;i++){
        if(!statusList.contains(self.featuresRecList[i].Status_id))
          statusList.push(self.featuresRecList[i].Status_id);
        for(var x=0;x<self.featuresRecList[i].roleTypes.length;x++){
          if(!typeList.some(el => el.name === self.featuresRecList[i].roleTypes[x].name))
            typeList.push(self.featuresRecList[i].roleTypes[x]);
        }
      }
      var widgetMap = {
        "Status_id": "Status_id",
        "Type_id": "Type_id",
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
      };
      var statusData = statusList.map(function(rec){
        var mapJson = {
          "Status_id": rec,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": (rec === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE)? kony.i18n.getLocalizedString("i18n.secureimage.Active"):(rec === self.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE)?kony.i18n.getLocalizedString("i18n.secureimage.Inactive"):kony.i18n.getLocalizedString("i18n.common.Unavailable")
        };
        maxStatusText = mapJson['lblDescription'].length > maxStatusText.length ? mapJson['lblDescription'] : maxStatusText; 
        return mapJson;
      });
      var typeData = typeList.map(function(rec){
        maxTypeText = rec.name.length > maxTypeText.length ? rec.name : maxTypeText;
        return {
          "Type_id": rec.id,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": {"text":self.AdminConsoleCommonUtils.getTruncatedString(rec.name, 30, 28),
                             "info":{"value":rec.name},
                             "tooltip":rec.name}
        };
      });
      self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.TypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.statusFilterMenu.segStatusFilterDropdown.setData(statusData);
      self.view.TypeFilterMenu.segStatusFilterDropdown.setData(typeData);

      var selStatusInd = [],selTypeInd = [];
      for(var j=0;j<statusList.length;j++){
        selStatusInd.push(j);
      }
      for(var k=0;k<typeList.length;k++){
        selTypeInd.push(k);
      }
      self.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selStatusInd]];
      self.view.TypeFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selTypeInd]];
      //set filter width
      self.view.flxFeatureStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxStatusText)+55+"px";
      self.view.flxFeatureTypeFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxTypeText)+55+"px";
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
      var featuresList = data || self.featuresRecList;
      var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
      var typeIndices = self.view.TypeFilterMenu.segStatusFilterDropdown.selectedIndices;
      selFilter[0][1] = [];
      selFilter[0][0] = [];
      var selStatusInd = null;
      var selTypeInd = null;
      //get selected types
      var types = "";
      selTypeInd = typeIndices ? typeIndices[0][1] : [];
      for (var i = 0; i < selTypeInd.length; i++) {
        selFilter[0][0].push(self.view.TypeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].Type_id);
        types += self.view.TypeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].Type_id + ",";
      }
      //get selected status
      var statuses = "";
      selStatusInd = statusIndices ? statusIndices[0][1] : [];
      for (var j = 0; j < selStatusInd.length; j++) {
        selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id);
        statuses += self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id + ",";
      }

      if(self.view.mainHeader.btnDropdownList.info === undefined) {
        self.view.mainHeader.btnDropdownList.info = {};
      }
      self.view.mainHeader.btnDropdownList.info.selectedTypeList = types.substring(0, types.length-1);
      self.view.mainHeader.btnDropdownList.info.selectedStatusList = statuses.substring(0, statuses.length-1);
      self.view.mainHeader.btnDropdownList.info.selectedLegalEntityId = self.view.AdvancedSearchDropDownServType.sgmentData.data[0].legalEntityId;

      if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
        dataToShow = [];
      } else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
        dataToShow = featuresList.filter(function (rec) {
          var featureIdList = [];
          var featureType = rec.roleTypes;
          //list of role type id
          featureIdList = featureType.reduce(
            function (list, record) {
              return list.concat(record.id) ;
            }, []);

          if (selFilter[0][1].indexOf(rec.Status_id) >= 0) {
            for(var k=0;k< featureIdList.length;k++){
              if(selFilter[0][0].indexOf(featureIdList[k]) >= 0){
                return rec;
              }
            }
          }
        });
      } else { //single filter selected
      }
      return dataToShow;
    },
    toViewFeaturesSegment: function(feature) {
      var scopeObj = this;
      var segData = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.data
      var UpdateLegalEntities=this.getLEListForFormAction("frmServiceManagement",'UPDATE');
      var selectedLegalEntityId = this.selectedLegalEntityId;
      var toDisplayOtions=true;
      for (var i = 0; i < UpdateLegalEntities.length; i++) {
        if (UpdateLegalEntities[i].id.indexOf(selectedLegalEntityId) === 0) {
               toDisplayOtions = true;
               break;
        } else {
               toDisplayOtions = false;
               }
          }
      var featureNameList = [],featureIdList = [];
      var featureType = feature.roleTypes;
      featureNameList = featureType.reduce(
        function (list, record) {
          var name = ", " + record.name;
          return list  + name ;
        }, "");
      featureIdList = featureType.reduce(
        function (list, record) {
          return list.concat([record.id]) ;
        }, []);
      var status ="",statusSkin="";
      var totalactions = (parseInt(feature.nonMonetaryActions, 10) + parseInt(feature.monetaryActions, 10)).toString();
      if(feature.Status_id === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE){
        status = kony.i18n.getLocalizedString("i18n.secureimage.Active");
        statusSkin = "sknFontIconActivate";
      }else if(feature.Status_id === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
        status = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
        statusSkin = "sknfontIconInactive";
      }else{
        status = kony.i18n.getLocalizedString("i18n.common.Unavailable");
        statusSkin = "sknIconBgE61919S12px";
      }
      return {
        "id": feature.id,
        "name":feature.name,
        "Type_id":feature.Type_id,
        "Status_id":feature.Status_id,
        "Service_fee":feature.Service_Fee,
        "legalEntityId":feature.legalEntityId,
        "featureTypes": feature.roleTypes,
        "displayContent":feature.featureDisplayName,
        "featureIds":featureIdList,
        "description":feature.description,
        "lblFeatureName": {
          "text": feature.name
        },
        "flxDropdown": {
          "onClick": scopeObj.toggleFeatureDescription
        },
        "fonticonArrow": {
          "text": "\ue922",
          "skin": "sknfontIconDescRightArrow14px"
        },
        "flxFeatureDescriptionContent": {
          "isVisible": false
        },
        "lblFeatureCode": {
          "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(feature.id,25,21),
          "info":{"value" :feature.id || "-"},
          "tooltip":feature.id || ""
        },
        "lblFeatureType": {
          "text": featureNameList.substr(2) 
        },
        "fontIconStatusImg": {
          "text": "\ue921",
          "skin": statusSkin
        },
        "lblFeatureStatus": {
          "text": status
        },

        "flxOptions": {
          "isVisible": (toDisplayOtions===false) ? false : true,
          "onClick": function () {
            scopeObj.toggleContextualMenu(50);
          },
          "skin" : "slFbox"
        },
        "lblIconImgOptions": {
          "text":"\ue91f",
          "skin":"sknFontIconOptionMenu"
        },
        "lblSeperator": {
          "text": "."
        },
        "lblDescriptionHeader": "ACTIONS(" + totalactions + ")" ,
        "lblDescriptionValue": "Monetary(" + feature.monetaryActions + "),  Non-monetory(" + feature.nonMonetaryActions + ")",
        "template": "flxFeatures",
      };
    },

    toViewFacilitiesSegment: function(facility) {
      var scopeObj = this;
      var totalFeatures = (facility.feature) ? parseInt(facility.features.length, 10) : 0;
      var jsonFacilityId = { "facilityId": facility.facilityId};
      return {
        "facilityId": facility.facilityId,
        "facilityName": ((facility.facilityName && facility.facilityName.length !== 0) ? facility.facilityName : kony.i18n.getLocalizedString("i18n.Applications.NA")),
        "code": facility.code,
        "description": facility.description,
        "features": facility.features,
        "numOfFeatures": facility.numOfFeatures,      
        "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.facility.description"),
        "lblDescriptionValue": facility.description,
        "fonticonArrowFacility": {
          "text": "\ue922", 
          "skin": "sknfontIconDescRightArrow14px"
        },
        "lblIconImgEditFacility": {
          "text":kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconOption1"),
          "skin": "sknFontIconSearchCross20px"
        },
        "flxDropdownFacility": {
          "onClick": scopeObj.toggleFacilityDescription
        },
        "flxFacilityDescriptionContent": {
          "isVisible": false
        },
        "flxEditFacility": {
          "onClick":this.clickEditOption
        },
        "featuresList": facility.features,
        "lblSeparatorSegFacility": {
          "text": "-"
        }
      };
    },

    toggleContextualMenu: function() {
      var scopeObj = this;

      var index = this.view.segFeatures.selectedIndex;
      this.optionButtonStateChange(index[1], true);

      if (this.view.flxContextualMenu.isVisible === false) {
        this.rowIndex = index[1];
        var templateArray = this.view.segFeatures.clonedTemplates;
        //to caluclate top from preffered row heights
        var finalHeight = 0;
        for(var i = 0; i < this.rowIndex; i++){
          finalHeight = finalHeight + templateArray[i].flxFeatures.frame.height;
        }
        var flexLeft = this.view.segFeatures.clonedTemplates[this.rowIndex].flxOptions.frame.x;
        this.view.flxContextualMenu.left=flexLeft-74+"px";
        this.updateContextualMenu();
        this.view.flxContextualMenu.setVisibility(true);
        this.view.forceLayout();
        var segmentWidget = this.view.flxSegmentFeatures;
        var contextualWidget =this.view.contextualMenu;
        finalHeight = ((finalHeight + 39)- segmentWidget.contentOffsetMeasured.y+60);
        if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
          finalHeight = finalHeight - contextualWidget.frame.height - 30;
          scopeObj.view.contextualMenu.flxUpArrowImage.setVisibility(false);
          scopeObj.view.contextualMenu.flxDownArrowImage.setVisibility(true);
          scopeObj.view.contextualMenu.contextualMenu1Inner.top = "0px";
        }
        else {
          scopeObj.view.contextualMenu.flxUpArrowImage.setVisibility(true);
          scopeObj.view.contextualMenu.flxDownArrowImage.setVisibility(false);
          scopeObj.view.contextualMenu.contextualMenu1Inner.top = "-1px";
        }
        this.view.flxContextualMenu.top= finalHeight + "px";
      } else {
        this.view.flxContextualMenu.setVisibility(false);
      }
      if(this.view.flxFeatureStatusFilter.isVisible){
        this.view.flxFeatureStatusFilter.setVisibility(false);
      }
    },
    toggleContextualMenuAction: function() {
      var scopeObj = this;

      var index = this.view.segActionList.selectedIndex;
      this.optionButtonStateChangeAction(index[1], true);

      if (this.view.flxContextualMenuAction.isVisible === false) {
        this.rowIndex = index[1];
        var templateArray = this.view.segActionList.clonedTemplates;
        //to caluclate top from preffered row heights
        var finalHeight = 0;
        for(var i = 0; i < this.rowIndex; i++){
          finalHeight = finalHeight + templateArray[i].flxFeatureActionsList.frame.height;
        }
        var flexLeft = this.view.segActionList.clonedTemplates[this.rowIndex].flxOptions.frame.x;
        this.view.flxContextualMenuAction.left=flexLeft-74+"px";
        this.updateContextualMenuAction();
        this.view.flxContextualMenuAction.setVisibility(true);
        this.view.forceLayout();
        var segmentWidget = this.view.flxViewServiceData;
        var contextualWidget =this.view.contextualMenuAction;
        finalHeight = ((finalHeight + 75)- segmentWidget.contentOffsetMeasured.y+60);
        if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
          finalHeight = finalHeight - contextualWidget.frame.height - 30;
          scopeObj.view.contextualMenuAction.flxUpArrowImage.setVisibility(false);
          scopeObj.view.contextualMenuAction.flxDownArrowImage.setVisibility(true);
          scopeObj.view.contextualMenuAction.contextualMenu1Inner.top = "0px";
        }
        else {
          scopeObj.view.contextualMenuAction.flxUpArrowImage.setVisibility(true);
          scopeObj.view.contextualMenuAction.flxDownArrowImage.setVisibility(false);
          scopeObj.view.contextualMenuAction.contextualMenu1Inner.top = "-1px";
        }
        this.view.flxContextualMenuAction.top= finalHeight + segmentWidget.contentOffsetMeasured.y + "px";
      } else {
        this.view.flxContextualMenuAction.setVisibility(false);
      }
      this.view.flxDetailsActionStatusFilter.setVisibility(false);
      this.view.flxDetailsActionTypeFilter.setVisibility(false);
      this.view.flxDetailsActionCategoryFilter.setVisibility(false);
      this.view.flxDetailsActionLimitGroupFilter.setVisibility(false);
    },
    updateContextualMenuAction: function() {
      kony.print("Inside updateContextualMenu()");
      this.view.contextualMenuAction.flxOption2.setVisibility(true);
      this.view.contextualMenuAction.flxOption1.top="10px";
      var data = this.view.segActionList.data;
      if (data[this.rowIndex].lblActionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        this.view.contextualMenuAction.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        this.view.contextualMenuAction.lblIconOption2.text = "\ue91c";
        this.view.contextualMenuAction.lblIconOption2.skin = "sknIcon20px";
      } else if(data[this.rowIndex].lblActionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
        this.view.contextualMenuAction.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
        this.view.contextualMenuAction.lblIconOption2.text = "\ue931";
        this.view.contextualMenuAction.lblIconOption2.skin = "sknIcon20px";
      }else{
        this.view.contextualMenuAction.flxOption1.top="0px";
        this.view.contextualMenuAction.flxOption2.setVisibility(false);
      }
      this.view.forceLayout();
    },

    updateContextualMenu: function() {
      kony.print("Inside updateContextualMenu()");
      this.view.contextualMenu.flxOption2.setVisibility(true);
      this.view.contextualMenu.flxOption1.top="10px";
      var data = this.view.segFeatures.data;
      if (data[this.rowIndex].lblFeatureStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        this.view.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        this.view.contextualMenu.lblIconOption2.text = "\ue91c";
        this.view.contextualMenu.lblIconOption2.skin = "sknIcon20px";
      } else if(data[this.rowIndex].lblFeatureStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
        this.view.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
        this.view.contextualMenu.lblIconOption2.text = "\ue931";
        this.view.contextualMenu.lblIconOption2.skin = "sknIcon20px";
      }else{
        this.view.contextualMenu.flxOption1.top="0px";
        this.view.contextualMenu.flxOption2.setVisibility(false);
      }
      this.view.forceLayout();
    },
    // for the search treatments in the facility details view page
    showNoResultsFoundFeaturesAndActions : function(){
      this.view.viewDetailsAction.flxActionView.setVisibility(false);
      this.view.viewDetailsAction.flxNoRecordsFound.setVisibility(true);
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.viewDetailsAction.search.tbxSearchBox.text);
      if (this.view.viewDetailsAction.search.flxSearch.isVisible === false) {
        this.view.viewDetailsAction.rtxNoResultsFound.text = kony.i18n.getLocalizedString("frmServiceManagement.No_Features_Available");
      } else {
        this.view.viewDetailsAction.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText +"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      }
      this.view.forceLayout();
    },
    showNoResultsFacilitiesFound : function(){
      this.view.segFacilities.setVisibility(false);
      this.view.flxHeaderFacilities.setVisibility(false);
      this.view.rtxNoResultsFacilitiesFound.setVisibility(true);
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeaderFacilities.tbxSearchBox.text);
      if (this.view.subHeaderFacilities.flxSearch.isVisible === false) {
        this.view.rtxNoResultsFacilitiesFound.text = kony.i18n.getLocalizedString("frmServiceManagement.No_Facilities_Available");
      } else {
        this.view.rtxNoResultsFacilitiesFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+  searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      }
      this.view.forceLayout();
    },
    showNoResultsFound : function(){
      this.view.segFeatures.setVisibility(false);
      this.view.rtxNoResultsFound.setVisibility(true);
      this.view.flxHeaderFeatures.setVisibility(false);
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.searchBoxFeatures.tbxSearchBox.text);
      this.view.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+ searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      this.view.forceLayout();
    },
    hideNoResultsFound : function(){
      this.view.segFeatures.setVisibility(true);
      this.view.rtxNoResultsFound.setVisibility(false);
      this.view.flxHeaderFeatures.setVisibility(true);
      this.view.forceLayout();
    },
    hideNoResultsFacilitiesFound : function(){
      this.view.segFacilities.setVisibility(true);
      this.view.rtxNoResultsFacilitiesFound.setVisibility(false);
      this.view.flxHeaderFacilities.setVisibility(true);
      this.view.forceLayout();
    },
    searchFilter: function(serviceData) {
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.searchBoxFeatures.tbxSearchBox.text);
      if (typeof searchText === "string" && searchText.length > 0) {
        return (
          serviceData.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
      } else {
        return true;
      }
    },
    searchFilterFacilities: function(serviceData) {
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeaderFacilities.tbxSearchBox.text);
      if (typeof searchText === "string" && searchText.length > 0) {
        if (serviceData.facilityName) {
          return (serviceData.facilityName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
        } else {
          return false;
        }
      } else {      
        return true;
      }  
    },
    // for the search treatments in the facility details view page
    searchFilterFeaturesAndActions: function(serviceData) {
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.viewDetailsAction.search.tbxSearchBox.text);
      if (typeof searchText === "string" && searchText.length > 0) {
        var isActionFound = this.searchFilterActions(serviceData.actions, searchText);
        return ((serviceData.featureName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 && serviceData.isSelected == "true") || isActionFound);
      } else {
        return true;
      }
    },

    searchFilterActions: function(listActions, txtToSearch) {
      var findAction = "";

      if (listActions.length !== 0) {
        for (var i = 0; i < listActions.length; i++) {
          if (listActions[i].actionName.toLowerCase().indexOf(txtToSearch.toLowerCase()) !== -1 && listActions[i].isSelected == "true")  {
            listActions[i].show = "true";
            findAction = "true";          
          } else {
            listActions[i].show = "false";          
          }
        }
      } else {
        return false;
      }  

      if (findAction === "true") {
        return true;
      } else {
        return false;
      }
    },

    /*
   *function to clear inline  errors
   */
    clearInlineErrors : function(){
      var self = this;
      self.view.ValueEntry.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.tbxEditFeatureName.skin="skntbxLato35475f14px";
      self.view.txtareaEditFeatureDescription.skin="skntxtAreaLato35475f14Px";
      self.view.flxNoServiceFee.setVisibility(false);
      self.view.flxNoEditFeatureNameError.setVisibility(false);
      self.view.flxNoEditFeatureDescriptionError.setVisibility(false);
      self.view.valueEntryMinValueLimit.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.valueEntryMaxValueLimit.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.valueEntryMaxDailyValue.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.forceLayout();
    },
    /*
   * function to call presentation controller to get all master data
   */
    getMasterDataservices : function(){
      var self =this;
      self.presenter.getFeaturesMasterData();
    },
    /*
   * function to call presentation controller to fetch all features
   */
    getAllFeatures : function(selectedLegalEntityId){
      var self = this;
      self.presenter.fetchAllFeatures(selectedLegalEntityId);
    },
    /*
   * function to call update function of presentation controller
   * @ param : edited data request param
   */
    updateServiceDetails : function (editReqParam) {
      var self = this;
      var condition = self.validation();
      if (condition) {
        self.presenter.updateService(editReqParam);
        self.hideService();
      }
    },  /*
   * function to prefill service details form
   */
    prefillFeatureDataForEdit : function(opt){
      var index = this.view.segFeatures.selectedRowIndex;
      var rowInd = index[1];
      var rowData = this.view.segFeatures.data[rowInd];
      var featureDisplay=[];
      this.editFeatureReqParam={
        "featureId":rowData.id,
        "serviceFee":rowData.Service_fee,
        "statusId":rowData.Status_id,
        "featureDisplay":featureDisplay,
        "legalEntityId":rowData.legalEntityId,
        "actions":[]
      };
      var inputReq = {};
      if(opt === 1){
        inputReq = {"context": "editLimits",
                    "requestParam": {"featureId":rowData.id, "legalEntityId":rowData.legalEntityId}
                   };
      }else{
        inputReq = {"context": "editView",
                    "requestParam": {"featureId":rowData.id, "legalEntityId":rowData.legalEntityId}
                   };
        this.subTabsButtonUtilFunction([this.view.btnFeatures,this.view.btnActions],this.view.btnFeatures);
        this.view.flxFeaturedAction.setVisibility(false);
        this.view.flxFeatureContainer.setVisibility(true);
      }
      this.presenter.getActionsOfFeature(inputReq);
      this.setSegLangData(rowData);
      this.displaySelectedLanguageContentEditMode();
      this.view.lblData2.text=rowData.lblFeatureType.text;
      this.view.lblData1.text=rowData.lblFeatureCode.text;
      this.view.lblData1.toolTip=rowData.lblFeatureCode.tooltip;
      this.view.ValueEntry.lblCurrencySymbol.text = this.currencyIconValue;
      this.view.ValueEntry.tbxEnterValue.text=rowData.Service_fee!==""?rowData.Service_fee:"0";
      this.view.ValueEntry.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      if(rowData.Status_id!==this.AdminConsoleCommonUtils.constantConfig.FEATURE_UNAVAILABLE){
        this.view.lblActiveText.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active");
        this.view.featureStatusSwitch.switchToggle.selectedIndex=rowData.lblFeatureStatus.text==="Active"?0:1;
        this.view.flxEditAlertStatusSwitch.setVisibility(true);
      }else{
        this.view.flxEditAlertStatusSwitch.setVisibility(false);
        this.view.lblActiveText.text=kony.i18n.getLocalizedString("i18n.common.Unavailable");
      }
      this.view.tbxEditFeatureName.skin="skntbxLato35475f14px";
      this.view.txtareaEditFeatureDescription.skin="skntxtAreaLato35475f14Px";
      this.view.lblFeaturesPopupHeading.text=kony.i18n.getLocalizedString("i18n.frmServiceManagement.EditFeature")+" - ";
      this.view.lblFeatureNamePopup.text=rowData.name;
      this.clearInlineErrors();
      if(this.view.flxFeatureLanguages.isVisible===true)
        this.view.flxFeatureLanguages.setVisibility(false);
      this.view.lblFeatureNameCount.text = this.view.tbxEditFeatureName.text.length + "/60";
      this.view.lblFeatureDescriptionCount.text = this.view.txtareaEditFeatureDescription.text.length + "/100";
      this.view.forceLayout();
    },
    /*
   *null check function
   *@param: value to compare, default value to return
   *@return
   */
    checkForNull : function(value,defaultReturnValue){
      if(value === null || value === undefined || value === kony.i18n.getLocalizedString("i18n.Applications.NA") || value === "-" || value === "")
        return defaultReturnValue;
      else
        return value;
    },
    /*
    * function called on click of download csv
    */
    downloadServicesCSV: function () {
      var scopeObj = this;
      var paramCount = 0;
      var selectedData = scopeObj.view.lblSelectedRowsServType.text;
      var selectedLegalEntityId;
      var segData = scopeObj.view.AdvancedSearchDropDownServType.sgmentData.data
      segData.forEach(function (data) {
        if (data.lblDescription && data.legalEntityId && data.lblDescription === selectedData)
          selectedLegalEntityId = data.legalEntityId;
      });
      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
      var downloadURL = mfURL + "/services/data/v1/StaticContentObjService/operations/service/downloadFeaturesList";
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.searchBoxFeatures.tbxSearchBox.text);
      if (searchText !== "") {
        paramCount = paramCount + 1;
        downloadURL = downloadURL + "?searchText=" + searchText;
      }

      var downloadServicesFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

      if (downloadServicesFilterJSON !== undefined && downloadServicesFilterJSON.selectedStatusList !== undefined &&
        downloadServicesFilterJSON.selectedTypeList !== undefined) {
        var statusParam = paramCount > 0 ? "&status=" : "?status=";
        var status = statusParam + downloadServicesFilterJSON.selectedStatusList;
        downloadURL = downloadURL + status;
        var types = "&type=" + downloadServicesFilterJSON.selectedTypeList;
        downloadURL = downloadURL + types;
        var selectedLegalEntity = "&companyLegalUnit=" + (selectedLegalEntityId ? selectedLegalEntityId : downloadServicesFilterJSON.selectedLegalEntityId);
        downloadURL = downloadURL + selectedLegalEntity;
      }
      scopeObj.callDownloadCSVService(downloadURL, "Features");
    },
    /*
   * function to set data to view service details screen, called on click of seg row
   */
    setViewFeatureData : function(){
      var index = this.view.segFeatures.selectedIndex;
      var rowIndex = index[1];
      var rowData = this.view.segFeatures.data[rowIndex];
      this.view.breadcrumbs.lblCurrentScreen.text = (rowData.lblFeatureName.text).toUpperCase();
      this.view.lblFeatureDetailsName.text = this.checkForNull(rowData.lblFeatureName.text,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.lblFeatureDetailsName.info = {"id":rowData.id};
      this.view.lblFeatureDetailsStatusValue.text = this.checkForNull(rowData.lblFeatureStatus.text,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.lblIconViewKey.text = "\ue921";
      this.view.lblIconViewKey.skin = rowData.fontIconStatusImg.skin;
      var UpdateLegalEntities=this.getLEListForFormAction("frmServiceManagement",'UPDATE');
      var selectedLegalEntityId = this.selectedLegalEntityId; 
       for (var i = 0; i < UpdateLegalEntities.length; i++) {
          if (UpdateLegalEntities[i].id.indexOf(selectedLegalEntityId) === 0) {
              this.view.flxFeatureDetailsOptions.isVisible = true;
              break;
           } else {
              this.view.flxFeatureDetailsOptions.isVisible = false;
           }
        }
      if(this.view.lblFeatureDetailsStatusValue.text === "Inactive"){
        this.view.flxFeatureDetailsWarning.setVisibility(true);
      }else{
        this.view.flxFeatureDetailsWarning.setVisibility(false);
      }
      var langList = this.view.featuresLangList.segStatusFilterDropdown.info.lang;
      this.setLanguagesList(langList,false);

      this.view.lblFeatureDetailsRow11Value.text = this.checkForNull(rowData.lblFeatureType.text,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.lblFeatureDetailsRow12Value.text = this.AdminConsoleCommonUtils.getTruncatedString(this.checkForNull(rowData.lblFeatureCode.info.value,kony.i18n.getLocalizedString("i18n.Applications.NA")),28,26);
      this.view.lblFeatureDetailsRow12Value.toolTip = this.checkForNull(rowData.lblFeatureCode.info.value,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.lblFeatureDetailsRow12Value.info = {"id":this.checkForNull(rowData.lblFeatureCode.info.value,kony.i18n.getLocalizedString("i18n.Applications.NA"))};
      this.view.lblFeatureDetailsRow13Value.text = this.checkForNull(rowData.Service_fee,"") === "" ? kony.i18n.getLocalizedString("i18n.Applications.NA") : rowData.Service_fee;
      this.view.lblFeatureDetailsRow13Currency.text = this.currencyIconValue;

      this.displaySelectedLanguageContent();
      document.getElementById("frmServiceManagement_flxViewServiceData").onscroll = this.hideOptionMenuOnScroll;
    },

    /*
   * function to set data to view facility details screen, called on click of seg row
   */
    setViewFacilityData : function(context){

      //var index = this.view.segFacilities.selectedIndex;
      //var rowIndex = index[1];
      var rowData = this.facilityFeaturesEdit;
      var featuresSelected = [];

      this.view.viewDetailsAction.breadcrumbs1.lblCurrentScreen.text = ((rowData.facilityName && rowData.facilityName.length !== 0) ? rowData.facilityName : kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase();
      this.view.viewDetailsAction.lblFacilitiesActionDetailName.text = this.checkForNull(rowData.facilityName,kony.i18n.getLocalizedString("i18n.Applications.NA"));
      this.view.viewDetailsAction.lblFacilitiesActionDetailName.info = {"id":rowData.facilityId};
      this.view.viewDetailsAction.viewHeader.flxFacilityCode.lblViewValue.text = this.checkForNull(rowData.code,kony.i18n.getLocalizedString("i18n.Applications.NA"));

      this.view.viewDetailsAction.flxFacilitiesActionDetailsContainer.flxViewFacilitiesActionDetails.flxViewFacilitiesActionContent.flxDetailsView.viewHeader.skin = "slFbox";
      this.view.viewDetailsAction.viewHeader.lblViewDescValue.text = this.checkForNull(rowData.description, "");

      this.view.viewDetailsAction.viewHeader.flxFacilityDescription.height = 20 + "px";
      this.view.viewDetailsAction.viewHeader.lblViewDescValue.left = 0 + "px";
      this.view.viewDetailsAction.viewHeader.lblViewDescValue.top = 5 + "px";
      this.view.viewDetailsAction.viewHeader.flxFeaturesActions.top = 20 + "px";

      rowData.features.forEach(feature => {
        // On view screen we will only display the selected features and actions   
        if (context !== "detailsView" || feature.isSelected === "true") {
          featuresSelected.push(feature);
        }      
      });

      this.view.viewDetailsAction.viewHeader.flxFeaturesActions.lblFeaturesActions.text = (featuresSelected.length < 10) ? "Features (" + "0" + featuresSelected.length + ")" : "Features (" + featuresSelected.length + ")";

      // for the search in the page of the list of facilities
      if (featuresSelected.length === 0) {
        this.view.viewDetailsAction.search.flxSearch.setVisibility(false);
      } else {
        this.view.viewDetailsAction.search.flxSearch.setVisibility(true);
        this.view.viewDetailsAction.search.tbxSearchBox.text="";
        this.view.viewDetailsAction.search.flxSearchCancel.setVisibility(false);
        this.view.viewDetailsAction.flxActionView.setVisibility(true);
        this.view.viewDetailsAction.flxNoRecordsFound.setVisibility(false);
      }

      this.loadPageDataFeaturesActionsOfFacility = function() {
        var searchResult = featuresSelected
        .filter(this.searchFilterFeaturesAndActions)
        .sort(this.sortBy.sortData);
        this.getFeaturesOfCurrentFacility(searchResult,context);
      };
      this.getFeaturesOfCurrentFacility(featuresSelected,context);
    },

    /* update status value in feature details screen*/
    updateFeatureDetailScreenStatus : function(statusId){
      this.view.lblFeatureDetailsStatusValue.text = (statusId === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ?
        kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive") : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active");
      this.view.lblIconViewKey.skin = (statusId === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ? "sknfontIconInactive" : "sknFontIconActivate";
      if(statusId === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
        this.view.flxFeatureDetailsWarning.setVisibility(true);
      }else{
        this.view.flxFeatureDetailsWarning.setVisibility(false);
      }
      this.view.forceLayout();
    },
    /*
   * function called on status change to active/deactive
   * @param : row data , updated new status id,opt(1-list/2-details)
   */
    changeStatusOfService : function(rowData,updatedStatus,opt){
      var self =this;
      var editStatusReqParam = {
        "featureId": rowData.id,
        "statusId": updatedStatus,
        "serviceFee": self.checkForNull(rowData.Service_fee, "0"),
        "featureDisplay":[],
        "actions":[],
        "legalEntityId": rowData.legalEntityId
      };
      self.callUpdateStatus(editStatusReqParam,opt);
    },
    /*
   * function to call presentation controller to change status of service
   */
    callUpdateStatus : function(param,opt){
      var self = this;
      self.currSuccessMsg=self.successMsgParam.EDIT;
      self.presenter.updateStatusOfFeature(param,opt);
    },

    sortIconFor: function(column){
      return this.determineSortIcon(this.sortBy,column);
    },

    /*
   * function to reset all the sort images in groups list page
   */
    resetSortImages: function() {
      var self = this;
      self.determineSortFontIcon(self.sortBy, 'name', this.view.fontIconSortFeature);
      self.determineSortFontIcon(self.sortBy, 'id', this.view.fontIconCodeSort);
    },
    /*
   * function to reset all the sort images in facilities list page
   */
    resetSortImagesOnFacilities: function() {
      var self = this;
      self.determineSortFontIcon(self.sortBy, 'facilityName', this.view.fontIconSortFacility);
      self.determineSortFontIcon(self.sortBy, 'numOfFeatures', this.view.fontIconFacilityNbFeaturesSort);
    },
    validation : function () {
      var returnValue =true;
      return returnValue;
    },
    /*
   *on hover event for  hiding dropdown visibility
   */
    onHoverEventCallback:function(widget, context) {
      var scopeObj = this;
      var widGetId = widget.id;
      if (widGetId === "flxFeatureStatusFilter") { //for filter dropdown
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          scopeObj.view.flxFeatureStatusFilter.setVisibility(true);
        }  else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          scopeObj.view.flxFeatureStatusFilter.setVisibility(false);
        }
      } else if (widGetId === "flxContextualMenu") {
        var selectedIndex = scopeObj.view.segFeatures.selectedrowindex[1];
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          scopeObj.view.flxContextualMenu.setVisibility(true);
          scopeObj.optionButtonStateChange(selectedIndex, true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          scopeObj.view.flxContextualMenu.setVisibility(false);
          scopeObj.optionButtonStateChange(selectedIndex, false);
        }
      } else if (widGetId === "flxContextualMenuAction") {
        var selectedIndex = scopeObj.view.segActionList.selectedrowindex[1];
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          scopeObj.view.flxContextualMenuAction.setVisibility(true);
          scopeObj.optionButtonStateChangeAction(selectedIndex, true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          scopeObj.view.flxContextualMenuAction.setVisibility(false);
          scopeObj.optionButtonStateChangeAction(selectedIndex, false);
        }
      } else {
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          widget.setVisibility(true);
        }  else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          widget.setVisibility(false);
        }
      }
    },

    optionButtonStateChange : function(selectedIndex,condition){
      var scopeObj = this;
      var data = scopeObj.view.segFeatures.data;

      if(scopeObj.prevIndex !=-1 && scopeObj.prevIndex < data.length){
        var tempDataPrev = data[scopeObj.prevIndex];
        tempDataPrev.flxOptions.skin = "slFbox";
        scopeObj.view.segFeatures.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
      }
      var tempDataCurrent = data[selectedIndex];
      if(tempDataCurrent){
        tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
        scopeObj.view.segFeatures.setDataAt(tempDataCurrent, selectedIndex, 0);
        scopeObj.prevIndex = selectedIndex;
      }

    },
    optionButtonStateChangeAction : function(selectedIndex,condition){
      var scopeObj = this;
      var data = scopeObj.view.segActionList.data;

      if(scopeObj.prevIndex !=-1 && scopeObj.prevIndex < data.length){
        var tempDataPrev = data[scopeObj.prevIndex];
        tempDataPrev.flxOptions.skin = "slFbox";
        scopeObj.view.segActionList.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
      }
      var tempDataCurrent = data[selectedIndex];
      if(tempDataCurrent){
        tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
        scopeObj.view.segActionList.setDataAt(tempDataCurrent, selectedIndex, 0);
        scopeObj.prevIndex = selectedIndex;
      }

    },
    /*
   * get string value for backend, based on selected switch value
   */
    getToggleSelectedValueToString : function(index){
      if(index !== null && index === 0){
        return "1";
      } else{
        return "0";
      }
    },

    sortData : function(sortColumn){
      var scopeObj = this;
      var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
      scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
      scopeObj.sortBy.inAscendingOrder = sortOrder;
      scopeObj.getObjectSorter().column(sortColumn);
      var data = scopeObj.view.segFeatures.data.sort(scopeObj.sortBy.sortData);
      scopeObj.view.segFeatures.setData(data.slice(0,10));
      scopeObj.resetSortImages();
      var i = 10;
      if(data.length > 10 ){
        var timer = setInterval(function(){
          scopeObj.view.segFeatures.addAll(data.slice(i,i+10));
          i=i+10;
          if(i>data.length){
            clearInterval(timer);
          }
        }, 100);
      }
    },

    /* Sort Facilities list table */
    sortDataFacilities : function(sortColumn){
      var scopeObj = this;
      var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
      scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
      scopeObj.sortBy.inAscendingOrder = sortOrder;
      scopeObj.getObjectSorter().column(sortColumn);
      var data = scopeObj.view.segFacilities.data.sort(scopeObj.sortBy.sortData);
      scopeObj.view.segFacilities.setData(data.slice(0,10));
      scopeObj.resetSortImagesOnFacilities();
      var i = 10;
      if(data.length > 10 ){
        var timer = setInterval(function(){
          scopeObj.view.segFacilities.addAll(data.slice(i,i+10));
          i=i+10;
          if(i>data.length){
            clearInterval(timer);
          }
        }, 100);
      }
    },

    mapActionsList : function(data){
      var self = this;
      var widgetMap = {
        "flxArrow":"flxArrow",
        "lblArrow":"lblArrow",
        "lblActionName":"lblActionName",
        "lblActionCode":"lblActionCode",
        "lblActionType":"lblActionType",
        "accessLevel": "accessLevel",
        "actionLevel":"actionLevel",
        "lblActionCategory":"lblActionCategory",
        "lblActionLimitGroup":"lblActionLimitGroup",
        "lblActionStatus":"lblActionStatus",
        "fontIconStatusImg":"fontIconStatusImg",
        "lblIconImgOptions":"lblIconImgOptions",
        "flxOptions": "flxOptions",
        "flxActionDescription":"flxActionDescription",
        "lblDescriptionValue":"lblDescriptionValue",
        "lblDescriptionHeader":"lblDescriptionHeader",
        "lblSeperatorLine":"lblSeperatorLine",
        "flxFeatureActionsList":"flxFeatureActionsList",
        "termsAndConditions":"termsAndConditions",
        "actionMfa":"actionMfa",
        "limits":"limits",
        "displayContent":"displayContent"
      };
      var actionTypes = [];
      var actionStatus = [];
      var actionCategory = [];
      var segData = data.map(function(rec){
        if(!actionCategory.contains(rec.Type_id)){
          actionCategory.push(rec.Type_id);
        }
        if(!actionStatus.contains(rec.status)){
          actionCategory.push(rec.status);
        }
        var actionType = rec.roleTypes;
        var actionNameList = [],
            actionIdList = [];
        actionNameList = actionType.reduce(function(list, record) {
          var name = ", " + record.name;
          return list + name;
        }, "");
        actionIdList = actionType.reduce(function(list, record) {
          return list.concat([record.id]);
        }, []);
        var UpdateLegalEntities = self.getLEListForFormAction("frmServiceManagement", 'UPDATE');
        var selectedLegalEntityId = self.selectedLegalEntityId;
        var toDisplayOtions = true;
        for (var i = 0; i < UpdateLegalEntities.length; i++) {
           if (UpdateLegalEntities[i].id.indexOf(selectedLegalEntityId) === 0) {
                 toDisplayOtions = true;
                 break;
            } else {
                 toDisplayOtions = false;
                }
            }
        return {
          "displayContent":rec.actionDisplayName,
          "actionCode":rec.actionId,
          "lblActionCode": {
            "text": self.AdminConsoleCommonUtils.getDisplayCode(rec.actionId,16),
            "toolTip": rec.actionId
          },
          "flxArrow": {
            "onClick": self.toggleActionDescription
          },
          "lblArrow": {
            "text": "\ue922",
            "skin": "sknfontIconDescRightArrow14px"
          },
          "lblActionName": rec.actionName,
          "lblActionType": actionNameList.substr(2),
          "accessLevel": self.checkForNull(rec.accesspolicy, kony.i18n.getLocalizedString("i18n.Applications.NA")),
          "actionLevel": self.checkForNull(rec.actionlevel, kony.i18n.getLocalizedString("i18n.Applications.NA")),
          "lblActionLimitGroup": self.checkForNull(rec.limitgroup,kony.i18n.getLocalizedString("i18n.Applications.NA")),
          "lblActionCategory": (rec.Type_id === self.AdminConsoleCommonUtils.constantConfig.MONETARY) ? kony.i18n.getLocalizedString("i18n.frmServiceManagement.Monetary") : kony.i18n.getLocalizedString("i18n.frmServiceManagement.NonMonetary"),
          "actionMfa": rec.isMFAApplicable,     
          "lblActionTaCLink": (Object.keys(rec.termandcondition).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showTermsConditionsPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },        
          "fontIconStatusImg": {
            "text": "\ue921",
            "skin": (rec.status=== self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?"sknFontIconActivate":"sknfontIconInactive"
          },
          "lblActionStatus": {
            "text": (rec.status=== self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?kony.i18n.getLocalizedString("i18n.secureimage.Active"): kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")
          },
          "flxOptions": {
            "isVisible": (toDisplayOtions===false) ? false : true,
            "onClick": function() {
              self.toggleContextualMenuAction(50);
            },
            "skin": "slFbox"
          },
          "lblIconImgOptions": {
            "text": "\ue91f",
            "skin": "sknFontIconOptionMenu"
          },
          "flxActionDescription": {
            "isVisible": false
          },
          "lblDescriptionValue": rec.description,
          "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
          "lblSeperatorLine": "-",
          "termsAndConditions":rec.termandcondition,
          "limits":rec.limits,
          "lblDependencies":(Object.keys(rec.dependentActions).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showDependenciesPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },
          "dependentActions":rec.dependentActions,
          "template": "flxFeatureActionsList"
        };
      });
      self.sortBy = self.getObjectSorter("lblActionName");
      self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.lblIconActionNameSort);
      self.view.segActionList.widgetDataMap = widgetMap;
      self.view.segActionList.setData(segData.sort(self.sortBy.sortData));
      self.view.segActionList.info = {"segData":segData};
      self.setActionsFilterData();
      self.view.forceLayout();
    },
    mapDependencies : function(data){
      var self = this;
      self.view.lblDependencyHeader.text="Actions(" + data.length + ")";
      var widgetMap = {      
        "lblActionName":"lblActionName",
        "lblActionCode":"lblActionCode",
        "lblFeatureName":"lblFeatureName",      
        "lblSeperatorLine":"lblSeperatorLine",
        "flxDependency":"flxDependency",
      };
      var segData = data.map(function(rec){      
        return {
          "lblFeatureName":self.checkForNull(rec.featureName, kony.i18n.getLocalizedString("i18n.Applications.NA")),
          "lblActionCode": {
            "text": self.checkForNull(self.AdminConsoleCommonUtils.getDisplayCode(rec.id,16), kony.i18n.getLocalizedString("i18n.Applications.NA")),
            "toolTip": rec.id
          },
          "lblActionName": self.checkForNull(rec.name, kony.i18n.getLocalizedString("i18n.Applications.NA")),
          "lblSeperatorLine": "-",        
          "template": "flxDependency"
        };
      });
      self.sortBy = self.getObjectSorter("lblActionName");
      self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.fontIconSortDependencyActionName);
      self.view.segDependencyList.widgetDataMap = widgetMap;
      self.view.segDependencyList.setData(segData.sort(self.sortBy.sortData));
      self.view.segDependencyList.info = {"segData":segData};    
      self.view.forceLayout();
    },
    mapPopupDependencies : function(){
      var self = this;
      var data=[];
      var selInd= self.view.segFeatures.selectedRowIndex[1];
      var selActionInd= self.view.segActionList.selectedRowIndex[1];
      var actionData = self.view.segActionList.data[selActionInd];
      var featureName = self.view.segFeatures.data[selInd].lblFeatureName.text;
      for(var i=0;i<self.view.segActionList.data.length;i++){
        for(var j=0;j<self.view.segActionList.data[i].dependentActions.length;j++){
          if(actionData.actionCode===self.view.segActionList.data[i].dependentActions[j].id)
            data.push({"id":self.view.segActionList.data[i].actionCode,
                       "name":self.view.segActionList.data[i].lblActionName});
        }     
      }
      if(data.length === 0){
        this.view.popUpDeactivate.flxPopUp.top="250px";
        self.view.popUpDeactivate.flxDependencyViewContainer.setVisibility(false);
      }
      else{
        this.view.popUpDeactivate.flxPopUp.top="60px";
        var widgetMap = {      
          "lblActionName":"lblActionName",
          "lblActionCode":"lblActionCode",
          "lblFeatureName":"lblFeatureName",      
          "lblSeperatorLine":"lblSeperatorLine",
          "flxDependency":"flxDependency",
        };
        var segData = data.map(function(rec){      
          return {
            "lblFeatureName":featureName,
            "lblActionCode": {
              "text": self.AdminConsoleCommonUtils.getDisplayCode(rec.id,16), 
              "toolTip": rec.id
            },
            "lblActionName": rec.name,
            "lblSeperatorLine": "-",        
            "template": "flxDependency"
          };
        });
        self.view.popUpDeactivate.lblDependencyHeader.text="Actions(" + data.length + ")";
        self.sortBy = self.getObjectSorter("lblActionName");
        self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.popUpDeactivate.fontIconSortDependencyActionName);
        self.view.popUpDeactivate.segDependencyList.widgetDataMap = widgetMap;
        self.view.popUpDeactivate.segDependencyList.setData(segData.sort(self.sortBy.sortData));
        self.view.popUpDeactivate.segDependencyList.info = {"segData":segData};    
      }
      self.view.forceLayout();
    },
    /* hide dropdowns in details page on scroll*/
    hideOptionMenuOnScroll : function(){
      if(this.view.flxLanguages.isVisible){
        this.view.flxLanguages.setVisibility(false);
      }
      if(this.view.flxFeatureDetailsContextualMenu.isVisible){
        this.view.flxFeatureDetailsContextualMenu.setVisibility(false);
      }
      if(this.view.flxDetailsActionTypeFilter.isVisible){
        this.view.flxDetailsActionTypeFilter.setVisibility(false);
      }
      this.view.forceLayout();
    },
    /* show/hide description for feature segment*/
    toggleFeatureDescription : function(){
      var selInd = this.view.segFeatures.selectedRowIndex[1];
      var segData = this.view.segFeatures.data;
      for(var i=0;i<segData.length;i++){
        if(i === selInd){
          if(segData[i].flxFeatureDescriptionContent.isVisible === false){
            segData[i].flxFeatureDescriptionContent.isVisible = true;
            segData[i].fonticonArrow.text = "\ue915";//down-arrow
            segData[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
          }else{
            segData[i].flxFeatureDescriptionContent.isVisible = false;
            segData[i].fonticonArrow.text = "\ue922";//right-arrow
            segData[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
          }
          this.view.segFeatures.setDataAt(segData[i], i);
        }else{
          if(segData[i].flxFeatureDescriptionContent.isVisible === true){
            segData[i].flxFeatureDescriptionContent.isVisible = false;
            segData[i].fonticonArrow.text = "\ue922";//right-arrow
            segData[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
            this.view.segFeatures.setDataAt(segData[i], i);
          }
        }
      }
    },
    /* show/hide description for facility segment*/
    toggleFacilityDescription : function(){
      var selInd = this.view.segFacilities.selectedRowIndex[1];
      var segData = this.view.segFacilities.data;
      for(var i=0;i<segData.length;i++){
        if(i === selInd){
          if(segData[i].flxFacilityDescriptionContent.isVisible === false){
            segData[i].flxFacilityDescriptionContent.isVisible = true;
            segData[i].fonticonArrowFacility.text = "\ue915";//down-arrow
            segData[i].fonticonArrowFacility.skin = "sknfontIconDescDownArrow12px";
          }else{
            segData[i].flxFacilityDescriptionContent.isVisible = false;
            segData[i].fonticonArrowFacility.text = "\ue922";//right-arrow
            segData[i].fonticonArrowFacility.skin = "sknfontIconDescRightArrow14px";
          }
          this.view.segFacilities.setDataAt(segData[i], i);
        }else{
          if(segData[i].flxFacilityDescriptionContent.isVisible === true){
            segData[i].flxFacilityDescriptionContent.isVisible = false;
            segData[i].fonticonArrowFacility.text = "\ue922";//right-arrow
            segData[i].fonticonArrowFacility.skin = "sknfontIconDescRightArrow14px";
            this.view.segFacilities.setDataAt(segData[i], i);
          }
        }
      }
    },
    /* show/hide description for action segment*/
    toggleActionDescription : function(){
      var selInd = this.view.segActionList.selectedRowIndex[1];
      var segData = this.view.segActionList.data;
      for(var i=0;i<segData.length;i++){
        if(i === selInd){
          if(segData[i].flxActionDescription.isVisible === false){
            segData[i].flxActionDescription.isVisible = true;
            segData[i].lblArrow.text = "\ue915";//down-arrow
            segData[i].lblArrow.skin = "sknfontIconDescDownArrow12px";
          }else{
            segData[i].flxActionDescription.isVisible = false;
            segData[i].lblArrow.text = "\ue922";//right-arrow
            segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
          }
          this.view.segActionList.setDataAt(segData[i], i);
        }else{
          if(segData[i].flxActionDescription.isVisible === true){
            segData[i].flxActionDescription.isVisible = false;
            segData[i].lblArrow.text = "\ue922";//right-arrow
            segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
            this.view.segActionList.setDataAt(segData[i], i);
          }
        }
      }
    },
    /* show/hide description for limit segment*/
    toggleLimitDescription : function(){
      var selInd = this.view.segLimitGroup.selectedRowIndex[1];
      var segData = this.view.segLimitGroup.data;
      for(var i=0;i<segData.length;i++){
        if(i === selInd){
          if(segData[i].flxDescription.isVisible === false){
            segData[i].flxDescription.isVisible = true;
            segData[i].lblArrow.text = "\ue915";//down-arrow
            segData[i].lblArrow.skin = "sknfontIconDescDownArrow12px";
          }else{
            segData[i].flxDescription.isVisible = false;
            segData[i].lblArrow.text = "\ue922";//right-arrow
            segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
          }
          this.view.segLimitGroup.setDataAt(segData[i], i);
        }else{
          if(segData[i].flxDescription.isVisible === true){
            segData[i].flxDescription.isVisible = false;
            segData[i].lblArrow.text = "\ue922";//right-arrow
            segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
            this.view.segLimitGroup.setDataAt(segData[i], i);
          }
        }
      }
    },
    /*display popup for terms and conditions of action */
    showTermsConditionsPopup: function(){
      var selInd = this.view.segActionList.selectedRowIndex[1];
      var rowData = this.view.segActionList.selectedRowItems[0];
      var termsCond = rowData.termsAndConditions;
      var langList = this.view.languagesListTCPopup.segStatusFilterDropdown.info.lang;
      this.setLanguagesList(langList, false);
      this.view.lblTCPopupHeader.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.viewTandC") + " - "+
        rowData.lblActionName;
      this.view.featuresLangList.segStatusFilterDropdown.info.langDetail = termsCond;
      this.view.flxViewActionTCPopup.setVisibility(true);
      this.displaySelectedLanguageTC(this.view.segActionList.data[selInd].termsAndConditions);
      this.view.forceLayout();
    },
    /*display popup for terms and conditions of action */
    showDependenciesPopup: function(){  
      this.view.flxDependencyPopup.setVisibility(true);
      this.view.forceLayout();
    },
    /*display popup for edit of limit group */
    showEditLimitGroupPopup: function(){
      var selInd = this.view.segLimitGroup.selectedRowIndex[1];
      var rowData = this.view.segLimitGroup.selectedRowItems[0];
      var langList = this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.info.lang;
      this.view.lblLimitGroupDetailsValue.text=rowData.lblLimitGroupCode;
      this.view.lblEditLimitGroupHeader.text = "Edit Limit Group";
      this.editLimitGroupReqParam = {
        "id": this.view.lblLimitGroupDetailsValue.text,
        "limitGroupDisplay":[] ,
      }
      this.setLanguagesList(langList, false);
      this.displaySelectedLangLimitGroupEditMode();
      this.setSegLangDataLimitGroup(rowData);
      this.view.flxLimitGroupPopup.setVisibility(true);
      this.view.flxDisplayContentLimitGroup.setVisibility(true);
      this.view.flxViewDisplayContentLimitGroup.setVisibility(false);
      this.view.flxLimitGroupEditButtons.setVisibility(true);
      this.view.flxLimitGroupHeading.height = "22dp";
      this.view.displayContentLimitGroupEdit.txtareaEditDescription.skin="skntxtAreaLato35475f14Px";
      this.view.displayContentLimitGroupEdit.tbxEditName.skin="skntbxLato35475f14px";
      this.view.displayContentLimitGroupEdit.flxNoEditNameError.setVisibility(false);
      this.view.displayContentLimitGroupEdit.flxNoEditDescriptionError.setVisibility(false);
      this.view.btnEditLimitGroup.setVisibility(false);
      this.view.forceLayout();
    },
    /*display popup for view of limit group */
    showViewLimitGroupPopup: function(){
      var selInd = this.view.segLimitGroup.selectedRowIndex[1];
      var rowData = this.view.segLimitGroup.selectedRowItems[0];
      var langList = this.view.displayContentView.EditLangList.segStatusFilterDropdown.info.lang;
      this.view.lblLimitGroupDetailsValue.text=rowData.lblLimitGroupCode;
      this.view.lblEditLimitGroupHeader.text = "View Limit Group";
      this.view.displayContentView.flxLanguages.setVisibility(false);
      this.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(false);
      this.setLanguagesList(langList, false);
      this.displaySelectedLangLimitGroup(this.view.segLimitGroup.data[selInd].displayContent);
      this.view.flxLimitGroupPopup.setVisibility(true);
      this.view.flxLimitGroupHeading.height = "40dp";
      this.view.flxDisplayContentLimitGroup.setVisibility(false);
      this.view.flxViewDisplayContentLimitGroup.setVisibility(true);
      this.view.flxLimitGroupEditButtons.setVisibility(false);
      this.view.btnEditLimitGroup.setVisibility(true);
      this.view.forceLayout();
    },
    /*display popup for view/edit limits of an action*/
    showLimitsPopup : function(){
      var rowData = this.view.segActionList.selectedRowItems[0];

      this.view.lblMinValue11.text = kony.i18n.getLocalizedString("i18n.Applications.NA");
      this.view.lblMaxValue12.text =  kony.i18n.getLocalizedString("i18n.Applications.NA");
      this.view.lblMaxDailyLimitValue21.text =  kony.i18n.getLocalizedString("i18n.Applications.NA");
      this.view.lblWeeklyLimitValue22.text =  kony.i18n.getLocalizedString("i18n.Applications.NA");
      var mapping = {"MIN_TRANSACTION_LIMIT": this.view.lblMinValue11,
                     "MAX_TRANSACTION_LIMIT": this.view.lblMaxValue12,
                     "DAILY_LIMIT": this.view.lblMaxDailyLimitValue21,
                     "WEEKLY_LIMIT": this.view.lblWeeklyLimitValue22
                    };
      if(rowData.limits && rowData.limits.length > 0){
        var limits = rowData.limits;
        for(var i=0;i< limits.length;i++){
          var lblWidget = mapping[limits[i].type];
          lblWidget.text = "$ "+ limits[i].value;
        }
      }
      this.view.flxViewEditLimitsPopup.setVisibility(true);
      this.view.lblLimitsPopupHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewLimits");

      this.view.forceLayout();
    },
    /* clear textbox values and errors for edit limit screen*/
    clearValuesLimitsPopup : function(){
      this.view.flxMinValueLimitError11.setVisibility(false);
      this.view.flxMaxValueLimitError12.setVisibility(false);
      this.view.flxMaxDailyLimitError21.setVisibility(false);
      this.view.flxWeeklyLimitValueError22.setVisibility(false);

      this.view.valueEntryMinValueLimit11.tbxEnterValue.text = "";
      this.view.valueEntryMaxValueLimit12.tbxEnterValue.text = "";
      this.view.valueEntryMaxDailyValue21.tbxEnterValue.text = "";
      this.view.valueEntryWeeklyLimitValue22.tbxEnterValue.text = "";

      this.view.valueEntryMinValueLimit11.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.valueEntryMaxValueLimit12.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.valueEntryMaxDailyValue21.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.valueEntryWeeklyLimitValue22.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.forceLayout();

    },
    /* set lanuages to dropdown
   *@param: list of all languages
  */
    setLanguagesList : function(langList, isInitial){
      var widMap = {"flxSearchDropDown":"flxSearchDropDown",
                    "flxCheckBox":"flxCheckBox",
                    "lblDescription":"lblDescription",
                    "langCode":"langCode"};
      var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
      var segData = [],removedRec = [],allLang = [];
      //initial load-sets data from backend
      if(langList && isInitial){
        segData = langList.map(function(rec){
          return {
            "flxCheckBox": {"isVisible" :false},
            "lblDescription":rec.Language,
            "langCode":rec.Code,
            "template":"flxSearchDropDown",
          };
        });
      }else if(isInitial === false){ //resets data to default lang
        segData = langList;
      }
      for(var i=0;i<segData.length;i++){
        if(segData[i].langCode === currLocale){
          this.view.lblFeatureDetailsSelectedLang.text = segData[i].lblDescription;
          this.view.lblFeatureDetailsSelectedLang.info = {"selLang":segData[i]};

          this.view.lblSelectedLangTCPopup.text = segData[i].lblDescription;
          this.view.lblSelectedLangTCPopup.info = {"selLang":segData[i]};

          this.view.lblSelectedLanguage.text = segData[i].lblDescription;
          this.view.lblSelectedLanguage.info = {"selLang":segData[i]};

          this.view.lblActionDetailsSelectedLang.text = segData[i].lblDescription;
          this.view.lblActionDetailsSelectedLang.info = {"selLang":segData[i]};

          this.view.displayContentEdit.lblSelectedLanguage.text = segData[i].lblDescription;
          this.view.displayContentEdit.lblSelectedLanguage.info = {"selLang":segData[i]};

          this.view.displayContentLimitGroupEdit.lblSelectedLanguage.text = segData[i].lblDescription;
          this.view.displayContentLimitGroupEdit.lblSelectedLanguage.info = {"selLang":segData[i]};

          this.view.displayContentView.lblDetailsSelectedLang.text = segData[i].lblDescription;
          this.view.displayContentView.lblDetailsSelectedLang.info = {"selLang":segData[i]};

          removedRec = segData.splice(i,1);
          break;
        }
      }
      allLang = segData.concat(removedRec);
      this.sortBy = this.getObjectSorter("lblDescription");
      this.sortBy.inAscendingOrder = true;
      segData.sort(this.sortBy.sortData);
      //set languages to features details languages segment
      this.view.featuresLangList.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.featuresLangList.segStatusFilterDropdown.setData(segData);
      this.view.featuresLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
      //set languages to termsCondition popup languages segment
      this.view.languagesListTCPopup.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.languagesListTCPopup.segStatusFilterDropdown.setData(segData);
      this.view.languagesListTCPopup.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
      //set languages to edit features popup languages segment
      this.view.EditFeatureLangList.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.EditFeatureLangList.segStatusFilterDropdown.setData(segData);
      this.view.EditFeatureLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
      //set languages to edit action details languages segment
      this.view.actionLangList.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.actionLangList.segStatusFilterDropdown.setData(segData);
      this.view.actionLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
      //set languages to edit limit group details languages segment
      this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.setData(segData);
      this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};    
      //set languages to view limit group details languages segment
      this.view.displayContentView.EditLangList.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.displayContentView.EditLangList.segStatusFilterDropdown.setData(segData);
      this.view.displayContentView.EditLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};    
      //set languages to edit action details languages segment
      this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.widgetDataMap = widMap;
      this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.setData(segData);
      this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};    

      this.view.forceLayout();

    },
    /* set selected language from the dropdown and update list on row click 
  * @param: langListSegment,selectedLanguageLabel
  */
    updateLanguagesDropdown : function(langListSegment,selectedLanguageLabel){
      var selInd = langListSegment.selectedRowIndex[1];
      var segData = langListSegment.data;
      var prevAssgnLang = [selectedLanguageLabel.info.selLang];
      selectedLanguageLabel.text = segData[selInd].lblDescription;
      selectedLanguageLabel.info.selLang = segData[selInd];
      langListSegment.removeAt(selInd);
      //set segment with updated data
      var updatedData = prevAssgnLang.concat(langListSegment.data);
      this.sortBy.columnName = "lblDescription";
      this.sortBy.inAscendingOrder = true;
      updatedData.sort(this.sortBy.sortData)
      langListSegment.setData(updatedData);
      this.view.forceLayout();
    },
    /* display selected language terms and conditions */
    displaySelectedLanguageTC: function(termsCond){
      var selLanguageCode = this.view.lblSelectedLangTCPopup.info.selLang.langCode;
      var selLang = this.view.lblSelectedLangTCPopup.info.selLang.lblDescription;
      var selLangTC = termsCond[selLanguageCode];
      if(selLangTC){
        this.view.rtxContentViewer.setVisibility(true);
        this.view.flxNoTermsConditionsAvailable.setVisibility(false);
        document.getElementById("iframe_rtxContentViewer").contentWindow.document.getElementById("viewer").innerHTML =selLangTC.content;
      }else{
        this.view.flxNoTermsConditionsAvailable.setVisibility(true);
        this.view.rtxContentViewer.setVisibility(false);
        this.view.lblNoTCAvailable.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.NoContentAdded") + " "+ selLang;
      }
      this.view.forceLayout();

    },
    /* show display name and display desc for selected language */
    displaySelectedLanguageContent: function(){
      var selInd = this.view.segFeatures.selectedRowIndex[1];
      var displayContent = this.view.segFeatures.data[selInd].displayContent;
      var selLanguageCode = this.view.lblFeatureDetailsSelectedLang.info.selLang.langCode;
      var selLang = this.view.lblFeatureDetailsSelectedLang.info.selLang.lblDescription;
      var selLangDiplayContent = displayContent[selLanguageCode];
      if(selLangDiplayContent){
        this.view.flxServiceDescriptionContent.setVisibility(true);
        this.view.flxFeatureDetailsNoDisplayContent.setVisibility(false);
        this.view.lblFeatureDisplayNameValue.text = selLangDiplayContent.displayName;
        this.view.lblFeatureDisplayDescValue.text = selLangDiplayContent.displayDescription;
      }else{
        this.view.flxFeatureDetailsNoDisplayContent.setVisibility(true);
        this.view.flxServiceDescriptionContent.setVisibility(false);
        this.view.lblFeatureDetailsNoDisplayContent.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.NoDisplayContentAvailableFor") + " "+ selLang+ ".";
      }
      this.view.forceLayout();

    },
    /* show display name and display desc for selected language action*/
    displaySelectedLanguageContentAction: function(){
      var selInd = this.view.segActionList.selectedRowIndex[1];
      var displayContent = this.view.segActionList.data[selInd].displayContent;
      var selLanguageCode = this.view.lblActionDetailsSelectedLang.info.selLang.langCode;
      var selLang = this.view.lblActionDetailsSelectedLang.info.selLang.lblDescription;
      var selLangDiplayContent = displayContent[selLanguageCode];
      if(selLangDiplayContent){
        this.view.flxActionDescriptionContent.setVisibility(true);
        this.view.flxActionDetailsNoDisplayContent.setVisibility(false);
        this.view.lblActionDisplayNameValue.text = selLangDiplayContent.displayName;
        this.view.lblActionDisplayDescValue.text = selLangDiplayContent.displayDescription;
      }else{
        this.view.flxActionDetailsNoDisplayContent.setVisibility(true);
        this.view.flxActionDescriptionContent.setVisibility(false);
        this.view.lblActionDetailsNoDisplayContent.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.NoDisplayContentAvailableFor") + " "+ selLang+ ".";
      }
      this.view.forceLayout();

    },
    /* show display name and display desc for selected language limit group*/
    displaySelectedLangLimitGroup: function(){
      var selInd = this.view.segLimitGroup.selectedRowIndex[1];
      var displayContent = this.view.segLimitGroup.data[selInd].displayContent;
      var selLanguageCode = this.view.displayContentView.lblDetailsSelectedLang.info.selLang.langCode;
      var selLang = this.view.displayContentView.lblDetailsSelectedLang.info.selLang.lblDescription;
      var selLangDiplayContent = displayContent[selLanguageCode];
      if(selLangDiplayContent){
        this.view.displayContentView.flxDescriptionContent.setVisibility(true);
        this.view.displayContentView.flxDetailsNoDisplayContent.setVisibility(false);
        this.view.displayContentView.lblDisplayNameValue.text = selLangDiplayContent.displayName;
        this.view.displayContentView.lblDisplayDescValue.text = selLangDiplayContent.displayDescription;
      }else{
        this.view.displayContentView.flxDetailsNoDisplayContent.setVisibility(true);
        this.view.displayContentView.flxDescriptionContent.setVisibility(false);
        this.view.displayContentView.lblDetailsNoDisplayContent.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.NoDisplayContentAvailableFor") + " "+ selLang+ ".";
      }
      this.view.forceLayout();

    },
    /* set data to action-type filter in feture details
  * @param: actionType_id's array
  */
    setActionsFilterData : function(){
      var self = this;
      var statusList=[],typeList=[],categoryList=[],limitGroupList=[],maxStatusText = "",maxTypeText ="",maxLenText = "",maxLimitGrouptext = "";
      for(var i=0;i<self.actionsRecList.length;i++){
        if(!statusList.contains(self.actionsRecList[i].status))
          statusList.push(self.actionsRecList[i].status);
        if(!categoryList.contains(self.actionsRecList[i].Type_id))
          categoryList.push(self.actionsRecList[i].Type_id);	
        if(!limitGroupList.contains(self.actionsRecList[i].limitgroup))
          limitGroupList.push(self.actionsRecList[i].limitgroup);	
        for(var x=0;x<self.actionsRecList[i].roleTypes.length;x++){
          if(!typeList.some(el => el.name === self.actionsRecList[i].roleTypes[x].name))
            typeList.push(self.actionsRecList[i].roleTypes[x]);
        }
      }
      var widgetMap = {
        "Status_id": "Status_id",
        "Type_id": "Type_id",
        "Category": "Category",
        "LimitGroup": "LimitGroup",
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
      };
      var statusData = statusList.map(function(rec){
        var mapJson = {
          "Status_id": rec,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": (rec === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)? kony.i18n.getLocalizedString("i18n.secureimage.Active"):(rec === self.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE)?kony.i18n.getLocalizedString("i18n.secureimage.Inactive"):kony.i18n.getLocalizedString("i18n.common.Unavailable")
        };
        maxStatusText = mapJson['lblDescription'].length > maxStatusText.length ? mapJson['lblDescription'] : maxStatusText; 
        return mapJson;
      });
      var typeData = typeList.map(function(rec){
        maxTypeText = rec.name.length > maxTypeText.length ? rec.name : maxTypeText;
        return {
          "Type_id": rec.id,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": {"text":self.AdminConsoleCommonUtils.getTruncatedString(rec.name, 30, 28),
                             "info":{"value":rec.name},
                             "tooltip":rec.name}
        };
      });
      var categoryData = categoryList.map(function (rec) {
        var type;
        if (rec === self.AdminConsoleCommonUtils.constantConfig.MONETARY) {
          type = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Monetary");
        } else if (rec === self.AdminConsoleCommonUtils.constantConfig.NON_MONETARY) {
          type = kony.i18n.getLocalizedString("i18n.frmServiceManagement.NonMonetary");
        }
        maxLenText = type.length > maxLenText.length ? type : maxLenText;
        return {
          "Category": rec,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": type
        };
      });
      var limitGroupData = limitGroupList.map(function (rec) {    
        maxLimitGrouptext = rec.length > maxLimitGrouptext.length ? rec : maxLimitGrouptext; 
        return {
          "LimitGroup": rec,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "imgCheckBox": "checkbox.png",
          "lblDescription": rec
        };
      });
      self.view.actionStatusDetailsFilter.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.actionTypeDetailsFilter.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.setData(limitGroupData);
      self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.setData(categoryData);
      self.view.actionStatusDetailsFilter.segStatusFilterDropdown.setData(statusData);
      self.view.actionTypeDetailsFilter.segStatusFilterDropdown.setData(typeData);

      var selStatusInd = [],selTypeInd = [],selCategoryInd = [],selLimitGroupInd = [];
      for(var j=0;j<statusList.length;j++){
        selStatusInd.push(j);
      }
      for(var k=0;k<typeList.length;k++){
        selTypeInd.push(k);
      }
      for(var k=0;k<categoryList.length;k++){
        selCategoryInd.push(k);
      }
      for(var k=0;k<limitGroupList.length;k++){
        selLimitGroupInd.push(k);
      }
      self.view.actionStatusDetailsFilter.segStatusFilterDropdown.selectedRowIndices = [[0,selStatusInd]];
      self.view.actionTypeDetailsFilter.segStatusFilterDropdown.selectedRowIndices = [[0,selTypeInd]];
      self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.selectedRowIndices = [[0,selCategoryInd]];
      self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.selectedRowIndices = [[0,selLimitGroupInd]];
      //set filter width
      self.view.flxDetailsActionStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxStatusText)+55+"px";
      self.view.flxDetailsActionTypeFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxTypeText)+55+"px";
      self.view.flxDetailsActionCategoryFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
      self.view.flxDetailsActionLimitGroupFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLimitGrouptext)+55+"px";
      self.view.forceLayout();
    },
    /* filter action's list based on action type*/
    performFilterOnActionTypes : function(){
      var self =this;
      self.view.flxDetailsActionTypeFilter.setVisibility(false);
      var selIndices = self.view.actionTypeDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
      var actionsData = self.view.segActionList.info.segData;
      var selTypes = [],filteredRec = [];
      if(selIndices){
        var ind = selIndices[0][1];
        for(var i=0;i<ind.length;i++){
          selTypes.push(self.view.actionTypeDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription.text);
        }
        if(selTypes.length >0){
          filteredRec = actionsData.filter(function(rec){
            if(selTypes.indexOf(rec.lblActionType) >= 0){
              return rec;
            }
          });
        }
      }
      if(filteredRec.length > 0){
        self.view.segActionList.setData(filteredRec);
        self.view.segActionList.setVisibility(true);
        self.view.lblActionsListNoResultsFound.setVisibility(false);
      }else{
        self.view.segActionList.setData([]);
        self.view.segActionList.setVisibility(false);
        self.view.lblActionsListNoResultsFound.setVisibility(true);
      }
      self.view.forceLayout();
    },
    /* filter action's list based on action type*/
    performFilterOnActionCategory : function(){
      var self =this;
      self.view.flxDetailsActionCategoryFilter.setVisibility(false);
      var selIndices = self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
      var actionsData = self.view.segActionList.info.segData;
      var selTypes = [],filteredRec = [];
      if(selIndices){
        var ind = selIndices[0][1];
        for(var i=0;i<ind.length;i++){
          selTypes.push(self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
        }
        if(selTypes.length >0){
          filteredRec = actionsData.filter(function(rec){
            if(selTypes.indexOf(rec.lblActionCategory) >= 0){
              return rec;
            }
          });
        }
      }
      if(filteredRec.length > 0){
        self.view.segActionList.setData(filteredRec);
        self.view.segActionList.setVisibility(true);
        self.view.lblActionsListNoResultsFound.setVisibility(false);
      }else{
        self.view.segActionList.setData([]);
        self.view.segActionList.setVisibility(false);
        self.view.lblActionsListNoResultsFound.setVisibility(true);
      }
      self.view.forceLayout();
    },
    /* filter action's list based on action type*/
    performFilterOnActionStatus : function(){
      var self =this;
      self.view.flxDetailsActionStatusFilter.setVisibility(false);
      var selIndices = self.view.actionStatusDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
      var actionsData = self.view.segActionList.info.segData;
      var selTypes = [],filteredRec = [];
      if(selIndices){
        var ind = selIndices[0][1];
        for(var i=0;i<ind.length;i++){
          selTypes.push(self.view.actionStatusDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
        }
        if(selTypes.length >0){
          filteredRec = actionsData.filter(function(rec){
            if(selTypes.indexOf(rec.lblActionStatus.text) >= 0){
              return rec;
            }
          });
        }
      }
      if(filteredRec.length > 0){
        self.view.segActionList.setData(filteredRec);
        self.view.segActionList.setVisibility(true);
        self.view.lblActionsListNoResultsFound.setVisibility(false);
      }else{
        self.view.segActionList.setData([]);
        self.view.segActionList.setVisibility(false);
        self.view.lblActionsListNoResultsFound.setVisibility(true);
      }
      self.view.forceLayout();
    },
    /* filter action's list based on action type*/
    performFilterOnActionLimitGroup : function(){
      var self =this;
      self.view.flxDetailsActionLimitGroupFilter.setVisibility(false);
      var selIndices = self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
      var actionsData = self.view.segActionList.info.segData;
      var selTypes = [],filteredRec = [];
      if(selIndices){
        var ind = selIndices[0][1];
        for(var i=0;i<ind.length;i++){
          selTypes.push(self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
        }
        if(selTypes.length >0){
          filteredRec = actionsData.filter(function(rec){
            if(selTypes.indexOf(rec.lblActionLimitGroup) >= 0){
              return rec;
            }
          });
        }
      }
      if(filteredRec.length > 0){
        self.view.segActionList.setData(filteredRec);
        self.view.segActionList.setVisibility(true);
        self.view.lblActionsListNoResultsFound.setVisibility(false);
      }else{
        self.view.segActionList.setData([]);
        self.view.segActionList.setVisibility(false);
        self.view.lblActionsListNoResultsFound.setVisibility(true);
      }
      self.view.forceLayout();
    },
    setFeaturedActionsData : function(data,selectInitialRow){
      var self = this;
      var segData=[];
      var widgetMap = {
        "flxRow":"flxRow",
        "flxContentContainer":"flxContentContainer",
        "btnOption1":"btnOption1",
        "flxImgArrow":"flxImgArrow",
        "lblSelected1":"lblSelected1",
        "lblSeperator":"lblSeperator",
      };
      for(var i=0;i<data.length;i++){
        var actionType = data[i].roleTypes;
        var actionNameList = [],
            actionIdList = [];
        actionNameList = actionType.reduce(function(list, record) {
          var name = ", " + record.name;
          return list + name;
        }, "");
        actionIdList = actionType.reduce(function(list, record) {
          return list.concat([record.id]);
        }, []);
        segData.push({
          "actionId":data[i].actionId,
          "btnOption1":{
            "text":data[i].actionName.toUpperCase(),"onClick":self.validateLimits,"skin":"sknBtn737678LatoReg12pxNoBgBorder"
          },
          "flxImgArrow": {
            "isVisible": false,
          },
          "lblSelected1":{"text":""},
          "type_id": data[i].Type_id,
          "description": data[i].description,
          "isEdited": false,
          "isContentEdited": false,
          "isStatusEdited": false,
          "actionCategory": (data[i].Type_id === self.AdminConsoleCommonUtils.constantConfig.MONETARY) ? kony.i18n.getLocalizedString("i18n.frmServiceManagement.Monetary") : kony.i18n.getLocalizedString("i18n.frmServiceManagement.NonMonetary"),
          "lblActionMfa": (data[i].isMFAApplicable === true) ? "Yes" : "No",
          "lblTNC":(Object.keys(data[i].termandcondition).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showTermsConditionsPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },
          "termsAndConditions":data[i].termandcondition,
          "lblActionName":data[i].actionName,
          "actionType":actionNameList.substr(2),
          "actionLevel":self.checkForNull(data[i].actionlevel, kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase(),
          "accessLevel":self.checkForNull(data[i].accesspolicy, kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase(),  
          "limitGroup":self.checkForNull(data[i].limitgroup, kony.i18n.getLocalizedString("i18n.Applications.NA")),  
          "limits":data[i].limits,
          "displayContent":data[i].actionDisplayName,
          "lblDependencies":(Object.keys(data[i].dependentActions).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showDependenciesPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },
          "dependentActions":data[i].dependentActions,
          "status":data[i].status,
          "lblSeperator": {
            "text": "."
          },
          "template": "flxRow"
        });
      }
      self.sortBy = self.getObjectSorter("btnOption1.text");
      self.view.segFeaturedActions.widgetDataMap = widgetMap;
      if(segData.length!==0){
        segData.sort(self.sortBy.sortData);
        segData[0].flxImgArrow.isVisible=true;
        segData[0].btnOption1.skin="sknBtnLatoBold485c7512PxNoBorder";
        if(selectInitialRow){
          self.currSelectedIndex=0;
          self.setActionDetailsData(segData[0]);
        }
      }
      self.view.segFeaturedActions.setData(segData);
      self.view.segFeaturedActions.info = {"segData":segData};
      self.view.forceLayout();
    },
    toggleSelectedRow : function(){
      var segData=this.view.segFeaturedActions.data;
      var selectedRowIndex=this.view.segFeaturedActions.selectedRowIndex[1];
      this.currSelectedIndex=selectedRowIndex;
      for(var x in segData){
        if(x==selectedRowIndex){
          segData[x].btnOption1.skin="sknBtnLatoBold485c7512PxNoBorder";
          segData[x].flxImgArrow.isVisible=true;
        }
        else{
          segData[x].btnOption1.skin="sknBtn737678LatoReg12pxNoBgBorder";
          segData[x].flxImgArrow.isVisible=false;
        }
      }
      this.view.segFeaturedActions.setData(segData);
      this.setActionDetailsData(segData[selectedRowIndex]);
      this.displaySelectedLangActionEditMode(segData[selectedRowIndex].displayContent);
      this.view.forceLayout();
    },
    setActionDetailsData : function(dataToSet){
      var langList = this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.info.lang;
      this.view.lblViewActionCodeValue.text=dataToSet.actionId;
      this.view.lblViewActionCodeValue.info=dataToSet.actionId;
      this.view.lblActionTypeValue.text=dataToSet.actionType;
      this.view.lblViewActionCategoryValue.text=dataToSet.actionCategory;
      this.view.lblViewActionLevelValue.text=dataToSet.actionLevel;
      this.view.lblViewAccessLevelValue.text=dataToSet.accessLevel;
      this.view.lblViewLimitGroupValue.text=dataToSet.limitGroup;
      this.view.lblMFAValue.text=dataToSet.lblActionMfa;
      this.view.lblTAndCView.info=dataToSet.termsAndConditions;  
      this.view.lblTAndCView.text=dataToSet.lblTNC.text;
      this.view.lblTAndCView.skin=dataToSet.lblTNC.skin;
      this.view.lblTAndCView.hoverSkin=dataToSet.lblTNC.hoverSkin;
      this.view.lblTAndCView.onClick=dataToSet.lblTNC.onClick;  
      this.view.lblViewDependencyValue.text=dataToSet.lblDependencies.text;
      this.view.lblViewDependencyValue.skin=dataToSet.lblDependencies.skin;
      this.view.lblViewDependencyValue.hoverSkin=dataToSet.lblDependencies.hoverSkin;
      this.view.lblViewDependencyValue.onClick=dataToSet.lblDependencies.onClick;
      this.setLanguagesList(langList, false);
      this.setSegLangDataAction(dataToSet);
      this.view.lblActionActiveText.text=(dataToSet.status === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active"):kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Inactive");
      this.view.actionStatusSwitch.switchToggle.selectedIndex=(dataToSet.status === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?0:1;
      if(dataToSet.type_id === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
        var mapping = {"MIN_TRANSACTION_LIMIT": this.view.valueEntryMinValueLimit.tbxEnterValue,
                       "MAX_TRANSACTION_LIMIT": this.view.valueEntryMaxValueLimit.tbxEnterValue,
                       "DAILY_LIMIT": this.view.valueEntryMaxDailyValue.tbxEnterValue,
                       "WEEKLY_LIMIT": this.view.valueEntryWeeklyLimitValue.tbxEnterValue
                      };
        if(dataToSet.limits && dataToSet.limits.length > 0){
          var limits = dataToSet.limits;
          for(var i=0;i< limits.length;i++){
            var txtWidget = mapping[limits[i].type];
            txtWidget.text = limits[i].value;
          }
        }else if(dataToSet.limits&&dataToSet.limits.length===0){
          this.view.valueEntryMinValueLimit.tbxEnterValue.text="0";
          this.view.valueEntryMaxValueLimit.tbxEnterValue.text="0";
          this.view.valueEntryMaxDailyValue.tbxEnterValue.text="0";
          this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text="0";
        }
        this.view.valueEntryMinValueLimit.lblCurrencySymbol.text= this.currencyIconValue;
        this.view.valueEntryMaxValueLimit.lblCurrencySymbol.text= this.currencyIconValue;
        this.view.valueEntryMaxDailyValue.lblCurrencySymbol.text= this.currencyIconValue;
        this.view.valueEntryWeeklyLimitValue.lblCurrencySymbol.text= this.currencyIconValue;
        this.view.valueEntryMinValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.flxFeaturedActionLimits.setVisibility(true);
        this.view.flxActionDetails4.setVisibility(true);
      }else{
        this.view.flxFeaturedActionLimits.setVisibility(false);
        this.view.flxActionDetails4.setVisibility(false);
      }
      this.view.flxWeeklyLimitValueError.setVisibility(false);
      this.view.flxMaxDailyLimitError.setVisibility(false);
      this.view.flxMaxValueExceedError.setVisibility(false);
      this.view.flxMinValueError.setVisibility(false);
      this.view.forceLayout();
    },
    /* show display name and display desc for selected language */
    displaySelectedLanguageContentEditMode: function(onClick){
      var selInd = this.view.segFeatures.selectedRowIndex[1];
      var displayContent = this.view.segFeatures.data[selInd].displayContent?this.view.segFeatures.data[selInd].displayContent:[];
      var selLanguageCode = this.view.lblSelectedLanguage.info.selLang.langCode;
      if(onClick)
        this.updateContentEditPayload(displayContent);
      var selLangDiplayContent = displayContent[selLanguageCode];
      if(selLangDiplayContent){
        this.view.tbxEditFeatureName.text = selLangDiplayContent.displayName;
        this.view.txtareaEditFeatureDescription.text = selLangDiplayContent.displayDescription;
      }
      this.view.forceLayout();    
    },
    onHoverCallBack:function(widget, context,info) {
      var scopeObj = this;
      var widGetId = widget.id;
      if (widget) {
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
          scopeObj.showOnHoverInfo(widGetId, info);
        }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
          scopeObj.showOnHoverInfo(widGetId, info);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
          this.view.ToolTip.setVisibility(false);
        }
      }
    },
    showOnHoverInfo: function(widGetId, info) {
      var scopeObj = this;
      var leftVal = 0;
      var topVal = 0;
      switch (widGetId) {
        case 'fontIconActionTypes':
          leftVal = this.view.fontIconActionTypes.parent.frame.x + 255;
          topVal = this.view.fontIconActionTypes.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 225;
          break;
        case 'fontIconActionCategory':
          leftVal = this.view.fontIconActionCategory.parent.frame.x + 288;
          topVal = this.view.fontIconActionCategory.frame.y- this.view.flxViewActionData.contentOffsetMeasured.y + 225;
          break;
        case 'fontIconFeatureDetailsRow11Header':
          leftVal = this.view.fontIconFeatureDetailsRow11Header.parent.frame.x + 260;
          topVal = this.view.fontIconFeatureDetailsRow11Header.frame.y - this.view.flxViewServiceData.contentOffsetMeasured.y + 228;
          break;
        case 'fontIconActionDependencies':
          leftVal = this.view.fontIconActionDependencies.parent.frame.x  + 268;//this.view.fontIconActionDependencies.frame.x + this.view.fontIconActionDependencies.parent.frame.x;//480;
          topVal = this.view.fontIconActionDependencies.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 383;
          break;
        case 'fontIconActionLimitGroup':
          leftVal = this.view.fontIconActionLimitGroup.frame.x + 167;
          topVal = this.view.fontIconActionLimitGroup.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 611;
          break;
        case 'fontIconMinPerTxLimit':
          leftVal = this.view.fontIconMinPerTxLimit.frame.x + 188;
          topVal = this.view.fontIconMinPerTxLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 732;
          break;
        case 'fontIconMaxTxLimit':
          leftVal = this.view.fontIconMaxTxLimit.parent.frame.x + 379;
          topVal = this.view.fontIconMaxTxLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 732;
          break;
        case 'fontIconMaxDailyLimit':
          leftVal = this.view.fontIconMaxDailyLimit.parent.frame.x + 329;
          topVal = this.view.fontIconMaxDailyLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 732;
          break;
        case 'fontIconMaxWeeklyLimit':
          leftVal = this.view.fontIconMaxWeeklyLimit.frame.x + 189;
          topVal = this.view.fontIconMaxWeeklyLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 812;
          break;     
        case 'fontIconActionType':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 415;
          topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + 163;
          break;
        case 'fontIconViewActionCategory':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 657;
          topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + 163;
          break;
        case 'fontIconData2':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 222;
          topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxFeatureContainer.contentOffsetMeasured.y + 167;
          break;
        case 'fontIconViewDependency':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 222;
          topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + 310;
          break;
        case 'fontIconViewLimitGroup':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 207;
          topVal = this.view.fontIconViewLimitGroup.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 695;
          break;
        case 'fontIconMinVal':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 282;
          topVal = this.view.fontIconMinVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 791;
          break;
        case 'fontIconMaxVal':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 472;
          topVal = this.view.fontIconMaxVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 791;
          break;
        case 'fontIconMaxDailyVal':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 646;
          topVal = this.view.fontIconMaxDailyVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 791;
          break;
        case 'fontIconMaxWeeklyVal':
          leftVal = this.view.flxEditFeatureContainer.frame.x + 248;
          topVal = this.view.fontIconMaxWeeklyVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 882;
          break;
      }
      this.view.ToolTip.left = leftVal + "dp";
      this.view.ToolTip.top = topVal + "dp";
      this.view.ToolTip.lblNoConcentToolTip.text = info;
      this.view.ToolTip.lblarrow.skin =  "sknfontIconDescRightArrow14px";
      this.view.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
      this.view.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
      this.view.ToolTip.setVisibility(true);
      scopeObj.view.forceLayout();
    },
    /* show display name and display desc for selected language */
    displaySelectedLangLimitGroupEditMode: function(onClick){
      var selInd = this.view.segLimitGroup.selectedRowIndex[1];
      var displayContent = this.view.segLimitGroup.data[selInd].displayContent?this.view.segLimitGroup.data[selInd].displayContent:[];
      var selLanguageCode = this.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode;
      if(onClick)
        this.updateLimitGroupEditPayload(displayContent);
      var selLangDiplayContent = displayContent[selLanguageCode];
      if(selLangDiplayContent){
        this.view.displayContentLimitGroupEdit.tbxEditName.text = selLangDiplayContent.displayName;
        this.view.displayContentLimitGroupEdit.txtareaEditDescription.text = selLangDiplayContent.displayDescription;
      }
      this.view.forceLayout();    
    },
    /* show display name and display desc for selected language */
    displaySelectedLangActionEditMode: function(onClick){
      var selInd = this.view.segFeaturedActions.selectedRowIndex[1];
      var displayContent = this.view.segFeaturedActions.data[selInd].displayContent?this.view.segFeaturedActions.data[selInd].displayContent:[];
      var selLanguageCode = this.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode;
      if(onClick)
        this.updateActionEditPayload(displayContent);
      var selLangDiplayContent = displayContent[selLanguageCode];
      if(selLangDiplayContent){
        this.view.displayContentEdit.tbxEditName.text = selLangDiplayContent.displayName;
        this.view.displayContentEdit.lblNameCount.text = this.view.displayContentEdit.tbxEditName.text.length + "/60";
        this.view.displayContentEdit.txtareaEditDescription.text = selLangDiplayContent.displayDescription;
        this.view.displayContentEdit.lblDescriptionCount.text = this.view.displayContentEdit.txtareaEditDescription.text.length + "/100";
      }
      this.view.forceLayout();    
    },
    /*display popup for terms and conditions of action */
    showTermsConditionsPopupEditMode: function(){
      var selInd = this.view.segFeaturedActions.selectedRowIndex?this.view.segFeaturedActions.selectedRowIndex[1]:0;
      var rowData = this.view.segFeaturedActions.selectedRowItems?this.view.segFeaturedActions.selectedRowItems[0]:this.view.segFeaturedActions.data[selInd];
      var termsCond = rowData.termsAndConditions;
      this.view.lblTCPopupHeader.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.viewTandC") + " - "+
        rowData.lblActionName;
      this.view.languagesListTCPopup.segStatusFilterDropdown.info.langDetail = termsCond;
      this.view.flxViewActionTCPopup.setVisibility(true);
      this.displaySelectedLanguageTC(this.view.segFeaturedActions.data[selInd].termsAndConditions);
      this.view.forceLayout();
    },
    updateFeatureDetails: function(){
      this.editFeatureReqParam.serviceFee=this.view.ValueEntry.tbxEnterValue.text;
      this.editFeatureReqParam.statusId=this.view.featureStatusSwitch.switchToggle.selectedIndex===0?
        this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE:this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE;
      this.view.flxEditFeaturePopup.setVisibility(false);
      this.currSuccessMsg=this.successMsgParam.EDIT;
      this.presenter.updateFeature(this.editFeatureReqParam);
      this.view.forceLayout();
    },
    updateFacilityDetails: function(){
      var checkMandFields = this.checkMandatoryFields();
      if(checkMandFields) {
        var isFacilicityChanged = this.checkFacilityChangedValues();
        if(isFacilicityChanged){
          this.currSuccessMsg=this.successMsgParam.EDIT;	  
          var payload = this.prepareFacilityPayload("editFacility");
          this.presenter.editFacility(JSON.parse(JSON.stringify(payload)),this.facilityOptionView);
          this.view.forceLayout();
        } else {
          this.view.toastMessage.showToastMessage("No changes made for the selected facility", this); 
        }
      }
    },
    addFacilityDetails: function() {
      var checkMandFields = this.checkMandatoryFields();
      if(checkMandFields) {
        this.currSuccessMsg = this.successMsgParam.EDIT;
        var payload = this.prepareFacilityPayload("addFacility");
        this.presenter.createFacility(payload);
        this.view.forceLayout();
      }
    },
    checkMandatoryFields: function() {
      var nameVal = this.view.addFacility.tbxAddFacilityName.text;
      var codeVal = this.view.addFacility.tbxAddFacilityCode.text;
      if(!nameVal) {
        this.view.addFacility.flxErrorMsg1.isVisible = true;
        this.view.addFacility.tbxAddFacilityName.skin = "skinredbg";
      };
      if(!codeVal) {
        this.view.addFacility.flxErrorMsg2.isVisible = true;
        this.view.addFacility.tbxAddFacilityCode.skin = "skinredbg";
      };

      if(nameVal && codeVal) {
        this.editFacilityReqParam.facilities[0].facilityName = nameVal;    
        this.editFacilityReqParam.facilities[0].description =  this.view.addFacility.txtAreaFacilityDescription.text;
        return true;
      } else {
        return false;
      }
    },
    prepareFacilityPayload: function(option) {
      var features = this.editFacilityReqParam.facilities[0].features;
      var selectedFeatures = features.filter(feature => feature["isSelected"] === "true");
      var featuresAndActionsObj = [];
      if(this.view.addFacility.txtAreaFacilityDescription.text && this.view.addFacility.txtAreaFacilityDescription.text.length > 0)
        var description = this.view.addFacility.txtAreaFacilityDescription.text.replaceAll(/\n/g, "\\n");
      selectedFeatures.forEach(feature => {
        var tempObjActions = [];
        feature.actions.forEach(action => {
          if (action.isSelected === "true") { 
            tempObjActions.push(new Object({
              "actionId": action.actionId
            }));
          }
        })
        featuresAndActionsObj.push(new Object({"featureId":feature.featureId,"actions":tempObjActions}));
      });

      if (option == "addFacility") {
        // Create use case, as facilityId is undefined      
        var payload = {
          "code": this.view.addFacility.tbxAddFacilityCode.text,
          "facilityName": this.view.addFacility.tbxAddFacilityName.text,
          "description": description,
          "features": featuresAndActionsObj
        };
      } else {
        var payload = {
          "facilityId": this.editFacilityReqParam.facilities[0].facilityId,
          "code": this.view.addFacility.tbxAddFacilityCode.text,
          "facilityName": this.view.addFacility.tbxAddFacilityName.text,
          "description": description,
          "features": featuresAndActionsObj
        };   
      }
      return payload;
    },

    checkFacilityChangedValues: function(){
      var isFacilityChanged = false;
      var originalFacilityValues = this.facilityFeaturesEdit;
      (originalFacilityValues.facilityName !== this.editFacilityReqParam.facilities[0].facilityName) ? isFacilityChanged = true : "";
      //       (originalFacilityValues.code !== this.editFacilityReqParam.facilities[0].code) ? isFacilityChanged = true : "";
      (originalFacilityValues.description !== this.editFacilityReqParam.facilities[0].description) ? isFacilityChanged = true : "";
      if(originalFacilityValues.features){
        if(originalFacilityValues.features.length > 0 && this.editFacilityReqParam.facilities[0].features.length > 0){
          for(var i = 0;i<originalFacilityValues.features.length;i++) {
            originalFacilityValues.features[i].isSelected !== this.editFacilityReqParam.facilities[0].features[i].isSelected ? isFacilityChanged = true : "" ;
            if(originalFacilityValues.features[i].isSelected === "true" && this.editFacilityReqParam.facilities[0].features[i].isSelected === "true"){
              for(var j = 0; j<originalFacilityValues.features[i].actions.length; j++){
                originalFacilityValues.features[i].actions[j].isSelected !== this.editFacilityReqParam.facilities[0].features[i].actions[j].isSelected ? 
                  isFacilityChanged = true : "";
              } 
            }

          }
        } else if(originalFacilityValues.features.length > 0 && this.editFacilityReqParam.facilities[0].features.length === 0){
          isFacilityChanged = true;         
        }
      } else if(!originalFacilityValues.features && this.editFacilityReqParam.facilities[0].features.length > 0){
        isFacilityChanged = true;
      }
      return isFacilityChanged;
    },

    updateActionEditPayload: function(){
      var isPresent=false;
      var isPresentDisplayContent=false; 
      var isStatusPresent=false;
      var currentIndex = -1;
      var segData=this.view.segFeaturedActions.data;
      var dataToSet=segData[this.currSelectedIndex];
      var displayContent = dataToSet.displayContent?dataToSet.displayContent:[];
      var selLangDisplayContent=displayContent[this.prevSelLangAction];
      if(dataToSet.isEdited || dataToSet.isContentEdited || dataToSet.isStatusEdited){
        for(var i=0;i<this.editFeatureReqParam.actions.length;i++){
          if(dataToSet.isContentEdited && Object.values(this.editFeatureReqParam.actions[i]).includes(dataToSet.actionId) && selLangDisplayContent&&((selLangDisplayContent.displayName!==this.view.displayContentEdit.tbxEditName.text)||(selLangDisplayContent.displayDescription!==this.view.displayContentEdit.txtareaEditDescription.text))){
            currentIndex =i;
            for(var j=0;j<this.editFeatureReqParam.actions[i].actionDisplay.length;j++){
              if(Object.values(this.editFeatureReqParam.actions[i].actionDisplay[j]).includes(this.prevSelLangAction)){
                this.editFeatureReqParam.actions[i].actionDisplay[j].displayName=this.view.displayContentEdit.tbxEditName.text;
                this.editFeatureReqParam.actions[i].actionDisplay[j].displayDescription=this.view.displayContentEdit.txtareaEditDescription.text;
                isPresentDisplayContent=true;
                break;
              }
            }         
          }
          if(dataToSet.isStatusEdited && Object.values(this.editFeatureReqParam.actions[i]).includes(dataToSet.actionId)){
            this.editFeatureReqParam.actions[i].statusId=this.view.actionStatusSwitch.switchToggle.selectedIndex===0?
              this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE:
            this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE;
            isStatusPresent=true;
          }
          if(dataToSet.isEdited && Object.values(this.editFeatureReqParam.actions[i]).includes(dataToSet.actionId)){
            this.editFeatureReqParam.actions[i].limits=[ 
              { 
                "type":"DAILY_LIMIT",
                "value":this.view.valueEntryMaxDailyValue.tbxEnterValue.text
              },
              { 
                "type":"MAX_TRANSACTION_LIMIT",
                "value":this.view.valueEntryMaxValueLimit.tbxEnterValue.text
              },
              { 
                "type":"MIN_TRANSACTION_LIMIT",
                "value":this.view.valueEntryMinValueLimit.tbxEnterValue.text
              },
              { 
                "type":"WEEKLY_LIMIT",
                "value":this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text
              }];
            isPresent=true;
            break;
          }
        }  
        if(!isPresentDisplayContent && !isPresent && !isStatusPresent) {
          if(currentIndex === -1){
            currentIndex =this.editFeatureReqParam.actions.length;
            this.editFeatureReqParam.actions.push({"actionId":dataToSet.actionId,
                                                   "statusId":this.view.actionStatusSwitch.switchToggle.selectedIndex===0?
                                                   this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE:
                                                   this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE,
                                                   "limits":[],"actionDisplay":[]});    
          }
        }
        if(!isPresentDisplayContent && dataToSet.isContentEdited){         
          this.editFeatureReqParam.actions[currentIndex].actionDisplay.push({
            "localeId":this.prevSelLangAction,
            "displayName":this.view.displayContentEdit.tbxEditName.text,
            "displayDescription":this.view.displayContentEdit.txtareaEditDescription.text
          });
        }
        if(!isPresent && dataToSet.isEdited){
          this.editFeatureReqParam.actions[currentIndex].limits.push(
            { 
              "type":"DAILY_LIMIT",
              "value":this.view.valueEntryMaxDailyValue.tbxEnterValue.text
            },
            { 
              "type":"MAX_TRANSACTION_LIMIT",
              "value":this.view.valueEntryMaxValueLimit.tbxEnterValue.text
            },
            { 
              "type":"MIN_TRANSACTION_LIMIT",
              "value":this.view.valueEntryMinValueLimit.tbxEnterValue.text
            },
            { 
              "type":"WEEKLY_LIMIT",
              "value":this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text
            });
        }      
        this.view.segFeaturedActions.data[this.currSelectedIndex].displayContent[this.prevSelLangAction]={
          "displayName":this.view.displayContentEdit.tbxEditName.text,
          "displayDescription":this.view.displayContentEdit.txtareaEditDescription.text};
        this.view.segFeaturedActions.data[this.currSelectedIndex].status=this.view.actionStatusSwitch.switchToggle.selectedIndex===0?
          this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE:
        this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE;
        this.view.segFeaturedActions.data[this.currSelectedIndex].limits=[
          { 
            "type":"DAILY_LIMIT",
            "value":this.view.valueEntryMaxDailyValue.tbxEnterValue.text
          },
          { 
            "type":"MAX_TRANSACTION_LIMIT",
            "value":this.view.valueEntryMaxValueLimit.tbxEnterValue.text
          },
          { 
            "type":"MIN_TRANSACTION_LIMIT",
            "value":this.view.valueEntryMinValueLimit.tbxEnterValue.text
          },
          { 
            "type":"WEEKLY_LIMIT",
            "value":this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text
          }];
      }
    },
    updateContentEditPayload: function(){
      var isPresent=false;
      var self=this;
      var selInd = this.view.segFeatures.selectedRowIndex[1];
      var displayContent = this.view.segFeatures.data[selInd].displayContent?this.view.segFeatures.data[selInd].displayContent:[];
      var selLangDisplayContent=displayContent[this.prevSelLang];
      if(selLangDisplayContent&&((selLangDisplayContent.displayName!==this.view.tbxEditFeatureName.text)||(selLangDisplayContent.displayDescription!==this.view.txtareaEditFeatureDescription.text))){
        for(var j=0;j<self.editFeatureReqParam.featureDisplay.length;j++){
          if(Object.values(self.editFeatureReqParam.featureDisplay[j]).includes(self.prevSelLang)){
            self.editFeatureReqParam.featureDisplay[j].displayName=self.view.tbxEditFeatureName.text;
            self.editFeatureReqParam.featureDisplay[j].displayDescription=self.view.txtareaEditFeatureDescription.text;
            isPresent=true;
            break;
          }
        }
        if(!isPresent){
          self.editFeatureReqParam.featureDisplay.push({
            "localeId":self.prevSelLang,
            "displayName":self.view.tbxEditFeatureName.text,
            "displayDescription":self.view.txtareaEditFeatureDescription.text
          });
        }
        this.view.segFeatures.data[selInd].displayContent[this.prevSelLang]={"displayName":self.view.tbxEditFeatureName.text,
                                                                             "displayDescription":self.view.txtareaEditFeatureDescription.text};
      }
    },
    updateLimitGroupEditPayload: function(){
      var isPresent=false;
      var self=this;
      var selInd = this.view.segLimitGroup.selectedRowIndex[1];
      var displayContent = this.view.segLimitGroup.data[selInd].displayContent?this.view.segLimitGroup.data[selInd].displayContent:[];
      var selLangDisplayContent=displayContent[this.prevSelLangLimitGroup];
      if(selLangDisplayContent&&((selLangDisplayContent.displayName!==this.view.displayContentLimitGroupEdit.tbxEditName.text)||(selLangDisplayContent.displayDescription!==this.view.displayContentLimitGroupEdit.txtareaEditDescription.text))){
        for(var j=0;j<self.editLimitGroupReqParam.limitGroupDisplay.length;j++){
          if(Object.values(self.editLimitGroupReqParam.limitGroupDisplay[j]).includes(self.prevSelLangLimitGroup)){
            self.editLimitGroupReqParam.limitGroupDisplay[j].displayName=self.view.displayContentLimitGroupEdit.tbxEditName.text;
            self.editLimitGroupReqParam.limitGroupDisplay[j].displayDescription=self.view.displayContentLimitGroupEdit.txtareaEditDescription.text;
            isPresent=true;
            break;
          }
        }
        if(!isPresent){
          self.editLimitGroupReqParam.limitGroupDisplay.push({
            "localeId":self.prevSelLangLimitGroup,
            "displayName":self.view.displayContentLimitGroupEdit.tbxEditName.text,
            "displayDescription":self.view.displayContentLimitGroupEdit.txtareaEditDescription.text
          });
        }
        this.view.segLimitGroup.data[selInd].displayContent[this.prevSelLangLimitGroup]={"displayName":self.view.displayContentLimitGroupEdit.tbxEditName.text,
                                                                                         "displayDescription":self.view.displayContentLimitGroupEdit.txtareaEditDescription.text};
      }
    },
    setSegLangData: function(rowData){
      var lang = this.view.EditFeatureLangList.segStatusFilterDropdown.info.lang;
      this.view.EditFeatureLangList.segStatusFilterDropdown.setData(lang);
      var segData =this.view.EditFeatureLangList.segStatusFilterDropdown.data;
      var filteredLang = [];
      var keys=Object.keys(rowData.displayContent);
      for(var i=0;i<this.view.EditFeatureLangList.segStatusFilterDropdown.data.length;i++){
        if (keys.includes(this.view.EditFeatureLangList.segStatusFilterDropdown.data[i].langCode) && this.view.lblSelectedLanguage.info.selLang.langCode !== this.view.EditFeatureLangList.segStatusFilterDropdown.data[i].langCode) {
          filteredLang.push(segData[i]);
        }
      }
      this.view.EditFeatureLangList.segStatusFilterDropdown.setData(filteredLang);
      this.view.forceLayout();
    },
    setSegLangDataLimitGroup: function(rowData){
      var lang = this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.info.lang;
      this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.setData(lang);
      var segData =this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data;
      var filteredLang = [];
      var keys=Object.keys(rowData.displayContent);
      for(var i=0;i<this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data.length;i++){
        if (keys.includes(this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) && this.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode !== this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) {
          filteredLang.push(segData[i]);
        }
      }
      this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.setData(filteredLang);
      this.view.forceLayout();
    },
    setSegLangDataAction: function(rowData){
      var lang = this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.info.lang;
      this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.setData(lang);
      var segData =this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data;
      var filteredLang = [];
      var keys=Object.keys(rowData.displayContent);
      for(var i=0;i<this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data.length;i++){
        if (keys.includes(this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) && this.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode !== this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) {
          filteredLang.push(segData[i]);
        }
      }
      this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.setData(filteredLang);
      this.view.forceLayout();
    },
    validateLimits : function(){
      if(this.validateLimitFields() && this.validateFieldsAction()){
        var selInd=this.view.segFeaturedActions.selectedRowIndex;
        this.toggleSelectedRow();
        this.mapDependencies(this.view.segFeaturedActions.data[selInd[1]].dependentActions);
      }
    },
    validateLimitFields : function(){
      var isValid=true;
      var segData=this.view.segFeaturedActions.data;
      var minVal=parseFloat(this.view.valueEntryMinValueLimit.tbxEnterValue.text);
      var maxVal=parseFloat(this.view.valueEntryMaxValueLimit.tbxEnterValue.text);
      var maxDailyVal=parseFloat(this.view.valueEntryMaxDailyValue.tbxEnterValue.text);
      var maxWeeklyVal=parseFloat(this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text);
      if(this.view.flxFeaturedActionLimits.isVisible){
        if(this.view.valueEntryMinValueLimit.tbxEnterValue.text===""||minVal<0 || minVal>maxVal){
          this.view.valueEntryMinValueLimit.flxValueTextBox.skin = "sknFlxCalendarError";
          if(this.view.valueEntryMinValueLimit.tbxEnterValue.text==="")
            this.view.lblMinValueLimitErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(minVal>maxVal)
            this.view.lblMinValueLimitErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValuShouldBeLessThanMaxTrans");  
          else
            this.view.lblMinValueLimitErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeNegative");
          this.view.flxMinValueError.setVisibility(true);
        }else{
          this.view.valueEntryMinValueLimit.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
          this.view.flxMinValueError.setVisibility(false);
        }

        if(this.view.valueEntryMaxValueLimit.tbxEnterValue.text===""|| maxVal<0 ||
           (maxDailyVal >minVal  && maxVal > maxDailyVal )){
          if(this.view.valueEntryMaxValueLimit.tbxEnterValue.text==="")
            this.view.lblMaxValueLimitErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(maxVal<0)
            this.view.lblMaxValueLimitErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeNegative");
          else if (maxVal > maxDailyVal && maxDailyVal >minVal )
            this.view.lblMaxValueLimitErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
          this.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxCalendarError";
          this.view.flxMaxValueExceedError.setVisibility(true);
        }else{
          this.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
          this.view.flxMaxValueExceedError.setVisibility(false);
        }

        if(this.view.valueEntryMaxDailyValue.tbxEnterValue.text===""||maxDailyVal<0 ||maxDailyVal<minVal ||
           (maxWeeklyVal > minVal && maxDailyVal > maxWeeklyVal)){
          if(this.view.valueEntryMaxDailyValue.tbxEnterValue.text==="")
            this.view.lblDailyLimitValueErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(maxDailyVal<0)
            this.view.lblDailyLimitValueErrorMsg.text=  kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeNegative");
          else if(maxDailyVal<minVal)
            this.view.lblDailyLimitValueErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueGreaterThanMinTransLimit");
          else if(maxDailyVal > maxWeeklyVal && maxWeeklyVal > minVal)
            this.view.lblDailyLimitValueErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
          this.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxCalendarError";
          this.view.flxMaxDailyLimitError.setVisibility(true);
        }else{
          this.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
          this.view.flxMaxDailyLimitError.setVisibility(false);
        }

        if(this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text===""|| maxWeeklyVal<0 || maxWeeklyVal<minVal){
          if(this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text==="")
            this.view.lblWeeklyLimitValueErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(maxWeeklyVal<0)
            this.view.lblWeeklyLimitValueErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeNegative");
          else if(maxWeeklyVal<minVal)
            this.view.lblWeeklyLimitValueErrorMsg.text= kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueGreaterThanMinTransLimit");
          this.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxCalendarError";
          this.view.flxWeeklyLimitValueError.setVisibility(true);
        }else{
          this.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
          this.view.flxWeeklyLimitValueError.setVisibility(false);
        }
        if(this.view.flxMinValueError.isVisible||this.view.flxMaxValueExceedError.isVisible||this.view.flxMaxDailyLimitError.isVisible||this.view.flxWeeklyLimitValueError.isVisible)
          isValid=false;

        if(isValid)
          this.updateActionEditPayload(segData[this.currSelectedIndex]);
      }
      return isValid;
    },
    /* select the current action in the edit screen
   */
    selectRequiredLimit : function(){
      this.subTabsButtonUtilFunction([this.view.btnFeatures,this.view.btnActions],this.view.btnActions);
      this.view.flxFeaturedAction.setVisibility(true);
      this.view.flxFeatureContainer.setVisibility(false);

      var selAction = this.view.segActionList.selectedRowItems;
      var actionId = selAction[0].actionId;
      var actions = this.view.segFeaturedActions.data;
      var selInd = 0;
      for(var i=0;i<actions.length;i++){
        if(actionId === actions[i].actionId){
          selInd = i;
          break;
        } 
      }
      if(this.view.segFeaturedActions.selectedRowIndex){
        this.view.segFeaturedActions.selectedRowIndex[1] = selInd;
      }else{
        this.view.segFeaturedActions.selectedRowIndex = [0,selInd];
      }
      this.toggleSelectedRow();
      this.view.forceLayout();
    },
    allowOnlyNumericValuesAndDot: function (evt) {
      if (evt.which !== 8 && evt.which !== 0 && evt.which!==46&&(evt.which < 48 || evt.which > 57))
      {
        return false;
      }else
        return true;
    },
    restrictTextFieldToNumericAndDot : function (widgetID) {
      var text = document.getElementById(widgetID);
      text.onkeypress = text.onpaste = this.allowOnlyNumericValuesAndDot;
    },
    containSpecialChars: function(name){
      var regex = /[+=\\\\|<>^*%]/;  
      if(regex.test(name)){
        return true;
      }
      return false;
    },

    /* ########################### ADD FACILITY ##################################### START  */

    showAddFacilitiesBasicDetailsScreen: function(option, features) {
      //Focus on first element in left menu
      this.view.addFacility.lblOption1.skin = "sknlblLatoBold485c7512px";
      this.view.addFacility.lblOption2.skin = "sknLbl485C75LatoRegular12Px";
      this.view.addFacility.lblFontIconRightArrow1.isVisible = true;
      this.view.addFacility.lblFontIconRightArrow2.isVisible = false;
      // Hide fields errors
      this.view.addFacility.flxErrorMsg1.isVisible = false;
      this.view.addFacility.tbxAddFacilityName.skin = "txtD7d9e0";
      this.view.addFacility.flxErrorMsg2.isVisible = false;
      this.view.addFacility.tbxAddFacilityCode.skin = "txtD7d9e0"; 
      //Prepare to display the page and elements for Basic Details screen
      this.view.addFacility.flxFacilityBasicDetails.isVisible = true;
      this.view.addFacility.flxAssignFeaturesAndActions.isVisible = false;
      this.view.addFacility.btnAddFacilityNext.isVisible = true;    

      this.view.flxMainContent.isVisible = false;
      this.view.flxMainContentFacilities.isVisible = false;
      this.view.flxTabsFeaturesAndFacilities.isVisible = false;
      this.view.flxAddFacility.isVisible = true;

      this.facilityOption = option;
      if(option === "addFacility") {      
        this.view.addFacility.flxDisableTbxCode.isVisible = false;
        this.view.addFacility.breadcrumbs.lblCurrentScreen.text = "NEW";
        this.view.addFacility.tbxAddFacilityName.text="";
        this.view.addFacility.lblFacilityNameTextCounter.text = "0/50";          	
        this.view.addFacility.tbxAddFacilityCode.text="";
        document.getElementById('frmServiceManagement_addFacility_tbxAddFacilityCode').readOnly = false;
        this.view.addFacility.lblFacilityCodeTextCounter.text = "0/50"; 
        this.view.addFacility.txtAreaFacilityDescription.text=""; 
        this.view.addFacility.lblFacilityDescTextCounter.text = "0/300";
        this.view.addFacility.btnUpdateFacility.isVisible = false; 
        this.view.addFacility.btnAddFacility.isVisible = true;
        var featuresList = JSON.parse(JSON.stringify(features));
        featuresList.forEach(feature => {
          feature["isSelected"] = "false";
          feature.actions.forEach(action => {
            action["isSelected"] = "false";
            action["show"] = "true";
          })
        });
        this.editFacilityReqParam= {
          "facilities": [
            {      
              "code": "",        
              "facilityName": "",                  
              "description": "",
              "features":   featuresList, 
            }
          ]}; //de creat dupa ce e creat call-ul in Fabric
        this.setFeaturesSegDataAddEditFacilityPage(featuresList, this.facilityOption);
      } else if(option === "editFacility") {      
        //var index = this.view.segFacilities.selectedIndex;
        //var rowIndex = index[1];
        //var rowData = this.view.segFacilities.data[rowIndex];
        var rowData = features;
        this.view.addFacility.flxDisableTbxCode.isVisible = true;
        document.getElementById('frmServiceManagement_addFacility_tbxAddFacilityCode').readOnly = true;
        this.view.addFacility.btnUpdateFacility.isVisible = true; 
        this.view.addFacility.btnAddFacility.isVisible = false;
        this.view.addFacility.breadcrumbs.lblCurrentScreen.text = (this.view.addFacility.tbxAddFacilityName.text && this.view.addFacility.tbxAddFacilityName.text.trim().length !== 0) ? this.view.addFacility.tbxAddFacilityName.text.toUpperCase() : kony.i18n.getLocalizedString("i18n.Applications.NA");
      }
    },

    filterFeaturesActionsOnAddEditFacilityPage: function() {
      var featuresList = this.editFacilityReqParam.facilities[0].features;
      var searchResult = featuresList
      .filter(this.searchFilterFeaturesActionsAddEditFacilityPage)
      .sort(this.sortBy.sortData);
      this.setFeaturesSegDataAddEditFacilityPage(searchResult, this.facilityOption);
    }, 
    // for the search treatments in the facility details add/edit page
    searchFilterFeaturesActionsAddEditFacilityPage: function(feature) {
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text);
      if (typeof searchText === "string" && searchText.length > 0) {
        if(feature.featureName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
          if(feature.actions.length !== 0){
            feature.actions.forEach(action => {
              if(action["show"] === "false"){
                action["show"] = "true";
              } 
            });
          }
          return true;
        } else {
          var isActionFound = false;
          var revisedActions = [];
          if(feature.actions.length !== 0){
            revisedActions = this.searchFilterActionsAddEditPage(feature.actions, searchText);
            revisedActions.forEach(action => {
              if(action["show"] === "true"){
                isActionFound = true;
                return 0;
              } 
            });

            feature.actions = revisedActions;
          } else {
            isActionFound = false;
          }

          return isActionFound;
        }
      } else {
        if(feature.actions.length !== 0){
          feature.actions.forEach(action => {
            if(action["show"] === "false"){
              action["show"] = "true";
            } 
          });
        }
        return true;
      }
    },

    searchFilterActionsAddEditPage: function(listActions, txtToSearch) {
      if (listActions.length !== 0) {
        for (var i = 0; i < listActions.length; i++) {
          (listActions[i].actionName.toLowerCase().indexOf(txtToSearch.toLowerCase()) !== -1) ?
            listActions[i].show = "true" :  listActions[i].show = "false"         
        }
        return listActions;
      }
    },

    showAddFacilitiesFeaturesAndActionsScreen: function() {
      var nameVal = this.view.addFacility.tbxAddFacilityName.text;
      var codeVal = this.view.addFacility.tbxAddFacilityCode.text;
      if(!nameVal) {
        this.view.addFacility.flxErrorMsg1.isVisible = true;
        this.view.addFacility.tbxAddFacilityName.skin = "skinredbg";
      };
      if(!codeVal) {
        this.view.addFacility.flxErrorMsg2.isVisible = true;
        this.view.addFacility.tbxAddFacilityCode.skin = "skinredbg";
      };
      if(nameVal && codeVal) {

        this.editFacilityReqParam.facilities[0].facilityName = nameVal;
        this.editFacilityReqParam.facilities[0].code = codeVal;    
        this.editFacilityReqParam.facilities[0].description =  this.view.addFacility.txtAreaFacilityDescription.text;

        this.view.addFacility.btnAddFacilityNext.isVisible = false;
        if (this.facilityOption === "addFacility" || this.facilityOption === "addFacilityBasicClick") {
          this.view.addFacility.btnAddFacility.isVisible = true;          
        } else if (this.facilityOption === "editFacility" || this.facilityOption === "editFacilityBasicClick") {
          this.view.addFacility.btnUpdateFacility.isVisible = true;
        }    	
        this.view.addFacility.lblFontIconRightArrow1.isVisible = false;
        this.view.addFacility.lblFontIconRightArrow2.isVisible = true;
        this.view.addFacility.lblOption1.skin = "sknLbl485C75LatoRegular12Px";
        this.view.addFacility.lblOption2.skin = "sknlblLatoBold485c7512px";
        this.view.addFacility.flxFacilityBasicDetails.isVisible = false;    	
        //     	this.view.addFacility.flxAssignFeaturesAndActions.isVisible = true;
        this.view.addFacility.flxAssignFeaturesAndActions.isVisible = true;
      }
    },
    cancelAddFacilitiesScreen: function(option) {
      this.view.flxAddFacility.isVisible = false; 
      this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text = "";
      this.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false); 
      this.view.flxMainContentFacilities.isVisible = true;
      if(option === ""){          
        this.view.flxTabsFeaturesAndFacilities.isVisible = true;
        this.view.flxScrollViewFacilities.setVisibility(true);
        this.view.flxFacilities.isVisible = false; 
        //this.view.viewDetailsAction.flxActionView.height = 420 + "px";
        this.view.viewDetailsAction.flxActionView.setVisibility(true);
        this.view.viewDetailsAction.flxNoRecordsFound.setVisibility(false);
        this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.FeaturesAndFacilities");
        this.facilityOptionView = "";
      } else if(option === "viewFacility"){
        //this.view.viewDetailsAction.flxActionView.setVisibility(true);
        //this.view.viewDetailsAction.flxNoRecordsFound.setVisibility(false);
        this.view.mainHeader.lblHeading.text  = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFacility");
        this.view.flxFacilities.isVisible = true; 
      }
    },

    getFeaturesOfCurrentFacility: function(features,context) {
      var self = this;
      self.view.viewDetailsAction.flxActionView.removeAll();
      self.view.viewDetailsAction.flxActionView.forceLayout();
      self.listFeaturesComponentsOfFacility = [];
      var crtDate = new Date();
      var idRoot = crtDate.getFullYear() + crtDate.getMonth() + crtDate.getDate() + crtDate.getHours() + crtDate.getMinutes() + crtDate.getSeconds() + crtDate.getMilliseconds();
      var actionsSelected = [];	 
      if (features.length !== 0) {
        for (var i = 0; i < features.length; i++) {   
          actionsSelected = [];
          features[i].actions.forEach(action => {
            if (context != "detailsView" || action.isSelected == "true") {
              actionsSelected.push(action);
            }
          })
          var nbActions = parseInt(features[i].length, 10);
          var componentFeatureInViewFacility = new com.adminConsole.Facilities.facilityActions({
            //          "id": "featureRow" + i,
            "id": idRoot.toString() + i,
            "isVisible": true,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "bottom": "20px"
          }, {}, {});
          //features[i].actions = actionsSelected;
          self.view.viewDetailsAction.flxActionView.add(componentFeatureInViewFacility);
          self.toggleFacilityFeaturesonClick(componentFeatureInViewFacility);
          self.setFacilityFeatureSegmentData(features[i], componentFeatureInViewFacility, i, context); 
          self.listFeaturesComponentsOfFacility.push(componentFeatureInViewFacility);
        }
      } else {
        self.showNoResultsFoundFeaturesAndActions();
      }
      self.view.forceLayout();
    },

    toggleFacilityFeaturesonClick : function(componentFeatureInViewFacility){
      var scopeObj = this;
      componentFeatureInViewFacility.flxFacilityActionDropdown.onClick= function(){
        /* 
          * If expands the current feature component, then colapse all the other fetaures components.
          * If clicks multiple times the same current feature component, for expanding / collapsing it,
          * then will let untouched the other features components.
          * This way, only one feature component is expanded at a time.
          * All the others are collapsed.
          */  
        for (var i = 0; i < scopeObj.listFeaturesComponentsOfFacility.length; i++) {
          var crtComponent = scopeObj.listFeaturesComponentsOfFacility[i];
          if (crtComponent === componentFeatureInViewFacility) {
            /* toggle the current component, anytime we are clicking it */
            crtComponent.toggleContent();
          } else {
            /* if one of the other features components is already expanded, will collapse it. */
            crtComponent.collapseFeature();
          }
        }  
        scopeObj.view.forceLayout();
      } 
    },

    setFacilityFeatureSegmentData: function(feature, componentFeatureInViewFacility, c, context) {
      // if no searchTeaxt => display the entire list
      // if searchText => verify if feature name contains the searchText 
      //			if yes => display all the actions for the future
      //            if no => display only the actions that contains searchText
      var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.viewDetailsAction.search.tbxSearchBox.text);
      if (typeof searchText === "string" && searchText.length > 0) {           
        if (feature.featureName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
          var actions = feature.actions;
        } else {         
          var actions = feature.actions.filter(function(el){return el.show=="true"});
        }  
      } else {
        var actions = feature.actions;
      }  
      var nbActionsTotal = parseInt(actions.length, 10);

      var self = this;
      var data = [];
      var actionRow = "";
      var dataMap = {
        "lblFacilityActionName" : "lblFacilityActionName",
        "lblFacilityDescription" : "lblFacilityDescription",
        "lblFacilityIconStatus" : "lblFacilityIconStatus",
        "lblFacilityActionStatusValue" : "lblFacilityActionStatusValue"
      };
      for (var k=0; k<actions.length; k++) {
        if (context != "detailsView" || actions[k].isSelected == "true") {
          actionRow = {           
            "lblFacilityActionName" : actions[k].actionName,
            "lblFacilityDescription" : actions[k].actionDescription,
            "lblFacilityIconStatus": {
              "isVisible": true,
              "skin": (actions[k].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE) ? "sknFontIconActivate" : "sknfontIconInactive"       
            },
            "lblFacilityActionStatusValue": {
              "isVisible": true,
              "text": (actions[k].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE) ? kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausActive") : kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausInactive")
            }
          };              
          data.push(actionRow);            
        }
      }
      /*var data = actions.map(function (action) {
		  return {
            "lblFacilityActionName" : action.actionName,
            "lblFacilityDescription" : action.actionDescription,
			"lblFacilityIconStatus": {
			  "isVisible": true,
			  "skin": (action.actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE) ? "sknFontIconActivate" : "sknfontIconInactive"       
			},
            "lblFacilityActionStatusValue": {
              "isVisible": true,
              "text": (action.actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE) ? kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausActive") : kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausInactive")
            }
		  };
		});
        */

      componentFeatureInViewFacility.SegFacilityActions.widgetDataMap = dataMap;
      componentFeatureInViewFacility.SegFacilityActions.setData(data);
      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.lblFacilityName.text = feature.featureName;
      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxActionHeader.lblFacilityActionsValue.text = (nbActionsTotal < 10) ? "0" + nbActionsTotal.toString() : nbActionsTotal.toString();
      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxActionHeader.lblFacilityActionsValue.width = 15 + "px";
      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxActionHeader.lblSelectedValueFacilityAction.text = (data.length < 10) ? "0" + data.length.toString() : data.length.toString();
      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxActionHeader.lblSelectedValueFacilityAction.width = 15 + "px";
      componentFeatureInViewFacility.fonticonArrowActionFacility.text = "\ue922";
      componentFeatureInViewFacility.flxFacilityActionsContent.setVisibility(false)
      componentFeatureInViewFacility.flxFacilityActionDropdown.hoverSkin="sknFlxPointer";

      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.isVisible = "true";
      if (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) {
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.text = "\ue921";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.skin = "sknFontIconActivate";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityStatusValue.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausActive");
      } else if (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) {
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.text = "\ue921";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.skin = "sknfontIconInactive";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityStatusValue.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausInactive");
      } else if (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_UNAVAILABLE) {
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.text = "\ue921";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.skin = "sknFontIconError";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityStatusValue.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausUnavailable");
      } else if (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_SUSPENDED) {
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.text = "\ue91d";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.skin = "sknFontIconPause";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityStatusValue.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.actionStausSuspended");
      } else {
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.text = "\ue921";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityActionIconStatus.skin = "";
        componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityStatusValue.text = "";
      }
      componentFeatureInViewFacility.flxFacilityActionsHeader.flxFacilityNameContainer.flxFacilityStatus.lblFacilityStatusValue.isVisible = "true";

      this.view.forceLayout();
    },

    //Add features and actions new work
    setFeaturesSegDataAddEditFacilityPage: function(featuresList, option){
      var self =this;
      var features = JSON.parse(JSON.stringify(featuresList));
      var areSelectedAllActions = true;   
      if(features.length !== 0){
        var facilityFeaturesData = new Map();
        features.forEach(feature => {
          var featureObj = {"featureDetails":feature, "actions":JSON.stringify(feature.actions)};
          facilityFeaturesData.set(feature.featureId,featureObj);

          feature.actions.forEach(action => {
            action.isSelected === "false" ? areSelectedAllActions =  false : ""
          });              	  
        });
        if (areSelectedAllActions) {
          this.view.addFacility.lblUnselectAllFeatures.isVisible = true;
          this.view.addFacility.lblselectAllFeatures.isVisible = false;    
        } else {
          this.view.addFacility.lblUnselectAllFeatures.isVisible = false;
          this.view.addFacility.lblselectAllFeatures.isVisible = true;    
        }
        var featuresMap = new Map(facilityFeaturesData);
        var segData = [], selFeatureCount = 0, segDataJson = {};
        featuresMap.forEach(function(featureObj,key){
          var rowsData = [], selRowCount = 0;
          var actions = JSON.parse(featureObj.actions) || [];
          for(var i=0 ;i<actions.length ; i++){
            var rowObj =  {
              "id": actions[i].actionId,
              "actionDetailsObj":actions[i],
              "flxContractEnrollFeaturesEditRow": {"isVisible": false,
                                                   "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
              "lblFeatureName": {"text": actions[i].actionName},
              "flxCheckbox": {"onClick": self.onClickAddFeaturesCheckbox.bind(self,self.view.addFacility.segAddFacilityFeatures)},
              "imgCheckbox": {"src":(actions[i].isSelected === "true") ? CommonUtilities.AdminConsoleCommonUtils.checkboxSelected: CommonUtilities.AdminConsoleCommonUtils.checkboxnormal},
              "lblStatus": {"text": actions[i].actionStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                            kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
              "lblIconStatus": {"text":"\ue921",
                                "skin": actions[i].actionStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                                "sknFontIconActivate" : "sknfontIconInactive"},
              "flxFeatureNameCont":{"left":"40dp"},
              "template":"flxContractEnrollFeaturesEditRow"
            };
            if(actions[i].show === "true"){
              rowsData.push(rowObj);
              selRowCount = (actions[i].isSelected === "true") ? (selRowCount +1) : selRowCount;
            }
          }

          var feature = featureObj.featureDetails;
          var secData = {
            "id": feature.featureId,
            "featureDetailsObj":feature,
            "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
            "lblFeatureName": {"text": feature.featureName},
            "flxToggleArrow": {"onClick": self.toggleSelectFeatureArrow.bind(self,self.view.addFacility.segAddFacilityFeatures)},
            "lblIconToggleArrow":{"text": "\ue922",
                                  "skin": "sknIcon00000015px"},
            "flxHeadingCheckbox":{"isVisible": true,
                                  "onClick":self.onClickAddFeaturesCheckbox.bind(self,self.view.addFacility.segAddFacilityFeatures)},
            "imgTopCheckbox": {"src": self.getHeaderCheckboxImage(rowsData,true,true)},
            "lblAvailableActions": {"text": kony.i18n.getLocalizedString("i18n.products.SelectedAccountActionsColon")},
            "lblCountActions":{"text": self.getTwoDigitNumber(selRowCount)},
            "lblTotalActions": {"text": "of "+ self.getTwoDigitNumber(rowsData.length)},
            "lblSectionLine":"-",
            "lblStatusValue":{"text": feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                              kony.i18n.getLocalizedString("i18n.permission.Active") : 
                              (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ? kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive") :
                              (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_UNAVAILABLE) ? kony.i18n.getLocalizedString("i18n.common.Unavailable") : 
                              (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_SUSPENDED) ? kony.i18n.getLocalizedString("i18n.frmCustomers.Suspended") : "",

                             },
            "lblIconStatus":{"text": feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "\ue921" : 
                             (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ? "\ue921" :
                             (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_UNAVAILABLE) ? "\ue921" : 
                             (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_SUSPENDED) ? "\ue91d" : "",
                             "skin": feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : 
                             (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ? "sknfontIconInactive" :
                             (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_UNAVAILABLE) ? "sknFontIconError" : 
                             (feature.featureStatus === CommonUtilities.AdminConsoleCommonUtils.constantConfig.FEATURE_SUSPENDED) ? "sknFontIconPause" : ""
                            },
            "flxHeaderContainer":{"isVisible":false},
            "flxActionsHeaderContainer": {"isVisible":false},
            "flxActionCheckbox": {"isVisible":false},
            "lblActionName":{"text": kony.i18n.getLocalizedString("i18n.products.Action_UC")},
            "lblActionStatus":{"text": kony.i18n.getLocalizedString("i18n.roles.STATUS")},
            "lblActionSeperator": {"skin": "sknlblSeperatorD7D9E0","text":"-"},
            "flxActionNameHeading": {"left": "55dp"},
            "template":"flxEnrollSelectedAccountsSec",
          };
          selFeatureCount = (secData.imgTopCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal) ?
            selFeatureCount : (selFeatureCount+1);
          segDataJson[feature.featureId] = {"secData":secData,"rowData":rowsData};
          segData.push([secData,rowsData]);
        });
        this.view.addFacility.rtxNoFeaturesResults.isVisible = false;
        this.view.addFacility.flxAddFeaturesSubHeading.isVisible = true;
        this.view.addFacility.segAddFacilityFeatures.isVisible = true;
        this.view.addFacility.lblCountFeatures.text = this.getTwoDigitNumber(selFeatureCount);
        this.view.addFacility.segAddFacilityFeatures.widgetDataMap = this.getAddFeaturesSegWidgetMap();
        this.view.addFacility.segAddFacilityFeatures.setData(segData);
        this.view.addFacility.segAddFacilityFeatures.info = {"segDataJson":segDataJson};
      } else {
        this.view.addFacility.flxAddFeaturesSubHeading.isVisible = false;
        this.view.addFacility.segAddFacilityFeatures.isVisible = false;
        this.view.addFacility.rtxNoFeaturesResults.isVisible = true;
        var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.addFacility.searchBoxAddProdFeatures.tbxSearchBox.text);
        this.view.addFacility.rtxNoFeaturesResults.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+ searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");  
      }
    },
    /* FACILITY FEATURES: check/uncheck feature/actions section in add FACILITY features */
    onClickAddFeaturesCheckbox : function(segmentPath,eventObj){
      var selSecInd = eventObj.rowContext.sectionIndex;
      var selRowInd = eventObj.rowContext.rowIndex;
      var segData = segmentPath.data;
      var segSecData = segData[selSecInd][0];
      var rowsData = segData[selSecInd][1];
      var selectedRowsCount = 0,selFeaturesCount = 0; 

      var featureSelected = this.editFacilityReqParam.facilities[0].features.find(feature => feature.featureId === segSecData.id);
      var isFeatureSelected = false;

      //on row selections
      if(selRowInd >= 0){
        rowsData[selRowInd].imgCheckbox.src = (rowsData[selRowInd].imgCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal) ?
          CommonUtilities.AdminConsoleCommonUtils.checkboxSelected : CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;

        var selectedAction = featureSelected.actions.find(action => action.actionId ===  rowsData[selRowInd].id);
        (rowsData[selRowInd].imgCheckbox.src === "checkboxnormal.png") ? selectedAction["isSelected"] = "false" : selectedAction["isSelected"] = "true";

        segSecData.imgTopCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      } //on section selections
      else{
        var sectionImg = (segSecData.imgTopCheckbox.src === CommonUtilities.AdminConsoleCommonUtils.checkboxnormal) ?
            CommonUtilities.AdminConsoleCommonUtils.checkboxSelected : CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
        segSecData.imgTopCheckbox.src = sectionImg;       
        for(var i=0; i<rowsData.length; i++){
          rowsData[i].imgCheckbox.src = sectionImg;  
        }
        featureSelected.actions.forEach(action => {
          if(action["show"] === "true")
            sectionImg === "checkboxnormal.png" ? action["isSelected"] = "false" : action["isSelected"] = "true";
        })
      }
      featureSelected.actions.forEach(action => {
        if(action["isSelected"] === "true")
          isFeatureSelected = true;
      });
      (isFeatureSelected) ?
        featureSelected["isSelected"] = "true" :
      featureSelected["isSelected"] = "false";       

      var areSelectedAllActions = true;
      this.editFacilityReqParam.facilities[0].features.forEach(feature => {
        feature.actions.forEach(action => {
          action.isSelected === "false" ? areSelectedAllActions =  false : ""
        })                 
      });

      if (areSelectedAllActions) {
        this.view.addFacility.lblUnselectAllFeatures.isVisible = true;
        this.view.addFacility.lblselectAllFeatures.isVisible = false;    
      } else {
        this.view.addFacility.lblUnselectAllFeatures.isVisible = false;
        this.view.addFacility.lblselectAllFeatures.isVisible = true;    
      }


      selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"imgCheckbox",false);
      segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
      this.view.addFacility.segAddFacilityFeatures.info.segDataJson[segSecData.id] = {"secData":segSecData,"rowData":rowsData}
      var selFeaturesCount = this.getSelectedFeatureActionCount(segmentPath.data,"imgTopCheckbox",true);
      this.view.addFacility.lblCountFeatures.text = this.getTwoDigitNumber(selFeaturesCount);  



    },
    /* expand/collapse the feature card in add facility features screen*/
    toggleSelectFeatureArrow : function(segmentPath,context){
      var selSecInd = context.rowContext.sectionIndex;
      var selRowInd = context.rowContext.rowIndex;
      var segData = segmentPath.data;
      var segSecData = segData[selSecInd][0];
      var rowsData = segData[selSecInd][1];
      for(var i=0; i<segData.length; i++){
        var currentSection = segData[i][0];
        var currentRow = segData[i][1];
        if(selSecInd !== i){
          currentSection = this.getCollapsedSectionProperties(currentSection);
          currentRow = this.showHideSegRowFlex(currentRow,false);
          segmentPath.setSectionAt([currentSection,currentRow],i);
        }
      }
      if((segSecData.lblIconToggleArrow && segSecData.lblIconToggleArrow.skin === "sknIcon00000015px") ||
         (segSecData.lblArrow && segSecData.lblArrow.skin === "sknfontIconDescRightArrow14px")){
        segSecData = this.getExpandedSectionProperties(segSecData);
        rowsData = this.showHideSegRowFlex(rowsData,true);
      } else{
        segSecData = this.getCollapsedSectionProperties(segSecData);
        rowsData = this.showHideSegRowFlex(rowsData,false);
      }
      //       segmentPath.setData(segData);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);

    },

    /* get the image to be set in section header in add facility features*/
    getHeaderCheckboxImage : function(data,isRowData,hasPartialSelection){
      var img = CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
      var currImg = (isRowData === true) ? "imgCheckbox" :"imgTopCheckbox";
      var selCount = 0, partialCount = 0;
      for(var i=0; i<data.length; i++){
        var list = (isRowData === true) ? data[i] : data[i][0];
        if(list[currImg].src === CommonUtilities.AdminConsoleCommonUtils.checkboxSelected || list[currImg].src === CommonUtilities.AdminConsoleCommonUtils.checkboxPartial){
          selCount  = selCount +1;
          partialCount = (list[currImg].src === CommonUtilities.AdminConsoleCommonUtils.checkboxPartial) ? partialCount +1 : partialCount;
        }
      }
      if(hasPartialSelection){
        if(selCount !== 0 && selCount === data.length)
          img = partialCount === 0 ? CommonUtilities.AdminConsoleCommonUtils.checkboxSelected: CommonUtilities.AdminConsoleCommonUtils.checkboxPartial;
        else if(selCount !== 0 && selCount < data.length)
          img = CommonUtilities.AdminConsoleCommonUtils.checkboxPartial;
      } else{
        if(selCount === data.length)
          img = CommonUtilities.AdminConsoleCommonUtils.checkboxSelected;
      }
      return img;    
    },

    /* get 2 digit string for number */
    getTwoDigitNumber : function(count){
      var updatedCount = 0;
      count = parseInt(count,10);
      if(count > 9){
        updatedCount = count;
      } else{
        updatedCount = "0"+count;
      }
      return updatedCount;
    },

    getAddFeaturesSegWidgetMap : function(){
      var widgetMap = {
        //section template
        "flxEnrollSelectedAccountsSec":"flxEnrollSelectedAccountsSec",
        "flxAccountSectionCont":"flxAccountSectionCont",
        "flxLeftDetailsCont":"flxLeftDetailsCont",
        "lblFeatureName":"lblFeatureName",
        "flxToggleArrow":"flxToggleArrow",
        "lblIconToggleArrow":"lblIconToggleArrow",
        "flxHeadingCheckbox":"flxHeadingCheckbox",
        "imgTopCheckbox":"imgTopCheckbox",
        "flxRow2":"flxRow2",
        "lblAvailableActions":"lblAvailableActions",
        "lblCountActions":"lblCountActions",
        "lblTotalActions":"lblTotalActions",
        "lblSectionLine":"lblSectionLine",
        "lblStatusValue":"lblStatusValue",
        "lblIconStatus":"lblIconStatus",
        "flxHeaderContainer":"flxHeaderContainer",
        "flxActionsHeaderContainer":"flxActionsHeaderContainer",
        "flxCheckbox":"flxCheckbox",
        "flxActionNameHeading":"flxActionNameHeading",
        "flxActionCheckbox":"flxActionCheckbox",
        "lblActionName":"lblActionName",
        "flxActionStatusHeading":"flxActionStatusHeading",
        "lblActionStatus":"lblActionStatus",
        "lblActionSeperator":"lblActionSeperator",
        //row template
        "flxFeatureNameCont":"flxFeatureNameCont",
        "imgCheckbox":"imgCheckbox",
        "flxStatus":"flxStatus",
        "lblStatus":"lblStatus",
        "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
        "id":"id",
        "featureDetailsObj":"featureDetailsObj",
        "actionDetailsObj":"actionDetailsObj"
      };
      return widgetMap;
    },

    /* get the selected features/actions count in add facility features*/
    getSelectedFeatureActionCount : function(segData,imgCheckboxId,isSection){
      var selectedCount = 0;
      for(var i=0;i < segData.length; i++){
        var data = (isSection === true) ? segData[i][0] : segData[i];
        if(data[imgCheckboxId].src === CommonUtilities.AdminConsoleCommonUtils.checkboxSelected ||
           data[imgCheckboxId].src === CommonUtilities.AdminConsoleCommonUtils.checkboxPartial)
          selectedCount = selectedCount +1;
      }
      return (selectedCount+"");
    },

    /* set collapsed section properties */
    getCollapsedSectionProperties : function(sectionData){
      sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
      sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
      sectionData.flxActionsHeaderContainer.isVisible = false;
      sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"; 
      return sectionData;
    },

    /* set expanded section properties */
    getExpandedSectionProperties : function(sectionData){
      sectionData.lblIconToggleArrow.text = "\ue915"; //down-arrow
      sectionData.lblIconToggleArrow.skin = "sknIcon00000014px";
      sectionData.flxActionsHeaderContainer.isVisible = true;
      sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
      return sectionData;
    },

    /* show/hide rows under a section */
    showHideSegRowFlex : function(rowsData,visibility){
      for(var i=0;i<rowsData.length;i++){
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
        if(visibility === true && (i === rowsData.length-1)){
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
          rowsData[i].flxFeatureNameCont.bottom = "15dp";
        } else {
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
          rowsData[i].flxFeatureNameCont.bottom = "0dp";
        }
      }
      return rowsData;
    },

    /* Facility FEATURES: select all the features shown in list in add facility features */
    selectUnselectAllFeatures : function(option){
      if(option === "selectAll") {
        this.view.addFacility.lblUnselectAllFeatures.isVisible = true;
        this.view.addFacility.lblselectAllFeatures.isVisible = false;        
      } else {
        this.view.addFacility.lblUnselectAllFeatures.isVisible = false;
        this.view.addFacility.lblselectAllFeatures.isVisible = true;      
      }

      var segData = this.view.addFacility.segAddFacilityFeatures.data;
      var actualSegData = this.view.addFacility.segAddFacilityFeatures.info.segDataJson;
      for(var i=0; i< segData.length; i++){
        var actionRows = segData[i][1];
        if(option === "selectAll") {
          segData[i][0].imgTopCheckbox.src = CommonUtilities.AdminConsoleCommonUtils.checkboxSelected; 
          segData[i][0].lblCountActions.text = this.getTwoDigitNumber(actionRows.length);
        } else {
          segData[i][0].imgTopCheckbox.src = CommonUtilities.AdminConsoleCommonUtils.checkboxnormal; 
          segData[i][0].lblCountActions.text = this.getTwoDigitNumber(0);
        }

        var actualFeatureObj = actualSegData[segData[i][0].id];
        actualFeatureObj.secData = segData[i][0];
        var actualActions = actualFeatureObj.rowData;
        for(var j=0; j<actionRows.length; j++){
          if(option === "selectAll") {
            actionRows[j].imgCheckbox.src = CommonUtilities.AdminConsoleCommonUtils.checkboxSelected;
          } else {
            actionRows[j].imgCheckbox.src = CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
          }
          for(var k=0; k<actualActions.length; k++){
            if(actionRows[j].id === actualActions[k].id)
              actualActions[k] = Object.assign({},actionRows[j]);
          }
        }
        var featureSelected = this.editFacilityReqParam.facilities[0].features.find(feature => feature.featureId === segData[i][0].id);
        var isFeatureSelected = false;
        if(option === "selectAll") {
          featureSelected["isSelected"] = "true";
          featureSelected.actions.forEach(action => {
            if(action["show"] === "true")
              action["isSelected"] = "true";
          })
        } else {
          featureSelected["isSelected"] = "false";
          featureSelected.actions.forEach(action => {
            if(action["show"] === "true")
              action["isSelected"] = "false";
          })
        }

        featureSelected.actions.forEach(action => {
          if(action["isSelected"] === "true")
            isFeatureSelected = true;
        });
        (isFeatureSelected) ?
          featureSelected["isSelected"] = "true" :
        featureSelected["isSelected"] = "false";      

        this.view.addFacility.segAddFacilityFeatures.setSectionAt(segData[i],i);
        //actualSegData[segData[i][0].id] = {"secData":}
      }
      (option === "selectAll") ?
        this.view.addFacility.lblCountFeatures.text = this.getTwoDigitNumber(segData.length) :
      this.view.addFacility.lblCountFeatures.text = this.getTwoDigitNumber(0);
    },

    restrictSpecialCharactersFacilityName : function(widgetID) {
      var text = document.getElementById(widgetID);
      text.onkeypress = text.onpaste = this.checkFacilityNameContainSpecialChars;
    },

    checkFacilityNameContainSpecialChars: function(ev){
      var keynum;
      var text;
      var regex = /[+=\\\\|<>^*%$#()!.,`";:?]/;  
      if(ev.clipboardData){
        text = ev.clipboardData.getData("text");
        for (var i = 0; i < text.length; i++) {
          keynum = text.charAt(i);
          if(regex.test(keynum)){
            return false;
          }
        }
        return true;
      } else {
        if(window.event) { // IE                  
          keynum = ev.key;
        } else if(ev.which){ // Netscape/Firefox/Opera                 
          keynum = ev.which;
        }
        if(regex.test(keynum)){
          return false;
        }
        return true;
      }


    },

    clickEditOption: function() {
      this.presenter.getFacilityDetails(this.view.segFacilities.data[this.view.segFacilities.selectedRowIndex[1]].facilityId, "editFacility");
    },
    /* ########################### ADD FACILITY ##################################### END  */

    /* ########################### EDIT FACILITY ##################################### START  */
    prefillFacilityDataForEdit : function(features, context, code, facilityId, facilityName, description){
      //var index = this.view.segFacilities.selectedRowIndex;
      //var rowInd = index[1];
      //var rowData = this.view.segFacilities.data[rowInd];

      var features = features;
      if (context == "initOption") {
        return;
        features = [];
      } else {
        if(features.length !== 0){ 
          features = JSON.parse(JSON.stringify(features));
          features.forEach(feature => {          
            feature.actions.forEach(action => {
              action["show"] = "true";
            });
          });
        } else {
          features = JSON.parse(JSON.stringify(this.facilitiesListResponse[0].features));
          features.forEach(feature => {
            feature["isSelected"] = "false";
            feature.actions.forEach(action => {
              action["isSelected"] = "false";
              action["show"] = "true";
            })
          });
        }
      }
      this.editFacilityReqParam= {
        "facilities": [
          {
            "code": code, 
            "facilityId": facilityId,
            "facilityName": facilityName,
            "description": description,
            "features": features
          }
        ]}; //de creat dupa ce e creat call-ul in Fabric
      var inputReq = {};
      inputReq = {"context": "editFacility",
                  "requestParam": {"facilityId":facilityId }
                 };
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.EditFacility");
      this.view.addFacility.searchBoxAddProdFeatures.flxSearchCancel.setVisibility(false); 
      this.view.addFacility.tbxAddFacilityName.text=(facilityName && facilityName.length !== 0) ? facilityName : "";
      this.view.addFacility.lblFacilityNameTextCounter.text=this.view.addFacility.tbxAddFacilityName.text.length+"/50";
      this.view.addFacility.tbxAddFacilityCode.text=(code)?code:"NULL"; //API is removing code's value => for test purposes we'll add a default value when we open the record in EDIT mode
      this.view.addFacility.lblFacilityCodeTextCounter.text=(this.view.addFacility.tbxAddFacilityCode) ? this.view.addFacility.tbxAddFacilityCode.text.length+"/50" : "00/50";
      this.view.addFacility.txtAreaFacilityDescription.text=description;
      this.view.addFacility.lblFacilityDescTextCounter.text=(this.view.addFacility.txtAreaFacilityDescription.text && this.view.addFacility.txtAreaFacilityDescription.text !== 0) ? this.view.addFacility.txtAreaFacilityDescription.text.length+"/300" : "0/300";
      this.showAddFacilitiesBasicDetailsScreen(inputReq.context,features);
      this.facilityOption = inputReq.context;
      this.setFeaturesSegDataAddEditFacilityPage(this.editFacilityReqParam.facilities[0].features, this.facilityOption);
      this.view.forceLayout();
    },

    /* ########################### EDIT FACILITY ##################################### END  */
  };
});

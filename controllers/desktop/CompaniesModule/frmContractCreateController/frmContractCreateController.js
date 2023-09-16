define({
  formName:"frmContractCreate",
  segCountry : [],
  features : [],
  bulkUpdateListboxData: [],
  bulkUpdateAllFeaturesList : [],
  bulkUpdateAccLevelActions:[],
  completeContractDetails :[],
  AccountTrasactions : null,
  selectedServiceCard : null,
  selectedEntityCard : null,
  completeCompanyDetails :{},
  repeatedAccountsBulkUpdate:{},
  globalLevelPermissionsFeatures:{},
  accountLevelPermissionsViewFeatures:{},
  totalCombinedData:[],
  bulkUpdateList:{},
  searchFeatureOnEdit:{},
  accIdForByFeatures:{},
  setWidgetDataNoResult: [],
  ownershipFilterData :{},
  accountTypeFilterData:{},
  accountTypeFilter:{},
  permissionsViewFeatures:{},
  setTransactionLimits :{},
  accountsBulkUpdate:{},
  selectedSectionIndexFilter:{},
  contextViewAllFeaturePopup:{},
  contextViewPortfolioFeaturePopup:{},
  searchViewFeaturePopupData:{},
  setViewFeaturePopupSegData:{},
  setFilterDataForPortfolioFeature:[],
  setFilterDataForAllFeature:[],
  setAllDataToViewFeature:[],
  accountsUnlinkPayload : {},
  monetaryLimits : {},
  initialFeaturesJson : {},
  recordsSize : 20,
  paginationDetails:{
    currSegContractData:[],
    currSegSignatoryGroupData:[]
  },  
  actionConfig: {
    create: "CREATE",
    edit: "EDIT"
  },
  action:"CREATE",
  viewContractServiceDef :[],
  prevIndex:-1,
  maxCustomersCount : -1,
  limitId :{
    PRE_APPROVED_DAILY_LIMIT:"PRE_APPROVED_DAILY_LIMIT",
    AUTO_DENIED_DAILY_LIMIT:"AUTO_DENIED_DAILY_LIMIT",
    PRE_APPROVED_WEEKLY_LIMIT:"PRE_APPROVED_WEEKLY_LIMIT",
    AUTO_DENIED_WEEKLY_LIMIT:"AUTO_DENIED_WEEKLY_LIMIT",
    PRE_APPROVED_TRANSACTION_LIMIT:"PRE_APPROVED_TRANSACTION_LIMIT",
    AUTO_DENIED_TRANSACTION_LIMIT:"AUTO_DENIED_TRANSACTION_LIMIT",
    WEEKLY_LIMIT:"WEEKLY_LIMIT",
    MAX_TRANSACTION_LIMIT:"MAX_TRANSACTION_LIMIT",
    DAILY_LIMIT:"DAILY_LIMIT"
  },
  recentContractDetails :{
    "contractName" : "",
    "contractId" : "",
    "contractServiceDef" : "",
    "contractServiceDefId" : "",
    "roles" : [],
    "customers" : [],
    "contractUsers" : []
  },
  baseCurrencyFormat: "USD",
  willUpdateUI: function (context) {
    this.updateLeftMenu(context);
    if(context){
      if(context.action === "getAllFeatures"){
        this.getAllFeatures(context.features);
      }else if(context.action === "createCustomer"){
        //this.hideRequiredMainScreens(this.view.flxCompanyDetails);
        if(context.features) 
          this.getAllFeatures(context.features);
        //this.getCompanyCustomers(context.id,this.setCompanyCustomers);
        //this.backToCompanyDetails(this.tabsConfig.businessUsers);
      }else if (context.action === "hideLoadingScreen") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        if(this.view.flxLoading2.isVisible)
          this.view.flxLoading2.setVisibility(false);
      }else if (context.contractCustomers) {
        this.contractCustomersCallBack(context);
      }else if(context.customerSearch){
        this.customerSearchCallBack(context.customerSearch);
      }else if(context.AllEligibleRelationalCustomersError){
        this.coreRelativeCustomersErrorCallBack(context.AllEligibleRelationalCustomersError)
      }else if(context.serviceDefinitionRoles){
        this.serviceDefinitionRolesCallBack(context.serviceDefinitionRoles, context.featuresPerAccount);
      }else if(context.serviceDefRoles){
        this.recentContractDetails.roles = context.serviceDefRoles
      }else if (context.loadingScreen) {
        if (context.loadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }else if (context.toastMessage) {
        if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(context.toastMessage.message, this);
        } else if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
          this.view.toastMessage.showErrorToastMessage(context.toastMessage.message, this);
          if(this.view.flxLoading2.isVisible === true) {
            this.view.flxLoading2.setVisibility(false);
          }
        }
      }else if(context.searchData) {
        this.setDatatoSearchSegment(context.searchData.contracts);
      } else if(context.action === "createContractClick"){
        this.onCreateContractClick();
      } else if(context.action === "editContractClick"){
        this.completeContractDetails = context.completeContractDetails;
        this.completeCompanyDetails = context.completeCompanyDetails;
        kony.adminConsole.utils.showProgressBar(this.view); 
        this.getCountrySegmentData();
        var timeFunc = setTimeout(this.onEditContractClick,0);
      } else if(context.action === "contractFeatureActionLimits"){
        // method to set the users from the above data which is used for features and action
        let resData = [];
        this.completeCompanyDetails.accountsFeatures = context.contractDetails.accountsFeatures ? JSON.parse(JSON.stringify(context.contractDetails.accountsFeatures)) : [];
        this.globalLevelPermissionsFeatures = JSON.parse(this.completeCompanyDetails.accountsFeatures.globalLevelPermissions);
  	    this.storeIntialContractFeatures(this.globalLevelPermissionsFeatures);
          this.accountLevelPermissionsViewFeatures =  JSON.parse(this.completeCompanyDetails.accountsFeatures.accountLevelPermissions);
          this.setTransactionLimits = JSON.parse(this.completeCompanyDetails.accountsFeatures.transactionLimits);
        this.setEditContractFeaturesLimits();

      }else if(context.coreCustomerSearch){
        this.view.btnBackToMain.info=context.coreCustomerSearch;
        this.setCoreCustomersList(context.coreCustomerSearch);
      }else if(context.coreRelatedCustomers){
        this.setSelectedCustomerData(context.coreRelatedCustomers,context.coreCustomerId);
      }
        else if(context.companyLegalUnits){  
          var LEData=this.getLEListForFormAction("frmContractCreate",'CREATE');
          this.view.flxEntitySearch.info=LEData;
          this.legalEntityCardset(LEData);
           //this.view.flxEntitySearch.info=context.companyLegalUnits;
	       //this.legalEntityCardset(context.companyLegalUnits);
        }
	        else if(context.serviceDefinitions){
        //this.setContractServiceCards(context.serviceDefinitions);
        //this.setDataToServiceTypeFilter(context.serviceDefinitions);
        //this.view.flxContractServiceCards.info={"totalRecords":context.serviceDefinitions,"filteredRecords":context.serviceDefinitions};
        if(context.option === 1){ // for contract landing screen
          this.viewContractServiceDef = context.serviceDefinitions;
          //this.setServiceTypeStatusData(this.viewContractServiceDef);
          //this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex=null;
        } else{ //for crete/edit screens
          this.setContractServiceCards(context.serviceDefinitions);
          this.setDataToServiceTypeFilter(context.serviceDefinitions);
          this.view.flxContractServiceCards.info={"totalRecords":context.serviceDefinitions,"filteredRecords":context.serviceDefinitions};
        }
        var legalEntityId = context.serviceDefinitions[0].legalEntityId;
        var legalEntity = this.getLEDesc(legalEntityId);
        this.defaultCurrencyCodeSymbol = this.defaultCurrencyCode(legalEntity[0].baseCurrency, true);
        this.currencyValue = this.defaultCurrencyCode(legalEntity[0].baseCurrency, true);                
      }else if(context.ServiceDefinitionRecords){

        this.viewContractServiceDef = context.ServiceDefinitionRecords;
        // this.setServiceDefType();

        this.setServiceTypeStatusData(this.viewContractServiceDef);

        //this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex=null;
      }
      else if(context.coreCustomerAccounts){
        this.setContractAccountsData(context.coreCustomerAccounts);
      }else if(context.serviceDefinitionFeatures){
        this.bulkUpdateAllFeaturesList =context.serviceDefinitionFeatures;
      }else if(context.serviceDefinitionFeaturesLimits){
        this.setServiceDefinitionFAData(context.serviceDefinitionFeaturesLimits);
      }else if(context.serviceDefinitionMonetaryActions){
        this.setGlobalMonetaryActions(context.serviceDefinitionMonetaryActions.limits);
      }else if(context.accountLvlFeatureActions){
        this.setContractAccountLvlFeaturesData(context.accountLvlFeatureActions);
      }else if(context.createContractSuccess){
        this.createEditContractSuccess(context.createContractSuccess);
      }else if(context.editContractSuccess){
        this.createEditContractSuccess(context.editContractSuccess);
      }
      else if(context.customerStatusList){
        this.setCustomerStatusData(context.customerStatusList.value);
      }else if(context.autoSyncAccountsFlag){
        this.autoSyncAccountsFlag=context.autoSyncAccountsFlag.value==="IMPLICIT"?"true":"false";
      }    
    }
  },
  contractCreatePreshow: function(){
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setFlowActions();
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
    this.view.flxDropdown.setVisibility(false);
    this.view.flxCustomerSearchPopUp.setVisibility(false);
    this.presenter.getLegalEntities({}, this.formName);
    this.baseCurrencyFormat = this.getBaseCurrencyFormat();
    var PhoneNumMax = Number(kony.adminConsole.utils.clientProperties.PHONE_NUMBER_MAX_LENGTH);
    var PhoneNumMin = Number(kony.adminConsole.utils.clientProperties.PHONE_NUMBER_LENGTH);
    //   this.view.textBoxSearchContactNumber.txtContactNumber.maxTextLength = PhoneNumMax;
    this.view.textBoxEntry21.txtContactNumber.maxTextLength = PhoneNumMax;
    this.legalEntityPreshow();
  },
  setFlowActions : function(){
    var scopeObj = this;
//     this.view.ContractAccountsList.flxArrow.onClick=function(){
//       scopeObj.toggleSegmentSecArrow(this.view.ContractAccountsList.segAccountFeatures, event)
//     };
    this.view.contractDetailsPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxContractDetailsPopup.setVisibility(false);
      if(scopeObj.view.contractDetailsPopup.flxBackOption.isVisible)
        scopeObj.view.flxCustomerSearchPopUp.setVisibility(true);
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      if(scopeObj.view.breadcrumbs.btnBackToMain.text === kony.i18n.getLocalizedString("i18n.frmCompanies.SearchContract") ||
         scopeObj.view.breadcrumbs.btnBackToMain.text === "CONTRACTS"){
        scopeObj.presenter.navigateToSearchScreen({"action":"breadCrumb"});
      }else{
        scopeObj.backToCompanyDetails(1);
      }
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.presenter.showCompaniesForm({"action":"editCancel"});
    };
    // Entity Search
    this.view.tbxEntitySearch.onKeyUp = function(){
      if(scopeObj.view.tbxEntitySearch.text.trim().length!==0){
        scopeObj.view.flxClearEntitySearch.setVisibility(true);
        scopeObj.searchEntityCards();
      }else{
        scopeObj.view.flxNoServiceSearchResults.setVisibility(false);
        scopeObj.view.flxLegalEntityCards.setVisibility(true);
        scopeObj.legalEntityCardset(scopeObj.view.flxEntitySearch.info);
        scopeObj.view.flxClearEntitySearch.setVisibility(false);
      }
    };
    
    this.view.flxClearEntitySearch.onClick = function(){
      scopeObj.view.flxNoServiceSearchResults.setVisibility(false);
      scopeObj.view.flxLegalEntityCards.setVisibility(true);
      scopeObj.legalEntityCardset(scopeObj.view.flxEntitySearch.info);
      scopeObj.view.tbxEntitySearch.text="";
      scopeObj.view.flxClearEntitySearch.setVisibility(false);
    }
    // contracts actions
    this.view.tbxRecordsSearch.onKeyUp = function(){
      if(scopeObj.view.tbxRecordsSearch.text.trim().length!==0){
        scopeObj.view.flxClearRecordsSearch.setVisibility(true);
        scopeObj.searchServiceCards();
      }else{
        scopeObj.view.flxNoServiceSearchResults.setVisibility(false);
        scopeObj.view.flxContractServiceCards.setVisibility(true);
        scopeObj.view.flxClearRecordsSearch.setVisibility(false);
        if(scopeObj.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices.length===scopeObj.view.serviceTypeFilterMenu.segStatusFilterDropdown.data.length)
          scopeObj.setContractServiceCards(scopeObj.view.flxContractServiceCards.info.totalRecords,true);
        else{
          scopeObj.performServiceTypeFilter();
        }
      }      
    };
    this.view.flxClearRecordsSearch.onClick = function(){
      scopeObj.view.flxNoServiceSearchResults.setVisibility(false);
      scopeObj.view.flxContractServiceCards.setVisibility(true);
      scopeObj.view.tbxRecordsSearch.text="";
      scopeObj.setContractServiceCards(scopeObj.view.flxContractServiceCards.info.totalRecords,true);
      scopeObj.view.flxClearRecordsSearch.setVisibility(false);
    };
    this.view.flxServiceFilter.onClick = function(){
      scopeObj.view.flxServiceTypeFilter.setVisibility(!scopeObj.view.flxServiceTypeFilter.isVisible);
    };
    this.view.serviceTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performServiceTypeFilter();
    };
    this.view.accountTypesFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var filteredData=scopeObj.performAccountOwnerFilters();
      scopeObj.setAccountsDataCustomers(filteredData);
    };
    this.view.ownershipFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var filteredData=scopeObj.performAccountOwnerFilters();
      scopeObj.setAccountsDataCustomers(filteredData);
    };
    this.view.tbxAccountsSearch.onKeyUp = function(){
      if(scopeObj.view.tbxAccountsSearch.text.trim().length!==0){
        scopeObj.view.flxClearAccountsSearch.setVisibility(true);
        scopeObj.setCustSelectedData("customersDropdown",true);
      }else{
        scopeObj.view.flxClearAccountsSearch.setVisibility(false);
        scopeObj.setCustSelectedData("customersDropdown",false);
      }      
    };
    this.view.flxClearAccountsSearch.onClick = function(){
      scopeObj.view.tbxAccountsSearch.text="";
      scopeObj.setCustSelectedData("customersDropdown",false);
      scopeObj.view.flxClearAccountsSearch.setVisibility(false);
    };
    const debounce = function(func, delay) {
      var self = this;
      let timer;
      return function() {
        let context = self,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          func.apply(context, args);
        }, delay);
      };
    };
    //Adding timer for featres search as the features&actions count is large
    const searchContractFeaturesList = function () {
      scopeObj.setCustSelectedData("customersDropdownFA",true);
    };
    const searchContractFeatures = debounce(searchContractFeaturesList,300);
        this.view.tbxContractFASearch.onKeyUp = function(){
      if(scopeObj.view.tbxContractFASearch.text.trim().length!==0){
        scopeObj.view.flxClearContractFASearch.setVisibility(true);
        if(scopeObj.view.toggleContractButtonsFeatures.info.selectedTab === 1){
           searchContractFeatures();
        } else if (scopeObj.view.flxContractAccountFAList.isVisible === true){
          scopeObj.searchFilterForAccountsBulk(scopeObj.view.segContractPortfolio, 1);
		}
       else{
        scopeObj.searchFAContractsByAccounts(scopeObj.searchFeatureOnEdit,scopeObj.accIdForByFeatures);
        }
      }else{
       if(scopeObj.view.toggleContractButtonsFeatures.info.selectedTab === 1){
         scopeObj.view.flxClearContractFASearch.setVisibility(false);
         scopeObj.view.flxNoCustomerSelectedFA.setVisibility(false);
         searchContractFeatures();
       }else{
        scopeObj.view.flxClearContractFASearch.setVisibility(false);
        scopeObj.view.flxNoCustomerSelectedFA.setVisibility(false);
       if(scopeObj.view.accountTypeFilter==="selectFeature" && scopeObj.view.flxContractAccountFAList.isVisible===false){
          scopeObj.searchFAContractsByAccounts(scopeObj.searchFeatureOnEdit,scopeObj.accIdForByFeatures);
       }
    else{   
          scopeObj.toggleContractFeaturesAccountLevel();
         }
       }
      }
    };
     this.view.flxClearContractFASearch.onClick = function() {
           scopeObj.view.tbxContractFASearch.text = "";
            if(scopeObj.view.toggleContractButtonsFeatures.info.selectedTab == 2)
            if (scopeObj.view.accountTypeFilter === "selectFeature" && scopeObj.view.flxContractAccountFAList.isVisible === false) {
               scopeObj.searchFAContractsByAccounts(scopeObj.searchFeatureOnEdit, scopeObj.accIdForByFeatures);
             } else 
            {   scopeObj.view.flxNoCustomerSelectedFA.setVisibility(false);
                scopeObj.toggleContractFeaturesAccountLevel();
            }
            else{
            scopeObj.setCustSelectedData("customersDropdownFA", false);
            }
            scopeObj.view.flxClearContractFASearch.setVisibility(false);
        };
    this.view.filterMenu1.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchFilterForAccountsBulk(scopeObj.view.segContractPortfolio, 1);
    };
    this.view.filterMenu2.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchFilterForAccountsBulk(scopeObj.view.segContractPortfolio, 1);
    };
    this.view.tbxContractLimitsSearch.onKeyUp = function(){
      if(scopeObj.view.tbxContractLimitsSearch.text.trim().length!==0){
        scopeObj.view.flxClearContractLimitsSearch.setVisibility(true);
        scopeObj.setCustSelectedData("customersDropdownLimits",true);
      }else{
        scopeObj.view.flxClearContractLimitsSearch.setVisibility(false);
        scopeObj.setCustSelectedData("customersDropdownLimits",false);
      }      
    };
    this.view.flxClearContractLimitsSearch.onClick = function(){
      scopeObj.view.tbxContractLimitsSearch.text="";
      scopeObj.setCustSelectedData("customersDropdownLimits",false);
      scopeObj.view.flxClearContractLimitsSearch.setVisibility(false);
    };
    this.view.commonButtonsServiceDetails.btnSave.onClick = function(){
      scopeObj.showContractCustomersScreen(true);
    };
    this.view.commonButtonsServiceDetails.btnCancel.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateToSearchScreen({"action":"createCancel"});
      }else{
        scopeObj.presenter.showCompaniesForm({"action":"editCancel"});
      }
    };
    this.view.btnSearchContractCustomers.onClick = function(){
      scopeObj.showCustomerSearchPopup(true);
    };
    this.view.btnSelectCustomers.onClick = function(){
      scopeObj.showCustomerSearchPopup(false);
    };
    this.view.flxRightImage.onClick = function(){
      scopeObj.revertAddedCustomers();
      scopeObj.view.flxCustomerSearchPopUp.setVisibility(false);
    };
    this.view.commonButtonsCustomers.btnNext.onClick = function(){
      scopeObj.showContractDetailsScreen(true);
    };
    this.view.commonButtonsCustomers.btnCancel.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateToSearchScreen({"action":"createCancel"});
      }else{
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.showCompaniesForm({"action":"editCancel"});
      }
    };
    this.view.commonButtonsCustomers.btnSave.onClick = function(){
      scopeObj.createContract();
    };
    this.view.contractDetailsCommonButtons.btnNext.onClick = function(){
      if(scopeObj.validateContractDetails()){
        scopeObj.showContractAccountsScreen(true);
      }
    };
    this.view.contractDetailsEntry1.tbxEnterValue.onKeyUp = function(){
      if(scopeObj.view.contractDetailsEntry1.flxInlineError.isVisible){
        scopeObj.view.contractDetailsEntry1.tbxEnterValue.skin="sknflxEnterValueNormal";
        scopeObj.view.contractDetailsEntry1.flxInlineError.setVisibility(false);
      }
    };
    this.view.commonButtonsContractAccounts.btnNext.onClick = function(){
      scopeObj.showContractFAScreen(true);
    };
    this.view.commonButtonsContractFA.btnNext.onClick = function(){
      scopeObj.showContractLimitsScreen(true);
    };
    this.view.contractDetailsCommonButtons.btnSave.onClick = function(){
      if(scopeObj.validateContractDetails()){
        scopeObj.createContract();
      }
    };
    this.view.commonButtonsContractAccounts.btnSave.onClick = function(){
      scopeObj.createContract();
    };
    this.view.commonButtonsContractFA.btnSave.onClick = function(){
      scopeObj.createContract();
    };
    this.view.commonButtonsContractLimits.btnSave.onClick = function(){
      if(scopeObj.validateAllLimits())
        scopeObj.createContract();
    };
    this.view.contractDetailsCommonButtons.btnCancel.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateToSearchScreen({"action":"createCancel"});
      }else{
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.navigateToContractScreen({"action":"editCancel"});
      }
    };
    this.view.commonButtonsContractAccounts.btnCancel.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateToSearchScreen({"action":"createCancel"});
      }else{
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.navigateToContractScreen({"action":"editCancel"});
      }
    };
    this.view.commonButtonsContractFA.btnCancel.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateToSearchScreen({"action":"createCancel"});
      }else{
        scopeObj.presenter.navigateToContractScreen({"action":"editCancel"});
      }
    };
    this.view.commonButtonsContractLimits.btnCancel.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateToSearchScreen({"action":"createCancel"});
      }else{
        scopeObj.presenter.navigateToContractScreen({"action":"editCancel"});
      }
    };
    this.view.verticalTabsContract.btnOption0.onClick = function(){
      scopeObj.showContractServiceScreen();
    };
    this.view.verticalTabsContract.btnOption1.onClick = function(){
      if(scopeObj.isValidSelection())
        scopeObj.showContractCustomersScreen(false);
    };
    this.view.verticalTabsContract.btnOption2.onClick = function(){
      if(scopeObj.isValidSelection())
        scopeObj.showContractDetailsScreen(false);
    };
    this.view.verticalTabsContract.btnOption3.onClick = function(){
      if(scopeObj.isValidSelection())
        scopeObj.showContractAccountsScreen(false);
    };
    this.view.verticalTabsContract.btnOption4.onClick = function(){
      if(scopeObj.isValidSelection())
      	scopeObj.showContractFAScreen(false);
      scopeObj.view.toggleContractButtonsFeatures.info.selectedTab =1;
      scopeObj.view.toggleContractButtonsFeatures.btnToggleLeft.skin="sknBtnBgE5F0F9Br006CCAFn0069cdSemiBold12pxLeftRnd";
	 scopeObj.view.toggleContractButtonsFeatures.btnToggleRight.skin="sknBtnBgFFFFFFBrD7D9E0Fn485C75Reg12pxRightRnd";
    };
    this.view.verticalTabsContract.btnOption5.onClick = function(){
      if(scopeObj.isValidSelection())
        scopeObj.showContractLimitsScreen(false);
    };
    this.view.btnUpdateInBulkFA.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info="FA";
      //scopeObj.showBulkUpdatePopup();
      scopeObj.showBulkUpdateFAScreen();
    };
    this.view.btnUpdateInBulkLimits.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info="Limits";
      scopeObj.showBulkUpdatePopup();
    };
    this.view.commonButtonsScreen2.btnCancel.onClick = function(){
      scopeObj.view.flxAddProductFeaturesBack.setVisibility(false);
      scopeObj.view.flxContractsFATopSection.setVisibility(true);
      scopeObj.view.flxFABulkUpdateScreen.setVisibility(false);
      if(scopeObj.view.btnUpdateInBulkFA.info==="CUSTLVL"){
        scopeObj.view.flxContractFAList.setVisibility(true);
      }else{
        scopeObj.view.flxContractAccountFAList.setVisibility(true);
      }
    };
    this.view.commonButtonsScreen2.btnSave.onClick = function(){
      if(scopeObj.validateBulkSelection(1))
        scopeObj.updateFeaturesBulkChanges();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave.onClick = function(){
      scopeObj.showBulkUpdatePopupScreen2();
    };
    this.view.btnModifySearch.onClick = function(){
      scopeObj.showBulkUpdatePopup();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnCancel.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnSave.onClick = function(){
      if(scopeObj.validateBulkSelection(2))
      scopeObj.updateLimitsBulkChanges();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnCancel.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    };
    this.view.btnShowHideAdvSearch.onClick = function(){
      if(scopeObj.view.flxRow2.isVisible){
        scopeObj.view.btnShowHideAdvSearch.text="Advanced Search";
        scopeObj.view.fonticonrightarrowSearch.text="";//right arrow
        scopeObj.view.flxColumn13.setVisibility(false);
        scopeObj.view.flxRow2.setVisibility(false);
        scopeObj.view.flxRow3.setVisibility(false);
      }else{
        scopeObj.view.btnShowHideAdvSearch.text="Hide Advanced Search";
        scopeObj.view.fonticonrightarrowSearch.text="";//up arrow
        scopeObj.view.flxColumn13.setVisibility(true);
        scopeObj.view.flxRow2.setVisibility(true);
        scopeObj.view.flxRow3.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.btnSearchCustomers.onClick = function(){
      if(scopeObj.validateCoreCustSearch()){
        scopeObj.setNormalSkinToCoreSearch();
        scopeObj.searchCoreCustomers();
      }
    };
    this.view.btnClearAll.onClick = function(){
      scopeObj.resetCoreCustomerSearch();
    };
    this.view.flxSelectedCustomersArrow.onClick = function(){
      if(scopeObj.view.flxSearchFilter.isVisible){
        scopeObj.view.lblIconArrow.text="";
        scopeObj.view.flxSearchFilter.setVisibility(false);
      }else{
        scopeObj.view.flxSearchFilter.setVisibility(true);
        scopeObj.view.lblIconArrow.text="";
      }
    };
    //customer search popup button actions
    this.view.commonButtons.btnNext.onClick = function(){
      //add tags and back to search page navigation
      scopeObj.view.commonButtons.btnNext.setVisibility(false);
      scopeObj.view.flxCustomerSearchHeader.setVisibility(true);
      scopeObj.view.flxCustomersBreadcrumb.setVisibility(false);
      scopeObj.view.flxCustomerAdvSearch.setVisibility(true);
      scopeObj.view.flxCustomerDetailsContainer.setVisibility(true);
      scopeObj.view.flxSelectedCustomerInfo.setVisibility(false);
      scopeObj.view.lblNoCustomersSearched.text="Search for a Customer to see the results";
      scopeObj.view.flxNoCustomersSearched.setVisibility(true);
      scopeObj.view.lblRelatedcustSubHeading.setVisibility(false);
      scopeObj.view.flxRelatedCustomerSegment.setVisibility(false);
      scopeObj.view.flxSearchFilter.setVisibility(true);
      scopeObj.view.lblIconArrow.text="";
      scopeObj.view.flxSearchBreadcrumb.info.added=[];
      var i=scopeObj.view.flxSearchBreadcrumb.widgets().concat([]);
      scopeObj.view.segBreadcrumbs.setData([]);
      for(var x=2;x<i.length-1;x++)
        scopeObj.view.flxSearchBreadcrumb.remove(i[x]);
      scopeObj.resetCoreCustomerSearch();
    };
    this.view.commonButtons.btnSave.onClick = function(){
      scopeObj.view.flxCustomerSearchPopUp.setVisibility(false);
      scopeObj.view.flxNoCustomersAdded.setVisibility(false);
      scopeObj.view.segAddedCustomers.setVisibility(true);
      if(scopeObj.view.btnSelectCustomers.isVisible){
        scopeObj.setAddedCustDataInRequest();
      }
      else
        scopeObj.view.btnSelectCustomers.setVisibility(true);
      scopeObj.setSelectedCustomersData();
    };
    this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.revertAddedCustomers();
      scopeObj.view.flxCustomerSearchPopUp.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.flxArrow.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(!scopeObj.view.bulkUpdateFeaturesLimitsPopup.isVisible);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.btnModifySearch.onClick = function(){
      scopeObj.showBulkUpdatePopupScreen1(true);
    };
    this.view.btnBackToMain.onClick = function(){
      scopeObj.view.commonButtons.btnNext.setVisibility(false);
      scopeObj.view.flxCustomerSearchHeader.setVisibility(true);
      scopeObj.view.flxCustomersBreadcrumb.setVisibility(false);
      scopeObj.view.flxAddedCustomerInfo.setVisibility(false);
      scopeObj.view.flxCustomerAdvSearch.setVisibility(true);
      scopeObj.view.btnShowHideAdvSearch.text="Show Advanced Search";
      scopeObj.view.flxRow2.setVisibility(false);
      scopeObj.view.flxRow3.setVisibility(false);
      scopeObj.view.flxColumn13.setVisibility(false);
      scopeObj.view.flxCustomerDetailsContainer.setVisibility(true);
      scopeObj.view.flxSearchFilter.removeAll();
      scopeObj.setCoreCustomersList(scopeObj.view.btnBackToMain.info);
      scopeObj.view.flxSearchBreadcrumb.info.added=[];
      scopeObj.view.segBreadcrumbs.setData([]);
      var i=scopeObj.view.flxSearchBreadcrumb.widgets();
      var addedCust=0;
      for(let x=0;x<i.length;x++){
        if(i[x].id.indexOf("btnBackToMain")>=0)//dynamically created buttons
          addedCust++;
      }
      scopeObj.selectedCustomers.splice(scopeObj.selectedCustomers.length-addedCust,scopeObj.selectedCustomers.length);
      scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtons.btnSave,true,false);
      scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtons.btnNext,false,false);
    };
    this.view.ContractLimitsList.btnReset.onClick = function(){
      scopeObj.showResetAllLimitsPopup();
    };
    this.view.flxCheckboxCustomerInfo.onClick = function(){
      var custId=scopeObj.view.lblDataInfo11.text;
      var custIndex=0;
      var tags=scopeObj.view.flxSearchFilter.widgets();
      for(var k=0;k<scopeObj.selectedCustomers.length;k++){
        if(scopeObj.selectedCustomers[k].coreCustomerId===custId){
          custIndex=k;
          break;
        }
      }
      if(scopeObj.view.lblCheckbox.text===scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl){
        scopeObj.view.lblCheckbox.text=scopeObj.AdminConsoleCommonUtils.checkboxnormallbl;
        scopeObj.view.lblCheckbox.skin = scopeObj.applyCheckboxSkin(scopeObj.view.lblCheckbox);
        scopeObj.selectedCustomers[custIndex].isSelected=false;
        scopeObj.removeTag(scopeObj.view.flxSearchFilter,custId);
        if(tags.length===1){
          scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtons.btnSave,true,false);
          scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtons.btnNext,false,false);
        }
      }else{
        scopeObj.view.lblCheckbox.text=scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl;
        scopeObj.view.lblCheckbox.skin = scopeObj.applyCheckboxSkin(scopeObj.view.lblCheckbox);
        scopeObj.selectedCustomers[custIndex].isSelected=true;
        scopeObj.addCustomerTag(scopeObj.view.flxSearchFilter,scopeObj.selectedCustomers[custIndex].coreCustomerName,scopeObj.selectedCustomers[custIndex].coreCustomerId);
        scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtons.btnSave,true,true);
        scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtons.btnNext,false,true);
      }
    };
    this.view.textBoxEntry11.tbxEnterValue.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.textBoxEntry13.tbxEnterValue.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.textBoxEntry21.txtContactNumber.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.textBoxEntry21.txtISDCode.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.textBoxEntry31.tbxEnterValue.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.textBoxEntry32.tbxEnterValue.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.textBoxEntry33.tbxEnterValue.onBeginEditing  =function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
    };
    this.view.flxDropDown23.onClick = function(){
      if(scopeObj.view.flxDropDownDetail23.isVisible)
        scopeObj.view.flxDropDownDetail23.setVisibility(false);
      else{
        scopeObj.view.AdvancedSearchDropDown01.flxSearchCancel.onClick();
        scopeObj.view.flxDropDownDetail23.setVisibility(true);
      }
    };
    this.view.AdvancedSearchDropDown01.sgmentData.onRowClick = function(){
      if(scopeObj.view.lblCustomerSearchError.isVisible)
        scopeObj.setNormalSkinToCoreSearch();
      var rowInd=scopeObj.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex[1];
      var segData=scopeObj.view.AdvancedSearchDropDown01.sgmentData.data;
      scopeObj.view.lblSelectedRows.text=segData[rowInd].lblDescription;
      scopeObj.view.flxDropDownDetail23.setVisibility(false);
      scopeObj.view.forceLayout();
    };

    this.view.customersDropdown.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.customersDropdown.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.customersDropdown.flxClearSearchImage.setVisibility(true);
        scopeObj.searchCustomersDropDownList("customersDropdown");
      }else{
        scopeObj.view.customersDropdown.flxClearSearchImage.setVisibility(false);
        scopeObj.view.customersDropdown.flxNoResult.setVisibility(false);
        scopeObj.view.customersDropdown.segList.setVisibility(true);
        scopeObj.setCustomersDropDownList("customersDropdown");
        scopeObj.view.customersDropdown.flxSegmentList.setVisibility(true);
      }  
    };
    this.view.customersDropdown.flxClearSearchImage.onClick = function(){
      scopeObj.view.customersDropdown.tbxSearchBox.text="";
      scopeObj.setCustomersDropDownList("customersDropdown");
      scopeObj.view.customersDropdown.flxNoResult.setVisibility(false);
      scopeObj.view.customersDropdown.segList.setVisibility(true);
      scopeObj.view.customersDropdown.flxClearSearchImage.setVisibility(false);
      scopeObj.view.customersDropdown.flxSegmentList.setVisibility(true);
    };    
    this.view.customersDropdownFA.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.customersDropdownFA.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.customersDropdownFA.flxClearSearchImage.setVisibility(true);
        scopeObj.searchCustomersDropDownList("customersDropdownFA");
      }else{
        scopeObj.view.customersDropdownFA.flxClearSearchImage.setVisibility(false);
        scopeObj.view.customersDropdownFA.flxNoResult.setVisibility(false);
        scopeObj.view.customersDropdownFA.segList.setVisibility(true);
        scopeObj.setCustomersDropDownList("customersDropdownFA");
        scopeObj.view.customersDropdownFA.flxSegmentList.setVisibility(true);
      }  
    };
    this.view.customersDropdownFA.flxClearSearchImage.onClick = function(){
      scopeObj.view.customersDropdownFA.tbxSearchBox.text="";
      scopeObj.setCustomersDropDownList("customersDropdownFA");
      scopeObj.view.customersDropdownFA.flxNoResult.setVisibility(false);
      scopeObj.view.customersDropdownFA.segList.setVisibility(true);
      scopeObj.view.customersDropdownFA.flxClearSearchImage.setVisibility(false);
      scopeObj.view.customersDropdownFA.flxSegmentList.setVisibility(true);
    };
    this.view.customersDropdownLimits.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.customersDropdownLimits.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.customersDropdownLimits.flxClearSearchImage.setVisibility(true);
        scopeObj.searchCustomersDropDownList("customersDropdownLimits");
      }else{
        scopeObj.view.customersDropdownLimits.flxClearSearchImage.setVisibility(false);
        scopeObj.view.customersDropdownLimits.flxNoResult.setVisibility(false);
        scopeObj.view.customersDropdownLimits.segList.setVisibility(true);
        scopeObj.setCustomersDropDownList("customersDropdownLimits");
        scopeObj.view.customersDropdownLimits.flxSegmentList.setVisibility(true);
      }  
    };
    this.view.customersDropdownLimits.flxClearSearchImage.onClick = function(){
      scopeObj.view.customersDropdownLimits.tbxSearchBox.text="";
      scopeObj.setCustomersDropDownList("customersDropdownLimits");
      scopeObj.view.customersDropdownLimits.flxNoResult.setVisibility(false);
      scopeObj.view.customersDropdownLimits.segList.setVisibility(true);
      scopeObj.view.customersDropdownLimits.flxClearSearchImage.setVisibility(false);
      scopeObj.view.customersDropdownLimits.flxSegmentList.setVisibility(true);
    };
    this.view.contractDetailsPopup.flxBackOption.onClick = function(){
      scopeObj.view.flxCustomerSearchPopUp.setVisibility(true);
      scopeObj.view.flxContractDetailsPopup.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.onClick = function(){
      if(scopeObj.view.flxContractFA.isVisible){
        scopeObj.addNewFeatureRowBulkUpdate();
      } else{
        scopeObj.addNewLimitRowBulkUpdate();
      } 
    };
	this.view.btnAddNewRow.onClick = function(){
        scopeObj.addNewFeatureRowBulkUpdate(); 
    };
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton1.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateAddNewFeatureRow.customRadioButtonGroupCont.imgRadioButton1.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton2.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateAddNewFeatureRow.customRadioButtonGroupCont.imgRadioButton2.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
     this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton3.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.typeHeadContractCountry.tbxSearchKey.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.typeHeadContractCountry.tbxSearchKey, scopeObj.view.flxNoContractCountry, 1);
      scopeObj.view.typeHeadContractCountry.tbxSearchKey.info.isValid = false;
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadContractCountry);
      scopeObj.searchForAddress(scopeObj.view.typeHeadContractCountry.tbxSearchKey, scopeObj.view.typeHeadContractCountry.segSearchResult, scopeObj.view.typeHeadContractCountry.flxNoResultFound, 1);
      if(scopeObj.view.flxNoContractCountry.isVisible){
        scopeObj.view.flxNoContractCountry.isVisible = false;
        scopeObj.view.typeHeadContractCountry.tbxSearchKey.skin = "skntbxLato35475f14px";
      }
    };
    this.view.typeHeadContractCountry.tbxSearchKey.onEndEditing = function(){
      if (scopeObj.view.typeHeadContractCountry.flxNoResultFound.isVisible) {
        scopeObj.view.typeHeadContractCountry.flxNoResultFound.setVisibility(false);
      }
    };
    this.view.typeHeadContractCountry.segSearchResult.onRowClick = function(){
      scopeObj.assingText(scopeObj.view.typeHeadContractCountry.segSearchResult, scopeObj.view.typeHeadContractCountry.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadContractCountry.tbxSearchKey,scopeObj.view.flxNoContractCountry,1);
    };
    this.view.contractDetailsEntry3.tbxEnterValue.onKeyUp = function(){
      if(scopeObj.view.contractDetailsEntry3.flxInlineError.isVisible){
        scopeObj.view.contractDetailsEntry3.flxEnterValue.skin = "sknflxEnterValueNormal";
        scopeObj.view.contractDetailsEntry3.flxInlineError.isVisible = false;
      }
    };
    this.view.contractDetailsEntry6.tbxEnterValue.onKeyUp = function(){
      if(scopeObj.view.contractDetailsEntry6.flxInlineError.isVisible){
        scopeObj.view.contractDetailsEntry6.flxEnterValue.skin = "sknflxEnterValueNormal";
        scopeObj.view.contractDetailsEntry6.flxInlineError.isVisible = false;
      }
    };
    this.view.contractContactNumber.txtISDCode.onKeyUp = function(){
      if(scopeObj.view.contractContactNumber.flxError.isVisible){
        scopeObj.view.contractContactNumber.flxError.isVisible = false;
        scopeObj.view.contractContactNumber.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
      }
    };
    this.view.contractContactNumber.txtContactNumber.onKeyUp = function(){
      if(scopeObj.view.contractContactNumber.flxError.isVisible){
        scopeObj.view.contractContactNumber.flxError.isVisible = false;
        scopeObj.view.contractContactNumber.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
      }
    };
    this.view.AdvancedSearchDropDown01.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.AdvancedSearchDropDown01.tbxSearchBox.text.trim().length>0){
        scopeObj.view.AdvancedSearchDropDown01.flxSearchCancel.setVisibility(true);
        var segData=scopeObj.view.AdvancedSearchDropDown01.sgmentData.data;
        var searchText=scopeObj.view.AdvancedSearchDropDown01.tbxSearchBox.text;
        var statusName="";
        var filteredData=segData.filter(function(rec){
          statusName=rec.lblDescription.toLowerCase();
          if(statusName.indexOf(searchText)>=0)
            return rec;
        });
        if(filteredData.length===0){
          scopeObj.view.AdvancedSearchDropDown01.sgmentData.setVisibility(false);
          scopeObj.view.AdvancedSearchDropDown01.richTexNoResult.setVisibility(true);
        }else{
          scopeObj.view.AdvancedSearchDropDown01.sgmentData.setData(filteredData);
          scopeObj.view.AdvancedSearchDropDown01.sgmentData.setVisibility(true);
          scopeObj.view.AdvancedSearchDropDown01.richTexNoResult.setVisibility(false);
        }
      }else{
        scopeObj.view.AdvancedSearchDropDown01.flxSearchCancel.setVisibility(false);
        var totalRecords=scopeObj.view.AdvancedSearchDropDown01.sgmentData.info.data;
        scopeObj.view.AdvancedSearchDropDown01.sgmentData.setData(totalRecords);
      }
      scopeObj.view.forceLayout();
    };
    this.view.AdvancedSearchDropDown01.flxSearchCancel.onClick = function(){
      scopeObj.view.AdvancedSearchDropDown01.flxSearchCancel.setVisibility(false);
      scopeObj.view.AdvancedSearchDropDown01.tbxSearchBox.text="";
      var totalRecords=scopeObj.view.AdvancedSearchDropDown01.sgmentData.info.data;
      scopeObj.view.AdvancedSearchDropDown01.sgmentData.setData(totalRecords);
      scopeObj.view.forceLayout();
    };
    this.view.suspendFeaturePopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    };
    this.view.suspendFeaturePopup.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    };
    this.view.toggleContractButtonsFeatures.btnToggleLeft.onClick = function(){
      scopeObj.view.toggleContractButtonsFeatures.info.selectedTab =1;
      scopeObj.toggleContractFeaturesCustomerLevel();
      scopeObj.view.flxContractAccountFAList.setVisibility(false);
      scopeObj.view.flxContractFAList.setVisibility(true);
      scopeObj.view.tbxContractFASearch.text="";
      scopeObj.view.flxClearContractFASearch.setVisibility(false);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleContractButtonsFeatures.btnToggleLeft,scopeObj.view.toggleContractButtonsFeatures.btnToggleRight],1);
    };
    this.view.toggleContractButtonsFeatures.btnToggleRight.onClick = function(){
      scopeObj.view.toggleContractButtonsFeatures.info.selectedTab = 2;
      scopeObj.view.flxContractAccountFAList.setVisibility(true);
      scopeObj.view.flxContractFAList.setVisibility(false);
      scopeObj.view.btnUpdateInBulkFA.setVisibility(true);
      scopeObj.view.tbxContractFASearch.text="";
      scopeObj.view.flxClearContractFASearch.setVisibility(false);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleContractButtonsFeatures.btnToggleLeft,scopeObj.view.toggleContractButtonsFeatures.btnToggleRight],2);
      scopeObj.toggleContractFeaturesAccountLevel();
    };
    this.view.flxAddProdFeaturesBackBtn.onClick = function(){
      if( scopeObj.view.toggleContractButtonsFeatures.info.selectedTab==2){
        scopeObj.editAccountLvlFeaturesBack();
      }else if( scopeObj.view.toggleContractButtonsFeatures.info.selectedTab!=2){
        scopeObj.editCustomerLvlFeaturesBack();
      }
      scopeObj.view.flxFABulkUpdateScreen.setVisibility(false);
      scopeObj.view.flxContractsFATopSection.setVisibility(true);
    };
    this.view.flxSelectAllFeatures.onClick = function(){
      scopeObj.selectAllFeatures();
    };
    this.view.commonButtonsAddFeatures.btnSave.onClick = function(){
      scopeObj.updateFeatureActionsAdded();
      var toCheck = "true";      
      scopeObj.editAccountLvlFeaturesBack(toCheck);
      scopeObj.view.flxFABulkUpdateScreen.setVisibility(false);
      scopeObj.view.flxContractsFATopSection.setVisibility(true);
    };
    this.view.commonButtonsAddFeatures.btnCancel.onClick = function(){
      scopeObj.view.flxAddProdFeaturesBackBtn.onClick();
    };
    this.view.flxSegMore.onHover = this.onHoverSettings;
    this.view.flxServiceTypeFilter.onHover = this.onHoverSettings;
    this.view.flxDropDownDetail23.onHover = this.onHoverSettings;
    this.view.flxAccountsFilter.onHover = this.onHoverSettings;
    this.view.flxOwnershipFilter.onHover = this.onHoverSettings;
    this.view.flxRangeTooltip.onHover = this.onHoverSettings;
  },
  getFeatureStatusAndSkin : function(featureStatus){
    var status,statusIconSkin;
    if(featureStatus === "SID_FEATURE_ACTIVE"){
      status = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active");
      statusIconSkin = "sknFontIconActivate";
    }else if(featureStatus === "SID_FEATURE_INACTIVE"){
      status = kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
      statusIconSkin = "sknfontIconInactive";        
    }else if(featureStatus === "SID_FEATURE_UNAVAILABLE"){
      status = kony.i18n.getLocalizedString("i18n.common.Unavailable");
      statusIconSkin = "sknFontIconError";        
    }else if(featureStatus === "SID_FEATURE_SUSPENDED"){
      status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
      statusIconSkin = "sknFontIconSuspend";                
    }
    return{
      "status" : status,
      "statusIconSkin" : statusIconSkin
    };
  },
  onSegmentPaginationChange: function(accountsFeaturesCard , currentValue , segment){
    currentValue = parseInt(currentValue);
    let totalDataLen = this.paginationDetails.currSegContractData[1].length;
    let startVal = (currentValue - 1) * 10;

    // exceeded the limit
    if(startVal >totalDataLen){
      return;
    }

    accountsFeaturesCard.reportPagination.lblNumber.text = currentValue;
    let endVal = currentValue  * 10;
    endVal = endVal > totalDataLen ? totalDataLen : endVal;
    accountsFeaturesCard.reportPagination.lblShowing.text = "Showing" + " " + startVal + " - " + endVal + " " + "Of " + totalDataLen;
    let paginData = this.paginationDetails.currSegContractData[1].slice(startVal, endVal);
    let segData = segment.data;
    segData[0][1] = paginData;

    segment.setData(segData);
  },
  paginationActionsForAcct:function(accountsFeaturesCard , segment , totalDataLen){
    accountsFeaturesCard.reportPagination.setVisibility(true);
    var scopeObj = this;

    scopeObj.totalPages = Math.ceil( totalDataLen/10);

    // initially setting the pagination values
    accountsFeaturesCard.reportPagination.lblNumber.text = "1";
    accountsFeaturesCard.reportPagination.lblShowing.text = "Showing 1 - 10 Of " + totalDataLen;

    accountsFeaturesCard.reportPagination.flxnext.onClick = function(){

      var currentValue=parseInt(accountsFeaturesCard.reportPagination.lblNumber.text)+1;
      scopeObj.onSegmentPaginationChange(accountsFeaturesCard , currentValue , segment);
    };
    accountsFeaturesCard.reportPagination.flxPrevious.onClick = function(){
      var currentValue=accountsFeaturesCard.reportPagination.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationChange(accountsFeaturesCard , prevVal , segment);
      }      
    };
    accountsFeaturesCard.reportPagination.flxGo.onClick = function(){
      var currentValue= accountsFeaturesCard.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(currentValue)>0 && parseInt(currentValue)<=scopeObj.totalPages){

        scopeObj.onSegmentPaginationChange(accountsFeaturesCard , currentValue , segment);
      }
    };
    accountsFeaturesCard.reportPagination.tbxPageNumber.onDone = function(){
      var currentValue= accountsFeaturesCard.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(currentValue)>0 && parseInt(currentValue)<=scopeObj.totalPages){

        scopeObj.onSegmentPaginationChange(accountsFeaturesCard , currentValue , segment);
      }
    };
  },
  assingText : function(segment,textBox){
    var selectedRow = segment.data[segment.selectedRowIndex[1]];
    textBox.text =  selectedRow.lblAddress.text;
    textBox.info.isValid = true;
    textBox.info.data = selectedRow;
    segment.setVisibility(false);
    this.view.flxCountry.zIndex = 1;
    this.view.forceLayout();
  },

  setContractPopupHeadings:function(){
    this.view.contractDetailsPopup.lblDetailsHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.CUSTOMER_DETAILS");

    this.view.contractDetailsPopup.detailsRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerName_UC");
    this.view.contractDetailsPopup.detailsRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
    this.view.contractDetailsPopup.detailsRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCompanies.INDUSTRY");

    this.view.contractDetailsPopup.detailsRow2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.View.EMAILID_UC");
    this.view.contractDetailsPopup.detailsRow2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerCare.lblPhoneNumber");

    this.view.contractDetailsPopup.detailsRow3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.View.ADDRESS");

    this.view.contractDetailsPopup.detailsRow2.flxColumn3.setVisibility(false);
    this.view.contractDetailsPopup.detailsRow3.flxColumn2.setVisibility(false);
    this.view.contractDetailsPopup.detailsRow3.flxColumn3.setVisibility(false);
  },
  clearValidation : function(widget,errorFlex,type){
    if (type === 1)
      widget.skin = "skntxtbxDetails0bbf1235271384a";
    else if (type === 2)
      widget.skin = "sknLbxborderd7d9e03pxradius";
    else if (type === 3)
      widget.skin = "sknflxEnterValueNormal";
    errorFlex.setVisibility(false);
  },
  /*
    * displays required main flex(search,details,create) and hides other
    * @param: path of flex to show
    */
  hideRequiredMainScreens : function(reqFlexPath){
    var self = this;
    if(reqFlexPath)
      reqFlexPath.setVisibility(true);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    if(reqFlexPath &&reqFlexPath.id === "flxCreateCompany"){
      this.view.flxMainContent.height = (screenHeight -115) +"px";
    } else{
      this.view.flxMainContent.height = (screenHeight -90) +"px";
    }
    self.view.forceLayout();
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },
  resetSortImages : function(context) {
    var self = this;
    if(context === "accounts"){
      self.sortIconFor('lblAccountType.text', 'lblAccountTypeSortIcon');
      self.sortIconFor('lblAccountName.text', 'lblAccountNameSortIcon');
      self.sortIconFor('lblAccountNumber.text', 'lblAccountNumberSortIcon');
      self.sortIconFor('lblStatus.text', 'lblStatusSortIcon');
    }
  },
  onHoverSettings : function(widget, context){
    var scopeObj = this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
    scopeObj.view.forceLayout();
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
    this.mouseXCoordinate=context.screenY;
  },
  editContractPreshow: function(){
    this.view.flxEditNotification.setVisibility(true);
    this.view.flxLegalEntityHeader.setVisibility(false);
    this.view.lblSelectLegalEntity.setVisibility(true);
    this.view.lblSelectLegalEntity.text=kony.i18n.getLocalizedString("i18n.contractEdit.selectedEntity");
    this.view.lblSelectLegalEntity.skin="sknLatoRegular192B4518px";
    this.view.lblServiceName.setVisibility(true);
    this.view.lblServiceName.skin="sknLatoRegular192B4518px";
    this.view.flxContractServiceCards.setVisibility(true);
    this.view.flxContractServiceCards.top="160dp";
    this.view.flxContractServiceCards.height="370dp";
  },
  searchEntityCards : function(){
    var self=this;
    var searchText=this.view.tbxEntitySearch.text.trim().toLowerCase();
    var entities=this.view.flxEntitySearch.info;
    var entityRegion="";
    var searchRecords=entities.filter(function(entity){
      entityRegion=entity.companyName.toLowerCase();
      if(entityRegion.indexOf(searchText) >=0)
        return entity;
    });
    if(searchRecords.length > 0){
      self.legalEntityCardset(searchRecords);
    }
    else
      {
        self.view.flxNoServiceSearchResults.setVisibility(true);
        self.view.lblNoServiceSearchResults.text = "No records found with keyword \"" + searchText + "\". Please try again.";
        self.view.flxLegalEntityCards.setVisibility(false);
      }
    this.view.forceLayout();
  },
  legalEntityCardset : function(entityList){
    var entities=entityList;
    this.view.flxNoServiceSearchResults.setVisibility(false);
    this.view.flxLegalEntityCards.setVisibility(true);
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow0,this.view.verticalTabsContract.btnOption0);
    this.view.flxLegalEntityCardsList.removeAll();
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var left =20, top =20, width = 0;
    this.view.flxLegalEntityCardsList.removeAll();
    for (var i = 0; i < entities.length; i++) {
      width = (screenWidth -305-230-35-60-60)/3;
      if(this.action===this.actionConfig.edit&&this.createContractRequestParam.legalEntityId===entities[i].id){
      var alertEntityCard = new com.adminConsole.contracts.serviceCard({
        "id": "serviceCard"+entities[i].id,
        "isVisible": true,
        "width": width + "px",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": top+"dp",
        "left": left +"dp"
      }, {}, {});
      left = left + width + 20;
      if(i!== 0 && i%3 === 0){ //new row
        alertEntityCard.left = "20dp";
        left = 20 + width + 20;
        top = top + 40 + 20;
        alertEntityCard.top = top +"dp";
      } alertEntityCard.flxServiceTag.setVisibility(false);
      alertEntityCard.lblCategoryName.top="10dp";
      alertEntityCard.height="40dp";
      this.setEntityCardData(entities[i], alertEntityCard,width-40);
      }
     else if(this.action===this.actionConfig.create){
        var alertEntityCard = new com.adminConsole.contracts.serviceCard({
        "id": "serviceCard"+entities[i].id,
        "isVisible": true,
        "width": width + "px",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": top+"dp",
        "left": left +"dp"
      }, {}, {});
      left = left + width + 20;
      if(i!== 0 && i%3 === 0){ //new row
        alertEntityCard.left = "20dp";
        left = 20 + width + 20;
        top = top + 40 + 20;
        alertEntityCard.top = top +"dp";
      } alertEntityCard.flxServiceTag.setVisibility(false);
      alertEntityCard.lblCategoryName.top="10dp";
      alertEntityCard.height="40dp";
      this.setEntityCardData(entities[i], alertEntityCard,width-40);
     }
    }
    kony.application.dismissLoadingScreen();
      this.view.flxLegalEntityCardsList.setEnabled(true);
  },
  setEntityCardData:function(entity,entityCard,width){
    var self = this;
    entityCard.lblCategoryName.info ={"catId":entity.id};
    var labelCharCount=Math.ceil(width/7);
    entityCard.lblCategoryName.text=this.AdminConsoleCommonUtils.getTruncatedString(entity.companyName, labelCharCount, labelCharCount-3);
    entityCard.lblCategoryName.tooltip = entity.companyName;
    //entityCard.lblContent1.info={"groupId":entities.serviceType};
    if(this.action!=this.actionConfig.edit){
    entityCard.onClick = function(){
      //should make all the other cards skins to normal skins
      self.selectedEntityCard=entityCard.lblCategoryName.info.catId;
      var legalEntityPayload={
        "legalEntityId": self.selectedEntityCard
      }
      self.presenter.getServiceDefinitionsForContracts(legalEntityPayload,"CREATE", self.formName);
      self.createContractRequestParam.serviceDefinitionId=entityCard.lblCategoryName.info.catId;
      self.createContractRequestParam.serviceDefinitionName=entityCard.lblCategoryName.tooltip;
      self.view.lstBoxContractService.masterData=[[entityCard.lblCategoryName.tooltip,entityCard.lblCategoryName.tooltip]];
      entityCard.skin="sknFlxbgF8F9FAbdr003E75Shadow";
      self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtonsServiceDetails.btnSave,true,false);
      self.view.verticalTabsContract.flxOption0.setEnabled(true);
      self.view.verticalTabsContract.flxOption1.setEnabled(true);
      self.view.flxLegalEntityCards.setVisibility(false);
      self.view.flxContractServiceCards.setVisibility(true);
      self.view.flxCategoryHeader.setVisibility(true);
      self.view.flxContractServicesScrollCont.top="150dp";
      self.view.flxEntitySearch.setVisibility(false);
      self.view.flxEntityListSearch.setVisibility(true);
      self.view.lblEntitySelected.text=entity.companyName;
      self.view.lblEntityCode.text="("+entity.countryCode+")";
      self.view.lblPopUpMainMessage.text = "SEARCH CUSTOMERS IN "+entity.companyName.toUpperCase();
      self.setEntityListSearch();
    }
    }
    this.view.flxLegalEntityCardsList.add(entityCard);
    this.view.forceLayout();
  },
  legalEntityPreshow : function(){
    var self=this;
    this.view.flxLegalEntityCards.setVisibility(true);
      this.view.flxLegalEntityHeader.setVisibility(true);
      this.view.flxContractServiceCards.setVisibility(false);
      this.view.flxCategoryHeader.setVisibility(false);
      this.view.flxEntitySearch.setVisibility(true);
      this.view.flxEntityListSearch.setVisibility(false);
      this.view.flxEditNotification.setVisibility(false);
      this.view.flxContractServiceCards.top="0dp";
      this.view.flxContractServiceCards.height="530dp";
      this.view.lblSelectLegalEntity.text=kony.i18n.getLocalizedString("i18n.legalEntityConsent");
      this.view.lblSelectLegalEntity.skin="sknlbl465C77LatoReg12px";
      this.view.flxContractServicesScrollCont.top="75dp";
      this.view.lblServiceName.setVisibility(false);
      this.view.flxEntitySelected.onClick = function(){
      self.view.flxDropdown.setVisibility(!self.view.flxDropdown.isVisible);
    }
    this.view.imgDrop.onClick = function(){
      self.view.flxDropdown.setVisibility(!self.view.flxDropdown.isVisible);
    }
  },
  setEntityListSearch : function(){
    var self=this;
    var entities =this.view.flxEntitySearch.info;
    var segData=[];
    var widgetMap = {
            "customerStatusId": "customerStatusId",
            "flxSearchDropDown": "flxSearchDropDown",
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": "imgCheckBox",
            "lblDescription": "lblDescription"
        };
    segData=entities.map(function(en){
      return {
                "customerStatusId": en.id,
                "flxSearchDropDown": "flxSearchDropDown",
                "flxCheckBox": {
                    "isVisible": false
                },
                "lblDescription": en.companyName 
            };
    });
    this.view.productTypeFilterMenu.segStatusFilterDropdown.widgetDataMap=widgetMap;
    this.view.productTypeFilterMenu.segStatusFilterDropdown.setData(segData);
    this.view.productTypeFilterMenu.segStatusFilterDropdown.selectionBehavior=constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.productTypeFilterMenu.segStatusFilterDropdown.info=segData;
    this.view.productTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var index=self.view.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex[1];
      self.view.lblEntitySelected.text = segData[index].lblDescription;
      self.selectedEntityCard=entities[index].id;
      var legalEntityPayload={
        "legalEntityId": self.selectedEntityCard
      };
      self.presenter.getServiceDefinitionsForContracts(legalEntityPayload,"CREATE", self.formName);
      self.view.lblEntityCode.text="("+entities[index].countryCode+")";
      self.view.lblPopUpMainMessage.text = "SEARCH CUSTOMERS IN "+segData[index].lblDescription.toUpperCase();
      self.view.flxDropdown.setVisibility(false);
    }
  },
  setContractServiceCards : function(services,isSearch){
    this.selectedServiceCard= null;
    this.view.flxContractServiceCards.setVisibility(true);
    //this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow0,this.view.verticalTabsContract.btnOption0);
    if(isSearch===true)
      this.setDataToServiceTypeFilter(services);
    this.view.flxContractServiceCards.removeAll();
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var left =20, top =20, width = 0;
    for (var i = 0; i < services.length; i++) {
      width = (screenWidth -305-230-35-60-60)/3;
      if(this.action===this.actionConfig.edit&&this.completeContractDetails.servicedefinitionId===services[i].id){
      var alertServiceCard = new com.adminConsole.contracts.serviceCard({
        "id": "serviceCard"+services[i].id,
        "isVisible": true,
        "width": width + "px",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": top+"dp",
        "left": left +"dp"
      }, {}, {});
      left = left + width + 20;
      this.setServiceCardData(services[i], alertServiceCard,width-40);
      }
      else if(this.action===this.actionConfig.create)  {
        var alertServiceCard = new com.adminConsole.contracts.serviceCard({
        "id": "serviceCard"+services[i].id,
        "isVisible": true,
        "width": width + "px",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": top+"dp",
        "left": left +"dp"
      }, {}, {});
      left = left + width + 20;
      if(i!== 0 && i%3 === 0){ //new row
        alertServiceCard.left = "20dp";
        left = 20 + width + 20;
        top = top + 80 + 20;
        alertServiceCard.top = top +"dp";
      } 
      this.setServiceCardData(services[i], alertServiceCard,width-40);
      }
    }
    if(this.action === this.actionConfig.edit){
      this.view.flxContractServiceCards.setEnabled(false);
    }else{
      this.view.flxContractServiceCards.setEnabled(true);
    }
  },
  /*
  * set category data to each card id
  * category data, card to add
  */
  setServiceCardData : function(serviceDefinition, serviceCard,width){
    var self = this;
    serviceCard.lblCategoryName.info ={"catId":serviceDefinition.id};
    var labelCharCount=Math.ceil(width/7);
    serviceCard.lblCategoryName.text=this.AdminConsoleCommonUtils.getTruncatedString(serviceDefinition.name, labelCharCount, labelCharCount-3);
    serviceCard.lblCategoryName.tooltip = serviceDefinition.name;
    serviceCard.lblContent1.info={"groupId":serviceDefinition.serviceType};
    if(serviceDefinition.serviceType==="TYPE_ID_RETAIL"){
      serviceCard.lblContent1.text="Retail Banking";
      serviceCard.flxServiceTag.skin="sknflxCustomertagRedRadius4px";
      serviceCard.flxServiceTag.width="100px";
    } else if(serviceDefinition.serviceType==="TYPE_ID_BUSINESS"){
      serviceCard.lblContent1.text="Business Banking";
      serviceCard.flxServiceTag.skin="sknflxCustomertagPurpleRadius4px";
      serviceCard.flxServiceTag.width="115px";
    } else if(serviceDefinition.serviceType==="TYPE_ID_WEALTH"){
      serviceCard.lblContent1.text="Wealth Banking";
      serviceCard.flxServiceTag.skin="sknflxServiceTag0D4CFF";
      serviceCard.flxServiceTag.width="105px";
    }
    if(this.action!=this.actionConfig.edit){
      serviceCard.onClick = function(){
        //should make all the other cards skins to normal skins
        if(self.selectedServiceCard){
          var cards=self.view.flxContractServiceCards.widgets();
          self.view[self.selectedServiceCard].skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
          if(self.createContractRequestParam.contractCustomers.length!==0)
            self.presenter.getServiceDefinitionFeaturesAndLimits({"serviceDefinitionId":serviceCard.lblCategoryName.info.catId}, self.formName);
        }
        self.createContractRequestParam.serviceDefinitionId=serviceCard.lblCategoryName.info.catId;
        self.createContractRequestParam.serviceDefinitionName=serviceCard.lblCategoryName.tooltip;
        self.view.lstBoxContractService.masterData=[[serviceCard.lblCategoryName.tooltip,serviceCard.lblCategoryName.tooltip]];
        serviceCard.skin="sknFlxbgF8F9FAbdr003E75Shadow";
        self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtonsServiceDetails.btnSave,true,true);
        self.view.verticalTabsContract.flxOption0.setEnabled(true);
        self.view.verticalTabsContract.flxOption1.setEnabled(true);
        self.selectedServiceCard=serviceCard.id;
      }
    }
    else if(this.action===this.actionConfig.edit &&
            this.completeContractDetails.servicedefinitionId===serviceDefinition.id){
      this.selectedServiceCard= serviceCard.id;
      // self.selectedServiceCard = self.completeContractDetails.servicedefinitionId;
    }
    this.view.flxContractServiceCards.add(serviceCard);
    this.view.forceLayout();
  },
  hideAllScreens: function(){
    this.view.flxContractServiceTab.setVisibility(false);
    this.view.flxContractCustomersTab.setVisibility(false);
    this.view.flxContractDetailsTab.setVisibility(false);
    this.view.flxContractAccounts.setVisibility(false);
    this.view.flxContractFA.setVisibility(false);
    this.view.flxContractLimits.setVisibility(false);
    this.view.forceLayout();
  },
  toggleContractVerticalTabs: function(imgPath,btnPath){
    this.tabUtilVerticleArrowVisibilityFunction(
      [this.view.verticalTabsContract.flxImgArrow0,
       this.view.verticalTabsContract.flxImgArrow1,
       this.view.verticalTabsContract.flxImgArrow2,
       this.view.verticalTabsContract.flxImgArrow3,
       this.view.verticalTabsContract.flxImgArrow4,
       this.view.verticalTabsContract.flxImgArrow5],imgPath);  
    var widgetArray = [this.view.verticalTabsContract.btnOption0,this.view.verticalTabsContract.btnOption1,this.view.verticalTabsContract.btnOption2,this.view.verticalTabsContract.btnOption3,this.view.verticalTabsContract.btnOption4,this.view.verticalTabsContract.btnOption5];
    this.tabUtilVerticleButtonFunction(widgetArray,btnPath);
  },

  showContractCustomersScreen: function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow1,this.view.verticalTabsContract.btnOption1);
    if(isNextClick){
      this.view.flxContractServiceTab.setVisibility(false);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnSave, false, false);
    }
    else
      this.hideAllScreens();
    this.view.verticalTabsContract.flxOption0.setEnabled(true);
    this.view.verticalTabsContract.flxOption1.setEnabled(true);
    this.view.flxContractCustomersTab.setVisibility(true);
    this.view.forceLayout();
  },
  showContractDetailsScreen : function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow2,this.view.verticalTabsContract.btnOption2);
    if(isNextClick)
      this.view.flxContractCustomersTab.setVisibility(false);
    else
      this.hideAllScreens();
    this.view.contractDetailsEntry1.flxInlineError.setVisibility(false);
    this.view.flxContractDetailsTab.setVisibility(true);
    this.view.forceLayout();
  },
  setContractDetails : function(){
    var contractData={};
    var contact="";
    if(this.action===this.actionConfig.create){
      var primaryData=this.primaryContractCustomer;
      contractData.name=primaryData.coreCustomerName;
      contractData.faxId=primaryData.faxId?primaryData.faxId:"";
      contractData.email=primaryData.email?primaryData.email:"";
      contractData.address1=primaryData.addressLine1?primaryData.addressLine1:"";
      contractData.address2=primaryData.addressLine2?primaryData.addressLine2:"";
      contractData.zipCode=primaryData.zipCode?primaryData.zipCode:"";
      contractData.country=primaryData.country?primaryData.country:"";
      contractData.city=primaryData.city?primaryData.city:"";
      //contact=primaryData.phone.split("-");
      var lPrefix = primaryData.phonePrefix?primaryData.phonePrefix:"";
      var lPhoneNo = primaryData.phoneNo?primaryData.phoneNo:"";
      contact=[lPrefix, lPhoneNo];
    }else{
      var contractDetails=JSON.parse(JSON.stringify(this.completeContractDetails));
      this.view.lstBoxContractService.masterData=[[contractDetails.servicedefinitionId,contractDetails.servicedefinitionName]];
      contractData.name=contractDetails.name;
      contractData.faxId=contractDetails.faxId?contractDetails.faxId:"";
      contractData.email=contractDetails.communication[0].email?contractDetails.communication[0].email:"";
      contractData.address1=contractDetails.address[0]&&contractDetails.address[0].addressLine1?contractDetails.address[0].addressLine1:"";
      contractData.address2=contractDetails.address[0]&&contractDetails.address[0].addressLine2?contractDetails.address[0].addressLine2:"";
      contractData.zipCode=contractDetails.address[0]&&contractDetails.address[0].zipCode?contractDetails.address[0].zipCode:"";
      contractData.country=contractDetails.address[0]&&contractDetails.address[0].country?contractDetails.address[0].country:"";
      contractData.city=contractDetails.address[0]&&contractDetails.address[0].city?contractDetails.address[0].city:"";
      contact=[contractDetails.communication[0].phoneCountryCode,contractDetails.communication[0].phoneNumber];
    }
    if(this.view.segAddedCustomers.data.length>1)
      this.view.flxContractNotification.setVisibility(true);
    else
      this.view.flxContractNotification.setVisibility(false);
    this.view.lstBoxContractService.selectedKey=this.view.lstBoxContractService.masterData[0][0];
    this.view.lstBoxContractService.setEnabled(false);
    this.view.contractDetailsEntry1.tbxEnterValue.text=contractData.name;
    this.view.contractDetailsEntry2.tbxEnterValue.text=contractData.faxId;
    this.view.contractContactNumber.txtISDCode.text=contact[0]?contact[0].trim():"";
    this.view.contractContactNumber.txtContactNumber.text=contact[1]?contact[1].trim():"";
    this.view.contractDetailsEntry3.tbxEnterValue.text=contractData.email;
    this.view.contractDetailsEntry4.tbxEnterValue.text=contractData.address1;
    this.view.contractDetailsEntry5.tbxEnterValue.text=contractData.address2;
    this.view.contractDetailsEntry6.tbxEnterValue.text=contractData.zipCode;
    //this.view.contractDetailsEntry7.tbxEnterValue.text=contractData.country;
    this.view.typeHeadContractCountry.tbxSearchKey.text = contractData.country;
    this.view.typeHeadContractCountry.tbxSearchKey.info={"isValid": true};
    this.view.contractDetailsEntry8.tbxEnterValue.text=contractData.city;
    if(this.view.contractDetailsEntry1.flxInlineError.isVisible)
      this.view.contractDetailsEntry1.flxInlineError.setVisibility(false);
    this.view.forceLayout();
  },
  onEditContractClick : function(){
    var scopeObj =this;
    scopeObj.view.flxContractServiceCards.top="0dp";
    scopeObj.editContractPreshow();
    scopeObj.action = scopeObj.actionConfig.edit;
    scopeObj.view.breadcrumbs.btnBackToMain.text = "CONTRACTS"
    scopeObj.view.breadcrumbs.lblCurrentScreen.text = "EDIT";
    scopeObj.view.breadcrumbs.btnPreviousPage.text=scopeObj.completeContractDetails.name.toUpperCase();
    scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    scopeObj.view.mainHeader.btnDropdownList.setVisibility(false);
    scopeObj.view.tbxRecordsSearch.text="";
    scopeObj.selectedServiceCard= null;
    scopeObj.limitsActualJSON={};
    scopeObj.createContractRequestParam={
      "contractId":scopeObj.completeContractDetails.id,
      "contractName": scopeObj.completeContractDetails.name,
      "serviceDefinitionName": scopeObj.completeContractDetails.servicedefinitionName,
      "serviceDefinitionId": scopeObj.completeContractDetails.servicedefinitionId,
      "legalEntityId":scopeObj.completeContractDetails.legalEntityId,
      "faxId": scopeObj.completeContractDetails.faxId,
      "communication": scopeObj.completeContractDetails.communication,
      "address": scopeObj.completeContractDetails.address,
      "contractCustomers": [],
      "deletedCustomers":[]
    };
    scopeObj.presenter.getServiceDefinitionMonetaryActions({"serviceDefinitionId":scopeObj.completeContractDetails.servicedefinitionId, "legalEntityId":scopeObj.completeContractDetails.legalEntityId}, scopeObj.formName);
    if(scopeObj.view.AdvancedSearchDropDown01.sgmentData.info===undefined||scopeObj.view.AdvancedSearchDropDown01.sgmentData.info===null)
      scopeObj.fetchCustomerStatusList();
    scopeObj.updateButtonsText(true);
    scopeObj.view.flxClearRecordsSearch.setVisibility(false);
    scopeObj.hideRequiredMainScreens(scopeObj.view.flxCreateContract);
    scopeObj.view.flxBreadcrumb.setVisibility(true);
    scopeObj.setContractButtonsSkin(true);
    scopeObj.enableAllTabs(true);
    scopeObj.view.segAddedCustomers.setVisibility(true);
    scopeObj.view.btnSelectCustomers.setVisibility(true);
    scopeObj.view.flxNoCustomersAdded.setVisibility(false);
    scopeObj.showContractServiceScreen();
    scopeObj.setEditContractCustomersData();
    if(scopeObj.viewContractServiceDef.length===0){
      scopeObj.presenter.getLegalEntities({}, scopeObj.formName);
      scopeObj.presenter.getServiceDefinitionsForContracts({"legalEntityId":scopeObj.createContractRequestParam.legalEntityId},"EDIT",scopeObj.formName);
    }
    else{
      scopeObj.setContractServiceCards(scopeObj.viewContractServiceDef);
      scopeObj.setDataToServiceTypeFilter(scopeObj.viewContractServiceDef);
      scopeObj.view.flxContractServiceCards.info={"totalRecords":scopeObj.viewContractServiceDef,"filteredRecords":scopeObj.viewContractServiceDef};
    }
  },
  setContractButtonsSkin : function(isEdit){
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsServiceDetails.btnSave,true,isEdit);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnSave,true,isEdit);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnNext,false,isEdit);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.contractDetailsCommonButtons.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.contractDetailsCommonButtons.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractAccounts.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractAccounts.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractLimits.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractLimits.btnNext,false,true);
    this.view.forceLayout();
  },
  showCustomerSearchPopup : function(isFirstTime){
    this.view.flxLoading2.setVisibility(false);
    this.resetCoreCustomerSearch();
    this.setNormalSkinToCoreSearch();
    this.view.flxSearchFilter.setVisibility(true);
    this.view.lblIconArrow.text="";
    this.view.commonButtons.btnNext.setVisibility(false);
    this.view.flxCustomerSearchPopUp.setVisibility(true);
    this.view.flxCustomersBreadcrumb.setVisibility(false);
    this.view.flxAddedCustomerInfo.setVisibility(false);
    this.view.flxCustomerSearchHeader.setVisibility(true);
    this.view.imgCustomerSearchError.setVisibility(false);
    this.view.lblCustomerSearchError.setVisibility(false);
    this.view.fonticonrightarrowSearch.text="";
    this.view.commonButtons.btnCancel.skin="sknbtnffffffLatoRegular4f555dBorder1px485c75";
    this.view.btnShowHideAdvSearch.text=kony.i18n.getLocalizedString("i18n.contracts.showAdvancedSearch");
    this.view.flxRow2.setVisibility(false);
    this.view.flxRow3.setVisibility(false);
    this.view.flxColumn13.setVisibility(false);
    this.view.flxCustomerAdvSearch.setVisibility(true);
    this.view.flxCustomerDetailsContainer.setVisibility(true);
    this.view.flxRelatedCustomerSegment.setVisibility(false);
    this.view.lblNoCustomersSearched.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
    this.view.flxNoCustomersSearched.setVisibility(true);
    this.view.lblRelatedcustSubHeading.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave,true,false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnNext,false,false);
    if(isFirstTime)
      this.selectedCustomers=[];
    this.view.flxSearchBreadcrumb.info={"added":[]};
    this.view.flxSearchFilter.info={"added":[]};
    this.view.segBreadcrumbs.setData([]);
    var i=this.view.flxSearchBreadcrumb.widgets().concat([]);
    this.view.flxSearchFilter.removeAll();
    for(var x=2;x<i.length-1;x++)
      this.view.flxSearchBreadcrumb.remove(i[x]);
    this.view.forceLayout();
  },
  addCustomer : function(customerInfo){
    this.view.flxCustomerSearchPopUp.info={"action":"SEGMENTCLICK"};
    this.view.commonButtons.btnNext.setVisibility(true);
    this.view.flxCustomerSearchHeader.setVisibility(false);
    this.view.flxCustomersBreadcrumb.setVisibility(true);
    this.view.flxAddedCustomerInfo.setVisibility(true);
    this.view.flxCustomerAdvSearch.setVisibility(false);
    this.view.flxCustomerDetailsContainer.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnNext,false,true);
    if(this.view.flxSearchBreadcrumb.info.added)
      this.addBreadcrumb(customerInfo);
    var isAdded=false;
    for(var i=0;i<this.selectedCustomers.length;i++){
      if(this.selectedCustomers[i].coreCustomerId===customerInfo.coreCustomerId&&this.selectedCustomers[i].isSelected)
        isAdded=true;
    }
    if(isAdded===false)
      this.addCustomerTag(this.view.flxSearchFilter,customerInfo.coreCustomerName,customerInfo.coreCustomerId);
    this.view.flxLoading2.setVisibility(true);
    this.view.flxRelatedCustomerSegment.setVisibility(false);
    this.view.flxAddedCustomerInfo.setVisibility(false);
    this.presenter.getRelatedCoreCustomers({"coreCustomerId" : customerInfo.coreCustomerId,"legalEntityId" : this.selectedEntityCard}, this.formName);
    this.view.forceLayout();
  },
  addCustomerTag : function(tagParentFlex,customerName,id){
    var self = this;
    var toCheck =  this.view.btnUpdateInBulkFA.info;
    var tagsCount=tagParentFlex.widgets().length;
    var uniqueId=tagsCount.toString();
     var lblname = tagsCount + "lblTagName";
    var imgname = tagsCount + "flxCross";
    if(this.view.flxContractFA.isVisible){//as the same type of name is set at "Add customers" popup
      uniqueId=uniqueId+"FA";
      lblname = tagsCount + "FAlblTagName";
      imgname = tagsCount + "FAflxCross";
    }
    var newTextTag = self.view.flxFilterTag.clone(uniqueId);
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(customerName,"12px Lato-Regular");
   if (this.view.flxContractFA.isVisible && toCheck =="ACCLVL")
      {
        newTextTag.width = flexWidth + 10 + 10 + 28 + "px";        //labelwidth+left padding+right padding+ cross image width	
        newTextTag[lblname].text = customerName+ " ("+ id+")";
        newTextTag[lblname].tooltip = customerName+ " ("+ id+")";
        newTextTag.isVisible = true;        
        newTextTag.info=customerName;
      }
      else{
        newTextTag.width = flexWidth + 10 + 10 + 15 + "px";         //labelwidth+left padding+right padding+ cross image width
        newTextTag[lblname].text = customerName;
        newTextTag[lblname].tooltip = customerName;
        newTextTag.isVisible = true;
        newTextTag.info=id;
      }  
    tagParentFlex.info.added.push([customerName,id]);
   var parentWidth=tagParentFlex.frame.width;
    var leftVal=20;
    var topVal=0;
    var lineCount=1;
    for(var a=tagsCount-1;a>=0;a--){
      var i=tagParentFlex.children[a];
      leftVal=leftVal+(tagParentFlex[i].frame.width+15);
      if((leftVal+flexWidth+50)>parentWidth){
        leftVal=20;
        lineCount=lineCount+1;
      }
    }
    newTextTag.left=leftVal+"px";
    if(lineCount>1){
      newTextTag.top=(lineCount-1)*30+"px";
    }else{
      newTextTag.top=topVal+"px";
    }
    tagParentFlex.addAt(newTextTag, -1);
    newTextTag[imgname].onTouchStart = function (id) {
      self.removeSelectedCustomer(tagParentFlex,id.parent.info);
      if(tagParentFlex.widgets().length===1){
        self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtons.btnSave,true,false);
        self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtons.btnNext,false,false);
      }
      if(tagParentFlex.id=="flxTagsContainer"&&self.view.flxContractLimits.isVisible&&self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length!==0)
        self.showBulkUpdatePopupScreen2();//to refresh features data in the dropdown when any selected customer is removed
      else
        self.removeTag(tagParentFlex,id.parent.info);
    };
    tagParentFlex.setVisibility(true);
    this.view.forceLayout();
  },
  /*
   * function to remove a selected tag
   * @param : selectedflex id
   */
  removeTag: function(tagParentFlex,id) {
    var toCheck = this.view.btnUpdateInBulkFA.info;
    var selectedAccountsCount;
    if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][0] === id) {
          tagParentFlex.info.added.splice(x, 1);
        }
      }
      var selAcc = tagParentFlex.info.accIds;
      var accKeys = Object.keys(selAcc);
      for (var y = 0; y < accKeys.length; y++) {
        if (selAcc[accKeys[y]] === id.split(" ")[0])
          delete selAcc[accKeys[y]];
      }
      tagParentFlex.info.accIds = selAcc;
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = Object.keys(selAcc);
    } else if(this.view.flxContractFA.isVisible && toCheck == "CUSTLVL"){
      var selCust = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][1] === id) tagParentFlex.info.added.splice(x, 1);
        
      }
      selCust = selCust.filter(function(custId){
        return custId !== id;
      });
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = selCust;
    } else {
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][1] === id) tagParentFlex.info.added.splice(x, 1);
      }
    }   
    tagParentFlex.removeAll();
    this.view.flxMoreTagsContFA.removeAll();
    var addedCount=tagParentFlex.info.added.length;
    var addedCustomers=tagParentFlex.info.added;
    tagParentFlex.info.added=[];
    for (var x=0;x<addedCount;x++){
       if(this.view.flxContractFA.isVisible){
         this.addAccountsTagContract(tagParentFlex,addedCustomers[x][0],addedCustomers[x][1], addedCount);
       } else{
         this.addCustomerTag(tagParentFlex,addedCustomers[x][0],addedCustomers[x][1]);
       }
      
    } 
    this.toCheckDeleteTagConditions();
    this.view.forceLayout();
  },
  /*
   function to check conditions after delete
  */
   toCheckDeleteTagConditions :function(){    
    var toCheck =this.view.btnUpdateInBulkFA.info;
    var noOfCustAccounts = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust ?
        this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length : "0";
    if(this.view.flxContractFA.isVisible && toCheck == "CUSTLVL"){
      this.view.lblSelectedHeading.text="Selected Customers("+this.getTwoDigitNumber(noOfCustAccounts)+")";
    }
    else if(this.view.flxContractFA.isVisible&& toCheck == "ACCLVL")
    {
      this.view.lblSelectedHeading.text="Selected Accounts("+this.getTwoDigitNumber(noOfCustAccounts)+")";
    }
    if(this.view.flxTagsContainer.info.added.length ===0)
    {
      this.view.flxBulkUpdateListContainer.setVisibility(false);
      this.view.flxBulkFANoSelectedCustomer.setVisibility(true);
      this.view.flxAddNewRowListCont.removeAll();
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = [];
      if(this.view.flxContractFA.isVisible&& toCheck == "CUSTLVL")
      {
        this.view.lblSelectedHeading.text="Selected Customers(00)";
        this.view.flxTagsContainer.setVisibility(false);
        this.view.lblNothingSelected.setVisibility(true);
        this.view.btnModifySearch.text="Select Customers";
        this.view.flxTagsContainer.info={"added":[]};
      }
      else if(this.view.flxContractFA.isVisible&& toCheck == "ACCLVL")
      {
        this.view.lblSelectedHeading.text="Selected Accounts(00)";
        this.view.flxTagsContainer.setVisibility(false);
        this.view.lblNothingSelected.setVisibility(true);
        this.view.btnModifySearch.text="Select Accounts";
        this.view.flxTagsContainer.info={"added":[],"accIds":{}};
      } 
    }
    this.view.forceLayout();
  },
  removeSelectedCustomer: function(tagParentFlex,id){
    var removedCustId=id;
    var toCheck =this.view.btnUpdateInBulkFA.info ;
    if(tagParentFlex.id!="flxTagsContainer"){
      var relativeCustomers=this.view.segRelatedCustomers.data;
      var self=this;
      for(var i=0;i<this.selectedCustomers.length;i++){
        if(this.selectedCustomers[i].coreCustomerId===removedCustId){
          this.selectedCustomers[i].isSelected=false;
          if(this.view.lblDataInfo11.text==removedCustId){//if its the last tag , the current customer checkbox should be unselected
            this.view.lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
            this.view.lblCheckbox.skin=this.applyCheckboxSkin(this.view.lblCheckbox);
          }else{//if that customer id displayed in the current screen
            for(let x=0;x<relativeCustomers.length;x++){
              if(relativeCustomers[x].lblData1.text===removedCustId){
                relativeCustomers[x].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
                relativeCustomers[x].lblCheckbox.skin=this.applyCheckboxSkin(relativeCustomers[x].lblCheckbox);
                relativeCustomers[x].flxCheckbox.onClick = function(context){self.relatedCustomersCheckboxClick(context,self.selectedCustomers[i])};
                relativeCustomers[x].flxRelatedCustomerRow.onClick = function(){self.addCustomer(self.selectedCustomers[i])};
                this.view.segRelatedCustomers.setData(relativeCustomers);
                break;
              }
            }
          }
          break;
        }        
      }
    }else{
      //to set removed customer checkbox to unselected      
      var segData=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
      for(var i=0;i<segData[0][1].length;i++){
        if(segData[0][1][i].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxSelectedlbl &&segData[0][1][i].custInfo.coreCustomerId===removedCustId){        
          segData[0][1][i].lblCheckbox.text= this.AdminConsoleCommonUtils.checkboxnormallbl;
          segData[0][1][i].lblCheckbox.skin= this.applyCheckboxSkin(segData[0][1][i].lblCheckbox);
          break;
        }
      }
      for(let x=0;x<this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length;x++){
        if(removedCustId===this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust[x].coreCustomerId){
          this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.splice(x,1);
          break;
        }
      }
      segData[0][0].lblCheckbox.text=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length===0?this.AdminConsoleCommonUtils.checkboxnormallbl:this.AdminConsoleCommonUtils.checkboxPartiallbl;
      segData[0][0].lblCheckbox.skin = this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(segData);
      if(this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length===0)
        this.showBulkUpdatePopupScreen1(false);
      this.view.forceLayout();      
    }
  },
  /*
  * FEATURE BULK UPDATE CONTRACT : add select cust/accounts tag
  */
  addAccountsTagContract : function(tagParentFlex,name,id,totalLen){
    var self = this;
    var toCheck =  this.view.btnUpdateInBulkFA.info;
    var dropdowntags = this.view.flxMoreTagsContFA.widgets();
    var tagsCount = tagParentFlex.widgets().length;
    var uniqueId = dropdowntags.length+tagsCount;
    uniqueId =uniqueId.toString();
    uniqueId=uniqueId+"FA";
    var newTextTag = this.view.flxSelectionTag.clone(uniqueId);
    var lblname = uniqueId + "lblTagName1";
    var imgname = uniqueId + "flxCross1";
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(name,"12px Lato-Regular");
    if(this.view.flxContractFA.isVisible && toCheck =="ACCLVL"){
      newTextTag.width = flexWidth + 10 + 10 + 28 + "px";        //labelwidth+left padding+right padding+ cross image width	
      newTextTag[lblname].text = name+ " ("+ id+")";
      newTextTag[lblname].tooltip = name+ " ("+ id+")";
      newTextTag.isVisible = true;        
      newTextTag.info=name;
    } else{
      newTextTag.width = flexWidth + 10 + 10 + 15 + "px";         //labelwidth+left padding+right padding+ cross image width
      newTextTag[lblname].text = name;
      newTextTag[lblname].tooltip = name;
      newTextTag.isVisible = true;
      newTextTag.info=id;
    } 
    tagParentFlex.info.added.push([name,id]);
    var parentWidth=tagParentFlex.frame.width;
    var leftVal=20;
    var topVal=0;
    var lineCount=1;
    for(var a=tagsCount-1;a>=0;a--){
      var i=tagParentFlex.children[a];
      leftVal=leftVal+(tagParentFlex[i].frame.width+15);
      var moreCount = totalLen - tagParentFlex.widgets().length;
      if((leftVal+flexWidth+50 + 80)>parentWidth && moreCount > 1){
        lineCount=lineCount+1;
        //add more tag
        if(dropdowntags.length === 0){
          this.addMoreTagBulkUpdate(tagParentFlex, leftVal, moreCount);
        }
          
      }
    }
    newTextTag.left=leftVal+"px";
    if(lineCount>1 || dropdowntags.length > 0){
      newTextTag.isVisible = true;
      newTextTag.top ="10dp";
      newTextTag.left ="20dp";
      this.view.flxMoreTagsContFA.addAt(newTextTag, -1);
      newTextTag[imgname].onTouchStart = this.removeTagsFromDropdown.bind(this, this.view.flxMoreTagsContFA, tagParentFlex, newTextTag.info);

    }else{
      newTextTag.top=topVal+"px";
      tagParentFlex.addAt(newTextTag, -1);
      newTextTag[imgname].onTouchStart = function (id) {
       /* if(tagParentFlex.id=="flxTagsContainer"&&self.view.flxContractLimits.isVisible&&
           self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length!==0)
          self.showBulkUpdatePopupScreen2();//to refresh features data in the dropdown when any selected customer is removed
        else*/
          self.removeTag(tagParentFlex,id.parent.info);
      };
      tagParentFlex.setVisibility(true);
    }
    
  },
  /*
  * FEATURE BULK UPDATE CONTRACT : add more tag to show dropdown list
  */
  addMoreTagBulkUpdate : function(tagParentFlex, leftVal, count){
    var self =this;
    var moreTag = this.view.flxSelectionTag.clone("MTFA");
    moreTag["MTFAlblTagName1"].text = "+" + count +" More";
    moreTag["MTFAflxCross1"].isVisible =false;
    moreTag.isVisible =true;
    moreTag.top = "0px";
    moreTag.width = "80px";
    moreTag.left = leftVal +"px";
    tagParentFlex.addAt(moreTag, -1);
    moreTag.onClick = function(event,context){
      var top = self.view.flxBulkUpdateBody.frame.y + self.view.flxBulkUpdateTagsContainer.frame.y + self.view.flxTagsContainer.frame.y;
      self.view.flxMoreTagsDropdown.top =  top + 25 +"dp";
      var dropdowntags = self.view.flxMoreTagsContFA.widgets();
      var maxWidth = 100;
      for(var i=0; i<dropdowntags.length; i++){
        if(dropdowntags[i].frame.width > maxWidth)
          maxWidth = dropdowntags[i].frame.width;
      }
      self.view.flxMoreTagsDropdown.right = tagParentFlex.frame.width -(leftVal+100) +10+"dp";
      self.view.flxMoreTagsDropdown.width = maxWidth +40+ "dp";
      self.view.flxMoreTagsDropdown.setVisibility(!self.view.flxMoreTagsDropdown.isVisible);
    }
  },
  /*
  * FEATURE BULK UPDATE CONTRACT : remove tag from dropdown list
  */
  removeTagsFromDropdown : function(dropdownContFlx, tagParentFlex, id, event){
    var tagWidId = event.parent ? event.parent.id : "";
    var totalAccounts = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data[0][1].length;
    var toCheck = this.view.btnUpdateInBulkFA.info;
    if (toCheck == "ACCLVL") {
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][0] === id.split(" ")[0]) {
          tagParentFlex.info.added.splice(x, 1);
        }
      }
      var selAcc = tagParentFlex.info.accIds;
      var accKeys = Object.keys(selAcc);
      for (var y = 0; y < accKeys.length; y++) {
        if (selAcc[accKeys[y]] === id.split(" ")[0])
          delete selAcc[accKeys[y]];
      }
      tagParentFlex.info.accIds = selAcc;
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = Object.keys(selAcc);
    }else if(this.view.flxContractFA.isVisible && toCheck == "CUSTLVL"){
      var selCust = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][1] === id) tagParentFlex.info.added.splice(x, 1);
        
      }
      selCust = selCust.filter(function(custId){
        return custId !== id;
      });
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = selCust;
    }
    dropdownContFlx.remove(this.view[tagWidId]);
     this.view.forceLayout();
     this.view["MTFAlblTagName1"].text = "+" + dropdownContFlx.widgets().length +" More";
    //remove more tag also
    if(dropdownContFlx.widgets().length === 0){
      this.view.flxMoreTagsDropdown.setVisibility(false);
      this.view.flxTagsContainer.remove(this.view["MTFAflxSelectionTag"]);
    }
    this.view.lblSelectedHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts")+" ("+
      (this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length || "0") +")";
  },
  showContractAccountsScreen: function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow3,this.view.verticalTabsContract.btnOption3);
    if(isNextClick)
      this.view.flxContractDetailsTab.setVisibility(false);
    else
      this.hideAllScreens();
    this.view.imgContractAccounts.setVisibility(true);
    this.view.lblNoCustomersSelected.text=kony.i18n.getLocalizedString("i18n.contracts.selectCustomerAccount");
    this.view.flxNoCustomerSelected.setVisibility(true);
    this.view.flxContractAccountsList.setVisibility(false);
    this.view.flxContractAccounts.setVisibility(true);
    this.view.flxContractAccountsSearch.setVisibility(false);
    this.view.tbxAccountsSearch.text="";
    this.view.flxClearAccountsSearch.setVisibility(false);
    this.setCustomersDropDownList("customersDropdown");
    this.view.ContractAccountsList.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + ":";
    this.view.forceLayout();
  },
  showContractFAScreen : function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow4,this.view.verticalTabsContract.btnOption4);
    if(isNextClick)
      this.view.flxContractAccounts.setVisibility(false);
    else
      this.hideAllScreens();
    this.view.imgContractFA.setVisibility(true);
    this.view.lblNoCustomersSelectedFA.text=kony.i18n.getLocalizedString("i18n.contracts.selectCustomerFeatures");
    this.view.flxContractFeaturesToggleButtons.setVisibility(false);
    this.view.flxContractsFATopSection.setVisibility(true);
    this.view.flxAddProductFeaturesBack.setVisibility(false);
    this.view.flxNoCustomerSelectedFA.setVisibility(true);
    this.view.flxContractFAList.setVisibility(false);
    this.view.flxContractAccountFAList.setVisibility(false);
    this.view.flxAddProductFeatures.setVisibility(false);
    this.view.flxFABulkUpdateScreen.setVisibility(false);
    this.view.flxContractFA.setVisibility(true);
    this.view.flxContractFASearch.setVisibility(false);
    this.view.tbxContractFASearch.text="";
    this.view.flxClearContractFASearch.setVisibility(false);
    this.setCustomersDropDownList("customersDropdownFA");
    this.view.lblContractFAHeader.text = "View by Customer";
    this.view.btnUpdateInBulkFA.setVisibility(false);
    this.view.ContractFAList.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomersController.SelectedFeatures") + ":";
    this.view.forceLayout();
  },
  showContractLimitsScreen: function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow5,this.view.verticalTabsContract.btnOption5);
    if(isNextClick)
      this.view.flxContractFA.setVisibility(false);
    else
      this.hideAllScreens();
    this.view.imgContractLimits.setVisibility(true);
    this.view.lblNoCustomersSelectedLimits.text=kony.i18n.getLocalizedString("i18n.contracts.selectCustomerLimits");
    this.view.flxNoCustomerSelectedLimits.setVisibility(true);
    this.view.flxContractLimitsList.setVisibility(false);
    this.view.flxContractLimits.setVisibility(true);
    this.view.flxContractLimitsSearch.setVisibility(false);
    this.view.tbxContractLimitsSearch.text="";
    this.view.flxClearContractLimitsSearch.setVisibility(false);
    this.setCustomersDropDownList("customersDropdownLimits");
    //to store the limits actual values for customers which is used in reset limits page 
    if(Object.keys(this.limitsActualJSON).length === 0){
      var monetaryLimits={};
      var monetaryActions={};
      var actionsJSON={};
      var limitsJSON={};
      for(let w=0;w<this.createContractRequestParam.contractCustomers.length;w++){
        var featuresList=this.createContractRequestParam.contractCustomers[w].features;
        monetaryLimits={};
        for(let x=0;x<featuresList.length;x++){
          var featureId=featuresList[x].id||featuresList[x].featureId;
          if(featuresList[x].type==="MONETARY"&&featuresList[x].actions.length>0){
            monetaryLimits[featureId]={};
            monetaryActions =featuresList[x].actions.filter(function(item) {
              return item.type=="MONETARY";
            });
            for(let b=0;b<monetaryActions.length;b++){
              actionsJSON={};
              limitsJSON={};
              var actionId=monetaryActions[b].actionId||monetaryActions[b].id;
              actionsJSON[actionId]={};
              limitsJSON[monetaryActions[b].limits[0].id]=monetaryActions[b].limits[0].value;
              limitsJSON[monetaryActions[b].limits[1].id]=monetaryActions[b].limits[1].value;
              limitsJSON[monetaryActions[b].limits[2].id]=monetaryActions[b].limits[2].value;
              actionsJSON[actionId]=limitsJSON;
            }
            monetaryLimits[featureId]=actionsJSON;        
          }
        }
        this.limitsActualJSON[this.createContractRequestParam.contractCustomers[w].coreCustomerId]=monetaryLimits;
      }
    }
    this.view.forceLayout();
  },
  showContractSearch : function(currFlex){
    currFlex.setVisibility(false);
    this.view.flxContractServiceTab.setVisibility(true);
    this.view.flxCreateContract.setVisibility(false);
    //    this.view.flxSearchCompanies.setVisibility(true);
    //   this.view.flxNoFilterResults.setVisibility(true);
    //   this.view.segSearchResults.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.btnDropdownList.setVisibility(true);
    this.view.flxSettings.setVisibility(false);
    this.view.flxBreadcrumb.setVisibility(false);

    //add user visibilty changes
    this.view.flxAddUser.setVisibility(false);

    this.view.flxSearchUser.setVisibility(true);
    this.view.flxSearchInner.setVisibility(true);
    this.view.flxUserAdded.setVisibility(true);
    this.view.flxBottomButtonContianer.setVisibility(true);

    this.view.flxEditAddedUserDetails.setVisibility(false);
    this.view.flxEditUserContainer.setVisibility(true);
    this.view.flxAddeUserEditVerticalTabs.setVisibility(true);
    this.view.flxEditUserRightContainer.setVisibility(true);
    this.view.flxAccountTypesFilter.setVisibility(false);

    this.view.forceLayout();
  },
  /*
  * create features card at customer level
  */
  setFeaturesDataCustomers : function(featureData){
    this.view.ContractFAList.lblName.setVisibility(true);
    this.view.ContractFAList.toggleCollapseArrow(true);
    this.view.ContractFAList.flxArrow.setVisibility(false);
    this.view.ContractFAList.flxSelectAllOption.setVisibility(true);
    this.view.ContractFAList.flxCardBottomContainer.setVisibility(true);
    this.view.ContractFAList.flxCheckbox.onClick = this.onSelectAllFeaturesClick.bind(this,this.view.ContractFAList);
    this.setFeaturesAtCustomerLevel(this.view.ContractFAList.segAccountFeatures,featureData);
  },
  /*
  * widget map function for edit user features segment
  * @returns: widget data map for features segment
  */
  getWidgetDataMapForFeatures : function(){
    var widgetMap = {
      "id":"id",
      "isRowVisible":"isRowVisible",
      "flxFeatureNameCont":"flxFeatureNameCont",
      // "lblCheckbox":"lblCheckbox",
      "lblCheckbox":"lblCheckbox",
      "flxCheckbox":"flxCheckbox",
      "lblStatus":"lblStatus",
      "flxStatus":"flxStatus",
      "lblIconStatusTop":"lblIconStatusTop",
      "lblIconStatus":"lblIconStatus",
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "lblTopSeperator":"lblTopSeperator",
      // "lblSectionCheckbox":"lblSectionCheckbox",
      "lblSectionCheckbox":"lblSectionCheckbox",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "lblFeatureName":"lblFeatureName",
      "lblStatusValue":"lblStatusValue",
      "lblBottomSeperator":"lblBottomSeperator",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "flxContractEnrollFeaturesEditSection":"flxContractEnrollFeaturesEditSection",
      "featureData":"featureData"
    };
    return widgetMap;
  },
  /*
  * set features and actions segment data in feature card
  * @param: segment widget path
  */
  setFeaturesAtCustomerLevel : function(segmentPath,featureData){
    var self =this;
    var selectedFeaturesCount=0;
    var custId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    var featuresSegData = featureData.map(function(rec){
      var segRowData = [];
      var actionsArr = rec.actions || rec.permissions;
      var segSecData = {
        "id":rec.id||rec.featureId,
        "lblTopSeperator":{"isVisible":false},
        "flxCheckbox":{"onClick": self.onSectionCheckboxClick.bind(self,segmentPath)},
        //  "lblSectionCheckbox":{"text":this.AdminConsoleCommonUtils.checkboxSelectedlbl},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "flxToggleArrow":{"onClick": self.toggleSegmentSectionArrow.bind(self,segmentPath)},
        "lblFeatureName":rec.name||rec.featureName,
        "lblStatusValue":{"text":rec.status=== "SID_FEATURE_ACTIVE" ||rec.featureStatus=== "SID_FEATURE_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
        "lblIconStatusTop":{"skin":rec.status === "SID_FEATURE_ACTIVE"||rec.featureStatus=== "SID_FEATURE_ACTIVE" ?"sknFontIconActivate":"sknfontIconInactive","text":"\ue921"},
        "lblBottomSeperator":"-",
        "lblAvailableActions":kony.i18n.getLocalizedString("i18n.contracts.availableActions")+": ",
        "lblCountActions":{"text":actionsArr.length},
        "lblSectionCheckbox":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
        "lblCheckboxOptions":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
        "lblTotalActions":"of "+actionsArr.length,
        "featureData":rec,
        "template":"flxContractEnrollFeaturesEditSection"
      };
      var selectedActionsCount=0;
      var dependentActions=[];
      for(var i=0;i < actionsArr.length; i++){
        dependentActions=[];
        var actionlbl=self.AdminConsoleCommonUtils.checkboxSelectedlbl;
        if(actionsArr[i].isEnabled !== undefined){
          actionlbl=actionsArr[i].isEnabled==="true"?self.AdminConsoleCommonUtils.checkboxSelectedlbl:self.AdminConsoleCommonUtils.checkboxnormallbl;
        }
//         if(actionlbl===self.AdminConsoleCommonUtils.checkboxSelectedlbl)
//           selectedActionsCount++;
        if(actionsArr[i].dependentActions&&actionsArr[i].dependentActions.length>0){
          if(typeof actionsArr[i].dependentActions==="string")//as we are getting string format in edit flow and object format in create flow
            dependentActions=(actionsArr[i].dependentActions.substring(1,actionsArr[i].dependentActions.length-1)).split(",");
          else
            dependentActions=actionsArr[i].dependentActions.map(function(rec){return rec.id});
        }
        var rowJson={
          "id":actionsArr[i].id||actionsArr[i].actionId,
          "isRowVisible": false,
          "dependentActions":dependentActions,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false},
          "flxFeatureNameCont":{"isVisible":true},
          "lblCheckbox":{"isVisible":true,"text":actionlbl,"skin":"sknIconBg0066CASz20pxCheckbox"},
          "flxCheckbox":{"onClick":self.onClickFeaturesRowCheckbox.bind(self,segmentPath)},
          "lblFeatureName":{"text":actionsArr[i].name||actionsArr[i].actionName},
          "lblStatus":{"text":actionsArr[i].actionStatus === "SID_ACTION_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
          "lblIconStatus":{"skin":actionsArr[i].actionStatus === "SID_ACTION_ACTIVE"?"sknFontIconActivate":"sknfontIconInactive"},
          "template":"flxContractEnrollFeaturesEditRow",
        };
        //to set partial selection for action incase of customer level features
        /*  var accCount =  self.custActionAccountJSON[custId][rec.actions[i].actionId] ? self.custActionAccountJSON[custId][rec.actions[i].actionId].accountsList.length : 0;
        var availableAccountsCount =  self.custActionAccountJSON[custId][rec.actions[i].actionId] ? self.custActionAccountJSON[custId][rec.actions[i].actionId].availableAccountsCount : 0;
        if(availableAccountsCount>0){
          rowJson.imgCheckbox.src = (availableAccountsCount===accCount)? self.AdminConsoleCommonUtils.checkboxSelected : 
          (accCount!==0&&accCount < availableAccountsCount ? self.AdminConsoleCommonUtils.checkboxPartial : self.AdminConsoleCommonUtils.checkboxnormal);
        }*/
          if(rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl || rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxPartiallbl)
            selectedActionsCount = selectedActionsCount +1;
        rowJson.lblCheckbox.skin = self.applyCheckboxSkin(rowJson.lblCheckbox);
        segRowData.push(rowJson);
      }
      var headerLbl=self.getHeaderCheckboxLabel(segRowData,true, true);
      segSecData.lblSectionCheckbox.text=headerLbl;
      segSecData.lblSectionCheckbox.skin = self.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      segSecData.lblCountActions.text=selectedActionsCount.toString();
      return [segSecData, segRowData];
    });
    segmentPath.widgetDataMap = this.getWidgetDataMapForFeatures();
    segmentPath.rowTemplate="flxContractEnrollFeaturesEditRow";
    segmentPath.setData(featuresSegData);
    this.view.ContractFAList.lblCount.text= this.getSelectedItemsCount(featuresSegData, false);
    this.view.ContractFAList.lblTotalCount.text= "of " + this.getTwoDigitNumber(featuresSegData.length) ;
    this.view.ContractFAList.lblSectionCheckbox.text=self.getHeaderCheckboxLabel(featuresSegData,false, true);
    this.view.ContractFAList.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.ContractFAList.lblSectionCheckbox);
    /*
To validate whether atleast one feature is selected or not
    var isValid = this.validateCheckboxSelections(segmentPath,true);
    if(isValid){
      this.view.flxCustomerDropdownFA.setEnabled(true);
      this.enableAllTabs(true);
    }else{
      this.view.flxCustomerDropdownFA.setEnabled(false);
      this.enableAllTabs(false);
    }
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnNext,false,isValid);
*/
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  applyCheckboxSkin : function(lblPath){

    var skinVal = (lblPath.text== this.AdminConsoleCommonUtils.checkboxnormallbl)?"sknBgB7B7B7Sz20pxCheckbox": "sknIconBg0066CASz20pxCheckbox" ;
    return skinVal;
  },
  onSectionCheckboxClick : function(segmentWidPath,event){
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    var selSecInd = event.rowContext.sectionIndex;
    var segData = segmentWidPath.data;
    var isActionEnabled="false";
    var img = (segData[selSecInd][0].lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    var actionIds=[];
    segData[selSecInd][0].lblSectionCheckbox.text = img;
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    for(var i =0;i<segData[selSecInd][1].length; i++){
      actionIds.push(segData[selSecInd][1][i].id);
      segData[selSecInd][1][i].lblCheckbox.text = img; 
      segData[selSecInd][1][i].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][i].lblCheckbox);
      //segData[selSecInd][1][i].lblCheckbox.skin = img == this.AdminConsoleCommonUtils.checkboxSelectedlbl? "sknIconBg0066CASz20pxCheckbox" : "sknBgB7B7B7Sz20pxCheckbox";
    }
    if(img===this.AdminConsoleCommonUtils.checkboxnormallbl){
      segData[selSecInd][0].lblCountActions.text="0";
    }
    else{
      segData[selSecInd][0].lblCountActions.text=segData[selSecInd][1].length.toString();
    }
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    isActionEnabled=img===this.AdminConsoleCommonUtils.checkboxnormallbl?"false":"true";
    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
        for(var k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          if(this.createContractRequestParam.contractCustomers[j].features[k].featureId===segData[selSecInd][0].id){
            for(var l=0;l<this.createContractRequestParam.contractCustomers[j].features[k].actions.length;l++){
              if(actionIds.includes(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId)){
              this.createContractRequestParam.contractCustomers[j].features[k].actions[l].isEnabled=isActionEnabled;
                this.updateAllAccountLvlActions(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId,selectedCustId,isActionEnabled);
              }
            }
            break;
          }
        }
        break;
      }
    }
    //set image for select all features image
    this.view.ContractFAList.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(segData,false,true);
    this.view.ContractFAList.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.ContractFAList.lblSectionCheckbox);
    this.view.ContractFAList.lblCount.text = this.getSelectedItemsCount(segData, false);
    /*
	var isValid = this.validateCheckboxSelections(segmentWidPath,true);
    if(isValid){
      this.view.flxCustomerDropdownFA.setEnabled(true);
      this.enableAllTabs(true);
    }else{
      this.view.flxCustomerDropdownFA.setEnabled(false);
      this.enableAllTabs(false);
    }
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnNext,false,isValid);
    */
    this.view.forceLayout();
  },
  /*
  * select all features click
  * @param: selected card widget path
  */
  onSelectAllFeaturesClick : function(cardWidgetPath){
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    var segData = cardWidgetPath.segAccountFeatures.data;
    var img = (cardWidgetPath.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    cardWidgetPath.lblSectionCheckbox.text = img;
    cardWidgetPath.lblSectionCheckbox.skin = this.applyCheckboxSkin(cardWidgetPath.lblSectionCheckbox);
    cardWidgetPath.lblCount.text = (img === this.AdminConsoleCommonUtils.checkboxnormallbl ? "0": this.getTwoDigitNumber(segData.length));
    var featureIds=[];
    for(var i=0;i<segData.length; i++){
      segData[i][0].lblSectionCheckbox.text = img;
      segData[i][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[i][0].lblSectionCheckbox);
      segData[i][0].lblCountActions.text=img===this.AdminConsoleCommonUtils.checkboxnormallbl?"0":segData[i][1].length.toString();
      featureIds.push(segData[i][0].id);
      for(var j=0;j<segData[i][1].length; j++){
        segData[i][1][j].lblCheckbox.text = img;
        segData[i][1][j].lblCheckbox.skin = this.applyCheckboxSkin(segData[i][1][j].lblCheckbox);
      }
    }
    var isActionEnabled=img===this.AdminConsoleCommonUtils.checkboxnormallbl?"false":"true";
    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
        for(var k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          if(featureIds.includes(this.createContractRequestParam.contractCustomers[j].features[k].featureId)){
            for(var l=0;l<this.createContractRequestParam.contractCustomers[j].features[k].actions.length;l++){
              this.createContractRequestParam.contractCustomers[j].features[k].actions[l].isEnabled=isActionEnabled;
              this.updateAllAccountLvlActions(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId,selectedCustId,isActionEnabled);
            }
          }
        }
        break;
      }
    }
    cardWidgetPath.segAccountFeatures.setData(segData);
    /*
    //enable/disable save buttons
    var isValid = this.validateSelectionForMultipleCards(cardWidgetPath,"segAccountFeatures",true);
    if(isValid){
      this.view.flxCustomerDropdownFA.setEnabled(true);
      this.enableAllTabs(true);
    }
    else{
      this.view.flxCustomerDropdownFA.setEnabled(false);
      this.enableAllTabs(false);
    }
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnNext,false,isValid);
    */
    this.view.forceLayout();
  },
  /*
  * expand/collapse the rows under a section
  * @param: segment widget path, event
  */
  toggleSegmentSectionArrow : function(segmentWidgetPath,event){
    var segData = segmentWidgetPath.data;
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections
    for(var i=0;i< segData.length;i++){
      segData[i][0].lblTopSeperator.isVisible = false;
      if(selectedSecInd !== i){
        segData[i][0].lblIconToggleArrow.text = "\ue922";
        segData[i][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
        segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
      }
    }
    //update selected section
    if(segData[selectedSecInd][1][0].isRowVisible === false){
      segData[selectedSecInd][0].lblIconToggleArrow.text = "\ue915";
      segData[selectedSecInd][0].lblIconToggleArrow.skin = "sknfontIconDescDownArrow12px";
      segData[selectedSecInd][1] = this.showHideSegRowFlex(segData[selectedSecInd][1],true);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblTopSeperator.isVisible = true;
      }
    } else{
      segData[selectedSecInd][0].lblIconToggleArrow.text = "\ue922";
      segData[selectedSecInd][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][1] = this.showHideSegRowFlex(segData[selectedSecInd][1],false);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblTopSeperator.isVisible = false;
      }
    }
    segmentWidgetPath.setData(segData);
  },
  /*
  * uncheck/check features row checkbox
  * @param: segment widget path, event
  */
  onClickFeaturesRowCheckbox: function(segmentWidPath,event){
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    var selSecInd = event.rowContext.sectionIndex;
    var selRowInd = event.rowContext.rowIndex;
    var segData = segmentWidPath.data;
    var dependentActions=[];
    var updatedActionIds=[];
    var isActionEnabled="true";
    segData[selSecInd][1][selRowInd].lblCheckbox.text = (segData[selSecInd][1][selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    segData[selSecInd][1][selRowInd].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][selRowInd].lblCheckbox);
    updatedActionIds.push(segData[selSecInd][1][selRowInd].id);
    if(segData[selSecInd][1][selRowInd].dependentActions.length>0){
      dependentActions=segData[selSecInd][1][selRowInd].dependentActions;
      for(let x=0;x<dependentActions.length;x++){
        for(let y=0;y<segData[selSecInd][1].length;y++){
          if(segData[selSecInd][1][y].id===dependentActions[x]){
            //segData[selSecInd][1][y].lblCheckbox.text =segData[selSecInd][1][selRowInd].lblCheckbox.text;
            segData[selSecInd][1][y].lblCheckbox.text =segData[selSecInd][1][selRowInd].lblCheckbox.text;
            segData[selSecInd][1][y].lblCheckbox.skin =this.applyCheckboxSkin(segData[selSecInd][1][y].lblCheckbox);
            updatedActionIds.push(segData[selSecInd][1][y].id);
          }
        }
      }
    }
    isActionEnabled=segData[selSecInd][1][selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl?"false":"true";
    var headerChecklbl = this.getHeaderCheckboxLabel(segData[selSecInd][1],true, true);
    segData[selSecInd][0].lblSectionCheckbox.text=headerChecklbl;
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    segData[selSecInd][0].lblCountActions.text = this.getSelectedItemsCount(segData[selSecInd][1], true, false);
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
        for(var k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          for(var l=0;l<this.createContractRequestParam.contractCustomers[j].features[k].actions.length;l++){
            if(updatedActionIds.includes(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId)) {
              this.createContractRequestParam.contractCustomers[j].features[k].actions[l].isEnabled=isActionEnabled;
              this.updateAllAccountLvlActions(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId,selectedCustId,isActionEnabled);
            }
          }
        }
        break;
      }
    }
    //set image for select all features image
    var headerCheckImg = this.getHeaderCheckboxLabel(segData,false,true);
    this.view.ContractFAList.lblSectionCheckbox.text = headerCheckImg;
    this.view.ContractFAList.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.ContractFAList.lblSectionCheckbox);
    this.view.ContractFAList.lblCount.text= this.getSelectedItemsCount(segData, false);
    /*
    var isValid = this.validateCheckboxSelections(segmentWidPath,true);
    if(isValid){
      this.view.flxCustomerDropdownFA.setEnabled(true);
      this.enableAllTabs(true);
    }else{
      this.view.flxCustomerDropdownFA.setEnabled(false);
      this.enableAllTabs(false);
    }
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnNext,false,isValid);
    */
    this.view.forceLayout();
  },
  /*
  * set segment rows visibility
  * @params: rows array, visibility - true/false
  * @return: updated rows data with visibilty
  */
  showHideSegRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      if(rowsData[i].flxContractEnrollFeaturesEditRow){
        rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
      }else{
        rowsData[i].flxAssignLimits.isVisible =visibility;
      }
      rowsData[i].isRowVisible =visibility;
    }
    return rowsData;
  },
  /*
  * create limits card at customer level
  */
  setLimitsDataForCustomer : function(limitsData){
    this.view.ContractLimitsList.flxCardBottomContainer.setVisibility(true);
    this.setLimitsAtCustomerLevel(limitsData);
  },
  /*
  * widget map function for edit user limits segment at customer level
  * @returns: widget data map for limits segment
  */
  getWidgetMapForLimitsCustLevel : function(){
    var widgetMap = {
      "flxContractsLimitsHeaderCreate":"flxContractsLimitsHeaderCreate",
      "flxHeader":"flxHeader",
      "flxActionDetails":"flxActionDetails",
      "flxRow1":"flxRow1",
      "flxToggle":"flxToggle",
      "lblToggle":"lblToggle",
      "lblFeatureName":"lblFeatureName",
      "flxRow2":"flxRow2",
      "lblMonetaryActions":"lblMonetaryActions",
      "lblCountActions":"lblCountActions",
      "flxViewLimitsHeader":"flxViewLimitsHeader",
      "lblActionHeader":"lblActionHeader",
      "flxPerLimitHeader":"flxPerLimitHeader",
      "lblPerLimitHeader":"lblPerLimitHeader",
      "flxLimitInfo1":"flxLimitInfo1",
      "fontIconInfo1":"fontIconInfo1",
      "flxDailyLimitHeader":"flxDailyLimitHeader",
      "lblDailyLimitHeader":"lblDailyLimitHeader",
      "flxLimitInfo2":"flxLimitInfo2",
      "fontIconInfo2":"fontIconInfo2",
      "flxWeeklyLimitHeader":"flxWeeklyLimitHeader",
      "lblWeeklyLimitHeader":"lblWeeklyLimitHeader",
      "flxLimitInfo3":"flxLimitInfo3",
      "fontIconInfo3":"fontIconInfo3",
      "lblFASeperator2":"lblFASeperator2",
      "lblFASeperator1":"lblFASeperator1",
      "lblFASeperatorTop":"lblFASeperatorTop",
      "flxContractsLimitsBodyCreate":"flxContractsLimitsBodyCreate",
      "flxLimitActionName":"flxLimitActionName",
      "flxRangeIcon":"flxRangeIcon",
      "lblIconRangeInfo":"lblIconRangeInfo",
      "flxViewLimits":"flxViewLimits",
      "lblAction":"lblAction",
      "flxPerLimitTextBox":"flxPerLimitTextBox",
      "tbxPerValue":"tbxPerValue",
      "lblCurrencySymbol1":"lblCurrencySymbol1",
      "flxDailyLimitTextBox":"flxDailyLimitTextBox",
      "tbxDailyValue":"tbxDailyValue",
      "lblCurrencySymbol2":"lblCurrencySymbol2",
      "flxWeeklyLimitTextBox":"flxWeeklyLimitTextBox",
      "tbxWeeklyValue":"tbxWeeklyValue",
      "lblCurrencySymbol3":"lblCurrencySymbol3",
      "flxLimitError1":"flxLimitError1",
      "lblLimitError1":"lblLimitError1",
      "lblLimitErrorIcon1":"lblLimitErrorIcon1",
      "flxLimitError2":"flxLimitError2",
      "lblLimitError2":"lblLimitError2",
      "lblLimitErrorIcon2":"lblLimitErrorIcon2",
      "flxLimitError3":"flxLimitError3",
      "lblLimitError3":"lblLimitError3",
      "lblLimitErrorIcon3":"lblLimitErrorIcon3",
      "lblLimitsSeperator":"lblLimitsSeperator",
      "featureId":"featureId",
      "actionId":"actionId",
      "featuresData":"featuresData"
    };
    return widgetMap;
  },
  /*
  * set limits segment data in limits card at account level
  */
  setLimitsAtCustomerLevel : function(featuresData){
    var self=this;
    var segData=[];
    var segHeaderData=[];
    var segBodyData=[];
    var mappedData=[];
    for(var i=0;i<featuresData.length;i++){
      segBodyData=[];
      segHeaderData=this.mapContractLimitsHeader(featuresData[i],i);
      for(var j=0;j<featuresData[i].actions.length;j++){
        segBodyData.push(this.mapContractLimitsBody(featuresData[i].actions[j],featuresData,featuresData[i].id||featuresData[i].featureId));
      }
      segBodyData[j-1].lblLimitsSeperator.isVisible=false;
      //mappedData.push([segHeaderData,segBodyData]);
      segData.push([segHeaderData,segBodyData]);
    }
    this.view.ContractLimitsList.segAccountFeatures.widgetDataMap = this.getWidgetMapForLimitsCustLevel();
    this.view.ContractLimitsList.segAccountFeatures.rowTemplate = "flxContractsLimitsBodyCreate";
    this.view.ContractLimitsList.segAccountFeatures.setData(segData);
    if(this.view.flxContractLimits.info&&this.view.flxContractLimits.info.isValid===false)
      this.validateLimits();
    //this.view.ContractLimitsList.segAccountFeatures.info={"data":mappedData};
    this.view.forceLayout();
  },
  mapContractLimitsHeader : function(feature,limitCount){
    var self=this;
    var actionsArr = feature.actions || feature.permissions;
    return{
      "template":"flxContractsLimitsHeaderCreate",
      "flxToggle":{"onClick":function(){
        self.toggleLimits();
      }
                  },
      "lblToggle":{"text":"\ue922"},//right arrow
      "flxViewLimitsHeader":{"isVisible":false},
      "lblFASeperatorTop":{"isVisible":true},
      "lblFeatureName":{"text":feature.name||feature.featureName},
      "lblMonetaryActions":{"text":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.MonetaryActions")+": "},
      "lblCountActions":{"text":actionsArr.length<10?"0"+actionsArr.length:actionsArr.length},
      "lblActionHeader":{"text":kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP")},
      "lblPerLimitHeader":{"text":kony.i18n.getLocalizedString("i18n.contracts.perTransaction_UC")},
      "flxLimitInfo1":{"onHover" : function(widget, context) {
        var info = kony.i18n.getLocalizedString("i18n.contracts.RangePerInfo")+" " + (feature.name||feature.featureName) + " "+kony.i18n.getLocalizedString("i18n.contracts.RangeMsg");
        self.onHoverCallBack(widget, context,info);
      }
                      },
      "fontIconInfo1":{"text":""},
      "lblDailyLimitHeader":{"text":kony.i18n.getLocalizedString("i18n.contracts.dailyTransaction_UC")},
      "flxLimitInfo2":{"onHover" : function(widget, context) {
        var info = kony.i18n.getLocalizedString("i18n.contracts.RangeDailyInfo")+" " + (feature.name||feature.featureName) + " "+kony.i18n.getLocalizedString("i18n.contracts.RangeMsg");
        self.onHoverCallBack(widget, context,info);
      }
                      },
      "fontIconInfo2":{"text":""},
      "lblWeeklyLimitHeader":{"text":kony.i18n.getLocalizedString("i18n.contracts.weeklyTransaction_UC")},
      "flxLimitInfo3":{"onHover" : function(widget, context) {
        var info = kony.i18n.getLocalizedString("i18n.contracts.RangeWeeklyInfo")+" " + (feature.name||feature.featureName) + " "+kony.i18n.getLocalizedString("i18n.contracts.RangeMsg");
        self.onHoverCallBack(widget, context,info);
      }
                      },
      "fontIconInfo3":{"text":""},
      "featureId":feature.id||feature.featureId,
      "lblFASeperator2":"-",
      "lblFASeperator1":"-"
    };
  },
  mapContractLimitsBody : function(action,featuresData,featureId){
    var self=this;
    var perLimit,dailyLimit,weeklyLimit=0;
    for(var x=0;x<action.limits.length;x++){
      if(action.limits[x].id==="DAILY_LIMIT")
        dailyLimit=action.limits[x].value;
      if(action.limits[x].id==="MAX_TRANSACTION_LIMIT")
        perLimit=action.limits[x].value;
      if(action.limits[x].id==="WEEKLY_LIMIT")
        weeklyLimit=action.limits[x].value;
    }
    var range=action.id?this.monetaryLimits[featureId][action.id]:this.monetaryLimits[featureId][action.actionId];
    return{
      "actionId":action.id||action.actionId,
      "featuresData":featuresData,
      "template":"flxContractsLimitsBodyCreate",
      "flxContractsLimitsBodyCreate":{"isVisible":false},
      "lblAction":{"text":action.name||action.actionName},
      "flxRangeIcon":{"onHover" : function(widget,context){self.showRangeTooltip(widget,context,range);},"info":{"range":range}},
      "lblIconRangeInfo":{"text":"\ue9b9"},
      "flxPerLimitTextBox":{"skin":"sknflxEnterValueNormal"},
      "tbxPerValue":{"text":perLimit},
      "lblCurrencySymbol1":{"text":self.defaultCurrencyCodeSymbol},
      "flxDailyLimitTextBox":{"skin":"sknflxEnterValueNormal"},
      "tbxDailyValue":{"text":dailyLimit},
      "lblCurrencySymbol2":{"text":self.defaultCurrencyCodeSymbol},
      "flxWeeklyLimitTextBox":{"skin":"sknflxEnterValueNormal"},
      "tbxWeeklyValue":{"text":weeklyLimit},
      "lblCurrencySymbol3":{"text":self.defaultCurrencyCodeSymbol},
      "flxLimitError1":{"isVisible":false},
      "lblLimitError1":{"text":""},
      "lblLimitErrorIcon1":{"text":""},
      "flxLimitError2":{"isVisible":false},
      "lblLimitError2":{"text":""},
      "lblLimitErrorIcon2":{"text":""},
      "flxLimitError3":{"isVisible":false},
      "lblLimitError3":{"text":""},
      "lblLimitErrorIcon3":{"text":""},
      "lblLimitsSeperator":{"text":"-","isVisible":true}
    }
  },
  updateLimitValues : function(){
    var selectedCustId=this.view.customersDropdownLimits.lblSelectedValue.info.id;
    var isValid=true;
    var segData=this.view.ContractLimitsList.segAccountFeatures.data?this.view.ContractLimitsList.segAccountFeatures.data:[];
    // To update limit values in global variable
    for(let a=0;a<segData.length;a++){
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
          for(let k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
            if((this.createContractRequestParam.contractCustomers[j].features[k].id&&this.createContractRequestParam.contractCustomers[j].features[k].id===segData[a][0].featureId)||(this.createContractRequestParam.contractCustomers[j].features[k].featureId&&this.createContractRequestParam.contractCustomers[j].features[k].featureId===segData[a][0].featureId)){
              for(var b=0;b<segData[a][1].length;b++){
                for(let l=0;l<this.createContractRequestParam.contractCustomers[j].features[k].actions.length;l++){
                  if((this.createContractRequestParam.contractCustomers[j].features[k].actions[l].id&&this.createContractRequestParam.contractCustomers[j].features[k].actions[l].id===segData[a][1][b].actionId)||
                     (this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId&&this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId===segData[a][1][b].actionId)){
                    this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits[1].value=segData[a][1][b].tbxPerValue.text;
                    this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits[2].value=segData[a][1][b].tbxDailyValue.text;
                    this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits[0].value=segData[a][1][b].tbxWeeklyValue.text;
                    break;
                  }
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
  },
  // To get customer Id's list where there is limit violation
  validateAllLimits : function(){
    var range="";
    var featureId="";
    var actionId="";
    var errorCustIds=[];
    var isRangeValid=true;
    var isValid=true;
    var isEnabled="true";
    this.updateLimitValues();
    for(var x=0;x<this.createContractRequestParam.contractCustomers.length;x++){
      for(let y=0;y<this.createContractRequestParam.contractCustomers[x].features.length;y++){
        if(this.createContractRequestParam.contractCustomers[x].features[y].type==="MONETARY"){
          featureId=this.createContractRequestParam.contractCustomers[x].features[y].featureId;
          for(let z=0;z<this.createContractRequestParam.contractCustomers[x].features[y].actions.length;z++){
            isEnabled=this.createContractRequestParam.contractCustomers[x].features[y].actions[z].isEnabled?this.createContractRequestParam.contractCustomers[x].features[y].actions[z].isEnabled:"true";
            if(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].type==="MONETARY"&&isEnabled==="true"){
              actionId=this.createContractRequestParam.contractCustomers[x].features[y].actions[z].actionId;
              isRangeValid=true;
              range=this.monetaryLimits[featureId][actionId];
              var weekly= this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[0].value!== "" ?parseFloat(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[0].value) : "";
              var daily= this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[2].value !== "" ? parseFloat(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[2].value): "";
              var per= this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[1].value !== "" ? parseFloat(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[1].value) : "";
              if(weekly === "" || weekly>parseFloat(range["WEEKLY_LIMIT"])||weekly<parseFloat(range["MIN_TRANSACTION_LIMIT"])||weekly<daily||weekly<per)
                isRangeValid=false;
              if(per === "" || per>parseFloat(range["MAX_TRANSACTION_LIMIT"])||per<parseFloat(range["MIN_TRANSACTION_LIMIT"])||per>daily)
                isRangeValid=false;
              if(daily === "" || daily>parseFloat(range["DAILY_LIMIT"])||daily<parseFloat(range["MIN_TRANSACTION_LIMIT"]))
                isRangeValid=false;
              if(isRangeValid===false){
                errorCustIds.push(this.createContractRequestParam.contractCustomers[x].coreCustomerId);
                break;
              }
            }
          }
          //if this customer Id is already pushed
          if(errorCustIds.includes(this.createContractRequestParam.contractCustomers[x].coreCustomerId))
            break;
        }
      }
    }
    if(errorCustIds.length>0){
      isValid=false;
      this.view.flxContractLimits.info={"isValid":false};
      if(errorCustIds.length>1){
        this.view.flxLimitsErrorFlag.setVisibility(true);
        this.view.flxContractLimitsContainer.top="55px";
      }else{
        this.view.flxLimitsErrorFlag.setVisibility(false);
        this.view.flxContractLimitsContainer.top="0px"
      }
      this.view.customersDropdownLimits.lblSelectedValue.info={"id":errorCustIds[0]};
      this.setSelectedText("customersDropdownLimits",errorCustIds[0]);
      this.setCustSelectedData("customersDropdownLimits",false);
    }else{
      this.view.flxContractLimits.info={"isValid":true};
      isValid=true;
      this.view.flxLimitsErrorFlag.setVisibility(false);
      this.view.flxContractLimitsContainer.top="0px";
    }
    this.view.forceLayout();
    return isValid;
  },
  validateLimits : function(){
    var errMsg="";
    var isValid=true;
    var segData=this.view.ContractLimitsList.segAccountFeatures.data;
    var range="";
    var errorIndices=[];
    var isSectionValid=true;
    var errorLeft="75%";
    for(var a=0;a<segData.length;a++){
      isSectionValid=true;
      for(var b=0;b<segData[a][1].length;b++){
        range=segData[a][1][b].flxRangeIcon.info.range;
        //per transaction limit validation
        if(segData[a][1][b].tbxPerValue.text === "" || parseFloat(range["MAX_TRANSACTION_LIMIT"])<parseFloat(segData[a][1][b].tbxPerValue.text)||
           parseFloat(range["MIN_TRANSACTION_LIMIT"])>parseFloat(segData[a][1][b].tbxPerValue.text)||
           (parseFloat(segData[a][1][b].tbxPerValue.text)>parseFloat(segData[a][1][b].tbxDailyValue.text)&&
            parseFloat(segData[a][1][b].tbxDailyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"]))){
          isValid=false;
          isSectionValid=false;
          if(segData[a][1][b].tbxPerValue.text === "")
            segData[a][1][b].lblLimitError1.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(parseFloat(range["MAX_TRANSACTION_LIMIT"])<parseFloat(segData[a][1][b].tbxPerValue.text)||
                  parseFloat(range["MIN_TRANSACTION_LIMIT"])>parseFloat(segData[a][1][b].tbxPerValue.text))
            segData[a][1][b].lblLimitError1.text=kony.i18n.getLocalizedString("i18n.contracts.valueShouldBeWithin")+" "+this.defaultCurrencyCodeSymbol+range["MIN_TRANSACTION_LIMIT"]+" - "+this.defaultCurrencyCodeSymbol+range["MAX_TRANSACTION_LIMIT"];          
          else if(parseFloat(segData[a][1][b].tbxPerValue.text)>parseFloat(segData[a][1][b].tbxDailyValue.text) &&
                  parseFloat(segData[a][1][b].tbxDailyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"]))
            segData[a][1][b].lblLimitError1.text=kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");

          segData[a][1][b].flxLimitError1.isVisible=true;
          segData[a][1][b].flxPerLimitTextBox.skin="sknflxEnterValueError";
          segData[a][1][b].lblLimitError1.skin = segData[a][1][b].lblLimitError1.text.indexOf(this.defaultCurrencyCodeSymbol)>-1 ?
            "sknlblErrorIcon12px":"sknlblError";
        }else{
          segData[a][1][b].flxLimitError1.isVisible=false;
          segData[a][1][b].flxPerLimitTextBox.skin="sknflxEnterValueNormal";
        }
        //daily transaction limit validation
        if(segData[a][1][b].tbxDailyValue.text === "" || parseFloat(range["DAILY_LIMIT"])<parseFloat(segData[a][1][b].tbxDailyValue.text)||
           parseFloat(range["MIN_TRANSACTION_LIMIT"])>parseFloat(segData[a][1][b].tbxDailyValue.text)||
           (parseFloat(segData[a][1][b].tbxDailyValue.text)>parseFloat(segData[a][1][b].tbxWeeklyValue.text)&&
            parseFloat(segData[a][1][b].tbxWeeklyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"]))){
          isValid=false;
          isSectionValid=false;
          if(segData[a][1][b].tbxDailyValue.text === "")
            segData[a][1][b].lblLimitError2.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(parseFloat(range["DAILY_LIMIT"])<parseFloat(segData[a][1][b].tbxDailyValue.text)||
                  parseFloat(range["MIN_TRANSACTION_LIMIT"])>parseFloat(segData[a][1][b].tbxDailyValue.text))
            segData[a][1][b].lblLimitError2.text=kony.i18n.getLocalizedString("i18n.contracts.valueShouldBeWithin")+" "+this.defaultCurrencyCodeSymbol+range["MIN_TRANSACTION_LIMIT"]+" - "+this.defaultCurrencyCodeSymbol+range["DAILY_LIMIT"];
          else if(parseFloat(segData[a][1][b].tbxDailyValue.text) > parseFloat(segData[a][1][b].tbxWeeklyValue.text) &&
                  parseFloat(segData[a][1][b].tbxWeeklyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"])){
            segData[a][1][b].lblLimitError2.text= kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
            //to show error on per trans limit
            if(parseFloat(segData[a][1][b].tbxPerValue.text) > parseFloat(segData[a][1][b].tbxWeeklyValue.text) &&
               parseFloat(segData[a][1][b].tbxPerValue.text)<= parseFloat(segData[a][1][b].tbxDailyValue.text)){
              segData[a][1][b].lblLimitError1.text= kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
              segData[a][1][b].flxLimitError1.isVisible=true;
              segData[a][1][b].flxPerLimitTextBox.skin="sknflxEnterValueError";
            }

          }

          segData[a][1][b].flxLimitError2.isVisible=true;
          segData[a][1][b].flxDailyLimitTextBox.skin="sknflxEnterValueError";
          segData[a][1][b].lblLimitError2.skin = segData[a][1][b].lblLimitError2.text.indexOf(this.defaultCurrencyCodeSymbol)>-1 ?
            "sknlblErrorIcon12px":"sknlblError";
        }else{
          segData[a][1][b].flxLimitError2.isVisible=false;
          segData[a][1][b].flxDailyLimitTextBox.skin="sknflxEnterValueNormal";
        }
        //weekly transaction limit validation
        if(segData[a][1][b].tbxWeeklyValue.text === "" || parseFloat(range["WEEKLY_LIMIT"])<parseFloat(segData[a][1][b].tbxWeeklyValue.text)||
           parseFloat(range["MIN_TRANSACTION_LIMIT"])>parseFloat(segData[a][1][b].tbxWeeklyValue.text)){
          isValid=false;
          isSectionValid=false;
          if(segData[a][1][b].tbxWeeklyValue.text === "")
            segData[a][1][b].lblLimitError3.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if(parseFloat(range["WEEKLY_LIMIT"])<parseFloat(segData[a][1][b].tbxWeeklyValue.text)||
                  parseFloat(range["MIN_TRANSACTION_LIMIT"])>parseFloat(segData[a][1][b].tbxWeeklyValue.text))
            segData[a][1][b].lblLimitError3.text=kony.i18n.getLocalizedString("i18n.contracts.valueShouldBeWithin")+" "+this.defaultCurrencyCodeSymbol+range["MIN_TRANSACTION_LIMIT"]+" - "+this.defaultCurrencyCodeSymbol+range["WEEKLY_LIMIT"];
          else
            segData[a][1][b].lblLimitError3.text=kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeGreaterThanDailyLimit");
          segData[a][1][b].flxLimitError3.isVisible=true;
          segData[a][1][b].flxWeeklyLimitTextBox.skin="sknflxEnterValueError";
          segData[a][1][b].lblLimitError3.skin = segData[a][1][b].lblLimitError3.text.indexOf(this.defaultCurrencyCodeSymbol)>-1 ?
            "sknlblErrorIcon12px":"sknlblError";
        }else{
          segData[a][1][b].flxLimitError3.isVisible=false;
          segData[a][1][b].flxWeeklyLimitTextBox.skin="sknflxEnterValueNormal";
        }
      }
      if(isSectionValid===false)
        errorIndices.push(a);
    }
    this.view.ContractLimitsList.segAccountFeatures.setData(segData);
    if(isValid===false){
      this.view.flxContractLimits.info={"isValid":false};
      this.toggleLimits(errorIndices);
    }else{
      this.view.flxContractLimits.info={"isValid":true};
    }
    this.view.forceLayout();
    return isValid;
  },
  resetLimitValues : function(){
    var selectedCustId=this.view.customersDropdownLimits.lblSelectedValue.info.id;
    var segData=this.view.ContractLimitsList.segAccountFeatures.data;
    var featureId="";
    var actionId="";
    var limitId="";
    //should update request param with actual values from limitsActualJSON
    for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
        for(let k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          featureId=this.createContractRequestParam.contractCustomers[j].features[k].id||this.createContractRequestParam.contractCustomers[j].features[k].featureId;
          for(let l=0;l<this.createContractRequestParam.contractCustomers[j].features[k].actions.length;l++){
            if(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits){
              actionId=this.createContractRequestParam.contractCustomers[j].features[k].actions[l].id||this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId;
              for(var m=0;m<this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits.length;m++){
                limitId=this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits[m].id;
                this.createContractRequestParam.contractCustomers[j].features[k].actions[l].limits[m].value=this.limitsActualJSON[selectedCustId][featureId][actionId][limitId];
              }
            }
          }
        }
        this.setCustSelectedData("customersDropdownLimits",false);
        break;
      }
    }
    this.view.forceLayout();
  },
  toggleLimits : function(errIndices){
    var self = this;
    var selectedRowData = [];
    var segData=self.view.ContractLimitsList.segAccountFeatures.data;
    var sectionIndex =self.view.ContractLimitsList.segAccountFeatures.selectedsectionindex;
    var isExpanded=false;
    if(sectionIndex!==null&&sectionIndex!==undefined)
      isExpanded=segData[sectionIndex][0].flxViewLimitsHeader.isVisible?true:false;
    for(let a=0;a<segData.length;a++){
      segData[a][0].lblToggle.text="\ue922";
      segData[a][0].flxViewLimitsHeader.isVisible=false;
      for(let b=0;b<segData[a][1].length;b++)
        segData[a][1][b].flxContractsLimitsBodyCreate.isVisible=false;
    }
    if(errIndices){
      for(let i=0;i<errIndices.length;i++){
        segData[errIndices[i]][0].lblToggle.text="\ue915";
        segData[errIndices[i]][0].flxViewLimitsHeader.isVisible=true;
        for(let j=0;j<segData[errIndices[i]][1].length;j++)
          segData[errIndices[i]][1][j].flxContractsLimitsBodyCreate.isVisible=true;
      }
    }else{
      if(!isExpanded){
        segData[sectionIndex][0].lblToggle.text="\ue915";
        segData[sectionIndex][0].flxViewLimitsHeader.isVisible=true;
        for(let c=0;c<segData[sectionIndex][1].length;c++)
          segData[sectionIndex][1][c].flxContractsLimitsBodyCreate.isVisible=true;
      }else{
        segData[sectionIndex][0].lblToggle.text="\ue922";
        segData[sectionIndex][0].flxViewLimitsHeader.isVisible=false;
        for(let c=0;c<segData[sectionIndex][1].length;c++)
          segData[sectionIndex][1][c].flxContractsLimitsBodyCreate.isVisible=false;
      }
    }
    this.view.ContractLimitsList.segAccountFeatures.setData(segData);
    this.view.forceLayout();
  },
  onHoverCallBack:function(widget, context,info , isViewContractFlow = false , accountsFeaturesCard) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        if(isViewContractFlow){
          scopeObj.showOnHoverInfoViewContract(context, widGetId, info , accountsFeaturesCard);
        }else{
          scopeObj.showOnHvrInfo(context, widGetId, info);
        }
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.ToolTip.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.ToolTip.setVisibility(false);
      }
    }
  },
  showOnHvrInfo: function(featureSegment, widGetId, info) {
    var scopeObj = this;
    var leftVal = 0;
    var topVal=0;
    switch (widGetId) {
      case 'flxLimitInfo1':
        leftVal = featureSegment.pageX;
        topVal = featureSegment.pageY;
        break;
      case 'flxLimitInfo2':
        leftVal = featureSegment.pageX ;
        topVal = featureSegment.pageY;
        break;
      case 'flxLimitInfo3':
        leftVal = featureSegment.pageX ;
        topVal = featureSegment.pageY;
        break;
    }
    topVal +=5;
    leftVal = leftVal - 190;
    scopeObj.view.ToolTip.left = leftVal + "px";
    scopeObj.view.ToolTip.top = topVal + "px";
    scopeObj.view.ToolTip.lblNoConcentToolTip.text = info;
    // scopeObj.view.ToolTip.lblarrow.skin =  "sknfonticonCustomersTooltipFFFFFF";
    scopeObj.view.ToolTip.imgUpArrow.setVisibility(true);
    scopeObj.view.ToolTip.lblarrow.setVisibility(false);

    scopeObj.view.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
    scopeObj.view.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    scopeObj.view.ToolTip.setVisibility(true);
    scopeObj.view.forceLayout();
  },
  showOnHoverInfoViewContract: function(featureSegment, widGetId, info , accountsFeaturesCard) {
    var scopeObj = this;
    let e = document.getElementById('flxContractsLimitsHeaderView_'+widGetId);
    var rect = e.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    // 3 positions based on widget
    scopeObj.view.ToolTip.left = rect.left - 190 + 'px';
    scopeObj.view.ToolTip.top = rect.top +20 + "px";
    scopeObj.view.ToolTip.lblNoConcentToolTip.text = info;
    // scopeObj.view.ToolTip.lblarrow.skin =  "sknfonticonCustomersTooltipFFFFFF";
    scopeObj.view.ToolTip.imgUpArrow.setVisibility(true);
    scopeObj.view.ToolTip.lblarrow.setVisibility(false);  

    scopeObj.view.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
    scopeObj.view.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    scopeObj.view.ToolTip.setVisibility(true);
    scopeObj.view.forceLayout();
  },
  /*
  * widget data map for accounts segment
  * @return: widget data map object
  */
  widgetMapForAccounts : function(){
    var widgetMap = {
      "flxHeaderContainer":"flxHeaderContainer",
      "flxAccountNumCont":"flxAccountNumCont",
      "lblAccountNumber":"lblAccountNumber",
      "lblIconSortAccName":"lblIconSortAccName",
      "flxCheckbox":"flxCheckbox",
      "lblSectionCheckbox":"lblSectionCheckbox",
      "flxAccountType":"flxAccountType",
      "lblAccountType":"lblAccountType",
      "lblIconFilterAccType":"lblIconFilterAccType",
      "lblAccountName":"lblAccountName",
      "flxAccountName":"flxAccountName",
      "lblIconAccNameSort":"lblIconAccNameSort",
      "flxAccountHolder":"flxAccountHolder",
      "lblAccountHolder":"lblAccountHolder",
      "lblIconSortAccHolder":"lblIconSortAccHolder",
      "lblSeperator":"lblSeperator",
      "flxContractEnrollAccountsEditSection":"flxContractEnrollAccountsEditSection",
      "lblCheckbox":"lblCheckbox",
      "flxAccFlag":"flxAccFlag",
      "lblNewText":"lblNewText",
      "fontIconFlag":"fontIconFlag",
      "flxContractEnrollAccountsEditRow":"flxContractEnrollAccountsEditRow"
    };
    return widgetMap;
  },
  setAccountsDataCustomers : function(customerAccounts){
    var self=this;
    var secData = {
      "flxCheckbox":{"onClick": this.onCheckAccountsCheckbox.bind(this,true)},
      "flxAccountNumCont":{"onClick":this.sortAndSetData.bind(this,"lblAccountNumber",this.view.ContractAccountsList.segAccountFeatures, 1)},
      "lblIconSortAccName":"\ue92a",
      "lblAccountNumber":kony.i18n.getLocalizedString("i18.authorizedSignatories.AccountNumber_UC"),
      "lblSectionCheckbox":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknIconBg0066CASz20pxCheckbox"},
      "flxAccountType":{"onClick": this.showFilterForAccountsSectionClick.bind(this,1)},
      "lblAccountType":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE"),
      "lblIconFilterAccType":"\ue916",
      "lblAccountName":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME"),
      "lblIconAccNameSort":"\ue92b",
      "flxAccountName":{"onClick": this.sortAndSetData.bind(this,"lblAccountName", this.view.ContractAccountsList.segAccountFeatures, 1)},
      "flxAccountHolder":{"onClick": this.showFilterForAccountsSectionClick.bind(this,2)},
      "lblAccountHolder":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP"),
      "lblIconSortAccHolder":"\ue916",
      "lblSeperator":"-",
      "template":"flxContractEnrollAccountsEditSection",
    };
    var selectedAccountsCount=0;
    var lblCheckbox={"text":self.AdminConsoleCommonUtils.checkboxnormallbl};
    var rowData = customerAccounts.map(function(account){
      // in edit/create , to check whether has made any selection changes or not
      if(account.isEnabled){
        if(account.isEnabled==="true"||account.isNew==="true"){
          selectedAccountsCount++;
          lblCheckbox.text= self.AdminConsoleCommonUtils.checkboxSelectedlbl;
        }else
          lblCheckbox.text=self.AdminConsoleCommonUtils.checkboxnormallbl;
      }
      else{
        lblCheckbox.text=self.AdminConsoleCommonUtils.checkboxSelectedlbl;
        selectedAccountsCount++;
      }
      return{
        "flxCheckbox":{"onClick":self.onCheckAccountsCheckbox.bind(self,false)},
        "lblCheckbox":{"isVisible":true,"text":lblCheckbox.text,"skin":self.applyCheckboxSkin(lblCheckbox)},
        "lblAccountNumber":account.accountNumber,
        "lblAccountType":account.accountType,
        "lblAccountName":account.accountName,
        "lblAccountHolder":account.ownerType?account.ownerType:"N/A",
        "flxAccFlag":{"isVisible":account.isNew==="true"?true:false},
        "lblNewText":{"text":"New"},
        "fontIconFlag":{"text":""},
        "lblSeperator":"-",
        "template":"flxContractEnrollAccountsEditRow"
      }
    });
    secData.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(rowData,true,true);
    secData.lblSectionCheckbox.skin = this.applyCheckboxSkin(secData.lblSectionCheckbox);
    this.sortBy = this.getObjectSorter("lblAccountNumber");
    this.sortBy.inAscendingOrder = true;
    rowData = rowData.sort(this.sortBy.sortData);
    this.view.ContractAccountsList.segAccountFeatures.widgetDataMap = this.widgetMapForAccounts();
    this.view.ContractAccountsList.segAccountFeatures.rowTemplate="flxContractEnrollAccountsEditRow";
    this.view.ContractAccountsList.segAccountFeatures.setData([[secData,rowData]]);
    this.view.ContractAccountsList.segAccountFeatures.info={"selectedAccountsCount":selectedAccountsCount};
    this.view.ContractAccountsList.lblCount.text= this.getSelectedItemsCount(rowData, true);
    this.view.ContractAccountsList.lblTotalCount.text = "of "+ this.getTwoDigitNumber(rowData.length);
    this.view.forceLayout();
  },
  /*
  * check/uncheck checkbox in accounts tab header
  */
  onCheckAccountsCheckbox : function(isHeader) {
    var selectedCustId=this.view.customersDropdown.lblSelectedValue.info.id;
    var segData = this.view.ContractAccountsList.segAccountFeatures.data;
    var segSecData = segData[0][0];
    var rowsData = segData[0][1];
    var updatedAccIds=[];
    var isEnableDisable="true";
    //on section checkbox click
    if(isHeader){
      var img = (segSecData.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segSecData.lblSectionCheckbox.text = img;
      segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      isEnableDisable=(img === this.AdminConsoleCommonUtils.checkboxnormallbl)?"false":"true";
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].lblCheckbox.text =img;
        rowsData[i].lblCheckbox.skin =this.applyCheckboxSkin(rowsData[i].lblCheckbox);
        updatedAccIds.push(rowsData[i].lblAccountNumber);
      }
      if(img===this.AdminConsoleCommonUtils.checkboxnormallbl)
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=0;
      else
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=rowsData.length;
    } 
    //on row checkbox click
    else{
      var selInd = this.view.ContractAccountsList.segAccountFeatures.selectedRowIndex[1];
      rowsData[selInd].lblCheckbox.text = (rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      rowsData[selInd].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[selInd].lblCheckbox);
      updatedAccIds.push(rowsData[selInd].lblAccountNumber);
      if(rowsData[selInd].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxnormallbl){
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount-1;
        isEnableDisable="false";
      }else{
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount+1;
        isEnableDisable="true";
      }
      segSecData.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(rowsData,true,true);
      segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin(segSecData.lblSectionCheckbox);
    }

    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
          for(let k=0;k<this.createContractRequestParam.contractCustomers[j].accounts.length;k++){
            let accNum = this.createContractRequestParam.contractCustomers[j].accounts[k].accountNumber || this.createContractRequestParam.contractCustomers[j].accounts[k].accountId;
            if(updatedAccIds.includes(accNum)){
              this.createContractRequestParam.contractCustomers[j].accounts[k].isEnabled=isEnableDisable;
            }
          }
          break;
        }
    }
    this.updateAccountSelectionAccLvl(selectedCustId,updatedAccIds,isEnableDisable);
    this.view.ContractAccountsList.segAccountFeatures.setData([[segSecData,rowsData]]);
    this.view.ContractAccountsList.lblCount.text= this.getSelectedItemsCount(rowsData, true);
    var isValid = this.validateCheckboxSelections(this.view.ContractAccountsList.segAccountFeatures,true);
    if(isValid){
      this.view.flxCustomerDropdown.setEnabled(true);
      this.enableAllTabs(true);
    }else{
      this.view.flxCustomerDropdown.setEnabled(false);
      this.enableAllTabs(false);
    }
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractAccounts.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractAccounts.btnNext,false,isValid);
    this.view.forceLayout();
  },
  /*
  * check if all the rows of segment are selected or not
  * @param: rows array, is partial selection behaviour
  * @return: label to be set (checked/unchecked/partial)
  */

  getHeaderCheckboxLabel : function(data,isRowData,hasPartialSelection){
    var lbl = this.AdminConsoleCommonUtils.checkboxnormallbl;
    //var currImg = (isRowData === true) ? "lblCheckbox" :"lblSectionCheckbox";
    var currlbl =(isRowData === true) ? "lblCheckbox" :"lblSectionCheckbox";
    var selCount = 0, partialCount = 0,unselCount = 0;
    for(var i=0; i<data.length; i++){
      var list = (isRowData === true) ? data[i] : data[i][0];
      if(list[currlbl].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl || list[currlbl].text === this.AdminConsoleCommonUtils.checkboxPartiallbl){
        selCount  = selCount +1;
        partialCount = (list[currlbl].text === this.AdminConsoleCommonUtils.checkboxPartiallbl) ? partialCount +1 : partialCount;
      }
    }
    if(hasPartialSelection){
      if(selCount !== 0 && selCount === data.length)
        lbl = partialCount === 0 ? this.AdminConsoleCommonUtils.checkboxSelectedlbl: this.AdminConsoleCommonUtils.checkboxPartiallbl;
      else if(selCount !== 0 && selCount < data.length)
        lbl = this.AdminConsoleCommonUtils.checkboxPartiallbl;
    } else{
      if(selCount === data.length)
        lbl = this.AdminConsoleCommonUtils.checkboxSelectedlbl;
    }
    return lbl;

  },

  setCustomersDropDownList : function(componentName){
    this.view[componentName].btnPrimary.setVisibility(true);//to get its width while calculating its parent flex width
    this.view[componentName].flxNoResult.setVisibility(false);
    var selectedCustomers= this.selectedCustomers;
    var maxLengthText="";
    var data=[];
    var widgetMap={
      "flxCustomerName":"flxCustomerName",
      "flxCustomerNameCont":"flxCustomerNameCont",
      "lblCustomerName":"lblCustomerName",
      "btnPrimaryCustomers":"btnPrimaryCustomers"
    }
    var self=this;
    for(var x=0;x<selectedCustomers.length;x++){
      if(selectedCustomers[x].isSelected!==false){
        if((selectedCustomers[x].coreCustomerName+"("+selectedCustomers[x].coreCustomerId+")").length>maxLengthText.length)
          maxLengthText=selectedCustomers[x].coreCustomerName+"("+selectedCustomers[x].coreCustomerId+")";
        data.push({
          "flxCustomerName": {
            "onClick": function () {
              if (componentName === "customersDropdownLimits" && self.view.flxClearContractLimitsSearch.isVisible) {
                self.updateLimitValues();
              }
              else if (componentName === "customersDropdownFA" && self.view.toggleContractButtonsFeatures.info.selectedTab == 2) {
                self.setSelectedText(componentName);
                self.toggleContractFeaturesAccountLevel();
              }
              else {
                self.setSelectedText(componentName);
                self.setCustSelectedData(componentName, false);
              }
            }
          },
          "id":selectedCustomers[x].coreCustomerId,
          "lblCustomerName":{"text":selectedCustomers[x].coreCustomerName+"("+selectedCustomers[x].coreCustomerId+")"},
          "btnPrimaryCustomers":{"isVisible":selectedCustomers[x].isPrimary==="true"?true:false}
        });
      }
    }
    this.view[componentName].segList.widgetDataMap=widgetMap;
    this.view[componentName].segList.setData(data);
    this.view.forceLayout();//to get the primary button width, calling forceLayout
    this.view[componentName].segList.info={"records":data};
    if(this.view.btnUpdateInBulkFA.info==="ACCLVL"){
      this.view[componentName].lblSelectedValue.text= "Select a Account";
    }else{
    this.view[componentName].lblSelectedValue.text=kony.i18n.getLocalizedString("i18n.contracts.selectACustomer");}
    this.view[componentName].tbxSearchBox.text="";
    this.view[componentName].flxClearSearchImage.setVisibility(false);
    var maxTextWidth=this.AdminConsoleCommonUtils.getLabelWidth(maxLengthText,"13px Lato-Regular");
    var dropdownWidth=maxTextWidth+15+15+this.view[componentName].btnPrimary.frame.width+15;
    if(componentName==="customersDropdownLimits")
      this.view.flxCustomerDropdownLimits.width=dropdownWidth>270?dropdownWidth+"px":"270px";
    else if(componentName==="customersDropdown")
      this.view.flxCustomerDropdown.width=dropdownWidth>270?dropdownWidth+"px":"270px";
    else if(componentName==="customersDropdownFA")
      this.view.flxCustomerDropdownFA.width=dropdownWidth>270?dropdownWidth+"px":"270px";
    else if(componentName==="customerDropdownBulk")
      this.view.flxCustomerDropdownBulk.width=dropdownWidth>270?dropdownWidth+"px":"270px";    this.view[componentName].flxSegmentList.setVisibility(false);
    this.view[componentName].btnPrimary.setVisibility(false);
    this.view.forceLayout();
  },
  isValidSelection : function(){
    var isValid=true;
    if(this.view.flxContractDetailsTab.isVisible){
      isValid=this.validateContractDetails();
    }else if(this.view.flxContractAccounts.isVisible&&this.view.flxContractAccountsList.isVisible&&this.view.ContractAccountsList){
      if(this.view.ContractAccountsList.segAccountFeatures.data[0][0].lblSectionCheckbox.text===this.AdminConsoleCommonUtils.checkboxnormallbl)
        isValid=false;
    }else if(this.view.flxContractLimits.isVisible&&this.view.flxContractLimitsSearch.isVisible){//if there are no limits search will be hidden
      isValid=this.validateAllLimits();
    }
    return isValid;  
  },
  searchCustomersDropDownList : function(componentName){
    var segData=this.view[componentName].segList.info.records;
    var searchText=this.view[componentName].tbxSearchBox.text;
    var custName="";
    var searchResults=segData.filter(function(rec){
      custName=rec.lblCustomerName.text.toLowerCase();
      if(custName.indexOf(searchText)>=0)
        return rec;
    });
    if(searchResults.length===0){
      this.view[componentName].flxNoResult.setVisibility(true);
      this.view[componentName].segList.setVisibility(false);
    }else if(this.view[componentName].flxNoResult.isVisible){
      this.view[componentName].flxNoResult.setVisibility(false);
      this.view[componentName].segList.setVisibility(true);
    }
    this.view[componentName].segList.setData(searchResults);
    this.view[componentName].lblSelectedValue.text=kony.i18n.getLocalizedString("i18n.contracts.selectACustomer");
    this.view[componentName].btnPrimary.setVisibility(false);
    this.view.forceLayout();
  },

  setSelectedText : function(componentName,selectedId){
    var selIndex="";
    var segData=this.view[componentName].segList.data;
    if(selectedId){
      for(let x=0;x<segData.length;x++){
        if(segData[x].id===selectedId){
          selIndex=x;
          break;
        }
      }
    }else{
      selIndex=this.view[componentName].segList.selectedRowIndex[1];
    }
    var isPrimary=segData[selIndex].btnPrimaryCustomers.isVisible?true:false;
    this.view[componentName].lblSelectedValue.text=this.AdminConsoleCommonUtils.getTruncatedString(segData[selIndex].lblCustomerName.text,isPrimary?25:30,isPrimary?22:27);
    this.view[componentName].lblSelectedValue.tooltip=segData[selIndex].lblCustomerName.text;
    this.view[componentName].lblSelectedValue.info={"id":segData[selIndex].id};
    this.view[componentName].btnPrimary.setVisibility(isPrimary);
    this.view[componentName].flxSegmentList.setVisibility(false);
    this.toggleAccountSelectedId= this.view[componentName].lblSelectedValue.info.id ;
    this.view.forceLayout();
  },
  /*
  * show bulk update features/limits popup
  */
  showBulkUpdatePopup: function() {
    var toCheck = this.view.btnUpdateInBulkFA.info ;
    if (this.view.flxContractFA.isVisible && toCheck == "CUSTLVL") {
      // this.setBulkUpdateCustomersList();
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = {
        "added": []
      };
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text = "Update Permissions in Bulk";                
      this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top ="60px";
      this.view.flxBulkUpdateFeaturesPopup.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.lblHeadingScreen1.text= kony.i18n.getLocalizedString("i18n.contracts.selectCustomers_LC");
      this.showBulkUpdatePopupScreen1(false);
      this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxHeaderScreen1.height = "60px";
      this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.top="-30px";
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.placeholder = "Search by Customer Name";
    }
    else if(this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {       
      var accounts = this.accountsBulkUpdate;
      this.setBulkUpdateAccountsList(accounts);
      this.view.bulkUpdateFeaturesLimitsPopup.lblHeadingScreen1.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAccounts");
      this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top="110px";
      this.view.bulkUpdateFeaturesLimitsPopup.flxHeaderScreen1.height = "106px";
      this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.top="0px";
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text = "Update Permissions in Bulk";
      this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.placeholder = "Search by Account Number, Account Name";
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = {
        "added": [], "accIds":{}
      };
      this.view.flxBulkUpdateFeaturesPopup.setVisibility(true);
      //set dropdown text
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.text = this.view.customersDropdownFA.lblSelectedValue.text;
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.btnPrimary.setVisibility(this.view.customersDropdownFA.btnPrimary.isVisible);
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.info = this.view.customersDropdownFA.lblSelectedValue.info;
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setEnabled(false);
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      //cthis.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    }  
    else {  
      this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top="60px";
      this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdateLimitsInBulk");
      this.view.bulkUpdateFeaturesLimitsPopup.lblTitle.text = kony.i18n.getLocalizedString("i18n.contracts.addLimits");
      this.view.bulkUpdateFeaturesLimitsPopup.bulkUpdateAddNewFeatureRow.lblFieldName13.text = kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType");
      this.view.bulkUpdateFeaturesLimitsPopup.bulkUpdateAddNewFeatureRow.flxRow2.isVisible = true;
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewLimits");
      this.view.bulkUpdateFeaturesLimitsPopup.lblRadioGroupTitle.text = kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType");
      this.setRadioGroupData(2);
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = {
        "added": []
      };
      this.view.flxBulkUpdateFeaturesPopup.setVisibility(true);
      this.showBulkUpdatePopupScreen1(false);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, false);
    }      
  },
  
  setRadioGroupDataBulkUpdate : function(opt){
    var radioBtnData=[];
      radioBtnData = [{src:"radio_selected.png", value:"Enable", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"},
                        {src:"radio_notselected.png", value:"Disable", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"}];
    this.view.bulkUpdateAddNewFeatureRow.customRadioButtonGroupCont.flxRadioButton1.width="100px";
    this.view.bulkUpdateAddNewFeatureRow.customRadioButtonGroupCont.flxRadioButton2.width="100px";
    this.view.bulkUpdateAddNewFeatureRow.customRadioButtonGroupCont.setData(radioBtnData);
    this.view.forceLayout();
  },
  setRadioGroupData : function(opt){
    var radioBtnData=[];
    if(opt===1){
      radioBtnData = [{src:"radio_selected.png", value:"Enable", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"},
                      {src:"radio_notselected.png", value:"Disable", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"}];
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton1.width="100px";
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton2.width="100px";
    }else{
      radioBtnData = [{src:"radio_selected.png", value:"Per Transaction", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"},
                      {src:"radio_notselected.png", value:"Daily Transaction", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"},
                      {src:"radio_notselected.png", value:"Weekly Transaction", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"}];
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton1.width="150px";
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton2.width="150px";
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton3.width="150px";
    }
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.setData(radioBtnData);
    this.view.forceLayout();
  },
  /*
  * show bulk update features/limits accounts selection screen
  */
  showBulkUpdatePopupScreen1 : function(isModify){
    this.setBulkUpdateCustomersList();
     this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * show bulk update features/limits screen in popup
  */
  showBulkUpdatePopupScreen2 : function(){
    var flxChildren;
    var toCheck =this.view.btnUpdateInBulkFA.info ;
    if (this.view.flxContractFA.isVisible){
      this.view.lblTitle.setVisibility(false);
      this.view.flxBulkUpdateListContainer.top="0px";
      this.view.lblTitle1.setVisibility(true);
      this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
      this.view.lblNothingSelected.setVisibility(false);
      this.view.flxTagsContainer.setVisibility(true);
      this.view.flxBulkUpdateListContainer.setVisibility(true);
      this.view.flxBulkFANoSelectedCustomer.setVisibility(false);
      this.view.lblIconBulkFAArrow.text="";
      this.view.flxAddNewRowListCont.setVisibility(true);
      this.view.btnAddNewRow.setVisibility(true);
      this.view.btnAddNewRow.text="+ Add New Permissions"
      this.view.flxTagsContainer.info={"added":[],"accIds":{}};
      if(this.view.flxTagsContainer.children.length !=0)
      {
        this.view.btnModifySearch.text= "Modify Selection";
      }
      flxChildren = this.view.flxAddNewRowListCont.widgets();
      this.view.flxAddNewRowListCont.removeAll();
      var segData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
      var selIds =[];
      //update selected row id's
      for(var p=0; p<segData[0][1].length; p++){
        if(segData[0][1][p].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl){
          if(toCheck === "ACCLVL"){
            selIds.push(segData[0][1][p].lblCustomerName.text);
          }else{
           selIds.push(segData[0][1][p].lblCustomerId.text);
          }
        }
      }
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = selIds;
    }else{
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.lblIconArrow.text="";
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info={"added":[]};
      flxChildren = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.removeAll();
    }
    for(var i=0;i<flxChildren.length;i++){
      this.view.remove(this.view[flxChildren[i].id]);
    }
    this.addNewFeatureRowBulkUpdate();
    if(this.view.flxContractFA.isVisible) {
      this.view.flxTagsContainer.removeAll();
      this.view.flxMoreTagsContFA.removeAll();
      this.addBulkUpdateTagsCustAccounts();
      if(this.view.flxTagsContainer.info.added.length !=0){
        this.view.btnModifySearch.text= "Modify Selection";
      }
    }
    ///else if(this.view.toggleContractButtonsFeatures.info.selectedTab != 2){
    else{
      this.addBulkUpdateTags();
    }
    this.view.forceLayout();
    var outerFlex=this.view.flxContractFA.isVisible?this.view.flxFABulkUpdateScreen:this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var parentflex=this.view.flxContractFA.isVisible?this.view.flxBulkUpdateListContainer:this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer;
    var height = outerFlex.frame.height - (70 + parentflex.frame.y + 80);
    parentflex.height = height + "dp";
    this.bulkUpdateList=this.getFeaturesForBulkUpdate();
    this.bulkUpdateListboxData = this.getListForListBox(this.bulkUpdateAllFeaturesList);
    //this.addNewFeatureRowBulkUpdate();

  },
  /*
  * CONTRACT BULK UPDATE : reset features selection on click of enable/disable
  */
  resetFeatureSelection : function(featureRowRef,imgContext){ 
    var currFeatureRowId = featureRowRef.id;
    this.bulkUpdateListboxData = this.getListForListBox(this.bulkUpdateAllFeaturesList);
    var flxChildren = this.view.flxAddNewRowListCont.widgets();
    for (var i = 0; i < flxChildren.length; i++) {
      if(flxChildren[i].id === featureRowRef.id){
        this.view.flxAddNewRowListCont.remove(this.view[flxChildren[i].id]);
        break;
      }
    }
    this.setNewFeatureLimitRowData(featureRowRef,1);
    featureRowRef.customRadioButtonGroupCont.radioButtonOnClick(imgContext);
    this.view.forceLayout();
  },
  resetAddedRows : function(){
    var addNewRowFlex=this.view.flxContractFA.isVisible ? this.view.flxAddNewRowListCont:this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var parentflex=this.view.flxContractFA.isVisible ? this.view.flxBulkUpdateListContainer:this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer;
    var flxChildren = addNewRowFlex.widgets();
    addNewRowFlex.removeAll();
    for(var i=0;i<flxChildren.length;i++){
      this.view.remove(this.view[flxChildren[i].id]);
    }
    var outerFlex=this.view.flxContractFA.isVisible?this.view.flxFABulkUpdateScreen:this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var height = outerFlex.frame.height - (70 + parentflex.frame.y + 80);
    parentflex.height = height + "dp";
    this.bulkUpdateListboxData = this.getListForListBox(this.bulkUpdateAllFeaturesList);
    this.addNewFeatureRowBulkUpdate();
    this.view.forceLayout();
  },
  /*
  * change the fields based on features/limits bulk update
  * @param: opt - feature/limit, row widget path
  */
  setFeatureLimitRowUI : function(opt,widgetPath){
    if(opt === 1){  //for feature
      widgetPath.flxRow2.setVisibility(false);
      widgetPath.lblFieldName13.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PermissionType");
      widgetPath.lstBoxFieldValue13.masterData = [["select","Select a Permission Type"],["ENABLE","Enable"],["DISABLE","Disable"]];
      widgetPath.lstBoxFieldValue13.selectedKey = "select";
    } else{ //for limits
      widgetPath.flxRow2.setVisibility(false);
      widgetPath.lblFieldName21.text = "Value";
      widgetPath.tbxValue21.text="";
      widgetPath.tbxValue21.onKeyUp = function(){
        widgetPath.flxErrorField21.setVisibility(false);
        widgetPath.flxValue21.skin="sknflxEnterValueNormal";
      };
      widgetPath.lstBoxFieldValue13.masterData = [["select","Select a Transaction Type"],["MAX_TRANSACTION_LIMIT","Per Transaction Limit"],
                                                  ["DAILY_LIMIT","Daily Limit"],
                                                  ["WEEKLY_LIMIT","Weekly Limit"]];
      widgetPath.lstBoxFieldValue13.selectedKey = "select";
    }
  },
  /*
  * add new entry for feature selection in bulk update popup
  */
  addNewFeatureRowBulkUpdate : function(){
    var addNewRowFlex=this.view.flxContractFA.isVisible?this.view.flxAddNewRowListCont:this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var outerFlex=this.view.flxContractFA.isVisible?this.view.flxFABulkUpdateScreen:this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var flxChildren = addNewRowFlex.widgets();
    //caluclate the value for id to suffix
    var num = flxChildren.length > 0 ? flxChildren[flxChildren.length-1].id.split("Z")[1] : "0";
    num = parseInt(num,10) +1;
    var id = num > 9 ? ""+num: "0"+num;
    var rowWidth = outerFlex.frame.width - 40;
    var featureRowToAdd = new com.adminConsole.contracts.bulkUpdateAddNewFeatureRow({
      "id": "bulkFeatureRowZ" +id,
      "isVisible": true,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "left":"20dp",
      "width":rowWidth + "dp",
      "top": "20dp"
    }, {}, {});
    if(this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info==="Limits"){
      featureRowToAdd.flxFieldColumn21.isVisible=true;
      featureRowToAdd.skin = "slFbox";
      featureRowToAdd.lblFieldName13.text="Transaction Type";
      this.setNewFeatureLimitRowData(featureRowToAdd,2);
    }else{
      //featureRowToAdd.flxRow1.top="80px";
      featureRowToAdd.lblRadioGroupTitleCont.top = "10px"
      featureRowToAdd.flxRadioGroupCont.left="-10px";
      featureRowToAdd.flxAddNewFeatureContainer.top = "60px";
      //featureRowToAdd.flxRadioGroup.isVisible = true;
      featureRowToAdd.flxRadioGroupCont.top = "0px";
      featureRowToAdd.flxRadioGroupCont.isVisible = true;
      featureRowToAdd.flxFieldColumn21.isVisible = false;
      var radioBtnData = [{
        src: "radio_selected.png",
        value: "Enable",
        selectedImg: "radio_selected.png",
        unselectedImg: "radio_notselected.png"
      }, {
        src: "radio_notselected.png",
        value: "Disable",
        selectedImg: "radio_selected.png",
        unselectedImg: "radio_notselected.png"
      }];
      featureRowToAdd.customRadioButtonGroupCont.setData(radioBtnData);
      featureRowToAdd.customRadioButtonGroupCont.imgRadioButton1.onTouchStart = this.resetFeatureSelection.bind(this,featureRowToAdd);
      featureRowToAdd.customRadioButtonGroupCont.imgRadioButton2.onTouchStart = this.resetFeatureSelection.bind(this,featureRowToAdd);
      featureRowToAdd.lblFieldName13.text = "Permission Type";
      this.setNewFeatureLimitRowData(featureRowToAdd,1);
    }

    //this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.addAt(featureRowToAdd, flxChildren.length);

  },
  /*
  * add new entry for limit selection in bulk update popup
  */
  addNewLimitRowBulkUpdate : function(){
    var addNewRowFlex=this.view.flxContractFA.isVisible?this.view.flxAddNewRowListCont:this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var outerFlex=this.view.flxContractFA.isVisible?this.view.flxFABulkUpdateScreen:this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var flxChildren = addNewRowFlex.widgets();
    //caluclate the value for id to suffix
    var num = flxChildren.length > 0 ? flxChildren[flxChildren.length-1].id.split("Z")[1] : "0";
    num = parseInt(num,10) +1;
    var id = num > 9 ? ""+num: "0"+num;
    var rowWidth = outerFlex.frame.width - 40;
    var limitRowToAdd = new com.adminConsole.contracts.bulkUpdateAddNewFeatureRow({
        "id": "bulkLimitRowZ" +id,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "left":"20dp",
        "width":rowWidth + "dp",
        "top": "20dp"
      }, {}, {});
    limitRowToAdd.flxRow2.isVisible = false;
    limitRowToAdd.flxFieldColumn21.isVisible=true;
    //this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.addAt(limitRowToAdd, flxChildren.length);
    this.setNewFeatureLimitRowData(limitRowToAdd,2);
  },
  /*
  * set data and assign actions to the newly created row
  * @param: new row widget path, option (features:1,limits:2)
  */
  setNewFeatureLimitRowData : function(newRowWidget, option){
    var self = this;
    var addNewRowFlex=option===1?this.view.flxAddNewRowListCont:this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var addNewRowButton=option===1?this.view.btnAddNewRow:this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow;
    var allRows = addNewRowFlex.widgets();
    if(allRows.length === 0){
      newRowWidget.flxDelete.isVisible = false;
    } else{
      allRows[0].flxDelete.isVisible = true;
      newRowWidget.flxDelete.isVisible = true;
    }
    var listboxData = this.getUnselectedFeaturesList();
    newRowWidget.lstBoxFieldValue11.masterData = listboxData;
    newRowWidget.lstBoxFieldValue11.selectedKey = listboxData[0][0];
    newRowWidget.lblCurrencySymbol21.text = this.currencyValue;
    newRowWidget.lblCurrencySymbol22.text = this.currencyValue;
    newRowWidget.zindex=listboxData.length;
    newRowWidget.lstBoxFieldValue11.onSelection = function(){
      newRowWidget.lstBoxFieldValue11.skin="sknLbxborderd7d9e03pxradius";
      newRowWidget.flxErrorField11.setVisibility(false);
      self.updateExistingRowsListboxData(newRowWidget);
      //disable action when feature not selected
      if(newRowWidget.lstBoxFieldValue11.selectedKey === "select"){
        newRowWidget.flxFieldValueContainer12.setEnabled(false);
        newRowWidget.lblFieldValue12.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAnAction");
      } else{
        self.setActionsListboxData(newRowWidget);
      }
    }
    if(listboxData.length<3)//if there is only on feature to be added , that would be added in this widget row so no new row is needed
      addNewRowButton.setVisibility(false);
    else
      addNewRowButton.setVisibility(true);
    newRowWidget.lblFieldValue12.text="Select an action";
    newRowWidget.flxDelete.onClick = this.deleteAddNewFeatureRow.bind(this,newRowWidget);
    this.setFeatureLimitRowUI(option,newRowWidget);
    addNewRowFlex.addAt(newRowWidget, allRows.length);
    this.updateExistingRowsListboxData(newRowWidget);
    this.view.forceLayout();
  },
  setActionsListboxData : function(widgetPath){
    var self=this;
    var allBulkFeatures=this.bulkUpdateList;
    var selectedFeatureId=widgetPath.lstBoxFieldValue11.selectedKey;
    var featureActions=[{"id":"select","name":"Select"}];
    var actionListData=[["select","Select"]];
    var selectionProp = {
      imageIdentifier: "imgCheckBox",
      selectedStateImage: "checkboxselected.png",
      unselectedStateImage: "checkboxnormal.png"
    };
    if(selectedFeatureId!=="select"){
      if(this.view.flxContractFA.isVisible){
        var featureLevel = this.view.btnUpdateInBulkFA.info;
        if(featureLevel === "ACCLVL"){ //to show actions of account level only
          var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
          featureActions = (allBulkFeatures[selectedFeatureId].actions || allBulkFeatures[selectedFeatureId].permissions).filter(function(item) {
            return self.bulkUpdateAccLevelActions[custId][selectedFeatureId].includes(item.actionId);
        });
        } else{
          featureActions=allBulkFeatures[selectedFeatureId].actions || allBulkFeatures[selectedFeatureId].permissions;
        }
        
      }else{
        featureActions = (allBulkFeatures[selectedFeatureId].actions || allBulkFeatures[selectedFeatureId].permissions).filter(function(item) {
          return item.type=="MONETARY";
        });
      }
      widgetPath.lblFieldValue12.text=featureActions.length+ " Selected";
      widgetPath.flxFieldValueContainer12.setEnabled(true);

      widgetPath.flxFieldValueContainer12.onClick = function(){
        widgetPath.flxFieldValueContainer12.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
          widgetPath.flxErrorField12.setVisibility(false);
        if(widgetPath.flxDropdownField12.isVisible)
          widgetPath.flxDropdownField12.setVisibility(false);
        else{
          widgetPath.productTypeFilterMenu.tbxSearchBox.text="";
          var selInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
          widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
          var totalRecords=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices=[[0,selInd]];
          widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
          widgetPath.flxDropdownField12.setVisibility(true);
          self.view.forceLayout();
        }
      }
    }
    var widgetMap = {
      "serviceType": "serviceType",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription",
      "dependentActions": "dependentActions"
    };
    var i=0;
    var maxText="";
    var actionsSegData=featureActions.map(function(action){
      self.bulkUpdateList[selectedFeatureId].actions[i].isChecked=true;
      maxText=action.actionName.length>maxText.length?action.actionName:maxText;
      i=i+1;
      return{
        "actionId": action.actionId,
        "flxSearchDropDown": "flxSearchDropDown",
        "imgCheckBox":{"src":"checkboxselected.png"},
        "lblDescription": action.actionName,
        "dependentActions":action.dependentActions
      }
    });
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.widgetDataMap=widgetMap;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(actionsSegData);
    var maxTextWidth=this.AdminConsoleCommonUtils.getLabelWidth(maxText,"13px Lato-Regular");
    var dropDownWidth=maxTextWidth+15+15+20;
    widgetPath.flxDropdownField12.width=dropDownWidth>widgetPath.flxFieldValueContainer12.frame.width?dropDownWidth+"px":widgetPath.flxFieldValueContainer12.frame.width+"px";
    //to select all the actions by default
    var selectInd=[];
    for(let x=0;x<actionsSegData.length;x++){
      selectInd.push(x);
    }
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selectInd]];
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info={"data":actionsSegData,"selectedIndices":selectInd};

    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      self.bulkActionsRowClick(widgetPath);
    };

    widgetPath.productTypeFilterMenu.tbxSearchBox.onKeyUp = function(){
      if(widgetPath.productTypeFilterMenu.tbxSearchBox.text.trim().length>0){
        self.searchBulkActions(widgetPath);
      }else{
        var selInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
        widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
        widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
        var totalRecords=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
        widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
        widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices=[[0,selInd]];
      }
      self.view.forceLayout();
    };

    widgetPath.productTypeFilterMenu.flxClearSearchImage.onClick = function(){
      widgetPath.productTypeFilterMenu.tbxSearchBox.text="";
      widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
      widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
      var totalRecords=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
      var selInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices=[[0,selInd]];
      self.view.forceLayout();
    };

    widgetPath.flxDropdownField12.onHover = this.onHoverSettings;
    this.view.forceLayout();
  },
  // function to search actions in bulk update popup
  searchBulkActions : function(widgetPath){
    widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(true);
    var segData=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.data;
    var searchText=widgetPath.productTypeFilterMenu.tbxSearchBox.text;
    var actionName="";
    var selIndices=[];
    var selectedRowIndices=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
    var actualData=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
    var selectedActionsIds=[];
    for(let z=0;z<selectedRowIndices.length;z++)
      selectedActionsIds.push(actualData[z].actionId);
    var filteredData=segData.filter(function(rec){
      actionName=rec.lblDescription.toLowerCase();
      if(actionName.indexOf(searchText)>=0)
        return rec;
    });
    if(filteredData.length===0){
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(false);
      widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(true);
    }else{
      for(let x=0;x<filteredData.length;x++){
        if(selectedActionsIds.includes(filteredData[x].actionId))
          selIndices.push(x);
      }
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(filteredData);
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices=[[0,selIndices]];
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(true);
      widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
      widgetPath.forceLayout();
    }
    this.view.forceLayout();
  },
  //function to retain and set selected data on row click of actions segment in bulk update popup
  bulkActionsRowClick: function(widgetPath){
    var self=this;
    var segData=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.data;
    var selInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices?widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices[0][1]:[];
    var selectedIndex=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex?widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex[1]:null;
    if(selInd.length===0&&widgetPath.productTypeFilterMenu.tbxSearchBox.text.length===0)
      widgetPath.lblFieldValue12.text="Select an action";
    else{
      if(widgetPath.productTypeFilterMenu.tbxSearchBox.text.length===0)
        widgetPath.lblFieldValue12.text=selInd.length==1?segData[selInd[0]].lblDescription:selInd.length+" Selected";
      if(widgetPath.flxErrorField12.isVisible){
        widgetPath.flxErrorField12.isVisible=false;
        widgetPath.flxFieldValueContainer12.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      }
      if(widgetPath.productTypeFilterMenu.tbxSearchBox.text.length===0)
        widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices=selInd;
      else{//to update slected indices in info which would be used in retaining the selected indices in search
        var index = widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices.indexOf(selectedIndex);
        if (index > -1) 
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices.splice(index, 1);
        else
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices.push(selectedIndex);
      }
      var feature=self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey];
      var actionsarr = feature.actions || feature.permissions;
      for(let i=0;i<actionsarr.length;i++){
        if(actionsarr[i].actionId===segData[selectedIndex].actionId){
          if(self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey].actions){
             self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey].actions[i].isChecked=(segData[selectedIndex].imgCheckBox.src==="checkboxnormal.png")?false:true;
          }else{
             self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey].permissions[i].isChecked=(segData[selectedIndex].imgCheckBox.src==="checkboxnormal.png")?false:true;
          }
         
        }
      }  
    }    
      self.view.forceLayout();
  },
  /*
  * remove the new row added in bulk update for features
  * @param: widget to remove path
  */
  deleteAddNewFeatureRow : function(widgetPath){
    var delRowSelection = widgetPath.lstBoxFieldValue11.selectedKeyValue;
    if(this.view.flxContractFA.isVisible){
      this.view.flxAddNewRowListCont.remove(this.view[widgetPath.id]);
      this.view.remove(this.view[widgetPath.id]);
    }
    else{
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.remove(this.view.bulkUpdateFeaturesLimitsPopup[widgetPath.id]);
    this.view.bulkUpdateFeaturesLimitsPopup.remove(this.view.bulkUpdateFeaturesLimitsPopup[widgetPath.id]);
  }
    var addedRows = this.view.flxContractFA.isVisible?this.view.flxAddNewRowListCont.widgets():this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    if(addedRows.length === 1){
      addedRows[0].flxDelete.isVisible = false;
    }
    this.updateExistingRowsListboxData({"id":""});
    this.view.flxContractFA.isVisible?this.view.btnAddNewRow.setVisibility(true):this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
  },
  /*
  * update previous rows listbox data on addition of new row
  * @param: current row path
  */
  updateExistingRowsListboxData : function(currRowPath){
    var currRowData;
    var allRows = this.view.flxContractFA.isVisible?this.view.flxAddNewRowListCont.widgets():this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var updatedList = this.getUnselectedFeaturesList();
    for(var i=0;i<allRows.length;i++){
      if(currRowPath.id !== allRows[i].id){
        currRowData = [];
        currRowData.push(allRows[i].lstBoxFieldValue11.selectedKeyValue);
        var lstMasterData = currRowData.concat(updatedList);
        allRows[i].lstBoxFieldValue11.masterData = lstMasterData;
      }
    }
    if(updatedList.length === 0){
      this.view.flxContractFA.isVisible?this.view.btnAddNewRow.setVisibility(false):this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(false);
    }
  },
  /*
  * get unselected features list to set it in remaining rows
  * @returns: unselected features array formated for listbox masterdata
  */
  getUnselectedFeaturesList: function(option) {
    var assignedData = [],
        allFeaturesId = [],diffList = [],commonList = [];
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    //get all assigned feature id's
    if(this.view.flxContractFA.isVisible){//features bulk update list
      rowsList = this.view.flxAddNewRowListCont.widgets()
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select") assignedData.push(rowsList[i].lstBoxFieldValue11.selectedKey);
    }   
    }else{//limits bulk update list
      for (var i = 0; i < rowsList.length; i++) {
        if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select"){
          if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems&&rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems.length===rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.data.length)
            assignedData.push(rowsList[i].lstBoxFieldValue11.selectedKey);
        }
      }
    }
    //all exsisting feature id's
    allFeaturesId = this.bulkUpdateAllFeaturesList.map(function(rec) {
      return rec.featureId;
    });
    //differentiate common and diff id's
    for (var j = 0; j < allFeaturesId.length; j++) {
      if (assignedData.contains(allFeaturesId[j])) {
        commonList.push(allFeaturesId[j]);
      } else {
        diffList.push(allFeaturesId[j]);
      }
    }
    var finalList = this.getListForListBox(diffList);
    return finalList;
  },
  /* 
  * function to return the required features in listbox masterdata format
  * @param: unselected features id's list
  * @retrun: masterdata with given features id's
  */
  getListForListBox: function(data) {
    var self = this;
    var finalList = [["select","Select a Feature"]];
    if(this.view.flxContractFA.isVisible){
      var featureLevel = this.view.btnUpdateInBulkFA.info;
      var bulkUpdateFeatureList = self.bulkUpdateAllFeaturesList;
      
    for (var i = 0; i < self.bulkUpdateAllFeaturesList.length; i++) {
      if(featureLevel === "ACCLVL"){ //to show features of account level only
        var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
        if (data.contains(self.bulkUpdateAllFeaturesList[i].featureId) && 
             this.bulkUpdateAccLevelActions[custId] && this.bulkUpdateAccLevelActions[custId][self.bulkUpdateAllFeaturesList[i].featureId]) {
          finalList.push([self.bulkUpdateAllFeaturesList[i].featureId,self.bulkUpdateAllFeaturesList[i].featureName]);
        }
      } else{
        if (data.contains(self.bulkUpdateAllFeaturesList[i].featureId)) {
          finalList.push([self.bulkUpdateAllFeaturesList[i].featureId,self.bulkUpdateAllFeaturesList[i].featureName]);
        }
      }
     }
    } else{
      var limitFeatures=[];
      var limitActions=[];
      var dataToSet=[];
      for(var a=0;a<self.bulkUpdateAllFeaturesList.length;a++){
        if(self.bulkUpdateAllFeaturesList[a].type==="MONETARY"&&self.bulkUpdateAllFeaturesList[a].actions.length>0&&this.bulkUpdateList[self.bulkUpdateAllFeaturesList[a].featureId]){
          limitFeatures=JSON.parse(JSON.stringify(self.bulkUpdateAllFeaturesList[a]));
          limitActions = self.bulkUpdateAllFeaturesList[a].actions.filter(function(item) {
            return item.type=="MONETARY";
          });
          if(limitActions.length>0){
            limitFeatures.actions=limitActions;
            dataToSet.push(limitFeatures);
          }
        }
      }
      for (var i = 0; i < dataToSet.length; i++) {
      if (data.contains(dataToSet[i].featureId)) {
        finalList.push([dataToSet[i].featureId,dataToSet[i].featureName]);
      }
    }
  }
    return finalList;
  },
  /*
  * to set customers list data to segment
  */
  setBulkUpdateCustomersList : function(customers){
    var customers=this.selectedCustomers;
    var self=this;
    var rowsData=[];
    var dataMap={
      "flxsegCustomersList":"flxsegCustomersList",
      "flxCheckBox":"flxCheckBox",
      "lblCheckbox":"lblCheckbox",
      "lblCustomerId":"lblCustomerId",
      "lblCustomerName":"lblCustomerName",
      "lblSeparator":"lblSeparator",
      "custInfo":"custInfo"
    };
    var secData={
      "template":"flxsegCustomersList",
      "flxsegCustomersList":{"top":"40px"},
      "flxCheckBox":{"onClick":function(){self.toggleBulkCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave);}},
      "lblCheckbox": { "isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox" },
      "lblCustomerId":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID")},
      "lblCustomerName":{"text":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerName_UC")},
      "lblSeparator":{"skin":"sknLblSeparator696C73","isVisible":true}
    }
    var selRowIds = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
    var totalRowsCount =0;
    for (var x = 0; x < customers.length; x++) {
      if (customers[x].isSelected === true) {
        totalRowsCount =  totalRowsCount+1;
        rowsData.push({
          "template": "flxsegCustomersList",
          "flxsegCustomersList":{"top":"40px"},
          "flxCheckBox": { "onClick": function () { self.toggleCustomerCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave,"coreCustomerId"); } },
          "lblCheckbox": { "isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox" },
          "lblCustomerId": { "text": customers[x].coreCustomerId },
          "lblCustomerName": { "text": customers[x].coreCustomerName },
          "lblSeparator": { "skin": "sknLblSeparatore7e7e7", "isVisible": true },
          "custInfo": customers[x]
        });
      }
    }
     secData.lblCheckbox.text = totalRowsCount === selRowIds.length ? this.AdminConsoleCommonUtils.checkboxSelectedlbl :
          selRowIds.length === 0 ?  this.AdminConsoleCommonUtils.checkboxnormallbl :  this.AdminConsoleCommonUtils.checkboxPartiallbl;
     secData.lblCheckbox.skin = this.applyCheckboxSkin(secData.lblCheckbox);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.widgetDataMap=dataMap;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([[secData,rowsData]]);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info={"selectedCust":selRowIds,"secData": secData, "rowsData": rowsData};
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, selRowIds.length > 0);
    this.view.forceLayout();
  },
  toggleBulkCheckbox : function(segmentPath,buttonPath){
    var imgtext=this.AdminConsoleCommonUtils.checkboxnormallbl;
    segmentPath.info.selectedCust=[];
    var segData=segmentPath.data;
    if(segData[0][0].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxnormallbl){
      segData[0][0].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      imgtext=this.AdminConsoleCommonUtils.checkboxSelectedlbl;
    }else{
      segData[0][0].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
    }
    segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
    for(var i=0;i<segData[0][1].length;i++){
      segData[0][1][i].lblCheckbox.text=imgtext;
      segData[0][1][i].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][1][i].lblCheckbox);
      if(imgtext===this.AdminConsoleCommonUtils.checkboxSelectedlbl)
        segmentPath.info.selectedCust.push(segData[0][1][i].custInfo);
    }
    var isValid = segData[0][0].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxnormallbl?false:true;
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(buttonPath,true,isValid);
    segmentPath.setData(segData);
    this.view.forceLayout();
  },
  toggleCustomerCheckbox : function(segmentPath,buttonPath,custId){
    var selCount=0;
    var segData=segmentPath.data;
    var selIndex=segmentPath.selectedRowIndex[1];
    for(var i=0;i<segData[0][1].length;i++){
      if(segData[0][1][i].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxSelectedlbl)
        selCount=selCount+1;
    }
    if(segData[0][1][selIndex].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxnormallbl){
      segData[0][0].lblCheckbox.text=(selCount+1===segData[0][1].length)?this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxPartiallbl;
      segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      segData[0][1][selIndex].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][1][selIndex].lblCheckbox);
      segmentPath.info.selectedCust.push(segData[0][1][selIndex].custInfo);
    }else{
      segData[0][0].lblCheckbox.text=(selCount===1)?this.AdminConsoleCommonUtils.checkboxnormallbl:this.AdminConsoleCommonUtils.checkboxPartiallbl;
      segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[0][1][selIndex].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][1][selIndex].lblCheckbox);
      for(let x=0;x<segmentPath.info.selectedCust.length;x++){
        if(segData[0][1][selIndex].custInfo[custId]===segmentPath.info.selectedCust[x][custId])
          segmentPath.info.selectedCust.splice(x,1);
      }
    }
    segmentPath.setData(segData);
    var isValid = segData[0][0].lblCheckbox.text===this.AdminConsoleCommonUtils.checkboxnormallbl?false:true;
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(buttonPath,true,isValid);
    this.view.forceLayout();
  },
  addBreadcrumb : function(customerInfo){
    var self=this;
    var i=this.view.flxSearchBreadcrumb.widgets();
    var tagsCount=i.length;    
    var id=customerInfo.coreCustomerId;
    var name=customerInfo.coreCustomerName.toUpperCase();
    if(this.view.flxSearchBreadcrumb.info.added.length===0){
      this.view.lblCurrentScreen.info=customerInfo;
      this.view.lblCurrentScreen.text=name;
      this.view.flxSearchBreadcrumb.info.added.push([id,customerInfo.coreCustomerName]);
    }else{
      var newButton = this.view.btnBackToMain.clone(tagsCount.toString());
      var newArrow=this.view.fontIconBreadcrumbsRight.clone(tagsCount.toString());
      var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(name,"12px Lato-Regular");
      newButton.text = JSON.parse(JSON.stringify(this.view.lblCurrentScreen.text));
      newArrow.text="";
      newButton.isVisible = true;
      newArrow.isVisible=true;
      newButton.info=JSON.parse(JSON.stringify(this.view.lblCurrentScreen.info));
      newButton.onClick = function(){
        self.onBreadcrumbClick(newButton.info.coreCustomerId);
      }
      this.view.flxSearchBreadcrumb.info.added.push([this.view.lblCurrentScreen.info,this.view.lblCurrentScreen.text]);
      this.view.lblCurrentScreen.info=customerInfo;
      this.view.lblCurrentScreen.text=name;
      var width=0;
      var parentWidth=this.view.flxPopupHeader.frame.width/2;
      if(this.view.segBreadcrumbs.data.length===0){
        for(var a=tagsCount-1;a>=0;a--){
          width=width+(i[a].frame.width);
          if(i.indexOf("fontIconBreadcrumbsRight")){
            width=width+12;
          }
        }
        if(flexWidth+width>parentWidth){
          if(this.view["3btnBackToMain"]){
            this.setBreadcrumbSegData(JSON.parse(JSON.stringify(this.view["3btnBackToMain"].info)));
          }
          for(var x=5;x<tagsCount;x+2){//as the buttons are created as 3btnBackToMain,3fontIconBreadcrumbsRight,5btnBackToMainbtn...
            this.view[x+"btnBackToMain"].text=this.view[x+1+"btnBackToMain"]?this.view[x+1+"btnBackToMain"].text:newButton.text;
            this.view[x+"btnBackToMain"].info=this.view[x+1+"btnBackToMain"]?this.view[x+1+"btnBackToMain"].info:newButton.info;
          }
          //if only once contract is selected and the width exceeds half width
          if(this.view["3btnBackToMain"]){
            this.view["3btnBackToMain"].text="...";
            this.view["3btnBackToMain"].onClick =function(){
              self.view.flxSegMore.left=self.view["3btnBackToMain"].frame.x-120+"px";
              self.view.flxSegMore.setVisibility(!self.view.flxSegMore.isVisible);
            }
          }
          this.view.flxSearchBreadcrumb.addAt(newButton,tagsCount-1);
          this.view.flxSearchBreadcrumb.addAt(newArrow,tagsCount);
        }else{
          this.view.flxSearchBreadcrumb.addAt(newButton,tagsCount-1);
          this.view.flxSearchBreadcrumb.addAt(newArrow,tagsCount);
        }
      }else{
        var custId=JSON.parse(JSON.stringify(self.view["5btnBackToMain"].info.coreCustomerId));
        var rowData={
          "flxMore":{"onClick":function(){
            self.onBreadcrumbClick(custId);
            self.view.flxSegMore.setVisibility(false);}},
          "lblName":{"text":self.view["5btnBackToMain"].info.coreCustomerName,"skin":"sknLblLatoReg117eb013px","info":self.view["5btnBackToMain"].info},
          "template":"flxMore"
        }
        this.view.segBreadcrumbs.addDataAt(rowData,0);
        for(var x=5;x<tagsCount;x=x+2){//as the buttons are created as 3btnBackToMain,3fontIconBreadcrumbsRight,5btnBackToMainbtn...
          this.view[x+"btnBackToMain"].text=this.view[x+1+"btnBackToMain"]?this.view[x+1+"btnBackToMain"].text:newButton.text;
          this.view[x+"btnBackToMain"].info=this.view[x+1+"btnBackToMain"]?this.view[x+1+"btnBackToMain"].info:newButton.info;
        }
      }
    }
    this.view.forceLayout();
  },
  setBreadcrumbSegData: function(customerInfo){
    var self=this;
    var dataMap={
      "flxMore":"flxMore",
      "lblName":"lblName"
    };
    var segData=[{
      "flxMore":{"onClick":function(){
        self.onBreadcrumbClick(customerInfo.coreCustomerId);
        self.view.flxSegMore.setVisibility(false);
      }},
      "lblName":{"text":customerInfo.coreCustomerName,"skin":"sknLblLatoReg117eb013px","info":customerInfo},
      "template":"flxMore"
    }]
    this.view.segBreadcrumbs.widgetDataMap=dataMap;
    this.view.segBreadcrumbs.setData(segData);
    this.view.forceLayout();
  },
  getCustomersDataMap : function(){
    return{
      "flxRelatedCustomerList":"flxRelatedCustomerList",
      "flxRelatedCustomerRow":"flxRelatedCustomerRow",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "flxCheckbox":"flxCheckbox",
      "lblCheckbox":"lblCheckbox",
      "flxContractDetails":"flxContractDetails",
      "flxContractName":"flxContractName",
      "lblContractName":"lblContractName",
      "lblContractId":"lblContractId",
      "flxDetails":"flxDetails",
      "flxColumn1":"flxColumn1",
      "lblHeading1":"lblHeading1",
      "lblData1":"lblData1",
      "flxColumn2":"flxColumn2",
      "lblHeading2":"lblHeading2",
      "lblData2":"lblData2",
      "flxColumn3":"flxColumn3",
      "lblHeading3":"lblHeading3",
      "lblData3":"lblData3",
      "flxRightDetailsCont":"flxRightDetailsCont",
      "flxContractRelation":"flxContractRelation",
      "btnRelation":"btnRelation",
      "lblContractInfo":"lblContractInfo",
      "flxRightActionCont":"flxRightActionCont",
      "flxRemoveContract":"flxRemoveContract",
      "lblIconRemove":"lblIconRemove",
      "lblLine":"lblLine",
      "lblPrimaryText":"lblPrimaryText",
      "flxPrimaryBtn":"flxPrimaryBtn",
      "imgRadioButton":"imgRadioButton",
      "customerInfo":"customerInfo"
    };
  },
  setCustomerSearchData : function(customers){
    var dataMap=this.getCustomersDataMap();
    var self=this;
    this.view.lblRelatedcustSubHeading.setVisibility(true);
    this.view.lblRelatedcustSubHeading.text=kony.i18n.getLocalizedString("i18n.contracts.searchResults")+" ("+customers.length+")";
    var details={};
    var address="";
    var data=customers.map(function(customer){
      if(customer.city!==undefined||customer.country!==undefined)
        address=self.AdminConsoleCommonUtils.getAddressText(customer.city,customer.country);
      else
        address="N/A";
      details ={
        "id": customer.coreCustomerId,
        "name": customer.coreCustomerName,
        "industry":customer.industry?customer.industry:"N/A",
        "email": customer.email,
        "phone":customer.phone,
        "address": address
      };
      return{
        "template":"flxRelatedCustomerList",
        "flxCheckbox":{"isVisible":false},
        "imgCheckbox":{"src":"checkboxnormal.png"},
        "flxRelatedCustomerRow":{"skin":customer.isAssociated==="true"?"sknFlxbgF3F3F3bdrd7d9e0":"sknFlxbgFFFFFFbdrD7D9E0rd4px",
                                 "hoverSkin":customer.isAssociated==="true"?"sknFlxbgF3F3F3bdrd7d9e0":"sknFlxbgFFFFFFbdrd7d9e0Hover",
                                 "onClick":customer.isAssociated==="true"?function(){}:function(){
                                   self.addCustomer(customer);
                                 }},
        "lblContractName":{"onTouchStart":self.showCustomerDetailsPopup.bind(self,details,true),"text":customer.coreCustomerName},
        "lblContractId":customer.coreCustomerId,
        "lblHeading1":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID")},
        "lblData1":{"text":customer.coreCustomerId},
        "flxColumn2":{"left":"36%"},
        "lblHeading2":{"text":kony.i18n.getLocalizedString("i18n.View.ADDRESS")},
        "lblData2":{"text":address},
        "flxColumn3":{"isVisible":false},
        "flxRightDetailsCont":{"isVisible":customer.isAssociated==="true"?true:false},
        "lblContractInfo":{"text":"Part of another contract","isVisible":customer.isAssociated==="true"?true:false},
        "btnRelation":{"isVisible":false},
        "flxRightActionCont":{"isVisible":false},
        "flxPrimaryBtn":{"isVisible":false},
        "customerInfo":customer
      }
    });
    this.view.segRelatedCustomers.widgetDataMap=dataMap;
    this.view.segRelatedCustomers.setData(data);
    this.view.flxRelatedCustomerSegment.setVisibility(true);
    this.view.forceLayout();
  },
  setSelectedCustomerData : function(relatedCustomers,coreCustomerId){
    var selectedCustIndex=this.view.segRelatedCustomers.selectedRowIndex[1];
    var customerInfo;
    var address="N/A";
    if(this.view.flxCustomerSearchPopUp.info.action!=="BREADCRUMBCLICK"){
      customerInfo=this.view.segRelatedCustomers.data[selectedCustIndex].customerInfo;
      var isAdded=false;
      for(var i=0;i<this.selectedCustomers.length;i++){
        if(this.selectedCustomers[i].coreCustomerId===customerInfo.coreCustomerId){
          isAdded=true;
          if(this.selectedCustomers[i].isSelected===false)
            this.selectedCustomers[i].isSelected=true;
        }
      }
      if(isAdded===false){
        customerInfo.isSelected=true;
        this.selectedCustomers.push(customerInfo);
      }
    }else{
      for(var i=0;i<this.selectedCustomers.length;i++){
        if(coreCustomerId===this.selectedCustomers[i].coreCustomerId){
          customerInfo=this.selectedCustomers[i];
        }
      }
    }
    if(customerInfo.city!==undefined||customerInfo.country!==undefined)
      address=this.AdminConsoleCommonUtils.getAddressText(customerInfo.city,customerInfo.country);
    else
      address="N/A";
    this.view.lblCheckbox.text=customerInfo.isSelected!==false?this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxnormallbl;
    this.view.lblCheckbox.skin = this.applyCheckboxSkin(this.view.lblCheckbox);
    this.view.lblContractName.text=customerInfo.coreCustomerName;
    this.view.lblContractId.text=customerInfo.coreCustomerId;
    this.view.lblDataInfo11.text=customerInfo.coreCustomerId;
    this.view.lblDataInfo12.text=address.trim().length==0?"N/A":address;
    this.view.lblDataInfo13.text=customerInfo.industry?customerInfo.industry:"N/A";
    this.view.lblDataInfo21.text=customerInfo.email?customerInfo.email:"N/A";
    this.view.lblDataInfo22.text=customerInfo.phone?customerInfo.phone:"N/A";
    this.view.flxAddedCustomerInfo.setVisibility(true);
    if(relatedCustomers.length>0){
      this.view.lblRelatedcustSubHeading.text=kony.i18n.getLocalizedString("i18n.contracts.relatedCustomers")+" ("+relatedCustomers.length+")";
      var self=this;
      var isAdded=false;
      var details={};
      var addressText="";
      var relatedCustData=relatedCustomers.map(function(customer){
        isAdded=false;
        for(var i=0;i<self.selectedCustomers.length;i++){
          if(self.selectedCustomers[i].coreCustomerId===customer.coreCustomerId&&self.selectedCustomers[i].isSelected)
            isAdded=true;
        }
        if(customer.city!==undefined||customer.country!==undefined)
          addressText=self.AdminConsoleCommonUtils.getAddressText(customer.city,customer.country);
        else
          addressText="N/A";
        details ={
          "id": customer.coreCustomerId,
          "name": customer.coreCustomerName,
          "industry":customer.industry?customer.industry:"N/A",
          "email": customer.email,
          "phone":customer.phone,
          "address": addressText
        };
        return{
          "template":"flxRelatedCustomerList",
          "flxCheckbox":{"isVisible":true,"onClick":(customer.isAssociated==="true")?function(){}:function(context){self.relatedCustomersCheckboxClick(context,customer)}},
          "lblCheckbox":{"isVisible":true,"text":isAdded?self.AdminConsoleCommonUtils.checkboxSelectedlbl:self.AdminConsoleCommonUtils.checkboxnormallbl},
          "flxRelatedCustomerRow":{"skin":customer.isAssociated==="true"?"sknFlxbgF3F3F3bdrd7d9e0":"sknFlxbgFFFFFFbdrD7D9E0rd4px",
                                   "hoverSkin":customer.isAssociated==="true"?"sknFlxbgF3F3F3bdrd7d9e0":"sknFlxbgFFFFFFbdrd7d9e0Hover",
                                   "onClick":(customer.isAssociated==="true")?function(){}:function(){
                                     var isBreadcrumb=false;
                                     for(let x=0;x<self.view.flxSearchBreadcrumb.info.added.length;x++){
                                       if(self.view.flxSearchBreadcrumb.info.added[x][0]===customer.coreCustomerId){
                                         isBreadcrumb=true;
                                       }
                                     }
                                     if(isBreadcrumb===true)
                                       self.onBreadcrumbClick(customer.coreCustomerId);           
                                     else
                                       self.addCustomer(customer);
                                   }
                                  },
          "lblContractName":{"onTouchStart":self.showCustomerDetailsPopup.bind(self,details,true),"text":customer.coreCustomerName},
          "lblContractId":customer.coreCustomerId,
          "lblHeading1":{"text":"CUSTOMER ID"},
          "lblData1":{"text":customer.coreCustomerId},
          "flxColumn2":{"left":"37%"},
          "lblHeading2":{"text":"ADDRESS"},
          "lblData2":{"text":addressText},
          "flxColumn3":{"isVisible":false},
          "flxContractRelation":{"isVisible":false},
          "flxRightDetailsCont":{"isVisible":true},
          "btnRelation":{"isVisible":true,"text":customer.relationshipName},
          "lblContractInfo":{"text":kony.i18n.getLocalizedString("i18n.contracts.partOfAnotherContract"),"isVisible":customer.isAssociated==="true"?true:false},
          "flxRightActionCont":{"isVisible":true},
          "customerInfo":customer
        }
      });
      this.view.segRelatedCustomers.setData(relatedCustData);
      this.view.flxNoCustomersSearched.setVisibility(false);
      this.view.lblRelatedcustSubHeading.setVisibility(true);
      this.view.flxRelatedCustomerSegment.setVisibility(true);
    }else{
      this.view.lblNoCustomersSearched.text=kony.i18n.getLocalizedString("i18n.contracts.noRelatedCustomers");
      this.view.flxNoCustomersSearched.setVisibility(true);
      this.view.lblRelatedcustSubHeading.setVisibility(true);
      this.view.lblRelatedcustSubHeading.text=kony.i18n.getLocalizedString("i18n.contracts.relatedCustomers")+" (0)";
      this.view.flxRelatedCustomerSegment.setVisibility(false);
    }
    this.view.flxSelectedCustomerInfo.setVisibility(true);
    this.view.flxLoading2.setVisibility(false);
    this.view.forceLayout();
  },
  relatedCustomersCheckboxClick : function(context){
    var selIndex=context.rowContext.rowIndex;
    var segData=this.view.segRelatedCustomers.data;
    var customer=segData[selIndex].customerInfo;
    var tags=this.view.flxSearchFilter.widgets();
    var isAdded=false;
    for(var x=0;x<this.selectedCustomers.length;x++){
      if(this.selectedCustomers[x].coreCustomerId===customer.coreCustomerId){
        isAdded=true;
        if(this.selectedCustomers[x].isSelected===false)
          this.selectedCustomers[x].isSelected=true;
        break;
      }
    }
    if(segData[selIndex].lblCheckbox.text==="\ue966"){
      if(isAdded){
        this.selectedCustomers[x].isSelected=true;
      }else{
        customer.isSelected=true;
        this.selectedCustomers.push(customer);
      }
      this.addCustomerTag(this.view.flxSearchFilter,this.selectedCustomers[x].coreCustomerName,this.selectedCustomers[x].coreCustomerId);
      segData[selIndex].lblCheckbox.text="\ue965";
      segData[selIndex].lblCheckbox.skin=this.applyCheckboxSkin(segData[selIndex].lblCheckbox);
    }else{
      segData[selIndex].lblCheckbox.text="\ue966";
      segData[selIndex].lblCheckbox.skin=this.applyCheckboxSkin(segData[selIndex].lblCheckbox);
      this.selectedCustomers[x].isSelected=false;
      this.removeTag(this.view.flxSearchFilter,this.selectedCustomers[x].coreCustomerId);
      if(tags.length===1){
        this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave,true,false);
        this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnNext,false,false);
      }
    }
    this.view.segRelatedCustomers.setData(segData);
    this.view.forceLayout();
  },
  setSelectedCustomersData: function(){
    var customersData=this.selectedCustomers;
    var dataMap=this.getCustomersDataMap();
    var self=this;
    var details={};
    var relatedCustData=[];
    var primaryIndex="";
    var address="";
    for(var x=0;x<customersData.length;x++){
      if(customersData[x].isSelected!==false){
        if(customersData[x].city||customersData[x].country)
          address=this.AdminConsoleCommonUtils.getAddressText(customersData[x].city,customersData[x].country);
        else
          address="N/A";
        details ={
          "id": customersData[x].coreCustomerId,
          "name": customersData[x].coreCustomerName,
          "industry":customersData[x].industry?customersData[x].industry:"N/A",
          "email": customersData[x].email,
          "phone":customersData[x].phone,
          "address": address
        };
        if(this.action===this.actionConfig.edit&&customersData[x].isPrimary==="true")
          primaryIndex=x;
        relatedCustData.push({
          "template":"flxRelatedCustomerList",
          "lblContractName":{"onTouchStart":self.showCustomerDetailsPopup.bind(self,details,false),"text":customersData[x].coreCustomerName},
          "lblContractId":customersData[x].coreCustomerId,
          "lblHeading1":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID")},
          "lblData1":{"text":customersData[x].coreCustomerId},
          "flxColumn2":{"left":"37%"},
          "lblHeading2":{"text":kony.i18n.getLocalizedString("i18n.View.ADDRESS")},
          "lblData2":{"text":address},
          "flxColumn3":{"isVisible":false},
          "flxContractRelation":{"isVisible":false},
          "flxRightActionCont":{"isVisible":true},
          "flxRemoveContract":{"enable":true,"isVisible":true,"onClick":function(context){self.deleteCoreCustomer(context)},"onHover":function(){}},
          "lblIconRemove":{"text":"","skin":"sknIcon00000015px"},
          "lblLine":{"isVisible":true},
          "lblPrimaryText":{"text":kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblprimary1")},
          "flxPrimaryBtn":{"onClick":function(context){self.setCustomerAsPrimary(context)}},
          "imgRadioButton":{"src":"radio_notselected.png"},
          "customerInfo":customersData[x]
        });
      };
    }
    this.view.segAddedCustomers.widgetDataMap=dataMap;
    if(relatedCustData.length===1){
      relatedCustData[0].flxRemoveContract.isVisible=false;
      relatedCustData[0].lblLine.isVisible=false;
    }
    this.view.segAddedCustomers.setData(relatedCustData);
    this.view.lblContractCustomersHeader.text=kony.i18n.getLocalizedString("i18n.contracts.summarySelectedCustomers")+" ("+relatedCustData.length+")";
    if(this.action===this.actionConfig.edit)
      relatedCustData[0].flxPrimaryBtn.onClick({rowContext:{rowIndex:primaryIndex}});
    else
      relatedCustData[0].flxPrimaryBtn.onClick({rowContext:{rowIndex:0}});
    this.view.forceLayout();
  },
  deleteCoreCustomer : function(context){
    var selIndex=context.rowContext.rowIndex;
    var segData=this.view.segAddedCustomers.data;
    var customer=segData[selIndex].customerInfo;
    var isDeleted=false;
    var self=this;
    for(let x=0;x<this.selectedCustomers.length;x++){
      if(this.selectedCustomers[x].coreCustomerId===customer.coreCustomerId){
        this.selectedCustomers.splice(x,1);
        this.view.segAddedCustomers.removeAt(selIndex,0);
        isDeleted=true;
        this.view.lblContractCustomersHeader.text=kony.i18n.getLocalizedString("i18n.contracts.summarySelectedCustomers")+" ("+this.view.segAddedCustomers.data.length+")";
        break;
      }
    }
    // add delete customer to payload
    var alreadyAssignedCust = this.completeContractDetails.contractCustomers.filter(function(cust){
      return cust.coreCustomerId === customer.coreCustomerId;
    });
    if(alreadyAssignedCust.length > 0){
      this.createContractRequestParam.deletedCustomers.push({"coreCustomerId":customer.coreCustomerId});
    }
    for(let y=0;y<this.createContractRequestParam.contractCustomers.length;y++){
      if(this.createContractRequestParam.contractCustomers[y].coreCustomerId===customer.coreCustomerId){
        this.createContractRequestParam.contractCustomers.splice(y,1);
        break;
      }
    }
    if(isDeleted){
      for(let x=0;x<this.view.segAddedCustomers.data.length;x++){
        if(this.view.segAddedCustomers.data[x].imgRadioButton.src==="radio_selected.png"){
          this.view.segAddedCustomers.data[x].flxPrimaryBtn.onClick({rowContext:{rowIndex:x}});
          break;
        }
      }
    }

    if(this.view.segAddedCustomers.data.length===1){
      segData=this.view.segAddedCustomers.data[0];
      segData.flxRemoveContract.isVisible=false;
      segData.lblLine.isVisible=false;
      this.view.segAddedCustomers.setDataAt(segData,0);
    }
    this.view.forceLayout();
  },
  showPrimaryDeleteHover : function(widget,context){
    var scopeObj = this;
    var widGetId = widget.id;
    var topVal=0;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        topVal=context.screenY-125;
        scopeObj.view.ToolTipDelete.top=topVal+"px";
        scopeObj.view.ToolTipDelete.setVisibility(true)
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.ToolTipDelete.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.ToolTipDelete.setVisibility(false);
      }
    }
    scopeObj.view.forceLayout();
  },
  setCustomerAsPrimary : function(contextObj){
    var self=this;
    var segData=this.view.segAddedCustomers.data;
    for(var x=0;x<this.selectedCustomers.length;x++)
      this.selectedCustomers[x].isPrimary="false";
    if(contextObj.rowContext.rowIndex !== ""){
    this.selectedCustomers[contextObj.rowContext.rowIndex].isPrimary="true";
    for(let i=0;i<this.createContractRequestParam.contractCustomers.length;i++){
      if(this.createContractRequestParam.contractCustomers[i].coreCustomerId===this.selectedCustomers[contextObj.rowContext.rowIndex].coreCustomerId)
        this.createContractRequestParam.contractCustomers[i].isPrimary="true";
      else
        this.createContractRequestParam.contractCustomers[i].isPrimary="false";
    }
    for(let a=0;a<segData.length;a++){
      segData[a].imgRadioButton.src="radio_notselected.png";
      segData[a].flxRemoveContract.onClick=function(context){self.deleteCoreCustomer(context)};
      segData[a].flxRemoveContract.onHover=function(){};
      segData[a].lblIconRemove.skin="sknIcon00000018px";
    }
    segData[contextObj.rowContext.rowIndex].imgRadioButton.src="radio_selected.png";
    segData[contextObj.rowContext.rowIndex].flxRemoveContract.onClick=function(){};
    segData[contextObj.rowContext.rowIndex].lblIconRemove.skin="sknIconb2b2b218px";
    segData[contextObj.rowContext.rowIndex].flxRemoveContract.onHover=function(widget,context){
      context.rowIndex=contextObj.rowContext.rowIndex;
      self.showPrimaryDeleteHover(widget,context);
    };
    this.primaryContractCustomer=segData[contextObj.rowContext.rowIndex].customerInfo;
    this.view.segAddedCustomers.setData(segData);
    this.setCustomersDropDownList("customersDropdown");
    this.setCustomersDropDownList("customersDropdownFA");
    this.setCustomersDropDownList("customersDropdownLimits");
    if(this.action===this.actionConfig.create&&this.createContractRequestParam.contractCustomers.length===0){
      var coreCustomerIdList=[];
      for(var x=0;x<this.selectedCustomers.length;x++){
        if(this.selectedCustomers[x].isSelected!==false){
          coreCustomerIdList.push(this.selectedCustomers[x].coreCustomerId);
          this.createContractRequestParam.contractCustomers.push({
            "isPrimary": this.selectedCustomers[x].isPrimary?this.selectedCustomers[x].isPrimary:"false",
            "coreCustomerId": this.selectedCustomers[x].coreCustomerId,
            "coreCustomerName": this.selectedCustomers[x].coreCustomerName,
            "isBusiness": this.selectedCustomers[x].isBusiness,
            "sectorId": this.selectedCustomers[x].sectorId,
            "accounts":[],
            "features":[],
            "isVisited":true
          });
        }
      }
      //this.presenter.getCoreCustomerAccounts({"coreCustomerIdList":coreCustomerIdList});
      var serviceDefId= this.view[this.selectedServiceCard].lblCategoryName.info.catId;
      //this.presenter.getServiceDefinitionFeaturesAndLimits({"serviceDefinitionId":serviceDefId});
      var inputPayload = {
        "accountsPayload": {"coreCustomerIdList":coreCustomerIdList,
                            "legalEntityId":this.selectedEntityCard},
        "featuresPayload": {"serviceDefinitionId":serviceDefId,
                            "legalEntityId":this.selectedEntityCard
                            }
      }
      this.presenter.fetchAccountsSDFeaturesLimits(inputPayload, this.formName);
    }else if(this.action===this.actionConfig.edit){
      var fetchAccFlag = false, fetchFeaturesFlag = false;
      var coreCustomerIdList=[];
      if(this.createContractRequestParam.contractCustomers.length===0){
        //var coreCustomerIdList=[];
        for(var x=0;x<this.selectedCustomers.length;x++){
          if(this.selectedCustomers[x].isSelected!==false){
            coreCustomerIdList.push(this.selectedCustomers[x].coreCustomerId);
            this.createContractRequestParam.contractCustomers.push({
              "isPrimary": this.selectedCustomers[x].isPrimary,
              "coreCustomerId": this.selectedCustomers[x].coreCustomerId,
              "coreCustomerName": this.selectedCustomers[x].coreCustomerName,
              "sectorId": this.selectedCustomers[x].sectorId,
              "accounts":[],
              "features":[],
              "isVisited":false
            });
          }
        }
        /*  this.presenter.getCoreCustomerAccounts({"coreCustomerIdList":coreCustomerIdList});
      }
      if(this.completeCompanyDetails.accountsFeatures===null)
        this.presenter.getContractFeatureActionLimits(this.completeContractDetails.id,"edit");

         else{ */
        fetchAccFlag =true;
      }
      fetchFeaturesFlag = this.completeCompanyDetails.accountsFeatures ? 
                         ((this.completeCompanyDetails.accountsFeatures.globalLevelPermissions===null || this.completeCompanyDetails.accountsFeatures.globalLevelPermissions=== undefined)? true : false) :
                         true;
      var inputParam = {};
      if(fetchAccFlag)
        inputParam["accountsPayload"] = {"coreCustomerIdList":coreCustomerIdList,"legalEntityId":this.completeContractDetails.legalEntityId};
      if(fetchFeaturesFlag)
        inputParam["featuresPayload"] = {"id":this.completeContractDetails.id, "legalEntityId":this.completeContractDetails.legalEntityId,"action":"edit"};
      this.presenter.fetchAccountsContractFeaturesLimits(inputParam, this.formName);
      if(this.completeCompanyDetails.accountsFeatures===null){
      } else{
        this.globalLevelPermissionsFeatures = JSON.parse(this.completeCompanyDetails.accountsFeatures.globalLevelPermissions);
          this.accountLevelPermissionsViewFeatures =  JSON.parse(this.completeCompanyDetails.accountsFeatures.accountLevelPermissions);
          this.setTransactionLimits = JSON.parse(this.completeCompanyDetails.accountsFeatures.transactionLimits);
        this.storeIntialContractFeatures(JSON.parse(this.completeCompanyDetails.accountsFeatures.globalLevelPermissions));
        this.setEditContractFeaturesLimits();
      }
    }
    }else{
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    this.setContractDetails();
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnNext,false,true);
    this.enableAllTabs(true);
    this.view.forceLayout();
  },
  enableAllTabs : function(isEnable){
    for (let x=0;x<6;x++){
      this.view.verticalTabsContract["flxOption"+x].setEnabled(isEnable);
    }
    this.view.forceLayout();
  },
  addBulkUpdateTags : function(){
    var selectedCustData=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    var tagsFlexPath=this.view.flxContractFA.isVisible?this.view.flxTagsContainer:this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer;
    tagsFlexPath.removeAll();
    var selectedCustCount=0;
    for (var i=0;i<selectedCustData[0][1].length;i++){
      if(selectedCustData[0][1][i].lblCheckbox.text==="\ue965")
        selectedCustCount++;
      	this.addCustomerTag(tagsFlexPath,selectedCustData[0][1][i].lblCustomerName.text,selectedCustData[0][1][i].lblCustomerId.text);
    }
    if(this.view.flxContractFA.isVisible)
      this.view.lblSelectedHeading.text="Selected Customers("+this.getTwoDigitNumber(selectedCustCount)+")";
    this.view.forceLayout();
  },
  /*
  * FEATURE BULK UPDATE CONTRACT : add cust, accounts selection tags
  */
  addBulkUpdateTagsCustAccounts: function() {
    var selectedCustData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    var tagsFlexPath = this.view.flxContractFA.isVisible ? this.view.flxTagsContainer : this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer;
    tagsFlexPath.removeAll();
    var featureLvl =this.view.btnUpdateInBulkFA.info ;
    var frequency,count = [],selAccId = {};
    var repeatedAccount = 0;
    var selectedCustCount = 0;
    for (var i = 0; i < selectedCustData[0][1].length; i++) {
      if (selectedCustData[0][1][i].lblCheckbox.text ===this.AdminConsoleCommonUtils.checkboxSelectedlbl) {
        if(featureLvl === "CUSTLVL"){
          selectedCustCount++;
          this.addAccountsTagContract(tagsFlexPath,selectedCustData[0][1][i].lblCustomerName.text,selectedCustData[0][1][i].lblCustomerId.text, selectedCustData[0][1].length);
        } else{
          selectedCustCount++;
          selAccId[selectedCustData[0][1][i].lblCustomerName.text] = selectedCustData[0][1][i].lblAccountType.text;
          count.push(selectedCustData[0][1][i].lblAccountType.text+" "+"Account");
        }
      }
    }
    if(featureLvl === "CUSTLVL"){
      this.view.lblSelectedHeading.text="Selected Customers("+this.getTwoDigitNumber(selectedCustCount)+")";
    } else{
      this.view.flxTagsContainer.info.accIds = selAccId;
      frequency = this.findRepeatingElements(count, count.length);
      var arrayOfOccurence = Array.from(frequency);  
      for(var i = 0;i<arrayOfOccurence.length;i++){
        this.addAccountsTagContract(tagsFlexPath, arrayOfOccurence[i][0],arrayOfOccurence[i][1], arrayOfOccurence.length);
      }
      this.view.lblSelectedHeading.text = "Selected Accounts(" + this.getTwoDigitNumber(count.length) + ")";
    }
    this.view.forceLayout();
  },
  //to count frequency of repeated elements
  findRepeatingElements:function(arr, size)
  {
    var frequency = new Map();
    for(var i = 0; i < size; i++)
    {
      if(frequency.has(arr[i]))
      {
        frequency.set(arr[i], frequency.get(arr[i])+1);
      }
      else
      {
        frequency.set(arr[i], 1);
      }
    }
    return frequency;
  },
  //to set error skin for all the search fields
    setErrorSkinToAllFeilds: function(){
    this.view.txtSearchParam1.skin = "skntbxBordereb30173px";
    this.view.txtSearchParam2.skin = "skntbxBordereb30173px";
    this.view.txtSearchParam3.skin = "skntbxBordereb30173px";
    this.view.txtSearchParam4.skin = "skntbxBordereb30173px";
    this.view.txtSearchParam5.skin = "skntbxBordereb30173px";
    this.view.txtSearchParam6.skin = "skntbxBordereb30173px";
    this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3pxBordee32416";
    this.view.textBoxSearchContactNumber.txtISDCode.skin = "skntbxBordereb30173px";
    this.view.textBoxSearchContactNumber.txtContactNumber.skin = "skntbxBordereb30173px";
    this.view.lstbxSearchServiceDef.skin = "sknlbxError";
  },
  setNormalSkinToAllFeilds: function(){
    this.view.txtSearchParam1.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.txtSearchParam2.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.txtSearchParam3.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.txtSearchParam4.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.txtSearchParam5.skin = "sknTbx485c75Reg13pxBRe1e5edR1pxTBRSide";
    this.view.txtSearchParam6.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3px";
    this.view.textBoxSearchContactNumber.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.textBoxSearchContactNumber.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.lstbxSearchServiceDef.skin = "sknLbxborderd7d9e03pxradius";
  },
  //to validate whether atleast one search parameter is entered or not
  validateSearchFields: function () {
    if (this.view.txtSearchParam1.text.trim() !== "") return true;
    if (this.view.txtSearchParam3.text.trim() !== "") return true;
    if (this.view.txtSearchParam2.text.trim() !== "") return true;
    if (this.view.txtSearchParam6.text.trim() !== "") return true;
    if (this.view.textBoxSearchContactNumber.txtContactNumber.text.trim() !== ""&&this.view.textBoxSearchContactNumber.txtISDCode.text.trim()!=="") return true;
    if (this.view.txtSearchParam4.text.trim() !== "") return true;
    if (this.view.txtSearchParam5.text.trim() !== "") return true;
    
    var selectedInd=this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex?this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1]:null;
    var status="";
    if(selectedInd!==undefined&&selectedInd!==null)
      status=this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].customerStatusId;
      
    if (status !== "") return true;
    return false;
  },
    clearSearchFeilds: function(){
    this.view.txtSearchParam1.text = "";
    this.view.txtSearchParam3.info = null;
    this.view.txtSearchParam2.text = "";
    this.view.txtSearchParam3.text = "";
    this.view.txtSearchParam4.text = "";
    this.view.txtSearchParam5.text = "";
    this.view.txtSearchParam6.text = "";
    this.view.textBoxSearchContactNumber.txtISDCode.text="";
    this.view.textBoxSearchContactNumber.txtContactNumber.text = "";
    // this.view.lstbxSearchServiceDef.selectedKey = "SELECT";
    this.view.AdvancedSearchDropDownServType.sgmentData.setData([]); 
    this.view.flxDropDownDetailServType.setVisibility(false);
    this.view.lblSelectedRowsServType.text="Select";
    if(this.view.AdvancedSearchDropDownServType.sgmentData.info && this.view.AdvancedSearchDropDownServType.sgmentData.info.data){
      let segData = this.view.AdvancedSearchDropDownServType.sgmentData.info.data;
      this.view.AdvancedSearchDropDownServType.sgmentData.setData(segData); 
      this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex = null;
    }
  },
  searchForContracts: function(){
    if(this.validateSearchFields()){
      this.setContractSearchResults();
    }else{
      this.view.lblSearchError.setVisibility(true);
      this.view.imgSearchError.setVisibility(true);
      this.setErrorSkinToAllFeilds();
    }
    this.view.forceLayout();
  },
 /* setContractButtonsSkin : function(isEdit){
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsServiceDetails.btnSave,true,isEdit);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnSave,true,isEdit);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnNext,false,isEdit);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.contractDetailsCommonButtons.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.contractDetailsCommonButtons.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractAccounts.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractAccounts.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractFA.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractLimits.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractLimits.btnNext,false,true);
    this.view.forceLayout();
  },*/
  validateCoreCustSearch : function(){
    if (this.view.textBoxEntry11.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntry12.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntry13.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntry21.txtContactNumber.text.trim() !== ""&&this.view.textBoxEntry21.txtISDCode.text.trim()!=="") return true;
    if (this.view.customCalCustomerDOB.value !== "") return true;
    if (this.view.lblSelectedRows.text !== kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SelectAStatus")) return true;
    if (this.view.textBoxEntry31.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntry32.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntry33.tbxEnterValue.text.trim() !== "") return true;
    this.setErrorSkinsToCoreSearch();
    return false;
  },
  //to set error skin for all core customer search fields
  setErrorSkinsToCoreSearch: function(){
    this.view.textBoxEntry11.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntry12.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntry13.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntry21.txtContactNumber.skin = "skntbxBordereb30173px";
    this.view.textBoxEntry21.txtISDCode.skin = "skntbxBordereb30173px";
    this.view.flxCalendarDOB22.skin="sknflxEnterValueError";
    this.view.flxDropDown23.skin= "sknflxEnterValueError";
    this.view.textBoxEntry31.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntry32.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntry33.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.imgCustomerSearchError.setVisibility(true);
    this.view.lblCustomerSearchError.setVisibility(true);
  },
  setNormalSkinToCoreSearch: function(){
    this.view.textBoxEntry11.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntry12.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntry13.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntry21.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.textBoxEntry21.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.flxCalendarDOB22.skin="sknflxEnterValueNormal";
    this.view.flxDropDown23.skin= "sknflxEnterValueNormal";
    this.view.textBoxEntry31.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntry32.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntry33.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.imgCustomerSearchError.setVisibility(false);
    this.view.lblCustomerSearchError.setVisibility(false);
  },
  resetCoreCustomerSearch : function(){
    this.view.textBoxEntry11.tbxEnterValue.text = "";
    this.view.textBoxEntry12.tbxEnterValue.text= "";
    this.view.textBoxEntry13.tbxEnterValue.text= "";
    this.view.textBoxEntry21.txtContactNumber.text= "";
    this.view.textBoxEntry21.txtISDCode.text="";
    this.view.customCalCustomerDOB.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.customCalCustomerDOB.value="";
    this.view.lblSelectedRows.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SelectAStatus");
    this.view.textBoxEntry31.tbxEnterValue.text= "";
    this.view.textBoxEntry32.tbxEnterValue.text= "";
    this.view.textBoxEntry33.tbxEnterValue.text= "";
    this.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex=null;
    this.view.forceLayout();
  },
  searchCoreCustomers : function(){
    var dob=this.getDateFormatYYYYMMDD(this.view.customCalCustomerDOB.value);
    var selectedInd=this.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex?this.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex[1]:null;
    var status="";
    if(selectedInd!==undefined&&selectedInd!==null)
      status=this.view.AdvancedSearchDropDown01.sgmentData.data[selectedInd].customerStatusId;
    var searchRequest={
      "id":this.view.textBoxEntry11.tbxEnterValue.text,
      "name":this.view.textBoxEntry12.tbxEnterValue.text,
      "email":this.view.textBoxEntry13.tbxEnterValue.text,
      "phoneNumber":this.view.textBoxEntry21.txtContactNumber.text,
      "phoneCountryCode":this.view.textBoxEntry21.txtISDCode.text,
      "dob":dob==="NaN-NaN-NaN"?"":dob,
      "customerStatus":status,
      "country":this.view.textBoxEntry31.tbxEnterValue.text,
      "town":this.view.textBoxEntry32.tbxEnterValue.text,
      "zipcode":this.view.textBoxEntry33.tbxEnterValue.text,
      "legalEntityId":this.selectedEntityCard
    };
    this.view.flxLoading2.setVisibility(true);
    this.presenter.searchCoreCustomers(searchRequest, this.formName);
  },
  setCoreCustomersList : function(customers){
    if(this.view.flxRow2.isVisible){
      this.view.flxColumn13.setVisibility(false);
      this.view.flxRow2.setVisibility(false);
      this.view.flxRow3.setVisibility(false);
      this.view.fonticonrightarrowSearch.text="";
      this.view.btnShowHideAdvSearch.text=kony.i18n.getLocalizedString("i18n.contracts.showAdvancedSearch");
    }
    if(customers.length>0){
      this.view.flxNoCustomersSearched.setVisibility(false);
      this.setCustomerSearchData(customers);
    }else{
      this.view.lblNoCustomersSearched.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.flxNoCustomersSearched.setVisibility(true);
      this.view.lblRelatedcustSubHeading.setVisibility(false);
      this.view.flxRelatedCustomerSegment.setVisibility(false);
    }
    this.view.flxLoading2.setVisibility(false);
    this.view.forceLayout();
  },
  onBreadcrumbClick : function(id){
    var self=this;
    this.view.flxCustomerSearchPopUp.info={"action":"BREADCRUMBCLICK"};
    var currBreadcrumb;
    for(var i=0;i<this.selectedCustomers.length;i++){
      if(this.selectedCustomers[i].coreCustomerId===id){
        currBreadcrumb=this.selectedCustomers.slice(0,i+1);
        break;
      }
    }
    this.presenter.getRelatedCoreCustomers({"coreCustomerId" : id,"legalEntityId" : this.selectedEntityCard}, this.formName);
    this.view.flxSearchBreadcrumb.info.added=[];
    var i=this.view.flxSearchBreadcrumb.widgets().concat([]);
    this.view.segBreadcrumbs.setData([]);
    for(var x=2;x<i.length-1;x++)
      this.view.flxSearchBreadcrumb.remove(i[x]);    
    for(var k=0;k<currBreadcrumb.length;k++){
      if(currBreadcrumb[k].isSelected!==false)
        this.addBreadcrumb(currBreadcrumb[k]);
    }
    this.view.forceLayout();
  },
  setServiceDefinitionFAData : function(featuresLimits){
    var limits=featuresLimits.limits;
    var features=featuresLimits.features;

    for(let p=0;p<limits.length;p++){
      for(let q=0;q<features.length;q++){
        if(features[q].featureId===limits[p].featureId){
          features[q]=this.getCombinedFeature(features[q],limits[p]);
        }
      }
    }
    for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++)
      this.createContractRequestParam.contractCustomers[j].features=JSON.parse(JSON.stringify(features));
    this.bulkUpdateAllFeaturesList=JSON.parse(JSON.stringify(features));//used for bulk update popup data
    this.setGlobalMonetaryActions(limits);
    this.view.forceLayout();
  },
  setContractAccountsData : function(customerAccounts){
    if(this.action===this.actionConfig.create){
      for(var i=0;i<customerAccounts.length;i++){
        for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
          if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===customerAccounts[i].coreCustomerId)
            this.createContractRequestParam.contractCustomers[j].accounts=customerAccounts[i].accounts;
        }
      }
    }else{
      var selectedAccIds={};
      var accIds=[];
      var contractDetails=JSON.parse(JSON.stringify(this.completeContractDetails));
      for(let x=0;x<contractDetails.contractCustomers.length;x++){
        if(contractDetails.contractCustomers[x].accounts){
          for(let y=0;y<contractDetails.contractCustomers[x].accounts.length;y++){
            accIds.push(contractDetails.contractCustomers[x].accounts[y].accountId);
          }
        }
        selectedAccIds[contractDetails.contractCustomers[x].coreCustomerId]=accIds;
      }
      for(var i=0;i<customerAccounts.length;i++){
        for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
          if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===customerAccounts[i].coreCustomerId&&customerAccounts[i].accounts){
            for(var k=0;k<customerAccounts[i].accounts.length;k++){
              if(selectedAccIds[customerAccounts[i].coreCustomerId]){
                if(selectedAccIds[customerAccounts[i].coreCustomerId].includes(customerAccounts[i].accounts[k].accountNumber)||customerAccounts[i].accounts[k].isNew==="true")
                  customerAccounts[i].accounts[k].isEnabled="true";
                else
                  customerAccounts[i].accounts[k].isEnabled="false";
              }
            }
            this.createContractRequestParam.contractCustomers[j].accounts=customerAccounts[i].accounts;
          }
        }
      }
    }
    this.getAccountLvlFeaturesActions(); // to make sure all the accounts features and actions fetched all at once instead of every check/uncheck of accounts
  },
  setContractAccountLvlFeaturesData : function(accountLvlFeatures){
    //var accJSON=this.view.toggleContractButtonsFeatures.btnToggleRight.info;
      var featuresJSON={};
      var accountsJSON={};
    var accActionsList ={};
     var self=this; 
    this.createContractRequestParam.accountLevelPermissions = [];
    if(this.action===this.actionConfig.create){
      for(let x=0;x<this.createContractRequestParam.contractCustomers.length;x++){
            featuresJSON={
              "coreCustomerName":this.createContractRequestParam.contractCustomers[x].coreCustomerName,
              "coreCustomerId":this.createContractRequestParam.contractCustomers[x].coreCustomerId,
              "accounts":[]
            }
            accActionsList[this.createContractRequestParam.contractCustomers[x].coreCustomerId] = {};
            for(let y=0;y<this.createContractRequestParam.contractCustomers[x].accounts.length;y++){
              accountsJSON={
                "accountId":this.createContractRequestParam.contractCustomers[x].accounts[y].accountId||this.createContractRequestParam.contractCustomers[x].accounts[y].accountNumber,
                "features":[],
                "productId":this.createContractRequestParam.contractCustomers[x].accounts[y].productId,
                "accountName":this.createContractRequestParam.contractCustomers[x].accounts[y].accountName,
                "accountType":this.createContractRequestParam.contractCustomers[x].accounts[y].accountType,
                "ownershipType":this.createContractRequestParam.contractCustomers[x].accounts[y].ownerType,
                "isEnabled":"true"
              }
                accountsJSON.features=this.getFeaturesBasedOnId(accountLvlFeatures,self.createContractRequestParam.contractCustomers[x].accounts[y].productId);
              featuresJSON.accounts.push(accountsJSON);
              accActionsList[this.createContractRequestParam.contractCustomers[x].coreCustomerId] = this.setAccountActionsForBulkUpdate(accActionsList[this.createContractRequestParam.contractCustomers[x].coreCustomerId], accountsJSON.features);
            }
        this.createContractRequestParam.accountLevelPermissions.push(featuresJSON);
      }
      //this.formAccountActionJSON();
    }else{
      var selectedAccIds={};
      var accIds=[];
      var contractDetails=JSON.parse(JSON.stringify(this.createContractRequestParam));
      var contractAccFeaturesAndLimits=JSON.parse(this.completeCompanyDetails.accountsFeatures.accountLevelPermissions);
      for(let a=0;a<contractAccFeaturesAndLimits.length;a++){
        for(let x=0;x<contractDetails.contractCustomers.length;x++){
          if(contractAccFeaturesAndLimits[a].coreCustomerId===contractDetails.contractCustomers[x].coreCustomerId){
            accActionsList[contractAccFeaturesAndLimits[a].coreCustomerId] = {};
            featuresJSON={
              "coreCustomerName":contractAccFeaturesAndLimits[a].coreCustomerName,
              "coreCustomerId":contractAccFeaturesAndLimits[a].coreCustomerId,
              "accounts":[]
            }
            for(let y=0;y<contractDetails.contractCustomers[x].accounts.length;y++){
              accountsJSON={
                "accountId":contractDetails.contractCustomers[x].accounts[y].accountId||contractDetails.contractCustomers[x].accounts[y].accountNumber,
                "features":[],
                "productId":contractDetails.contractCustomers[x].accounts[y].productId,
                "accountName":contractDetails.contractCustomers[x].accounts[y].accountName,
                "accountType":this.createContractRequestParam.contractCustomers[x].accounts[y].accountType,
                "ownershipType":this.createContractRequestParam.contractCustomers[x].accounts[y].ownerType,
                "isEnabled":"true"
              }
              for(let b=0;b<contractAccFeaturesAndLimits[a].accounts.length;b++){
                if(contractAccFeaturesAndLimits[a].accounts[b].accountId===(contractDetails.contractCustomers[x].accounts[y].accountId || contractDetails.contractCustomers[x].accounts[y].accountNumber)){
                  accountsJSON.features=contractAccFeaturesAndLimits[a].accounts[b].featurePermissions;
                  break;
                }
              }
              if(accountsJSON.features.length===0){
                accountsJSON.features=this.getFeaturesBasedOnId(accountLvlFeatures,self.createContractRequestParam.contractCustomers[x].accounts[y].productId);
                if(accountsJSON.features.length===0 && contractDetails.contractCustomers[x].accounts[y].isNew === "false")
                  accountsJSON.isEnabled="false";
              }
              featuresJSON.accounts.push(accountsJSON);
              accActionsList[contractAccFeaturesAndLimits[a].coreCustomerId] = this.setAccountActionsForBulkUpdate(accActionsList[contractAccFeaturesAndLimits[a].coreCustomerId], accountsJSON.features);
            }
            this.createContractRequestParam.accountLevelPermissions.push(featuresJSON);
            break;
          }
        }
      }
    }
    this.bulkUpdateAccLevelActions = accActionsList;
  },
  /*
  * forms union of all feature actions from all the account level features
  */
  setAccountActionsForBulkUpdate : function(existingFeatureJson, accFeatures=[]){
    for(var i=0; i< accFeatures.length; i++){
      var actions = accFeatures[i].actions || accFeatures[i].permissions;
      var featureActions = existingFeatureJson[accFeatures[i].featureId] || [];
      if(featureActions.length === 0)
        existingFeatureJson[accFeatures[i].featureId] = [];
      for(var j=0; j<actions.length; j++){
        if(!featureActions.includes(actions[j].actionId)){
          featureActions.push(actions[j].actionId);
        }
      }
      existingFeatureJson[accFeatures[i].featureId] = featureActions;
    }
    return existingFeatureJson;
  },
  // To set Features& actions or Limits Data based on selected customer Id from dropdown
  setCustSelectedData : function(component,isSearch){
    var selectedCustId=this.view[component].lblSelectedValue.info?this.view[component].lblSelectedValue.info.id:this.view[component].segList.data[0].id;
    var dataToSet=[];
    var customerDetails={};
    var address="N/A";
    for(var i=0;i<this.selectedCustomers.length;i++){
      if(this.selectedCustomers[i].coreCustomerId===selectedCustId){
        customerDetails=this.selectedCustomers[i];
        break;
      }
    }
    if(customerDetails.city!==undefined||customerDetails.country!==undefined)
      address=this.AdminConsoleCommonUtils.getAddressText(customerDetails.city,customerDetails.country);
    else
      address="N/A";
    var details = {
      "id": customerDetails.coreCustomerId,
      "name": customerDetails.coreCustomerName,
      "industry":customerDetails.industry?customerDetails.industry:"N/A",
      "email": customerDetails.email,
      "phone":customerDetails.phone,
      "address": address
    };
    if(component==="customersDropdown"){
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
          dataToSet=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].accounts));
          this.createContractRequestParam.contractCustomers[j].isVisited = true;
          break;
        }
      }
      if(isSearch===false){
        this.view.tbxAccountsSearch.text="";
        this.view.flxClearAccountsSearch.setVisibility(false);
        this.view.ContractAccountsList.lblName.text=customerDetails.coreCustomerName;
        this.view.ContractAccountsList.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
        this.view.ContractAccountsList.lblData1.text=selectedCustId;
        this.view.ContractAccountsList.lblData2.text=customerDetails.taxId?customerDetails.taxId:"N/A";
        this.view.ContractAccountsList.lblData3.text=address;
        //this.view.ContractAccountsList.flxArrow.onClick = this.toggleCardVisibility.bind(component);
        this.view.ContractAccountsList.flxPrimary.setVisibility(customerDetails.isPrimary==="true"?true:false);
        this.view.lblSeperatorAccounts.setVisibility(false);
        this.view.flxNoCustomerSelected.setVisibility(false);
        this.view.flxContractAccountsList.setVisibility(true);
        this.view.flxContractAccountsSearch.setVisibility(true);      
        this.setAccountsDataCustomers(dataToSet.concat([]));
        this.view.flxContractAccountsList.info={"totalRecords":dataToSet};
        this.setAccountTypeFilterData(dataToSet);
        this.setOwnerShipFilterData(dataToSet);
      }else{
        this.searchAccounts(dataToSet.concat([]));
      }
    }else if(component==="customersDropdownLimits"){
      var features=[];
      var limitFeatures=[];
      var limitActions=[]
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
          features=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].features));
          this.createContractRequestParam.contractCustomers[j].isVisited = true;
          break;
        }
      }
      var isSelected=true;
      for(var a=0;a<features.length;a++){
        if(features[a].type==="MONETARY"&&features[a].actions.length>0){
          limitFeatures=JSON.parse(JSON.stringify(features[a]));
          limitActions = features[a].actions.filter(function(item) {
            isSelected=true;
            //to check whether this action is checked in features and actions tab or not
            if(item.isEnabled)
              isSelected=item.isEnabled==="true"?true:false;
            return item.type=="MONETARY"&&isSelected;
          });
          if(limitActions.length>0){
            limitFeatures.actions=limitActions;
            dataToSet.push(limitFeatures);
          }
        }
      }
      if(isSearch===false){
        this.view.lblSeperatorLimits.setVisibility(false);
        this.view.flxContractLimitsList.setVisibility(true);
        this.view.flxContractLimits.setVisibility(true);
        this.view.flxNoCustomerSelectedLimits.setVisibility(false);
        this.view.ContractLimitsList.lblName.text=customerDetails.coreCustomerName;
        this.view.ContractLimitsList.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
        this.view.ContractLimitsList.flxPrimary.setVisibility(customerDetails.isPrimary==="true"?true:false);
        this.view.ContractLimitsList.lblData1.text=selectedCustId;
        this.view.ContractLimitsList.lblData2.text=customerDetails.taxId?customerDetails.taxId:"N/A";
        this.view.ContractLimitsList.lblData3.text=address;
        if(dataToSet.length>0){
          this.view.tbxContractLimitsSearch.text="";
          this.view.flxClearContractLimitsSearch.setVisibility(false);
          this.view.ContractLimitsList.flxNoFilterResults.setVisibility(false);
          this.view.ContractLimitsList.segAccountFeatures.setVisibility(true);
          this.view.flxContractLimitsSearch.setVisibility(true);
          this.view.ContractLimitsList.btnReset.setVisibility(true);
          this.view.btnUpdateInBulkLimits.setVisibility(true);
          this.setLimitsDataForCustomer(JSON.parse(JSON.stringify(dataToSet)));
        }else{
          this.view.ContractLimitsList.lblNoFilterResults.text="There are no limits associated with the selected features.";
          this.view.ContractLimitsList.flxNoFilterResults.setVisibility(true);
          this.view.ContractLimitsList.segAccountFeatures.setVisibility(false);
          this.view.flxContractLimitsSearch.setVisibility(false);
          this.view.ContractLimitsList.btnReset.setVisibility(false);
          this.view.btnUpdateInBulkLimits.setVisibility(false);
        }
      }else{
        this.searchLimits(JSON.parse(JSON.stringify(dataToSet)));
      }
    }else if(component==="customersDropdownFA"){
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
          dataToSet=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].features));
          this.createContractRequestParam.contractCustomers[j].isVisited = true;
          break;
        }
      }
      if(isSearch===false){
        this.view.flxContractFeaturesToggleButtons.setVisibility(true);
        this.view.tbxContractFASearch.placeholder="Search By Feature Name, Action Name";
        this.view.tbxContractFASearch.text="";
        this.view.flxClearContractFASearch.setVisibility(false);
        this.view.lblSeperatorFA.setVisibility(false);
        this.view.flxNoCustomerSelectedFA.setVisibility(false);
        this.view.flxContractFAList.setVisibility(true);
        this.view.flxContractAccountFAList.setVisibility(false);
        this.view.flxContractFASearch.setVisibility(true);
        this.view.ContractFAList.lblName.text=customerDetails.coreCustomerName;
        this.view.ContractFAList.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
        this.view.ContractFAList.flxPrimary.setVisibility(customerDetails.isPrimary==="true"?true:false);
        this.view.ContractFAList.lblData1.text=selectedCustId;
        this.view.ContractFAList.lblData2.text=customerDetails.taxId?customerDetails.taxId:"N/A";
        this.view.ContractFAList.lblData3.text=address;
        this.setFeaturesDataCustomers(JSON.parse(JSON.stringify(dataToSet)));
        this.view.btnUpdateInBulkFA.setVisibility(true);
      }else{
        this.searchFA(JSON.parse(JSON.stringify(dataToSet)));
      }
    }
  },
  createContract : function(){
    var accountsCheck =[];
    var requestParam=JSON.parse(JSON.stringify(this.createContractRequestParam));
	var featureActions=[];
    var limitJSON,accountsCheck =[];
    requestParam.accountLevelPermissions = [];
    requestParam.globalLevelPermissions=[];
    requestParam.transactionLimits=[];
    if(this.action===this.actionConfig.edit)
      requestParam.contractId=this.createContractRequestParam.contractId;
    requestParam.contractName=this.view.contractDetailsEntry1.tbxEnterValue.text;
    if(this.action===this.actionConfig.edit){
      requestParam.serviceDefinitionName=this.completeContractDetails.servicedefinitionName;
      requestParam.serviceDefinitionId=this.completeContractDetails.servicedefinitionId;
    }
    else{
      requestParam.serviceDefinitionName=this.view[this.selectedServiceCard].lblCategoryName.tooltip;
      requestParam.serviceDefinitionId=this.view[this.selectedServiceCard].lblCategoryName.info.catId;
    }
    requestParam.faxId=this.view.contractDetailsEntry2.tbxEnterValue.text||"";
    requestParam.communication=[{"phoneNumber":this.view.contractContactNumber.txtContactNumber.text,"phoneCountryCode":this.view.contractContactNumber.txtISDCode.text,"email":this.view.contractDetailsEntry3.tbxEnterValue.text}];
    requestParam.address=[{"country":this.view.typeHeadContractCountry.tbxSearchKey.text,"cityName":this.view.contractDetailsEntry8.tbxEnterValue.text,
                           "state":this.view.contractDetailsEntry8.tbxEnterValue.text,"zipCode":this.view.contractDetailsEntry6.tbxEnterValue.text,
                           "addressLine1":this.view.contractDetailsEntry4.tbxEnterValue.text,"addressLine2":this.view.contractDetailsEntry5.tbxEnterValue.text}]
    if(this.action===this.actionConfig.edit){
    	requestParam.legalEntityId = this.createContractRequestParam.legalEntityId;
    }
    else{
      	requestParam.legalEntityId = this.selectedEntityCard;
    }
    requestParam.contractCustomers = [];
    for(var a=0;a<this.createContractRequestParam.contractCustomers.length;a++){
      if(this.createContractRequestParam.contractCustomers[a].isVisited === true){
        var customerObjToAdd = {};
        customerObjToAdd.isPrimary =this.createContractRequestParam.contractCustomers[a].isPrimary;
        customerObjToAdd.coreCustomerId = this.createContractRequestParam.contractCustomers[a].coreCustomerId;
        customerObjToAdd.coreCustomerName =this.createContractRequestParam.contractCustomers[a].coreCustomerName;
        customerObjToAdd.isBusiness=this.createContractRequestParam.contractCustomers[a].isBusiness;
        customerObjToAdd.sectorId = this.createContractRequestParam.contractCustomers[a].sectorId || "",
        customerObjToAdd.accounts=[];
        customerObjToAdd.excludedAccounts=[];
        //to identify cust without accounts and show error
        if(this.createContractRequestParam.contractCustomers[a].accounts.length  === 0){
          accountsCheck.push(this.createContractRequestParam.contractCustomers[a].coreCustomerName);
        }
        for(var b=0;b<this.createContractRequestParam.contractCustomers[a].accounts.length;b++){
          if(this.createContractRequestParam.contractCustomers[a].accounts[b].isEnabled){
            //to check if the user has selected this account or not
            if(this.createContractRequestParam.contractCustomers[a].accounts[b].isEnabled==="true"){
              customerObjToAdd.accounts.push({
                "accountId": this.createContractRequestParam.contractCustomers[a].accounts[b].accountNumber || this.createContractRequestParam.contractCustomers[a].accounts[b].accountId,
                "accountType": this.createContractRequestParam.contractCustomers[a].accounts[b].accountType,
                "accountName": this.createContractRequestParam.contractCustomers[a].accounts[b].accountName,
                "typeId": this.createContractRequestParam.contractCustomers[a].accounts[b].typeId,
                "ownerType": this.createContractRequestParam.contractCustomers[a].accounts[b].ownerType,
                "accountHolderName": this.createContractRequestParam.contractCustomers[a].accounts[b].accountHolderName,
                "accountStatus": this.createContractRequestParam.contractCustomers[a].accounts[b].accountStatus,
                "arrangementId": this.createContractRequestParam.contractCustomers[a].accounts[b].arrangementId,
                "productId": this.createContractRequestParam.contractCustomers[a].accounts[b].productId
              });
            }else{
              customerObjToAdd.excludedAccounts.push({
                "accountId": this.createContractRequestParam.contractCustomers[a].accounts[b].accountNumber || this.createContractRequestParam.contractCustomers[a].accounts[b].accountId,
                "accountType": this.createContractRequestParam.contractCustomers[a].accounts[b].accountType,
                "accountName": this.createContractRequestParam.contractCustomers[a].accounts[b].accountName,
                "typeId": this.createContractRequestParam.contractCustomers[a].accounts[b].typeId,
                "ownerType": this.createContractRequestParam.contractCustomers[a].accounts[b].ownerType,
                "accountHolderName": this.createContractRequestParam.contractCustomers[a].accounts[b].accountHolderName,
                "accountStatus": this.createContractRequestParam.contractCustomers[a].accounts[b].accountStatus,
                "arrangementId": this.createContractRequestParam.contractCustomers[a].accounts[b].arrangementId,
                "productId": this.createContractRequestParam.contractCustomers[a].accounts[b].productId
              });
            }
          }else{//if the user has neither selected nor unselected this account
            customerObjToAdd.accounts.push({
              "accountId": this.createContractRequestParam.contractCustomers[a].accounts[b].accountNumber || this.createContractRequestParam.contractCustomers[a].accounts[b].accountId,
              "accountType": this.createContractRequestParam.contractCustomers[a].accounts[b].accountType,
              "accountName": this.createContractRequestParam.contractCustomers[a].accounts[b].accountName,
              "typeId": this.createContractRequestParam.contractCustomers[a].accounts[b].typeId,
              "ownerType": this.createContractRequestParam.contractCustomers[a].accounts[b].ownerType,
              "accountHolderName": this.createContractRequestParam.contractCustomers[a].accounts[b].accountHolderName,
              "accountStatus": this.createContractRequestParam.contractCustomers[a].accounts[b].accountStatus,
              "arrangementId": this.createContractRequestParam.contractCustomers[a].accounts[b].arrangementId,
              "productId": this.createContractRequestParam.contractCustomers[a].accounts[b].productId
            });
          }
        }
        customerObjToAdd.features=[];
        limitJSON={
          "coreCustomerName":customerObjToAdd.coreCustomerName,
          "coreCustomerId":customerObjToAdd.coreCustomerId,
          "featurePermissions":[]
        };
        var limitFeatureJSON={};
        for(var b=0;b<this.createContractRequestParam.contractCustomers[a].features.length;b++){
          featureActions=[];
          var addedActionCount =0;
          var actionsArr = this.createContractRequestParam.contractCustomers[a].features[b].actions || this.createContractRequestParam.contractCustomers[a].features[b].permissions;
          for(var c=0;c<actionsArr.length;c++){
            if(actionsArr[c].isEnabled===undefined||actionsArr[c].isEnabled===null){
              //if the user has neither selected nor unselected this actions
              actionsArr[c].isEnabled="true";
            }
            featureActions[c]={
              "actionId":actionsArr[c].id||actionsArr[c].actionId,
              "actionName":actionsArr[c].name||actionsArr[c].actionName,
              "actionDescription":actionsArr[c].description||actionsArr[c].actionDescription,
              "isEnabled":actionsArr[c].isEnabled,
            };
            //while edit add isNewAction flag for newly selected actions
            if(this.action===this.actionConfig.edit){
              var currCustInitialFeatures = this.initialFeaturesJson[this.createContractRequestParam.contractCustomers[a].coreCustomerId];
              var currFeatureInitialActions = currCustInitialFeatures[this.createContractRequestParam.contractCustomers[a].features[b].featureId] || [];
              if(!currFeatureInitialActions.includes(featureActions[c].actionId) &&
              actionsArr[c].isEnabled === "true"){
                featureActions[c]["isNewAction"] =true;
                addedActionCount = addedActionCount+1;
              }
            }
           /* if(actionsArr[c].limits)
              featureActions[c].limits=actionsArr[c].limits; */
            if (actionsArr[c].limits && actionsArr[c].isEnabled === "true") {
              limitFeatureJSON = {
                "featureId": this.createContractRequestParam.contractCustomers[a].features[b].id || this.createContractRequestParam.contractCustomers[a].features[b].featureId,
                "actionId": actionsArr[c].id || actionsArr[c].actionId,
                "actionName": actionsArr[c].name || actionsArr[c].actionName,
                "actionDescription": actionsArr[c].description || actionsArr[c].actionDescription,
                "limits": actionsArr[c].limits
              }
              limitJSON.featurePermissions.push(limitFeatureJSON);
            }         
          }
          customerObjToAdd.features[b]={
            "featureName":this.createContractRequestParam.contractCustomers[a].features[b].name||this.createContractRequestParam.contractCustomers[a].features[b].featureName,
            "featureId":this.createContractRequestParam.contractCustomers[a].features[b].id||this.createContractRequestParam.contractCustomers[a].features[b].featureId,
            "featureDescription":this.createContractRequestParam.contractCustomers[a].features[b].description||this.createContractRequestParam.contractCustomers[a].features[b].featureDescription,
            "permissions":featureActions
          };  
          //while edit add isNewFeature flag for newly selected feature
          if(this.action===this.actionConfig.edit){
            var currCustInitialFeatures = this.initialFeaturesJson[this.createContractRequestParam.contractCustomers[a].coreCustomerId];
            if((currCustInitialFeatures[customerObjToAdd.features[b].featureId] === undefined ||
                currCustInitialFeatures[customerObjToAdd.features[b].featureId] === null) &&
               addedActionCount > 0){
              customerObjToAdd.features[b]["isNewFeature"] =true;
            }
          }		
        }
        requestParam.transactionLimits.push(limitJSON);
        requestParam.globalLevelPermissions.push({
          "coreCustomerName": customerObjToAdd.coreCustomerName,
          "coreCustomerId": customerObjToAdd.coreCustomerId,
          "features": customerObjToAdd.features
        });
        delete customerObjToAdd.features;
        requestParam.contractCustomers.push(customerObjToAdd);
      }
    }
    for(var m=0;m<this.createContractRequestParam.accountLevelPermissions.length;m++){
      let accLvlObj = this.createContractRequestParam.accountLevelPermissions[m];
      accLvlObj.accounts = this.formatAccountLevelPermissions(JSON.parse(JSON.stringify(this.createContractRequestParam.accountLevelPermissions[m].accounts)));
      requestParam.accountLevelPermissions.push(accLvlObj);
    }
      
   
    var isValidAcc = accountsCheck.length > 0 ? false : true;
    if(isValidAcc === true){
     // kony.adminConsole.utils.showProgressBar(this.view);
      if(this.action===this.actionConfig.create)
      this.presenter.createContract(requestParam, this.formName);
    else
      this.presenter.editContract(requestParam, this.formName);
    } else{
      var msg = "No accounts avaialble for customer "+accountsCheck[0];
      this.view.toastMessage.showErrorToastMessage(msg, this);
    }
  },
  createEditContractSuccess:function(context){
    this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),context.message, this.formName);
    //this.getCompanyAllDetails(context.contractId, 2);
  },
  searchServiceCards : function(){
    var searchText=this.view.tbxRecordsSearch.text.toLowerCase();
    var segStatusData = this.view.serviceTypeFilterMenu.segStatusFilterDropdown.data;
    var indices = this.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices?this.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices[0][1]:[];
    var serviceDef=segStatusData.length===indices.length?this.view.flxContractServiceCards.info.totalRecords:this.view.flxContractServiceCards.info.filteredRecords;
    var serviceName="";
    var searchResults=serviceDef.filter(function(service){
      serviceName=service.name.toLowerCase();
      if(serviceName.indexOf(searchText)>=0)
        return service;
    });
    if(searchResults.length>0){
      this.view.flxContractServiceCards.info.filteredRecords=searchResults;
      this.setContractServiceCards(searchResults,true);
      this.view.flxNoServiceSearchResults.setVisibility(false);
      this.view.flxContractServiceCards.setVisibility(true);
    }
    else{
      this.view.lblNoServiceSearchResults.text="No records found with keyword \""+searchText+"\". Please try again.";
      this.view.flxNoServiceSearchResults.setVisibility(true);
      this.view.flxContractServiceCards.setVisibility(false);
    }
    this.view.forceLayout();
  },
  searchAccounts : function(accounts){
    var searchText=this.view.tbxAccountsSearch.text.toLowerCase();
    var accountName="";
    var searchResults=accounts.filter(function(account){
      accountName=account.accountName.toLowerCase();
      if(accountName.indexOf(searchText)>=0||account.accountNumber.indexOf(searchText)>=0)
        return account;
    });
    if(searchResults.length>0){
      this.setAccountsDataCustomers(searchResults);
      this.view.flxNoCustomerSelected.setVisibility(false);
      this.view.flxContractAccountsList.setVisibility(true);
    }
    else{
      this.view.lblNoCustomersSelected.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.imgContractAccounts.setVisibility(false);
      this.view.flxNoCustomerSelected.setVisibility(true);
      this.view.flxContractAccountsList.setVisibility(false);
    }
  },
  searchFA : function(features){
    var searchText=this.view.tbxContractFASearch.text.toLowerCase();
    var searchedActions=[];
    var featureName="";
    var actionName="";
    var searchResults=features.filter(function(feature){
      featureName=feature.name?feature.name.toLowerCase():feature.featureName.toLowerCase();
      if(featureName.indexOf(searchText)>=0)
        return feature;
      else{
        searchedActions = [];
        for(let x=0;x<feature.actions.length;x++){
          actionName=feature.actions[x].name?feature.actions[x].name.toLowerCase():feature.actions[x].actionName.toLowerCase();
          if(actionName.indexOf(searchText)>=0)
            searchedActions.push(feature.actions[x]);
        }
        if(searchedActions.length>0){
          feature.actions=searchedActions;
          return feature;
        }
      }
    });
    if(searchResults.length>0){
      this.setFeaturesAtCustomerLevel(this.view.ContractFAList.segAccountFeatures,searchResults);
      this.view.flxNoCustomerSelectedFA.setVisibility(false);
      this.view.flxContractFAList.setVisibility(true);
    }
    else{
      this.view.lblNoCustomersSelectedFA.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.imgContractFA.setVisibility(false);
      this.view.flxNoCustomerSelectedFA.setVisibility(true);
      this.view.flxContractFAList.setVisibility(false);
    }
  },
  searchLimits : function(features){
    var searchText=this.view.tbxContractLimitsSearch.text.toLowerCase();
    var searchedActions=[];
    var featureName="";
    var actionName="";
    var searchResults=features.filter(function(feature){
      featureName=feature.name?feature.name.toLowerCase():feature.featureName.toLowerCase();
      if(featureName.indexOf(searchText)>=0)
        return feature;
      else{
        for(let x=0;x<feature.actions.length;x++){
          actionName=feature.actions[x].name?feature.actions[x].name.toLowerCase():feature.actions[x].actionName.toLowerCase();
          if(actionName.indexOf(searchText)>=0)
            searchedActions.push(feature.actions[x]);
        }
        if(searchedActions.length>0){
          feature.actions=searchedActions;
          return feature;
        }
      }
    });
    if(searchResults.length>0){
      this.setLimitsAtCustomerLevel(searchResults);
      this.view.ContractLimitsList.segAccountFeatures.setVisibility(true);
      this.view.ContractLimitsList.flxNoFilterResults.setVisibility(false);
    }
    else{
      this.view.ContractLimitsList.lblNoFilterResults.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.ContractLimitsList.flxNoFilterResults.setVisibility(true);
      this.view.ContractLimitsList.segAccountFeatures.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * set filter data in contract services tab
  * 2param: search result
  */
  setDataToServiceTypeFilter : function(data){
    var self = this;
    var statusList=[],maxLenText = "";
    var serviceType="";
    for(var i=0;i<data.length;i++){
      if(!statusList.contains(data[i].serviceType))
        statusList.push(data[i].serviceType);
    }
    var widgetMap = {
      "serviceType": "serviceType",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){
      maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;
      if(rec==="TYPE_ID_WEALTH")
        serviceType="Wealth Banking";
      else
        serviceType=rec==="TYPE_ID_RETAIL"?"Retail Banking":rec==="TYPE_ID_BUSINESS"?"Business Banking":"Retail & Business Banking";
      return {
        "serviceType": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": serviceType
      };
    });
    self.view.serviceTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.serviceTypeFilterMenu.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    self.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    //set filter width
    self.view.flxServiceTypeFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+35+"px";
    self.view.forceLayout();
  },
  /*
  * filter the company's list based on the business type selected
  */
  performServiceTypeFilter : function(){
    var self = this;
    var selType = [];
    var selInd;
    var dataToShow = [];
    var allData = self.view.tbxRecordsSearch.text.trim().length===0?self.view.flxContractServiceCards.info.totalRecords:self.view.flxContractServiceCards.info.filteredRecords;
    var segStatusData = self.view.serviceTypeFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
    if(indices){
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selType.push(self.view.serviceTypeFilterMenu.segStatusFilterDropdown.data[selInd[i]].serviceType);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.setContractServiceCards(allData,false);
        self.view.flxContractServiceCards.setVisibility(true);
        self.view.flxNoServiceSearchResults.setVisibility(false);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selType.indexOf(rec.serviceType) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.view.flxContractServiceCards.info.filteredRecords=dataToShow;
          self.setContractServiceCards(dataToShow,false);
          self.view.flxContractServiceCards.setVisibility(true);
          self.view.flxNoServiceSearchResults.setVisibility(false);
        } else {
          self.view.lblNoServiceSearchResults.text="No records found with given filters. Please try again.";
          self.view.flxContractServiceCards.setVisibility(false);
          self.view.flxNoServiceSearchResults.setVisibility(true);
        }
      }
    } else{
      self.view.lblNoServiceSearchResults.text="No records found with given filters. Please try again.";
      self.view.flxContractServiceCards.setVisibility(false);
      self.view.flxNoServiceSearchResults.setVisibility(true);
    }
  },   
  fetchCustomerStatusList : function(){
    var requestParam={
      "bundle_name" : "C360",
      "config_key": "CUSTOMER_STATUS"
    }
    this.presenter.getCustomerStatusList(requestParam, this.formName);
  },
  setCustomerStatusData : function(statusListString){
    var statusList=JSON.parse(statusListString);
    this.view.lblSelectedRows.text="Select a Status";
    var statusData=[];
    var widgetMap = {
      "customerStatusId": "customerStatusId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.code.map(function(rec){     
      return {
        "customerStatusId": rec.codeId,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": {"isVisible":false},
        "lblDescription": rec.codeName
      };
    });
    this.view.AdvancedSearchDropDown01.sgmentData.widgetDataMap = widgetMap;
    this.view.AdvancedSearchDropDown01.sgmentData.setData(statusData);
    this.view.AdvancedSearchDropDown01.sgmentData.info={"data":statusData};
    this.view.AdvancedSearchDropDown01.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.forceLayout();
  },
  /*
  * sort based on selected segment column
  * @param: column to sort, segment path, segment category
  */
  sortAndSetData : function(columnName,segmentPath,category,sectionIndex){
    var segData = segmentPath.data;
    var secInd=0;
    if(sectionIndex||segmentPath.selectedsectionindex)
      secInd=sectionIndex||segmentPath.selectedsectionindex;
    this.sortBy.column(columnName);
    if(category === 1){ //edit accounts screen
      segData[secInd][1] = segData[secInd][1].sort(this.sortBy.sortData);
      segData[secInd][0].lblIconSortAccName = this.determineSortIconForSeg(this.sortBy,"lblAccountNumber");
      segData[secInd][0].lblIconAccNameSort = this.determineSortIconForSeg(this.sortBy,"lblAccountName");
      segmentPath.setSectionAt(segData[secInd],secInd);
    }else if(category === 2){
      segData[secInd][1] = segData[secInd][1].sort(this.sortBy.sortData);
      segData[secInd][0].lblSortName= this.determineSortIconForSeg(this.sortBy,columnName);
      segmentPath.setSectionAt(segData[secInd],secInd);
    }else if(category === 3){
      segData[secInd][1] = segData[secInd][1].sort(this.sortBy.sortData);
      segData[secInd][0].fontIconAccNameSort= this.determineSortIconForSeg(this.sortBy,columnName);
      segmentPath.setSectionAt(segData[secInd],secInd);
    }
  },
  /*
  * show filter for account types in account tab of edit user access
  *@param: option-(account type:1, ownership:2), event object, context object
  */
  showFilterForAccountsSectionClick : function(option,event,context){
    if(option === 1)
      this.view.flxOwnershipFilter.setVisibility(false);
    else if(option === 2)
      this.view.flxAccountsFilter.setVisibility(false);
    var filterWidget = (option === 1) ? this.view.flxAccountsFilter :this.view.flxOwnershipFilter;
    var filterIcon = (option === 1) ? "lblIconFilterAccType":"lblIconSortAccHolder" ;

    var flxRight = context.widgetInfo.frame.width - event.frame.x - event.frame.width;
    var iconRight = event.frame.width - event[filterIcon].frame.x;
    filterWidget.right = (flxRight + iconRight - 7) + "dp";
    filterWidget.top =(this.view.ContractAccountsList.flxCardBottomContainer.frame.y + 40+110) +"dp";
    if(filterWidget.isVisible){
      filterWidget.setVisibility(false);
    } else{
      filterWidget.setVisibility(true);
    }
  },
  /*
  * set accounts types filter data
  * @param: option -1/2
  */
  setAccountTypeFilterData : function(data){
    var self = this;
    var accTypes=[],maxLenText = "";
    for(var i=0;i<data.length;i++){
      if(data[i].accountType!=undefined || data[i].accountType!=null ){
      if(!accTypes.contains(data[i].accountType))
        accTypes.push(data[i].accountType);
    }
      else{
        accTypes.push('');
      }
    }
    var widgetMap = {
      "accountType": "accountType",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = accTypes.map(function(rec){
      maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;     
      return {
        "accountType": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    self.view.accountTypesFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.accountTypesFilterMenu.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<accTypes.length;j++){
      selStatusInd.push(j);
    }
    self.view.accountTypesFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    //set filter width
    self.view.flxAccountsFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  setOwnerShipFilterData: function(data){
    var self = this;
    var accTypes=[],maxLenText = "";
    var ownerType="N/A";
    for(var i=0;i<data.length;i++){
      ownerType=data[i].ownerType?data[i].ownerType:"N/A";
      if(!accTypes.contains(ownerType))
        accTypes.push(ownerType);
    }
    var widgetMap = {
      "ownerType": "ownerType",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = accTypes.map(function(rec){
      maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;     
      return {
        "ownerType": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    self.view.ownershipFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.ownershipFilterMenu.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<accTypes.length;j++){
      selStatusInd.push(j);
    }
    self.view.ownershipFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    //set filter width
    self.view.flxOwnershipFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  performAccountOwnerFilters : function(){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var accountsList = self.view.flxContractAccountsList.info.totalRecords;
    var ownershipIndices = self.view.ownershipFilterMenu.segStatusFilterDropdown.selectedIndices;
    var typeIndices = self.view.accountTypesFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selOwnershipInd = null;
    var selTypeInd = null;
    //get selected account types
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter[0][0].push(self.view.accountTypesFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].accountType);
    }
    //get selected ownerships
    selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter[0][1].push(self.view.ownershipFilterMenu.segStatusFilterDropdown.data[selOwnershipInd[j]].ownerType);
    }

    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToShow = [];
    } else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = accountsList.filter(function (rec) {  
        if (selFilter[0][1].indexOf(rec.ownerType?rec.ownerType:"N/A") >= 0&&selFilter[0][0].indexOf(rec.accountType) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
    }
    return dataToShow;
  },
  /*
  * validation to check if all rows are selected
  * @param: segment path, section/row level
  */
  validateCheckboxSelections : function(segmentPath, isSection){
    var isValid = true, count =0;
    var segData = segmentPath.data;
    var imgName = isSection === true ? "lblSectionCheckbox" : "lblCheckbox";
    for(var i=0;i<segData.length;i++){
      var data = isSection === true ? segData[i][0] : segData[i];
      if(data[imgName].text !== this.AdminConsoleCommonUtils.checkboxnormallbl){
        count = count +1;
      }
    }
    isValid = count === 0 ? false: true;
    return isValid;
  },
  /*
  * check for checkbox selection for all the cards of container
  * @param: cards container path, segment name, is section level
  */
  validateSelectionForMultipleCards : function(flexPath,segmentName,isSection){
    var isValid = true;
    isValid = this.validateCheckboxSelections(flexPath[segmentName],isSection);
    return isValid;
  },
  /*
  * show the range tooltip for limits
  */
  showRangeTooltip : function(widget,context,range){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      this.view.flxRangeTooltip.top = (context.pageY -120)+"dp";
      this.view.flxRangeTooltip.left = (context.pageX - 305 -230 -70) +"dp"; //(pageX -leftmenu-verticaltabs- left,right padding)
      if(this.view.flxRangeTooltip.isVisible === false){
        var minTransValue=this.AdminConsoleCommonUtils.getTruncatedString(range["MIN_TRANSACTION_LIMIT"],10,7);
        this.view.lblIconRangeCurr11.text=this.currencyValue;
        this.view.lblRangeValue11.text=minTransValue;
        this.view.lblRangeValue11.toolTip=range["MIN_TRANSACTION_LIMIT"];
        this.view.lblIconRangeCurr12.text=this.currencyValue;
        this.view.lblRangeValue12.text=this.AdminConsoleCommonUtils.getTruncatedString(range["MAX_TRANSACTION_LIMIT"],10,7);
        this.view.lblRangeValue12.toolTip=range["MAX_TRANSACTION_LIMIT"];
        this.view.lblIconRangeCurr21.text=this.currencyValue;
        this.view.lblRangeValue21.text=minTransValue;
        this.view.lblRangeValue21.toolTip=range["MIN_TRANSACTION_LIMIT"];
        this.view.lblIconRangeCurr22.text=this.currencyValue;
        this.view.lblRangeValue22.text=this.AdminConsoleCommonUtils.getTruncatedString(range["DAILY_LIMIT"],10,7);
        this.view.lblRangeValue22.toolTip=range["DAILY_LIMIT"];
        this.view.lblIconRangeCurr31.text=this.currencyValue;
        this.view.lblRangeValue31.text=minTransValue;
        this.view.lblRangeValue31.toolTip=range["MIN_TRANSACTION_LIMIT"];
        this.view.lblIconRangeCurr32.text=this.currencyValue;
        this.view.lblRangeValue32.text=this.AdminConsoleCommonUtils.getTruncatedString(range["WEEKLY_LIMIT"],10,7);
        this.view.lblRangeValue32.toolTip=range["WEEKLY_LIMIT"];
        this.view.flxRangeTooltip.setVisibility(true);
      }
    }
    this.view.forceLayout();
  },
  /*
  * show customer's details in the popup
  * @param: customer details json
  */
  showCustomerDetailsPopup : function(details,showBackButton){
    if(this.view.flxCustomerSearchPopUp.isVisible){
      this.view.flxCustomerSearchPopUp.setVisibility(false);
    }

    this.view.flxContractDetailsPopup.setVisibility(true);
    this.view.contractDetailsPopup.showBackButton(showBackButton);
    this.view.contractDetailsPopup.setDataForPopup(details);
    this.view.forceLayout();

  },
  updateLimitsBulkChanges : function(){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var featureId="";
    var actionIds=[],  bulkUpdateList=[], selectedCustIds=[], dependentActions=[];
    var isEnable=false;
    var bulkUpdateList=[];
    var typeValue=this.getSelectedType();
    var selectedCust=this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added;
    var limitVal="";
    for(let a=0;a<selectedCust.length;a++)
      selectedCustIds.push(selectedCust[a][1]);
    //get all assigned feature id's
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select")
        featureId=rowsList[i].lstBoxFieldValue11.selectedKey;
      actionIds=[];
      if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems){
        var selItems=rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems;
        for(let i=0;i<selItems.length;i++){
          if(!actionIds.includes(selItems[i].actionId)){
            actionIds.push(selItems[i].actionId);

          }
        }
      }
      if(actionIds.length>0){
        bulkUpdateList.push({"featureId":featureId,"actionIds":actionIds,"limitId":typeValue,"limitVal":rowsList[i].tbxValue21.text});
      }
    }
    for(var a=0;a<this.createContractRequestParam.contractCustomers.length;a++){
      if(selectedCustIds.includes(this.createContractRequestParam.contractCustomers[a].coreCustomerId)){
        for(var b=0;b<this.createContractRequestParam.contractCustomers[a].features.length;b++){
          for(let x=0;x<bulkUpdateList.length;x++){
            if(this.createContractRequestParam.contractCustomers[a].features[b].featureId===bulkUpdateList[x].featureId){
              for(var c=0;c<this.createContractRequestParam.contractCustomers[a].features[b].actions.length;c++){
                if(bulkUpdateList[x].actionIds.includes(this.createContractRequestParam.contractCustomers[a].features[b].actions[c].actionId)){
                  this.updateBulkRequestParam(a,b,c,false,bulkUpdateList[x]);
                }
              }
            }
          }
        }
      }
    }
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    this.view.customersDropdownLimits.lblSelectedValue.info={"id":selectedCustIds[0]};
    this.setSelectedText("customersDropdownLimits",selectedCustIds[0]);
    this.setCustSelectedData("customersDropdownLimits",false);
    this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.contracts.LimitsBulkUpdateMsg"), this);
  },
  /*
  * FEATURE BULK UPDATE CONTRACT: get added feature action in bulk selection 
  **/
  updateFeaturesBulkChanges : function(){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var featureId="";
    var actionIds=[], selectedCust=[], bulkUpdateList=[], selectedCustIds=[];
    var isEnable=false;
    var isFeatures=this.view.flxContractFA.isVisible;
    var isCustLevel = this.view.toggleContractButtonsFeatures.info.selectedTab === 1 ? true : false;
    rowsList = this.view.flxAddNewRowListCont.widgets();
    selectedCust = this.view.flxTagsContainer.info.added;
    var dependentActions=[];
    if(isCustLevel === true){
      for(let a=0;a<selectedCust.length;a++)
        selectedCustIds.push(selectedCust[a][1]);
    }else{
      selectedCustIds = Object.keys(this.view.flxTagsContainer.info.accIds);
    }
    //get all assigned feature id's
    for (var i = 0; i < rowsList.length; i++) {
      var statusValue = this.getSelectedStatusType(rowsList[i]);
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select")
        featureId=rowsList[i].lstBoxFieldValue11.selectedKey;
      actionIds=[];
      if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems){
        var selItems=rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems;
        for(let i=0;i<selItems.length;i++){
          if(!actionIds.includes(selItems[i].actionId)){
            actionIds.push(selItems[i].actionId);
            //To check dependent actions in bulk update permissions
            for(let j=0;j<selItems[i].dependentActions.length;j++){
              if(!actionIds.includes(selItems[i].dependentActions[j].trim()))
                actionIds.push(selItems[i].dependentActions[j].trim());
            }
          }
        }
      }
      if(actionIds.length>0){
        bulkUpdateList.push({"featureId":featureId,"actionIds":actionIds,"isEnable":statusValue ==="enable"?"true":"false"});
      }
    }
    
    if(isCustLevel){ //cust level
      this.updateBulkCustFeaturesReqParam(bulkUpdateList, selectedCustIds);
    } else if(isCustLevel === false){ //acc level
      this.updateBulkAccFeaturesReqParam(bulkUpdateList,selectedCustIds);
    }
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    this.view.flxAddProdFeaturesBackBtn.onClick();
    this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.contracts.FeatureBulkUpdateMsg"), this);
  },
  /*
  * FEATURE BULK UPDATE: update selected features at customer level in createreqparam 
  **/
  updateBulkCustFeaturesReqParam : function(bulkUpdateList, selCustIdArr){
    for(let k=0; k<this.createContractRequestParam.contractCustomers.length; k++){
      var custId = selCustIdArr.includes(this.createContractRequestParam.contractCustomers[k].coreCustomerId) ? this.createContractRequestParam.contractCustomers[k].coreCustomerId : null;
      for(var i=0; i<bulkUpdateList.length; i++){
        var actions = bulkUpdateList[i].actionIds;
        for(var a=0; a<this.createContractRequestParam.contractCustomers[k].features.length; a++){
          if(this.createContractRequestParam.contractCustomers[k].features[a].featureId === bulkUpdateList[i].featureId){
            for(var l=0;l<this.createContractRequestParam.contractCustomers[k].features[a].actions.length; l++){
              if(actions.includes(this.createContractRequestParam.contractCustomers[k].features[a].actions[l].actionId)){
                this.createContractRequestParam.contractCustomers[k].features[a].actions[l].isEnabled = bulkUpdateList[i].isEnable;
                this.updateAllAccountLvlActions(this.createContractRequestParam.contractCustomers[k].features[a].actions[l].actionId, custId, bulkUpdateList[i].isEnable, null);
              }
            }
          }
        } 
      }
      var dropdownSelCust = this.view.customersDropdownFA.lblSelectedValue.info.id;
      if(dropdownSelCust === this.createContractRequestParam.contractCustomers[k].coreCustomerId){
        this.setFeaturesAtCustomerLevel(this.view.ContractFAList.segAccountFeatures,this.createContractRequestParam.contractCustomers[k].features);
      }
    }

  },
  /*
  * FEATURE BULK UPDATE CONTRACT: update selected features at account level in createreqparam
  **/
  updateBulkAccFeaturesReqParam : function(bulkUpdateList, selAccArr){
    var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
    for(var i=0; i<bulkUpdateList.length; i++){
      var actions = bulkUpdateList[i].actionIds;
      for(var j=0; j<actions.length; j++){
        //first update selection for actionAccJson var, account level
        this.updateAllAccountLvlActions(actions[j],  custId, bulkUpdateList[i].isEnable, selAccArr);
        //update cust level selctions
       // this.updateAllCustLvlActions(actions[j], custId); 
      }
    }
    this.setContractAccountLvlFeatures();
  },
  updateBulkRequestParam : function(custInd,featureInd,actionInd,isFA,data){
    if(isFA){
      this.createContractRequestParam.contractCustomers[custInd].features[featureInd].actions[actionInd].isEnabled=data.isEnable;
    }else{
      for(let x=0;x<3;x++){
        if(this.createContractRequestParam.contractCustomers[custInd].features[featureInd].actions[actionInd].limits[x].id===data.limitId)
          this.createContractRequestParam.contractCustomers[custInd].features[featureInd].actions[actionInd].limits[x].value=data.limitVal;
      }
    }
  },
  getSelectedType : function() {
    var radBtn = this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton1.src;
    var radBtn1 = this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton2.src;
    var radBtn2 = this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton3.src;
    if(this.view.flxContractFA.isVisible){
      if(radBtn === "radio_selected.png") 
        return "enable";
      else
        return "disable";
    }else{
      if(radBtn === "radio_selected.png") 
        return "MAX_TRANSACTION_LIMIT";
      if( radBtn1 === "radio_selected.png") 
        return "DAILY_LIMIT";
      if(radBtn2 === "radio_selected.png")
        return "WEEKLY_LIMIT";
    }
  },
  /*
  * FEATURE BULK UPDATE CONTRACT: get selected feature status value
  */
  getSelectedStatusType : function(featureRowRef) {
    var radBtn = featureRowRef.customRadioButtonGroupCont.imgRadioButton1.src;
    var radBtn1 = featureRowRef.customRadioButtonGroupCont.imgRadioButton2.src;
    var radBtn2 = featureRowRef.customRadioButtonGroupCont.imgRadioButton3.src;
    if(this.view.flxContractFA.isVisible){
      if(radBtn === "radio_selected.png") 
        return "enable";
      else
        return "disable";
    }
  },
  
  getFeaturesForBulkUpdate : function(){
    var bulkUpdateFeatures={};
    var featureJSON={};
    var actionsJSON={};
    var actions
    for(var i=0;i<this.bulkUpdateAllFeaturesList.length;i++){
      featureJSON={};
      featureJSON.featreName=this.bulkUpdateAllFeaturesList[i].featureName;
      featureJSON.actions=[];
      for(var j=0;j<this.bulkUpdateAllFeaturesList[i].actions.length;j++){
        actionsJSON={};
        actionsJSON.actionName=this.bulkUpdateAllFeaturesList[i].actions[j].actionName;
        actionsJSON.actionId=this.bulkUpdateAllFeaturesList[i].actions[j].actionId;
        actionsJSON.isChecked=true;
        actionsJSON.type=this.bulkUpdateAllFeaturesList[i].actions[j].type;
        actionsJSON.limitVal="0";
        actionsJSON.dependentActions=[];
        if(this.bulkUpdateAllFeaturesList[i].actions[j].dependentActions&&this.bulkUpdateAllFeaturesList[i].actions[j].dependentActions.length>0){
          if(typeof this.bulkUpdateAllFeaturesList[i].actions[j].dependentActions==="string")//as we are getting string format in edit flow and object format in create flow
            actionsJSON.dependentActions=(this.bulkUpdateAllFeaturesList[i].actions[j].dependentActions.substring(1,this.bulkUpdateAllFeaturesList[i].actions[j].dependentActions.length-1)).split(",");
          else
            actionsJSON.dependentActions=this.bulkUpdateAllFeaturesList[i].actions[j].dependentActions.map(function(rec){return rec.id});
        }
        featureJSON.actions.push(actionsJSON);
      }
      bulkUpdateFeatures[this.bulkUpdateAllFeaturesList[i].featureId]=featureJSON;
    }
    if(this.view.flxContractFA.isVisible)
      return bulkUpdateFeatures;
    else{
      var filteredFeatures=this.filterBulkFeatures(bulkUpdateFeatures);
      return filteredFeatures;
    }
  },
  filterBulkFeatures : function(bulkFeatures){
    var selectedCust=this.view.flxContractFA.isVisible?this.view.flxTagsContainer.info.added:this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added;
    var selectedCustIds=[];
    var monetaryActions=[];
    var selectedActionIds=[];
    var isEnabled="true;"
    for(let a=0;a<selectedCust.length;a++)
      selectedCustIds.push(selectedCust[a][1]);

    for(var a=0;a<this.createContractRequestParam.contractCustomers.length;a++){
      if(selectedCustIds.includes(this.createContractRequestParam.contractCustomers[a].coreCustomerId)){
        for(var b=0;b<this.createContractRequestParam.contractCustomers[a].features.length;b++){
          if(this.createContractRequestParam.contractCustomers[a].features[b].type==="MONETARY"){
            for(var c=0;c<this.createContractRequestParam.contractCustomers[a].features[b].actions.length;c++){
              isEnabled=this.createContractRequestParam.contractCustomers[a].features[b].actions[c].isEnabled?this.createContractRequestParam.contractCustomers[a].features[b].actions[c].isEnabled:"true";
              if(this.createContractRequestParam.contractCustomers[a].features[b].actions[c].type==="MONETARY"&&isEnabled==="true"&&!selectedActionIds.includes(this.createContractRequestParam.contractCustomers[a].features[b].actions[c].actionId)){
                selectedActionIds.push(this.createContractRequestParam.contractCustomers[a].features[b].actions[c].actionId);
              }
            }
          }
        }
      }
    }
    for(var i in bulkFeatures){
      for (var j=0;j<bulkFeatures[i].actions.length;j++){
        if(!selectedActionIds.includes(bulkFeatures[i].actions[j].actionId)){
          bulkFeatures[i].actions.splice(j,1);
          j--;
        }
      }
      if(bulkFeatures[i].actions.length===0)
        delete bulkFeatures[i];
    }
    return bulkFeatures;
  },
  setEditContractCustomersData : function(){
    var self=this;
    var contractDetails=JSON.parse(JSON.stringify(this.completeContractDetails));
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      self.presenter.showCompaniesForm({"action":"editCancel"});
    };
    this.selectedCustomers=[];
    for(let x=0;x<contractDetails.contractCustomers.length;x++){
      this.selectedCustomers.push({
        "addressLine1": contractDetails.contractCustomers[x].addressLine1,
        "addressLine2": contractDetails.contractCustomers[x].addressLine2,
        "city": contractDetails.contractCustomers[x].cityName?contractDetails.contractCustomers[x].cityName:"",
        "coreCustomerId": contractDetails.contractCustomers[x].coreCustomerId,
        "coreCustomerName": contractDetails.contractCustomers[x].coreCustomerName,
        "country": contractDetails.contractCustomers[x].country,
        "isBusiness": contractDetails.contractCustomers[x].isBusiness,
        "isPrimary": contractDetails.contractCustomers[x].isPrimary,
        "state": contractDetails.contractCustomers[x].state,
        "taxId": contractDetails.contractCustomers[x].taxId,
        "zipCode": contractDetails.contractCustomers[x].zipCode,
        "isSelected": true,
        "email":contractDetails.contractCustomers[x].email,
        "phone":contractDetails.contractCustomers[x].phone?contractDetails.contractCustomers[x].phone:"N/A",
        "industry":contractDetails.contractCustomers[x].industry,
        "sectorId":contractDetails.contractCustomers[x].sectorId || "",
      });
    }
    this.setSelectedCustomersData();
  },
  setEditContractFeaturesLimits : function(){
    var features= this.globalLevelPermissionsFeatures;
    var limits=this.setTransactionLimits;
    var selectedCustIds=[];
    var isNewlyAdded=true;
    var combinedFeature={};
    for(let p=0;p<limits.length;p++){
        for(let x=0;x<limits[p].featurePermissions.length;x++){
          for(let y=0;y<features[p].features.length;y++){
            if(features[p].features[y].permissions){
            features[p].features[y].actions=features[p].features[y].permissions;
            features[p].features[y].type = this.getFeatureTypeValue(features[p].features[y].permissions);
            delete features[p].features[y].permissions;
            }
            if(features[p].features[y].featureId===limits[p].featurePermissions[x].featureId){
              combinedFeature={};
              combinedFeature=this.getCombinedFeature(features[p].features[y],limits[p].featurePermissions[x]);
              features[p].features[y]=combinedFeature;
            }
          }
        }
    }
    for(let m=0;m<this.createContractRequestParam.contractCustomers.length;m++){
      isNewlyAdded=true;
      for(let n=0;n<features.length;n++){
        if(features[n].coreCustomerId===this.createContractRequestParam.contractCustomers[m].coreCustomerId){
          if(this.createContractRequestParam.contractCustomers[m].features.length===0)
            this.createContractRequestParam.contractCustomers[m].features=features[n].features;        
          isNewlyAdded=false;
        }
      }
      if(isNewlyAdded===true){
        this.createContractRequestParam.contractCustomers[m].features=this.setAllFeatures(features[0].features);
      }
    }
       this.bulkUpdateAllFeaturesList=JSON.parse(JSON.stringify(features[0].features));//used for bulk update popup data
   // this.calculateActionAccountAvailability();
  },
  getFeatureTypeValue : function(actions){
    var hasMonAction = false;
    for(var i=0;i<actions.length; i++){
      if(actions[i].typeId === "MONETARY" || actions[i].type === "MONETARY"){
        hasMonAction = true;
        break;
      }
    }
    var typeVal = hasMonAction === true ? "MONETARY":"NON-MONETARY";
    return typeVal;
  },
  setAllFeatures : function(index,features,setInitialFeatures){
    for(let a=0;a<features.length;a++){
      for(let b=0;b<features[a].actions.length;b++){
        features[a].actions[b].isEnabled="true";
      }
    }
    this.createContractRequestParam.contractCustomers[index].features=features;
    //to set intial features  data for newly added customer
    if(setInitialFeatures && setInitialFeatures === true){
      this.storeIntialContractFeatures([this.createContractRequestParam.contractCustomers[index]]);
    }

  },
  /*
  * updates isEnabled field to true for features
  */
  getAllFeaturesEnabled : function(features){
    for(let a=0;a<features.length;a++){
      for(let b=0;b<features[a].actions.length;b++){
        features[a].actions[b].isEnabled="true";
      }
    }
    return features;
  },
  getCombinedFeature : function(feature,limits){
    //two flows has different executions because the payloads are different
    if(this.action===this.actionConfig.edit){
      var actionExists = this.isActionAvailable(feature.actions, limits.actionId);
      if(actionExists){ //if action already available - update the limits field
        for(let b=0;b<feature.actions.length;b++){
          if(limits.actionId===feature.actions[b].actionId){
            feature.actions[b].limits=limits.limits;
            feature.actions[b].type="MONETARY";
            feature.type="MONETARY";
          }
        }
      } else{ //if action not available - add the action to existing feature actions
        var actionToAdd = {
          "actionId":limits.actionId,
          "accessPolicyId":limits.accessPolicyId|| "",
          "actionDescription":limits.actionDescription|| "",
          "actionLevelId":limits.actionLevelId || "",
          "actionName":limits.actionName|| "",
          "actionStatus":limits.actionStatus|| "",
          "isAccountLevel":limits.isAccountLevel|| "",
          "isEnabled":limits.isEnabled|| "",
          "isNewAction":limits.isNewAction|| "",
          "legalEntityId":limits.legalEntityId|| "",
          "limitGroupId":limits.limitGroupId|| "",
          "typeId":limits.typeId|| "",
          "type":limits.typeId|| "",
          "limits":limits.limits
        }
        feature.type="MONETARY";
        feature.actions.push(actionToAdd);
      }
      
    }else{
      for(let a=0;a<limits.actions.length;a++){
        for(let b=0;b<feature.actions.length;b++){
        if(limits.actions[a].actionId===feature.actions[b].actionId){
          feature.actions[b].limits=limits.actions[a].limits;
          feature.actions[b].type="MONETARY";
          feature.type="MONETARY";
        }
      }
    }
    }
    return feature;
  },
  /*
  * check if the given action is avaible in the array
  * @return : true/false
  */
  isActionAvailable: function(featureActions,actionId){
    var actionExists = false;
    for(let i=0; i<featureActions.length; i++){
      if(featureActions[i].actionId === actionId){
        actionExists =true;
        break;
      }
    }
    return actionExists;
  },
  /*
  * store initial set of features to added isNew flag for new feature/actions
  * @param: initial edit contract features actions
  */
  storeIntialContractFeatures : function(contractFeatures){ 
    // this.initialFeaturesJson ={};
    for(var i=0; i< contractFeatures.length; i++){
      this.initialFeaturesJson[contractFeatures[i].coreCustomerId] = {};
      var features = contractFeatures[i].contractCustomerFeatures || contractFeatures[i].features;
      for(var j=0; j<features.length; j++){
        var actions = features[j].actions||features[j].permissions;
        var selActions = [];
        for(var k=0; k<actions.length; k++){
          if(actions[k].isEnabled === "true"){
            selActions.push(actions[k].actionId);
          }
        }
        if(selActions.length > 0){
          this.initialFeaturesJson[contractFeatures[i].coreCustomerId][features[j].featureId] = selActions;
        }
      }
    }
  },
  updateButtonsText : function(isEdit){
    var btnText=isEdit?kony.i18n.getLocalizedString("i18n.contracts.updateContract_UC"):kony.i18n.getLocalizedString("i18n.Contracts.createContract");
    this.view.commonButtonsCustomers.btnSave.text=btnText;
    this.view.contractDetailsCommonButtons.btnSave.text=btnText;
    this.view.commonButtonsContractAccounts.btnSave.text=btnText;
    this.view.commonButtonsContractFA.btnSave.text=btnText;
    this.view.commonButtonsContractLimits.btnSave.text=btnText;
    this.view.forceLayout();
  },
  setAddedCustDataInRequest : function(){
    var customersData=this.selectedCustomers;
    var newlyAddedIds=[];
    var isNewlyAdded=true;
    for(var a=0;a<customersData.length;a++){
      isNewlyAdded=true;
      for(var b=0;b<this.createContractRequestParam.contractCustomers.length;b++){
        if(customersData[a].coreCustomerId===this.createContractRequestParam.contractCustomers[b].coreCustomerId){
          isNewlyAdded=false;
          break;
        }
      }
      if(isNewlyAdded){
        newlyAddedIds.push(customersData[a].coreCustomerId);
        this.createContractRequestParam.contractCustomers.push({
          "isPrimary": customersData[a].isPrimary?customersData[a].isPrimary:false,
          "coreCustomerId": customersData[a].coreCustomerId,
          "coreCustomerName": customersData[a].coreCustomerName,
          "isBusiness": customersData[a].isBusiness,
          "sectorId":  customersData[a].sectorId,
          "accounts":[],
          "features":[],
          "isVisited":true
        });
      }
    }
    if(newlyAddedIds.length>0)
      this.presenter.getCoreCustomerAccounts({"coreCustomerIdList":newlyAddedIds,"legalEntityId": this.selectedEntityCard || this.createContractRequestParam.legalEntityId}, this.formName);
    this.setAllFeatures(this.createContractRequestParam.contractCustomers.length-1,JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[0].features)),true);

  },
  setGlobalMonetaryActions : function(limits){
    var monetaryActions=[];
    var monetaryLimits={};
    var actionsJSON={};
    var limitsJSON={};
    for(var p=0;p<limits.length;p++){
      actionsJSON={};
      for(let b=0;b<limits[p].actions.length;b++){
        limitsJSON={};
        actionsJSON[limits[p].actions[b].actionId]={};
        limitsJSON[limits[p].actions[b].limits[0].id]=limits[p].actions[b].limits[0].value;
        limitsJSON[limits[p].actions[b].limits[1].id]=limits[p].actions[b].limits[1].value;
        limitsJSON[limits[p].actions[b].limits[2].id]=limits[p].actions[b].limits[2].value;
        if(limits[p].actions[b].limits[3])
          limitsJSON[limits[p].actions[b].limits[3].id]=limits[p].actions[b].limits[3].value;
        else
          limitsJSON["MIN_TRANSACTION_LIMIT"]="1.0";
        actionsJSON[limits[p].actions[b].actionId]=limitsJSON;
      }
      monetaryLimits[limits[p].featureId]=actionsJSON;
    }
    this.monetaryLimits=monetaryLimits;
  },
  showResetAllLimitsPopup: function() {
    var scopeObj = this;
    scopeObj.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.ResetLimits");
    scopeObj.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.common.Disclaimer");
    scopeObj.view.suspendFeaturePopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.common.RESET");
    scopeObj.view.suspendFeaturePopup.btnPopUpDelete.width = "116dp";
    scopeObj.view.suspendFeaturePopup.rtxPopUpDisclaimer.width = "80%";
    scopeObj.view.flxSuspendFeaturePopup.setVisibility(true);
    scopeObj.view.suspendFeaturePopup.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
      scopeObj.resetLimitValues();
    }
    scopeObj.view.forceLayout();
  },
  revertAddedCustomers : function(){
    if(this.view.segAddedCustomers.isVisible){
      var segAddedData=this.view.segAddedCustomers.data;
      var custIds=[];
      for(let x=0;x<segAddedData.length;x++){
        custIds.push(segAddedData[x].customerInfo.coreCustomerId);
      }
      for(let y=0;y<this.selectedCustomers.length;y++){
        if(!custIds.includes(this.selectedCustomers[y].coreCustomerId))
          this.selectedCustomers[y].isSelected=false;
      }
    }else{
      this.selectedCustomers=[];
    }
  },
  validateContractDetails : function(){
    // contract name
    var validation = true
    if(this.view.contractDetailsEntry1.tbxEnterValue.text.trim() === ""){
      this.view.contractDetailsEntry1.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Company_Name");
      this.view.contractDetailsEntry1.flxInlineError.isVisible = true;
      this.view.contractDetailsEntry1.flxEnterValue.skin = "sknFlxCalendarError";
      validation = false;
    }
    // contact number
    var phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var phn = this.view.contractContactNumber.txtContactNumber.text.trim();
    if (phn && this.view.contractContactNumber.txtContactNumber.text.trim().length > 15) {
      this.view.contractContactNumber.flxError.width = "61%";
      this.view.contractContactNumber.flxError.isVisible = true;
      this.view.contractContactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_exceed");
      this.view.contractContactNumber.txtContactNumber.skin = "skinredbg";
      validation = false;
    } else if (phn && phoneRegex.test(this.view.contractContactNumber.txtContactNumber.text) === false) {
      this.view.contractContactNumber.flxError.width = "61%";
      this.view.contractContactNumber.flxError.isVisible = true;
      this.view.contractContactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
      this.view.contractContactNumber.txtContactNumber.skin = "skinredbg";
      validation = false;
    } else if(phn === "" && this.view.contractContactNumber.txtISDCode.text.trim()){
      this.view.contractContactNumber.flxError.width = "61%";
      this.view.contractContactNumber.flxError.isVisible = true;
      this.view.contractContactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
      this.view.contractContactNumber.txtContactNumber.skin = "skinredbg";
      validation = false;
    } else if(phn && (!this.view.contractContactNumber.txtISDCode.text.trim() ||(this.view.contractContactNumber.txtISDCode.text === "+"))){
      this.view.contractContactNumber.flxError.width = "98%";
      this.view.contractContactNumber.flxError.isVisible = true;
      this.view.contractContactNumber.txtISDCode.skin = "skinredbg";
      this.view.contractContactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      validation = false;
    }

    //ISD code
    var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
    if(this.view.contractContactNumber.txtISDCode.text.trim() && (this.view.contractContactNumber.txtISDCode.text.trim().length > 4 || ISDRegex.test(this.view.contractContactNumber.txtISDCode.text) === false)){
      this.view.contractContactNumber.flxError.width = "98%";
      this.view.contractContactNumber.flxError.isVisible = true;
      this.view.contractContactNumber.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      this.view.contractContactNumber.txtISDCode.skin = "skinredbg";
      validation = false;
    }

    // email id
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.view.contractDetailsEntry3.tbxEnterValue.text.trim() && emailRegex.test(this.view.contractDetailsEntry3.tbxEnterValue.text.trim()) === false) {
      this.view.contractDetailsEntry3.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailID_not_valid");
      this.view.contractDetailsEntry3.flxInlineError.isVisible = true;
      this.view.contractDetailsEntry3.flxEnterValue.skin = "sknFlxCalendarError";
      validation = false;
    }

    //ZipCode
    if (this.view.contractDetailsEntry6.tbxEnterValue.text.trim() && /^([a-zA-Z0-9_]+)$/.test(this.view.contractDetailsEntry6.tbxEnterValue.text) === false  ) {
      this.view.contractDetailsEntry6.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ErrorZipCode");
      this.view.contractDetailsEntry6.flxInlineError.setVisibility(true);
      this.view.contractDetailsEntry6.flxEnterValue.skin = "sknFlxCalendarError";
      validation = false;
    }

    //Country
    if (this.view.typeHeadContractCountry.tbxSearchKey.text&&this.view.typeHeadContractCountry.tbxSearchKey.text.trim() === "" && (this.view.typeHeadContractCountry.segSearchResult.isVisible || this.view.typeHeadContractCountry.flxNoResultFound.isVisible)) {
      this.view.lblNoContractCountryError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ErrorSelectCountry"); 
      this.view.flxNoContractCountry.isVisible = true;
      this.view.typeHeadContractCountry.tbxSearchKey.skin = "skinredbg";
      validation = false;
    } else if(this.view.typeHeadContractCountry.tbxSearchKey.text && this.view.typeHeadContractCountry.tbxSearchKey.info.isValid === false){
      this.view.lblNoContractCountryError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ErrorCountry");
      this.view.flxNoContractCountry.isVisible = true;
      this.view.typeHeadContractCountry.tbxSearchKey.skin = "skinredbg";
      validation = false;
    }
    if(validation===true){
      this.view.contractDetailsEntry3.flxEnterValue.skin = "sknflxEnterValueNormal";
      this.view.contractDetailsEntry3.flxInlineError.isVisible = false;
      this.view.contractContactNumber.flxError.isVisible = false;
      this.view.contractContactNumber.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
      this.view.contractContactNumber.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
      this.view.contractDetailsEntry6.flxInlineError.setVisibility(false);
      this.view.contractDetailsEntry6.flxEnterValue.skin = "sknflxEnterValueNormal";
      this.view.flxNoContractCountry.isVisible = false;
      this.view.typeHeadContractCountry.tbxSearchKey.skin = "skntbxLato35475f14px";
      this.view.contractDetailsEntry1.flxInlineError.isVisible = false;
      this.view.contractDetailsEntry1.flxEnterValue.skin = "sknflxEnterValueNormal";
    }
    return validation;
  },
  getCountrySegmentData : function(){
    var self = this;
    var callBack = function(response){
      kony.print("listboxreponse",response);
      if(response !== "error") {
        self.segCountry = response.countries.reduce(
          function(list, country) {
            return list.concat([{"id":country.id,
                                 "lblAddress":{"text":country.Name,
                                               "left" : "10dp"},
                                 "template":"flxSearchCompanyMap"}]);
          },[]);
      }
      var widgetMap = {"flxSearchCompanyMap":"flxSearchCompanyMap",
                       "lblAddress":"lblAddress",
                       "id":"id",
                       "Region_id":"Region_id",
                       "Country_id":"Country_id"};
      self.view.typeHeadContractCountry.segSearchResult.widgetDataMap = widgetMap;
      self.view.typeHeadContractCountry.segSearchResult.setData(self.segCountry);
      self.view.forceLayout();
    };
    this.presenter.fetchLocationPrefillData(callBack);
  },
  validateBulkSelection : function(category){
    var rowsList = category === 1 ? this.view.flxAddNewRowListCont.widgets() :this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var isValid=true;
    var selCount=0;
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select"){
        selCount=selCount+1;
        if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems===null){
          isValid=false;
          rowsList[i].flxFieldValueContainer12.skin="sknFlxCalendarError";
          rowsList[i].lblErrorMsg12.text="Select atleast one action";
          rowsList[i].flxErrorField12.setVisibility(true);
        }
        if(this.view.flxContractLimits.isVisible===true&&rowsList[i].tbxValue21.text.trim().length===0){
          isValid=false;
          rowsList[i].lblErrorMsg21.text="Value cannot be empty";
          rowsList[i].flxErrorField21.setVisibility(true);
          rowsList[i].flxValue21.skin="sknFlxCalendarError";
        }
      }
    }
    if(selCount===0){
      isValid=false;
      rowsList[0].lstBoxFieldValue11.skin="sknlbxError";
      rowsList[0].lblErrorMsg11.text="Select atleast one feature";
      rowsList[0].flxErrorField11.setVisibility(true);
    }
    this.view.forceLayout();
    return isValid;
  },
  fetchAutoSyncAccountsFlag : function(){
    var requestParam={
      "bundle_name" : "C360",
      "config_key": "DEFAULT_ACCOUNTS_ACCESS_TYPE"
    }
    this.presenter.getAutoSyncAccountsFlag(requestParam);
  },
  /*
  * get 2 digit string number
  * @param: number
  * @return: 2-digit sting number
  */
  getTwoDigitNumber : function(count){
    var updatedCount =0;
    count = parseInt(count,10);
    if(count > 9 || count === 0){
      updatedCount = count;
    } else{
      updatedCount = "0"+count;
    }
    return updatedCount;
  },
  /*
  * get count of selected items
  * @param: data,isRow
  * @return: count of selected items
  */
  getSelectedItemsCount : function(data,isRow){
    var selCount = 0;
    var textImg = (isRow === true) ? "lblCheckbox" :"lblSectionCheckbox";
    for(var i=0; i<data.length; i++){
      var list = (isRow === true) ? data[i] : data[i][0];
      if(list[textImg].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl || list[textImg].text === this.AdminConsoleCommonUtils.checkboxPartiallbl){
        selCount  = selCount +1;
      }
    }
    if(selCount > 9 || selCount === 0)
      return selCount;
    else
      return "0"+selCount;
  },
  /*
  * get value or empty value for expression
  * @param: value, emptyValue(""/null/"N/A")
  */
  getValueOrNull : function(val,emptyVal){
    if(val)
      return val;
    else
      return emptyVal;
  },

  containSpecialChars: function(name){
    var regex = /[+=\\\\|<>^*%$#()!.,`";:?]/;  
    if(regex.test(name)){
      return true;
    }
    return false;
  },
  setAccFilter : function(filterComponent, widget , accountsFeaturesCard,context) {
    this.view.accTypeFilterMenu.info.sectionIndex=context.sectionIndex;
    let check = filterComponent.isVisible;
    filterComponent.isVisible = !check;

    if(check){
      // we're turning off the popup and returning from function
      return;
    }
    // the below force layout will adjust the up arrow position which will be used in finding difference
    filterComponent.left='0dp';
    filterComponent.top='0dp';
    this.view.forceLayout();


    // 3 positions based on widget
    let e = document.getElementById('flxSignatoryGroupActionHeader_'+widget);
    // Header icon
    var rect = e.getBoundingClientRect(); 
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    // getting the arrow position of the component should be around 0 px
    var rect2  = document.getElementById('frmCompanies_'+filterComponent.id+'_imgUpArrow').getBoundingClientRect();
    var diff = rect.left - rect2.left;

    filterComponent.left = diff + 'px';
    var diff = rect.top - rect2.top;
    filterComponent.top = diff+7 + "px";
    this.view.forceLayout();
  },
  toggleFeaturesonClick : function(collapsibleSegmentToAdd,eventObj){
    var parentFlexCont = this.view.flxFeaturesByCustomerCont;
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
  toggleSignGroupActions : function(context,collapsibleSegment){
    var self = this;
    var selectedRowData = [];
    var segData=collapsibleSegment.SegActions.data;
    var sectionIndex =context.rowContext.sectionIndex;
    var isExpanded=false;
    if(sectionIndex!==null&&sectionIndex!==undefined)
      isExpanded=segData[sectionIndex][0].flxViewAccountsHeader.isVisible?true:false;
    for(let a=0;a<segData.length;a++){
      segData[a][0].lblToggle.text="\ue922";
      segData[a][0].flxViewAccountsHeader.isVisible=false;
      for(let b=0;b<segData[a][1].length;b++)
        segData[a][1][b].flxSignatoryGroupActionBody.isVisible=false;
    }
    if(!isExpanded){
      segData[sectionIndex][0].lblToggle.text="\ue915";
      segData[sectionIndex][0].flxViewAccountsHeader.isVisible=true;
      for(let c=0;c<segData[sectionIndex][1].length;c++)
        segData[sectionIndex][1][c].flxSignatoryGroupActionBody.isVisible=true;
      collapsibleSegment.SegActions.info.allData={};
      collapsibleSegment.SegActions.info.allData[segData[sectionIndex][0].lblFeatureName.text] = {"sectionData":segData[sectionIndex][0],
                                                                                                  "rowData":segData[sectionIndex][1]};
      this.setDataForAccTypeFilter(segData[sectionIndex][1],collapsibleSegment);
    }else{
      segData[sectionIndex][0].lblToggle.text="\ue922";
      segData[sectionIndex][0].flxViewAccountsHeader.isVisible=false;
      for(let c=0;c<segData[sectionIndex][1].length;c++)
        segData[sectionIndex][1][c].flxSignatoryGroupActionBody.isVisible=false;
    }
    collapsibleSegment.SegActions.setData(segData);
    this.view.forceLayout();
  },

  /*
  * set data to filter in add users account type
  * @param: selected section accounts data
  */
  setDataForAccTypeFilter : function(accountsData,compPath){
    var self = this;
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var accList =[], maxSizeAccTypeText ="";
    for(var i=0;i<accountsData.length;i++){
      if(!accList.includes(accountsData[i].lblAccountTypeHeader.text))
        accList.push(accountsData[i].lblAccountTypeHeader.text);
    }
    var ownershipData = accList.map(function(rec){
      maxSizeAccTypeText=rec.length > maxSizeAccTypeText.length ? rec: maxSizeAccTypeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
        "lblDescription": rec
      };
    });
    this.view.accTypeFilterMenu.info={"component":compPath};
    this.view.accTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.accTypeFilterMenu.segStatusFilterDropdown.setData(ownershipData);
    this.view.accTypeFilterMenu.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeAccTypeText)+55+"px";
    var selOwnerInd = [];
    for(var j=0;j<accList.length;j++){
      selOwnerInd.push(j);
    }
    this.view.accTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selOwnerInd]];
    this.view.forceLayout();
  },

  /*
  * toggles the card to show the list of features container
  * @param: current card widget path, option(1/2)
  */
  toggleCardVisibility : function(cardWidget){
    var custFeatureCards = [];
    custFeatureCards = this.view.flxAccountFeaturesCardList.widgets();

    for(var j=0; j<custFeatureCards.length; j++){
      if(custFeatureCards[j].id === cardWidget.id){
        var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
        cardWidget.toggleCollapseArrow(!visibilityCheck);
        //collapses segment section inside the card
        var segData = cardWidget.segAccountFeatures.data;
        for(var k=0;k< segData.length;k++){
          if(segData[k][0].lblArrow.skin !== "sknfontIconDescRightArrow14px"){
            segData[k][0].flxViewActionHeader.isVisible = false;
            segData[k][0].lblFASeperator3.isVisible = false;
            segData[k][0].lblArrow.text = "\ue922";
            segData[k][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
            segData[k][1] = this.showHideRowFlex(segData[k][1],false);
          }
        }
        cardWidget.segAccountFeatures.setData(segData);
      }
      else{
        this.view[custFeatureCards[j].id].toggleCollapseArrow(false);
      }
    }
  },
  /*
  * set segment rows visibility
  * @params: rows array, visibility - true/false
  * @return: updated rows data with visibilty
  */
  showHideRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      if(rowsData[i].flxContractsFABodyView){
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractsFABodyView.isVisible = visibility;
      } 
    }
    return rowsData;
  },
  /*
  * expand/collapse the rows under a section
  * @param: segment widget path, event
  */
  toggleSegmentSecArrow : function(segmentWidgetPath,event){
    var segData = segmentWidgetPath.data;
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections
    for(var i=0;i< segData.length;i++){
      segData[i][0].lblFASeperator3.isVisible = false;
      if(selectedSecInd !== i){
        segData[i][0].flxViewActionHeader.isVisible = false;
        segData[i][0].lblArrow.text = "\ue922";
        segData[i][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
        segData[i][1] = this.showHideRowFlex(segData[i][1],false);
      }
    }

    //update selected section
    if(segData[selectedSecInd][1][0].isRowVisible === false){
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = true;
      segData[selectedSecInd][0].lblArrow.text = "\ue915";
      segData[selectedSecInd][0].lblArrow.skin = "sknfontIconDescDownArrow12px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1],true);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblFASeperator3.isVisible = true;
      }
    } else{
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = false;
      segData[selectedSecInd][0].lblArrow.text = "\ue922";
      segData[selectedSecInd][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1],false);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblFASeperator3.isVisible = false;
      }
    }
    segmentWidgetPath.setData(segData);
  },
  setListFiltersData: function (segData,segPath) {
    var self = this;
    var roleList=[];
    var maxSizeText="";
    var filterPath="";
    var filterCompPath="";
    if(segPath.id==="segSelectionList"){
      filterPath=this.view.flxFilterMenu;
      filterCompPath=this.view.filterMenu;
    }else if(segPath.id==="segSearchedUserDetails"){
      filterPath=this.view.flxRoleFilter;
      filterCompPath=this.view.roleFilterMenu;
    }else{
      filterPath=this.view.flxRoleFilterView;
      filterCompPath=this.view.roleFilterViewMenu;
    }
    for(var i=0;i<segData.length;i++){
      if(!roleList.contains(segData[i].lblrole.text))
        roleList.push(segData[i].lblrole.text);
    }
    var widgetMap = {
      "role": "role",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var roleData = roleList.map(function(rec){
      maxSizeText=rec.length> maxSizeText.length?rec: maxSizeText;
      return {
        "role": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    filterCompPath.segStatusFilterDropdown.widgetDataMap = widgetMap;
    filterCompPath.segStatusFilterDropdown.setData(roleData);
    filterPath.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55+"px";

    var selRoleInd = [];
    for(var j=0;j<roleList.length;j++){
      selRoleInd.push(j);
    }
    filterCompPath.segStatusFilterDropdown.selectedIndices = [[0,selRoleInd]];
    self.view.forceLayout();
  },

  showLoadingScreen: function (timeInSec) {
    var self =this;
    var timeVal = (timeInSec/2) * 1000;
    if(this.view.flxLoading.timeoutHandle) clearTimeout(this.view.flxLoading.timeoutHandle);
    this.view.flxLoading.timeoutHandle = setTimeout(function(){
      self.view.flxLoading.setVisibility(false);
      if(self.view.flxLoading.timeoutHandle) clearTimeout(self.view.flxLoading.timeoutHandle);
    }, timeVal);
  },
  getPhoneNumberFormatted : function(data){
    var completePhnNum = "";
    if(data.phoneNumber){ //if data have isd,phone num seperated
      var isdNum = data.phonePrefix ? (data.phonePrefix.indexOf("+") >= 0 ? data.phonePrefix : "+"+data.phonePrefix) : "";
      completePhnNum = isdNum.length > 0 ? isdNum+"-"+data.phoneNumber : data.phoneNumber;
    } 
    else{ //considering from primaryphn num
      if(data.PrimaryPhoneNumber){
        var phnNum ="",isd = "";
        if(data.PrimaryPhoneNumber.indexOf("-")>= 0){
          var phnNumArr = data.PrimaryPhoneNumber.split("-");
          phnNum = phnNumArr.length === 2 ? phnNumArr[1]: phnNumArr.length > 0 ? phnNumArr[0]: "";
          isd = phnNumArr.length === 2 ? (phnNumArr[0].indexOf("+") >= 0 ? phnNumArr[0] : "+"+phnNumArr[0]): "";
        } else if(data.PrimaryPhoneNumber.indexOf("+")>= 0){
          isd = "";
          phnNum = data.PrimaryPhoneNumber.substring(1,data.PrimaryPhoneNumber.length);
        } else{
          isd ="";
          phnNum = "";
        }
        completePhnNum = isd.length > 0 ? isd+"-"+phnNum : phnNum;
      }
    }
    return completePhnNum;
  },
  onCreateContractClick : function (){
    var scopeObj = this;
    scopeObj.view.breadcrumbs.btnBackToMain.text = "CONTRACTS"
    scopeObj.view.breadcrumbs.lblCurrentScreen.text = "CREATE CONTRACT";
    scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    scopeObj.view.mainHeader.btnDropdownList.setVisibility(false);
    scopeObj.view.tbxRecordsSearch.text="";
    scopeObj.selectedServiceCard= null;
    scopeObj.action = scopeObj.actionConfig.create;
    scopeObj.limitsActualJSON={};
    scopeObj.updateButtonsText(false);
    scopeObj.fetchCustomerStatusList();
    scopeObj.hideRequiredMainScreens(scopeObj.view.flxCreateContract);
    scopeObj.view.flxBreadcrumb.setVisibility(true);
    scopeObj.setContractButtonsSkin(false);
    scopeObj.enableAllTabs(false);
    // scopeObj.presenter.getServiceDefinitionsForContracts({});
    //scopeObj.presenter.getServiceDefinitionsForContracts({},"CREATE", scopeObj.formName);
    scopeObj.presenter.getLegalEntities({}, scopeObj.formName);
    scopeObj.view.segAddedCustomers.setVisibility(false);
    scopeObj.view.btnSelectCustomers.setVisibility(false);
    scopeObj.view.typeHeadContractCountry.tbxSearchKey.info = {"isValid":false,"data":""};
    scopeObj.view.lblContractCustomersHeader.text="Select Customers";
    scopeObj.view.flxNoCustomersAdded.setVisibility(true);
    scopeObj.showContractServiceScreen();
    scopeObj.monetaryLimits={};
    scopeObj.createContractRequestParam={
      "contractName": "",
      "serviceDefinitionName": "",
      "serviceDefinitionId": "",
      "faxId": "",
      "communication": [],
      "address": [],
      "contractCustomers": []
    };
    scopeObj.view.mainHeader.btnAddNewOption.setVisibility(false);
    scopeObj.view.mainHeader.btnDropdownList.setVisibility(false);
    scopeObj.view.flxSettings.setVisibility(false);
    scopeObj.getCountrySegmentData();
    scopeObj.initialFeaturesJson ={};
    scopeObj.view.forceLayout();
  },
  showContractServiceScreen: function(){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow0,this.view.verticalTabsContract.btnOption0);
    this.hideAllScreens();
    if(this.view.tbxRecordsSearch.text.length>0||(this.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices&&this.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices[0][1].length!==this.view.serviceTypeFilterMenu.segStatusFilterDropdown.data.length)){
      this.view.flxClearRecordsSearch.onClick();
    }
    this.view.flxContractServiceTab.setVisibility(true);
    this.view.forceLayout();
  },
  hideAddressSegments : function(typeHeadPath){
    this.view.typeHeadContractCountry.segSearchResult.setVisibility(false);
    if(typeHeadPath){
      typeHeadPath.segSearchResult.setVisibility(true);
    }
  },
  /*
   * search on address fields while typing in textbox
   * @param: textbox path, sement path
   * @param: category ( 1-country, 2- state, 3-city)
   */
  searchForAddress : function(tbxPath,segPath,noResultFlex,category){
    var self = this;
    var searchText = tbxPath.text;
    var sourceData = [],dataToAssign = [];
    if(category === 1){
      sourceData =self.segCountry;
      dataToAssign = sourceData.filter(function(rec){
        var name = (rec.lblAddress.text).toLowerCase();
        return (name.indexOf(searchText.toLowerCase()) > -1);
      });
    }
    if(searchText === "") dataToAssign = [];
    segPath.setData(dataToAssign);
    if(dataToAssign.length > 0){
      segPath.setVisibility(true);
      noResultFlex.setVisibility(false);
    }else{
      segPath.setVisibility(false);
      noResultFlex.setVisibility(true);
    }
    self.view.forceLayout();
  },
  toggleContractFeaturesCustomerLevel : function(){
    this.view.tbxContractFASearch.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.lblContractFAHeader.text = "View by Customer";
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    this.view.toggleContractButtonsFeatures.info.selectedTab = 1;
    var dataToSet=[];
    for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
          dataToSet=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].features));
          break;
        }
      }
        this.setFeaturesDataCustomers(JSON.parse(JSON.stringify(dataToSet)));
    this.view.forceLayout();
    //this.setCustSelectedData("customersDropdownFA",false);
  },
  toggleContractFeaturesAccountLevel : function(toCheck){
    this.view.flxContractAccountFAList.setVisibility(true);
    this.view.flxContractFAList.setVisibility(false);
    this.toggleButtonsUtilFunction([this.view.toggleContractButtonsFeatures.btnToggleLeft,this.view.toggleContractButtonsFeatures.btnToggleRight],2);
    this.view.toggleContractButtonsFeatures.info.selectedTab = 2;
    this.view.tbxContractFASearch.placeholder="Search By Account Number, Account Name";
    this.view.lblContractFAHeader.text = "View by Accounts";
    this.view.tbxContractFASearch.text="";
    this.view.flxClearContractFASearch.setVisibility(false);
    this.setContractAccountLvlFeatures(toCheck);
    //this.setAccountTypesFilter(1);
    this.view.forceLayout();
    //this.setFilterDataInFeaturesLimitsTab();
  },
  getAccountLvlFeaturesActions : function(){
    var self =this;
    var accIds=[];
    var accountPortfolioJson={};
    var tempJSON={};
    var selectedCust=this.createContractRequestParam.contractCustomers;
    for (let i=0;i<selectedCust.length;i++){
      for(let j=0;j<selectedCust[i].accounts.length;j++){
//         tempJSON={
//               "coreCustomerId":selectedCust[i].coreCustomerId,
//               "coreCustomerName":selectedCust[i].coreCustomerName,
//               "accountName":selectedCust[i].accounts[j].accountName,
//               "accountType":selectedCust[i].accounts[j].accountType,
//               //"isPortfolioAccount":selectedCust[i].accounts[j].isPortfolioAccount,
//               "accountId":selectedCust[i].accounts[j].accountId,
//               "featurePermissions":[]
//             };
//         if(selectedCust[i].accounts[j].isPortfolioAccount==="true"){
//           tempJSON["portfolioId"]=selectedCust[i].accounts[j].portfolioId;
//           tempJSON["portfolioName"]=selectedCust[i].accounts[j].portfolioName;
//           if(accIds.indexOf(selectedCust[i].accounts[j].portfolioId)<0)
//             accIds.push(selectedCust[i].accounts[j].portfolioId);
//         }
        if(accIds.indexOf(selectedCust[i].accounts[j].productId)<0){
          accIds.push(selectedCust[i].accounts[j].productId)
//           accountPortfolioJson[selectedCust[i].accounts[j].productId]={
//             [selectedCust[i].coreCustomerId]:[tempJSON]
//           }
        }
//         else{
//           accountPortfolioJson[selectedCust[i].accounts[j].productId][selectedCust[i].coreCustomerId].push(tempJSON);
//         }
        
      }
    }
    //this.view.toggleContractButtonsFeatures.btnToggleRight.info=accountPortfolioJson;
    var serviceDefId = this.selectedServiceCard ? this.view[this.selectedServiceCard].lblCategoryName.info.catId : this.createContractRequestParam.serviceDefinitionId;
    this.presenter.getServiceDefinitionProductIdPermissions({
      "serviceDefinitionId": serviceDefId || "",
      "productIdList":JSON.stringify(accIds),
      "legalEntityId": this.selectedEntityCard || this.createContractRequestParam.legalEntityId
    },"", this.formName);
//     this.presenter.getServiceDefinitionProductIdPermissions({
//       "serviceDefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
//     "productIdList": "[\"CURRENT.ACCOUNT\"]"
//     });
  },
  setContractAccountLvlFeatures : function(toCheck){
    var accounts=[];
    var custId = this.toggleAccountSelectedId;
        //this.view.customersDropdownFA.lblSelectedValue.info.id;
    this.createContractRequestParam.accountLevelPermissions = this.createContractRequestParam.accountLevelPermissions ? this.createContractRequestParam.accountLevelPermissions : [];
    for(let w=0;w<this.createContractRequestParam.accountLevelPermissions.length;w++){
      if(custId===this.createContractRequestParam.accountLevelPermissions[w].coreCustomerId){
        accounts=this.createContractRequestParam.accountLevelPermissions[w].accounts;
      }
    }
    //var portfolioLvlAccounts={};
    for(var x=0;x<accounts.length;x++){
      var accountJSON={
        "accountId":accounts[x].accountId,
        "accountName":accounts[x].accountName,
        "ownershipType":accounts[x].ownershipType,
        "accountType":accounts[x].accountType,
        "features":accounts[x].features || [],
        "isEnabled": accounts[x].isEnabled
      };
//       if(accounts[x].portfolioId){
//         if(portfolioLvlAccounts[accounts[x].portfolioId]===undefined||portfolioLvlAccounts[accounts[x].portfolioId]==={})
//           portfolioLvlAccounts[accounts[x].portfolioId]={
//             "portfolioId": accounts[x].portfolioId,
//             "portfolioName":accounts[x].portfolioName,
//             "accounts":[]
//           }
//           portfolioLvlAccounts[accounts[x].portfolioId].accounts.push(accountJSON);
//           }
    }
    //this.setPortfolioSegmentData(portfolioLvlAccounts,accounts);
    if(toCheck!="true"){
      this.setPortfolioSegmentData(accounts);
    }
  },
  setPortfolioSegmentData: function (allAccounts) {
    //kony.adminConsole.utils.hideProgressBar(this.view);
    var self = this;
    var dataMap = {
      "flxViewFeatures": "flxViewFeatures",
      // "flxViewFeatureContainer":"flxViewFeatureContainer",
      "flxHeader": "flxHeader",
      "flxArrow": "flxArrow",
      "lblDownArrow": "lblDownArrow",
      "flxFeatureDetails": "flxFeatureDetails",
      "flxRow1": "flxRow1",
      "flxFeatureDetails": "flxFeatureDetails",
      "lblAccountTypeName": "lblAccountTypeName",
      "lblAccountTypeID": "lblAccountTypeID",
      "lblFeatureView": "lblFeatureView",
      "flxSelectedActions": "flxSelectedActions",
      "lblAvailableActions": "lblAvailableActions",
      "lblCountActions": "lblCountActions",
      "lblTotalActions": "lblTotalActions",
      "lblFASeperator1": "lblFASeperator1",
      //segmentaccounts header
      "flxViewFeatureDetailsHeader": "flxViewFeatureDetailsHeader",
      "flxAccountNumber": "flxAccountNumber",
      "lblAccountNumber": "lblAccountNumber",
      "fontIconAccNumberSort": "fontIconAccNumberSort",
      "flxAccountType": "flxAccountType",
      "lblAccountType": "lblAccountType",
      "fontIconAccTypeFilter": "fontIconAccTypeFilter",
      "flxAccountName": "flxAccountName",
      "lblAccountNameHeader": "lblAccountNameHeader",
      "fontIconAccNameSort": "fontIconAccNameSort",
      "flxOwnershipType": "flxOwnershipType",
      "lblOwnershipType": "lblOwnershipType",
      "fontFilterOwnershipType": "fontFilterOwnershipType",
      "flxViewFeature": "flxViewFeature",
      "lblViewFeature": "lblViewFeature",
      "lblFeatureHeaderSeperator": "lblFeatureHeaderSeperator",
      //body template map
      "flxViewFeatureBody": "flxViewFeatureBody",
      "flxFeaturesContainer": "flxFeaturesContainer",
      "lblAccountNumber": "lblAccountNumber",
      "lblAccountType": "lblAccountType",
      "lblAccountName": "lblAccountName",
      "lblOwnershipType": "lblOwnershipType",
      "lblView": "lblView",
      "lblSeperator": "lblSeperator",
      "template": "template",
      //no filter
      "flxApprovalMatrixNoRangeRow": "flxApprovalMatrixNoRangeRow",
      "flxNoRangesCont": "flxNoRangesCont",
      "flxApprovalEdit": "flxApprovalEdit",
      "imgIcon": "imgIcon",
      "lblNoApprovalText": "lblNoApprovalText",
      "btnAddApproval": "btnAddApproval",
      "lblLine": "lblLine",
      "lblIconaction": "lblIconAction"
    };
    var count = 0;
    for (var i = 0; i < allAccounts.length; i++) {
      if (allAccounts[i].isEnabled == true || allAccounts[i].isEnabled == "true") {
        count++;
      }
    }
    //var portfolioIds=Object.keys(portfolioAccounts);
    var segData = [];
    var secData, rowData;
    this.totalCombinedData = [];
    var segmentPath = this.view.segContractPortfolio;
    var accSecData = {
      "template": "flxViewFeatures",
      "flxViewFeature": { "isVisible": true, "bottom": "20px" },
      "flxHeader": { "skin": "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px" },//sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound"},
      "lblViewFeature": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.FEATURES") },
      "flxArrow": {
        "isVisible": allAccounts.length === 0 ? false : true, "onClick": function (context, eventObj) {
          self.togglePortfolioSection(context, eventObj, 2);
          ///self.setViewListFilterOwnershipData(self.setFilterDataForPortfolioFeature, segmentPath, context);
        }
      },
      "lblDownArrow": { "isVisible": true, "text": "\ue915" },
      "flxViewFeatureDetailsHeader": { "isVisible": true, "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight" },
      "lblAccountTypeName": { "text": kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts") },
      "lblAvailableActions": { "text": kony.i18n.getLocalizedString("i18n.frmComapnies.NumberOfAccounts") },
      "lblCountActions": { "text": self.getTwoDigitNumber(count) },
      "lblAccountNameHeader": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME") },
      "fontIconAccNumberSort": { "text": "\ue92a", "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont" },
      "fontIconAccNameSort": { "text": "\ue92b", "skin": "sknIcon12pxBlack", "hoverSkin": "sknIcon12pxBlackHover" },
      "flxAccountName": {
        "onTouchStart": function (context) {
          self.sortAndSetData("lblAccountName.text", self.view.segContractPortfolio, 4, context.rowContext.sectionIndex)
        }
      },
      "flxAccountNumber": {
        "onTouchStart": function (context) {
          self.sortAndSetData("lblAccountNumber.text", self.view.segContractPortfolio, 4, context.rowContext.sectionIndex)
        }
      },
      "flxOwnershipType": { "onClick": self.showFilterByAcc.bind(self, 2, 1) },
      "lblAccountNumber": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER") },
      "lblAccountType": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE") },
      "lblOwnershipType": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE") },
      "flxAccountType": { "onClick": self.showFilterByAcc.bind(self, 1, 1) },
      "lblHeaderSeperator": { "isVisible": true, "text": "-" },
      "fontIconAccTypeFilter": { "isVisible": true },
      "fontFilterOwnershipType": { "isVisible": true },
      "lblFeatureHeaderSeperator": { "text": "-", "isVisible": true, "skin": "sknLblSeparator696C73" },
    };
    var accRowData = [];
    var accRowJSON = {};
    for (var y = 0; y < allAccounts.length; y++) {
      if (allAccounts[y].isEnabled === true || allAccounts[y].isEnabled === "true") {
        accRowJSON = ({
          "template": "flxViewFeatureBody",
          "flxViewFeatureBody": { "isVisible": true },
          "flxNoRangesCont": { "isVisible": false },
          "lblAccountName": { "text": allAccounts[y].accountName ? allAccounts[y].accountName : "N/A" },
          "lblAccountNumber": { "text": allAccounts[y].accountId ? allAccounts[y].accountId : "N/A" },
          "lblAccountType": { "text": allAccounts[y].accountType ? allAccounts[y].accountType : "N/A" },
          "lblOwnershipType": { "text": allAccounts[y].ownershipType ? allAccounts[y].ownershipType : "N/A" },
          "features": { "text": allAccounts[y].features === undefined ? JSON.stringify(allAccounts[y].featurePermissions) : JSON.stringify(allAccounts[y].features) },
          "isPortfolio": false,
          // "portfolioId":allAccounts[y].portfolioId,
          "lblView": {
            "text": "Edit", "isVisible": true, "onTouchStart": function (context) {
              self.editAccountLvlFeatures(context);
            }
          },
          "isRowVisible": false,
          "lblSeperator": { "isVisible": true, "skin": "sknlblSeperatorD7D9E0" }
        });
        accRowData.push(accRowJSON);
      }
    }
    var secData = accSecData;
    this.totalCombinedData.push({ secData: { secData }, rowData: [accRowData] });
    segmentPath.info.allData = { "sectionData": accSecData };
    segmentPath.info.allData.rowsData = accRowData;
    this.sortBy = this.getObjectSorter("lblAccountNumber.text");
    this.sortBy.inAscendingOrder = true;
    segmentPath.widgetDataMap = dataMap;
    segmentPath.rowTemplate = "flxViewFeatures";
    accSecData.fontIconAccNumberSort = this.determineSortIconForSeg(this.sortBy, "lblAccountNumber.text");
    accSecData.fontIconAccNameSort = this.determineSortIconForSeg(this.sortBy, "lblAccountName.text");
    accRowData = accRowData.sort(this.sortBy.sortData);
    segData.push([accSecData, accRowData]);
    this.view.segContractPortfolio.info = { "secData": accSecData, "rowsData": accRowData };
    segmentPath.setVisibility(true);
    segmentPath.info.portfolioData = { "sectionData": segData };
    this.setFilterDataForPortfolioFeature = segmentPath.info.portfolioData.sectionData;
    //segmentPath.setData([[secData, sortedData]]);
    self.view.segContractPortfolio.widgetDataMap = dataMap;
    self.view.segContractPortfolio.setData(segData);
    self.setFeaturesAccountsFilterDataContract([[accSecData, accRowData]], 1);
    //  this.setFilterDataForAllFeature= segmentPath.info.allData.sectionData;
    this.view.forceLayout();
  },
  filterBasedOnAccounts: function () {
    var selFilter = [[]];
    var dataToReturn = [];
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var accountTypeInd = null;
    var ownershipTypeInd = null;
    var ownershipIndices = this.view.filterMenu2.segStatusFilterDropdown.selectedIndices;
    var accountTypeIndices = this.view.filterMenu1.segStatusFilterDropdown.selectedIndices;
    var toBeFilteredData = this.ownershipFilterData[1];
    var segData = this.ownershipFilterData[0];
    //get Account Type
    var types = "";
    accountTypeInd = accountTypeIndices ? accountTypeIndices[0][1] : [];
    for (var j = 0; j < accountTypeInd.length; j++) {
      selFilter[0][0].push(this.view.filterMenu1.segStatusFilterDropdown.data[accountTypeInd[j]].lblDescription);
    }
    //get ownership type
    var types = "";
    ownershipTypeInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < ownershipTypeInd.length; j++) {
      selFilter[0][1].push(this.view.filterMenu2.segStatusFilterDropdown.data[ownershipTypeInd[j]].lblDescription);
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToReturn = [];
    } else if (selFilter[0][0].length === this.view.filterMenu1.segStatusFilterDropdown.data.length && selFilter[0][1].length == this.view.filterMenu2.segStatusFilterDropdown.data.length)
      dataToReturn = toBeFilteredData;
    else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) { //both filters selected
      dataToReturn = toBeFilteredData.filter(function (rec) {
        if (selFilter[0][0].indexOf(rec.lblAccountType.text) >= 0 && selFilter[0][1].indexOf(rec.lblOwnershipType.text) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
    }
    return [segData, dataToReturn];
  },
  showFilterByAcc: function(option, category, event, context) {
    this.selectedSectionIndexFilter= context.sectionIndex;
    var flxTypeFilterWid =  this.view.flxAccountsFilter1 ;//: this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu;
    var flxOwnershipFilterWid =  this.view.flxAccountsFilter2 ;//: this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc;
    var typeFilterIcon =  "fontIconAccTypeFilter" ;
    var ownershipFilterIcon = "fontFilterOwnershipType" ;
    if (option === 1) flxOwnershipFilterWid.setVisibility(false);
    else if (option === 2) flxTypeFilterWid.setVisibility(false);
    var filterWidget = (option === 1) ? flxTypeFilterWid : flxOwnershipFilterWid;
    var filterIcon = (option === 1) ? typeFilterIcon : ownershipFilterIcon;
    var flxRight = context.widgetInfo.frame.width - event.frame.x - event.frame.width;
    var iconRight = event.frame.width - event[filterIcon].frame.x;
    filterWidget.right = category === 1 ? (flxRight + iconRight - 12) + "dp" : (flxRight + iconRight - 22) + "dp";
    filterWidget.top = category === 1 ? "100dp" : "40dp";
    if (filterWidget.isVisible) {
        filterWidget.setVisibility(false);
    } else {
        filterWidget.setVisibility(true);
    }
},
  togglePortfolioSection: function (event, eventObj, check) {
    //this.view.flxFeatureDetailsFilter.setVisibility(false);
    //this.view.flxAccountTypeDetailsFilter.setVisibility(false);
    var selInd = eventObj.sectionIndex;
    if (check === 2) {
      var segData = this.view.segContractPortfolio.data;
    }
    else {
      var segData = this.view.segViewFeatureHeader.data;
    }
    var data = this.totalCombinedData[selInd].rowData[0];
    var segmentData = this.totalCombinedData[selInd].secData.secData;
    if (segData[selInd][1].length === 1 && segData[selInd][1][0].flxNoRangesCont.isVisible === true) {
      segData[selInd][1][0].flxNoRangesCont.isVisible = false;
      segData[selInd][1] = data;
      segData[selInd][0] = segmentData;
    }
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections
    for (var i = 0; i < segData.length; i++) {
      //segData[i][0].lblFASeperator1.isVisible = false;
      if (selectedSecInd !== i) {
        segData[i][0].flxViewFeatureDetailsHeader.isVisible = false;
        segData[i][0].lblHeaderSeperator.isVisible = true;
        segData[i][0].lblDownArrow.text = "\ue922"; //right-arrow
        segData[i][0].lblDownArrow.skin = "sknIcon00000015px";
        segData[i][1] = this.showHideRowFlex(segData[i][1], false);
      }
    }
    //update selected section
    if (segData[selectedSecInd][1][0].isRowVisible === false) {
      segData[selectedSecInd][0].flxViewFeatureDetailsHeader.isVisible = true;
      segData[selectedSecInd][0].lblHeaderSeperator.isVisible = true;
      segData[selectedSecInd][0].lblDownArrow.text = "\ue915";
      segData[selectedSecInd][0].lblDownArrow.skin = "sknIcon00000015px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1], true);
      if (selectedSecInd < (segData.length - 1)) {
        //lblFASeperator3segData[selectedSecInd+1][0].lblFASeperator1.isVisible = true;
      }
    } else {
      segData[selectedSecInd][0].flxViewFeatureDetailsHeader.isVisible = false;
      segData[selectedSecInd][0].lblHeaderSeperator.isVisible = true;
      segData[selectedSecInd][0].lblDownArrow.text = "\ue922";
      segData[selectedSecInd][0].lblDownArrow.skin = "sknIcon00000015px";
      segData[selectedSecInd][0].lblCountActions.text = this.getTwoDigitNumber(data.length);
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1], false);
      if (selectedSecInd < (segData.length - 1)) {
        //  segData[selectedSecInd+1][0].lblFASeperator1.isVisible = false;
      }
    }
    if (check === 2) {
      this.view.segContractPortfolio.setData(segData);
    } else {
      this.view.segViewFeatureHeader.setData(segData);
    }
    this.view.forceLayout();
  },
  editAccountLvlFeatures: function(context){
    var rowIndex=context.rowContext.rowIndex;
    var secIndex=context.rowContext.sectionIndex;
    var segData=this.view.segContractPortfolio.data;
    var featuresList=segData[secIndex][1][rowIndex].features;
    var accId=segData[secIndex][1][rowIndex].lblAccountNumber.text;
    this.searchFeatureOnEdit=JSON.parse(featuresList.text)  ;
    this.accIdForByFeatures=accId;
    this.view.lblCountFeatures.text = segData[secIndex][1][rowIndex].lblAccountName.text + " (" +accId+")";
    this.setAddFeaturesSegData(JSON.parse(featuresList.text),accId);
    this.view.flxContractFeaturesToggleButtons.setVisibility(false);
    this.view.flxContractAccountFAList.setVisibility(false);
    this.view.flxContractsFATopSection.top="40px";
    this.view.flxAddProductFeaturesBack.setVisibility(true);
    this.view.btnUpdateInBulkFA.setVisibility(false);
    this.view.flxAddProductFeatures.setVisibility(true);
    this.view.tbxContractFASearch.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.accountTypeFilter="selectFeature";
    this.view.flxNoCustomerSelectedFA.setVisibility(false);
    this.view.flxNoFeatures.setVisibility(false);
    this.view.tbxContractFASearch.text="";
    this.view.forceLayout();
  },
  editAccountLvlFeaturesBack: function(toCheck){
    this.view.flxContractFeaturesToggleButtons.setVisibility(true);
    this.view.flxContractAccountFAList.setVisibility(true);
    this.view.flxContractsFATopSection.top="0px";
    this.view.flxAddProductFeaturesBack.setVisibility(false);
    this.view.btnUpdateInBulkFA.setVisibility(true);
    this.view.flxAddProductFeatures.setVisibility(false);
    this.toggleContractFeaturesAccountLevel(toCheck);
    this.view.tbxContractFASearch.text="";
    this.view.flxNoFeatures.setVisibility(false);
    this.view.forceLayout();
  },
  editCustomerLvlFeaturesBack :function(){
    this.view.tbxContractFASearch.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.flxContractFeaturesToggleButtons.setVisibility(true);
    this.view.flxContractFAList.setVisibility(true);
    this.view.flxContractsFATopSection.top = "0px";
    this.view.flxAddProductFeaturesBack.setVisibility(false);
    this.view.btnUpdateInBulkFA.setVisibility(true);
    this.view.flxAddProductFeatures.setVisibility(false);
    this.view.tbxContractFASearch.text="";
    this.view.forceLayout();
		},
  /* PRODUCT FEATURES: set data to add product features */
  setAddFeaturesSegData: function (features, accId) {
    var self = this;
    var selFeatureCount = 0, segDataJson = {};
    if (features.length == 0) {
      this.view.lblselectAllFeatures.setVisibility(false);
      this.view.flxAddProductFeatures.setVisibility(false);
      this.view.flxSegAddFeaturesCont.setVisibility(false);
      this.view.flxNoFeatures.setVisibility(true);
      this.view.flxSelectAllFeatures.setVisibility(false);
    }
    else {
      var segData = features.map(function (featureObj) {
        var rowsData = [], selRowCount = 0;
        var actions = featureObj.actions || featureObj.permissions || [];
        for (var i = 0; i < actions.length; i++) {
          var rowObj = {
            "id": actions[i].actionId || actions[i].id,
            "actionDetailsObj": actions[i],
            "flxContractEnrollFeaturesEditRow": { "isVisible": false, "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight" },
            "lblFeatureName": { "text": actions[i].actionName || actions[i].name },
            "flxCheckbox": { "onClick": self.onClickAddFeaturesCheckbox.bind(self, self.view.segAddProductFeatures) },
            "lblCheckbox": { "isVisible": true, "text": (actions[i].isEnabled === true || actions[i].isEnabled === "true") ? self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl,
                             "skin":"sknBgB7B7B7Sz20pxCheckbox"},
            "lblStatus": {
              "text": (actions[i].status || actions[i].actionStatus) === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")
            },
            "lblIconStatus": {
              "text": "\ue921",
              "skin": (actions[i].status || actions[i].actionStatus) === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                "sknFontIconActivate" : "sknfontIconInactive"
            },
            "flxFeatureNameCont": { "left": "40dp" },
            "dependentActions": actions[i].dependentActions,
            "template": "flxContractEnrollFeaturesEditRow"
          };
          rowObj.lblCheckbox.skin = self.applyCheckboxSkin(rowObj.lblCheckbox);
          rowsData.push(rowObj);
          selRowCount = (actions[i].isEnabled === undefined || actions[i].isEnabled === "true") ? (selRowCount + 1) : selRowCount;
        }

        var feature = featureObj;
        var secData = {
          "id": feature.featureId || feature.id,
          "featureDetailsObj": feature,
          "flxAccountSectionCont": { "skin": "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px" },
          "lblFeatureName": { "text": feature.featureName || feature.name },
          "flxToggleArrow": { "onClick": self.toggleSelectFeatureArrow.bind(self, self.view.segAddProductFeatures) },
          "lblIconToggleArrow": { "text": "\ue922", "skin": "sknIcon00000015px" },
          "flxHeadingCheckbox": { "isVisible": true, "onClick": self.onClickAddFeaturesCheckbox.bind(self, self.view.segAddProductFeatures) },
          "lblTopCheckbox": {  "isVisible": true, "text": self.getHeaderCheckboxLabel(rowsData, true, true)},
          "lblAvailableActions": { "text": kony.i18n.getLocalizedString("i18n.products.SelectedAccountActionsColon") },
          "lblCountActions": { "text": self.getTwoDigitNumber(selRowCount) },
          "lblTotalActions": { "text": "of " + self.getTwoDigitNumber(rowsData.length) },
          "lblSectionLine": "-",
          "lblStatusValue": {
            "text": (feature.featureStatus || feature.status) === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
              kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")
          },
          "lblIconStatus": {
            "text": "\ue921",
            "skin": (feature.featureStatus || feature.status) === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
              "sknFontIconActivate" : "sknfontIconInactive"
          },
          "flxHeaderContainer": { "isVisible": false },
          "flxActionsHeaderContainer": { "isVisible": false },
          "flxActionCheckbox": { "isVisible": false },
          "lblActionName": { "text": kony.i18n.getLocalizedString("i18n.products.Action_UC") },
          "lblActionStatus": { "text": kony.i18n.getLocalizedString("i18n.roles.STATUS") },
          "lblActionSeperator": { "skin": "sknlblSeperatorD7D9E0", "text": "-" },
          "flxActionNameHeading": { "left": "55dp" },
          "template": "flxEnrollSelectedAccountsSec",
        };
        //         selFeatureCount = (secData.imgTopCheckbox.src === self.AdminConsoleCommonUtils.checkboxnormal) ?
        //           selFeatureCount : (selFeatureCount+1);
        secData.lblTopCheckbox.skin = self.applyCheckboxSkin(secData.lblTopCheckbox);
        segDataJson[feature.featureId || feature.id] = { "secData": secData, "rowData": rowsData };
        return [secData, rowsData];
      });
      this.view.segAddProductFeatures.widgetDataMap = this.getAddFeaturesSegWidgetMap();
      this.view.segAddProductFeatures.setData(segData);
      this.view.segAddProductFeatures.info = { "segDataJson": segDataJson, "accId": accId };
      this.view.lblselectAllFeatures.setVisibility(true);
      this.view.lblselectAllFeatures.text = (selFeatureCount === segData.length) ? kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") : kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
      this.view.forceLayout();
    }
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
      "lblTopCheckbox": "lblTopCheckbox",
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
      "lblCheckbox": "lblCheckbox",
      "flxStatus":"flxStatus",
      "lblStatus":"lblStatus",
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "id":"id",
      "featureDetailsObj":"featureDetailsObj",
      "actionDetailsObj":"actionDetailsObj"
    };
    return widgetMap;
  },
   /* expand/collapse the feature card in add product features screen*/
   toggleSelectFeatureArrow : function(segmentPath,context){
    var selSecInd = context.rowContext.sectionIndex;
    var selRowInd = context.rowContext.rowIndex;
    var segData = segmentPath.data;
    var segCategory = segmentPath.id === "segAddProductFeatures" ? 1:2;
    for(var i=0; i<segData.length; i++){
      if(selSecInd !== i){
        segData[i][0] = this.getCollapsedSectionProperties(segData[i][0], segCategory);
        segData[i][1] = this.showHideProdSegRowFlex(segData[i][1],false);
      }
    }
    if((segData[selSecInd][0].lblIconToggleArrow && segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px") ||
      (segData[selSecInd][0].lblArrow && segData[selSecInd][0].lblArrow.skin === "sknfontIconDescRightArrow14px")){
      segData[selSecInd][0] = this.getExpandedSectionProperties(segData[selSecInd][0], segCategory);
      segData[selSecInd][1] = this.showHideProdSegRowFlex(segData[selSecInd][1],true);
    } else{
      segData[selSecInd][0] = this.getCollapsedSectionProperties(segData[selSecInd][0], segCategory);
      segData[selSecInd][1] = this.showHideProdSegRowFlex(segData[selSecInd][1],false);
    }
    segmentPath.setData(segData);
  },
  /* set collapsed section properties */
  getCollapsedSectionProperties : function(sectionData,segCategory){
    if(segCategory === 1){ //add product features
      sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
      sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
      sectionData.flxActionsHeaderContainer.isVisible = false;
      sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"; 
    }else if(segCategory === 2){ //view features popup
      sectionData.flxViewActionHeader.isVisible = false;
      sectionData.lblFASeperator1.isVisible = false;
      sectionData.lblArrow.text = "\ue922";
      sectionData.lblArrow.skin = "sknfontIconDescRightArrow14px";
      sectionData.flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    }
    return sectionData;
  },
  /* set expanded section properties */
  getExpandedSectionProperties : function(sectionData,segCategory){
    if(segCategory === 1){ //add product features
      sectionData.lblIconToggleArrow.text = "\ue915"; //down-arrow
      sectionData.lblIconToggleArrow.skin = "sknIcon00000014px";
      sectionData.flxActionsHeaderContainer.isVisible = true;
      sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
    } else if(segCategory === 2){ //view features popup
      sectionData.flxViewActionHeader.isVisible = true;
      sectionData.lblFASeperator1.isVisible = true;
      sectionData.lblArrow.text = "\ue915";
      sectionData.lblArrow.skin = "sknfontIconDescDownArrow12px";
      sectionData.flxHeader.skin="sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
    }
    return sectionData;
  },
  /* show/hide rows under a section */
  showHideProdSegRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      if(rowsData[i].flxContractEnrollFeaturesEditRow){ //Add product features
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
        if(visibility === true && (i === rowsData.length-1)){
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
          rowsData[i].flxFeatureNameCont.bottom = "15dp";
        } else {
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
          rowsData[i].flxFeatureNameCont.bottom = "0dp";
        }
      } else if(rowsData[i].flxContractsFABodyView){ //features details popup
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractsFABodyView.isVisible = visibility;
        if(visibility === true && (i === rowsData.length-1)){
          rowsData[i].flxContractsFABodyView.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
        } else {
          rowsData[i].flxContractsFABodyView.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
        }
      } 
    }
    return rowsData;
  },
   /* PRODUCT FEATURES: check/uncheck feature/actions section in add product features */
   onClickAddFeaturesCheckbox : function(segmentPath,eventObj){
    var selSecInd = eventObj.rowContext.sectionIndex;
    var selRowInd = eventObj.rowContext.rowIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0,selFeaturesCount = 0;
    var dependentActions=[];
    //on row selections
    if(selRowInd >= 0){
      rowsData[selRowInd].lblCheckbox.text = (rowsData[selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      rowsData[selRowInd].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[selRowInd].lblCheckbox);
      if(rowsData[selRowInd].dependentActions&&rowsData[selRowInd].dependentActions.length>0){
        dependentActions=rowsData[selRowInd].dependentActions;
        for(let x=0;x<dependentActions.length;x++){
          for(let y=0;y<rowsData.length;y++){
            if(rowsData[y].id===dependentActions[x].id){
              rowsData[y].lblCheckbox.text =rowsData[selRowInd].lblCheckbox.text;
              rowsData[y].lblCheckbox.skin = rowsData[selRowInd].lblCheckbox.skin;
            }
          }
        }
      }
      segSecData.lblTopCheckbox.text = this.getHeaderCheckboxLabel(rowsData, true, true);
      segSecData.lblTopCheckbox.skin = this.applyCheckboxSkin(segSecData.lblTopCheckbox);
    } //on section selections
    else{
      var sectionImg = (segSecData.lblTopCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
          this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segSecData.lblTopCheckbox.text = sectionImg;
      segSecData.lblTopCheckbox.skin = this.applyCheckboxSkin(segSecData.lblTopCheckbox);
      for(var i=0; i<rowsData.length; i++){
         rowsData[i].lblCheckbox.text = sectionImg;
         rowsData[i].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[i].lblCheckbox);
      }
    }
    selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"lblCheckbox",false);
    segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
    segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    this.view.segAddProductFeatures.info.segDataJson[segSecData.id] = {"secData":segSecData,"rowData":rowsData}
    var selFeaturesCount = this.getSelectedFeatureActionCount(segmentPath.data,"lblTopCheckbox",true);
    this.view.lblselectAllFeatures.text=(parseInt(selFeaturesCount)===segData.length)?kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures"):kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
  },
  /* PRODUCT FEATURES: select all the feature shown in list in add product features */
  selectAllFeatures: function () {
    var segData = this.view.segAddProductFeatures.data;
    var actualSegData = this.view.segAddProductFeatures.info.segDataJson;
    var isSelectAll = this.view.lblselectAllFeatures.text === kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") ? false : true;

    for (var i = 0; i < segData.length; i++) {
      segData[i][0].lblTopCheckbox.text = isSelectAll ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[i][0].lblTopCheckbox.skin = this.applyCheckboxSkin(segData[i][0].lblTopCheckbox);
      var actionRows = segData[i][1];
      segData[i][0].lblCountActions.text = this.getTwoDigitNumber(actionRows.length);
      var actualFeatureObj = actualSegData[segData[i][0].id];
      actualFeatureObj.secData = segData[i][0];
      var actualActions = actualFeatureObj.rowData;
      for (var j = 0; j < actionRows.length; j++) {
        actionRows[j].lblCheckbox.text = isSelectAll ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
        actionRows[j].lblCheckbox.skin = this.applyCheckboxSkin(actionRows[j].lblCheckbox);
        for (var k = 0; k < actualActions.length; k++) {
          if (actionRows[j].id === actualActions[k].id)
            actualActions[k] = Object.assign({}, actionRows[j]);
        }
      }
      this.view.segAddProductFeatures.setSectionAt(segData[i], i);
    }
    this.view.lblselectAllFeatures.text = isSelectAll ? kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") : kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
  },
  /* PRODUCT FEATURES: updates the productFeatures map with selections */
  updateFeatureActionsAdded : function(segmentPath,eventObj){
    var featuresList=[];
    var segData = this.view.segAddProductFeatures.data;
    var accId=this.view.segAddProductFeatures.info.accId;
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info?this.view.customersDropdownFA.lblSelectedValue.info.id:this.view.customersDropdownFA.segList.data[0].id;
    var globalFeaturesList=[];
    for(var m=0; m<segData.length; m++){
      segData[m][0].featureDetailsObj.isEnabled = segData[m][0].lblTopCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ?
                               "false":"true";
      var actions =segData[m][0].featureDetailsObj.actions||segData[m][0].featureDetailsObj.permissions ;
      var segRowsData = segData[m][1];
      for(var i=0; i<actions.length; i++){
        for(var j=0; j<segRowsData.length; j++){
          if(actions[i].actionId === segRowsData[j].id||actions[i].id === segRowsData[j].id){
            if(segRowsData[i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl){
              actions[i].isEnabled = "true";
             // this.addAccountIdForActionContract(actions[i].actionId,accId,selectedCustId);
            }else{
              actions[i].isEnabled = "false";
            //  this.removeAccountIdForActionContract(actions[i].actionId,accId,selectedCustId,1);
            }
          }
        }
      }
      if(segData[m][0].featureDetailsObj.actions){
        segData[m][0].featureDetailsObj.actions = actions;
      } else if(segData[m][0].featureDetailsObj.permissions){
        segData[m][0].featureDetailsObj.permissions = actions;
      }
      featuresList.push(segData[m][0].featureDetailsObj);
    }
    var toSegData= this.view.segContractPortfolio.data[0][1];
  for(var i =0 ; i< toSegData.length;i++){
     if(accId == toSegData[i].lblAccountNumber.text){
    this.view.segContractPortfolio.data[0][1][i].features.text=JSON.stringify(featuresList);
             this.view.segContractPortfolio.setDataAt(this.view.segContractPortfolio.data[0][1][i],i,0);
       break;
     }
      }
    for(let x=0;x<this.createContractRequestParam.accountLevelPermissions.length;x++){
      if(this.createContractRequestParam.accountLevelPermissions[x].coreCustomerId===selectedCustId){
        for(let y=0;y<this.createContractRequestParam.accountLevelPermissions[x].accounts.length;y++){
          if(this.createContractRequestParam.accountLevelPermissions[x].accounts[y].accountNumber===accId ||
            this.createContractRequestParam.accountLevelPermissions[x].accounts[y].accountId ===accId){
            this.createContractRequestParam.accountLevelPermissions[x].accounts[y].features=featuresList;
            break;
          }
        }
        break;
      }
    }
   // this.updateAllCustLvlActions(selectedCustId);//to update account level selection at customer id level
  },
  /* get the selected features/actions count in add product features*/
  getSelectedFeatureActionCount : function(segData,imgCheckboxId,isSection){
    var selectedCount = 0;
    for(var i=0;i < segData.length; i++){
      var data = (isSection === true) ? segData[i][0] : segData[i];
      if(data[imgCheckboxId].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl ||
         data[imgCheckboxId].text === this.AdminConsoleCommonUtils.checkboxPartiallbl)
        selectedCount = selectedCount +1;
    }
    return (selectedCount+"");
  },
  showBulkUpdateFAScreen : function(){
    this.view.flxAddProductFeaturesBack.setVisibility(true);
    this.view.flxContractsFATopSection.setVisibility(false);
    this.view.flxFABulkUpdateScreen.setVisibility(true);
    this.view.flxBulkUpdateListContainer.setVisibility(false);
    this.view.flxBulkFANoSelectedCustomer.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info = {
      "selectedCust":[],"secData": {}, "rowsData": []
    };
    if(this.view.flxContractFAList.isVisible){
      this.view.flxCustomerDropdownBulk.setVisibility(false);
      this.view.btnUpdateInBulkFA.info="CUSTLVL";
      this.view.flxContractFAList.setVisibility(false);
      this.view.lblNothingSelected.setVisibility(true);
      this.view.flxTagsContainer.setVisibility(false);
	  this.view.flxTagsContainer.removeAll();
      this.view.flxMoreTagsContFA.removeAll();
      this.view.lblSelectedHeading.text="Selected Customers(00)";
      this.view.btnModifySearch.text="Select Customers";
      this.view.lblTitle.text="Update Permissions for selected customers";
      this.view.lblNoCustomersSelectedBulkFA.text="Select Customer to perform bulk actions";
    }else{
      this.view.flxCustomerDropdownBulk.setVisibility(true);
      //this.setCustomersDropDownList("customerDropdownBulk");
      this.view.customerDropdownBulk.lblSelectedValue.text = this.view.customersDropdownFA.lblSelectedValue.text;
      this.view.customerDropdownBulk.btnPrimary.setVisibility(this.view.customersDropdownFA.btnPrimary.isVisible);
      this.view.customerDropdownBulk.lblSelectedValue.info = this.view.customersDropdownFA.lblSelectedValue.info;
      this.view.customerDropdownBulk.setEnabled(false);
      this.view.customerDropdownBulk.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      this.view.lblSeperatorFA.setVisibility(false);
      this.view.flxSeperator1.top="20px";
      this.view.btnUpdateInBulkFA.info="ACCLVL";
      this.view.lblSelectedHeading.text="Selected Accounts(00)";
      this.view.flxContractAccountFAList.setVisibility(false);
      this.view.lblNothingSelected.setVisibility(true);
      this.view.flxTagsContainer.setVisibility(false);
      this.view.flxTagsContainer.removeAll();
      this.view.flxMoreTagsContFA.removeAll();
      var accounts;
      //accounts=this.createContractRequestParam.accountLevelPermissions[w].accounts;
      this.view.btnModifySearch.text="Select Accounts";
      this.view.lblTitle.text="Update Permissions for selected accounts";
      this.view.lblNoCustomersSelectedBulkFA.text="Select Accounts to perform bulk actions";
      var selectedCustId = this.view.customersDropdownFA.lblSelectedValue.info.id;
      this.setDataToBulkAccounts(selectedCustId);
    }
  },
  setDataToBulkAccounts: function (selectedCustId) {
    var accounts;
    accounts = this.createContractRequestParam.accountLevelPermissions || [];
    for (var i = 0; i < accounts.length; i++) {
      if (selectedCustId === this.createContractRequestParam.accountLevelPermissions[i].coreCustomerId) {
        this.accountsBulkUpdate = this.createContractRequestParam.accountLevelPermissions[i].accounts;
      }
    }
  },
  setBulkUpdateAccountsList: function() {
    var accounts = this.accountsBulkUpdate;
// var customers = this.selectedCustomers;
    var self = this;
    var rowsData = [];
    var dataMap = {
      "flxContractEnrollAccountsEditSection": "flxContractEnrollAccountsEditSection",
      "flxAccountNumCont":"flxAccountNumCont",
      "flxCheckbox": "flxCheckbox",
      "lblSectionCheckbox": "lblSectionCheckbox",
      "lblAccountNumber":"lblAccountNumber",
      "lblIconSortAccName":"lblIconSortAccName",
      "flxHeaderContainer":"flxHeaderContainer",
      "flxAccountType":"flxAccountType",
      "lblAccountType":"lblAccountType",
      "lblIconFilterAccType":"lblIconFilterAccType",
      "flxAccountName":"flxAccountName",
      "lblAccountName":"lblAccountName",
      "lblIconAccNameSort":"lblIconAccNameSort",
      "flxAccountHolder":"flxAccountHolder",
      "lblAccountHolder":"lblAccountHolder",
      "lblIconFilterOwnershipType":"lblIconFilterOwnershipType",
      "lblSeperator": "lblSeperator",
      "lblIconAccNumbSort":"lblIconAccNumbSort",
      "flxHeaderContainer":"flxHeaderContainer",
      "flxAccountCheckBox":"flxAccountCheckBox",
      "flxCheckBoxAccount":"flxCheckBoxAccount",
      "lblCheckbox": "lblCheckbox",
      "flxAccountNumber":"flxAccountNumber",
      "lblCustomerName":"lblCustomerName",
      "lblAccNumberSort":"lblAccNumberSort",
      "custInfo": "custInfo"
    };
    var secData = {
      "template": "flxContractEnrollAccountsEditSection",
      "flxAccountNumber":{
        "isVisible":true
      },
      "flxAccountCheckBox":{
        "isVisible": true
      },
      "flxCheckbox": {
        "isVisible":false},

      "flxCheckBoxAccount":{ "onClick": function() {
        self.toggleBulkCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave);
        },"isVisible":true
       },
      "lblCustomerName":{"text":"ACCOUNT NUMBER","isVisible":true},
      "flxAccountNumCont":{
        "isVisible":false
      },
      "lblIconAccNameSort":{
        "isVisible":true,
        "text": "\ue92a",
        "skin": "sknIcon12pxBlack","hoverSkin" :"sknIcon12pxBlackHover",
      },
      "flxAccountType":{
        "isVisible":true,
        "onClick": self.showFilterForFeatureAcc.bind(this,1,2)

      },
      "lblIconFilterAccType":{"text":"\ue916"},
      "flxAccountName":{"onTouchStart":function(context){
        self.sortAndSetData("lblAccountName.text",self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,5,context.rowContext.sectionIndex)
      }},
      "flxAccountNumber":{"onTouchStart":function(context){
        self.sortAndSetData("lblCustomerName.text",self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,5,context.rowContext.sectionIndex)
      }},
      "lblAccNumberSort":{
        "isVisibile":true,
        "text": "\ue92b",
        "skin": "sknIcon15px","hoverSkin":"sknlblCursorFont",
        "left" : "5px"
      },
      "flxHeaderContainer":{
        "isVisible":true
      },
      "flxAccountHolder":{
        "isVisible":true,
         "onClick": self.showFilterForFeatureAcc.bind(this,2,2)
      },
      "lblIconFilterOwnershipType":{"text":"\ue916","isVisible": true},
      "lblCheckbox": { 
        "isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxnormallbl,
        "skin": "sknBgB7B7B7Sz20pxCheckbox" },
      "lblAccountType": {
        "text": "ACCOUNT TYPE"
      },
      "lblAccountName": {
        "text": "ACCOUNT NAME"
      },
      "lblAccountHolder": {
        "text": "OWNERSHIP TYPE"
      },
      "lblSectionCheckbox": {
       "isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxnormallbl,
       "skin": "sknBgB7B7B7Sz20pxCheckbox"
      },
      "flxHeaderContainer":{"isVisible": true},
      "lblSeperator": {
        "skin": "sknLblSeparator696C73",
        "isVisible": true
      }
    }
    var selRowIds = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
    var totalRowsCount =0;
    for (var x = 0; x < accounts.length; x++) {
      if (accounts[x].isEnabled === true) {
        totalRowsCount =  totalRowsCount+1;
        var checkBoxText = {"text":selRowIds.includes(accounts[x].accountId) ?self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl};
        rowsData.push({
          "template": "flxContractEnrollAccountsEditSection",

          "flxCheckBoxAccount": {"isVisible":true,
                                 "onClick": function() {
                                   self.toggleAccountsCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, "coreCustomerId");
                                 }},
          "flxAccountNumCont":{"isVisible":false},
          "flxAccountCheckBox":{"isVisible": true},
          "flxAccountNumber":{
            "isVisible":true
          },
          "lblSectionCheckbox": {
            "isVisible":false
          },
          "lblCheckbox": {
            "text": checkBoxText.text,"isVisible":true,
            "skin": self.applyCheckboxSkin(checkBoxText)
          },
          //accountid
          "lblCustomerName": {
            "isVisible": true,"text": accounts[x].accountId,"skin":"sknLbl485C75LatoRegular13Px"
          },
          "lblAccountType": {
            "text": accounts[x].accountType || "N/A","skin":"sknLbl485C75LatoRegular13Px"
          },
          "lblAccountName": {
            "text": accounts[x].accountName,"skin":"sknLbl485C75LatoRegular13Px"
          },
          "lblAccountHolder": {
            "text": accounts[x].ownershipType,"skin":"sknLbl485C75LatoRegular13Px"
          },
          "lblSeperator": {
            "skin": "sknLblSeparatore7e7e7",
            "isVisible": true
          },
          "custInfo": accounts[x]
        });
      }
    }
    secData.lblCheckbox.text = totalRowsCount === selRowIds.length ? this.AdminConsoleCommonUtils.checkboxSelectedlbl :
          selRowIds.length === 0 ?  this.AdminConsoleCommonUtils.checkboxnormallbl :  this.AdminConsoleCommonUtils.checkboxPartiallbl;
    secData.lblCheckbox.skin = this.applyCheckboxSkin(secData.lblCheckbox);
    this.sortBy = this.getObjectSorter("lblCustomerName.text");
    this.sortBy.inAscendingOrder = true;
    secData.lblAccNumberSort= this.determineSortIconForSeg(this.sortBy,"lblCustomerName.text");
    secData.lblIconAccNameSort= this.determineSortIconForSeg(this.sortBy,"lblAccountName.text");
    rowsData = rowsData.sort(this.sortBy.sortData);
     this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.rowTemplate  ="flxContractEnrollAccountsEditSection";
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.widgetDataMap = dataMap;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([
      [secData, rowsData]
    ]);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info = {
      "selectedCust":selRowIds,"secData": secData, "rowsData": rowsData
    };
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, selRowIds.length > 0);
    this.setFeaturesAccountsFilterDataContract([[secData, rowsData]],2);
    this.view.forceLayout();
  },
  toggleAccountsCheckbox: function (segmentPath, buttonPath, custId) {
    var selCount = 0;
    var segData = segmentPath.data;
    var selIndex = segmentPath.selectedRowIndex[1];
    for (var i = 0; i < segData[0][1].length; i++) {
      if ((segData[0][1][i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl) || 
          (segData[0][1][i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl)) selCount = selCount + 1;
    }
    if (segData[0][1][selIndex].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) {
      //this.view.lblCountUsers.text = this.getTwoDigitNumber(selCount + 1);
      segData[0][0].lblCheckbox.text = (selCount + 1 === segData[0][1].length) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxPartiallbl;
      segData[0][0].lblCheckbox.skin = this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text =this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      segData[0][1][selIndex].lblCheckbox.skin = this.applyCheckboxSkin(segData[0][1][selIndex].lblCheckbox);
      segmentPath.info.selectedCust.push(segData[0][1][selIndex].custInfo);
    } else {
      //  this.view.lblCountUsers.text = this.getTwoDigitNumber(selCount - 1);
      segData[0][0].lblCheckbox.text = (selCount === 1) ? this.AdminConsoleCommonUtils.checkboxnormallbl : this.AdminConsoleCommonUtils.checkboxPartiallbl;
      segData[0][0].lblCheckbox.skin = this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text = this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[0][1][selIndex].lblCheckbox.skin = this.applyCheckboxSkin( segData[0][1][selIndex].lblCheckbox);
      for (let x = 0; x < segmentPath.info.selectedCust.length; x++) {
        if (segData[0][1][selIndex].custInfo[custId] === segmentPath.info.selectedCust[x][custId]) segmentPath.info.selectedCust.splice(x, 1);
      }
    }
    segmentPath.setData(segData);
    var isValid = segData[0][0].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? false : true;
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(buttonPath, true, isValid);
    this.view.forceLayout();
  },
  getFeaturesBasedOnId : function(featuresList,prodId){
    var features=[];
    for(var a=0;a<featuresList.length;a++){
      if(featuresList[a].productId===prodId){
        features=this.getAllFeaturesEnabled(featuresList[a].productFeatures);
        return features;
      }
    }
  },
  updateAllAccountLvlActions : function(actionId,custId,isEnable,selAccArr){
    var self=this;
    var isAllAccUpdate = selAccArr ? false : true;
    for(let x=0;x<this.createContractRequestParam.accountLevelPermissions.length;x++){
      if(custId === this.createContractRequestParam.accountLevelPermissions[x].coreCustomerId){
        var accLevelfeatures = JSON.parse(JSON.stringify(this.createContractRequestParam.accountLevelPermissions[x].accounts));
        for(let y=0;y<accLevelfeatures.length;y++){
          var accSelCheck;
          if(isAllAccUpdate){ //for updating all selected account's actions
            accSelCheck = accLevelfeatures[y].isEnabled==="true"||accLevelfeatures[y].isEnabled===true;
          } else{ //for updating given account's actions
            accSelCheck = selAccArr.includes(accLevelfeatures[y].accountId) ? true : false;
          }
          if(accSelCheck){
            for(var j=0; j< accLevelfeatures[y].features.length; j++){
              var actions = accLevelfeatures[y].features[j].actions ? JSON.parse(JSON.stringify(accLevelfeatures[y].features[j].actions)) :
                  JSON.parse(JSON.stringify(accLevelfeatures[y].features[j].permissions));
              for(var i=0; i<actions.length; i++){
                //push enabled actions for that account
                if(actions[i].actionId===actionId){
                  actions[i].isEnabled=isEnable;
                //actions[i].isCustLvlEnabled=isAllAccUpdate?isEnable:true; //to check if it is on select/unselect of feature at cust level
                }
              }
              if(accLevelfeatures[y].features[j].actions)
                accLevelfeatures[y].features[j].actions=actions;
              else
                accLevelfeatures[y].features[j].permissions=actions;
            }
          }
        }
        this.createContractRequestParam.accountLevelPermissions[x].accounts=accLevelfeatures;
        break;
      }
    }
  },
  formatAccountLevelPermissions : function(accountsArray){
    var accounts=accountsArray.filter(account=>(account.isEnabled===true||account.isEnabled==="true"));
    var finalAccounts=accounts.map(account=>{
     if(account.featurePermissions === undefined){
        var features = account.features.map(feature=>{
          if(this.action===this.actionConfig.edit){
            if(feature.permissions===undefined)
            feature.permissions=feature.actions;
            else if(feature.actions===undefined)
            feature.permissions=feature.permissions;
          }
          else if(this.action===this.actionConfig.create){
            if(feature.permissions===undefined)
            feature.permissions=feature.actions;
            else if(feature.actions===undefined)
            feature.permissions=feature.permissions;
          }
          delete feature.actions;
        return feature; 
        })}
     else {
        var features=account.featurePermissions.map(feature=>{
        feature.permissions=feature.actions;
        delete feature.actions;
        return feature;
        })
       }
      account.featurePermissions=features;
      delete account.features;
      return account;
    });
    return finalAccounts;
  },
  updateAccountSelectionAccLvl : function(custId,accountsList,isEnable){
    this.createContractRequestParam.accountLevelPermissions = this.createContractRequestParam.accountLevelPermissions || [];
    for(let x=0;x<this.createContractRequestParam.accountLevelPermissions.length;x++){
      if(custId === this.createContractRequestParam.accountLevelPermissions[x].coreCustomerId){
        var accLevelfeatures = this.createContractRequestParam.accountLevelPermissions[x].accounts;
        for(let y=0;y<accLevelfeatures.length;y++){
          if(accountsList.includes(accLevelfeatures[y].accountId))
            accLevelfeatures[y].isEnabled=isEnable;
        }
        this.createContractRequestParam.accountLevelPermissions[x].accounts=accLevelfeatures;
        break;
      }
    }
  },
  /*
  * set accounttyp,ownership filters data for accounts segment in features tab
  */
  setFeaturesAccountsFilterDataContract : function(accountsData,category){
    var self =this;
     this.ownershipFilterData = accountsData[0];
     var typeFilterWid = category === 1 ? this.view.filterMenu1 : this.view.bulkUpdateFeaturesLimitsPopup.filterMenu;
     var ownershipFilterWid = category === 1 ? this.view.filterMenu2 : this.view.bulkUpdateFeaturesLimitsPopup.filterMenuAcc;
     var flxTypeFilterWid = category === 1 ? this.view.flxAccountsFilter1 : this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu;
     var flxOwnershipFilterWid = category === 1 ? this.view.flxAccountsFilter2 : this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc;
     var rowsData = accountsData.length > 0 ? accountsData[0][1]:[]
     var lblOwnership = category === 1 ? "lblOwnershipType" : "lblAccountHolder";
     var widgetMap = {
       "flxSearchDropDown": "flxSearchDropDown",
       "flxCheckBox": "flxCheckBox",
       "imgCheckBox": "imgCheckBox",
       "lblDescription": "lblDescription"
     };
     var typesList =[],ownerTypeList =[],maxSizeTypeText ="",maxSizeOwnerTypeText ="";
     for(var i=0;i<rowsData.length;i++){
       if(!typesList.includes(rowsData[i].lblAccountType.text))
         typesList.push(rowsData[i].lblAccountType.text);
       if(!ownerTypeList.includes(rowsData[i][lblOwnership].text)){
         ownerTypeList.push(rowsData[i][lblOwnership].text);
       }    
     }
     var typesData = typesList.map(function(rec){
       maxSizeTypeText= (rec && rec.length > maxSizeTypeText.length) ? rec: maxSizeTypeText;
       return {
         "flxSearchDropDown": "flxSearchDropDown",
         "flxCheckBox": "flxCheckBox",
         "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
         "lblDescription": rec
       };
     });
     var ownershipData = ownerTypeList.map(function(rec){
       maxSizeOwnerTypeText= (rec && rec.length > maxSizeOwnerTypeText.length) ? rec: maxSizeOwnerTypeText;
       return {
         "flxSearchDropDown": "flxSearchDropDown",
         "flxCheckBox": "flxCheckBox",
         "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
         "lblDescription": rec
       }; 
     });
     typeFilterWid.segStatusFilterDropdown.widgetDataMap = widgetMap;
     ownershipFilterWid.segStatusFilterDropdown.widgetDataMap = widgetMap;
 
     typeFilterWid.segStatusFilterDropdown.setData(typesData);
     ownershipFilterWid.segStatusFilterDropdown.setData(ownershipData);
 
     flxTypeFilterWid.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeTypeText)+55+"px";
     flxOwnershipFilterWid.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeOwnerTypeText)+55+"px";
     var selTypeInd = [],selOwnerInd = [];
     for(var j=0;j<typesList.length;j++){
       selTypeInd.push(j);
     }
     for(var k=0;k<ownerTypeList.length;k++){
       selOwnerInd.push(k);
     }
     typeFilterWid.segStatusFilterDropdown.selectedIndices = [[0,selTypeInd]];
     ownershipFilterWid.segStatusFilterDropdown.selectedIndices = [[0,selOwnerInd]];
     this.view.forceLayout();
   },
  /*
  * filter the account data based on selection
  * @returns: filtered results
  */
  filterAccFeaturesContract: function (segmentPath, category) {
    var selFilter = [[]];
    var dataToShow = [];
    var typeFilterWid = category === 1 ? this.view.filterMenu1 : this.view.bulkUpdateFeaturesLimitsPopup.filterMenu;
    var ownershipFilterWid = category === 1 ? this.view.filterMenu2 : this.view.bulkUpdateFeaturesLimitsPopup.filterMenuAcc;
    var accountsRowData = segmentPath.info.rowsData;
    var typeIndices = typeFilterWid.segStatusFilterDropdown.selectedIndices;
    var ownershipIndices = ownershipFilterWid.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selTypeInd = null;
    var selOwnershipInd = null;
    //get selected types
    var types = "";
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter[0][0].push(typeFilterWid.segStatusFilterDropdown.data[selTypeInd[i]].lblDescription);
    }
    //get ownership types
    var types = "";
    selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter[0][1].push(ownershipFilterWid.segStatusFilterDropdown.data[selOwnershipInd[j]].lblDescription);
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToShow = [];
    } else if (selFilter[0][0].length === typeFilterWid.segStatusFilterDropdown.data.length &&
      selFilter[0][1].length === ownershipFilterWid.segStatusFilterDropdown.data.length)
      dataToShow = accountsRowData;
    else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = accountsRowData.filter(function (rec) {
        if (selFilter[0][0].indexOf(rec.lblAccountType.text) >= 0 && selFilter[0][1].indexOf(rec.lblAccountHolder.text) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
    }
    return dataToShow;
  },
  /*
 * FEATURE BULK UPDATE CONTRACT: search and filter for accounts based in contract features tab, bulk update popup
 */
  searchFilterForAccountsBulk: function (segmentPath, category) {
    var featureLevel = this.view.btnUpdateInBulkFA.info;
    var searchText = category === 1 ? this.view.tbxContractFASearch.text : this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.text;
    var sectionData = segmentPath.info.secData;
    var rowsData = segmentPath.info.rowsData;
    if (featureLevel === "ACCLVL")
      rowsData = this.filterAccFeaturesContract(segmentPath, category);
    var filteredData = [], dataToSet;
    if (searchText.length > 0) {
      for (var i = 0; i < rowsData.length; i++) {
        var accNameSearch = rowsData[i].lblAccountName ? (rowsData[i].lblAccountName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) : false;
        var accNum = category === 1 ? rowsData[i].lblAccountNumber.text : rowsData[i].lblCustomerName.text;
        if (accNameSearch || (accNum.indexOf(searchText) >= 0)) {
          filteredData.push(rowsData[i]);
        }
      }
      if (filteredData.length > 0) {
        if (segmentPath.id === "segContractPortfolio") {
          sectionData.lblCountActions.text = this.getTwoDigitNumber(filteredData.length);
          dataToSet = [[sectionData, filteredData]];
        } else {
          dataToSet = [[sectionData, filteredData]];
        }
      } else {
        segmentPath.rowTemplate = category === 1 ? "flxViewFeatureBody" :
          featureLevel === "ACCLVL" ? "flxContractEnrollAccountsEditSection" : "flxsegCustomersList";
        dataToSet = [[sectionData, []]];
        if (segmentPath.id === "segContractPortfolio") {
          dataToSet[0][0].lblCountActions.text = this.getTwoDigitNumber(dataToSet[0][1].length);
        }
      }
      segmentPath.setData(dataToSet);
    } else {
      segmentPath.rowTemplate = category === 1 ? "flxViewFeatureBody" :
        featureLevel === "ACCLVL" ? "flxContractEnrollAccountsEditSection" : "flxsegCustomersList";
      segmentPath.setData([[sectionData, rowsData]]);
    }
    if (segmentPath.id == "segContractPortfolio" && segmentPath.data[0][1].length === 0 && filteredData.length === 0) {
      this.view.lblNoCustomersSelectedFA.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.imgContractFA.setVisibility(false);
      this.view.flxContractAccountFAList.setVisibility(false);
      this.view.flxNoCustomerSelectedFA.setVisibility(true);
      this.view.lblselectAllFeatures.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * FEATURE BULK UPDATE CONTRACT: show filter dropdown on click for features accounts
  */
  showFilterForFeatureAcc: function (option, category, event, context) {
    var flxTypeFilterWid = category === 1 ? this.view.flxAccountsFilter1 : this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu;
    var flxOwnershipFilterWid = category === 1 ? this.view.flxAccountsFilter2 : this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc;
    var typeFilterIcon = category === 1 ? "fontIconAccTypeFilter" : "lblIconFilterAccType";
    var ownershipFilterIcon = category === 1 ? "fontFilterOwnershipType" : "lblIconFilterOwnershipType";
    if (option === 1)
      flxOwnershipFilterWid.setVisibility(false);
    else if (option === 2)
      flxTypeFilterWid.setVisibility(false);
    var filterWidget = (option === 1) ? flxTypeFilterWid : flxOwnershipFilterWid;
    var filterIcon = (option === 1) ? typeFilterIcon : ownershipFilterIcon;
    var flxRight = context.widgetInfo.frame.width - event.frame.x - event.frame.width;
    var iconRight = event.frame.width - event[filterIcon].frame.x;
    filterWidget.right = category === 1 ? (flxRight + iconRight - 12) + "dp" : (flxRight + iconRight - 22) + "dp";
    filterWidget.top = category === 1 ? "100dp" : "40dp";
    if (filterWidget.isVisible) {
      filterWidget.setVisibility(false);
    } else {
      filterWidget.setVisibility(true);
    }
  },
  /*
  * search in features tab contracts at By Accounts
  */
  searchFAContractsByAccounts: function () {
    var features = this.searchFeatureOnEdit;
    var accId = this.accIdForByFeatures;
    var searchText = this.view.tbxContractFASearch.text.toLowerCase();
    var searchedActions = [];
    var featureName = "";
    var actionName = "";
    // for (var i = 0; i < features.length; i++) {
    var searchResults = features.filter(function (feature) {
      featureName = feature.featureName ? feature.featureName.toLowerCase() : feature.featureName.toLowerCase();
      if (featureName.indexOf(searchText) >= 0) return feature;
      else {
        searchedActions = [];
        var featurePermAcc=feature.actions?feature.actions:feature.permissions;
        for (let x = 0; x < featurePermAcc.length; x++) {
          actionName = featurePermAcc[x].actionName ? featurePermAcc[x].actionName.toLowerCase() : featurePermAcc[x].actionName.toLowerCase();
          if (actionName.indexOf(searchText) >= 0) searchedActions.push(featurePermAcc[x]);
        }
        if (searchedActions.length > 0) {     
          if(feature.actions!=undefined){
            feature.actions=searchedActions
          }
          else{
           feature.permissions =searchedActions;
          }
          return feature;
        }
      }
    });
    if (searchResults.length > 0) {
      this.setAddFeaturesSegData(searchResults, accId);
      this.view.flxNoCustomerSelectedFA.setVisibility(false);
      this.view.flxAddProductFeatures.setVisibility(true);
    } else {
      this.view.lblNoCustomersSelectedFA.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.imgContractFA.setVisibility(false);
      this.view.flxNoCustomerSelectedFA.setVisibility(true);
      this.view.flxAddProductFeatures.setVisibility(false);
    }
  },
  onContractCreateHide : function(){
    this.showContractServiceScreen();
  }
});

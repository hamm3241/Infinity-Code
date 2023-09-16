define({
  segCountry : [],
  segState : [],
  segLocationCity : [],
  features : [],
  bulkUpdateListboxData: [],
  bulkUpdateAllFeaturesList : [],
  completeContractDetails :[],
  AccountTrasactions : null,
  selectedServiceCard : null,
  completeCompanyDetails :{},
  accountsUnlinkPayload : {},
  monetaryLimits : {},
  initialFeaturesJson : {},
  prevRole : {},
  tabsConfig:{
    accounts:1,
    businessUsers:2
  },
  enrollSegRowIndex : 0,
  searchResult :{
    isFeatureMatched : false,
    isLimitMatched : false,
    isAcctMatched : false,
    isActionMatched : false
  },
  contractDetailsMap:{},
  recordsSize : 20,
  prevContractSelected:{
    contractNo : -1,
    segRowNo : -1
  },
  noGroupUsers:[],
  searchSignatoryResult :{
    isSignatoryGroupMatched : false
     },
  prevSignatorySelected:{
    contractNo : -1,
    segRowNo : -1
  },
  prevBreadCrumb : {
    "Action" : "",
    "text" : "",
    "enterif" : false
  },
    paginationDetails:{
      currSegContractData:[],
      currSegSignatoryGroupData:[]
    },  
  currViewContractsTab :"",
  isSearchPerformedViewCont : false,
  assignedAccount:[],
  microBusinessBankingAccounts:[],
  microBusinessInputs:{
    MembershipId:null,
    TIN:null,
    CompanyType:null
  },
  actionConfig: {
    create: "CREATE",
    edit: "EDIT"
  },
  action:"CREATE",
  allFeatures : [],
  requiredFeatures : {
    additional : [],
    mandatory : [] 
  },
  viewContractServiceDef :[],
  monetaryActionsData :[],
  featureDetailsActionsData :[],
  usersSelectedSignatoryList: {},
  refreshLimits : true,
  visitedFeatureOnceWhileCreate : false,
  intialFeatureList : [],
  initialLimitList : [],
  dataForSearch : false,
  dataForMandatorySearch : false,
  currentSegFeatureData  : [],
  currentMandatorySegFeatureData : [],
  prevIndex:-1,
  isAccountCentricConfig : true,
  inAuthorizedSignatoriesUi : true,
  maxCustomersCount : -1,
  lastSelected : -1,
  aboutToAddUser : {
    data : [],
    type : ""
  },
  countsentence : "",
  recentCustomerSearchTab : "",
  selAccCount:0,
  actionsAccountJSON :{},
  searchResultsFeaturesLimits :[],
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
  approvalsCountMap :{
    ALL: kony.i18n.getLocalizedString("i18n.frmCompanies.AllApprovals"),
    ANY_ONE:kony.i18n.getLocalizedString("i18n.frmCompanies.AnyOneApproval"),
    ANY_THREE: kony.i18n.getLocalizedString("i18n.frmCompanies.AnyTwoApprovals"),
    ANY_TWO:kony.i18n.getLocalizedString("i18n.frmCompanies.AnyThreeApprovals"),},
  approvalConfigType:{
    SIGNATORY_GROUP:"SIGNATORY_GROUP",
    USER:"USER"
  },
  segAAR_ROW_FRAMES : [],
  approvalsSGList:{},
  baseCurrencyFormat: "USD",
  approvalActionTypeIcon:{
    MONETARY:"\ue9ba",
    NONMONETARY:"\ue9bb"
  },
  toastModel :{},
  pageCount : {
    "PAGE_OFFSET": 0,
    "TOTAL_PAGES":0
  },
  searchFilterRecords:[],
  limitsValidationObject:{},
  willUpdateUI: function (context) {
    var self = this;
    this.updateLeftMenu(context);
    this.resetFilterWidgetsForAcct();
    if(context){
      if(context.action === "fetch"){
        //this.showSearchScreen("fetch");
        //this.showSearchScreen("fetch");
        //this.getAllFeatures(context.features);
        kony.adminConsole.utils.hideProgressBar(this.view);
      }else if(context.coreCustomerDetails){
          this.setAccountsPopupData(context.coreCustomerDetails);
      }else if(context.action === "getAllFeatures"){
        //this.getAllFeatures(context.features);
      }else if(context.action === "createCustomer"){
        // this.hideRequiredMainScreens(this.view.flxCompanyDetails);
        // if(context.features) 
        //   this.getAllFeatures(context.features);
        // this.getCompanyAllDetails(context.id,4);
        // //this.getCompanyCustomers(context.id,this.setCompanyCustomers);
        // //this.backToCompanyDetails(this.tabsConfig.businessUsers);
      }else if (context.action === "hideLoadingScreen") {
        kony.adminConsole.utils.hideProgressBar(this.view);
//         if(this.view.flxLoading2.isVisible)
//           this.view.flxLoading2.setVisibility(false);
      }else if (context.contractCustomers) {
        this.contractCustomersCallBack(context);
      }else if(context.AllEligibleRelationalCustomers){
        this.coreRelativeCustomersCallBack(context.AllEligibleRelationalCustomers);
      }else if(context.customerSearch){
        if(context.toCheck===1)
          {
         this.customerSearchCallBackByUserId(context.customerSearch,context.legalEntity);
          }
        else{
        this.customerSearchCallBack(context.customerSearch);
        }
      }
      else if(context.AllEligibleRelationalCustomersError){
        if(context.AllEligibleRelationalCustomersError[0]===1)
          {
            this.coreRelativeCustomersErrorCallBackByUserID();
          }
        else{
        this.coreRelativeCustomersErrorCallBack(context.AllEligibleRelationalCustomersError)
        }
      }else if(context.serviceDefinitionRoles){
        this.serviceDefinitionRolesCallBack(context.serviceDefinitionRoles, context.featuresPerAccount);
      }else if(context.serviceDefRoles){
        this.recentContractDetails.roles = context.serviceDefRoles
      }else if(context.createInfinityUser){
        this.createInfinityUserCallBack(context.createInfinityUser);
      }else if(context.editInfinityUser){
        this.createInfinityUserCallBack(context.editInfinityUser);
      }else if (context.loadingScreen) {
        if (context.loadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }else if(context.createCompanySuccess){
        //this.createCompaySuccess(context.createCompanySuccess);
      }else if (context.toastMessage) {
        if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(context.toastMessage.message, this);
        } else if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
          this.view.toastMessage.showErrorToastMessage(context.toastMessage.message, this);
        }
      //}else if(context.coreTypeConfig){
       // this.isAccountCentricConfig = context.coreTypeConfig.value;
       // this.isAccountCentricConfig = false;
      }else if(context.tinValidation){
        //this.updateTINValidationStatus(context.tinValidation);
      }else if(context.accountSearch){
        this.microBusinessBankingAccounts = context.accountSearch;
        //this.accountSearch(context.accountSearch);
      } else if(context.searchData) {
        this.setDatatoSearchSegment(context.searchData.contracts);
      } else if(context.editCompanySuccess){
        //this.editCompanySuccess(context.editCompanySuccess);
      } else if(context.AccountTrasactions){
        // this.AccountTrasactions = context.AccountTrasactions;
        // this.setDataForProductTransactionSegment(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Successful"));
      } else if(context.action === "createContractClick"){
        //this.onCreateContractClick();
      } else if(context.action === "companyDetails"){
        this.maxCustomersCount=-1;
        // method to set the users from the above data which is used for contract information and getting accounts
        // this.getCompleteDataForCreatedCompany(context.companyDetails);
        // this.backToCompanyDetails(context.selectedTabNo);
      } else if(context.action === "editCancel"){
        this.backToCompanyDetails(1);
        kony.adminConsole.utils.hideProgressBar(this.view);
      } else if(context.action === "contractFeatureActionLimits"){
        // method to set the users from the above data which is used for features and action
        let resData = [];
        if(context.selectTab!=="edit"){
          this.completeCompanyDetails.accountsFeatures = context.contractFeatures ? context.contractFeatures : [];
          if(context.selectTab === 'Features'){
            this.globalLevelPermissionsFeatures = JSON.parse(this.completeCompanyDetails.accountsFeatures.globalLevelPermissions);
            this.accountLevelPermissionsViewFeatures = JSON.parse(this.completeCompanyDetails.accountsFeatures.accountLevelPermissions);
            resData = this.globalLevelPermissionsFeatures;
          }else{
            this.setTransactionLimits = JSON.parse(this.completeCompanyDetails.accountsFeatures.transactionLimits);
            resData = this.setTransactionLimits;
          } 
          this.createDynamicFlexForContract(resData ,context.selectTab);
        }else{
          this.completeCompanyDetails.accountsFeatures = context.contractDetails.accountsFeatures ? context.contractDetails.accountsFeatures : [];
          this.storeIntialContractFeatures(this.completeCompanyDetails.accountsFeatures.features);
          this.setEditContractFeaturesLimits();
        }
      }else if(context.action === "contractInfinityUsers"){
        this.completeCompanyDetails.signatoryUsers = context.contractDetails;
        // method to set the users from the above data
        this.setSignatories(); 
      }else if(context.action === "contractApprovalMatrix"){
        this.showApprovalMatrixTab(context.approvalMatrix);
      }else if(context.approvalMatrixOfCif){
        if(context.isAccountLevel === false && context.featureCardId === null){
          this.showApprovalMatrixCustomerLevel(true,context.approvalMatrixOfCif);
        } else if(context.isAccountLevel === true && context.featureCardId === null){
          this.showApprovalMatrixAccountLevel(true,context.approvalMatrixOfCif);
        } else{
          this.updateApprovalMatrixAfterCreate(context);
        }
      }else if(context.isApprovalDisabled){
        this.setCustApprovalMatrixSwitch(context.isApprovalDisabled);
      }
    else if(context.approversList){
      this.view.filterMenuApproversACP.info = {"approversList":context.approversList};
      this.checkForApproversAvailabilty(context.approversList,context.selectedCardInfo);
    }
      else if(context.action === "contractDetails"){
          var legalEntityId = context.contractDetails.contractDetails.legalEntityId;
          var legalEntity = this.getLEDesc(legalEntityId);
        //  this.defaultCurrencyCodeSymbol =this.defaultCurrencyCode(legalEntity[0].baseCurrency, true);
          //this.currencyValue=this.defaultCurrencyCode(legalEntity[0].baseCurrency, true);
          for(var i=0;i<=legalEntity.length;i++){
         if(legalEntityId===legalEntity[i].id)
         {
	      this.defaultCurrencyCodeSymbol = this.defaultCurrencyCode(legalEntity[i].baseCurrency,true);
	      this.currencyValue = this.defaultCurrencyCode(legalEntity[i].baseCurrency,true);
          break;
         }
          }
        this.recentContractDetails.contractId = context.contractDetails.contractDetails.id; 
        this.getCompleteDataForcontractDetails(context.contractDetails);
        // navigating to accounts tab
        this.backToCompanyDetails(1);
        if(context.toast === "CREATE_SUCCESS"){
          this.toastModel = {"status":"SUCCESS","message":"Contract has been created successfully"};
          this.createEditContractSuccess(context.toast);
        } else if(context.toast){
           this.createEditContractSuccess(context.toast);
        }
      } else if (context.action === "hideScreens"){
//        this.view.flxSearchCompanies.setVisibility(false);
        this.view.flxCompanyDetails.setVisibility(false);        
      //} else if(context.businessTypes){
       // this.setBusinessTypesListBoxData(context.businessTypes);
      } else if(context.membershipDetails){
        //this.fillDetailsForSelectedCIF(context.membershipDetails);
      } else if (context.businessTypeRecords){
        // if(this.inAuthorizedSignatoriesUi === true){
        // this.maxCustomersCount=context.businessTypeRecords[0].maxAuthSignatory;
        // this.showCustomers();
        // }
      }else if(context.coreCustomerSearch){
        this.view.btnBackToMain.info=context.coreCustomerSearch;
        this.setCoreCustomersList(context.coreCustomerSearch);
      }else if(context.coreRelatedCustomers){
        this.setSelectedCustomerData(context.coreRelatedCustomers,context.coreCustomerId);
      }else if(context.serviceDefinitions){
        //this.setContractServiceCards(context.serviceDefinitions);
        //this.setDataToServiceTypeFilter(context.serviceDefinitions);
        //this.view.flxContractServiceCards.info={"totalRecords":context.serviceDefinitions,"filteredRecords":context.serviceDefinitions};
        if(context.option === 1){ // for contract landing screen
          this.viewContractServiceDef = context.serviceDefinitions;
          //this.setServiceTypeStatusData(this.viewContractServiceDef);
          //this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex=null;
        } else{ //for crete/edit screens
         // this.setContractServiceCards(context.serviceDefinitions);
          this.setDataToServiceTypeFilter(context.serviceDefinitions);
          this.view.flxContractServiceCards.info={"totalRecords":context.serviceDefinitions,"filteredRecords":context.serviceDefinitions};
        }
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
        //this.setServiceDefinitionFAData(context.serviceDefinitionFeaturesLimits);
      }else if(context.serviceDefinitionMonetaryActions){
       // this.setGlobalMonetaryActions(context.serviceDefinitionMonetaryActions.limits);
      }
      else if(context.createContractSuccess){
        //this.createEditContractSuccess(context.createContractSuccess);
      }else if(context.editContractSuccess){
        //this.createEditContractSuccess(context.editContractSuccess);
      }
      else if(context.customerStatusList){
        //this.setCustomerStatusData(context.customerStatusList.value);
      }else if(context.autoSyncAccountsFlag){
        this.autoSyncAccountsFlag=context.autoSyncAccountsFlag.value==="IMPLICIT"?"true":"false";
      }else if(context.signatoryGroups){
        //for approvalmatrix tab
        if(context.tab && context.tab === 2){
           this.formatSignatoryGroupsListAM(context.signatoryGroups);
        } //for signatory groups tab
        else{
          this.setSignatoryGlobalData(context.signatoryGroups.coreCustomers);
          this.setSignatoryGroups(context.signatoryGroups.coreCustomers,false);
        }
      }else if(context.signatoryGroupDetails){
		        this.view.flxSelectedUsers.info=context.signatoryGroupDetails.signatories;
        if(context.isEdit===false)
          this.setViewSignatoryGroupsSegmentData(context.signatoryGroupDetails);
        else{
          if(context.signatoryGroupDetails.signatories.length===0){
            this.view.flxAddedUsersDetails.setVisibility(false);
            this.view.imgIcon.setVisibility(true);
            this.view.flxSelect.setVisibility(true);
            this.view.flxAddedUserSearch.setVisibility(false);
            this.view.btnAddUsersHeader.setVisibility(false);
          }else{
            this.setGroupUsersData("segSearchedUserDetails",context.signatoryGroupDetails.signatories);
            //this.view.flxSelectedUsers.info=context.signatoryGroupDetails.signatories;
            this.view.lblHeaderAddedUsers.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ADDEDUSERS")+" ("+(this.view.flxSelectedUsers.info.length<10?"0"+this.view.flxSelectedUsers.info.length:this.view.flxSelectedUsers.info.length)+")";
            this.view.flxAddedUsersDetails.setVisibility(true);
            this.view.imgIcon.setVisibility(false);
            this.view.flxSelect.setVisibility(false);
            this.view.flxAddedUserSearch.setVisibility(true);
            this.view.btnAddUsersHeader.setVisibility(true);
          }
        }
      }else if(context.noGroupUsers){
        this.showGroupAddUsersPopup(context.noGroupUsers);
        this.noGroupUsers=context.noGroupUsers;
      } else if(context.approvalPermissions){
        this.setApprovalPermissions(context.approvalPermissions.accounts);
        this.accLvlPermissions=context.approvalPermissions.accounts;
      } else if(context.createGroupSuccess){
        this.createEditGroupSuccess(context.createGroupSuccess);
      }
      else if(context.isElegibleForDelete===true)
        {
         this.showDeleteGroupPopupListPage(context);//.signatoryGroupName);
        }
      else if(context.isElegibleForDelete===false)
        {
         this.showErrorGroupPopup(context);//.signatoryGroupName);     
        }
    else if(context.customerSearchByuserId){
		 this.customerSearchCallBackByUserId(context.customerSearchByuserId);
     }
      else if(context.customerSearchByuserIdError){
		 this.coreRelativeCustomersErrorCallBackByUserID(context.customerSearchByuserIdError);
     }
      
      
     // else if(context.updateSignatoryGroups){
       // this.setViewSignatoryGroupsSegmentData(context.updateSignatoryGroups);
     // }     
    }
  },
  setWidgetDataMap : function(segAccountFeatures){
      var widgetDataMap = {
        // segContractsAccountView template widgets
        'flxContractsAccountContainer': 'flxContractsAccountContainer',
        'flxContractsAccountView': 'flxContractsAccountView',
        'flxStatus': 'flxStatus',
        'fontIconStatus': 'fontIconStatus',
        'lbAccountName': 'lbAccountName',
        'lblAccountHolderName': 'lblAccountHolderName',
        'lblAccountNumber': 'lblAccountNumber',
        'lblAccountType': 'lblAccountType',
        'lblSeperator': 'lblSeperator',
        'lblStatus': 'lblStatus',
        
        // segContractsAccountHeaderView template widgets
      'flxAccHolderNameHeader': 'flxAccHolderNameHeader',   
      'flxAccountNameHeader': 'flxAccountNameHeader',
      'flxAccountNumberHeader': 'flxAccountNumberHeader',
      'flxAccountTypeHeader': 'flxAccountTypeHeader',
      'flxContractsAccountHeaderView': 'flxContractsAccountHeaderView',
      'flxHeader': 'flxHeader',
      'flxHeaderAccountStatus': 'flxHeaderAccountStatus',
      'fontIconAccHoldNameSort': 'fontIconAccHoldNameSort',
      'fontIconAccNameSort': 'fontIconAccNameSort',
      'fontIconAccNumberSort': 'fontIconAccNumberSort',
      'fontIconAccTypeFilter': 'fontIconAccTypeFilter',
      'fontIconFilterStatus': 'fontIconFilterStatus',
      'lblAccHolderNameHeader': 'lblAccHolderNameHeader',
      'lblAccountNameHeader': 'lblAccountNameHeader',
      'lblAccountNumberHeader': 'lblAccountNumberHeader',
      'lblAccountStatusHeader': 'lblAccountStatusHeader',
      'lblAccountTypeHeader': 'lblAccountTypeHeader',
      'lblHeaderSeperator': 'lblHeaderSeperator',
        
      // segContractsFABodyView template
      "flxContractsFABodyView": "flxContractsFABodyView",
      "flxFeatureStatus": "flxFeatureStatus",
      "flxViewActionBody": "flxViewActionBody",
      "lblActionDesc": "lblActionDesc",
      "lblActionName": "lblActionName",
      "statusIcon": "statusIcon",
      "statusValue": "statusValue",
      "flxArrow" :"flxArrow",
      "lblArrow": "lblArrow",
        // segContractsFAHeaderView template
      "flxContractsFAHeaderView": "flxContractsFAHeaderView",
      "flxFeatureDetails": "flxFeatureDetails",
      "flxFeatureStatus": "flxFeatureStatus",
      "flxHeader": "flxHeader",
      "flxRow1": "flxRow1",
      "flxSelectedActions": "flxSelectedActions",
      "flxViewActionHeader": "flxViewActionHeader",
      "lblActionDescHeader": "lblActionDescHeader",
      "lblActionHeader": "lblActionHeader",
      "lblActionStatusHeader": "lblActionStatusHeader",
      "lblAvailableActions": "lblAvailableActions",
      "lblCountActions": "lblCountActions",
      "lblFASeperator1": "lblFASeperator1",
      "lblFASeperator2": "lblFASeperator2",
      "lblFASeperator3": "lblFASeperator3",
      "lblFeatureName": "lblFeatureName",
      "lblTotalActions": "lblTotalActions",

      // segContractsLimitsBodyView tempalte
      "flxContractsLimitsBodyView": "flxContractsLimitsBodyView",
      "flxDailyLimitTextBox": "flxDailyLimitTextBox",
      "flxPerLimitTextBox": "flxPerLimitTextBox",
      "flxViewLimits": "flxViewLimits",
      "flxWeeklyLimitTextBox": "flxWeeklyLimitTextBox",
      "lblAction": "lblAction",
      "lblCurrencySymbol1": "lblCurrencySymbol1",
      "lblCurrencySymbol2": "lblCurrencySymbol2",
      "lblCurrencySymbol3": "lblCurrencySymbol3",
      "lblDailyTransactionLimit": "lblDailyTransactionLimit",
      "lblLimitsSeperator": "lblLimitsSeperator",
      "flxPerLimit": "flxPerLimit",
      "lblCurrencyPer": "lblCurrencyPer",
      "lblPerTransactionLimit": "lblPerTransactionLimit",
      "flxDailyLimit": "flxDailyLimit",
      "lblCurrencyDaily": "lblCurrencyDaily",
      "flxWeeklyLimit": "flxWeeklyLimit",
      "lblCurrencyWeekly": "lblCurrencyWeekly",
      "lblWeeklyTransactionLimit": "lblWeeklyTransactionLimit",
      "tbxDailyValue": "tbxDailyValue",
      "tbxPerValue": "tbxPerValue",
      "tbxWeeklyValue": "tbxWeeklyValue",

      // segContractsLimitsHeaderView template
      "flxActionDetails": "flxActionDetails",
      "flxActionStatus": "flxActionStatus",
      "flxContractsLimitsHeaderView": "flxContractsLimitsHeaderView",
      "flxDailyLimitHeader": "flxDailyLimitHeader",
      "flxHeader": "flxHeader",
      "flxLimitInfo1": "flxLimitInfo1",
      "flxLimitInfo2": "flxLimitInfo2",
      "flxLimitInfo3": "flxLimitInfo3",
      "flxPerLimitHeader": "flxPerLimitHeader",
      "flxRow1": "flxRow1",
      "flxViewLimitsHeader": "flxViewLimitsHeader",
      "flxWeeklyLimitHeader": "flxWeeklyLimitHeader",
      "fontIconInfo1": "fontIconInfo1",
      "fontIconInfo2": "fontIconInfo2",
      "fontIconInfo3": "fontIconInfo3",
      "lblActionHeader": "lblActionHeader",
      "lblActionName": "lblActionName",
      "lblDailyLimitHeader": "lblDailyLimitHeader",
      "lblFASeperator1": "lblFASeperator1",
      "lblFASeperator2": "lblFASeperator2",
      "lblPerLimitHeader": "lblPerLimitHeader",
      "lblWeeklyLimitHeader": "lblWeeklyLimitHeader",
      "statusIcon": "statusIcon",
      "statusValue": "statusValue",
        "lblLimitsSeperator3" :"lblLimitsSeperator3",
     
      };
      segAccountFeatures.widgetDataMap = widgetDataMap;
  },
  resetSectionsForViewContracts :  function(rowData , tabName){
    // we expand/collapse the rowData
    let  check = false;
    if (tabName == 'Limits') {
          // for limits tab updating the data
          check = rowData[0]["flxViewLimitsHeader"]["isVisible"];
          rowData[0]["flxViewLimitsHeader"]["isVisible"] = !check;
          rowData[0]['lblFASeperator1']["isVisible"] = !check;
          rowData[0]['lblLimitsSeperator3']["isVisible"] = check;
    } else {
        // for actions tab updating the data
        check = rowData[0]["flxViewActionHeader"]["isVisible"];
        rowData[0]["flxViewActionHeader"]["isVisible"] = !check;
        rowData[0]['lblFASeperator3']["isVisible"] = !check;
        rowData[0]['lblFASeperator1']["isVisible"] = !check;
    }
      
    rowData[0]['lblArrow'] = !check?"\ue915":"\ue922"; 
    // ue915 is the down arrow
    
  },
  collapseSegmentSection: function(segment , tabName){
    let prevInd = this.prevContractSelected.segRowNo;
    // if prevIndex is empty we reset to -1
    if(prevInd == -1){
      return;
    }
    let rowData = segment.data[prevInd];
    if(rowData &&rowData[1] && rowData[1].template=== "flxContractsFAHeaderView"){
      // the segment doesn't have section , returning from he function
      return;
    }
    if(rowData[1]){
      rowData[1] = [
        {
          "template": "flxContractsFAHeaderView"
        }
      ];
    }
    // collapsing the rowdata
    this.resetSectionsForViewContracts(rowData , tabName);
    
    // updating the index 
    segment.setSectionAt(rowData , prevInd);
    // segment.setData(segment.data);
  },
  /*
   * Created by :kaushik mesala
   * function to expand/collapse the feature / limits in the contracts
   * @param: component , component Index , tabname (which can be features/limits) 
   */
  contractComponentArrowToggle : function(accountsFeaturesCard , compInd , tabName){
    
    var visibility = accountsFeaturesCard.flxCardBottomContainer.isVisible === true ? false : true;
    if(visibility === true){
      var segdata = accountsFeaturesCard.info.segData;
      accountsFeaturesCard.segAccountFeatures.setData(segdata);
    }
    // reset previos selected component and segment
    let prevInd = this.prevContractSelected.contractNo;
    if(prevInd != -1){
      let components = this.view.flxContractContainer.widgets();      
      components[prevInd].toggleCollapseArrow( false);
      
      // reset segment data
      this.collapseSegmentSection( components[prevInd].segAccountFeatures , tabName);

      this.prevContractSelected.segRowNo = -1;      
    }
    accountsFeaturesCard.toggleCollapseArrow( visibility);
    this.prevContractSelected.contractNo = compInd;
  },
  /*
   * Created by :kaushik mesala
   * function to create dynamic component to show the accounts features
   * @param: result of service call
   */
  createDynamicFlexForContract: function( resData , tabName){
    
     this.view.flxAccountsSegmentPart.setVisibility(false);
     this.view.flxContractAccountsDetail.setVisibility(true);
     // resetting the index 
    this.prevContractSelected ={
                  contractNo : -1,
                  segRowNo : -1 
    };
    this.currViewContractsTab = tabName;
    // emptying the widget everytime
    this.view.flxContractContainer.removeAll();

    var noOfContracts = 0;
    if(tabName == 'Accounts'){
      noOfContracts = resData.length;
    }else{
      noOfContracts = resData.length;
    }
    if(noOfContracts === 0){
      //show no record found
      this.view.flxNoAccountResults.setVisibility(true);
    }else{
      this.view.flxNoAccountResults.setVisibility(false);
    }

    var channelName = 'accountsFeaturesCard';
    var width = "100";
    try {
        for (let i = 0; i < noOfContracts; i++) {
            let accountsFeaturesCard = new com.adminConsole.contracts.accountsFeaturesCard({
                "clipBounds": true,
                "id": channelName + "" + i,
                "isVisible": true,
                "masterType": constants.MASTER_TYPE_DEFAULT,
                "width": width + "%",
                "top": "20dp"
            }, {}, {});
            accountsFeaturesCard.toggleCollapseArrow(false);
            //Generic  onclick should be placed at the time of component creation
            //  overriding of onclick is done in respective tab if-else closure
            accountsFeaturesCard.lblHeading2.text="TAX ID & ADDRESS";
            accountsFeaturesCard.lblHeading3.setVisibility(false);
            accountsFeaturesCard.lblData2.text = "View";
            accountsFeaturesCard.lblData2.skin="sknLbl117EB0LatoReg14pxHov";
           // accountsFeaturesCard.lblData2.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
            accountsFeaturesCard.lblData2.onTouchStart=this.accountsPopup.bind(this,resData[i].coreCustomerId,this.completeContractDetails.legalEntityId);
            accountsFeaturesCard.lblData3.setVisibility(false);
            accountsFeaturesCard.flxArrow.onClick = this.contractComponentArrowToggle.bind(this  , accountsFeaturesCard , i , tabName);
            
          	// setting widget data map
            this.setWidgetDataMap(accountsFeaturesCard.segAccountFeatures);
            
            this.view.tbxTransactionSearch.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByComp");
            
            let acctDetail = resData[i];
            let contractName ="",contractId="";

            contractId = acctDetail.coreCustomerId;
          // setting the data to segment
            if(tabName === 'Accounts'){
              this.resetFilterWidgetsForAcct();
              this.contractDetailsMap[contractId]  = {};  
              this.contractDetailsMap[contractId].contractName = acctDetail.coreCustomerName;
              this.contractDetailsMap[contractId].contractTaxId = acctDetail.taxId;
              this.contractDetailsMap[contractId].email = acctDetail.email ? acctDetail.email : 'N/A';
              this.contractDetailsMap[contractId].phone = acctDetail.phone ? acctDetail.phone : 'N/A';
              this.contractDetailsMap[contractId].industry = acctDetail.industry ? acctDetail.industry : 'N/A';
              this.contractDetailsMap[contractId].addressLine1 = acctDetail.addressLine1;
              this.contractDetailsMap[contractId].addressLine2 =  acctDetail.addressLine2;
              this.contractDetailsMap[contractId].isPrimary =  acctDetail.isPrimary;
              
              this.view.tbxTransactionSearch.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCont");
              this.setDataToContractAccts(accountsFeaturesCard, resData[i].accounts , i);              

            }else if (tabName == 'Features'){
              this.setDataToContractFetaures(accountsFeaturesCard, acctDetail.features,false,acctDetail);
            }else{
              this.setDataToContractLimits(accountsFeaturesCard, resData);
            }

            if(this.contractDetailsMap[contractId].isPrimary === "true"){
              accountsFeaturesCard.flxPrimary.setVisibility(true);
            }
            accountsFeaturesCard.lblName.text = this.contractDetailsMap[contractId].contractName;
            
            accountsFeaturesCard.lblData1.text = contractId;
            //accountsFeaturesCard.lblData2.text = this.contractDetailsMap[contractId].contractTaxId;
            //accountsFeaturesCard.lblData3.text = this.contractDetailsMap[contractId].addressLine1 + ","+this.contractDetailsMap[contractId].addressLine2;  
			
            // onTouchStart on the below label is not smooth updating to onClick
            accountsFeaturesCard.lblName.onClick = function(){
              let details = {"id": contractId,
                "name":this.contractDetailsMap[contractId].contractName,
                "industry":this.contractDetailsMap[contractId].industry,
                "email":this.contractDetailsMap[contractId].email,
                "phone":this.contractDetailsMap[contractId].phone,
                "address": accountsFeaturesCard.lblData3.text
              };
              this.view.contractDetailsPopup.setDataForPopup(details);

              this.view.contractDetailsPopup.showBackButton(false);
              this.view.flxContractDetailsPopup.setVisibility(true);
            }.bind(this);

            this.view.flxContractContainer.add(accountsFeaturesCard);
        }
      this.view.forceLayout();
    } catch (e) {
        console.log("Exception in dynamic widget creation :" + e);
    }
  },
  accountsPopup: function(coreCustId,LegalEntityId){
    var payload = {
      "coreCustomerId":coreCustId,
      "legalEntityId":LegalEntityId
    }
    this.presenter.getCoreCustomerDetails(payload);
  },
  setAccountsPopupData: function(context){
    this.view.flxAccountsPopup.setVisibility(true); 
    this.view.DataFields.lblHeading1.text = "TAX ID";
    this.view.DataFields.lblHeading2.text = "ADDRESS"
    this.view.DataFields.lblPopUpMainMessage.text=context[0].name;
    this.view.DataFields.lblData1.text=context[0].taxId;
    this.view.DataFields.lblData2.text=this.AdminConsoleCommonUtils.getAddressText(context[0].cityName, context[0].country);
    this.view.forceLayout();
    //this.view.lblCustName.text=context[0].name;
    //this.view.lblTaxIdValue.text=context[0].taxId;
    //this.view.lblAddressValue.text=this.AdminConsoleCommonUtils.getAddressText(context[0].cityName, context[0].country)
  },
  companiesPreShow: function(){
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setFlowActions();
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    if(!this.view.mainHeader.btnAddNewOption.isVisible)
        this.view.mainHeader.btnDropdownList.right="0px";
    this.view.flxAddUsersPopup.setVisibility(false);
    this.view.flxAddUser.setVisibility(false);
    this.view.flxAddApprovalRule.setVisibility(false);
    //this.defaultCurrencyCodeSymbol =this.defaultCurrencyCode();
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnAddGroupSave1,true,true);
    //customization for taxid custom listbox component
    // this.view.customListboxTaxid.segList.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    // this.view.customListboxTaxid.segList.selectionBehaviorConfig = {};
    // this.view.customListboxTaxid.flxSegmentList.skin = "sknFlxBgFFFFFFbrD7D9E01pxRd3pxShd0D0D11";
    //this.currencyValue=this.defaultCurrencyCode();
    var UpdateLegalEntities=this.getLEListForFormAction("frmCompanies",'UPDATE');
    var selectedLegalEntityId = this.completeContractDetails.legalEntityId;
    for(var i=0; i<UpdateLegalEntities.length; i++){
      if(UpdateLegalEntities[i].id.indexOf(selectedLegalEntityId) === 0){
          this.view.btnCompanyDetailEdit.isVisible = true;
          break;
        }
      else{
        this.view.btnCompanyDetailEdit.isVisible = false;
      }
    }
  },
  companiesPostshow : function(){
    if (this.toastModel.status && this.toastModel.status ==="SUCCESS") {
      this.view.toastMessage.showToastMessage(this.toastModel.message, this);
    } else if (this.toastModel.status && this.toastModel.status === "ERROR") {
      this.view.toastMessage.showErrorToastMessage(this.toastModel.message, this);
    }
    this.toastModel ={};
  },
  downloadTransactionsAsCSV: function () {
    var segData = this.view.segTransactionHistory.data;
    var list = segData.map(function (record) {
      return {
        "RefNo": record.lblRefNo,
        "Type": record.lblType,
        "Description": record.lblTransctionDescription,
        "DateAndTime": record.lblDateAndTime,
        "Amount": record.lblAmountOriginal
      };
    });
    this.commonDownloadCSV(list, "Transactions.csv");
  },
  searchFilter: function(features) {
    var searchText = this.view.subHeader.tbxSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      return features.lblFeature.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },
  featureSearch : function(){
    var scopeObj = this;
    if(!(scopeObj.dataForSearch)){
      scopeObj.currentSegFeatureData = scopeObj.view.segFeatures.data;
      scopeObj.dataForSearch = true;
    }
    var data = scopeObj.currentSegFeatureData.filter(scopeObj.searchFilter);
    if (scopeObj.view.subHeader.tbxSearchBox.text === "") {
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
    } else {
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
    }
    if (data.length === 0) {
      scopeObj.view.flxFeaturesContainer.setVisibility(false);
      scopeObj.view.flxFeatureNoResultfound.setVisibility(true);
      scopeObj.view.forceLayout();
    } else {
      scopeObj.view.flxFeaturesContainer.setVisibility(true);
      scopeObj.view.flxFeatureNoResultfound.setVisibility(false);
      scopeObj.view.segFeatures.setData(data.filter(scopeObj.searchFilter));
      scopeObj.view.forceLayout();
    }
  },
  searchMandatoryFilter: function(features) {
    var searchText = this.view.mandatoryFeatureHeader.tbxSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      return features.lblFeature.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },
  mandatoryfeatureSearch : function(){
    var scopeObj = this;
    if(!(scopeObj.dataForMandatorySearch)){
      scopeObj.currentMandatorySegFeatureData = scopeObj.view.segmandatoryFeatures.data;
      scopeObj.dataForMandatorySearch = true;
    }    
    var data = scopeObj.currentMandatorySegFeatureData.filter(scopeObj.searchMandatoryFilter);
    if (scopeObj.view.mandatoryFeatureHeader.tbxSearchBox.text === "") {
      scopeObj.view.mandatoryFeatureHeader.flxClearSearchImage.setVisibility(false);
    } else {
      scopeObj.view.mandatoryFeatureHeader.flxClearSearchImage.setVisibility(true);
    }
    if (data.length === 0) {
      scopeObj.view.mandatoryFeatureContainer.setVisibility(false);
      scopeObj.view.flxMandatoryFeatureNoResultfound.setVisibility(true);
      scopeObj.view.forceLayout();
    } else {
      scopeObj.view.mandatoryFeatureContainer.setVisibility(true);
      scopeObj.view.flxMandatoryFeatureNoResultfound.setVisibility(false);
      scopeObj.view.segmandatoryFeatures.setData(data.filter(scopeObj.searchFilter));
      scopeObj.view.forceLayout();
    }
  },
  togglePopUpScreens : function(){
  	if(this.view.flxAddExistingUserRelatatedCustomer.isVisible === true){
      this.view.flxOtherUserInlineErrorContainer.setVisibility(false);
      this.view.flxNoResultsFoundExistingCust.setVisibility(false);
      this.view.flxAddExistingUserRelatatedCustomer.setVisibility(false);
      this.view.flxAddExistingUserOtherCustomer.setVisibility(true);
      this.view.flxOtherCustomerButtons.setVisibility(true);
      this.view.btntoggleRelatedOther.text = "Search Related Customers";
      this.view.lblAddExsitingUserPopUpSubHeader.text = kony.i18n.getLocalizedString("i18n.frmCompanies.searchCustomerOrUsers")+" \""+this.recentContractDetails.contractName+"\".";
      this.recentCustomerSearchTab = "other";
    }else if(this.view.flxAddExistingUserOtherCustomer.isVisible === true){
      this.view.flxAddExistingUserRelatatedCustomer.setVisibility(true);
      this.view.flxAddExistingUserOtherCustomer.setVisibility(false);
      this.view.btntoggleRelatedOther.text = "Search Other Customers/Users";
      this.view.lblAddExsitingUserPopUpSubHeader.text = kony.i18n.getLocalizedString("i18n.frmCompanies.relatedCustomer")+" \""+this.recentContractDetails.contractName+"\".";
      this.recentCustomerSearchTab = "Existing";
    }
  },
  showAddExistingPopUp : function(){
    this.setContractPreDataExsitingPopUp();
    this.view.flxAddExistingUserRelatatedCustomer.setVisibility(true);
    this.view.btntoggleRelatedOther.setVisibility(true);
    this.view.flxAddUserFromExistingCustomerContainer.setVisibility(true);
    this.view.addExistingcommonButtons.btnSave.text = "ADD";
    this.view.flxAddOtherUserContactInfo.setVisibility(false);
    this.view.flxAddExistingUserPopupHeader.setVisibility(true);
    this.view.addExistingcommonButtons.btnSave.setEnabled(false);
  },
  setContractPreDataExsitingPopUp : function(){
    //global data
    this.view.lblAddExsitingUserPopUpSubHeader.text = kony.i18n.getLocalizedString("i18n.frmCompanies.relatedCustomer")+" \""+this.recentContractDetails.contractName+"\".";
    this.view.btntoggleRelatedOther.text = "Search Other Customers/Users";
    this.view.addExistingcommonButtons.btnSave.skin = "sknBtn7B7B7BRad20px";
    this.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn7B7B7BRad20px";
    this.view.addExistingcommonButtons.btnSave.setEnabled(false);

    //search existing customer screen data
    this.view.contractCustomers.lblSelectedValue.text = "Select a Customer"
    this.view.contractCustomers.lblSelectedValue.info = "";
    this.view.flxSearchForExistingUser.setVisibility(true);
    this.view.flxExistingUserListContainer.setVisibility(false);
    this.view.flxAddExistingUserRelatatedCustomer.setVisibility(true);
    this.view.flxAddExistingUserOtherCustomer.setVisibility(false);
    this.view.contractCustomers.flxSegmentList.setVisibility(false);
    this.view.contractCustomers.segList.selectionBehavior = 1;
    this.recentCustomerSearchTab = "Existing";
    
    //search other customer screen data
    this.view.textBoxOtherCustomerEntry11.tbxEnterValue.text = "";
    this.view.textBoxOtherCustomerEntry12.tbxEnterValue.text = "";
    this.view.textBoxOtherCustomerEntry13CustomerDOB.value = "",
    this.view.textBoxOtherCustomerEntry22.tbxEnterValue.text = "";
    this.view.textBoxOtherCustomerEntry23.tbxEnterValue.text = "";
    this.view.flxSearchForOtherCustomer.setVisibility(true);
    this.view.flxOtherCusotmerListContainer.setVisibility(false);
  },
  getContractCustomersData : function(){
    var contractDetails = this.completeContractDetails;
    var customers = this.completeContractDetails.contractCustomers;
    var customerList = [];
    for(var i=0;i<customers.length;i++){
      customerList.push(
        {
          "coreCustomerId" : customers[i].coreCustomerId,
          "coreCustomerName" : customers[i].coreCustomerName,
          "id" : customers[i].contractId,
          "isPrimary" : customers[i].isPrimary
        });
    }
    this.recentContractDetails.contractServiceDef = contractDetails.servicedefinitionName;
    this.recentContractDetails.contractServiceDefId = contractDetails.servicedefinitionId;
    this.recentContractDetails.customers = customers;
    this.recentContractDetails.formattedCustomers = customerList;
    this.recentContractDetails.contractUsers = this.presenter.getContractUser();
    this.getRolesWRTSeerviceDef();
    this.setSerchContractCustomers(customerList);
  },
  getRolesWRTSeerviceDef : function(){
    var payload = {
      "serviceDefinitionId" : this.recentContractDetails.contractServiceDefId
    }
    this.presenter.getServiceDefinitionRoles(payload);
  },
  setSerchContractCustomers : function(data){
    var self = this;
    var widgetDataMap = {
    	"lblCustomerName" :  "lblCustomerName",
      	"coreCustomerName" : "coreCustomerName",
		       "coreCustomerId" : "coreCustomerId",
      	"isPrimary" : "isPrimary",
      	"id" : "id"
    }
    var finaldata = data.map(self.mappingCustomers);
    this.view.contractCustomers.segList.widgetDataMap = widgetDataMap;
    this.view.contractCustomers.segList.setData(finaldata);
    this.view.contractCustomers.segList.info = {
      "records" : []
    };
    this.view.contractCustomers.segList.info.records = finaldata;
    this.view.contractCustomers.segList.onRowClick = this.contractCustomerRowClick;
  },
  mappingCustomers : function(data){
    return {
      "lblCustomerName" :  {
        "text" : data.coreCustomerName + "(" + data.coreCustomerId + ")"
      },
      "coreCustomerName" : data.coreCustomerName,
      "coreCustomerId" : data.coreCustomerId,
      "id" : data.id,
      "isPrimary" : data.isPrimary
    }
  },
  toggleCustomerDropDown : function(){
    if(this.view.contractCustomers.flxSegmentList.isVisible === true){
      this.view.contractCustomers.flxSegmentList.setVisibility(false);
    }else if(this.view.contractCustomers.flxSegmentList.isVisible === false){
      this.view.contractCustomers.flxSegmentList.setVisibility(true);
    }
    this.view.forceLayout();
  },
  contractCustomerRowClick : function(){
    var data = this.view.contractCustomers.segList.selectedRowItems;
    this.view.contractCustomers.lblSelectedValue.text = data[0].lblCustomerName.text;
    this.view.contractCustomers.lblSelectedValue.info = data[0].coreCustomerId;
    this.toggleCustomerDropDown()
  },
  searchRelatedCustomers : function(){
    if(this.validateEntryForListBox()){
      this.view.flxAddUseFromExistingCustomerLoading.setVisibility(true);
      this.view.flxAddExistingUserInlineError.setVisibility(false);
      var payload = {
        "coreCustomerId" : this.view.contractCustomers.lblSelectedValue.info,
        "legalEntityId":this.completeContractDetails.legalEntityId
      }
      this.presenter.getAllEligibleRelationalCustomers(payload);
    }else{
      this.view.flxAddExistingUserInlineError.setVisibility(true);
    }
  },
  validateEntryForListBox : function(){
    if(this.view.contractCustomers.lblSelectedValue.info === ""){
      return false;
    }else{
      return true;
    }
  },
  searchOtherCustomers : function(){
    this.view.errorFlagMessage.setVisibility(false);
    this.view.flxOtherUserInlineErrorContainer.setVisibility(true);
    this.view.flxOtherUserInlineErrorContainer.top = "300dp";
    if(this.validateEntriesForParamSearch()){
      this.view.flxAddUseFromExistingCustomerLoading.setVisibility(true);
      this.view.flxOtherUserInlineError.setVisibility(false);
      var updateDate = "";
      var dateText = this.view.textBoxOtherCustomerEntry13CustomerDOB.value
      if(dateText)
        updateDate = this.getTransactionDateForServiceCall(new Date(dateText));
      var payload = {
        "_customerId": this.view.textBoxOtherCustomerEntry11.tbxEnterValue.text.trim() || "",
        "_name": this.view.textBoxOtherCustomerEntry12.tbxEnterValue.text.trim() || "",
         "_username" : "",
        "_dateOfBirth": updateDate.substring(0,10) || "",
        "_SSN" : this.view.textBoxOtherCustomerEntry22.tbxEnterValue.text.trim() || "",
        "_email": this.view.textBoxOtherCustomerEntry23.tbxEnterValue.text.trim() || "",    
        "_searchType":"CUSTOMER_SEARCH",
        "_pageOffset":"0",
        "_pageSize":"",
        "_sortVariable":"FirstName",
        "_sortDirection":"ASC",
        "_legalEntityId":this.completeContractDetails.legalEntityId
      };
      this.createCountSentence(payload);
      this.presenter.customerSearch(payload,2);
    }else{
      this.view.flxOtherUserInlineError.setVisibility(true);
    }
  },
  validateEntriesForParamSearchByUserId:function(){
   if(this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text.trim() === "" )
   {
     return false;
    }else{
      return true;
    }
  },
  validateContactInfo: function() {
        var self = this;
        var isValid = true;       
        //email-id
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.view.textBoxAddOtherUserContactEntry1.tbxEnterValue.text.trim() === "") {
            self.view.textBoxAddOtherUserContactEntry1.flxEnterValue.skin = "sknflxEnterValueError";
            self.view.textBoxAddOtherUserContactEntry1.flxInlineError.setVisibility(true);
            self.view.textBoxAddOtherUserContactEntry1.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailId_cannot_be_empty");
            isValid = false;
        } else if (emailRegex.test(self.view.textBoxAddOtherUserContactEntry1.tbxEnterValue.text.trim()) === false) {
            self.view.textBoxAddOtherUserContactEntry1.flxEnterValue.skin = "sknflxEnterValueError";
            self.view.textBoxAddOtherUserContactEntry1.flxInlineError.setVisibility(true);
            self.view.textBoxAddOtherUserContactEntry1.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailID_not_valid");
            isValid = false;
        }
        //ISD code
        var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
      if((!self.view.textBoxAddOtherUserContactEntry2.txtISDCode.text) || (!self.view.textBoxAddOtherUserContactEntry2.txtISDCode.text.trim()) || 
       (self.view.textBoxAddOtherUserContactEntry2.txtISDCode.text.trim().length > 4) || (ISDRegex.test(self.view.textBoxAddOtherUserContactEntry2.txtISDCode.text) === false)) {
      self.view.textBoxAddOtherUserContactEntry2.flxError.isVisible = true;
      self.view.textBoxAddOtherUserContactEntry2.lblErrorText.text = "Enter a valid ISD code";
      self.view.textBoxAddOtherUserContactEntry2.txtISDCode.skin = "skinredbg";
      isValid = false;
    }
    
        //contact num
        var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text || !self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text.trim()) {
            self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.skin = "skinredbg";
            self.view.textBoxAddOtherUserContactEntry2.flxError.left = "80dp";
            self.view.textBoxAddOtherUserContactEntry2.flxError.setVisibility(true);
            self.view.textBoxAddOtherUserContactEntry2.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_be_empty");
            isValid = false;
        } else if (self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text.trim().length > 15) {
            self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.skin = "skinredbg";
            self.view.textBoxAddOtherUserContactEntry2.flxError.left = "80dp";
            self.view.textBoxAddOtherUserContactEntry2.flxError.setVisibility(true);
            self.view.textBoxAddOtherUserContactEntry2.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_exceed");
            isValid = false;
        } else if (phoneRegex.test(self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text) === false) {
            self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.skin = "skinredbg";
            self.view.textBoxAddOtherUserContactEntry2.flxError.left = "80dp";
            self.view.textBoxAddOtherUserContactEntry2.flxError.setVisibility(true);
            self.view.textBoxAddOtherUserContactEntry2.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
            isValid = false;
        }
        //SSN
        if (self.view.textBoxAddOtherUserContactEntry3.tbxEnterValue.text.trim() === "") {
            self.view.textBoxAddOtherUserContactEntry3.flxEnterValue.skin = "sknflxEnterValueError";
            self.view.textBoxAddOtherUserContactEntry3.flxInlineError.setVisibility(true);
            self.view.textBoxAddOtherUserContactEntry3.lblErrorText.text = "Tax ID can not be empty";
            isValid = false;
        }
        return isValid;
    },
  coreRelativeCustomersErrorCallBackByUserID: function (error) {
    this.view.flxOtherCustomerSearchResultsByUserId.setVisibility(false);
    this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
    if (error && error.dbpErrCode === 22212) {
       this.view.flxNoResultsFoundExistingCustByUserID.setVisibility(true);
    } else if (error && error.dbpErrCode === 22213) {
       this.view.flxOtherUserInlineErrorContainer.top = "170dp";
       this.view.errorFlagMessage.setVisibility(true);
       this.view.errorFlagMessage.lblErrorValue.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.AccessRestrictedForUserSearch");
       this.view.flxOtherUserInlineErrorContainer.setVisibility(true);
    } else {
          this.view.flxNoResultsFoundExistingCustByUserID.setVisibility(true);
    }
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.addExistingcommonButtons.btnSave, false, false);
    this.view.addExistingcommonButtons.btnSave.setEnabled(false);
    this.view.lblSeperatorByUserID.setVisibility(false);
    this.view.forceLayout();
  },
  searchOtherCustomersByUserId: function() {
    if (this.validateEntriesForParamSearchByUserId()) {
      this.view.flxAddUseFromExistingCustomerLoading.setVisibility(true);
      this.view.flxOtherUserInlineError.setVisibility(false);
      var payload = {
        "userId": this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text.trim() || "",
      }; 
      this.createCountSentence(payload);
      this.presenter.UserIdSearchOperationDetailedData(payload,1);	
    }
    if(payload===undefined)
    {
      this.view.flxOtherCusotmerListContainerUserId.setVisibility(false);
    }else{
      this.countsentence = "Search results for User ID:" + payload.userId;
    }
    this.view.forceLayout();
    },
    navigateToAddedUser : function() {
      var self=this;
      var data =self.view.segOtherRelatedCustListByUserId.data[0];
      self.view.textBoxAddOtherUserContactEntry1.tbxEnterValue.text=data.PrimaryEmailAddress;
      var phnNum = data.PrimaryPhoneNumber.split("-");
	      data.phoneCountryCode = phnNum[0];
      data.phoneNumber = phnNum[1];
      self.view.textBoxAddOtherUserContactEntry2.txtISDCode.text=data.phoneCountryCode;
      self.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text=data.phoneNumber;
      self.view.textBoxAddOtherUserContactEntry3.tbxEnterValue.text=data.ssn?data.ssn:" ";
      self.clearValidationOnNewUser(self.view.textBoxAddOtherUserContactEntry1tbxEnterValue,
                                        self.view.textBoxAddOtherUserContactEntry1.flxEnterValue,
                                        self.view.textBoxAddOtherUserContactEntry1.flxInlineError); 
      self.clearValidationOnNewUserContactInfo(self.view.textBoxAddOtherUserContactEntry2txtISDCode,
                                        self.view.textBoxAddOtherUserContactEntry2.txtISDCode,
                                        self.view.textBoxAddOtherUserContactEntry2.flxError);
      self.clearValidationOnNewUserContactInfo(self.view.textBoxAddOtherUserContactEntry2txtContactNumber,
                                        self.view.textBoxAddOtherUserContactEntry2.txtContactNumber,
                                        self.view.textBoxAddOtherUserContactEntry2.flxError);
      self.clearValidationOnNewUser(self.view.textBoxAddOtherUserContactEntry3tbxEnterValue,
                                        self.view.textBoxAddOtherUserContactEntry3.flxEnterValue,
                                        self.view.textBoxAddOtherUserContactEntry3.flxInlineError);
      self.view.btntoggleRelatedOther.setVisibility(false);
      self.view.details1.lblData1.text = data.FirstName ? data.FirstName : "-";
      self.view.details1.lblData2.text = data.MiddleName ? data.MiddleName : "-";
      self.view.details1.lblData3.text = data.LastName ? data.LastName : "-";
      self.view.details2.lblData1.text = data.DateOfBirth ? data.DateOfBirth : "-";
      self.view.details2.lblData1.CustomerId = data.CustomerId;
      self.view.flxAddExistingUserOtherCustomer.setVisibility(false);
      self.view.flxAddOtherUserContactInfo.setVisibility(true);
      self.view.flxAddExistingUserPopupHeader.setVisibility(false);
      self.view.addExistingcommonButtons.btnSave.text = "SUBMIT";
     },
  customerSearchCallBackByUserId : function(data){
    if(data.records.length!==0 ||data.records===undefined){
      this.view.flxNoResultsFoundExistingCustByUserID.setVisibility(false);
      this.view.flxOtherCusotmerListContainerUserId.setVisibility(true);
      this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
      this.view.flxOtherCustomerSearchResultsByUserId.setVisibility(true);
      var widgetDataMap = this.widgetMapRelatedCustListByUserId();
      var dataToMap=data.records;
      this.mappingRelatedCustListByUserId(dataToMap);
      this.view.forceLayout();
    }
    else{
      this.coreRelativeCustomersErrorCallBackByUserID();
      this.view.forceLayout();
    }
  },
  widgetMapRelatedCustListByUserId : function(){
  	var widgetDataMap = {
      "flxSegRelatedCustListUserId" : "flxSegRelatedCustListUserId",
      "flxCheckBox" : "flxCheckBox",
      "flxExistingUserHeaderListInner" : "flxExistingUserHeaderListInner",
      "flxExistingUserId" : "flxExistingUserId",
      "flxExistingUserListHeader" : "flxExistingUserListHeader",
      "flxExistingUserName" : "flxExistingUserName",
      "flxExistingUserPrimaryEntity" : "flxExistingUserPrimaryEntity",
      "lblExistingUserPrimaryEntity" : "lblExistingUserPrimaryEntity",
      "flxExistingUserPhoneNumber" : "flxExistingUserPhoneNumber",
      "lblExistingUserName" : "lblExistingUserName",
      "flxExistingUserEmailId" : "flxExistingUserEmailId",
      "lblExistingUserId" : "lblExistingUserId",
      "lblCheckbox" : "lblCheckbox",
      "statusValue":"statusValue",
      "statusIcon":"statusIcon",
      "lblCheckboxRadio":"lblCheckboxRadio",
      "lblReasonToDisable":"lblReasonToDisable",
      "flxFeatureStatus" : "flxFeatureStatus",
    }
    return widgetDataMap;
    
  },
  mappingRelatedCustListByUserId : function(dataToMap){
    this.view.addExistingcommonButtons.btnSave.text = "NEXT";
    this.view.errorFlagMessage.setVisibility(false);
    this.view.flxContactInfoBackOption.setVisibility(true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.addExistingcommonButtons.btnSave, false, false);
    this.view.addExistingcommonButtons.btnSave.text = "ADD";
    var widgetDataMap = this.widgetMapRelatedCustListByUserId();
    // var dataToMap=[data];
    var seg = this.view.segOtherRelatedCustListByUserId;
    seg.widgetDataMap = widgetDataMap;
    this.view.lblSeperatorByUserID.setVisibility(false);
    var self = this;
    var primaryLE, primaryLEName;
    var userNamelist = [],branchIDList = [],finalDataLE={},finalDataBranch={},LEDataList={},mappingData={},ediPayloadRecord={};
    var legalEntityList = this.getCurrentUserLEArr();
    var isDefaultLE = this.completeContractDetails.legalEntityId;
    var searchedUsername=this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text;
    for (var i = 0; i < dataToMap.length; i++) {
      userNamelist.push(dataToMap[i].Username);
      finalDataLE[userNamelist[i]] = dataToMap[i];
      branchIDList.push(dataToMap[i].branchId);
      finalDataBranch[branchIDList[i]] = dataToMap[i];
    }
    LEDataList = Object.keys(finalDataLE);
    for (var k = 0; k < LEDataList.length; k++) {
      if (LEDataList[k] === searchedUsername) {
        mappingData = dataToMap[k];
        break;
      }
      else
      {
        mappingData = dataToMap[0];
      }
    }
    this.view.details1.lblHeading2.text = "MIDDLE NAME";
    this.view.lblSearchResults.skin = "sknLbl192B45LatoMed14px";
    this.view.lblSearchResults.text = kony.i18n.getLocalizedString("i18n.frmContractManagementController.SearchResult") + " " + this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text;
    var dataMapped = [mappingData];
    for(var v=0;v<dataMapped.length;v++){
      for (var l = 0; l < dataMapped[v].legalEntities.length; l++) {
        if (dataMapped[v].legalEntities[l].isHomeLegalEntity === "true") {
          primaryLE = dataMapped[v].legalEntities[l].legalEntity;
        }
      }
    }
    if (primaryLE === isDefaultLE) {
      this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.LEId = false;//notshowing
    } else {
      this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.LEId = true;
    }
    primaryLEName = this.getLEDesc(primaryLE);
    for (var p = 0; p < mappingData.legalEntities.length; p++) {
      if (isDefaultLE === mappingData.legalEntities[p].legalEntity) { //direct add user screen
        ediPayloadRecord = finalDataBranch[isDefaultLE];
        this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.coreCustId= false;
        break;
      } else { // show edit contact info
        if (mappingData.legalEntities[p].isHomeLegalEntity === "true") {
          ediPayloadRecord = finalDataBranch[mappingData.legalEntities[p].legalEntity];
          this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.coreCustId= true;
        }
      }
    }
    var typesData = [mappingData].map(function(rec){ 
      var isUserExists = self.checkIfUserIdAddedForContract(rec.Username);
      return {
        "flxCheckBox": isUserExists === false ? {"isVisible":true,
                                                 "onClick":self.onClickByUserID.bind(self,self.view.segOtherRelatedCustListByUserId,false),
                                                 "enable":true} :
        {"isVisible":true,"onClick":function(){},"enable":false},
        "lblCheckbox":{"isVisible":false},
        "lblCheckboxRadio": {"isVisible":true,
                        "text": isUserExists === false ? self.AdminConsoleCommonUtils.radioNotSelected:  self.AdminConsoleCommonUtils.radioSelectedl,
                        "src":"radio_notselected.png"},
        "lblExistingUserName" :{"text":rec.FirstName + " " + rec.LastName,
                                "skin": isUserExists === false ? "sknLbl29327613px":"sknLblLato485c7513pxOp60"},
        "lblExistingUserId": {"text":rec.Username,
                              "skin": isUserExists === false ? "sknLblLato485c7513px":"sknLblLato485c7513pxOp60"},
        "lblExistingUserPrimaryEntity":{"text":primaryLEName[0].companyName,
                                        "skin": isUserExists === false ? "sknLblLato485c7513px":"sknLblLato485c7513pxOp60"},
        'statusValue' :{"text":rec.Status_id == "SID_CUS_ACTIVE" ? "Active" : "Inactive",
                        "skin": isUserExists === false ? "sknLblLato485c7513px":"sknLblLato485c7513pxOp60"},
        "statusIcon": {
          'text':'',
          "skin": rec.Status_id == "SID_CUS_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive"
        },
        "flxExistingUserHeaderListInner":{"isVisible":true},
        "flxExistingUserListHeader":{"isVisible":true},
        "lblReasonToDisable":{"isVisible":isUserExists === true ? true : false,
                              "tooltip" : kony.i18n.getLocalizedString("i18n.frmCompanies.UserAlreadyAddedToContract")},
        "FirstName":rec.FirstName,
        "LastName":rec.LastName,
        "CustomerId":rec.Customer_id,
        "DateOfBirth":rec.DateOfBirth,
        "PrimaryPhoneNumber":rec.PrimaryPhoneNumber?rec.PrimaryPhoneNumber:"-",
        "PrimaryEmailAddress":rec.PrimaryEmailAddress,
        "ediPayloadRecord":ediPayloadRecord,   
        "template":"flxSegRelatedCustListUserId",
        "primaryCustomerId":rec.primaryCustomerId,
        "name":rec.name,
		        "ssn":rec.ssn?rec.ssn:rec.taxId,
      }
    });
    seg.setData(typesData);
    this.view.forceLayout();
  },
  /*
  * to chec if the searched userId is already part of the contract
  * @param: userId searched
  * @return: true/false
  */
  checkIfUserIdAddedForContract : function(currentUserId){
    var userExists = false;
    var contractUsers =  this.completeCompanyDetails.signatoryUsers || [];
    for(let i=0; i<contractUsers.length; i++){
      if(contractUsers[i].userName === currentUserId){
        userExists = true;
        break;
      }
    }
    return userExists;
  },
  onClickByUserID: function(segmentPath, condition) {
    var self = this;
    var segData = segmentPath.data[0];
    if (segmentPath.data[0].lblCheckboxRadio.text===self.AdminConsoleCommonUtils.radioNotSelected){
     segmentPath.data[0].lblCheckboxRadio.text = self.AdminConsoleCommonUtils.radioSelected;
    // segmentPath.data[0].lblCheckbox.skin = "sknIconBg0066CASz20pxCheckbox";
     segmentPath.data[0].lblCheckboxRadio.src="radio_selected.png";
     this.view.addExistingcommonButtons.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
     this.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
     this.view.addExistingcommonButtons.btnSave.setEnabled(true);	
     this.view.addExistingcommonButtons.btnSave.text="NEXT";
     segmentPath.setDataAt(segmentPath.data[0],0);
    }
    else if(segmentPath.data[0].lblCheckboxRadio.text===self.AdminConsoleCommonUtils.radioSelected)
    {
      segmentPath.data[0].lblCheckboxRadio.text = self.AdminConsoleCommonUtils.radioNotSelected;
      //segmentPath.data[0].lblCheckbox.skin = "sknBgB7B7B7Sz20pxCheckbox";
	  segmentPath.data[0].lblCheckboxRadio.src="radio_notselected.png";
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.addExistingcommonButtons.btnSave,false,false);	
      this.view.addExistingcommonButtons.btnSave.text="ADD";
      segmentPath.setDataAt(segmentPath.data[0],0);
    }
    this.view.forceLayout();
  },
  createCountSentence : function(payload){
    var sentence = "Showing results for ";
    if(payload._customerId !== ""){
      sentence = sentence + "Customer ID " + payload._customerId;
    }else if(payload._name !== ""){
      sentence = sentence + "Customer Name " + payload._name;
    }else if(payload._username !== ""){
      sentence = sentence + "User Name " + payload._username;
    }else if(payload._dateOfBirth !== ""){
      sentence = sentence + "Date of Birth " + payload._dateOfBirth;
    }else if(payload._SSN !== ""){
      sentence = sentence + "Tax ID " + payload._SSN;
    }else if(payload._email !== ""){
      sentence = sentence + "Email ID " + payload._email;
    }
    this.countsentence = sentence;
  },
  validateEntriesForParamSearch : function(){
    if(this.view.textBoxOtherCustomerEntry11.tbxEnterValue.text.trim() === "" &&
       this.view.textBoxOtherCustomerEntry12.tbxEnterValue.text.trim() === "" &&
       this.view.textBoxOtherCustomerEntry13CustomerDOB.value === "" &&
       this.view.textBoxOtherCustomerEntry22.tbxEnterValue.text.trim() === "" &&
       this.view.textBoxOtherCustomerEntry23.tbxEnterValue.text.trim() === ""){
	  return false;
    }else{
      return true;
    }
  },
  clearAllinfoOtherCustomerSearch : function(){
    this.view.textBoxOtherCustomerEntry11.tbxEnterValue.text = "";
    this.view.textBoxOtherCustomerEntry12.tbxEnterValue.text = "";
    this.view.textBoxOtherCustomerEntry13CustomerDOB.value = "";
    this.view.textBoxOtherCustomerEntry13CustomerDOB.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.textBoxOtherCustomerEntry22.tbxEnterValue.text = "";
    this.view.textBoxOtherCustomerEntry23.tbxEnterValue.text = "";
  },
  coreRelativeCustomersCallBack : function(data){
    this.lastSelected = -1;
    if(this.view.flxNoResultsFoundExisting.isVisible)
      this.view.flxNoResultsFoundExisting.setVisibility(false);
    /* to filter out corporate customer ID's in related customers list */
    var filteredData=data.filter(function(rec){
      if(rec.lastName.length>0)
        return rec;
    });
    if(filteredData.length>0)
      this.setUserListData(filteredData,this.view.segExistingUserListContainer);   
    else{
      this.coreRelativeCustomersErrorCallBack();
    }
    this.setExistingUserCount(filteredData.length,this.view.lblExistingUserRelatedCustomerCount);
    this.view.forceLayout();
  },
  customerSearchCallBack : function(data){
    //var navManager = applicationManager.getNavigationManager();
    var isEmailSearch = this.presenter.getEmailSearchFlag();
    var contactNumList;
    var EmailIdsList;
 
    if(isEmailSearch === false) {
      contactNumList = this.presenter.getPhoneNumListDetails();
      EmailIdsList = this.presenter.getEmailIdsListData();
    }
    var primaryContactNum;
    var primaryEmailId;
    this.lastSelected = -1;
    this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
    var formatted_data = [];
    for(var i=0;i<data.length;i++){
      var temp = {
        addressLine1: data[i].addressLine1 ? data[i].addressLine1 : "",
        addressLine2: data[i].addressLine2 ? data[i].addressLine2 : "",
        coreCustomerId: data[i].primaryCustomerId ? data[i].primaryCustomerId : "", 
        id : data[i].id ? data[i].id : "", 
        coreCustomerName: data[i].name ? data[i].name : "",
        dateOfBirth: data[i].DateOfBirth ? data[i].DateOfBirth : "",
        //email: data[i].PrimaryEmailAddress ? data[i].PrimaryEmailAddress : "",
        firstName: data[i].FirstName ? data[i].FirstName : "",
        isAssociated: data[i].isAssociated ? data[i].isAssociated : "false",
        isProfileExists: data[i].isProfileExist === "true" ? data[i].isProfileExist : "false",
        lastName: data[i].LastName ? data[i].LastName : "",
        //phone: data[i].PrimaryPhoneNumber ? data[i].PrimaryPhoneNumber : "",
	    phone: this.getPhoneNumberFormatted(data[i]),
        taxId: data[i].Ssn ? data[i].Ssn : "",
        zipCode: data[i].zipCode ? data[i].zipCode : "",
        
      };
      if(isEmailSearch === false) {
        contactNumList.map(function(phone) {
          if (!!phone.isPrimary && phone.isPrimary === "true") {
            var prefix = phone.phoneCountryCode? phone.phoneCountryCode:"";
            var number = phone.phoneNumber;
            primaryContactNum = prefix.concat("", number);
          }
        });
        EmailIdsList.map(function(email) {
          if (!!email.isPrimary && email.isPrimary === "true") {
            primaryEmailId = email.Value;
          }
        });
        temp.phone = primaryContactNum ? primaryContactNum : "";
        temp.email = primaryEmailId ? primaryEmailId : "";
      } else {
        	temp.phone = data[i].PrimaryPhoneNumber ? data[i].PrimaryPhoneNumber : "",
          	temp.email = data[i].PrimaryEmailAddress ? data[i].PrimaryEmailAddress : ""
      }
      formatted_data.push(temp);
    }
    
    if(this.view.flxNoResultsFoundExisting.isVisible)
      this.view.flxNoResultsFoundExisting.setVisibility(false);
    this.setUserListData(formatted_data,this.view.segOtherRelatedCustList);
    this.setOtherUserCount(data.length,this.view.lblOtherRelatedCustomerCount);
    this.view.forceLayout();
  },
  customerSearchErrorCallBack : function(){
	this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
  },
  coreRelativeCustomersErrorCallBack: function (data) {
      this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
      if (this.recentCustomerSearchTab === "other") {
          this.view.flxOtherUserInlineErrorContainer.setVisibility(false);
          this.view.flxSearchForOtherCustomer.setVisibility(false);
          this.view.segOtherRelatedCustList.setVisibility(false);
          this.view.searchOtherRelatedCustomer.setVisibility(false);
          this.view.lblOtherRelatedCustomerCount.setVisibility(false);
          this.view.flxOtherRelatedCustListHeader.setVisibility(false);
          this.view.flxOtherCustomerSearchResults.setVisibility(true);
          this.view.flxOtherCusotmerListContainer.setVisibility(true);
          this.view.flxNoResultsFoundExistingCust.setVisibility(true);
          //this.otherUserVisibiltyChanges(false);
          this.view.forceLayout();
      } else {
          this.existingUserVisibiltyChanges(false);
      }
  },
  setExistingUserCount : function(count,textBox){
    textBox.text = "Related Customers (" + count + ") - "+ this.view.contractCustomers.lblSelectedValue.text;
  },
  setOtherUserCount : function(count,textBox){
    textBox.text = this.countsentence + "-" + "(" + count + ")";
  },
  setUserListData : function(data,seg){
    var widgetDataMap = this.widgetMapRelatedCustList();
    var finalData = data.map(this.mappingRelatedCustList);
    seg.widgetDataMap = widgetDataMap;
    this.sortBy = this.getObjectSorter("lblExistingUserName.text");
    seg.setData(finalData);
    this.view.flxOtherCustomerSearchResults.setVisibility(true);
    seg.info = {
      records : []
    };
    seg.info.records= finalData;
    if(seg === this.view.segExistingUserListContainer){
      seg.onRowClick = this.existngUserRowClick;
      this.existingUserVisibiltyChanges(true);
    }else{
      seg.onRowClick = this.otherUserRowClick;
      this.otherUserVisibiltyChanges(true);
      this.view.lblOtherRelatedCustomerCount.setVisibility(true);
      this.view.searchOtherRelatedCustomer.setVisibility(true);
      this.view.flxOtherRelatedCustListHeader.setVisibility(true);
      this.view.segOtherRelatedCustList.setVisibility(true);
    }
  },
  existingUserVisibiltyChanges : function(condition){
    if(condition){
      this.view.flxSearchForExistingUser.setVisibility(false);
      this.view.flxExistingUserListContainer.setVisibility(true);
    }else{
      this.view.flxSearchForExistingUser.setVisibility(true);
      this.view.flxExistingUserListContainer.setVisibility(false);
    }
    this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
  },
  otherUserVisibiltyChanges : function(condition){
    if(condition){
      this.view.flxSearchForOtherCustomer.setVisibility(false);
      this.view.flxOtherCusotmerListContainer.setVisibility(true);
      this.view.flxNoResultsFoundExistingCust.setVisibility(false);
    }else{
      this.view.flxSearchForOtherCustomer.setVisibility(true);
      this.view.flxOtherCusotmerListContainer.setVisibility(false);
    }
    this.view.flxAddUseFromExistingCustomerLoading.setVisibility(false);
  },
  widgetMapRelatedCustList : function(){
  	var widgetDataMap = {
      "flxExistingUserListHeader" : "flxExistingUserListHeader",
      "lblCustomRadioBox" : "lblCustomRadioBox",
      "flxExistingUserHeaderListInner" : "flxExistingUserHeaderListInner",
      "flxExistingUserName" : "flxExistingUserName",
      "lblExistingUserName" : "lblExistingUserName",
      "flxExistingUserCustId" : "flxExistingUserCustId",
      "lblExistingUserCustId" : "lblExistingUserCustId",
      "flxExistingUserTaxId" : "flxExistingUserTaxId",
      "lblExistingUserTaxId" : "lblExistingUserTaxId",
      "flxExistingUserDOB" : "flxExistingUserDOB",
      "lblExistingUserDOB" : "lblExistingUserDOB",
      "flxExistingUserPhoneNumber" : "flxExistingUserPhoneNumber",
      "lblExistingUserPhoneNumber" : "lblExistingUserPhoneNumber",
      "flxExistingUserEmailId" : "flxExistingUserEmailId",
      "lblExistingUserEmailId" : "lblExistingUserEmailId",
      "lblReasonToDisable" : "lblReasonToDisable",
      "lblHeaderSeparator" : "lblHeaderSeparator",
      "imgRadioSelectionBox" : "imgRadioSelectionBox",
      "isSelected" : "isSelected"
    }
    return widgetDataMap;
  },
  mappingRelatedCustList : function(data){
    //set font icons for radio box and reason to disable 
    if(!data.taxId)
      data.taxId ="";
    if(!data.dateOfBirth)
      data.dateOfBirth ="";
    if(data.userId){
      data.id = data.userId;
    }
    var self = this;
    if(this.recentCustomerSearchTab === "other")
      var data = self.getCorrectAssociatedFlag(data);
    var rowData = self.setDisbledRowsData(data);
    return {
      "flxExistingUserListHeader" : {
         "enable" : rowData.block ? false : true
      },
      "lblCustomRadioBox" : "lblCustomRadioBox",
      "flxExistingUserHeaderListInner" : "flxExistingUserHeaderListInner",
      "flxExistingUserName" : "flxExistingUserName",
      "lblExistingUserName" : {
        "text" : data.firstName + " " + data.lastName,
        "skin" : rowData.block ? "sknLblLato485c7513pxOp60" : "sknLblLato485c7513px"
      },
      "flxExistingUserCustId" : "flxExistingUserCustId",
      "lblExistingUserCustId" : {
        "text" : data.coreCustomerId,
        "skin" : rowData.block ? "sknLblLato485c7513pxOp60" : "sknLblLato485c7513px"
      },
      "flxExistingUserTaxId" : "flxExistingUserTaxId",
      "lblExistingUserTaxId" : {
        "text" : data.taxId === ""? "NA" : data.taxId,
        "skin" : rowData.block ? "sknLblLato485c7513pxOp60" : "sknLblLato485c7513px"
      },
      "flxExistingUserDOB" : "flxExistingUserDOB",
      "lblExistingUserDOB" : {
        "text" : data.dateOfBirth === ""? "NA" : data.dateOfBirth,
        "skin" : rowData.block ? "sknLblLato485c7513pxOp60" : "sknLblLato485c7513px"
      },
      "flxExistingUserPhoneNumber" : "flxExistingUserPhoneNumber",
      "lblExistingUserPhoneNumber" : {
        "text" : data.phone ? data.phone : "N/A",
        "skin" : rowData.block ? "sknLblLato485c7513pxOp60" : "sknLblLato485c7513px"
      },
      "flxExistingUserEmailId" : "flxExistingUserEmailId",
      "lblExistingUserEmailId" : {
        "text" : data.email ? data.email : "N/A",
        "skin" : rowData.block ? "sknLblLato485c7513pxOp60" : "sknLblLato485c7513px"
      },
      "lblReasonToDisable" : {
        "text" : "",
        "tooltip" : rowData.reason,
        "isVisible" : rowData.visibilty,
        "skin" : "sknlbl485C7518px" // icomoon skin
      },
      "lblHeaderSeparator" : "lblHeaderSeparator",
      "imgRadioSelectionBox" : {
        "src" : rowData.src,
      	"enable" : rowData.block ? false : true
      }, 
      "isSelected" : "false",
      "isProfile" : data.isProfileExists,
      "orignalData" : data
    }
  },
  getCorrectAssociatedFlag : function(data){
    //var userList =this.presenter.getContractUser();
    var userList=this.completeCompanyDetails.signatoryUsers ;
    data.isAssociated = "false";
    for(var i=0;i<userList.length;i++){
      if((data.id && userList[i].customerId &&  data.id === userList[i].customerId) || (data.primaryCustomerId && userList[i].primaryCoreCustomerId && data.primaryCustomerId === userList[i].primaryCoreCustomerId)){
        data.isAssociated = "true";
      }
    }
    return data;
  },
  sortSegmentData : function(columnName,segPath,opt){
    var self=this;
    var segData = segPath.data;
    self.sortBy.column(columnName);
    if(opt===1){
      self.determineSortFontIcon(self.sortBy,"lblExistingUserName.text",self.view.lblFontOtherRelatedCustNameSort);
      self.determineSortFontIcon(self.sortBy,"lblExistingUserCustId.text",self.view.lblFontOtherRelatedCustCustIdSort);
      self.determineSortFontIcon(self.sortBy,"lblExistingUserTaxId.text",self.view.lblFontOtherRelatedCustTaxIdSort);
      self.determineSortFontIcon(self.sortBy,"lblExistingUserDOB.text",self.view.lblFontOtherRelatedCustDOBSort);
      self.determineSortFontIcon(self.sortBy,"lblExistingUserPhoneNumber.text",self.view.lblFontOtherRelatedCustPhoneNumberSort);
      self.determineSortFontIcon(self.sortBy,"lblExistingUserEmailId.text",self.view.lblFontOtherRelatedCustEmailIdSort);
    }
    if(opt===2){
    self.determineSortFontIcon(self.sortBy,"lblExistingUserName.text",self.view.lblFontExistingUserNameSort);
    self.determineSortFontIcon(self.sortBy,"lblExistingUserCustId.text",self.view.lblFontExistingUserCustIdSort);
    self.determineSortFontIcon(self.sortBy,"lblExistingUserTaxId.text",self.view.lblFontExistingUserTaxIdSort);
    self.determineSortFontIcon(self.sortBy,"lblExistingUserDOB.text",self.view.lblFontExistingUserDOBSort);
    self.determineSortFontIcon(self.sortBy,"lblExistingUserPhoneNumber.text",self.view.lblFontExistingUserPhoneNumberSort);
    self.determineSortFontIcon(self.sortBy,"lblExistingUserEmailId.text",self.view.lblFontExistingUserEmailIdSort);
    }
    segPath.setData(segData.sort(self.sortBy.sortData));
  },
  setDisbledRowsData : function(data){
    var src = "radio_notselected.png",block = false ,reason = "",visibilty = false;
     if (data.phone === "" || data.email === "") {
       src = "radio_notselected.png";
       block = true;
       reason = "Please enter a Phone number and\nEmail ID before adding " + data.firstName + " " + data.lastName + "\nto the contract";
       visibilty = true;
     }else if(data.isAssociated === "true"){
       src = "radio_disabled.png";
       block = true;
       reason = data.firstName + " " + data.lastName + " is already added to\nthis contract.To edit his details please\nopen his profile";
       visibilty = true;
     }
    return {
      "src" : src,
      "block" : block,
      "reason" : reason,
      "visibilty" : visibilty
    }
  },
  existngUserRowClick : function(){
    this.recentCustomerSearchTab = "Existing";
    this.userRowClick(this.view.segExistingUserListContainer);
  },
  otherUserRowClick : function(){
    this.recentCustomerSearchTab = "other";
    this.userRowClick(this.view.segOtherRelatedCustList);
  },
  userRowClick : function(seg){
    var scope = this;    
    var SelectedData = seg.data;
    var rowIndex = seg.selectedRowIndex[1];
    if(rowIndex === scope.lastSelected){
      
      // changin selection only for prev selected row
      if(SelectedData[rowIndex].imgRadioSelectionBox.src === "radio_selected.png"){
        SelectedData[rowIndex].imgRadioSelectionBox.src = "radio_notselected.png";
        SelectedData[rowIndex].isSelected = "false";
      }
      else if(SelectedData[rowIndex].imgRadioSelectionBox.src === "radio_notselected.png"){
        SelectedData[rowIndex].imgRadioSelectionBox.src = "radio_selected.png";
        SelectedData[rowIndex].isSelected = "true";
      }
      seg.setDataAt(SelectedData[rowIndex],rowIndex);
    }else{
	  // changin selection for differently selected row 
      
      if(scope.lastSelected != -1){
        SelectedData[scope.lastSelected].imgRadioSelectionBox.src = "radio_notselected.png";
        SelectedData[scope.lastSelected].isSelected = "false";

        seg.setDataAt(SelectedData[scope.lastSelected],scope.lastSelected);
      }
      SelectedData[rowIndex].imgRadioSelectionBox.src = "radio_selected.png";
      SelectedData[rowIndex].isSelected = "true";
      
      seg.setDataAt(SelectedData[rowIndex],rowIndex);
    }
    this.lastSelected = rowIndex
    this.EnableDisbleAddButton(seg);
  },
  EnableDisbleAddButton : function(seg){
    this.view.addExistingcommonButtons.btnSave.skin = "sknBtn7B7B7BRad20px";
    this.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn7B7B7BRad20px";
    this.view.addExistingcommonButtons.btnSave.setEnabled(false);
    var segData = seg.data;
    for(var i =0;i<segData.length;i++){
      if(segData[i].isSelected === "true"){
        this.view.addExistingcommonButtons.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
        this.view.addExistingcommonButtons.btnSave.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px"
        this.view.addExistingcommonButtons.btnSave.setEnabled(true);
        break;
      }}	
  },
  existingUserAddOnClick : function(){
    var scope = this;var segData;
    this.view.flxAddUserFromExistingCustomerContainer.setVisibility(false);
    if(this.recentCustomerSearchTab === "Existing"){
      segData = this.view.segExistingUserListContainer.data;
    }else if(this.recentCustomerSearchTab === "other"){
      segData = this.view.segOtherRelatedCustList.data;
    }
    scope.aboutToAddUser.data = [];
    for(var i =0;i<segData.length;i++){
      if(segData[i].isSelected === "true"){
        scope.aboutToAddUser.data.push(segData[i]);
    }}
    this.aboutToAddUser.type = "enrolledUser";
    this.view.flxSearchInner.setVisibility(false);
    this.view.flxUserAdded.setVisibility(true);
    if(scope.aboutToAddUser.data[0].isProfile === "true")
      this.userDeatilsScenerios("1");
    else
      this.userDeatilsScenerios("2");
  },
  visbiltyChangesForAddUserButton : function(){
    this.recentContractDetails.contractName = this.view.lblCompanyDetailName.text;
    this.recentContractDetails.contractId = this.view.lblDetailsValue11.text;
    this.fetchAutoSyncAccountsFlag();
    this.getContractCustomersData();
//    this.view.flxSearchCompanies.setVisibility(false);
    this.view.flxCompanyDetails.setVisibility(false);
    this.view.flxAddUser.setVisibility(true);
    this.view.flxSearchUser.setVisibility(true);
    this.view.flxEditAddedUserDetails.setVisibility(false);
    this.view.flxSearchInner.setVisibility(true);
    this.view.flxUserAdded.setVisibility(false);
    this.view.flxBottomButtonContianer.setVisibility(true);
    this.view.btnAddUser.skin = "sknBtn7B7B7BRad20px";
    this.view.btnAddUser.setEnabled(false);
    var conractname = this.view.lblCompanyDetailName.text
    this.prevBreadCrumb.Action = this.view.breadcrumbs.btnBackToMain.onClick;
    this.prevBreadCrumb.text = this.view.breadcrumbs.btnBackToMain.text;
    this.prevBreadCrumb.enterif = true;
    this.view.breadcrumbs.btnBackToMain.text = conractname.toUpperCase();
    this.view.breadcrumbs.btnBackToMain.onClick = this.view.btnSearchUserCancel.onClick;
    this.view.breadcrumbs.lblCurrentScreen.text = "ADD USER";

  },
  collectAddNewUserInfo : function(){
    var payload = {
    	"firstName" : this.view.textBoxAddOtherUserEntry11.tbxEnterValue.text,
    	"middleName" : this.view.textBoxAddOtherUserEntry12.tbxEnterValue.text,
    	"lastName" : this.view.textBoxAddOtherUserEntry13.tbxEnterValue.text,
    	"email" : this.view.textBoxAddOtherUserEntry21.tbxEnterValue.text,
    	"phone" : this.view.textBoxAddOtherUserEntry22.txtContactNumber.text,
		"isdCode" : this.view.textBoxAddOtherUserEntry22.txtISDCode.text,
    	"dateOfBirth" : this.view.calAddOtherUserEntry23DOB.value,
    	"taxId" : this.view.textBoxAddOtherUserEntry31.tbxEnterValue.text
    };
    return payload;
  },
  validateNewUserInfo : function(){
    var self = this;
    var isValid = true;
    
    //first name
    if(this.view.textBoxAddOtherUserEntry11.tbxEnterValue.text.trim() === ""){
      self.view.textBoxAddOtherUserEntry11.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxAddOtherUserEntry11.flxInlineError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry11.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.FirstNameMissing");
      isValid = false;   
    }
    //last name 
    if(this.view.textBoxAddOtherUserEntry13.tbxEnterValue.text.trim() === ""){
      self.view.textBoxAddOtherUserEntry13.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxAddOtherUserEntry13.flxInlineError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry13.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.LastNameMissing");
      isValid = false;      
    }
    //email-id
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.view.textBoxAddOtherUserEntry21.tbxEnterValue.text.trim() === ""){
      self.view.textBoxAddOtherUserEntry21.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxAddOtherUserEntry21.flxInlineError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailId_cannot_be_empty");
      isValid = false;      
    }else if (emailRegex.test(self.view.textBoxAddOtherUserEntry21.tbxEnterValue.text.trim()) === false) {
      self.view.textBoxAddOtherUserEntry21.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxAddOtherUserEntry21.flxInlineError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailID_not_valid");
      isValid = false;
    }
    //ISD code
    var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
    if (!self.view.textBoxAddOtherUserEntry22.txtISDCode.text ||
        !self.view.textBoxAddOtherUserEntry22.txtISDCode.text.trim() ||
        (self.view.textBoxAddOtherUserEntry22.txtISDCode.text === "+")) {
      self.view.textBoxAddOtherUserEntry22.txtISDCode.skin = "skinredbg";
      self.view.textBoxAddOtherUserEntry22.flxError.left = "0dp";
      self.view.textBoxAddOtherUserEntry22.flxError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    } else if (self.view.textBoxAddOtherUserEntry22.txtISDCode.text.trim().length > 4) {
      self.view.textBoxAddOtherUserEntry22.txtISDCode.skin = "skinredbg";
      self.view.textBoxAddOtherUserEntry22.flxError.left = "0dp";
      self.view.textBoxAddOtherUserEntry22.flxError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    } else if (ISDRegex.test(self.view.textBoxAddOtherUserEntry22.txtISDCode.text) === false) {
      self.view.textBoxAddOtherUserEntry22.txtISDCode.skin = "skinredbg";
      self.view.textBoxAddOtherUserEntry22.flxError.left = "0dp";
      self.view.textBoxAddOtherUserEntry22.flxError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    }
	
    //contact num
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!self.view.textBoxAddOtherUserEntry22.txtContactNumber.text || !self.view.textBoxAddOtherUserEntry22.txtContactNumber.text.trim()) {
      self.view.textBoxAddOtherUserEntry22.txtContactNumber.skin = "skinredbg";
      self.view.textBoxAddOtherUserEntry22.flxError.left = "80dp";
      self.view.textBoxAddOtherUserEntry22.flxError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_be_empty");
      isValid = false;
    } else if (self.view.textBoxAddOtherUserEntry22.txtContactNumber.text.trim().length > 15) {
      self.view.textBoxAddOtherUserEntry22.txtContactNumber.skin = "skinredbg";
      self.view.textBoxAddOtherUserEntry22.flxError.left = "80dp";
      self.view.textBoxAddOtherUserEntry22.flxError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_exceed");
      isValid = false;
    } else if (phoneRegex.test(self.view.textBoxAddOtherUserEntry22.txtContactNumber.text) === false) {
      self.view.textBoxAddOtherUserEntry22.txtContactNumber.skin = "skinredbg";
      self.view.textBoxAddOtherUserEntry22.flxError.left = "80dp";
      self.view.textBoxAddOtherUserEntry22.flxError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
      isValid = false;
    }
    
    //DOB
    if (this.view.calAddOtherUserEntry23DOB.value.trim() === "") {
      self.view.textBoxAddOtherUserEntry23Cal.skin = "sknFlxCalendarError";
      self.view.textBoxAddOtherUserEntry23.flxEnterValue.setVisibility(true);
      self.view.textBoxAddOtherUserEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.DOB_cannot_be_empty");
      isValid = false;
    }
    //SSN
    if (self.view.textBoxAddOtherUserEntry31.tbxEnterValue.text.trim() === "") {
      self.view.textBoxAddOtherUserEntry31.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxAddOtherUserEntry31.flxInlineError.setVisibility(true);
      self.view.textBoxAddOtherUserEntry31.lblErrorText.text = "Tax ID can not be empty";
      isValid = false;
    }
    return isValid;
  },
  clearValidationOnNewUser : function(widgetKeyUpOn,flex, error){
    flex.skin = "sknflxEnterValueNormal";
    error.setVisibility(false);
  },
  clearValidationOnNewUserContactInfo : function(widgetKeyUpOn,flex, error){
    flex.skin = "skntbxLato35475f14px";
    error.setVisibility(false);
  },
  addUserNextFunction : function(cond){
    if(cond===2){
    if(this.validateNewUserInfo()){
      this.view.flxAddOtherUserContainer.setVisibility(false);
      this.view.flxSearchInner.setVisibility(false);
      this.view.flxUserAdded.setVisibility(true);
      this.userDeatilsScenerios("3",2);
    }
    }
    else{
      this.view.flxAddOtherUserContainer.setVisibility(false);
      this.view.flxSearchInner.setVisibility(false);
      this.view.flxUserAdded.setVisibility(true);
      this.userDeatilsScenerios("3",1);
    }
  },
  showAddExistingUserContainer : function(){
    this.view.textBoxAddOtherUserContactEntry1.tbxEnterValue.text = "";
    this.view.textBoxAddOtherUserContactEntry2.txtISDCode.text = "";
    this.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text = "";
    this.view.textBoxAddOtherUserContactEntry3.tbxEnterValue.text = "";
  },
  showAddOtherUserContainer : function(){
    this.view.flxAddOtherUserContainer.setVisibility(true);
    this.view.lblAddOtherUserPopUpSubHeader.text = "Please enter the User details to be associated to the contract"+" \""+
      												this.recentContractDetails.contractName+"\"";
    this.view.textBoxAddOtherUserEntry11.tbxEnterValue.text = "";
    this.view.textBoxAddOtherUserEntry12.tbxEnterValue.text = "";
    this.view.textBoxAddOtherUserEntry13.tbxEnterValue.text = "";
    this.view.textBoxAddOtherUserEntry21.tbxEnterValue.text = "";
    this.view.textBoxAddOtherUserEntry22.txtISDCode.text = "";
    this.view.textBoxAddOtherUserEntry22.txtContactNumber.text = "";
    this.view.calAddOtherUserEntry23DOB.value = "";
    this.view.textBoxAddOtherUserEntry31.tbxEnterValue.text = "";
  },
  userDeatilsScenerios : function(scenrio,cond){
    var self = this;
    // user with profile 
    if(scenrio === "1"){
      this.view.lblAddUserUserName.setVisibility(true);
      this.view.lblAddUserUserName.text = this.aboutToAddUser.data[0].lblExistingUserName.text;
      this.view.flxUserProfileFlag.setVisibility(true);
      this.view.flxAddedUserCustomerId.setVisibility(true);
      this.view.lblAddedUserPrimaryFlag.setVisibility(false);
      this.view.lblAddedUserCustomerIdValue.text = this.aboutToAddUser.data[0].lblExistingUserCustId.text;
      this.view.flxAddeDUserProfileDetails.setVisibility(true);
      this.view.lblAddedUserProfileDetails.text = "PROFILE DETAILS";
      this.view.lblAddedUserViewProfile.text = "View Profile";
      this.view.lblAddedUserViewProfile.onTouchStart = function(){
        var param = {
          "Customer_id": self.aboutToAddUser.data[0].lblExistingUserCustId.text
        };
        kony.adminConsole.utils.showProgressBar(self.view);
        self.presenter.navigateToCustomerPersonal(param,{"name":"frmCompanies"});
      }
      this.view.lblAddedUserAssociateMessage.text = "Associate "+ this.aboutToAddUser.data[0].lblExistingUserName.text+
        " to the below Customer ID’s of the Contract "+ 
        "\"" +this.recentContractDetails.contractName+ "\"";
      this.view.flxAddedUserList.height =  this.view.flxSearchInner.frame.height -(160 + 20 + 50 + 25 +40) + "dp";
    }
    // user without profile 
    else if(scenrio === "2"){
      this.view.lblAddUserUserName.setVisibility(true);
      this.view.lblAddUserUserName.text = this.aboutToAddUser.data[0].lblExistingUserName.text;
      this.view.flxUserProfileFlag.setVisibility(false);
      this.view.flxAddedUserCustomerId.setVisibility(true);
      this.view.lblAddedUserPrimaryFlag.setVisibility(false);
      this.view.lblAddedUserCustomerIdValue.text = this.aboutToAddUser.data[0].lblExistingUserCustId.text;
      this.view.flxAddeDUserProfileDetails.setVisibility(false);
      this.view.lblAddedUserProfileDetails.text = "PROFILE DETAILS";
      this.view.lblAddedUserViewProfile.text = "View Profile";
      this.view.lblAddedUserViewProfile.onTouchStart = function(){
        var param = {
          "Customer_id": self.aboutToAddUser.data[0].lblExistingUserCustId.text,
          "legalEntityId": self.completeContractDetails.legalEntityId
        };
        kony.adminConsole.utils.showProgressBar(self.view);
        self.presenter.navigateToCustomerPersonal(param,{"name":"frmCompanies"});
      }
      this.view.lblAddedUserAssociateMessage.text = "Associate "+ this.aboutToAddUser.data[0].lblExistingUserName.text+
        											" to the below Customer ID’s of the Contract "+ 
        											"\"" +this.recentContractDetails.contractName+ "\"";
      this.view.flxAddedUserList.height =  this.view.flxSearchInner.frame.height -(160 + 20 + 25 + 50) + "dp";
    }
    // newly added user 
    else if(scenrio === "3",cond){     
      if(cond===1){
        this.view.flxUserProfileFlag.setVisibility(true);
        var data = this.view.segOtherRelatedCustListByUserId.data;
        this.view.lblAddUserUserName.text = this.view.segOtherRelatedCustListByUserId.data[0].name;
        this.view.flxAddeDUserProfileDetails.setVisibility(true);
        this.view.lblAddedUserProfileDetails.text = "PROFILE DETAILS";
        this.view.lblAddedUserViewProfile.text = "View Profile";
        this.view.flxAddedUserCustomerId.setVisibility(true);
        this.view.lblAddedUserCustomerIdValue.text = this.view.segOtherRelatedCustListByUserId.data[0].primaryCustomerId;
        this.view.lblAddedUserPrimaryFlag.setVisibility(false);
        this.view.lblAddedUserAssociateMessage.text = "Associate "+ this.view.segOtherRelatedCustListByUserId.data[0].name+
        											" to the below Customer ID’s of the Contract "+ 
        											"\"" +this.recentContractDetails.contractName+ "\"";
         this.view.lblAddedUserViewProfile.onTouchStart = function(){
        var param = {
          "Customer_id": self.view.segOtherRelatedCustListByUserId.data[0].primaryCustomerId,
          "legalEntityId": self.completeContractDetails.legalEntityId
        };
        kony.adminConsole.utils.showProgressBar(self.view);
        self.presenter.navigateToCustomerPersonal(param,{"name":"frmCompanies"});
      }
      }
       else{
        this.view.flxUserProfileFlag.setVisibility(false);
        this.view.lblAddUserUserName.setVisibility(false);
        this.view.flxAddedUserCustomerId.setVisibility(false);
        this.view.lblAddedUserProfileDetails.text = "USER DETAILS";
        this.view.lblAddedUserViewProfile.text = "Edit";
        this.view.lblAddedUserAssociateMessage.text = "Associate "+ this.view.textBoxAddOtherUserEntry11.tbxEnterValue.text+
        											" to the below Customer ID’s of the Contract "+ 
        											"\"" +this.recentContractDetails.contractName+ "\"";
        this.view.lblAddedUserViewProfile.onTouchStart = function(){
        self.view.flxAddOtherUserContainer.setVisibility(true);
      }}
      this.view.flxAddedUserList.height =  this.view.flxSearchInner.frame.height -(160 + 20 + 25 + 50) + "dp";
      this.aboutToAddUser.data = [];
      this.aboutToAddUser.data[0] = this.collectAddNewUserInfo();
      this.aboutToAddUser.type = "newUser";
    }
    this.changeLayoutForCustSeg("hideBtn");
    this.addCustomerListOnUserPage(this.recentContractDetails.customers);
    this.view.btnAddUser.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.btnAddUser.setEnabled(true);
  },
  addCustomerListOnUserPage : function(data){
    var orignalData = data;
    var widgetDataMap = {
	  "flxEnrollCustomerList" : "flxEnrollCustomerList",
      "lblCustomerName":"lblCustomerName",
      "lblCustomerId":"lblCustomerId",
      "flxPrimary":"flxPrimary",
      "lblPrimary":"lblPrimary",
      "lstBoxService":"lstBoxService",
      "lstBoxRole":"lstBoxRole",
      "flxRoleError":"flxRoleError",
      "lblIconRoleError":"lblIconRoleError",
      "lblRoleErrorMsg":"lblRoleErrorMsg",
      "lblSeperator":"lblSeperator",
      "flxOptions":"flxOptions" ,
      "lblOptions":"lblOptions"
    };
    var finalData = orignalData.map(this.mapCustomerListAddUserPage)
    this.view.segEnrollCustList.widgetDataMap = widgetDataMap;
    this.view.segEnrollCustList.setData(finalData);
  },
  mapCustomerListAddUserPage : function(data){
    this.view.addExistingcommonButtons.btnSave.data=data.coreCustomerId;
    var rolesData = this.getRoleListBoxMappedData()
    var self = this;
    this.prevRole[data.coreCustomerId]={"key":"SELECT"};
    return {
      "lblCustomerName":data.coreCustomerName,
      "lblCustomerId":data.coreCustomerId,
      "flxPrimary":{
        "isVisible" : data.isPrimary ==="true" ? true : false
      },
      "lblPrimary":{
        "isVisible" : data.isPrimary === "true" ? true : false
      },
      "lstBoxService":{ 
        "skin":"sknLbxborderd7d9e03pxradius",//blocked skin
        "masterData":[[this.recentContractDetails.contractServiceDefId, this.recentContractDetails.contractServiceDef]],
        "selectedKey": this.recentContractDetails.contractServiceDefId,
        "enable": false,
        "toolTip" : this.recentContractDetails.contractServiceDef
      },
      "lstBoxRole":{"onSelection":self.collectEditDataForSingleCompany,
                    "skin":"sknLbxborderd7d9e03pxradius",
                    "masterData":rolesData,
                    "selectedKey": data.selectedKey? data.selectedKey : "select",
                    "enable": true},
      "flxRoleError":{"isVisible":false},
      "lblIconRoleError":"\ue94c",
      "lblRoleErrorMsg":kony.i18n.getLocalizedString("i18n.frmCompanies.Please_select_a_role"),
      "lblSeperator":"-",
      "flxOptions":{
        "isVisible":true,
        "skin":"sknFlxBorffffff1pxRound",
        "hoverSkin":"sknflxffffffop100Border424242Radius100px",
        "onClick":self.toggleContextualMenu
      },
      "lblOptions":"\ue91f",
      "orignalData" : data
    }
  },
  toggleContextualMenu:function(eventObj,context){
    var rowIndex = context.rowIndex;
    this.enrollSegRowInd = context.rowIndex;
    if (this.view.flxContextualMenu.isVisible===true){
      this.view.flxContextualMenu.setVisibility(false);
    }
    else{
      this.view.flxContextualMenu.setVisibility(true);
    } 
    this.view.forceLayout();
    var heightVal= 0;
    var templateArray = this.view.segEnrollCustList.clonedTemplates;
    for (var i = 0; i < rowIndex; i++) {
      heightVal = heightVal + templateArray[i].flxEnrollCustomerList.frame.height;
    }
    var scrollWidget = this.view.flxAddedUserList;
    var contextualWidget = this.view.flxContextualMenu;
    heightVal = heightVal + 106 - scrollWidget.contentOffsetMeasured.y;
    if ((heightVal + contextualWidget.frame.height) > (scrollWidget.frame.height+60)){
      this.view.flxContextualMenu.top=((heightVal-this.view.flxContextualMenu.frame.height)-25)+"px";
      this.view.flxAddedUserUpArrowImage.setVisibility(false);
      this.view.flxDownArrowImage.setVisibility(true);
      this.view.flxContextualMenuOptions.top = "0px";    
    }else{
      this.view.flxContextualMenu.top=(heightVal)+"px";
      this.view.flxAddedUserUpArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxContextualMenuOptions.top = "-1px";
    }
  },
  getRoleListBoxMappedData : function(){
    var self =this;
    var roleList = [];
    roleList = this.recentContractDetails.roles.reduce(
      function (list, record) {
        //return list.concat([[record.id, record.name]]);
        if(record.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE)
          return list.concat([[record.id, record.name]]);
        else
          return list;
        //return list.concat([[record.id, record.name]]);
      }, [["select", kony.i18n.getLocalizedString("i18n.frmCompanies.Select_a_role")]]);
    return roleList;
  },
  onHoverEventCallback:function(widget, context) {
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
  },
  removeRowFromCustSeg : function(){
    var rowIndex = this.view.segEnrollCustList.selectedRowIndex[1];
    var rowData = this.view.segEnrollCustList.data[rowIndex];
    this.presenter.deleteAccountsFeaturesForAddUser(rowData.orignalData.coreCustomerId)
    this.view.segEnrollCustList.removeAt(rowIndex);
    this.view.flxContextualMenu.setVisibility(false);
    this.changeLayoutForCustSeg("showBtn");
  },
  changeLayoutForCustSeg : function(context){
    if(context === "showBtn"){
            this.view.flxAddedUserList.height = this.view.flxUserAdded.frame.height -(160 + 20 + 25 + 50 + 30) + "dp";
      this.view.btnAddCustomerId.top = parseInt(this.view.flxAddedUserList.height) + 55 + "dp";
      this.view.btnAddCustomerId.setVisibility(true);
    }else if("hideBtn"){
      this.view.btnAddCustomerId.setVisibility(false);
    }
  },
  addCustomerID : function(){
    var data = this.recentContractDetails.customers;
    this.view.flxAddCustomerContainer.setVisibility(true);
	this.view.lblCustomerUserPopUpSubHeader.texzt = "Select Customer ID to be associated to "+this.view.lblAddUserUserName.text;
    var widgetDataMap = {
      "flxsegCustomersList" : "flxsegCustomersList",
      "flxCheckBox" : "flxCheckBox",
      "imgCheckBox" : "imgCheckBox",
      "lblCustomerId" : "lblCustomerId",
      "lblCustomerName" : "lblCustomerName"
    };
    var finalData = data.map(this.mapAddCustomerdata);
    this.view.segAddCust.widgetDataMap = widgetDataMap;
    this.view.segAddCust.setData(finalData);
    
  },
  mapAddCustomerdata : function(data){
    var self = this;
    var selectedData = self.getSelected(data)
    return {
      "flxsegCustomersList" : "flxsegCustomersList",
      "flxCheckBox" : {
        "onClick" : self.toggleCustomerSelection
      },
      "imgCheckBox" : selectedData.src,
      "lblCustomerId" : data.coreCustomerId,
      "lblCustomerName" : data.coreCustomerName,
      "isSelected" : selectedData.selected,
      "selectedRole" : selectedData.selectedRole
    };
  },
  getSelected : function(data){
    var src = "checkboxnormal.png", selectedRole;
    var segData = this.view.segEnrollCustList.data;
    for(var i= 0;i<segData.length;i++){
      if(data.coreCustomerId === segData[i].lblCustomerId){
        src =  "checkboxselected.png";
        selectedRole = segData[i].lstBoxRole.selectedKey;
      }
    }
    return {
      "src" : src,
      "selectedRole" : selectedRole,
      "selected" : true
    };
  },
  checkForPartialSelection : function(){
    var isPartial = false;
    var segData = this.view.segAddCust.data;
    for(var i=0;i<segData.length;i++){
      if(segData[i].isSelected === false){
        isPartial = true
        break
      }
    }
    return isPartial;
  },
  toggleCustomerSelection : function(eventObj,context){
    var rowIndex = context.rowIndex;
   	var rawData = this.view.segAddCust.data[rowIndex];
    if(rawData.imgCheckBox === "checkboxselected.png"){
      rawData.imgCheckBox = "checkboxnormal.png";
      rawData.isSelected = false;
    }else if(rawData.imgCheckBox === "checkboxnormal.png"){
      rawData.imgCheckBox = "checkboxselected.png";
      rawData.isSelected = true;
    }
    this.view.segAddCust.setDataAt(rawData, rowIndex);
    
    if(this.checkForPartialSelection()){
      this.view.imgAddCustHeaderCheckBox.src = "checkboxpartial.png"
    }else{
      this.view.imgAddCustHeaderCheckBox.src = "checkboxselected.png"
    }
  },
  addModifiedCustomerList : function(){
    var segData = this.view.segAddCust.data;
    var refData = []
    
    // get selected data
    for(var index = 0;index<segData.length;index++){
      if(segData[index].isSelected)
        refData.push(segData[index]);
    }
    
    //matching selected data ids with orignal list
    var ModifiedList = [];
    var orignalData = this.recentContractDetails.customers;
    for(var i=0;i<refData.length ; i++){
      for(var j=0;j<orignalData.length ;j++){
        if(refData[i].lblCustomerId === orignalData[j].coreCustomerId){
          if(refData[i].selectedRole){
            orignalData[j].selectedKey = refData[i].selectedRole
          }
          ModifiedList.push(orignalData[j]);
        }else{
          orignalData[j].selectedKey = "select";
        }}}
    this.addCustomerListOnUserPage(ModifiedList);
    this.view.flxAddCustomerContainer.setVisibility(false);
  },
  hideAddCustomerID : function(){
    this.view.flxAddCustomerContainer.setVisibility(false);
  },
  currCustomer : {},
  createAddUSerPayload: function() {
    var callCreate = true;
    var self = this;
    if (this.validateCreateinfinityUserInfo()) {
        var addUserPayload = {
            "userDetails": "",
            "companyList": "",
            "accountLevelPermissions": "",
            "globalLevelPermissions": "",
            "transactionLimits": "",
            "signatoryGroups": []
        }
        var user_details = this.getUserDetials();
        if (user_details.isProfile === true) {
            callCreate = false;
            delete user_details.isProfile;
        }
        var company_details = this.getCompanyList();
        var features = this.getAddUserFeaturesList();
        var limits = this.getAddUserLimitsList();
        for (var i = 0; i < company_details.length; i++) {
            for (var j = 0; j < features.accountLevelPermissions.length; j++) {
                if (features.accountLevelPermissions[j].cif === company_details[i].cif) {
                    var featureAcc = features.accountLevelPermissions[j].accounts;
                    var companylistacc = company_details[i].accounts;
                    var excludedAccounts = [];
                    var includedAccounts = [];
                    // mark false values
                    for (var x = 0; x < companylistacc.length; x++) {
                        for (var y = 0; y < featureAcc.length; y++) {
                            if (companylistacc[x].accountId === featureAcc[y].accountId) {
                                companylistacc[x].isEnabled = "true";
                            }
                        }
                        if (companylistacc[x].isEnabled === "true") {
                            includedAccounts.push(companylistacc[x]);
                        } else {
                            excludedAccounts.push(companylistacc[x]);
                        }
                    }
                    company_details[i].accounts = includedAccounts;
                    company_details[i].excludedAccounts = excludedAccounts;
                }
            }
        }
        addUserPayload.userDetails = JSON.stringify(user_details);
        addUserPayload.companyList = JSON.stringify(company_details);
        addUserPayload.accountLevelPermissions = JSON.stringify(features.accountLevelPermissions);
        addUserPayload.globalLevelPermissions = JSON.stringify(features.globalLevelPermissions);
        addUserPayload.transactionLimits = JSON.stringify(limits);
        var signGroups = this.getEnrollCustSignGroups();
        addUserPayload.signatoryGroups = JSON.stringify(signGroups);
        if (this.view.addExistingcommonButtons.btnSave.condition === 2) {
            if (this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.LEId === false) { //notshowing edit
                addUserPayload.userDetails = JSON.parse(addUserPayload.userDetails);
                var data = self.view.segOtherRelatedCustListByUserId.data[0];
                addUserPayload.userDetails.email = data.ediPayloadRecord.PrimaryEmailAddress;
                addUserPayload.userDetails.firstName = data.ediPayloadRecord.FirstName;
                addUserPayload.userDetails.lastName = data.ediPayloadRecord.LastName;
                var phnNum = data.ediPayloadRecord.PrimaryPhoneNumber.split("-");
                data.ediPayloadRecord.phoneCountryCode = phnNum[0];
                data.ediPayloadRecord.phoneNumber = phnNum[1];
                addUserPayload.userDetails.phoneCountryCode = data.ediPayloadRecord.phoneCountryCode
                addUserPayload.userDetails.phoneNumber = data.ediPayloadRecord.phoneNumber
                addUserPayload.userDetails.dob = data.ediPayloadRecord.DateOfBirth;
                // addUserPayload.userDetails.coreCustomerId = this.view.addExistingcommonButtons.btnSave.data;
                addUserPayload.userDetails.id = data.ediPayloadRecord.Customer_id;


            } else if (this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.LEId === true) {
                addUserPayload.userDetails = JSON.parse(addUserPayload.userDetails);
                var data = self.view.segOtherRelatedCustListByUserId.data[0];
                addUserPayload.userDetails.email = this.view.textBoxAddOtherUserContactEntry1.tbxEnterValue.text;
                addUserPayload.userDetails.firstName = data.ediPayloadRecord.FirstName;
                addUserPayload.userDetails.lastName = data.ediPayloadRecord.LastName;
                addUserPayload.userDetails.ssn = this.view.textBoxAddOtherUserContactEntry3.tbxEnterValue.text;
                addUserPayload.userDetails.phoneNumber = this.view.textBoxAddOtherUserContactEntry2.txtContactNumber.text
                addUserPayload.userDetails.phoneCountryCode = this.view.textBoxAddOtherUserContactEntry2.txtISDCode.text
                addUserPayload.userDetails.dob = data.ediPayloadRecord.DateOfBirth;
                addUserPayload.userDetails.coreCustomerId = "";
                addUserPayload.userDetails.id = data.ediPayloadRecord.Customer_id;
            }
            if (this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.coreCustId === true) {
                addUserPayload.userDetails.coreCustomerId = "";
                addUserPayload.userDetails = JSON.stringify(addUserPayload.userDetails);
                this.presenter.editInfinityUser(addUserPayload);
            } else if (this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.coreCustId === false) {
                delete addUserPayload.userDetails.coreCustomerId;
                addUserPayload.userDetails = JSON.stringify(addUserPayload.userDetails);
                this.presenter.editInfinityUser(addUserPayload);
			  }
        } else if (this.view.addExistingcommonButtons.btnSave.condition === 1) {
            if (callCreate)
                this.presenter.createInfinityUser(addUserPayload);
            else {
                var coreCustId, segData, id;
                segData = this.view.segOtherRelatedCustList.info.records;
                for (var t = 0; t < segData.length; t++)
                    if ("true" === segData[t].isSelected) {
                        id = segData[t].orignalData.id;
                    }
                addUserPayload.userDetails = JSON.parse(addUserPayload.userDetails);
                addUserPayload.userDetails.id = id;
                addUserPayload.userDetails = JSON.stringify(addUserPayload.userDetails);
                this.presenter.editInfinityUser(addUserPayload);
            }
        }
    }
},
  validateCreateinfinityUserInfo : function(){
    var isValid = true;
    var data = this.view.segEnrollCustList.data;
    for(var i =0 ;i<data.length;i++){
      if(data[i].lstBoxRole.selectedKey === "select"){
        isValid = false;
        data[i].lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
        data[i].flxRoleError.isVisible = true;  
      }
      this.view.segEnrollCustList.setDataAt(data[i],i);
    }
    return isValid;
  },
  createInfinityUserCallBack : function(){
    this.view.flxCompanyDetails.setVisibility(true);
    this.view.flxAddUser.setVisibility(false);
    this.view.flxSearchUser.setVisibility(true);
    this.view.flxSearchInner.setVisibility(true);
    this.view.flxUserAdded.setVisibility(false);
    this.view.flxEditAddedUserDetails.setVisibility(false);
    this.showSignatories();
  },
  /* 
  * format signatory groups list for enroll payload
  * @param:
  * formatted signatory list array
  */
  getEnrollCustSignGroups : function(){
    var signatoryGroupObj=[];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForAddUser();
    var enrollSegData = this.view.segEnrollCustList.data;
    for(var i=0; i<enrollSegData.length; i++){
      var groupList = enrollCustAccountsFeatures[enrollSegData[i].orignalData.coreCustomerId].signatoryGroups;
      var limitsObj = {"cif": enrollSegData[i].orignalData.coreCustomerId,
                       "legalEntityId" : this.completeContractDetails.legalEntityId,
                       "groups": [],
                       "contractId": enrollSegData[i].orignalData.contractId === "" ? "" : enrollSegData[i].orignalData.contractId,
                      };
      
      //form signatory groups object 
      var isValidApproval=this.hasValidateApprovalPermission(limitsObj.cif);
      if(isValidApproval){
        var groupsJSON={};
        for(var j=0; j<groupList.length; j++){
          if(groupList[j].isAssociated ==="true"&&groupList[j].signatoryGroupId!=="NONE"){
            groupsJSON={
              "signatoryGroupId":groupList[j].signatoryGroupId,
              "isAssociated":"true"
            }
            limitsObj.groups.push(groupsJSON);
            break;
          }else if(this.usersSelectedSignatoryList[limitsObj.cif]&&this.usersSelectedSignatoryList[limitsObj.cif]!=="NONE"){
            groupsJSON={
              "signatoryGroupId":this.usersSelectedSignatoryList[limitsObj.cif],
              "isAssociated":"true"
            }
            limitsObj.groups.push(groupsJSON);
            break;
          }
        }
      }
      signatoryGroupObj.push(limitsObj);

    }
    return signatoryGroupObj;
  },
  /*
  * form the company list payload for enroll customer request param
  * @returns: account level, global level featurse actions
  */
  getAddUserFeaturesList : function(){
    var self = this;
    var accountLevelPermissions = [], globalLevelPermissions = [];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForAddUser();
    
    var enrollSegData = this.view.segEnrollCustList.data;
    for(var i=0; i<enrollSegData.length; i++){
      var accFeaturesObj = {"companyName": enrollSegData[i].lblCustomerName,
                            "cif": enrollSegData[i].lblCustomerId,
                            "legalEntityId" : self.completeContractDetails.legalEntityId,
                            "accounts":[]};
      var accListMap = enrollCustAccountsFeatures[enrollSegData[i].lblCustomerId].accounts;
      var allAccFeaturesArr = enrollCustAccountsFeatures[enrollSegData[i].lblCustomerId].accountMapFeatures;
      var allOtherFeaturesArr = enrollCustAccountsFeatures[enrollSegData[i].lblCustomerId].nonAccLevelFeatures;
      //map features and actions for enroll payload format
      var otherLevelFeatures = this.mapFeaturesActionsForAddUserPayload(allOtherFeaturesArr);
      //append features for each account
      accListMap.forEach(function(accObj,key){
        var currAccFeatures = JSON.parse(allAccFeaturesArr.get(accObj.accountId).features);
        if(accObj.isEnabled === "true"){
          accFeaturesObj.accounts.push({
            "accountName": accObj.accountName,
            "accountId": accObj.accountId,
            "accountType": accObj.accountType,
            "productId":accObj.productId,
            "ownerType": accObj.ownerType,
            "featurePermissions": self.mapFeaturesActionsForAddUserPayload(currAccFeatures)
          });
        }
        
      });
      var globalFeaturesObj = {"companyName": enrollSegData[i].lblCustomerName,
                               "cif": enrollSegData[i].lblCustomerId,
                               "legalEntityId" : self.completeContractDetails.legalEntityId,
                               "features":otherLevelFeatures};
      accountLevelPermissions.push(accFeaturesObj);
      globalLevelPermissions.push(globalFeaturesObj);
    }
    return {
      "accountLevelPermissions":accountLevelPermissions,
      "globalLevelPermissions":globalLevelPermissions
    };
  },
  /*
  * format features and actions list for add user payload
  * @param: features array
  * @return: formatted features list
  */
  mapFeaturesActionsForAddUserPayload : function(featuresArr){
    var features = featuresArr.map(function(feature){
      var featureObj = {"featureId": feature.featureId,
                        "featureDescription": feature.featureDescription,
                        "featureName": feature.featureName,
                        "isEnabled": feature.isEnabled,
                        "permissions":[]};
      var actions = (feature.actions || feature.permissions).map(function(action){
        return {
          "id": action.actionId,
          "isEnabled":action.isEnabled
        };
      });
      featureObj.permissions = actions;
      return featureObj;
    });
    return features;
  },
  /*
  * form limits related payload for enroll customer
  */
  getAddUserLimitsList : function(){
    var self = this;
    var companyList = [];
    var transactionLimits = [];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForAddUser();
    var enrollSegData = this.view.segEnrollCustList.data;
    for(var i=0; i<enrollSegData.length; i++){
      var accListMap = enrollCustAccountsFeatures[enrollSegData[i].lblCustomerId].accounts;
      var accLimitsMap = enrollCustAccountsFeatures[enrollSegData[i].lblCustomerId].accLevelLimits;
      var limitGroups = enrollCustAccountsFeatures[enrollSegData[i].lblCustomerId].limitGroups;
      var limitsObj = {"companyName": enrollSegData[i].lblCustomerName,
                       "cif": enrollSegData[i].lblCustomerId,
                       "legalEntityId" : self.completeContractDetails.legalEntityId,
                       "limitGroups": [],
                       "accounts":[]};

      //form limit groups object 
      var limitGroupArr = [];
      for(var j=0; j<limitGroups.length; j++){
        if(limitGroups[j].limitGroupId && limitGroups[j].limitGroupId !== "N/A" &&
           limitGroups[j].limitGroupId !== "ACCOUNT_TO_ACCOUNT"){
          var limitGroupJson = {"limitGroupId": limitGroups[j].limitGroupId,"limits":[]};
          var limits = limitGroups[j].limits;
          for(var k=0;k<limits.length; k++){
            limitGroupJson.limits.push({
              "id": limits[k].id,
              "value": limits[k].value
            });
          }
          limitGroupArr.push(limitGroupJson);
        }
      }
      limitsObj.limitGroups = limitGroupArr;
      //append limits for each selected account
      accListMap.forEach(function(accObj,key){
        var currAccLimits = accLimitsMap.get(accObj.accountId).limits;
        if(accObj.isEnabled === "true"){
          limitsObj.accounts.push({
            "accountName": accObj.accountName,
            "accountId": accObj.accountId,
            "accountType": accObj.accountType,
            "productId":accObj.productId,
            "ownerType": accObj.ownerType,
            "featurePermissions":self.mapDefaultAccLimitsForAddUserPayload(JSON.parse(currAccLimits))
          });
        }
      });
      transactionLimits.push(limitsObj);
    }
    return transactionLimits;
  },
  /*
  * format limits list for enroll payload
  * @param: features array
  * @return: formatted limits list
  */
  mapDefaultAccLimitsForAddUserPayload : function(featuresArr){
    var self = this;
    var actionList = featuresArr.map(function(feature){
      var actionsArr = feature.actions || feature.permissions;
      for(var x=0; x<actionsArr.length; x++){
        var action = actionsArr[x];
        var actionObj =  {
          "featureId":feature.featureId,
          "actionId": action.actionId,
          "actionDescription": action.actionDescription,
          "actionName": action.actionName,
          "limitGroupId": action.limitgroupId || action.limitGroupId,
          "limits":[]
        };
        var limitsJson = action.limits ? Object.keys(action.limits) : [];
        var limitsArr = limitsJson.map(function(key){
          var limitObj = {"id":key,"value":action.limits[key]};
          return limitObj;
        });
        actionObj.limits = limitsArr;
        return actionObj;
      }
    });
    return actionList;
  },
  collectEditDataForSingleCompany : function(eventObj,context){
    var self=this;
    var segData = this.view.segEnrollCustList.data
    var data = segData[context.rowIndex];
    this.enrollSegRowInd = context.rowIndex;
    //get compnay details for one company/customer
    var companyDetail = this.getCompanyDetails(data);
    this.currCustomer.companyDetail = companyDetail;
    //get action and limit for one company/customer
    if(data.lstBoxRole.selectedKey === "select" || data.lstBoxRole.selectedKey === "SELECT"){
      data.lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
      data.flxRoleError.isVisible = true;
      this.prevRole[data.lblCustomerId]={"key":"SELECT"};
      this.view.segEnrollCustList.setDataAt(data,context.rowIndex);
    }else{
      if(this.prevRole[data.lblCustomerId].key==="SELECT" || this.prevRole[data.lblCustomerId].key==="select"){
        self.prevRole[data.lblCustomerId]={"key":data.lstBoxRole.selectedKey,"value":data.lstBoxRole.selectedkeyvalue[1]};
        self.getActionsAndLimits(data);
        data.lstBoxRole.skin = "sknLbxborderd7d9e03pxradius";
        data.flxRoleError.isVisible = false;
        self.view.segEnrollCustList.setDataAt(data,context.rowIndex);
      }else{
        self.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg1")+data.lstBoxRole.selectedkeyvalue[1];
        self.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg2")+" \""+self.prevRole[data.lblCustomerId].value+"\" to \""+data.lstBoxRole.selectedkeyvalue[1]+kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg3")+" \""+data.lblCustomerName+"("+data.lblCustomerId+") "+kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg4");
        self.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Assign")+" \""+data.lstBoxRole.selectedkeyvalue[1]+"\" "+ kony.i18n.getLocalizedString("i18n.frmPermissions.btnRoles");
        this.view.popUp.btnPopUpCancel.text=kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
        self.view.popUp.flxPopUpTopColor.skin="sknFlxTopColor4A77A0";
        self.view.flxUnlinkAccount.setVisibility(true);
        self.view.popUp.btnPopUpDelete.onClick = function(){
          self.prevRole[data.lblCustomerId]={"key":data.lstBoxRole.selectedKey,"value":data.lstBoxRole.selectedkeyvalue[1]};
          self.view.flxUnlinkAccount.setVisibility(false);
          self.getActionsAndLimits(data);
          data.lstBoxRole.skin = "sknLbxborderd7d9e03pxradius";
          data.flxRoleError.isVisible = false;
          self.view.segEnrollCustList.setDataAt(data,context.rowIndex);
          self.view.forceLayout();
        };
        this.view.popUp.btnPopUpCancel.onClick = function(){
          data.lstBoxRole.selectedKey=self.prevRole[data.lblCustomerId].key;
          data.lstBoxRole.selectedkey=self.prevRole[data.lblCustomerId].key;
          self.view.flxUnlinkAccount.setVisibility(false);
          self.view.segEnrollCustList.setDataAt(data,context.rowIndex);
          self.view.forceLayout();
        };
      }
    }
    this.view.forceLayout();
  }, 
  getActionsAndLimits : function(segData){
    var self=this;
    var list = []
    var temp = {
      "coreCustomerId":segData.lblCustomerId,
      "serviceDefinitionId":segData.lstBoxService.selectedKey,
      "roleId":segData.lstBoxRole.selectedKey
    };
    list.push(temp);
    var payload = {
      "coreCustomerRoleIdList": JSON.stringify(list),
      "coreCustomerId":segData.lblCustomerId,
      "serviceDefinitionId":segData.lstBoxService.selectedKey,
      "roleId":segData.lstBoxRole.selectedKey,
      "legalEntityId": self.completeContractDetails.legalEntityId,
      "contractId": segData.orignalData? (segData.orignalData.contractId || "") : ""
    };
    this.presenter.fetchContractServiceDefRoleDataForUser(payload);
    //this.presenter.getCoreCustomerRoleFeatureActionLimits(payload);
  },
  serviceDefinitionRolesCallBack : function(response, featuresPerAccount){
    var self = this;
    var accFeatureLimits = {"accounts" : self.currCustomer.accounts,
                            "featuresPerAccount": featuresPerAccount,
                            "features" : response[1].features.length > 0 ? response[1].features[0].coreCustomerFeatures : [],
                            "limits": response[0].transactionLimits.length > 0 ? response[0].transactionLimits[0].featurePermissions : [],
                            "nonAccFeatures":response[0].globalLevelPermissions && response[0].globalLevelPermissions.length > 0 ? response[0].globalLevelPermissions[0].features : [],
                            "signatoryGroups":response[2].coreCustomers && response[2].coreCustomers.length>0?response[2].coreCustomers[0].signatoryGroups:[],
                            "isPrimary" : self.currCustomer.companyDetail.isPrimary,
                            "custId": self.currCustomer.companyDetail.cif                            
                          };
    this.assignDefaultEnableFlagsEditUser(accFeatureLimits);
  },
  getUserDetials : function(){
    var data = this.aboutToAddUser.data[0];
    var type = this.aboutToAddUser.type;
    var details;
    if(data.orignalData){
      var newdata = data.orignalData;
      var phoneArr = newdata.phone.split("-");
      newdata.phoneNumber = phoneArr[1];
      newdata.isdCode = phoneArr[0];
      if(newdata.isdCode[0] !== "+" && newdata.isdCode.length <= 3){
        if(newdata.isdCode.length >= 2){
          var firstTwoDigit = newdata.isdCode[0]+newdata.isdCode[1];
          if(firstTwoDigit !== "00")
            newdata.isdCode = "+" + newdata.isdCode;
        }
      }
      details = {
        "firstName": newdata.firstName ? newdata.firstName : "",
        "lastName": newdata.lastName ? newdata.lastName : "",
        "middleName": newdata.middleName ? newdata.middleName : "",
        "phoneNumber": newdata.phoneNumber ? newdata.phoneNumber : "",
        "phoneCountryCode": newdata.isdCode ? newdata.isdCode.trim() : "",
        "dob": newdata.dateOfBirth ? newdata.dateOfBirth : "",
        "drivingLicenseNumber": "",
        "email": newdata.email ? newdata.email : "",
        "isEnrolled": type === "newUser" ? false : true,
        "isProfile" : data.isProfile === "true" ? true : false,
        "legalEntityId" : this.completeContractDetails.legalEntityId
      }
      if(details.isProfile){
        details.id = newdata.id;
      }else{
        details.coreCustomerId = newdata.coreCustomerId ? newdata.coreCustomerId : "";
      }
    }else{
      details = {
        "firstName": data.firstName ? data.firstName : "",
        "lastName": data.lastName ? data.lastName : "",
        "middleName": data.middleName ? data.middleName : "",
        "phoneNumber": data.phone ? data.phone : "",
        "phoneCountryCode": data.isdCode ? data.isdCode.trim() : "",
        "ssn": data.taxId ? data.taxId :"",
        "dob": data.dateOfBirth ? data.dateOfBirth : "",
        "drivingLicenseNumber": "",
        "coreCustomerId":data.coreCustomerId ? data.coreCustomerId.text : "",
        "email": data.email ? data.email : "",
        "isEnrolled": type === "newUser"? false : true,
        "isProfile" : false,
        "legalEntityId" : this.completeContractDetails.legalEntityId
      }
    }  
	return details;    
  },
  getCompanyList : function(){
    var self = this;
    var finalList = [];
    var segData = this.view.segEnrollCustList.data;
    for(var i = 0; i < segData.length ;i++){
      var temp = self.getCompanyDetails(segData[i]);
      finalList.push(temp);
    }
    return finalList;
  },
  getCompanyDetails : function(data){
    var self = this;
    var finalResponse = [];
      var segData = data
      var orignalData = data.orignalData;

      //forming account array
      var tempAccountArr = []
      for(var arr =0; arr<orignalData.accounts.length; arr++){
        var acc = orignalData.accounts[arr];
        var tempAccObject = {
          "accountName":acc.accountName,
          "accountId":acc.accountId,
          "isEnabled":"false",
          "accountType":acc.accountType,
		  "ownerType" : acc.ownerType}
        tempAccountArr.push(tempAccObject);
        
      }
      this.currCustomer.accounts = tempAccountArr;
    var userDetailsId =  this.aboutToAddUser.data[0] && this.aboutToAddUser.data[0].orignalData && this.aboutToAddUser.data[0].orignalData.coreCustomerId ? 
         this.aboutToAddUser.data[0].orignalData.coreCustomerId : "";
      //forming whole obect for on company 
      var tempObject = {
        "companyName":orignalData.coreCustomerName,
        "contractId":self.recentContractDetails.contractId,
        "contractName":self.recentContractDetails.contractName,
        "cif":orignalData.coreCustomerId,
        "legalEntityId" : self.completeContractDetails.legalEntityId,
        //"isPrimary":orignalData.isPrimary,
        "isPrimary": (userDetailsId && userDetailsId ===  orignalData.coreCustomerId) ? "true": "false",
        "autoSyncAccounts":orignalData.autoSyncAccounts?orignalData.autoSyncAccounts:self.autoSyncAccountsFlag,
        "serviceDefinition":segData.lstBoxService.selectedKey,
        "roleId":segData.lstBoxRole.selectedKey,
      	"accounts":tempAccountArr}
      
    return tempObject;
  },
   /*
  * add isEnabled key to track the selection while edit
  * @param: {"accounts":[],"features":[],"limits":[],"isPrimary":true/false,"custId":""}
  */
  assignDefaultEnableFlagsEditUser : function(accFeatureLimitsObj){
   var featuresMap = new Map();
    var featuresPerAcc = accFeatureLimitsObj.featuresPerAccount;
    var groupLimitsbyFeature = this.getAccLvlLimitsGroupedByFeature(accFeatureLimitsObj.limits, accFeatureLimitsObj.featuresPerAccount);
    var otherFeaturesUpdated = this.getFeaturesMapToFormEditObject(accFeatureLimitsObj.nonAccFeatures, 2);
    // featuresMap = this.getFeaturesMapToFormEditObject(accFeatureLimitsObj,1);
     //TODO: replace this with limits array for bulkupdate limits
    //var limitsArr = this.getLimitsMapToFormEditObject(groupLimitsbyFeature,2);
	
    this.actionsAccountJSON[accFeatureLimitsObj.custId] = {};
    var combinedAccLevelFeatures = this.getCombinedAllAccountsFeatures(featuresPerAcc, accFeatureLimitsObj.custId);
    var accFeaturesMap = new Map();
    var accLimitsMap = new Map();
    
    var accounts = accFeatureLimitsObj.accounts;
    var accountsMap = new Map();
    for(var i=0;i<accounts.length;i++){
      let accountNumber = accounts[i].accountNumber || accounts[i].accountId;
      accounts[i]["isEnabled"] = "true";
      accounts[i]["isAssociated"] = "true";
      accountsMap.set(accountNumber,accounts[i]); 
      //assign features for each accounts
      var currAccFeaturesArr = this.getFeaturesMapToFormEditObject((featuresPerAcc[accountNumber]||[]),2);
      var accFeatureObj = {"accountDetails":accounts[i], "features":JSON.stringify(currAccFeaturesArr)};
      accFeaturesMap.set(accountNumber,accFeatureObj);
       //assign limits for each accounts
      var currAccLimitsArr = this.getLimitsMapToFormEditObject((groupLimitsbyFeature[accountNumber]|| []),2,true);
      var accLimitObj = {"accountDetails":accounts[i], "limits":JSON.stringify(currAccLimitsArr)};
      accLimitsMap.set(accountNumber,accLimitObj);
    }
    //store all features list for bulkupdate
    this.bulkUpdateAllFeaturesList = JSON.parse(JSON.stringify(combinedAccLevelFeatures));
    //store all featureslimits list for bulkupdate
    //TODO: assign correct limits array
    //this.bulkUpdateAllFeaturesLimits = JSON.parse(JSON.stringify(limitsArr));
    var signatoryGroups=accFeatureLimitsObj.signatoryGroups;
	var hasApprovalPerm=this.hasValidateApprovalPermission(accFeatureLimitsObj.custId,accFeaturesMap);
    if(!hasApprovalPerm)
      this.usersSelectedSignatoryList[accFeatureLimitsObj.custId]="NONE";
    var limitGroupsArr = this.caluclateTransactionLimitGroupValue(accFeaturesMap, accLimitsMap, true, null);
    var editUserObj = {"accounts" : accountsMap,
                       "features" : featuresMap, //Map
                       "accLevelFeatures": combinedAccLevelFeatures, //Array
                       "nonAccLevelFeatures": otherFeaturesUpdated, //Array
                       "accountMapFeatures": accFeaturesMap, //Map(features - stringified)
                       "accLevelLimits":accLimitsMap, //Map(limits - stringified)
                       "limitGroups": limitGroupsArr, //Array
                       "signatoryGroups":signatoryGroups,
                       "isPrimary" : accFeatureLimitsObj.isPrimary,
                       "custId": accFeatureLimitsObj.custId
                      };
    this.presenter.setAccountsFeaturesForAddUser(accFeatureLimitsObj.custId,editUserObj);  
  },
   /*
  * get limits at acc level for the features avaible at account level
  * @param: limits per account, acc level features Obj
  * @returns: acc Level Limits obj
  */
   getAccLvlLimitsGroupedByFeature : function(limitsArr,featuresPerAccObj){
    var accIds = Object.keys(featuresPerAccObj);
    var limitsPerAccObj ={}, featureActionIdArr =[], currAccLimits;
    for(let i=0; i< accIds.length; i++){
      limitsPerAccObj[accIds[i]] = [];
      featureActionIdArr =[]
      //get all featureaction available for current account
      var featuresArr = featuresPerAccObj[accIds[i]];
      for(let j = 0; j < featuresArr.length; j++) {
        var actions = featuresArr[j].actions || featuresArr[j].permissions;
        featureActionIdArr.push(featuresArr[j].featureId);
        //TODO: uncomment once monetary features are part of acc level features
        /*for (let k = 0; k < actions.length; k++) {
          let featureActionId = featuresArr[j].featureId + "#" + actions[k].actionId;
          featureActionIdArr.push(featureActionId);
        } */
      }
      
      //store limts for the available features at acc level
      currAccLimits = [];
      for(let j=0; j<limitsArr.length; j++){
        //let featureActionId = limitsArr[j].featureId + "#" + limitsArr[j].actionId;
        let featureActionId = limitsArr[j].featureId;
        if(featureActionIdArr.includes(featureActionId)){
          currAccLimits.push(limitsArr[j]);
        }
      } 
      var limitGroupedFeatures = this.getFeatureBasedActions(currAccLimits, 2);
      limitsPerAccObj[accIds[i]] = limitGroupedFeatures;
    }
    return limitsPerAccObj;
  },
   /*
  * get features actions nested structure from flat structure
  * @param: features actions flat structure array, option(1,2) - for limits format
  * @return: nested features actions
  */
   getFeatureBasedActions: function (allFeatureActions, option) {
    var featureJson = {};
    for (var i = 0; i < allFeatureActions.length; i++) {
      var limits;
      if (option === 1) { //add remaining limits and get json obj
        limits = this.addNewLimitsToExistingLimits(allFeatureActions[i].limits);
      } else if (option === 2) { //get existing array
        limits = allFeatureActions[i].limits;
      } else { //get json obj
        limits = this.getLimitValuesJsonFromArray(allFeatureActions[i].limits);
      }
      var action = {
        "accessPolicyId": allFeatureActions[i].accessPolicyId,
        "actionDescription": allFeatureActions[i].actionDescription,
        "actionId": allFeatureActions[i].actionId,
        "actionLevelId": allFeatureActions[i].actionLevelId,
        "actionName": allFeatureActions[i].actionName,
        "actionStatus": allFeatureActions[i].actionStatus,
        "dependentActions": allFeatureActions[i].dependentActions,
        "isAccountLevel": allFeatureActions[i].isAccountLevel,
        "limitGroupId": allFeatureActions[i].limitGroupId,
        "limits": limits,
        "actualLimits": allFeatureActions[i].limits,
        "typeId": allFeatureActions[i].typeId
      };
      if (featureJson.hasOwnProperty(allFeatureActions[i].featureId) === false) { //a new entry
        featureJson[allFeatureActions[i].featureId] = {
          "featureDescription": allFeatureActions[i].featureDescription,
          "featureId": allFeatureActions[i].featureId,
          "featureName": allFeatureActions[i].featureName,
          "featureStatus": allFeatureActions[i].featureStatus,
          "isAccountLevel": allFeatureActions[i].isAccountLevel,
          "actions": []
        };

      }
      featureJson[allFeatureActions[i].featureId].actions.push(action);
    }
    var nestedFeatures = Object.values(featureJson);
    return nestedFeatures;
  },
  /*
  * get all features union from all the account level features
  * @param: existing features per account obj
  * @return: all AccLevelfeatures arr
  */
  getCombinedAllAccountsFeatures : function(accFeaturesObj, custId){
    var acc = Object.keys(accFeaturesObj);
    var combinedAccFeaturesObj = {}, combinedAccFeaturesArr =[];
    //creates object with featureid's to combined all the features from all accounts
    for(let i=0; i< acc.length; i++){
      var currAccFeatures = accFeaturesObj[acc[i]];
      for(let j=0; j<currAccFeatures.length ; j++){
        var currActions = currAccFeatures[j].actions || currAccFeatures[j].permissions;
        if(combinedAccFeaturesObj[currAccFeatures[j].featureId]){  
        }else{
          combinedAccFeaturesObj[currAccFeatures[j].featureId] = {"featureData":currAccFeatures[j],"actions":{}};
        }
        for(let k=0; k< currActions.length; k++){
          //tracks the actions selection
          this.actionsAccountJSON[custId][currActions[k].actionId] =[];
          var featureActionId = currAccFeatures[j].featureId + "#"+currActions[k].actionId;
          if(combinedAccFeaturesObj[currAccFeatures[j].featureId].actions[currActions[k].actionId]){
          } else{
            combinedAccFeaturesObj[currAccFeatures[j].featureId].actions[currActions[k].actionId] = currActions[k];
          }
        }
      }
    }
    //form featureActions array from the combined json object
    var featuresIdArr = Object.keys(combinedAccFeaturesObj);
    for(let i=0; i< featuresIdArr.length; i++){
      var featureObj = combinedAccFeaturesObj[featuresIdArr[i]].featureData;
      if(featureObj.actions){
        featureObj.actions = Object.values(combinedAccFeaturesObj[featuresIdArr[i]].actions);
      }else if(featureObj.permissions){
        featureObj.permissions = Object.values(combinedAccFeaturesObj[featuresIdArr[i]].actions);
      }
      combinedAccFeaturesArr.push(featureObj);
    }
    return combinedAccFeaturesArr;
  },
  caluclateTransactionLimitGroupValue : function(accFeaturesMap,accLimitsMap,isFirstTime,existingLimitGroups){
    var self =this;
    var activeFeatures = {},hasExistingLimits = false;
    //fetch all the enabled actions for all the selected accounts
    accFeaturesMap.forEach(function(accountObj,key){
      if(accountObj.accountDetails.isEnabled === "true" || accountObj.accountDetails.isAssociated === "true"){
        activeFeatures[key] = [];
        var features = JSON.parse(accountObj.features);
        for(var i=0; i<features.length; i++){
          var actions = features[i].actions || features[i].permissions;
          for(var j=0; j<actions.length; j++){
            if(actions[j].isEnabled === "true"){
              var featureActionId = features[i].featureId +"$" + actions[j].actionId;
              activeFeatures[key].push(featureActionId);
            }
          }
        }
      }
    });
   // var limitGroups = existingLimitGroups ? this.getLimitGroupsValuesJsonFromArray(existingLimitGroups) :{};
   var limitGroups = existingLimitGroups ? this.getLimitGroupsValuesJsonFromArray(existingLimitGroups,isFirstTime) :{};
    hasExistingLimits = existingLimitGroups && existingLimitGroups.length > 0 ? true : false;
    //reset max values
    var limitGrp = Object.values(limitGroups);
    for(var x=0; x<limitGrp.length; x++){
      limitGroups[limitGrp[x].limitGroupId].limits[0].maxValue = 0.0;
      limitGroups[limitGrp[x].limitGroupId].limits[1].maxValue = 0.0;
      limitGroups[limitGrp[x].limitGroupId].limits[2].maxValue = 0.0;
    }
    //caluclate the max limit values for limits groups
    accLimitsMap.forEach(function(accountObj,key){
      if(accountObj.accountDetails.isEnabled === "true" || accountObj.accountDetails.isAssociated === "true"){
        var featureLimits = JSON.parse(accountObj.limits);
        for(var l=0; l<featureLimits.length; l++){
          var actions = featureLimits[l].actions || featureLimits[l].permissions;
          for(var m=0; m< actions.length; m++ ){
            if (activeFeatures[key].includes(featureLimits[l].featureId + '$' + actions[m].actionId)) {
              var limitGroupId = actions[m].limitGroupId || actions[m].limitgroupId;
              if (!limitGroups.hasOwnProperty(limitGroupId)) {
                limitGroups[limitGroupId] = {
                  'limitGroupName':actions[m].limitgroup || "",
                  'limitGroupId': limitGroupId,
                  "limits": [{"id": self.limitId.MAX_TRANSACTION_LIMIT,"maxValue":0.0},
                             {"id": self.limitId.DAILY_LIMIT, "maxValue" :0.0},
                             {"id": self.limitId.WEEKLY_LIMIT, "maxValue":0.0}]
                };
              }
              //caluclate the max values for limit groups
              for(var y=0; y<limitGroups[limitGroupId].limits.length; y++){
                if(limitGroups[limitGroupId].limits[y].id === self.limitId.MAX_TRANSACTION_LIMIT){
                  let value = parseFloat(actions[m].limits[self.limitId.MAX_TRANSACTION_LIMIT]);
                  if (limitGroups[limitGroupId].limits[y].maxValue < value) {
                    limitGroups[limitGroupId].limits[y].maxValue = value;
                  }
                } else if(limitGroups[limitGroupId].limits[y].id === self.limitId.DAILY_LIMIT){
                  limitGroups[limitGroupId].limits[y].maxValue += parseFloat(actions[m].limits[self.limitId.DAILY_LIMIT]);
                } else if(limitGroups[limitGroupId].limits[y].id === self.limitId.WEEKLY_LIMIT){
                  limitGroups[limitGroupId].limits[y].maxValue += parseFloat(actions[m].limits[self.limitId.WEEKLY_LIMIT]);
                }
              }
              //for first time assign max values to values in create flow
              if(hasExistingLimits === false){ 
                limitGroups[limitGroupId].limits[0]["value"] = limitGroups[limitGroupId].limits[0].maxValue;
                limitGroups[limitGroupId].limits[1]["value"] = limitGroups[limitGroupId].limits[1].maxValue;
                limitGroups[limitGroupId].limits[2]["value"] = limitGroups[limitGroupId].limits[2].maxValue;
              }
              if(isFirstTime){ // fro first time assign max values to values
                limitGroups[limitGroupId].limits[0]["value"] = limitGroups[limitGroupId].limits[0].maxValue;
                limitGroups[limitGroupId].limits[1]["value"] = limitGroups[limitGroupId].limits[1].maxValue;
                limitGroups[limitGroupId].limits[2]["value"] = limitGroups[limitGroupId].limits[2].maxValue;
              }
            }
          }
        }
      }
    });
    var limitGroupArr = [];
    for (var key in limitGroups) {
      limitGroupArr.push(limitGroups[key]);
    }
    return limitGroupArr;
  },
  getFeaturesMapToFormEditObject : function(features,option){
    var featuresMap = new Map();
    //add isEnable key for all features and action
    //var features = accFeatureLimitsObj.features;  
    for(var j=0; j<features.length; j++){
      features[j]["isEnabled"] = "true";
      var actionsArr = features[j].actions || features[j].permissions;
      for(var k=0; k<actionsArr.length; k++){
        actionsArr[k]["isEnabled"] = "true";
        actionsArr[k]["isPartial"] = "false";
      }
      var featureId = features[j].featureId  || features[j].id;
      featuresMap.set(featureId,features[j]);
    }
    return (option === 1 ? featuresMap :features) ;
  },
  /*
  * add actuallimit key to all limits to construct edit user access object
  * @param: limits data,option
  * @returns: limits map 
  */
  getLimitsMapToFormEditObject : function(limits, option){
    var limitsMap = new Map();
    var limits = limits || [];  
    for(var i=0; i<limits.length; i++){
      var actionsArr = limits[i].actions || limits[i].permissions;
      for(var j=0; j<actionsArr.length; j++){
        actionsArr[j]["actualLimits"] = actionsArr[j].limits;
        actionsArr[j].limits = this.addNewLimitsToExistingLimits(actionsArr[j].limits);
      }
      var featureId = limits[i].featureId;
      limitsMap.set(featureId,limits[i]);
    }
    return (option === 1 ? limitsMap :limits);
  },
    /*
  * add new limit values to existing limits
  * @param: existing limit values array
  * @return: new limit values json
  */
  addNewLimitsToExistingLimits : function(limitVal){
    var allLimits = [], allLimitsJson;;
    if(limitVal && limitVal.length > 0){
      var limitJson = this.getLimitValuesJsonFromArray(limitVal);
      var newLimits = [{"id": this.limitId.PRE_APPROVED_DAILY_LIMIT, "value": "0"},
                       {"id": this.limitId.PRE_APPROVED_WEEKLY_LIMIT, "value": "0"},
                       {"id": this.limitId.PRE_APPROVED_TRANSACTION_LIMIT, "value": "0"},
                       {"id": this.limitId.AUTO_DENIED_DAILY_LIMIT, "value": limitJson[this.limitId.DAILY_LIMIT]},
                       {"id": this.limitId.AUTO_DENIED_WEEKLY_LIMIT, "value": limitJson[this.limitId.WEEKLY_LIMIT]},
                       {"id": this.limitId.AUTO_DENIED_TRANSACTION_LIMIT, "value": limitJson[this.limitId.MAX_TRANSACTION_LIMIT]}];
      allLimits = limitVal.concat(newLimits);
      allLimitsJson = this.getLimitValuesJsonFromArray(allLimits)
    }
    return allLimitsJson;
  },
    /*
  * create liit values json from array
  * @param: limit values array
  * @return: limit values json
  */
  getLimitValuesJsonFromArray : function(limitValueArr){
    var limitsJson = {};
    if (limitValueArr && limitValueArr.length > 0) {
      limitsJson = limitValueArr.reduce(function (mapJson, rec) {
        mapJson[rec.id] = rec.value;
        return mapJson;
      }, {});
    }
    return limitsJson;
  },
    /*
  * create limit groups values json from array
  * @param: limitGroups values array, is iinitial data set
  * @return: limitGroups values json
  */
  getLimitGroupsValuesJsonFromArray : function(limitValueArr, isInitialTime){
    var self =this;
    var limitsJson = {};
    if (limitValueArr && limitValueArr.length > 0) {
      limitsJson = limitValueArr.reduce(function (mapJson, rec) {
        if(rec.limitGroupId && rec.limitGroupId !== "N/A"){
          var limitGroup = {
            'limitGroupName': "",
            'limitGroupId': rec.limitGroupId,
            "limits": [],
            "actualLimits":[]
          };
          var existingLimitId = [];
          //add max value param for caluclating max limits
          for(var i=0; i<rec.limits.length; i++){
            existingLimitId.push(rec.limits[i].id);
            var limitVal = parseFloat(rec.limits[i].value);
            var maxVal = parseFloat(rec.limits[i].maxValue);
            limitGroup.limits.push({"id": rec.limits[i].id,"value": (isInitialTime === true && limitVal > maxVal) ? (rec.limits[i].maxValue+"" || "0") : rec.limits[i].value+"",
                                    "maxValue":rec.limits[i].maxValue+""});
            limitGroup.actualLimits.push({"id": rec.limits[i].id,
                                          "value": (isInitialTime === true && limitVal > maxVal) ? (rec.limits[i].maxValue+"" || "0") : rec.limits[i].value+""});
          }
          if(rec.limits.length < 3){
            if(!existingLimitId.includes(self.limitId.MAX_TRANSACTION_LIMIT)){
              limitGroup.limits.push({"id": self.limitId.MAX_TRANSACTION_LIMIT,"value": "0", "maxValue":"0"});
              limitGroup.actualLimits.push({"id": self.limitId.MAX_TRANSACTION_LIMIT,"value": "0"});
            }else if(!existingLimitId.includes(self.limitId.DAILY_LIMIT)){
              limitGroup.limits.push({"id": self.limitId.DAILY_LIMIT,"value": "0", "maxValue":"0"});
              limitGroup.actualLimits.push({"id": self.limitId.DAILY_LIMIT,"value": "0"});
            }else if(!existingLimitId.includes(self.limitId.WEEKLY_LIMIT)){
              limitGroup.limits.push({"id": self.limitId.WEEKLY_LIMIT,"value": "0", "maxValue": "0"});
              limitGroup.actualLimits.push({"id": self.limitId.WEEKLY_LIMIT,"value": "0"});
            }
          }
          mapJson[rec.limitGroupId] = limitGroup;
        }
        return mapJson;
      }, {});
    }
    return limitsJson;
  },
  /*
  * seperate account/non-account features actions
  * @param: features actions map
  * @param: account level and other features action json obj
  */
  getAccountLevelFeatures : function(featuresListMap, custId){
    var self =this;
    var accFeaturesArr =[],otherFeaturesArr = [];
    var accLimits = [];
    var featuresArr1 = new Map(JSON.parse(JSON.stringify(Array.from(featuresListMap))));
    var featuresArr2 = new Map(JSON.parse(JSON.stringify(Array.from(featuresListMap))));
    featuresArr1.forEach(function(featureObj,key){
      var currFeature = featureObj;
      var accActions = [],otherActions = [];
      for(var j=0; j<currFeature.actions.length; j++){
        if(currFeature.actions[j].isAccountLevel === "true" || currFeature.actions[j].isAccountLevel === "1"){
          accActions.push(currFeature.actions[j]);
          self.actionsAccountJSON[custId][currFeature.actions[j].actionId] =[];
        }else{
          otherActions.push(currFeature.actions[j]);
        }
      }
      if(accActions.length > 0){
        featureObj.actions = accActions;
        accFeaturesArr.push(featureObj);
      }
      if(otherActions.length > 0){
        var nonAccFeature = featuresArr2.get(key);
        nonAccFeature.actions = otherActions;
        otherFeaturesArr.push(nonAccFeature);
      }
    });
    return {
      "accountLevelFeatures" : accFeaturesArr,
      "otherFeatures": otherFeaturesArr
    };
  },
  validateRoleSelection : function(){
    var isValid = true;
    var rowIndex = this.view.segEnrollCustList.selectedRowIndex[1]
    var rowdata = this.view.segEnrollCustList.data[rowIndex];
    if(rowdata.lstBoxRole.selectedKey === "select"){
        rowdata.lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
        rowdata.flxRoleError.isVisible = true;  
      	isValid = false;
      }
      this.view.segEnrollCustList.setDataAt(rowdata,rowIndex);
    return isValid;
  },
  editUserAccessOnClick : function(option){
    this.setEditUserAccessTitleCustInfo();
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserDetails = this.presenter.getAccountsFeaturesForAddUser(enrollUserData.orignalData.coreCustomerId);
    this.view.commonButtonsEditAccounts.btnCancel.info = {"previousData":this.parseEditUserObjPreviousState(editUserDetails, 1), "previousSyncFlag":JSON.parse(JSON.stringify(enrollUserData.orignalData.autoSyncAccounts)),"previousSignatoryGroupId":this.usersSelectedSignatoryList[enrollUserData.custId]};
    var accounts = editUserDetails.accounts;
    this.setAccountsSegmentData(accounts);
    this.view.enrollEditAccountsCard.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + ":";
    this.view.addedUserEditFeaturesCard.segAccountFeatures.info = {"parentId":"addedUserEditFeaturesCard","segData":[],"featuresType":1, "segDataJSON":{}};
    this.setFeaturesCardSegmentData(this.view.addedUserEditFeaturesCard.segAccountFeatures, editUserDetails.accLevelFeatures);
    this.storeActionForAccountSelection();
  },
  /*
  * convert edit user obj values to stringify/object form in order to change referenc
  * @param: edit user param, option(stringified:1,objectform:2)
  */
  parseEditUserObjPreviousState : function(editUserObj,option){
    if(option === 1){
    var stringifyUser= {"accounts" : JSON.stringify(Array.from(editUserObj.accounts)),
                      "features" : JSON.stringify(Array.from(editUserObj.features)),
                      "accLevelFeatures": JSON.stringify(editUserObj.accLevelFeatures),
                      "nonAccLevelFeatures": JSON.stringify(editUserObj.nonAccLevelFeatures),
                      "accountMapFeatures": JSON.stringify(Array.from(editUserObj.accountMapFeatures)),

                      "accLevelLimits":JSON.stringify(Array.from(editUserObj.accLevelLimits)),
                      "limitGroups": JSON.stringify(editUserObj.limitGroups),
                      "signatoryGroups":JSON.stringify(editUserObj.signatoryGroups),
                      "customerDetails" : JSON.stringify(editUserObj.customerDetails),
                      "isPrimary" : editUserObj.isPrimary
                       };
      return stringifyUser;
    } else{
      var objUser = {"accounts" : new Map(JSON.parse(editUserObj.accounts)),
                      "features" : new Map(JSON.parse(editUserObj.features)),
                      "accLevelFeatures": JSON.parse(editUserObj.accLevelFeatures),
                      "nonAccLevelFeatures": JSON.parse(editUserObj.nonAccLevelFeatures),
                      "accountMapFeatures": new Map(JSON.parse(editUserObj.accountMapFeatures)),

                      "accLevelLimits":new Map(JSON.parse(editUserObj.accLevelLimits)),
                      "limitGroups": JSON.parse(editUserObj.limitGroups),
                     "signatoryGroups":JSON.parse(editUserObj.signatoryGroups),
                      "customerDetails" : JSON.parse(editUserObj.customerDetails),
                      "isPrimary" : editUserObj.isPrimary
                    };
      return objUser;
    }
  },
  revertEditUserChangesOnCancel : function(){
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var stringifyPrevState = this.view.commonButtonsEditAccounts.btnCancel.info.previousData;
    var userObj = this.parseEditUserObjPreviousState(stringifyPrevState, 2);
    enrollUserData.orignalData.autoSyncAccounts=this.view.commonButtonsEditAccounts.btnCancel.info.previousSyncFlag;
    this.usersSelectedSignatoryList[enrollUserData.orignalData.coreCustomerId]=this.view.commonButtonsEditAccounts.btnCancel.info.previousSignatoryGroupId;
    this.view.segEnrollCustList.setDataAt(enrollUserData,this.enrollSegRowInd);
    this.presenter.setAccountsFeaturesForAddUser(enrollUserData.orignalData.coreCustomerId,userObj);
  },
  setEditUserAccessTitleCustInfo : function(){
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var username =  this.aboutToAddUser.data[0].lblExistingUserName ? this.aboutToAddUser.data[0].lblExistingUserName.text : (this.aboutToAddUser.data[0].firstName +" "+this.aboutToAddUser.data[0].lastName);
    this.view.lblAccountsCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+ username;
    this.view.lblFeaturesCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+ username;
    this.view.lblOtherFeaturesCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+ username;
    this.view.lblLimitsCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+ username;
    this.view.lblSignatoryCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+ username;
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownAccounts,this.view.enrollEditAccountsCard);
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownFeatures,this.view.addedUserEditFeaturesCard);
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownOF,this.view.addedUserEditOtherFeaturesCard);
    this.setCustDetailsInCardEditUserAccess(this.view.addedUserLimitsDropdown,this.view.addedUserEditLimitsCard);
    
    this.view.forceLayout();
  },
  setCustDetailsInCardEditUserAccess : function(listboxCompPath,cardWidgetPath){
    var rowIndex = this.view.segEnrollCustList.selectedRowIndex[1]
    var rowdata = this.view.segEnrollCustList.data[rowIndex];
    listboxCompPath.lblSelectedValue.text = rowdata.lblCustomerName+"("+rowdata.lblCustomerId+")";
    listboxCompPath.setEnabled(false);
    cardWidgetPath.lblName.text = rowdata.lblCustomerName;
    cardWidgetPath.lblData1.text = rowdata.lblCustomerId;
    cardWidgetPath.lblData2.text = rowdata.orignalData.taxId || kony.i18n.getLocalizedString("i18n.Applications.NA");
    cardWidgetPath.lblData3.text = rowdata.orignalData.cityName +","+ rowdata.orignalData.country;
    if(cardWidgetPath.id==="enrollEditAccountsCard"){
      rowdata.orignalData.autoSyncAccounts=rowdata.orignalData.autoSyncAccounts?rowdata.orignalData.autoSyncAccounts:this.autoSyncAccountsFlag;
      cardWidgetPath.lblCheckboxOptions.text=rowdata.orignalData.autoSyncAccounts==="true"?this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxnormallbl;
      cardWidgetPath.lblCheckboxOptions.skin = this.applyCheckboxSkin( cardWidgetPath.lblCheckboxOptions);
      var scopeObj=this;
      cardWidgetPath.flxCheckboxOptions.onClick = function(){
        var isChecked="true";
        var selectedCustId=scopeObj.view.customersDropdownAccounts.lblSelectedValue.info.customerId;
        if(cardWidgetPath.lblCheckboxOptions.text===scopeObj.AdminConsoleCommonUtils.checkboxnormallbl){
          cardWidgetPath.lblCheckboxOptions.text=scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl;
        }else{
          cardWidgetPath.lblCheckboxOptions.text=scopeObj.AdminConsoleCommonUtils.checkboxnormallbl;
          isChecked="false";
        }
        cardWidgetPath.lblCheckboxOptions.skin = scopeObj.applyCheckboxSkin( cardWidgetPath.lblCheckboxOptions);
        rowdata.orignalData.autoSyncAccounts=isChecked;
        scopeObj.view.segEnrollCustList.setDataAt(rowdata,rowIndex);
        scopeObj.view.forceLayout();
      };
    }
  },
  showEditUserScreen : function(){
    //     this.showBreadcrumbsForScreens(2);
    this.view.flxSearchUser.setVisibility(false);
    this.view.flxEditAddedUserDetails.setVisibility(true);
    this.view.flxAddedUserEditAccountsContainer.setVisibility(true);
    this.view.flxAddedUserEditFeaturesContainer.setVisibility(false);
    this.view.flxAddedUserEditOtherFeaturesCont.setVisibility(false);
    this.view.flxAddedUserEditLimitsContainer.setVisibility(false);
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    this.view.flxAccountTypesFilter.setVisibility(false);    
    this.view.customersDropdownAccounts.setEnabled(false);
    this.view.customersDropdownAccounts.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.customersDropdownAccounts.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.customersDropdownFeatures.setEnabled(false);
    this.view.customersDropdownFeatures.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.customersDropdownFeatures.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.customersDropdownOF.setEnabled(false);
    this.view.customersDropdownOF.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.customersDropdownOF.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.addedUserLimitsDropdown.setEnabled(false);
    this.view.addedUserLimitsDropdown.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.addedUserLimitsDropdown.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    //enable all buttons
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditLimits.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditLimits.btnNext,false,true);
    this.enableOrDisableVerticalTabEditUser(true);
    this.view.forceLayout();
  },
  enableOrDisableVerticalTabEditUser : function(isEnable){
    this.view.AddedUserEditVerticalTabs.setEnabled(isEnable);
  },
  navigatetoEditAccountsPage : function(){
    if(this.validateRoleSelection()){
      this.showEditUserScreen();
      this.editUserAccessOnClick();
      this.showEditAccountsScreen();
    }
  },
  navigatetoEditAccountLevelFeaturePage : function(){
    if(this.validateRoleSelection()){
      this.showEditUserScreen();
      this.editUserAccessOnClick();
      this.showEditFeaturesScreen();
    }
  },
  navigateToLimitScreen : function(){
    if(this.validateRoleSelection()){
      this.showEditUserScreen();
      this.editUserAccessOnClick();
      this.showEditLimitsScreen(1);
    }    
  },
  navigateToSignatoryGroupScreen : function(){
    if(this.validateRoleSelection()){
      this.showEditUserScreen();
      this.editUserAccessOnClick();
      this.showSignatoryGroupScreen();
    }    
  },
  
  setAccountsSegmentData : function(accountsList){
    var self = this;
    var rowData = [];
    var sectionData = {};
    this.selAccCount = 0;
    accountsList.forEach(function(rec,key){
      rowData.push({
        "id":rec.accountId,
        "flxCheckbox":{
          "onClick":self.onClickAccountsEditUserAccess.bind(self,self.view.enrollEditAccountsCard.segAccountFeatures,false)
        },
        "lblCheckbox":{
          "isVisible":true,"text":rec.isAssociated === "true" ? self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl,
          "skin": rec.isAssociated === "false" ? "sknBgB7B7B7Sz20pxCheckbox" : "sknIconBg0066CASz20pxCheckbox",
        },
        "lblAccountNumber": {"text": rec.accountId},
        "lblAccountType": {"text": rec.accountType},
        "lblAccountName": {"text": rec.accountName},
        "lblAccountHolder": {"text": rec.ownerType || ""},
        "lblSeperator":"-",
        "template":"flxContractEnrollAccountsEditRow"
      });
      if(rec.isAssociated === "true") 
        self.selAccCount = self.selAccCount +1;
    });
   var sectionData = {
      "flxCheckbox":{
        "onClick": this.onCheckAccountsCheckboxAddUser.bind(this,this.view.enrollEditAccountsCard.segAccountFeatures,true)
      },
      "flxAccountNumCont":{
        "onClick":this.sortAndSetData.bind(this,"lblAccountNumber.text",this.view.enrollEditAccountsCard.segAccountFeatures, 1)
      },
      "lblIconSortAccName":{
        "text": "\ue92a",
        "skin": "sknIcon12pxBlack","hoverSkin" :"sknIcon12pxBlackHover",
        "left" : "10px"
      },
      "lblAccountNumber": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBER"),
      "lblSectionCheckbox": {
        "isVisible":true,
        "text":this.getHeaderCheckboxLabel(rowData,true,true)
      },
      "flxAccountType":{
         "onClick": this.showFilterForAccountsSectionClickAddUser.bind(this,1)
      },
      "lblAccountType": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE"),
      "lblIconFilterAccType":"\ue916",
      "lblAccountName": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME"),
      "lblIconAccNameSort":{
        "text": "\ue92b",
        "skin": "sknIcon15px","hoverSkin":"sknlblCursorFont",
        "left" : "5px"
      },
      "flxAccountName":{
        "onClick": this.sortAndSetData.bind(this,"lblAccountName.text", this.view.enrollEditAccountsCard.segAccountFeatures, 1)
      },
      "flxAccountHolder":{
         "onClick": this.showFilterForAccountsSectionClickAddUser.bind(this,2)
      },
      "lblAccountHolder": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE"),
      "lblIconSortAccHolder":"\ue916",
      "lblSeperator":"-",
      "template":"flxContractEnrollAccountsEditSection",
    };
    sectionData.lblSectionCheckbox.skin = this.applyCheckboxSkin(sectionData.lblSectionCheckbox);
    this.sortBy = this.getObjectSorter("lblAccountNumber.text");
    this.sortBy.inAscendingOrder = true;
    rowData = rowData.sort(this.sortBy.sortData);
    this.view.enrollEditAccountsCard.lblCount.text = this.getSelectedItemsCount(rowData, true);
    this.view.enrollEditAccountsCard.lblTotalCount.text = "of " + this.getTwoDigitNumber(rowData.length);
    this.view.enrollEditAccountsCard.segAccountFeatures.widgetDataMap = {
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
      "id":"id",
      "lblCheckbox":"lblCheckbox",
      "flxContractEnrollAccountsEditRow":"flxContractEnrollAccountsEditRow"
    };
    this.view.enrollEditAccountsCard.segAccountFeatures.setData([[sectionData,rowData]]);
    this.view.enrollEditAccountsCard.segAccountFeatures.info = {"segData":[[sectionData,rowData]], "segDataJSON":{}};
	 this.setDataToAccountsTabFilters();
    this.view.forceLayout();
  },
  setDataToAccountsTabFilters : function(){
    var self =this;
    var accountsData = this.view.enrollEditAccountsCard.segAccountFeatures.info.segData;
    var rowsData = accountsData.length > 0 ? accountsData[0][1]:[]
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
      if(!ownerTypeList.includes(rowsData[i].lblAccountHolder.text)){
        ownerTypeList.push(rowsData[i].lblAccountHolder.text);
      }    
    }
    var typesData = typesList.map(function(rec){
      maxSizeTypeText=rec && rec.length > maxSizeTypeText.length ? rec: maxSizeTypeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
        "lblDescription": rec || ""
      };
    });
    var ownershipData = ownerTypeList.map(function(rec){
      maxSizeOwnerTypeText=rec && rec.length > maxSizeOwnerTypeText.length ? rec: maxSizeOwnerTypeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
        "lblDescription": rec || ""
      }; 
    });
    this.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.widgetDataMap = widgetMap;

    this.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.setData(typesData);
    this.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.setData(ownershipData);

    this.view.flxAccountsFilterAddUser.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeTypeText)+55+"px";
    this.view.flxOwnershipFilterAddUser.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeOwnerTypeText)+55+"px";
    var selTypeInd = [],selOwnerInd = [];
    for(var j=0;j<typesList.length;j++){
      selTypeInd.push(j);
    }
    for(var k=0;k<ownerTypeList.length;k++){
      selOwnerInd.push(k);
    }
    self.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.selectedIndices = [[0,selTypeInd]];
    self.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.selectedIndices = [[0,selOwnerInd]];
    this.view.forceLayout();
  },
  searchFilterForAccounts : function(){
    var searchText = this.view.searchEditAccounts.tbxSearchBox.text;
    var accountsData = this.view.enrollEditAccountsCard.segAccountFeatures.info.segData;
    var sectionData = accountsData.length > 0 ? accountsData[0][0] :[];
    var rowsData = this.filterAccountsOnTypeOwnership();
    var filteredData = [], dataToSet;
    if(searchText.length >= 0){
      for(var i=0;i<rowsData.length;i++){
        if(rowsData[i].lblAccountName.text.toLowerCase().indexOf(searchText) >= 0 ||
           (rowsData[i].lblAccountNumber.text.indexOf(searchText) >= 0)){
          filteredData.push(rowsData[i]);
        }
      }
      sectionData.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(filteredData,true,true);
      sectionData.lblSectionCheckbox.skin = this.applyCheckboxSkin(sectionData.lblSectionCheckbox);
      if(filteredData.length > 0){
        dataToSet = [[sectionData,filteredData]];
        this.view.enrollEditAccountsCard.lblCount.text = this.getSelectedItemsCount(filteredData, true);
        this.view.enrollEditAccountsCard.lblTotalCount.text ="of "+ this.getTwoDigitNumber(filteredData.length);
      }else{
        dataToSet = [];
        this.view.enrollEditAccountsCard.lblCount.text = "0";
        this.view.enrollEditAccountsCard.lblTotalCount.text = "of 0";
      }
      this.view.enrollEditAccountsCard.segAccountFeatures.rowTemplate = "flxContractEnrollAccountsEditRow";
      this.view.enrollEditAccountsCard.segAccountFeatures.setData(dataToSet);
    } else{
      this.view.enrollEditAccountsCard.segAccountFeatures.setData(accountsData);
    }
    this.view.flxEditUserContainer.forceLayout();
  },
  filterAccountsOnTypeOwnership : function(){
    var selFilter = [[]];
    var dataToShow = [];
    var accountsData = this.view.enrollEditAccountsCard.segAccountFeatures.info.segData[0][1];
    var typeIndices = this.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.selectedIndices;
    var ownershipIndices = this.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];    
    var selTypeInd = null;
    var selOwnershipInd = null;
    //get selected types
    var types = "";
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter[0][0].push(this.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.data[selTypeInd[i]].lblDescription);
    }
    //get ownership types
    var types = "";
    selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter[0][1].push(this.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.data[selOwnershipInd[j]].lblDescription);
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToShow = [];
    }else if(selFilter[0][0].length ===this.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.data.length && selFilter[0][1].length==this.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.data.length)
      dataToShow= accountsData;
    else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = accountsData.filter(function(rec){
        if(selFilter[0][0].indexOf(rec.lblAccountType.text) >= 0 && selFilter[0][1].indexOf(rec.lblAccountHolder.text) >= 0){
          return rec;
        }
      });
    } else { //single filter selected
    }
    return dataToShow;
  },
  showFilterForAccountsSectionClickAddUser : function(option,event,context){
    if(option === 1)
      this.view.flxOwnershipFilterAddUser.setVisibility(false);
    else if(option === 2)
      this.view.flxAccountsFilterAddUser.setVisibility(false);
    var filterWidget = (option === 1) ? this.view.flxAccountsFilterAddUser :this.view.flxOwnershipFilterAddUser;
    var filterIcon = (option === 1) ? "lblIconFilterAccType":"lblIconSortAccHolder" ;
    
    var flxRight = context.widgetInfo.frame.width - event.frame.x - event.frame.width;
    var iconRight = event.frame.width - event[filterIcon].frame.x;
    filterWidget.right = (flxRight + iconRight - 22) + "dp";
    filterWidget.top =(this.view.enrollEditAccountsCard.flxCardBottomContainer.frame.y + 40) +"dp";
    if(filterWidget.isVisible){
      filterWidget.setVisibility(false);
    } else{
      filterWidget.setVisibility(true);
    }
  },
  onClickAccountsEditUserAccess : function(segmentPath, isHeader,eventObj,context){
    this.onCheckAccountsCheckboxAddUser(this.view.enrollEditAccountsCard.segAccountFeatures,false,eventObj,context);
    this.updateAccountSelectionEditUser(eventObj);
  },
  onCheckAccountsCheckboxAddUser : function(segmentPath, isHeader,eventObj,context) {
    var selSecInd = context.sectionIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0;
    //on section checkbox click
    if(isHeader){
      var img = (segSecData.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
          this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segSecData.lblSectionCheckbox.text = img;
      segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      var count = 0;
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].lblCheckbox.text =img;
        rowsData[i].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[i].lblCheckbox);
        if(img === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
          count =count +1;
      }
      //get selcted accounts count only for accounts of bulk update
      if(this.view.flxBulkUpdateFeaturesPopupForAddUser.isVisible === true){
        var selectedRowsCount = img === this.AdminConsoleCommonUtils.checkboxnormallbl ? "0" : "" + rowsData.length;
        segSecData.lblCountActions = selectedRowsCount;
      }else if(this.view.flxAddedUserEditAccountsContainer.isVisible === true){ //in edit user accounts
        this.view.enrollEditAccountsCard.lblCount.text = this.getTwoDigitNumber(count);
      }
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].lblCheckbox.text = (rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      rowsData[selInd].lblCheckbox.skin = this.applyCheckboxSkin( rowsData[selInd].lblCheckbox);
      segSecData.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(rowsData,true,true);
      segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      //get selcted accounts count only for accounts of bulk update
      var selectedRowsCount = this.getSelectedActionsCount(rowsData);
      if(this.view.flxBulkUpdateFeaturesPopupForAddUser.isVisible === true){
        segSecData.lblCountActions = selectedRowsCount;
      }else if(this.view.flxAddedUserEditAccountsContainer.isVisible === true){ //in edit user accounts
        this.view.enrollEditAccountsCard.lblCount.text = this.getTwoDigitNumber(selectedRowsCount);
      }
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //enable/disable save buttons
    var isValid = this.validateCheckboxSelections(segmentPath,true);
    if(this.view.flxBulkUpdateFeaturesPopupForAddUser.isVisible === true){ //in bulk update popup
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesPopupForAddUser.commonButtonsScreen1.btnSave,true,isValid);
    } else if(segmentPath.id === "segRelatedContractsList"){ //for select related contracts seg
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsRelatedDetails.btnSave,true,isValid);
    } else{ // for edit accounts
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave,true,isValid);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnNext,false,isValid);
      this.enableOrDisableVerticalTabEditUser(isValid);
    }   
  },
  updateAccountSelectionEditUser : function(eventObj){
    var selectedCustomerData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var accountSegData = this.view.enrollEditAccountsCard.segAccountFeatures.data[0][1];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selectedCustomerData.orignalData.coreCustomerId);
    var currUserAccMap = editUserObj.accounts;
    var count =0;
    for(var i=0; i< accountSegData.length; i++){
      var accObj = currUserAccMap.get(accountSegData[i].id);
      if(accountSegData[i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl){
        accObj.isEnabled = "true";
        accObj.isAssociated = "true";
        count =count+1;
      }else{
        accObj.isEnabled = "false";
        accObj.isAssociated = "false";
      }
      currUserAccMap.set(accountSegData[i].id,accObj);
    }
    this.selAccCount = count;
    editUserObj.accounts = currUserAccMap;
    this.presenter.setAccountsFeaturesForAddUser(selectedCustomerData.orignalData.coreCustomerId,editUserObj);
  },
  toggleFeaturesCustomerLevel : function(){
    this.view.toggleButtonsFeatures.info.selectedTab = 1;
    this.view.searchEditFeatures.tbxSearchBox.text="";
    this.view.searchEditFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.addedUserEditFeaturesCard.lblHeading.text =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomersController.SelectedFeatures")+":";
    this.toggleButtonsUtilFunction([this.view.toggleButtonsFeatures.btnToggleLeft,this.view.toggleButtonsFeatures.btnToggleRight],1);
    this.view.btnBulkUpdateFeatures.setVisibility(false);
    this.view.flxAddedUserEditFeaturesList.setVisibility(true);
    this.view.flxAddedUserEditAccFeaturesListCont.setVisibility(false);
    this.view.flxAddedUserEditFeatureFilter.setVisibility(false);
    this.view.forceLayout();
    this.view.flxAddedUserEditFeaturesList.height = (this.view.flxAddedUserEditFeatureButtons.frame.y - 170)+"dp" ;
    this.view.flxAddedUserEditFeaturesList.setContentOffset({x:0,y:0});
    this.createFeatureCardForCustomers();
  },
  toggleFeaturesAccountLevel : function(){
    this.view.toggleButtonsFeatures.info.selectedTab = 2;
    this.view.searchEditFeatures.tbxSearchBox.text="";
    this.view.searchEditFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumber");
    this.toggleButtonsUtilFunction([this.view.toggleButtonsFeatures.btnToggleLeft,this.view.toggleButtonsFeatures.btnToggleRight],2);
    this.view.btnBulkUpdateFeatures.setVisibility(true);
    this.view.flxAddedUserEditFeaturesList.setVisibility(false);
    this.view.flxAddedUserEditAccFeaturesListCont.setVisibility(true);
    this.view.flxAddedUserEditFeatureFilter.setVisibility(true);
    this.createFeatureCardForAccounts();
    this.setAccountTypesFilter(1);
    this.view.forceLayout();
    this.view.flxAddedUserEditAccFeaturesListCont.height = (this.view.flxAddedUserEditFeatureButtons.frame.y - 175)+"dp" ;
    this.view.flxAddedUserEditAccFeaturesListCont.setContentOffset({x:0,y:0});
    this.setFilterDataInFeaturesLimitsTab();
  },
  toggleLimitsCustomerLevel : function(){
    this.view.toggleButtonsLimits.info.selectedTab = 1;
    this.view.searchEditLimits.tbxSearchBox.text = "";
    this.view.searchEditLimits.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumber");
    this.toggleButtonsUtilFunction([this.view.toggleButtonsLimits.btnToggleLeft,this.view.toggleButtonsLimits.btnToggleRight],1);
    this.view.btnBulkUpdateLimits.setVisibility(false);
    this.view.flxAddedUserEditLimitsList.setVisibility(true);
    this.view.flxAddedUserEditAccLimitsListCont.setVisibility(false);
    this.view.flxAddedUserEditLimitsFilter.setVisibility(false);
    this.view.flxAddedUserEditLimitsSearchFilterCont.setVisibility(false);
    this.view.forceLayout();
    this.view.flxAddedUserEditLimitsList.height = (this.view.flxAddedUserEditLimitsButtons.frame.y - 170)+"dp" ;
    this.view.flxAddedUserEditLimitsList.setContentOffset({x:0,y:0});
    this.createLimitCardForCustomers();
  },
  toggleLimitsAccountLevel : function(){
    this.view.toggleButtonsLimits.info.selectedTab = 2;
    this.toggleButtonsUtilFunction([this.view.toggleButtonsLimits.btnToggleLeft,this.view.toggleButtonsLimits.btnToggleRight],2);
    this.view.btnBulkUpdateLimits.setVisibility(true);
    this.view.flxAddedUserEditLimitsList.setVisibility(false);
    this.view.flxAddedUserEditAccLimitsListCont.setVisibility(true);
    this.view.flxAddedUserEditLimitsFilter.setVisibility(true);
    this.view.flxAddedUserEditLimitsSearchFilterCont.setVisibility(true);
    this.view.forceLayout();
    this.setAccountTypesFilter(2);
    this.view.flxAddedUserEditAccLimitsListCont.height = (this.view.flxAddedUserEditLimitsButtons.frame.y - 175)+"dp" ;
    this.view.flxAddedUserEditAccLimitsListCont.setContentOffset({x:0,y:0});
    this.createLimitsCardForAccounts();
    this.setFilterDataInFeaturesLimitsTab(2);
  },
  createFeatureCardForCustomers : function(){
    this.view.addedUserEditFeaturesCard.toggleCollapseArrow(true);
    this.view.addedUserEditFeaturesCard.flxArrow.setVisibility(false);
    this.view.addedUserEditFeaturesCard.flxSelectAllOption.setVisibility(true);
    this.view.addedUserEditFeaturesCard.lblName.skin = "sknLbl117EB0LatoReg14px";
    this.view.addedUserEditFeaturesCard.lblName.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    this.storeActionForAccountSelection();
    this.view.addedUserEditFeaturesCard.lblTotalCount.text = "of "+ this.getTwoDigitNumber(editUserObj.accLevelFeatures.length);
    this.view.addedUserEditFeaturesCard.segAccountFeatures.info = {"parentId":"addedUserEditFeaturesCard","segData":[],"featuresType":1, "segDataJSON":{}};
    this.setFeaturesCardSegmentData(this.view.addedUserEditFeaturesCard.segAccountFeatures, editUserObj.accLevelFeatures);
    this.view.addedUserEditFeaturesCard.flxCheckbox.onClick = this.onSelectAllFeaturesClickAddUser.bind(this,this.view.addedUserEditFeaturesCard);
    this.view.addedUserEditFeaturesCard.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(this.view.addedUserEditFeaturesCard.segAccountFeatures.data,false, true);
    this.view.addedUserEditFeaturesCard.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.addedUserEditFeaturesCard.lblSectionCheckbox);
  },
  createFeatureCardForAccounts : function(searchFilterData){
    var self =this;
    this.pageCount = {
      "PAGE_OFFSET": 0
    };
    var compWidth = this.view.flxAddedUserEditFeaturesContainer.frame.width -40;
    var accSize = 0;
    if (searchFilterData === undefined) {
      var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
      var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
      var accLevelFeaturesMap = editUserObj.accountMapFeatures;
      accSize = accLevelFeaturesMap.size;
    } else {
      accSize = searchFilterData.length;
    }
    this.resetPaginationValues(accSize,1);
    this.pageCount.TOTAL_PAGES = Math.ceil(accSize/10);
    //in case no features available
    if (accSize === 0) {
      this.view.flxAddedUserEditAccFeaturesListCont.setVisibility(false);
      this.view.flxAddedUserEditFeaturesSearchFilterCont.setVisibility(false);
      this.view.btnBulkUpdateFeatures.setVisibility(false);
      this.view.flxFeaturesPagination.setVisibility(false);
      this.view.forceLayout();
    } else {
      this.view.flxAddedUserEditAccFeaturesListCont.setVisibility(true);
      this.view.flxAddedUserEditFeaturesSearchFilterCont.setVisibility(true);
      this.view.btnBulkUpdateFeatures.setVisibility(true);
      this.view.flxFeaturesPagination.setVisibility(accSize > 10);
      var end = accSize > 10 ? 10 : accSize;
      this.createDynamicAccountFeatureCards(0, end, searchFilterData);
      this.pageCount.PAGE_OFFSET = end;
    }
  },
  /*
  * set pagination values to initial page
  */
  resetPaginationValues : function(dataLen,option){
    var compPath=option===1?this.view.cardPaginationFeatures:this.view.cardPaginationLimits;
    this.loadMoreModel = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : compPath.lblShowing.info
    };
    var totalRecords=dataLen?dataLen:compPath.lblShowing.info;
    compPath.lblNumber.text = "1";
    compPath.tbxPageNumber.text = "1";
    var nextSetCount=totalRecords<10?totalRecords:10;
    compPath.lblShowing.text = "Showing 1 - "+nextSetCount+" Of " + totalRecords;
    compPath.lblShowing.info=totalRecords;
  },
  updatePaginationValues : function(currentPage,option){
    var compPath=option===1?this.view.cardPaginationFeatures:this.view.cardPaginationLimits;
    compPath.lblNumber.text = currentPage;
    compPath.tbxPageNumber.text = currentPage;
    var nextSetCount=currentPage*10<parseInt(compPath.lblShowing.info)?currentPage*10:compPath.lblShowing.info;
    compPath.lblShowing.text = "Showing "+ (currentPage*10-9)+" - "+nextSetCount+" Of " + compPath.lblShowing.info;
    this.view.forceLayout();
  },
   /*
  * create account cards for account level features 
  */
  createDynamicAccountFeatureCards: function (start, end, searchFilterData) {
    var self = this;
    var i = 0, accCardCount = 0;
    var accLevelFeaturesMapKeys = [];
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    this.view.flxAddedUserEditAccFeaturesList.removeAll();
    if (searchFilterData === undefined) {
      var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
      var accLevelFeaturesMap = editUserObj.accountMapFeatures;
      accLevelFeaturesMapKeys = Array.from(accLevelFeaturesMap.values());
    } else {
      accLevelFeaturesMapKeys = searchFilterData;
    }
    var compWidth = this.view.flxAddedUserEditFeaturesContainer.frame.width -40;
    end = end > accLevelFeaturesMapKeys.length ? accLevelFeaturesMapKeys.length : end;
    for (var x = start; x < end; x++) {
      var valueObj = accLevelFeaturesMapKeys[x];
      //show only accounts that have been selected
      if (valueObj.accountDetails.isEnabled === "true" || valueObj.accountDetails.isAssociated === "true") {
        var num = x > 10 ? x : "0" + x;
        var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
          "id": "featureCard" + num,
          "isVisible": true,
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "left": "20dp",
          "width": compWidth + "dp",
          "top": "15dp"
        }, {}, {});
        i = i + 1;
         featureCardToAdd.flxArrow.onClick = self.toggleCardListVisibility.bind(self,featureCardToAdd,self.view.flxAddedUserEditAccFeaturesList,1);
        featureCardToAdd.flxSelectAllOption.isVisible = true;
        featureCardToAdd.flxCheckbox.onClick = self.onSelectAllFeaturesClickAddUser.bind(self,featureCardToAdd);
        featureCardToAdd.lblSectionCheckbox.isVisible = true;
    	featureCardToAdd.imgSectionCheckbox.isVisible = false;
        featureCardToAdd.segAccountFeatures.info = {"parentId":featureCardToAdd.id,"segData":[],"featuresType":2, "segDataJSON":{}};
        if (JSON.parse(valueObj.features).length > 0) {
          accCardCount = accCardCount + 1;
          self.view.flxAddedUserEditAccFeaturesList.add(featureCardToAdd);
          self.setAccountFeatureCardData(featureCardToAdd, valueObj);
        }
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.flxAddedUserEditAccFeaturesListCont.setContentOffset({x:0,y:0});
    this.view.forceLayout();
  },

  createLimitCardForCustomers : function(){
    this.view.addedUserEditLimitsCard.flxCardBottomContainer.setVisibility(true);
    this.view.addedUserEditLimitsCard.flxArrow.setVisibility(false);
    this.view.addedUserEditLimitsCard.toggleCollapseArrow(true);
    this.view.addedUserEditLimitsCard.lblName.skin = "sknLbl117EB0LatoReg14px";
    this.view.addedUserEditLimitsCard.lblName.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
    this.view.addedUserEditLimitsCard.btnReset.setVisibility(true);
    this.createLimitsRowsForCustLevel();
  },
  createLimitsRowsForCustLevel : function(){
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures,editUserObj.accLevelLimits,false,editUserObj.limitGroups);
    editUserObj.limitGroups = updateLimitGroupMaxValues;
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
    var limitGroups = updateLimitGroupMaxValues;
    this.view.addedUserEditLimitsCard.btnReset.onClick = this.showResetLimitsUserPopup.bind(this,1);
    this.view.addedUserEditLimitsCard.segAccountFeatures.setVisibility(false);
    this.view.addedUserEditLimitsCard.reportPagination.setVisibility(false);
    this.view.addedUserEditLimitsCard.flxDynamicWidgetsContainer.setVisibility(true);
    this.view.addedUserEditLimitsCard.flxDynamicWidgetsContainer.removeAll();
    this.view.lblCurrencySymbol1.text = self.defaultCurrencyCodeSymbol;
    this.view.lblCurrencySymbol2.text = self.defaultCurrencyCodeSymbol;
    this.view.lblCurrencySymbol3.text = self.defaultCurrencyCodeSymbol;
    for(var i=0; i<limitGroups.length; i++){
      //ignore third type of limit group
      if(limitGroups[i].limitGroupId && limitGroups[i].limitGroupId !== "N/A" &&
         limitGroups[i].limitGroupId !== "ACCOUNT_TO_ACCOUNT"){
        var num = i>10 ? i : "0"+i;
        var limitRowToAdd = this.view.flxEnrollEditLimitsTemplate.clone(num);
        limitRowToAdd.isVisible = true;  
        this.view.addedUserEditLimitsCard.flxDynamicWidgetsContainer.add(limitRowToAdd);
        this.setDataToCustLimitTextBox(limitGroups[i], num);
        this.view.addedUserEditLimitsCard[num+"lblLimitsHeading"].text = (limitGroups[i].limitGroupId.indexOf("SINGLE_PAYMENT") >= 0) ?
          "SINGLE TRANSACTION LIMITS" :"BULK TRANSACTION LIMITS";
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue1"].onTouchStart = this.showHideRange.bind(this,num,"1",true);
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue1"].onEndEditing = this.showHideRange.bind(this,num,"1",false);
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue2"].onTouchStart = this.showHideRange.bind(this,num,"2",true);
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue2"].onEndEditing = this.showHideRange.bind(this,num,"2",false);
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue3"].onTouchStart = this.showHideRange.bind(this,num,"3",true);
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue3"].onEndEditing = this.showHideRange.bind(this,num,"3",false);
        
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue1"].onTextChange = this.updateCustLimitGroupValueEditUser.bind(this,num,"1");
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue2"].onTextChange = this.updateCustLimitGroupValueEditUser.bind(this,num,"2");
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue3"].onTextChange = this.updateCustLimitGroupValueEditUser.bind(this,num,"3");
      }
    }
  },
  showHideRange : function(id,rowNum,option){
    this.view.addedUserEditLimitsCard[id+"flxLimitError"+rowNum].isVisible = false;
    this.view.addedUserEditLimitsCard[id+"flxLimitValue"+rowNum].skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    if(option === true){
      this.view.addedUserEditLimitsCard[id+"flxRangeCont"+rowNum].isVisible = true;
      this.view.addedUserEditLimitsCard[id+"flxLimitValue"+rowNum].skin = "sknFlxBorder117eb0radius3pxbgfff"; //set focus skin
    } else{
      this.view.addedUserEditLimitsCard[id+"flxRangeCont"+rowNum].isVisible = false;
      this.view.addedUserEditLimitsCard[id+"flxLimitValue"+rowNum].skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    }
    this.view.forceLayout();
  },
  setDataToCustLimitTextBox : function(limitsGroup, num){
    for(var i=0; i<limitsGroup.limits.length; i++){
      if(limitsGroup.limits[i].id === this.limitId.MAX_TRANSACTION_LIMIT){
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue1"].text = limitsGroup.limits[i].value;
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue1"].info = {"maxValue":limitsGroup.limits[i].maxValue,
                                                                     "id":limitsGroup.limitGroupId,
                                                                     "type": limitsGroup.limits[i].id};
        this.view.addedUserEditLimitsCard[num+"lblRangeValue1"].text = " 0 - " +limitsGroup.limits[i].maxValue;
      } 
      else if(limitsGroup.limits[i].id === this.limitId.DAILY_LIMIT){
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue2"].text = limitsGroup.limits[i].value;
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue2"].info = {"maxValue":limitsGroup.limits[i].maxValue,
                                                                     "id":limitsGroup.limitGroupId,
                                                                     "type": limitsGroup.limits[i].id};
        this.view.addedUserEditLimitsCard[num+"lblRangeValue2"].text = " 0 - " +limitsGroup.limits[i].maxValue;
      } 
      else if(limitsGroup.limits[i].id === this.limitId.WEEKLY_LIMIT){
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue3"].text = limitsGroup.limits[i].value;
        this.view.addedUserEditLimitsCard[num+"tbxLimitValue3"].info = {"maxValue":limitsGroup.limits[i].maxValue,
                                                                     "id":limitsGroup.limitGroupId,
                                                                     "type": limitsGroup.limits[i].id};
        this.view.addedUserEditLimitsCard[num+"lblRangeValue3"].text = " 0 - " +limitsGroup.limits[i].maxValue;
      }
    }
  },
  updateCustLimitGroupValueEditUser : function(flxId, rowId, eventObj){
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var limitGroup = editUserObj.limitGroups;
    for(var i=0;i<limitGroup.length;i++){
      if(limitGroup[i].limitGroupId === eventObj.info.id){
        for(var j=0; j<limitGroup[i].limits.length; j++){
          if(limitGroup[i].limits[j].id === eventObj.info.type)
            limitGroup[i].limits[j].value = eventObj.text;
        }
      }
    }
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  validateLimitGroupEditUser : function(){
    var errorCustId =[];
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var limitGroups = editUserObj.limitGroups;
    var custId = selCustData.orignalData.coreCustomerId;
    var childFlex = this.view.addedUserEditLimitsCard.flxDynamicWidgetsContainer.widgets();
    //var id = childFlex.id.substr(0,2);
    var limitValidationObj = {};
    limitValidationObj[custId] = {};
    for(var i=0;i <limitGroups.length; i++){
      var errorJson = this.validateLimitGroupValuesEditUserObj(limitGroups[i]);
      limitValidationObj[custId][limitGroups[i].limitGroupId] = errorJson.error;
      //save the cust id with error
      if(errorJson.isValid === false && errorCustId.indexOf(custId) < 0){
        errorCustId.push(custId);
      }
    }
    this.limitGroupsValidationObject = limitValidationObj;
    var allLimitsValid = errorCustId.length > 0 ? false : true;
    return allLimitsValid;
  },
  validateAllLimitsEditUser : function(){
    var custArr =[],isValid = true, updateLimitGroupMaxValues = [], editUserObj;
    var dropdownSelectedCust = this.view.segEnrollCustList.data[this.enrollSegRowInd];

    editUserObj = this.presenter.getAccountsFeaturesForAddUser(dropdownSelectedCust.orignalData.coreCustomerId);
    updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures,editUserObj.accLevelLimits,false,editUserObj.limitGroups);
    editUserObj.limitGroups = updateLimitGroupMaxValues;
    this.presenter.setAccountsFeaturesForAddUser(dropdownSelectedCust.orignalData.coreCustomerId,editUserObj);
    custArr.push(dropdownSelectedCust);
    //validate for each customer id
    for(var j=0; j<custArr.length;j++){
      var isLimitGroupValid = this.validateLimitGroupEditUser(custArr[j]);
      var isLimitValid = this.validateAccLimitEditUser(custArr[j]);
      if(isLimitGroupValid === false ){ //customer tab in limits
        //show the limits screen and respective tab
        //if(this.view.flxAddedUserEditAccLimitsList === false){
          if(this.view.flxAddedUserEditLimitsContainer.isVisible === false){
          this.showEditLimitsScreen(1);
        }else{
          this.toggleLimitsCustomerLevel();
        }
        this.setErrorLimitGroupEditUser(custArr[j]);
        isValid = false;
        break;
      } else if(isLimitValid === false){ //accounts tab in limits
        //show the limits screen and respective tab
        //if(this.view.flxAddedUserEditAccLimitsList === false){
        if(this.view.flxAddedUserEditLimitsContainer.isVisible === false){  
          this.showEditLimitsScreen(2);
        } else{
          this.toggleLimitsAccountLevel()
        }
        //this.setErrorForLimitValuesAfterValidation(custArr[j]);
        isValid = false;
        break;
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    return isValid;
  },
  /*
  * show popup forr reset limits in add users flow
  * @param: option(customer level:1,acc level:2), cardwidget Path
  */
  showResetLimitsUserPopup : function(option,cardWidgetPath){
    var self = this;
    this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.ResetLimits");
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AreYouSureToResetLimits");
    this.view.suspendFeaturePopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    this.view.flxSuspendFeaturePopup.setVisibility(true);
    
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function(){
      if(option === 1){ //cust level
        self.resetLimitGroupValuesUsers();
      }else { //account level
        self.resetLimitValuesEditUser(cardWidgetPath);
      }
      self.view.flxSuspendFeaturePopup.setVisibility(false);
    };
  },
  /*
  * reset the limit values under an account
  * selected card widget path
  */
  resetLimitValuesEditUser: function (cardWidgetPath) {
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custId = selCustData.orignalData.coreCustomerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var accountDetails = cardWidgetPath.info.accDetails;
    var currUserLimitsMap = editUserObj.accLevelLimits;
    var accNum = accountDetails.accountNumber || accountDetails.accountId;
    var currAccObj = currUserLimitsMap.get(accNum);
    var featureLimits = JSON.parse(currAccObj.limits);
    //update the actual limits in edit object
    for (var i = 0; i < featureLimits.length; i++) {
      var actionsArr = featureLimits[i].actions || featureLimits[i].permissions;
      for (var j = 0; j < actionsArr.length; j++) {
        if (actionsArr[j].limits) {
          //if(this.enrollAction !== this.actionConfig.editUser){
          if (actionsArr[j].actualLimits.length <= 3) {
            actionsArr[j].limits = this.addNewLimitsToExistingLimits(actionsArr[j].actualLimits);
          } else if (actionsArr[j].actualLimits.length >= 9) {
            actionsArr[j].limits = this.getLimitValuesJsonFromArray(actionsArr[j].actualLimits);
          }
        }
      }
    }
    currAccObj.limits = JSON.stringify(featureLimits);
    currUserLimitsMap.set(accNum, currAccObj);
    if(this.limitsValidationObject[custId])
      this.limitsValidationObject[custId][accNum] ={};
    this.presenter.setAccountsFeaturesForAddUser(custId, editUserObj);
    //update the limit values in segment
    this.setLimitsAtAccountLevel(cardWidgetPath.segAccountFeatures, featureLimits, custId, 2);
  },
  /*
  * reset the limit groups values of customer
  */
  resetLimitGroupValuesUsers : function(){
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures,editUserObj.accLevelLimits,false,editUserObj.limitGroups); 
    //update the actual values in edit obj
    for(var i=0; i<updateLimitGroupMaxValues.length; i++){
      for(var j=0; j<updateLimitGroupMaxValues[i].limits.length; j++){
        updateLimitGroupMaxValues[i].limits[j].value = updateLimitGroupMaxValues[i].limits[j].maxValue+"";;
      }
    }
    editUserObj.limitGroups =updateLimitGroupMaxValues;
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
    //update the limit values in segment
    this.createLimitsRowsForCustLevel();
  },
  validateLimitGroupValuesEditUserObj : function(limitGroup){
    var errorObj={}, isValid = true;
    var limitGroupId = limitGroup.limitGroupId;
    var limitGroupObj = {};
    var limits = limitGroup.limits;
    for(var i=0;i<limits.length;i++){
      limitGroupObj[limits[i].id] = {"value":limits[i].value ? limits[i].value+"" : "0"};
      if(parseFloat(limits[i].value) > parseFloat(limits[i].maxValue)){
        errorObj[limits[i].id]= {"error": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeGreaterThanMaxValue"),
                                  "id":limits[i].id};
        isValid = false;
      }else if(limits[i].value === ""){
        errorObj[limits[i].id] = {"error":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty"),
                                  "id":limits[i].id};
        isValid = false;
      }else if(parseFloat(limits[i].value < 0)){
        errorObj[limits[i].id] = {"error":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeNegative"),
                                  "id":limits[i].id};
        isValid = false;
      }
    }
    //inter limitgroup values validations
    var transLimitVal = limitGroupObj[this.limitId.MAX_TRANSACTION_LIMIT] ? limitGroupObj[this.limitId.MAX_TRANSACTION_LIMIT].value : "0";
    var dailyLimitVal = limitGroupObj[this.limitId.DAILY_LIMIT] ? limitGroupObj[this.limitId.DAILY_LIMIT].value : "0";
    var weeklyLimitVal = limitGroupObj[this.limitId.WEEKLY_LIMIT] ? limitGroupObj[this.limitId.WEEKLY_LIMIT].value : "0";
    if(isValid === true){
      if(parseFloat(transLimitVal) >parseFloat(dailyLimitVal)){
        errorObj[this.limitId.MAX_TRANSACTION_LIMIT] = {"error": kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit"),
                                                        "id":this.limitId.MAX_TRANSACTION_LIMIT};
        isValid = false;
      }
      if(parseFloat(dailyLimitVal) > parseFloat(weeklyLimitVal)){
        errorObj[this.limitId.DAILY_LIMIT] = {"error": kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit"),
                                              "id":this.limitId.DAILY_LIMIT};
        isValid = false;
        if(parseFloat(transLimitVal) > parseFloat(weeklyLimitVal) && (parseFloat(transLimitVal) <= parseFloat(dailyLimitVal))){
          errorObj[this.limitId.MAX_TRANSACTION_LIMIT] = {"error": kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit"),
                                                          "id":this.limitId.MAX_TRANSACTION_LIMIT};
        }
      }
    }
    return {"error":errorObj, "isValid":isValid};
  },
  setErrorLimitGroupEditUser : function(){
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custId = selCustData.orignalData.coreCustomerId;
    var currCustErrorObj = this.limitGroupsValidationObject[custId];
    var childFlex = this.view.addedUserEditLimitsCard.flxDynamicWidgetsContainer.widgets();
    
    for(var i=0; i<childFlex.length; i++){
      var id = childFlex[i].id.substr(0,2);
      var limitGroupId = this.view.addedUserEditLimitsCard[id+"tbxLimitValue1"].info.id;
      var typeIdArr = Object.keys(currCustErrorObj[limitGroupId]);
      for(var j=0; j<typeIdArr.length; j++){
        if(typeIdArr[j] === this.limitId.MAX_TRANSACTION_LIMIT){
          this.view.addedUserEditLimitsCard[id+"flxRangeCont1"].setVisibility(false);
          this.view.addedUserEditLimitsCard[id+"flxLimitError1"].setVisibility(true);
          this.view.addedUserEditLimitsCard[id+"lblLimitErrorMsg1"].text = currCustErrorObj[limitGroupId][typeIdArr[j]].error;
          this.view.addedUserEditLimitsCard[id+"flxLimitValue1"].skin = "sknFlxCalendarError";                                                                                           
        }else if(typeIdArr[j] === this.limitId.DAILY_LIMIT){
          this.view.addedUserEditLimitsCard[id+"flxRangeCont2"].setVisibility(false);
          this.view.addedUserEditLimitsCard[id+"flxLimitError2"].setVisibility(true);
          this.view.addedUserEditLimitsCard[id+"lblLimitErrorMsg2"].text = currCustErrorObj[limitGroupId][typeIdArr[j]].error;
          this.view.addedUserEditLimitsCard[id+"flxLimitValue2"].skin = "sknFlxCalendarError";     
        }else if(typeIdArr[j] === this.limitId.WEEKLY_LIMIT){
          this.view.addedUserEditLimitsCard[id+"flxRangeCont3"].setVisibility(false);
          this.view.addedUserEditLimitsCard[id+"flxLimitError3"].setVisibility(true);
          this.view.addedUserEditLimitsCard[id+"lblLimitErrorMsg3"].text = currCustErrorObj[limitGroupId][typeIdArr[j]].error;
          this.view.addedUserEditLimitsCard[id+"flxLimitValue3"].skin = "sknFlxCalendarError";     
        }
      }
    }
    this.view.forceLayout();
  },
  validateAccLimitEditUser : function(custId){
    var self = this;
    var limitsValidation = {},errorCustIdArr =[];
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custId = selCustData.orignalData.coreCustomerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var currUserLimitsMap = editUserObj.accLevelLimits;
    limitsValidation[custId] = {};
    currUserLimitsMap.forEach(function(accountObj, key){
      limitsValidation[custId][key] = {};
      if(accountObj.accountDetails.isEnabled === "true" || accountObj.accountDetails.isAssociated === "true"){
        var featuresLimit = JSON.parse(accountObj.limits);
        for(var i=0;i<featuresLimit.length;i++){
          var currActions = featuresLimit[i].actions || featuresLimit[i].permissions;
          for(var j=0;j<currActions.length; j++){
            var errorObj = self.validateAccLimitValuesEditUserObj(currActions[j].limits);
            if(errorObj.error && Object.keys(errorObj.error).length > 0)
                limitsValidation[custId][key][currActions[j].actionId] = errorObj.error;
            //save custId is invalid
            if(errorObj.isValid === false && errorCustIdArr.indexOf(custId) < 0){
              errorCustIdArr.push(custId)
            }
          }
        }
      }
    });
    this.limitsValidationObject = limitsValidation;
    //not valid
    if(errorCustIdArr.length > 0){
      
    }else{ //valid
      
    }
    var allActionsValid = errorCustIdArr.length > 0 ? false : true;
    return allActionsValid;
  },
  validateAccLimitValuesEditUserObj : function(limitObj){
    var errorObj = {}, isValid = true;;
    var negativeErrorText=kony.i18n.getLocalizedString("i8n.frmCreateCustomerController.warning.value_cannot_negative");
    var emptyValueText= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
    // cunvert currency format to float
    var max_trans_limit=parseFloat((limitObj[this.limitId.MAX_TRANSACTION_LIMIT]+"").replace(/[^0-9.-]+/g,"")); 
    var max_daily_limit=parseFloat((limitObj[this.limitId.DAILY_LIMIT]+"").replace(/[^0-9.-]+/g,"")); 
    var max_weekly_limit=parseFloat((limitObj[this.limitId.WEEKLY_LIMIT]+"").replace(/[^0-9.-]+/g,""));
    
    //per transaction - auto deny
    var perTranAD ={};
    if(limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] === "" || parseFloat(limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT])<0){
      perTranAD.error = limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT]===""? emptyValueText : negativeErrorText;
      isValid=false;
      perTranAD.typeId = this.limitId.AUTO_DENIED_TRANSACTION_LIMIT;
      errorObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = perTranAD;
    }
    else if(parseFloat(limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT])> max_trans_limit){
      perTranAD.typeId = this.limitId.AUTO_DENIED_TRANSACTION_LIMIT;
      perTranAD.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanTransLimit");
      isValid = false;
      errorObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = perTranAD;
    }else if(parseFloat(limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT]) > parseFloat(limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT])){
      perTranAD.typeId = this.limitId.AUTO_DENIED_TRANSACTION_LIMIT;
      perTranAD.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADDLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = perTranAD;
    }
    
    //per transaction - pre approved
    var perTranPA ={};
    if(limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] === "" || parseFloat(limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT])<0){
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      perTranPA.error = limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT]===""? emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    }
    else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT])> max_trans_limit){
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      perTranPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanTransLimit");
      isValid = false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    } else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT]) > parseFloat(limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT])){
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      perTranPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADTLimit");
      isValid = false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    } else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT]) > parseFloat(limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT])){
      perTranPA.error =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanPADLimit");
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    }
    
     //daily - auto deny
    var dailyAD = {};
    if(limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT]==="" || parseFloat(limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT])<0){
      dailyAD.typeId = this.limitId.AUTO_DENIED_DAILY_LIMIT;
      dailyAD.error = limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT]===""?emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] = dailyAD;
    }else if(parseFloat(limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT])>max_daily_limit){
      dailyAD.typeId = this.limitId.AUTO_DENIED_DAILY_LIMIT;
      dailyAD.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] = dailyAD;
    } else if(parseFloat(limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT]) > parseFloat(limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT])){
      dailyAD.typeId = this.limitId.AUTO_DENIED_DAILY_LIMIT;
      dailyAD.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADWLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] = dailyAD;
    }

    //daily - pre approved
    var dailyPA = {};
    if(limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT]==="" || parseFloat(limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT])<0){
      dailyPA.error = limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT]==="" ? emptyValueText : negativeErrorText;
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    }else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT]) > max_daily_limit){
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      dailyPA.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    }else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT]) > parseFloat(limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT])){
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      dailyPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADDLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    }else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT]) > parseFloat(limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT])){
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      dailyPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanPAWLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    }
    
    //weekly- auto deny
    var weeklyAD = {};
    if(limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT]==="" || parseFloat(limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT])<0){
      weeklyAD.typeId = this.limitId.AUTO_DENIED_WEEKLY_LIMIT;
      weeklyAD.error = limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT]==="" ? emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT] = weeklyAD;
    }else if(parseFloat(limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT])>max_weekly_limit){
      weeklyAD.typeId = this.limitId.AUTO_DENIED_WEEKLY_LIMIT;
      weeklyAD.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT] = weeklyAD;
    }
    
    //weekly- pre approved
    var weeklyPA = {};
    if(limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT]==="" || parseFloat(limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT])<0){
      weeklyPA.typeId = this.limitId.PRE_APPROVED_WEEKLY_LIMIT;
      weeklyPA.error = limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT]==="" ? emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = weeklyPA;
    }else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT])>max_weekly_limit){
      weeklyPA.typeId = this.limitId.PRE_APPROVED_WEEKLY_LIMIT;
      weeklyPA.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = weeklyPA;
    }else if(parseFloat(limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT]) > parseFloat(limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT])){
      weeklyPA.typeId = this.limitId.PRE_APPROVED_WEEKLY_LIMIT;
      weeklyPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADWLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = weeklyPA;
    }
    
    return {"error":errorObj,"isValid":isValid};
  },
  setErrorForLimitValuesAfterValidation : function(){
    var isValid = true;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custId = selCustData.orignalData.coreCustomerId;
    var limitErrorForCust = this.limitsValidationObject[custId];
    var accountFlx = this.view.flxAddedUserEditAccLimitsList.widgets();
    for(var i=0;i<accountFlx.length;i++){
      isValid = true;
      var accfeatures = limitErrorForCust[accountFlx[i].info.accDetails.accountId];
      if(accfeatures && Object.keys(accfeatures).length > 0){
        var segData = accountFlx[i].segAccountFeatures.data;
        for(var j=0; j<segData.length; j++){
          var errorActionsId = Object.keys(accfeatures);
          var actionHasError = false;
          for(var a=0; a<segData[j][1].length; a++){
            var updatedRowJson;
            actionHasError = accfeatures[segData[j][1][a].id] && Object.keys(accfeatures[segData[j][1][a].id]).length > 0 ? true : false;
            if(errorActionsId.indexOf(segData[j][1][a].id) >= 0 && actionHasError === true){
              updatedRowJson = this.updatedRowWithErrorCheck(segData[j][1][a],accfeatures);
              segData[j][1][a] = updatedRowJson;
              isValid = false;
            }
          }
          //show expand section arrow for error
          if(actionHasError){
            segData[j][0].lblIconToggleArrow.text = "\ue915";
            segData[j][0].lblIconToggleArrow.skin = "sknfontIconDescDownArrow12px";
            if(j < (segData.length-1)){
              segData[j+1][0].lblTopSeperator.isVisible = true;
            }
            accountFlx[i].segAccountFeatures.setSectionAt(segData[j],j);
          }
        }
        accountFlx[i].toggleCollapseArrow(!isValid);
        //accountFlx[i].segAccountFeatures.setData(segData);
      }
    }
    this.view.forceLayout();
  },
  updatedRowWithErrorCheck : function(rowData, errorObj){
    var currActionError = errorObj[rowData.id];
    var currErrorLimitArr = Object.keys(currActionError);
    rowData = this.clearAccLevelLimitErrorEditUser(rowData);
    if(currErrorLimitArr.indexOf(this.limitId.PRE_APPROVED_TRANSACTION_LIMIT) >= 0){
      rowData.flxColumn11.isVisible =true;
      rowData.txtPerTransPreApprovedLimit.skin ="sknTbxFFFFFFBrE32416R3pxLato13px";
      rowData.lblErrorMsg11.text = currActionError[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT].error;
    }
    if(currErrorLimitArr.indexOf(this.limitId.AUTO_DENIED_TRANSACTION_LIMIT) >= 0){
      rowData.flxColumn12.isVisible =true;
      rowData.txtPerTransAutoDenyLimits.skin ="sknTbxFFFFFFBrE32416R3pxLato13px";
      rowData.lblErrorMsg12.text = currActionError[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT].error;
    }
    if(currErrorLimitArr.indexOf(this.limitId.PRE_APPROVED_DAILY_LIMIT) >= 0){
      rowData.flxColumn21.isVisible =true;
      rowData.txtDailyTransPreApprovedLimit.skin ="sknTbxFFFFFFBrE32416R3pxLato13px";
      rowData.lblErrorMsg21.text = currActionError[this.limitId.PRE_APPROVED_DAILY_LIMIT].error;
    }
    if(currErrorLimitArr.indexOf(this.limitId.AUTO_DENIED_DAILY_LIMIT) >= 0){
      rowData.flxColumn22.isVisible =true;
      rowData.txtDailyTransAutoDenyLimits.skin ="sknTbxFFFFFFBrE32416R3pxLato13px";
      rowData.lblErrorMsg22.text = currActionError[this.limitId.AUTO_DENIED_DAILY_LIMIT].error;
    }
    if(currErrorLimitArr.indexOf(this.limitId.PRE_APPROVED_WEEKLY_LIMIT) >= 0){
      rowData.flxColumn31.isVisible =true;
      rowData.txtWeeklyTransPreApprovedLimit.skin ="sknTbxFFFFFFBrE32416R3pxLato13px";
      rowData.lblErrorMsg31.text = currActionError[this.limitId.PRE_APPROVED_WEEKLY_LIMIT].error;
    }
    if(currErrorLimitArr.indexOf(this.limitId.AUTO_DENIED_WEEKLY_LIMIT) >= 0){
      rowData.flxColumn32.isVisible =true;
      rowData.txtWeeklyTransAutoDenyLimits.skin ="sknTbxFFFFFFBrE32416R3pxLato13px";
      rowData.lblErrorMsg32.text = currActionError[this.limitId.AUTO_DENIED_WEEKLY_LIMIT].error;
    }
    if(currErrorLimitArr.length > 0){
      rowData.isRowVisible =true;
      rowData.flxAssignLimits.isVisible =true;
    } else{
      rowData.isRowVisible =false;
      rowData.flxAssignLimits.isVisible =false;
    }
    return rowData;
  },
  /*
  * clear the inline errors if valid
  * @param: rowdata
  * @return errors cleared row data
  */
  clearAccLevelLimitErrorEditUser : function(rowData){
    rowData.txtPerTransPreApprovedLimit.skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
    rowData.txtPerTransAutoDenyLimits.skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
    rowData.txtDailyTransPreApprovedLimit.skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
    rowData.txtDailyTransAutoDenyLimits.skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
    rowData.txtWeeklyTransPreApprovedLimit.skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
    rowData.txtWeeklyTransAutoDenyLimits.skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
    rowData.flxColumn11.isVisible =false;
    rowData.flxColumn12.isVisible =false;
    rowData.flxColumn21.isVisible =false;
    rowData.flxColumn22.isVisible =false;
    rowData.flxColumn31.isVisible =false;
    rowData.flxColumn32.isVisible =false;
    return rowData;
  },
  createLimitsCardForAccounts : function(searchFilterData){
    var self =this;
    this.pageCount = {
      "PAGE_OFFSET": 0
    };
    var accSize = 0;
    if (searchFilterData === undefined) {
      var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
      var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
      var accLevelLimitsMap = editUserObj.accLevelLimits;
      accSize = accLevelLimitsMap.size;
      this.resetPaginationValues(accSize,2);
      this.pageCount.TOTAL_PAGES=Math.ceil(accSize/10);
    } else {
      accSize = searchFilterData.length;
    }
    //in case no limits available
    if (accSize === 0) {
      this.view.flxAddedUserEditAccLimitsListCont.setVisibility(false);
     this.view.btnBulkUpdateLimits.setVisibility(false);
      this.view.flxAddedUserEditLimitsSearchFilterCont.setVisibility(false);
      this.view.flxLimitsPagination.setVisibility(false);
    } else {
      this.view.flxAddedUserEditAccLimitsListCont.setVisibility(true);
      this.view.btnBulkUpdateLimits.setVisibility(true);
      this.view.flxAddedUserEditLimitsSearchFilterCont.setVisibility(true);
      var end = accSize > 10 ? 10 : accSize;
      this.createDynamicAccountLimitsCards(0, end, searchFilterData);
      this.pageCount.PAGE_OFFSET = end;
      this.view.flxLimitsPagination.setVisibility(accSize > 10);
    }
    this.view.forceLayout();
  },
  createDynamicAccountLimitsCards: function (start, end, searchFilterData) {
    var self = this;
    var i = 0, accCardCount = 0;
    var accLevelFeaturesMapKeys = [];
    self.view.flxAddedUserEditAccLimitsList.removeAll();
    if (searchFilterData === undefined) {
      var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
      var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
      var accLevelFeaturesMap = editUserObj.accLevelLimits;
      accLevelFeaturesMapKeys = Array.from(accLevelFeaturesMap.values());
    } else {
      accLevelFeaturesMapKeys = searchFilterData;
    }
    var compWidth = this.view.flxAddedUserEditLimitsContainer.frame.width === 0 ? "95%" : (this.view.flxAddedUserEditLimitsContainer.frame.width - 40);
    end = end > accLevelFeaturesMapKeys.length ? accLevelFeaturesMapKeys.length : end;
    for (var x = start; x < end; x++) {
      var valueObj = accLevelFeaturesMapKeys[x];
      //show only accounts that have been selected
      if (valueObj.accountDetails.isEnabled === "true" || valueObj.accountDetails.isAssociated === "true") {
        var num = x > 10 ? x : "0" + x;
        var limitCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
          "id": "limitCard" +num,
          "isVisible": true,
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": "10px",
          "left":"20dp",
          "width": compWidth
        }, {}, {});
        i = i + 1;
       limitCardToAdd.flxCardBottomContainer.isVisible = false;
        limitCardToAdd.toggleCollapseArrow(false);
        limitCardToAdd.flxArrow.onClick = self.toggleCardListVisibilityAccLimits.bind(self,limitCardToAdd,self.view.flxAddedUserEditAccLimitsList,valueObj);
        limitCardToAdd.btnReset.onClick = self.showResetLimitsUserPopup.bind(self,2, limitCardToAdd);
        limitCardToAdd.segAccountFeatures.info = {"parentId":limitCardToAdd.id,"segData":[], "segDataJSON":{}};
        /*limitCardToAdd.lblData2.onTouchEnd = function () {
          self.view.flxEditPopUp.isVisible = true;
          self.view.forceLayout();
        };*/
        if (JSON.parse(valueObj.limits).length > 0) {
          accCardCount = accCardCount + 1;
          self.view.flxAddedUserEditAccLimitsList.add(limitCardToAdd);
          self.setAccountLimitCardData(limitCardToAdd, valueObj);
        }
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.flxAddedUserEditAccLimitsListCont.setContentOffset({x:0,y:0});
    this.view.forceLayout();
  },
  setAccountLimitCardData : function(limitCardToAdd, accLevelLimitsMap){
    limitCardToAdd.info = {"accDetails":accLevelLimitsMap.accountDetails};
    limitCardToAdd.lblName.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBERColon") + " "+
    accLevelLimitsMap.accountDetails.accountId;
    limitCardToAdd.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE");
    limitCardToAdd.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME");
    limitCardToAdd.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE");
    limitCardToAdd.lblData1.text = accLevelLimitsMap.accountDetails.accountType;
    limitCardToAdd.lblData2.text = accLevelLimitsMap.accountDetails.accountName;
    limitCardToAdd.lblData3.text = accLevelLimitsMap.accountDetails.ownerType;
    limitCardToAdd.lblHeading.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagement.Limits");
    limitCardToAdd.lblCount.setVisibility(false);
    limitCardToAdd.lblTotalCount.setVisibility(false);
    limitCardToAdd.toggleCollapseArrow(false);
    limitCardToAdd.lblName.skin = "sknLbl192B45LatoRegular14px";
    limitCardToAdd.lblName.hoverSkin = "sknLbl192B45LatoRegular14px";
    limitCardToAdd.flxArrow.isVisible = true;
    limitCardToAdd.segAccountFeatures.info.segData=JSON.parse(accLevelLimitsMap.limits);
    //this.setLimitsAtAccountLevel(limitCardToAdd.segAccountFeatures, JSON.parse(accLevelLimitsMap.limits));
    limitCardToAdd.toggleCollapseArrow(false);
    this.setLimitsAtAccountLevel(limitCardToAdd.segAccountFeatures, JSON.parse(accLevelLimitsMap.limits), 1);
  },
  setLimitsAtAccountLevel : function(segmentPath,limitsArr, option){
    var self =this;
    var isValid = true;
    var parentCardId = segmentPath.info.parentId;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var accountInfo = this.view[parentCardId].info ? this.view[parentCardId].info.accDetails : "";
    var accNum = accountInfo.accountNumber || accountInfo.accountId;
    var custId = selCustData.orignalData.coreCustomerId;
    var limitsSegData = limitsArr.map(function(rec){
      var segRowData = [], actionHasError =false;
      var actionsArr = rec.actions || rec.permissions;
      for(var i=0;i < actionsArr.length; i++){
        var limitRowObj = {};
        var limitValues = actionsArr[i].limits;
         limitRowObj = {
          "id":actionsArr[i].actionId,
          "lblFeatureName":actionsArr[i].actionName,
          "isRowVisible": false,
          "flxAssignLimits":{"isVisible":false},
          "lblTransactionType":kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type_Caps"),
          "lblTransactionLimits":"TRANSACTION LIMIT",
          "lblPreApprovedLimit":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PreApproved_UC"),
          "lblAutoDenyLimits":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AutoDeny_UC"),
          "lblperTransactionLimits":kony.i18n.getLocalizedString("i18n.frmServiceManagement.PerTransactionLimitLC"),
          "lblDailyTransactionLimits":kony.i18n.getLocalizedString("i18n.frmServiceManagement.DailyTransactionLimitLC"),
          "lblWeeklyTransactionLimits":kony.i18n.getLocalizedString("i18n.frmServiceManagement.WeeklyTransLimitLC"),
          "lblPerTransactionLimitValue": {"text":limitValues[self.limitId.MAX_TRANSACTION_LIMIT]},
          "txtPerTransPreApprovedLimit": {"text":limitValues[self.limitId.PRE_APPROVED_TRANSACTION_LIMIT],
                                          "onTextChange":self.updateAccLimitsValueEditUser.bind(self,segmentPath),
                                          "info":{"name": self.limitId.PRE_APPROVED_TRANSACTION_LIMIT, "rowNum":1}
                                         },
          "txtPerTransAutoDenyLimits": {"text":limitValues[self.limitId.AUTO_DENIED_TRANSACTION_LIMIT],
                                        "onTextChange":self.updateAccLimitsValueEditUser.bind(self,segmentPath),
                                        "info":{"name": self.limitId.AUTO_DENIED_TRANSACTION_LIMIT, "rowNum":1}
                                       },
          "lblDailyTransactionLimitValue": {"text":limitValues[self.limitId.DAILY_LIMIT]},
          "txtDailyTransPreApprovedLimit": {"text":limitValues[self.limitId.PRE_APPROVED_DAILY_LIMIT],
                                            "onTextChange":self.updateAccLimitsValueEditUser.bind(self,segmentPath),
                                            "info":{"name": self.limitId.PRE_APPROVED_DAILY_LIMIT, "rowNum":2}
                                           },
          "txtDailyTransAutoDenyLimits": {"text":limitValues[self.limitId.AUTO_DENIED_DAILY_LIMIT],
                                          "onTextChange":self.updateAccLimitsValueEditUser.bind(self,segmentPath),
                                          "info":{"name": self.limitId.AUTO_DENIED_DAILY_LIMIT, "rowNum":2}
                                         },
          "lblWeeklyTransactionLimitValue": {"text":limitValues[self.limitId.WEEKLY_LIMIT]},
          "txtWeeklyTransPreApprovedLimit": {"text":limitValues[self.limitId.PRE_APPROVED_WEEKLY_LIMIT],
                                             "onTextChange":self.updateAccLimitsValueEditUser.bind(self,segmentPath),
                                             "info":{"name": self.limitId.PRE_APPROVED_WEEKLY_LIMIT, "rowNum":3}
                                            },
          "txtWeeklyTransAutoDenyLimits": {"text":limitValues[self.limitId.AUTO_DENIED_WEEKLY_LIMIT],
                                           "onTextChange":self.updateAccLimitsValueEditUser.bind(self,segmentPath),
                                           "info":{"name": self.limitId.AUTO_DENIED_WEEKLY_LIMIT, "rowNum":3}
                                          },
          "lblPerTransactionLimitDollar":{"text":self.currencyValue},
          "lblDailyTransactionLimitDollar":{"text":self.currencyValue},
          "lblWeeklyTransactionLimitDollar":{"text":self.currencyValue},
          "lblPerCurrencyPreLimit": {"text":self.currencyValue},
          "lblPerCurrencyADLimits": {"text":self.currencyValue},
          "lblDailyCurrencyPreLimit": {"text":self.currencyValue},
          "lblDailyCurrencyADLimits": {"text":self.currencyValue},
          "lblWeeklyCurrencyADLimits": {"text":self.currencyValue},
          "lblWeeklyCurrencyPreLimit": {"text":self.currencyValue},
          "lblErrorMsg11": {"text":"Error"},
          "lblErrorMsg12": {"text":"Error"},
          "lblErrorMsg21": {"text":"Error"},
          "lblErrorMsg22": {"text":"Error"},
          "lblErrorMsg31" : {"text":"Error"},
          "lblErrorMsg32" : {"text":"Error"},
          "lblErrorIcon11": {"text":"\ue94c"},
          "lblErrorIcon12":{"text":"\ue94c"},
          "lblErrorIcon21":{"text":"\ue94c"},
          "lblErrorIcon22":{"text":"\ue94c"},
          "lblErrorIcon31":{"text":"\ue94c"},
          "lblErrorIcon32":{"text":"\ue94c"},
          "flxErrorRow1":{"isVisible":true},
          "flxErrorRow2":{"isVisible":true},
          "flxErrorRow3":{"isVisible":true},
          "flxColumn11": {"isVisible": false},
          "flxColumn12": {"isVisible": false},
          "flxColumn21": {"isVisible": false},
          "flxColumn22": {"isVisible": false},
          "flxColumn31" : {"isVisible": false},
          "flxColumn32" : {"isVisible": false},
          "lblSeperator1":"-",
          "lblSeperator2":"-",
          "lblSeperator":"-",
          "flxRangeIcon1":{"isVisible":false,"onHover":"" },//self.showRangeTooltip},
          "flxRangeIcon2":{"isVisible":false,"onHover":""},//self.showRangeTooltip},
          "flxRangeIcon3":{"isVisible":false,"onHover":""},//self.showRangeTooltip},
          "lblIconRangeInfo1":{"text":"\ue94d"},
          "lblIconRangeInfo2":{"text":"\ue94d"},
          "lblIconRangeInfo3":{"text":"\ue94d"},
          "template":"flxAssignLimits"};
          //show errors if any
          if(Object.keys(self.limitsValidationObject).length > 0 && Object.keys(self.limitsValidationObject[custId]).length > 0){
            var updatedRowJson ={};
            var errorActionsId = Object.keys(self.limitsValidationObject[custId][accNum]);
            var limitErrorObj = self.limitsValidationObject[custId][accNum][limitRowObj.id];
            actionHasError = limitErrorObj && Object.keys(limitErrorObj).length > 0 ? true : false;
            if (errorActionsId.indexOf(limitRowObj.id) >= 0 && actionHasError === true) {
              updatedRowJson = self.updatedRowWithErrorCheck(limitRowObj, self.limitsValidationObject[custId][accNum]);
              limitRowObj = updatedRowJson;
              isValid = false;
            }
          }
          segRowData.push(limitRowObj);
      }
      var segSecData = {
        "id":rec.featureId,
        "lblTopSeperator": {"isVisible":false},
        "flxCheckbox": {"isVisible":false},
        "flxToggleArrow": {"onClick": self.toggleSegmentSectionArrowAddUser.bind(self,segmentPath)},
        "lblIconToggleArrow": {"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "lblFeatureName": rec.featureName,
        "lblStatusValue": {"text": rec.featureStatus === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "lblIconStatusTop": {"text":"\ue921",
                            "skin":rec.featureStatus === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblBottomSeperator": {"isVisible":true,"text":"-"},
        "lblAvailableActions": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.MonetaryActions")+":",
        "lblCountActions": {"text":actionsArr.length},
        "lblTotalActions":{"isVisible":false},
        "template":"flxContractEnrollFeaturesEditSection"
      };
      if (actionHasError) {
        segSecData.lblIconToggleArrow.text = "\ue915";
        segSecData.lblIconToggleArrow.skin = "sknfontIconDescDownArrow12px";
       /* if (j < (segData.length - 1)) {
          segData[j + 1][0].lblTopSeperator.isVisible = true;
        }
        accountFlx[i].segAccountFeatures.setSectionAt(segData[j], j);*/
      }
      return [segSecData, segRowData];
    });
    
    segmentPath.widgetDataMap = this.getWidgetMapForLimitsAccountLevel();
    if(limitsSegData.length > 0){
      if(option !== 1){ //set data to seg only on expand click action
        limitsSegData[limitsSegData.length - 1][0].lblBottomSeperator.isVisible = false;
        segmentPath.setData(limitsSegData);
      }
      this.view[parentCardId].lblErrorIcon.isVisible = !isValid;
    }
    segmentPath.info.segDataJSON=limitsSegData;
    this.view.forceLayout();
  },
  getWidgetMapForLimitsAccountLevel : function(){
    var widgetMap = {
      "isRowVisible": "isRowVisible",
      "lblTopSeperator":"lblTopSeperator",
      "flxCheckbox":"flxCheckbox",
     // "lblSectionCheckbox":"lblSectionCheckbox",
       "lblSectionCheckbox":"lblSectionCheckbox",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "lblFeatureName":"lblFeatureName",
      "lblStatusValue":"lblStatusValue",
      "lblIconStatusTop":"lblIconStatusTop",
      "lblBottomSeperator":"lblBottomSeperator",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "flxContractEnrollFeaturesEditSection":"flxContractEnrollFeaturesEditSection",
      "lblFeatureName":"lblFeatureName",
      "lblTransactionType":"lblTransactionType",
      "lblTransactionLimits":"lblTransactionLimits",
      "lblPreApprovedLimit":"lblPreApprovedLimit",
      "lblAutoDenyLimits":"lblAutoDenyLimits",
      "lblPerTransactionLimitDollar":"lblPerTransactionLimitDollar",
      "lblDailyTransactionLimitDollar":"lblDailyTransactionLimitDollar",
      "lblWeeklyTransactionLimitDollar":"lblWeeklyTransactionLimitDollar",
      "lblperTransactionLimits":"lblperTransactionLimits",
      "lblDailyTransactionLimits":"lblDailyTransactionLimits",
      "lblWeeklyTransactionLimits":"lblWeeklyTransactionLimits",
      "lblPerTransactionLimitValue": "lblPerTransactionLimitValue",
      "txtPerTransPreApprovedLimit": "txtPerTransPreApprovedLimit",
      "txtPerTransAutoDenyLimits":"txtPerTransAutoDenyLimits",
      "lblDailyTransactionLimitValue":"lblDailyTransactionLimitValue",
      "txtDailyTransPreApprovedLimit":"txtDailyTransPreApprovedLimit",
      "txtDailyTransAutoDenyLimits": "txtDailyTransAutoDenyLimits",
      "lblWeeklyTransactionLimitValue": "lblWeeklyTransactionLimitValue",
      "txtWeeklyTransPreApprovedLimit": "txtWeeklyTransPreApprovedLimit",
      "txtWeeklyTransAutoDenyLimits":"txtWeeklyTransAutoDenyLimits",
      "flxColumn11": "flxColumn11",
      "flxColumn12": "flxColumn12",
      "flxColumn21": "flxColumn21",
      "flxColumn22": "flxColumn22",
      "flxColumn31" : "flxColumn31",
      "flxColumn32" : "flxColumn32",
      "flxErrorRow1":"flxErrorRow1",
      "flxErrorRow2":"flxErrorRow2",
      "flxErrorRow3":"flxErrorRow3",
      "lblErrorMsg11": "lblErrorMsg11",
      "lblErrorMsg12": "lblErrorMsg12",
      "lblErrorMsg21": "lblErrorMsg21",
      "lblErrorMsg22": "lblErrorMsg22",
      "lblErrorMsg31" : "lblErrorMsg31",
      "lblErrorMsg32" : "lblErrorMsg32",
      "lblErrorIcon11":"lblErrorIcon11",
      "lblErrorIcon12":"lblErrorIcon12",
      "lblErrorIcon21":"lblErrorIcon21",
      "lblErrorIcon22":"lblErrorIcon22",
      "lblErrorIcon31":"lblErrorIcon31",
      "lblErrorIcon32":"lblErrorIcon32",
      "lblPerCurrencyPreLimit":"lblPerCurrencyPreLimit",
      "lblPerCurrencyADLimits":"lblPerCurrencyADLimits",
      "lblDailyCurrencyPreLimit":"lblDailyCurrencyPreLimit",
      "lblDailyCurrencyADLimits":"lblDailyCurrencyADLimits",
      "lblWeeklyCurrencyADLimits":"lblWeeklyCurrencyADLimits",
      "lblWeeklyCurrencyPreLimit":"lblWeeklyCurrencyPreLimit",
      "statusValue": "statusValue",
      "statusIcon" :"statusIcon",
      "lblSeperator1":"lblSeperator1",
      "lblSeperator2":"lblSeperator2",
      "lblSeperator":"lblSeperator",
      "lblIconRangeInfo1":"lblIconRangeInfo1",
      "lblIconRangeInfo2":"lblIconRangeInfo2",
      "lblIconRangeInfo3":"lblIconRangeInfo3",
      "flxRangeIcon1":"flxRangeIcon1",
      "flxRangeIcon2":"flxRangeIcon2",
      "flxRangeIcon3":"flxRangeIcon3",
      "flxPerTransactionCont":"flxPerTransactionCont",
      "flxDailyTransactionCont":"flxDailyTransactionCont",
      "flxWeeklyTransactionCont":"flxWeeklyTransactionCont",
      "flxAssignLimits":"flxAssignLimits"
    };
    return widgetMap;
  },
  updateAccLimitsValueEditUser : function(segmentWidPath,eventObj){
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var selectedCardId = segmentWidPath.info ? segmentWidPath.info.parentId : "";
    var selAccDetails = selectedCardId !== "" ? this.view[selectedCardId].info.accDetails : "";
    var featureData = segmentWidPath.data[eventObj.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[eventObj.rowContext.sectionIndex][1]
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var currUserLimitsMap = new Map(editUserObj.accLevelLimits);
    var currLimitTextbox = eventObj.info ? eventObj.info.name : "";

    for(let accountObj of currUserLimitsMap.values()){ 
      var currAccId = (accountObj.accountDetails.accountNumber || accountObj.accountDetails.accountId) || "";
      var selAccId = selAccDetails !== "" ? (selAccDetails.accountNumber || selAccDetails.accountId) : "";
      if(currAccId === selAccId){
      var limits = JSON.parse(accountObj.limits);
      var selFeature = self.getFeatureObjFromArray(featureData.id, limits);
      var actionArr = selFeature.actions || selFeature.permissions;
        for(var i=0; i< actionArr.length; i++){
          for(var j=0; j<actionsSegData.length; j++){
            //compare with segment action ,action from list and update limit value
            if(actionArr[i].actionId === actionsSegData[j].id){
              if(actionArr[i].limits && currLimitTextbox){
                actionArr[i].limits[currLimitTextbox] = eventObj.text;
              }
              break;
            }
          }
        }
        accountObj.limits = JSON.stringify(limits);
        currUserLimitsMap.set(currAccId,accountObj);
        break;
      }
    };
      editUserObj.accLevelLimits = currUserLimitsMap;
      this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
    this.clearLimitErrorForSingleTextbox(actionsSegData,segmentWidPath,eventObj);
  },
  /*
  * hide in line errors on text change in limits account level
  * @Param:curr rows data,textbox eventObj
  */
  clearLimitErrorForSingleTextbox : function(rowsData,segmentWid,eventObj){
    var currRowData = rowsData[eventObj.rowContext.rowIndex];
    var currLimitTextbox = eventObj.info ? eventObj.info.name : "";
    if(eventObj.skin === "sknTbxFFFFFFBrE32416R3pxLato13px"){
      currRowData[eventObj.id].skin ="sknTbxBgFFFFFFBrD7D9E01pxR3px";
      if(currLimitTextbox === this.limitId.PRE_APPROVED_TRANSACTION_LIMIT){
        currRowData.flxColumn11.isVisible = false;
      } else if(currLimitTextbox === this.limitId.AUTO_DENIED_TRANSACTION_LIMIT){
        currRowData.flxColumn12.isVisible = false;
      }else if(currLimitTextbox === this.limitId.PRE_APPROVED_DAILY_LIMIT){
        currRowData.flxColumn21.isVisible = false;
      }else if(currLimitTextbox === this.limitId.AUTO_DENIED_DAILY_LIMIT){
        currRowData.flxColumn22.isVisible = false;
      }else if(currLimitTextbox === this.limitId.PRE_APPROVED_WEEKLY_LIMIT){
        currRowData.flxColumn31.isVisible = false;
      }else if(currLimitTextbox === this.limitId.AUTO_DENIED_WEEKLY_LIMIT){
        currRowData.flxColumn32.isVisible = false;
      }
      segmentWid.setDataAt(currRowData, eventObj.rowContext.rowIndex, eventObj.rowContext.sectionIndex);
    }
  },
  toggleCardListVisibility : function(cardWidget,parentFlexCont,option){
    var listArr = parentFlexCont.widgets();
    var segData=[];
    for(var i=0; i<listArr.length; i++){
      if(listArr[i].id === cardWidget.id){
        var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
        //collapses segment section inside the card
        if(Object.keys(cardWidget.segAccountFeatures.info.segDataJSON).length==0){
          if(option===1){
            this.setFeaturesCardSegmentData(cardWidget.segAccountFeatures, cardWidget.segAccountFeatures.info.segData);
            cardWidget.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(cardWidget.segAccountFeatures.data,false, true); 
            cardWidget.lblSectionCheckbox.skin = this.applyCheckboxSkin(cardWidget.lblSectionCheckbox);
          }
        }
        cardWidget.toggleCollapseArrow(!visibilityCheck);
        segData = cardWidget.segAccountFeatures.data;
        for(var j=0;j< segData.length;j++){
          segData[j][0].lblTopSeperator.isVisible = false;
          if(segData[j][0].lblIconToggleArrow.skin !== "sknfontIconDescRightArrow14px"){
            segData[j][0].lblIconToggleArrow.text = "\ue922";
            segData[j][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
            segData[j][1] = this.showHideSegRowFlexAddUser(segData[j][1],false);
            segData[j][0].lblBottomSeperator.isVisible = j === segData.length-1 ? false: true;
          }
        }
        cardWidget.segAccountFeatures.setData(segData);
      }
      else{
        this.view[listArr[i].id].toggleCollapseArrow(false);
      }
    }
  },
  /*
  * expand/collapse selected card listing container visibility for featureLimitCard componrent
  * @param: feature/limit card widget path, path of all cards container flex
  */
  toggleCardListVisibilityAccLimits: function (cardWidget, parentFlexCont, accLevelLimitsMap) {
   var listArr = parentFlexCont.widgets();
   for (var i = 0; i < listArr.length; i++) {
     if (listArr[i].id === cardWidget.id) {
       var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
       cardWidget.toggleCollapseArrow(!visibilityCheck);
       if(visibilityCheck === false){
          this.setLimitsAtAccountLevel(cardWidget.segAccountFeatures, JSON.parse(accLevelLimitsMap.limits), 2);
       }
       if (this.view.flxAddedUserEditAccLimitsListCont.isVisible === true) {
         var btnVisibile = (!visibilityCheck) && cardWidget.segAccountFeatures.data.length > 0;
         this.view[listArr[i].id].btnReset.setVisibility(btnVisibile);
       } else {
         cardWidget.btnReset.setVisibility(false);
       }
     }
     else {
       this.view[listArr[i].id].toggleCollapseArrow(false);
       this.view[listArr[i].id].btnReset.setVisibility(false);
     }
   }
   this.view.forceLayout();
 },
  setAccountFeatureCardData : function(featureCardToAdd, accLevelFeaturesMap){
    featureCardToAdd.info = {"accDetails":accLevelFeaturesMap.accountDetails};
    featureCardToAdd.lblName.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBERColon") + " "+
    accLevelFeaturesMap.accountDetails.accountId;
    featureCardToAdd.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE");
    featureCardToAdd.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME");
    featureCardToAdd.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE");
    featureCardToAdd.lblData1.text = accLevelFeaturesMap.accountDetails.accountType;
    featureCardToAdd.lblData2.text = accLevelFeaturesMap.accountDetails.accountName;
    featureCardToAdd.lblData3.text = accLevelFeaturesMap.accountDetails.ownerType;
    featureCardToAdd.lblHeading.text =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomersController.SelectedFeatures")+":";
    featureCardToAdd.lblTotalCount.setVisibility(true);
    var count = JSON.parse(accLevelFeaturesMap.features).length;
    featureCardToAdd.lblTotalCount.text =  "of "+ this.getTwoDigitNumber(count);
    featureCardToAdd.toggleCollapseArrow(false);
    featureCardToAdd.lblName.skin = "sknLbl192B45LatoRegular14px";
    featureCardToAdd.lblName.hoverSkin = "sknLbl192B45LatoRegular14px";
    featureCardToAdd.flxArrow.isVisible = true;
    featureCardToAdd.segAccountFeatures.info.segData=JSON.parse(accLevelFeaturesMap.features);
    featureCardToAdd.lblCount.text = this.getSelectedAccFeaturesCount(JSON.parse(accLevelFeaturesMap.features), false);
    //this.setFeaturesCardSegmentData(featureCardToAdd.segAccountFeatures, JSON.parse(accLevelFeaturesMap.features));
//     featureCardToAdd.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(featureCardToAdd.segAccountFeatures.data,false, true); 
//     featureCardToAdd.lblSectionCheckbox.skin = this.applyCheckboxSkin(featureCardToAdd.lblSectionCheckbox);
  },
  setAccountTypesFilter : function(option){
    var self = this;
    var widgetMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    var accTypes = [{"name":"Savings","id":"1"},
               {"name":"Checkings","id":"2"},
               {"name":"Credit Card","id":"3"},
               {"name":"Deposits","id":"4"},
               {"name":"Loan","id":"5"},
               {"name":"Current","id":"6"}];
    var segData = accTypes.map(function(rec) {
        return {
          "id": rec.id,
          "lblDescription": {"text":rec.name},
          "imgCheckBox": {"src":self.AdminConsoleCommonUtils.checkboxnormal},
          "template": "flxSearchDropDown"
        };
      });
    this.view.customListBoxAccounts.segList.widgetDataMap = widgetMap;
    this.view.customListBoxAccounts.segList.setData(segData);
    this.view.customListBoxAccounts.segList.info = {"features":segData,"limits":segData};
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    this.view.customListBoxAccounts.segList.selectedIndices = [[0,arr]];
    this.view.customListBoxAccounts.lblSelectedValue.text = segData.length + " Selected";
  },
  setFilterDataInFeaturesLimitsTab : function(){
    var self =this;
    var accTypes = [], listBoxData = [];
    var widgetDataMap = {
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var userDetailsObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var accounts = userDetailsObj.accounts;
    //get the accoun types available
    accounts.forEach(function(accountObj,key){
      if(accountObj.isEnabled === "true" || accountObj.isAssociated === "true"){
        if(accTypes.indexOf(accountObj.accountType) < 0){
          accTypes.push(accountObj.accountType);
        }
      }
    });
    //map filtered account types to segmnet
    listBoxData = accTypes.map(function(rec){
      return {
        "lblDescription": rec,
        "imgCheckBox": {"src":self.AdminConsoleCommonUtils.checkboxnormal},
        "template": "flxSearchDropDown"
      };
    });
    this.view.customListBoxAccounts.segList.widgetMap = widgetDataMap;
    this.view.customListBoxAccounts.segList.setData(listBoxData);
    var arr = [];
    for(var i= 0; i< listBoxData.length; i++){
      arr.push(i);
    }
    this.view.customListBoxAccounts.segList.setData.info = {"prevSelInd": JSON.stringify(arr),
                                                            "selectedText": arr.length+" "+kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected")};
    this.view.customListBoxAccounts.segList.selectedIndices = [[0,arr]];
    this.view.customListBoxAccounts.lblSelectedValue.text = this.view.customListBoxAccounts.segList.setData.info.selectedText;
    this.view.forceLayout();
  },
  setFeaturesCardSegmentData : function(segmentPath,featuresArr){
    var self =this;
    var segFeaturesData =[];
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var featuresSegData = featuresArr.map(function(rec){
      var segRowData = [], selActionCount = 0;
      var actionsArr = rec.actions || rec.permissions;
      for(var i=0;i < actionsArr.length; i++){
        var rowJson = {
          "id":actionsArr[i].actionId,
          "isRowVisible": false,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false},
          "flxFeatureNameCont":{"isVisible":true},
          "lblCheckbox":{"isVisible":true,"text": actionsArr[i].isEnabled === "true" ? self.AdminConsoleCommonUtils.checkboxSelectedlbl :self.AdminConsoleCommonUtils.checkboxnormallbl,"skin": "sknIconBg0066CASz20pxCheckbox"},
          "flxCheckbox":{"onClick":self.onClickFeaturesRowCheckboxAddUser.bind(self,segmentPath)},
          "lblFeatureName":{"text":actionsArr[i].actionName},
          "lblStatus":{"text":actionsArr[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?"Active" : "Inactive"},
          "lblIconStatus":{"skin":actionsArr[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                           "sknFontIconActivate" :"sknfontIconInactive"},
          "lblCustom":{"isVisible":false},
          "template":"flxContractEnrollFeaturesEditRow",
        };
        //to set partial selection for action incase of customer level features
        if(segmentPath.info.featuresType === 1){
          var accCount =  self.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId][actionsArr[i].actionId] ? self.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId][actionsArr[i].actionId].length : 0;
          rowJson.lblCheckbox.text = (accCount === 0)? self.AdminConsoleCommonUtils.checkboxnormallbl :    
          	(accCount < self.selAccCount ? self.AdminConsoleCommonUtils.checkboxPartiallbl : self.AdminConsoleCommonUtils.checkboxSelectedlbl);
          rowJson.lblCheckbox.skin = self.applyCheckboxSkin(rowJson.lblCheckbox);
          if(rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl || rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxPartiallbl)
            selActionCount = selActionCount +1;
          //show/hide the custom label
          rowJson.lblCustom.isVisible = (rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxPartiallbl)?true : false;
        }else {
          if(actionsArr[i].isEnabled === "true") selActionCount = selActionCount +1;
        }
       
        segRowData.push(rowJson);
      }
      var segSecData = {
        "id":rec.featureId,
        "lblTopSeperator":{"isVisible":false},
        "flxCheckbox":{"onClick": self.onSectionCheckboxClickAddUser.bind(self,segmentPath)},
        "lblSectionCheckbox":{"isVisible":true,"text": self.getHeaderCheckboxLabel(segRowData,true,true),"skin":"sknIconBg0066CASz20pxCheckbox"},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "flxToggleArrow":{"onClick": self.toggleSegmentSectionArrowAddUser.bind(self,segmentPath)},
        "lblFeatureName": rec.featureName || rec.name ,
        "lblStatusValue":{"text":(rec.featureStatus || rec.status) === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          "Active" : "Inactive"},
        "lblIconStatusTop":{"text":"\ue921",
                            "skin":(rec.featureStatus || rec.status) === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                            "sknFontIconActivate" : "sknfontIconInactive"},
        "lblBottomSeperator":{"isVisible":true,"text":"-"},
        "lblAvailableActions":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon"),
        "lblCountActions": {"text":selActionCount},
        "lblTotalActions":"of "+ actionsArr.length,
        "lblCustom":{"isVisible":false},
        "template":"flxContractEnrollFeaturesEditSection"
      };
      segSecData.lblSectionCheckbox.skin = self.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      //changes specific to customer level features
      if(segmentPath.info.featuresType === 1){
         segSecData.lblCustom.isVisible = self.checkFeatureCustomLabel(segRowData);
      }
      if(segRowData.length > 0){
        segmentPath.info.segDataJSON[rec.featureName] = [segSecData, segRowData];
        segFeaturesData.push([segSecData, segRowData]);
      }
      return [segSecData, segRowData];
    });
    segmentPath.widgetDataMap = this.getWidgetDataMapForFeaturesEditUser();
    if(segFeaturesData.length > 0){
      segFeaturesData[segFeaturesData.length-1][0].lblBottomSeperator.isVisible = false;
    }
    segmentPath.setData(segFeaturesData);
    segmentPath.info.segData = segFeaturesData;
    var cardWidgetId = segmentPath.info.parentId;
    this.view[cardWidgetId].lblCount.text = this.getSelectedItemsCount(segmentPath.data, false);
    this.view.forceLayout();
  },
  /*
  * show/hide custom label for feature 
  * @param: actions segment list
  * @return: true/false
  */
  checkFeatureCustomLabel : function(rowsData){
    for(var i=0; i<rowsData.length; i++){
      if(rowsData[i].lblCustom.isVisible === true){
        return true;
      }
    }
    return false;
  },
  onClickFeaturesRowCheckboxAddUser: function(segmentWidPath,event){
    var selSecInd = event.rowContext.sectionIndex;
    var selRowInd = event.rowContext.rowIndex;
    var segData = segmentWidPath.data;
    segData[selSecInd][1][selRowInd].lblCheckbox.text = (segData[selSecInd][1][selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
      this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    segData[selSecInd][1][selRowInd].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][selRowInd].lblCheckbox);
    //hide custom label in customer level actions
    segData[selSecInd][1][selRowInd].lblCustom.isVisible = false;
    
    segData[selSecInd][0].lblSectionCheckbox.text = this.getHeaderCheckboxLabel(segData[selSecInd][1],true, true);
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    segData[selSecInd][0].lblCountActions.text = this.getSelectedActionsCount(segData[selSecInd][1]);
    segData[selSecInd][0].lblCustom.isVisible = this.checkFeatureCustomLabel(segData[selSecInd][1]);
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    //set image for select all features image
    if(segmentWidPath.info && segmentWidPath.info.parentId){
      this.view[segmentWidPath.info.parentId].lblSectionCheckbox.text = this.getHeaderCheckboxLabel(segData,false, true);
      this.view[segmentWidPath.info.parentId].lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view[segmentWidPath.info.parentId].lblSectionCheckbox);
      this.view[segmentWidPath.info.parentId].lblCount.text = this.getSelectedItemsCount(segData, false);
    }
    
    //update the selected features based on features type
    if(segmentWidPath.info.featuresType === 1){ //customer level features
      this.updateCustFeaturesSelectionEditUser(segmentWidPath, event);
    } else if(segmentWidPath.info.featuresType === 2){ //account level features
      this.updateAccFeaturesSelectionEditUser(segmentWidPath, event);
    } else if(segmentWidPath.info.featuresType === 3){ //other features
      this.updateOtherFeaturesSelectionEditUser(segmentWidPath, event);
    }
    //enable/disable save buttons
    var isValid = this.validateSelectionForMultipleCardsAddUser(segmentWidPath);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,isValid);
  },
  getSelectedActionsCount : function(actionsList){
    var actionCount = 0;
    for(var i=0;i < actionsList.length; i++){
      if(actionsList[i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
        actionCount = actionCount +1;
    }
    return (actionCount+"");
  },
  getFeatureObjFromArray : function(featureId, featuresArr){
    var featureObj = featuresArr.filter(function(feature) { return feature.featureId === featureId });
    return (featureObj.length > 0 ? featureObj[0] : null);
  },
  updateCustFeaturesSelectionEditUser : function(segmentWidPath, event){
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var featureData = segmentWidPath.data[event.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[event.rowContext.sectionIndex][1]
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var currUserFeaturesMap = new Map(editUserObj.accountMapFeatures);
    var count = 0;
    currUserFeaturesMap.forEach(function(accountObj,accKey){ 
      var features = JSON.parse(accountObj.features);
      var selFeature = self.getFeatureObjFromArray(featureData.id, features);
      var actionsArr = selFeature.actions || selFeature.permissions;
      for(var i=0; i< actionsArr.length; i++){
        for(var j=0; j<actionsSegData.length; j++){
          //compare with segment action ,action from list and update data
          if(actionsArr[i].actionId === actionsSegData[j].id){
            if(actionsSegData[i].lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl){
              actionsArr[i].isEnabled = "true";
              count = count+1;
              self.addAccountIdForAction(actionsArr[i].actionId, (accKey+""));
            }else{
              actionsArr[i].isEnabled = "false";
              self.removeAccountIdForAction(actionsArr[i].actionId, (accKey+""),1);
            }
            break;
          }
        }
      }
      selFeature.isEnabled = count === 0 ? "false" : "true";
      accountObj.features = JSON.stringify(features);
      currUserFeaturesMap.set(accKey,accountObj);
    });
    editUserObj.accountMapFeatures = currUserFeaturesMap;
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  updateAccFeaturesSelectionEditUser : function(segmentWidPath, event){
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var featureData = segmentWidPath.data[event.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[event.rowContext.sectionIndex][1]
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);

    var count = 0;
    var accountCardComponent = this.view[segmentWidPath.info.parentId];
    var currAccountNum = accountCardComponent.info ? accountCardComponent.info.accDetails.accountId : "";
    var currAccountObj = editUserObj.accountMapFeatures.get(currAccountNum); 
    var features = JSON.parse(currAccountObj.features);
    var selFeature = self.getFeatureObjFromArray(featureData.id, features);
    var actionsArr = selFeature.actions || selFeature.permissions;
    for(var i=0; i< actionsArr.length; i++){
      for(var j=0; j<actionsSegData.length; j++){
        //compare with segment action ,action from list and update data
        if(actionsArr[i].actionId === actionsSegData[j].id){
          if(actionsSegData[i].lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl){
            actionsArr[i].isEnabled = "true";
            count = count+1;
            self.addAccountIdForAction(actionsArr[i].actionId, (currAccountNum+""));
          }else{
            actionsArr[i].isEnabled = "false";
            self.removeAccountIdForAction(actionsArr[i].actionId, (currAccountNum+""),1);
          }
          break;
        }
      }
    }
    selFeature.isEnabled = count === 0 ? "false" : "true";
    currAccountObj.features = JSON.stringify(features);
    editUserObj.accountMapFeatures.set(currAccountNum, currAccountObj);
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  updateOtherFeaturesSelectionEditUser : function(segmentWidPath, event){
    var self = this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var featureData = segmentWidPath.data[event.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[event.rowContext.sectionIndex][1]
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var currUserOtherFeatures = editUserObj.nonAccLevelFeatures;
    var count = 0;
    var selFeature = self.getFeatureObjFromArray(featureData.id, currUserOtherFeatures);
    var actionsArr = selFeature.actions || selFeature.permissions;
    for(var i=0; i<actionsArr.length; i++){
      for(var j=0; j<actionsSegData.length; j++){
        //compare with segment action ,action from list and update data
        if(actionsArr[i].actionId === actionsSegData[j].id){
          if(actionsSegData[i].lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl){
            actionsArr[i].isEnabled = "true";
            count = count+1;
          }else{
            actionsArr[i].isEnabled = "false";
          }
          break;
        }
      }
    }
    selFeature.isEnabled = count === 0 ? "false" : "true";
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  validateSelectionForMultipleCardsAddUser : function(segmentPath){
    var parentFlxCont = "";
    if(segmentPath.info.featuresType === 1)
      parentFlxCont = this.view.flxAddedUserEditFeaturesList;
    else if(segmentPath.info.featuresType === 2)
      parentFlxCont = this.view.flxAddedUserEditAccFeaturesList;
    else if(segmentPath.info.featuresType === 3)
      parentFlxCont = this.view.flxAddedUserEditOtherFeaturesList
    
    var childWid = parentFlxCont.widgets();
    var count =0, isValid = true;
    for(var i=0;i<childWid.length;i++){
      if(childWid[i].lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl)
        count = count + 1;
    }
    if(count === childWid.length)
      return false;
    else
      return true;
  },
  onSectionCheckboxClickAddUser : function(segmentWidPath,event){
    var selSecInd = event.rowContext.sectionIndex;
    var segData = segmentWidPath.data;
    var img = (segData[selSecInd][0].lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    segData[selSecInd][0].lblSectionCheckbox.text = img;
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    for(var i =0;i<segData[selSecInd][1].length; i++){
      segData[selSecInd][1][i].lblCheckbox.text = img;
      segData[selSecInd][1][i].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][i].lblCheckbox);
      segData[selSecInd][1][i].lblCustom.isVisible = false;
    }
    segData[selSecInd][0].lblCountActions.text = this.getSelectedActionsCount(segData[selSecInd][1]);
    segData[selSecInd][0].lblCustom.isVisible = false;
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    //set image for select all features image
    if(segmentWidPath.info && segmentWidPath.info.parentId){
      this.view[segmentWidPath.info.parentId].lblSectionCheckbox.text = this.getHeaderCheckboxLabel(segData,false, true);
      this.view[segmentWidPath.info.parentId].lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view[segmentWidPath.info.parentId].lblSectionCheckbox);
      this.view[segmentWidPath.info.parentId].lblCount.text = this.getSelectedItemsCount(segData, false);
    }
    
    //update the selected features based on features type
    if(segmentWidPath.info.featuresType === 1){ //customer level features
      this.updateCustFeaturesSelectionEditUser(segmentWidPath, event);
    } else if(segmentWidPath.info.featuresType === 2){ //account level features
      this.updateAccFeaturesSelectionEditUser(segmentWidPath, event);
    } else if(segmentWidPath.info.featuresType === 3){ //other features
      this.updateOtherFeaturesSelectionEditUser(segmentWidPath, event);
    }
    
    //enable/disable save buttons
   // var isValid = this.validateCheckboxSelections(segmentWidPath,true);
    var isValid = this.validateSelectionForMultipleCardsAddUser(segmentWidPath);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,isValid);
  },
  toggleSegmentSectionArrowAddUser : function(segmentWidgetPath,event){
    var segData = segmentWidgetPath.data;
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections to collapse
    for(var i=0;i< segData.length;i++){
      segData[i][0].lblTopSeperator.isVisible = false;
      segData[i][0].lblBottomSeperator.isVisible = true;
      if(selectedSecInd !== i){
        segData[i][0].lblIconToggleArrow.text = "\ue922";
        segData[i][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
        segData[i][1] = this.showHideSegRowFlexAddUser(segData[i][1],false);
      }
      //hide bottom seperator for last row
      if(i === segData.length-1){
        segData[i][0].lblBottomSeperator.isVisible = false;
      }
    }
    //update selected section
    if(segData[selectedSecInd][1][0].isRowVisible === false){
      segData[selectedSecInd][0].lblIconToggleArrow.text = "\ue915";
      segData[selectedSecInd][0].lblIconToggleArrow.skin = "sknfontIconDescDownArrow12px";
      segData[selectedSecInd][1] = this.showHideSegRowFlexAddUser(segData[selectedSecInd][1],true);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblTopSeperator.isVisible = true;
      }
      segData[selectedSecInd][0].lblBottomSeperator.isVisible = (this.view.flxAddedUserEditLimitsContainer.isVisible === true) ? false : true;
    } else{
      segData[selectedSecInd][0].lblIconToggleArrow.text = "\ue922";
      segData[selectedSecInd][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][1] = this.showHideSegRowFlexAddUser(segData[selectedSecInd][1],false);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblTopSeperator.isVisible = false;
      }
      if(selectedSecInd ===(segData.length-1) ){
        segData[selectedSecInd][0].lblBottomSeperator.isVisible = false;
      }
    }
    segmentWidgetPath.setData(segData);
  },
  getWidgetDataMapForFeaturesEditUser : function(){
    var widgetMap = {
      "id":"id",
      "isRowVisible":"isRowVisible",
      "flxFeatureNameCont":"flxFeatureNameCont",
     // "lblCheckbox":"lblCheckbox",
       "lblCheckbox":"lblCheckbox",
      "flxCheckbox":"flxCheckbox",
      "lblStatus":"lblStatus",
      "flxStatus":"flxStatus",
      "lblIconStatus":"lblIconStatus",
      "lblCustom":"lblCustom",
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "lblTopSeperator":"lblTopSeperator",
     // "lblSectionCheckbox":"lblSectionCheckbox",
      "lblSectionCheckbox":"lblSectionCheckbox",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "lblFeatureName":"lblFeatureName",
      "lblStatusValue":"lblStatusValue",
      "lblIconStatusTop":"lblIconStatusTop",
      "lblBottomSeperator":"lblBottomSeperator",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "flxContractEnrollFeaturesEditSection":"flxContractEnrollFeaturesEditSection"
    };
    return widgetMap;
  },
  showEditAccountsScreen(){
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    this.view.flxAddedUserEditAccountsContainer.setVisibility(true);
    this.view.flxAddedUserEditFeaturesContainer.setVisibility(false);
    this.view.flxAddedUserEditOtherFeaturesCont.setVisibility(false);
    this.view.flxAddedUserEditLimitsContainer.setVisibility(false);
    var widgetBtnArr = [this.view.AddedUserEditVerticalTabs.btnOption1,this.view.AddedUserEditVerticalTabs.btnOption2,this.view.AddedUserEditVerticalTabs.btnOption3,this.view.AddedUserEditVerticalTabs.btnOption4,this.view.AddedUserEditVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.AddedUserEditVerticalTabs.flxImgArrow1,this.view.AddedUserEditVerticalTabs.flxImgArrow2,this.view.AddedUserEditVerticalTabs.flxImgArrow3, this.view.AddedUserEditVerticalTabs.flxImgArrow4,this.view.AddedUserEditVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.AddedUserEditVerticalTabs.btnOption1);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.AddedUserEditVerticalTabs.flxImgArrow1);
    this.view.searchEditAccounts.tbxSearchBox.text = "";
    this.view.searchEditAccounts.flxSearchCancel.setVisibility(false);
    this.view.enrollEditAccountsCard.flxArrow.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnNext,false,true);
    this.enableOrDisableVerticalTabEditUser(true);
    this.view.flxAddedUserEditAccountsList.setContentOffset({x:0,y:0});
    this.view.enrollEditAccountsCard.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + ":";
    //this.setAccountsSegmentData();
  },
  showEditFeaturesScreen : function(){
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    this.view.flxAddedUserEditAccountsContainer.setVisibility(false);
    this.view.flxAddedUserEditFeaturesContainer.setVisibility(true);
    this.view.flxAddedUserEditOtherFeaturesCont.setVisibility(false);
    this.view.flxAddedUserEditLimitsContainer.setVisibility(false);
    var widgetBtnArr = [this.view.AddedUserEditVerticalTabs.btnOption1,this.view.AddedUserEditVerticalTabs.btnOption2,this.view.AddedUserEditVerticalTabs.btnOption3,this.view.AddedUserEditVerticalTabs.btnOption4,this.view.AddedUserEditVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.AddedUserEditVerticalTabs.flxImgArrow1,this.view.AddedUserEditVerticalTabs.flxImgArrow2,this.view.AddedUserEditVerticalTabs.flxImgArrow3, this.view.AddedUserEditVerticalTabs.flxImgArrow4,this.view.AddedUserEditVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.AddedUserEditVerticalTabs.btnOption2);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.AddedUserEditVerticalTabs.flxImgArrow2); 
    this.view.toggleButtonsFeatures.info = {"selectedTab":1};
    this.view.searchEditFeatures.tbxSearchBox.text = "";
    this.view.searchEditFeatures.flxSearchCancel.setVisibility(false);
    this.view.flxAccountTypesFilter.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,true);
    this.enableOrDisableVerticalTabEditUser(true);
    this.toggleFeaturesCustomerLevel();
  },
  showEditOtherFeaturesScreen : function(){
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    this.view.flxAddedUserEditAccountsContainer.setVisibility(false);
    this.view.flxAddedUserEditFeaturesContainer.setVisibility(false);
    this.view.flxAddedUserEditOtherFeaturesCont.setVisibility(true);
    this.view.flxAddedUserEditLimitsContainer.setVisibility(false);
    var widgetBtnArr = [this.view.AddedUserEditVerticalTabs.btnOption1,this.view.AddedUserEditVerticalTabs.btnOption2,this.view.AddedUserEditVerticalTabs.btnOption3,this.view.AddedUserEditVerticalTabs.btnOption4,this.view.AddedUserEditVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.AddedUserEditVerticalTabs.flxImgArrow1,this.view.AddedUserEditVerticalTabs.flxImgArrow2,this.view.AddedUserEditVerticalTabs.flxImgArrow3, this.view.AddedUserEditVerticalTabs.flxImgArrow4,this.view.AddedUserEditVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.AddedUserEditVerticalTabs.btnOption3);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.AddedUserEditVerticalTabs.flxImgArrow3); 
    this.view.searchEditOtherFeatures.tbxSearchBox.text = "";
    this.view.searchEditOtherFeatures.flxSearchCancel.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnNext,false,true);
    this.createOtherFeaturesCard();
  },
  showEditLimitsScreen : function(tabOption){
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    this.view.flxAddedUserEditAccountsContainer.setVisibility(false);
    this.view.flxAddedUserEditFeaturesContainer.setVisibility(false);
    this.view.flxAddedUserEditOtherFeaturesCont.setVisibility(false);
    this.view.flxAddedUserEditLimitsContainer.setVisibility(true);
    var widgetBtnArr = [this.view.AddedUserEditVerticalTabs.btnOption1,this.view.AddedUserEditVerticalTabs.btnOption2,this.view.AddedUserEditVerticalTabs.btnOption3, this.view.AddedUserEditVerticalTabs.btnOption4,this.view.AddedUserEditVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.AddedUserEditVerticalTabs.flxImgArrow1,this.view.AddedUserEditVerticalTabs.flxImgArrow2,this.view.AddedUserEditVerticalTabs.flxImgArrow3, this.view.AddedUserEditVerticalTabs.flxImgArrow4,this.view.AddedUserEditVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.AddedUserEditVerticalTabs.btnOption4);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.AddedUserEditVerticalTabs.flxImgArrow4);
    this.view.toggleButtonsLimits.info = {"selectedTab":1};
    this.view.searchEditLimits.tbxSearchBox.text = "";
    this.view.searchEditLimits.flxSearchCancel.setVisibility(false);
    this.view.flxAccountTypesFilter.setVisibility(false);
    //this.toggleLimitsCustomerLevel();
    if(tabOption === 1){
      this.toggleLimitsCustomerLevel();
    } else if(tabOption === 2){
      this.toggleLimitsAccountLevel();
    }
  },
 
   showSignatoryGroupScreen : function(){
     this.view.flxAddedUserEditAccountsContainer.setVisibility(false);
     this.view.flxAddedUserEditFeaturesContainer.setVisibility(false);
     this.view.flxAddedUserEditOtherFeaturesCont.setVisibility(false);
     this.view.flxAddedUserEditLimitsContainer.setVisibility(false);
     this.view.flxEnrollEdiSignatoryContainer.setVisibility(true);    
     var widgetBtnArr = [this.view.AddedUserEditVerticalTabs.btnOption1,this.view.AddedUserEditVerticalTabs.btnOption2,this.view.AddedUserEditVerticalTabs.btnOption3, this.view.AddedUserEditVerticalTabs.btnOption4,this.view.AddedUserEditVerticalTabs.btnOption5];
     var widgetArrowArr = [this.view.AddedUserEditVerticalTabs.flxImgArrow1,this.view.AddedUserEditVerticalTabs.flxImgArrow2,this.view.AddedUserEditVerticalTabs.flxImgArrow3, this.view.AddedUserEditVerticalTabs.flxImgArrow4,this.view.AddedUserEditVerticalTabs.flxImgArrow5];
     this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.AddedUserEditVerticalTabs.btnOption5);
     this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.AddedUserEditVerticalTabs.flxImgArrow5);    
     //this.view.flxAccountTypesFilter.setVisibility(false);
     // var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowIndex];
     var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd]; 
     var custInfo, isPrimary = false;
     isPrimary = enrollUserData.flxPrimary.isVisible === true ? true : false;
     custInfo = enrollUserData.orignalData;
     var details = {
       "id": custInfo.coreCustomerId || custInfo.cif,
       "name": custInfo.coreCustomerName || custInfo.companyName || custInfo.contractName,
       "industry":custInfo.industry ||  kony.i18n.getLocalizedString("i18n.Applications.NA"),
       "email": custInfo.email,
       "phone":custInfo.phone,
       "address": custInfo.city ? (custInfo.country ? custInfo.city + ", "+ custInfo.country : custInfo.city) :
       (custInfo.country ? custInfo.country : kony.i18n.getLocalizedString("i18n.Applications.NA"))
     }; 
     var selectedCust = details.name +" ("+ details.id +")";
     this.view.customersDropdownSignatory.setEnabled(false);  
     this.view.customersDropdownSignatory.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
     this.view.customersDropdownSignatory.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
     this.view.customersDropdownSignatory.lblSelectedValue.text = this.AdminConsoleCommonUtils.getTruncatedString(selectedCust,isPrimary?19:28,isPrimary?17:27);
     this.view.customersDropdownSignatory.lblSelectedValue.info = {"customerId": details.id,"customerDetails": custInfo};
     this.view.customersDropdownSignatory.lblSelectedValue.toolTip = selectedCust;
     this.view.customersDropdownSignatory.btnPrimary.isVisible = isPrimary;
     this.view.searchEditSignatory.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18.authorizedSignatories.searchByGroupName");
     this.view.searchEditSignatory.tbxSearchBox.text="";
     this.view.searchEditSignatory.flxSearchCancel.setVisibility(false);
     this.view.flxAccountTypesFilter.setVisibility(false);
     this.view.flxEnrollEditSearchSignatory.setVisibility(true);
     var isValidApproval=this.hasValidateApprovalPermission();
     if(isValidApproval)
       this.setSignatoryGroupsData();
     else{
       this.usersSelectedSignatoryList[details.id]==="NONE";
       this.view.flxEnrollEditSearchSignatory.setVisibility(false);
       this.view.lblNoSearchedSignatoryResultsFound.text="This user cannot be assigned to any signatory groups as this user doesnt have any approval permissions";
       this.view.flxNoSearchedSignatoryResultsFound.setVisibility(true);
       this.view.flxResults.setVisibility(false);
     }
     this.view.forceLayout();
   },
  hasValidateApprovalPermission : function(custIdParam,accFeaturesMap){
    var custId = custIdParam||this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var isValid=false;
    var currCustAccFeatures = accFeaturesMap||editUserObj.accountMapFeatures;
    for(let accId of currCustAccFeatures.keys()){
      var currSelAccObj = currCustAccFeatures .get(accId);
      var custfeatures = JSON.parse(currSelAccObj.features);
      for(var i=0;i<custfeatures.length;i++){
        var currActions = custfeatures[i].actions || custfeatures[i].permissions;
        for(var j=0; j< currActions.length; j++){
          if(currActions[j].isEnabled==="true"&&(currActions[j].accessPolicyId==="APPROVE"||currActions[j].accessPolicyId==="BULK_APPROVE")){
            isValid=true;
            break;
          }
        }
        if(isValid)
          break;
      }
      if(isValid)
          break;
    };
    return isValid;
  },
  setSignatoryGroupsData : function(){
    var custId = this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var signCustomerData= editUserObj.signatoryGroups;
    if(editUserObj.signatoryGroups.length===0){
      this.view.lblNoSearchedSignatoryResultsFound.text= "There are no signatory groups associated to this Customer."
      this.view.flxNoSearchedSignatoryResultsFound.setVisibility(true);
      this.view.flxResults.setVisibility(false);
    }else{
      this.view.flxNoSearchedSignatoryResultsFound.setVisibility(false);
      this.view.flxResults.setVisibility(true);
      if(editUserObj.signatoryGroups[0].signatoryGroupId!=="NONE"){
        signCustomerData.unshift({
          "signatoryGroupId":"NONE",
          "signatoryGroupName": "None",
          "signatoryGroupDescription":  "This option doesn’t have any association of the user to the customer.",
      "isAssociated": false
    });
 }
    this.setSignGroupsSegData(signCustomerData,custId);
   }
    },
  setSignGroupsSegData : function(data,custId){
    var self=this;
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
    var isAssociated=false;
    var toAdd=data.map(function(rec){
      if(rec.isAssociated){
        isAssociated=true;
        self.usersSelectedSignatoryList[custId]=rec.signatoryGroupId;
      }
      return{
        "flxCustomerProfileRoles": "flxCustomerProfileRoles",
        "flxRoleNameContainer": {"onClick":self.toggleRadioButton},
        "flxRoleCheckbox": {"isVisible":false},
        "flxRoleRadio":{"isVisible":true},
        "imgRoleRadio": {"src": rec.isAssociated||self.usersSelectedSignatoryList[custId]===rec.signatoryGroupId? "radio_selected.png":"radio_notselected.png"},
        "lblRoleName": rec.signatoryGroupName,
        "lblRoleDesc": rec.signatoryGroupDescription,
        "btnViewDetails": {"isVisible":false},
        "template": "flxCustomerProfileRoles",
        "id": rec.signatoryGroupId,
      };
    });
    if(isAssociated===false&&(this.usersSelectedSignatoryList[custId]==="NONE"||this.usersSelectedSignatoryList[custId]===undefined))
      toAdd[0].imgRoleRadio.src="radio_selected.png";
    this.view.segCustomerRolesEdit.widgetDataMap =dataMap;
    this.view.segCustomerRolesEdit.setData(toAdd);
    this.view.forceLayout();
  },
  toggleRadioButton : function(){
    var custId = this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var rowIndex = this.view.segCustomerRolesEdit.selectedRowIndex[1];
    var segData = this.view.segCustomerRolesEdit.data;
    var signatoryId="";
    for(var i=0;i<segData.length;i++){
      if(i === rowIndex){
        segData[i].imgRoleRadio.src = "radio_selected.png";
        signatoryId=segData[i].id;
      }
      else
        segData[i].imgRoleRadio.src = "radio_notselected.png";
    }
      this.view.segCustomerRolesEdit.setData(segData);
    var signatoryList=editUserObj.signatoryGroups;
    for(let x=0;x<signatoryList.length;x++){
      if(signatoryList[x].signatoryGroupId===signatoryId){
        signatoryList[x].isAssociated=true;
        this.usersSelectedSignatoryList[custId]=signatoryId;
      }
      else
        signatoryList[x].isAssociated=false;
    }
    editUserObj.signatoryGroups=signatoryList;
    this.presenter.setAccountsFeaturesForAddUser(custId,editUserObj);
  },
  
  createOtherFeaturesCard : function(){
    this.view.addedUserEditOtherFeaturesCard.toggleCollapseArrow(true);
    this.view.addedUserEditOtherFeaturesCard.flxArrow.setVisibility(false);
    this.view.addedUserEditOtherFeaturesCard.flxSelectAllOption.setVisibility(true);
    this.view.addedUserEditOtherFeaturesCard.flxCardBottomContainer.setVisibility(true);
    this.view.addedUserEditOtherFeaturesCard.segAccountFeatures.info = {"parentId":"addedUserEditOtherFeaturesCard","segData":[], "featuresType":3, "segDataJSON":{}};
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var enrollCustOtherFeatures = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    this.view.addedUserEditOtherFeaturesCard.lblTotalCount.text = "of " + this.getTwoDigitNumber(enrollCustOtherFeatures.nonAccLevelFeatures.length);
    this.setFeaturesCardSegmentData(this.view.addedUserEditOtherFeaturesCard.segAccountFeatures, enrollCustOtherFeatures.nonAccLevelFeatures);
    this.view.addedUserEditOtherFeaturesCard.flxCheckbox.onClick = this.onSelectAllFeaturesClickAddUser.bind(this,this.view.addedUserEditOtherFeaturesCard);
    this.view.addedUserEditOtherFeaturesCard.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(this.view.addedUserEditOtherFeaturesCard.segAccountFeatures.data,false, true);
    this.view.addedUserEditOtherFeaturesCard.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.addedUserEditOtherFeaturesCard.lblSectionCheckbox);
  },
  storeActionForAccountSelection : function(){
    var self =this;
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserDetails = this.presenter.getAccountsFeaturesForAddUser(enrollUserData.orignalData.coreCustomerId);
    var accLevelfeatures = editUserDetails.accountMapFeatures;
    accLevelfeatures.forEach(function(account,accKey){
      if(account.accountDetails.isEnabled === "true" || account.accountDetails.isAssociated === "true"){
        var accFeatures = JSON.parse(account.features);
        for(var j=0; j< accFeatures.length; j++){
          var actionsArr = accFeatures[j].actions || accFeatures[j].permissions;
          for(var i=0; i<actionsArr.length; i++){
            //push enabled actions for that account
            if(actionsArr[i].isEnabled === "true"){
              self.addAccountIdForAction(actionsArr[i].actionId,(accKey+""));
            } else if(actionsArr[i].isEnabled === "false"){
              self.removeAccountIdForAction(actionsArr[i].actionId,(accKey+""),1);
            }
          }
        }
      }  //remove acc num from all accounts when account is removed 
      else if(account.accountDetails.isEnabled === "false" || account.accountDetails.isAssociated === "false"){
        self.removeAccountIdForAction(null,(accKey+""),2);
      } 
    });
  },
  onSelectAllFeaturesClickAddUser : function(cardWidgetPath){
    var segData = cardWidgetPath.segAccountFeatures.data;
    var img = (cardWidgetPath.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    cardWidgetPath.lblSectionCheckbox.text = img;
    cardWidgetPath.lblSectionCheckbox.skin = this.applyCheckboxSkin(cardWidgetPath.lblSectionCheckbox);
    cardWidgetPath.lblCount.text = (img === this.AdminConsoleCommonUtils.checkboxnormallbl ? "0": this.getTwoDigitNumber(segData.length));
    for(var i=0;i<segData.length; i++){
      segData[i][0].lblSectionCheckbox.text = img;
      segData[i][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[i][0].lblSectionCheckbox);
      for(var j=0;j<segData[i][1].length; j++){
        segData[i][1][j].lblCheckbox.text = img;
        segData[i][1][j].lblCheckbox.skin = this.applyCheckboxSkin(segData[i][1][j].lblCheckbox);
      }
      segData[i][0].lblCountActions.text = (img === this.AdminConsoleCommonUtils.checkboxnormallbl ? "0": segData[i][1].length);
    }
    cardWidgetPath.segAccountFeatures.setData(segData);
    //update all features based on features type
    if(cardWidgetPath.segAccountFeatures.info.featuresType === 1){ //customer level features
      this.updateCustAllFeaturesSelectionEdit(cardWidgetPath.segAccountFeatures);
    } else if(cardWidgetPath.segAccountFeatures.info.featuresType === 2){ //account level features
      this.updateAccAllFeaturesSelectionEdit(cardWidgetPath.segAccountFeatures);
    } else if(cardWidgetPath.segAccountFeatures.info.featuresType === 3){ //other features
      this.updateOtherAllFeaturesSelectionEdit(cardWidgetPath.segAccountFeatures);
    }
    //enable/disable save buttons
    var isValid = this.validateSelectionForMultipleCardsAddUser(cardWidgetPath.segAccountFeatures);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,isValid);
  },
  updateCustAllFeaturesSelectionEdit : function(segmentWidPath){
    var self =this;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var featureCardComponent = this.view.addedUserEditFeaturesCard;
    var currUserFeaturesMap = new Map(editUserObj.accountMapFeatures);
    currUserFeaturesMap.forEach(function(accountObj,accKey){ 
      var features = JSON.parse(accountObj.features);
      for(var i=0; i<features.length; i++){
        features[i].isEnabled = featureCardComponent.lblSectionCheckbox.text === self.AdminConsoleCommonUtils.checkboxnormallbl ? false:true;
         var actionsArr = features[i].actions || features[i].permissions;
        for(var j=0;j<actionsArr.length; j++){
          if(featureCardComponent.lblSectionCheckbox.text === self.AdminConsoleCommonUtils.checkboxnormallbl){
            actionsArr[j].isEnabled = "false";
            self.removeAccountIdForAction(actionsArr[j].actionId, (accKey+""), 1);
          } else{
            actionsArr[j].isEnabled = "true";
            self.addAccountIdForAction(actionsArr[j].actionId, (accKey+""));
          }

        }
      }
      accountObj.features = JSON.stringify(features);
      currUserFeaturesMap.set(accKey,accountObj);
    });
    editUserObj.accountMapFeatures = currUserFeaturesMap;
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  updateAccAllFeaturesSelectionEdit : function(segmentWidPath){
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var accountCardComponent = this.view[segmentWidPath.info.parentId];
    var currAccountNum = accountCardComponent.info ? accountCardComponent.info.accDetails.accountId : "";
    var currAccountObj = editUserObj.accountMapFeatures.get(currAccountNum); 
    var features = JSON.parse(currAccountObj.features);
    for(var i=0; i<features.length; i++){
      features[i].isEnabled = accountCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? false:true;
      var actionsArr = features[i].actions || features[i].permissions;
      for(var j=0;j<actionsArr.length; j++){
        if( accountCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
          actionsArr[j].isEnabled = "false";
          this.removeAccountIdForAction(actionsArr[j].actionId, currAccountNum, 1);
        } else{
          actionsArr[j].isEnabled = "true";
          this.addAccountIdForAction(actionsArr[j].actionId, currAccountNum);
        }
        
      }
    }
    currAccountObj.features = JSON.stringify(features);
    editUserObj.accountMapFeatures.set(currAccountNum, currAccountObj);
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  updateOtherAllFeaturesSelectionEdit : function(segmentWidPath){
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var featureCardComponent = this.view.addedUserEditOtherFeaturesCard;
    var features = editUserObj.nonAccLevelFeatures;
    for(var i=0; i<features.length; i++){
      features[i].isEnabled = featureCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? false:true;
       var actionsArr = features[i].actions || features[i].permissions;
      for(var j=0;j<actionsArr.length; j++){
        actionsArr[j].isEnabled = featureCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? false:true;
      }
    }
    editUserObj.nonAccLevelFeatures = features;
    this.presenter.setAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId,editUserObj);
  },
  addAccountIdForAction : function(actionId,accountId){
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var associatedAccounts = this.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId][actionId];
    if(associatedAccounts && associatedAccounts.indexOf(accountId) < 0){
      associatedAccounts.push(accountId);
    }
  },
  removeAccountIdForAction : function(actionId,accountId,option){
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    if(option ===1){ //remove the account number for given action id
      var associatedAccounts = this.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId][actionId];
      var filterAcc = associatedAccounts.filter(function(accId) { return accId !== accountId });
      this.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId][actionId] = filterAcc;
    } else if(option ===2){ //remove the account number for all actions available
      var actionsArr = Object.keys(this.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId]);
      var accountsArr = Object.values(this.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId]);
      for(var i=0; i<accountsArr.length; i++){
        var filterAcc = accountsArr[i].filter(function(accId) { return accId !== accountId });
        this.actionsAccountJSON[enrollUserData.orignalData.coreCustomerId][actionsArr[i]] = filterAcc;
      }
    }
  },
  collectAllInfoAndSave : function(){
    this.view.flxEditAddedUserDetails.setVisibility(false);
    this.view.flxSearchUser.setVisibility(true);
    var toastText = this.aboutToAddUser.data[0].orignalData.coreCustomerName + " Permissions and Limits have been updated successfully.";
    this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),toastText);
  },
  hideEditScreen : function(){
    this.view.flxEditAddedUserDetails.setVisibility(false);
    this.view.flxSearchUser.setVisibility(true);
    this.revertEditUserChangesOnCancel();
    this.limitsValidationObject= {};
  },
  showAccountTypesFilter : function(opt){
    var top = 150;
    if(opt === 1){
      top = this.view.flxAddedUserEditFeaturesSearch.frame.y + this.view.flxAddedUserEditFeatureFilter.frame.y +30;
    } else{
      top = this.view.flxAddedUserEditLimitSearch.frame.y + this.view.flxAddedUserEditLimitsFilter.frame.y +30;
    }
    this.view.customListBoxAccounts.flxSegmentList.setVisibility(false);
    this.view.flxAccountTypesFilter.top = top +"dp";
    this.view.flxAccountTypesFilter.setVisibility(true);
  },
  /*
  * show bulk update features/limits popup
  * @param: option for feature/limits - 1/2
  */
  showBulkUpdatePopupEditUser: function(option){
    this.view.flxBulkUpdateFeaturesPopupForAddUser.setVisibility(true);
    this.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.info ={"option" : option};
    this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.setEnabled(false);
    this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.bulkUpdateFeaturesPopupForAddUser.flxSegmentContainer.top = "106dp";
    this.view.bulkUpdateFeaturesPopupForAddUser.flxSearchContainer.setVisibility(true);
    this.setAccountsListInBulkUpdatePopup(option);
    this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.tbxSearchBox.text = "";
    this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.flxSearchCancel.setVisibility(false);
    this.showBulkUpdatePopupScreenAddUser1();
    this.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.info = {"added":[]};
    this.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.removeAll();
    this.setRadioGroupDataAddUser(option);
    this.setFeatureLimitsBulkUpdateUI(option);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesPopupForAddUser.commonButtonsScreen1.btnSave,true,true);
  },
  setAccountsListInBulkUpdatePopup : function(option){
    var self =this;
    var custId ="";
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    custId = selCustData.orignalData.coreCustomerId;
    var custEditUserObj  = this.presenter.getAccountsFeaturesForAddUser(custId);
    var allAccountsMap = custEditUserObj.accounts;
    var accountsJson = this.getAccountsBasedOnAccType(allAccountsMap);
    var accList = Object.values(accountsJson);
    this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.info = {"allData":{}};
    var segData = accList.map(function(accArr){
      var rowsData = [];
      for(var i=0;i< accArr.length; i++){
        rowsData.push({
          "isRowVisible":false,
          "id": accArr[i].accountId,
          "flxContractEnrollAccountsEditRow":{"isVisible":false,
                                              "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxCheckbox":{"onClick": self.onCheckAccountsCheckboxAddUser.bind(self,self.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList,false)},
          "lblCheckbox":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknIconBg0066CASz20pxCheckbox"},
          "lblAccountNumber": {"text":accArr[i].accountId},
          "lblAccountType": {"text":accArr[i].accountType},
          "lblAccountName": {"text":accArr[i].accountName},
          "lblAccountHolder": {"text":accArr[i].ownerType},
          "lblSeperator":"-",
          "template":"flxContractEnrollAccountsEditRow"
        });
        self.sortBy = self.getObjectSorter("lblAccountNumber.text");
        self.sortBy.inAscendingOrder = true;
        rowsData = rowsData.sort(self.sortBy.sortData);
      }
      
      var sectionData = {
        "lblFeatureName": accArr[0].accountType,
        "flxToggleArrow":{"onClick": self.toggleSelectAccountsArrow},
        "lblIconToggleArrow": {"text":"\ue922","skin":"sknIcon00000015px"},
        "flxLeft":"flxLeft",
        "lblSectionLine":"-",
        "lblAvailableActions":"Selected accounts:",
        "lblCountActions": (rowsData.length+""),
        "lblTotalActions": "of "+rowsData.length,
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "flxHeaderContainer":{"isVisible":false},
        "flxAccountNumCont":{"onClick":self.sortAndSetData.bind(self,"lblAccountNumber.text",self.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList, 2)},
        "flxAccountType":{"onClick":""},
        "flxAccountName":{"onClick":self.sortAndSetData.bind(self,"lblAccountName.text",self.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList, 2)},
        "flxAccountHolder":{"onClick":self.showAccountsFilterInBulkUpdate},
        "lblSeperator":"-",
        "lblSectionCheckbox":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknIconBg0066CASz20pxCheckbox"},
        "flxCheckbox":{"onClick":self.onCheckAccountsCheckboxAddUser.bind(self,self.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList,true)},
        "lblAccountNumber": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBER"),
        "lblIconSortAccName":{
          "text": "\ue92a","left" : "10px",
          "skin": "sknIcon12pxBlack","hoverSkin" :"sknIcon12pxBlackHover"
        },
        "lblAccountType": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE"),
        "lblAccountName":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME"),
        "lblIconAccNameSort":{
          "text": "\ue92b","left" : "5px",
          "skin": "sknIcon15px","hoverSkin" :"sknlblCursorFont"
        },
        "lblAccountHolder":"OWNERSHIP TYPE",
        "lblIconSortAccHolder":"\ue916",
        "template":"flxEnrollSelectedAccountsSec",
      };
      
      self.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.info.allData[accArr[0].accountType] = rowsData;
      return [sectionData, rowsData];
    });
    this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.widgetDataMap = this.widgetMapforBulkUpdateAccounts();
    this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.setData(segData);
    this.view.forceLayout();
  },
  widgetMapforBulkUpdateAccounts : function(){
    var widgetMap = {
      "id":"id",
      "lblFeatureName":"lblFeatureName",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "lblSectionLine":"lblSectionLine",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "flxAccountSectionCont":"flxAccountSectionCont",
      "flxHeaderContainer":"flxHeaderContainer",
      "flxAccountNumCont":"flxAccountNumCont",
      "flxAccountType":"flxAccountType",
      "flxAccountName":"flxAccountName",
      "flxAccountHolder":"flxAccountHolder",
      "lblSeperator":"lblSeperator",
//       "imgSectionCheckbox":"imgSectionCheckbox",
       "lblSectionCheckbox":"lblSectionCheckbox",
      "flxCheckbox":"flxCheckbox",
      "lblAccountNumber":"lblAccountNumber",
      "lblIconSortAccName":"lblIconSortAccName",
      "lblAccountType":"lblAccountType",
      "lblAccountName":"lblAccountName",
      "lblIconAccNameSort":"lblIconAccNameSort",
      "lblAccountHolder":"lblAccountHolder",
      "lblIconSortAccHolder":"lblIconSortAccHolder",
      "flxEnrollSelectedAccountsSec":"flxEnrollSelectedAccountsSec",
//       "lblCheckbox":"lblCheckbox",
       "lblCheckbox":"lblCheckbox",
      "isRowVisible":"isRowVisible",
      "flxContractEnrollAccountsEditRow":"flxContractEnrollAccountsEditRow"
      
    };
    return widgetMap;
  },
  showBulkUpdatePopupScreenAddUser1 : function(){
    this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateScreen1.setVisibility(true);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateScreen2.setVisibility(false);
  },
  setRadioGroupDataAddUser : function(opt){
    var radioBtnData=[];
    if(opt===1){
      this.view.bulkUpdateFeaturesPopupForAddUser.lblRadioGroupTitle.text="Permission Type";
      radioBtnData = [{src:this.AdminConsoleCommonUtils.radioSelected, value:"Enable", selectedImg:this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected},
                      {src:this.AdminConsoleCommonUtils.radioNotSelected, value:"Disable", selectedImg:this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected}];
      this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.flxRadioButton1.width="100px";
      this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.flxRadioButton2.width="100px";
    }else{
      this.view.bulkUpdateFeaturesPopupForAddUser.lblRadioGroupTitle.text="Transaction Type";
      radioBtnData = [{src: this.AdminConsoleCommonUtils.radioSelected, value:"Per Transaction", selectedImg:this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected},
                      {src:this.AdminConsoleCommonUtils.radioNotSelected, value:"Daily Transaction", selectedImg: this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected},
                      {src:this.AdminConsoleCommonUtils.radioNotSelected, value:"Weekly Transaction", selectedImg: this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected}];
      this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.flxRadioButton1.width="150px";
      this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.flxRadioButton2.width="150px";
      this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.flxRadioButton3.width="150px";
    }
    this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.setData(radioBtnData);
    this.view.forceLayout();
  },
  setFeatureLimitsBulkUpdateUI : function(option){
    if(option === 1){
      this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.lblSelectedValue.text = this.view.customersDropdownFeatures.lblSelectedValue.text;
      this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.btnPrimary.isVisible = this.view.customersDropdownFeatures.btnPrimary.isVisible;
      this.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdatePermissionsInBulk");
      this.view.bulkUpdateFeaturesPopupForAddUser.lblTitle.text = "Add Permissions";
    }else{
      this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.lblSelectedValue.text = this.view.addedUserLimitsDropdown.lblSelectedValue.text;
      this.view.bulkUpdateFeaturesPopupForAddUser.customersDropdownBulkUpdate.btnPrimary.isVisible = this.view.addedUserLimitsDropdown.btnPrimary.isVisible;
      this.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.text =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdateLimitsInBulk");
      this.view.bulkUpdateFeaturesPopupForAddUser.lblTitle.text = "Add Limits";
    }
  },
  getSelectedAccountTypesCount : function(){
    var accountTypes = [];
    var segData = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.data;
    for(var i=0;i<segData.length;i++){
      var segImg = segData[i][0].lblSectionCheckbox ? segData[i][0].lblSectionCheckbox.text : segData[i][0].lblCheckbox.text
      if(segImg !== this.AdminConsoleCommonUtils.checkboxnormallbl){
        var count =0;
        for(var j=0;j<segData[i][1].length; j++){
          if(segData[i][1][j].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
            count = count + 1;
        }
        var accJson = {"accType":segData[i][0].lblFeatureName,
                       "count":count};
        accountTypes.push(accJson);
      }
    }
    this.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.removeAll();
    for(var k=0;k<accountTypes.length;k++){
      this.addAccountsTag(accountTypes[k]);
    }
  },
  showBulkUpdatePopupScreenAddUser2 : function(){
    this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateScreen1.setVisibility(false);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateScreen2.setVisibility(true);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.setVisibility(true);
    this.view.bulkUpdateFeaturesPopupForAddUser.btnAddNewRow.setVisibility(true);
    var flxChildren = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.removeAll();
    for(var i=0;i<flxChildren.length;i++){
      this.view.bulkUpdateFeaturesPopupForAddUser.remove(this.view.bulkUpdateFeaturesPopupForAddUser[flxChildren[i].id]);
    }
    this.view.forceLayout();
    var height = this.view.bulkUpdateFeaturesPopupForAddUser.flxContractDetailsPopupContainer.frame.height - (70 + this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateListContainer.frame.y + 80);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateListContainer.height = height + "dp";
    if(this.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.info.option === 1){
      this.view.bulkUpdateFeaturesPopupForAddUser.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewPermissions");
      this.bulkUpdateListboxData = this.getListForListBoxAddUser(1);
      this.addNewFeatureRowBulkUpdateAddUser("enroll");
      this.getFeaturesForBulkUpdateAddUser(1, "enroll");
    } else{
      this.view.bulkUpdateFeaturesPopupForAddUser.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewLimits");
      this.bulkUpdateListboxData = this.getListForListBoxAddUser(2);
      this.addNewLimitRowBulkUpdateAddUser("enroll");
      this.getFeaturesForBulkUpdateAddUser(2, "enroll");
    }
  },
  addNewFeatureRowBulkUpdateAddUser : function(category){
    var flxChildren = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    //caluclate the value for id to suffix
    var num = flxChildren.length > 0 ? flxChildren[flxChildren.length-1].id.split("Z")[1] : "0";
    num = parseInt(num,10) +1;
    var id = num > 9 ? ""+num: "0"+num;
    var rowWidth = this.view.bulkUpdateFeaturesPopupForAddUser.flxContractDetailsPopupContainer.frame.width - 40;
    var featureRowToAdd = new com.adminConsole.contracts.bulkUpdateAddNewFeatureRow({
        "id": "bulkFeatureRowZ" +id,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "left":"20dp",
        "width":rowWidth + "dp",
        "top": "20dp"
      }, {}, {});
    featureRowToAdd.flxErrorField21.setVisibility(false);
    featureRowToAdd.flxErrorField22.setVisibility(false);
    this.setNewFeatureLimitRowDataAddUser(featureRowToAdd,1, category);
  },
  setNewFeatureLimitRowDataAddUser : function(newRowWidget, option, category){
    var self =this;
    var allRows = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    if(allRows.length === 0){
      newRowWidget.flxDelete.isVisible = false;
    } else{
      allRows[0].flxDelete.isVisible = true;
      newRowWidget.flxDelete.isVisible = true;
    }
    var listboxData = this.getUnselectedFeaturesListAddUser(option, category);
    newRowWidget.lstBoxFieldValue11.masterData = listboxData;
    newRowWidget.lstBoxFieldValue11.selectedKey = listboxData[0][0];
    newRowWidget.lblFieldValue12.text = "Select an action";
    //assigning actions
    newRowWidget.lstBoxFieldValue11.onSelection = function(){
      newRowWidget.lstBoxFieldValue11.skin="sknLbxborderd7d9e03pxradius";
      newRowWidget.flxErrorField11.setVisibility(false);
      self.setActionsListboxDataAddUser(newRowWidget,option);
      self.updateExistingRowsListboxDataAddUser(newRowWidget,option,category);
    }
    newRowWidget.flxDelete.onClick = this.deleteAddNewFeatureRow.bind(this,newRowWidget, option, category);
    newRowWidget.tbxValue21.onKeyUp = function(){
      newRowWidget.flxValue21.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      newRowWidget.flxErrorField21.setVisibility(false);
    }
    newRowWidget.tbxValue22.onKeyUp = function(){
      newRowWidget.flxValue22.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      newRowWidget.flxErrorField22.setVisibility(false);
    }
    this.setFeatureLimitRowUIAddUser(option,newRowWidget);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.addAt(newRowWidget, allRows.length);
    this.updateExistingRowsListboxDataAddUser(newRowWidget, option,category);
    this.view.forceLayout();
  },
  setFeatureLimitRowUIAddUser : function(opt,widgetPath){
    if(opt === 1){  //for feature
      widgetPath.flxRow2.setVisibility(false);
      widgetPath.flxFieldColumn13.setVisibility(false);
      widgetPath.flxFieldColumn21.setVisibility(false);
    } else{ //for limits
      widgetPath.flxRow2.setVisibility(true);
      widgetPath.flxFieldColumn13.setVisibility(false);
      widgetPath.flxFieldColumn21.setVisibility(true);
      widgetPath.lblFieldName21.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PreApproved");
      widgetPath.lblFieldName22.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AutoDeny");
    }
  },
  setActionsListboxDataAddUser : function(widgetPath, option){
    var self=this;
    var allBulkFeatures=this.bulkUpdateList;
    var selectedFeatureId=widgetPath.lstBoxFieldValue11.selectedKey;
    var featureActions=[{"id":"select","name":"Select"}];
    var actionListData=[["select","Select"]];
    if(selectedFeatureId!=="select"){
      featureActions=allBulkFeatures[selectedFeatureId].actions || allBulkFeatures[selectedFeatureId].permissions;
      widgetPath.lblFieldValue12.text=featureActions.length+ " Selected";
      widgetPath.flxFieldValueContainer12.setEnabled(true);
      widgetPath.flxFieldValueContainer12.onClick = function(){
      widgetPath.flxDropdownField12.setVisibility(!widgetPath.flxDropdownField12.isVisible);
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
    var actionsSegData=featureActions.map(function(action){
      self.bulkUpdateList[selectedFeatureId].actions[i].isChecked=true;
      i=i+1;
      return{
        "actionId": action.actionId,
        "flxSearchDropDown": "flxSearchDropDown",
        "imgCheckBox":"checkboxselected.png",
        "lblDescription": action.actionName,
        "dependentActions": action.dependentActions
      }
    });
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.widgetDataMap=widgetMap;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(actionsSegData);
    //to select all the actions by default
    var selectInd=[];
    for(let x=0;x<actionsSegData.length;x++){
      selectInd.push(x);
    }
    var selectionProp = {
      imageIdentifier: "imgCheckBox",
      selectedStateImage: "checkboxselected.png",
      unselectedStateImage: "checkboxnormal.png"
    };
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selectInd]];
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var segData=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.data;
      var selInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices[0][1];
      widgetPath.lblFieldValue12.text=selInd.length==1?segData[selInd[0]].lblDescription:selInd.length+" Selected";
      var feature=self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey];
      for(let i=0;i<feature.actions.length;i++){
        if(feature.actions[i].actionId===segData[selInd[0]].actionId)
          self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey].actions[i].isChecked=(segData[selInd[0]].imgCheckBox==="checkboxnormal.png")?false:true;
      }      
      self.view.forceLayout();
    };
    widgetPath.flxDropdownField12.onHover = this.onHoverEventCallback;
    this.view.forceLayout();
  },
  addNewLimitRowBulkUpdateAddUser : function(category){
    var flxChildren = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    //caluclate the value for id to suffix
    var num = flxChildren.length > 0 ? flxChildren[flxChildren.length-1].id.split("Z")[1] : "0";
    num = parseInt(num,10) +1;
    var id = num > 9 ? ""+num: "0"+num;
    var rowWidth = this.view.bulkUpdateFeaturesPopupForAddUser.flxContractDetailsPopupContainer.frame.width - 40;
    var limitRowToAdd = new com.adminConsole.contracts.bulkUpdateAddNewFeatureRow({
        "id": "bulkLimitRowZ" +id,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "left":"20dp",
        "width":rowWidth + "dp",
        "top": "20dp"
      }, {}, {});
    if(category === "enroll"){
      limitRowToAdd.flxRow2.isVisible = true;
      limitRowToAdd.flxFieldColumn21.isVisible = true;
      limitRowToAdd.flxFieldColumn22.isVisible = true;
      limitRowToAdd.tbxValue21.text ="";
      limitRowToAdd.tbxValue22.text ="";
    }else{
      limitRowToAdd.flxRow2.isVisible = false;
      limitRowToAdd.flxFieldColumn21.isVisible = true;
      limitRowToAdd.tbxValue21.text ="";
    }
    this.setNewFeatureLimitRowDataAddUser(limitRowToAdd,2, category);
  },
  getFeaturesForBulkUpdateAddUser : function(option,category){
    var bulkUpdateFeatures={};
    var featureJSON={};
    var actionsJSON={};
    var actions;
    var featuresList = category === "enroll" ? (option === 1 ? this.bulkUpdateAllFeaturesList : this.bulkUpdateAllFeaturesLimits) :
                                               this.bulkUpdateAllFeaturesListContract;
    for(var i=0;i<featuresList.length;i++){
      featureJSON={};
      featureJSON.featreName=featuresList[i].featureName;
      featureJSON.actions=[];
      var actions = featuresList[i].actions || featuresList[i].permissions;
      for(var j=0;j<actions.length;j++){
        actionsJSON={};
        actionsJSON.actionName=actions[j].actionName;
        actionsJSON.actionId=actions[j].actionId;
        actionsJSON.isChecked=true;
        actionsJSON.type=actions[j].isAccountLevel;
        actionsJSON.limitVal="0";
        actionsJSON.dependentActions=[];
        if(featuresList[i].actions[j].dependentActions && featuresList[i].actions[j].dependentActions.length>0){
          if(typeof featuresList[i].actions[j].dependentActions==="string")//as we are getting string format in edit flow and object format in create flow
            actionsJSON.dependentActions=(featuresList[i].actions[j].dependentActions.substring(1,featuresList[i].actions[j].dependentActions.length-1)).split(",");
          else
            actionsJSON.dependentActions=featuresList[i].actions[j].dependentActions.map(function(rec){return rec.id});
        }
        featureJSON.actions.push(actionsJSON);
      }
      bulkUpdateFeatures[featuresList[i].featureId]=featureJSON;
    }
    this.bulkUpdateList = bulkUpdateFeatures;
  },
  getListForListBoxAddUser: function(option,data) {
    var self = this;
    var finalList = [];
    var selectOption = [["select", "Select a feature"]];
    if(option ===1){
      for (var i = 0; i < self.bulkUpdateAllFeaturesList.length; i++) {
        var check = data ? data.contains(self.bulkUpdateAllFeaturesList[i].featureId) : (!finalList.contains(self.bulkUpdateAllFeaturesList[i].featureId));
        if(check)
          finalList.push([self.bulkUpdateAllFeaturesList[i].featureId,self.bulkUpdateAllFeaturesList[i].featureName]);
      }
    } else{
      var limitFeatures=[];
      var limitActions=[];
      var dataToSet=[];
      for(var a=0;a<self.bulkUpdateAllFeaturesLimits.length;a++){
        var actions = self.bulkUpdateAllFeaturesLimits[a].actions || self.bulkUpdateAllFeaturesLimits[a].permissions;
        if(actions.length>0){
          limitFeatures=JSON.parse(JSON.stringify(self.bulkUpdateAllFeaturesLimits[a]));
          limitActions = actions.filter(function(item) {
            return ((item.isAccountLevel === "true" || item.isAccountLevel === "1") && item.limits);
          });
          if(limitActions.length>0){
            limitFeatures.actions=limitActions;
            dataToSet.push(limitFeatures);
          }
        }
      }
      for (var i = 0; i < dataToSet.length; i++) {
        var check = data ? data.contains(self.bulkUpdateAllFeaturesLimits[i].featureId) : (!finalList.contains(self.bulkUpdateAllFeaturesLimits[i].featureId));
        if (check) {
          finalList.push([dataToSet[i].featureId,dataToSet[i].featureName]);
        }
      }
    }
    finalList = selectOption.concat(finalList);
    return finalList;
  },
  getAccountsBasedOnAccType : function(accountsMap){
    var accountJson = {};
    accountsMap.forEach(function(account,key){
      (accountJson[account.accountType] = accountJson[account.accountType] || []).push(account);
    });
    return accountJson;
  },
  toggleSelectAccountsArrow : function(context){
    var selSecInd = context.rowContext.sectionIndex;
    var selRowInd = context.rowContext.rowIndex;
    var segData = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.data;
    for(var i=0; i<segData.length; i++){
      if(selSecInd !== i){
        segData[i][0].lblIconToggleArrow.text = "\ue922"; //right-arrow
        segData[i][0].lblIconToggleArrow.skin = "sknIcon00000015px";
        segData[i][0].flxHeaderContainer.isVisible = false;
        segData[i][1] = this.showHideSegRowFlexAddUser(segData[i][1],false);
        segData[i][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";

      }
    }
    if(segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px"){
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue915"; //down-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000014px";
      segData[selSecInd][0].flxHeaderContainer.isVisible = true;
      segData[selSecInd][1] = this.showHideSegRowFlexAddUser(segData[selSecInd][1],true);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
      this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.info.allData[segData[selSecInd][0].lblFeatureName] = segData[selSecInd][1];
      this.setDataForOwnershipFilterBulk(segData[selSecInd][1]);
    } else{
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue922"; //right-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000015px";
      segData[selSecInd][0].flxHeaderContainer.isVisible = false;
      segData[selSecInd][1] = this.showHideSegRowFlexAddUser(segData[selSecInd][1],false);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    }
    this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.setData(segData);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxFilterMenu.setVisibility(false);
  },
  setDataForOwnershipFilterBulk : function(accountsData){
    var self = this;
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var ownershipList =[], maxSizeOwnerTypeText ="";
    for(var i=0;i<accountsData.length;i++){
      if(!ownershipList.includes(accountsData[i].lblAccountHolder.text))
        ownershipList.push(accountsData[i].lblAccountHolder.text);
    }
    var ownershipData = ownershipList.map(function(rec){
      maxSizeOwnerTypeText=rec.length > maxSizeOwnerTypeText.length ? rec: maxSizeOwnerTypeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
        "lblDescription": rec
      };
    });
    this.view.bulkUpdateFeaturesPopupForAddUser.filterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.bulkUpdateFeaturesPopupForAddUser.filterMenu.segStatusFilterDropdown.setData(ownershipData);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxFilterMenu.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeOwnerTypeText)+55+"px";
    var selOwnerInd = [];
    for(var j=0;j<ownershipList.length;j++){
      selOwnerInd.push(j);
    }
    this.view.bulkUpdateFeaturesPopupForAddUser.filterMenu.segStatusFilterDropdown.selectedIndices = [[0,selOwnerInd]];
    this.view.forceLayout();
  },
  showHideSegRowFlexAddUser : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      if(rowsData[i].flxContractEnrollFeaturesEditRow){  // edit features
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
      }else if(rowsData[i].flxAssignLimits){ //edit limits
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxAssignLimits.isVisible =visibility;
      } else{ //accounts in bulk update
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractEnrollAccountsEditRow.isVisible = visibility;
      }
    }
    return rowsData;
  },
  updateExistingRowsListboxDataAddUser : function(currRowPath,option,category){
    var currRowData;
    var allRows = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    var updatedList = this.getUnselectedFeaturesListAddUser(option,category);
    for(var i=0;i<allRows.length;i++){
      if(currRowPath.id !== allRows[i].id){
        currRowData = [];
        currRowData.push(allRows[i].lstBoxFieldValue11.selectedKeyValue);
        var lstMasterData = currRowData.concat(updatedList);
        allRows[i].lstBoxFieldValue11.masterData = lstMasterData;
      }
    }
    if(updatedList.length === 0){
      this.view.bulkUpdateFeaturesPopupForAddUser.btnAddNewRow.setVisibility(false);
    }
  },
  getUnselectedFeaturesListAddUser: function(option, category) {
    var assignedData = [],
        allFeaturesId = [],diffList = [],commonList = [];
    var rowsList = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    //get all assigned feature id's
    if(option === 1){//features bulk update list
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
    var allFeaturesList = category === "enroll" ? (option === 1 ? this.bulkUpdateAllFeaturesList : this.bulkUpdateAllFeaturesLimits) :
                                                   this.bulkUpdateAllFeaturesListContract;
    allFeaturesId = allFeaturesList.map(function(rec) {
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
    var finalList = this.getListForListBoxAddUser(option, diffList);
    return finalList;
  },
  updateFeatureLimitsBulkChangesAddUser : function(option){
    var rowsList = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    var featureId="";
    var actionIds=[];
    var isEnable=false;
    var bulkUpdateList=[];
    var typeValue=this.getSelectedTypeAddUser(option);
    var selAccId = [];
    var accSegData = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.data;
    //get all selected accounts
    for(var i=0;i<accSegData.length ;i++){
      for(var j=0; j<accSegData[i][1].length; j++){
        if(accSegData[i][1][j].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
          selAccId.push(accSegData[i][1][j].id)
      }
    }
    //get all assigned feature,action id's
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select")
        featureId=rowsList[i].lstBoxFieldValue11.selectedKey;
      actionIds=[];
      if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems){
        var selItems=rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems;
        for(let i=0;i<selItems.length;i++){
          actionIds.push(selItems[i].actionId);
        }
      }
      if(option=== 1){
        bulkUpdateList.push({"featureId":featureId,"actionIds":actionIds,"isEnabled":typeValue==="enable"?"true":"false"});
      }else{
        bulkUpdateList.push({"featureId":featureId,"actionIds":actionIds,"limitId":typeValue,
                             "limitVal1":rowsList[i].tbxValue21.text, "limitVal2":rowsList[i].tbxValue22.text});
      }
    }
    var isUpdate = option === 1 ? this.updateBulkFeaturesInEditUserObj(selAccId,bulkUpdateList) :
                                  this.updateBulkLimitsInEditUserObj(selAccId,bulkUpdateList);
    if(isUpdate){
      this.view.flxBulkUpdateFeaturesPopupForAddUser.setVisibility(false);
      if(option === 1){
        this.toggleFeaturesAccountLevel();
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.BulkPermissionsUpdateSuccess"), this);
      }
      else{
        this.toggleLimitsAccountLevel();
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.BulkLimitsUpdateSuccess"), this);
      }
    }
  },
  getSelectedTypeAddUser : function(option) {
    var radBtn =  this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.imgRadioButton1.src;
    var radBtn1 = this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.imgRadioButton2.src;
    var radBtn2 = this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.imgRadioButton3.src;
    if(option === 1){
      if(radBtn === this.AdminConsoleCommonUtils.radioSelected) 
        return "enable";
      else
        return "disable";
    }else{
      if(radBtn === this.AdminConsoleCommonUtils.radioSelected) 
        return this.limitId.MAX_TRANSACTION_LIMIT;
      if( radBtn1 === this.AdminConsoleCommonUtils.radioSelected) 
        return this.limitId.DAILY_LIMIT;
      if(radBtn2 === this.AdminConsoleCommonUtils.radioSelected)
        return this.limitId.WEEKLY_LIMIT;
    }
  },
  updateBulkFeaturesInEditUserObj : function(selAccId, bulkUpdateList){
    var count = 0;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custId = selCustData.orignalData.coreCustomerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var currCustAccFeatures = editUserObj.accountMapFeatures;
    for(var i=0; i<selAccId.length ;i++){  
      //get features of the acc id
      var currSelAccObj = editUserObj.accountMapFeatures.get(selAccId[i]);
      var accountFeatures = JSON.parse(currSelAccObj.features);
      for(var m=0; m<accountFeatures.length; m++){
        for(var j=0; j<bulkUpdateList.length; j++){  
          //get the selected feature obj
          if(accountFeatures[m].featureId === bulkUpdateList[j].featureId){
            count =0;
            var currActions = accountFeatures[m].actions || accountFeatures[m].permissions;
            for(var l=0; l<currActions.length; l++){
              for(var k=0; k<bulkUpdateList[j].actionIds.length; k++){
                //update the selected actions
                if(currActions[l].actionId === bulkUpdateList[j].actionIds[k]){
                  if(bulkUpdateList[j].isEnabled === "true"){
                    currActions[l].isEnabled = "true";
                    count = count+1;
                    this.addAccountIdForAction(currActions[l].actionId, selAccId[i]);
                  }else{
                    currActions[l].isEnabled = "false";
                    this.removeAccountIdForAction(currActions[l].actionId, selAccId[i], 1);
                  }
                  break;
                }
              }
            }
            accountFeatures[m].isEnabled = count === 0 ? "false" : "true";
            break;
          }
        }
      }
      currSelAccObj.features = JSON.stringify(accountFeatures);
      editUserObj.accountMapFeatures.set(selAccId[i], currSelAccObj);
    }
    this.presenter.setAccountsFeaturesForAddUser(custId,editUserObj);
    return true;
  },
  updateBulkLimitsInEditUserObj : function(selAccId, bulkUpdateList){
    var count = 0;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custId = selCustData.orignalData.coreCustomerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var currCustAccFeatures = editUserObj.accLevelLimits;
    for(var i=0; i<selAccId.length ;i++){  
      //get features of the acc id
      var currSelAccObj = editUserObj.accLevelLimits.get(selAccId[i]);
      var accountFeatures = JSON.parse(currSelAccObj.limits);
      for(var m=0; m<accountFeatures.length; m++){
        for(var j=0; j<bulkUpdateList.length; j++){  
          //get the selected feature obj
          if(accountFeatures[m].featureId === bulkUpdateList[j].featureId){
            count =0;
            var currActions = accountFeatures[m].actions || accountFeatures[m].permissions;
            for(var l=0; l<currActions.length; l++){
              for(var k=0; k<bulkUpdateList[j].actionIds.length; k++){
                //get the selected actions
                if(currActions[l].actionId === bulkUpdateList[j].actionIds[k]){
                  if(bulkUpdateList[j].limitId === this.limitId.MAX_TRANSACTION_LIMIT){
                    currActions[l].limits[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = bulkUpdateList[j].limitVal1;
                    currActions[l].limits[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = bulkUpdateList[j].limitVal2;
                    
                  }else if(bulkUpdateList[j].limitId === this.limitId.DAILY_LIMIT){
                   currActions[l].limits[this.limitId.PRE_APPROVED_DAILY_LIMIT] = bulkUpdateList[j].limitVal1;
                    currActions[l].limits[this.limitId.AUTO_DENIED_DAILY_LIMIT] = bulkUpdateList[j].limitVal2;

                  } else if(bulkUpdateList[j].limitId === this.limitId.WEEKLY_LIMIT){
                    currActions[l].limits[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = bulkUpdateList[j].limitVal1;
                    currActions[l].limits[this.limitId.AUTO_DENIED_WEEKLY_LIMIT] = bulkUpdateList[j].limitVal2;
                  }
                  break;
                }
              }
            }
            break;
          }
        }
      }
      currSelAccObj.limits = JSON.stringify(accountFeatures);
      editUserObj.accLevelLimits.set(selAccId[i], currSelAccObj);
    }
    this.presenter.setAccountsFeaturesForAddUser(custId,editUserObj);
    return true;
  },
  addAccountsTag : function(accountType){
    var self = this;
    var tagsCount=self.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.widgets().length;
    var newTextTag = self.view.bulkUpdateFeaturesPopupForAddUser.flxSelectionTag.clone(tagsCount.toString());
    var lblname = tagsCount + "lblTagName";
    var imgname = tagsCount + "flxCross";
    var textToSet = accountType.accType + " ("+ accountType.count + ")";
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(textToSet,"12px Lato-Regular");
    self.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.info.added.push(accountType);
    newTextTag[lblname].text = textToSet;
    newTextTag[lblname].tooltip = textToSet;
    newTextTag.isVisible = true;
    newTextTag.width=flexWidth+10+10+15+"px";//labelwidth+left padding+right padding+ cross image width
    var parentWidth= self.view.bulkUpdateFeaturesPopupForAddUser.flxContractDetailsPopupContainer.frame.width - 40;
    var leftVal=20;
    var topVal=0;
    var lineCount=0;
    for(var a=tagsCount-1;a>=0;a--){
      var childWid = self.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.widgets();
      var i= childWid[a].id;
      leftVal=leftVal+(self.view.bulkUpdateFeaturesPopupForAddUser[i].frame.width+15);
      if((leftVal+flexWidth+50)>parentWidth){
        leftVal=20;
        lineCount=lineCount+1;
      }
    }
    newTextTag.left=leftVal+"px";
    if(lineCount>1){
      newTextTag.top=(lineCount-1)*40+"px";
    }else{
      newTextTag.top=topVal+"px";
    }
    self.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.addAt(newTextTag, -1);
    newTextTag[imgname].onTouchStart = function () {
      self.removeTagEditUser(tagsCount);
    };
    self.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.setVisibility(true);
    this.view.forceLayout();
  },
  validateBulkSelectionEditUser : function(){
    var rowsList = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    var isValid=true;
    var selCount=0;
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select"){
        selCount=selCount+1;
        //validation for action selection
        if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems===null){
          isValid=false;
          rowsList[i].flxFieldValueContainer12.skin = "sknFlxCalendarError";
          rowsList[i].lblErrorMsg12.text = "Select atleast one action";
          rowsList[i].flxErrorField12.setVisibility(true);
        }
        //validation for limits
        if(this.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.info.option ===2){
          if(rowsList[i].tbxValue21.text.trim().length===0){
            isValid=false;
            rowsList[i].lblErrorMsg21.text = "Value cannot be empty";
            rowsList[i].flxErrorField21.setVisibility(true);
            rowsList[i].flxValue21.skin = "sknFlxCalendarError";
          }
          if(rowsList[i].tbxValue22.text.trim().length===0){
            isValid=false;
            rowsList[i].lblErrorMsg.text = "Value cannot be empty";
            rowsList[i].flxErrorField22.setVisibility(true);
            rowsList[i].flxValue22.skin = "sknFlxCalendarError";
          }
        }
      }
    }
    //validation for feature selection
    if(selCount===0){
      isValid=false;
      rowsList[0].lstBoxFieldValue11.skin="sknLstBoxeb3017Bor3px";
      rowsList[0].lblErrorMsg11.text="Select atleast one feature";
      rowsList[0].flxErrorField11.setVisibility(true);
    }
    this.view.forceLayout();
    return isValid;
  },
  searchForAccountsInBulkUpdate : function(){
    var searchText = this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.tbxSearchBox.text;
    var searchResults = [];
    if(searchText.length > 0){
      var filteredRows = [];
      var accountCards = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.data;
      for(var i=0;i<accountCards.length;i++){
        filteredRows =[];
        for(var j=0;j<accountCards[i][1].length;j++){
          if(accountCards[i][1][j].lblAccountNumber.text.indexOf(searchText) >= 0 ||
             accountCards[i][1][j].lblAccountName.text.indexOf(searchText) >= 0){
            accountCards[i][1][j].flxContractEnrollAccountsEditRow.isVisible = true;
            filteredRows.push(accountCards[i][1][j]);
          }
        }
        if(filteredRows.length > 0){ // show the account section expanded if it contains rows
          accountCards[i][0].lblIconToggleArrow.text = "\ue915"; //down-arrow
          accountCards[i][0].lblIconToggleArrow.skin = "sknIcon00000014px";
          accountCards[i][0].flxHeaderContainer.isVisible = true;
          accountCards[i][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
          searchResults.push([accountCards[i][0],filteredRows]);
        }
      }
    } else{
      searchResults = accountCards;
    }
    if(searchResults.length > 0){
      this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.setData(searchResults);
    }
  },
  resetAddedRowsAddUser : function(){
    var flxChildren = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.removeAll();
    for(var i=0;i<flxChildren.length;i++){
      this.view.bulkUpdateFeaturesPopupForAddUser.remove(this.view.bulkUpdateFeaturesPopupForAddUser[flxChildren[i].id]);
    }
    var height = this.view.bulkUpdateFeaturesPopupForAddUser.flxContractDetailsPopupContainer.frame.height - (70 + this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateListContainer.frame.y + 80);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxBulkUpdateListContainer.height = height + "dp";
    
    var bulkUpdateOption = this.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.info.option;
    this.bulkUpdateListboxData = this.getListForListBoxAddUser(bulkUpdateOption);
    if(bulkUpdateOption === 1){
      this.addNewFeatureRowBulkUpdateAddUser("enroll");
    }else{
      this.addNewLimitRowBulkUpdateAddUser("enroll");
    }  
    this.view.forceLayout();
  },
  filterAccountRowsInBulkUpdate : function(){
    var selFilter =[], dataToShow =[],count = 0;
    var selInd = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.selectedsectionindex;
    var segData = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.info.allData;
    var sectionData = this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.data[selInd][0];
    var accountsData = segData[sectionData.lblFeatureName];
    var ownershipIndices = this.view.bulkUpdateFeaturesPopupForAddUser.filterMenu.segStatusFilterDropdown.selectedIndices;
    var selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter.push(this.view.bulkUpdateFeaturesPopupForAddUser.filterMenu.segStatusFilterDropdown.data[selOwnershipInd[j]].lblDescription);
    }
    for(var i=0;i<accountsData.length; i++){
      if (selFilter.indexOf(accountsData[i].lblAccountHolder.text) >= 0){
        accountsData[i].flxContractEnrollAccountsEditRow.isVisible = true;
        count = count +1;
      }
      else
        accountsData[i].flxContractEnrollAccountsEditRow.isVisible = false;
    }
    var headerChecboxImg = count === 0 ? this.AdminConsoleCommonUtils.checkboxnormallbl :
        (count === accountsData.length ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxPartiallbl);
    sectionData.lblSectionCheckbox.text= headerChecboxImg;
    sectionData.lblSectionCheckbox.skin = this.applyCheckboxSkin(sectionData.lblSectionCheckbox);
    this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.rowTemplate = "flxContractEnrollAccountsEditRow";
    this.view.bulkUpdateFeaturesPopupForAddUser.segSelectionList.setSectionAt([sectionData,accountsData], selInd);
    this.view.bulkUpdateFeaturesPopupForAddUser.flxFilterMenu.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * search at account level features/limits based on account number
  * @param: option(features:1,limits:2)
  */
  searchFeaturesLimitsAccountLevel: function (option) {
    var count = 0;
    var allAccountCards = (option === 1) ? this.view.flxAddedUserEditAccFeaturesList.widgets() : this.view.flxAddedUserEditAccLimitsList.widgets();
    var searchText = (option === 1) ? this.view.searchEditFeatures.tbxSearchBox.text.trim() : this.view.searchEditLimits.tbxSearchBox.text.trim();
    var accountsFeatureArray = this.filterFeaturesLimitsBasedOnAccType(option);
    var searchFilteredCard = [];
    if (accountsFeatureArray.length === 0) {
      searchFilteredCard = [];
    } else {
      if (searchText.length > 0) { //filter for search text if any
        for (var q = 0; q < accountsFeatureArray.length; q++) {
          if (accountsFeatureArray[q].accountDetails.accountId.indexOf(searchText.toLowerCase()) >= 0) {
            searchFilteredCard.push(accountsFeatureArray[q]);
          }
        }
      } else {
        searchFilteredCard = accountsFeatureArray;
      }
    }
	this.resetPaginationValues(searchFilteredCard.length,option);
    if (option === 1) { //features tab
      if (searchFilteredCard.length === 0) {
        this.searchResultsFeaturesLimits = [];
        this.view.flxAddedUserEditAccFeaturesListCont.setVisibility(false);
      } else {
        this.searchResultsFeaturesLimits = searchFilteredCard;
        this.createFeatureCardForAccounts(searchFilteredCard);
        this.view.flxAddedUserEditAccFeaturesListCont.setVisibility(true);
      }
    } else { //limits tab
      if (searchFilteredCard.length === 0) {
        this.view.flxEnrollEditNoResultAccLimits.setVisibility(true);
      } else {
        this.searchResultsFeaturesLimits = searchFilteredCard;
        this.createLimitsCardForAccounts(searchFilteredCard);
        this.view.flxAddedUserEditAccLimitsListCont.setVisibility(true);
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  /*
  * filter the account level features/limits based on selected acc types
  * @param: option(1:features,2:limits)
  * @return: filtered feature/limits card components
  */
  filterFeaturesLimitsBasedOnAccType: function (option) {
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var accLevelFeaturesArray = [];
    if (option === 1) {
      var accLevelFeaturesMap = editUserObj.accountMapFeatures;
      accLevelFeaturesArray = Array.from(accLevelFeaturesMap.values());
    } else {
      var accLevelLimitsMap = editUserObj.accLevelLimits;
      accLevelFeaturesArray = Array.from(accLevelLimitsMap.values());
    }
    //get selected types
    var typeIndices = this.view.customListBoxAccounts.segList.selectedIndices;
    var selFilter = [], dataToShow = [];
    var types = "";
    var selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter.push(this.view.customListBoxAccounts.segList.data[selTypeInd[i]].lblDescription);
    }
    if (selFilter.length === 0) { //none selected
      dataToShow = [];
    } else if (selFilter.length === this.view.customListBoxAccounts.segList.data.length) { //all selected
      for (var i = 0; i < accLevelFeaturesArray.length; i++) {
        dataToShow = accLevelFeaturesArray;
      }
    } else {
      for (var i = 0; i < accLevelFeaturesArray.length; i++) {
        if (selFilter.indexOf(accLevelFeaturesArray[i].accountDetails.accountType) >= 0) {
          dataToShow.push(accLevelFeaturesArray[i]);
        }
      }
    }
    this.view.customListBoxAccounts.segList.setData.info.selectedText = this.view.customListBoxAccounts.lblSelectedValue.text;
    return dataToShow;
  },
  searchFeaturesCustomerLevel : function(option){
    var searchWidgetPath,cardWidgetPath;
    if(option === 1){
      searchWidgetPath =this.view.searchEditFeatures;
      cardWidgetPath = this.view.addedUserEditFeaturesCard;
    }else{
      searchWidgetPath =this.view.searchEditOtherFeatures;
      cardWidgetPath = this.view.addedUserEditOtherFeaturesCard;
    }
    var searchText = searchWidgetPath.tbxSearchBox.text;
    var actualData = cardWidgetPath.segAccountFeatures.info.segDataJSON;
    var featureNamesList = Object.keys(actualData);
    var filterData = [],filteredSection = [],filteredRowData = [],updateDetailsObj =[];
    if(searchText.length > 0){
      for(var i=0; i<featureNamesList.length;i++){
        filteredRowData = [];
        //search for action first
        for(var j=0; j<actualData[featureNamesList[i]][1].length;j++){
          updateDetailsObj =[]
          updateDetailsObj.push(actualData[featureNamesList[i]][0]);
          updateDetailsObj.push(actualData[featureNamesList[i]][1]);
          if(updateDetailsObj[1][j].lblFeatureName.text.toLowerCase().indexOf(searchText) >= 0){       
            filteredRowData.push(updateDetailsObj[1][j]);
          }
        }
        if(filteredRowData.length >0){
          updateDetailsObj[0].lblSectionCheckbox.text = this.getHeaderCheckboxLabel(filteredRowData,true, true);
          updateDetailsObj[0].lblSectionCheckbox.skin = this.applyCheckboxSkin(updateDetailsObj[0].lblSectionCheckbox);
          filterData.push([updateDetailsObj[0],filteredRowData]);  
        }else{ // filter for only feature
          if(updateDetailsObj[0].lblFeatureName.toLowerCase().indexOf(searchText) >= 0){
             updateDetailsObj[1] = this.showHideSegRowFlex(updateDetailsObj[1],false);
             filterData.push(updateDetailsObj);
          }
        }
      }
    } else{
      filterData = Object.values(actualData);
    }
    cardWidgetPath.lblSectionCheckbox.text = this.getHeaderCheckboxLabel(cardWidgetPath.segAccountFeatures.data,false, true);
    cardWidgetPath.lblSectionCheckbox.skin = this.applyCheckboxSkin(cardWidgetPath.lblSectionCheckbox);
    cardWidgetPath.lblCount.text = this.getSelectedItemsCount(filterData, false);
    cardWidgetPath.lblTotalCount.text = "of "+ this.getTwoDigitNumber(filterData.length);
    cardWidgetPath.segAccountFeatures.rowTemplate = "flxContractEnrollFeaturesEditRow";
    cardWidgetPath.segAccountFeatures.setData(filterData);
    this.view.forceLayout();
  },
  setFlowActions : function(){
    var scopeObj = this;
    
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
    this.view.searchEditAccounts.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchEditAccounts.setSearchBoxFocus(true);
    };
    this.view.searchEditAccounts.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchEditAccounts.setSearchBoxFocus(false);
    };
    this.view.searchEditAccounts.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchEditAccounts.tbxSearchBox.text === ""){
        scopeObj.view.searchEditAccounts.clearSearchBox();
      } else{
        scopeObj.view.searchEditAccounts.setSearchBoxFocus(true);
        scopeObj.view.searchEditAccounts.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditAccounts.forceLayout();
      }
      scopeObj.searchFilterForAccounts();
    };
    this.view.searchEditAccounts.flxSearchCancel.onClick = function(){
      scopeObj.view.searchEditAccounts.clearSearchBox();
      scopeObj.searchFilterForAccounts();
    };
    this.view.searchEditFeatures.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchEditFeatures.setSearchBoxFocus(true);
    };
    this.view.searchEditFeatures.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchEditFeatures.setSearchBoxFocus(false);
    };
    const accFeaturesSearchKeyUp = debounce(scopeObj.searchFeaturesLimitsAccountLevel.bind(scopeObj,1),200);
    this.view.searchEditFeatures.tbxSearchBox.onDone = function(){
      if(scopeObj.view.searchEditFeatures.tbxSearchBox.text === ""){
        scopeObj.view.searchEditFeatures.clearSearchBox();
      } else{
        scopeObj.view.searchEditFeatures.setSearchBoxFocus(true);
        scopeObj.view.searchEditFeatures.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditFeatures.forceLayout();
      }
      if (scopeObj.view.searchEditFeatures.tbxSearchBox.text.length > 3 || scopeObj.view.searchEditFeatures.tbxSearchBox.text === "") {
        if (scopeObj.view.flxAddedUserEditFeaturesList.isVisible === true) {
          scopeObj.searchFeaturesCustomerLevel(1);
        } else {
          accFeaturesSearchKeyUp();
        }
      }
    };
    this.view.searchEditFeatures.flxSearchCancel.onClick = function(){
      scopeObj.view.searchEditFeatures.clearSearchBox();
      if(scopeObj.view.flxAddedUserEditFeaturesList.isVisible === true){
        scopeObj.searchFeaturesCustomerLevel(1);
      }else{
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var featuresTimeout = setTimeout(scopeObj.searchFeaturesLimitsAccountLevel.bind(scopeObj,1));
      }
    };
    this.view.searchEditOtherFeatures.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchEditOtherFeatures.setSearchBoxFocus(true);
    };
    this.view.searchEditOtherFeatures.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchEditOtherFeatures.setSearchBoxFocus(false);
    };
    this.view.searchEditOtherFeatures.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchEditOtherFeatures.tbxSearchBox.text === ""){
        scopeObj.view.searchEditOtherFeatures.clearSearchBox();
      } else{
        scopeObj.view.searchEditOtherFeatures.setSearchBoxFocus(true);
        scopeObj.view.searchEditOtherFeatures.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditOtherFeatures.forceLayout();
      }
      scopeObj.searchFeaturesCustomerLevel(2);
    };
    this.view.searchEditOtherFeatures.flxSearchCancel.onClick = function(){
      scopeObj.view.searchEditOtherFeatures.clearSearchBox();
      scopeObj.searchFeaturesCustomerLevel(2);
    };
    this.view.searchEditLimits.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchEditLimits.setSearchBoxFocus(true);
    };
    this.view.searchEditLimits.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchEditLimits.setSearchBoxFocus(false);
    };
     const accLimitsSearchKeyUp = debounce(scopeObj.searchFeaturesLimitsAccountLevel.bind(scopeObj,2),200);
    this.view.searchEditLimits.tbxSearchBox.onDone = function(){
      if(scopeObj.view.searchEditLimits.tbxSearchBox.text === ""){
        scopeObj.view.searchEditLimits.clearSearchBox();
      } else{
        scopeObj.view.searchEditLimits.setSearchBoxFocus(true);
        scopeObj.view.searchEditLimits.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditLimits.forceLayout();
      }
      if(scopeObj.view.flxAddedUserEditLimitsList.isVisible === true){  
      }else{ //acc level tab
        if (scopeObj.view.searchEditLimits.tbxSearchBox.text === "" || scopeObj.view.searchEditLimits.tbxSearchBox.text.length > 3)
          accLimitsSearchKeyUp(2);
      }
    };
    this.view.searchEditLimits.flxSearchCancel.onClick = function(){
      scopeObj.view.searchEditLimits.clearSearchBox();
      if(scopeObj.view.flxAddedUserEditLimitsList.isVisible === true){
      }else{ //acc level tab
         kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var featuresTimeout = setTimeout(scopeObj.searchFeaturesLimitsAccountLevel.bind(scopeObj,2));
      }
    };
    this.view.searchEditSignatory.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchEditSignatory.setSearchBoxFocus(true);
    };
    this.view.searchEditSignatory.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchEditSignatory.setSearchBoxFocus(false);
    };
    this.view.searchEditSignatory.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchEditSignatory.tbxSearchBox.text === ""){
        scopeObj.view.searchEditSignatory.clearSearchBox();
      } else{
        scopeObj.view.searchEditSignatory.setSearchBoxFocus(true);
        scopeObj.view.searchEditSignatory.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditSignatory.forceLayout();
      }
      scopeObj.searchSignatoryGroups();
    };
    this.view.searchEditSignatory.flxSearchCancel.onClick = function(){
      scopeObj.view.searchEditSignatory.clearSearchBox();
      scopeObj.searchSignatoryGroups();
    };
    this.view.btnBulkUpdateFeatures.onClick = function(){
      scopeObj.showBulkUpdatePopupEditUser(1);
    };
    this.view.btnBulkUpdateLimits.onClick = function(){
      scopeObj.showBulkUpdatePopupEditUser(2);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.commonButtonsScreen1.btnSave.onClick = function(){
      scopeObj.getSelectedAccountTypesCount();
      scopeObj.showBulkUpdatePopupScreenAddUser2();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.flxFilterMenu.onHover = this.onHoverEventCallback;
    this.view.bulkUpdateFeaturesPopupForAddUser.commonButtonsScreen1.btnCancel.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopupForAddUser.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.flxPopUpClose.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopupForAddUser.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.commonButtonsScreen2.btnSave.onClick = function(){
        if(scopeObj.validateBulkSelectionEditUser())
          scopeObj.updateFeatureLimitsBulkChangesAddUser(scopeObj.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.info.option);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.commonButtonsScreen2.btnCancel.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopupForAddUser.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.btnAddNewRow.onClick = function(){
      if(scopeObj.view.bulkUpdateFeaturesPopupForAddUser.lblDetailsHeading.info.option === 1){
        scopeObj.addNewFeatureRowBulkUpdateAddUser("enroll");
      } else{
        scopeObj.addNewLimitRowBulkUpdateAddUser("enroll");
      }  
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.setSearchBoxFocus(true);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.setSearchBoxFocus(false);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.tbxSearchBox.text === ""){
        scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.clearSearchBox();
      } else{
        scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.setSearchBoxFocus(true);
        scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.flxSearchCancel.setVisibility(true);
        scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.forceLayout();
      }
      scopeObj.searchForAccountsInBulkUpdate();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.flxSearchCancel.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesPopupForAddUser.searchBoxScreen1.clearSearchBox();
      scopeObj.searchForAccountsInBulkUpdate();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.imgRadioButton1.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.imgRadioButton2.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.customRadioButtonGroup.imgRadioButton3.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.btnModifySearch.onClick = function(){
        scopeObj.showBulkUpdatePopupScreenAddUser1();
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.flxArrow.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesPopupForAddUser.flxTagsContainer.setVisibility(!scopeObj.view.bulkUpdateFeaturesPopupForAddUser.isVisible);
    };
    this.view.bulkUpdateFeaturesPopupForAddUser.filterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.filterAccountRowsInBulkUpdate();
    };
    this.view.flxAddedUserEditFeatureFilter.onClick = function(){
      scopeObj.showAccountTypesFilter(1);
      var selInd = scopeObj.view.customListBoxAccounts.segList.selectedRowIndices;
      var indicesToSet = (selInd && selInd.length > 0) ? JSON.stringify(selInd[0][1]) : JSON.stringify([]);
      scopeObj.view.customListBoxAccounts.segList.info.prevSelInd = indicesToSet;
    };
    this.view.flxAddedUserEditLimitsFilter.onClick = function(){
      scopeObj.showAccountTypesFilter(2);
      var selInd = scopeObj.view.customListBoxAccounts.segList.selectedRowIndices;
      var indicesToSet = (selInd && selInd.length > 0) ? JSON.stringify(selInd[0][1]) : JSON.stringify([]);
      scopeObj.view.customListBoxAccounts.segList.info.prevSelInd = indicesToSet;
    };
    this.view.btnApplyFilter.onClick = function(){
      if(scopeObj.view.flxAddedUserEditFeaturesContainer.isVisible === true){
        scopeObj.searchFeaturesLimitsAccountLevel(1);
      } else{
        scopeObj.searchFeaturesLimitsAccountLevel(2);
      }
      scopeObj.view.flxAccountTypesFilter.setVisibility(false);
    };
    this.view.flxImage.onClick = function(){
      var prevSelInd = JSON.parse(scopeObj.view.customListBoxAccounts.segList.info.prevSelInd);
      scopeObj.view.customListBoxAccounts.segList.selectedRowIndices = [[0,prevSelInd]];
      scopeObj.view.customListBoxAccounts.lblSelectedValue.text = scopeObj.view.customListBoxAccounts.segList.setData.info.selectedText;
      scopeObj.view.flxAccountTypesFilter.setVisibility(false);
    };
    this.view.customListBoxAccounts.flxSelectedText.onClick = function(){
      var isVisible = scopeObj.view.customListBoxAccounts.flxSegmentList.isVisible;
      scopeObj.view.customListBoxAccounts.flxSegmentList.setVisibility(!isVisible);
    };
    this.view.customListBoxAccounts.segList.onRowClick = function(){
      var segData = scopeObj.view.customListBoxAccounts.segList.data;
      var selInd = scopeObj.view.customListBoxAccounts.segList.selectedRowIndices;
      var selRows = (selInd && selInd.length > 0) ? selInd[0][1] : [];
      var selText = (selRows.length > 1 || selRows.length === 0) ?
          selRows.length+" "+kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected") : segData[selRows[0]].lblDescription; 
      scopeObj.view.customListBoxAccounts.lblSelectedValue.text = selText;
    };
    this.view.accountTypesFilterMenuAddUser.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchFilterForAccounts();
    };
    this.view.ownershipFilterMenuAddUser.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchFilterForAccounts();
    };
    this.view.btnClearOtherCustomer.onClick = function(){
      scopeObj.clearAllinfoOtherCustomerSearch();
    };
    this.view.flxExistingUserName.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserName.text", scopeObj.view.segExistingUserListContainer,2);
    };
    this.view.flxExistingUserCustId.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserCustId.text", scopeObj.view.segExistingUserListContainer,2);
    };
    this.view.flxExistingUserTaxId.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserTaxId.text", scopeObj.view.segExistingUserListContainer,2);
    };
    this.view.flxExistingUserDOB.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserDOB.text", scopeObj.view.segExistingUserListContainer,2);
    };
    this.view.flxExistingUserPhoneNumber.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserPhoneNumber.text", scopeObj.view.segExistingUserListContainer,2);
    };
    this.view.flxExistingUserEmailId.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserEmailId.text", scopeObj.view.segExistingUserListContainer,1);
    };
    this.view.flxOtherRelatedCustName.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserName.text", scopeObj.view.segOtherRelatedCustList,1);
    };
    this.view.flxOtherRelatedCustCustId.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserCustId.text", scopeObj.view.segOtherRelatedCustList,1);
    };
    this.view.flxOtherRelatedCustTaxId.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserTaxId.text", scopeObj.view.segOtherRelatedCustList,1);
    };
    this.view.flxOtherRelatedCustDOB.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserDOB.text", scopeObj.view.segOtherRelatedCustList,1);
    };
    this.view.flxOtherRelatedCustPhoneNumber.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserPhoneNumber.text", scopeObj.view.segOtherRelatedCustList,1);
    };
    this.view.flxOtherRelatedCustEmailId.onClick = function(){
      scopeObj.sortSegmentData("lblExistingUserEmailId.text", scopeObj.view.segOtherRelatedCustList,1);
    };
    this.view.toggleButtonsLimits.btnToggleRight.onClick = function(){
      scopeObj.toggleLimitsAccountLevel();
    };
    this.view.toggleButtonsLimits.btnToggleLeft.onClick = function(){
      scopeObj.toggleLimitsCustomerLevel();
    };
    this.view.toggleButtonsFeatures.btnToggleLeft.onClick = function(){
      scopeObj.toggleFeaturesCustomerLevel();
    };
    this.view.toggleButtonsFeatures.btnToggleRight.onClick = function(){
      scopeObj.toggleFeaturesAccountLevel();
    };
    this.view.commonButtonsEditAccounts.btnSave.onClick = function(){
      function validateLimitsAcc(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if(isValid){
          scopeObj.collectAllInfoAndSave();
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerAcc = setTimeout(validateLimitsAcc,0);
    };
    this.view.commonButtonsEditFeatures.btnSave.onClick = function(){
      function validateLimitsFeature(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if(isValid){
          scopeObj.collectAllInfoAndSave();
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerFeat = setTimeout(validateLimitsFeature,0);
    };
    this.view.commonButtonsEditOF.btnSave.onClick = function(){
      function validateLimitsOF(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if(isValid){
          scopeObj.collectAllInfoAndSave();
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerOF = setTimeout(validateLimitsOF,0);
    };
    this.view.commonButtonsEditLimits.btnSave.onClick = function(){
      function validateLimitsTab(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if(isValid){
          scopeObj.collectAllInfoAndSave();
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimer = setTimeout(validateLimitsTab,0);
    };
    this.view.AddedUserEditVerticalTabs.btnOption1.onClick = function(){
      scopeObj.showEditAccountsScreen();
    };
    this.view.AddedUserEditVerticalTabs.btnOption2.onClick = function(){
      scopeObj.showEditFeaturesScreen();
    };
    this.view.AddedUserEditVerticalTabs.btnOption3.onClick = function(){
      scopeObj.showEditOtherFeaturesScreen();
    };
    this.view.AddedUserEditVerticalTabs.btnOption4.onClick = function(){
      scopeObj.showEditLimitsScreen(1);
    };
    this.view.AddedUserEditVerticalTabs.btnOption5.onClick = function(){
      scopeObj.showSignatoryGroupScreen();
    };
    this.view.commonButtonsEditAccounts.btnNext.onClick = function(){
      scopeObj.showEditFeaturesScreen();
    };
    this.view.commonButtonsEditFeatures.btnNext.onClick = function(){
      scopeObj.showEditOtherFeaturesScreen()
    };
    this.view.commonButtonsEditOF.btnNext.onClick = function(){
      scopeObj.showEditLimitsScreen(1);
    }
     this.view.commonButtonsEditLimits.btnNext.onClick = function(){
      scopeObj.showSignatoryGroupScreen();
    }
    this.view.commonButtonsEditAccounts.btnCancel.onClick = function(){
      scopeObj.hideEditScreen();
    };
    this.view.commonButtonsEditFeatures.btnCancel.onClick = function(){
      scopeObj.hideEditScreen();
    };
    this.view.commonButtonsEditLimits.btnCancel.onClick = function(){
      scopeObj.hideEditScreen();
    };
    this.view.commonButtonsEditOF.btnCancel.onClick = function(){
      scopeObj.hideEditScreen();
    };
   this.view.commonButtonsEditSignatories.btnCancel.onClick =function(){
      scopeObj.hideEditScreen();
   };
    this.view.commonButtonsEditSignatories.btnSave.onClick = function(){
      function validateLimitsSG(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if(isValid){
          scopeObj.collectAllInfoAndSave();
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerSG = setTimeout(validateLimitsSG,0);
    };    
    this.view.btnLink1.onClick = function(){
      scopeObj.navigatetoEditAccountsPage();
    };
    this.view.btnLink2.onClick = function(){
      scopeObj.navigatetoEditAccountLevelFeaturePage();
    };
    this.view.btnLink3.onClick = function(){
      scopeObj.navigateToLimitScreen();
    }; 
 
    this.view.btnLink4.onClick = function(){
       scopeObj.navigateToSignatoryGroupScreen();
    };
	this.view.textBoxAddOtherUserEntry11.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationOnNewUser(scopeObj.view.textBoxAddOtherUserEntry11tbxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry11.flxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry11.flxInlineError);
    };
    this.view.textBoxAddOtherUserEntry13.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationOnNewUser(scopeObj.view.textBoxAddOtherUserEntry11tbxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry13.flxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry13.flxInlineError);
    };
    this.view.textBoxAddOtherUserEntry21.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationOnNewUser(scopeObj.view.textBoxAddOtherUserEntry11tbxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry21.flxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry21.flxInlineError);
    };
    this.view.textBoxAddOtherUserEntry22.txtISDCode.onEndEditing = function() {
      if (scopeObj.view.textBoxAddOtherUserEntry22.txtISDCode.text[0] !== "+") {
        scopeObj.view.textBoxAddOtherUserEntry22.txtISDCode.text = "+" + scopeObj.view.textBoxAddOtherUserEntry22.txtISDCode.text;
      }
    };
    this.view.textBoxAddOtherUserEntry22.txtISDCode.onKeyUp = function(){
      scopeObj.view.textBoxAddOtherUserEntry22.hideErrorMsg(1);
      if(scopeObj.view.textBoxAddOtherUserEntry22.txtContactNumber.text === ""){
        scopeObj.view.textBoxAddOtherUserEntry22.hideErrorMsg(2);
      }
    };
    this.view.textBoxAddOtherUserEntry22.txtContactNumber.onKeyUp = function(){
      scopeObj.view.textBoxAddOtherUserEntry22.hideErrorMsg(2);
    };
    this.view.calAddOtherUserEntry23DOB.event = function(){
      scopeObj.view.textBoxAddOtherUserEntry23Cal.skin = "sknflxffffffoptemplateop3px";
      scopeObj.view.textBoxAddOtherUserEntry23.flxInlineError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.textBoxAddOtherUserEntry31.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationOnNewUser(scopeObj.view.textBoxAddOtherUserEntry31tbxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry31.flxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserEntry31.flxInlineError);
    };  
    this.view.textBoxAddOtherUserContactEntry1.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationOnNewUser(scopeObj.view.textBoxAddOtherUserContactEntry1tbxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserContactEntry1.flxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserContactEntry1.flxInlineError);
    }; 
    this.view.textBoxAddOtherUserContactEntry2.txtISDCode.onKeyUp = function(){
      scopeObj.clearValidationOnNewUserContactInfo(scopeObj.view.textBoxAddOtherUserContactEntry2txtISDCode,
                                        scopeObj.view.textBoxAddOtherUserContactEntry2.txtISDCode,
                                        scopeObj.view.textBoxAddOtherUserContactEntry2.flxError);
    }; 
    this.view.textBoxAddOtherUserContactEntry2.txtContactNumber.onKeyUp = function(){
      scopeObj.clearValidationOnNewUserContactInfo(scopeObj.view.textBoxAddOtherUserContactEntry2txtContactNumber,
                                        scopeObj.view.textBoxAddOtherUserContactEntry2.txtContactNumber,
                                        scopeObj.view.textBoxAddOtherUserContactEntry2.flxError);
    }; 
    this.view.textBoxAddOtherUserContactEntry3.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationOnNewUser(scopeObj.view.textBoxAddOtherUserContactEntry3tbxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserContactEntry3.flxEnterValue,
                                        scopeObj.view.textBoxAddOtherUserContactEntry3.flxInlineError);
    }; 
    
    this.view.btnAddUser.onClick = function(){
      scopeObj.createAddUSerPayload();
    };
    this.view.commonButtonsAddCustomer.btnCancel.onClick = function(){
      scopeObj.hideAddCustomerID();
    };
    this.view.commonButtonsAddCustomer.btnSave.onClick = function(){
	  scopeObj.addModifiedCustomerList();     
    };
    this.view.flxAddCustomerCross.onClick = function(){
      scopeObj.hideAddCustomerID();
    };
    this.view.btnAddCustomerId.onClick = function(){
      scopeObj.addCustomerID();
    };
    this.view.flxOption2.onClick = function(){
      scopeObj.removeRowFromCustSeg();
    };
    this.view.flxContextualMenu.onHover = this.onHoverEventCallback;
    this.view.commonButtonsAddOtherUser.btnSave.onClick = function(){
      scopeObj.view.addExistingcommonButtons.btnSave.condition = 1;
      scopeObj.addUserNextFunction(2);
    };
    this.view.btnAddUsers.onClick = function(){
      scopeObj.visbiltyChangesForAddUserButton();
    };   
   this.view.addExistingcommonButtons.btnSave.onClick = function() {
            if (scopeObj.view.addExistingcommonButtons.btnSave.text === "NEXT") {
                if(scopeObj.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.info.LEId===true)
                {
                  scopeObj.navigateToAddedUser();
                }
                else{
                     scopeObj.addUserNextFunction(1);
                     scopeObj.view.flxAddUserFromExistingCustomerContainer.setVisibility(false);
                }
         }
        else if (scopeObj.view.addExistingcommonButtons.btnSave.text === "SUBMIT" && scopeObj.view.flxAddOtherUserContactInfo.isVisible === true) {
                if (scopeObj.validateContactInfo()) {
                    scopeObj.view.flxAddUserFromExistingCustomerContainer.setVisibility(false);
                    scopeObj.addUserNextFunction(1);
                    scopeObj.view.flxSearchInner.setVisibility(false);
                }
            } else {
                scopeObj.existingUserAddOnClick();
            }
        };
    this.view.btnSearchAddExistingUserRelatatedCustomer.onClick = function(){
      scopeObj.searchRelatedCustomers();
    };
    this.view.btnSearchOtherCustomer.onClick = function(){
      scopeObj.view.addExistingcommonButtons.btnSave.condition = 1;
      scopeObj.searchOtherCustomers();
    };
    this.view.btnSearchOtherCustomerByUserId.onClick = function(){
      scopeObj.view.addExistingcommonButtons.btnSave.condition = 2;
      scopeObj.searchOtherCustomersByUserId();
    };
    this.view.contractCustomers.flxDropdown.onClick = function(){
      scopeObj.toggleCustomerDropDown();
    };
    this.view.btnSearchUserCancel.onClick = function(){
      scopeObj.view.flxSearchCompanies.setVisibility(false);
      scopeObj.view.flxRadio1.onClick();
     // scopeObj.view.flxCreateCompany.setVisibility(false);
      //scopeObj.view.flxCreateContract.setVisibility(false);
      scopeObj.view.flxCompanyDetails.setVisibility(true);
      scopeObj.view.flxAddUser.setVisibility(false);
      if(scopeObj.prevBreadCrumb.enterif)
      {
        scopeObj.view.breadcrumbs.btnBackToMain.onClick = scopeObj.prevBreadCrumb.Action;
        scopeObj.view.breadcrumbs.lblCurrentScreen.text = scopeObj.view.lblCompanyDetailName.text.toUpperCase();
        scopeObj.view.breadcrumbs.btnBackToMain.text = scopeObj.prevBreadCrumb.text;
        scopeObj.prevBreadCrumb.enterif = false;
      }
    }
    this.view.btntoggleRelatedOther.onClick = function(){
      scopeObj.togglePopUpScreens();
    }
    this.view.btnAddExistingUser.onClick = function(){
      scopeObj.view.flxRadio1.onClick();
      scopeObj.showAddExistingUserContainer();
      scopeObj.showAddExistingPopUp();
    }
    this.view.btnAddNewUser.onClick = function(){
      scopeObj.showAddOtherUserContainer();
    }
    this.view.flxAddExistingUserCross.onClick = function(){
     scopeObj.view.flxAddUserFromExistingCustomerContainer.setVisibility(false);
     scopeObj.view.flxRadio1.onClick();	
    }
    this.view.flxContactInfoCross.onClick = function(){
     scopeObj.view.addExistingcommonButtons.btnSave.skin = "sknBtn7B7B7BRad20px";
     scopeObj.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn7B7B7BRad20px";
     scopeObj.view.addExistingcommonButtons.btnSave.setEnabled(false);
     scopeObj.view.flxAddExistingUserOtherCustomer.setVisibility(true);
     scopeObj.view.flxAddOtherUserContactInfo.setVisibility(false);
     scopeObj.view.flxAddExistingUserPopupHeader.setVisibility(true);
     scopeObj.view.flxAddExistingUserRelatatedCustomer.setVisibility(false);
    }
    this.view.addExistingcommonButtons.btnCancel.onClick = function(){
      	scopeObj.view.flxOtherCusotmerListContainerUserId.setVisibility(false);
	    scopeObj.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text="";
      if(scopeObj.view.flxAddOtherUserContactInfo.isVisible === true && scopeObj.view.addExistingcommonButtons.btnCancel.isVisible === true){
        scopeObj.view.flxAddUserFromExistingCustomerContainer.setVisibility(false);
      }else if(scopeObj.view.flxAddOtherUserContactInfo.isVisible === true){
        scopeObj.view.flxAddExistingUserOtherCustomer.setVisibility(true);
        scopeObj.view.flxAddOtherUserContactInfo.setVisibility(false);
        scopeObj.view.flxAddExistingUserPopupHeader.setVisibility(true);
        scopeObj.view.addExistingcommonButtons.btnSave.skin = "sknBtn7B7B7BRad20px";
        scopeObj.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn7B7B7BRad20px";
        scopeObj.view.addExistingcommonButtons.btnSave.setEnabled(false);
        scopeObj.view.flxAddExistingUserRelatatedCustomer.setVisibility(false);
      }
      else{
       scopeObj.view.flxAddUserFromExistingCustomerContainer.setVisibility(false);
       scopeObj.view.flxRadio1.onClick();
      }
    }
    this.view.flxAddOtherUserCross.onClick = function(){
      scopeObj.view.flxAddOtherUserContainer.setVisibility(false);
    }
    this.view.commonButtonsAddOtherUser.btnCancel.onClick = function(){
      scopeObj.view.flxAddOtherUserContainer.setVisibility(false);
    }
  
    this.view.popUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxUnlinkAccount.setVisibility(false);
    };
    this.view.popUp.flxPopUpClose.onTouchEnd = function(){
      scopeObj.view.flxUnlinkAccount.setVisibility(false);
    };
    this.view.popUp.btnPopUpDelete.onClick = function(){
      scopeObj.accountUnlink();
    };
   
    this.view.flxViewTab1.onTouchEnd = function(){
      scopeObj.showAccounts();
    };
    this.view.flxViewTab2.onTouchEnd = function(){
      scopeObj.showFeatures();
    };
    this.view.flxViewTab3.onTouchEnd = function(){
      scopeObj.showLimits();
    };
    this.view.flxViewTab4.onTouchEnd = function(){
//       scopeObj.presenter.geMaxAuthSignatories({"id":scopeObj.completeCompanyDetails.CompanyContext[0].businessTypeId});
//       scopeObj.inAuthorizedSignatoriesUi = true;
      // scopeObj.showCustomers();
      scopeObj.showSignatories();
    };
    this.view.flxViewTab5.onTouchEnd = function(){
      scopeObj.tabUtilLabelFunction([ scopeObj.view.lblTabName1,scopeObj.view.lblTabName2,scopeObj.view.lblTabName3,
                                     scopeObj.view.lblTabName4,scopeObj.view.lblTabName5, scopeObj.view.lblTabName6],scopeObj.view.lblTabName5);
      scopeObj.hideAllTabsDetails();
      //new approval matrixUI changes
      scopeObj.fetchContractApprovalMatrix(1);
      scopeObj.showApprovalMatrixTab();
    };
    this.view.flxViewTab6.onTouchEnd = function(){
     scopeObj.showSignatoryGroups();
     scopeObj.view.tbxGroupsSearch.text = "";
     scopeObj.view.flxClearGroupsSearch.setVisibility(false);
    };
   // this.view.tbxSearch.onKeyUp = function(){
     // scopeObj.getGoogleSuggestion(scopeObj.view.tbxSearch.text);
    //};
    
    const searchInternalUsers1 = function() {
      scopeObj.view.flxBackground.onClick();
        scopeObj.view.flxGroupsBackground.onClick();
        scopeObj.view.flxFeatureSearchBox.onClick();
        scopeObj.view.flxSearchBackground.onClick();
    };
    
    const searchInternalUsersCall = debounce(searchInternalUsers1, 300);

    this.view.tbxTransactionSearch.onKeyUp = function(){
      if(scopeObj.view.tbxTransactionSearch.text === ""){
        scopeObj.view.flxClearTransactionSearch.onClick();
      }else{
        scopeObj.view.flxClearTransactionSearch.setVisibility(true);
      }
      searchInternalUsersCall();
      scopeObj.view.forceLayout();
    };
    const searchSignatoryGroups = function() {
        scopeObj.view.flxGroupsBackground.onClick();
    };
   const searchSignatoryGroupsCall = debounce(searchSignatoryGroups, 300);
     this.view.tbxGroupsSearch.onKeyUp = function() {
            if (scopeObj.view.tbxGroupsSearch.text === "") {
                scopeObj.view.flxClearGroupsSearch.onClick();
            } else {
                scopeObj.view.flxClearGroupsSearch.setVisibility(true);
            }
            searchSignatoryGroupsCall();
            scopeObj.view.forceLayout();
        };
           this.view.flxClearGroupsSearch.onClick = function() {
            scopeObj.view.tbxGroupsSearch.text = "";
            scopeObj.view.flxClearGroupsSearch.setVisibility(false);
            scopeObj.view.flxGroupsBackground.onClick();  
        };
    
    this.view.contractDetailsPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxContractDetailsPopup.setVisibility(false);
      if(scopeObj.view.contractDetailsPopup.flxBackOption.isVisible)
      	scopeObj.view.flxCustomerSearchPopUp.setVisibility(true);
    };
    this.view.flxClearTransactionSearch.onClick = function(){
      scopeObj.view.tbxTransactionSearch.text = "";
      scopeObj.view.flxClearTransactionSearch.setVisibility(false);

      // if search performed than we reset the data
      // searching in the contracts
      if(scopeObj.currViewContractsTab == 'Accounts'){
        scopeObj.createDynamicFlexForContract(scopeObj.completeContractDetails.contractCustomers , 'Accounts');
      }else if(scopeObj.currViewContractsTab== 'Features'){
        scopeObj.createDynamicFlexForContract(this.globalLevelPermissionsFeatures , 'Features');
      }
      else{
        scopeObj.createDynamicFlexForContract(this.setTransactionLimits , 'Limits');
      }
          
    };
    
   this.view.DataFields.flxPopUpClose.onClick = function(){
	   scopeObj.view.flxAccountsPopup.setVisibility(false);
    }
    this.view.flxBackground.onClick = function(){
      // if text is empty we won't perform the search
      if(scopeObj.view.tbxTransactionSearch.text === ""){
            
        return;
      }  
      scopeObj.isSearchPerformedViewCont = true;
      
      // reset the flags
      scopeObj.searchResult = {
        isFeatureMatched : false,
        isLimitMatched : false,
        isAcctMatched : false,
        isActionMatched : false
      };

      let searchTxt = scopeObj.view.tbxTransactionSearch.text;
      let filteredData = [];
      // searching in the contracts
      if(scopeObj.currViewContractsTab == 'Accounts'){
        filteredData = scopeObj.filterAccountsDataForSearch(searchTxt);
      }else if(scopeObj.currViewContractsTab== 'Features'){
        filteredData = scopeObj.filterFeaturesDataForSearch(searchTxt);
      }
      else{
        filteredData = scopeObj.filterLimitsDataForSearch(searchTxt);
      }
      scopeObj.createDynamicFlexForContract(filteredData , scopeObj.currViewContractsTab );
      
      // first searched element should be expanded
      if(scopeObj.searchResult.isAcctMatched || scopeObj.searchResult.isFeatureMatched || 
        scopeObj.searchResult.isLimitMatched || scopeObj.searchResult.isActionMatched ){
          let widgets = scopeObj.view.flxContractContainer.widgets();
          if(widgets.length > 0){
            widgets[0].flxArrow.onClick();
            if(scopeObj.searchResult.isActionMatched ){
              // expand the 1st row in segment

              let segData = widgets[0].segAccountFeatures.data;
              if (segData.length > 0 && segData[0][0] && segData[0][0].flxArrow) {
                segData[0][0].flxArrow.onClick();
              }  
            }
          }
      }  
      scopeObj.view.forceLayout();
    };
    
    this.view.flxGroupsBackground.onClick = function(){
       
      scopeObj.isSearchPerformedViewCont = true;      
      // reset the flags
      scopeObj.searchSignatoryResult ={
        isSignatoryGroupMatched : false
     };
      let searchTxt = scopeObj.view.tbxGroupsSearch.text;
      let filteredData = [];
      // searching in the contracts    
       filteredData = scopeObj.filterSignatoryDataForSearch(searchTxt);
      scopeObj.setSignatoryGroups(filteredData,true)      
      // first searched element should be expanded
      if(scopeObj.searchSignatoryResult.isSignatoryGroupMatched)
        {
          let widgets = scopeObj.view.flxContractGroupsContainer.widgets();
          if(widgets.length > 0)
          {
               widgets[0].flxArrow.onClick();
            if(scopeObj.searchSignatoryResult.isSignatoryGroupMatched ){
            // expand the 1st row in segment
                let segData = widgets[0].segAccountFeatures.data;
                   if (segData.length > 0 && segData[0][0] && segData[0][0].flxArrow) {
                          segData[0][0].flxArrow.onClick();
                  }  
               }
           }
       }  
      scopeObj.view.forceLayout();
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
      scopeObj.backToCompanyDetails(1);
      scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
	  scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      scopeObj.backToCompanyDetails(1);
    };
    this.view.flxCompanyContactHeader.onClick = function(){
      var check = scopeObj.view.flxCompanyContactDetails.isVisible;
     // if(scopeObj.action === scopeObj.actionConfig.create)
      //  scopeObj.view.textBoxOwnerDetailsEntry31.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.flxCompanyContactDetails.setVisibility(!check);
      scopeObj.view.lblArrowIcon.text= !check?"\ue915":"\ue922";
      scopeObj.view.lblArrowIcon.skin = "sknfontIconDescRightArrow14px";
      scopeObj.view.forceLayout();
    };
//     this.view.btnCompanyDetailEdit.onClick = function(){
//       scopeObj.action = scopeObj.actionConfig.edit;
//       scopeObj.view.typeHeadCity.tbxSearchKey.info = {"isValid":false,"data":""};
//       scopeObj.view.typeHeadCountry.tbxSearchKey.info = {"isValid":false,"data":""};
//       scopeObj.view.typeHeadState.tbxSearchKey.info = {"isValid":false,"data":""};
//       scopeObj.featureFilter();
//       scopeObj.getAddressSegmentData();
//       scopeObj.view.segEditSuspendedFeature.setData([]);
//       scopeObj.view.lblSelectionOptions.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
//       scopeObj.view.commonButtonsFeaturesTab.btnSave.text = kony.i18n.getLocalizedString("i18n.frmCompanies.UpdateCompany_UC");
//       scopeObj.view.commonButtonsLimitTab.btnSave.text = kony.i18n.getLocalizedString("i18n.frmCompanies.UpdateCompany_UC");
//       scopeObj.showEditCompany(scopeObj.completeCompanyDetails);
//       scopeObj.changeUIAccessBasedOnEditCreateCompanyFlow();
//     };

        this.view.btnCompanyDetailEdit.onClick = function(){

      var isFeaturesLoading = scopeObj.completeContractDetails.updateJobStatus ? scopeObj.completeContractDetails.updateJobStatus === "SID_JOB_PENDING" : false;
      if(!isFeaturesLoading){
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.navigateToContractCreateScreen({"action":"editContractClick",
                                                           "completeContractDetails": scopeObj.completeContractDetails,
                                                           "completeCompanyDetails": scopeObj.completeCompanyDetails});
        //var timeFunc = setTimeout(scopeObj.onEditContractClick,0);
      }else{
        //scopeObj.showFeaturesLoadingPopup();
        scopeObj.showFeaturesLoadingPopup(scopeObj.completeContractDetails.servicedefinitionName);
      }
      // scopeObj.getCountrySegmentData();
      scopeObj.view.forceLayout();
    };
   
    this.view.accountStatusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performAccountsStatusFilter();
    };
   
    this.view.lblDetailsMore.onHover = this.onHoverTaxIdMoreText;
    //this.view.flxSearchBusinessTypeFilter.onHover = this.onHoverSettings;
    this.view.flxAccountStatusFilter.onHover = this.onHoverSettings;
   //contract search
    this.view.contractCustomers.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.contractCustomers.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.contractCustomers.flxClearSearchImage.setVisibility(true);
        scopeObj.searchCustomersDropDownList("contractCustomers");
      }else{
        scopeObj.view.contractCustomers.flxClearSearchImage.setVisibility(false);
        scopeObj.setSerchContractCustomers(scopeObj.recentContractDetails.formattedCustomers)
        scopeObj.view.contractCustomers.flxSegmentList.setVisibility(true);
      } 
    };

    this.view.btnAddSignatoryGroup.onClick = function() {
      //scopeObj.showGroupAddUsersPopup();
      scopeObj.presenter.getNoGroupUsers(scopeObj.view.btnAddSignatoryUsers.info);
        };
    this.view.flxPopUpClose.onClick=function(){
      scopeObj.view.flxAddUsersPopup.setVisibility(false);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],1);
      scopeObj.view.tbxUsersSearchPopup.text="";
      scopeObj.view.flxClearUsersSearchPopup.setVisibility(false);
      scopeObj.view.flxCustFeaturesListContainer.setVisibility(true);
      scopeObj.view.flxAccFeaturesListContainer.setVisibility(false);
    };
     this.view.commonButtonsScreen1.btnCancel.onClick=function(){
       		scopeObj.view.flxAddUsersPopup.setVisibility(false);
    	};
    //signatorygrp
       this.view.flxEditOptionSignatory.hoverSkin="sknfbfcfc";
         this.view.flxDeleteOptionSignatory.hoverSkin="sknfbfcfc";

    this.view.flxOptionsSignatory.onClick = function() {
       scopeObj.view.flxSelectOptionsSignatory.setVisibility(true);
            };
    this.view.flxEditOptionSignatory.onClick=function(){
       scopeObj.editSignatoryClick(true,{"signatoryGroupId":scopeObj.view.flxEditOptionSignatory.info});
       };
    this.view.flxDeleteOptionSignatory.onClick=function(){
      scopeObj.deleteSignatoryClick(true);
    };    
    this.view.contractCustomers.flxClearSearchImage.onClick = function(){
      scopeObj.view.contractCustomers.tbxSearchBox.text="";
      scopeObj.setSerchContractCustomers(scopeObj.recentContractDetails.formattedCustomers)
      scopeObj.view.contractCustomers.flxClearSearchImage.setVisibility(false);
      scopeObj.view.contractCustomers.flxSegmentList.setVisibility(true);
    };   
       //searchExistingUserRelatedCustomer
    
    this.view.searchExistingUserRelatedCustomer.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchExistingUserRelatedCustomer.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.searchExistingUserRelatedCustomer.flxSearchCancel.setVisibility(true);
        scopeObj.searchExistingUserDropDownList();
      }else{
        scopeObj.view.searchExistingUserRelatedCustomer.flxSearchCancel.setVisibility(false);
        scopeObj.setSerchContractCustomers(scopeObj.recentContractDetails.formattedCustomers);
        if(scopeObj.view.flxNoResultsFoundExisting.isVisible)
        scopeObj.view.flxNoResultsFoundExisting.setVisibility(false);
        var seg;
        if(scopeObj.recentCustomerSearchTab === "Existing"){
          seg = scopeObj.view.segExistingUserListContainer;
        }else if(scopeObj.recentCustomerSearchTab === "other"){
          seg = scopeObj.view.segOtherRelatedCustList;
        }
        var segdata = [];
        for(var i=0;i<seg.info.records.length;i++){
          segdata.push(seg.info.records[i].orignalData)
        }
        scopeObj.setUserListData(segdata, seg);
      } 
    };
    this.view.searchExistingUserRelatedCustomer.flxSearchCancel.onClick = function(){
      scopeObj.view.searchExistingUserRelatedCustomer.tbxSearchBox.text="";
      if(scopeObj.view.flxNoResultsFoundExisting.isVisible)
      scopeObj.view.flxNoResultsFoundExisting.setVisibility(false);
      var seg;
      var seg;
        if(scopeObj.recentCustomerSearchTab === "Existing"){
          seg = scopeObj.view.segExistingUserListContainer;
        }else if(scopeObj.recentCustomerSearchTab === "other"){
          seg = scopeObj.view.segOtherRelatedCustList;
        }
        var segdata = [];
        for(var i=0;i<seg.info.records.length;i++){
          segdata.push(seg.info.records[i].orignalData)
        }
        scopeObj.setUserListData(segdata, seg);
      scopeObj.view.searchExistingUserRelatedCustomer.flxSearchCancel.setVisibility(false);
    };   
  
    this.view.contractDetailsPopup.flxBackOption.onClick = function(){
      scopeObj.view.flxCustomerSearchPopUp.setVisibility(true);
      scopeObj.view.flxContractDetailsPopup.setVisibility(false);
      scopeObj.view.forceLayout();
    };
  
    //signatory groups actions
    this.view.verticalTabs.btnOption1.onClick = function(){
      scopeObj.view.flxSelectedUsers.setVisibility(false);
      scopeObj.view.flxGroupDetails.setVisibility(true);
      scopeObj.toggleAddGroupVerticalTabs(scopeObj.view.verticalTabs.flxImgArrow1,scopeObj.view.verticalTabs.btnOption1);
      scopeObj.view.forceLayout();
    };
    this.view.verticalTabs.btnOption2.onClick = function(){
      if(scopeObj.isValidGroupName()){
        scopeObj.view.flxSelectedUsers.setVisibility(true);
        scopeObj.view.flxGroupDetails.setVisibility(false);
        scopeObj.toggleAddGroupVerticalTabs(scopeObj.view.verticalTabs.flxImgArrow2,scopeObj.view.verticalTabs.btnOption2);
        scopeObj.view.forceLayout();
      }
    };
    this.view.btnAddSignatoryUsers.onClick = function(){
      if(scopeObj.noGroupUsers.length>0)
      scopeObj.showGroupAddUsersPopup(scopeObj.noGroupUsers);
      else
      scopeObj.presenter.getNoGroupUsers(scopeObj.view.btnAddSignatoryUsers.info);
      //scopeObj.showGroupAddUsersPopup();
    };
    this.view.btnAddUsersHeader.onClick = function(){
        scopeObj.view.btnAddSignatoryUsers.onClick();
    };
    this.view.btnAddGroupCancel.onClick = function(){
      scopeObj.view.flxAddGroups.setVisibility(false);
      if(scopeObj.view.flxAddGroups.info.isView===false){
      scopeObj.view.flxCompanyDetails.setVisibility(true);
      scopeObj.view.breadcrumbs.btnPreviousPage.onClick();
      }else{
        scopeObj.presenter.getSignatoryGroupDetails({"signatoryGroupId":scopeObj.view.flxAddGroups.info.signGroupId},false);
      }
    };
    this.view.tbxGroupNameValue.onKeyUp = function(){
      
      if(scopeObj.view.tbxGroupNameValue.text.trim().length===0)
      {
        scopeObj.view.lblGroupNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblGroupNameCount.text=scopeObj.view.tbxGroupNameValue.text.trim().length+"/50";
        scopeObj.view.lblGroupNameCount.setVisibility(true);
      }
      if(scopeObj.view.flxNoGroupNameError.isVisible){
        scopeObj.view.flxNoGroupNameError.setVisibility(false);
        scopeObj.view.tbxGroupNameValue.skin="skntbxLato35475f14px";
      }
      scopeObj.view.forceLayout();
    };
    this.view.tbxGroupNameValue.onEndEditing = function(){
      scopeObj.view.lblGroupNameCount.setVisibility(false);
    };
    this.view.txtGroupDescription.onKeyUp = function(){
      if(scopeObj.view.txtGroupDescription.text.trim().length===0)
      {
        scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblGroupDescriptionCount.text=scopeObj.view.txtGroupDescription.text.trim().length+"/200";
        scopeObj.view.lblGroupDescriptionCount.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtGroupDescription.onEndEditing = function(){
      scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
    }
    this.view.btnAddGroupNext.onClick = function(){
      scopeObj.view.verticalTabs.btnOption2.onClick();
    };
    this.view.btnAddGroupSave.onClick = function(){
      if(scopeObj.isValidGroupName()){
        scopeObj.saveGroupChanges();
//         scopeObj.view.flxAddGroups.setVisibility(false);
//       scopeObj.view.flxCompanyDetails.setVisibility(true);
//         scopeObj.view.breadcrumbs.btnPreviousPage.onClick();
      }
    };
    this.view.btnCancel1.onClick = function(){
      scopeObj.view.flxAddGroups.setVisibility(false);
      if(scopeObj.view.flxAddGroups.info.isView===false){
      scopeObj.view.flxCompanyDetails.setVisibility(true);
      scopeObj.view.breadcrumbs.btnPreviousPage.onClick();
      }else{
        scopeObj.presenter.getSignatoryGroupDetails({"signatoryGroupId":scopeObj.view.flxAddGroups.info.signGroupId},false);
      }
    };
    this.view.btnAddGroupSave1.onClick = function(){
      //save addGroup Changes
      scopeObj.saveGroupChanges();
    };
    this.view.commonButtonsScreen1.btnCancel.onClick = function(){
      scopeObj.view.flxAddUsersPopup.setVisibility(false);
    };
    this.view.commonButtonsScreen1.btnSave.onClick = function(){
      scopeObj.addUserPopupSave();
      scopeObj.view.flxAddUsersPopup.setVisibility(false);
    };
    this.view.flxBackOption.onClick = function(){
      scopeObj.view.flxAddUserScreen.top="80px";
      scopeObj.view.tbxUsersSearchPopup.text="";
      scopeObj.view.tbxUsersSearchPopup.placeholder = "Search by First Name, Last Name, UserID";
      scopeObj.view.flxBackOption.setVisibility(false);
      scopeObj.view.toggleButtons.setVisibility(false);
      scopeObj.view.flxSegmentContainer.setVisibility(true);
      scopeObj.view.flxUsersFeaturesContainer.setVisibility(false);
      scopeObj.view.flxButtonsScreen1.setVisibility(true);
      scopeObj.view.flxHeaderLeftSection.setVisibility(true);
    };
    this.view.toggleButtons.btnToggleLeft.onClick = function(){
	  scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],1);
      scopeObj.view.tbxUsersSearchPopup.text="";
      scopeObj.view.flxClearUsersSearchPopup.setVisibility(false);
      scopeObj.view.flxCustFeaturesListContainer.setVisibility(true);
      scopeObj.view.flxAccFeaturesListContainer.setVisibility(false);
      scopeObj.setFeatureLevelPermissions(scopeObj.featureLevelPermissions);
    };
    this.view.toggleButtons.btnToggleRight.onClick = function(){
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],2);
      scopeObj.view.tbxUsersSearchPopup.text="";
      scopeObj.view.flxClearUsersSearchPopup.setVisibility(false);
      scopeObj.createAccountFeatureCards(scopeObj.accLvlPermissions);
    };
    this.view.filterMenu.segStatusFilterDropdown.onRowClick = function(){
      var data = scopeObj.filterBasedOnRole(scopeObj.view.filterMenu,scopeObj.view.segSelectionList);
      if(data[0][1].length>0){
        scopeObj.view.lblNoResultsScreen1.setVisibility(false);
      }else{
        scopeObj.view.lblNoResultsScreen1.text="No records found with given filters. Please try again.";
        scopeObj.view.lblNoResultsScreen1.setVisibility(true);
      }
      scopeObj.view.segSelectionList.rowTemplate="flxSegUserDetails";
      scopeObj.view.segSelectionList.setData(data);
      scopeObj.view.forceLayout();
    };
    this.view.roleFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var data = scopeObj.filterBasedOnRole(scopeObj.view.roleFilterMenu,scopeObj.view.segSearchedUserDetails);
      if(data[0][1].length>0){
        scopeObj.view.lblNoResultsScreenAdd.setVisibility(false);
      }else{
        scopeObj.view.lblNoResultsScreenAdd.text="No records found with given filters. Please try again.";
        scopeObj.view.lblNoResultsScreenAdd.setVisibility(true);
      }
      scopeObj.view.segSelectionList.rowTemplate="flxSegUserDetails";
      scopeObj.view.segSearchedUserDetails.setData(data);
      scopeObj.view.forceLayout();
    };
    this.view.roleFilterViewMenu.segStatusFilterDropdown.onRowClick = function(){
      var data = scopeObj.filterBasedOnRole(scopeObj.view.roleFilterViewMenu,scopeObj.view.segUserDetailsSegment);
      if(data[0][1].length>0){
        scopeObj.view.lblNoResultsScreenView.setVisibility(false);
      }else{
        scopeObj.view.lblNoResultsScreenView.text="No records found with given filters. Please try again.";
        scopeObj.view.lblNoResultsScreenView.setVisibility(true);
      }
      scopeObj.view.segUserDetailsSegment.setData(data);
      scopeObj.view.forceLayout();
    };
    this.view.accTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.filterAccountRowsInAddUser();
    };
    this.view.tbxUsersSearchPopup.onKeyUp =function(){
      if(scopeObj.view.tbxUsersSearchPopup.text.trim().length!==0)
        scopeObj.view.flxClearUsersSearchPopup.setVisibility(true);
      else
        scopeObj.view.flxClearUsersSearchPopup.setVisibility(false);
      if(scopeObj.view.flxSegmentContainer.isVisible)
      scopeObj.searchAddGroupUsers(scopeObj.view.tbxUsersSearchPopup.text.trim(),scopeObj.view.segSelectionList);
      else
        scopeObj.searchApprovalPermissions(scopeObj.view.tbxUsersSearchPopup.text.trim().toLowerCase());
    };
    this.view.flxClearUsersSearchPopup.onClick = function(){
      scopeObj.view.flxClearUsersSearchPopup.setVisibility(false);
      scopeObj.view.tbxUsersSearchPopup.text="";
      if(scopeObj.view.flxSegmentContainer.isVisible)
      scopeObj.searchAddGroupUsers("",scopeObj.view.segSelectionList);
      else
        scopeObj.searchApprovalPermissions("");
    };
    this.view.tbxUsersSearch.onKeyUp =function(){
      if(scopeObj.view.tbxUsersSearch.text.trim().length!==0)
        scopeObj.view.flxClearUsersSearch.setVisibility(true);
      else
        scopeObj.view.flxClearUsersSearch.setVisibility(false);
      scopeObj.searchAddGroupUsers(scopeObj.view.tbxUsersSearch.text.trim(),scopeObj.view.segSearchedUserDetails);
    };
    this.view.flxClearUsersSearch.onClick = function(){
      scopeObj.view.tbxUsersSearch.text="";
      scopeObj.searchAddGroupUsers("",scopeObj.view.segSearchedUserDetails);
    };
    /**signatory Group actions end**/
    
    /**Approval matrix actions - start **/
    this.view.lblCardNameAM.onTouchStart = function(){
      if(scopeObj.view.lblCardNameAM.skin ==="sknLbl117EB0LatoReg14px")
        scopeObj.onClickCustNameAM();
    };
    this.view.btnViewAccountsAM.onClick = function(){
      scopeObj.view.flxLoading.setVisibility(true);
      var selectedCustId = scopeObj.view.customerDropdownAM.lblSelectedValue.info.selectedId;
      var allCustAccApprovals = scopeObj.view.accountsDropdownAM.info.acccountLevelInfo;
      var selectedCustAccApprovals = allCustAccApprovals[selectedCustId];
      scopeObj.showApprovalMatrixAccountLevel(true,selectedCustAccApprovals); 
    };
    this.view.flxViewApproverPopupClose.onClick = function(){
      scopeObj.view.flxViewApproverListPopup.setVisibility(false);
    };
    this.view.flxBackBtnAM.onClick = function(){
      scopeObj.showApprovalMatrixCustomerLevel(false);
      scopeObj.setCustomerDetailsForApprovalCard();
      scopeObj.view.searchBoxAM.flxClearSearch.onClick();  
    };
    this.view.searchBoxAM.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchBoxAM.tbxSearchBox.text){
        scopeObj.view.searchBoxAM.flxClearSearch.setVisibility(true);
      } else{
        scopeObj.view.searchBoxAM.flxClearSearch.setVisibility(false);
      }
      searchFeaturesAM();
    };
    this.view.searchBoxAM.flxClearSearch.onClick = function(){
      
      scopeObj.view.searchBoxAM.flxClearSearch.setVisibility(false);
      scopeObj.view.searchBoxAM.tbxSearchBox.text = "";
      scopeObj.searchFeatureActionApprovals();
    };
    const searchFeaturesAM = debounce(scopeObj.searchFeatureActionApprovals.bind(scopeObj), 300);
    this.view.customerDropdownAM.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.customerDropdownAM.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.customerDropdownAM.flxClearSearchImage.setVisibility(true);
        scopeObj.searchCustomersDropDownList("customerDropdownAM");
      }else{
        scopeObj.view.customerDropdownAM.flxClearSearchImage.setVisibility(false);
        var selectedCust = scopeObj.view.customerDropdownAM.lblSelectedValue.info;
        scopeObj.setDropdownLabelTextAM(scopeObj.view.customerDropdownAM,selectedCust.selectedName,selectedCust.selectedId,selectedCust.isPrimary );
        scopeObj.searchCustomersDropDownList("customerDropdownAM");
        scopeObj.view.customerDropdownAM.flxSegmentList.setVisibility(true);
      }  

    };
    this.view.customerDropdownAM.flxClearSearchImage.onClick = function(){
      scopeObj.view.customerDropdownAM.tbxSearchBox.text="";
      scopeObj.searchCustomersDropDownList("customerDropdownAM");
      var selectedCust = scopeObj.view.customerDropdownAM.lblSelectedValue.info;
      scopeObj.setDropdownLabelTextAM(scopeObj.view.customerDropdownAM,selectedCust.selectedName,selectedCust.selectedId,selectedCust.isPrimary );
      scopeObj.view.customerDropdownAM.flxClearSearchImage.setVisibility(false);
      scopeObj.view.customerDropdownAM.flxSegmentList.setVisibility(true);
      scopeObj.view.customerDropdownAM.flxNoResult.setVisibility(false);
    };
    this.view.customerDropdownAM.segList.onRowClick = function(){
       var selRowInd =  scopeObj.view.customerDropdownAM.segList.selectedRowIndex || [0,0];
      var selRowData = selRowInd ? scopeObj.view.customerDropdownAM.segList.data[selRowInd[1]] :"";
      var currSelectedcust = scopeObj.view.customerDropdownAM.lblSelectedValue.info.selectedId;
      if(currSelectedcust === selRowData.id){}// if same cust is selected do nothing
      else if(currSelectedcust !== selRowData.id && scopeObj.view.customerDropdownAM.info.customerLevelInfo[selRowData.id]){
        scopeObj.dropdownListSelection(1);
      } else{ //if cust data not available call service
        var reqParam1 = {"contractId": scopeObj.completeContractDetails.id, "cif": selRowData.id};
        scopeObj.presenter.getApprovalMatrixByCif(reqParam1,false, null);
      }
      scopeObj.view.customerDropdownAM.showHideCustomersDropdown();
    };
    this.view.accountsDropdownAM.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.accountsDropdownAM.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.accountsDropdownAM.flxClearSearchImage.setVisibility(true);
        scopeObj.searchCustomersDropDownList("accountsDropdownAM");
      }else{
        scopeObj.view.accountsDropdownAM.flxClearSearchImage.setVisibility(false);        var selectedCust = scopeObj.view.accountsDropdownAM.lblSelectedValue.info;
        scopeObj.setDropdownLabelTextAM(scopeObj.view.accountsDropdownAM,selectedCust.selectedName,selectedCust.selectedId,selectedCust.isPrimary );
        scopeObj.searchCustomersDropDownList("accountsDropdownAM");
        scopeObj.view.accountsDropdownAM.flxSegmentList.setVisibility(true);
      }  

    };
    this.view.accountsDropdownAM.flxClearSearchImage.onClick = function(){
      scopeObj.view.accountsDropdownAM.tbxSearchBox.text="";
      scopeObj.searchCustomersDropDownList("accountsDropdownAM");
      var selectedCust = scopeObj.view.accountsDropdownAM.lblSelectedValue.info;
      scopeObj.setDropdownLabelTextAM(scopeObj.view.accountsDropdownAM,selectedCust.selectedName,selectedCust.selectedId,selectedCust.isPrimary );
      scopeObj.view.accountsDropdownAM.flxClearSearchImage.setVisibility(false);
      scopeObj.view.accountsDropdownAM.flxSegmentList.setVisibility(true);
      scopeObj.view.accountsDropdownAM.flxNoResult.setVisibility(false);
    };
    this.view.accountsDropdownAM.segList.onRowClick = function(){
      scopeObj.dropdownListSelection(2);
      scopeObj.view.accountsDropdownAM.showHideCustomersDropdown();
    };
    this.view.commonButtonsAAR.btnCancel.onClick = function(){
      scopeObj.hideAddApprovalRuleScreen();
    };
    this.view.commonButtonsAAR.btnSave.onClick = function(){
      var actionType = scopeObj.view.lblCustomerNameAAR.info.actionType;
      var isAccLevel = scopeObj.view.lblCustomerNameAAR.info.isAccountLevel;
      var isValid = actionType === scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY ?
          scopeObj.validateApprovalRulesMonAAR(2) : scopeObj.validateApprovalRulesNonMonAAR();
      if(isValid && isAccLevel === false){ //show confirm popup for cust level
        scopeObj.showAddApprovalRuleConfirmPopup();
      } else if(isValid && isAccLevel === true){ //account level
        scopeObj.onClickSaveApprovalRules();
      }
    };
    this.view.btnDeleteAAR.onClick = function(){
      scopeObj.showDeleteARConfirmPopup();
    };
    this.view.flxBackOptionACP.onClick = function(){
      scopeObj.view.flxAddApprovalConditionsPopup.setVisibility(false);
    };
    this.view.commonButtonsACP.btnCancel.onClick = function(){
      scopeObj.view.flxAddApprovalConditionsPopup.setVisibility(false);
    };
    this.view.commonButtonsACP.btnSave.onClick = function(){
      var actionType = scopeObj.view.commonButtonsACP.btnSave.info.actionType;
      var configType = scopeObj.getSelectedApprovalConfigValue().id;
      var isValid = scopeObj.validateApprovalCondACP(configType);
      if(isValid && configType === scopeObj.approvalConfigType.USER){
        scopeObj.saveApprovalConditionsUserACP(actionType);
      } else if(isValid && configType === scopeObj.approvalConfigType.SIGNATORY_GROUP){
        scopeObj.saveApprovalConditionsSGACP(actionType);
      } 
    };
    this.view.flxPopupCloseACP.onClick = function(){
       scopeObj.view.flxAddApprovalConditionsPopup.setVisibility(false);
    };
    this.view.flxSelectedApproversACP.onClick = function(){
      scopeObj.view.filterMenuApproversACP.setVisibility(!scopeObj.view.filterMenuApproversACP.isVisible);
    };
    this.view.flxConfigAM.onClick = function(){
      var flxTop =  scopeObj.view.flxCardBottomContainerAM.frame.y -5;
      scopeObj.view.flxApprovalMatrixConfigDropdown.top = flxTop +"dp";
      scopeObj.view.flxApprovalMatrixConfigDropdown.setVisibility(!scopeObj.view.flxApprovalMatrixConfigDropdown.isVisible);
    };
    this.view.flxRuleCheckboxAAR.onClick = function(){
      scopeObj.onApprovalReqCheckboxClick();
    };
    this.view.flxRadioButtonAM1.onClick = function(){
      var configType = scopeObj.getSelectedApprovalConfigValue().id;
      if(configType !== scopeObj.approvalConfigType.USER){
        scopeObj.changeConfigConfirmPopup(scopeObj.approvalConfigType.USER);
      }
    };
    this.view.flxRadioButtonAM2.onClick = function(){
      var configType = scopeObj.getSelectedApprovalConfigValue().id;
      if(configType !== scopeObj.approvalConfigType.SIGNATORY_GROUP){
        scopeObj.changeConfigConfirmPopup(scopeObj.approvalConfigType.SIGNATORY_GROUP);
      }
    };
    this.view.flxSelectedApproversACP.onClick = function(){
      scopeObj.showHideUsersDropdownACP();
    };
    this.view.filterMenuApproversACP.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.filterMenuApproversACP.tbxSearchBox.text){
        scopeObj.view.filterMenuApproversACP.flxClearSearchImage.setVisibility(true);
      } else{
        scopeObj.view.filterMenuApproversACP.flxClearSearchImage.setVisibility(false);
      }
      scopeObj.searchApproverUsers();
      scopeObj.view.forceLayout();
    };
    this.view.filterMenuApproversACP.flxClearSearchImage.onClick = function(){
      scopeObj.view.filterMenuApproversACP.tbxSearchBox.text = "";
      scopeObj.view.filterMenuApproversACP.flxClearSearchImage.setVisibility(false);
      scopeObj.searchApproverUsers();
    };
    this.view.flxRuleCheckboxAAR.onClick = function(){
      scopeObj.onApprovalRequiredNonMonClick();
    };
    this.view.lblAddApprovalCondition.onTouchStart = function(){
      var configType = scopeObj.getSelectedApprovalConfigValue().id;
      if(configType === scopeObj.approvalConfigType.SIGNATORY_GROUP){
        scopeObj.showAddApprovalCondSGPopup();
      } else if(configType === scopeObj.approvalConfigType.USER){
        scopeObj.showAddApprovalCondUserPopup();
      }
    };
    this.view.flxRangeIconACP.onHover = function(widget,context){
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.view.flxRuleRangeTooltipACP.setVisibility(true);
        scopeObj.view.forceLayout();
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.flxRuleRangeTooltipACP.setVisibility(false);
      }
    };
    this.view.switchToggleAM.onSlide = function(){
      scopeObj.showEnableApprovalConfirmPopup();
    };
    this.view.filterMenuApproversACP.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.selectApproversACP();
    };
    this.view.lstboxApprovalsACP.onSelection = function(){
      scopeObj.view.lstboxApprovalsACP.skin = "sknLbxborderd7d9e03pxradius";
      scopeObj.view.flxApprovalsSelErrorACP.setVisibility(false);
    };
    //Pagination related ACtion in add user flow
    this.view.cardPaginationFeatures.flxPrevious.onClick = function(){
      var currentValue = scopeObj.view.cardPaginationFeatures.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationChangeAddUser(prevVal,1);
      }
    };
    this.view.cardPaginationFeatures.flxnext.onClick = function(){
      var currentValue = parseInt(scopeObj.view.cardPaginationFeatures.lblNumber.text)+1;
      if(currentValue <= scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChangeAddUser(currentValue,1);
      }
    };    
    this.view.cardPaginationFeatures.flxGo.onClick = function(){
      var currentValue= scopeObj.view.cardPaginationFeatures.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChangeAddUser(currentValue,1);
      }
    };
	
    this.view.cardPaginationLimits.flxPrevious.onClick = function(){
      var currentValue = scopeObj.view.cardPaginationLimits.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationChangeAddUser(prevVal,2);
      }      
    };
    this.view.cardPaginationLimits.flxnext.onClick = function(){
      var currentValue = parseInt(scopeObj.view.cardPaginationLimits.lblNumber.text)+1;
      if(currentValue <= scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChangeAddUser(currentValue,2);
      }
    };
    this.view.cardPaginationLimits.flxGo.onClick = function(){
      var currentValue= scopeObj.view.cardPaginationLimits.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){
       scopeObj.onSegmentPaginationChangeAddUser(currentValue,2);
      }
	  };
    this.view.flxIconRangeInfoAAR.onHover = this.onHoverRangeInfoAAR;
    this.view.flxApprovalMatrixConfigDropdown.onHover = this.onHoverSettings;
    this.view.filterMenuApproversACP.onHover = this.onHoverSettings;
    /**Approval matrix actions - end **/

    this.view.popupError.flxPopUpClose.onClick = function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    //viewFeature tab actions
    this.view.flxBackArrowClick.onClick = function () {
      scopeObj.view.flxViewFeatureContainer.setVisibility(false);
      scopeObj.view.flxCompanyDetailAccountsContainer.setVisibility(true);
      scopeObj.view.flxFeatureDetailsFilter.setVisibility(false);
      scopeObj.view.flxAccountTypeDetailsFilter.setVisibility(false);
    };
    this.view.flxViewFeaturePopupClose.onClick = function () {
      scopeObj.view.flxViewFeaturePopup.setVisibility(false);
    };
    this.view.OwnershipStatusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      var data = scopeObj.filterBasedOnOwnership();
      if (data[1].length > 0) {
        scopeObj.view.lblNoFeatureFound.setVisibility(false);
        data[0].lblCountActions.text = data[1].length;
        scopeObj.view.segViewFeatureHeader.setSectionAt(data, scopeObj.selectedSectionIndexFilter);
      } else {
        var dataOne = {};
        dataOne = scopeObj.setSegmentForNoResult(data)
        data[1].push(dataOne);
        scopeObj.view.flxFeatureDetailsFilter.setVisibility(false);
        data[0].lblCountActions.text = data[1].length - 1;
        scopeObj.view.segViewFeatureHeader.setSectionAt(scopeObj.setWidgetDataNoResult[0], scopeObj.selectedSectionIndexFilter);
      }
      scopeObj.view.forceLayout();
    };
    this.view.tbxSearchFeature.onKeyUp = function () {
      if (scopeObj.view.tbxSearchFeature.text === "") {
        scopeObj.view.flxClearFeatureSearch.onClick();
      } else {
        scopeObj.view.flxClearFeatureSearch.setVisibility(true);
      }
      searchInternalUsersCall();
      scopeObj.view.forceLayout();

    };

    this.view.flxClearFeatureSearch.onClick = function () {
      scopeObj.view.tbxSearchFeature.text = "";
      scopeObj.view.flxClearFeatureSearch.setVisibility(false);
      scopeObj.setDataToViewFeat();
    };
    this.view.tbxFeatureSearchPopup.onKeyUp = function () {
      if (scopeObj.view.tbxFeatureSearchPopup.text === "") {
        scopeObj.view.flxClearFeatureSearchPopup.onClick();
      } else {
        scopeObj.view.flxClearFeatureSearchPopup.setVisibility(true);
      }
      searchInternalUsersCall();
      scopeObj.view.forceLayout();

    };
    this.view.flxClearFeatureSearchPopup.onClick = function () {
      scopeObj.view.tbxFeatureSearchPopup.text = "";
      scopeObj.view.flxClearFeatureSearchPopup.setVisibility(false);
      var segData;
      segData = scopeObj.setViewFeaturePopupSegData;
      if (segData.isPortfolio === false) {//undefined || segData.portfolioId === {}) {
        scopeObj.view.lblAccountDetails.text = segData.lblAccountName.text + " (" + segData.lblAccountNumber.text + ")";
        scopeObj.viewAccountLvlFeatures(scopeObj.contextViewAllFeaturePopup, segData.feature);
      } else {
        scopeObj.view.lblAccountDetails.text = segData.portfolioName + " (" + segData.portfolioId + ")";
        scopeObj.viewPortfolioFeatures(scopeObj.contextViewPortfolioFeaturePopup, segData.features);
      }
      scopeObj.view.lblAccountDetails.top = "-1";
      scopeObj.view.lblSelectedAccounts.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + " : ";
      //  scopeObj.addActiveFeatures(segData.features);
    };
    this.view.flxSearchBackground.onClick = function () {
      // if text is empty we won't perform the search
      if (scopeObj.view.tbxSearchFeature.text === "") {
        return;
      }
      scopeObj.isSearchPerformedViewCont = true;
      // reset the flags
      scopeObj.searchFeatureResult = {
        isFeatureMatched: false
      };
      let searchTxt = scopeObj.view.tbxSearchFeature.text;
      let filteredData = [];
      // searching in the contracts    
      filteredData = scopeObj.filterFeatureContainerDataForSearch(searchTxt);
      //portfoilio to be added later
      var portfolio = [];
      scopeObj.setDataToViewFeature(filteredData, true);
      // scopeObj.setDataToViewFeature(filteredData,portfolio, true);
      // first searched element should be expanded
      scopeObj.view.forceLayout();
    };
    this.view.AccountTypeStatusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      var data = scopeObj.filterBasedOnOwnership();
      if (data[1].length > 0) {
        scopeObj.view.lblNoFeatureFound.setVisibility(false);
        data[0].lblCountActions.text = data[1].length;
        scopeObj.view.segViewFeatureHeader.setSectionAt(data, scopeObj.selectedSectionIndexFilter);
      } else {
        var dataOne = {};
        // dataOne = scopeObj.filterOnNoResult(data);
        dataOne = scopeObj.setSegmentForNoResult(data)
        data[1].push(dataOne);
        scopeObj.view.flxAccountTypeDetailsFilter.setVisibility(false);
        data[0].lblCountActions.text = data[1].length - 1;
        scopeObj.view.segViewFeatureHeader.setSectionAt(scopeObj.setWidgetDataNoResult[0], scopeObj.selectedSectionIndexFilter);
      }
      scopeObj.view.forceLayout();
    };
    this.view.flxFeatureSearchBox.onClick = function () {
      // if text is empty we won't perform the search
      if (scopeObj.view.tbxFeatureSearchPopup.text === "") {
        return;
      }
      scopeObj.isSearchPerformedViewCont = true;
      // reset the flags
      scopeObj.searchFeaturePopupResult = {
        isSearchedMatched: false
      };
      let searchTxt = scopeObj.view.tbxFeatureSearchPopup.text;
      let filteredData = [];
      // searching in the contracts    
      filteredData = scopeObj.filterPopupDataForSearch(searchTxt);
      scopeObj.setDataToViewFeaturePopup(filteredData, true)
      // first searched element should be expanded  
      /* if (scopeObj.searchFeaturePopupResult.isSearchedMatched) {
          let widgets = scopeObj.view.flxViewFeaturePopupHeaderSegment.widgets();
           if (widgets.length > 0) {
               widgets[0].flxArrow.onClick();
               if (scopeObj.searchFeaturePopupResult.isSearchedMatched) {
                   // expand the 1st row in segment
                   let segData = widgets[0].segViewFeaturePopupHeaderSegment.data;
                   if (segData.length > 0 && segData[0][0] && segData[0][0].flxArrow) {
                       segData[0][0].flxArrow.onClick();
                   }
               }
           }
       } */
      scopeObj.view.forceLayout();
    };
    
    this.view.flxRadio1.onClick = function() {
      if (scopeObj.view.imgRadio1.src === "radio_notselected.png") {
        scopeObj.view.flxOtherCustomerSearchResultsByUserId.setVisibility(false);
        scopeObj.view.flxOtherCustomerSearchDetailsContainer.setVisibility(true);
        scopeObj.view.flxNoResultsFoundExistingCustByUserID.setVisibility(false);
        scopeObj.view.flxOtherCustomerButtons.setVisibility(true);
        scopeObj.view.btnSearchOtherCustomer.setVisibility(true);
        scopeObj.view.btnClearOtherCustomer.setVisibility(true);
        scopeObj.view.imgRadio1.src = "radio_selected.png";
        scopeObj.view.imgRadio2.src = "radio_notselected.png";
	    scopeObj.view.flxOtherCusotmerListContainerUserId.setVisibility(false);
		scopeObj.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text="";
        scopeObj.view.flxOtherCustomerSearchDetailsByUserIdContainer.setVisibility(false);
        //scopeObj.view.addExistingcommonButtons.btnSave.setVisibility(true);
        scopeObj.view.addExistingcommonButtons.btnSave.skin = "sknBtn7B7B7BRad20px";
        scopeObj.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn7B7B7BRad20px";
        scopeObj.view.addExistingcommonButtons.btnSave.text = "ADD";
        scopeObj.view.errorFlagMessage.setVisibility(false);
	    }
    };
    this.view.errorFlagMessage.imgCross.onClick = function(){
      scopeObj.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text="";
      scopeObj.view.flxOtherUserInlineErrorContainer.setVisibility(false);
    }
    this.view.flxRadio2.onClick = function() {
            if (scopeObj.view.imgRadio2.src === "radio_notselected.png") {
                scopeObj.view.flxOtherCustomerSearchDetailsByUserIdContainer.setVisibility(true);
                scopeObj.view.flxOtherCustomerSearchDetailsContainer.setVisibility(false);
                scopeObj.view.flxOtherCustomerSearchResults.setVisibility(false);
                scopeObj.view.btnSearchOtherCustomer.setVisibility(false);
                scopeObj.view.btnClearOtherCustomer.setVisibility(false);
                scopeObj.view.imgRadio2.src = "radio_selected.png";
                scopeObj.view.imgRadio1.src = "radio_notselected.png";
                scopeObj.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.text="";
                scopeObj.view.flxOtherCustomerButtons.setVisibility(false);
                scopeObj.view.errorFlagMessage.setVisibility(false);
            }
        };
    this.view.textBoxAddOtherUserContactEntry2.txtISDCode.onKeyUp = function () {
      scopeObj.view.textBoxAddOtherUserContactEntry2.hideErrorMsg(1);
    };
   this.view.textBoxAddOtherUserContactEntry2.txtISDCode.onTouchStart = function () {
     scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmCompanies_textBoxAddOtherUserContactEntry2_txtISDCode');
   };
   this.view.textBoxAddOtherUserContactEntry2.txtISDCode.onEndEditing = function () {
    scopeObj.view.textBoxAddOtherUserContactEntry2.txtISDCode.text = scopeObj.view.textBoxAddOtherUserContactEntry2.addingPlus(scopeObj.view.textBoxAddOtherUserContactEntry2.txtISDCode.text);
   };
   this.view.flxContactInfoBackOption.onClick = function (){
     scopeObj.view.addExistingcommonButtons.btnSave.text = "NEXT"
     var segmentPath = scopeObj.view.segOtherRelatedCustListByUserId;
	 scopeObj.onClickByUserID(scopeObj.view.segOtherRelatedCustListByUserId,false);
     scopeObj.view.flxAddExistingUserOtherCustomer.setVisibility(true);
     scopeObj.view.flxAddOtherUserContactInfo.setVisibility(false);
     scopeObj.view.flxAddExistingUserPopupHeader.setVisibility(true);
     scopeObj.view.addExistingcommonButtons.btnSave.skin = "sknBtn7B7B7BRad20px";
     scopeObj.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn7B7B7BRad20px";
     scopeObj.view.addExistingcommonButtons.btnSave.setEnabled(false);
     scopeObj.view.flxAddExistingUserRelatatedCustomer.setVisibility(false);
   };
	this.view.flxAccountsFilterAddUser.onHover = this.onHoverSettings;
    this.view.flxViewContractFilter.onHover = this.onHoverSettings;
    //this.view.flxOwnershipFilter.onHover = this.onHoverSettings;
	this.view.flxOwnershipFilterAddUser.onHover = this.onHoverSettings;
    this.view.accTypeFilterMenu.onHover = this.onHoverSettings;
    //this.view.flxRangeTooltip.onHover = this.onHoverSettings;
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
  getAllFeatures : function(res){
      this.allFeatures = res;
      this.featureFilter();
  },
  featureFilter : function(){
    var companyType = this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE;
    var i;
    var temp_features=[];
    this.requiredFeatures.additional = [];
    this.requiredFeatures.mandatory = [];
    for(i=0;i<this.allFeatures.groups.length;i++){
    	if(this.allFeatures.groups[i].groupid === companyType){
          temp_features = this.allFeatures.groups[i].features;
        }
    }
    for(var j=0;j<temp_features.length;j++){
      if(temp_features[j].isPrimary === "false"){
        this.requiredFeatures.additional.push(temp_features[j]);
      }
      else if(temp_features[j].isPrimary === "true"){
        this.requiredFeatures.mandatory.push(temp_features[j]);
      }
    }
    if(this.action === this.actionConfig.create){
      if(!this.visitedFeatureOnceWhileCreate){
        this.setFeaturesData(this.requiredFeatures);
        this.visitedFeatureOnceWhileCreate = true;
      }
    }else if(this.action === this.actionConfig.edit){
      this.setFeaturesData(this.requiredFeatures);
    }
  },
  selectUnselectAllFeatures : function(){
    if(this.view.lblSelectionOptions.text === kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All")){
      this.selectionImageChange("add");
      this.view.lblSelectionOptions.text = kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
    }else if (this.view.lblSelectionOptions.text === kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll")){
      this.selectionImageChange("remove");
	  this.view.lblSelectionOptions.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
    }
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
  /*
   * Created By :Kaushik Mesala
   * function to set service data for viewing contract accounts
   * @param: component 
   * @param: result of service call to be mapped
   */
  setDataToContractAccts : function(accountsFeaturesCard , accounts , component_id){
    var self = this;
    accountsFeaturesCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Accounts");
    accountsFeaturesCard.flxCheckboxOptions.setVisibility(false);
    // There will be atlest 1 account in valid scenario. The below condition to handle the scenario if there is 0 accounts 
    var data=[];
    if(accounts && accounts.length > 0){
      data = accounts.map(this.mappingContractAccountsData);  
    }    
    
    // for(let a_x = 0 ;a_x <12;a_x++){
    //   data.push(data[0]);
    // }
    let datLen = data.length ;
    accountsFeaturesCard.lblCount.text = datLen<10? "(0"+datLen+")" : "("+datLen+")";
    
    let headerData = this.getHeaderDataForContractAccts(accountsFeaturesCard , accountsFeaturesCard.segAccountFeatures );
    
    // removing the last stroke at the bottom of the box
    if(datLen > 0 && data[datLen -1].lblSeperator){
      data[datLen -1].lblSeperator = '';
    }
    if(datLen > 10 ){
      this.paginationActionsForAcct(accountsFeaturesCard , accountsFeaturesCard.segAccountFeatures , datLen);
    }
    var sectionData = datLen > 0 ? [ headerData , data.slice(0,10)] :headerData;

    accountsFeaturesCard.segAccountFeatures.setData([sectionData]);
    
    // we do the pagination and sorting logic when the segment is on
    accountsFeaturesCard.flxArrow.onClick = function() {
      var visibility = accountsFeaturesCard.flxCardBottomContainer.isVisible ? false : true;
      if (visibility) {
          self.paginationDetails.currSegContractData = [headerData, data];
      }
      accountsFeaturesCard.toggleCollapseArrow(visibility);
      // reset previos selected component and segment
      let prevInd = this.prevContractSelected.contractNo;
      if (prevInd != -1) {
          let components = this.view.flxContractContainer.widgets();
          components[prevInd].toggleCollapseArrow(false);
      }
      this.setDataToContractAccountsFilter(this.view.statusTypeFilterMenu ,headerData, data , 'lblStatus'  , accountsFeaturesCard);
      this.setDataToContractAccountsFilter(this.view.acctTypeFilterMenu ,headerData, data , 'lblAccountType' , accountsFeaturesCard );
      this.setDataToContractAccountsFilter(this.view.ownerShipTypeFilterMenu ,headerData, data , 'lblAccountHolderName' , accountsFeaturesCard );
      
      if(!visibility){
        this.prevContractSelected.contractNo = -1;
      }else{
        this.prevContractSelected.contractNo = component_id;
      }      
    }.bind(this);
  },

  /*
   * Created By :Kaushik Mesala
   * function to map the contract accounts 
   * @param:  contract accounts result which will be mapped
   */
  mappingContractAccountsData : function(account){
    return {
        'fontIconStatus': {
          "text":"",
          'isVisible':true,
          "skin": account['statusDesc'].toLowerCase() === "active" ? "sknFontIconActivate" : "sknfontIconInactive"
        },
        'template' : 'flxContractsAccountView',
        'lbAccountName': account['accountName'],
        'lblAccountHolderName': account["ownerType"] ? account["ownerType"] :"N/A",
        'lblAccountNumber': account["accountId"],
        'lblAccountType': account["accountType"],
        'lblSeperator': '.',
        'lblStatus': account['statusDesc'] && account['statusDesc'].trim().length !==0 ?account['statusDesc'] : kony.i18n.getLocalizedString("i18n.common.Unavailable")
    };
  },
    mappingMonetaryActionsData : function(data){
      var statusInfo = {};
      var featureStatus = data.status;
      statusInfo = this.getFeatureStatusAndSkin(featureStatus);
      var flag;
      var daily, per, weekly,min;
      var maxTansactionLimit, maxWeeklyLimit, maxDailyLimit;
      var currencySymbol = this.currencyValue;
    if(data.actions[0]){
      weekly = data.actions[0].limits[0].value;
      per = data.actions[0].limits[1].value;
      daily = data.actions[0].limits[2].value;
      min = data.actions[0].limits[3].value;
      flag = true;
    }else if(data.actions.limits){
      weekly = data.actions.limits[0].value;
      per = data.actions.limits[1].value;
      daily = data.actions.limits[2].value;
      min = data.actions.limits[3].value;
      flag = false;
    }
    maxTansactionLimit = data.actions.MaxTransactionLimit ? data.actions.MaxTransactionLimit : per;
    maxWeeklyLimit =  data.actions.MaxWeeklyLimit ? data.actions.MaxWeeklyLimit : weekly;
    maxDailyLimit = data.actions.MaxDailyLimit ? data.actions.MaxDailyLimit : daily;
    return{
      "flLimitsCompanies" : "flLimitsCompanies",
      "flxLimitHeader" : "flxLimitHeader",
      "flxStatus":"flxStatus",
      "flxLimitLower":"flxLimitLower",
      "flxPerTransactionLimit":"flxPerTransactionLimit",
      "flxPerTransactionLimitError":{
        "isVisible" : false
      },
      "lblPerTransactionLimitErronIcon":"",
      "lblPerTransactionLimitError":{
        "text" : ""},
      "flxDailyTransactionLimit":"flxDailyTransactionLimit",
      "flxDailyTransactionLimitError":{
        "isVisible" : false
      },
      "lblDailyTransactionLimitErrorIcon":"",
      "lblDailyTransactionLimitError":{
        "text" : ""},
      "flxWeeklyTransactionLimit":"flxWeeklyTransactionLimit",
      "flxWeeklyTransactionLimitError":{
        "isVisible" : false
      },
      "lblWeeklyTransactionLimitErrorIcon":"",
      "lblWeeklyTransactionLimitError":{
        "text" : ""},
      
      "lblPerTransactionLimit":"Per Transactions Limit",
      "lblDailyTransactionLimit":"Daily Transaction Limit",
	  "lblWeeklyTransactionLimit":"Weekly Transaction Limit",
      "lblFeature":flag ? data.name : data.actions.actionName,
      "lblUsersStatus":{
        "text": statusInfo.status,
        "skin": "sknlblLato5bc06cBold14px"
      },
	  "fontIconStatusImg":{
        "skin": statusInfo.statusIconSkin
      },
      "tbxPerTransactionLimitValue":{"text" : per},
      "tbxDailyTransactionLimitValue":{"text" : daily},
      "tbxWeeklyTransactionLimitValue":{"text" : weekly},
      "minLimit": min,
      "maxLimit": maxTansactionLimit,
      "maxDailyLimit" : maxDailyLimit,
      "maxWeeklyLimit" : maxWeeklyLimit,
      "lblPerCurrency":currencySymbol,
      "lblDailyCurrency":currencySymbol,
      "lblWeeklyCurrency":currencySymbol,
      "lblPerMaxIcon":{
        "toolTip":"Maximum Limit: " + currencySymbol + maxTansactionLimit + "\n"+
					"Minimum Limit: " + currencySymbol + min,
        "text" : ""
      },
      "lblDailyMaxIcon":{
        "toolTip":"Maximum Limit: " + currencySymbol + maxDailyLimit + "\n"+
					"Minimum Limit: " + currencySymbol + min,
        "text" : ""
      },
      "lblWeeklyMaxIcon":{
        "toolTip":"Maximum Limit: " + currencySymbol + maxWeeklyLimit + "\n"+
					"Minimum Limit: " + currencySymbol + min,
        "text" : ""
      },
      "actionId" : flag ? data.actions[0].id : data.actions.actionId,
      "featureId" : data.id
    };
  },
  assignLimitValidations : function(){
    var perTransaction = false, dailyTransaction = false, weeklyTransaction = false;
    var data = this.view.segAssignLimits.data;
    var decimalsOnly = /^([0-9]*[.])?[0-9]+$/;
    if(data.length>0){
      for(var i=0;i<data.length;i++){

        // for per transaction
        if(decimalsOnly.test(data[i].tbxPerTransactionLimitValue.text) === false){
          data[i].flxPerTransactionLimitError.isVisible = true;
          data[i].lblPerTransactionLimitError.text = "Enter valid Limit";
          perTransaction = false;
          break;
        }else{
          data[i].lblPerTransactionLimitError.text = "";
          data[i].flxPerTransactionLimitError.isVisible = false;
          perTransaction = true;
        }
        if(parseFloat(data[i].tbxPerTransactionLimitValue.text) > parseFloat(data[i].maxLimit)){
          data[i].flxPerTransactionLimitError.isVisible = true;
          data[i].lblPerTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than") + " $" + data[i].maxLimit;
          perTransaction = false;
          break;
        }else if (parseFloat(data[i].tbxPerTransactionLimitValue.text) < parseFloat(data[i].minLimit)){
          data[i].lblPerTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " $" + data[i].minLimit;
          data[i].flxPerTransactionLimitError.isVisible = true;
          perTransaction = false;
          break;
        }else if(data[i].tbxPerTransactionLimitValue.text === ""){
          data[i].lblPerTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.perLimitEmpty");
          data[i].flxPerTransactionLimitError.isVisible = true;
          perTransaction = false;
          break;
        }else{
          data[i].lblPerTransactionLimitError.text = "";
          data[i].flxPerTransactionLimitError.isVisible = false;
          perTransaction = true;
        }

        // for daily limit
        if(decimalsOnly.test(data[i].tbxDailyTransactionLimitValue.text) === false){
          data[i].flxDailyTransactionLimitError.isVisible = true;
          data[i].lblDailyTransactionLimitError.text = "Enter valid Limit";
          perTransaction = false;
          break;
        }else{
          data[i].lblDailyTransactionLimitError.text = "";
          data[i].flxDailyTransactionLimitError.isVisible = false;
          dailyTransaction = true;
        }  
        if(data[i].tbxDailyTransactionLimitValue.text === ""){
          data[i].lblDailyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.DailyLimitEmpty");
          data[i].flxDailyTransactionLimitError.isVisible = true;
          dailyTransaction = false;
          break;
        }else if(parseFloat(data[i].tbxDailyTransactionLimitValue.text) > parseFloat(data[i].maxDailyLimit)){
          data[i].lblDailyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than") + " $" + data[i].maxDailyLimit;
          data[i].flxDailyTransactionLimitError.isVisible = true;
          dailyTransaction = false;
          break;        
        }else if(parseFloat(data[i].tbxDailyTransactionLimitValue.text) < parseFloat(data[i].minLimit)){
          data[i].lblDailyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " $" + data[i].minLimit;
          data[i].flxDailyTransactionLimitError.isVisible = true;
          dailyTransaction = false;
          break;        
        }else if(parseFloat(data[i].tbxDailyTransactionLimitValue.text) < parseFloat(data[i].tbxPerTransactionLimitValue.text)){
          data[i].lblDailyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ValueCannotBeLessThanPerTransactionLimit");
          data[i].flxDailyTransactionLimitError.isVisible = true;
          perTransaction = false;
          break;
        }else{
          data[i].lblDailyTransactionLimitError.text = "";
          data[i].flxDailyTransactionLimitError.isVisible = false;
          dailyTransaction = true;
        }     

        //for weekly limit
        if(decimalsOnly.test(data[i].tbxWeeklyTransactionLimitValue.text) === false){
          data[i].flxWeeklyTransactionLimitError.isVisible = true;
          data[i].lblWeeklyTransactionLimitError.text = "Enter valid Limit";
          perTransaction = false;
          break;
        }else{
          data[i].lblWeeklyTransactionLimitError.text = "";
          data[i].flxWeeklyTransactionLimitError.isVisible = false;
          weeklyTransaction = true;
        }  
        if(data[i].tbxWeeklyTransactionLimitValue.text === ""){
          data[i].lblWeeklyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmCompanies.WeeklyLimitEmpty");
          data[i].flxWeeklyTransactionLimitError.isVisible = true;
          weeklyTransaction = false;
          break;
        }else if(parseFloat(data[i].tbxWeeklyTransactionLimitValue.text) > parseFloat(data[i].maxWeeklyLimit)){
          data[i].lblWeeklyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than") + " $" + data[i].maxWeeklyLimit;
          data[i].flxWeeklyTransactionLimitError.isVisible = true;
          dailyTransaction = false;
          break;        
        }else if (parseFloat(data[i].tbxWeeklyTransactionLimitValue.text) < parseFloat(data[i].minLimit)){
          data[i].lblWeeklyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " $" + data[i].minLimit;
          data[i].flxWeeklyTransactionLimitError.isVisible = true;
          perTransaction = false;
          break;
        }else if (parseFloat(data[i].tbxWeeklyTransactionLimitValue.text) < parseFloat(data[i].tbxDailyTransactionLimitValue.text)){
          data[i].lblWeeklyTransactionLimitError.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ValueCannotBeLessThanDailyLimit");
          data[i].flxWeeklyTransactionLimitError.isVisible = true;
          weeklyTransaction = false;
          break;
        }else{
          data[i].lblWeeklyTransactionLimitError.text = "";
          data[i].flxWeeklyTransactionLimitError.isVisible = false;
          weeklyTransaction = true;
        }       
      }
      this.view.segAssignLimits.setData(data);
      this.view.forceLayout();
      return (perTransaction && dailyTransaction && weeklyTransaction);
    }else{
      return true;
    }
  },
  accountUnlink : function(){
    var self = this;
    var success = function(res){
      kony.print(res);
      self.view.flxUnlinkAccount.setVisibility(false);
      self.getCompanyAccounts(self.completeCompanyDetails.CompanyContext[0].id,self.setCompanyAccounts);
    };
    var error = function(res){
      kony.print("error while unlinking the accounts",res);
    };
    this.presenter.unlinkAccounts(self.accountsUnlinkPayload,success,error);
  },
  changeSubTabSkin : function(list,widget){
    for(var i = 0 ;i< list.length;i++){
      list[i].skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    }
    widget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
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
  showAccounts : function(){
    this.view.flxCompanyDetailsApprovalMatrix.setVisibility(false);
    this.tabUtilLabelFunction([ this.view.lblTabName1,this.view.lblTabName2,this.view.lblTabName3,
                               this.view.lblTabName4,this.view.lblTabName5,this.view.lblTabName6],this.view.lblTabName1);
    this.hideAllTabsDetails();
    this.view.flxCompanyDetailAccountsContainer.setVisibility(true);
    // this.setDataToAccountsStatusFilter();    
    this.createDynamicFlexForContract(this.completeContractDetails.contractCustomers , 'Accounts');
    
    this.view.forceLayout();
  },  
   /*
   * Created by :kaushik mesala
   * function to set the header to the segment which will only be visible in case of accounts tab
   * @param: segment to which the header is added
   */
  getHeaderDataForContractAccts : function(accountsFeaturesCard , segment, component_id){
    return {
        'template' : 'flxContractsAccountHeaderView',
        'isAcctHeaderRow':'true',
        'fontIconAccNumberSort' : {
          'text' :'\ue92b',
          "onClick":function(){
            this.sortSegForContractsByColName(accountsFeaturesCard ,  segment,  'lblAccountNumber');
          }.bind(this)
        },
        'lblAccountNameHeader':  kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME"),
        'lblAccountNumberHeader':  kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBER"),
        'lblAccountTypeHeader':  kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE"),
        'lblAccHolderNameHeader':  kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE"),

        'lblAccountStatusHeader':  kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.STATUS"),
        'fontIconAccNameSort' : {
          'text' :'\ue92b',
          "onClick":function(){
            this.sortSegForContractsByColName(accountsFeaturesCard , segment, 'lbAccountName');
          }.bind(this)
        },
        'lblHeaderSeperator':'-',
        'fontIconAccHoldNameSort': {
          "onClick": function(widget, context) {
              this.setFilterPosition(this.view.ownerShipTypeFilterMenu, 'fontIconAccHoldNameSort', accountsFeaturesCard);
          }.bind(this)
      },
      'fontIconAccTypeFilter': {
          "onClick": function(widget, context) {
              this.setFilterPosition(this.view.acctTypeFilterMenu, 'fontIconAccTypeFilter', accountsFeaturesCard);
          }.bind(this)
      },
      'fontIconFilterStatus': {
          "onClick": function(widget, context) {
              this.setFilterPosition(this.view.statusTypeFilterMenu, 'fontIconFilterStatus', accountsFeaturesCard);
          }.bind(this)
      }
    };
  },
  iterate: function(obj) {
    if (obj.hasOwnProperty('parent')) {
        return obj.frame.y + this.iterate(obj.parent);
    } else {
        return 0;
    }
  },
  horIterate: function(obj) {
    if (obj.hasOwnProperty('parent')) {
        return obj.frame.x + this.horIterate(obj.parent);
    } else {
        return 0;
    }
  },
  resetFilterWidgetsForAcct : function(){
    // reset all widgets
    let wid = this.view.flxViewContractFilter.widgets();
    for (let i = 0; i < wid.length; i++) {
        wid[i].isVisible = false;
    }
  },
  setFilterPosition: function(filterComponent, widget , accountsFeaturesCard) {
    
    let check = filterComponent.isVisible;
    // we save the value and reset all the components of filtering
    this.resetFilterWidgetsForAcct();
    filterComponent.isVisible = !check;
    this.view.flxViewContractFilter.isVisible = !check;
    
    if(check){
      // we're turning off the popup and returning from function
      return;
    }
     // the below force layout will adjust the up arrow position which will be used in finding difference
     this.view.flxViewContractFilter.left='0dp';
     this.view.flxViewContractFilter.top='0dp';
     this.view.forceLayout();
 
     
     // 3 positions based on widget
     let e = document.getElementById('flxContractsAccountHeaderView_'+widget);
     // Header icon
     var rect = e.getBoundingClientRect(); 
     console.log(rect.top, rect.right, rect.bottom, rect.left);
  
     // getting the arrow position of the component should be around 0 px
     var rect2  = document.getElementById('frmCompanies_'+filterComponent.id+'_imgUpArrow').getBoundingClientRect();
     var diff = rect.left - rect2.left;
     
     this.view.flxViewContractFilter.left = diff + 'px';
     var diff = rect.top - rect2.top;
    this.view.flxViewContractFilter.top = diff+7 + "px";
    this.view.forceLayout();
  },
   /*
   * Created by :kaushik mesala
   * function to sort the segment data by column name
   * @param: segment to which the header is added
   * @param: column name on which  sorting takes place
   */
  sortSegForContractsByColName:function(accountsFeaturesCard ,segment , sortColumn,context){
      let sectionData = segment.data[0];
      let secData = context==="SIGNATORY_GROUPS"?this.paginationDetails.currSegSignatoryGroupData[1]:this.paginationDetails.currSegContractData[1];
      // if secData is empty or zero size
        if(!secData || secData.length <=1){
          return;
        }
      var scopeObj = this;  
      var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
      scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
      scopeObj.sortBy.inAscendingOrder = sortOrder;
      scopeObj.getObjectSorter().column(sortColumn);
      var sortedData = secData.sort(scopeObj.sortBy.sortData);
      if(context==="SIGNATORY_GROUPS"){
        scopeObj.determineSortFontIcon(scopeObj.sortBy,'lblGroupName',sectionData[0]['lblIconGroupNameSort']);
      scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblNumberOfUsers',sectionData[0]['lblIconSortNumberOfUsers']);
      }else{
      scopeObj.determineSortFontIcon(scopeObj.sortBy,'lbAccountName',sectionData[0]['fontIconAccNameSort']);
      scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblAccountNumber',sectionData[0]['fontIconAccNumberSort']);
      }
      this.paginationDetails.currSegContractData[1] = sortedData;
      sectionData[1] = sortedData.slice(0,10);
      segment.data[0] = sectionData;
      // resetting the pagination labels
      
    accountsFeaturesCard.reportPagination.lblNumber.text = "1";
    accountsFeaturesCard.reportPagination.lblShowing.text = "Showing 1 - 10 Of " + this.paginationDetails.currSegContractData[1].length;

    segment.setData(segment.data);
    this.view.forceLayout();
  }, 
/*
* set the collapse arrow images based on visibility
*/
  toggleCollapseArrowForSeg : function(component , segInd , tabName , resData){
      let segment = component.segAccountFeatures;
      let rowData = segment.data[segInd];
      let arr = [
        {
          "template": "flxContractsFAHeaderView"
        }
      ];  
      let  check = false;

      if (tabName == 'Limits') {
        check = rowData[0]["flxViewLimitsHeader"]["isVisible"];
        
        // check indicates is the segment row is collapse or not
        // if its collapsed than we push the data to this section
      
        if(!check){          
          arr = this.getRowDataForLimits(resData);
        }          
      } else {  
          // for actions tab updating the data
        check = rowData[0]["flxViewActionHeader"]["isVisible"];
        if(!check){
          arr = this.getRowDataForFeatures(resData);
        }
      }
      // for features we have a bottom gap of 20dp
      if(arr.length > 0 && arr[arr.length-1]["flxViewActionBody"]){
        arr[arr.length-1]["flxViewActionBody"]={"left":"57dp","bottom":"20dp"};
      }
      rowData[1] = arr;

      // updating the current index  to expand
      this.resetSectionsForViewContracts(rowData , tabName);  
      
      // The previous row will collapse only if it's not matching current row 
      if (this.prevContractSelected.segRowNo != segInd) {
          this.collapseSegmentSection(segment, tabName);
          this.prevContractSelected.segRowNo = segInd;
      }
      
      // if the section is collapse we reset the previous tab
      if(check) {
          this.prevContractSelected.segRowNo = -1;
      }
      
      segment.setSectionAt(rowData, segInd);
  },
  getRowDataForFeatures: function(feature){
     var self = this;
     // below filter is to show only selected actions
     let filteredActions = (feature.actions || feature.pemissions).filter( function(action) {
      return action.isEnabled !== 'false'
    });
    return 	filteredActions.map(function(action) {
      return {
          "flxViewActionBody":{"left":"57dp"},
          "lblActionName": action.actionName,
          "template": "flxContractsFABodyView",
          "lblFASeperator3": ".",
          "lblActionDesc": action.actionDescription,
          'statusValue' :action.actionStatus == 'SID_ACTION_ACTIVE' ? "Active" : "InActive",
          "statusIcon": {
                'text':'',
                "skin": action.actionStatus == 'SID_ACTION_ACTIVE' ? "sknFontIconActivate" : "sknfontIconInactive"
          }
        }
		}); 
  },
  getObjectFromArrayOfObjects : function(arr){
    ob = {};
    arr.map(function(ele){
      ob[ele.id] = ele.value;
    });
    return ob;
  },
  getRowDataForLimits: function(limit){
    var self = this;
    let filteredActions = limit.actions.filter( function(action) {
      return action.isEnabled !== 'false'
    });
    return 	filteredActions.map(function(action) {
      let limitOb = self.getObjectFromArrayOfObjects(action.limits);
      return {
			  "flxViewLimits":{"left":"57dp"},
			  "lblAction": action.actionName,
              "lblCurrencyPer": self.defaultCurrencyCodeSymbol,
          	  "lblCurrencyDaily": self.defaultCurrencyCodeSymbol,
        	  "lblCurrencyWeekly": self.defaultCurrencyCodeSymbol,
			  "lblPerTransactionLimit": limitOb['MAX_TRANSACTION_LIMIT'] ? limitOb['MAX_TRANSACTION_LIMIT'] :"",
			  "template": "flxContractsLimitsBodyView",
			  "lblDailyTransactionLimit": limitOb['DAILY_LIMIT'] ? limitOb['DAILY_LIMIT'] :"",
        	  "lblLimitsSeperator":".",
        	  "lblFASeperator1":{"isVisible" : false},
			  "lblWeeklyTransactionLimit": limitOb['WEEKLY_LIMIT'] ? limitOb['WEEKLY_LIMIT'] :""
      }
		}); 
  },
  setDataToContractFetaures: function(accountsFeaturesCard, features,isSignGroup,acctDetail) {
    var self = this;
    accountsFeaturesCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.CompanyFeatures");
    let segData = [];    
    accountsFeaturesCard.flxHeadingRightContainer.setVisibility(true);
    accountsFeaturesCard.btnEdit.setVisibility(false);
    accountsFeaturesCard.btnView.left = "40dp";
    accountsFeaturesCard.btnView.onClick= this.setViewFeatureLvlData.bind(this,acctDetail);//,features);
    let segInd = -1;
    if(!isSignGroup){
    // removing the features whose action is not enabled
       features = features.filter(function(feature) {
         var actions = feature.actions ? feature.actions : feature.permissions;
                return actions.filter(function(permissions) {
                    return permissions.isEnabled !== 'false'
          }).length != 0 ; 
    });
    }
    accountsFeaturesCard.lblCount.text = features.length <10 ? "(0"+ features.length  +")" : "("+ features.length  +")";
    
    accountsFeaturesCard.flxNoFilterResults.setVisibility(false);
    if(features.length  == 0){
      accountsFeaturesCard.flxNoFilterResults.setVisibility(true);
      accountsFeaturesCard.flxCardBottomContainer.height='75dp';
      accountsFeaturesCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmCompanies.noFeaturesMsg"); 
    }
    segData = features.map(function(feature) {
        segInd += 1;
      var actions = feature.actions ? feature.actions : feature.permissions;
        return [{
            "flxViewActionHeader": {
                "isVisible": false,
                "left": "57dp"
            },
            /////////////////////////////////////////////////////////
            'flxActionDetails': {
                "left": "27dp"
            },
            'flxHeader': {
                "left": "30dp"
            },
            /////////////////////////////////////////////////////////
            "lblActionDesc": feature.featureDescription ? feature.featureDescription : "" ,
            "lblActionDescHeader": kony.i18n.getLocalizedString("i18n.frmTrackApplication.DescriptionCAPS"),
            "lblActionStatusHeader": kony.i18n.getLocalizedString("i18n.permission.STATUS"),
            "lblActionHeader": kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP"),
            "lblActionName": feature.featureName ? feature.featureName :"",
            "lblArrow": "\ue922", // side arrow
            "lblAvailableActions": "Selected Actions:",
            "lblCountActions": actions.filter(function(permissions) {return permissions.isEnabled !== 'false'}).length,
            "lblFASeperator2": ".",
            "lblFASeperator1": {
                "text": ".",
                "isVisible": false
            },
          "statusValue": {
            "text": feature.featureStatus === "SID_FEATURE_ACTIVE" ? "Active" : "Inactive"
          },
          "template": "flxContractsFAHeaderView",
          "lblFASeperator3": ".",
          "lblFeatureName": feature.featureName,
          "lblTotalActions": "of "+actions.length,
          "statusIcon": {
            "skin": feature.featureStatus === "SID_FEATURE_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive" ,
            "text": kony.i18n.getLocalizedString("i18n.frmAlertsManagement.lblViewAlertStatusKey")
          },
          "flxFeatureStatus" :{
            "width": "70dp"
          },
            "flxArrow": {
                "isVisible": true,
                "onClick": self.toggleCollapseArrowForSeg.bind(self, accountsFeaturesCard, segInd, 'Features' , feature)
            }
        },   
        [{
          "template": "flxContractsFAHeaderView"
        }]
      ];
    });
    // to avoid double line overlap for first row
    if(segData.length > 0 && segData[0][0]){
      segData[0][0]["lblFASeperator3"]='';
    }
    accountsFeaturesCard.segAccountFeatures.rowTemplate = "flxContractsFAHeaderView";
    accountsFeaturesCard.info = {"segData":segData};    
  },
  filterFeatureContainerDataForSearch: function (searchTxt) {
    let filteredData = this.setAllDataToViewFeature.accounts;
    var self = this;
    return filteredData.filter(function (account) {
      // contractCust.accounts = contractCust.accounts.filter(function(account) {
      self.searchFeatureResult.isFeatureMatched = true;
      return account['accountId'].toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 || account['accountName'].toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1;
    });
    // return contractCust.accounts.length !== 0;
    //});
  },
  setViewFeatureLvlData: function (acctDetail, feature) {
    var data = [];
    data = this.accountLevelPermissionsViewFeatures;
    var coreCustomerID = acctDetail.coreCustomerId;
    var acctLvlData = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].coreCustomerId === coreCustomerID) {
        this.setAllDataToViewFeature = data[i];
      }
    }
    this.setDataToViewFeat();
  },
  setDataToViewFeat: function () {
    var data = this.setAllDataToViewFeature;
    this.view.tbxSearchFeature.text = "";
    this.view.flxViewFeatureContainer.setVisibility(true);
    this.view.flxCompanyDetailAccountsContainer.setVisibility(false);
    var accounts = data.accounts;
    this.view.lblSelectedCustomer.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.SelectedCustomer") + " :    ";
    this.view.lblSelectedCustomerID.text = data.coreCustomerName + " (" + data.coreCustomerId + ")";
    this.view.lblSelectedCustomerID.skin = "sknLbl192B45LatoRegular14px";
    this.view.tbxSearchFeature.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumberName");
    var portfolioLvlAccounts = [];
    var allAccounts = [];
    for (var x = 0; x < accounts.length; x++) {
      // if(accounts[x].isPortfolio==="false"){
      var accountJSON = {
        "accountNumber": accounts[x].accountId,
        "accountName": accounts[x].accountName,
        "ownerType": accounts[x].ownerType,
        "accountType": accounts[x].accountType,
        "features": accounts[x].features
      }
      allAccounts.push(accountJSON);
    }
    // else{
    /*  var  portfolioAccounts={ 
         "portfolioId": accounts[x].portfolioId,
         "portfolioName":accounts[x].portfolioName,
         "isPortfolioAccount":accounts[x].isPortfolio,
         "accountNumber":accounts[x].accountId,
         "accountName":accounts[x].accountName,
         "ownerType":accounts[x].ownerType,
         "accountType":accounts[x].accountType,
         "features":accounts[x].features
           }
           portfolioLvlAccounts.push(portfolioAccounts);
           }
    }  //for (var i=0;i<accounts.length;i++){
         //	 let result = this.accountLevelPermissionsViewFeatures.groupBy( ({ accounts[i].portfolioId }) => accounts[i].portfolioId );
         //	 }
         //this.setDataToViewFeature( portfolioLvlAccounts,accounts);
         var totalAccounts = this.accountLevelPermissionsViewFeatures.accounts;
         var port = this.groupByPortfolio(portfolioLvlAccounts, 'portfolioId');
          this.setDataToViewFeature( accounts,port,false);
      */
    this.setDataToViewFeature(accounts, false);
  },
  groupByPortfolio: function (objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      var key = {};
      key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  },
  setDataToViewFeature: function (allAccounts, portfolioAccounts, isSearch) {
    var noOfContracts = 0;
    noOfContracts = allAccounts.length;
    //var customers = this.completeContractDetails.contractCustomers;
    // var totalRec = isSearch ? accountsSearched : customers;
    if (isSearch && noOfContracts === 0) {
      //show no record foundthis.view.flxContractGroupsContainer
      this.view.flxViewFeatureSegmentHead.setVisibility(false);
      this.view.flxNoSearchFound.setVisibility(true);
    } else {
      this.view.flxNoSearchFound.setVisibility(false);
      this.view.flxNoFeatureSearchFound.setVisibility(false);
      this.view.flxViewFeatureSegmentHead.setVisibility(true);
      var self = this;
      var dataMap = {
        "flxViewFeatures": "flxViewFeatures",
        "flxHeader": "flxHeader",
        "flxArrow": "flxArrow",
        "lblDownArrow": "lblDownArrow",
        "flxFeatureDetails": "flxFeatureDetails",
        "flxRow1": "flxRow1",
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
        "flxSortAccountNumber": "flxSortAccountNumber",
        "flxSortAccountName": "flxSortAccountName",
        "lblAccountNameHeader": "lblAccountNameHeader",
        "fontIconAccNameSort": "fontIconAccNameSort",
        "flxOwnershipType": "flxOwnershipType",
        "lblOwnershipType": "lblOwnershipType",
        "fontFilterOwnershipType": "fontFilterOwnershipType",
        "flxViewFeature": "flxViewFeature",
        "lblViewFeature": "lblViewFeature",
        "lblFeatureHeaderSeperator": "lblFeatureHeaderSeperator",
        "lblHeaderSeperator": "lblHeaderSeperator",
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
        "lblIconaction": "lblIconAction",
        "flxActionIconBg":"flxActionIconBg"
      };
      var segData = [];
      var secData, rowData;
      var currPortfolio = {};
      var currPortAccounts = [];
      this.totalCombinedData = [];
      var portfolioId = Object.keys(portfolioAccounts);
      var segmentPath = this.view.segViewFeatureHeader;
      var portfoloioLvlAllFeatures = {};
      for (var x = 0; x < portfolioId.length; x++) {
        for (var y = 0; y < portfolioAccounts[portfolioId[x]].length; y++) {
          currPortfolio = portfolioAccounts[portfolioId[x]][y];
          currPortAccounts = portfolioAccounts[portfolioId[x]];
          secData = {
            "template": "flxViewFeatures",
            "flxViewFeature": { "isVisible": false },
            "flxHeader": { "skin": "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound" },
            "flxArrow": {
              "isVisible": allAccounts.length === 0 ? false : true, "onClick": function (context, eventObj) {
                self.togglePortfolioSection(context, eventObj);
                // self.setViewListFilterOwnershipData(self.setFilterDataForPortfolioFeature, segmentPath, context);
                // self.setViewListFilterAccountTypeData(self.setFilterDataForPortfolioFeature, segmentPath, context);
              }
            },
            "lblDownArrow": { "isVisible": true, "text": "\ue922" },
            "lblHeaderSeperator": { "isVisible": true },
            "flxViewFeatureDetailsHeader": { "isVisible": false, "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight" },
            "lblAccountTypeName": { "text": currPortfolio.portfolioName + " (" + currPortfolio.portfolioId + ")" },
            "lblAvailableActions": { "text": kony.i18n.getLocalizedString("i18n.frmComapnies.NumberOfCashAccounts") },
            "lblCountActions": { "text": self.getTwoDigitNumber(currPortAccounts.length) },
            "lblFeatureView": {
              "skin": "sknLblLatoReg117eb013px", "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ViewFeature"),
              "isVisible": true, "hoverskin": "sknLbl117eb013pxHov", onTouchStart: function (context) { self.viewPortfolioFeatures(context, currPortAccounts); }
            },
            "lblAccountNameHeader": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME") },
            "fontIconAccNameSort": { "text": "\ue92a", "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont" },
            "fontIconAccNumberSort": { "text": "\ue92a", "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont" },
            "flxAccountName": {
              "onTouchStart": function (context) {
                self.sortAndSetData("lblAccountName.text", self.view.segViewFeatureHeader, 3, context.rowContext.sectionIndex)
              }
            },
            "flxAccountNumber": {
              "onTouchStart": function (context) {
                self.sortAndSetData("lblAccountNumber.text", self.view.segViewFeatureHeader, 3, context.rowContext.sectionIndex)
              }
            },
            "lblAccountNumber": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER") },
            "lblAccountType": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE") },
            "lblOwnershipType": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE") },
            "fontFilterOwnershipType": { "isVisible": true },
            "fontIconAccTypeFilter": { "isVisible": true },
            "flxOwnershipType": { "onClick": self.showFilterByAccOwners.bind(self, 2, 1) },
            "flxAccountType": { "onClick": self.showFilterByAccOwners.bind(self, 1, 1) },/*"onTouchStart":function(eventObj){
         self.showAccountTypeFeatureFilter(self.view.AccountTypeStatusFilterMenu, 'fontIconAccTypeFilter');
         }.bind(self)},  
        "fontFilterOwnershipType":{ "isVisible":true,"onTouchStart":function(eventObj){
        self.showAccountTypeFeatureFilter(self.view.OwnershipStatusFilterMenu, 'fontFilterOwnershipType');
        }.bind(self)},*/
            "lblFeatureHeaderSeperator": { "text": "-", "isVisible": true },
            //"lblFASeperator1":{"text":"-","isVisible":true,"skin":"sknlblSeperatorsknlblSeperator"},
          }
          rowData = [];
          var rowJSON = {};
          for (var y = 0; y < currPortAccounts.length; y++) {
            rowJSON = ({
              "template": "flxViewFeatureBody",
              "flxViewFeatureBody": { "isVisible": false, "bottom": "15px" },
              "lblAccountName": { "text": currPortAccounts[y].accountName ? currPortAccounts[y].accountName : "N/A", },
              "lblAccountNumber": { "text": currPortAccounts[y].accountNumber ? currPortAccounts[y].accountNumber : "N/A", },
              "lblAccountType": { "text": currPortAccounts[y].accountType ? currPortAccounts[y].accountType : "N/A", },
              "lblOwnershipType": { "text": currPortAccounts[y].ownerType ? currPortAccounts[y].ownerType : "N/A", },
              "features": { "text": currPortAccounts[y].features ? currPortAccounts[y].features : "N/A" },
              "lblView": { "text": "Edit", "isVisible": false },
              "isRowVisible": false,
              "isPortfolio": true,
              "flxNoRangesCont": { "isVisible": false },
              "lblSeperator": { "isVisible": true, "skin": "sknlblSeperatorD7D9E0" }
            });
            rowData.push(rowJSON);
          }
          this.sortBy = this.getObjectSorter("lblAccountName.text");
          this.sortBy.inAscendingOrder = true;
          rowData = rowData.sort(this.sortBy.sortData);
        }
        this.totalCombinedData.push({ secData: { secData }, rowData: [rowData] });
        segData.push([secData, rowData]);
      }
      segmentPath.info.portfolioData = { "sectionData": segData };
      this.setFilterDataForPortfolioFeature = segmentPath.info.portfolioData.sectionData;
      // for all accounts aswell
      var accSecData = {
        "template": "flxViewFeatures",
        "flxViewFeature": { "isVisible": true, "bottom": "20px" },
        "flxHeader": { "skin": "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound" },
        "lblViewFeature": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.FEATURES") },
        "flxArrow": {
          "onClick": function (context, eventObj) {
            self.togglePortfolioSection(context, eventObj, 1);
            // self.setViewListFilterOwnershipData(self.setFilterDataForPortfolioFeature, segmentPath, context);
            // self.setViewListFilterAccountTypeData(self.setFilterDataForPortfolioFeature, segmentPath, context);
          }
        },
        "lblDownArrow": { "isVisible": true, "text": "\ue915" },
        "flxViewFeatureDetailsHeader": { "isVisible": true, "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight" },
        "lblAccountTypeName": { "text": kony.i18n.getLocalizedString("i18n.AccountsAggregation.DashboardFilter.allAccounts") },
        "lblAvailableActions": { "text": kony.i18n.getLocalizedString("i18n.frmComapnies.NumberOfAccounts") },
        "lblCountActions": { "text": self.getTwoDigitNumber(allAccounts.length) },
        "lblAccountNameHeader": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME") },
        "fontIconAccNumberSort": { "text": "\ue92a", "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont" },
        "fontIconAccNameSort": { "text": "\ue92b", "skin": "sknIcon12pxBlack", "hoverSkin": "sknIcon12pxBlackHover" },
        "flxAccountName": {
          "onTouchStart": function (context) {
            self.sortAndSetData("lblAccountName.text", self.view.segViewFeatureHeader, 4, context.rowContext.sectionIndex)
          }
        },
        "flxAccountNumber": {
          "onTouchStart": function (context) {
            self.sortAndSetData("lblAccountNumber.text", self.view.segViewFeatureHeader, 4, context.rowContext.sectionIndex)
          }
        },
        "lblAccountNumber": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER") },
        "lblAccountType": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE") },
        "lblOwnershipType": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE") },
        "flxOwnershipType": { "onClick": self.showFilterByAccOwners.bind(self, 2, 1) },
        "flxAccountType": { "onClick": self.showFilterByAccOwners.bind(self, 1, 1) },
        "lblHeaderSeperator": { "isVisible": true, "text": "-" },
        "fontFilterOwnershipType": { "isVisible": true },
        "fontIconAccTypeFilter": { "isVisible": true },/*"onTouchStart":function(eventObj){
         self.showAccountTypeFeatureFilter(self.view.AccountTypeStatusFilterMenu, 'fontIconAccTypeFilter');
         }.bind(self)},  
        "fontFilterOwnershipType":{ "isVisible":true,"onTouchStart":function(eventObj){
        self.showAccountTypeFeatureFilter(self.view.OwnershipStatusFilterMenu, 'fontFilterOwnershipType');
        }.bind(self)},*/
        "lblFeatureHeaderSeperator": { "text": "-", "isVisible": true, "skin": "sknLblSeparator696C73" },
      };
      var accRowData = [];
      var accRowJSON = {};
      for (var y = 0; y < allAccounts.length; y++) {
        accRowJSON = ({
          "template": "flxViewFeatureBody",
          "flxViewFeatureBody": { "isVisible": true },
          "flxNoRangesCont": { "isVisible": false },
          "lblAccountName": { "text": allAccounts[y].accountName ? allAccounts[y].accountName : "N/A" },
          "lblAccountNumber": { "text": allAccounts[y].accountId ? allAccounts[y].accountId : "N/A" },
          "lblAccountType": { "text": allAccounts[y].accountType ? allAccounts[y].accountType : "N/A" },
          "lblOwnershipType": { "text": allAccounts[y].ownerType ? allAccounts[y].ownerType : "N/A" },
          "features": { "text": allAccounts[y].featurePermissions ? allAccounts[y].featurePermissions : "N/A" },
          "isPortfolio": false,
          "portfolioId": allAccounts[y].portfolioId,
          "lblView": {
            "text": kony.i18n.getLocalizedString("i18n.frmAdManagement.View"), "isVisible": true, "onTouchStart": function (context) {
              self.viewAccountLvlFeatures(context, allAccounts);
            }
          },
          "lblSeperator": { "isVisible": true, "skin": "sknlblSeperatorD7D9E0" }
        });
        accRowData.push(accRowJSON);
      }
      var secData = accSecData;
      this.totalCombinedData.push({ secData: { secData }, rowData: [accRowData] });
      segmentPath.info.allData = { "sectionData": accSecData };
      segmentPath.info.allData.rowsData = accRowData;
      this.sortBy = this.getObjectSorter("lblAccountName.text");
      this.sortBy.inAscendingOrder = true;
      segmentPath.widgetDataMap = dataMap;
      segmentPath.rowTemplate = "flxViewFeatures";
      accSecData.fontIconAccNumberSort = this.determineSortIconForSeg(this.sortBy, "lblAccountNumber.text");
      accSecData.fontIconAccNameSort = this.determineSortIconForSeg(this.sortBy, "lblAccountName.text");
      accRowData = accRowData.sort(this.sortBy.sortData);
      segData.push([accSecData, accRowData]);
      segmentPath.setVisibility(true);
      self.setFeaturesAccountsFilterDataFeatures([[accSecData, accRowData]]);
      self.view.segViewFeatureHeader.widgetDataMap = dataMap;
      self.view.segViewFeatureHeader.setData(segData);
      this.setFilterDataForAllFeature = segmentPath.info.allData.sectionData;
      this.view.forceLayout();
    }
  },
  viewPortfolioFeatures: function (context, portfolioAccounts) {
    this.view.flxViewFeaturePopup.setVisibility(true);
    this.contextViewPortfolioFeaturePopup = context;
    var secInd = context.rowContext.sectionIndex;
    var data = this.view.segViewFeatureHeader.data[secInd][0].lblAccountTypeName.text;
    var segData = this.view.segViewFeatureHeader.data[secInd][1][0];
    var features = segData.features.text;
    this.setViewFeaturePopupSegData = segData;
    this.view.lblAccountDetails.top = "-1";
    this.view.lblAccountDetails.text = data;
    this.view.lblSelectedAccounts.text = kony.i18n.getLocalizedString("i18n.frmCompaniesController.SelectedPortfolio");
    this.addActiveFeatures(features);
    this.view.forceLayout();
  },

  viewAccountLvlFeatures: function (context, data) {
    this.contextViewAllFeaturePopup = context;
    var secInd = context.rowContext.sectionIndex;
    var rowInd = context.rowContext.rowIndex;
    this.view.flxViewFeaturePopup.setVisibility(true);
    var segData = this.view.segViewFeatureHeader.data[secInd][1][rowInd];
    this.setViewFeaturePopupSegData = segData;
    if (segData.portfolioName === undefined || segData.portfolioName === {}) {
      this.view.lblAccountDetails.text = segData.lblAccountName.text + " (" + segData.lblAccountNumber.text + ")";
    }
    else if (segData.portfolioName != undefined) {
      this.view.lblAccountDetails.text = segData.portfolioName + " (" + segData.portfolioId + ")";
    }
    this.view.lblAccountDetails.top = "-1";
    this.view.lblSelectedAccounts.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + " : ";
    this.addActiveFeatures(segData.features.text);
    this.view.forceLayout();
  },
  /*
  adding the featuers on the basis of feature_status = active/inActive
 */
  addActiveFeatures: function (features) {
    var activeFeatures = [];
    for (var i = 0; i < features.length; i++) {
      if (features[i].featureStatus == "SID_FEATURE_ACTIVE") {
        var accountJSON = {
          "featureName": features[i].featureName,
          "featureStatus": features[i].featureStatus,
          "featureId": features[i].featureId,
          "actions": features[i].permissions
        };
        activeFeatures.push(accountJSON);
      }
    }
    this.setDataToViewFeaturePopup(activeFeatures, false);
    this.searchViewFeaturePopupData = activeFeatures;
    this.view.forceLayout();
  },
  setDataToViewFeaturePopup: function (features, isSearch) {
    var self = this;
    this.view.flxFeatureDetailsFilter.setVisibility(false);
    this.view.flxAccountTypeDetailsFilter.setVisibility(false);
    var noOfContracts = 0;
    noOfContracts = features.length;
    var segData = [];
    var segRowData = [];
    if (isSearch && noOfContracts === 0) {
      this.view.flxFeaturesSegmentContainer.setVisibility(false);
      this.view.flxFeaturesNoSearchFound.setVisibility(true);
    } else {
      this.view.flxFeaturesNoSearchFound.setVisibility(false);
      this.view.flxFeaturesSegmentContainer.setVisibility(true);
      var dataMap = {
        //mapping header segment
        "flxViewFeaturePopupHeader": "flxViewFeaturePopupHeader",
        "isRowVisible": "isRowVisible",
        "flxHeader": "flxHeader",
        "flxFeatureDetails": "flxFeatureDetails",
        "flxRow1": "flxRow1",
        "lblFeatureName": "lblFeatureName",
        "flxFeatureStatus": "flxFeatureStatus",
        "statusIcon": "statusIcon",
        "statusValue": "statusValue",
        "lblCustom": "lblCustom",
        "flxSelectedActions": "flxSelectedActions",
        "lblAvailableActions": "lblAvailableActions",
        "lblCountActions": "lblCountActions",
        "lblTotalActions": "lblTotalActions",
        "flxArrow": "flxArrow",
        "lblArrow": "lblArrow",
        "lblDownArrow": "lblDownArrow",
        "flxViewActionHeader": "flxViewActionHeader",
        "lblActionHeader": "lblActionHeader",
        "lblActionDescHeader": "lblActionDescHeader",
        "lblActionStatusHeader": "lblActionStatusHeader",
        "lblFASeperator2": "lblFASeperator2",
        "lblFASeperator1": "lblFASeperator1",
        "lblFASeperator3": "lblFASeperator3",
        //mapping body segment
        "flxContractsFABodyView": "flxContractsFABodyView",
        "flxViewActionBody": "flxViewActionBody",
        "lblActionName": "lblActionName",
        "lblActionDesc": "lblActionDesc",
        "lblCustom": "lblCustom",
        "flxFeatureStatus": "flxFeatureStatus",
        "lblFASeperator1": "lblFASeperator1",
        "statusIcon": "statusIcon",
        "statusValue": "statusValue"
      };
      var featuresSegData = [];
      var flteredActions = [];
      var actionsFiltered = [];
      for (var i = 0; i < features.length; i++) {
        var flteredActions = [];
        var actionsFiltered = [];
        var segSecData = [];
        var segRowData = [];
        for (var j = 0; j < features[i].actions.length; j++) {
          if (features[i].actions[j].isEnabled === "true") {
            flteredActions.push(features[i].actions[j]);
            segRowData.push({
              "template": "flxContractsFABodyView",
              "flxContractsFABodyView": {
                "isVisible": false,
                "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"
              },
              "flxViewActionBody": {
                "left": "25px"
              },
              "lblActionName": {
                "text": features[i].actions[j].actionName
              },
              "lblActionDesc": {
                "text": features[i].actions[j].actionDescription
              },
              /*actionstatus*/
              "flxFeatureStatus": {
                "isVisible": true,
                "left": "92%"
              },
              "statusValue": {
                "text": features[i].actions[j].isEnabled === "true" /*||feature.featureStatus=== "SID_FEATURE_ACTIVE"*/ ? kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")
              },
              "statusIcon": {
                "skin": features[i].actions[j].isEnabled === "true" /*||feature.featureStatus=== "SID_FEATURE_ACTIVE"*/ ? "sknFontIconActivate" : "sknfontIconInactive",
                "text": "\ue921"
              },
              "lblFASeperator1": {
                "isVisible": false
              },
              "lblSeperator": {
                "isVisible": false
              },
              "isRowVisible": {
                "isVisible": false
              }
            });
          }
        }
        if (flteredActions.length != 0) {
          var accountJSON = {
            "featureName": features[i].featureName,
            "featureStatus": features[i].featureStatus,
            "featureId": features[i].featureId,
            "actions": flteredActions
          };
          actionsFiltered.push(accountJSON);
          for (var a = 0; a < actionsFiltered.length; a++) {
            var segSecData = {
              "template": "flxViewFeaturePopupHeader",
              "flxHeader": {
                "skin": "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound"
              },
              "lblDownArrow": {
                "text": "\ue922"
              },
              "flxViewActionHeader": {
                "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight",
                "isVisible": false
              },
              "lblFeatureName": {
                "text": actionsFiltered[a].featureName
              },
              "lblActionHeader": {
                "text": kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP")
              },
              "lblActionDescHeader": {
                "text": kony.i18n.getLocalizedString("i18n.ConfigurationBundles.descriptionInCaps")
              },
              "lblActionStatusHeader": {
                "text": kony.i18n.getLocalizedString("i18n.common.statusCaps")
              },
              "statusIcon": {
                "isVisible": true,
                "skin": actionsFiltered[a].featureStatus === "SID_FEATURE_ACTIVE" /*||feature.featureStatus=== "SID_FEATURE_ACTIVE"*/ ? "sknFontIconActivate" : "sknfontIconInactive",
                "text": "\ue921"
              },
              "statusValue": {
                "text": actionsFiltered[a].featureStatus === "SID_FEATURE_ACTIVE" /*||feature.featureStatus=== "SID_FEATURE_ACTIVE"*/ ? kony.i18n.getLocalizedString("i18n.CardManagement.ACTIVE") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")
              },
              "lblAvailableActions": {
                "text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon")
              },
              //    "lblCountActions" :self.getTwoDigitNumber(actionsFiltered.actions.filter(function(action) {  return action.isEnabled !== "false"}).length),
              "lblCountActions": self.getTwoDigitNumber(flteredActions.length),
              "flxArrow": {
                "isVisible": true,
                "onClick": function (context) {
                  self.toggleViewFeatureDetailsSection(context);
                }
              },
              "lblArrow": {
                "isVisible": false
              },
              "lblFASeperator1": {
                "isVisible": false
              },
              "lblHeaderSeperator": {
                "text": "-",
                "isVisible": true,
                "skin": "sknlblSeperatorD7D9E0"
              },
              "lblTotalActions": {
                "text": "of " + self.getTwoDigitNumber(features[i].actions.length)
              },
              "lblFASeperator2": {
                "isVisible": false
              },
              "lblFASeperator3": {
                "isVisible": false
              }
            };
          }
          featuresSegData.push([segSecData, segRowData]);
        }
      }
      self.view.segViewFeaturePopupHeaderSegment.widgetDataMap = dataMap;
      self.view.segViewFeaturePopupHeaderSegment.setData(featuresSegData);
      this.view.forceLayout();
    }
  },
  filterPopupDataForSearch: function (searchTxt) {
    let filteredData = JSON.parse(JSON.stringify(this.searchViewFeaturePopupData));
    var self = this;
    return filteredData.filter(function (contractCust) {
      // search by featureName
      if (contractCust.featureName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      }
      contractCust.actions = contractCust.actions.filter(function (action) {
        self.searchFeaturePopupResult.isSearchedMatched = true;
        return action['actionName'].toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1;
      });

      return contractCust.actions.length !== 0;
    });
  },
  toggleViewFeatureDetailsSection: function (event) {
    var segData = this.view.segViewFeaturePopupHeaderSegment.data;
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections
    for (var i = 0; i < segData.length; i++) {
      segData[i][0].lblFASeperator1.isVisible = false;
      if (selectedSecInd !== i) {
        segData[i][0].flxViewActionHeader.isVisible = false;
        segData[i][0].lblFASeperator3.isVisible = false;
        segData[i][0].lblDownArrow.text = "\ue922";
        segData[i][0].lblDownArrow.skin = "sknIcon00000015px";
        segData[i][1] = this.showHideRowFlex(segData[i][1], false);
      }
    }//update selected section
    if (segData[selectedSecInd][1][0].isRowVisible === false) {
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = true;
      segData[selectedSecInd][0].flxViewActionHeader.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
      segData[selectedSecInd][0].lblFASeperator3.isVisible = true;
      segData[selectedSecInd][0].lblDownArrow.text = "\ue915";
      segData[selectedSecInd][0].lblDownArrow.skin = "sknIcon00000015px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1], true);
      if (selectedSecInd < (segData.length - 1)) {
        //  segData[selectedSecInd+1][0].lblFASeperator1.isVisible = true;
      }
    }
    else {
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = false;
      segData[selectedSecInd][0].lblFASeperator3.isVisible = false;
      segData[selectedSecInd][0].lblDownArrow.text = "\ue922";
      segData[selectedSecInd][0].lblDownArrow.skin = "sknIcon00000015px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1], false);
      if (selectedSecInd < (segData.length - 1)) {
        segData[selectedSecInd + 1][0].lblFASeperator1.isVisible = false;
      }
    }
    this.view.segViewFeaturePopupHeaderSegment.setData(segData);
  },
  setFeaturesAccountsFilterDataFeatures: function (accountsData) {
    var self = this;
    this.ownershipFilterData = accountsData[0];
    var typeFilterWid = this.view.AccountTypeStatusFilterMenu;
    var ownershipFilterWid = this.view.OwnershipStatusFilterMenu;
    var flxTypeFilterWid = this.view.flxAccountTypeDetailsFilter;
    var flxOwnershipFilterWid = this.view.flxFeatureDetailsFilter;
    var rowsData = accountsData.length > 0 ? accountsData[0][1] : []
    var lblOwnership = "lblOwnershipType";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var typesList = [], ownerTypeList = [], maxSizeTypeText = "", maxSizeOwnerTypeText = "";
    for (var i = 0; i < rowsData.length; i++) {
      if (!typesList.includes(rowsData[i].lblAccountType.text))
        typesList.push(rowsData[i].lblAccountType.text);
      if (!ownerTypeList.includes(rowsData[i][lblOwnership].text)) {
        ownerTypeList.push(rowsData[i][lblOwnership].text);
      }
    }
    var typesData = typesList.map(function (rec) {
      maxSizeTypeText = (rec && rec.length > maxSizeTypeText.length) ? rec : maxSizeTypeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": self.AdminConsoleCommonUtils.checkboxnormal,
        "lblDescription": rec
      };
    });
    var ownershipData = ownerTypeList.map(function (rec) {
      maxSizeOwnerTypeText = (rec && rec.length > maxSizeOwnerTypeText.length) ? rec : maxSizeOwnerTypeText;
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

    flxTypeFilterWid.width = this.AdminConsoleCommonUtils.getLabelWidth(maxSizeTypeText) + 55 + "px";
    flxOwnershipFilterWid.width = this.AdminConsoleCommonUtils.getLabelWidth(maxSizeOwnerTypeText) + 55 + "px";
    var selTypeInd = [], selOwnerInd = [];
    for (var j = 0; j < typesList.length; j++) {
      selTypeInd.push(j);
    }
    for (var k = 0; k < ownerTypeList.length; k++) {
      selOwnerInd.push(k);
    }
    typeFilterWid.segStatusFilterDropdown.selectedIndices = [[0, selTypeInd]];
    ownershipFilterWid.segStatusFilterDropdown.selectedIndices = [[0, selOwnerInd]];
    this.view.forceLayout();
  },
  showFilterByAccOwners: function (option, category, event, context) {
    this.selectedSectionIndexFilter = context.sectionIndex;
    var flxTypeFilterWid = this.view.flxAccountTypeDetailsFilter; //: this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu;
    var flxOwnershipFilterWid = this.view.flxFeatureDetailsFilter; //: this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc;
    var typeFilterIcon = "fontIconAccTypeFilter";
    var ownershipFilterIcon = "fontFilterOwnershipType";
    if (option === 1) flxOwnershipFilterWid.setVisibility(false);
    else if (option === 2) flxTypeFilterWid.setVisibility(false);
    var filterWidget = (option === 1) ? flxTypeFilterWid : flxOwnershipFilterWid;
    var filterIcon = (option === 1) ? typeFilterIcon : ownershipFilterIcon;
    var flxRight = context.widgetInfo.frame.width - event.frame.x - event.frame.width;
    var iconRight = event.frame.width - event[filterIcon].frame.x;
    filterWidget.right = category === 1 ? (flxRight + iconRight - 30) + "dp" : (flxRight + iconRight - 40) + "dp";
    filterWidget.top = "180dp";
    if (filterWidget.isVisible) {
      filterWidget.setVisibility(false);
    } else {
      filterWidget.setVisibility(true);
    }
  },

  setViewListFilterOwnershipData: function (segData, segPath, eventObj) {
    var self = this;
    var roleList = [];
    var maxSizeText = "";
    var filterPath = "";
    var filterCompPath = "";
    var data = this.totalCombinedData;
    var index = eventObj.rowContext.sectionIndex;
    var selInd = segPath.currentIndex[0];
    this.selectedSectionIndexFilter = index;
    var portfolioDataLength = segData[selInd][1].length;
    this.ownershipFilterData = segData[index];
    if (segPath.id === "segViewFeatureHeader") {
      filterPath = this.view.flxFeatureDetailsFilter;
      filterCompPath = this.view.OwnershipStatusFilterMenu;
    } else {
      filterPath = this.view.flxAccountsFilter2;
      filterCompPath = this.view.filterMenu2;
    }

    for (var i = 0; i < segData[index][1].length; i++) {
      if (segData[index][1][i].lblOwnershipType === undefined) {
        segData[selInd][1] = data[selInd].rowData[0];
        segData[selInd][1][0].flxNoRangesCont.isVisible = false;
      }
      if (!roleList.contains(segData[index][1][i].lblOwnershipType.text))
        roleList.push(segData[index][1][i].lblOwnershipType.text);
    }
    var widgetMap = {
      "role": "role",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var roleData = roleList.map(function (rec) {
      maxSizeText = rec.length > maxSizeText.length ? rec : maxSizeText;
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
    filterPath.width = self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText) + 55 + "px";
    var selRoleInd = [];
    for (var j = 0; j < roleList.length; j++) {
      selRoleInd.push(j);
    }
    filterCompPath.segStatusFilterDropdown.selectedIndices = [
      [0, selRoleInd]
    ];
    self.view.forceLayout();
  },
  filterBasedOnOwnership: function () {
    var selFilter = [[]];
    var dataToReturn = [];
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var accountTypeInd = null;
    var ownershipTypeInd = null;
    var ownershipIndices = this.view.OwnershipStatusFilterMenu.segStatusFilterDropdown.selectedIndices;
    var accountTypeIndices = this.view.AccountTypeStatusFilterMenu.segStatusFilterDropdown.selectedIndices;
    var toBeFilteredData = this.ownershipFilterData[1];
    var segData = this.ownershipFilterData[0];
    //get Account Type
    var types = "";
    accountTypeInd = accountTypeIndices ? accountTypeIndices[0][1] : [];
    for (var j = 0; j < accountTypeInd.length; j++) {
      selFilter[0][0].push(this.view.AccountTypeStatusFilterMenu.segStatusFilterDropdown.data[accountTypeInd[j]].lblDescription);
    }
    //get ownership type
    var types = "";
    ownershipTypeInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < ownershipTypeInd.length; j++) {
      selFilter[0][1].push(this.view.OwnershipStatusFilterMenu.segStatusFilterDropdown.data[ownershipTypeInd[j]].lblDescription);
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToReturn = [];
    } else if (selFilter[0][0].length === this.view.AccountTypeStatusFilterMenu.segStatusFilterDropdown.data.length && selFilter[0][1].length == this.view.OwnershipStatusFilterMenu.segStatusFilterDropdown.data.length) dataToReturn = toBeFilteredData;
    else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) { //both filters selected
      dataToReturn = toBeFilteredData.filter(function (rec) {
        if (selFilter[0][0].indexOf(rec.lblAccountType.text) >= 0 && selFilter[0][1].indexOf(rec.lblOwnershipType.text) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
    }
    return [segData, dataToReturn]
  },
  showAccountTypeFeatureFilter: function (filterComponent, widget) {
    let check = filterComponent.isVisible;
    // we save the value and reset all the components of filtering
    //this.resetFilterWidgetsForAcct();
    filterComponent.isVisible = !check;
    var filterFlex;//=widget=='fontIconAccTypeFilter'?this.view.flxAccountTypeDetailsFilter:this.view.flxFeatureDetailsFilter;
    if (widget == 'fontIconAccTypeFilter') {
      filterFlex = this.view.flxAccountTypeDetailsFilter;
      this.view.flxFeatureDetailsFilter.setVisibility(false);
    } else {
      filterFlex = this.view.flxFeatureDetailsFilter;
      this.view.flxAccountTypeDetailsFilter.setVisibility(false);
    }
    filterFlex.isVisible = !check;
    if (check) {
      // we're turning off the popup and returning from function
      return;
    }
    // the below force layout will adjust the up arrow position which will be used in finding differen
    filterFlex.left = '0dp';
    filterFlex.top = '0dp';

    this.view.forceLayout();
    // 3 positions based on widget
    let e = document.getElementById('flxViewFeatures_' + widget);
    // Header icon
    var rect = e.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    // getting the arrow position of the component should be around 0 px
    var rect2 = document.getElementById('frmCompanies_' + filterComponent.id + '_imgUpArrow').getBoundingClientRect();
    var diff = rect.left - rect2.left;
    filterFlex.left = diff + 'px';
    var diff = rect.top - rect2.top;
    filterFlex.top = diff + 7 + "px";
    this.view.forceLayout();
  },
  setSegmentForNoResult: function(dataToMap) {
    var segRowData = [];
    segRowData.push({
        "template": "flxApprovalMatrixNoRangeRow",
        "flxApprovalEdit": {
            "isVisible": false
        },
        "flxActionIconBg":{"isVisible":false},
        "imgIcon": {
            "isVisible": false
        },
        "btnAddApproval": {
            "isVisible": false
        },
        "flxNoRangesCont": {
            "isVisible": true,
            "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"
        },
        "lblLine": {
            "isVisible": false
        },
        "lblNoApprovalText": {
            "top": "20px",
            "isVisible": true,
            "text": kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found")
        }
    });
    this.setWidgetDataNoResult = [];
    this.setWidgetDataNoResult.push([dataToMap[0], segRowData]);
    return segRowData
},
  setViewListFilterAccountTypeData: function(segData, segPath,eventObj) {
    var self = this;
    var roleList = [];
    var maxSizeText = "";
    var filterPath = "";
    var filterCompPath = "";
    var data= this.totalCombinedData;
    var index = eventObj.rowContext.sectionIndex;
    var selInd ;
    //var portfolioDataLength = segData[selInd][1].length;
    this.selectedSectionIndexFilter=index;
    this.accountTypeFilterData = segData[index];
    if (segPath.id === "segViewFeatureHeader") {
        filterPath =this.view.flxAccountTypeDetailsFilter;
        filterCompPath = this.view.AccountTypeStatusFilterMenu;
        selInd = segPath.currentIndex[0];
    }else
      {
        filterPath = this.view.flxAccountsFilter1;
        filterCompPath= this.view.filterMenu1;
        selInd = index;
      }
      for (var i = 0; i < segData[index][1].length; i++) {
        if (!roleList.contains(segData[index][1][i].lblAccountType.text)) roleList.push(segData[index][1][i].lblAccountType.text);
    }
    var widgetMap = {
        "role": "role",
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
    };
    var roleData = roleList.map(function(rec) {
        maxSizeText = rec.length > maxSizeText.length ? rec : maxSizeText;
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
    filterPath.width = self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText) + 55 + "px";
    var selRoleInd = [];
    for (var j = 0; j < roleList.length; j++) {
        selRoleInd.push(j);
    }
    filterCompPath.segStatusFilterDropdown.selectedIndices = [
        [0, selRoleInd]
    ];
    self.view.forceLayout();
},
setTemplateToAllRowsInSegment: function(segData , template){
    let len = segData.length;
    for( let i=0;i<len;i++){
      segData[i].template = template;
    }
  },
 setDataToContractLimits: function(accountsFeaturesCard, limits) {
        var self = this;
        accountsFeaturesCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Limits");
        accountsFeaturesCard.lblCount.text = "";
        let segData = "";
        let segInd = -1;
        // removing the limits whose action is not enabled
        limits = limits.filter(function(limit) {
            return limit.featurePermissions.filter(function(action) {
                return action.isEnabled !== 'false'
            }).length != 0;
        });
        var limited = [];
        for (var i = 0; i < limits.length; i++) {
            for (var j = 0; j < limits[i].featurePermissions.length; j++) {
              var featureObj = {
			    "featureName" : limits[i].featurePermissions[j].featureName,
                "featureDescription" : limits[i].featurePermissions[j].featureDescription,
                "featureStatus" : limits[i].featurePermissions[j].featureStatus,
                "featureId" : limits[i].featurePermissions[j].featureId,
				"actions":[limits[i].featurePermissions[j]],
			    }
			  limited.push(featureObj);
            }
        }
      var limits = limited;
	accountsFeaturesCard.flxNoFilterResults.setVisibility(false);
    if(limits.length == 0){
      accountsFeaturesCard.flxNoFilterResults.setVisibility(true);
      accountsFeaturesCard.flxCardBottomContainer.height='75dp';
      accountsFeaturesCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmCompanies.noLimitsMsg"); 
    }
    segData = limits.map( function(limit){
      segInd = segInd +1;
      return  [
        {  
          /////////////////////////////////////////////////////////
          'flxActionDetails' :{"left" :"27dp"},
          'flxHeader' :{"left" :"30dp"},
          'flxViewLimitsHeader' :{
                "isVisible": false , 
                "left" :"57dp"
              },
          /////////////////////////////////////////////////////////
          "lblActionDesc": limit.featureDescription,
          "lblFASeperator1": {
            "text": ".",
            "isVisible": false
          },
          "lblLimitsSeperator3": ".",
          'fontIconInfo1':'',
          "flxLimitInfo1":{"onHover" : function(widget, context) {
              let info = "This is daily transaction value for " + limit.featureName + " submitted over the online banking channel.";
              self.onHoverCallBack(widget, context,info , true , accountsFeaturesCard);
            }
          },
          "flxLimitInfo2":{"onHover" : function(widget, context) {
              let info = "This is daily transaction value for " + limit.featureName + " submitted over the online banking channel.";
              self.onHoverCallBack(widget, context,info, true , accountsFeaturesCard);
            }
          },
          "flxLimitInfo3":{"onHover" : function(widget, context) {
              let info = "This is daily transaction value for " + limit.featureName + " submitted over the online banking channel.";
              self.onHoverCallBack(widget, context,info, true , accountsFeaturesCard);
            }
          },
          'fontIconInfo2':'',
          'fontIconInfo3':'',
          "lblActionName": limit.featureName,          
          "lblActionHeader": kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP"),
          "lblPerLimitHeader": "PER TRANSACTION",
          "lblDailyLimitHeader": "DAILY TRANSACTION",
    	    "lblWeeklyLimitHeader":"WEEKLY TRANSACTION",
          "lblAvailableActions": "Monetary Actions:",

          "lblCountActions":{
            'text':limit.actions.length - limit.actions.filter( function(action) {
                    return action.isEnabled === 'false'
                  }).length,
            'isVisible' : true
          },
          'template':'flxContractsLimitsHeaderView',
          'statusValue' : limit.featureStatus == 'SID_FEATURE_ACTIVE' ?'Active':'InActive',
          'statusIcon' : {
          "text" :  kony.i18n.getLocalizedString("i18n.frmAlertsManagement.lblViewAlertStatusKey"),
            "skin": "sknFontIconActivate"
          },
          'flxViewLimits':{"left" :"57dp"},
          "lblArrow": "\ue922", // side arrow
          "flxArrow": {
            "isVisible":true,
              "onClick": self.toggleCollapseArrowForSeg.bind(self, accountsFeaturesCard, segInd , 'Limits' , limit)
          }
        },[{
          "template": "flxContractsFAHeaderView"
        }
      ]];
      }); 
    accountsFeaturesCard.segAccountFeatures.rowTemplate = "flxContractsFAHeaderView";
    accountsFeaturesCard.info = {"segData":segData};
  },

  showFeatures : function(){
    this.view.flxCompanyDetailsApprovalMatrix.setVisibility(false);
      this.tabUtilLabelFunction([ this.view.lblTabName1, this.view.lblTabName2, this.view.lblTabName3,
        this.view.lblTabName4, this.view.lblTabName5,this.view.lblTabName6
    ], this.view.lblTabName2);
  //  this.suspendFeatureHideShow("mandatory_feature_screen");
    this.hideAllTabsDetails();
    this.presenter.getContractFeatureActionLimits(this.recentContractDetails.contractId,this.completeContractDetails.legalEntityId , 'Features');
    this.view.flxCompanyDetailAccountsContainer.setVisibility(true);
    this.view.forceLayout();
  },
  showLimits : function(){
    this.view.flxCompanyDetailsApprovalMatrix.setVisibility(false);
    this.tabUtilLabelFunction([ this.view.lblTabName1,this.view.lblTabName2,this.view.lblTabName3,
                               this.view.lblTabName4,this.view.lblTabName5,this.view.lblTabName6],this.view.lblTabName3);
    this.hideAllTabsDetails();
    this.presenter.getContractFeatureActionLimits(this.recentContractDetails.contractId,this.completeContractDetails.legalEntityId , 'Limits');
    this.view.flxCompanyDetailAccountsContainer.setVisibility(true);
    this.view.forceLayout();
  },
  showSignatories: function(){
    this.view.flxCompanyDetailsApprovalMatrix.setVisibility(false);
    this.tabUtilLabelFunction([ this.view.lblTabName1, this.view.lblTabName2, this.view.lblTabName3,
      this.view.lblTabName4, this.view.lblTabName5,this.view.lblTabName6], this.view.lblTabName4);
    this.hideAllTabsDetails();
    this.presenter.getContractInfinityUsers(this.recentContractDetails.contractId);
	
    this.view.flxCompanyDetailAccountsContainer.setVisibility(false);
    this.view.flxCompanyDetailaCustomerContainer.setVisibility(true);
    this.view.forceLayout();
  },
  setSignatories : function(){
    let customers = this.completeCompanyDetails.signatoryUsers;
    if(customers && customers.length !=0 ){
      
        this.view.flxAddSignatories.setVisibility(false);
        // flxUsersContent has segment to populate data
        this.setSignatoriesContent(customers);
        this.view.flxUsersContentSignatories.setVisibility(true); 
    }else{
        this.view.flxAddSignatories.setVisibility(true);
        // flxUsersContent has segment to populate data
        this.view.flxUsersContentSignatories.setVisibility(false);
    }
    var scopeObj = this;
    this.view.btnCreateUser.onClick = function(){
      scopeObj.usersSelectedSignatoryList = {};
      scopeObj.visbiltyChangesForAddUserButton();
    };
    this.view.forceLayout();
  },
  sortSignatories:function(sortColumn){
    var scopeObj  = this;
    var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    scopeObj.getObjectSorter().column(sortColumn);
    let sectionData = this.view.segSignatoriesDetail.data;
    var sortedData = sectionData.sort(scopeObj.sortBy.sortData);
    
    scopeObj.view.lblSignatoryRoleSortIcon.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy,'lblRole');
    scopeObj.view.lblSignatoriesNameSortIcon.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy, 'lblName.text');
    scopeObj.view.lblSignatoryUserNameSortIcon.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy, 'lblUsername');
    scopeObj.view.lblSignCustomerEmailIDSortIcon.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy, 'lblEmail.text');
    scopeObj.view.lblSignCustomerStatusSortIcon.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy, 'lblCustomerStatus');

    scopeObj.view.segSignatoriesDetail.setData(sortedData);
    scopeObj.view.forceLayout();
  },
  setSignatoriesContent :function(customers){
     
      let finalData = customers.map(this.mappingSignatoryAccounts);
      let widgetDataMap = {
        "flxCompanyCustomer": "flxCompanyCustomer",
        "flxContainer": "flxContainer",
        "flxCustomerStatus": "flxCustomerStatus",
        "flxOptions": "flxOptions",
        "lblCustomerStatus": "lblCustomerStatus",
        "lblEmail": "lblEmail",
        "lblFontIconOptions": "lblFontIconOptions",
        "lblIconStatus": "lblIconStatus",
        "lblName": "lblName",
        "lblRole": "lblRole",
        "lblSepartor": "lblSepartor",
        "lblUsername": "lblUsername"
       };
      this.view.segSignatoriesDetail.widgetDataMap = widgetDataMap;
      this.view.segSignatoriesDetail.setData(finalData);
    var scopeObj = this;
    /*business user header*/
    this.view.flxSignatoriesName.onClick = function(){
      scopeObj.sortSignatories("lblName.text");
    };
    this.view.flxSignatoryRole.onClick = function(){
      scopeObj.sortSignatories("lblRole");
    };
    this.view.flxSignatoryUserName.onClick = function(){
      scopeObj.sortSignatories("lblUsername");
    };
    this.view.flxSignCustEmail.onClick = function(){
      scopeObj.sortSignatories("lblEmail.text");
    };
    this.view.flxSignCustomerStatus.onClick = function(){
      scopeObj.sortSignatories("lblCustomerStatus");
    };
  },
  getName : function(data){
    if (!data.firstName){
        return  kony.i18n.getLocalizedString("i18n.Applications.NA");
    }
    if (data.middleName)
        return data.firstName +" "+ data.middleName+" "+ data.lastName;
    else
        return data.firstName +" "+ (data.lastName || "");
  },
  mappingSignatoryAccounts: function(data) {
    var self = this;
    let statusText =  kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
    let iconSkin = "sknfontIconInactive";

    if(data.statusId  === "SID_CUS_ACTIVE"){
      iconSkin = "sknFontIconActivate";
      statusText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
    }else if(data.statusId  === "SID_CUS_NEW"){
      iconSkin = "sknIcon039dffBlue12px";
      statusText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.New");
    }

    return {
      'customerId': data.customerId ,
        "lblRole": data.primaryCoreCustomerId ? data.primaryCoreCustomerId : kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblEmail": data.Email ? {"text": self.AdminConsoleCommonUtils.getTruncatedString(data.Email, 19, 17),
                          "tooltip":data.Email} : kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblUsername": data.userName ? data.userName : kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "lblName": {"text":self.getName(data).trim(),
                    "onClick" : self.onClickSignUserNavigateToProfile },
      "lblSeperator": ".",
      "lblIconStatus": {
        "text":"\ue921",
        "skin": iconSkin
      },
      "lblCustomerStatus": {
        "text": statusText,
        "skin": "sknlblLatoReg485c7513px"
      },  
      "template": "flxCompanyCustomer"
    };
  },
  getCompanyAllDetails : function(id,option){
    
    // var payLoad = {
    //   "contractId" : id, 
    //   "selectTab": tabNum
    // };
    this.recentContractDetails.contractId = id;
    this.presenter.getContractInformation(id,"frmCompanies");
  },
  getCompanyAccounts : function(id,success){
    var self = this;
    var accountsSuccess = function(accountContext){
      self.completeCompanyDetails.accountContext = accountContext.accountContext;
      success();
    };
    var payLoad = {
      "Organization_id" : id
    };
    self.presenter.getCompanyAccounts(payLoad,accountsSuccess,self.createdCompanyDetailError);
  },
  getCompanyCustomers : function(id,success){
    var self = this;
    var accountsSuccess = function(customerContext){
      self.completeCompanyDetails.customerContext = customerContext.customerContext;
      success();
    };
    var payLoad = {
      "Organization_id" : id
    };
    self.presenter.getCompanyCustomers(payLoad,accountsSuccess,self.createdCompanyDetailError);
  },
  createdCompanyDetailError : function(error){
    kony.print("getCompanyAccounts(form controller)not able to fetch company details",error);
  },
  getCompleteDataForcontractDetails: function(context){    
    var self = this;
    
    self.completeContractDetails = context.contractDetails ? context.contractDetails : [];    
    self.completeCompanyDetails.customerContext = context.customerContext ? context.customerContext : [];
    self.view.contractDetailsPopup.flxBackOption.onClick = function(){
      self.view.flxContractDetailsPopup.setVisibility(false);
    };
    try{  
      self.setViewContractDetails();
    }catch(err){
       this.view.toastMessage.showErrorToastMessage("Error while setting contract details", this);
    }
  },
  detailScreenVisibilties : function(){
    this.view.flxCompanyDetailAccountsContainer.setVisibility(true);
    this.view.flxCompanyDetailaCustomerContainer.setVisibility(false);
  },
  setViewContractDetails : function(){
    this.completeCompanyDetails.accountsFeatures=null;
    var companyDetails = this.completeContractDetails['address']?this.completeContractDetails['address'][0]:{};
    this.detailScreenVisibilties();
    var contractName = this.completeContractDetails.name;
    this.view.breadcrumbs.lblCurrentScreen.text = contractName ? (contractName).toUpperCase() : "CONTRACT";
    this.view.lblTypeValue.text = this.completeContractDetails.serviceType === "TYPE_ID_BUSINESS" ? "Business Banking" :this.completeContractDetails.serviceType==="TYPE_ID_WEALTH"?"Wealth Banking": "Retail Banking";

    this.view.lblCompanyDetailName.text = this.AdminConsoleCommonUtils.getParamValueOrNA(contractName);
    this.view.flxFlagBackground.skin = "sknflxCustomertagPurple";
    var addr = kony.i18n.getLocalizedString("i18n.Applications.NA");
    if(companyDetails && companyDetails.addressLine1 && companyDetails.addressLine2){
      addr = companyDetails.addressLine1+" "+ companyDetails.addressLine2;
    } else if(companyDetails && (companyDetails.addressLine1 || companyDetails.addressLine2)){
      addr = companyDetails.addressLine1 !== "" ? companyDetails.addressLine1 : companyDetails.addressLine2;
    }
    
    this.view.lblDetailsValue11.text = this.AdminConsoleCommonUtils.getParamValueOrNA(this.completeContractDetails.id);
    this.view.lblDetailsValue12.text = this.completeContractDetails.serviceType === "TYPE_ID_BUSINESS" ? "Business Banking" :this.completeContractDetails.serviceType==="TYPE_ID_WEALTH"?"Wealth Banking": "Retail Banking";
    this.view.lblDetailsValue14.text = this.getLEDesc(this.completeContractDetails.legalEntityId)[0].companyName;

    let communication =this.completeContractDetails["communication"][0];
    this.view.lblContactDetailsValue11.text = this.AdminConsoleCommonUtils.getParamValueOrNA(communication.phoneNumber);
    this.view.lblContactDetailsValue12.text = this.AdminConsoleCommonUtils.getParamValueOrNA(communication.email);
    this.view.lblContactDetailsValue13.text = addr;

    // this.view.lblContactDetailsValue21.text = addr;
    // this.view.lblContactDetailsValue22.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.cityName);
    // this.view.lblContactDetailsValue23.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.state); 

    this.view.lblContactDetailsValue31.text =  this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails ? companyDetails.country :companyDetails);
    this.view.lblContactDetailsValue32.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails ? companyDetails.zipCode:companyDetails);
    this.view.flxCompanyDetailsContainer.setVisibility(true);
    this.view.lblArrowIcon.text= "\ue922";
    this.view.flxCompanyContactDetails.setVisibility(false);
    //set taxId field
    
    this.view.lblDetailsValue13.text = this.AdminConsoleCommonUtils.getParamValueOrNA(this.completeContractDetails.servicedefinitionName);
    this.setContractPopupHeadings();
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
  setCompanyDetails : function(){
    var companyDetails = this.completeCompanyDetails.CompanyContext[0];
    this.detailScreenVisibilties();
    var companyName = this.completeCompanyDetails.CompanyContext[0].Name;
    this.view.breadcrumbs.lblCurrentScreen.text = companyName ? (companyName).toUpperCase() : "COMPANY";
    this.view.lblTypeValue.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.TypeName);
    this.view.lblCompanyDetailName.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.Name);
    this.view.flxFlagBackground.skin = "sknflxCustomertagPurple";
    var addr = kony.i18n.getLocalizedString("i18n.Applications.NA");
    if(companyDetails.addressLine1 && companyDetails.addressLine2){
      addr = companyDetails.addressLine1+" "+ companyDetails.addressLine2;
    } else if(companyDetails.addressLine1 || companyDetails.addressLine2){
      addr = companyDetails.addressLine1 !== "" ? companyDetails.addressLine1 : companyDetails.addressLine2;
    }
    
    this.view.lblDetailsValue11.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.id);
    this.view.lblDetailsValue12.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.businessType);
    
    this.view.lblContactDetailsValue11.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.Phone);
    this.view.lblContactDetailsValue12.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.faxId);
    this.view.lblContactDetailsValue13.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.Email);
    this.view.lblContactDetailsValue21.text = addr;
    this.view.lblContactDetailsValue22.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.cityName);
    this.view.lblContactDetailsValue23.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.state); 
    this.view.lblContactDetailsValue31.text =  this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.country);
    this.view.lblContactDetailsValue32.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.zipCode);
    this.view.flxCompanyDetailsContainer.setVisibility(true);
    this.view.lblArrowIcon.text= "\ue922";
    this.view.flxCompanyContactDetails.setVisibility(false);
    //set taxId field
    if(this.isAccountCentricConfig === true){
      this.view.lblDetailsValue13.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.taxId);
    } else{
      this.view.lblDetailsValue13.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails.taxId);
      if(this.view.lblDetailsValue13.text !== kony.i18n.getLocalizedString("i18n.Applications.NA"))
        this.setDataForTaxIdHoverTooltip(this.view.lblDetailsValue13.text);
    }
    this.view.forceLayout();
  },
  
  /*
   * Created by :kaushik mesala
   * function to filter accounts data based on search text
   * @param: result of filtered data
   */
  filterAccountsDataForSearch: function(searchTxt ){
    let filteredData = JSON.parse(JSON.stringify(this.completeContractDetails.contractCustomers));
    var self =this;
    return filteredData.filter( function(contractCust){
      // search by customer Id &  by customer name
      if (contractCust.coreCustomerName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ||
       contractCust.contractId.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      }      
      // search by account name
      // nested loop for account names
      contractCust.accounts = contractCust.accounts.filter(function(account){
        self.searchResult.isAcctMatched = true;
        return account['accountName'].toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ;
      });
      return contractCust.accounts.length !== 0;
    });
  },
  /*
   * Created by :kaushik mesala
   * function to filter features data based on search text
   * @param: result of filtered data
   */
  filterFeaturesDataForSearch: function(searchTxt ){
    let filteredData =  JSON.parse(JSON.stringify(this.globalLevelPermissionsFeatures));
    var self =this;
    return filteredData.filter( function(contractCust){
      
       // search by customer Id &  by customer name
       if (contractCust.coreCustomerName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ||
       contractCust.coreCustomerId.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      }    

      // removing is enabled false
      custFeat = contractCust.features.filter(function(feature) {
        return feature.permissions.filter(function(action) {
            return action.isEnabled !== 'false'
        }).length != 0;
      });

      // search by feature name
      contractCust.features	 = custFeat.filter(function(feature){
        if(feature.featureName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ){
          self.searchResult.isFeatureMatched = true;
          return true;
        }

      // search by Action name
        feature.permissions = feature.permissions.filter(function(action){
          self.searchResult.isActionMatched = true;
          return action.actionName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 && action.isEnabled !== 'false';
        });
        return feature.permissions.length !== 0;
      });
      
      return contractCust.features.length !== 0;
      
    });
  },
  /*
   * Created by :kaushik mesala
   * function to filter limits data based on search text
   * @param: result of filtered data
   */
  filterLimitsDataForSearch: function(searchTxt ){
    let filteredData = JSON.parse(JSON.stringify(this.setTransactionLimits));
    var self =this;
    return filteredData.filter(function(contractCust) {
    
       // search by customer Id &  by customer name
       if (contractCust.coreCustomerName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ||
       contractCust.coreCustomerId.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      }    

      // removing is enabled false
      custFeat = contractCust.accounts.filter(function(limits) {
        return limits.featurePermissions.filter(function(action) {
            return action.isEnabled !== 'false'
        }).length != 0;
      });

      // search by feature name
      contractCust.accounts = custFeat.filter(function(limits){
        if(limits.featureName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ){
          self.searchResult.isLimitMatched = true;
          return true;
        }

      // search by Action name
        limits.actions = limits.actions.filter(function(action){
          self.searchResult.isActionMatched = true;
          return action.actionName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 && action.isEnabled !== 'false';
        });
        return limits.actions.length !== 0;
      });
      
      return contractCust.accounts.length !== 0;
    });
  },
  /*
   * Created by :kaushik mesala
   * function to set response data under account 
   * @param: result of service call to be mapped
   */
  setCompanyAccounts : function(accData){
    var accountContext = accData ? accData : this.completeCompanyDetails.accountContext;
    if(accountContext && accountContext.length > 0){
	/*
   * Commented By :Kaushik Mesala
   * commenting the segment mapping and flex handling as we are not using the below segCompanyDetailAccount for the functionality
   */

      // var finalData = accountContext.map(this.mappingCompanyAccounts);
      // var widgetDataMap = {
      //   "flxCompanyAccounts": "flxCompanyAccounts",
      //   "flxCompanyDetailsAccounts": "flxCompanyDetailsAccounts",
      //   "flxStatus": "flxStatus",
      //   "lblAccountNumber": "lblAccountNumber",
      //   "lblAccountName":"lblAccountName",
      //   "lblAccountType":"lblAccountType",
      //   "lblSeperator": "lblSeperator",
      //   "fontIconStatus": "fontIconStatus",
      //   "lblStatus": "lblStatus",
      //   "flxUnlink" : "flxUnlink",
      //   "flblUnlink" : "flblUnlink",
      //   "flxAccountOwner" : "flxAccountOwner",
      //   "Membership_id":"Membership_id",
      //   "Status_id":"Status_id"
      // };
      // this.view.segCompanyDetailAccount.widgetDataMap = widgetDataMap;
      // if(this.isAccountCentricConfig === false){ //for customer centric
      //   finalData = this.groupAccountsByCIF(finalData,2);
      //   var segData = [].concat.apply([], Object.values(finalData));
      //   this.view.segCompanyDetailAccount.setData(segData);
      //   this.view.flxCustomerIdPart.setVisibility(true);

      //   this.view.flxAccountsSegmentPart.left = "18%";
      //   this.view.flxAccountsSegmentPart.width = "82%";
      //   this.view.flxAccountType.width = "23%";
      //   this.view.flxAccountType.left = "35dp";
      //   this.view.flxAccountName.left = "30%";
      //   this.view.flxAccountName.width = "21.5%";

      //   this.generateCustomerIdRows(finalData);

      // } else{ // for account centric
      //   this.view.flxCustomerIdPart.setVisibility(false);
      //   this.view.flxAccountsSegmentPart.left = "0dp";
      //   this.view.flxAccountsSegmentPart.width = "100%";
      //   this.view.flxAccountType.width = "23%";
      //   this.view.flxAccountType.left = "10dp";
      //   this.view.flxAccountName.left = "27%";
      //   this.view.flxAccountName.width = "24.5%";
      //   this.view.segCompanyDetailAccount.setData(finalData);
      // }
      this.showHideCompanyAccountsData(1);
    } else{
      this.showHideCompanyAccountsData(2);
    }
    
   // this.sortBy = this.getObjectSorter("lblAccountType");
    //this.resetSortImages("accounts");
    //var sortedData = finalData.sort(this.sortBy.sortData);
    this.view.forceLayout();
  },
  mappingCompanyAccounts : function(data){
    var self = this;
    return{
      "flxCompanyDetailsAccounts": {
        "onHover" : self.onHoverAccountsSeg
      },
      "lblAccountNumber": {
        "text" : data.Account_id ? data.Account_id : kony.i18n.getLocalizedString("i18n.Applications.NA")
      },
      "lblAccountType":this.isAccountCentricConfig === true ? 
      {"width":"25%",
       "left":"10dp",
       "text":data.accountType ? data.accountType : kony.i18n.getLocalizedString("i18n.Applications.NA")} :
      {"width":"23%",
       "left":"35dp",
       "text":data.accountType ? data.accountType : kony.i18n.getLocalizedString("i18n.Applications.NA")},
      "lblAccountName":this.isAccountCentricConfig === true ? 
      {"width":"24.5%",
       "left":"27%",
       "text" : data.AccountName ? data.AccountName : kony.i18n.getLocalizedString("i18n.Applications.NA")} :
      {"width":"21.5%",
       "left":"30%",
       "tooltip": data.AccountName,
       "text" : data.AccountName ? self.AdminConsoleCommonUtils.getTruncatedString(data.AccountName,18,16) : kony.i18n.getLocalizedString("i18n.Applications.NA")},
      "lblSeperator": ".",
      "fontIconStatus": {
        "skin": data.StatusDesc?data.StatusDesc.toLowerCase() === "active" ? "sknFontIconActivate" : "sknfontIconInactive":"sknFontIconWhite"
      },
      "lblStatus": {
        "text": data.StatusDesc ? data.StatusDesc : kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "skin": data.StatusDesc ? data.StatusDesc.toLowerCase() === "active" ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px": "sknlblLato5bc06cBold14px"
      },
      "flxUnlink" : {
        isVisible : false,
      },
      "flblUnlink" : {
        "text" : "\ue974",
        "tooltip": "Unlink"
      },
      "Status_id": data.Status_id || "",
      "Membership_id":data.Membership_id || "",
      "template": "flxCompanyDetailsAccounts"
    };
  },
  generateCustomerIdRows: function(data){
    var custList = Object.keys(data);
    var newRow ="";
    this.view.flxAccCustomerIdColumn.removeAll();
    for(var i=0;i<custList.length;i++){
      var rowCount = data[custList[i]].length;
      newRow = this.view.flxAccountsCustRow.clone("c"+i);
      newRow.isVisible = true;
      var lblname = "c"+i + "lblCustomerId";
      newRow[lblname].text = custList[i];
      newRow.top = "0px";
      newRow.height = (rowCount*45) +"px";
      this.view.flxAccCustomerIdColumn.addAt(newRow,i);
    } 
    this.view.forceLayout();
  },
  /*
  * show accounts list or no results found based on opt
  * @param: opt - 1/2
  */
  showHideCompanyAccountsData : function(opt){
    if(opt === 1){ //show accounts list
      this.view.flxNoAccountResults.setVisibility(false);
      this.view.segCompanyDetailAccount.setVisibility(true);
      if(this.isAccountCentricConfig === false){ //for customer centric
        this.view.flxAccountCustVerticalLine.setVisibility(true);
        this.view.flxAccCustomerIdColumn.setVisibility(true);
        this.view.segCompanyDetailAccount.setVisibility(true);
      }
    } else if(opt === 2){ //show no record found
      this.view.flxNoAccountResults.setVisibility(true);
      this.view.segCompanyDetailAccount.setVisibility(false);
      if(this.isAccountCentricConfig === false){ //for customer centric
        this.view.flxAccountCustVerticalLine.setVisibility(false);
        this.view.flxAccCustomerIdColumn.setVisibility(false);
      }
    }
    this.view.forceLayout();
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
  getGoogleSuggestion : function(text){
    var self = this;
    function onSuccess(response) {
      self.view.segSearch.setVisibility(true);
      self.setSerchSegmentData(response);
      self.view.forceLayout();
    }
    function onError(response) {
      kony.print("Error",response);
    }
    this.presenter.getAddressSuggestion(text, onSuccess, onError);

  },
  mapping : function(data){
    return{
      "lblId" : data.place_id,
      "lblAddress" : data.description,
      "lblPinIcon" : "",
      "lat" : "17.4947934",
      "long" : "78.3996441"
    };
  },
  setSerchSegmentData : function(data){
    var self = this;
    var finalData;
    if(data.predictions){
      finalData = data.predictions.map(self.mapping);
      var dataMap = {
        lblAddress : "lblAddress",
        lblPinIcon : "lblPinIcon"
      };
      this.view.segSearch.widgetDataMap = dataMap;
      this.view.segSearch.setData(finalData);
    }
  },
  checkAvailabilty : function(key,list){
    for(var i=0;i<list.length;i++){
      if((list[i].lblAddress.text).toLowerCase().indexOf(key.toLowerCase()))
        return true;
    }
    return false;
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
    }else if(category === 2){
      sourceData =self.segState;
      var country = self.view.typeHeadCountry.tbxSearchKey.info.data;
      dataToAssign = sourceData.filter(function(rec){
        var name = (rec.lblAddress.text).toLowerCase();
        return ((name.indexOf(searchText.toLowerCase()) > -1) && (rec.Country_id === country.id) );
      });

    }else if(category === 3){
      sourceData =self.segLocationCity;
      var state = self.view.typeHeadState.tbxSearchKey.info.data;
      dataToAssign = sourceData.filter(function(rec){
        var name = (rec.lblAddress.text).toLowerCase();
        return ((name.indexOf(searchText.toLowerCase()) > -1)&& (rec.Region_id === state.id));
      });
    }
    if(searchText === "") dataToAssign = [];
    segPath.setData(dataToAssign);
    if(dataToAssign.length > 0){
      segPath.setVisibility(true);
      noResultFlex.setVisibility(false);
      if(noResultFlex === this.view.typeHeadCountry.flxNoResultFound){
        this.view.flxCountry.zIndex = 2;
      }else{
        this.view.flxCountry.zIndex = 1;
      }
    }else{
      segPath.setVisibility(false);
      noResultFlex.setVisibility(true);
      if(noResultFlex === this.view.typeHeadCountry.flxNoResultFound){
        this.view.flxCountry.zIndex = 2;
      }else{
        this.view.flxCountry.zIndex = 1;
      }
    }
    self.view.forceLayout();
  },
  /*
    * displays required main flex(search,details,create) and hides other
    * @param: path of flex to show
    */
  hideRequiredMainScreens : function(reqFlexPath){
    var self = this;
    this.view.flxAddGroups.setVisibility(false);
    self.view.flxViewSignatoryGroups.setVisibility(false);
    self.view.flxCompanyDetails.setVisibility(false);
    if(reqFlexPath)
      reqFlexPath.setVisibility(true);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    if(reqFlexPath && reqFlexPath.id === "flxCompanyDetails"){
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
	  this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      this.view.flxMainContent.height = (screenHeight -115) +"px";
    } else{
      this.view.flxMainContent.height = (screenHeight -90) +"px";
    }
    self.view.forceLayout();
  },
  /*
   * validate owner detail screen fields
   */
  validateOwnerDetailsScreen: function () {
    var self = this;
    var isValid = true;
    //firstname
    if (self.view.textBoxOwnerDetailsEntry11.tbxEnterValue.text.trim() === "") {
      self.view.textBoxOwnerDetailsEntry11.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxOwnerDetailsEntry11.flxInlineError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry11.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.FirstNameMissing");
      isValid = false;
    }
    //lastname
    if (self.view.textBoxOwnerDetailsEntry13.tbxEnterValue.text.trim() === "") {
      self.view.textBoxOwnerDetailsEntry13.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxOwnerDetailsEntry13.flxInlineError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry13.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.LastNameMissing");
      isValid = false;
    }
    //email-id
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (self.view.textBoxOwnerDetailsEntry23.tbxEnterValue.text.trim() === "") {
      self.view.textBoxOwnerDetailsEntry23.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxOwnerDetailsEntry23.flxInlineError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailId_cannot_be_empty");
      isValid = false;
    } else if (emailRegex.test(self.view.textBoxOwnerDetailsEntry23.tbxEnterValue.text.trim()) === false) {
      self.view.textBoxOwnerDetailsEntry23.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxOwnerDetailsEntry23.flxInlineError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailID_not_valid");
      isValid = false;
    }
    //contact num
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!self.view.textBoxOwnerDetailsEntry31.txtContactNumber.text || !self.view.textBoxOwnerDetailsEntry31.txtContactNumber.text.trim()) {
      self.view.textBoxOwnerDetailsEntry31.txtContactNumber.skin = "skinredbg";
      self.view.textBoxOwnerDetailsEntry31.flxError.left = "80dp";
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_be_empty");
      isValid = false;
    } else if (self.view.textBoxOwnerDetailsEntry31.txtContactNumber.text.trim().length > 15) {
      self.view.textBoxOwnerDetailsEntry31.txtContactNumber.skin = "skinredbg";
      self.view.textBoxOwnerDetailsEntry31.flxError.left = "80dp";
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_exceed");
      isValid = false;
    } else if (phoneRegex.test(self.view.textBoxOwnerDetailsEntry31.txtContactNumber.text) === false) {
      self.view.textBoxOwnerDetailsEntry31.txtContactNumber.skin = "skinredbg";
      self.view.textBoxOwnerDetailsEntry31.flxError.left = "80dp";
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
      isValid = false;
    }
    //ISD code
    var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
    if (!self.view.textBoxOwnerDetailsEntry31.txtISDCode.text ||
        !self.view.textBoxOwnerDetailsEntry31.txtISDCode.text.trim() ||
        (self.view.textBoxOwnerDetailsEntry31.txtISDCode.text === "+")) {
      self.view.textBoxOwnerDetailsEntry31.txtISDCode.skin = "skinredbg";
      self.view.textBoxOwnerDetailsEntry31.flxError.left = "0dp";
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    } else if (self.view.textBoxOwnerDetailsEntry31.txtISDCode.text.trim().length > 4) {
      self.view.textBoxOwnerDetailsEntry31.txtISDCode.skin = "skinredbg";
      self.view.textBoxOwnerDetailsEntry31.flxError.left = "0dp";
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    } else if (ISDRegex.test(self.view.textBoxOwnerDetailsEntry31.txtISDCode.text) === false) {
      self.view.textBoxOwnerDetailsEntry31.txtISDCode.skin = "skinredbg";
      self.view.textBoxOwnerDetailsEntry31.flxError.left = "0dp";
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    }
    //DOB
    if (self.view.customCalOwnerDOB.value === "") {
      self.view.flxCalendarDOB.skin = "sknFlxCalendarError";
      self.view.textBoxOwnerDetailsEntry21.flxInlineError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.DOB_cannot_be_empty");
      isValid = false;
    }
    //SSN
    if (self.view.textBoxOwnerDetailsEntry22.tbxEnterValue.text.trim() === "") {
      self.view.textBoxOwnerDetailsEntry22.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxOwnerDetailsEntry22.flxInlineError.setVisibility(true);
      self.view.textBoxOwnerDetailsEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.SSN_cannot_be_empty");
      isValid = false;
    }
    self.view.forceLayout();
    return isValid;
  },  
  /*
   * clears all fields in create company owner details
   */
  clearDataForOwnerDetails : function(){
    var self =this;
    self.clearValidationsForOwnerDetails();
    self.view.textBoxOwnerDetailsEntry11.tbxEnterValue.text = "";
    self.view.textBoxOwnerDetailsEntry12.tbxEnterValue.text = "";
    self.view.textBoxOwnerDetailsEntry13.tbxEnterValue.text = "";
    self.view.textBoxOwnerDetailsEntry21.tbxEnterValue.text = "";
    self.view.textBoxOwnerDetailsEntry22.tbxEnterValue.text = "";
    self.view.textBoxOwnerDetailsEntry23.tbxEnterValue.text = "";
    self.view.textBoxOwnerDetailsEntry31.txtContactNumber.text = "";
    self.view.textBoxOwnerDetailsEntry31.txtISDCode.text = "";
    self.view.customCalOwnerDOB.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    self.view.forceLayout();
  },
  /*
   * clears the inline error for owner details in create company
   */
  clearValidationsForOwnerDetails : function(txtBoxPath,errFlexPath){
    var self = this;
    if(txtBoxPath){
      txtBoxPath.skin = "skntbxLato35475f14px";
      if(errFlexPath) errFlexPath.setVisibility(false);
    } else{
      self.view.textBoxOwnerDetailsEntry11.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxOwnerDetailsEntry13.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.flxCalendarDOB.skin = "sknflxEnterValueNormal";
      self.view.textBoxOwnerDetailsEntry22.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxOwnerDetailsEntry23.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxOwnerDetailsEntry31.txtContactNumber.skin = "skntbxLato35475f14px";
      self.view.textBoxOwnerDetailsEntry31.txtISDCode.skin = "skntbxLato35475f14px";

     self.view.textBoxOwnerDetailsEntry11.flxInlineError.setVisibility(false);
      self.view.textBoxOwnerDetailsEntry13.flxInlineError.setVisibility(false);
      self.view.textBoxOwnerDetailsEntry21.flxInlineError.setVisibility(false);
      self.view.textBoxOwnerDetailsEntry22.flxInlineError.setVisibility(false);
      self.view.textBoxOwnerDetailsEntry23.flxInlineError.setVisibility(false);
      self.view.textBoxOwnerDetailsEntry31.flxError.setVisibility(false);      
    }
    self.view.forceLayout();
  },
  updatedAddedRemovedList: function(a1,a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    }); 
  },
  
  backToCompanyDetails: function(tabselection){
    this.view.settingsMenu.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCompanies.SearchContract");
    
    this.view.breadcrumbs.lblCurrentScreen.text = this.completeContractDetails.name ? (this.completeContractDetails.name).toUpperCase() : "COMPANY";
    this.hideRequiredMainScreens(this.view.flxCompanyDetails);
    this.view.flxBreadcrumb.setVisibility(true);
    this.view.flxSettings.setVisibility(false);
    if(tabselection === 1){
      this.showAccounts();
    } else if(tabselection === 4){
      this.showSignatories();
    } 
    else if(tabselection === 6){
      this.showSignatoryGroups();
      this.view.tbxGroupsSearch.text = "";
      this.view.flxClearGroupsSearch.setVisibility(false);
    }
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },
  resetSortImages : function(context) {
    var self = this;
    if (context === "searchList") {
      self.sortIconFor('lblCompanyName.info.value', 'fontIconSortName');
      self.sortIconFor('lblEmail', 'fontIconSortRoles');
      self.sortIconFor('lblCompanyId', 'fontIconSortCompanyId');
      
    } else if(context === "accounts"){
      self.sortIconFor('lblAccountType.text', 'lblAccountTypeSortIcon');
      self.sortIconFor('lblAccountName.text', 'lblAccountNameSortIcon');
      self.sortIconFor('lblAccountNumber.text', 'lblAccountNumberSortIcon');
      self.sortIconFor('lblStatus.text', 'lblStatusSortIcon');
    } else if(context === "businessUsers"){
      self.sortIconFor('lblName.text', 'lblCustomerNameSortIcon');
      self.sortIconFor('lblRole.text', 'lblRoleSortIcon');
      self.sortIconFor('lblUsername.text', 'lblUserNameSortIcon');
      self.sortIconFor('lblEmail.text', 'lblCustomerEmailIDSortIocn');
      self.sortIconFor('lblCustomerStatus.text', 'lblCustomerStatusSortIcon');
    } else if(context === "transactions"){
      self.sortIconFor('lblRefNo','fonticonSortTranasctionRefNo');
      self.sortIconFor('lblDateAndTime','fonticonSortTransactionDateAndTime');
      self.sortIconFor('lblType','fonticonSortTransactionType');
      self.sortIconFor('lblAmountOriginal','fonticonSortTransactionAmountOriginal');
      self.sortIconFor('lblAmountConverted','fonticonSortTransactionAmountConverted');
    } else if(context === "signatoryGroups"){
      self.sortIconFor('lblGroupName','lblIconGroupNameSort');
      self.sortIconFor('lblNumberOfUsers','lblIconSortNumberOfUsers');
    }
  },
  sortAndGetData : function(segData, sortColumn, context) {
    var self = this;
    self.sortBy.column(sortColumn);
    self.resetSortImages(context);
    return segData.sort(self.sortBy.sortData);
  },
  hideAllOptionsButtonImages : function(){
    this.tabUtilVerticleArrowVisibilityFunction(
      [this.view.verticalTabsCompany.flxImgArrow1,
       this.view.verticalTabsCompany.flxImgArrow2,
       this.view.verticalTabsCompany.flxImgArrow3,
       this.view.verticalTabsCompany.flxImgArrow4],
      "" );
  },  
  calWidgetFormatDate :function(dateString) {
    var yyyy = +dateString.substr(0, 4);
    var mm = +dateString.substr(5, 2);
    var dd = +dateString.substr(8, 2);
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return  mm + "/" + dd + "/" + yyyy;
  },
  sortForTransactions: function (SegmentWidget, columnName, sortImgWidget, defaultScrollWidget, NumberofRecords, LoadMoreRow) {
    var data = SegmentWidget.info.searchAndSortData;
    var sortdata = this.sortAndSetData(data, columnName, "transactions");
    if (NumberofRecords === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL")) {
      SegmentWidget.info.searchAndSortData = sortdata;
      SegmentWidget.setData(sortdata);
    } else if (data.length > NumberofRecords) {
      SegmentWidget.info.searchAndSortData = sortdata;
      var newData = sortdata.slice(0, NumberofRecords);
      if (LoadMoreRow !== null) newData.push(LoadMoreRow);
      SegmentWidget.setData(newData);
    } else {
      SegmentWidget.info.searchAndSortData = sortdata;
      SegmentWidget.setData(sortdata);
    }
    this.sortIconFor(columnName, sortImgWidget);
    this.view.forceLayout();
  },
  hideAddressSegments : function(typeHeadPath){
    this.view.typeHeadCity.segSearchResult.setVisibility(false);
    this.view.typeHeadCountry.segSearchResult.setVisibility(false);
    this.view.typeHeadState.segSearchResult.setVisibility(false);
    if(typeHeadPath){
      typeHeadPath.segSearchResult.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
   * function to get address codes of city,state,country populated
   */
  getAddressCodes : function(name){
    var self = this;
    var country = self.segCountry;
    var state = self.segState;
    //country
    var r1 = country.filter(function(rec){
      if(rec.lblAddress.text.indexOf(name[0]) >= 0){
        return rec;
      }
    });
    self.view.typeHeadCountry.tbxSearchKey.info.data = r1[0] ||{};
    //state
    var r2 = state.filter(function(rec){
      if(rec.lblAddress.text.indexOf(name[1]) >= 0){
        return rec;
      }
    });
    self.view.typeHeadState.tbxSearchKey.info.data = r2[0] ||{};
    //city
    self.view.typeHeadCity.tbxSearchKey.info.data = {};
  },
  returnEnteredText : function(name, email) {
    var enteredText = "";
    if(name !== null && name !== "") {
      if(email !== null && email !== "") {
        enteredText = name + " and " + email;
      }
      else {
        enteredText = name;
      }
    }else if(email !== null && email !== "") {
      enteredText = email;
    }
    return enteredText;
  },
  /*
   * function to navigate to customer profile form on click of business user name
   */
  onClickUserNavigateToProfile : function(){
    var self = this;
    var data = self.view.segCompanyDetailCustomer.data;
    var index = self.view.segCompanyDetailCustomer.selectedRowIndex[1];
    var rowData = data[index];
    var param = {
      "Customer_id": rowData.customerEditInfo.id
    };
    
    self.presenter.navigateToCustomerPersonal(param,{"name":"frmCompanies" ,
    'data': { 
      'breadcrumbValue': [kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS"),contractName] , 
      'previousPageCallBack':()=>{
        let x = new kony.mvc.Navigation('frmCompanies');
        x.navigate();  
      }
    }});
  },
  /*
   * function to navigate to customer profile form on click of business user name
   */
  onClickSignUserNavigateToProfile : function(){
    var self = this;
    var data = self.view.segSignatoriesDetail.data;
    var index = self.view.segSignatoriesDetail.selectedRowIndex[1];
    var rowData = data[index];
    var param = {
      "Customer_id": rowData.customerId,
      "legalEntityId": self.completeContractDetails.legalEntityId
    };
    
    kony.adminConsole.utils.showProgressBar(this.view);
    let contractName = this.view.lblCompanyDetailName.text;
    self.presenter.navigateToCustomerPersonal(param,{"name":"frmCompanies" , 'data': { 'breadcrumbValue':contractName}});
  },
   hideAllTabsDetails : function() {
    var self =  this;
    var flexChildrenlength = self.view.flxDetailsContainer.children.length;
    for(var i = 0; i < flexChildrenlength; i++) {
      self.view[self.view.flxDetailsContainer.children[i]].setVisibility(false);
    }
   },
  subtract: function(a1,a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    }); 
  },
  checkForPrimaryFeatures : function(data){
    var allMandatoryFeatures = this.requiredFeatures.mandatory;
    var mandatory = [] ,additional = [];
    
    for(var i=0;i<allMandatoryFeatures.length;i++){
      for(var j=0;j<data.length;j++){
    	if(allMandatoryFeatures[i].id === data[j].featureId){
          mandatory.push(data[j]);
        }
      }
    }
    additional = this.subtract(data,mandatory);
    return{
      additional : additional,
      mandatory : mandatory
    };
  },
  fillFeatureDetails : function(feature){
    var statusInfo = {};
    var featureStatus = feature.status ? feature.status : feature.featureStatus;
    statusInfo = this.getFeatureStatusAndSkin(featureStatus);
    this.view.lblFeatureDetailsHeader2.text=feature.featureName;
    this.view.fontIconActive.skin=statusInfo.statusIconSkin;
    this.view.lblFeatureStatus.text=statusInfo.status;
    this.view.lblFeatureDescriptionValue.text=feature.featureDescription;
    this.setViewFeatureActionsData(feature.Actions);
    this.view.flxFeatureDetails.setVisibility(true);
    this.view.forceLayout();
  },
  //flxViewSignatoryGrp
   onDropDownHover: function(widget, context) {
        var self = this;
        if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
            self.view.flxSelectOptionsSignatory.setVisibility(true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
            self.view.flxSelectOptionsSignatory.setVisibility(true);
        } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
            self.view.flxSelectOptionsSignatory.setVisibility(false);
            self.view.flxOptionsSignatory.skin = "sknFlxBorffffff1pxRound";
        }
        self.view.forceLayout();
    },  
   setViewSignatoryGroupsSegmentData:function(signatoryGroupsUsers) {
    var self =this;
     var segmentPath=this.view.segUserDetailsSegment;
     this.hideRequiredMainScreens(this.view.flxViewSignatoryGroups);
     this.view.flxEditOptionSignatory.info=signatoryGroupsUsers.signatoryGroupId;
     var countUsers=signatoryGroupsUsers.signatories.length;
     if(countUsers>0){
       var widgetDataMap= {      
      "flxSegUserDetails":"flxSegUserDetails",
      "flxAssignedCustomers":"flxAssignedCustomers",
      "lblIconWarning":"lblIconWarning",
      "flxCheckBox":"flxCheckBox",
      "imgCheckBox":"imgCheckBox",
      "flxName":"flxName",
      "lblSortName":"lblSortName",
      "lblName":"lblName",
      "lblUserID":"lblUserID",
      "flxRole":"flxRole",
      "flxRoleFilter":"flxRoleFilter",
      "lblFilterRole":"lblFilterRole",
      "lblrole":"lblrole",
      "lblView":"lblView",
      "lblIconRemove":"lblIconRemove",
      "lblSeperator":"lblSeperator"
      };
     var secData={
      "template":"flxSegUserDetails",
      "lblName":{"text":"NAME","skin":"sknlblLato696c7311px"},
      "flxNameContainer":{"isVisible":true,"left":"20dp","width":"37%"},
      "lblSortName":{"text":"\ue920","skin":"sknIcon15px","hoverSkin" :"sknlblCursorFont"},
	  "flxName":{"isVisible":true,"left":"50dp","width":"100%","onClick":function(){
        self.sortAndSetData("lblName.text",segmentPath,2);
      }},
      "imgCheckBox": {"isVisible":false},//"src":"checkboxnormal.png"},
      "flxCheckBox":{"isVisible":false},//"{"isVisible":true,"onClick":function(){self.toggleBulkCheckbox(self.view.segSelectionList,self.view.commonButtonsScreen1.btnSave);}},
      "lblUserID":{"width":"18%","left":"5%","text":"USER ID","skin":"sknlblLato696c7311px"},
      "flxRole":{"isVisible":true,"width":"23%"},
      "lblrole":{"text":"ROLE","skin":"sknlblLato696c7311px"},
      "lblView":{"text":"APPROVAL PERMISSIONS","width":"22%","skin":"sknlblLato696c7311px","left":"0dp"},//"hoverSkin":"sknlblLatoRegular484b5213px","width":"16%"},
      "lblIconRemove":{"isVisible":false},
      "lblIconWarning":{"isVisible":false},
      "lblFilterRole":{"isVisible":true},
      "flxRoleFilter":{"isVisible":true,"onClick":self.showRoleFilter.bind(self,segmentPath)},
      "lblSeperator":{"skin":"sknLblSeparator696C73","isVisible":true,"left":"20dp"}
    };
     segmentPath.info.allData={"sectionData":secData};
    segmentPath.info.allData["rowsData"]={};
    var rowData={};
        var segData = signatoryGroupsUsers.signatories.map(function(rec){
        rowData={
          "template":"flxSegUserDetails",       
       //   "lblIconWarning":{           "left":"20dp",          "isVisible":false          },
          "flxNameContainer":{"isVisible":true,"left":"20dp","width":"37%"},
          "flxName":{"isVisible":true,"left":"50dp","width":"100%"},
          "lblName": {"text":rec.customerName||rec.fullName,"skin":"sknLbl485C75LatoRegular13Px"},
          "lblUserID":{"width":"18%","left":"5%","text":rec.userName||rec.customerId,"skin":"sknLbl485C75LatoRegular13Px"},
          "lblrole":{"text":rec.role,"skin":"sknLbl485C75LatoRegular13Px"},
          "lblView": {
           "left":"0dp",
           "width":"22%",
           "text":"View",
           "isVisible":true,
           "skin":"sknLblLato13px117eb0",
           "isVisible":true,
               "hoverSkin": "sknLbl117eb013pxHov",
           "onTouchStart": function(context) {
             self.getApprovalPermissions(context,segmentPath);
                    },
         },
          "flxRole":{"isVisible":true,"width":"23%"},
          "lblSortName":{"isVisible":false},
          "lblFilterRole":{"isVisible":false},
          "lblIconRemove":  
          {
           "isVisiblle":true,
           "onHover":self.showDeleteTooltip,
           "hoverSkin": "sknfbfcfc",
           "onClick" : function(context){
            self.showDeleteGroupPopup(context,rec,"REMOVE_USER",signatoryGroupsUsers);
              },       
          }, 
        //  "lblIconWarning":{"left":"20dp",         "top":"15dp",      "isVisible":true,          "onHover":self.showWarningTooltip,                      },
          "lblSeperator":{/*"skin":"sknLblSeparator696C73",*/"isVisible":true,"left":"20dp"}
          }
        segmentPath.info.allData.rowsData[rec.userName]=rowData;
        return rowData;
        });
    segmentPath.widgetDataMap=widgetDataMap;
     segmentPath.rowTemplate="flxSegUserDetails";
     self.sortBy = self.getObjectSorter("lblName.text");
     secData.lblSortName=this.determineSortIconForSeg(this.sortBy,"lblName.text");
     var sortedData = segData.sort(self.sortBy.sortData);
     self.setListFiltersData(segData,segmentPath);
     segmentPath.setData([[secData,sortedData]]);
       segmentPath.setVisibility(true);
     //  this.view.flxDetailsHeader.setVisibility(true);
       this.view.lblDetailsHeaderSeperator.setVisibility(true);
       this.view.lblNoResultsScreenView.setVisibility(false);
     }else{
       segmentPath.setVisibility(false);
       this.view.lblDetailsHeaderSeperator.setVisibility(false);
       this.view.flxDetailsHeader.setVisibility(false);
       this.view.lblNoResultsScreenView.setVisibility(true);
       this.view.lblNoResultsScreenView.text = "No users have been added to this group."
     }
         this.view.flxSelectOptionsSignatory.onHover =this.onDropDownHover;
         this.view.lblSignatoryGroupName.text=signatoryGroupsUsers.signatoryGroupName;  
         this.view.lblNumberOfUsersValue.text="0"+countUsers;
         this.view.lblViewCustomerIdValue.text=signatoryGroupsUsers.coreCustomerId;
         this.view.lblViewServiceValue.text=this.view.lblCompanyDetailName.text;
         this.view.lblViewCreatedBy.text=signatoryGroupsUsers.createdBy;
         this.view.lblViewCreatedOn.text=this.getLocaleDateAndTime(signatoryGroupsUsers.createdOn);
         this.view.lblLastModifiedValue.text=this.getLocaleDateAndTime(signatoryGroupsUsers.lastModified);
         this.view.lblViewGroupDescriptionValue.text=signatoryGroupsUsers.signatoryGroupDescription;
         this.noGroupUsers=[];
         this.view.segSearchedUserDetails.info.selectedIds=[];
         this.view.segSearchedUserDetails.info.removedIds={};
      	 this.view.lblUserDetailsHeader.text="Users (0"+countUsers+")";
      //breadcrumb
         this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
         this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
         this.view.breadcrumbs.btnPreviousPage.text = this.view.lblCompanyDetailName.text.toUpperCase();
         this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.Contracts.ViewSignatoryGroup");
         this.view.forceLayout();
    },
  /*showWarningTooltip : function(widget,context){
    var self=this;
    if (widget) { 
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER ) {
        this.view.warningToolTip.top = (context.pageY -120)+"dp";
        this.view.warningToolTip.left = (context.pageX -  +67 -230 -70) +"dp"; self.view.warningToolTip.lblNoConcentToolTip.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.WarningToolTip.noApprovalPermission");
        self.view.warningToolTip.setVisibility(true);
        this.view.warningToolTip.lblarrow.left = "20dp";
        this.view.warningToolTip.width = "350dp";
        this.view.warningToolTip.left="-10dp";
        this.view.warningToolTip.lblNoConcentToolTip.left = "5dp";
        this.view.warningToolTip.lblarrow.left = "10%";
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view.warningToolTip.setVisibility(false);
      }
    }
    self.view.forceLayout();
  },*/
  showDeleteTooltip : function(widget,context){
    var self=this;
    if (widget) { 
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER ) 
      {
         this.view.warningToolTip.top = (context.pageY - 110) + "dp";
         this.view.warningToolTip.left = (context.pageX - 110 - 230 - 70) + "dp";
         this.view.warningToolTip.width = "85dp";
         this.view.warningToolTip.lblNoConcentToolTip.left= "66dp";                 
         self.view.warningToolTip.lblNoConcentToolTip.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.deleteIconTooltip.removeUsers");
         self.view.warningToolTip.setVisibility(true);
         this.view.warningToolTip.lblarrow.left = "77%";
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view.warningToolTip.setVisibility(false);
      }
    }
   self.view.forceLayout();
  },

  showDeleteGroupPopup: function(context,rec,content,signatoryGroupsUsers) {    

    var scopeObj = this;
    scopeObj.view.flxUnlinkAccount.setVisibility(true);
    scopeObj.view.popUp.lblPopUpMainMessage.text = (content==="REMOVE_USER"?kony.i18n.getLocalizedString("i18n.frmPermissionsController.Remove_User"):"Delete Group")+ " \""+rec.customerName+"\"?";
    scopeObj.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.deletePopUp.deleteBtn");
    scopeObj.view.popUp.btnPopUpDelete.width = "150dp";
    var msg1=content==="REMOVE_USER"?kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.text1"):"Are you sure you want to delete the group ''"+signatoryGroupsUsers.signatoryGroupName+"''?";
    var msg2=content==="REMOVE_USER"?kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.text2") +" \""+  this.view.lblSignatoryGroupName.text:"";
    var msg3=content==="REMOVE_USER"?kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.text3"):"All the users assigned will no longer be associated to this group.";
    scopeObj.view.popUp.rtxPopUpDisclaimer.text=msg1 +"''"+rec.customerName+"''"+ msg2+"\" ?"+"<br/>"+ msg3;
    scopeObj.view.popUp.rtxPopUpDisclaimer.width = "80%";   
    var customer=rec.customerId;
     var contractId=this.completeContractDetails.id;

    var cust = [];
    for(var a = 0;a<signatoryGroupsUsers.signatories.length;a++){
      if(customer==signatoryGroupsUsers.signatories[a].customerId){
        cust.push({
          "customerId":signatoryGroupsUsers.signatories[a].customerId,
          "isUserRemoved":"true"
        });
      }
    }
 //   var signatories = {      "customerId" : customer,      "isUserRemoved" : "true"    };    
    scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
      if(content==="REMOVE_USER" ){
       scopeObj.presenter.updateSignatoryGroups({
                    "signatoryGroupId": signatoryGroupsUsers.signatoryGroupId,
                    "signatoryGroupName": signatoryGroupsUsers.signatoryGroupName,
                    "signatoryGroupDescription": signatoryGroupsUsers.signatoryGroupDescription,
                    "coreCustomerId": signatoryGroupsUsers.coreCustomerId,
                    "contractId": contractId,
                    "signatories": JSON.stringify(cust)
                });
       scopeObj.view.flxUnlinkAccount.setVisibility(false);
        }
   //  else { scopeObj.presenter.deleteSignatoryGroup({"signatoryGroupId":signatoryGroupsUsers.signatoryGroupId});    //} 
    scopeObj.view.forceLayout();
  }
  },  
  showDeleteGroupPopupListPage:function(context){
    var scopeObj = this;
    scopeObj.view.flxUnlinkAccount.setVisibility(true); 
    scopeObj.view.popUp.btnPopUpDelete.width = "150dp";
    scopeObj.view.popUp.btnPopUpCancel.text=kony.i18n.getLocalizedString("i18n.permission.CANCEL");
    scopeObj.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmCompanies.viewSignatoryGroup.DeleteGroupPopup.mainText")+" ''" +context.signatoryGroupName+"''?";
    scopeObj.view.popUp.btnPopUpDelete.text =kony.i18n.getLocalizedString("i18n.frmCompanies.ViewSignatoryGroup.DeleteGroupPopup.deleteBtn");
    scopeObj.view.popUp.rtxPopUpDisclaimer.width = "80%";
    var msg1=kony.i18n.getLocalizedString("i18n.frmCompanies.viewSignatoryGroup.DeleteGroupPopup.msg1")+" ''"+context.signatoryGroupName+"''?";          
    var msg2=kony.i18n.getLocalizedString("i18n.frmCompanies.viewSignatoryGroup.DeleteGroupPopup.msg2");
    scopeObj.view.popUp.rtxPopUpDisclaimer.text = msg1+"<br/>"+msg2;
    var contractId=this.completeContractDetails.id;
    scopeObj.view.popUp.btnPopUpDelete.onClick = function() {  
      scopeObj.view.flxUnlinkAccount.setVisibility(false);
      scopeObj.presenter.deleteSignatoryGroup({"signatoryGroupId":context.signatoryGroupId,
                                               "contractId":contractId,
                                               "signatoryGroupName":context.signatoryGroupName});
      if(context.isViewScreen === true){
        scopeObj.view.flxCompanyDetails.setVisibility(true);
        scopeObj.view.flxViewSignatoryGroups.setVisibility(false);
      }
    }
    scopeObj.view.forceLayout();
  },  
     showErrorGroupPopup: function(context){
       var scopeObj = this;
        scopeObj.view.flxUnlinkAccount.setVisibility(true);  
        scopeObj.view.popUp.flxPopUpTopColor.skin="sknFlxBge61919";
        scopeObj.view.popUp.rtxPopUpDisclaimer.width = "80%";
        scopeObj.view.popUp.btnPopUpCancel.setVisibility(false);
        var msg1 =kony.i18n.getLocalizedString("i18n.frmCompanies.viewSignatoryGroup.errorGroupPopup.msg1")+" ''" +context.signatoryGroupName+"'' "+ kony.i18n.getLocalizedString("i18n.frmCompanies.viewSignatoryGroup.errorGroupPopup.msg2")+" <br/>";    
        var msg2 =kony.i18n.getLocalizedString("i18n.frmCompanies.viewSignatoryGroup.errorGroupPopup.msg3")+" "+ context.signatoryGroupName+".";       
        scopeObj.view.popUp.lblPopUpMainMessage.text= "Can not Delete Group ''"+context.signatoryGroupName+"''" ;
        scopeObj.view.popUp.rtxPopUpDisclaimer.text = msg1+msg2;
        scopeObj.view.popUp.btnPopUpDelete.text =kony.i18n.getLocalizedString("i18n.frmCustomerManagement.close_popup");
        scopeObj.view.popUp.btnPopUpDelete.width="120dp";
        scopeObj.view.popUp.btnPopUpDelete.skin="sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5"
        scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
      //  scopeObj.presenter.deleteSignatoryGroup({"signatoryGroupId":rec.signatoryGroupId});
        scopeObj.view.flxUnlinkAccount.setVisibility(false); 
        }
         scopeObj.view.forceLayout();
     },
  convertToLocaleString : function(value){
    if(value === undefined)
      return value;
    else
      return (parseFloat(value)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'EUR',
    });
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
  /*
  * set filter data in company details accounts tab
  */
  setDataToAccountsStatusFilter : function(){
    var self = this;
    var statusList=[],maxLenText = "";
    var accountsData = self.completeCompanyDetails.accountContext;
    for(var i=0;i<accountsData.length;i++){
      if(!statusList.contains(accountsData[i].StatusDesc))
        statusList.push(accountsData[i].StatusDesc);
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
      maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    self.view.flxAccountStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  /*
  * created by :kaushik mesala
  * set filter data in company details accounts tab
  */
  setDataToContractAccountsFilter : function(filterComponent,headerData, accountsData , colName , accountsFeaturesCard){
    var self = this;
    var statusList=[],maxLenText = "";
    
    for(var i=0;i<accountsData.length;i++){
      if(!statusList.contains(accountsData[i][colName]))
        statusList.push(accountsData[i][colName]);
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
      maxLenText = (rec && (rec.length > maxLenText.length)) ? rec : maxLenText;
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec||""
      };
    });
    filterComponent.segStatusFilterDropdown.widgetDataMap = widgetMap;
    filterComponent.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    filterComponent.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    filterComponent.segStatusFilterDropdown.onRowClick = function(){
      var segStatusData = filterComponent.segStatusFilterDropdown.data;
      var indices = filterComponent.segStatusFilterDropdown.selectedIndices;
      
      accountsFeaturesCard.reportPagination.setVisibility(false);
      
      if (indices) {
          // selType is to store all the selected values to be matched
          var selType = [];
          
          selInd = indices[0][1]; // all selected indexes in filter
          for (var i = 0; i < selInd.length; i++) {
              selType.push(filterComponent.segStatusFilterDropdown.data[selInd[i]].Status_id);
          }

          if (selInd.length === segStatusData.length) { //all are selected
            
            this.paginationDetails.currSegContractData[1] = accountsData;
            accountsFeaturesCard.segAccountFeatures.setData([headerData].concat(accountsData.slice(0,10)));
            accountsFeaturesCard.flxNoFilterResults.setVisibility(false);
          } else {
              // filtering of data
              dataToShow = accountsData.filter(function(rec) {
                  if (selType.indexOf(rec[colName]) >= 0) {
                      return rec;
                  }
              });
              this.paginationDetails.currSegContractData[1] = dataToShow;
              // should retain header
              if(dataToShow.length > 0) {
                // we only set first 10 values in the segment                
                var sectionData = [ headerData , dataToShow.slice(0,10)];
                
                accountsFeaturesCard.segAccountFeatures.setData([sectionData]);
                accountsFeaturesCard.flxNoFilterResults.setVisibility(false);
              } else {
                this.paginationDetails.currSegContractData[1] = [];
                accountsFeaturesCard.segAccountFeatures.setData([headerData]);
                accountsFeaturesCard.flxNoFilterResults.setVisibility(true);
              }
          }
      } else {
        this.paginationDetails.currSegContractData[1] = [];
        accountsFeaturesCard.segAccountFeatures.setData([headerData]);
        accountsFeaturesCard.flxNoFilterResults.setVisibility(true);
          // no filter
          // filter and set to segment   
      }
      let datLen = this.paginationDetails.currSegContractData[1].length;
      if (datLen > 10) {
        this.paginationActionsForAcct(accountsFeaturesCard, accountsFeaturesCard.segAccountFeatures, datLen);
      }
      this.view.forceLayout();
    }.bind(this);
    self.view.forceLayout();
  },
  /*
  * filter the accounts based on the status selected
  */
  performAccountsStatusFilter : function(){
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.completeCompanyDetails.accountContext;
    var segStatusData = self.view.accountStatusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.accountStatusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if(indices){
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.accountStatusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.setCompanyAccounts(allData);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.StatusDesc) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setCompanyAccounts(dataToShow);
        } else {
          self.setCompanyAccounts([]);
        }
      }
    } else{
      self.setCompanyAccounts([]);
    }
      
  },
  /*
  * set business types to listbox on create/edit company screen
  */
  setBusinessTypesListBoxData: function (list) {
    var attributeList = [];
    attributeList = list.reduce(
      function (list, record) {
        if(record.Default_group){
          list.push([record.BusinessType_id, record.BusinessType_name]);
        } 
        return list;
      }, [["select", "Select a Business Type"]]);
    this.view.lstBoxCompanyDetails12.masterData = attributeList;
    this.view.lstBoxCompanyDetails12.selectedKey = "select";
    this.view.lstBoxCompanyDetails12.info = {"allData":list};
    this.view.forceLayout();
  },
  editSignatoryOrUser: function () {
    var scopeObj = this;
    var index = scopeObj.view.segCompanyDetailCustomer.selectedRowIndex[1];
    var data = scopeObj.view.segCompanyDetailCustomer.data;
    var customerEditContext = data[index].customerEditInfo;
    customerEditContext["inAuthorizedSignatoriesUi"] = scopeObj.inAuthorizedSignatoriesUi;
    customerEditContext["isAccountCentricConfig"]=scopeObj.isAccountCentricConfig;
    scopeObj.presenter.navigateToEditCustomerScreen(customerEditContext);
  },

  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
    this.mouseXCoordinate=context.screenY;
  },
  showEditTooltip : function(widget,context){
    var self=this;
    if (widget) { 
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER ) {
        self.view.EditToolTip.top=self.mouseYCoordinate-400+self.view.flxCompanyDetails.contentOffsetMeasured.y+"px";
        self.view.EditToolTip.setVisibility(true);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE){
        self.view.EditToolTip.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view.EditToolTip.setVisibility(false);
      }
    }
    self.view.forceLayout();
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
  /*
   * function to remove a selected tag
   * @param : selectedflex id
   */
  removeTag: function(tagParentFlex,id) {
    //remove the flex tag
    for(let x=0;x<tagParentFlex.info.added.length;x++){
      if(tagParentFlex.info.added[x][1]===id)
        tagParentFlex.info.added.splice(x,1);
    }    
    tagParentFlex.removeAll();
    var addedCount=tagParentFlex.info.added.length;
    var addedCustomers=tagParentFlex.info.added;
    tagParentFlex.info.added=[];
    for (var x=0;x<addedCount;x++){
      this.addCustomerTag(tagParentFlex,addedCustomers[x][0],addedCustomers[x][1]);
    }
    this.view.forceLayout();
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
    var featuresSegData = featureData.map(function(rec){
      var segRowData = [];
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
        "lblCountActions":{"text":rec.actions.length},
        "lblSectionCheckbox":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
         "lblCheckboxOptions":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
        "lblTotalActions":"of "+rec.actions.length,
        "featureData":rec,
        "template":"flxContractEnrollFeaturesEditSection"
      };
      var selectedActionsCount=0;
      var dependentActions=[];
      for(var i=0;i < rec.actions.length; i++){
        var mappedRowObj ={};
        dependentActions=[];
       // var actionImg=this.AdminConsoleCommonUtils.checkboxSelectedlbl;
        var actionlbl=self.AdminConsoleCommonUtils.checkboxSelectedlbl;
        if(rec.actions[i].isEnabled !== undefined){
          //actionImg=rec.actions[i].isEnabled==="true"?this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxnormallbl;
           actionlbl=rec.actions[i].isEnabled==="true"?self.AdminConsoleCommonUtils.checkboxSelectedlbl:self.AdminConsoleCommonUtils.checkboxnormallbl;
        }
        if(actionlbl===self.AdminConsoleCommonUtils.checkboxSelectedlbl)
          selectedActionsCount++;
        if(rec.actions[i].dependentActions&&rec.actions[i].dependentActions.length>0){
          if(typeof rec.actions[i].dependentActions==="string")//as we are getting string format in edit flow and object format in create flow
            dependentActions=(rec.actions[i].dependentActions.substring(1,rec.actions[i].dependentActions.length-1)).split(",");
          else
            dependentActions=rec.actions[i].dependentActions.map(function(rec){return rec.id});
        }
        mappedRowObj = {
          "id":rec.actions[i].id||rec.actions[i].actionId,
          "isRowVisible": false,
          "dependentActions":dependentActions,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false},
          "flxFeatureNameCont":{"isVisible":true},
           "lblCheckbox":{"isVisible":true,"text":actionlbl,"skin":self.applyCheckboxSkin(actionlbl)},
          "flxCheckbox":{"onClick":self.onClickFeaturesRowCheckbox.bind(self,segmentPath)},
          "lblFeatureName":{"text":rec.actions[i].name||rec.actions[i].actionName},
          "lblStatus":{"text":rec.actions[i].actionStatus === "SID_ACTION_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
          "lblIconStatus":{"skin":rec.actions[i].actionStatus === "SID_ACTION_ACTIVE"?"sknFontIconActivate":"sknfontIconInactive"},
          "template":"flxContractEnrollFeaturesEditRow",
        };
        mappedRowObj.lblCheckbox.skin = self.applyCheckboxSkin(mappedRowObj.lblCheckbox);
        segRowData.push(mappedRowObj);
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
              if(actionIds.includes(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId))
              this.createContractRequestParam.contractCustomers[j].features[k].actions[l].isEnabled=isActionEnabled;
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
            if(updatedActionIds.includes(this.createContractRequestParam.contractCustomers[j].features[k].actions[l].actionId))
              this.createContractRequestParam.contractCustomers[j].features[k].actions[l].isEnabled=isActionEnabled;
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
      "lblCountActions":{"text":feature.actions.length<10?"0"+feature.actions.length:feature.actions.length},
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
          "flxCustomerName":{"onClick":function(){
            if(componentName==="customersDropdownLimits"&&self.view.flxClearContractLimitsSearch.isVisible){
              self.updateLimitValues();
            }
            self.setSelectedText(componentName);
            self.setCustSelectedData(componentName,false);
          }},
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
    this.view[componentName].lblSelectedValue.text=kony.i18n.getLocalizedString("i18n.contracts.selectACustomer");
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
    this.view[componentName].flxSegmentList.setVisibility(false);
    this.view[componentName].btnPrimary.setVisibility(false);
    this.view.forceLayout();
  },
 /* isValidSelection : function(){
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
  },*/
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
    //searchExistingUserRelatedCustomer 
  searchExistingUserDropDownList : function(){
    var segData=this.view.segExistingUserListContainer.info.records;
    var searchText= this.view.searchExistingUserRelatedCustomer.tbxSearchBox.text;
    var custName="";
    var custId="";
    var searchResults=segData.filter(function(rec){
      custName=rec.lblExistingUserName.text.toLowerCase();
      custId=rec.lblExistingUserCustId.text.toLowerCase();
      if(custName.indexOf(searchText)>=0 || custId.indexOf(searchText)>=0)
        return rec;
    });    
    this.view.segExistingUserListContainer.setData(searchResults);
    if(searchResults.length===0){
      this.view.segExistingUserListContainer.setVisibility(false);
      this.view.flxNoResultsFoundExisting.setVisibility(true);
    }else if(this.view.flxNoResultsFoundExisting.isVisible){
      this.view.segExistingUserListContainer.setVisibility(true);
      this.view.flxNoResultsFoundExisting.setVisibility(false);
    }
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
  * set data and assign actions to the newly created row
  * @param: new row widget path, option (features:1,limits:2)
  */
  setNewFeatureLimitRowData : function(newRowWidget, option){
    var self=this;
    var allRows = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
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
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(false);
    else
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
    newRowWidget.lblFieldValue12.text="Select an action";
    newRowWidget.flxDelete.onClick = this.deleteAddNewFeatureRow.bind(this,newRowWidget);
    this.setFeatureLimitRowUI(option,newRowWidget);
    this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.addAt(newRowWidget, allRows.length);
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
        featureActions=allBulkFeatures[selectedFeatureId].actions;
      }else{
        featureActions = allBulkFeatures[selectedFeatureId].actions.filter(function(item) {
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
      for(let i=0;i<feature.actions.length;i++){
        if(feature.actions[i].actionId===segData[selectedIndex].actionId)
          self.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey].actions[i].isChecked=(segData[selectedIndex].imgCheckBox.src===self.AdminConsoleCommonUtils.checkboxnormal)?false:true;
      }      
      self.view.forceLayout();
  },
   /*
  * remove the new row added in bulk update for features
  * @param: widget to remove path
  */
  deleteAddNewFeatureRow : function(widgetPath,option){
    var delRowSelection = widgetPath.lstBoxFieldValue11.selectedKeyValue;
    this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.remove(this.view.bulkUpdateFeaturesPopupForAddUser[widgetPath.id]);
    this.view.bulkUpdateFeaturesPopupForAddUser.remove(this.view.bulkUpdateFeaturesPopupForAddUser[widgetPath.id]);
    var addedRows = this.view.bulkUpdateFeaturesPopupForAddUser.flxAddNewRowListCont.widgets();
    if(addedRows.length === 1){
      addedRows[0].flxDelete.isVisible = false;
    }
   
    this.updateExistingRowsListboxDataAddUser({"id":""},option,"enroll");
    this.view.bulkUpdateFeaturesPopupForAddUser.btnAddNewRow.setVisibility(true);
  },
  /*
  * update previous rows listbox data on addition of new row
  * @param: current row path
  */
  updateExistingRowsListboxData : function(currRowPath){
    var currRowData;
    var allRows = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
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
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(false);
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
    for (var i = 0; i < self.bulkUpdateAllFeaturesList.length; i++) {
      if (data.contains(self.bulkUpdateAllFeaturesList[i].featureId)) {
        finalList.push([self.bulkUpdateAllFeaturesList[i].featureId,self.bulkUpdateAllFeaturesList[i].featureName]);
      }
    }
    }else{
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
      "flxCheckBox":{"onClick":function(){self.toggleBulkCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave);}},
      "lblCheckbox": { "isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox" },
      "lblCustomerId":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID")},
      "lblCustomerName":{"text":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerName_UC")},
      "lblSeparator":{"skin":"sknLblSeparator696C73","isVisible":true}
    }
    for (var x = 0; x < customers.length; x++) {
      if (customers[x].isSelected === true) {
        rowsData.push({
          "template": "flxsegCustomersList",
          "flxCheckBox": { "onClick": function () { self.toggleCustomerCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave,"coreCustomerId"); } },
          "lblCheckbox": { "isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox" },
          "lblCustomerId": { "text": customers[x].coreCustomerId },
          "lblCustomerName": { "text": customers[x].coreCustomerName },
          "lblSeparator": { "skin": "sknLblSeparatore7e7e7", "isVisible": true },
          "custInfo": customers[x]
        });
      }
    }
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.widgetDataMap=dataMap;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([[secData,rowsData]]);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info={"selectedCust":[]};
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
      this.view.lblCountUsers.text=this.getTwoDigitNumber(selCount+1);
      segData[0][0].lblCheckbox.text=(selCount+1===segData[0][1].length)?this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxPartiallbl;
      segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      segData[0][1][selIndex].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][1][selIndex].lblCheckbox);
      segmentPath.info.selectedCust.push(segData[0][1][selIndex].custInfo);
    }else{
      this.view.lblCountUsers.text=this.getTwoDigitNumber(selCount-1);
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
            "accounts":[],
            "features":[],
            "isVisited":true
          });
        }
      }
    //this.presenter.getCoreCustomerAccounts({"coreCustomerIdList":coreCustomerIdList});
      var serviceDefId=this.view[this.selectedServiceCard].lblCategoryName.info.catId;
      //this.presenter.getServiceDefinitionFeaturesAndLimits({"serviceDefinitionId":serviceDefId});
    var inputPayload = {
        "accountsPayload": {"coreCustomerIdList":coreCustomerIdList},
        "featuresPayload": {"serviceDefinitionId":serviceDefId}
      }
      this.presenter.fetchAccountsSDFeaturesLimits(inputPayload);
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
      fetchFeaturesFlag =(this.completeCompanyDetails.accountsFeatures===null)? true : false;
      var inputParam = {};
      if(fetchAccFlag)
        inputParam["accountsPayload"] = {"coreCustomerIdList":coreCustomerIdList};
      if(fetchFeaturesFlag)
        inputParam["featuresPayload"] = {"id":this.completeContractDetails.id,"legalEntityId":this.completeContractDetails.legalEntityId, "action":"edit"};
      this.presenter.fetchAccountsContractFeaturesLimits(inputParam);
      if(this.completeCompanyDetails.accountsFeatures===null){
      } else{
        this.storeIntialContractFeatures(this.completeCompanyDetails.accountsFeatures.features);
        this.setEditContractFeaturesLimits();
         }
    }
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
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.removeAll();
    var customers=[];
    for (var i=0;i<selectedCustData[0][1].length;i++){
      if(selectedCustData[0][1][i].lblCheckbox.text==="\ue965")
      	this.addCustomerTag(this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer,selectedCustData[0][1][i].lblCustomerName.text,selectedCustData[0][1][i].lblCustomerId.text);
    }
    this.view.forceLayout();
  },
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
      "zipcode":this.view.textBoxEntry33.tbxEnterValue.text
    };
    this.view.flxLoading2.setVisibility(true);
    this.presenter.searchCoreCustomers(searchRequest);
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
    this.presenter.getRelatedCoreCustomers({"coreCustomerId" : id});
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
//     if(this.view.flxCustomerSearchPopUp.isVisible){
//       this.view.flxCustomerSearchPopUp.setVisibility(false);
//     }
    
    this.view.flxContractDetailsPopup.setVisibility(true);
    this.view.contractDetailsPopup.showBackButton(showBackButton);
    this.view.contractDetailsPopup.setDataForPopup(details);
    this.view.forceLayout();

  },
  updateFeatureLimitsBulkChanges : function(){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var featureId="";
    var actionIds=[];
    var isEnable=false;
    var bulkUpdateList=[];
    var typeValue=this.getSelectedType();
    var selectedCust=this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added;
    var limitVal=this.view.tbxValue21
    var selectedCustIds=[];
    var isFeatures=this.view.flxContractFA.isVisible;
    var dependentActions=[];
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
            if(isFeatures){
              //To check dependent actions in bulk update permissions
              for(let j=0;j<selItems[i].dependentActions.length;j++){
                if(!actionIds.includes(selItems[i].dependentActions[j].trim()))
                  actionIds.push(selItems[i].dependentActions[j].trim());
              }
            }
          }
        }
      }
      if(actionIds.length>0){
      if(isFeatures){
        bulkUpdateList.push({"featureId":featureId,"actionIds":actionIds,"isEnable":typeValue==="enable"?"true":"false"});
      }else{
        bulkUpdateList.push({"featureId":featureId,"actionIds":actionIds,"limitId":typeValue,"limitVal":rowsList[i].tbxValue21.text});
      }
      }
    }
    for(var a=0;a<this.createContractRequestParam.contractCustomers.length;a++){
      if(selectedCustIds.includes(this.createContractRequestParam.contractCustomers[a].coreCustomerId)){
        for(var b=0;b<this.createContractRequestParam.contractCustomers[a].features.length;b++){
          for(let x=0;x<bulkUpdateList.length;x++){
            if(this.createContractRequestParam.contractCustomers[a].features[b].featureId===bulkUpdateList[x].featureId){
              for(var c=0;c<this.createContractRequestParam.contractCustomers[a].features[b].actions.length;c++){
                if(bulkUpdateList[x].actionIds.includes(this.createContractRequestParam.contractCustomers[a].features[b].actions[c].actionId)){
                  this.updateBulkRequestParam(a,b,c,isFeatures,bulkUpdateList[x]);
                }
              }
            }
          }
        }
      }
    }
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    if(isFeatures){
      this.view.customersDropdownLimits.lblSelectedValue.info={"id":selectedCustIds[0]};
      this.setSelectedText("customersDropdownFA",selectedCustIds[0]);
      this.setCustSelectedData("customersDropdownFA",false);
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.contracts.FeatureBulkUpdateMsg"), this);
    }
    else{
      this.view.customersDropdownLimits.lblSelectedValue.info={"id":selectedCustIds[0]};
      this.setSelectedText("customersDropdownLimits",selectedCustIds[0]);
      this.setCustSelectedData("customersDropdownLimits",false);
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.contracts.LimitsBulkUpdateMsg"), this);
    }
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
    var selectedCust=this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added;
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
  validateBulkSelection : function(){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
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
  getSelectedAccFeaturesCount : function(data){
    var selCount = 0;
    for(var i=0; i<data.length; i++){
      var actionsArr = data[i].actions || data[i].permissions;
      for(var j=0;j<actionsArr.length;j++){
      if(actionsArr[j].isEnabled === "true"||actionsArr[j].isEnabled ===true){
        selCount  = selCount +1;
        break;
      }
      }
    }
    if(selCount > 9 || selCount === 0)
      return selCount;
    else
      return "0"+selCount;
  },
  /*
  * fetch contract approval matrix data
  * @param: {"contractId":"","cif":""}
  */
  fetchContractApprovalMatrix : function(){
    this.setCustomerDropdownAM(this.completeContractDetails.contractCustomers);
    var reqParam1 = {"contractId": this.completeContractDetails.id, "cif": this.view.customerDropdownAM.lblSelectedValue.info.selectedId};
    this.presenter.getApprovalMatrixByCif(reqParam1,false, null,true);
  },
  /*
  * show approval matrix tab of contract
  * @param: approval matrix data
  */
  showApprovalMatrixTab : function(approvalsData){
    this.view.flxApprovalMatrixCardCont.setVisibility(true);
    this.view.flxNoResultMessage.setVisibility(false);
    this.view.flxCompanyDetailsApprovalMatrix.setVisibility(false);
    this.view.customerDropdownAM.flxSelectedText.skin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.customerDropdownAM.flxSelectedText.hoverSkin = "sknFlxBorder117eb0radius3pxbgfff";
    this.view.accountsDropdownAM.flxSelectedText.skin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.accountsDropdownAM.flxSelectedText.hoverSkin = "sknFlxBorder117eb0radius3pxbgfff";
    this.view.customerDropdownAM.info={"type":1, "customerLevelInfo":{}};
    this.view.accountsDropdownAM.info={"type":2,"acccountLevelInfo":{}};
    this.onConfigRadioBtnClick(2);
    this.view.forceLayout();
  },
  /*
  * on click of config dropdown radiobuttons
  * @param: radio button option
  */
  onConfigRadioBtnClick : function(option){
    if(option === 1){ //users
      this.view.imgRadioButtonAM1.src = this.AdminConsoleCommonUtils.radioSelected;
      this.view.imgRadioButtonAM2.src = this.AdminConsoleCommonUtils.radioNotSelected;   
    } else if(option === 2){ //signatory groups
      this.view.imgRadioButtonAM1.src = this.AdminConsoleCommonUtils.radioNotSelected;
      this.view.imgRadioButtonAM2.src = this.AdminConsoleCommonUtils.radioSelected;
    }
    this.view.forceLayout();
  },
  /*
  * get the slected config type for approval matrix
  * @return : selected option({"id":"",""value":""})
  */
  getSelectedApprovalConfigValue : function(){
    if(this.view.imgRadioButtonAM1.src === this.AdminConsoleCommonUtils.radioSelected){
      return {"id":this.approvalConfigType.USER,"value": kony.i18n.getLocalizedString("i18n.permission.Users")};
    } else if (this.view.imgRadioButtonAM2.src === this.AdminConsoleCommonUtils.radioSelected){
      return {"id":this.approvalConfigType.SIGNATORY_GROUP,"value":kony.i18n.getLocalizedString("i18n.frmCompanies.SignatoryGroups_LC")};
    }
  },
   /*
  * view approval matrix of customer 
  * @param: create dynamic features(true/false), approvalmatrix Data
  */
  showApprovalMatrixCustomerLevel : function(createCard, approvalData){
    this.showThreeColumnsInCardAM();
    this.view.flxCompanyDetailsApprovalMatrix.setVisibility(true);
    this.view.flxDynamicWidCustLevelAM.setVisibility(true);
    this.view.flxDynamicWidAccLevelAM.setVisibility(false);
    this.view.flxSelectionSearchContAM.setVisibility(true);
    this.view.flxNoApprovalsCont.setVisibility(false);
    this.view.searchBoxAM.tbxSearchBox.text = "";
    this.view.searchBoxAM.flxClearSearch.setVisibility(false);
    this.view.flxAccountsBackAM.setVisibility(false);
    this.view.flxApprovalSwitch.setVisibility(true);
    this.view.customerDropdownAM.setVisibility(true);
    this.view.accountsDropdownAM.setVisibility(false);
    this.view.lblCardNameAM.skin = "sknLbl117EB0LatoReg14px";
    this.view.lblCardNameAM.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
    this.view.flxHeadingRightContainerAM.setVisibility(true);
    this.view.lblAMHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
    this.view.lblAMHeading2.text = "TAX ID & ADDRESS"
    this.view.lblAMHeading3.text = kony.i18n.getLocalizedString("i18n.frmComapnies.APPROVALS_CONFIGURED");
   // this.view.lblAMHeading4.text = kony.i18n.getLocalizedString("i18n.frmComapnies.APPROVALS_CONFIGURED");
    this.view.lblCustDropdownHeadingAM.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ViewByCustomer");
    if(approvalData){
      var formattedApprovalsData = this.getApprovalsForCustomerLevel(approvalData);
      if(formattedApprovalsData.length > 0){
        if(createCard === true){
          this.dropdownListSelection(1);
        }
      } else{
        this.view.flxNoApprovalsCont.setVisibility(true);
        this.view.flxApprovalMatrixCardCont.setVisibility(false);
        this.view.flxSelectionSearchContAM.setVisibility(false);
      }   
    }
    //no approval matrix available
    if((approvalData === null || approvalData === undefined) && createCard === true){
      this.view.flxCompanyDetailsApprovalMatrix.setVisibility(false);
      this.view.flxNoResultMessage.setVisibility(true);
    }
     
  },
  /*
  * view approval matrix of customer at account level
  * @param: create dynamic features(true/false), approvals data for acc level
  */
  showApprovalMatrixAccountLevel : function(createCard,approvalsAccData){
    this.showThreeColumnsInCardAM();
    this.view.searchBoxAM.tbxSearchBox.text = "";
    this.view.searchBoxAM.flxClearSearch.setVisibility(false);
    this.view.flxDynamicWidCustLevelAM.setVisibility(false);
    this.view.flxDynamicWidAccLevelAM.setVisibility(true);
    this.view.flxAccountsBackAM.setVisibility(true);
    this.view.flxApprovalSwitch.setVisibility(false);
    this.view.customerDropdownAM.setVisibility(false);
    this.view.accountsDropdownAM.setVisibility(true);
    this.view.lblCardNameAM.skin = "sknLbl192B45LatoRegular14px";
    this.view.lblCardNameAM.hoverSkin = "sknLbl192B45LatoRegular14px";
    this.view.flxPrimaryTagAM.setVisibility(false);
    this.view.flxHeadingRightContainerAM.setVisibility(false);
    this.view.accountsDropdownAM.flxSegmentList.setVisibility(false);
    this.view.accountsDropdownAM.text=this.view.accountsDropdownAM.flxSegmentList.isVisible?"":"";
    this.view.lblAMHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE");
    this.view.lblAMHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME");
    this.view.lblAMHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE");
    this.view.lblSelectedCustAM.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.SelectedCustomer")+":";
    this.view.lblCustDropdownHeadingAM.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ViewByAccount");
    if(approvalsAccData){
      this.setAccountDropdownAM(approvalsAccData);
      if(createCard === true){
        this.dropdownListSelection(2);
      }
    }
    this.view.forceLayout();
  },
  /*
   * show 3 column division for details part
   */
  showThreeColumnsInCardAM : function(){
    this.view.flxAMColumn4.setVisibility(false);
    this.view.flxAMColumn1.width = "29%";
    this.view.flxAMColumn2.width = "29%";
    this.view.flxAMColumn3.width = "29%";
  },
  /*
   * show 4 column division for details part
   */
  showFourColumnsInCardAM : function(){
    this.view.flxAMColumn4.setVisibility(true);
    this.view.flxAMColumn1.width = "22.5%";
    this.view.flxAMColumn2.width = "22.5%";
    this.view.flxAMColumn3.width = "22.5%";
    this.view.flxAMColumn4.width = "22.5%";
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
  /*
  * set pproval matrix toggle switch enable/disable
  * @param: disabled flag("true"/"false")
  */
  setCustApprovalMatrixSwitch : function(isDisabled){
    this.view.switchToggleAM.selectedIndex = isDisabled === "false" ? 0 : 1;
  },
  /*
  * set data to customers dropdown in approval matrix
  * @param: array of customer approvals data
  */
   setCustomerDropdownAM : function(customersData){
    var customerInfo = {},accountsInfo={}, dropdownSegData = [];
    var widgetMap={
      "id":"id",
      "type":"type",
      "flxCustomerName":"flxCustomerName",
      "flxCustomerNameCont":"flxCustomerNameCont",
      "lblCustomerName":"lblCustomerName",
      "btnPrimaryCustomers":"btnPrimaryCustomers"
    };
    var maxLengthText = "",selectedCustObj = {};
    var dropdownSegData = customersData.map(function(rec){
      customerInfo[rec.cifId ||rec.coreCustomerId ] = {};
      var customerLbl =rec.coreCustomerName +" ("+ (rec.coreCustomerId||"") +")";
      if(customerLbl.length > maxLengthText.length)
          maxLengthText= customerLbl;
      if(rec.isPrimary === "true"){
        selectedCustObj["name"] = customerLbl;
        selectedCustObj["id"] = rec.coreCustomerId;
        selectedCustObj["isPrimary"] = rec.isPrimary === "true" ? true : false;
      }
      return{
        "id":rec.coreCustomerId,
        "type":"customer",
        "flxCustomerName":"flxCustomerName",
        "flxCustomerNameCont":"flxCustomerNameCont",
        "lblCustomerName":{"text": customerLbl},
        "btnPrimaryCustomers":{"isVisible":rec.isPrimary === "true" ? true : false}
      };
    });
    var maxTextWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxLengthText,"13px Lato-Regular");
    var dropdownWidth = maxTextWidth+15+15+70+15;
    this.view.customerDropdownAM.flxSegmentList.width = dropdownWidth < 325? "325dp" :dropdownWidth +"dp";
    this.view.customerDropdownAM.segList.widgetDataMap = widgetMap;
    this.view.customerDropdownAM.segList.setData(dropdownSegData);
    this.view.customerDropdownAM.segList.info={"records":dropdownSegData};
     this.view.customerDropdownAM.info.customerLevelInfo = customerInfo;
     var truncatedText = this.AdminConsoleCommonUtils.getTruncatedString(selectedCustObj.name,selectedCustObj.isPrimary?30:40,selectedCustObj.isPrimary?30:40)
     this.view.customerDropdownAM.lblSelectedValue.text = truncatedText;
     this.view.customerDropdownAM.btnPrimary.isVisible = selectedCustObj.isPrimary;
     this.view.customerDropdownAM.lblSelectedValue.info = {"selectedId":selectedCustObj.id,"selectedName":selectedCustObj.name.split(" (")[0]};
     this.view.accountsDropdownAM.info.acccountLevelInfo = {};
     this.view.forceLayout();
  },
  /*
  * set data to acounts dropdown in account view of approval matrix
  * @param: array of accounts for selected customer
  */
  setAccountDropdownAM : function(accLevelApprovals){
    var self = this;
    var accountsList = accLevelApprovals || [];
    var widgetMap={
      "id":"id",
      "type":"type",
      "flxCustomerName":"flxCustomerName",
      "flxCustomerNameCont":"flxCustomerNameCont",
      "lblCustomerName":"lblCustomerName",
      "btnPrimaryCustomers":"btnPrimaryCustomers"
    };  
   var maxLengthText = "";
    var dropdownSegData = accountsList.map(function(rec){
      var accountLbl =rec.accountName +" ("+ rec.accountId +")";
      if(accountLbl.length > maxLengthText.length)
          maxLengthText= accountLbl;
      return{
        "id":rec.accountId,
        "type":"account",
        "flxCustomerName":"flxCustomerName",
        "flxCustomerNameCont":"flxCustomerNameCont",
        "lblCustomerName":{"text": accountLbl},
        "btnPrimaryCustomers":{"isVisible":false}
      };
    });
    var maxTextWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxLengthText,"13px Lato-Regular");
    this.view.accountsDropdownAM.flxSegmentList.width = maxTextWidth < 295 ? "325dp" :(maxTextWidth+15+15) +"dp";
    this.view.accountsDropdownAM.segList.widgetDataMap =widgetMap;
    this.view.accountsDropdownAM.segList.setData(dropdownSegData);
    this.view.accountsDropdownAM.segList.info.records = dropdownSegData;
    this.view.lblSelectedCustValueAM.text = this.view.customerDropdownAM.lblSelectedValue.info.selectedName + " (" +
      this.view.customerDropdownAM.lblSelectedValue.info.selectedId +")";
    this.view.forceLayout();
  },
  /*
  * on selecting option from dropdown list in approval matrix
  * @param: dropdown category(1: cust,2,acc)
  */
  dropdownListSelection : function(dropdownCat){
    var dropdownWidgetPath = dropdownCat === 1 ? this.view.customerDropdownAM : this.view.accountsDropdownAM ;
    var selRowInd =  dropdownWidgetPath.segList.selectedRowIndex;
    if(dropdownCat === 1 && dropdownWidgetPath.lblSelectedValue.info &&
       (selRowInd ===null ||selRowInd === undefined)){
      var selInfoId = dropdownWidgetPath.lblSelectedValue.info.selectedId;
      for(let i=0; i<dropdownWidgetPath.segList.data.length; i++){
        if(dropdownWidgetPath.segList.data[i].id === selInfoId){
          selRowInd = [0,i];
        }
      }
    }
    selRowInd = selRowInd  || [0,0];
    var selRowData = selRowInd ? dropdownWidgetPath.segList.data[selRowInd[1]] :"";
    var selectedCust = selRowData.lblCustomerName.text;
    this.setDropdownLabelTextAM(dropdownWidgetPath,selRowData.lblCustomerName.text.split(" (")[0],selRowData.id,selRowData.btnPrimaryCustomers.isVisible );
    dropdownWidgetPath.lblSelectedValue.info = {"selectedId":selRowData.id,"selectedName":selRowData.lblCustomerName.text.split(" (")[0],"isPrimary":selRowData.btnPrimaryCustomers.isVisible};
    //on selecting from customer dropdown
    if(dropdownCat === 1){
      //get is approval matrix enabled/disabled
      this.presenter.isApprovalMatrixDisabled({"contractId":this.completeContractDetails.id,"cif":selRowData.id});
      var custApprovalsData = this.view.customerDropdownAM.info.customerLevelInfo ?
          this.view.customerDropdownAM.info.customerLevelInfo[selRowData.id] : {};
      if(custApprovalsData){
        var configOption = custApprovalsData && custApprovalsData.approvalMode === "0" ? 1 : 2;
        this.onConfigRadioBtnClick(configOption);
        this.setCustomerDetailsForApprovalCard();
        this.createDynamicFeatureCardsCustAM(custApprovalsData);
        this.view.flxApprovalMatrixCardCont.setVisibility(true);
        this.view.flxNoApprovalsCont.setVisibility(false);
      } else{
        this.view.rtxNoApprovalsAvailable.text = "No records available for selected customer";
        this.view.flxApprovalMatrixCardCont.setVisibility(false);
        this.view.flxNoApprovalsCont.setVisibility(true);
      }
      this.view.forceLayout();
    } //on selecting from accounts dropdown
    else if (dropdownCat === 2){
      var custId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
      var allAccData = this.view.accountsDropdownAM.info.acccountLevelInfo ? this.view.accountsDropdownAM.info.acccountLevelInfo[custId] : [];
      var accApprovalsData;
      for(var j=0; j<allAccData.length; j++){
        if(allAccData[j].accountId === selRowData.id){
          accApprovalsData = allAccData[j];
          break;
        }
      }
      this.createDynamicFeatureCardsAccAM(accApprovalsData);
    }
    this.view.searchBoxAM.flxClearSearch.setVisibility(false);
    this.view.searchBoxAM.tbxSearchBox.text = "";
  },
  setDropdownLabelTextAM : function(dropdownWidgetPath,name,id,isPrimary){
    var nameIdVal = name+" ("+id+")";
    var truncatedText = this.AdminConsoleCommonUtils.getTruncatedString(nameIdVal,isPrimary?30:40,isPrimary?30:40)
    dropdownWidgetPath.lblSelectedValue.text = truncatedText;
    dropdownWidgetPath.btnPrimary.isVisible = isPrimary;
  },
  /*
  * get approvals formatted with customer,account data
  * @param:approval list
  * @returns: array of customers with formatted features at cust,acc levels
  */
  getApprovalsForCustomerLevel: function(approvalsData){
    var customers = approvalsData.cif;
    var customerLevelApprovals = [];
    if(approvalsData.common){
      var limitTypes = approvalsData.common ? approvalsData.common.limitTypes : [];
      var features = this.getFormattedApprovalFeaturesAM(limitTypes);
      var customerObj = {
        "cifId": approvalsData.cifId,
        "coreCustomerId": approvalsData.cifId,
        "cifName": approvalsData.cifName || "",
        "taxId": this.contractDetailsMap[approvalsData.cifId].contractTaxId || "",
        "address": this.AdminConsoleCommonUtils.getAddressText(this.contractDetailsMap[approvalsData.cifId].addressLine1, this.contractDetailsMap[approvalsData.cifId].addressLine2) || "",
        "isPrimary": this.contractDetailsMap[approvalsData.cifId].isPrimary,
        "email": this.contractDetailsMap[approvalsData.cifId].email || "",
        "phone": this.contractDetailsMap[approvalsData.cifId].phone || "",
        "industry":this.contractDetailsMap[approvalsData.cifId].industry || "",
        "approvalMode": approvalsData.approvalMode || "1",
        "features": features,
        "accounts": this.getApprovalsForAccountLevel(approvalsData.accounts || [])
      };
      customerLevelApprovals.push(customerObj);
      this.view.customerDropdownAM.info.customerLevelInfo[approvalsData.cifId] = customerObj;
      this.view.accountsDropdownAM.info.acccountLevelInfo[approvalsData.cifId] = customerObj.accounts;
    }
    return customerLevelApprovals;
  },
  /*
  * get approvals formatted for account level
  * @param:accounts list from approvals data
  * @returns: array of accounts with formatted features
  */
  getApprovalsForAccountLevel: function(accounts){
    var  accountsArr =[];;
    for(var i=0;i<accounts.length; i++){
        var currAcc = accounts[i];
        var accountDetails = {
          "accountId":currAcc.accountId,
          "accountName":currAcc.accountName || "",
          "accountType":currAcc.accountType || "",
          "ownershipType":currAcc.ownershipType || "",
        }
        accountDetails["features"] = this.getFormattedApprovalFeaturesAM(currAcc.limitTypes);
        accountsArr.push(accountDetails);
    }
    return accountsArr;
  },
  /*
  * get action-limit types grouped by its feature
  * @param: actions list
  * @returns: features json
  */
  getFormattedApprovalFeaturesAM : function(limitsTypeArr){
    var custFeatureJSON = {},actionObj = {};
    for(var j=0; j<limitsTypeArr.length; j++){
      var actions = limitsTypeArr[j].actions;
      for(var k=0; k< actions.length; k++){
        actionObj = custFeatureJSON[actions[k].featureId] || {};
        actionObj[limitsTypeArr[j].limitTypeId+"#"+actions[k].actionId] = actions[k];
        custFeatureJSON[actions[k].featureId] = actionObj
      }
    }
    return custFeatureJSON;
  },
  /*
  * group the array of actions by feature to form array of features
  * @param: actions list
  * @returns: features array
  */
  groupActionsByFeatureAM : function(actionsList){
    var featuresJson = {};
    for(var i=0;i<actionsList.length; i++){
      var featureObj = {"featureName":actionsList[i].featureName,
                        "featureId":actionsList[i].featureId,
                        "featureStatus":actionsList[i].featureStatus,
                        "actions":[]} ;
      if(featuresJson[actionsList[i].featureId]){
        featuresJson[actionsList[i].featureId].actions.push(actionsList[i]);
      } else{
        featuresJson[actionsList[i].featureId] = featureObj;
        featuresJson[actionsList[i].featureId].actions.push(actionsList[i]);
      }
    }
    var featuresArr = Object.values(featuresJson);
    return featuresArr;
  },
 /*
  * create features card in approval matrix card for selected customer
  * @param: selected customer formated approvals
  */
  createDynamicFeatureCardsCustAM : function(custApprovals){
    this.view.flxDynamicWidCustLevelAM.removeAll();
    var custFeatures = custApprovals.features;
    var featuresKeys = Object.keys(custFeatures);
    this.showLoadingScreen(featuresKeys.length);
    for(var i=0;i<featuresKeys.length;i++){
      var num = i>10 ? i : "0"+i;
      var featureCardToAdd = new com.adminConsole.contracts.approvalMatrixFeatureCard({
        "id": "featureCardCustAM" + num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "left": "0dp",
        "width": "100%",
        "top": "0dp",
      }, {}, {});
      featureCardToAdd.segFeatureActions.info = {"segDataJson":{},"featureActionsJson":custFeatures[featuresKeys[i]]};
      this.view.flxDynamicWidCustLevelAM.add(featureCardToAdd);
      featureCardToAdd.flxToggle.onClick = this.toggleFeatureCardRowAM.bind(this,featureCardToAdd,1);
      this.setFeatureCardDataAM(featureCardToAdd,custFeatures[featuresKeys[i]]);
      this.setActionsSegDataAM(featureCardToAdd,1,custFeatures[featuresKeys[i]]);
    }
    this.view.flxDynamicWidCustLevelAM.setVisibility(true);
    this.view.flxCardBottomContainerAM.setVisibility(true);
    this.view.forceLayout();
  },
  /*
  * create features card in approval matrix card for selected account
  * @param: selected account approval data
  */
  createDynamicFeatureCardsAccAM : function(approvalsData){
    this.view.flxDynamicWidAccLevelAM.removeAll();
    var accLevelFeatures = approvalsData.features ?  approvalsData.features: {};
    var featuresKeys = Object.keys(accLevelFeatures);
    this.showLoadingScreen(featuresKeys.length);
    for(var i=0; i<featuresKeys.length; i++){
      var num = i>10 ? i : "0"+i;
      var featureCardToAdd = new com.adminConsole.contracts.approvalMatrixFeatureCard({
        "id": "featureCardAccAM" +num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "left":"0dp",
        "top": "0dp"
      }, {}, {});
      featureCardToAdd.segFeatureActions.info = {"segDataJson":{},"featureActionsJson":accLevelFeatures[featuresKeys[i]]};
      this.view.flxDynamicWidAccLevelAM.add(featureCardToAdd);
      featureCardToAdd.flxToggle.onClick = this.toggleFeatureCardRowAM.bind(this,featureCardToAdd,2);
      this.setFeatureCardDataAM(featureCardToAdd, accLevelFeatures[featuresKeys[i]]);  
      this.setActionsSegDataAM(featureCardToAdd,2, accLevelFeatures[featuresKeys[i]]);
    }
    this.view.flxDynamicWidAccLevelAM.setVisibility(true);
    this.view.flxCardBottomContainerAM.setVisibility(true);
    //approval card data
    var configType = this.getSelectedApprovalConfigValue().id;
    this.view.lblCardNameAM.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBERColon") + ""+(approvalsData.accountId || kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData1.text = this.getValueOrNull(approvalsData.accountType, kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData2.text = this.getValueOrNull(approvalsData.accountName, kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData3.text = this.getValueOrNull(approvalsData.ownershipType, kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData4.text = configType === this.approvalConfigType.SIGNATORY_GROUP ?
                              kony.i18n.getLocalizedString("i18n.frmCompanies.SignatoryGroups_LC"): kony.i18n.getLocalizedString("i18n.permission.Users");
    this.view.forceLayout();
  },
  /*
  * set customer details in the approval matrix card
  */
  setCustomerDetailsForApprovalCard : function(){
    var selectedCust = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var custDetails = this.view.customerDropdownAM.info.customerLevelInfo[selectedCust];
    this.view.lblCardNameAM.text = this.getValueOrNull(custDetails.cifName,kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData1.text = this.getValueOrNull(custDetails.cifId, kony.i18n.getLocalizedString("i18n.common.NA"));
   // this.view.lblAMData2.text = this.getValueOrNull(custDetails.taxId, kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData2.text = "View";
    this.view.lblAMData2.skin="sknLbl117EB0LatoReg14px";
    this.view.lblAMData2.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
    //this.view.lblAMData3.text = this.getValueOrNull(custDetails.address, kony.i18n.getLocalizedString("i18n.common.NA"));
    this.view.lblAMData3.text = custDetails.approvalMode === "1" ?kony.i18n.getLocalizedString("i18n.frmCompanies.SignatoryGroups_LC"): kony.i18n.getLocalizedString("i18n.permission.Users");
//     this.view.lblAMData4.text = custDetails.approvalMode === "1" ?
//                               kony.i18n.getLocalizedString("i18n.frmCompanies.SignatoryGroups_LC"): kony.i18n.getLocalizedString("i18n.permission.Users");
    this.view.lblAMData2.onTouchStart=this.accountsPopup.bind(this,custDetails.cifId,this.completeContractDetails.legalEntityId);
    this.view.flxPrimaryTagAM.setVisibility(custDetails.isPrimary === "true"); 
  },
  /*
  * set date to the feature card
  * @param: featureCard to add
  */
  setFeatureCardDataAM : function(featureCardToAdd,actionsJson){
    featureCardToAdd.toggleCollapseArrow(false);
    var actionValues = Object.values(actionsJson);
    featureCardToAdd.lblFeatureName.text = actionValues[0].featureName;
    featureCardToAdd.lblFeatureName.info = {"featureId":actionValues[0].featureId};
    featureCardToAdd.lblIconMonetary.text = this.currencyValue;
    featureCardToAdd.lblIconNonMonetary.text = this.currencyValue;
  },
  /*
  * show customer details popup on click of cust name in approval card
  */
  onClickCustNameAM : function(){
    var selCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var custDetails = this.view.customerDropdownAM.info.customerLevelInfo[selCustId];
    let details = {"id": custDetails.cifId,
                   "name": custDetails.cifName,
                   "industry":custDetails.industry,
                   "email":custDetails.email,
                   "phone":custDetails.phone,
                   "address": custDetails.address
                  };
    this.showCustomerDetailsPopup(details,false);
  },
  /*
  * toggle feature card to show/hide actions
  * @param: current featureCard, category(1:cust,2:acc)
  */
  toggleFeatureCardRowAM : function(currFeatureCard, category){
    var parentFlex = category === 1 ? this.view.flxDynamicWidCustLevelAM :
                                 this.view.flxDynamicWidAccLevelAM;
    var featureCards = parentFlex.widgets();
    for(var i=0; i<featureCards.length; i++){
      if(featureCards[i].id === currFeatureCard.id){ //toggle selected card
        var flxVisiblity = currFeatureCard.flxCardBottomContainer.isVisible;
        currFeatureCard.toggleCollapseArrow(!flxVisiblity);
      } else{ //toggle any remaining cards
        if(featureCards[i].flxCardBottomContainer.isVisible === true){
          featureCards[i].toggleCollapseArrow(false);
        }
      }
    }
  },
  /*
  * set monetary/non-monetary count under feature
  * @param: featureCard wid reference, actions array of sel feature
  */
  setFeatureActionTypeCount : function(featureCard,actionsArr){
    var monCount =0, nonMonCount=0;
    for(var i=0; i<actionsArr.length; i++){
      if(actionsArr[i].actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
        monCount = monCount +1;
      }else if(actionsArr[i].actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
        nonMonCount = nonMonCount+1;
      }
    }
    featureCard.lblMonetaryActions.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.MonetaryActions") +":";
    featureCard.lblCountActions1.text = this.getTwoDigitNumber(monCount);
    featureCard.flxMonetaryCount.setVisibility(monCount > 0);
    featureCard.lblNonMonetaryActions.text = kony.i18n.getLocalizedString("i18n.frmComapnies.NonMonetaryActions")+":";
    featureCard.lblCountActions2.text = this.getTwoDigitNumber(nonMonCount);
    featureCard.flxNonMonetaryCount.setVisibility(nonMonCount > 0);
    this.view.forceLayout();
  },
  /*
  * widget data map fro actions listing segment inside feature card
  */
  getWidgetMapForActionSegAM : function(){
    return {
      //section header
      "flxApprovalMatrixActionHeader":"flxApprovalMatrixActionHeader",
      "lblFASeperatorTop":"lblFASeperatorTop",
      "flxActionName":"flxActionName",
      "lblIconAction":"lblIconAction",
      "flxActionIconBg":"flxActionIconBg",
      "lblActionName":"lblActionName",
      "lbxTransactionType":"lbxTransactionType",
      "flxViewApprovalsHeader":"flxViewApprovalsHeader",
      "lblRangeHeader":"lblRangeHeader",
      "lblApprovalRequiredHeader":"lblApprovalRequiredHeader",
      "lblApproversHeader":"lblApproversHeader",
      "lblFASeperator2":"lblFASeperator2",
      "lblFASeperator1":"lblFASeperator1",
      //ranges row template
      "flxApprovalMatrixRangeRow":"flxApprovalMatrixRangeRow",
      "flxApprovalRangeCont":"flxApprovalRangeCont",
      "flxApprRangeValue":"flxApprRangeValue",
      "lblApprovalValue1":"lblApprovalValue1",
      "lblIconApprRangeCurr1":"lblIconApprRangeCurr1",
      "lblApprRangeVal1":"lblApprRangeVal1",
      "lblIconApprRangeCurr2":"lblIconApprRangeCurr2",
      "lblApprRangeVal2":"lblApprRangeVal2",
      "lblApprovalValue2":"lblApprovalValue2",
      "lblApprovalView":"lblApprovalView",
      "lblApprovalNA":"lblApprovalNA",
      "lblLine":"lblLine",
      "flxApprovalEdit":"flxApprovalEdit",
      "lblIconAction":"lblIconAction",
      "flxActionIconBg":"flxActionIconBg",
      //no ranges available template
      "flxApprovalMatrixNoRangeRow":"flxApprovalMatrixNoRangeRow",
      "flxNoRangesCont":"flxNoRangesCont",
      "lblNoApprovalText":"lblNoApprovalText",
      "btnAddApproval":"btnAddApproval",
      //additional
      "actionType":"actionType",
      "viewType":"vewType",
      "id":"id",
      "groupRule":"groupRule",
      "groupList":"groupList",
      "actionData":"actionData",
      "approvers":"approvers",
      "approvalRuleId":"approvalRuleId"
    };
  },
  /*
  * set data to actions segment under each feature
  * @param: feature card ref, category(1:cust,2:acc),actionJson
  */
  setActionsSegDataAM : function(featureCard, category,actionJson){
    var lstbxMasterData = [["MAX_TRANSACTION_LIMIT","Per Transaction"],["DAILY_LIMIT","Daily"],["WEEKLY_LIMIT","Weekly"]];
    var segData = [],actionsSegJson = {};
    var actionsArr = this.getUniqueActionsList(actionJson);
    this.setFeatureActionTypeCount(featureCard,actionsArr);
    for(var i=0; i< actionsArr.length; i++){
      var sectionData = {
        "id": actionsArr[i].actionId,
        "viewType":category,
        "lblFASeperatorTop":"-",
        "actionType":actionsArr[i].actionType,
        "flxActionIconBg":{"skin":actionsArr[i].actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY ? "sknflx1F844DRadius20px": "sknFlxBg9D301BRd20px"},
        "lblIconAction":{"text":this.currencyValue},
        "lblActionName":{"text":actionsArr[i].actionName},
        "lbxTransactionType":{"masterData":lstbxMasterData,
                              "selectedKey":"MAX_TRANSACTION_LIMIT",
                              "isVisible":actionsArr[i].actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY ? true : false,
                              "onSelection":this.onTransactionTypeChangeAM.bind(this,actionJson,featureCard,category)},
        "flxViewApprovalsHeader":{"isVisible":true},
        "lblRangeHeader":"RANGE",
        "lblApprovalRequiredHeader": kony.i18n.getLocalizedString("i18n.frmComapnies.APPROVAL_REQUIRED"),
        "lblApproversHeader": kony.i18n.getLocalizedString("i18n.frmComapnies.APPROVERS"),
        "lblFASeperator2":"-",
        "lblFASeperator1":"-",
        "flxApprovalMatrixActionHeader":{"isVisible":true},
        "actionData": actionsArr[i],
        "template":"flxApprovalMatrixActionHeader"
      };
      var rowsData = [];
      var limitActionId = actionsArr[i].actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY ?
                        "MAX_TRANSACTION_LIMIT"+"#"+actionsArr[i].actionId : "NON_MONETARY_LIMIT"+"#"+actionsArr[i].actionId;
      rowsData = this.getApprovalRangesRowData(actionJson,limitActionId, category,featureCard);
      if(rowsData.length === 1){
        sectionData.flxViewApprovalsHeader.isVisible = (rowsData[0].template === "flxApprovalMatrixNoRangeRow") ? false :true;
      }
      var reqCurrency = (kony.sdk.isNullOrUndefined(actionJson[limitActionId].limits[0].currency))? this.defaultCurrencyCodeSymbol:actionJson[limitActionId].limits[0].currency;
      this.currencyValue = this.currencytoSymbol(reqCurrency);
      sectionData.lblIconAction.text =  this.currencyValue;
      segData.push([sectionData,rowsData]);
      actionsSegJson[actionsArr[i].actionId] = {"secData":sectionData,"rowData":rowsData};
    }
    featureCard.segFeatureActions.widgetDataMap = this.getWidgetMapForActionSegAM();
    featureCard.segFeatureActions.setData(segData);
    featureCard.segFeatureActions.info.segDataJson = actionsSegJson;
    this.view.forceLayout();
  },
  /*
  * set actions segment rows
  * @param: limits actions data, limitActionId ,category(1:cust, 2:acc), featureCard comp ref
  */
  getApprovalRangesRowData : function(actionData,limitActionId,category,featureCard){
    var rowsData = []; 
    var configType = this.getSelectedApprovalConfigValue().id;
    var approvalData = actionData[limitActionId] ? actionData[limitActionId].limits : [];
    var reqCurrency = (kony.sdk.isNullOrUndefined(actionData[limitActionId].limits[0].currency))?'USD':actionData[limitActionId].limits[0].currency;
    this.currencyValue = this.currencytoSymbol(reqCurrency);
    var isNonMon = limitActionId.split("#")[0] === "NON_MONETARY_LIMIT" ? true : false;
    if(approvalData && approvalData.length > 0){
      var isApprovlConfigured = this.checkApprovalsConfigured(approvalData);
      if(isApprovlConfigured === false){
        var rowObj = this.getNoRangesRowTemplate(category,featureCard );
        rowObj.actionType = isNonMon === false ? this.AdminConsoleCommonUtils.constantConfig.MONETARY: this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY;
        rowsData.push(rowObj);
      } else{
        for(var i=0;i<approvalData.length; i++){
          var isApprovalDefined = configType === this.approvalConfigType.SIGNATORY_GROUP ?
              this.checkApprovalRequiredSG(approvalData[i].groupRule) :this.checkApprovalRequiredUser(approvalData[i].approvalRuleId) ;
          var row = {
            "viewType": category,
            "actionType": isNonMon === false ? this.AdminConsoleCommonUtils.constantConfig.MONETARY: this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY,
            "lblIconApprRangeCurr1": {"text": this.currencyValue, "isVisible": false},
            "lblIconApprRangeCurr2": {"text":  this.currencyValue, "isVisible": false},
            "lblApprRangeVal1": {"text":"", "isVisible": false},
            "lblApprRangeVal2": {"text":"", "isVisible": false},
            "lblApprovalValue1": {"text": isNonMon === true ? "-" : "", "isVisible": true,
                                  "info":{"range":[]}},
            "lblApprovalValue2": {"text":isApprovalDefined === true ?
                                  kony.i18n.getLocalizedString("i18n.frmAdManagement.Yes"):kony.i18n.getLocalizedString("i18n.frmAlertsManagement.No")
                                 },
            "lblApprovalView": {"text": "View","isVisible":(isApprovalDefined === true),
                                "onTouchStart":this.showViewApproversListPopup.bind(this,featureCard.id)
                               },
            "lblApprovalNA": {"isVisible":!(isApprovalDefined === true)},
            "lblLine": {"text":"-","bottom":"0dp"},
            "flxApprovalEdit":{"isVisible":false,
                               "onClick": this.onAddApprovalRuleClickAM.bind(this,"EDIT",featureCard)
                              },
            "lblIconAction":{"text":"\ue91e"},
            "template":"flxApprovalMatrixRangeRow",
          };
          if(configType === this.approvalConfigType.SIGNATORY_GROUP){
            row["groupRule"] = approvalData[i].groupRule ? approvalData[i].groupRule :"";
            row["groupList"] = approvalData[i].groupList ? approvalData[i].groupList :"";
          } else{
            row["approvers"] = approvalData[i].approvers || [];
            row["approvalRuleId"] = approvalData[i].approvalRuleId || "";
          }
          var rangeTextArr = isNonMon === false ? this.getApprovalRangeTextFromValue(approvalData[i]) : "-";
          row.lblApprovalValue1.info.range = rangeTextArr;
          if(rangeTextArr[0] === "-" && isNonMon === false){ //between range
            row.lblApprovalValue1.isVisible = false;
            row.lblIconApprRangeCurr1.isVisible = true;
            row.lblIconApprRangeCurr2.isVisible = true;
            row.lblApprRangeVal1.isVisible = true;
            row.lblApprRangeVal2.isVisible = true;
            row.lblApprRangeVal1.text = rangeTextArr[1];
            row.lblApprRangeVal2.text = rangeTextArr[2];
          } else if(isNonMon === false){//upto/above range
            row.lblApprovalValue1.isVisible = true;
            row.lblIconApprRangeCurr1.isVisible = true;
            row.lblIconApprRangeCurr2.isVisible = false;
            row.lblApprRangeVal1.isVisible = true;
            row.lblApprRangeVal2.isVisible = false;
            row.lblApprovalValue1.text = rangeTextArr[0]+" ";
            row.lblApprRangeVal1.text = rangeTextArr[0].indexOf(kony.i18n.getLocalizedString("i18n.frmCompanies.Upto")) >= 0 ? rangeTextArr[2] : rangeTextArr[1];
          }
          rowsData.push(row);
        }
        //adjust edit icon and line
        var index = (rowsData.length%2 === 0) ? (rowsData.length/2)-1 : Math.floor(rowsData.length/2);
        rowsData[index].flxApprovalEdit.isVisible = true;
        rowsData[rowsData.length-1].lblLine.bottom = "10dp";
      }
    } else{
      var row = {};
      row = this.getNoRangesRowTemplate(category,featureCard );
      row.actionType = isNonMon === false ? this.AdminConsoleCommonUtils.constantConfig.MONETARY: this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY;
      rowsData.push(row);
    }
  return rowsData;
  },
  /*
  * get no approval range row mapping
  * @param: category,featureCard reference
  */
  getNoRangesRowTemplate: function(category, featureCard){
    var configType = this.getSelectedApprovalConfigValue().id;
    var row = {
      "viewType":category,
      "actionType":this.AdminConsoleCommonUtils.constantConfig.MONETARY,
      "lblNoApprovalText": {"text": kony.i18n.getLocalizedString("i18n.frmCompanies.NoApprovalRulesMessage")},
      "btnAddApproval":{"text":kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add"),
                        "isVisible": true,
                        "onClick":this.onAddApprovalRuleClickAM.bind(this,"CREATE",featureCard)
                       },
      "flxApprovalEdit":{"isVisible":false},
      "lblLine": {"isVisible":false},
      "template":"flxApprovalMatrixNoRangeRow",
    };
    return row;
  },
  /*
  * on click of add button under action to add approval rules
  * @param:action(create/edit),featureCard reference
  */
  onAddApprovalRuleClickAM : function(action,featureCard,eventObj){
    var featureCardId = featureCard.id;
    var selSec = eventObj.rowContext.sectionIndex;
    var configType = this.getSelectedApprovalConfigValue().id;
    var segSectionData = this.view[featureCardId].segFeatureActions.data[selSec][0];
    var viewType = segSectionData.viewType;
    var isCreateFlow = action === "CREATE" ? true : false;
    if(configType === this.approvalConfigType.USER){ //user config type and  - fetch approvers
      var param = {"contractId": this.completeContractDetails.id || "",
                   "cif": this.view.customerDropdownAM.lblSelectedValue.info.selectedId,
                   "actionId": segSectionData.actionData.actionId || "",
                  };
      if(viewType === 2){
        param["accountId"] = this.view.accountsDropdownAM.lblSelectedValue.info.selectedId;
      }
      var selectedCardInfo = {"action":action,
                              "featureCardId":featureCardId,
                              "eventObj":{"rowContext":eventObj.rowContext}
                             };
      this.presenter.getAccountActionCustomerApproverList(param,selectedCardInfo);
    } else{ //for signatory group config
      this.showAddApprovalRuleScreen(action, featureCardId, eventObj);
    }
  },
  /*
  * group actions based on limit types
  * @param: actionsJson of selected feature
  * @return: {"ACTION_ID":{}}
  */
  getUniqueActionsList : function(actionJson){
    var actions = {};
    var limitAction = Object.keys(actionJson);
    for(var i=0; i<limitAction.length ;i++){
      var actionId = limitAction[i].split("#")[1];
      actions[actionId] = actionJson[limitAction[i]];
    }
    var actionsArr = Object.values(actions);
    return actionsArr;
  },
  /*
  * check if approval rule are configured
  * @param: approvalrules data
  * @return: true/false
  */
  checkApprovalsConfigured: function(approvalData){
    var approvalsConfigured = false;
    var configType = this.getSelectedApprovalConfigValue().id;
    if(approvalData.length === 1){
      if(configType === this.approvalConfigType.SIGNATORY_GROUP){
        var groupRule = approvalData[0].groupRule ? approvalData[0].groupRule.replace(/[\[\]\s]/g, "") : null;
        var groupList = approvalData[0].groupList ? approvalData[0].groupList.replace(/[\[\]\s]/g, "") : null;
        approvalsConfigured = (groupRule === "" && groupList === "")?(false):
        (approvalData[0].approvalRuleId === "NO_APPROVAL" ? false : true);
      } else{
        approvalsConfigured = approvalData[0].approvalRuleId === "NO_APPROVAL" ? false : true;
      }
    } else if(approvalData.length > 1){
      approvalsConfigured = true;
    }
    return approvalsConfigured;
  },
  /*
  * check if approval rule is defined at signatory group level
  * @param: grouprule ("[[0,1][0,0]]")
  * @return: true/false
  */
  checkApprovalRequiredSG : function(groupRule){
    var formatRuleArr = groupRule ? groupRule.replace(/[\[\]\s]/g, "").split(",") : [];
    var total = formatRuleArr.reduce(function(total,val){
      var num = val ? val: 0;
      return total+ parseInt(num);
    },0);
    if(total <=0){
      return false;
    } else{
      return true;
    }
  },
  /*
  * check if approval rule is defined at user level
  * @param: approval rule id
  * @return: true/false
  */
  checkApprovalRequiredUser : function(approvalRuleId){
    if(approvalRuleId === "NO_APPROVAL"){
      return false;
    } else{
      return true;
    }
  },
  /*
  * on selecting transaction type for an action
  * @param: limit actions json, feature card ref,category(cust/account) eventObj
  */
  onTransactionTypeChangeAM : function(actionsJson,featureCard,category,eventObj){
    var selSecInd = eventObj.rowContext.sectionIndex;
    var segData = featureCard.segFeatureActions.data;
    var sectionData = featureCard.segFeatureActions.data[selSecInd][0];
    var limitActionId = sectionData.lbxTransactionType.selectedKey +"#"+ sectionData.id;
    var rowsData = [];
    rowsData = this.getApprovalRangesRowData(actionsJson,limitActionId, category,featureCard);
    if(rowsData.length > 0){
        sectionData.flxViewApprovalsHeader.isVisible = (rowsData[0].template === "flxApprovalMatrixNoRangeRow") ? false :true;
    }
    segData[selSecInd] = [sectionData,rowsData];
    featureCard.segFeatureActions.setData(segData);
    /* using setSectionAt causing change to data format as its mapped with widget permissions
    featureCard.segFeatureActions.setSectionAt([sectionData,rowsData], selSecInd);
    */
    this.view.forceLayout();
  },
  /*
  * get approval range text from values
  * @param: range upper,lower limits
  * @returns: range text
  */
  getApprovalRangeTextFromValue : function(rangeLimits){
     var lowerLimit,upperLimit,rangeText = "",prefix = "-";
    lowerLimit = (parseInt(rangeLimits.lowerlimit) === -1) ? "" : parseFloat(rangeLimits.lowerlimit);
    upperLimit = (parseInt(rangeLimits.upperlimit) === -1) ? "" : parseFloat(rangeLimits.upperlimit);
    //get the prefix for limit if any
    if(parseInt(rangeLimits.lowerlimit) === -1) prefix = kony.i18n.getLocalizedString("i18n.frmCompanies.Upto")+" ";
    else if(parseInt(rangeLimits.upperlimit) === -1) prefix = kony.i18n.getLocalizedString("i18n.frmCompanies.Above")+" ";
    else if((parseInt(rangeLimits.lowerlimit) !== -1) && (parseInt(rangeLimits.upperlimit) !== -1)) lowerLimit = lowerLimit + " -";
    rangeText = prefix+ "," +lowerLimit +","+upperLimit;
    var rangeArr = rangeText.split(",")
    return rangeArr;
  },
  /*
  * search for feature/action in the approval matrix
  */
  searchFeatureActionApprovals : function(){
    var searchText = this.view.searchBoxAM.tbxSearchBox.text;
    var category = this.view.flxDynamicWidCustLevelAM.isVisible === true ? 1 : 2;
    var featureComp = category === 1 ? this.view.flxDynamicWidCustLevelAM.widgets() : this.view.flxDynamicWidAccLevelAM.widgets();
    var filteredActionData =[],allActionsData = [];
    if(searchText.length > 0){
      for(var i=0; i<featureComp.length;i++){
        filteredActionData = [];
        allActionsData = [];
        var featureMatches = featureComp[i].lblFeatureName.text.toLowerCase().indexOf(searchText) >= 0;
        var actionSegData = featureComp[i].segFeatureActions.info.segDataJson;
        var actionKeys = Object.keys(actionSegData);
        //search actions
        for(var j=0; j<actionKeys.length;j++){
          var actionName = actionSegData[actionKeys[j]].secData.lblActionName.text;
          var segRows = [actionSegData[actionKeys[j]].secData, actionSegData[actionKeys[j]].rowData];
          allActionsData.push(segRows);
          if((searchText.length > 0) &&
             actionName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){ 
            filteredActionData.push([actionSegData[actionKeys[j]].secData, actionSegData[actionKeys[j]].rowData]);
          }
        }
        if(featureMatches === true){ //show matched feature with all actions
          featureComp[i].setVisibility(true);
          featureComp[i].segFeatureActions.setData(allActionsData);
        } //no featured matched
        else if(featureMatches === false){
          if(filteredActionData.length > 0){ //atleast one action matches, show the feature
            featureComp[i].setVisibility(true);
            featureComp[i].segFeatureActions.setData(filteredActionData);
          } else{ //hide entire feature
            featureComp[i].setVisibility(false);
          }
        }
      }
    }  // search box empty, show all the features,actions
    else{
      for(var m=0; m<featureComp.length;m++){
        featureComp[m].setVisibility(true);
        var actionSegData = featureComp[m].segFeatureActions.info.segDataJson;
        var actionKeys = Object.keys(actionSegData);
        allActionsData =[];
        for(var n=0; n<actionKeys.length;n++){
          var segRows = [actionSegData[actionKeys[n]].secData, actionSegData[actionKeys[n]].rowData];
          allActionsData.push(segRows);
        }
        featureComp[m].segFeatureActions.setData(allActionsData);
      }
    }
    this.view.forceLayout();
  },
 /*
  * check if approvers available fro selected action
  * @param: category(1:cust, 2:acc),action(edit/create)
  */
  checkForApproversAvailabilty : function(approversList,selectedCardInfo){
    var selSec = selectedCardInfo.eventObj.rowContext ? selectedCardInfo.eventObj.rowContext.sectionIndex : 0;
    var segSectionData = this.view[selectedCardInfo.featureCardId].segFeatureActions.data[selSec][0];
    if(selectedCardInfo.action === "CREATE"){ //customer level - check for approvers length for add flow
       if(approversList && approversList.length > 0){
         this.showAddApprovalRuleScreen(selectedCardInfo.action, selectedCardInfo.featureCardId, selectedCardInfo.eventObj);
       } else{ //show no approver popup
         this.showNoApproversErrorPopup(selectedCardInfo.featureCardId, selectedCardInfo.eventObj);
       }
    } else {
       this.showAddApprovalRuleScreen(selectedCardInfo.action, selectedCardInfo.featureCardId, selectedCardInfo.eventObj);
    }
  },
   /*
  * show add/edit approval rules screen
  * @param: category(1:cust, 2:acc),action(edit/create)
  */
  showAddApprovalRuleScreen : function(action,featureCardId,eventObj){
    var self =this;
    var selSec = eventObj.rowContext.sectionIndex;
    var configType = this.getSelectedApprovalConfigValue().id;
    var segSectionData = this.view[featureCardId].segFeatureActions.data[selSec][0];
    var viewType = segSectionData.viewType;
    var actionType = segSectionData.actionType;
    var contractName = this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.flxAddApprovalRule.setVisibility(true);
    this.view.flxCompanyDetails.setVisibility(false);
    this.view.flxAddConditionAARTooltip.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.text = contractName;
    this.segAAR_ROW_FRAMES = [];
    // customer/account level
    if(viewType === 1){
      this.view.flxDetailsRowCont2AAR.setVisibility(false);
      this.view.flxActionIconBgAAR.setVisibility(true);
      this.view.flxApprovalRuleBottomContainerAAR.top = "75dp";
      this.view.lblDetailsHeadingAAR1.text = kony.i18n.getLocalizedString("i18n.frmMfascenarios.Feature_CAP");
      this.view.lblDetailsHeadingAAR2.text = kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP");
      this.view.lblDetailsHeadingAAR3.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type_Caps");
    } else if(viewType === 2){
      this.view.flxApprovalRuleBottomContainerAAR.top = "140dp";
      this.view.flxDetailsRowCont2AAR.setVisibility(true);
      this.view.flxActionIconBgAAR.setVisibility(false);
       this.view.lblDetailsHeadingAAR1.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerName_UC");
      this.view.lblDetailsHeadingAAR2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
      this.view.lblDetailsHeadingAAR3.text = kony.i18n.getLocalizedString("i18n.frmMfascenarios.Feature_CAP");
    }
    if(action === "EDIT"){
      this.view.lblAddRuleHeadingAAR.text =  kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovalRule");
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovalRule_UC");
      this.view.commonButtonsAAR.btnSave.text = kony.i18n.getLocalizedString("i18n.frmCompanies.UpdateApprovalRule_UC");
      this.view.commonButtonsAAR.btnSave.info={"action" :"EDIT", "featureCardId":""};
      this.view.commonButtonsAAR.btnSave.width = "213dp";
      this.view.btnDeleteAAR.setVisibility(true);
    } else if(action === "CREATE"){
      this.view.lblAddRuleHeadingAAR.text = kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovalRule_LC");
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovalRule_UC");
      this.view.commonButtonsAAR.btnSave.text = kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovalRule_UC");
      this.view.commonButtonsAAR.btnSave.info={"action" :"CREATE",  "featureCardId":""};
      this.view.commonButtonsAAR.btnSave.width = "192dp";
      this.view.btnDeleteAAR.setVisibility(false);
    }
    this.view.commonButtonsAAR.btnSave.info.featureCardId = featureCardId;
    //show add rules list with ranges
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.view.flxRulesListContainerAAR.setVisibility(true);
      this.view.flxSingleRuleContAAR.setVisibility(false);
      //this.view.lblAddRuleSubHeadingAAR.setVisibility(true);
      this.view.flxAddRuleLimitSubHeadingAAR.setVisibility(true);
      this.view.lblDetailsHeadingAAR22.setVisibility(true);
      this.view.lblDetailsValueAAR22.setVisibility(true);
      this.view.lblDetailsHeadingAAR3.setVisibility(true);
      this.view.lblDetailsValueAAR3.setVisibility(true);
      this.setDataToApprovalRuleList(action,featureCardId,eventObj.rowContext);
    } //show single row with add condition
    else if(actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      this.view.flxRulesListContainerAAR.setVisibility(false);
      this.view.flxSingleRuleContAAR.setVisibility(true);
      //this.view.lblAddRuleSubHeadingAAR.setVisibility(false);
      this.view.flxAddRuleLimitSubHeadingAAR.setVisibility(false);
      this.view.lblDetailsHeadingAAR22.setVisibility(!(viewType === 2));
      this.view.lblDetailsValueAAR22.setVisibility(!(viewType === 2));
      this.view.lblDetailsHeadingAAR3.setVisibility(viewType === 2);
      this.view.lblDetailsValueAAR3.setVisibility(viewType === 2);
      this.setDataToApprovalRuleNonMon(action,featureCardId,eventObj.rowContext);
    }
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      self.hideAddApprovalRuleScreen();
    }
    this.setApprovalRuleDetails(segSectionData,featureCardId);
    this.view.forceLayout();
  },
  /*
  * hide add/edit approval rules screen
  */
  hideAddApprovalRuleScreen: function(){
    this.view.flxAddApprovalRule.setVisibility(false);
    this.view.flxCompanyDetails.setVisibility(true);
    var contractName = this.view.breadcrumbs.btnPreviousPage.text;
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.text = contractName;
  },
  /*
  * show no approvers availble error popup
  * 2param: selected feature card ref, row obj
  */
  showNoApproversErrorPopup: function(featurCardId, rowObj){
    var scopeObj = this;
    var selSec = rowObj.rowContext ? rowObj.rowContext.sectionIndex : 0;
    var segSectionData = this.view[featurCardId].segFeatureActions.data[selSec][0];
    var isAccLevel = segSectionData.viewType === 1 ? false : true;
    var actionName = segSectionData.actionData.actionName;
    this.view.popupError.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.NoApprovers");
    this.view.popupError.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.close_popup");
    this.view.popupError.rtxPopUpDisclaimer.width = "93%";
    var msg = isAccLevel === false ? kony.i18n.getLocalizedString("i18n.frmCompanies.NoApproversPopupMsg2") : kony.i18n.getLocalizedString("i18n.frmCompanies.NoApproversAccPopupMsg2");
    this.view.popupError.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.NoApproversPopupMsg1")+
      "\""+actionName+"\"" + msg;
    this.view.flxErrorPopup.setVisibility(true);
    this.view.popupError.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxErrorPopup.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: set details for add approval rule screen
  * @param: approval matrix actions segdata
  */
  setApprovalRuleDetails : function(segSectionData,featureCardId){
    var viewType = segSectionData.viewType;
    var actionType = segSectionData.actionType;
    var configType = this.getSelectedApprovalConfigValue().id;
    var headerText = "";
    // isAccountActionLevel = isAccountLevel returned by API; 1 = by account, 0 = by customer (cif)
    var isAccountActionLevel = segSectionData.actionData.isAccountLevel;   
    this.view.lblIconRangeCurrAAR.text = this.currencyValue;
    if(viewType === 1){ //customer level
      headerText = this.view.lblCardNameAM.text +" (" + this.view.lblAMData1.text +")";
      this.view.lblDetailsValueAAR1.text = this.getValueOrNull(segSectionData.actionData.featureName, kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAAR2.text = this.getValueOrNull(segSectionData.actionData.actionName, kony.i18n.getLocalizedString("i18n.common.NA"));
      if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
        this.view.lblAddRuleSubHeadingAAR.text = "("+ kony.i18n.getLocalizedString("i18n.frmCompanies.MaxLimit_UC")+ ":";
        this.view.lblAddRuleSubHeadingAAR2.text = segSectionData.actionData.maxAmount + ")";
        this.view.lblAddRuleSubHeadingAAR.info = {"maxLimit":segSectionData.actionData.maxAmount};
        this.view.lblDetailsValueAAR3.text = this.getValueOrNull(segSectionData.lbxTransactionType.selectedKeyValue[1], kony.i18n.getLocalizedString("i18n.common.NA"));;
        this.view.lblIconAction.text = this.currencyValue;
        this.view.flxActionIconBgAAR.skin = "sknflx1F844DRadius20px";
      } else if (actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
        this.view.lblIconAction.text = this.currencyValue;
        this.view.flxActionIconBgAAR.skin = "sknFlxBg9D301BRd20px";
      }
    } else if (viewType === 2){ //account level
      headerText = this.view.lblCardNameAM.text.replace(":"," - ");
      this.view.lblDetailsValueAAR1.text = this.getValueOrNull(this.view.customerDropdownAM.lblSelectedValue.info.selectedName , kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAAR2.text = this.getValueOrNull(this.view.customerDropdownAM.lblSelectedValue.info.selectedId, kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAAR3.text = this.getValueOrNull(segSectionData.actionData.featureName, kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAAR21.text = this.getValueOrNull(segSectionData.actionData.actionName, kony.i18n.getLocalizedString("i18n.common.NA"));
      if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
        this.view.lblAddRuleSubHeadingAAR.text = "("+ kony.i18n.getLocalizedString("i18n.frmCompanies.MaxLimit_UC")+ ":";
        this.view.lblAddRuleSubHeadingAAR2.text = segSectionData.actionData.maxAmount + ")";
        this.view.lblAddRuleSubHeadingAAR.info = {"maxLimit":segSectionData.actionData.maxAmount};
        this.view.lblIconAction21AAR.text = this.currencyValue;
        this.view.lblIconAction21AAR.skin = "sknIcon1F844D17px";
        this.view.lblDetailsValueAAR22.text = this.getValueOrNull(segSectionData.lbxTransactionType.selectedKeyValue[1], kony.i18n.getLocalizedString("i18n.common.NA"));
      } else if (actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
        this.view.lblIconAction21AAR.text = this.currencyValue;
        this.view.lblIconAction21AAR.skin = "sknIcon9D301B17px";

      }
    }
    var actionDetails = {
      "contractId":this.completeContractDetails.id,
      "cif":this.view.customerDropdownAM.lblSelectedValue.info.selectedId,
      "isGroupMatrix": this.getSelectedApprovalConfigValue().id === this.approvalConfigType.USER ? "0" :"1",
      "actionId":segSectionData.actionData.actionId,
      "limitTypeId":segSectionData.lbxTransactionType.selectedKey,
    };
    if(viewType === 2)
      actionDetails["accountId"] = this.view.accountsDropdownAM.lblSelectedValue.info.selectedId;
    this.view.lblCustomerNameAAR.info = {"payloadDetails": actionDetails,
                                         "actionType":actionType,
                                         "actionData":segSectionData.actionData,
                                         "isAccountActionLevel":isAccountActionLevel,
                                         "isAccountLevel": viewType === 2 ? true : false
                                        };
    this.view.lblCustomerNameAAR.text = headerText;
    
  },
  /*
  * Approval rule screen: show tooltip for range on hover of info icon
  */
  onHoverRangeInfoAAR : function(widget,context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      var flxLeft = this.view.flxListHeadingAAR2.frame.x + this.view.flxIconRangeInfoAAR.frame.x + 20;
      var flxTop = this.view.flxApprovalRuleBottomContainerAAR.frame.y - this.view.flxApprovalRuleScrollContAAR.contentOffsetMeasured.y;
      this.view.flxRuleRangeTooltipAAR.top = flxTop+"dp";
      this.view.flxRuleRangeTooltipAAR.left = flxLeft +"dp";
      this.view.flxRuleRangeTooltipAAR.setVisibility(true);
      this.view.forceLayout();
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.flxRuleRangeTooltipAAR.setVisibility(false);
    }
  },
  /*
  * Approval rule screen: widget map  for add approval rules segment
  * @return: widgetMap obj
  */
  getApprovalRuleSegWidgetMap : function(){
    var widgetMap = {
      "lstBoxRangeType":"lstBoxRangeType",
      "lblIconRangeTypeError":"lblIconRangeTypeError",
      "flxRangeTypeError":"flxRangeTypeError",
      "lblIconError1":"lblIconError1",
      "lblErrorText1":"lblErrorText1",
      "lblRangeTypeErrMsg":"lblRangeTypeErrMsg",
      "flxRangeSingleValue":"flxRangeSingleValue",
      "lblIconCurrencySingle":"lblIconCurrencySingle",
      "tbxSingleRangeValue":"tbxSingleRangeValue",
      "flxSingleValError":"flxSingleValError",
      "flxRangeMultiValue":"flxRangeMultiValue",
      "lblIconCurrencyFrom":"lblIconCurrencyFrom",
      "tbxFromRangeValue":"tbxFromRangeValue",
      "lblIconCurrencyTo":"lblIconCurrencyTo",
      "tbxToRangeValue":"tbxToRangeValue",
      "flxFromValError":"flxFromValError",
      "lblIconError2":"lblIconError2",
      "lblErrorText2":"lblErrorText2",
      "lblIconError3":"lblIconError3",
      "lblErrorText3":"lblErrorText3",
      "flxToValError":"flxToValError",
      "imgCheckbox":"imgCheckbox",
      "lblAddApprovalCondition":"lblAddApprovalCondition",
      "lblIconApprovalCondError":"lblIconApprovalCondError",
      "lblApprovalCondNA":"lblApprovalCondNA",
      "flxDeleteRule":"flxDeleteRule",
      "flxAddRuleOption":"flxAddRuleOption",
      "lblSeperator":"lblSeperator",
      "lblIconDeleteRule":"lblIconDeleteRule",
      "lblIconAdd":"lblIconAdd",
      "flxAddApprovalCond":"flxAddApprovalCond",
      "flxAddApprovalRule":"flxAddApprovalRule",
      "ruleConditions":"ruleConditions"
    };
    return widgetMap; 
  },
  /*
  * Approval rule screen: set data for add approval rules segment
  * @param: action(create/edit),approval matrix card id, approval rule seg row context
  */
  setDataToApprovalRuleList : function(action,cardWidId,rowContext){  
    var segData = [];
    if(action === "CREATE"){
      var rowObjMap = this.mapApprovalRuleDefaultRowData(this,1);
      segData.push(rowObjMap);

    }else if(action === "EDIT"){
      var selSec = rowContext.sectionIndex;
      var selRow =rowContext.rowIndex;
      var approvalSegData = this.view[cardWidId].segFeatureActions.data;
      var featureInfo = this.view[cardWidId].segFeatureActions.info.featureActionsJson;
      var transType = approvalSegData[selSec][0].lbxTransactionType.selectedKey;
      var actionId = approvalSegData[selSec][0].id;
      var approvalRule = featureInfo[transType+"#"+actionId];
      var limits = approvalRule.limits ? approvalRule.limits : [];
     
      for(var i=0; i<limits.length; i++){
        var singleLimit = limits.length === 1 ? true : false;
        var rowObjMap = this.mapApprovalRuleRowMonForEdit(limits[i], singleLimit);
        segData.push(rowObjMap);
      }
      if(segData.length >=2){
        segData[segData.length-2].flxAddRuleOption.isVisible = true;
      } else if(segData.length === 1){ //only ABOVE row exists

        
      }
    }
    this.view.segAddApprovalRuleAAR.widgetDataMap = this.getApprovalRuleSegWidgetMap();
    this.view.segAddApprovalRuleAAR.setData(segData);
    this.view.forceLayout();
    //show/hide delete buttons
    var betweenRowInd = this.checkIfRangeTypeRowExists("BETWEEN");
    if(betweenRowInd !== -1){
      for(var j=0; j<segData.length; j++){
        if(segData[j].lstBoxRangeType.selectedKey === "UPTO"){
          segData[j].flxDeleteRule.isVisible = false;
          segData[j].flxAddRuleOption.isVisible = false;
          this.view.segAddApprovalRuleAAR.setDataAt(segData[j],j);
          break;
        }
      }
    } else{
      if(segData[0].lstBoxRangeType.selectedKey !== "SELECT"){
        segData[0].flxDeleteRule.isVisible = true;
        segData[0].flxAddRuleOption.isVisible = true;
        this.view.segAddApprovalRuleAAR.setDataAt(segData[0],0); 
      }
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: set approval rule for non monetary action
  * @param: action(create/edit),approval matrix card id, approval rule seg row context
  */
  setDataToApprovalRuleNonMon : function(action,cardWidId,rowContext){
    this.view.lblIconApprovalCondError.setVisibility(false);
    var configType = this.getSelectedApprovalConfigValue().id;
    if(action === "CREATE"){
      this.view.imgRuleCheckboxAAR.src = this.AdminConsoleCommonUtils.checkboxnormal;
      this.view.flxAddApprovalCondAAR.setVisibility(false);
      this.view.lblApprovalCondNA.setVisibility(true);
      this.view.lblAddApprovalCondition.text = configType === this.approvalConfigType.SIGNATORY_GROUP ?
          kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition"): kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers");
      this.view.lblAddApprovalCondition.info.sgLevel = {"groupList":"","groupRule":""};
    } else if(action === "EDIT"){
      var isApprovalReq = false;
      var selSec = rowContext.sectionIndex;
      var approvalSegData = this.view[cardWidId].segFeatureActions.data;
      var featureInfo = this.view[cardWidId].segFeatureActions.info.featureActionsJson;
      var actionId = approvalSegData[selSec][0].id;
      var approvalRule = featureInfo["NON_MONETARY_LIMIT"+"#"+actionId];
      var limits = approvalRule.limits ? approvalRule.limits : [];
      
      if(limits.length>0)
        isApprovalReq = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
          this.checkApprovalRequiredSG(limits[0].groupRule) : this.checkApprovalRequiredUser(limits[0].approvalRuleId);
      if(isApprovalReq){
        if(configType === this.approvalConfigType.SIGNATORY_GROUP){
          this.view.lblAddApprovalCondition.info.sgLevel = {"groupList":limits[0].groupList,"groupRule":limits[0].groupRule};
        }else{
          var approvers = this.getApproversArrayForAction(limits[0].approvers);
          this.view.lblAddApprovalCondition.info.userLevel = {"approverList":approvers,"approvalCount": this.getCountForApprovalCountCode(limits[0].approvalRuleId)};
        }
        this.view.imgRuleCheckboxAAR.src = this.AdminConsoleCommonUtils.checkboxSelected;
        this.view.lblAddApprovalCondition.text = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
          kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition") : kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
      } else {
        this.view.lblAddApprovalCondition.info.sgLevel = {"groupList":"","groupRule":""};
        this.view.lblAddApprovalCondition.info.userLevel = {"approverList":[],"approvalCount": "0"};
        this.view.imgRuleCheckboxAAR.src = this.AdminConsoleCommonUtils.checkboxnormal;
        this.view.lblAddApprovalCondition.text = configType === this.approvalConfigType.SIGNATORY_GROUP ?
          kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition"): kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers");      
      }
      this.view.flxAddApprovalCondAAR.setVisibility(isApprovalReq);
      this.view.lblApprovalCondNA.setVisibility(!isApprovalReq);
    }
    
  },
  /*
  * Approval rule screen: maaping row data for approval rule segment
  * @param: rowType(1: single val,2:double val)
  */
  mapApprovalRuleDefaultRowData : function(rowType){
    var self =this;
    var configType = this.getSelectedApprovalConfigValue().id;
    var lstBoxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["UPTO","Upto"],["ABOVE","Above"]];
    var rowObj = {
      "lstBoxRangeType": {"masterData":lstBoxData,"selectedKey":"SELECT",
                          "enable":true,"skin":"sknLbxborderd7d9e03pxradius",
                          "onSelection": this.onRangeTypeSelectedAAR
                         }, //sknLbxborderd7d9e03pxradiusF3F3F3Disabled
      "flxRangeTypeError":{"isVisible":false},
      "lblRangeTypeErrMsg":{"text":kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")},
      "lblIconCurrencySingle":{"text":this.currencyValue},
      "flxRangeSingleValue":{"isVisible":true},
      "tbxSingleRangeValue":{"text":"","enable":true,"skin":"sknTbxBgFFFFFFBrD7D9E01pxR3px",
                             "placeholder": "Value",
                             "onEndEditing":this.singleValueRangeTextChangeAAR
                            }, //txtD7d9e0disabledf3f3f3
      "flxSingleValError":{"isVisible":false},
      "flxRangeMultiValue":{"isVisible":false},
      "tbxFromRangeValue":{"text":"","enable":true,"skin":"sknTbxBgFFFFFFBrD7D9E01pxR3px",
                           "placeholder": "From value"
                          },
      "tbxToRangeValue":{"text":"","enable":true,"skin":"sknTbxBgFFFFFFBrD7D9E01pxR3px",
                         "placeholder": "To value",
                         "onEndEditing":this.multiValueRangeTextChangeAAR
                        },
      "lblIconCurrencyFrom":{"text":this.currencyValue},
      "lblIconCurrencyTo":{"text":this.currencyValue},
      "flxFromValError":{"isVisible":false},
      "flxToValError":{"isVisible":false},
      "flxApprovalCheckbox":{"enable":true},
      "imgCheckbox":{"src":this.AdminConsoleCommonUtils.checkboxnormal,
                     "onClick": this.onApprovalRequiredAARClick},
      "flxAddApprovalCond":{"isVisible":false},
      "lblAddApprovalCondition":{"text": configType === this.approvalConfigType.SIGNATORY_GROUP ?
                                 kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition"):kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers"),
                                 "onClick": this.onClickApprovalAddCondition,
                                 "info":{"sgLevel":{"groupList":"","groupRule":""},
                                         "userLevel": {"approverList":[],"approvalCount": "0"}}
                                },
      "lblIconApprovalCondError":{"isVisible":false, "text":"\ue94c"},
      "lblApprovalCondNA":{"isVisible":true,"text":"N/A"},
      "flxDeleteRule":{"isVisible":false, "onClick": this.deleteApprovalRangeRow},
      "flxAddRuleOption":{"isVisible":false,
                          "onClick": this.onClickOfAddRangeAAR,
                          "onHover":this.onAddRangeAddCondHover
                         },
      "lblSeperator":"-",
      "lblIconDeleteRule":{"text":"\ue91b"},
      "lblIconAdd":{"text":"\ue98f"},
      "lblIconRangeTypeError":{"text":"\ue94c"},
      "lblIconError1":{"text":"\ue94c"},
      "lblIconError2":{"text":"\ue94c"},
      "lblIconError3":{"text":"\ue94c"},
      "lblErrorText3":{"text":""},
      "lblErrorText1":{"text":""},
      "flxAddApprovalRule":{
          "doLayout":function(eventObj){
            self.segAAR_ROW_FRAMES.push(eventObj.frame);
          }
        },
      "ruleConditions":[],
      "template":"flxAddApprovalRule"
    };
    if(rowType === 2){ //for between type
      rowObj.flxRangeSingleValue.isVisible = false;
      rowObj.flxRangeMultiValue.isVisible = true;
    } //for upto,above type
    else if(rowType === 1){
      rowObj.flxRangeSingleValue.isVisible = true;
      rowObj.flxRangeMultiValue.isVisible = false;
    }
    return rowObj;
  },
  /*
  * Approval rule screen: on click of add/edit approval condition
  */
  onClickApprovalAddCondition : function(eventObj){
    var isValid = this.validateApprovalRulesMonAAR(1,eventObj);
    if(isValid){
      this.setAddApprovalConditionsDetails(eventObj);
      var config = this.getSelectedApprovalConfigValue().id;
      if(config === this.approvalConfigType.SIGNATORY_GROUP){
        this.showAddApprovalCondSGPopup(eventObj);
      } else if(config === this.approvalConfigType.USER){
        this.showAddApprovalCondUserPopup(eventObj);
      }
      
    }  
  },
  /*
  * Approval rule screen: on check/uncheck of approval required checkbox
  */
  onApprovalRequiredAARClick : function(eventObj){
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : "0";
    var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
    var configType = this.getSelectedApprovalConfigValue().id;
    if(selRowData.imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal){
      selRowData.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
      selRowData.flxAddApprovalCond.isVisible = true;
      selRowData.lblApprovalCondNA.isVisible = false;
      
    } else if(selRowData.imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected){
      selRowData.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal;
      selRowData.flxAddApprovalCond.isVisible = false;
      selRowData.lblApprovalCondNA.isVisible = true;
    }
    selRowData.lblIconApprovalCondError.isVisible = false;
    selRowData.lblAddApprovalCondition.text = configType === this.approvalConfigType.SIGNATORY_GROUP ?
          kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition"): kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers");
    selRowData.lblAddApprovalCondition.info.sgLevel = {"groupList":"","groupRule":""};
    selRowData.lblAddApprovalCondition.info.userLevel = {"approverList":[],"approvalCount": "0"};
    this.view.segAddApprovalRuleAAR.setDataAt(selRowData, selRowInd);
  },
  /*
  * Approval rule screen: on range type value selected from listbox in seg
  */
  onRangeTypeSelectedAAR : function(eventObj){
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : 0;
    var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
    var segData = this.view.segAddApprovalRuleAAR.data;
    var newRowToAdd ="",aboveVal ="";
    var rangeType = selRowData.lstBoxRangeType.selectedKey;
    if(rangeType === "UPTO"){
      var aboveRangeInd = this.checkIfRangeTypeRowExists("ABOVE");
      if(aboveRangeInd === -1){ //insert ABOVE type row
        newRowToAdd = this.addAboveRangeTypeRowAAR();
        newRowToAdd.tbxSingleRangeValue.text = selRowData.tbxSingleRangeValue.text;
        this.view.segAddApprovalRuleAAR.addDataAt(newRowToAdd,segData.length);
      } else if(aboveRangeInd !== -1){ // disable existing ABOVE type row
        aboveVal = segData[aboveRangeInd].tbxSingleRangeValue.text;
        segData[aboveRangeInd].tbxSingleRangeValue.skin = "txtD7d9e0disabledf3f3f3";
        segData[aboveRangeInd].tbxSingleRangeValue.enable = false;
        segData[aboveRangeInd].lstBoxRangeType.enable = false;
        segData[aboveRangeInd].lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
        this.view.segAddApprovalRuleAAR.setDataAt(segData[aboveRangeInd],aboveRangeInd);
      }
      var approvalReqImg = selRowData.imgCheckbox.src;
      var selRowData = this.mapApprovalRuleDefaultRowData(1);
      var lstBoxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["UPTO","Upto"]];
      selRowData.lstBoxRangeType.masterData = lstBoxData;
      selRowData.lstBoxRangeType.selectedKey = "UPTO";
      selRowData.flxAddRuleOption.isVisible = true;
      selRowData.flxDeleteRule.isVisible = true;
      selRowData.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradius";
      selRowData.flxRangeTypeError.isVisible = false;
      if(approvalReqImg === this.AdminConsoleCommonUtils.checkboxSelected){
        selRowData.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
        selRowData.tbxSingleRangeValue.text = aboveVal;
        selRowData.flxAddApprovalCond.isVisible = true;
        selRowData.lblApprovalCondNA.isVisible = false;
      }
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,0);
    } else if(rangeType === "ABOVE"){
      this.view.segAddApprovalRuleAAR.removeAt(selRowInd);
      var selRowData = this.mapApprovalRuleDefaultRowData(1);
      //add ABOVE row
      selRowData.lstBoxRangeType.selectedKey = "ABOVE";
      selRowData.flxAddRuleOption.isVisible = true;
      selRowData.flxDeleteRule.isVisible = true;
      selRowData.flxRangeTypeError.isVisible = false;
      selRowData.tbxSingleRangeValue.text = "0";
      this.view.segAddApprovalRuleAAR.addDataAt(selRowData,0);
    } else if (rangeType === "BETWEEN"){
      selRowData.flxRangeSingleValue.isVisible = false;
      selRowData.flxRangeMultiValue.isVisible = true;
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: check if particular range type is added
  * @param: range type id
  * @return: row index
  */
  checkIfRangeTypeRowExists : function(rangeTypeId){
    var segData = this.view.segAddApprovalRuleAAR.data;
    for(var i=0; i<segData.length; i++){
      if(segData[i].lstBoxRangeType.selectedKey === rangeTypeId){
        return i;
      }
    }
    return -1;
  },
  /*
  * Approval rule screen: add new row of range type 'above' in approval rule seg
  * @param: option(1-single txtbox,2-multi txtbox)
  * @returns: new row obj
  */
  addAboveRangeTypeRowAAR : function(option){
    var newRowToAdd = this.mapApprovalRuleDefaultRowData(1);
    newRowToAdd.lstBoxRangeType.selectedKey = "ABOVE";
    newRowToAdd.lstBoxRangeType.enable = false;
    newRowToAdd.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
    newRowToAdd.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxDisable;
    newRowToAdd.flxApprovalCheckbox.enable = false;
    newRowToAdd.flxAddApprovalCond.isVisible = true;
    newRowToAdd.lblApprovalCondNA.isVisible = false;
    newRowToAdd.flxAddRuleOption.isVisible = false;
    newRowToAdd.flxDeleteRule.isVisible = false;
    if(option && option === 1){ //enabled
      newRowToAdd.tbxSingleRangeValue.skin = "sknTbxBgFFFFFFBrD7D9E01pxR3px";
      newRowToAdd.tbxSingleRangeValue.enable = true;
      newRowToAdd.lstBoxRangeType.enable = true;
      newRowToAdd.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradius";
    }else if( option && option === 2){ //disabled
      newRowToAdd.tbxSingleRangeValue.skin = "txtD7d9e0disabledf3f3f3";
      newRowToAdd.tbxSingleRangeValue.enable = false;
      newRowToAdd.lstBoxRangeType.enable = false;
      newRowToAdd.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
    }
    return newRowToAdd;
  },
  /*
  * Approval rule screen: add new row of range type 'between' inapproval rule seg
  * @returns: new row obj
  */
  addBetweenRangeTypeRowAAR : function(){
    var newRowToAdd = this.mapApprovalRuleDefaultRowData(2);
    var lstBoxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["BETWEEN","Between"]];
    newRowToAdd.lstBoxRangeType.masterData = lstBoxData;
    newRowToAdd.lstBoxRangeType.selectedKey = "BETWEEN";
    newRowToAdd.lstBoxRangeType.enable = false;
    newRowToAdd.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
    newRowToAdd.tbxFromRangeValue.enable = false;
    newRowToAdd.tbxFromRangeValue.skin = "txtD7d9e0disabledf3f3f3";
    newRowToAdd.flxApprovalCheckbox.enable = false;
    newRowToAdd.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxDisable;
    newRowToAdd.flxAddApprovalCond.isVisible = true;
    newRowToAdd.lblApprovalCondNA.isVisible = false;   
    newRowToAdd.flxAddRuleOption.isVisible = true;
    newRowToAdd.flxDeleteRule.isVisible = true;
    return newRowToAdd;
  },
  /*
  * Approval rule screen: add new rule row on click of plus icon
  */
  onClickOfAddRangeAAR : function(eventObj){
    var configType = this.getSelectedApprovalConfigValue().id;
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : 0;
    var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
    var segData = this.view.segAddApprovalRuleAAR.data;
    var newRowToAdd ="";
    var currRangeType = selRowData.lstBoxRangeType.selectedKey;
    selRowData.flxAddRuleOption.isVisible = false;
    //add UPTO range type row
    if(currRangeType === "ABOVE"){ 
      selRowData.flxApprovalCheckbox.enable = false;
      selRowData.lstBoxRangeType.masterData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["ABOVE","Above"]];
      selRowData.lstBoxRangeType.selectedKey = "ABOVE";
      selRowData.lblApprovalCondNA.isVisible = false;
      selRowData.flxAddApprovalCond.isVisible = true;
      selRowData.flxDeleteRule.isVisible = false;
      if(selRowData.imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal){
        selRowData.lblAddApprovalCondition.text = configType === this.approvalConfigType.SIGNATORY_GROUP ?
                                 kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition"):kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers");
        selRowData.lblAddApprovalCondition.info = {"sgLevel":{"groupList":"","groupRule":""},
                                         "userLevel": {"approverList":[],"approvalCount": "0"}};
      }
      selRowData.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxDisable;
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
      
      var lstBoxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["UPTO","Upto"]];
      newRowToAdd = this.mapApprovalRuleDefaultRowData(1);
      newRowToAdd.lstBoxRangeType.masterData = lstBoxData;
      newRowToAdd.lstBoxRangeType.selectedKey = "SELECT";
      newRowToAdd.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
      newRowToAdd.flxAddApprovalCond.isVisible = true;
      newRowToAdd.lblApprovalCondNA.isVisible = false;
      newRowToAdd.flxAddRuleOption.isVisible = true;
      newRowToAdd.flxDeleteRule.isVisible = true;
      this.view.segAddApprovalRuleAAR.addDataAt(newRowToAdd,0);
    } //add a BETWEEN range type row
    else if(currRangeType === "UPTO" || currRangeType === "BETWEEN"){
      selRowData.flxDeleteRule.isVisible = currRangeType === "UPTO" ? false :true;
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
      
      newRowToAdd = this.addBetweenRangeTypeRowAAR();
      newRowToAdd.tbxFromRangeValue.text = currRangeType === "UPTO" ? selRowData.tbxSingleRangeValue.text : selRowData. tbxToRangeValue.text;
      this.view.segAddApprovalRuleAAR.addDataAt(newRowToAdd,selRowInd+1);
      var lastRowData = segData[segData.length -1];
      //clear ABOVE range row value
      if(lastRowData.lstBoxRangeType.selectedKey === "ABOVE"){
        lastRowData.lstBoxRangeType.enable = false;
        lastRowData.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
        lastRowData.tbxSingleRangeValue.text = "";
        lastRowData.tbxSingleRangeValue.enable = true;
        lastRowData.tbxSingleRangeValue.skin = "sknTbxBgFFFFFFBrD7D9E01pxR3px";
        this.view.segAddApprovalRuleAAR.setDataAt(lastRowData,segData.length -1);
      }
    }
    this.view.flxAddRangeTooltip.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: set value in required textbox's for single value ranges
  */
  singleValueRangeTextChangeAAR : function(eventObj){
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : 0;
    var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
    var segData = this.view.segAddApprovalRuleAAR.data;
    var rangeType = selRowData.lstBoxRangeType.selectedKey;
    var rangeVal =  eventObj.text || "";
    if(rangeType === "UPTO" && rangeVal.trim()){ 
      var nextRowData = (selRowInd+1) < segData.length ? segData[selRowInd+1] : {};
      if(nextRowData.lstBoxRangeType.selectedKey === "ABOVE"){
        nextRowData.tbxSingleRangeValue.text = rangeVal;
        nextRowData.tbxSingleRangeValue.enable = false;
        nextRowData.tbxSingleRangeValue.skin = "txtD7d9e0disabledf3f3f3";       
      }
      else if(nextRowData.lstBoxRangeType.selectedKey === "BETWEEN"){
        nextRowData.tbxFromRangeValue.text = rangeVal;
      }
      this.view.segAddApprovalRuleAAR.setDataAt(nextRowData,selRowInd+1);
    } else if(rangeType === "ABOVE" && (segData.length === 1) && rangeVal.trim()){
      //add ABOVE row
      var newRowToAdd = this.addAboveRangeTypeRowAAR(2);
      newRowToAdd.tbxSingleRangeValue.text = selRowData.tbxSingleRangeValue.text;
      newRowToAdd.lblAddApprovalCondition.text = selRowData.lblAddApprovalCondition.text;
      newRowToAdd.lblAddApprovalCondition.info = selRowData.lblAddApprovalCondition.info;
      this.view.segAddApprovalRuleAAR.addDataAt(newRowToAdd,segData.length);
      //update first row to UPTO
      var selRowData = this.mapApprovalRuleDefaultRowData(1);
      var lstBoxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["UPTO","Upto"]];
      selRowData.lstBoxRangeType.masterData = lstBoxData;
      selRowData.lstBoxRangeType.selectedKey = "UPTO";
      selRowData.tbxSingleRangeValue.text = newRowToAdd.tbxSingleRangeValue.text;
      selRowData.flxAddRuleOption.isVisible = true;
      selRowData.flxDeleteRule.isVisible = true;
      selRowData.lstBoxRangeType.skin = "sknLbxborderd7d9e03pxradius";
      selRowData.flxRangeTypeError.isVisible = false;
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,0);
    }
    //clear inline error if any
    if(selRowData.flxSingleValError.isVisible = true){
      selRowData.flxSingleValError.isVisible = false;
      selRowData.tbxSingleRangeValue.skin = "sknTbxBgFFFFFFBrD7D9E01pxR3px";
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: set value in next rows textbox based on current to value
  */
  multiValueRangeTextChangeAAR : function(eventObj){
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : 0;
    var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
    var segData = this.view.segAddApprovalRuleAAR.data;
    var rangeVal =  eventObj.text || "";
    if((selRowInd+1) < segData.length){
      var nextRowData = segData[selRowInd+1];
      var nextRowRangeType = nextRowData.lstBoxRangeType.selectedKey;   
      if(nextRowRangeType === "ABOVE" && rangeVal.trim()){
        nextRowData.tbxSingleRangeValue.text = rangeVal;
        nextRowData.tbxSingleRangeValue.enable = false;
        nextRowData.tbxSingleRangeValue.skin = "txtD7d9e0disabledf3f3f3";
        nextRowData.flxSingleValError.isVisible = false;
        this.view.segAddApprovalRuleAAR.setDataAt(nextRowData,selRowInd+1);
      } else if(nextRowRangeType === "BETWEEN" && rangeVal.trim()){
        nextRowData.tbxFromRangeValue.text = rangeVal;
        nextRowData.tbxFromRangeValue.enable = false;
        nextRowData.tbxFromRangeValue.skin = "txtD7d9e0disabledf3f3f3";
        nextRowData.tbxToRangeValue.enable = true;
        nextRowData.tbxToRangeValue.skin = "sknTbxBgFFFFFFBrD7D9E01pxR3px";
        this.view.segAddApprovalRuleAAR.setDataAt(nextRowData,selRowInd+1);
        
      }
      var currRangeType = selRowData.lstBoxRangeType.selectedKey;
      //clear inline error if any
      if(currRangeType === "BETWEEN" && selRowData.flxToValError.isVisible === true){
        selRowData.flxToValError.isVisible = false;
        selRowData.tbxToRangeValue.skin = "sknTbxBgFFFFFFBrD7D9E01pxR3px";
        this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
      }
    }
  },
  /*
  * Approval rule screen: delete approval range rule row
  */
  deleteApprovalRangeRow : function(eventObj){
    var betweenRowCount = 0;
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : 0;
    var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
    var segData = this.view.segAddApprovalRuleAAR.data;
    var prevRowData = (selRowInd-1) >= 0 ? this.view.segAddApprovalRuleAAR.data[selRowInd-1]: "";
    var nextRowData = (selRowInd+1) < segData.length ? this.view.segAddApprovalRuleAAR.data[selRowInd+1] : "";
    
    if(prevRowData && nextRowData){ //deleting rows other than first row
      var prevRangeVal = prevRowData.lstBoxRangeType.selectedKey === "BETWEEN" ?
                                  prevRowData.tbxToRangeValue.text : prevRowData.tbxSingleRangeValue.text;
      if(nextRowData.lstBoxRangeType.selectedKey === "BETWEEN"){
        nextRowData.tbxFromRangeValue.text = prevRangeVal;
      } else{
        nextRowData.tbxSingleRangeValue.text = prevRangeVal;
        nextRowData.tbxSingleRangeValue.skin = "txtD7d9e0disabledf3f3f3";
      }
      this.view.segAddApprovalRuleAAR.setDataAt(nextRowData,selRowInd+1);
      prevRowData.flxAddRuleOption.isVisible = true;
      this.view.segAddApprovalRuleAAR.setDataAt(prevRowData,selRowInd-1);
      this.view.segAddApprovalRuleAAR.removeAt(selRowInd);
      //show delete option for UPTO range only if there are no BETWEEN range rows
      for(var i=0; i<segData.length; i++){
        if(segData[i].lstBoxRangeType.selectedKey === "BETWEEN"){
          betweenRowCount = betweenRowCount+1;
        }
      }
      if(betweenRowCount === 0){
        var uptoRowData = this.view.segAddApprovalRuleAAR.data[0];
        uptoRowData.flxDeleteRule.isVisible = true;
        this.view.segAddApprovalRuleAAR.setDataAt(uptoRowData,0);
      }
    } else if(prevRowData === "" && selRowInd === 0){ //when 2 rows(UPTO,ABOVE) are present
      this.view.segAddApprovalRuleAAR.removeAt(selRowInd);
      var currSegData = this.view.segAddApprovalRuleAAR.data.length > 0 ? this.view.segAddApprovalRuleAAR.data[0] : "";
      if(currSegData && currSegData.lstBoxRangeType.selectedKey === "ABOVE"){ //deleting UPTO row,only ABOVE row is present
        currSegData = this.mapApprovalRuleDefaultRowData(1);
        currSegData.lstBoxRangeType.selectedKey = "ABOVE"
        currSegData.tbxSingleRangeValue.text = "0";
        currSegData.flxAddRuleOption.isVisible = true;
        currSegData.flxDeleteRule.isVisible = true;
        this.view.segAddApprovalRuleAAR.setDataAt(currSegData,0);
      } else{ // deleting ABOVE row and add default row
        var newRowToAdd = this.mapApprovalRuleDefaultRowData(1);
        this.view.segAddApprovalRuleAAR.addDataAt(newRowToAdd,0);
      }
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: validate the approval rule ranges added for monetary
  * @param: option(1-single row,2-allrows),eventObj
  * @return: true/false
  */
  validateApprovalRulesMonAAR : function(option,eventObj){
    var isValid = true;
    var segData = this.view.segAddApprovalRuleAAR.data;
    var segRowsData = option === 1 ? [segData[eventObj.rowContext.rowIndex]] : this.view.segAddApprovalRuleAAR.data;
    var maxLimit = this.view.lblAddRuleSubHeadingAAR.info.maxLimit;
    for(var i=0; i<segRowsData.length; i++){
      if(segRowsData[i].lstBoxRangeType.selectedKey === "SELECT"){
        isValid = false;
        segRowsData[i].lstBoxRangeType.skin = "sknLstBoxeb3017Bor3px";
        segRowsData[i].flxRangeTypeError.isVisible = true;
      }
      if(option === 2 && segRowsData[i].flxAddApprovalCond.isVisible === true &&
         (segRowsData[i].lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition") ||
         segRowsData[i].lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers"))){
        isValid = false;
        segRowsData[i].lblIconApprovalCondError.isVisible = true;
      }
      if(segRowsData[i].lstBoxRangeType.selectedKey === "BETWEEN" &&
         (segRowsData[i].tbxToRangeValue.text.trim() === "" || segRowsData[i].tbxToRangeValue.text < 0)){
        isValid = false;
        segRowsData[i].tbxToRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxToValError.isVisible = true;
        segRowsData[i].lblErrorText3.text = segRowsData[i].tbxToRangeValue.text < 0 ? kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeLessThanZero") : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
      }else if((segRowsData[i].lstBoxRangeType.selectedKey === "UPTO")&&
               (segRowsData[i].tbxSingleRangeValue.text.trim() === "" || segRowsData[i].tbxSingleRangeValue.text < 0)){
        isValid = false;
        segRowsData[i].tbxSingleRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxSingleValError.isVisible = true;
        segRowsData[i].lblErrorText1.text = segRowsData[i].tbxSingleRangeValue.text < 0 ? kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeLessThanZero") : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
      } else if(segRowsData[i].lstBoxRangeType.selectedKey === "ABOVE" && segRowsData[i].tbxSingleRangeValue.text.trim() === ""){
        isValid = false;
        segRowsData[i].tbxSingleRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxSingleValError.isVisible = true;
        segRowsData[i].lblErrorText1.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
      }
      //validate from-to range values
      if(segRowsData[i].lstBoxRangeType.selectedKey === "BETWEEN" && segRowsData[i].tbxToRangeValue.text >= 0 &&
         (parseFloat(segRowsData[i].tbxFromRangeValue.text) >= parseFloat(segRowsData[i].tbxToRangeValue.text))){
        isValid = false;
        segRowsData[i].tbxToRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxToValError.isVisible = true;
        segRowsData[i].lblErrorText3.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ValueShouldBeGreaterThan")+" " +segRowsData[i].tbxFromRangeValue.text;
      }
      //validate for maxLimit
      /*if(segRowsData[i].lstBoxRangeType.selectedKey === "BETWEEN" &&
         (parseFloat(segRowsData[i].tbxToRangeValue.text.trim()) > parseFloat(maxLimit))){
        isValid = false;
        segRowsData[i].tbxToRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxToValError.isVisible = true;
        segRowsData[i].lblErrorText3.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeGreaterThanMaxValue");
      }else if(segRowsData[i].lstBoxRangeType.selectedKey === "UPTO" &&
               (parseFloat(segRowsData[i].tbxSingleRangeValue.text.trim())  > parseFloat(maxLimit))){
        isValid = false;
        segRowsData[i].tbxSingleRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxSingleValError.isVisible = true;
        segRowsData[i].lblErrorText1.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeGreaterThanMaxValue");
      } else if(segRowsData[i].lstBoxRangeType.selectedKey === "ABOVE"  && segRowsData[i].tbxSingleRangeValue.skin !== "txtD7d9e0disabledf3f3f3" &&
                (parseFloat(segRowsData[i].tbxSingleRangeValue.text.trim())  > parseFloat(maxLimit))){
        isValid = false;
        segRowsData[i].tbxSingleRangeValue.skin = "sknTbxFFFFFFBrE32416R3pxLato13px";
        segRowsData[i].flxSingleValError.isVisible = true;
        segRowsData[i].lblErrorText1.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeGreaterThanMaxValue");
      }*/
    }
    if(option === 1){
      this.view.segAddApprovalRuleAAR.setDataAt(segRowsData[0],eventObj.rowContext.rowIndex);
    }else{
      this.view.segAddApprovalRuleAAR.setData(segData);
    }
    this.view.forceLayout();
    return isValid;
  },
  /*
  * Approval rule screen: validate the approval rule ranges added for non monetary
  * @return: true/false
  */
  validateApprovalRulesNonMonAAR : function(){
    var isValid = true;
    if(this.view.imgRuleCheckboxAAR.src === this.AdminConsoleCommonUtils.checkboxSelected){
      isValid = (this.view.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition") ||
                this.view.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers")) ? false : true;
      this.view.lblIconApprovalCondError.setVisibility(!isValid);
    }
    return isValid;
  },
  /*
  * Approval rule screen: map approval rules data for segment in edit flow
  * @param: limits data of approval rule row, is single  row(true/false)
  */
  mapApprovalRuleRowMonForEdit : function(limitsData, isSingleRow){
    var rangeType ="", newRowToAdd={};
    var configType = this.getSelectedApprovalConfigValue().id;
    if(parseInt(limitsData.lowerlimit) === -1) rangeType = "UPTO";
    else if(parseInt(limitsData.upperlimit) === -1) rangeType = "ABOVE";
    else if((parseInt(limitsData.lowerlimit) !== -1) && (parseInt(limitsData.upperlimit) !== -1)) rangeType = "BETWEEN";
    if(rangeType === "UPTO"){
      newRowToAdd = this.mapApprovalRuleDefaultRowData(1);
      newRowToAdd.tbxSingleRangeValue.text = limitsData.upperlimit;
      var lstBoxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmComapnies.SelectRangeType")],["UPTO","Upto"]];
      newRowToAdd.lstBoxRangeType.masterData = lstBoxData;
      newRowToAdd.lstBoxRangeType.selectedKey = "UPTO";
      var isApprovalRequired = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
          this.checkApprovalRequiredSG(limitsData.groupRule) : this.checkApprovalRequiredUser(limitsData.approvalRuleId);
      if(isApprovalRequired === true){
        newRowToAdd.flxAddApprovalCond.isVisible = true;
        newRowToAdd.lblApprovalCondNA.isVisible = false;
        newRowToAdd.imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
        newRowToAdd.lblAddApprovalCondition.text = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
          kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition") : kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
      }
    } else if(rangeType === "ABOVE"){
      var opt = isSingleRow === true ? 1: 2;
      newRowToAdd = this.addAboveRangeTypeRowAAR(opt);
      newRowToAdd.lblAddApprovalCondition.text =(configType === this.approvalConfigType.SIGNATORY_GROUP) ?
        kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition") : kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
      newRowToAdd.tbxSingleRangeValue.text = limitsData.lowerlimit;
      var isApprovalReq = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
          this.checkApprovalRequiredSG(limitsData.groupRule) : this.checkApprovalRequiredUser(limitsData.approvalRuleId);
      newRowToAdd.flxAddApprovalCond.isVisible = isApprovalReq === true ? true : false;
      newRowToAdd.lblApprovalCondNA.isVisible = isApprovalReq === true ? false : true;
      if(isSingleRow){ //enable ABOVE row
        newRowToAdd.flxAddRuleOption.isVisible = true;
        newRowToAdd.flxDeleteRule.isVisible = true;
        newRowToAdd.flxApprovalCheckbox.enable = true;
        newRowToAdd.imgCheckbox.src = isApprovalReq === true ? this.AdminConsoleCommonUtils.checkboxSelected:
                                      this.AdminConsoleCommonUtils.checkboxnormal;
      }
    } else if (rangeType === "BETWEEN"){
      newRowToAdd = this.addBetweenRangeTypeRowAAR();
      newRowToAdd.flxAddRuleOption.isVisible = false;
      newRowToAdd.lblAddApprovalCondition.text = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
          kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition") : kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
      newRowToAdd.tbxFromRangeValue.text = limitsData.lowerlimit;
      newRowToAdd.tbxToRangeValue.text = limitsData.upperlimit;

    }
    
    if(configType === this.approvalConfigType.SIGNATORY_GROUP){
      newRowToAdd.lblAddApprovalCondition.info.sgLevel = {"groupList":limitsData.groupList,"groupRule":limitsData.groupRule};
    }else{
      var apprList = limitsData.approvers;
      var selApprovers = this.getApproversArrayForAction(apprList);
      newRowToAdd.lblAddApprovalCondition.info.userLevel = {"approverList":selApprovers,"approvalCount": this.getCountForApprovalCountCode(limitsData.approvalRuleId)};
    }
    return newRowToAdd;
  },
  /*
  * get approvers array for add/edit approval rues
  * @param: approvers array of action
  * @return: aaray of approver id's([{"approverId":""}])
  */
  getApproversArrayForAction : function(approversList){
    var selApprovers = [];
    for(var i=0; i<approversList.length; i++){
      if(approversList[i].approverId || approversList[i].approverName)
        selApprovers.push({"approverId": approversList[i].approverId});
    }
    return selApprovers;
  },
  /*
  * Approval rule screen: show tooltip on hover of add range icon
  */
  onAddRangeAddCondHover: function(widget, context){
    var rowInd = context.rowIndex;
    var segData = this.view.segAddApprovalRuleAAR.data;
    var heightVal= 60;
    for (var i = 0; i < rowInd; i++) {
      heightVal = heightVal + this.segAAR_ROW_FRAMES[i].height;
    }
    var scrollOffset = this.view.segAddApprovalRuleAAR.contentOffsetMeasured.y;
    heightVal = heightVal + 43 - scrollOffset;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) { 
        this.view.flxAddRangeTooltip.top = heightVal + "dp";
        this.view.flxAddRangeTooltip.right = "75dp";
        this.view.flxAddRangeTooltip.setVisibility(true);      
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        this.view.flxAddRangeTooltip.setVisibility(false);
    }
    this.view.forceLayout();
  },
   /*
  * Approval rule screen: toggle approval required image for non monetary action
  */
  onApprovalRequiredNonMonClick : function(){
    var configType = this.getSelectedApprovalConfigValue().id;
    this.view.lblAddApprovalCondition.text = (configType === this.approvalConfigType.SIGNATORY_GROUP) ?
                                 kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition"):kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers");
    this.view.lblAddApprovalCondition.info.sgLevel = {"groupList":"","groupRule":""};
    this.view.lblAddApprovalCondition.info.userLevel = {"approverList":[],"approvalCount": "0"};
    this.view.lblIconApprovalCondError.setVisibility(false);
    if(this.view.imgRuleCheckboxAAR.src === this.AdminConsoleCommonUtils.checkboxnormal){
      this.view.imgRuleCheckboxAAR.src = this.AdminConsoleCommonUtils.checkboxSelected;
      this.view.flxAddApprovalCondAAR.setVisibility(true);
      this.view.lblApprovalCondNA.setVisibility(false);
    } else{
      this.view.imgRuleCheckboxAAR.src = this.AdminConsoleCommonUtils.checkboxnormal; 
      this.view.flxAddApprovalCondAAR.setVisibility(false);
      this.view.lblApprovalCondNA.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: show confirmation popup for add/update customer approval rule
  */
  showAddApprovalRuleConfirmPopup : function(){
    var scopeObj = this;
    var configType = this.getSelectedApprovalConfigValue().id;
    this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ConfirmChanges");
    this.view.suspendFeaturePopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.width = "93%";
    if (this.view.lblCustomerNameAAR.info.isAccountActionLevel === "1"){      
      this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.AccountLevelMsg1") + kony.i18n.getLocalizedString("i18n.frmCompanies.AccountLevelMsg2");       
    }else{
      this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.CIFLevelMsg1") + kony.i18n.getLocalizedString("i18n.frmCompanies.CIFLevelMsg2");
    }
    //this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovalRulePopupMsg1") +
    //  "\""+this.view.lblCustomerNameAAR.text +"\""+"?"+ kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovalRulePopupMsg2") ;
    this.view.flxSuspendFeaturePopup.setVisibility(true);
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function() {
      scopeObj.onClickSaveApprovalRules();
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: on create/update approval button click
  */
  onClickSaveApprovalRules : function(){
    var action = this.view.commonButtonsAAR.btnSave.info.action;
    var actionType = this.view.lblCustomerNameAAR.info.actionType;
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.createEditApprovalRuleMon(action);
      this.hideAddApprovalRuleScreen();   
    }else if (actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      this.createEditApprovalRuleNonMon(action);
      this.hideAddApprovalRuleScreen();      
    }
  },
  /*
  * Approval rule screen: form input payload for create/edit approval rule for monetary action
  * @param:action(create/edit)
  */
  createEditApprovalRuleMon : function(action){
    var details = this.view.lblCustomerNameAAR.info.payloadDetails;
    var actionData = this.view.lblCustomerNameAAR.info.actionData;
    var ruleSegData = this.view.segAddApprovalRuleAAR.data;
    var limits = [];
    var config = this.getSelectedApprovalConfigValue().id;
    for(var i=0; i<ruleSegData.length; i++){
      var limitObj = {
        "lowerlimit":"-1.00",
        "upperlimit":"-1.00"
      };
      var rangeType = ruleSegData[i].lstBoxRangeType.selectedKey;
      if(rangeType === "ABOVE"){
        limitObj.lowerlimit = ruleSegData[i].tbxSingleRangeValue.text;
      } else if(rangeType === "UPTO"){
        limitObj.upperlimit = ruleSegData[i].tbxSingleRangeValue.text;
      }else if(rangeType === "BETWEEN"){
        limitObj.lowerlimit = ruleSegData[i].tbxFromRangeValue.text;
        limitObj.upperlimit = ruleSegData[i].tbxToRangeValue.text;
      }
      if(config === this.approvalConfigType.SIGNATORY_GROUP){ 
        if(ruleSegData[i].flxAddApprovalCond.isVisible === true){
          limitObj["groupList"] = ruleSegData[i].lblAddApprovalCondition.info.sgLevel.groupList;
          limitObj["groupRule"] = ruleSegData[i].lblAddApprovalCondition.info.sgLevel.groupRule;
        }else{
          var noApprovaRule = this.getDefaultNoApprovalCondAAR();
          limitObj["groupList"] = noApprovaRule.groupList;
          limitObj["groupRule"] = noApprovaRule.groupRule;
        }
      } else if(config === this.approvalConfigType.USER){
        var approvers =  ruleSegData[i].lblAddApprovalCondition.info.userLevel.approverList || [];
        var approvalCount = ruleSegData[i].lblAddApprovalCondition.info.userLevel.approvalCount || "0";
        limitObj["approvalruleId"] = this.getApprovalCountCode(approvalCount);
        limitObj["approvers"] = approvers;
        limitObj["numberOfApprovals"]= parseInt(ruleSegData[i].lblAddApprovalCondition.info.userLevel.approvalCount);
      }
      limits.push(limitObj);
    }
    var reqParam = Object.assign({},details);
    reqParam["limits"] = limits;
    if(action === "CREATE"){
      this.callCreateApprovalRule(reqParam,config,actionData.actionName);     
    } else if(action === "EDIT"){
      this.callEditApprovalRule(reqParam,config,actionData.actionName,false);
    } 
  },
  /*
  * Approval rule screen: form input payload for create/edit approval rule for non-monetary action
  * @param:action(create/edit)
  */
  createEditApprovalRuleNonMon : function(action){
    var details = this.view.lblCustomerNameAAR.info.payloadDetails;
    var actionData = this.view.lblCustomerNameAAR.info.actionData;
    var config = this.getSelectedApprovalConfigValue().id;
    var limits =[];
    var limitObj = {
      "lowerlimit":"-1.00",
      "upperlimit":"-1.00"
    };
    if(config === this.approvalConfigType.SIGNATORY_GROUP){ 
      if(this.view.flxAddApprovalCondAAR.isVisible === true){
        limitObj["groupList"] = this.view.lblAddApprovalCondition.info.sgLevel.groupList;
        limitObj["groupRule"] = this.view.lblAddApprovalCondition.info.sgLevel.groupRule;
      }else{
        var noApprovaRule = this.getDefaultNoApprovalCondAAR();
        limitObj["groupList"] = noApprovaRule.groupList;
        limitObj["groupRule"] = noApprovaRule.groupRule;
      }
    } else if(config === this.approvalConfigType.USER){
      var approvers =  this.view.lblAddApprovalCondition.info.userLevel.approverList || [];
      var approvalCount = this.view.lblAddApprovalCondition.info.userLevel.approvalCount || "0";
      limitObj["approvalruleId"] = this.getApprovalCountCode(approvalCount);
      limitObj["approvers"] = approvers;
      limitObj["numberOfApprovals"]= parseInt(this.view.lblAddApprovalCondition.info.userLevel.approvalCount);
    }
    limits.push(limitObj);
    var reqParam = Object.assign({},details);
    reqParam.limitTypeId = "NON_MONETARY_LIMIT";
    reqParam["limits"] = limits;
    if(action === "CREATE"){
      this.callCreateApprovalRule(reqParam,config,actionData.actionName);     
    } else if(action === "EDIT"){
      this.callEditApprovalRule(reqParam,config,actionData.actionName,false);
    } 
  },
  /*
  * Approval rule screen: call create approval rule service
  * @param: input payload, config type, selected action name
  */
  callCreateApprovalRule : function(payload,config,actionName){
    var featureCardId = this.view.commonButtonsAAR.btnSave.info.featureCardId;
    if(config === this.approvalConfigType.SIGNATORY_GROUP){
      this.presenter.createApprovalRuleSGLevel(payload, actionName, featureCardId);
    } else if(config === this.approvalConfigType.USER){
      this.presenter.createApprovalRuleUserLevel(payload, actionName,featureCardId);
    }
  },
  /*
  * Approval rule screen: call edit approval rule service
  * @param: input payload, config type, selected action name,isDelete(true/false)
  */
  callEditApprovalRule : function(payload,config,actionName,isDelete){
    var featureCardId = this.view.commonButtonsAAR.btnSave.info.featureCardId;
    if(config === this.approvalConfigType.SIGNATORY_GROUP){
      this.presenter.updateApprovalRuleSGLevel(payload, actionName,isDelete, featureCardId);
    } else if(config === this.approvalConfigType.USER){
      this.presenter.updateApprovalRuleUserLevel(payload, actionName, isDelete,featureCardId);
    }
  },
  /*
  * Approval rule screen: update the selected customer/accounts approval matrix data
  * @param: approval matrix of contract and cif
  */
  updateApprovalMatrixAfterCreate : function(approvalsResponse){
    var approvalsData = approvalsResponse.approvalMatrixOfCif;
    var isAccLevel = approvalsResponse.isAccountLevel;
    var featureCardId = approvalsResponse.featureCardId;
    var selCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var limitTypes = approvalsData.common ? approvalsData.common.limitTypes : [];
    var custFeatures = this.getFormattedApprovalFeaturesAM(limitTypes);
    var custAccounts = this.getApprovalsForAccountLevel(approvalsData.accounts || []);
    var customerInfo = this.view.customerDropdownAM.info.customerLevelInfo[selCustId];
    //update the features,accounts data in the info's
    customerInfo.features = custFeatures;
    customerInfo.accounts = custAccounts;
    this.view.accountsDropdownAM.info.acccountLevelInfo[selCustId] = JSON.parse(JSON.stringify(custAccounts));
    var featureId = this.view[featureCardId].lblFeatureName.info.featureId;
    if(isAccLevel === false){
      this.showApprovalMatrixCustomerLevel(false);
      this.setCustomerDetailsForApprovalCard();
      this.view[featureCardId].segFeatureActions.info.featureActionsJson = custFeatures[featureId];
      this.setFeatureCardDataAM(this.view[featureCardId],custFeatures[featureId]);
      this.setActionsSegDataAM(this.view[featureCardId],1,custFeatures[featureId]);
    } else if(isAccLevel === true){
      var selAccId = this.view.accountsDropdownAM.lblSelectedValue.info.selectedId
      var selCustAcc = this.view.accountsDropdownAM.info.acccountLevelInfo ? 
          this.view.accountsDropdownAM.info.acccountLevelInfo[selCustId] : [];
      var accApprovalsData = {};
      for(var j=0; j<selCustAcc.length; j++){
        if(selCustAcc[j].accountId === selAccId){
          accApprovalsData = selCustAcc[j];
          break;
        }
      }
      var accLevelFeatures = accApprovalsData.features ?  accApprovalsData.features: {};
      var featuresKeys = Object.keys(accLevelFeatures);
      this.view[featureCardId].segFeatureActions.info.featureActionsJson = accLevelFeatures[featureId];
      this.setFeatureCardDataAM(this.view[featureCardId], accLevelFeatures[featureId]);
      this.setActionsSegDataAM(this.view[featureCardId],2, accLevelFeatures[featureId]);
    }
    this.view.forceLayout();
  },
  /*
  * Approval rule screen: delete approval rules
  */
  showDeleteARConfirmPopup : function(){
    var scopeObj = this;
    var configType = this.getSelectedApprovalConfigValue().id;
    var actionName = this.view.lblCustomerNameAAR.info.actionData.actionName;
    var customerText = this.view.customerDropdownAM.lblSelectedValue.info.selectedName + " (" + this.view.customerDropdownAM.lblSelectedValue.info.selectedId +")";
    this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.DeleteApprovalRule");
    this.view.suspendFeaturePopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.width = "93%";
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.DeleteApprovalRuleMsg1") +
      "\""+actionName +"\""+ " under "+customerText +"?"+ kony.i18n.getLocalizedString("i18n.frmCompanies.DeleteApprovalRuleMsg2") ;
    this.view.flxSuspendFeaturePopup.setVisibility(true);
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function() {
      scopeObj.deleteApprovalRuleAAR();
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * add approval rule: delete approval rule for action
  */
  deleteApprovalRuleAAR : function(){
    var details = this.view.lblCustomerNameAAR.info.payloadDetails;
    var actionData = this.view.lblCustomerNameAAR.info.actionData;
    var actionType = this.view.lblCustomerNameAAR.info.actionType;
    var config = this.getSelectedApprovalConfigValue().id;
    var limits =[];
    var limitObj = {
      "lowerlimit":"-1.00",
      "upperlimit":"-1.00"
    };
    if(config === this.approvalConfigType.SIGNATORY_GROUP){
      limitObj["groupList"]="[]";
      limitObj["groupRule"]="[]";
    } else {
      limitObj["approvalruleId"] = "NO_APPROVAL";
      limitObj["approvers"] = [];
      limitObj["numberOfApprovals"] = 0;
    }
    limits.push(limitObj);
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      details.limitTypeId = "NON_MONETARY_LIMIT";
    }
    var reqParam = Object.assign({},details);
    reqParam["limits"] = limits;
    this.callEditApprovalRule(reqParam,config,actionData.actionName,true);
    this.hideAddApprovalRuleScreen();
  },
 /*
  * view approvers popup: show popup
  * @param: parent featurecard name, eventobj
  */
  showViewApproversListPopup : function(featureCardId, eventObj){
    var selSec = eventObj.rowContext.sectionIndex;
    var rowInd = eventObj.rowContext.rowIndex;
    var viewType = this.view[featureCardId].segFeatureActions.data[selSec][0].viewType;
    var actionType = this.view[featureCardId].segFeatureActions.data[selSec][0].actionType;
    var configType = this.getSelectedApprovalConfigValue().id;
    // customer level/account level
    if(viewType === 1){
      this.view.lblDetailsHeadingAMP6.setVisibility(false);
      this.view.lblDetailsValueAMP6.setVisibility(false); 
      this.view.lblDetailsValueAMP5.setVisibility(false);
      this.view.flxDetailsValueAMP5.setVisibility(true);
      this.view.lblDetailsHeadingAMP3.text = kony.i18n.getLocalizedString("i18n.frmMfascenarios.Feature_CAP");
      this.view.lblDetailsHeadingAMP4.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type_Caps");
      this.view.lblDetailsHeadingAMP5.text = kony.i18n.getLocalizedString("i18n.frmComapnies.RANGE");
      this.view.flxDetailsValueAMP5.left = "35%";
    } else if (viewType === 2){
      this.view.lblDetailsHeadingAMP6.setVisibility(true);
      this.view.lblDetailsValueAMP5.setVisibility(true);
      this.view.flxDetailsValueAMP5.setVisibility(true);
      this.view.lblDetailsHeadingAMP3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER");
      this.view.lblDetailsHeadingAMP4.text = kony.i18n.getLocalizedString("i18n.frmMfascenarios.Feature_CAP");
      this.view.lblDetailsHeadingAMP5.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type_Caps");
      this.view.lblDetailsHeadingAMP6.text = kony.i18n.getLocalizedString("i18n.frmComapnies.RANGE");
      this.view.flxDetailsValueAMP5.left = "66%";
    }
    // monetary/non-monetary action
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.view.flxViewApproversRow2AMP.setVisibility(true);
      this.view.flxApproverListContAMP.top = "130dp";
      this.view.lblDetailsHeadingAMP5.setVisibility(true);
      //this.view.lblDetailsValueAMP5.setVisibility(true);
      this.view.flxDetailsValueAMP5.setVisibility(true);
    } else if (actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      this.view.flxViewApproversRow2AMP.setVisibility(viewType === 2);
      this.view.flxApproverListContAMP.top = viewType === 2 ? "130dp":"70dp";
      this.view.lblDetailsHeadingAMP5.setVisibility(false);
      this.view.lblDetailsValueAMP5.setVisibility(false);
      this.view.lblDetailsHeadingAMP6.setVisibility(false);
      this.view.lblDetailsValueAMP6.setVisibility(false);
      this.view.flxDetailsValueAMP5.setVisibility(false);
    }
    // config - signatory group/ users
    var rowsData = this.view[featureCardId].segFeatureActions.data[selSec][1];
    if(configType === this.approvalConfigType.SIGNATORY_GROUP){
      this.view.flxApproverHeaderSigGrpAMP.setVisibility(true);
      this.view.flxApproverHeaderUserAMP.setVisibility(false);
      this.view.flxListContSigGrpAMP.setVisibility(true);
      this.view.flxListContUsersRowAMP.setVisibility(false);
      this.createDynamicOrConditionRowsALP(rowsData[rowInd]);
    } else if(configType === this.approvalConfigType.USER){
      this.view.flxApproverHeaderSigGrpAMP.setVisibility(false);
      this.view.flxApproverHeaderUserAMP.setVisibility(true);
      this.view.flxListContSigGrpAMP.setVisibility(false);
      this.view.flxListContUsersRowAMP.setVisibility(true);
      this.setUsersViewApproverList(rowsData[rowInd]);
    }
    this.view.flxViewApproverListPopup.setVisibility(true);
    this.setViewApproverPopupDetails(this.view[featureCardId].segFeatureActions, eventObj.rowContext);

  },
  /*
  * view approvers popup: set details 
  * @param: source segment path, rowcontext
  */
  setViewApproverPopupDetails : function(segmentPath,rowContext){
    var segSectionData = segmentPath.data[rowContext.sectionIndex][0];
    var segRowData = segmentPath.data[rowContext.sectionIndex][1][rowContext.rowIndex];
    var viewType = segSectionData.viewType;
    var actionType = segSectionData.actionType;
    
    this.view.lblViewApproverSubHeading.text = this.getValueOrNull(segSectionData.actionData.actionName, kony.i18n.getLocalizedString("i18n.common.NA"));
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.view.lblDetailsValueAAR3.text = this.getValueOrNull(segSectionData.lbxTransactionType.selectedKey, kony.i18n.getLocalizedString("i18n.common.NA"));;
      this.view.lblIconApproverAction.text = this.currencyValue;
      this.view.flxIconApproverActionBg.skin = "sknflx1F844DRadius20px";
    } else if (actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      this.view.lblIconApproverAction.text = this.currencyValue;
      this.view.flxIconApproverActionBg.skin = "sknFlxBg9D301BRd20px";
    }
    
    this.view.lblDetailsValueAMP1.text = this.view.customerDropdownAM.lblSelectedValue.info.selectedName;
    this.view.lblDetailsValueAMP2.text = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    if(viewType === 1){ //customer level
      this.view.lblDetailsValueAMP3.text = this.getValueOrNull(segSectionData.actionData.featureName, kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAMP4.text = this.getValueOrNull(segSectionData.lbxTransactionType.selectedKeyValue[1], kony.i18n.getLocalizedString("i18n.common.NA"));
     // this.view.lblDetailsValueAMP5.text = this.getValueOrNull(segRowData.lblApprovalValue1.text, kony.i18n.getLocalizedString("i18n.common.NA"));      
    } else if (viewType === 2){ //account level
      this.view.lblViewApproverSubHeading.text = this.getValueOrNull(segSectionData.actionData.actionName, kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAMP3.text = this.view.accountsDropdownAM.lblSelectedValue.info.selectedId; 
      this.view.lblDetailsValueAMP4.text = this.getValueOrNull(segSectionData.actionData.featureName, kony.i18n.getLocalizedString("i18n.common.NA"));
      this.view.lblDetailsValueAMP5.text = this.getValueOrNull(segSectionData.lbxTransactionType.selectedKeyValue[1], kony.i18n.getLocalizedString("i18n.common.NA"));
     // this.view.lblDetailsValueAMP6.text = this.getValueOrNull(segRowData.lblApprovalValue1.text, kony.i18n.getLocalizedString("i18n.common.NA"));      
    }
    var apprRangeValues = segRowData.lblApprovalValue1.info.range;
    this.view.lblIconDetailsAMP52.text= this.currencyValue;
    this.view.lblIconDetailsAMP54.text= this.currencyValue;
    if(apprRangeValues[0] === "-" && actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){ //between range
      this.view.lblDetailsValAMP51.setVisibility(false);
      this.view.lblIconDetailsAMP52.setVisibility(true);
      this.view.lblIconDetailsAMP54.setVisibility(true);
      this.view.lblDetailsValAMP53.setVisibility(true);
      this.view.lblDetailsValAMP55.setVisibility(true);
      this.view.lblDetailsValAMP53.text = apprRangeValues[1];
      this.view.lblDetailsValAMP55.text = apprRangeValues[2];
    } else if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){//upto/above range
      this.view.lblDetailsValAMP51.setVisibility(true);
      this.view.lblIconDetailsAMP52.setVisibility(true);
      this.view.lblIconDetailsAMP54.setVisibility(false);
      this.view.lblDetailsValAMP53.setVisibility(true);
      this.view.lblDetailsValAMP55.setVisibility(false);
      this.view.lblDetailsValAMP51.text = apprRangeValues[0]+" ";
      this.view.lblDetailsValAMP53.text = apprRangeValues[0].indexOf(kony.i18n.getLocalizedString("i18n.frmCompanies.Upto")) >= 0 ? apprRangeValues[2] : apprRangeValues[1];
    }
    this.view.forceLayout();
  },
   /*
  * view approvers popup: set approvers list for user levell
  * @param: selected segment row data
  */
  setUsersViewApproverList : function(segRowData){
    var approvers = segRowData.approvers;
    var approversStr = "";
    for(var i=0; i<approvers.length; i++){
      approversStr = approversStr === "" ? approversStr + ""+approvers[i].approverName :  approversStr + ", "+approvers[i].approverName;
    }
    var approvalCount = this.approvalsCountMap[segRowData.approvalRuleId] || "";
    this.view.lblApproversUserRowValAMP1.text = approvalCount;
    this.view.lblApproversUserRowValAMP2.text = approversStr;
  },
  /*
  * view approvers popup: create dynamic rows
  * @param: selected segment row data
  */
  createDynamicOrConditionRowsALP :function(rowData){
    var rowId ="", conditionLblTopValue = [];
    var approversArr = this.getApproverCondFormatted(rowData.groupList,rowData.groupRule);
    var approversMaxLen = approversArr.length;
    this.view.flxListContSigGrpAMP.removeAll();
    for(var i=0; i<approversArr.length; i++){
      rowId = i< 10 ? "0"+i+"_" : i+"_";
      var flexConditionRow = this.view.flxOrCondRowAMPTemplate.clone(rowId);
      flexConditionRow.top = "0dp";
      flexConditionRow.isVisible = true;
      this.view.flxListContSigGrpAMP.add(flexConditionRow);
      this.view[rowId+"lblAppoverListCondition"].text = "Condition "+(i+1);
      var andCondContainerId = rowId+"flxDynamicAndRowsContAMP";
      this.createDynamicAndInnerRowsALP(andCondContainerId,rowId,approversArr[i]);
      var lblTopValue = this.view[rowId+"flxOrCondRowAMPTemplate"].frame.height/2;
      this.view[rowId+"lblAppoverListCondition"].top = lblTopValue-7+"dp";
      conditionLblTopValue.push(lblTopValue);
      if(i === approversMaxLen-1){  //hide the OR button,line for last row
        this.view[rowId+"btnOrCondAMP"].isVisible = false;
        this.view[rowId+"flxOrLineVerticalAMP"].isVisible = false;
        this.view[rowId+"lblOrLineHorAMP"].isVisible = true;
      }
      if(approversMaxLen === 1){ //hide lines,button in case of only on row
        this.view[rowId+"flxApproverOrCondCont"].isVisible = false;
      }
    }
    this.view.flxListContSigGrpAMP.info = {"topValues":conditionLblTopValue};
     var rowCont = this.view.flxListContSigGrpAMP.widgets();
    if(rowCont.length > 1){
       this.adjustOrButtonLinesApproverList();
    }
   
    this.view.forceLayout();
  },
  /*
  * view approvers popup: create dynamic rows in dynamic condition row 
  * @params: rows container widget name, parent rowid prefix
  */
  createDynamicAndInnerRowsALP : function(rowsContainerName,pidPrefix,andApprovers){
    var id ="",outerRowHeight =0;
    this.view[rowsContainerName].removeAll();
    var andApproversFiltered = andApprovers.filter(function(rec){
      if(rec.count !== "0")
        return rec;
    });
    for(var i=0; i<andApproversFiltered.length; i++){
      if(andApproversFiltered[i].count !== "0"){
        id = i< 10 ? "0"+i : i;
        id = pidPrefix+"_"+id;
        var flexAndCondRow = this.view.flxAndCondRowAMPTemplate.clone(id);
        flexAndCondRow.top = "0dp";
        flexAndCondRow.isVisible = true;
        outerRowHeight = outerRowHeight + 40;
        this.view[rowsContainerName].add(flexAndCondRow);
        var approvalText = parseInt(andApproversFiltered[i].count) === 1 ? kony.i18n.getLocalizedString("i18n.frmCompanies.approval") : kony.i18n.getLocalizedString("i18n.frmCompanies.approvals");
        this.view[id+"lblApproverValueAMP1"].text = kony.i18n.getLocalizedString("i18n.frmCompanies.Any")+" "+this.getTwoDigitNumber(andApproversFiltered[i].count)+
                                                          " " + approvalText;
        this.view[id+"lblApproverValueAMP2"].text = this.getApprovalSGNameForSGId(andApproversFiltered[i].groupId);
        if(i === andApproversFiltered.length-1){ // hide AND button,line for last row
          this.view[id+"btnApproverAndCondAMP"].isVisible = false;
          this.view[id+"flxAndCondLineVerticalAMP"].isVisible = false;
        }
        if(andApproversFiltered.length === 1){ // if only single row hide all
          flexAndCondRow.top ="9dp";
          this.view[id+"lblAndCondLineHorAMP"].isVisible = false;
          this.view[id+"btnApproverAndCondAMP"].isVisible = false;
          this.view[id+"flxAndCondLineVerticalAMP"].isVisible = false;
        }
      }
    }
    this.view[pidPrefix+"flxOrCondRowAMPTemplate"].height = outerRowHeight + 10 + "dp";
    this.view.forceLayout();
  },
  /*
  * view approvers popup: set the positions of or buttons, vertical lines for condition rows
  */
  adjustOrButtonLinesApproverList : function(){
    var topValues = this.view.flxListContSigGrpAMP.info.topValues;
    var parentRows = this.view.flxListContSigGrpAMP.widgets();
    var id = "";
    for(var i=0;i<parentRows.length;i++){
      id = (parentRows[i].id.split("_")[0])+"_";
      if(i < parentRows.length-1){
        var lineHeight = topValues[i] +topValues[i+1];
        this.view[id+"flxApproverOrCondCont"].height = lineHeight +"dp";
      }
      this.view[id+"flxApproverOrCondCont"].top = topValues[i] +"dp";
    }
    this.view.forceLayout();
  },
  /*
  * view approvers popup: convert approvers string to array
  * @param: groupList("[G1,G2]"), approvers cond string ("[[0,1],[2,1],[1,1]")
  * @returns: approvers array ([[{"groupId":"G1","count":"0"},{"groupId":"G2","count":"1"}],[{"groupId":"G1","count":"2"},{"groupId":"G2","count":"1"}]])
  */
  getApproverCondFormatted : function(groupList, approverCond){
    var approverArr = [], andCondArr = [],groupListArr =[];
    if(approverCond.length > 0){
      groupListArr = groupList.replace(/[\[\]\s]/g, "").split(",");
      var formattedApprvCond = JSON.stringify(JSON.parse(approverCond));//to remove any spacesin cond string
      if(formattedApprvCond.indexOf("],[") >=0){
        var approverOrCond = formattedApprvCond.split("],[");
         for(var i=0; i<approverOrCond.length; i++){
           andCondArr = this.getApproverAndCondFormatted(approverOrCond[i],groupListArr);
           approverArr.push(andCondArr);
        }
      } else{
        andCondArr = this.getApproverAndCondFormatted(formattedApprvCond,groupListArr);
        approverArr.push(andCondArr);
      } 
    }
    return approverArr;
  },
  /*
  * view approvers popup: convert approvers and cond string to array
  * @param: approvers and cond string ("[[0,1,2"/"2,1,0"), groupList([G1,G2,G3])
  * @returns: approvers array ([{"groupId":"G1","count":"0"},{"groupId":"G2","count":"1"}])
  */
  getApproverAndCondFormatted : function(approverOrCond, groupList){
    var andCondArr =[];
    var andCond = approverOrCond.replace(/[\[\]\s]/g, "").split(","); //get count of each approver
    for(var j=0; j<andCond.length ;j++){
      var andCondObj = {"groupId":groupList[j], "count":andCond[j]};
      andCondArr.push(andCondObj);
    }
    return andCondArr;
  },
  /*
  * view approvers popup: get the name of signatory group name for signatorygroup id approval matrix
  * @param: signatory group id
  * @param: signatory group name
  */
  getApprovalSGNameForSGId : function(signGroupId){
    var selectedCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var signatoryGroups = this.approvalsSGList[selectedCustId] || [];
    var signGroupName = "";
    for(var i=0; i<signatoryGroups.length ;i++){
      if(signatoryGroups[i].signatoryGroupId === signGroupId){
        signGroupName = signatoryGroups[i].signatoryGroupName;
        break;
      }
    }
    return signGroupName;
  },
  /*
  * fetch signatory groups or approvers list based on config
  */
  fetchSignGroupOrApprovers : function(){
    var configType = this.getSelectedApprovalConfigValue().id;
    if(configType === this.approvalConfigType.SIGNATORY_GROUP){
      var payload = {"contractId":this.completeContractDetails.id};
      this.presenter.getAllSignatoryGroups(payload,2);
    }
    else if(configType === this.approvalConfigType.USER){

    }

  },
  /*
  * format signatory groups response list per each cif
  * {"custid1":[//signGroups],"custid2":[]}
  */
  formatSignatoryGroupsListAM : function(signatoryGroupResponse){
    var allCustSGList = signatoryGroupResponse.coreCustomers ? signatoryGroupResponse.coreCustomers : [];
    var signatoryGroups = {};
    for(var i=0; i<allCustSGList.length; i++){
      signatoryGroups[allCustSGList[i].coreCustomerId] = allCustSGList[i].signatoryGroups;
    }
    this.approvalsSGList = signatoryGroups;
  },
  /*
  * add approval conditions popup : show popup at signatory group level
  * @param: eventObj(only for monetary type)
  */
  showAddApprovalCondSGPopup : function(eventObj){
    var popupHeading = kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition");
    var actionType = eventObj ? this.AdminConsoleCommonUtils.constantConfig.MONETARY : this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY;
    this.view.commonButtonsACP.btnSave.info = {"actionType":actionType,"config":""};
    this.view.flxAddApprovalConditionsPopup.setVisibility(true);
    var selectedCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var signatoryGroups = this.approvalsSGList[selectedCustId] || [];
    
    this.view.flxRuleRangeTooltipACP.setVisibility(false);
    this.view.flxDynamicRowsContACP.setVisibility(true);
    this.view.flxAddApprovalCondUserACP.setVisibility(false);
    this.view.flxDynamicRowsContACP.removeAll();  
    // monetary/non-monetary UI changes
    if(actionType ===this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.view.flxRangeContainerACP.setVisibility(true);
      this.view.flxDynamicRowsContACP.top ="70dp";
      this.view.flxAddApprovalCondUserACP.top ="70dp";
      var selRowData = this.view.segAddApprovalRuleAAR.data[eventObj.rowContext.rowIndex];
      var selRowGroupCond = selRowData.lblAddApprovalCondition.info.sgLevel;
      //add condition flow
      if(selRowData.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition")){
        this.insertDynamicApprovalCondCard(); 
      }  //edit conditions flow
      else{
        popupHeading = kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition");
        this.setApprovalConditionsOnEditClick(selRowGroupCond);
      }
    } else if(actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      this.view.flxRangeContainerACP.setVisibility(false);
      this.view.flxDynamicRowsContACP.top ="10dp";
      this.view.flxAddApprovalCondUserACP.top ="10dp";
      var currApprCond = this.view.lblAddApprovalCondition.info.sgLevel;
      //add condition flow
      if(this.view.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition")){
        this.insertDynamicApprovalCondCard(); 
      }  //edit conditions flow
      else{
        popupHeading = kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition");
        this.setApprovalConditionsOnEditClick(currApprCond);
      }
    }
    this.view.lblAddApprovalCondHeadingACP.text = popupHeading;
  },
  /*
  * add approval conditions popup :show popup at user level
  * @param: signatory groups of contract
  */
  showAddApprovalCondUserPopup : function(eventObj){
    var popupHeading = kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition");
    var actionType = eventObj ? this.AdminConsoleCommonUtils.constantConfig.MONETARY : this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY;
    this.view.commonButtonsACP.btnSave.info = {"actionType":actionType,"config":""};
    this.view.flxAddApprovalConditionsPopup.setVisibility(true);
    this.view.flxApprovalsSelErrorACP.setVisibility(false);
    this.view.flxApproversErrorACP.setVisibility(false);
    this.view.flxSelectedApproversACP.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.lstboxApprovalsACP.skin = "sknLbxborderd7d9e03pxradius";
    // monetary/non-monetary UI changes
    if(actionType ===this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.view.flxRangeContainerACP.setVisibility(true);
      this.view.flxDynamicRowsContACP.top ="70dp";
      this.view.flxAddApprovalCondUserACP.top ="70dp";
      var selRowData = this.view.segAddApprovalRuleAAR.data[eventObj.rowContext.rowIndex];
      popupHeading = selRowData.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers")?
        kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers") : kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
    } else if(actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      this.view.flxRangeContainerACP.setVisibility(false);
      this.view.flxDynamicRowsContACP.top ="10dp";
      this.view.flxAddApprovalCondUserACP.top ="10dp";
      popupHeading = this.view.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers") ?
        kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers") : kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers")
    }
    this.view.lblAddApprovalCondHeadingACP.text = popupHeading;
    this.view.flxDynamicRowsContACP.setVisibility(false);
    this.view.flxAddApprovalCondUserACP.setVisibility(true);
    this.setApproverUsersDropdown(actionType);
  },
  /*
  * add approval conditions popup : set range details
  * @param: selected segment row context
  */
  setAddApprovalConditionsDetails: function(eventObj){
    var selRowInd = eventObj.rowContext ? eventObj.rowContext.rowIndex : "0";
    var segData = this.view.segAddApprovalRuleAAR.data;
    var selRowData = segData[selRowInd];
    var apprRangeValues = this.getRangeTextSetForSelectedRowAAR(selRowData,1);
    this.view.lblIconRangeValueACP1.text= this.currencyValue;
    this.view.lblIconRangeValueACP2.text= this.currencyValue;
    if(apprRangeValues.includes("-")){ //between range
      this.view.lblRangeValueACP1.setVisibility(false);
      this.view.lblIconRangeValueACP1.setVisibility(true);
      this.view.lblIconRangeValueACP2.setVisibility(true);
      this.view.lblRangeValueACP2.setVisibility(true);
      this.view.lblRangeValueACP3.setVisibility(true);
      this.view.lblRangeValueACP2.text = apprRangeValues[0]+ " -";
      this.view.lblRangeValueACP3.text = apprRangeValues[2];
    } else {//upto/above range
      this.view.lblRangeValueACP1.setVisibility(true);
      this.view.lblIconRangeValueACP1.setVisibility(true);
      this.view.lblIconRangeValueACP2.setVisibility(false);
      this.view.lblRangeValueACP2.setVisibility(true);
      this.view.lblRangeValueACP3.setVisibility(false);
      this.view.lblRangeValueACP1.text = apprRangeValues[0]+" ";
      //this.view.lblRangeValueACP2.text = apprRangeValues[0].indexOf(kony.i18n.getLocalizedString("i18n.frmCompanies.Upto")) >= 0 ? apprRangeValues[2] : apprRangeValues[1];
      this.view.lblRangeValueACP2.text = apprRangeValues[1];
    }
    this.view.flxRangeValueACP.info ={"selRowIndex":selRowInd};
  },
  /*
  * add approval conditions popup : get range text for selected row
  * @param: selected row data, option(1 return arr/2 -return string)
  * @returns: range text value
  */
  getRangeTextSetForSelectedRowAAR : function(selRowData,option){
    var rangeText = "";
    var rangeType = selRowData.lstBoxRangeType.selectedKey;
    if(rangeType === "UPTO"){
      rangeText = kony.i18n.getLocalizedString("i18n.frmCompanies.Upto") + " "+
        (selRowData.tbxSingleRangeValue.text);
    }else if(rangeType === "ABOVE"){
      rangeText = kony.i18n.getLocalizedString("i18n.frmCompanies.Above") + " "+
       // this.convertToLocaleString(selRowData.tbxSingleRangeValue.text);
        (selRowData.tbxSingleRangeValue.text);
    } else if(rangeType === "BETWEEN"){
      //rangeText = this.convertToLocaleString(selRowData.tbxFromRangeValue.text) +" - "+
       // this.convertToLocaleString(selRowData.tbxToRangeValue.text);
      rangeText = (selRowData.tbxFromRangeValue.text) +" - "+
        (selRowData.tbxToRangeValue.text);
    }
    if(option === 1){
      return rangeText.split(" ");
    }else{
    return rangeText;
    }
  },
  /*
  * add approval conditions popup: create approval condition 'OR' cards
  * @returm: OR condition component reference
  */
  getDynamicOrCondWidgetACP : function(){
    var childWidgets = this.view.flxDynamicRowsContACP.widgets();
    var widLen = childWidgets.length;
    var num = widLen > 0 ? childWidgets[widLen-1].id.split("Z")[1] : "0";
    num = parseInt(num,10) +1;
    var id = num>10 ? num : "0"+num;
    var approvalOrCardToAdd = new com.adminConsole.contracts.addApprovalCondition({
      "id": "addApprovalCondAMZ" +id,
      "isVisible": true,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "left":"0dp",
      "top": "0dp"
    }, {}, {});
    approvalOrCardToAdd.btnConditionCount.text = "Condition " + num;
    approvalOrCardToAdd.flxConditionRemove.isVisible = (widLen > 0);
    approvalOrCardToAdd.flxAddNewCondOrCont.isVisible = true;
    approvalOrCardToAdd.flxOrTagContainer.isVisible = false;
    approvalOrCardToAdd.flxConditionRemove.onClick = this.removeAddApprovalOrCard.bind(this,approvalOrCardToAdd);
    approvalOrCardToAdd.btnOrCondition.onClick = this.insertDynamicApprovalCondCard;
    approvalOrCardToAdd.btnAndCondition.onClick = this.insertDynamicAndRowACP.bind(this,approvalOrCardToAdd);
    return approvalOrCardToAdd;
  },
  /*
  * add approval conditions popup: create approval condition 'AND' rows 
  * @returm: AND condition component reference
  */
  getDynamicAndCondWidgetACP : function(approvalCardToAdd){
    var childWidgets = approvalCardToAdd.flxApprovalDynamicRows.widgets();
    var widLen = childWidgets.length;
    //caluclate the value for id to suffix
    var num = widLen > 0 ? childWidgets[widLen-1].id.split("Z")[1] : "0";
    num = parseInt(num,10) +1;
    var id = num>10 ? num : "0"+ num;
    var approvalAndRowToAdd = new com.adminConsole.contracts.approvalConditionRow({
      "id": "approvalAndRowACZ" +id,
      "isVisible": true,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "left":"0dp",
      "top": "0dp"
    }, {}, {});
    approvalAndRowToAdd.flxApprovalCondPaddingCont.isVisible = true;
    approvalAndRowToAdd.flxAndConditionContainer.isVisible = false;
    approvalAndRowToAdd.flxDeleteOption.isVisible = (widLen > 0);
    return approvalAndRowToAdd;
  },
  /*
  * add approval conditions popup: insert add approval condition 'OR' cards
  */
  insertDynamicApprovalCondCard : function(){
    var childWidgets = this.view.flxDynamicRowsContACP.widgets();
    var widLen = childWidgets.length;
    var approvalCardToAdd = this.getDynamicOrCondWidgetACP();

    //show or tag flex for all previous conditions
    for(var i=0; i<widLen; i++){
      childWidgets[i].flxConditionRemove.isVisible = true;
      childWidgets[i].flxAddNewCondOrCont.setVisibility(false);
      childWidgets[i].flxOrTagContainer.setVisibility(true);
    }
    var selectedCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var signatoryGroups = this.approvalsSGList[selectedCustId] || [];
    approvalCardToAdd.info = {"signGroupList":signatoryGroups};
    this.view.flxDynamicRowsContACP.addAt(approvalCardToAdd,widLen+1);
    this.insertDynamicAndRowACP(approvalCardToAdd);
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: insert add approval 'AND' rows inside card compoent 
  * @param: approval card comp reference
  */
  insertDynamicAndRowACP : function(approvalCardToAdd){
    var childWidgets = approvalCardToAdd.flxApprovalDynamicRows.widgets();
    var widLen = childWidgets.length;
    var approvalRowToAdd = this.getDynamicAndCondWidgetACP(approvalCardToAdd);
    //show and tag flex for all previous rows
    for(var i=0; i<widLen; i++){
      childWidgets[i].flxDeleteOption.isVisible = true;
      childWidgets[i].flxApprovalCondPaddingCont.setVisibility(false);
      childWidgets[i].flxAndConditionContainer.setVisibility(true);
      childWidgets[i].flxAndConditionContainer.top = childWidgets[i].flxSignatroyGroupMessage.isVisible === true ? "-22dp":"0dp";
    }
    var lstboxData = this.getSGListboxDataApprCond(approvalCardToAdd);
    approvalRowToAdd.lstBoxSignatoyGroup.masterData = lstboxData;
    approvalRowToAdd.lstBoxSignatoyGroup.selectedKeyValue = lstboxData[0];
    //reset the count component UI
    approvalRowToAdd.plusMinusApprovals.tbxcharcterSize.text = "1";
    approvalRowToAdd.plusMinusApprovals.flxPlus.setVisibility(false);
    approvalRowToAdd.plusMinusApprovals.flxPlusDisable.setVisibility(true);
    approvalRowToAdd.plusMinusApprovals.flxPlus.focusSkin="sknflxffffffBorderLeftRound1293cc";
    approvalRowToAdd.plusMinusApprovals.flxMinus.focusSkin="sknflxffffffBorderRightRound1293cc";
    approvalCardToAdd.flxApprovalDynamicRows.addAt(approvalRowToAdd,widLen+1);
    this.updateRowsListboxDataAAC(approvalCardToAdd, approvalRowToAdd);
    this.initializeRowActionsAAC(approvalCardToAdd,approvalRowToAdd);   
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: assign action for the row component
  */
  initializeRowActionsAAC : function(approvalCondCard, approvalCondRow){
    var self =this;
    approvalCondRow.lstBoxSignatoyGroup.onSelection = function(){
       //reset count
      approvalCondRow.plusMinusApprovals.tbxcharcterSize.text = 1;
      approvalCondRow.plusMinusApprovals.flxPlus.setVisibility(false);
      approvalCondRow.plusMinusApprovals.flxPlusDisable.setVisibility(true);
      approvalCondRow.flxSignatroyGroupMessage.setVisibility(false);
      approvalCondRow.flxSignatoryGroupErrorMsg.setVisibility(false);
      approvalCondRow.flxAndConditionContainer.top = "0dp";
      self.updateRowsListboxDataAAC(approvalCondCard, approvalCondRow);
    };

    approvalCondRow.plusMinusApprovals.flxPlus.onClick = this.onCountPlusMinusClickAM.bind(this,approvalCondCard,approvalCondRow,1);
    approvalCondRow.plusMinusApprovals.flxMinus.onClick = this.onCountPlusMinusClickAM.bind(this,approvalCondCard,approvalCondRow,2);
    approvalCondRow.plusMinusApprovals.tbxcharcterSize.onKeyUp = this.onApproversSGCountKeyup.bind(this,approvalCondCard,approvalCondRow);
    approvalCondRow.flxDeleteOption.onClick = this.removeAddApprovalAndRowACP.bind(this,approvalCondCard,approvalCondRow);
  },
  /*
  * add approval conditions popup: update sign groups listbox master data for existing rows
  * @param: outer cont card ref, row card ref
  */
  updateRowsListboxDataAAC : function(approvalCard, approvalAndRow){
    var childWidgets = approvalCard.flxApprovalDynamicRows.widgets();
    //get update lstbox list to set it to previous rows
    var updatedListboxData = this.getSGListboxDataApprCond(approvalCard);
    for(var i=0; i<childWidgets.length; i++){
      var selectedKeyValue = childWidgets[i].lstBoxSignatoyGroup.selectedKeyValue || "";
      var finalData = selectedKeyValue ? [selectedKeyValue].concat(updatedListboxData) : updatedListboxData;
      if(finalData.length > 0){
        childWidgets[i].lstBoxSignatoyGroup.masterData = finalData;
        childWidgets[i].lstBoxSignatoyGroup.selectedKeyValue = finalData[0];
      }
    }
    approvalCard.flxAddNewConditionAnd.setVisibility(updatedListboxData.length > 0);
    approvalCard.flxConditionsBox.bottom = updatedListboxData.length <= 0 ? "20dp" : "0dp";
    this.validateApproversCountSG(approvalCard, approvalAndRow);
  },
  /*
  * add approval conditions popup: get the signatory groups list to be set to listbox in row
  * @param: outer card widget reference
  */
  getSGListboxDataApprCond : function(approvalCard){
    var allSignGroupList = approvalCard.info.signGroupList;
    var rowWidgets = approvalCard.flxApprovalDynamicRows.widgets();
    var assignedId =[], allIds=[], commonList=[],diffList=[] ;
    //get all sign group id's
    for (var i = 0; i < allSignGroupList.length; i++) {
      allIds.push(allSignGroupList[i].signatoryGroupId);
    }
    //all exsisting sign group id's
    for(var j=0; j<rowWidgets.length; j++){
      assignedId.push(rowWidgets[j].lstBoxSignatoyGroup.selectedKey);
    }
    //differentiate common and diff id's
    for (var k = 0; k < allIds.length; k++) {
      if (assignedId.includes(allIds[k])) {
        commonList.push(allIds[k]);
      } else {
        diffList.push(allIds[k]);
      }
    }
    var listboxData = this.mapSignGroupForListBox(allSignGroupList,diffList);
    return listboxData;
  },
  /* 
   * add approval conditions popup: function to return the required sign group in listbox masterdata format
   * @param: all sign group list, unselected sign group id list
   * @retrun:listbox master data sign group list
   */
  mapSignGroupForListBox: function(data,filteredList) {
    var finalList = [];
    for (var i = 0; i < data.length; i++) {
      if (filteredList.contains(data[i].signatoryGroupId)) {
        finalList.push([data[i].signatoryGroupId,data[i].signatoryGroupName]);
      }
    }
    return finalList;
  },
   /*
  * add approval conditions popup: remove approval condition card from flex
  * @param: approval card ref
  */
  removeAddApprovalOrCard : function(approvalCard){
    var allChildWid = this.view.flxDynamicRowsContACP.widgets();
    for(var i=0;i< allChildWid.length; i++){
      if(allChildWid[i].id === approvalCard.id){
        //hide the or button for previous card component
        if(i+1 === allChildWid.length){
          allChildWid[i-1].flxOrTagContainer.setVisibility(false);
          allChildWid[i-1].flxAddNewCondOrCont.setVisibility(true);
        }
        this.view.flxDynamicRowsContACP.removeAt(i);
        break;
      }  
    }
    //hide delete option if only one row remains
    var updateChildWid = this.view.flxDynamicRowsContACP.widgets();
    if(updateChildWid.length === 1){
      updateChildWid[0].flxConditionRemove.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: remove 'AND' condition row from approval card
  * @param: approval card ref, curr row ref
  */
  removeAddApprovalAndRowACP : function(approvalCard,approvalRowCard){
    var allChildWid = approvalCard.flxApprovalDynamicRows.widgets();
    for(var i=0;i< allChildWid.length; i++){
      if(allChildWid[i].id === approvalRowCard.id){
        //hide the and button for previous row component
        if(i+1 === allChildWid.length){
          allChildWid[i-1].flxAndConditionContainer.setVisibility(false);
          allChildWid[i-1].flxApprovalCondPaddingCont.setVisibility(true);
        }
        approvalCard.flxApprovalDynamicRows.removeAt(i);
        break;
      }  
    }
    //remove reference from parent component
    if(approvalCard[approvalRowCard.id])
        delete approvalCard[approvalRowCard.id];
    this.updateRowsListboxDataAAC(approvalCard,approvalRowCard);
    //hide delete option if only one row remains
    var updateChildWid = approvalCard.flxApprovalDynamicRows.widgets();
    if(updateChildWid.length === 1){
      updateChildWid[0].flxDeleteOption.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: on no of approvers plus/minus click, validate approvers count
  * @param: approvalCondCard ref, approvalAndRow ref,option(1-minus/2-plus)
  */
  onCountPlusMinusClickAM : function(approvalCondCard,approvalAndRow,option){
    if(option === 1){
      approvalAndRow.decrementValue();
    } else {
      approvalAndRow.incrementValue();
    }
    this.validateApproversCountSG(approvalCondCard,approvalAndRow);
  },
  /*
  * add approval conditions popup: on no of approvers plus/minus click, validate approvers count
  * @param: approvalCondCard ref, approvalAndRow ref
  */
  onApproversSGCountKeyup : function(approvalCondCard,approvalAndRow){
    var value = approvalAndRow.plusMinusApprovals.tbxcharcterSize.text;
    if(value){
      value = parseInt(value,10);
      approvalAndRow.plusMinusApprovals.flxPlus.setVisibility(value > 1);
      approvalAndRow.plusMinusApprovals.flxPlusDisable.setVisibility(!(value > 1));
      this.validateApproversCountSG(approvalCondCard,approvalAndRow);
    }
  },
  /*
  * add approval conditions popup: validate approvers count with sign group users
  * @param: approvalCondCard ref, approvalAndRow ref
  */
  validateApproversCountSG : function(approvalCondCard,approvalAndRow){
    var selLstbxSG = approvalAndRow.lstBoxSignatoyGroup.selectedKey;
      if(selLstbxSG !== "SELECT"){
        var allSignGroup = approvalCondCard.info.signGroupList;
        var signDetails = allSignGroup.filter(function(rec){
          return rec.signatoryGroupId === selLstbxSG;
        });
        var signGroupUsers = signDetails.length > 0 ? (signDetails[0].noOfUsers ? signDetails[0].noOfUsers: "0"):"0";
        var count = approvalAndRow.plusMinusApprovals.tbxcharcterSize.text;
        if(parseInt(count) > parseInt(signGroupUsers)){
          approvalAndRow.flxSignatoryGroupErrorMsg.setVisibility(false);
          approvalAndRow.flxSignatroyGroupMessage.setVisibility(true);
          approvalAndRow.flxAndConditionContainer.top = "-22dp";
        }else{
          approvalAndRow.flxSignatroyGroupMessage.setVisibility(false);
          approvalAndRow.flxAndConditionContainer.top = "0dp";
        }
        this.view.forceLayout();
      }
  },
  /*
  * add approval conditions popup: set approval condtion for editing
  * @param:{"groupList":"","groupRule":""}
  */
  setApprovalConditionsOnEditClick : function(currRowApprCond){
    var selectedCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var signatoryGroups = this.approvalsSGList[selectedCustId] || [];
    var formattedGroupRule = this.getApproverCondFormatted(currRowApprCond.groupList, currRowApprCond.groupRule);
    var orCardWidgets = this.view.flxDynamicRowsContACP.widgets();
    //OR cards
    for(var i=0; i<formattedGroupRule.length; i++){
      var approvalOrCondWid = this.getDynamicOrCondWidgetACP();
      this.view.flxDynamicRowsContACP.addAt(approvalOrCondWid,orCardWidgets.length+1);
      approvalOrCondWid.info = {"signGroupList":signatoryGroups};
      var lstboxData = this.getSGListboxDataApprCond(approvalOrCondWid);
      var andCondArr = formattedGroupRule[i];
      var andRowWidgets = approvalOrCondWid.flxApprovalDynamicRows.widgets();
      //filter and conditions rows
      var filteredAndCond = [];
      for(var k=0; k<andCondArr.length; k++){
        if(andCondArr[k].count !== "0"){
          filteredAndCond.push(andCondArr[k]);
        }
      }
      //AND rows
      for(var j=0; j<filteredAndCond.length; j++){
        var approvalAndCondWid = this.getDynamicAndCondWidgetACP(approvalOrCondWid);
        this.initializeRowActionsAAC(approvalOrCondWid,approvalAndCondWid);
        approvalAndCondWid.flxDeleteOption.setVisibility(filteredAndCond.length >1);
        approvalAndCondWid.lstBoxSignatoyGroup.masterData = lstboxData;
        approvalAndCondWid.lstBoxSignatoyGroup.selectedKey = filteredAndCond[j].groupId;
        approvalAndCondWid.plusMinusApprovals.tbxcharcterSize.text = filteredAndCond[j].count;
        approvalAndCondWid.plusMinusApprovals.flxPlus.setVisibility(parseInt(filteredAndCond[j].count) > 1);
        approvalAndCondWid.plusMinusApprovals.flxPlusDisable.setVisibility(parseInt(filteredAndCond[j].count) <= 1);
        approvalOrCondWid.flxApprovalDynamicRows.addAt(approvalAndCondWid,andRowWidgets.length+1);
      }
      this.updateRowsListboxDataAAC(approvalOrCondWid,approvalAndCondWid);
      //show and tag flex for all previous rows
      for(var m=0; m<andRowWidgets.length -1; m++){
        andRowWidgets[m].flxApprovalCondPaddingCont.setVisibility(false);
        andRowWidgets[m].flxAndConditionContainer.setVisibility(true);
        this.validateApproversCountSG(approvalOrCondWid,andRowWidgets[m]);
      }
    }
    //show or tag flex for all previous conditions
    for(var n=0; n<orCardWidgets.length -1; n++){
      orCardWidgets[n].flxAddNewCondOrCont.setVisibility(false);
      orCardWidgets[n].flxOrTagContainer.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * show tooltip to add approval condition on checkbox selection in user config
  */
  onApprovalReqCheckboxClick : function(){
    var checkboxImg = this.view.imgRuleCheckboxAAR.src;
    var imgToSet = checkboxImg === this.AdminConsoleCommonUtils.checkboxnormal ? this.AdminConsoleCommonUtils.checkboxSelected :this.AdminConsoleCommonUtils.checkboxnormal;
    this.view.imgRuleCheckboxAAR.src = imgToSet;
    if(imgToSet === this.AdminConsoleCommonUtils.checkboxSelected){
      this.view.flxAddConditionAARTooltip.setVisibility(true);
      var flxLeft = this.view.lblSingleRuleHeadingAAR2.frame.x;
      var flxTop = this.view.flxSingleRuleContAAR.frame.y + this.view.flxSingleRuleRowAAR.frame.y + 
                   this.view.flxAddApprovalCondAAR.frame.y + this.view.flxAddApprovalCondAAR.frame.height +5;
      this.view.flxAddConditionAARTooltip.top = flxTop+"dp";
      this.view.flxAddConditionAARTooltip.left = flxLeft +"dp";
    }
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: validate the selected signatory group values
  * @params: configtype(user/signgroup)
  * @returns: true/false
  */
  validateApprovalCondACP : function(configType){
    var isValid = true;
    if(configType === this.approvalConfigType.SIGNATORY_GROUP){
      var andCondCont = this.view.flxDynamicRowsContACP.widgets();
      for(var i=0; i<andCondCont.length; i++){
        var rowsCont = andCondCont[i].flxApprovalDynamicRows.widgets();
        for(var j=0; j<rowsCont.length; j++){
          if(rowsCont[j].lstBoxSignatoyGroup.selectedKey === null || rowsCont[j].lstBoxSignatoyGroup.selectedKey === undefined ||
             rowsCont[j].lstBoxSignatoyGroup.selectedKey === ""){
            rowsCont[j].lstBoxSignatoyGroup.skin = "sknLstBoxeb3017Bor3px";
            rowsCont[j].flxSignatoryGroupErrorMsg.setVisibility(true);
            return false;
          }
        }
      }
    } 
    else if(configType === this.approvalConfigType.USER){
      var approvalsCount = this.view.lstboxApprovalsACP.selectedKey;
      var approversSel = this.view.filterMenuApproversACP.segStatusFilterDropdown.info.selUsers;
      if(approvalsCount === "SELECT"){
        this.view.lstboxApprovalsACP.skin = "sknLstBoxeb3017Bor3px";
        this.view.flxApprovalsSelErrorACP.setVisibility(true);
        this.view.lblApprovalSelErrMsgACP.text = kony.i18n.getLocalizedString("i18n.frmCompanies.PleaseSelectNoOfApprovals");
        isValid = false;
      } else if(approversSel.length === 0){
        isValid = false;
        this.view.lblApproversErrMsgACP.text = kony.i18n.getLocalizedString("i18n.frmCompanies.PleaseSelectApprovers");
        this.view.flxSelectedApproversACP.skin= "sknFlxCalendarError";
        this.view.flxApproversErrorACP.setVisibility(true);
      } else {
        var allApprovers = this.view.filterMenuApproversACP.segStatusFilterDropdown.info.usersList ? this.view.filterMenuApproversACP.segStatusFilterDropdown.info.usersList.length : "0";
        var count = approvalsCount === "ALL" ? "0" : this.getCountForApprovalCountCode(approvalsCount);
        if(approversSel.length < parseInt(count)){
          isValid = false;
          this.view.lblApproversErrMsgACP.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Minimum")+" "+ count +kony.i18n.getLocalizedString("i18n.frmCompanies.approvershasToBeSelected");
          this.view.flxSelectedApproversACP.skin= "sknFlxCalendarError";
          this.view.flxApproversErrorACP.setVisibility(true);
        }
      }
    }
    return isValid;
  },
  /*
  * add approval conditions popup: save the approval conditions added for a range signatory group level
  * @param: action type(monetary/non-monetary)
  */
  saveApprovalConditionsSGACP : function(actionType){
    var condition = {"groupList":"","groupRule":""};
    var toastMsg = "",addUpdateText = "";
    var approvalCond = this.getApprovalCondAddedList();
    condition.groupList = approvalCond.groupList;
    condition.groupRule = approvalCond.groupRule;
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      var selRowInd = this.view.flxRangeValueACP.info.selRowIndex;
      var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
      var rangeText = this.getRangeTextSetForSelectedRowAAR(selRowData, 2);
      addUpdateText = selRowData.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition") ?
                   kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenAddedSuccessfully"): kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenUpdatedSuccessfully");
      selRowData.lblIconApprovalCondError.isVisible = false;
      selRowData.lblAddApprovalCondition.info.sgLevel = condition;
      selRowData.lblAddApprovalCondition.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition");
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
      toastMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalConditionForRange") + rangeText + addUpdateText;
    } 
    else if(actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      var actionData = this.view.lblCustomerNameAAR.info.actionData;
       addUpdateText = this.view.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmComapnies.AddCondition") ?
                   kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenAddedSuccessfully"): kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenUpdatedSuccessfully");
      this.view.lblIconApprovalCondError.setVisibility(false);
      this.view.lblAddApprovalCondition.info.sgLevel = condition;
      this.view.lblAddApprovalCondition.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EditCondition");
      toastMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalConditionForAction") + "\"" +
         actionData.actionName + "\"" + addUpdateText;
    }
    this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),toastMsg);
    this.view.flxAddApprovalConditionsPopup.setVisibility(false);
  },
  /*
  * add approval conditions popup: save the approval conditions added for a range at user level
  * @param: action type(monetary/non-monetary)
  */
  saveApprovalConditionsUserACP : function(actionType){
    var condition = {};
    var toastMsg = "",addUpdateText = "", approvers =[];
    var selApprovers = this.view.filterMenuApproversACP.segStatusFilterDropdown.info.selUsers;
    var approvalCount = this.getCountForApprovalCountCode(this.view.lstboxApprovalsACP.selectedKey);
    for(var i=0; i<selApprovers.length; i++){
      approvers.push({"approverId": selApprovers[i]});
    }
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      var selRowInd = this.view.flxRangeValueACP.info.selRowIndex;
      var selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
      var rangeText = this.getRangeTextSetForSelectedRowAAR(selRowData, 2);
      addUpdateText = selRowData.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers") ?
                   kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenAddedSuccessfully"): kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenUpdatedSuccessfully");
      selRowData.lblIconApprovalCondError.isVisible = false;
      selRowData.lblAddApprovalCondition.info.userLevel.approverList = approvers;
      selRowData.lblAddApprovalCondition.info.userLevel.approvalCount = approvalCount;
      selRowData.lblAddApprovalCondition.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
      this.view.segAddApprovalRuleAAR.setDataAt(selRowData,selRowInd);
      toastMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalConditionForRange") + rangeText + addUpdateText;
    } 
    else if(actionType === this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY){
      var actionData = this.view.lblCustomerNameAAR.info.actionData;
       addUpdateText = this.view.lblAddApprovalCondition.text === kony.i18n.getLocalizedString("i18n.frmCompanies.AddApprovers") ?
                   kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenAddedSuccessfully"): kony.i18n.getLocalizedString("i18n.frmCompanies.haveBeenUpdatedSuccessfully");
      this.view.lblIconApprovalCondError.setVisibility(false);
      this.view.lblAddApprovalCondition.info.userLevel.approverList = approvers;
      this.view.lblAddApprovalCondition.info.userLevel.approvalCount = approvalCount;
      this.view.lblAddApprovalCondition.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers");
      toastMsg = kony.i18n.getLocalizedString("i18n.frmCompanies.ApprovalConditionForAction") + "\"" +
         actionData.actionName + "\"" + addUpdateText;
    }
    this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),toastMsg);
    this.view.flxAddApprovalConditionsPopup.setVisibility(false);
  },
  /*
  * get the default approval condition in case no approval conditions added
  */
  getDefaultNoApprovalCondAAR: function(){
    var allSGIds = [],approvalRules = [];
    var selectedCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var signatoryGroups = this.approvalsSGList[selectedCustId];
    for(var i=0; i< signatoryGroups.length; i++){
      allSGIds.push(signatoryGroups[i].signatoryGroupId);
      approvalRules.push(0);
    }
    return {"groupList":"["+allSGIds.toString()+"]","groupRule":"[["+ approvalRules.toString()+"]]"};
  },
  /*
  * add approval conditions popup: get the approvals count set for each signatory group
  */
  getApprovalCondAddedList : function(){
    var allSGIds = [];
    var selectedCustId = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var signatoryGroups = this.approvalsSGList[selectedCustId] || [];
    for(var i=0; i< signatoryGroups.length; i++){
      allSGIds.push(signatoryGroups[i].signatoryGroupId);
    }
    var approvlRule = "";
    var orCondCard = this.view.flxDynamicRowsContACP.widgets();
    for(var j=0; j<orCondCard.length; j++){
      var approvalCountArr =[];
      var andCondRows = orCondCard[j].flxApprovalDynamicRows.widgets();
      for(var k=0; k<allSGIds.length; k++){
        var approvalCount = 0;
        for(var m=0; m<andCondRows.length; m++){
          if(andCondRows[m].lstBoxSignatoyGroup.selectedKey === allSGIds[k]){
            approvalCount = andCondRows[m].plusMinusApprovals.tbxcharcterSize.text;
            break;
          }
        }
        approvalCountArr.push(approvalCount);
      }
      approvlRule = approvlRule+"["+approvalCountArr.toString()+"],";
    }
    var updateApprvlRule = approvlRule.length > 0 ? approvlRule.substr(0,approvlRule.length -1).toString() : approvlRule;
    return {"groupList":"["+allSGIds.toString()+"]",
            "groupRule":"["+ updateApprvlRule+"]"};
    
  },
  /*
  * get OR condition arrays from sign group object
  * @param: sign group object
  * @return: "[1,0],[0,1]"
  */
  getFormattedAddedGroupRule: function(signGroupObj){
    var signGroupId = Object.keys(signGroupObj);
    var finalArr =[];
    for(let p=0; p<signGroupId.length ;p++){
      var countArr = signGroupObj[signGroupId[p]];
      for(let q=0; q<countArr.length; q++){
        if(p === 0){
          finalArr.push([countArr[q]]);
        } else{
          finalArr[q].push(countArr[q]);
        }
      }
    }
    var approvalRuleStr ="",finalRuleStr = "";
   for(let i=0; i<finalArr.length; i++){
     approvalRuleStr = approvalRuleStr+"["+finalArr[i].toString()+"],";
    }
    finalRuleStr = approvalRuleStr.length > 0 ? approvalRuleStr.substr(0, approvalRuleStr.length-1).toString() : approvalRuleStr;
    return finalRuleStr;
  },
  /*
  * show tooltip to add approval condition in signatory group config
  */
  showAddConditionTooltip: function(eventObj){
    var rowInd = eventObj.rowContext.rowIndex;
    var heightVal= 60;
    for (var i = 0; i < rowInd; i++) {
      heightVal = heightVal + this.segAAR_ROW_FRAMES[i].height;
    }
    var scrollOffset = this.view.segAddApprovalRuleAAR.contentOffsetMeasured.y;
    heightVal = heightVal + 43 - scrollOffset;
    this.view.flxAddConditionAARTooltip.top = heightVal + this.view.flxRulesListContainerAAR.frame.y+ 5 +"dp";
    this.view.flxAddConditionAARTooltip.left = this.view.lblListHeadingAAR4.frame.x +"dp";
    this.view.flxAddConditionAARTooltip.setVisibility(true);
    this.view.forceLayout();
  },
  /*
  * show confirmation popup to change approval matrix config
  * @param: selected config type
  */
  changeConfigConfirmPopup : function(configType){
    var scopeObj = this;
    var configType = this.getSelectedApprovalConfigValue().id;
    this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ChangeConfiguration");
    this.view.suspendFeaturePopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    if(configType === this.approvalConfigType.USER){
      this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ChangeConfigurationToSigGroupMessage");
    } else if(configType === this.approvalConfigType.SIGNATORY_GROUP){
      this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ChangeConfigurationToUserMessage"); 
    }
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.width = "93%";
    this.view.flxSuspendFeaturePopup.setVisibility(true);
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function() {
      var option =  (configType === scopeObj.approvalConfigType.USER) ? 2 :1;
      scopeObj.onConfigRadioBtnClick(option);
      var reqParam = {"coreCustomerId": scopeObj.view.customerDropdownAM.lblSelectedValue.info.selectedId,
                      "contractId": scopeObj.completeContractDetails.id,
                      "isGroupLevel": (configType === scopeObj.approvalConfigType.USER) ? "1": "0"};
      scopeObj.presenter.updateApprovalMode(reqParam);
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * show/hide the dropdown list on click of flex
  */
  showHideUsersDropdownACP : function(){
    if(this.view.filterMenuApproversACP.isVisible === true){
      this.view.filterMenuApproversACP.setVisibility(false);
    } else{
      this.view.filterMenuApproversACP.flxClearSearchImage.onClick();
      this.view.flxSelectedApproversACP.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.flxApproversErrorACP.setVisibility(false);
      this.view.filterMenuApproversACP.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: set data to approver users dropdown segment
  * @param: action type(monetary/nonmonetary)
  */
  setApproverUsersDropdown: function(actionType){
    var self =this;
    var userSegData = [], selId =[], selRowInd = 0, selRowData ={},addCondWidPath = "";
    if(actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      selRowInd = this.view.flxRangeValueACP.info.selRowIndex;
      selRowData = this.view.segAddApprovalRuleAAR.data[selRowInd];
      addCondWidPath = selRowData.lblAddApprovalCondition;
    } else{
      addCondWidPath = this.view.lblAddApprovalCondition
    }
    var approversList = this.view.filterMenuApproversACP.info.approversList || [];
    var widgetMap = {
      "id":"id",
      "isSelected":"isSelected",
      "flxCheckBox":"flxCheckBox",
      "imgCheckBox":"imgCheckBox",
      "lblDescription":"lblDescription",
      "flxSearchDropDown":"flxSearchDropDown"
    };
    this.view.filterMenuApproversACP.segStatusFilterDropdown.info = {"usersList":approversList,"selUsers":[]};
    for(var i=0; i<approversList.length; i++){
      var rowData = this.mapApproverUsersList(approversList[i]);
      //edit conditions flow
      if(addCondWidPath.text === kony.i18n.getLocalizedString("i18n.frmCompanies.EditApprovers")){
        var addedApprovers = addCondWidPath.info.userLevel.approverList;
        for(var j=0; j<addedApprovers.length; j++){
          if(addedApprovers[j].approverId === rowData.id){
            rowData.imgCheckBox.src = this.AdminConsoleCommonUtils.checkboxSelected;
            selId.push(rowData.id);
            break;
          }
        }
        
      }  
      userSegData.push(rowData);
    }
    this.view.filterMenuApproversACP.segStatusFilterDropdown.info.selUsers = selId;
    this.view.filterMenuApproversACP.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.filterMenuApproversACP.segStatusFilterDropdown.setData(userSegData);
    this.view.filterMenuApproversACP.setVisibility(false);
    if(userSegData.length > 0){
      this.view.filterMenuApproversACP.segStatusFilterDropdown.setVisibility(true);
      this.view.filterMenuApproversACP.flxNoResultFound.setVisibility(false);
    } else{
      this.view.filterMenuApproversACP.segStatusFilterDropdown.setVisibility(false);
      this.view.filterMenuApproversACP.flxNoResultFound.setVisibility(true);
      this.view.filterMenuApproversACP.lblNoResultFoundPF.text = "No Approvers available";
    }
    this.view.lblSelApproversValueACP.text  = selId.length > 0 ? selId.length + " "+kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected") :"Select Approvers";
    var approvalCount =  addCondWidPath.info.userLevel.approvalCount;
    this.setApproverCountListbox(userSegData.length, approvalCount);
    this.view.forceLayout();
  },
  /*
  * add approval conditions popup: segment data map function for approver users dropdown
  * @param: user data
  */
  mapApproverUsersList : function(user){
    return {
      "id":user.id,
      "imgCheckBox":{"src":this.AdminConsoleCommonUtils.checkboxnormal},
      "lblDescription":{"text": (user.firstname + " "+(user.lastname || "")) ||user.name},
      "template":"flxSearchDropDown"
    };
  },
  /*
  * add approval conditions popup: set data to approver count listbox
  * @param: approvers list length, count to select
  */
  setApproverCountListbox : function(approversLen, selectedCount){
    var lstboxData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmCompanies.SelectNumOfApprovals")]];
    var approvalCount = Object.keys(this.approvalsCountMap);
    for(var i=0; i<approvalCount.length; i++){
      var value = this.approvalsCountMap[approvalCount[i]];
      lstboxData.push([approvalCount[i], value]);
    }
    this.view.lstboxApprovalsACP.masterData = lstboxData;
    this.view.lstboxApprovalsACP.selectedKey = selectedCount === "0" ? "SELECT" : this.getApprovalCountCode(selectedCount);
  },
  /*
  * get count value for approval count id
  * @param: count id
  * @return: count value
  */
  getCountForApprovalCountCode : function(countCode){
    switch (countCode){
      case "NO_APPROVAL":
        return "0";
      case "ANY_ONE":
        return "1";
      case "ANY_TWO":
        return "2";
      case "ANY_THREE":
        return "3";
      default:
        return "-1";
    }    
  },
  /*
  * get approval count id for count value
  * @param: count value
  * @return: count id
  */
  getApprovalCountCode : function(num){
    switch (num){
      case "0":
        return "NO_APPROVAL";
      case "1":
        return "ANY_ONE";
      case "2":
        return "ANY_TWO";
      case "3":
        return "ANY_THREE";
      default:
        return "ALL";
    }     
  },
  /*
  * add approval conditions popup: check/uncheck approver in dropdown
  */
  selectApproversACP : function(){
    var segData = this.view.filterMenuApproversACP.segStatusFilterDropdown.data;
    var selInd = this.view.filterMenuApproversACP.segStatusFilterDropdown.selectedRowIndex[1];
    var imgToSet = segData[selInd].imgCheckBox.src === this.AdminConsoleCommonUtils.checkboxnormal ?
        this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
    var selRowData = segData[selInd];
    selRowData.imgCheckBox.src = imgToSet;
    var selUserArr = this.view.filterMenuApproversACP.segStatusFilterDropdown.info.selUsers;
    if(imgToSet === this.AdminConsoleCommonUtils.checkboxSelected ){
      selUserArr.push(selRowData.id);
    } else{
      var idIndex  = selUserArr.indexOf(selRowData.id);
      selUserArr.splice(idIndex,1);
    }
    this.view.lblSelApproversValueACP.text  = selUserArr.length > 0 ? selUserArr.length + " "+kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected") :"Select Approvers";
    this.view.filterMenuApproversACP.segStatusFilterDropdown.info.selUsers = selUserArr;
    this.view.filterMenuApproversACP.segStatusFilterDropdown.setDataAt(selRowData,selInd);
  },
  /*
  * add approval conditions popup: search for users in dropdown list
  */
  searchApproverUsers : function(){
    var searchText = this.view.filterMenuApproversACP.tbxSearchBox.text;
    var usersData = this.view.filterMenuApproversACP.segStatusFilterDropdown.info.usersList;
    var selectedUsers = this.view.filterMenuApproversACP.segStatusFilterDropdown.info.selUsers;
    var filteredList = [];  
    for(var i=0; i< usersData.length; i++){
      var mapJson,imgToSet;
      var name = (usersData[i].firstname + " "+(usersData[i].lastname || "") ||usersData[i].name);
      imgToSet = (selectedUsers.indexOf(usersData[i].id) >= 0) ?
        this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      if(searchText !== ""){
        if(name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
          mapJson =this.mapApproverUsersList(usersData[i]);
          mapJson.imgCheckBox.src = imgToSet;
          filteredList.push(mapJson);
        }
      } else{
        mapJson =this.mapApproverUsersList(usersData[i]);
        mapJson.imgCheckBox.src = imgToSet;
        filteredList.push(mapJson);
      }
    }
    
    this.view.filterMenuApproversACP.segStatusFilterDropdown.setData(filteredList);
    if(filteredList.length > 0){
      this.view.filterMenuApproversACP.segStatusFilterDropdown.setVisibility(true);
      this.view.filterMenuApproversACP.flxNoResultFound.setVisibility(false);
    } else{
      this.view.filterMenuApproversACP.segStatusFilterDropdown.setVisibility(false);
      this.view.filterMenuApproversACP.flxNoResultFound.setVisibility(true);
      this.view.filterMenuApproversACP.lblNoResultFoundPF.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
    }
  },
  /*
  * show confirmation popup on toggle of approvals status
  */
  showEnableApprovalConfirmPopup : function(){
    var scopeObj = this;
    var isEnable = this.view.switchToggleAM.selectedIndex === 1 ? false : true;
    var customerText = this.view.customerDropdownAM.lblSelectedValue.info.selectedName + " (" + this.view.customerDropdownAM.lblSelectedValue.info.selectedId +")";
    if(isEnable === true){ //enabling approvals
      this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EnableApprovalRules");
      this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EnableApprovalPopupMsg1") +
        "\"" +customerText +"\"" +"?"+ kony.i18n.getLocalizedString("i18n.frmCompanies.EnableApprovalPopupMsg2") ;
    } else{ //disabling approvals
      this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.DisableApprovalRules");
      this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.DisableApprovalPopupMsg1") +
        "\"" + customerText +"\""+ "?"+kony.i18n.getLocalizedString("i18n.frmCompanies.DisbaleApprovalPopupMsg2");
    }
    this.view.suspendFeaturePopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.width = "93%";
    this.view.flxSuspendFeaturePopup.setVisibility(true);
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function() {
      scopeObj.enableDisableApprovalMatrix(customerText);
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    }
    this.view.suspendFeaturePopup.btnPopUpCancel.onClick = function(){
      scopeObj.view.switchToggleAM.selectedIndex = isEnable === true ? 1: 0;
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * enable/disable approval matrix for customer on switch toggle
  * @param: customerNameId to show in toast
  */
  enableDisableApprovalMatrix : function(customerText){
    var selectedCust = this.view.customerDropdownAM.lblSelectedValue.info.selectedId;
    var payload = {
      "contractId": this.completeContractDetails.id || "",
      "cif": selectedCust,
      "disable": this.view.switchToggleAM.selectedIndex === 1 ? "true" : "false"
    };
    this.presenter.updateApprovalMatrixStatus(payload, customerText);
  },
  showSignatoryGroups : function(){
    this.tabUtilLabelFunction([ this.view.lblTabName1,this.view.lblTabName2,this.view.lblTabName3,
                               this.view.lblTabName4,this.view.lblTabName5,this.view.lblTabName6],this.view.lblTabName6);
    this.hideAllTabsDetails();
    this.view.flxContractSignatoryContainer.setVisibility(true);
    var contractId=this.completeContractDetails.id;
    this.view.flxSelectedUsers.info=[];
    this.presenter.getAllSignatoryGroups({"contractId":contractId});
    this.view.forceLayout();
  },
  setSignatoryGroups : function(customersSignGroups,isSearch){
    var noOfContracts = 0;
    noOfContracts = customersSignGroups.length;
    var customers=this.completeContractDetails.contractCustomers;
    var totalRec=isSearch?customersSignGroups:customers;
    if(isSearch&&noOfContracts === 0){
      //show no record foundthis.view.flxContractGroupsContainer
      this.view.flxContractGroupsContainer.setVisibility(false);
      this.view.flxNoSignatoryGroupResults.setVisibility(true);
    }else{
      this.view.flxNoSignatoryGroupResults.setVisibility(false);
      this.view.flxContractSignatoryGroupsDetail.setVisibility(true);    
      var self=this;
      self.view.flxContractGroupsContainer.removeAll();
      var signatoryGroupsData;
      for (var x=0;x<totalRec.length;x++){
        signatoryGroupsData = [];
        var num = x>10 ? x : "0"+x;
        var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
          "id": "signatoryCard" +num,
          "isVisible": true,
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "left":"0dp",
          "width":"100%",
          "top": "15dp"
        }, {}, {});
        i=i+1;
        featureCardToAdd.lblHeading2.text = "TAX ID & ADDRESS";
        featureCardToAdd.lblHeading3.setVisibility(false);
        featureCardToAdd.lblData2.text = "View";
        featureCardToAdd.lblData2.skin="sknLbl117EB0LatoReg14pxHov";
        //featureCardToAdd.lblData2.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
        featureCardToAdd.lblData2.onTouchStart=this.accountsPopup.bind(this,totalRec[x].coreCustomerId,this.completeContractDetails.legalEntityId);
        featureCardToAdd.lblData3.setVisibility(false);
        featureCardToAdd.flxArrow.onClick = self.toggleGroupCardVisibility.bind(self,featureCardToAdd,self.view.flxContractGroupsContainer);
        featureCardToAdd.flxHeadingRightContainer.isVisible=true;
        featureCardToAdd.btnEdit.text="Add";

        featureCardToAdd.btnView.isVisible=false;
        self.view.flxContractGroupsContainer.add(featureCardToAdd);
        featureCardToAdd.segAccountFeatures.info = {"parentId":featureCardToAdd.id,"segData":[], "segDataJSON":{}};
		if(isSearch===false){
        for(var y=0;y<customersSignGroups.length;y++){
          if(totalRec[x].coreCustomerId===customersSignGroups[y].coreCustomerId){
            signatoryGroupsData=customersSignGroups[y].signatoryGroups;
            break;
          }
        }
        }else
          signatoryGroupsData=totalRec[x].signatoryGroups;

        self.setDataToSignatoryGroups(featureCardToAdd,signatoryGroupsData,x,totalRec[x]);

      }
      this.view.forceLayout();
    }
  },
  
    filterSignatoryDataForSearch: function(searchTxt ){
    let filteredData = JSON.parse(JSON.stringify(this.signatoryGroups));
    var self =this;
    return filteredData.filter( function(contractCust){
      // search by customer Id &  by customer name
      if (contractCust.coreCustomerName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ||
       contractCust.coreCustomerId.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      }
      // search by group name
      // nested loop for account names
			contractCust.signatoryGroups = contractCust.signatoryGroups.filter(function(group) {
                self.searchSignatoryResult.isSignatoryGroupMatched = true;
                return group['signatoryGroupName'].toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1;
            });
            return contractCust.signatoryGroups.length !== 0;     
    });
  },
  //pagination ViewSignatorygrp
  setSignatoryGroupWidgetDataMap:function(segAccountFeatures){
    var widgetDataMap={
      "flxSegSignatoryGroupHeader":"flxSegSignatoryGroupHeader",
      "flxHeaderContainer":"flxHeaderContainer",
      "flxGroupName":"flxGroupName",
      "lblGroupName":"lblGroupName",
      "lblIconGroupNameSort":"lblIconGroupNameSort",
      "flxGroupDescription":"flxGroupDescription",
      "lblGroupDescription":"lblGroupDescription",
      "flxNumberOfUsers":"flxNumberOfUsers",
      "lblNumberOfUsers":"lblNumberOfUsers",
      "lblIconSortNumberOfUsers":"lblIconSortNumberOfUsers",
      "lblSeparator":"lblSeparator",
      "flxSegSignatoryGroupContent":"flxSegSignatoryGroupContent",
      "flxSegHeader":"flxSegHeader",
      "lblGroupName":"lblGroupName",
      "lblGroupDescription":"lblGroupDescription",
      "flxOptions":"flxOptions",
      "lblOptions":"lblOptions",
      "flxDelete":"flxDelete",
      "lblIconDeleteLang":"lblIconDeleteLang",
      "lblSeperator":"lblSeperator",
      //no ranges available template
      "flxApprovalMatrixNoRangeRow":"flxApprovalMatrixNoRangeRow",
      "flxNoRangesCont":"flxNoRangesCont",
      "lblNoApprovalText":"lblNoApprovalText",
      "btnAddApproval":"btnAddApproval",
      "imgIcon":"imgIcon",
      "lblLine":"lblLine"
    };
     segAccountFeatures.widgetDataMap = widgetDataMap;
  },  

  getHeaderDataForSignatoryGroup : function(featureCardToAdd , segment, component_id){
    var self=this;
    return {
      //'isAcctHeaderRow':'true',
      'template' : 'flxSegSignatoryGroupHeader',
      "flxSegSignatoryGroupHeader":{"isVisible":true},
      "flxGroupName":{"onClick":function(){
        self.sortSegForContractsByColName(featureCardToAdd ,  segment,  'lblGroupName',"SIGNATORY_GROUPS");
      }.bind(self)
                     },
      "lblGroupName":{"text":kony.i18n.getLocalizedString("i18n.frmCompanies.GROUP_NAME")},
      "lblIconGroupNameSort":{"text":"\ue92a"},
      "lblGroupDescription":{"text":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GroupDescription_UC")},
      "flxNumberOfUsers":{"onClick":function(){
                                    self.sortSegForContractsByColName(featureCardToAdd ,  segment,  'lblNumberOfUsers',"SIGNATORY_GROUPS");
                                  }.bind(self)
      },
      "lblNumberOfUsers":{"text":kony.i18n.getLocalizedString("i18n.ProfileManagement.noOfUsersCaps")},
      "lblIconSortNumberOfUsers":{"text":"\ue92b" }, 
      "lblSeparator": { "skin": "sknLblSeparator696C73", "isVisible": true }
    }
     },
  
  setDataToSignatoryGroups : function(featureCardToAdd , rec , component_id,customerData){
    var contractId=this.completeContractDetails.id;
    var self = this; 	
   this.prevSignatorySelected={
    contractNo : -1 
  },
     this.setSignatoryGroupWidgetDataMap(featureCardToAdd.segAccountFeatures);
    featureCardToAdd.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmCompanies.SignatoryGroups_LC");
    featureCardToAdd.flxCheckboxOptions.setVisibility(false);
    var address="N/A";
    if(customerData.city!==undefined||customerData.country!==undefined)
      address=this.AdminConsoleCommonUtils.getAddressText(customerData.city,customerData.country);
    else
      address="N/A";
    var details = {
        "id": customerData.coreCustomerId,
        "name": customerData.coreCustomerName,
        "industry":customerData.industry?customerData.industry:"N/A",
        "email": customerData.email,
        "phone":customerData.phone,
        "address": address
      };
    featureCardToAdd.lblName.text = customerData.coreCustomerName;
    featureCardToAdd.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
    featureCardToAdd.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
    //featureCardToAdd.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.TaxId_UC");
    featureCardToAdd.lblHeading2.text = "TAX ID & ADDRESS";
    featureCardToAdd.lblHeading3.setVisibility(false);
    //featureCardToAdd.lblHeading3.text = kony.i18n.getLocalizedString("i18n.View.ADDRESS");
    featureCardToAdd.lblData1.text = customerData.coreCustomerId;
    //featureCardToAdd.lblData2.text = customerData.taxId?customerData.taxId:"N/A";
    //featureCardToAdd.lblData3.text = address.length>0?address:"N/A";
    if(customerData.isPrimary === "true"){
      featureCardToAdd.flxPrimary.setVisibility(true);
      this.view.btnAddSignatoryUsers.info={
    "contractId": contractId,
    "coreCustomerId": customerData.coreCustomerId
};
    }
    // There will be atlest 1 account in valid scenario. The below condition to handle the scenario if there is 0 accounts 
    var data=[];
    var existingGroupNames=[];
    //to check "signatoryGroups":[{}] when no signatory grps added but still getting an empty JSON
    if(rec && rec.length > 0 && (Object.keys(rec[0]).length>0)){
      data = rec.map(function(record){
        existingGroupNames.push(record.signatoryGroupName.trim());
        return {   
      'template' : 'flxSegSignatoryGroupContent',
      'flxSegSignatoryGroupContent':{
        "onClick":function(){
          self.view.tbxGroupNameValue.info={"existingGroupNames":existingGroupNames};
          self.presenter.getSignatoryGroupDetails({"signatoryGroupId":record.signatoryGroupId},false);
          //self.setViewSignatoryGroupsSegmentData(self.view.segUserDetailsSegment,record);
        }},
      'lblGroupName': record['signatoryGroupName'],
      "flxOptions":{"onClick":function(){self.editSignatoryClick(false,record,featureCardToAdd);}},
      "flxDelete":{"onClick":function(){self.presenter.isSignatoryGroupEligibleForDelete({"signatoryGroupId":record.signatoryGroupId,
                                                                                         "signatoryGroupName":record.signatoryGroupName}) }},
      "lblOptions":{"text":kony.i18n.getLocalizedString("i18n.frmFAQ.fonticonEdit")},
      "lblIconDeleteLang":{"text":"","skin":"sknIcon00000015px"},       
      'lblGroupDescription': record["signatoryGroupDescription"]&&record["signatoryGroupDescription"].length>0?record["signatoryGroupDescription"]:"N/A",
      'lblNumberOfUsers': record["noOfUsers"]?record["noOfUsers"]:"0",
      'lblSeperator': {"skin": "sknLblSeparatore7e7e7", "isVisible": true},
    };
      });  
    }else{
      data.push({
        "lblNoApprovalText": {"text":kony.i18n.getLocalizedString("i18n.frmCompanies.noSignatoryGroups")},
        "btnAddApproval":{"isVisible":false},
        "flxApprovalEdit":{"isVisible":false},
        "imgIcon":{"isVisible":true,"src":"adduser.png"},
        "lblLine": {"isVisible":false},
        "template":"flxApprovalMatrixNoRangeRow",
      });
    }
    // for(let a_x = 0 ;a_x <12;a_x++){
    //   data.push(data[0]);
    // }
    let datLen = 0;
    let headerData = this.getHeaderDataForSignatoryGroup(featureCardToAdd , featureCardToAdd.segAccountFeatures );
    if(data[0].template==="flxApprovalMatrixNoRangeRow"){
      datLen=0;
      headerData.flxSegSignatoryGroupHeader.isVisible=false;
    }
    else
      datLen=data.length;
    featureCardToAdd.lblCount.text = datLen<10? "(0"+datLen+")" : "("+datLen+")";    
    
    // removing the last stroke at the bottom of the box
//     if(datLen > 0 && data[datLen -1].lblSeperator){
//       data[datLen -1].lblSeperator = '';
//     }
    if(datLen > 10 ){
      this.paginationActionsForSignatoryGroup(featureCardToAdd , featureCardToAdd.segAccountFeatures , datLen);
    }
    var sectionData =  [ headerData , data.slice(0,10)];
	featureCardToAdd.segAccountFeatures.info={"coreCustomerName":featureCardToAdd.lblName.text,"coreCustomerId":featureCardToAdd.lblData1.text,"existingNames":existingGroupNames};
    featureCardToAdd.btnEdit.onClick = function(){
        self.addNewGroupClick(featureCardToAdd);
      };
    featureCardToAdd.segAccountFeatures.setData([sectionData]);
    
    // we do the pagination and sorting logic when the segment is on
    featureCardToAdd.flxArrow.onClick = function() {
      var visibility = featureCardToAdd.flxCardBottomContainer.isVisible ? false : true;
      if (visibility) {
          self.paginationDetails.currSegSignatoryGroupData = [headerData, data];
      }
      featureCardToAdd.toggleCollapseArrow(visibility);
     
      let prevInd =  this.prevSignatorySelected.contractNo;
      if (prevInd != -1) {
          let components = self.view.flxContractGroupsContainer.widgets();//add(featureCardToAdd);
          components[prevInd].toggleCollapseArrow(false);
      }
      if(!visibility){
        this.prevSignatorySelected.contractNo = -1;
      }else{
        this.prevSignatorySelected.contractNo = component_id;
      }      
    }.bind(this);
  },
  
  onSegmentPaginationChangeSignatoryGroup: function(featureCardToAdd , currentValue , segment){
    currentValue = parseInt(currentValue);
    let totalDataLen = this.paginationDetails.currSegSignatoryGroupData[1].length;
    let startVal = (currentValue - 1) * 10;
    // exceeded the limit
    if(startVal >totalDataLen){
        return;
    }    
    featureCardToAdd.reportPagination.lblNumber.text = currentValue;
    let endVal = currentValue  * 10;
    endVal = endVal > totalDataLen ? totalDataLen : endVal;
     
			  if(startVal==0)
        {
            //startVal=1;
            featureCardToAdd.reportPagination.lblShowing.text = "Showing" + " 1 - " + endVal + " " + "Of " + totalDataLen;
        }
    featureCardToAdd.reportPagination.lblShowing.text = "Showing" + " " + startVal + " - " + endVal + " " + "Of " + totalDataLen;
    let paginData = this.paginationDetails.currSegSignatoryGroupData[1].slice(startVal, endVal);
    let segData = segment.data;
    segData[0][1] = paginData;
    segment.setData(segData);
  },
  
   paginationActionsForSignatoryGroup:function(featureCardToAdd , segment , totalDataLen){
    featureCardToAdd.reportPagination.setVisibility(true);
    var scopeObj = this;
    scopeObj.totalPages = Math.ceil( totalDataLen/10);
    // initially setting the pagination values
    featureCardToAdd.reportPagination.lblNumber.text = "1";
    featureCardToAdd.reportPagination.lblShowing.text = "Showing 1 - 10 Of " + totalDataLen;
    featureCardToAdd.reportPagination.flxnext.onClick = function(){    
      var currentValue=parseInt(featureCardToAdd.reportPagination.lblNumber.text)+1;
      scopeObj.onSegmentPaginationChangeSignatoryGroup(featureCardToAdd , currentValue , segment);
    };
    featureCardToAdd.reportPagination.flxPrevious.onClick = function(){
      var currentValue=featureCardToAdd.reportPagination.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationChangeSignatoryGroup(featureCardToAdd , prevVal , segment);
      }      
    };
    featureCardToAdd.reportPagination.flxGo.onClick = function(){
      var currentValue= featureCardToAdd.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(currentValue)>0 && parseInt(currentValue)<=scopeObj.totalPages){                                                                                                                            
        scopeObj.onSegmentPaginationChangeSignatoryGroup(featureCardToAdd , currentValue , segment);
      }
    };
    featureCardToAdd.reportPagination.tbxPageNumber.onDone = function(){
      var currentValue= featureCardToAdd.reportPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(currentValue)>0 && parseInt(currentValue)<=scopeObj.totalPages){
                                                                                                            
        scopeObj.onSegmentPaginationChangeSignatoryGroup(featureCardToAdd , currentValue , segment);
      }
    };
  },
  
  toggleGroupCardVisibility : function(cardPath,parentFlex){
    var listArr = parentFlex.widgets();
    for(var i=0; i<listArr.length; i++){
      if(listArr[i].id === cardPath.id){
        var visibilityCheck = cardPath.flxCardBottomContainer.isVisible;
        cardPath.toggleCollapseArrow(!visibilityCheck);
      }
      else{
        this.view[listArr[i].id].toggleCollapseArrow(false);
      }
    }
  },
  toggleAddGroupVerticalTabs: function(imgPath,btnPath){
    this.tabUtilVerticleArrowVisibilityFunction(
      [//this.view.verticalTabs.flxImgArrow0,
       this.view.verticalTabs.flxImgArrow1,
       this.view.verticalTabs.flxImgArrow2,
       //this.view.verticalTabs.flxImgArrow3,
       //this.view.verticalTabs.flxImgArrow4,
       //this.view.verticalTabs.flxImgArrow5
      ],imgPath);  
    var widgetArray = [
      //this.view.verticalTabs.btnOption0,
      this.view.verticalTabs.btnOption1,this.view.verticalTabs.btnOption2,
      //this.view.verticalTabs.btnOption3,this.view.verticalTabs.btnOption4,this.view.verticalTabs.btnOption5
    ];
    this.tabUtilVerticleButtonFunction(widgetArray,btnPath);
  },
  addNewGroupClick : function(featuresCard){
    var self=this;
    var existingGroupNames=featuresCard.segAccountFeatures.info.existingNames;
    var coreCustId=featuresCard.lblData1.text;
    var contractId=this.completeContractDetails.id;
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      self.view.breadcrumbs.btnPreviousPage.setVisibility(false);
	  self.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      self.backToCompanyDetails(6);
    };
    this.action="CREATE";
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    this.view.verticalTabs.lblOptional2.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.text = this.view.lblCompanyDetailName.text.toUpperCase();
    this.view.flxAddGroups.info={"isView":false};
    this.view.lblHeaderAddedUsers.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ADDEDUSERS")+" (0)";
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ADD_SIGNATORY_GROUPS");
    this.view.tbxGroupNameValue.text="";
    this.view.tbxGroupNameValue.info={"existingGroupNames":existingGroupNames};
    this.view.btnAddSignatoryUsers.info={
    "contractId": contractId,
    "coreCustomerId": featuresCard.lblData1.text
};
    this.view.lblHeaderAddedUsersName.text=featuresCard.lblName.text+" ("+featuresCard.lblData1.text+")";
    this.view.lblHeaderAddedUsersCustomersId.setVisibility(false);
    this.view.tbxGroupNameValue.skin="skntbxLato35475f14px";
    this.view.flxNoGroupNameError.setVisibility(false);
    this.view.txtGroupDescription.text="";
    this.toggleAddGroupVerticalTabs(this.view.verticalTabs.flxImgArrow1,this.view.verticalTabs.btnOption1);
    this.view.flxSelectedUsers.setVisibility(false);
    this.view.flxGroupDetails.setVisibility(true);
    this.hideRequiredMainScreens(this.view.flxAddGroups);
    this.view.flxAddedUsersDetails.setVisibility(false);
    this.view.imgIcon.setVisibility(true);
    this.view.flxSelect.setVisibility(true);
    this.view.flxAddedUserSearch.setVisibility(false);
    this.view.btnAddUsersHeader.setVisibility(false);
    this.view.lblGroupDescriptionCount.setVisibility(false);
    this.view.lblGroupNameCount.setVisibility(false);
    this.view.btnAddGroupSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddGroup_UC");
    this.view.btnAddGroupSave1.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddGroup_UC");
    this.noGroupUsers=[];
    this.view.segSearchedUserDetails.setData([]);
    this.view.segSearchedUserDetails.info.selectedIds=[];
    this.view.segSearchedUserDetails.info.removedIds={};
    this.view["segSearchedUserDetails"].info.allData=undefined;
    this.view.forceLayout();
  },
  showGroupAddUsersPopup : function(noGroupUsers){
    var self=this;
    this.view.flxLoading3.setVisibility(false);
	//to avoid the wtype,template model not found issue we were getting after switching to another form and came back again
	this.view.segSelectionList.data=undefined;
    this.view.flxAddUsersPopup.setVisibility(true);
    this.view.flxBackOption.onClick();
    this.view.tbxUsersSearchPopup.text="";
    this.view.flxClearUsersSearchPopup.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsScreen1.btnSave,true,false);
    this.view.lblTotalUsers.text=" of "+this.getTwoDigitNumber(noGroupUsers.length);
    this.view.lblCountUsers.text="00";
    this.view.segSelectionList.info={"selectedCust":[]};
    this.view.lblNoResultsScreen1.setVisibility(false);
    this.setGroupUsersData("segSelectionList",noGroupUsers);
    this.view.forceLayout();
  },
  setGroupUsersData : function(segId,data){
    var self=this;
    var showCheckbox=false;
    var showDelete=false;
    var showCross=false;
    var checkSelection=false;
    if(segId==="segSelectionList"){
      showCheckbox=true;
    }else if(segId==="segSearchedUserDetails"){
      showCross=true;
      checkSelection=true;
    }
    var dataMap={
      "flxSegUserDetails":"flxSegUserDetails",
      "flxAssignedCustomers":"flxAssignedCustomers",
      "flxNameContainer":"flxNameContainer",
      "flxName":"flxName",
      "lblIconWarning":"lblIconWarning",
      "flxCheckBox":"flxCheckBox",
      "lblCheckbox": "lblCheckbox",
      "imgCheckBox": "imgCheckBox",
      "lblName":"lblName",
      "lblSortName":"lblSortName",
      "lblUserID":"lblUserID",
      "flxRole":"flxRole",
      "lblrole":"lblrole",
      "lblView":"lblView",
      "flxRoleFilter":"flxRoleFilter",
      "lblFilterRole":"lblFilterRole",
      "lblIconRemove":"lblIconRemove",
      "lblSeperator":"lblSeperator",
      "userInfo":"userInfo"
    };
    var secData={
      "template":"flxSegUserDetails",
      "flxName":{"onClick":function(){
        self.sortAndSetData("lblName.text",self.view[segId],2);
      }},
      "lblName":{"text": kony.i18n.getLocalizedString("i18n.permission.NAME"),"skin":"sknlblLato696c7311px"},
      "lblSortName":{"text":"\ue920","skin":"sknIcon15px","hoverSkin" :"sknlblCursorFont"},
      "imgCheckBox": {"isVisible":false},
      "lblCheckbox": {"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
      "flxCheckBox":{"isVisible":showCheckbox,"onClick":function(){self.toggleBulkCheckbox(self.view.segSelectionList,self.view.commonButtonsScreen1.btnSave);}},
      "lblUserID":{"text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.User_ID_Cap"),"skin":"sknlblLato696c7311px"},
      "lblrole":{"text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_ROLE"),"skin":"sknlblLato696c7311px"},
      "flxRole":{"width":showCross||showDelete?"22%":"25%"},
      "lblView":{"text": kony.i18n.getLocalizedString("i18n.frmCompanies.APPROVAL_PERMISSIONS"),"skin":"sknlblLato696c7311px","hoverSkin":"sknlblLato696c7311px","width":"20%"},
      "lblIconRemove":{"isVisible":false},
      "lblFilterRole":{"isVisible":true},
      "flxRoleFilter":{"isVisible":true,"onClick":self.showRoleFilter.bind(self,self.view[segId])},
      "lblSeperator":{"skin":"sknLblSeparator696C73","isVisible":true}
    };
    //segPath.info.allData={"sectionData":secData};
    //segPath.info.allData["rowsData"]={};
    if(typeof this.view[segId].info.allData!=="object"){
      this.view[segId].info.allData={};
      this.view[segId].info.allData["rowsData"]={};
      this.view[segId].info.allData["sectionData"]={};
    }
    var rowData={};
    var selectedIds=this.view[segId].info.selectedIds,removedIds=this.view[segId].info.removedIds;
    var filteredList=data;
    var rowValues=self.view.segSearchedUserDetails.info.allData?Object.values(self.view.segSearchedUserDetails.info.allData.rowsData):[];
    if(showCheckbox===true){
      filteredList= data.filter(function(rec){
      return (!self.view.segSearchedUserDetails.info.selectedIds.contains(rec.customerId||rec.userId));
    });
      filteredList=this.filterGroupsList(filteredList,Object.values(self.view.segSearchedUserDetails.info.removedIds));
    }else if(rowValues.length>0){
             filteredList=this.concatGroupRows(rowValues,data);
             }
    this.view.lblTotalUsers.text=" of "+this.getTwoDigitNumber(filteredList.length);
    var segData=filteredList.map(function(rec){
      if(showCheckbox===false){
        selectedIds.push(rec.customerId||rec.userId);
        if(removedIds[rec.customerId||rec.userId])
          delete removedIds[rec.customerId||rec.userId];
        else if(removedIds[rec.userName])
          delete removedIds[rec.userName];
      }
      rowData={
        "template":"flxSegUserDetails",
        "lblName":{"text":rec.fullName||rec.customerName,"skin":"sknLbl485C75LatoRegular13Px"},
        "fullName":rec.fullName||rec.customerName,
        "imgCheckBox": {"isVisible":false},
        "lblCheckbox": {"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
        "flxCheckBox":{"isVisible":showCheckbox,"onClick":function(){self.toggleCustomerCheckbox(self.view.segSelectionList,self.view.commonButtonsScreen1.btnSave,"customerId");}},
        "lblUserID":{"text":rec.userName,"skin":"sknLbl485C75LatoRegular13Px"},
        "userName":rec.userName,
        "userId":rec.userId||rec.customerId,
        "flxRole":{"width":showCross||showDelete?"22%":"25%"},
        "lblrole":{"text":rec.role,"skin":"sknLbl485C75LatoRegular13Px"},
        "role":rec.role,
        "flxRoleFilter":{"isVisible":false},
        "lblView":{"text":"View",
                   "skin":"sknLblLato13px117eb0",
                   "hoverSkin":"sknLbl117eb013pxHov",
                   "width":"8%",
                   "onTouchStart":function(context){
                     self.view.flxLoading3.setVisibility(true);
                     self.getApprovalPermissions(context,self.view[segId]);
                   }},
        "lblIconRemove":{"isVisible":showCross||showDelete,"text":showCross?"":"","skin":showCross?"sknIcon00000015px":"sknIcon00000018px","onTouchStart":function(context){
				self.removeUser(context);
        }},
        "lblSeperator":{"skin":"sknlblSeperatorD7D9E0","isVisible":true},
        "custInfo": rec
      };
      self.view[segId].info.allData.rowsData[rec.userName]=rowData;
      return rowData;
    });
    this.view[segId].info.allData.sectionData=secData;
    if(showCheckbox===false){
      this.view[segId].info.selectedIds=selectedIds.filter(function(item, pos){
        return selectedIds.indexOf(item)== pos;
      });
      this.view[segId].info.removedIds=removedIds;
      this.view.lblHeaderAddedUsers.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ADDEDUSERS")+" ("+this.getTwoDigitNumber(segData.length)+")";
    }
    if(showCheckbox&&segData.length===0){
      this.view.segSelectionList.setVisibility(false);
      this.view.flxHeaderScreen1.setVisibility(false);
      this.view.lblNoResultsScreen1.text= kony.i18n.getLocalizedString("i18n.frmCompanies.NoUsersGroup");
      this.view.lblNoResultsScreen1.setVisibility(true);
    }else if(showCheckbox){
      this.view.segSelectionList.setVisibility(true);
      this.view.flxHeaderScreen1.setVisibility(true);
      this.view.lblNoResultsScreen1.setVisibility(false);
      this.view.lblTotalUsers.text=" of "+this.getTwoDigitNumber(segData.length);
    }
    if(segData.length!==0){
    self.sortBy = self.getObjectSorter("lblName.text");
      secData.lblSortName=this.determineSortIconForSeg(this.sortBy,"lblName.text");
      var sortedData = segData.sort(self.sortBy.sortData);
    
    self.setListFiltersData(segData,this.view[segId]);
    this.view[segId].widgetDataMap=dataMap;
    this.view[segId].setData([[secData,sortedData]]);
    this.view[segId].setVisibility(true);
    }
    this.view.forceLayout();
  },
  filterGroupsList : function(array1,array2){
    let array3 = array1.concat(array2);
    array3 = array3.filter((item,index)=>{
      return (array3.indexOf(item) == index)
    });
    return array3;
  },
  concatGroupRows : function(segRows,data){
    var totalList=data;
    for(let a=0;a<segRows.length;a++)
      totalList=totalList.concat(segRows[a].custInfo);
    return totalList;
  },
  removeUser : function(context){
    var rowIndex=context.rowContext.rowIndex;
    var removedUserName=this.view.segSearchedUserDetails.data[0][1][rowIndex].lblUserID.text;
    var removedCustId=this.view.segSearchedUserDetails.data[0][1][rowIndex].custInfo.customerId||this.view.segSearchedUserDetails.data[0][1][rowIndex].custInfo.userName;
    this.view.segSearchedUserDetails.info.selectedIds.remove(removedCustId);
    delete this.view.segSearchedUserDetails.info.allData.rowsData[removedCustId];
    this.view.segSearchedUserDetails.info.removedIds[removedCustId]=this.view.segSearchedUserDetails.data[0][1][rowIndex].custInfo;
    this.view.segSearchedUserDetails.removeAt(rowIndex,0);
    if(this.view.segSearchedUserDetails.data[0][1].length===0){
    this.view.flxAddedUsersDetails.setVisibility(false);
    this.view.imgIcon.setVisibility(true);
    this.view.flxSelect.setVisibility(true);
    this.view.flxAddedUserSearch.setVisibility(false);
    this.view.btnAddUsersHeader.setVisibility(false);
    this.view.lblGroupDescriptionCount.setVisibility(false);
    this.view.lblGroupNameCount.setVisibility(false);
    this.view.segSearchedUserDetails.info.selectedIds=[];
      this.view["segSearchedUserDetails"].info.allData=undefined;
  }
	this.view.lblHeaderAddedUsers.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ADDEDUSERS")+" ("+(this.view.segSearchedUserDetails.data[0][1].length<10?"0"+this.view.segSearchedUserDetails.data[0][1].length:this.view.segSearchedUserDetails.data[0][1].length)+")";
    this.view.forceLayout();
  },
  isValidGroupName : function(){
    var existingGroupNames=this.view.tbxGroupNameValue.info.existingGroupNames;
    var givenGrpName=this.view.tbxGroupNameValue.text;
    var isValid=true;
    if(givenGrpName.trim().length===0){
      this.view.lblNoGroupNameError.text=kony.i18n.getLocalizedString("group_name_cannot_be_empty");
      isValid=false;
    }else if(existingGroupNames.includes(givenGrpName.trim())){
      if((this.action===this.actionConfig.edit&&this.view.tbxGroupNameValue.info.currentgroupName!==givenGrpName)||this.action===this.actionConfig.create){
       this.view.lblNoGroupNameError.text= kony.i18n.getLocalizedString("i18n.frmCompanies.group_name_already_exists");
      isValid=false;
      }
    }else if(this.containSpecialChars(givenGrpName)){
      this.view.lblNoGroupNameError.text = kony.i18n.getLocalizedString("kony.i18n.namespecialchar");
      isValid=false;
    }
    if(isValid===false){
      this.view.tbxGroupNameValue.skin="skinredbg";
      this.view.flxNoGroupNameError.setVisibility(true);
    }
    return isValid;
  },
  containSpecialChars: function(name){
    var regex = /[+=\\\\|<>^*%$#()!.,`";:?]/;  
    if(regex.test(name)){
      return true;
    }
    return false;
  },
  addUserPopupSave : function(){
    var selectedList=this.view.segSelectionList.info.selectedCust;
    if(this.view.flxAddGroups.isVisible){
    this.view.imgIcon.setVisibility(false);
    this.view.flxSelect.setVisibility(false);
    this.view.lblHeaderAddedUsers.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ADDEDUSERS")+" ("+(selectedList.length<10?"0"+selectedList.length:selectedList.length)+")";
    this.view.btnAddUsersHeader.setVisibility(true);
    this.view.flxAddedUserSearch.setVisibility(true);
    this.view.flxAddedUsersDetails.setVisibility(true);
    //this.view.segSearchedUserDetails.info={};
    this.setGroupUsersData("segSearchedUserDetails",selectedList);
    }else{
       var contractId=this.completeContractDetails.id;
    var coreCustomerId=this.view.btnAddSignatoryUsers.info.coreCustomerId;
    var payload={
      "signatoryGroupId":this.view.flxEditOptionSignatory.info,
      "signatoryGroupName": this.view.lblSignatoryGroupName.text,
      "signatoryGroupDescription": this.view.lblViewGroupDescriptionValue.text, 
      "coreCustomerId": coreCustomerId,
      "contractId": contractId,
      "signatories": []
    };
      var signatories=[];
    for(var k=0;k<selectedList.length;k++){
        signatories.push({
          "customerId":selectedList[k].userId||selectedList[k].customerId
        });
      }
      payload.signatories=JSON.stringify(signatories);
      this.presenter.updateSignatoryGroupDetails(payload,this.view.flxAddGroups.info.isView);
    }
    this.view.forceLayout();
  },
  getApprovalPermissions : function(context,segPath){
    var rowIndex=context.rowContext.rowIndex;
    var userName=segPath.data[0][1][rowIndex].lblUserID.text;
    this.presenter.getApprovalPermissionsForUser({
      "userName": userName
    });

  },
  setApprovalPermissions : function(accounts){
    this.view.flxAddUserScreen.top="110px";
    if(this.view.flxAddGroups.isVisible&&this.view.flxAddUsersPopup.isVisible)
    this.view.flxBackOption.setVisibility(true);
    else{
      this.view.flxBackOption.setVisibility(false);
      this.view.flxAddUsersPopup.setVisibility(true);
      this.view.flxAddUserScreen.top="80px";
    }
    this.view.toggleButtons.setVisibility(true);
    this.view.tbxUsersSearchPopup.text="";
    this.view.flxClearUsersSearchPopup.setVisibility(false);
    this.view.flxUsersFeaturesContainer.setVisibility(true);
    this.view.flxButtonsScreen1.setVisibility(false);
    this.view.flxSegmentContainer.setVisibility(false);
    this.view.flxCustFeaturesListContainer.setVisibility(true);
    this.view.flxAccFeaturesListContainer.setVisibility(false);
    this.view.flxHeaderLeftSection.setVisibility(false);
    var featureLvlPermissions={};
    for(var x=0;x<accounts.length;x++){
      var accountJSON={
        "accountId":accounts[x].accountId,
        "accountName":accounts[x].accountName,
        "ownerType":accounts[x].ownerType,
        "accountType":accounts[x].accountType
      };
      for(var y=0;y<accounts[x].features.length;y++){
        if(!featureLvlPermissions[accounts[x].features[y].featureId]){
          featureLvlPermissions[accounts[x].features[y].featureId]={
            "featureName": accounts[x].features[y].featureName,
            "featureStatus": accounts[x].features[y].featureStatus,
            "featureId": accounts[x].features[y].featureId,
            "actions":{}
          }
        }
        for(var z=0;z<accounts[x].features[y].actions.length;z++){
          if(!featureLvlPermissions[accounts[x].features[y].featureId].actions[accounts[x].features[y].actions[z].actionId]){
            featureLvlPermissions[accounts[x].features[y].featureId].actions[accounts[x].features[y].actions[z].actionId]={
              "actionId": accounts[x].features[y].actions[z].actionId,
              "actionDescription": accounts[x].features[y].actions[z].actionDescription,
              "actionName": accounts[x].features[y].actions[z].actionName,
              "actionStatus": accounts[x].features[y].actions[z].actionStatus,
              "accounts":{}
            }
          }
          featureLvlPermissions[accounts[x].features[y].featureId].actions[accounts[x].features[y].actions[z].actionId].accounts[accounts[x].accountId]=accountJSON;
        }
      }
    }
    kony.print("account level permissions"+featureLvlPermissions);
    this.setFeatureLevelPermissions(featureLvlPermissions);
    this.view.flxLoading3.setVisibility(false);
    this.featureLevelPermissions=featureLvlPermissions;
  },
  setFeatureLevelPermissions : function(featureLvlPermissions){
    var self=this;
    var featureIds=Object.keys(featureLvlPermissions);
    if(featureIds.length===0){
      this.view.rtxMsgNoFeatureRecords.setVisibility(true);
      this.view.flxFeaturesByCustomerCont.setVisibility(false);
    }else{
      this.view.rtxMsgNoFeatureRecords.setVisibility(false);
      this.view.flxFeaturesByCustomerCont.setVisibility(true);
    self.view.flxFeaturesByCustomerCont.removeAll();
    for (var x=0;x<featureIds.length;x++){
      var num = x>10 ? x : "0"+x;
      var collapsibleSegmentToAdd = new com.adminConsole.serviceDefinition.viewFeatureAction({
        "id": "featureRow" +num,
        "isVisible": true,
        "width": "100%",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": "20px",
        "left":"0px"
      }, {}, {});
      collapsibleSegmentToAdd.lblToggle.text = "\ue922";
      collapsibleSegmentToAdd.flxHideDisplayContent.isVisible = false;
      collapsibleSegmentToAdd.lblFeatureName.text=featureLvlPermissions[featureIds[x]].featureName;
      collapsibleSegmentToAdd.statusValue.text=featureLvlPermissions[featureIds[x]].featureStatus=== "SID_FEATURE_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      collapsibleSegmentToAdd.statusIcon.skin=featureLvlPermissions[featureIds[x]].featureStatus=== "SID_FEATURE_ACTIVE" ?"sknFontIconActivate":"sknfontIconInactive";
      collapsibleSegmentToAdd.statusIcon.text="\ue921";
      collapsibleSegmentToAdd.lblTotalActions.isVisible=false;
      collapsibleSegmentToAdd.flxFeatureActionsHeader.isVisible=false;
      collapsibleSegmentToAdd.lblAvailableActions.text= kony.i18n.getLocalizedString("i18n.frmCompanies.approvalActions");
      
      collapsibleSegmentToAdd.flxToggle.onClick = self.toggleFeaturesonClick.bind(self,collapsibleSegmentToAdd);
      if(x===0)
        collapsibleSegmentToAdd.top="0px";
      self.view.flxFeaturesByCustomerCont.add(collapsibleSegmentToAdd);
      self.setFeatureSegmentData(featureLvlPermissions[featureIds[x]], collapsibleSegmentToAdd, num);
    }
    }
    this.view.forceLayout();
  },
  setFeatureSegmentData: function(feature,collapsibleSegmentToAdd, c) {
    //kony.adminConsole.utils.hideProgressBar(this.view);
    var self = this;
    var dataMap = {
      "flxSignatoryGroupActionHeader":"flxSignatoryGroupActionHeader",
      "flxHeader":"flxHeader",
      "flxActionDetails":"flxActionDetails",
      "flxRow1":"flxRow1",
      "flxToggle":"flxToggle",
      "lblToggle":"lblToggle",
      "lblFeatureName":"lblFeatureName",
      "flxRight":"flxRight",
      "statusIcon": "statusIcon",
      "statusValue": "statusValue",
      "flxRow2":"flxRow2",
      "lblMonetaryActions":"lblMonetaryActions",
      "lblCountActions":"lblCountActions",
      "flxViewAccountsHeader":"flxViewAccountsHeader",
      "flxAccountNameHeader":"flxAccountNameHeader",
      "lblAccountNameHeader":"lblAccountNameHeader",
      "fontIconAccNameSort":"fontIconAccNameSort",
      "flxAccountNumberHeader":"flxAccountNumberHeader",
      "lblAccountNumberHeader":"lblAccountNumberHeader",
      "flxAccountTypeHeader":"flxAccountTypeHeader",
      "lblAccountTypeHeader":"lblAccountTypeHeader",
      "fontIconAccTypeFilter":"fontIconAccTypeFilter",
      "lblFASeperator2":"lblFASeperator2",
      "lblFASeperator1":"lblFASeperator1",
      "lblFASeperatorTop":"lblFASeperatorTop",
      
      //body template map
      "flxSignatoryGroupActionBody":"flxSignatoryGroupActionBody",
      "flxViewAccounts":"flxViewAccounts",
      "lblAccountNameHeader":"lblAccountNameHeader",
      "lblAccountNumberHeader":"lblAccountNumberHeader",
      "lblAccountTypeHeader":"lblAccountTypeHeader",
      "template" : "template"
    };
    var count=0;
    var actionIds=Object.keys(feature.actions);
    var segData=[];
    var secData,rowData;
    var currAction={};
    var currAccountIds=[];
    collapsibleSegmentToAdd.lblCountActions.text=actionIds.length>10?actionIds.length:"0"+actionIds.length;
    collapsibleSegmentToAdd.SegActions.info={"allData":{}};
    for(var x=0;x<actionIds.length;x++){
      currAction=feature.actions[actionIds[x]];
      currAccountIds=Object.keys(currAction.accounts);
      secData={
        "template":"flxSignatoryGroupActionHeader",
        "flxHeader":"flxHeader",
        "flxActionDetails":"flxActionDetails",
        "flxRow1":"flxRow1",
        "flxToggle":{"onClick":function(context){self.toggleSignGroupActions(context,collapsibleSegmentToAdd);}},
        "lblToggle":{"text":"\ue922"},
        "flxViewAccountsHeader":{"isVisible":false},
        "lblFeatureName":{"text":currAction.actionName},
        "statusIcon": {"skin":currAction.actionStatus === "SID_ACTION_ACTIVE"?"sknFontIconActivate":"sknfontIconInactive","text":"\ue921"},
        "statusValue": {"text":currAction.actionStatus=== "SID_ACTION_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
        "lblMonetaryActions":{"text":kony.i18n.getLocalizedString("i18n.frmCompanies.Accounts")+":"},
        "lblCountActions":{"text":self.getTwoDigitNumber(currAccountIds.length)},
        "lblAccountNameHeader":{"text":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME")},
        "fontIconAccNameSort":{"text":"\ue92a","skin":"sknIcon15px","hoverSkin" :"sknlblCursorFont"},
        "flxAccountNameHeader":{"onTouchStart":function(context){
          self.sortAndSetData("lblAccountNameHeader.text",collapsibleSegmentToAdd.SegActions,3,context.rowContext.sectionIndex)
        }},
        "lblAccountNumberHeader":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER")},
        "lblAccountTypeHeader":{"text":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE")},
        "fontIconAccTypeFilter":{"onClick": function(widget, context) {
              this.setAccFilter(this.view.accTypeFilterMenu, 'fontIconAccTypeFilter', collapsibleSegmentToAdd,context);
          }.bind(this)},
        "lblFASeperator2":"-",
        "lblFASeperator1":"-",
        "lblFASeperatorTop":"-",
      }
      rowData=[];
      var rowJSON={};
      for(var y=0;y<currAccountIds.length;y++){
        rowJSON=({
          "template":"flxSignatoryGroupActionBody",
          "flxSignatoryGroupActionBody":{"isVisible":false},
          "lblAccountNameHeader":{"text":currAction.accounts[currAccountIds[y]].accountName},
          "lblAccountNumberHeader":{"text":currAction.accounts[currAccountIds[y]].accountId},
          "lblAccountTypeHeader":{"text":currAction.accounts[currAccountIds[y]].accountType},
        });
        collapsibleSegmentToAdd.SegActions.info.allData[currAction.accounts[currAccountIds[y]].accountType] = {"sectionData":secData,"rowData":rowData};
        rowData.push(rowJSON);
      }
      
      this.sortBy = this.getObjectSorter("lblAccountNameHeader.text");
      this.sortBy.inAscendingOrder = true;
      rowData = rowData.sort(this.sortBy.sortData);
      segData.push([secData,rowData]);
    }
    
    collapsibleSegmentToAdd.SegActions.widgetDataMap = dataMap;
    collapsibleSegmentToAdd.SegActions.setData(segData);
    this.view.tbxUsersSearchPopup.placeholder =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    collapsibleSegmentToAdd.flxToggle.hoverSkin="sknFlxPointer";
    this.view.forceLayout();
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
  * create feature cards for customer at acount level
  */
  createAccountFeatureCards : function(accounts){
    if(accounts.length===0){
      this.view.rtxMsgNoAccFeatureRecords.setVisibility(true);
      this.view.flxFeaturesByCustomerCont.setVisibility(false);
    }else{
      this.view.rtxMsgNoAccFeatureRecords.setVisibility(false);
    this.view.flxAccountFeaturesCardList.removeAll();
    this.view.flxCustFeaturesListContainer.setVisibility(false);
	this.view.flxAccFeaturesListContainer.setVisibility(true);
    for(var i = 0;i<accounts.length;i++){

      var num = i>10 ? ""+i : "0"+i;
      var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
        "id": "featureAccCard" +num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width":"100%",
        "top": "15dp"
      }, {}, {});
      featureCardToAdd.isVisible = true;
      featureCardToAdd.showThreeColumns();
      this.setDataActionsForAccFeatureCard(featureCardToAdd  , accounts[i]);
      this.view.flxAccountFeaturesCardList.add(featureCardToAdd);
    }
    }
    this.view.forceLayout();
  },
  /*
  * assign data and actions for a feature card at account level
  * @param: cust feature card path, data to set
  */
  setDataActionsForAccFeatureCard : function(featureCard,account){
    var self=this;

    featureCard.flxDynamicWidgetsContainer.isVisible = false;
    featureCard.flxHeadingRightContainer.isVisible = true;
    featureCard.btnView.isVisible = false;
    featureCard.btnEdit.isVisible = false;
    
    this.view.tbxUsersSearchPopup.placeholder = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.SearchByAccountFeature")+", Action Name";
    featureCard.lblName.skin = "sknLbl192B45LatoRegular14px";
    featureCard.lblName.text = "Account Number:" + account.accountId;
    
    featureCard.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE");
    featureCard.lblData1.text = account.accountType?account.accountType:"N/A";

    featureCard.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME");
    featureCard.lblData2.text = account.accountName;

    featureCard.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE");
    featureCard.lblData3.text = account.ownerType?account.ownerType:"N/A";

    featureCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.CompanyFeatures");
    featureCard.lblCount.text = account.features.length <10 ?"(0"+ account.features.length+")" :"("+ account.features.length+")";

    featureCard.flxArrow.onClick = this.toggleCardVisibility.bind(this,featureCard);

    featureCard.toggleCollapseArrow(false);
    this.setFeaturesCardData(featureCard.segAccountFeatures , account.features);
    
  },
/*
  * set features and actions segment data in feature card
  * @param: segment widget path, features list, category(1:cust level,2:acc level)
  */
  setFeaturesCardData : function(segmentPath , features){
    var self =this;
    var featuresSegData = features.map(function(rec){
      var segRowData = [];
      let totalLen = rec.actions.length;
      var segSecData = {
        "id":rec.featureId,
        "flxViewActionHeader":{"isVisible":false},
        "lblFASeperator3":{"isVisible":false,"text":"-"},
        "lblArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "flxArrow":{"onClick": self.toggleSegmentSecArrow.bind(self,segmentPath)},
        "lblFeatureName":rec.featureName,
        "statusValue":{"text":rec.featureStatus === "SID_FEATURE_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
        "statusIcon":{"skin": rec.featureStatus  === "SID_FEATURE_ACTIVE"?"sknFontIconActivate" : "sknfontIconInactive",
                      'text':''},
        "lblCustom":{"isVisible":false},
        "lblFASeperator1":"-",
        "lblFASeperator2":"-",
        "lblAvailableActions": kony.i18n.getLocalizedString("i18n.frmCompanies.approvalActions"),
        "lblCountActions": rec.actions.length,
        "lblTotalActions":{"isVisible":false},
        'flxSelectedActions' :{'width':"50%"},
        "lblActionHeader":kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP"),
        "lblActionDescHeader":kony.i18n.getLocalizedString("i18n.frmTrackApplication.DescriptionCAPS"),
        "lblActionStatusHeader":kony.i18n.getLocalizedString("i18n.permission.STATUS"),
        "template":"flxContractsFAHeaderView"
      };
      for(var i=0;i < rec.actions.length; i++){
        var featureActionId = rec.featureId+self.currencyValue+rec.actions[i].id;
        segRowData.push({
          "id":rec.actions[i].id,
          "isRowVisible": false,
          "flxContractsFABodyView":{"isVisible":false},
          "lblActionName":{"text":rec.actions[i].actionName},
          "lblActionDesc":{"text":rec.actions[i].actionDescription,
                           "width": "55%"},
          "statusValue":{"text":rec.actions[i].actionStatus === "SID_ACTION_ACTIVE" ?kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
          "statusIcon":{"skin":rec.actions[i].actionStatus === "SID_ACTION_ACTIVE" ?"sknFontIconActivate" : "sknfontIconInactive",
                        "text" :''},//"sknfontIconInactive",
          "lblCustom":{"isVisible": false},
          "template":"flxContractsFABodyView",
        });
      }
      if( segRowData.length === 0){
        return [segSecData, [{"template": "flxContractsFAHeaderView"}]];
      }
      else {
        return [segSecData, segRowData];
      }      
    });
    segmentPath.widgetDataMap = {
      "flxViewActionHeader":"flxViewActionHeader",
      "flxHeader":"flxHeader",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "lblFeatureName":"lblFeatureName",
      "statusIcon":"statusIcon",
      "statusValue":"statusValue",
      "lblArrow":"lblArrow",
      "flxArrow":"flxArrow",
      "lblFASeperator1":"lblFASeperator1",
      "lblFASeperator3":"lblFASeperator3",
      "lblActionHeader":"lblActionHeader",
      "lblActionDescHeader":"lblActionDescHeader",
      "lblActionStatusHeader":"lblActionStatusHeader",
      "lblFASeperator2":"lblFASeperator2",
      "flxContractsFAHeaderView":"flxContractsFAHeaderView",
      "lblActionName":"lblActionName",
      "lblActionDesc":"lblActionDesc",
      "lblCustom":"lblCustom",
      "flxContractsFABodyView":"flxContractsFABodyView"     
    };
    segmentPath.setData(featuresSegData);
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
  deleteSignatoryClick:function(){
    var self=this;
    var signatoryGroupName = this.view.lblSignatoryGroupName.text;
    var contractId = this.completeContractDetails.id;
    var signatoryGroupId=this.view.flxEditOptionSignatory.info;
    self.presenter.isSignatoryGroupEligibleForDelete({"signatoryGroupId":signatoryGroupId,
                                                      "signatoryGroupName":signatoryGroupName},true);
    this.view.forceLayout();

  },
  editSignatoryClick : function(isView,record,featureCard){
    var self=this;
    var customerName=isView?this.view.lblCompanyDetailName.text:featureCard.lblName.text;
    var customerId=isView?this.view.lblViewCustomerIdValue.text:featureCard.lblData1.text;
    var groupName=isView?this.view.lblSignatoryGroupName.text:record.signatoryGroupName;
    var groupDesc=isView?this.view.lblViewGroupDescriptionValue.text:record.signatoryGroupDescription;
    var contractId=this.completeContractDetails.id;
    this.view.btnAddSignatoryUsers.info={
      "contractId": contractId,
      "coreCustomerId": customerId
    };
    this.action="EDIT";
    this.noGroupUsers=[];
    this.view.segSearchedUserDetails.setData([]);
    this.view.segSearchedUserDetails.info.selectedIds=[];
    this.view.segSearchedUserDetails.info.removedIds=[];
    this.view["segSearchedUserDetails"].info.allData=undefined;
    if(this.view.flxSelectedUsers.info.length===0)
    	self.presenter.getSignatoryGroupDetails({"signatoryGroupId":record.signatoryGroupId},true);
    else{
      for(let k=0; k<this.view.flxSelectedUsers.info.length; k++){
        var custId = this.view.flxSelectedUsers.info[k].customerId;
        this.view.segSearchedUserDetails.info.selectedIds.push(custId);
      }
      self.setGroupUsersData("segSearchedUserDetails",this.view.flxSelectedUsers.info);
      this.view.lblHeaderAddedUsers.text=kony.i18n.getLocalizedString("i18n.frmCompanies.ADDEDUSERS")+" ("+(this.view.flxSelectedUsers.info.length<10?"0"+this.view.flxSelectedUsers.info.length:this.view.flxSelectedUsers.info.length)+")";
      this.view.flxAddedUsersDetails.setVisibility(true);
    }
    this.view.flxAddGroups.setVisibility(true);
    this.view.flxAddGroups.bottom="0dp";
    this.view.flxAddGroups.top="10dp";
    this.view.flxAddGroups.info={"isView":isView,"signGroupId":record.signatoryGroupId};
    this.toggleAddGroupVerticalTabs(this.view.verticalTabs.flxImgArrow1,this.view.verticalTabs.btnOption1);
    this.view.verticalTabs.lblOptional2.setVisibility(true);
    this.view.flxGroupDetails.setVisibility(true);
    this.view.flxSelectedUsers.setVisibility(false);
    this.view.flxHeaderAddedUsersName.setVisibility(true);
    this.view.tbxGroupNameValue.skin="skntbxLato35475f14px";
    this.view.flxNoGroupNameError.setVisibility(false);
    this.view.btnAddGroupSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UpdateGroup_UC");
    this.view.btnAddGroupSave1.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UpdateGroup_UC");
    //this.view.lblDescOptional.setVisibility(false);
    //this.view.flxAddGroupRightButtons.left="25%";
    this.view.btnAddGroupSave.width="150dp";
    this.view.flxAddGroupRightButtons.width="500dp";
    this.view.lblHeaderAddedUsersName.text=customerName+" ("+customerId+")";  
    this.view.lblHeaderAddedUsersCustomersId.setVisibility(false);//="("+customerId+")";
    if(isView===false)
    	this.view.tbxGroupNameValue.info={"existingGroupNames":featureCard.segAccountFeatures.info.existingNames};
    this.view.tbxGroupNameValue.info.currentgroupName=groupName;
    this.view.tbxGroupNameValue.text=groupName; 
    this.view.txtGroupDescription.text=groupDesc;
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      self.view.breadcrumbs.btnPreviousPage.setVisibility(false);
	  self.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      self.backToCompanyDetails(6);
    };
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.text = this.view.lblCompanyDetailName.text.toUpperCase();
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.Contracts.EditSignatoryGroup");
    this.view.forceLayout();
  },
  showRoleFilter:function(segPath,event,context){
    var filterPath;
    var adjustRight=0;
    if(segPath.id==="segSelectionList"){
      filterPath=this.view.flxFilterMenu;
    }else if(segPath.id==="segSearchedUserDetails"){
      filterPath=this.view.flxRoleFilter;
      adjustRight=5;
    }else{
      filterPath=this.view.flxRoleFilterView;
    }
    if(filterPath.isVisible){
      filterPath.setVisibility(false);
    }else{
      filterPath.onHover = this.onHoverSettings;
      filterPath.setVisibility(true);
    var flxRight = context.widgetInfo.frame.width - event.parent.frame.x - event.frame.x+adjustRight;
    filterPath.right = (flxRight - 32) + "dp";
  }
    this.view.forceLayout();
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
  /*
   * filters groups list based on selected role
   * @param: users backend data
   * @return : filtered data
   */
  filterBasedOnRole : function(componentPath,segPath){
    var selFilter =[],count=0,dataToReturn=[];
    var usersData = Object.values(segPath.info.allData.rowsData);
    var secData=segPath.info.allData.sectionData;
    var roleIndices = componentPath.segStatusFilterDropdown.selectedIndices;
    var selRoleInd = roleIndices ? roleIndices[0][1] : [];
    for (var j = 0; j < selRoleInd.length; j++) {
      selFilter.push(componentPath.segStatusFilterDropdown.data[selRoleInd[j]].lblDescription);
    }
    for(var i=0;i<usersData.length; i++){
      if (selFilter.indexOf(usersData[i].lblrole.text) >= 0){
        dataToReturn.push(usersData[i]);
      }
    }
	return [[secData,dataToReturn]];
  },
    /*
  * set ownership filter data on expand of each account in bulk update popup
  */
  filterAccountRowsInAddUser : function(){
    var selFilter =[], dataToShow =[],count = 0;
    var componentPath=this.view.accTypeFilterMenu.info.component;
    var selInd = this.view.accTypeFilterMenu.info.sectionIndex;
    var segmentData=componentPath.SegActions.data;
    var segData = componentPath.SegActions.info.allData;
    var selectedAccType = segmentData[selInd][0].lblFeatureName.text;
    var sectionData = segData[selectedAccType].sectionData;
    var accountsData = segData[selectedAccType].rowData;
    var ownershipIndices = this.view.accTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
    var selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter.push(this.view.accTypeFilterMenu.segStatusFilterDropdown.data[selOwnershipInd[j]].lblDescription);
    }
    for(var i=0;i<accountsData.length; i++){
      if (selFilter.indexOf(accountsData[i].lblAccountTypeHeader.text) >= 0){
        accountsData[i].flxSignatoryGroupActionBody.isVisible = true;
        count = count +1;
      }
      else
        accountsData[i].flxSignatoryGroupActionBody.isVisible = false;
    }
    componentPath.SegActions.rowTemplate = "flxSignatoryGroupActionBody";
    componentPath.SegActions.setSectionAt([sectionData,accountsData], selInd);
    //this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.setVisibility(false);
    this.view.forceLayout();
  },
  searchAddGroupUsers : function(searchBoxText,segPath){
    var searchText=searchBoxText.toLowerCase();
    var usersData = Object.values(segPath.info.allData.rowsData);
    var secData=segPath.info.allData.sectionData;
    var noResultsScreen=segPath.id==="segSearchedUserDetails"?this.view.lblNoResultsScreenAdd:this.view.lblNoResultsScreen1;
    var searchResults=[];
    if(searchText.length===0){
      searchResults=usersData;
    }else{
      searchResults=usersData.filter(function(user){
        if(user.lblName.text.toLowerCase().indexOf(searchText)>=0||user.lblUserID.text.toLowerCase().indexOf(searchText)>=0)
          return user;
      });

    }
    if(searchResults.length>0){
      noResultsScreen.setVisibility(false);
      segPath.setVisibility(true);
      segPath.setData([[secData,searchResults]]);
    }else{
      noResultsScreen.text=kony.i18n.getLocalizedString("i18n.Messages.SuggestionsNoResultsFound");
      noResultsScreen.setVisibility(true);
      segPath.setVisibility(false);
    }
    this.view.forceLayout();
  },
  searchApprovalPermissions : function(searchText){
    var permissions=JSON.parse(JSON.stringify(this.accLvlPermissions));
    var filteredPermissions=[];
    if(searchText.length==0){
      if(this.view.flxCustFeaturesListContainer.isVisible)
        this.setFeatureLevelPermissions(this.featureLevelPermissions);
      else
        this.createAccountFeatureCards(this.accLvlPermissions);
    }else{      
      if(this.view.flxCustFeaturesListContainer.isVisible)
        this.searchFeatureLvlPermission(searchText);
      else{
        filteredPermissions=permissions.filter(function(account){
          if(account.accountId.toLowerCase().indexOf(searchText)>-1)
            return true;
          var accFeatures=[];
          var featureName="";
          var actionName="";
          for(let a=0;a<account.features.length;a++){
            featureName=account.features[a].featureName.toLowerCase();
            if(featureName.indexOf(searchText)>=0)
              return account.features[a];
            var searchedActions=[];
            for(let x=0;x<account.features[a].actions.length;x++){
              actionName=account.features[a].actions[x].actionName.toLowerCase();
              if(actionName.indexOf(searchText)>=0)
                searchedActions.push(account.features[a].actions[x]);
            }
            if(searchedActions.length>0){
              account.features[a].actions=searchedActions;
              return account.features[a];
            }
          }
        });
        this.createAccountFeatureCards(filteredPermissions);
      }
    }
  },
  searchFeatureLvlPermission :function(searchText){
    var featurePermissions=JSON.parse(JSON.stringify(this.featureLevelPermissions));
    var features=Object.values(featurePermissions);
    var featureKeys=Object.keys(featurePermissions)
    var actionsVal=[];
    var actionName="";
    var searchedActions=[];
    var filteredPermissions={};
    for(let p=0;p<featureKeys.length;p++){
      if(features[p].featureName.toLowerCase().indexOf(searchText)>-1)
        filteredPermissions[featureKeys[p]]=features[p];
      else{
        actionsVal=Object.values(features[p].actions);
        searchedActions={};
        for(let x=0;x<actionsVal.length;x++){
          actionName=actionsVal[x].actionName.toLowerCase();
          if(actionName.indexOf(searchText)>=0)
            searchedActions[actionsVal[x].actionId]=actionsVal[x];
        }
        if(Object.keys(searchedActions).length>0){
          features[p].actions=searchedActions;
          filteredPermissions[featureKeys[p]]=features[p];
        }
      }
    }
    this.setFeatureLevelPermissions(filteredPermissions);
  },
  saveGroupChanges : function(){
    var contractId=this.completeContractDetails.id;
    var coreCustomerId=this.view.btnAddSignatoryUsers.info.coreCustomerId;
    var payload={
      "signatoryGroupName": this.view.tbxGroupNameValue.text,
      "signatoryGroupDescription": this.view.txtGroupDescription.text, 
      "coreCustomerId": coreCustomerId,
      "contractId": contractId,
      "signatories": []
    };
    var segData=this.view.segSearchedUserDetails.data.length>0?this.view.segSearchedUserDetails.data[0][1]:[];
    var signatories=[];
    if(this.action===this.actionConfig.create){
    for(var i=0;i<segData.length;i++){
      signatories.push({
        "customerId":segData[i].custInfo.userId||segData[i].custInfo.customerId
      });
    }
      payload.signatories=JSON.stringify(signatories);
    this.presenter.createSignatoryGroup(payload);
    }else{
      payload.signatoryGroupId=this.view.flxAddGroups.info.signGroupId;
      var selectedIds=this.view.segSearchedUserDetails.info.selectedIds;
      var originalIds=[];
      var originalList=this.view.flxSelectedUsers.info;
      for(var x=0;x<originalList.length;x++){
        originalIds.push(originalList[x].userId||originalList[x].customerId);
      }
      var removedUsers=this.updatedIdUsersGroups(originalIds,selectedIds);
      var addedUsers=this.updatedIdUsersGroups(selectedIds,originalIds);
      for(var j=0;j<removedUsers.length;j++){
        signatories.push({
          "customerId":removedUsers[j],
          "isUserRemoved":true
        });
      }
      for(var k=0;k<addedUsers.length;k++){
        if(!originalIds.contains(addedUsers[k]))
        signatories.push({
          "customerId":addedUsers[k]
        });
      }
      payload.signatories=JSON.stringify(signatories);
      this.presenter.updateSignatoryGroupDetails(payload,this.view.flxAddGroups.info.isView);
    }

  },
  updatedIdUsersGroups: function(a1,a2) {

    return a1.filter(function(x) {

      if(a2.indexOf(x) >= 0) return false;

      else return true;

    });

  },
  createEditGroupSuccess : function(context){
    this.view.flxCompanyDetails.setVisibility(true);
    this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),context.message);
    if(context.isView===false)
      this.view.breadcrumbs.btnPreviousPage.onClick();
    else
      this.presenter.getSignatoryGroupDetails({"signatoryGroupId":context.signGroupId},false);
  },
  searchSignatoryGroups : function(){
    var custId = this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(custId);
    var signData=editUserObj.signatoryGroups;
    var searchText=this.view.searchEditSignatory.tbxSearchBox.text.trim();
    var dataToAssign=[];
    if(searchText.length===0){
      this.setSignatoryGroupsData();
    }else{
      dataToAssign = signData.filter(function(rec){
        var name = (rec.signatoryGroupName).toLowerCase();
        return (name.indexOf(searchText.toLowerCase()) > -1);
      });
      if(dataToAssign.length>0){
        this.view.flxNoResultsFound.setVisibility(false);
        this.view.flxResults.setVisibility(true);
        this.setSignGroupsSegData(dataToAssign);
      }else{
        this.view.flxNoResultsFound.setVisibility(true);
        this.view.flxResults.setVisibility(false);
      }
    }
  },
  setSignatoryGlobalData : function(signGroupData){
    var customers=this.completeContractDetails.contractCustomers;
    var signCustomers=[];
    for(var a=0;a<customers.length;a++){
      signCustomers[a]=customers[a];
      signCustomers[a].signatoryGroups=[];
      for(var b=0;b<signGroupData.length;b++){
        if(customers[a].coreCustomerId===signGroupData[b].coreCustomerId){
          signCustomers[a].signatoryGroups=signGroupData[b].signatoryGroups;  
          break;
        }
      }
    }
    this.signatoryGroups = signCustomers;
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
  /*
  * show popup on edit click if features of contract are being updated in backend
   * @param: service name
  */
  //showFeaturesLoadingPopup : function(){
	  showFeaturesLoadingPopup : function(serviceName){
   var scopeObj =this;
   // this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EnableApprovalRules");
   // this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text = "Contract cannot be edited as features are being updated" ;
    this.view.suspendFeaturePopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Update");
    this.view.suspendFeaturePopup.rtxPopUpDisclaimer.text =  kony.i18n.getLocalizedString("i18n.contracts.contractEditWarningMessage1") +
                                                           // (serviceName || "")+  kony.i18n.getLocalizedString("i18n.contracts.contractEditWarningMessage2");
														   +"\""+(serviceName || "") +"\""+  kony.i18n.getLocalizedString("i18n.contracts.contractEditWarningMessage2");
    this.view.suspendFeaturePopup.btnPopUpCancel.setVisibility(false);
  //  this.view.suspendFeaturePopup.btnPopUpDelete.text = "OK";
  this.view.suspendFeaturePopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.OK");
    this.view.flxSuspendFeaturePopup.setVisibility(true);
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    }
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
  onHideContractsForm : function(){
    this.viewContractServiceDef = [];
    this.hideRequiredMainScreens();
    this.view.flxBreadcrumb.setVisibility(false);
  },
  
  createEditContractSuccess:function(context){
    if(context === "EDIT_SUCCESS")
      this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),"Contract has been updated successfully");
    else if(context === "CREATE_SUCCESS")
      this.presenter.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),"Contract has been created successfully");
    //this.getCompanyAllDetails(context.contractId, 2);
  },
     /*
  * append next set of data for account level features and limits using pagination
  */
  onSegmentPaginationChangeAddUser : function(currentValue,option){
    kony.adminConsole.utils.showProgressBar(this.view);
    var self =this;
    var searchText = option===1?this.view.searchEditFeatures.tbxSearchBox.text:this.view.searchEditLimits.tbxSearchBox.text;
    var isSearch = searchText.length > 0 ? true : false;
    var offsetVal=currentValue *10;
    var featuresToAppend;
    var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserObj = this.presenter.getAccountsFeaturesForAddUser(selCustData.orignalData.coreCustomerId);
    var accLevelFeaturesMap = option===1?editUserObj.accountMapFeatures:editUserObj.accLevelLimits;
    var accSize = isSearch === false ? accLevelFeaturesMap.size : this.searchResultsFeaturesLimits.length;
    var featuresToAppend = isSearch === true ? this.searchResultsFeaturesLimits : Array.from(accLevelFeaturesMap.values());
    var featuresTimeout;
    if(offsetVal-10 < featuresToAppend.length){
      this.updatePaginationValues(currentValue,option);
      kony.adminConsole.utils.showProgressBar(this.view);
      if(option===1)
      featuresTimeout = setTimeout(self.createDynamicAccountFeatureCards.bind(self,offsetVal-10,offsetVal,featuresToAppend));
      else
        featuresTimeout = setTimeout(self.createDynamicAccountLimitsCards.bind(self,offsetVal-10,offsetVal,featuresToAppend));
      self.pageCount.PAGE_OFFSET = offsetVal;
    }
  },
});

define({ 
  prevIndex : -1,
  isEditUserAccessVisited:{},
  enrollCustomerRecordData:[],
  bulkUpdateListboxData: [],
  bulkUpdateAllFeaturesList: [],
  bulkUpdateAllFeaturesLimits: [],
  serviceDefinitions: [],
  segment_ROW_FRAMES: {},
  bulkUpdateAccLevelActions: [],
  customerToEnrollInfo: "",
  legalentityid1: "",
  enrollSegRowInd: 0,
  actionsAccountJSON: {},
  ownershipFilterData :{},
  searchFeatureOnEdit:{},
  accIdForByFeatures:{},
  accountTypeFilter:{},
  toggleAccountSelectedId:{},
  selectedSectionIndexFilter:{},
  selAccCount: {},
  setWidgetDataNoResult: [],
  accountsBulkUpdate: {},
  limitsValidationObject: {},
  limitGroupsValidationObject: "",
  prevSelectedStateEditUser: {},
  removedEnrollCustomers: {},
  createContractRequestParam: "",
  selectedServiceCard: "",
  monetaryLimits: {},
  selectedCustomers: [],
  completeContractDetails: {},
  prevRole: {},
  viewContractServiceDef: [],
  bulkUpdateAllFeaturesListContract: [],
  totalAccountsViewFeature: {},
  searchFeaturePopupResult: {
    isSearchedMatched: false
  },
  isSearchPerformedViewCont: false,
  actionConfig: {
    create: "CREATE",
    edit: "EDIT",
    editUser: "EDIT_USER",
    editSingleUser: "EDIT_SINGLE_USER"
  },
  action:"CREATE",
  enrollAction :"CREATE",
  isDataSetVisited: false,
  usersSelectedSignatoryList: {},
  custActionAccountJSON: {},
  limitId: {
    PRE_APPROVED_DAILY_LIMIT: "PRE_APPROVED_DAILY_LIMIT",
    AUTO_DENIED_DAILY_LIMIT: "AUTO_DENIED_DAILY_LIMIT",
    PRE_APPROVED_WEEKLY_LIMIT: "PRE_APPROVED_WEEKLY_LIMIT",
    AUTO_DENIED_WEEKLY_LIMIT: "AUTO_DENIED_WEEKLY_LIMIT",
    PRE_APPROVED_TRANSACTION_LIMIT: "PRE_APPROVED_TRANSACTION_LIMIT",
    AUTO_DENIED_TRANSACTION_LIMIT: "AUTO_DENIED_TRANSACTION_LIMIT",
    WEEKLY_LIMIT: "WEEKLY_LIMIT",
    MAX_TRANSACTION_LIMIT: "MAX_TRANSACTION_LIMIT",
    DAILY_LIMIT: "DAILY_LIMIT"
  },
  searchResultsFeaturesLimits: [],
  pageCount:{
    PAGE_OFFSET:0,
    TOTAL_PAGES:0
  },
  editUserCustomersList :[],
  willUpdateUI: function (context) {
    if (context) {
      this.updateLeftMenu(context);

      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus) {
          kony.adminConsole.utils.showProgressBar(this.view);
        } else {
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      } 
      else if (context.toastModel) {
        if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
        }
      } else if (context.editSingleCustInfo) {
        var custId = this.view.customersDropdownAccounts.lblSelectedValue.info.customerId;
        this.isEditUserAccessVisited[custId] = true;
        this.showEnrollCustomer();
      } else if (context.resetEnrollFormUI) {
        //hide all screens
        this.showEnrollCustomer();
        this.view.flxEnrollCustomerContainer.setVisibility(false);
      }
      else if(context.showEnrollFormCreate){
        this.enrollAction = "CREATE";
        this.view.flxEnrollListButtons.setVisibility(true);
        this.view.flxCustomersPagination.setVisibility(false);
        this.view.flxEnrollCustomerSeg.bottom="80dp";
        this.showEnrollCustomer();
        this.enrollCustomerRecordData = context.showEnrollFormCreate;
      } 
      else if(context.enrollCustomerContract) {
        this.legalentityid1 = context.customerInfo.customer.legalEntityId;
        this.setPrimaryCustInEnrollList(context);
      }
      else if(context.serviceDefinitions){
        this.serviceDefinitions = context.serviceDefinitions.ServiceDefinitionRecords;
      }
      else if (context.serviceDefinitionRoles) {
        this.clearRoleSelection(context.serviceDefinitionRoles, context.rowsIndexArr, context.newCustInEditFlow);
      }
      else if(context.relatedCustomers){
        this.showAddAnotherCustomerScreen();
        this.setRelatedCustomerListData(context.relatedCustomers.customers);
      }
      else if(context.contractSearch){
        if(context.contractOption === 1){ // for related customer screen contract
          this.showRelatedCustomerDetailsScreen();
          this.setRelatedCustomerDetails(context.contractSearch.contracts);
        } else{ // other customer search screen contract
          this.viewContractCases(context.contractSearch.contracts,context.custSearchResponse);
        }  
      }
      else if(context.customerSearchByName){
          this.customerSearchCallBackByUserId(context.customerSearchByName);
  
        }
        else if(context.customerSearchByNameerror){
          this.Errorcallforassignuserid(context.customerSearchByNameerror);
          }
      else if(context.otherCustomersSearch){
        this.showSearchedCustomerResults();
        this.setSearchCustomerResultData(context.otherCustomersSearch);
      }
      else if(context.tempContractAccountFeatures){
        this.constructGetContractDetailsPayload(context.tempContractAccountFeatures);
      }
      else if(context.contractOfCustomer){
        if(context.contractOption === 1){ // for related customer screen contract
          this.setSelectedRelatedCustContractCard(context);
        } else{ // other customer search screen contract
          this.viewContractCases(context);
        }  
      }
      else if(context.assignDefaultEnableFlag){
        this.formEditObjectAssignDefaultValues(context.assignDefaultEnableFlag);
      }
      else if(context.custStatusConfig){
        this.setCustomerStatusListData(context.custStatusConfig.Configuration);
      }
      else if (context.editUserNavigationEntry) {
        if (context.editUserNavigationEntry.navParam.isEnrollEditUser === false) {
          this.enrollAction = this.actionConfig.editSingleUser;
        } else {
          this.enrollAction = this.actionConfig.editUser;
        }
        var userAllDetails = {
          "userData": context.editUserNavigationEntry.userData,
          "defaultLimits": context.editUserNavigationEntry.defaultLimits
        };
        this.legalentityid1=context.editUserNavigationEntry.userData.companyList[0].legalEntityId;
        if (context.editUserNavigationEntry.navParam.tabName !== "CONTRACTS")
          this.parseCustomersAccountsFeatures(userAllDetails, context.editUserNavigationEntry.navParam);
        if (context.editUserNavigationEntry.isSuspendedUser === true) {
          this.callAddCustomer();
        } else {
          if (context.editUserNavigationEntry.navParam.tabName === "CONTRACTS"||this.enrollAction === this.actionConfig.editUser)
            this.setEnrolledCustListForEdit(context.editUserNavigationEntry.userData);
          this.navigateToScreenForSelectedCustTab(context.editUserNavigationEntry.navParam, userAllDetails.userData.userDetails);
        }
      }
      else if(context.serviceDefinitionsContract){
        this.viewContractServiceDef = context.serviceDefinitionsContract;
        this.setContractServiceCards(context.serviceDefinitionsContract);
        this.setLegalEntityCardContract();
        this.setDataToServiceTypeFilter(context.serviceDefinitionsContract);
        this.view.flxContractServiceCards.info={"totalRecords":context.serviceDefinitionsContract};
      }
      else if(context.contractsCustomerSearch){
        this.setCoreCustomersList(context.contractsCustomerSearch);
      }
      else if(context.relatedCustomersContract){
        this.setSelectedCustomerData(context.relatedCustomersContract,context.coreCustomerId);
      }
      else if(context.coreCustomerAccountsContracts){
        this.setContractAccountsData(context.coreCustomerAccountsContracts);
      }
      else if(context.serviceDefFeaturesLimitsContract){
        this.setServiceDefinitionFAData(context.serviceDefFeaturesLimitsContract);
      }
      else if(context.allFeaturesActions){
        this.getAllFeatures(context.allFeaturesActions);
      } else if (context.accountLvlFeatureActions) {
        this.setContractAccountLvlFeaturesData(context.accountLvlFeatureActions);
      }
      else if(context.createContractSuccess){
        this.addCustomersFromCreatedContract(context.createContractSuccess);
      }
      else if(context.editContractDetails){
        this.createEditContractPayload(context.editContractDetails);
      }
      else if(context.serviceDefinitionMonetaryActions){
        this.setGlobalMonetaryActions(context.serviceDefinitionMonetaryActions.limits);
      }else if(context.autoSyncAccountsFlag){
        this.autoSyncAccountsFlag=context.autoSyncAccountsFlag.value==="IMPLICIT"?"true":"false";
      }
    }  
  },
  enrollCustPreshow : function(){
	var self = this;
    this.view.flxToastMessage.setVisibility(false);
    this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top = "106dp";
    this.bulkUpdateAllFeaturesList = [{ "featureName": "feature1", "id": "1" }, { "featureName": "feature2", "id": "2" },
    { "featureName": "feature3", "id": "3" }, { "featureName": "feature4", "id": "4" }];
    //TODO: replace with Legal entity currency
    this.defaultCurrencyCodeSymbol = this.defaultCurrencyCode();
    this.currencyValue = this.defaultCurrencyCode();
    this.customerToEnrollInfo = this.presenter.getCurrentCustomerDetails();
    this.view.breadcrumbs.btnPreviousPage.text = this.customerToEnrollInfo.Name.toUpperCase();
    this.view.lblEnrollCustomerTitle.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon") + " " + this.customerToEnrollInfo.Name;
    //hide the flex only if app first executes preshow before willupdateUI
    if(this.isDataSetVisited === false){
      this.view.flxEnrollCusList.setVisibility(false);
      this.view.flxEditUserContainer.setVisibility(false);
    }
    this.setFlowActions();
    this.view.flxAssignUserId.setVisibility(false);
    this.view.commonButtons.btnNext.setVisibility(true);
  },

  customerSearchCallBackByUserId : function(data){
    if (data.Status) {
      this.Errorcallforassignuserid();
      this.view.forceLayout();
      //seg.setData(finalData);
      //  this.view.textBoxOtherCustomerEntryUserId.tbxEnterValue.dataTomap= data;
      //this.view.forceLayout();
  } else if(data.records) {
     this.view.flxSegmentAssignUserID.setVisibility(true);
     this.view.flxNoResultsFoundAssignUserID.setVisibility(false);
      var widgetDataMap = this.widgetMapRelatedCustListByUserId();
      var dataToMap = data.records[0];
      this.mappingRelatedCustListByUserId(dataToMap);
      this.customerUserId = dataToMap.CustomerId; //Payload for edit
      //this.view.flxSegmentAssignUserID.setVisibility(true);
      this.view.forceLayout();
  }
},

widgetMapRelatedCustListByUserId : function(){
  var widgetDataMap = {
    // "flxCheckBox" : "flxCheckBox",
    // "lblname" : "lblname",
    // "lblvalueUserId" : "lblvalueUserId",
    // "lblvalueprimaryentity": "lblvalueprimaryentity",
    // "lblActiveCircle":"lblActiveCircle",
    // "lblValueStatus":"lblValueStatus",
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
    "flxFeatureStatus" : "flxFeatureStatus",
  }
  return widgetDataMap;
},

mappingRelatedCustListByUserId : function(data){
  //this.view.addExistingcommonButtons.btnSave.text = "NEXT";
  this.view.flxErrorAssignUserId.setVisibility(false);
 var widgetDataMap = this.widgetMapRelatedCustListByUserId();
 var dataToMap=[data];
 var seg = this.view.segAssignUserID;
// var userName=this.view.txtSearchUserId.text;
seg.widgetDataMap = widgetDataMap;
//this.view.lblSeperatorByUserID.setVisibility(false);
var self = this;
var primaryLE;
var primaryLEName;
var legalEntityList = this.getLEListForFormAction("frmEnrollCustomer",'VIEW');
//var legalEntityId = this.view.txtSearchUserId.LEId;
 for (var i = 0; i < dataToMap.length; i++) {
    for(var j=0;j<dataToMap[i].legalEntities.length;j++){
        if(dataToMap[i].legalEntities[j].isHomeLegalEntity==="true"){
            primaryLE =dataToMap[i].legalEntities[j].legalEntityId;
         
        }
     }
  }
primaryLEName = this.getLEDesc(primaryLE);
var typesData = dataToMap.map(function(rec){     
return {
"flxCheckBox":{"isVisible":true,"onClick":self.onClickByUserID.bind(self,self.view.segAssignUserID,false)},
"lblCheckbox": { "isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox" },
"lblExistingUserName" :rec.FirstName + " " + rec.LastName,
"lblExistingUserId": rec.UserName,
"lblExistingUserPrimaryEntity":primaryLEName[0].companyName,
'statusValue' :(rec.Status_id == "SID_CUS_NEW")?"New":(rec.Status_id == "SID_CUS_SUSPENDED")?"Suspended":"Active",
"statusIcon": {
        'text':'',
        "skin": (rec.Status_id == "SID_CUS_NEW")?"sknFontIconActivate":(rec.Status_id == "SID_CUS_SUSPENDED")?"sknFontIconSuspend":"sknFontIconActivate",
  },
"flxExistingUserHeaderListInner":{"isVisible":true},
"flxExistingUserListHeader":{"isVisible":true},
"FirstName":rec.FirstName,
"LastName":rec.LastName,
"CustomerId":rec.CustomerId,
 "DateOfBirth":rec.DateOfBirth,
"template":"flxSegRelatedCustListUserId",
 }
});
seg.setData(typesData);
},

onClickByUserID: function(segmentPath, condition) {
  var self = this;
  var segData = segmentPath.data[0];
  if (segmentPath.data[0].lblCheckbox.text===self.AdminConsoleCommonUtils.checkboxnormallbl) 
  {segmentPath.data[0].lblCheckbox.text = self.AdminConsoleCommonUtils.checkboxSelectedlbl;
  segmentPath.data[0].lblCheckbox.skin = "sknIconBg0066CASz20pxCheckbox";
  // this.view.addExistingcommonButtons.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
  // this.view.addExistingcommonButtons.btnSave.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
  this.view.btnenroll.setEnabled(true);	
  // this.view.addExistingcommonButtons.btnSave.text="NEXT";
  segmentPath.setDataAt(segmentPath.data[0],0);
  }
  else if(segmentPath.data[0].lblCheckbox.text===self.AdminConsoleCommonUtils.checkboxSelectedlbl)
{
  segmentPath.data[0].lblCheckbox.text = self.AdminConsoleCommonUtils.checkboxnormallbl;
  segmentPath.data[0].lblCheckbox.skin = "sknBgB7B7B7Sz20pxCheckbox";
  this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.btnenroll,false,false);	
    //this.view.addExistingcommonButtons.btnSave.text="ADD";
  segmentPath.setDataAt(segmentPath.data[0],0);
}
  this.view.forceLayout();
},
Errorcallforassignuserid:function(error){
   this.view.flxSegmentAssignUserID.setVisibility(false);
   if(error !== undefined)
       {
         this.view.flxErrorAssignUserId.setVisibility(true);
         this.view.lblErrorMessage.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagement.AccessRestrictedForUserSearch");
        }
        else {
            this.view.flxNoResultsFoundAssignUserID.setVisibility(true);
        } 
   this.view.btnenroll.setEnabled(false);
   this.view.forceLayout();
},

  onHideEnrollForm : function(){
    this.isDataSetVisited = false;
    this.usersSelectedSignatoryList = {};
    this.segment_ROW_FRAMES = {};
  },
  setFlowActions : function(){
    var scopeObj = this;    
    this.view.flxContextualMenu.onHover = this.onHoverEventCallback;
    this.view.customListBoxAccounts.onHover = this.onHoverHideSelectionDropdown;
    this.view.flxAccountsFilter.onHover = this.onHoverEventCallback;
    this.view.flxOwnershipFilter.onHover = this.onHoverEventCallback;
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.onHover = this.onHoverEventCallback;
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxEnrollCustConfirmationPopup.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      scopeObj.view.flxEnrollCustConfirmationPopup.setVisibility(false);
    };

    this.view.commonButtons.btnNext.onClick = function() {
      var isValid = scopeObj.validateOnClickOfEnroll();
      //scopeObj.view.btnenroll.setEnabled(false);
      if(isValid){
        scopeObj.view.commonButtons.btnNext.setVisibility(false);
        scopeObj.view.commonButtons.btnSave.setVisibility(false);
        scopeObj.view.btnenroll.setVisibility(true);
        scopeObj.view.flxEnrollCusList.setVisibility(false);
        scopeObj.view.flxAssignUserId.setVisibility(true);
      }
  }
  this.view.flxBack.onClick = function() {
      scopeObj.view.commonButtons.btnNext.setVisibility(true);
      scopeObj.view.commonButtons.btnSave.setVisibility(true);
      scopeObj.view.btnenroll.setVisibility(false);
      scopeObj.view.flxAssignUserId.setVisibility(false);
      scopeObj.view.flxEnrollCusList.setVisibility(true);
      scopeObj.clearSearchFields();
      //scopeObj.view.flxAssignUserId.setVisibility(false); 
  }
  this.view.flxClose.onClick = function() {
      scopeObj.view.flxErrorAssignUserId.setVisibility(false);
  }
  this.view.btnenroll.onClick = function() {
    scopeObj.view.commonButtons.btnSave.setVisibility(true);
    scopeObj.view.btnenroll.setVisibility(false);
    scopeObj.createEnrollCustomerRequestParam1();
    scopeObj.clearSearchFields();
    //scopeObj.resetFlagValOnFormLeave();
    //scopeObj.presenter.getSearchInputs();
    //scopeObj.presenter.navigateBackToCustomerTabs(true);
  }
    /**** Enroll customer screen actions****/   
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.resetFlagValOnFormLeave();
      scopeObj.presenter.getSearchInputs();
      scopeObj.clearSearchFields();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.resetFlagValOnFormLeave();
      var custId = scopeObj.customerToEnrollInfo.Customer_id || scopeObj.customerToEnrollInfo.primaryCustomerId;
      scopeObj.presenter.getCustomerBasicInfo({ "Customer_id": custId,"legalEntityId":scopeObj.legalentityid1 || ""}, "InfoScreen", null);
    };
    this.view.breadcrumbs.btnPreviousPage1.onClick = function () {
      if (scopeObj.enrollAction === scopeObj.actionConfig.editUser) {
        var customerDetails = scopeObj.presenter.getCurrentCustomerDetails();
        var input = {"id": customerDetails.Customer_id,"legalEntityId":scopeObj.legalentityid1 || ""};
        var navigationParam = {
          "formName": "frmCustomerProfileContracts",
          "isEnrollEditUser": false,
          "tabName": "CONTRACTS"
        };
        scopeObj.presenter.getInfinityUserServiceDefsRoles(input, navigationParam, false);
        //scopeObj.enrollAction = scopeObj.action.edit;
      }else
      scopeObj.showEnrollCustomer();
    };
    this.view.breadcrumbs.btnPreviousPage2.onClick = function(){
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
    };
    this.view.btnLink1.onClick = function(){
      var isValid = scopeObj.validateServiceRoleSelection(scopeObj.enrollSegRowInd);
      if (isValid) {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create) {
          scopeObj.showEditUserScreen(false);
          scopeObj.editUserAccessOnClick();
          scopeObj.showEditAccountsScreen();
        } else
          scopeObj.fetchInfinityUserDetails("ACCOUNTS");
      }
    };
    this.view.btnLink2.onClick = function(){
      var isValid = scopeObj.validateServiceRoleSelection(scopeObj.enrollSegRowInd);
      if (isValid) {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create) {
          scopeObj.showEditUserScreen(false);
          scopeObj.editUserAccessOnClick();
          scopeObj.showEditFeaturesScreen(1);
        } else
          scopeObj.fetchInfinityUserDetails("FEATURES");

      }
    };
    this.view.btnLink3.onClick = function(){
      var isValid = scopeObj.validateServiceRoleSelection(scopeObj.enrollSegRowInd);
      if (isValid) {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create) {
          scopeObj.showEditUserScreen(false);
          scopeObj.editUserAccessOnClick();
          scopeObj.showEditLimitsScreen(1);
        } else
          scopeObj.fetchInfinityUserDetails("LIMITS");
      }
    };
    this.view.btnLink4.onClick = function(){
      var isValid = scopeObj.validateServiceRoleSelection(scopeObj.enrollSegRowInd);
      if (isValid) {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create) {
          scopeObj.showEditUserScreen(false);
          scopeObj.editUserAccessOnClick();
          scopeObj.showEditSignatoryGroups(scopeObj.enrollSegRowInd);
        } else
          scopeObj.fetchInfinityUserDetails("SIGNATORYGROUPS");
      }
    }; 
    this.view.flxOption1.onClick = function(){
      scopeObj.view.flxContextualMenu.setVisibility(false);
      scopeObj.changeOptionsSkin();
      scopeObj.onEditContractClick();
    };
    this.view.flxOption2.onClick = function(){
      scopeObj.view.flxContextualMenu.setVisibility(false);
      var segData = scopeObj.view.segEnrollCustList.data;
      var rowData = segData[scopeObj.enrollSegRowInd];
      if(rowData.flxPrimary.isVisible === true){ //if own customer
        scopeObj.showRemoveCustomerPopup();
      }else{ // if other customer
        scopeObj.removeCustomerFromEnroll();
      }
      
    };
    this.view.btnAddCustomerId.onClick = function () {
      var custId = scopeObj.customerToEnrollInfo.Customer_id || scopeObj.customerToEnrollInfo.primaryCustomerId;
      scopeObj.presenter.getRelatedCustomers({ "coreCustomerId": custId, "legalEntityId":scopeObj.legalentityid1 || ""}, "enroll");
      if(scopeObj.view.AdvancedSearchDropDown01.sgmentData.info===undefined||scopeObj.view.AdvancedSearchDropDown01.sgmentData.info===null||scopeObj.view.AdvancedSearchDropDown01.sgmentData.info.data===undefined)
        scopeObj.presenter.getCustomerStatusConfig();
    };
    this.view.commonButtons.btnSave.onClick = function(){
      var isValid = scopeObj.validateOnClickOfEnroll();
      if(isValid){
        scopeObj.createEnrollCustomerRequestParam();
      } 
    };

    this.view.btnSearch.onclick = function(){
      var params = {
        "userId": scopeObj.view.txtSearchUserId.text.trim() ||"",
    }
    // this.presenter.customerSearchByUserName(params, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer"));
    scopeObj.presenter.customerSearchByUserName(params,1);
    scopeObj.view.lblUserIDValue.text = scopeObj.view.txtSearchUserId.text.trim();
  };

    this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.resetFlagValOnFormLeave();
      //navigate to cust contact tabs
      if(scopeObj.enrollAction === scopeObj.actionConfig.create){
        scopeObj.presenter.navigateBackToCustomerTabs(true);
      }else{ //navigate to respective cust tab
        scopeObj.presenter.navigateBackToCustomerTabs(false);
      }  
      scopeObj.view.commonButtons.btnSave.setVisibility(true);
      scopeObj.view.btnenroll.setVisibility(false);
      scopeObj.clearSearchFields();
    };
    /**** Add another customer screen actions****/
    this.view.btnShowHideAdvanceSearch.onClick= function(){
      if(scopeObj.view.flxAddCustAdvanceSearchCont.isVisible)
        scopeObj.showHideAdvanceSearchParam(false);
      else
        scopeObj.showHideAdvanceSearchParam(true);
    };
    this.view.btnAddRelatedCustomers.onClick = function(){
      scopeObj.showRelatedCustomersListScreen();
    };
    this.view.btnAddOtherCustomers.onClick = function(){
      scopeObj.showSearchOtherCustomerScreen();
    };
    this.view.btnRelatedDetailsShowSearch.onClick = function(){
      scopeObj.showSearchOtherCustomerScreen();
    };
    this.view.commonButtonsAddAnotherCust.btnCancel.onClick = function(){
      scopeObj.showEnrollCustomer();
    };
    this.view.commonButtonsAddAnotherCust.btnSave.onClick = function() {
      scopeObj.onClickToAddSearchCustomers(); 
    };
    this.view.commonButtonsRelatedCust.btnCancel.onClick = function(){
      scopeObj.showEnrollCustomer();
    };
    this.view.commonButtonsRelatedCust.btnSave.onClick = function(){
      scopeObj.showRelatedCustomerDetailsScreen();
      scopeObj.fetchContractDetailsOfCustomer(scopeObj.view.segRelatedCustomers,1);
      //scopeObj.callSearchContracts();
    };
    this.view.commonButtonsRelatedDetails.btnCancel.onClick = function(){
      scopeObj.showEnrollCustomer();
    };
    this.view.commonButtonsRelatedDetails.btnSave.onclick = function () {
      if (scopeObj.enrollAction === scopeObj.actionConfig.create)
        scopeObj.addNewCustomerToEnroll(scopeObj.view.relatedCustContractCard.segRelatedContractsList);
      else
        scopeObj.addNewCustomerToEditFlow(scopeObj.view.relatedCustContractCard.segRelatedContractsList)
      scopeObj.showEnrollCustomer();
    };
    this.view.segSearchResultsCust.onRowClick = function(){
      scopeObj.fetchContractDetailsOfCustomer(scopeObj.view.segSearchResultsCust, 2);
    };
    this.view.commonButonsSearchCust.btnSave.onClick = function(){
      scopeObj.callOtherCustomersSearch();
    };
    this.view.commonButonsSearchCust.btnCancel.onClick = function(){
      scopeObj.clearOtherCustSearchFields();
    };
    this.view.flxBackOptionAddCust.onClick = function(){
      scopeObj.showSearchedCustomerResults();
    };
    this.view.segRelatedCustomers.onRowClick = function(){
      scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtonsRelatedCust.btnSave,true,true);
    };
    this.view.flxResultsCustIdHeader.onClick = function(){
      scopeObj.sortAndSetData("lblSearchSegHeaderCustId.text",scopeObj.view.segSearchResultsCust, 3);
    };
    this.view.flxResultsCustNameHeader.onClick = function(){
      scopeObj.sortAndSetData("lblSearchSegHeaderCustName.text",scopeObj.view.segSearchResultsCust, 3);
    };
    this.view.flxResultsCustEmailHeader.onClick = function(){
      scopeObj.sortAndSetData("lblSearchSegHeaderEmail.text",scopeObj.view.segSearchResultsCust, 3);
    };
    this.view.textBoxEntry11.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.textBoxEntry12.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.textBoxEntry13.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.textBoxEntry31.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.textBoxEntry32.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.flxMoreTagsDropdown.onHover = this.onHoverSettings;
    this.view.flxAccountsFilter1.onHover = this.onHoverSettings;
    this.view.flxAccountsFilter2.onHover = this.onHoverSettings;
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.onHover = scopeObj.onHoverComponentDropdown.bind(scopeObj,scopeObj.view.bulkUpdateFeaturesLimitsPopup);
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc.onHover = scopeObj.onHoverComponentDropdown.bind(scopeObj,scopeObj.view.bulkUpdateFeaturesLimitsPopup);
    this.view.textBoxEntry33.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.contactNumber21.txtISDCode.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.contactNumber21.txtContactNumber.onKeyUp = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.lstBoxSearchParam23.onSelection = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.customCalDob.event = function(){
      scopeObj.clearCustSearchValidation();
    };
    this.view.contractDetailsPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxContractDetailsPopup.setVisibility(false);
    };
    /**** Edit user screen actions****/
    this.view.commonButtonsEditAccounts.btnCancel.onClick = function(){
      if(scopeObj.enrollAction === scopeObj.actionConfig.editUser){
        scopeObj.resetFlagValOnFormLeave();
        scopeObj.presenter.navigateBackToCustomerTabs(false);
      } else {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create)
          scopeObj.revertEditUserChangesOnCancel();
        scopeObj.showEnrollCustomer();
      }
    };
    this.view.commonButtonsEditFeatures.btnCancel.onClick = function(){
      if(scopeObj.enrollAction === scopeObj.actionConfig.editUser){
        scopeObj.resetFlagValOnFormLeave();
        scopeObj.presenter.navigateBackToCustomerTabs(false);
      } else {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create)
          scopeObj.revertEditUserChangesOnCancel();
        scopeObj.showEnrollCustomer();
      }
    };
    this.view.commonButtonsEditOF.btnCancel.onClick = function(){
      if(scopeObj.enrollAction === scopeObj.actionConfig.editUser){
        scopeObj.resetFlagValOnFormLeave();
        scopeObj.presenter.navigateBackToCustomerTabs(false);
      } else {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create)
          scopeObj.revertEditUserChangesOnCancel();
        scopeObj.showEnrollCustomer();
      }
    };
    this.view.commonButtonsEditLimits.btnCancel.onClick = function(){
      if(scopeObj.enrollAction === scopeObj.actionConfig.editUser){
        scopeObj.resetFlagValOnFormLeave();
        scopeObj.presenter.navigateBackToCustomerTabs(false);
      } else {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create)
          scopeObj.revertEditUserChangesOnCancel();
        scopeObj.showEnrollCustomer();
      }
    };
    this.view.commonButtonsEditSignatories.btnCancel.onClick = function(){
      if(scopeObj.enrollAction === scopeObj.actionConfig.editUser){
        scopeObj.resetFlagValOnFormLeave();
        scopeObj.presenter.navigateBackToCustomerTabs(false);
      } else {
        if (scopeObj.enrollAction === scopeObj.actionConfig.create)
          scopeObj.revertEditUserChangesOnCancel();
        scopeObj.showEnrollCustomer();
      }
    }; 
    this.view.toggleButtonsFeatures.btnToggleLeft.onClick = function(){
      scopeObj.toggleFeaturesCustomerLevel();
    };
    this.view.toggleButtonsFeatures.btnToggleRight.onClick = function(){
      scopeObj.toggleFeaturesAccountLevel();
    };
    this.view.toggleButtonsLimits.btnToggleRight.onClick = function(){
     // var isValid = scopeObj.validateLimitGroupEditUser();
      //if(isValid){
        scopeObj.toggleLimitsAccountLevel();
     // }
    };
    this.view.toggleButtonsLimits.btnToggleLeft.onClick = function(){
     // var isValid = scopeObj.validateAccLimitEditUser();
     // if(isValid){
        scopeObj.toggleLimitsCustomerLevel();
     // }
    };
    this.view.enrollVerticalTabs.btnOption1.onClick = function(){
      scopeObj.showEditAccountsScreen();
    };
    this.view.enrollVerticalTabs.btnOption2.onClick = function(){
      scopeObj.showEditFeaturesScreen(1);
    };
    this.view.commonButtonsEditAccounts.btnNext.onClick = function(){
      scopeObj.showEditFeaturesScreen(1);
    };
    this.view.enrollVerticalTabs.btnOption3.onClick = function(){
      scopeObj.showEditOtherFeaturesScreen();
    };
    this.view.commonButtonsEditFeatures.btnNext.onClick = function(){
      scopeObj.showEditOtherFeaturesScreen();
    };
    this.view.enrollVerticalTabs.btnOption4.onClick = function(){
      scopeObj.showEditLimitsScreen(1);
    };
    this.view.commonButtonsEditLimits.btnNext.onClick = function () {
      scopeObj.showEditSignatoryGroups();
    };
    this.view.enrollVerticalTabs.btnOption5.onClick = function () {
      scopeObj.showEditSignatoryGroups();
    };
    this.view.commonButtonsEditOF.btnNext.onClick = function () {
      scopeObj.showEditLimitsScreen(1);
    };
    this.view.commonButtonsEditAccounts.btnSave.onClick = function () {
      function validateLimitsAcc(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if (isValid === true) {
          if (scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
            scopeObj.createEnrollCustomerRequestParam(true);
          } else {
            scopeObj.showEnrollCustomer();
            var custId = scopeObj.view.customersDropdownAccounts.lblSelectedValue.info.customerId;
            scopeObj.isEditUserAccessVisited[custId] = true;
          }
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerFeat = setTimeout(validateLimitsAcc,0);
    };
    this.view.commonButtonsEditFeatures.btnSave.onClick = function () {
      function validateLimitsInFeatures(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if (isValid === true) {
          if (scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
            scopeObj.createEnrollCustomerRequestParam(true);
          } else {
            scopeObj.showEnrollCustomer();
            var custId = scopeObj.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
            scopeObj.isEditUserAccessVisited[custId] = true;
          }
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerFeat = setTimeout(validateLimitsInFeatures,0);
    };
    this.view.commonButtonsEditOF.btnSave.onClick = function () {
      function validateLimitsInOF(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if (isValid === true) {
          if (scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
            scopeObj.createEnrollCustomerRequestParam(true);
          } else {
            var custId = scopeObj.view.customersDropdownOF.lblSelectedValue.info.customerId;
            scopeObj.isEditUserAccessVisited[custId] = true;
            scopeObj.showEnrollCustomer();
          }
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limitTimerOF = setTimeout(validateLimitsInOF,0);
    };
    this.view.commonButtonsEditLimits.btnSave.onClick = function () {
      function validateLimitSave(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if (isValid === true) {
          if (isValid && scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
            scopeObj.createEnrollCustomerRequestParam(true);
          } else if (isValid && scopeObj.enrollAction !== scopeObj.actionConfig.editUser) {
            var custId = scopeObj.view.customersDropdownLimits.lblSelectedValue.info.customerId;
            scopeObj.isEditUserAccessVisited[custId] = true;
            scopeObj.showEnrollCustomer();
          }
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limittimerFn = setTimeout(validateLimitSave,0);
      
     /* var isValid = scopeObj.validateAllLimitsEditUser();
      if (isValid === true) {
        if (isValid && scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
          scopeObj.createEnrollCustomerRequestParam(true);
        } else if (isValid && scopeObj.enrollAction !== scopeObj.actionConfig.editUser) {
          var custId = scopeObj.view.customersDropdownLimits.lblSelectedValue.info.customerId;
          scopeObj.isEditUserAccessVisited[custId] = true;
          scopeObj.showEnrollCustomer();
        }
      }*/
      //for account level limit screen
      /*if(scopeObj.view.flxEnrollEditAccLimitsList.isVisible === true){
        isValid = scopeObj.validateAccLimitEditUser();
        if(isValid && scopeObj.enrollAction !== scopeObj.actionConfig.editUser){
          scopeObj.showEnrollCustomer();
        } else if(isValid && scopeObj.enrollAction === scopeObj.actionConfig.editUser){
          scopeObj.createEnrollCustomerRequestParam();
        }
      }else{ //for limit group screen
        isValid = scopeObj.validateLimitGroupEditUser();
        if(isValid && scopeObj.enrollAction !== scopeObj.actionConfig.editUser){
          scopeObj.showEnrollCustomer();
        } else if(isValid && scopeObj.enrollAction === scopeObj.actionConfig.editUser){
          scopeObj.createEnrollCustomerRequestParam();
        }
      }*/
    };
    this.view.commonButtonsEditSignatories.btnSave.onClick = function () {
      function validateLimitSG(){
        var isValid = scopeObj.validateAllLimitsEditUser();
        if (isValid === true) {
          if (scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
            scopeObj.createEnrollCustomerRequestParam(true);
          } else {
            var custId = scopeObj.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
            scopeObj.isEditUserAccessVisited[custId] = true;
            scopeObj.showEnrollCustomer();
          }
        }
      }
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var limittimerFn = setTimeout(validateLimitSG,0);
    };
    this.view.customersDropdownSignatory.segList.onRowClick = function(){
      var selInd = scopeObj.view.customersDropdownSignatory.segList.selectedRowIndex[1];
      var selectedRowData = scopeObj.view.customersDropdownSignatory.segList.data[selInd];
      var custId = selectedRowData.id;
      scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownSignatory, custId);
      //var editUserDetails = scopeObj.presenter.getSignGroupsForEnrollCust(custId);
      scopeObj.setSignatoryGroupsData(custId);  
    };
    this.view.customersDropdownAccounts.segList.onRowClick = function(){
      var selInd = scopeObj.view.customersDropdownAccounts.segList.selectedRowIndex[1];
      var selectedRowData = scopeObj.view.customersDropdownAccounts.segList.data[selInd];
      var custId = selectedRowData.id;
      scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownAccounts, custId, 1);
      var editUserDetails = scopeObj.presenter.getAccountsFeaturesForEnrollCust(custId);
      var accounts = editUserDetails.accounts;
      scopeObj.setAccountsSegmentData(accounts,editUserDetails.customerDetails.autoSyncAccounts);  
    };
    this.view.customersDropdownFeatures.segList.onRowClick = function(){
      var selInd = scopeObj.view.customersDropdownFeatures.segList.selectedRowIndex[1];
      var selectedRowData = scopeObj.view.customersDropdownFeatures.segList.data[selInd];
      var custId = selectedRowData.id;
      if (scopeObj.view.toggleButtonsFeatures.info.selectedTab === 1) {
        scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownFeatures, custId, 2);
        scopeObj.createFeatureCardForCustomers();
      } else {
        scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownFeatures, custId, 2);
        scopeObj.createFeatureCardForAccounts();
      }
      
    };
    this.view.customersDropdownOF.segList.onRowClick = function(){
      var selInd = scopeObj.view.customersDropdownOF.segList.selectedRowIndex[1];
      var selectedRowData = scopeObj.view.customersDropdownOF.segList.data[selInd];
      var custId = selectedRowData.id;
      scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownOF, custId, 3);
      scopeObj.createOtherFeaturesCard();

    };
    this.view.customersDropdownLimits.segList.onRowClick = function(){
      var selInd = scopeObj.view.customersDropdownLimits.segList.selectedRowIndex[1];
      var selectedRowData = scopeObj.view.customersDropdownLimits.segList.data[selInd];
      var custId = selectedRowData.id;
      if (scopeObj.view.toggleButtonsLimits.info.selectedTab === 1) {
        scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownLimits, custId, 4);
        scopeObj.createLimitCardForCustomers();
      } else {
        scopeObj.setSelectedTextFromDropdownEditUser(scopeObj.view.customersDropdownLimits, custId, 4);
        scopeObj.createLimitsCardForAccounts();
      }
    };
    this.view.customersDropdownAccounts.tbxSearchBox.onKeyUp = function(){
      scopeObj.searchCustomersDropDownList("customersDropdownAccounts");
    };
    this.view.customersDropdownSignatory.tbxSearchBox.onKeyUp = function(){
      scopeObj.searchCustomersDropDownList("customersDropdownSignatory");
    };
    this.view.customersDropdownFeatures.tbxSearchBox.onKeyUp = function(){
      scopeObj.searchCustomersDropDownList("customersDropdownFeatures");
    };
    this.view.customersDropdownOF.tbxSearchBox.onKeyUp = function(){
      scopeObj.searchCustomersDropDownList("customersDropdownOF");
    };
    this.view.customersDropdownLimits.tbxSearchBox.onKeyUp = function(){
      scopeObj.searchCustomersDropDownList("customersDropdownLimits");
    };
    this.view.btnBulkUpdateFeatures.onClick = function(){
      scopeObj.showBulkUpdatePopupEditUser(1);
    };
    this.view.btnBulkUpdateLimits.onClick = function(){
      scopeObj.showBulkUpdatePopupEditUser(2);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave.onClick = function () {
      //if(scopeObj.view.flxCreateContract.isvisible === true){ //for contracts case
      if (scopeObj.view.flxCreateContract.isVisible === true) { //for contracts case  
        scopeObj.showContractBulkUpdatePopupScreen2();
      }else{ //for edit user case
        scopeObj.getSelectedAccountTypesCount();
        scopeObj.showBulkUpdatePopupScreen2();
      }   
    };
    this.view.flxSelectAllFeatures.onClick = function () {
      scopeObj.selectAllFeatures();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnCancel.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnSave.onClick = function(){
      if(scopeObj.view.flxCreateContract.isVisible === true){
        if(scopeObj.validateBulkSelectionContracts())
          scopeObj.updateFeatureLimitsBulkContract();
      } else{
        if(scopeObj.validateBulkSelectionEditUser())
          scopeObj.updateFeatureLimitsBulkChanges(scopeObj.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info.option);
      }      
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
       if(scopeObj.validateBulkSelectionContracts())
      scopeObj.updateFeaturesBulkChanges();
    };
    
    this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnCancel.onClick = function(){
      scopeObj.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
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
    this.view.searchEditFeatures.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchEditFeatures.tbxSearchBox.text === ""){
        scopeObj.view.searchEditFeatures.clearSearchBox();
      } else{
        scopeObj.view.searchEditFeatures.setSearchBoxFocus(true);
        scopeObj.view.searchEditFeatures.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditFeatures.forceLayout();
      }
      if (scopeObj.view.searchEditFeatures.tbxSearchBox.text.length > 3 || scopeObj.view.searchEditFeatures.tbxSearchBox.text === "") {
        if (scopeObj.view.flxEnrollEditFeaturesList.isVisible === true) {
          scopeObj.searchFeaturesCustomerLevel(1);
        } else {
          scopeObj.searchFeaturesLimitsAccountLevel(1);
        }
      }
    };
    this.view.searchEditFeatures.flxSearchCancel.onClick = function(){
      scopeObj.view.searchEditFeatures.clearSearchBox();
      scopeObj.searchResultsFeaturesLimits = [];
      if (scopeObj.view.flxEnrollEditFeaturesList.isVisible === true) {
        scopeObj.searchFeaturesCustomerLevel(1);
      }else{
        scopeObj.searchFeaturesLimitsAccountLevel(1);
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
      if (scopeObj.view.searchEditOtherFeatures.tbxSearchBox.text.length > 3 || scopeObj.view.searchEditOtherFeatures.tbxSearchBox.text === "") {
        scopeObj.searchFeaturesCustomerLevel(2);
      }

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
    this.view.searchEditLimits.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.searchEditLimits.tbxSearchBox.text === ""){
        scopeObj.view.searchEditLimits.clearSearchBox();
      } else{
        scopeObj.view.searchEditLimits.setSearchBoxFocus(true);
        scopeObj.view.searchEditLimits.flxSearchCancel.setVisibility(true);
        scopeObj.view.searchEditLimits.forceLayout();
      }
      if (scopeObj.view.searchEditLimits.tbxSearchBox.text.length > 3 || scopeObj.view.searchEditLimits.tbxSearchBox.text === "") {
        // if(scopeObj.view.flxEnrollEditLimitsList.isvisible === true){ 
        if (scopeObj.view.flxEnrollEditLimitsList.isVisible === true) {
        } else { //acc level tab
          scopeObj.searchFeaturesLimitsAccountLevel(2);
        }
      }
    };
    this.view.searchEditLimits.flxSearchCancel.onClick = function () {
      scopeObj.view.searchEditLimits.clearSearchBox();
      scopeObj.searchResultsFeaturesLimits = [];
      //if(scopeObj.view.flxEnrollEditLimitsList.isvisible === true){
      if (scopeObj.view.flxEnrollEditLimitsList.isVisible === true) {
      } else { //acc level tab
        scopeObj.searchFeaturesLimitsAccountLevel(2);
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
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.setSearchBoxFocus(true);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.setSearchBoxFocus(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.text === ""){
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.clearSearchBox();
      } else{
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.setSearchBoxFocus(true);
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.flxSearchCancel.setVisibility(true);
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.forceLayout();
      }
      scopeObj.searchAccountsBulkUpdateContract();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.flxSearchCancel.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.clearSearchBox();
      scopeObj.searchAccountsBulkUpdateContract();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.onClick = function () {
      var category = scopeObj.view.flxCreateContract.isVisible === true ? "contract" : "enroll";
      if (scopeObj.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info.option === 1) {
        scopeObj.addNewFeatureRowBulkUpdate(category);
      } else{
        scopeObj.addNewLimitRowBulkUpdate(category);
      }  
    };
    this.view.flxEnrollEditFeatureFilter.onClick = function(){
      scopeObj.showAccountTypesFilter(1);
      var selInd = scopeObj.view.customListBoxAccounts.segList.selectedRowIndices;
      var indicesToSet = (selInd && selInd.length > 0) ? JSON.stringify(selInd[0][1]) : JSON.stringify([]);
      scopeObj.view.customListBoxAccounts.segList.info.prevSelInd = indicesToSet;
    };
    this.view.flxEnrollEditLimitsFilter.onClick = function(){
      scopeObj.showAccountTypesFilter(2);
      var selInd = scopeObj.view.customListBoxAccounts.segList.selectedRowIndices;
      var indicesToSet = (selInd && selInd.length > 0) ? JSON.stringify(selInd[0][1]) : JSON.stringify([]);
      scopeObj.view.customListBoxAccounts.segList.info.prevSelInd = indicesToSet;
    };
    this.view.btnApplyFilter.onClick = function(){
      if(scopeObj.view.flxEnrollEditFeaturesContainer.isVisible === true){
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
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.setSearchBoxFocus(true);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.setSearchBoxFocus(false);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.text === ""){
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.clearSearchBox();
      } else{
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.setSearchBoxFocus(true);
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.flxSearchCancel.setVisibility(true);
        scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.forceLayout();
      }
      if (scopeObj.view.flxContractFA.isVisible) {
        scopeObj.searchFilterForAccountsBulk(scopeObj.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2);
      } else {
        scopeObj.searchForAccountsInBulkUpdate();
      }
    };
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.flxSearchCancel.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.clearSearchBox();
      if (scopeObj.view.flxContractFA.isVisible) {
        scopeObj.searchFilterForAccountsBulk(scopeObj.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2);
      } else {
        scopeObj.searchForAccountsInBulkUpdate();
      }
    };
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.searchFilterForAccountsBulk(scopeObj.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenuAcc.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.searchFilterForAccountsBulk(scopeObj.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2);
    };
    this.view.accountTypesFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.view.flxOwnershipFilter.setVisibility(false);
      scopeObj.searchFilterForAccounts();
    };
    this.view.ownershipFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.view.flxAccountsFilter.setVisibility(false);
      scopeObj.searchFilterForAccounts();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton1.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton2.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton3.onTouchStart = function(){
      scopeObj.resetAddedRows();
    };
    this.view.bulkUpdateFeaturesLimitsPopup.btnModifySearch.onClick = function(){
      if(scopeObj.view.flxCreateContract.isVisible === true)
        scopeObj.showContractBulkUpdatePopupScreen1(true);
      else
        scopeObj.showBulkUpdatePopupScreen1();
    };
      this.view.btnModifySearch.onClick = function(){
      scopeObj.showBulkUpdatePopupContracts();
    };
        this.view.btnAddNewRow.onClick = function(){
        scopeObj.addNewFeatureRowBulkUpdate(); 
    };
    this.view.bulkUpdateFeaturesLimitsPopup.flxArrow.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(!scopeObj.view.bulkUpdateFeaturesLimitsPopup.isVisible);
    };
   this.view.lblIconBulkFAArrow.onTouchStart = function() {
      if (scopeObj.view.flxTagsContainer.isVisible) {
        scopeObj.view.lblIconBulkFAArrow.text = "";
        scopeObj.view.flxTagsContainer.setVisibility(false);
        scopeObj.view.lblNothingSelected.setVisibility(false);
      } else {
        scopeObj.view.flxTagsContainer.setVisibility(true);
        if(scopeObj.view.flxTagsContainer.children.length == 0){
          scopeObj.view.lblNothingSelected.setVisibility(true);
        }
        else if(scopeObj.view.flxTagsContainer.info.added.length != 0) {
          scopeObj.view.lblNothingSelected.setVisibility(false);
        }
        scopeObj.view.lblIconBulkFAArrow.text = "";
      }
      scopeObj.view.forceLayout();
    };
    
    this.view.filterMenu1.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchFilterForAccountsBulk(scopeObj.view.segContractPortfolio, 1);
    };
    this.view.filterMenu2.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchFilterForAccountsBulk(scopeObj.view.segContractPortfolio, 1);
    };
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.onRowClick = function(){
      var toCheck= scopeObj.view.btnUpdateInBulkFA.info;
      if (scopeObj.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
        scopeObj.searchFilterForAccountsBulk(scopeObj.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2);
      }
      else {
        scopeObj.filterAccountRowsInBulkUpdate();
      }
    };
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.onRowClick = function () {
      var toCheck = scopeObj.view.btnUpdateInBulkFA.info;
      if (scopeObj.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
        scopeObj.searchFilterForAccountsBulk(scopeObj.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2);
      }
      else {
        scopeObj.filterAccountRowsInBulkUpdate();
      }
    };
    this.view.noResultsSearchCustomers.btnAddRecord.onClick = function () {
      scopeObj.onCreateContractClick();
    };
    this.view.noResultsRelatedCustDetails.btnAddRecord.onClick = function(){
      var selInd = scopeObj.view.segRelatedCustomers.selectedRowIndex[1];
      var segRowData = scopeObj.view.segRelatedCustomers.data[selInd];
      var custDetails = segRowData.custDetails;
      scopeObj.addSearchCustToContractCustList(custDetails);
      scopeObj.onCreateContractClick();
    };	
    this.view.btnAddContract.onClick = function(){
      var custDetailsArr = scopeObj.view.btnAddContract.info.customerDetail;
      var custInfo = custDetailsArr.customers && custDetailsArr.customers.length > 0 ? custDetailsArr.customers[0] : [];
      scopeObj.addSearchCustToContractCustList(custInfo);
      scopeObj.onCreateContractClick();
    };
    
    /** create contract actions **/
    this.view.flxAccountsFilterContracts.onHover = this.onHoverEventCallback;
    this.view.flxOwnershipFilterContracts.onHover = this.onHoverEventCallback;
    this.view.flxCustomerOptions.onHover = this.onHoverEventCallback;
    this.view.flxRangeTooltipContracts.onHover = this.onHoverEventCallback;
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
      scopeObj.view.toggleContractButtonsFeatures.info.selectedTab = 1;
      scopeObj.view.toggleContractButtonsFeatures.btnToggleLeft.skin = "sknBtnBgE5F0F9Br006CCAFn0069cdSemiBold12pxLeftRnd";
      scopeObj.view.toggleContractButtonsFeatures.btnToggleRight.skin = "sknBtnBgFFFFFFBrD7D9E0Fn485C75Reg12pxRightRnd";
    };
    this.view.verticalTabsContract.btnOption5.onClick = function(){
      if(scopeObj.isValidSelection())
        scopeObj.showContractLimitsScreen(false);
    };
    this.view.commonButtonsServiceDetails.btnSave.onClick = function(){
      scopeObj.showContractCustomersScreen(true);
    };
    this.view.commonButtonsServiceDetails.btnCancel.onClick = function(){
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
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
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
    };
    this.view.commonButtonsCustomers.btnSave.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.showCreateContractPopup();
      }else{
        scopeObj.createContract();
      } 
    };
    this.view.contractDetailsCommonButtons.btnNext.onClick = function(){
      if(scopeObj.validateContractDetails()){
        scopeObj.showContractAccountsScreen(true);
      }
    };
    this.view.contractDetailsCommonButtons.btnSave.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create && scopeObj.validateContractDetails()){
        scopeObj.showCreateContractPopup();
      }else if(scopeObj.validateContractDetails()){
        scopeObj.createContract();
      }    
    };
    this.view.contractDetailsCommonButtons.btnCancel.onClick = function(){
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
    };
    this.view.commonButtonsContractAccounts.btnNext.onClick = function(){
      scopeObj.showContractFAScreen(true);
    };
    this.view.commonButtonsContractAccounts.btnSave.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.showCreateContractPopup();
      }else{
        scopeObj.createContract();
      }  
    };
    this.view.commonButtonsContractAccounts.btnCancel.onClick = function(){
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
    };
    this.view.commonButtonsContractFA.btnNext.onClick = function(){
      scopeObj.showContractLimitsScreen(true);
    };
    this.view.commonButtonsContractFA.btnSave.onClick = function(){
      if(scopeObj.action === scopeObj.actionConfig.create){
        scopeObj.showCreateContractPopup();
      }else{
        scopeObj.createContract();
      }  
    };
    this.view.commonButtonsContractFA.btnCancel.onClick = function(){
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
    };
    this.view.commonButtonsContractLimits.btnSave.onClick = function(){
      if(scopeObj.validateAllLimitsContracts()){
        if(scopeObj.action === scopeObj.actionConfig.create){
          scopeObj.showCreateContractPopup();
        }else{
          scopeObj.createContract();
        }  
      }
    };
    this.view.commonButtonsContractLimits.btnCancel.onClick = function(){
      var category = scopeObj.action === scopeObj.actionConfig.create ? 1 : 2;
      scopeObj.hideCreateContractScreen(category);
    };
    this.view.btnShowHideAdvSearch.onClick = function(){
      if(scopeObj.view.flxRow2.isVisible){
        scopeObj.view.btnShowHideAdvSearch.text = kony.i18n.getLocalizedString("i18n.Group.AdvancedSearch");
        scopeObj.view.fonticonrightarrowSearch.text="";//right arrow
        scopeObj.view.flxColumn13.setVisibility(false);
        scopeObj.view.flxRow2.setVisibility(false);
        scopeObj.view.flxRow3.setVisibility(false);
      }else{
        scopeObj.view.btnShowHideAdvSearch.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.HideAdvancedSearch");
        scopeObj.view.fonticonrightarrowSearch.text="";//up arrow
        scopeObj.view.flxColumn13.setVisibility(true);
        scopeObj.view.flxRow2.setVisibility(true);
        scopeObj.view.flxRow3.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.btnSearchCustomers.onClick = function(){
      if(scopeObj.validateCoreCustSearch()){
        scopeObj.searchCoreCustomers();
        scopeObj.setNormalSkinToCoreSearch();
      }
    };
    this.view.btnClearAll.onClick = function(){
      scopeObj.resetCoreCustomerSearch();
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
    this.view.AdvancedSearchDropDown01.flxSearchCancel.onClick = function(){
      scopeObj.view.AdvancedSearchDropDown01.flxSearchCancel.setVisibility(false);
      scopeObj.view.AdvancedSearchDropDown01.tbxSearchBox.text="";
      var totalRecords=scopeObj.view.AdvancedSearchDropDown01.sgmentData.info.data;
      scopeObj.view.AdvancedSearchDropDown01.sgmentData.setData(totalRecords);
      scopeObj.view.forceLayout();
    };
    this.view.flxSelectedCustomersArrow.onClick = function () {
      if (scopeObj.view.flxSearchFilter.isVisible) {
        scopeObj.view.lblIconArrow.text = "";
        scopeObj.view.flxSearchFilter.setVisibility(false);
      }else{
        scopeObj.view.flxSearchFilter.setVisibility(true);
        scopeObj.view.lblIconArrow.text="";
      }
    };
    //customer search popup button actions
    this.view.commonButtonsContractSearchCust.btnNext.onClick = function(){
      //add tags and back to search page navigation
      scopeObj.view.commonButtonsContractSearchCust.btnNext.setVisibility(false);
      scopeObj.view.flxCustomerSearchHeader.setVisibility(true);
      scopeObj.view.flxCustomersBreadcrumb.setVisibility(false);
      scopeObj.view.flxCustomerAdvSearch.setVisibility(true);
      scopeObj.view.flxCustomerDetailsContainer.setVisibility(true);
      scopeObj.view.flxSelectedCustomerInfo.setVisibility(false);
      scopeObj.view.lblNoCustomersSearched.text= kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
      scopeObj.view.flxNoCustomersSearched.setVisibility(true);
      scopeObj.view.flxRelatedCustomerSegContracts.setVisibility(false);
      scopeObj.view.lblRelatedcustSubHeading.setVisibility(false);
      scopeObj.view.flxSearchBreadcrumb.info.added=[];
      scopeObj.view.flxSearchFilter.setVisibility(true);
      scopeObj.view.lblIconArrow.text="";
      var i=scopeObj.view.flxSearchBreadcrumb.widgets().concat([]);
      scopeObj.view.segBreadcrumbs.setData([]);
      for(var x=2;x<i.length-1;x++)
        scopeObj.view.flxSearchBreadcrumb.remove(i[x]);
      scopeObj.resetCoreCustomerSearch();
    };
      this.view.commonButtonsAddFeatures.btnSave.onClick = function(){  
      scopeObj.updateFeatureActionsAdded();
      scopeObj.editAccountLvlFeaturesBack(false);
      scopeObj.view.flxFABulkUpdateScreen.setVisibility(false);
      scopeObj.view.flxContractsFATopSection.setVisibility(true);
    };
      this.view.commonButtonsAddFeatures.btnCancel.onClick = function () {
        scopeObj.view.flxAddProdFeaturesBackBtn.onClick();
        //flxAddProductFeaturesBack
      };
    this.view.commonButtonsContractSearchCust.btnSave.onClick = function(){
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
    this.view.commonButtonsContractSearchCust.btnCancel.onClick = function(){
      scopeObj.revertAddedCustomers();
      scopeObj.view.flxCustomerSearchPopUp.setVisibility(false);
    };
    this.view.ContractLimitsList.btnReset.onClick = function(){
      scopeObj.showResetAllLimitsContractPopup();
    };
    this.view.accountTypesFilterContracts.segStatusFilterDropdown.onRowClick = function(){
      var filteredData=scopeObj.performAccountOwnerContractFilters();
      scopeObj.setAccountsDataCustomers(filteredData);
    };
    this.view.ownershipFilterContracts.segStatusFilterDropdown.onRowClick = function(){
      var filteredData=scopeObj.performAccountOwnerContractFilters();
      scopeObj.setAccountsDataCustomers(filteredData);
    };
    this.view.flxServiceFilter.onClick = function(){
      scopeObj.view.flxServiceTypeFilter.setVisibility(!scopeObj.view.flxServiceTypeFilter.isVisible);
    };
    this.view.serviceTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performServiceTypeFilter();
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
       //Adding timer for featres search as the features&actions count is large
    const searchContractFeaturesList = function () {
      scopeObj.setCustSelectedData("customersDropdownFA",true);
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
    const searchContractFeatures = debounce(searchContractFeaturesList,300);
    this.view.tbxContractFASearch.onKeyUp = function () {
        if (scopeObj.view.tbxContractFASearch.text.trim().length !== 0) {
          scopeObj.view.flxClearContractFASearch.setVisibility(true);
          if (scopeObj.view.toggleContractButtonsFeatures.info.selectedTab === 1) {
            searchContractFeatures();
          } else if (scopeObj.view.flxContractAccountFAList.isVisible === true) {
            scopeObj.searchFilterForAccountsBulk(scopeObj.view.segContractPortfolio, 1);
          }
          else {
            scopeObj.searchFAContractsByAccounts(scopeObj.searchFeatureOnEdit, scopeObj.accIdForByFeatures);
          }
        } else {
          if (scopeObj.view.toggleContractButtonsFeatures.info.selectedTab === 1) {
            scopeObj.view.flxClearContractFASearch.setVisibility(false);
            scopeObj.view.flxNoCustomerSelectedFA.setVisibility(false);
            searchContractFeatures();
          } else {
            scopeObj.view.flxClearContractFASearch.setVisibility(false);
            scopeObj.view.flxNoCustomerSelectedFA.setVisibility(false);
            if (scopeObj.view.accountTypeFilter === "selectFeature" && scopeObj.view.flxContractAccountFAList.isVisible === false) {
              scopeObj.searchFAContractsByAccounts(scopeObj.searchFeatureOnEdit, scopeObj.accIdForByFeatures);
            }
            else {
              scopeObj.toggleContractFeaturesAccountLevel(true);
            }
          }
        }
      };
     this.view.filterMenu1.segStatusFilterDropdown.onRowClick = function() {
            var data = scopeObj.filterBasedOnAccounts();
            if (data[1].length > 0) {
                scopeObj.view.lblNoFeatureFound.setVisibility(false);
                data[0].lblCountActions.text = data[1].length;
                scopeObj.view.segContractPortfolio.setSectionAt(data, scopeObj.selectedSectionIndexFilter);
            } else {
                var dataOne = {};
                // dataOne = scopeObj.filterOnNoResult(data);
                dataOne = scopeObj.setSegmentForNoResult(data)
                data[1].push(dataOne);
                scopeObj.view.flxAccountsFilter1.setVisibility(false);
                data[0].lblCountActions.text = data[1].length - 1;
                scopeObj.view.segContractPortfolio.setSectionAt(scopeObj.setWidgetDataNoResult[0], scopeObj.selectedSectionIndexFilter);
            }
            scopeObj.view.forceLayout();
        };
		    this.view.filterMenu2.segStatusFilterDropdown.onRowClick = function() {
            var data = scopeObj.filterBasedOnAccounts();
            if (data[1].length > 0) {
                scopeObj.view.lblNoFeatureFound.setVisibility(false);
                data[0].lblCountActions.text = data[1].length;
                scopeObj.view.segContractPortfolio.setSectionAt(data, scopeObj.selectedSectionIndexFilter);
            } else {
                var dataOne = {};
                dataOne = scopeObj.setSegmentForNoResult(data)
                data[1].push(dataOne);
                scopeObj.view.flxAccountsFilter2.setVisibility(false);
                data[0].lblCountActions.text = data[1].length - 1;
                scopeObj.view.segContractPortfolio.setSectionAt(scopeObj.setWidgetDataNoResult[0], scopeObj.selectedSectionIndexFilter);
            }
            scopeObj.view.forceLayout();
         };
    this.view.flxClearContractFASearch.onClick = function() {
           scopeObj.view.tbxContractFASearch.text = "";
            if(scopeObj.view.toggleContractButtonsFeatures.info.selectedTab == 2)
            if (scopeObj.view.accountTypeFilter === "selectFeature" && scopeObj.view.flxContractAccountFAList.isVisible === false) {
               scopeObj.searchFAContractsByAccounts(scopeObj.searchFeatureOnEdit, scopeObj.accIdForByFeatures);
             } else 
            {   scopeObj.view.flxNoCustomerSelectedFA.setVisibility(false);
                scopeObj.toggleContractFeaturesAccountLevel(true);
            }
            else{
            scopeObj.setCustSelectedData("customersDropdownFA", false);
            }
            scopeObj.view.flxClearContractFASearch.setVisibility(false);
        };
    this.view.tbxContractLimitsSearch.onKeyUp = function () {
      if (scopeObj.view.tbxContractLimitsSearch.text.trim().length !== 0) {
        scopeObj.view.flxClearContractLimitsSearch.setVisibility(true);
        scopeObj.setCustSelectedData("customersDropdownContractLimits",true);
      }else{
        scopeObj.view.flxClearContractLimitsSearch.setVisibility(false);
        scopeObj.setCustSelectedData("customersDropdownContractLimits",false);
      }      
    };
    this.view.flxClearContractLimitsSearch.onClick = function(){
      scopeObj.view.tbxContractLimitsSearch.text="";
      scopeObj.setCustSelectedData("customersDropdownContractLimits",false);
      scopeObj.view.flxClearContractLimitsSearch.setVisibility(false);
    };
    this.view.btnUpdateInBulkFA.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info="FA";
      // scopeObj.showBulkUpdatePopupContracts(1);
      scopeObj.showBulkUpdateFAScreen();
    };
    this.view.toggleContractButtonsFeatures.btnToggleLeft.onClick = function () {
      scopeObj.view.toggleContractButtonsFeatures.info.selectedTab = 1;
      scopeObj.toggleContractFeaturesCustomerLevel();
      scopeObj.view.tbxContractFASearch.text="";
      scopeObj.view.flxClearContractFASearch.setVisibility(false);
      scopeObj.view.flxContractAccountFAList.setVisibility(false);
      scopeObj.view.flxContractFAList.setVisibility(true);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleContractButtonsFeatures.btnToggleLeft, scopeObj.view.toggleContractButtonsFeatures.btnToggleRight], 1);
    };
    this.view.toggleContractButtonsFeatures.btnToggleRight.onClick = function () {
      scopeObj.view.toggleContractButtonsFeatures.info.selectedTab = 2;
      scopeObj.view.flxContractAccountFAList.setVisibility(true);
      scopeObj.view.flxContractFAList.setVisibility(false);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleContractButtonsFeatures.btnToggleLeft, scopeObj.view.toggleContractButtonsFeatures.btnToggleRight], 2);
      scopeObj.toggleContractFeaturesAccountLevel(true);
      scopeObj.view.btnUpdateInBulkFA.setVisibility(true);
      scopeObj.view.tbxContractFASearch.text="";
      scopeObj.view.flxClearContractFASearch.setVisibility(false);
    };
    this.view.flxAddProdFeaturesBackBtn.onClick = function () {
      if (scopeObj.view.toggleContractButtonsFeatures.info.selectedTab == 2) {
        scopeObj.editAccountLvlFeaturesBack(false);
      }
      else if (scopeObj.view.toggleContractButtonsFeatures.info.selectedTab != 2) {
        scopeObj.editCustomerLvlFeaturesBack();
      }
      scopeObj.view.flxFABulkUpdateScreen.setVisibility(false);
      scopeObj.view.flxContractsFATopSection.setVisibility(true);
    };
    this.view.btnUpdateInBulkLimits.onClick = function(){
      scopeObj.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info="Limits";
      scopeObj.showBulkUpdatePopupContracts(2);
    };
    this.view.tbxRecordsSearch.onKeyUp = function(){
      if(scopeObj.view.tbxRecordsSearch.text.trim().length!==0){
        scopeObj.view.flxClearRecordsSearch.setVisibility(true);
        scopeObj.searchServiceCards();
        if(scopeObj.action===scopeObj.actionConfig.create){
          scopeObj.AdminConsoleCommonUtils.setEnableDisableSkinForButton(scopeObj.view.commonButtonsServiceDetails.btnSave,true,false);
          scopeObj.enableAllTabs(false);
        }
      }else{
        scopeObj.view.flxNoServiceSearchResults.setVisibility(false);
        scopeObj.view.flxContractServiceCards.setVisibility(true);
        scopeObj.view.flxClearRecordsSearch.setVisibility(false);
        scopeObj.setContractServiceCards(scopeObj.view.flxContractServiceCards.info.totalRecords);
      }      
    };
    this.view.flxClearRecordsSearch.onClick = function(){
      scopeObj.view.flxNoServiceSearchResults.setVisibility(false);
      scopeObj.view.flxContractServiceCards.setVisibility(true);
      scopeObj.view.tbxRecordsSearch.text="";
      scopeObj.setContractServiceCards(scopeObj.view.flxContractServiceCards.info.totalRecords);
      scopeObj.view.flxClearRecordsSearch.setVisibility(false);
    };
    this.view.contractDetailsEntry1.tbxEnterValue.onKeyUp = function(){
      if(scopeObj.view.contractDetailsEntry1.flxInlineError.isVisible){
      scopeObj.view.contractDetailsEntry1.tbxEnterValue.skin="sknflxEnterValueNormal";
      scopeObj.view.contractDetailsEntry1.flxInlineError.setVisibility(false);
      }
    };
    this.view.typeHeadContractCountry.tbxSearchKey.onKeyUp = function(){
      scopeObj.clearValidation(scopeObj.view.typeHeadContractCountry.tbxSearchKey, scopeObj.view.flxNoContractCountry, 1);
      scopeObj.view.typeHeadContractCountry.tbxSearchKey.info.isValid = false;
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadContractCountry);
      scopeObj.view.flxContractCountry.zIndex = 2;
      scopeObj.searchForAddress(scopeObj.view.typeHeadContractCountry.tbxSearchKey, scopeObj.view.typeHeadContractCountry.segSearchResult, scopeObj.view.typeHeadContractCountry.flxNoResultFound, 1);
      if(scopeObj.view.flxNoContractCountry.isVisible){
        scopeObj.view.flxNoContractCountry.isVisible = false;
        scopeObj.view.typeHeadContractCountry.tbxSearchKey.skin = "skntbxLato35475f14px";
      }
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadContractCountry.tbxSearchKey.onEndEditing = function(){
      if (scopeObj.view.typeHeadContractCountry.flxNoResultFound.isVisible) {
        scopeObj.view.typeHeadContractCountry.flxNoResultFound.setVisibility(false);
      }
    };
    this.view.typeHeadContractCountry.segSearchResult.onRowClick = function(){
      scopeObj.assignText(scopeObj.view.typeHeadContractCountry.segSearchResult, scopeObj.view.typeHeadContractCountry.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadContractCountry.tbxSearchKey, scopeObj.view.flxNoContractCountry, 1);
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
    this.view.enrollEditAccountsCard.flxCheckboxOptions.onClick = function(){
      var isChecked="true";
      if(scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions.text===scopeObj.AdminConsoleCommonUtils.checkboxnormallbl){
        scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions.text=scopeObj.AdminConsoleCommonUtils.checkboxSelectedlbl;

        scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions.skin=scopeObj.applyCheckboxSkin(scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions);

      }else{
        scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions.text=scopeObj.AdminConsoleCommonUtils.checkboxnormallbl;

        scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions.skin=scopeObj.applyCheckboxSkin(scopeObj.view.enrollEditAccountsCard.lblCheckboxOptions);

        isChecked="false";

      }
      var segData = scopeObj.view.segEnrollCustList.data;
      var enrollUserData = [];
      if (scopeObj.enrollAction === scopeObj.actionConfig.editUser || scopeObj.enrollAction === scopeObj.actionConfig.editSingleUser) {
        for (var i = 0; i < segData.length; i++) {
          if (segData[i].custId === scopeObj.view.customersDropdownAccounts.lblSelectedValue.info.customerId)
            enrollUserData = segData[i];
        }
      }else
        enrollUserData = scopeObj.view.segEnrollCustList.data[scopeObj.enrollSegRowInd];
      enrollUserData.custDetails.autoSyncAccounts=isChecked;
      scopeObj.view.segEnrollCustList.setDataAt(enrollUserData,scopeObj.enrollSegRowInd);
      scopeObj.view.forceLayout();
    };
    
    this.view.limitsPagination.flxPrevious.onClick = function(){
      var currentValue = scopeObj.view.limitsPagination.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationLimits(prevVal);
      }      
    };
    this.view.limitsPagination.flxnext.onClick = function(){
      var currentValue = parseInt(scopeObj.view.limitsPagination.lblNumber.text)+1;
      if(currentValue <= scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationLimits(currentValue);
      }
    };
    this.view.limitsPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.limitsPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationLimits(currentValue);
      }
    };
    this.view.featuresPagination.flxPrevious.onClick = function(){
      var currentValue = scopeObj.view.featuresPagination.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationFeatures(prevVal);
      }      
    };
    this.view.featuresPagination.flxnext.onClick = function(){
      var currentValue = parseInt(scopeObj.view.featuresPagination.lblNumber.text)+1;
      if(currentValue <= scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationFeatures(currentValue);
      }
    };
    this.view.featuresPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.featuresPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationFeatures(currentValue);
      }
    };
    this.view.cardPagination.flxPrevious.onClick = function(){
      var currentValue = scopeObj.view.cardPagination.lblNumber.text;
      let prevVal = parseInt(currentValue)-1 ;
      if(prevVal> 0){
        scopeObj.onSegmentPaginationChange(prevVal);
      }      
    };
    this.view.cardPagination.flxnext.onClick = function(){
      var currentValue = parseInt(scopeObj.view.cardPagination.lblNumber.text)+1;
      if(currentValue <= scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChange(currentValue);
      }
    };
    this.view.cardPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.cardPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChange(currentValue);
      }
    };
  },
  /*
  * show the breadcrumb based on the screen
  * @param: screen -(enroll:1,edit user acces:2,add customer:3)
  */
  showBreadcrumbsForScreens : function(screen){
    var isEdit = this.enrollAction === this.actionConfig.create ? false : true;
    this.view.breadcrumbs.btnPreviousPage2.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight4.setVisibility(false);
    if(screen === 1){ //enroll listing
      this.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
      this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
      this.view.breadcrumbs.lblCurrentScreen.text = isEdit === false ? kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.Enroll_UC"):
                                                             kony.i18n.getLocalizedString("i18n.frmOutageMessageController.EDIT");
    }else if(screen === 2){ //edit user access
      this.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage1.text = isEdit === false ? kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.Enroll_UC"):
                                                             kony.i18n.getLocalizedString("i18n.frmOutageMessageController.EDIT");
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.EditUser_UC");
    }else if(screen === 3){ //add other customers
      this.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage1.text = isEdit === false ? kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.Enroll_UC"):
                                                             kony.i18n.getLocalizedString("i18n.frmOutageMessageController.EDIT");
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddCustomer_UC");
    }else if(screen === 4){ //create contract
      this.view.breadcrumbs.btnPreviousPage2.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight4.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage2.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddCustomer_UC");
      this.view.breadcrumbs.lblCurrentScreen.text = this.action === this.actionConfig.create ? kony.i18n.getLocalizedString("i18n.Contracts.createContract") :
                                                        kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.EditContract_UC");
    }
  },
  /*
  * shows enroll customer listing screen
  */
  showEnrollCustomer : function(){
    this.view.flxEnrollCustomerContainer.setVisibility(true);
    this.view.flxAddAnotherCustContainer.setVisibility(false);
    this.view.flxEditUserContainer.setVisibility(false);
    this.view.flxEnrollEditAccLimitsCont.setVisibility(false);
    this.view.flxEnrollEditAccFeaturesCont.setVisibility(false);
    this.view.flxCreateContract.setVisibility(false);
    this.showBreadcrumbsForScreens(1);
    this.view.commonButtons.btnSave.text = (this.enrollAction === this.actionConfig.create) ? kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.Enroll_UC") :
                                             kony.i18n.getLocalizedString("i18n.frmOutageMessageController.UPDATE");
    this.view.commonButtons.btnSave.width = (this.enrollAction === this.actionConfig.create) ? "100dp" : "110dp";
    if(this.editUserCustomersList.companyList){
      this.pageCount.TOTAL_PAGES=Math.ceil(this.editUserCustomersList.companyList.length/20);
    }
    this.view.forceLayout();
  },
  /*
  * shows create contract screen
  */
  showCreateContractScreen : function(){
    this.view.flxCreateContract.setVisibility(true);
    this.view.flxEnrollCustomerContainer.setVisibility(false);
    this.view.flxAddAnotherCustContainer.setVisibility(false);
    this.view.flxEditUserContainer.setVisibility(false);
    this.showBreadcrumbsForScreens(4);
    this.view.forceLayout();
  },
   /*
  * hide create contract screen and show add customr screen
  * @param: category - on hide show add cust or enroll cust screens
  */
  hideCreateContractScreen : function(category){
    this.view.flxCreateContract.setVisibility(false);
    this.view.flxEnrollCustomerContainer.setVisibility(false);
    this.view.flxEditUserContainer.setVisibility(false);
    this.view.flxAddAnotherCustContainer.setVisibility(false);
    if(category === 1){ //show add customer screen on hide
      this.view.flxAddAnotherCustContainer.setVisibility(true);
      this.showBreadcrumbsForScreens(3);
    }else{ //show enroll customer screen on hide
      this.view.flxEnrollCustomerContainer.setVisibility(true);
      this.showBreadcrumbsForScreens(1);
    }
    this.view.forceLayout();
  },
  /*
  * shows edit user on click of contextual menu
  * @param: enable dropdown - true/false
  */
  showEditUserScreen : function(isListEnabled){
    this.showBreadcrumbsForScreens(2);
    // this.view.flxEditUserContainer.setVisibility(true);
    this.view.flxEnrollCustomerContainer.setVisibility(false);
    this.view.flxAddAnotherCustContainer.setVisibility(false);
    this.view.flxCreateContract.setVisibility(false);
    //enable/disable the dropdown option
    this.enableDisableDropdownUIEditUser(this.view.customersDropdownAccounts, false);//isListEnabled);
    this.enableDisableDropdownUIEditUser(this.view.customersDropdownFeatures, false);//isListEnabled);
    this.enableDisableDropdownUIEditUser(this.view.customersDropdownOF, false);//isListEnabled);
    this.enableDisableDropdownUIEditUser(this.view.customersDropdownLimits, false);//isListEnabled);
    this.enableDisableDropdownUIEditUser(this.view.customersDropdownSignatory, false);//isListEnabled);
    //enable all buttons
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditLimits.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditLimits.btnNext,false,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditSignatories.btnSave,true,true);
    this.enableOrDisableVerticalTabEditUser(true);
    this.view.flxEditUserContainer.setVisibility(true);
    this.view.forceLayout();
    
  },
  /*
  * enable/disable the customers dropdown
  * @param: dropdown component path, enable/disable
  */
  enableDisableDropdownUIEditUser : function(dropdownPath, isListEnabled){
    if(isListEnabled === false){
      dropdownPath.flxSelectedText.onClick = function(){};
      dropdownPath.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      dropdownPath.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    } else{
      dropdownPath.flxSelectedText.onClick = dropdownPath.showHideCustomersDropdown;
      dropdownPath.flxSelectedText.skin = "sknflxffffffBorderE1E5EERadius3pxPointer";
      dropdownPath.flxSelectedText.hoverSkin = "sknFlxBorder117eb0radius3pxbgfff";
    }
  },
  /*
  * shows add another customer search screen
  */
  showAddAnotherCustomerScreen : function(){
    this.showBreadcrumbsForScreens(3);
    this.view.flxAddAnotherCustContainer.setVisibility(true);
    this.view.flxCreateContract.setVisibility(false);
    this.view.flxEditUserContainer.setVisibility(false);
    this.view.flxEnrollCustomerContainer.setVisibility(false);
    this.showRelatedCustomersListScreen()
    this.view.forceLayout();
    
  },
  /*
  * set data to enroll list
  * @param: primary customer info
  */
  setPrimaryCustInEnrollList : function(context){
    var self =this;
    var widgetMap = {
      "custId": "custId",
      "flxEnrollCustomerList" : "flxEnrollCustomerList",
      "lblCustomerName":"lblCustomerName",
      "lblCustomerId":"lblCustomerId",
      "flxPrimary":"flxPrimary",
      "lblPrimary":"lblPrimary",
      "lstBoxService":"lstBoxService",
      "lblLegalEntity":"lblLegalEntity",
      "flxServiceError":"flxServiceError",
      "lblIconServiceError":"lblIconServiceError",
      "lblServiceErrorMsg":"lblServiceErrorMsg",
      "lstBoxRole":"lstBoxRole",
      "flxRoleError":"flxRoleError",
      "lblIconRoleError":"lblIconRoleError",
      "lblRoleErrorMsg":"lblRoleErrorMsg",
      "lblSeperator":"lblSeperator",
      "flxOptions":"flxOptions" ,
      "lblOptions":"lblOptions",
      "lblRemoved":"lblRemoved",
      "custDetails":"custDetails"
    };
    var data = [],contractId ="", contractName ="",contractExists = false;
    var customerContractDetails = context.enrollCustomerContract;
    var customerInfo = context.customerInfo.customer;
    //set contract details if customer is already part of a contract
    if(customerContractDetails.length > 0){
      contractId = customerContractDetails[0].id;
      contractName = customerContractDetails[0].name;
      contractExists = true;
    }
    data.push(customerInfo);
    var currCustContact = this.presenter.getCurrentCustomerContactInfo();
    var addrInfo = currCustContact.Addresses && currCustContact.Addresses.length > 0 ?currCustContact.Addresses[0]:"";
    //creating custDetails obj to set data in edit user access screen cards
    data[0]["custDetails"] = {
      "addressLine1": addrInfo ? addrInfo.AddressLine1 : "",
      "addressLine2":addrInfo ? addrInfo.AddressLine2 : "",
      "coreCustomerId": customerInfo.Customer_id || customerInfo.primaryCustomerId ,
      "coreCustomerName": customerInfo.Name,
      "email": customerInfo.PrimaryEmailAddress,
      "phone": customerInfo.PrimaryPhoneNumber,
      "taxId":"",
      "contractId": contractId ? contractId : "", 
      "contractName": contractName ? contractName : customerInfo.Name,
      "serviceId": "",
      "cityName": addrInfo ? addrInfo.CityName : "",
      "country": addrInfo ? addrInfo.CountryName : "",
      "id": "",
      "isBusiness": customerInfo.CustomerType_id === this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE ? "false" :"true",
      "isPrimary": "true",
      "state": addrInfo ? addrInfo.RegionName : "",
      "zipCode": addrInfo ? addrInfo.ZipCode : "",
      "autoSyncAccounts":this.autoSyncAccountsFlag
    };
    this.segment_ROW_FRAMES = [];
    var segData = data.map(this.mapCustomerDataforEnrollSeg);
    segData[0].flxPrimary.isVisible = true;
    //disable the service selection if already associated with contract
    if(contractExists){
      segData[0].lstBoxService.selectedKey= customerContractDetails[0].servicedefinitionId;
      segData[0].lstBoxService.enable = false;
      segData[0].lstBoxService.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
      this.fetchRolesforSelectedService(segData[0].lstBoxService.selectedKey,[0],null,true);
    }
    this.isEditUserAccessVisited = {};
    var custId = customerInfo.Customer_id || customerInfo.primaryCustomerId;
    this.isEditUserAccessVisited[custId] = false;
    this.view.segEnrollCustList.widgetDataMap = widgetMap;
    this.view.segEnrollCustList.setData(segData);
	this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave,true,true);
    this.view.flxEnrollCusList.setVisibility(true);
    this.isDataSetVisited = true;
    this.view.forceLayout();
  },
  /*
  * map data for enroll segment
  * @param: cust data to map
  */
  mapCustomerDataforEnrollSeg : function(rec){
    var self = this;
    var listBoxServiceData = this.getServiceListBoxMappedData();
    var listBoxRoleData = [["select",kony.i18n.getLocalizedString("i18n.frmCompanies.Select_a_role")]];
    this.prevRole[rec.Customer_id || rec.primaryCustomerId]={"key":"SELECT"};
    //self.presenter.custSearchLEId?
    var LEName = self.getLEDesc(self.legalentityid1)[0].companyName;
    return {
      "custId": rec.Customer_id || rec.primaryCustomerId,
      "lblCustomerName": {
        "text": rec.Name || rec.coreCustomerName,
        "skin": "sknLbl192b45LatoReg16px"
      },
      "lblCustomerId": {
        "text": this.AdminConsoleCommonUtils.getTruncatedString((rec.Customer_id || rec.primaryCustomerId), 12, 10),
        "skin": "sknLbl192b45LatoReg16px",
        "toolTip": rec.Customer_id || rec.primaryCustomerId
      },
      "flxPrimary": { "isVisible": false },
      "lblPrimary": kony.i18n.getLocalizedString("i18n.ProfileManagement.Primary"),
      "lstBoxService": {
        "onSelection": self.onServiceRoleSelection.bind(self, 1),
        "skin": "sknLbxborderd7d9e03pxradius",
        "masterData": listBoxServiceData,
        "selectedKey": "select",
        "enable": true
      },
      "flxServiceError": { "isVisible": false },
      "lblIconServiceError": "\ue94c",
      "lblServiceErrorMsg": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PleaseSelectService"),
      "lstBoxRole": {
        "onSelection": self.onServiceRoleSelection.bind(self, 2),
        "skin": "sknLbxborderd7d9e03pxradius",
        "masterData": listBoxRoleData,
        "selectedKey": "select",
        "enable": true
      },
      "flxRoleError": { "isVisible": false },
      "lblIconRoleError": "\ue94c",
      "lblRoleErrorMsg": kony.i18n.getLocalizedString("i18n.frmCompanies.Please_select_a_role"),
      "lblSeperator": "-",
      "flxOptions": {
        "isVisible": true,
        "skin": "sknFlxBorffffff1pxRound",
        "hoverSkin": "sknflxffffffop100Border424242Radius100px",
        "onClick": self.toggleContextualMenu
      },
      "lblOptions": "\ue91f",
      "lblRemoved": { "isVisible": false },
      "template": "flxEnrollCustomerList",
      "lblLegalEntity":{"text": LEName || ""},
      "custDetails": rec.custDetails,
      "flxEnrollCustomerList": {
        "doLayout": function (eventObj) {
          //self.segment_ROW_FRAMES.push(eventObj.frame);
          let custIdVal = rec.Customer_id || rec.primaryCustomerId;
          self.segment_ROW_FRAMES[custIdVal] = eventObj.frame;
        }
      }
    };
  },
  /*
  * set list of cust/companies of infinty user in edit user flow
  * @param: get infinity user response
  */
  setEnrolledCustListForEdit: function (infinityUserData) {
    var segData = [];
    this.editUserCustomersList=infinityUserData;
    var custToShow = infinityUserData.companyList;
    this.resetPaginationValuesCustomers(custToShow.length);
    var end = 20;
    this.pageCount = {
      "PAGE_OFFSET": 0,
      "TOTAL_PAGES":Math.ceil(custToShow.length/20)
    };
    
    if(custToShow.length <= 20){
      end=custToShow.length;
      this.view.flxCustomersPagination.setVisibility(false);
    }else{
      this.view.flxCustomersPagination.setVisibility(true);
    }
    this.setEnrollCustomersList(0,end,custToShow);
    this.pageCount.PAGE_OFFSET=end;
    this.view.flxEnrollCusList.setVisibility(true);
    this.isDataSetVisited = true;
    this.view.flxEnrollListButtons.setVisibility(false);
    this.view.flxEnrollCustomerSeg.bottom="0dp";
    //this.segment_ROW_FRAMES = [];
    this.removedEnrollCustomers = {};
    this.view.forceLayout();
  },
  /*
  adding pagination functionality for the list of customer associated to this particular user
  */

  setEnrollCustomersList: function (start, end, custToShow) {
    var segData = [],rolesList=[];
    end = end > custToShow.length ? custToShow.length : end;
    for (var i = start; i < end; i++) {
      this.isEditUserAccessVisited[custToShow[i].coreCustomerId] = false;
      var custData = {
        "Customer_id": custToShow[i].coreCustomerId||custToShow[i].cif,
        "Name": custToShow[i].companyName || custToShow[i].contractName,
        "custDetails": custToShow[i]
      };
      var segMapData = this.mapCustomerDataforEnrollSeg(custData);
      var isPrimary = custToShow[i].coreCustomerId === this.editUserCustomersList.userDetails.coreCustomerId||custToShow[i].cif===this.editUserCustomersList.userDetails.coreCustomerId ? true : false;
      segMapData.flxPrimary.isVisible = isPrimary;
      segMapData.lblCustomerId.text = this.AdminConsoleCommonUtils.getTruncatedString((custToShow[i].coreCustomerId||custToShow[i].cif), isPrimary ? 12 : 20, isPrimary ? 10 : 20);
      segMapData.lstBoxService.masterData = [["select", kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectService")],
      [custToShow[i].serviceDefinitionId||custToShow[i].serviceDefinition, custToShow[i].serviceDefinitionName]];
      segMapData.lstBoxService.selectedKey = custToShow[i].serviceDefinitionId||custToShow[i].serviceDefinition;
      segMapData.lstBoxService.enable = false;
      segMapData.lstBoxService.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
      if (custToShow[i].validRoles) {
        rolesList = custToShow[i].validRoles.reduce(
          function (list, record) {
            return list.concat([[record.roleId, record.userRole]]);

          }, [["select", kony.i18n.getLocalizedString("i18n.frmCompanies.Select_a_role")]]);
      } else
        rolesList = custToShow[i].mappedRolesList;
      segMapData.lstBoxRole.masterData = rolesList;
      segMapData.lstBoxRole.selectedKey = custToShow[i].roleId?custToShow[i].roleId:"select";
      if (custToShow[i].isNewlyAdded === true&&custToShow[i].roleId===undefined) {
        segMapData.lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
        segMapData.flxRoleError.isVisible = true;
      }else if(custToShow[i].isCustomerRemoved===true){
        segMapData.lblCustomerName.skin = "sknLbl192b45LatoReg16pxOp50";
        segMapData.lblCustomerId.skin = "sknLbl192b45LatoReg16pxOp50";
        segMapData.lstBoxService.enable = false;
        segMapData.lstBoxRole.enable = false;
        segMapData.lblRemoved.isVisible = true;
        segMapData.flxOptions.isVisible = false;
      }
      this.prevRole[custToShow[i].coreCustomerId || custToShow[i].cif] = {
        "key": custToShow[i].roleId,
        "value": custToShow[i].userRole
      };
      segData.push(segMapData);
    }
    this.isDataSetVisited = true;
    this.view.segEnrollCustList.setData(segData);
    this.view.flxEnrollCustomerSeg.setContentOffset({ x: 0, y: 0 });
    kony.adminConsole.utils.hideProgressBar(this.view);
      this.view.forceLayout();
  },
  /*
  * add new customer row to associate and enroll
  * @param: segment widget path
  */
  addNewCustomerToEnroll: function (segmentPath) {
    var data = [], enrollSegData, newSegRowToAdd = [], rowsIndexArr = [], primaryCustServiceId = "";
    var addedCustList = this.view.segEnrollCustList.data;
    var newCust = segmentPath.data[0][1];
    for(var j=0; j<newCust.length ;j++){
      if(newCust[j].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl){
        newCust[j].custDetails.autoSyncAccounts=this.autoSyncAccountsFlag;
        data ={"Name":newCust[j].lblContractName.text,"Customer_id":newCust[j].lblContractId.text,
               "serviceId":newCust[j].serviceId,"custDetails": newCust[j].custDetails};
        this.isEditUserAccessVisited[newCust[j].lblContractId.text] = false;
        var existingCustObj = this.checkIfCustomerAlreadyAdded(newCust[j].lblContractId.text);
        if(existingCustObj.isExists === true){
          // in case of adding the primary cust again after removal
          if(newCust[j].lblContractId.text === existingCustObj.existingCust.custId  &&
             existingCustObj.existingCust.flxPrimary.isVisible === true && existingCustObj.existingCust.lblRemoved.isVisible === true){
            this.view.segEnrollCustList.removeAt(0);
            enrollSegData = this.mapCustomerDataforEnrollSeg(data);
            enrollSegData.lstBoxService.enable = false;
            enrollSegData.lstBoxService.selectedKey = data.serviceId;
            enrollSegData.lstBoxService.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
            enrollSegData.flxPrimary.isVisible = true;
            enrollSegData.lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
            enrollSegData.flxRoleError.isVisible = true;
            rowsIndexArr.push(0);
            primaryCustServiceId = data.serviceId;
            this.view.segEnrollCustList.addDataAt(enrollSegData,0);
          } 
        }  // add the selected customer to enroll list
        else if(existingCustObj.isExists === false){
          enrollSegData = this.mapCustomerDataforEnrollSeg(data);
          enrollSegData.lstBoxService.enable = false;
          enrollSegData.lstBoxService.selectedKey = data.serviceId;
          enrollSegData.lstBoxService.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
          enrollSegData.isNewlyAdded = true;
          enrollSegData.lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
          enrollSegData.flxRoleError.isVisible = true;
          var customerDetails = this.presenter.getCurrentCustomerDetails();
          var currUserId = customerDetails.primaryCustomerId;
          enrollSegData.flxPrimary.isVisible = data.custDetails.coreCustomerId === currUserId ? true : false;
          newSegRowToAdd.push(enrollSegData);
        }
      }  
    }  
    //append the newly added customers to enroll segment
    for(var k=0; k<newSegRowToAdd.length; k++){
      rowsIndexArr.push(this.view.segEnrollCustList.data.length);
      this.view.segEnrollCustList.addDataAt(newSegRowToAdd[k],this.view.segEnrollCustList.data.length);
    }
    //fetch roles list to set
    if (newSegRowToAdd.length > 0)
      this.fetchRolesforSelectedService(newSegRowToAdd[0].lstBoxService.selectedKey, rowsIndexArr,null, true);
    else if (primaryCustServiceId !== "" && rowsIndexArr.length > 0)
      this.fetchRolesforSelectedService(primaryCustServiceId, rowsIndexArr, null, true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave, true, true);
  },
  addNewCustomerToEditFlow: function (segmentPath) {
    var enrollSegData, newSegRowToAdd = [], rowsIndexArr = [], primaryCustServiceId = "", newCustData = [];
    var newCust = segmentPath.data[0][1];
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var currUserId = customerDetails.primaryCustomerId;
    for (var j = 0; j < newCust.length; j++) {
      if (newCust[j].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl) {
        newCust[j].custDetails.autoSyncAccounts = this.autoSyncAccountsFlag;
        this.isEditUserAccessVisited[newCust[j].lblContractId.text] = false;
        var existingCustObj = this.checkIfCustomerAlreadyAdded(newCust[j].lblContractId.text);
        if (existingCustObj.isExists === true) {
          // in case of adding the primary cust again after removal
          if (newCust[j].lblContractId.text === existingCustObj.existingCust.custId &&
            existingCustObj.existingCust.flxPrimary.isVisible === true && existingCustObj.existingCust.lblRemoved.isVisible === true) {
            this.updateCustomersListGlobalVar(currUserId,"",false,true);
          }else{
            newCustData.push({//to add primary custid to customers list if it was not added before
              contractId: newCust[j].custDetails.contractId,
              contractName: newCust[j].custDetails.contractName,
              coreCustomerId: newCust[j].custDetails.coreCustomerId,
              coreCustomerName: newCust[j].custDetails.coreCustomerName,
              customerId: currUserId,
              isBusiness: "0",
              isPrimary: "true",
              serviceDefinitionId: newCust[j].serviceId,
              serviceDefinitionName: newCust[j].custDetails.serviceDefinitionName,
              isNewlyAdded: true
            });
          }
        }  // add the selected customer to enroll list
        else if (existingCustObj.isExists === false) {
          newCustData.push({
            contractId: newCust[j].custDetails.contractId,
            contractName: newCust[j].custDetails.contractName,
            coreCustomerId: newCust[j].custDetails.coreCustomerId,
            coreCustomerName: newCust[j].custDetails.coreCustomerName,
            customerId: currUserId,
            isBusiness: "0",
            isPrimary: newCust[j].custDetails.coreCustomerId === currUserId ? "true" : "false",
            serviceDefinitionId: newCust[j].serviceId,
            serviceDefinitionName: newCust[j].custDetails.serviceDefinitionName,
            isNewlyAdded: true
          });
        }
      }
    }
    //fetch roles list to set
    if (newCustData.length > 0)
      this.fetchRolesforSelectedService(newCustData[0].serviceDefinitionId, [], newCustData, true);
  },
  /*
  * get list of services for listbox
  * @return : listbox masterdata formatted services list
  */
  getServiceListBoxMappedData : function(){
    var serviceList = [];
    serviceList = this.serviceDefinitions.reduce(
      function (list, record) {
        return list.concat([[record.id, record.name]]);
      }, [["select", kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectService")]]);
    return serviceList;
  },
  /*
  * get list of role for listbox
  * @param: list of roles
  * @return : listbox masterdata formatted roles list
  */
  getRoleListBoxMappedData : function(rolesList){
    var self =this;
    var mappedRolesList = [];
    mappedRolesList = rolesList.reduce(
      function (list, record) {
        if(record.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE)
          return list.concat([[record.id, record.name]]);
        else
          return list;
      }, [["select", kony.i18n.getLocalizedString("i18n.frmCompanies.Select_a_role")]]);
    return mappedRolesList;
  },
  /*
  * on selecting service/role listbox option
  * @param: opt- (service listbox:1, role listbox:2)
  */
  onServiceRoleSelection : function(opt,eventObj,context){
    var selRowInd = context.rowIndex;
    var selRowData = this.view.segEnrollCustList.data[selRowInd];
    this.enrollSegRowInd = context.rowIndex;
    this.clearServiceRoleValidationError(opt, context); 
    if(opt === 1){ //service listbox selected
      selRowData.custDetails.serviceId = selRowData.lstBoxService.selectedKey;
      this.view.segEnrollCustList.setDataAt(selRowData,selRowInd);
      kony.adminConsole.utils.showProgressBar(this.view);
      this.view.forceLayout();
      this.fetchRolesforSelectedService(selRowData.lstBoxService.selectedKey, [selRowInd],null, false);
      this.fetchCreateContractDetails();
      this.removeTempContractCustFromEnrollSeg(selRowInd);
    } else { //role listbox selected
      kony.adminConsole.utils.showProgressBar(this.view);
      this.view.forceLayout();
      this.fetchEditUserAccessDetails();
    }
  },
  /*
  * fetch the list of roles for given service id
  * @param: service id, row index array
  */
  fetchRolesforSelectedService: function (serviceId, rowIndArr, newCustInEditFlow, hideLoadingScreen) {
    var reqParam = { "serviceDefinitionId": serviceId };
    this.presenter.getServiceDefinitionRoles(reqParam, rowIndArr, newCustInEditFlow, hideLoadingScreen);
  },
  /*
  * changes the roles list and clear the selection based on service selection
  * @param: list of roles for selected service, array of row index to set the roles
  */
  clearRoleSelection: function (serviceRoles, rowIndArr, newCustInEditFlow) {
    var mappedRolesList = this.getRoleListBoxMappedData(serviceRoles.roles);
    for(var i=0; i<rowIndArr.length; i++){
      var selRowData = this.view.segEnrollCustList.data[rowIndArr[i]];
      selRowData.lstBoxRole.masterData = mappedRolesList;
      selRowData.lstBoxRole.selectedKey = "select";
      selRowData.lstBoxRole.selectedkey = "select";
      this.view.segEnrollCustList.setDataAt(selRowData, rowIndArr[i]);
    }
    if (newCustInEditFlow && newCustInEditFlow.length > 0) {
      for (var x = 0; x < newCustInEditFlow.length; x++) {
        newCustInEditFlow[x].mappedRolesList = mappedRolesList;
        this.updateCustomersListGlobalVar("","",false,false,newCustInEditFlow);
        this.view.cardPagination.lblShowing.info = this.editUserCustomersList.companyList.length;
      }
      this.onSegmentPaginationChange(this.pageCount.TOTAL_PAGES);
    }
  },
  /*
  * show or hide contextual menu for enroll customer list
  */
  toggleContextualMenu:function(eventObj,context){
    var rowIndex = context.rowIndex;
    this.enrollSegRowInd = context.rowIndex;
    if (this.view.flxContextualMenu.isVisible === true){
      this.view.flxContextualMenu.setVisibility(false);
    }
    else{
      this.updateContextualMenuOptions(rowIndex); 
    }
    this.view.forceLayout();
    var heightVal = 0;
    var segData = this.view.segEnrollCustList.data;
    for (var i = 0; i < rowIndex; i++) {
      //heightVal = heightVal + this.segment_ROW_FRAMES[i].height;
      var currCustId = segData[i].custId;
      heightVal = heightVal + this.segment_ROW_FRAMES[currCustId].height;
    }
    var scrollWidget = this.view.flxEnrollCustomerSeg;
    var contextualWidget = this.view.flxContextualMenu;
    heightVal = heightVal + 50+ 106 - scrollWidget.contentOffsetMeasured.y;
    if ((heightVal + contextualWidget.frame.height) > (scrollWidget.frame.height+80)){
      this.view.flxContextualMenu.top=((heightVal-this.view.flxContextualMenu.frame.height)-25)+"px";
      this.view.flxUpArrowImage.setVisibility(false);
      this.view.flxDownArrowImage.setVisibility(true);
      // this.view.flxContextualMenuOptions.top = "0px";    }
      this.view.flxContextualMenuOptions.top = "0px";
    }
    else {
      this.view.flxContextualMenu.top = (heightVal) + "px";
      this.view.flxUpArrowImage.setVisibility(true);
      this.view.flxDownArrowImage.setVisibility(false);
      this.view.flxContextualMenuOptions.top = "-1px";
    }
    this.changeOptionsSkin();
  },
  /*
  * show /hide the contextual menu options based on action
  * @param: rowIndex
  */
  updateContextualMenuOptions : function(rowIndex){
    var segRowData = this.view.segEnrollCustList.data[rowIndex];
    var removeVis = true;
    if(this.enrollAction === this.actionConfig.create){
      var contractOption = (segRowData.custDetails.contractId === "" && segRowData.flxPrimary.isVisible === true) ?
          true : false;
      this.view.flxOption1.setVisibility(contractOption);
    } else{
      this.view.flxOption1.setVisibility(false);
      //hide remove option in case of one record
      if(this.view.segEnrollCustList.data.length === 2){
        removeVis = (this.view.segEnrollCustList.data[0].lblRemoved.isVisible === true || this.view.segEnrollCustList.data[1].lblRemoved.isVisible === true) ?
                     false : true;
      } else{
        removeVis = this.editUserCustomersList.companyList.length === 1 ? false : true;
      }
      this.view.flxOption2.setVisibility(removeVis);
      this.view.flxOptionsSeperator.setVisibility(removeVis);
    }
    this.view.flxContextualMenu.setVisibility(true);
  },
   /*
  * show poup for removing primary customer from contextual menu
  */
  showRemoveCustomerPopup: function(){
    var self = this;
    var segData = this.view.segEnrollCustList.data;
    var rowData = segData[this.enrollSegRowInd];
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.RemoveAccessToCustomer");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AreYouSureYouWantToRemove") + " "+
      rowData.lblCustomerName.text+ " " + kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.accessToHisPrimaryCustomerId")+" ("+ rowData.custId +")";
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Remove").toUpperCase();
    this.view.flxEnrollCustConfirmationPopup.setVisibility(true);

    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.removeCustomerFromEnroll();
      self.view.flxEnrollCustConfirmationPopup.setVisibility(false);
    };
  },
  /*
  * remove added customer from contextual menu
  */
  removeCustomerFromEnroll : function(){
    var segData = this.view.segEnrollCustList.data;
    var rowData = segData[this.enrollSegRowInd];
    //if(rowData.custDetails.contractId !== ""){
    var isNewAssociated = rowData.isNewlyAdded && rowData.isNewlyAdded === true ? true : false;
    if (rowData.custDetails.contractId !== "" && isNewAssociated === false) {
      var custId = rowData.custDetails.coreCustomerId || rowData.custDetails.cif;
      this.removedEnrollCustomers[custId] = { "contractId": rowData.custDetails.contractId, "cif": custId };
    }
    if (rowData.flxPrimary.isVisible === true) { //for primary customer
      rowData.lblCustomerName.skin = "sknLbl192b45LatoReg16pxOp50";
      rowData.lblCustomerId.skin = "sknLbl192b45LatoReg16pxOp50";
      rowData.lstBoxService.enable = false;
      rowData.lstBoxRole.enable = false;
      rowData.lblRemoved.isVisible = true;
      rowData.flxOptions.isVisible = false;
      if (this.enrollAction !== this.actionConfig.create){
        this.createEnrollCustomerRequestParam(true);
        this.updateCustomersListGlobalVar(rowData.custId,"",true,true);
      }
      this.view.segEnrollCustList.setDataAt(rowData, this.enrollSegRowInd);
    } else { //for non-primary customers
      this.presenter.deleteAccountsFeaturesForEnrollCust(rowData.custId);
      if (this.enrollAction !== this.actionConfig.create){
        this.createEnrollCustomerRequestParam(true);
        this.updateCustomersListGlobalVar(rowData.custId,"",true,false);
      }
      this.view.segEnrollCustList.removeAt(this.enrollSegRowInd);
    }
    this.onSegmentPaginationChange(this.pageCount.TOTAL_PAGES);
    //disable enroll button if no customer available in list
    if (segData.length === 1) {
      var btnEnable = segData[0].lblRemoved.isVisible === true ? false : true;
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave, true, btnEnable);
    } else if (segData.length === 0) {
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave, true, false);
    }
  },
  /*
  * hide contextual menu on hover callback
  */
  onHoverEventCallback: function (widget, context) {
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
      this.changeOptionsSkin();
    }
  },
  /*
  * change the current selected row option menu skin
  */
  changeOptionsSkin : function(){
    var skin = this.view.flxContextualMenu.isVisible ? "sknflxffffffop100Border424242Radius100px" : "sknFlxBorffffff1pxRound";
    var segData = this.view.segEnrollCustList.data;
    if(this.prevIndex !=-1 && this.prevIndex < segData.length){
      var tempSegDataPrev = segData[this.prevIndex];
      tempSegDataPrev.flxOptions.skin = "slFbox";
      this.view.segEnrollCustList.setDataAt(tempSegDataPrev, this.prevIndex, 0);
    }
    var selcRow = this.view.segEnrollCustList.selectedRowIndex;
    if(selcRow){
      var selectIndex = this.view.segEnrollCustList.selectedRowIndex[1];
      var tempCurrent = segData[selectIndex];
      tempCurrent.flxOptions.skin =skin;
      this.view.segEnrollCustList.setDataAt(tempCurrent, selectIndex, 0);
      this.prevIndex = selectIndex;
    }
  },
   /*
  * validate service/role field selections
  * @param: rowIndex
  * @return: isValid - true/false
  */
  validateServiceRoleSelection : function(rowIndex){
    var isValidSel = true;
    var selRowData = this.view.segEnrollCustList.data[rowIndex];
    if(selRowData.lstBoxService.selectedKey === "select" && selRowData.lblRemoved.isVisible === false){
      isValidSel = false;
      selRowData.lstBoxService.skin = "sknLstBoxeb3017Bor3px";
      selRowData.flxServiceError.isVisible = true;
    }
    if(selRowData.lstBoxRole.selectedKey === "select" && selRowData.lblRemoved.isVisible === false){
      isValidSel = false;
      selRowData.lstBoxRole.skin = "sknLstBoxeb3017Bor3px";
      selRowData.flxRoleError.isVisible = true;  
    }
    this.view.segEnrollCustList.setDataAt(selRowData,rowIndex);
    return isValidSel;
  },
  /*
  *clear inline errors on service/role selection
  * @param: opt -1/2, context - row selection context
  */
  clearServiceRoleValidationError : function(opt,context){
    var selRowInd = context.rowIndex;
    var selRowData = this.view.segEnrollCustList.data[selRowInd];
    if(opt === 1 && selRowData.lstBoxService.selectedKey !== "select"){
      selRowData.lstBoxService.skin = "sknLbxborderd7d9e03pxradius";
      selRowData.flxServiceError.isVisible = false;
    }
    if(opt === 2 && selRowData.lstBoxRole.selectedKey !== "select"){
      selRowData.lstBoxRole.skin = "sknLbxborderd7d9e03pxradius";
      selRowData.flxRoleError.isVisible = false;
    }
    this.view.segEnrollCustList.setDataAt(selRowData,selRowInd);
  },
  /*
  * shows the account tab in edit user
  */
  showEditAccountsScreen : function(){
    this.view.flxEnrollEditAccountsContainer.setVisibility(true);
    this.view.flxEnrollEditFeaturesContainer.setVisibility(false);
    this.view.flxEnrollEditOtherFeaturesCont.setVisibility(false);
    this.view.flxEnrollEditLimitsContainer.setVisibility(false);
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    var widgetBtnArr = [this.view.enrollVerticalTabs.btnOption1,this.view.enrollVerticalTabs.btnOption2,this.view.enrollVerticalTabs.btnOption3,this.view.enrollVerticalTabs.btnOption4,this.view.enrollVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.enrollVerticalTabs.flxImgArrow1,this.view.enrollVerticalTabs.flxImgArrow2,this.view.enrollVerticalTabs.flxImgArrow3, this.view.enrollVerticalTabs.flxImgArrow4,this.view.enrollVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.enrollVerticalTabs.btnOption1);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.enrollVerticalTabs.flxImgArrow1);
    this.view.searchEditAccounts.tbxSearchBox.text = "";
    this.view.searchEditAccounts.flxSearchCancel.setVisibility(false);
    this.view.enrollEditAccountsCard.flxArrow.setVisibility(false);
    this.view.flxEnrollEditAccountsList.setContentOffset({x:0,y:0});
    this.view.enrollEditAccountsCard.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + ":";
  },
  /*
  * shows the features tab in edit user
  * @param: tab selection(customer level:1,acc level:2)
  */
  showEditFeaturesScreen : function(tabOption){
    this.view.flxEnrollEditAccountsContainer.setVisibility(false);
    this.view.flxEnrollEditFeaturesContainer.setVisibility(true);
    this.view.flxEnrollEditOtherFeaturesCont.setVisibility(false);
    this.view.flxEnrollEditLimitsContainer.setVisibility(false);
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    var widgetBtnArr = [this.view.enrollVerticalTabs.btnOption1,this.view.enrollVerticalTabs.btnOption2,this.view.enrollVerticalTabs.btnOption3, this.view.enrollVerticalTabs.btnOption4,this.view.enrollVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.enrollVerticalTabs.flxImgArrow1,this.view.enrollVerticalTabs.flxImgArrow2,this.view.enrollVerticalTabs.flxImgArrow3, this.view.enrollVerticalTabs.flxImgArrow4,this.view.enrollVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.enrollVerticalTabs.btnOption2);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.enrollVerticalTabs.flxImgArrow2);
    this.view.toggleButtonsFeatures.info = {"selectedTab":1};
    this.view.searchEditFeatures.tbxSearchBox.text = "";
    this.view.searchEditFeatures.flxSearchCancel.setVisibility(false);
    this.view.flxAccountTypesFilter.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,true);
    this.enableOrDisableVerticalTabEditUser(true);
    if(tabOption === 1){
      this.toggleFeaturesCustomerLevel();
    }else if(tabOption === 2){
      this.toggleFeaturesAccountLevel();
    }
    this.view.forceLayout();
  },
  /*
  * shows other features and actions tab in edit user
  */
  showEditOtherFeaturesScreen : function(){
    this.view.flxEnrollEditAccountsContainer.setVisibility(false);
    this.view.flxEnrollEditFeaturesContainer.setVisibility(false);
    this.view.flxEnrollEditOtherFeaturesCont.setVisibility(true);
    this.view.flxEnrollEditLimitsContainer.setVisibility(false);
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    var widgetBtnArr = [this.view.enrollVerticalTabs.btnOption1,this.view.enrollVerticalTabs.btnOption2,this.view.enrollVerticalTabs.btnOption3, this.view.enrollVerticalTabs.btnOption4,this.view.enrollVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.enrollVerticalTabs.flxImgArrow1,this.view.enrollVerticalTabs.flxImgArrow2,this.view.enrollVerticalTabs.flxImgArrow3, this.view.enrollVerticalTabs.flxImgArrow4,this.view.enrollVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.enrollVerticalTabs.btnOption3);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.enrollVerticalTabs.flxImgArrow3);
    this.view.searchEditOtherFeatures.tbxSearchBox.text = "";
    this.view.searchEditOtherFeatures.flxSearchCancel.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditOF.btnNext,false,true);
    this.enableOrDisableVerticalTabEditUser(true);
    this.createOtherFeaturesCard();
  },
  /*
  * shows the limit tab in edit user
  * @param: tabOption(customer level:1,acc level:2)
  */
  showEditLimitsScreen : function(tabOption){
    this.view.flxEnrollEditAccountsContainer.setVisibility(false);
    this.view.flxEnrollEditFeaturesContainer.setVisibility(false);
    this.view.flxEnrollEditOtherFeaturesCont.setVisibility(false);
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(false);
    this.view.flxEnrollEditLimitsContainer.setVisibility(true);
    this.searchResultsFeaturesLimits = [];
    var widgetBtnArr = [this.view.enrollVerticalTabs.btnOption1, this.view.enrollVerticalTabs.btnOption2, this.view.enrollVerticalTabs.btnOption3, this.view.enrollVerticalTabs.btnOption4, this.view.enrollVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.enrollVerticalTabs.flxImgArrow1, this.view.enrollVerticalTabs.flxImgArrow2, this.view.enrollVerticalTabs.flxImgArrow3, this.view.enrollVerticalTabs.flxImgArrow4, this.view.enrollVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr, this.view.enrollVerticalTabs.btnOption4);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr, this.view.enrollVerticalTabs.flxImgArrow4);
    this.view.toggleButtonsLimits.info = { "selectedTab": 1 };
    this.view.searchEditLimits.tbxSearchBox.text = "";
    this.view.searchEditLimits.flxSearchCancel.setVisibility(false);
    this.view.flxAccountTypesFilter.setVisibility(false);
    if(tabOption === 1){
      this.toggleLimitsCustomerLevel();
    } else if(tabOption === 2){
      this.toggleLimitsAccountLevel();
    }
    this.view.forceLayout();
  },
   /*
  * show related customers list
  */
  showRelatedCustomersListScreen : function(){
    this.view.flxEnrollRelatedCustomersBox.setVisibility(true);
    this.view.flxAddCustomerBox.setVisibility(false);
    this.view.flxSelectedRelatedCustDetailsBox.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsRelatedCust.btnSave,true,false);
    this.view.lblRelatedcustSubHeading.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomersRelatedTo")+ " " +
      this.customerToEnrollInfo.Name + " ("+ (this.customerToEnrollInfo.Customer_id || this.customerToEnrollInfo.primaryCustomerId) +")";
  },
  /*
  * show selected related customer details and contract
  */
  showRelatedCustomerDetailsScreen : function(){
    this.view.flxSelectedRelatedCustDetailsBox.setVisibility(true);
    this.view.flxEnrollRelatedCustomersBox.setVisibility(false);
    this.view.flxAddCustomerBox.setVisibility(false);
    this.view.flxRelatedCustContractCont.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsRelatedDetails.btnSave,true,false);
    this.setRelatedCustomerDetails();
    this.view.forceLayout();
  },
  /*
  * show search other customers screen
  */
  showSearchOtherCustomerScreen : function(){
    this.view.flxAddCustomerBox.setVisibility(true);
    this.view.flxSelectedRelatedCustDetailsBox.setVisibility(false);
    this.view.flxEnrollRelatedCustomersBox.setVisibility(false);
    this.view.flxNoResultsContainer.setVisibility(true);
    this.view.flxNoContractAvailableFlag.setVisibility(false);
    this.view.noResultsSearchCustomers.btnAddRecord.setVisibility(false);
    this.view.flxSearchCustomerContractList.setVisibility(false);
    this.view.flxSearchResultsForAddCust.setVisibility(false);
    this.view.flxAddCustAdvanceSearchCont.setVisibility(false);
    this.showHideAdvanceSearchParam(false);
    this.clearCustSearchValidation();
    this.clearOtherCustSearchFields();
    this.view.commonButtonsAddAnotherCust.btnSave.info = {"addCustCase" :1};
    this.view.noResultsSearchCustomers.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchCustomerToSeeContactExists");
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsAddAnotherCust.btnSave,true,false);
  },
  /*
  * show customer results list for the search
  */
  showSearchedCustomerResults : function(){
    this.view.flxSearchResultsForAddCust.setVisibility(true);
    this.view.flxSearchCustomerContractList.setVisibility(false);
    this.view.flxNoResultsContainer.setVisibility(false);
    this.view.flxNoContractAvailableFlag.setVisibility(false);
    this.view.lblSelectedSearchSubCriteria.setVisibility(false);
    this.showHideAdvanceSearchParam(false);
  },
  /*
  * show selected customer contracts list
  * @param: option - (on seg row click:1,direct navigation:2), customer details(name,id)
  */
  showSelectedCustFromSearchResults : function(option,customerData){
    this.view.flxSearchResultsForAddCust.setVisibility(false);
    this.view.flxSearchCustomerContractList.setVisibility(true);
    this.view.flxNoResultsContainer.setVisibility(false);
    this.view.flxNoContractAvailableFlag.setVisibility(false);
    this.view.lblContractListHeader.setVisibility(false);
    this.view.lblAddContractInfoHeading.top = "0dp";
    this.showHideAdvanceSearchParam(false);
    this.view.lblAddContractInfoHeading.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ContractExistsFor") +
      " " + customerData.name + " (" + customerData.id + ")";
    if (option === 1) {
      this.view.flxBackOptionAddCust.setVisibility(true);
    } else{
      this.view.flxBackOptionAddCust.setVisibility(false);
    }
  },
   /*
  * show searched customer realted contracts list
  * @param:searched customer response 
  */
  showRelativeContractsFromSearchResults : function(customerData){
    this.view.flxSearchResultsForAddCust.setVisibility(false);
    this.view.flxSearchCustomerContractList.setVisibility(true);
    this.view.flxNoResultsContainer.setVisibility(false);
    this.view.flxNoContractAvailableFlag.setVisibility(true);
    this.view.flxBackOptionAddCust.setVisibility(false);
    this.view.lblContractListHeader.setVisibility(true);
    this.view.lblAddContractInfoHeading.top = "15dp";
	this.view.btnAddContract.setVisibility(true);
    this.showHideAdvanceSearchParam(false);
    this.view.contractInfoFlagMessage.setInfoSkin();
    var custInfo = (customerData.customers && customerData.customers.length > 0) ? customerData.customers[0] : "";
    var custText = custInfo ? custInfo.coreCustomerName +" ("+custInfo.coreCustomerId +")" : "";
    this.view.contractInfoFlagMessage.lblErrorValue.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoContractExistsFor") + " "+ custText ;
    this.view.lblAddContractInfoHeading.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.Add") + " " +custText +
      " " + kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.toAnyOfFollowingOrCreate");
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsAddAnotherCust.btnSave,true,true);
  },
  /*
  * show create contract button in case no contract exists for searched customer
  */
  showCreateContractOption : function(customerResponse){
    this.view.flxSearchResultsForAddCust.setVisibility(false);
    this.view.flxSearchCustomerContractList.setVisibility(false);
    this.view.flxNoResultsContainer.setVisibility(true);
    this.view.flxNoContractAvailableFlag.setVisibility(true);
    this.view.noResultsSearchCustomers.btnAddRecord.setVisibility(true);
    this.showHideAdvanceSearchParam(false);
    this.view.contractInfoFlagMessage.setInfoSkin();
    var custInfo = customerResponse.customers && customerResponse.customers.length > 0 ? customerResponse.customers[0] : "";
    var custNameId = custInfo ? custInfo.coreCustomerName + " ("+custInfo.coreCustomerId + ")" : "";
    this.view.noResultsSearchCustomers.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddNewContractFor") + " " + custNameId;
    this.view.noResultsSearchCustomers.btnAddRecord.text = "Create New Contract";
    this.view.contractInfoFlagMessage.lblErrorValue.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoContractOrRelatedContract") + " " + custNameId;
    if(custInfo){
      this.addSearchCustToContractCustList(custInfo);
    }
    this.view.forceLayout();
  },
  /*
  * add searched customer to contract by default
  * @param: customer details
  */
  addSearchCustToContractCustList : function(custInfo){
    this.selectedCustomers = [];
    custInfo["isSelected"] = true;
    this.selectedCustomers.push(custInfo);
  },
  /*
  * show/hide the advanced search param in add another customer screen
  */
  showHideAdvanceSearchParam : function(opt){
    if(opt === true){
      this.view.flxSearchField13.setVisibility(true);
      this.view.flxAddCustAdvanceSearchCont.setVisibility(true);
      this.view.lblIconSearchArrow.text = "\ue986"; //up arrow
      this.view.lblIconSearchArrow.skin = "sknfontIconDescDownArrow12px";
    } else{
      this.view.flxSearchField13.setVisibility(false);
      this.view.flxAddCustAdvanceSearchCont.setVisibility(false);
      this.view.lblIconSearchArrow.text = "\ue922"; //side arrow
      this.view.lblIconSearchArrow.skin = "sknfontIconDescRightArrow14px";
      
    }
  },
  /*
  * enable/disable vertical tabs in edit user access 
  * @param: true/false
  */
  enableOrDisableVerticalTabEditUser : function(isEnable){
    this.view.enrollVerticalTabs.setEnabled(isEnable);
  },
  /*
  * call the respective function based on the contract result
  * @param: contract response context
  */
  viewContractCases : function(context){
    var contracts = context.contractOfCustomer
    var customerDeatils = context.custSearchResponse;
    //contract exists for customer
    if(contracts.length === 1 && context.contractType === "core"){ 
      var custDetails = "";
      if(customerDeatils){ //single customer result
        custDetails = {"name":customerDeatils.customers[0].coreCustomerName,
                       "id":customerDeatils.customers[0].coreCustomerId};
        this.showSelectedCustFromSearchResults(1,custDetails);
      }else{ //multiple cust result - on seg customer click
        var selInd = this.view.segSearchResultsCust.selectedRowIndex[1];
        var segData = this.view.segSearchResultsCust.data[selInd];
        custDetails = {"name":segData.lblSearchSegHeaderCustName.text,
                       "id":segData.lblSearchSegHeaderCustId.text};
        this.showSelectedCustFromSearchResults(2,custDetails);
      }
      this.view.commonButtonsAddAnotherCust.btnSave.info.addCustCase = 1;
      this.setSelectedOtherCustContractCards(contracts,custDetails);
    }//contract exist for related customers only
    else if(context.contractType === "related" && contracts.length !== 0){ 
      this.view.btnAddContract.info = {"customerDetail":customerDeatils};
      this.view.commonButtonsAddAnotherCust.btnSave.info.addCustCase = 2;
      this.showRelativeContractsFromSearchResults(customerDeatils);
      this.setSearchedCustRelatedContractCards(contracts,customerDeatils);
    } //any contract does not exist
    else if(contracts.length === 0){ 
      this.view.commonButtonsAddAnotherCust.btnSave.info.addCustCase = 3;
      this.showCreateContractOption(customerDeatils);
    }
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
     // "imgSectionCheckbox":"imgSectionCheckbox",
      "flxAccountType":"flxAccountType",
      "lblAccountType":"lblAccountType",
      "lblIconFilterAccType":"lblIconFilterAccType",
      "lblAccountName":"lblAccountName",
      "flxAccountName":"flxAccountName",
      "lblIconAccNameSort":"lblIconAccNameSort",
      "flxAccountHolder":"flxAccountHolder",
      "lblAccountHolder":"lblAccountHolder",
      "lblIconSortAccHolder":"lblIconSortAccHolder",
      "flxAccFlag":"flxAccFlag",
      "lblNewText":"lblNewText",
      "fontIconFlag":"fontIconFlag",
      "lblSeperator":"lblSeperator",
      "flxContractEnrollAccountsEditSection":"flxContractEnrollAccountsEditSection",
      "id":"id",
     // "imgCheckbox":"imgCheckbox",
      "lblCheckbox":"lblCheckbox",
      "lblSectionCheckbox":"lblSectionCheckbox",
      "flxContractEnrollAccountsEditRow":"flxContractEnrollAccountsEditRow"
    };
    return widgetMap;
  },
  /*
  * set segment data for edit accounts
  */
  setAccountsSegmentData : function(accountsList,isAutoSync){
    var self =this;
    var rowData = [], accountsAvail = false;
    var custId = this.view.customersDropdownAccounts.lblSelectedValue.info.customerId;
    this.selAccCount[custId] = 0;
    if(accountsList.size > 0){
      accountsAvail = true;
      accountsList.forEach(function(rec,key){
        rowData.push({
          "id":rec.accountNumber,
          "flxCheckbox":{"onClick":self.onClickAccountsEditUserAccess.bind(self,self.view.enrollEditAccountsCard.segAccountFeatures,false)},
          "lblCheckbox":{ "isVisible":true,"text":(rec.isAssociated === "true" || rec.isEnabled === "true") ? self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl,
			"skin": rec.isAssociated === "false" ? "sknBgB7B7B7Sz20pxCheckbox" : "sknIconBg0066CASz20pxCheckbox"},
          "lblAccountNumber": {"text": rec.accountNumber},
          "lblAccountType": {"text": rec.accountType || ""},
          "lblAccountName": {"text": rec.accountName || kony.i18n.getLocalizedString("i18n.Applications.NA")},
          "lblAccountHolder": {"text": rec.ownerType || ""},
          "lblSeperator":"-",
          "template":"flxContractEnrollAccountsEditRow"
        });
        if(rec.isAssociated === "true" || rec.isEnabled === "true") 
          self.selAccCount[custId] = self.selAccCount[custId] +1;
      });
      var secData = {
        "flxCheckbox":{"onClick": this.onCheckAccountsCheckbox.bind(this,this.view.enrollEditAccountsCard.segAccountFeatures,true)},
        "flxAccountNumCont":{"onClick":this.sortAndSetData.bind(this,"lblAccountNumber.text",this.view.enrollEditAccountsCard.segAccountFeatures, 1)},
        "lblIconSortAccName":{
          "text": "\ue92a",
          "skin": "sknIcon12pxBlack","hoverSkin" :"sknIcon12pxBlackHover",
          "left" : "10px"
        },
        "lblAccountNumber": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBER"),
        "lblSectionCheckbox": {"isVisible":true,"text":this.getHeaderCheckboxImage(rowData,true,true),"skin":"sknIconBg0066CASz20pxCheckbox"},
        "flxAccountType":{"onClick": this.showFilterForAccountsSectionClick.bind(this,1)},
        "lblAccountType": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE"),
        "lblIconFilterAccType":"\ue916",
        "lblAccountName": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME"),
        "lblIconAccNameSort":{
          "text": "\ue92b",
          "skin": "sknIcon15px","hoverSkin":"sknlblCursorFont",
          "left" : "5px"
        },
        "flxAccountName":{"onClick": this.sortAndSetData.bind(this,"lblAccountName.text", this.view.enrollEditAccountsCard.segAccountFeatures, 1)},
        "flxAccountHolder":{"onClick": this.showFilterForAccountsSectionClick.bind(this,2)},
        "lblAccountHolder": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE"),
        "lblIconSortAccHolder":"\ue916",
        "lblSeperator":"-",
        "template":"flxContractEnrollAccountsEditSection",
      };
      this.sortBy = this.getObjectSorter("lblAccountNumber.text");
      this.sortBy.inAscendingOrder = true;
      rowData = rowData.sort(this.sortBy.sortData);
      this.view.enrollEditAccountsCard.lblCount.text = this.getSelectedItemsCount(rowData, true);
      this.view.enrollEditAccountsCard.lblTotalCount.text = "of " + this.getTwoDigitNumber(rowData.length);
      this.view.enrollEditAccountsCard.flxNoFilterResults.setVisibility(false);
      this.view.enrollEditAccountsCard.segAccountFeatures.setVisibility(true);
      this.view.searchEditAccounts.setVisibility(true);
      this.view.enrollEditAccountsCard.segAccountFeatures.widgetDataMap = this.widgetMapForAccounts();
      this.view.enrollEditAccountsCard.segAccountFeatures.setData([[secData,rowData]]);
      this.view.enrollEditAccountsCard.segAccountFeatures.info = {"segData":[[secData,rowData]], "segDataJSON":{}};
      this.setDataToAccountsTabFilters();
    } else{
      accountsAvail = false;
      this.view.enrollEditAccountsCard.lblCount.text = "0";
      this.view.enrollEditAccountsCard.lblTotalCount.text = "of 0";
      this.view.enrollEditAccountsCard.segAccountFeatures.setData([]);
      this.view.enrollEditAccountsCard.segAccountFeatures.info = {"segData":[], "segDataJSON":{}};
      this.view.enrollEditAccountsCard.flxNoFilterResults.setVisibility(true);
      this.view.enrollEditAccountsCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmGroups.rtxNoRecordsAvailable");
      this.view.enrollEditAccountsCard.segAccountFeatures.setVisibility(false);
      this.view.searchEditAccounts.setVisibility(false); 
    }
    var autoSyncFlag=isAutoSync?isAutoSync:this.autoSyncAccountsFlag;
    this.view.enrollEditAccountsCard.lblCheckboxOptions.text=autoSyncFlag==="true"?this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxnormallbl;
    this.view.enrollEditAccountsCard.lblCheckboxOptions.skin=this.applyCheckboxSkin(this.view.enrollEditAccountsCard.lblCheckboxOptions);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave,true,accountsAvail);
    //this.view.enrollEditAccountsCard.imgCheckboxOptions.src=autoSyncFlag==="true"?"checkboxselected.png":"checkboxnormal.png";
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave,true,accountsAvail);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnNext,false,accountsAvail);
    this.enableOrDisableVerticalTabEditUser(accountsAvail);
    this.view.forceLayout();
  },
  /*
  * on click of checkbox in edit user accounts screen
  */
  onClickAccountsEditUserAccess : function(segmentPath, isHeader,eventObj,context){
    this.onCheckAccountsCheckbox(this.view.enrollEditAccountsCard.segAccountFeatures,false,eventObj,context);
    this.updateAccountSelectionEditUser(eventObj);
  },
  /*
  * check/uncheck checkbox in accounts tab header
  * @param: segment widget path, is header(true/false)
  */
  onCheckAccountsCheckbox : function(segmentPath, isHeader,eventObj,context) {
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
      var count =0;
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].lblCheckbox.text =img;
        rowsData[i].lblCheckbox.skin =this.applyCheckboxSkin(rowsData[i].lblCheckbox);
        if(img === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
          count =count +1;
      }
      //get selcted accounts count in bulk update
      if(this.view.flxBulkUpdateFeaturesPopup.isVisible === true){
        segSecData.lblCountActions = count+"";
      }else if(this.view.flxEditUserContainer.isVisible === true){ //in edit user accounts
        this.view.enrollEditAccountsCard.lblCount.text = this.getTwoDigitNumber(count);
      }
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].lblCheckbox.text = (rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      rowsData[selInd].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[selInd].lblCheckbox);
      segSecData.lblSectionCheckbox.text = this.getHeaderCheckboxImage(rowsData,true,true);
      segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin(segSecData.lblSectionCheckbox);
     // segSecData.imgSectionCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      selectedRowsCount = this.getSelectedActionsCount(rowsData);
      //get selcted count in bulk update popup
      if(this.view.flxBulkUpdateFeaturesPopup.isVisible === true){  
        segSecData.lblCountActions = selectedRowsCount;
      } else if(this.view.flxEditUserContainer.isVisible === true){ //in edit user accounts
        this.view.enrollEditAccountsCard.lblCount.text = this.getTwoDigitNumber(selectedRowsCount);
      }
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //enable/disable save buttons
    var isValid = this.validateCheckboxSelections(segmentPath, true);
    if (this.view.flxBulkUpdateFeaturesPopup.isVisible === true) { //in bulk update popup
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, isValid);
    } else if (segmentPath.id === "segRelatedContractsList") { //for select related contracts seg
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsRelatedDetails.btnSave, true, isValid);
    } else { // for edit accounts
      if (this.enrollAction === this.actionConfig.editUser || this.enrollAction === this.actionConfig.editSingleUser)
        this.enableDisableDropdownUIEditUser(this.view.customersDropdownAccounts, false);// isValid);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnSave, true, isValid);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditAccounts.btnNext, false, isValid);
      this.enableOrDisableVerticalTabEditUser(isValid);
    }   
  },
  /*
  * check if all the rows of segment are selected or not
  * @param: data,rowData or section data, is partial selection behaviour
  * @return: :image to be set (checked/unchecked/partial)
  */
  getHeaderCheckboxImage : function(data,isRowData,hasPartialSelection){
    var img = this.AdminConsoleCommonUtils.checkboxnormallbl;
    var currImg = (isRowData === true) ? "lblCheckbox" :"lblSectionCheckbox";
    var selCount = 0, partialCount = 0;
    for(var i=0; i<data.length; i++){
      var list = (isRowData === true) ? data[i] : data[i][0];
        if(list[currImg].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl || list[currImg].text === this.AdminConsoleCommonUtils.checkboxPartiallbl){
          selCount  = selCount +1;
          partialCount = (list[currImg].text === this.AdminConsoleCommonUtils.checkboxPartiallbl) ? partialCount +1 : partialCount;
        }
      }
    if(hasPartialSelection){
      if(selCount !== 0 && selCount === data.length)
        img = partialCount === 0 ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxPartiallbl;
      else if(selCount !== 0 && selCount < data.length)
        img = this.AdminConsoleCommonUtils.checkboxPartiallbl;
    } else{
      if(selCount === data.length)
        img = this.AdminConsoleCommonUtils.checkboxSelectedlbl;
    }
    return img;    
  },
  /*
  * get count of selected items
  * @param: data,isRow
  * @return: count of selected items
  */
  getSelectedItemsCount : function(data,isRow, isZeroPrefix){
    var selCount = 0;
    var srcImg = (isRow === true) ? "lblCheckbox" :"lblSectionCheckbox";
    for(var i=0; i<data.length; i++){
      var list = (isRow === true) ? data[i] : data[i][0];
      if(list[srcImg].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl || list[srcImg].text === this.AdminConsoleCommonUtils.checkboxPartiallbl){
        selCount  = selCount +1;
      }
    }
    if(isZeroPrefix === false){
      return selCount;
    } else {
      if(selCount > 9 || selCount === 0)
        return selCount;
      else
        return "0"+selCount;
    }
  },
  /*
  * update the selected accounts in edit user obj
  */
  updateAccountSelectionEditUser : function(eventObj){
    var custId = this.view.customersDropdownAccounts.lblSelectedValue.info.customerId;
   // var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var accSegData = this.view.enrollEditAccountsCard.segAccountFeatures.data[0][1];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var currUserAccMap = editUserObj.accounts;
    var count =0;
    for(var i=0; i< accSegData.length; i++){
      var accObj = currUserAccMap.get(accSegData[i].id);
      if(accSegData[i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl){
        accObj.isEnabled = "true";
        accObj.isAssociated = "true";
        count =count+1;
      }else{
        accObj.isEnabled = "false";
        accObj.isAssociated = "false";
      }
      currUserAccMap.set(accSegData[i].id,accObj);
    }
    this.selAccCount[custId] = count;
    editUserObj.accounts = currUserAccMap;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
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
    filterWidget.right = (flxRight + iconRight - 22) + "dp";
    filterWidget.top =(this.view.enrollEditAccountsCard.flxCardBottomContainer.frame.y + 40) +"dp";
    if(filterWidget.isVisible){
      filterWidget.setVisibility(false);
    } else{
      filterWidget.setVisibility(true);
    }
  },
  /*
  * search for accounts based on name,id in edit user access screen
  */
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
      sectionData.lblSectionCheckbox.text = this.getHeaderCheckboxImage(filteredData,true,true);
      sectionData.lblSectionCheckbox.skin = this.applyCheckboxSkin(sectionData.lblSectionCheckbox);
      if(filteredData.length > 0){
        dataToSet = [[sectionData,filteredData]];
        this.view.enrollEditAccountsCard.lblCount.text = this.getSelectedItemsCount(filteredData, true);
        this.view.enrollEditAccountsCard.lblTotalCount.text ="of "+ this.getTwoDigitNumber(filteredData.length);
        this.view.enrollEditAccountsCard.flxNoFilterResults.setVisibility(false);
      }else{
        dataToSet = searchText.length === 0 ? [[sectionData,[]]]: [];
        this.view.enrollEditAccountsCard.lblCount.text = "0";
        this.view.enrollEditAccountsCard.lblTotalCount.text = "of 0";
        this.view.enrollEditAccountsCard.flxNoFilterResults.setVisibility(true);
      }
        
      this.view.enrollEditAccountsCard.segAccountFeatures.rowTemplate = "flxContractEnrollAccountsEditRow";
      this.view.enrollEditAccountsCard.segAccountFeatures.setData(dataToSet);
    } else{
      this.view.enrollEditAccountsCard.segAccountFeatures.setData(accountsData);
    }
    this.view.flxEditUserContainer.forceLayout();
  },
  /*
  * show/hide the segment/no results based on results
  * @param: component path, visibility
  */
  showHideSegResultsCardContainers : function(componentPath, showSeg){
    componentPath.flxNoFilterResults.setVisibility(!showSeg);
    componentPath.segAccountFeatures.setVisibility(showSeg);
  },
  /*
  * show features by customer level on toggle
  */
  toggleFeaturesCustomerLevel : function(){
    this.view.toggleButtonsFeatures.info.selectedTab = 1;
    this.view.searchEditFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.enrollEditFeaturesCard.lblHeading.text =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomersController.SelectedFeatures")+":";
    this.toggleButtonsUtilFunction([this.view.toggleButtonsFeatures.btnToggleLeft,this.view.toggleButtonsFeatures.btnToggleRight],1);
    this.view.searchEditFeatures.tbxSearchBox.text = "";
    this.view.searchEditFeatures.flxSearchCancel.setVisibility(false);
    this.view.btnBulkUpdateFeatures.setVisibility(false);
    this.view.flxEnrollEditFeaturesList.setVisibility(true);
    this.view.flxEnrollEditAccFeaturesCont.setVisibility(false);
    this.view.flxEnrollEditFeatureFilter.setVisibility(false);
    this.view.forceLayout();
    this.view.flxEnrollEditFeaturesList.height = this.view.flxEnrollEditFeatureButtons.frame.y === 0 ? "220dp" :(this.view.flxEnrollEditFeatureButtons.frame.y - 170)+"dp" ;
    this.view.flxEnrollEditFeaturesList.setContentOffset({x:0,y:0});
    this.createFeatureCardForCustomers();
  },
  /*
  * show features by account level on toggle
  */
  toggleFeaturesAccountLevel: function () {
    this.view.toggleButtonsFeatures.info.selectedTab = 2;
    this.view.searchEditFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumber");
    this.toggleButtonsUtilFunction([this.view.toggleButtonsFeatures.btnToggleLeft, this.view.toggleButtonsFeatures.btnToggleRight], 2);
    this.view.btnBulkUpdateFeatures.setVisibility(true);
    this.view.flxEnrollEditFeaturesList.setVisibility(false);
    this.view.flxEnrollEditAccFeaturesCont.setVisibility(true);
    this.view.flxEnrollEditFeatureFilter.setVisibility(true);
    this.view.flxEnrollEditAccFeaturesCont.setVisibility(true);
    this.view.flxEnrollEditNoResultAccFeatures.setVisibility(false);
    this.createFeatureCardForAccounts();
    this.view.forceLayout();
    this.view.flxEnrollEditAccFeaturesCont.height = this.view.flxEnrollEditFeatureButtons.frame.y === 0 ? "220dp" : (this.view.flxEnrollEditFeatureButtons.frame.y - 170) + "dp";
    this.view.flxEnrollEditAccFeaturesCont.setContentOffset({ x: 0, y: 0 });
    this.setFilterDataInFeaturesLimitsTab(1);
  },
  /*
  * show limits by customer level on toggle
  */
  toggleLimitsCustomerLevel : function(){
    this.view.toggleButtonsLimits.info.selectedTab = 1;
    this.toggleButtonsUtilFunction([this.view.toggleButtonsLimits.btnToggleLeft,this.view.toggleButtonsLimits.btnToggleRight],1);
    this.view.btnBulkUpdateLimits.setVisibility(false);
    this.view.flxEnrollEditLimitsList.setVisibility(true);
    this.view.flxEnrollEditAccLimitsCont.setVisibility(false);
    this.view.flxEnrollEditLimitsFilter.setVisibility(false);
    this.view.flxEnrollEditLimitsSearchFilterCont.setVisibility(false);
    this.view.forceLayout();
    this.view.flxEnrollEditLimitsList.height = this.view.flxEnrollEditLimitsButtons.frame.y === 0 ? "220dp" : (this.view.flxEnrollEditLimitsButtons.frame.y - 170) + "dp";
    this.view.flxEnrollEditLimitsList.setContentOffset({ x: 0, y: 0 });
    this.view.enrollEditLimitsCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Limits");
    this.createLimitCardForCustomers();
  },
  /*
  * show limits by account level on toggle
  */
  toggleLimitsAccountLevel : function(){
    this.view.toggleButtonsLimits.info.selectedTab = 2;
    this.view.searchEditLimits.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumber");
    this.toggleButtonsUtilFunction([this.view.toggleButtonsLimits.btnToggleLeft,this.view.toggleButtonsLimits.btnToggleRight],2);
    this.view.searchEditLimits.tbxSearchBox.text = "";
    this.view.searchEditLimits.flxSearchCancel.setVisibility(false);
    this.view.btnBulkUpdateLimits.setVisibility(true);
    this.view.flxEnrollEditLimitsList.setVisibility(false);
    this.view.flxEnrollEditAccLimitsCont.setVisibility(true);
    this.view.flxEnrollEditLimitsFilter.setVisibility(true);
    this.view.flxEnrollEditLimitsSearchFilterCont.setVisibility(true);
    this.view.flxEnrollEditNoResultAccLimits.setVisibility(false);
    this.view.forceLayout();
    this.view.flxEnrollEditAccLimitsCont.height = this.view.flxEnrollEditLimitsButtons.frame.y === 0 ? "220dp" : (this.view.flxEnrollEditLimitsButtons.frame.y - 170) + "dp";
    this.view.flxEnrollEditAccLimitsCont.setContentOffset({ x: 0, y: 0 });
    this.createLimitsCardForAccounts();
    this.setFilterDataInFeaturesLimitsTab(2);
  },
  /*
  * create features card at customer level
  */
  createFeatureCardForCustomers : function(){
    this.view.enrollEditFeaturesCard.toggleCollapseArrow(true);
    this.view.enrollEditFeaturesCard.flxArrow.setVisibility(false);
    this.view.enrollEditFeaturesCard.flxSelectAllOption.setVisibility(true);
    this.view.enrollEditFeaturesCard.lblName.skin = "sknLbl117EB0LatoReg14px";
    this.view.enrollEditFeaturesCard.lblName.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    if(editUserObj.accLevelFeatures.length > 0){
      this.storeActionForAccountSelection();
      this.view.enrollEditFeaturesCard.lblTotalCount.text = "of "+ this.getTwoDigitNumber(editUserObj.accLevelFeatures.length);
      this.view.enrollEditFeaturesCard.segAccountFeatures.info = {"parentId":"enrollEditFeaturesCard","segData":[],"featuresType":1,"segDataJSON":{}};
      this.setFeaturesCardSegmentData(this.view.enrollEditFeaturesCard.segAccountFeatures, editUserObj.accLevelFeatures);
      this.view.enrollEditFeaturesCard.flxCheckbox.onClick = this.onSelectAllFeaturesClick.bind(this,this.view.enrollEditFeaturesCard);
      this.view.enrollEditFeaturesCard.lblSectionCheckbox.text = this.getHeaderCheckboxImage(this.view.enrollEditFeaturesCard.segAccountFeatures.data,false, true);
      this.view.enrollEditFeaturesCard.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.enrollEditFeaturesCard.lblSectionCheckbox);
      this.view.enrollEditFeaturesCard.flxNoFilterResults.setVisibility(false);
      this.view.enrollEditFeaturesCard.segAccountFeatures.setVisibility(true);
      this.view.enrollEditFeaturesCard.flxSelectAllOption.setVisibility(true);
      this.view.flxEnrollEditFeaturesSearchFilterCont.setVisibility(true);
    } else{
      this.view.enrollEditFeaturesCard.lblTotalCount.text = "of 0";
      this.view.enrollEditFeaturesCard.flxNoFilterResults.setVisibility(true);
      this.view.enrollEditFeaturesCard.segAccountFeatures.setVisibility(false);
      this.view.enrollEditFeaturesCard.flxSelectAllOption.setVisibility(false);
      this.view.flxEnrollEditFeaturesSearchFilterCont.setVisibility(false);
      this.view.enrollEditFeaturesCard.lblNoFilterResults.skin = "sknLbl485C75LatoRegular13Px";
      this.view.enrollEditFeaturesCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoFeaturesAvailable");
    }
  },
  /*
  * create features card at account level
  */
  createFeatureCardForAccounts: function (searchFilterData) {
    var compWidth = this.view.flxEnrollEditFeaturesContainer.frame.width === 0 ? "95%" : (this.view.flxEnrollEditFeaturesContainer.frame.width - 40);
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var accSize = 0, end=0;
    if (searchFilterData === undefined) {
      var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
      var accLevelFeaturesMap = editUserObj.accountMapFeatures;
      accSize = accLevelFeaturesMap.size;
    } else {
      accSize = searchFilterData.length;
    }
    this.resetPaginationValues(accSize, 1);
    this.pageCount.TOTAL_PAGES = Math.ceil(accSize/10);
    //in case no features available
    if (accSize === 0) {
      this.view.flxEnrollEditAccFeaturesCont.setVisibility(false);
      this.view.flxEnrollEditNoResultAccFeatures.setVisibility(true);
      this.view.lblEnrollFeaturesNoFilterResults.skin = "sknLbl485C75LatoRegular13Px";
      this.view.lblEnrollFeaturesNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoAccountFeaturesAvailable");
      this.view.flxEnrollEditFeaturesSearchFilterCont.setVisibility(false);
      this.view.btnBulkUpdateFeatures.setVisibility(false);
      this.view.forceLayout();
    } else {
      this.view.flxEnrollEditAccFeaturesCont.setVisibility(true);
      this.view.flxEnrollEditNoResultAccFeatures.setVisibility(false);
      this.view.flxEnrollEditFeaturesSearchFilterCont.setVisibility(true);
      this.view.btnBulkUpdateFeatures.setVisibility(true);
      if(accSize > 10){
        end=10;
        this.view.flxEnrollFeaturesPagination.setVisibility(true);
      } else{
        end=accSize;
        this.view.flxEnrollFeaturesPagination.setVisibility(false);
      }
      this.createDynamicAccountFeatureCards(0, end, searchFilterData);
      this.pageCount.PAGE_OFFSET = end;
    }
  },
  /*
  * create account cards for account level features 
  */
  createDynamicAccountFeatureCards: function (start, end, searchFilterData) {
    var self = this;
    var i = 0, accCardCount = 0;
    var accLevelFeaturesMapKeys = [];
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    if (searchFilterData === undefined) {
      var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
      var accLevelFeaturesMap = editUserObj.accountMapFeatures;
      accLevelFeaturesMapKeys = Array.from(accLevelFeaturesMap.values());
    } else {
      accLevelFeaturesMapKeys = searchFilterData;
    }
    self.view.flxEnrollEditAccFeaturesList.removeAll();
    var compWidth = this.view.flxEnrollEditFeaturesContainer.frame.width === 0 ? "95%" : (this.view.flxEnrollEditFeaturesContainer.frame.width - 40);
    end = end > accLevelFeaturesMapKeys.length ? accLevelFeaturesMapKeys.length : end;
    for (var x = start; x < end; x++) {
      var valueObj = accLevelFeaturesMapKeys[x];
      //show only accounts that have been selected
      if (valueObj.accountDetails.isEnabled === "true" || valueObj.accountDetails.isAssociated === "true") {
        var num = x > 10 ? x : "0" + x;
        var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
          "id": "featureCard" +num,
          "isVisible": true,
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "left":"20dp",
          "width":compWidth+"dp",
          "top": "15dp"
        }, {}, {});
        i = i + 1;
        featureCardToAdd.flxArrow.onClick = self.toggleCardListVisibility.bind(self, featureCardToAdd, self.view.flxEnrollEditAccFeaturesList);
        featureCardToAdd.flxSelectAllOption.isVisible = true;
        featureCardToAdd.flxCheckbox.onClick = self.onSelectAllFeaturesClick.bind(self,featureCardToAdd);
        featureCardToAdd.lblSectionCheckbox.isVisible = true;
        featureCardToAdd.imgSectionCheckbox.isVisible = false;
        featureCardToAdd.segAccountFeatures.info = {"parentId":featureCardToAdd.id,"segData":[],"featuresType":2, "segDataJSON":{}};
        if(JSON.parse(valueObj.features).length > 0){
          accCardCount = accCardCount +1;
          self.view.flxEnrollEditAccFeaturesList.add(featureCardToAdd);
          self.setAccountFeatureCardData(featureCardToAdd, valueObj);
        }      
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  /*
  * set next set of data for account level limits
  */
  onSegmentPaginationFeatures: function (currentPage) {
    var self = this;
    var searchText = this.view.searchEditFeatures.tbxSearchBox.text;
    var isSearch = searchText.length > 0 ? true : false;
    var offsetVal = currentPage *10;
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var accLevelFeaturesMap = editUserObj.accountMapFeatures;
    var accSize = isSearch === false ? accLevelFeaturesMap.size : this.searchResultsFeaturesLimits.length;
    var featuresToAppend = isSearch === true ? this.searchResultsFeaturesLimits : undefined;
    kony.adminConsole.utils.showProgressBar(this.view);
    //self.createDynamicAccountFeatureCards(offsetVal-10, offsetVal, featuresToAppend);
    var featuresTimeout = setTimeout(self.createDynamicAccountFeatureCards.bind(self, offsetVal-10, offsetVal, featuresToAppend),0);
    self.pageCount.PAGE_OFFSET = offsetVal;
    this.view.featuresPagination.lblNumber.text = currentPage;
    this.view.featuresPagination.tbxPageNumber.text = currentPage;
     //update pagination count
    var startVal = (offsetVal-10) === 0 ? "1": offsetVal-10;
    var endVal = accSize < self.pageCount.PAGE_OFFSET  ? accSize : self.pageCount.PAGE_OFFSET;
    this.view.featuresPagination.lblShowing.text = "Showing" + " " + (startVal+1) + " - " + endVal + " " + "Of " + accSize;
    this.view.flxEnrollEditAccFeaturesCont.setContentOffset({x:0,y:0});
  },

  /*
  * set UI changes and data to the each card component
  */
  setAccountFeatureCardData : function(featureCardToAdd, accLevelFeaturesMap){
    featureCardToAdd.info = {"accDetails":accLevelFeaturesMap.accountDetails};
    featureCardToAdd.lblName.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBERColon") + " "+
      accLevelFeaturesMap.accountDetails.accountNumber;
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
    this.setFeaturesCardSegmentData(featureCardToAdd.segAccountFeatures, JSON.parse(accLevelFeaturesMap.features));
    featureCardToAdd.lblSectionCheckbox.text = this.getHeaderCheckboxImage(featureCardToAdd.segAccountFeatures.data,false, true); 
    featureCardToAdd.lblSectionCheckbox.skin = this.applyCheckboxSkin(featureCardToAdd.lblSectionCheckbox);
  },
  /*
  * create other features card 
  */
  createOtherFeaturesCard : function(){
    this.view.enrollEditOtherFeaturesCard.toggleCollapseArrow(true);
    this.view.enrollEditOtherFeaturesCard.flxArrow.setVisibility(false);
    this.view.enrollEditOtherFeaturesCard.flxSelectAllOption.setVisibility(true);
    this.view.enrollEditOtherFeaturesCard.flxCardBottomContainer.setVisibility(true);
    this.view.enrollEditOtherFeaturesCard.segAccountFeatures.info = {"parentId":"enrollEditOtherFeaturesCard","segData":[], "featuresType":3, "segDataJSON":{}};
    var custId = this.view.customersDropdownOF.lblSelectedValue.info.customerId;
    //var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var enrollCustOtherFeatures = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    this.view.enrollEditOtherFeaturesCard.lblTotalCount.text = "of " + this.getTwoDigitNumber(enrollCustOtherFeatures.nonAccLevelFeatures.length);
    this.setFeaturesCardSegmentData(this.view.enrollEditOtherFeaturesCard.segAccountFeatures, enrollCustOtherFeatures.nonAccLevelFeatures);
    this.view.enrollEditOtherFeaturesCard.flxCheckbox.onClick = this.onSelectAllFeaturesClick.bind(this,this.view.enrollEditOtherFeaturesCard);
    this.view.enrollEditOtherFeaturesCard.lblSectionCheckbox.text = this.getHeaderCheckboxImage(this.view.enrollEditOtherFeaturesCard.segAccountFeatures.data,false, true);
    this.view.enrollEditOtherFeaturesCard.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.enrollEditOtherFeaturesCard.lblSectionCheckbox);
  },
  /*
  * widget map function for edit user features segment
  * @returns: widget data map for features segment
  */
  getWidgetDataMapForFeatures : function(){
    var widgetMap = {
      "id":"id",
      "dependentActions":"dependentActions",
      "isRowVisible":"isRowVisible",
      "flxFeatureNameCont":"flxFeatureNameCont",
     // "imgCheckbox":"imgCheckbox",
      "lblCheckbox":"lblCheckbox",
      "flxCheckbox":"flxCheckbox",
      "lblStatus":"lblStatus",
      "flxStatus":"flxStatus",
      "lblIconStatus":"lblIconStatus",
      "lblCustom":"lblCustom",
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "lblTopSeperator":"lblTopSeperator",
      //"imgSectionCheckbox":"imgSectionCheckbox",
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
   /*
  * set features and actions segment data in feature card
  * @param: segment widget path
  */
  setFeaturesCardSegmentData : function(segmentPath,featuresArr){
    var self =this;
    var segFeaturesData = [];
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var featuresSegData = featuresArr.map(function(rec){
      var segRowData = [], selActionCount = 0, dependentActions =[];
      var actions = rec.actions || rec.permissions;
      for(var i=0;i < actions.length; i++){
        //as we are getting string format /object format in different case
        if(actions[i].dependentActions && actions[i].dependentActions.length > 0 && typeof actions[i].dependentActions==="string")
          dependentActions=(actions[i].dependentActions.substring(1,actions[i].dependentActions.length-1)).split(",");
        else if(actions[i].dependentActions && actions[i].dependentActions.length > 0)
          dependentActions=actions[i].dependentActions.map(function(depAction){return depAction.id;});
        var rowJson = {
          "id":actions[i].actionId,
          "isRowVisible": false,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false},
          "flxFeatureNameCont":{"isVisible":true},
          "lblCheckbox":{"isVisible":true,"text": actions[i].isEnabled === "true" ? self.AdminConsoleCommonUtils.checkboxSelectedlbl :self.AdminConsoleCommonUtils.checkboxnormallbl,"skin": "sknIconBg0066CASz20pxCheckbox"},
          "flxCheckbox":{"onClick":self.onClickFeaturesRowCheckbox.bind(self,segmentPath)},
          "lblFeatureName":{"text":actions[i].actionName},
          "lblStatus":{"text":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?"Active" : "Inactive"},
          "lblIconStatus":{"skin":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                           "sknFontIconActivate" :"sknfontIconInactive"},
          "lblCustom":{"isVisible":false},
          "dependentActions": dependentActions,
          "template":"flxContractEnrollFeaturesEditRow",
        };
        //changes specific for customer level actions
        if(segmentPath.info.featuresType === 1){
          //to set partial selection for action incase of customer level features
          var accCount =  self.actionsAccountJSON[custId][actions[i].actionId] ? self.actionsAccountJSON[custId][actions[i].actionId].length : 0;
          rowJson.lblCheckbox.text = (accCount === 0)? self.AdminConsoleCommonUtils.checkboxnormallbl : 
          (accCount < self.selAccCount[custId] ? self.AdminConsoleCommonUtils.checkboxPartiallbl : self.AdminConsoleCommonUtils.checkboxSelectedlbl);
          rowJson.lblCheckbox.skin = self.applyCheckboxSkin(rowJson.lblCheckbox);
          if(rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl || rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxPartiallbl)
            selActionCount = selActionCount +1;
          //show/hide the custom label
          rowJson.lblCustom.isVisible = (rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxPartiallbl)?true : false;
        } else{
          if(actions[i].isEnabled === "true") selActionCount = selActionCount +1;
        }
        
        segRowData.push(rowJson);
      }
      var segSecData = {
        "id":rec.featureId,
        "lblTopSeperator":{"isVisible":false},
        "flxCheckbox":{"onClick": self.onSectionCheckboxClick.bind(self,segmentPath)},
        "lblSectionCheckbox":{"isVisible":true,"text": self.getHeaderCheckboxImage(segRowData,true,true),"skin":"sknIconBg0066CASz20pxCheckbox"},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "flxToggleArrow":{"onClick": self.toggleSegmentSectionArrow.bind(self,segmentPath)},
        "lblFeatureName": rec.featureName || rec.name ,
        "lblStatusValue":{"text":(rec.featureStatus || rec.status) === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          "Active" : "Inactive"},
        "lblIconStatusTop":{"text":"\ue921",
                            "skin":(rec.featureStatus || rec.status) === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                            "sknFontIconActivate" : "sknfontIconInactive"},
        "lblBottomSeperator":{"isVisible":true,"text":"-"},
        "lblAvailableActions":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon"),
        "lblCountActions": {"text":selActionCount},
        "lblTotalActions":"of "+ actions.length,
        "lblCustom":{"isVisible":false },
        "template":"flxContractEnrollFeaturesEditSection"
      };
      //changes specific to customer level features
      if(segmentPath.info.featuresType === 1){
         segSecData.lblCustom.isVisible = self.checkFeatureCustomLabel(segRowData);
      }
     segSecData.lblSectionCheckbox.skin = self.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      if(segRowData.length > 0){
        segmentPath.info.segDataJSON[rec.featureName] = [segSecData, segRowData];
        segFeaturesData.push([segSecData, segRowData]);
      }
      return [segSecData, segRowData];
    });
    segmentPath.widgetDataMap = this.getWidgetDataMapForFeatures();
    if(segFeaturesData.length > 0){
      segFeaturesData[segFeaturesData.length-1][0].lblBottomSeperator.isVisible = false;
    }
    segmentPath.rowTemplate = "flxContractEnrollFeaturesEditRow";
    segmentPath.setData(segFeaturesData);
    var cardWidgetId = segmentPath.info.parentId;
    this.view[cardWidgetId].lblCount.text = this.getSelectedItemsCount(segmentPath.data, false);
    this.view.forceLayout();

  },
  getEnabledFeaturesCount : function(accNum){
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForEnrollCust();
    var accFeaturesMap = enrollCustAccountsFeatures[custId].accountMapFeatures;
    var currAccFeatures = JSON.parse(accFeaturesMap.get(accNum).features);
    var count =0;
    for (let i = 0; i < currAccFeatures.length; i++) {
      var actions = currAccFeatures[i].actions || currAccFeatures[i].permissions;
      var actionCount = 0;
      for (let j = 0; j < actions.length; j++) {
        var currActionId = actions[j].id || actions[j].actionId;
        if (actions[j].isEnabled === "true") {
          actionCount =  actionCount+1;
          //enabledActionsId.push(actions[j].id);
        }
      }
      count = (actionCount >0) ? (count+1): count;
    }
    return count;
  },
  /*
  * get the selected actions count
  * @param: actions segment list
  */
  getSelectedActionsCount : function(actionsList){
    var actionCount = 0;
    for(var i=0;i < actionsList.length; i++){
      if(actionsList[i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
        actionCount = actionCount +1;
    }
    return (actionCount+"");
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
 /*
  * create limits card at customer level
  */
  createLimitCardForCustomers : function(){
    this.view.enrollEditLimitsCard.flxCardBottomContainer.setVisibility(true);
    this.view.enrollEditLimitsCard.flxArrow.setVisibility(false);
    this.view.enrollEditLimitsCard.toggleCollapseArrow(true);
    this.view.enrollEditLimitsCard.lblName.skin = "sknLbl117EB0LatoReg14px";
    this.view.enrollEditLimitsCard.lblName.hoverSkin = "sknLbl117EB0LatoReg14pxHov";
    this.createLimitsRowsForCustLevel();
  },
  /*
  * create limit rows dynamically and add in component
  */
  createLimitsRowsForCustLevel : function(){
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures,editUserObj.accLevelLimits,false,editUserObj.limitGroups);
    editUserObj.limitGroups = updateLimitGroupMaxValues;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
    var limitGroups = updateLimitGroupMaxValues;
    this.view.enrollEditLimitsCard.btnReset.onClick = this.showResetLimitsEditUserPopup.bind(this,1);
    this.view.enrollEditLimitsCard.segAccountFeatures.setVisibility(false);
    this.view.enrollEditLimitsCard.reportPagination.setVisibility(false);
    this.view.enrollEditLimitsCard.flxDynamicWidgetsContainer.setVisibility(true);
    this.view.enrollEditLimitsCard.flxDynamicWidgetsContainer.removeAll();
    var showLimitGroups = this.checkIfAccountLimitsAvailable(custId, 1);
    var legalEntity= this.getLEDesc(this.legalentityid1|| "");
    this.currencyValue=  this.defaultCurrencyCode(legalEntity[0].baseCurrency,true);
    if (limitGroups.length > 0 && showLimitGroups === true) {
      for (var i = 0; i < limitGroups.length; i++) {
        //ignore third type of limit group
        if(limitGroups[i].limitGroupId && limitGroups[i].limitGroupId !== "N/A" &&
           limitGroups[i].limitGroupId !== "ACCOUNT_TO_ACCOUNT"){
          var num = i>10 ? i : "0"+i;
          var limitRowToAdd = this.view.flxEnrollEditLimitsTemplate.clone(num);
          limitRowToAdd.isVisible = true;  
          this.view.enrollEditLimitsCard.flxDynamicWidgetsContainer.add(limitRowToAdd);
          this.setDataToCustLimitTextBox(limitGroups[i], num);
          this.view.enrollEditLimitsCard[num+"lblCurrencySymbol1"].text = this.currencyValue;
          this.view.enrollEditLimitsCard[num+"lblCurrencySymbol2"].text = this.currencyValue;
          this.view.enrollEditLimitsCard[num+"lblCurrencySymbol3"].text = this.currencyValue;          
          this.view.enrollEditLimitsCard[num+"lblLimitsHeading"].text = (limitGroups[i].limitGroupId.indexOf("SINGLE_PAYMENT") >= 0) ?
            kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SingleTransactionLimits_UC") :kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.BulkTransactionLimits_UC");
          this.view.enrollEditLimitsCard[num+"tbxLimitValue1"].onTouchStart = this.showHideRange.bind(this,num,"1",true);
          this.view.enrollEditLimitsCard[num+"tbxLimitValue1"].onEndEditing = this.showHideRange.bind(this,num,"1",false);
          this.view.enrollEditLimitsCard[num+"tbxLimitValue2"].onTouchStart = this.showHideRange.bind(this,num,"2",true);
          this.view.enrollEditLimitsCard[num+"tbxLimitValue2"].onEndEditing = this.showHideRange.bind(this,num,"2",false);
          this.view.enrollEditLimitsCard[num+"tbxLimitValue3"].onTouchStart = this.showHideRange.bind(this,num,"3",true);
          this.view.enrollEditLimitsCard[num+"tbxLimitValue3"].onEndEditing = this.showHideRange.bind(this,num,"3",false);

          this.view.enrollEditLimitsCard[num+"tbxLimitValue1"].onTextChange = this.updateCustLimitGroupValueEditUser.bind(this,num,"1");
          this.view.enrollEditLimitsCard[num+"tbxLimitValue2"].onTextChange = this.updateCustLimitGroupValueEditUser.bind(this,num,"2");
          this.view.enrollEditLimitsCard[num+"tbxLimitValue3"].onTextChange = this.updateCustLimitGroupValueEditUser.bind(this,num,"3");

        }
      }
      this.view.flxEnrollEditLimitsList.setVisibility(true);
      this.view.flxEnrollEditNoResultAccLimits.setVisibility(false);
    } else{
      this.view.lblEnrollLimitsNoFilterResults.skin = "sknLbl485C75LatoRegular13Px";
      this.view.lblEnrollLimitsNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoLimitsAvailable");
      this.view.flxEnrollEditLimitsList.setVisibility(false);
      this.view.flxEnrollEditNoResultAccLimits.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * check if account level limits are available and then only show limit groups
  * @param: customer id,option(1-for limitgroup,2-for acc lvl limits),accId
  * @return: option-1:true/false,option2:[]
*/
  checkIfAccountLimitsAvailable: function (custId, option, accId) {
    var self = this;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var accFeaturesMap = editUserObj.accountMapFeatures;
    var disableAccActionCount = 0, enabledMonActions = [], noMonFeaturesObj = {};
    if (option === 1) { //to check for all accounts of custId
      accFeaturesMap.forEach(function (accountObj, accNum) {
        enabledMonActions = [];
        if (accountObj.accountDetails.isEnabled === "true") {
          enabledMonActions = self.getEnabledMonFeatureActions(custId, JSON.parse(accountObj.features));
          disableAccActionCount = enabledMonActions.length === 0 ? disableAccActionCount + 1 : disableAccActionCount;
        } else {
          disableAccActionCount = disableAccActionCount + 1;
        }
      });
      var showLimitGroup = disableAccActionCount === accFeaturesMap.size ? false : true;
      return showLimitGroup;
    } //to check for given acc num of cust
    else {
      var currAccFeatures = JSON.parse(accFeaturesMap.get(accId).features);
      var currAccEnableAction = this.getEnabledMonFeatureActions(custId, currAccFeatures);
      return currAccEnableAction;
    }
  },
  /*
  * get array of enabled monetary action id's
  * @param: custId, acc level features array
  * @return: enabled mon action arr
  */
  getEnabledMonFeatureActions: function (custId, accFeatures) {
    var enabledActionsId = [], actionType = "";
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var limitMap = editUserObj.limits;
    for (let i = 0; i < accFeatures.length; i++) {
      var featureId = accFeatures[i].featureId || accFeatures[i].id;
      var actions = accFeatures[i].actions || accFeatures[i].permissions;
      for (let j = 0; j < actions.length; j++) {
        var currActionId = actions[j].id || actions[j].actionId;
        if (actions[j].typeId) {
          actionType = actions[j].typeId;
        } else {  //to check if action is monetary if typeId not available
          var limitActions = limitMap.get(featureId) ? limitMap.get(featureId).actions : [];
          var monetaryAction = limitActions.reduce(function (arr, rec) {
            arr.push(rec.actionId || rec.id);
            return arr;
          }, []);
          actionType = monetaryAction.indexOf(currActionId) >= 0 ? this.AdminConsoleCommonUtils.constantConfig.MONETARY : this.AdminConsoleCommonUtils.constantConfig.NON_MONETARY;
        }
        if (actions[j].isEnabled === "true" && actionType === this.AdminConsoleCommonUtils.constantConfig.MONETARY) {
          enabledActionsId.push(currActionId);
        }
      }
    }
    return enabledActionsId;
  },
  /*
  *set data to limit group row at customer level limits in edit user 
  *limit group data, id
  */
  setDataToCustLimitTextBox : function(limitsGroup, num){
    for(var i=0; i<limitsGroup.limits.length; i++){
      if(limitsGroup.limits[i].id === this.limitId.MAX_TRANSACTION_LIMIT){
        this.view.enrollEditLimitsCard[num+"tbxLimitValue1"].text = limitsGroup.limits[i].value;
        this.view.enrollEditLimitsCard[num+"tbxLimitValue1"].info = {"maxValue":limitsGroup.limits[i].maxValue,
                                                                     "id":limitsGroup.limitGroupId,
                                                                     "type": limitsGroup.limits[i].id};
        this.view.enrollEditLimitsCard[num+"lblRangeValue1"].text = " 0 - " +limitsGroup.limits[i].maxValue;
      } 
      else if(limitsGroup.limits[i].id === this.limitId.DAILY_LIMIT){
        this.view.enrollEditLimitsCard[num+"tbxLimitValue2"].text = limitsGroup.limits[i].value;
        this.view.enrollEditLimitsCard[num+"tbxLimitValue2"].info = {"maxValue":limitsGroup.limits[i].maxValue,
                                                                     "id":limitsGroup.limitGroupId,
                                                                     "type": limitsGroup.limits[i].id};
        this.view.enrollEditLimitsCard[num+"lblRangeValue2"].text = " 0 - " +limitsGroup.limits[i].maxValue;
      } 
      else if(limitsGroup.limits[i].id === this.limitId.WEEKLY_LIMIT){
        this.view.enrollEditLimitsCard[num+"tbxLimitValue3"].text = limitsGroup.limits[i].value;
        this.view.enrollEditLimitsCard[num+"tbxLimitValue3"].info = {"maxValue":limitsGroup.limits[i].maxValue,
                                                                     "id":limitsGroup.limitGroupId,
                                                                     "type": limitsGroup.limits[i].id};
        this.view.enrollEditLimitsCard[num+"lblRangeValue3"].text = " 0 - " +limitsGroup.limits[i].maxValue;
      }
    }
  },
  /*
  * create limits card at account level
  */
  createLimitsCardForAccounts: function (searchFilterData) {
    var self=this;
    var compWidth = this.view.flxEnrollEditLimitsContainer.frame.width === 0 ? "95%" : (this.view.flxEnrollEditLimitsContainer.frame.width - 40);
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var accSize = 0, end=0;
    if (searchFilterData === undefined) {
      var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
      var accLevelLimitsMap = editUserObj.accLevelLimits;
      accSize = accLevelLimitsMap.size;
    } else {
      accSize = searchFilterData.length;
    }
    this.resetPaginationValues(accSize, 2);
    this.pageCount.TOTAL_PAGES = Math.ceil(accSize/10);
    //in case no limits available
    if (accSize === 0) {
      this.view.lblEnrollLimitsNoFilterResults.skin = "sknLbl485C75LatoRegular13Px";
      this.view.lblEnrollLimitsNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoAccountLimitsAvailable");
      this.view.flxEnrollEditAccLimitsCont.setVisibility(false);
      this.view.flxEnrollEditNoResultAccLimits.setVisibility(true);
      this.view.btnBulkUpdateLimits.setVisibility(false);
      this.view.flxEnrollEditLimitsSearchFilterCont.setVisibility(false);
    } else {
      this.view.flxEnrollEditAccLimitsCont.setVisibility(true);
      this.view.flxEnrollEditNoResultAccLimits.setVisibility(false);
      this.view.btnBulkUpdateLimits.setVisibility(true);
      this.view.flxEnrollEditLimitsSearchFilterCont.setVisibility(true);
      if(accSize > 10){
        end=10;
        this.view.flxLimitsPaginationCont.setVisibility(true);
      } else{
        end=accSize;
        this.view.flxLimitsPaginationCont.setVisibility(false);
      }
      this.createDynamicAccountLimitsCards(0, end, searchFilterData);
      this.pageCount.PAGE_OFFSET = end;
    }
    this.view.forceLayout();
  },
  createDynamicAccountLimitsCards: function (start, end, searchFilterData) {
    var self = this;
    var i = 0, accCardCount = 0;
    var accLevelFeaturesMapKeys = [];
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    if (searchFilterData === undefined) {
      var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
      var accLevelFeaturesMap = editUserObj.accLevelLimits;
      accLevelFeaturesMapKeys = Array.from(accLevelFeaturesMap.values());
    } else {
      accLevelFeaturesMapKeys = searchFilterData;
    }
    this.view.flxEnrollEditAccLimitsList.removeAll();
    var compWidth = this.view.flxEnrollEditAccLimitsCont.frame.width === 0 ? "95%" : (this.view.flxEnrollEditLimitsContainer.frame.width - 40);
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
        limitCardToAdd.btnReset.setVisibility(false);
        limitCardToAdd.flxArrow.onClick = self.toggleCardListVisibilityAccLimits.bind(self, limitCardToAdd, self.view.flxEnrollEditAccLimitsList, valueObj);
        limitCardToAdd.btnReset.onClick = self.showResetLimitsEditUserPopup.bind(self, 2, limitCardToAdd);
        limitCardToAdd.segAccountFeatures.info = { "parentId": limitCardToAdd.id, "segData": [] };
        if (JSON.parse(valueObj.limits).length > 0) {
          accCardCount = accCardCount + 1;
          self.view.flxEnrollEditAccLimitsList.add(limitCardToAdd);
          self.setAccountLimitCardData(limitCardToAdd, valueObj);
        }
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  /*
  * set pagination values to initial page
  */
  resetPaginationValues : function(dataLen,option){
    this.pageCount = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : 0
    };
    var start = (parseInt(dataLen) < 10) ? dataLen : "10";
    if(option ===1){
      this.view.featuresPagination.lblNumber.text = "1";
      this.view.featuresPagination.tbxPageNumber.text = "1";
      this.view.featuresPagination.lblShowing.text = "Showing 1 - " +start+ " Of " + (dataLen||0);
    } else if(option ===2){
      this.view.limitsPagination.lblNumber.text = "1";
      this.view.limitsPagination.tbxPageNumber.text = "1";
      this.view.limitsPagination.lblShowing.text = "Showing 1 - " +start+ " Of " + (dataLen||0);
    }
  },
  /*
  * set next set of data for account level limits
  */
  onSegmentPaginationLimits: function (currentPage) {
    var self = this;
    var searchText = this.view.searchEditLimits.tbxSearchBox.text;
    var isSearch = searchText.length > 0 ? true : false;
    var offsetVal = currentPage *10;

    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var accLevelFeaturesMap = editUserObj.accLevelLimits;
    var accSize = isSearch === false ? accLevelFeaturesMap.size : this.searchResultsFeaturesLimits.length;
    var featuresToAppend = isSearch === true ? this.searchResultsFeaturesLimits : undefined;
    kony.adminConsole.utils.showProgressBar(this.view);
    var limitTimeout = setTimeout(self.createDynamicAccountLimitsCards.bind(self, offsetVal-10, offsetVal, featuresToAppend),0);
    self.pageCount.PAGE_OFFSET = offsetVal;
    this.view.limitsPagination.tbxPageNumber.text = currentPage;
    this.view.limitsPagination.lblNumber.text = currentPage;
    var startVal = (offsetVal -10) === 0 ? "1": offsetVal-10;
    var endVal = accSize < self.pageCount.PAGE_OFFSET  ? accSize : self.pageCount.PAGE_OFFSET;
    this.view.limitsPagination.lblShowing.text = "Showing" + " " + (startVal+1) + " - " + endVal + " " + "Of " + accSize;
    this.view.flxEnrollEditAccLimitsCont.setContentOffset({x:0,y:0});
  },
  /*
  * set UI changes and data to the each card component
  * @param: limit card component path, acclevel limit object
  */
  setAccountLimitCardData: function (limitCardToAdd, accLevelLimitsMap) {
    var self =this;
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    limitCardToAdd.info = {"accDetails":accLevelLimitsMap.accountDetails};
    limitCardToAdd.lblName.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBERColon") + " "+
      accLevelLimitsMap.accountDetails.accountNumber;
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
    limitCardToAdd.toggleCollapseArrow(false);
    this.setLimitsAtAccountLevel(limitCardToAdd.segAccountFeatures, JSON.parse(accLevelLimitsMap.limits), custId, 1);
    

  },
  /*
 * widget map function for edit user limits segment at account level
 * @returns: widget data map for limits segment
 */
  getWidgetMapForLimitsAccountLevel: function () {
    var widgetMap = {
      "isRowVisible": "isRowVisible",
      "lblTopSeperator":"lblTopSeperator",
      "flxCheckbox":"flxCheckbox",
      "lblSectionCheckbox":"llSectionCheckbox",
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
  /*
 * set limits segment data in limits card at account level
 * @param: segment widget path, limits array
 */
  setLimitsAtAccountLevel: function (segmentPath, limitsArr, custId,option) {
    var self = this;
    //var limitsDataToSet = [];
    var limitsDataToSet = [], enabledActionsId = [], isValid = true;
    var parentCardId = segmentPath.info.parentId;
    var accountInfo = this.view[parentCardId].info ? this.view[parentCardId].info.accDetails : "";
    var accNum = accountInfo.accountNumber || accountInfo.accountId;
    //get all enabled action ids
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForEnrollCust();
    var accFeaturesMap = enrollCustAccountsFeatures[custId].accountMapFeatures;
    var currAccFeatures = JSON.parse(accFeaturesMap.get(accNum).features);
    for(let i=0; i<currAccFeatures.length; i++){
      var actions = currAccFeatures[i].actions || currAccFeatures[i].permissions;
      for(let j =0; j<actions.length ;j++){
        var currActionId = actions[j].id || actions[j].actionId;
        if(actions[j].isEnabled === "true"){
          enabledActionsId.push(currActionId);
        }
      }
    }
    var limitsSegData = limitsArr.map(function (rec) {
      var segRowData = [],actionHasError =false;
      for (var i = 0; i < rec.actions.length; i++) {
        var limitRowObj = {};
        var limitValues = rec.actions[i].limits;
        if (enabledActionsId.indexOf(rec.actions[i].actionId) >= 0) {
            limitRowObj = {
            "id": rec.actions[i].actionId,
            "lblFeatureName": rec.actions[i].actionName,
            "isRowVisible": false,
            "flxAssignLimits": { "isVisible": false },
            "lblTransactionType": kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type_Caps"),
            "lblTransactionLimits": "TRANSACTION LIMIT",
            "lblPreApprovedLimit": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PreApproved_UC"),
            "lblAutoDenyLimits": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AutoDeny_UC"),
            "lblperTransactionLimits": kony.i18n.getLocalizedString("i18n.frmServiceManagement.PerTransactionLimitLC"),
            "lblDailyTransactionLimits": kony.i18n.getLocalizedString("i18n.frmServiceManagement.DailyTransactionLimitLC"),
            "lblWeeklyTransactionLimits": kony.i18n.getLocalizedString("i18n.frmServiceManagement.WeeklyTransLimitLC"),
            "lblPerTransactionLimitValue": { "text": limitValues[self.limitId.MAX_TRANSACTION_LIMIT] },
            "txtPerTransPreApprovedLimit": {
              "text": limitValues[self.limitId.PRE_APPROVED_TRANSACTION_LIMIT],
              "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px",
              "onTextChange": self.updateAccLimitsValueEditUser.bind(self, segmentPath),
              "info": { "name": self.limitId.PRE_APPROVED_TRANSACTION_LIMIT, "rowNum": 1 }
            },
            "txtPerTransAutoDenyLimits": {
              "text": limitValues[self.limitId.AUTO_DENIED_TRANSACTION_LIMIT],
              "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px",
              "onTextChange": self.updateAccLimitsValueEditUser.bind(self, segmentPath),
              "info": { "name": self.limitId.AUTO_DENIED_TRANSACTION_LIMIT, "rowNum": 1 }
            },
            "lblDailyTransactionLimitValue": { "text": limitValues[self.limitId.DAILY_LIMIT] },
            "txtDailyTransPreApprovedLimit": {
              "text": limitValues[self.limitId.PRE_APPROVED_DAILY_LIMIT],
              "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px",
              "onTextChange": self.updateAccLimitsValueEditUser.bind(self, segmentPath),
              "info": { "name": self.limitId.PRE_APPROVED_DAILY_LIMIT, "rowNum": 2 }
            },
            "txtDailyTransAutoDenyLimits": {
              "text": limitValues[self.limitId.AUTO_DENIED_DAILY_LIMIT],
              "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px",
              "onTextChange": self.updateAccLimitsValueEditUser.bind(self, segmentPath),
              "info": { "name": self.limitId.AUTO_DENIED_DAILY_LIMIT, "rowNum": 2 }
            },
            "lblWeeklyTransactionLimitValue": { "text": limitValues[self.limitId.WEEKLY_LIMIT] },
            "txtWeeklyTransPreApprovedLimit": {
              "text": limitValues[self.limitId.PRE_APPROVED_WEEKLY_LIMIT],
              "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px",
              "onTextChange": self.updateAccLimitsValueEditUser.bind(self, segmentPath),
              "info": { "name": self.limitId.PRE_APPROVED_WEEKLY_LIMIT, "rowNum": 3 }
            },
            "txtWeeklyTransAutoDenyLimits": {
              "text": limitValues[self.limitId.AUTO_DENIED_WEEKLY_LIMIT],
              "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px",
              "onTextChange": self.updateAccLimitsValueEditUser.bind(self, segmentPath),
              "info": { "name": self.limitId.AUTO_DENIED_WEEKLY_LIMIT, "rowNum": 3 }
            },
            "lblPerTransactionLimitDollar": { "text": self.currencyValue },
            "lblDailyTransactionLimitDollar": { "text": self.currencyValue },
            "lblWeeklyTransactionLimitDollar": { "text": self.currencyValue },
            "lblPerCurrencyPreLimit": { "text": self.currencyValue },
            "lblPerCurrencyADLimits": { "text": self.currencyValue },
            "lblDailyCurrencyPreLimit": { "text": self.currencyValue },
            "lblDailyCurrencyADLimits": { "text": self.currencyValue },
            "lblWeeklyCurrencyADLimits": { "text": self.currencyValue },
            "lblWeeklyCurrencyPreLimit": { "text": self.currencyValue },
            "lblErrorMsg11": { "text": "Error" },
            "lblErrorMsg12": { "text": "Error" },
            "lblErrorMsg21": { "text": "Error" },
            "lblErrorMsg22": { "text": "Error" },
            "lblErrorMsg31": { "text": "Error" },
            "lblErrorMsg32": { "text": "Error" },
            "lblErrorIcon11": { "text": "\ue94c" },
            "lblErrorIcon12": { "text": "\ue94c" },
            "lblErrorIcon21": { "text": "\ue94c" },
            "lblErrorIcon22": { "text": "\ue94c" },
            "lblErrorIcon31": { "text": "\ue94c" },
            "lblErrorIcon32": { "text": "\ue94c" },
            "flxErrorRow1": { "isVisible": true },
            "flxErrorRow2": { "isVisible": true },
            "flxErrorRow3": { "isVisible": true },
            "flxColumn11": { "isVisible": false },
            "flxColumn12": { "isVisible": false },
            "flxColumn21": { "isVisible": false },
            "flxColumn22": { "isVisible": false },
            "flxColumn31": { "isVisible": false },
            "flxColumn32": { "isVisible": false },
            "lblSeperator1": "-",
            "lblSeperator2": "-",
            "lblSeperator": "-",
            "flxRangeIcon1": { "isVisible": false, "onHover": self.showRangeTooltip },
            "flxRangeIcon2": { "isVisible": false, "onHover": self.showRangeTooltip },
            "flxRangeIcon3": { "isVisible": false, "onHover": self.showRangeTooltip },
            "lblIconRangeInfo1": { "text": "\ue94d" },
            "lblIconRangeInfo2": { "text": "\ue94d" },
            "lblIconRangeInfo3": { "text": "\ue94d" },
            "template": "flxAssignLimits"
          };
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
      }
      var segSecData = {
        "id":rec.featureId,
        "lblTopSeperator": {"isVisible":false},
        "flxCheckbox": {"isVisible":false},
        "flxToggleArrow": {"onClick": self.toggleSegmentSectionArrow.bind(self,segmentPath)},
        "lblIconToggleArrow": {"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "lblFeatureName": rec.featureName,
        "lblStatusValue": {"text": rec.featureStatus === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "lblIconStatusTop": {"text":"\ue921",
                            "skin":rec.featureStatus === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblBottomSeperator": {"isVisible":true,"text":"-"},
        "lblAvailableActions": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.MonetaryActions")+":",
        "lblCountActions": {"text":segRowData.length},
        "lblTotalActions":{"isVisible":false},
        "template":"flxContractEnrollFeaturesEditSection"
      };

      if (actionHasError) {
        segSecData.lblIconToggleArrow.text = "\ue915";
        segSecData.lblIconToggleArrow.skin = "sknfontIconDescDownArrow12px";
      }
      //add feature if atleast one action is present
      if(segRowData.length > 0){
        limitsDataToSet.push([segSecData, segRowData]);
      }
      return limitsDataToSet;
    });
    segmentPath.widgetDataMap = this.getWidgetMapForLimitsAccountLevel();
    if (limitsDataToSet.length > 0) {
      if(option !== 1){ //set data to seg only on expand click action
        limitsDataToSet[limitsDataToSet.length - 1][0].lblBottomSeperator.isVisible = false;
        segmentPath.setData(limitsDataToSet);
      }
      this.view[parentCardId].segAccountFeatures.setVisibility(true);
      this.view[parentCardId].flxNoFilterResults.setVisibility(false);
      this.view[parentCardId].lblErrorIcon.isVisible = !isValid;
    } else {
      segmentPath.setData([]);
      this.view[parentCardId].segAccountFeatures.setVisibility(false);
      this.view[parentCardId].flxNoFilterResults.setVisibility(true);
      this.view[parentCardId].lblNoFilterResults.skin = "sknLbl485C75LatoRegular13Px";
      this.view[parentCardId].lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomerController.NoLimitsForAccountMsg");
    }
    this.view.forceLayout();
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
  * @param: limitGroups values array, is intial time data set
  * @return: limitGroups values json
  */
  getLimitGroupsValuesJsonFromArray : function(limitValueArr, isInitialTime){
    var self =this;
    var limitsJson = {};
    if (limitValueArr && limitValueArr.length > 0) {
      limitsJson = limitValueArr.reduce(function (mapJson, rec) {
        var limitGroup = {
          'limitGroupName': "",
          'limitGroupId': rec.limitGroupId,
          "limits": [],
          "actualLimits": []
        };
        var existingLimitId = [];
        //add max value param for caluclating max limits
        for (var i = 0; i < rec.limits.length; i++) {
          existingLimitId.push(rec.limits[i].id);
          var limitVal = parseFloat(rec.limits[i].value);
          var maxVal = parseFloat(rec.limits[i].maxValue);
          limitGroup.limits.push({
            "id": rec.limits[i].id, "value": (isInitialTime === true && limitVal > maxVal) ? (rec.limits[i].maxValue + "" || "0") : rec.limits[i].value + "", // set limit values to max limits if limit val is greater than max val
            "maxValue": rec.limits[i].maxValue + ""
          });
          limitGroup.actualLimits.push({
            "id": rec.limits[i].id,
            "value": (isInitialTime === true && limitVal > maxVal) ? (rec.limits[i].maxValue + "" || "0") : rec.limits[i].value + ""
          });
        }
        if (rec.limits.length < 3) {
          if (!existingLimitId.includes(self.limitId.MAX_TRANSACTION_LIMIT)) {
            limitGroup.limits.push({ "id": self.limitId.MAX_TRANSACTION_LIMIT, "value": "0", "maxValue": "0" });
            limitGroup.actualLimits.push({ "id": self.limitId.MAX_TRANSACTION_LIMIT, "value": "0" });
          } else if (!existingLimitId.includes(self.limitId.DAILY_LIMIT)) {
            limitGroup.limits.push({ "id": self.limitId.DAILY_LIMIT, "value": "0", "maxValue": "0" });
            limitGroup.actualLimits.push({ "id": self.limitId.DAILY_LIMIT, "value": "0" });
          } else if (!existingLimitId.includes(self.limitId.WEEKLY_LIMIT)) {
            limitGroup.limits.push({ "id": self.limitId.WEEKLY_LIMIT, "value": "0", "maxValue": "0" });
            limitGroup.actualLimits.push({ "id": self.limitId.WEEKLY_LIMIT, "value": "0" });
          }
        }
        mapJson[rec.limitGroupId] = limitGroup;
        return mapJson;
      }, {});
    }
    return limitsJson;
  },
  /*
  * expand/collapse selected card listing container visibility for featureLimitCard componrent
  * @param: feature/limit card widget path, path of all cards container flex
  */
  toggleCardListVisibility: function (cardWidget, parentFlexCont) {
    var listArr = parentFlexCont.widgets();
    for (var i = 0; i < listArr.length; i++) {
      if (listArr[i].id === cardWidget.id) {
        var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
        cardWidget.toggleCollapseArrow(!visibilityCheck);
        //collapses segment section inside the card
        var segData = cardWidget.segAccountFeatures.data;
          for (var j = 0; j < segData.length; j++) {
            segData[j][0].lblTopSeperator.isVisible = false;
            if (segData[j][0].lblIconToggleArrow.skin !== "sknfontIconDescRightArrow14px") {
              segData[j][0].lblIconToggleArrow.text = "\ue922";
              segData[j][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
              segData[j][1] = this.showHideSegRowFlex(segData[j][1], false);
              //if(j === segData.length-1){
              segData[j][0].lblBottomSeperator.isVisible = false;
              //}
            }
          }
        if (this.view.flxEnrollEditLimitsContainer.isVisible === true) {
          var btnVisibile = (!visibilityCheck) && cardWidget.segAccountFeatures.data.length > 0;
          this.view[listArr[i].id].btnReset.setVisibility(btnVisibile);
        } else {
          cardWidget.btnReset.setVisibility(false);
        }
        cardWidget.segAccountFeatures.setData(segData);
      }
      else {
        this.view[listArr[i].id].toggleCollapseArrow(false);
        this.view[listArr[i].id].btnReset.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  /*
  * expand/collapse selected card listing container visibility for featureLimitCard componrent
  * @param: feature/limit card widget path, path of all cards container flex
  */
  toggleCardListVisibilityAccLimits: function (cardWidget, parentFlexCont, accLevelLimitsMap) {
     var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var listArr = parentFlexCont.widgets();
    for (var i = 0; i < listArr.length; i++) {
      if (listArr[i].id === cardWidget.id) {
        var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
        cardWidget.toggleCollapseArrow(!visibilityCheck);
        if(visibilityCheck === false){
           this.setLimitsAtAccountLevel(cardWidget.segAccountFeatures, JSON.parse(accLevelLimitsMap.limits), custId, 2);
        }
        if (this.view.flxEnrollEditLimitsContainer.isVisible === true) {
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
  /*
  * expand/collapse selected card listing container visibility for featureLimitCard componrent
  * @param: feature/limit card widget path, path of all cards container flex
  */
  toggleCardListVisibilityFeatures: function (cardWidget, parentFlexCont, accLevelFeaturesMap) {
    var listArr = parentFlexCont.widgets();
    for (var i = 0; i < listArr.length; i++) {
      if (listArr[i].id === cardWidget.id) {
        var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
        cardWidget.toggleCollapseArrow(!visibilityCheck);
        if(visibilityCheck === false){
          this.setFeaturesCardSegmentData(cardWidget.segAccountFeatures, JSON.parse(accLevelFeaturesMap.features));
       }
        //collapses segment section inside the card
        /*var segData = cardWidget.segAccountFeatures.data;
          for (var j = 0; j < segData.length; j++) {
            segData[j][0].lblTopSeperator.isVisible = false;
            if (segData[j][0].lblIconToggleArrow.skin !== "sknfontIconDescRightArrow14px") {
              segData[j][0].lblIconToggleArrow.text = "\ue922";
              segData[j][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
              segData[j][1] = this.showHideSegRowFlex(segData[j][1], false);
              //if(j === segData.length-1){
              segData[j][0].lblBottomSeperator.isVisible = false;
              //}
            }
          }*/
          cardWidget.btnReset.setVisibility(false);
      }
      else {
        this.view[listArr[i].id].toggleCollapseArrow(false);
        this.view[listArr[i].id].btnReset.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  /*
  * expand/collapse the rows under a section for feature/limits segments
  * @param: segment widget path, event
  */
  toggleSegmentSectionArrow : function(segmentWidgetPath,event){
    var segData = segmentWidgetPath.data;
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections to collapse
    for(var i=0;i< segData.length;i++){
      segData[i][0].lblTopSeperator.isVisible = false;
      segData[i][0].lblBottomSeperator.isVisible = true;
      if(selectedSecInd !== i){
        segData[i][0].lblIconToggleArrow.text = "\ue922";
        segData[i][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
        segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
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
      segData[selectedSecInd][1] = this.showHideSegRowFlex(segData[selectedSecInd][1],true);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblTopSeperator.isVisible = true;
      }
      segData[selectedSecInd][0].lblBottomSeperator.isVisible = (this.view.flxEnrollEditLimitsContainer.isVisible === true) ? false : true;
    } else{
      segData[selectedSecInd][0].lblIconToggleArrow.text = "\ue922";
      segData[selectedSecInd][0].lblIconToggleArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][1] = this.showHideSegRowFlex(segData[selectedSecInd][1],false);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblTopSeperator.isVisible = false;
      }
      if(selectedSecInd ===(segData.length-1) ){
        segData[selectedSecInd][0].lblBottomSeperator.isVisible = false;
      }
    }
    segmentWidgetPath.setData(segData);
  },
  /*
  * set segment rows visibility
  * @params: rows array, visibility - true/false
  * @return: updated rows data with visibilty
  */
  showHideSegRowFlex : function(rowsData,visibility){
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
  /*
  * on click of checbox in section of segment
  * @param: segment widget path, event
  */
  onSectionCheckboxClick : function(segmentWidPath,event){
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
    //set image for select all features image, selected count
    if(segmentWidPath.info && segmentWidPath.info.parentId){
      this.view[segmentWidPath.info.parentId].lblSectionCheckbox.text = this.getHeaderCheckboxImage(segData,false, true);
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
   /* var isValid = this.validateSelectionForMultipleCards(segmentWidPath);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,isValid);
    this.enableOrDisableVerticalTabEditUser(isValid);*/
  },
  /*
  * uncheck/check features row checkbox
  * @param: segment widget path, event
  */
  onClickFeaturesRowCheckbox: function(segmentWidPath,event){
    var selSecInd = event.rowContext.sectionIndex;
    var selRowInd = event.rowContext.rowIndex;
    var segData = segmentWidPath.data;
    var imgToSet = (segData[selSecInd][1][selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
      this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    segData[selSecInd][1][selRowInd].lblCheckbox.text = imgToSet;
    segData[selSecInd][1][selRowInd].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][selRowInd].lblCheckbox);
    //update the selection for dependent actions if any
    if(segData[selSecInd][1][selRowInd].dependentActions.length > 0){
      for(var i=0; i<segData[selSecInd][1].length;i++){
        if(segData[selSecInd][1][selRowInd].dependentActions.indexOf(segData[selSecInd][1][i].id) >= 0){
          segData[selSecInd][1][i].lblCheckbox.text = imgToSet;
          segData[selSecInd][1][i].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][i].lblCheckbox);       
        }
      }
    }
    //hide custom label in customer level actions
    segData[selSecInd][1][selRowInd].lblCustom.isVisible = false;
    
    segData[selSecInd][0].lblSectionCheckbox.text = this.getHeaderCheckboxImage(segData[selSecInd][1],true, true);
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    segData[selSecInd][0].lblCountActions.text = this.getSelectedActionsCount(segData[selSecInd][1]);
    segData[selSecInd][0].lblCustom.isVisible = this.checkFeatureCustomLabel(segData[selSecInd][1]);
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    //set image for select all features image, selected count
    if(segmentWidPath.info && segmentWidPath.info.parentId){
      this.view[segmentWidPath.info.parentId].lblSectionCheckbox.text = this.getHeaderCheckboxImage(segData,false, true);
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
   /* var isValid = this.validateSelectionForMultipleCards(segmentWidPath);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,isValid);
    this.enableOrDisableVerticalTabEditUser(isValid);*/
  },
  /*
  * select all features under a customer/account card
  * @param: selected card widget path
  */
  onSelectAllFeaturesClick : function(cardWidgetPath){
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
      //segData[i][0].lblCountActions.text = (img === this.AdminConsoleCommonUtils.checkboxnormal ? "0": segData[i][1].length);
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
    /*var isValid = this.validateSelectionForMultipleCards(cardWidgetPath.segAccountFeatures);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnSave,true,isValid);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsEditFeatures.btnNext,false,isValid);
    this.enableOrDisableVerticalTabEditUser(isValid);*/
  },
  /*
  * select the dependent actions for current selcted action
  * @param: seg rows data, curr action dependentAction list
  * @return: updated seg rows data
  */
  selectDependentActions: function (segRowsData, dependencies) {
    for (var i = 0; i < segRowsData.length; i++) {
      if (dependencies.includes(segRowsData[i].actionId) &&
        segRowsData[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) {
        segRowsData[i].imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
      }
      /*for(var j=0;j<dependencies.length;j++){
        if(segData[i].actionId=== dependencies[j].i && 
           segData[i].imgCheckbox.src=== this.AdminConsoleCommonUtils.checkboxnormal){
          segData[i].imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
          segData[i].isSelected = 1;
          this.addRemoveSelectedFeatureAction(segData[i],segData[i].isSelected);
        }
      }   */
    }
    return segRowsData;
  },
  /*
  * unselect the dependent actions of current selected action
  * @param: seg rows data, curr action id
  * @return: updated seg rows data
  */
  deselectDependentActions: function (segRowsData, actionId) {
    for (var i = 0; i < segRowsData.length; i++) {
      var dependencies = segRowsData[i].dependentActions;
      if (dependencies.includes(actionId) &&
        segRowsData[i].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxSelected) {
        segRowsData[i].imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxnormal;
      }
      /*for(var j=0;j<dependencies.length;j++){
        if(actionId===dependencies[j].id && 
           segRowsData[i].imgCheckbox.src===this.AdminConsoleCommonUtils.checkboxSelected){
          segRowsData[i].imgCheckbox.src=this.AdminConsoleCommonUtils.checkboxnormal;
          segRowsData[i].isSelected = 0;
          this.addRemoveSelectedFeatureAction(segRowsData[i], segRowsData[i].isSelected);
        }
      }  */
    }
    return segRowsData;
  },
  /*
  * store the selected account's acc numbers for each action
  */
  storeActionForAccountSelection: function () {
    var self = this;
    var custIdArr = [];
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    /*  //var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
      var editUserDetails = this.presenter.getAccountsFeaturesForEnrollCust(custId);
      var accLevelfeatures = editUserDetails.accountMapFeatures;
      
      accLevelfeatures.forEach(function(account,accKey){
        if(account.accountDetails.isEnabled === "true" || account.accountDetails.isAssociated === "true"){
          var accFeatures = JSON.parse(account.features);
          for(var j=0; j< accFeatures.length; j++){
            var actions = accFeatures[j].actions || accFeatures[j].permissions;
            for(var i=0; i<actions.length; i++){
              //push enabled actions for that account
              if(actions[i].isEnabled === "true"){
                self.addAccountIdForAction(actions[i].actionId,(accKey+""));
              } else if(actions[i].isEnabled === "false"){
                self.removeAccountIdForAction(actions[i].actionId,(accKey+""),1);*/
    //fetch all users in case of edit to intialize account actions
    custIdArr.push(custId);
    for (var p = 0; p < custIdArr.length; p++) {
      var editUserDetails = this.presenter.getAccountsFeaturesForEnrollCust(custIdArr[p]);
      var accLevelfeatures = editUserDetails.accountMapFeatures;
      accLevelfeatures.forEach(function (account, accKey) {
        if (account.accountDetails.isEnabled === "true" || account.accountDetails.isAssociated === "true") {
          var accFeatures = JSON.parse(account.features);
          for (var j = 0; j < accFeatures.length; j++) {
            var actions = accFeatures[j].actions || accFeatures[j].permissions;
            for (var i = 0; i < actions.length; i++) {
              //push enabled actions for that account
              if (actions[i].isEnabled === "true") {
                self.addAccountIdForAction(actions[i].actionId, (accKey + ""), custIdArr[p]);
              } else if (actions[i].isEnabled === "false") {
                self.removeAccountIdForAction(actions[i].actionId, (accKey + ""), 1, custIdArr[p]);
              }
            }
          }
          /*  }
          }  //remove acc num from all accounts when account is removed 
          else if(account.accountDetails.isEnabled === "false" || account.accountDetails.isAssociated === "false"){
            self.removeAccountIdForAction(null,(accKey+""),2);
          } 
        });*/
        }  //remove acc num from all accounts when account is removed 
        else if (account.accountDetails.isEnabled === "false" || account.accountDetails.isAssociated === "false") {
          self.removeAccountIdForAction(null, (accKey + ""), 2, custIdArr[p]);
        }
      });
    }
  },
  /*
  * remove the accounts for particular action from actionsAccountJSON
  * @param: action id, account id to remove,option(1/2)
  */
  removeAccountIdForAction : function(actionId,accountId,option,customerId){
    var custId = customerId ? customerId :this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var filterAcc;
    if(option ===1){ //remove the account number for given action id
      var associatedAccounts = this.actionsAccountJSON[custId][actionId];
      filterAcc = associatedAccounts.filter(function(accId) { return accId !== accountId; });
      this.actionsAccountJSON[custId][actionId] = filterAcc;
    } else if(option ===2){ //remove the account number for all actions available
      var actionsArr = Object.keys(this.actionsAccountJSON[custId]);
      var accountsArr = Object.values(this.actionsAccountJSON[custId]);
      for(var i=0; i<accountsArr.length; i++){
        filterAcc = accountsArr[i].filter(function(accId) { return accId !== accountId; });
        this.actionsAccountJSON[custId][actionsArr[i]] = filterAcc;
      }
    }
  },
  /*
  * add the account for particular action from actionsAccountJSON
  * @param: action id, account id to add,customeriid(optional)
  */
  addAccountIdForAction : function(actionId,accountId,customerId){
    var custId = customerId ? customerId : this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var associatedAccounts = this.actionsAccountJSON[custId][actionId];
    if(associatedAccounts && associatedAccounts.indexOf(accountId) < 0){
      associatedAccounts.push(accountId);
    }
  },
  /*
  * filter particular feature from array of features
  */
  getFeatureObjFromArray : function(featureId, featuresArr){
    var featureObj = featuresArr.filter(function(feature) { return feature.featureId === featureId; });
    return (featureObj.length > 0 ? featureObj[0] : null);
  },
  /*
  * update the selection values for customer level features on checkbox clicks
  * @param: segment widget path, eventobj
  */
  updateCustFeaturesSelectionEditUser : function(segmentWidPath, event){
    var self = this;
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var featureData = segmentWidPath.data[event.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[event.rowContext.sectionIndex][1];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var currUserFeaturesMap = new Map(editUserObj.accountMapFeatures);
    var count = 0;
    currUserFeaturesMap.forEach(function(accountObj,accKey){ 
      var features = JSON.parse(accountObj.features);
      var selFeature = self.getFeatureObjFromArray(featureData.id, features);
      var selFeatureActions = selFeature.actions || selFeature.permissions;
      for(var i=0; i< selFeatureActions.length; i++){
        for(var j=0; j<actionsSegData.length; j++){
          //compare with segment action ,action from list and update data
          if(selFeatureActions[i].actionId === actionsSegData[j].id){
            if(actionsSegData[i].lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl){
              selFeatureActions[i].isEnabled = "true";
              count = count+1;
              self.addAccountIdForAction(selFeatureActions[i].actionId, (accKey+""));
            }else{
              selFeatureActions[i].isEnabled = "false";
              self.removeAccountIdForAction(selFeatureActions[i].actionId, (accKey+""),1);
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
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * update the selection values for account level features on checkbox clicks
  * @param: segment widget path, eventobj
  */
  updateAccFeaturesSelectionEditUser : function(segmentWidPath, event){
    var self = this;
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var featureData = segmentWidPath.data[event.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[event.rowContext.sectionIndex][1];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);

    var count = 0;
    var accountCardComponent = this.view[segmentWidPath.info.parentId];
    var currAccountNum = accountCardComponent.info ? accountCardComponent.info.accDetails.accountNumber : "";
    var currAccountObj = editUserObj.accountMapFeatures.get(currAccountNum); 
    var features = JSON.parse(currAccountObj.features);
    var selFeature = self.getFeatureObjFromArray(featureData.id, features);
    var selFeatureActions = selFeature.actions || selFeature.permissions;
    for(var i=0; i< selFeatureActions.length; i++){
      for(var j=0; j<actionsSegData.length; j++){
        //compare with segment action ,action from list and update data
        if(selFeatureActions[i].actionId === actionsSegData[j].id){
          if(actionsSegData[i].lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl){
            selFeatureActions[i].isEnabled = "true";
            count = count+1;
            self.addAccountIdForAction(selFeatureActions[i].actionId, (currAccountNum+""));
          }else{
            selFeatureActions[i].isEnabled = "false";
            self.removeAccountIdForAction(selFeatureActions[i].actionId, (currAccountNum+""),1);
          }
          break;
        }
      }
    }
    selFeature.isEnabled = count === 0 ? "false" : "true";
    currAccountObj.features = JSON.stringify(features);
    editUserObj.accountMapFeatures.set(currAccountNum, currAccountObj);
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * update the selection values for other features on checkbox clicks
  * @param: segment widget path, eventobj
  */
  updateOtherFeaturesSelectionEditUser : function(segmentWidPath, event){
    var self = this;
    var custId = this.view.customersDropdownOF.lblSelectedValue.info.customerId;
    var featureData = segmentWidPath.data[event.rowContext.sectionIndex][0];
    var actionsSegData = segmentWidPath.data[event.rowContext.sectionIndex][1];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var currUserOtherFeatures = editUserObj.nonAccLevelFeatures;
    var count = 0;
    var selFeature = self.getFeatureObjFromArray(featureData.id, currUserOtherFeatures);
    var selFeatureActions = selFeature.actions || selFeature.permissions;
    for(var i=0; i<selFeatureActions.length; i++){
      for(var j=0; j<actionsSegData.length; j++){
        //compare with segment action ,action from list and update data
        if(selFeatureActions[i].actionId === actionsSegData[j].id){
          if(actionsSegData[i].lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl){
            selFeatureActions[i].isEnabled = "true";
            count = count+1;
          }else{
            selFeatureActions[i].isEnabled = "false";
          }
          break;
        }
      }
    }
    selFeature.isEnabled = count === 0 ? "false" : "true";
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * update all feature/actions on click of select all option at customer level
  */
  updateCustAllFeaturesSelectionEdit : function(){
    var self =this;
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var featureCardComponent = this.view.enrollEditFeaturesCard;
    var currUserFeaturesMap = new Map(editUserObj.accountMapFeatures);
    currUserFeaturesMap.forEach(function(accountObj,accKey){ 
      var features = JSON.parse(accountObj.features);
      for(var i=0; i<features.length; i++){
        features[i].isEnabled = featureCardComponent.lblSectionCheckbox.text === self.AdminConsoleCommonUtils.checkboxnormallbl ? "false":"true";
        var currActions = features[i].actions || features[i].permissions;
        for(var j=0;j<currActions.length; j++){
          if(featureCardComponent.lblSectionCheckbox.text === self.AdminConsoleCommonUtils.checkboxnormallbl){
            currActions[j].isEnabled = "false";
            self.removeAccountIdForAction(currActions[j].actionId, (accKey+""), 1);
          } else{
            currActions[j].isEnabled = "true";
            self.addAccountIdForAction(currActions[j].actionId, (accKey+""));
          }

        }
      }
      accountObj.features = JSON.stringify(features);
      currUserFeaturesMap.set(accKey,accountObj);
    });
    editUserObj.accountMapFeatures = currUserFeaturesMap;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * update all feature/actions on click of select all option at account level
  * @param: segment widget path
  */
  updateAccAllFeaturesSelectionEdit : function(segmentWidPath){
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var accountCardComponent = this.view[segmentWidPath.info.parentId];
    var currAccountNum = accountCardComponent.info ? accountCardComponent.info.accDetails.accountNumber : "";
    var currAccountObj = editUserObj.accountMapFeatures.get(currAccountNum); 
    var features = JSON.parse(currAccountObj.features);
    for(var i=0; i<features.length; i++){
      features[i].isEnabled = accountCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? "false": "true";
      var currActions = features[i].actions || features[i].permissions;
      for(var j=0;j<currActions.length; j++){
        if( accountCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
          currActions[j].isEnabled = "false";
          this.removeAccountIdForAction(currActions[j].actionId, currAccountNum, 1);
        } else{
          currActions[j].isEnabled = "true";
          this.addAccountIdForAction(currActions[j].actionId, currAccountNum);
        }
        
      }
    }
    currAccountObj.features = JSON.stringify(features);
    editUserObj.accountMapFeatures.set(currAccountNum, currAccountObj);
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * update all feature/actions on click of select all option for other features
  */
  updateOtherAllFeaturesSelectionEdit : function(){
    var custId = this.view.customersDropdownOF.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var featureCardComponent = this.view.enrollEditOtherFeaturesCard;
    var features = editUserObj.nonAccLevelFeatures;
    for(var i=0; i<features.length; i++){
      features[i].isEnabled = featureCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? "false":"true"; 
      var currActions = features[i].actions || features[i].permissions;
      for(var j=0;j<currActions.length; j++){
        currActions[j].isEnabled = featureCardComponent.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ? "false": "true";
      }
    }
    editUserObj.nonAccLevelFeatures = features;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * update the accouont level limits values when changes in textbox
  * @param: segment widget path, event object
  */
  updateAccLimitsValueEditUser : function(segmentWidPath,eventObj){
    var self = this;
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var selectedCardId = segmentWidPath.info ? segmentWidPath.info.parentId : "";
    var selAccDetails = selectedCardId !== "" ? this.view[selectedCardId].info.accDetails : "";
    var featureData = segmentWidPath.data[eventObj.rowContext.sectionIndex][0];
    var actionsData = segmentWidPath.data[eventObj.rowContext.sectionIndex][1][eventObj.rowContext.rowIndex] || [];
    var actionsSegData = [actionsData];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var currUserLimitsMap = new Map(editUserObj.accLevelLimits);
    var currLimitTextbox = eventObj.info ? eventObj.info.name : "";
    
    for(let accountObj of currUserLimitsMap.values()){ 
      var currAccId = (accountObj.accountDetails.accountNumber || accountObj.accountDetails.accountId) || "";
      var selAccId = selAccDetails !== "" ? (selAccDetails.accountNumber || selAccDetails.accountId) : "";
      if(currAccId === selAccId){
        var limits = JSON.parse(accountObj.limits);
        var selFeature = self.getFeatureObjFromArray(featureData.id, limits);
        for(var i=0; i< selFeature.actions.length; i++){
          for(var j=0; j<actionsSegData.length; j++){
            //compare with segment action ,action from list and update limit value
            if(selFeature.actions[i].actionId === actionsSegData[j].id){
              if(selFeature.actions[i].limits && currLimitTextbox){
                selFeature.actions[i].limits[currLimitTextbox] = eventObj.text;
              }
              break;
            }
          }
        }
        accountObj.limits = JSON.stringify(limits);
        currUserLimitsMap.set(currAccId,accountObj);
        break;
      }
    }
    editUserObj.accLevelLimits = currUserLimitsMap;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
    //hide inline errors if any
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
      this.view.forceLayout();
    }
  },
  /*
  * update the limit group edit values in edit user obj
  * @param: flx prefix id, row id
  */
  updateCustLimitGroupValueEditUser : function(flxId, rowId, eventObj){
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var limitGroup = editUserObj.limitGroups;
    for(var i=0;i<limitGroup.length;i++){
      if(limitGroup[i].limitGroupId === eventObj.info.id){
        for(var j=0; j<limitGroup[i].limits.length; j++){
          if(limitGroup[i].limits[j].id === eventObj.info.type)
            limitGroup[i].limits[j].value = parseFloat(eventObj.text);
        }
      }
    }
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  /*
  * validate limit group values for all the customers
  */
  validateLimitGroupEditUser : function(custId){
    var errorCustId =[];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var limitGroups = editUserObj.limitGroups;
    var limitValidationObj = {};
    limitValidationObj[custId] = {};
    for(var i=0;i <limitGroups.length; i++){
      if(limitGroups[i].limitGroupId &&  limitGroups[i].limitGroupId !=="N/A" &&
         limitGroups[i].limitGroupId !== "ACCOUNT_TO_ACCOUNT"){
        var errorJson = this.validateLimitGroupValuesEditUserObj(limitGroups[i]);
        limitValidationObj[custId][limitGroups[i].limitGroupId] = errorJson.error;
        //save the cust id with error
        if(errorJson.isValid === false && errorCustId.indexOf(custId) < 0){
          errorCustId.push(custId);
        }
      }
    }
    this.limitGroupsValidationObject = limitValidationObj;
    var allLimitsValid = errorCustId.length > 0 ? false : true;

    return allLimitsValid;
  },
  /*
  * validate values for each limit group and create error obj
  * @param: limit group
  * @return :error obj
  */
  validateLimitGroupValuesEditUserObj: function (limitGroup) {
    var errorObj = {}, isValid = true, maxValCount = 0, skipValidation = false;
    var limits = limitGroup.limits;
    var limitGroupObj = {};
    for (var i = 0; i < limits.length; i++) {
      limitGroupObj[limits[i].id] = { "value": limits[i].value ? limits[i].value + "" : "0" };
      if (parseInt(limits[i].maxValue) === 0) {
        maxValCount = maxValCount + 1;
      }
      if (parseFloat(limits[i].value) > parseFloat(limits[i].maxValue)) {
        errorObj[limits[i].id] = {
          "error": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeGreaterThanMaxValue"),
          "id": limits[i].id
        };
        isValid = false;
      } else if (limits[i].value === "") {
        errorObj[limits[i].id] = {
          "error": kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty"),
          "id": limits[i].id
        };
        isValid = false;
      } else if (limits[i].value < 0) {
        errorObj[limits[i].id] = {
          "error": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueCannotBeNegative"),
          "id": limits[i].id
        };
        isValid = false;
      }
    }
    //to skip validations when acc level limits are not avaible
    if (maxValCount === 3) {
      skipValidation = true;
      isValid = true;
      errorObj = {};
    }
    //inter limitgroup values validations
    var transLimitVal = limitGroupObj[this.limitId.MAX_TRANSACTION_LIMIT] ? limitGroupObj[this.limitId.MAX_TRANSACTION_LIMIT].value : "0";
    var dailyLimitVal = limitGroupObj[this.limitId.DAILY_LIMIT] ? limitGroupObj[this.limitId.DAILY_LIMIT].value : "0";
    var weeklyLimitVal = limitGroupObj[this.limitId.WEEKLY_LIMIT] ? limitGroupObj[this.limitId.WEEKLY_LIMIT].value : "0";
    if (isValid === true && skipValidation === false) { //check for validation within limits
      if (parseFloat(transLimitVal) > parseFloat(dailyLimitVal)) {
        errorObj[this.limitId.MAX_TRANSACTION_LIMIT] = {
          "error": kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit"),
          "id": this.limitId.MAX_TRANSACTION_LIMIT
        };
        isValid = false;
      }
      if(parseFloat(dailyLimitVal) > parseFloat(weeklyLimitVal)){
        errorObj[this.limitId.DAILY_LIMIT] = {"error": kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit"),
                                              "id":this.limitId.DAILY_LIMIT};
        isValid = false;
        //validate per trans limit with weekly
        if(parseFloat(transLimitVal) > parseFloat(weeklyLimitVal) && (parseFloat(transLimitVal) <= parseFloat(dailyLimitVal))){
          errorObj[this.limitId.MAX_TRANSACTION_LIMIT] = {"error": kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit"),
                                                          "id":this.limitId.MAX_TRANSACTION_LIMIT};
        }
      }
    }
    return {"error":errorObj, "isValid":isValid};
  },
  /*
  * set inline errors for validated limit groups
  * @param: customer id
  */
  setErrorLimitGroupEditUser : function(custId){
    var currCustErrorObj = this.limitGroupsValidationObject[custId];
    var childFlex = this.view.enrollEditLimitsCard.flxDynamicWidgetsContainer.widgets();
    
    for(var i=0; i<childFlex.length; i++){
      var id = childFlex[i].id.substr(0,2);
      var limitGroupId = this.view.enrollEditLimitsCard[id+"tbxLimitValue1"].info.id;
      var typeIdArr = Object.keys(currCustErrorObj[limitGroupId]);
      for(var j=0; j<typeIdArr.length; j++){
        if(typeIdArr[j] === this.limitId.MAX_TRANSACTION_LIMIT){
          this.view.enrollEditLimitsCard[id+"flxRangeCont1"].setVisibility(false);
          this.view.enrollEditLimitsCard[id+"flxLimitError1"].setVisibility(true);
          this.view.enrollEditLimitsCard[id+"lblLimitErrorMsg1"].text = currCustErrorObj[limitGroupId][typeIdArr[j]].error;
          this.view.enrollEditLimitsCard[id+"flxLimitValue1"].skin = "sknFlxCalendarError";                                                                                           
        }else if(typeIdArr[j] === this.limitId.DAILY_LIMIT){
          this.view.enrollEditLimitsCard[id+"flxRangeCont2"].setVisibility(false);
          this.view.enrollEditLimitsCard[id+"flxLimitError2"].setVisibility(true);
          this.view.enrollEditLimitsCard[id+"lblLimitErrorMsg2"].text = currCustErrorObj[limitGroupId][typeIdArr[j]].error;
          this.view.enrollEditLimitsCard[id+"flxLimitValue2"].skin = "sknFlxCalendarError";     
        }else if(typeIdArr[j] === this.limitId.WEEKLY_LIMIT){
          this.view.enrollEditLimitsCard[id+"flxRangeCont3"].setVisibility(false);
          this.view.enrollEditLimitsCard[id+"flxLimitError3"].setVisibility(true);
          this.view.enrollEditLimitsCard[id+"lblLimitErrorMsg3"].text = currCustErrorObj[limitGroupId][typeIdArr[j]].error;
          this.view.enrollEditLimitsCard[id+"flxLimitValue3"].skin = "sknFlxCalendarError";     
        }
      }
    }
    this.view.forceLayout();
  },
  /*
  * validate if atleast one account is selected for every customer
  */
  validateAccountsSelection: function () {
    var editUserObj, isValid = true, count = 0;
    var limitsDropdown = []
    if (this.enrollAction === this.actionConfig.editUser || this.enrollAction === this.actionConfig.editSingleUser) {
      limitsDropdown = this.view.customersDropdownLimits.segList.data;
    } else if (this.enrollAction === this.actionConfig.edit) {
      var custdetails = this.view.customersDropdownLimits.lblSelectedValue.info.customerDetails;
      limitsDropdown = [{
        "id": this.view.customersDropdownLimits.lblSelectedValue.info.customerId,
        "lblCustomerName": { "text": custdetails.contractName || custdetails.companyName }
      }];
    }
    if (this.enrollAction === this.actionConfig.editUser || this.enrollAction === this.actionConfig.edit || this.enrollAction === this.actionConfig.editSingleUser) {
      for (var i = 0; i < limitsDropdown.length; i++) {
        editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(limitsDropdown[i].id);
        var accListMap = editUserObj.accounts;
        count = 0;
        accListMap.forEach(function (accObj, key) {
          if (accObj.isEnabled === "false") {
            count = count + 1;
          }
        });
        isValid = accListMap.size === count ? false : true;
        if (!isValid) {
          var toatMsg = "No accounts selected for customer " + limitsDropdown[i].lblCustomerName.text;
          this.view.toastMessage.showErrorToastMessage(toatMsg, this);
          break;
        }
      }
    }
    return isValid;
  },
  /*
  * validate limit and limit groups on click of save/update in edit user
  */
  validateAllLimitsEditUser: function () {
    var custArr = [], isValid = true, updateLimitGroupMaxValues = [], editUserObj;
    kony.adminConsole.utils.showProgressBar(this.view);
    var isAccValid = this.validateAccountsSelection();
    var dropdownSelectedCust = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    if (isAccValid) {
      //get all the customer id's available and update limit group max values
      if (this.enrollAction === this.actionConfig.editUser || this.enrollAction === this.actionConfig.editSingleUser) {
        var limitsDropdown = this.view.customersDropdownLimits.segList.data;
        for (var i = 0; i < limitsDropdown.length; i++) {
          editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(limitsDropdown[i].id);
          updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures, editUserObj.accLevelLimits, false, editUserObj.limitGroups);
          editUserObj.limitGroups = updateLimitGroupMaxValues;
          this.presenter.setAccountsFeaturesForEnrollCust(limitsDropdown[i].id, editUserObj);
          custArr.push(limitsDropdown[i].id);
        }
      } else {
        editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(dropdownSelectedCust);
        updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures, editUserObj.accLevelLimits, false, editUserObj.limitGroups);
        editUserObj.limitGroups = updateLimitGroupMaxValues;
        this.presenter.setAccountsFeaturesForEnrollCust(dropdownSelectedCust, editUserObj);
        custArr.push(dropdownSelectedCust);
      }
      //validate for each customer id
      for (var j = 0; j < custArr.length; j++) {
        var isLimitGroupValid = this.validateLimitGroupEditUser(custArr[j]);
        var isLimitValid = this.validateAccLimitEditUser(custArr[j]);
        if (isLimitGroupValid === false) { //customer tab in limits
          if (this.enrollAction === this.actionConfig.editUser || this.enrollAction === this.actionConfig.editSingleUser) {  //update the customer selected in dropdown
            this.setSelectedTextFromDropdownEditUser(this.view.customersDropdownLimits, custArr[j], 4);
          }
          //show the limits screen and respective tab
          if (this.view.flxEnrollEditLimitsContainer.isVisible === false) {
            this.showEditLimitsScreen(1);
          } else {
            this.toggleLimitsCustomerLevel();
          }
          this.setErrorLimitGroupEditUser(custArr[j]);
          isValid = false;
          break;
        } else if (isLimitValid === false) { //accounts tab in limits
          if (this.enrollAction === this.actionConfig.editUser || this.enrollAction === this.actionConfig.editSingleUser) { //update the customer selected in dropdown
            this.setSelectedTextFromDropdownEditUser(this.view.customersDropdownLimits, custArr[j], 4);
          }
          //show the limits screen and respective tab
          if (this.view.flxEnrollEditLimitsContainer.isVisible === false) {
            this.showEditLimitsScreen(2);
          } else {
            this.toggleLimitsAccountLevel();
          }
          //this.setErrorForLimitValuesAfterValidation(custArr[j]);
          isValid = false;
          break;
        }
      }
      kony.adminConsole.utils.hideProgressBar(this.view);
      return isValid;
    } else {
      kony.adminConsole.utils.hideProgressBar(this.view);
      return false;
    }
  },
  /*
  * show error flag message in limits tab edit user
  */
  showErrorFlagInLimitsEditUser : function(showError){
    if(showError === true){
      this.view.flxLimitErrorEditUser.setVisibility(true);
      this.view.flxEnrollEditLimitsTopCont.top = "40dp";
    } else{
      this.view.flxLimitErrorEditUser.setVisibility(false);
      this.view.flxEnrollEditLimitsTopCont.top = "0dp";
    }
    this.view.forceLayout();
  },
  /*
  * validate and store the error for limits values for all the customer accounts
  * @param: selected customerId
  * @return : action limits valid -true/false
  */
  validateAccLimitEditUser: function (custId) {
    var self = this;
    var limitsValidation = {}, errorCustIdArr = [], enabledMonActionId = [];
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var currUserLimitsMap = editUserObj.accLevelLimits;
    limitsValidation[custId] = {};
    currUserLimitsMap.forEach(function (accountObj, key) {
      limitsValidation[custId][key] = {};
      if (accountObj.accountDetails.isEnabled === "true" || accountObj.accountDetails.isAssociated === "true") {
        enabledMonActionId = self.checkIfAccountLimitsAvailable(custId, 2, key);
        var featuresLimit = JSON.parse(accountObj.limits);
        for (var i = 0; i < featuresLimit.length; i++) {
          var currActions = featuresLimit[i].actions || featuresLimit[i].permissions;
          for (var j = 0; j < currActions.length; j++) {
            var currActionId = currActions[j].id || currActions[j].actionId;
            //validate only if that feature limit is enabled
            if (enabledMonActionId.indexOf(currActionId) >= 0) {
              var errorObj = self.validateAccLimitValuesEditUserObj(currActions[j].limits);
              if(errorObj.error && Object.keys(errorObj.error).length > 0)
                limitsValidation[custId][key][currActionId] = errorObj.error;
              //save custId is invalid
              if (errorObj.isValid === false && errorCustIdArr.indexOf(custId) < 0) {
                errorCustIdArr.push(custId);
              }
            }
          }
        }
      }
    });
    this.limitsValidationObject = limitsValidation;
    var allActionsValid = errorCustIdArr.length > 0 ? false : true;
    return allActionsValid;
  },
  /*
  *validate the limit values for the limit object
  * @param: limit object
  */
  validateAccLimitValuesEditUserObj : function(limitObj){
    var errorObj = {}, isValid = true;;
    var negativeErrorText=kony.i18n.getLocalizedString("i8n.frmCreateCustomerController.warning.value_cannot_negative");
    var emptyValueText= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
    var transLimit = (limitObj[this.limitId.MAX_TRANSACTION_LIMIT] + "") || "";
    var transDenyLimit = (limitObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] + "")  || "";
    var transApprLimit = (limitObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] + "")  || "";
    var dailyLimit = (limitObj[this.limitId.DAILY_LIMIT] + "")  || "";
    var dailyDenyLimit = (limitObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] + "")  || "";
    var dailyApprLimit = (limitObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] + "")  || "";
    var weeklyLimit = (limitObj[this.limitId.WEEKLY_LIMIT] + "")  || "";
    var weeklyDenyLimit = (limitObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT] + "") || "";
    var weeklyApprLimit = (limitObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] + "")  || "";
    // cunvert currency format to float
    var max_trans_limit=parseFloat((transLimit+"").replace(/[^0-9.-]+/g,"")); 
    var max_daily_limit=parseFloat((dailyLimit+"").replace(/[^0-9.-]+/g,"")); 
    var max_weekly_limit=parseFloat((weeklyLimit+"").replace(/[^0-9.-]+/g,""));
    
    //per transaction - auto deny
    var perTranAD ={};
    if(transDenyLimit === "" || parseFloat(transDenyLimit)<0){
      perTranAD.error = transDenyLimit ===""? emptyValueText : negativeErrorText;
      isValid=false;
      perTranAD.typeId = this.limitId.AUTO_DENIED_TRANSACTION_LIMIT;
      errorObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = perTranAD;
    }
    else if(parseFloat(transDenyLimit)> max_trans_limit){
      perTranAD.typeId = this.limitId.AUTO_DENIED_TRANSACTION_LIMIT;
      perTranAD.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanTransLimit");
      isValid = false;
      errorObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = perTranAD;
    } else if(parseFloat(transDenyLimit) > parseFloat(dailyDenyLimit)){
      perTranAD.typeId = this.limitId.AUTO_DENIED_TRANSACTION_LIMIT;
      perTranAD.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADDLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_TRANSACTION_LIMIT] = perTranAD;
    }
    
    //per transaction - pre approved
    var perTranPA ={};
    if(transApprLimit === "" || parseFloat(transApprLimit)<0){
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      perTranPA.error = transApprLimit ===""? emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    }
    else if(parseFloat(transApprLimit)> max_trans_limit){
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      perTranPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanTransLimit");
      isValid = false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    } else if(parseFloat(transApprLimit) > parseFloat(transDenyLimit)){
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      perTranPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADTLimit");
      isValid = false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    }
    else if(parseFloat(transApprLimit) > parseFloat(dailyApprLimit)){
      perTranPA.error =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanPADLimit");
      perTranPA.typeId = this.limitId.PRE_APPROVED_TRANSACTION_LIMIT;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_TRANSACTION_LIMIT] = perTranPA;
    } 
    
     //daily - auto deny
    var dailyAD = {};
    if(dailyDenyLimit ==="" || parseFloat(dailyDenyLimit)<0){
      dailyAD.typeId = this.limitId.AUTO_DENIED_DAILY_LIMIT;
      dailyAD.error = dailyDenyLimit ===""?emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] = dailyAD;
    }else if(parseFloat(dailyDenyLimit)>max_daily_limit){
      dailyAD.typeId = this.limitId.AUTO_DENIED_DAILY_LIMIT;
      dailyAD.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] = dailyAD;
    }else if(parseFloat(dailyDenyLimit) > parseFloat(weeklyDenyLimit)){
      dailyAD.typeId = this.limitId.AUTO_DENIED_DAILY_LIMIT;
      dailyAD.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADWLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_DAILY_LIMIT] = dailyAD;
    }

    //daily - pre approved
    var dailyPA = {};
    if(dailyApprLimit ==="" || parseFloat(dailyApprLimit)<0){
      dailyPA.error = dailyApprLimit ==="" ? emptyValueText : negativeErrorText;
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    }else if(parseFloat(dailyApprLimit) > max_daily_limit){
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      dailyPA.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    } else if(parseFloat(dailyApprLimit) > parseFloat(dailyDenyLimit)){
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      dailyPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADDLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    } else if(parseFloat(dailyApprLimit) > parseFloat(weeklyApprLimit)){
      dailyPA.typeId = this.limitId.PRE_APPROVED_DAILY_LIMIT;
      dailyPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanPAWLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_DAILY_LIMIT] = dailyPA;
    }
    
    //weekly- auto deny
    var weeklyAD = {};
    if(weeklyDenyLimit ==="" || parseFloat(weeklyDenyLimit)<0){
      weeklyAD.typeId = this.limitId.AUTO_DENIED_WEEKLY_LIMIT;
      weeklyAD.error = weeklyDenyLimit==="" ? emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT] = weeklyAD;
    }else if(parseFloat(weeklyDenyLimit)>max_weekly_limit){
      weeklyAD.typeId = this.limitId.AUTO_DENIED_WEEKLY_LIMIT;
      weeklyAD.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
      isValid=false;
      errorObj[this.limitId.AUTO_DENIED_WEEKLY_LIMIT] = weeklyAD;
    }
    
    //weekly- pre approved
    var weeklyPA = {};
    if(weeklyApprLimit ==="" || parseFloat(weeklyApprLimit)<0){
      weeklyPA.typeId = this.limitId.PRE_APPROVED_WEEKLY_LIMIT;
      weeklyPA.error = weeklyApprLimit ==="" ? emptyValueText : negativeErrorText;
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = weeklyPA;
    }else if(parseFloat(weeklyApprLimit)>max_weekly_limit){
      weeklyPA.typeId = this.limitId.PRE_APPROVED_WEEKLY_LIMIT;
      weeklyPA.error = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = weeklyPA;
    }else if(parseFloat(weeklyApprLimit) > parseFloat(weeklyDenyLimit)){
      weeklyPA.typeId = this.limitId.PRE_APPROVED_WEEKLY_LIMIT;
      weeklyPA.error = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ValueLessThanADWLimit");
      isValid=false;
      errorObj[this.limitId.PRE_APPROVED_WEEKLY_LIMIT] = weeklyPA;
    }
    return {"error":errorObj,"isValid":isValid};
  },
  /*
  * set inline error for segment rows with limit errors
  * @param: customer id
  */
  setErrorForLimitValuesAfterValidation: function (custId) {
    var isValid = true;
    var limitErrorForCust = this.limitsValidationObject[custId];
    var accountFlx = this.view.flxEnrollEditAccLimitsList.widgets();
    for (var i = 0; i < accountFlx.length; i++) {
      isValid = true;
      var accfeatures = limitErrorForCust[accountFlx[i].info.accDetails.accountNumber];
      if(accfeatures && Object.keys(accfeatures).length > 0){
        var segData = accountFlx[i].segAccountFeatures.data;
        for (var j = 0; j < segData.length; j++) {
          var errorActionsId = Object.keys(accfeatures);
          for (var a = 0; a < segData[j][1].length; a++) {
            var updatedRowJson;
            var actionHasError = accfeatures[segData[j][1][a].id] && Object.keys(accfeatures[segData[j][1][a].id]).length > 0 ? true : false;
            if (errorActionsId.indexOf(segData[j][1][a].id) >= 0 && actionHasError === true) {
              updatedRowJson = this.updatedRowWithErrorCheck(segData[j][1][a], accfeatures);
              segData[j][1][a] = updatedRowJson;

              isValid = false;
            }
          }
          //show expand section arrow for error
          if (actionHasError) {
            segData[j][0].lblIconToggleArrow.text = "\ue915";
            segData[j][0].lblIconToggleArrow.skin = "sknfontIconDescDownArrow12px";
            if (j < (segData.length - 1)) {
              segData[j + 1][0].lblTopSeperator.isVisible = true;
            }
            accountFlx[i].segAccountFeatures.setSectionAt(segData[j],j);
          }
        }
       // accountFlx[i].toggleCollapseArrow(!isValid);
        //accountFlx[i].segAccountFeatures.setData(segData);
      }
    }
    this.view.forceLayout();
  },
  /*
  * update the segment row widget to show error for actions
  * @param: row data json, error object
  */
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
  /*
  * show popup forr reset limits
  * @param: option(customer level:1,acc level:2), cardwidget Path
  */
  showResetLimitsEditUserPopup : function(option,cardWidgetPath){
    var self = this;
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.ResetLimits");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AreYouSureToResetLimits");
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    this.view.flxEnrollCustConfirmationPopup.setVisibility(true);
    
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      if(option === 1){ //cust level
        self.resetLimitGroupValuesEditUser();
      }else{ //account level
        self.resetLimitValuesEditUser(cardWidgetPath);
      }
      self.view.flxEnrollCustConfirmationPopup.setVisibility(false);
    };
  },
  /*
  * reset the limit values under an account
  * selected card widget path
  */
  resetLimitValuesEditUser: function (cardWidgetPath) {
    var self = this;
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var accountDetails = cardWidgetPath.info.accDetails;
    var currUserLimitsMap = editUserObj.accLevelLimits;
    var accNum = accountDetails.accountNumber || accountDetails.accountId;
    var currAccObj = currUserLimitsMap.get(accNum);
    var featureLimits = JSON.parse(currAccObj.limits);
    //update the actual limits in edit object
    for (var i = 0; i < featureLimits.length; i++) {
      for (var j = 0; j < featureLimits[i].actions.length; j++) {
        if (featureLimits[i].actions[j].limits) {
          //if(this.enrollAction !== this.actionConfig.editUser){
          if (featureLimits[i].actions[j].actualLimits.length <= 3) {
            featureLimits[i].actions[j].limits = this.addNewLimitsToExistingLimits(featureLimits[i].actions[j].actualLimits);
          } else if (featureLimits[i].actions[j].actualLimits.length >= 9) {
            featureLimits[i].actions[j].limits = this.getLimitValuesJsonFromArray(featureLimits[i].actions[j].actualLimits);
          }
        }
      }
    }
    currAccObj.limits = JSON.stringify(featureLimits);
    currUserLimitsMap.set(accNum, currAccObj);
    if(this.limitsValidationObject[custId])
      this.limitsValidationObject[custId][accNum] ={};
    this.presenter.setAccountsFeaturesForEnrollCust(custId, editUserObj);
    //update the limit values in segment
    this.setLimitsAtAccountLevel(cardWidgetPath.segAccountFeatures, featureLimits, custId, 2);
  },
  /*
  * reset the limit groups values of customer
  */
  resetLimitGroupValuesEditUser : function(){
    var self = this;
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var updateLimitGroupMaxValues = this.caluclateTransactionLimitGroupValue(editUserObj.accountMapFeatures,editUserObj.accLevelLimits,false,editUserObj.limitGroups); 
    //update the values in edit obj
    for(var i=0; i<updateLimitGroupMaxValues.length; i++){
      for(var j=0; j<updateLimitGroupMaxValues[i].limits.length; j++){
        updateLimitGroupMaxValues[i].limits[j].value = updateLimitGroupMaxValues[i].limits[j].maxValue+"";
      }
    }
    editUserObj.limitGroups = updateLimitGroupMaxValues;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
    //update the limit values in segment
    this.createLimitsRowsForCustLevel();
  },
  /*
  * show the limit range when focused on a textbox in limits component
  * @param: prefixed widget id,internal row num,option(true/false)
  */
  showHideRange : function(id,rowNum,option){
    this.view.enrollEditLimitsCard[id+"flxLimitError"+rowNum].isVisible = false;
    this.view.enrollEditLimitsCard[id+"flxLimitValue"+rowNum].skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px"; 
    if(option === true){
      this.view.enrollEditLimitsCard[id+"flxRangeCont"+rowNum].isVisible = true;
      this.view.enrollEditLimitsCard[id+"flxLimitValue"+rowNum].skin = "sknFlxBorder117eb0radius3pxbgfff"; //set focus skin
    } else{
      this.view.enrollEditLimitsCard[id+"flxRangeCont"+rowNum].isVisible = false;
      this.view.enrollEditLimitsCard[id+"flxLimitValue"+rowNum].skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    }
    this.view.forceLayout();
  },
  /*
  * show the range tooltip for limits at account level
  */
  showRangeTooltip : function(widget,context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      this.view.flxRangeTooltip.top = (context.pageY -120)+"dp";
      this.view.flxRangeTooltip.left = (context.pageX - 305 -230 -70) +"dp"; //(pageX -leftmenu-verticaltabs- left,right padding)
      if(this.view.flxRangeTooltip.isVisible === false){
        this.view.flxRangeTooltip.setVisibility(true);
        this.view.forceLayout();
      }    
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if(this.view.flxRangeTooltip.isVisible === true)
        this.view.flxRangeTooltip.setVisibility(false);
    }
  },
   /*
  * search at customer level features/other features based on feature,action name
  * @option-(features:1,other features:2)
  */
  searchFeaturesCustomerLevel : function(option){
    var searchWidgetPath,cardWidgetPath;
    if(option === 1){
      searchWidgetPath =this.view.searchEditFeatures;
      cardWidgetPath = this.view.enrollEditFeaturesCard;
    }else{
      searchWidgetPath =this.view.searchEditOtherFeatures;
      cardWidgetPath = this.view.enrollEditOtherFeaturesCard;
    }
    var searchText = searchWidgetPath.tbxSearchBox.text.trim() || "";
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
          if(updateDetailsObj[1][j].lblFeatureName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){       
            filteredRowData.push(updateDetailsObj[1][j]);
          }
        }
        if(filteredRowData.length >0){
          updateDetailsObj[0].lblSectionCheckbox.text = this.getHeaderCheckboxImage(filteredRowData,true, true);
          updateDetailsObj[0].lblSectionCheckbox.skin = this.applyCheckboxSkin(updateDetailsObj[0].lblSectionCheckbox);
          filterData.push([updateDetailsObj[0],filteredRowData]);
          
        }else{ // filter for only feature
          if(updateDetailsObj[0].lblFeatureName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
             updateDetailsObj[1] = this.showHideSegRowFlex(updateDetailsObj[1],false);
             filterData.push(updateDetailsObj);
          }
        }
      }
    } else{
      filterData = Object.values(actualData);
    }
    cardWidgetPath.segAccountFeatures.rowTemplate = "flxContractEnrollFeaturesEditRow";
    cardWidgetPath.segAccountFeatures.setData(filterData);
    cardWidgetPath.lblSectionCheckbox.text = this.getHeaderCheckboxImage(cardWidgetPath.segAccountFeatures.data,false, true);
    cardWidgetPath.lblSectionCheckbox.skin = this.applyCheckboxSkin(cardWidgetPath.lblSectionCheckbox);
    //show/hide no results flex
    if(filterData.length > 0){
      cardWidgetPath.lblCount.text = this.getSelectedItemsCount(filterData, false);
      cardWidgetPath.lblTotalCount.text = "of "+ this.getTwoDigitNumber(filterData.length);
      cardWidgetPath.flxNoFilterResults.setVisibility(false);
      cardWidgetPath.segAccountFeatures.setVisibility(true);
      cardWidgetPath.flxSelectAllOption.setVisibility(true);
    } else{
      cardWidgetPath.lblCount.text = "0";
      cardWidgetPath.lblTotalCount.text = "of 0";
      cardWidgetPath.segAccountFeatures.setVisibility(false);
      cardWidgetPath.flxSelectAllOption.setVisibility(false);
      cardWidgetPath.flxNoFilterResults.setVisibility(true);
      cardWidgetPath.lblNoFilterResults.skin = "sknLblLato84939E12px";
      cardWidgetPath.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
    }
    this.view.forceLayout();
  },

  clearSearchFields: function () {
    this.view.txtSearchUserId.text = "";
    this.view.flxSegmentAssignUserID.setVisibility(false);
    this.view.flxErrorAssignUserId.setVisibility(false);
    this.view.flxNoResultsFoundAssignUserID.setVisibility(false);
},
  /*
  * search at account level features/limits based on account number
  * @param: option(features:1,limits:2)
  */
  searchFeaturesLimitsAccountLevel: function (option) {
    var count = 0;
    var allAccountCards = (option === 1) ? this.view.flxEnrollEditAccFeaturesList.widgets() : this.view.flxEnrollEditAccLimitsList.widgets();
    var searchText = (option === 1) ? this.view.searchEditFeatures.tbxSearchBox.text.trim() : this.view.searchEditLimits.tbxSearchBox.text.trim();
    var accountsFeatureArray = this.filterFeaturesLimitsBasedOnAccType(option);
    var searchFilteredCard = [];
    if (accountsFeatureArray.length === 0) {
      searchFilteredCard = [];
    } else {
      if (searchText.length > 0) { //filter for search text if any
        for (var q = 0; q < accountsFeatureArray.length; q++) {
          if (accountsFeatureArray[q].accountDetails.accountNumber.indexOf(searchText.toLowerCase()) >= 0) {
            searchFilteredCard.push(accountsFeatureArray[q]);
          }
        }
      } else {
        searchFilteredCard = accountsFeatureArray;
      }
    }

    if (option === 1) { //features tab
      this.view.lblEnrollFeaturesNoFilterResults.skin = "sknLblLato84939E12px";
      if (searchFilteredCard.length === 0) {
        this.searchResultsFeaturesLimits = [];
        this.view.lblEnrollFeaturesNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
        this.view.flxEnrollEditAccFeaturesCont.setVisibility(false);
        this.view.flxEnrollEditNoResultAccFeatures.setVisibility(true);
      } else {
        this.searchResultsFeaturesLimits = searchFilteredCard;
        this.createFeatureCardForAccounts(searchFilteredCard);
        this.view.flxEnrollEditAccFeaturesCont.setVisibility(true);
        this.view.flxEnrollEditNoResultAccFeatures.setVisibility(false);
      }
    } else { //limits tab
      if (searchFilteredCard.length === 0) {
        this.searchResultsFeaturesLimits = [];
        this.view.lblEnrollLimitsNoFilterResults.skin = "sknLblLato84939E12px";
        this.view.lblEnrollLimitsNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
        this.view.flxEnrollEditAccLimitsCont.setVisibility(false);
        this.view.flxEnrollEditNoResultAccLimits.setVisibility(true);
      } else {
        this.searchResultsFeaturesLimits = searchFilteredCard;
        this.createLimitsCardForAccounts(searchFilteredCard);
        this.view.flxEnrollEditAccLimitsCont.setVisibility(true);
        this.view.flxEnrollEditNoResultAccLimits.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  /*
  * show bulk update features/limits popup
  * @param: option for feature/limits - 1/2
  */
  showBulkUpdatePopupEditUser: function(option){
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info ={"option" : option};
    this.enableDisableDropdownUIEditUser(this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate, false);
    this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top = "106dp";
    this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(true);
    this.setAccountsListInBulkUpdatePopup(option);
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.text = "";
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.flxSearchCancel.setVisibility(false);
    this.showBulkUpdatePopupScreen1();
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = { "added": [] };
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.removeAll();
    this.setRadioGroupData(option);
    this.setFeatureLimitsBulkUpdateUI(option);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave,true,true);
  },
  /*
  * show bulk update features/limits accounts selection screen
  */
  showBulkUpdatePopupScreen1 : function(){
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(false);
  },
  /*
  * show bulk update features/limits screen in popup for edit user screen
  */
  /* showBulkUpdatePopupScreen2 : function(){
      var flxChildren;
     if(this.view.flxContractFA.isVisible){
        this.view.lblTitle.setVisibility(false);
       this.view.flxBulkUpdateListContainer.top="0px";
     this.view.lblTitle1.setVisibility(true);
       this.view.lblNothingSelected.setVisibility(false);
       // this.view.flxTagsContainer.setVisibility(false);
       this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
       this.view.flxTagsContainer.setVisibility(true);
       this.view.flxBulkUpdateListContainer.setVisibility(true);
       this.view.flxBulkFANoSelectedCustomer.setVisibility(false);
       this.view.lblIconBulkFAArrow.text = "";
       this.view.flxAddNewRowListCont.setVisibility(true);
       this.view.btnAddNewRow.setVisibility(true);
       this.view.flxTagsContainer.info = { "added": [], "accIds": {} };
       if (this.view.flxTagsContainer.children.length != 0) {
         this.view.btnModifySearch.text = "Modify Selection";
         this.view.lblNothingSelected.setVisibility(false);
       }
       flxChildren = this.view.flxAddNewRowListCont.widgets();
       this.view.flxAddNewRowListCont.removeAll();
       for(var i=0;i<flxChildren.length;i++){
        this.view.remove(this.view[flxChildren[i].id]);
     }
     }else{
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.lblIconArrow.text="";
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(false);
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnSave,true,true);
     flxChildren = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.removeAll();
    for(var i=0;i<flxChildren.length;i++){
      this.view.bulkUpdateFeaturesLimitsPopup.remove(this.view.bulkUpdateFeaturesLimitsPopup[flxChildren[i].id]);
    }
     }
     
    this.view.forceLayout();
     var outerFlex = this.view.flxContractFA.isVisible ? this.view.flxFABulkUpdateScreen : this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
     var parentflex = this.view.flxContractFA.isVisible ? this.view.flxBulkUpdateListContainer : this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer;
     var height = outerFlex.frame.height - (70 + parentflex.frame.y + 80);
     parentflex.height = height + "dp";
     if (this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info.option === 1) {
       this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewPermissions");
       this.bulkUpdateListboxData = this.getListForListBox(1);
       this.addNewFeatureRowBulkUpdate("enroll");
       this.getFeaturesForBulkUpdate(1, "enroll");
     } else {
       this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewLimits");
       this.bulkUpdateListboxData = this.getListForListBox(2);
       this.addNewLimitRowBulkUpdate("enroll");
       this.getFeaturesForBulkUpdate(2, "enroll");
     }
     
   },*/
  showBulkUpdatePopupScreen2: function () {
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.lblIconArrow.text = "";
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(false);
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnSave,true,true);
    var flxChildren = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.removeAll();
    for(var i=0;i<flxChildren.length;i++){
       this.view.remove(this.view[flxChildren[i].id]);
    }
    this.view.forceLayout();
   var outerFlex=this.view.flxContractFA.isVisible?this.view.flxFABulkUpdateScreen:this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var parentflex=this.view.flxContractFA.isVisible?this.view.flxBulkUpdateListContainer:this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer;
    var height = outerFlex.frame.height - (70 + parentflex.frame.y + 80);
    parentflex.height = height + "dp";
    if(this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info.option === 1){
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewPermissions");
      this.bulkUpdateListboxData = this.getListForListBox(1);
      this.addNewFeatureRowBulkUpdate("enroll");
      this.getFeaturesForBulkUpdate(1, "enroll");
    } else{
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewLimits");
      this.bulkUpdateListboxData = this.getListForListBox(2);
      this.addNewLimitRowBulkUpdate("enroll");
      this.getFeaturesForBulkUpdate(2, "enroll");
    }
    
  },
  /*
  * set bulk update popup UI changes based on feature/limit
  * @param: option(features:1,limits:2)
  */
  setFeatureLimitsBulkUpdateUI : function(option){
    if(option === 1){
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.text = this.view.customersDropdownFeatures.lblSelectedValue.text;
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.toolTip = this.view.customersDropdownFeatures.lblSelectedValue.toolTip
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.btnPrimary.isVisible = this.view.customersDropdownFeatures.btnPrimary.isVisible;
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdatePermissionsInBulk");
      this.view.bulkUpdateFeaturesLimitsPopup.lblTitle.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddPermissions");
    }else{
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.text = this.view.customersDropdownLimits.lblSelectedValue.text;
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.toolTip = this.view.customersDropdownLimits.lblSelectedValue.toolTip;
      this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.btnPrimary.isVisible = this.view.customersDropdownLimits.btnPrimary.isVisible;
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text =  kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdateLimitsInBulk");
      this.view.bulkUpdateFeaturesLimitsPopup.lblTitle.text = kony.i18n.getLocalizedString("i18n.contracts.addLimits");
    }
  },
  /*
  * widget data map for accounts list in bulk update popup
  * @returns: widget map
  */
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
      //"imgCheckbox":"imgCheckbox",
      "lblCheckbox":"lblCheckbox",
      "isRowVisible":"isRowVisible",
      "flxActionsHeaderContainer":"flxActionsHeaderContainer",
      "flxActionNameHeading":"flxActionNameHeading",
      "flxActionCheckbox":"flxActionCheckbox",
      "imgActionHeaderCheckbox":"imgActionHeaderCheckbox",
      "lblActionName":"lblActionName",
      "lblIconActionNameSort":"lblIconActionNameSort",
      "flxActionDescriptionHeading":"flxActionDescriptionHeading",
      "lblActionDescription":"lblActionDescription",
      "flxActionStatusHeading":"flxActionStatusHeading",
      "lblActionStatus":"lblActionStatus",
      "lblActionSeperator":"lblActionSeperator",
      "flxContractEnrollAccountsEditRow":"flxContractEnrollAccountsEditRow"
      
    };
    return widgetMap;
  },
  /*
  * set accounts data in bulk update popup
  */
  setAccountsListInBulkUpdatePopup : function(option){
    var self =this;
    var custId ="";
    if(option === 1){
      custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    } else{
      custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    }
    var custEditUserObj  = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var allAccountsMap = custEditUserObj.accounts;
    var accountsJson = this.getAccountsBasedOnAccType(allAccountsMap);
    var accList = Object.values(accountsJson);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info = {"allData":{}};
    var segData = accList.map(function(accArr){
      var rowsData = [],selRowCount = 0;
      for(var i=0;i< accArr.length; i++){
        rowsData.push({
          "isRowVisible":false,
          "id": accArr[i].accountNumber,
          "flxContractEnrollAccountsEditRow":{"isVisible":false,
                                              "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxCheckbox":{"onClick": self.onCheckAccountsCheckbox.bind(self,self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,false)},
          "lblCheckbox":{"isVisible":true,"text":(accArr[i].isEnabled === "true" || accArr[i].isAssociated === "true") ? self.AdminConsoleCommonUtils.checkboxSelectedlbl: self.AdminConsoleCommonUtils.checkboxnormallbl},
          "lblAccountNumber": {"text":accArr[i].accountNumber},
          "lblAccountType": {"text":accArr[i].accountType},
          "lblAccountName": {"text":accArr[i].accountName},
          "lblAccountHolder": {"text":accArr[i].ownerType},
          "lblSeperator":"-",
          "template":"flxContractEnrollAccountsEditRow"
        });
        selRowCount = (accArr[i].isEnabled === "true" || accArr[i].isAssociated === "true") ? (selRowCount +1) : selRowCount;
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
        "lblAvailableActions":kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts")+":",
        "lblCountActions": (selRowCount +""),
        "lblTotalActions": "of "+rowsData.length,
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "flxHeaderContainer":{"isVisible":false},
        "flxAccountNumCont":{"onClick":self.sortAndSetData.bind(self,"lblAccountNumber.text",self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2)},
        "flxAccountType":{"onClick":""},
        "flxAccountName":{"onClick":self.sortAndSetData.bind(self,"lblAccountName.text",self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 2)},
        "flxAccountHolder":{"onClick":self.showAccountsFilterInBulkUpdate},
        "lblSeperator":"-",
        "lblSectionCheckbox":{"isVisible":true,"text":self.getHeaderCheckboxImage(rowsData,true,true),"skin":"sknIconBg0066CASz20pxCheckbox"},
        "flxCheckbox":{"onClick":self.onCheckAccountsCheckbox.bind(self,self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList,true)},
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
        "lblAccountHolder": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.OwnershipType_UC"),
        "lblIconSortAccHolder":"\ue916",
        "template":"flxEnrollSelectedAccountsSec",
      };
      
      self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.allData[accArr[0].accountType] = {"sectionData":sectionData,
                                                                                                      "rowData":rowsData};
      return [sectionData, rowsData];
    });
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.widgetDataMap = this.widgetMapforBulkUpdateAccounts();
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(segData);
    this.view.forceLayout();
  },
  /*
  * categorize accounts based on account type
  * @param: all ccounts map
  */
  getAccountsBasedOnAccType : function(accountsMap){
    var accountJson = {};
    accountsMap.forEach(function(account,key){
      (accountJson[account.accountType] = accountJson[account.accountType] || []).push(account);
    });
    return accountJson;
  },
  /*
  * expand/collapse the selected account type list in bulk update popup
  */
  toggleSelectAccountsArrow : function(context){
    var selSecInd = context.rowContext.sectionIndex;
    var selRowInd = context.rowContext.rowIndex;
    var segData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    for(var i=0; i<segData.length; i++){
      if(selSecInd !== i){
        segData[i][0].lblIconToggleArrow.text = "\ue922"; //right-arrow
        segData[i][0].lblIconToggleArrow.skin = "sknIcon00000015px";
        segData[i][0].flxHeaderContainer.isVisible = false;
        segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
        segData[i][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";

      }
    }
    if(segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px"){
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue915"; //down-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000014px";
      segData[selSecInd][0].flxHeaderContainer.isVisible = true;
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],true);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.allData[segData[selSecInd][0].lblFeatureName] = {"sectionData":segData[selSecInd][0],
                                                                                                                     "rowData":segData[selSecInd][1]};
      this.setDataForOwnershipFilterBulk(segData[selSecInd][1]);
    } else{
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue922"; //right-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000015px";
      segData[selSecInd][0].flxHeaderContainer.isVisible = false;
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],false);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    }
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(segData);
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.setVisibility(false);
  },
  /*
  * get the selected account types and their count in bulk update screen
  */
  getSelectedAccountTypesCount : function(){
    var accountTypes = [];
    var segData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
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
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.removeAll();
    for(var k=0;k<accountTypes.length;k++){
      this.addAccountsTag(accountTypes[k]);
    }
  },
  /*
  * show the ownership type filter in bul update feature/limits popup
  */
  showAccountsFilterInBulkUpdate : function(event,context){
    var flxRight = context.widgetInfo.frame.width - event.frame.x - event.frame.width;
    var iconRight = event.frame.width - event.lblIconSortAccHolder.frame.x;
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.right = (flxRight + iconRight - 32) + "dp";
    var secInd = context.sectionIndex;
    var computedTop = 0;
    for(var i=0;i< secInd;i++){
      computedTop = computedTop + 80;
    }
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.top = (computedTop + event.parent.frame.y + event.frame.y + 10 -
                                                                 this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.contentOffsetMeasured.y) + "dp";
    if (this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.isVisible) {
      this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.setVisibility(false);
    } else {
      this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.setVisibility(true);
    }
  },
  /*
  * enroll - change the fields based on features/limits bulk update
  * @param: opt - feature/limit, row widget path
  */
  setFeatureLimitRowUI : function(opt,widgetPath, category){
    if(opt === 1){  //for feature
      widgetPath.flxRow2.setVisibility(false);
      widgetPath.flxFieldColumn13.setVisibility(false);
      widgetPath.flxFieldColumn21.setVisibility(false);
    } else{ //for limits
      widgetPath.tbxValue21.text ="";
      widgetPath.tbxValue22.text ="";
      widgetPath.flxFieldColumn13.setVisibility(false);
      widgetPath.flxFieldColumn21.setVisibility(true);
      widgetPath.flxFieldColumn22.setVisibility(true);
      widgetPath.lblFieldName22.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AutoDeny");
      widgetPath.flxErrorField21.setVisibility(false);
      widgetPath.flxErrorField22.setVisibility(false);
      if(category === "enroll"){
        widgetPath.flxRow2.setVisibility(true);
        widgetPath.lblFieldName21.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PreApproved");
      }else{
        widgetPath.flxRow2.setVisibility(false);
        widgetPath.lblFieldName21.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.value");
      }
    }
  },
  /*
  * enroll - get the features,actions list to show in bulk update popup
  */
  getFeaturesForBulkUpdate : function(option,category){
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
        if(actions[j].dependentActions && actions[j].dependentActions.length>0){
          if(typeof actions[j].dependentActions==="string")//as we are getting string format in edit flow and object format in create flow
            actionsJSON.dependentActions=(actions[j].dependentActions.substring(1,actions[j].dependentActions.length-1)).split(",");
          else
            actionsJSON.dependentActions=actions[j].dependentActions.map(function(rec){return rec.id});
        }
        featureJSON.actions.push(actionsJSON);
      }
      bulkUpdateFeatures[featuresList[i].featureId]=featureJSON;
    }
    this.bulkUpdateList = bulkUpdateFeatures;
  },
  /*
  * enroll - add new entry for feature selection in bulk update in enroll,contracts flow
  * @param: category(enroll/contract)
  */
  addNewFeatureRowBulkUpdate : function(category){
    var addNewRowFlex = this.view.flxContractFA.isVisible ? this.view.flxAddNewRowListCont : this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var outerFlex = this.view.flxContractFA.isVisible ? this.view.flxFABulkUpdateScreen : this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
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
     if (category === "enroll") {
       this.setNewFeatureLimitRowData(featureRowToAdd,1, category);
    } else {
      if (this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info === "Limits") {
        featureRowToAdd.flxFieldColumn21.isVisible = true;
        featureRowToAdd.lblFieldName13.text = "Transaction Type";
        featureRowToAdd.skin = "slFbox";
        this.setNewFeatureLimitRowData(featureRowToAdd, 2, category);
      } else {
        //featureRowToAdd.flxRow1.top="80px";
        featureRowToAdd.flxRadioGroupCont.left = "-10px";
        featureRowToAdd.flxAddNewFeatureContainer.top = "60px";
        //featureRowToAdd.flxRadioGroup.isVisible = true;
        //  featureRowToAdd.flxAddNewFeatureContainer.skin = "slFbox";
        //featureRowToAdd.skin = "sknflxf5f6f8Op100BorderE1E5Ed";
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
        //   featureRowToAdd.customRadioButtonGroup.flxRadioButton1.width="100px";
        //  featureRowToAdd.customRadioButtonGroup.flxRadioButton2.width="100px";
        featureRowToAdd.customRadioButtonGroupCont.setData(radioBtnData);
        featureRowToAdd.customRadioButtonGroupCont.imgRadioButton1.onTouchStart = this.resetFeatureSelection.bind(this, featureRowToAdd);
        featureRowToAdd.customRadioButtonGroupCont.imgRadioButton2.onTouchStart = this.resetFeatureSelection.bind(this, featureRowToAdd);
        featureRowToAdd.lblFieldName13.text = "Permission Type";
        this.setNewFeatureLimitRowData(featureRowToAdd, 1, category);
      }
    }
  },
  /*
  * enroll - add new entry for limit selection in bulk update in enroll,contracts flow
  * @param: category(enroll/contract)
  */
  addNewLimitRowBulkUpdate : function(category){
    var addNewRowFlex = this.view.flxContractFA.isVisible ? this.view.flxAddNewRowListCont : this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var outerFlex = this.view.flxContractFA.isVisible ? this.view.flxFABulkUpdateScreen : this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
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
    
    this.setNewFeatureLimitRowData(limitRowToAdd,2, category);
  },
  /*
  * enroll - set data and assign actions to the newly created row in enroll,contracts flow
  * @param: new row widget path, option (features:1,limits:2), category(enroll/contract)
  */
  setNewFeatureLimitRowData : function(newRowWidget, option, category){
    var self =this;
    var addNewRowFlex=option===1?this.view.flxAddNewRowListCont:this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var addNewRowButton=option===1?this.view.btnAddNewRow:this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow;
    var allRows = addNewRowFlex.widgets();	
    
    if(allRows.length === 0){
      newRowWidget.flxDelete.isVisible = false;
    } else{
      allRows[0].flxDelete.isVisible = true;
      newRowWidget.flxDelete.isVisible = true;
    }
    var listboxData = this.getUnselectedFeaturesList(option, category);
    newRowWidget.lstBoxFieldValue11.masterData = listboxData;
    newRowWidget.lstBoxFieldValue11.selectedKey = listboxData[0][0];
    newRowWidget.zIndex = listboxData.length;
    newRowWidget.lblFieldValue12.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAnAction");
    newRowWidget.lblFieldValue12.toolTip = "";
    newRowWidget.lblCurrencySymbol21.text = this.currencyValue;
    newRowWidget.lblCurrencySymbol22.text = this.currencyValue;
    //assigning actions
    newRowWidget.lstBoxFieldValue11.onSelection = function(){
      newRowWidget.lstBoxFieldValue11.skin="sknLbxborderd7d9e03pxradius";
      newRowWidget.flxErrorField11.setVisibility(false);
      self.updateExistingRowsListboxData(newRowWidget,option,category);
      //disable action when feature not selected
      if(newRowWidget.lstBoxFieldValue11.selectedKey === "select"){
        newRowWidget.flxFieldValueContainer12.setEnabled(false);
        newRowWidget.lblFieldValue12.toolTip = "";
        newRowWidget.lblFieldValue12.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAnAction");
      } else{
        self.setActionsListboxData(newRowWidget,option);
      }
    }
    if(listboxData.length<3)//if there is only one feature to be added , that would be added in this widget row so no new row is needed
       addNewRowButton.setVisibility(false);
    else
     addNewRowButton.setVisibility(true);
    newRowWidget.flxDelete.onClick = this.deleteAddNewFeatureRow.bind(this,newRowWidget, option, category);
    newRowWidget.tbxValue21.onKeyUp = function(){
      newRowWidget.flxValue21.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      newRowWidget.flxErrorField21.setVisibility(false);
    }
    newRowWidget.tbxValue22.onKeyUp = function(){
      newRowWidget.flxValue22.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      newRowWidget.flxErrorField22.setVisibility(false);
    }
    this.setFeatureLimitRowUI(option,newRowWidget,category);
    addNewRowFlex.addAt(newRowWidget, allRows.length);
    this.updateExistingRowsListboxData(newRowWidget, option,category);
    this.view.forceLayout();
  },
  /*
  * enroll - set data to actions segmnet in every row in bulkupdate for edituser,contracts
  * @param: row component widget path
  */
  setActionsListboxData : function(widgetPath, option){
    var self=this;
    var maxText = "";
    var allBulkFeatures=this.bulkUpdateList;
    var selectedFeatureId=widgetPath.lstBoxFieldValue11.selectedKey;
    var featureActions=[{"id":"select","name":"Select"}];
    var actionListData=[["select","Select"]];
    if(selectedFeatureId!=="select"){
      //contract features
      if (this.view.flxCreateContract.isvisible && this.view.flxContractFA.isVisible) {
        var featureLevel = this.view.btnUpdateInBulkFA.info;
        if (featureLevel === "ACCLVL") { //to show actions of account level only
          var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
          featureActions = allBulkFeatures[selectedFeatureId].actions.filter(function (item) {
            return self.bulkUpdateAccLevelActions[custId][selectedFeatureId].includes(item.actionId);
          });
        } else {
      featureActions=allBulkFeatures[selectedFeatureId].actions;
        }
      } else { //edit user, contract limits
        if (option === 1) {
          featureActions = allBulkFeatures[selectedFeatureId].actions;
        } else {
          featureActions = allBulkFeatures[selectedFeatureId].actions.filter(function (item) {
            return item.type === "MONETARY";
          });
        }

      }
      widgetPath.lblFieldValue12.toolTip = "";
      widgetPath.lblFieldValue12.text=featureActions.length+ " " + kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.Selected");
      widgetPath.flxFieldValueContainer12.setEnabled(true);
      widgetPath.flxFieldValueContainer12.onClick = this.setActionsSearchOnFieldClick.bind(this,widgetPath);
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
      maxText=action.actionName.length > maxText.length ? action.actionName : maxText;
      i=i+1;
      return{
        "actionId": action.actionId,
        "flxSearchDropDown": "flxSearchDropDown",
        "imgCheckBox":self.AdminConsoleCommonUtils.checkboxSelected,
        "lblDescription": action.actionName,
        "dependentActions": action.dependentActions
      }
    });
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(actionsSegData);
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info = { "data": actionsSegData };
    var maxTextWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxText, "13px Lato-Regular");
    var dropDownWidth = maxTextWidth + 15 + 15 + 20;
    widgetPath.flxDropdownField12.width = dropDownWidth > widgetPath.flxFieldValueContainer12.frame.width ? dropDownWidth + "px" : widgetPath.flxFieldValueContainer12.frame.width + "px";
    //to select all the actions by default
    var selectInd = [];
    for (let x = 0; x < actionsSegData.length; x++) {
      selectInd.push(x);
    }
    var selectionProp = {
      imageIdentifier: "imgCheckBox",
      selectedStateImage: this.AdminConsoleCommonUtils.checkboxSelected,
      unselectedStateImage: this.AdminConsoleCommonUtils.checkboxnormal
    };
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selectInd]];
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info={"data":actionsSegData,"selectedIndices":selectInd};
    //actions for the row component
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.onRowClick = this.onClickOfActionBulkUpdateRow.bind(this,widgetPath);
    widgetPath.flxDropdownField12.onHover = this.onHoverEventCallback;
    widgetPath.productTypeFilterMenu.tbxSearchBox.onKeyUp = this.searchActionsInBulkUpdate.bind(this,widgetPath);
    widgetPath.productTypeFilterMenu.flxClearSearchImage.onClick = this.clearSearchActionBulkUpdate.bind(this,widgetPath);
    this.view.forceLayout();
  },
  /*
  * search actions initialization
  * @param: row widget path
  */
  setActionsSearchOnFieldClick : function(widgetPath){
    widgetPath.flxFieldValueContainer12.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    widgetPath.flxErrorField12.setVisibility(false);
    if(widgetPath.flxDropdownField12.isVisible)
      widgetPath.flxDropdownField12.setVisibility(false);
    else{
      widgetPath.productTypeFilterMenu.tbxSearchBox.text="";
      widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
      var totalRecords=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
      //to select actions by default
      var selectInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selectInd]];
      widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
      widgetPath.flxDropdownField12.setVisibility(true);
    }
  },
  /*
  * on click of action in bulk update popup listbox
  * @param: row widget path
  */
  onClickOfActionBulkUpdateRow : function(widgetPath){
    var segData=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.data;
    var selInd = widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices;
    if(selInd){
      var selRowInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices[0][1];
      var selectedIndex=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex?widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex[1]:null;
      widgetPath.lblFieldValue12.text = selRowInd.length === 1 ? this.AdminConsoleCommonUtils.getTruncatedString(segData[selRowInd[0]].lblDescription,40,40) : selRowInd.length+" Selected";
      widgetPath.lblFieldValue12.toolTip = selRowInd.length === 1 ? segData[selRowInd[0]].lblDescription : "";
      if(widgetPath.flxErrorField12.isVisible){
        widgetPath.flxErrorField12.isVisible=false;
        widgetPath.flxFieldValueContainer12.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      }
      if(widgetPath.productTypeFilterMenu.tbxSearchBox.text.length===0)
        widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices=selRowInd;
      else{//to update slected indices in info which would be used in retaining the selected indices in search
        var index = widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices.indexOf(selectedIndex);
        if (index > -1) 
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices.splice(index, 1);
        else
          widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices.push(selectedIndex);
      }
      var feature=this.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey];
      for(let i=0;i<feature.actions.length;i++){
        if(feature.actions[i].actionId===segData[selRowInd[0]].actionId)
          this.bulkUpdateList[widgetPath.lstBoxFieldValue11.selectedKey].actions[i].isChecked=(segData[selRowInd[0]].lblCheckbox===this.AdminConsoleCommonUtils.checkboxnormallbl)?false:true;
      }  
    } else{
      widgetPath.lblFieldValue12.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAnAction");
      widgetPath.lblFieldValue12.toolTip = "";
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices = [];
    }
        
    this.view.forceLayout();
  },
  /*
  * search for actions in the list in bulk update popup rows
  * @param: row widget path
  */
  searchActionsInBulkUpdate : function(widgetPath){
    if(widgetPath.productTypeFilterMenu.tbxSearchBox.text.trim().length>0){
      widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(true);
      var segData=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.data;
      var searchText=widgetPath.productTypeFilterMenu.tbxSearchBox.text;
      var actionName="";
      var selIndices=[];
      var selectedRowIndices = widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
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
      }
    }else{
      var selInd = widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
      widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
      widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
      var totalRecords=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
      widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selInd]];
    }
    this.view.forceLayout();
  },
  /*
  * clear search for actions in the list in bulk update popup rows
  * @param: row widget path
  */
  clearSearchActionBulkUpdate : function(widgetPath){
    widgetPath.productTypeFilterMenu.tbxSearchBox.text="";
    widgetPath.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
    widgetPath.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
    var totalRecords=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.data;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
    var selInd=widgetPath.productTypeFilterMenu.segStatusFilterDropdown.info.selectedIndices;
    widgetPath.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndices=[[0,selInd]];
    this.view.forceLayout();
  },
 /*
  * enroll - remove the new row added in bulk update for features
  * @param: widget to remove path
  */
  deleteAddNewFeatureRow : function(widgetPath, option, category){
    var delRowSelection = widgetPath.lstBoxFieldValue11.selectedKeyValue;
    if (this.view.flxContractFA.isVisible) {
      this.view.flxAddNewRowListCont.remove(this.view[widgetPath.id]);
      this.view.remove(this.view[widgetPath.id]);
    }
    else {
    this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.remove(this.view.bulkUpdateFeaturesLimitsPopup[widgetPath.id]);
    this.view.bulkUpdateFeaturesLimitsPopup.remove(this.view.bulkUpdateFeaturesLimitsPopup[widgetPath.id]);
    }
    var addedRows = this.view.flxContractFA.isVisible ? this.view.flxAddNewRowListCont.widgets() : this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    if(addedRows.length === 1){
      addedRows[0].flxDelete.isVisible = false;
    }
    this.updateExistingRowsListboxData({"id":""}, option, category);
    this.view.flxContractFA.isVisible ? this.view.btnAddNewRow.setVisibility(true) : this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
  },
  /*
  * enroll - reset the add rows on channge of radio button option in bulk update popup
  */
  resetAddedRows : function(){
    var category = this.view.flxCreateContract.isVisible === true ? "contract" : "enroll";
    var addNewRowFlex = this.view.flxContractFA.isVisible ? this.view.flxAddNewRowListCont : this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont;
    var parentflex = this.view.flxContractFA.isVisible ? this.view.flxBulkUpdateListContainer : this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer;
    var flxChildren = addNewRowFlex.widgets();
    addNewRowFlex.removeAll();
    for(var i=0;i<flxChildren.length;i++){
      if (category === "contract" && this.view.flxContractFA.isVisible) {
        this.view.remove(this.view[flxChildren[i].id]);
      } else {
      this.view.bulkUpdateFeaturesLimitsPopup.remove(this.view.bulkUpdateFeaturesLimitsPopup[flxChildren[i].id]);
    }
    }
    var outerFlex = this.view.flxContractFA.isVisible ? this.view.flxFABulkUpdateScreen : this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var height = outerFlex.frame.height - (70 + parentflex.frame.y + 80);
    parentflex.height = height + "dp";
    var bulkUpdateOption = this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info.option;
    this.bulkUpdateListboxData = this.getListForListBox(bulkUpdateOption);
    var category = this.view.flxCreateContract.isVisible === true ? "contract" :"enroll";
    if(bulkUpdateOption === 1){
      this.addNewFeatureRowBulkUpdate(category);
    }else{
      this.addNewLimitRowBulkUpdate(category);
    }  
    this.view.forceLayout();
  },
  /*
  * enroll - update previous rows listbox data on addition of new row
  * @param: current row path,option9features/limits),category(enroll/contracts)
  */
  updateExistingRowsListboxData : function(currRowPath,option,category){
    var currRowData;
    var allRows = this.view.flxContractFA.isVisible ? this.view.flxAddNewRowListCont.widgets() : this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var updatedList = this.getUnselectedFeaturesList(option,category);
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
  * enroll - get unselected features list to set it in remaining rows
  * @param: option(features:1,limits:2), catgory(enroll/contract)
  * @returns: unselected features array formated for listbox masterdata
  */
  getUnselectedFeaturesList: function(option, category) {
    var assignedData = [],
        allFeaturesId = [],diffList = [],commonList = [];
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    //get all assigned feature id's
    if(option === 1){//features bulk update list
      rowsList = this.view.flxAddNewRowListCont.widgets();
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
    var finalList = category === "enroll" ? this.getListForListBox(option, diffList) : this.getListForListBoxContracts(diffList);
    return finalList;
  },
  /* 
  * enroll - function to return the required features in listbox masterdata format
  * @param: unselected features id's list
  * @retrun: masterdata with given features id's
  */
  getListForListBox: function(option,data) {
    var self = this;
    var finalList = [];
    var selectOption = [["select", kony.i18n.getLocalizedString("i18n.contracts.selectAFeature")]];
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
   /*
  *  enroll - set ddata to radio buttons in bulk update popup
  * @param: opt(1: features,2:limits)
  */
  setRadioGroupData : function(opt){
    var radioBtnData=[];
    if(opt===1){
      this.view.bulkUpdateFeaturesLimitsPopup.lblRadioGroupTitle.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PermissionType");
      radioBtnData = [{src:this.AdminConsoleCommonUtils.radioSelected, value: kony.i18n.getLocalizedString("i18n.userwidgetmodel.ViewConfigureCSR.Enable"), selectedImg:this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected},
                      {src:this.AdminConsoleCommonUtils.radioNotSelected, value: kony.i18n.getLocalizedString("i18n.users.disable"), selectedImg:this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected}];
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton1.width="100px";
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton2.width="100px";
    }else{
      this.view.bulkUpdateFeaturesLimitsPopup.lblRadioGroupTitle.text= kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type");
      radioBtnData = [{src: this.AdminConsoleCommonUtils.radioSelected, value:kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PerTransaction"), selectedImg:this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected},
                      {src:this.AdminConsoleCommonUtils.radioNotSelected, value:kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.DailyTransaction"), selectedImg: this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected},
                      {src:this.AdminConsoleCommonUtils.radioNotSelected, value:kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.WeeklyTransaction"), selectedImg: this.AdminConsoleCommonUtils.radioSelected, unselectedImg: this.AdminConsoleCommonUtils.radioNotSelected}];
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton1.width="150px";
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton2.width="150px";
      this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.flxRadioButton3.width="150px";
    }
    this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.setData(radioBtnData);
    this.view.forceLayout();
  },
  /*
  *  enroll - get the selected radio button type value in bulk update popup
  */
  getSelectedType : function(option) {
    var radBtn = this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton1.src;
    var radBtn1 = this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton2.src;
    var radBtn2 = this.view.bulkUpdateFeaturesLimitsPopup.customRadioButtonGroup.imgRadioButton3.src;
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
  /*
  * bulk update the feature/limits that have been selected in popup
  * @param: option(1/2)
  */
  updateFeatureLimitsBulkChanges : function(option){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var featureId="";
    var actionIds=[];
    var isEnable=false;
    var bulkUpdateList=[];
    var typeValue=this.getSelectedType(option);
    var selAccId = [];
    var isFeatures=this.view.flxContractFA.isVisible;
  
    var accSegData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
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
        bulkUpdateList.push({
          "featureId": featureId, "actionIds": actionIds, "limitId": typeValue,
          "limitVal1": rowsList[i].tbxValue21.text, "limitVal2": rowsList[i].tbxValue22.text
        });
      }
    }
    var isUpdate = option === 1 ? this.updateBulkFeaturesInEditUserObj(selAccId,bulkUpdateList) :
                                  this.updateBulkLimitsInEditUserObj(selAccId,bulkUpdateList);
    if(isUpdate){
      this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
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
  /*
  * update the selected bulk features,actions in edit user obj
  * @param: selected account id array, bulupdate list 
  * @return: true
  */
  updateBulkFeaturesInEditUserObj : function(selAccId, bulkUpdateList){
    var count = 0;
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
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
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
    return true;
  },
  /*
  * update the selected bulk limit values in edit user obj
  * @param: selected account id array, bulupdate list 
  * @return: true
  */
  updateBulkLimitsInEditUserObj : function(selAccId, bulkUpdateList){
    var count = 0;
    var custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
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
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
    return true;
  },
  /*
  * validation the selection in bulk update popup edit user
  */
  validateBulkSelectionEditUser : function(){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var isValid=true;
    var selCount=0;
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select"){
        selCount=selCount+1;
        //validation for action selection
        if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems===null){
          isValid=false;
          rowsList[i].flxFieldValueContainer12.skin = "sknFlxCalendarError";
          rowsList[i].lblErrorMsg12.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAtleastOneAction");
          rowsList[i].flxErrorField12.setVisibility(true);
        }
        //validation for limits
        if(this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info.option ===2){
          if(rowsList[i].tbxValue21.text.trim().length===0){
            isValid=false;
            rowsList[i].lblErrorMsg21.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
            rowsList[i].flxErrorField21.setVisibility(true);
            rowsList[i].flxValue21.skin = "sknFlxCalendarError";
          }
          if(rowsList[i].tbxValue22.text.trim().length===0){
            isValid=false;
            rowsList[i].lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
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
      rowsList[0].lblErrorMsg11.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAtleastOneFeature");
      rowsList[0].flxErrorField11.setVisibility(true);
    }
    this.view.forceLayout();
    return isValid;
  },
  /*
  * sort based on selected segment column
  * @param: column to sort, segment path, segment category
  */
  sortAndSetData : function(columnName,segmentPath,category){
    var segData = segmentPath.data;
    var secInd = segmentPath.selectedsectionindex;
    this.sortBy.column(columnName);
    if(category === 1){ //edit accounts screen
      segData[secInd][1] = segData[secInd][1].sort(this.sortBy.sortData);
      segData[secInd][0].lblIconSortAccName = this.determineSortIconForSeg(this.sortBy,"lblAccountNumber.text");
      segData[secInd][0].lblIconAccNameSort = this.determineSortIconForSeg(this.sortBy,"lblAccountName.text");
      segmentPath.setSectionAt(segData[secInd],secInd);
    } else if(category === 2){ //bulk update accounts list
      segData[secInd][1] = segData[secInd][1].sort(this.sortBy.sortData);
      segData[secInd][0].lblIconSortAccName = this.determineSortIconForSeg(this.sortBy,"lblAccountNumber.text");
      segData[secInd][0].lblIconAccNameSort = this.determineSortIconForSeg(this.sortBy,"lblAccountName.text");
      segmentPath.setSectionAt(segData[secInd],secInd);
    } else if(category === 3){ //customer search results 
      this.determineSortFontIcon(this.sortBy,"lblSearchSegHeaderCustId.text",this.view.lblIconCustIdSort);
      this.determineSortFontIcon(this.sortBy,"lblSearchSegHeaderCustName.text",this.view.lblIconCustNameSort);
      this.determineSortFontIcon(this.sortBy,"lblSearchSegHeaderEmail.text",this.view.lblIconCustEmailSort);
      segmentPath.setData(segData.sort(this.sortBy.sortData));
    } else if(category === 4){ //contracts account screen
      segData[secInd][1] = segData[secInd][1].sort(this.sortBy.sortData);
      segData[secInd][0].lblIconSortAccName = this.determineSortIconForSeg(this.sortBy,"lblAccountNumber");
      segData[secInd][0].lblIconAccNameSort = this.determineSortIconForSeg(this.sortBy,"lblAccountName");
      segmentPath.setSectionAt(segData[secInd],secInd);
    }   
    
  },
  /*
  * search for accounts based on name,id in bulk update screen
  */
  searchForAccountsInBulkUpdate : function(){
    var searchText = this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.text.trim();
    var searchResults = [];
    var actualData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.allData;
    var accountTypes = Object.keys(actualData);
    var filteredRows = [];
    for(var i=0;i<accountTypes.length;i++){
      var accountHeader = actualData[accountTypes[i]].sectionData;
      var accountRows = actualData[accountTypes[i]].rowData;
      if(searchText.length > 0){
        filteredRows =[];
        for(var j=0;j<accountRows.length;j++){
          if(accountRows[j].lblAccountNumber.text.indexOf(searchText) >= 0 ||
             accountRows[j].lblAccountName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0){
            accountRows[j].flxContractEnrollAccountsEditRow.isVisible = true;
            filteredRows.push(accountRows[j]);
          }
        }
        if(filteredRows.length > 0){ // show the account section expanded if it contains rows
          accountHeader.lblIconToggleArrow.text = "\ue915"; //down-arrow
          accountHeader.lblIconToggleArrow.skin = "sknIcon00000014px";
          accountHeader.flxHeaderContainer.isVisible = true;
          accountHeader.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
          searchResults.push([accountHeader,filteredRows]);
        }
      } else{
        searchResults.push([accountHeader,accountRows]);
      }
    }
    if(searchResults.length > 0){
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(searchResults);
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.lblNoResultsScreen1.setVisibility(false);
    } else{
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.lblNoResultsScreen1.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.lblNoResultsScreen1.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "" + searchText;
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([]);
    }
    this.view.forceLayout();
  },
  /*
  * show the account types filter in edit features/limits screens
  * @param: option for feature/limits - 1/2
  */
  showAccountTypesFilter : function(opt){
    var top = 150;
    if(opt === 1){
      top = this.view.flxEnrollEditFeaturesSearch.frame.y + this.view.flxEnrollEditFeatureFilter.frame.y +30;
    } else{
      top = this.view.flxEnrollEditLimitSearch.frame.y + this.view.flxEnrollEditLimitsFilter.frame.y +30;
    }
    this.view.customListBoxAccounts.flxSegmentList.setVisibility(false);
    this.view.flxAccountTypesFilter.top = top +"dp";
    this.view.flxAccountTypesFilter.setVisibility(true);
    
  },
/*
  * forms union of all feature actions from all the account level features
  */
  setAccountActionsForBulkUpdate: function (existingFeatureJson, accFeatures) {
    for (var i = 0; i < accFeatures.length; i++) {
      var actions = accFeatures[i].actions || accFeatures[i].permissions;
      var featureActions = existingFeatureJson[accFeatures[i].featureId] || [];
      if (featureActions.length === 0)
        existingFeatureJson[accFeatures[i].featureId] = [];
      for (var j = 0; j < actions.length; j++) {
        if (!featureActions.includes(actions[j].actionId)) {
          featureActions.push(actions[j].actionId);
        }
      }
      existingFeatureJson[accFeatures[i].featureId] = featureActions;
    }
    return existingFeatureJson;
  },
  /*
  * add selected account tag in bulk update screen
  * @param: account type data to set to the tag
  */
  addAccountsTag : function(accountType){
    var self = this;
    var tagsCount=self.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.widgets().length;
    var newTextTag = self.view.bulkUpdateFeaturesLimitsPopup.flxSelectionTag.clone(tagsCount.toString());
    var lblname = tagsCount + "lblTagName";
    var imgname = tagsCount + "flxCross";
    var textToSet = accountType.accType + " ("+ accountType.count + ")";
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(textToSet,"12px Lato-Regular");
    self.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added.push(accountType);
    newTextTag[lblname].text = textToSet;
    newTextTag[lblname].toolTip = textToSet;
    newTextTag.isVisible = true;
    newTextTag.width=flexWidth+10+10+15+"px";//labelwidth+left padding+right padding+ cross image width
    var parentWidth= self.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer.frame.width - 40;
    var leftVal=20;
    var topVal=0;
    var lineCount=0;
    for(var a=tagsCount-1;a>=0;a--){
      var childWid = self.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.widgets();
      var i= childWid[a].id;
      leftVal=leftVal+(self.view.bulkUpdateFeaturesLimitsPopup[i].frame.width+15);
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
    self.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.addAt(newTextTag, -1);
    newTextTag[imgname].onTouchStart = function () {
      self.removeTagEditUser(tagsCount);
    };
    self.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(true);
    this.view.forceLayout();
  },
  /*
   * function to remove a selected tag
   * @param : tags count
   */
  removeTagEditUser: function(tagsCount) {
    var removedAccType = this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added.splice(tagsCount,1);
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.removeAll();
    var addedCount=this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added.length;
    var addedCustomers=this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added;
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added=[];
    for (var x=0;x<addedCount;x++){
      this.addAccountsTag(addedCustomers[x]);
    }
    if(addedCount === 0){
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(false);
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen2.btnSave,true,false);
    }
    var segData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    //update the segment selection
    for(var i=0; i<segData.length; i++){
      if(removedAccType[0].accType === segData[i][0].lblFeatureName){
        segData[i][0].lblCountActions = "0";
        segData[i][0].lblSectionCheckbox.text = this.AdminConsoleCommonUtils.checkboxnormallbl;
        segData[i][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[i][0].lblSectionCheckbox);
        for(var j=0; j<segData[i][1].length; j++){
          segData[i][1][j].lblCheckbox.text = this.AdminConsoleCommonUtils.checkboxnormallbl;
		  segData[i][1][j].lblCheckbox.skin = this.applyCheckboxSkin(segData[i][1][j].lblCheckbox);        
        }
        this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setSectionAt(segData[i], i);
        break;
      }
    }
    this.view.forceLayout();
  },
  /*
  * hide account types list dropdown on hover out
  */
  onHoverHideSelectionDropdown : function(widget,context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.customListBoxAccounts.flxSegmentList.setVisibility(false);
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
  * @param: segment path
  */
  validateSelectionForMultipleCards : function(segmentPath){
    var parentFlxCont = "";
    if(segmentPath.info.featuresType === 1)
      parentFlxCont = this.view.flxEnrollEditFeaturesList;
    else if(segmentPath.info.featuresType === 2)
      parentFlxCont = this.view.flxEnrollEditAccFeaturesList;
    else if(segmentPath.info.featuresType === 3)
      parentFlxCont = this.view.flxEnrollEditOtherFeaturesList;
    
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
  /*
  * set related customer list data to segment
  * @param: related customers list
  */
  setRelatedCustomerListData: function(relatedCust){
    var self =this;
    var widgetMap = {
      "custDetails":"custDetails",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      //"imgCheckbox":"imgCheckbox",
      "lblCheckbox":"lblCheckbox",
      "flxCheckbox":"flxCheckbox",
      "lblContractName":"lblContractName",
      "lblHeading1":"lblHeading1",
      "lblData1":"lblData1",
      "lblHeading2":"lblHeading2",
      "lblData2":"lblData2",
      "btnRelation":"btnRelation",
      "flxRightDetailsCont":"flxRightDetailsCont",
      "flxRightActionCont":"flxRightActionCont",
      "flxRelatedCustomerList":"flxRelatedCustomerList"
    };
    var address="";
    if(relatedCust && relatedCust.length > 0){
      var segData = relatedCust.map(function(rec){
        if(rec.cityName||rec.country)
          address=self.AdminConsoleCommonUtils.getAddressText(rec.cityName,rec.country);
        else
          address="N/A";
        var details = {
          "id": rec.coreCustomerId,
          "name": rec.coreCustomerName,
          "industry": rec.industry,
          "email": rec.email,
          "phone":rec.phone,
          "address": address
        };
        return {
          "custDetails":rec,
          "flxRightDetailsCont": {"isVisible": true},
          "flxRightActionCont": {"isVisible": false},
          "imgCheckbox":{"src":"radio_selected.png"},
          "flxCheckbox":"flxCheckbox",
          "lblContractName": {"text":rec.coreCustomerName, "onClick": self.showCustomerDetailsPopup.bind(self,details)},
          "lblHeading1": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
          "lblData1": {"text":rec.coreCustomerId},
          "lblHeading2":kony.i18n.getLocalizedString("i18n.View.ADDRESS"),
          "lblData2": {"text":address},
          "btnRelation":{"text":rec.relationshipName, "isVisible":true},
          "template":"flxRelatedCustomerList"
        };
      });
      this.view.segRelatedCustomers.widgetDataMap = widgetMap;
      this.view.segRelatedCustomers.setData(segData);
      this.view.segRelatedCustomers.setVisibility(true);
      this.view.noResultsRelatedCustomers.setVisibility(false);
    } else{
      this.view.segRelatedCustomers.setVisibility(false);
      this.view.noResultsRelatedCustomers.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.NoRelatedCustomersAvailable");
      this.view.noResultsRelatedCustomers.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * call to fetch the contract associated with the selected related customer id
  */
  callSearchContracts : function(segmentPath,option){
    var selRowInd = segmentPath.selectedRowIndex[1];
    var rowData = segmentPath.data[selRowInd];
    var searchParam = {
      "contractId": "",
      "contractName": "",
      "coreCustomerId": rowData.custDetails.coreCustomerId,
      "coreCustomerName": "",
      "email": "",
      "phoneCountryCode": "",
      "phoneNumber": "",
      "country": "",
      "serviceDefinitionId": ""
    };
    this.presenter.searchContracts(searchParam, option);
  },
  /*
  * set the selected related customer details on click of next
  */
  setRelatedCustomerDetails : function(){
    var selRowInd = this.view.segRelatedCustomers.selectedRowIndex[1];
    var rowData = this.view.segRelatedCustomers.data[selRowInd];
    this.view.lblRelatedCustDetailsTitle.text = rowData.lblContractName.text
    this.view.detailsRelatedCust1.lblData1.text = rowData.lblData1.text;
    this.view.detailsRelatedCust1.lblData2.text = rowData.lblContractName.text;
    this.view.detailsRelatedCust1.lblData3.text = rowData.custDetails.email;
    this.view.detailsRelatedCust2.lblData1.text = rowData.custDetails.phone;
    this.view.detailsRelatedCust3.lblData1.text = rowData.lblData2.text;
    this.view.lblRelatedCustContractHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ContractExistsFor") +
                                                " "+rowData.lblContractName.text+" ("+rowData.lblData1.text+")";
  },
  /*
  * set contract card and segment data of the selected customer
  * @params: customer contract details
  */
  setSelectedRelatedCustContractCard : function(contractData){
    if(contractData.contractOfCustomer.length > 0){
      this.view.flxRelatedCustContractCont.setVisibility(true);
      this.view.flxRelatedCustDetailsNoContracts.setVisibility(false);
      this.view.relatedCustContractCard.setVisibility(true);
      this.view.relatedCustContractCard.flxCheckbox.setVisibility(false);
      var contract = contractData.contractOfCustomer[0].name + " ("+contractData.contractOfCustomer[0].id + ")";
      this.view.lblRelatedCustContractHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ContractExistsFor") + " "+ contract;
      this.view.relatedCustContractCard.lblContractName.text = contract;
      var data = {"customerId":this.view.detailsRelatedCust1.lblData1.text,
                  "contractData":contractData.contractOfCustomer[0]};
      this.setContractCardSegmentData(data, this.view.relatedCustContractCard.segRelatedContractsList,1,true);
    } else if(contractData.contractOfCustomer.length === 0 && contractData.contractType === "core"){
      this.view.flxRelatedCustContractCont.setVisibility(false);
      this.view.flxRelatedCustDetailsNoContracts.setVisibility(true);
      var custNameId = contractData.custSearchResponse.customers.length>0 ? contractData.custSearchResponse.customers[0].coreCustomerName + " ("+contractData.custSearchResponse.customers[0].coreCustomerId + ")" : "";
	  this.view.noResultsRelatedCustDetails.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddNewContractFor") + " "+custNameId;
      this.view.noResultsRelatedCustDetails.btnAddRecord.text = "Create New Contract";
      this.view.noResultsRelatedCustDetails.btnAddRecord.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * set data to the segment in contract card
  * @params: customer contract details obj, segment widget path
  * @param: option(related cust:1, other cust:2), showCheckbox(true/false)
  */
  setContractCardSegmentData : function(custContractData,segmenthPath, option,showCheckbox){
    var self = this;
    var widgetMap = {
      "custDetails":"custDetails",
      "serviceId":"serviceId",
      "contractId":"contractId",
      "contractName":"contractName",
      // "imgCheckbox":"imgCheckbox",
      "lblCheckbox":"lblCheckbox",
      "flxCheckbox":"flxCheckbox",
      "flxSectionCheckbox":"flxSectionCheckbox",
      "lblSectionCheckbox":"lblSectionCheckbox",
      "lblSectionCheckbox":"lblSectionCheckbox",
      "lblContractName":"lblContractName",
      "lblContractId":"lblContractId",
      "lblContractAddress":"lblContractAddress",
      "lblSeperator":"lblSeperator",
      "flxEnrollCustomerContractList":"flxEnrollCustomerContractList"
    };
    var secData ={
      "flxEnrollCustomerContractList":{"height":"50dp"},
      "flxCheckbox":{"isVisible":false},
       "lblSectionCheckbox": {"isVisible":true,"text":this.AdminConsoleCommonUtils.checkboxnormallbl},
      "flxSectionCheckbox": {"isVisible": showCheckbox,
                             "onClick":this.onCheckAccountsCheckbox.bind(this,segmenthPath,true)},
      "lblContractName": {"text":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerName_UC"),
                          "skin":"sknlblLato696c7311px"},
      "lblContractId": {"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
                        "skin":"sknlblLato696c7311px"},
      "lblContractAddress": {"text":kony.i18n.getLocalizedString("i18n.View.ADDRESS"),
                             "skin":"sknlblLato696c7311px"},
      "lblSeperator": {"text":"-","skin":"sknLblSeparator696C73"},
      "template":"flxEnrollCustomerContractList"
    };
    var contractCust = custContractData.contractData.contractCustomers;
    var segRowsData = contractCust.map(function(rec){
      var address = rec.addressLine1;
      address = address + (rec.addressLine2 ? ", "+rec.addressLine2 : "");
      var isCustAdded = self.checkIfCustomerAlreadyAdded(rec.coreCustomerId);
      var custDetail = rec;
      rec["contractId"] = custContractData.contractData.id;
      rec["contractName"] = custContractData.contractData.name;
      rec["serviceId"] = custContractData.contractData.servicedefinitionId;
      rec["serviceDefinitionName"] = custContractData.contractData.servicedefinitionName;
      return {
        "flxSectionCheckbox":{"isVisible":false},
        "lblCheckbox": {"isVisible":true,"text":(isCustAdded.isExists === true || custContractData.customerId === rec.coreCustomerId) ?
                               self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl, "skin":"sknIconBg0066CASz20pxCheckbox"},
        "flxCheckbox": {"isVisible": showCheckbox,
                        "onClick": self.onCheckAccountsCheckbox.bind(self,segmenthPath,false)},
        "lblContractName": {"text":rec.coreCustomerName},
        "lblContractId": {"text":rec.coreCustomerId},
        "lblContractAddress": address,
        "lblSeperator": {"text":"-","isVisble":true},
        "serviceId": custContractData.contractData.servicedefinitionId,
        "custDetails":rec,
        "template":"flxEnrollCustomerContractList"
      };
    });
    segRowsData[segRowsData.length -1].lblSeperator.isVisible = false;
    //update checkbox selection in header
    secData.lblSectionCheckbox.text = this.getHeaderCheckboxImage(segRowsData, true, true);
    secData.lblSectionCheckbox.skin = this.applyCheckboxSkin(secData.lblSectionCheckbox);
    segmenthPath.widgetDataMap = widgetMap;
    segmenthPath.setData([[secData,segRowsData]]);
    //enable/disable add button
    var enableFlag = secData.lblSectionCheckbox.text === self.AdminConsoleCommonUtils.checkboxnormallbl ? false : true;
    if(option === 1){
      this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsRelatedDetails.btnSave,true,enableFlag);
    }else{
      if(this.view.commonButtonsAddAnotherCust.btnSave.info.addCustCase === 1)
        this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsAddAnotherCust.btnSave,true,enableFlag);
    } 
    this.view.forceLayout();
  },
  /*
  * check if the customer id is already added in enroll list
  * @param: customer id to check
  * @returns: {"existingCust":custObj,"isExists":true/false}
  */
  checkIfCustomerAlreadyAdded : function(customerId){
    var segData = this.view.segEnrollCustList.data;
    var isExists = false,custObj = "";
    for(var i=0; i<segData.length; i++){
      if(segData[i].custId === customerId){
        custObj = segData[i];
        isExists = true;
        break;
      }
    }
    var existingCustObj = {
      "existingCust" :custObj,
      "isExists":isExists,
      "rowInd":i
    };
    return existingCustObj;
  },
  /*
  * call service for other customers search
  */
  callOtherCustomersSearch : function(){
    var customerStatus = this.view.lstBoxSearchParam23.selectedKey !== "select" ? this.view.lstBoxSearchParam23.selectedKey : "";
    var searchParam = {
      "id": this.view.textBoxEntry11.tbxEnterValue.text || "",
      "name":this.view.textBoxEntry12.tbxEnterValue.text || "",
      "email": this.view.textBoxEntry13.tbxEnterValue.text || "",
      "phoneNumber": this.view.contactNumber21.txtContactNumber.text || "",
      "phoneCountryCode": this.view.contactNumber21.txtISDCode.text || "",
      "dob":"",
      "customerStatus": customerStatus,
      "country": this.view.textBoxEntry31.tbxEnterValue.text || "",
      "town": this.view.textBoxEntry32.tbxEnterValue.text || "",
      "zipcode": this.view.textBoxEntry33.tbxEnterValue.text || "",
      "legalEntityId":this.legalentityid1 || ""
    };
    var isValid = this.validateCustSearchParamEntry();
    if(isValid){
      this.presenter.searchOtherCoreCustomers(searchParam,"enroll");
    } else{
      
    }
    
  },
  /*
  * check if atleast one search param is entered
  */
  validateCustSearchParamEntry : function(){
    var isValid = true;
    if(this.view.textBoxEntry11.tbxEnterValue.text.trim() === "" && this.view.textBoxEntry12.tbxEnterValue.text.trim() === "" &&
       this.view.textBoxEntry13.tbxEnterValue.text.trim() === "" && this.view.contactNumber21.txtContactNumber.text.trim() === "" &&
       this.view.contactNumber21.txtISDCode.text.trim() === "" && this.view.textBoxEntry31.tbxEnterValue.text.trim() === "" &&
       this.view.textBoxEntry32.tbxEnterValue.text.trim() === "" && this.view.textBoxEntry33.tbxEnterValue.text.trim() === "" &&
       this.view.lstBoxSearchParam23.selectedKey === "select" && this.view.customCalDob.value === ""){
      this.view.textBoxEntry11.flxEnterValue.skin ="sknFlxCalendarError";
      this.view.textBoxEntry12.flxEnterValue.skin = "sknFlxCalendarError";
      this.view.textBoxEntry13.flxEnterValue.skin = "sknFlxCalendarError";
      this.view.textBoxEntry31.flxEnterValue.skin = "sknFlxCalendarError";
      this.view.textBoxEntry32.flxEnterValue.skin ="sknFlxCalendarError";
      this.view.textBoxEntry33.flxEnterValue.skin = "sknFlxCalendarError";
      this.view.contactNumber21.txtISDCode.skin = "skntbxBordereb30173px";
      this.view.contactNumber21.txtContactNumber.skin = "skntbxBordereb30173px";
      this.view.lstBoxSearchParam23.skin = "sknlbxError";
      this.view.flxCalendarDob.skin = "sknFlxCalendarError";
      this.view.flxCustSearchErrorCont.setVisibility(true);
      this.showHideAdvanceSearchParam(true);
      isValid = false;
    }
    return isValid;
  },
  /*
  * clear the error for the search params in customer search screen
  */
  clearCustSearchValidation : function(){
    this.view.flxCustSearchErrorCont.setVisibility(false);
    this.view.textBoxEntry11.flxEnterValue.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.textBoxEntry12.flxEnterValue.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.textBoxEntry13.flxEnterValue.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.textBoxEntry31.flxEnterValue.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.textBoxEntry32.flxEnterValue.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.textBoxEntry33.flxEnterValue.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.contactNumber21.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.contactNumber21.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.flxCalendarDob.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.lstBoxSearchParam23.skin = "sknLbxborderd7d9e03pxradius";
  },
  /*
  * clear the search fields in other customer search screen
  */
  clearOtherCustSearchFields : function(){
    this.view.textBoxEntry11.tbxEnterValue.text = "";
    this.view.textBoxEntry12.tbxEnterValue.text = "";
    this.view.textBoxEntry13.tbxEnterValue.text = "";
    this.view.textBoxEntry31.tbxEnterValue.text = "";
    this.view.textBoxEntry32.tbxEnterValue.text = "";
    this.view.textBoxEntry33.tbxEnterValue.text = "";
    this.view.contactNumber21.txtContactNumber.text ="";
    this.view.contactNumber21.txtISDCode.text = "";
    this.view.lstBoxSearchParam23.selectedKey = "select";
    this.view.customCalDob.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.customCalDob.value = "";
    this.view.noResultsSearchCustomers.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchCustomerToSeeContactExists");
  },
  /*
  * set results data to segment on search for other customers
  * @param: search results list of other customer
  */
  setSearchCustomerResultData : function(custList){
    var widgetMap = {
      "custDetails": "custDetails",
      "lblSearchSegHeaderCustId":"lblSearchSegHeaderCustId",
      "lblSearchSegHeaderCustName":"lblSearchSegHeaderCustName",
      "lblSearchSegHeaderEmail":"lblSearchSegHeaderEmail",
      "lblSearchSegHeaderPhoneNum":"lblSearchSegHeaderPhoneNum",
      "lblSeperator":"lblSeperator",
      "flxEnrollCustomerSearchResult":"flxEnrollCustomerSearchResult"
    };
    if(custList && custList.length > 1){
      var segData = custList.map(function(rec){
        return {
          "lblSearchSegHeaderCustId": {"text":rec.coreCustomerId},
          "lblSearchSegHeaderCustName": {"text": rec.coreCustomerName},
          "lblSearchSegHeaderEmail": {"text":rec.email},
          "lblSearchSegHeaderPhoneNum": {"text":rec.phone},
          "lblSeperator":"-",
          "custDetails": rec,
          "template":"flxEnrollCustomerSearchResult"
        };
      });
      this.sortBy = this.getObjectSorter("lblSearchSegHeaderCustId.text");
      this.sortBy.inAscendingOrder = true;
      this.view.segSearchResultsCust.widgetDataMap = widgetMap;
      var sortedData = segData.sort(this.sortBy.sortData);
      this.view.segSearchResultsCust.setData(sortedData);
      
      this.view.flxNoResultsContainer.setVisibility(false);
      this.view.flxSearchResultsForAddCust.setVisibility(true);
      this.view.lblSelectedSearchCriteria.text = kony.i18n.getLocalizedString("i18n.contracts.searchResults")+ " ("+sortedData.length + ")";
    } else{
      this.view.flxSearchResultsForAddCust.setVisibility(false);
      this.view.flxNoResultsContainer.setVisibility(true);
      this.view.noResultsSearchCustomers.lblNoRecordsAvailable.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.noResultsSearchCustomers.btnAddRecord.setVisibility(false);
    }
    
    this.view.forceLayout();
  },
  /*
  * fetch the contract details of the selectd customer
  * @param: segment widget path, option-1/2(relatedCust:1,otherCust:2)
  */
  fetchContractDetailsOfCustomer : function(segmentPath, option){
    var selRowInd = segmentPath.selectedRowIndex[1];
    var rowData = segmentPath.data[selRowInd];
    var custDetails = {"customers":[]};
    custDetails.customers.push(rowData.custDetails);
    this.presenter.getCoreCustomerContractDetails({"coreCustomerId":rowData.custDetails.coreCustomerId,"legalEntityId": this.legalentityid1 || ""}, option, custDetails);
  },
  /*
  * set contracts data for the searched/selected single customer
  */
  setSelectedOtherCustContractCards : function(contractDetails,custDetails){
    this.view.addAdditionalCustContractList.setVisibility(true);
    this.view.flxCustomerContractsList.setVisibility(false);
    this.view.btnAddContract.setVisibility(false);
    this.view.addAdditionalCustContractList.flxCheckbox.setVisibility(false);
    
    if(contractDetails.length > 0){
      var contract = contractDetails[0].name + " ("+contractDetails[0].id + ")"
      this.view.lblContractListHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.ContractExistsFor") + " "+ contract;
      this.view.addAdditionalCustContractList.lblContractName.text = contract;
      var contractData = {"customerId":custDetails.id,
                          "contractData":contractDetails[0]}
      this.setContractCardSegmentData(contractData,this.view.addAdditionalCustContractList.segRelatedContractsList, 2, true);
    } 
    this.view.forceLayout();
  },
  /*
  * set the related contracts data for the searched customer without direct contracts
  * @param: related contracts list, searched customer response
  */
  setSearchedCustRelatedContractCards : function(contract,searchCustDetails){
    this.view.addAdditionalCustContractList.setVisibility(false);
    this.view.flxCustomerContractsList.setVisibility(true);
    this.view.flxCustomerContractsList.removeAll();
    this.view.lblContractListHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.RelatedContracts")+ " ("+ contract.length +")";
    var compWidth = this.view.flxAddAnotherCustScreen.frame.width -40;
    for (var i = 0; i < contract.length; i++) {
      var num = i>10 ? i : "0"+i;
      var customerToAdd = new com.adminConsole.enrollCustomer.contractsList({
        "id": "customerContract" +num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": "15px",
        "left":"20dp",
        "width": compWidth
      }, {}, {});
      customerToAdd.segRelatedContractsList.top = "0dp";
      customerToAdd.flxCustomersListHeader.isVisible = false;
      customerToAdd.flxCheckbox.isVisible = true;
      customerToAdd.lblCheckbox.text = (i===0) ? this.AdminConsoleCommonUtils.radioSelected : this.AdminConsoleCommonUtils.radioNotSelected;
      customerToAdd.toggleCollapseArrow((i===0 ? true :false));
      customerToAdd.flxCheckbox.onClick = this.onSelectRelatedContractCard.bind(this,customerToAdd, this.view.flxCustomerContractsList);
      customerToAdd.flxArrow.onClick = this.toggleCardForContracts.bind(this,customerToAdd, this.view.flxCustomerContractsList);
      var contractTitle = contract[i].name + " (" + contract[i].id +")";
      customerToAdd.lblContractName.text = contractTitle;
      customerToAdd.info = {"contracts": contract[i], "searchCustDetails" : searchCustDetails};
      var data = {
        "customerId": this.view.detailsRelatedCust1.lblData1.text,
        "contractData": contract[i]
      };
      this.view.flxCustomerContractsList.add(customerToAdd);
      this.setContractCardSegmentData(data,customerToAdd.segRelatedContractsList, 2, false);
    }
    this.view.forceLayout();

  },
  /*
  * expand/collapse selected card listing container visibility for contract
  * @param: contract card widget path, path of all cards container flex
  */
  toggleCardForContracts : function(cardWidget,parentFlexCont){
    var listArr = parentFlexCont.widgets();
    for(var i=0; i<listArr.length; i++){
      if(listArr[i].id === cardWidget.id){
        var visibilityCheck = cardWidget.flxBottomContainer.isVisible;
        cardWidget.toggleCollapseArrow(!visibilityCheck);
      }
      else{
        this.view[listArr[i].id].toggleCollapseArrow(false);
      }
    }
  },
  /*
  * on selecting any related contract from the list
  * @param: crelated contract card path, path of all cards container flex
  */
  onSelectRelatedContractCard : function(cardWidget, parentFlexCont){
    var listArr = parentFlexCont.widgets();
    for(var i=0; i< listArr.length; i++){
      if(listArr[i].id === cardWidget.id){
        listArr[i].lblCheckbox.text = this.AdminConsoleCommonUtils.radioSelected;
        this.toggleCardForContracts(cardWidget, parentFlexCont);
      } else{
        listArr[i].lblCheckbox.text = this.AdminConsoleCommonUtils.radioNotSelected;
      }
    } 
  },
  /*
  * perform different actions on click of add based on selected customer/contract
  */
  onClickToAddSearchCustomers : function(){
    // contract exists for the customer
    if (this.view.commonButtonsAddAnotherCust.btnSave.info.addCustCase === 1) {
      if (this.enrollAction === this.actionConfig.create)
        this.addNewCustomerToEnroll(this.view.addAdditionalCustContractList.segRelatedContractsList);
      else
        this.addNewCustomerToEditFlow(this.view.addAdditionalCustContractList.segRelatedContractsList);
      this.showEnrollCustomer();
    } // realted contract of the customer
    else if(this.view.commonButtonsAddAnotherCust.btnSave.info.addCustCase === 2){
      this.showEditContractConfirmationPopup();
    }
    else {

    }
  },
  /*
  * fetch the data required for edit user access of each customer
  */
  fetchEditUserAccessDetails: function(){
    var self=this;
    var enrollCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var serviceId = enrollCustData.lstBoxService.selectedKey;
    var roleId = enrollCustData.lstBoxRole.selectedKey;
    var custId = [enrollCustData.custId];
    var custIdArr = [{"coreCustomerId": "",
                      "serviceDefinitionId": serviceId,
                      "roleId":roleId}];
    var inputParam = {};
    if(this.prevRole[custId].key==="SELECT" || this.prevRole[custId].key==="select"){
      this.prevRole[custId]={"key":enrollCustData.lstBoxRole.selectedKey,"value":enrollCustData.lstBoxRole.selectedkeyvalue[1]};
      if(enrollCustData.custDetails.contractId === ""){ //contract not yet created
        inputParam = {"coreCustomerId": custId,
                      "contractId":"",
                      "coreCustomerRoleIdList": JSON.stringify(custIdArr),
                        "serviceDefinitionId":serviceId,
                      "roleId":roleId,
                      "legalEntityId":self.legalentityid1 || ""
                     };
        //this.presenter.fetchAccountsServiceRoleFeatures(inputParam);
        self.presenter.fetchServiceDefRoleDataForUser(inputParam);
      } else{ // contract already exists
        custIdArr[0].coreCustomerId = custId[0];
        inputParam = {"coreCustomerId":custId,
                      "contractId":"",
                      "coreCustomerRoleIdList": JSON.stringify(custIdArr),
                      "serviceDefinitionId": serviceId,
                      "roleId":roleId,
                      "legalEntityId":self.legalentityid1 || ""
                     };
        inputParam.contractId =  enrollCustData.custDetails.contractId;
        this.presenter.fetchContractServiceDefRoleDataForUser(inputParam);
      }
    } else {
      self.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg1") + enrollCustData.lstBoxRole.selectedkeyvalue[1];
      if(self.prevRole[enrollCustData.lblCustomerId.text].value===undefined)
        self.view.popUpDeactivate.rtxPopUpDisclaimer.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.assignNewRoleMessage")+" " +enrollCustData.lstBoxRole.selectedkeyvalue[1]+kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg3") + " \"" + enrollCustData.lblCustomerName.text + "(" + enrollCustData.lblCustomerId.text + ") " + kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg4");
      else
        self.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg2") + " \"" + self.prevRole[enrollCustData.lblCustomerId.text].value + "\" to \"" + enrollCustData.lstBoxRole.selectedkeyvalue[1] + kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg3") + " \"" + enrollCustData.lblCustomerName.text + "(" + enrollCustData.lblCustomerId.text + ") " + kony.i18n.getLocalizedString("i18n.frmCompanies.changeRoleMsg4");
      self.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.confirmAndSave");// + " \"" + enrollCustData.lstBoxRole.selectedkeyvalue[1] + "\" " + kony.i18n.getLocalizedString("i18n.frmPermissions.btnRoles");
      self.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
      self.view.popUpDeactivate.flxPopUpTopColor.skin = "sknFlxTopColor4A77A0";
      if(enrollCustData.lstBoxRole.selectedKey !== "select" || enrollCustData.lstBoxRole.selectedKey !== "SELECT"){
      self.view.flxEnrollCustConfirmationPopup.setVisibility(true);
      }
      kony.adminConsole.utils.hideProgressBar(self.view);
      self.view.forceLayout();
      self.view.popUpDeactivate.btnPopUpDelete.onClick = function () {
        self.prevRole[enrollCustData.lblCustomerId.text] = { "key": enrollCustData.lstBoxRole.selectedKey, "value": enrollCustData.lstBoxRole.selectedkeyvalue[1] };
        if(self.enrollAction !== self.actionConfig.create)
        	self.updateCustomersListGlobalVar(enrollCustData.lblCustomerId.text,roleId);
        self.view.flxEnrollCustConfirmationPopup.setVisibility(false);
        if(enrollCustData.custDetails.contractId === ""){ //contract not yet created
          inputParam = {"coreCustomerId": custId,
                        "contractId":"",
                        "coreCustomerRoleIdList": JSON.stringify(custIdArr),
                          "serviceDefinitionId":serviceId,
                        "roleId":roleId,
                        "legalEntityId":self.legalentityid1 || ""
                       };
          self.presenter.fetchServiceDefRoleDataForUser(inputParam);
        } else { // contract already exists
          custIdArr[0].coreCustomerId = custId[0];
          inputParam = {"coreCustomerId":custId,
                        "contractId":"",
                        "coreCustomerRoleIdList": JSON.stringify(custIdArr),
                        "serviceDefinitionId": serviceId,
                        "roleId":roleId,
                        "legalEntityId":self.legalentityid1 || ""
        };
          inputParam.contractId =  enrollCustData.custDetails.contractId;
          self.presenter.fetchContractServiceDefRoleDataForUser(inputParam);
        }
        self.view.forceLayout();
      };
      this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
        enrollCustData.lstBoxRole.selectedKey=self.prevRole[enrollCustData.lblCustomerId.text].key;
        enrollCustData.lstBoxRole.selectedkey=self.prevRole[enrollCustData.lblCustomerId.text].key;
        self.view.flxEnrollCustConfirmationPopup.setVisibility(false);
        self.view.segEnrollCustList.setDataAt(enrollCustData,self.enrollSegRowInd);
        self.view.forceLayout();
      };
    }
  },
  /*
  * fetch the data required for creating temporary contract payload
  */
  fetchCreateContractDetails: function(){
    var enrollCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var serviceId = enrollCustData.lstBoxService.selectedKey;
    var roleId = enrollCustData.lstBoxService.selectedKey;
    var custId = [enrollCustData.custId];
    var inputParam = {"coreCustomerId": custId,
                      "serviceDefinitionId": serviceId,
                      "legalEntityId":this.legalentityid1 || ""};
    if(enrollCustData.flxPrimary.isVisible === true){
      this.presenter.fetchAccountsServiceFeatures(inputParam);
    }
    
  },
  /*
  * form getContractDetails response structure
  * @param: contract related account, features details
  * @return: getContractDetails payload
  */
  constructGetContractDetailsPayload : function(createContractDetails){
    var features = createContractDetails.features || [];
    var limits = createContractDetails.limits || [];
    var custInfo = createContractDetails.customerDetails;
    var accounts = createContractDetails.accounts || [];
    var assignedAcc = [], assignedFeatures = [], custRecordData;
    this.action = this.actionConfig.create;
    var enrollCust = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    for(let i=0;i<limits.length;i++){
      for(let j=0;j<features.length;j++){
        if(features[j].featureId===limits[i].featureId){
          features[j]=this.getCombinedFeature(features[j],limits[i]);
        }
      }
    }
    this.setGlobalMonetaryActions(limits);
    //to get bussiness type from search result records param
    for(var a=0; a< this.enrollCustomerRecordData.length; a++){
      var custId = custInfo.Customer_id || custInfo.primaryCustomerId;
      var currCust = this.enrollCustomerRecordData[a].Customer_id || this.enrollCustomerRecordData[a].primaryCustomerId;
      if(currCust === custId){
        custRecordData = this.enrollCustomerRecordData[a];
      }
    }
    var phnNum = custInfo.PrimaryPhoneNumber ? custInfo.PrimaryPhoneNumber.split("-") : [];
    var isd = phnNum.length === 2 ? 
        (phnNum[0].indexOf("+") >= 0 ? phnNum[0] : "+"+phnNum[0] ): "";
    var communication =[{
      "phoneNumber": phnNum.length === 2 ? phnNum[1] : (phnNum.length === 1 ? phnNum[0] : ""),
      "phoneCountryCode": isd,
      "email":custInfo.PrimaryEmailAddress || "",
      
    }];
    var currCustContact = this.presenter.getCurrentCustomerContactInfo();
    var addrInfo = currCustContact.Addresses && currCustContact.Addresses.length > 0 ?currCustContact.Addresses[0]:"";
    var address = [{
      "country":addrInfo ? addrInfo.CountryName : "",
      "cityName": addrInfo ? addrInfo.CityName : "",
      "state": addrInfo ? addrInfo.RegionName : "",
      "zipCode": addrInfo ? addrInfo.ZipCode : "",
      "addressLine1":addrInfo ? addrInfo.AddressLine1 : "",
      "addressLine2": addrInfo ? addrInfo.AddressLine2 : ""
    }];
    let coreCustId = custInfo.Customer_id || custInfo.primaryCustomerId;
    var contractCustomers = [{
      "isPrimary": "true",
      "isBusiness": custInfo.isBusiness ? custInfo.isBusiness : (custRecordData ? custRecordData.isBusiness : ""),
      //"coreCustomerId": custInfo.Customer_id || custInfo.primaryCustomerId,
      "coreCustomerId": coreCustId,
      "coreCustomerName": custInfo.Name,
      "sectorId": custInfo.sectorId,
      "accounts":accounts,
      "customerAccounts":accounts,
      "legalEntityId":this.legalentityid1 || ""
    }];
    // form getContractDEtails service structure for temp contract edit
    var contractDetails = {
      "contractId": "",
      //"contractName": custInfo.Name,
      "contractName": custInfo.Name + " " + coreCustId, //appending custId for creating unique name
      "serviceDefinitionName": this.view.segEnrollCustList.data[0].lstBoxService.selectedKeyValue[1],
      "serviceDefinitionId":this.view.segEnrollCustList.data[0].lstBoxService.selectedKeyValue[0],
      "faxId":"",
      "communication": communication ,
      "address": address,
      "contractCustomers": contractCustomers,
      "legalEntityId":this.legalentityid1 || ""
    };
    //create contractFeaturesActions service response structure for temp contract edit
    var accountFeatures = {
      "features":[{"isPrimary": "true",
                   "coreCustomerId": custInfo.Customer_id || custInfo.primaryCustomerId,
                   "coreCustomerName": custInfo.Name,
                   "contractCustomerFeatures": features}],
      "limits":[{"isPrimary": "true",
                   "coreCustomerId": custInfo.Customer_id || custInfo.primaryCustomerId,
                   "coreCustomerName": custInfo.Name,
                   "contractCustomerLimits": limits}]
    };
    this.bulkUpdateAllFeaturesListContract=JSON.parse(JSON.stringify(features));//used for contract bulk update popup data
    this.completeContractDetails.customercontext = {};
    this.completeContractDetails.contractDetails = contractDetails;
    this.completeContractDetails.accountsFeatures = accountFeatures;
    this.completeContractDetails.contractCustomers = [enrollCust.custDetails];
    this.createTempContractPayload();
    
  },
   /*
  * form payload to create a temp contract
  * @return: create contract payload
  */
  createTempContractPayload : function(){
	var self =this;
    var features = this.completeContractDetails.accountsFeatures.features[0].contractCustomerFeatures || [];
    var limits = this.completeContractDetails.accountsFeatures.limits[0].contractCustomerLimits || [];
    var contractInfo = this.completeContractDetails.contractDetails;
    var accounts = contractInfo.contractCustomers[0] ? contractInfo.contractCustomers[0].accounts : [];
    var assignedAcc =[], assignedFeatures =[];
    
    for(let i=0;i<limits.length;i++){
      for(let j=0;j<features.length;j++){
        if(features[j].featureId===limits[i].featureId){
          features[j]=this.getCombinedFeature(features[j],limits[i]);
        }
      }
    }
    assignedFeatures = features.map(function(feature){
      var actions =[];
      actions = feature.actions.map(function(action){
        var actionJson = {
          "actionId": action.actionId,
          "actionName": action.actionName,
          "actionDescription": action.actionDescription,
          "isAllowed":"true",
          "type": action.type ? action.type : self.AdminConsoleCommonUtils.constantConfig.NON_MONETARY,
          "actionStatus": action.actionStatus || ""
        };
        if(action.limits)
          actionJson["limits"] = action.limits;
        return actionJson;
      });
      return {
        "featureId": feature.featureId,
        "featureName": feature.featureName,
        "featureDescription": feature.featureDescription,
        "featureStatus":feature.featureStatus || "",
		"type": feature.type ? feature.type : self.AdminConsoleCommonUtils.constantConfig.NON_MONETARY,
        "actions": actions
      };
    });
    assignedAcc = accounts.map(function(rec){
      return {
        "accountId": rec.accountNumber || rec.accountId,
        "accountType": rec.accountType,
        "accountName": rec.accountName,
        "typeId": rec.typeId || "",
        "ownerType": rec.ownerType,
        "isAssociated": "true",// rec.isAssociated
        "accountHolderName": rec.accountHolderName,
        "accountStatus": rec.accountStatus,
        "productId": rec.productId,
        "arrangementId": rec.arrangementId
      }
    });
    var contractCustomers =[{
      "isPrimary": contractInfo.contractCustomers[0].isPrimary,
      "isBusiness": contractInfo.contractCustomers[0].isBusiness,
      "sectorId":contractInfo.contractCustomers[0].sectorId,
      "coreCustomerId": contractInfo.contractCustomers[0].coreCustomerId,
      "coreCustomerName": contractInfo.contractCustomers[0].coreCustomerName,
      "accounts":assignedAcc,
      "features": assignedFeatures
    }];

    var communication =contractInfo.communication ? contractInfo.communication : [];
    var addrInfo = contractInfo.address || [];
    this.createContractRequestParam = {
      "contractName": contractInfo.contractName,
      "legalEntityId":this.legalentityid1 || "",
      "serviceDefinitionName": contractInfo.serviceDefinitionName,
      "serviceDefinitionId": contractInfo.serviceDefinitionId,
      "faxId": contractInfo.faxId || "",
      "communication": JSON.stringify(communication) ,
      "address": JSON.stringify(addrInfo),
      "contractCustomers": JSON.stringify(contractCustomers),
      "accountLevelPermissions":[]
    };
    this.getAccountLvlFeaturesActions(); // to make sure all the accounts features and actions fetched all at once instead of every check/uncheck of accounts
    this.presenter.setCreateContractPayload(this.createContractRequestParam);
    this.initializeContractGlobalLevelFeatures(contractCustomers);
  },
  /*
  * show customer's details in the popup
  * @param: customer details json
  */
  showCustomerDetailsPopup : function(details){
    this.view.flxContractDetailsPopup.setVisibility(true);
    this.view.contractDetailsPopup.showBackButton(false);
    this.view.contractDetailsPopup.setDataForPopup(details);
    this.view.forceLayout();
    
  },
  /*
  * create enroll customer request param
  */
  createEnrollCustomerRequestParam: function (isSingleRecSave) {
    var enrollCustReqParam = {
      "userDetails":"",
      "companyList":[],
      "accountLevelPermissions":[],
      "globalLevelPermissions":[],
      "transactionLimits":[],
      "signatoryGroups":[]
    };
    var enrollSegData = this.view.segEnrollCustList.data;
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var selectedIndex;
    if(isSingleRecSave)
     selectedIndex = this.view.segEnrollCustList.selectedRowIndex?this.view.segEnrollCustList.selectedRowIndex[1]:0;
    var companyList = [], limits = [];
    //var phnNum = customerDetails.PrimaryPhoneNumber ? customerDetails.PrimaryPhoneNumber.split("-") : [];
    //var isd = phnNum.length === 2 ? 
    //(phnNum[0].indexOf("+") >= 0 ? phnNum[0] : "+"+phnNum[0]): "";
    var phnNumInfo = this.getPhoneNumber();
    var cust = {
      "firstName": customerDetails.FirstName || "",
      "lastName": customerDetails.LastName || "",
      "middleName": customerDetails.MiddleName || "",
      //"phoneNumber": phnNum.length === 2 ? phnNum[1] : (phnNum.length === 1 ? phnNum[0] : ""),
      //"phoneCountryCode": isd,
      "phoneNumber": phnNumInfo.phone ? phnNumInfo.phone : "",
      "phoneCountryCode": phnNumInfo.isd ? phnNumInfo.isd : "",
      "dob": customerDetails.DateOfBirth,
      "drivingLicenseNumber": customerDetails.DrivingLicenseNumber || "",
      "coreCustomerId": customerDetails.Customer_id || customerDetails.primaryCustomerId,
      "email": customerDetails.PrimaryEmailAddress || "",
      "isEnrolled": false,
      "legalEntityId":this.legalentityid1 ||""
    };
    enrollCustReqParam.companyList = JSON.stringify(this.getEnrollCustCompanyList(selectedIndex));
    var features = this.getEnrollCustFeaturesList(selectedIndex);
    enrollCustReqParam.userDetails = JSON.stringify(cust);
    enrollCustReqParam.accountLevelPermissions = JSON.stringify(features.accountLevelPermissions);
    enrollCustReqParam.globalLevelPermissions = JSON.stringify(features.globalLevelPermissions);
    var contractDetails = this.appendContractDetailsRequired();
    if (contractDetails && Object.keys(contractDetails).length > 0) {
      enrollCustReqParam["contractDetails"] = JSON.stringify(contractDetails);
      var updatedUserDetails = this.updateEnrollUserDetailsFromContract(cust, contractDetails);
      var updatedFeaturesJson = this.updateFeatureActionsJsonObj(contractDetails);
      enrollCustReqParam.userDetails = JSON.stringify(updatedUserDetails);
      enrollCustReqParam.contractCustomers = contractDetails.contractCustomers;
    }

    limits = this.getEnrollCustLimitsList(selectedIndex);
    var signGroups = this.getEnrollCustSignGroups(selectedIndex);
    enrollCustReqParam.transactionLimits = JSON.stringify(limits);
    enrollCustReqParam.signatoryGroups = JSON.stringify(signGroups);
    this.callEnrollEditCustomerService(enrollCustReqParam);
    
  },

  createEnrollCustomerRequestParam1: function(isSingleRecSave) {
    var enrollCustReqParam = {
        "userDetails": "",
        "companyList": [],
        "accountLevelPermissions": [],
        "globalLevelPermissions": [],
        "transactionLimits": [],
        "signatoryGroups": []
    };
    
    var enrollSegData = this.view.segEnrollCustList.data;
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var selectedIndex;
    if (isSingleRecSave) selectedIndex = this.view.segEnrollCustList.selectedRowIndex ? this.view.segEnrollCustList.selectedRowIndex[1] : 0;
    var companyList = [],
        limits = [];
    //var phnNum = customerDetails.PrimaryPhoneNumber ? customerDetails.PrimaryPhoneNumber.split("-") : [];
    //var isd = phnNum.length === 2 ? 
    //(phnNum[0].indexOf("+") >= 0 ? phnNum[0] : "+"+phnNum[0]): "";
    var phnNumInfo = this.getPhoneNumber();
    var cust = {
        "firstName": customerDetails.FirstName || "",
        "lastName": customerDetails.LastName || "",
        "middleName": customerDetails.MiddleName || "",
        //"phoneNumber": phnNum.length === 2 ? phnNum[1] : (phnNum.length === 1 ? phnNum[0] : ""),
        //"phoneCountryCode": isd,
        "phoneNumber": phnNumInfo.phone ? phnNumInfo.phone : "",
        "phoneCountryCode": phnNumInfo.isd ? phnNumInfo.isd : "",
        "dob": customerDetails.DateOfBirth,
        "drivingLicenseNumber": customerDetails.DrivingLicenseNumber || "",
        "coreCustomerId": customerDetails.Customer_id || customerDetails.primaryCustomerId,
        "email": customerDetails.PrimaryEmailAddress || "",
        "isEnrolled": false,
        "legalEntityId": this.legalentityid1 || "",
        // "ID": test.Customer['CustomerId'],
        "id":this.customerUserId,
    };
    enrollCustReqParam.companyList = JSON.stringify(this.getEnrollCustCompanyList(selectedIndex));
    var features = this.getEnrollCustFeaturesList(selectedIndex);
    enrollCustReqParam.userDetails = JSON.stringify(cust);
    enrollCustReqParam.accountLevelPermissions = JSON.stringify(features.accountLevelPermissions);
    enrollCustReqParam.globalLevelPermissions = JSON.stringify(features.globalLevelPermissions);
    var contractDetails = this.appendContractDetailsRequired();
    if (contractDetails && Object.keys(contractDetails).length > 0) {
        enrollCustReqParam["contractDetails"] = JSON.stringify(contractDetails);
        var updatedUserDetails = this.updateEnrollUserDetailsFromContract(cust, contractDetails);
        var updatedFeaturesJson = this.updateFeatureActionsJsonObj(contractDetails);
        enrollCustReqParam.userDetails = JSON.stringify(updatedUserDetails);
        enrollCustReqParam.contractCustomers = contractDetails.contractCustomers;
    }
    limits = this.getEnrollCustLimitsList(selectedIndex);
    var signGroups = this.getEnrollCustSignGroups(selectedIndex);
    enrollCustReqParam.transactionLimits = JSON.stringify(limits);
    enrollCustReqParam.signatoryGroups = JSON.stringify(signGroups);
    //this.callEnrollEditCustomerService(enrollCustReqParam);
    this.callassignuseridservice(enrollCustReqParam);
},
  /*
  * call the required enroll/edit user service based on operation
  * @param: input request param for service
  */
  callEnrollEditCustomerService: function (enrollCustReqParam) {
    //     //to edit suspended user from OLB application
    //     if(this.enrollAction === this.actionConfig.create&&this.view.commonButtons.btnSave.text === kony.i18n.getLocalizedString("i18n.frmOutageMessageController.UPDATE")){
    //       this.presenter.editInfinityUser(enrollCustReqParam);
    //     }else 
    if (this.enrollAction === this.actionConfig.create) {
      this.resetFlagValOnFormLeave();
      this.presenter.enrollCustomer(enrollCustReqParam);
    } else if (this.enrollAction === this.actionConfig.edit || this.enrollAction === this.actionConfig.editSingleUser) {
      //remove uneccessary fields
      var userDetails = JSON.parse(enrollCustReqParam.userDetails);
      userDetails["id"] = this.customerToEnrollInfo.Customer_id;
      delete userDetails.coreCustomerId;
      delete userDetails.isEnrolled;
      enrollCustReqParam.userDetails = JSON.stringify(userDetails);
      enrollCustReqParam["removedCompanies"] = JSON.stringify(Object.values(this.removedEnrollCustomers));
      this.presenter.editInfinityUser(enrollCustReqParam, "SINGLE_EDIT");
      this.resetFlagValOnFormLeave();
    } else if (this.enrollAction === this.actionConfig.editUser) {
      var userDetails = JSON.parse(enrollCustReqParam.userDetails);
      userDetails["id"] = this.customerToEnrollInfo.Customer_id;
      delete userDetails.coreCustomerId;
      delete userDetails.isEnrolled;
      enrollCustReqParam.userDetails = JSON.stringify(userDetails);
      enrollCustReqParam["removedCompanies"]  = JSON.stringify([]);
      this.presenter.editInfinityUser(enrollCustReqParam);
      this.resetFlagValOnFormLeave();
    }
  },

  callassignuseridservice: function(enrollCustReqParam) {
    var userDetails = JSON.parse(enrollCustReqParam.userDetails);
    //userDetails["id"] = this.customerToEnrollInfo.Customer_id;
    //delete userDetails.coreCustomerId;
    //delete userDetails.isEnrolled;
    enrollCustReqParam.userDetails = JSON.stringify(userDetails);
    enrollCustReqParam["removedCompanies"] = JSON.stringify([]);
    this.presenter.editInfinityUserassignuserid(enrollCustReqParam);
    this.resetFlagValOnFormLeave();
},
  /*
  * append the temporary contract details for own customer
  */
  appendContractDetailsRequired: function () {
    var enrollSegData = this.view.segEnrollCustList.data;
    var limitJSON = {}, featureActions = [], featureJSON = {};
    var contractDetails = "", accList = [],contractPayload = {};
    for (var i = 0; i < enrollSegData.length; i++) {
      //if(enrollSegData[i].custDetails.contractId === ""){
      if (enrollSegData[i].custDetails.contractId === "" && enrollSegData[i].lblRemoved.isVisible === false) {
        contractDetails = this.presenter.getCreateContractPayload();
        contractPayload.contractName = contractDetails.contractName;
        contractPayload.legalEntityId = this.legalentityid1 || "";
        contractPayload.serviceDefinitionName = contractDetails.serviceDefinitionName;
        contractPayload.serviceDefinitionId = contractDetails.serviceDefinitionId;
        contractPayload.faxId = contractDetails.faxId;
        contractPayload.communication = typeof contractDetails.communication == "string" ? 
                                           contractDetails.communication : JSON.stringify(contractDetails.communication);
        contractPayload.address = typeof contractDetails.address == "string" ? 
                                           contractDetails.address : JSON.stringify(contractDetails.address);
        
        contractDetails.accountLevelPermissions=this.createContractRequestParam.accountLevelPermissions;
        var contractCust = JSON.parse(contractDetails.contractCustomers);
        for (var a = 0; a < contractCust.length; a++) {
          delete contractCust[a].features;
          for (var b = 0; b < contractCust[a].accounts.length; b++) {
            if (contractCust[a].accounts[b].isEnabled) {
              if (contractCust[a].accounts[b].isEnabled === "true")
                accList.push(contractCust[a].accounts[b]);
            } else {
              accList.push(contractCust[a].accounts[b]);
            }
          }
          contractCust[a].accounts = accList;
        }
        //filter only selected account
       /* for (var a = 0; a < contractCust.length; a++) {
          accList = [];
          for (var b = 0; b < contractCust[a].accounts.length; b++) {
            if (contractCust[a].accounts[b].isEnabled) {
              if (contractCust[a].accounts[b].isEnabled === "true")
                accList.push(contractCust[a].accounts[b]);
            } else {
              accList.push(contractCust[a].accounts[b]);
            }
          }
          contractCust[a].accounts = accList;
          //contractCust[a].features=[];
          limitJSON = {
            "coreCustomerName": contractCust[a].coreCustomerName,
            "coreCustomerId": contractCust[a].coreCustomerId,
            "featurePermissions": []
          };
          
              var limitFeatureJSON = {};
              for (var b = 0; b < contractCust[a].features.length; b++) {
                featureActions = [];
                for (var c = 0; c < contractCust[a].features[b].permissions.length; c++) {
                  if (contractCust[a].features[b].permissions[c].isEnabled === undefined || contractCust[a].features[b].permissions[c].isEnabled === null) {
                    //if the user has neither selected nor unselected this actions
                    contractCust[a].features[b].permissions[c].isEnabled = "true";
                  }
                  featureActions[c] = {
                    "actionId": contractCust[a].features[b].permissions[c].id || contractCust[a].features[b].permissions[c].actionId,
                    "actionName": contractCust[a].features[b].permissions[c].name || contractCust[a].features[b].permissions[c].actionName,
                    "actionDescription": contractCust[a].features[b].permissions[c].description || contractCust[a].features[b].permissions[c].actionDescription,
                    "isEnabled": contractCust[a].features[b].permissions[c].isEnabled,
                  };
                  if (contractCust[a].features[b].permissions[c].limits) {
                    limitFeatureJSON = {
                      "featureId": contractCust[a].features[b].id || contractCust[a].features[b].featureId,
                      "actionId": contractCust[a].features[b].permissions[c].id || contractCust[a].features[b].permissions[c].actionId,
                      "actionName": contractCust[a].features[b].permissions[c].name || contractCust[a].features[b].permissions[c].actionName,
                      "actionDescription": contractCust[a].features[b].permissions[c].description || contractCust[a].features[b].permissions[c].actionDescription,
                      "limits": contractCust[a].features[b].permissions[c].limits
                    }
                    limitJSON.featurePermissions.push(limitFeatureJSON);
                  }
                }
                featureJSON = {
                  "featureName": contractCust[a].features[b].name || contractCust[a].features[b].featureName,
                  "featureId": contractCust[a].features[b].id || contractCust[a].features[b].featureId,
                  "featureDescription": contractCust[a].features[b].description || contractCust[a].features[b].featureDescription,
                  "permissions": featureActions
                };
                contractCust[a].features[b] = featureJSON;
              }

              contractDetails.transactionLimits.push(limitJSON);
              contractDetails.globalLevelPermissions.push({
                "coreCustomerName": contractCust[a].coreCustomerName,
                "coreCustomerId": contractCust[a].coreCustomerId,
                "features": contractCust[a].features
              });
              delete contractCust[a].features;
        }*/
        for (var m = 0; m < contractDetails.accountLevelPermissions.length; m++)
          contractDetails.accountLevelPermissions[m].accounts = this.formatAccountLevelPermissions(JSON.parse(JSON.stringify(contractDetails.accountLevelPermissions[m].accounts)));
        
        contractPayload.globalLevelPermissions1 = JSON.stringify(contractDetails.globalLevelPermissions);
        contractPayload.accountLevelPermissions1 = JSON.stringify(contractDetails.accountLevelPermissions);
        contractPayload.transactionLimits1 = JSON.stringify(contractDetails.transactionLimits);
        contractPayload.contractCustomers = JSON.stringify(contractCust);
        break;
      }
    }
    return contractPayload;
  },
  /*
  * update enrolling user details from temp contract if edited
  * @param: user details, temp contract details
  * @return: updated user details
  */
  updateEnrollUserDetailsFromContract : function(userDetails, contractDetails){
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var enrollUserId = customerDetails.Customer_id || customerDetails.primaryCustomerId;
    var contractCust = JSON.parse(contractDetails.contractCustomers);
    for(var i=0; i< contractCust.length; i++){
      //if the primary user is the primary customer in the contract
      if(contractCust[i].coreCustomerId === enrollUserId && 
        contractCust[i].isPrimary === "true"){
        var communication = JSON.parse(contractDetails.communication);
        userDetails.phoneNumber = communication[0] ? (communication[0].phoneNumber !== "" ? communication[0].phoneNumber : userDetails.phoneNumber) :
                                  userDetails.phoneNumber;
        userDetails.phoneCountryCode = communication[0] ? (communication[0].phoneCountryCode !== "" ? communication[0].phoneCountryCode : userDetails.phoneCountryCode ) :
                                       userDetails.phoneCountryCode;
        userDetails.email = communication[0] ? (communication[0].email !== "" ? communication[0].email : userDetails.email) : userDetails.email;
        break;
      }
    }
    return userDetails;
  },
  /*
  * update features/actions json by removing type field
  * @param: temp contract details
  * @return: updated contract customers array
  */
  updateFeatureActionsJsonObj : function(tempContractDetails){
    var contractCust = JSON.parse(tempContractDetails.contractCustomers);
    for(var i=0; i<contractCust.length; i++){
      var features = contractCust[i].features || [];
      for(var j=0; j<features.length; j++){
        delete contractCust[i].features[j].type;
        delete contractCust[i].features[j].featureStatus;
        var actions = features[j].actions;
        for(var k=0; k<actions.length; k++){
          delete contractCust[i].features[j].actions[k].type;
          delete contractCust[i].features[j].actions[k].actionStatus;
        }
      }
    }
    return contractCust;
  },
  /*
  * form the company list payload for enroll customer request param
  * @return : company related info,accounts obj 
  */
  getEnrollCustCompanyList: function (selectedIndex) {
    var companyList = [];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForEnrollCust();
    var enrollSegData = selectedIndex ? [this.view.segEnrollCustList.data[selectedIndex]] : this.view.segEnrollCustList.data;
    var addedEnrollCustId = Object.keys(enrollCustAccountsFeatures);
    for (var i = 0; i < enrollSegData.length; i++) {
      if (enrollSegData[i].lblRemoved.isVisible === false && addedEnrollCustId.includes(enrollSegData[i].custId)) {
        var companyObj = {
          "companyName": enrollSegData[i].lblCustomerName.text,
          "contractId": enrollSegData[i].custDetails.contractId === "" ? "" : enrollSegData[i].custDetails.contractId,
          "contractName": enrollSegData[i].custDetails.contractId === "" ? "" : enrollSegData[i].custDetails.contractName,
          "cif": enrollSegData[i].custId,
          "legalEntityId":this.legalentityid1 || "",
          "isPrimary": enrollSegData[i].flxPrimary.isVisible === true ? "true" : "false",
          "serviceDefinition": enrollSegData[i].lstBoxService.selectedKey,
          "roleId": enrollSegData[i].lstBoxRole.selectedKey,
          "autoSyncAccounts": enrollSegData[i].custDetails.autoSyncAccounts,
          "accounts": [],
          "excludedAccounts": [],
        };
        var accListMap = enrollCustAccountsFeatures[enrollSegData[i].custId].accounts;
        accListMap.forEach(function(accObj,key){
          if(accObj.isEnabled==="true"){
            companyObj.accounts.push({
              "accountName": accObj.accountName,
              "accountId": accObj.accountNumber,
              "accountType": accObj.accountType,
              "isEnabled": accObj.isEnabled
            });
          }else{
            companyObj.excludedAccounts.push({
              "accountName": accObj.accountName,
              "accountId": accObj.accountNumber,
              "accountType": accObj.accountType
            });
          }
        });
        companyList.push(companyObj);
      }
    }
    return companyList;
  },
  /*
  * form the company list payload for enroll customer request param
  * @returns: account level, global level featurse actions
  */
  getEnrollCustFeaturesList: function (selectedIndex) {
    var self = this;
    var accountLevelPermissions = [], globalLevelPermissions = [];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForEnrollCust();
    var enrollSegData = selectedIndex ? [this.view.segEnrollCustList.data[selectedIndex]] : this.view.segEnrollCustList.data;
    var addedEnrollCustId = Object.keys(enrollCustAccountsFeatures);
    for (var i = 0; i < enrollSegData.length; i++) {
      if (enrollSegData[i].lblRemoved.isVisible === false && addedEnrollCustId.includes(enrollSegData[i].custId)) {
        var accFeaturesObj = {
          "companyName": enrollSegData[i].lblCustomerName.text,
          "cif": enrollSegData[i].custId,
          "legalEntityId":self.legalentityid1|| "",
          "accounts": []
        };
        var accListMap = enrollCustAccountsFeatures[enrollSegData[i].custId].accounts;
        var allAccFeaturesArr = enrollCustAccountsFeatures[enrollSegData[i].custId].accountMapFeatures;
        var allOtherFeaturesArr = enrollCustAccountsFeatures[enrollSegData[i].custId].nonAccLevelFeatures;
        //map features and actions for enroll payload format
        var otherLevelFeatures = this.mapFeaturesActionsForEnrollPayload(allOtherFeaturesArr);
        //append features for each account
        accListMap.forEach(function(accObj,key){
          var currAccFeatures = JSON.parse(allAccFeaturesArr.get(accObj.accountNumber).features);
          if(accObj.isEnabled === "true"){
            accFeaturesObj.accounts.push({
              "accountName": accObj.accountName,
              "accountId": accObj.accountNumber,
              "accountType": accObj.accountType,
              "productId":accObj.productId,
              "ownerType": accObj.ownerType,
              "featurePermissions": self.mapFeaturesActionsForEnrollPayload(currAccFeatures)
            });
          }

        });
        var globalFeaturesObj = {"companyName": enrollSegData[i].lblCustomerName.text,
                                 "cif": enrollSegData[i].custId,
                                 "legalEntityId":self.legalentityid1 || "",
                                 "features":otherLevelFeatures};
        accountLevelPermissions.push(accFeaturesObj);
        globalLevelPermissions.push(globalFeaturesObj);
      }

    }
    return {
      "accountLevelPermissions":accountLevelPermissions,
      "globalLevelPermissions":globalLevelPermissions
    };
  },
  /*
  * seperate account/non-account features actions
  * @param: features actions map, customer id
  * @param: account level and other features array
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
  /*
  * format features and actions list for enroll payload
  * @param: features array
  * @return: formatted features list
  */
  mapFeaturesActionsForEnrollPayload : function(featuresArr){
    var features = featuresArr.map(function(feature){
      var featureObj = {"featureId": feature.featureId,
                        "featureDescription": feature.featureDescription,
                        "featureName": feature.featureName,
                        "isEnabled": feature.isEnabled,
                        "permissions":[]};
      var featureActions = feature.actions || feature.permissions;
      var actions = featureActions.map(function(action){
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
  getEnrollCustLimitsList: function (selectedIndex) {
    var self = this;
    var companyList = [];
    var transactionLimits = [];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForEnrollCust();
    var enrollSegData = selectedIndex ? [this.view.segEnrollCustList.data[selectedIndex]] : this.view.segEnrollCustList.data;
    var addedEnrollCustId = Object.keys(enrollCustAccountsFeatures);
    for (var i = 0; i < enrollSegData.length; i++) {
      if (enrollSegData[i].lblRemoved.isVisible === false && addedEnrollCustId.includes(enrollSegData[i].custId)) {
        var accListMap = enrollCustAccountsFeatures[enrollSegData[i].custId].accounts;
        var accFeaturesMap = enrollCustAccountsFeatures[enrollSegData[i].custId].accountMapFeatures;
        var accLimitsMap = enrollCustAccountsFeatures[enrollSegData[i].custId].accLevelLimits;
        var limitGroups = enrollCustAccountsFeatures[enrollSegData[i].custId].limitGroups;
        var limitsObj = {"companyName": enrollSegData[i].lblCustomerName.text,
                         "cif": enrollSegData[i].custId,
                         "legalEntityId":self.legalentityid1 || "",
                         "limitGroups": [],
                         "accounts":[]};

        //form limit groups object 
        var limitGroupArr = [];
        for (var j = 0; j < limitGroups.length; j++) {
          if (limitGroups[j].limitGroupId && limitGroups[j].limitGroupId !== "N/A" &&
            limitGroups[j].limitGroupId !== "ACCOUNT_TO_ACCOUNT") {
            var limitGroupJson = { "limitGroupId": limitGroups[j].limitGroupId, "limits": [] };
            var limits = limitGroups[j].limits;
            for (var k = 0; k < limits.length; k++) {
              limitGroupJson.limits.push({
                "id": limits[k].id,
                "value": limits[k].maxValue === 0 ? "0" : limits[k].value //to send value as 0 when no acc level limits avaiable
              });
            }
            limitGroupArr.push(limitGroupJson);
          }
        }
        limitsObj.limitGroups = limitGroupArr;
        //append limits for each selected account
        accListMap.forEach(function (accObj, key) {
          var currAccVal = accLimitsMap.get(accObj.accountNumber);
          var currAccLimits = currAccVal ? currAccVal.limits : [];
          var currAccFeatures = JSON.parse(accFeaturesMap.get(accObj.accountNumber).features);
          if (accObj.isEnabled === "true") {
            limitsObj.accounts.push({
              "accountName": accObj.accountName,
              "accountId": accObj.accountNumber,
              "accountType": accObj.accountType,
              "productId":accObj.productId,
              "ownerType": accObj.ownerType,
              "featurePermissions": self.mapDefaultAccLimitsForEnrollPayload(JSON.parse(currAccLimits), currAccFeatures, enrollSegData[i].custId, accObj.accountNumber)
            });
          }
        });
        transactionLimits.push(limitsObj);
      }
    }
    return transactionLimits;
  },
  /* 
  * format signatory groups list for enroll payload
  * @param:
  * formatted signatory list array
  */
  getEnrollCustSignGroups: function (selectedIndex) {
    var signatoryGroupObj = [];
    var enrollCustAccountsFeatures = this.presenter.getAccountsFeaturesForEnrollCust();
    var enrollSegData = selectedIndex ? [this.view.segEnrollCustList.data[selectedIndex]] : this.view.segEnrollCustList.data;
    var addedEnrollCustId = Object.keys(enrollCustAccountsFeatures);
    for (var i = 0; i < enrollSegData.length; i++) {
      if (enrollSegData[i].lblRemoved.isVisible === false && addedEnrollCustId.includes(enrollSegData[i].custId)) {
        var groupList = enrollCustAccountsFeatures[enrollSegData[i].custId].signatoryGroups;
        var limitsObj = {
          "cif": enrollSegData[i].custId,
          "legalEntityId":this.legalentityid1|| "",
          "groups": [],
          "contractId": enrollSegData[i].custDetails.contractId === "" ? "" : enrollSegData[i].custDetails.contractId,

        };

        //form signatory groups object 
        var isValidApproval=this.hasValidateApprovalPermission(enrollSegData[i].custId);
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
            }else if(this.usersSelectedSignatoryList[enrollSegData[i].custId]&&this.usersSelectedSignatoryList[enrollSegData[i].custId]!=="NONE"){
              groupsJSON={
                "signatoryGroupId":this.usersSelectedSignatoryList[enrollSegData[i].custId],
                "isAssociated":"true"
              }
              limitsObj.groups.push(groupsJSON);
              break;
            }
          }
        }
        signatoryGroupObj.push(limitsObj);
      }
    }
    return signatoryGroupObj;
  },
  /*
  * format limits list for enroll payload
  * @param: features array, accLevelfeatures, customer id, account num
  * @return: formatted limits list
  */
  mapDefaultAccLimitsForEnrollPayload: function (accLimitFeatures, accFeatures, custId, accountNum) {
    var self = this;
    //var enabledActions =[];
    //var actionList = featuresArr.map(function(feature){
    var enabledActions = [], enabledActionsId = [];
    //get all enabled action ids
    for(let i=0; i<accFeatures.length; i++){
      var actions = accFeatures[i].actions || accFeatures[i].permissions;
      for(let j =0; j<actions.length ;j++){
        var currActionId = actions[j].id || actions[j].actionId;
        if(actions[j].isEnabled === "true"){
          enabledActionsId.push(currActionId);
          // enabledActionsId.push(actions[j].id);
        }
      }
    }
    var actionList = accLimitFeatures.map(function(feature){
      var actions = feature.actions || feature.permissions;
      for(var x=0; x<actions.length; x++){
        var action = actions[x];
        var checkVar = self.isEditUserAccessVisited[custId];
        //var currActionAccList = self.actionsAccountJSON[custId][action.actionId];
        //default case no features edited add all limits
        if(checkVar === false && (self.enrollAction === self.actionConfig.create || self.enrollAction === self.actionConfig.edit)){
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
          enabledActions.push(actionObj);
        }
        //in case of edited features add only those limits
        else {
          //if(currActionAccList.indexOf(accountNum) >= 0){
          if (enabledActionsId.indexOf(action.actionId) >= 0) {
            var actionObj = {
              "featureId": feature.featureId,
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
            enabledActions.push(actionObj);
          }
        }
      }
    });
    return enabledActions;
  },
  /*
  * edit accounts ,features,limits on click of edit user access options
  */
  editUserAccessOnClick : function(option){
    this.selAccCount ={};
    this.setEditUserAccessTitleCustInfo();
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var editUserDetails = this.presenter.getAccountsFeaturesForEnrollCust(enrollUserData.custId);
    this.view.commonButtonsEditAccounts.btnCancel.info = {"previousData": this.parseEditUserObjPreviousState(editUserDetails, 1),"previousSyncFlag":JSON.parse(JSON.stringify(enrollUserData.custDetails.autoSyncAccounts)),"previousSignatoryGroupId":this.usersSelectedSignatoryList[enrollUserData.custId]};
    var accounts = editUserDetails.accounts;
    this.setAccountsSegmentData(accounts,enrollUserData.custDetails.autoSyncAccounts);
    this.view.enrollEditAccountsCard.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + ":";
    this.view.enrollEditFeaturesCard.segAccountFeatures.info = {"parentId":"enrollEditFeaturesCard","segData":[],"featuresType":1, "segDataJSON":{}};
    this.setFeaturesCardSegmentData(this.view.enrollEditFeaturesCard.segAccountFeatures, editUserDetails.accLevelFeatures);
    this.storeActionForAccountSelection();
  },
  /*
  * convert edit user obj values to stringify/object form in order to change referenc
  * @param: edit user param, option(stringified:1,objectform:2)
  */
  parseEditUserObjPreviousState : function(editUserObj,option){
    if(option === 1){
    var stringifyUser= {"accounts" : JSON.stringify(Array.from(editUserObj.accounts)),
                     // "features" : JSON.stringify(Array.from(editUserObj.features)),
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
                      //"features" : new Map(JSON.parse(editUserObj.features)),
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
  /*
  * reverts the user changes and updates the edituser object on click of cancel
  */
  revertEditUserChangesOnCancel: function () {
    this.limitsValidationObject = {}; 
    var custId = this.view.customersDropdownAccounts.lblSelectedValue.info.customerId;
    var stringifyPrevState = this.view.commonButtonsEditAccounts.btnCancel.info.previousData;
    var userObj = this.parseEditUserObjPreviousState(stringifyPrevState, 2);
    var segData = this.view.segEnrollCustList.data;
    var enrollUserData = [];
    for (var i = 0; i < segData.length; i++) {
      if (segData[i].custId === custId) {
        enrollUserData = segData[i];
        break;
      }
    }
    enrollUserData.custDetails.autoSyncAccounts=this.view.commonButtonsEditAccounts.btnCancel.info.previousSyncFlag;
    this.usersSelectedSignatoryList[custId]=this.view.commonButtonsEditAccounts.btnCancel.info.previousSignatoryGroupId;
    this.view.segEnrollCustList.setDataAt(enrollUserData,this.enrollSegRowInd);
    this.presenter.setAccountsFeaturesForEnrollCust(custId,userObj);
  },
  /*
  * set the title in user screen, customer listbox selection
  */
  setEditUserAccessTitleCustInfo : function(){
    this.view.lblAccountsCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblFeaturesCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblOtherFeaturesCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblLimitsCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblSignatoryCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+ this.customerToEnrollInfo.Name;
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownAccounts,this.view.enrollEditAccountsCard);
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownFeatures,this.view.enrollEditFeaturesCard);
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownOF,this.view.enrollEditOtherFeaturesCard);
    this.setCustDetailsInCardEditUserAccess(this.view.customersDropdownLimits,this.view.enrollEditLimitsCard);
    this.view.forceLayout();
  },
  /*
  * set the customer selection listbox, customer details in card components
  * @param: listbox comp path, card component path
  */
  setCustDetailsInCardEditUserAccess : function(listboxCompPath,cardWidgetPath){
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var custInfo, isPrimary = false;
    isPrimary = enrollUserData.flxPrimary.isVisible === true ? true : false;
    custInfo = enrollUserData.custDetails;
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
    listboxCompPath.setEnabled(false);
    listboxCompPath.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    listboxCompPath.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
    listboxCompPath.lblSelectedValue.text = this.AdminConsoleCommonUtils.getTruncatedString(selectedCust, isPrimary ? 19 : 28, isPrimary ? 17 : 27);
    listboxCompPath.lblSelectedValue.info = { "customerId": details.id, "customerDetails": custInfo };
    listboxCompPath.lblSelectedValue.toolTip = selectedCust;
    listboxCompPath.btnPrimary.isVisible = isPrimary;
    cardWidgetPath.lblName.text = details.name;
    cardWidgetPath.lblData1.text = details.id;
    cardWidgetPath.lblData2.text = custInfo.taxId || kony.i18n.getLocalizedString("i18n.Applications.NA");
    cardWidgetPath.lblData3.text = details.address;
    cardWidgetPath.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details);
  },
  /*
  * show the respective enroll list/edit screen based on the navigated customer tab 
  * @param: navigation details, userDetails from getinfinityUser response
  */ 
  navigateToScreenForSelectedCustTab : function(navigationParam, userDetails){
    if(navigationParam.isEnrollEditUser === false){
      this.enrollAction = "EDIT";
      this.showEnrollCustomer();
    } else {
      this.enrollAction = navigationParam.data && navigationParam.data.isSingleEdit ? "EDIT_SINGLE_USER" : "EDIT_USER";
      this.setEditUserScreenEditData(navigationParam.data, userDetails);
      this.initializeEditUserScreen(navigationParam, userDetails);
      // this.showEditUserScreen(true);  
      this.showEditUserScreen(true);
      this.isDataSetVisited = true; 
    }
  },
  /*
  * set default data required when naigated to user edit screen from customer profile tabs
  * @param: navigation details
  */
  initializeEditUserScreen: function (navigationParam, userDetails) {
    var custId = this.view.customersDropdownAccounts.lblSelectedValue.info && this.view.customersDropdownAccounts.lblSelectedValue.info.customerId ? this.view.customersDropdownAccounts.lblSelectedValue.info.customerId : userDetails[0]?userDetails[0].coreCustomerId:userDetails.coreCustomerId;
    var editUserDetails = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var accounts = editUserDetails.accounts;
    this.setAccountsSegmentData(accounts, editUserDetails.customerDetails.autoSyncAccounts);
    this.view.enrollEditFeaturesCard.segAccountFeatures.info = { "parentId": "enrollEditFeaturesCard", "segData": [], "featuresType": 1, "segDataJSON": {} };
    this.setFeaturesCardSegmentData(this.view.enrollEditFeaturesCard.segAccountFeatures, editUserDetails.accLevelFeatures);
    this.storeActionForAccountSelection();
    if (navigationParam.tabName === "ACCOUNTS") {
      this.showEditAccountsScreen();
    } else if (navigationParam.tabName === "FEATURES") {
      var tabOption = navigationParam.isAccountLevel === false ? 1 : 2;
      this.showEditFeaturesScreen(tabOption);
    } else if (navigationParam.tabName === "LIMITS") {
      var tabOption = navigationParam.isAccountLevel === false ? 1 : 2;
      this.showEditLimitsScreen(tabOption);
    } else if (navigationParam.tabName === "SIGNATORYGROUPS") {
      this.showEditSignatoryGroups();
    }
  },
  /*
  * set data to customers dropdown and card widget customer part data in edit user screen
  * @param: customer related details from navigation,  userDetails from getinfinityUser response
  */
  setEditUserScreenEditData : function(navigationData, userDetails){
    var dropDownData = this.getCustomersListboxDataEditUser(userDetails);
    this.view.lblAccountsCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblFeaturesCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblOtherFeaturesCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    this.view.lblLimitsCustHeader.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UserColon")+" "+this.customerToEnrollInfo.Name;
    if(dropDownData.length > 0){
      this.setCustomersListboxDataEditUser(this.view.customersDropdownAccounts, this.view.enrollEditAccountsCard, dropDownData, navigationData);
      this.setCustomersListboxDataEditUser(this.view.customersDropdownFeatures, this.view.enrollEditFeaturesCard, dropDownData, navigationData);
      this.setCustomersListboxDataEditUser(this.view.customersDropdownOF, this.view.enrollEditOtherFeaturesCard, dropDownData, navigationData);
      this.setCustomersListboxDataEditUser(this.view.customersDropdownLimits, this.view.enrollEditLimitsCard, dropDownData, navigationData);
    }
  },
  
  /*
  * get the list of customers for dropdown in edit user access screen
  * @param: userDetails from getinfinityUser response
  */
  getCustomersListboxDataEditUser : function(userDetails){
    var allCustomerList = this.presenter.getAccountsFeaturesForEnrollCust();
    var allCustId = Object.keys(allCustomerList);
    var primaryCustId = userDetails && userDetails.length > 0 ? userDetails[0].coreCustomerId : "";
    var widgetMap={
      "flxCustomerName":"flxCustomerName",
      "flxCustomerNameCont":"flxCustomerNameCont",
      "lblCustomerName":"lblCustomerName",
      "btnPrimaryCustomers":"btnPrimaryCustomers"
    };
    var data=[], maxLengthText ="";
    for(var i=0;i<allCustId.length;i++){  
      var currCust = allCustomerList[allCustId[i]].customerDetails;
      data.push({
        "id": currCust.cif,
        "custDetails": currCust,
        "lblCustomerName":{"text":(currCust.companyName || currCust.contractName)+" ("+currCust.cif+")"},
        "btnPrimaryCustomers":{"isVisible": currCust.cif === primaryCustId ? true:false}
      });
      if((currCust.companyName+" ("+currCust.cif+")").length>maxLengthText.length)
          maxLengthText= (currCust.companyName || currCust.contractName)+" ("+currCust.cif+")";
    }

    var maxTextWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxLengthText, "13px Lato-Regular");
    var dropdownWidth = maxTextWidth + 15 + 15 + 70 + 15;
    this.view.customersDropdownAccounts.flxSegmentList.width = dropdownWidth + "dp";
    this.view.customersDropdownFeatures.flxSegmentList.width = dropdownWidth + "dp";
    this.view.customersDropdownOF.flxSegmentList.width = dropdownWidth + "dp";
    this.view.customersDropdownLimits.flxSegmentList.width = dropdownWidth + "dp";
    return data;
  },
  /*
  * set the customers dropdown data in all tabs, set default selection, set card data for selected cust
  * @param:dropdown component path, card widget path, dropdown seg data, navigation related data
  */
  setCustomersListboxDataEditUser : function(dropdownWidPath, cardWidgetPath, dropdownData, navData){
    var widgetMap={
      "flxCustomerName":"flxCustomerName",
      "flxCustomerNameCont":"flxCustomerNameCont",
      "lblCustomerName":"lblCustomerName",
      "btnPrimaryCustomers":"btnPrimaryCustomers"
    };  
    dropdownWidPath.segList.widgetDataMap=widgetMap;
    dropdownWidPath.segList.setData(dropdownData);
    dropdownWidPath.segList.info={"records":dropdownData};
    dropdownWidPath.flxSegmentList.setVisibility(false);
    //set the selected customer from the selected tabs
    var selectedCust;
    for(var i=0; i<dropdownData.length; i++){
      if(dropdownData[i].id === navData.custId){
        selectedCust = dropdownData[i];
        selectedCust["taxId"] = navData.taxId;
        selectedCust["addressLine1"] = navData.address;
        break;
      }
    }
    var selectedCustName = selectedCust.lblCustomerName ? selectedCust.lblCustomerName.text : "";
    var isPrimary = selectedCust.btnPrimaryCustomers.isVisible === true ? true : false;
    dropdownWidPath.lblSelectedValue.text = this.AdminConsoleCommonUtils.getTruncatedString(selectedCustName,isPrimary?19:25,isPrimary?17:23);
    dropdownWidPath.lblSelectedValue.toolTip = selectedCustName;
    dropdownWidPath.lblSelectedValue.info = {"customerId": selectedCust.id,"customerDetails": selectedCust.custDetails };
    dropdownWidPath.btnPrimary.setVisibility(isPrimary);
    var details = {
      "id": selectedCust.id,
      "name": selectedCust.custDetails.companyName || selectedCust.custDetails.contractName,
      "industry":selectedCust.custDetails.industry ||  kony.i18n.getLocalizedString("i18n.Applications.NA"),
      "email": selectedCust.custDetails.email || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      "phone":selectedCust.custDetails.phone || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      "address": selectedCust.custDetails.city ? (selectedCust.custDetails.country ? selectedCust.custDetails.city + ", "+ selectedCust.custDetails.country : selectedCust.custDetails.city) :
                                        (selectedCust.custDetails.country ? selectedCust.custDetails.country : kony.i18n.getLocalizedString("i18n.Applications.NA"))
    };
    cardWidgetPath.lblName.text = details.name;
    cardWidgetPath.lblData1.text = details.id;
    cardWidgetPath.lblData2.text = selectedCust.taxId || kony.i18n.getLocalizedString("i18n.Applications.NA");
    cardWidgetPath.lblData3.text = details.address;
    cardWidgetPath.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details);
    this.view.forceLayout();
  },
  /*
  * set the selected item from dropdown
  * dropdown component path, selected item id, screen(1:acc,2:features,...)
  */
  setSelectedTextFromDropdownEditUser: function (componentPath, selectedId, screen) {
    var selIndex = "";
    var segData = componentPath.segList.data;
    if (selectedId) {
      for (let x = 0; x < segData.length; x++) {
        if (segData[x].id === selectedId) {
          selIndex = x;
          break;
        }
      }
    }else{
      selIndex = componentPath.segList.selectedRowIndex[1];
    }
    var isPrimary = segData[selIndex].btnPrimaryCustomers.isVisible ? true :false;
    componentPath.lblSelectedValue.text = this.AdminConsoleCommonUtils.getTruncatedString(segData[selIndex].lblCustomerName.text,isPrimary?19:30,isPrimary?17:29);
    componentPath.lblSelectedValue.toolTip = segData[selIndex].lblCustomerName.text;
    componentPath.lblSelectedValue.info = {"customerId": segData[selIndex].id,"customerDetails":segData[selIndex].custDetails };
    componentPath.btnPrimary.setVisibility(isPrimary);
    componentPath.flxSegmentList.setVisibility(false);
    if (screen && screen > 0)
      this.setCustomerDetailsInCardOnCustChange(segData[selIndex], screen);
    this.view.forceLayout();
  },
  /*
  * set the selected customer details from dropdown to card widget
+  * @Param:current selected cust details,screen shown
+  */
  setCustomerDetailsInCardOnCustChange: function (selectedCust, screen) {
    var cardComponentPath = "";
    if (screen === 1) { //accounts tab
      cardComponentPath = this.view.enrollEditAccountsCard;
    } else if (screen === 2) { //features tab
      cardComponentPath = this.view.enrollEditFeaturesCard;
    } else if (screen === 3) { //other features tab
      cardComponentPath = this.view.enrollEditOtherFeaturesCard;
    } else if (screen === 4) { //limits tab
      cardComponentPath = this.view.enrollEditLimitsCard;
    }
    var details = {
      "id": selectedCust.id,
      "name": selectedCust.custDetails.companyName || selectedCust.custDetails.contractName,
      "industry": selectedCust.custDetails.industry || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      "email": selectedCust.custDetails.email || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      "phone": selectedCust.custDetails.phone || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      "address": selectedCust.custDetails.city ? (selectedCust.custDetails.country ? selectedCust.custDetails.city + ", " + selectedCust.custDetails.country : selectedCust.custDetails.city) :
        (selectedCust.custDetails.country ? selectedCust.custDetails.country : kony.i18n.getLocalizedString("i18n.Applications.NA"))
    };
    cardComponentPath.lblName.text = details.name;
    cardComponentPath.lblData1.text = details.id;
    cardComponentPath.lblData2.text = selectedCust.taxId || kony.i18n.getLocalizedString("i18n.Applications.NA");
    cardComponentPath.lblData3.text = details.address;
    cardComponentPath.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this, details);
  },
  /*
  * add required keys and contruct object used for edit user access
  * @param: {"accounts":[],"limits":[],"isPrimary":true/false,"custId":"",featuresPerAccount":{}, nonAccFeatures:[}
  */
  formEditObjectAssignDefaultValues: function (accFeatureLimitsObj) {
    var featuresMap = new Map();
    var isEdit = this.enrollAction === this.actionConfig.create ? false : true;
    var filteredFeatures = this.getFilteredFeaturesFromTempContract(accFeatureLimitsObj.featuresPerAccount, accFeatureLimitsObj.custId[0]);
    var groupLimitsbyFeature = this.getAccLvlLimitsGroupedByFeature(accFeatureLimitsObj.limits, accFeatureLimitsObj.featuresPerAccount);
    var filteredLimits = this.getFilteredFeaturesFromTempContract(groupLimitsbyFeature, accFeatureLimitsObj.custId[0]);
    var otherFeaturesUpdated = this.getFeaturesMapToFormEditObject(accFeatureLimitsObj.nonAccFeatures, 2);
    //TODO: remove/replace this
    //var limitsArr = this.getLimitsMapToFormEditObject(filteredLimits,2,true);
    this.actionsAccountJSON[accFeatureLimitsObj.custId[0]] = {};
    var combinedAccLevelFeatures = this.getCombinedAllAccountsFeatures(filteredFeatures, accFeatureLimitsObj.custId[0]);

    // var categorizedFeatures = this.getAccountLevelFeatures(featuresMap,accFeatureLimitsObj.custId[0]);
    var accFeaturesMap = new Map();
    var accLimitsMap = new Map();
    //get filtered user accounts from  temp contract
    var accounts = this.getFilteredAccFromTempContract(accFeatureLimitsObj.accounts,accFeatureLimitsObj.custId[0]);
    var accountsMap = new Map();
    //add isEnable key for all accounts
    for(var i=0;i<accounts.length;i++){
      accounts[i]["isEnabled"] = "true";
      accounts[i]["isAssociated"] = "true";
      accounts[i]["accountNumber"] = accounts[i].accountNumber || accounts[i].accountId;
      accountsMap.set(accounts[i].accountNumber,accounts[i]); 
      //assign features for each accounts
      var currAccFeaturesArr = this.getFeaturesMapToFormEditObject((filteredFeatures[accounts[i].accountNumber] || []), 2);
      var accFeatureObj = { "accountDetails": accounts[i], "features": JSON.stringify(currAccFeaturesArr) };
      accFeaturesMap.set(accounts[i].accountNumber, accFeatureObj);
      //assign limits for each accounts
      var currAccLimitsArr = this.getLimitsMapToFormEditObject((filteredLimits[accounts[i].accountNumber] || []), 2, true);
      var accLimitObj = { "accountDetails": accounts[i], "limits": JSON.stringify(currAccLimitsArr) };
      accLimitsMap.set(accounts[i].accountNumber, accLimitObj);
    }
    //store all features list for bulkupdate
    this.bulkUpdateAllFeaturesList = JSON.parse(JSON.stringify(combinedAccLevelFeatures));
    //store all featureslimits list for bulkupdate
    //this.bulkUpdateAllFeaturesLimits = JSON.parse(JSON.stringify(limitsArr));
    var signatoryGroups = accFeatureLimitsObj.signatoryGroups;
    var hasApprovalPerm = this.hasValidateApprovalPermission(accFeatureLimitsObj.custId, accFeaturesMap);
    if (!hasApprovalPerm)
      this.usersSelectedSignatoryList[accFeatureLimitsObj.custId] = "NONE";
    var limitGroupsArr = this.caluclateTransactionLimitGroupValue(accFeaturesMap, accLimitsMap, true, null);
    var editUserObj = {
      "accounts": accountsMap,
      "accLevelFeatures": combinedAccLevelFeatures, //Object //categorizedFeatures.accountLevelFeatures, //Array
      "nonAccLevelFeatures": otherFeaturesUpdated, //Array
      "accountMapFeatures": accFeaturesMap, //Map(features - stringified)
      "accLevelLimits": accLimitsMap, //Map(limits - stringified)
      "limitGroups": limitGroupsArr, //Array
      "signatoryGroups": signatoryGroups,
      "isPrimary": accFeatureLimitsObj.isPrimary,
      "custId": accFeatureLimitsObj.custId,
      "customerDetails": accFeatureLimitsObj.custDetails
    };
    this.presenter.setAccountsFeaturesForEnrollCust(accFeatureLimitsObj.custId[0], editUserObj);
    if (isEdit)
      this.createEnrollCustomerRequestParam(true);
  },
  /*
  * add isEnabled key to all features,actions to construct edit user access object
  * @param: accounts,features,limits data,
  * @param: option(return type map:1,array:2)
  * @returns: features map/array 
  */
  getFeaturesMapToFormEditObject : function(features,option){
    var featuresMap = new Map();
    //add isEnable key for all features and action
   // var features = accFeatureLimitsObj.features;  
    for(var j=0; j<features.length; j++){
      features[j]["isEnabled"] = "true";
      var actionsArr = features[j].actions || features[j].permissions;
      for (var k = 0; k < actionsArr.length; k++) {
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
  * @param: limits data
  * @param: option(return type map:1,array:2)
  * @returns: limits map/array 
  */
  getLimitsMapToFormEditObject : function(limitsList, option, isCreate){
    var limitsMap = new Map();
    var limits = limitsList || [];  
    for(var i=0; i<limits.length; i++){
      limits[i]["isEnabled"] = "true";
      for(var j=0; j<limits[i].actions.length; j++){
        limits[i].actions[j]["actualLimits"] = limits[i].actions[j].limits;
        if(isCreate === true){
          limits[i].actions[j].limits = this.addNewLimitsToExistingLimits(limits[i].actions[j].limits);
        } else{
          limits[i].actions[j].limits = this.getLimitValuesJsonFromArray(limits[i].actions[j].limits);
        }
      }
      var featureId = limits[i].featureId;
      limitsMap.set(featureId,limits[i]);
    }
    return (option === 1 ? limitsMap : limits);
  },
  /*
  * get limits at acc level for the features avaible at account level
  * @param: limits per account, acc level features Obj
  * @returns: acc Level Limits obj
  */
  getAccLvlLimitsGroupedByFeature: function (limitsArr, featuresPerAccObj) {
    var accIds = Object.keys(featuresPerAccObj);
    var limitsPerAccObj = {}, featureActionIdArr = [], currAccLimits;
    for (let i = 0; i < accIds.length; i++) {
      limitsPerAccObj[accIds[i]] = [];
      featureActionIdArr = []
      //get all featureaction available for current account
      var featuresArr = featuresPerAccObj[accIds[i]];
      for (let j = 0; j < featuresArr.length; j++) {
        var actions = featuresArr[j].actions || featuresArr[j].permissions;
        featureActionIdArr.push(featuresArr[j].featureId);
        //TODO: uncomment once monetary features are part of features
        /*for (let k = 0; k < actions.length; k++) {
          let featureActionId = featuresArr[j].featureId + "#" + actions[k].actionId;
          featureActionIdArr.push(featureActionId);
        } */
      }

      //store limts for the available features at acc level
      currAccLimits = [];
      for (let j = 0; j < limitsArr.length; j++) {
        //let featureActionId = limitsArr[j].featureId + "#" + limitsArr[j].actionId;
        let featureActionId = limitsArr[j].featureId;
        if (featureActionIdArr.includes(featureActionId)) {
          currAccLimits.push(limitsArr[j]);
        }
      }
      var limitGroupedFeatures = this.getFeatureBasedActions(currAccLimits, 2);
      limitsPerAccObj[accIds[i]] = limitGroupedFeatures;
    }
    return limitsPerAccObj;
  },
  /*
  * get all features union from all the account level features
  * @param: existing features per account obj
  * @return: all AccLevelfeatures arr
  */
  getCombinedAllAccountsFeatures: function (accFeaturesObj, custId) {
    var acc = Object.keys(accFeaturesObj);
    var combinedAccFeaturesObj = {}, combinedAccFeaturesArr = [];
    //creates object with featureid's to combined all the features from all accounts
    for (let i = 0; i < acc.length; i++) {
      var currAccFeatures = accFeaturesObj[acc[i]];
      for (let j = 0; j < currAccFeatures.length; j++) {
        var currActions = currAccFeatures[j].actions || currAccFeatures[j].permissions;
        if (combinedAccFeaturesObj[currAccFeatures[j].featureId]) {
        } else {
          combinedAccFeaturesObj[currAccFeatures[j].featureId] = { "featureData": currAccFeatures[j], "actions": {} };
        }
        for (let k = 0; k < currActions.length; k++) {
          //tracks the actions selection
          this.actionsAccountJSON[custId][currActions[k].actionId] = [];
          var featureActionId = currAccFeatures[j].featureId + "#" + currActions[k].actionId;
          if (combinedAccFeaturesObj[currAccFeatures[j].featureId].actions[currActions[k].actionId]) {
          } else {
            combinedAccFeaturesObj[currAccFeatures[j].featureId].actions[currActions[k].actionId] = currActions[k];
          }
        }
      }
    }
    //form featureActions array from the combined json object
    var featuresIdArr = Object.keys(combinedAccFeaturesObj);
    for (let i = 0; i < featuresIdArr.length; i++) {
      var featureObj = combinedAccFeaturesObj[featuresIdArr[i]].featureData;
      if (featureObj.actions) {
        featureObj.actions = Object.values(combinedAccFeaturesObj[featuresIdArr[i]].actions);
      } else if (featureObj.permissions) {
        featureObj.permissions = Object.values(combinedAccFeaturesObj[featuresIdArr[i]].actions);
      }
      combinedAccFeaturesArr.push(featureObj);
    }
    return combinedAccFeaturesArr;
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
                       {"id": this.limitId.AUTO_DENIED_DAILY_LIMIT, "value": limitJson[this.limitId.DAILY_LIMIT] || "0"},
                       {"id": this.limitId.AUTO_DENIED_WEEKLY_LIMIT, "value": limitJson[this.limitId.WEEKLY_LIMIT] || "0"},
                       {"id": this.limitId.AUTO_DENIED_TRANSACTION_LIMIT, "value": limitJson[this.limitId.MAX_TRANSACTION_LIMIT] || "0"}];
      allLimits = limitVal.concat(newLimits);
      allLimitsJson = this.getLimitValuesJsonFromArray(allLimits)
    }
    return allLimitsJson;
  },
  /*
  * caluclate the limit group values on features,accounts selection update
  * acc featurea map, account lemits map, isfirstTime(true/false), existingLimitGroups
  * retruns: limit groups array
  */
  caluclateTransactionLimitGroupValue: function (accFeaturesMap, accLimitsMap, isFirstTime, existingLimitGroups) {
    var self = this;
    var activeFeatures = {}, hasExistingLimits = false, limitGroups = {};
    //fetch all the enabled actions for all the selected accounts
    accFeaturesMap.forEach(function(accountObj,key){
      if(accountObj.accountDetails.isEnabled === "true" || accountObj.accountDetails.isAssociated === "true"){
        activeFeatures[key] = [];
        var features = JSON.parse(accountObj.features);
        for(var i=0; i<features.length; i++){
          var actions = features[i].actions || features[i].permissions;
          for(var j=0; j<actions.length; j++){
            if(actions[j].isEnabled === "true"){
              var featureActionId = features[i].featureId + "$" + actions[j].actionId;
              activeFeatures[key].push(featureActionId);
            }
          }
        }
      }
    });
    if (self.enrollAction === self.actionConfig.editUser || this.enrollAction === this.actionConfig.editSingleUser) { //in case of edit-consider existing values
      limitGroups = this.getLimitGroupsValuesJsonFromArray(existingLimitGroups, isFirstTime);
      hasExistingLimits = true;
    } else { //in case of create- caluclate for each group
      limitGroups = existingLimitGroups ? this.getLimitGroupsValuesJsonFromArray(existingLimitGroups, isFirstTime) : {};
      hasExistingLimits = existingLimitGroups && existingLimitGroups.length > 0 ? true : false;
    }
    //reset max values
    var limitGrp = Object.values(limitGroups);
    for(var x=0; x<limitGrp.length; x++){
      limitGroups[limitGrp[x].limitGroupId].limits[0].maxValue = 0.0;
      limitGroups[limitGrp[x].limitGroupId].limits[1].maxValue = 0.0;
      limitGroups[limitGrp[x].limitGroupId].limits[2].maxValue = 0.0;
    }
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
                  "limits": [{ "id": self.limitId.MAX_TRANSACTION_LIMIT, "maxValue": 0.0 },
                  { "id": self.limitId.DAILY_LIMIT, "maxValue": 0.0 },
                  { "id": self.limitId.WEEKLY_LIMIT, "maxValue": 0.0 }],
                  "actualLimits": [{ "id": self.limitId.MAX_TRANSACTION_LIMIT, "value": 0.0 },
                  { "id": self.limitId.DAILY_LIMIT, "value": 0.0 },
                  { "id": self.limitId.WEEKLY_LIMIT, "value": 0.0 }]
                };
              }
              //caluclate the max values for limit groups
              for (var y = 0; y < limitGroups[limitGroupId].limits.length; y++) {
                if (limitGroups[limitGroupId].limits[y].id === self.limitId.MAX_TRANSACTION_LIMIT) {
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
              //incase limitgroup gets added newly on enbale/disabling accounts/features
              if(!limitGroups[limitGroupId].limits[0].hasOwnProperty("value")){
                limitGroups[limitGroupId].limits[0]["value"] = limitGroups[limitGroupId].limits[0].maxValue+"";
              }if(!limitGroups[limitGroupId].limits[1].hasOwnProperty("value")){
                limitGroups[limitGroupId].limits[1]["value"] = limitGroups[limitGroupId].limits[1].maxValue+"";
              }if(!limitGroups[limitGroupId].limits[2].hasOwnProperty("value")){
                limitGroups[limitGroupId].limits[2]["value"] = limitGroups[limitGroupId].limits[2].maxValue+"";
              }
              //store actual limit group values for reset functionality
              if(isFirstTime){
                limitGroups[limitGroupId].actualLimits[0]["value"] = limitGroups[limitGroupId].limits[0].value;
                limitGroups[limitGroupId].actualLimits[1]["value"] = limitGroups[limitGroupId].limits[1].value;
                limitGroups[limitGroupId].actualLimits[2]["value"] = limitGroups[limitGroupId].limits[2].value;
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
  /*
  * seperate the accounts ,features,limits,customers related infofrom the response
  * @param: getInfinityUser response, navigation details
  */
  parseCustomersAccountsFeatures : function(userAllDetails, navigationParam){
    var infinityUserData = userAllDetails.userData;
    var companyList = infinityUserData.companyList;
    //reset action accounts 
    this.selAccCount = {};
    this.actionsAccountJSON  = {}
    var allCompanyAccountFeaturesObj ={};
    for(var i=0;i< companyList.length; i++){
      allCompanyAccountFeaturesObj[companyList[i].cif] = {
        "accounts": companyList[i].accounts,
        "accFeatures":[],
        "otherFeatures": [],
        "accLimits":[],
        "limitGroups":[],
        "signatoryGroups":[],
        "custId": companyList[i].cif,
        "isPrimary":companyList[i].isPrimary,
        "custDetils":companyList[i],
        "defaultLimits":userAllDetails.defaultLimits
      };
    }
    var accLevelFeatures = infinityUserData.accountLevelPermissions || [];
    for(var j=0; j<accLevelFeatures.length; j++){
      allCompanyAccountFeaturesObj[accLevelFeatures[j].cif].accFeatures = accLevelFeatures[j].accounts;
      if(accLevelFeatures[j].accounts.length !== 0 && accLevelFeatures[j].accounts.length < allCompanyAccountFeaturesObj[accLevelFeatures[j].cif].accounts.length){
        var missingFeatures = this.getFeaturesForDisabledAccEditUser(allCompanyAccountFeaturesObj[accLevelFeatures[j].cif].accounts,accLevelFeatures[j].accounts);
        var existingFeatures = accLevelFeatures[j].accounts;
        allCompanyAccountFeaturesObj[accLevelFeatures[j].cif].accFeatures = existingFeatures.concat(missingFeatures);
      }
    }
    var otherFeatures = infinityUserData.globalLevelPermissions || [];
    for(var k=0; k<otherFeatures.length; k++){
      //add isEnabled key for other features list
      for(var p=0 ;p<otherFeatures[k].features.length; p++){
        otherFeatures[k].features[p]["isEnabled"] = "true";
      }  
      allCompanyAccountFeaturesObj[otherFeatures[k].cif].otherFeatures = otherFeatures[k].features;
    }
    var defaultLimits = userAllDetails.defaultLimits.length > 0 ? userAllDetails.defaultLimits : [];
    for(var q=0; q<defaultLimits.length; q++){
      allCompanyAccountFeaturesObj[defaultLimits[q].coreCustomerId].defaultLimits = defaultLimits[q].coreCustomerLimits;
    }
    var accLimits = infinityUserData.transactionLimits || [];
    for (var l = 0; l < accLimits.length; l++) {
      allCompanyAccountFeaturesObj[accLimits[l].cif].accLimits = accLimits[l].accounts;
      if (accLimits[l].accounts.length !== 0 && accLimits[l].accounts.length < allCompanyAccountFeaturesObj[accLimits[l].cif].accounts.length) {
        //var missingLimits = this.getLimitsForDisabledAccEditUser(allCompanyAccountFeaturesObj[accLimits[l].cif].accounts,accLimits[l].accounts);
        var missingLimits = this.getLimitsForDisabledAccEditUser(allCompanyAccountFeaturesObj[accLimits[l].cif], accLimits[l].accounts);
        var existingLimits = accLimits[l].accounts;
        allCompanyAccountFeaturesObj[accLimits[l].cif].accLimits = existingLimits.concat(missingLimits);
      }
    }
    //     var defaultLimits = userAllDetails.defaultLimits.length > 0 ? userAllDetails.defaultLimits : [];
    //     for(var q=0; q<defaultLimits.length; q++){
    //       allCompanyAccountFeaturesObj[defaultLimits[q].coreCustomerId].defaultLimits = defaultLimits[q].coreCustomerLimits;
    //     }
    var signGroups = infinityUserData.signatoryGroups || [];
    for (var x = 0; x < signGroups.length; x++) {
      if(allCompanyAccountFeaturesObj[signGroups[x].cif]){
        allCompanyAccountFeaturesObj[signGroups[x].cif].signatoryGroups = signGroups[x].groups;
      }
    }
    for(var n=0; n<accLimits.length; n++){
      allCompanyAccountFeaturesObj[accLimits[n].cif].limitGroups = accLimits[n].limitGroups;
    }
    var custArr = Object.keys(allCompanyAccountFeaturesObj);
    for(var m=0; m<custArr.length; m++){
      this.selAccCount[custArr[m]] = 0;
      kony.adminConsole.utils.showProgressBar(this.view);
      this.formDefaultValuesForObjEditUserFlow(allCompanyAccountFeaturesObj[custArr[m]], custArr[m], navigationParam);
    }
    this.navigateToScreenForSelectedCustTab(navigationParam, infinityUserData.userDetails);
    if (navigationParam.data && navigationParam.data.isSingleEdit === true) {
      if (navigationParam.data.tabName === "ACCOUNTS")
        this.showEditAccountsScreen();
      else if (navigationParam.data.tabName === "FEATURES")
        this.showEditFeaturesScreen(1);
      else if (navigationParam.data.tabName === "LIMITS")
        this.showEditLimitsScreen(1);
      else if (navigationParam.data.tabName === "SIGNATORYGROUPS")
        this.showEditSignatoryGroups(this.enrollSegRowInd);

    }
  },
  /*
 * contruct object used for edit user flow
 * @param: {"accounts":[],"accFeatures":[],"otherFeatures":[],"accLimits":[],"limitGroups":[],isPrimary":true/false,"custId":""}
 */
  formDefaultValuesForObjEditUserFlow: function (accFeatureLimitsObj, custId, navigationParam) {
    var accountLevelFeatures = accFeatureLimitsObj.accFeatures && accFeatureLimitsObj.accFeatures.length > 0 ?
        accFeatureLimitsObj.accFeatures[0].featurePermissions : [];;
    var otherFeatures = accFeatureLimitsObj.otherFeatures;
    var limitsArr = accFeatureLimitsObj.accLimits && accFeatureLimitsObj.accLimits.length > 0 ?
        this.getFeatureBasedActions(accFeatureLimitsObj.accLimits[0].featurePermissions) : [];
    var limitGroups = accFeatureLimitsObj.limitGroups.length > 0 ? accFeatureLimitsObj.limitGroups : [];
    
    this.actionsAccountJSON[accFeatureLimitsObj.custId] = {};
    var accFeaturesMap = new Map();
    var accLimitsMap = new Map();
    //add all accounts
    var accounts = accFeatureLimitsObj.accounts;
    var accountsMap = new Map();
    for(var i=0;i<accounts.length;i++){
      accounts[i]["isAssociated"] = accounts[i].isEnabled;
      accounts[i]["accountNumber"] = accounts[i].accountId;
      accountsMap.set(accounts[i].accountId,accounts[i]); 
    }
    //map features for each accounts
    var accLevelFeatures = accFeatureLimitsObj.accFeatures;
    for(var j=0; j<accLevelFeatures.length; j++){
      var accObj = accountsMap.get(accLevelFeatures[j].accountId);
      var accFeatureObj = {"accountDetails":accObj, "features": JSON.stringify(accLevelFeatures[j].featurePermissions)};
      accFeaturesMap.set(accLevelFeatures[j].accountId,accFeatureObj);
    }
    //map limits for each accounts
    var accLevelLimits = accFeatureLimitsObj.accLimits;
    var missingFeatureMap, updatedFeatureLimts= [] ;
    for(var k=0; k<accLevelLimits.length; k++){
      var accObj = accountsMap.get(accLevelLimits[k].accountId);
      var limitsList = this.getFeatureBasedActions(accLevelLimits[k].featurePermissions);
      var featuresList = accFeaturesMap.get(accLevelLimits[k].accountId);
      //include values from default limits for any disabled features
      missingFeatureMap = this.getLimitsForDisabledFeatures(featuresList.features, limitsList, accFeatureLimitsObj.defaultLimits);
      updatedFeatureLimts= this.concatLimitsData(limitsList, missingFeatureMap);
      //limitsList = limitsList.concat(updatedFeatureLimts);
      var accLimitObj = {"accountDetails":accObj, "limits": JSON.stringify(updatedFeatureLimts)}; 
      accLimitsMap.set(accLevelLimits[k].accountId,accLimitObj);
    }
    //store all features list for bulkupdate
    this.bulkUpdateAllFeaturesList = JSON.parse(JSON.stringify(accountLevelFeatures));
    //store all featureslimits list for bulkupdate
    this.bulkUpdateAllFeaturesLimits = JSON.parse(JSON.stringify(limitsArr));
    //add all the actionId's to varaible for selection tracking
    for(var m=0; m<accountLevelFeatures.length; m++){
      for(var p=0; p<accountLevelFeatures[m].permissions.length; p++){
        this.actionsAccountJSON[custId][accountLevelFeatures[m].permissions[p].actionId] =[];
      }     
    }
    var limitGroupsArr = this.caluclateTransactionLimitGroupValue(accFeaturesMap, accLimitsMap, true, limitGroups);
    var signatoryGroups = accFeatureLimitsObj.signatoryGroups;
    this.setGlobalUserSignatories(accFeatureLimitsObj.custId, signatoryGroups);
    var editUserObj = {
      "accounts": accountsMap,
      "features": [], //Map
      "accLevelFeatures": accountLevelFeatures, //Array
      "nonAccLevelFeatures": otherFeatures, //Array
      "accountMapFeatures": accFeaturesMap, //Map(features - stringified)
      "limits": this.getLimitsMapToFormEditObject(limitsArr, 1, false), //Map
      "accLevelLimits": accLimitsMap, //Map(limits - stringified)
      "limitGroups": limitGroupsArr, //Array
      "signatoryGroups": signatoryGroups,
      "isPrimary": accFeatureLimitsObj.isPrimary,
      "custId": accFeatureLimitsObj.custId,
      "customerDetails": accFeatureLimitsObj.custDetils
    };
    this.presenter.setAccountsFeaturesForEnrollCust(accFeatureLimitsObj.custId, editUserObj);
    this.view.customersDropdownAccounts.lblSelectedValue.info = { "customerId": accFeatureLimitsObj.custId };
    this.view.customersDropdownFeatures.lblSelectedValue.info = { "customerId": accFeatureLimitsObj.custId };
    this.view.customersDropdownLimits.lblSelectedValue.info = { "customerId": accFeatureLimitsObj.custId };
    //this.initializeEditUserScreen(navigationParam);
  },
  /*
  * add default features for any of disabled accounts
  * @param: all accounts for cif, acc level features
  * @return : features for disabled accounts
  */
  getFeaturesForDisabledAccEditUser : function(allAccounts,accLevelFeatures){
    var accExist = false;
    var featuresArr = [];
    for(var i=0;i<allAccounts.length;i++){
      accExist = false;
      for(var j=0;j<accLevelFeatures.length;j++){
        if(allAccounts[i].accountId === accLevelFeatures[j].accountId){
          accExist = true;
          break;
        }
      }
      //assign permissions to accounts disabled
      if(accExist === false) {
        var accFeatures ={"accountName": allAccounts[i].accountName,
                          "accountId": allAccounts[i].accountId,
                          "accountType": allAccounts[i].accountType,
                          "featurePermissions":[]
                         };
        accFeatures.featurePermissions = JSON.parse(JSON.stringify(accLevelFeatures[0].featurePermissions));
        for (var k = 0; k < accFeatures.featurePermissions.length; k++) {
          var features = accFeatures.featurePermissions[k];
          //features.isEnabled = "false"; 
          features.isEnabled = "true";
          for (var l = 0; l < features.permissions.length; l++) {
            //features.permissions[l].isEnabled = "false";
            features.permissions[l].isEnabled = "true";
          }
        }
        featuresArr.push(accFeatures);
      }
    }
    return featuresArr;
  },
  /*
  * add default limits for any of disabled accounts
  * @param: all {accounts,features,defaultLimits} for cif, acc level limits
  * @return : limits for disabled accounts
  */
  getLimitsForDisabledAccEditUser : function(allAccFeaturesObj,accLevelLimits){
    var accExist = false;
    var limitsArr = [];
    var allAccounts = allAccFeaturesObj.accounts;
    var accLevelfeatures = allAccFeaturesObj.accFeatures;
    var defaultLimits = allAccFeaturesObj.defaultLimits
    for(var i=0;i<allAccounts.length;i++){
      accExist = false;
      for(var j=0;j<accLevelLimits.length;j++){
        if(allAccounts[i].accountId === accLevelLimits[j].accountId){
          accExist = true;
          break;
        }
      }
      //assign limits to accounts disabled
      if(accExist === false) {
        var accLimits ={"accountName": allAccounts[i].accountName,
                          "accountId": allAccounts[i].accountId,
                          "accountType": allAccounts[i].accountType,
                          "featurePermissions":[]
                         };
        var currAccFeatures =[];
        for(let k=0; k<accLevelfeatures.length; k++){
          if(accLevelfeatures[k].accountId === allAccounts[i].accountId){
            currAccFeatures = accLevelfeatures[k].featurePermissions;
            break;
          }
        }
        //to get acc level limits for acc level features of disabled accounts
        var limitFeaturePerm = this.getLimitsForAllAccLvlFeaturesOfAcc(currAccFeatures, defaultLimits);
        accLimits.featurePermissions = limitFeaturePerm;
        limitsArr.push(accLimits);
      }
    }
    return limitsArr;
  },
  /*
  * get limits for acc level features of disabled accounts from contract-role level
  * @param: acc level features, default limits of a cust
  * @returns: featurePermissions Arr for limit
  */
  getLimitsForAllAccLvlFeaturesOfAcc : function(accLvlFeatures, defaultLimits){
    var accLimitFeaturePerm = [],featureActionId =[];;
    for(let i=0; i<accLvlFeatures.length; i++){
       var actions = accLvlFeatures[i].actions || accLvlFeatures[i].permissions;
      for(let j=0; j<actions.length; j++){
        if(actions[j].typeId === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
          featureActionId.push(accLvlFeatures[i].featureId+"$"+actions[j].actionId);
        }
      }
    }
    for(let i=0;i<defaultLimits.length; i++){
      for(let j=0; j<defaultLimits[i].actions.length; j++){
        var id = defaultLimits[i].featureId+"$"+defaultLimits[i].actions[j].actionId;
        if(featureActionId.indexOf(id) >= 0){
          accLimitFeaturePerm.push(JSON.parse(JSON.stringify(defaultLimits[i])));
        }
      }
    }
    var formattedFeaturePermArr = this.getLimitsMapToFormEditObject(accLimitFeaturePerm,2,true);
    return formattedFeaturePermArr;
  },
  /*
  * get limits for disabled account level features from cust and role level
  * @param: acc level features, acc level limits, default limits of a cust
  */
  getLimitsForDisabledFeatures : function(features,accLevelLimits, defaultLimits){
    var featuresList = JSON.parse(features);
    var limitsList = accLevelLimits;
    var limitIds = [];
    var limitsToAdd = [];
    for(var p=0; p<limitsList.length; p++){
      var actions = limitsList[p].actions || limitsList[p].permissions;
      for(var q=0; q<actions.length; q++){
        limitIds.push(limitsList[p].featureId+"$"+actions[q].actionId);
      }
    }
    var missingLimits =[];
    //get the feature id for features that are not in limits
    for(var a=0; a<featuresList.length; a++){
      var actions = featuresList[a].actions || featuresList[a].permissions;
      for(var b=0; b<actions.length; b++){
        var id = featuresList[a].featureId+"$"+actions[b].actionId;
        if(actions[b].typeId === this.AdminConsoleCommonUtils.constantConfig.MONETARY && 
           limitIds.indexOf(id) < 0){
          missingLimits.push(id);
        }
      }
    }
    for(var i=0;i<defaultLimits.length; i++){
      for(var j=0; j<defaultLimits[i].actions.length; j++){
        var id = defaultLimits[i].featureId+"$"+defaultLimits[i].actions[j].actionId;
        if(missingLimits.indexOf(id) >= 0){
          limitsToAdd.push(JSON.parse(JSON.stringify(defaultLimits[i])));
        }
      }
    }
    var updatedLimitsArr = this.getLimitsMapToFormEditObject(limitsToAdd,1,true);
    return updatedLimitsArr;
  },
  /*
  * concat existing limits data with missising actions limits
  * @param: existing limits data, new limits to include
  * @return: limits array to show
  */
  concatLimitsData : function(actualLimits, newLimitsMap){
    var newLimitsObj = {},newFeaturesArr = [];
    var updateLimitArr = JSON.parse(JSON.stringify(actualLimits));
    var featureIds = newLimitsMap.keys();
    for(let i=0; i<actualLimits.length; i++){
      if(newLimitsMap.has(actualLimits[i].featureId)){
        updateLimitArr[i] = newLimitsMap.get(actualLimits[i].featureId);
      }else{
        var featureObj = newLimitsMap.get(actualLimits[i].featureId);
        if(featureObj){
          newFeaturesArr.push(featureObj);
        }
      }
    }
    updateLimitArr.concat(newFeaturesArr);
    return updateLimitArr;
  },
  /*
  * get features actions nested structure from flat structure
  * @param: features actions flat structure array
  * @return: nested features actions
  */
  getFeatureBasedActions : function(allFeatureActions, option){
    var isActionFormat = allFeatureActions.length > 0 ? allFeatureActions[0].hasOwnProperty("actions") || allFeatureActions[0].hasOwnProperty("permissions") : true;
    if(!isActionFormat){
       var featureJson ={};
      for(var i=0;i<allFeatureActions.length ;i++){
        var limits;
        if (option === 1) { //add remaining limits and get json obj
          limits = this.addNewLimitsToExistingLimits(allFeatureActions[i].limits);
        } else if (option === 2) { //get existing array
          limits = allFeatureActions[i].limits;
        } else { //get json obj
          limits = this.getLimitValuesJsonFromArray(allFeatureActions[i].limits);
        }
        var action = {"accessPolicyId": allFeatureActions[i].accessPolicyId,
                      "actionDescription": allFeatureActions[i].actionDescription,
                      "actionId": allFeatureActions[i].actionId,
                      "actionLevelId": allFeatureActions[i].actionLevelId,
                      "actionName": allFeatureActions[i].actionName,
                      "actionStatus": allFeatureActions[i].actionStatus,
                      "dependentActions": allFeatureActions[i].dependentActions,
                      "isAccountLevel": allFeatureActions[i].isAccountLevel,
                      "limitGroupId":  allFeatureActions[i].limitGroupId,
                      "limits":  limits,
                      "actualLimits" : allFeatureActions[i].limits,
                      "typeId": allFeatureActions[i].typeId
                     };
        if(featureJson.hasOwnProperty(allFeatureActions[i].featureId) === false){ //a new entry
          featureJson[allFeatureActions[i].featureId] = {"featureDescription": allFeatureActions[i].featureDescription,
                                                         "featureId": allFeatureActions[i].featureId,
                                                         "featureName": allFeatureActions[i].featureName,
                                                         "featureStatus": allFeatureActions[i].featureStatus,
                                                         "isAccountLevel": allFeatureActions[i].isAccountLevel,
                                                         "actions":[]
                                                        };

        }
        featureJson[allFeatureActions[i].featureId].actions.push(action);
      }
      // featureJson[allFeatureActions[i].featureId].actions.push(action);
      var nestedFeatures = Object.values(featureJson);
      return nestedFeatures;
    } else{
      return allFeatureActions;
    }
    //var nestedFeatures = Object.values(featureJson);
    //return nestedFeatures;
  },
  /*
  * set data to filters in the edit user accounts tab
  */
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
    this.view.accountTypesFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.ownershipFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;

    this.view.accountTypesFilterMenu.segStatusFilterDropdown.setData(typesData);
    this.view.ownershipFilterMenu.segStatusFilterDropdown.setData(ownershipData);

    this.view.flxAccountsFilter.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeTypeText)+55+"px";
    this.view.flxOwnershipFilter.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeOwnerTypeText)+55+"px";
    var selTypeInd = [],selOwnerInd = [];
    for(var j=0;j<typesList.length;j++){
      selTypeInd.push(j);
    }
    for(var k=0;k<ownerTypeList.length;k++){
      selOwnerInd.push(k);
    }
    self.view.accountTypesFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selTypeInd]];
    self.view.ownershipFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selOwnerInd]];
    this.view.forceLayout();
  },
  /*
  * filter the account data based on selection
  * @returns: filtered results
  */
  filterAccountsOnTypeOwnership : function(){
    var selFilter = [[]];
    var dataToShow = [];
    var accountsData = this.view.enrollEditAccountsCard.segAccountFeatures.info.segData[0][1];
    var typeIndices = this.view.accountTypesFilterMenu.segStatusFilterDropdown.selectedIndices;
    var ownershipIndices = this.view.ownershipFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];    
    var selTypeInd = null;
    var selOwnershipInd = null;
    //get selected types
    var types = "";
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter[0][0].push(this.view.accountTypesFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].lblDescription);
    }
    //get ownership types
    var types = "";
    selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter[0][1].push(this.view.ownershipFilterMenu.segStatusFilterDropdown.data[selOwnershipInd[j]].lblDescription);
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToShow = [];
    }else if(selFilter[0][0].length ===this.view.accountTypesFilterMenu.segStatusFilterDropdown.data.length && selFilter[0][1].length==this.view.ownershipFilterMenu.segStatusFilterDropdown.data.length)
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
  /*
  * on click of option in the accounts tab filters
  */
  onRowClickOfAccountsTabFilters : function(){
    var accountSegData = this.view.enrollEditAccountsCard.segAccountFeatures.info.segData;
    var filteredData = this.filterAccountsOnTypeOwnership();
    if(filteredData.length > 0){
      var sectionData = accountSegData[0][0];
      this.view.enrollEditAccountsCard.segAccountFeatures.setData([[sectionData,filteredData]]);
    }else{
      this.view.enrollEditAccountsCard.segAccountFeatures.setData([]);
    }
  },
  /*
  * set account types data to filter in features/limits tabs
  * @param: option(features:1,limits:2)
  */
  setFilterDataInFeaturesLimitsTab : function(option){
    var self =this;
    var accTypes = [], listBoxData = [], custId = "";
    var widgetDataMap = {
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    if(option === 1)
      custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    else
      custId = this.view.customersDropdownLimits.lblSelectedValue.info.customerId;
    //var selCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var userDetailsObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
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
  /*
  * filter the account level features/limits based on selected acc types
  * @param: option(1:features,2:limits)
  * @return: filtered feature/limits card components
  */
  filterFeaturesLimitsBasedOnAccType: function (option) {
    var custId = this.view.customersDropdownFeatures.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
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
    var selFilter = [],dataToShow = [];
    //get selected types
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
  /*
  * validations on click of enroll now button
  * @return: true/false
  */
  validateOnClickOfEnroll : function(){
    var segData = this.view.segEnrollCustList.data;
    for(var i=0; i< segData.length; i++){
      var isValid = this.validateServiceRoleSelection(i);
      if(!isValid) break;
    }
    return isValid;
  },
  /*
  * set status data in search screen
  * @param: status configuration response
  */
  setCustomerStatusListData : function(statusConfiguration){
    var configuration = JSON.parse(statusConfiguration.value);
    var stautsCodes = configuration.code ? configuration.code : [];
    var statusList = stautsCodes.reduce(
      function (arr, record) {
        return arr.concat([[record.codeId, record.codeName]]);
      }, [["select", "Select a status"]]
    );
    this.view.lstBoxSearchParam23.masterData = statusList;
    this.view.lstBoxSearchParam23.selectedKey = "select";
    this.setCustomerStatusSegData(statusConfiguration);
	this.view.forceLayout();
  },
  setCustomerStatusSegData : function(statusListString){
    var statusList=JSON.parse(statusListString.value);
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
  * set ownership filter data on expand of each account in bulk update popup
  * @param: selected section accounts data
  */
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
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.setData(ownershipData);
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.width=this.AdminConsoleCommonUtils.getLabelWidth(maxSizeOwnerTypeText)+55+"px";
    var selOwnerInd = [];
    for(var j=0;j<ownershipList.length;j++){
      selOwnerInd.push(j);
    }
    this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.selectedIndices = [[0,selOwnerInd]];
    this.view.forceLayout();
  },
  /*
  * set ownership filter data on expand of each account in bulk update popup
  */
  filterAccountRowsInBulkUpdate : function(){
    var selFilter =[], dataToShow =[],count = 0;
    var selInd = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.selectedsectionindex;
    var segData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.allData;
    var accSegData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    var selectedAccType = accSegData[selInd][0].lblFeatureName;
    var sectionData = segData[selectedAccType].sectionData;
    var accountsData = segData[selectedAccType].rowData;
    var ownershipIndices = this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.selectedIndices;
    var selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter.push(this.view.bulkUpdateFeaturesLimitsPopup.filterMenu.segStatusFilterDropdown.data[selOwnershipInd[j]].lblDescription);
    }
    for(var i=0;i<accountsData.length; i++){
      if (selFilter.indexOf(accountsData[i].lblAccountHolder.text) >= 0){
        accountsData[i].flxContractEnrollAccountsEditRow.isVisible = true;
        count = count +1;
      }
      else
        accountsData[i].flxContractEnrollAccountsEditRow.isVisible = false;
    }
    var headerChecboxImg = count === 0 ? this.AdminConsoleCommonUtils.checkboxnormal :
        (count === accountsData.length ? this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxPartial);
    sectionData.imgSectionCheckbox.src= headerChecboxImg;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.rowTemplate = "flxContractEnrollAccountsEditRow";
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setSectionAt([sectionData,accountsData], selInd);
    this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * add customer to enroll segment after creating contract for them
  * @param: create contract payload,response
  */
  addCustomersFromCreatedContract : function(contractInfo){
    var enrollSegData, newSegRowToAdd =[], rowsIndexArr =[],updatedServiceId = "";
    this.showEnrollCustomer();
    var contractDetails = contractInfo.contractDetails;
    var customers = JSON.parse(contractDetails.contractCustomers);
    for(var i=0; i<customers.length; i++){
      var data ={"Name": customers[i].coreCustomerName,
                 "Customer_id": customers[i].coreCustomerId,
                 "serviceId": contractDetails.serviceDefinitionId,
                 "custDetails": ""};
      var custDetails ={
        "contractId": contractInfo.contractId || "",
        "contractName": contractDetails.contractName,
        "addressLine1": contractDetails.address[0] ? contractDetails.address[0].addressLine1 : "",
        "addressLine2": contractDetails.address[0] ? contractDetails.address[0].addressLine2 : "",
        "coreCustomerId": customers[i].coreCustomerId,
        "coreCustomerName": customers[i].coreCustomerName,
        "email": contractDetails.communication[0] ? contractDetails.communication[0].email : "",
        "isBusiness":customers[i].isBusiness,
        "phone": contractDetails.communication[0] ? contractDetails.communication[0].phoneNumber : "",
        "zipCode": contractDetails.address[0] ? contractDetails.address[0].zipCode : "",
        "autoSyncAccounts": this.autoSyncAccountsFlag
      };
      data.custDetails = custDetails;
      var existingCustObj = this.checkIfCustomerAlreadyAdded(customers[i].coreCustomerId);
      this.isEditUserAccessVisited[customers[i].coreCustomerId] = false;
      if(existingCustObj.isExists === false){ //customer does not exist
        enrollSegData = this.mapCustomerDataforEnrollSeg(data);
        enrollSegData.lstBoxService.enable = false;
        enrollSegData.lstBoxService.selectedKey = data.serviceId;
        enrollSegData.lstBoxService.skin = "sknLbxborderd7d9e03pxradiusF3F3F3Disabled";
        enrollSegData.isNewlyAdded = true;
        //if primary cust is associated later
        var customerDetails = this.presenter.getCurrentCustomerDetails();
        var currUserId = customerDetails.primaryCustomerId;
        enrollSegData.flxPrimary.isVisible = data.custDetails.coreCustomerId === currUserId ? true : false;
        newSegRowToAdd.push(enrollSegData);
      } else{ //customer exists - reset role
        var existingCustDetails = existingCustObj.existingCust;
        existingCustDetails.flxPrimary.isVisible = existingCustDetails.flxPrimary.isVisible;
        updatedServiceId = data.serviceId;
        existingCustDetails.lstBoxService.masterData = this.getServiceListBoxMappedData();
        existingCustDetails.lstBoxService.selectedKey = data.serviceId;
        existingCustDetails.lstBoxService.selectedkey = data.serviceId;
        existingCustDetails.lstBoxRole.selectedKey = "select";
        existingCustDetails.lstBoxRole.selectedkey = "select";
        this.view.segEnrollCustList.setDataAt(existingCustDetails,existingCustObj.rowInd);
        rowsIndexArr.push(existingCustObj.rowInd);
      }
    }
    //append the newly added customers to enroll segment
    for(var k=0; k<newSegRowToAdd.length; k++){
      rowsIndexArr.push(this.view.segEnrollCustList.data.length);
      this.view.segEnrollCustList.addDataAt(newSegRowToAdd[k],this.view.segEnrollCustList.data.length);
    }
    //fetch roles list to set
    if(newSegRowToAdd.length > 0)
      this.fetchRolesforSelectedService(newSegRowToAdd[0].lstBoxService.selectedKey,rowsIndexArr,null,true);
    else if(newSegRowToAdd.length === 0 && rowsIndexArr.length > 0)
      this.fetchRolesforSelectedService(updatedServiceId,rowsIndexArr,null,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave,true,true);
  },
  /*
  * remove customers in enroll seg when any customers deleted from contract edit
  * @param:edit temp contract payload
  */
  removeContractDelCustFromEnrollSeg : function(contractPayload){
    var customers = JSON.parse(contractPayload.contractCustomers);
    var segCustomers = this.view.segEnrollCustList.data;
    var custId =[]; 
    for(var j=0;j<customers.length; j++){
      custId.push(customers[j].coreCustomerId)
    }
     //remove the customer deleted from temp contract if any
    for(var i=0; i<segCustomers.length; i++){
      if(segCustomers[i].custDetails.contractId === "" &&
         custId.indexOf(segCustomers[i].custId) < 0){
        this.presenter.deleteAccountsFeaturesForEnrollCust(segCustomers[i].custId);
        this.view.segEnrollCustList.removeAt(i);
        
      }
    }
  },
  /*
  * remove any temp contract customers when service is updated for primary cust
  * @param : curr row index
  */
  removeTempContractCustFromEnrollSeg : function(currRowInd){
    var segCustomers = this.view.segEnrollCustList.data;
    for(var i=0; i<segCustomers.length; i++){
      if(segCustomers[i].custDetails.contractId === "" && i !== currRowInd){
        this.presenter.deleteAccountsFeaturesForEnrollCust(segCustomers[i].custId);
        this.view.segEnrollCustList.removeAt(i);
        
      }
    }
  },
  /*
  * filter the user accounts based acounts selected in temp contract
  * @param: accounts list, customer id
  * @return : filter user accounts to show
  */
  getFilteredAccFromTempContract : function(accounts,custId){
    var filteredAcc =[];
    var enrollSegData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var contractExists = enrollSegData.custDetails.contractId !== "" ? true : false;
    var tempContractDetails = this.presenter.getCreateContractPayload();
    if(!contractExists && tempContractDetails && Object.keys(tempContractDetails).length > 0){
      var contractCust = JSON.parse(tempContractDetails.contractCustomers);
      for(var i=0;i<contractCust.length; i++){
        if(contractCust[i].coreCustomerId === custId){
          var contractAccounts = contractCust[i].accounts;
          var userAccounts = accounts;
          for(var j=0; j<userAccounts.length; j++){
            var userAccId = userAccounts[j].accountNumber ||userAccounts[j].accountId;
            for(var k=0; k<contractAccounts.length; k++){
              var contractAccId = contractAccounts[k].accountNumber ||contractAccounts[k].accountId;
              //filter for enabled accounts in contract
              if(userAccId === contractAccId){
                if(contractAccounts[k].isEnabled && contractAccounts[k].isEnabled === "false"){
                  //ignore the account
                }else{
                  filteredAcc.push(userAccounts[j]);
                }
                break;
              }
            }
          }
          break;
        }
      }
       return filteredAcc;
    }
    else{ // if no temp contract
       return accounts;
    }
  },
  /*
  * filter the user features based on features selected in temp contract
  * @param: features list, customer id
  * @return : filter user features to show
  */
  getFilteredFeaturesFromTempContract: function (accLevelFeaturesUserObj, custId) {
    var filteredFeatures = [], contractFeatureActions = [];;
    var enrollSegData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var contractExists = enrollSegData.custDetails.contractId !== "" ? true : false;
    var tempContractDetails = this.presenter.getCreateContractPayload();
    if (!contractExists && tempContractDetails && Object.keys(tempContractDetails).length > 0) {
      var accountLvlFeatures = tempContractDetails.accountLevelPermissions;
      var contractCust = JSON.parse(tempContractDetails.contractCustomers);
      /*for(var i=0;i<contractCust.length; i++){
        if(contractCust[i].coreCustomerId === custId){
          var contractFeatures = contractCust[i].features;
          //get all the enabled features from temp contract
          for(var j=0; j<contractFeatures.length; j++){
            var contractActions = contractFeatures[j].actions || contractFeatures[j].permissions;
            for(var k=0; k<contractActions.length; k++){
              if(contractActions[k].isAllowed === "true")
                contractFeatureActions.push(contractFeatures[j].featureId +"$"+contractActions[k].actionId);
            }
          }
          //filter features for user based on contract features
          var userFeatures = features;
          for(var p=0; p<userFeatures.length; p++){
            var filterActions = [];
            var userActions = userFeatures[p].actions || userFeatures[p].permissions;
            for(var q=0; q<userActions.length; q++){
              var id = userFeatures[p].featureId+"$"+userActions[q].actionId;
              if(contractFeatureActions.includes(id)){
                filterActions.push(userActions[q]);
              }
            }
            if(filterActions.length > 0){
              userFeatures[p].actions = filterActions;
              filteredFeatures.push(userFeatures[p]);
            }
          }
          break;
        }
      }*/
      for (var m = 0; m < accountLvlFeatures.length; m++) {
        if (accountLvlFeatures[m].coreCustomerId === custId) {
          for (var n = 0; n < accountLvlFeatures[m].accounts.length; n++) {
            var contractFeatures = accountLvlFeatures[m].accounts[n].featurePermissions || accountLvlFeatures[m].accounts[n].features;
            for (var j = 0; j < contractFeatures.length; j++) {
              var contractActions = contractFeatures[j].actions || contractFeatures[j].permissions;
              for (var k = 0; k < contractActions.length; k++) {
                if (contractActions[k].isEnabled === "true" || contractActions[k].isAllowed === "true")
                  contractFeatureActions.push(contractFeatures[j].featureId + "$" + contractActions[k].actionId);
              }
            }
            var userFeatures = accLevelFeaturesUserObj[accountLvlFeatures[m].accounts[n].accountId] || [];
            filteredFeatures =[];
            for (var p = 0; p < userFeatures.length; p++) {
              var filterActions = [];
              var userActions = userFeatures[p].actions || userFeatures[p].permissions;
              for (var q = 0; q < userActions.length; q++) {
                var id = userFeatures[p].featureId + "$" + userActions[q].actionId;
                if (contractFeatureActions.includes(id)) {
                  filterActions.push(userActions[q]);
                }
              }
              if (filterActions.length > 0) {
                userFeatures[p].actions = filterActions;
                filteredFeatures.push(userFeatures[p]);

              }
            }
            accLevelFeaturesUserObj[accountLvlFeatures[m].accounts[n].accountId] = filteredFeatures;
          }
          break;
        }
      }
    }
    return accLevelFeaturesUserObj;
  },
  
  
  /******  CREATE/EDIT CONTRACT FUNCTIONS  *****/
  
  
  /*
  * enroll form
  * show contract screen on clik of create new contract
  */
  onCreateContractClick : function(){
    var scopeObj = this;
    scopeObj.view.tbxRecordsSearch.text="";
    scopeObj.action = scopeObj.actionConfig.create;
    scopeObj.updateButtonsText(false);
    scopeObj.showCreateContractScreen();
    scopeObj.setContractButtonsSkin(false);
    scopeObj.enableAllTabs(false);
    scopeObj.presenter.getServiceDefinitionsForContracts(scopeObj.legalentityid1 || "","contracts");
    scopeObj.view.segAddedCustomers.setVisibility(true);
    scopeObj.view.btnSelectCustomers.setVisibility(true);
    scopeObj.view.lblContractCustomersHeader.text= kony.i18n.getLocalizedString("i18n.contracts.selectCustomers_LC");
    scopeObj.view.flxNoCustomersAdded.setVisibility(false);
    scopeObj.showContractServiceScreen();
    scopeObj.monetaryLimits={};
    scopeObj.createContractRequestParam={
      "contractName": "",
      "serviceDefinitionName": "",
      "serviceDefinitionId": "",
      "faxId": "",
      "communication": [],
      "address": [],
      "contractCustomers": [],
      "accountLevelPermissions":[]
    };
    scopeObj.view.typeHeadContractCountry.tbxSearchKey.info = {"isValid":false,"data":""};
    scopeObj.getCountrySegmentData();
    scopeObj.view.forceLayout();
  },
  updateButtonsText : function(isEdit){
    var btnText=isEdit? kony.i18n.getLocalizedString("i18n.contracts.updateContract_UC"):kony.i18n.getLocalizedString("i18n.Contracts.createContract");
    this.view.commonButtonsCustomers.btnSave.text=btnText;
    this.view.contractDetailsCommonButtons.btnSave.text=btnText;
    this.view.commonButtonsContractAccounts.btnSave.text=btnText;
    this.view.commonButtonsContractFA.btnSave.text=btnText;
    this.view.commonButtonsContractLimits.btnSave.text=btnText;
    this.view.forceLayout();
  },
  /*
  * enroll form
  * set skin for all buttons in create contract
  */
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
  /*
  * enroll form
  * enable all vertical tabs  in create contract
  */
  enableAllTabs : function(isEnable){
    for (let x=0;x<6;x++){
      this.view.verticalTabsContract["flxOption"+x].setEnabled(isEnable);
    }
    this.view.forceLayout();
  },
  /*
  * enroll form
  * show service selection screen in contract
  */
  showContractServiceScreen: function(){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow0,this.view.verticalTabsContract.btnOption0);
    this.hideAllScreens();
    if(this.view.tbxRecordsSearch.text.length>0)
      this.view.flxClearRecordsSearch.onClick();
    this.view.flxContractServiceTab.setVisibility(true);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * toggle selected vertical tab skins
  */
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
  * enroll form
  * create service definition cards dynamically
  */
  setContractServiceCards : function(services){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow0,this.view.verticalTabsContract.btnOption0);
    this.view.flxContractServiceCards.removeAll();
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var left =20, top =20, width = 0;
    for (var i = 0; i < services.length; i++) {
      width = (screenWidth -305-230-35-60-60)/3;
      var alertServiceCard = new com.adminConsole.contracts.serviceCard({
        "id": "serviceCard"+i,
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
  },
  /*
  * enroll form
  * set data to the service definition card
  * category data, card to add
  */
  setServiceCardData : function(serviceDefinition, serviceCard,width){
    var self = this;
    var tempContractDetails = this.presenter.getCreateContractPayload();
    serviceCard.lblCategoryName.info ={"catId":serviceDefinition.id};
    var labelCharCount=Math.ceil(width/7);
    serviceCard.lblCategoryName.text=this.AdminConsoleCommonUtils.getTruncatedString(serviceDefinition.name, labelCharCount, labelCharCount-3);
    serviceCard.lblCategoryName.toolTip = serviceDefinition.name;
    serviceCard.lblContent1.info={"groupId":serviceDefinition.serviceType};
    if(serviceDefinition.serviceType === "TYPE_ID_RETAIL"){
      serviceCard.lblContent1.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking");
      serviceCard.flxServiceTag.skin="sknflxCustomertagRedRadius4px";
      serviceCard.flxServiceTag.width="100px";
    }
    else if(serviceDefinition.serviceType === "TYPE_ID_BUSINESS"){
      serviceCard.lblContent1.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking");
      serviceCard.flxServiceTag.skin="sknflxCustomertagPurpleRadius4px";
      serviceCard.flxServiceTag.width="115px";
    }
    if(this.action === this.actionConfig.edit && tempContractDetails.serviceDefinitionId === serviceDefinition.id){
      serviceCard.skin="sknFlxbgF8F9FAbdr003E75Shadow";
      this.selectedServiceCard=serviceCard.id;
    }
    serviceCard.onClick = function(){
      //should make all the other cards skins to normal skins
      if(self.selectedServiceCard){
      var cards=self.view.flxContractServiceCards.widgets();
        self.view[self.selectedServiceCard].skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        if(self.createContractRequestParam.contractCustomers.length!==0)
          self.presenter.getServiceDefinitionFeaturesAndLimits({"serviceDefinitionId":serviceCard.lblCategoryName.info.catId});
      }
      self.createContractRequestParam.serviceDefinitionId=serviceCard.lblCategoryName.info.catId;
      self.createContractRequestParam.serviceDefinitionName=serviceCard.lblCategoryName.toolTip;
      self.view.lstBoxContractService.masterData=[[serviceCard.lblCategoryName.toolTip,serviceCard.lblCategoryName.toolTip]];
      self.view.lstBoxContractService.selectedKey= self.view.lstBoxContractService.masterData[0][0];
      serviceCard.skin="sknFlxbgF8F9FAbdr003E75Shadow";
      self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtonsServiceDetails.btnSave,true,true);
      self.view.verticalTabsContract.flxOption0.setEnabled(true);
      self.view.verticalTabsContract.flxOption1.setEnabled(true);
      self.selectedServiceCard=serviceCard.id;
    }
    this.view.flxContractServiceCards.add(serviceCard);
    this.view.forceLayout();
  },
   /*
   * enroll form
  * set filter data in contract services tab
  * @param: search result
  */
  setDataToServiceTypeFilter : function(data){
    var self = this;
    var statusList=[],maxLenText = "";
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
      return {
        "serviceType": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec === "TYPE_ID_RETAIL"?kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking"):
                               rec === "TYPE_ID_BUSINESS"?kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking"):"Retail & Business Banking"
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
  * enroll form
  * filter the company's list based on the business type selected
  */
  performServiceTypeFilter : function(){
    var self = this;
    var selType = [];
    var selInd;
    var dataToShow = [];
    var allData = self.view.flxContractServiceCards.info.totalRecords;
    var segStatusData = self.view.serviceTypeFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.serviceTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
    if(indices){
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selType.push(self.view.serviceTypeFilterMenu.segStatusFilterDropdown.data[selInd[i]].serviceType);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.setContractServiceCards(allData);
        self.view.flxContractServiceCards.setVisibility(true);
        self.view.flxNoServiceSearchResults.setVisibility(false);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selType.indexOf(rec.serviceType) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setContractServiceCards(dataToShow);
          self.view.flxContractServiceCards.setVisibility(true);
          self.view.flxNoServiceSearchResults.setVisibility(false);
        } else {
          self.view.flxContractServiceCards.setVisibility(false);
          self.view.flxNoServiceSearchResults.setVisibility(true);
        }
      }
    } else{
      self.view.flxContractServiceCards.setVisibility(false);
      self.view.flxNoServiceSearchResults.setVisibility(true);
    }
  },
  /*
  * enroll form
  * search for service definitions in create contracts
  */
  searchServiceCards : function(){
    var searchText=this.view.tbxRecordsSearch.text.toLowerCase();
    var serviceDef=this.view.flxContractServiceCards.info.totalRecords;
    var serviceName="";
    var searchResults=serviceDef.filter(function(service){
      serviceName=service.name.toLowerCase();
      if(serviceName.indexOf(searchText)>=0)
        return service;
    });
    if(searchResults.length>0){
      this.setContractServiceCards(searchResults);
      this.view.flxNoServiceSearchResults.setVisibility(false);
      this.view.flxContractServiceCards.setVisibility(true);
    }
    else{
      this.view.flxNoServiceSearchResults.setVisibility(true);
      this.view.flxContractServiceCards.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
  * enroll form
  * show add customers screen in contracts
  */
  showContractCustomersScreen: function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow1,this.view.verticalTabsContract.btnOption1);
    if(isNextClick)
      this.view.flxContractServiceTab.setVisibility(false);
    else
      this.hideAllScreens();
    this.view.verticalTabsContract.flxOption0.setEnabled(true);
    this.view.verticalTabsContract.flxOption1.setEnabled(true);
    this.view.flxContractCustomersTab.setVisibility(true);
    this.setSelectedCustomersData(1);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * show contract details scren in contract
  */
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
  /*
  * enroll form
  * set contract details
  */
  setContractDetails : function(){
    var contractData={};
    var contact="";
    if(this.action === this.actionConfig.create){
      var primaryData=this.primaryContractCustomer;
      contractData.name=primaryData.coreCustomerName;
      contractData.faxId=primaryData.faxId?primaryData.faxId:"";
      contractData.email=primaryData.email?primaryData.email:"";
      contractData.address1=primaryData.addressLine1?primaryData.addressLine1:"";
      contractData.address2=primaryData.addressLine2?primaryData.addressLine2:"";
      contractData.zipCode=primaryData.zipCode?primaryData.zipCode:"";
      contractData.country=primaryData.country?primaryData.country:"";
      contractData.city=primaryData.city?primaryData.city:"";
      contact=primaryData.phone.split("-");
    }else{
      var contractDetails=this.presenter.getCreateContractPayload();
      var contractCommunication = contractDetails.communication;
      var contractAddr = contractDetails.address;
      this.view.lstBoxContractService.masterData=[[contractDetails.serviceDefinitionId,contractDetails.serviceDefinitionName]];
      contractData.name=contractDetails.contractName;
      contractData.faxId=contractDetails.faxId ?contractDetails.faxId:"";
      contractData.email= contractCommunication[0] && contractCommunication[0].email ? contractCommunication[0].email:"";
      contractData.address1= contractAddr[0] && contractAddr[0].addressLine1 ? contractAddr[0].addressLine1:"";
      contractData.address2= contractAddr[0] && contractAddr[0].addressLine2 ? contractAddr[0].addressLine2:"";
      contractData.zipCode=  contractAddr[0] && contractAddr[0].zipCode ? contractAddr[0].zipCode:"";
      contractData.country= contractAddr[0] && contractAddr[0].country ? contractAddr[0].country:"";
      contractData.city= contractAddr[0] && contractAddr[0].city ? contractAddr[0].city:"";
      contact=[contractCommunication[0].phoneCountryCode,contractCommunication[0].phoneNumber];
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
  /*
  * enroll form
  * show popup for customer search
  */
  showCustomerSearchPopup : function(isFirstTime){
    this.resetCoreCustomerSearch();
    this.setNormalSkinToCoreSearch();
    this.view.flxSearchFilter.setVisibility(true);
    this.view.lblIconArrow.text="";
    this.view.commonButtonsContractSearchCust.btnNext.setVisibility(false);
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
    this.view.flxRelatedCustomerSegContracts.setVisibility(false);
    this.view.lblNoCustomersSearched.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
    this.view.flxNoCustomersSearched.setVisibility(true);
    this.view.lblRelatedcustSubHeading.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractSearchCust.btnSave,true,false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractSearchCust.btnNext,false,false);
    this.view.flxSearchBreadcrumb.info={"added":[]};
    this.view.flxSearchFilter.info={"added":[]};
    this.view.segBreadcrumbs.setData([]);
    var i=this.view.flxSearchBreadcrumb.widgets().concat([]);
    this.view.flxSearchFilter.removeAll();
    for(var x=2;x<i.length-1;x++)
    	this.view.flxSearchBreadcrumb.remove(i[x]);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * add the searched customer from customer search in contracts flow
  */
  addCustomer : function(customerInfo){
    this.view.flxCustomerSearchPopUp.info={"action":"SEGMENTCLICK"};
    this.view.commonButtonsContractSearchCust.btnNext.setVisibility(true);
    this.view.flxCustomerSearchHeader.setVisibility(false);
    this.view.flxCustomersBreadcrumb.setVisibility(true);
    this.view.flxAddedCustomerInfo.setVisibility(true);
    this.view.flxCustomerAdvSearch.setVisibility(false);
    this.view.flxCustomerDetailsContainer.setVisibility(false);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractSearchCust.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractSearchCust.btnNext,false,true);
    if(this.view.flxSearchBreadcrumb.info.added)
    this.addBreadcrumb(customerInfo);
    var isAdded=false;
    for(var i=0;i<this.selectedCustomers.length;i++){
      if(this.selectedCustomers[i].coreCustomerId === customerInfo.coreCustomerId&&this.selectedCustomers[i].isSelected)
        isAdded=true;
    }
    if(isAdded === false)
    	this.addCustomerTag(this.view.flxSearchFilter,customerInfo.coreCustomerName,customerInfo.coreCustomerId);
    this.view.flxLoading2.setVisibility(true);
    this.presenter.getRelatedCustomers({"coreCustomerId" : customerInfo.coreCustomerId,"legalEntityId":this.legalentityid1 || ""},"contracts");
    this.view.forceLayout();
  },
  /*
  * enroll form
  * add the selected customer tags in screen
  */
  addCustomerTag : function(tagParentFlex,customerName,id){
    var self = this;
    var toCheck = this.view.btnUpdateInBulkFA.info;
    var tagsCount=tagParentFlex.widgets().length;
    var uniqueId = tagsCount.toString();
    var lblname = tagsCount + "lblTagName";
    var imgname = tagsCount + "flxCross";
    if (this.view.flxContractFA.isVisible) {//as the same type of name is set at "Add customers" popup
      uniqueId = uniqueId + "FA";
      lblname = tagsCount + "FAlblTagName";
      imgname = tagsCount + "FAflxCross";
    }
    var newTextTag = self.view.flxFilterTag.clone(uniqueId);
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(customerName,"12px Lato-Regular");
    tagParentFlex.info.added.push([customerName,id]);
    if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      newTextTag.width = flexWidth + 10 + 10 + 28 + "px";        //labelwidth+left padding+right padding+ cross image width	
      newTextTag[lblname].text = customerName + " (" + id + ")";
      newTextTag[lblname].tooltip = customerName + " (" + id + ")";
      newTextTag.isVisible = true;
      newTextTag.info = customerName;
    }
    else {
      newTextTag.width = flexWidth + 10 + 10 + 15 + "px";         //labelwidth+left padding+right padding+ cross image width
    newTextTag[lblname].text = customerName;
      newTextTag[lblname].tooltip = customerName;
      newTextTag.isVisible = true;
    newTextTag.info=id;
    }
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
      if(tagParentFlex.widgets().length === 1){
        self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtonsContractSearchCust.btnSave,true,false);
        self.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.commonButtonsContractSearchCust.btnNext,false,false);
      }
      if (self.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
        self.removeTagContracts(tagParentFlex, customerName);
      }
      else {
      self.removeTagContracts(tagParentFlex,id.parent.info);
      }
    if (self.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      self.removeTagContracts(tagParentFlex,customerName);
    }
    else{
      self.removeTagContracts(tagParentFlex,id.parent.info);
    }
    };
    tagParentFlex.setVisibility(true);
    this.view.forceLayout();
  },
  /*
   * function to remove a selected tag
   * @param : selectedflex id
   */
  removeTagContracts: function(tagParentFlex,id) {
    //remove the flex tag
    var totalAccounts = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data[0][1].length;
    var toCheck = this.view.btnUpdateInBulkFA.info;
    var selectedAccountsCount;
    if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][0] === id) {
          // selectedAccountsCount = tagParentFlex.info.added[x][1];
          //this.totalAccountsViewFeature = this.totalAccountsViewFeature - selectedAccountsCount;
          tagParentFlex.info.added.splice(x, 1);
          break;
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
    } else if (this.view.flxContractFA.isVisible && toCheck == "CUSTLVL") {
      var selCust = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][1] === id) tagParentFlex.info.added.splice(x, 1);

      }
      selCust = selCust.filter(function (custId) {
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
    var addedCount = tagParentFlex.info.added.length;
    var addedCustomers = tagParentFlex.info.added;
    tagParentFlex.info.added = [];
    for (var x = 0; x < addedCount; x++) {
      if (this.view.flxContractFA.isVisible) {
        this.addAccountsTagContract(tagParentFlex, addedCustomers[x][0], addedCustomers[x][1], addedCount);
      } else {
        this.addCustomerTag(tagParentFlex, addedCustomers[x][0], addedCustomers[x][1]);
      }
    }
    this.toCheckDeleteTagConditions();
    this.view.forceLayout();
  },
  removeSelectedCustomer: function(tagParentFlex,id){
    var removedCustId=id;
    if(tagParentFlex.id!="flxTagsContainer"){
      var relativeCustomers=this.view.segRelatedCustomersContract.data;
      var self=this;
      for(var i=0;i<this.selectedCustomers.length;i++){
        if(this.selectedCustomers[i].coreCustomerId === removedCustId){
          this.selectedCustomers[i].isSelected=false;
          if(this.view.lblDataInfo11.text==removedCustId){//if its the last tag , the current customer checkbox should be unselected
            this.view.lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
            this.view.lblCheckbox.skin=this.applyCheckboxSkin(this.view.lblCheckbox);
          }else{//if that customer id displayed in the current screen
            for(let x=0;x<relativeCustomers.length;x++){
              if(relativeCustomers[x].lblData1.text === removedCustId){
                relativeCustomers[x].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
                relativeCustomers[x].lblCheckbox.skin=this.applyCheckboxSkin(relativeCustomers[x].lblCheckbox);
                relativeCustomers[x].flxCheckbox.onClick = function(context){self.relatedCustomersCheckboxClick(context,self.selectedCustomers[i])};
                relativeCustomers[x].flxRelatedCustomerRow.onClick = function(){self.addCustomer(self.selectedCustomers[i])};
                this.view.segRelatedCustomersContract.setData(relativeCustomers);
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
      segData[0][0].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      for(var i=0;i<segData[0][1].length;i++){
       if(segData[0][1][i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl&&segData[0][1][i].custInfo.coreCustomerId === removedCustId){        
          segData[0][0].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
          segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
          break;
        }
      }
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(segData); 
      for(let x=0;x<this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length;x++){
        if(removedCustId === this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust[x].coreCustomerId){
          this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.splice(x,1);
          break;
        }
      }
    }
  },
  showContractAccountsScreen: function(isNextClick){
    this.toggleContractVerticalTabs(this.view.verticalTabsContract.flxImgArrow3,this.view.verticalTabsContract.btnOption3);
    if(isNextClick)
      this.view.flxContractDetailsTab.setVisibility(false);
    else
      this.hideAllScreens();
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
    this.view.lblNoCustomersSelectedFA.text = kony.i18n.getLocalizedString("i18n.contracts.selectCustomerFeatures");
    this.view.flxContractFeaturesToggleButtons.setVisibility(false);
    this.view.flxContractsFATopSection.setVisibility(true);
    this.view.flxAddProductFeaturesBack.setVisibility(false);
    this.view.flxContractAccountFAList.setVisibility(false);
    this.view.flxAddProductFeatures.setVisibility(false);
    this.view.flxFABulkUpdateScreen.setVisibility(false);
    this.view.flxNoCustomerSelectedFA.setVisibility(true);
    this.view.flxContractFAList.setVisibility(false);
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
    this.setCustomersDropDownList("customersDropdownContractLimits");
    this.view.forceLayout();
  },
  showContractSearch : function(currFlex){
    currFlex.setVisibility(false);
    this.view.flxContractServiceTab.setVisibility(true);
    this.view.flxCreateContract.setVisibility(false);
    this.view.flxSearchCompanies.setVisibility(true);
    this.view.flxNoFilterResults.setVisibility(true);
    this.view.segSearchResults.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.btnDropdownList.setVisibility(true);
    this.view.btnAddOldCompany.setVisibility(true);
    this.view.flxSettings.setVisibility(false);
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.forceLayout();
  },
  setContractSearchResults : function(){
    let contractInfo = {
      "contractId": this.view.txtSearchParam2.text.trim(),
      "contractName": this.view.txtSearchParam1.text.trim(),
      "coreCustomerId": this.view.txtSearchParam4.text.trim(),
      "coreCustomerName": this.view.txtSearchParam6.text.trim(),
      "email": this.view.txtSearchParam5.text.trim(),
      "phoneCountryCode": this.view.textBoxSearchContactNumber.txtISDCode.text.trim(),
      "phoneNumber": this.view.textBoxSearchContactNumber.txtContactNumber.text.trim() ,
      "country": this.view.txtSearchParam3.text.trim(),
      "serviceDefinitionId": this.view.lstbxSearchServiceDef.selectedKey == "" ? "" :this.view.lstbxSearchServiceDef.selectedKey.trim()
      };
    let srchTxt = 'Showing Results for ';
    let keys = Object.keys(contractInfo);
    keys.forEach(function(key){
      // return in a forEach() callback is equivalent to continue
      if(contractInfo[key] === ""){
         return;
      }

      srchTxt = srchTxt +' , '+contractInfo[key];
    });
    srchTxt = srchTxt.substring(0, srchTxt.length - 1);
    this.view.lblResultsFor.text = srchTxt;
    this.presenter.getSearchContract(contractInfo);
  },
  /*
  * create features card at customer level
  */
  setFeaturesDataCustomersContracts : function(featureData){
    this.view.ContractFAList.lblName.setVisibility(true);
    this.view.ContractFAList.toggleCollapseArrow(true);
    this.view.ContractFAList.flxArrow.setVisibility(false);
    this.view.btnUpdateInBulkFA.setVisibility(true);
    this.view.ContractFAList.flxSelectAllOption.setVisibility(true);
    this.view.ContractFAList.flxCardBottomContainer.setVisibility(true);
    this.view.ContractFAList.flxCheckbox.onClick = this.onSelectAllFeaturesClickContracts.bind(this, this.view.ContractFAList,featureData);
    this.setFeaturesAtCustomerLevelContracts(this.view.ContractFAList.segAccountFeatures,featureData);
  },
  /*
 * set features and actions segment data in feature card
 * @param: segment widget path
 */
  setFeaturesAtCustomerLevelContracts: function (segmentPath, featureData) {
    var self = this;
    var selectedFeaturesCount = 0;
    var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
    var featuresSegData = featureData.map(function (rec) {
      var segRowData = [];
      var segSecData = {
        "id":rec.id ||rec.featureId,
        "lblTopSeperator":{"isVisible":false},
        "flxCheckbox":{"onClick": self.onSectionCheckboxClickContracts.bind(self,segmentPath)},
        //"imgSectionCheckbox":{"src": self.AdminConsoleCommonUtils.checkboxSelected},
        "lblSectionCheckbox":{"isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknIconBg0066CASz20pxCheckbox"},
        "lblCheckboxOptions":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknIconBg0066CASz20pxCheckbox"},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "flxToggleArrow":{"onClick": self.toggleSegmentSectionArrowContracts.bind(self,segmentPath)},
        "lblFeatureName":rec.name||rec.featureName,
        "lblStatusValue":{"text":rec.status=== self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ||rec.featureStatus=== self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                             kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
        "lblIconStatusTop":{"skin":rec.status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE||rec.featureStatus=== self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                              "sknFontIconActivate":"sknfontIconInactive","text":"\ue921"},
        "lblBottomSeperator":"-",
        "lblAvailableActions": kony.i18n.getLocalizedString("i18n.contracts.availableActions"),
        "lblCountActions": { "text": rec.actions === undefined? rec.permissions.length:rec.actions.length},
        "lblTotalActions": { "text": "of " + (rec.actions === undefined ? rec.permissions.length : rec.actions.length)},
        "featureData": rec,
        "template": "flxContractEnrollFeaturesEditSection"
      };
      var selectedActionsCount=0;
      var dependentActions=[];
      var actions = rec.actions ? rec.actions : rec.permissions;
      for(var i=0;i < actions.length; i++){
        dependentActions=[];
        var actionImg= self.AdminConsoleCommonUtils.checkboxSelectedlbl;
        if(actions[i].isEnabled){
          actionImg=actions[i].isEnabled === "true"? self.AdminConsoleCommonUtils.checkboxSelectedlbl:self.AdminConsoleCommonUtils.checkboxnormallbl;
        }
        else{
          if(self.action === self.actionConfig.edit)
            actionImg=actions[i].isAllowed === "true"? self.AdminConsoleCommonUtils.checkboxSelectedlbl:self.AdminConsoleCommonUtils.checkboxnormallbl;           
        }
        if(actionImg=== self.AdminConsoleCommonUtils.checkboxSelectedlbl)
          selectedActionsCount++;
        if(actions[i].dependentActions&&actions[i].dependentActions.length>0){
          if(typeof actions[i].dependentActions === "string")//as we are getting string format in edit flow and object format in create flow
            dependentActions=(actions[i].dependentActions.substring(1,actions[i].dependentActions.length-1)).split(",");
          else
            dependentActions=actions[i].dependentActions.map(function(rec){return rec.id});
        }
        segRowData.push({
          "id":actions[i].id||actions[i].actionId,
          "isRowVisible": false,
          "dependentActions": dependentActions,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false},
          "flxFeatureNameCont":{"isVisible":true},
          "lblCheckbox":{"isVisible":true,"text":actionImg,"skin":self.applyCheckboxSkin(actionImg)},
          "flxCheckbox":{"onClick":self.onClickFeaturesRowCheckboxContracts.bind(self,segmentPath)},
          "lblFeatureName":{"text":actions[i].name||actions[i].actionName},
          "lblStatus":{"text":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                       kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active") :kony.i18n.getLocalizedString("18n.frmPermissionsController.InActive")},
          "lblIconStatus":{"skin":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE?"sknFontIconActivate":"sknfontIconInactive"},
          "template":"flxContractEnrollFeaturesEditRow",
        });
      }
      var headerImg=self.getHeaderCheckboxImage(segRowData,true, true);
      segSecData.lblSectionCheckbox.text=headerImg;
      segSecData.lblSectionCheckbox.skin = self.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      segSecData.lblCountActions.text=selectedActionsCount.toString();
      if(headerImg=== self.AdminConsoleCommonUtils.checkboxSelectedlbl ||headerImg === self.AdminConsoleCommonUtils.checkboxPartiallbl)
        selectedFeaturesCount++;
      return [segSecData, segRowData];
    });
    segmentPath.widgetDataMap = this.getWidgetDataMapForFeatures();
    segmentPath.info = {"selectedFeaturesCount":selectedFeaturesCount};
    segmentPath.rowTemplate="flxContractEnrollFeaturesEditRow";
    segmentPath.setData(featuresSegData);
    this.view.ContractFAList.lblCount.text= this.getSelectedItemsCount(featuresSegData, false);
    this.view.ContractFAList.lblTotalCount.text= "of " + this.getTwoDigitNumber(featuresSegData.length) ;
    this.view.ContractFAList.lblSectionCheckbox.text = self.getHeaderCheckboxImage(featuresSegData,false, true);
    this.view.ContractFAList.lblSectionCheckbox.skin = this.applyCheckboxSkin(this.view.ContractFAList.lblSectionCheckbox);
    /*
    //To validate whether atleast one feature is selected or not
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
    this.view.forceLayout();
  },
  applyCheckboxSkin : function(lblPath){
      var skinVal = (lblPath.text== this.AdminConsoleCommonUtils.checkboxnormallbl)?"sknBgB7B7B7Sz20pxCheckbox": "sknIconBg0066CASz20pxCheckbox" ;
    return skinVal;
  },
  onSectionCheckboxClickContracts : function(segmentWidPath,event){
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    var selSecInd = event.rowContext.sectionIndex;
    var segData = segmentWidPath.data;
    var isActionEnabled="false";
    var img = (segData[selSecInd][0].lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?  this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    var actionIds=[];
    segData[selSecInd][0].lblSectionCheckbox.text = img;
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    for(var i =0;i<segData[selSecInd][1].length; i++){
      actionIds.push(segData[selSecInd][1][i].id);
      segData[selSecInd][1][i].lblCheckbox.text = img;
      segData[selSecInd][1][i].lblCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][1][i].lblCheckbox);
    }
    if(img===this.AdminConsoleCommonUtils.checkboxnormallbl){
      segData[selSecInd][0].lblCountActions.text="0";
    }
    else{
      segData[selSecInd][0].lblCountActions.text=segData[selSecInd][1].length.toString();
    }
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    isActionEnabled=img === this.AdminConsoleCommonUtils.checkboxnormallbl?"false":"true";
    this.view.ContractFAList.lblCount.text="("+segmentWidPath.info.selectedFeaturesCount+")";
    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
        for(var k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          if(this.createContractRequestParam.contractCustomers[j].features[k].featureId === segData[selSecInd][0].id){
            var actionsList = this.createContractRequestParam.contractCustomers[j].features[k].actions ? this.createContractRequestParam.contractCustomers[j].features[k].actions:
                                           this.createContractRequestParam.contractCustomers[j].features[k].permissions;
            for(var l=0;l<actionsList.length;l++){
              if(actionIds.includes(actionsList[l].actionId))
              actionsList[l].isEnabled=isActionEnabled;
              this.updateAllAccountLvlActions(actionsList[l].actionId, selectedCustId, isActionEnabled);
            }
            break;
          }
        }
        break;
      }
    }
    //set image for select all features image
    this.view.ContractFAList.lblSectionCheckbox.text = this.getHeaderCheckboxImage(segData,false,true);
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
   * enroll form
  * select all features click
  * @param: selected card widget path
  */
  onSelectAllFeaturesClickContracts : function(cardWidgetPath){
    var selectedCustId=this.view.customersDropdownFA.lblSelectedValue.info.id;
    var segData = cardWidgetPath.segAccountFeatures.data;
    var img = (cardWidgetPath.lblSectionCheckbox.text  ===  this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
    var featureIds=[];
    cardWidgetPath.lblSectionCheckbox.text = img;
    cardWidgetPath.lblSectionCheckbox.skin = this.applyCheckboxSkin(cardWidgetPath.lblSectionCheckbox);
    cardWidgetPath.lblCount.text = (img === this.AdminConsoleCommonUtils.checkboxnormallbl ? "0": this.getTwoDigitNumber(segData.length));
    for(var i=0;i<segData.length; i++){
      segData[i][0].lblSectionCheckbox.text = img;
      segData[i][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[i][0].lblSectionCheckbox);
      segData[i][0].lblCountActions.text=img === this.AdminConsoleCommonUtils.checkboxnormallbl?"0":segData[i][1].length.toString();
      featureIds.push(segData[i][0].id);
      for(var j=0;j<segData[i][1].length; j++){
        segData[i][1][j].lblCheckbox.text = img;
        segData[i][1][j].lblCheckbox.skin = this.applyCheckboxSkin(segData[i][1][j].lblCheckbox);
      }
    }
    var isActionEnabled=img === this.AdminConsoleCommonUtils.checkboxnormallbl?"false":"true";
    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
        for(var k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          if(featureIds.includes(this.createContractRequestParam.contractCustomers[j].features[k].featureId)){
            var actionsList = this.createContractRequestParam.contractCustomers[j].features[k].actions ? this.createContractRequestParam.contractCustomers[j].features[k].actions :
                                            this.createContractRequestParam.contractCustomers[j].features[k].permissions;
            for(var l=0;l<actionsList.length;l++){
              actionsList[l].isEnabled=isActionEnabled;
              this.updateAllAccountLvlActions(actionsList[l].actionId, selectedCustId, isActionEnabled);
            }
          }
        }
        break;
      }
    }
    cardWidgetPath.segAccountFeatures.setData(segData);
   /* //enable/disable save buttons
    var isValid = this.validateSelForMultipleCardsContracts(cardWidgetPath,"segAccountFeatures",true);
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
  toggleSegmentSectionArrowContracts : function(segmentWidgetPath,event){
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
  onClickFeaturesRowCheckboxContracts : function(segmentWidPath,event){
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
            segData[selSecInd][1][y].lblCheckbox.text =segData[selSecInd][1][selRowInd].lblCheckbox.text;
             segData[selSecInd][1][y].lblCheckbox.skin =this.applyCheckboxSkin(segData[selSecInd][1][y].lblCheckbox);
            updatedActionIds.push(segData[selSecInd][1][y].id);
          }
        }
      }
    }
    isActionEnabled=segData[selSecInd][1][selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl?"false":"true";
    var headerCheckImg = this.getHeaderCheckboxImage(segData[selSecInd][1],true, true);
    segData[selSecInd][0].lblSectionCheckbox.text=headerCheckImg;
    segData[selSecInd][0].lblSectionCheckbox.skin = this.applyCheckboxSkin(segData[selSecInd][0].lblSectionCheckbox);
    //to update the selected actions count (dependent actions also)    
    segData[selSecInd][0].lblCountActions.text = this.getSelectedItemsCount(segData[selSecInd][1], true, false);
    segmentWidPath.setSectionAt(segData[selSecInd],selSecInd);
    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId===selectedCustId){
        for(var k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          var actionsList = this.createContractRequestParam.contractCustomers[j].features[k].actions ? this.createContractRequestParam.contractCustomers[j].features[k].actions :
                                     this.createContractRequestParam.contractCustomers[j].features[k].permissions;
          for(var l=0;l<actionsList.length;l++){
            if(updatedActionIds.includes(actionsList[l].actionId))
              actionsList[l].isEnabled=isActionEnabled;
          }
        }
        break;
      }
    }
    //set image for select all features image
    var headerCheckImg = this.getHeaderCheckboxImage(segData,false,true);
    this.view.ContractFAList.lblSectionCheckbox.text=headerCheckImg;
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
  showHideSegRowFlexContracts : function(rowsData,visibility){
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
  * search in features tab contracts
  */
  searchFAContracts : function(features){
    var searchText=this.view.tbxContractFASearch.text.toLowerCase();
    var searchedActions=[];
    var featureName="";
    var actionName="";
    var searchResults=features.filter(function(feature){
      featureName=feature.name?feature.name.toLowerCase():feature.featureName.toLowerCase();
      if(featureName.indexOf(searchText)>=0)
        return feature;
      else {
        searchedActions = [];
        for (let x = 0; x < feature.actions.length; x++) {
          actionName = feature.actions[x].name ? feature.actions[x].name.toLowerCase() : feature.actions[x].actionName.toLowerCase();
          if (actionName.indexOf(searchText) >= 0)
            searchedActions.push(feature.actions[x]);
        }
        if (searchedActions.length > 0) {
          feature.actions = searchedActions;
          return feature;
        }
      }
    });
    if(searchResults.length>0){
      this.setFeaturesAtCustomerLevelContracts(this.view.ContractFAList.segAccountFeatures,searchResults);
      this.view.flxNoCustomerSelectedFA.setVisibility(false);
      this.view.flxContractFAList.setVisibility(true);
    }
    else{
      this.view.lblNoCustomersSelectedFA.text= kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.imgContractFA.setVisibility(false);
      this.view.flxNoCustomerSelectedFA.setVisibility(true);
      this.view.flxContractFAList.setVisibility(false);
    }
  },
 /*
  * create limits card at customer level
  */
  setLimitsDataForCustomer : function(limitsData){
    this.view.flxContractLimits.info={"isValid":true};
    this.view.ContractLimitsList.flxCardBottomContainer.setVisibility(true);
    this.setLimitsAtCustomerLevelContracts(limitsData);
  },
   /*
  * widget map function for edit user limits segment at customer level
  * @returns: widget data map for limits segment
  */
  getWidgetMapForLimitsContract : function(){
    var widgetMap = {
      "flxContractsLimitsHeaderCreate": "flxContractsLimitsHeaderCreate",
      "flxHeader": "flxHeader",
      "flxActionDetails": "flxActionDetails",
      "flxRow1": "flxRow1",
      "flxToggle": "flxToggle",
      "lblToggle": "lblToggle",
      "lblFeatureName": "lblFeatureName",
      "flxRow2": "flxRow2",
      "lblMonetaryActions": "lblMonetaryActions",
      "lblCountActions": "lblCountActions",
      "flxViewLimitsHeader": "flxViewLimitsHeader",
      "lblActionHeader": "lblActionHeader",
      "flxPerLimitHeader": "flxPerLimitHeader",
      "lblPerLimitHeader": "lblPerLimitHeader",
      "flxLimitInfo1": "flxLimitInfo1",
      "fontIconInfo1": "fontIconInfo1",
      "flxDailyLimitHeader": "flxDailyLimitHeader",
      "lblDailyLimitHeader": "lblDailyLimitHeader",
      "flxLimitInfo2": "flxLimitInfo2",
      "fontIconInfo2": "fontIconInfo2",
      "flxWeeklyLimitHeader": "flxWeeklyLimitHeader",
      "lblWeeklyLimitHeader": "lblWeeklyLimitHeader",
      "flxLimitInfo3": "flxLimitInfo3",
      "fontIconInfo3": "fontIconInfo3",
      "lblFASeperator2": "lblFASeperator2",
      "lblFASeperator1": "lblFASeperator1",
      "lblFASeperatorTop": "lblFASeperatorTop",
      "flxContractsLimitsBodyCreate": "flxContractsLimitsBodyCreate",
      "flxLimitActionName": "flxLimitActionName",
      "flxRangeIcon": "flxRangeIcon",
      "lblIconRangeInfo": "lblIconRangeInfo",
      "flxViewLimits": "flxViewLimits",
      "lblAction": "lblAction",
      "flxPerLimitTextBox": "flxPerLimitTextBox",
      "tbxPerValue": "tbxPerValue",
      "lblCurrencySymbol1": "lblCurrencySymbol1",
      "flxDailyLimitTextBox": "flxDailyLimitTextBox",
      "tbxDailyValue": "tbxDailyValue",
      "lblCurrencySymbol2": "lblCurrencySymbol2",
      "flxWeeklyLimitTextBox": "flxWeeklyLimitTextBox",
      "tbxWeeklyValue": "tbxWeeklyValue",
      "lblCurrencySymbol3": "lblCurrencySymbol3",
      "flxLimitError1": "flxLimitError1",
      "lblLimitError1": "lblLimitError1",
      "lblLimitErrorIcon1": "lblLimitErrorIcon1",
      "flxLimitError2": "flxLimitError2",
      "lblLimitError2": "lblLimitError2",
      "lblLimitErrorIcon2": "lblLimitErrorIcon2",
      "flxLimitError3": "flxLimitError3",
      "lblLimitError3": "lblLimitError3",
      "lblLimitErrorIcon3": "lblLimitErrorIcon3",
      "lblLimitsSeperator": "lblLimitsSeperator",
      "id": "id",
      "featuresData": "featuresData"
    };
    return widgetMap;
  },
   /*
  * set limits segment data in limits card at account level
  */
  setLimitsAtCustomerLevelContracts : function(featuresData){
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
      //mappedData.push([segHeaderData,segBodyData]);
      segData.push([segHeaderData,segBodyData]);
    }
    this.view.ContractLimitsList.segAccountFeatures.widgetDataMap = this.getWidgetMapForLimitsContract();
    this.view.ContractLimitsList.segAccountFeatures.rowTemplate = "flxContractsLimitsBodyCreate";
    this.view.ContractLimitsList.segAccountFeatures.setData(segData);
    this.validateLimits();
    //this.view.ContractLimitsList.segAccountFeatures.info={"data":mappedData};
    this.view.forceLayout();
  },
  /*
  * enroll form
  * set data to limits card in contracts
  */
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
      "lblCountActions":{"text":feature.actions.length},
      "lblActionHeader":{"text":kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP")},
      "lblPerLimitHeader":{"text":kony.i18n.getLocalizedString("i18n.contracts.perTransaction_UC")},
      "flxLimitInfo1":{"onHover" : function(widget, context) {
			var info = kony.i18n.getLocalizedString("i18n.contracts.RangePerInfo")+" " + (feature.name||feature.featureName) + " " + kony.i18n.getLocalizedString("i18n.contracts.RangeMsg");
			self.onHoverLimitsCallBack(widget, context,info);
		}
                      },
      "fontIconInfo1":{"text":""},
      "lblDailyLimitHeader":{"text":kony.i18n.getLocalizedString("i18n.contracts.dailyTransaction_UC")},
      "flxLimitInfo2":{"onHover" : function(widget, context) {
			var info = kony.i18n.getLocalizedString("i18n.contracts.RangeDailyInfo")+" " + (feature.name||feature.featureName) + " " + kony.i18n.getLocalizedString("i18n.contracts.RangeMsg");
			self.onHoverLimitsCallBack(widget, context,info);
		}
                      },
      "fontIconInfo2":{"text":""},
      "lblWeeklyLimitHeader":{"text":kony.i18n.getLocalizedString("i18n.contracts.weeklyTransaction_UC")},
      "flxLimitInfo3":{"onHover" : function(widget, context) {
			var info = kony.i18n.getLocalizedString("i18n.contracts.RangeWeeklyInfo")+" " + (feature.name||feature.featureName) + " " + kony.i18n.getLocalizedString("i18n.contracts.RangeMsg");
			self.onHoverLimitsCallBack(widget, context,info);
		}
                      },
      "fontIconInfo3":{"text":""},
      "featureId":feature.id||feature.featureId,
      "lblFASeperator2":"-",
      "lblFASeperator1":"-"
    };
  },
  /*
  * enroll form
  * set data to limits card rows contracts
  */
  mapContractLimitsBody : function(action,featuresData,featureId){
   var self=this;
    var perLimit,dailyLimit,weeklyLimit=0;
    var legalEntity= self.getLEDesc(self.legalentityid1 || "");
    self.currencyValue=  self.defaultCurrencyCode(legalEntity[0].baseCurrency,true);
    for(var x=0;x<action.limits.length;x++){
      if(action.limits[x].id === "DAILY_LIMIT")
        dailyLimit=action.limits[x].value;
      if(action.limits[x].id === "MAX_TRANSACTION_LIMIT")
        perLimit=action.limits[x].value;
      if(action.limits[x].id === "WEEKLY_LIMIT")
        weeklyLimit=action.limits[x].value;
    }
    var range=action.id?this.monetaryLimits[featureId][action.id]:this.monetaryLimits[featureId][action.actionId];
    return{
      "actionId":action.id||action.actionId,
      "featuresData":featuresData,
      "template":"flxContractsLimitsBodyCreate",
      "flxContractsLimitsBodyCreate":{"isVisible":false},
      "lblAction":{"text":action.name||action.actionName},
      "flxRangeIcon":{"onHover" : function(widget,context){self.showRangeTooltipContract(widget,context,range);},"info":{"range":range}},
      "lblIconRangeInfo":{"text":"\ue9b9"},
      "flxPerLimitTextBox":{"skin":"sknflxEnterValueNormal"},
      "tbxPerValue":{"text":perLimit},
      "lblCurrencySymbol1":{"text": self.currencyValue},
      "flxDailyLimitTextBox":{"skin":"sknflxEnterValueNormal"},
      "tbxDailyValue":{"text":dailyLimit},
      "lblCurrencySymbol2":{"text":self.currencyValue},
      "flxWeeklyLimitTextBox":{"skin":"sknflxEnterValueNormal"},
      "tbxWeeklyValue":{"text":weeklyLimit},
      "lblCurrencySymbol3":{"text":self.currencyValue},
      "flxLimitError1":{"isVisible":false},
      "lblLimitError1":{"text":""},
      "lblLimitErrorIcon1":{"text":self.currencyValue},
      "flxLimitError2":{"isVisible":false},
      "lblLimitError2":{"text":""},
      "lblLimitErrorIcon2":{"text":self.currencyValue},
      "flxLimitError3":{"isVisible":false},
      "lblLimitError3":{"text":""},
      "lblLimitErrorIcon3":{"text":self.currencyValue},
      "lblLimitsSeperator":"-"
    }
  },
  /*
  * enroll form
  * update the limit values entered in the payload object
  */
  updateLimitValues : function(context,featuresData,limitId){
    var selectedCustId=this.view.customersDropdownContractLimits.lblSelectedValue.info.id;
    var isValid=true;
    var segData=this.view.ContractLimitsList.segAccountFeatures.data;
    // To update limit values in global variable
    for(let a=0;a<segData.length;a++){
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
          for(let k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
            if((this.createContractRequestParam.contractCustomers[j].features[k].id&&this.createContractRequestParam.contractCustomers[j].features[k].id === segData[a][0].featureId)||(this.createContractRequestParam.contractCustomers[j].features[k].featureId&&this.createContractRequestParam.contractCustomers[j].features[k].featureId === segData[a][0].featureId)){
              for(var b=0;b<segData[a][1].length;b++){
                var actionsList = this.createContractRequestParam.contractCustomers[j].features[k].actions ? this.createContractRequestParam.contractCustomers[j].features[k].actions :
                                                 this.createContractRequestParam.contractCustomers[j].features[k].permissions;
                for(let l=0;l<actionsList.length;l++){
                  if((actionsList[l].id&&actionsList[l].id === segData[a][1][b].actionId)||
                     (actionsList[l].actionId&&actionsList[l].actionId === segData[a][1][b].actionId)){
                    actionsList[l].limits[1].value=segData[a][1][b].tbxPerValue.text;
                    actionsList[l].limits[2].value=segData[a][1][b].tbxDailyValue.text;
                    actionsList[l].limits[0].value=segData[a][1][b].tbxWeeklyValue.text;
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
  /*
  * enroll form
  * To get customer Id's list where there is limit violation contract
  */
  validateAllLimitsContracts : function(){
    var range="";
    var featureId="";
    var actionId="";
    var errorCustIds=[];
    var isRangeValid=true;
    var isValid=true;
    this.updateLimitValues();
    for (var x = 0; x < this.createContractRequestParam.contractCustomers.length; x++) {
      for (let y = 0; y < this.createContractRequestParam.contractCustomers[x].features.length; y++) {
        if (this.createContractRequestParam.contractCustomers[x].features[y].type === "MONETARY") {
          featureId = this.createContractRequestParam.contractCustomers[x].features[y].featureId;
          for (let z = 0; z < this.createContractRequestParam.contractCustomers[x].features[y].actions.length; z++) {
            if (this.createContractRequestParam.contractCustomers[x].features[y].actions[z].type === "MONETARY" &&
              (this.createContractRequestParam.contractCustomers[x].features[y].actions[z].isEnabled === "true" || this.createContractRequestParam.contractCustomers[x].features[y].actions[z].isAllowed === "true")) {
              actionId = this.createContractRequestParam.contractCustomers[x].features[y].actions[z].actionId;
              isRangeValid = true;
              range = this.monetaryLimits[featureId][actionId];
              var weekly = this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[0].value !== "" ? parseFloat(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[0].value) : "";
              var daily = this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[2].value !== "" ? parseFloat(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[2].value) : "";
              var per = this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[1].value !== "" ? parseFloat(this.createContractRequestParam.contractCustomers[x].features[y].actions[z].limits[1].value) : "";
              if (weekly === "" || weekly > parseFloat(range["WEEKLY_LIMIT"]) || weekly < parseFloat(range["MIN_TRANSACTION_LIMIT"]) || weekly < daily || weekly < per)
                isRangeValid = false;
              if (per === "" || per > parseFloat(range["MAX_TRANSACTION_LIMIT"]) || per < parseFloat(range["MIN_TRANSACTION_LIMIT"]) || per > daily)
                isRangeValid = false;
              if (daily === "" || daily > parseFloat(range["DAILY_LIMIT"]) || daily < parseFloat(range["MIN_TRANSACTION_LIMIT"]))
                isRangeValid = false;
              if (isRangeValid === false) {
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
      if(errorCustIds.length>1){
      this.view.flxLimitsErrorFlag.setVisibility(true);
      this.view.flxContractLimitsContainer.top="55px";
      }else{
        this.view.flxLimitsErrorFlag.setVisibility(false);
      this.view.flxContractLimitsContainer.top="0px"
      }
      this.view.customersDropdownContractLimits.lblSelectedValue.info={"id":errorCustIds[0]};
      this.setSelectedText("customersDropdownContractLimits",errorCustIds[0]);
      this.setCustSelectedData("customersDropdownContractLimits",false);
    }else{
      isValid=true;
      this.view.flxLimitsErrorFlag.setVisibility(false);
      this.view.flxContractLimitsContainer.top="0px";
    }
    this.view.forceLayout();
    return isValid;
  },
  /*
  * enroll form
  * reset limit values in contracts
  */
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
        if (segData[a][1][b].tbxPerValue.text === "" || parseFloat(range["MAX_TRANSACTION_LIMIT"]) < parseFloat(segData[a][1][b].tbxPerValue.text) ||
          parseFloat(range["MIN_TRANSACTION_LIMIT"]) > parseFloat(segData[a][1][b].tbxPerValue.text) ||
          (parseFloat(segData[a][1][b].tbxPerValue.text) > parseFloat(segData[a][1][b].tbxDailyValue.text) &&
            parseFloat(segData[a][1][b].tbxDailyValue.text) > parseFloat(range["MIN_TRANSACTION_LIMIT"]))) {
          isValid = false;
          isSectionValid = false;
          if (segData[a][1][b].tbxPerValue.text === "")
            segData[a][1][b].lblLimitError1.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if (parseFloat(range["MAX_TRANSACTION_LIMIT"]) < parseFloat(segData[a][1][b].tbxPerValue.text) ||
            parseFloat(range["MIN_TRANSACTION_LIMIT"]) >= parseFloat(segData[a][1][b].tbxPerValue.text))
            segData[a][1][b].lblLimitError1.text = kony.i18n.getLocalizedString("i18n.contracts.valueShouldBeWithin") + " " + this.defaultCurrencyCodeSymbol + range["MIN_TRANSACTION_LIMIT"] + " - " + this.defaultCurrencyCodeSymbol + range["MAX_TRANSACTION_LIMIT"];
          else if (parseFloat(segData[a][1][b].tbxPerValue.text) > parseFloat(segData[a][1][b].tbxDailyValue.text) &&
            parseFloat(segData[a][1][b].tbxDailyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"]))
            segData[a][1][b].lblLimitError1.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");

          segData[a][1][b].flxLimitError1.isVisible = true;
          segData[a][1][b].flxPerLimitTextBox.skin = "sknflxEnterValueError";
          segData[a][1][b].lblLimitError1.skin = segData[a][1][b].lblLimitError1.text.indexOf(this.defaultCurrencyCodeSymbol) > -1 ?
            "sknlblErrorIcon12px" : "sknlblError";
        } else {
          segData[a][1][b].flxLimitError1.isVisible = false;
          segData[a][1][b].flxPerLimitTextBox.skin = "sknflxEnterValueNormal";
        }
        //daily transaction limit validation
        if (segData[a][1][b].tbxDailyValue.text === "" || parseFloat(range["DAILY_LIMIT"]) < parseFloat(segData[a][1][b].tbxDailyValue.text) ||
          parseFloat(range["MIN_TRANSACTION_LIMIT"]) > parseFloat(segData[a][1][b].tbxDailyValue.text) ||
          (parseFloat(segData[a][1][b].tbxDailyValue.text) > parseFloat(segData[a][1][b].tbxWeeklyValue.text) &&
            parseFloat(segData[a][1][b].tbxWeeklyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"]))) {
          isValid = false;
          isSectionValid = false;
          if (segData[a][1][b].tbxDailyValue.text === "")
            segData[a][1][b].lblLimitError2.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if (parseFloat(range["DAILY_LIMIT"]) < parseFloat(segData[a][1][b].tbxDailyValue.text) ||
            parseFloat(range["MIN_TRANSACTION_LIMIT"]) > parseFloat(segData[a][1][b].tbxDailyValue.text))
            segData[a][1][b].lblLimitError2.text = kony.i18n.getLocalizedString("i18n.contracts.valueShouldBeWithin") + " " + this.defaultCurrencyCodeSymbol + range["MIN_TRANSACTION_LIMIT"] + " - " + this.defaultCurrencyCodeSymbol + range["DAILY_LIMIT"];
          else if (parseFloat(segData[a][1][b].tbxDailyValue.text) > parseFloat(segData[a][1][b].tbxWeeklyValue.text) &&
            parseFloat(segData[a][1][b].tbxWeeklyValue.text) >= parseFloat(range["MIN_TRANSACTION_LIMIT"])) {
            segData[a][1][b].lblLimitError2.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
            //to show error on per trans limit
            if(parseFloat(segData[a][1][b].tbxPerValue.text) > parseFloat(segData[a][1][b].tbxWeeklyValue.text)&&
               parseFloat(segData[a][1][b].tbxPerValue.text)<= parseFloat(segData[a][1][b].tbxDailyValue.text)){
              segData[a][1][b].lblLimitError1.text= kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
              segData[a][1][b].flxLimitError1.isVisible=true;
              segData[a][1][b].flxPerLimitTextBox.skin="sknflxEnterValueError";
            }
          }
          segData[a][1][b].flxLimitError2.isVisible = true;
          segData[a][1][b].flxDailyLimitTextBox.skin = "sknflxEnterValueError";
          segData[a][1][b].lblLimitError2.skin = segData[a][1][b].lblLimitError2.text.indexOf(this.defaultCurrencyCodeSymbol) > -1 ?
            "sknlblErrorIcon12px" : "sknlblError";
        } else {
          segData[a][1][b].flxLimitError2.isVisible = false;
          segData[a][1][b].flxDailyLimitTextBox.skin = "sknflxEnterValueNormal";
        }
        //weekly transaction limit validation
        if (segData[a][1][b].tbxWeeklyValue.text === "" || parseFloat(range["WEEKLY_LIMIT"]) < parseFloat(segData[a][1][b].tbxWeeklyValue.text) ||
          parseFloat(range["MIN_TRANSACTION_LIMIT"]) > parseFloat(segData[a][1][b].tbxWeeklyValue.text) ||
          parseFloat(segData[a][1][b].tbxDailyValue.text) > parseFloat(segData[a][1][b].tbxWeeklyValue.text)) {
          isValid = false;
          isSectionValid = false;
          if (segData[a][1][b].tbxWeeklyValue.text === "")
            segData[a][1][b].lblLimitError3.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          else if (parseFloat(range["WEEKLY_LIMIT"]) < parseFloat(segData[a][1][b].tbxWeeklyValue.text) ||
            parseFloat(range["MIN_TRANSACTION_LIMIT"]) > parseFloat(segData[a][1][b].tbxWeeklyValue.text))
            segData[a][1][b].lblLimitError3.text = kony.i18n.getLocalizedString("i18n.contracts.valueShouldBeWithin") + " " + this.defaultCurrencyCodeSymbol + range["MIN_TRANSACTION_LIMIT"] + " - " + this.defaultCurrencyCodeSymbol + range["WEEKLY_LIMIT"];
          else
            segData[a][1][b].lblLimitError3.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeGreaterThanDailyLimit");
          segData[a][1][b].flxLimitError3.isVisible = true;
          segData[a][1][b].flxWeeklyLimitTextBox.skin = "sknflxEnterValueError";
          segData[a][1][b].lblLimitError3.skin = segData[a][1][b].lblLimitError3.text.indexOf(this.defaultCurrencyCodeSymbol) > -1 ?
            "sknlblErrorIcon12px" : "sknlblError";
        } else {
          segData[a][1][b].flxLimitError3.isVisible = false;
          segData[a][1][b].flxWeeklyLimitTextBox.skin = "sknflxEnterValueNormal";
        }
      }
      if(isSectionValid === false)
      	errorIndices.push(a);
    }
    this.view.ContractLimitsList.segAccountFeatures.setData(segData);
    if(isValid === false){
      this.view.flxContractLimits.info={"isValid":false};
      this.toggleLimits(errorIndices);
    }else{
      this.view.flxContractLimits.info={"isValid":true};
    }
    this.view.forceLayout();
    return isValid;
  },
  /*
  * enroll form
  * reset limit values in contracts
  */
  resetLimitValues : function(){
    var selectedCustId=this.view.customersDropdownContractLimits.lblSelectedValue.info.id;
    var segData=this.view.ContractLimitsList.segAccountFeatures.data;
    var featureId="";
    var actionId="";
    var limitId="";
    //should update request param with actual values from limitsActualJSON
    for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
        for(let k=0;k<this.createContractRequestParam.contractCustomers[j].features.length;k++){
          featureId=this.createContractRequestParam.contractCustomers[j].features[k].id||this.createContractRequestParam.contractCustomers[j].features[k].featureId;
          var actionsList = this.createContractRequestParam.contractCustomers[j].features[k].actions ? this.createContractRequestParam.contractCustomers[j].features[k].actions :
                                           this.createContractRequestParam.contractCustomers[j].features[k].permissions;
          for(let l=0;l<actionsList.length;l++){
            if(actionsList[l].limits){
              actionId=actionsList[l].id||actionsList[l].actionId;
              for(var m=0;m<actionsList[l].limits.length;m++){
                limitId=actionsList[l].limits[m].id;
                actionsList[l].limits[m].value=this.limitsActualJSON[selectedCustId][featureId][actionId][limitId];
              }
            }
          }
        }
        this.setCustSelectedData("customersDropdownContractLimits",false);
        break;
      }
    }
    this.view.forceLayout();
  },
  /*
  *search in limits tab contracts
  */
  searchLimitsContract : function(features){
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
      this.setLimitsAtCustomerLevelContracts(searchResults);
      this.view.ContractLimitsList.segAccountFeatures.setVisibility(true);
      this.view.ContractLimitsList.flxNoFilterResults.setVisibility(false);
    }
    else{
      this.view.ContractLimitsList.lblNoFilterResults.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.ContractLimitsList.flxNoFilterResults.setVisibility(true);
      this.view.ContractLimitsList.segAccountFeatures.setVisibility(false);
    }
  },
  /*
  * enroll form
  * toggle limits section on click of arrow contracts
  */
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
  /*
  * enroll form
  * limits range icon hover function
  */
  onHoverLimitsCallBack:function(widget, context,info) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
          scopeObj.showOnHoverInfo(context, widGetId, info);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.tooltipEnroll.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.tooltipEnroll.setVisibility(false);
      }
    }
  },
  /*
  * enroll form
  * limits on hover call 
  */
  showOnHoverInfo: function(featureSegment, widGetId, info) {
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
    scopeObj.view.tooltipEnroll.left = leftVal + "px";
    scopeObj.view.tooltipEnroll.top = topVal + "px";
    scopeObj.view.tooltipEnroll.lblNoConcentToolTip.text = info;
    scopeObj.view.tooltipEnroll.lblarrow.skin =  "sknfontIconDescRightArrow14px";
    scopeObj.view.tooltipEnroll.flxToolTipMessage.skin ="sknFlxFFFFFF";
    scopeObj.view.tooltipEnroll.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    scopeObj.view.tooltipEnroll.setVisibility(true);
    scopeObj.view.forceLayout();
  },
  /*
  * show the min-max range for limit in contracts screen
  */
  showRangeTooltipContract : function(widget,context,range){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      this.view.flxRangeTooltipContracts.top = (context.pageY -120)+"dp";
      this.view.flxRangeTooltipContracts.left = (context.pageX - 305 -230 -70) +"dp"; //(pageX -leftmenu-verticaltabs- left,right padding)
      if(this.view.flxRangeTooltipContracts.isVisible === false){
        var minTransValue=this.AdminConsoleCommonUtils.getTruncatedString(range["MIN_TRANSACTION_LIMIT"],10,7);
        this.view.lblIconCurrContract11.text = this.currencyValue;
        this.view.lblRangeValueContract11.text=minTransValue;
      this.view.lblRangeValueContract11.toolTip=range["MIN_TRANSACTION_LIMIT"];
        this.view.lblIconCurrContract12.text = this.currencyValue;
        this.view.lblRangeValueContract12.text=this.AdminConsoleCommonUtils.getTruncatedString(range["MAX_TRANSACTION_LIMIT"],10,7);
      this.view.lblRangeValueContract12.toolTip=range["MAX_TRANSACTION_LIMIT"];
        this.view.lblIconCurrContract21.text = this.currencyValue;
        this.view.lblRangeValueContract21.text=minTransValue;
      this.view.lblRangeValueContract21.toolTip=range["MIN_TRANSACTION_LIMIT"];
        this.view.lblIconCurrContract22.text = this.currencyValue;
        this.view.lblRangeValueContract22.text=this.AdminConsoleCommonUtils.getTruncatedString(range["DAILY_LIMIT"],10,7);
      this.view.lblRangeValueContract22.toolTip=range["DAILY_LIMIT"];
        this.view.lblIconCurrContract31.text = this.currencyValue;
        this.view.lblRangeValueContract31.text=minTransValue;
      this.view.lblRangeValueContract31.toolTip=range["MIN_TRANSACTION_LIMIT"];
        this.view.lblIconCurrContract32.text = this.currencyValue;
        this.view.lblRangeValueContract32.text=this.AdminConsoleCommonUtils.getTruncatedString(range["WEEKLY_LIMIT"],10,7);
      this.view.lblRangeValueContract32.toolTip=range["WEEKLY_LIMIT"];
        this.view.flxRangeTooltipContracts.setVisibility(true);
        this.view.forceLayout();
      }    
    }
  },
  /*
  * show popup to reset limits in contracts
  */
  showResetAllLimitsContractPopup: function() {
    var scopeObj = this;
    scopeObj.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.ResetLimits");
    scopeObj.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.common.Disclaimer");
    scopeObj.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.common.RESET");
    scopeObj.view.popUpDeactivate.btnPopUpDelete.width = "116dp";
    scopeObj.view.popUpDeactivate.rtxPopUpDisclaimer.width = "80%";
    scopeObj.view.popUpDeactivate.setVisibility(true);
    scopeObj.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
        scopeObj.view.flxEnrollCustConfirmationPopup.setVisibility(false);
        scopeObj.resetLimitValues();
    }
    scopeObj.view.forceLayout();
  },
  /*
  * enroll form
  * validate the selection in the create contract tabs
  */
  isValidSelection : function(){
    var isValid=true;
    if(this.view.flxContractDetailsTab.isVisible){
      isValid=this.validateContractDetails();
    }else if(this.view.flxContractAccounts.isVisible&&this.view.flxContractAccountsList.isVisible&&this.view.ContractAccountsList){
      if(this.view.ContractAccountsList.segAccountFeatures.data[0][0].lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl)
        isValid=false;
    }else if(this.view.flxContractLimits.isVisible&&this.view.flxContractLimitsSearch.isVisible){
      isValid=this.validateAllLimitsContracts();
    }
    return isValid; 
  },
  /*
  * enroll form
  * validate the search criteria in popup
  */
  validateCoreCustSearch : function(){
    if (this.view.textBoxEntryContractCust11.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntryContractCust12.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntryContractCust13.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntryContractCust21.txtContactNumber.text.trim() !== ""&&this.view.textBoxEntryContractCust21.txtISDCode.text.trim()!=="") return true;
    if (this.view.customCalCustomerDOB.value !== "") return true;
    if (this.view.lblSelectedRows.text !== "Select Status") return true;
    if (this.view.textBoxEntryContractCust31.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntryContractCust32.tbxEnterValue.text.trim() !== "") return true;
    if (this.view.textBoxEntryContractCust33.tbxEnterValue.text.trim() !== "") return true;
    this.setErrorSkinsToCoreSearch();
    return false;
  },
  /*
  * enroll form
  * set error skin to search fields in popup
  */
  setErrorSkinsToCoreSearch: function(){
    this.view.textBoxEntryContractCust11.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntryContractCust12.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntryContractCust13.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntryContractCust21.txtContactNumber.skin = "skntbxBordereb30173px";
    this.view.textBoxEntryContractCust21.txtISDCode.skin = "skntbxBordereb30173px";
    this.view.flxCalendarDOB22.skin="sknflxEnterValueError";
    this.view.flxDropDown23.skin= "sknflxEnterValueError";
    this.view.textBoxEntryContractCust31.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntryContractCust32.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.textBoxEntryContractCust33.flxEnterValue.skin = "sknflxEnterValueError";
    this.view.imgCustomerSearchError.setVisibility(true);
    this.view.lblCustomerSearchError.setVisibility(true);
  },
  /*
  * enroll form
  * reset to default skins for search fields
  */
  setNormalSkinToCoreSearch: function(){
    this.view.textBoxEntryContractCust11.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntryContractCust12.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntryContractCust13.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntryContractCust21.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.textBoxEntryContractCust21.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.flxCalendarDOB22.skin="sknflxEnterValueNormal";
    this.view.flxDropDown23.skin= "sknflxEnterValueNormal";
    this.view.textBoxEntryContractCust31.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntryContractCust32.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.textBoxEntryContractCust33.flxEnterValue.skin = "sknflxEnterValueNormal";
    this.view.imgCustomerSearchError.setVisibility(false);
    this.view.lblCustomerSearchError.setVisibility(false);
  },
  /*
  * enroll form
  * reset search params for customer search
  */
  resetCoreCustomerSearch : function(){
    this.view.textBoxEntryContractCust11.tbxEnterValue.text = "";
    this.view.textBoxEntryContractCust12.tbxEnterValue.text= "";
    this.view.textBoxEntryContractCust13.tbxEnterValue.text= "";
    this.view.textBoxEntryContractCust21.txtContactNumber.text= "";
    this.view.textBoxEntryContractCust21.txtISDCode.text="";
    this.view.customCalCustomerDOB.resetData=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.customCalCustomerDOB.value="";
    this.view.lblSelectedRows.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Status");
    this.view.textBoxEntryContractCust31.tbxEnterValue.text= "";
    this.view.textBoxEntryContractCust32.tbxEnterValue.text= "";
    this.view.textBoxEntryContractCust33.tbxEnterValue.text= "";
    this.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex=null;
    this.view.forceLayout();
  },
  /*
  * enroll form
  * search for core customer in popup
  */
  searchCoreCustomers : function(){
    var dob=this.getDateFormatYYYYMMDD(this.view.customCalCustomerDOB.value);
    var selectedInd=this.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex?this.view.AdvancedSearchDropDown01.sgmentData.selectedRowIndex[1]:null;
    var status="";
    if(selectedInd)
      status=this.view.AdvancedSearchDropDown01.sgmentData.data[selectedInd].customerStatusId;
    var searchRequest={
      "id":this.view.textBoxEntryContractCust11.tbxEnterValue.text,
      "name":this.view.textBoxEntryContractCust12.tbxEnterValue.text,
      "email":this.view.textBoxEntryContractCust13.tbxEnterValue.text,
      "phoneNumber":this.view.textBoxEntryContractCust21.txtContactNumber.text,
      "phoneCountryCode":this.view.textBoxEntryContractCust21.txtISDCode.text,
      "dob":dob === "NaN-NaN-NaN"?"":dob,
      "customerStatus":status,
      "country":this.view.textBoxEntryContractCust31.tbxEnterValue.text,
      "town":this.view.textBoxEntryContractCust32.tbxEnterValue.text,
      "zipcode":this.view.textBoxEntryContractCust33.tbxEnterValue.text,
      "legalEntityId":this.legalentityid1 || ""
    };
    this.view.flxLoading2.setVisibility(true);
    this.presenter.searchOtherCoreCustomers(searchRequest,"contracts");
  },
  /*
  * enroll form
  * show the core customr results screen UI
  */
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
      this.view.flxRelatedCustomerSegContracts.setVisibility(true);
      this.setCustomerSearchData(customers);
    }else{
      this.view.lblNoCustomersSearched.text==kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
      this.view.flxNoCustomersSearched.setVisibility(true);
      this.view.lblRelatedcustSubHeading.setVisibility(false);
      this.view.flxRelatedCustomerSegContracts.setVisibility(false);
    }
    this.view.flxLoading2.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * data map for customer search results
  */
  getCustomersDataMap : function(){
    return{
      "flxRelatedCustomerList":"flxRelatedCustomerList",
      "flxRelatedCustomerRow":"flxRelatedCustomerRow",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "flxCheckbox":"flxCheckbox",
	  "lblCheckbox":"lblCheckbox",
     // "imgCheckbox":"imgCheckbox",
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
  /*
  * enroll form
  * set customer search results data
  */
  setCustomerSearchData : function(customers){
    var dataMap=this.getCustomersDataMap();
    var self=this;
    this.view.lblRelatedcustSubHeading.setVisibility(true);
    this.view.lblRelatedcustSubHeading.text=kony.i18n.getLocalizedString("i18n.contracts.searchResults")+" ("+customers.length+")";
    var details={};
    var address="";
    var data=customers.map(function(customer){
      if(customer.cityName||customer.country)
          address=self.AdminConsoleCommonUtils.getAddressText(customer.cityName,customer.country);
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
        "lblCheckbox":{"text":self.AdminConsoleCommonUtils.checkboxnormallbl},
        "flxRelatedCustomerRow":{"skin":customer.isAssociated === "true"?"sknFlxbgF3F3F3bdrd7d9e0":"sknFlxbgFFFFFFbdrD7D9E0rd4px",
                                 "onClick":customer.isAssociated === "true"?function(){}:function(){
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
        "flxRightDetailsCont":{"isVisible":customer.isAssociated === "true"?true:false},
        "lblContractInfo":{"text":kony.i18n.getLocalizedString("i18n.contracts.partOfAnotherContract"),"isVisible":customer.isAssociated === "true"?true:false},
        "btnRelation":{"isVisible":false},
        "flxRightActionCont":{"isVisible":false},
        "flxPrimaryBtn":{"isVisible":false},
        "customerInfo":customer
      }
    });
    this.view.segRelatedCustomersContract.widgetDataMap=dataMap;
    this.view.segRelatedCustomersContract.setData(data);
    this.view.flxRelatedCustomerSegContracts.setVisibility(true);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * set the data on click of a related customer from list in popup 
  */
  setSelectedCustomerData : function(relatedCustomers,coreCustomerId){
    var selectedCustIndex=this.view.segRelatedCustomersContract.selectedRowIndex[1];
    var customerInfo;
    if(this.view.flxCustomerSearchPopUp.info.action!=="BREADCRUMBCLICK"){
      customerInfo=this.view.segRelatedCustomersContract.data[selectedCustIndex].customerInfo;
      var isAdded=false;
      for(var i=0;i<this.selectedCustomers.length;i++){
        if(this.selectedCustomers[i].coreCustomerId === customerInfo.coreCustomerId){
          isAdded=true;
          if(this.selectedCustomers[i].isSelected === false)
            this.selectedCustomers[i].isSelected=true;
        }
      }
      if(isAdded === false){
        customerInfo.isSelected=true;
        this.selectedCustomers.push(customerInfo);
      }
    }else{
      for(var i=0;i<this.selectedCustomers.length;i++){
        if(coreCustomerId === this.selectedCustomers[i].coreCustomerId){
          customerInfo=this.selectedCustomers[i];
        }
      }
    }
    var addressData="N/A";
    if(customerInfo.cityName||customerInfo.country)
      addressData=this.AdminConsoleCommonUtils.getAddressText(customerInfo.cityName,customerInfo.country);
    this.view.lblCheckbox.text=customerInfo.isSelected!==false? this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxnormallbl;
    this.view.lblCheckbox.skin=this.applyCheckboxSkin(this.view.lblCheckbox);
    this.view.lblContractName.text=customerInfo.coreCustomerName;
    this.view.lblContractId.text=customerInfo.coreCustomerId;
    this.view.lblDataInfo11.text=customerInfo.coreCustomerId;
    this.view.lblDataInfo12.text=addressData;
    this.view.lblDataInfo13.text=customerInfo.industry?customerInfo.industry:"N/A";
    this.view.lblDataInfo21.text=customerInfo.email;
    this.view.lblDataInfo22.text=customerInfo.phone;
    if(relatedCustomers.length>0){
      this.view.lblRelatedcustSubHeading.text=kony.i18n.getLocalizedString("i18n.contracts.relatedCustomers")+" ("+relatedCustomers.length+")";
      var self=this;
      var isAdded=false;
      var details={};
      var address="";
      var relatedCustData=relatedCustomers.map(function(customer){
        isAdded=false;
        for(var i=0;i<self.selectedCustomers.length;i++){
          if(self.selectedCustomers[i].coreCustomerId === customer.coreCustomerId&&self.selectedCustomers[i].isSelected)
            isAdded=true;
        }
        if(customer.cityName||customer.country)
          address=self.AdminConsoleCommonUtils.getAddressText(customer.cityName,customer.country);
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
          "flxCheckbox":{"isVisible":true,"onClick":(customer.isAssociated === "true")?function(){}:function(context){self.relatedCustomersCheckboxClick(context,customer)}},
          "lblCheckbox":{"text":isAdded?self.AdminConsoleCommonUtils.checkboxSelectedlbl:self.AdminConsoleCommonUtils.checkboxnormallbl},
          "flxRelatedCustomerRow":{"skin":customer.isAssociated === "true"?"sknFlxbgF3F3F3bdrd7d9e0":"sknFlxbgFFFFFFbdrD7D9E0rd4px",
                                   "onClick":(customer.isAssociated === "true")?function(){}:function(){
                                     var isBreadcrumb=false;
                                     for(let x=0;x<self.view.flxSearchBreadcrumb.info.added.length;x++){
                                       if(self.view.flxSearchBreadcrumb.info.added[x][0] === customer.coreCustomerId){
                                         isBreadcrumb=true;
                                       }
                                     }
                                     if(isBreadcrumb === true)
                                       self.onBreadcrumbClick(customer.coreCustomerId);           
                                     else
                                       self.addCustomer(customer);
                                   }
                                  },
          "lblContractName":{"onTouchStart":self.showCustomerDetailsPopup.bind(self,details,true),"text":customer.coreCustomerName},
          "lblContractId":customer.coreCustomerId,
          "lblHeading1":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID")},
          "lblData1":{"text":customer.coreCustomerId},
          "flxColumn2":{"left":"37%"},
          "lblHeading2":{"text":kony.i18n.getLocalizedString("i18n.View.ADDRESS")},
          "lblData2":{"text":address},
          "flxColumn3":{"isVisible":false},
          "flxContractRelation":{"isVisible":false},
          "flxRightDetailsCont":{"isVisible":true},
          "btnRelation":{"isVisible":true,"text":customer.relationshipName},
          "lblContractInfo":{"text":kony.i18n.getLocalizedString("i18n.contracts.partOfAnotherContract"),"isVisible":customer.isAssociated === "true"?true:false},
          "flxRightActionCont":{"isVisible":true},
          "customerInfo":customer
        }
      });
      this.view.segRelatedCustomersContract.setData(relatedCustData);
      this.view.flxNoCustomersSearched.setVisibility(false);
      this.view.lblRelatedcustSubHeading.setVisibility(true);
      this.view.flxRelatedCustomerSegContracts.setVisibility(true);
    }else{
      this.view.lblNoCustomersSearched.text=kony.i18n.getLocalizedString("i18n.contracts.noRelatedCustomers");
      this.view.lblRelatedcustSubHeading.setVisibility(true);
      this.view.lblRelatedcustSubHeading.text=kony.i18n.getLocalizedString("i18n.contracts.relatedCustomers")+" (0)";
      this.view.flxNoCustomersSearched.setVisibility(true);
      this.view.flxRelatedCustomerSegContracts.setVisibility(false);
    }
    this.view.flxSelectedCustomerInfo.setVisibility(true);
    this.view.flxLoading2.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * click of related customers checkbox
  */
  relatedCustomersCheckboxClick : function(context){
    var selIndex=context.rowContext.rowIndex;
    var segData=this.view.segRelatedCustomersContract.data;
    var customer=segData[selIndex].customerInfo;
    var tags=this.view.flxSearchFilter.widgets();
    var isAdded=false;
    for(var x=0;x<this.selectedCustomers.length;x++){
        if(this.selectedCustomers[x].coreCustomerId === customer.coreCustomerId){
          isAdded=true;
          if(this.selectedCustomers[x].isSelected === false)
            this.selectedCustomers[x].isSelected=true;
          break;
        }
      }
    if(segData[selIndex].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
      if(isAdded){
        this.selectedCustomers[x].isSelected=true;
      }else{
        customer.isSelected=true;
        this.selectedCustomers.push(customer);
      }
      this.addCustomerTag(this.view.flxSearchFilter,this.selectedCustomers[x].coreCustomerName,this.selectedCustomers[x].coreCustomerId);
      segData[selIndex].lblCheckbox.text= this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      segData[selIndex].lblCheckbox.skin= this.applyCheckboxSkin(segData[selIndex].lblCheckbox);
    }else{
      segData[selIndex].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[selIndex].lblCheckbox.skin=this.applyCheckboxSkin(segData[selIndex].lblCheckbox);
      this.selectedCustomers[x].isSelected=false;
      this.removeTagContracts(this.view.flxSearchFilter,this.selectedCustomers[x].coreCustomerId);
        if(tags.length === 1){
          this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractSearchCust.btnSave,true,false);
          this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsContractSearchCust.btnNext,false,false);
        }
    }
    this.view.segRelatedCustomersContract.setData(segData);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * set the data based on the selected customer in search
  */
  setSelectedCustomersData: function (toCheck) {
    var customersData=this.selectedCustomers;
    var dataMap=this.getCustomersDataMap();
    var self=this;
    var details={};
    var relatedCustData=[];
    var primaryIndex="";
    var address="";
    for(var x=0;x<customersData.length;x++){
      if(customersData[x].isSelected!==false){
        if(customersData[x].cityName||customersData[x].country)
          address=this.AdminConsoleCommonUtils.getAddressText(customersData[x].cityName,customersData[x].country);
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
        if(this.action === this.actionConfig.edit&&customersData[x].isPrimary === "true")
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
    if(relatedCustData.length === 1){
      relatedCustData[0].flxRemoveContract.isVisible=false;
      relatedCustData[0].lblLine.isVisible=false;
    }  
    this.view.segAddedCustomers.setData(relatedCustData);
    this.view.lblContractCustomersHeader.text=kony.i18n.getLocalizedString("i18n.contracts.summarySelectedCustomers") +" ("+relatedCustData.length+")";
    if(this.action === this.actionConfig.edit)
      relatedCustData[0].flxPrimaryBtn.onClick({rowContext:{rowIndex:primaryIndex}});
    else
      relatedCustData[0].flxPrimaryBtn.onClick({rowContext:{rowIndex:0}});
    /*if (toCheck == 1) {
      this.getAccountLvlFeaturesActions();
    } */
    this.view.forceLayout();
  },
  /*
  * enroll form
  * remove a coree customer added to contract
  */
  deleteCoreCustomer : function(context){
    var selIndex=context.rowContext.rowIndex;
    var segData=this.view.segAddedCustomers.data;
    var customer=segData[selIndex].customerInfo;
    var isDeleted=false;
    var self=this;
    for(let x=0;x<this.selectedCustomers.length;x++){
      if(this.selectedCustomers[x].coreCustomerId === customer.coreCustomerId){
          this.selectedCustomers.splice(x,1);
          this.view.segAddedCustomers.removeAt(selIndex,0);
          isDeleted=true;
          this.view.lblContractCustomersHeader.text=kony.i18n.getLocalizedString("i18n.contracts.summarySelectedCustomers") +" (" +this.view.segAddedCustomers.data.length+")";
          break;
      }
    }
    for(let y=0;y<this.createContractRequestParam.contractCustomers.length;y++){
      if(this.createContractRequestParam.contractCustomers[y].coreCustomerId === customer.coreCustomerId){
        this.createContractRequestParam.contractCustomers.splice(y,1);
        break;
      }
    }
    if(isDeleted){
      for(let x=0;x<this.view.segAddedCustomers.data.length;x++){
        if(this.view.segAddedCustomers.data[x].imgRadioButton.src === "radio_selected.png"){
          this.view.segAddedCustomers.data[x].flxPrimaryBtn.onClick({rowContext:{rowIndex:x}});
          break;
        }
      }
    }
    
    if(this.view.segAddedCustomers.data.length === 1){
      segData=this.view.segAddedCustomers.data[0];
      segData.flxRemoveContract.isVisible=false;
      segData.lblLine.isVisible=false;
      this.view.segAddedCustomers.setDataAt(segData,0);
    }
    this.view.forceLayout();
  },
  /*
  * enroll form
  * show delete icon
  */
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
  /*
  * enroll form
  * set added customers as primary
  */
  setCustomerAsPrimary : function(contextObj){
    var self=this;
    var segData=this.view.segAddedCustomers.data;
    for(var x=0;x<this.selectedCustomers.length;x++)
      this.selectedCustomers[x].isPrimary="false";
    this.selectedCustomers[contextObj.rowContext.rowIndex].isPrimary="true";
    for(let i=0;i<this.createContractRequestParam.contractCustomers.length;i++){
      if(this.createContractRequestParam.contractCustomers[i].coreCustomerId === this.selectedCustomers[contextObj.rowContext.rowIndex].coreCustomerId)
        this.createContractRequestParam.contractCustomers[i].isPrimary="true";
      else
        this.createContractRequestParam.contractCustomers[i].isPrimary="false";
    }
    for(let a=0;a<segData.length;a++){
      segData[a].imgRadioButton.src="radio_notselected.png";
      segData[a].flxRemoveContract.onClick=function(context){self.deleteCoreCustomer(context)};
      segData[a].flxRemoveContract.onHover=function(){};
      segData[a].lblIconRemove.skin="sknIcon00000015px";
    }
    segData[contextObj.rowContext.rowIndex].imgRadioButton.src="radio_selected.png";
    segData[contextObj.rowContext.rowIndex].flxRemoveContract.onClick=function(){};
    segData[contextObj.rowContext.rowIndex].lblIconRemove.skin="sknIconb2b2b215px";
    segData[contextObj.rowContext.rowIndex].flxRemoveContract.onHover=function(widget,context){
      context.rowIndex=contextObj.rowContext.rowIndex;
      self.showPrimaryDeleteHover(widget,context);
    };
    this.primaryContractCustomer=segData[contextObj.rowContext.rowIndex].customerInfo;
    this.view.segAddedCustomers.setData(segData);
    this.setCustomersDropDownList("customersDropdown");
    this.setCustomersDropDownList("customersDropdownFA");
    this.setCustomersDropDownList("customersDropdownContractLimits");
    this.view.imgContractAccounts.setVisibility(true);
    this.view.lblNoCustomersSelected.text= kony.i18n.getLocalizedString("i18n.contracts.selectCustomerAccount");
    this.view.flxNoCustomerSelected.setVisibility(true);
    this.view.flxContractAccountsList.setVisibility(false);
    if(this.action === this.actionConfig.create&&this.createContractRequestParam.contractCustomers.length === 0){
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
          });
        }
      }
      this.presenter.getCoreCustomerAccounts({"coreCustomerIdList":coreCustomerIdList,"legalEntityId": this.legalentityid1 || ""});
      var serviceDefId=this.view[this.selectedServiceCard].lblCategoryName.info.catId;
      this.presenter.getServiceDefinitionFeaturesAndLimits({"serviceDefinitionId":serviceDefId},true);
      
    } else if(this.action === this.actionConfig.edit){
      if(this.createContractRequestParam.contractCustomers.length === 0){
        var coreCustomerIdList=[];
        for(var x=0;x<this.selectedCustomers.length;x++){
          if(this.selectedCustomers[x].isSelected!==false){
            coreCustomerIdList.push(this.selectedCustomers[x].coreCustomerId);
            this.createContractRequestParam.contractCustomers.push({
              "isPrimary": this.selectedCustomers[x].isPrimary,
              "coreCustomerId": this.selectedCustomers[x].coreCustomerId,
              "coreCustomerName": this.selectedCustomers[x].coreCustomerName,
              "sectorId": this.selectedCustomers[x].sectorId,
              "isBusiness": this.selectedCustomers[x].isBusiness,
              "accounts":[],
              "features":[],
            });
          }
        }
        this.presenter.getCoreCustomerAccounts({"coreCustomerIdList":coreCustomerIdList,"legalEntityId": this.legalentityid1 || ""});
        this.setEditContractFeaturesLimits();
      }
     
    }
    this.setContractDetails();
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnSave,true,true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtonsCustomers.btnNext,false,true);
    this.enableAllTabs(true);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * create breaadcrumb based on selected customers while search
  */
  addBreadcrumb : function(customerInfo){
    var self=this;
    var i=this.view.flxSearchBreadcrumb.widgets();
    var tagsCount=i.length;    
    var id=customerInfo.coreCustomerId;
    var name=customerInfo.coreCustomerName.toUpperCase();
    if(this.view.flxSearchBreadcrumb.info.added.length === 0){
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
      if(this.view.segBreadcrumbs.data.length === 0){
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
  /*
  * enroll form
  * set data to breadcrumb segment on truncated
  */
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
  /*
  * enroll form
  * add the selected customer from customer search in contracts flow
  */
  setAddedCustDataInRequest : function(){
    var customersData=this.selectedCustomers;
    var newlyAddedIds=[];
    var isNewlyAdded=true;
    for(var a=0;a<customersData.length;a++){
      isNewlyAdded=true;
      for(var b=0;b<this.createContractRequestParam.contractCustomers.length;b++){
        if(customersData[a].coreCustomerId === this.createContractRequestParam.contractCustomers[b].coreCustomerId){
          isNewlyAdded=false;
          break;
        }
      }
      if(isNewlyAdded){
        newlyAddedIds.push(customersData[a].coreCustomerId);
        this.createContractRequestParam.contractCustomers.push({
          "isPrimary": customersData[a].isPrimary? customersData[a].isPrimary : false,
          "coreCustomerId": customersData[a].coreCustomerId,
          "coreCustomerName": customersData[a].coreCustomerName,
          "sectorId":customersData[a].sectorId,
          "isBusiness": customersData[a].isBusiness,
          "accounts":[],
          "features":[],
        });
        this.createContractRequestParam.contractCustomers[this.createContractRequestParam.contractCustomers.length - 1].features = this.setAllFeatures(JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[0].features)));
      }
    }
    if (newlyAddedIds.length > 0) {
      this.presenter.getCoreCustomerAccounts({ "coreCustomerIdList": newlyAddedIds,"legalEntityId": this.legalentityid1 || "" });
    }
  },
  /*
  * enroll form
  * rever added customers in contracts
  */
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
  /*
  * enroll form
  * set accounts of customer in create contract
  */
  setContractAccountsData : function(customerAccounts){
    if(this.action === this.actionConfig.create){
      for(var i=0;i<customerAccounts.length;i++){
        for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
          if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === customerAccounts[i].coreCustomerId)
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
          if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === customerAccounts[i].coreCustomerId&&customerAccounts[i].accounts){
            for(var k=0;k<customerAccounts[i].accounts.length;k++){
              if(selectedAccIds[customerAccounts[i].coreCustomerId]){
                var accId = customerAccounts[i].accounts[k].accountNumber || customerAccounts[i].accounts[k].accountId;
              if(selectedAccIds[customerAccounts[i].coreCustomerId].includes(accId)||customerAccounts[i].accounts[k].isNew==="true")
                customerAccounts[i].accounts[k].isEnabled="true";
              else
                customerAccounts[i].accounts[k].isEnabled="false";
            }
            }
            this.createContractRequestParam.contractCustomers[j].accounts = customerAccounts[i].accounts;

        }
      }
    }
  }
    this.getAccountLvlFeaturesActions(); // to make sure all the accounts features and actions fetched all at once instead of every check/uncheck of accounts
  },
  setContractAccountLvlFeaturesData: function (accountLvlFeatures) {
    //var accJSON=this.view.toggleContractButtonsFeatures.btnToggleRight.info;
    var featuresJSON = {};
    var accountsJSON = {};
    var self = this;
    var accActionsList = {},accLvlFeatures = [];
    var customers = typeof (this.createContractRequestParam.contractCustomers) == 'string' ? JSON.parse(this.createContractRequestParam.contractCustomers) : this.createContractRequestParam.contractCustomers;
    //when the customer is not added any contract before
    if (this.action === this.actionConfig.create) {
      for (let x = 0; x < customers.length; x++) {
        featuresJSON = {
          "coreCustomerName": customers[x].coreCustomerName,
          "coreCustomerId": customers[x].coreCustomerId,
          "accounts": []
        }
        accActionsList[customers[x].coreCustomerId] = {};
        for (let y = 0; y < customers[x].accounts.length; y++) {
          accountsJSON = {
            "accountId": customers[x].accounts[y].accountId || customers[x].accounts[y].accountNumber,
            "features": [],
            "productId": customers[x].accounts[y].productId,
            "accountName": customers[x].accounts[y].accountName,
            "accountType": customers[x].accounts[y].accountType,
            "ownerType": customers[x].accounts[y].ownerType,
            "isEnabled": "true"
          }
          accountsJSON.features = this.getFeaturesBasedOnId(accountLvlFeatures, customers[x].accounts[y].productId);
          featuresJSON.accounts.push(accountsJSON);
          accActionsList[customers[x].coreCustomerId] = this.setAccountActionsForBulkUpdate(accActionsList[customers[x].coreCustomerId], accountsJSON.features);
        }
        accLvlFeatures.push(featuresJSON);
        this.createContractRequestParam.accountLevelPermissions = accLvlFeatures;
      }
    }
    else {
      var selectedAccIds = {};
      var accIds = [];
      var contractDetails = JSON.parse(JSON.stringify(this.createContractRequestParam));
      var contractAccFeaturesAndLimits = JSON.parse(this.createContractRequestParam.accountLevelPermissions);
      for (let a = 0; a < contractAccFeaturesAndLimits.length; a++) {
        for (let x = 0; x < contractDetails.contractCustomers.length; x++) {
          if (contractAccFeaturesAndLimits[a].coreCustomerId === contractDetails.contractCustomers[x].coreCustomerId) {
            accActionsList[contractAccFeaturesAndLimits[a].coreCustomerId] = {};
            featuresJSON = {
              "coreCustomerName": contractAccFeaturesAndLimits[a].coreCustomerName,
              "coreCustomerId": contractAccFeaturesAndLimits[a].coreCustomerId,
              "accounts": []
            }
            for (let y = 0; y < contractDetails.contractCustomers[x].accounts.length; y++) {
              accountsJSON = {
                "accountId": contractDetails.contractCustomers[x].accounts[y].accountId || contractDetails.contractCustomers[x].accounts[y].accountNumber,
                "features": [],
                "productId": contractDetails.contractCustomers[x].accounts[y].productId,
                "accountName": contractDetails.contractCustomers[x].accounts[y].accountName,
                "accountType": customers[x].accounts[y].accountType,
                "ownerType": customers[x].accounts[y].ownerType,
                "isEnabled": "true"
              }
              for (let b = 0; b < contractAccFeaturesAndLimits[a].accounts.length; b++) {
                if (contractAccFeaturesAndLimits[a].accounts[b].accountId === (contractDetails.contractCustomers[x].accounts[y].accountId || contractDetails.contractCustomers[x].accounts[y].accountNumber)) {
                  accountsJSON.features = contractAccFeaturesAndLimits[a].accounts[b].featurePermissions;
                  break;
                }
              }
              if (accountsJSON.features.length === 0) {
                if(contractDetails.contractCustomers[x].accounts[y].isNew === "false")
                  accountsJSON.isEnabled = "false";
                accountsJSON.features = this.getFeaturesBasedOnId(accountLvlFeatures, customers[x].accounts[y].productId);
              }
              featuresJSON.accounts.push(accountsJSON);
              accActionsList[contractAccFeaturesAndLimits[a].coreCustomerId] = this.setAccountActionsForBulkUpdate(accActionsList[contractAccFeaturesAndLimits[a].coreCustomerId], accountsJSON.features);
            }
            accLvlFeatures.push(featuresJSON);
            this.createContractRequestParam.accountLevelPermissions = accLvlFeatures;
            break;
          }
        }
      }
    }
    this.bulkUpdateAccLevelActions = accActionsList;
    this.createContractRequestParam.contractCustomers = typeof (this.createContractRequestParam.contractCustomers) == 'string' ? JSON.stringify(customers) : customers;
    this.presenter.setCreateContractPayload(this.createContractRequestParam);
  },
  initializeContractGlobalLevelFeatures : function(contractCust){
    var limitJSON ={},contractDetails = {"transactionLimits":[],"globalLevelPermissions":[]};
    this.createContractRequestParam = this.presenter.getCreateContractPayload();
    for (var a = 0; a < contractCust.length; a++) {
      //contractCust[a].features=[];
      limitJSON = {
        "coreCustomerName": contractCust[a].coreCustomerName,
        "coreCustomerId": contractCust[a].coreCustomerId,
        "featurePermissions": []
      };

      var limitFeatureJSON = {};
      for (var b = 0; b < contractCust[a].features.length; b++) {
        featureActions = [];
        var actionsArr = contractCust[a].features[b].permissions || contractCust[a].features[b].actions;
        for (var c = 0; c < actionsArr.length; c++) {
          if (actionsArr[c].isEnabled === undefined || actionsArr[c].isEnabled === null) {
            //if the user has neither selected nor unselected this actions
            actionsArr[c].isEnabled = "true";
          }
          featureActions[c] = {
            "actionId": actionsArr[c].id || actionsArr[c].actionId,
            "actionName": actionsArr[c].name || actionsArr[c].actionName,
            "actionDescription": actionsArr[c].description || actionsArr[c].actionDescription,
            "isEnabled": actionsArr[c].isEnabled,
          };
          if (actionsArr[c].limits) {
            limitFeatureJSON = {
              "featureId": contractCust[a].features[b].id || contractCust[a].features[b].featureId,
              "actionId": actionsArr[c].id || actionsArr[c].actionId,
              "actionName": actionsArr[c].name || actionsArr[c].actionName,
              "actionDescription": actionsArr[c].description || actionsArr[c].actionDescription,
              "limits": actionsArr[c].limits
            }
            limitJSON.featurePermissions.push(limitFeatureJSON);
          }
        }
        featureJSON = {
          "featureName": contractCust[a].features[b].name || contractCust[a].features[b].featureName,
          "featureId": contractCust[a].features[b].id || contractCust[a].features[b].featureId,
          "featureDescription": contractCust[a].features[b].description || contractCust[a].features[b].featureDescription,
          "permissions": featureActions
        };
        contractCust[a].features[b] = featureJSON;
      }

      contractDetails.transactionLimits.push(limitJSON);
      contractDetails.globalLevelPermissions.push({
        "coreCustomerName": contractCust[a].coreCustomerName,
        "coreCustomerId": contractCust[a].coreCustomerId,
        "features": contractCust[a].features
      });
      this.createContractRequestParam.transactionLimits = contractDetails.transactionLimits;
      this.createContractRequestParam.globalLevelPermissions = contractDetails.globalLevelPermissions;
      this.presenter.setCreateContractPayload(this.createContractRequestParam);
    }
  },
  /*
  * enroll form
  * set customers list to the dropdown in required tabs
  */
  setCustomersDropDownList : function(componentName){
    this.view[componentName].btnPrimary.setVisibility(true);//to get its width while calculating its parent flex width
    var selectedCustomers= this.selectedCustomers;
    var maxLengthText="";
    var data=[];
    var widgetMap={
      "flxCustomerName":"flxCustomerName",
      "flxCustomerNameCont":"flxCustomerNameCont",
      "lblCustomerName":"lblCustomerName",
      "btnPrimaryCustomers":"btnPrimaryCustomers"
    }
    var self = this;
    for (var x = 0; x < selectedCustomers.length; x++) {
      if (selectedCustomers[x].isSelected !== false) {
        if ((selectedCustomers[x].coreCustomerName + "(" + selectedCustomers[x].coreCustomerId + ")").length > maxLengthText.length)
          maxLengthText = selectedCustomers[x].coreCustomerName + "(" + selectedCustomers[x].coreCustomerId + ")";
        data.push({
          "flxCustomerName": {
            "onClick": function () {
              if (componentName === "customersDropdownContractLimits" && self.view.flxContractLimitsList.isVisible) {
                self.updateLimitValues();
              } else if (componentName === "customersDropdownFA" && self.view.toggleContractButtonsFeatures.info.selectedTab == 2) {
                self.setSelectedText(componentName);
                self.toggleContractFeaturesAccountLevel(true);

              }
              else {
                self.setSelectedText(componentName);
                self.setCustSelectedData(componentName, false);
              }
            }
          },
          "id": selectedCustomers[x].coreCustomerId,
          "lblCustomerName": { "text": selectedCustomers[x].coreCustomerName + "(" + selectedCustomers[x].coreCustomerId + ")" },
          "btnPrimaryCustomers": { "isVisible": selectedCustomers[x].isPrimary === "true" ? true : false }
        });
      }
    }
    this.view[componentName].segList.widgetDataMap=widgetMap;
    this.view[componentName].segList.setData(data);
    this.view.forceLayout();//to get the primary button width, calling forceLayout
    this.view[componentName].segList.info = { "records": data };
    if(this.view.btnUpdateInBulkFA.info==="ACCLVL"){
      this.view[componentName].lblSelectedValue.text= "Select a Account";
    }else{
    this.view[componentName].lblSelectedValue.text=kony.i18n.getLocalizedString("i18n.contracts.selectACustomer");}
    this.view[componentName].tbxSearchBox.text = "";
    this.view[componentName].flxClearSearchImage.setVisibility(false);
    var maxTextWidth = this.AdminConsoleCommonUtils.getLabelWidth(maxLengthText, "13px Lato-Regular");
    var dropdownWidth = maxTextWidth + 15 + 15 + this.view[componentName].btnPrimary.frame.width + 15;
    if (componentName === "customersDropdownContractLimits")
      this.view.flxCustomerDropdownLimits.width = dropdownWidth > 270 ? dropdownWidth + "px" : "270px";
    else if (componentName === "customersDropdown")
      this.view.flxCustomerDropdown.width = dropdownWidth > 270 ? dropdownWidth + "px" : "270px";
    else if (componentName === "customersDropdownFA")
      this.view.flxCustomerDropdownFA.width = dropdownWidth > 270 ? dropdownWidth + "px" : "270px";
    else if(componentName==="customerDropdownBulk")
      this.view.flxCustomerDropdownBulk.width=dropdownWidth>270?dropdownWidth+"px":"270px";    
    this.view[componentName].flxSegmentList.setVisibility(false);
    this.view[componentName].btnPrimary.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * search for customers in dropdown list
  */
  searchCustomersDropDownList : function(componentName){
    var segData=this.view[componentName].segList.info.records;
    var searchText=this.view[componentName].tbxSearchBox.text;
    var custName="";
    var searchResults=segData.filter(function(rec){
      custName=rec.lblCustomerName.text.toLowerCase();
      if(custName.indexOf(searchText)>=0)
        return rec;
    });
    this.view[componentName].segList.setData(searchResults);
    this.view[componentName].lblSelectedValue.text=kony.i18n.getLocalizedString("i18n.contracts.selectACustomer");
    this.view[componentName].btnPrimary.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * set selected customer from the list to label
  */
  setSelectedText : function(componentName,selectedId){
    var selIndex="";
    var segData=this.view[componentName].segList.data;
    if(selectedId){
      for(let x=0;x<segData.length;x++){
        if(segData[x].id === selectedId){
          selIndex=x;
          break;
        }
      }
    }else{
      selIndex=this.view[componentName].segList.selectedRowIndex[1];
    }
    var isPrimary=segData[selIndex].btnPrimaryCustomers.isVisible?true:false;
    this.view[componentName].lblSelectedValue.text=this.AdminConsoleCommonUtils.getTruncatedString(segData[selIndex].lblCustomerName.text,isPrimary?25:30,isPrimary?22:27);
    this.view[componentName].lblSelectedValue.toolTip=segData[selIndex].lblCustomerName.text;
    this.view[componentName].lblSelectedValue.info={"id":segData[selIndex].id};
    this.view[componentName].btnPrimary.setVisibility(isPrimary);
    this.toggleAccountSelectedId= this.view[componentName].lblSelectedValue.info.id ;
    this.view[componentName].flxSegmentList.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * set selected customer realted features actions
  */
  setCustSelectedData: function (component, isSearch) {
    this.view.toggleContractButtonsFeatures.btnToggleLeft.skin = "sknBtnBgE5F0F9Br006CCAFn0069cdSemiBold12pxLeftRnd";
    this.view.toggleContractButtonsFeatures.btnToggleRight.skin = "sknBtnBgFFFFFFBrD7D9E0Fn485C75Reg12pxRightRnd";
    var selectedCustId = this.view[component].lblSelectedValue.info ? this.view[component].lblSelectedValue.info.id : this.view[component].segList.data[0].id;
    var dataToSet = [];
    var customerDetails = {};
    for (var i = 0; i < this.selectedCustomers.length; i++) {
      if (this.selectedCustomers[i].coreCustomerId === selectedCustId) {
        customerDetails = this.selectedCustomers[i];
        break;
      }
    }
    var address="";
    if(customerDetails.cityName||customerDetails.country)
      address=this.AdminConsoleCommonUtils.getAddressText(customerDetails.cityName,customerDetails.country);
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
    if(component === "customersDropdown"){
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
          dataToSet=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].accounts));
          break;
        }
      }
      if(isSearch === false){
        this.view.tbxAccountsSearch.text="";
        this.view.flxClearAccountsSearch.setVisibility(false);
        this.view.ContractAccountsList.lblName.text=customerDetails.coreCustomerName;
        this.view.ContractAccountsList.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
        this.view.ContractAccountsList.lblData1.text=selectedCustId;
        this.view.ContractAccountsList.lblData2.text=customerDetails.taxId?customerDetails.taxId:"N/A";
        this.view.ContractAccountsList.lblData3.text=address;
        this.view.ContractAccountsList.flxPrimary.setVisibility(customerDetails.isPrimary === "true"?true:false);
        this.view.lblSeperatorAccounts.setVisibility(false);
        this.view.flxNoCustomerSelected.setVisibility(false);
        this.view.flxContractAccountsList.setVisibility(true);
        this.view.flxContractAccountsSearch.setVisibility(true);      
        this.setAccountsDataCustomers(dataToSet.concat([]));
        this.view.flxContractAccountsList.info={"totalRecords":dataToSet};
        this.setContractAccountsData(dataToSet)
        this.setContractsAccTypeFilterData(dataToSet);
        this.setContractOwnerShipFilterData(dataToSet);
      }else{
        this.searchAccountsContracts(dataToSet.concat([]));
      }
    }else if(component === "customersDropdownContractLimits"){
      var features=[];
      var limitFeatures=[];
      var limitActions=[]
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
          features=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].features));
          break;
        }
      }
      var isSelected=true;
      for(var a=0;a<features.length;a++){
        if(features[a].type === "MONETARY"&&features[a].actions.length>0){
          limitFeatures=JSON.parse(JSON.stringify(features[a]));
          limitActions = features[a].actions.filter(function(item) {
            isSelected=true;
            //to check whether this action is checked in features and actions tab or not
            if(item.isEnabled)
              isSelected=item.isEnabled === "true"?true:false;
            return item.type=="MONETARY"&&isSelected;
          });
          if(limitActions.length>0){
            limitFeatures.actions=limitActions;
            dataToSet.push(limitFeatures);
          }
        }
      }
      if(isSearch === false){
        this.view.lblSeperatorLimits.setVisibility(false);
        this.view.flxContractLimitsList.setVisibility(true);
        this.view.flxContractLimits.setVisibility(true);
        this.view.ContractLimitsList.lblName.text=customerDetails.coreCustomerName;
        this.view.ContractLimitsList.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
        this.view.ContractLimitsList.flxPrimary.setVisibility(customerDetails.isPrimary === "true"?true:false);
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
          this.view.ContractLimitsList.lblNoFilterResults.text= kony.i18n.getLocalizedString("i18n.frmCompanies.NoLimits");
          this.view.ContractLimitsList.flxNoFilterResults.setVisibility(true);
          this.view.ContractLimitsList.segAccountFeatures.setVisibility(false);
          this.view.flxContractLimitsSearch.setVisibility(false);
          this.view.ContractLimitsList.btnReset.setVisibility(false);
          this.view.btnUpdateInBulkLimits.setVisibility(false);
        }
      }else{
        this.searchLimitsContract(JSON.parse(JSON.stringify(dataToSet)));
      }
    }else if(component === "customersDropdownFA"){
      for(let j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
        if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
          dataToSet=JSON.parse(JSON.stringify(this.createContractRequestParam.contractCustomers[j].features));
          break;
        }
      }
      if(isSearch === false){
        this.view.tbxContractFASearch.text="";
        this.view.flxContractFeaturesToggleButtons.setVisibility(true);
        this.view.tbxContractFASearch.placeholder = "Search By Feature Name, Action Name";
        this.view.flxContractAccountFAList.setVisibility(false);
        this.view.flxClearContractFASearch.setVisibility(false);
        this.view.lblSeperatorFA.setVisibility(false);
        this.view.flxNoCustomerSelectedFA.setVisibility(false);
        this.view.flxContractFAList.setVisibility(true);
        this.view.flxContractFASearch.setVisibility(true);
        this.view.ContractFAList.lblName.text=customerDetails.coreCustomerName;
        this.view.ContractFAList.lblName.onTouchStart = this.showCustomerDetailsPopup.bind(this,details,false);
        this.view.ContractFAList.flxPrimary.setVisibility(customerDetails.isPrimary === "true"?true:false);
        this.view.ContractFAList.lblData1.text=selectedCustId;
        this.view.ContractFAList.lblData2.text=customerDetails.taxId?customerDetails.taxId:"N/A";
        this.view.ContractFAList.lblData3.text=address; 
        this.setFeaturesDataCustomersContracts(JSON.parse(JSON.stringify(dataToSet)));
      }else{
        this.searchFAContracts(JSON.parse(JSON.stringify(dataToSet)));
      }
    }
  },
   /*
  * enroll form
  * set features action limits data for create payload
  */
  setServiceDefinitionFAData : function(featuresLimits){
    var limits=featuresLimits.limits;
    var features=featuresLimits.features;

    for(let p=0;p<limits.length;p++){
      for(let q=0;q<features.length;q++){
        if(features[q].featureId === limits[p].featureId){
          features[q]=this.getCombinedFeature(features[q],limits[p]);
        }
      }
    }
    for (let j = 0; j < this.createContractRequestParam.contractCustomers.length; j++)
      this.createContractRequestParam.contractCustomers[j].features = JSON.parse(JSON.stringify(features));
    this.bulkUpdateAllFeaturesListContract = JSON.parse(JSON.stringify(features));//used for bulk update popup data
    this.presenter.setCreateContractPayload(this.createContractRequestParam);
    this.setGlobalMonetaryActions(limits);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * combine features limits from service
  */
  getCombinedFeature: function (feature, limits) {
    //two flows has different executions because the payloads are different
    if (this.action === this.actionConfig.edit) {
      for (let b = 0; b < feature.actions.length; b++) {
        if (limits.actionId === feature.actions[b].actionId) {
          feature.actions[b].limits = limits.limits;
          feature.actions[b].type = "MONETARY";
          feature.type = "MONETARY";
        }
      }
    } else {
      for (let a = 0; a < limits.actions.length; a++) {
        for (let b = 0; b < feature.actions.length; b++) {
          if (limits.actions[a].actionId === feature.actions[b].actionId) {
            feature.actions[b].limits = limits.actions[a].limits;
            feature.actions[b].type = "MONETARY";
            feature.type = "MONETARY";
          }
        }
      }
    }
    return feature;
  },
  /*
  * enroll form
  * set accounts of selected customer to the component
  */
  setAccountsDataCustomers : function(customerAccounts){
    var self=this;
    var secData = {
      "flxCheckbox":{"onClick": this.onCheckAccountsCheckboxContract.bind(this,true,customerAccounts)},
      "flxAccountNumCont":{"onClick":this.sortAndSetData.bind(this,"lblAccountNumber",this.view.ContractAccountsList.segAccountFeatures, 4)},
      "lblIconSortAccName":"\ue92a",
      "lblAccountNumber": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNUMBER"),
      "lblSectionCheckbox":{"isVisible":true,"text": this.AdminConsoleCommonUtils.checkboxSelected},
      "flxAccountType":{"onClick": this.showFilterForAccountsContract.bind(this,1)},
      "lblAccountType":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE"),
      "lblIconFilterAccType":"\ue916",
      "lblAccountName":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME"),
      "lblIconAccNameSort":"\ue92b",
      "flxAccountName":{"onClick": this.sortAndSetData.bind(this,"lblAccountName", this.view.ContractAccountsList.segAccountFeatures, 4)},
      "flxAccountHolder":{"onClick": this.showFilterForAccountsContract.bind(this,2)},
      "lblAccountHolder":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE"),
      "lblIconSortAccHolder":"\ue916",
      "lblSeperator":"-",
      "template":"flxContractEnrollAccountsEditSection",
    };
    var selectedAccountsCount=0;
    var lblCheckbox={"text":self.AdminConsoleCommonUtils.checkboxnormallbl};
    var rowData = customerAccounts.map(function(account){
        // in edit/create , to check whether has made any selection changes or not
        if(account.isEnabled){
          if(account.isEnabled === "true"||account.isNew==="true"){
            selectedAccountsCount++;
            lblCheckbox.text=  self.AdminConsoleCommonUtils.checkboxSelectedlbl;
          }else
            lblCheckbox.text=self.AdminConsoleCommonUtils.checkboxnormallbl;
        }
        else{
          lblCheckbox.text = self.AdminConsoleCommonUtils.checkboxSelectedlbl;
          selectedAccountsCount++;
        }
      return{
        "flxCheckbox":{"onClick":self.onCheckAccountsCheckboxContract.bind(self,false,customerAccounts)},
        "lblCheckbox":{"isVisible":true,"text":lblCheckbox.text,"skin":self.applyCheckboxSkin(lblCheckbox)},
        "lblAccountNumber":account.accountNumber || account.accountId,
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
    secData.lblSectionCheckbox.text=this.getHeaderCheckboxImage(rowData,true,true);
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
  * check/uncheck checkbox in accounts tab header of contract create
  */
  onCheckAccountsCheckboxContract : function(isHeader,customerAccounts) {
    var selectedCustId=this.view.customersDropdown.lblSelectedValue.info.id
    var segData = this.view.ContractAccountsList.segAccountFeatures.data;
    var segSecData = segData[0][0];
    var rowsData = segData[0][1];
    var updatedAccIds=[];
    var isEnableDisable="true";
    //on section checkbox click
    if(isHeader){
      var img = (segSecData.lblSectionCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?  this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segSecData.lblSectionCheckbox.text = img;
      segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      isEnableDisable=(img === this.AdminConsoleCommonUtils.checkboxnormallbl)?"false":"true";
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].lblCheckbox.text =img;
        rowsData[i].lblCheckbox.skin =this.applyCheckboxSkin(rowsData[i].lblCheckbox);
        updatedAccIds.push(rowsData[i].lblAccountNumber);       
      }
      if(img === this.AdminConsoleCommonUtils.checkboxnormallbl)
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=0;
      else
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=rowsData.length;
    } 
    //on row checkbox click
    else{
      var selInd = this.view.ContractAccountsList.segAccountFeatures.selectedRowIndex[1];
      rowsData[selInd].lblCheckbox.text = (rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?  this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      rowsData[selInd].lblCheckbox.skin = this.applyCheckboxSkin( rowsData[selInd].lblCheckbox);
      updatedAccIds.push(rowsData[selInd].lblAccountNumber);
      if(rowsData[selInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount-1;
        isEnableDisable="false";
      }else{
        this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount=this.view.ContractAccountsList.segAccountFeatures.info.selectedAccountsCount+1;
        isEnableDisable="true";
      }
      segSecData.lblSectionCheckbox.text = this.getHeaderCheckboxImage(rowsData,true,true);
       segSecData.lblSectionCheckbox.skin = this.applyCheckboxSkin( segSecData.lblSectionCheckbox);
    }

    for(var j=0;j<this.createContractRequestParam.contractCustomers.length;j++){
      if(this.createContractRequestParam.contractCustomers[j].coreCustomerId === selectedCustId){
        for(let k=0;k<this.createContractRequestParam.contractCustomers[j].accounts.length;k++){
          var accId = this.createContractRequestParam.contractCustomers[j].accounts[k].accountNumber || this.createContractRequestParam.contractCustomers[j].accounts[k].accountId;
          if(updatedAccIds.includes(accId))
            this.createContractRequestParam.contractCustomers[j].accounts[k].isEnabled=isEnableDisable;
        }
        break;
      }
    }
    this.updateAccountSelectionAccLvl(selectedCustId, updatedAccIds, isEnableDisable);
    this.view.ContractAccountsList.segAccountFeatures.setData([[segSecData, rowsData]]);
    this.view.ContractAccountsList.lblCount.text = this.getSelectedItemsCount(rowsData, true);
    var isValid = this.validateCheckboxSelections(this.view.ContractAccountsList.segAccountFeatures, true);
    if (isValid) {
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
  * show filter for account types in account tab contracts
  *@param: option-(account type:1, ownership:2), event object, context object
  */
  showFilterForAccountsContract : function(option,event,context){
    if(option === 1)
      this.view.flxOwnershipFilterContracts.setVisibility(false);
    else if(option === 2)
      this.view.flxAccountsFilterContracts.setVisibility(false);
    var filterWidget = (option === 1) ? this.view.flxAccountsFilterContracts :this.view.flxOwnershipFilterContracts;
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
  * search in accounts tab contracts
  */
  searchAccountsContracts : function(accounts){
    var searchText=this.view.tbxAccountsSearch.text.toLowerCase();
    var accountName="";
    var searchResults=accounts.filter(function(account){
      var accNum = account.accountNumber || account.accountId;
      accountName=account.accountName.toLowerCase();
      if(accountName.indexOf(searchText)>=0 || accNum.indexOf(searchText)>=0)
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
  /*
  * enroll form
  * filter for monetart limits from all features list
  */
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
  /*
  * enroll form
  * check for checkbox selection for all the cards of container
  * @param: cards container path, segment name, is section level
  */
  validateSelForMultipleCardsContracts : function(flexPath,segmentName,isSection){
    var isValid = true;
    isValid = this.validateCheckboxSelections(flexPath[segmentName],isSection);
    return isValid;
  },
   /*
  * set accounts types filter data contracts
  * @param: data
  */
  setContractsAccTypeFilterData : function(data){
    var self = this;
    var accTypes = [], maxLenText = "";
    for (var i = 0; i < data.length; i++) {
      if (!accTypes.contains(data[i].accountType) && data[i].accountType !== undefined)
        accTypes.push(data[i].accountType);
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
    self.view.accountTypesFilterContracts.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.accountTypesFilterContracts.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<accTypes.length;j++){
      selStatusInd.push(j);
    }
    self.view.accountTypesFilterContracts.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    //set filter width
    self.view.flxAccountsFilterContracts.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  /*
  * set ownership types filter data contracts
  * @param: data
  */
  setContractOwnerShipFilterData: function(data){
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
    self.view.ownershipFilterContracts.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.ownershipFilterContracts.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<accTypes.length;j++){
      selStatusInd.push(j);
    }
    self.view.ownershipFilterContracts.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    //set filter width
    self.view.flxOwnershipFilterContracts.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  /*
  * filter accounts in contracts
  * @param: data
  */
  performAccountOwnerContractFilters : function(){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var accountsList = self.view.flxContractAccountsList.info.totalRecords;
    var ownershipIndices = self.view.ownershipFilterContracts.segStatusFilterDropdown.selectedIndices;
    var typeIndices = self.view.accountTypesFilterContracts.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selOwnershipInd = null;
    var selTypeInd = null;
    //get selected account types
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {
      selFilter[0][0].push(self.view.accountTypesFilterContracts.segStatusFilterDropdown.data[selTypeInd[i]].accountType);
    }
    //get selected ownerships
    selOwnershipInd = ownershipIndices ? ownershipIndices[0][1] : [];
    for (var j = 0; j < selOwnershipInd.length; j++) {
      selFilter[0][1].push(self.view.ownershipFilterContracts.segStatusFilterDropdown.data[selOwnershipInd[j]].ownerType);
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
  * enroll form
  * assign features to variable and filter
  */
  getAllFeatures : function(res){
      this.allFeatures = res;
      //this.featureFilter();
  },
  /*
  * enroll form
  * filter all the features
  */
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
  },
  /*
  * show bulk update features/limits popup in contracts
  * @param: option for feature/limits - 1/2
  */
  showBulkUpdatePopupContracts: function(option){
    if(option === 1){
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdatePermissionsInBulk");
      this.view.bulkUpdateFeaturesLimitsPopup.lblTitle.text=kony.i18n.getLocalizedString("i18n.contract.addPermission");
      this.view.bulkUpdateFeaturesLimitsPopup.bulkUpdateAddNewFeatureRow.lblFieldName13.text="Permission Type";
      this.view.bulkUpdateFeaturesLimitsPopup.bulkUpdateAddNewFeatureRow.flxRow2.isVisible=false;
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewPermissions");
      this.view.bulkUpdateFeaturesLimitsPopup.lblRadioGroupTitle.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.PermissionType")
      this.setRadioGroupData(1);
    }else{
      this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.UpdateLimitsInBulk");
      this.view.bulkUpdateFeaturesLimitsPopup.lblTitle.text=kony.i18n.getLocalizedString("i18n.contracts.addLimits");
      this.view.bulkUpdateFeaturesLimitsPopup.bulkUpdateAddNewFeatureRow.lblFieldName13.text=kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType");
      this.view.bulkUpdateFeaturesLimitsPopup.bulkUpdateAddNewFeatureRow.flxRow2.isVisible=true;
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.plusAddNewLimits");
      this.view.bulkUpdateFeaturesLimitsPopup.lblRadioGroupTitle.text=kony.i18n.getLocalizedString("i18n.konybb.Common.TransactionType");
      this.setRadioGroupData(2);
    }
    this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top = "50dp";
    this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(false);
    this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.info ={"option" : option};
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info={"added":[]};
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(true);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave,true,false);
    this.showContractBulkUpdatePopupScreen1(false);
  },
  /*
  * show bulk update features/limits accounts selection screen for contracts
  */
  showContractBulkUpdatePopupScreen1: function (isModify) {
    var toCheck = this.view.btnUpdateInBulkFA.info;
    if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      this.setBulkUpdateAccountsList();
      this.showBulkUpdatePopupAccountLvl();
    }
    else if (this.view.flxContractFA.isVisible && toCheck == "CUSTLVL") {
      this.showBulkUpdatePopupCustLvl();
      this.setBulkUpdateCustomersList();
    }
    else if (!isModify) {
      this.setBulkUpdateCustomersList();
    }
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * show bulk update features/limits screen in popup for contracts
  */
  showContractBulkUpdatePopupScreen2: function () {
    if (this.view.flxContractFA.isVisible) {
      this.showBulkPermissionPopupAccountsCust();
    }
    else {
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.lblIconArrow.text = "";
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
      var flxChildren = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.removeAll();
      for (var i = 0; i < flxChildren.length; i++) {
        this.view.bulkUpdateFeaturesLimitsPopup.remove(this.view.bulkUpdateFeaturesLimitsPopup[flxChildren[i].id]);
      }
      this.addBulkUpdateTags();
      this.view.forceLayout();
      var height = this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer.frame.height - (70 + this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer.frame.y + 80);
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer.height = height + "dp";
      this.bulkUpdateListboxData = this.getListForListBoxContracts(this.bulkUpdateAllFeaturesListContract);
      if (this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.info === "Limits") {
        this.addNewLimitRowBulkUpdate("contract");
      } else {
        this.addNewFeatureRowBulkUpdate("contract");
      }
      this.getFeaturesForBulkUpdate(null, "contract");
    }
  },
  showBulkUpdatePopupCustLvl: function () {
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = {
      "added": []
    };
    this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text = "Update Permissions in Bulk";
    this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top = "60px";
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.lblHeadingScreen1.text = kony.i18n.getLocalizedString("i18n.contracts.selectCustomers_LC");
    this.showBulkUpdatePopupScreen1(false);
    this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxHeaderScreen1.height = "60px";
    this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.top = "-30px";
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setVisibility(false);
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.placeholder = "Search by Customer Name";
  },
  showBulkUpdatePopupAccountLvl: function () {
    this.view.bulkUpdateFeaturesLimitsPopup.lblHeadingScreen1.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAccounts");
    this.view.bulkUpdateFeaturesLimitsPopup.flxSegmentContainer.top = "110px";
    this.view.bulkUpdateFeaturesLimitsPopup.flxHeaderScreen1.height = "106px";
    this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.top = "0px";
    this.view.bulkUpdateFeaturesLimitsPopup.lblDetailsHeading.text = "Update Permissions in Bulk";
    this.view.bulkUpdateFeaturesLimitsPopup.flxSearchContainer.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.placeholder = "Search by Account Number, Account Name";
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(false);
    this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = {
      "added": [], "accIds": {}
    };
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(true)
    //this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, false);
    //set dropdown text
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.text = this.view.customersDropdownFA.lblSelectedValue.text;
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.btnPrimary.setVisibility(this.view.customersDropdownFA.btnPrimary.isVisible);
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.lblSelectedValue.info = this.view.customersDropdownFA.lblSelectedValue.info;
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.setEnabled(false);
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
    this.view.bulkUpdateFeaturesLimitsPopup.customersDropdownBulkUpdate.flxSelectedText.hoverSkin = "sknFlxbgF3F3F3bdrd7d9e0";
  },
  showBulkPermissionPopupAccountsCust: function () {
    var flxChildren;
    var toCheck = this.view.btnUpdateInBulkFA.info;
    //bulk update contract features screen
    if (this.view.flxContractFA.isVisible) {
      this.view.lblTitle.setVisibility(false);
      this.view.flxBulkUpdateListContainer.top = "0px";
      this.view.lblTitle1.setVisibility(true);
      this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
      this.view.flxTagsContainer.setVisibility(true);
      this.view.flxBulkUpdateListContainer.setVisibility(true);
      this.view.flxBulkFANoSelectedCustomer.setVisibility(false);
      this.view.lblIconBulkFAArrow.text = "";
      this.view.flxAddNewRowListCont.setVisibility(true);
      this.view.btnAddNewRow.setVisibility(true);
      this.view.btnAddNewRow.text = "+ Add New Permissions"
      this.view.flxTagsContainer.info = { "added": [] };
      if (this.view.flxTagsContainer.children.length != 0) {
        this.view.lblNothingSelected.setVisibility(false);
        this.view.btnModifySearch.text = "Modify Selection";
      }
      flxChildren = this.view.flxAddNewRowListCont.widgets();
      this.view.flxAddNewRowListCont.removeAll();
      for (var i = 0; i < flxChildren.length; i++) {
        this.view.remove(this.view[flxChildren[i].id]);
      }
      var segData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
      var selIds = [];
      //update selected row id's
      for (var p = 0; p < segData[0][1].length; p++) {
        if (segData[0][1][p].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl) {
          if (toCheck === "ACCLVL") {
            selIds.push(segData[0][1][p].lblCustomerName.text);
          } else if (toCheck === "CUSTLVL") {
            selIds.push(segData[0][1][p].lblCustomerId.text);
          }
        }
      }
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = selIds;
    }
    else { //bulk update contract limits screen
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.lblIconArrow.text = "";
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen1.setVisibility(false);
      this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateScreen2.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.btnAddNewRow.setVisibility(true);
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = { "added": [] };
      flxChildren = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
      this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.removeAll();
      for (var i = 0; i < flxChildren.length; i++) {
        this.view.bulkUpdateFeaturesLimitsPopup.remove(this.view.bulkUpdateFeaturesLimitsPopup[flxChildren[i].id]);
      }
    }
    this.addNewFeatureRowBulkUpdate("contract");

    if (this.view.flxContractFA.isVisible) {
      //this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info={"added":[]};
      this.view.flxTagsContainer.removeAll();
      this.view.flxMoreTagsContFA.removeAll();
      this.addBulkUpdateTagsCustAccounts();
      if (this.view.flxTagsContainer.info.added.length != 0) {
        this.view.btnModifySearch.text = "Modify Selection";
        this.view.lblNothingSelected.setVisibility(false);
      }
    }
    ///else if(this.view.toggleContractButtonsFeatures.info.selectedTab != 2){
    else {
      this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info = { "added": [] };
      this.addBulkUpdateTags();
    }
    var outerFlex = this.view.flxContractFA.isVisible ? this.view.flxFABulkUpdateScreen : this.view.bulkUpdateFeaturesLimitsPopup.flxContractDetailsPopupContainer;
    var parentflex = this.view.flxContractFA.isVisible ? this.view.flxBulkUpdateListContainer : this.view.bulkUpdateFeaturesLimitsPopup.flxBulkUpdateListContainer;
    var height = outerFlex.frame.height - (70 + parentflex.frame.y + 80);
    parentflex.height = height + "dp";
    this.getFeaturesForBulkUpdate();
    this.bulkUpdateListboxData = this.getListForListBoxContracts(this.bulkUpdateAllFeaturesList);
    //this.addNewFeatureRowBulkUpdate(); 
    this.view.forceLayout();
  },
  /*
  * enroll form
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
      "flxCheckBox":{"onClick":function(){self.toggleBulkCheckbox();}},
      "lblCheckbox": { "isVisible":true,"text": self.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
      "lblCustomerId":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID")},
      "lblCustomerName":{"text":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerName_UC")},
      "lblSeparator":{"skin":"sknLblSeparator696C73","isVisible":true}
    }
    var selRowIds = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
    var totalRowsCount = 0;
    for (var x = 0; x < customers.length; x++) {
      if (customers[x].isSelected === "true" || true) {
        totalRowsCount = totalRowsCount + 1;
        rowsData.push({
          "template": "flxsegCustomersList",
          "flxCheckBox": { "onClick": function () { self.toggleCustomerCheckbox(); } },
          //"lblCheckbox": { "isVisible": true,"text": this.AdminConsoleCommonUtils.checkboxnormal },
          "lblCheckbox": { "isVisible": true,"text": this.AdminConsoleCommonUtils.checkboxnormallbl,"skin":"sknBgB7B7B7Sz20pxCheckbox" },
          "lblCustomerId": { "text": customers[x].coreCustomerId },
          "lblCustomerName": { "text": customers[x].coreCustomerName },
          "lblSeparator": { "skin": "sknLblSeparatore7e7e7", "isVisible": true },
          "custInfo": customers[x]
        });
      }
    }
    secData.lblCheckbox.text = totalRowsCount === selRowIds.length ? this.AdminConsoleCommonUtils.checkboxSelectedlbl :
    selRowIds.length === 0 ? this.AdminConsoleCommonUtils.checkboxnormallbl : this.AdminConsoleCommonUtils.checkboxPartiallbl;
    secData.lblCheckbox.skin = this.applyCheckboxSkin(secData.lblCheckbox);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.widgetDataMap=dataMap;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([[secData,rowsData]]);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info = { "selectedCust": selRowIds, "secData": secData, "rowsData": rowsData };
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, selRowIds.length > 0);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * toggle section header checkbox action in bulk update screen
  */
  toggleBulkCheckbox : function(){
    var imgSrc=this.AdminConsoleCommonUtils.checkboxnormallbl;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust=[];
    var segData=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    if(segData[0][0].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
      segData[0][0].lblCheckbox.text= this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      segData[0][0].lblCheckbox.skin= this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      imgSrc= this.AdminConsoleCommonUtils.checkboxSelectedlbl;
    }else
      //segData[0][0].imgCheckBox.src=this.AdminConsoleCommonUtils.checkboxnormal;
     segData[0][0].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
    segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      for(var i=0;i<segData[0][1].length;i++){
      segData[0][1][i].lblCheckbox.text=imgSrc;
      segData[0][1][i].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][1][i].lblCheckbox);
      if(imgSrc === this.AdminConsoleCommonUtils.checkboxnormalbl)
      	this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.push(segData[0][1][i].custInfo);
    }
    var isValid = segData[0][0].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl?false:true;
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave,true,isValid);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(segData);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * toggle row checkbox action in bulk update screen
  */
  toggleCustomerCheckbox : function(){
    var selCount=0;
    var segData=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    var selIndex=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.selectedRowIndex[1];
    for(var i=0;i<segData[0][1].length;i++){
      if(segData[0][1][i].lblCheckbox.text=== this.AdminConsoleCommonUtils.checkboxSelectedlbl)
        selCount=selCount+1;
    }
    if(segData[0][1][selIndex].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl){
      segData[0][0].lblCheckbox.text=(selCount+1 === segData[0][1].length)? this.AdminConsoleCommonUtils.checkboxSelectedlbl:this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[0][0].lblCheckbox.skin=this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text= this.AdminConsoleCommonUtils.checkboxSelectedlbl;
      segData[0][1][selIndex].lblCheckbox.skin= this.applyCheckboxSkin(segData[0][1][selIndex].lblCheckbox);
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.push(segData[0][1][selIndex].custInfo);
    }else{
      segData[0][0].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[0][0].lblCheckbox.skin = this.applyCheckboxSkin(segData[0][0].lblCheckbox);
      segData[0][1][selIndex].lblCheckbox.text=this.AdminConsoleCommonUtils.checkboxnormallbl;
      segData[0][1][selIndex].lblCheckbox.skin = this.applyCheckboxSkin(segData[0][1][selIndex].lblCheckbox);
      for(let x=0;x<this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length;x++){
        if(segData[0][1][selIndex].custInfo.coreCustomerId === this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust[x].coreCustomerId)
          this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.splice(x,1);
      }
    }
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(segData);
    var isValid = segData[0][0].lblCheckbox.text=== this.AdminConsoleCommonUtils.checkboxnormallbl?false:true;
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave,true,isValid);
    this.view.forceLayout();
  },
  /*
  * enroll form
  * cadd tags in bulk update screen for contracts
  */
  addBulkUpdateTags : function(){
    var toCheck = this.view.btnUpdateInBulkFA.info;
    var selectedCustData=this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data;
    var tagsFlexPath=this.view.flxContractFA.isVisible?this.view.flxTagsContainer:this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer;
    tagsFlexPath.removeAll();
    var selectedCustCount=0;
    for (var i=0;i<selectedCustData[0][1].length;i++){
      if(selectedCustData[0][1][i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl)
        selectedCustCount++;
      	this.addCustomerTag(tagsFlexPath,selectedCustData[0][1][i].lblCustomerName.text,selectedCustData[0][1][i].lblCustomerId.text);
    }
    if(this.view.flxContractFA.isVisible)
      this.view.lblSelectedHeading.text="Selected Customers("+this.getTwoDigitNumber(selectedCustCount)+")";
    if(this.view.flxContractFA.isVisible && toCheck == "CUSTLVL" && this.view.flxTagsContainer.children.length!=0) 
      {
            this.view.lblNothingSelected.setVisibility(false);       
      }
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
        var frequency,count = [],selAccId= {};
        var repeatedAccount = 0;
        var selectedCustCount = 0;
        for (var i = 0; i < selectedCustData[0][1].length; i++) {
            if (selectedCustData[0][1][i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl) {
               // selectedCustCount++;
               //  selAccId[selectedCustData[0][1][i].lblCustomerName.text] = selectedCustData[0][1][i].lblAccountType.text;
               // count.push(selectedCustData[0][1][i].lblAccountName.text);
                // this.addCustomerTag(tagsFlexPath, selectedCustData[0][1][i].lblAccountName.text); ///,selectedCustData[0][1][i].lblCustomerId.text);
            
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
      /*   this.view.flxTagsContainer.info.accIds = selAccId;
         frequency = this.findRepeatingElements(count, count.length);
          // var arrayOfOccurence = Array.from(frequency, ([this.repeatedAccountsBulkUpdate.accounts, this.repeatedAccountsBulkUpdate.value]));
         var arrayOfOccurence = Array.from(frequency);  
         for(var i = 0;i<arrayOfOccurence.length;i++)
        {
          this.addCustomerTag(tagsFlexPath, arrayOfOccurence[i][0],arrayOfOccurence[i][1]);
        } */
    //if (this.view.flxContractFA.isVisible) this.view.lblSelectedHeading.text = "Selected Accounts(" + this.getTwoDigitNumber(selectedCustCount) + ")";
     if(featureLvl === "CUSTLVL"){
      this.view.lblSelectedHeading.text="Selected Customers("+this.getTwoDigitNumber(count.length)+")";
    } else{
      this.view.flxTagsContainer.info.accIds = selAccId;
      frequency = this.findRepeatingElements(count, count.length);
      var arrayOfOccurence = Array.from(frequency);  
      for(var i = 0;i<arrayOfOccurence.length;i++){
        this.addAccountsTagContract(tagsFlexPath, arrayOfOccurence[i][0],arrayOfOccurence[i][1], arrayOfOccurence.length);
      }
      this.view.lblSelectedHeading.text = "Selected Accounts(" + this.getTwoDigitNumber(selectedCustCount) + ")";
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
  /* 
  * function to return the required features in listbox masterdata format in contracts
  * @param: unselected features id's list
  * @retrun: masterdata with given features id's
  */
  getListForListBoxContracts: function(data) {
    var self = this;
    var finalList = [["select", "Select a Feature"]];
    if (this.view.flxContractFA.isVisible) {
      var featureLevel = this.view.btnUpdateInBulkFA.info;
      var bulkUpdateFeatureList = self.bulkUpdateAllFeaturesListContract;
      for (var i = 0; i < self.bulkUpdateAllFeaturesListContract.length; i++) {
        if (featureLevel === "ACCLVL") { //to show features of account level only
          var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
          if (data.contains(self.bulkUpdateAllFeaturesListContract[i].featureId) && this.bulkUpdateAccLevelActions[custId] &&
            this.bulkUpdateAccLevelActions[custId][self.bulkUpdateAllFeaturesListContract[i].featureId]) {
            finalList.push([self.bulkUpdateAllFeaturesListContract[i].featureId, self.bulkUpdateAllFeaturesListContract[i].featureName]);
          }
        } else {
          if (data.contains(self.bulkUpdateAllFeaturesListContract[i].featureId)) {
            finalList.push([self.bulkUpdateAllFeaturesListContract[i].featureId, self.bulkUpdateAllFeaturesListContract[i].featureName]);
          }
        }
      }
    }else{
      var limitFeatures=[];
      var limitActions=[];
      var dataToSet=[];
      for(var a=0;a<self.bulkUpdateAllFeaturesListContract.length;a++){
        if(self.bulkUpdateAllFeaturesListContract[a].type === "MONETARY"&&self.bulkUpdateAllFeaturesListContract[a].actions.length>0){
          limitFeatures=JSON.parse(JSON.stringify(self.bulkUpdateAllFeaturesListContract[a]));
          limitActions = self.bulkUpdateAllFeaturesListContract[a].actions.filter(function(item) {
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
  * update the selected changes in bulk update popup
  */
  updateFeatureLimitsBulkContract : function(){
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var featureId = "";
    var actionIds = [], bulkUpdateList = [], selectedCustIds = [], dependentActions = [];
    var isEnable = false;
    var typeValue = this.getSelectedType();
    var selectedCust = this.view.bulkUpdateFeaturesLimitsPopup.flxTagsContainer.info.added;
    var limitVal = "";//this.view.tbxValue21.text;
    for (let a = 0; a < selectedCust.length; a++)
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
      if (actionIds.length > 0) {
        bulkUpdateList.push({ "featureId": featureId, "actionIds": actionIds, "limitId": typeValue, "limitVal": rowsList[i].tbxValue21.text });
      }
    }
    for(var a=0;a<this.createContractRequestParam.contractCustomers.length;a++){
      if(selectedCustIds.includes(this.createContractRequestParam.contractCustomers[a].coreCustomerId)){
        for(var b=0;b<this.createContractRequestParam.contractCustomers[a].features.length;b++){
          for(let x=0;x<bulkUpdateList.length;x++){
            if(this.createContractRequestParam.contractCustomers[a].features[b].featureId === bulkUpdateList[x].featureId){
              for(var c=0;c<this.createContractRequestParam.contractCustomers[a].features[b].actions.length;c++){
                if(bulkUpdateList[x].actionIds.includes(this.createContractRequestParam.contractCustomers[a].features[b].actions[c].actionId)){
                  this.updateBulkRequestParam(a, b, c, false, bulkUpdateList[x]);
                }
              }
            }
          }
        }
      }
    }
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    this.view.customersDropdownLimits.lblSelectedValue.info = { "id": selectedCustIds[0] };
    this.setSelectedText("customersDropdownLimits", selectedCustIds[0]);
    this.setCustSelectedData("customersDropdownLimits", false);
    this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.contracts.LimitsBulkUpdateMsg"), this);
  },
  /*
 * FEATURE BULK UPDATE: get added feature action in bulk selection 
 **/
  updateFeaturesBulkChanges: function () {
    var rowsList = this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var featureId = "";
    var actionIds = [], selectedCust = [], bulkUpdateList = [], selectedCustIds = [];
    var isEnable = false;
    var isFeatures = this.view.flxContractFA.isVisible;
    var isCustLevel = this.view.toggleContractButtonsFeatures.info.selectedTab === 1 ? true : false;
    rowsList = this.view.flxAddNewRowListCont.widgets();
    selectedCust = this.view.flxTagsContainer.info.added;
    var dependentActions = [];
    if (isCustLevel === true) {
      for (let a = 0; a < selectedCust.length; a++)
        selectedCustIds.push(selectedCust[a][1]);
    } else {
      selectedCustIds = Object.keys(this.view.flxTagsContainer.info.accIds);
    }    //get all assigned feature id's
    for (var i = 0; i < rowsList.length; i++) {
      var statusValue = this.getSelectedStatusType(rowsList[i]);
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select")
        featureId = rowsList[i].lstBoxFieldValue11.selectedKey;
      actionIds = [];
      if (rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems) {
        var selItems = rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems;
        for (let i = 0; i < selItems.length; i++) {
          if (!actionIds.includes(selItems[i].actionId)) {
            actionIds.push(selItems[i].actionId);
            //To check dependent actions in bulk update permissions
            for (let j = 0; j < selItems[i].dependentActions.length; j++) {
              if (!actionIds.includes(selItems[i].dependentActions[j].trim()))
                actionIds.push(selItems[i].dependentActions[j].trim());
            }
          }
        }
      }
      if (actionIds.length > 0) {
        bulkUpdateList.push({ "featureId": featureId, "actionIds": actionIds, "isEnable": statusValue === "enable" ? "true" : "false" });
      }
    }
    if (isCustLevel) { //cust level
      this.updateBulkCustFeaturesReqParam(bulkUpdateList, selectedCustIds);
    } else if (isCustLevel === false) { //acc level
      this.updateBulkAccFeaturesReqParam(bulkUpdateList, selectedCustIds);
    }
    this.view.flxBulkUpdateFeaturesPopup.setVisibility(false);
    // this.view.customersDropdownLimits.lblSelectedValue.info={"id":selectedCustIds[0]};
    // this.setSelectedText("customersDropdownFA",selectedCustIds[0]);
    // this.setCustSelectedData("customersDropdownFA",false);
    this.view.flxAddProdFeaturesBackBtn.onClick();
    this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.contracts.FeatureBulkUpdateMsg"), this);
  },
  /*
  * update the selected changes in bulk update popup
  */
  updateBulkRequestParam : function(custInd,featureInd,actionInd,isFA,data){
    if(isFA){
      this.createContractRequestParam.contractCustomers[custInd].features[featureInd].actions[actionInd].isEnabled=data.isEnable;
    }else{
      for(let x=0;x<3;x++){
        if(this.createContractRequestParam.contractCustomers[custInd].features[featureInd].actions[actionInd].limits[x].id === data.limitId)
          this.createContractRequestParam.contractCustomers[custInd].features[featureInd].actions[actionInd].limits[x].value=data.limitVal;
      }
    }
  },
  /*
  * enroll form
  * get state/country list for ontract details
  */
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
    this.presenter.getAddressDataforContract(callBack);
  },
  /*
  * validation for bulk update screen in contracts
  */
  validateBulkSelectionContracts : function(){
    var rowsList = this.view.flxContractFA.isVisible?this.view.flxAddNewRowListCont.widgets():this.view.bulkUpdateFeaturesLimitsPopup.flxAddNewRowListCont.widgets();
    var isValid=true;
    var selCount=0;
    for (var i = 0; i < rowsList.length; i++) {
      if (rowsList[i].lstBoxFieldValue11.selectedKey !== "select"){
        selCount=selCount+1;
        if(rowsList[i].productTypeFilterMenu.segStatusFilterDropdown.selectedRowItems === null){
          isValid=false;
          rowsList[i].flxFieldValueContainer12.skin="sknFlxCalendarError";
          rowsList[i].lblErrorMsg12.text= kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAtleastOneAction");
          rowsList[i].flxErrorField12.setVisibility(true);
        }
        if(this.view.flxContractLimits.isVisible === true&&rowsList[i].tbxValue21.text.trim().length === 0){
          isValid=false;
          rowsList[i].lblErrorMsg21.text= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
          rowsList[i].flxErrorField21.setVisibility(true);
          rowsList[i].flxValue21.skin="sknFlxCalendarError";
        }
      }
    }
    if(selCount === 0){
      isValid=false;
      rowsList[0].lstBoxFieldValue11.skin="sknlbxError";
      rowsList[0].lblErrorMsg11.text=kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectAtleastOneFeature");
      rowsList[0].flxErrorField11.setVisibility(true);
    }
    this.view.forceLayout();
    return isValid;
  },
  /*
  * enroll form
  * validation for contract details screen in create/edit contract
  */
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
    if(validation === true){
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
  /*
  * function to clear inline error validations
  * widget path, error flex path, widget type
  */
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
  * enroll form
  * hide the address segment
  * @param: typehead widget path
  */
  hideAddressSegments : function(typeHeadPath){
    if(typeHeadPath){
      typeHeadPath.segSearchResult.setVisibility(true);
    }
    this.view.forceLayout();
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
      if(noResultFlex === this.view.typeHeadContractCountry.flxNoResultFound){
        this.view.flxContractCountry.zIndex = 2;
      }else{
       this.view.flxContractCountry.zIndex = 1;
      }
    }else{
      segPath.setVisibility(false);
      noResultFlex.setVisibility(true);
      if(noResultFlex === this.view.typeHeadContractCountry.flxNoResultFound){
        this.view.flxContractCountry.zIndex = 2;
      }else{
        this.view.flxContractCountry.zIndex = 1;
      }
    }
    self.view.forceLayout();
  },
  /*
  * enroll form
  * assign text from seg to textbox
  *  @param: segment path, textbox path
  */
  assignText : function(segment,textBox){
    var selectedRow = segment.data[segment.selectedRowIndex[1]];
    textBox.text =  selectedRow.lblAddress.text;
    textBox.info.isValid = true;
    textBox.info.data = selectedRow;
    segment.setVisibility(false);
    this.view.flxContractCountry.zIndex = 1;
    this.view.forceLayout();
  },
  /*
  * enroll form
  * create contract payload formation and call service
  */
  createContract: function () {
    var requestParam = JSON.parse(JSON.stringify(this.createContractRequestParam));
    var featureActions = [], disableAcc = [], globalFeatureActions ={};
    var limitJSON;
    requestParam.globalLevelPermissions = [];
    requestParam.accountLevelPermissions = [];
    requestParam.transactionLimits = [];
    if (this.action === this.actionConfig.edit)
      requestParam.contractId = "";
    requestParam.contractName = this.view.contractDetailsEntry1.tbxEnterValue.text;
    requestParam.legalEntityId= this.legalentityid1 || "";
    requestParam.serviceDefinitionName = this.view[this.selectedServiceCard].lblCategoryName.toolTip;
    requestParam.serviceDefinitionId = this.view[this.selectedServiceCard].lblCategoryName.info.catId;
    requestParam.faxId = this.view.contractDetailsEntry2.tbxEnterValue.text || "";
    requestParam.communication = [{ "phoneNumber": this.view.contractContactNumber.txtContactNumber.text, "phoneCountryCode": this.view.contractContactNumber.txtISDCode.text, "email": this.view.contractDetailsEntry3.tbxEnterValue.text }];
    requestParam.address = [{
      "country": this.view.typeHeadContractCountry.tbxSearchKey.text || "",
      "cityName": this.view.contractDetailsEntry8.tbxEnterValue.text || "",
      "state": this.view.contractDetailsEntry8.tbxEnterValue.text || "",
      "zipCode": this.view.contractDetailsEntry6.tbxEnterValue.text || "",
      "addressLine1": this.view.contractDetailsEntry4.tbxEnterValue.text || "",
      "addressLine2": this.view.contractDetailsEntry5.tbxEnterValue.text || ""
    }]

    for(var a=0;a<this.createContractRequestParam.contractCustomers.length;a++){
      requestParam.contractCustomers[a].isBusiness=this.createContractRequestParam.contractCustomers[a].isBusiness;
      requestParam.contractCustomers[a].accounts=[];
      requestParam.contractCustomers[a].excludedAccounts=[];
      for(var b=0;b<this.createContractRequestParam.contractCustomers[a].accounts.length;b++){
        var currAccountObj = {
          "accountId":this.createContractRequestParam.contractCustomers[a].accounts[b].accountNumber||this.createContractRequestParam.contractCustomers[a].accounts[b].accountId,
          "accountType":this.createContractRequestParam.contractCustomers[a].accounts[b].accountType,
          "accountName":this.createContractRequestParam.contractCustomers[a].accounts[b].accountName,
          "typeId":this.createContractRequestParam.contractCustomers[a].accounts[b].typeId,
          "ownerType":this.createContractRequestParam.contractCustomers[a].accounts[b].ownerType,
          "arrangementId":this.createContractRequestParam.contractCustomers[a].accounts[b].arrangementId,
          "accountHolderName":this.createContractRequestParam.contractCustomers[a].accounts[b].accountHolderName,
          "productId":this.createContractRequestParam.contractCustomers[a].accounts[b].productId,
          "accountStatus":this.createContractRequestParam.contractCustomers[a].accounts[b].accountStatus,
        };
        if(this.createContractRequestParam.contractCustomers[a].accounts[b].isEnabled){
          //to check if the user has selected this account or not
          if(this.createContractRequestParam.contractCustomers[a].accounts[b].isEnabled === "true"){
            requestParam.contractCustomers[a].accounts.push(currAccountObj);
          } else{
            currAccountObj["isEnabled"] = "false";
            disableAcc.push(currAccountObj);
            requestParam.contractCustomers[a].excludedAccounts.push(currAccountObj);
          }
        }else{//if the user has neither selected nor unselected this account
          requestParam.contractCustomers[a].accounts.push(currAccountObj);
        }
      }
      limitJSON = {
        "coreCustomerName": requestParam.contractCustomers[a].coreCustomerName,
        "coreCustomerId": requestParam.contractCustomers[a].coreCustomerId,
        "featurePermissions": []
      };
      var limitFeatureJSON = {};
      globalFeatureActions[requestParam.contractCustomers[a].coreCustomerId] = [];
      for (var b = 0; b < this.createContractRequestParam.contractCustomers[a].features.length; b++) {
        featureActions = [];
        var currFeatureActions = this.createContractRequestParam.contractCustomers[a].features[b].actions || this.createContractRequestParam.contractCustomers[a].features[b].permssions;
        if(currFeatureActions){
          for (var c = 0; c < currFeatureActions.length; c++) {
            if (currFeatureActions[c].isEnabled === undefined || currFeatureActions[c].isEnabled === null) {
              //if the user has neither selected nor unselected this actions
              currFeatureActions[c].isEnabled = "true";
            }
            featureActions[c] = {
              "actionId": currFeatureActions[c].id || currFeatureActions[c].actionId,
              "actionName": currFeatureActions[c].name || currFeatureActions[c].actionName,
              "actionDescription": currFeatureActions[c].description || currFeatureActions[c].actionDescription,
              "isEnabled": currFeatureActions[c].isEnabled,
            };
            if (currFeatureActions[c].limits) {
              limitFeatureJSON = {
                "featureId": this.createContractRequestParam.contractCustomers[a].features[b].id || this.createContractRequestParam.contractCustomers[a].features[b].featureId,
                "actionId": currFeatureActions[c].id || currFeatureActions[c].actionId,
                "actionName": currFeatureActions[c].name || currFeatureActions[c].actionName,
                "actionDescription": currFeatureActions[c].description || currFeatureActions[c].actionDescription,
                "limits": currFeatureActions[c].limits
              }
              limitJSON.featurePermissions.push(limitFeatureJSON);
            }
          }
          var updatedFeatureObj = {
            "featureName": this.createContractRequestParam.contractCustomers[a].features[b].name || this.createContractRequestParam.contractCustomers[a].features[b].featureName,
            "featureId": this.createContractRequestParam.contractCustomers[a].features[b].id || this.createContractRequestParam.contractCustomers[a].features[b].featureId,
            "featureDescription": this.createContractRequestParam.contractCustomers[a].features[b].description || this.createContractRequestParam.contractCustomers[a].features[b].featureDescription,
            "permissions": featureActions
          };
          globalFeatureActions[requestParam.contractCustomers[a].coreCustomerId].push(updatedFeatureObj);
        }

      }
      requestParam.transactionLimits.push(limitJSON);
      requestParam.globalLevelPermissions.push({
        "coreCustomerName": requestParam.contractCustomers[a].coreCustomerName,
        "coreCustomerId": requestParam.contractCustomers[a].coreCustomerId,
        "features": globalFeatureActions[requestParam.contractCustomers[a].coreCustomerId] //requestParam.contractCustomers[a].features
      });
      if (this.action === this.actionConfig.create) {
        delete requestParam.contractCustomers[a].features;
      }
      for (var m = 0; m < this.createContractRequestParam.accountLevelPermissions.length; m++){
        let accLvlPermObj = this.createContractRequestParam.accountLevelPermissions[m];
        accLvlPermObj.accounts = this.formatAccountLevelPermissions(JSON.parse(JSON.stringify(this.createContractRequestParam.accountLevelPermissions[m].accounts)));
        requestParam.accountLevelPermissions.push(accLvlPermObj);
      }
      // to concat disabled accounts in case of edit contract
      if(this.action === this.actionConfig.edit){
        var enabledAcc = requestParam.contractCustomers[a].accounts;
        requestParam.contractCustomers[a].accounts = enabledAcc.concat(disableAcc);
      }
    }
    if(this.action === this.actionConfig.create){
      this.presenter.createContract(requestParam);
    } else {
      var payload = {};
      payload.contractName = requestParam.contractName;
      payload.legalEntityId= this.legalentityid1 || "";
      payload.serviceDefinitionName = requestParam.serviceDefinitionName;
      payload.serviceDefinitionId = requestParam.serviceDefinitionId;
      payload.faxId = requestParam.faxId;
      payload.communication = JSON.stringify(requestParam.communication);
      payload.address = JSON.stringify(requestParam.address);
      payload.contractCustomers = JSON.stringify(requestParam.contractCustomers);
      payload.transactionLimits= requestParam.transactionLimits;
      payload.globalLevelPermissions= requestParam.globalLevelPermissions;
      payload.accountLevelPermissions= requestParam.accountLevelPermissions;
      this.presenter.setCreateContractPayload(payload);
      this.addCustomersFromCreatedContract({"contractDetails":payload});
      this.removeContractDelCustFromEnrollSeg(payload);
    }
  },
  /*
  * show popup for creating a contract with customer in it
  */
  showCreateContractPopup : function(){
    var self =this;
    var contractCust = this.createContractRequestParam.contractCustomers;
    var custNames = "";
    var contractName = this.view.contractDetailsEntry1.tbxEnterValue.text || "";
    for(var i=0 ;i< contractCust.length;i++){
      custNames = "-"+ custNames + contractCust[i].coreCustomerName+ "<br>";
    }
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompaniesPopup.confirmation");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AreYouSureToCreateContract") + "\""+
      contractName+"\""+ kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.withBelowListOfCustomers")+"<br>"+custNames;
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateCAPS");
    this.view.flxEnrollCustConfirmationPopup.setVisibility(true);
    
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.createContract();
      self.view.flxEnrollCustConfirmationPopup.setVisibility(false);
    };
    
  },
  /*
  * show confirmation popup to add searched customer to selected contract
  */
  showEditContractConfirmationPopup : function(){
    var self =this;
    //get the selected contract id
    var selContractId ="",searchedCust = "", selContractName ="",custNameId = "";
    var contractCards = this.view.flxCustomerContractsList.widgets();
    for(var i=0;i <contractCards.length; i++){
      if(contractCards[i].lblCheckbox.text === this.AdminConsoleCommonUtils.radioSelected){
        selContractId = contractCards[i].info.contracts.id;
        selContractName = contractCards[i].info.contracts.name;
        searchedCust = contractCards[i].info.searchCustDetails.customers ?
                       contractCards[i].info.searchCustDetails.customers[0] :"";
        custNameId = searchedCust ? searchedCust.coreCustomerName + " ("+ searchedCust.coreCustomerId + ")" : "";
        break;
      }
    }
    //set popup message, action
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCompaniesPopup.confirmation");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AreYouSureYouWantToAddCustomer") + "\""+
      custNameId+"\""  + kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.toTheContract") +"\"" +selContractName + "\"?" +
      "<br>" + kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.AddCustToContractPopupMsg");
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonAdd");
    this.view.flxEnrollCustConfirmationPopup.setVisibility(true);
    
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.presenter.getEditContractInformation(selContractId, searchedCust);
      self.view.flxEnrollCustConfirmationPopup.setVisibility(false);
    };
  },
  /*
  * form edit contract payload to add customer to existing contract
  * @param: selcted contract details
  */
  createEditContractPayload : function(editContractDetails){
    var contractAddress = editContractDetails.contractDetails.address;
    var contractComm = editContractDetails.contractDetails.communication;
    var contractCust =  editContractDetails.contractDetails.contractCustomers;
    var customerFeatures = editContractDetails.featuresLimits.features;
    var customerLimits = editContractDetails.featuresLimits.limits;
    var searchedCustDetails = editContractDetails.searchCust;
    var newCustAccounts = editContractDetails.custAccounts.coreCustomerAccounts.length > 0 ?
                               editContractDetails.custAccounts.coreCustomerAccounts[0].accounts : [];
    var addressArray = [{"country":contractAddress[0].country || "","cityName":contractAddress[0].cityName || "",
                          "state":contractAddress[0].state || "","zipCode":contractAddress[0].zipCode || "",
                          "addressLine1":contractAddress[0].addressLine1 || "","addressLine2": contractAddress[0].addressLine2 || ""}];
    //add new customer
    var contractCustArr =[{
      "isPrimary": "false",
      "coreCustomerId": searchedCustDetails.coreCustomerId,
      "coreCustomerName": searchedCustDetails.coreCustomerName,
      "sectorId":searchedCustDetails.sectorId,
      "isBusiness":searchedCustDetails.isBusiness,
      "accounts": newCustAccounts.map(this.getContracAccountsMapJson),
      "features":[]
    }];
    //add already assigned customers
    for(var i=0; i<contractCust.length; i++){
      var customerObject = {
        "isPrimary": contractCust[i].isPrimary,
		"coreCustomerId": contractCust[i].coreCustomerId,
		"coreCustomerName": contractCust[i].coreCustomerName,
        "sectorId":contractCust[i].sectorId,
        "isBusiness":contractCust[i].isBusiness,
		"accounts": contractCust[i].customerAccounts.map(this.getContracAccountsMapJson),
        "features":[]
      };
      contractCustArr.push(customerObject);
    }
    var updatedContractCust = this.setEditContractFeaturesLimits(contractCustArr,customerFeatures,customerLimits);
    //map features actions for edit payload structure
    for(var j=0;j<updatedContractCust.length; j++){
      updatedContractCust[j].features = this.getParsedFeaturesActionsForEditContract(updatedContractCust[j].features);
    }
    //form edit contract input payload
    var editContractPayLoad =  {
      "contractId":editContractDetails.contractDetails.id,
      "contractName": editContractDetails.contractDetails.name,
      "serviceDefinitionName": editContractDetails.contractDetails.servicedefinitionName,
      "serviceDefinitionId":editContractDetails.contractDetails.servicedefinitionId,
      "faxId":editContractDetails.contractDetails.faxId || "",
      "communication": JSON.stringify(contractComm) ,
      "address": JSON.stringify(addressArray),
      "contractCustomers": JSON.stringify(updatedContractCust)
    };
    this.presenter.editContract(editContractPayLoad);
  },
  
  /*
  *map accounts for create/edit contract payload
  */
  getContracAccountsMapJson : function(accountObj){
    return {
      "accountId": accountObj.accountNumber || accountObj.accountId,
      "accountType": accountObj.accountType,
      "accountName": accountObj.accountName,
      "typeId": accountObj.typeId || "",
      "ownerType": accountObj.ownerType,
      "arrangementId":accountObj.arrangementId,
      "accountHolderName":accountObj.accountHolderName,
      "accountStatus":accountObj.accountStatus,
    };
  },
  /*
  * enroll form
  * get combined features limits array for edit contract
  * @param: contract customer array, contract features,contract limits
  * @returns: updated contract customer arr with features
  */
  setEditContractFeaturesLimits : function(){
    var features= JSON.parse(JSON.stringify(this.createContractRequestParam.globalLevelPermissions));
    var limits= JSON.parse(JSON.stringify(this.createContractRequestParam.transactionLimits));
    var selectedCustIds=[];
    var isNewlyAdded=true;
    var combinedFeature={};
    for(let p=0;p<limits.length;p++){
      for(let x=0;x<limits[p].featurePermissions.length;x++){
        for(let y=0;y<features[p].features.length;y++){
          if(features[p].features[y].permissions){
            features[p].features[y].actions=features[p].features[y].permissions;
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
  /*
  * enroll form
  * set all deatures for newly added customer in edit contract flow
  * @return :features list
  */
   setAllFeatures : function(features){
    for(let a=0;a<features.length;a++){
      for(let b=0;b<features[a].actions.length;b++){
        features[a].actions[b].isEnabled="true";
      }
    }
    /*for (var i =0; i< this.createContractRequestParam.contractCustomers.length;i++){
      this.createContractRequestParam.contractCustomers[i].features=features;
    }*/
    return features;
  },
  /*
  * parse features actions for edit contract structure
  * @param: all features List
  * @returns: mapped features array for edit
  */
  getParsedFeaturesActionsForEditContract : function(featuresList){
    var featuresArr =[];
    for(var i=0; i<featuresList.length;i++){
      var actions = featuresList[i].actions;
      var actionsArr =[];
      for(var j=0; j<actions.length; j++){
        var actionObj = {
          "actionId": actions[j].id||actions[j].actionId,
          "actionName": actions[j].name||actions[j].actionName,
          "actionDescription": actions[j].description||actions[j].actionDescription,
          "isAllowed": actions[j].isEnabled,
        };
        if(actions[j].limits){
          actionObj["limits"] = actions[j].limits;
        }
        actionsArr.push(actionObj);
      }
      featuresArr.push({
        "featureName": featuresList[i].name||featuresList[i].featureName,
        "featureId": featuresList[i].id||featuresList[i].featureId,
        "featureDescription": featuresList[i].description||featuresList[i].featureDescription,
        "actions":actionsArr
      });
    }
    return featuresArr;
  },
  /*
  * edit contract option click
  */
  onEditContractClick : function(){
    var scopeObj =this;
    var enrollCustData = this.view.segEnrollCustList.data[this.enrollSegRowInd];
    var tempContractDetails = this.presenter.getCreateContractPayload();
    scopeObj.action = scopeObj.actionConfig.edit;
    scopeObj.view.tbxRecordsSearch.text = "";
    var contractCust=[];
    contractCust= scopeObj.toCheckJSONDataFormat(tempContractDetails.contractCustomers);
    scopeObj.limitsActualJSON = {};
    scopeObj.createContractRequestParam = {
      "contractId": "",
      "contractName": tempContractDetails.contractName,
      "serviceDefinitionName": tempContractDetails.serviceDefinitionName,
      "serviceDefinitionId": tempContractDetails.serviceDefinitionId,
      "faxId": tempContractDetails.faxId,
      "communication": tempContractDetails.communication,
      "address": tempContractDetails.address,
      "contractCustomers":  contractCust,
      "accountLevelPermissions": tempContractDetails.accountLevelPermissions,
      "globalLevelPermissions":tempContractDetails.globalLevelPermissions,
      "transactionLimits": tempContractDetails.transactionLimits
    };
   // scopeObj.presenter.getServiceDefinitionMonetaryActions({ "serviceDefinitionId": tempContractDetails.serviceDefinitionId, "legalEntityId":scopeObj.presenter.custSearchLEId || "" });
    scopeObj.updateButtonsText(true);
    scopeObj.view.flxClearRecordsSearch.setVisibility(false);
    scopeObj.setContractButtonsSkin(true);
    scopeObj.enableAllTabs(true);
    scopeObj.view.segAddedCustomers.setVisibility(true);
    scopeObj.view.btnSelectCustomers.setVisibility(true);
    scopeObj.view.flxNoCustomersAdded.setVisibility(false);
    scopeObj.showCreateContractScreen();
    scopeObj.showContractServiceScreen();
    
    scopeObj.addSelectedCustomersOfContract();
    scopeObj.setSelectedCustomersData();
    if(scopeObj.viewContractServiceDef.length === 0)
      scopeObj.presenter.getServiceDefinitionsForContracts(scopeObj.legalentityid1 || "");
    else{
      scopeObj.setContractServiceCards(scopeObj.viewContractServiceDef);
      scopeObj.setLegalEntityCardContract();
      scopeObj.setDataToServiceTypeFilter(scopeObj.viewContractServiceDef);
      scopeObj.view.flxContractServiceCards.info={"totalRecords":scopeObj.viewContractServiceDef};
    }
    scopeObj.getCountrySegmentData();
    scopeObj.view.forceLayout();
  },
  toCheckJSONDataFormat: function( JSONData) {
     var contractCust = [];
      if (typeof JSONData === "string") {
       contractCust = JSON.parse(JSONData);
        } else {
       contractCust = JSONData;
        }
      return contractCust;
    },
  /*
  * to add the customers added from contract while edit
  */
  addSelectedCustomersOfContract : function(){
    this.selectedCustomers = [];
    var segData = this.view.segEnrollCustList.data;
    for(var i=0; i<this.createContractRequestParam.contractCustomers.length; i++){
      var contractCust = this.createContractRequestParam.contractCustomers[i];
      for(var j=0; j<segData.length; j++){
        if(contractCust.coreCustomerId === segData[j].custDetails.coreCustomerId){  
          segData[j].custDetails["isSelected"] = contractCust.isPrimary === "true" ? "true" : "false";
          this.selectedCustomers.push(segData[j].custDetails);
        }
      }
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
    if(count > 9 || count === 0){
      updatedCount = count;
    } else{
      updatedCount = "0"+count;
    }
    return updatedCount;
  },
  callAddCustomer : function(){
    var widgetMap = {
      "custId": "custId",
      "flxEnrollCustomerList" : "flxEnrollCustomerList",
      "lblCustomerName":"lblCustomerName",
      "lblCustomerId":"lblCustomerId",
      "flxPrimary":"flxPrimary",
      "lblPrimary":"lblPrimary",
      "lstBoxService":"lstBoxService",
      "flxServiceError":"flxServiceError",
      "lblIconServiceError":"lblIconServiceError",
      "lblServiceErrorMsg":"lblServiceErrorMsg",
      "lstBoxRole":"lstBoxRole",
      "flxRoleError":"flxRoleError",
      "lblIconRoleError":"lblIconRoleError",
      "lblRoleErrorMsg":"lblRoleErrorMsg",
      "lblSeperator":"lblSeperator",
      "flxOptions":"flxOptions" ,
      "lblOptions":"lblOptions",
      "lblRemoved":"lblRemoved",
      "custDetails":"custDetails",
      "lblLegalEntity": "lblLegalEntity",
    };
    this.view.segEnrollCustList.setData([]);
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(this.view.commonButtons.btnSave,true,false);
    this.view.btnAddCustomerId.onClick();
    this.view.forceLayout();
  },
  showEditSignatoryGroups : function(){
    this.view.flxEnrollEditAccountsContainer.setVisibility(false);
    this.view.flxEnrollEditFeaturesContainer.setVisibility(false);
    this.view.flxEnrollEditOtherFeaturesCont.setVisibility(false);
    this.view.flxEnrollEditLimitsContainer.setVisibility(false);
    this.view.flxEnrollEdiSignatoryContainer.setVisibility(true);
    var enrollUserData = this.view.segEnrollCustList.data[this.enrollSegRowInd||0];
    var custInfo, isPrimary = false;
    isPrimary = enrollUserData.flxPrimary.isVisible === true ? true : false;
    custInfo = enrollUserData.custDetails;
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
    this.view.customersDropdownSignatory.lblSelectedValue.text = this.AdminConsoleCommonUtils.getTruncatedString(selectedCust, isPrimary ? 19 : 28, isPrimary ? 17 : 27);
    this.view.customersDropdownSignatory.lblSelectedValue.info = { "customerId": details.id, "customerDetails": custInfo };
    this.view.customersDropdownSignatory.lblSelectedValue.toolTip = selectedCust;
    this.view.customersDropdownSignatory.btnPrimary.isVisible = isPrimary;
    var widgetBtnArr = [this.view.enrollVerticalTabs.btnOption1,this.view.enrollVerticalTabs.btnOption2,this.view.enrollVerticalTabs.btnOption3, this.view.enrollVerticalTabs.btnOption4,this.view.enrollVerticalTabs.btnOption5];
    var widgetArrowArr = [this.view.enrollVerticalTabs.flxImgArrow1,this.view.enrollVerticalTabs.flxImgArrow2,this.view.enrollVerticalTabs.flxImgArrow3, this.view.enrollVerticalTabs.flxImgArrow4,this.view.enrollVerticalTabs.flxImgArrow5];
    this.tabUtilVerticleButtonFunction(widgetBtnArr,this.view.enrollVerticalTabs.btnOption5);
    this.tabUtilVerticleArrowVisibilityFunction(widgetArrowArr,this.view.enrollVerticalTabs.flxImgArrow5);
    this.view.searchEditSignatory.tbxSearchBox.text = "";
    this.view.searchEditSignatory.flxSearchCancel.setVisibility(false);
    this.view.flxAccountTypesFilter.setVisibility(false);
    this.view.flxEnrollEditSearchSignatory.setVisibility(true);
    // if(this.isValidApproval[custInfo.cif||custInfo.coreCustomerId]===undefined||this.isValidApproval[custInfo.cif||custInfo.coreCustomerId]===true)
    var isValidApproval = this.hasValidateApprovalPermission();
    if (isValidApproval === true)
      this.setSignatoryGroupsData();
    else {
      this.usersSelectedSignatoryList[details.id] === "NONE";
      this.view.flxEnrollEditSearchSignatory.setVisibility(false);
      this.view.lblNoResults.text = "This user cannot be assigned to any signatory groups as this user doesnt have any approval permissions";
      this.view.flxNoResultsFound.setVisibility(true);
      this.view.flxResults.setVisibility(false);
    }
    this.view.forceLayout();
  },
  hasValidateApprovalPermission : function(custIdParam,accFeaturesMap){
    var custId = custIdParam||this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var isValid=false;
    var currCustAccFeatures = accFeaturesMap||editUserObj.accountMapFeatures;
    var actions=[];
    for(let accId of currCustAccFeatures.keys()){
      var currSelAccObj = currCustAccFeatures .get(accId);
      var custfeatures = JSON.parse(currSelAccObj.features);
      for(var i=0;i<custfeatures.length;i++){
        actions=custfeatures[i].actions||custfeatures[i].permissions;
        for(var j=0; j< actions.length; j++){
          if(actions[j].isEnabled==="true"&&(actions[j].accessPolicyId==="APPROVE"||actions[j].accessPolicyId==="BULK_APPROVE")){
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
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var signCustomerData= editUserObj.signatoryGroups;
    if(editUserObj.signatoryGroups.length===0){
      this.view.lblNoResults.text= "There are no signatory groups associated to this Customer."
      this.view.flxNoResultsFound.setVisibility(true);
      this.view.flxResults.setVisibility(false);
    }else{
      this.view.flxNoResultsFound.setVisibility(false);
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
    var selectedSignatoryGroupId="NONE";
    var toAdd=data.map(function(rec){
      if(rec.isAssociated==="true"){//in edit flow we will get isassociated for first time
        isAssociated=true;
        self.usersSelectedSignatoryList[custId]=rec.signatoryGroupId;
      }
      return{
        "flxCustomerProfileRoles": "flxCustomerProfileRoles",
        "flxRoleNameContainer": {"onClick":self.toggleRadioButton},
        "flxRoleCheckbox": {"isVisible":false},
        "flxRoleRadio":{"isVisible":true},
        "imgRoleRadio": {"src": rec.isAssociated==="true" ||self.usersSelectedSignatoryList[custId]===rec.signatoryGroupId? "radio_selected.png":"radio_notselected.png"},
        "lblRoleName": rec.signatoryGroupName,
        "lblRoleDesc": rec.signatoryGroupDescription,
        "btnViewDetails": {"isVisible":false},
        "template": "flxCustomerProfileRoles",
        "id": rec.signatoryGroupId,
      };
    });
    if(isAssociated===false&&(this.usersSelectedSignatoryList[custId]==="NONE"||this.usersSelectedSignatoryList[custId]===undefined)){
      toAdd[0].imgRoleRadio.src="radio_selected.png";
    }
    this.view.segCustomerSignGroups.widgetDataMap =dataMap;
    this.view.segCustomerSignGroups.setData(toAdd);
    this.view.segCustomerSignGroups.info={"data":toAdd};
    this.view.segCustomerSignGroups.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.forceLayout();
  },
  toggleRadioButton : function(){
    var custId = this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
    var rowIndex = this.view.segCustomerSignGroups.selectedRowIndex[1];
    var segData = this.view.segCustomerSignGroups.data;
    var signatoryId="";
    for(var i=0;i<segData.length;i++){
      if(i === rowIndex){
        segData[i].imgRoleRadio.src = "radio_selected.png";
        signatoryId=segData[i].id;
      }
      else
        segData[i].imgRoleRadio.src = "radio_notselected.png";
    }
      this.view.segCustomerSignGroups.setData(segData);
    var signatoryList=editUserObj.signatoryGroups;
    for(let x=0;x<signatoryList.length;x++){
      if(signatoryList[x].signatoryGroupId===signatoryId){
        signatoryList[x].isAssociated="true";
        this.usersSelectedSignatoryList[custId]=signatoryId;
      }
      else
        signatoryList[x].isAssociated="false";
    }
    editUserObj.signatoryGroups=signatoryList;
    this.presenter.setAccountsFeaturesForEnrollCust(custId,editUserObj);
  },
  searchSignatoryGroups : function(){
    var custId = this.view.customersDropdownSignatory.lblSelectedValue.info.customerId;
    var editUserObj = this.presenter.getAccountsFeaturesForEnrollCust(custId);
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
  /*
  * reset to flag value to false as after initial form load the value is not reset on form reload
  */
  resetFlagValOnFormLeave: function () {
    this.isDataSetVisited = false;
    this.limitsValidationObject = {};
  },
  /*to set global signatory group object values in edit flow*/
  setGlobalUserSignatories: function (custId, signatoryList) {
    var signId = signatoryList.filter(function (rec) {
      if (rec.isAssociated === "true")
        return rec;
    });
    if (signId.length !== 0)
      this.usersSelectedSignatoryList[custId] = signId[0].signatoryGroupId;
    else
      this.usersSelectedSignatoryList[custId] = "NONE";
  },
  toggleContractFeaturesCustomerLevel: function () {
    this.view.tbxContractFASearch.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    var selectedCustId = this.view.customersDropdownFA.lblSelectedValue.info.id;
    this.view.lblContractFAHeader.text = "View by Customer";
    this.view.toggleContractButtonsFeatures.info.selectedTab = 1;
    //this.view.flxContractFASearch.right="20px";
    this.view.flxAccountTypeFilter.setVisibility(false);
    var dataToSet = [];
    var customers = typeof (this.createContractRequestParam.contractCustomers) === 'object' ? this.createContractRequestParam.contractCustomers : JSON.parse(this.createContractRequestParam.contractCustomers);
    for (let j = 0; j < customers.length; j++) {
      if (customers[j].coreCustomerId === selectedCustId) {
        dataToSet = JSON.parse(JSON.stringify(customers[j].features));
        break;
      }
    }
    this.setFeaturesDataCustomersContracts(JSON.parse(JSON.stringify(dataToSet)));
    this.view.forceLayout();
    //this.setCustSelectedData("customersDropdownFA",false);
  },
  toggleContractFeaturesAccountLevel: function (toCheck) {
    this.view.toggleContractButtonsFeatures.info.selectedTab = 2;
    this.view.tbxContractFASearch.placeholder = "Search By Account Number, Account Name";
    this.view.tbxContractFASearch.text = "";
    this.view.flxClearContractFASearch.setVisibility(false);
    this.view.lblContractFAHeader.text = "View by Accounts";
    this.view.flxAccountTypeFilter.setVisibility(false);
    this.setContractAccountLvlFeatures(toCheck);
    //this.setAccountTypesFilter(1);
    this.view.forceLayout();
    //this.setFilterDataInFeaturesLimitsTab();
  },
  getAccountLvlFeaturesActions: function () {
    var accIds = [];
    var accountPortfolioJson = {};
    var tempJSON = {};
    var selectedCust = typeof (this.createContractRequestParam.contractCustomers) == 'string' ? JSON.parse(this.createContractRequestParam.contractCustomers) : this.createContractRequestParam.contractCustomers;
    for (let i = 0; i < selectedCust.length; i++) {
      for (let j = 0; j < selectedCust[i].accounts.length; j++) {
        /*   tempJSON={
                 "coreCustomerId":selectedCust[i].coreCustomerId,
                 "coreCustomerName":selectedCust[i].coreCustomerName,
                 "accountName":selectedCust[i].accounts[j].accountName,
                 "accountType":selectedCust[i].accounts[j].accountType,
                 "isPortfolioAccount":selectedCust[i].accounts[j].isPortfolioAccount,
                 "accountId":selectedCust[i].accounts[j].accountId,
                 "featurePermissions":[]
               };
           if(selectedCust[i].accounts[j].isPortfolioAccount==="true"){
             tempJSON["portfolioId"]=selectedCust[i].accounts[j].portfolioId;
             tempJSON["portfolioName"]=selectedCust[i].accounts[j].portfolioName;
             if(accIds.indexOf(selectedCust[i].accounts[j].portfolioId)<0)
               accIds.push(selectedCust[i].accounts[j].portfolioId);
         */ // }
        if (accIds.indexOf(selectedCust[i].accounts[j].productId) < 0 && selectedCust[i].accounts[j].productId !== "") {
          accIds.push(selectedCust[i].accounts[j].productId)
          //    accountPortfolioJson[selectedCust[i].accounts[j].productId]={
          //    [selectedCust[i].coreCustomerId]:[tempJSON]
        }
        //  }else{
        //accountPortfolioJson[selectedCust[i].accounts[j].productId][selectedCust[i].coreCustomerId].push(tempJSON);
        //}

      }
    }
    //this.view.toggleContractButtonsFeatures.btnToggleRight.info=accountPortfolioJson;
    if (accIds.length > 0) {
      var legalEntityId = this.legalentityid1 || " ";
      this.presenter.getServiceDefinitionProductIdPermissions({
        "serviceDefinitionId": this.createContractRequestParam.serviceDefinitionId,
        "productIdList": JSON.stringify(accIds),
        "legalEntityId": legalEntityId
      });
    } else{
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    //     this.presenter.getServiceDefinitionProductIdPermissions({
    //       "serviceDefinitionId": "707dfea8-d0fe-4154-89c3-e7d7ef2ee16a",
    //     "productIdList": "[\"CURRENT.ACCOUNT\"]"
    //     });
  },
  setContractAccountLvlFeatures: function (toCheck) {
    var accounts = [];
    var custId = this.toggleAccountSelectedId;
    //this.view.customersDropdownFA.lblSelectedValue.info.id;
    for (let w = 0; w < this.createContractRequestParam.accountLevelPermissions.length; w++) {
      if (this.createContractRequestParam.accountLevelPermissions[w].coreCustomerId === custId) {
        accounts = this.createContractRequestParam.accountLevelPermissions[w].accounts;
        break;
      }
    }
    for (var x = 0; x < accounts.length; x++) {
      var accountJSON = {
        "accountId": accounts[x].accountId,
        "accountName": accounts[x].accountName,
        "ownerType": accounts[x].ownerType,
        "accountType": accounts[x].accountType,
        "features": accounts[x].features
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
    //this.setPortfolioSegmentData(accounts, false);
    if (toCheck === true) {
      this.setPortfolioSegmentData(accounts, false);
    }
  },
  filterAccountLvlDataForSearch: function (searchTxt) {
    var accounts = [];
    var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
    var customers = JSON.parse(this.createContractRequestParam.contractCustomers);
    for (let w = 0; w < customers.length; w++) {
      if (customers[w].coreCustomerId === custId) accounts = customers[w].accounts;
      //let filteredData = JSON.parse(JSON.stringify(customers[w].accountLvlFeatures.accounts));
      break;
    }
    var self = this;
    let filteredData = accounts;
    return filteredData.filter(function (contractCust) {
      // search by account Id &  by acccount name
      if (contractCust.accountId.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ||
        contractCust.accountName.toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      }
      // search by account name
      // nested loop for account names
      // contractCust.accounts = contractCust.accounts.filter(function(account){
      // self.searchResult.isAcctMatched = true;
      // return account['accountName'].toLowerCase().indexOf(searchTxt.toLowerCase()) !== -1 ;
      //});
      //   return contractCust.accounts.length !== 0;
    });
  },

  setPortfolioSegmentData: function (allAccounts, toCheck) {
    //kony.adminConsole.utils.hideProgressBar(this.view);
    var self = this;
    var noOfContracts = 0;
    noOfContracts = allAccounts.length;
    if (toCheck && noOfContracts === 0) {
      //show no record found
      this.view.flxContractAccountFAList.setVisibility(false);
      this.view.flxNoFeatureSearchFound.setVisibility(true);
    } else {
      this.view.flxNoFeatureSearchFound.setVisibility(false);
      this.view.flxContractAccountFAList.setVisibility(true);

      var dataMap = {
        "flxViewFeatures": "flxViewFeatures",
        "flxViewFeatureContainer": "flxViewFeatureContainer",
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
      var segmentPath = this.view.segContractPortfolio;
      var count = 0;
      for (var i = 0; i < allAccounts.length; i++) {
        if (allAccounts[i].isEnabled == true || allAccounts[i].isEnabled == "true") {
          count++;
        }
      }

      // var portfolioIds=Object.keys(portfolioAccounts);
      var segData = [];
      var secData, rowData;
      /* var currPortfolio={};
       var currPortAccounts=[];
       for(var x=0;x<portfolioIds.length;x++){
         currPortfolio=portfolioAccounts[portfolioIds[x]];
         currPortAccounts=currPortfolio.accounts;
         secData={
           "template":"flxViewFeatures",
           "flxViewFeature":{"isVisible":false},
           "flxArrow":{"onClick":function(context){self.togglePortfolioSection(context);}},
           "lblDownArrow":{"text":"\ue922"},
           "flxViewFeatureDetailsHeader":{"isVisible":false},
           "lblAccountTypeName":{"text":currPortfolio.portfolioName+"("+currPortfolio.portfolioId+")"},
           "lblAvailableActions":{"text":"Number of Accounts: "},
           "lblCountActions":{"text":self.getTwoDigitNumber(currPortAccounts.length)},
           "lblFeatureView":{"text":"Edit Feature"},
           "lblAccountNameHeader":{"text":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME")},
           "fontIconAccNameSort":{"text":"\ue92a","skin":"sknIcon15px","hoverSkin" :"sknlblCursorFont"},
           "fontIconAccNumberSort":{"text":"\ue92a","skin":"sknIcon15px","hoverSkin" :"sknlblCursorFont"},
           "flxAccountName":{"onTouchStart":function(context){
             self.sortAndSetData("lblAccountName.text",self.view.segContractPortfolio,3,context.rowContext.sectionIndex)
           }},
         "flxAccountNumber":{"onTouchStart":function(context){
             self.sortAndSetData("lblAccountNumber.text",self.view.segContractPortfolio,3,context.rowContext.sectionIndex)
           }},
           "lblAccountNumber":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER")},
           "lblAccountType":{"text":kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE")},
           "lblOwnershipType":{"text":"OWNERSHIP TYPE"},//kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE")},
           "fontIconAccTypeFilter":{"onClick": function(widget, context) {
                 this.setAccFilter(this.view.accTypeFilterMenu, 'fontIconAccTypeFilter', self.view.segContractPortfolio,context);
             }.bind(this)},
           "fontFilterOwnershipType":{"onClick": function(widget, context) {
                 this.setAccFilter(this.view.accTypeFilterMenu, 'fontFilterOwnershipType', self.view.segContractPortfolio,context);
             }.bind(this)},
           "lblFeatureHeaderSeperator":{"text":"-","isVisible":false},
           "lblFASeperator1":{"text":"-","isVisible":true},
         }
         rowData=[];
         var rowJSON={};
         for(var y=0;y<currPortAccounts.length;y++){
           rowJSON=({
             "template":"flxViewFeatureBody",
             "flxViewFeatureBody":{"isVisible":false},
             "lblAccountName":{"text":currPortAccounts[y].accountName},
             "lblAccountNumber":{"text":currPortAccounts[y].accountId},
             "lblAccountType":{"text":currPortAccounts[y].accountType},
             "lblOwnershipType":{"text":currPortAccounts[y].ownershipType},
             "lblView":{"text":"Edit","isVisible":false},
             "isRowVisible":false,
             "lblSeperator":"-",
           });
           rowData.push(rowJSON);
         }
         */
      //   this.sortBy = this.getObjectSorter("lblAccountName.text");
      // this.sortBy.inAscendingOrder = true;
      // rowData = rowData.sort(this.sortBy.sortData);
      //    segData.push([secData,rowData]);
      // }
      // for all accounts aswell
      var accSecData = {
        "template": "flxViewFeatures",
        "flxViewFeature": { "isVisible": true },
        "lblViewFeature": { "text": "FEATURES" },
        "flxFeatureDetails": { "left": "25px" },
        "flxArrow": { "isVisible": allAccounts.length === 0 ? false : true, "onClick": function (context) { self.togglePortfolioSection(context); } },
        "lblDownArrow": { "text": "\ue915" },
        "flxViewFeatureDetailsHeader": { "isVisible": true },
        "lblAccountTypeName": { "text": "All Accounts" },
        "lblAvailableActions": { "text": "Number of Accounts: " },
        "lblCountActions": { "text": self.getTwoDigitNumber(count) },
        "lblAccountNameHeader": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME") },
        "fontIconAccNameSort": { "text": "\ue92a", "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont" },
        "fontIconAccNumberSort": { "text": "\ue92a", "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont", "left": "4px" },
        "flxAccountName": {
          "onTouchStart": function (context) {
            self.sortAndSetDataFeature("lblAccountName.text", self.view.segContractPortfolio, 4, context.rowContext.sectionIndex)
          }
        },
        "flxAccountNumber": {
          "left": "30px", "onTouchStart": function (context) {
            self.sortAndSetDataFeature("lblAccountNumber.text", self.view.segContractPortfolio, 4, context.rowContext.sectionIndex)
          }
        },
        "lblAccountNumber": { "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT_NUMBER") },
        "lblAccountType": { "text": kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE") },
        "lblOwnershipType": { "text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.OwnershipType_UC") },
        /* "flxOwnershipType":{"isVisible":true},
        "fontIconAccTypeFilter":{"onClick": self.showFilterForFeatureAcc.bind(self,1, 1)},
         "fontFilterOwnershipType":{"onClick": self.showFilterForFeatureAcc.bind(self,2, 1)},
        //"fontIconAccTypeFilter":{ "isVisible":true,"onTouchStart":self.showAccountTypeFeatureFilter.bind(self,segmentPath)},      
        //"fontFilterOwnershipType": {"isVisible": true,"onTouchStart": self.showOwnershipFeatureFilter.bind(self, segmentPath) },
    "flxAccountType":{"isVisible":true},//,"onTouchStart":self.showAccountTypeFeatureFilter.bind(self,segmentPath)},*/
        "flxAccountType": { "onClick": self.showFilterByAcc.bind(self, 1, 1) },
        "fontIconAccTypeFilter": { "text": "\ue916" },
        "flxOwnershipType": { "onClick": self.showFilterByAcc.bind(self, 2, 1) },
        "fontFilterOwnershipType": { "text": "\ue916" },
        "lblFASeperator1": { "text": "-", "isVisible": true },
        "lblFeatureHeaderSeperator": { "text": "-", "isVisible": true },
      }
      var accRowData = [];
      var accRowJSON = {};
      for (var y = 0; y < allAccounts.length; y++) {
        if (allAccounts[y].isEnabled === true || allAccounts[y].isEnabled === "true") {
          accRowJSON = ({
            "template": "flxViewFeatureBody",
            "flxViewFeatureBody": { "isVisible": true },
            "lblAccountName": { "text": allAccounts[y].accountName },
            "lblAccountNumber": { "text": allAccounts[y].accountId || allAccounts[y].accountNumber, "left": "30px" },
            "lblAccountType": { "text": (allAccounts[y].accountType === undefined) ? "N/A" : allAccounts[y].accountType },
            "lblOwnershipType": { "text": allAccounts[y].ownerType },
            "features": allAccounts[y].features ? JSON.stringify(allAccounts[y].features) : JSON.stringify(allAccounts[y].featurePermissions),
            "isRowVisible": false,
            "lblView": {
              "text": "Edit", "isVisible": true, "onTouchStart": function (context) {
                self.editAccountLvlFeatures(context);
              }
            },
            "lblSeperator": "-",
          });
          accRowData.push(accRowJSON);
        }
      }
      this.sortBy = this.getObjectSorter("lblAccountNumber.text");
      this.sortBy.inAscendingOrder = true;
      accRowData = accRowData.sort(this.sortBy.sortData);
      accSecData.fontIconAccNumberSort = this.determineSortIconForSeg(this.sortBy, "lblAccountNumber.text");
      accSecData.fontIconAccNameSort = this.determineSortIconForSeg(this.sortBy, "lblAccountName.text");
      segData.push([accSecData, accRowData]);
      // self.setViewListFilterAccountTypeData(segData,segmentPath);
      // self.setViewListFilterOwnershipData(segData,segmentPath);
      self.view.segContractPortfolio.widgetDataMap = dataMap;
      self.view.segContractPortfolio.setData(segData);
      self.view.segContractPortfolio.info = { "secData": accSecData, "rowsData": accRowData };
      self.setFeaturesAccountsFilterDataContract([[accSecData, accRowData]], 1);
      //   segData[0][0].flxArrow.onClick({rowContext:{sectionIndex:0}});
      segmentPath.info.allData = { "sectionData": accSecData };
      segmentPath.info.allData.rowsData = accRowData;
      this.view.forceLayout();
    }
  },
  setViewListFilterAccountTypeData: function (segData, segPath) {
    var self = this;
    var roleList = [];
    var maxSizeText = "";
    var filterPath = "";
    var filterCompPath = "";
    if (segPath.id === "segContractPortfolio") {
      filterPath = this.view.flxAccountTypeDetailsFilter;
      filterCompPath = this.view.AccountTypeStatusFilterMenu;
    }
    for (var i = 0; i < segData[0][1].length; i++) {
      if (!roleList.contains(segData[0][1][i].lblAccountType.text)) roleList.push(segData[0][1][i].lblAccountType.text);
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
  setSegmentForNoResult: function (dataToMap) {
    var segRowData = [];
    segRowData.push({
      "template": "flxApprovalMatrixNoRangeRow",
      "flxApprovalEdit": {
        "isVisible": false
      },
      "lblIconAction": {
        "isVisible": false
      },
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
  showFilterByAcc: function (option, category, event, context) {
    this.selectedSectionIndexFilter = context.sectionIndex;
    var flxTypeFilterWid = this.view.flxAccountsFilter1;//: this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu;
    var flxOwnershipFilterWid = this.view.flxAccountsFilter2;//: this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc;
    var typeFilterIcon = "fontIconAccTypeFilter";
    var ownershipFilterIcon = "fontFilterOwnershipType";
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
  showAccountTypeFeatureFilter: function (segPath, event, context) {
    var filterPath;
    var adjustRight = 0;
    if (segPath.id === "segContractPortfolio") {
      filterPath = this.view.flxAccountTypeDetailsFilter;
    } if (filterPath.isVisible) {
      filterPath.setVisibility(false);
    } else {
      var width = context;
      var height = event.parent.frame.x + 45;
      var flxRight = height - - event.frame.x + adjustRight;
      // filterPath.top = "170dp";
      filterPath.right = (flxRight + 12) + "dp";
      filterPath.setVisibility(true);
    }
    this.view.forceLayout();
  },
  showOwnershipFeatureFilter: function (segPath, event, context) {
    var filterPath;
    var adjustRight = 0;
    if (segPath.id === "segContractPortfolio") {
      filterPath = this.view.flxFeatureDetailsFilter;
    } if (filterPath.isVisible) {
      filterPath.setVisibility(false);
    } else {
      var width = context;//.widgetInfo.frame.width-120;
      var height = event.parent.frame.x + 20;
      var flxRight = height - width - event.frame.x + adjustRight + 834;
      //filterPath.top = "170dp";
      filterPath.right = (flxRight + 12) + "dp";
      filterPath.setVisibility(true);
    }
    this.view.forceLayout();
  },

  setViewListFilterOwnershipData: function (segData, segPath) {
    var self = this;
    var roleList = [];
    var maxSizeText = "";
    var filterPath = "";
    var filterCompPath = "";
    if (segPath.id === "segContractPortfolio") {
      filterPath = this.view.flxFeatureDetailsFilter;
      filterCompPath = this.view.OwnershipStatusFilterMenu;
    }
    for (var i = 0; i < segData[0][1].length; i++) {
      if (!roleList.contains(segData[0][1][i].lblOwnershipType.text)) roleList.push(segData[0][1][i].lblOwnershipType.text);
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
  togglePortfolioSection: function (event, num) {
    if (num === 1) {
      var segData = this.view.segViewFeatureHeader.data;
    }
    else {
      var segData = this.view.segContractPortfolio.data;
    }
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections
    for (var i = 0; i < segData.length; i++) {
      segData[i][0].lblFASeperator1.isVisible = false;
      if (selectedSecInd !== i) {
        segData[i][0].flxViewFeatureDetailsHeader.isVisible = false;
        segData[i][0].lblFeatureHeaderSeperator.isVisible = false;
        segData[i][0].lblDownArrow.text = "\ue922";
        segData[i][0].lblDownArrow.skin = "sknfontIconDescRightArrow14px";
        segData[i][1] = this.showHideRowFlex(segData[i][1], false);
      }
    }

    //update selected section
    if (segData[selectedSecInd][1][0].isRowVisible === false) {
      segData[selectedSecInd][0].flxViewFeatureDetailsHeader.isVisible = true;
      segData[selectedSecInd][0].lblFeatureHeaderSeperator.isVisible = true;
      segData[selectedSecInd][0].lblDownArrow.text = "\ue915";
      segData[selectedSecInd][0].lblDownArrow.skin = "sknfontIconDescDownArrow12px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1], true);
      if (selectedSecInd < (segData.length - 1)) {
        segData[selectedSecInd + 1][0].lblFASeperator1.isVisible = true;
      }
    } else {
      segData[selectedSecInd][0].flxViewFeatureDetailsHeader.isVisible = false;
      segData[selectedSecInd][0].lblFeatureHeaderSeperator.isVisible = false;
      segData[selectedSecInd][0].lblDownArrow.text = "\ue922";
      segData[selectedSecInd][0].lblDownArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][1] = this.showHideRowFlex(segData[selectedSecInd][1], false);
      if (selectedSecInd < (segData.length - 1)) {
        segData[selectedSecInd + 1][0].lblFASeperator1.isVisible = false;
      }
    }
    if (num === 1) {
      this.view.segViewFeatureHeader.setData(segData);
    }
    else {
      this.view.segContractPortfolio.setData(segData);
    }
    this.view.forceLayout();
  },
  editAccountLvlFeatures: function (context) {
    var rowIndex = context.rowContext.rowIndex;
    var secIndex = context.rowContext.sectionIndex;
    var segData = this.view.segContractPortfolio.data;
    var featuresList = JSON.parse(segData[secIndex][1][rowIndex].features);
    var accId = segData[secIndex][1][rowIndex].lblAccountNumber.text;
    this.view.lblCountFeatures.text = segData[secIndex][1][rowIndex].lblAccountName.text + "(" + accId + ")";
    this.setAddFeaturesSegData(featuresList, accId);
    this.searchFeatureOnEdit = featuresList;
    this.accIdForByFeatures = accId;
    this.view.accountTypeFilter = "selectFeature";
    this.view.flxContractFeaturesToggleButtons.setVisibility(false);
    this.view.flxContractAccountFAList.setVisibility(false);
    this.view.flxContractsFATopSection.top = "40px";
    this.view.flxAddProductFeaturesBack.setVisibility(true);
    this.view.btnUpdateInBulkFA.setVisibility(false);
    this.view.flxAddProductFeatures.setVisibility(true);
    this.view.flxNoCustomerSelectedFA.setVisibility(false);
    this.view.flxNoFeatures.setVisibility(false);
    this.view.tbxContractFASearch.text = "";
    this.view.flxNoFeatures.setVisibility(false);
    this.view.tbxContractFASearch.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.forceLayout();
  },
  editAccountLvlFeaturesBack: function (toCheck) {
    this.view.flxContractFeaturesToggleButtons.setVisibility(true);
    this.view.flxContractAccountFAList.setVisibility(true);
    this.view.flxContractsFATopSection.top = "0px";
    this.view.flxAddProductFeaturesBack.setVisibility(false);
    this.view.btnUpdateInBulkFA.setVisibility(true);
    this.view.tbxContractFASearch.text = "";
    this.view.flxAddProductFeatures.setVisibility(false);
    this.toggleContractFeaturesAccountLevel(toCheck);
    this.view.forceLayout();
  },
  editCustomerLvlFeaturesBack: function () {
    this.view.tbxContractFASearch.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByFeatureActionName");
    this.view.flxContractFeaturesToggleButtons.setVisibility(true);
    this.view.flxContractFAList.setVisibility(true);
    this.view.flxContractsFATopSection.top = "0px";
    this.view.flxAddProductFeaturesBack.setVisibility(false);
    this.view.btnUpdateInBulkFA.setVisibility(true);
    this.view.flxAddProductFeatures.setVisibility(false);
    this.view.tbxContractFASearch.text = "";
    this.view.forceLayout();
  },
  /*PRODUCT FEATURES: data initialization*/
  /*   initializeProductFeaturesData : function(features){
      var productFeaturesData=new Map();
      for(var i=0; i<features.length; i++){
        features[i]["isSelected"] =features[i]["isSelected"]?features[i]["isSelected"]:"true";
        var featureObj = {"featureDetails":features[i], "actions":JSON.stringify(features[i].actions)};
        productFeaturesData.set(features[i].featureId||features[i].id,featureObj);
      }
      this.productFeaturesData=JSON.stringify(Array.from(productFeaturesData));
    },*/
  /* PRODUCT FEATURES: set data to add product features */
  setAddFeaturesSegData: function (features, accId) {
    var self = this;
    var selFeatureCount = 0, segDataJson = {};
    // this.initializeProductFeaturesData(features);
    if (features.length == 0) {
      this.view.flxSegAddFeaturesCont.setVisibility(false);
      this.view.flxNoFeatures.setVisibility(true);
      this.view.flxSelectAllFeatures.setVisibility(false);
      this.view.lblselectAllFeatures.setVisibility(false);
    } else {
      var segData = features.map(function (featureObj) {
        var rowsData = [], selRowCount = 0;
        var actions = featureObj.actions || featureObj.permissions || [];
        for (var i = 0; i < actions.length; i++) {
          var rowObj = {
            "id": actions[i].actionId || actions[i].id,
            "actionDetailsObj": actions[i],
            "flxContractEnrollFeaturesEditRow": {
              "isVisible": false,
              "skin": "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"
            },
            "lblFeatureName": { "text": actions[i].actionName || actions[i].name },
            "flxCheckbox": { "onClick": self.onClickAddFeaturesCheckbox.bind(self, self.view.segAddProductFeatures) },
            "lblCheckbox": { "isVisible": true, "text": (actions[i].isEnabled === true || actions[i].isEnabled === "true") ? self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl,
                             "skin":"sknBgB7B7B7Sz20pxCheckbox" },
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
          "lblIconToggleArrow": {
            "text": "\ue922",
            "skin": "sknIcon00000015px"
          },
          "flxHeadingCheckbox": {
            "isVisible": true,
            "onClick": self.onClickAddFeaturesCheckbox.bind(self, self.view.segAddProductFeatures)
          },
          "lblTopCheckbox": { "isVisible": true, "text": self.getHeaderCheckboxImage(rowsData, true, true) },
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
        //selFeatureCount = (secData.imgTopCheckbox.src === self.AdminConsoleCommonUtils.checkboxnormal) ?
        //selFeatureCount : (selFeatureCount+1);
        secData.lblTopCheckbox.skin = self.applyCheckboxSkin(secData.lblTopCheckbox);
        segDataJson[feature.featureId || feature.id] = { "secData": secData, "rowData": rowsData };
        return [secData, rowsData];
      });
      // this.view.lblCountFeatures.text = accId+"";;
      this.view.segAddProductFeatures.widgetDataMap = this.getAddFeaturesSegWidgetMap();
      this.view.segAddProductFeatures.setData(segData);
      this.view.segAddProductFeatures.info = { "segDataJson": segDataJson, "accId": accId };
      this.view.lblselectAllFeatures.setVisibility(true);
      this.view.lblselectAllFeatures.text = (selFeatureCount === segData.length) ? kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") : kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures")
    }
    this.view.forceLayout();
  },
  getAddFeaturesSegWidgetMap: function () {
    var widgetMap = {
      //section template
      "flxEnrollSelectedAccountsSec": "flxEnrollSelectedAccountsSec",
      "flxAccountSectionCont": "flxAccountSectionCont",
      "flxLeftDetailsCont": "flxLeftDetailsCont",
      "lblFeatureName": "lblFeatureName",
      "flxToggleArrow": "flxToggleArrow",
      "lblIconToggleArrow": "lblIconToggleArrow",
      "flxHeadingCheckbox": "flxHeadingCheckbox",
      "lblTopCheckbox": "lblTopCheckbox",
      "flxRow2": "flxRow2",
      "lblAvailableActions": "lblAvailableActions",
      "lblCountActions": "lblCountActions",
      "lblTotalActions": "lblTotalActions",
      "lblSectionLine": "lblSectionLine",
      "lblStatusValue": "lblStatusValue",
      "lblIconStatus": "lblIconStatus",
      "flxHeaderContainer": "flxHeaderContainer",
      "flxActionsHeaderContainer": "flxActionsHeaderContainer",
      "flxCheckbox": "flxCheckbox",
      "flxActionNameHeading": "flxActionNameHeading",
      "flxActionCheckbox": "flxActionCheckbox",
      "lblActionName": "lblActionName",
      "flxActionStatusHeading": "flxActionStatusHeading",
      "lblActionStatus": "lblActionStatus",
      "lblActionSeperator": "lblActionSeperator",
      //row template
      "flxFeatureNameCont": "flxFeatureNameCont",
      "lblCheckbox": "lblCheckbox",
      "flxStatus": "flxStatus",
      "lblStatus": "lblStatus",
      "flxContractEnrollFeaturesEditRow": "flxContractEnrollFeaturesEditRow",
      "id": "id",
      "featureDetailsObj": "featureDetailsObj",
      "actionDetailsObj": "actionDetailsObj"
    };
    return widgetMap;
  },
  /* expand/collapse the feature card in add product features screen*/
  toggleSelectFeatureArrow: function (segmentPath, context) {
    var selSecInd = context.rowContext.sectionIndex;
    var selRowInd = context.rowContext.rowIndex;
    var segData = segmentPath.data;
    var segCategory = segmentPath.id === "segAddProductFeatures" ? 1 : 2;
    for (var i = 0; i < segData.length; i++) {
      if (selSecInd !== i) {
        segData[i][0] = this.getCollapsedSectionProperties(segData[i][0], segCategory);
        segData[i][1] = this.showHideProdSegRowFlex(segData[i][1], false);
      }
    }
    if ((segData[selSecInd][0].lblIconToggleArrow && segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px") ||
      (segData[selSecInd][0].lblArrow && segData[selSecInd][0].lblArrow.skin === "sknfontIconDescRightArrow14px")) {
      segData[selSecInd][0] = this.getExpandedSectionProperties(segData[selSecInd][0], segCategory);
      segData[selSecInd][1] = this.showHideProdSegRowFlex(segData[selSecInd][1], true);
    } else {
      segData[selSecInd][0] = this.getCollapsedSectionProperties(segData[selSecInd][0], segCategory);
      segData[selSecInd][1] = this.showHideProdSegRowFlex(segData[selSecInd][1], false);
    }
    segmentPath.setData(segData);
  },
  /* set collapsed section properties */
  getCollapsedSectionProperties: function (sectionData, segCategory) {
    if (segCategory === 1) { //add product features
      sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
      sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
      sectionData.flxActionsHeaderContainer.isVisible = false;
      sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    } else if (segCategory === 2) { //view features popup
      sectionData.flxViewActionHeader.isVisible = false;
      sectionData.lblFASeperator1.isVisible = false;
      sectionData.lblArrow.text = "\ue922";
      sectionData.lblArrow.skin = "sknfontIconDescRightArrow14px";
      sectionData.flxHeader.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    }
    return sectionData;
  },
  /* set expanded section properties */
  getExpandedSectionProperties: function (sectionData, segCategory) {
    if (segCategory === 1) { //add product features
      sectionData.lblIconToggleArrow.text = "\ue915"; //down-arrow
      sectionData.lblIconToggleArrow.skin = "sknIcon00000014px";
      sectionData.flxActionsHeaderContainer.isVisible = true;
      sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
    } else if (segCategory === 2) { //view features popup
      sectionData.flxViewActionHeader.isVisible = true;
      sectionData.lblFASeperator1.isVisible = true;
      sectionData.lblArrow.text = "\ue915";
      sectionData.lblArrow.skin = "sknfontIconDescDownArrow12px";
      sectionData.flxHeader.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";
    }
    return sectionData;
  },
  /* show/hide rows under a section */
  showHideProdSegRowFlex: function (rowsData, visibility) {
    for (var i = 0; i < rowsData.length; i++) {
      if (rowsData[i].flxContractEnrollFeaturesEditRow) { //Add product features
        rowsData[i].isRowVisible = visibility;
        rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
        if (visibility === true && (i === rowsData.length - 1)) {
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
          rowsData[i].flxFeatureNameCont.bottom = "15dp";
        } else {
          rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
          rowsData[i].flxFeatureNameCont.bottom = "0dp";
        }
      } else if (rowsData[i].flxContractsFABodyView) { //features details popup
        rowsData[i].isRowVisible = visibility;
        rowsData[i].flxContractsFABodyView.isVisible = visibility;
        if (visibility === true && (i === rowsData.length - 1)) {
          rowsData[i].flxContractsFABodyView.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
        } else {
          rowsData[i].flxContractsFABodyView.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight";
        }
      }
    }
    return rowsData;
  },
  /* PRODUCT FEATURES: check/uncheck feature/actions section in add product features */
  onClickAddFeaturesCheckbox: function (segmentPath, eventObj) {
    var selSecInd = eventObj.rowContext.sectionIndex;
    var selRowInd = eventObj.rowContext.rowIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0, selFeaturesCount = 0;
    //var allFeaturesMap = new Map(JSON.parse(this.productFeaturesData));
    //var featureToUpdate = allFeaturesMap.get(segSecData.id);
    //var actionsToUpdate = JSON.parse(featureToUpdate.actions);
    var dependentActions = [];
    //on row selections
    if (selRowInd >= 0) {
      rowsData[selRowInd].lblCheckbox.text = (rowsData[selRowInd].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
        rowsData[selRowInd].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[selRowInd].lblCheckbox);
        if (rowsData[selRowInd].dependentActions && rowsData[selRowInd].dependentActions.length > 0) {
        dependentActions = rowsData[selRowInd].dependentActions;
        for (let x = 0; x < dependentActions.length; x++) {
          for (let y = 0; y < rowsData.length; y++) {
            if (rowsData[y].id === dependentActions[x].id) {
              rowsData[y].lblCheckbox.text = rowsData[selRowInd].lblCheckbox.text;
              rowsData[y].lblCheckbox.skin = rowsData[selRowInd].lblCheckbox.skin;
            }
          }
        }
      }

      segSecData.lblTopCheckbox.text = this.getHeaderCheckboxImage(rowsData, true, true);
      segSecData.lblTopCheckbox.skin = this.applyCheckboxSkin(segSecData.lblTopCheckbox);
    } //on section selections
    else {
      var sectionImg = (segSecData.lblTopCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl) ?
        this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;
      segSecData.lblTopCheckbox.text = sectionImg;
      segSecData.lblTopCheckbox.skin = this.applyCheckboxSkin(segSecData.lblTopCheckbox);
      segSecData.lblTopCheckbox.skin = this.applyCheckboxSkin(segSecData.lblTopCheckbox);
      // featureToUpdate.featureDetails.isSelected = sectionImg===this.AdminConsoleCommonUtils.checkboxnormal?"false":"true";
      for (var i = 0; i < rowsData.length; i++) {
        rowsData[i].lblCheckbox.text = sectionImg;
        rowsData[i].lblCheckbox.skin = this.applyCheckboxSkin(rowsData[i].lblCheckbox);
      }
    }
    selectedRowsCount = this.getSelectedFeatureActionCount(rowsData, "lblCheckbox", false);
    segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
    segmentPath.setSectionAt([segSecData, rowsData], selSecInd);
    this.view.segAddProductFeatures.info.segDataJson[segSecData.id] = { "secData": segSecData, "rowData": rowsData }
    var selFeaturesCount = this.getSelectedFeatureActionCount(segmentPath.data, "lblTopCheckbox", true);
    this.view.lblselectAllFeatures.text = (parseInt(selFeaturesCount) === segData.length) ? kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") : kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
    //this.view.lblCountFeatures.text = this.getTwoDigitNumber(selFeaturesCount);
  },
  /* PRODUCT FEATURES: select all the feature shown in list in add product features */
  selectAllFeatures: function () {
    var segData = this.view.segAddProductFeatures.data;
    var actualSegData = this.view.segAddProductFeatures.info.segDataJson;
    var isSelectAll = this.view.lblselectAllFeatures.text === kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") ? false : true;

    for (var i = 0; i < segData.length; i++) {
      segData[i][0].lblTopCheckbox.text = isSelectAll ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;//CommonUtilities.AdminConsoleCommonUtils.checkboxSelected:CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
      segData[i][0].lblTopCheckbox.skin = this.applyCheckboxSkin(segData[i][0].lblTopCheckbox);
      var actionRows = segData[i][1];
      segData[i][0].lblCountActions.text = this.getTwoDigitNumber(actionRows.length);
      var actualFeatureObj = actualSegData[segData[i][0].id];
      actualFeatureObj.secData = segData[i][0];
      var actualActions = actualFeatureObj.rowData;
      for (var j = 0; j < actionRows.length; j++) {
        actionRows[j].lblCheckbox.text = isSelectAll ? this.AdminConsoleCommonUtils.checkboxSelectedlbl : this.AdminConsoleCommonUtils.checkboxnormallbl;//CommonUtilities.AdminConsoleCommonUtils.checkboxSelected:CommonUtilities.AdminConsoleCommonUtils.checkboxnormal;
        actionRows[j].lblCheckbox.skin = this.applyCheckboxSkin(actionRows[j].lblCheckbox);
        for (var k = 0; k < actualActions.length; k++) {
          if (actionRows[j].id === actualActions[k].id)
            actualActions[k] = Object.assign({}, actionRows[j]);
        }
      }
      this.view.segAddProductFeatures.setSectionAt(segData[i], i);
    }
    this.view.lblselectAllFeatures.text = isSelectAll ? kony.i18n.getLocalizedString("i18n.products.RemoveAllFeatures") : kony.i18n.getLocalizedString("i18n.products.SelectAllFeatures");
    //this.view.lblCountFeatures.text = this.getTwoDigitNumber(isSelectAll?segData.length:0);
  },
  /* PRODUCT FEATURES: updates the productFeatures map with selections */
  updateFeatureActionsAdded: function (segmentPath, eventObj) {
    var featuresList = [];
    var selectedCustId = this.view.customersDropdownFA.lblSelectedValue.info ? this.view.customersDropdownFA.lblSelectedValue.info.id : this.view.customersDropdownFA.segList.data[0].id;
    var globalFeaturesList = [];
    var segData = this.view.segAddProductFeatures.data;
    var accId = this.view.segAddProductFeatures.info.accId;
    for (var m = 0; m < segData.length; m++) {
      segData[m][0].featureDetailsObj.isEnabled = segData[m][0].lblTopCheckbox.text === this.AdminConsoleCommonUtils.checkboxnormallbl ?
        "false" : "true";
      var actions = segData[m][0].featureDetailsObj.actions || segData[m][0].featureDetailsObj.permissions;
      var segRowsData = segData[m][1];
      for (var i = 0; i < actions.length; i++) {
        for (var j = 0; j < segRowsData.length; j++) {
          if (actions[i].actionId === segRowsData[j].id || actions[i].id === segRowsData[j].id) {
            if (segRowsData[i].lblCheckbox.text === this.AdminConsoleCommonUtils.checkboxSelectedlbl) {
              actions[i].isEnabled = "true";
            } else {
              actions[i].isEnabled = "false";
            }
          }
        }
      }
      if (segData[m][0].featureDetailsObj.actions) {
        segData[m][0].featureDetailsObj.actions = actions;
      } else if (segData[m][0].featureDetailsObj.permissions) {
        segData[m][0].featureDetailsObj.permissions = actions;
      }
      featuresList.push(segData[m][0].featureDetailsObj);
    }
    var toSegData = this.view.segContractPortfolio.data[0][1];
    for (var i = 0; i < toSegData.length; i++) {
      if (accId == toSegData[i].lblAccountNumber.text) {
        this.view.segContractPortfolio.data[0][1][i].features = JSON.stringify(featuresList);
        this.view.segContractPortfolio.setDataAt(this.view.segContractPortfolio.data[0][1][i], i, 0);
        break;
      }
    }
    for (let x = 0; x < this.createContractRequestParam.accountLevelPermissions.length; x++) {
      if (this.createContractRequestParam.accountLevelPermissions[x].coreCustomerId === selectedCustId) {
        for (let y = 0; y < this.createContractRequestParam.accountLevelPermissions[x].accounts.length; y++) {
          if (this.createContractRequestParam.accountLevelPermissions[x].accounts[y].accountNumber === accId ||
            this.createContractRequestParam.accountLevelPermissions[x].accounts[y].accountId === accId) {
            this.createContractRequestParam.accountLevelPermissions[x].accounts[y].features = featuresList;
            break;
          }
        }
        break;
      }
    }
  },
  /* get the selected features/actions count in add product features*/
  getSelectedFeatureActionCount: function (segData, imgCheckboxId, isSection) {
    var selectedCount = 0;
    for (var i = 0; i < segData.length; i++) {
      var data = (isSection === true) ? segData[i][0] : segData[i];
      if (data[imgCheckboxId].text === this.AdminConsoleCommonUtils.checkboxSelectedlbl ||
        data[imgCheckboxId].text === this.AdminConsoleCommonUtils.checkboxPartiallbl)
        selectedCount = selectedCount + 1;
    }
    return (selectedCount + "");
  },
  showBulkUpdateFAScreen: function () {
    this.view.flxCustomerDropdownBulk.setVisibility(false);
    this.view.flxAddProductFeaturesBack.setVisibility(true);
    this.view.flxContractsFATopSection.setVisibility(false);
    this.view.flxFABulkUpdateScreen.setVisibility(true);
    this.view.flxBulkUpdateListContainer.setVisibility(false);
    this.view.flxBulkFANoSelectedCustomer.setVisibility(true);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info = {
      "selectedCust": [], "secData": {}, "rowsData": []
    };
    if (this.view.flxContractFAList.isVisible) {
      this.view.btnUpdateInBulkFA.info = "CUSTLVL";
      this.view.flxContractFAList.setVisibility(false);
      this.view.lblNothingSelected.setVisibility(true);
      this.view.flxTagsContainer.setVisibility(false);
      this.view.flxTagsContainer.removeAll();
      this.view.flxMoreTagsContFA.removeAll();
      this.view.lblSelectedHeading.text = "Selected Customers(00)";
      this.view.btnModifySearch.text = "Select Customers";
      this.view.lblTitle.text = "Update Permissions for selected customers";
      this.view.lblNoCustomersSelectedBulkFA.text = "Select Customer to perform bulk actions";
    } else {
      this.view.flxCustomerDropdownBulk.setVisibility(true);
      this.view.customerDropdownBulk.lblSelectedValue.text = this.view.customersDropdownFA.lblSelectedValue.text;
      this.view.customerDropdownBulk.btnPrimary.setVisibility(this.view.customersDropdownFA.btnPrimary.isVisible);
      this.view.customerDropdownBulk.lblSelectedValue.info = this.view.customersDropdownFA.lblSelectedValue.info;
      this.view.customerDropdownBulk.setEnabled(false);
      this.view.customerDropdownBulk.flxSelectedText.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      //this.setCustomersDropDownList("customerDropdownBulk");
      this.view.lblSeperatorFA.setVisibility(false);
      this.view.flxSeperator1.top = "20px";
      this.view.btnUpdateInBulkFA.info = "ACCLVL";
      this.view.lblSelectedHeading.text = "Selected Accounts(00)";
      this.view.flxContractAccountFAList.setVisibility(false);
      this.view.lblNothingSelected.setVisibility(true);
      this.view.flxTagsContainer.setVisibility(false);
      this.view.flxTagsContainer.removeAll();
      this.view.flxMoreTagsContFA.removeAll();
      this.view.btnModifySearch.text = "Select Accounts";
      this.view.lblTitle.text = "Update Permissions for selected accounts";
      this.view.lblNoCustomersSelectedBulkFA.text = "Select Accounts to perform bulk actions";
      var selectedCustId = this.view.customersDropdownFA.lblSelectedValue.info.id;
      this.setDataToBulkAccounts(selectedCustId);
    }
  },
  setDataToBulkAccounts: function (selectedCustId) {
    var accounts;
    accounts = this.createContractRequestParam.accountLevelPermissions;
    for (var i = 0; i < accounts.length; i++) {
      if (selectedCustId === this.createContractRequestParam.accountLevelPermissions[i].coreCustomerId) {
        this.accountsBulkUpdate = this.createContractRequestParam.accountLevelPermissions[i].accounts;
      }
    }
  },
  setBulkUpdateAccountsList: function () {
    var accounts = this.accountsBulkUpdate;
    var self = this;
    var rowsData = [];
    var dataMap = {
      "flxContractEnrollAccountsEditSection": "flxContractEnrollAccountsEditSection",
      "flxAccountNumCont": "flxAccountNumCont",
      "flxCheckbox": "flxCheckbox",
      "lblSectionCheckbox": "lblSectionCheckbox",
      "lblAccountNumber": "lblAccountNumber",
      "lblIconSortAccName": "lblIconSortAccName",
      "flxHeaderContainer": "flxHeaderContainer",
      "flxAccountType": "flxAccountType",
      "lblAccountType": "lblAccountType",
      "lblIconFilterAccType": "lblIconFilterAccType",
      "flxAccountName": "flxAccountName",
      "lblAccountName": "lblAccountName",
      "lblIconAccNameSort": "lblIconAccNameSort",
      "flxAccountHolder": "flxAccountHolder",
      "lblAccountHolder": "lblAccountHolder",
      "lblIconFilterOwnershipType": "lblIconFilterOwnershipType",
      "lblSeperator": "lblSeperator",
      "lblIconAccNumbSort": "lblIconAccNumbSort",
      "flxHeaderContainer": "flxHeaderContainer",
      "flxAccountCheckBox": "flxAccountCheckBox",
      "flxCheckBoxAccount": "flxCheckBoxAccount",
      "lblCheckbox": "lblCheckbox",
      "flxAccountNumber": "flxAccountNumber",
      "lblCustomerName": "lblCustomerName",
      "lblAccNumberSort": "lblAccNumberSort",
      "custInfo": "custInfo"
    };
    var secData = {
      "template": "flxContractEnrollAccountsEditSection",
      "flxAccountNumber": {
        "isVisible": true
      },
      "flxAccountCheckBox": {
        "isVisible": true
      },
      "flxCheckbox": {
        "isVisible": false
      },

      "flxCheckBoxAccount": {
        "onClick": function () {
          self.toggleBulkCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave);
        }, "isVisible": true
      },
      "lblCustomerName": { "text": "ACCOUNT NUMBER", "isVisible": true },
      "flxAccountNumCont": {
        "isVisible": false
      },
      "lblIconAccNameSort": {
        "isVisible": true,
        "text": "\ue92a",
        "skin": "sknIcon12pxBlack", "hoverSkin": "sknIcon12pxBlackHover",
      },
      "lblIconFilterAccType": {
        "isVisible": true
      },
      "flxAccountName": {
        "onTouchStart": function (context) {
          self.sortAndSetDataFeature("lblAccountName.text", self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 5, context.rowContext.sectionIndex)
        }
      },
      "flxAccountNumber": {
        "onTouchStart": function (context) {
          self.sortAndSetDataFeature("lblCustomerName.text", self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, 5, context.rowContext.sectionIndex)
        }
      },
      "flxAccountType": {
        "isVisible": true,
        "onClick": self.showFilterForFeatureAcc.bind(this, 1, 2)
      },
      "lblIconSortAccName": {
        "isVisible": false
      },
      "flxHeaderContainer": {
        "isVisible": true
      },
      "flxAccountHolder": {
        "isVisible": true,
        "onClick": self.showFilterForFeatureAcc.bind(this, 2, 2)
      },
      "lblIconFilterOwnershipType": {
        "text": "\ue916", "isVisible": true
      },
      "lblAccNumberSort": {
        "isVisibile": true, "text": "\ue92b",
        "skin": "sknIcon15px", "hoverSkin": "sknlblCursorFont",
        "left": "5px"
      },
      "lblIconAccNumbSort": {
        "isVisible": true
      },
      "lblCheckbox": { 
        "isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxnormallbl,
        "skin": "sknBgB7B7B7Sz20pxCheckbox" 
      },
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
      "flxHeaderContainer": { "isVisible": true },
      "lblSeperator": {
        "skin": "sknLblSeparator696C73",
        "isVisible": true
      }
    }
    var selRowIds = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
    var totalRowsCount = 0;
    for (var x = 0; x < accounts.length; x++) {
      if (accounts[x].isEnabled === true || accounts[x].isEnabled === "true") {
        totalRowsCount = totalRowsCount + 1;
        var checkBoxText = {"text":selRowIds.includes(accounts[x].accountId) ?self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl};
        rowsData.push({
          "template": "flxContractEnrollAccountsEditSection",

          "flxCheckBoxAccount": {
            "isVisible": true,
            "onClick": function () {
              self.toggleAccountsCheckbox(self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList, self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, "coreCustomerId");
            }
          }, "flxAccountNumCont": {
            "isVisible": false
          }, "flxAccountCheckBox": {
            "isVisible": true
          },
          "flxAccountNumber": {
            "isVisible": true
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
            "isVisible": true, "text": accounts[x].accountId, "skin": "sknLbl485C75LatoRegular13Px"
          },
          "lblAccountType": {
            "text": (accounts[x].accountType === undefined) ? "N/A" : accounts[x].accountType, "skin": "sknLbl485C75LatoRegular13Px"
          },
          "lblAccountName": {
            "text": accounts[x].accountName, "skin": "sknLbl485C75LatoRegular13Px"
          },
          "lblAccountHolder": {
            "text": accounts[x].ownerType, "skin": "sknLbl485C75LatoRegular13Px"
          },
          "lblSeperator": {
            "skin": "sknLblSeparatore7e7e7",
            "isVisible": true
          },
          "custInfo": accounts[x]
        });
      }
    }
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.rowTemplate = "flxContractEnrollAccountsEditSection";
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.widgetDataMap = dataMap;
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([
      [secData, rowsData]
    ]);
    secData.lblCheckbox.text = totalRowsCount === selRowIds.length ? this.AdminConsoleCommonUtils.checkboxSelectedlbl :
          selRowIds.length === 0 ?  this.AdminConsoleCommonUtils.checkboxnormallbl :  this.AdminConsoleCommonUtils.checkboxPartiallbl;
    secData.lblCheckbox.skin = this.applyCheckboxSkin(secData.lblCheckbox);
    this.sortBy = this.getObjectSorter("lblCustomerName.text");
    this.sortBy.inAscendingOrder = true;
    secData.lblAccNumberSort = this.determineSortIconForSeg(this.sortBy, "lblCustomerName.text");
    secData.lblIconAccNameSort = this.determineSortIconForSeg(this.sortBy, "lblAccountName.text");
    rowsData = rowsData.sort(this.sortBy.sortData);
    this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info = {
      "selectedCust": selRowIds, "secData": secData, "rowsData": rowsData
    };
    this.AdminConsoleCommonUtils.setEnableDisableSkinForButton(self.view.bulkUpdateFeaturesLimitsPopup.commonButtonsScreen1.btnSave, true, selRowIds.length > 0);
    this.setFeaturesAccountsFilterDataContract([[secData, rowsData]], 2);
    this.totalAccountsViewFeature = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.data[0][1].length;
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
      // this.view.lblCountUsers.text = this.getTwoDigitNumber(selCount + 1);
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
  /*
  function to check conditions after delete
 */
  toCheckDeleteTagConditions: function () {
    var toCheck = this.view.btnUpdateInBulkFA.info;
    var noOfCustomers = this.view.flxTagsContainer.info.added.length;
    var noOfCustAccounts = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust ?
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length : "0";
    if (this.view.flxContractFA.isVisible && toCheck == "CUSTLVL") {
      this.view.lblNothingSelected.setVisibility(false);
      this.view.lblSelectedHeading.text = "Selected Customers(" + this.getTwoDigitNumber(noOfCustAccounts) + ")";
    }
    else if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      this.view.lblNothingSelected.setVisibility(false);
      this.view.lblSelectedHeading.text = "Selected Accounts(" + this.getTwoDigitNumber(noOfCustAccounts) + ")";
    }
    if (this.view.flxTagsContainer.info.added.length === 0) {

      if (this.view.flxContractFA.isVisible && toCheck == "CUSTLVL") {
        this.view.lblSelectedHeading.text = "Selected Customers(00)";
        this.view.flxTagsContainer.setVisibility(false);
        this.view.lblNothingSelected.setVisibility(true);
        this.view.btnModifySearch.text = "Select Customers";
        this.view.flxTagsContainer.info = { "added": [] };
      }
      else if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
        this.view.lblSelectedHeading.text = "Selected Accounts(00)";
        this.view.flxTagsContainer.setVisibility(false);
        this.view.lblNothingSelected.setVisibility(true);
        this.view.btnModifySearch.text = "Select Accounts";
        this.view.flxTagsContainer.info = { "added": [], "accIds": {} };
      }
    }
    this.view.forceLayout();
  },
  /*
  * CONTRACT BULK UPDATE : reset features selection on click of enable/disable
  */
  resetFeatureSelection: function (featureRowRef, imgContext) {
    var currFeatureRowId = featureRowRef.id;
    this.bulkUpdateListboxData = this.getListForListBoxContracts(this.bulkUpdateAllFeaturesList);
    var flxChildren = this.view.flxAddNewRowListCont.widgets();
    for (var i = 0; i < flxChildren.length; i++) {
      if (flxChildren[i].id === featureRowRef.id) {
        this.view.flxAddNewRowListCont.remove(this.view[flxChildren[i].id]);
        break;
      }
    }
    this.setNewFeatureLimitRowData(featureRowRef, 1, "contract");
    featureRowRef.customRadioButtonGroupCont.radioButtonOnClick(imgContext);
    this.view.forceLayout();
  },
  /*
 * FEATURE BULK UPDATE: get selected feature status value
 */
  getSelectedStatusType: function (featureRowRef) {
    var radBtn = featureRowRef.customRadioButtonGroupCont.imgRadioButton1.src;
    var radBtn1 = featureRowRef.customRadioButtonGroupCont.imgRadioButton2.src;
    var radBtn2 = featureRowRef.customRadioButtonGroupCont.imgRadioButton3.src;
    if (this.view.flxContractFA.isVisible) {
      if (radBtn === "radio_selected.png")
        return "enable";
      else
        return "disable";
    }
  },
  /*
 * FEATURE BULK UPDATE: update selected features at customer level in createreqparam
 **/
  updateBulkCustFeaturesReqParam: function (bulkUpdateList, selCustIdArr) {
    for (let k = 0; k < this.createContractRequestParam.contractCustomers.length; k++) {
      var custId = selCustIdArr.includes(this.createContractRequestParam.contractCustomers[k].coreCustomerId) ? this.createContractRequestParam.contractCustomers[k].coreCustomerId : null;
      for (var i = 0; i < bulkUpdateList.length; i++) {
        var actions = bulkUpdateList[i].actionIds;
        for (var a = 0; a < this.createContractRequestParam.contractCustomers[k].features.length; a++) {
          if (this.createContractRequestParam.contractCustomers[k].features[a].featureId === bulkUpdateList[i].featureId) {
            for (var l = 0; l < this.createContractRequestParam.contractCustomers[k].features[a].actions.length; l++) {
              if (actions.includes(this.createContractRequestParam.contractCustomers[k].features[a].actions[l].actionId)) {
                this.createContractRequestParam.contractCustomers[k].features[a].actions[l].isEnabled = bulkUpdateList[i].isEnable;
                this.updateAllAccountLvlActions(this.createContractRequestParam.contractCustomers[k].features[a].actions[l].actionId, custId, bulkUpdateList[i].isEnable, null);
              }
            }
          }
        }
      }
      var dropdownSelCust = this.view.customersDropdownFA.lblSelectedValue.info.id;
      if (dropdownSelCust === this.createContractRequestParam.contractCustomers[k].coreCustomerId) {
        this.setFeaturesAtCustomerLevel(this.view.ContractFAList.segAccountFeatures, this.createContractRequestParam.contractCustomers[k].features);
      }
    }
  },
  /*
  * FEATURE BULK UPDATE: update selected features at account level in createreqparam
  **/
  updateBulkAccFeaturesReqParam: function (bulkUpdateList, selAccArr) {
    var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
    for (var i = 0; i < bulkUpdateList.length; i++) {
      var actions = bulkUpdateList[i].actionIds;
      for (var j = 0; j < actions.length; j++) {
        //first update selection for actionAccJson var, account level
        this.updateAllAccountLvlActions(actions[j], custId, bulkUpdateList[i].isEnable, selAccArr);

      }
    }
    this.setContractAccountLvlFeatures(true);
  },

  getFeaturesBasedOnId: function (featuresList, prodId) {
    var features = [];
    for (var a = 0; a < featuresList.length; a++) {
      if (featuresList[a].productId === prodId) {
        features = this.setAllFeatures(featuresList[a].productFeatures);
        return features;
      }
    }
    return [];
  },

  updateAllAccountLvlActions: function (actionId, custId, isEnable, selAccArr) {
    var self = this;
    var isAllAccUpdate = selAccArr ? false : true;
    for (let x = 0; x < this.createContractRequestParam.accountLevelPermissions.length; x++) {
      if (custId === this.createContractRequestParam.accountLevelPermissions[x].coreCustomerId) {
        var accLevelfeatures = JSON.parse(JSON.stringify(this.createContractRequestParam.accountLevelPermissions[x].accounts));
        for (let y = 0; y < accLevelfeatures.length; y++) {
          var accSelCheck;
          if (isAllAccUpdate) { //for updating all selected account's actions
            accSelCheck = accLevelfeatures[y].isEnabled === "true" || accLevelfeatures[y].isEnabled === true;
          } else { //for updating given account's actions
            accSelCheck = selAccArr.includes(accLevelfeatures[y].accountId) ? true : false;
          }
          if (accSelCheck) {
            if (accLevelfeatures[y].features === undefined) {
              for (var j = 0; j < accLevelfeatures[y].featurePermissions.length; j++) {
                var actions = accLevelfeatures[y].featurePermissions[j].actions ? JSON.parse(JSON.stringify(accLevelfeatures[y].features[j].actions)) :
                  JSON.parse(JSON.stringify(accLevelfeatures[y].featurePermissions[j].permissions));
                for (var i = 0; i < actions.length; i++) {
                  //push enabled actions for that account
                  if (actions[i].actionId === actionId) {
                    actions[i].isEnabled = isEnable;
                    actions[i].isCustLvlEnabled = isAllAccUpdate ? isEnable : true; //to check if it is on select/unselect of feature at cust level
                  }//if(accLevelfeatures[y].features[j].actions)
                  //accLevelfeatures[y].features[j].actions=actions;
                  //else
                  //accLevelfeatures[y].features[j].permissions=actions;
                  // }
                }
                if (accLevelfeatures[y].featurePermissions[j].actions)
                  accLevelfeatures[y].featurePermissions[j].actions = actions;
                else
                  accLevelfeatures[y].featurePermissions[j].permissions = actions;
              }
            }
            else {
              for (var j = 0; j < accLevelfeatures[y].features.length; j++) {
                var actions = accLevelfeatures[y].features[j].actions ? JSON.parse(JSON.stringify(accLevelfeatures[y].features[j].actions)) :
                  JSON.parse(JSON.stringify(accLevelfeatures[y].features[j].permissions));
                for (var i = 0; i < actions.length; i++) {
                  //push enabled actions for that account
                  if (actions[i].actionId === actionId) {
                    actions[i].isEnabled = isEnable;
                    actions[i].isCustLvlEnabled = isAllAccUpdate ? isEnable : true; //to check if it is on select/unselect of feature at cust level
                  }//if(accLevelfeatures[y].features[j].actions)
                  //accLevelfeatures[y].features[j].actions=actions;
                  //else
                  //accLevelfeatures[y].features[j].permissions=actions;
                  // }
                }
                if (accLevelfeatures[y].features[j].actions)
                  accLevelfeatures[y].features[j].actions = actions;
                else
                  accLevelfeatures[y].features[j].permissions = actions;
              }
            }
          }
        }

        this.createContractRequestParam.accountLevelPermissions[x].accounts = accLevelfeatures;
        break;
      }
    }
  },/*
  * set features and actions segment data in feature card
  * @param: segment widget path
  */
  setFeaturesAtCustomerLevel: function (segmentPath, featureData) {
    var self = this;
    var selectedFeaturesCount = 0;
    var custId = this.view.customersDropdownFA.lblSelectedValue.info.id;
    var featuresSegData = featureData.map(function (rec) {
      var segRowData = [];
      var segSecData = {
        "id": rec.id || rec.featureId,
        "lblTopSeperator": { "isVisible": false },
        "flxCheckbox": { "onClick": self.onSectionCheckboxClick.bind(self, segmentPath) },
        "lblSectionCheckbox": { "isVisible": true, "text": self.AdminConsoleCommonUtils.checkboxSelectedlbl,
                                "skin":"sknIconBg0066CASz20pxCheckbox"},
        "lblCheckboxOptions":{"isVisible":true,"text":self.AdminConsoleCommonUtils.checkboxSelectedlbl,"skin":"sknBgB7B7B7Sz20pxCheckbox"},
        "lblIconToggleArrow": { "text": "\ue922", "skin": "sknfontIconDescRightArrow14px" },
        "flxToggleArrow": { "onClick": self.toggleSegmentSectionArrow.bind(self, segmentPath) },
        "lblFeatureName": rec.name || rec.featureName,
        "lblStatusValue": { "text": rec.status === "SID_FEATURE_ACTIVE" || rec.featureStatus === "SID_FEATURE_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive") },
        "lblIconStatusTop": { "skin": rec.status === "SID_FEATURE_ACTIVE" || rec.featureStatus === "SID_FEATURE_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive", "text": "\ue921" },
        "lblBottomSeperator": "-",
        "lblAvailableActions": kony.i18n.getLocalizedString("i18n.contracts.availableActions") + ": ",
        "lblCountActions": { "text": rec.actions.length },
        "lblTotalActions": "of " + rec.actions.length,
        "featureData": rec,
        "template": "flxContractEnrollFeaturesEditSection"
      };
      var selectedActionsCount = 0;
      var dependentActions = [];
      for (var i = 0; i < rec.actions.length; i++) {
        dependentActions = [];
        var actionImg = self.AdminConsoleCommonUtils.checkboxSelectedlbl;
        if (rec.actions[i].isEnabled) {
          actionImg = rec.actions[i].isEnabled === "true" ? self.AdminConsoleCommonUtils.checkboxSelectedlbl : self.AdminConsoleCommonUtils.checkboxnormallbl;
        }
        if (rec.actions[i].dependentActions && rec.actions[i].dependentActions.length > 0) {
          if (typeof rec.actions[i].dependentActions === "string")//as we are getting string format in edit flow and object format in create flow
            dependentActions = (rec.actions[i].dependentActions.substring(1, rec.actions[i].dependentActions.length - 1)).split(",");
          else
            dependentActions = rec.actions[i].dependentActions.map(function (rec) { return rec.id });
        }
        var rowJson = {
          "id": rec.actions[i].id || rec.actions[i].actionId,
          "isRowVisible": false,
          "dependentActions": dependentActions,
          "flxContractEnrollFeaturesEditRow": { "isVisible": false },
          "flxFeatureNameCont": { "isVisible": true },
          "lblCheckbox": { "text": actionImg,"isVisible": true ,skin:"sknIconBg0066CASz20pxCheckbox"},
          "flxCheckbox": { "onClick": self.onClickFeaturesRowCheckbox.bind(self, segmentPath) },
          "lblFeatureName": { "text": rec.actions[i].name || rec.actions[i].actionName },
          "lblStatus": { "text": rec.actions[i].actionStatus === "SID_ACTION_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive") },
          "lblIconStatus": { "skin": rec.actions[i].actionStatus === "SID_ACTION_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive" },
          "template": "flxContractEnrollFeaturesEditRow",
        };
        //to set partial selection for action incase of customer level features
        /*  var accCount =  self.custActionAccountJSON[custId][rec.actions[i].actionId] ? self.custActionAccountJSON[custId][rec.actions[i].actionId].accountsList.length : 0;
        var availableAccountsCount =  self.custActionAccountJSON[custId][rec.actions[i].actionId] ? self.custActionAccountJSON[custId][rec.actions[i].actionId].availableAccountsCount : 0;
        if(availableAccountsCount>0){
          rowJson.imgCheckbox.src = (availableAccountsCount===accCount)? self.AdminConsoleCommonUtils.checkboxSelected : 
          (accCount!==0&&accCount < availableAccountsCount ? self.AdminConsoleCommonUtils.checkboxPartial : self.AdminConsoleCommonUtils.checkboxnormal);
        }*/
        if (rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxSelectedlbl || rowJson.lblCheckbox.text === self.AdminConsoleCommonUtils.checkboxPartiallbl)
          selectedActionsCount = selectedActionsCount + 1;
        rowJson.lblCheckbox.skin = self.applyCheckboxSkin(rowJson.lblCheckbox);
        segRowData.push(rowJson);
      }
      var headerImg = self.getHeaderCheckboxImage(segRowData, true, true);
      segSecData.lblSectionCheckbox.text = headerImg;
      segSecData.lblSectionCheckbox.skin = self.applyCheckboxSkin(segSecData.lblSectionCheckbox);
      segSecData.lblCountActions.text = selectedActionsCount.toString();
      return [segSecData, segRowData];
    });
    segmentPath.widgetDataMap = this.getWidgetDataMapForFeatures();
    segmentPath.rowTemplate = "flxContractEnrollFeaturesEditRow";
    segmentPath.setData(featuresSegData);
    this.view.ContractFAList.lblCount.text = this.getSelectedItemsCount(featuresSegData, false);
    this.view.ContractFAList.lblTotalCount.text = "of " + this.getTwoDigitNumber(featuresSegData.length);
    this.view.ContractFAList.lblSectionCheckbox.text = self.getHeaderCheckboxImage(featuresSegData, false, true);
    this.view.ContractFAList.lblSectionCheckbox.skin = self.applyCheckboxSkin(this.view.ContractFAList.lblSectionCheckbox);
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

  formatAccountLevelPermissions: function (accountsArray) {
    var accounts = accountsArray.filter(account => (account.isEnabled === true || account.isEnabled === "true"));
    var finalAccounts = accounts.map(account => {
      if (account.featurePermissions === undefined) {
        var features = account.features.map(feature => {
          feature.permissions = feature.actions;
          delete feature.actions;
          return feature;
        })
      }
      else {
        var features = account.featurePermissions.map(feature => {
          feature.permissions = feature.permissions;
          //delete feature.permissions;
          return feature;
        })
      }
      account.featurePermissions = features;
      delete account.features;
      return account;
    });
    return finalAccounts;
  },

  updateAccountSelectionAccLvl: function (custId, accountsList, isEnable) {
    this.createContractRequestParam.accountLevelPermissions = this.createContractRequestParam.accountLevelPermissions || [];
    for (let x = 0; x < this.createContractRequestParam.accountLevelPermissions.length; x++) {
      if (custId === this.createContractRequestParam.accountLevelPermissions[x].coreCustomerId) {
        var accLevelfeatures = this.createContractRequestParam.accountLevelPermissions[x].accounts;
        for (let y = 0; y < accLevelfeatures.length; y++) {
          if (accountsList.includes(accLevelfeatures[y].accountId))
            accLevelfeatures[y].isEnabled = isEnable;
        }
        this.createContractRequestParam.accountLevelPermissions[x].accounts = accLevelfeatures;
        break;
      }
    }
  },
  /*
*set accounttyp,ownership filters data for accounts segment in features tab
*/
  /*searchCustBulkUpdateContract : function(){
    var searchText = this.view.bulkUpdateFeaturesLimitsPopup.searchBoxScreen1.tbxSearchBox.text;
    var secData = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.secData;
    var allAccounts = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.rowsData;
    var searchResults = [];
    if(searchText.length > 0){
      var filteredRows = [];
      for(var i=0;i<allAccounts.length;i++){
        var accNameSearch = allAccounts[i].lblAccountName ? (allAccounts[i].lblAccountName.text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) : false;
        if(allAccounts[i].lblCustomerName.text.indexOf(searchText) >= 0 ||
           accNameSearch){
          filteredRows.push(allAccounts[i]);
        }
      }
      if(filteredRows.length > 0){
        secData.imgCheckBox.src = this.getHeaderCheckboxImage(filteredRows, true, true);
        this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([[secData,filteredRows]]);
      } else{
        this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData([]);
      }
    } else{
      secData.imgCheckBox.src = this.getHeaderCheckboxImage(allAccounts, true, true);
      searchResults = [[secData,allAccounts]];
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.setData(searchResults);
    }
  },*/
  showHideRowFlex: function (rowsData, visibility) {
    for (var i = 0; i < rowsData.length; i++) {
      if (rowsData[i].flxContractsFABodyView) {
        rowsData[i].isRowVisible = visibility;
        rowsData[i].flxContractsFABodyView.isVisible = visibility;
      } else if (rowsData[i].flxViewFeatureBody) {
        rowsData[i].isRowVisible = visibility;
        rowsData[i].flxViewFeatureBody.isVisible = visibility;
      }
    }
    return rowsData;
  },
  setFeaturesAccountsFilterDataContract: function (accountsData, category) {
    var self = this;
    this.ownershipFilterData = accountsData[0];
    var typeFilterWid = category === 1 ? this.view.filterMenu1 : this.view.bulkUpdateFeaturesLimitsPopup.filterMenu;
    var ownershipFilterWid = category === 1 ? this.view.filterMenu2 : this.view.bulkUpdateFeaturesLimitsPopup.filterMenuAcc;
    var flxTypeFilterWid = category === 1 ? this.view.flxAccountsFilter1 : this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenu;
    var flxOwnershipFilterWid = category === 1 ? this.view.flxAccountsFilter2 : this.view.bulkUpdateFeaturesLimitsPopup.flxFilterMenuAcc;
    var rowsData = accountsData.length > 0 ? accountsData[0][1] : []
    var lblOwnership = category === 1 ? "lblOwnershipType" : "lblAccountHolder";
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
  * FEATURE BULK UPDATE CONTRACT : add select cust/accounts tag
  */
  addAccountsTagContract: function (tagParentFlex, name, id, totalLen) {
    var self = this;
    var toCheck = this.view.btnUpdateInBulkFA.info;
    var dropdowntags = this.view.flxMoreTagsContFA.widgets();
    var tagsCount = tagParentFlex.widgets().length;
    var uniqueId = dropdowntags.length + tagsCount;
    uniqueId = uniqueId.toString();
    uniqueId = uniqueId + "FA";
    var newTextTag = this.view.flxSelectionTag.clone(uniqueId);
    var lblname = uniqueId + "lblTagName1";
    var imgname = uniqueId + "flxCross1";
    var flexWidth = this.AdminConsoleCommonUtils.getLabelWidth(name, "12px Lato-Regular");
    if (this.view.flxContractFA.isVisible && toCheck == "ACCLVL") {
      newTextTag.width = flexWidth + 10 + 10 + 28 + "px";        //labelwidth+left padding+right padding+ cross image width	
      newTextTag[lblname].text = name + " (" + id + ")";
      newTextTag[lblname].tooltip = name + " (" + id + ")";
      newTextTag.isVisible = true;
      newTextTag.info = name;
    } else {
      newTextTag.width = flexWidth + 10 + 10 + 15 + "px";         //labelwidth+left padding+right padding+ cross image width
      newTextTag[lblname].text = name;
      newTextTag[lblname].tooltip = name;
      newTextTag.isVisible = true;
      newTextTag.info = id;
    }
    tagParentFlex.info.added.push([name, id]);
    var parentWidth = tagParentFlex.frame.width;
    var leftVal = 20;
    var topVal = 0;
    var lineCount = 1;
    for (var a = tagsCount - 1; a >= 0; a--) {
      var i = tagParentFlex.children[a];
      leftVal = leftVal + (tagParentFlex[i].frame.width + 15);
      var moreCount = totalLen - tagParentFlex.widgets().length;
      if ((leftVal + flexWidth + 50 + 80) > parentWidth && moreCount > 1) {
        lineCount = lineCount + 1;
        //add more tag
        if (dropdowntags.length === 0) {
          this.addMoreTagBulkUpdate(tagParentFlex, leftVal, moreCount);
        }

      }
    }
    newTextTag.left = leftVal + "px";
    if (lineCount > 1 || dropdowntags.length > 0) {
      newTextTag.isVisible = true;
      newTextTag.top = "10dp";
      newTextTag.left = "20dp";
      this.view.flxMoreTagsContFA.addAt(newTextTag, -1);
      newTextTag[imgname].onTouchStart = this.removeTagsFromDropdown.bind(this, this.view.flxMoreTagsContFA, tagParentFlex, newTextTag.info);

    } else {
      newTextTag.top = topVal + "px";
      tagParentFlex.addAt(newTextTag, -1);
      newTextTag[imgname].onTouchStart = function (id) {
        /* if(tagParentFlex.id=="flxTagsContainer"&&self.view.flxContractLimits.isVisible&&
            self.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length!==0)
           self.showBulkUpdatePopupScreen2();//to refresh features data in the dropdown when any selected customer is removed
         else*/
        self.removeTagContracts(tagParentFlex, id.parent.info);
      };
      tagParentFlex.setVisibility(true);
    }

  },
  /*
  * FEATURE BULK UPDATE CONTRACT : add more tag to show dropdown list
  */
  addMoreTagBulkUpdate: function (tagParentFlex, leftVal, count) {
    var self = this;
    var moreTag = this.view.flxSelectionTag.clone("MTFA");
    moreTag["MTFAlblTagName1"].text = "More";
    moreTag["MTFAlblTagName1"].text = "+" + count + " More";
    moreTag.width = "80px";
    moreTag["MTFAflxCross1"].isVisible = false;
    moreTag.isVisible = true;
    moreTag.top = "0px";
    moreTag.width = "100px";
    moreTag.left = leftVal + "px";
    tagParentFlex.addAt(moreTag, -1);
    moreTag.onClick = function (event, context) {
      var top = self.view.flxBulkUpdateBody.frame.y + self.view.flxBulkUpdateTagsContainer.frame.y + self.view.flxTagsContainer.frame.y;
      self.view.flxMoreTagsDropdown.top = top + 25 + "dp";
      var dropdowntags = self.view.flxMoreTagsContFA.widgets();
      var maxWidth = 100;
      for (var i = 0; i < dropdowntags.length; i++) {
        if (dropdowntags[i].frame.width > maxWidth)
          maxWidth = dropdowntags[i].frame.width;
      }
      self.view.flxMoreTagsDropdown.right = tagParentFlex.frame.width - (leftVal + 100) + 10 + "dp";
      self.view.flxMoreTagsDropdown.width = maxWidth + 40 + "dp";
      self.view.flxMoreTagsDropdown.setVisibility(!self.view.flxMoreTagsDropdown.isVisible);
    }

  },
  /*
  * FEATURE BULK UPDATE CONTRACT : remove tag from dropdown list
  */
  removeTagsFromDropdown: function (dropdownContFlx, tagParentFlex, id) {
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
    }
    else if (this.view.flxContractFA.isVisible && toCheck == "CUSTLVL") {
      var selCust = this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust;
      for (let x = 0; x < tagParentFlex.info.added.length; x++) {
        if (tagParentFlex.info.added[x][1] === id) tagParentFlex.info.added.splice(x, 1);

      }
      selCust = selCust.filter(function (custId) {
        return custId !== id;
      });
      this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust = selCust;
    }
    dropdownContFlx.remove(this.view[tagWidId]);
    this.view.forceLayout();
    this.view["MTFAlblTagName1"].text = "+" + dropdownContFlx.widgets().length + " More";
    //remove more tag also
    if (dropdownContFlx.widgets().length === 0) {
      this.view.flxMoreTagsDropdown.setVisibility(false);
      this.view.flxTagsContainer.remove(this.view["MTFAflxSelectionTag"]);
    }
    this.view.lblSelectedHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Selected_Accounts") + " (" +
      (this.view.bulkUpdateFeaturesLimitsPopup.segSelectionList.info.selectedCust.length || "0") + ")";
  },
  /*
  * search in features tab contracts at By Accounts
  */
  searchFAContractsByAccounts: function() {
        var features = this.searchFeatureOnEdit;
        var accId = this.accIdForByFeatures;
        var searchText = this.view.tbxContractFASearch.text.toLowerCase();
        var searchedActions = [];
        var featureName = "";
        var actionName = "";
        // for (var i = 0; i < features.length; i++) {
        var searchResults = features.filter(function(feature) {
            featureName = feature.featureName ? feature.featureName.toLowerCase() : feature.featureName.toLowerCase();
            if (featureName.indexOf(searchText) >= 0) return feature;
            else {
                searchedActions = [];
                for (let x = 0; x < feature.actions.length; x++) {
                    actionName = feature.actions[x].actionName ? feature.actions[x].actionName.toLowerCase() : feature.actions[x].actionName.toLowerCase();
                    if (actionName.indexOf(searchText) >= 0) searchedActions.push(feature.actions[x]);
                }
                if (searchedActions.length > 0) {
                    feature.actions = searchedActions;
                    return feature;
                }
            }
        });
        if (searchResults.length > 0) {
            this.setAddFeaturesSegData(searchResults,accId);
            this.view.flxNoCustomerSelectedFA.setVisibility(false);
            this.view.flxAddProductFeatures.setVisibility(true);
        } else {
            this.view.lblNoCustomersSelectedFA.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.No_results_found");
            this.view.imgContractFA.setVisibility(false);
            this.view.flxNoCustomerSelectedFA.setVisibility(true);
            this.view.flxAddProductFeatures.setVisibility(false);
        }
  },
  onHoverSettings: function (widget, context) {
    var scopeObj = this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
    scopeObj.view.forceLayout();
  },
 /*
  * get phonenumber with correct format from custInfo or contact details
  */
  getPhoneNumber: function () {
    var phnNum = "", isd = "";
    var contactInfo = this.presenter.getCurrentCustomerContactInfo();
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var contactArr = contactInfo.ContactNumbers || [];
    var primaryContactRec = "";
    //consider phonenumber from contacts service
    if (contactArr && contactArr.length > 0) {
      primaryContactRec = contactArr.filter(function (rec) {
        return rec.isPrimary === "true";
      });
      phnNum = primaryContactRec.length > 0 ? primaryContactRec[0].phoneNumber : "";
      isd = primaryContactRec.length > 0 ? primaryContactRec[0].phoneCountryCode : "";
    }
    else if (customerDetails.PrimaryPhoneNumber) {  //consider phonenumber from customerInfo
      if (customerDetails.PrimaryPhoneNumber.indexOf("-") >= 0) {
        var phnNumArr = customerDetails.PrimaryPhoneNumber.split("-");
        phnNum = phnNumArr.length === 2 ? phnNumArr[1] : phnNumArr.length > 0 ? phnNumArr[0] : "";
        isd = phnNumArr.length === 2 ? (phnNumArr[0].indexOf("+") >= 0 ? phnNumArr[0] : "+" + phnNumArr[0]) : "";
      } else if (customerDetails.PrimaryPhoneNumber.indexOf("+") >= 0) {
        isd = "";//customerDetails.PrimaryPhoneNumber.substring(0,3);
        phnNum = customerDetails.PrimaryPhoneNumber.substring(1, customerDetails.PrimaryPhoneNumber.length);
      } else {
        isd = "";
        phnNum = "";
      }

    }
    return { "phone": phnNum, "isd": isd };
  },
  fetchInfinityUserDetails: function (tabName) {
    var selectedIndex = this.view.segEnrollCustList.selectedRowIndex[1];
    var selectedRowData = this.view.segEnrollCustList.data[selectedIndex];
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.legalentityid1|| " ";
    var navParam = {
      data: {
        "custId": selectedRowData.custId,
        "tabName": tabName,
        "isAccountLevel": false,
        "isEnrollEditUser": true,
        "isSingleEdit": true
      }
    };
    var inputParam = {
      "id": userId,
      "coreCustomerId": selectedRowData.custId,
      "contractId": selectedRowData.custDetails["contractId"],
      "legalEntityId":legalEntityId
    };
    this.presenter.getInfinityUserAllDetails(inputParam, navParam, false);
  },
    /*
  * set pagination values to initial page
  */
  resetPaginationValuesCustomers : function(dataLen){
    var compPath=this.view.cardPagination;
    this.loadMoreModel = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/20) : compPath.lblShowing.info
    };
    var totalRecords=dataLen?dataLen:compPath.lblShowing.info;
    compPath.lblNumber.text = "1";
    compPath.tbxPageNumber.text = "1";
    var nextSetCount=totalRecords<20?totalRecords:20;
    compPath.lblShowing.text = "Showing 1 - "+nextSetCount+" Of " + totalRecords;
    compPath.lblShowing.info=totalRecords;
  },
  updatePaginationValuesCustomers : function(currentPage){
    var compPath=this.view.cardPagination;
    compPath.lblNumber.text = currentPage;
    compPath.tbxPageNumber.text = currentPage;
    var nextSetCount=currentPage*20<parseInt(compPath.lblShowing.info)?currentPage*20:compPath.lblShowing.info;
    compPath.lblShowing.text = "Showing "+ (currentPage*20-19)+" - "+nextSetCount+" Of " + compPath.lblShowing.info;
    this.view.forceLayout();
  },
  /*
 * append next set of data for account level features and limits using pagination
 */
  onSegmentPaginationChange: function (currentValue) {
    var self = this;
    var offsetVal = currentValue * 20;
    var start = offsetVal - 20;
    var custToAppend = this.editUserCustomersList.companyList;
    if (offsetVal > custToAppend.length)
      offsetVal = custToAppend.length;
    var featuresTimeout;
    if (start < custToAppend.length) {
      this.updatePaginationValuesCustomers(currentValue);
      kony.adminConsole.utils.showProgressBar(this.view);
      featuresTimeout = setTimeout(self.setEnrollCustomersList.bind(self, start, offsetVal, custToAppend));
      self.pageCount.PAGE_OFFSET = offsetVal;
    }
    self.view.flxCustomersPagination.setVisibility(custToAppend.length > 20);
  },
  updateCustomersListGlobalVar: function(custId,roleId,isRecRemoved,isPrimary,arrayToAdd){
    var custList=this.editUserCustomersList.companyList;
    var arrayCustId="";
    if(arrayToAdd===undefined||arrayToAdd.length===0){
    for(var i=0;i<custList.length;i++){
      arrayCustId=custList[i].coreCustomerId || custList[i].cif;
      if(arrayCustId===custId){
        if(isPrimary===true){//when primary customer is removed
			this.editUserCustomersList.companyList[i].isCustomerRemoved=isRecRemoved;
          if(isRecRemoved===false)
            this.onSegmentPaginationChange(this.view.cardPagination.tbxPageNumber.text);
        }else if(isRecRemoved===true){
			this.editUserCustomersList.companyList.splice(i,1);
        }else
          this.editUserCustomersList.companyList[i].roleId=roleId;
        break;
      }
    }
    }else{
      this.editUserCustomersList.companyList.push(...arrayToAdd);
      custList=this.editUserCustomersList.companyList;
      //var result=[...new Set(custList.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));

      var result = custList.reduce((unique, o) => {
        if(!unique.some(obj => obj.coreCustomerId === o.coreCustomerId)) {
          unique.push(o);
        }
        return unique;
      },[]);
      this.editUserCustomersList.companyList=result;
    }
  },


  onHoverComponentDropdown: function (componentPath, widget, context) {
    var scopeObj = this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      componentPath[widget.id].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      componentPath[widget.id].setVisibility(false);
    }
    scopeObj.view.forceLayout();
  },
  /*
  * set legal entity card
  */
  setLegalEntityCardContract : function(entityList){
    var entities = this.getLEDesc(this.legalentityid1 || "");
    this.view.flxNoServiceSearchResults.setVisibility(false);
    this.view.flxLegalEntityCards.setVisibility(true);
    this.view.flxLegalEntityCardsList.removeAll();
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var left =20, top =20, width = 0;
    this.view.flxLegalEntityCardsList.removeAll();
    for (var i = 0; i < entities.length; i++) {
      width = (screenWidth -305-230-35-60-60)/3;
      var alertEntityCard = new com.adminConsole.contracts.serviceCard({
        "id": "legalentity"+entities[i].id,
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
      } 
      alertEntityCard.flxServiceTag.setVisibility(false);
      alertEntityCard.lblCategoryName.top="10dp";
      alertEntityCard.height="40dp";
      alertEntityCard.skin = "sknFlxbgF8F9FAbdr003E75Shadow";
      this.setEntityCardData(entities[i], alertEntityCard,width-40);
      this.view.flxLegalEntityCardsList.setEnabled(false);
    }
  },
  setEntityCardData:function(entity,entityCard,width){
    var self = this;
    entityCard.lblCategoryName.info ={"catId":entity.id};
    var labelCharCount=Math.ceil(width/7);
    var legalEntityName = entity.companyName;
    entityCard.lblCategoryName.text=this.AdminConsoleCommonUtils.getTruncatedString(legalEntityName, labelCharCount, labelCharCount-3);
    entityCard.lblCategoryName.tooltip = legalEntityName;
    this.view.flxLegalEntityCardsList.add(entityCard);
    this.view.forceLayout();
  },
});

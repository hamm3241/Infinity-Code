define({
  accountsData: [],
  assignedAccounts: [],
  comapnyDetails :null,
  customerDetails : null,
  navigatedFromCustomerTab :null,
  actionConfig:{
    create :"CREATE",
    edit:"EDIT"
  },
  tabClick : 1,
  serviceTypeConfig :{
    transactional:"SER_TYPE_TRNS"
  },
  action : "CREATE",
  usernameRulesAndPolicy :{
    usernamerules : null,
    usernamepolicy : null
  },
  roles : "",
  roleSelected : false,
  selectedRoleId:"",
  prevSelectedFeature:[],
  selectedFeatureIndex : 0, 
  accountsMap : new Map(),
  modifiedAccountsMap : new Map(),
  sampleAccountFeatures : [],
  prevAccountSelected :"",
  isAccountCentric : true,
  isAuthorizedSignatoryFlow : true,
  selectedCustomer : "",
  customerIdForProfileLinked : "",
  currentServiceKey : "",
  defaultRole : "",
  willUpdateUI: function (customerCreateModel) {
    this.updateLeftMenu(customerCreateModel);
    if (customerCreateModel) {
      if (customerCreateModel.LoadingScreen) {
        if (customerCreateModel.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      } else if(customerCreateModel.companyDetails){ //Create screen
        if(customerCreateModel.accountSignatories)
          this.customers=customerCreateModel.accountSignatories;
        this.loadCreateUi(customerCreateModel);
      } else if(customerCreateModel.editInputs){ //Edit screen
        this.loadEditUi(customerCreateModel);
      } else if (customerCreateModel.featuresAndActions){
        var accounts=(customerCreateModel.featuresAndActions[0] && customerCreateModel.featuresAndActions[0].accounts)?customerCreateModel.featuresAndActions[0].accounts:[];
        var features=(customerCreateModel.featuresAndActions[0] && customerCreateModel.featuresAndActions[0].features)?customerCreateModel.featuresAndActions[0].features:[];
        this.storeAccountsInMap(accounts, features);
        this.modifiedAccountsMap=new Map(JSON.parse(this.accountsMap));
        this.sampleAccountFeatures=JSON.stringify(this.populateSampleAccountFeaturesWithAllUnSelected());
      }
      else if(customerCreateModel.isUsernameAvailable){
        this.displayUsernameAvailability(customerCreateModel.isUsernameAvailable);
      } else if(customerCreateModel.OFACVerification) {
        this.onClickOfNextFromDetails(customerCreateModel.OFACVerification);
      }else if (customerCreateModel.toastMessage) {
        if (customerCreateModel.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(customerCreateModel.toastMessage.message, this);
        } else if (customerCreateModel.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
          this.view.toastMessage.showErrorToastMessage(customerCreateModel.toastMessage.message, this);
        }
      }
      else if(customerCreateModel.customers){
        var customers=customerCreateModel.customers; 
        this.populateSearchCustomersList(customers);
        if(customers.length===1){
		           this.view.segCustomerCentricDetails.selectedRowIndex=[0,0];
			           this.toggleCustomerRadio();
           this.view.btnCreate.onClick();
        }
      }
	}
    this.view.forceLayout();
  },
  setFlowActions: function () {
    var scopeObj = this;
    this.view.verticalTabsCustomer.btnOption0.onClick = function () {
      scopeObj.tabClick = 0;
      if(scopeObj.isAccountCentric===true)
       scopeObj.showAccountCentricFlow();
      else
       scopeObj.showCustomerCentricFlow();
    };
    this.view.verticalTabsCustomer.btnOption1.onClick = function () {
      scopeObj.tabClick = 1;
      if(scopeObj.validateCurrentTabDetails()) { 
        if(scopeObj.actionConfig.create===scopeObj.action && scopeObj.isAuthorizedSignatoryFlow===true && (scopeObj.view.flxSelectedCustomersAccountCentric.isVisible ||scopeObj.view.flxCustomerCentricSearch.isVisible)){
          var path=scopeObj.isAccountCentric===true?scopeObj.view.segAccountCentricDetails:scopeObj.view.segCustomerCentricDetails;
          var index= path.selectedRowIndex[1];
          var data=path.data;
          scopeObj.setCustomerDetailsForAuthSignatories(data[index]);
        }
        else 
          scopeObj.showCustomerCreateScreen();
      }
    };
    this.view.verticalTabsCustomer.btnOption2.onClick = function () {
      scopeObj.tabClick = 2;
      if(scopeObj.validateCurrentTabDetails()) scopeObj.showAccountsScreen();
    };
    this.view.verticalTabsCustomer.btnOption3.onClick = function () {
      scopeObj.tabClick = 3;
      if(scopeObj.validateCurrentTabDetails()) scopeObj.showAssignRolesScreen();
    };
    this.view.verticalTabsCustomer.btnOption4.onClick = function () {
      scopeObj.tabClick = 4;
      if(scopeObj.validateCurrentTabDetails()) scopeObj.showAccountLevelFeaturesAndActions();
    };
    this.view.verticalTabsCustomer.btnOption5.onClick = function () {
      scopeObj.tabClick = 5;
      if(scopeObj.validateCurrentTabDetails()) scopeObj.showOtherFeaturesAndActions();
    };
     this.view.verticalTabsCustomer.btnOption6.onClick = function () {
      scopeObj.tabClick = 6;
      if(scopeObj.validateCurrentTabDetails()) scopeObj.showAssignLimits();
    };
    this.view.btnCancel.onClick = function () {
      scopeObj.handleCancelClick();      
    };
    this.view.btnCreate.onClick = function () {
      var similarButtonTabs=[0,1,2,3,4];
      if(similarButtonTabs.contains(scopeObj.tabClick)){
        scopeObj.onNextClick();
      }
      else{
        scopeObj.createCustomerRequest();
      }
    };
    this.view.btnNext.onClick = function () {
      var similarButtonTabs=[5,6];
      if(similarButtonTabs.contains(scopeObj.tabClick)){
        scopeObj.onNextClick();
      }
    };
    this.view.addAndRemoveAccounts.tbxFilterSearch.onKeyUp = function(){
      scopeObj.view.addAndRemoveAccounts.flxSearchClick.onClick();
    };
    this.view.addAndRemoveAccounts.tbxFilterSearch.onTouchStart = function(){
      if(scopeObj.view.addAndRemoveAccounts.flxSegSearchType.isVisible){
        scopeObj.view.addAndRemoveAccounts.flxSegSearchType.setVisibility(false);
      }
    };
    this.view.addAndRemoveAccounts.tbxFilterSearch.onTouchStart = function(){
      if(scopeObj.view.addAndRemoveAccounts.flxSegSearchType.isVisible){
        scopeObj.view.addAndRemoveAccounts.flxSegSearchType.setVisibility(false);
      }
    };
    this.view.addAndRemoveAccounts.btnRemoveAll.onClick = function(){
      scopeObj.resetAccounts();
    };
    this.view.textBoxEntry11.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry11.tbxEnterValue, scopeObj.view.textBoxEntry11.flxInlineError, scopeObj.view.textBoxEntry11.flxEnterValue);
    };
    this.view.textBoxEntry13.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry13.tbxEnterValue, scopeObj.view.textBoxEntry13.flxInlineError, scopeObj.view.textBoxEntry13.flxEnterValue);
    };
    this.view.textBoxEntry21.tbxEnterValue.onKeyUp = function(){
      scopeObj.view.lblUsernameCheck.setVisibility(false);
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry21.tbxEnterValue, scopeObj.view.textBoxEntry21.flxInlineError, scopeObj.view.textBoxEntry21.flxEnterValue);
    };
    this.view.textBoxEntry22.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry22.tbxEnterValue, scopeObj.view.textBoxEntry22.flxInlineError, scopeObj.view.textBoxEntry22.flxEnterValue);
    };
    this.view.textBoxEntry23.txtContactNumber.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry23.txtContactNumber, scopeObj.view.textBoxEntry23.flxError);
    };
    this.view.textBoxEntry23.txtISDCode.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry23.txtISDCode, scopeObj.view.textBoxEntry23.flxError);
      scopeObj.view.textBoxEntry23.txtISDCode.text = scopeObj.view.textBoxEntry23.addingPlus(scopeObj.view.textBoxEntry23.txtISDCode.text);
    };
    this.view.textBoxEntry31.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry31.tbxEnterValue, scopeObj.view.textBoxEntry31.flxInlineError, scopeObj.view.textBoxEntry31.flxEnterValue);
    };
    this.view.textBoxEntry32.tbxEnterValue.onKeyUp = function(){
      scopeObj.clearValidationsForDetails(scopeObj.view.textBoxEntry32.tbxEnterValue, scopeObj.view.textBoxEntry32.flxInlineError, scopeObj.view.textBoxEntry32.flxEnterValue);
    };
    this.view.txtSearchParam4.onBeginEditing = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmCustomerCreate_txtSearchParam4");
    };
    this.view.textBoxEntry21.btnCheck.onClick = function(){
      var isUsernameValid = scopeObj.userNameValidation();
      if(isUsernameValid){
        var usernameParam = {"UserName" :scopeObj.view.textBoxEntry21.tbxEnterValue.text};
        scopeObj.presenter.verifyUsername(usernameParam,null);
      }
    };
    this.view.customCalCustomerDOB.event = function(){
      scopeObj.view.flxCalendarDOB.skin = "sknflxffffffoptemplateop3px";
      scopeObj.view.textBoxEntry31.flxInlineError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
   this.view.customCalDob.event = function(){
      scopeObj.view.flxSearchParam3.skin = "sknflxffffffoptemplateop3px";
      scopeObj.view.forceLayout();
    };
    this.view.addAndRemoveAccounts.segSearchType.onRowClick = function(){
      scopeObj.dispalySelectedType();
    };
    this.view.addAndRemoveAccounts.flxSearchClick.onClick = function(){
      var self=scopeObj;
       var searchText = scopeObj.view.addAndRemoveAccounts.tbxFilterSearch.text;
      if(searchText){
        var accounts = scopeObj.accountsData.filter(function(account){
          if(self.isAccountCentric===true)
            return account.Account_id.indexOf(searchText)>=0;
          else
            return account.Membership_id.indexOf(searchText)>=0;
        });
        scopeObj.accountSearch(accounts);
      }else{
        scopeObj.accountSearch(scopeObj.accountsData);
      }
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.hideCustomerCreateScreen();
    };
    this.view.lblRules.onClick = function() {
      scopeObj.rulesLabelClick();
    };
    this.view.flxFlag1.onClick = function(){
      scopeObj.selectRiskFlag(scopeObj.view.imgFlag1);
    };
    this.view.flxFlag2.onClick = function(){
      scopeObj.selectRiskFlag(scopeObj.view.imgFlag2);
    };
    this.view.flxFlag3.onClick = function(){
      scopeObj.selectRiskFlag(scopeObj.view.imgFlag3);
    };
    this.view.flxRoleClosePopup.onClick = function(){
      scopeObj.view.flxViewRolePopup.setVisibility(false);
    };
    this.view.tbxSearchBox.onBeginEditing = function () {
      scopeObj.view.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
    };
    this.view.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
    };
    this.view.tbxSearchBox.onKeyUp = function () {

      if(scopeObj.view.tbxSearchBox.text === "")
        scopeObj.view.flxClearSearchImage.setVisibility(false);
      else
        scopeObj.view.flxClearSearchImage.setVisibility(true);
      var text = scopeObj.view.tbxSearchBox.text;
      if(text){
        scopeObj.setDataForRolesSegment((scopeObj.roles.filter(function(rec){
          return rec.name.toLowerCase().indexOf(text.toLowerCase())>=0;
        })));
      }else{
        scopeObj.setDataForRolesSegment(scopeObj.roles);
        scopeObj.view.flxClearSearchImage.isVisible = false;
      }
    };
    this.view.flxClearSearchImage.onClick = function(){
      scopeObj.view.tbxSearchBox.text = "";
      scopeObj.view.flxClearSearchImage.isVisible = false;
      scopeObj.view.tbxSearchBox.onKeyUp();
    };
    this.view.segCustomerRolesEdit.onRowClick = function(){
      scopeObj.toggleRadio();
    };
    this.view.verticalTabsCustomer.segCompanyAccounts.onRowClick = function(){
      var index = scopeObj.view.verticalTabsCustomer.segCompanyAccounts.selectedIndex;
      var rowIndex = index[1];
      scopeObj.highLightSelectedAccount(rowIndex);
    };
    this.view.verticalTabsCustomer.segCompanyAccount6.onRowClick = function(){
      var index = scopeObj.view.verticalTabsCustomer.segCompanyAccount6.selectedIndex;
      var rowIndex = index[1];
      scopeObj.highLightSelectedAccount(rowIndex);
    };
    this.view.addFeaturesAndActions.btnSelectAll.onClick = function(){
      if (scopeObj.view.addFeaturesAndActions.btnSelectAll.text === kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll")) {
        scopeObj.removeAllFeatures();
        scopeObj.view.addFeaturesAndActions.btnSelectAll.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
      } else {
        scopeObj.addAllFeatures();
        scopeObj.view.addFeaturesAndActions.btnSelectAll.text = kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
      }
    };
    this.view.addFeaturesAndActions.segAddOptions.onRowClick = function(){
      scopeObj.featuresRowClickHandler();
    };
    this.view.addFeaturesAndActions.btnResetActions.onClick =function(){
      scopeObj.showResetActionsPopup();
    };
    this.view.addFeaturesAndActions.fontIconFeatureTypeFilter.onTouchStart = function(){
      if(scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.isVisible)
      	scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.setVisibility(false);
      else if(scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.isVisible === false){
        scopeObj.view.addFeaturesAndActions.flxFeatureTypeFilter.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.addFeaturesAndActions.btnViewActions.onClick = function(){
      scopeObj.fillFeatureDetails();
    };
    this.view.flxFeatureDetailsClose.onClick = function(){
      scopeObj.view.flxFeatureDetails.setVisibility(false);
    };
    this.view.addFeaturesAndActions.tbxSearchAvailableItems.onKeyUp = function(){
      if(scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex){
        var rowInd=scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxSelectedArrow.isVisible=false;
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
      scopeObj.view.addFeaturesAndActions.flxClearSearch.setVisibility(false);
      scopeObj.view.addFeaturesAndActions.rtxAvailableOptionsMessage.setVisibility(false);
      scopeObj.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
      if(scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex){
        var rowInd=scopeObj.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
        scopeObj.view.addFeaturesAndActions.segAddOptions.info[rowInd].flxSelectedArrow.isVisible=false;
        scopeObj.hideActionsList();
      }
      scopeObj.view.addFeaturesAndActions.segAddOptions.setData(scopeObj.view.addFeaturesAndActions.segAddOptions.info);
      scopeObj.updateFeaturesCount();
    };
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performFeatureStatusFilter();
    };
    this.view.segAccountCentricDetails.onRowClick = function(){
      scopeObj.toggleCustomerRadio();
    };
    this.view.segCustomerCentricDetails.onRowClick = function(){
      scopeObj.toggleCustomerRadio();
    };
    this.view.fontIconFilterStatus.onTouchStart = function(){
      if(!scopeObj.view.flxFilter.isVisible){
        var flxRight = scopeObj.view.flxHeaderSub2.frame.width - scopeObj.view.flxMemberType.frame.x - scopeObj.view.flxMemberType.frame.width;
        var iconRight = scopeObj.view.flxMemberType.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
        scopeObj.view.flxFilter.right = (flxRight + iconRight+10) +"px";
        scopeObj.view.flxFilter.setVisibility(true);
      }else
        scopeObj.view.flxFilter.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.filterMenu.segStatusFilterDropdown.onRowClick = function(){
      var data=scopeObj.filterData();
      scopeObj.populateSelectedCustomersList(data);
    };
    this.view.tbxAccountSearchBox.onTouchStart = function(){
      scopeObj.view.flxAccountSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.tbxAccountSearchBox.onEndEditing = function(){
      scopeObj.view.flxAccountSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.tbxAccountSearchBox.onKeyUp = function(){
      scopeObj.view.flxClearAccountSearchImage.setVisibility(true);
      if(scopeObj.view.tbxAccountSearchBox.text === ""){
        scopeObj.view.flxClearAccountSearchImage.setVisibility(false);
      }else{
        scopeObj.view.flxAccountSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        scopeObj.view.flxClearAccountSearchImage.setVisibility(true);
      }
      scopeObj.performSearchOnCustomers();
    };
    this.view.flxClearAccountSearchImage.onClick = function(){
      scopeObj.view.tbxAccountSearchBox.text = "";
      scopeObj.view.flxAccountSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.flxClearAccountSearchImage.setVisibility(false);
      scopeObj.performSearchOnCustomers();
    };
     /* Postponed for next release
     this.view.popUpConfirmation.btnPopUpDelete.onClick = function(){
      scopeObj.linkBusinessAndRetailProfile();
    };*/
    this.view.popUpConfirmation.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.popUpConfirmation.flxPopUpClose.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.flxLinkProfileButton.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(true);
    };
    this.view.btnSearch.onClick = function(){
      scopeObj.searchAuthSignatoriesCustCentric();
    };
    this.view.lbxSearchParam1.onSelection = function(){
      scopeObj.view.flxErrorRow11.setVisibility(false);
      scopeObj.view.lbxSearchParam1.skin="sknlstbxNormal0f9abd8e88aa64a";
    };
    this.view.lbxAuthType.onSelection = function(){
      scopeObj.view.authTypeError.setVisibility(false);
      scopeObj.view.lbxAuthType.skin="sknlstbxNormal0f9abd8e88aa64a";
    };
    this.view.flxCustName.onClick = function(){
      var segData = scopeObj.view.segCustomerCentricDetails.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblName.text");
      scopeObj.view.segCustomerCentricDetails.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxSSNNum.onClick = function(){
      var segData = scopeObj.view.segCustomerCentricDetails.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblSSN.text");
      scopeObj.view.segCustomerCentricDetails.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxDob.onClick = function(){
      var segData = scopeObj.view.segCustomerCentricDetails.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblDob");
      scopeObj.view.segCustomerCentricDetails.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxContact.onClick = function(){
      var segData = scopeObj.view.segCustomerCentricDetails.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblContactNumber");
      scopeObj.view.segCustomerCentricDetails.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxEmail.onClick = function(){
      var segData = scopeObj.view.segCustomerCentricDetails.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblEmail.text");
      scopeObj.view.segCustomerCentricDetails.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxFilter.onHover = this.onDropDownsHoverCallback;
    this.view.btnReset.onClick = function(){
      scopeObj.resetCustomerCentricSearchFields();
      if(scopeObj.view.lbxSearchParam1.isVisible)
        scopeObj.view.lbxSearchParam1.selectedKey = "lbl1";
      scopeObj.view.forceLayout();
    };
  },
  createCustomerPreshow: function () {
    var self = this;
    self.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    self.view.mainHeader.lblHeading.skin="sknLblLatoRegular22px";
    self.view.flxUsernameRules.setVisibility(false);
    self.currencyValue=self.defaultCurrencyCode();
    self.hideActionsList();
    //self.view.linkProfilesPopup.initializeLinkProfileActions(self);
    self.setFlowActions();
  },
  /*
   * callback function for accounts data from willUpdateUI
   */
  manageAccountsData : function(accounts){
    this.accountsData = accounts;
    var mappedAvailData = this.mapAvailableSegmentData(accounts);
    this.view.addAndRemoveAccounts.segAddOptions.info = {"segData": mappedAvailData};
    return mappedAvailData;
  },
  /*
	 * display customer create screen
	 */
  hideAllTabsData : function(){
    var self = this;
    self.view.flxSelectedCustomersAccountCentric.setVisibility(false);
    self.view.flxCustomerCentricSearch.setVisibility(false);
    self.view.flxCustomerDetails.setVisibility(false);
    self.view.flxCustomerAccounts.setVisibility(false);
    self.view.flxCustomerAssignRole.setVisibility(false);
    self.view.lblUsernameCheck.setVisibility(false);
    self.view.flxCustomerAssignFeaturesAndActions.setVisibility(false);
    self.view.flxCustomerAssignLimits.setVisibility(false);
    if(self.tabClick!==4)
    self.view.verticalTabsCustomer.flxSepratorContainer.setVisibility(true);    
    self.resetButtons();
  },
  hideAccountsLeftMenu : function(){
    var self =this;
    self.view.verticalTabsCustomer.flxAccountsLeftMenu.setVisibility(false);
    self.view.verticalTabsCustomer.flxAccountsLeftMenu6.setVisibility(false);
  },
  handleTabsSkinAndArrow : function(btnOption, lblSelected){
    var self= this;
    var widgetArray = [this.view.verticalTabsCustomer.btnOption0,this.view.verticalTabsCustomer.btnOption1, this.view.verticalTabsCustomer.btnOption2, this.view.verticalTabsCustomer.btnOption3, this.view.verticalTabsCustomer.btnOption4,
                       this.view.verticalTabsCustomer.btnOption5, this.view.verticalTabsCustomer.btnOption6];
    self.tabUtilVerticleButtonFunction(widgetArray, btnOption);
    var widgetArray1 = [this.view.verticalTabsCustomer.lblSelected0,this.view.verticalTabsCustomer.lblSelected1,this.view.verticalTabsCustomer.lblSelected2,this.view.verticalTabsCustomer.lblSelected3, this.view.verticalTabsCustomer.lblSelected4,
                        this.view.verticalTabsCustomer.lblSelected5, this.view.verticalTabsCustomer.lblSelected6];
    self.tabUtilVerticleArrowVisibilityFunction(widgetArray1,lblSelected);
  },
  showAccountCentricFlow : function(){
    var self = this;
    self.clearAccountsSearchBoxToDefaults();
    self.hideAllTabsData();
    self.view.flxSelectedCustomersAccountCentric.setVisibility(true);
    self.hideAccountsLeftMenu();
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption0, this.view.verticalTabsCustomer.lblSelected0);
    self.view.forceLayout();
  },
  showCustomerCentricFlow : function(){
    var self = this;
    self.hideAllTabsData();
    this.view.flxCustomerCentricSearch.setVisibility(true);
    self.hideAccountsLeftMenu();
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption0, this.view.verticalTabsCustomer.lblSelected0);
    self.view.forceLayout();
  },
  showCustomerCreateScreen: function () {
    var self = this;
    self.hideAllTabsData();
    self.view.flxCustomerCreate.setVisibility(true);
    self.view.flxCustomerDetails.setVisibility(true);
    self.hideAccountsLeftMenu();
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption1, this.view.verticalTabsCustomer.lblSelected1);
    self.clearValidationsForDetails();
    self.view.forceLayout();
  },
  /*
   * hides customer create screen when creation is cancelled
   */
  hideCustomerCreateScreen: function () {
    var self = this;
    self.clearDataForAccounts();
    self.clearDataForDetails();
    var orgId = "";
    if(self.action === self.actionConfig.create){
      orgId = self.comapnyDetails.companyID;
    } else {
      orgId = self.customerDetails.company.id;
    }
    var param = {"action":"createCustomer","id": orgId};
    self.presenter.hideCreatecompanyScreen(param,true,null);
  },
  /*
	 * display accounts tab screen in customer create screen
	 */
  showAccountsScreen: function () {
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    self.hideAllTabsData();
    self.view.flxCustomerAccounts.setVisibility(true);
    self.view.addAndRemoveAccounts.top="0px";
    self.hideAccountsLeftMenu();
    self.adjustAccountsUIBasedOnType();
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption2, this.view.verticalTabsCustomer.lblSelected2);
    self.view.addAndRemoveAccounts.tbxFilterSearch.text = "";
    self.view.addAndRemoveAccounts.flxSearchClick.onClick();
    self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Search_to_see_available_accounts");
    self.showHideAddRemoveSegment();
    self.view.forceLayout();
    kony.adminConsole.utils.hideProgressBar(self.view);
  },
 showAssignRolesScreen: function () {
    var self = this;
    self.hideAllTabsData();
    self.view.flxCustomerAssignRole.setVisibility(true);
    self.hideAccountsLeftMenu();
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption3, this.view.verticalTabsCustomer.lblSelected3);
    if(self.isAuthorizedSignatoryFlow===true && self.roleSelected===false)
      self.preselectRoles();
   self.view.forceLayout();
 },
  preselectRoles: function(){
    var self = this;
    if(self.defaultRole!==""){
      var data = self.view.segCustomerRolesEdit.data;
      for(var i=0; i<data.length; i++){
        if(data[i].id===self.defaultRole)
          self.toggleRadio(i);
      }
    }
  },
  showAccountLevelFeaturesAndActions : function(){
    var self = this;
     if(self.view.verticalTabsCustomer.flxAccountsLeftMenu.isVisible){
        self.view.verticalTabsCustomer.flxSepratorContainer.setVisibility(true);
      	self.view.verticalTabsCustomer.flxAccountsLeftMenu.setVisibility(false);
        self.view.verticalTabsCustomer.lblIconDropArrow4.text = "\ue906"; //down-arrow
        self.view.verticalTabsCustomer.lblIconDropArrow4.skin = "sknicon15pxBlack";
     }
      else{
        self.view.verticalTabsCustomer.flxSepratorContainer.setVisibility(false);
        self.view.verticalTabsCustomer.flxAccountsLeftMenu.setVisibility(true);
        self.view.verticalTabsCustomer.lblIconDropArrow4.text = "\ue920"; //right-arrow
        self.view.verticalTabsCustomer.lblIconDropArrow4.skin = "sknIcon12pxBlack";
      }
    // verify if current tab is already active or navigation is from other features and actions
    if(!self.view.flxCustomerAssignFeaturesAndActions.isVisible || self.view.verticalTabsCustomer.lblSelected5.isVisible){
    self.populateAccountsLeftMenu();
    if(self.view.verticalTabsCustomer.segCompanyAccounts.data) self.highLightSelectedAccount(0);
    self.hideAllTabsData();
    self.hideActionsList();
    self.view.flxCustomerAssignFeaturesAndActions.setVisibility(true);
    self.view.verticalTabsCustomer.flxAccountsLeftMenu6.setVisibility(false);
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption4, this.view.verticalTabsCustomer.lblSelected4);
    }
    self.view.forceLayout();
  },
  showOtherFeaturesAndActions : function(){
    var self = this;
    self.hideAllTabsData();
    self.view.flxCustomerAssignFeaturesAndActions.setVisibility(true);
    self.hideAccountsLeftMenu();
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption5, this.view.verticalTabsCustomer.lblSelected5);
    self.populateAccountLevelFeatures(-1);
    self.view.forceLayout();
  },
  showAssignLimits : function(){
    var self = this;
    if(self.view.verticalTabsCustomer.flxAccountsLeftMenu6.isVisible){
      	self.view.verticalTabsCustomer.flxAccountsLeftMenu6.setVisibility(false);
        self.view.verticalTabsCustomer.lblIconDropArrow6.text = "\ue906"; //down-arrow
        self.view.verticalTabsCustomer.lblIconDropArrow6.skin = "sknicon15pxBlack";
     }
      else{
      self.view.verticalTabsCustomer.flxAccountsLeftMenu6.setVisibility(true);
      self.view.verticalTabsCustomer.lblIconDropArrow6.text = "\ue920"; //right-arrow
      self.view.verticalTabsCustomer.lblIconDropArrow6.skin = "sknIcon12pxBlack";
      }
    self.populateAccountsLeftMenu();
    if(self.view.verticalTabsCustomer.segCompanyAccounts.data) self.highLightSelectedAccount(0);
    self.hideAllTabsData();
    self.view.flxCustomerAssignLimits.setVisibility(true);
    self.view.verticalTabsCustomer.flxAccountsLeftMenu.setVisibility(false);
    self.handleTabsSkinAndArrow(this.view.verticalTabsCustomer.btnOption6, this.view.verticalTabsCustomer.lblSelected6);
    self.view.forceLayout();
  },
  /*
   * clears all fields in create customer screen tabs
   */
  clearDataForDetails : function(){
    var self =this;
    self.clearValidationsForDetails();
    self.view.flxCustomerAccounts.setVisibility(false);
    self.view.flxCustomerAssignRole.setVisibility(false);
    self.view.textBoxEntry11.tbxEnterValue.text = "";
    self.view.textBoxEntry12.tbxEnterValue.text = "";
    self.view.textBoxEntry13.tbxEnterValue.text = "";
    self.view.textBoxEntry21.tbxEnterValue.text = "";
    self.view.textBoxEntry22.tbxEnterValue.text = "";
    self.view.customCalCustomerDOB.value = "";
    self.view.customCalCustomerDOB.resetData = "Select Date";
    self.view.textBoxEntry32.tbxEnterValue.text = "";
    self.view.textBoxEntry33.tbxEnterValue.text = "";
    self.view.textBoxEntry23.txtContactNumber.text = "";
    self.view.textBoxEntry23.txtISDCode.text = "";
    self.view.customCalCustomerDOB.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    self.view.imgFlag1.src = self.AdminConsoleCommonUtils.checkbox;
    self.view.imgFlag2.src = self.AdminConsoleCommonUtils.checkbox;
    self.view.imgFlag3.src = self.AdminConsoleCommonUtils.checkbox;
    self.view.switchEagreement.selectedIndex = 1;
    self.view.forceLayout();
  },
  clearDataForAccounts : function(){
    var self = this;
    self.view.addAndRemoveAccounts.segSelectedOptions.info ={"segData":[]};
    this.view.addAndRemoveAccounts.tbxFilterSearch.text = "";
    this.view.addAndRemoveAccounts.tbxSearchBox.text = "";
    self.view.addAndRemoveAccounts.segAddOptions.setData([]);
    self.view.addAndRemoveAccounts.segSelectedOptions.setData([]);
    self.showHideAddRemoveSegment();
  },
  /*
	 * validate detail screen fields
	 */
  detailsScreenValidation: function () {
    var self = this;
    var isValid = true;
    //firstname
    if (self.view.textBoxEntry11.tbxEnterValue.text.trim() === "") {
      self.view.textBoxEntry11.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxEntry11.flxInlineError.setVisibility(true);
      self.view.textBoxEntry11.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.FirstNameMissing");
      isValid = false;
    }
    //lastname
    if (self.view.textBoxEntry13.tbxEnterValue.text.trim() === "") {
      self.view.textBoxEntry13.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxEntry13.flxInlineError.setVisibility(true);
      self.view.textBoxEntry13.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.LastNameMissing");
      isValid = false;
    }
    //username
    var usernameValid = self.userNameValidation();
    if (!usernameValid) {
      isValid = false;
    }
    //email-id
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (self.view.textBoxEntry22.tbxEnterValue.text.trim() === "") {
      self.view.textBoxEntry22.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxEntry22.flxInlineError.setVisibility(true);
      self.view.textBoxEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailId_cannot_be_empty");
      isValid = false;
    } else if (emailRegex.test(self.view.textBoxEntry22.tbxEnterValue.text.trim()) === false) {
      self.view.textBoxEntry22.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxEntry22.flxInlineError.setVisibility(true);
      self.view.textBoxEntry22.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.EmailID_not_valid");
      isValid = false;
    }
    //contact num
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!self.view.textBoxEntry23.txtContactNumber.text || !self.view.textBoxEntry23.txtContactNumber.text.trim()) {
      self.view.textBoxEntry23.txtContactNumber.skin = "skinredbg";
      self.view.textBoxEntry23.flxError.left = "36.5%";
      self.view.textBoxEntry23.flxError.setVisibility(true);
      self.view.textBoxEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_be_empty");
      isValid = false;
    } else if (self.view.textBoxEntry23.txtContactNumber.text.trim().length > 15) {
      self.view.textBoxEntry23.txtContactNumber.skin = "skinredbg";
      self.view.textBoxEntry23.flxError.left = "36.5%";
      self.view.textBoxEntry23.flxError.setVisibility(true);
      self.view.textBoxEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_cannot_exceed");
      isValid = false;
    } else if (phoneRegex.test(self.view.textBoxEntry23.txtContactNumber.text) === false) {
      self.view.textBoxEntry23.txtContactNumber.skin = "skinredbg";
      self.view.textBoxEntry23.flxError.left = "36.5%";
      self.view.textBoxEntry23.flxError.setVisibility(true);
      self.view.textBoxEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ContactNo_not_valid");
      isValid = false;
    }
    //ISD code
    var ISDRegex = /^\+(\d{1,3}|\d{1,3})$/;
    if ((!self.view.textBoxEntry23.txtISDCode.text) ||
        (!self.view.textBoxEntry23.txtISDCode.text.trim())||
        (self.view.textBoxEntry23.txtISDCode.text.trim().length > 4) ||
        (self.view.textBoxEntry23.txtISDCode.text === "+")||
        (ISDRegex.test(self.view.textBoxEntry23.txtISDCode.text) === false))
    {
      self.view.textBoxEntry23.txtISDCode.skin = "skinredbg";
      self.view.textBoxEntry23.flxError.left = "0%";
      self.view.textBoxEntry23.flxError.setVisibility(true);
      self.view.textBoxEntry23.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
      isValid = false;
    }
    var selDate = self.view.customCalCustomerDOB.value;
    var formatDate = selDate.split("/");
    var currDate = new Date();
    var otherDate = new Date(formatDate[2],formatDate[0]-1,formatDate[1]);
    //DOB
    if (self.view.customCalCustomerDOB.value === "") {
      self.view.flxCalendarDOB.skin = "sknFlxCalendarError";
      self.view.textBoxEntry31.flxInlineError.setVisibility(true);
      self.view.textBoxEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.DateOfBirth_cannot_be_empty");
      isValid = false;
    } else if(otherDate > currDate ){
      self.view.flxCalendarDOB.skin = "sknFlxCalendarError";
      self.view.textBoxEntry31.flxInlineError.setVisibility(true);
      self.view.textBoxEntry31.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Select_valid_DateOfBirth");
      isValid = false;
    }
    //SSN
    if (self.view.textBoxEntry32.tbxEnterValue.text.trim() === "") {
      self.view.textBoxEntry32.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxEntry32.flxInlineError.setVisibility(true);
      self.view.textBoxEntry32.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.SSN_cannot_be_empty");
      isValid = false;
    }
    //Authorized signatory type validation
    if(this.isAuthorizedSignatoryFlow){
    if(this.view.lbxAuthType.isVisible && this.view.lbxAuthType.selectedKey==="lbl1"){
      this.view.authTypeError.setVisibility(true);
      this.view.lbxAuthType.skin="redListBxSkin";
      isValid=false;
    }
    }
    self.view.forceLayout();
    return isValid;
  },
  /*
   * clears the inline error message and skins
   */
  clearValidationsForDetails : function(txtBoxPath, errFlexPath, flxBoxPath){
    var self = this;
    if(flxBoxPath){
      flxBoxPath.skin = "sknflxEnterValueNormal";
      if(errFlexPath) errFlexPath.setVisibility(false);
    }
    else if(txtBoxPath){
      txtBoxPath.skin = "skntbxLato35475f14px";
      if(errFlexPath) errFlexPath.setVisibility(false);
    } else{
      self.view.textBoxEntry11.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxEntry13.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxEntry21.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxEntry22.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.textBoxEntry23.txtContactNumber.skin = "skntbxLato35475f14px";
      self.view.textBoxEntry23.txtISDCode.skin = "skntbxLato35475f14px";
      self.view.textBoxEntry32.flxEnterValue.skin = "sknflxEnterValueNormal";
      self.view.flxCalendarDOB.skin = "sknflxffffffoptemplateop3px";
      self.view.lbxAuthType.skin="sknlstbxNormal0f9abd8e88aa64a";

      self.view.textBoxEntry11.flxInlineError.setVisibility(false);
      self.view.textBoxEntry13.flxInlineError.setVisibility(false);
      self.view.textBoxEntry21.flxInlineError.setVisibility(false);
      self.view.textBoxEntry22.flxInlineError.setVisibility(false);
      self.view.textBoxEntry23.flxError.setVisibility(false);
      self.view.textBoxEntry31.flxInlineError.setVisibility(false);
      self.view.textBoxEntry32.flxInlineError.setVisibility(false);
      self.view.authTypeError.setVisibility(false);
    }
    self.view.forceLayout();
  },
  /*
	 * filters accounts data based on search text
	 */
  accountSearch: function (response) {
    var self = this;
        var filteredData = [],
            segData = [],
            searchResult = [];
        if (response && response instanceof Array) {
            searchResult = response;
        } else {
            self.view.addAndRemoveAccounts.segAddOptions.setData([]);
        }
        segData = self.mapAvailableSegmentData(searchResult);
        filteredData = self.filterAlreadyAddedData(segData);
        self.view.addAndRemoveAccounts.segAddOptions.setVisibility((filteredData.length > 0));
        if (filteredData.length <= 0) {
            self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.searchNoResultFoundCompanies");
        } else {
            self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Search_by_accountNo");
        }
        self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.setVisibility((filteredData.length <= 0));
        self.view.addAndRemoveAccounts.segAddOptions.setData(filteredData);
        self.view.forceLayout();
    self.view.forceLayout();
  },
  /*
	 * filters already added data from the search result
	 * data resulted from the search
	 */
  filterAlreadyAddedData : function(searchResultData){
    var self = this;
    var finalData = [], doesExsist = false;
    var searchDataLen = searchResultData.length || 0;
    var selectedAccounts=[];
    if(self.isAccountCentric===true){
     selectedAccounts= (self.assignedAccounts).map(function(rec){
      return self.getAccountJson(rec.accountId, rec.name);
    });
    }
    else{
      selectedAccounts=self.fetchCustomerCentricAccountsSelected();
    }
    if(searchDataLen > 0){
      finalData = searchResultData.filter(function(rec){
        doesExsist = false;
        for(var i =0; i< selectedAccounts.length;i++){
          if(selectedAccounts[i].lblAccountNumber.text === rec.lblAccountNum.text){ 
            doesExsist =true;
            break;
          }
        }
        if(!doesExsist){
          return rec;
        }
      });
    }
    return finalData;
  },
  /*
	 * function to map data to available segment on search
	 * @param: result of search
	 */
  mapAvailableSegmentData: function (data) {
    var self = this;
    var result = [];
    var widgetMap = {
      "accountId":"accountId",
      "lblAccountNum": "lblAccountNum",
      "lblAccFieldValue1": "lblAccFieldValue1",
      "lblAccFieldValue2": "lblAccFieldValue2",
      "lblAccFieldValue3": "lblAccFieldValue3",
      "lblAccountText": "lblAccountText",
      "lblAccFieldHeader1": "lblAccFieldHeader1",
      "lblAccFieldHeader2": "lblAccFieldHeader2",
      "lblAccFieldHeader3": "lblAccFieldHeader3",
      "btnAddAccount": "btnAddAccount",
      "lblLine": "lblLine",
      "flxAccField1": "flxAccField1",
      "flxAccField3": "flxAccField3",
      "flxAccField2": "flxAccField2",
      "flxAvailableAccounts": "flxAvailableAccounts",
      "name":"name",
      "holder":"holder",
      "Membership_id":"Membership_id",
      "tin":"tin",
      "completeRecord" : "completeRecord"
    };
    self.view.addAndRemoveAccounts.segAddOptions.widgetDataMap = widgetMap;
    result = data.map(function (record) {
      // complete reocrd generation for create / edit payload
      var completeRecord = {};
      var accountHolder={};
      if(record.AccountHolder){
        try {
          accountHolder= JSON.parse(record.AccountHolder);
        }  catch (err) {
          kony.print("Invalid JSON format for AccountHolder");
        }
      }
      else if(record.accountHolder){
        try{
          accountHolder= JSON.parse(record.accountHolder);
        } catch (err) {
          kony.print("Invalid JSON format for AccountHolder");
        }
      }
      if(record.account_id||record.Account_id){
        completeRecord.Account_id = record.account_id|| record.Account_id;
      }
      if((accountHolder && accountHolder.username && accountHolder.fullname)||(accountHolder&&accountHolder.fullname)){
        completeRecord.AccountHolder = accountHolder;
      }
      if(record.Type_id){
        completeRecord.Type_id = record.Type_id;
      }
      if(record.AccountName){
        completeRecord.AccountName = record.AccountName;
      }
      if(record.Membership_id){
        completeRecord.Membership_id = record.Membership_id;
      }
      if(record.Taxid){
        completeRecord.Taxid = record.Taxid;
      }       
      if(record.accountType||record.Account_Type){
        completeRecord.AccountType = record.accountType|| record.Account_Type;
      } 
      completeRecord.arrangementId = record.arrangementId ? record.arrangementId : "N/A";
      
      return {
        "lblAccountNum": {
          "text": record.account_id|| record.Account_id
        },
        "lblAccFieldValue1": {
          "text": record.accountType||record.Account_Type
        },
        "lblAccFieldValue2":(self.isAccountCentric === true) ? 
        {"text": accountHolder.fullname,
         "info":{"value":accountHolder.fullname},
         "tooltip":accountHolder.fullname}:
        {"text":self.AdminConsoleCommonUtils.getTruncatedString(record.Membership_id, 17, 15) ,
         "info":{"value":record.Membership_id},
         "tooltip":record.Membership_id },
        "lblAccountText": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT"),
        "lblAccFieldHeader1": kony.i18n.getLocalizedString("i18n.Group.TYPE"),
        "lblAccFieldHeader2":(self.isAccountCentric === true) ?
        kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.JOINT_HOLDER_NAME") : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
        "btnAddAccount": {
           "onClick": (self.isAccountCentric === true) ? self.addSelectedAccount : self.addSelectedAccountCustCentric
        },
        "name": record.accountName|| record.AccountName,
        "holder": accountHolder.fullname||"-",
        "Membership_id":record.Membership_id,
        "lblLine":{"text": "-"},
        "template": "flxAvailableAccounts",
        "completeRecord" : completeRecord,
        "accountId": record.account_id|| record.Account_id
      };
    });
    return result;
  },
  /*
   * function to map data to selected segment
   * @param: customer assigned accounts
   * @return: mapped data for segment
	*/
  mapSelectedSegmentData : function(data){
    var self =this;
    var result = [];
    var widgetMap = {
      "flxClose": "flxClose",
      "fontIconClose": "fontIconClose",
      "lblOption": "lblOption",
      "accountId": "accountId",
      "Membership_id": "Membership_id",
      "tin": "tin",
      "name":"name",
      "holder":"holder",
      "accountType": "accountType",
      "flxOptionAdded": "flxOptionAdded"
    };
    self.view.addAndRemoveAccounts.segSelectedOptions.widgetDataMap = widgetMap;
    result = data.map(function(record){
      var accountHolder={};
      if(record.AccountHolder){
        try {
          accountHolder= JSON.parse(record.AccountHolder);
        }  catch (err) {
          kony.print("Invalid JSON format for AccountHolder");
        }
      }
      else if(record.accountHolder){
        try{
          accountHolder= JSON.parse(record.accountHolder);
        } catch (err) {
          kony.print("Invalid JSON format for AccountHolder");
        }
      }
      return {
        "flxClose": {
          "onClick": function () {
            self.removeSelectedAccount();
          },
          "isVisible":true
        },
        "fontIconClose": {
          "text": "\ue929",
          "tooltip": kony.i18n.getLocalizedString("i18n.frmCompanies.Remove_account")
        },
        "lblOption": {
          "text": "Account  " + self.AdminConsoleCommonUtils.getTruncatedString(record.Account_id, 15, 12),
          "tooltip": record.Account_id
        },
        "accountId": record.Account_id,
        "Membership_id": record.Membership_id || "-",
        "tin": record.Taxid || "-",
        "name": record.accountName||record.Account_Type,
        "holder":accountHolder.fullname || "-",
        "accountType": record.Account_Type,
        "template": "flxOptionAdded"
      };
    });
    return result;
  },
  /*
	 * (Add Accounts) add left segment selected row to right segment
	 */
  addSelectedAccount: function () {
    var self = this;
    var selectedRowData = [];
    var rowIndex = self.view.addAndRemoveAccounts.segAddOptions.selectedIndex[1];
    selectedRowData = self.view.addAndRemoveAccounts.segAddOptions.data[rowIndex];
    var widgetMap = {
      "flxClose": "flxClose",
      "fontIconClose": "fontIconClose",
      "lblOption": "lblOption",
      "accountId": "accountId",
      "Membership_id": "Membership_id",
      "tin": "tin",
      "name":"name",
      "holder":"holder",
      "accountType": "accountType",
      "flxOptionAdded": "flxOptionAdded"
    };
    var recordToRemove = {
      "flxClose": {
        "onClick": function () {
          self.removeSelectedAccount();
        }
      },
      "fontIconClose": {
        "text": "\ue929",
        "tooltip": kony.i18n.getLocalizedString("i18n.frmCompanies.Remove_account")
      },
      "lblOption": {
        "text": "Account  " + self.AdminConsoleCommonUtils.getTruncatedString(selectedRowData.lblAccountNum.text, 15, 12),
        "tooltip": selectedRowData.lblAccountNum.text
      },
      "accountId": selectedRowData.lblAccountNum.text,
      "Membership_id": selectedRowData.Membership_id,
      "name":selectedRowData.lblAccFieldValue1.text,
      "holder":selectedRowData.holder,
      "accountType": selectedRowData.lblAccFieldValue1.text,
      "template": "flxOptionAdded"
    };
    self.assignedAccounts.push(recordToRemove);
    self.view.addAndRemoveAccounts.segSelectedOptions.widgetDataMap = widgetMap;
    if(self.view.addAndRemoveAccounts.segSelectedOptions.data.length === 0){
      self.view.addAndRemoveAccounts.segSelectedOptions.setData([recordToRemove]);
    }else{
      self.view.addAndRemoveAccounts.segSelectedOptions.addDataAt(recordToRemove, 0);
    }
    self.view.addAndRemoveAccounts.segAddOptions.removeAt(rowIndex);
    self.view.addAndRemoveAccounts.segSelectedOptions.info.segData = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    self.view.addAndRemoveAccounts.segAddOptions.info.segData = self.view.addAndRemoveAccounts.segAddOptions.data;
    self.showHideAddRemoveSegment();
    if((new Map(JSON.parse(self.accountsMap))).has(selectedRowData.lblAccountNum.text)){
    var selectedAccountFeatures = (new Map(JSON.parse(self.accountsMap))).get(selectedRowData.lblAccountNum.text);
    self.modifiedAccountsMap.set(selectedRowData.lblAccountNum.text, selectedAccountFeatures);
    }
    else{
    var accountMap= new Map(JSON.parse(self.accountsMap));
    accountMap.set(selectedRowData.lblAccountNum.text, JSON.parse(self.sampleAccountFeatures));
    self.accountsMap=JSON.stringify(Array.from(accountMap));
    self.modifiedAccountsMap.set(selectedRowData.lblAccountNum.text, JSON.parse(self.sampleAccountFeatures));
    }
    self.view.flxAccountError.setVisibility(false);
    self.view.addAndRemoveAccounts.top="0px";
    self.view.forceLayout();
  },
  /*
	 * (Remove Accounts) add right segment selected row to left segment
	 */
  removeSelectedAccount: function (index) {
    var self = this;
    var selectedRowData = [];
    var rowIndex = (index!==undefined)?index:self.view.addAndRemoveAccounts.segSelectedOptions.selectedIndex[1];
    selectedRowData = self.view.addAndRemoveAccounts.segSelectedOptions.data[rowIndex];
    var recordToAdd = {
      "lblAccountNum": {
        "text": selectedRowData.accountId
      },
      "lblAccFieldValue1": {
        "text": selectedRowData.accountType
      },
      "lblAccFieldValue2": (self.isAccountCentric === true) ? {
        "text": self.AdminConsoleCommonUtils.getTruncatedString(selectedRowData.holder, 13, 10),
        "info": {
          "value": selectedRowData.holder
        },
        "tooltip": selectedRowData.holder
      }:{
        "text": self.AdminConsoleCommonUtils.getTruncatedString(selectedRowData.Membership_id, 13, 10),
        "info": {
          "value": selectedRowData.Membership_id
        },
        "tooltip": selectedRowData.Membership_id
      },
      "lblAccountText": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT"),
      "lblAccFieldHeader1": kony.i18n.getLocalizedString("i18n.Group.TYPE"),
      "lblAccFieldHeader2": (self.isAccountCentric === true) ?
           kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.JOINT_HOLDER_NAME") : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
      "btnAddAccount": {
        "onClick": self.addSelectedAccount
      },
      "name": selectedRowData.name,
      "holder": selectedRowData.holder,
      "Membership_id":selectedRowData.Membership_id,
      "tin":selectedRowData.tin,
      "lblLine":{"text": "-"},
      "template": "flxAvailableAccounts"
    };
    self.removeAccountFromAssignedAccounts(recordToAdd.lblAccountNum.text);
    self.view.addAndRemoveAccounts.segAddOptions.addDataAt(recordToAdd, 0);
    self.view.addAndRemoveAccounts.segSelectedOptions.removeAt(rowIndex);
    self.view.addAndRemoveAccounts.segSelectedOptions.info.segData = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    self.view.addAndRemoveAccounts.segAddOptions.info.segData = self.view.addAndRemoveAccounts.segAddOptions.data;
    self.showHideAddRemoveSegment();
    self.modifiedAccountsMap.delete(selectedRowData.accountId);
    self.view.forceLayout();
  },
  /*
	 * reset the added accounts in selected accounts column
	 */
    resetAccounts :  function(){
    var self = this;
    var selectedAcc = [];
    selectedAcc = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    var len=selectedAcc.length;
    if(self.isAccountCentric === true){ //for account centric 
      for(var k=0;k<len;k++)
      {
         self.removeSelectedAccount(0);
      }  
    }else{ //for customer centric
      for(var i=0; i<selectedAcc.length; i++){
        var rowsData = self.view.addAndRemoveAccounts.segSelectedOptions.data[i][1];
        for(var j=0;j< rowsData.length;j++){
          var recordToAdd = self.mapRemovedAccountToAvailableAcc(rowsData[j]);
          self.view.addAndRemoveAccounts.segAddOptions.addDataAt(recordToAdd,0);
        }
      }
    }
    self.view.addAndRemoveAccounts.segSelectedOptions.setData([]);
    self.view.addAndRemoveAccounts.segSelectedOptions.info.segData = [];
    self.showHideAddRemoveSegment();      
    var otherFeaturesAndActions=self.modifiedAccountsMap.get(-1);
    self.modifiedAccountsMap.clear();
    self.modifiedAccountsMap.set(-1,otherFeaturesAndActions);
    self.view.forceLayout();
  },
  
  /*
	 * validation to check atleast one account is assigned
	 */
  checkAccountValidation: function () {
    var self = this;
    var selectedAcc = [];
    selectedAcc = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    var isValid=(selectedAcc.length > 0);
    if(isValid){
        self.view.flxAccountError.setVisibility(false);
        self.view.addAndRemoveAccounts.top="0px";
    }
      else{
        self.view.flxAccountError.setVisibility(true);
        self.view.addAndRemoveAccounts.top="60px";
        isValid = false;
      }
    return isValid;
  },
  /*
	 * hide/show segment or noResultsFound in accounts screen
	 */
  showHideAddRemoveSegment: function () {
    var self = this;
    var availableSegData = [],
        selectedSegData = [];
    availableSegData = self.view.addAndRemoveAccounts.segAddOptions.data;
    selectedSegData = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    self.view.addAndRemoveAccounts.segAddOptions.setVisibility(availableSegData.length > 0);
    self.view.addAndRemoveAccounts.segSelectedOptions.setVisibility(selectedSegData.length > 0);
    self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.setVisibility(availableSegData.length <= 0);
    self.view.addAndRemoveAccounts.rtxSelectedOptionsMessage.setVisibility(selectedSegData.length <= 0);
    self.view.addAndRemoveAccounts.btnRemoveAll.setVisibility(selectedSegData.length > 0);
    //validation -atleast one account should be selected
    /*if (selectedSegData.length > 0) {
      self.view.commonButtonsAccounts.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      self.view.commonButtonsAccounts.btnSave.hoverSkin= "sknBtn005198LatoRegular13pxFFFFFFRad20px";
      self.view.commonButtonsAccounts.btnSave.focusSkin= "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      self.view.commonButtonsAccounts.btnSave.setEnabled(true);
      self.view.addAndRemoveAccounts.flxError.setVisibility(false);
    } else {
      self.view.commonButtonsAccounts.btnSave.skin = "btnSkinGrey";
      self.view.commonButtonsAccounts.btnSave.hoverSkin= "btnSkinGrey";
      self.view.commonButtonsAccounts.btnSave.focusSkin= "btnSkinGrey";
      self.view.commonButtonsAccounts.btnSave.setEnabled(false);
    }*/
    //selected accounts container skin change
    if(selectedSegData.length > 0 && self.isAccountCentric === false){
      self.view.addAndRemoveAccounts.flxSegSelectedOptions.skin = "sknflxffffffBordere1e5ed4Px";
    }else{
      self.view.addAndRemoveAccounts.flxSegSelectedOptions.skin = "sknflxf9f9f9Border1pxRad4px";
    }
    self.view.forceLayout();
  },
  /*
  	*Fill data for salutation
    */
    fillSalutation: function () {
    var data = [];
    data.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_Salutation")]);
    data.push([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mr"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mr")]);
    data.push(["Mrs.", "Mrs."]);
    data.push(["Dr.", "Dr."]);
    data.push(["Ms.", "Ms."]);
    this.view.lstBxSalutation.masterData = data;
    this.view.lstBxSalutation.selectedKey = "lbl1";
  },
    fillCustomerFlags: function () {
      var StatusGroup=[{Description: "Defaulter",Type_id: "STID_CUSTOMERFLAGS",id: "SID_DEFAULTER"},{Description: "Fraud Detected",Type_id: "STID_CUSTOMERFLAGS",id: "SID_FRAUDDETECTED"},{Description: "High Risk",Type_id: "STID_CUSTOMERFLAGS",id: "SID_HIGHRISK"}];
    for (var i = 1; i <=3; i++) {
      this.view["lblFlag" + i].text = StatusGroup[i - 1].Description;
      this.view["imgFlag" + i].info = {
        "Key": StatusGroup[i - 1].id
      };
    }
  },
  /*
   * forming request payload for creating new  customer
   */
  createCustomerRequest : function(){
    var self = this;
    if(self.validateCurrentTabDetails()){
      var featuresArray =self.obtainFeaturesPayloadFromModifiedMap();
      var selRoleId = self.selectedRoleId;
      var accounts =[]; 
      if(self.isAccountCentric===true){
        accounts= (self.assignedAccounts).map(function(rec){
          return self.getAccountJson(rec.accountId, rec.name);
        });
      }
      else{
        accounts=self.fetchCustomerCentricAccountsSelected();
      }
      accounts = (accounts).map(
        function(rec){
        return {
          "accountName":rec.lblAccountType,
          "accountId":rec.lblAccountNumber.text
        };
    });
    var selDate = self.view.customCalCustomerDOB.value;
    var formatDate = selDate.split("/");
    var dob = formatDate[2] +"-"+formatDate[0]+"-"+formatDate[1];
    var inputParam = {
      "MiddleName": self.view.textBoxEntry12.tbxEnterValue.text || "",
      "UserName": self.view.textBoxEntry21.tbxEnterValue.text,
      "Email":self.view.textBoxEntry22.tbxEnterValue.text,
      "Phone":self.view.textBoxEntry23.txtISDCode.text +"-"+self.view.textBoxEntry23.txtContactNumber.text,
      "DrivingLicenseNumber":self.view.textBoxEntry33.tbxEnterValue.text,
      "accounts": JSON.stringify(accounts),
      "features": JSON.stringify(featuresArray),
      "Role_id":selRoleId
    };
    if(self.action === self.actionConfig.create){
      inputParam.DateOfBirth=dob;
      inputParam.Ssn=self.view.textBoxEntry32.tbxEnterValue.text;
      inputParam.FirstName= self.view.textBoxEntry11.tbxEnterValue.text;
      inputParam.LastName= self.view.textBoxEntry13.tbxEnterValue.text;
      inputParam.Type_id = self.comapnyDetails.type;
      inputParam.Organization_id = self.comapnyDetails.companyID;
      if(self.isAuthorizedSignatoryFlow===true){
        inputParam.isAuthSignatory="true";
        inputParam.authSignatoryType=self.view.lbxAuthType.selectedKey;
        inputParam.serviceKey=self.currentServiceKey;
        self.presenter.createSignatory(inputParam,inputParam.Organization_id);
      }
      else self.presenter.createCustomer(inputParam,inputParam.Organization_id);
    }else{
      inputParam.id = self.customerDetails.id;
      var listOfRemovedRisks = [],
          listOfAddedRisks = [],
          selectedFlags = [];
      inputParam.RiskStatus={ListRemovedRisk:[],ListAddedRisk:[]};
      if(this.view.flxEagreementDetails.isVisible)
        inputParam.isEagreementSigned=this.view.switchEagreement.selectedIndex===1?"false":"true";
      for (var i = 1; i <= 3; i++) {
        if (self.view["imgFlag" + i].src === self.AdminConsoleCommonUtils.checkboxSelected) {
          selectedFlags.push(self.view["imgFlag" + i].info.Key);
        }
      }
      var initialFlagList = self.view.flxSelectFlags.info.initialFlagList;

      var calculateList = function (a1, a2) {
        return a1.filter(function (x) {
          var result = false;
          if (a2.indexOf(x) < 0) result = true;
          return result;
        });
      };

      listOfAddedRisks = calculateList(selectedFlags, initialFlagList);
      listOfRemovedRisks = calculateList(initialFlagList, selectedFlags);
      inputParam.RiskStatus.ListRemovedRisk=listOfRemovedRisks;
      inputParam.RiskStatus.ListAddedRisk=listOfAddedRisks;
      inputParam.RiskStatus = JSON.stringify(inputParam.RiskStatus);
      var orgId = self.customerDetails.company.id;
      
      var prevForm = kony.application.getPreviousForm();
      var navParam;
      if(prevForm.id !== "frmCompanies"){
        navParam = {"name":"frmCustomerCreate","data": self.navigatedFromCustomerTab};
      }if(self.isAuthorizedSignatoryFlow===true){
        inputParam.isAuthSignatory="true";
        inputParam.authSignatoryType=self.view.lbxAuthType.selectedKey;
        self.presenter.editSignatory(inputParam,orgId,navParam);
      }
      else self.presenter.editCustomer(inputParam,orgId, navParam);
    }
    }
  },
  /*
   * show the changes in accounts screen based on type
   */
  adjustAccountsUIBasedOnType : function(){
    var self =this;
     if(self.isAccountCentric === false){ //customer centric
      self.view.addAndRemoveAccounts.lblSelSearchType.text = kony.i18n.getLocalizedString("i18n.customerSearch.MemberID");
      self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmCompaniesController.SearchByCustomerIDToViewResults");
      self.view.addAndRemoveAccounts.tbxFilterSearch.placeholder = kony.i18n.getLocalizedString("i18n.frmCompaniesController.SearchByCustomerID");
    } else{ //account centric
      self.view.addAndRemoveAccounts.lblSelSearchType.text = kony.i18n.getLocalizedString("i18n.frmCompaniesController.AccountID");
      self.view.addAndRemoveAccounts.rtxAvailableOptionsMessage.text = kony.i18n.getLocalizedString("i18n.frmCompanies.SearchByAccountNumToViewResults");
      self.view.addAndRemoveAccounts.tbxFilterSearch.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.Search_by_accountNo");
    }
    self.view.forceLayout();
  },
  /*
   * call to verify if username is availble and OFAC check
   */
  checkUsernameAvailability : function(){
    var self = this;
    var usernameParam = "",ofacParam = "";
    var usernameValid = self.userNameValidation();
    if(usernameValid){
      usernameParam = {"UserName" :self.view.textBoxEntry21.tbxEnterValue.text};
      ofacParam = self.OFACverification();
      self.presenter.verifyUsername(usernameParam,ofacParam);
    }
  },
  /*
   * display if username can be used or not
   */
  displayUsernameAvailability : function(response){
    var self = this;
    if(response.userAvailable){
      self.view.textBoxEntry21.flxInlineError.setVisibility(false);
      self.view.lblUsernameCheck.setVisibility(true);
    }else{
      self.view.lblUsernameCheck.setVisibility(false);
      self.view.textBoxEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Not_Available");
      self.view.textBoxEntry21.flxInlineError.setVisibility(true);
    }
    self.view.forceLayout();
  },
  /*
   * call for OFAC verification
   * @return : request payload
   */
  OFACverification : function(){
    var self = this;
    var ssn = self.view.textBoxEntry32.tbxEnterValue.text;
    var dobValue = self.view.customCalCustomerDOB.value;
    var dob = dobValue.replace(/\//g,"-");  //mm/dd/yyyy to mm-dd-yyyy
    return {"DateOfBirth":dob,
            "Ssn":ssn};
  },
  /*
   * display the selected type for search
   */
  dispalySelectedType : function(){
    var self = this;
    var selType ="",curType = "",ind = "";
    var selRowData = self.view.addAndRemoveAccounts.segSearchType.selectedRowItems[0];
    ind = self.view.addAndRemoveAccounts.segSearchType.selectedRowIndex[1];
    selType = selRowData.lblValue;
    curType = self.view.addAndRemoveAccounts.lblSelSearchType.text;
    selRowData.lblValue = curType;
    self.view.addAndRemoveAccounts.segSearchType.setDataAt(selRowData, ind);
    self.view.addAndRemoveAccounts.lblSelSearchType.text = selType;
    self.view.addAndRemoveAccounts.flxSegSearchType.setVisibility(false);
    self.view.forceLayout();
  },
  onClickOfNextFromDetails : function(OFACResponse){
    var self = this;
    var isValid = OFACResponse.canProceed;
    self.view.flxOFACError.setVisibility(!isValid);
    var isValidAccounts=true;
    var isRoleValid=true;
    if(self.action===self.actionConfig.create){
    	var selectedAcc = self.view.addAndRemoveAccounts.segSelectedOptions.info.segData;
        isValidAccounts= (selectedAcc===undefined)?false:(selectedAcc.length > 0);
        isRoleValid=(!self.selectedRoleId==="");
    }
      if(isValid && (self.tabClick === 2)) {
        self.showAccountsScreen();
      } else if(isValid && (self.tabClick === 3) && isValidAccounts){
        self.showAssignRolesScreen();
      } else if(isValid && (self.tabClick === 4) && isValidAccounts && isRoleValid){
        self.showAccountLevelFeaturesAndActions();
      } else if(isValid && (self.tabClick === 5) && isValidAccounts && isRoleValid){
        self.showOtherFeaturesAndActions();
      } else if(isValid && (self.tabClick === 6) && isValidAccounts && isRoleValid){
        self.showAssignLimits();
      } else if(!isValid){
        self.view.alertMessage.skin = "sknRedBorder";
        self.view.alertMessage.flxLeftImage.skin = "sknRedFill";
        self.view.alertMessage.lblData.text = kony.i18n.getLocalizedString("i18n.frmCompanies.errorToast_verify_OFAC_fail");
      }
  },
 /*
  * fill data for edit customer screen
  */
  setCustomerDetailsForEdit : function(data){
    var self =this;
    self.editCustomerID = data.id;
    var dob = (data.DateOfBirth).split("-");
    var dateOfBirth = dob[1]+"/"+dob[2]+"/"+dob[0];
    var phone = data.Phone?data.Phone.replace(/ /g, ""):data.Phone; // remove whitespaces
    var isd = "",phn ="";
    if(phone.indexOf("-")>= 0){
      phn = phone.split("-")[1];
      isd = phone.split("-")[0].trim();
    } else {
      phone=(phone.charAt(0)==="+")?phone.substring(1):phone;
      var strLen=phone.length;
      if(strLen === 12){
        isd=phone.substring(0,2);
        phn=phone.substring(2,12);
      }    
      else
        phn = phone;
    }
    var formatDob= dob[1]+"-"+dob[2]+"-"+dob[0];
    //self.fillSalutation();
    //self.view.lstBxSalutation.selectedKey=data.Salutation?data.Salutation:"lbl1";
    self.view.textBoxEntry11.tbxEnterValue.text = data.FirstName;
    self.view.textBoxEntry12.tbxEnterValue.text = data.MiddleName;
    self.view.textBoxEntry13.tbxEnterValue.text = data.LastName;
    self.view.textBoxEntry21.tbxEnterValue.text = data.UserName;
    self.view.textBoxEntry22.tbxEnterValue.text = data.Email;
    self.view.textBoxEntry32.tbxEnterValue.text = data.Ssn;
    self.view.textBoxEntry33.tbxEnterValue.text = data.DrivingLicenseNumber;
    self.view.customCalCustomerDOB.value = dateOfBirth;
    self.view.customCalCustomerDOB.resetData = self.getLocaleDate(dateOfBirth);
    self.view.textBoxEntry23.txtISDCode.text = self.view.textBoxEntry23.addingPlus(isd);
    self.view.textBoxEntry23.txtContactNumber.text = phn;
    self.fillEAgreementAndRisk(data);
    if(this.isAuthorizedSignatoryFlow===true){
      if(data.signatorytypeId){
      this.view.lbxAuthType.selectedKey=data.signatorytypeId;
      this.view.tbxAuthType.text=this.view.lbxAuthType.selectedKeyValue[1];
      }
      this.view.flxType.setVisibility(true);
    }else
      this.view.flxType.setVisibility(false);
    self.view.flxCustomerDetails.setVisibility(true);	
    self.view.textBoxEntry31.tbxEnterValue.text=formatDob;
    self.disableFieldsInCustomerEditDetails();
    self.view.forceLayout();
  },
  fillEAgreementAndRisk : function(data){
    var self=this;
    self.fillCustomerFlags();
    var initialFlagList = [];
    if (data.customerFlags) {
      for (var i = 1; i <= 3; i++) {
        for (var j = 0; j < data.customerFlags.length; j++) {
          if (self.view["imgFlag" + i].info.Key === data.customerFlags[j].trim()) {
            self.view["imgFlag" + i].src = self.AdminConsoleCommonUtils.checkboxSelected;
            initialFlagList.push(self.view["imgFlag" + i].info.Key);
          }
        }
      }
    }
    self.view.flxSelectFlags.info = {
      "initialFlagList": initialFlagList
    };
    if (data.isEAgreementRequired === "0") {
      self.view.flxEagreementDetails.setVisibility(false);
    } else {
      self.view.flxEagreementDetails.setVisibility(true);
    }
    // Set e-agreement status
    if (data.isEagreementSigned === "false") {
      self.view.switchEagreement.selectedIndex = 1;
    } else {
      self.view.switchEagreement.selectedIndex = 0;
    }
  },
  /*
  * validations for username
  *@returns : true or false
  */
  userNameValidation : function(){
    var self = this;
    var isValid = true;
    if(self.action === self.actionConfig.create){
      var usernameRegexString = "^([a-zA-Z0-9sp]+)$";
      var supportedSymbols="";
      if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
        supportedSymbols = self.usernameRulesAndPolicy.usernamerules.supportedSymbols.replace(/,/g, "");
        supportedSymbols = supportedSymbols.replace("-","\\-");
        usernameRegexString = usernameRegexString.replace(/sp/g, supportedSymbols);
      }
      else {
        usernameRegexString = usernameRegexString.replace(/sp/g, '');
      }
      var usernameRegex = new RegExp(usernameRegexString);
      var enteredText=self.view.textBoxEntry21.tbxEnterValue.text.trim();
      if (enteredText === "") {
        self.view.textBoxEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Username_cannot_be_empty");
        isValid = false;
      } else if(enteredText.length < self.usernameRulesAndPolicy.usernamerules.minLength){
        self.view.textBoxEntry21.lblErrorText.text = "Enter atleast " + self.usernameRulesAndPolicy.usernamerules.minLength + " characters";
        isValid = false;
      } else if(enteredText.length > self.usernameRulesAndPolicy.usernamerules.maxLength){
        self.view.textBoxEntry21.lblErrorText.text = "Enter max of " + self.usernameRulesAndPolicy.usernamerules.maxLength + " characters only";
        isValid = false;
      } 
      else if(usernameRegex.test(enteredText) === false){
        if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
          self.view.textBoxEntry21.lblErrorText.text = "Only following special characters allowed: " + self.usernameRulesAndPolicy.usernamerules.supportedSymbols;
        }
        else {
          self.view.textBoxEntry21.lblErrorText.text = "No special characters allowed";
        }
        isValid = false;
      }
      else if(self.validateOnSpecialCharacter(enteredText,supportedSymbols) === false){
        self.view.textBoxEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.lblRulesB");
        isValid = false;
      }
      //check if 1st character is alpha numeric
      else if(self.isAlphaNumeric(enteredText.charCodeAt(0))===false){
        self.view.textBoxEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18.frmCustomerCreate.error.firstCharAlphaNumeric");
        isValid = false;
      }
      //check if 1st character is alpha numeric
      else if(self.isAlphaNumeric(enteredText.charCodeAt(enteredText.length-1))===false){
        self.view.textBoxEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18.frmCustomerCreate.error.lastCharAlphaNumeric");
        isValid = false;
      }
      else if(self.validateSameConsecutiveSpecialCharacters(enteredText)===false){
        self.view.textBoxEntry21.lblErrorText.text = kony.i18n.getLocalizedString("i18.frmCustomerCreate.error.consecutiveSpecialCharsNotAllowed");
        isValid = false;
      }
    }
    if(isValid===false){
      self.view.textBoxEntry21.flxEnterValue.skin = "sknflxEnterValueError";
      self.view.textBoxEntry21.flxInlineError.setVisibility(true);
    }
    return isValid;
  },
  
  setUsernameRulesAndPolicy : function(usernameRulesAndPolicy) {
    var scopeObj = this;
    
    scopeObj.usernameRulesAndPolicy.usernamerules = usernameRulesAndPolicy.usernamerules;
    for(var i=0; i<usernameRulesAndPolicy.usernamepolicy.length; ++i) {
      if(usernameRulesAndPolicy.usernamepolicy[i].locale === "en-US") {
        scopeObj.usernameRulesAndPolicy.usernamepolicy = usernameRulesAndPolicy.usernamepolicy[i].content;
        break;
      }
    }
  },
    
  rulesLabelClick : function() {
    var scopeObj = this;
    
    if(this.view.flxUsernameRules.isVisible === false) {
      scopeObj.view.flxUsernameRules.setVisibility(true);
      scopeObj.view.rtxUsernameRules.text = scopeObj.usernameRulesAndPolicy.usernamepolicy;
    }
    else {
      scopeObj.view.flxUsernameRules.setVisibility(false);
    }
    
    this.view.forceLayout();
  },
  /*
   * function to display salutation and risk flags while editing customer
   */
  showCreateEditSpecificUI : function(){
    var self = this;
    if(self.action === self.actionConfig.create){
      self.view.textBoxEntry21.tbxEnterValue.setEnabled(true);
      self.view.textBoxEntry21.tbxEnterValue.skin="sknTbx485c75LatoReg13pxNoBor";
      self.view.textBoxEntry32.tbxEnterValue.setEnabled(true);
      self.view.textBoxEntry32.tbxEnterValue.skin="sknTbx485c75LatoReg13pxNoBor";
      self.view.textBoxEntry11.tbxEnterValue.setEnabled(true);
      self.view.textBoxEntry11.tbxEnterValue.skin="sknTbx485c75LatoReg13pxNoBor";
      self.view.textBoxEntry13.tbxEnterValue.setEnabled(true);
      self.view.textBoxEntry13.tbxEnterValue.skin="sknTbx485c75LatoReg13pxNoBor";
      self.view.textBoxEntry31.tbxEnterValue.setVisibility(false);
      self.view.customCalCustomerDOB.setEnabled(true);
      self.view.flxCalendarDOB.setVisibility(true);
      self.view.textBoxEntry21.btnCheck.setEnabled(true);
      self.view.flxSalutation.setVisibility(false);
      self.view.flxRow4.setVisibility(false);
      self.view.flxType.setVisibility(false);
      self.view.verticalTabsCustomer.flxOption0.setVisibility(true);
    }
    self.view.forceLayout();
  },
  /*
   * function to check/uncheck risk flags checkboxes
   * @param : image widget path
   */
  selectRiskFlag : function(widget){
    var self = this;
    if(widget.src === self.AdminConsoleCommonUtils.checkbox){
      widget.src = self.AdminConsoleCommonUtils.checkboxSelected;
    }else if(widget.src === self.AdminConsoleCommonUtils.checkboxSelected){
       widget.src = self.AdminConsoleCommonUtils.checkbox;
    }
    self.view.forceLayout();
  },
  setDataForRolesSegment : function(roles){
    var self = this;
    var dataMap = {
      "flxCustomerProfileRoles": "flxCustomerProfileRoles",
      "flxRoleNameContainer": "flxRoleNameContainer",
      "flxRoleCheckbox": "flxRoleCheckbox",
      "imgRoleCheckbox": "imgRoleCheckbox",
      "flxRoleInfo": "flxRoleInfo",
      "lblRoleName": "lblRoleName",
      "lblRoleDesc": "lblRoleDesc",
      "btnViewDetails": "btnViewDetails",
      "flxRoleRadio":"flxRoleRadio",
      "imgRoleRadio": "imgRoleRadio",
      "flxDefaultRoleButton":"flxDefaultRoleButton"
    };
    var data = [];
    var toAdd;
    if (roles.length > 0) {
      self.view.flxResults.setVisibility(true);
      self.view.flxScrollCustomerRoles.height=((kony.os.deviceInfo().screenHeight-296)-15)+"px";
      self.view.flxNoResultsFound.setVisibility(false);
	  for (var i = 0; i < roles.length; i++) {
        toAdd = {

          "flxCustomerProfileRoles": "flxCustomerProfileRoles",
          "flxRoleNameContainer": "flxRoleNameContainer",
          "flxRoleCheckbox": {"isVisible":false},
          "imgRoleCheckbox": "imgRoleCheckbox",
          "flxRoleInfo": "flxRoleInfo",
          "lblRoleName": roles[i].name,
          "lblRoleDesc": roles[i].description,
          "btnViewDetails": {"text":"View Details","isVisible":true},
          "template": "flxCustomerProfileRoles",
          "id": roles[i].id,
          "imgRoleRadio": {"src": self.isRoleSelected(roles[i])},
          "flxRoleRadio": {"isVisible":true},
          "flxDefaultRoleButton":{"isVisible":self.defaultRole===roles[i].id}
        };
        data.push(toAdd);
        self.onClickActionRoleSegment(toAdd,roles[i]);
      }
      this.view.segCustomerRolesEdit.widgetDataMap = dataMap;
      this.view.segCustomerRolesEdit.setData(data);
      this.view.segCustomerRolesEdit.info = {
        "data": data,
        "searchAndSortData": data
      };        
      this.view.flxResults.setVisibility(true);
      
    }else{
     self.view.flxResults.setVisibility(false);
     self.view.flxNoResultsFound.setVisibility(true);
    }
    this.view.forceLayout();
  },
  showViewRoleFeaturesList : function(features){
    //if(features.length>0){
    this.view.flxFeaturesList.removeAll();
    var screenWidth = kony.os.deviceInfo().screenWidth;
    for (var i = 0; i < features.length; i++) {
      // Add dynamic companonet
      var ViewRoleFeaturesActionsToAdd = new com.adminConsole.customerRoles.ViewRoleFeaturesActions({
        "id": "dynamicsegment" + i,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT
      }, {}, {});
      ViewRoleFeaturesActionsToAdd.lblFeatureName.text=features[i].name;
      ViewRoleFeaturesActionsToAdd.statusValue.text=features[i].status === "SID_FEATURE_ACTIVE"?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      ViewRoleFeaturesActionsToAdd.statusIcon.skin=features[i].status === "SID_FEATURE_ACTIVE"?"sknFontIconActivate":"sknfontIconInactive";
      ViewRoleFeaturesActionsToAdd.statusIcon.text="\ue921";
      var actions= features[i].actions;
      // mapping actions segment
      var dataMap = {
      "lblActionName": "lblActionName",
      "lblActionDescription": "lblActionDescription"
      };
      var data=[];
      var action;
      for (var j = 0; j < actions.length; j++) {
        action = {

          "lblActionName": actions[j].name,
          "lblActionDescription": actions[j].description,
          "template": "flxRoleDetailsActions",
        };
        data.push(action);
      }
      ViewRoleFeaturesActionsToAdd.SegActions.widgetDataMap = dataMap;
      ViewRoleFeaturesActionsToAdd.SegActions.setData(data);
      this.view.flxFeaturesList.add(ViewRoleFeaturesActionsToAdd);
    }
    this.view.flxViewRolePopup.setVisibility(true);
  },
  onClickActionRoleSegment : function(toAdd,group){
    var self=this;
    toAdd.btnViewDetails.onClick=function(){
      self.view.lblFeatureName.text= group.name;
      self.view.lblViewRoleDescriptionValue.text= group.description;
      self.showViewRoleFeaturesList(group.features);
    };
    toAdd.flxRoleRadio.onClick=function(){
      self.toggleRadio();
    };
  },
  toggleRadio : function(index){
    var self=this;
    var rowIndex = index!==undefined?index:self.view.segCustomerRolesEdit.selectedIndex[1];
    var data = self.view.segCustomerRolesEdit.data;
    for(var i=0; i<data.length; i++){
      data[i].imgRoleRadio.src ="radio_notselected.png";
    }
    data[rowIndex].imgRoleRadio.src = "radio_selected.png";
    self.selectedRoleId=data[rowIndex].id;
    self.roleSelected=true;
    self.view.segCustomerRolesEdit.setData(data);
    //clear maps
    this.modifiedAccountsMap=new Map();
    // retrieve features and actions for a role
    var orgId;
    if(self.action === self.actionConfig.create){
      orgId=self.comapnyDetails.companyID;
    }else{
       orgId= self.customerDetails.company.id;
    }
    var payload={"organisationId":orgId,
                "roleId":self.selectedRoleId};
    self.presenter.getCustomerFeaturesAndActions(payload);
    if(self.view.flxRoleError.isVisible){
    self.view.flxRoleError.setVisibility(false);
    self.view.flxScrollCustomerRoles.height=((kony.os.deviceInfo().screenHeight-296)-15)+"px";
    }
    self.view.forceLayout();
  },
  populateAccountsLeftMenu : function(){
    var self = this;
    var dataMap = {
        "lblAccountNumber":"lblAccountNumber",
        "lblAccountType":"lblAccountType",
        "lblEntitlementsSeperator": "lblEntitlementsSeperator",
        "flxCompanyAccounts": "flxCompanyAccounts",
        "flxArrow": "flxArrow",
        "lblArrow":"lblArrow"
      };
    var accounts=[];
    if(self.isAccountCentric===true){
     accounts= (self.assignedAccounts).map(function(rec){
      return self.getAccountJson(rec.accountId, rec.name);
    });
    }
    else{
      accounts=self.fetchCustomerCentricAccountsSelected();
    }
    var widgetPath=(self.tabClick ===4 || self.tabClick===5) ? self.view.verticalTabsCustomer.segCompanyAccounts : self.view.verticalTabsCustomer.segCompanyAccount6;
    widgetPath.widgetDataMap=dataMap;
    widgetPath.setData(accounts);
  },
  fetchCustomerCentricAccountsSelected : function(){
    var self=this;
    var accounts=[];
    var accountsCustCentric= self.assignedAccounts;
      var accountsNameMap=new Map();
      for(var i=0;i<accountsCustCentric.length;i++){
          var record=accountsCustCentric[i].completeRecord;
          if(accountsNameMap.has(record.Account_id)===false){
             accountsNameMap.set(record.Account_id, record.AccountName);
             accounts.push(self.getAccountJson(record.Account_id, record.AccountName||record.AccountType))
          }
        }
    return accounts;
  },
  highLightSelectedAccount : function(rowIndex){
    var self=this;
    var widgetPath=(self.tabClick ===4 || self.tabClick===5) ? self.view.verticalTabsCustomer.segCompanyAccounts : self.view.verticalTabsCustomer.segCompanyAccount6;
    var data = widgetPath.data;
    var highLightAccount = true;
    if(rowIndex===0) widgetPath.selectedRowIndex=[0,0];
    if(self.tabClick===4 || self.tabClick===5)
	      self.populateAccountLevelFeatures(data[rowIndex].lblAccountNumber.text);
    else{
      if(self.view.flxCustomerAssignLimits.isVisible && (!self.view.flxNoLimitsFound.isVisible)){
        if(self.validateLimits()){
        self.populateAccountLevelLimits(data[rowIndex].lblAccountNumber.text);
        }else highLightAccount=false;
      }
      else
        self.populateAccountLevelLimits(data[rowIndex].lblAccountNumber.text);
    }
    if(highLightAccount){
    for(var i=0; i<data.length; i++){
      data[i].lblArrow.isVisible = false;
      data[i].lblAccountNumber.skin="skn73767812pxLato";
    }
    data[rowIndex].lblArrow.isVisible = true;
    data[rowIndex].lblAccountNumber.skin="sknlblLatoBold485c7512px";
    widgetPath.setData(data);
    self.prevAccountSelected=data[rowIndex].lblAccountNumber.text;
    }
    self.view.forceLayout();
  },
  getAccountJson : function(accountId,name){
    var json= {
        "lblAccountNumber":{"text":accountId,"skin":"skn73767812pxLato"},
        "lblAccountType":name,
        "lblEntitlementsSeperator": ".",
        "template": "flxCompanyAccounts",
        "flxArrow": {"isVisible":true},
        "lblArrow": {
          "text": "\ue918",
          "skin": "sknfontIconDescRightArrow14px",
          "isVisible":false
        }
      };
    return json
  },
  populateAccountLevelFeatures : function(accountNumber){
    var self = this;
    var features=self.modifiedAccountsMap.get(accountNumber);
    self.clearSearchBoxToDefaults();
    self.setFeaturesSegData(features,false);
    self.updateFeaturesCount();
    self.setAddAllorRemoveAllLabel();
    self.hideActionsList();
  },
  storeAccountsInMap : function(accounts,otherFeaturesAndActions){
    var self=this;
    var accountsMap = new Map();
    for(var i = 0; i<accounts.length; i++){
      accountsMap.set(accounts[i].id, accounts[i].features);      
    }
    //set otherFeaturesAndActions as accountNumber=-1
    accountsMap.set(-1,otherFeaturesAndActions);
    self.accountsMap=JSON.stringify(Array.from(accountsMap));
  },

  setFeaturesSegData : function(featuresData,isFilter){
    var scopeObj = this;
    if (featuresData === undefined) {
      this.view.addFeaturesAndActions.segAddOptions.setData([]);
    } else {
      var records = featuresData;
      if (records.length === 0) {
        if(isFilter){
          this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");          
        }else{
          this.view.addFeaturesAndActions.rtxAvailableOptionsMessage.text="No features found under the selected Account. Please select a different Account";
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
        var data = featuresData.map(scopeObj.mapFeaturesSegment.bind(scopeObj));
        scopeObj.view.addFeaturesAndActions.segAddOptions.info=data;
        scopeObj.view.addFeaturesAndActions.segAddOptions.widgetDataMap = dataMap;
        scopeObj.view.addFeaturesAndActions.segAddOptions.setData(data);
        scopeObj.view.addFeaturesAndActions.segAddOptions.setVisibility(true);
        scopeObj.setFeaturesFilterData();
        scopeObj.view.addFeaturesAndActions.lblAvailableOptionsHeading.text="All Features ("+data.length+")";
        //data changes for selected actions segment
        this.view.addFeaturesAndActions.segSelectedOptions.setData([]);
        this.view.addFeaturesAndActions.flxSegActionsList.setVisibility(false);
        this.view.addFeaturesAndActions.rtxSelectedOptionsMessage.setVisibility(true);
        this.view.forceLayout();
      }
    }
  },
  setFeaturesFilterData : function(){
    var featuresData=this.view.addFeaturesAndActions.segAddOptions.data;
    var statusList=[];
    var maxSizeText="";
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
    this.view.addFeaturesAndActions.flxFeatureTypeFilter.width=flexWidth+"px";
    this.view.addFeaturesAndActions.flxFeatureTypeFilter.left="preferred";
    this.view.addFeaturesAndActions.flxFeatureTypeFilter.right="5px";
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    this.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    this.view.forceLayout();
  },
  mapFeaturesSegment: function(feature) {
    var scopeObj = this;
    var status ="",statusSkin="";
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
      modifiedActions[i]["isImgChecked"] = modifiedActions[i].isAssigned==="1" ? "true" : "false";
    }
    if(feature.isAssigned==="0" && this.view.addFeaturesAndActions.btnSelectAll.isVisible===false)
      this.view.addFeaturesAndActions.btnSelectAll.setVisibility(true);

    return {
      "featureId": feature.id,
      "actions":modifiedActions,
      "orginalActions": scopeObj.getOriginalOrModifiedActions(feature.id,true),
      "description":feature.description,
      "status_id":feature.status,
      "lblFeatureName": {
        "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(feature.name,28,25),
        "tooltip":feature.name || ""
      },
      "flxFeatureCheckbox":{"onClick":scopeObj.toggleCheckbox},
      "imgFeatureCheckbox":{"src":scopeObj.checkForPartialFeature(feature)},
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
    } else{
      this.removeAllActions();
      segData[rowIndex].imgFeatureCheckbox.src="checkboxnormal.png";
      if(this.view.addFeaturesAndActions.btnSelectAll.text===kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll"))
        this.view.addFeaturesAndActions.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
    }
    this.view.addFeaturesAndActions.segAddOptions.setDataAt(segData[rowIndex],rowIndex);
    this.updateFeaturesCount();
    this.view.forceLayout();
  },
  checkForPartialFeature : function(featureData){
    var selActionsCount=0;
    var checkboxImg;
    var actions=featureData.actions;
    
    for(var i=0;i<actions.length;i++){
      if(actions[i].isAssigned==="1")
        selActionsCount++;
    }
    if(selActionsCount===actions.length)
      checkboxImg="checkboxselected.png";
    else if(selActionsCount===0)
      checkboxImg="checkboxnormal.png";
    else
      checkboxImg="checkboxpartial.png";
    return checkboxImg;
  },
  /*
  * check/add all the actions of the selected feature
  */
  selectAllActions : function(opt){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var segFeaturesData = self.view.addFeaturesAndActions.segAddOptions.data[selInd];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var actions = [];
    var check = ((self.prevSelectedFeature.length === 1 && (selInd === self.prevSelectedFeature[0])) ||
                 (self.prevSelectedFeature.length > 1 && (selInd === self.prevSelectedFeature[1])));
    self.updateValuesInAccountsMap(segFeaturesData.featureId,"","1");
    //actions shown are of current feature
    if(check){
      actions = self.view.addFeaturesAndActions.segSelectedOptions.data;
    } else{ //actions shown are not of current feature
      actions = segFeaturesData.actions;
    }
    for(var i=0;i< actions.length;i++){
      if(check){
        actions[i].isImgChecked = "true";
        actions[i].imgActionCheckbox.src = "checkboxselected.png";
      }
    }
    if(check) self.view.addFeaturesAndActions.segSelectedOptions.setData(actions);
    self.view.forceLayout();
  },
  /*
  * unchecks/remove's all the actions of that feature
  */
  removeAllActions : function(){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var segFeaturesData = self.view.addFeaturesAndActions.segAddOptions.data[selInd];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var actions = [];
    var check = ((self.prevSelectedFeature.length === 1 && (selInd === self.prevSelectedFeature[0])) ||
                 (self.prevSelectedFeature.length > 1 && (selInd === self.prevSelectedFeature[1])));
    self.updateValuesInAccountsMap(segFeaturesData.featureId,"","0");
    //actions shown are of current feature
    if(check){
      actions = self.view.addFeaturesAndActions.segSelectedOptions.data;
    } else{ //actions shown are not of current feature
      actions = segFeaturesData.actions;
    }
    for(var i=0; i<actions.length; i++){
      if(check){
        actions[i].isImgChecked = "false";
        actions[i].imgActionCheckbox.src = "checkboxnormal.png";
      }
    }
    if(check) self.view.addFeaturesAndActions.segSelectedOptions.setData(actions);
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
    if(this.view.addFeaturesAndActions.tbxSearchAvailableItems.text.trim().length===0)
      this.view.addFeaturesAndActions.lblAvailableOptionsHeading.text = count+ " "+ txt;
    this.view.forceLayout();
  },
  addAllFeatures : function(){
    var allFeatures=this.view.addFeaturesAndActions.segAddOptions.data;
    var allActions = {};
    for(var i=0;i<allFeatures.length;i++){
      allFeatures[i].imgFeatureCheckbox.src = "checkboxselected.png";
    }
    this.updateValuesInAccountsMapForAllFeatures("1");
    this.view.addFeaturesAndActions.segAddOptions.setData(allFeatures);
    this.updateFeaturesCount();
    this.view.forceLayout();
  },
  removeAllFeatures : function(){
    var allFeatures=this.view.addFeaturesAndActions.segAddOptions.data;
    var removedFeatures={};
    for(var i=0;i<allFeatures.length;i++){
      allFeatures[i].imgFeatureCheckbox.src = "checkboxnormal.png";
    }
    this.updateValuesInAccountsMapForAllFeatures("0");
    this.view.addFeaturesAndActions.segAddOptions.setData(allFeatures);
    this.updateFeaturesCount();
    this.view.forceLayout();
  },
  featuresRowClickHandler : function(){
    var selectedIndex=this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    this.selectedFeatureIndex=selectedIndex;
    var segData=this.view.addFeaturesAndActions.segAddOptions.data;
    var isChecked = (segData[selectedIndex].imgFeatureCheckbox.src === "checkboxnormal.png") ? false : true;
    //store previously selected feature index for validation purpose
    if(this.prevSelectedFeature.length < 2){
      this.prevSelectedFeature.push(selectedIndex);
    }else{ //update index
      this.prevSelectedFeature.shift();
      this.prevSelectedFeature.push(selectedIndex);
    }
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

    var actionsList = this.filterFeatureActionsforUpdatedRecords();
    this.setDataToActionsSegment(actionsList);
    //show Message in actions
    if(segData[selectedIndex].status_id === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
      this.showMessageInActions(true);
    } else{
      this.showMessageInActions(false);
    }
    this.view.addFeaturesAndActions.flxSegActionsList.setContentOffset({x:0,y:0});
    this.view.forceLayout();
  },
  /*
   * filter the actions of a feature for updating added/removed actions
   */
  filterFeatureActionsforUpdatedRecords: function () {
  	var selectedIndex = this.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
  	var segData = this.view.addFeaturesAndActions.segAddOptions.data;
  	var selActions = this.getOriginalOrModifiedActions(segData[selectedIndex].featureId,false);
  for (var i = 0; i < selActions.length; i++) {
  						     if(selActions[i].isAssigned==="1" && (this.action === this.actionConfig.edit))
            selActions[i].isImgChecked = "true";
       else
            selActions[i].isImgChecked = "false";
  }
  	return selActions;
  },
   /*
   * map actions data to actions segment
   * @param: list of actions for a feature 
   */
  setDataToActionsSegment : function(actions){
    var self = this;
    var widgetMap = {
      "id":"id",
      "description":"description",
      "isMFAApplicable":"isMFAApplicable",
      "isAccountLevel":"isAccountLevel",
      "isPrimaryAction": "isPrimaryAction",
      "type":"type",
      "limits":"limits",
      "displaySequence":"displaySequence",
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
    var segData = actions.map(function(rec){
      var limitsMap;
      if(rec.limits && (rec.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY)){
        limitsMap=rec.limits;
      }
      return{
        "id":rec.id,
        "displaySequence":rec.displaySequence,
        "isAssigned":rec.isAssigned,
        "description":rec.description,
        "isMFAApplicable":rec.isMFAApplicable,
        "isAccountLevel":rec.isAccountLevel,
        "isPrimaryAction": rec.isPrimary,
        "type":rec.type,
        "limits":rec.limits || [],
        "updatedLimits" : rec.limits || [],
        "isImgChecked": rec.isAssigned==="1",
        "flxActionDisabled":{"isVisible":true,"height":"180dp"},
        "lblNoDesc":".",
        "flxActionNameContainer": {"skin":"sknflxffffffBorderE1E5EERadius3px"},
        "flxActionLimits":{"isVisible":rec.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY ? true : false},
        "flxActionCheckbox": {"onClick": self.checkUncheckActions},
        "imgActionCheckbox": {"src":(rec.isAssigned === "1") ? "checkboxselected.png" :"checkboxnormal.png"},
        "lblActionName":{"text": rec.name},
        "lblMandatory":{"text": kony.i18n.getLocalizedString("i18n.frmGroupsController.MandatoryAction"),
                        "isVisible":rec.isPrimary === "true" ? true : false},
        "lblRowHeading1": kony.i18n.getLocalizedString("i18n.frmServiceManagement.PerTransactionLimitLC"),
        "lblCurrencySymbol1":{"text":self.currencyValue},
        "tbxLimitValue1":{"text":limitsMap? limitsMap.MAX_TRANSACTION_LIMIT : "",
                          "info":{"name":"MAX_TRANSACTION_LIMIT"},
                          "skin":"txtD7d9e0disabledf3f3f3NoBorder"},
        "flxLimitError1":{"isVisible":false},
        "lblLimitErrorIcon1":"",
        "lblLimitErrorMsg1":{"text":""},
        "flxLimitValue1":{"skin":"sknFlxbgF3F3F3bdrd7d9e0"},
        "lblRowHeading2": kony.i18n.getLocalizedString("i18n.frmServiceManagement.DailyTransactionLimitLC"),
        "lblCurrencySymbol2":{"text":self.currencyValue},
        "tbxLimitValue2":{"text":limitsMap ? limitsMap.DAILY_LIMIT : "",
                          "info":{"name":"DAILY_LIMIT"},
                          "skin":"txtD7d9e0disabledf3f3f3NoBorder"},
        "flxLimitError2":{"isVisible":false},
        "lblLimitErrorIcon2":"",
        "lblLimitErrorMsg2":{"text":""},
        "flxLimitValue2":{"skin":"sknFlxbgF3F3F3bdrd7d9e0"},
         "lblRowHeading3": kony.i18n.getLocalizedString("i18n.frmServiceManagement.WeeklyTransLimitLC"),
        "lblCurrencySymbol3":{"text":self.currencyValue},
        "tbxLimitValue3":{"text":limitsMap ? limitsMap.WEEKLY_LIMIT : "",
                          "info":{"name":"WEEKLY_LIMIT"},
                          "skin":"txtD7d9e0disabledf3f3f3NoBorder"},
        "flxLimitError3":{"isVisible":false},
        "lblLimitErrorIcon3":"",
        "lblLimitErrorMsg3":{"text":""},
        "flxLimitValue3":{"skin":"sknFlxbgF3F3F3bdrd7d9e0"},
        "template":"flxCustRolesSelectedActions",
      };
    });
    this.view.addFeaturesAndActions.segSelectedOptions.widgetDataMap = widgetMap;
    //arrange based on display sequence
    this.sortBy = this.getObjectSorter("displaySequence");
    this.sortBy.inAscendingOrder = true;
    if(segData.length > 0){
      var sortData = segData.sort(this.sortBy.sortData);
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
  /*
  * add or remove an action when checked/unchecked a row
  */
  checkUncheckActions: function () {
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var featuresSegData=self.view.addFeaturesAndActions.segAddOptions.data;
    var featureRowIndex=self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    //selecting checkbox
    if (segData[selInd].imgActionCheckbox.src === "checkboxnormal.png") {
      segData[selInd].imgActionCheckbox.src = "checkboxselected.png";
      self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(segData[selInd], selInd);
      self.updateValuesInAccountsMap(featuresSegData[featureRowIndex].featureId,segData[selInd].id, "1");
      //select the primary action on click of other actions
      if(segData[selInd].isPrimaryAction === "false"){
        self.checkPrimaryAction();
      }
    } else if (segData[selInd].imgActionCheckbox.src === "checkboxselected.png") { //un selecting checkbox
      if(segData[selInd].isPrimaryAction === "true"){
        //uncheck all action when primary action is unchecked
        self.removeAllActions();
      } else{
        segData[selInd].imgActionCheckbox.src = "checkboxnormal.png";
        self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(segData[selInd], selInd);
        self.updateValuesInAccountsMap(featuresSegData[featureRowIndex].featureId,segData[selInd].id, "0");
      }
    }
    self.setFeaturesCheckbox();
    self.setActionsCount();
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
   /*
   * check primary action when clicked on other non-primary actions first
   */
  checkPrimaryAction : function(){
    var self = this;
    var selInd = self.view.addFeaturesAndActions.segSelectedOptions.selectedRowIndex[1];
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var featuresSegData=self.view.addFeaturesAndActions.segAddOptions.data;
    var featureRowIndex=self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var primaryAction = "";
    for(var i=0;i<segData.length;i++){
      if(segData[i].isPrimaryAction === "true"){
        primaryAction = segData[i];

        if(primaryAction.imgActionCheckbox.src === "checkboxnormal.png"){
          primaryAction.imgActionCheckbox.src = "checkboxselected.png";
          self.view.addFeaturesAndActions.segSelectedOptions.setDataAt(primaryAction,i);
          self.updateValuesInAccountsMap(featuresSegData[featureRowIndex].featureId,segData[i].id,"1");
        }
      }
    }
  },
  setFeaturesCheckbox : function(){
    var self = this;
    var segData = self.view.addFeaturesAndActions.segSelectedOptions.data;
    var featuresSegData=self.view.addFeaturesAndActions.segAddOptions.data;
    var featureRowIndex=self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex[1];
    var allSelected=true;
    var nonSelected=true;
    for(var x=0;x<segData.length;x++){
      if(segData[x].imgActionCheckbox.src === "checkboxnormal.png"){
        allSelected=false;
      }else if(segData[x].imgActionCheckbox.src === "checkboxselected.png")
        nonSelected=false;
    }
   if(nonSelected===false){
     if(allSelected){
        featuresSegData[featureRowIndex].imgFeatureCheckbox.src="checkboxselected.png";
        self.updateValuesInAccountsMap(featuresSegData[featureRowIndex].featureId,"","1");
      }
      else{
        featuresSegData[featureRowIndex].imgFeatureCheckbox.src="checkboxpartial.png";
        //self.updateValuesInAccountsMap(featuresSegData[featureRowIndex].featureId,"","1");
      }
   }
   else{
      featuresSegData[featureRowIndex].imgFeatureCheckbox.src="checkboxnormal.png";
      self.updateValuesInAccountsMap(featuresSegData[featureRowIndex].featureId,"","0");
    }  
    self.view.addFeaturesAndActions.segAddOptions.setDataAt(featuresSegData[featureRowIndex],featureRowIndex);
    self.updateFeaturesCount();
    self.view.forceLayout();
  },
  /*
  * popup shown on click of reset actions buttons
  */
  showResetActionsPopup: function () {
  	var self = this;
  	this.view.resetActionsPopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ResetActions");
  	this.view.resetActionsPopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ResetActionsPopupMessage");
  	this.view.resetActionsPopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
  	this.view.resetActionsPopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
  	this.view.flxResetActionsPopup.setVisibility(true);
  	this.view.resetActionsPopup.btnPopUpDelete.onClick = function (event) {
  		self.view.flxResetActionsPopup.setVisibility(false);
  		self.resetFeatureActions();
  	};
  	this.view.forceLayout();
  },
   /*
  * reset actions segment data and update added/removed actions list
  */
  resetFeatureActions : function(){
    var self = this;
    var selFeatureInd = self.view.addFeaturesAndActions.segAddOptions.selectedRowIndex;
    var featuresData = self.view.addFeaturesAndActions.segAddOptions.data;
    if(selFeatureInd){
      var actions = featuresData[selFeatureInd[1]].orginalActions;
      self.setDataToActionsSegment(actions);
      var rowIndex = self.view.verticalTabsCustomer.segCompanyAccounts.selectedRowIndex[1];
      var data = self.view.verticalTabsCustomer.segCompanyAccounts.data;
     var accountNumber=self.tabClick===4? data[rowIndex].lblAccountNumber.text:-1;
      var originalFeatures=new Map(JSON.parse(self.accountsMap)).get(accountNumber);
      var modifiedFeatures=self.modifiedAccountsMap.get(accountNumber);
      for(var j=0; j<originalFeatures.length,j<modifiedFeatures.length;j++){
      if(featuresData[selFeatureInd[1]].featureId===originalFeatures[j].id && featuresData[selFeatureInd[1]].featureId===modifiedFeatures[j].id){
        modifiedFeatures.actions=originalFeatures.actions;
        break;
      }
    }
    }
    this.setFeaturesCheckbox();
  },
  fillFeatureDetails : function(){
    var selItem=this.view.addFeaturesAndActions.segAddOptions.data[this.selectedFeatureIndex];
    this.view.lblFeatureDetailsHeader2.text=selItem.lblFeatureName.tooltip;
    this.view.fontIconActive.text=selItem.lblIconStatus.text;
    this.view.fontIconActive.skin=selItem.lblIconStatus.skin;
    this.view.lblStatus.text=selItem.lblFeatureStatusValue.text;
    this.view.lblFeatureDescriptionValue.text=selItem.description;
    this.setViewFeatureActionsData(selItem.orginalActions);
    this.view.flxFeatureDetails.setVisibility(true);
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
        };
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
  performFeatureStatusFilter : function(){
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = this.view.addFeaturesAndActions.segAddOptions.info;
    var segStatusData = self.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.addFeaturesAndActions.FeatureTypeFilterMenu.segStatusFilterDropdown.selectedIndices;
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
   /*
   * function to clear search box to defaults
   */
  clearSearchBoxToDefaults : function(){
    var scopeObj =this;
    this.view.addFeaturesAndActions.tbxSearchAvailableItems.text="";
	    this.view.addFeaturesAndActions.flxClearSearch.setVisibility(false);
  },
  updateValuesInAccountsMap : function(featureId,actionId,isAssigned){
    var self=this;
    var currentAccountNumber;
    if(self.tabClick==5)// other features and actions
       currentAccountNumber=-1;
    else{
      var currentAccountRow= self.view.verticalTabsCustomer.flxAccountsLeftMenu.segCompanyAccounts.data[self.view.verticalTabsCustomer.flxAccountsLeftMenu.segCompanyAccounts.selectedRowIndex[1]];
      currentAccountNumber=currentAccountRow.lblAccountNumber.text;
    }
    var featuresForAccount= self.modifiedAccountsMap.get(currentAccountNumber);
    var featureActions=[];
    var j;
    for(j=0; j<featuresForAccount.length;j++){
      if(featureId===featuresForAccount[j].id){
        featureActions = featuresForAccount[j].actions;
        if(actionId === "") featuresForAccount[j].isAssigned=isAssigned;
        break;
      }
    }
    for(var k=0;k< featureActions.length;k++){
      if(actionId==="" || actionId===featureActions[k].id)
      		   featureActions[k].isAssigned=isAssigned;
    }
  },
  updateValuesInAccountsMapForAllFeatures : function(isAssigned){
    var self=this;
    var currentAccountNumber;
    if(self.tabClick==5)// other features and actions
       currentAccountNumber=-1;
    else{
      var currentAccountRow= self.view.verticalTabsCustomer.flxAccountsLeftMenu.segCompanyAccounts.data[self.view.verticalTabsCustomer.flxAccountsLeftMenu.segCompanyAccounts.selectedRowIndex[1]];
      currentAccountNumber=currentAccountRow.lblAccountNumber.text;
    }
    var featuresForAccount= self.modifiedAccountsMap.get(currentAccountNumber);
    var j,k;
    for(j=0; j<featuresForAccount.length;j++){
      //feature level
      featuresForAccount[j].isAssigned=isAssigned;
      //action level
      for(k=0;k< featuresForAccount[j].actions.length;k++){
         featuresForAccount[j].actions[k].isAssigned=isAssigned;
      }
    }
  },
  validateCurrentTabDetails : function(){
    var scopeObj = this;
    var isValid = true;
    if(scopeObj.view.flxSelectedCustomersAccountCentric.isVisible || scopeObj.view.flxCustomerCentricSearch.isVisible ){
      isValid=scopeObj.validateCustomerSelection();
      
      if (scopeObj.action===scopeObj.actionConfig.create){
        if((scopeObj.detailsScreenValidation()===false && scopeObj.tabClick>1)||(scopeObj.checkAccountValidation()===false && scopeObj.tabClick>2)||(scopeObj.selectedRoleId==="" && scopeObj.tabClick>3)){
          isValid=false;
        }
      }
    }
    else if(scopeObj.view.flxCustomerDetails.isVisible) {
      var isValidDetails = scopeObj.detailsScreenValidation();
      if(isValidDetails) {
        if(scopeObj.action === scopeObj.actionConfig.create){
          scopeObj.checkUsernameAvailability();
        }else{
          var param = scopeObj.OFACverification();
          scopeObj.presenter.OFACverification(param);
        }
      }
      isValid = false; // to stop navigation
    }
    else if(scopeObj.view.flxCustomerAccounts.isVisible ){
      isValid = scopeObj.checkAccountValidation();
      if (scopeObj.action===scopeObj.actionConfig.create && scopeObj.selectedRoleId==="" && scopeObj.tabClick>3)
        isValid=false;
    }
    else if (scopeObj.view.flxCustomerAssignRole.isVisible){
       isValid= scopeObj.validateRoles();
    } 
    else if (scopeObj.view.flxCustomerAssignLimits.isVisible && (!scopeObj.view.flxNoLimitsFound.isVisible))
      isValid=scopeObj.validateLimits();
    return isValid;
  },

  getOriginalOrModifiedActions : function(featureId,isOriginalRequest){
    var self = this;
    var rowIndex = self.tabClick===4?self.view.verticalTabsCustomer.segCompanyAccounts.selectedRowIndex[1]:"";
    var data = self.view.verticalTabsCustomer.segCompanyAccounts.data;
    var accountNumber =self.tabClick===4?data[rowIndex].lblAccountNumber.text:-1;
    var features=isOriginalRequest?new Map(JSON.parse(self.accountsMap)).get(accountNumber): self.modifiedAccountsMap.get(accountNumber);
    for(var j=0; j<features.length;j++){
      if(featureId===features[j].id){
        return features[j].actions;
      }
    }
    return "";
  },
  populateAccountLevelLimits : function(accountNumber){
    var self = this;
    var features=self.modifiedAccountsMap.get(accountNumber);
    self.setLimitsSegData(features);
  },
  setLimitsSegData : function(featuresData){
    var scopeObj = this;
    if (featuresData === undefined) {
      scopeObj.view.segCustomerAssignLimits.setData([]);
      scopeObj.view.flxNoLimitsFound.setVisibility(true);
      scopeObj.view.flxLimitsScroll.setVisibility(false);
    } else {
      var records = featuresData;
      if (records.length === 0) {
      scopeObj.view.flxNoLimitsFound.setVisibility(true);
      scopeObj.view.flxLimitsScroll.setVisibility(false);
      }else {
        var dataMap = {
          "featureId": "featureId",
          "actionId" : "actionId",
          "lblFeatureName":"lblFeatureName",
          "lblTransactionType":"lblTransactionType",
          "lblTransactionLimits":"lblTransactionLimits",
          "lblPreApprovedLimit":"lblPreApprovedLimit",
          "lblAutoDenyLimits":"lblAutoDenyLimits",
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
          "lblSeperator":"lblSeperator"
        };
        var data = featuresData.map(scopeObj.mapLimitsSegment.bind(scopeObj));
        var dataToShow = data.filter(function(rec){
          if(rec!==undefined){
            return rec;
          } 
        });
        if (dataToShow.length>0){
        scopeObj.view.segCustomerAssignLimits.widgetDataMap = dataMap;
        scopeObj.view.segCustomerAssignLimits.setData(dataToShow);
        scopeObj.view.flxLimitsScroll.setVisibility(true);
        scopeObj.view.flxNoLimitsFound.setVisibility(false);
        }
        else{
          scopeObj.view.flxNoLimitsFound.setVisibility(true);
          scopeObj.view.flxLimitsScroll.setVisibility(false);
        }
        
        this.view.forceLayout();
      }
    }
  },
 mapLimitsSegment: function(feature) {
    var scopeObj = this;
    var status ="",statusSkin="";
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
    var featureId=feature.id;
    var featureName=feature.name;
    var actions=feature.actions;
    var limits;
    for(var i=0;i<actions.length;i++){
    if(actions[i].isAssigned==="1"){
    if(actions[i].limits !== undefined && actions[i].limits !== null ){
    limits= actions[i].limits;
    return {
      "featureId": featureId,
      "actionId" : actions[i].id,
      "lblFeatureName": featureName, 
      "lblTransactionType":kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Transaction_Type_Caps"),
      "lblTransactionLimits":kony.i18n.getLocalizedString("i8n.companies.max_trans_limit_UC"),
      "lblPreApprovedLimit":kony.i18n.getLocalizedString("i8n.companies.pre-approve_upto_UC"),
      "lblAutoDenyLimits":kony.i18n.getLocalizedString("i8n.companies.deny_above_UC"),
      "lblperTransactionLimits":"Per Transaction",
      "lblDailyTransactionLimits":"Daily Transaction",
      "lblWeeklyTransactionLimits":"Weekly Transaction",
      "lblPerTransactionLimitValue": {"text":scopeObj.convertToLocaleString(limits.MAX_TRANSACTION_LIMIT)|| "N/A"},
      "txtPerTransPreApprovedLimit": {"text":limits.PRE_APPROVED_TRANSACTION_LIMIT||"0",
                                      "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px"},
      "txtPerTransAutoDenyLimits": {"text": (limits.AUTO_DENIED_TRANSACTION_LIMIT=== undefined)?(limits.MAX_TRANSACTION_LIMIT||"0"):(limits.AUTO_DENIED_TRANSACTION_LIMIT || "0"),
                                      "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px"},
      "lblDailyTransactionLimitValue":{"text":scopeObj.convertToLocaleString(limits.DAILY_LIMIT)||"N/A"},
      "txtDailyTransPreApprovedLimit": {"text":limits.PRE_APPROVED_DAILY_LIMIT||"0",
                                      "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px"},
      "txtDailyTransAutoDenyLimits": {"text":(limits.AUTO_DENIED_DAILY_LIMIT=== undefined)?(limits.DAILY_LIMIT||"0"):(limits.AUTO_DENIED_DAILY_LIMIT||"0"),
                                      "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px"},
      "lblWeeklyTransactionLimitValue": {"text":scopeObj.convertToLocaleString(limits.WEEKLY_LIMIT)||"N/A"},
      "txtWeeklyTransPreApprovedLimit": {"text":limits.PRE_APPROVED_WEEKLY_LIMIT||"0",
                                      "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px"},
      "txtWeeklyTransAutoDenyLimits": {"text":(limits.AUTO_DENIED_WEEKLY_LIMIT=== undefined)?(limits.WEEKLY_LIMIT||"0"):(limits.AUTO_DENIED_WEEKLY_LIMIT||"0"),
                                      "skin": "sknTbxBgFFFFFFBrD7D9E01pxR3px"},
      "flxColumn11": { "isVisible":false},
      "flxColumn12": { "isVisible":false},
      "flxColumn21": { "isVisible":false},
      "flxColumn22": { "isVisible":false},
      "flxColumn31" : { "isVisible":false},
      "flxColumn32" : { "isVisible":false},
      "lblErrorMsg11":{"text":""},
      "lblErrorMsg12":{"text":""},
      "lblErrorMsg21":{"text":""},
      "lblErrorMsg22": {"text":""},
      "lblErrorMsg31" : {"text":""},
      "lblErrorMsg32" : {"text":""},
      "lblErrorIcon11":"",
      "lblErrorIcon12":"",
      "lblErrorIcon21":"",
      "lblErrorIcon22":"",
      "lblErrorIcon31":"",
      "lblErrorIcon32":"",
      "statusValue": status,
      "statusIcon" : {"text": "\ue921",
                      "skin": statusSkin},
      "lblPerCurrencyPreLimit":{"text": scopeObj.currencyValue},
      "lblPerCurrencyADLimits":{"text": scopeObj.currencyValue},
      "lblDailyCurrencyPreLimit":{"text": scopeObj.currencyValue},
      "lblDailyCurrencyADLimits":{"text": scopeObj.currencyValue},
      "lblWeeklyCurrencyADLimits":{"text": scopeObj.currencyValue},
      "lblWeeklyCurrencyPreLimit":{"text": scopeObj.currencyValue},
      "lblSeperator":".",
      "template": "flxAssignLimits",
    };
    }
    }
   }
  },
  saveLimitsToModifiedMap : function(){
    var self = this;
    var data = self.view.verticalTabsCustomer.segCompanyAccount6.data;
    var accountNumber =self.prevAccountSelected;
    var features=self.modifiedAccountsMap.get(accountNumber);
    var limitsData=self.view.segCustomerAssignLimits.data;
    var row;
    var limits={};
    if(limitsData!== undefined){
    for(var j=0; j<limitsData.length;j++){
       row=limitsData[j];
       limits.PRE_APPROVED_TRANSACTION_LIMIT=row.txtPerTransPreApprovedLimit.text;
       limits.AUTO_DENIED_TRANSACTION_LIMIT=row.txtPerTransAutoDenyLimits.text;
       limits.PRE_APPROVED_DAILY_LIMIT=row.txtDailyTransPreApprovedLimit.text;
       limits.AUTO_DENIED_DAILY_LIMIT=row.txtDailyTransAutoDenyLimits.text;
       limits.PRE_APPROVED_WEEKLY_LIMIT=row.txtWeeklyTransPreApprovedLimit.text;
       limits.AUTO_DENIED_WEEKLY_LIMIT=row.txtWeeklyTransAutoDenyLimits.text;
      self.updateLimitsToModifiedMap(row.featureId,row.actionId,JSON.stringify(limits),accountNumber);
    }
    }
  },
  updateLimitsToModifiedMap : function(featureId,actionId,limits,accountNumber){
    var self=this;
    var features=self.modifiedAccountsMap.get(accountNumber);
    var actions;
    limits=JSON.parse(limits);
    for(var i=0;i<features.length;i++){
        if(features[i].id === featureId){
           actions=features[i].actions;
           for(var j=0;j<actions.length;j++){
              if(actions[j].id === actionId){
                //Fetch unformatted limits(max transaction, daily, weekly)
                var max_trans_limit=actions[j].limits.MAX_TRANSACTION_LIMIT;
                var daily_limit=actions[j].limits.DAILY_LIMIT; 
                var weekly_limit=actions[j].limits.WEEKLY_LIMIT;
                
       			actions[j].limits=limits;
                actions[j].limits.MAX_TRANSACTION_LIMIT=max_trans_limit;
                actions[j].limits.DAILY_LIMIT=daily_limit;
                actions[j].limits.WEEKLY_LIMIT=weekly_limit;
                break;
              }
           } 
        break;
        }
    }
  },
  validateLimits : function(){
    var self = this;
    var rowIndex = self.view.verticalTabsCustomer.segCompanyAccount6.selectedRowIndex[1];
    var data = self.view.verticalTabsCustomer.segCompanyAccount6.data;
    var accountNumber =self.prevAccountSelected;
    var features=self.modifiedAccountsMap.get(accountNumber);
    var limitsData=self.view.segCustomerAssignLimits.data;
    var row;
    var limits={};
    var isValid=true;
    if(limitsData!== undefined){   
      for(var j=0; j<limitsData.length;j++){
        row=limitsData[j];
        var negativeErrorText=kony.i18n.getLocalizedString("i8n.frmCreateCustomerController.warning.value_cannot_negative");
        var emptyValueText= kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
        // cunvert currency format to float
        var max_trans_limit=parseFloat((row.lblPerTransactionLimitValue.text).replace(/[^0-9.-]+/g,"")); 
        var max_daily_limit=parseFloat((row.lblDailyTransactionLimitValue.text).replace(/[^0-9.-]+/g,"")); 
        var max_weekly_limit=parseFloat((row.lblWeeklyTransactionLimitValue.text).replace(/[^0-9.-]+/g,"")); 
        if(row.txtWeeklyTransAutoDenyLimits.text==="" || parseFloat(row.txtWeeklyTransAutoDenyLimits.text)<0){
          limitsData[j].lblErrorMsg32.text = row.txtWeeklyTransAutoDenyLimits.text==="" ? emptyValueText : negativeErrorText;
          limitsData[j].flxColumn32.isVisible=true;
          row.txtWeeklyTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtWeeklyTransAutoDenyLimits.text)>max_weekly_limit){
          limitsData[j].lblErrorMsg32.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_greater_than_trans_limit");
          limitsData[j].flxColumn32.isVisible=true;
          row.txtWeeklyTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtWeeklyTransAutoDenyLimits.text)<parseFloat(row.txtWeeklyTransPreApprovedLimit.text)){
          limitsData[j].lblErrorMsg32.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_less_than_equal");
          limitsData[j].flxColumn32.isVisible=true;
          row.txtWeeklyTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else{
          limitsData[j].flxColumn32.isVisible=false;
          row.txtWeeklyTransAutoDenyLimits.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
        }
        if(row.txtDailyTransAutoDenyLimits.text==="" || parseFloat(row.txtDailyTransAutoDenyLimits.text)<0){
          limitsData[j].lblErrorMsg22.text = row.txtDailyTransAutoDenyLimits.text===""?emptyValueText : negativeErrorText;
          limitsData[j].flxColumn22.isVisible=true;
          row.txtDailyTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtDailyTransAutoDenyLimits.text)>max_daily_limit){
          limitsData[j].lblErrorMsg22.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_greater_than_trans_limit");
          limitsData[j].flxColumn22.isVisible=true;
          row.txtDailyTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtDailyTransAutoDenyLimits.text)<parseFloat(row.txtDailyTransPreApprovedLimit.text)){
          limitsData[j].lblErrorMsg22.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_less_than_equal");
          limitsData[j].flxColumn22.isVisible=true;
          row.txtDailyTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else{
          limitsData[j].flxColumn22.isVisible=false;
          row.txtDailyTransAutoDenyLimits.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
        }
        if(row.txtPerTransAutoDenyLimits.text==="" || parseFloat(row.txtPerTransAutoDenyLimits.text)<0){
          limitsData[j].lblErrorMsg12.text = row.txtPerTransAutoDenyLimits.text===""? emptyValueText : negativeErrorText;
          limitsData[j].flxColumn12.isVisible=true;
          row.txtPerTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }
        else if(parseFloat(row.txtPerTransAutoDenyLimits.text)>max_trans_limit){
          limitsData[j].lblErrorMsg12.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_greater_than_trans_limit");
          limitsData[j].flxColumn12.isVisible=true;
          row.txtPerTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtPerTransAutoDenyLimits.text)<parseFloat(row.txtPerTransPreApprovedLimit.text)){
          limitsData[j].lblErrorMsg12.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_less_than_equal");
          limitsData[j].flxColumn12.isVisible=true;
          row.txtPerTransAutoDenyLimits.skin="skinredbg";
          isValid=false;
        }else{
          limitsData[j].flxColumn12.isVisible=false;
          row.txtPerTransAutoDenyLimits.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
        }
        if(row.txtPerTransPreApprovedLimit.text==="" || parseFloat(row.txtPerTransPreApprovedLimit.text)<0){
          limitsData[j].lblErrorMsg11.text = row.txtPerTransPreApprovedLimit.text===""? emptyValueText : negativeErrorText;
          limitsData[j].flxColumn11.isVisible=true;
          row.txtPerTransPreApprovedLimit.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtPerTransPreApprovedLimit.text)>max_trans_limit){
          limitsData[j].lblErrorMsg11.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_greater_than_trans_limit");
          limitsData[j].flxColumn11.isVisible=true;
          row.txtPerTransPreApprovedLimit.skin="skinredbg";
          isValid=false;
        }
        else{
          limitsData[j].flxColumn11.isVisible=false;
          row.txtPerTransPreApprovedLimit.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
        }
        if(row.txtDailyTransPreApprovedLimit.text==="" || parseFloat(row.txtDailyTransPreApprovedLimit.text)<0){
          limitsData[j].lblErrorMsg21.text = row.txtDailyTransPreApprovedLimit.text==="" ? emptyValueText : negativeErrorText;
          limitsData[j].flxColumn21.isVisible=true;
          row.txtDailyTransPreApprovedLimit.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtDailyTransPreApprovedLimit.text)>max_daily_limit){
          limitsData[j].lblErrorMsg21.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_greater_than_trans_limit");
          limitsData[j].flxColumn21.isVisible=true;
          row.txtDailyTransPreApprovedLimit.skin="skinredbg";
          isValid=false;
        }else{
          limitsData[j].flxColumn21.isVisible=false;
          row.txtDailyTransPreApprovedLimit.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
        }
        if(row.txtWeeklyTransPreApprovedLimit.text==="" || parseFloat(row.txtWeeklyTransPreApprovedLimit.text)<0){
          limitsData[j].lblErrorMsg31.text = row.txtWeeklyTransPreApprovedLimit.text==="" ? emptyValueText : negativeErrorText;
          limitsData[j].flxColumn31.isVisible=true;
           row.txtWeeklyTransPreApprovedLimit.skin="skinredbg";
          isValid=false;
        }else if(parseFloat(row.txtWeeklyTransPreApprovedLimit.text)>max_weekly_limit){
          limitsData[j].lblErrorMsg31.text = kony.i18n.getLocalizedString("i18.frmCreateCustomer.error.value_cannot_be_greater_than_trans_limit");
          limitsData[j].flxColumn31.isVisible=true;
          row.txtWeeklyTransPreApprovedLimit.skin="skinredbg";
          isValid=false;
        }else{
          limitsData[j].flxColumn31.isVisible=false;
          row.txtWeeklyTransPreApprovedLimit.skin="sknTbxBgFFFFFFBrD7D9E01pxR3px";
        }
      }
      self.view.segCustomerAssignLimits.setData(limitsData);
      self.view.forceLayout();
    }
    if(isValid)
      self.saveLimitsToModifiedMap();
    return isValid;
  },
  isRoleSelected : function(row){
    if(this.selectedRoleId === row.id)
    {
      return "radio_selected.png";
    }
    else
      return "radio_notselected.png";
  },
  obtainFeaturesPayloadFromModifiedMap : function(){
    var self=this;
    var accMap=this.modifiedAccountsMap;
    var featureDetailsMap = new Map(); // featureId, feature json Map
    var featureActionsMap = new Map();// featureId, actions array Map 
    var actionsAccountMap = new Map();// actionId, accounts array Map
    var accounts =[];
    accounts = (this.isAccountCentric===true?this.view.addAndRemoveAccounts.segSelectedOptions.info.segData:this.fetchCustomerCentricAccountsSelected()).map(
        function(rec){
        return  self.isAccountCentric===true?rec.accountId:rec.lblAccountNumber.text;
    });
    for(var [currentAccount,currentFeatureArray] of accMap.entries()){ // Iterate through features in each account
      if(accounts.includes(currentAccount)|| currentAccount===-1){
      for(var i=0;i<currentFeatureArray.length;i++){ // iterate through each feature
        var currentFeatureActions=currentFeatureArray[i].actions;
          for(var j=0;j<currentFeatureActions.length;j++){ // iterate through each action in a feature
             var currentAction=currentFeatureActions[j];
              var currentActionId=currentAction.id;
              var currLimits=currentAction.limits;
              if(currentAccount!==-1){//Not Other Features and actions
                var accountWithIdAndFLag={   
                  "id":currentAccount,
                  "isEnabled":currentAction.isAssigned==="1"?"true":"false"};
                if(currLimits!==undefined){
                  accountWithIdAndFLag.limits={
                    "PRE_APPROVED_TRANSACTION_LIMIT":currLimits.PRE_APPROVED_TRANSACTION_LIMIT||"0",
                    "AUTO_DENIED_TRANSACTION_LIMIT":(currLimits.AUTO_DENIED_TRANSACTION_LIMIT=== undefined)?(currLimits.MAX_TRANSACTION_LIMIT||"0"):(currLimits.AUTO_DENIED_TRANSACTION_LIMIT || "0"),
                    "PRE_APPROVED_DAILY_LIMIT":currLimits.PRE_APPROVED_DAILY_LIMIT||"0",
                    "AUTO_DENIED_DAILY_LIMIT":(currLimits.AUTO_DENIED_DAILY_LIMIT=== undefined)?(currLimits.DAILY_LIMIT||"0"):(currLimits.AUTO_DENIED_DAILY_LIMIT||"0"),
                    "PRE_APPROVED_WEEKLY_LIMIT":currLimits.PRE_APPROVED_WEEKLY_LIMIT||"0",
                    "AUTO_DENIED_WEEKLY_LIMIT":(currLimits.AUTO_DENIED_WEEKLY_LIMIT=== undefined)?(currLimits.WEEKLY_LIMIT||"0"):(currLimits.AUTO_DENIED_WEEKLY_LIMIT||"0")
                  };
                }
                var currActionAccountLimits=[];
                if(actionsAccountMap.has(currentActionId)){
                  currActionAccountLimits=actionsAccountMap.get(currentActionId);
                }currActionAccountLimits.push(accountWithIdAndFLag);
                actionsAccountMap.set(currentActionId,currActionAccountLimits);
              }
              var actions={"actionType": currentAction.type,
                           "actionId": currentActionId,
                           "actionDescription": (currentAction.description).replace(/'/g,"\\'"),
                           "isEnabled": currentAction.isAssigned==="1"?"true":"false" 
                          };
               
              var currentActionsInMap=featureActionsMap.get(currentFeatureArray[i].id)||[];
              var isPresent=false;
              for(var k=0;k<currentActionsInMap.length;k++){
                if(currentActionsInMap[k].actionId===currentActionId){
                  isPresent=true;
                  break;
                }
              }
              if(!isPresent)
                currentActionsInMap.push(actions);
              featureActionsMap.set(currentFeatureArray[i].id, currentActionsInMap);
            }
          var feature = {"featureName": (currentFeatureArray[i].name).replace(/'/g,"\\'"),
                         "featureID": currentFeatureArray[i].id,
                         "featureDescription": (currentFeatureArray[i].description).replace(/'/g,"\\'")};
          if(!featureDetailsMap.has(currentFeatureArray[i].id))
            featureDetailsMap.set(currentFeatureArray[i].id,feature);
       }
      }
    }
    //Iterate featureActionsMap and append accounts to action
    for(var [currentFeatureKey,currentActionsArray] of featureActionsMap.entries()){
      for(var action=0;action<currentActionsArray.length;action++){
        var currentActionJson=currentActionsArray[action];
        if(actionsAccountMap.has(currentActionJson.actionId))
          currentActionJson.Accounts=actionsAccountMap.get(currentActionJson.actionId);
      }
    }
    var finalPayload=[];//Iterate featureDetailsMap and append actions to featureJson
    for(var[featureDetailsKey,featureDetailsValue] of featureDetailsMap.entries()){
      if(featureActionsMap.has(featureDetailsKey)){
        featureDetailsValue.Actions=featureActionsMap.get(featureDetailsKey);
        finalPayload.push(featureDetailsValue);
      }
    }
    return finalPayload;
  },
  handleCancelClick : function(){
    var prevForm = kony.application.getPreviousForm();
    if(prevForm.id === "frmCompanies"){
      this.hideCustomerCreateScreen();
    } else{
      var custId = this.customerDetails.id;
      var param = {"Customer_id": custId};
      var navigationParam = {"name":"frmCustomerCreate",
                             "data": this.navigatedFromCustomerTab };
      this.presenter.navigateToCustomerPersonal(param,navigationParam);
    }
  },
  validateRoles:function(){
    var scopeObj=this;
    var isValid=true;
    var height = kony.os.deviceInfo().screenHeight-296;
    if(scopeObj.selectedRoleId===""){
      scopeObj.view.flxRoleError.setVisibility(true);
      scopeObj.view.flxScrollCustomerRoles.height=(height-75)+"px";
      isValid=false;
    }
    else{
      scopeObj.view.flxRoleError.setVisibility(false);
      scopeObj.view.flxScrollCustomerRoles.height=(height-15)+"px";
     }
    scopeObj.view.forceLayout();
    return isValid;
  },
  populateSampleAccountFeaturesWithAllUnSelected:function(){
    var accMap=new Map(JSON.parse(this.accountsMap));
    var sampleAccountFeaturesRow=[];
    for(var [currentAccount,currentFeatureArray] of accMap.entries()){
      if(currentAccount === -1)
        continue;
      else{
        sampleAccountFeaturesRow=currentFeatureArray;
        break;
      }
    }
    for(var i=0;i<sampleAccountFeaturesRow.length;i++){
      var row= sampleAccountFeaturesRow[i];
      row.isAssigned="0";
      var actions=row.actions;
      for(var j=0;j<actions.length;j++){
        var actionsRow=actions[j];
        actionsRow.isAssigned="0";
        if(actionsRow.limits!==undefined){
          var limitsRow=actionsRow.limits;
          limitsRow.PRE_APPROVED_TRANSACTION_LIMIT="0";
          limitsRow.AUTO_DENIED_TRANSACTION_LIMIT=undefined;
          limitsRow.PRE_APPROVED_DAILY_LIMIT="0";
          limitsRow.AUTO_DENIED_DAILY_LIMIT=undefined;
          limitsRow.PRE_APPROVED_WEEKLY_LIMIT="0";
          limitsRow.AUTO_DENIED_WEEKLY_LIMIT=undefined;
        }
      }
    }
    return sampleAccountFeaturesRow;
  },
  loadEditUi:function(customerCreateModel){
    this.tabClick=1;
    this.clearDataForDetails();
    this.clearDataForAccounts();
    if(customerCreateModel.editInputs){
    this.isAccountCentric=customerCreateModel.editInputs.isAccountCentricConfig;
    this.isAuthorizedSignatoryFlow=customerCreateModel.editInputs.inAuthorizedSignatoriesUi;
    this.showCustomerCreateScreen();
    this.action = this.actionConfig.edit;
    this.view.flxOFACError.setVisibility(false);
    this.customerDetails = customerCreateModel.editInputs;
    this.selectedRoleId = this.customerDetails.Group_id;
    this.roleSelected = this.selectedRoleId ? true : false;
    this.selectedCustomer="";
    this.defaultRole="";
    this.customerIdForProfileLinked="";//To be populated after integration
    this.sampleAccountFeatures=[];
    this.showCreateEditSpecificUI();
    this.view.verticalTabsCustomer.flxOption3.info = {"isFirstTime" : true};
    this.view.breadcrumbs.lblCurrentScreen.text = this.isAuthorizedSignatoryFlow===true?kony.i18n.getLocalizedString("i18.authorizedSignatories.editAuthSignatory_UC"):kony.i18n.getLocalizedString("i18n.frmCompanies.EDIT_BUSINESS_USER");
    this.defaultRole=customerCreateModel.authSignatoryTypes.length > 0 ? customerCreateModel.authSignatoryTypes[0].Default_group : "";
    if(this.isAuthorizedSignatoryFlow===true)
    	this.populateTypesListBox(customerCreateModel.authSignatoryTypes[0]);
    this.setCustomerDetailsForEdit(customerCreateModel.editInputs);
    }
    //Populate company Accounts
    if(customerCreateModel.accounts)
    this.manageAccountsData(customerCreateModel.accounts);
    //Populate Customer accounts
    if(customerCreateModel.customerAccounts){
      var customerAccounts=this.filterAccounts(customerCreateModel.customerAccounts);
    if(this.isAccountCentric===true){
      var mappedSelectedData = this.mapSelectedSegmentData(customerAccounts);
      this.assignedAccounts = mappedSelectedData;
      this.view.addAndRemoveAccounts.segSelectedOptions.setData(mappedSelectedData);
      this.view.addAndRemoveAccounts.segSelectedOptions.info={"segData" : mappedSelectedData};
    }
      else{
        this.mapCustCentricAccountsforEdit(customerAccounts);
      }
    }
    //Populate roles
    if(customerCreateModel.roles){
    this.roles=customerCreateModel.roles;
    this.setDataForRolesSegment(customerCreateModel.roles);
    }
    //Populate Features and actions
    if(customerCreateModel.featuresAndActions){
    var accounts=(customerCreateModel.featuresAndActions[0] && customerCreateModel.featuresAndActions[0].accounts)?customerCreateModel.featuresAndActions[0].accounts:[];
    var features=(customerCreateModel.featuresAndActions[0] && customerCreateModel.featuresAndActions[0].features)?customerCreateModel.featuresAndActions[0].features:[];
    this.storeAccountsInMap(accounts, features);
    this.modifiedAccountsMap=new Map(JSON.parse(this.accountsMap));
    this.sampleAccountFeatures=JSON.stringify(this.populateSampleAccountFeaturesWithAllUnSelected());
    }
    //when navigated from customer profile form
    if(customerCreateModel.navigationParams){
      this.navigatedFromCustomerTab = customerCreateModel.navigationParams.selectTab;
      if(customerCreateModel.navigationParams.selectTab === "ROLES"){
        this.view.verticalTabsCustomer.btnOption3.onClick();
      }else if(customerCreateModel.navigationParams.selectTab === "FEATURES"){
        this.view.verticalTabsCustomer.btnOption4.onClick();
      } else if(customerCreateModel.navigationParams.selectTab === "DETAILS"){
        this.view.verticalTabsCustomer.btnOption1.onClick();
      } else if(customerCreateModel.navigationParams.selectTab === "ACCOUNTS"){
        this.view.verticalTabsCustomer.btnOption2.onClick();
      }
    }
  },
  loadCreateUi:function(customerCreateModel){
    //Create
    this.clearDataForDetails();
    this.clearDataForAccounts();
    if(customerCreateModel.companyDetails){
      this.isAccountCentric=customerCreateModel.companyDetails.isAccountCentricConfig;
      this.isAuthorizedSignatoryFlow=customerCreateModel.companyDetails.inAuthorizedSignatoriesUi;
      this.view.flxOFACError.setVisibility(false);
      this.comapnyDetails = customerCreateModel.companyDetails;
      this.sampleAccountFeatures=[];
      this.accountsData=new Map();
      this.modifiedAccountsMap=new Map();
      this.selectedRoleId = "";
      this.roleSelected = false;
      this.selectedCustomer="";
      this.defaultRole="";
      this.customerIdForProfileLinked="";
      this.action = this.actionConfig.create;
      this.view.breadcrumbs.lblCurrentScreen.text = this.isAuthorizedSignatoryFlow===true?kony.i18n.getLocalizedString("i18.authorizedSignatories.createAuthSignatory_UC"):kony.i18n.getLocalizedString("i18n.frmCompanies.CREATE_CUSTOMER");
      this.view.breadcrumbs.btnBackToMain.text = this.comapnyDetails.companyName.toUpperCase();
      if(customerCreateModel.companyDetails.inAuthorizedSignatoriesUi===true){
        this.tabClick=0;
        if(this.isAccountCentric===true){
          this.populateInitialUiForAccountCentric();
        }
        else{
          this.populateInitialUiForCustomerCentric()
        }
        this.selectedCustomer = "";
        this.currentServiceKey="",
        this.view.verticalTabsCustomer.flxOption0.setVisibility(true);
      }
      else{
        this.tabClick=1;
        this.selectedCustomer = "";
        this.showCustomerCreateScreen();
        this.showCreateEditSpecificUI();
        this.view.verticalTabsCustomer.flxOption0.setVisibility(false);
      }
    }
    this.defaultRole=customerCreateModel.authSignatoryTypes[0].Default_group;
    if(customerCreateModel.companyDetails.inAuthorizedSignatoriesUi===true && customerCreateModel.authSignatoryTypes)
    	this.populateTypesListBox(customerCreateModel.authSignatoryTypes[0]);
    //populate roles
    if(customerCreateModel.roles){
      this.roles=customerCreateModel.roles;
      this.setDataForRolesSegment(customerCreateModel.roles);
    }
    //username policy
    if(customerCreateModel.usernameRulesAndPolicy){
      this.setUsernameRulesAndPolicy(customerCreateModel.usernameRulesAndPolicy);
    }
    //populate company accounts
    if(customerCreateModel.accounts){
      this.assignedAccounts=[];
      if(this.isAccountCentric===false)
        this.populateCustomerIdListBox(customerCreateModel.accounts);
      this.manageAccountsData(customerCreateModel.accounts);
      if(customerCreateModel.companyDetails.inAuthorizedSignatoriesUi===true && this.action===this.actionConfig.create){
        this.prepopulateSelectedAccounts(customerCreateModel.accounts);
      }
    }
  },
  prepopulateSelectedAccounts : function(accounts){
    var selectedAccounts=accounts.map(function(rec){
      return{
        "Account_Type": rec.accountType,
        "Account_id": rec. Account_id,
        "Membership_id":rec.Membership_id,
        "Taxid": rec.TaxId,
        "accountHolder": rec.AccountHolder,
        "accountName": rec.AccountName
      };});
    if(this.isAccountCentric===true){
      var mappedSelectedData = this.mapSelectedSegmentData(selectedAccounts);
      this.assignedAccounts = mappedSelectedData;
      this.view.addAndRemoveAccounts.segSelectedOptions.setData(mappedSelectedData);
      this.view.addAndRemoveAccounts.segSelectedOptions.info={"segData" : mappedSelectedData};
    }
    else{
      this.mapCustCentricAccountsforEdit(selectedAccounts);
    }
  },
  populateTypesListBox : function(authTypes){
      var signatories=authTypes.Signatories;
      var typeList=[];
      typeList.push(["lbl1",kony.i18n.getLocalizedString("i18.authorizedSignatories.selectType")]);
      for(var i=0;i<signatories.length;i++){
        typeList.push([signatories[i].signatorytype_id, signatories[i].name]);
      }
      this.view.lbxAuthType.masterData=typeList;
      if(signatories.length===1){
        this.view.tbxAuthType.setVisibility(true);
        this.view.lbxAuthType.setVisibility(false);
        this.view.tbxAuthType.text=signatories[0].name;
        this.view.lbxAuthType.selectedKey=signatories[0].signatorytype_id;
      }
      else{
        this.view.tbxAuthType.setVisibility(false);
        this.view.lbxAuthType.setVisibility(true);
      }
   },
  setAddAllorRemoveAllLabel : function(){
    var segData=this.view.addFeaturesAndActions.segAddOptions.data;
    var count = segData.reduce(function(totalCount, rec) {
      if(rec.imgFeatureCheckbox.src === "checkboxselected.png"){
        totalCount = totalCount+1;
      }
      return totalCount;
    }, 0);
    if(this.view.addFeaturesAndActions.segAddOptions.info && count===this.view.addFeaturesAndActions.segAddOptions.info.length){
      this.view.addFeaturesAndActions.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.SelectedOptions.RemoveAll");
    } else{
      this.view.addFeaturesAndActions.btnSelectAll.text=kony.i18n.getLocalizedString("i18n.frmGroupsController.Add_All");
    }
    this.view.forceLayout();
  },
  validateOnSpecialCharacter:function(str,specialcharacters){
    if(specialcharacters.length===0)
      return true;
    for(var i=0;i<specialcharacters.length;i++){
      if(str.indexOf(specialcharacters[i])>-1)
        return true;
    }
    return false;
  },
  convertToLocaleString : function(value){
    if(value === undefined)
      return value;
    else
      return (parseFloat(value)).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }, 
  populateSelectedCustomersList : function(data){
    var self=this;
    if(data && data.length>0){
    var accountIdList=new Map();
    var count=0;
    this.view.flxSegmentLeft.removeAll();
    this.view.segAccountCentricDetails.setData([]);
    var dataMap = {
      "lblName": "lblName",
      "lblSSN": "lblSSN",
      "lblMemberType": "lblMemberType",
      "imgRadio": "imgRadio",
      "flxRadio": "flxRadio",
      "flxUnlink":"flxUnlink",
      "lblUnlink":"lblUnlink",
      "id":"id",
      "accountId":"accountId",
      "dob":"dob",
      "firstName":"firstName",
      "middleName":"middleName",
      "lastName": "lastName",
      "email": "email",
      "drivingLicenseNumber": "drivingLicenseNumber",
      "phone":"phone",
      "lblSeperator":"lblSeperator",
      "serviceKey" : "serviceKey"
    };
    var dataToAdd=[];
    var toAdd;
    for (var i = 0; i < data.length; i++) {
      for(var j=0;j<data[i].AccountHolderDetails.length;j++){
      toAdd = {
        "lblName": data[i].AccountHolderDetails[j].firstName+" "+data[i].AccountHolderDetails[j].lastName,
        "lblSSN": {"text":data[i].AccountHolderDetails[j].ssn},
        "lblMemberType": data[i].AccountHolderDetails[j].memberType,
        "imgRadio": {"src": data[i].AccountHolderDetails[j].id===this.selectedCustomer?"radio_selected.png": "radio_notselected.png"},
        "flxRadio": {"isVisible": true},
        "flxUnlink":{"isVisible":false,"onClick":function(){
          self.showLinkProfilesPopup();
        }},
        "lblUnlink":{
          "text" : "\ue97f",
          "tooltip": "Link"
        },
        "template": "flxAccountCentricDetails",
        "id": data[i].AccountHolderDetails[j].id,
        "dob":data[i].AccountHolderDetails[j].dateOfBirth,
        "accountId":data[i].accountId,
        "firstName":data[i].AccountHolderDetails[j].firstName,
        "middleName":data[i].AccountHolderDetails[j].middleName,
        "lastName": data[i].AccountHolderDetails[j].lastName,
        "email": data[i].AccountHolderDetails[j].email,
        "drivingLicenseNumber": data[i].AccountHolderDetails[j].drivingLicenseNumber?data[i].AccountHolderDetails[j].drivingLicenseNumber:"",
        "phone":data[i].AccountHolderDetails[j].phone,
        "serviceKey":data[i].AccountHolderDetails[j].serviceKey,
        "lblSeperator":"."
      };
        dataToAdd.push(toAdd);
      }
      if(accountIdList.get(data[i].accountId)){
        this.view.flxSegmentLeft[data[i].accountId].height=((data[i].AccountHolderDetails.length)*50)+"px";
      }
      else{ 
        this.showAccountList(data[i].AccountHolderDetails.length*50,data[i].accountId);
      }
      accountIdList.set(data[i].accountId,data[i].AccountHolderDetails.length);
    }
      if(dataToAdd.length>0){
        this.view.segAccountCentricDetails.widgetDataMap = dataMap;
        this.view.segAccountCentricDetails.setData(dataToAdd);
        this.view.flxNoAccountsFound.setVisibility(false);
        this.view.flxAccountCentricSegment.setVisibility(true);
        if(this.view.flxAccountCentricSegment.frame.height!==0&&this.view.segAccountCentricDetails.data.length*50>this.view.flxAccountCentricSegment.frame.height)
          this.view.flxHeader.right="17px";
        else
          this.view.flxHeader.right="0px";
        //this.view.flxAccountCentricSegment.height=(kony.os.deviceInfo().screenHeight-146-120-80-50)+"px";
      }else{
        this.view.flxNoAccountsFound.setVisibility(true);
        this.view.flxAccountCentricSegment.setVisibility(false);
      }
    }
    else{
      this.view.flxNoAccountsFound.setVisibility(true);
      //this.view.flxNoAccountsFound.height=(kony.os.deviceInfo().screenHeight-146-120-80-50)+"px";
      this.view.flxAccountCentricSegment.setVisibility(false);
    }
    
    this.view.flxAccountCentricResults.height=(kony.os.deviceInfo().screenHeight-146-100-80-30)+60+"px";
    this.view.forceLayout();
  }, 
  clearCustomerCentricSearch : function(){

  },
  showAccountList : function(height,accountId){
    var toAdd = new com.adminConsole.authorizedSignatories.accountCentricAccounts({
      "id": accountId,
      "isVisible": true,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "height":height+"px"
    }, {}, {});
    toAdd.lblAccountId.text=accountId;
    this.view.flxSegmentLeft.add(toAdd);
  },
  setCustomerDetailsForAuthSignatories : function(data){
    var self =this;
    var dob = (data.dob).split("-");
    var dateOfBirth = dob[1]+"/"+dob[2]+"/"+dob[0];
    var formatDob= dob[1]+"-"+dob[2]+"-"+dob[0];
    var phone = data.phone?data.phone.replace(/ /g, ""):data.phone; // remove whitespaces
    var isd = "",phn ="";
    if(phone.indexOf("-")>= 0){
      phn = phone.split("-")[1];
      isd = phone.split("-")[0].trim();
    } else { 
      phone=(phone.charAt(0)==="+")?phone.substring(1):phone;
      var strLen=phone.length;
      if(strLen === 12){
        isd=phone.substring(0,2);
        phn=phone.substring(2,12);
      } 
      else
        phn = phone;
    } 
    self.view.textBoxEntry11.tbxEnterValue.text = data.firstName;
    self.view.textBoxEntry12.tbxEnterValue.text = data.middleName;
    self.view.textBoxEntry13.tbxEnterValue.text = data.lastName;
    self.view.textBoxEntry21.tbxEnterValue.text = "";
    self.view.textBoxEntry22.tbxEnterValue.text = data.email;
    self.view.textBoxEntry32.tbxEnterValue.text = data.lblSSN.text;
    self.view.textBoxEntry33.tbxEnterValue.text = data.drivingLicenseNumber;
    self.view.customCalCustomerDOB.value = dateOfBirth;
    self.view.customCalCustomerDOB.resetData = self.getLocaleDate(dateOfBirth);
    self.view.textBoxEntry23.txtISDCode.text = self.view.textBoxEntry23.addingPlus(isd);
    self.view.textBoxEntry23.txtContactNumber.text = phn;
    self.currentServiceKey = data.serviceKey;
    self.view.flxType.setVisibility(true);
    self.view.textBoxEntry31.tbxEnterValue.text=formatDob;
    self.disableFieldsInCustomerEditDetails();
   /* Postponed for next release
   if(this.customerIdForProfileLinked===""){
      this.view.flxLinkProfilesHeader.setVisibility(true);
      this.view.flxLinkProfileButton.setVisibility(true);
      this.view.lblProfileLinkingMessage.setVisibility(false);
    }
    else{
      this.view.flxLinkProfilesHeader.setVisibility(true);
      this.view.flxLinkProfileButton.setVisibility(false);
      this.view.lblProfileLinkingMessage.setVisibility(true);
    }*/
    self.showCustomerCreateScreen();
    self.view.forceLayout();
  },  
  disableFieldsInCustomerEditDetails : function(){
    var self=this;
    self.view.flxType.setVisibility((self.isAuthorizedSignatoryFlow===true)?true:false);
    if(self.action===self.actionConfig.edit){
      self.view.textBoxEntry21.tbxEnterValue.skin="txtD7d9e0disabledf3f3f3NoBorder";
      self.view.textBoxEntry21.tbxEnterValue.setEnabled(false);
      self.view.textBoxEntry21.btnCheck.setEnabled(false);
      self.view.flxRow4.setVisibility(true);
    }
    else{
      self.view.textBoxEntry21.tbxEnterValue.skin="sknTbx485c75LatoReg13pxNoBor";
      self.view.textBoxEntry21.tbxEnterValue.setEnabled(true);
      self.view.textBoxEntry21.btnCheck.setEnabled(true);
      self.view.flxRow4.setVisibility(false);
    }
    self.view.tbxAuthType.setEnabled(false);
    self.view.textBoxEntry11.tbxEnterValue.setEnabled(false);
    self.view.textBoxEntry13.tbxEnterValue.setEnabled(false);
    self.view.textBoxEntry32.tbxEnterValue.setEnabled(false);
    self.view.customCalCustomerDOB.setEnabled(false);
    self.view.textBoxEntry11.tbxEnterValue.skin="txtD7d9e0disabledf3f3f3NoBorder";
    self.view.textBoxEntry13.tbxEnterValue.skin="txtD7d9e0disabledf3f3f3NoBorder";
    self.view.textBoxEntry32.tbxEnterValue.skin="txtD7d9e0disabledf3f3f3NoBorder";
    self.view.textBoxEntry31.tbxEnterValue.skin="txtD7d9e0disabledf3f3f3NoBorder";
    self.view.flxCalendarDOB.setVisibility(false);
    self.view.textBoxEntry31.tbxEnterValue.setEnabled(false);
    self.view.textBoxEntry31.tbxEnterValue.setVisibility(true);
    self.view.verticalTabsCustomer.flxOption0.setVisibility((self.isAuthorizedSignatoryFlow===true && self.action===self.actionConfig.create)?true:false);
  },  
  filterData : function(){
    var data=this.customers;
    var dataToShow=[];
    var filteredData=[];
    if(this.view.filterMenu.segStatusFilterDropdown.selectedIndices){
      var seletectedIndices = this.view.filterMenu.segStatusFilterDropdown.selectedIndices[0][1];
      var filterData=this.view.filterMenu.segStatusFilterDropdown.data;
      for(var x=0;x<data.length;x++){
        dataToShow=[];
      	dataToShow=data[x].AccountHolderDetails.filter(function (rec) {
        var flag=false;
        for(var i =0;i<seletectedIndices.length;i++){
          var value=filterData[seletectedIndices[i]].lblDescription
          if(rec.memberType===value)
            flag=true;
        }
        if(flag)	
          return rec;
      });
        if(dataToShow.length!==0){
          filteredData.push({"AccountHolderDetails":dataToShow,"accountId":data[x].accountId});
        }
      }
      return filteredData;
    }
  },
  setFilterData:function(data){
    var self=this;
    var maxSizeText="";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription",
    };
    var filterData = data.map(function(item){
       maxSizeText=item.length>maxSizeText.length?item:maxSizeText;
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": item,
        "imgCheckBox":{
          "src":"checkbox.png"
        }
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    self.view.filterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.filterMenu.segStatusFilterDropdown.setData(filterData);
    self.view.flxFilter.width=flexWidth+"px";
    var indices = [];
    for(var index = 0; index < filterData.length; index++){
      indices.push(index);
    }
    self.view.filterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
  },
  toggleCustomerRadio :function(){
    var path=this.isAccountCentric===true?this.view.segAccountCentricDetails:this.view.segCustomerCentricDetails;
    var index= path.selectedRowIndex[1];
    var data=path.data;
    var row=data[index];
    //var previousLinkedRow="";
    for(var i=0; i<data.length; i++){
      data[i].imgRadio.src ="radio_notselected.png";
      /*if(this.customerIdForProfileLinked=== data[i].id){
        previousLinkedRow=data[i];
        previousLinkedRow.flxUnlink.isVisible=true;
      }*/
    }
    row.imgRadio.src = "radio_selected.png";
    this.selectedCustomer=row.id;
    //this.customerIdForProfileLinked="";
    this.validateCustomerSelection();
    path.setData(data);
    this.view.forceLayout();
  },
  performSearchOnCustomers : function(){
    var self =this;
    var searchResult=[];
    var filteredData=[];
    var searchText = this.view.tbxAccountSearchBox.text;
    for(var i=0;i< this.customers.length;i++){
      filteredData=[];
      if(this.customers[i].accountId.toString().indexOf(searchText) !== -1)
        searchResult.push(this.customers[i]);
      else{
        filteredData=this.customers[i].AccountHolderDetails.filter(self.searchFilter);
        if(filteredData.length!==0){
          searchResult.push({"AccountHolderDetails":filteredData,"accountId":this.customers[i].accountId});
        }
      }
    }
    self.populateSelectedCustomersList(searchResult);
  },
  searchFilter: function(record) {
    var searchText = this.view.tbxAccountSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      return ((record.name&&record.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) || record.firstName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1|| record.lastName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    } else {
      return true;
    }
  },
  /*
   * function to clear search box to defaults
   */
  clearAccountsSearchBoxToDefaults : function(){
    var scopeObj =this;
    if (scopeObj.view.tbxAccountSearchBox.text !== "") {
      scopeObj.view.tbxAccountSearchBox.text = "";
      scopeObj.view.flxAccountSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
      scopeObj.view.flxClearAccountSearchImage.setVisibility(false);
    }
  },
  showLinkProfilesPopup : function(){
    this.view.flxLinkProfilesPopup.setVisibility(true);
    this.view.linkProfilesPopup.btnPopUpNext.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkProfiles_UC");
    
  },
  resetButtons : function(){
    var similarButtonTabs=[0,1,2,3,4];
    var similarButtonTabsWithCreate=[5,6];
    if(similarButtonTabs.contains(this.tabClick)){
       this.view.btnCreate.text=kony.i18n.getLocalizedString("i18n.permission.NEXT");
       this.view.btnCreate.width="100px";
       this.view.btnCreate.setVisibility(true); 
       this.view.btnNext.setVisibility(false);
    }
    else if(similarButtonTabsWithCreate.contains(this.tabClick)){
      this.view.btnCreate.setVisibility(true);
      if(this.action === this.actionConfig.create){
        this.view.btnCreate.text = kony.i18n.getLocalizedString("i18n.frmCreateCustomer.btnLblCreate_User");
        this.view.btnCreate.width="142px";
      } else{
        this.view.btnCreate.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.UPDATE");
        this.view.btnCreate.width="100px";
      }
      this.view.btnNext.setVisibility(true);
      if(this.tabClick===6){
        this.view.btnNext.setVisibility(false);
      }
    }
  },
  onNextClick : function(){
    var scopeObj=this;
    //var similarButtonTabs=[0,1,2,3];
    //if(similarButtonTabs.contains(scopeObj.tabClick)){

    var isValid=true;
    if(scopeObj.view.flxCustomerDetails.isVisible){
      scopeObj.tabClick=2;
    }
    else
      scopeObj.tabClick = scopeObj.tabClick+1;
    if(scopeObj.tabClick===1){
      isValid=scopeObj.validateCustomerSelection();
      var path=this.isAccountCentric===true?this.view.flxAccountCentricSelectError:this.view.flxCustCentricSelectError;
      if(isValid===true && scopeObj.actionConfig.create===scopeObj.action && scopeObj.isAuthorizedSignatoryFlow ){
        var path=this.isAccountCentric===true?this.view.segAccountCentricDetails:this.view.segCustomerCentricDetails;
        var index= path.selectedRowIndex[1];
        var data=path.data;
        scopeObj.setCustomerDetailsForAuthSignatories(data[index]);
      }
    }
    else if(scopeObj.tabClick===2){//Details screen
      isValid = scopeObj.detailsScreenValidation();
      if(isValid) {
        if(scopeObj.action === scopeObj.actionConfig.create){
          scopeObj.checkUsernameAvailability();
        }else{
          var param = scopeObj.OFACverification();
          scopeObj.presenter.OFACverification(param);
        }
      }
    }
    else if(scopeObj.tabClick===3){//Accounts screen
      isValid = scopeObj.checkAccountValidation();
      scopeObj.showHideAddRemoveSegment();
      if (isValid) {
        scopeObj.showAssignRolesScreen();
      } else {
      }
    }
    else if(scopeObj.tabClick===4){//Roles screen
      isValid=scopeObj.validateRoles();
      if(isValid)
        scopeObj.showAccountLevelFeaturesAndActions();
    }
    else if(scopeObj.tabClick === 5){
      	scopeObj.showOtherFeaturesAndActions();
    }
    else if(scopeObj.tabClick === 6){
      	scopeObj.showAssignLimits();
    }
    if(!isValid)
      scopeObj.tabClick = scopeObj.tabClick-1;

  },
   validateCustomerSelection :function(){
    var scopeObj=this;
    var isValid=true;
    var path=this.isAccountCentric===true?this.view.flxAccountCentricSelectError:this.view.flxCustCentricSelectError;
    
    if(scopeObj.selectedCustomer===""){
      path.setVisibility(true);
      isValid=false;
    }
    else{
      path.setVisibility(false);
     }
    scopeObj.view.forceLayout();
    return isValid;
  },
  /* Postponed for next release
  linkBusinessAndRetailProfile : function(){
    var index= this.view.segAccountCentricDetails.selectedRowIndex[1];
    var data=this.view.segAccountCentricDetails.data;
    data[index].flxUnlink.isVisible=false;
    this.view.segAccountCentricDetails.setDataAt(data[index], index);
    this.customerIdForProfileLinked=data[index].id;
    if(this.view.flxSelectedCustomersAccountCentric.isVisible)
    {
      this.tabClick=1;
      this.setCustomerDetailsForAuthSignatories(data[index]);
    }
    else{
      this.view.flxLinkProfilesHeader.setVisibility(true);
      this.view.flxLinkProfileButton.setVisibility(false);
      this.view.lblProfileLinkingMessage.setVisibility(true);
    }

    this.view.flxPopUpConfirmation.setVisibility(false);
    this.view.forceLayout();
  },*/
    mapCustCentricAccountsforEdit: function (accounts) {
    var self = this;
    var widgetMap = {
      "flxCompanySelectedAccountsSec":"flxCompanySelectedAccountsSec",
      "flxAccountHeaderSection":"flxAccountHeaderSection",
      "lblSectionName":"lblSectionName",
      "flxClose":"flxClose",
      "lblSectionLine":"lblSectionLine",
      "fontIconClose":"fontIconClose",
      "flxCompanySelectedAccountsRow":"flxCompanySelectedAccountsRow",
      "flxAccountRowContainer":"flxAccountRowContainer",
      "flxAccountRowRecord":"flxAccountRowRecord",
      "lblRecordName":"lblRecordName",
      "fontIconClose":"fontIconClose",
      "completeRecord":"completeRecord"
    };
    accounts=this.mapAvailableSegmentData(accounts);
    var groupedAccounts = this.groupAccountsByCIF(accounts,1);
    var segData = [];
    var custIdList = Object.keys(groupedAccounts);
    for(var i=0; i< custIdList.length; i++){
      var sectionData = self.mapSelectedAccountsSection(groupedAccounts[custIdList[i]][0]);
      var rows = groupedAccounts[custIdList[i]].map(self.mapSelectedAccountsRow);
      segData.push([sectionData,rows]);
    }
    self.assignedAccounts = Array.from(accounts);    
    self.view.addAndRemoveAccounts.segSelectedOptions.widgetDataMap = widgetMap;
    segData = self.setSkinsToSelectedAccountsSection(segData);
    self.view.addAndRemoveAccounts.segSelectedOptions.setData(segData);
    self.view.addAndRemoveAccounts.segSelectedOptions.info={};
    self.view.addAndRemoveAccounts.segSelectedOptions.info.segData = accounts;
    self.showHideAddRemoveSegment();
    self.view.forceLayout();
  }, 
  groupAccountsByCIF : function(accounts,opt){
    var groupedAcc = accounts.reduce(function(group, acc) {
      if(opt === 1){ //for create company accounts
        (group[acc.completeRecord.Membership_id] = group[acc.completeRecord.Membership_id] || []).push(acc);
      } else{ //for company detail accouns
        (group[acc.Membership_id] = group[acc.Membership_id] || []).push(acc);
      }
      return group;
    }, {});
    return groupedAcc;
  },  
  mapSelectedAccountsSection : function(secData){
    return {
      "completeRecord": secData.completeRecord,
      "CustomerId": secData.completeRecord.Membership_id,
      "flxAccountHeaderSection":"flxAccountHeaderSection",
      "lblSectionName":{"text":kony.i18n.getLocalizedString("i18n.customerSearch.MemberID") +" - "+
                        secData.completeRecord.Membership_id},
      "flxClose":{"onClick":this.removeAccountSectionCustCentric},
      "lblSectionLine":"-",
      "fontIconClose":{"text":"\ue9a5"},
      "template":"flxCompanySelectedAccountsSec",
    };
  },  
  removeAccountSectionCustCentric : function(sectionInd){
    var self = this;
    var selectedRowData = [];
    var sectionIndex = typeof(sectionInd) === "number" ? sectionInd : self.view.addAndRemoveAccounts.segSelectedOptions.selectedsectionindex;
    var rowsData = self.view.addAndRemoveAccounts.segSelectedOptions.data[sectionIndex][1];
    for(var i=0;i< rowsData.length;i++){
      var recordToAdd = self.mapRemovedAccountToAvailableAcc(rowsData[i]);
      self.view.addAndRemoveAccounts.segAddOptions.addDataAt(recordToAdd,0);
      self.modifiedAccountsMap.delete(recordToAdd.lblAccountNum.text);
      self.removeAccountFromAssignedAccounts(recordToAdd.lblAccountNum.text);
    }
    self.view.addAndRemoveAccounts.segSelectedOptions.removeSectionAt(sectionIndex);
    self.view.addAndRemoveAccounts.segSelectedOptions.info.segData = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    self.showHideAddRemoveSegment();
    self.view.forceLayout();
  },  
  removeAccountFromAssignedAccounts : function(accNum){
    var accounts= this.assignedAccounts;
    var updatedAccounts=[];
    for(var i=0;i<accounts.length;i++){
      if(accounts[i].accountId!==accNum){
        updatedAccounts.push(accounts[i]);
      }
    }
    this.assignedAccounts=updatedAccounts;
  },
  /* change skin for last row in selected accounts segment
  * @param: segment data
  * @returns:  updated segment data
  */
  setSkinsToSelectedAccountsSection : function(data){
    for(var i=0;i<data.length; i++){
      var rowLen = data[i][1].length -1;
      if(rowLen >= 0)
        data[i][1][rowLen].flxAccountRowContainer.skin = "sknFlxBgF9F9F9brD7D9E0r3pxBottomRound";
    }
    return data;
  },  
  mapSelectedAccountsRow : function(rowData){
    var self =this;
    return {
      "completeRecord": rowData.completeRecord,
      "CustomerId": rowData.completeRecord.Membership_id,
      "flxAccountRowContainer":{"skin":"sknFlxBgF9F9F9brD7D9E0r1pxLeftRight"},
      "flxAccountRowRecord":"flxAccountRowRecord",
      "lblRecordName":{"text":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT") +" "+
                       rowData.completeRecord. Account_id},
      "flxClose":{"onClick": self.removeAccountRowCustCentric},
      "fontIconClose":{"text":"\ue929",
                       "tooltip": kony.i18n.getLocalizedString("i18n.frmCompanies.Remove_account")},
      "template":"flxCompanySelectedAccountsRow",
    };
  },
    removeAccountRowCustCentric : function(){
    var self = this;
    var selectedRowData = [];
    var secInd = self.view.addAndRemoveAccounts.segSelectedOptions.selectedRowIndex[0];
    var rowIndex = self.view.addAndRemoveAccounts.segSelectedOptions.selectedRowIndex[1];
    var data = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    selectedRowData = self.view.addAndRemoveAccounts.segSelectedOptions.selectedRowItems[0];
    var recordToAdd = self.mapRemovedAccountToAvailableAcc(selectedRowData);
    self.view.addAndRemoveAccounts.segAddOptions.addDataAt(recordToAdd,0);
    self.removeAccountFromAssignedAccounts(recordToAdd.lblAccountNum.text);
    self.modifiedAccountsMap.delete(recordToAdd.lblAccountNum.text);
    if(data[secInd][1].length <= 1){ //clicked on last row left
      self.view.addAndRemoveAccounts.segSelectedOptions.removeSectionAt(secInd);
    } else{
      self.view.addAndRemoveAccounts.segSelectedOptions.removeAt(rowIndex, secInd);
      var segData = self.setSkinsToSelectedAccountsSection(self.view.addAndRemoveAccounts.segSelectedOptions.data);
      self.view.addAndRemoveAccounts.segSelectedOptions.setData(segData);
    }
    
    self.view.addAndRemoveAccounts.segSelectedOptions.info.segData = self.view.addAndRemoveAccounts.segSelectedOptions.data;
    self.showHideAddRemoveSegment();
    self.view.forceLayout();
  },  
  addSelectedAccountCustCentric : function(){
    var widgetMap = {
      "flxCompanySelectedAccountsSec":"flxCompanySelectedAccountsSec",
      "flxAccountHeaderSection":"flxAccountHeaderSection",
      "lblSectionName":"lblSectionName",
      "flxClose":"flxClose",
      "lblSectionLine":"lblSectionLine",
      "fontIconClose":"fontIconClose",
      "flxCompanySelectedAccountsRow":"flxCompanySelectedAccountsRow",
      "flxAccountRowContainer":"flxAccountRowContainer",
      "flxAccountRowRecord":"flxAccountRowRecord",
      "lblRecordName":"lblRecordName",
      "fontIconClose":"fontIconClose",
      "completeRecord":"completeRecord"
    };
    var selectedRowData = [], accSectionIndex = [], recordToAdd;
    var rowIndex = this.view.addAndRemoveAccounts.segAddOptions.selectedIndex[1];
    selectedRowData = this.view.addAndRemoveAccounts.segAddOptions.data[rowIndex];
    var addedAccData = this.view.addAndRemoveAccounts.segSelectedOptions.data;
    this.view.addAndRemoveAccounts.segSelectedOptions.hasSections =  true;
    for(var i=0; i<addedAccData.length; i++){
      if(addedAccData[i][0].completeRecord.Membership_id === selectedRowData.completeRecord.Membership_id){
        accSectionIndex.push(i);
        break;
      }
    }
    if(accSectionIndex.length > 0){ //add to exsisting customerId
      this.assignedAccounts.push(selectedRowData);
      recordToAdd = this.mapSelectedAccountsRow(selectedRowData);
      this.view.addAndRemoveAccounts.segSelectedOptions.widgetDataMap = widgetMap;
      this.view.addAndRemoveAccounts.segSelectedOptions.addDataAt(recordToAdd,accSectionIndex[0]);
      this.view.addAndRemoveAccounts.segAddOptions.removeAt(rowIndex);
    } else { //add new customerId
      this.assignedAccounts.push(selectedRowData);
      var secToAdd = this.mapSelectedAccountsSection(selectedRowData);
      recordToAdd = this.mapSelectedAccountsRow(selectedRowData);
      this.view.addAndRemoveAccounts.segSelectedOptions.widgetDataMap = widgetMap;
      recordToAdd.flxAccountRowContainer.skin = "sknFlxBgF9F9F9brD7D9E0r3pxBottomRound";
      var segData = [];
      segData.push([secToAdd,[]]);
      if(addedAccData.length > 0){
        this.view.addAndRemoveAccounts.segSelectedOptions.addSectionAt(segData, 0);
        this.view.addAndRemoveAccounts.segSelectedOptions.addDataAt(recordToAdd, 0,0);
      } else{ //first record been added
        segData[0][1].push(recordToAdd);
        this.view.addAndRemoveAccounts.segSelectedOptions.setData(segData);
      }
      this.view.addAndRemoveAccounts.segAddOptions.removeAt(rowIndex);
    }
    this.view.addAndRemoveAccounts.segSelectedOptions.info.segData = this.view.addAndRemoveAccounts.segSelectedOptions.data;
    this.showHideAddRemoveSegment();
    if((new Map(JSON.parse(this.accountsMap))).has(selectedRowData.lblAccountNum.text)){
    var selectedAccountFeatures = (new Map(JSON.parse(this.accountsMap))).get(selectedRowData.lblAccountNum.text);
    this.modifiedAccountsMap.set(selectedRowData.lblAccountNum.text, selectedAccountFeatures);
    }
    else{
    var accountMap= new Map(JSON.parse(this.accountsMap));
    accountMap.set(selectedRowData.lblAccountNum.text, JSON.parse(this.sampleAccountFeatures));
    this.accountsMap=JSON.stringify(Array.from(accountMap));
    this.modifiedAccountsMap.set(selectedRowData.lblAccountNum.text, JSON.parse(this.sampleAccountFeatures));
    }
    this.view.forceLayout();
  },
  mapRemovedAccountToAvailableAcc : function(selectedRowData){
    var self =this;
    selectedRowData = selectedRowData.completeRecord
    return {
      "lblAccountNum": {"text": selectedRowData.Account_id},
      "lblAccFieldValue1": {"text": selectedRowData.AccountType},
      "lblAccFieldValue2": (self.isAccountCentric === true) ?
      {"text": selectedRowData.AccountHolder.fullname,
       "info":{"value":selectedRowData.AccountHolder.fullname },
       "tooltip":selectedRowData.AccountHolder.fullname }:
      {"text":self.AdminConsoleCommonUtils.getTruncatedString(selectedRowData.Membership_id, 17, 15) ,
       "info":{"value":selectedRowData.Membership_id},
       "tooltip":selectedRowData.Membership_id },
      "lblAccountText": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNT"),
      "lblAccFieldHeader1": kony.i18n.getLocalizedString("i18n.Group.TYPE"),
      "lblAccFieldHeader2": (self.isAccountCentric === true) ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.JOINT_HOLDER_NAME") : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
      "btnAddAccount": {
        "onClick": (self.isAccountCentric === true)? self.addSelectedAccount : self.addSelectedAccountCustCentric
      },
      "lblLine":{"text": "-"},
      "accountId":selectedRowData.Account_id,
      "template": "flxAvailableAccounts",
      "completeRecord" : selectedRowData
    };
  },
  populateInitialUiForAccountCentric : function(){
    this.view.flxClearAccountSearchImage.setVisibility(false);
    this.populateSelectedCustomersList(this.customers);
    var memberTypes=[];
    for(var i=0;i<this.customers.length;i++){
      for(var j=0;j<this.customers[i].AccountHolderDetails.length;j++){
      if(this.customers[i].AccountHolderDetails[j].memberType&&(!memberTypes.contains(this.customers[i].AccountHolderDetails[j].memberType)))
        memberTypes.push(this.customers[i].AccountHolderDetails[j].memberType);
    }
    }
    if(memberTypes.length!==0)
    	this.setFilterData(memberTypes);
    this.showAccountCentricFlow();
  },
  populateInitialUiForCustomerCentric : function(){
    this.view.flxShowingResults.setVisibility(false);
    this.view.flxCustomers.setVisibility(false);
    this.view.flxNoRecordsAvailable.setVisibility(true);
    this.resetCustomerCentricSearchFields();
    var height=(kony.os.deviceInfo().screenHeight-136-305-80);
    height=height>140?height:140;
    this.view.flxNoRecordsAvailable.height=height+"px";
    this.view.rtxNoRecordsAvailable.text=kony.i18n.getLocalizedString("i18.authorizedSignatories.searchAuthSignatory");
    this.view.flxErrorRow11.setVisibility(false);
    this.showCustomerCentricFlow();
  },
  searchAuthSignatoriesCustCentric : function(){
    if(this.view.lbxSearchParam1.isVisible===true && this.view.lbxSearchParam1.selectedKey==="lbl1"){
      this.view.flxErrorRow11.setVisibility(true);
      this.view.lbxSearchParam1.skin="redListBxSkin";
    }
    else{
    var cif= this.view.lbxSearchParam1.isVisible===true ? this.view.lbxSearchParam1.selectedKey : this.view.txtCustomerId.text;
    this.selectedCustomer="";
    var dateOfBirth= this.view.customCalDob.value===""?undefined:this.view.customCalDob.value;
      if(dateOfBirth){
        dateOfBirth = dateOfBirth.toString().split("/");
        dateOfBirth = dateOfBirth[2]+"-"+dateOfBirth[0]+"-"+dateOfBirth[1];
      }
      var payload={
        "Cif": cif,
        "UserName": this.view.txtSearchParam2.text,
        "Ssn": this.view.txtSearchParam4.text,
        "DateOfBirth": dateOfBirth,
        "Organization_id" : this.action === this.actionConfig.create?this.comapnyDetails.companyID:this.customerDetails.company.id
      };
      this.presenter.searchAuthSignatoriesCustCentric(payload);
    }
  },
  populateSearchCustomersList : function(data){
    var self=this;
    if(data && data.length>0){
      this.view.segCustomerCentricDetails.setData([]);
      var dataMap = {
        "lblName": "lblName",
        "lblSSN": "lblSSN",
        "lblDob" : "lblDob",
        "lblContactNumber" : "lblContactNumber",
        "lblEmail" : "lblEmail",
        "imgRadio": "imgRadio",
        "flxRadio": "flxRadio",
        "flxUnlink":"flxUnlink",
        "lblUnlink":"lblUnlink",
        "id":"id",
        "membershipId":"membershipId",
        "dob":"dob",
        "firstName":"firstName",
        "middleName":"middleName",
        "lastName": "lastName",
        "email": "email",
        "drivingLicenseNumber": "drivingLicenseNumber",
        "phone":"phone",
        "lblSeperator":"lblSeperator",
        "serviceKey":"serviceKey"
      };
      var dataToAdd=[];
      var toAdd;
      for (var i = 0; i < data.length; i++) {
          var dob = (data[i].dateOfBirth).split("-");
    	      var formatDob= dob[1]+"-"+dob[2]+"-"+dob[0];
          var phone = data[i].phone;
          var isd = "",phn ="";
          if(phone.indexOf("-")>= 0){
          phn = phone.split("-")[1];
          isd = phone.split("-")[0];
          } else {
          phn = phone;
         }
        var name=data[i].name || (data[i].firstName + " " + data[i].lastName);
        toAdd = {
          "lblName": {"text": self.AdminConsoleCommonUtils.getTruncatedString(name, 15, 13),"tooltip":name},
          "lblSSN": {"text": self.AdminConsoleCommonUtils.getTruncatedString(data[i].ssn, 10, 7),"tooltip":data[i].ssn},
          "lblDob" : formatDob,
          "lblContactNumber" : phn,
          "lblEmail" : {"text": self.AdminConsoleCommonUtils.getTruncatedString(data[i].email, 19, 17),"tooltip":data[i].email},
          "imgRadio": {"src": data[i].id===this.selectedCustomer?"radio_selected.png": "radio_notselected.png"},
          "flxRadio": {"isVisible": true},
          "flxUnlink":{"isVisible":false,"onClick":function(){
            self.showLinkProfilesPopup();//Postponed for next release
          }},
          "lblUnlink":{
            "text" : "\ue97f",
            "tooltip": "Link"
          },
          "template": "flxCustomerCentricDetails",
          "id": data[i].id,
          "dob":data[i].dateOfBirth,
          "membershipId":data[i].accountId,
          "firstName":data[i].firstName,
          "middleName":data[i].middleName,
          "lastName": data[i].lastName,
          "email": data[i].email,
          "drivingLicenseNumber": data[i].drivingLicenseNumber,
          "phone":data[i].phone,
          "lblSeperator":".",
          "serviceKey": data[i].serviceKey
        };
        dataToAdd.push(toAdd);
        this.view.segCustomerCentricDetails.widgetDataMap = dataMap;
        self.sortBy = self.getObjectSorter("lblName");
        self.resetSortImages();
        var sortedData = dataToAdd.sort(self.sortBy.sortData);
        this.view.segCustomerCentricDetails.setData(sortedData);
        this.view.flxNoRecordsAvailable.setVisibility(false);
        this.view.flxCustomers.setVisibility(true);
      }
    }
    else{
      this.view.flxNoRecordsAvailable.setVisibility(true);
      this.view.rtxNoRecordsAvailable.text= kony.i18n.getLocalizedString("i18n.frmGroups.rtxNoRecordsAvailable");
      this.view.flxCustomers.setVisibility(false);
    }
    this.view.flxShowingResults.setVisibility(true);
    this.view.lblCustomerIDshow.text=this.view.lbxSearchParam1.isVisible?this.view.lbxSearchParam1.selectedKeyValue[1]:this.view.txtCustomerId.text;
    this.view.forceLayout();
  },
  populateCustomerIdListBox : function(accounts){
   var customerId=[];
   var keys=[];
   customerId.push(["lbl1",kony.i18n.getLocalizedString("i18.authorizedSignatories.selectCustomerID")]);
   for(var i=0;i<accounts.length;i++){
     if(keys.includes(accounts[i].Membership_id) === false)
     {   customerId.push([accounts[i].Membership_id,accounts[i].Membership_id]);
         keys.push(accounts[i].Membership_id);
     }
   }    
  if(keys.length===1){
     this.view.txtCustomerId.text=keys[0];
     this.view.lbxSearchParam1.setVisibility(false);
     this.view.txtCustomerId.setVisibility(true);
     this.view.txtCustomerId.setEnabled(false);
   }
   else{
   this.view.lbxSearchParam1.setVisibility(true);
   this.view.txtCustomerId.setVisibility(false);
   this.view.lbxSearchParam1.masterData = customerId;
   this.view.lbxSearchParam1.selectedKey = "lbl1";
  }
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },
  resetSortImages : function() {
    var self = this;
    self.sortIconFor('lblName.text', 'lblNameSortIcon');
    self.sortIconFor('lblSSN.text', 'lblSsnSortIcon');
    self.sortIconFor('lblDob', 'lblDobSortIcon');
    self.sortIconFor('lblContactNumber', 'lblContactSortIcon');
    self.sortIconFor('lblEmail.text', 'lblEmailSortIcon');
  },
  sortAndSetData : function(segData, sortColumn) {
    var self = this;
    self.sortBy.column(sortColumn);
    self.resetSortImages();
    return segData.sort(self.sortBy.sortData);
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
    }
    self.view.forceLayout();
  },
  isAlphaNumeric : function(code) {
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
    return true;
  },
  validateSameConsecutiveSpecialCharacters : function(enteredText){
    var code, i,prevCode;
    for (i = 0; i < enteredText.length; i++) {
      code = enteredText.charCodeAt(i);
      if(i==0)
        prevCode=code;
      else if(prevCode === code && this.isAlphaNumeric(code)===false)
        return false;
      prevCode=code;
    }
    return true;
  },
  filterAccounts : function(accounts){
    var cleanAccounts = []; 
    if(this.isAuthorizedSignatoryFlow===true){
    for(var i=0;i<accounts.length;i++){
        if(accounts[i].isOrganizationAccount==="true")
          cleanAccounts.push(accounts[i]);
    }
    }
    else
      return accounts;
    return cleanAccounts;
  },
  resetCustomerCentricSearchFields : function(){
    this.view.txtSearchParam2.text="";
    this.view.customCalDob.value = "";
    this.view.customCalDob.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.txtSearchParam4.text="";  
  }
});

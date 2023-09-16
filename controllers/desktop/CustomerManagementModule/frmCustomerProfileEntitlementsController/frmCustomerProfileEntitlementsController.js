define({  
  selectedFeatureIndex : 0,
  prevSelectedFeature:[],
  groupActionConfig :{
    CREATE:"CREATE",
    EDIT:"EDIT",
    COPY: "COPY"
  },
  featuresList:{},  
  searchResult :{
    isFeatureMatched : false,
    isLimitMatched : false,
    isAcctMatched : false,
    isActionMatched : false
  },
  selectedAccountByView : [],
  removeCount : 0,
  recordsSize:5,
  prevIndex : -1,
  allMonActionsList:null,
  customerType :"",
  loadMoreModel:{
    PAGE_OFFSET:0,
    TOTAL_PAGES:0
  },
  totalPages:0,
  searchFilterRecords:[],
  AccountLevelFeaturesTab : false,
  selectedTab : 1,
  actionsEnableJson:{},
  searchFilterRecord : [],
  cachedOtherFeaturesData: {},
  cachedFeaturesForAccData: {},
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
        //this.showToggleButtons(context.CustomerBasicInfo.customer);
        this.view.tabs.setCustomerProfileTabs(this);
      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if(context.featureDetails){
        this.showRoleDetailsPopup(context.featureDetails.features);
      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

      }
      else if (context.featuresList){
        this.cachedOtherFeaturesData= {};
        this.cachedFeaturesForAccData= {};
        var custStatus=this.presenter.getCurrentCustomerDetails().CustomerStatus_id;
        var isAssociated=this.presenter.getCurrentCustomerDetails().isAssociated;
        if(context.featuresList.FeaturesAndActions.length===0&&custStatus==="SID_CUS_SUSPENDED"&&isAssociated==="false"){
          this.view.rtxMsgProducts.text=kony.i18n.getLocalizedString("i18n.customerProfileContracts.noContractsMsg");
          this.view.rtxMsgProducts.setVisibility(true);
          this.view.flxFeaturesSearchContainer.setVisibility(false);
          this.view.flxFeaturesByCustomerCont.setVisibility(false);
          this.view.forceLayout();
        }else if(!this.featuresList || this.featuresList.length === 0){
          this.view.rtxMsgProducts.isVisible = true;
        }else{
          this.view.rtxMsgProducts.isVisible = false;
          var formattedResponse = this.formatContractResForFeatures(context.featuresList.FeaturesAndActions);
          this.featuresList.globalLevelPermissions = this.groupBycontracts( formattedResponse);
          this.featuresList.accountLevelPermissions =  this.groupBycontracts(  formattedResponse);

          context.featuresList = "";
          this.setFeaturesActionsScreen();

          // intially we set the account level permission
          this.AccountLevelFeaturesTab = true;
          // this.createContractTemplate(this.featuresList.accountLevelPermissions);
          this.accLvlTabOnClick();
        }
      }
      else if (context.allFeatures){
       // this.filterRetailFeatures(context.allFeatures);
      }
      else if(context.userNameRulesPolicy){
        this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
      } 
      else if (context.FeaturesAndActions) {
        /*this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName5);
        if (context.FeaturesAndActions.target === "InfoScreen") {
          this.showFeaturesAndActionsScreen(context.FeaturesAndActions);
        } */
      } 
      else if(context.linkProfilesList){
        this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList,this);
      }
      else if(context.userNameIsAvailable){
        this.view.delinkProfilePopup.checkUserNameAvailability(context.userNameIsAvailable);
      } else if(context.checkAuthSignatory){ 
        //for business user,to get isauthSignatory flag in case not available in basicInfo
        var customerType = context.checkAuthSignatory.customer.CustomerType_id;
        var status = context.checkAuthSignatory.customer.CustomerStatus_id;
         //hiding link/delink profile buttons
        /*if (status === "LOCKED" || status === "SUSPENDED" || status === "NEW") {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,false);
        }  else {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,true);
        }*/
      } else if(context.custFeaturesList){
        kony.adminConsole.utils.hideProgressBar(this.view);
        if(context.custFeaturesList.cardContext.isViewByAcc && context.custFeaturesList.cardContext.isViewByAcc=== true){
           this.setViewByAccountsData(context.custFeaturesList);
        }else{
          this.setFeaturesDataOnExpand(context.custFeaturesList);
        }
       
      }
      else if(context.custDetails){ 
        if(context.category === "NAME_CLICK"){
          this.setCustomerDetailsPopupData(context.custDetails);
        }else{ 
          this.setTaxIdPopupData(context.custDetails);
        }
      }
    }   
  },
  groupBycontracts: function(levelPermissions ){
    if(!levelPermissions){ return [];}

    let groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    let result = [];
    let json_data = groupBy(levelPermissions, 'contractId');

    for(let i in json_data)
        result.push(json_data [i]);
    return result;
  },
  
  setTaxIdPopupData: function(Data) {
   this.view.DataFields.lblPopUpMainMessage.text=this.view.DataFields.info.customerName;
    this.view.DataFields.lblHeading1.text = "TAX ID";
    this.view.DataFields.lblHeading2.text = "ADDRESS";
    if(Data.taxId === ""){
      this.view.DataFields.lblData1.text = "N/A";
    }
    else{
      this.view.DataFields.lblData1.text = Data.taxId;
    }
    this.view.DataFields.lblData2.text = Data.addressLine1+" "+Data.addressLine2;
    this.view.DataFields.setVisibility(true);
    this.view.popUpContainer.setVisibility(true);
    this.view.forceLayout();
  },
  
  
  CustomerProfileFeaturesPreshow: function () {
    var self = this;
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName5);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 135 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.view.searchBoxFeatures.tbxSearchBox.text ="";
    this.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
    this.view.dropdownEntity.flxSegEntity.setVisibility(false);
    var LEData = this.presenter.getDataLegalEntities();
    if(LEData) {
    this.setDataforLegalEntity(LEData);
    } else {
      var legalEntityId = this.presenter.getLegalEntity();
      var legalEntity = this.getLEDesc(legalEntityId);
      this.setDataforSingleLegalEntity(legalEntity);
    } 
    this.setFlowActions();
    this.view.flxFeaturesContainer.setVisibility(true);
    this.currencyValue = this.defaultCurrencyCode();
    this.view.DataFields.flxPopUpClose.onClick = function() {
          self.view.popUpContainer.setVisibility(false)
    }
     
      
  },
  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileEntitlements_flxMainContent").onscroll = function () { };
  },
  filterSearchResults : function (permissions , searchTxt) {
   
    let result = [];
    for(var i=0;i< permissions.length;i++){
      
      //cloning json
      let permission =  JSON.parse(JSON.stringify(permissions[i][0]));

      let check = false;
      let custId = permission.coreCustomerId || permission.id;
      let custName = permission.coreCustomerName || permission.name;
      if(custName.toLowerCase().indexOf(searchTxt) !=-1 || 
        custId.toLowerCase().indexOf(searchTxt) !=-1){
          // customer name , customer id
          check =true;
      }
      if(check){
        result.push([permission]);      
      }      
    }
    return result;
  },
  setDataforLegalEntity: function(segData)
    {
      var heading = [      {
        "id":"LEGAL ENTITY",
        "companyName":"LEGAL ENTITY",
        "region":"LEGAL ENTITY",
        "description":"LEGAL ENTITY"
      },
                    ];
      var widMap={
        "flxSearchDropDown":"flxSearchDropDown",
        "lblDescription":"lblDescription",
        "id":"id"
      };
      var data=heading.concat(segData);
      var LegalEntityData = data.map(function(en){
        return {
          "flxSearchDropDown": {"isVisible": true,"hoverSkin":"sknFlxBgd7effa"},
          "lblDescription": en.description,
          "id":en.legalEntity,
        };
      });
      
      
       if(data.length>1){
        var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
        var legalEntity = presentationController.getLegalEntity();
        for(var i=1;i<data.length;i++)
        {
          if(data[i].legalEntity==legalEntity){
            this.view.dropdownEntity.lblSelectLegalEntity.text = data[i].description;
          }
        }   
        this.view.dropdownEntity.lblSelectLegalEntity.info = legalEntity;
        this.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
      }
      else if(this.view.dropdownEntity.lblSelectLegalEntity.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity")){
      }
      this.view.dropdownEntity.segEntity.widgetDataMap = widMap;
      this.view.dropdownEntity.segEntity.setData(LegalEntityData);
      this.view.dropdownEntity.segEntity.info = {
        "data": LegalEntityData
      };
      this.view.dropdownEntity.segEntity.setVisibility(LegalEntityData.length > 1);
      this.view.dropdownEntity.segEntity.selectedRowIndex = [0,1];
      this.view.dropdownEntity.segEntity.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
      this.view.forceLayout();
    },

    setDataforSingleLegalEntity: function(segData) {
      var widMap={
       "lblDescription":"lblDescription",
       "id":"id"
     };
     var LegalEntityData = segData.map(function(en){
       return {
         "lblDescription": en.companyName,
         "id":en.id,
       };
      });
     this.view.dropdownEntity.lblSelectLegalEntity.text = segData[0].companyName;
     this.view.dropdownEntity.segEntity.widgetDataMap = widMap;
     this.view.dropdownEntity.segEntity.setData(LegalEntityData);
     this.view.dropdownEntity.segEntity.info = {
       "data": LegalEntityData
     };  
     this.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
     this.view.dropdownEntity.segEntity.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
     this.view.forceLayout();
   },
   
  
  expandFirstContract:function(){
    var scopeObj = this;
    // first searched element should be expanded
    if(scopeObj.searchResult.isFeatureMatched ||scopeObj.searchResult.isActionMatched ){
        let widgets = scopeObj.view.flxFeaturesByCustomerCont.widgets();
        if(widgets.length > 0){
          // opening first customer's contract 
          if(scopeObj.view["featureCustCard00C00"] && scopeObj.view["featureCustCard00C00"].flxArrow){
            scopeObj.view["featureCustCard00C00"].toggleCollapseArrow(true);
          }
        }
    }
  },
  setFlowActions: function () {
    var scopeObj = this;
    
    this.view.contractDetailsPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxContractDetailsPopup.setVisibility(false);
    };
    this.view.searchBoxFeatures.flxIconBackground.onClick = function(){ 
      if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text.length > 3){
        scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(true);
        scopeObj.onClickOfSearchIcon();
      }
      scopeObj.view.forceLayout();
    };
    const searchInternalUsers1 = function() {
        scopeObj.view.searchBoxFeatures.flxIconBackground.onClick();
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
      const searchInternalUsersCall = debounce(searchInternalUsers1, 300);
    this.view.searchBoxFeatures.tbxSearchBox.onDone = function(){
      if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text.length > 3 || scopeObj.view.searchBoxFeatures.tbxSearchBox.text === ""){
        if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text === ""){
          scopeObj.view.searchBoxFeatures.flxClearSearch.onClick();
        }else{
          scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(true);
        }
        searchInternalUsersCall();
        scopeObj.view.forceLayout();
      }
    };
    this.view.searchBoxFeatures.flxClearSearch.onClick = function(){
      scopeObj.searchFilterRecord = [];
      scopeObj.view.searchBoxFeatures.tbxSearchBox.text = "";
      scopeObj.resetPaginationValues();
      scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(false);

      if(scopeObj.AccountLevelFeaturesTab){
        // AccountLevelFeaturesTab tab
          
          if(scopeObj.view.searchBoxFeatures.tbxSearchBox.placeholder === kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits")){
            scopeObj.createContractTemplate(scopeObj.featuresList.accountLevelPermissions);
          }else{
            //  viewing by accounts
            scopeObj.createAccountFeatureCards(scopeObj.selectedAccountByView);
          }
        }else{
            // other features tab
            scopeObj.createContractTemplate(scopeObj.featuresList.globalLevelPermissions);
        }
    }; 
    this.view.dropdownEntity.flxSelectLegalEntity.onClick = function () {
      var segmntData = scopeObj.view.dropdownEntity.segEntity.data;
      if (segmntData.length === 1) { // dropdown not required if only one LE available
        scopeObj.this.view.dropdownEntity.flxSegEntity.setVisibility(false);
      }
      else {
        if (scopeObj.view.dropdownEntity.flxSegEntity.isVisible === false) {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(true);
        } else {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
        }
      }
    };
    this.view.flxCloseLimits.onClick = function(){
      scopeObj.view.flxViewLimitsPopup.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxFeatureDetailsClose.onClick = function(){
      scopeObj.view.flxFeatureDetails.setVisibility(false);
    };
    this.view.SuspendUserpopUp.btnPopUpNo.onClick = function(){
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.tabsFeatures.btnTab1.onClick = function(){
      scopeObj.accLvlTabOnClick();
    };
    this.view.tabsFeatures.btnTab2.onClick = function(){
      var widArr = [scopeObj.view.tabsFeatures.btnTab1,scopeObj.view.tabsFeatures.btnTab2];
      scopeObj.selectedTab = 2;
      scopeObj.view.flxCustFeaturesListContainer.setVisibility(true);
      scopeObj.view.flxAccFeaturesListContainer.setVisibility(false);
      scopeObj.view.flxBackToFeaturesByCust.setVisibility(false);
      scopeObj.view.searchBoxFeatures.tbxSearchBox.text = "";
      scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
      // we set other features and action
      scopeObj.AccountLevelFeaturesTab = false;
      scopeObj.createContractTemplate(scopeObj.featuresList.globalLevelPermissions);
      scopeObj.subTabsButtonWithBgUtilFunction(widArr,scopeObj.view.tabsFeatures.btnTab2);
    };
   /* this.view.btnfeaturesActionsEdit.onClick = function(){
      scopeObj.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
    };
    this.view.btnEditAdditionalFeatures.onClick = function(){
      scopeObj.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
    };
    this.view.toggleButtons.btnToggleLeft.onClick = function(){
      scopeObj.view.toggleButtons.info.selectedTab = 1;
      scopeObj.setFeturesAndActionsScreenData(scopeObj.view.toggleButtons.btnToggleLeft.info.featuresData,
                                              scopeObj.view.toggleButtons.btnToggleLeft.info.typeId);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],1);
    };
    this.view.toggleButtons.btnToggleRight.onClick = function(){
      scopeObj.view.toggleButtons.info.selectedTab = 2;
      scopeObj.setFeturesAndActionsScreenData(scopeObj.view.toggleButtons.btnToggleRight.info.featuresData,
                                              scopeObj.view.toggleButtons.btnToggleRight.info.typeId);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],2);
    };*/
    this.view.flxBackToFeaturesByCust.onClick = function(){
      scopeObj.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits");
      scopeObj.showCustFeaturesActionScreen(true);
    };
    this.view.flxRoleDetailsClose.onClick = function(){
      scopeObj.view.flxRoleDetailsPopup.setVisibility(false);
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
      if(currentValue <= scopeObj.loadMoreModel.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChange(currentValue);
      }
    };
    this.view.dropdownEntity.tbxSearchBox.onKeyUp = function() {
            if (scopeObj.view.dropdownEntity.tbxSearchBox.text.trim().length > 0) {
                scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(true);
                var segData = scopeObj.view.dropdownEntity.segEntity.data;
                var searchText = scopeObj.view.dropdownEntity.tbxSearchBox.text;
                var statusName = "";
                var filteredData = segData.filter(function(rec) {
                    statusName = rec.lblDescription.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0)
                    { 
                      scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(true);
                      return rec;
                    }
                });
                if (filteredData.length === 0) {
                    scopeObj.view.dropdownEntity.segEntity.setVisibility(false);
                    scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(true);
                } else {
                    scopeObj.view.dropdownEntity.segEntity.setData(filteredData);
                    scopeObj.view.dropdownEntity.segEntity.setVisibility(true);
                    scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(false);
                    
                }
            } else {
               scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(false);
                var totalRecords = scopeObj.view.dropdownEntity.segEntity.info.data;
                scopeObj.view.dropdownEntity.segEntity.setData(totalRecords);
            }
            scopeObj.view.forceLayout();
        },
        this.view.dropdownEntity.flxSearchCancel.onClick = function() {
            scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(false);
            scopeObj.view.dropdownEntity.tbxSearchBox.text = "";
            var totalRecords = scopeObj.view.dropdownEntity.segEntity.info.data;
            scopeObj.view.dropdownEntity.segEntity.setData(totalRecords);
            scopeObj.view.dropdownEntity.segEntity.setVisibility(true);
            scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(false);
        },
        this.view.dropdownEntity.flxSegEntity.flxSegData.segEntity.onRowClick = function() {
         var rowInd = scopeObj.view.dropdownEntity.segEntity.selectedRowIndex[1];
         var segData = scopeObj.view.dropdownEntity.segEntity.data;
          if(segData[rowInd].lblDescription !== "LEGAL ENTITY")
           {
            scopeObj.view.dropdownEntity.lblSelectLegalEntity.text = segData[rowInd].lblDescription;
            scopeObj.view.dropdownEntity.lblSelectLegalEntity.info={"id":segData[rowInd].id};
            scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
            scopeObj.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
            var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
            var Id = presentationController.getCustomerId();
            scopeObj.presenter.getCustomerBasicInfo({
             "Customer_id":Id,
             "legalEntityId": segData[rowInd].id, 
            }
            );
           }
        };
    this.view.cardPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.cardPagination.tbxPageNumber.text;
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.loadMoreModel.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.loadMoreModel.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChange(currentValue);
      }
    };
  },
  saveScreenY: function (widget, context) {
    this.mouseYCoordinate = ((context.screenY + this.view.flxMainContent.contentOffsetMeasured.y) - (this.view.breadcrumbs.frame.height + this.view.mainHeader.flxMainHeader.frame.height));
  },
  onDropdownHoverCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) { //for filter dropdown
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widget.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.setVisibility(false);
      }
    }
  },
  /*
  * show features actions at customer level
  */
  showCustFeaturesActionScreen : function(isBackAction){
    this.view.flxCustFeaturesListContainer.setVisibility(true);
    this.view.flxAccFeaturesListContainer.setVisibility(false);
    this.view.flxBackToFeaturesByCust.setVisibility(false);
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits");
    this.view.searchBoxFeatures.tbxSearchBox.text = "";
    this.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
    if(isBackAction && isBackAction === true){
      if(this.AccountLevelFeaturesTab === true){
        // reset AccountLevelFeaturesTab tab
        if(this.view.searchBoxFeatures.tbxSearchBox.placeholder === kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits")){
          this.createContractTemplate(this.featuresList.accountLevelPermissions);
        }
      }
    }
    this.view.forceLayout();
  },
  /*
  * show the account level features actions for the customer screen
  */
  showFeaturesAtAccountLevel : function(accounts , coreCustomer){
    var selectedCustomer = (coreCustomer.coreCustomerName|| coreCustomer.name) + " ("+(coreCustomer.coreCustomerId ||coreCustomer.id)+")";
    this.view.lblSelectedCustValue.text = selectedCustomer;
    this.storeCustomActionsData(coreCustomer);
    this.view.flxBackToFeaturesByCust.setVisibility(true);
    this.view.flxCustFeaturesListContainer.setVisibility(false);
    this.view.flxAccFeaturesListContainer.setVisibility(true);
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits");
    this.view.searchBoxFeatures.tbxSearchBox.text = "";
    this.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
    this.selectedAccountByView = accounts;
    this.createAccountFeatureCards(accounts, coreCustomer, true);
    this.view.forceLayout();
  },
  /*
  * show features actions tab screen and create cards
  */
  setFeaturesActionsScreen :function(){
    var widArr = [this.view.tabsFeatures.btnTab1,this.view.tabsFeatures.btnTab2];
    this.subTabsButtonWithBgUtilFunction(widArr,this.view.tabsFeatures.btnTab1);
    this.showCustFeaturesActionScreen();
    
  },
  /*
  * create contract containers dynamically
  */
  createContractTemplate : function(lvlPermissions){
    this.resetPaginationValues(lvlPermissions.length);
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits");
    this.searchFilterRecords = [];
    this.cachedFeaturesForAccData = {};
    this.cachedOtherFeaturesData = {};
    this.view.flxFeaturesByCustomerCont.info={"permissions":lvlPermissions};
    if(!lvlPermissions || lvlPermissions.length ==0){
      this.view.rtxMsgProducts.isVisible = true;
     // this.view.flxFeaturesPagination.setVisibility(false);
      this.view.forceLayout();
      return;
    }else{
      this.view.rtxMsgProducts.isVisible = false;
     // this.view.flxFeaturesPagination.setVisibility(true);
    }
     this.loadMoreModel.TOTAL_PAGES = Math.ceil(lvlPermissions.length/10);
	if(lvlPermissions.length<10){
      this.createFeatureCards(0,lvlPermissions.length);
      this.loadMoreModel.PAGE_OFFSET = lvlPermissions.length;
    }
    else{
    this.createFeatureCards(0,10);
    this.loadMoreModel.PAGE_OFFSET = 10;
    }
  },
  /*

  * set pagination values to initial page

  */

  resetPaginationValues : function(dataLen){
    this.loadMoreModel = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : 0
    };
     if(dataLen<10)
     {
       this.view.flxFeaturesPagination.setVisibility(false); 
     }
    else{
      this.view.flxFeaturesPagination.setVisibility(true); 
    var totalRecords=dataLen?dataLen:this.view.cardPagination.lblShowing.info;
    this.view.cardPagination.lblNumber.text = "1";
    this.view.cardPagination.tbxPageNumber.text = "1";
    //var nextSetCount=totalRecords<10?totalRecords:10;
   // this.view.cardPagination.lblShowing.text = "Showing 1 - "+nextSetCount+" Of " + totalRecords;
    this.view.cardPagination.lblShowing.text = "Showing 1 - 10 Of " + totalRecords;
    this.view.cardPagination.lblShowing.info=totalRecords;
    }
},
  updatePaginationValues : function(currentPage){
    this.view.cardPagination.lblNumber.text = currentPage;
    this.view.cardPagination.tbxPageNumber.text = currentPage;
    var nextSetCount=currentPage*10<parseInt(this.view.cardPagination.lblShowing.info)?currentPage*10:this.view.cardPagination.lblShowing.info;
    this.view.cardPagination.lblShowing.text = "Showing "+ (currentPage*10-9)+" - "+nextSetCount+" Of " + this.view.cardPagination.lblShowing.info;
    this.view.forceLayout();
  },
  createFeatureCards : function(start,end, searchResults){
    var lvlPermissions= searchResults === undefined ? this.view.flxFeaturesByCustomerCont.info.permissions : searchResults;
    this.view.flxFeaturesByCustomerCont.removeAll();
    end=lvlPermissions.length>end?end:lvlPermissions.length;
    for(var i = start;i< end;i++){
      var flxId = i>=10 ? ""+i : "0"+i;
      var contractFlex = this.view.flxFeaturesContractCardTemplate.clone(flxId);
      contractFlex.top = "10dp";
      contractFlex.isVisible = true;
      this.view.flxFeaturesByCustomerCont.add(contractFlex);
      
      let coreCustomers = lvlPermissions[i];
      // the feature cards are used for mapping customers
      this.createCustFeatureCards(flxId , coreCustomers  );
      
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /*
  * create feature cards for customer inside the contract containers
  * the feature cards are used for mapping customers
  * @param: contract container id
  */
  createCustFeatureCards : function(parentWidId ,coreCustomers ){
     var self = this;
    this.view[parentWidId+"flxFeatureCardsContainer"].removeAll();
    
    // setting the contract name
    this.view[parentWidId +'lblHeading'].text = coreCustomers[0].contractName +' (' +coreCustomers[0].contractId+')';

    for (var i = 0; i < coreCustomers.length; i++) {
      var num = i>10 ? ""+i : "0"+i;
      var id = parentWidId+"C"+num;
      var coreCustomer  = coreCustomers[i];
      var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
      var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
        "id": "featureCustCard" +id,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width":"100%",
        "top": "15dp"
      }, {}, {});
      featureCardToAdd.isVisible = true;
      featureCardToAdd.showFourColumns();
      featureCardToAdd.lblName.text = coreCustomer.coreCustomerName || coreCustomer.name;
      featureCardToAdd.lblCount.isVisible = false;
      featureCardToAdd.lblData1.text = coreCustomer.coreCustomerId || coreCustomer.id;
      //featureCardToAdd.lblData2.text = coreCustomer.taxId;
     //featureCardToAdd.lblData3.text = coreCustomer.addressLine1  ? coreCustomer.addressLine1 +","+coreCustomer.addressLine2 : "N/A";
      featureCardToAdd.lblData2.text = "View";
      featureCardToAdd.lblHeading2.left = "40px";
      featureCardToAdd.lblData2.skin = "sknLblLato13px117eb0Cursor";
      featureCardToAdd.lblData3.text = coreCustomer.userRoleName;
      featureCardToAdd.lblHeading3.text = "ROLE";
       featureCardToAdd.lblHeading3.left = "80px";
        featureCardToAdd.lblData3.left = "80px";
      featureCardToAdd.lblHeading2.text = "TAX ID & ADDRESS";
      featureCardToAdd.lblHeading4.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Profile_ROLE");
        //this.view.DataFields.lblData1.text = coreCustomer.taxId;
        //this.view.DataFields.lblData2.text = coreCustomer.addressLine1  ? coreCustomer.addressLine1 +","+coreCustomer.addressLine2 : "N/A";
      featureCardToAdd.flxColumn4.isVisible=false;
      featureCardToAdd.lblData2.left = "40px";
      featureCardToAdd.lblData2.onTouchEnd = function() {
        var inputParams = {      
           "coreCustomerId":coreCustomer.coreCustomerId || coreCustomer.id,
           "legalEntityId":legalEntityId
        };
        self.view.DataFields.info={"customerName":coreCustomer.coreCustomerName || coreCustomer.name};
        self.presenter.getCoreCustomerDetails(inputParams);
        self.view.forceLayout();
      };

      // onTouchStart on the below label is not smooth updating to onClick
      featureCardToAdd.lblName.onClick = function(){
        var inputParams = {      
           "coreCustomerId":coreCustomer.coreCustomerId || coreCustomer.id,
           "legalEntityId":legalEntityId
        };
        this.presenter.getCoreCustomerDetails(inputParams,"NAME_CLICK");
      }.bind(this);
      var custBasicInfo = this.presenter.getCurrentCustomerDetails();
      var coreCustId = coreCustomer.coreCustomerId || coreCustomer.id;
      if(coreCustId === custBasicInfo.primaryCustomerId){
        featureCardToAdd.flxPrimary.setVisibility(true);
      }
      //hide edit button if customer is not accessable for current logged in user
      featureCardToAdd.btnEdit.isVisible = custBasicInfo.isCustomerAccessiable === true ? true : false;
      // assign data and actions for a feature card
      this.setDataActionsForCustFeatureCard(featureCardToAdd , coreCustomer );
      this.view[parentWidId+"flxFeatureCardsContainer"].add(featureCardToAdd);
    }
    this.view.forceLayout();
  },
  /*
  * assign data and actions for a feature card
  * @param: cust feature card path, data to set
  */
  setDataActionsForCustFeatureCard : function(featureCard,coreCustomer ){
    var self=this;
    featureCard.flxDynamicWidgetsContainer.isVisible = false;
    featureCard.flxHeadingRightContainer.isVisible = true;
    featureCard.lblData3.skin = "sknLblLato13px117eb0Cursor";
    featureCard.btnView.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.ViewByAccounts");
    featureCard.flxArrow.onClick = this.fetchFeaturesOnExpand.bind(this,featureCard,coreCustomer,1);
    featureCard.btnEdit.onClick = function(){
      self.editFeaturesOnClick(featureCard,false, coreCustomer);
    };
    
    var selectedCustomer = (coreCustomer.coreCustomerName||coreCustomer.name) + " ("+coreCustomer.coreCustomerId || coreCustomer.id+")";
    var accLevelFeatures = coreCustomer.accounts ? JSON.parse(JSON.stringify(coreCustomer.accounts)) : [];
    var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
    featureCard.btnView.onClick = this.viewByAccountsClick.bind(this,featureCard , coreCustomer, 2);
    featureCard.lblData3.onClick = this.presenter.getGroupFeaturesAndActions.bind(this, coreCustomer.userRole ,legalEntityId,'frmCustomerProfileEntitlements' );
    featureCard.toggleCollapseArrow(false);
    
    featureCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.CompanyFeatures");
    if(this.AccountLevelFeaturesTab){     
      featureCard.btnView.isVisible = true;
    }else{
      // for other features and actions tab
      featureCard.btnView.isVisible = false;
    }  
  },
  /*
  * widget map for features segments
  * @returns: widget map json
  */
  getWidgetDataMapForFeatures : function(){
    var widgetMap ={
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
    return widgetMap;
  },
 /*
  * set features and actions segment data in feature card
  * @param: segment widget path, features list, category(1:cust level,2:acc level)
  */
  setFeaturesCardSegmentData : function(segmentPath , features, category){
    var self =this;
    var featuresSegData = features.map(function(rec){
      var segRowData = [];
      let totalLen = rec.permissions.length;
      
      // filtering using the isEnabled flag
      rec.permissions = rec.permissions.filter(function(permission) {return permission.isEnabled !== 'false';});
      var segSecData = {
        "id":rec.featureId,
        "flxViewActionHeader":{"isVisible":false},
        "lblFASeperator3":{"isVisible":false,"text":"-"},
        "lblArrow":{"text":"\ue922","skin":"sknfontIconDescRightArrow14px"},
        "flxArrow":{"onClick": self.toggleSegmentSectionArrow.bind(self,segmentPath)},
        "lblFeatureName":rec.featureName,
        "statusValue":{"text":rec.featureStatus === "SID_FEATURE_ACTIVE" ?"Active" : "Inactive"},
        "statusIcon":{"skin": rec.featureStatus  === "SID_FEATURE_ACTIVE"?"sknFontIconActivate" : "sknfontIconInactive",
                      'text':''},
        "lblCustom":{"isVisible":false},
        "lblFASeperator1":"-",
        "lblFASeperator2":"-",
        "lblAvailableActions":"Available Actions: ",
        "lblCountActions": rec.permissions.length,
        "lblTotalActions":"of "+totalLen,
        'flxSelectedActions' :{'width':"50%"},
        "lblActionHeader":"ACTION",
        "lblActionDescHeader":"DESCRIPTION",
        "lblActionStatusHeader":"STATUS",
        "template":"flxContractsFAHeaderView"
      };
      for(var i=0;i < rec.permissions.length; i++){
        var featureActionId = rec.featureId+self.currencyValue+rec.permissions[i].id;
        // show custom label for action if array contains a false value for any account
        if(self.AccountLevelFeaturesTab)
          var showCustomLabel = (self.actionsEnableJson[featureActionId].indexOf("false") >= 0) ? true: false;
        segRowData.push({
          "id":rec.permissions[i].id,
          "isRowVisible": false,
          "flxContractsFABodyView":{"isVisible":false},
          "lblActionName":{"text":rec.permissions[i].actionName},
          "lblActionDesc":{"text":rec.permissions[i].actionDescription,
                           "width": (self.AccountLevelFeaturesTab && category === 1 && showCustomLabel === true) ? "52%":"55%"},
          "statusValue":{"text":rec.permissions[i].actionStatus === "SID_ACTION_ACTIVE" ?"Active" : "Inactive"},
          "statusIcon":{"skin":rec.permissions[i].actionStatus === "SID_ACTION_ACTIVE" ?"sknFontIconActivate" : "sknfontIconInactive",
                        "text" :''},//"sknfontIconInactive",
          "lblCustom":{"isVisible": (self.AccountLevelFeaturesTab && category === 1) ? showCustomLabel : false},
          "template":"flxContractsFABodyView",
        });
      }
      //set the custom label visibility for feature
      if(self.AccountLevelFeaturesTab && category === 1){
        var featureCustomFlag = false;
        for(var j=0; j< segRowData.length; j++){
          if(segRowData[j].lblCustom.isVisible === true){
            featureCustomFlag = true;
            break;
          }
        }
        segSecData.lblCustom.isVisible = featureCustomFlag;
      }
      
      if( segRowData.length === 0){
        return [segSecData, [{"template": "flxContractsFAHeaderView"}]];
      }
      else {
        return [segSecData, segRowData];
      }      
    });
    segmentPath.widgetDataMap = this.getWidgetDataMapForFeatures();
    segmentPath.setData(featuresSegData);
    this.view.forceLayout();
  },
  /*
  * toggles the card to show the list of features container
  * @param: current card widget path, option(1/2)
  */
  toggleCardListVisibility : function(cardWidget,option){
    var custFeatureCards = [];
    if(option === 1){
      var contractFlex = this.view.flxFeaturesByCustomerCont.widgets(); 
      //get array of all card widgets
      for(var i=0;i<contractFlex.length;i++){
        var parentFlxId = contractFlex[i].id.substr(0,2);
        var cardsUnderContract = contractFlex[i][parentFlxId+"flxFeatureCardsContainer"].widgets();
        custFeatureCards = custFeatureCards.concat(cardsUnderContract);
      }
    } else{
      custFeatureCards = this.view.flxAccountFeaturesCardList.widgets();
    }
    
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
            segData[k][1] = this.showHideSegRowFlex(segData[k][1],false);
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
  * expand/collapse the rows under a section
  * @param: segment widget path, event
  */
  toggleSegmentSectionArrow : function(segmentWidgetPath,event){
    var segData = segmentWidgetPath.data;
    var selectedSecInd = event.rowContext.sectionIndex;
    //update remaining sections
    for(var i=0;i< segData.length;i++){
      segData[i][0].lblFASeperator3.isVisible = false;
      if(selectedSecInd !== i){
        segData[i][0].flxViewActionHeader.isVisible = false;
        segData[i][0].lblArrow.text = "\ue922";
        segData[i][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
        segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
      }
    }

    //update selected section
    if(segData[selectedSecInd][1][0].isRowVisible === false){
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = true;
      segData[selectedSecInd][0].lblArrow.text = "\ue915";
      segData[selectedSecInd][0].lblArrow.skin = "sknfontIconDescDownArrow12px";
      segData[selectedSecInd][1] = this.showHideSegRowFlex(segData[selectedSecInd][1],true);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblFASeperator3.isVisible = true;
      }
    } else{
      segData[selectedSecInd][0].flxViewActionHeader.isVisible = false;
      segData[selectedSecInd][0].lblArrow.text = "\ue922";
      segData[selectedSecInd][0].lblArrow.skin = "sknfontIconDescRightArrow14px";
      segData[selectedSecInd][1] = this.showHideSegRowFlex(segData[selectedSecInd][1],false);
      if(selectedSecInd < (segData.length-1)){
        segData[selectedSecInd+1][0].lblFASeperator3.isVisible = false;
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
      if(rowsData[i].flxContractsFABodyView){
        rowsData[i].isRowVisible =visibility;
        rowsData[i].flxContractsFABodyView.isVisible = visibility;
      } 
    }
    return rowsData;
  },
  /*
  * create feature cards for customer at acount level
  */
  createAccountFeatureCards : function(accounts, coreCustomer, isInitial){
    this.resetPaginationValues(accounts.length);
    if(isInitial && isInitial === true){
      this.view.flxAccountFeaturesCardList.info={"accounts":accounts,"coreCustomer":coreCustomer};
    }
    this.loadMoreModel.TOTAL_PAGES = Math.ceil(accounts.length/10);
    this.loadMoreModel.PAGE_OFFSET = 0;
    if(accounts.length>10){
      this.createFeatureCardsAccLvl(0,10);
      this.loadMoreModel.PAGE_OFFSET = 10;
    }else{
      this.createFeatureCardsAccLvl(0,accounts.length);
      this.loadMoreModel.PAGE_OFFSET = accounts.length;
    }
    this.view.forceLayout();
  },
  createFeatureCardsAccLvl : function(start,end, searchResults){
    this.view.flxAccountFeaturesCardList.removeAll();
    var accounts= searchResults === undefined ? this.view.flxAccountFeaturesCardList.info.accounts : searchResults ;
    var coreCustomer=this.view.flxAccountFeaturesCardList.info.coreCustomer;
    end=accounts.length>end?end:accounts.length;
    for(var i = start;i<end;i++){

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
      //hide edit button if customer is not accessable for current logged in user
      var custBasicInfo = this.presenter.getCurrentCustomerDetails();
      featureCardToAdd.btnEdit.isVisible = custBasicInfo.isCustomerAccessiable === true ? true : false;
      this.setDataActionsForAccFeatureCard(featureCardToAdd  , accounts[i], coreCustomer);
      this.view.flxAccountFeaturesCardList.add(featureCardToAdd);
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /*
  * assign data and actions for a feature card at account level
  * @param: cust feature card path, data to set
  */
  setDataActionsForAccFeatureCard : function(featureCard,account, coreCustomer){
    var self=this;
    featureCard.info = {"accountId":account.accountNumber};
    featureCard.flxDynamicWidgetsContainer.isVisible = false;
    featureCard.flxHeadingRightContainer.isVisible = true;
    featureCard.btnView.isVisible = false;
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumber");
    featureCard.lblName.skin = "sknLbl192B45LatoRegular14px";
    featureCard.lblName.text = "Account Number:" + account.accountNumber;
    featureCard.lblCount.isVisible = false;
    featureCard.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE");
    featureCard.lblData1.text = account.accountType;

    featureCard.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME");
    featureCard.lblData2.text = account.accountName;

    featureCard.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE");
    featureCard.lblData3.text = account.ownerType;

    featureCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.CompanyFeatures");
    featureCard.flxArrow.onClick = this.toggleCardListVisibility.bind(this,featureCard,2);
    featureCard.btnEdit.onClick = function(){
      self.editFeaturesOnClick(featureCard,true,coreCustomer);
    };
    
    
    var custAccFeatures = [];
    var accId = account.accountNumber;
    custAccFeatures =account;
    let customerFeaturesData = custAccFeatures.features || custAccFeatures.featurePermissions;
    // filtering the features which is having more than 0 actions
    customerFeaturesData = customerFeaturesData.filter(function(feature){
      return feature.permissions.some(function(permission){ return permission.isEnabled === 'true';});
    });
    if(customerFeaturesData && customerFeaturesData.length === 0){
      featureCard.flxNoFilterResults.setVisibility(true);
      // view by acconts should be disabled
      featureCard.btnView.setVisibility(false);
      // here the height setting is for 1 time is there is a change in the features height value is preferred by default 
      featureCard.flxCardBottomContainer.height='75dp';
      featureCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmCompanies.noFeaturesMsg"); 
    }
    featureCard.lblCount.isVisible = true;
    featureCard.lblCount.text = customerFeaturesData.length <10 ?"(0"+customerFeaturesData.length +")" : "("+customerFeaturesData.length +")";
    this.setFeaturesCardSegmentData(featureCard.segAccountFeatures , customerFeaturesData, 2); 

    featureCard.toggleCollapseArrow(false);
    
  },
  /*
  * show popup for role related details
  */
  showRoleDetailsPopup : function(features){
    this.view.flxRoleDetailsPopup.setVisibility(true);
    this.view.flxRoleFeaturesList.removeAll();
    for (var i = 0; i < features.length; i++) {
      var num = i>10 ? ""+i : "0"+i;
      var featureCardToAdd = new com.adminConsole.customerRoles.ViewRoleFeaturesActions({
        "id": "featureActionCard" +num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width":"100%",
        "top": "15dp"
      }, {}, {});
      featureCardToAdd.isVisible = true;
      featureCardToAdd.lblActionStatus.isVisible = true;
      let feature = features[i];
      featureCardToAdd.lblFeatureName.text= feature.name;
      featureCardToAdd.statusIcon.skin = ("SID_FEATURE_ACTIVE"===feature.status) ?"sknFontIconActivate":"sknfontIconInactive";
      featureCardToAdd.statusValue.text= ("SID_FEATURE_ACTIVE"===feature.status) ? kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      this.setActionSegCard(featureCardToAdd , feature.actions);
      this.view.flxRoleFeaturesList.add(featureCardToAdd);
    }
    this.view.forceLayout();
  },
  /*
  * set actions data for every feature in role details popup
  * @param: feature card widget path
  */
  setActionSegCard : function(featureCard , actions){
    var self = this;
    var actionsList = [{"name":"View Payments","description":"Ability to view the list of all transactions made to own accounts within the same FI","status":"SID_ACTIVE"},
                      {"name":"Create/Edit One-Time Payments","description":"Handle your business payables efficiently","status":"SID_ACTIVE"}]
    var widgetMap = {
      "flxRoleDetailsActions":"flxRoleDetailsActions",
      "lblActionName":"lblActionName",
      "lblActionDescription":"lblActionDescription",
      "lblIconStatus":"lblIconStatus",
      "lbActionStatus":"lbActionStatus",
      "flxStatus":"flxStatus"
    };
    var actionSegData = actions.map(function(rec){
      return {
        "lblActionName": rec.name,
        "lblActionDescription": {"text":rec.description,
                                 "width":"42%"},
        "lblIconStatus": {"skin": rec.actionStatus==='SID_ACTION_ACTIVE' ?
                          "sknFontIconActivate":"sknfontIconInactive"},
        "lbActionStatus": {"text": rec.actionStatus==='SID_ACTION_ACTIVE' ?
                           kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive")},
        "flxStatus":{"isVisible":true},
        "template":"flxRoleDetailsActions",
      };
    });
    featureCard.SegActions.widgetDataMap = widgetMap;
    featureCard.SegActions.setData(actionSegData);
    this.view.forceLayout();
  },
 /* showFeaturesAndActionsScreen: function (featureActionsContext) { 
    this.view.flxEntitlementsWrapper.setVisibility(true);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
    this.view.flxFeaturesAndActions.setVisibility(true);
    this.view.btnFeaturesActionsRoles.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.AccountLevelFeaturesAndActions_UC");
    this.view.btnAdditionalFeaturesAction.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.OtherFeaturesAndActions_UC");
    // Determine the type of the customer
    this.customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
        (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id :
         this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
    : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
    
    
    if(this.customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      this.setFeturesAndActionsScreenData(featureActionsContext.featuresList,this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE);
    } else if(this.customerType === this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
      this.setFeturesAndActionsScreenData(featureActionsContext.featuresList,this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
    } 
    else if(this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0 &&
           this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0){
      this.setFeturesAndActionsScreenData(featureActionsContext.featuresList,this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE);
      this.view.toggleButtons.btnToggleLeft.info = {"featuresData" : featureActionsContext.featuresList,
                                                    "typeId": this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE};
      this.view.toggleButtons.btnToggleRight.info = {"featuresData" : featureActionsContext.featuresList,
                                                    "typeId": this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE};
    } else{
      this.view.flxEntitlementsWrapper.setVisibility(false);
    }
  },*/
  /*
  * assign features data based on the customer type
  * @param: featuresAndActions, customer type
  */
 /* setFeturesAndActionsScreenData : function(featureActionsContext,customerType){
    var features = [];
    this.sortBy = this.getObjectSorter("displaySequence");
    this.sortBy.inAscendingOrder = true;
    document.getElementById("frmCustomerProfileEntitlements_flxMainContent").onscroll = this.appendMoreRecordsReachingEnd;
    this.loadMoreModel.PAGE_OFFSET = 0;
    if(customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      this.view.toggleButtons.info.selectedTab = 2;
      this.view.flxFeaturesActionsEdit.setVisibility(true);
      this.view.flxOtherFeatureActionsEdit.setVisibility(true);
      if(featureActionsContext.businessFeatures)
        features = featureActionsContext.businessFeatures.sort(this.sortBy.sortData);
      this.otherFeaturesActions = features;
      this.getAllFeaturesActions(JSON.stringify(this.otherFeaturesActions));
      this.setAssignedAccountsTabs(featureActionsContext.businessAccounts);
      
    } else if(customerType === this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
      this.view.toggleButtons.info.selectedTab = 1;
      this.view.flxFeaturesActionsEdit.setVisibility(false);
      this.view.flxOtherFeatureActionsEdit.setVisibility(false);
      if(featureActionsContext.retailFeatures)
        features = featureActionsContext.retailFeatures.sort(this.sortBy.sortData);
      this.otherFeaturesActions = features;
      this.getAllFeaturesActions(JSON.stringify(this.otherFeaturesActions));
      this.setAssignedAccountsTabs(featureActionsContext.retailAccounts);
    }
    this.changeTabSelection(1);
  },*/
  updatedEntitlementCollection: function (a1, a2) {
    return a1.filter(function (x) {
      var result = false;
      if (a2.indexOf(x) < 0) result = true;
      return result;
    });
  },
  /*
  * updates UI for currently selected tab
  */
 /* changeTabSelection : function(tab){
    if(tab === 1){
      this.selectedTab = 1;
      this.tabUtilVerticleButtonFunction([this.view.btnFeaturesActionsRoles, this.view.btnAdditionalFeaturesAction],this.view.btnFeaturesActionsRoles);
      this.view.lblIconDropArrow.text = "\ue920"; //down-arrow
      this.view.lblIconDropArrow.skin = "sknIcon12pxBlack";
      this.view.lblTabsArrow1.setVisibility(false);
      this.view.lblTabsArrow2.setVisibility(false);
      var tabsData = this.view.segRolesSubTabs.data;
      this.view.lblTabsLine1.setVisibility(tabsData.length <= 0);
      this.view.flxRolesSubTabs.setVisibility(tabsData.length > 0);
      this.view.segRolesSubTabs.selectedRowIndex = null;
      this.onClickOfRolesAccountsTab();
      this.showRolesAccountsFeatures();
    } else{
      this.selectedTab = 2;
      this.tabUtilVerticleButtonFunction([this.view.btnFeaturesActionsRoles, this.view.btnAdditionalFeaturesAction],this.view.btnAdditionalFeaturesAction);
      this.view.lblIconDropArrow.text = "\ue906"; //right-arrow
      this.view.lblIconDropArrow.skin = "sknicon15pxBlack";
      this.view.lblTabsArrow1.setVisibility(false);
      this.view.lblTabsArrow2.setVisibility(true);
      this.view.lblTabsLine1.setVisibility(true);
      this.view.flxRolesSubTabs.setVisibility(false);
      this.showAdditionalOtherFeaturesScreen();
    }
    this.view.forceLayout();
  },*/
  /*
  * set roles assigned or acounts available to tabs segment
  */
  /*setAssignedRolesTabs : function(data){
    var self =this;
    var widgetMap = {
      "id":"id",
      "desc":"desc",
      "flxVerticalTabsRolesAccounts":"flxVerticalTabsRolesAccounts",
      "btnOption":"btnOption",
      "lblOptionName":"lblOptionName",
      "lblIconSelected":"lblIconSelected",
      "flxImgArrow":"flxImgArrow",
      "lblTabsSeperator":"lblTabsSeperator"
    };
    var segData = data.map(function(rec){
      self.sortBy = self.getObjectSorter("displaySequence");
      self.sortBy.inAscendingOrder = true;
      var features = [];
      if(rec.features && rec.features.length>0)
        features = rec.features.sort(self.sortBy.sortData);
      return {
        "id":rec.id,
        "desc":rec.description,
        "btnOption":{"text":rec.name,"skin":"sknBtnUtilRest73767812pxReg","hoverSkin":"sknBtnUtilHover30353612pxReg"},
        "lblOptionName":{"isVisible":false,"text":rec.name},
        "lblIconSelected":{"text":""},
        "flxImgArrow":{"isVisible":false},
        "lblTabsSeperator":{"isVisible":true,"text":"-"},
        "info" : features,
        "template":"flxVerticalTabsRolesAccounts",
      };
    });
    this.view.lblRoleNameHeading.text=segData[0].btnOption.text;
    this.view.lblRoleDescription.text=segData[0].desc;
    this.view.segRolesSubTabs.widgetDataMap = widgetMap;
    this.view.segRolesSubTabs.setData(segData);
    this.view.forceLayout();
  },*/
   /*
   * set acounts available to tabs segment
   */
 /* setAssignedAccountsTabs : function(data){
    var self =this;
    var widgetMap = {
      "id":"id",
      "flxVerticalTabsRolesAccounts":"flxVerticalTabsRolesAccounts",
      "btnOption":"btnOption",
      "lblOptionName":"lblOptionName",
      "lblIconSelected":"lblIconSelected",
      "flxImgArrow":"flxImgArrow",
      "lblTabsSeperator":"lblTabsSeperator",
      "features":"features"
    };
    if(data && data.length > 0){
      var segData = data.map(function(rec){
        self.sortBy = self.getObjectSorter("displaySequence");
        self.sortBy.inAscendingOrder = true;
        var features = [];
        if(rec.features && rec.features.length>0)
          features = rec.features.sort(self.sortBy.sortData);
        return {
          "flxVerticalTabsRolesAccounts": {"skin":"slFbox"},
          "id":rec.id,
          "btnOption":{"text":rec.id,
                       "skin":"sknBtnUtilRest73767812pxReg",
                       "hoverSkin":"sknBtnUtilHover30353612pxReg"},
          "lblOptionName":{"isVisible":rec.name ? true : false,
                           "text":rec.name},
          "lblIconSelected":{"text":""},
          "flxImgArrow":{"isVisible":false},
          "lblTabsSeperator":{"text":"."},
          "info":features,
          "template":"flxVerticalTabsRolesAccounts",
        };
      });
      this.view.segRolesSubTabs.widgetDataMap = widgetMap;
      this.view.segRolesSubTabs.setData(segData);
    } else{
      this.view.segRolesSubTabs.widgetDataMap = widgetMap;
      this.view.segRolesSubTabs.setData([]);
    }
    this.view.forceLayout();
  },
  /*
   * change UI for tab selection on segment row click
   */
 /* onClickOfRolesAccountsTab : function(){
    var segData = this.view.segRolesSubTabs.data;
    if(segData.length>0){
      var selectedInd = this.view.segRolesSubTabs.selectedRowIndex;
      var selInd = selectedInd ? selectedInd[1] : 0;
      this.view.lblRoleNameHeading.text=segData[selInd].btnOption.text;
      this.view.lblRoleDescription.text=segData[selInd].desc;
      for(var i=0; i<segData.length; i++){
        if(i === selInd && (segData[i].flxImgArrow.isVisible === false)){
          segData[i].flxImgArrow.isVisible = true;
          segData[i].btnOption.skin= "sknBtnUtilActive485b7512pxBold";
          segData[i].btnOption.hoverSkin= "sknBtnUtilActive485b7512pxBold";
          this.view.segRolesSubTabs.setDataAt(segData[i],i);
        } else if(i !== selInd && (segData[i].flxImgArrow.isVisible === true)){
          segData[i].flxImgArrow.isVisible = false;
          segData[i].btnOption.skin= "sknBtnUtilRest73767812pxReg";
          segData[i].btnOption.hoverSkin= "sknBtnUtilHover30353612pxReg";
          this.view.segRolesSubTabs.setDataAt(segData[i],i);
        }
      }
      this.loadMoreModel.PAGE_OFFSET = 0;
      this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
      this.showFeaturesList();
    } else {
      this.view.flxRoleFeaturesListCont.removeAll();
      this.view.flxNoAvailableRoleAccFeatures.setVisibility(true);
      this.view.flxRoleFeaturesListCont.setVisibility(false);
      this.view.flxFeaturesActionsEdit.setVisibility(false);
    }
    this.view.forceLayout();
  },*/
  /*
   * show features and actions of account
   */
  /*showRolesAccountsFeatures : function(){
    this.customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
        (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id :
         this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
    : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
    this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
    this.view.flxNoFeaturesActionsCont.setVisibility(false);
    this.view.flxRoleFeatureAndActions.setVisibility(true);
    this.view.forceLayout();
  },*/
  /*
   * show other features and action screen
   */
  /*showAdditionalOtherFeaturesScreen : function(){
    this.view.flxRoleFeatureAndActions.setVisibility(false);
    this.loadMoreModel.PAGE_OFFSET = 0;
    this.view.btnAddFeaturesActions.setVisibility(false);
    this.view.lblNoFeaturesActionsHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.NoFeaturesAvailableForIndependentAccounts");
    if(this.otherFeaturesActions.length > 0){
      this.showAdditionalFeaturesList();
    } else{
      this.view.flxNoFeaturesActionsCont.setVisibility(true);
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
    }
    this.view.forceLayout();
  },*/
     /*
  * create json with all the moetary actions of all features
  */
  /*getAllFeaturesActions : function(allFeatures){
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
  },*/
  /*
   * display features list screen
   */
  /*showFeaturesList : function(){
    var selIndex= this.view.segRolesSubTabs.selectedRowIndex? this.view.segRolesSubTabs.selectedRowIndex[1]:0;
    var featuresList= this.view.segRolesSubTabs.data[selIndex].info;
    if(featuresList.length>0){
      this.view.flxRoleFeaturesListCont.removeAll();
      this.view.flxNoAvailableRoleAccFeatures.setVisibility(false);
      this.view.flxRoleFeaturesListCont.setVisibility(true);
      var filteredFeatures = this.getAssignedFeaturesFromAllFeatures(featuresList);
      this.createFeaturesRowForData(filteredFeatures.slice(0,this.recordsSize));
      this.loadMoreModel.PAGE_OFFSET = this.recordsSize;
      if(this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0 &&
        this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) &&
        this.view.toggleButtons.info.selectedTab === 2){
        this.view.flxFeaturesActionsEdit.setVisibility(true);
      } else if(this.customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        this.view.flxFeaturesActionsEdit.setVisibility(true);
      } else{
        this.view.flxFeaturesActionsEdit.setVisibility(false);
      }
    } else{
      this.view.flxRoleFeaturesListCont.removeAll();
      this.view.flxRoleFeaturesListCont.setVisibility(false);
      this.view.flxNoAvailableRoleAccFeatures.setVisibility(true); 
      this.view.flxFeaturesActionsEdit.setVisibility(false);
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    this.view.forceLayout();
  },*/
  /*
  * create the rows dynamically for the given features
  * @param: features list
  */
 /* createFeaturesRowForData : function(features){
    var c = this.loadMoreModel.PAGE_OFFSET;
    var flag = false;
    for (var i = 0; i < features.length; i++) {
      if(features[i].isAssigned && (features[i].isAssigned === "1")){
        flag = true;
        var collapsibleSegmentToAdd = new com.adminConsole.customerRoles.collapsibleSegment({
          "id": "featureRow" + c,
          "isVisible": true,
          "width": "100%",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": "20px"
        }, {}, {});
        this.view.flxRoleFeaturesListCont.add(collapsibleSegmentToAdd);
        this.setFeaturesDataForRow(features[i],collapsibleSegmentToAdd);
        this.setActionsDataForFeature(features[i].actions,collapsibleSegmentToAdd);
      }
      c=c+1;
      if(i === (features.length-1))
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    if(flag === false && (this.loadMoreModel.PAGE_OFFSET === 0)){
      this.view.flxRoleFeaturesListCont.setVisibility(false);
      this.view.flxNoAvailableRoleAccFeatures.setVisibility(true);
    }else if (flag === true && (this.loadMoreModel.PAGE_OFFSET === 0)){
      this.view.flxRoleFeaturesListCont.setVisibility(true);
      this.view.flxNoAvailableRoleAccFeatures.setVisibility(false);
    }
  },*/
  /*
   * set feature name,description,status to dynamically created row
   * @param: feature details, component path
   */
  /*setFeaturesDataForRow : function(featureDetails,collapsibleSegmentToAdd){
    var actionsCount=0;
    collapsibleSegmentToAdd.lblFeatureName.text = featureDetails.name;
    collapsibleSegmentToAdd.lblCountActions.text = featureDetails.actions.length;
    collapsibleSegmentToAdd.lblTotalActions.text = " of "+featureDetails.totalActions;
    collapsibleSegmentToAdd.statusValue.text = featureDetails.status=== this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    collapsibleSegmentToAdd.statusIcon.skin = featureDetails.status=== this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate":"sknfontIconInactive";
    collapsibleSegmentToAdd.lblView.setVisibility(true);
  },*/
  /*
   * set actions for a feature
   * @param: list of actions, component
   */
  /*setActionsDataForFeature : function(actions,componentPath){
    var self =this;
    var widgetMap = {
      "flxFeatureActions":"flxFeatureActions",
      "lblActionName":"lblActionName",
      "lblDescription":"lblDescription",
      "lblView":"lblView",
      "lblSeperator":"lblSeperator"
    };
    var actionsData = actions.map(function(rec){
      return {
        "displaySequence" : rec.displaySequence,
        "template":"flxFeatureActions",
        "lblActionName":rec.name,
        "lblDescription":rec.description,
        "lblView":{
          "text": rec.type === "MONETARY" ? kony.i18n.getLocalizedString("i18n.frmAdManagement.View") : kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "skin": rec.type === "MONETARY" ? "sknLblLatoReg117eb013px" : "sknLbl485C75LatoRegular13Px",
          "hoverSkin": rec.type === "MONETARY" ? "sknLbl117eb013pxHov" : "sknLbl485C75LatoRegular13Px",
          "onClick" :  rec.type === "MONETARY" ? function(){
            self.setLimitsToPopup(rec.limits);
          }:undefined
        },
        "lblSeperator":"-"
      };
    });
    this.sortBy = this.getObjectSorter("displaySequence");
    this.sortBy.inAscendingOrder = true;
    componentPath.SegActions.widgetDataMap = widgetMap;
    componentPath.SegActions.setData(actionsData.sort(this.sortBy.sortData));
    this.view.forceLayout();
  },*/
  /*
   * set limit values in the popup
   * @param: limits json
   */
  /*setLimitsToPopup : function(limits){
    this.view.lblMaxValue12.text = limits.MAX_TRANSACTION_LIMIT=== undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+limits.MAX_TRANSACTION_LIMIT);
    this.view.lblMaxDailyLimitValue21.text = limits.DAILY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+limits.DAILY_LIMIT);
    this.view.lblWeeklyLimitValue22.text = limits.WEEKLY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+limits.WEEKLY_LIMIT);
    this.view.flxViewLimitsPopup.setVisibility(true);
    this.view.forceLayout();
    
  },*/
    /*
   * display list of features by dynamically adding component
   */
  /*showAdditionalFeaturesList : function(){
    var flag=false;
    var selIndex= this.view.segRolesSubTabs.selectedRowIndex? this.view.segRolesSubTabs.selectedRowIndex[1]:0;
    var featuresList= this.otherFeaturesActions;
    if(featuresList.length>0){
      this.view.flxOtherAddtionalFeaturesActions.removeAll();
      this.view.flxOtherAddtionalFeaturesActions.setVisibility(true);
      var filteredFeatures = this.getAssignedFeaturesFromAllFeatures(featuresList);
      this.createAdditionalFeaturesRow(filteredFeatures.slice(0,this.recordsSize));
      this.loadMoreModel.PAGE_OFFSET = this.recordsSize;
    }
    this.view.forceLayout();
  },*/
  /*
  * create rows dynamically for given additional features
  * @param: additional features list
  */
 /* createAdditionalFeaturesRow : function(addFeatures){
    var flag = false;
    var c = this.loadMoreModel.PAGE_OFFSET;
    for (var i = 0; i < addFeatures.length; i++) {
      if(addFeatures[i].isAssigned && (addFeatures[i].isAssigned === "1")){
        flag=true;
        var collapsibleSegmentToAdd = new com.adminConsole.customerRoles.collapsibleSegment({
          "id": "additionalFeatureRow" + c,
          "isVisible": true,
          "width": "100%",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": "20px"
        }, {}, {});
        this.view.flxOtherAddtionalFeaturesActions.add(collapsibleSegmentToAdd);
        this.setAdditionalFeaturesDataForRow(addFeatures[i],collapsibleSegmentToAdd);
        this.setAdditionalActionsDataForFeature(addFeatures[i].actions,collapsibleSegmentToAdd);
      }
      c=c+1;
    }
    if(i === addFeatures.length)
        kony.adminConsole.utils.hideProgressBar(this.view);
    if(flag === false && (this.loadMoreModel.PAGE_OFFSET === 0)){
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
      this.view.flxNoFeaturesActionsCont.setVisibility(true);
    }else if (flag === true && (this.loadMoreModel.PAGE_OFFSET === 0)){
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(true);
      this.view.flxNoFeaturesActionsCont.setVisibility(false);
    }
    
  },*/
  /*
   * set feature name,description,status to dynamically created row
   * @param: feature details, component path
   */
 /* setAdditionalFeaturesDataForRow : function(featureDetails,collapsibleSegmentToAdd){
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
  },*/
  /*
   * set actions for a feature
   * @param: list of actions, component
   */
/*  setAdditionalActionsDataForFeature : function(actions,componentPath){
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
    this.view.forceLayout();
  },
  filterRetailFeatures : function(allFeatures){
    for(var i=0;i<allFeatures.length;i++){
      if(allFeatures[i].groupid===this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE){
        this.allRetailFeatures=allFeatures[i].features;
      	break;
      }
    }
  },*/
  /*
  * returns features that are assigned
  * @param :all features 
  */
  /*getAssignedFeaturesFromAllFeatures : function(allFeatures){
    var assignedFeatures = [];
    assignedFeatures = allFeatures.filter(function (rec) {
      if (rec.isAssigned && rec.isAssigned === "1") {
        return rec;
      }
    });
    return assignedFeatures;
  },*/
    onSegmentPaginationChange : function(currentValue){
    var self =this;
          var searchText = this.view.searchBoxFeatures.tbxSearchBox.text;
    var isSearch = searchText.length > 0 ? true : false;
      var offsetVal=currentValue *10;
      var featuresToAppend,featuresTimeout;
      if(this.view.flxAccFeaturesListContainer.isVisible){
        featuresToAppend= isSearch === false? this.view.flxAccountFeaturesCardList.info.accounts: this.searchFilterRecord;
      }else{
        featuresToAppend= isSearch === false ? 
          (this.view.flxFeaturesByCustomerCont.info?this.view.flxFeaturesByCustomerCont.info.permissions:[]): this.searchFilterRecord;
      }
      if(self.selectedTab === 1){
        if(offsetVal-10 < featuresToAppend.length){
          this.updatePaginationValues(currentValue);
          kony.adminConsole.utils.showProgressBar(this.view);
          if(this.view.flxAccFeaturesListContainer.isVisible)
            featuresTimeout = setTimeout(self.createFeatureCardsAccLvl.bind(self,offsetVal-10,offsetVal,featuresToAppend));
          else
          featuresTimeout = setTimeout(self.createFeatureCards.bind(self,offsetVal-10,offsetVal, featuresToAppend));
        } 
      }else if(self.selectedTab === 2 && (self.view.flxCustFeaturesListContainer.isVisible === true)){
       featuresToAppend= isSearch === false ? 
          (this.view.flxFeaturesByCustomerCont.info?this.view.flxFeaturesByCustomerCont.info.permissions:[]): this.searchFilterRecord;
        //var filteredFeaturesToAppend = this.getAssignedFeaturesFromAllFeatures(featuresToAppend);
        if(offsetVal-10 < featuresToAppend.length){
          this.updatePaginationValues(currentValue);
          kony.adminConsole.utils.showProgressBar(this.view);
          featuresTimeout = setTimeout(self.createFeatureCards.bind(self,offsetVal-10,offsetVal, featuresToAppend));
          self.loadMoreModel.PAGE_OFFSET = offsetVal; 
        } 
      }
  },
  /*
  * fetch features on click of expand arrow
  */
  fetchFeaturesOnExpand : function(featuresCustCard,contractCustomer, option){
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId =  this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    var inputReq = {"userId" :userId,"coreCustomerId": contractCustomer.coreCustomerId || contractCustomer.id,"contractId":contractCustomer.contractId,"legalEntityId": legalEntityId || ""};
    var cardContext = {"cardWidgetRef":featuresCustCard, "isCustLevel": this.selectedTab === 2 ? true : false};
    Object.assign(cardContext, inputReq);
    var visibility = featuresCustCard.flxCardBottomContainer.isVisible === true ? false : true;
    if(visibility === true){
       //if data already cached
     if(this.selectedTab === 1 && this.cachedFeaturesForAccData[inputReq.contractId+"#"+inputReq.coreCustomerId]){
        this.setFeaturesDataOnExpand(this.cachedFeaturesForAccData[inputReq.contractId+"#"+inputReq.coreCustomerId]);
      }else if(this.selectedTab === 2 && this.cachedOtherFeaturesData[inputReq.contractId+"#"+inputReq.coreCustomerId]){
        this.setFeaturesDataOnExpand(this.cachedOtherFeaturesData[inputReq.contractId+"#"+inputReq.coreCustomerId]);
      } else{ //if data not cached fetch from service
        kony.adminConsole.utils.showProgressBar(this.view);
        this.presenter.getInfinityUserFeatureActions(inputReq,"InfoScreen",cardContext);
      }
    }else{
      featuresCustCard.lblCount.isVisible= false;
      featuresCustCard.toggleCollapseArrow(visibility);
    }
  },
   /*
  * fetch features on click of expand arrow
  */
  viewByAccountsClick : function(featuresCustCard,contractCustomer, option){
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId =  this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    var inputReq = {"userId" :userId,"coreCustomerId": contractCustomer.coreCustomerId || contractCustomer.id,"contractId":contractCustomer.contractId,"legalEntityId": legalEntityId || ""};
    var cardContext = {"cardWidgetRef":featuresCustCard, "isViewByAcc": true};
    Object.assign(cardContext, inputReq);
    var visibility = featuresCustCard.flxCardBottomContainer.isVisible === true ? false : true;
    
    if(this.cachedFeaturesForAccData[inputReq.contractId+"#"+inputReq.coreCustomerId]){ //if data already cached
      this.setViewByAccountsData(this.cachedFeaturesForAccData[inputReq.contractId+"#"+inputReq.coreCustomerId]);
    } 
    else{ //if data not cached fetch from service
      kony.adminConsole.utils.showProgressBar(this.view);
      this.presenter.getInfinityUserFeatureActions(inputReq,"InfoScreen",cardContext);
    }
  },
   /*
  * set features on click of expand arrow
  */
  setFeaturesDataOnExpand : function(custFeaturesList){
    var self =this;
    var featureCard = custFeaturesList.cardContext.cardWidgetRef;
    var isCustLevel = custFeaturesList.cardContext.isCustLevel;
    let globalLevelPermissions = this.groupBycontracts(custFeaturesList.FeaturesAndActions.globalLevelPermissions);
    let accountLevelPermissions =  this.groupBycontracts(custFeaturesList.FeaturesAndActions.accountLevelPermissions);
    var custAccFeatures = this.AccountLevelFeaturesTab === true ? accountLevelPermissions[0][0]: globalLevelPermissions[0][0];
    if(isCustLevel === false){
      this.cachedFeaturesForAccData[custFeaturesList.cardContext.contractId +"#"+ custFeaturesList.cardContext.coreCustomerId]= custFeaturesList;
    }else if(isCustLevel === true){
      this.cachedOtherFeaturesData[custFeaturesList.cardContext.contractId +"#"+ custFeaturesList.cardContext.coreCustomerId] = custFeaturesList;
    }
    if(this.AccountLevelFeaturesTab && isCustLevel === false){
      let permissionDict = {};
      let fpDict = {};
      this.actionsEnableJson = {};
      custAccFeatures.accounts.forEach(function(account){
        account.featurePermissions.forEach(function(featurePermission){
          // we use permissionDict is a dictionary to store  value as the permissions of featrue and key as the feature.id
          if(permissionDict[featurePermission.featureId]){
            featurePermission.permissions.forEach(function(permission){
              var concatedName = featurePermission.featureId+self.currencyValue+(permission.id || permission.actionId);
              //store isenable value of all actions for each account for custom label- key(featureIdactionId):value(arr of ture/false)
              (self.actionsEnableJson[concatedName] = self.actionsEnableJson[concatedName] || []).push(permission.isEnabled);
              // we only override if isEnabled is true so only selected actions will get update
              if(permission.isEnabled === "true"){
                // if the feature is selected in other account we search the index and
                // replace it with the feature permission which will avoid overlapping scenarios
                let index = permissionDict[featurePermission.featureId].findIndex(x => x.id === permission.id);
                permissionDict[featurePermission.featureId][index] = permission;
              }                      
            });
          }
          else{
            for(var i=0;i<featurePermission.permissions.length;i++){
              //store isenable value of all actions for each account for custom label - key(featureIdactionId):value(arr of ture/false)
              var concatedName = featurePermission.featureId+self.currencyValue+(featurePermission.permissions[i].id || featurePermission.permissions[i].actionId);
              (self.actionsEnableJson[concatedName] = self.actionsEnableJson[concatedName] || []).push(featurePermission.permissions[i].isEnabled);
            }
            // by default all the permissions will enter into the dictionary for first time which will handle total count of actions
            permissionDict[featurePermission.featureId] = featurePermission.permissions;  
            fpDict[featurePermission.featureId] = featurePermission;
          }
        });
      });
      let acctLvlfeatures = [];
      for (var key in fpDict) {
        if (fpDict.hasOwnProperty(key)) { 
          let commonFeaturePer = fpDict[key];
          commonFeaturePer.permissions = Array.from(permissionDict[key]);
          acctLvlfeatures =  acctLvlfeatures.concat(commonFeaturePer);
        }
      }
      custAccFeatures.features = acctLvlfeatures;     
      featureCard.btnView.isVisible = true;
    }else{
      // for other features and actions tab
      featureCard.btnView.isVisible = false;
    } 
    let customerFeaturesData = custAccFeatures.features || custAccFeatures.featurePermissions; 
    // filtering the features which is having more than 0 actions
    customerFeaturesData = customerFeaturesData.filter(function(feature){
      return feature.permissions.some(function(permission){ return permission.isEnabled === 'true';});
    });
    if(customerFeaturesData && customerFeaturesData.length === 0){
      featureCard.flxNoFilterResults.setVisibility(true);
      // here the height setting is for 1 time is there is a change in the features height value is preferred by default 
      featureCard.flxCardBottomContainer.height='75dp';
      featureCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmCompanies.noFeaturesMsg"); 
    }
    featureCard.flxCardBottomContainer.isVisible = true;
    featureCard.lblCount.isVisible = true;
    featureCard.lblCount.text = customerFeaturesData.length <10 ?"(0"+customerFeaturesData.length +")" : "("+customerFeaturesData.length +")";
    this.setFeaturesCardSegmentData(featureCard.segAccountFeatures , customerFeaturesData, 1); 
    featureCard.toggleCollapseArrow(true);
  },
  /*
  *
  */
  setViewByAccountsData : function(context){
    var self = this;
    var featureCard = context.cardContext.cardWidgetRef;
    var isCustLevel = context.cardContext.isCustLevel;
    var featuresActions = context.FeaturesAndActions.accountLevelPermissions;
    var selectCustAcc = featuresActions[0].accounts;
    var custAccFeatures = featuresActions[0];
    var accId = featureCard.info ? featureCard.info.accountId : "";
    this.resetPaginationValues(custAccFeatures.length);
    this.showFeaturesAtAccountLevel(selectCustAcc, featuresActions[0]);
  },
  onClickOfSearchIcon : function(){
    var scopeObj =this;
    // reset the flags
    scopeObj.searchResult = {
      isFeatureMatched : false,
      isLimitMatched : false,
      isActionMatched : false
    };
    let searchTxt = scopeObj.view.searchBoxFeatures.tbxSearchBox.text;
    searchTxt = searchTxt.toLowerCase();
    scopeObj.isSearchPerformedViewCont = true;
    scopeObj.resetPaginationValues();
    // AccountLevelFeaturesTab tab
    if(scopeObj.AccountLevelFeaturesTab){
      if(scopeObj.view.searchBoxFeatures.tbxSearchBox.placeholder === kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits")){
        scopeObj.searchFilterRecord = scopeObj.filterSearchResults(scopeObj.featuresList.accountLevelPermissions ,searchTxt );
        scopeObj.createContractTemplate(scopeObj.searchFilterRecord);
      }else{//  viewing by accounts
        scopeObj.searchFilterRecord = scopeObj.selectedAccountByView.filter(function(account){
          if(account.accountNumber.toLowerCase().indexOf(searchTxt) !== -1){
            return true;
          }
        })
        scopeObj.createAccountFeatureCards(scopeObj.searchFilterRecord);
      }
    } else{ // other features tab
      scopeObj.searchFilterRecord = scopeObj.filterSearchResults(scopeObj.featuresList.globalLevelPermissions ,searchTxt );
      scopeObj.createContractTemplate(scopeObj.searchFilterRecord);
    }
    scopeObj.view.forceLayout();
  },
  /*
  * to store enabled features at cust level in order to show custom label at account level
  */
  storeCustomActionsData: function(coreCustomer){
    var self =this;
    let permissionDict = {};
    let fpDict = {};
    this.actionsEnableJson = {};
    coreCustomer.accounts.forEach(function(account){
      account.featurePermissions.forEach(function(featurePermission){
        // we use permissionDict is a dictionary to store  value as the permissions of featrue and key as the feature.id
        if(permissionDict[featurePermission.featureId]){
          featurePermission.permissions.forEach(function(permission){
            var concatedName = featurePermission.featureId+self.currencyValue+(permission.id || permission.actionId);
            //store isenable value of all actions for each account for custom label- key(featureIdactionId):value(arr of ture/false)
            (self.actionsEnableJson[concatedName] = self.actionsEnableJson[concatedName] || []).push(permission.isEnabled);                      
          });
        }
        else{
          for(var i=0;i<featurePermission.permissions.length;i++){
            //store isenable value of all actions for each account for custom label - key(featureIdactionId):value(arr of ture/false)
            var concatedName = featurePermission.featureId+self.currencyValue+(featurePermission.permissions[i].id || featurePermission.permissions[i].actionId);
            (self.actionsEnableJson[concatedName] = self.actionsEnableJson[concatedName] || []).push(featurePermission.permissions[i].isEnabled);
          }
        }
      });
    });
  },
  formatContractResForFeatures : function(contractsData){
    var contractCust =[];
    for(var i=0; i<contractsData.length; i++){
      var contractObj = JSON.parse(JSON.stringify(contractsData[i]));
      delete contractObj.contractCustomers;
      var customers = contractsData[i].contractCustomers;
      for(let j=0; j<customers.length;j++){
        var customerObj = customers[j];
        Object.assign(customerObj,contractObj);
        contractCust.push(customerObj);
      }
    }
    return contractCust;
  },
  /*
  * set popup details data on click of customer nme in cards
  */
  setCustomerDetailsPopupData : function(custDetails){
    var address = "";
    if(custDetails.cityName||custDetails.country)
      address=this.AdminConsoleCommonUtils.getAddressText(custDetails.cityName,custDetails.country);
    let details = {"id": custDetails.id,
                   "name":custDetails.name,
                   "industry":custDetails.industry,
                   "email":custDetails.email,
                   "phone":custDetails.phone,
                   "address": address};
    this.view.contractDetailsPopup.setDataForPopup(details);

    this.view.contractDetailsPopup.showBackButton(false);
    this.view.flxContractDetailsPopup.setVisibility(true);
    this.view.forceLayout();
  },
  accLvlTabOnClick : function(){
    var scopeObj =this;
    var widArr = [scopeObj.view.tabsFeatures.btnTab1,scopeObj.view.tabsFeatures.btnTab2];
      scopeObj.selectedTab = 1;
      scopeObj.view.flxCustFeaturesListContainer.setVisibility(true);
      scopeObj.view.flxAccFeaturesListContainer.setVisibility(false);
      scopeObj.view.flxBackToFeaturesByCust.setVisibility(false);
      scopeObj.view.searchBoxFeatures.tbxSearchBox.text = "";
      scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
      //  we set the account level permission
      scopeObj.AccountLevelFeaturesTab = true;
      scopeObj.createContractTemplate(scopeObj.featuresList.accountLevelPermissions);
      scopeObj.subTabsButtonWithBgUtilFunction(widArr,scopeObj.view.tabsFeatures.btnTab1);
  },
    /*
  * navigate to enroll form to edit the customers
  * @param: accountsFeaturesCard path, is accountLevel(true/false), core customer details
  */
  editFeaturesOnClick : function(accountsFeaturesCard,isAccountLevel, coreCustDetails){
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    var input = {
      "id": userId,
      "coreCustomerId": coreCustDetails.coreCustomerId || coreCustDetails.id,
      "contractId": coreCustDetails.contractId,
      "legalEntityId":legalEntityId
    };
    var customerData = "";
    customerData = {"custId": coreCustDetails.coreCustomerId || coreCustDetails.id,
                    "taxId": coreCustDetails.taxId || kony.i18n.getLocalizedString("i18n.common.NA"),
                    "address": this.AdminConsoleCommonUtils.getAddressText(coreCustDetails.cityName,coreCustDetails.country)};

    var navigationParam = {"formName":"frmCustomerProfileEntitlements",
                           "isEnrollEditUser" : true,
                           "tabName":"FEATURES",
                           "data": customerData,
                           "isAccountLevel":isAccountLevel};
    this.presenter.getInfinityUserAllDetails(input,navigationParam);
  },
  
   
  /*
  * show or hide the toggle buttons based on customer type
  * @param: customer info
  */
 /* showToggleButtons : function(customerInfo){
    var custType = customerInfo.CustomerType_id;
    if(custType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0 &&
             custType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0){
      this.toggleButtonsUtilFunction([this.view.toggleButtons.btnToggleLeft,this.view.toggleButtons.btnToggleRight],1);
      this.view.flxToggleButtonsContainer.setVisibility(true);
      this.view.toggleButtons.info = {"selectedTab":1};
    } else {
      this.view.flxToggleButtonsContainer.setVisibility(false);
    }
    this.view.forceLayout();
  },*/
});
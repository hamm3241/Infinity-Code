define({  
  selectedFeatureIndex : 0,
  prevSelectedFeature:[],
  groupActionConfig :{
    CREATE:"CREATE",
    EDIT:"EDIT",
    COPY: "COPY"
  },
  limitsList:{},
  selectedContractAccounts:[],
  removeCount : 0,
  recordsSize:5,
  prevIndex : -1,
  allMonActionsList:null,
  customerType :"",
  loadMoreModel:{
    PAGE_OFFSET: 0,
    TOTAL_PAGES:0    
  },
  prevContractSelected:{
    segRowNo : -1
  },
  AccountLevelFeaturesTab : false,
  selectedTab : 1,
  totalPages:0,
  searchFilterRecords: [],
  cachedLimitsData:{},
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
        this.cachedLimitsData ={};
        var formattedResponse = this.formatContractResForFeatures(context.featuresList.FeaturesAndActions);
        this.limitsList.globalLevelLimits = this.groupBycontracts(formattedResponse);
        this.limitsList.accountLevelLimits =  this.groupBycontracts(formattedResponse);
        this.showCustomerLimitsScreen();

        // intially we set the account level permission
        this.AccountLevelFeaturesTab = false;
        if(context.featuresList.FeaturesAndActions.length===0){
          this.showNoLimitsScreen();
        }else{
          this.view.flxFeaturesSearchContainer.setVisibility(true);
          this.view.rtxMsgNoLimits.setVisibility(false);
          this.view.flxFeaturesByCustomerCont.setVisibility(true);
          this.createContractTemplate(this.limitsList.globalLevelLimits);
        }
        // createAccountFeatureCards
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
      } else if(context.custLimitsList){
        if(context.custLimitsList.cardContext.isCustLevel === false){ //for acc level
           this.setViewByAccountsData(context.custLimitsList);
        }else{
          this.setCustLimitsOnExpand(context.custLimitsList);
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
    this.view.showPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  
  
  groupBycontracts: function(levelPermissions ){
    
    var groupBy = function(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    return groupBy(levelPermissions, 'contractId');
  },
  CustomerProfileFeaturesPreshow: function () {
    var self = this;
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName10);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 135 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.view.searchBoxFeatures.tbxSearchBox.text ="";
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
    var legalEntityId = self.getLEDesc(self.presenter.custSearchLEId || "");
    this.currencyValue=this.defaultCurrencyCode(legalEntityId[0].baseCurrency,true);
     this.view.DataFields.flxPopUpClose.onClick = function() {
          self.view.showPopUp.setVisibility(false);
    };
  },
  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileLimits_flxMainContent").onscroll = function () { };
  },
  filterSearchResults : function (permissions , searchTxt) {
    /*
    format of the grouped data
    {
      'contractId' : { 'contractValue' , 'customerCoreValue'}
    }
    */
    var searchResults=[];
    var accountsList=[];
    var filteredPermissions=[]; 
    if(this.AccountLevelFeaturesTab){
      //account Id , feature name
      accountsList= permissions.filter(function(account) {
        if(account.accountNumber.toLowerCase().indexOf(searchTxt) !== -1)
          return account;
        /*else if(account.featurePermissions&&account.featurePermissions.length!==0){
          var features=account.featurePermissions;
          var filteredFeatures=features.filter(function(rec){
            if(rec.featureName.toLowerCase().indexOf(searchTxt) !== -1)
              return rec;
          });
          if(filteredFeatures.length>0){
            account.featurePermissions=filteredFeatures;
            return account;
          }
        }*/

      });
      if(accountsList.length>0)
        searchResults=accountsList;
    }else{
      for(var i in permissions){//contract list
        //customer name and customer id
        for(var j=0;j<permissions[i].length;j++){//customers list under a contract
          filteredPermissions=[];
          var permission=permissions[i][j];
          let custId = permission.coreCustomerId || permission.id;
          let custName = permission.coreCustomerName || permission.name;
          if(custName.toLowerCase().indexOf(searchTxt) !==-1 || 
             custId.toLowerCase().indexOf(searchTxt) !==-1){
            filteredPermissions.push(permission);
          }
        }
        if(filteredPermissions.length>0)
          searchResults[i]=filteredPermissions;
      }
    }
    return searchResults;
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
 
  setFlowActions: function () {
    var scopeObj = this;
    this.view.searchBoxFeatures.flxIconBackground.onClick = function(){
      if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text.length > 3 ){
        let searchTxt = scopeObj.view.searchBoxFeatures.tbxSearchBox.text;
        searchTxt = searchTxt.toLowerCase();
        scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(true);
        if(scopeObj.AccountLevelFeaturesTab){
          // AccountLevelFeaturesTab tab
         scopeObj.searchFilterRecords = scopeObj.filterSearchResults(JSON.parse(JSON.stringify(scopeObj.selectedContractAccounts)),searchTxt );
          scopeObj.createAccountFeatureCards(scopeObj.searchFilterRecords);         
        }else{
          // other features tab
          scopeObj.searchFilterRecords = scopeObj.filterSearchResults(scopeObj.limitsList.globalLevelLimits ,searchTxt );
          scopeObj.createContractTemplate(scopeObj.searchFilterRecords);
        }
        scopeObj.view.forceLayout();
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
      if(currentValue <= scopeObj.loadMoreModel.TOTAL_PAGES){
        scopeObj.onSegmentPaginationChange(currentValue);
      }
    };
    this.view.cardPagination.flxGo.onClick = function(){
      var currentValue= scopeObj.view.cardPagination.tbxPageNumber.text;    
      if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.loadMoreModel.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.loadMoreModel.TOTAL_PAGES){                                                                                           
        scopeObj.onSegmentPaginationChange(currentValue);
      }
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
    this.view.searchBoxFeatures.flxClearSearch.onClick = function(){
        scopeObj.view.searchBoxFeatures.tbxSearchBox.text = "";
        scopeObj.searchFilterRecords = [];
        scopeObj.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
       
        if(scopeObj.AccountLevelFeaturesTab){
          // AccountLevelFeaturesTab tab
          scopeObj.createAccountFeatureCards(scopeObj.selectedContractAccounts);
        }else{
          // other features tab
          scopeObj.createContractTemplate(scopeObj.limitsList.globalLevelLimits);
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
      scopeObj.showCustomerLimitsScreen(true);
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
    this.view.flxRoleDetailsClose.onClick = function(){
      scopeObj.view.flxRoleDetailsPopup.setVisibility(false);
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
  showCustomerLimitsScreen : function(isBackAction){
    this.searchFilterRecords = [];
    this.view.flxCustFeaturesListContainer.setVisibility(true);
    this.view.flxAccFeaturesListContainer.setVisibility(false);
    this.view.flxBackToFeaturesByCust.setVisibility(false);
    this.view.searchBoxFeatures.tbxSearchBox.text = "";
    this.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
    this.AccountLevelFeaturesTab = false;
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCompanies.searchByCustLimits");
    if(isBackAction && isBackAction === true){
      if(this.AccountLevelFeaturesTab){
        // AccountLevelFeaturesTab tab
        this.resetPaginationValues(Object.keys(this.selectedContractAccounts.length));
        this.createAccountFeatureCards(this.selectedContractAccounts);
      }else{
        // other features tab
        this.createContractTemplate(this.limitsList.globalLevelLimits);
      }
    }
    this.view.forceLayout();
  },
  
  /* set pagination values to initial page

  */

  resetPaginationValues : function(dataLen){
    this.loadMoreModel = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : 0
    };
    if(dataLen<10)
     {
       // this.view.cardPagination.lblShowing.text = "Showing 1 - "+dataLen+" Of " + dataLen;
       this.view.flxLimitPagination.setVisibility(false); 
     }
    else{
      this.view.flxLimitPagination.setVisibility(true); 
      this.view.cardPagination.lblShowing.text = "Showing 1 - 10 Of " + dataLen;
       }
    this.view.cardPagination.lblNumber.text = "1";
    this.view.cardPagination.tbxPageNumber.text = "1";
   
  },

 
  
    onSegmentPaginationChange : function(currentValue){
    var self =this;
    var cardsToAppend;
      var searchText = this.view.searchBoxFeatures.tbxSearchBox.text;
    var isSearch = searchText.length> 0 ? true: false;
      if(this.view.flxAccFeaturesListContainer.isVisible){
        cardsToAppend= isSearch === false ? this.view.flxAccountFeaturesCardList.info.accounts: self.searchFilterRecords;
      }else{
        cardsToAppend= isSearch === false ?
          (this.view.flxFeaturesByCustomerCont.info?this.view.flxFeaturesByCustomerCont.info.permissions:[]): self.searchFilterRecords;
      }
    
    kony.adminConsole.utils.showProgressBar(this.view);
    var offsetVal = currentValue *10;
    if(this.view.flxAccFeaturesListContainer.isVisible ){
    if(isSearch===false)
      self.createFeatureCardsAccLvl(offsetVal-10, offsetVal);
     else
        self.createFeatureCardsAccLvl(offsetVal-10, offsetVal, this.searchFilterRecords);

    }
    else if( this.view.flxCustFeaturesListContainer.isVisible  ){
      if(isSearch===false)
      self.createFeatureCards(offsetVal-10, offsetVal);
    else
      self.createFeatureCards(offsetVal-10, offsetVal, this.searchFilterRecords);

}
       self.loadMoreModel.PAGE_OFFSET = offsetVal;
    this.view.cardPagination.lblNumber.text = currentValue;
    this.view.cardPagination.tbxPageNumber.text = currentValue;
    var endVal = Object.keys(cardsToAppend).length < self.loadMoreModel.PAGE_OFFSET  ? Object.keys(cardsToAppend).length : self.loadMoreModel.PAGE_OFFSET;
    this.view.cardPagination.lblShowing.text = "Showing" + " " + (offsetVal-10+1) + " - " + endVal + " " + "Of " + Object.keys(cardsToAppend).length;
  },
  
  
  /*
  * show the account level features actions for the customer screen
  */
  showFeaturesAtAccountLevel : function(accounts , coreCustomerJSON){
    this.view.lblSelectedCustValue.text = (coreCustomerJSON.coreCustomerName || coreCustomerJSON.name) + " ("+(coreCustomerJSON.coreCustomerId || coreCustomerJSON.id)+")";
    this.view.lblSelectedCustValue.info={"custId":coreCustomerJSON.coreCustomerId || coreCustomerJSON.id};
    this.view.flxBackToFeaturesByCust.setVisibility(true);
    this.view.flxCustFeaturesListContainer.setVisibility(false);
    this.view.flxAccFeaturesListContainer.setVisibility(true);
    this.view.searchBoxFeatures.tbxSearchBox.text = "";
    this.view.searchBoxFeatures.flxClearSearch.setVisibility(false);
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SearchByAccountNumber");
	    this.AccountLevelFeaturesTab = true;
   /* let coreCustomers = this.limitsList.accountLevelLimits[contractId];
    // getting the coreCustomer
    let coreCustomer =  coreCustomers.filter(function(rec){
      if(rec.coreCustomerId === coreCustomerJSON.coreCustomerId){
        return rec;
      }
    });*/
    this.selectedContractAccounts=JSON.parse(JSON.stringify(accounts));
    this.createAccountFeatureCards(accounts, coreCustomerJSON, true);
    this.view.forceLayout();
  },
  /*
  * get features actions nested structure from flat structure
  * @param: features actions flat structure array
  * @return: nested features actions
  */
  getFeatureBasedActions : function(allFeatureActions){
    var featureJson ={};
    for(var i=0;i<allFeatureActions.length ;i++){
      var action = {"accessPolicyId": allFeatureActions[i].accessPolicyId,
                    "actionDescription": allFeatureActions[i].actionDescription,
                    "actionId": allFeatureActions[i].actionId,
                    "actionLevelId": allFeatureActions[i].actionLevelId,
                    "actionName": allFeatureActions[i].actionName,
                    "actionStatus": allFeatureActions[i].actionStatus,
                    "dependentActions": allFeatureActions[i].dependentActions,
                    "isAccountLevel": allFeatureActions[i].isAccountLevel,
                    "limitGroupId":  allFeatureActions[i].limitGroupId,
                    "limits":  allFeatureActions[i].limits,
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
    var nestedFeatures = Object.values(featureJson);
    return nestedFeatures;
  },
  /*
  * create contract containers dynamically
  */
  createContractTemplate : function(lvlPermissions){
    this.resetPaginationValues(Object.keys(lvlPermissions).length);
    this.loadMoreModel.PAGE_OFFSET = 0;
    this.cachedLimitsData = {};
    this.view.flxFeaturesByCustomerCont.info={"permissions":lvlPermissions};
    var i = 0;
    this.loadMoreModel.TOTAL_PAGES = Math.ceil( Object.keys(lvlPermissions).length/10);
    if(Object.keys(lvlPermissions).length>0){
      this.view.flxFeaturesByCustomerCont.setVisibility(true);
      this.view.rtxMsgNoLimits.setVisibility(false);
      if(Object.keys(lvlPermissions).length<10){
        this.createFeatureCards(0,Object.keys(lvlPermissions).length);
        this.loadMoreModel.PAGE_OFFSET =Object.keys(lvlPermissions).length;
      }
      else{
        this.createFeatureCards(0,10);
        this.loadMoreModel.PAGE_OFFSET = 10;
      }
    }else{
      this.view.flxFeaturesByCustomerCont.setVisibility(false);
      this.view.rtxMsgNoLimits.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagement.rtxMsgActivityHistory");
      this.view.rtxMsgNoLimits.setVisibility(true);
    }

  },
  createFeatureCards : function(start,end, searchResults){
    var lvlPermissions= searchResults === undefined ? this.view.flxFeaturesByCustomerCont.info.permissions : searchResults;
    var permissionKeys=Object.keys(lvlPermissions);
    end=permissionKeys.length>end?end:permissionKeys.length;
    this.view.flxFeaturesByCustomerCont.removeAll();
    var compWidth = this.view.flxEntitlementsWrapper.frame.width === 0 ? "95%" : (this.view.flxEntitlementsWrapper.frame.width - 40);
    for(var i = start;i< end;i++){
      var flxId = i>= 10 ? ""+i : "0"+i;
      var contractFlex = this.view.flxFeaturesContractCardTemplate.clone(flxId);
      contractFlex.top = "10dp";
      contractFlex.width = compWidth + "dp",
      contractFlex.isVisible = true;
      this.view.flxFeaturesByCustomerCont.add(contractFlex);
      
      let coreCustomers = lvlPermissions[permissionKeys[i]];
      // the feature cards are used for mapping customers
      this.createCustFeatureCards(flxId , coreCustomers,permissionKeys[i] );
      
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /*
  * create feature cards for customer inside the contract containers
  * the feature cards are used for mapping customers
  * @param: contract container id
  */
  createCustFeatureCards : function(parentWidId ,coreCustomers , contractId){
    var self = this;
    this.view[parentWidId+"flxFeatureCardsContainer"].removeAll();
    
    // setting the contract name
    this.view[parentWidId +'lblHeading'].text = coreCustomers[0].contractName +' (' +coreCustomers[0].contractId+')';

    for (var i = 0; i < coreCustomers.length; i++) {
      var num = i>10 ? ""+i : "0"+i;
      var id = parentWidId+"C"+num;
      var coreCustomer  = coreCustomers[i];
      var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId|| self.presenter.custSearchLEId;
      var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
        "id": "featureCustCard" +id,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width": "100%",
        "top": "15dp"
      }, {}, {});
      featureCardToAdd.isVisible = true;
      featureCardToAdd.showThreeColumns();
      featureCardToAdd.lblData2.onTouchEnd = function() {
        var inputParams = {      
           "coreCustomerId":coreCustomer.coreCustomerId || coreCustomer.id,
           "legalEntityId":legalEntityId
        }
        self.view.DataFields.info={"customerName":coreCustomer.coreCustomerName || coreCustomer.name};
        self.presenter.getCoreCustomerDetails(inputParams);
        self.view.forceLayout();
      };
      featureCardToAdd.lblName.text = coreCustomer.coreCustomerName || coreCustomer.name;
      featureCardToAdd.flxColumn3.isVisible = false;
      featureCardToAdd.lblData1.text = coreCustomer.coreCustomerId ||coreCustomer.id;
      //featureCardToAdd.lblData2.text = coreCustomer.taxId?coreCustomer.taxId:"N/A";
      var address="N/A";
      featureCardToAdd.lblData2.text = "View";
      featureCardToAdd.lblHeading2.text = "TAX ID & ADDRESS";
      featureCardToAdd.lblData2.left = "0px";
      featureCardToAdd.lblData2.skin = "sknLblLato13px117eb0Cursor";
      if(coreCustomer.cityName||coreCustomer.country)
          address=this.AdminConsoleCommonUtils.getAddressText(coreCustomer.cityName,coreCustomer.country);
      featureCardToAdd.lblData3.text = address;
      // onTouchStart on the below label is not smooth updating to onClick
      featureCardToAdd.lblName.onTouchStart = function(){
         var inputParams = {      
           "coreCustomerId":coreCustomer.coreCustomerId || coreCustomer.id,
           "legalEntityId":legalEntityId
        };
        this.presenter.getCoreCustomerDetails(inputParams,"NAME_CLICK");
      }.bind(this);
      var custBasicInfo = this.presenter.getCurrentCustomerDetails();
      var custId = coreCustomer.coreCustomerId || coreCustomer.id;
      if(custId === custBasicInfo.primaryCustomerId){
        featureCardToAdd.flxPrimary.isVisible=true;
      }
      //hide edit button if customer is not accessable for current logged in user
      featureCardToAdd.btnEdit.isVisible = custBasicInfo.isCustomerAccessiable === true ? true : false;
      // assign data and actions for a feature card
      this.setDataActionsForCustFeatureCard(featureCardToAdd , coreCustomer , contractId);
      this.view[parentWidId+"flxFeatureCardsContainer"].add(featureCardToAdd);
    }
    this.view.forceLayout();
  },
  /*
  * assign data and actions for a feature card
  * @param: cust feature card path, data to set
  */
  setDataActionsForCustFeatureCard : function(featureCard,coreCustomer , contractId){
    var self=this;
    featureCard.flxDynamicWidgetsContainer.isVisible = false;
    featureCard.flxHeadingRightContainer.isVisible = true;
    featureCard.lblData4.skin = "sknLblLato13px117eb0Cursor";
    featureCard.lblCount.isVisible=false;
    var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
    featureCard.flxArrow.onClick = this.fetchLimitsOnExpand.bind(this,featureCard,coreCustomer,1);
    //featureCard.flxArrow.onClick = this.toggleCardListVisibility.bind(this,featureCard,1);
    featureCard.btnEdit.onClick = function(){
      self.editLimitsOnClick(featureCard,false, coreCustomer);
    };
    featureCard.lblData4.onClick = this.presenter.getGroupFeaturesAndActions.bind(this, coreCustomer.userRole ,legalEntityId,'frmCustomerProfileLimits' );
    featureCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Limits");
    featureCard.lblCount.text = "";
    featureCard.toggleCollapseArrow(false);
	if(this.AccountLevelFeaturesTab === true)
      featureCard.btnView.setVisibility(false);
    else{
      featureCard.btnView.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.ViewByAccounts");
      //featureCard.btnView.onClick = this.showFeaturesAtAccountLevel.bind(this, contractId ,coreCustomer );
      featureCard.btnView.onClick = this.viewByAccountsClick.bind(this,featureCard , coreCustomer, 2);
    } 
    
  },
  /*
  * widget map for features segments
  * @returns: widget map json
  */
  getWidgetDataMapForLimits : function(){
    var widgetMap ={
      "flxEnrollLimits":"flxEnrollLimits",
      "lblLimitsHeading":"lblLimitsHeading",
      "flxLimitsContainer":"flxLimitsContainer",
      "flxLimitsRow1":"flxLimitsRow1",
      "lblRowHeading1":"lblRowHeading1",
      "flxLimitValue1":"flxLimitValue1",
      "lblCurrency1":"lblCurrency1",
      "lblValue1":"lblValue1",
      "flxLimitsRow2":"flxLimitsRow2",
      "lblRowHeading2":"lblRowHeading2",
      "flxLimitValue2":"flxLimitValue2",
      "lblCurrency2":"lblCurrency2",
      "lblValue2":"lblValue2",
      "flxLimitsRow3":"flxLimitsRow3",
      "lblRowHeading3":"lblRowHeading3",
      "flxLimitValue3":"flxLimitValue3",
      "lblCurrency3":"lblCurrency3",
      "lblValue3":"lblValue3",
      "lblSeperator":"lblSeperator"
    };
    return widgetMap;
  },
 /*
  * set features and actions segment data in feature card
  * @param: segment widget path
  */
  setLimitsCardSegmentData : function(segmentPath , limits){
    var self =this;
    var featuresSegData = [];
    var limitGroupName="";
    for(var a=0;a<limits.length;a++){
      let limitOb = self.getObjectFromArrayOfObjects(limits[a].limits);
      if(limits[a].limitGroupId && limits[a].limitGroupId!=="ACCOUNT_TO_ACCOUNT"){
        if(limits[a].limitGroupId==="BULK_PAYMENT")
          limitGroupName="BULK TRANSACTION LIMITS";
        else if(limits[a].limitGroupId==="SINGLE_PAYMENT")
          limitGroupName="SINGLE TRANSACTION LIMITS";
        featuresSegData.push({
          "template":"flxEnrollLimits",
          "lblLimitsHeading":{"text":limitGroupName},
          "lblRowHeading1":{"text":kony.i18n.getLocalizedString("i18n.konybb.perTransaction")},
          "lblCurrency1":{"text":self.currencyValue},
          "lblValue1":{"text":limitOb['MAX_TRANSACTION_LIMIT']?limitOb['MAX_TRANSACTION_LIMIT']:"0"},
          "lblRowHeading2":{"text":kony.i18n.getLocalizedString("i18n.konybb.dailyTransaction")},
          "lblCurrency2":{"text":self.currencyValue},
          "lblValue2":{"text":limitOb['DAILY_LIMIT']?limitOb['DAILY_LIMIT']:"0"},
          "lblRowHeading3":{"text":kony.i18n.getLocalizedString("i18n.konybb.weeklyTransaction")},
          "lblCurrency3":{"text":self.currencyValue},
          "lblValue3":{"text":limitOb['WEEKLY_LIMIT']?limitOb['WEEKLY_LIMIT']:"0"},
          "lblSeperator":{"isVisible":true}
        });
      }
    }
    segmentPath.widgetDataMap = this.getWidgetDataMapForLimits();
    segmentPath.setData(featuresSegData);
    segmentPath.setVisibility(false);
    this.view.forceLayout();
  },
  getWidgetDataMapForAccLimits : function(){
    return{
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
      "flxArrow":"flxArrow",
      "lblArrow":"lblArrow",
      
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
      "lblPerTransactionLimit": "lblPerTransactionLimit",
      "lblWeeklyTransactionLimit": "lblWeeklyTransactionLimit",
      "flxPerLimit": "flxPerLimit",
      "lblCurrencyPer": "lblCurrencyPer",
      "flxDailyLimit": "flxDailyLimit",
      "lblCurrencyDaily": "lblCurrencyDaily",
      "flxWeeklyLimit": "flxWeeklyLimit",
      "lblCurrencyWeekly": "lblCurrencyWeekly",
      "tbxDailyValue": "tbxDailyValue",
      "tbxPerValue": "tbxPerValue",
      "tbxWeeklyValue": "tbxWeeklyValue",

      // segContractsLimitsHeaderView template
      "flxActionDetails": "flxActionDetails",
      "flxActionStatus": "flxActionStatus",
      "flxContractsLimitsHeaderView": "flxContractsLimitsHeaderView",
      "flxDailyLimitHeader": "flxDailyLimitHeader",
      "flxLimitInfo1": "flxLimitInfo1",
      "flxLimitInfo2": "flxLimitInfo2",
      "flxLimitInfo3": "flxLimitInfo3",
      "flxPerLimitHeader": "flxPerLimitHeader",
      "flxViewLimitsHeader": "flxViewLimitsHeader",
      "flxWeeklyLimitHeader": "flxWeeklyLimitHeader",
      "fontIconInfo1": "fontIconInfo1",
      "fontIconInfo2": "fontIconInfo2",
      "fontIconInfo3": "fontIconInfo3",
      "lblActionName": "lblActionName",
      "lblDailyLimitHeader": "lblDailyLimitHeader",
      "lblPerLimitHeader": "lblPerLimitHeader",
      "lblWeeklyLimitHeader": "lblWeeklyLimitHeader",
      "statusIcon": "statusIcon",
      "statusValue": "statusValue",
      "lblLimitsSeperator3" :"lblLimitsSeperator3"
    };
  },
  setAccLevelLimitsCardSegmentData : function(segmentPath,limits){
    var segData=[];
    var segInd=-1;
    var self=this;
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
              self.onHoverCallBack(widget, context,info);
            }
          },
          "flxLimitInfo2":{"onHover" : function(widget, context) {
              let info = "This is daily transaction value for " + limit.featureName + " submitted over the online banking channel.";
              self.onHoverCallBack(widget, context,info);
            }
          },
          "flxLimitInfo3":{"onHover" : function(widget, context) {
              let info = "This is daily transaction value for " + limit.featureName + " submitted over the online banking channel.";
              self.onHoverCallBack(widget, context,info);
            }
          },
          'fontIconInfo2':'',
          'fontIconInfo3':'',
          "lblActionName": limit.featureName,          
          "lblActionHeader": kony.i18n.getLocalizedString("i18n.frmMfascenarios.ACTION_CAP"),
          "lblPerLimitHeader": "Per transaction",
          "lblDailyLimitHeader": "DAILY TRANSACTION",
          "lblWeeklyLimitHeader":"WEEKLY TRANSACTION",
          "lblAvailableActions": "Monetary Actions:",

          "lblCountActions":{
            'text':limit.actions.length ,
            'isVisible' : true
          },
          'template':'flxContractsLimitsHeaderView',
          'statusValue' : limit.featureStatus === 'SID_FEATURE_ACTIVE' ?'Active':'InActive',
          'statusIcon' : {
          "text" :  kony.i18n.getLocalizedString("i18n.frmAlertsManagement.lblViewAlertStatusKey"),
            "skin": "sknFontIconActivate"
          },
          'flxViewLimits':{"left" :"57dp"},
          "lblArrow": "\ue922", // side arrow
          "flxArrow": {
            "isVisible":true,
              "onClick": self.toggleCollapseArrowForSeg.bind(self, segmentPath, segInd , limit.actions)
          }
        },[
          {
            "template": "flxContractsFAHeaderView"
          }
        ]];
      });
    segmentPath.widgetDataMap = this.getWidgetDataMapForAccLimits();
    segmentPath.setData(segData);
    this.view.forceLayout();
  },
  /*
* set the collapse arrow images based on visibility
*/
  toggleCollapseArrowForSeg : function(segment , segInd  , resData){
      let rowData = segment.data[segInd];
      let arr = [
        {
          "template": "flxContractsFAHeaderView"
        }
      ];  
      let  check = false;

        check = rowData[0]["flxViewLimitsHeader"]["isVisible"];
        
        // check indicates is the segment row is collapse or not
        // if its collapsed than we push the data to this section
      
        if(!check){          
          arr = this.getRowDataForLimits(resData);
        }          
      rowData[1] = arr;

    // updating the current index  to expand
    // for limits tab updating the data
    check = rowData[0]["flxViewLimitsHeader"]["isVisible"];
    rowData[0]["flxViewLimitsHeader"]["isVisible"] = !check;
    rowData[0]['lblFASeperator1']["isVisible"] = !check;
    rowData[0]['lblLimitsSeperator3']["isVisible"] = check;
    rowData[0]['lblArrow'] = !check?"\ue915":"\ue922"; 

    // The previous row will collapse only if it's not matching current row 
    if (this.prevContractSelected.segRowNo !== segInd) {
      this.collapseSegmentSection(segment);
      this.prevContractSelected.segRowNo = segInd;
    }
      
      // if the section is collapse we reset the previous tab
      if(check) {
          this.prevContractSelected.segRowNo = -1;
      }
      
      segment.setSectionAt(rowData, segInd);
    this.view.forceLayout();
  },
    collapseSegmentSection: function(segment ){
    let prevInd = this.prevContractSelected.segRowNo;
    // if prevIndex is empty we reset to -1
    if(prevInd == -1){
      return;
    }
    let rowData = segment.data[prevInd];
    if(rowData[1].template=== "flxContractsFAHeaderView"){
      // the segment doesn't have section , returning from he function
      return;
    }
    
    rowData[1] = [
      {
        "template": "flxContractsFAHeaderView"
      }
    ];
    // collapsing the rowdata
    this.resetSectionsForViewContracts(rowData);
    
    // updating the index 
    segment.setSectionAt(rowData , prevInd);
    // segment.setData(segment.data);
  },
    resetSectionsForViewContracts :  function(rowData){
    // we expand/collapse the rowData
      let  check = false;
      // for limits tab updating the data
      check = rowData[0]["flxViewLimitsHeader"]["isVisible"];
      rowData[0]["flxViewLimitsHeader"]["isVisible"] = !check;
      rowData[0]['lblFASeperator1']["isVisible"] = !check;
      rowData[0]['lblLimitsSeperator3']["isVisible"] = check;

      rowData[0]['lblArrow'] = !check?"\ue915":"\ue922"; 
      // ue915 is the down arrow

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
    return 	limit.map(function(action) {
      let limitOb = self.getObjectFromArrayOfObjects(action.limits);
      return {
        "flxViewLimits":{"left":"57dp"},
        "lblAction": action.actionName,
        "lblCurrencyPer": {"text":self.currencyValue},
        "lblCurrencyDaily": {"text":self.currencyValue},
        "lblCurrencyWeekly": {"text":self.currencyValue},
        "lblPerTransactionLimit": limitOb['MAX_TRANSACTION_LIMIT'] ? limitOb['MAX_TRANSACTION_LIMIT'] :"-",
        "template": "flxContractsLimitsBodyView",
        "lblDailyTransactionLimit": limitOb['DAILY_LIMIT'] ? limitOb['DAILY_LIMIT'] :"-",
        "lblLimitsSeperator":".",
        "lblFASeperator1":{"isVisible" : false},
        "lblWeeklyTransactionLimit": limitOb['WEEKLY_LIMIT'] ? limitOb['WEEKLY_LIMIT'] :"-"
      };
    });
  },
  onHoverCallBack:function(widget, context,info) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.showOnHvrInfo(context, widGetId, info);
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
    scopeObj.view.ToolTip.lblarrow.skin =  "sknfontIconDescRightArrow14px";
    scopeObj.view.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
    scopeObj.view.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    scopeObj.view.ToolTip.setVisibility(true);
    scopeObj.view.forceLayout();
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
          if(cardWidget.segAccountFeatures.data.length>0){
          cardWidget.segAccountFeatures.setVisibility(true);
          cardWidget.flxNoFilterResults.setVisibility(false);
         } else{
            cardWidget.lblNoFilterResults.text= this.AccountLevelFeaturesTab === false ? 
              "There are no monetary features selected for this customer": "There are no monetary features selected for this account";
            cardWidget.flxNoFilterResults.setVisibility(true);
            cardWidget.segAccountFeatures.setVisibility(false);
          }
          this.view.forceLayout();
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
      }else if(rowsData[i].flxContractsLimitsBodyView){
        rowsData[i].flxContractsLimitsBodyView.isVisible = visibility;
      }
    }
    return rowsData;
  },
  /*
  * create feature cards for customer at acount level
  */
  createAccountFeatureCards : function(accounts, coreCustomer,isInitial){
    this.view.flxAccountFeaturesCardList.removeAll();
    this.resetPaginationValues(accounts.length);
    if(isInitial && isInitial === true){
      this.view.flxAccountFeaturesCardList.info={"accounts":accounts,"coreCustomer":coreCustomer};
    }
    this.loadMoreModel.PAGE_OFFSET = 0;
    if(accounts.length>10){
      if(coreCustomer){
        this.createFeatureCardsAccLvl(0,10);
      }else{ //in case of search
        this.createFeatureCardsAccLvl(0,10, accounts);
      }
      this.loadMoreModel.PAGE_OFFSET = 10;
    }else{
      if(coreCustomer){
        this.createFeatureCardsAccLvl(0,accounts.length);
      }else{ //in case of search
        this.createFeatureCardsAccLvl(0,accounts.length, accounts);
      }

      this.loadMoreModel.PAGE_OFFSET = accounts.length;
    }
    this.view.forceLayout();
//     var i = 0;
//     if(accounts.length>0){
//       this.view.rtxMsgNoAccLimits.setVisibility(false);
//       this.view.flxAccountFeaturesCardList.setVisibility(true);
//       for(var a=0;a<accounts.length;a++){

//         var num = i>10 ? ""+i : "0"+i;
//         var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
//           "id": "featureAccCard" +num,
//           "isVisible": true,
//           "masterType": constants.MASTER_TYPE_DEFAULT,
//           "width":"100%",
//           "top": "15dp"
//         }, {}, {});
//         featureCardToAdd.isVisible = true;
//         featureCardToAdd.showThreeColumns();
//         //hide edit button if customer is not accessible for current logged in user
//         var custBasicInfo = this.presenter.getCurrentCustomerDetails();
//         featureCardToAdd.btnEdit.isVisible = custBasicInfo.isCustomerAccessiable === true ? true : false;
        
//         this.setDataActionsForAccFeatureCard(featureCardToAdd  , accounts[a], coreCustomer);
//         this.view.flxAccountFeaturesCardList.add(featureCardToAdd);
//         i++;
//       }
//     }else{
//       this.view.rtxMsgNoAccLimits.setVisibility(true);
//       this.view.flxAccountFeaturesCardList.setVisibility(false);
//     }
//     this.view.forceLayout();
  },
  createFeatureCardsAccLvl : function(start,end,searchResults){
    var accounts= searchResults === undefined ? this.view.flxAccountFeaturesCardList.info.accounts: searchResults;
    var coreCustomer=this.view.flxAccountFeaturesCardList.info.coreCustomer;
    this.view.flxAccountFeaturesCardList.removeAll();
    this.resetPaginationValues(accounts.length);
    var compWidth = this.view.flxEntitlementsWrapper.frame.width === 0 ? "95%" : (this.view.flxEntitlementsWrapper.frame.width - 40);
    if(accounts.length>0){
      this.view.rtxMsgNoAccLimits.setVisibility(false);
      this.view.flxAccountFeaturesCardList.setVisibility(true);
      end=accounts.length>end?end:accounts.length;//to loop until accounts length(27) and not offset end value(30)
    for(var i = start;i<end;i++){

      var num = i>10 ? ""+i : "0"+i;
      var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
        "id": "featureAccCard" +num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width": compWidth + "dp",
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
    }else{
      this.view.rtxMsgNoAccLimits.setVisibility(true);
      this.view.flxAccountFeaturesCardList.setVisibility(false);
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  /*
  * assign data and actions for a feature card at account level
  * @param: cust feature card path, data to set, coreCustomer details
  */
  setDataActionsForAccFeatureCard : function(featureCard,account, coreCustomer){
    var self=this;
    featureCard.flxDynamicWidgetsContainer.isVisible = false;
    featureCard.flxHeadingRightContainer.isVisible = true;
    featureCard.btnView.isVisible = false;
    featureCard.lblName.skin = "sknLbl192B45LatoRegular14px";
    featureCard.lblName.text = "Account Number:"+account.accountNumber;
    featureCard.info = {"accountId":account.accountNumber};
    featureCard.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTTYPE");
    featureCard.lblData1.text = account.accountType;

    featureCard.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.ACCOUNTNAME");
    featureCard.lblData2.text = account.accountName;

    featureCard.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP_TYPE");
    featureCard.lblData3.text = account.ownerType?account.ownerType:"N/A";
    featureCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Limits");
    featureCard.lblCount.text = "";
    featureCard.flxArrow.onClick = this.toggleCardListVisibility.bind(this,featureCard,2);
    //featureCard.flxArrow.onClick  = this.fetchLimitsOnExpand.bind(this,featureCard,coreCustomer,2,account.accountNumber);
    featureCard.btnEdit.onClick = function(){
      self.editLimitsOnClick(featureCard,true, coreCustomer);
    };
    var features=this.getFeatureBasedActions(account.featurePermissions);
    this.setAccLevelLimitsCardSegmentData(featureCard.segAccountFeatures , features);
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
  updatedEntitlementCollection: function (a1, a2) {
    return a1.filter(function (x) {
      var result = false;
      if (a2.indexOf(x) < 0) result = true;
      return result;
    });
  },
  /*
  * fetch limits on click of expand arrow
  */
  fetchLimitsOnExpand : function(featuresCustCard, contractCustomer,option,accId){
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
    var inputReq = {"userId" :userId,"coreCustomerId": contractCustomer.coreCustomerId ||contractCustomer.id ,"contractId":contractCustomer.contractId, "legalEntityId": legalEntityId || ""};
    var cardContext = {"cardWidgetRef":featuresCustCard, "isCustLevel": option===1 ? true:false,"accountId":accId};
    Object.assign(cardContext,inputReq);
    var visibility = featuresCustCard.flxCardBottomContainer.isVisible === true ? false : true;
    if(visibility === true){
      if(this.cachedLimitsData[cardContext.contractId +"#" + cardContext.coreCustomerId]){
        this.setCustLimitsOnExpand(this.cachedLimitsData[cardContext.contractId +"#" + cardContext.coreCustomerId]);
      }else{ //if no cached data available fetch from service
        kony.adminConsole.utils.showProgressBar(this.view);
        this.presenter.getInfinityUserLimits(inputReq,"InfoScreen",cardContext);
      }
    }else{
      featuresCustCard.lblCount.isVisible= false;
      featuresCustCard.toggleCollapseArrow(visibility);
    }
  },
  /*
  * set limits data on expand at limit group/cust level
  */
  setCustLimitsOnExpand : function(custLimitsContext){
    var featureCard = custLimitsContext.cardContext.cardWidgetRef;
    var accountId = custLimitsContext.cardContext.accountId;
    this.cachedLimitsData[custLimitsContext.cardContext.contractId +"#" + custLimitsContext.cardContext.coreCustomerId] = custLimitsContext;
    var limitGroups = custLimitsContext.FeaturesAndActions.transactionLimits[0].limitGroups;
    this.setLimitsCardSegmentData(featureCard.segAccountFeatures , limitGroups);
    this.toggleCardListVisibility(featureCard,1);
    this.view.forceLayout();
  },
  /*
  * fetch features on click of expand arrow
  */
  viewByAccountsClick : function(featuresCustCard,contractCustomer, option){
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
    var inputReq = {"userId" :userId,"coreCustomerId": contractCustomer.coreCustomerId ||contractCustomer.id ,"contractId":contractCustomer.contractId,"legalEntityId": legalEntityId || ""};
    var cardContext = {"cardWidgetRef":featuresCustCard, "isCustLevel": option===1 ? true:false};
    var visibility = featuresCustCard.flxCardBottomContainer.isVisible === true ? false : true;
    Object.assign(cardContext,inputReq);
    if(this.cachedLimitsData[cardContext.contractId +"#" + cardContext.coreCustomerId]){
      this.setViewByAccountsData(this.cachedLimitsData[cardContext.contractId +"#" + cardContext.coreCustomerId]);
    }else{
      kony.adminConsole.utils.showProgressBar(this.view);
      this.presenter.getInfinityUserLimits(inputReq,"InfoScreen",cardContext);
    }
   
  },
  /*
  * set account level limits 
  */
  setViewByAccountsData : function(context){
    var self = this;
    var featureCard = context.cardContext.cardWidgetRef;
    var isCustLevel = context.cardContext.isCustLevel;
    this.cachedLimitsData[ context.cardContext.contractId +"#" +  context.cardContext.coreCustomerId] = context;
    var featuresActions = context.FeaturesAndActions.transactionLimits;
    var selectCustAcc = featuresActions[0].accounts;
    var custAccFeatures = featuresActions[0];
    var accId = featureCard.info ? featureCard.info.accountId : "";
    this.showFeaturesAtAccountLevel(selectCustAcc ,featuresActions[0] );
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
  /*
  * navigate to enroll form to edit the customers
  * @param: accountsFeaturesCard path,isccLevel(true/false), core customer details
  */
  editLimitsOnClick : function(accountsFeaturesCard,isAccountLevel, coreCustDetails){
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var userId = this.presenter.getCurrentCustomerDetails().userId || this.presenter.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    var input = {
      "id": userId,
      "coreCustomerId": coreCustDetails.coreCustomerId || coreCustDetails.id,
      "contractId": coreCustDetails.contractId,
      "legalEntityId": legalEntityId
    };
    var customerData = {"custId": coreCustDetails.coreCustomerId || coreCustDetails.id,
                        "taxId": coreCustDetails.taxId || kony.i18n.getLocalizedString("i18n.common.NA"),
                        "address": this.AdminConsoleCommonUtils.getAddressText(coreCustDetails.cityName,coreCustDetails.country)};
    var navigationParam = {"formName":"frmCustomerProfileLimits",
                           "isEnrollEditUser" : true,
                           "tabName":"LIMITS",
                           "data": customerData,
                           "isAccountLevel":isAccountLevel};
    this.presenter.getInfinityUserAllDetails(input,navigationParam);
  },
  showNoLimitsScreen : function(){
    this.view.flxFeaturesSearchContainer.setVisibility(false);
    var custStatus=this.presenter.getCurrentCustomerDetails().CustomerStatus_id;
    var isAssociated=this.presenter.getCurrentCustomerDetails().isAssociated;
    if(custStatus==="SID_CUS_SUSPENDED"&&isAssociated==="false"){
      this.view.rtxMsgNoLimits.text=kony.i18n.getLocalizedString("i18n.customerProfileContracts.noContractsMsg");
    }else
      this.view.rtxMsgNoLimits.text="There are no monetary features selected.";
    this.view.rtxMsgNoLimits.setVisibility(true);
    this.view.flxFeaturesByCustomerCont.setVisibility(false);
    this.view.forceLayout();
  }
});
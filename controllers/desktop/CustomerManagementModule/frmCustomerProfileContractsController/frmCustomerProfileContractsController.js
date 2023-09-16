define({  
  selectedFeatureIndex : 0,
  prevSelectedFeature:[],
  groupActionConfig :{
    CREATE:"CREATE",
    EDIT:"EDIT",
    COPY: "COPY"
  },
  pageCount: {
    PAGE_OFFSET: 0,
    TOTAL_PAGES:0
  },
  contractsView: [],
  signatoryGroupsView: [],
  removeCount: 0,
  recordsSize: 5,
  prevIndex: -1,
  allMonActionsList: null,
  customerType: "",
  loadMoreModel: {
    PAGE_OFFSET: 0
  },
  selectedTab: 1,
  totalPages:0,
  searchFilterRecords:[],
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
      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

      }else if(context.contractsView){
        this.view.lblContractsTitle.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.ListOfContractsCustomersAssociated") +
        ' ' + this.presenter.getCurrentCustomerDetails().Name;
        this.contractsView = context.contractsView;
      this.signatoryGroupsView=context.signatoryGroupsView || [];
        this.showContractsScreen();
      }
      else if(context.userNameRulesPolicy){
        this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
      } 
      else if (context.FeaturesAndActions) {
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName4);
        if (context.FeaturesAndActions.target === "InfoScreen") {
          this.showFeaturesAndActionsScreen(context.FeaturesAndActions);
        } 
      } else if(context.featureDetails){
        this.showRoleDetailsPopup(context.featureDetails.features);
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
      }
      else if (context.custDetails) {

        this.setAddressPopupData(context.custDetails,context.category);

      }
     
    }
     
  },
  CustomerProfileContractsPreshow: function () {
    var self=this;
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName4);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 135 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
	//hiding the contracts list flex as old data shown until list data is set
    this.view.flxContractsWrapper.setVisibility(false);
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
    this.view.DataFields.flxPopUpClose.onClick = function () {
     self.view.flxViewPopUp.setVisibility(false);
    };
  },
  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileEntitlements_flxMainContent").onscroll = function () { };
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
   
  filterSearchResults: function (searchTxt) {
    searchTxt = searchTxt.toLowerCase();
    return this.contractsView.filter(function (contract) {
      // contract name 
      if (contract.contractName.toLowerCase().indexOf(searchTxt) != -1) {
        return true;
      }
      // service type
      if (contract.serviceDefinitionType.toLowerCase().indexOf(searchTxt) != -1) {
        return true;
      }
      // customer name
      // customer id 
      return contract.contractCustomers.some(function (customer) {
        if (customer.id.toLowerCase().indexOf(searchTxt) != -1 ||
          customer.name.toLowerCase().indexOf(searchTxt) != -1) {
          return true;
        }
      });
    }
    );
  },
  setFlowActions: function () {
    var scopeObj = this;
    this.view.searchBoxContracts.flxIconBackground.onClick = function () {
      if(scopeObj.view.searchBoxContracts.tbxSearchBox.text.length > 3){
        scopeObj.isSearchPerformedViewCont = true;
        scopeObj.view.searchBoxContracts.flxClearSearch.setVisibility(true);
        let searchTxt = scopeObj.view.searchBoxContracts.tbxSearchBox.text;
        scopeObj.searchFilterRecords = scopeObj.filterSearchResults(searchTxt);
        scopeObj.resetPaginationValues(scopeObj.searchFilterRecords.length);
        scopeObj.createCustFeatureCards(scopeObj.searchFilterRecords);
        scopeObj.view.forceLayout();
      }
    };
    const searchInternalUsers1 = function () {
      scopeObj.view.searchBoxContracts.flxIconBackground.onClick();
    };
    const debounce = function (func, delay) {
      var self = this;
      let timer;
      return function () {
        let context = self,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      };
    };
    const searchInternalUsersCall = debounce(searchInternalUsers1, 300);
    this.view.searchBoxContracts.tbxSearchBox.onDone = function () {
      if(scopeObj.view.searchBoxContracts.tbxSearchBox.text.length > 3 || scopeObj.view.searchBoxContracts.tbxSearchBox.text === ""){
        if (scopeObj.view.searchBoxContracts.tbxSearchBox.text === "") {
          scopeObj.view.searchBoxContracts.flxClearSearch.onClick();
        } else {
          scopeObj.view.searchBoxContracts.flxClearSearch.setVisibility(true);
        }
        searchInternalUsersCall();
        scopeObj.view.forceLayout();
      }
    };
    this.view.dropdownEntity.flxSelectLegalEntity.onClick = function(){
      var segmntData = scopeObj.view.dropdownEntity.segEntity.data;
      if(segmntData.length === 1 ){  
        scopeObj.this.view.dropdownEntity.flxSegEntity.setVisibility(false);
      }
      else {
        if(scopeObj.view.dropdownEntity.flxSegEntity.isVisible === false) {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(true);
        } else {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
        }
      }
    };
 this.view.searchBoxContracts.flxClearSearch.onClick = function () {
      scopeObj.view.searchBoxContracts.tbxSearchBox.text = "";
      scopeObj.view.searchBoxContracts.flxClearSearch.setVisibility(false);
      // resetting the search
      scopeObj.resetPaginationValues(scopeObj.contractsView.length);
      scopeObj.searchFilterRecords = [];
      scopeObj.createCustFeatureCards(scopeObj.contractsView);
    };
    this.view.SuspendUserpopUp.btnPopUpNo.onClick = function () {
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.flxCloseViewContractPopup.onClick = function(){
      scopeObj.view.flxViewContractPopup.setVisibility(false);
    };
    this.view.flxRoleDetailsClose.onClick = function(){
      scopeObj.view.flxRoleDetailsPopup.setVisibility(false);
    };
    this.view.btnContractsEditCust.onClick = function(){
      scopeObj.editContractOnClick(false);
    };
    
    // add customer button action when there are no contracts
    this.view.btnSearchContractCustomers.onClick = function(){
      scopeObj.editContractOnClick(true);
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

  },
  saveScreenY: function (widget, context) {
    this.mouseYCoordinate = ((context.screenY + this.view.flxMainContent.contentOffsetMeasured.y) - (this.view.breadcrumbs.frame.height + this.view.mainHeader.flxMainHeader.frame.height));
  },
  /*
  * hide widet on hover out for dropdowns
  */
  onDropdownHoverCallback: function (widget, context) {
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
  * show the list of contracts
  */
  showContractsScreen: function () {
    var custDetails = this.presenter.getCurrentCustomerDetails();
    this.resetPaginationValues(this.contractsView.length);
    this.searchFilterRecords = [];
    //hide edit button if customer is not accessable for current logged in user
    this.view.btnContractsEditCust.setVisibility(custDetails.isCustomerAccessiable === true);
    this.view.searchBoxContracts.tbxSearchBox.text = "";
    if (this.contractsView.length === 0) {
      this.view.flxNoContractAdded.setVisibility(true);
      this.view.flxContractsWrapper.setVisibility(false);
      //this.view.flxContractPagination.setVisibility(false);
    } else {
      this.view.flxNoContractAdded.setVisibility(false);
      // this.view.flxContractsWrapper.setVisibility(true);
      //this.view.flxContractPagination.setVisibility(true);
      this.createCustFeatureCards(this.contractsView, this.signatoryGroupsView);
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /*
  * set pagination values to initial page
  */
  resetPaginationValues : function(dataLen){
    this.pageCount = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : 0
    };
     if(dataLen<10)
     {
       this.view.flxContractPagination.setVisibility(false); 
     }
    else{
      this.view.flxContractPagination.setVisibility(true);
    this.view.cardPagination.lblNumber.text = "1";
    this.view.cardPagination.tbxPageNumber.text = "1";
    this.view.cardPagination.lblShowing.text = "Showing 1 - 10 Of " + dataLen;
    }
  },
  /*
  * create contract cards for customer
  * @param: 
  */
  createCustFeatureCards: function (contracts, signatoryGroups) {
    var self = this;
    this.view.flxContractCardListContainer.removeAll();
    this.view.flxViewContractPopup.info={};
    this.view.flxContractsWrapper.setVisibility(true);
    this.view.rtxMsgProducts.setVisibility(false);
    this.view.flxContractsWrapper.info = { "contractRecords": contracts, "signGroups": signatoryGroups };
    if (!contracts || contracts.length === 0) {
      this.view.rtxMsgProducts.setVisibility(true);
      this.view.forceLayout();
      return;
    }
    this.pageCount.TOTAL_PAGES = Math.ceil( contracts.length/10);
    if (contracts.length < 10) {
      this.setDynamicContractCards(0, contracts.length);
      self.pageCount.PAGE_OFFSET = contracts.length;
    }
    else {
      this.setDynamicContractCards(0, 10);
      self.pageCount.PAGE_OFFSET = 10;
    }


    this.view.forceLayout();
  },
  onSegmentPaginationChange : function(currentValue){
    var self =this;
    var cardsToAppend;
    var searchText = this.view.searchBoxContracts.tbxSearchBox.text;
    var isSearch = searchText.length> 0 ? true: false;
    cardsToAppend = isSearch === false ? this.view.flxContractsWrapper.info.contractRecords : this.searchFilterRecords;
    kony.adminConsole.utils.showProgressBar(this.view);
    var offsetVal = currentValue *10;
    if(isSearch === false){
      self.setDynamicContractCards(offsetVal-10, offsetVal);
    }else{
      self.setDynamicContractCards(offsetVal-10, offsetVal, this.searchFilterRecords);
    }
    self.pageCount.PAGE_OFFSET = offsetVal;
    this.view.cardPagination.lblNumber.text = currentValue;
    this.view.cardPagination.tbxPageNumber.text = currentValue;
    var startVal = (offsetVal -10) === 0 ? "1": offsetVal-10;
    var endVal = cardsToAppend.length < self.pageCount.PAGE_OFFSET  ? cardsToAppend.length : self.pageCount.PAGE_OFFSET;
    this.view.cardPagination.lblShowing.text = "Showing" + " " + (startVal+1) + " - " + endVal + " " + "Of " + cardsToAppend.length;
  },
  setDynamicContractCards: function (start, end, searchResults) {
    var contracts = searchResults === undefined ? 
        (this.view.flxContractsWrapper.info.contractRecords ? this.view.flxContractsWrapper.info.contractRecords : []) :searchResults;
    var signatoryGroups = this.view.flxContractsWrapper.info.signGroups ? this.view.flxContractsWrapper.info.signGroups : [];
    var self = this;
    var c = this.pageCount.PAGE_OFFSET;
    var flag = false;
    var screenWidth = kony.os.deviceInfo().screenWidth;
    this.view.flxContractCardListContainer.removeAll();
    if (end >= contracts.length)
      end = contracts.length;
    for (var x = start; x < end; x++) {
      var num = x > 10 ? "" + x : "0" + x;
      let contract = contracts[x];
      var contractCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
        "id": "contractCard" +num,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width":"100%",
        "top": "15dp"
      }, {}, {});
      contractCardToAdd.isVisible = true;
      this.setDataActionsForContractCard(contractCardToAdd, contract, signatoryGroups);
      this.view.flxContractCardListContainer.add(contractCardToAdd);
    }
    for (var i = start; i < end; i++) {
      flag = true;
      c = c + 1;
    }
    if (flag === false && (this.pageCount.PAGE_OFFSET === 0)) {
      this.view.rtxMsgProducts.setVisibility(true);
    } else if (flag === true && (this.pageCount.PAGE_OFFSET === 0)) {
      this.view.rtxMsgProducts.setVisibility(false);
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  /*
  * set the data and assign actions for the card
  * @param: current card widget path
  */
  setDataActionsForContractCard: function (contractCard, contract, signatoryGroups) {
    contractCard.flxDynamicWidgetsContainer.isVisible = false;
    contractCard.lblCount.isVisible = false;
    contractCard.flxContractTag.isVisible = true;
    contractCard.btnViewEdit.isVisible = true;
    contractCard.lblName.skin = "sknLbl192B45LatoRegular14px";
    contractCard.btnViewEdit.text = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.ViewContract");
    contractCard.flxArrow.onClick = this.toggleCardListVisibility.bind(this, contractCard, this.view.flxContractCardListContainer);
    contractCard.btnViewEdit.onClick = this.showViewContractsPopup.bind(this, contract);
    contractCard.toggleCollapseArrow(false);

    contractCard.lblName.text = contract.contractName;
    contractCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.Customers");

    contractCard.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Contract_ID");
    contractCard.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Service_Type");
    contractCard.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.Service_UC");
    if (contract.isPrimary === "true") {
      contractCard.flxPrimary.setVisibility(true);
    }
    contractCard.lblData1.text = contract.contractId;
    contractCard.lblData2.text = contract.serviceDefinitionType;
    contractCard.lblData3.text = contract.serviceDefinitionName;
    this.setContractCardSegmentData(contractCard.segAccountFeatures, contract, signatoryGroups);
    this.view.forceLayout();
  },
  /*
  * toggles the card to show the list of customers container
  * @param: current card widget path, parent container widget path
  */
  toggleCardListVisibility : function(cardWidget,parentFlexPath){
    var contractCards = parentFlexPath.widgets();
    
    for(var j=0; j<contractCards.length; j++){
      if(contractCards[j].id === cardWidget.id){
        var visibilityCheck = cardWidget.flxCardBottomContainer.isVisible;
        cardWidget.toggleCollapseArrow(!visibilityCheck);
      } else{
        this.view[contractCards[j].id].toggleCollapseArrow(false);
      }
    }
  },
   /*
  * widget map for customer segments
  * @returns: widget map json
  */
  getWidgetDataMapForCustomers : function(){
    var widgetMap ={
      "lblCustName":"lblCustName",
      "lblCustId":"lblCustId",//SIGNATORY GROUP
      "lblTaxId":"lblTaxId",
      "lblCustAddress":"lblCustAddress",
      "lblCustRole":"lblCustRole",
      "flxStatus":"flxStatus",
      "lblSeperator":"lblSeperator",
      "flxCustMangContracts":"flxCustMangContracts"     
    };
    return widgetMap;
  },
  /*
  * set customers segment data in contract card
  * @param: segment widget path
  */
     setAddressPopupData: function (custData,category) {
    if(!this.view.flxViewContractPopup.info[custData.id])
      this.view.flxViewContractPopup.info[custData.id]=custData;
    if(category==="VIEW_CONTRACT"){
      var selectedIndex=this.view.viewContractCard.segRelatedContractsList.selectedRowIndex?this.view.viewContractCard.segRelatedContractsList.selectedRowIndex[1]:0;
      var selectedRowData=this.view.viewContractCard.segRelatedContractsList.data[selectedIndex];
      selectedRowData.lblContractAddress.text=custData.addressLine1 + " " + custData.addressLine2;
      selectedRowData.lblContractAddress.onTouchStart=function(){};
      selectedRowData.lblContractAddress.skin="sknLbl485C75LatoRegular13Px";
      this.view.viewContractCard.segRelatedContractsList.setDataAt(selectedRowData,selectedIndex,0);
      this.view.flxLoading2.setVisibility(false);
    }else{
      this.view.DataFields.lblPopUpMainMessage.text = this.view.DataFields.info.customerName;
      this.view.DataFields.lblHeading1.text = "TAX ID";
      this.view.DataFields.lblHeading2.text = "ADDRESS";
      if (custData.taxId === "") {
        this.view.DataFields.lblData1.text = "N/A";
      }
      else {
        this.view.DataFields.lblData1.text = custData.taxId;
      }
      this.view.DataFields.lblData2.text = custData.addressLine1 + " " + custData.addressLine2;
      this.view.DataFields.setVisibility(true);
      this.view.flxViewPopUp.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * to check if the Signatory Group Name is present or not
  */
     checkAuthGroups: function(rec, signatoryGroups) {    
     
        var authSignatory = "N/A";
	for(var x = 0; x<signatoryGroups.length; x++)
       {
          if (signatoryGroups[x].coreCustomerId === rec)
            {
                for( var i =0 ;i<signatoryGroups[x].groups.length;i++)
                {
                    if(signatoryGroups[x].groups[i].isAssociated===true)
                        {
                               authSignatory= signatoryGroups[x].groups[i].signatoryGroupName;
                        return authSignatory;
                        }
                }               
            
       }}
  return authSignatory;
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
  /*
  * show contract details popup on click of view contract button
  */
  showViewContractsPopup : function(contract){
    this.view.flxViewContractPopup.setVisibility(true);
    var widgetMap = {
      "flxCheckbox":"flxCheckbox",
      "lblContractName":"lblContractName",
      "lblContractId":"lblContractId",
      "lblContractAddress":"lblContractAddress",
      "lblSeperator":"lblSeperator",
      "flxEnrollCustomerContractList":"flxEnrollCustomerContractList"
    };
    this.view.viewContractCard.segRelatedContractsList.widgetDataMap = widgetMap;
    this.view.viewContractCard.lblContractName.text = contract.contractName +" ("+ contract.contractId+")";
    this.view.viewContractCard.flxArrow.onClick = function(){
      let check = this.view.viewContractCard.flxBottomContainer.isVisible;
      this.view.viewContractCard.flxBottomContainer.isVisible =  !check;
      this.view.viewContractCard.lblArrow.text = !check ? "\ue915":"\ue922";
      // ue915 is the down arrow
    }.bind(this);
    this.setViewContractPopupSegData(contract.contractCustomers);
  },
  /*
  * set customer list in view contract popup
  */

  setViewContractPopupSegData : function(customersList){
    var self = this;
    var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
    var segData = customersList.map(function(rec){
      return{
        "flxCheckbox":{"isVisible":false},
        "lblContractName":{"text": rec.name},
        "lblContractId": {"text":rec.id},
        //"lblContractAddress": {"text":rec.addressLine1 +','+rec.addressLine2},
         "lblContractAddress": {"text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.View"), "skin": "sknLblLato13px117eb0Cursor",

          "onTouchStart": () => {
            if(self.view.flxViewContractPopup.info[rec.id]){
              self.setAddressPopupData(self.view.flxViewContractPopup.info[rec.id],"VIEW_CONTRACT");
            }else{
            var inputParam = {
              "coreCustomerId": rec.id,
              "legalEntityId":legalEntityId
            };
            self.view.DataFields.info = { "customerName": rec.name };
            self.view.flxLoading2.setVisibility(true);
            self.presenter.getCoreCustomerDetails(inputParam,"VIEW_CONTRACT");
            self.view.forceLayout();
            }
          }
                              },

        "lblSeperator": "-",
        "template": "flxEnrollCustomerContractList"
      };
    });
    this.view.viewContractCard.segRelatedContractsList.setData(segData);
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
  * create rows dynamically for given additional features
  * @param: additional features list
  */
  createAdditionalFeaturesRow: function (addFeatures) {
    var flag = false;
    var c = this.loadMoreModel.PAGE_OFFSET;
    for (var i = 0; i < addFeatures.length; i++) {
      if (addFeatures[i].isAssigned && (addFeatures[i].isAssigned === "1")) {
        flag = true;
        var collapsibleSegmentToAdd = new com.adminConsole.customerRoles.collapsibleSegment({
          "id": "additionalFeatureRow" + c,
          "isVisible": true,
          "width": "100%",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": "20px"
        }, {}, {});
        this.view.flxOtherAddtionalFeaturesActions.add(collapsibleSegmentToAdd);
      }
      c = c + 1;
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
    
  },
  /*
  * append more features data when scroll reaches to end for retail customer
  */
  appendMoreRecordsReachingEnd: function(context){
    var self = this ;
    if(Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight)){
      var featuresToAppend;
      if(self.selectedTab === 1){
        var selectedInd = self.view.segRolesSubTabs.selectedRowIndex ? self.view.segRolesSubTabs.selectedRowIndex[1] : 0;
        featuresToAppend = self.view.segRolesSubTabs.data.length > 0 ? self.view.segRolesSubTabs.data[selectedInd].info : [];
        featuresToAppend = this.getAssignedFeaturesFromAllFeatures(featuresToAppend);
        if(self.loadMoreModel.PAGE_OFFSET < featuresToAppend.length){
          kony.adminConsole.utils.showProgressBar(this.view);
          self.createFeaturesRowForData(featuresToAppend.slice(self.loadMoreModel.PAGE_OFFSET,self.loadMoreModel.PAGE_OFFSET + self.recordsSize));
          self.loadMoreModel.PAGE_OFFSET = self.loadMoreModel.PAGE_OFFSET + self.recordsSize; 
        } 
      }else if(self.selectedTab === 2 && (self.view.flxOtherAddtionalFeaturesActionsContainer.isVisible === true)){
        featuresToAppend = self.otherFeaturesActions;
        var filteredFeaturesToAppend = this.getAssignedFeaturesFromAllFeatures(featuresToAppend);
        if(self.loadMoreModel.PAGE_OFFSET < filteredFeaturesToAppend.length){
          kony.adminConsole.utils.showProgressBar(this.view);
          self.createAdditionalFeaturesRow(filteredFeaturesToAppend.slice(self.loadMoreModel.PAGE_OFFSET,self.loadMoreModel.PAGE_OFFSET + self.recordsSize));
          self.loadMoreModel.PAGE_OFFSET = self.loadMoreModel.PAGE_OFFSET + self.recordsSize; 
        } 
      }
      
    }
  },
  /*
  * navigate to enroll form to edit the customers
  */
  editContractOnClick: function (isSuspendedUser) {
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var legalEntityId =customerDetails.legalEntityId || this.presenter.custSearchLEId;
    var input = {"id": customerDetails.Customer_id,"legalEntityId":legalEntityId || ""};
    var navigationParam = {
      "formName": "frmCustomerProfileContracts",
      "isEnrollEditUser": false,
      "tabName": "CONTRACTS"
    };
    this.presenter.getInfinityUserServiceDefsRoles(input, navigationParam, isSuspendedUser);
  },
  setContractCardSegmentData: function(segmentPath, contract, signatoryGroups) {
        var self = this;
        var customerData = [{
            "id": "13133",
            "name": "John Doe",
            "taxId": "9662",
            "address": "Bloomington, Unitd States",
            "role": "Full Access"
        }, {
            "id": "45232",
            "name": "George",
            "taxId": "8123",
            "address": "New York",
            "role": "Full Access"
        }, ];
        var segSecData = {
            "lblCustName": {
                "text": kony.i18n.getLocalizedString("i18n.View.CUSTOMER_UC"),
                "skin": "sknlblLato696c7311px"
            },
            "lblCustId": {
                "text": kony.i18n.getLocalizedString("i18n.Contracts.signatory_groups_UC"),
                "skin": "sknlblLato696c7311px"
            },
            /*  "lblTaxId":{"text":kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.CustomerID"),
                               "skin":"sknlblLato696c7311px"}, */
            "lblCustAddress": {
                "text": "TAX ID & ADDRESSS",
                "skin": "sknlblLato696c7311px",
                "left": "27%"
            },
            "lblCustRole": {
                "text": kony.i18n.getLocalizedString("i18n.roles.ROLE"),
                "skin": "sknlblLato696c7311px",
                "left": "58%"
            },
            "lblSeperator": {
                "text": "-",
                "skin": "sknLblSeparator696C73"
            },
            "template": "flxCustMangContracts"
        };
        let associatedCustomer = contract.contractCustomers.filter(function(cust) {
            return cust.isAssociated === "true";
        });
        var customerRowsData = associatedCustomer.map(function(rec) {
            var auth = self.checkAuthGroups(rec.id, signatoryGroups);
            var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
            return {
                "lblCustName": {
                    "text": rec.name + " (" + rec.id + ")"
                },
                "lblCustId": {
                    "text": auth
                },
                //  "lblTaxId":{"text":rec.taxId},
                "lblCustAddress": {
                    "text": "View",
                    "skin": "sknLblLato13px117eb0Cursor",
                    "left": "27%",
                    "onClick": () => {
                        if (self.view.flxViewContractPopup.info[rec.id]) {
                            self.setAddressPopupData(self.view.flxViewContractPopup.info[rec.id]);
                        } else {
                            var inputParam = {
                                "coreCustomerId": rec.id,
                                "legalEntityId":legalEntityId
                            };
                            self.view.DataFields.info = {
                                "customerName": rec.name
                            };
                            self.presenter.getCoreCustomerDetails(inputParam);
                            // var response = self.presenter.getCustContractDetails();
                            // self.view.DataFields.lblData1.text = response.taxId;
                            // self.view.DataFields.lblData2.text = response.addressLine1 + " " + response.addressLine2;
                            self.view.forceLayout();
                        }
                    },
                },
                "lblCustRole": {
                    "text": rec.userRoleName ? rec.userRoleName : "N/A",
                    "skin": "sknLblLato13px117eb0Cursor",
                    "left": "58%",
                    "onClick": () => {
                        if (rec.userRole) {
                          	var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
                            self.view.lblRoleDetailsHeader1.text = rec.userRoleName ? rec.userRoleName : "N/A";
                            self.view.lblRoleDescriptionValue.text = rec.userRoleDescription ? rec.userRoleDescription : "N/A";
                            self.presenter.getGroupFeaturesAndActions(rec.userRole,legalEntityId, 'frmCustomerProfileContracts');
                        }
                    }
                },
                "lblSeperator": "-",
                "template": "flxCustMangContracts",
            };
        });
        //  this.view.forceLayout();
        segmentPath.widgetDataMap = this.getWidgetDataMapForCustomers();
        segmentPath.setData([
            [segSecData, customerRowsData]
        ]);
    },  

});

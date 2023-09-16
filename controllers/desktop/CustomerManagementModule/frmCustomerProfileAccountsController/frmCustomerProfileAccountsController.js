define({
    AccountTrasactions: [],
  	prevIndex:-1,
    successLabel: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Successful"),
    sortBy: null,
    cardNumber: null,
    paginationDetails:{
        currSegContractData:[]
    },      
    searchResult :{
        isAcctMatched : false
    },
  pageCount : {
    PAGE_OFFSET: 0,
    TOTAL_PAGES:0
    },
    isAccountsTab : false,
    cardsSegData :[],
    cardsInformation : [],
    customerAccounts : [],
    CustomerContracts:[],
    inBusinessToggle:false,
    totalPages:0,
    searchFilterRecords:[],
    searchAccountsFilterData:[],
    willUpdateUI: function (context) {
        if (context) {
            this.updateLeftMenu(context);
            this.resetFilterWidgetsForAcct();
            if (context.LoadingScreen) {
                if (context.LoadingScreen.focus) {
                    kony.adminConsole.utils.showProgressBar(this.view);
                } else {
                    kony.adminConsole.utils.hideProgressBar(this.view);
                }
            } else if (context.hideToastModel) {
                // hiding the toast message 
                this.view.toastMessage.hideToastMessage(this);
              }else if (context.toastModel) {
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

            } else if (context.enrollACustomer) {
                this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

            } else if (context.StatusGroup) {
                this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

            } else if (context.CustomerNotes) {
                this.view.Notes.displayNotes(this, context.CustomerNotes);

            } else if (context.OnlineBankingLogin) {
                this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

            } else if (context.CustomerAccounts) {
                this.resetAllSortImagesAccounts();
                this.setSkinForProductTabs(this.view.btnProductsAccounts);
                this.customerAccounts = context.CustomerAccounts;
                this.setDataForProductsSegment(this.customerAccounts);
                if(this.customerAccounts.length === 0){
                    this.view.rtxMsgProducts.setVisibility(false);
                }
                this.setAccountsFilterData();

            }else if(context.CustomerContracts){
                this.resetAllSortImagesAccounts();
                this.setSkinForProductTabs(this.view.btnProductsAccounts);
                this.CustomerContracts = context.CustomerContracts;

                this.showProductInfoScreen();
                // be default we go to AccountsTab 
                this.isAccountsTab = true;
                var custStatus=this.presenter.getCurrentCustomerDetails().CustomerStatus_id;
                var isAssociated=this.presenter.getCurrentCustomerDetails().isAssociated;
                if(context.CustomerContracts.length===0&&custStatus==="SID_CUS_SUSPENDED"&&isAssociated==="false"){
                  this.view.rtxMsgProducts.text=kony.i18n.getLocalizedString("i18n.customerProfileContracts.noContractsMsg");
                  this.view.rtxMsgProducts.setVisibility(true);
                  this.view.flxContractsSearchContainer.setVisibility(false);
                  this.view.flxFeaturesContractCardTemplate.setVisibility(false);
                  this.view.forceLayout();
                }else{
                  this.createContractTemplate( this.CustomerContracts);
                  this.view.rtxMsgProducts.setVisibility(false);
                  this.setAccountsFilterData();
                }
            } else if (context.AccountTrasactions) {
                this.resetAllSortImagesTransactions();
                var acctNo = this.view.segProductListing.selecteditems[0].lblAccountNumber;
                this.setDataForProductDetailsScreen(this.presenter.getCustomerAccountInfo(acctNo));
                this.AccountTrasactions = context.AccountTrasactions;
                this.setDataForProductTransactionSegment(this.successLabel);

            } else if (context.cardsInfomartion) {
                this.cardsInformation=context.cardsInfomartion;
                this.setDataToCardMangSegment();
                this.setCardsFilterData();

            } else if (context.UpdateCardRequests) {
                this.presenter.getCardsInformation({ "customerUsername": this.presenter.getCurrentCustomerDetails().Username });

            } else if (context.eStatementUpdate) {
                if (context.eStatementUpdate.eStatementUpdateStatus === "success") {
                    if (this.view.imgRbPaper.src === this.AdminConsoleCommonUtils.radioSelected) {
                        this.view.toastMessage.showToastMessage("Paper statement successfully enabled.", this);
                    }
                    else if (this.view.imgRbEstatement.src === this.AdminConsoleCommonUtils.radioSelected) {
                        this.view.toastMessage.showToastMessage("e-statement successfully enabled.", this);
                    }
                  this.showEstateColoumns(context.eStatementUpdate);
                }
                else {
                    if (this.view.imgRbPaper.src === this.AdminConsoleCommonUtils.radioSelected) {
                        this.view.imgRbPaper.src = this.AdminConsoleCommonUtils.radioNotSelected;
                        this.view.imgRbEstatement.src = this.AdminConsoleCommonUtils.radioSelected;
                        this.view.flxSubscriptionsEmail.setVisibility(true);
                        this.view.toastMessage.showErrorToastMessage("Paper statement could not be enabled.", this);
                    }
                    else if (this.view.imgRbEstatement.src === this.AdminConsoleCommonUtils.radioSelected) {
                        this.view.imgRbEstatement.src = this.AdminConsoleCommonUtils.radioNotSelected;
                        this.view.imgRbPaper.src = this.AdminConsoleCommonUtils.radioSelected;
                        this.view.flxSubscriptionsEmail.setVisibility(false);
                        this.view.toastMessage.showErrorToastMessage("e-statement could not be enabled.", this);
                    }
                }
          }
          else if(context.userNameRulesPolicy){
            this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
          } 
          else if(context.linkProfilesList){
            this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList,this);
          }
          else if(context.userNameIsAvailable){
            this.view.delinkProfilePopup.checkUserNameAvailability(context.userNameIsAvailable);
          }
          else if(context.checkAuthSignatory){ 
            //for business user,to get isauthSignatory flag in case not available in basicInfo
            var customerType = context.checkAuthSignatory.customer.CustomerType_id;
            var status = context.checkAuthSignatory.customer.CustomerStatus_id;
            //hiding link/delink profile buttons
            /*if (status === "LOCKED" || status === "SUSPENDED" || status === "NEW") {
              this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,false);
            }  else {
              this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,true);
            }*/
          }else if(context.custDetails){
            this.setTaxIdPopupData(context.custDetails);
          } else if(context.userAccountsForCoreCust){
            var accountsData = context.userAccountsForCoreCust.coreCustomerAccounts ? context.userAccountsForCoreCust.coreCustomerAccounts : [];
            if(accountsData.length > 0){
              var filteredAccounts = this.filterAccountsOnExpandForSearch(accountsData);
              this.setAccountsSegmentDataForCust(filteredAccounts,context.cardInfo);

            }
        }
      }
    },
  showEstateColoumns: function(eStateInfo){
    if(eStateInfo.LastUpdated&&eStateInfo.LastUpdated!=="")
      this.view.lblData1.text= this.getLocaleDate(eStateInfo.LastUpdated);
    else
      this.view.lblData1.text= "N/A";
    if(eStateInfo.UpdatedBy&&eStateInfo.UpdatedBy!=="")
      this.view.lblData2.text=eStateInfo.UpdatedBy;
    else
      this.view.lblData2.text= "N/A";
    this.view.flxUpdatedOn.setVisibility(true);
    this.view.flxUpdatedBy.setVisibility(true);
    this.view.forceLayout();
  },
    CustomerProfileAccountsPreshow: function () {
      var self = this;
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName2);
        this.view.Notes.setDefaultNotesData(this);
        this.view.flxToastMessage.setVisibility(false);
        var screenHeight = kony.os.deviceInfo().screenHeight;
        this.view.flxMainContent.height = screenHeight - 135 + "px";
        this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
        this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
        this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
        this.view.lblCardType.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CardType").toUpperCase();
        this.AdminConsoleCommonUtils.setVisibility(this.view.flxTransactionHistorySegmentHeader, true);
        this.AdminConsoleCommonUtils.setVisibility(this.view.flxSeperator4, true);
        this.AdminConsoleCommonUtils.setVisibility(this.view.rtxMsgTransctions, false);
        this.view.flxProductHeaderAndDetails.bottom = "20px";
        this.view.flxProductHeaderAndDetails.top = "35px";
        this.view.flxProductHeaderAndDetails.left = "35px";
        	this.view.flxUpdatedOn.setVisibility(false);
        	this.view.flxUpdatedBy.setVisibility(false);
        this.AdminConsoleCommonUtils.setVisibility(this.view.flxProductDetailsHeader, false);
        this.AdminConsoleCommonUtils.setVisibility(this.view.productHeader.lblSeperator, false);
        this.view.flxSubcriptionContainer.info = { "clicked": false };
        this.view.linkProfilesPopup.initializeLinkProfileActions(this);
        this.view.delinkProfilePopup.delinkProfilePreshow(this);
        this.view.cardContextualMenu.skin="slFbox";
        this.view.flxToggleButtonsContainer.setVisibility(false);
      this.view.searchBoxContracts.tbxSearchBox.text = "";
      this.view.searchBoxContracts.flxClearSearch.setVisibility(false);
      this.view.dropdownEntity.flxSegEntity.setVisibility(false);
      var LEData = this.presenter.getDataLegalEntities();
      if (LEData) {
        this.setDataforLegalEntity(LEData);
      } else {
        var legalEntityId = this.presenter.getLegalEntity();
        var legalEntity = this.getLEDesc(legalEntityId);
        this.setDataforSingleLegalEntity(legalEntity);
      } 
        this.setFlowActions();
    },
   
    filterSearchResults : function(searchTxt){
        searchTxt = searchTxt.toLowerCase();
        let searchResults = JSON.parse(JSON.stringify(this.CustomerContracts));
        var self =this;
        return searchResults.filter(function(contract){
                // contract name 
                if(contract.contractName.toLowerCase().indexOf(searchTxt)  !=-1 ){
                    return true;
                }
                // customer name
                // customer id 
                contract.contractCustomers = contract.contractCustomers.filter(function(customer){
                    if(customer.id.toLowerCase().indexOf(searchTxt)  !=-1 || customer.name.toLowerCase().indexOf(searchTxt)  !=-1 ){
                        return true;
                    }
                    
                    // account number
                    customer.coreCustomerAccounts = customer.coreCustomerAccounts.filter(function(account){
                        self.searchResult.isAcctMatched = true;
                        if(account.accountId.toLowerCase().indexOf(searchTxt) !=-1 ){
                            self.searchResult.isAcctMatched =true;
                            return true;
                        }
                    });
                    return customer.coreCustomerAccounts.length !=0;
                });
                return contract.contractCustomers.length !=0;                              
            }
        );
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
   
    
    setFlowActions: function () {
        var scopeObj = this;
        
        this.view.contractDetailsPopup.flxPopUpClose.onClick = function(){
            scopeObj.view.flxContractDetailsPopup.setVisibility(false);
        };
      this.view.searchBoxContracts.flxIconBackground.onClick = function(){
        if(scopeObj.view.searchBoxContracts.tbxSearchBox.text.length > 3){
          scopeObj.onSearchIconClick();
        }
      };
        const searchInternalUsers1 = function() {
            scopeObj.view.searchBoxContracts.flxIconBackground.onClick();
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
      this.view.searchBoxContracts.tbxSearchBox.onDone = function(){
        if(scopeObj.view.searchBoxContracts.tbxSearchBox.text.length > 3 || scopeObj.view.searchBoxContracts.tbxSearchBox.text === ""){
          if(scopeObj.view.searchBoxContracts.tbxSearchBox.text === ""){
            scopeObj.view.searchBoxContracts.flxClearSearch.onClick();
          }else{
            scopeObj.view.searchBoxContracts.flxClearSearch.setVisibility(true);
          }
          searchInternalUsersCall();
          scopeObj.view.forceLayout();
        }
      };
        this.view.searchBoxContracts.flxClearSearch.onClick = function(){
            scopeObj.view.searchBoxContracts.tbxSearchBox.text = "";
            scopeObj.view.searchBoxContracts.flxClearSearch.setVisibility(false);
            scopeObj.resetPaginationValues();
            scopeObj.searchFilterRecords = [];
            if(!scopeObj.isAccountsTab){
                // cards tab
                scopeObj.view.segProductCardListing.setData(scopeObj.cardsSegData);
            }else{
                // accounts tab
                
                // resetting the search
                scopeObj.searchAccountsFilterData =[];
                scopeObj.createContractTemplate( scopeObj.CustomerContracts);
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
        this.view.btnTabName1.onClick = function () {
            scopeObj.setSkinForHistoryTabs(scopeObj.view.btnTabName1);
            kony.adminConsole.utils.showProgressBar(scopeObj.view);
            scopeObj.setDataForProductTransactionSegment(scopeObj.successLabel);
            kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        };
        this.view.btnTabName2.onClick = function () {
            scopeObj.setSkinForHistoryTabs(scopeObj.view.btnTabName2);
            kony.adminConsole.utils.showProgressBar(scopeObj.view);
            scopeObj.setDataForProductTransactionSegment(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PENDING"));
            kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        };
        this.view.btnTabName3.onClick = function () {
            scopeObj.setSkinForHistoryTabs(scopeObj.view.btnTabName3);
            kony.adminConsole.utils.showProgressBar(scopeObj.view);
            scopeObj.setDataForProductTransactionSegment(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Scheduled"));
            kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        };
      this.view.cardProductPagination.flxPrevious.onClick = function(){
        var currentValue = scopeObj.view.cardProductPagination.lblNumber.text;
        let prevVal = parseInt(currentValue)-1 ;
        if(prevVal> 0){
          scopeObj.onSegmentProductPaginationChange(prevVal);
        }      
      };
      this.view.cardProductPagination.flxnext.onClick = function(){
        var currentValue = parseInt(scopeObj.view.cardProductPagination.lblNumber.text)+1;
        if(currentValue <= scopeObj.pageCount.TOTAL_PAGES){
          scopeObj.onSegmentProductPaginationChange(currentValue);
        }
      };
      this.view.cardProductPagination.flxGo.onClick = function(){
        var currentValue= scopeObj.view.cardProductPagination.tbxPageNumber.text;
        if(currentValue && currentValue.toString().trim()!=="" && parseInt(scopeObj.pageCount.PAGE_OFFSET)>0 && parseInt(currentValue)<=scopeObj.pageCount.TOTAL_PAGES){                                                                                                 
          scopeObj.onSegmentProductPaginationChange(currentValue);
        }
      };
        this.view.transactionHistorySearch.lbxPageNumbers.onSelection = function () {
            var acctNo = scopeObj.view.segProductListing.selecteditems[0].lblAccountNumber;
            var endDate, startDate;
            scopeObj.view.calStartDate.setVisibility(false);
            scopeObj.view.transactionHistorySearch.flxStartDate.setVisibility(false);
            scopeObj.view.calEndDate.setVisibility(false);
            scopeObj.view.transactionHistorySearch.flxEndDate.setVisibility(false);

            if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.selectedKey === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.7days")) {
                if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.info.previousSelection !== kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.7days")) {
                    endDate = scopeObj.getTransactionDateForServiceCall(new Date());
                    startDate = scopeObj.getTransactionDateCustom(7, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DAYS"));
                    scopeObj.presenter.getAccountTransactions({
                        "AccountNumber": acctNo,
                        "StartDate": startDate,
                        "EndDate": endDate.slice(0,-9)
                    });
                }
                scopeObj.view.transactionHistorySearch.lbxPageNumbers.info = {
                    "previousSelection": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.7days")
                };

            } else if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.selectedKey === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.30days")) {
                if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.info.previousSelection !== kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.30days")) {
                    endDate = scopeObj.getTransactionDateForServiceCall(new Date());
                    startDate = scopeObj.getTransactionDateCustom(30, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DAYS"));
                    scopeObj.presenter.getAccountTransactions({
                        "AccountNumber": acctNo,
                        "StartDate": startDate,
                        "EndDate": endDate.slice(0,-9)
                    });
                }
                scopeObj.view.transactionHistorySearch.lbxPageNumbers.info = {
                    "previousSelection": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.30days")
                };

            } else if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.selectedKey === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.3months")) {
                if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.info.previousSelection !== kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.3months")) {
                    endDate = scopeObj.getTransactionDateForServiceCall(new Date());
                    startDate = scopeObj.getTransactionDateCustom(3, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MONTHS"));
                    scopeObj.presenter.getAccountTransactions({
                        "AccountNumber": acctNo,
                        "StartDate": startDate,
                        "EndDate": endDate.slice(0,-9)
                    });
                }
                scopeObj.view.transactionHistorySearch.lbxPageNumbers.info = {
                    "previousSelection": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.3months")
                };

            } else if (scopeObj.view.transactionHistorySearch.lbxPageNumbers.selectedKey === "custom") {
                scopeObj.view.calStartDate.setVisibility(true);
                scopeObj.view.transactionHistorySearch.flxStartDate.setVisibility(true);
                scopeObj.view.calEndDate.setVisibility(true);
                scopeObj.view.transactionHistorySearch.flxEndDate.setVisibility(true);
                scopeObj.view.calStartDate.value = "";
                scopeObj.view.calEndDate.value = "";
                scopeObj.view.transactionHistorySearch.lbxPageNumbers.info = {
                    "previousSelection": "custom"
                };
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
        this.view.customCalCreatedDate.event = function () {
            scopeObj.view.transactionHistorySearch.flxStartDate.skin = "sknFlxCalendar";
            scopeObj.view.transactionHistorySearch.flxEndDate.skin = "sknFlxCalendar";
            if (scopeObj.view.calStartDate.value !== "" && scopeObj.view.calEndDate.value !== "") {
                var endDate = scopeObj.getTransactionDateCustom(scopeObj.view.calEndDate.value, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOM"));
                var startDate = scopeObj.getTransactionDateCustom(scopeObj.view.calStartDate.value, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOM"));

                if (scopeObj.compareStartAndEndDate(scopeObj.view.calStartDate.value, scopeObj.view.calEndDate.value)) {
                    var acctNo = scopeObj.view.segProductListing.selecteditems[0].lblAccountNumber;
                    scopeObj.presenter.getAccountTransactions({
                        "AccountNumber": acctNo,
                        "StartDate": startDate,
                        "EndDate": endDate
                    });
                } else {

                    scopeObj.view.transactionHistorySearch.flxStartDate.skin = "sknFlxCalendarError";
                }

            }
        };
        this.view.calEndDate.event = function () {
            scopeObj.view.transactionHistorySearch.flxStartDate.skin = "sknFlxCalendar";
            scopeObj.view.transactionHistorySearch.flxEndDate.skin = "sknFlxCalendar";
            if (scopeObj.view.calStartDate.value !== "" && scopeObj.view.calEndDate.value !== "") {
                var endDate = scopeObj.getTransactionDateCustom(scopeObj.view.calEndDate.value, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOM"));
                var startDate = scopeObj.getTransactionDateCustom(scopeObj.view.calStartDate.value, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOM"));

                if (scopeObj.compareStartAndEndDate(scopeObj.view.calStartDate.value, scopeObj.view.calEndDate.value)) {
                    var acctNo = scopeObj.view.segProductListing.selecteditems[0].lblAccountNumber;
                    scopeObj.presenter.getAccountTransactions({
                        "AccountNumber": acctNo,
                        "StartDate": startDate,
                        "EndDate": endDate
                    });
                } else {
                    scopeObj.view.transactionHistorySearch.flxEndDate.skin = "sknFlxCalendarError";
                }
            }
        };
        this.view.segProductListing.onRowClick = function () {
            scopeObj.setSkinForAccountTabs(scopeObj.view.btnTransactionHistory);
            scopeObj.setSkinForHistoryTabs(scopeObj.view.btnTabName1);
            scopeObj.view.btnTransactionHistory.width = "160px";
            scopeObj.view.btnProductDetails.left = "190px";
            scopeObj.view.flxProductHeader.bottom = "0px";
            var acctNo = scopeObj.view.segProductListing.selecteditems[0].lblAccountNumber;
            var endDate = scopeObj.getTransactionDateForServiceCall(new Date());
            var startDate = scopeObj.getTransactionDateCustom(7, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DAYS"));
            scopeObj.presenter.getAccountTransactions({
                "AccountNumber": acctNo,
                "StartDate": startDate,
                "EndDate": endDate.slice(0,-9)
            });
            scopeObj.view.forceLayout();
        };
        //search on transaction history
        this.view.transactionHistorySearch.tbxSearchBox.onBeginEditing = function () {
            scopeObj.view.transactionHistorySearch.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
        };
        this.view.transactionHistorySearch.tbxSearchBox.onEndEditing = function () {
            scopeObj.view.transactionHistorySearch.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
        };
        this.view.transactionHistorySearch.tbxSearchBox.onKeyUp = function () {
            scopeObj.view.transactionHistorySearch.flxClearSearchImage.setVisibility(true);
            var searchParameters = [{
                "searchKey": "lblRefNo",
                "searchValue": scopeObj.view.transactionHistorySearch.tbxSearchBox.text
            },
            {
                "searchKey": "lblDateAndTime",
                "searchValue": scopeObj.view.transactionHistorySearch.tbxSearchBox.text
            },
            {
                "searchKey": "lblTransctionDescription",
                "searchValue": scopeObj.view.transactionHistorySearch.tbxSearchBox.text
            },
            {
                "searchKey": "lblType",
                "searchValue": scopeObj.view.transactionHistorySearch.tbxSearchBox.text
            },
            {
                "searchKey": "lblAmount",
                "searchValue": scopeObj.view.transactionHistorySearch.tbxSearchBox.text
            }

            ];
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            var listOfWidgetsToHide = [scopeObj.view.flxTransactionHistorySegmentHeader, scopeObj.view.flxSeperator4];
            scopeObj.search(scopeObj.view.segTransactionHistory, searchParameters, scopeObj.view.rtxMsgTransctions,
                kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.TOEND"), scopeObj.recordsSize, toAdd, listOfWidgetsToHide);

        };
        this.view.transactionHistorySearch.flxClearSearchImage.onClick = function () {
            scopeObj.view.transactionHistorySearch.tbxSearchBox.text = "";
            scopeObj.view.transactionHistorySearch.flxClearSearchImage.setVisibility(false);
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            var listOfWidgetsToHide = [scopeObj.view.flxTransactionHistorySegmentHeader, scopeObj.view.flxSeperator4];
            scopeObj.clearSearch(scopeObj.view.segTransactionHistory, scopeObj.view.rtxMsgTransctions,
                kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.TOEND"), scopeObj.recordsSize, toAdd, listOfWidgetsToHide);
        };
        this.view.btnApply.onClick = function () {
            scopeObj.advSearchUsers();
        };
        this.view.ProductCardRow2.btnLink2.onClick = function () {
            scopeObj.navigateToCustomerInfoPage(scopeObj.primaryUsername);
        };
        this.view.segProductCardListing.onRowClick = function () {
            scopeObj.view.flxProductHeader.isVisible = true;
            scopeObj.view.flxProductsAccounts.setVisibility(false);
            scopeObj.view.flxProductsCards.setVisibility(false);
            scopeObj.view.flxProductInfoTabs.setVisibility(false);
            scopeObj.view.flxProductHeaderAndDetails.setVisibility(false);
            scopeObj.view.flxTransactionHistoryWrapper.setVisibility(false);
            scopeObj.view.flxProductsTabs.setVisibility(false);
            scopeObj.view.flxProductListing.setVisibility(false);
            scopeObj.view.flxProductDetails.setVisibility(true);
            scopeObj.view.flxProductCardDetails.setVisibility(true);
            scopeObj.view.flxBackToProductListing.setVisibility(true);
            scopeObj.view.productHeader.lblSeperator.setVisibility(true);
            //Setting Header
            scopeObj.view.backToProductListing.btnBack.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Back_To_Cards");
            var index = scopeObj.view.segProductCardListing.selectedRowIndex[1];
            var rowData = scopeObj.view.segProductCardListing.data[index];

            scopeObj.primaryUsername = rowData.cardHolder_username;
            scopeObj.view.productHeader.lblProductCardName.text = rowData.product_cardProductName !== undefined ? rowData.product_cardProductName : "N/A";
            scopeObj.view.productHeader.blAccountNumber.text = rowData.product_maskedAccountNumber !== undefined ? rowData.product_maskedAccountNumber : "N/A";
            scopeObj.view.productHeader.lblCardStatus.text = rowData.product_cardStatus !== undefined ? rowData.product_cardStatus : "N/A";
            scopeObj.view.productHeader.fontIconCardStatus.skin=rowData.lblFontIconServiceStatus.skin;
            scopeObj.setCardOrAccountNumber(rowData.product_maskedAccountNumber);
            scopeObj.view.productHeader.lblCardStatus.skin = "sknFontIconOptionMenu";
            // Setting data      
            if (rowData.product_cardType === "Credit") {
                scopeObj.setCreditCardHeader();
                scopeObj.view.ProductCardRow1.lblData1.text = rowData.product_cardType !== undefined ? rowData.product_cardType : "N/A";
                scopeObj.view.ProductCardRow1.lblData2.text = rowData.product_accountName !== undefined ? rowData.product_accountName : "N/A";
                scopeObj.view.ProductCardRow1.lblData3.text = rowData.product_maskedCardNumber !== undefined ? rowData.product_maskedCardNumber : "N/A";

                scopeObj.view.ProductCardRow2.lblData1.text = rowData.product_serviceProvider !== undefined ? rowData.product_serviceProvider : "N/A";
                scopeObj.view.ProductCardRow2.lblData2.text = rowData.product_cardHolderName !== undefined ? rowData.product_cardHolderName : "N/A";
                scopeObj.view.ProductCardRow2.lblData3.text = rowData.product_interestRate !== undefined ? rowData.product_interestRate : "N/A";

                scopeObj.view.ProductCardRow3.lblData1.text = rowData.product_issuedOn !== undefined ? scopeObj.getLocaleDate(rowData.product_issuedOn.substr(0, 10)) : "N/A";
                scopeObj.view.ProductCardRow3.lblData2.text = rowData.product_expiryDate !== undefined ? scopeObj.getLocaleDate(rowData.product_expiryDate.substr(0, 10)) : "N/A";
                scopeObj.view.ProductCardRow3.lblData3.text = rowData.product_currentBalance !== undefined ? rowData.product_currentBalance : "N/A";

                scopeObj.view.ProductCardRow4.lblData1.text = rowData.product_withdrawlLimit !== undefined ? rowData.product_withdrawlLimit : "N/A";
                scopeObj.view.ProductCardRow4.lblData2.text = rowData.product_currentDueAmount !== undefined ? rowData.product_currentDueAmount : "N/A";
                scopeObj.view.ProductCardRow4.lblData3.text = rowData.product_rewardPointBalance !== undefined ? rowData.product_rewardPointBalance : "N/A";

                scopeObj.view.ProductCardRow5.lblData1.text = rowData.product_availableCredit !== undefined ? rowData.product_availableCredit : "N/A";
                scopeObj.view.ProductCardRow5.lblData2.text = rowData.product_currentDueDate !== undefined ? rowData.product_currentDueDate : "N/A";
                scopeObj.view.ProductCardRow5.lblData3.text = rowData.product_minimumDueAmount !== undefined ? rowData.product_minimumDueAmount : "N/A";

                scopeObj.view.ProductCardRow6.lblData1.text = rowData.product_lastStatementBalance !== undefined ? rowData.product_lastStatementBalance : "N/A";
                scopeObj.view.ProductCardRow6.lblData3.text = rowData.product_lastPaymentDate !== undefined ? rowData.product_lastPaymentDate.substr(0, 10) : "N/A";
                scopeObj.view.ProductCardRow6.lblData3.text = rowData.product_lastStatementPayment !== undefined ? rowData.product_lastStatementPayment : "N/A";

                scopeObj.view.ProductCardRow7.lblData1.text = rowData.billingAddress !== undefined ? rowData.billingAddress : "N/A";
            }
            if (rowData.product_cardType === "Debit") {
                scopeObj.setDebitCardHeader();
                scopeObj.view.ProductCardRow1.lblData1.text = rowData.product_cardType !== undefined ? rowData.product_cardType : "N/A";
                scopeObj.view.ProductCardRow1.lblData2.text = rowData.product_accountName !== undefined ? rowData.product_accountName : "N/A";
                scopeObj.view.ProductCardRow1.lblData3.text = rowData.product_maskedCardNumber !== undefined ? rowData.product_maskedCardNumber : "N/A";

                scopeObj.view.ProductCardRow2.lblData1.text = rowData.product_serviceProvider !== undefined ? rowData.product_serviceProvider : "N/A";
                scopeObj.view.ProductCardRow2.lblData2.text = rowData.product_cardHolderName !== undefined ? rowData.product_cardHolderName : "N/A";
                scopeObj.view.ProductCardRow2.lblData3.text = rowData.product_secondaryCardHolder !== undefined ? rowData.product_secondaryCardHolder : "N/A";

                scopeObj.view.ProductCardRow3.lblData1.text = rowData.product_issuedOn !== undefined ? scopeObj.getLocaleDate(rowData.product_issuedOn.substr(0, 10)) : "N/A";
                scopeObj.view.ProductCardRow3.lblData2.text = rowData.product_expiryDate !== undefined ? scopeObj.getLocaleDate(rowData.product_expiryDate.substr(0, 10)) : "N/A";
                scopeObj.view.ProductCardRow3.lblData3.text = rowData.product_currentBalance !== undefined ? rowData.product_rewardPointBalance : "N/A";
            }
        };
        this.view.backToProductListing.btnBack.onClick = function () {
            if (scopeObj.view.backToProductListing.btnBack.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Back_To_Cards")) {
                scopeObj.showProductCardScreen();
            } else {
                scopeObj.showProductInfoScreen();
            }
        };
      	this.view.backToProductListing.flxBack.onTouchStart = function(){
            if (scopeObj.view.backToProductListing.btnBack.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Back_To_Cards")) {
                scopeObj.showProductCardScreen();
            } else {
                scopeObj.showProductInfoScreen();
            }          
        };
        this.view.btnProductDetails.onClick = function () {
            scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
            scopeObj.setSkinForAccountTabs(scopeObj.view.btnProductDetails);
            scopeObj.showProductDetailsScreen();
            scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
        };
        this.view.btnTransactionHistory.onClick = function () {
            scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
            scopeObj.setSkinForAccountTabs(scopeObj.view.btnTransactionHistory);
            scopeObj.showProductTransactionHistory();
            scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
        };
        //sorting on accounts
        this.view.flxProductType.onClick = function () {
            scopeObj.resetAllSortImagesAccounts();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductListing, "lblProductType", scopeObj.view.fonticonSortProductType, scopeObj.view.flxOtherInfoWrapper, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL"), null, scopeObj);
        };
        this.view.flxProductName.onClick = function () {
            scopeObj.resetAllSortImagesAccounts();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductListing, "lblProductName", scopeObj.view.fonticonSortProductName, scopeObj.view.flxOtherInfoWrapper, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL"), null, scopeObj);
        };
        this.view.flxAccountNumber.onClick = function () {
            scopeObj.resetAllSortImagesAccounts();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductListing, "lblAccountNumber", scopeObj.view.fonticonSortAccountNumber, scopeObj.view.flxOtherInfoWrapper, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL"), null, scopeObj);
        };
        this.view.flxAccountOwner.onClick = function () {
            scopeObj.resetAllSortImagesAccounts();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductListing, "lblAccountOwner", scopeObj.view.fonticonSortAccountOwner, scopeObj.view.flxOtherInfoWrapper, "ALL", null, scopeObj);
        };
        //sorting on transactions
        this.view.flxTranasctionRefNo.onClick = function () {
            scopeObj.resetAllSortImagesTransactions();
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segTransactionHistory, "lblRefNo.info", scopeObj.view.fonticonSortTranasctionRefNo, "TOEND", scopeObj.recordsSize, toAdd, scopeObj);
        };
        this.view.flxTransactionDateAndTime.onClick = function () {
            scopeObj.resetAllSortImagesTransactions();
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segTransactionHistory, "lblDateAndTime", scopeObj.view.fonticonSortTransactionDateAndTime, "TOEND", scopeObj.recordsSize, toAdd, scopeObj);
        };
        this.view.flxTransactionType.onClick = function () {
            scopeObj.resetAllSortImagesTransactions();
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segTransactionHistory, "lblType", scopeObj.view.fonticonSortTransactionType, "TOEND", scopeObj.recordsSize, toAdd, scopeObj);
        };
        this.view.flxTransactionAmountOriginal.onClick = function () {
            scopeObj.resetAllSortImagesTransactions();
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segTransactionHistory, "lblAmountOriginal", scopeObj.view.fonticonSortTransactionAmountOriginal, "TOEND", scopeObj.recordsSize, toAdd, scopeObj);
        };
        this.view.flxTransactionAmountConverted.onClick = function () {
            scopeObj.resetAllSortImagesTransactions();
            var toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmount": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segTransactionHistory, "lblAmountConverted", scopeObj.view.fonticonSortTransactionAmountConverted, "TOEND", scopeObj.recordsSize, toAdd, scopeObj);
        };
        this.view.btnProductsAccounts.onClick = function () {
            scopeObj.resetAllSortImagesAccounts();
            scopeObj.view.searchBoxContracts.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.SearchByAccountFeature");
            scopeObj.isAccountsTab = true;
            
            kony.adminConsole.utils.showProgressBar(scopeObj.view);
            scopeObj.view.forceLayout();
            var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
            scopeObj.presenter.getCustomerAccounts({
                "userId": scopeObj.presenter.getCurrentCustomerDetails().userId || scopeObj.presenter.getCurrentCustomerDetails().Customer_id,
                "legalEntityId": legalEntityId || "",
            });
            // scopeObj.presentUserInterface('frmCustomerProfileAccounts', { "CustomerBasicInfo": this.CustomerBasicInfo });
        };
        this.view.btnProductsCards.onClick = function () {
            scopeObj.setSkinForProductTabs(scopeObj.view.btnProductsCards);
            scopeObj.isAccountsTab = false;
            scopeObj.view.searchBoxContracts.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmCustomerProfileFeaturesActions.SearchByCardFeature");
            scopeObj.view.flxProductsAccounts.setVisibility(false);
            scopeObj.view.flxProductsCards.setVisibility(true);
            scopeObj.presenter.getCardsInformation({ "customerUsername": scopeObj.presenter.getCurrentCustomerDetails().Username });
        };
        //Cards
        this.view.cardContextualMenu.btnLink1.onClick = function () {
            scopeObj.notificationTabOnClick();
        };
        this.view.cardContextualMenu.btnLink2.onClick = function () {
            scopeObj.requestTabOnClick();
        };

        this.view.cardContextualMenu.flxOption1.onClick = function () {
            scopeObj.view.flxPopUpConfirmation.setVisibility(true);
            scopeObj.view.popUpConfirmation.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mark_as_lost_stolen");
            scopeObj.view.popUpConfirmation.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MARK_AS_LOST_MSG1") + "" + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MARK_AS_LOST_MSG2");
            //"Are you sure you want to mark the selected card as Lost / Stolen?<BR><Br>This action cannot be reversed and the user will be required to request for a new card. Are you sure you want to mark this card as lost or stolen?"

            scopeObj.view.popUpConfirmation.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.YES_MARK_AS_LOST");//"YES, MARK AS LOST";
            //
            scopeObj.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_CancelMsg");

            scopeObj.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
                scopeObj.view.flxPopUpConfirmation.setVisibility(false);
                scopeObj.presenter.updateCardStatus({
                    "customerUsername": scopeObj.presenter.getCurrentCustomerDetails().Username,//"konyolbuser",
                    "cardNumber": scopeObj.cardNumber, //Mandatory
                    "cardAction": "LOST_STOLEN_CARD",//LOCK_CARD||UNLOCK_CARD||||ACTIVATE_CARD||DEACTIVATE_CARD
                    "actionReason": ""//Optional
                });
            };

        };
        this.view.cardContextualMenu.flxOption2.onClick = function () {
            if (scopeObj.view.cardContextualMenu.lblOption2.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Lock")) {
                scopeObj.view.popUpConfirmation.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Lock_Card");//"Lock Card";
                scopeObj.view.popUpConfirmation.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Lock_Card_MSG1") + "" + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Lock_Card_MSG2");
                //  "Are you sure you want to lock the selected card? <BR><BR>The user will not be able to use this card till unlocked. Are you sure you want to temporarily lock this card?";

                scopeObj.view.popUpConfirmation.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.YES_LOCK");//"YES, LOCK";//
                scopeObj.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_CancelMsg");

                scopeObj.view.flxPopUpConfirmation.setVisibility(true);

                scopeObj.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
                    scopeObj.view.flxPopUpConfirmation.setVisibility(false);

                    scopeObj.presenter.updateCardStatus({
                        "customerUsername": scopeObj.presenter.getCurrentCustomerDetails().Username,//"konyolbuser",
                        "cardNumber": scopeObj.cardNumber, //Mandatory
                        "cardAction": "LOCK_CARD",//LOCK_CARD||UNLOCK_CARD||||ACTIVATE_CARD||DEACTIVATE_CARD
                        "actionReason": ""//Optional
                    });
                };
            } else if (scopeObj.view.cardContextualMenu.lblOption2.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Unlock")) {
                scopeObj.view.popUpConfirmation.lblPopUpMainMessage.text = "Unlock Card";
                scopeObj.view.popUpConfirmation.rtxPopUpDisclaimer.text = "Are you sure you want to unlock the selected card?";
                scopeObj.view.popUpConfirmation.btnPopUpDelete.text = "YES";
                scopeObj.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");

                scopeObj.view.flxPopUpConfirmation.setVisibility(true);
                scopeObj.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
                    scopeObj.view.flxPopUpConfirmation.setVisibility(false);
                    scopeObj.presenter.updateCardStatus({
                        "customerUsername": scopeObj.presenter.getCurrentCustomerDetails().Username,
                        "cardNumber": scopeObj.cardNumber, //Mandatory
                        "cardAction": "ACTIVATE_CARD",//LOCK_CARD||UNLOCK_CARD||||ACTIVATE_CARD||DEACTIVATE_CARD
                        "actionReason": ""//Optional
                    });

                }
            };

        };
        this.view.transactionHistorySearch.flxDownload.onClick = function () {
            scopeObj.downloadTransactionsAsCSV();
        };
        this.view.flxCardType.onClick = function () {
            scopeObj.resetAllSortImagesCards();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductCardListing, "lblCardType", scopeObj.view.fontIconSortCardType, "NONE", "ALL", null, scopeObj);
        };
        this.view.flxCardName.onClick = function () {
            scopeObj.resetAllSortImagesCards();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductCardListing, "lblCardName", scopeObj.view.fontIconSortCardName, "NONE", "ALL", null, scopeObj);
        };
        this.view.flxCardNumber.onClick = function () {
            scopeObj.resetAllSortImagesCards();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductCardListing, "lblCardNumber", scopeObj.view.fontIconSortCardNumber, "NONE", "ALL", null, scopeObj);
        };
        this.view.flxCardHolder.onClick = function () {
            scopeObj.resetAllSortImagesCards();
            scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segProductCardListing, "lblCardHolder", scopeObj.view.fontIconSortCardHolder, "NONE", "ALL", null, scopeObj);
        };
        this.view.flxImgRbPaper.onClick = function () {
            if (scopeObj.view.imgRbPaper.src === scopeObj.AdminConsoleCommonUtils.radioNotSelected) {
                var confirmAction = function () {
                    scopeObj.view.flxSubscriptionsEmail.setVisibility(false);
                    scopeObj.view.imgRbEstatement.src = scopeObj.AdminConsoleCommonUtils.radioNotSelected;
                    scopeObj.view.imgRbPaper.src = scopeObj.AdminConsoleCommonUtils.radioSelected;
                    scopeObj.updateEstatementStatus(false);
                };
                var cancelAction = function () {
                    scopeObj.view.imgRbEstatement.src = scopeObj.AdminConsoleCommonUtils.radioSelected;
                    scopeObj.view.imgRbPaper.src = scopeObj.AdminConsoleCommonUtils.radioNotSelected;
                };
                scopeObj.AdminConsoleCommonUtils.openConfirm({
                    header: "Enable paper statement",
                    message: "Are you sure to enable paper statement?<br><br>Once paper statement service is enabled, the customer will stop receiving e-Statements for the selected accounts.",
                    confirmAction: confirmAction,
                    cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
                    cancelAction: cancelAction,
                    confirmMsg: 'YES, ENABLE'
                }, scopeObj);
            }
        };
        this.view.flxImgRbEstatement.onClick = function () {
            if (scopeObj.view.imgRbEstatement.src === scopeObj.AdminConsoleCommonUtils.radioNotSelected) {
                var email = [];
                for (var i = 0; i < scopeObj.presenter.getCurrentCustomerEmailInformation().emails.length; ++i) {
                    if (scopeObj.presenter.getCurrentCustomerEmailInformation().emails[i] === scopeObj.presenter.getCurrentCustomerEmailInformation().primaryEmail) {
                        var selectedEmail = scopeObj.presenter.getCurrentCustomerEmailInformation().primaryEmail + " (Primary email)";;
                        email.push([selectedEmail, selectedEmail]);
                    }
                    else {
                        email.push([scopeObj.presenter.getCurrentCustomerEmailInformation().emails[i], scopeObj.presenter.getCurrentCustomerEmailInformation().emails[i]]);
                    }
                }
                scopeObj.view.lbxEstatementEmail.masterData = email;
                scopeObj.view.lbxEstatementEmail.selectedKey = scopeObj.presenter.getCurrentCustomerEmailInformation().primaryEmail + " (Primary email)";
                scopeObj.view.flxEnableEstatement.setVisibility(true);
                scopeObj.view.forceLayout();
            }
        };
        this.view.flxSubcriptionContainer.onTouchStart = function () {
            var email = [];
            for (var i = 0; i < scopeObj.presenter.getCurrentCustomerEmailInformation().emails.length; ++i) {
                if (scopeObj.presenter.getCurrentCustomerEmailInformation().emails[i] === scopeObj.presenter.getCurrentCustomerEmailInformation().primaryEmail) {
                    var selectedEmail = scopeObj.presenter.getCurrentCustomerEmailInformation().primaryEmail + " (Primary email)";;
                    email.push([selectedEmail, selectedEmail]);
                }
                else {
                    email.push([scopeObj.presenter.getCurrentCustomerEmailInformation().emails[i], scopeObj.presenter.getCurrentCustomerEmailInformation().emails[i]]);
                }
            }
            scopeObj.view.lbxEstatementEmail.masterData = email;
            if (scopeObj.presenter.getCurrentCustomerEmailInformation().primaryEmail === scopeObj.view.lblSubscriptionsEmail.text) {
                scopeObj.view.lbxEstatementEmail.selectedKey = scopeObj.view.lblSubscriptionsEmail.text + " (Primary email)";
            }
            else {
                scopeObj.view.lbxEstatementEmail.selectedKey = scopeObj.view.lblSubscriptionsEmail.text;
            }
            scopeObj.view.lbxEstatementEmail.setVisibility(true);
            scopeObj.view.flxEnableEstatement.setVisibility(true);
            scopeObj.view.flxSubcriptionContainer.info.clicked = true;
        };
        // e-Statement
        this.view.flxEstatementClose.onClick = function () {
            scopeObj.view.flxEnableEstatement.setVisibility(false);
            if (scopeObj.view.flxSubcriptionContainer.info.clicked === true) {
                scopeObj.view.flxSubcriptionContainer.info.clicked = false;
            }
        };
        this.view.btnEstatementLeave.onClick = function () {
            scopeObj.view.flxEnableEstatement.setVisibility(false);
            if (scopeObj.view.flxSubcriptionContainer.info.clicked === true) {
                scopeObj.view.flxSubcriptionContainer.info.clicked = false;
            }
            else {
                scopeObj.view.imgRbPaper.src = scopeObj.AdminConsoleCommonUtils.radioSelected;
                scopeObj.view.imgRbEstatement.src = scopeObj.AdminConsoleCommonUtils.radioNotSelected;
            }
        };
        this.view.btnEstatementEnable.onClick = function () {
            scopeObj.view.flxSubcriptionContainer.info.clicked = false;
            scopeObj.view.flxEnableEstatement.setVisibility(false);
            var eStatementEmail = scopeObj.view.lbxEstatementEmail.selectedKeyValue[1];
            if (eStatementEmail.indexOf(" (Primary email)") != -1) {
                eStatementEmail = eStatementEmail.substring(0, eStatementEmail.indexOf(" (Primary email)"));
                scopeObj.view.lblSubscriptionsEmail.text = eStatementEmail;
            }
            else {
                scopeObj.view.lblSubscriptionsEmail.text = scopeObj.view.lbxEstatementEmail.selectedKeyValue[1];
            }
            scopeObj.view.flxSubscriptionsEmail.setVisibility(true);
            scopeObj.view.imgRbPaper.src = scopeObj.AdminConsoleCommonUtils.radioNotSelected;
            scopeObj.view.imgRbEstatement.src = scopeObj.AdminConsoleCommonUtils.radioSelected;
            scopeObj.view.forceLayout();

            scopeObj.updateEstatementStatus(true);
        };
    this.view.toggleButtons.btnToggleLeft.onClick = function(){
      scopeObj.inBusinessToggle=false;
      if(scopeObj.view.flxProductsAccounts.isVisible){
        scopeObj.setDataForProductsSegment(scopeObj.customerAccounts);
        scopeObj.setAccountsFilterData();
        scopeObj.showProductInfoScreen();
      }
      else{ 
        scopeObj.setDataToCardMangSegment();
        scopeObj.setCardsFilterData();
        scopeObj.showProductCardScreen();
      }
      scopeObj.view.flxSeperatorAccountsBB.setVisibility(false);
      scopeObj.view.flxToggleButtonsContainer.height="30px";
      scopeObj.view.flxProductsAccounts.top="90px";
      
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],1);
    };
    this.view.toggleButtons.btnToggleRight.onClick = function(){
      scopeObj.inBusinessToggle=true;
      if(scopeObj.view.flxProductsAccounts.isVisible){
        scopeObj.setDataForProducts(scopeObj.customerAccounts);
        // scopeObj.setDataForProductsSegment(scopeObj.customerAccounts);
        scopeObj.setAccountsFilterData();
        scopeObj.showProductInfoScreen();
        scopeObj.view.flxToggleButtonsContainer.height="46px";
        scopeObj.view.flxProductsAccounts.top="111px";
        scopeObj.view.flxSeperatorAccountsBB.setVisibility(true);
      }
      else {
        scopeObj.setDataToCardMangSegment();
        scopeObj.setCardsFilterData();
        scopeObj.showProductCardScreen();
        scopeObj.view.flxToggleButtonsContainer.height="30px";
        scopeObj.view.flxSeperatorAccountsBB.setVisibility(false);
      }
      
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],2);
    };
      this.view.fontIconFilterStatus.onTouchStart = function(){
        if(!scopeObj.view.flxAccountStatusFilter.isVisible){
          var flxRight = scopeObj.view.flxProductListingHeader.frame.width - scopeObj.view.flxAccountStatus.frame.x - scopeObj.view.flxAccountStatus.frame.width;
          var iconRight = scopeObj.view.flxAccountStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
          scopeObj.view.flxAccountStatusFilter.right = (flxRight + iconRight - 10) +"px";
          scopeObj.view.flxAccountStatusFilter.setVisibility(true);
        }else
          scopeObj.view.flxAccountStatusFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.fontIconFilterCardStatus.onTouchStart = function(){
        if(!scopeObj.view.flxCardsStatusFilter.isVisible){
          var flxRight = scopeObj.view.flxProductCardsHeader.frame.width - scopeObj.view.flxStatus.frame.x - scopeObj.view.flxStatus.frame.width;
          var iconRight = scopeObj.view.flxStatus.frame.width - scopeObj.view.fontIconFilterCardStatus.frame.x;
          scopeObj.view.flxCardsStatusFilter.right = (flxRight + iconRight - 30) +"px";
          scopeObj.view.flxCardsStatusFilter.setVisibility(true);
        }else
          scopeObj.view.flxCardsStatusFilter.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.accountStatusMenu.segStatusFilterDropdown.onRowClick = function(){
        var data=scopeObj.filterAccountsData();
        scopeObj.setDataForProductsSegment(data);
      };
      this.view.cardStatusMenu.segStatusFilterDropdown.onRowClick = function(){
        var data=scopeObj.filterCardsData();
        scopeObj.setDataToCardMangSegment(data);
      };
      this.view.flxAccountStatusFilter.onHover = this.onDropDownsHoverCallback;
      this.view.flxCardsStatusFilter.onHover = this.onDropDownsHoverCallback;
      this.view.btnAccountsBusinessEdit.onClick = function(){
        scopeObj.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
      };
      this.view.DataFields.flxPopUpClose.onClick = function () {
        scopeObj.view.flxViewProductPopUp.setVisibility(false);
      };
    },

    setDataForProductDetailsScreen: function (CustomerAccounts) {
        var scopeObj = this;
        var customerDetails = CustomerAccounts[0];

        var status = customerDetails.statusDesc || kony.i18n.getLocalizedString("i18n.frmCustomers.NA");
        //set data
        this.view.backToProductListing.btnBack.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ACCOUNTS_BTN_BACK");
        this.view.productHeader.lblProductCardName.text = customerDetails.accountName;
        this.view.productHeader.lblCardStatus.text = status;

        var StatusImg;
        //TODO: all images for status
        if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.secureimage.Active").toUpperCase()) {
            StatusImg = "sknFontIconActivate";
        } else if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomers.Suspended").toUpperCase()) {
            StatusImg = "sknFontIconSuspend";
        } else if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomers.Closed").toUpperCase()) {
            StatusImg = "sknfontIconInactive";
        } else if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomers.NA").toUpperCase()) {
            StatusImg = "sknfontIconInactive";
        }

        this.view.productHeader.fontIconCardStatus.skin = StatusImg;
        if (customerDetails.IBAN) {
            this.view.productHeader.lblIBAN.isVisible = true;
            this.view.productHeader.lblIBANLabel.isVisible = true;
            this.view.productHeader.lblIBAN.text = customerDetails.IBAN;
            this.view.productHeader.lblIBAN.width = (8.75 * (customerDetails.IBAN).length) + "px";
            this.view.productHeader.lblIBAN.right = "0px";
            this.view.productHeader.lblIBANLabel.right = ((8.75 * (customerDetails.IBAN).length)) + "px";
        }
        else {
            this.view.productHeader.lblIBAN.isVisible = false;
            this.view.productHeader.lblIBANLabel.isVisible = false;
        }
        if (customerDetails.accountID) {
            this.view.productHeader.blAccountNumber.isVisible = true;
            this.view.productHeader.lblAccountNumberLabel.isVisible = true;
            var cardOrAccountNumber = customerDetails.accountID;
            this.view.productHeader.blAccountNumber.text = cardOrAccountNumber;
            this.view.productHeader.blAccountNumber.width = (8.75 * cardOrAccountNumber.length) + "px";
            if (customerDetails.IBAN) {
                var accountNumberRight = (8.75 * (customerDetails.IBAN).length) + 50;
                this.view.productHeader.blAccountNumber.right = accountNumberRight + "px";
                this.view.productHeader.lblAccountNumberLabel.right = (accountNumberRight + (8.75 * cardOrAccountNumber.length)) + "px";
            }
            else {
                this.view.productHeader.blAccountNumber.right = "0px";
                this.view.productHeader.lblAccountNumberLabel.right = ((8.75 * cardOrAccountNumber.length)) + "px";
            }
        } else {
            this.view.productHeader.blAccountNumber.isVisible = false;
            this.view.productHeader.lblAccountNumberLabel.isVisible = false;
        }

        //row1
        this.view.ProductRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CREATED_ON");
        this.view.ProductRow1.lblData1.text = customerDetails.openingDate ? scopeObj.getLocaleDate(customerDetails.openingDate) : "N/A";

        this.view.ProductRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CURRENT_BALANCE");
        this.view.ProductRow1.lblSignData2.text = customerDetails.currentBalance&&customerDetails.currentBalance.substring(0, 1) === "-" ? "-" : "";
        this.view.ProductRow1.lblSignData2.left = this.view.ProductRow1.lblSignData2.text===""?"-7px":"0px";
        this.view.ProductRow1.lblIconData2.text = this.defaultCurrencyCode(customerDetails.currencyCode) ? this.defaultCurrencyCode(customerDetails.currencyCode) :
            this.defaultCurrencyCode("USD");
        this.view.ProductRow1.lblData2.text = customerDetails.currentBalance?this.formatCurrencyByDeletingSign(this.getCurrencyFormat(customerDetails.currentBalance)):"N/A";

        this.view.ProductRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DIVIDEND_RATE");
        this.view.ProductRow1.lblIconData3.text = this.defaultCurrencyCode(customerDetails.currencyCode) ? this.defaultCurrencyCode(customerDetails.currencyCode) :
        this.defaultCurrencyCode("USD");
        this.view.ProductRow1.lblIconData3.setVisibility(true);
        this.view.ProductRow1.lblData3.text = customerDetails.dividendRate ? customerDetails.dividendRate : "N/A";

        //row 2
        this.view.ProductRow2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.OWNERSHIP");
        this.view.ProductRow2.lblData1.text = customerDetails.jointHolders ? kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.JOINT") : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SINGLE");

        this.view.ProductRow2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.AVAILABLE_BALANCE");
        this.view.ProductRow2.lblSignData2.text = customerDetails.availableBalance && customerDetails.availableBalance.substring(0, 1) === "-" ? "-" : "";
        this.view.ProductRow2.lblSignData2.left = this.view.ProductRow2.lblSignData2.text===""?"-7px":"0px";
        this.view.ProductRow2.lblIconData2.text = this.defaultCurrencyCode(customerDetails.currencyCode) ? this.defaultCurrencyCode(customerDetails.currencyCode) :
            this.defaultCurrencyCode("USD");
        this.view.ProductRow2.lblData2.text = customerDetails.availableBalance?this.formatCurrencyByDeletingSign(this.getCurrencyFormat(customerDetails.availableBalance)):"N/A";

        this.view.ProductRow2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DIVIDEND_PAID_(YTD)");
        this.view.ProductRow2.lblIconData3.text = this.defaultCurrencyCode(customerDetails.currencyCode) ? this.defaultCurrencyCode(customerDetails.currencyCode) :
        this.defaultCurrencyCode("USD");
        this.view.ProductRow2.lblIconData3.setVisibility(true);
        this.view.ProductRow2.lblData3.text = customerDetails.dividendPaidYTD ? customerDetails.dividendPaidYTD : "N/A";

        //row 3
        this.view.ProductRow3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.JOINT_HOLDER_NAME");

        //Parse account holder object
        var accountHolder = customerDetails.accountHolder;
        if (accountHolder === null || accountHolder === undefined) {
            accountHolder = "N/A"
        } else if (typeof accountHolder === 'string') {
            try {
                accountHolder = JSON.parse(accountHolder);
            } catch (e) {
                accountHolder = "N/A";
                kony.print("Account Holder is not a valid json object " + e);
            }
        }

        var currentUsername = this.presenter.getCurrentCustomerDetails().Username;
        //Set data for account holder label
        this.view.ProductRow3.btnData11.setVisibility(false);
        this.view.ProductRow3.lblData11.setVisibility(false);

        if (accountHolder !== "N/A") {
            if (currentUsername !== accountHolder.username) {
                this.view.ProductRow3.lblData11.setVisibility(false);
                this.view.ProductRow3.btnData11.setVisibility(true);
                this.view.ProductRow3.btnData11.text = accountHolder.fullname + " (Primary)";
                this.view.ProductRow3.btnData11.onClick = function () {
                    scopeObj.navigateToCustomerInfoPage(accountHolder.username);
                };
            } else {
                this.view.ProductRow3.lblData11.setVisibility(true);
                this.view.ProductRow3.btnData11.setVisibility(false);
                this.view.ProductRow3.lblData11.text = this.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.info.FirstName + " " +
                    this.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.info.LastName + " (Primary)";
            }
        } else {
            this.view.ProductRow3.lblData11.setVisibility(true);
            this.view.ProductRow3.lblData11.text = accountHolder;
        }

        var jointHolders = customerDetails.jointHolders;
        if (jointHolders === null || jointHolders === undefined) {
            jointHolders = "N/A";
        } else if (typeof jointHolders === 'string') {
            try {
                jointHolders = JSON.parse(jointHolders);
            } catch (e) {
                jointHolders = "N/A";
                kony.print("Joint Holders is not a valid json Array " + e);
            }
        }
        //Set data for joint holders label
        if (jointHolders !== "N/A") {

            this.view.ProductRow3.lblData21.setVisibility(false);
            this.view.ProductRow3.btnData21.setVisibility(false);
            this.view.ProductRow3.lblComma1.setVisibility(false);
            this.view.ProductRow3.btnData22.setVisibility(false);
            this.view.ProductRow3.lblComma2.setVisibility(false);
            this.view.ProductRow3.btnData23.setVisibility(false);

            var islblData21Set = false, isbtnData21Set = false, isbtnData22Set = false, isbtnData23Set = false;
            jointHolders = jointHolders.filter(function (item) { return item.username !== accountHolder.username });
            jointHolders.forEach(function (jointHolder) {
                var self = scopeObj;
                if (currentUsername === jointHolder.username) {
                    scopeObj.view.ProductRow3.lblData21.setVisibility(true);
                    scopeObj.view.ProductRow3.btnData21.setVisibility(false);
                    scopeObj.view.ProductRow3.lblData21.text = scopeObj.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.info.FirstName + " " +
                        scopeObj.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.info.LastName;
                    islblData21Set = true;
                    isbtnData21Set = false;
                } else {
                    if (!isbtnData22Set) {
                        scopeObj.view.ProductRow3.btnData22.setVisibility(true);
                        scopeObj.view.ProductRow3.btnData22.text = jointHolder.fullname;
                        isbtnData22Set = true;
                        scopeObj.view.ProductRow3.btnData22.onClick = function () {
                            self.navigateToCustomerInfoPage(jointHolder.username);
                        };
                    } else if (!isbtnData23Set) {
                        scopeObj.view.ProductRow3.btnData23.setVisibility(true);
                        scopeObj.view.ProductRow3.btnData23.text = jointHolder.fullname.substring(0, 7) + "...";
                        scopeObj.view.ProductRow3.btnData23.toolTip = jointHolder.fullname;
                        isbtnData23Set = true;
                        scopeObj.view.ProductRow3.btnData23.onClick = function () {
                            self.navigateToCustomerInfoPage(jointHolder.username);
                        };
                    } else if (!isbtnData21Set && !islblData21Set) {
                        scopeObj.view.ProductRow3.btnData21.setVisibility(true);
                        scopeObj.view.ProductRow3.btnData21.text = jointHolder.fullname;
                        isbtnData21Set = true;
                        scopeObj.view.ProductRow3.btnData21.onClick = function () {
                            self.navigateToCustomerInfoPage(jointHolder.username);
                        };
                    }
                }
            });

            if (isbtnData22Set && (islblData21Set || isbtnData21Set)) {
                this.view.ProductRow3.lblComma1.setVisibility(true);
            }
            if (isbtnData23Set && isbtnData22Set) {
                this.view.ProductRow3.lblComma2.setVisibility(true);
            }
        } else {

            this.view.ProductRow3.btnData21.setVisibility(false);
            this.view.ProductRow3.lblComma1.setVisibility(false);
            this.view.ProductRow3.btnData22.setVisibility(false);
            this.view.ProductRow3.lblComma2.setVisibility(false);
            this.view.ProductRow3.btnData23.setVisibility(false);
            this.view.ProductRow3.lblData21.setVisibility(false);
        }

        this.view.ProductRow3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ROUTING_NUMBER");
        this.view.ProductRow3.lblData2.text = customerDetails.routingNumber ? customerDetails.routingNumber : "N/A";

        this.view.ProductRow3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LAST_DIVIDEND_PAID");
        this.view.ProductRow3.lblIconData3.text = this.defaultCurrencyCode(customerDetails.currencyCode) ? this.defaultCurrencyCode(customerDetails.currencyCode) :
        this.defaultCurrencyCode("USD");
        this.view.ProductRow3.lblIconData3.setVisibility(true);
        this.view.ProductRow3.lblData3.text = customerDetails.lastDividendPaidAmount ? customerDetails.lastDividendPaidAmount : "N/A";

        //row 4
        this.view.ProductRow4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LAST_UPDATE_ON");
        this.view.ProductRow4.lblData1.text = customerDetails.lastPaymentDate ? this.getDateInstanceFromDBDateTime(customerDetails.lastPaymentDate) : "N/A";

        this.view.ProductRow4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SWIFT_CODE");
        this.view.ProductRow4.lblData2.text = customerDetails.swiftCode === undefined ? "N/A" : customerDetails.swiftCode;

        this.view.ProductRow4.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LAST_DIVIDEND_PAID_ON");
        this.view.ProductRow4.lblData3.text = customerDetails.dividendLastPaidDate ? scopeObj.getLocaleDate(customerDetails.dividendLastPaidDate) : "N/A";

        //row 5
        this.view.ProductRow5.setVisibility(false);

        var eStatementStatus = customerDetails.eStatementEnable;

        if (eStatementStatus === "true") {
            this.view.imgRbEstatement.src = this.AdminConsoleCommonUtils.radioSelected;
            this.view.imgRbPaper.src = this.AdminConsoleCommonUtils.radioNotSelected;
            this.view.lblSubscriptionsEmail.text = customerDetails.eStatementEmail || "N/A";
            this.view.lblData1.text= customerDetails.LastUpdated ? this.getLocaleDateAndTime(this.getDateInstanceFromDBDateTime(customerDetails.LastUpdated)): "N/A";
            this.view.lblData2.text= customerDetails.UpdatedBy ? customerDetails.UpdatedBy: "N/A";
            this.view.flxUpdatedBy.setVisibility(true);
            this.view.flxUpdatedOn.setVisibility(true);
            this.view.flxSubscriptionsEmail.setVisibility(true);
            this.view.forceLayout();
        }
        else {
            this.view.imgRbEstatement.src = this.AdminConsoleCommonUtils.radioNotSelected;
            this.view.flxUpdatedBy.setVisibility(false);
            this.view.flxUpdatedOn.setVisibility(false);
            this.view.imgRbPaper.src = this.AdminConsoleCommonUtils.radioSelected;
            this.view.flxSubscriptionsEmail.setVisibility(false);
        }

        //Check for access control
        if(this.presenter.getCurrentCustomerDetails().isCustomerAccessiable === false){
            this.view.ProductRow1.lblIconData2.setVisibility(false);
            this.view.ProductRow2.lblIconData2.setVisibility(false);
        }else{
            this.view.ProductRow1.lblIconData2.setVisibility(true);
            this.view.ProductRow2.lblIconData2.setVisibility(true);
        }
    },
    resetAllSortImagesTransactions: function () {
        if (this.view.fonticonSortTranasctionRefNo.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortTranasctionRefNo.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortTranasctionRefNo.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortTransactionDateAndTime.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortTransactionDateAndTime.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortTransactionDateAndTime.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortTransactionType.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortTransactionType.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortTransactionType.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortTransactionAmountOriginal.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortTransactionAmountOriginal.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortTransactionAmountOriginal.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortTransactionAmountConverted.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortTransactionAmountConverted.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortTransactionAmountConverted.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
    },
    resetAllSortImagesAccounts: function () {
        if (this.view.fonticonSortProductType.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortProductType.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortProductType.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortProductName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortProductName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortProductName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortAccountNumber.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortAccountNumber.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortAccountNumber.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortAmount.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortAmount.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortAmount.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fonticonSortAccountOwner.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fonticonSortAccountOwner.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fonticonSortAccountOwner.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
    },
    setSkinForProductTabs: function (btnWidget) {
        this.view.btnProductsCards.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
        this.view.btnProductsAccounts.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
        btnWidget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
    },
    setDataForProductsSegment: function (CustomerAccounts) {
        var scopeObj = this;
        var dataMap = {
            "flxCustMangProduct": "flxCustMangProduct",
            "flxCustMangProductInfo": "flxCustMangProductInfo",
            "flxProductType": "flxProductType",
            "flxStatus": "flxStatus",
            "fontIconStatus": "fontIconStatus",
            "lblAccountNumber": "lblAccountNumber",
            "lblProductName": "lblProductName",
            "lblProductType": "lblProductType",
            "flxAccountOwner": "flxAccountOwner",
            "btnAccountOwner": "btnAccountOwner",
            "lblAccountOwner": "lblAccountOwner",
            "lblSeperator": "lblSeperator",
            "lblStatus": "lblStatus",
            "eStatementStatus": "eStatementStatus",
            "eStatementEmail": "eStatementEmail"
        };
        var data = [];
        var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
          (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
        : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
      //for combined user  
      if ((customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
                    customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0)){
        var businessUserAccounts=[];
        var retailUserAccounts=[];
        for(var s=0;s<CustomerAccounts.length;s++){
          if(CustomerAccounts[s].isBusinessAccount==="true")
            businessUserAccounts.push(CustomerAccounts[s]);
          else retailUserAccounts.push(CustomerAccounts[s]);
        }
        CustomerAccounts=this.inBusinessToggle===true?businessUserAccounts:retailUserAccounts;
        }
        
        var toAdd;
        if (CustomerAccounts.length > 0) {
            for (var i = 0; i < CustomerAccounts.length; i++) {
                var status = CustomerAccounts[i].statusDesc ? (CustomerAccounts[i].statusDesc.charAt(0).toUpperCase() + CustomerAccounts[i].statusDesc.slice(1).toLowerCase())
                    : kony.i18n.getLocalizedString("i18n.frmCustomers.NA");
                var StatusImg, statusSkin;
                if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.secureimage.Active").toUpperCase()) {
                    StatusImg = "sknFontIconActivate";
                    statusSkin = "sknlblLato5bc06cBold14px";
                } else if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomers.Suspended").toUpperCase()) {
                    StatusImg = "sknFontIconSuspend";
                    statusSkin = "sknlblLatoeab55d12px";
                } else if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomers.Closed").toUpperCase()) {
                    StatusImg = "sknfontIconInactive";
                    statusSkin = "sknlblCustMngLocked";
                } else if (status.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomers.NA").toUpperCase()) {
                    StatusImg = "sknfontIconInactive";
                    statusSkin = "sknlblCustMngLocked"
                }

                var accountHolder = CustomerAccounts[i].accountHolder;
                if (accountHolder === null || accountHolder === undefined) {
                    accountHolder = "N/A";
                } else if (typeof accountHolder === 'string') {
                    try {
                        accountHolder = JSON.parse(accountHolder);
                    } catch (e) {
                        accountHolder = "N/A";
                        kony.print("Account Holder is not a valid json object " + e);
                    }
                }

                //Set data for account holder label
                var currentUsername = this.presenter.getCurrentCustomerDetails().Username, displayUsername, isbtnAccountOwner = false, islblAccountOwner = false;
                if (accountHolder !== "N/A") {

                    if (currentUsername !== accountHolder.username) {
                        displayUsername = accountHolder.fullname;
                        isbtnAccountOwner = true;
                        islblAccountOwner = false;
                    } else {
                        displayUsername = this.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.info.FirstName + " " +
                            this.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.info.LastName
                        isbtnAccountOwner = false;
                        islblAccountOwner = true;
                    }
                } else {
                    displayUsername = "N/A";
                    isbtnAccountOwner = false;
                    islblAccountOwner = true;
                }
                toAdd = {
                    "flxCustMangProduct": "flxCustMangProduct",
                    "flxCustMangProductInfo": "flxCustMangProductInfo",
                    "flxProductType": "flxProductType",
                    "flxStatus": "flxStatus",
                    "fontIconStatus": {
                        "skin": StatusImg
                    },
                    "lblAccountNumber": CustomerAccounts[i].accountID ? CustomerAccounts[i].accountID : "N/A",
                    "lblProductName": CustomerAccounts[i].accountName ? CustomerAccounts[i].accountName : "N/A",
                    "lblProductType": CustomerAccounts[i].accountType ? CustomerAccounts[i].accountType : "N/A",
                    "lblSeperator": ".",
                    "btnAccountOwner": {
                        "isVisible": isbtnAccountOwner,
                        "text": displayUsername,
                        "info": accountHolder,
                        "onClick": function (widget) {
                            scopeObj.navigateToCustomerInfoPage(widget.info.username);
                        }
                    },
                    "lblAccountOwner": {
                        "isVisible": islblAccountOwner,
                        "text": displayUsername
                    },
                    "lblStatus": {
                        "text": status,
                        "skin": statusSkin
                    },
                    "eStatementStatus": CustomerAccounts[i].eStatementEnable,
                    "eStatementEmail": CustomerAccounts[i].eStatementEmail,
                    "template": "flxCustMangProductInfo",
                  	"info": {
                      "lastUpdatedOn":CustomerAccounts[i].LastUpdated,
                      "updatedBy":CustomerAccounts[i].UpdatedBy
                    }
                };
                data.push(toAdd);
            }
            this.view.segProductListing.widgetDataMap = dataMap;

            this.view.segProductListing.setData(data);
            this.view.rtxMsgProducts.setVisibility(false);
            this.view.flxProductListingHeader.setVisibility(true);
            this.view.lblHeaderSeperator.setVisibility(true);
            this.view.segProductListing.setVisibility(true);
            this.view.segProductListing.info = {
                "data": data,
                "searchAndSortData": data
            };
        } else {
            var customerType = this.presenter.getCurrentCustomerDetails().CustomerType_id;
            if(customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
              this.view.rtxMsgProducts.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.No_accounts_business_user");
            } else{
              this.view.rtxMsgProducts.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NO_RECORDS_FOUND");
            }
            this.view.rtxMsgProducts.setVisibility(true);
            this.view.segProductListing.setVisibility(false);
        }
        this.view.flxAccountsEditBB.setVisibility(this.inBusinessToggle);
        this.view.flxSeperatorAccountsBB.setVisibility(this.inBusinessToggle);
        this.showProductInfoScreen();
    },
    navigateToCustomerInfoPage: function (customerUsername) {
        var scopeObj = this;

        var confirmAction = function () {
            scopeObj.view.flxGeneralInfoWrapper.row1.btnLink2.info = {
                "emailSentCtr": 0
            };
            scopeObj.view.flxGeneralInfoWrapper.alertMessage.setVisibility(false);
            if (!scopeObj.view.flxGeneralInfoWrapper.flxGmInfoDetailWrapper.isVisible) {
                scopeObj.view.flxGeneralInfoWrapper.toggleGeneralInfoTab();
            }

            scopeObj.presenter.getCustomerBasicInfo({ "Customer_username": customerUsername },"InfoScreen");
        };
        var cancelAction = function () { };

        this.AdminConsoleCommonUtils.openConfirm({
            header: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_Header") + ' "' + (customerUsername) + '"',
            message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_Body1") + '"' + (customerUsername) + '"' + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_Body2"),
            confirmAction: confirmAction,
            cancelMsg: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_CancelMsg"),
            cancelAction: cancelAction,
            confirmMsg: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Redirect_ConfirmMsg"),
        }, this);
    },
    setDataForProductTransactionSegment: function (target) {
        var dataMap = {
            "flxCustMangRequestHeader": "flxCustMangRequestHeader",
            "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
            "flxRecurrIcon": "flxRecurrIcon",
            "lblLimitsIcon": "lblLimitsIcon",
            "flxFirstColoum": "flxFirstColoum",
            "lblAmountOriginalSign": "lblAmountOriginalSign",
            "lblAmountOriginalSymbol": "lblAmountOriginalSymbol",
            "lblAmountOriginal": "lblAmountOriginal",
            "lblAmountConvertedSign": "lblAmountConvertedSign",
            "lblAmountConvertedSymbol": "lblAmountConvertedSymbol",
            "lblAmountConverted": "lblAmountConverted",
            "lblDateAndTime": "lblDateAndTime",
            "lblRefNo": "lblRefNo",
            "lblSeperator": "lblSeperator",
            "lblTransctionDescription": "lblTransctionDescription",
            "lblType": "lblType"
        };
        var toAdd;
        var data = [];
        if (target === this.successLabel || target === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PENDING")) {

            for (var i = 0; i < this.AccountTrasactions.length; i++) {
              var newDate2 = "N/A";
              if(this.AccountTrasactions[i].transactionDate){
                var dateTime2= this.AccountTrasactions[i].transactionDate.replace("T", " ").replace("Z", "");
                if(dateTime2.split(' ')[1])
                  newDate2 = this.getLocaleDateAndTime((this.getDateInstanceFromDBDateTime(dateTime2)));
                else
                  newDate2 = dateTime2;
              }
               if (this.AccountTrasactions[i].statusDescription && this.AccountTrasactions[i].statusDescription.toUpperCase() === target.toUpperCase() && newDate2!=="N/A") {
                    toAdd = {
                        "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                        "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                        "flxRecurrIcon": "flxRecurrIcon",
                        "lblLimitsIcon": { "text": "", "skin": "sknFontIconLimits13Px", "isVisible": this.AccountTrasactions[i].numberOfRecurrences&&(parseInt(this.AccountTrasactions[i].numberOfRecurrences) > 0) ? true : false },
                        "flxFirstColoum": "flxFirstColoum",
                        "lblAmountOriginalSign": this.AccountTrasactions[i].amount && this.AccountTrasactions[i].amount.substring(0, 1) === "-" ? "-" : "",
                        "lblAmountOriginalSymbol": this.AccountTrasactions[i].amount ? this.defaultCurrencyCode(this.AccountTrasactions[i].baseCurrency) : "",
                        "lblAmountOriginal": this.AccountTrasactions[i].amount ? this.formatCurrencyByDeletingSign(this.getCurrencyFormat(this.AccountTrasactions[i].amount)) : "-",
                        "lblAmountConvertedSign": this.AccountTrasactions[i].convertedAmount && this.AccountTrasactions[i].convertedAmount.substring(0, 1) === "-" ? "-" : "",
                        "lblAmountConvertedSymbol": this.AccountTrasactions[i].convertedAmount ? this.defaultCurrencyCode(this.AccountTrasactions[i].transactionCurrency) : "",
                        "lblAmountConverted": this.AccountTrasactions[i].convertedAmount ? this.formatCurrencyByDeletingSign(this.getCurrencyFormat(this.AccountTrasactions[i].convertedAmount)) : "-",
                        "lblDateAndTime": newDate2,
                        "lblRefNo": {"text":this.AdminConsoleCommonUtils.getTruncatedString(this.AccountTrasactions[i].transactionId, 8, 7),
                                     "info":this.AccountTrasactions[i].transactionId,"tooltip":this.AccountTrasactions[i].transactionId},
                        "lblSeperator": ".",
                        "lblTransctionDescription": this.AccountTrasactions[i].description,
                        "lblType": this.AccountTrasactions[i].transactiontype,
                        "template": "flxCustMangTransctionHistory"
                    };
                    data.push(toAdd);
                } else if (target === this.successLabel && newDate2!=="N/A") {
                    toAdd = {
                        "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                        "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                        "flxRecurrIcon": "flxRecurrIcon",
                        "lblLimitsIcon": { "text": "", "skin": "sknFontIconLimits13Px", "isVisible": this.AccountTrasactions[i].numberOfRecurrences && (parseInt(this.AccountTrasactions[i].numberOfRecurrences) > 0) ? true : false },
                        "flxFirstColoum": "flxFirstColoum",
                        "lblAmountOriginalSign": this.AccountTrasactions[i].amount && this.AccountTrasactions[i].amount.substring(0, 1) === "-" ? "-" : "",
                        "lblAmountOriginalSymbol": this.AccountTrasactions[i].amount ? this.defaultCurrencyCode(this.AccountTrasactions[i].baseCurrency) : "",
                        "lblAmountOriginal": this.AccountTrasactions[i].amount ? this.formatCurrencyByDeletingSign(this.getCurrencyFormat(this.AccountTrasactions[i].amount)) : "-",
                        "lblAmountConvertedSign": this.AccountTrasactions[i].convertedAmount && this.AccountTrasactions[i].convertedAmount.substring(0, 1) === "-" ? "-" : "",
                        "lblAmountConvertedSymbol": this.AccountTrasactions[i].convertedAmount ? this.defaultCurrencyCode(this.AccountTrasactions[i].transactionCurrency) : "",
                        "lblAmountConverted": this.AccountTrasactions[i].convertedAmount ? this.formatCurrencyByDeletingSign(this.getCurrencyFormat(this.AccountTrasactions[i].convertedAmount)) : "-",
                        "lblDateAndTime": newDate2,
                        "lblRefNo": {"text":this.AdminConsoleCommonUtils.getTruncatedString(this.AccountTrasactions[i].transactionId, 8, 7),
                                     "info":this.AccountTrasactions[i].transactionId,"tooltip":this.AccountTrasactions[i].transactionId},
                        "lblSeperator": ".",
                        "lblTransctionDescription": this.AccountTrasactions[i].description,
                        "lblType": this.AccountTrasactions[i].fromAccountType,
                        "template": "flxCustMangTransctionHistory"
                    };
                    data.push(toAdd);
                }
            }
        } else if (target === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Scheduled")) {
            for (var i = 0; i < this.AccountTrasactions.length; i++) {
              var newDate = "N/A";
              if(this.AccountTrasactions[i].transactionDate){
                var dateTime= this.AccountTrasactions[i].transactionDate.replace("T", " ").replace("Z", "");
                if(dateTime.split(' ')[1])
                  newDate = this.getLocaleDateAndTime((this.getDateInstanceFromDBDateTime(dateTime)));
                else
                  newDate = dateTime;
              }
                if (this.AccountTrasactions[i].isScheduled === "true" && newDate!=="N/A") {
                    toAdd = {
                        "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                        "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                        "flxRecurrIcon": "flxRecurrIcon",
                        "lblLimitsIcon": { "text": "", "skin": "sknFontIconLimits13Px", "isVisible": (this.AccountTrasactions[i].numberOfRecurrences && (parseInt(this.AccountTrasactions[i].numberOfRecurrences) > 0)) ? true : false },
                        "flxFirstColoum": "flxFirstColoum",
                        "lblAmountOriginalSign": this.AccountTrasactions[i].amount && this.AccountTrasactions[i].amount.substring(0, 1) === "-" ? "-" : "",
                        "lblAmountOriginalSymbol": this.AccountTrasactions[i].amount ? this.defaultCurrencyCode(this.AccountTrasactions[i].baseCurrency) : "",
                        "lblAmountOriginal": this.AccountTrasactions[i].amount ? this.formatCurrencyByDeletingSign(this.getCurrencyFormat(this.AccountTrasactions[i].amount)) : "-",
                        "lblAmountConvertedSign": this.AccountTrasactions[i].convertedAmount && this.AccountTrasactions[i].convertedAmount.substring(0, 1) === "-" ? "-" : "",
                        "lblAmountConvertedSymbol": this.AccountTrasactions[i].convertedAmount ? this.defaultCurrencyCode(this.AccountTrasactions[i].transactionCurrency) : "",
                        "lblAmountConverted": this.AccountTrasactions[i].convertedAmount ? this.formatCurrencyByDeletingSign(this.getCurrencyFormat(this.AccountTrasactions[i].convertedAmount)) : "-",
                        "lblDateAndTime": newDate,
                        "lblRefNo": {"text":this.AdminConsoleCommonUtils.getTruncatedString(this.AccountTrasactions[i].transactionId, 8, 7),
                                     "info":this.AccountTrasactions[i].transactionId,"tooltip":this.AccountTrasactions[i].transactionId},
                        "lblSeperator": ".",
                        "lblTransctionDescription": this.AccountTrasactions[i].description,
                        "lblType": this.AccountTrasactions[i].transactiontype,
                        "template": "flxCustMangTransctionHistory"
                    };
                    data.push(toAdd);
                }
            }
        }
        this.view.transactionHistorySearch.tbxSearchBox.text = "";
        if (data.length > 0) {
            toAdd = {
                "flxCustMangRequestHeader": "flxCustMangRequestHeader",
                "flxCustMangTransctionHistory": "flxCustMangTransctionHistory",
                "flxRecurrIcon": "flxRecurrIcon",
                "lblLimitsIcon": "lblLimitsIcon",
                "flxFirstColoum": "flxFirstColoum",
                "lblAmountOriginalSign": "",
                "lblAmountOriginalSymbol": "",
                "lblAmountOriginal": "",
                "lblAmountConvertedSign": "",
                "lblAmountConvertedSymbol": "",
                "lblAmountConverted": "",
                "lblDateAndTime": "",
                "lblRefNo": "",
                "lblSeperator": ".",
                "lblTransctionDescription": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LOAD_MORE"),
                "lblType": "",
                "template": "flxCustMangTransctionHistory"
            };
            this.view.segTransactionHistory.widgetDataMap = dataMap;
            this.view.segTransactionHistory.setData(data);
            this.view.segTransactionHistory.info = {
                "data": data,
                "searchAndSortData": data
            };
            this.view.segTransactionHistory.setVisibility(true);

            this.view.flxTransactionHistorySegmentHeader.setVisibility(true);
            this.view.flxSeperator4.setVisibility(true);
            this.view.rtxMsgTransctions.setVisibility(false);
            this.view.transactionHistorySearch.flxDownload.setVisibility(true);
        } else {
            this.view.segTransactionHistory.info = {
                "data": [],
                "searchAndSortData": []
            };
            this.view.transactionHistorySearch.flxDownload.setVisibility(false);
            this.view.segTransactionHistory.setVisibility(false);
            this.view.flxTransactionHistorySegmentHeader.setVisibility(false);
            this.view.flxSeperator4.setVisibility(false);
            this.view.rtxMsgTransctions.setVisibility(true);
        }

        this.showProductTransactionHistory();
    },
    setSkinForHistoryTabs: function (btnWidget) {
        var widgetArray = [this.view.btnTabName1, this.view.btnTabName2, this.view.btnTabName3];
        this.tabUtilButtonFunction(widgetArray, btnWidget);
    },
    setSkinForAccountTabs: function (btnWidget) {
        this.view.btnTransactionHistory.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
        this.view.btnProductDetails.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
        btnWidget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
    },

    advSearchUsers: function () {
        var scopeObj = this;
        var acctNo = scopeObj.view.segProductListing.selecteditems[0].lblAccountNumber;
        var StartDate;
        var EndDate;
        var rangeType = scopeObj.view.customCalCreatedDate.value;
        if (rangeType !== "") {
            StartDate = rangeType.substring(0, rangeType.indexOf(" - "));
            var mm = StartDate.substr(0, 2);
            var dd = StartDate.substr(3, 2);
            var yyyy = StartDate.substr(6, 4);
            StartDate = yyyy + "-" + mm + "-" + dd;
            EndDate = rangeType.substring(rangeType.indexOf(" - ") + 3);
            var mm1 = EndDate.substr(0, 2);
            var dd1 = EndDate.substr(3, 2);
            var yyyy1 = EndDate.substr(6, 4);
            EndDate = yyyy1 + "-" + mm1 + "-" + dd1;
        }
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.getAccountTransactions({
            "AccountNumber": acctNo,
            "StartDate": StartDate,
            "EndDate": EndDate
        });
    },
    getTransactionDateCustom: function (Num, target) {
        var date = this.getCustomDate(Num, target);
        var formatDate= this.getTransactionDateForServiceCall(date);
        return formatDate.slice(0,-9); // To remove time stamp" 00:00:00"
    },
  onSegmentProductPaginationChange : function(currentValue){
    var self =this;
    var cardsToAppend;
    var searchText = this.view.searchBoxContracts.tbxSearchBox.text;
    var isSearch = searchText.length> 0 ? true: false;
    cardsToAppend = isSearch === false ? this.CustomerContracts: this.searchAccountsFilterData;
    kony.adminConsole.utils.showProgressBar(this.view);
    var offsetVal = currentValue *10;
    if(isSearch === false){
      self.createDynamicContractCards(offsetVal-10, offsetVal,cardsToAppend);
    }
    self.pageCount.PAGE_OFFSET = offsetVal;
    this.view.cardProductPagination.lblNumber.text = currentValue;
    this.view.cardProductPagination.tbxPageNumber.text = currentValue;
    var endVal = cardsToAppend.length < self.pageCount.PAGE_OFFSET  ? cardsToAppend.length : self.pageCount.PAGE_OFFSET;
    this.view.cardProductPagination.lblShowing.text = "Showing" + " " + (offsetVal-10+1) + " - " + endVal + " " + "Of " + cardsToAppend.length;
  },    
  
  
//    set pagination values to initial page
  resetPaginationValues : function(dataLen){
    this.pageCount = {
      PAGE_OFFSET: 0,
      TOTAL_PAGES: dataLen ? Math.ceil( dataLen/10) : 0
    };
    if(dataLen<10)
     {
       this.view.flxProductPagination.setVisibility(false); 
     }
    else{
      this.view.flxProductPagination.setVisibility(true); 
      this.view.cardProductPagination.lblNumber.text = "1";
      this.view.cardProductPagination.tbxPageNumber.text = "1";
      this.view.cardProductPagination.lblShowing.text = "Showing 1 - 10 Of " + dataLen;
     }
  },

  /*
    /*
    * create contract containers dynamically
    */
    createContractTemplate : function(contracts){
      this.resetPaginationValues(contracts.length);
      this.searchFilterRecords = [];
      this.view.flxProductContracts.removeAll();        
      this.view.flxFeaturesContractCardTemplate.setVisibility(false);
      this.view.rtxMsgProductCardNoResults.setVisibility(false);
      this.resetFilterWidgetsForAcct();
      if(!contracts || contracts.length ==0){
        this.view.rtxMsgProductCardNoResults.setVisibility(true);
        //this.view.flxProductPagination.setVisibility(false);
        this.view.forceLayout();
        return;
      }
      this.view.flxProductListingHeader.setVisibility(false);
      this.view.forceLayout();
      this.pageCount.TOTAL_PAGES = Math.ceil( contracts.length/10);
      if(contracts.length<10){
        this.createDynamicContractCards(0,contracts.length,contracts);
        this.pageCount.PAGE_OFFSET=contracts.length;
      }
      else{
        this.createDynamicContractCards(0,10,contracts);  
        this.pageCount.PAGE_OFFSET=10;
      }
    },
  createDynamicContractCards : function(start,end,contracts){
    var contracts=contracts;
   	end=contracts.length>end?end:contracts.length;
    this.view.flxProductContracts.removeAll();
    var compWidth = this.view.flxProductsAccounts.frame.width === 0 ? "95%" : (this.view.flxProductsAccounts.frame.width - 40);
    try{

            for(var i=start; i<end; i++){
                var flxId = i>=10 ? ""+i : "0"+i;
                var contractFlex = this.view.flxFeaturesContractCardTemplate.clone(flxId);
                contractFlex.top = "10dp";
                contractFlex.width = compWidth + "dp",
                contractFlex.isVisible = true;

              this.view.flxProductContracts.add(contractFlex);

              let contractCustomers = contracts[i].contractCustomers;
              this.view[flxId + "lblHeading"].text = contracts[i].contractName +  "("+contracts[i].contractId+")";
              this.createCustFeatureCards(contractCustomers , flxId);
            }  
        } catch (e) {
            console.log("Exception in dynamic widget creation :" + e);
        }
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
    
   /*
   * Created by :kaushik mesala
   * function to sort the segment data by column name
   * @param: segment to which the header is added
   * @param: column name on which  sorting takes place
   */
  sortSegForContractsByColName:function(accountsFeaturesCard, segment, sortColumn){
    let sectionData = segment.data[0];
    let secData = this.paginationDetails.currSegContractData[1];
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
    
    scopeObj.determineSortFontIcon(scopeObj.sortBy,'lbAccountName',sectionData[0]['fontIconAccNameSort']);
    scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblAccountNumber',sectionData[0]['fontIconAccNumberSort']);
    
    this.paginationDetails.currSegContractData[1] = sortedData;
    sectionData[1] = sortedData.slice(0,10);
    segment.data[0] = sectionData;
    // resetting the pagination labels
        
    accountsFeaturesCard.reportPagination.lblNumber.text = "1";
    accountsFeaturesCard.reportPagination.lblShowing.text = "Showing 1 - 10 Of " + this.paginationDetails.currSegContractData[1].length;

    segment.setData(segment.data);
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  }, 
  /*
   * Created by :kaushik mesala
   * function to set the header to the segment which will only be visible in case of accounts tab
   * @param: segment to which the header is added
   */
  getHeaderDataForContractAccts : function(accountsFeaturesCard ,segment){
    return {
        'template' : 'flxContractsAccountHeaderView',
        'isAcctHeaderRow':'true',
        'fontIconAccNumberSort' : {
          'text' :'\ue92b',
          "onClick":function(){
            this.sortSegForContractsByColName( accountsFeaturesCard ,segment,  'lblAccountNumber');
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
            this.sortSegForContractsByColName(accountsFeaturesCard ,segment, 'lbAccountName');
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
     this.view.forceLayout();
 
     
     // 3 positions based on widget
     let e = document.getElementById('flxContractsAccountHeaderView_'+widget);
     // Header icon
     var rect = e.getBoundingClientRect(); 
     console.log(rect.top, rect.right, rect.bottom, rect.left);
  
     // getting the arrow position of the component should be around 0 px
     var rect2  = document.getElementById('frmCustomerProfileAccounts_'+filterComponent.id+'_imgUpArrow').getBoundingClientRect();
     var diff = rect.left - rect2.left;
     
     this.view.flxViewContractFilter.left = diff + 'px';
    this.view.flxViewContractFilter.top = rect.top+7 + "px";
    this.view.forceLayout();
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
      maxLenText = (rec.length > maxLenText.length) ? rec : maxLenText;
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
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
   * function to map the contract accounts 
   * @param:  contract accounts result which will be mapped
   */
  mappingContractAccountsData : function(account){
    var self=this;
    return {
      'fontIconStatus': {
        "text":"",
        'isVisible':true,
        "skin": (account['accountStatus'] && account['accountStatus'].toLowerCase() === "active") || (account.statusDesc && account.statusDesc.toLowerCase() === "active") ?
                 "sknFontIconActivate" : "sknfontIconInactive"
      },
      'template' : 'flxContractsAccountView',
      'flxContractsAccountView' : {"onClick":function(){self.view.CSRAssist.openCSRAssistWindow(self,"OLB_ACCOUNTS",{"account_id":account["accountId"]});}},
      'lbAccountName': account['accountName'] ? account["accountName"] :"N/A",
      'lblAccountHolderName': account["ownership"] || account.ownerType ? account["ownership"] || account.ownerType :"N/A",
      'lblAccountNumber': account["accountId"] ? account["accountId"] :"N/A",
      'lblAccountType': account["accountType"] ? account["accountType"] :"N/A",
      'lblSeperator': '.',
      'lblStatus': (account['accountStatus'] && account['accountStatus'].trim().length !==0) || account.statusDesc ? 
              account["accountStatus"] || account.statusDesc :kony.i18n.getLocalizedString("i18n.common.Unavailable")
    };
  },
  setAccountsViewWidgetDataMap : function(segmentPath){
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
    }
    segmentPath.widgetDataMap = widgetDataMap;
  },
 /*
   * Created By :Kaushik Mesala
   * function to set service data for viewing contract accounts
   * @param: component 
   * @param: result of service call to be mapped
   */
  setDataToContractAccts : function(accountsFeaturesCard , custAccounts , contractCustomer){
    accountsFeaturesCard.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCompanies.Accounts");
    if(accountsFeaturesCard.btnEdit.isVisible === true){
      accountsFeaturesCard.flxCheckboxCont.right="72px";
      accountsFeaturesCard.lblLine.isVisible =true;
    } else{
      accountsFeaturesCard.flxCheckboxCont.right="15px";
      accountsFeaturesCard.lblLine.isVisible =false;
    }
    accountsFeaturesCard.lblCount.isVisible = true;
    accountsFeaturesCard.flxCheckboxCont.isVisible=true;
    accountsFeaturesCard.fontIconAccountInfo.isVisible=true;
    accountsFeaturesCard.flxCheckboxOptions.isVisible=false;
    //accountsFeaturesCard.lblData3.onClick= this.showProductsDetailsPopup();
    accountsFeaturesCard.lblAccountOptions.text=contractCustomer.autoSyncAccounts==="true"?"Implicit Account Access":"Explicit Account Access";
    let accounts = custAccounts.filter(function(account){
        return account.isEnabled === 'true';
    });
    var data = [];
    if(accounts && accounts.length >0){
        data = accounts.map(this.mappingContractAccountsData);  
    }   
    
    // for(let a_x = 0 ;a_x <12;a_x++){
    //   data.push(data[0]);
    // }
    let datLen = data.length ;
    accountsFeaturesCard.lblCount.text =  datLen<10?"(0"+datLen+")" :"("+datLen+")";

    let headerData = this.getHeaderDataForContractAccts(accountsFeaturesCard ,accountsFeaturesCard.segAccountFeatures);
    
    if(datLen > 10 ){
      this.paginationActionsForAcct(accountsFeaturesCard , accountsFeaturesCard.segAccountFeatures , datLen);
    }

    var sectionData = datLen > 0 ? [ headerData , data.slice(0,10)] : headerData;
    var self = this;
    this.setAccountsViewWidgetDataMap(accountsFeaturesCard.segAccountFeatures);
    var accSegData = datLen > 0 ? [sectionData] : [];
    accountsFeaturesCard.segAccountFeatures.setData(accSegData);
    //if no accounts available hide edit button
    if(datLen === 0){
      accountsFeaturesCard.btnEdit.isVisible = false;
      accountsFeaturesCard.flxCheckboxCont.right="15px";
      accountsFeaturesCard.lblLine.isVisible =false;
    }
    accountsFeaturesCard.btnEdit.onClick = function(){
        self.editAccountsOnClick(accountsFeaturesCard);
    };
    // we do the pagination and sorting logic when the segment is on
    accountsFeaturesCard.flxArrow.onClick = function(){
      var autoSync = contractCustomer.autoSyncAccounts;
      var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
      var userId = self.presenter.getCurrentCustomerDetails().userId || self.presenter.getCurrentCustomerDetails().Customer_id;
      var inputReq = {"userId" :userId,"coreCustomerId": contractCustomer.id,"legalEntityId":legalEntityId };
      var cardContext = {"cardWidgetRef":accountsFeaturesCard};
      var visibility = accountsFeaturesCard.flxCardBottomContainer.isVisible === true ? false : true;
      if(visibility === true && autoSync==="true"){
        self.presenter.getInfinityUserAccountsForCorecustomer(inputReq,cardContext);
      }else{
        accountsFeaturesCard.toggleCollapseArrow(visibility);
      }
       /*if(datLen == 0){
        accountsFeaturesCard.flxNoFilterResults.setVisibility(true);
        accountsFeaturesCard.flxCardBottomContainer.height='105dp';
        accountsFeaturesCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.No_result_found"); 
      }
      var visibility = accountsFeaturesCard.flxCardBottomContainer.isVisible === true ? false : true;
      if(visibility){
        self.paginationDetails.currSegContractData = [ headerData , data];
      }

      self.setDataToContractAccountsFilter(self.view.statusTypeFilterMenu ,headerData, data , 'lblStatus'  , accountsFeaturesCard);
      self.setDataToContractAccountsFilter(self.view.acctTypeFilterMenu ,headerData, data , 'lblAccountType' , accountsFeaturesCard );
      self.setDataToContractAccountsFilter(self.view.ownerShipTypeFilterMenu ,headerData, data , 'lblAccountHolderName' , accountsFeaturesCard );

      accountsFeaturesCard.toggleCollapseArrow(visibility);*/
     
    };
    // onTouchStart on the below label is not smooth updating to onClick
    accountsFeaturesCard.lblName.onClick = function(){
        
        let details = {"id": accountsFeaturesCard.lblData1.text,
                      "name":accountsFeaturesCard.lblName.text,
                      "industry":contractCustomer.industry,
                      "email":contractCustomer.email,
                      "phone":contractCustomer.phone,
                      "address": accountsFeaturesCard.lblData3.text}
        this.view.contractDetailsPopup.setDataForPopup(details);
        
        this.view.contractDetailsPopup.showBackButton(false);
        this.view.flxContractDetailsPopup.setVisibility(true);
    }.bind(this);
},
  /*
    * create feature cards for customer inside the contract containers
    * @param: contract container id
    */
  createCustFeatureCards : function(contractCustomers , parentWidId){
        var self=this;
    this.view[parentWidId+"flxFeatureCardsContainer"].removeAll();
    for (var i = 0; i < contractCustomers.length; i++) {
      var num = i>10 ? ""+i : "0"+i;
      var id = "F"+parentWidId+num;
      let contractCustomer = contractCustomers[i];

      var featureCardToAdd = new com.adminConsole.contracts.accountsFeaturesCard({
        "id": "featureCustCard" +id,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "width":"100%",
        "top": "15dp"
      }, {}, {});
      featureCardToAdd.isVisible = true;            
      featureCardToAdd.flxHeadingRightContainer.setVisibility(true);
      featureCardToAdd.btnView.setVisibility(false);

      featureCardToAdd.lblName.text = contractCustomer.name;

      featureCardToAdd.lblData1.text = contractCustomer.id;
      var custBasicInfo = this.presenter.getCurrentCustomerDetails();
      if(contractCustomer.id === custBasicInfo.primaryCustomerId){
        featureCardToAdd.flxPrimary.setVisibility(true);
      }
      //hide edit button if customer is not accessable for current logged in user
      var custBasicInfo = this.presenter.getCurrentCustomerDetails();
      featureCardToAdd.btnEdit.isVisible = custBasicInfo.isCustomerAccessiable === true ? true : false;
      featureCardToAdd.lblHeading2.text="TAXID & ADDRESS";
      featureCardToAdd.lblData2.text = contractCustomer.taxId;//"View";
      featureCardToAdd.flxColumn2.isVisible=false;
      //featureCardToAdd.lblData2.skin="sknLbl117EB0LatoReg14px";
      //featureCardToAdd.lblData2.hoverskin="sknLbl117EB0LatoReg14pxHov";
      //featureCardToAdd.flxColumn3.isVisible=false;
      featureCardToAdd.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.TaxId&Address");
      featureCardToAdd.lblHeading3.left="90px";
      featureCardToAdd.lblData3.text = kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.View");
      featureCardToAdd.lblData3.skin = "sknLblLato13px117eb0Cursor";
      featureCardToAdd.lblData3.left="90px";
      featureCardToAdd.lblData3.onTouchEnd=function(){
        var legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId|| self.presenter.custSearchLEId;
        var inputParam={      
          "coreCustomerId":contractCustomer.id,
          "legalEntityId":legalEntityId
        };
        self.view.DataFields.info={"customerName":contractCustomer.name};
        self.presenter.getCoreCustomerDetails(inputParam);
      };
      //featureCardToAdd.lblData3.text = contractCustomer.addressLine1+","+contractCustomer.addressLine2;  
      var contractAccounts = contractCustomer.coreCustomerAccounts || [];
      var a=this.view[parentWidId + "lblHeading"].text;
      featureCardToAdd.info.contractId=a.substring( a.indexOf( '(' ) + 1, a.indexOf( ')' ) );
      this.setDataToContractAccts(featureCardToAdd, contractAccounts, contractCustomer); 
      this.view[parentWidId+"flxFeatureCardsContainer"].add(featureCardToAdd);
    }
    this.view.forceLayout();
  },
  setTaxIdPopupData : function(custData){
    this.view.DataFields.lblPopUpMainMessage.text=this.view.DataFields.info.customerName;
    this.view.DataFields.lblHeading1.text = "TAX ID";
    this.view.DataFields.lblHeading2.text = "ADDRESS";
    if(custData.taxId === ""){
      this.view.DataFields.lblData1.text = "N/A";
    }
    else{
      this.view.DataFields.lblData1.text = custData.taxId;
    }
    this.view.DataFields.lblData2.text = custData.addressLine1+" "+custData.addressLine2;
    this.view.DataFields.setVisibility(true);
    this.view.flxViewProductPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  
    setDataToCardMangSegment: function (dataToAdd) {
        var scopeObj=this;
        var businessUserCards=[];
        var retailUserCards=[];
        dataToAdd=dataToAdd?dataToAdd:this.cardsInformation.records;
        var totalRecords =this.cardsInformation;
        var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
          (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
        : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
        //for combined user  
        if ((customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
           customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0)){
        for(var s=0;s<dataToAdd.length;s++){
          if(dataToAdd[s].isTypeBusiness==="1")
            businessUserCards.push(dataToAdd[s]);
          else retailUserCards.push(dataToAdd[s]);
        }
        dataToAdd=this.inBusinessToggle===true?businessUserCards:retailUserCards;
      }
        var dataMap = {
            "flxCardType": "flxCardType",
            "flxCustomerCards": "flxCustomerCards",
            "flxCustomerCardsList": "flxCustomerCardsList",
            "flxOptions": "flxOptions",
            "flxStatus": "flxStatus",
            "ImgCardType": "ImgCardType",
            "lblFontIconServiceStatus": "lblFontIconServiceStatus",
            "imgServiceStatus": "imgServiceStatus",
            "lblCardHolder": "lblCardHolder",
            "lblCardName": "lblCardName",
            "lblCardNumber": "lblCardNumber",
            "lblCardType": "lblCardType",
            "lblIconOptions": "lblIconOptions",
            "lblRequestAndNotification": "lblRequestAndNotification",
            "lblSeparator": "lblSeparator",
            "lblServiceStatus": "lblServiceStatus",
            "product_accountName": "product_accountName"
        };

        if (dataToAdd.length > 0) {
            var toSegment = function (dataToAdd) {
                return {
                    // "flxCardType":"flxCardType",
                    // "flxCustomerCards":"flxCustomerCards",
                    //"flxCustomerCardsList":"flxCustomerCardsList",
                    "flxOptions": {
                        "isVisible": false, //self.currentStatus==="SID_ARCHIVED" || self.currentStatus==="SID_RESOLVED"?false:
                        "onClick": function () {
                            //            this.view.flxCardsContextualMenu
                            scopeObj.toggleContextualMenuCards(70, dataToAdd.cardStatus, dataToAdd.maskedCardNumber);
                        }
                    },
                    //"flxStatus":"flxStatus",
                    "ImgCardType": {
                        //"src": dataToAdd.serviceProvider==="Visa"?"visa.png":"mastercard.png",
                        //"base64":totalRecords.issuerImages[dataToAdd.serviceProvider].Image.substr(22)
                        "base64": totalRecords.issuerImages[dataToAdd.serviceProvider] === undefined ? "N/A" : totalRecords.issuerImages[dataToAdd.serviceProvider].Image.substr(22)
                    },
                    "lblFontIconServiceStatus": {
                        "isVisible": true,
                        "text": "\ue921",
                        "skin": dataToAdd.cardStatus === "Active" ? "sknIcon13pxGreen" : dataToAdd.cardStatus === "Locked" ? "sknIconInProgress" : dataToAdd.cardStatus === "Reported Lost" ? "sknIcon13pxBlue" : "sknFontIconOptionMenu"
                    },
                    //"imgServiceStatus":"imgServiceStatus",
                    "lblCardHolder": dataToAdd.cardHolderName,
                    "lblCardName": dataToAdd.cardProductName,
                    "lblCardNumber": dataToAdd.maskedCardNumber,
                    "lblCardType": dataToAdd.cardType,
                    "lblIconOptions": {
                        "text": "\ue91f",
                        "skin": "sknFontIconOptionMenu"
                    },
                    "lblRequestAndNotification": dataToAdd.requestCount + " Request(s) & " + dataToAdd.notificationCount + " Notification(s)",
                    "lblSeparator": "-",
                    "lblServiceStatus": {
                        "text": dataToAdd.cardStatus
                    },
                    "template": "flxCustomerCardsList",
                    "product_Action": dataToAdd.Action,
                    "product_accountName": dataToAdd.accountName,
                    "product_currentDueAmount": dataToAdd.currentDueAmount,
                    "product_currentDueDate": dataToAdd.currentDueDate,
                    "product_maskedCardNumber": dataToAdd.maskedCardNumber,
                    "product_issuedOn": dataToAdd.issuedOn,
                    "product_expiryDate": dataToAdd.expiryDate,
                    "product_withdrawlLimit": dataToAdd.withdrawlLimit,
                    "product_lastPaymentDate": dataToAdd.lastPaymentDate,
                    "product_cardStatus": dataToAdd.cardStatus,
                    "product_interestRate": dataToAdd.interestRate,
                    "product_minimumDueAmount": dataToAdd.minimumDueAmount,
                    "product_requestCount": dataToAdd.requestCount,
                    "product_secondaryCardHolder": dataToAdd.secondaryCardHolder,
                    "product_cardHolderName": dataToAdd.cardHolderName,
                    "product_notificationCount": dataToAdd.notificationCount,
                    "product_currentBalance": dataToAdd.currentBalance,
                    "product_rewardPointBalance": dataToAdd.rewardPointBalance,
                    "product_lastStatementPayment": dataToAdd.lastStatementPayment,
                    "product_cardType": dataToAdd.cardType,
                    "product_accountNumber": dataToAdd.accountNumber,
                    "product_userId": dataToAdd.userId,
                    "product_maskedAccountNumber": dataToAdd.maskedAccountNumber,
                    "product_lastStatementBalance": dataToAdd.lastStatementBalance,
                    "product_cardProductName": dataToAdd.cardProductName,
                    "product_cardId": dataToAdd.cardId,
                    "product_serviceProvider": dataToAdd.serviceProvider,
                    "product_cardNumber": dataToAdd.cardNumber,
                    "billingAddress": dataToAdd.billingAddress,
                    "product_availableCredit": dataToAdd.availableCredit,
                    "cardHolder_username": dataToAdd.username

                };
            };
            var data = dataToAdd.map(toSegment);
            this.view.segProductCardListing.info = {
                "data": data,
                "searchAndSortData": data
            };
            this.view.flxProductCardsHeader.isVisible = true;
            this.view.lblHeaderSeperator1.isVisible = true;
            this.view.segProductCardListing.isVisible = true;
            this.view.rtxMsgProductCard.isVisible = false;
            this.view.segProductCardListing.widgetDataMap = dataMap;
            this.cardsSegData = data;
            this.view.segProductCardListing.setData(data);
        } else {
            this.view.segProductCardListing.isVisible = false;
            this.view.rtxMsgProductCard.isVisible = true;
        }
      scopeObj.view.flxSeperatorAccountsBB.setVisibility(false);
      scopeObj.view.forceLayout();
    },
    showProductInfoScreen: function () {

        this.view.flxProductInfoWrapper.setVisibility(true);
        this.view.flxProductListing.setVisibility(true);
        this.view.flxProductDetails.setVisibility(false);
        this.view.flxProductsAccounts.setVisibility(true);
        this.view.flxProductCardDetails.setVisibility(false);
        this.view.flxProductsCards.setVisibility(false);
        this.view.calStartDate.setVisibility(false);
        this.view.transactionHistorySearch.flxStartDate.setVisibility(false);
        this.view.calEndDate.setVisibility(false);
        this.view.transactionHistorySearch.flxEndDate.setVisibility(false);
        this.view.calStartDate.value = "";
        this.view.calEndDate.value = "";
        this.view.calStartDate.resetData = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Start_Date");
        this.view.calEndDate.resetData = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.End_Date");
        this.view.customCalCreatedDate.resetData = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Last_7_days");
        this.view.transactionHistorySearch.flxStartDate.skin = "sknFlxCalendar";
        this.view.transactionHistorySearch.flxEndDate.skin = "sknFlxCalendar";

        this.view.transactionHistorySearch.lbxPageNumbers.selectedKey = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.7days");
        this.view.transactionHistorySearch.lbxPageNumbers.info = {
            "previousSelection": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.7days")
        };
        this.view.flxProductsTabs.setVisibility(true);
        this.view.forceLayout();
        this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
        
    },
    showProductCardScreen: function () {
        this.view.btnProductsAccounts.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
        this.view.btnProductsCards.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
        this.view.flxProductListing.setVisibility(true);
        this.view.flxProductDetails.setVisibility(false);
        this.view.flxProductsAccounts.setVisibility(false);
        this.view.flxProductsCards.setVisibility(true);
        this.view.flxProductCardDetails.setVisibility(false);
        this.view.flxBackToProductListing.setVisibility(false);
        this.view.flxProductHeader.setVisibility(false);
        this.view.flxProductsTabs.setVisibility(true);
        this.view.forceLayout();
    },
    showProductDetailsScreen: function () {
        this.view.flxProductHeaderAndDetails.setVisibility(true);
        this.view.flxTransactionHistoryWrapper.setVisibility(false);
        this.view.flxProductInfoWrapper.setVisibility(true);
        this.view.flxProductsAccounts.setVisibility(true);
        this.view.flxProductCardDetails.setVisibility(false);
        this.view.flxProductsCards.setVisibility(false);
        this.view.flxProductListing.setVisibility(false);
        this.view.flxProductDetails.setVisibility(true);
        this.view.flxProductInfoTabs.setVisibility(true);
        this.view.flxBackToProductListing.setVisibility(true);
        this.view.flxProductHeader.setVisibility(true);
        this.view.forceLayout();
        this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
    },
    showProductTransactionHistory: function () {
        this.AdminConsoleCommonUtils.storeScrollHeight(this.view.flxMainContent);
        this.view.flxProductHeaderAndDetails.setVisibility(false);
        this.view.flxTransactionHistoryWrapper.setVisibility(true);
        this.view.flxProductInfoWrapper.setVisibility(true);
        this.view.flxProductListing.setVisibility(false);
        this.view.flxProductDetails.setVisibility(true);
        this.view.flxProductInfoTabs.setVisibility(true);
        this.view.flxBackToProductListing.setVisibility(true);
        this.view.flxProductHeader.setVisibility(true);
        this.view.forceLayout();
        //Determine scroll width
        var flxScroll = document.getElementById("frmCustomerProfileAccounts_flxScrollTransctionsSegment");
        var scrollWidth = flxScroll.offsetWidth - flxScroll.clientWidth;
        this.view.flxTransactionHistorySegmentHeader.right = 20 +scrollWidth+"px";
        this.view.forceLayout();
        this.AdminConsoleCommonUtils.scrollToDefaultHeight(this.view.flxMainContent);
    },
    setCardOrAccountNumber: function (cardOrAccountNumber) {
        this.view.productHeader.blAccountNumber.text = cardOrAccountNumber;
        this.view.productHeader.blAccountNumber.width = (8.75 * cardOrAccountNumber.length) + "px";
        this.view.productHeader.blAccountNumber.right = "0px";
        this.view.productHeader.lblAccountNumberLabel.right = ((8.75 * cardOrAccountNumber.length)) + "px";
        this.view.productHeader.lblIBAN.isVisible = false;
        this.view.productHeader.lblIBANLabel.isVisible = false;
        this.view.productHeader.blAccountNumber.isVisible = true;
        this.view.productHeader.lblAccountNumberLabel.isVisible = true;
    },
    onHoverEventCallbackCards: function (widget, context) {
        if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
            this.view.flxCardsContextualMenu.isVisible = false;
          	var index = this.view.segProductCardListing.selectedrowindex;
          	this.optionButtonStateChange(index[1], false);
        }
    },
    setCardsContextualMenu: function (cardStatus) {
        this.view.cardContextualMenu.lblHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.View");
        this.view.cardContextualMenu.btnLink1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Notifictions");
        this.view.cardContextualMenu.btnLink2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Requests");
        this.view.cardContextualMenu.lblIconOption1.text = "\ue950";
        this.view.cardContextualMenu.lblIconOption1.skin = "sknFontIconOptionMenu";
        this.view.cardContextualMenu.lblIconOption2.text = "\ue932";
        this.view.cardContextualMenu.lblIconOption2.skin = "sknFontIconOptionMenu";
        this.view.cardContextualMenu.flxOption1.isVisible = true;
        this.view.cardContextualMenu.flxOption2.isVisible = true;
        if (cardStatus === "Active") {
            this.view.cardContextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mark_as_lost_stolen");
            this.view.cardContextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Lock");
        } else if (cardStatus === "Locked") {
            this.view.cardContextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mark_as_lost_stolen");
            this.view.cardContextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Unlock");
        } else {
            this.view.cardContextualMenu.flxOption1.isVisible = false;
            this.view.cardContextualMenu.flxOption2.isVisible = false;
        }
    },
    toggleContextualMenuCards: function (rowHeight, cardStatus, cardNumber) {
      	var index = this.view.segProductCardListing.selectedIndex;
      	var height = (this.rowIndex * 51) + 95;
        this.view.flxCardsContextualMenu.onHover = this.onHoverEventCallbackCards;
        if (this.view.flxCardsContextualMenu.isVisible === false) {
            this.setCardsContextualMenu(cardStatus);
            this.cardNumber = cardNumber;
            this.rowIndex = index[1];
            
            this.view.flxCardsContextualMenu.top = height + "px";
            this.view.flxCardsContextualMenu.setVisibility(true);
          	this.optionButtonStateChange(index[1], true);
        } else {
            this.view.flxCardsContextualMenu.setVisibility(false);
          	this.optionButtonStateChange(index[1], false);
        }
      if(height + this.view.flxCardsContextualMenu.frame.height > this.view.flxMainContent.frame.height) {
        height = height - this.view.flxCardsContextualMenu.frame.height - 15;
        this.view.cardContextualMenu.flxUpArrowImage.setVisibility(false);
        this.view.cardContextualMenu.flxDownArrowImage.setVisibility(true);
        this.view.cardContextualMenu.contextualMenu1Inner.top = "0px";
      }
      else {
        this.view.cardContextualMenu.flxUpArrowImage.setVisibility(true);
        this.view.cardContextualMenu.flxDownArrowImage.setVisibility(false);
        this.view.cardContextualMenu.contextualMenu1Inner.top = "-1px";
        height = height+2;

      }
      this.view.flxCardsContextualMenu.top = height+"px";
      this.view.forceLayout();
      this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
    },
    optionButtonStateChange : function(selectedIndex,condition){
      var data = this.view.segProductCardListing.data;
      var scopeObj = this;
      if(scopeObj.prevIndex !=-1){
        var tempDataPrev = data[scopeObj.prevIndex];
        tempDataPrev.flxOptions.skin = "slFbox";
        scopeObj.view.segProductCardListing.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
      }
      var tempDataCurrent = data[selectedIndex];
      tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
      scopeObj.view.segProductCardListing.setDataAt(tempDataCurrent, selectedIndex, 0);
      scopeObj.prevIndex = selectedIndex;
    },
    setDebitCardHeader: function () {
        //Row 1
        this.view.ProductCardRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PRODUCT_TYPE");
        this.view.ProductCardRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_TYPE");
        this.view.ProductCardRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PRIMARY_NUMBER");
        //Row 2
        this.view.ProductCardRow2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_NETWORK");
        this.view.ProductCardRow2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_HOLDER");
        this.view.ProductCardRow2.btnLink2.isVisible = false;
        this.view.ProductCardRow2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ASSOCIATED_ACCOUNT");
        //Row 3
        this.view.ProductCardRow3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ISSUED_ON");
        this.view.ProductCardRow3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EXPIRES_ON");
        this.view.ProductCardRow3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.REWARD_POINTS_BALANCE");

        this.view.ProductCardRow4.isVisible = false;
        this.view.ProductCardRow5.isVisible = false;
        this.view.ProductCardRow6.isVisible = false;
        this.view.ProductCardRow7.isVisible = false;
    },
    setCreditCardHeader: function () {
        //Row 1
        this.view.ProductCardRow1.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PRODUCT_TYPE");
        this.view.ProductCardRow1.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_TYPE");
        this.view.ProductCardRow1.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PRIMARY_NUMBER");
        //Row 2
        this.view.ProductCardRow2.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_NETWORK");
        this.view.ProductCardRow2.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CARD_HOLDER");
        if (this.presenter.getCurrentCustomerDetails().Username === this.primaryUsername) { this.view.ProductCardRow2.btnLink2.isVisible = false; }
        else {
            this.view.ProductCardRow2.btnLink2.isVisible = true;
        }
        this.view.ProductCardRow2.btnLink2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.View_Primary_Card_Holder");
        this.view.ProductCardRow2.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.INTEREST_RATE");
        //Row 3
        this.view.ProductCardRow3.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ISSUED_ON");
        this.view.ProductCardRow3.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EXPIRES_ON");
        this.view.ProductCardRow3.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CURRENT_BALANCE");

        this.view.ProductCardRow4.isVisible = true;
        this.view.ProductCardRow5.isVisible = true;
        this.view.ProductCardRow6.isVisible = true;
        this.view.ProductCardRow7.isVisible = true;
        //Row 4
        this.view.ProductCardRow4.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CREDIT_LIMIT");
        this.view.ProductCardRow4.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CURRENT_DUE_AMOUNT");
        this.view.ProductCardRow4.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.REWARD_POINTS_BALANCE");
        //Row 5
        this.view.ProductCardRow5.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.AVAILABLE_CREDIT");
        this.view.ProductCardRow5.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CURRENT_DUE_DATE");
        this.view.ProductCardRow5.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MINIMUM_DUE_BALANCE");
        //Row 6
        this.view.ProductCardRow6.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LAST_STATEMENT_BALANCE");
        this.view.ProductCardRow6.lblHeading2.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LAST_PAYMENT_DATE");
        this.view.ProductCardRow6.lblHeading3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.LAST_STATEMENT_PAYMENT");
        //Row 7
        this.view.ProductCardRow7.lblHeading1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.BILLING_ADDRESS");

    },
    resetAllSortImagesCards: function () {
        if (this.view.fontIconSortCardType.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fontIconSortCardType.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fontIconSortCardType.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fontIconSortCardName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fontIconSortCardName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fontIconSortCardName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fontIconSortCardNumber.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fontIconSortCardNumber.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fontIconSortCardNumber.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fontIconSortCardHolder.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fontIconSortCardHolder.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fontIconSortCardHolder.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fontIconSortReq.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fontIconSortReq.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fontIconSortReq.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
        if (this.view.fontIconSortStatus.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
            this.view.fontIconSortStatus.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
            this.view.fontIconSortStatus.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
        }
    },
    updateEstatementStatus: function (eStatementStatus) {
        kony.print("Inside updateEstatementStatus() of frmCustomerManagementController");
        var scopeObj = this;

        var eStatementJSON = {
            "customerID": scopeObj.presenter.getCurrentCustomerDetails().Customer_id,
            "accountID": scopeObj.view.segProductListing.selecteditems[0].lblAccountNumber,
            "eStatementStatus": eStatementStatus
        };

        if (eStatementStatus === true) {

            var eStatementEmail = scopeObj.view.lbxEstatementEmail.selectedKeyValue[1];
            if (eStatementEmail.indexOf(" (Primary email)") != -1) {
                eStatementEmail = eStatementEmail.substring(0, eStatementEmail.indexOf(" (Primary email)"));
                eStatementJSON.eStatementEmail = eStatementEmail;
            }
            else {
                eStatementJSON.eStatementEmail = scopeObj.view.lbxEstatementEmail.selectedKeyValue[1];
            }
        }

        scopeObj.presenter.updateEstatementStatus(eStatementJSON);
    },
    downloadTransactionsAsCSV: function () {
        var segData = this.view.segTransactionHistory.data;
        var list = segData.map(function (record) {
            return {
                "RefNo": record.lblRefNo.info,
                "Type": record.lblType,
                "Description": record.lblTransctionDescription,
                "DateAndTime": record.lblDateAndTime,
                "Amount": record.lblAmountOriginal
            };
        });
        this.commonDownloadCSV(list, "Transactions.csv");
    },
  setToggleButtonsVisibility : function(){
    var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
          (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
        : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
        if ((customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
                    customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0)){
          this.view.flxToggleButtonsContainer.setVisibility(true);
          this.view.flxProductsAccounts.top="95px";
          this.view.flxProductsCards.top="95px";
          this.inBusinessToggle=false; //default is retail
        }
      else{
          this.inBusinessToggle=customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0?true:false;
          this.view.flxToggleButtonsContainer.setVisibility(false);
          this.view.flxProductsAccounts.top="50px";
          this.view.flxProductsCards.top="110px";
      }
    this.toggleButtonsUtilFunction([this.view.toggleButtons.btnToggleLeft,this.view.toggleButtons.btnToggleRight],1);
  },
  requestTabOnClick: function () {
    var scopeObj = this;
    var name = scopeObj.presenter.getCurrentCustomerDetails().Username;
    scopeObj.presenter.getCardRequests({ "Username": name });
  },
  notificationTabOnClick: function () {
    var scopeObj = this;
    var name = scopeObj.presenter.getCurrentCustomerDetails().Username;
    scopeObj.presenter.getTravelNotifications({ "Username": name });
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
  setAccountsFilterData : function(){
    var accountsData=this.view.segProductListing.data;
    var statusList=[];
    var maxSizeText="";
    for(var i=0;i<accountsData.length;i++){
      if(!statusList.contains(accountsData[i].lblStatus.text))
        statusList.push(accountsData[i].lblStatus.text);
    }
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "lblDescription": "lblDescription",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox"
    };
    var data = statusList.map(function(segData){
      maxSizeText=segData && segData.length>maxSizeText.length?segData:maxSizeText;
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
    this.view.flxAccountStatusFilter.width=flexWidth+"px";
    this.view.accountStatusMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.accountStatusMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    this.view.accountStatusMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    this.view.forceLayout();
  },
  setCardsFilterData : function(){
    var cardsData=this.view.segProductCardListing.data;
    var statusList=[];
    var maxSizeText="";
    var selStatus = [];
    for(var i=0;i<cardsData.length;i++){
      if(!statusList.contains(cardsData[i].lblServiceStatus.text))
        statusList.push(cardsData[i].lblServiceStatus.text);
    }
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "lblDescription": "lblDescription",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox"
    };
    var data = statusList.map(function(segData){
      maxSizeText=segData && segData.length>maxSizeText.length?segData:maxSizeText;
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
    this.view.flxCardsStatusFilter.width=flexWidth+"px";
    this.view.cardStatusMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.cardStatusMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    this.view.cardStatusMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    this.view.forceLayout();
  },
  filterAccountsData:function(){
    var scopeObj=this;
    var data = this.customerAccounts;
    var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
        (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
    : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
    //for combined user  
    if ((customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
         customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0)){
      var businessUserAccounts=[];
      var retailUserAccounts=[];
      for(var s=0;s<data.length;s++){
        if(data[s].isBusinessAccount==="true")
          businessUserAccounts.push(data[s]);
        else retailUserAccounts.push(data[s]);
      }
      data=this.inBusinessToggle===true?businessUserAccounts:retailUserAccounts;
    }
    var dataToShow=[];
    var selStatus = [];
    if(this.view.accountStatusMenu.segStatusFilterDropdown.selectedIndices){
      var seletectedIndices = this.view.accountStatusMenu.segStatusFilterDropdown.selectedIndices[0][1];
      for(var i=0;i<seletectedIndices.length;i++){
        selStatus.push(this.view.accountStatusMenu.segStatusFilterDropdown.data[seletectedIndices[i]].lblDescription);
      }
        dataToShow = data.filter(function(rec){
          if(selStatus.indexOf(rec.statusDesc) >= 0){
            return rec;
          }
        });
    }
    return dataToShow;
  },
  filterCardsData:function(){
    var data = this.cardsInformation.records;
    var customerType = this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info ?
        (this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id ? this.view.flxGeneralInfoWrapper.generalInfoHeader.flxDefaultSearchHeader.info.CustomerType_id : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)
    : this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE;
    //for combined user  
    if ((customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
         customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0)){ 
      var businessUserCards=[];
      var retailUserCards=[];
      for(var s=0;s<data.length;s++){
        if(data[s].isTypeBusiness==="1")
          businessUserCards.push(data[s]);
        else retailUserCards.push(data[s]);
      }
      data=this.inBusinessToggle===true?businessUserCards:retailUserCards;
    }
    var dataToShow=[];
    var selStatus = [];
    if(this.view.cardStatusMenu.segStatusFilterDropdown.selectedIndices){
      var seletectedIndices = this.view.cardStatusMenu.segStatusFilterDropdown.selectedIndices[0][1];
      for(var i=0;i<seletectedIndices.length;i++){
        selStatus.push(this.view.cardStatusMenu.segStatusFilterDropdown.data[seletectedIndices[i]].lblDescription);
      }
      	dataToShow = data.filter(function(rec){
          if(selStatus.indexOf(rec.cardStatus) >= 0){
            return rec;
          }
        });
    }
    return dataToShow;
  },
  /*
  * set accounts segment data on click of expand/collapse arrow
  */
  setAccountsSegmentDataForCust : function(accountsData, accountsFeaturesCard){
    var self =this;
    let accounts = accountsData.filter(function(account){
      return account.isAssociated === 'true';
    });
    var data = [];
    if(accounts && accounts.length >0){
        data = accounts.map(this.mappingContractAccountsData);  
    }
    let datLen = data.length ;
    var visibility = accountsFeaturesCard.flxCardBottomContainer.isVisible === true ? false : true;
    accountsFeaturesCard.lblCount.text =  datLen<10?"(0"+datLen+")" :"("+datLen+")";
    
    if(datLen === 0){
      accountsFeaturesCard.flxNoFilterResults.setVisibility(true);
      accountsFeaturesCard.flxCardBottomContainer.height='105dp';
      accountsFeaturesCard.lblNoFilterResults.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.No_result_found"); 
      accountsFeaturesCard.segAccountFeatures.setData([]);
    } else{
      let headerData = this.getHeaderDataForContractAccts(accountsFeaturesCard ,accountsFeaturesCard.segAccountFeatures);
      if(datLen > 10 ){
        this.paginationActionsForAcct(accountsFeaturesCard , accountsFeaturesCard.segAccountFeatures , datLen);
      }
      var sectionData = datLen > 0 ? [ headerData , data.slice(0,10)] : headerData;
      var self = this;
      this.setAccountsViewWidgetDataMap(accountsFeaturesCard.segAccountFeatures);
      var accSegData = datLen > 0 ? [sectionData] : [];
      accountsFeaturesCard.segAccountFeatures.setData(accSegData);
      if(visibility){
        self.paginationDetails.currSegContractData = [ headerData , data];
      }

      self.setDataToContractAccountsFilter(self.view.statusTypeFilterMenu ,headerData, data , 'lblStatus'  , accountsFeaturesCard);
      self.setDataToContractAccountsFilter(self.view.acctTypeFilterMenu ,headerData, data , 'lblAccountType' , accountsFeaturesCard );
      self.setDataToContractAccountsFilter(self.view.ownerShipTypeFilterMenu ,headerData, data , 'lblAccountHolderName' , accountsFeaturesCard );
    }
    accountsFeaturesCard.toggleCollapseArrow(visibility);
    this.view.forceLayout();
  },
  /*
  * performs search on click of searchbar search icon
  */
  onSearchIconClick : function(){
    var scopeObj = this;
    scopeObj.createContractTemplate( scopeObj.CustomerContracts);
    let searchTxt = scopeObj.view.searchBoxContracts.tbxSearchBox.text;
    searchTxt = searchTxt.toLowerCase();
    scopeObj.view.searchBoxContracts.flxClearSearch.setVisibility(searchTxt.length>0);
    scopeObj.resetPaginationValues();
    // reset the flags
    scopeObj.searchResult = {
      isAcctMatched : false
    };
    if(!scopeObj.isAccountsTab){
      // cards tab
      scopeObj.view.segProductCardListing.setData(scopeObj.cardsSegData.filter(function(card){
        // card name , card holder , card number filter
        if( card.lblCardHolder.toLowerCase().indexOf(searchTxt) !=-1 ||
           card.lblCardName.toLowerCase().indexOf(searchTxt) !=-1 ||
           card.lblCardNumber.toLowerCase().indexOf(searchTxt) !=-1 ){
          return true;
        }
      }));
    }else{
      // accounts tab
      scopeObj.searchAccountsFilterData = scopeObj.filterSearchResults(searchTxt);
      scopeObj.createContractTemplate(scopeObj.searchAccountsFilterData);
      // first searched element should be expanded
      if(scopeObj.searchResult.isAcctMatched ){
        if(scopeObj.view["featureCustCardF0000"] && scopeObj.view["featureCustCardF0000"].flxArrow){
          scopeObj.view["featureCustCardF0000"].toggleCollapseArrow(true);
        }
      }  
    }
    scopeObj.view.forceLayout();
  },
  /*
  * filter for accounts in case of search while fetching accounts on expand of card
  */
  filterAccountsOnExpandForSearch : function(accountsData){
    var self =this;
    var searchText = this.view.searchBoxContracts.tbxSearchBox.text.trim();
    if(searchText.length > 0 && this.searchResult.isAcctMatched){
      var filteredAcc = accountsData.filter(function(account){
        if(account.accountId.toLowerCase().indexOf(searchText) !=-1 ){
          return true;
        }
      });
      return filteredAcc;
    } else{
      return accountsData;
    }
    
  },
  /*
  * navigate to enroll form to edit the customers
  * @param: accountsFeaturesCard path
  */
  editAccountsOnClick : function(accountsFeaturesCard){
    var customerDetails = this.presenter.getCurrentCustomerDetails();
    var contractId=accountsFeaturesCard.info.contractId;
    var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    var input={
      "id": customerDetails.Customer_id||customerDetails.userId,
      "coreCustomerId": accountsFeaturesCard.lblData1.text,
      "contractId": contractId,
      "legalEntityId": legalEntityId
    };
    var customerData = {"custId": accountsFeaturesCard.lblData1.text,
                        "taxId": accountsFeaturesCard.lblData2.text,
                        "address": accountsFeaturesCard.lblData3.text
                       };
    var navigationParam = {"formName":"frmCustomerProfileContracts",
                           "isEnrollEditUser" : true,
                           "tabName":"ACCOUNTS",
                           "data": customerData};
    this.presenter.getInfinityUserAllDetails(input,navigationParam);
  },
});
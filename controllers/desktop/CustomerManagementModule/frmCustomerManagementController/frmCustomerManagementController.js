  define({
  sortBy: null,
  recordsSize: 20,
  scrollHeight: 0,
  mouseYCoordinate: 0,
  loadMoreModel: null,
  primaryUsername: null,
  limitForPaginationSearch: 20,
  populateSearchParameters: 0,
  ascendingSortIcon: "",
  desendingSortIcon: "",
  radioNotSelected: "radio_notselected.png",
  radioSelected: "radio_selected.png",
  homelegalentityid : "",

  willUpdateUI: function (context) {
    if (context !== undefined) {
      this.updateLeftMenu(context);
      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }
      else if (context.showCustomerSearch) {
        this.resetSearchParameters(context.shouldReset);
        this.showCustomerSearchScreen(context.shouldReset);
        this.view.forceLayout();
      }
      else if (context.searchModel) {
        this.setSearchSegmentData(context.searchModel); 
      } else if (context.uploadCustomersCSVResponse) {
        if (context.uploadCustomersCSVResponse.failedCount > 0) {
          this.showErrorToastMessageWithLink(context.uploadCustomersCSVResponse.createdCount, context.uploadCustomersCSVResponse.failedCount, context.uploadCustomersCSVResponse.downloadFileId);
        } else {
          this.showToastMessage(context.uploadCustomersCSVResponse.TotalCount + kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.records_added_to_the_system"));
        }
      } 
      else if (context.searchModel12){
        this.setSearchSegmentData1(context.searchModel12);
      } else if(context.searchByUseridError){
        this.showSearchNoResultOrPermission(context.searchByUseridError.option);
      }
      if (context.Companies) {
        this.setCompaniesData(context.Companies);
        this.setCreateButtonRight();
        this.searchandSetCompanies();
      }
      if(context.BankingURL){
        window.open(context.BankingURL);
      }
      if (context.toastModel) {
        if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.showToastMessage(context.toastModel.message);
        } else {
          this.showErrorToastMessage(context.toastModel.message);
        }
      }
      /* if (Array.isArray(context.eligibilityCriteria)) {
        this.eligibilityCriteriaMasterData = context.eligibilityCriteria
          .filter(function (ec) {
            return ec.Status_id === 'SID_ACTIVE';
          })
          .map(function (ec) {
            return {
              text: ec.Description,
              status: ec.Status_id === 'SID_ACTIVE' ? 'Active' : 'InActive',
              id: ec.id
            };
          });
        this.setEligibilityCriteria(this.eligibilityCriteriaMasterData);
        //this.view.flxOnboarding.setVisibility(true);
        //this.isOnboardingCriteriaDisabled = false;
        this.view.radioNoEligibilityMatches.masterData = [['1', '']];
        this.view.radioNoEligibilityMatches.selectedKey = null;
        this.currentSelectedCriteria = null;
        // this.updateOnboardErrorMsg();
        this.hideEligibilityErrorWidgets();
      }*/
    }
    this.view.forceLayout();
  },

  cusidsearch: function(){
    var scopeObj = this;
      this.view.CustomerSearchandResults.segCustomerResults.onRowClick = function() {
        var id = scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].CustomerId || scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].primaryCustomerId;
        var partyId = scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].partyId;    
        var target = "InfoScreen";
        var legalEntityId =scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].branchId;
        //to clear any previous form navigation data in variable
        var previousFormDetails = {
            "name": "frmCustomerManagement",
            "data": ""
        };
         scopeObj.presenter.CustomerLegalEntitiesGetOperation(
        {
          "customerId": id,
        }
      ); 
        scopeObj.presenter.getCustomerBasicInfo({
            "Customer_id": id,
            "legalEntityId":legalEntityId || " ",
            "partyId": partyId
        }, target, previousFormDetails);
        scopeObj.view.forceLayout();
    }
},
 useridsearch: function(){
    var scopeObj = this;
    this.view.CustomerSearchandResults.segCustomerResults.onRowClick = function() {
      var id = scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].CustomerId || scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].primaryCustomerId;
      var partyId = scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].partyId;
      var legalEntityId =scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].branchId;
      var target = "InfoScreen";
      //to clear any previous form navigation data in variable
      var previousFormDetails = {
          "name": "frmCustomerManagement",
          "data": ""
      };
       scopeObj.presenter.CustomerLegalEntitiesGetOperation(
        {
          "customerId": id,
        }
      ); 
      scopeObj.presenter.getCustomerBasicInfo({
          "Customer_id": id,
          "legalEntityId":legalEntityId || " ",
          "partyId": partyId
      }, target, previousFormDetails);
      scopeObj.view.forceLayout();
  }},

  showCustomerSearchScreen: function (shouldReset) {
    if (shouldReset){
      this.view.CustomerSearchandResults.flxSearch.setVisibility(true);
      this.view.CustomerSearchandResults.flxSearchbyUserId.setVisibility(false);
      this.view.CustomerSearchandResults.flxradioimg1selected.setVisibility(true);
      this.view.CustomerSearchandResults.flxRadioimg2unselected.setVisibility(true);
      this.view.CustomerSearchandResults.flxradioimg2selected.setVisibility(false); 
      this.view.CustomerSearchandResults.flxradioimg1selected.setVisibility(true);
    }
    this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
    this.view.flxMainContent.setVisibility(true);
    this.view.flxCompanyDropdown.setVisibility(false);
    this.view.CustomerSearchandResults.setVisibility(true);
    this.setDefaultWidgetsData();
    this.determineandSetSearchPageHeight();
    var LEData=this.getLEListForFormAction("frmCustomerManagement",'VIEW');
  //  var LEData=this.getCurrentUserLEArr();
    this.sortBy = this.getObjectSorter("companyName");
    LEData = LEData.sort(this.sortBy.sortData);
    this.LegalEntityDropdown(LEData);
    
  },
  setCreateButtonRight: function () {
    var flxScroll = document.getElementById("frmCustomerManagement_flxMainContent");
    var scrollWidth = flxScroll.offsetWidth - flxScroll.clientWidth;
    this.view.btnCreateCustomer.right = 34 + scrollWidth + "px";
  },
  setCompaniesData: function (companies) {
    var data = [];
    data = companies.map(
      function (element) {
        return {
          "lblViewFullName": element.Name,
          "companyId": element.id,
          "flxAssignUsers": "flxAssignUsers",
          "template": "flxAssignUsers"
        }
      });
    var datamap = {
      "lblViewFullName": "lblViewFullName",
      "flxAssignUsers": "flxAssignUsers"
    }
    this.view.segCompanyDropdown.widgetDataMap = datamap;
    this.view.segCompanyDropdown.setData(data);
    this.view.segCompanyDropdown.info = {
      "data": data,
      "SearchandSortData": data
    }
  },
  setCategorySegmentHeight: function () {
    this.view.forceLayout();
    var height = this.view.alerts.flxSubAlerts.frame.height +
      parseInt(this.view.alerts.flxSubAlerts.top.slice(0, -2)) - 20;
    if (height < 350) {
      this.view.alerts.flxAlertCategory.height = "350px";
    } else {
      this.view.alerts.flxAlertCategory.height = height + "px";
    }
  },

  mapCategoryData: function (data) {
    return {
      "categoryName": {
        "text": data.alertType.toUpperCase(),
        "skin": "sknlblLatoBold485c7512px"
      },
      "Enabled": data.isSelected,
      "alerts": data.alerts,
      "icon": ""
    };
  },
  determineandSetSearchPageHeight: function () {
    if (this.view.CustomerSearchandResults.flxNoResultsFound.isVisible) {
      this.view.CustomerSearchandResults.height = 770 + "px";
    } else {
      this.view.CustomerSearchandResults.height = ((670) + this.view.CustomerSearchandResults.segCustomerResults.data.length * 200) + "px";
    }
  },
  customerManagementPreshow: function () {
    // Customer Management preshow
    this.hideAll();
    this.view.CustomerSearchandResults.lblSearchEntity.text= kony.i18n.getLocalizedString("i18n.frmcustomermanagementcontroller.Entity");
    this.view.CustomerSearchandResults.lblSearchUserId.text= kony.i18n.getLocalizedString("i18n.konybb.common.userId");
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setFlowActions();
    this.showSearchScreen();
    this.view.flxMain.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.mainHeader.lblHeading.left = "3%";
    this.toggleAdvancedSearch(true);
    this.view.forceLayout();
  },
    customerManagementPostshow:function(){
      this.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmCustomerManagement_CustomerSearchandResults_txtSearchParam6');

    },
  toggleAdvancedSearch: function (flag) {
    if (flag) {
      this.openAdvancedSearch();
    } else if (flag === null || flag === undefined) {
      if (this.view.CustomerSearchandResults.flxSecondRow.isVisible) {
        this.closeAdvancedSearch();
      } else {
        this.openAdvancedSearch();
      }
    } else {
      this.closeAdvancedSearch();
    }
    this.view.CustomerSearchandResults.forceLayout();
  },
    
  openAdvancedSearch: function () {
    this.view.CustomerSearchandResults.btnAdvSearch.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.HideAdvancedsearch");
    this.view.CustomerSearchandResults.fonticonrightarrow.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.fontIconUpArrow");
    this.view.CustomerSearchandResults.flxSecondRow.setVisibility(true);
    this.view.CustomerSearchandResults.flxThirdRow.setVisibility(true);
   // this.view.CustomerSearchandResults.flxSearchContainer.height = "445px";
    this.view.CustomerSearchandResults.flxSearch.height = "385px";
  },
  closeAdvancedSearch: function () {
    this.view.CustomerSearchandResults.btnAdvSearch.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.Advancedsearch");
    this.view.CustomerSearchandResults.fonticonrightarrow.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.fontIconBreadcrumbsRight");
    this.view.CustomerSearchandResults.flxSecondRow.setVisibility(false);
    this.view.CustomerSearchandResults.flxThirdRow.setVisibility(false);
   // this.view.CustomerSearchandResults.flxSearchContainer.height = "250px";
    this.view.CustomerSearchandResults.flxSearch.height = "190px";
  },
  resetAllSortImagesSearchResults: function () {
    if (this.view.fonticonSortExistingCustomerName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortExistingCustomerName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortExistingCustomerName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortExistingCustomerUserId.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortExistingCustomerUserId.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortExistingCustomerUserId.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortExistingCustomerUsername.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortExistingCustomerUsername.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortExistingCustomerUsername.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortExistingCustomerContactNumber.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortExistingCustomerContactNumber.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortExistingCustomerContactNumber.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortExistingCustomerEmailId.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortExistingCustomerEmailId.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortExistingCustomerEmailId.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortExistingCustomerSSN.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortExistingCustomerSSN.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortExistingCustomerSSN.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
  }, 
    LegalEntityDropdown: function(segData)
    {
      var widgetMap = {
        "flxSearchDropDown": "flxSearchDropDown",
        "lblDescription": "lblDescription",
        "branches":"branches",
        "region":"region",
        "id":"id"

      };
      var data=segData;
      var LegalEntityData = data.map(function(rec) {
        return {
          "lblDescription": rec.companyName,
          "branches":rec.branch,
          "region":rec.region,
          "id":rec.id,
          "flxSearchDropDown":{"hoverSkin":"sknFlxBgd7effa"},
        };
      });
      if(data.length>0){
        this.view.CustomerSearchandResults.lblSelectLegalEntity.text =  data.length > 0 ? (data[0].companyName): kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity") ;
        this.view.CustomerSearchandResults.lblSelectLegalEntity.info = {"id" :  data.length > 0 ? data[0].id : ""};
        this.view.CustomerSearchandResults.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
      }
      else if(this.view.CustomerSearchandResults.lblSelectLegalEntity.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity")){
      }
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setData(LegalEntityData);
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.info = {
        "data": LegalEntityData
      };
      this.view.CustomerSearchandResults.productTypeFilterMenu.flxNoResultFound.setVisibility(LegalEntityData.length==0);
      this.view.CustomerSearchandResults.productTypeFilterMenu.lblNoResultFoundPF.text = "No Legal Entity available"
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(LegalEntityData.length > 0);
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex = [0,1];
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
      this.view.forceLayout();
    },
  hideAll: function () {
    // Customer Management hideAll
    this.customNavigateBack = null;
    this.view.flxMainContent.setVisibility(false);
    this.view.CustomerSearchandResults.setVisibility(false);
    this.view.CustomerSearchandResults.lblTINBusinessTag.setVisibility(false);
    this.view.forceLayout();
  },
  hideHeaderButtons: function () {
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(false);
    this.view.btnNotes.setVisibility(false);
  },

  selectRadioButtons: function (selectedButton, buttonsArray) {
    for (var i = 0; i < buttonsArray.length; i++) {
      buttonsArray[i].src = this.radioNotSelected;
    }
    selectedButton.src = this.radioSelected;
  },
  setDefaultWidgetsData: function () {
    // Customer Management setDefaultWidgetsData
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.customer_Management");
    this.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
    this.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
    this.setNormalSkinToAllFeilds();
    this.view.flxCompanyDropdown.top = "345px";
    this.view.CustomerSearchandResults.listboxCustomerType.width = "120px";
    this.view.CustomerSearchandResults.flxNoResultsFound.top = "60px";
    this.showCustomerSearch();
    this.setCustomerTypeListbox();
    this.view.CustomerSearchandResults.listboxSearchParam5.selectedKey = "ID_DRIVING_LICENSE";
    this.view.CustomerSearchandResults.txtSearchParam5.placeholder =
      kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EnterLicenseNo");
    this.view.CustomerSearchandResults.btnReset.skin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
    this.view.CustomerSearchandResults.btnReset.hoverSkin = "sknbtnffffffLatoRegular4f555dBorder1px485c75";
    this.view.CustomerSearchandResults.btnReset.focusSkin = "sknbtnffffffLatoRegular4f555dBorder1px485c75";
    this.view.forceLayout();
  },
  setCustomerTypeListbox: function () {
    var customerTypes = [];
    customerTypes.push(["ALL", "All Customers"]);
    customerTypes.push([this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE, "Retail"]);
    customerTypes.push([this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE, "Business"]);
    customerTypes.push([this.AdminConsoleCommonUtils.constantConfig.APPLICANT, "Applicant"]);
    this.view.CustomerSearchandResults.listboxCustomerType.masterData = customerTypes;
  },
  showError: function (Widget) {
    var ErrorSkinTbx = "skntbxBordereb30173px";
    var ErrorSkinLst = "sknlbxeb30173px";

    if (Widget.wType === "TextField")
      Widget.skin = ErrorSkinTbx;
    else
      Widget.skin = ErrorSkinLst;
    //lblError.isVisible=true;
  },

  showNoError: function (Widget) {
    var NormalSkinTbx = "skntxtbxDetails0bbf1235271384a";
    var NormalSkinLst = "sknlstbxNormal0f9abd8e88aa64a";

    if (Widget.wType === "TextField")
      Widget.skin = NormalSkinTbx;
    else
      Widget.skin = NormalSkinLst;
    //lblError.isVisible=false;
  },

  downloadCSV: function (fileID) {
    var authToken = KNYMobileFabric.currentClaimToken;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var mfURL = KNYMobileFabric.mainRef.config.selflink;
    mfURL = mfURL.substring(0, mfURL.indexOf("/authService"));
    var downloadURL = mfURL + "/services/data/v1/CustomerManagementObjService/operations/Customer/downloadCustomerCSV?X-Kony-Authorization=" + authToken + "&User_id=" + user_ID + "&customerfileId=" + fileID;

    var encodedURI = encodeURI(downloadURL);

    var downloadLink = document.createElement("a");
    downloadLink.href = encodedURI;
    downloadLink.download = "CustomersCSV.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },
  downloadCustomersCSV: function () {
    var authToken = KNYMobileFabric.currentClaimToken;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var mfURL = KNYMobileFabric.mainRef.config.selflink;
    mfURL = mfURL.substring(0, mfURL.indexOf("/authService"));
    var downloadURL = mfURL + "/services/data/v1/CustomerManagementObjService/operations/Customer/download?authToken=" + authToken + "&user_ID=" + user_ID;
    var scopeObj = this;
    if (scopeObj.getNameSearchText() !== "") {
      downloadURL = downloadURL + "&_name=" + scopeObj.getNameSearchText();
    }
    if (scopeObj.view.CustomerSearchandResults.txtSearchParam2.text !== "") {
      downloadURL = downloadURL + "&_email=" + scopeObj.view.CustomerSearchandResults.txtSearchParam2.text;
    }
    if (scopeObj.view.CustomerSearchandResults.txtSearchParam7.text !== "") {
      downloadURL = downloadURL + "&_customerId=" + scopeObj.view.CustomerSearchandResults.txtSearchParam7.text;
    }
    if (scopeObj.view.CustomerSearchandResults.txtSearchParam6.text !== "") {
      downloadURL = downloadURL + "&_phone=" + scopeObj.view.CustomerSearchandResults.txtSearchParam6.text;
    }
    // if existing customer
    if (scopeObj.view.CustomerSearchandResults.imgRadioExistingCustomer.src === "radio_selected.png") {

      downloadURL = downloadURL + "&_searchType=CUSTOMER_SEARCH";

      if (scopeObj.view.CustomerSearchandResults.advanceSearch.listBoxSearchParam1.selectedKey !== "lbl1") {
        downloadURL = downloadURL + "&_group=" + scopeObj.view.CustomerSearchandResults.advanceSearch.listBoxSearchParam1.selectedKeyValue[1];
      }
      if (scopeObj.view.CustomerSearchandResults.txtSearchParam3.text !== "") {
        downloadURL = downloadURL + "&_username=" + scopeObj.view.CustomerSearchandResults.txtSearchParam3.text;
      }
      if (scopeObj.view.CustomerSearchandResults.txtSearchParam10.text !== "") {
        downloadURL = downloadURL + "&_SSN=" + scopeObj.view.CustomerSearchandResults.txtSearchParam10.text;
      }
      if (scopeObj.view.CustomerSearchandResults.advanceSearch.txtSearchParam7.text !== "") {
        downloadURL = downloadURL + "&_requestID=" + scopeObj.view.CustomerSearchandResults.advanceSearch.txtSearchParam7.text;
      }
    } else { // for applicant 
      downloadURL = downloadURL + "&_searchType=APPLICANT_SEARCH";
    }
    downloadURL = downloadURL + "&offset=" + new Date().getTimezoneOffset() ;
    downloadURL = downloadURL + "&_sortVariable=" + scopeObj.loadMoreModel.SortVariable;
    downloadURL = downloadURL + "&_sortDirection=" + scopeObj.loadMoreModel.SortDirection;
    downloadURL = downloadURL + "&_pageOffset=0";
    downloadURL = downloadURL + "&_pageSize=" + scopeObj.loadMoreModel.RecordsOnPage;

    var encodedURI = encodeURI(downloadURL);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedURI;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },
  getNameSearchText: function () {
    var firstname = this.view.CustomerSearchandResults.txtSearchParam1.text.trim();
    var lastname = this.view.CustomerSearchandResults.txtSearchCriteria9.text.trim();
    var name = "";
    if (firstname !== "" && lastname !== "")
      name += firstname + " " + lastname;
    else if (firstname !== "")
      name += firstname;
    else if (lastname !== "")
      name += lastname;

    return name;
  },
  setErrorSkinToAllFeilds: function(){
    this.view.CustomerSearchandResults.txtSearchParam2.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam3.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam5.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam6.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam7.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam8.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam9.skin = "skntbxBordereb30173px";
    this.view.CustomerSearchandResults.txtSearchParam10.skin = "skntbxBordereb30173px";
  },
  setNormalSkinToAllFeilds: function(){
    this.view.CustomerSearchandResults.txtSearchParam2.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.txtSearchParam3.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.txtSearchParam5.skin = "sknTbx485c75Reg13pxBRe1e5edR1pxTBRSide";
    this.view.CustomerSearchandResults.txtSearchParam6.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.txtSearchParam7.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.txtSearchParam8.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.txtSearchParam9.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.txtSearchParam10.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.CustomerSearchandResults.flxSelectLegalEntity.skin = "slfFlxe1e5ed";
    this.view.CustomerSearchandResults.flxError.setVisibility(false);
  },
    validateSearchFields: function () {
      if (this.view.CustomerSearchandResults.lblSelectLegalEntity.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity"))
        return false;
      else{
        if (this.view.CustomerSearchandResults.txtSearchParam9.text.trim() === "" &&
            this.view.CustomerSearchandResults.txtSearchParam7.text.trim() === "" &&
            this.view.CustomerSearchandResults.txtSearchParam2.text.trim() === "" &&
            this.view.CustomerSearchandResults.txtSearchParam6.text.trim() === "" &&
            this.view.CustomerSearchandResults.txtSearchParam3.text.trim() === "" &&
            this.view.CustomerSearchandResults.txtSearchParam5.text.trim() === "" &&
            this.view.CustomerSearchandResults.txtSearchParam8.text.trim() === ""){
          return false;
        } else{
          return true;
        }
      }
    },
  clearSearchFeilds: function(){
    this.view.CustomerSearchandResults.txtSearchParam2.text = "";
   // this.view.CustomerSearchandResults.lblSelectLegalEntity.text = kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity");
    this.view.CustomerSearchandResults.lblSelectLegalEntity.skin = "sknlbllatoRegularB2BDCB13px";
    this.view.CustomerSearchandResults.txtSearchParam3.info = null;
    this.view.CustomerSearchandResults.txtSearchParam3.text = "";
    this.view.CustomerSearchandResults.txtSearchParam5.text = "";
    this.view.CustomerSearchandResults.txtSearchParam6.text = "";
    this.view.CustomerSearchandResults.txtSearchParam7.text = "";
    this.view.CustomerSearchandResults.txtSearchParam8.text = "";
    this.view.CustomerSearchandResults.lblSelectLegalEntity.cond=1;
    this.view.CustomerSearchandResults.txtSearchParam5.placeholder =
    kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EnterLicenseNo");
    this.view.CustomerSearchandResults.listboxSearchParam5.selectedKey = "ID_DRIVING_LICENSE";
  },
  resetSearchParameters: function (flag) {
    // Customer Management resetSearchParameters
    if (flag) {
      this.clearSearchFeilds();
      this.setNormalSkinToAllFeilds();
      this.view.CustomerSearchandResults.segCustomerResults.setVisibility(false);
      this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(false);
      this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
      this.view.CustomerSearchandResults.flxLegalEntityOptions.setVisibility(false);
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.text = "";
      this.view.CustomerSearchandResults.flxError.setVisibility(false);     
      this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex = null;
    }
  },

  showApplicantSearch: function () {
    // Customer Management showApplicantSearch
    this.view.CustomerSearchandResults.imgRadioExistingCustomer.src = this.radioNotSelected;
    this.view.CustomerSearchandResults.imgRadioApplicant.src = this.radioSelected;
    this.view.CustomerSearchandResults.advanceSearch.flxAdvancedSearchHeader.setVisibility(false);
    this.view.CustomerSearchandResults.advanceSearch.setVisibility(false);
    this.view.CustomerSearchandResults.flxSearchCriteria5.setVisibility(false);
    this.view.CustomerSearchandResults.flxFouthRow.setVisibility(false);
    this.view.CustomerSearchandResults.lblSearchParam3.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Application_ID");
    this.view.CustomerSearchandResults.txtSearchParam3.placeholder = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Application_ID");
    this.view.forceLayout();
  },
  showCustomerSearch: function () {
    this.view.flxCompanyDropdown.setVisibility(false);
    this.view.forceLayout();
  },
  getUniqueList: function (segmentWidget, label) {
    return (Array.from(new Set(segmentWidget.info.data.map(function (item) { return item[label]; }))))
      .map(function (item) {
      return {
        "flxCheckBox": "flxCheckBox", "flxSearchDropDown"
        : "flxSearchDropDown", lblDescription: item, imgCheckBox: { src: "checkboxselected.png" }
      };
    });
  },
  searchandSetCompanies: function () {
    if (this.view.segCompanyDropdown.info) {
      var masterDataset = this.view.segCompanyDropdown.info.data;
      var filtereddata = masterDataset;
      //       var filtereddata = masterDataset.filter(function (element) {
      //         return element.lblViewFullName.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
      //       });

      if (filtereddata.length === 0) {
        this.view.segCompanyDropdown.setVisibility(false);
        this.view.richtextNoResult.setVisibility(true);
      } else {
        this.view.segCompanyDropdown.info.SearchandSortData = filtereddata;
        this.view.segCompanyDropdown.setData(filtereddata);
        this.view.segCompanyDropdown.setVisibility(true);
        this.view.richtextNoResult.setVisibility(false);
      }
      this.view.flxCompanyDropdown.setVisibility(true);
      this.view.flxCompanyDropdown.width = this.view.CustomerSearchandResults.txtSearchParam3.frame.width;
      this.view.forceLayout();
    }

  },
  sortfunction : function (a, b) {
    return (a.lblCustomerName.toLowerCase() < b.lblCustomerName.toLowerCase()) ? 1 :
      ((b.lblCustomerName.toLowerCase() < a.lblCustomerName.toLowerCase()) ? -1 : 0);
  },
  setFlowActions: function () {
    // Customer Management setFlowActions
    var scopeObj = this;
    this.view.CustomerSearchandResults.listboxSearchParam5.onSelection = function () {
      var selectedKey = scopeObj.view.CustomerSearchandResults.listboxSearchParam5.selectedKey;
      if (selectedKey === "ID_DRIVING_LICENSE") {
        scopeObj.view.CustomerSearchandResults.txtSearchParam5.placeholder =
          kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EnterLicenseNo");
      } else if (selectedKey === "ID_SSN") {
        scopeObj.view.CustomerSearchandResults.txtSearchParam5.placeholder =
          kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EnterSSN");
      } else if (selectedKey === "ID_PASSPORT") {
        scopeObj.view.CustomerSearchandResults.txtSearchParam5.placeholder =
          kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EnterPassportNo");
      } else if (selectedKey === "ID_TIN") {
        scopeObj.view.CustomerSearchandResults.txtSearchParam5.placeholder =
          kony.i18n.getLocalizedString("i18n.frmCustomerManagement.EnterTIN");
      }
    };
    this.view.CustomerSearchandResults.listboxCustomerType.onSelection = function () {
      var selectedKey = scopeObj.view.CustomerSearchandResults.listboxCustomerType.selectedKey;
      var data = scopeObj.view.CustomerSearchandResults.segCustomerResults.info.data;
      if (selectedKey === "ALL") {
        scopeObj.view.CustomerSearchandResults.segCustomerResults.setData(data);
      } else {
        data = data.filter(
          function (element) {
            return element.CustomerType === selectedKey;
          });
        scopeObj.view.CustomerSearchandResults.segCustomerResults.setData(data);
      }
      if (data.length === 0) {
        scopeObj.view.CustomerSearchandResults.segCustomerResults.setVisibility(false);
        scopeObj.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
      } else {
        scopeObj.view.CustomerSearchandResults.segCustomerResults.setVisibility(true);
        scopeObj.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(false);
      }
      scopeObj.view.CustomerSearchandResults.segCustomerResults.info.searchAndSortData = data;
      scopeObj.view.CustomerSearchandResults.fonticonSortByName.text = scopeObj.ascendingSortIcon;
      scopeObj.view.forceLayout();
    };
     this.view.CustomerSearchandResults.flxLegalEntityOptions.onHover = this.onDropDownsHoverCallback;
     
    this.view.segCompanyDropdown.onRowClick = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
      scopeObj.view.flxCompanyDropdown.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.txtSearchParam3.text = scopeObj.view.segCompanyDropdown.selecteditems[0].lblViewFullName;
      scopeObj.view.CustomerSearchandResults.txtSearchParam3.info = {
        "companyId": scopeObj.view.segCompanyDropdown.selecteditems[0].companyId
      }
    };
    this.view.CustomerSearchandResults.btnReset.onClick = function(){
      scopeObj.clearSearchFeilds();
    };
    this.view.flxRightPanel.onClick = function () {
      if (scopeObj.view.flxCompanyDropdown.isVisible) {
        scopeObj.view.flxCompanyDropdown.setVisibility(false);
        scopeObj.view.CustomerSearchandResults.txtSearchParam3.text = "";
        scopeObj.view.CustomerSearchandResults.txtSearchParam3.info = null;
      }
    };
    this.view.CustomerSearchandResults.flxSortIconWrapper.onClick = function () {

      var self = scopeObj, data = scopeObj.view.CustomerSearchandResults.segCustomerResults.info.searchAndSortData;
      if (scopeObj.view.CustomerSearchandResults.fonticonSortByName.text === scopeObj.ascendingSortIcon) {
        data.sort(function (a, b) { return self.sortfunction(a, b); });
        scopeObj.view.CustomerSearchandResults.fonticonSortByName.text = scopeObj.desendingSortIcon;

      } else {
        data.sort(function (a, b) { return self.sortfunction(b, a); });
        scopeObj.view.CustomerSearchandResults.fonticonSortByName.text = scopeObj.ascendingSortIcon;
      }
      scopeObj.view.CustomerSearchandResults.segCustomerResults.setData(data);
      scopeObj.view.CustomerSearchandResults.forceLayout();
    };
    this.view.CustomerSearchandResults.flxRadioimg1unselected.onClick = function () {
      scopeObj.setRadiobtnVisbility(1);
    };
    this.view.CustomerSearchandResults.flxRadioimg2unselected.onClick = function () {
      scopeObj.setRadiobtnVisbility(2);
    };
    this.view.CustomerSearchandResults.flxradioimg1selected.onClick = function () {
      scopeObj.setRadiobtnVisbility(1);
    };
    this.view.CustomerSearchandResults.flxradioimg2selected.onClick = function () {
      scopeObj.setRadiobtnVisbility(2);
    };
    this.view.toastMessage.flxRightImage.onClick = function () {
      scopeObj.hideToastMessage();
    };
    this.view.CustomerSearchandResults.btnAdvSearch.onClick = function () {
      scopeObj.toggleAdvancedSearch();
    };
    this.view.CustomerSearchandResults.fonticonrightarrow.onClick = function () {
      scopeObj.toggleAdvancedSearch();
    };
    this.view.CustomerSearchandResults.btnSave.onClick = function () {
      scopeObj.searchForCustomers();
      scopeObj.cusidsearch();
    };
    this.view.CustomerSearchandResults.btnSave1.onClick = function () {
      var params = {
        "userId": scopeObj.view.CustomerSearchandResults.txtSearchParam3.text.trim() ||"",
    }
    // this.presenter.customerSearchByUserName(params, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer"));
    scopeObj.presenter.customerSearchByUserName1(params,1);
    scopeObj.useridsearch();
    };
    this.view.CustomerSearchandResults.txtSearchParam2.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam3.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam5.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam6.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam7.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam8.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam9.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.txtSearchParam10.onDone = function () {
      scopeObj.searchForCustomers();
    };
    this.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.onRowClick = function() {
            var rowInd = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.selectedRowIndex[1];
            var segData = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.data;
            if(segData[rowInd].lblDescription !== "LEGAL ENTITY")
           {
            scopeObj.view.CustomerSearchandResults.lblSelectLegalEntity.text = segData[rowInd].lblDescription;
            scopeObj.view.CustomerSearchandResults.lblSelectLegalEntity.info={"id":segData[rowInd].id};
            scopeObj.view.CustomerSearchandResults.flxLegalEntityOptions.setVisibility(false);
            scopeObj.view.CustomerSearchandResults.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
            scopeObj.setNormalSkinToAllFeilds();
           }
        };
     this.view.CustomerSearchandResults.productTypeFilterMenu.tbxSearchBox.onKeyUp = function() {
            if (scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.tbxSearchBox.text.trim().length > 0) {
                scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxClearSearchImage.setVisibility(true);
                var segData = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.data;
                var searchText = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.tbxSearchBox.text;
                var statusName = "";
                var filteredData = segData.filter(function(rec) {
                    statusName = rec.lblDescription.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0)
                    { 
                      scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxClearSearchImage.setVisibility(true);
                      return rec;
                    }
                });
                if (filteredData.length === 0) {
                    scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(false);
                    scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxNoResultFound.setVisibility(true);
                } else {
                    scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setData(filteredData);
                    scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(true);
                    scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
                    
                }
            } else {
               scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
                var totalRecords = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.info.data;
                scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
            }
            scopeObj.view.forceLayout();
        },
       this.view.CustomerSearchandResults.productTypeFilterMenu.flxClearSearchImage.onClick = function() {
            scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxClearSearchImage.setVisibility(false);
            scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.tbxSearchBox.text = "";
            var totalRecords = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.info.data;
            scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setData(totalRecords);
            scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(true);
            scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxNoResultFound.setVisibility(false);
        },

    this.view.CustomerSearchandResults.segCustomerResults.onRowClick = function () {

      var id = scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].CustomerId ||
          scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].primaryCustomerId;
      var partyId = scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].partyId;
      var target = "InfoScreen";
      var legalEntityId =scopeObj.view.CustomerSearchandResults.segCustomerResults.selecteditems[0].branchId;
      //to clear any previous form navigation data in variable
      var previousFormDetails = {"name":"frmCustomerManagement","data":""};
      scopeObj.presenter.CustomerLegalEntitiesGetOperation(
        {
          "customerId": id,
        }
      ); 
      scopeObj.presenter.getCustomerBasicInfo(
        { "Customer_id": id,
         "legalEntityId": legalEntityId || " ",
        "partyId": partyId},
        target, previousFormDetails
      );
      scopeObj.view.forceLayout();
    };
    this.view.CustomerSearchandResults.txtSearchParam2.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
    };
    
    //****************************************************************************
    /*
      Implemented Debouncing which will limit the Service Calls
        by making the service call only when the difference between the 2 keyUp events 
        is more than a particular time interval (here 300 milliseconds)
    */
    const getFilteredCompaniesList = function (searchText) {
      scopeObj.presenter.getFilteredCompanies(searchText);
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
    
    const showCompaniesList = debounce(getFilteredCompaniesList,300);
    //***************************************************************************
    this.view.CustomerSearchandResults.txtSearchParam3.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
      //scopeObj.searchandSetCompanies(scopeObj.view.CustomerSearchandResults.txtSearchParam3.text);
      let searchText = scopeObj.view.CustomerSearchandResults.txtSearchParam3.text;
      /*if(searchText && searchText.trim() !== '' && searchText.length > 2){
        showCompaniesList(searchText);
      }*/
    };

    this.view.CustomerSearchandResults.txtSearchParam3.onTouchStart = function () {
      scopeObj.view.CustomerSearchandResults.txtSearchParam3.info = null;
    };
    this.view.CustomerSearchandResults.txtSearchParam5.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
    };
    this.view.CustomerSearchandResults.txtSearchParam5.onBeginEditing = function () {
      if(scopeObj.view.CustomerSearchandResults.listboxSearchParam5.selectedKey === "ID_TIN"){
        scopeObj.view.CustomerSearchandResults.lblTINBusinessTag.setVisibility(true);
        scopeObj.view.CustomerSearchandResults.forceLayout();
      } 
    };
    this.view.CustomerSearchandResults.txtSearchParam5.onEndEditing = function () {
      if(scopeObj.view.CustomerSearchandResults.listboxSearchParam5.selectedKey === "ID_TIN"){
        scopeObj.view.CustomerSearchandResults.lblTINBusinessTag.setVisibility(false);
        scopeObj.view.CustomerSearchandResults.forceLayout();
      }
    };
    this.view.CustomerSearchandResults.txtSearchParam6.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
    };
    this.view.CustomerSearchandResults.txtSearchParam7.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
    };
    this.view.CustomerSearchandResults.txtSearchParam9.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
    };
    this.view.CustomerSearchandResults.txtSearchParam10.onKeyUp = function () {
      scopeObj.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      scopeObj.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      scopeObj.setNormalSkinToAllFeilds();
    };

    this.view.btnCreateCustomer.onClick = function () {
      scopeObj.presenter.CSRAssistCustomerOnboarding();
      
    };
    this.view.CustomerSearchandResults.lblCreateCustomer.onClick = function(){
      //scopeObj.presenter.showEligibilityCriteria();
      //scopeObj.presenter.showNewCustomerScreen();
     // scopeObj.presenter.CSRAssistCustomerOnboarding();
    };
    this.view.CustomerSearchandResults.flxSelectLegalEntity.onClick = function(){
      var cond = scopeObj.view.CustomerSearchandResults.lblSelectLegalEntity.cond;
      var segmntData = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.data;
      scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxClearSearchImage.onClick();
      if(segmntData.length === 2 && cond!=1){ // dropdown not required if only one LE available
        scopeObj.view.CustomerSearchandResults.flxLegalEntityOptions.setVisibility(false);
      }
      else {
        scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.setVisibility(segmntData.length > 0);
        scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.flxNoResultFound.setVisibility(segmntData.length == 0);
        if(scopeObj.view.CustomerSearchandResults.flxLegalEntityOptions.isVisible === false) {
          scopeObj.view.CustomerSearchandResults.flxLegalEntityOptions.setVisibility(true);
        } else {
          scopeObj.view.CustomerSearchandResults.flxLegalEntityOptions.setVisibility(false);
        }
      }

      //    var segData = scopeObj.view.CustomerSearchandResults.productTypeFilterMenu.segStatusFilterDropdown.data;
    };
   
  },

  getCustomerSearchFields: function () {

    var searchObject = {
      "_phone": this.view.CustomerSearchandResults.txtSearchParam6.text || "",
      "_username": this.view.CustomerSearchandResults.txtSearchParam3.text || "",
      "_cardorAccountnumber":this.view.CustomerSearchandResults.txtSearchParam10.text || "",
      "_customerId": this.view.CustomerSearchandResults.txtSearchParam7.text || "",
      "_name": this.view.CustomerSearchandResults.txtSearchParam9.text || "",
      "_email": this.view.CustomerSearchandResults.txtSearchParam2.text || "",
      "_applicationId": this.view.CustomerSearchandResults.txtSearchParam8.text || "",
      "_legalEntityId": this.view.CustomerSearchandResults.lblSelectLegalEntity.info.id || ""
    };

    if (this.view.CustomerSearchandResults.txtSearchParam5.text !== "") {
      if (this.view.CustomerSearchandResults.listboxSearchParam5.selectedKey === "ID_SSN") {
        searchObject["_SSN"] = this.view.CustomerSearchandResults.txtSearchParam5.text;
      }else if (this.view.CustomerSearchandResults.listboxSearchParam5.selectedKey === "ID_TIN") {
        searchObject["_TIN"] = this.view.CustomerSearchandResults.txtSearchParam5.text;
      } else {
        searchObject["_IDType"] = this.view.CustomerSearchandResults.listboxSearchParam5.selectedKey;
        searchObject["_IDValue"] = this.view.CustomerSearchandResults.txtSearchParam5.text;
      }
    }
    return searchObject;
  },
  searchForCustomers: function () {
    this.scrollHeight = 0;
    if (this.validateSearchFields()) {
      //Disable the error
      this.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      this.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      this.view.CustomerSearchandResults.flxError.setVisibility(false);
      if (this.view.CustomerSearchandResults.flxResults.isVisible){
        //var customer_id= this.view.CustomerSearchandResults.txtSearchParam7.text;
        this.view.CustomerSearchandResults.lblResultsHeader.text=kony.i18n.getLocalizedString("i18n.contracts.searchResults");
      }
      if( this.view.CustomerSearchandResults.flxSearchbyUserId.isVisible){
        var user_id=this.view.CustomerSearchandResults.txtSearchParam3.text;
        this.view.CustomerSearchandResults.lblResultsHeader.text=kony.i18n.getLocalizedString("i18n.customermanagementcontroller.Searchbyuserid")+user_id;
      }  
      this.setNormalSkinToAllFeilds();
      var searchParam;
      searchParam = this.getCustomerSearchFields();
      searchParam["_pageOffset"] = "0";
      searchParam["_pageSize"] = "100";
      searchParam["_sortVariable"] = "name";
      searchParam["_sortDirection"] = "ASC";
      this.presenter.searchCustomers(searchParam, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer"));
    } else {
      this.view.CustomerSearchandResults.lblSearchError.setVisibility(false);
      this.view.CustomerSearchandResults.imgSearchError.setVisibility(false);
      if(this.view.CustomerSearchandResults.lblSelectLegalEntity.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity"))
      {
        this.view.CustomerSearchandResults.flxError.setVisibility(true);
        this.view.CustomerSearchandResults.flxSelectLegalEntity.skin = "sknFlxCalendarError";
      }
      else {
        this.view.CustomerSearchandResults.lblSearchError.setVisibility(true);
        this.view.CustomerSearchandResults.imgSearchError.setVisibility(true);
        this.view.CustomerSearchandResults.lblSearchError.text=kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblSearchError");
        this.setErrorSkinToAllFeilds();
      }
    }

    //Disable company dropbox
    if (this.view.flxCompanyDropdown.isVisible) {
      this.view.flxCompanyDropdown.setVisibility(false);
      this.view.CustomerSearchandResults.txtSearchParam3.text = "";
      this.view.CustomerSearchandResults.txtSearchParam3.info = null;
    }
  },
  storeScrollHeight: function (widget) {
    try {
      this.scrollHeight = widget.contentOffsetMeasured.y < 0 ? (widget.contentOffsetMeasured.y) * (-1) : (widget.contentOffsetMeasured.y);
    } catch (ignored) { }
  },
  scrollToDefaultHeight: function (widget) {
    this.view.forceLayout();
    try {
      widget.setContentOffset({
        y: this.scrollHeight,
        x: 0
      });
    } catch (ignored) { }
  },
  setRadiobtnVisbility: function (set) {
    if (set===1){
       if (this.view.CustomerSearchandResults.flxradioimg1selected.isVisible){
         
         this.view.CustomerSearchandResults.flxRadioimg1unselected.setVisibility(true);
         this.view.CustomerSearchandResults.flxradioimg1selected.setVisibility(false);
         this.view.CustomerSearchandResults.flxSearch.setVisibility(false);
         this.view.CustomerSearchandResults.flxradioimg2selected.setVisibility(true);
         this.view.CustomerSearchandResults.flxRadioimg2unselected.setVisibility(false);
         this.view.CustomerSearchandResults.flxSearchbyUserId.setVisibility(true);
         this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
         this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
         this.view.CustomerSearchandResults.segNoResults.setVisibility(false);
       }
      else {
        this.clearSearchFeilds();
        this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
        this.view.CustomerSearchandResults.segCustomerResults.setData([]);
        this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(false);
        this.view.CustomerSearchandResults.flxRadioimg1unselected.setVisibility(false);
        this.view.CustomerSearchandResults.flxradioimg1selected.setVisibility(true);
        this.view.CustomerSearchandResults.flxSearch.setVisibility(true);
        this.view.CustomerSearchandResults.flxSearchbyUserId.setVisibility(false);
        this.view.CustomerSearchandResults.flxradioimg2selected.setVisibility(false); 
        this.view.CustomerSearchandResults.flxRadioimg2unselected.setVisibility(true);
      } 
    }
    else if (set===2){
        if (this.view.CustomerSearchandResults.flxRadioimg2unselected.isVisible){
          this.clearSearchFeilds();
          this.view.CustomerSearchandResults.segCustomerResults.setData([]);
          this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(false);
          this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
          this.view.CustomerSearchandResults.flxRadioimg2unselected.setVisibility(false);
          this.view.CustomerSearchandResults.flxradioimg2selected.setVisibility(true); 
          this.view.CustomerSearchandResults.flxradioimg1selected.setVisibility(false);
          this.view.CustomerSearchandResults.flxSearch.setVisibility(false);
          this.view.CustomerSearchandResults.flxRadioimg1unselected.setVisibility(true);
          this.view.CustomerSearchandResults.flxSearchbyUserId.setVisibility(true);
          this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
          this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
          this.view.CustomerSearchandResults.segNoResults.setVisibility(false);
        }
      else{
         this.view.CustomerSearchandResults.flxRadioimg2unselected.setVisibility(true);
          this.view.CustomerSearchandResults.flxradioimg2selected.setVisibility(false); 
         this.view.CustomerSearchandResults.flxSearch.setVisibility(true);
          this.view.CustomerSearchandResults.flxSearchbyUserId.setVisibility(false);
         this.view.CustomerSearchandResults.flxradioimg1selected.setVisibility(true);
        
      }
    }
     
  },
  showSearchScreen: function () {
    this.hideAll();
    this.hideHeaderButtons();
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxMainContent.setVisibility(true);
    this.view.CustomerSearchandResults.setVisibility(true);
  },
  showToastMessage: function (toastText) {
    kony.print(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.user_Created") + toastText);
    this.view.toastMessage.lbltoastMessage.text = toastText;
    this.view.toastMessage.flxToastContainer.skin = "sknflxSuccessToast1F844D";
    //this.view.toastMessage.imgLeft.src = "arrow2x.png";
    this.view.toastMessage.fontIconImgLeft.text = "\ue944";
    this.view.flxToastMessage.setVisibility(true);
    var self = this;
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100: {
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        kony.timer.schedule("toastMessageTimer", self.hideToastMessage, 2, false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
    this.view.forceLayout();
  },
  showErrorToastMessage: function (toastText) {
    kony.print(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.user_Created") + toastText);
    this.view.toastMessage.lbltoastMessage.text = toastText;
    this.view.toastMessage.flxToastContainer.skin = "sknFlxErrorToastBgE61919";
    //this.view.toastMessage.imgLeft.src = "alerticon_2x.png";
    this.view.toastMessage.fontIconImgLeft.text = "\ue94b";
    this.view.flxToastMessage.setVisibility(true);
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100: {
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {


      animationEnd: function () { }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  hideToastMessage: function () {
    var self = this;
    var animationDefinition = {

      0: {
        "bottom": "0px"
      },
      100: {
        "bottom": "-70px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {

      animationEnd: function () {
        self.view.flxToastMessage.setVisibility(false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },

  showErrorToastMessageWithLink: function (successCount, failureCount, fileID) {
    this.view.toastMessageWithLink.lblToastMessageLeft.text =
      successCount +
      "/" +
      (successCount + failureCount) +
      kony.i18n.getLocalizedString("i18n.frmLocationsController.records_uploaded");
    this.view.toastMessageWithLink.lblToastMessageRight.text =
      kony.i18n.getLocalizedString("i18n.frmLocationsController.to_download_the_details");
    this.view.toastMessageWithLink.btnToastLink.info = {
      "fileID": fileID
    };
    this.showToastMessageWithLink();
  },
  showToastMessageWithLink: function () {
    this.view.flxToastMessageWithLink.setVisibility(true);
    this.view.toastMessageWithLink.fontIconImgLeft.text = "\ue94b";
    this.view.forceLayout();
    var animationDefinition = {
      0: {
        bottom: "-70px"
      },
      100: {
        bottom: "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () { }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessageWithLink.animate(
      animationDef,
      animationConfiguration,
      callbacks
    );
  },
  hideToastMessageWithLink: function () {
    var self = this;
    var animationDefinition = {
      0: {
        bottom: "0px"
      },
      100: {
        bottom: "-70px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        self.view.flxToastMessageWithLink.setVisibility(false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessageWithLink.animate(
      animationDef,
      animationConfiguration,
      callbacks
    );
  },
  searchFilterHelpcenter: function (record) {
    var scopeObj = this;
    var searchText = this.view.RequestsHelpCenter.tbxSearchBox.text;
    if (typeof searchText === 'string' && searchText.length > 0) {
      if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Requests")) {
        return record.Request_id.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      } else if (scopeObj.view.RequestsHelpCenter.lblHeadingFilter.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer_Notifications")) {
        return record.notificationId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      }
    } else {
      return true;
    }
  },

  uploadFile: function () {
    var self = this;
    var config = {
      selectMultipleFiles: false,
      filter: ["text/csv"]
    };
    kony.io.FileSystem.browse(config, csvCallback);

    function csvCallback(event, filesList) {
      var fileType = filesList[0].name;
      fileType = fileType.substring(fileType.lastIndexOf(".") + 1);
      if (fileType.toUpperCase() === "csv".toUpperCase()) {
        self.showUploadingIndicator(event.target.files[0]);
      } else {
        self.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Incorrect_file_format"));
        return false;
      }
    }
  },
   onDropDownsHoverCallback:function(widget,context){
    var self=this;
    var widgetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
      self.view.CustomerSearchandResults[widgetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.view.CustomerSearchandResults[widgetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      self.view.CustomerSearchandResults[widgetId].setVisibility(false);   
    }
    self.view.forceLayout();
  },

  showUploadingIndicator: function (csvFile) {
    //this.hideAll();
    kony.timer.schedule(
      "mytimer1",
      function () {
        this.uploadingIndicatorCallBack(csvFile);
      }.bind(this),
      4,
      false
    );

    this.view.flxImportCustomers.setVisibility(true);
    this.view.flxUploadingIndiacator.setVisibility(true);
    this.view.forceLayout();
  },
  uploadingIndicatorCallBack: function (csvFile) {
    //TODO: UI for file upload loading
    this.view.flxImportCustomers.setVisibility(false);
    this.view.flxUploadingIndiacator.setVisibility(false);
    //this.showHeaderButtons();
    this.view.forceLayout();

    var csvJSON = {
      "csvFile": csvFile
    };
    this.presenter.UploadCustomerCSV(csvJSON);
  },

  setSearchSegmentData: function (searchModel) {

    var dataMap = {
      "flxRadioButton": "flxRadioButton",
      "imgRadioBtn":"imgRadioBtn",
      "flxApplicantTag": "flxApplicantTag",
      "flxMicroBusinessTag": "flxMicroBusinessTag",
      "flxRetailTag": "flxRetailTag",
      "flxLeadTag": "flxLeadTag",
      "lblUsername": "lblUsername",
      "lblSearchSeparator2":  "lblSearchSeparator2",
      "flxRightContainer": "flxRightContainer",
      "flxCustomerResults": "flxCustomerResults",
      "flxRow2":"flxRow2",
      "flxDataContainer1": "flxDataContainer1",
      "flxDataContainer2": "flxDataContainer2",
      "flxDataContainer3": "flxDataContainer3",
      "flxDataContainer4": "flxDataContainer4",
      "flxDataContainer5": "flxDataContainer5",
      "flxDataContainer6": "flxDataContainer6",
      "flxDataContainer7": "flxDataContainer7",
      "flxInnerContainer": "flxInnerContainer",
      "flxLeftContainer": "flxLeftContainer",
      "flxLowerContainer": "flxLowerContainer",
      "flxUpperContainer": "flxUpperContainer",
      "fontIconCircle1": "fontIconCircle1",
      "fontIconCircle2": "fontIconCircle2",
      "fontIconCircle4": "fontIconCircle4",
      "fontIconCircle5": "fontIconCircle5",
      "lblContent1": "lblContent1",
      "lblContent2": "lblContent2",
      "lblContent4": "lblContent4",
      "lblContent5": "lblContent5",
      "lblCustomerName": "lblCustomerName",
      "lblData1": "lblData1",
      "lblData2": "lblData2",
      "lblData3": "lblData3",
      "lblData4": "lblData4",
      "lblData5": "lblData5",
      "lblData6": "lblData6",
      "lblData7": "lblData7",
      "lblHeading1": "lblHeading1",
      "lblHeading2": "lblHeading2",
      "lblHeading3": "lblHeading3",
      "lblHeading4": "lblHeading4",
      "lblHeading5": "lblHeading5",
      "lblHeading6": "lblHeading6",
      "lblHeading7": "lblHeading7",
      "lblStatusValue":"lblStatusValue",
      "lblIconStatus":"lblIconStatus",
      "branchId":"branchId"
    };

    if (searchModel.customers.length > 0) {
      var data = [], self = this;
      this.view.CustomerSearchandResults.fonticonSortByName.text = this.ascendingSortIcon;

      for (var i = 0; i < searchModel.customers.length; i++) {
        var toAdd = this.getFormattedRowWithContract(searchModel.customers[i]);
        data.push(toAdd);
      }
      data.sort(function (a, b) { return self.sortfunction(b, a) });
      this.view.CustomerSearchandResults.segCustomerResults.widgetDataMap = dataMap;
      this.view.CustomerSearchandResults.segCustomerResults.setData(data);
      this.view.CustomerSearchandResults.segCustomerResults.info = {
        "data": data,
        "searchAndSortData": data
      };
      this.view.CustomerSearchandResults.listboxCustomerType.selectedKey = "ALL";
      this.view.CustomerSearchandResults.segNoResults.setVisibility(false);
      this.view.CustomerSearchandResults.segCustomerResults.setVisibility(true);
      this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(true);
      this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(false);
      this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
    }
    else {
      this.view.CustomerSearchandResults.segCustomerResults.setVisibility(false);
      this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(false);
      this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
      this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.searchNoResultFoundCompanies");
    }
    this.determineandSetSearchPageHeight();
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.CustomerSearchandResults.flxResults);
  },

  setSearchSegmentData1: function(searchModel12) {
    var dataMap = {
        "flxRadioButton": "flxRadioButton",
        "imgRadioBtn": "imgRadioBtn",
        "flxApplicantTag": "flxApplicantTag",
        "flxMicroBusinessTag": "flxMicroBusinessTag",
        "flxRetailTag": "flxRetailTag",
        "flxLeadTag": "flxLeadTag",
        "lblUsername": "lblUsername",
        "lblSearchSeparator2": "lblSearchSeparator2",
        "flxRightContainer": "flxRightContainer",
        "flxCustomerResults": "flxCustomerResults",
        "flxRow2": "flxRow2",
        "flxDataContainer1": "flxDataContainer1",
        "flxDataContainer2": "flxDataContainer2",
        "flxDataContainer3": "flxDataContainer3",
        "flxDataContainer4": "flxDataContainer4",
        "flxDataContainer5": "flxDataContainer5",
        "flxDataContainer6": "flxDataContainer6",
        "flxDataContainer7": "flxDataContainer7",
        "flxInnerContainer": "flxInnerContainer",
        "flxLeftContainer": "flxLeftContainer",
        "flxLowerContainer": "flxLowerContainer",
        "flxUpperContainer": "flxUpperContainer",
        "fontIconCircle1": "fontIconCircle1",
        "fontIconCircle2": "fontIconCircle2",
        "fontIconCircle4": "fontIconCircle4",
        "fontIconCircle5": "fontIconCircle5",
        "lblContent1": "lblContent1",
        "lblContent2": "lblContent2",
        "lblContent4": "lblContent4",
        "lblContent5": "lblContent5",
        "lblCustomerName": "lblCustomerName",
        "lblData1": "lblData1",
        "lblData2": "lblData2",
        "lblData3": "lblData3",
        "lblData4": "lblData4",
        "lblData5": "lblData5",
        "lblData6": "lblData6",
        "lblData7": "lblData7",
        "lblHeading1": "lblHeading1",
        "lblHeading2": "lblHeading2",
        "lblHeading3": "lblHeading3",
        "lblHeading4": "lblHeading4",
        "lblHeading5": "lblHeading5",
        "lblHeading6": "lblHeading6",
        "lblHeading7": "lblHeading7",
        "lblStatusValue": "lblStatusValue",
        "lblIconStatus": "lblIconStatus",
        "branchId": "branchId"
    };
    if (searchModel12.customers.length=== 0) {
        this.view.CustomerSearchandResults.segCustomerResults.setVisibility(false);
        this.view.CustomerSearchandResults.lblNoResult.setVisibility(true);
        this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
        var params = this.presenter.getsearchByUseridError();
        if(params){
          this.showSearchNoResultOrPermission(params);
        } else {
          this.showSearchNoResultOrPermission(1);
        }
       // this.view.CustomerSearchandResults.segNoResults.setVisibility(false);
        //this.view.CustomerSearchandResults.lblNoResult.setVisibility(false);
    } else if (searchModel12.customers.length > 0){
        var data = [],
            self = this;
        this.view.CustomerSearchandResults.fonticonSortByName.text = this.ascendingSortIcon;
        for (var i = 0; i < searchModel12.customers.length; i++) {
            var toAdd = this.getFormattedRowWithContract1(searchModel12.customers[i]);
            data.push(toAdd);
        }
        data.sort(function(a, b) {
            return self.sortfunction(b, a)
        });
        this.view.CustomerSearchandResults.segCustomerResults.widgetDataMap = dataMap;
        this.view.CustomerSearchandResults.segCustomerResults.setData(data);
        this.view.CustomerSearchandResults.segCustomerResults.info = {
            "data": data,
            "searchAndSortData": data
        };
        this.view.CustomerSearchandResults.listboxCustomerType.selectedKey = "ALL";
        this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(false);
        this.view.CustomerSearchandResults.segNoResults.setVisibility(false);
        this.view.CustomerSearchandResults.segCustomerResults.setVisibility(true);
        this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(true);
        //this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(false);
        //this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.NoresultsSearchForaCustomer");
    //     this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(false);
    //     this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
    //     this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.searchNoResultFoundCompanies");
     }
    this.determineandSetSearchPageHeight();
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.CustomerSearchandResults.flxResults);
    
},
  getFormattedRowWithContract : function(customer){
    var status = "",stautsSkin="",statusIcon = "",   
    fontIconCircleStatus = kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblFontIconStatus1"),
    dob = customer.DateOfBirth ? this.getFormattedDate(customer.DateOfBirth, "YYYY-MM-DD", "MM-DD-YYYY") : "N/A",
    dob = dob ? dob : "N/A";

    //Set customer status
    switch (customer.Status_id) {
      case "SID_APP_FAILED":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Rejected");
        stautsSkin = "sknFontIconError";
        statusIcon = "\ue921";
        break;
      case "SID_APP_PENDING":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Pending");
        stautsSkin = "sknFontIconSuspend";
        statusIcon = "\ue921";
        break;
      case "SID_APP_ACTIVE":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
        statusIcon = "\ue921";
        stautsSkin = "sknFontIconActivate";
        break;
      case "SID_CUS_SUSPENDED":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
        stautsSkin = "sknFontIconOptionMenuRow ";
        statusIcon = "\ue91d";
        break;
      case "SID_CUS_LOCKED":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Locked");
        stautsSkin = "sknfontIconInactive";
        statusIcon = "\ue921";
        break;
      case "SID_CUS_NEW":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.New");
        stautsSkin = "sknIcon039dffBlue12px";
        statusIcon = "\ue921";
        break;

      default:
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
        statusIcon = "\ue921";
        stautsSkin = "sknFontIconActivate";
    }

    //Initial response
    var response = {
      "flxRadioButton": {"isvisible":false},
      "imgRadioBtn":{"src":"radio_notselected.png"},
      "flxApplicantTag": { "isVisible": false },
      "flxMicroBusinessTag": { "isVisible": false },
      "flxRetailTag": { "isVisible": false },
      "flxLeadTag": { "isVisible": false },
      "lblContent1": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailUser"),
      "lblContent2": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Applicant"),
      "lblContent4": kony.i18n.getLocalizedString("i18n.frmCustomerProfile.BusinessUser"),
      "lblContent5": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.WealthUser"),
      "fontIconCircle1": fontIconCircleStatus,
      "fontIconCircle2": fontIconCircleStatus,
      "fontIconCircle4": fontIconCircleStatus,
      "fontIconCircle5": fontIconCircleStatus,
      "lblHeading1" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.User_ID_Cap"),
      "lblHeading2" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailCustomerSSN"),
      "lblHeading3" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
      "lblHeading4" : kony.i18n.getLocalizedString("i18n.frmCustomerManagement.MobileNo_UC"),
      "lblHeading5" : kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.DATEOFBIRTH"),
      "lblHeading6" : kony.i18n.getLocalizedString("i18n.permission.EMAILID"),
      /* "flxRightContainer": "flxRightContainer",
      "flxCustomerResults": "flxCustomerResults",
      "flxDataContainer1": "flxDataContainer1",
      "flxDataContainer2": "flxDataContainer2",
      "flxInnerContainer": "flxInnerContainer",
      "flxLeftContainer": "flxLeftContainer",
      "flxLowerContainer": "flxLowerContainer",*/
      "lblStatusValue":status,
      "lblIconStatus":{"skin":stautsSkin, "text":statusIcon},
      "flxUpperContainer": "flxUpperContainer",
	  "lblData6":{"text":"","tooltip":""},
      "template": "flxCustomerResults",
      "branchId": "branchId"
    };
    
    var isCombinedUserType = 0;
    if (customer.Status_id !== "SID_CUS_NEW") {
        if (customer.CustomerTypeId && customer.CustomerTypeId !== this.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE) {
            isCombinedUserType = (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0) &&
            (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0);
        }
        if (customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE ||
            isCombinedUserType) {
            //Business user and combined user
            if (isCombinedUserType) {
                response["flxMicroBusinessTag"] = {
                    "isVisible": true
                };
                response["flxRetailTag"] = {
                    "isVisible": true
                };
            } else {
                response["flxMicroBusinessTag"] = {
                    "isVisible": true
                };
            }
        } else if (customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE) {
            response["flxLeadTag"] = {
                "isVisible": true
            };
            response["lblContent5"] = {
                "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.WealthUser")
            };
        } else if (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE) >= 0 &&
            customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0) {
            response["flxRetailTag"] = {
                "isVisible": true
            };
            response["flxLeadTag"] = {
                "isVisible": true,
                "left": "10dp"
            };
            response["lblContent5"] = {
                "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.WealthUser")
            };
        } else {
            // Retail user
            response["flxRetailTag"] = {
                "isVisible": true
            };
        }
    } else {
        // not enrolled user
        response["flxRightContainer"] = {
            "isVisible": false
        };
    }    
     response["flxDataContainer7"] = { "isVisible": false };
     response["lblCustomerName"] = customer.name;
     response["CustomerType"] = customer.CustomerTypeId;
     response["CustomerId"] = customer.id || "";
     response["primaryCustomerId"] = customer.primaryCustomerId || "";
     response["partyId"] = customer.partyId;
     
    response["lblData1"] = customer.id  ? (customer.Username || "N/A") : "N/A";
    response["lblData2"] =customer.Ssn?customer.Ssn:"N/A";
    // mapping search records customer id in UI with primaryCustomerId
    response["lblData3"] = customer.primaryCustomerId  ? customer.primaryCustomerId : "N/A";
    
     response["lblData4"] = customer.PrimaryPhoneNumber ? {"text":customer.PrimaryPhoneNumber,"tooltip":customer.PrimaryPhoneNumber} : {"text":"N/A"};
    response["lblData5"] = customer.DateOfBirth ? customer.DateOfBirth : "N/A";
    var emailCharCount = kony.os.deviceInfo().screenWidth < 1400 ? 24: 40;
    response["lblData6"] = {"text": customer.PrimaryEmailAddress ? this.AdminConsoleCommonUtils.getTruncatedString(customer.PrimaryEmailAddress,emailCharCount+3, emailCharCount): "N/A",
                            "tooltip": customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : ""};
    response["branchId"] = customer.branchId;
     return response;
  },

  getFormattedRowWithContract1: function(customer) {
    var status = "",
        stautsSkin = "",
        statusIcon = "",
        fontIconCircleStatus = kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblFontIconStatus1"),
        dob = customer.DateOfBirth ? this.getFormattedDate(customer.DateOfBirth, "YYYY-MM-DD", "MM-DD-YYYY") : "N/A",
        dob = dob ? dob : "N/A";
    //Set customer status
    switch (customer.Status_id) {
        case "SID_APP_FAILED":
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Rejected");
            stautsSkin = "sknFontIconError";
            statusIcon = "\ue921";
            break;
        case "SID_APP_PENDING":
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Pending");
            stautsSkin = "sknFontIconSuspend";
            statusIcon = "\ue921";
            break;
        case "SID_APP_ACTIVE":
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
            statusIcon = "\ue921";
            stautsSkin = "sknFontIconActivate";
            break;
        case "SID_CUS_SUSPENDED":
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
            stautsSkin = "sknFontIconOptionMenuRow ";
            statusIcon = "\ue91d";
            break;
        case "SID_CUS_LOCKED":
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Locked");
            stautsSkin = "sknfontIconInactive";
            statusIcon = "\ue921";
            break;
        case "SID_CUS_NEW":
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.New");
            stautsSkin = "sknIcon039dffBlue12px";
            statusIcon = "\ue921";
            break;
        default:
            status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
            statusIcon = "\ue921";
            stautsSkin = "sknFontIconActivate";
    }
    //Initial response
    var response = {
        "flxRadioButton": {
            "isvisible": false
        },
        "imgRadioBtn": {
            "src": "radio_notselected.png"
        },
        "flxApplicantTag": {
            "isVisible": false
        },
        "flxMicroBusinessTag": {
            "isVisible": false
        },
        "flxRetailTag": {
            "isVisible": false
        },
        "flxLeadTag": {
            "isVisible": false
        },
        "lblContent1": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailUser"),
        "lblContent2": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Applicant"),
        "lblContent4": kony.i18n.getLocalizedString("i18n.frmCustomerProfile.BusinessUser"),
        "lblContent5": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.WealthUser"),
        "fontIconCircle1": fontIconCircleStatus,
        "fontIconCircle2": fontIconCircleStatus,
        "fontIconCircle4": fontIconCircleStatus,
        "fontIconCircle5": fontIconCircleStatus,
        "lblHeading1": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.User_ID_Cap"),
        "lblHeading2": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailCustomerSSN"),
        "lblHeading3": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
        "lblHeading4": kony.i18n.getLocalizedString("i18n.frmCustomerManagement.MobileNo_UC"),
        "lblHeading5": kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.DATEOFBIRTH"),
        "lblHeading6": kony.i18n.getLocalizedString("i18n.permission.EMAILID"),
        /* "flxRightContainer": "flxRightContainer",
        "flxCustomerResults": "flxCustomerResults",
        "flxDataContainer1": "flxDataContainer1",
        "flxDataContainer2": "flxDataContainer2",
        "flxInnerContainer": "flxInnerContainer",
        "flxLeftContainer": "flxLeftContainer",
        "flxLowerContainer": "flxLowerContainer",*/
        "lblStatusValue": status,
        "lblIconStatus": {
            "skin": stautsSkin,
            "text": statusIcon
        },
        "flxUpperContainer": "flxUpperContainer",
        "lblData6": {
            "text": "",
            "tooltip": ""
        },
        "template": "flxCustomerResults",
        "branchId": "branchId"
    };
    var isCombinedUserType = 0;
    if (customer.Status_id !== "SID_CUS_NEW") {
        if (customer.CustomerTypeId && customer.CustomerTypeId !== this.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE) {
            isCombinedUserType = (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0) && (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0);
        }
        if (customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE || isCombinedUserType) {
            //Business user and combined user
            if (isCombinedUserType) {
                response["flxMicroBusinessTag"] = {
                    "isVisible": true
                };
                response["flxRetailTag"] = {
                    "isVisible": true
                };
            } else {
                response["flxMicroBusinessTag"] = {
                    "isVisible": true
                };
            }
        } else if (customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE) {
            response["flxLeadTag"] = {
                "isVisible": true
            };
            response["lblContent5"] = {
                "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.WealthUser")
            };
        } else if (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE) >= 0 &&
            customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0) {
            response["flxRetailTag"] = {
                "isVisible": true
            };
            response["flxLeadTag"] = {
                "isVisible": true,
                "left": "10dp"
            };
            response["lblContent5"] = {
                "text": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.WealthUser")
            };
        } else {
            // Retail user
            response["flxRetailTag"] = {
                "isVisible": true
            };
        }
    } else {
        // not enrolled user
        response["flxRightContainer"] = {
            "isVisible": false
        };
    }
    response["flxDataContainer7"] = {
        "isVisible": false
    };
    response["lblCustomerName"] = customer.FirstName + " " + customer.LastName;
    response["CustomerType"] = customer.CustomerTypeId;
    response["CustomerId"] = customer.Customer_id || "";
    response["primaryCustomerId"] = customer.primaryCustomerId || "";
    response["partyId"] = customer.partyId;
    response["lblData1"] = customer.Username;
    response["lblData2"] = customer.Ssn ? customer.Ssn : "N/A";
    // mapping search records customer id in UI with primaryCustomerId
    response["lblData3"] = customer.primaryCustomerId ? customer.primaryCustomerId : "N/A";
    response["lblData4"] = customer.PrimaryPhoneNumber ? customer.PrimaryPhoneNumber :"N/A";
    // response["lblData4"] = customer.PrimaryPhoneNumber ? {
    //     "text": customer.PrimaryPhoneNumber,
    //     "tooltip": customer.PrimaryPhoneNumber
   // } : 
//    {
//         "text": "N/A"
//     };
    response["lblData5"] = customer.DateOfBirth ? customer.DateOfBirth : "N/A";
    var emailCharCount = kony.os.deviceInfo().screenWidth < 1400 ? 24 : 40;
     response["lblData6"] = customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A";
    response["branchId"] = customer.branchId;
     homelegalentityid=customer.homeLegalEntity;

    //{
    //     "text": customer.Email ? this.AdminConsoleCommonUtils.getTruncatedString(customer.PrimaryEmailAddress, emailCharCount + 3, emailCharCount) : "N/A",
    //     "tooltip": customer.Email ? customer.Email : ""
    // };
    return response;
},
  getFormattedRow: function (customer) {
    var status = "",stautsSkin="",statusIcon = "",
      retailHeading = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailCustomerId"),
      applicantStatus = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.applicantStatus"),
      fontIconCircleStatus = kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblFontIconStatus1"),
      dob = customer.DateOfBirth ? this.getFormattedDate(customer.DateOfBirth, "YYYY-MM-DD", "MM-DD-YYYY") : "N/A",
      userRole = customer.groups ? customer.groups.split(",")[0] : "N/A";
      dob = dob ? dob : "N/A";

    //Set customer status
    switch (customer.Status_id) {
      case "SID_APP_FAILED":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Rejected");
        stautsSkin = "sknFontIconError";
        statusIcon = "\ue921";
        break;
      case "SID_APP_PENDING":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Pending");
        stautsSkin = "sknFontIconSuspend";
        statusIcon = "\ue921";
        break;
      case "SID_APP_ACTIVE":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
        statusIcon = "\ue921";
        stautsSkin = "sknFontIconActivate";
        break;
      case "SID_CUS_SUSPENDED":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
        stautsSkin = "sknFontIconOptionMenuRow ";
        statusIcon = "\ue91d";
        break;
      case "SID_CUS_LOCKED":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Locked");
        stautsSkin = "sknfontIconInactive";
        statusIcon = "\ue921";
        break;
      case "SID_CUS_NEW":
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.New");
        stautsSkin = "sknIcon039dffBlue12px";
        statusIcon = "\ue921";
        break;

      default:
        status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Active");
        statusIcon = "\ue921";
        stautsSkin = "sknFontIconActivate";
    }

    //Initial response
    var response = {
      "flxRadioButton": {"isvisible":false},
      "imgRadioBtn":{"src":"radio_notselected.png"},
      "flxApplicantTag": { "isVisible": false },
      "flxMicroBusinessTag": { "isVisible": false },
      "flxRetailTag": { "isVisible": false },
      "flxLeadTag": { "isVisible": false },
     "lblContent1": kony.i18n.getLocalizedString("i18n.frmCustomerManagement.Retail_User"),
      "lblContent2": kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Applicant"),
      "lblContent4": kony.i18n.getLocalizedString("i18n.frmCustomerProfile.BusinessUser"),
      "fontIconCircle1": fontIconCircleStatus,
      "fontIconCircle2": fontIconCircleStatus,
      "fontIconCircle4": fontIconCircleStatus,
      "lblHeading1" : kony.i18n.getLocalizedString("i18n.permission.USERNAME"),
      "lblHeading2" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailCustomerSSN"),
      "lblHeading3" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID"),
      "lblHeading4" : kony.i18n.getLocalizedString("i18n.frmCustomerManagement.MobileNo_UC"),
      "lblHeading5" : kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.DATEOFBIRTH"),
      "lblHeading6" : kony.i18n.getLocalizedString("i18n.permission.EMAILID"),
      "flxRightContainer": "flxRightContainer",
      "flxCustomerResults": "flxCustomerResults",
      "flxDataContainer1": "flxDataContainer1",
      "flxDataContainer2": "flxDataContainer2",
      "flxInnerContainer": "flxInnerContainer",
      "flxLeftContainer": "flxLeftContainer",
      "flxLowerContainer": "flxLowerContainer",
      "lblStatusValue":status,
      "lblIconStatus":{"skin":stautsSkin, "text":statusIcon},
      "flxUpperContainer": "flxUpperContainer",
      "template": "flxCustomerResults"
    };
    var isCombinedUserType = 0;
    if(customer.CustomerTypeId &&customer.CustomerTypeId!==this.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE)
      {
        isCombinedUserType = (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0) &&
              (customer.CustomerTypeId.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0);
      }
    if (customer.CustomerTypeId &&
        customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE) {
      //Applicant or Prospect
      response["flxApplicantTag"] = { "isVisible": true };
      response["flxDataContainer7"] = { "isVisible": false };
      response["lblCustomerName"] = customer.name;
      response["CustomerType"] = customer.CustomerTypeId;
      response["CustomerId"] = customer.id;
      response["partyId"] = customer.partyId;
      response["lblHeading1"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.applicantID");
      response["lblHeading2"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.applicantDate");
      response["lblHeading3"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.applicantChannel");
      response["lblHeading4"] = applicantStatus;
      response["lblData1"] = customer.id;
      response["lblData2"] = customer.createdts ? (customer.createdts.split(' ')[0]) : "N/A";
      response["lblData3"] = customer.ApplicantChannel ? customer.ApplicantChannel : "N/A";
      response["lblData4"] = customer.PrimaryPhoneNumber ? {"text":customer.PrimaryPhoneNumber} : {"text":"N/A"};
      response["lblData5"] = customer.DateOfBirth ? customer.DateOfBirth : "N/A";
      response["lblData6"] = {"text": customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A",
                              "tooltip": customer.PrimaryEmailAddress};

    } else if (customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE ||
              isCombinedUserType) {
      //Business user and combined user
      if(isCombinedUserType){
        response["flxMicroBusinessTag"] = { "isVisible": true };
        response["flxRetailTag"] = { "isVisible": true };
      } else{
        response["flxMicroBusinessTag"] = { "isVisible": true };
      }
      response["flxDataContainer7"] = { "isVisible": true };
      response["lblCustomerName"] = customer.name;
      response["CustomerType"] = customer.CustomerTypeId;
      response["CustomerId"] = customer.id;
      response["partyId"] = customer.partyId;
      response["lblHeading3"] = kony.i18n.getLocalizedString("i18n.frmCompanies.COMPANY_ID");
      response["lblHeading4"] = kony.i18n.getLocalizedString("i18n.Companies.companyName_UC");
      response["lblHeading5"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.MobileNo_UC");
      response["lblHeading6"] = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.DATEOFBIRTH");
      response["lblHeading7"] = kony.i18n.getLocalizedString("i18n.permission.EMAILID");
      response["lblData1"] = customer.Username;
      response["lblData2"] = customer.Ssn;
      response["lblData3"] = customer.CompanyId ? customer.CompanyId : "N/A";
      response["lblData4"] = customer.CompanyName ? {"text":this.AdminConsoleCommonUtils.getTruncatedString(customer.CompanyName, 30, 27),
                                                     "tooltip":customer.CompanyName} : {"text":"N/A"};
      response["lblData5"] = customer.PrimaryPhoneNumber ? customer.PrimaryPhoneNumber : "N/A";
      response["lblData6"] = {"text":customer.DateOfBirth};
      response["lblData7"] = customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A";
    }else if(customer.CustomerTypeId === this.AdminConsoleCommonUtils.constantConfig.LEAD_TYPE){
      //Lead
      response["flxLeadTag"] = { "isVisible": true };
      response["flxDataContainer7"] = { "isVisible": false };
      response["lblCustomerName"] = customer.name;
      response["CustomerType"] = customer.CustomerTypeId;
      response["CustomerId"] = customer.id;
      response["partyId"] = customer.partyId;
      response["lblHeading1"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CustomerProduct");
      response["lblHeading2"] = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CustomerCreatedOn");
      response["lblData1"] = customer.Product? customer.Product: "N/A";
      response["lblData2"] = customer.createdts ? customer.createdts : "N/A";
      response["lblData3"] = customer.id;
      response["lblData4"] = customer.PrimaryPhoneNumber ? {"text":customer.PrimaryPhoneNumber} : {"text":"N/A"};
      response["lblData5"] = customer.DateOfBirth ? customer.DateOfBirth : "N/A";
      response["lblData6"] = {"text": customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A",
                              "tooltip": customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : ""};
    } else{
      //Retail
      response["flxRetailTag"] = { "isVisible": true };
      response["flxDataContainer7"] = { "isVisible": false };
      response["lblCustomerName"] = customer.name;
      response["CustomerType"] = customer.CustomerTypeId;
      response["CustomerId"] = customer.id;
      response["partyId"] = customer.partyId;
      response["lblData1"] = customer.Username;
      response["lblData2"] = customer.Ssn;
      response["lblData3"] = customer.id;
      response["lblData4"] = customer.PrimaryPhoneNumber ? {"text":customer.PrimaryPhoneNumber} : {"text":"N/A"};
      response["lblData5"] = customer.DateOfBirth;
      response["lblData6"] = {"text": customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : "N/A",
                               "tooltip": customer.PrimaryEmailAddress ? customer.PrimaryEmailAddress : ""};
    } 
    return response;
  },
  maskSSN: function (ssn) {
    if (ssn.length > 4)
      return "XX-XXX-" + ssn.slice(-4);
    else
      return "XX-XXX-" + ssn;
  },
  getDateInMMDDYYYY: function (date) {
    return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
  },

 // isOnboardingCriteriaDisabled: false,

  currentSelectedCriteria: null,
    /*
    * show no results or permission denied scren on search
    * @param: opt(1-no results/2 - access denied)
    */
    showSearchNoResultOrPermission : function(opt){
      this.view.CustomerSearchandResults.segCustomerResults.setVisibility(false);
      this.view.CustomerSearchandResults.flxResultsHeader.setVisibility(false);
      if(opt === 1){
        this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(true);
        this.view.CustomerSearchandResults.lblNoResult.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.invaliduserid");
        this.view.CustomerSearchandResults.segNoResults.setVisibility(false);
      } else if(opt === 2){
        this.view.CustomerSearchandResults.flxNoResultsFound.setVisibility(false);
        var widgetMap = {
          "flxDeniedResults":"flxDeniedResults",
          "flxUpperContainer":"flxUpperContainer",
          "flxInnerContainer":"flxInnerContainer",
          "flxErrorButton":"flxErrorButton",
          "lblErrorIcon":"lblErrorIcon",
          "lblDeniedMsg":"lblDeniedMsg",
          "lblRowSeparator":"lblRowSeparator",
          "flxLowerContainer":"flxLowerContainer",
          "lblError":"lblError",
          "flxNoResults":"flxNoResults"
        };
        var segData = [{
          "lblErrorIcon":{"text":"\ue94c","isVisible":true},
          "lblDeniedMsg":{"text": kony.i18n.getLocalizedString("i18n.frmCustomerManagement.PermissionDenied")},
          "lblRowSeparator":"-",
          "lblError":{"text": kony.i18n.getLocalizedString("i18n.frmCustomerManagement.AccessRestrictedForUserSearch")},
          "template":"flxNoResults"
        }];
        this.view.CustomerSearchandResults.segNoResults.widgetDataMap = widgetMap;
        this.view.CustomerSearchandResults.segNoResults.setData(segData);
        this.view.CustomerSearchandResults.segNoResults.setVisibility(true);
      }
    },
});

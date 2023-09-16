define({ 
  tabsConfig:{
    started : 1,
    submitted :2
  },
  currentPage :1,
  allProducts : "",
  totalPages : 0,
  leadsPerPage : 20,
  totalLeads : 0,
  forwardScroll : true,
  fetchLeadsPayload : {
    "statusIds" : "",
    "productId" : "",
    "leadType" : "",
    "assignedTo" : "",
    "phoneNumber" : "",
    "emailAddress" : "",
    "pageNumber" : 1,
    "recordsPerPage" : 20,
    "modifiedStartDate" : "",
    "modifiedEndDate" : "",
    "sortCriteria" : "",
    "sortOrder" : ""
  },
  willUpdateUI : function(viewModel){
    if(viewModel){
      this.updateLeftMenu(viewModel);
      if (viewModel.LoadingScreen) {
        if (viewModel.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }
      if(viewModel.toast){
        if (viewModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.view.toastMessage.showToastMessage(viewModel.toast.message, this);
        } else {
          this.view.toastMessage.showErrorToastMessage(viewModel.toast.message, this);
        }
      }
      if (viewModel.CustomerNotes) {
        this.view.Notes.displayNotes(this, viewModel.CustomerNotes);
      } 
      if (viewModel.ApplicantNotes) {
        this.view.Notes.displayNotes(this, viewModel.ApplicantNotes);
      }
      if (viewModel.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(viewModel.OnlineBankingLogin, this);
      }
      if (viewModel.UpdateDBPUserStatus) {
        this.view.generalInfoHeader.lblStatus.info = { "value": viewModel.UpdateDBPUserStatus.status.toUpperCase() };
        this.setCustomerStatus(viewModel.UpdateDBPUserStatus.status.toUpperCase());
      }
      if(viewModel.depositsLeads){
        this.setLeadsInDeposits(viewModel.depositsLeads);
      } else if(viewModel.depositsProducts){
        this.filterProductsForDeposits(viewModel.depositsProducts);
      } else if(viewModel.depositsSubmitApplications){
        this.setSubmittedApplications(viewModel.depositsSubmitApplications);
      } else if(viewModel.updateLead){
        this.currentPage = 1;
        this.view.segmentListOfLeads.setData([]);
      }
      if(viewModel.customerApplicationsStarted){
        this.setStartedApplications(viewModel.customerApplicationsStarted);
      }
      if(viewModel.customerApplicationsSubmitted){
        this.setSubmittedApplications(viewModel.customerApplicationsSubmitted);
      }
      if(viewModel.showApplicationsTab){
        this.showApplicationsTab();
      }
      if(viewModel.BankingURL){
        window.open(viewModel.BankingURL);
      }
    }
  },
  depositsPreshow : function(){
    var scopeObj = this;
    scopeObj.subTabsButtonUtilFunction([scopeObj.view.dashboardCommonTab.btnProfile,scopeObj.view.dashboardCommonTab.btnLoans,
                                        scopeObj.view.dashboardCommonTab.btnDeposits,scopeObj.view.dashboardCommonTab.btnBanking,scopeObj.view.dashboardCommonTab.btnCDP],
                                       scopeObj.view.dashboardCommonTab.btnDeposits);
    var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
    scopeObj.customerName = currentCustomerDetails.Name ;
    scopeObj.view.generalInfoHeader.setDefaultHeaderData(this);
    scopeObj.view.generalInfoHeader.setCustomerNameandTag(currentCustomerDetails);
    scopeObj.view.Notes.setDefaultNotesData(this);
    scopeObj.setCustomerStatus(currentCustomerDetails.OLBCustomerFlags.Status);
    if(currentCustomerDetails.prospectStatus){
      this.view.dashboardCommonTab.btnCDP.setVisibility(true);
    }else{
      this.view.dashboardCommonTab.btnCDP.setVisibility(false);
    }
    if(currentCustomerDetails.CustomerType_id === scopeObj.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE){
      scopeObj.view.generalInfoHeader.flxActionButtons.setVisibility(false);
      scopeObj.view.generalInfoHeader.flxRiskStatus.setVisibility(false);
      scopeObj.view.alertMessage.setVisibility(false);
    }else{
      scopeObj.view.generalInfoHeader.flxRiskStatus.setVisibility(true);
      scopeObj.view.alertMessage.setVisibility(true);
      scopeObj.view.generalInfoHeader.flxActionButtons.setVisibility(true);
      scopeObj.view.generalInfoHeader.setRiskStatus(currentCustomerDetails.CustomerFlag);
      scopeObj.view.alertMessage.setGeneralInformationAlertMessage(this, this.presenter.getCurrentCustomerLockedOnInfo(),
                                                                   this.presenter.getCurrentCustomerRequestAndNotificationCount());              
    }
    //breadcrumbs
    var sourceFormDetails = scopeObj.presenter.sourceFormNavigatedFrom();
    var mainBtnText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS");
    if(sourceFormDetails.name === "frmLeadManagement") {  //if naviated from leads change breadcrumb text
      mainBtnText = sourceFormDetails.data.breadcrumbValue;          
    }
    if(currentCustomerDetails.CustomerType_id === scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
		if(currentCustomerDetails.organisation_name!== undefined && currentCustomerDetails.organisation_name!==null && currentCustomerDetails.organisation_name!==""){
			scopeObj.setBreadcrumbsData([mainBtnText, currentCustomerDetails.organisation_name.toUpperCase(),
										   this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()]);
		}else{
			scopeObj.setBreadcrumbsData([mainBtnText, this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()]);
		}
    } else{
      scopeObj.setBreadcrumbsData([mainBtnText, this.view.generalInfoHeader.lblCustomerName.text.toUpperCase()]);
    }
    scopeObj.view.leadContextualMenu.flxClose.setVisibility(false);
    scopeObj.view.generalInfoHeader.flxLinkProfileButton.setVisibility(false);
    scopeObj.view.generalInfoHeader.flxDelinkProfileButton.setVisibility(false);
    scopeObj.setSkinForApplicatinoSubTabs(scopeObj.view.btnPendingTab);
    scopeObj.tabUtilButtonFunction([scopeObj.view.btnTabName1,
                                    scopeObj.view.btnTabName2],scopeObj.view.btnTabName1);
    scopeObj.setFlowActions();
  },
  setFlowActions : function(){
    var scopeObj = this;

    this.view.flxSelectOptionsLeads.onHover = scopeObj.onHoverEventCallback;

    this.view.btnTabName1.onClick = function(){
      scopeObj.showApplicationsTab();
    };
    this.view.btnTabName2.onClick = function(){
      scopeObj.showLeadsTab();
      scopeObj.currentPage = 1;
    };
    this.view.btnPendingTab.onClick = function(){
      scopeObj.showStartedSubmittedTabs(scopeObj.tabsConfig.started);
    };
    this.view.btnSubmittedTab.onClick = function(){
      scopeObj.showStartedSubmittedTabs(scopeObj.tabsConfig.submitted);
      /*var param = {"CustomerUsername": scopeObj.presenter.getCurrentCustomerDetails().Username};
      scopeObj.presenter.fetchSubmittedApplicationsDeposits(param);*/
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.presenter.turnOnCustomerManagementSearch();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      var currentCustomerDetails = scopeObj.presenter.getCurrentCustomerDetails();
      if(currentCustomerDetails.CustomerType_id === scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
        var context = {"id":currentCustomerDetails.organisation_id,
                       "selectTab":1};
        scopeObj.presenter.navigateToCompanyDetailsScreen(context);
      }

    };
    this.view.flxProductContainer.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfLeads.data,"lblProduct.text",scopeObj.view.lblProductHeaderImg,"leads");
      scopeObj.view.segmentListOfLeads.setData(sortData);
    };
    this.view.flxStatusContainer.onClick =  function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfLeads.data,"lblStatus.text",scopeObj.view.lblStatusHeaderImg,"leads");
      scopeObj.view.segmentListOfLeads.setData(sortData);
    };
    this.view.flxLeadsCreatedOnContainer.onClick =function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfLeads.data,"lblCreatedOn",scopeObj.view.lblLeadsCreatedOnHeaderImg,"leads");
      scopeObj.view.segmentListOfLeads.setData(sortData);
    };
    this.view.flxCreatedByContainer.onClick =function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfLeads.data,"lblCreatedBy",scopeObj.view.lblCreatedByHeaderImg,"leads");
      scopeObj.view.segmentListOfLeads.setData(sortData);
    };
    this.view.flxAssignToContainer.onClick =function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfLeads.data,"lblAssignTo",scopeObj.view.lblAssignToHeaderImg,"leads");
      scopeObj.view.segmentListOfLeads.setData(sortData);
    };
    this.view.flxApplicationIDSubmitted.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplicationsSubmitted.data,"lblDepositApplIdSubmit",scopeObj.view.lblIconApplIdSubmitSort,"submittedApplications");
      scopeObj.view.segmentListOfApplicationsSubmitted.setData(sortData);
    };
    this.view.flxApplicationTypeSubmitted.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplicationsSubmitted.data,"lblDepositApplProductSubmit.val",scopeObj.view.lblIconApplicationTypeSubmitSort,"submittedApplications");
      scopeObj.view.segmentListOfApplicationsSubmitted.setData(sortData);
    };
    this.view.flxCreatedOnSubmitted.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplicationsSubmitted.data,"lblDepositApplCreatedStarted",scopeObj.view.lblIconApplCreatedSubmitSort,"submittedApplications");
      scopeObj.view.segmentListOfApplicationsSubmitted.setData(sortData);
    };
    this.view.flxSubmitOnSubmitted.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplicationsSubmitted.data,"lblDepositApplSubmitOn",scopeObj.view.lblIconSubmittedOnSort,"submittedApplications");
      scopeObj.view.segmentListOfApplicationsSubmitted.setData(sortData);
    };
    this.view.flxStatusSubmitted.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplicationsSubmitted.data,"lblDepositApplStatusSubmit",scopeObj.view.lblIconApplStatusSubmitSort,"submittedApplications");
      scopeObj.view.segmentListOfApplicationsSubmitted.setData(sortData);
    };
    this.view.btnDepositCreateLead.onClick = function(){
      scopeObj.createLead();
    };
    this.view.leadContextualMenu.flxEdit.onClick = function(){
      scopeObj.editLead();
    };
    this.view.leadContextualMenu.flxClose.onClick = function(){

    };
    this.view.leadContextualMenu.flxMoveToInProgress.onClick = function(){
      scopeObj.updateLeadStatus();
    };
    this.view.leadContextualMenu.flxMoveToNew.onClick = function(){
      scopeObj.updateLeadStatus();
    };
    this.view.flxApplicationIDContainer.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplications.data,"lblDepositApplIdStarted",scopeObj.view.lblIconApplicationIdSort,"startedApplications");
      scopeObj.view.segmentListOfApplications.setData(sortData);
    };
    this.view.flxApplicationTypeContainer.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplications.data,"lblDepositApplProductStarted.val",scopeObj.view.lblIconApplicationTypeSort,"startedApplications");
      scopeObj.view.segmentListOfApplications.setData(sortData);
    };
    this.view.flxCreateOnContainer.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplications.data,"lblDepositApplCreatedStarted",scopeObj.view.lblIconCreateOnSort,"startedApplications");
      scopeObj.view.segmentListOfApplications.setData(sortData);
    };
    this.view.flxModifyOnContainer.onClick = function(){
      var sortData = scopeObj.getSortedList(scopeObj.view.segmentListOfApplications.data,"lblDepositApplModifiedStarted",scopeObj.view.lblIconModifySort,"startedApplications");
      scopeObj.view.segmentListOfApplications.setData(sortData);
    };

  },
  setCustomerStatus: function (status) {
    var self = this;
    var customerType = this.presenter.getCurrentCustomerType();
    if (status === "LOCKED") {
      self.view.generalInfoHeader.handleLockedUserStatus(customerType, self);    
    } else if (status === "SUSPENDED") {
      self.view.generalInfoHeader.handleSuspendedUserStatus(customerType, self);  
    } else if (status === "NEW") {
      self.view.generalInfoHeader.handleNewUserStatus(customerType, self);
    } else {
      self.view.generalInfoHeader.handleActiveUserStatus(customerType, this.presenter.getCurrentCustomerDetails().IsAssistConsented, self);
    }
  },
  /*
   * set breadcrumbs text accordingly
   * @param: array of string that should be set to widgets
   */
  setBreadcrumbsData : function(textArray){
    if (textArray.length === 2) {
      this.view.breadcrumbs.btnBackToMain.text = textArray[0];
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      this.view.breadcrumbs.lblCurrentScreen.text = textArray[1];
    } else if (textArray.length === 3) {
      this.view.breadcrumbs.btnBackToMain.text = textArray[0];
      this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage.text = textArray[1];
      this.view.breadcrumbs.lblCurrentScreen.text = textArray[2];
    }
    this.view.forceLayout();
  },
  /*
   * show applications list screen
   */
  showApplicationsTab : function(){
    this.view.flxListOfApplications.setVisibility(true);
    this.view.flxListOfLeads.setVisibility(false);
    this.view.flxPendingSubmittedTabs.setVisibility(true);
    this.tabUtilButtonFunction([this.view.btnTabName1,
                                this.view.btnTabName2],this.view.btnTabName1);
    this.showStartedSubmittedTabs(this.tabsConfig.started);
    this.view.forceLayout();
  },
  /*
   * show leads list screen
   */
  showLeadsTab: function(){
    this.view.flxListOfLeads.setVisibility(true);
    this.view.flxListOfApplications.setVisibility(false);
    this.view.flxNoLeadsFound.setVisibility(false);
    this.view.flxPendingSubmittedTabs.setVisibility(false);
    this.view.segmentListOfLeads.setData([]);
    this.tabUtilButtonFunction([this.view.btnTabName1,
                                this.view.btnTabName2],this.view.btnTabName2);

    this.fetchLeadsPayload = {
      "statusIds" : "",
      "productId" : "",
      "leadType" : "",
      "assignedTo" : "",
      "customerId": this.presenter.getCurrentCustomerDetails().Customer_id,
      "phoneNumber" : "",
      "emailAddress" : "",
      "pageNumber" : 1,
      "recordsPerPage" : this.leadsPerPage,
      "modifiedStartDate" : "",
      "modifiedEndDate" : "",
      "sortCriteria" : "",
      "sortOrder" : ""
    };
    this.presenter.fetchLeadsForDeposits(this.fetchLeadsPayload);
    this.view.forceLayout();
  },
  /*
   * show started/submitted tabs based on selection
   * @param : selected tab - self.tabsConfig.submitted/self.tabsConfig.started
   */
  showStartedSubmittedTabs : function(tab){
    var self = this;
    var Customer_id = kony.store.getItem("Customer_id");
    var ssoToken =window.localStorage.getItem('ssoAuth');
    var key = window.localStorage.getItem('ssoSecretKey');
    var payload = {
      "Customer_id" : Customer_id,
      "ssoToken" : ssoToken,
      "key" : key
    };
    if(tab === self.tabsConfig.started){
      self.setSkinForApplicatinoSubTabs(self.view.btnPendingTab);
      self.view.flxNoApplicationsFound.setVisibility(false);
      self.view.flxListOfApplicationsHeader.setVisibility(true);
      self.view.flxListOfApplicationsSubmittedHeader.setVisibility(false);
      self.view.segmentListOfApplications.setVisibility(true);
      self.view.segmentListOfApplicationsSubmitted.setVisibility(false);
      payload.Application_status = "started";
    } else if(tab === self.tabsConfig.submitted){
      self.setSkinForApplicatinoSubTabs(self.view.btnSubmittedTab);
      self.view.flxListOfApplicationsHeader.setVisibility(false);
      self.view.flxListOfApplicationsSubmittedHeader.setVisibility(true);
      self.view.segmentListOfApplications.setVisibility(false);
      self.view.segmentListOfApplicationsSubmitted.setVisibility(true);
      self.view.flxNoApplicationsFound.setVisibility(false);
      payload.Application_status = "submitted";
    }
    self.presenter.GetCustomerApplications(payload);
    self.view.forceLayout();
  },
  /*
   * set skins to the current sub tabs - started/submitted
   * @param: selected tab widget spath
   */
  setSkinForApplicatinoSubTabs: function (btnWidget) {
    this.view.btnPendingTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnSubmittedTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    btnWidget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
  },
  /*
   * create cards dynamically based on the number of deposits
   */
  setDepositCardsData : function(productsList){
    var self =this;
    var depositsCount = 3;
    var loansData,cardCount =0,index = 0;
    self.view.flxDepositTypes.removeAll();
    self.view.flxDepositTypes.height = "0dp";
    for (var i = 0; i < depositsCount; i++) { 
      var cardObject = self.view.depositsInfo.clone(i.toString());
      cardObject.setVisibility(true);
      cardObject[i + "lblNewLoanType"].text = productsList[i].name;
      if (i % 3 === 0) {
        var flexHeight = "";
        index = i/ 3;
        //add new row flex
        var flxDepositTypeInner=self.createDepositTypeInnerFlex(index);
        self.view.flxDepositTypes.add(flxDepositTypeInner);
        //adjust parent flex height as new row is added
        flexHeight = self.view.flxDepositTypes.height;
        var value = parseInt(flexHeight.slice(0, flexHeight.length - 2), 10);
        self.view.flxDepositTypes.height = value + 120 + "dp";
        cardObject.left="0dp";
        self.view["flxDepositTypeInner"+index].add(cardObject);
      } else{
        self.view["flxDepositTypeInner"+index].add(cardObject);
      }
    }
    self.view.forceLayout();
  },
  /*
   * create new row flex for dynamically created cards
   * @return: new flex created
   */
  createDepositTypeInnerFlex: function(index) {
    var flxDepositTypeInner = new kony.ui.FlexContainer({
      "height":"120dp",
      "clipBounds": true,
      "id": "flxDepositTypeInner"+index,
      "isVisible": true,
      "layoutType": kony.flex.FLOW_HORIZONTAL,
      "left": "0dp",
      "isModalContainer": false,
      "skin": "slFbox",
      "top": "0dp",
      "width": "100%",
      "zIndex": 100
    }, {
      "retainFlowHorizontalAlignment": false
    }, {});
    flxDepositTypeInner.setDefaultUnit(kony.flex.DP);
    return flxDepositTypeInner;
  },
  /*
   * resets all sort images to initial state
   * @param: context of segment header
   */
  resetAllSortImages : function(context){
    var self =this;
    var column;
    if(context === "startedApplications"){
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconApplicationIdSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconApplicationTypeSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconCreateOnSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconModifySort);
    } else if(context === "submittedApplications"){
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconApplIdSubmitSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconApplicationTypeSubmitSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconApplCreatedSubmitSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconSubmittedOnSort);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblIconApplStatusSubmitSort);
    } else if(context === "leads"){
      self.determineSortFontIcon(this.sortBy,column,this.view.lblProductHeaderImg);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblStatusHeaderImg);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblLeadsCreatedOnHeaderImg);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblCreatedByHeaderImg);
      self.determineSortFontIcon(this.sortBy,column,this.view.lblAssignToHeaderImg);
    }
  },
  /*
   * set data to leads segment
   * @param: list of leads
   */
  setLeadsInDeposits : function(response){
    var self = this;
    var currPageData = [];
    self.view.flxSelectOptionsLeads.setVisibility(false);
    self.totalLeads = response.MATCH_COUNT;
    self.totalPages = (self.totalLeads % self.leadsPerPage === 0) ? 
      (self.totalLeads / self.leadsPerPage) : ((self.totalLeads / self.leadsPerPage) + 1);
    var widgetMap = {"leadId":"leadId",
                     "lblProduct":"lblProduct",
                     "lblStatus":"lblStatus",
                     "lblCreatedOn":"lblCreatedOn",
                     "lblCreatedBy":"lblCreatedBy",
                     "lblAssignTo":"lblAssignTo",
                     "lblSeparatorListOfLeads":"lblSeparatorListOfLeads",
                     "flxLeadsOptionsMenu":"flxLeadsOptionsMenu",
                     "lblIconOptionsMenu":"lblIconOptionsMenu",
                     "flxDepositsLeads":"flxDepositsLeads",
                     "leadData": "leadData"
                    };
    if(self.totalLeads > 0){
      currPageData = response.leads.map(function(record){
        var status = "";
        if(record.statusId==="SID_INPROGRESS")
          status="In Progress";
        else if(record.statusId==="SID_NEW")
          status="New";
        else
          status="Archived";
        var createdBy = self.AdminConsoleCommonUtils.getParamValueOrEmptyString(record.createdByFirstName) + " " +
            self.AdminConsoleCommonUtils.getParamValueOrEmptyString(record.createdByMiddleName) + " " +
            self.AdminConsoleCommonUtils.getParamValueOrEmptyString(record.createdByLastName);
        var assignTo = self.AdminConsoleCommonUtils.getParamValueOrEmptyString(record.assignedToFirstName) + " " +
            self.AdminConsoleCommonUtils.getParamValueOrEmptyString(record.assignedToMiddleName) + " " +
            self.AdminConsoleCommonUtils.getParamValueOrEmptyString(record.assignedToLastName);
        return {"lblProduct":{"text":record.productName,
                              "info":{"id":""}},
                "leadId":record.id,
                "lblStatus":{"text":status,
                             "info":{"id":record.statusId}},
                "lblCreatedOn":self.getLocaleDate(record.createdts),
                "lblCreatedBy":createdBy || "-",
                "lblAssignTo":assignTo || "-",
                "lblSeparatorListOfLeads":"-",
                "lblIconOptionsMenu":{"text":"\ue91f"},
                "flxLeadsOptionsMenu":{"onClick":self.toggleContextualMenu},
                "leadData": record,
                "template":"flxDepositsLeads",
               };
      });
      self.view.segmentListOfLeads.widgetDataMap = widgetMap;
      self.sortBy = self.getObjectSorter("lblProduct.text");
      self.getSortedList(currPageData,"lblProduct.text","leads");
      self.setPaginatedDataToLeads(currPageData);

      self.view.flxDepositsLeadScroll.setVisibility(true);
      self.view.flxListOfLeadsHeader.setVisibility(true);
      self.view.flxNoLeadsFound.setVisibility(false);
      document.getElementById("frmDepositsDashboard_flxDepositsLeadScroll").onscroll = self.loadLeadDataOnScroll;
    } else{
      self.view.flxDepositsLeadScroll.setVisibility(false);
      self.view.flxListOfLeadsHeader.setVisibility(false);
      self.view.flxNoLeadsFound.setVisibility(true);

    }
    self.view.forceLayout();
  },
  /*
   * set paginted data to leads segment based on downward/upward scroll
   * @param: current page Data
   */
  setPaginatedDataToLeads : function(currPageData){
    var self =this;
    var exsistingData = self.view.segmentListOfLeads.data;
    var dataToSet = currPageData;
    if(self.forwardScroll){
      if(self.currentPage <= 2){
        dataToSet = exsistingData.concat(currPageData);
      } else if(self.currentPage > 2){
        var slicedData = exsistingData.slice(self.leadsPerPage);
        dataToSet = slicedData.concat(currPageData);
      }
    } else{
      var topScrollData = exsistingData.slice(0, self.leadsPerPage);
      dataToSet = currPageData.concat(topScrollData);
    }
    self.view.segmentListOfLeads.setData(dataToSet);
    if(self.currentPage === 1){
      self.view.flxDepositsLeadScroll.setContentOffset({
        x: 0,
        y: 3 + "px"
      });
    } else{
      self.view.flxDepositsLeadScroll.setContentOffset({
        x: 0,
        y: (self.leadsPerPage * 40) + "px"
      });
    }
    self.view.forceLayout();
  },
  /*
   * get data based on scroll to top/bottom
   */
  loadLeadDataOnScroll : function(context){
    var scopeObj = this;
    scopeObj.fetchLeadsPayload.recordsPerPage = scopeObj.leadsPerPage;

    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      // Forward scroll
      if ((scopeObj.currentPage + 1) <= scopeObj.totalPages) {
        scopeObj.currentPage = scopeObj.currentPage + 1;
        scopeObj.fetchLeadsPayload.pageNumber = scopeObj.currentPage;

        // scopeObj.leadsGettingSorted = false;
        scopeObj.forwardScroll = true;
        scopeObj.presenter.fetchLeadsForDeposits(scopeObj.fetchLeadsPayload);
      }
    }
    else if (Math.ceil(context.currentTarget.scrollTop) === 0) {
      // Backward scroll
      if ((scopeObj.currentPage - 1) > 0) {
        scopeObj.currentPage = scopeObj.currentPage - 2;
        scopeObj.fetchLeadsPayload.pageNumber = scopeObj.currentPage;

        //scopeObj.leadsGettingSorted = false;
        scopeObj.forwardScroll = false;
        scopeObj.presenter.fetchLeadsForDeposits(scopeObj.fetchLeadsPayload);
      }
    }
    scopeObj.view.forceLayout();
  },
  filterProductsForDeposits : function(productTypes){
    var self = this;
    var prodList =[],subProducts=[];
    for(var i=0;i<productTypes.length;i++){
      subProducts = productTypes[i].products;
      for(var j=0;j< subProducts.length;j++){
        if(subProducts[j].otherProductTypeId === "OTHER_PRODUCT_TYPE_ID1"){
          prodList = prodList.concat(subProducts[j]);
        }
      }
    }
    self.allProducts = prodList;
    self.setDepositCardsData(prodList);
  },

  /*
   * set Submitted applications list to segment
   * @param: list of Submitted applications
   */
  setSubmittedApplications : function(applications){
    var self = this;
    var widgetMap = {"lblDepositApplIdSubmit":"lblDepositApplIdSubmit",
                     "lblDepositApplProductSubmit":"lblDepositApplProductSubmit",
                     "lblDepositApplCreatedStarted":"lblDepositApplCreatedStarted",
                     "lblDepositApplSubmitOn":"lblDepositApplSubmitOn",
                     "lblDepositApplStatusSubmit":"lblDepositApplStatusSubmit",
                     "lblNavtoSummary":"lblNavtoSummary",
                     "flxNavtoSummary":"flxNavtoSummary",
                     "lblStartedSeperator":"lblStartedSeperator",
                     "flxDepositApplicationsSubmitted":"flxDepositApplicationsSubmitted",
                     "lblIconTrackApplication":"lblIconTrackApplication",
                     "flxTrackApplication":"flxTrackApplication"
                    };
    var data = applications.map(function(record){
      return {"lblDepositApplIdSubmit":record.ApplicationId || "N/A",
//               "lblDepositApplProductSubmit":{
//                 text: record.ProductId? self.trimSegText(record.ProductId, 18) : "N/A",
//                 tooltip: record.ProductId && record.ProductId.length > 18 ? record.ProductId : "",
//                 val: record.ProductId || "0",
//               },
              "lblDepositApplProductSubmit":record.ApplicationType || "N/A",
              "lblDepositApplCreatedStarted":record.createdts || "N/A",
              "lblDepositApplSubmitOn":record.lastmodifiedts || "N/A",
              "lblDepositApplStatusSubmit":record.ApplicationStatus,//record.statusDesc==="Active"?"Submitted":"Pending",
              "lblIconTrackApplication": {text:"\ue95f", onClick : self.trackApplication},
              "lblNavtoSummary": {text:"\ue956", onClick : self.navToAppSummary},
              "lblStartedSeperator":"lblStartedSeperator",
              "lblProductType":record.ProductType,
              "requestId" : record.RequestId,
              "template":"flxDepositApplicationsSubmitted"
             };
    });
    self.view.segmentListOfApplicationsSubmitted.widgetDataMap = widgetMap;
    self.sortBy = self.getObjectSorter("lblDepositApplIdSubmit");
    self.resetAllSortImages("submittedApplications");
    self.view.segmentListOfApplicationsSubmitted.setData(data);
    self.view.flxNoApplicationsFound.setVisibility(data.length <= 0);
    self.view.flxListOfApplicationsSubmittedHeader.setVisibility(data.length > 0);
    self.view.segmentListOfApplicationsSubmitted.setVisibility(data.length > 0);
    self.view.forceLayout();
  },

  navToAppSummary : function() {
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    var index = self.view.segmentListOfApplicationsSubmitted.selectedRowIndex[1];
    var selItems = self.view.segmentListOfApplicationsSubmitted.selectedItems[0];
    var applicationId = selItems.lblDepositApplIdSubmit;
    var productType = selItems.lblProductType;
    var requestId = selItems.requestId;
    var payload = {
      "applicationId" : applicationId,
      "productType" : productType,
      "requestId" : requestId
    };
    var MasterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");
    MasterDataModule.presentationController.openAppManagement(payload);
  },

  /*
   * set Started applications list to segment
   * @param: list of Started applications
   */
  setStartedApplications : function(applications){
    var self = this;
    var widgetMap = {"lblDepositApplIdStarted":"lblDepositApplIdStarted",
                     "lblDepositApplProductStarted":"lblDepositApplProductStarted",
                     "lblDepositApplCreatedStarted":"lblDepositApplCreatedStarted",
                     "lblDepositApplModifiedStarted":"lblDepositApplModifiedStarted",
                     "lblIconResume":"lblIconResume",
                     "flxResumeApplication":"flxResumeApplication",
                     "lblStartedSeperator":"lblStartedSeperator",
                     "flxStartedApplications":"flxStartedApplications",
                     "flxDepositApplicationsStarted":"flxDepositApplicationsStarted"
                    };
    var currentCustomerDetails = self.presenter.getCurrentCustomerDetails();
    var data = applications.map(function(record){

      return {"lblDepositApplIdStarted":record.ApplicationId || "N/A",
//               "lblDepositApplProductStarted": {
//                 text: record.ProductId? self.trimSegText(record.ProductId, 25) : "N/A",
//                 tooltip: record.ProductId && record.ProductId.length > 25 ? record.ProductId : "",
//                 val: record.ProductId || "0",
//               },
              "lblDepositApplProductStarted":record.ApplicationType || "N/A",
              "lblDepositApplCreatedStarted":record.createdts || "N/A",
              "lblDepositApplModifiedStarted":record.lastmodifiedts || "N/A",
              "lblIconResume": {
                text: "\ue956",
                onClick: self.resumeApplication,
              },
              "flxResumeApplication" :{
                isVisible: currentCustomerDetails.CustomerType_id === self.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE ? true : currentCustomerDetails.isCustomerAccessiable,
              },
              "SaveChallengeAnswer" : record.SaveChallengeAnswer,
              "lblStartedSeperator":"lblStartedSeperator",
              "flxDepositApplicationsStarted":"flxDepositApplicationsStarted"
             };
    });
    self.view.segmentListOfApplications.widgetDataMap = widgetMap;
    self.sortBy = self.getObjectSorter("lblDepositApplIdStarted");
    self.resetAllSortImages("startedApplications");
    self.view.segmentListOfApplications.setData(data);
    self.view.flxNoApplicationsFound.setVisibility(data.length <= 0);
    self.view.flxListOfApplicationsHeader.setVisibility(data.length > 0);
    self.view.segmentListOfApplications.setVisibility(data.length > 0);
    self.view.forceLayout();
  },

  resumeApplication: function(){
    var self = this;
    var index = self.view.segmentListOfApplications.selectedRowIndex[1];
    var selItems = self.view.segmentListOfApplications.selectedItems[0];
    var currentCustomerDetails = self.presenter.getCurrentCustomerDetails(), payload;
    if(currentCustomerDetails.CustomerType_id === self.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE){
      payload = {
        "customerid" : kony.store.getItem("Customer_id"),
        "ApplicationId" : selItems.lblDepositApplIdStarted,
        "SecurityAnswer" : selItems.SaveChallengeAnswer,
        "PhoneNumber" : currentCustomerDetails.PrimaryPhoneNumber,
        "ApplicationType" : selItems.lblDepositApplProductStarted
      };
      self.presenter.CSRAssistProspectOnboardingResumeApp(payload); 
    }
    else {
      payload = {
        "customerid" : kony.store.getItem("Customer_id"),
        "ApplicationId" : selItems.lblDepositApplIdStarted,
        "ApplicationType" : selItems.lblDepositApplProductStarted
      };
      self.presenter.CSRAssistCustomerOnboardingResumeApp(payload); 
    }
  },

  trackApplication: function(){
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    var index = self.view.segmentListOfApplicationsSubmitted.selectedRowIndex[1];
    var selItems = self.view.segmentListOfApplicationsSubmitted.selectedItems[0];
    var applicationId = selItems.lblDepositApplIdSubmit;
    var payload = {
      "applicationId" : applicationId,
    };
    var MasterDataModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("MasterDataModule");
    MasterDataModule.presentationController.openJourneyManager(payload);
  },

  trimSegText: function(text,len) {
    var final_text = text;
    if (text.length > len) final_text = text.substr(0, len) + "...";
    return final_text;
  },

  /*
   * function to sort the given segment data and set sort icons
   * @param: segment data, column to sort, icon path of column, context
   * @return : sorted data
   */
  getSortedList : function(segData, sortColumn, fontIconPath, context) {
    var self = this;
    self.sortBy.column(sortColumn);
    self.resetAllSortImages(context);
    self.determineSortFontIcon(this.sortBy, sortColumn,fontIconPath);
    return segData.sort(self.sortBy.sortData);
  },
  /*
   * display contextual menu for leads
   */
  toggleContextualMenu : function(){

    if (this.view.flxSelectOptionsLeads.isVisible === false) {
      var index = this.view.segmentListOfLeads.selectedIndex;
      var rowIndex = index[1];
      var templateArray = this.view.segmentListOfLeads.clonedTemplates;
      //to caluclate top from preffered row heights
      var finalHeight = 0; //seg header height
      for(var i = 0; i < rowIndex; i++){
        finalHeight = finalHeight + templateArray[i].flxDepositsLeads.frame.height;
      }
      this.updateMenuOptions(rowIndex);
      var segmentWidget = this.view.segmentListOfLeads;
      var contextualWidget =this.view.flxSelectOptionsLeads;
      finalHeight = ((finalHeight + 45)- segmentWidget.contentOffsetMeasured.y);
      if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
        finalHeight = finalHeight - contextualWidget.frame.height - 45;
      }
      contextualWidget.top= finalHeight + "px";
      contextualWidget.setVisibility(true);
    } else {
      this.view.flxSelectOptionsLeads.setVisibility(false);
    }
  },
  /*
   * display contextual menu options based on status
   */
  updateMenuOptions : function(rowIndex){
    var self =this;
    var rowData = self.view.segmentListOfLeads.data[rowIndex];
    if(rowData.lblStatus.info.id === "SID_INPROGRESS"){
      self.view.leadContextualMenu.flxMoveToNew.setVisibility(true);
      self.view.leadContextualMenu.flxMoveToInProgress.setVisibility(false);
    } else if(rowData.lblStatus.info.id === "SID_NEW" || rowData.lblStatus.info.id === "SID_ARCHIVED"){
      self.view.leadContextualMenu.flxMoveToNew.setVisibility(false);
      self.view.leadContextualMenu.flxMoveToInProgress.setVisibility(true);
    }
  },
  /*
   * on hover callback for hiding contextual menu
   */
  onHoverEventCallback : function(widget, context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
  },
  /*
   * navigates to create lead screen in lead management form
   */
  createLead : function(){
    var self =this;
    var isd = "",phn = "",extn = "";
    var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
    var contactarr = currentCustomerDetails.PrimaryPhoneNumber ? currentCustomerDetails.PrimaryPhoneNumber.split("-") : [];
    if(contactarr.length === 1){
      phn = contactarr[0]; 
    } else if(contactarr.length === 2){
      isd = (contactarr[0].indexOf("+") > 0) ? contactarr[0].substr(1,contactarr[0].length) : "";
      phn = isd ? contactarr[1] : contactarr[0];
    } else if(contactarr.length === 3){
      isd = contactarr[0];
      phn = contactarr[1];
      extn = contactarr[2];
    }
    var payload = {
      "custId":currentCustomerDetails.Customer_id,
      "custUsername":currentCustomerDetails.Username,
      "custFullname":currentCustomerDetails.Name,
      "saluation":currentCustomerDetails.Salutation,
      "firstName":currentCustomerDetails.FirstName,
      "middleName":currentCustomerDetails.MiddleName,
      "lastName":currentCustomerDetails.LastName,
      "email":currentCustomerDetails.PrimaryEmailAddress,
      "countryCode": isd,
      "phoneNumber":phn,
      "extension":extn,
      "productId":"",
      "note": ""
    };
    self.presenter.navigateToLeadCreateScreen(payload,"create",{formName:"customer",
                                                                breadcrumbBack : self.view.breadcrumbs.btnBackToMain.text});
  },
  /*
   * move lead to inprogress/new status
   */
  updateLeadStatus : function(){
    var self =this;
    var rowInd = self.view.segmentListOfLeads.selectedRowIndex[1];
    var segData = self.view.segmentListOfLeads.data;
    var updatePayload = {
      "leadId":segData[rowInd].leadId,
      "statusId": segData[rowInd].lblStatus.info.id === "SID_INPROGRESS" ? "SID_NEW" : "SID_INPROGRESS"
    };
    self.presenter.updateLeadStatus(updatePayload,"deposits");
  },
  /*
   * edit an exsisting lead by navigating to lead management form's edit screen
   */
  editLead : function(){
    var self =this;
    var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
    var selRow = self.view.segmentListOfLeads.selectedRowIndex[1];
    var rowData = self.view.segmentListOfLeads.data[selRow];
    var payload = {
      "custId":currentCustomerDetails.Customer_id,
      "leadId":rowData.leadData.id,
      "custUsername":currentCustomerDetails.Username,
      "custFullname":currentCustomerDetails.Name,
      "firstName":rowData.leadData.firstName,
      "middleName":self.AdminConsoleCommonUtils.getParamValueOrEmptyString(rowData.leadData.middleName),
      "lastName":rowData.leadData.lastName,
      "email":self.AdminConsoleCommonUtils.getParamValueOrEmptyString(rowData.leadData.email),
      "countryCode": self.AdminConsoleCommonUtils.getParamValueOrEmptyString(rowData.leadData.countryCode),
      "phoneNumber":self.AdminConsoleCommonUtils.getParamValueOrEmptyString(rowData.leadData.phoneNumber),
      "extension":self.AdminConsoleCommonUtils.getParamValueOrEmptyString(rowData.leadData.extension),
      "productId":rowData.leadData.productId,
      "productTypId":rowData.leadData.productType,
      "note": ""
    };

    self.presenter.navigateToLeadCreateScreen(payload,"edit",{formName:"customer",
                                                              breadcrumbBack : self.view.breadcrumbs.btnBackToMain.text});
  }
});
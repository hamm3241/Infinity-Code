define({
  allLeads : [],
  selectedLeads : [],
  leadsPerPage : 40,
  totalLeads : 0, // Needs to be set on fetch response
  currentPage: 1,
  totalPages : 0, // Needs to be set on fetch response
  currentStatusId : "SID_NEW",
  noLeadFlag : true,
  productData : [],
  supportedProductData : [],
  supportedProductType : [],
  customerMasterData : [],
  leadsGettingSorted : false,
  forwardScroll : true,
  firstTimeFlag : true,
  fromCustomerForm : null,
  customerId : null,
  fetchLeadsPayload : {
    "statusIds" : "SID_NEW",
    "productId" : "",
    "leadType" : "",
    "assignedTo" : "",
    "phoneNumber" : "",
    "emailAddress" : "",
    "pageNumber" : 1,
    "recordsPerPage" : 40,
    "modifiedStartDate" : "",
    "modifiedEndDate" : "",
    "sortCriteria" : "lastmodifiedts",
    "sortOrder" : "desc"
  },
  sortLeadsJSON : {
    "firstName" : {
      "sortCriteria" : "firstName",
      "sortOrder" : "asc"
    },
    "productName" : {
      "sortCriteria" : "productName",
      "sortOrder" : "asc"
    },
    "assignedToFirstName" : {
      "sortCriteria" : "assignedToFirstName",
      "sortOrder" : "asc"
    },
    "lastmodifiedts" : {
      "sortCriteria" : "lastmodifiedts",
      "sortOrder" : "asc"
    }
  },
  activeLead : {
    "id" : "",
    "isCustomer" : false,
    "customerId" : "",
    "name" : "",
    "statusId" : "",
    "product" : "",
    "phone" : "",
    "email" : "",
    "assignedTo" : "",
    "createdBy" : "",
    "createdOn" : "",
    "modifiedOn" : "",
    "closureReason" : ""
  },  

  willUpdateUI : function (context) {
    this.updateLeftMenu(context);
    if(!context) {
      return;
    }

    if(context.LoadingScreen) {
      if(context.LoadingScreen.focus)
        kony.adminConsole.utils.showProgressBar(this.view);
      else
        kony.adminConsole.utils.hideProgressBar(this.view);
    }

    if(context.fetchLeads) {
      this.fetchLeadsResponse(context);
    }
    else if(context.fetchLeadDetails) {
      this.fetchLeadDetailsResponse(context);
    }
    else if(context.fetchAllProducts) {
      this.generateProductList(context);
      this.generateCustomerList();
    }
    else if(context.fetchSupportedProducts){
      this.generateSupportedProductList(context);
    }
    else if(context.fetchNotes) {
      this.fetchNotesResponse(context);
    }
    else if(context.addNotes) {
      this.addNotesResponse(context);
    }
    else if(context.updateLead) {
      if(context.action === "statusUpdate")
        this.updateLeadResponse(context);
      else if(context.action === "completeUpdate")
        this.leadEdited(context);
    }
    else if(context.updateLeadStatusOnViewLeads) {
      this.updateLeadStatusOnViewLeadsResponse(context);
    }
    else if(context.updateLeadStatusOnViewLeadDetails) {
      this.updateLeadStatusOnViewLeadDetailsResponse(context);
    }
    else if(context.fetchLeadStatusCount) {
      this.fetchLeadStatusCountResponse(context);
    }
    else if (context.createLead){
      this.leadcreated(context);
    }
    else if(context.fromCustomer){
      var data = context.data;
      this.fromCustomerForm = context.navObj.formName;
      this.customerId = data.custId;
      if(context.action === "create"){
        this.showLeadCreateScreenFromCustomer(data,context.navObj);
      }else if(context.action === "edit"){
        this.showEditScreenFromCustomer(data,context.navObj);
      }
    }
    this.view.forceLayout();
  },

  preShowActions : function() {
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads");
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.flxMain.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.flxMainContent.height = (kony.os.deviceInfo().screenHeight - 126) + "px";
    this.view.flxViewLeadsInner.height = (kony.os.deviceInfo().screenHeight - 126 - 20) + "px";
    this.view.createUpdate.height = (kony.os.deviceInfo().screenHeight - 126 - 20) + "px";
    this.view.createUpdate.flxCreateUpdate.height = (kony.os.deviceInfo().screenHeight - 126 - 120) + "px";
    this.view.flxViewLeadsData.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 20) + "px";
    this.view.flxViewLeadsList.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 56 - 20) + "px";
    this.view.viewLeads.flxTableView.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 56 - 60 - 20) + "px";
    this.view.flxViewLeadsFilters.setVisibility(false);
    this.view.flxNote.setVisibility(false);
    this.view.flxViewLeads.setVisibility(false);
    this.currentPage = 1;
    this.forwardScroll = true;
    this.setTabSkins(this.view.countTabs.flxCounter1);
    this.clearFilterData();
    this.setFlowActions();
    this.presenter.fetchAllProducts(false,{});
    this.view.forceLayout();
  },

  setFlowActions : function() {
    var scopeObj = this;

    this.view.createUpdate.txtAreaLeadNotes.onBeginEditing = function(){
      scopeObj.view.createUpdate.lblLeadNoteCount.text = scopeObj.view.createUpdate.txtAreaLeadNotes.text.length +"/1000";
    };
    
    this.view.createUpdate.txtAreaLeadNotes.onKeyUp = function(){
      scopeObj.view.createUpdate.lblLeadNoteCount.text = scopeObj.view.createUpdate.txtAreaLeadNotes.text.length +"/1000";
    };

    this.view.flxLeadFilter.onClick = function() {
      scopeObj.viewLeadFilters();
    };

    this.view.flxCloseSearchFilter.onTouchStart = function(){
      scopeObj.hideLeadFilters();
    };

    this.view.viewLeads.segLeads.onRowClick = function() {
      scopeObj.leadClicked();
    };

    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.breadCrumbBackToMain();
    };

    this.view.countTabs.flxCounter1.onTouchStart = function(){
      scopeObj.tabOnClick(scopeObj.view.countTabs.flxCounter1, "SID_NEW");
    };
    this.view.countTabs.flxCounter2.onTouchStart = function(){
      scopeObj.tabOnClick(scopeObj.view.countTabs.flxCounter2, "SID_INPROGRESS");
    };
    this.view.countTabs.flxCounter3.onTouchStart = function(){
      scopeObj.tabOnClick(scopeObj.view.countTabs.flxCounter3, "SID_ARCHIVED");
    };

    this.view.viewLeads.flxLeadNameSort.onClick = function() {
      scopeObj.viewLeadsByFilter("", "", scopeObj.sortLeadsJSON.firstName.sortCriteria, scopeObj.sortLeadsJSON.firstName.sortOrder);
      scopeObj.sortLeads(scopeObj.sortLeadsJSON.firstName, scopeObj.view.viewLeads.fonticonLeadNameSort);
    };
    this.view.viewLeads.flxLeadProductSort.onClick = function() {
      scopeObj.viewLeadsByFilter("", "", scopeObj.sortLeadsJSON.productName.sortCriteria, scopeObj.sortLeadsJSON.productName.sortOrder);
      scopeObj.sortLeads(scopeObj.sortLeadsJSON.productName, scopeObj.view.viewLeads.fonticonLeadProductSort);
    };
    this.view.viewLeads.flxLeadAssignedToSort.onClick = function() {
      scopeObj.viewLeadsByFilter("", "", scopeObj.sortLeadsJSON.assignedToFirstName.sortCriteria, scopeObj.sortLeadsJSON.assignedToFirstName.sortCriteria);
      scopeObj.sortLeads(scopeObj.sortLeadsJSON.assignedToFirstName, scopeObj.view.viewLeads.fonticonLeadAssignedToSort);
    };
    this.view.viewLeads.flxLeadModifiedOnSort.onClick = function() {
      scopeObj.viewLeadsByFilter("", "", scopeObj.sortLeadsJSON.lastmodifiedts.sortCriteria,  scopeObj.sortLeadsJSON.lastmodifiedts.sortOrder);
      scopeObj.sortLeads(scopeObj.sortLeadsJSON.lastmodifiedts, scopeObj.view.viewLeads.fonticonLeadModifiedOnSort);
    };

    this.view.flxLeadDetailsOptions.onClick = function() {
      scopeObj.leadDetailsOptionsClicked();
    };

    // NOTES
    this.view.btnNotes.onClick = function(){
      scopeObj.viewLeadNotes();
    };
    this.view.Notes.txtAreaNotes.onKeyUp = function () {
      scopeObj.view.Notes.lblNotesSize.text = scopeObj.view.Notes.txtAreaNotes.text.length + "/1000";
      scopeObj.view.Notes.lblNotesSize.right = "0px";
      scopeObj.view.Notes.lblNotesSize.setVisibility(true);
    };
    this.view.Notes.txtAreaNotes.onEndEditing = function () {
      scopeObj.view.Notes.lblNotesSize.setVisibility(false);
    };
    this.view.Notes.flxCloseNotes.onClick = function () {
      scopeObj.view.flxNote.setVisibility(false);
    };
    this.view.Notes.addBtn.onClick = function () {
      scopeObj.addNotes();
    };
    this.view.btnApply.onClick = function(){
      scopeObj.viewLeadsByFilter("","","","");//email, phoneNumber
    };

    this.view.btnLeadSearch.onClick = function(){
      scopeObj.searchBarStringValidation(scopeObj.view.tbxLeadSearchBox.text);
    };
    this.view.tbxLeadSearchBox.onDone = function(){
      scopeObj.searchBarStringValidation(scopeObj.view.tbxLeadSearchBox.text);
    };
    this.view.flxIconLeadClear.onTouchStart = function(){
      scopeObj.currentPage = 1;
      
      scopeObj.view.tbxLeadSearchBox.text = "";
      scopeObj.fetchLeadsPayload.pageNumber = scopeObj.currentPage;
      scopeObj.fetchLeadsPayload.emailAddress = "";
      scopeObj.fetchLeadsPayload.phoneNumber = "";
      scopeObj.viewLeadsByFilter("","","","");
      
      scopeObj.view.flxIconLeadClear.setVisibility(false);
    };
    this.view.tbxLeadSearchBox.onKeyUp = function(){
      scopeObj.view.flxIconLeadClear.setVisibility(true);
      if(scopeObj.view.tbxLeadSearchBox.text === ""){
        scopeObj.view.flxIconLeadClear.setVisibility(false);
        scopeObj.viewLeadsByFilter("","","","");
      }
    };
	this.view.tbxLeadSearchBox.onBeginEditing = function(){
      scopeObj.view.flxIconLeadClear.setVisibility(true);
    };
    this.view.leadContextualMenu.flxMoveToInProgress.onClick = function() {
      scopeObj.updateLeadStatus("SID_INPROGRESS", true);
    };
    this.view.leadContextualMenu.flxMoveToNew.onClick = function() {
      scopeObj.updateLeadStatus("SID_NEW", true);
    };
    this.view.btnMoveToInProgress.onClick = function() {
      scopeObj.updateLeadStatus("SID_INPROGRESS", false);
    };
    this.view.btnMoveToNew.onClick = function() {
      scopeObj.updateLeadStatus("SID_NEW", false);
    };

    this.view.flxViewProfile.onClick = function() {
      scopeObj.showCustomerProfile();
    };

    this.view.btnCreateLeads.onClick = function(){
      scopeObj.showCreateLeadScreen();
    };

    this.view.createUpdate.leadsCommonButtons.btnCancel.onClick = function(){
      scopeObj.showHideCreateEditUIHandler("hide");
      // for navigating back to customer profile
      if(scopeObj.fromCustomerForm=="customer"){
        scopeObj.showCustomerProfile(scopeObj.customerId);
      }
    };

    this.view.createUpdate.leadsCommonButtons.btnSave.onClick = function(){
      if(scopeObj.createUpdateValidations()){
        if(scopeObj.view.createUpdate.leadsCommonButtons.btnSave.text === kony.i18n.getLocalizedString("i18n.frmLogsController.Create").toUpperCase())
          scopeObj.createLead();
        else if(scopeObj.view.createUpdate.leadsCommonButtons.btnSave.text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Update").toUpperCase())
          scopeObj.updateLead();
      }
    };

    this.view.leadContextualMenu.flxEdit.onTouchStart = function(){
      scopeObj.showUpdateLeadScreen();
    };

    this.view.leadDetailsContextualMenu.flxEdit.onTouchStart = function(){
      scopeObj.showUpdateLeadScreen();
    };
    
    this.view.createUpdate.txtLeadFirstName.onKeyUp = function(){
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.txtLeadFirstName, scopeObj.view.createUpdate.flxErrorLeadFirstName, "sknTbxFFFFFFBorDEDEDE13pxKA");
    };
    this.view.createUpdate.txtLeadLastName.onKeyUp = function(){
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.txtLeadLastName, scopeObj.view.createUpdate.flxErrorLeadLastName, "sknTbxFFFFFFBorDEDEDE13pxKA");
    };
    this.view.createUpdate.txtLeadMail.onKeyUp = function(){
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.txtLeadMail, scopeObj.view.createUpdate.flxErrorLeadEmail, "sknTbxFFFFFFBorDEDEDE13pxKA");
    };
    this.view.createUpdate.leadPhoneNumber.txtISDCode.onKeyUp = function(){
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.leadPhoneNumber.txtISDCode, scopeObj.view.createUpdate.flxErrorLeadPhoneNumber, "sknTbxFFFFFFBorDEDEDE13pxKA");
    };
    this.view.createUpdate.leadPhoneNumber.txtISDCode.onEndEditing = function(){
      scopeObj.view.createUpdate.leadPhoneNumber.txtISDCode.text = scopeObj.view.createUpdate.leadPhoneNumber.addingPlus(scopeObj.view.createUpdate.leadPhoneNumber.txtISDCode.text);
    };
    this.view.createUpdate.leadPhoneNumber.txtContactNumber.onKeyUp = function(){
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.leadPhoneNumber.txtContactNumber, scopeObj.view.createUpdate.flxErrorLeadPhoneNumber, "sknTbxFFFFFFBorDEDEDE13pxKA");
    };
    this.view.createUpdate.listBoxLeadProductType.onSelection = function(){
      scopeObj.setcreateUpdateProductData();
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.listBoxLeadProductType, scopeObj.view.createUpdate.flxErrorLeadProductType, "sknlstbxNormal0f9abd8e88aa64a");
    };
    this.view.createUpdate.listBoxLeadProduct.onSelection = function(){
      scopeObj.hideValidationErrors(scopeObj.view.createUpdate.listBoxLeadProduct, scopeObj.view.createUpdate.flxErrorLeadProduct, "sknlstbxNormal0f9abd8e88aa64a");
    };
  },

  fetchLeadsResponse : function(context) {
    var scopeObj = this;

    if(context.fetchLeads === "success") {
      scopeObj.openViewLeads(context);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageFetchLeadsFailure"), scopeObj);
    }
  },

  fetchLeadDetailsResponse : function(context) {
    var scopeObj = this;

    if(context.fetchLeadDetails === "success") {
      scopeObj.populatingLeadDetails(context.leads[0]);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageFetchLeadDetailsFailure"), scopeObj);
    }
  },

  fetchNotesResponse : function(context) {
    var scopeObj = this;

    if(context.fetchNotes === "success") {
      scopeObj.setNotes(context.notes);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageFetchNotesFailure"), scopeObj);
    }
  },

  addNotesResponse : function(context) {
    var scopeObj = this;

    if(context.addNotes === "failure") {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageAddNotesFailure"), scopeObj);
    }
  },

  updateLeadStatusOnViewLeadsResponse : function(context) {
    var scopeObj = this;

    if(context.updateLeadStatusOnViewLeads === "success") {
      if(context.statusId === "SID_NEW") {
        scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageUpdateLeadStatusNewSuccess"), scopeObj);
      }
      else if(context.statusId === "SID_INPROGRESS") {
        scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageUpdateLeadStatusInProgressSuccess"), scopeObj);
      }
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageUpdateLeadStatusFailure"), scopeObj);
    }
  },

  updateLeadStatusOnViewLeadDetailsResponse : function(context) {
    var scopeObj = this;

    if(context.updateLeadStatusOnViewLeadDetails === "success") {
      if(context.statusId === "SID_NEW") {
        scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageUpdateLeadStatusNewSuccess"), scopeObj);
        scopeObj.view.btnMoveToNew.setVisibility(false);
        scopeObj.view.btnMoveToInProgress.setVisibility(true);
        scopeObj.setTabSkins(scopeObj.view.countTabs.flxCounter1);
      }
      else if(context.statusId === "SID_INPROGRESS") {
        scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageUpdateLeadStatusInProgressSuccess"), scopeObj);
        scopeObj.view.btnMoveToInProgress.setVisibility(false);
        scopeObj.view.btnMoveToNew.setVisibility(true);
        scopeObj.setTabSkins(scopeObj.view.countTabs.flxCounter2);
      }

      scopeObj.activeLead.statusId = context.statusId;
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageUpdateLeadStatusFailure"), scopeObj);
    }
  },

  fetchLeadStatusCountResponse : function(context) {
    var scopeObj = this;

    if(context.fetchLeadStatusCount === "success") {
      scopeObj.setLeadStatusCount(context.statusCount);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.LeadManagement.toastmessageFetchLeadStatusCountFailure"), scopeObj);
    }
  },

  tabOnClick : function(selectedTab, clickedStatus) {
    var scopeObj = this;

    this.currentPage = 1;
    this.forwardScroll = true;
    this.clearFilterData();

    scopeObj.setTabSkins(selectedTab);

    var fetchLeadsJSON = this.presenter.getDefaultFetchLeadsJSON();
    fetchLeadsJSON.statusIds = clickedStatus ? clickedStatus : "SID_NEW";

    this.presenter.fetchLeads(fetchLeadsJSON);
  },

  setTabSkins : function(selectedTab) {
    var tabArray = [this.view.countTabs.flxCounter1, this.view.countTabs.flxCounter2, this.view.countTabs.flxCounter3];
    for(var i = 0; i < tabArray.length; ++i) {
      tabArray[i].skin = "sknflxLeadTabs";
    }
    selectedTab.skin = "sknFlxbgFFFFFFBorder006cca";
  },

  openViewLeads : function(context) {
    var scopeObj = this;
    
    this.currentStatusId = context.statusId;
    this.forwardScroll = context.forwardScroll;
    
    this.currentPage = context.currentPage;
    this.allLeads = context.leads;
    this.totalLeads = context.totalLeads;
    this.totalPages = Math.ceil(this.totalLeads / this.leadsPerPage);

    //After navigating from customer to create lead, on click of "view leads" breadcrumb "the customer name" breadcrumb must be unvisibile
    if(this.fromCustomerForm=="customer"){
      this.resetChangesOnLeavingLeads();
    }
    this.fromCustomerForm = null;
    this.customerId = null;

    this.setLeadStatusCount(context.statusCount);

    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads");
    this.view.btnCreateLeads.setVisibility(true);
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.flxViewLeads.setVisibility(true);
    this.view.flxViewLeadsFilters.setVisibility(false);
    this.view.flxNote.setVisibility(false);
    this.view.flxFilterOverLay.setVisibility(false);
    this.view.btnNotes.setVisibility(false);
    this.view.leadContextualMenu.setVisibility(false);
    this.view.flxCreateUpdateLeads.setVisibility(false);

    if(scopeObj.allLeads.length > 0) {
      scopeObj.view.flxLeadsUnavailable.setVisibility(false);
      scopeObj.view.flxLeadsAvailable.setVisibility(true);
      scopeObj.view.flxViewLeadsTabs.setVisibility(true);
      scopeObj.view.flxViewLeadsData.setVisibility(true);
      scopeObj.view.flxLeadsDetails.setVisibility(false);
      scopeObj.view.flxNoResultFound.setVisibility(false);
      scopeObj.view.flxViewLeadsList.setVisibility(true);
      scopeObj.view.flxNoResultFoundinner.setVisibility(false);
      scopeObj.noLeadFlag = false;
      scopeObj.setLeads(scopeObj.allLeads);
    }
    else {
      if(context.searchFlag === true){
        scopeObj.view.flxLeadsAvailable.setVisibility(true);
        scopeObj.view.flxViewLeadsInner.setVisibility(true);
        scopeObj.view.flxViewLeadsTabs.setVisibility(true);
        scopeObj.view.flxViewLeadsData.setVisibility(true);
        scopeObj.view.flxViewLeadsTop.setVisibility(true);
        scopeObj.view.flxViewLeadsSeparator.setVisibility(true);
        scopeObj.view.flxViewLeadsList.setVisibility(false);
        scopeObj.view.flxNoResultFoundinner.setVisibility(true);
        scopeObj.view.flxLeadsUnavailable.setVisibility(false);
      }else{
        scopeObj.view.flxViewLeadsList.setVisibility(true);
        scopeObj.view.flxNoResultFoundinner.setVisibility(false);
        if(scopeObj.noLeadFlag){
          scopeObj.view.flxLeadsAvailable.setVisibility(false);
          scopeObj.view.flxLeadsUnavailable.setVisibility(true);
          scopeObj.noLeadFlag = false;
        }
        else{
          scopeObj.view.flxViewLeadsTabs.setVisibility(true);
          scopeObj.view.flxViewLeadsData.setVisibility(false);
          scopeObj.view.flxLeadsDetails.setVisibility(false);
          scopeObj.view.flxNoResultFound.setVisibility(true);
        }
      }
    }
  },

  setLeadStatusCount : function(statusCount) {
    var scopeObj = this;

    for(var i = 0; i < statusCount.length; ++i) {
      if(statusCount[i].leadStatus === "SID_NEW") {
        scopeObj.view.countTabs.lblCounter1.text = statusCount[i].count;
      }
      else if(statusCount[i].leadStatus === "SID_INPROGRESS") {
        scopeObj.view.countTabs.lblCounter2.text = statusCount[i].count;
      }
      else if(statusCount[i].leadStatus === "SID_ARCHIVED") {
        scopeObj.view.countTabs.lblCounter3.text = statusCount[i].count;
      }
    }

    this.view.forceLayout();
  },

  setLeads : function(leads) {
    var leadsSegmentData = leads.map(this.mappingLeadsData);
    this.setLeadsSegmentData(leadsSegmentData);
  },

  mappingLeadsData : function(data) {
    var scopeObj = this;

    var leadName = data.lblLeadName ? (data.lblLeadName.tooltip) : 
    (data.firstName + (data.middleName ? (" " + data.middleName) : "") + " " + data.lastName);
    var leadNameTooltip = data.lblLeadName ? (data.lblLeadName.tooltip) : 
    (data.firstName + " " + (data.middleName ? (" " + data.middleName) : "") + " " + data.lastName);
    if(leadName.length > 16) {
      leadName = leadName.substring(0, 16) + "...";
    }

    var leadPhone = data.lblLeadPhone ? (data.lblLeadPhone.tooltip) : 
    ((data.countryCode ? ("+" + data.countryCode + "-") : "") + data.phoneNumber + (data.extension ? ("-" + data.extension) : ""));
    var leadPhoneTooltip = data.lblLeadPhone ? (data.lblLeadPhone.tooltip) : 
    ((data.countryCode ? ("+" + data.countryCode + "-") : "") + data.phoneNumber + (data.extension ? ("-" + data.extension) : ""));
    if(leadPhone.length > 20) {
      leadPhone = leadPhone.substring(0, 20) + "...";
    }

    var leadEmail = data.email || data.lblLeadEmail.tooltip;
    var leadEmailTooltip = data.email || data.lblLeadEmail.tooltip;
    if(leadEmail.length > 25) {
      leadEmail = leadEmail.substring(0, 25) + "...";
    }

    var leadProduct = data.productName || data.lblLeadProduct.tooltip;
    var leadProductTooltip = data.productName || data.lblLeadProduct.tooltip;
    if(leadProduct.length > 20) {
      leadProduct = leadProduct.substring(0, 20) + "...";
    }

    var leadAssignedTo = data.lblLeadAssignedTo ? (data.lblLeadAssignedTo.tooltip) : 
    ((data.assignedToFirstName ? data.assignedToFirstName : "None") + 
     (data.assignedToMiddleName ? (" " + data.assignedToMiddleName) : "") + " " + 
     (data.assignedToLastName ? data.assignedToLastName : ""));
    var leadAssignedToTooltip = data.lblLeadAssignedTo ? (data.lblLeadAssignedTo.tooltip) : 
    ((data.assignedToFirstName ? data.assignedToFirstName : "None") +
     (data.assignedToMiddleName ? (" " + data.assignedToMiddleName) : "") + " " + 
     (data.assignedToLastName ? data.assignedToLastName : ""));
    if(leadAssignedTo.length > 20) {
      leadAssignedTo = leadAssignedTo.substring(0, 20) + "...";
    }

    return {
      "id" : data.id,
      "createdBy" : data.createdBy || (data.createdByFirstName + (data.createdByMiddleName ? (" " + data.createdByMiddleName) : "") + " " + data.createdByLastName),
      "createdOn" : data.createdOn || scopeObj.formatDateMMslashDDslashYYYY(data.createdts),
      "statusId" : data.statusId,
      "isCustomer" : data.isCustomer === "1" ? true : false,
      "customerId" : data.customerId,
      "saluation":"",
      "firstName":data.firstName,
      "middleName":data.middleName,
      "lastName":data.lastName,
      "countryCode":data.countryCode,
      "phoneNumber":data.phoneNumber,
      "extension":data.extension,
      "productId":data.productId,
      "productType" : data.productType,
      "closureReason" :data.closureReason ? data.closureReason : "",
      "fonticonLeadType" : {
        "text" : data.isCustomer === "1" ? kony.i18n.getLocalizedString("i18n.userwidgetmodel.fonticonCustomer") : 
        kony.i18n.getLocalizedString("i18n.userwidgetmodel.fonticonNonCustomer"),
        "tooltip" : data.isCustomer === "1" ? "Customer" : "Non Customer"
      },
      "lblLeadName" : {
        "text" : leadName,
        "tooltip" : leadNameTooltip
      },
      "lblLeadPhone" : {
        "text" : leadPhone,
        "tooltip" : leadPhoneTooltip
      },
      "lblLeadEmail" : {
        "text" : leadEmail,
        "tooltip" : leadEmailTooltip
      },
      "lblLeadProduct" : {
        "text" : leadProduct,
        "tooltip" : leadProductTooltip
      },
      "lblLeadAssignedTo" : {
        "text" : leadAssignedTo,
        "tooltip" : leadAssignedToTooltip
      },
      "lblLeadModifiedOn" : {
        "text" : data.lblLeadModifiedOn ? data.lblLeadModifiedOn.text : scopeObj.formatDateMMslashDDslashYYYY(data.lastmodifiedts)
      },
      "flxOptions": {
        "onClick": function() {
          scopeObj.toggleContextualMenu();
        }
      },
      "lblIconOptions" : {
        "text" : "",
        "skin" : "sknFontIconOptionMenu"
      },
      "lblSeparator" : {
        "skin" : "sknLeadSeparator"
      },
    };
  },

  setLeadsSegmentData : function(newLeadsData) {
    var scopeObj = this;

    if(newLeadsData.length === 0) {
      scopeObj.view.flxLeadsAvailable.setVisibility(false);
      scopeObj.view.flxLeadsUnavailable.setVisibility(true);
    }
    else {
      scopeObj.view.flxLeadsUnavailable.setVisibility(false);
      scopeObj.view.flxLeadsAvailable.setVisibility(true);

      scopeObj.view.lblLeadCountStart.text = 1;
      scopeObj.view.lblLeadCountEnd.text = ((scopeObj.leadsPerPage * scopeObj.currentPage) > scopeObj.totalLeads) ? 
        scopeObj.totalLeads : (scopeObj.leadsPerPage * scopeObj.currentPage);
      scopeObj.view.lblLeadCountTotal.text = scopeObj.totalLeads;

      var dataMap = {
        "id" : "id",
        "createdBy" : "createdBy",
        "createdOn" : "createdOn",
        "statusId" : "statusId",
        "isCustomer" : "isCustomer",
        "customerId" : "customerId",
        "fonticonLeadType" : "fonticonLeadType",
        "lblLeadName" : "lblLeadName",
        "lblLeadPhone" : "lblLeadPhone",
        "lblLeadEmail" : "lblLeadEmail",
        "lblLeadProduct" : "lblLeadProduct",
        "lblLeadAssignedTo" : "lblLeadAssignedTo",
        "lblLeadModifiedOn" : "lblLeadModifiedOn",
        "flxOptions" : "flxOptions",
        "lblIconOptions" : "lblIconOptions",
        "lblSeparator" : "lblSeparator"
      };

      scopeObj.view.viewLeads.segLeads.widgetDataMap = dataMap;

      if (!scopeObj.leadsGettingSorted) {

        var segmentData = scopeObj.view.viewLeads.segLeads.data;
        scopeObj.view.viewLeads.segLeads.removeAll();

        if(scopeObj.forwardScroll) {
          if(scopeObj.fetchLeadsPayload.pageNumber == 1) {
            scopeObj.view.viewLeads.segLeads.setData(newLeadsData);

            scopeObj.view.viewLeads.flxTableView.setContentOffset({
              x : "0px",
              y : "0px"
            });
          }
          else if(scopeObj.fetchLeadsPayload.pageNumber == 2) {
            segmentData = segmentData.concat(newLeadsData);
            scopeObj.view.viewLeads.segLeads.setData(segmentData);

            scopeObj.view.viewLeads.flxTableView.setContentOffset({
              x : "0px",
              y : (scopeObj.leadsPerPage * 60) + "px"
            });
          }
          else if(scopeObj.fetchLeadsPayload.pageNumber >= 3) {
            segmentData = segmentData.slice(scopeObj.leadsPerPage);
            segmentData = segmentData.concat(newLeadsData);
            scopeObj.view.viewLeads.segLeads.setData(segmentData);

            scopeObj.view.viewLeads.flxTableView.setContentOffset({
              x : "0px",
              y : ((scopeObj.leadsPerPage * 60) - scopeObj.view.viewLeads.flxTableView.frame.height) + "px"
            });
          }
        }
        else {
          segmentData = segmentData.slice(0, scopeObj.leadsPerPage);
          segmentData = newLeadsData.concat(segmentData);
          scopeObj.view.viewLeads.segLeads.setData(segmentData);

          scopeObj.view.viewLeads.flxTableView.setContentOffset({
            x : "0px",
            y : (scopeObj.leadsPerPage * 60) + "px"
          });
        }
      }
      else {
        scopeObj.view.viewLeads.segLeads.setData(newLeadsData);
      }

      if((scopeObj.view.lblLeadCountTotal.text * 60) > 
         scopeObj.view.viewLeads.flxTableView.height.substring(0, scopeObj.view.viewLeads.flxTableView.height.length - 2)) {
        scopeObj.view.viewLeads.flxHeaders.right = "17px";
        scopeObj.view.flxViewLeadsSeparator.right = "17px";
      }
      else {
        scopeObj.view.viewLeads.flxHeaders.right = "0px";
        scopeObj.view.flxViewLeadsSeparator.right = "0px";
      }

      scopeObj.view.viewLeads.flxNoRecordsFound.setVisibility(false);
      scopeObj.view.viewLeads.flxTableView.setVisibility(true);

      scopeObj.view.flxViewLeadsInner.height = (kony.os.deviceInfo().screenHeight - 126 - 20) + "px";
      scopeObj.view.flxViewLeadsData.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 20) + "px";
      scopeObj.view.flxViewLeadsList.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 56 - 20) + "px";
      scopeObj.view.viewLeads.flxTableView.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 56 - 60 - 20) + "px";

      document.getElementById("frmLeadManagement_viewLeads_flxTableView").onscroll = this.fetchLeadsOnScroll;
    }

    this.view.flxViewLeads.setVisibility(true);
    this.view.forceLayout();
  },

  fetchLeadsOnScroll: function(context) {
    var scopeObj = this;

    scopeObj.fetchLeadsPayload.statusIds = scopeObj.currentStatusId;
    scopeObj.fetchLeadsPayload.recordsPerPage = scopeObj.leadsPerPage;

    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      // Forward scroll
      if ((scopeObj.currentPage + 1) <= scopeObj.totalPages) {
        scopeObj.currentPage = scopeObj.currentPage + 1;
        scopeObj.fetchLeadsPayload.pageNumber = scopeObj.currentPage;

        scopeObj.leadsGettingSorted = false;
        scopeObj.forwardScroll = true;
        scopeObj.presenter.fetchLeads(scopeObj.fetchLeadsPayload, scopeObj.currentPage, scopeObj.forwardScroll);
      }
    }
    else if (Math.ceil(context.currentTarget.scrollTop) === 0) {
      // Backward scroll
      if (scopeObj.currentPage != 2 && scopeObj.fetchLeadsPayload.pageNumber != 1) {
        scopeObj.currentPage = scopeObj.currentPage - 1;
        scopeObj.fetchLeadsPayload.pageNumber = scopeObj.currentPage - 1;

        scopeObj.leadsGettingSorted = false;
        scopeObj.forwardScroll = false;
        scopeObj.presenter.fetchLeads(scopeObj.fetchLeadsPayload, scopeObj.currentPage, scopeObj.forwardScroll);
      }
    }
    scopeObj.view.forceLayout();
  },

  toggleContextualMenu: function() {
    var scopeObj = this;

    var index = scopeObj.view.viewLeads.segLeads.selectedRowIndex[1];
    var data = scopeObj.view.viewLeads.segLeads.data[index];

    scopeObj.activeLead = {
      "id" : data.id,
      "name" : data.lblLeadName.tooltip,
      "statusId" : data.statusId,
      "isCustomer" : data.isCustomer,
      "customerId" : data.customerId,
      "product" : data.lblLeadProduct.tooltip,
      "phone" : data.lblLeadPhone.tooltip,
      "email" : data.lblLeadEmail.tooltip,
      "assignedTo" : data.lblLeadAssignedTo.tooltip,
      "createdBy" : data.createdBy,
      "createdOn" : data.createdOn,
      "modifiedOn" : data.lblLeadModifiedOn.text
    };

    var templateArray = this.view.viewLeads.segLeads.clonedTemplates;
    var height = 0;
    for(var i = 0; i < index; i++) {
      height += templateArray[i].flxLeads.frame.height;
    }

    var segmentWidget = this.view.viewLeads.flxTableView;
    var contextualWidget = this.view.leadContextualMenu;
    height = (height + 60) - segmentWidget.contentOffsetMeasured.y;
    if(height + contextualWidget.frame.height > segmentWidget.frame.height) {
      height = height - contextualWidget.frame.height - 60;
    }
    height = height + 60 + "px";

    if ((scopeObj.view.leadContextualMenu.isVisible === false) ||
        (scopeObj.view.leadContextualMenu.isVisible === true && scopeObj.view.leadContextualMenu.top !== height)) {

      scopeObj.view.leadContextualMenu.top = height;
      scopeObj.view.leadContextualMenu.left = scopeObj.view.viewLeads.segLeads.clonedTemplates[0].flxLeadOptions.frame.x - 140 + "px";
      if(scopeObj.activeLead.statusId === "SID_NEW") {
        scopeObj.view.leadContextualMenu.flxMoveToNew.setVisibility(false);
        scopeObj.view.leadContextualMenu.flxMoveToInProgress.setVisibility(true);
      }
      else if(scopeObj.activeLead.statusId === "SID_INPROGRESS") {
        scopeObj.view.leadContextualMenu.flxMoveToInProgress.setVisibility(false);
        scopeObj.view.leadContextualMenu.flxMoveToNew.setVisibility(true);
      }

      scopeObj.view.leadContextualMenu.setVisibility(true);
      scopeObj.view.leadContextualMenu.onHover = scopeObj.onLeadContextualMenuHoverEventCallback;
    }
    else {
      scopeObj.view.leadContextualMenu.setVisibility(false);
    }

    this.view.forceLayout();
  },

  generateProductList : function(context){
    var self = this;
    if(self.productData.length === 0)
    {    
      if(context.fetchAllProducts === "success"){
        var productMasterData = [];
        productMasterData.push(["Select Product","Select Product"]);
        for(var i = 0 ; i < context.records.length ; i++){
          if(context.records[i].products.length){
            for(var j = 0 ; j <  context.records[i].products.length ; j++){
              var temp_data = [];
              temp_data.push(context.records[i].products[j].id);
              temp_data.push(context.records[i].products[j].name);
              productMasterData.push(temp_data);
            }
            self.productData = productMasterData;
          }
        }
      }else if(context.fetchAllProducts === "failure"){
        self.view.toastMessage.showErrorToastMessage("unable to all products", self);
      }
    }
  },
  generateCustomerList : function(){
    // put i18n
    this.customerMasterData = [
      ["All","All"],
      ["CUSTOMER","Customer"],
      ["NON_CUSTOMER","Non-Customer"]
    ];
  },
  setPreLoadedData : function(){
    var self = this;
    this.view.listBoxProduct.masterData = this.productData;
    this.view.lisyBoxCustomerType.masterData = this.customerMasterData;
  },
  viewLeadsByFilter : function(email,phoneNumber,sortCriteria,sortOrder){
    var self = this;
    var productId = "",leadType= "",startDate = "",endDate = "";
    var rangeType = self.view.datePicker.value;
    if(rangeType){
      startDate = rangeType.substring(0, rangeType.indexOf(" - "));
      endDate = rangeType.substring(rangeType.indexOf(" - ")+3); 
    }

    if(self.view.listBoxProduct.selectedKeyValue === null || self.view.listBoxProduct.selectedKeyValue[0] === "Select Product")
      productId = "";
    else
      productId = self.view.listBoxProduct.selectedKeyValue[0] ? self.view.listBoxProduct.selectedKeyValue[0] : "";

    if(self.view.lisyBoxCustomerType.selectedKeyValue === null || self.view.lisyBoxCustomerType.selectedKeyValue[0] === "All")
      leadType = "";
    else
      leadType = self.view.lisyBoxCustomerType.selectedKeyValue[0] ? self.view.lisyBoxCustomerType.selectedKeyValue[0] : "";
    
    self.currentPage = 1;
    self.forwardScroll = true;

    self.fetchLeadsPayload.statusIds = this.currentStatusId;
    self.fetchLeadsPayload.productId = productId;
    self.fetchLeadsPayload.leadType = leadType;
    self.fetchLeadsPayload.emailAddress = email === "" ? self.fetchLeadsPayload.emailAddress : email;
    self.fetchLeadsPayload.phoneNumber = phoneNumber === "" ? self.fetchLeadsPayload.phoneNumber : phoneNumber;
    self.fetchLeadsPayload.sortCriteria = sortCriteria === "" ? self.fetchLeadsPayload.sortCriteria : sortCriteria;
    self.fetchLeadsPayload.modifiedStartDate = startDate === "" ? startDate : self.convertLeadDate(startDate);
    self.fetchLeadsPayload.modifiedEndDate = endDate === "" ? endDate : self.convertLeadDate(endDate);
    self.fetchLeadsPayload.pageNumber = self.currentPage;
    self.fetchLeadsPayload.sortOrder = sortOrder === "" ? self.fetchLeadsPayload.sortOrder : sortOrder;
    self.fetchLeadsPayload.search = true;

    this.presenter.fetchLeads(self.fetchLeadsPayload);
  },
  convertLeadDate : function(date){
    var dateArr = [],finalString;
    dateArr = date.split("/");
    finalString = dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1];
    return finalString;
  },
  clearFilterData : function(){
    this.view.listBoxProduct.masterData = [["Select Product" ,"Select Product"]];
    this.view.lisyBoxCustomerType.masterData = [["All","All"]];
    this.view.datePicker.resetData = "Select Date";
    this.view.datePicker.rangeType = "";
    this.view.datePicker.value = "";
    this.currentPage = 1;
    this.fetchLeadsPayload = {
      "statusIds" : this.currentStatusId,
      "productId" : "",
      "leadType" : "",
      "assignedTo" : "",
      "phoneNumber" : "",
      "emailAddress" : "",
      "pageNumber" : this.currentPage,
      "recordsPerPage" : this.leadsPerPage,
      "modifiedStartDate" : "",
      "modifiedEndDate" : "",
      "sortCriteria" : "lastmodifiedts",
      "sortOrder" : "desc"
    };
    this.resetSortIcons();
    this.leadsGettingSorted = false;
    this.firstTimeFlag = true;
    this.view.tbxLeadSearchBox.text = "";
  },

  searchBarStringValidation : function(searchText){
    var self = this;

    if(searchText === "") {
      self.fetchLeadsPayload.emailAddress = "";
      self.fetchLeadsPayload.phoneNumber = "";
      self.viewLeadsByFilter("" , "", "", "");
    }
    else {
      var numberRegex = /^[0-9]+$/;
      if((this.emailRegex).test(searchText)){
        self.fetchLeadsPayload.phoneNumber = "";
        self.viewLeadsByFilter(searchText , "","","");
      }else if(numberRegex.test(searchText)){
        self.fetchLeadsPayload.emailAddress = "";
        self.viewLeadsByFilter("" , searchText,"","");
      }
    }

    this.currentPage = 1;
    this.fetchLeadsPayload.pageNumber = this.currentPage;
  },
  onLeadContextualMenuHoverEventCallback: function (widget, context) {
    var scopeObj = this;

    if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.leadContextualMenu.setVisibility(false);
    }
  },

  onleadDetailsContextualMenuHoverEventCallback: function (widget, context) {
    var scopeObj = this;

    if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.leadDetailsContextualMenu.setVisibility(false);
    }
  },

  leadClicked : function() {
    this.populatingLeadDetails();
  },

  leadCheckboxClicked : function() {

  },

  viewLeadFilters : function() {
    var scopeObj = this;
    if(!(this.view.flxViewLeadsFilters.isVisible)) {
      scopeObj.view.flxViewLeadsFilters.setVisibility(true);
      scopeObj.view.flxFilterOverLay.setVisibility(true);
    }
    if(scopeObj.firstTimeFlag){
      scopeObj.setPreLoadedData();
      scopeObj.firstTimeFlag = false;
    }
    scopeObj.view.datePicker.opens = "";
    scopeObj.view.datePicker.drops = "";
  },

  hideLeadFilters : function() {
    var scopeObj = this;
    if(this.view.flxViewLeadsFilters.isVisible) {
      scopeObj.view.flxViewLeadsFilters.setVisibility(false);
      scopeObj.view.flxFilterOverLay.setVisibility(false);
    }
  },
  visibiltyFunction  : function(type){
    var scopeObj = this;
    this.resetViewLeads(); 
    var value;
    if(type === "main") {
      value = true;
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads");
      scopeObj.view.flxViewLeadsInner.height = (kony.os.deviceInfo().screenHeight - 126 - 20) + "px";
      scopeObj.view.flxViewLeadsData.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 20) + "px";
      scopeObj.view.flxViewLeadsList.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 56 - 20) + "px";
      scopeObj.view.viewLeads.flxTableView.height = (kony.os.deviceInfo().screenHeight - 126 - 80 - 56 - 60 - 20) + "px";
    }
    else if(type === "details") {
      value = false;
      
      if(scopeObj.activeLead.statusId === "SID_NEW") {
        scopeObj.setTabSkins(scopeObj.view.countTabs.flxCounter1);
      }
      else if(scopeObj.activeLead.statusId === "SID_INPROGRESS") {
        scopeObj.setTabSkins(scopeObj.view.countTabs.flxCounter2);
      }
      else if(scopeObj.activeLead.statusId === "SID_ARCHIVED") {
        scopeObj.setTabSkins(scopeObj.view.countTabs.flxCounter3);
      }

      scopeObj.view.mainHeader.lblHeading.text = "View Lead Details";
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads").toUpperCase();
    }
    this.view.flxLeadsAvailable.setVisibility(true);
    this.view.flxViewLeadsData.setVisibility(value);
    this.view.btnImportLeads.setVisibility(value);
    this.view.btnCreateLeads.setVisibility(value);
    this.view.flxLeadsDetails.setVisibility(!value);
    this.view.btnNotes.setVisibility(!value);
    this.view.flxNote.setVisibility(false);
    this.view.flxBreadcrumb.setVisibility(!value);
    this.view.flxViewLeads.setVisibility(true);
    this.view.leadDetailsContextualMenu.setVisibility(false);
  },
  breadCrumbBackToMain : function() {
    this.currentPage = 1;
    this.forwardScroll = true;
    this.presenter.fetchLeads();
    this.visibiltyFunction("main");
  },

  populatingLeadDetails : function(lead) {
    var scopeObj = this;
    if(lead) {

      scopeObj.activeLead = {
        "id" : lead.id,
        "name" : lead.firstName + (lead.middleName ? (" " + lead.middleName) : "") + " " + lead.lastName,
        "statusId" : lead.statusId,
        "isCustomer" : lead.isCustomer,
        "customerId" : lead.customerId,
        "product" : lead.productName,
        "phone" : lead.phoneNumber,
        "email" : lead.email,
        "assignedTo" : (lead.assignedToFirstName ? lead.assignedToFirstName : "-") + 
        (lead.assignedToMiddleName ? (" " + lead.assignedToMiddleName) : "") + " " + (lead.assignedToLastName ? lead.assignedToLastName : ""),
        "createdBy" : lead.createdByFirstName + (lead.createdByMiddleName ? (" " + lead.createdByMiddleName) : "") + " " + lead.createdByLastName,
        "createdOn" : scopeObj.formatDateMMslashDDslashYYYY(lead.createdts),
        "modifiedOn" : scopeObj.formatDateMMslashDDslashYYYY(lead.lastmodifiedts),
        "closureReason" : lead.closureReason
      };
    }
    else {
      var index = this.view.viewLeads.segLeads.selectedIndices[0][1];
      var data = this.view.viewLeads.segLeads.data[index];

      scopeObj.activeLead = {
        "id" : data.id,
        "name" : data.lblLeadName.tooltip,
        "statusId" : data.statusId,
        "isCustomer" : data.isCustomer,
        "customerId" : data.customerId,
        "product" : data.lblLeadProduct.tooltip,
        "phone" : data.lblLeadPhone.tooltip,
        "email" : data.lblLeadEmail.tooltip,
        "assignedTo" : data.lblLeadAssignedTo.tooltip,
        "createdBy" : data.createdBy,
        "createdOn" : data.createdOn,
        "modifiedOn" : data.lblLeadModifiedOn.text,
        "closureReason" : data.closureReason
      };
    }
	
    this.view.lblAssignStatus.text = scopeObj.activeLead.assignedTo;
    if(scopeObj.activeLead.statusId === "SID_NEW") {
      this.view.btnMoveToNew.setVisibility(false);
      this.view.btnMoveToInProgress.setVisibility(true);
    }
    else if(scopeObj.activeLead.statusId === "SID_INPROGRESS") {
      this.view.btnMoveToInProgress.setVisibility(false);
      this.view.btnMoveToNew.setVisibility(true);
    }
    else {
      this.view.btnMoveToNew.setVisibility(false);
      this.view.btnMoveToInProgress.setVisibility(false);
    }
    this.view.fonticonLeadType.text = scopeObj.activeLead.isCustomer ? kony.i18n.getLocalizedString("i18n.userwidgetmodel.fonticonCustomer") : kony.i18n.getLocalizedString("i18n.userwidgetmodel.fonticonNonCustomer");
    this.view.flxViewProfile.setVisibility(scopeObj.activeLead.isCustomer ? true : false);
    this.view.lblName.text = scopeObj.activeLead.name;
    this.view.breadcrumbs.lblCurrentScreen.text = scopeObj.activeLead.name.toUpperCase();
    this.view.detailsRow1.lblData1.text = scopeObj.activeLead.email;
    this.view.detailsRow1.lblData2.text = scopeObj.activeLead.phone;
    this.view.detailsRow1.lblData3.text = scopeObj.activeLead.product;
    this.view.detailsRow2.lblData1.text = scopeObj.activeLead.createdBy;
    this.view.detailsRow2.lblData2.text = scopeObj.activeLead.createdOn;
    this.view.detailsRow2.lblData3.text = scopeObj.activeLead.modifiedOn;
    this.view.leadDetailsContextualMenu.onHover = this.onleadDetailsContextualMenuHoverEventCallback;
    if(scopeObj.activeLead.closureReason !== "") {
      this.view.detailsRow3.lblData1.text = scopeObj.activeLead.closureReason;
      this.view.detailsRow3.setVisibility(true);
      this.view.flxViewLeadsInner.height = "439px";
    }
    else {
      this.view.detailsRow3.setVisibility(false);
      this.view.flxViewLeadsInner.height = "364px";
    }

    this.visibiltyFunction("details");
    this.view.forceLayout();
  },

  viewLeadNotes : function() {
    var scopeObj = this;

    var fetchNotesJSON = {
      "leadId" : scopeObj.activeLead.id,
      "leadStatusId" : scopeObj.activeLead.statusId,
      "isArchivedLead" : false
    };

    this.presenter.fetchNotes(fetchNotesJSON);
  },

  leadDetailsOptionsClicked : function() {
    var scopeObj = this;

    if(this.view.leadDetailsContextualMenu.isVisible) {
      scopeObj.view.leadDetailsContextualMenu.setVisibility(false);
    }
    else {
      scopeObj.view.leadDetailsContextualMenu.setVisibility(true);
    }
  },

  sortLeads : function(sortLeadsJSONAttribute,fontIconWidget) {
    var scopeObj = this;

    if(sortLeadsJSONAttribute.sortOrder ==="asc")
      sortLeadsJSONAttribute.sortOrder = "desc";
    else if (sortLeadsJSONAttribute.sortOrder === "desc")
      sortLeadsJSONAttribute.sortOrder = "asc";

    var sortIcon = fontIconWidget.text;
    scopeObj.resetSortIcons();
    if(sortIcon === "\ue92b" || sortIcon === "\ue920") {
      fontIconWidget.text = "\ue92a";
    }
    else if(sortIcon === "\ue92a") {
      fontIconWidget.text = "\ue920";
    }

    scopeObj.leadsGettingSorted = true;
  },

  resetSortIcons : function() {
    var scopeObj = this;

    scopeObj.view.viewLeads.fonticonLeadNameSort.text = "\ue92b";
    scopeObj.view.viewLeads.fonticonLeadPhoneSort.text = "\ue92b";
    scopeObj.view.viewLeads.fonticonLeadEmailSort.text = "\ue92b";
    scopeObj.view.viewLeads.fonticonLeadProductSort.text = "\ue92b";
    scopeObj.view.viewLeads.fonticonLeadAssignedToSort.text = "\ue92b";
    scopeObj.view.viewLeads.fonticonLeadModifiedOnSort.text = "\ue92b";
  },

  setNotes : function(notes) {
    var scopeObj = this;

    var data = [];
    var previousDate;
    for (var i = 0, j = 0; i < notes.length; i++) {

      var username = notes[i].createdByFirstName + (notes[i].createdByMiddleName ? (" " + notes[i].createdByMiddleName) : "") + " " + notes[i].createdByLastName;
      var text = notes[i].note;
      var dateString = scopeObj.getDateFromDBDateTime(notes[i].createdts);
      var timeString = scopeObj.getTimeFromDBDateTime(notes[i].createdts);

      var toAdd = [{
        "fonticonArrow": {
          "text": "",
          "onClick": function () {
            scopeObj.showSelectedNoteSegment();
          }
        },
        "lblDate": dateString
      },
                   [{
                     "imgUser": "option3.png",
                     "lblTime": timeString,
                     "lblUserName": username,
                     "rtxNotesDescription": text,
                     "flxCustomerMangNotes": {
                       isVisible: true
                     }
                   }]
                  ];
      var addToPrevious = {
        "imgUser": "option3.png",
        "lblTime": timeString,
        "lblUserName": username,
        "rtxNotesDescription": text,
        "flxCustomerMangNotes": {
          isVisible: true
        }
      };

      if (i === 0) {
        data.push(toAdd);
        j++;

      } else if (dateString === previousDate) {

        data[j - 1][1].push(addToPrevious);
      } else {

        data.push(toAdd);
        j++;
      }
      previousDate = dateString;
    }

    scopeObj.view.Notes.txtAreaNotes.text = "";
    scopeObj.view.Notes.segNotes.setData(data);
    scopeObj.view.flxNote.setVisibility(true);
    scopeObj.view.Notes.flxNotesSegment.scrollToEnd();
    scopeObj.view.forceLayout();
  },

  showSelectedNoteSegment : function() {
    var scopeObj = this;

    var index = scopeObj.view.Notes.segNotes.selectedsectionindex;
    var data = scopeObj.view.Notes.segNotes.data;
    if (data[[index][0]][0].fonticonArrow.text === "") {
      data[[index][0]][0].fonticonArrow.text = "";
      data[[index][0]][1] = data[[index][0]][1].map(function (element) {
        element.flxCustomerMangNotes.isVisible = false;
        return element;
      });
    } else {
      data[[index][0]][0].fonticonArrow.text = "";
      data[[index][0]][1] = data[[index][0]][1].map(function (element) {
        element.flxCustomerMangNotes.isVisible = true;
        return element;
      });
    }

    scopeObj.view.Notes.segNotes.setData(data);
    scopeObj.view.forceLayout();
  },

  addNotes : function() {
    var scopeObj = this;

    var note = {
      "leadId" : scopeObj.activeLead.id,
      "leadStatusId" : scopeObj.activeLead.statusId,
      "note" : scopeObj.view.Notes.txtAreaNotes.text
    };

    scopeObj.presenter.addNotes(note);
  },

  updateLeadStatus : function(statusId, fetchLeads) {
    var scopeObj = this;

    var updateLeadJSON = {
      "leadId" : scopeObj.activeLead.id,
      "statusId" : statusId
    };

    scopeObj.presenter.updateLead(updateLeadJSON, true, fetchLeads);
  },

  showCustomerProfile : function(custId) {
    var scopeObj = this;
    var viewCustomerDetailsJSON = {
      "Customer_id": custId? custId : scopeObj.activeLead.customerId
    };
    var leadId = custId? "": scopeObj.activeLead.id;
    var breadcrumb = this.view.breadcrumbs.btnBackToMain.isVisible? 
       				 kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads") : 
    				 kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS");
    if(custId)
       scopeObj.resetChangesOnLeavingLeads();
    scopeObj.presenter.showCustomerProfile(viewCustomerDetailsJSON, 
                                           breadcrumb, scopeObj.activeLead.statusId, leadId);
  },

  resetViewLeads : function(){
    this.view.flxLeadsUnavailable.setVisibility(false);
    this.view.flxLeadsAvailable.setVisibility(false);
    this.view.flxCreateUpdateLeads.setVisibility(false);
  },
  clearCreateScreen : function(){
    this.view.createUpdate.txtLeadFirstName.text = "";
    this.view.createUpdate.txtLeadMiddleName.text = "";
    this.view.createUpdate.txtLeadLastName.text = "";
    this.view.createUpdate.txtLeadMail.text = "";
    this.view.createUpdate.leadPhoneNumber.txtISDCode.text = "";
    this.view.createUpdate.leadPhoneNumber.txtContactNumber.text = "";
    this.view.createUpdate.txtLeadExtention.text = "";
    this.view.createUpdate.txtAreaLeadNotes.text = "";
    this.setCreateUpdatePreloadData();
  },
  showHideCreateEditUIHandler : function(criteria){
    var self = this;
    var value;
    self.resetViewLeads(); 
    if(criteria === "show"){
      value = true; 
      self.view.flxCreateUpdateLeads.setVisibility(true);
      self.clearAlValidations();
    }
    else if(criteria === "hide"){
      value = false;
      this.view.flxLeadsAvailable.setVisibility(true);
      self.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads");
    }

    self.view.btnImportLeads.setVisibility(!value);
    self.view.btnCreateLeads.setVisibility(!value);
    self.view.flxBreadcrumb.setVisibility(value);
  },
  showCreateEditFunctionalHandler : function(criteria,context){
    var self = this;
    self.clearCreateScreen();
    if(criteria === "create"){
      self.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.CreateLead");
      self.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads").toUpperCase();
      self.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.Add").toUpperCase();
      self.view.createUpdate.leadsCommonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmLogsController.Create").toUpperCase();
      self.view.createUpdate.flxLeadProduct.setVisibility(false);
    }else if(criteria === "update"){
      self.view.mainHeader.lblHeading.text = "Edit Leads";
      self.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads").toUpperCase();
      self.view.breadcrumbs.lblCurrentScreen.text = "EDIT";
      self.view.createUpdate.leadsCommonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Update").toUpperCase();
      self.view.createUpdate.flxLeadProduct.setVisibility(false);
      self.populateUpdateScreen();
    }
  },

  generateSupportedProductList : function(context){
    var self = this;
    var currentTypeId;
    if(self.supportedProductType.length === 0)
    {    
      if(context.fetchSupportedProducts === "success"){
        // lead type generation
        var supportedProductTypeMaster = [];
        supportedProductTypeMaster.push(["Select Product","Select Product"]);
        for(var i = 0 ; i < context.records.length ; i++){
          var temp_type = [];
          temp_type.push(context.records[i].id);
          temp_type.push(context.records[i].name);
          currentTypeId = context.records[i].id;
          supportedProductTypeMaster.push(temp_type);

          //lead sub data generation
          if( context.records[i].products.length){
            var supportedProductDataMaster = [];
            supportedProductDataMaster.push(["Select Product","Select Product"]);
            for(var j = 0 ; j <  context.records[i].products.length ; j++){
              var temp_data = [];
              if(context.records[i].products[j].isLeadSupported === "true"){
                temp_data.push(context.records[i].products[j].id);
                temp_data.push(context.records[i].products[j].name);
                supportedProductDataMaster.push(temp_data);
              }
            }
            self.supportedProductData.push({
              "id" : currentTypeId,
              "context" : supportedProductDataMaster
            });
          }
        }
        self.supportedProductType = supportedProductTypeMaster;
      }else if(context.fetchSupportedProducts === "failure"){
        self.view.toastMessage.showErrorToastMessage("unable to fetch supported lead products", self);
      }
    }
  },
  setCreateUpdatePreloadData  : function(){
    this.view.createUpdate.listBoxLeadProductType.masterData = this.supportedProductType;
  },
  setcreateUpdateProductData : function(){
    var self = this;
    var selectedID;
    selectedID = this.view.createUpdate.listBoxLeadProductType.selectedKeyValue[0];
    for(var i=0;i<self.supportedProductData.length;i++){
      if(selectedID === self.supportedProductData[i].id){
        self.view.createUpdate.flxLeadProduct.setVisibility(true);
        self.view.createUpdate.listBoxLeadProduct.masterData = self.supportedProductData[i].context;
      }
    }
  },
  createUpdateValidations : function(){
    var fieldsCorrect = true;
    var self = this;

    //first name 
    if (this.view.createUpdate.txtLeadFirstName.text.trim() === "") {
      this.view.createUpdate.lblErrorLeadFirstName.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.FirstNameMissing");
      this.view.createUpdate.flxErrorLeadFirstName.setVisibility(true);
      this.view.createUpdate.txtLeadFirstName.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (/^([a-zA-Z0-9 ]+)$/.test(this.view.createUpdate.txtLeadFirstName.text.trim()) === false) {
      this.view.createUpdate.lblErrorLeadFirstName.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Correct_Name");
      this.view.createUpdate.flxErrorLeadFirstName.setVisibility(true);
      this.view.createUpdate.txtLeadFirstName.skin = "skinredbg";
      fieldsCorrect = false;
    } 

    //last name
    if (this.view.createUpdate.txtLeadLastName.text.trim() === "") {
      this.view.createUpdate.lblErrorLeadLastName.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.LastNameMissing");
      this.view.createUpdate.flxErrorLeadLastName.setVisibility(true);
      this.view.createUpdate.txtLeadLastName.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (/^([a-zA-Z0-9 ]+)$/.test(this.view.createUpdate.txtLeadLastName.text.trim()) === false) {
      this.view.createUpdate.lblErrorLeadLastName.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_Correct_Name");
      this.view.createUpdate.flxErrorLeadLastName.setVisibility(true);
      this.view.createUpdate.txtLeadLastName.skin = "skinredbg";
      fieldsCorrect = false;
    } 

    //email
    var emailRegex = this.emailRegex;
    if (this.view.createUpdate.txtLeadMail.text.trim() === "") {
      this.view.createUpdate.lblErrorLeadEmail.text = kony.i18n.getLocalizedString("i18n.frmLocationsController.Enter_a_Email-id");
      this.view.createUpdate.flxErrorLeadEmail.setVisibility(true);
      this.view.createUpdate.txtLeadMail.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (emailRegex.test(this.view.createUpdate.txtLeadMail.text.trim()) === false) {
      this.view.createUpdate.lblErrorLeadEmail.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Enter_a_valid_Email-id");
      this.view.createUpdate.flxErrorLeadEmail.setVisibility(true);
      this.view.createUpdate.txtLeadMail.skin = "skinredbg";
      fieldsCorrect = false;
    }

    //isd
    var ISDRegex = this.ISDRegex;
    if( (!this.view.createUpdate.leadPhoneNumber.txtISDCode.text) || 
       (!this.view.createUpdate.leadPhoneNumber.txtISDCode.text.trim()) || 
       (this.view.createUpdate.leadPhoneNumber.txtISDCode.text.trim().length > 4) || 
       (ISDRegex.test(this.view.createUpdate.leadPhoneNumber.txtISDCode.text) === false) ) {
      this.view.createUpdate.flxErrorLeadPhoneNumber.setVisibility(true);
      this.view.createUpdate.lblErrorLeadPhoneNumber.text = "Enter a valid ISD code";
      this.view.createUpdate.leadPhoneNumber.txtISDCode.skin = "skinredbg";
      fieldsCorrect = false;
    }

    //phone number
    var phoneRegex=this.phoneRegex;
    if (!this.view.createUpdate.leadPhoneNumber.txtContactNumber.text || !this.view.createUpdate.leadPhoneNumber.txtContactNumber.text.trim()) {
      this.view.createUpdate.flxErrorLeadPhoneNumber.setVisibility(true);
      this.view.createUpdate.lblErrorLeadPhoneNumber.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblNoPhnNumberError");
      this.view.createUpdate.leadPhoneNumber.txtContactNumber.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (this.view.createUpdate.leadPhoneNumber.txtContactNumber.text.trim().length > 15) {
      this.view.createUpdate.flxErrorLeadPhoneNumber.setVisibility(true);
      this.view.createUpdate.lblErrorLeadPhoneNumber.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblNoPhnNumberExceedsLength");
      this.view.createUpdate.leadPhoneNumber.txtContactNumber.skin = "skinredbg";
      fieldsCorrect = false;
    } else if (phoneRegex.test(this.view.createUpdate.leadPhoneNumber.txtContactNumber.text) === false) {
      this.view.createUpdate.flxErrorLeadPhoneNumber.setVisibility(true);
      this.view.createUpdate.lblErrorLeadPhoneNumber.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
      this.view.createUpdate.leadPhoneNumber.txtContactNumber.skin = "skinredbg";
      fieldsCorrect = false;
    }

    //product type
    if(this.view.createUpdate.listBoxLeadProductType.selectedKey === "Select Product"){
      this.view.createUpdate.lblErroLeadProductType.text = "select a product type";
      this.view.createUpdate.flxErrorLeadProductType.setVisibility(true);
      this.view.createUpdate.listBoxLeadProductType.skin = "redListBxSkin";
      fieldsCorrect = false;
    }

    //product 
    if(this.view.createUpdate.listBoxLeadProduct.selectedKey === "Select Product"){
      this.view.createUpdate.lblErrorLeadProduct.text = "select a product type";
      this.view.createUpdate.flxErrorLeadProduct.setVisibility(true);
      this.view.createUpdate.listBoxLeadProduct.skin = "redListBxSkin";
      fieldsCorrect = false;
    }

    return fieldsCorrect;

  },
  hideValidationErrors: function(tbxWidget, flxError, skinValue){
    tbxWidget.skin = skinValue || "skntxtbxDetails0bbf1235271384a";
    flxError.isVisible = false;
  },
  clearAlValidations : function(){
    this.hideValidationErrors(this.view.createUpdate.txtLeadFirstName, this.view.createUpdate.flxErrorLeadFirstName, "sknTbxFFFFFFBorDEDEDE13pxKA");
    this.hideValidationErrors(this.view.createUpdate.txtLeadLastName, this.view.createUpdate.flxErrorLeadLastName, "sknTbxFFFFFFBorDEDEDE13pxKA");
    this.hideValidationErrors(this.view.createUpdate.txtLeadMail, this.view.createUpdate.flxErrorLeadEmail, "sknTbxFFFFFFBorDEDEDE13pxKA");
    this.hideValidationErrors(this.view.createUpdate.leadPhoneNumber.txtISDCode, this.view.createUpdate.flxErrorLeadPhoneNumber, "sknTbxFFFFFFBorDEDEDE13pxKA");
    this.hideValidationErrors(this.view.createUpdate.leadPhoneNumber.txtContactNumber, this.view.createUpdate.flxErrorLeadPhoneNumber, "sknTbxFFFFFFBorDEDEDE13pxKA");
    this.hideValidationErrors(this.view.createUpdate.listBoxLeadProductType, this.view.createUpdate.flxErrorLeadProductType, "sknlstbxNormal0f9abd8e88aa64a");
    this.hideValidationErrors(this.view.createUpdate.listBoxLeadProduct, this.view.createUpdate.flxErrorLeadProduct, "sknlstbxNormal0f9abd8e88aa64a");
  },
  createLead : function(){
    var payload = this.createUpdatePayLoadGeneration();
    if(this.fromCustomerForm=="customer"){
      var viewCustomerDetailsJSON = {
        "Customer_id": this.customerId
      };
      var breadcrumb = this.view.breadcrumbs.btnBackToMain.isVisible? 
       				 kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads") : 
    				 kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS");
      this.resetChangesOnLeavingLeads();
      this.presenter.createLeadNavigateToCustomer(payload,viewCustomerDetailsJSON,breadcrumb);
    }
    else
      this.presenter.createLead(payload);
  },
  leadcreated : function(context){
    var self = this;
    if(context.createLead === "success"){
      self.view.toastMessage.showToastMessage("Lead created successfully",self);
      self.showHideCreateEditUIHandler("hide");
    }else if(context.createLead === "failure"){
      self.view.toastMessage.showErrorToastMessage("unable to create lead ", self);
    }
  },
  updateLead : function(){
    var payload = this.createUpdatePayLoadGeneration();
    if(this.fromCustomerForm=="customer"){
      payload.leadId = this.view.createUpdate.txtLeadFirstName.info.leadId;
      var viewCustomerDetailsJSON = {
        "Customer_id": this.customerId
      };
      var breadcrumb = this.view.breadcrumbs.btnBackToMain.isVisible? 
          kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads") : 
          kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS");
      this.resetChangesOnLeavingLeads();
      this.presenter.updateLeadNavigateToCustomer(payload,viewCustomerDetailsJSON,breadcrumb);
    } else{
      payload.leadId = this.view.viewLeads.segLeads.selectedRowItems[0].id;
      this.presenter.updateLead(payload, false, true);
    }
  },
  leadEdited : function(context){
    var self = this;
    if(context.updateLead === "success"){
      self.view.toastMessage.showToastMessage("Lead edited successfully",self);
      self.showHideCreateEditUIHandler("hide");
    }else if(context.updateLead === "failure"){
      self.view.toastMessage.showErrorToastMessage("unable to edit lead ", self);
    }
  },
  populateUpdateScreen : function(){    
    var data = this.view.viewLeads.segLeads.selectedRowItems[0];
    var self = this;
    this.setCreateUpdatePreloadData();
    var productTypeMasterData = this.view.createUpdate.listBoxLeadProductType.masterdata;
    for(var i=0;i<productTypeMasterData.length;i++){
      if(productTypeMasterData[i][0] === data.productType){
        self.view.createUpdate.listBoxLeadProductType.selectedKey = productTypeMasterData[i][0];
      }
    }

    this.setcreateUpdateProductData();
    var productMasterData = this.view.createUpdate.listBoxLeadProduct.masterData;
    for(var j=0;j<productMasterData.length;j++){
      if(productMasterData[j][0] === data.productId){
        self.view.createUpdate.listBoxLeadProduct.selectedKey = productMasterData[j][0];
      }
    }

    this.view.createUpdate.txtLeadFirstName.text = data.firstName;
    this.view.createUpdate.txtLeadMiddleName.text = data.middleName;
    this.view.createUpdate.txtLeadLastName.text = data.lastName;
    this.view.createUpdate.txtLeadMail.text = data.lblLeadEmail.tooltip;
    this.view.createUpdate.leadPhoneNumber.txtISDCode.text = "+"+data.countryCode;
    this.view.createUpdate.leadPhoneNumber.txtContactNumber.text = data.phoneNumber;
    this.view.createUpdate.txtLeadExtention.text = data.extension;
    this.view.createUpdate.txtAreaLeadNotes.text = "";
    this.view.forceLayout();
  },
  createUpdatePayLoadGeneration : function(){
    var isd_code = this.view.createUpdate.leadPhoneNumber.txtISDCode.text.substr(1,this.view.createUpdate.leadPhoneNumber.txtISDCode.text.length);
    var payload = {
      "saluation":"",
      "firstName":this.view.createUpdate.txtLeadFirstName.text,
      "middleName":this.view.createUpdate.txtLeadMiddleName.text,
      "lastName":this.view.createUpdate.txtLeadLastName.text,
      "email":this.view.createUpdate.txtLeadMail.text,
      "countryCode": isd_code,
      "phoneNumber":this.view.createUpdate.leadPhoneNumber.txtContactNumber.text,
      "extension":this.view.createUpdate.txtLeadExtention.text,
      "productId":this.view.createUpdate.listBoxLeadProduct.selectedKeyValue[0],
      "note": this.view.createUpdate.txtAreaLeadNotes.text
    };
    return payload;
  },
  showCreateLeadScreen : function(){
    var self = this;
    self.showHideCreateEditUIHandler("show");
    self.showCreateEditFunctionalHandler("create","");
  },
  showUpdateLeadScreen : function(){
    var self = this;
    self.showHideCreateEditUIHandler("show");
    self.showCreateEditFunctionalHandler("update","");
  },
  showLeadCreateScreenFromCustomer : function(data,navObj){
    var self = this;
    this.showCreateLeadScreen();
    this.setCreateUpdatePreloadData();
    if(navObj.breadcrumbBack === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS")){
      this.changeBreadcrumbsFromCustomer([data.custFullname.toUpperCase(),
                                          kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.Add").toUpperCase()]);
    }else if(navObj.breadcrumbBack === kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads")){
       this.changeBreadcrumbsFromCustomer([kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads").toUpperCase(),
                                          data.custFullname.toUpperCase(),
                                          kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.Add").toUpperCase()]);
    }
    this.view.breadcrumbs.btnPreviousPage1.onClick = function(){
      var breadcrumb = self.view.breadcrumbs.btnBackToMain.isVisible? 
          			kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads") : 
      				kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS");
      self.resetChangesOnLeavingLeads();
      self.presenter.showCustomerProfile({"Customer_id":data.custId}, breadcrumb);
    };
    this.view.createUpdate.txtLeadFirstName.text = data.firstName;
    this.view.createUpdate.txtLeadMiddleName.text = data.middleName;
    this.view.createUpdate.txtLeadLastName.text = data.lastName;
    this.view.createUpdate.txtLeadMail.text = data.email;
    this.view.createUpdate.leadPhoneNumber.txtISDCode.text = data.countryCode ? "+"+data.countryCode : "";
    this.view.createUpdate.leadPhoneNumber.txtContactNumber.text = data.phoneNumber;
    this.view.createUpdate.txtLeadExtention.text = data.extension;

    this.view.createUpdate.listBoxLeadProductType.selectedKey = "Select Product";
    this.view.createUpdate.flxLeadProductType.setVisibility(true);
    this.view.createUpdate.flxLeadProduct.setVisibility(false);
    this.view.createUpdate.txtAreaLeadNotes.text = "";
    this.view.flxViewLeads.setVisibility(true);
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },
  changeBreadcrumbsFromCustomer : function(arrayList){
    //navigation : customer-- create lead
    if(arrayList.length === 2){
      this.view.breadcrumbs.btnBackToMain.setVisibility(false);
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(false);
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      
      this.view.breadcrumbs.btnPreviousPage1.left = "35dp";
      this.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(true);
      this.view.breadcrumbs.btnPreviousPage1.text = arrayList[0];
      this.view.breadcrumbs.lblCurrentScreen.text = arrayList[1];
    } else if(arrayList.length > 2){ //navigation: leads details-- customer profile-- create lead
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      this.view.breadcrumbs.btnPreviousPage1.left = "0dp";
      
      this.view.breadcrumbs.btnBackToMain.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true); 
      this.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
      this.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(true);
      
      this.view.breadcrumbs.btnPreviousPage.text = arrayList[0];
      this.view.breadcrumbs.btnPreviousPage1.text = arrayList[1];
      this.view.breadcrumbs.lblCurrentScreen.text = arrayList[2];
    }
  },
    //reset breadcrumb for leads
  resetChangesOnLeavingLeads : function(){
    var self = this;
    self.view.flxViewLeads.setVisibility(false);
    self.view.breadcrumbs.btnBackToMain.setVisibility(true);
    self.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true); 
    self.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    self.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    self.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    self.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
    self.view.breadcrumbs.btnPreviousPage1.left = "0dp";
    self.view.forceLayout();
  },
  showEditScreenFromCustomer : function(data,navObj){
    var self = this;
    self.showHideCreateEditUIHandler("show");
    self.view.breadcrumbs.lblCurrentScreen.text = "EDIT";
    self.view.mainHeader.lblHeading.text = "Edit Leads";
    self.view.createUpdate.leadsCommonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Update").toUpperCase();
    if (navObj.breadcrumbBack === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS")) {
      this.changeBreadcrumbsFromCustomer([data.custFullname.toUpperCase(),"EDIT"]);
    } else if (navObj.breadcrumbBack === kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads")) {
      this.changeBreadcrumbsFromCustomer([kony.i18n.getLocalizedString("i18n.LeadManagement.titleViewLeads").toUpperCase(),
                                          data.custFullname.toUpperCase(),"EDIT"]);
    }
    this.view.breadcrumbs.btnPreviousPage1.onClick = function () {
      self.resetChangesOnLeavingLeads();
      self.presenter.showCustomerProfile({"Customer_id": data.id },
                                         kony.i18n.getLocalizedString("i18n.LeadManagement.breadcrumbViewLeads"),"",data.leadId);
    };
    this.view.createUpdate.txtLeadFirstName.text = data.firstName;
    this.view.createUpdate.txtLeadFirstName.info = {"leadId" : data.leadId};
    this.view.createUpdate.txtLeadMiddleName.text = data.middleName;
    this.view.createUpdate.txtLeadLastName.text = data.lastName;
    this.view.createUpdate.txtLeadMail.text = data.email;
    this.view.createUpdate.leadPhoneNumber.txtISDCode.text = data.countryCode ? "+" + data.countryCode : "";
    this.view.createUpdate.leadPhoneNumber.txtContactNumber.text = data.phoneNumber;
    this.view.createUpdate.txtLeadExtention.text = data.extension;
    this.setCreateUpdatePreloadData();
    this.view.createUpdate.listBoxLeadProductType.selectedKey = data.productTypId;
    this.view.createUpdate.listBoxLeadProduct.selectedKey = data.productId;
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.createUpdate.flxLeadProductType.setVisibility(true);
    this.view.createUpdate.flxLeadProduct.setVisibility(true);
    this.view.createUpdate.txtAreaLeadNotes.text = data.note;
    this.view.flxViewLeads.setVisibility(true);
    this.view.forceLayout();
  },
});
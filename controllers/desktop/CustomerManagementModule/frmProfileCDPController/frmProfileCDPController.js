define({ 
  applicationId : "",
  applicationType:"Retail",
  willUpdateUI: function(viewModel){
    if(viewModel){
      this.updateLeftMenu(viewModel);
      if (viewModel.LoadingScreen){
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
      if(viewModel.showCDPTab){
        this.showCDPTab();
      }
      if (viewModel.status === "downloadDocumentSuccess") {
        this.showDocumentDownloadGeneratedStatus();
      }	
      if(viewModel.status === "downloadDocumentFailed") {
        this.showDocumentDownloadFailedStatus();
      }
      if (viewModel.customerApplications) {
        this.fetchApplication(viewModel.customerApplications);
      }
    }
  },

  fetchApplication: function(customerApplications){
    var self = this;
    customerApplications.forEach(customerApplication => {
       self.applicationId = customerApplication.ApplicationId;
       self.applicationType = customerApplication.ApplicationType;
    });
  },

  profileCDPPreshow: function(){
    var scopeObj = this;
    scopeObj.subTabsButtonUtilFunction([scopeObj.view.dashboardCommonTab.btnProfile,
                                        scopeObj.view.dashboardCommonTab.btnDeposits, scopeObj.view.dashboardCommonTab.btnCDP],
                                       scopeObj.view.dashboardCommonTab.btnCDP);
    var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
    scopeObj.customerName = currentCustomerDetails.Name ;
    scopeObj.view.generalInfoHeader.setDefaultHeaderData(this);
    scopeObj.view.generalInfoHeader.setCustomerNameandTag(currentCustomerDetails);
    scopeObj.view.Notes.setDefaultNotesData(this);
    scopeObj.setCustomerStatus(currentCustomerDetails.OLBCustomerFlags.Status);
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
    scopeObj.view.generalInfoHeader.flxLinkProfileButton.setVisibility(false);
    scopeObj.view.generalInfoHeader.flxDelinkProfileButton.setVisibility(false);
    scopeObj.setFlowActions(currentCustomerDetails);
  },

  
  showDocumentDownloadInProgressStatus : function() {
    this.view.lblGenerate.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportGenerate");;
    this.view.flxGenerateReportBtn.setVisibility(true);
    this.view.flxGenerateReportBtn.setEnabled(false);
    this.view.flxGenerateReportBtn.hoverSkin = 'sknFlxBg7b7b7b';
    this.view.flxGenerateReportBtn.skin = 'sknFlxBg7b7b7b';
    this.view.lblReportGenerationMsg.setVisibility(true);
    this.view.lblReportGenerationMsg.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportInProgressStatus");
    this.view.lblReportGenerationMsg.skin = 'sknlbl485c7514px';
    this.view.imgReportStatusIcon.setVisibility(true);
    this.view.imgReportStatusIcon.src = 'ellipse_3.png';
    this.view.flxReportProcessing.setVisibility(true);
    this.view.imgReportStatus.src = 'searchcontracticon.png';
    this.view.lblReportProcessing.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportInProgressMsg");
    this.view.forceLayout();
  },

  showDocumentDownloadGeneratedStatus : function() {
    this.view.lblGenerate.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportRegenerate");;
    this.view.flxGenerateReportBtn.setVisibility(true);
    this.view.flxGenerateReportBtn.setEnabled(true);
    this.view.flxGenerateReportBtn.skin = 'sknFlxBg003E75Br1pxRd20px';
    this.view.flxGenerateReportBtn.hoverSkin = 'sknBtn005198LatoRegular13pxFFFFFFRad20px';
    this.view.lblReportGenerationMsg.setVisibility(true);
    this.view.lblReportGenerationMsg.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportGeneratedStatus");
    this.view.lblReportGenerationMsg.skin = 'sknlbl485c7514px';
    this.view.imgReportStatusIcon.src = 'approve.png';
    this.view.imgReportStatusIcon.setVisibility(true);
    this.view.flxReportProcessing.setVisibility(true);
    this.view.imgReportStatus.src = 'search.png';
    this.view.imgReportStatus.setVisibility(true);
    this.view.lblReportProcessing.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportGeneratedMsg");
    this.view.forceLayout();
  },

  showDocumentDownloadFailedStatus: function() {
    this.view.flxGenerateReportBtn.setVisibility(true);
    this.view.flxGenerateReportBtn.setEnabled(true);
    this.view.flxGenerateReportBtn.skin = 'sknFlxBg003E75Br1pxRd20px';
    this.view.flxGenerateReportBtn.hoverSkin = 'sknBtn005198LatoRegular13pxFFFFFFRad20px';
    this.view.lblGenerate.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportGenerate");;
    this.view.lblReportGenerationMsg.setVisibility(true);
    this.view.lblReportGenerationMsg.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportErrorStatus");
    this.view.lblReportGenerationMsg.skin = 'sknIconBgE61919S12px';
    this.view.imgReportStatusIcon.src = 'error_1x.png';
    this.view.imgReportStatusIcon.setVisibility(true);
    this.view.flxReportProcessing.setVisibility(true);
    this.view.imgReportStatus.src = 'noresultfound.png';
    this.view.imgReportStatus.setVisibility(true);
    this.view.lblReportProcessing.text = kony.i18n.getLocalizedString("i18n.CustomerManagement.CDPReportErrorMsg");
    this.view.forceLayout();
  },

  setFlowActions : function(currentCustomerDetails){
    var scopeObj = this;

    this.view.flxGenerateReportBtn.onClick = function(){
      var payload = {
        applicationId:scopeObj.applicationId,
        applicationType:scopeObj.applicationType==="Retail"?"Retail":"SME",
        prospectId:currentCustomerDetails.Customer_id
      }
      kony.store.setItem("CDPReportRequested", true);
      scopeObj.showDocumentDownloadInProgressStatus();
      scopeObj.presenter.generateReport(payload);
    }
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
    setBreadcrumbsData: function(textArray){
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
   * show CDP screen
   */
 showCDPTab: function(){
    var Customer_id = kony.store.getItem("Customer_id");
    this.view.flxReportProcessing.setVisibility(false);
    this.view.lblReportGenerationMsg.setVisibility(false);
    this.view.imgReportStatusIcon.setVisibility(false);
    this.view.lblGenerate.text = 'Generate';
    this.view.flxGenerateReportBtn.skin = 'sknFlxBg003E75Br1pxRd20px';
    if(this.presenter.getCDPReportRequestedStatus(Customer_id)) {
     if(this.presenter.getCDPReportDownloadedStatus(Customer_id) === true) {
      this.showDocumentDownloadGeneratedStatus();
     }else if (this.presenter.getCDPReportDownloadedStatus(Customer_id) === false){
      this.showDocumentDownloadFailedStatus();
     }else{
      this.showDocumentDownloadInProgressStatus();
     }
    }
    var payload = {
      "Customer_id" : Customer_id,
      "isCDPFlow":"true"
    };
    this.presenter.getCustomerApplicationsForCDP(payload);
    this.view.forceLayout();
  },
  
});
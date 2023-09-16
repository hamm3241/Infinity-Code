define({

  agreedTermsAndConditionsCC : false,
  loanTypeSkins : { 
    "PERSONAL_LOAN" : {"Description" : kony.i18n.getLocalizedString("i18n.frmLoansDashboard.PersonalLoan"),
                       "skin" : "sknflxbackgroundBlue", "icon" : "\ue93f"},
    "CREDIT_CARD" : {"Description" : kony.i18n.getLocalizedString("i18n.frmLoansDashboard.CreditLoan"), 
                     "skin" : "sknflxbackgroundGreen", "icon" : "\ue938"},
    "VEHICLE_LOAN" : {"Description" : kony.i18n.getLocalizedString("i18n.frmLoansDashboard.VehicleLoan"), 
                      "skin" : "sknflxbackgroundYellow", "icon" : "\ue98c"},                   
  },
  loanTypeCount : 0 ,
  currentApplicationsRowNumber : null,
  
  willUpdateUI: function (context) {
    var scopeObj = this;

    scopeObj.displayLoggedInStaffUser();
    if(context){
      this.updateLeftMenu(context);
      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
        else
          kony.adminConsole.utils.hideProgressBar(scopeObj.view);
      }
      if (context.UpdateDBPUserStatus) {
        scopeObj.view.generalInfoHeader.lblStatus.info = { "value": context.UpdateDBPUserStatus.status.toUpperCase() };
        scopeObj.setCustomerStatus(context.UpdateDBPUserStatus.status.toUpperCase());
      }
      if (context.action && context.action === "ErrorOccured") {
        kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        scopeObj.view.toastMessage.showErrorToastMessage("Something went wrong. Please try again.", scopeObj);
      }
      if (context.toastModel) {
        if (context.toastModel.status === "SUCCESS") {
          scopeObj.view.toastMessage.showToastMessage(context.toastModel.message, scopeObj);
        } else {
          scopeObj.view.toastMessage.showErrorToastMessage(context.toastModel.message, scopeObj);
        }
        kony.adminConsole.utils.hideProgressBar(scopeObj.view);
      }
      if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);
      } 
      if (context.ApplicantNotes) {
        this.view.Notes.displayNotes(this, context.ApplicantNotes);
      }
      if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);
      } 
      if (context.LoansMasterData) {
        this.hideAllMainContainers();
        this.view.flxLoansMainContainer.setVisibility(true);

        var customerType = kony.store.getItem("CustomerType_id");
        if (customerType === "Applicant") {
          scopeObj.emailCount = 0;
          scopeObj.email = null;
          this.view.flxMainLoans.setVisibility(false);
          var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
          var contextValue = {
            "Customer_id": kony.store.getItem("Customer_id"),
            "legalEntityId":legalEntityId || ""
          };

          function onSucess(response) {
            scopeObj.email = response.customerbasicinfo_view.Email;
            scopeObj.emailCount = response.customerbasicinfo_view.RegLinkResendCount;
            if (scopeObj.emailCount === 0) {
              scopeObj.view.lblRegistrationLinkKA.text = "Send Registration Email"
            } else {
              scopeObj.view.lblRegistrationLinkKA.text = "Resend Registration Email";
            }
            scopeObj.view.forceLayout();
          }

          function onError(response) {
            kony.print("--error" + response);
          }
          this.presenter.getCustomerBasicInfo(contextValue, onSucess, onError);
          this.view.flxRegistrationWrapperKA.setVisibility(true);
          this.view.dashboardCommonTab.flxProductsTabsWrapper.btnBanking.setVisibility(false);
        } else {
          this.view.flxRegistrationWrapperKA.setVisibility(false);
        }
        if (context.LoansMasterData !== null && context.LoansMasterData.length > 0) {
          this.setDataToLoanTypes(context.LoansMasterData);
        }

      }
      if (context.action === "getAllApplicationData") {
        scopeObj.resetApplicationsSortIcons();
        if (context.response.PendingList !== null && context.response.PendingList.records.length > 0) {
          if (context.response.PendingList.records.length < 10) {
            this.view.lblpendingApplciationNumber.text = "0" + context.response.PendingList.records.length;
          } else {
            this.view.lblpendingApplciationNumber.text = context.response.PendingList.records.length;
          }
        } else {
          this.view.lblpendingApplciationNumber.text = "00";
        }
        if (context.response.SubmittedList !== null && context.response.SubmittedList.records.length > 0) {
          if (context.response.SubmittedList.records.length < 10) {
            this.view.lblSubmittedApplicationsNumber.text = "0" + context.response.SubmittedList.records.length;
          } else {
            this.view.lblSubmittedApplicationsNumber.text = context.response.SubmittedList.records.length;
          }
        } else {
          this.view.lblSubmittedApplicationsNumber.text = "00";
        }
        this.view.segmentListOfApplications.setData([]);
        this.view.segmentListOfApplicationsSubmitted.setData([]); 
        this.setDataToSegment(context.response.PendingList, context.response.SubmittedList);
        this.setLoanTypeSkins();
        this.view.forceLayout();
      }
      if (context.action == "getPendingApplicationsListPENDING") {

        if (context.response.records && context.response.records.length > 0) {
          if (context.response.records.length < 10) {
            this.view.lblpendingApplciationNumber.text = "0" + context.response.records.length;
          } else {
            this.view.lblpendingApplciationNumber.text = context.response.records.length;
          }
          this.view.flxListOfApplications.isVisible = true;
          this.view.segmentListOfApplications.isVisible = true;
          this.view.segmentListOfApplicationsSubmitted.isVisible = false;
          this.view.flxNoPendingLoansAvailable.isVisible = false;
          this.view.lblNoPendingLoans.isVisible = false;
          this.setDataIntoPendingApplicationsList(context.response.records);
          this.view.scrollToWidget(this.view.flxListOfApplicationsHeader) ;
        } else {
          this.view.flxListOfApplications.isVisible = false;
          this.view.flxNoPendingLoansAvailable.isVisible = true;
          this.view.lblNoPendingLoans.isVisible = true;
          this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoPendingApplication");
          this.view.lblpendingApplciationNumber.text = "00";
          this.view.scrollToWidget(this.view.flxNoPendingLoansAvailable) ;
        }
        this.view.btnPendingTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
        this.view.btnSubmittedTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      }
      if (context.action == "getPendingApplicationsListSUBMITTED") {
        if (context.response.records && context.response.records.length > 0) {
          if (context.response.records.length < 10) {
            this.view.lblSubmittedApplicationsNumber.text = "0" + context.response.records.length;
          } else {
            this.view.lblSubmittedApplicationsNumber.text = context.response.records.length;
          }

          this.view.flxListOfApplications.isVisible = true;
          this.view.segmentListOfApplications.isVisible = false;
          this.view.segmentListOfApplicationsSubmitted.isVisible = true;
          this.view.flxSelectOptionsApplications.setVisibility(false);
          this.view.flxNoPendingLoansAvailable.isVisible = false;
          this.view.lblNoPendingLoans.isVisible = false;
          this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoSubmittedApplication");
          this.setDataIntoSubmittedApplicationsList(context.response.records);
          this.view.scrollToWidget(this.view.flxListOfApplicationsSubmittedHeader) ;
        } else {
          this.view.flxListOfApplicationsSubmittedHeader.isVisible = false;
          this.view.flxListOfApplicationsHeader.isVisible = false;
          this.view.flxListOfApplications.isVisible = false;
          this.view.flxNoPendingLoansAvailable.isVisible = true;
          this.view.lblNoPendingLoans.isVisible = true;
          this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoSubmittedApplication");
          this.view.lblSubmittedApplicationsNumber.text = "00";
          this.view.scrollToWidget(this.view.flxNoPendingLoansAvailable) ;
        }
        this.view.btnSubmittedTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
        this.view.btnPendingTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      }
      if (context.action == "getLeadsList") {
          if (context.response.leads && context.response.leads.length > 0) {
            this.view.flxListOfLeads.isVisible = true;
            this.view.flxListOfLeadsHeader.isVisible = true;
            this.view.segmentListOfLeads.isVisible = true;
            this.view.flxNoPendingLoansAvailable.isVisible = false;
            this.view.lblNoPendingLoans.isVisible = false;
            this.setDataIntoLeadsList(context.response.leads);
            this.view.scrollToWidget(this.view.flxListOfLeadsHeader) ;
          }
          else{
            this.view.flxListOfLeads.isVisible = false;
            this.view.flxNoPendingLoansAvailable.isVisible = true;
            this.view.lblNoPendingLoans.isVisible = true;
            this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoLeadsFound");
            this.view.scrollToWidget(this.view.flxNoPendingLoansAvailable) ;
          }
        }
      this.view.forceLayout();
    }
  },

  frmLoansDashboardPreShow: function() {
    //Set common area data
    this.view.flxHeaderAndMainContainer.setVisibility(true);
    this.view.CSRAssistToolTip.right = "130px";
    this.view.generalInfoHeader.flxUnlock.setVisibility(false);
    var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
    this.view.generalInfoHeader.setDefaultHeaderData(this);
    this.view.generalInfoHeader.setCustomerNameandTag(currentCustomerDetails);
    this.view.Notes.setDefaultNotesData(this);
    this.setCustomerStatus(currentCustomerDetails.OLBCustomerFlags.Status);
    if(currentCustomerDetails.CustomerType_id === this.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE){
      this.view.generalInfoHeader.flxActionButtons.setVisibility(false);
      this.view.generalInfoHeader.flxRiskStatus.setVisibility(false);
      this.view.alertMessage.setVisibility(false);
    }else{
      this.view.generalInfoHeader.flxRiskStatus.setVisibility(true);
      this.view.alertMessage.setVisibility(true);
      this.view.generalInfoHeader.flxActionButtons.setVisibility(true);
      this.view.generalInfoHeader.setRiskStatus(currentCustomerDetails.CustomerFlag);
      this.view.alertMessage.setGeneralInformationAlertMessage(this, this.presenter.getCurrentCustomerLockedOnInfo(),
                                                               this.presenter.getCurrentCustomerRequestAndNotificationCount());
    }
    this.view.Notes.setDefaultNotesData(this);
    this.view.breadcrumbs.lblCurrentScreen.text = currentCustomerDetails.Name.toUpperCase();
    //breadcrumbss
    var sourceFormDetails = this.presenter.sourceFormNavigatedFrom();
    var mainBtnText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SEARCHCUSTOMERS");
    if(sourceFormDetails.name === "frmLeadManagement") {  //if naviated from leads change breadcrumb text
      mainBtnText = sourceFormDetails.data.breadcrumbValue;          
    }
    if(currentCustomerDetails.CustomerType_id === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
      this.setBreadcrumbsData([mainBtnText, currentCustomerDetails.organisation_name.toUpperCase(),
                                   currentCustomerDetails.Name.toUpperCase()]);
    } else{
      this.setBreadcrumbsData([mainBtnText, currentCustomerDetails.Name.toUpperCase()]);
    }
   this.subTabsButtonUtilFunction([this.view.dashboardCommonTab.btnProfile,this.view.dashboardCommonTab.btnLoans,
                     this.view.dashboardCommonTab.btnDeposits,this.view.dashboardCommonTab.btnBanking],
                                       this.view.dashboardCommonTab.btnLoans);
    this.view.generalInfoHeader.flxLinkProfileButton.setVisibility(false);
    this.view.generalInfoHeader.flxDelinkProfileButton.setVisibility(false);
    //End of setting common area data
    this.setFlowActions();
  },

  setFlowActions: function() {
    var scopeObj = this;

    scopeObj.view.flxTrackApplications.onClick =  function() {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var dataObj = scopeObj.view.segmentListOfApplicationsSubmitted.data[scopeObj.currentApplicationsRowNumber] ; 
      scopeObj.presenter.trackApplication({ "QueryResponseID" : dataObj.queryResponseID, "loanType" : dataObj.loantype });
    };
    
    scopeObj.view.flxEditApplications.onClick =  function() {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
       var dataObj = scopeObj.view.segmentListOfApplicationsSubmitted.data[scopeObj.currentApplicationsRowNumber] ; 
      scopeObj.presenter.trackApplication({ "QueryResponseID" : dataObj.queryResponseID, "loanType" : dataObj.loantype, "isEdit": "true" });
    };
    
    scopeObj.view.flxAmountContainer.onClick = function() {
      scopeObj.sortOnAmount("lblAmountHeaderImg", "amount", "segmentListOfApplications", scopeObj.resetApplicationsSortIcons);
    };

    scopeObj.view.flxModifyOnContainer.onClick = function() {
      scopeObj.sortOnDate("lblModifyOnHeaderImg", "modifyOn", "segmentListOfApplications", scopeObj.resetApplicationsSortIcons);
    };

    scopeObj.view.flxCreateOnContainer.onClick = function() {
      scopeObj.sortOnDate("lblCreateOnheaderImg", "createOn", "segmentListOfApplications", scopeObj.resetApplicationsSortIcons);
    };

    scopeObj.view.flxAmountContainerSubmitted.onClick = function() {
      scopeObj.sortOnAmount("lblAmountHeaderSubmittedImage", "amount", "segmentListOfApplicationsSubmitted", scopeObj.resetApplicationsSortIcons);
    };

    scopeObj.view.flxSubmitOnContainerSubmitted.onClick = function() {
      scopeObj.sortOnDate("lblSubmitOnHeaderImage", "SubmitOn", "segmentListOfApplicationsSubmitted", scopeObj.resetApplicationsSortIcons);
    };
    
    scopeObj.view.flxProductContainer.onClick = function() {
      scopeObj.sortList("lblProductHeaderImg", "product", "segmentListOfLeads", scopeObj.resetLeadsSortIcons);
    };
    
    scopeObj.view.flxStatusContainer.onClick = function() {
      scopeObj.sortList("lblStatusHeaderImg", "status", "segmentListOfLeads", scopeObj.resetLeadsSortIcons);
    };
    
    scopeObj.view.flxLeadsCreatedOnContainer.onClick = function() {
      scopeObj.sortOnDate("lblLeadsCreatedOnHeaderImg", "createdOn", "segmentListOfLeads", scopeObj.resetLeadsSortIcons);
    };
    
    scopeObj.view.flxCreatedByContainer.onClick = function() {
      scopeObj.sortList("lblCreatedByHeaderImg", "createdBy", "segmentListOfLeads", scopeObj.resetLeadsSortIcons);
    };
    
    scopeObj.view.flxAssignToContainer.onClick = function() {
      scopeObj.sortList("lblAssignToHeaderImg", "assignTo", "segmentListOfLeads", scopeObj.resetLeadsSortIcons);
    };

    scopeObj.view.breadcrumbs.btnBackToMain.onClick = function(){
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
    scopeObj.view.btnPendingTab.onClick = function(){
      scopeObj.retrievePendingLoansList();
    };

    scopeObj.view.btnSubmittedTab.onClick = function(){
      scopeObj.retrieveSubmittedLoansList();
    };

    scopeObj.view.flxPendingApplication.onClick = function(){
      scopeObj.retrievePendingLoansList();
    };

    scopeObj.view.flxSubmittedApplications.onClick = function(){
      scopeObj.retrieveSubmittedLoansList();
    };
    
    scopeObj.view.btnCreateLead.onClick = function(){
      scopeObj.createLead();
    };
    
    scopeObj.view.flxApplicationsStatic.onClick = function(){
      scopeObj.view.lblLeadsStatic.skin="sknlblLato696c7312px";
      scopeObj.view.lblApplicationStatic.skin="sknLblFont485C75100O";
      scopeObj.view.lblApplicationsBlueLineIndication.setVisibility(true);
      scopeObj.view.flxPendingSubmittedTabs.setVisibility(true);
      scopeObj.view.lblLeadsBlueLineIndication.setVisibility(false);
      scopeObj.view.flxCreateLeadConatiner.setVisibility(false);
      scopeObj.view.flxListOfLeads.setVisibility(false);
      scopeObj.retrieveSubmittedLoansList();
    };

    scopeObj.view.flxLeadsStatic.onClick = function(){
      scopeObj.view.lblLeadsStatic.skin="sknLblFont485C75100O";
      scopeObj.view.lblApplicationStatic.skin="sknlblLato696c7312px";
      scopeObj.view.lblApplicationsBlueLineIndication.setVisibility(false);
      scopeObj.view.flxPendingSubmittedTabs.setVisibility(false);
      scopeObj.view.flxListOfApplications.setVisibility(false);
      scopeObj.view.lblLeadsBlueLineIndication.setVisibility(true);
      scopeObj.view.flxCreateLeadConatiner.setVisibility(true);
      scopeObj.fetchLeadsList();
    };
  },
  
  // the below function updates the logged in user name on the top right portion of the screen ie beside the logout button
  displayLoggedInStaffUser: function() {
    var scopeObj = this;
    scopeObj.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
  },

  hideAllMainContainers: function() {
    this.view.flxLoansMainContainer.setVisibility(false);
  },

  setDataToLoanTypes: function(loanTypeAprs) {
    var scopeObj = this;
    var loanType = null ;
    var index=0;
    scopeObj.loanTypeCount = 0 ;
    scopeObj.view.flxLoanTypes.removeAll();
    for(var key in scopeObj.loanTypeSkins){
    for (var i = 0; i < loanTypeAprs.length; i++) {      
        if(loanTypeAprs[i].LoanType_id === key) {
          loanType = scopeObj.loanTypeSkins[loanTypeAprs[i].LoanType_id] ;
          var tempObject = scopeObj.view.loaninfo.clone(scopeObj.loanTypeCount.toString());
          tempObject.setVisibility(true);
          tempObject[scopeObj.loanTypeCount + "lblNewLoanType"].text = loanType.Description;
          tempObject[scopeObj.loanTypeCount + "lblLoanTypeIcon"].text = loanType.icon;
          tempObject[scopeObj.loanTypeCount + "flxLoanTypeIcon"].skin = loanType.skin ;
          tempObject[scopeObj.loanTypeCount + "lblLoanApr"].text =  kony.i18n.getLocalizedString("i18n.frmLoansDashboard.APRAsLowAs") + loanTypeAprs[i].APRValue + 
            kony.i18n.getLocalizedString("i18n.frmLoansDashboard.APRAsLowAs%");
          tempObject[scopeObj.loanTypeCount + "lblNewLoanTypeId"].text = loanTypeAprs[i].LoanType_id ;
          tempObject[scopeObj.loanTypeCount + "flxLearnMore"].onClick = function(eventobject) {
            var code = eventobject.id.replace("flxLearnMore", "");
            var selectedType = eventobject.parent[code + "lblNewLoanTypeId"].text;
            if (selectedType == "PERSONAL_LOAN") {
              scopeObj.view.CSRAssist.openCSRAssistWindow(scopeObj, "SIMULATE_PERSONAL_LOAN");
            } else if (selectedType == "VEHICLE_LOAN") {
              scopeObj.view.CSRAssist.openCSRAssistWindow(scopeObj, "SIMULATE_VEHICLE_LOAN");
            } else {
              scopeObj.view.CSRAssist.openCSRAssistWindow(scopeObj, "APPLY_CREDIT_LOAN");
            }
          };
          tempObject[scopeObj.loanTypeCount + "btnApplyLoan"].onClick = function (eventobject) {
            var code = eventobject.id.replace("btnApplyLoan","");
            var selectedType = eventobject.parent[code + "lblNewLoanTypeId"].text ;
            if(selectedType == "PERSONAL_LOAN"){
              scopeObj.view.CSRAssist.openCSRAssistWindow(scopeObj, "APPLY_PERSONAL_LOAN");
            }else if(selectedType == "VEHICLE_LOAN"){
              scopeObj.view.CSRAssist.openCSRAssistWindow(scopeObj, "APPLY_VEHICLE_LOAN");
            }else {
              scopeObj.view.CSRAssist.openCSRAssistWindow(scopeObj, "APPLY_CREDIT_LOAN");
            }
          };
          if (scopeObj.loanTypeCount % 3 === 0) {
            index=scopeObj.loanTypeCount / 3;
            if(index>=1)
              scopeObj.view.flxLoanTypes.height="250dp";
            var flxLoanTypeInner=scopeObj.createLoanTypeInnerFlex(index);
            scopeObj.view.flxLoanTypes.add(flxLoanTypeInner);
            tempObject.left="0dp";
            scopeObj.view["flxLoanTypeInner"+index].add(tempObject);
          }
          else{
           	scopeObj.view["flxLoanTypeInner"+index].add(tempObject);
          }
          scopeObj.loanTypeCount++ ;
        }
      }      
    }
    scopeObj.view.forceLayout();
  },

  createLoanTypeInnerFlex: function(index) {
    var flxLoanTypeInner = new kony.ui.FlexContainer({
      "height":"114dp",
      "clipBounds": true,
      "id": "flxLoanTypeInner"+index,
      "isVisible": true,
      "layoutType": kony.flex.FLOW_HORIZONTAL,
      "left": "0dp",
      "isModalContainer": false,
      "skin": "slFbox",
      "top": "0dp",
      "right": "10dp",
      "zIndex": 100
    }, {
      "retainFlowHorizontalAlignment": false
    }, {});
    flxLoanTypeInner.setDefaultUnit(kony.flex.DP);
    return flxLoanTypeInner;
  },
  
  resetApplicationsSortIcons: function() {
    //Reset List of Applications Sorting icon
    this.view.lblAmountHeaderImg.text = "\ue92b";
    this.view.lblCreateOnheaderImg.text = "\ue92b";
    this.view.lblModifyOnHeaderImg.text = "\ue92b";
    this.view.lblAmountHeaderSubmittedImage.text = "\ue92b";
    this.view.lblSubmitOnHeaderImage.text = "\ue92b";
  },
  
  resetLeadsSortIcons: function() {
    //Reset List of Leads Sorting icon
    this.view.lblProductHeaderImg.text = "\ue92b";
    this.view.lblStatusHeaderImg.text = "\ue92b";
    this.view.lblLeadsCreatedOnHeaderImg.text = "\ue92b";
    this.view.lblCreatedByHeaderImg.text = "\ue92b";
    this.view.lblAssignToHeaderImg.text = "\ue92b";
  },
  
  setDataToSegment: function(PendingListResponse, SubmittedListResponse) {
    this.view.lblApplicationsBlueLineIndication.isVisible = true;
    this.view.flxPendingSubmittedTabs.isVisible = true;
    this.view.lblLeadsBlueLineIndication.isVisible = false;
    this.view.flxCreateLeadConatiner.isVisible = false;
    this.view.flxListOfLeads.isVisible = false;
    this.view.flxSelectOptionsApplications.setVisibility(false);
    if (SubmittedListResponse !== null && SubmittedListResponse.records.length > 0) {
      this.view.segmentListOfApplications.isVisible = false;
      this.view.flxListOfApplications.isVisible = true;
      this.view.segmentListOfApplicationsSubmitted.isVisible = true;
      this.view.flxListOfApplicationsSubmittedHeader.isVisible = true;
      this.view.flxListOfApplicationsHeader.isVisible = false;
      this.view.flxNoPendingLoansAvailable.isVisible = false;
      this.view.lblNoPendingLoans.isVisible = false;
      this.view.btnSubmittedTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
      this.view.btnPendingTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      this.setDataIntoSubmittedApplicationsList(SubmittedListResponse.records);
    } else {
      var hasPendingListResponse = PendingListResponse !== null && PendingListResponse.records.length > 0 ;
      this.view.flxListOfApplicationsSubmittedHeader.isVisible = false;
      this.view.flxListOfApplicationsHeader.isVisible = hasPendingListResponse;
      this.view.segmentListOfApplications.isVisible = hasPendingListResponse;
      this.view.flxNoPendingLoansAvailable.isVisible = !hasPendingListResponse ;
      this.view.lblNoPendingLoans.isVisible = !hasPendingListResponse ;
      this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoPendingApplication");
      this.view.flxListOfApplications.isVisible = hasPendingListResponse;
      this.view.segmentListOfApplicationsSubmitted.isVisible = false;
      this.view.flxListOfApplicationsSubmittedHeader.isVisible = false;
      this.view.btnPendingTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
      this.view.btnSubmittedTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      this.setDataIntoPendingApplicationsList(hasPendingListResponse ? PendingListResponse.records : []);
    }
  },

  setDataIntoPendingApplicationsList: function(response) {
    var self = this;
    var data = [];
    var rowJsonData = {};
    var customerId = kony.store.getItem("Customer_id");
    for (var i = 0; i < response.length; i++) {
      rowJsonData = {};
      var amount = undefined;
      if (response[i].QuestionResponse1) {
        var questionResponse = response[i].QuestionResponse1;
        if (questionResponse !== null && questionResponse.length > 0) {
          for (var j = 0; j < questionResponse.length; j++) {
            if (questionResponse[j].QuerySectionQuestion_id === "PA_LOANAMOUNT" || 
                questionResponse[j].QuerySectionQuestion_id === "VA_LOAN_AMOUNT" || questionResponse[j].QuerySectionQuestion_id === "CCA_CARDLIMIT") {
              amount =  questionResponse[j].ResponseValue;
              break;
            }
          }
        }
      } 
      rowJsonData.amountWithCurrency = (amount === null || amount === undefined || amount.trim() === "") ? "N/A" : "$ " + amount  ;
      rowJsonData.amount = (amount === null || amount === undefined || amount.trim() === "")  ? undefined : amount ;
      rowJsonData.createOn = this.getLocaleDate(this.getDateInstanceFromDBDateTime(response[i].createdTS));
      rowJsonData.modifyOn = this.getLocaleDate(this.getDateInstanceFromDBDateTime(response[i].modifiedTS));
      rowJsonData.loantype = String(response[i].loantype);
      rowJsonData.applicationId = response[i].id.substr(0, 10);
      rowJsonData.queryResponseID = response[i].id;
      rowJsonData.queryDefID = response[i].QueryDefinition_id;
      rowJsonData.lblApplicant = (response[i].CoBorrower_id  && response[i].CoBorrower_id === customerId ) ? "Co-Applicant" : "Primary Applicant" ;
      rowJsonData.lblSeparatorListOfApplications = "-" ;
      rowJsonData.lblResume = {"text":"\ue956" , 
                               "toolTip" : kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ResumeStatic"),
                               "onClick":function(){
                                 self.view.CSRAssist.openCSRAssistWindow(self, "RESUME_LOAN", 
                                                                                 {
                                   "Loan_id":self.view.segmentListOfApplications.data[self.view.segmentListOfApplications.selectedIndex[1]].queryResponseID,
                                   "Loan_Type":self.view.segmentListOfApplications.data[self.view.segmentListOfApplications.selectedIndex[1]].queryDefID
                                 });
                               }};
      rowJsonData.template = "flxListOfApplications";
      amount = undefined ;
      data.push(rowJsonData);
    }
    this.view.segmentListOfApplications.widgetDataMap = {
      lblApplicationId: "applicationId",
      lblLoanType: "loantype",
      lblAmount: "amountWithCurrency",
      lblCreateOn: "createOn",
      lblModifyOn: "modifyOn",
      lblResume: "lblResume",
      lblApplicant : "lblApplicant",
      lblSeparatorListOfApplications : "lblSeparatorListOfApplications"
    };
    this.view.segmentListOfApplications.setData(data);
    this.view.flxListOfApplicationsSubmittedHeader.isVisible = false;
    this.view.flxListOfApplicationsHeader.isVisible = true;
    this.view.forceLayout();
  },

  setDataIntoSubmittedApplicationsList: function(response) {
    var data = [];
    var rowJsonData = {};
    var customerId = kony.store.getItem("Customer_id");
    for (i = 0; i < response.length; i++) {
      var amount = undefined;
      rowJsonData = {};
      if (response[i].QuestionResponse1) {
        var questionResponse = response[i].QuestionResponse1;
        if (questionResponse !== null && questionResponse.length > 0) {
          for (var j = 0; j < questionResponse.length; j++) {
            if (questionResponse[j].QuerySectionQuestion_id === "PA_LOANAMOUNT" || 
                questionResponse[j].QuerySectionQuestion_id === "VA_LOAN_AMOUNT" || questionResponse[j].QuerySectionQuestion_id === "CCA_CARDLIMIT") {
              amount = questionResponse[j].ResponseValue;
              break;
            }
          }
        }
      } 
      rowJsonData.amountWithCurrency = (amount === null || amount === undefined || amount.trim() === "") ? "N/A" : "$ " + amount  ;
      rowJsonData.amount = (amount === null || amount === undefined || amount.trim() === "")  ? undefined : amount ;
      rowJsonData.CloseDate = "N/A";
      rowJsonData.SubmitOn = this.getLocaleDate(this.getDateInstanceFromDBDateTime(response[i].modifiedTS));
      rowJsonData.CreateOn = this.getLocaleDate(this.getDateInstanceFromDBDateTime(response[i].createdTS));
      rowJsonData.loantype = String(response[i].loantype);
      rowJsonData.applicationId = response[i].id.substr(0, 10);
      rowJsonData.queryResponseID = response[i].id;
      rowJsonData.queryDefID = response[i].QueryDefinition_id;
      rowJsonData.template = "flxListOfApplicationsSubmitted";
      rowJsonData.lblStatus = "SUBMITTED";
      rowJsonData.lblApplicant = (response[i].CoBorrower_id && response[i].CoBorrower_id === customerId ) ? "Co-Applicant" : "Primary Applicant" ;
      rowJsonData.lblSeparatorListOfApplications = "-" ;
      rowJsonData.flxOptions={ "onClick" : this.showSubmittedApplicationsOptions};
      rowJsonData.QuestionResponse = response[i].QuestionResponse;
      rowJsonData.lblOptions={"text" : "",
                              "skin" : "sknFontIconOptionMenu"};
      amount = undefined ;
      data.push(rowJsonData);
    }
    this.view.segmentListOfApplicationsSubmitted.widgetDataMap = {
      flxOptions: "flxOptions",
      lblOptions: "lblOptions",
      lblApplicationId: "applicationId",
      lblLoanType: "loantype",
      lblAmount: "amountWithCurrency",
      lblSubmitOn: "SubmitOn",
      lblCloseDate: "CloseDate",
      lblStatus: "lblStatus",
      lblApplicant : "lblApplicant",
      lblSeparatorListOfApplications : "lblSeparatorListOfApplications"
    };
    this.view.segmentListOfApplicationsSubmitted.setData(data);
    this.view.flxListOfApplicationsHeader.isVisible = false;
    this.view.flxListOfApplicationsSubmittedHeader.isVisible = true;
    this.view.forceLayout();
  },
  
  setDataIntoLeadsList: function(response) {
    var data = [];
    var rowJsonData = {};
    for (i = 0; i < response.length; i++) {
      rowJsonData = {};
      rowJsonData.product={ "text": this.trimSegText(response[i].productName,30), "tooltip": response[i].productName };
      if(response[i].statusId==="SID_INPROGRESS")
      	rowJsonData.status="In Progress";
      else if(response[i].statusId==="SID_NEW")
        rowJsonData.status="New";
      else
        rowJsonData.status="Archived";
      rowJsonData.createdOn=this.getLocaleDate(this.getDateInstanceFromDBDateTime(response[i].createdts));
      var nameStr=response[i].createdByFirstName+" "+response[i].createdByMiddleName+" "+response[i].createdByLastName;
      rowJsonData.createdBy={ "text": this.trimSegText(nameStr,25), "tooltip": nameStr };
      nameStr="";
      if(response[i].assignedToFirstName)
        nameStr=response[i].assignedToFirstName+" ";
      if(response[i].assignedToMiddleName)
        nameStr+=response[i].assignedToMiddleName+" ";
      if(response[i].assignedToLastName)
        nameStr+=response[i].assignedToLastName;
      rowJsonData.assignTo={ "text": nameStr.length? this.trimSegText(nameStr,25) : "N/A", "tooltip": nameStr.length? nameStr :"" };
      rowJsonData.lblSeparatorListOfLeads="-";
      data.push(rowJsonData);
    }
    this.view.segmentListOfLeads.widgetDataMap = {
      flxListOfLeadsInner:"flxListOfLeadsInner",
      lblProduct: "product",
      lblStatus: "status",
      lblCreatedOn: "createdOn",
      lblCreatedBy: "createdBy",
      lblAssignTo : "assignTo",
      lblSeparatorListOfLeads:"lblSeparatorListOfLeads"
    };
    this.view.segmentListOfLeads.setData(data);
    this.view.forceLayout();
  },
  
  trimSegText: function(text,len) {
    var final_text = text;
    if (text.length > len) final_text = text.substr(0, len) + "...";
    return final_text;
  },
  
  retrievePendingLoansList: function() {
    this.resetApplicationsSortIcons();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.retrieveLoansList("PENDING");
  },

  retrieveSubmittedLoansList: function() {
    this.resetApplicationsSortIcons();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.retrieveLoansList("SUBMITTED");
  },
  
  fetchLeadsList: function() {
    this.resetLeadsSortIcons();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchLeads();
  },
     
  createLead : function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    var self =this;
    var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
    var contactarr = currentCustomerDetails.PrimaryPhoneNumber ? currentCustomerDetails.PrimaryPhoneNumber.split("-") : [];
    var isd_code = contactarr[0].substr(1,contactarr[0].length);
    var payload = {
      "custId":currentCustomerDetails.Customer_id,
      "custUsername":currentCustomerDetails.Username,
      "custFullname":currentCustomerDetails.Name,
      "saluation":currentCustomerDetails.Salutation,
      "firstName":currentCustomerDetails.FirstName,
      "middleName":currentCustomerDetails.MiddleName,
      "lastName":currentCustomerDetails.LastName,
      "email":currentCustomerDetails.PrimaryEmailAddress,
      "countryCode": isd_code,
      "phoneNumber":contactarr[1],
      "extension":contactarr[2],
      "productId":"",
      "note": ""
    }; 
    self.presenter.navigateToLeadCreateScreen(payload,"create",{formName:"customer",
                                                                breadcrumbBack : self.view.breadcrumbs.btnBackToMain.text});
  },
  
  resetPendingLoansListWithoutInvokingService: function() {
    this.resetApplicationsSortIcons();
    var hasData = this.view.segmentListOfApplications.data.length > 0 ;
    this.view.btnPendingTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
    this.view.btnSubmittedTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.flxListOfApplicationsSubmittedHeader.isVisible = false;
    this.view.flxListOfApplicationsHeader.isVisible = true;
    this.view.segmentListOfApplications.isVisible = true;
    this.view.segmentListOfApplicationsSubmitted.isVisible = false;
    this.view.flxNoPendingLoansAvailable.isVisible = !hasData;
    this.view.lblNoPendingLoans.isVisible = !hasData ;
    this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoPendingApplication");
  },

  resetSubmittedLoansListWithoutInvokingService: function() {
    this.resetApplicationsSortIcons();
    var hasData = this.view.segmentListOfApplicationsSubmitted.data.length > 0 ;
    this.view.btnSubmittedTab.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
    this.view.btnPendingTab.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.flxListOfApplicationsHeader.isVisible = false;
    this.view.flxListOfApplicationsSubmittedHeader.isVisible = true;
    this.view.segmentListOfApplications.isVisible = false;
    this.view.segmentListOfApplicationsSubmitted.isVisible = true;
    this.view.flxNoPendingLoansAvailable.isVisible = !hasData;
    this.view.lblNoPendingLoans.isVisible = !hasData ;
    this.view.lblNoPendingLoans.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.NoSubmittedApplication");
    this.view.forceLayout();
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

  openErrorPopup: function (popupModel) {
    var self = this;
    this.view.popUpError.lblPopUpMainMessage.text = popupModel.header;
    this.view.popUpError.rtxPopUpDisclaimer.text = popupModel.message;
    this.view.popUpError.btnPopUpCancel.text = popupModel.closeMsg;

    this.view.popUpError.btnPopUpCancel.onClick = function () {
      popupModel.closeAction();
      self.view.flxPopUpError.setVisibility(false);
    };
    this.view.popUpError.flxPopUpClose.onClick = function () {
      self.view.flxPopUpError.setVisibility(false);
    };
    this.view.flxPopUpError.setVisibility(true);
    this.view.forceLayout();
  },

  openConfirm: function (popupModel) {
    var self = this;
    this.view.popUpConfirmation.lblPopUpMainMessage.text = popupModel.header;
    this.view.popUpConfirmation.rtxPopUpDisclaimer.text = popupModel.message;
    this.view.popUpConfirmation.btnPopUpDelete.text = popupModel.confirmMsg;
    this.view.popUpConfirmation.btnPopUpCancel.text = popupModel.cancelMsg;
    this.view.popUpConfirmation.btnPopUpDelete.onClick = function () {
      popupModel.confirmAction();
      self.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.popUpConfirmation.btnPopUpCancel.onClick = function () {
      popupModel.cancelAction();
      self.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.popUpConfirmation.flxPopUpClose.onClick = function () {
      self.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.flxPopUpConfirmation.setVisibility(true);
  },

  showNoError: function (Widget) {
    var NormalSkinTbx = "skntxtbxDetails0bbf1235271384a";
    var NormalSkinLst = "sknlstbxNormal0f9abd8e88aa64a";
    if (Widget.wType === "TextField")
      Widget.skin = NormalSkinTbx;
    else
      Widget.skin = NormalSkinLst;
  },

  showSubmittedApplicationsOptions: function()
  {
    var scopeObj = this;
    var index = scopeObj.view.segmentListOfApplicationsSubmitted.selectedRowIndex[1];
    var templateArray = this.view.segmentListOfApplicationsSubmitted.clonedTemplates;
    var height = 0;
    scopeObj.currentApplicationsRowNumber=index;
    for(var i = 0; i < index; i++){
      height += templateArray[i].flxListOfApplicationsSubmitted.frame.height;
    }

    var segmentWidget = this.view.segmentListOfApplicationsSubmitted;
    var contextualWidget = this.view.flxSelectOptionsApplications;
    height = (height + 60) - segmentWidget.contentOffsetMeasured.y;
    if(height + contextualWidget.frame.height > segmentWidget.frame.height) {
      height = height - contextualWidget.frame.height - 60;
    }
    height = height + 60 + "px";

    if ((scopeObj.view.flxSelectOptionsApplications.isVisible === false) ||
        (scopeObj.view.flxSelectOptionsApplications.isVisible === true && scopeObj.view.flxSelectOptionsApplications.top !== height)) {

      scopeObj.view.flxSelectOptionsApplications.top = height;
      scopeObj.view.flxSelectOptionsApplications.setVisibility(true);
      scopeObj.view.flxSelectOptionsApplications.onHover = scopeObj.onHoverEventCallback;
    }
    else {
      scopeObj.view.flxSelectOptionsApplications.setVisibility(false);
    }
    scopeObj.view.forceLayout();
  },
  
  onHoverEventCallback : function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view[widGetId].setVisibility(true);
    }
    else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view[widGetId].setVisibility(false);
    }
  },

  sortList: function(imgId, property, segId, resetId) {
    var scopeObj = this;
    var data = scopeObj.view[segId].data;
    if (data.length > 0) {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var isAscending = (scopeObj.view[imgId].text === "\ue92b" || scopeObj.view[imgId].text === "\ue920");
      var sortedData = data.sort(function(s1, s2) {
        var f = isAscending ? 1 : -1;
        var a = s1[property].tooltip||s1[property].text? s1[property].tooltip : s1[property];
        var b = s2[property].tooltip||s2[property].text? s2[property].tooltip : s2[property];
        if (a < b) {
          return -1 * f;
        }
        if (a > b) {
          return 1 * f;
        }
        return 0;
      });
      resetId();
      scopeObj.view[segId].setData(sortedData);
      scopeObj.view[imgId].text = isAscending ? "\ue92A" : "\ue920";
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    }
  },

  sortOnAmount: function(imgId, property, segId, resetId) {
    var scopeObj = this;
    var data = scopeObj.view[segId].data;
    if (data.length > 0) {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var isAscending = (scopeObj.view[imgId].text === "\ue92b" || scopeObj.view[imgId].text === "\ue920");
      var sortedData = data.sort(function(s1, s2) {
        var f = isAscending ? 1 : -1;
        var a = parseInt(s1[property] ? s1[property] : "0");
        var b = parseInt(s2[property] ? s2[property] : "0");
        if (a < b) {
          return -1 * f;
        }
        if (a > b) {
          return 1 * f;
        }
        return 0;
      });
      resetId();
      scopeObj.view[segId].setData(sortedData);
      scopeObj.view[imgId].text = isAscending ? "\ue92A" : "\ue920";
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    }
  },

  sortOnDate: function(imgId, property, segId, resetId) {
    var scopeObj = this;
    var data = scopeObj.view[segId].data;
    if (data.length > 0) {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var isAscending = (scopeObj.view[imgId].text === "\ue92b" || scopeObj.view[imgId].text === "\ue920");
      var sortedData = data.sort(function(s1, s2) {
        var f=isAscending?1:-1;
        var a=new Date(s1[property]);
        var b=new Date(s2[property]);
        if(a < b) {
          return -1*f;
        }
        if(a > b) {
          return 1*f;
        }
        return 0;
      });
      resetId();
      scopeObj.view[segId].setData(sortedData);

      scopeObj.view[imgId].text = isAscending ? "\ue92A" : "\ue920";
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    }
  },
  
  setLoanTypeSkins : function() {
    var scopeObj  = this ;
    var isHoverskin = false ;
    for(var i = 0; i<scopeObj.loanTypeCount; i++) {
      isHoverskin = (i === 0) ;
      scopeObj.view[i + "loaninfo"][i + "flxLoanAprDetails"].setVisibility(!isHoverskin);
      scopeObj.view[i + "loaninfo"][i + "flxApplyLoan"].setVisibility(isHoverskin);
      scopeObj.view[i + "loaninfo"][i + "lblLearnMore"].setVisibility(isHoverskin);
      scopeObj.view[i + "loaninfo"][i + "btnApplyLoan"].setVisibility(isHoverskin);
      scopeObj.view[i + "loaninfo"].skin = isHoverskin ? "sknFlxBorder117eb0CustomRadius5px" : "sknFlxBordere1e5eedCustomRadius5px";
    }

  },
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

});
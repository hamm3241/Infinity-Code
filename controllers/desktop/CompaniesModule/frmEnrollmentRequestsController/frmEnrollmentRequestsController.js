define({
  isAccountCentricConfig : true,
  count: 0,
  RequestsData : [],
  accountsData:[],
  originalAccDataArray:"",
  PreShowRequests : function(){
    this.setFlowActions();
    this.setPreshowData();
    this.setHeight();
  },
  willUpdateUI: function (viewModel) {
    var scopeObj=this;
    this.updateLeftMenu(viewModel);
    if(viewModel.action==="ViewRequestsList"){
      scopeObj.loadPageData = function() {
        var searchResult = scopeObj.RequestsData
        .filter(scopeObj.searchFilter);
        scopeObj.setSegRequestsData(searchResult);
      };
      scopeObj.presenter.getLegalEntities({}, "frmEnrollmentRequests");
      scopeObj.view.lblLegalSelectedValue.text = viewModel.legalEntityName;
      scopeObj.view.segRequests.info = viewModel.legalEntityId;
      this.view.HeaderTabs.lblCount1.info=viewModel.pendingRequestsData;
      this.view.HeaderTabs.lblCount2.info=viewModel.rejectedRequestsData;
      this.showAutoApprovalNoti(viewModel.BusinessConfigurations);
      this.showPendingRequests();
    }else if (viewModel.loadingScreen) {
      if (viewModel.loadingScreen.focus){
        kony.adminConsole.utils.showProgressBar(this.view);
      }
      else{
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    }else if(viewModel.action==="companyDetails"){
      this.showCompanyDetails(viewModel.companyDetails);
    }else if(viewModel.coreTypeConfig){
      this.isAccountCentricConfig = viewModel.coreTypeConfig.isAccountCentricCore;
      //this.isAccountCentricConfig=false;
    }else if (viewModel.toastMessage) {
      if (viewModel.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
        this.view.toastMessage.showToastMessage(viewModel.toastMessage.message, this);
      } else if (viewModel.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
        this.view.toastMessage.showErrorToastMessage(viewModel.toastMessage.message, this);
      }
      scopeObj.presenter.getLegalEntities({}, "frmEnrollmentRequests");
      scopeObj.view.lblLegalSelectedValue.text = viewModel.toastMessage.name?viewModel.toastMessage.name:"";
    }
      else if (viewModel.companyLegalUnits) {
          this.SetDataForLegalEntity(viewModel.companyLegalUnits);
          this.view.flxLegalEntityListCont.info = viewModel.companyLegalUnits;
     }
  },
  setFlowActions : function(){
    var scopeObj=this;
    this.view.HeaderTabs.flxHeader1.onClick = function(){
      scopeObj.showPendingRequests();
    };
    this.view.HeaderTabs.flxHeader2.onClick = function(){
      scopeObj.showRejectedLists();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.presenter.showContractSearch();
    };
    this.view.btnMandatoryFeatures.onClick = function(){
      scopeObj.suspendFeatureHideShow("mandatory_feature_screen");
    };
    this.view.btnAdditionalFeatures.onClick = function(){
      scopeObj.suspendFeatureHideShow("additional_feature_screen");
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.view.breadcrumbs.lblCurrentScreen.text=scopeObj.view.breadcrumbs.btnPreviousPage.text;
      scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      scopeObj.view.flxRequestsListContainer.setVisibility(true);
      scopeObj.view.flxRequestDetails.setVisibility(false);
    };
    this.view.segRequests.onRowClick = function(){
      scopeObj.getCompanyDetails();
    };
    this.view.flxViewTab1.onTouchEnd = function(){
      scopeObj.showAccounts();
    };
    this.view.flxViewTab2.onTouchEnd = function(){
      scopeObj.showFeatures();
    };
    this.view.flxFeatureDetailsClose.onClick = function(){
      scopeObj.view.flxFeatureDetails.setVisibility(false);
    };
    this.view.btnShowSuspendFeature.onClick = function(){
      scopeObj.suspendFeatureHideShow("suspend_screen");
    };
    this.view.backToFeautresList.btnBack.onClick = function(){
      scopeObj.suspendFeatureHideShow("additional_feature_screen");
    };
    this.view.commonButtonsFeatureSuspend.btnCancel.onClick = function(){
      scopeObj.suspendFeatureHideShow("additional_feature_screen");
    };
    
    this.view.commonButtonsFeatureSuspend.btnSave.onClick = function(){
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(true);
    };
    
    this.view.suspendFeaturePopup.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
    };
    this.view.suspendFeaturePopup.btnPopUpDelete.onClick = function(){
      scopeObj.view.flxSuspendFeaturePopup.setVisibility(false);
      scopeObj.suspendFeatureRequest();
    };
    
    this.view.flxUserDetailsHeader.onClick = function(){
      if(scopeObj.view.flxViewUserDetails.isVisible){
        scopeObj.view.lblArrowIcon.text="";
        scopeObj.view.lblArrowIcon.skin="sknfontIconDescRightArrow14px";
        scopeObj.view.flxViewUserDetails.setVisibility(false);
      }
      else{
        scopeObj.view.lblArrowIcon.text="";
        scopeObj.view.lblArrowIcon.skin="sknfontIconDescDownArrow12px";
        scopeObj.view.flxViewUserDetails.setVisibility(true);
      }
    };
    this.view.flxPendingContrId.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblContractId.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderCompanyName1.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblContractName.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderBusinessTypes1.onClick = function(){
      //buisness types filter
      var flxRight = scopeObj.view.flxPendingRequestsHeader.frame.width - scopeObj.view.flxHeaderBusinessTypes1.frame.x - scopeObj.view.flxHeaderBusinessTypes1.frame.width;
      var iconRight = scopeObj.view.flxHeaderBusinessTypes1.frame.width - scopeObj.view.lblBusinessTypesFilter1.frame.x;
      if(scopeObj.view.flxBusinessTypesFilter.isVisible){
        scopeObj.view.flxBusinessTypesFilter.setVisibility(false);
      }
      else{
        scopeObj.view.flxBusinessTypesFilter.right=(flxRight + iconRight -30) +"px";
        scopeObj.view.flxBusinessTypesFilter.setVisibility(true);
      }
    };
    this.view.flxHeaderSubmittedOn1.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblSubmittedOn.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderSubmittedBy.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblSubmittedBy.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderCompanyName2.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblContractName.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderBusinessTypes2.onClick = function(){
      //business types filter
      var flxRight = scopeObj.view.flxRejectedRequestsHeader.frame.width - scopeObj.view.flxHeaderBusinessTypes2.frame.x - scopeObj.view.flxHeaderBusinessTypes2.frame.width;
      var iconRight = scopeObj.view.flxHeaderBusinessTypes2.frame.width - scopeObj.view.lblBusinessTypesFilter2.frame.x;
      if(scopeObj.view.flxBusinessTypesFilter.isVisible){
        scopeObj.view.flxBusinessTypesFilter.setVisibility(false);
      }
      else{
        scopeObj.view.flxBusinessTypesFilter.right=(flxRight + iconRight -30) +"px";
        scopeObj.view.flxBusinessTypesFilter.setVisibility(true);
      }
    };
    this.view.flxHeaderSubmittedOn2.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblSubmittedOn.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderRejectedOn.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblRejectedOn.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxHeaderRejectedBy.onClick = function(){
      var segData = scopeObj.view.segRequests.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblRejectedBy.text", "companies");
      scopeObj.view.segRequests.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    /*Accounts header*/
    this.view.flxAccountType.onClick = function(){
      var segData = scopeObj.view.segCompanyDetailAccount.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblAccountType.text", "accounts");
      scopeObj.view.segCompanyDetailAccount.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxAccountName.onClick = function(){
      var segData = scopeObj.view.segCompanyDetailAccount.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblAccountName.text", "accounts");
      scopeObj.view.segCompanyDetailAccount.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxAccountNumber.onClick = function(){
      var segData = scopeObj.view.segCompanyDetailAccount.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblAccountNumber.text", "accounts");
      scopeObj.view.segCompanyDetailAccount.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxStatus.onClick = function(){
      if(scopeObj.view.flxAccountStatusFilter.isVisible){
        scopeObj.view.flxAccountStatusFilter.setVisibility(false);
      }else{
        if(scopeObj.isAccountCentricConfig===true)
          scopeObj.view.flxAccountStatusFilter.left=scopeObj.view.flxStatus.frame.x-40+"px";
        else
          scopeObj.view.flxAccountStatusFilter.left=scopeObj.view.flxStatus.frame.x+135+"px";
        scopeObj.view.flxAccountStatusFilter.setVisibility(true);
      }
    };
    this.view.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.tbxSearchBox.text.trim().length!==0){
        scopeObj.view.flxClearSearchImage.setVisibility(true);
      }else
        scopeObj.view.flxClearSearchImage.setVisibility(false);
      scopeObj.loadPageData();
    };

   this.view.tbxSearchBoxdetAcc.onKeyUp = function(){
      if(scopeObj.view.tbxSearchBoxdetAcc.text.trim().length!==0){
        scopeObj.view.flxClearSearchImagedetAcc.setVisibility(true);
      }else
        scopeObj.view.flxClearSearchImagedetAcc.setVisibility(false);
      scopeObj.searchAccountsData();
    };
    
    this.view.flxClearSearchImagedetAcc.onClick = function(){
      scopeObj.clearSearchData();
    };
    
    this.view.flxViewAllSubsidary.onClick = function(){
      scopeObj.showSubsidaryPopup();
    };
    
    this.view.flxCloseIcn.onClick = function(){
      scopeObj.view.flxViewSubsidiary.setVisibility(false);
    };
    
    this.view.txtSearchbox.onKeyUp = function(){
        if(scopeObj.view.txtSearchbox.text.trim().length!==0){
        scopeObj.view.flxClearSearchImageSub.setVisibility(true);
      }else
        scopeObj.view.flxClearSearchImageSub.setVisibility(false);
      scopeObj.searchSubsidaryPopup();
    };
    
    this.view.flxClearSearchImageSub.onclick = function()
    {
      scopeObj.view.txtSearchbox.text="";
      scopeObj.view.flxClearSearchImageSub.setVisibility(false);
      scopeObj.setPopupArray();
    };
    
    this.view.flxClearSearchImage.onClick = function(){
      scopeObj.view.tbxSearchBox.text="";
      scopeObj.view.flxClearSearchImage.setVisibility(false);
      scopeObj.loadPageData();
    };
    this.view.btnPopUpCancel.onClick = function(){
      scopeObj.view.txtReason.text="";
      scopeObj.view.txtReason.skin="skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoReasonError.setVisibility(false); 
      scopeObj.view.flxRejectPopUp.setVisibility(true);
    };
    this.view.btnPopUpDelete.onClick = function(){
      var selIndex=scopeObj.view.segRequests.selectedRowIndex[1];
      var requestData= scopeObj.view.segRequests.data[selIndex];
      scopeObj.presenter.updateContractStatus({
        "companyName":requestData.lblContractName.text,
        "contractId":requestData.lblContractId,
        "statusId":"SID_CONTRACT_ACTIVE"
      });
    };
    //Reject popup buttons
    this.view.btnCancel.onClick = function(){
      scopeObj.view.flxRejectPopUp.setVisibility(false);
    };
    this.view.btnsave.onClick = function(){
      scopeObj.rejectOnClick();
    };
    this.view.flxClose.onClick = function(){
      scopeObj.view.flxRejectPopUp.setVisibility(false);
    };
    this.view.txtReason.onKeyUp = function(){
      scopeObj.view.txtReason.skin="skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoReasonError.setVisibility(false); 
      if(scopeObj.view.txtReason.text.length===0)
      {
        scopeObj.view.lblReasonSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblReasonSize.text=scopeObj.view.txtReason.text.length+"/300";
        scopeObj.view.lblReasonSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtReason.onEndEditing = function(){
      scopeObj.view.lblReasonSize.setVisibility(false);
    };
    this.view.accountStatusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performStatusFilter();
    };
    this.view.BusinessTypesFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performTypeFilter();
    };
    this.view.lblDetailsMore.onHover = function(widget,context){
      scopeObj.view.flxTaxIdTooltip.left=scopeObj.view.flxViewTIN.frame.x+20+"px";
      scopeObj.onHoverTaxIdMoreText(widget,context);
    };
    this.view.flxBusinessTypesFilter.onHover = this.onDropDownsHoverCallback;
    this.view.flxAccountStatusFilter.onHover = this.onDropDownsHoverCallback;
    
    //for search on customer centric
    this.view.tbxSearchBoxdet.onKeyUp= function(){
      if(scopeObj.view.tbxSearchBoxdet.text.trim().length!==0){
        scopeObj.view.flxClearSearchImagedet.setVisibility(true);
      }else
        scopeObj.view.flxClearSearchImagedet.setVisibility(false);
      scopeObj.searchAccountsDataCustomerCentric();
    };
    this.view.flxsearchimg.onClick=function()
    {
      if(scopeObj.view.tbxSearchBoxdet.text.trim().length>=3)
        scopeObj.searchAccountsDataCustomerCentric();
    };

    this.view.flxClearSearchImagedet.onClick = function(){
       scopeObj.clearSearchDataCustomer();
    };
    this.view.flxLegalSelectedValue.onClick = function(){
      if(scopeObj.view.flxLegalEntityListCont.isVisible){
        scopeObj.view.flxLegalEntityListCont.isVisible=false;
       } else{
      scopeObj.view.flxLegalEntityListCont.isVisible=true;
      }
    };
    this.view.dropdownLegalEntity.tbxSearchBox.onKeyUp = function() {
            if (scopeObj.view.dropdownLegalEntity.tbxSearchBox.text.trim().length > 0) {
                var segData = scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.data;
                var searchText = scopeObj.view.dropdownLegalEntity.tbxSearchBox.text;
                var statusName = "";
                var filteredData = segData.filter(function(rec) {
                    statusName = rec.lblDescription.text.toLowerCase();
                    if (statusName.indexOf(searchText) >= 0) return rec;
                });
                if (filteredData.length === 0) {
                    scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(false);
                    scopeObj.view.dropdownLegalEntity.flxNoResultFound.setVisibility(true);
                } else {
                    scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setData(filteredData);
                    scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(true);
                    scopeObj.view.dropdownLegalEntity.flxNoResultFound.setVisibility(false);
                }
            } else {
                 scopeObj.view.dropdownLegalEntity.flxNoResultFound.setVisibility(false);
                 scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setVisibility(true);
                 var legalentityData = scopeObj.view.flxLegalEntityListCont.info;
                 scopeObj.SetDataForLegalEntity(legalentityData);
            }
            scopeObj.view.forceLayout();
        };
  },

  searchAccountsData: function(){
    var searchText = this.view.tbxSearchBoxdetAcc.text;
    var finalArr = [];
    for (var i = 0; i < this.searchData.length; i++){
      if(this.searchData[i].lblAccountNumber.text.includes(searchText) || this.searchData[i].lblAccountName.text.includes(searchText)){
        if(!(finalArr.includes(this.searchData[i])))
          finalArr.push(this.searchData[i]);
      }
    }
    this.view.segCompanyDetailAccount.setData(finalArr);
    this.view.forceLayout();

  },

  clearSearchData: function(){
    this.view.tbxSearchBoxdetAcc.text = "";
    this.view.segCompanyDetailAccount.setData(this.searchData);
  },
  
  showSubsidaryPopup : function(){
    this.view.flxViewSubsidiary.skin = "sknFocus50";
    this.view.flxViewPopup.skin = "slFbox0j9f841cc563e4e";
    this.view.flxViewSubsidiary.setVisibility(true);
    this.view.txtSearchbox.text = "";
    this.setPopupArray();
    this.view.forceLayout();
  },
  

  searchSubsidaryPopup : function(){
    var dataMap = this.dataMap();
    var popUpData = this.popUpData;
    var searchText = this.view.txtSearchbox.text;
    var data = Object.values(popUpData).map(function(actionRec){
      if(actionRec[0].lblCompanyName.text.includes(searchText)){
        return{
          "lblCompanyName":actionRec[0].lblCompanyName.text,
          "lblBusinessTypes":actionRec[0].lblCustomerIDVal.text,
          "lblSubmittedOn":actionRec[0].lblTaxiDValue.text,
          "lblSubmittedBy":actionRec.length,
          "lblSeperator":"."
        };
      }
    });
    var searchArr = [];
    data.forEach(function(val){
      if(val !== undefined)
        searchArr.push(val);
    });
    this.view.segSubViews.widgetDataMap = dataMap;
    this.view.segSubViews.setData(searchArr);
    this.view.forceLayout();
  },
  
  dataMap : function(){
    var dataMap = {
      "flxViewSubsidiary": "flxViewSubsidiary",
      "lblCompanyName":"lblCompanyName",
      "lblBusinessTypes":"lblBusinessTypes",
      "lblSubmittedOn": "lblSubmittedOn",
      "lblSubmittedBy": "lblSubmittedBy",
      "lblSeperator": "lblSeperator"
    };
    return dataMap;
  },
  
  setPreshowData : function(){
    this.view.tbxSearchBox.text="";
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.Companies.Enrollment_Requests");
    this.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.leftmenu.contracts").toUpperCase();
    this.view.breadcrumbs.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.Companies.Pending_Requests_UC");
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.flxRequestDetails.setVisibility(false);
    this.view.flxRequestsListContainer.setVisibility(true);
    this.view.flxBreadcrumb.setVisibility(true);
    this.view.flxLegalEntityListCont.isVisible = false;
  },
  showAccounts : function(){
    require('TabUtil_FormExtn').tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2],this.view.lblTabName1);
//     this.hideAllTabsDetails();
//     this.view.flxCompanyDetailAccountsContainer.setVisibility(true);
//     this.setDataToAccountsStatusFilter();
    this.view.flxCompanyDetailsFeaturesContainer.isVisible = false  ;
      this.view.flxAccountSegDetails.isVisible = true ;
    this.view.flxButtons.setVisibility(true);
    this.view.forceLayout();
  },
  
  suspendFeatureRequest : function(){
    var self = this;
    var data = this.view.segSuspendedFeature.data;
	var finalList = [];
    for(var i = 0;i<data.length;i++){
      if(data[i].switchSuspend.selectedIndex === 1){
        finalList.push(data[i].featureId);
      }
    }
    var payload = {
      "id": this.completeDetailsData.CompanyContext[0].id,
      "Type": this.completeDetailsData.CompanyContext[0].TypeId,
      "suspendedFeatures": finalList
    };
    var success = function(res){
      var featurePayload = {
        "id": self.completeDetailsData.CompanyContext[0].id
      };
      var featureSuccess = function(res){
        self.completeDetailsData.featuresContext = res;
        self.suspendFeatureHideShow("additional_feature_screen");
      };
      var featureError = function(err){
        kony.print("failed to get company feature", err);
      };
      self.presenter.getCompanyFeatures(featurePayload,featureSuccess,featureError,"frmEnrollmentRequests");
    };
    var error = function(err){
      kony.print("failed to suspend feature", err);
      //show toast
    };
    this.presenter.suspendFeature(payload,success,error,"frmEnrollmentRequests");
  },
  
  showFeatures : function(){
    try{
//       this.tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2,this.view.lblTabName3,
//                                this.view.lblTabName4,this.view.lblTabName5],this.view.lblTabName2);
      require('TabUtil_FormExtn').tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2],this.view.lblTabName2);
      this.view.flxCompanyDetailsFeaturesContainer.isVisible = true ;
      this.view.flxAccountSegDetails.isVisible = false ;
      
      this.view.flxFeaturesTabs.setVisibility(true);
      this.view.flxViewAdditionalFeature.setVisibility(false);
      this.view.flxViewMandatoryFeature.setVisibility(true);
      this.view.flxFeatureSuspensionContainer.setVisibility(false);
      this.view.flxButtons.setVisibility(true);
      this.changeSubTabSkin([this.view.btnMandatoryFeatures,this.view.btnAdditionalFeatures], this.view.btnMandatoryFeatures);      
    
      var self = this;
      var features = this.featureTabData;
      var dataMap = {
        "lblFeatureName": "lblFeatureName",
        "flxViewDetails": "flxViewDetails",
        "lblViewDetails":"lblViewDetails",
        "statusValue":"statusValue",
        "statusIcon":"statusIcon",
        // this is required for suspend features
        "featureData" : "featureData",
        "featureId"  : "featureId",
        "statusId" : "statusId"
      };
      var data = features.map(function(rec){
        var statusInfo = {};
        var featureStatus = rec.featureStatus;
        statusInfo = self.getFeatureStatusAndSkin(featureStatus);
        return{
          "lblFeatureName":rec.featureName,
          "flxViewDetails":{
            "hoverSkin": "sknFlxPointer",
            "onClick" : function(){
              self.fillFeatureDetails(rec);
            }
          },   
          "statusValue":{
            "text":statusInfo.status
          },
          "statusIcon":{
            "skin":statusInfo.statusIconSkin,
            "text":"\ue921"
          },
          "lblViewDetails" : {
            "text":kony.i18n.getLocalizedString("i18n.frmGroupsController.viewDetails")
          },
          // this is required for suspend features
          "featureData" : rec,
          "statusId" : rec.featureStatus,
          "featureId"  : rec.featureId
        };
      });
      var featuresJSON = self.checkForPrimaryFeatures(data);
      self.view.segCompanyMandatoryFeatures.setData(featuresJSON.mandatory);
      self.view.segCompanyFeatures.widgetDataMap = dataMap;
      if(featuresJSON.additional.length <=0){
        self.view.segCompanyFeatures.setData([]);
        self.view.flxNoAdditionalFeatures.setVisibility(true);
        self.view.segCompanyFeatures.setVisibility(false);
        self.view.btnShowSuspendFeature.setVisibility(false);
      }else{
        self.view.segCompanyFeatures.setData(featuresJSON.additional);
        self.view.flxNoAdditionalFeatures.setVisibility(false);
        self.view.segCompanyFeatures.setVisibility(true);
        self.view.btnShowSuspendFeature.setVisibility(true);
      }
      //self.view.segCompanyMandatoryFeatures.setData(featuresJSON.mandatory);
      featuresJSON = {};
      self.view.forceLayout();
    }catch(e){
      alert("err in showfeatures"+e);
    }
  },
  
  getFeatureStatusAndSkin : function(featureStatus){
    var status,statusIconSkin;
    if(featureStatus === "SID_FEATURE_ACTIVE"){
      status = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active");
      statusIconSkin = "sknFontIconActivate";
    }else if(featureStatus === "SID_FEATURE_INACTIVE"){
      status = kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
      statusIconSkin = "sknfontIconInactive";        
    }else if(featureStatus === "SID_FEATURE_UNAVAILABLE"){
      status = kony.i18n.getLocalizedString("i18n.common.Unavailable");
      statusIconSkin = "sknFontIconError";        
    }else if(featureStatus === "SID_FEATURE_SUSPENDED"){
      status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Suspended");
      statusIconSkin = "sknFontIconSuspend";                
    }
    return{
      "status" : status,
      "statusIconSkin" : statusIconSkin
    };
  },
  
  fillFeatureDetails : function(feature){
    var statusInfo = {};
    var featureStatus = feature.status ? feature.status : feature.featureStatus;
    statusInfo = this.getFeatureStatusAndSkin(featureStatus);
    this.view.lblFeatureDetailsHeader2.text=feature.featureName;
    this.view.fontIconActive.skin=statusInfo.statusIconSkin;
    this.view.lblFeatureStatus.text=statusInfo.status;
    this.view.lblFeatureDescriptionValue.text=feature.featureDescription;
    this.setViewFeatureActionsData(feature.Actions);
    this.view.flxFeatureDetails.setVisibility(true);
    this.view.forceLayout();
  },
  
  setViewFeatureActionsData : function(actions){
    var scopeObj = this;
    var actionNo=1;
    if (actions === undefined||actions.length===0) {
      this.view.segActions.setData([]);
    } else {
      var dataMap = {
        "flxFeatureDetailsActions": "flxFeatureDetailsActions",
        "lblActionName":"lblActionName",
        "lblActionDescription":"lblActionDescription",
        "lblSeparator": "lblSeparator"
      };
      var data = actions.map(function(actionRec){
        return{
          "lblActionName":actionRec.actionName,
          "lblActionDescription":actionRec.actionDescription,
          "lblSeparator":"."
        };
      });
      scopeObj.view.segActions.widgetDataMap = dataMap;
      scopeObj.view.segActions.setData(data);
    }
    scopeObj.view.forceLayout();
  },
  
  featureFilter : function(){
    var companyType = this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE;
    var i;
    var temp_features=[];
    this.additional = [];
    this.mandatory = [];
    for(i=0;i<this.allFeatureData.groups.length;i++){
      if(this.allFeatureData.groups[i].groupid === companyType){
        temp_features = this.allFeatureData.groups[i].features;
      }
    }
    for(var j=0;j<temp_features.length;j++){
      if(temp_features[j].isPrimary === "false"){
        this.additional.push(temp_features[j]);
      }
      else if(temp_features[j].isPrimary === "true"){
        this.mandatory.push(temp_features[j]);
      }
    }
  },
  
  checkForPrimaryFeatures : function(data){
    this.featureFilter();
    var allMandatoryFeatures = this.mandatory;
    var mandatory = [] ,additional = [];

    for(var i=0;i<allMandatoryFeatures.length;i++){
      for(var j=0;j<data.length;j++){
        if(allMandatoryFeatures[i].id === data[j].featureId){
          mandatory.push(data[j]);
        }
      }
    }
    additional = this.subtract(data,mandatory);
    return{
      additional : additional,
      mandatory : mandatory
    };
  },
  
  subtract: function(a1,a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    }); 
  },
  
   suspendFeatureHideShow : function(show){
    if(show === "suspend_screen"){
      this.view.flxFeaturesTabs.setVisibility(false);
      this.view.flxViewAdditionalFeature.setVisibility(false);
      this.view.flxViewMandatoryFeature.setVisibility(false);
      this.view.flxFeatureSuspensionContainer.setVisibility(true);
      //var segHeight = this.view.flxCompanyDetails.frame.height -(this.view.flxMainDetails.frame.height +this.view.flxViewTabs.frame.height +200);
      //this.view.flxSegSuspendedContainer.height = (segHeight < 200) ? "200px": segHeight +"px";
      this.view.flxSegSuspendedContainer.height = "200px";
      this.view.flxButtons.setVisibility(false);
      this.setSuspendFeatures();
    }else if (show === "additional_feature_screen"){
      this.view.flxButtons.setVisibility(true);
      this.view.flxFeaturesTabs.setVisibility(true);
      this.view.flxViewAdditionalFeature.setVisibility(true);
      this.view.flxViewMandatoryFeature.setVisibility(false);
      this.view.flxFeatureSuspensionContainer.setVisibility(false);
      this.changeSubTabSkin([this.view.btnMandatoryFeatures,this.view.btnAdditionalFeatures], this.view.btnAdditionalFeatures);
      this.setCompanyFeatures();
    }else if(show === "mandatory_feature_screen"){
      this.view.flxButtons.setVisibility(true);
      this.view.flxFeaturesTabs.setVisibility(true);
      this.view.flxViewAdditionalFeature.setVisibility(false);
      this.view.flxViewMandatoryFeature.setVisibility(true);
      this.view.flxFeatureSuspensionContainer.setVisibility(false);
      this.changeSubTabSkin([this.view.btnMandatoryFeatures,this.view.btnAdditionalFeatures], this.view.btnMandatoryFeatures);      
    }
	this.view.forceLayout();	
  },
  
  setCompanyFeatures: function() {
    var self = this;
    var features = self.completeDetailsData.featuresContext;
    var dataMap = {
      "lblFeatureName": "lblFeatureName",
      "flxViewDetails": "flxViewDetails",
      "lblViewDetails":"lblViewDetails",
      "statusValue":"statusValue",
      "statusIcon":"statusIcon",
      // this is required for suspend features
      "featureData" : "featureData",
      "featureId"  : "featureId",
      "statusId" : "statusId"
    };
    var data = features.map(function(rec){
      var statusInfo = {};
      var featureStatus = rec.featureStatus;
      statusInfo = self.getFeatureStatusAndSkin(featureStatus);
      return{
        "lblFeatureName":rec.featureName,
        "flxViewDetails":{
          "hoverSkin": "sknFlxPointer",
          "onClick" : function(){
            self.fillFeatureDetails(rec);
          }
        },   
        "statusValue":{
          "text":statusInfo.status
        },
        "statusIcon":{
          "skin":statusInfo.statusIconSkin,
          "text":"\ue921"
        },
        "lblViewDetails" : {
          "text":kony.i18n.getLocalizedString("i18n.frmGroupsController.viewDetails")
        },
        // this is required for suspend features
        "featureData" : rec,
        "statusId" : rec.featureStatus,
        "featureId"  : rec.featureId
      };
    });
    var featuresJSON = self.checkForPrimaryFeatures(data);
    self.view.segCompanyFeatures.widgetDataMap = dataMap;
    if(featuresJSON.additional.length <=0){
      self.view.segCompanyFeatures.setData([]);
      self.view.flxNoAdditionalFeatures.setVisibility(true);
      self.view.segCompanyFeatures.setVisibility(false);
      self.view.btnShowSuspendFeature.setVisibility(false);
    }else{
      self.view.segCompanyFeatures.setData(featuresJSON.additional);
      self.view.flxNoAdditionalFeatures.setVisibility(false);
      self.view.segCompanyFeatures.setVisibility(true);
      self.view.btnShowSuspendFeature.setVisibility(true);
    }
    self.view.segCompanyMandatoryFeatures.setData(featuresJSON.mandatory);
    featuresJSON = {};
    self.view.forceLayout();
  },
  
  setSuspendFeatures : function(){
    var self = this;
    var data = this.view.segCompanyFeatures.data;
    data = data.map(self.suspendFeatureMapping);
    var widgetMap = {
      "flxSuspendFeature" : "flxSuspendFeature",
      "flxFeaturesContainer" : "flxFeaturesContainer",
      "flxFeatureUpper" : "flxFeatureUpper",
      "lblFeature" : "lblFeature",
      "flxFeaturesLower" : "flxFeaturesLower",
      "flxViewDetails" : "flxViewDetails",
      "lblViewFeatureDetails" : "lblViewFeatureDetails",
      "switchSuspend" : "switchSuspend"  ,
      "featureId" : "featureId"
    };
    this.view.segSuspendedFeature.widgetDataMap = widgetMap;
    this.view.segSuspendedFeature.setData(data);
    this.setSuspendCount();
    this.view.forceLayout();
  },
  suspendFeatureMapping : function(data){
    var self = this;
    var isSuspended;
    if(data.statusId === "SID_FEATURE_SUSPENDED"){
      isSuspended = 1;
    }else{
      isSuspended = 0;
    }
    return{
      "lblFeature" : data.lblFeatureName,
      "flxViewDetails" : {
        "hoverSkin": "sknFlxPointer",
        "onClick" : function(){
          self.fillFeatureDetails(data.featureData);
        }
      },
      "lblViewFeatureDetails" : "View Details",
      "switchSuspend" : {
        "selectedIndex" : isSuspended,
        "onSlide" : self.setSuspendCount
      },
      "featureId" : data.featureId
    };
  },
  setSuspendCount : function(){
    var data = this.view.segSuspendedFeature.data;
    var count = 0;
    for(var i=0;i<data.length;i++){
      if(data[i].switchSuspend.selectedIndex === 1){
        count++;
      }
    }
    if(count < 10)
      this.view.lblSuspendedFeaturesSelectedCount.text = "0" + count;
    else
      this.view.lblSuspendedFeaturesSelectedCount.text = count;
    this.view.lblSuspendedFeaturesTotalCount.text = "of "+data.length;
    this.view.forceLayout();
  },
    hideAllTabsDetails : function() {
    var self =  this;
    var flexChildrenlength = self.view.flxDetailsContainer.children.length;
    for(var i = 0; i < flexChildrenlength; i++) {
      self.view[self.view.flxDetailsContainer.children[i]].setVisibility(false);
    }
   },
    setDataToAccountsStatusFilter : function(){
    var self = this;
    var statusList=[],maxLenText = "";
    var accountsData = self.completeCompanyDetails.accountContext;
    for(var i=0;i<accountsData.length;i++){
      if(!statusList.contains(accountsData[i].StatusDesc))
        statusList.push(accountsData[i].StatusDesc);
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
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    self.view.flxAccountStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  setHeight : function(){
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxDetailContainer.height=screenHeight-230+"px";
    this.view.flxRequestDetails.height=screenHeight-150+"px";
    this.view.flxRequestsList.height=screenHeight-180+"px";
    this.view.flxRequests.height=screenHeight-320+"px";
  },
  showPendingRequests : function(){
    this.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmCompanies.COMPANIES");
    this.view.breadcrumbs.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.Companies.Pending_Requests_UC");
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.HeaderTabs.lblCount1.text=this.view.HeaderTabs.lblCount1.info.length;
    this.view.HeaderTabs.lblCount2.text= this.view.HeaderTabs.lblCount2.info.length;
    this.RequestsData=this.view.HeaderTabs.lblCount1.info;
    this.view.tbxSearchBox.text="";
    this.view.flxClearSearchImage.setVisibility(false);
    this.view.HeaderTabs.flxHeader1.skin="sknFlxTabSelected1BorderFFFFFF";
    this.view.HeaderTabs.flxHeader1.setEnabled(false);
    this.view.HeaderTabs.flxHeader2.setEnabled(true);
    this.view.HeaderTabs.flxHeader2.skin="sknFlxPointer";
    this.view.HeaderTabs.flxSelected2.setVisibility(false);
    this.view.HeaderTabs.flxSelected.setVisibility(true);
    this.view.flxPendingRequestsHeader.setVisibility(true);
    this.view.flxRejectedRequestsHeader.setVisibility(false);
    this.view.flxSearch.setVisibility(true);
    this.view.flxRequests.setVisibility(true);
    this.view.HeaderTabs.flxseparator.setVisibility(false);
    this.view.flxRequestsList.setVisibility(true);
    this.view.flxBusinessTypesFilter.setVisibility(false);
    this.loadPageData();
    this.view.flxRequestsListContainer.setVisibility(true);
    this.view.flxRequestDetails.setVisibility(false);
    this.view.forceLayout();
  },
  showRejectedLists : function(){
    this.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmCompanies.COMPANIES");
    this.view.breadcrumbs.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.Companies.Rejected_Requests_UC");
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.RequestsData= this.view.HeaderTabs.lblCount2.info;
    this.view.HeaderTabs.flxSelected2.setVisibility(true);
    this.view.HeaderTabs.flxSelected.setVisibility(false);
    this.view.tbxSearchBox.text="";
    this.view.flxClearSearchImage.setVisibility(false);
    this.view.flxPendingRequestsHeader.setVisibility(false);
    this.view.flxRejectedRequestsHeader.setVisibility(true);
    this.view.flxSearch.setVisibility(true);
    this.view.flxRequests.setVisibility(true);
    this.view.HeaderTabs.flxHeader2.setEnabled(false);
    this.view.HeaderTabs.flxHeader1.setEnabled(true);
    this.view.flxBusinessTypesFilter.setVisibility(false);
    this.view.HeaderTabs.flxHeader2.skin="sknFlxTabSelected1BorderFFFFFF";
    this.view.HeaderTabs.flxHeader1.skin="sknFlxPointer";
    this.view.HeaderTabs.flxseparator.setVisibility(true);
    this.view.flxRequestsList.setVisibility(true);
    this.loadPageData();
    this.view.forceLayout();
  },
  setSegRequestsData : function(responseData,isFilter){
    var self=this;
    var data;
    var businessTypeData=[];
    var template=self.view.flxPendingRequestsHeader.isVisible?"flxPendingRequests":"flxRejectedRequests";
    var dataMap = {
      "flxRejectedRequests": "flxRejectedRequests",
      "lblContractId": "lblContractId",
      "lblContractName": "lblContractName",
      "lblRejectedBy": "lblRejectedBy",
      "lblRejectedOn": "lblRejectedOn",
      "lblSeperator": "lblSeperator",
      "lblServices": "lblServices",
      "lblSubmittedOn": "lblSubmittedOn",
      "flxPendingRequests": "flxPendingRequests",
      "lblContractId": "lblContractId",
      "lblContractName": "lblContractName",
      "lblSeperator": "lblSeperator",
      "lblServices": "lblServices",
      "lblSubmittedBy": "lblSubmittedBy",
      "lblSubmittedOn": "lblSubmittedOn"
    };
    if (typeof responseData !== 'undefined' || responseData !== null) {
      if(responseData.length > 0){
        data=responseData.map(function (requestsData) {
          
          return {
            "lblContractId": requestsData.id,
            "lblContractName":{
              "text":requestsData.name
            },
            "lblServices": {
              "text": requestsData.servicedefinitionName?requestsData.servicedefinitionName:"N/A",
            },
            "lblSubmittedOn": {
              "text": requestsData.createdts? self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(requestsData.createdts)):"N/A"
            },
            "lblSubmittedBy":{"text":requestsData.name},
            "lblRejectedBy": {"text":requestsData.rejectedby?requestsData.rejectedby:"N/A"},
            "lblRejectedOn": {"text":requestsData.rejectedts? self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(requestsData.rejectedts)):"N/A"},
            "lblSeperator": ".",
            "rejectedReason": requestsData.rejectedReason?requestsData.rejectedReason:"N/A",
            "serviceType":requestsData.serviceType,
            "template": template
          };

        });
        self.sortBy= self.getObjectSorter("lblSubmittedOn.text");
        self.resetSortImages("companies");
        var sortedData = data.sort(self.sortBy.sortData);
        self.view.segRequests.widgetDataMap = dataMap;
        self.view.segRequests.setData(sortedData);
        this.view.flxNoRecordsToShow.setVisibility(false);
        this.view.flxNoRequestsFound.setVisibility(false);
        this.view.flxRequestsSegment.setVisibility(true);
        this.view.flxSegHeaderSeparator.setVisibility(true);
        this.view.flxRequestsHeader.setVisibility(true);
        if(!isFilter)
          self.setBusinessTypesFilterData(businessTypeData);
        this.view.forceLayout();
      }else{
        if(self.view.tbxSearchBox.text !== ""){
          this.view.lblNoRequestsFound.text=kony.i18n.getLocalizedString("i18n.frmCompanies.NoResultsFound");
          this.view.flxNoRequestsFound.setVisibility(true);
          this.view.flxNoRecordsToShow.setVisibility(false);
          this.view.flxRequestsHeader.setVisibility(false);
          this.view.flxRequestsSegment.setVisibility(false);
          this.view.flxSegHeaderSeparator.setVisibility(false);
          this.view.forceLayout();
        }else{
          this.view.flxNoRecordsToShow.setVisibility(true);
          this.view.flxSearch.setVisibility(false);
          this.view.flxRequests.setVisibility(false);
        }
      }
      this.view.forceLayout();
    }
  },
  getCompanyDetails : function(){
    var selIndex=this.view.segRequests.selectedRowIndex[1];
    var contId=this.view.segRequests.data[selIndex].lblContractId;
    var legalEntityId = this.view.segRequests.info;
    this.presenter.getEnrolledContractDetails({"id":contId, "legalEntityId":legalEntityId});
  },
  showCompanyDetails : function(detailsData){
    this.view.tbxSearchBoxdetAcc.text = "";
    require('TabUtil_FormExtn').tabUtilLabelFunction([this.view.lblTabName1,this.view.lblTabName2],this.view.lblTabName1);
    this.view.flxCompanyDetailsFeaturesContainer.isVisible = false  ;
    this.view.flxAccountSegDetails.isVisible = true ;
    var companyDetails=detailsData.CompanyContext;
    var ownerDetails=detailsData.OwnerContext.contractUsers;
    this.allFeatureData = detailsData.allfeatures;
    this.featureTabData = detailsData.featuresContext;
    this.completeDetailsData = detailsData;
    var selIndex=this.view.segRequests.selectedRowIndex[1];
    var requestData= this.view.segRequests.data[selIndex];
    this.view.lblCompanyDetailName.text=requestData.lblContractName.text;
    this.view.lblViewStatus.text=this.view.breadcrumbs.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.Companies.Pending_Requests_UC")?kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Pending_LC"):kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Rejected");
    this.view.fontIconViewStatus.skin=this.view.breadcrumbs.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.Companies.Pending_Requests_UC")?"sknFontIconSuspend":"sknIconBgE61919S12px";
    // service mapping with detailsData
    // this.view.lblViewBusinessTypeVal.text=requestData.lblBusinessTypes.text;
    this.view.lblViewContractIDValue.text=requestData.lblContractId;
    this.view.lblViewServiceTypeValue.text=requestData.serviceType;
    this.view.lblViewServiceValue.text=requestData.lblServices.text;
    this.view.lblViewSubmittedOnValue.text=requestData.lblSubmittedOn.text;
    this.view.lblViewRejectedOnValue.text=requestData.lblRejectedOn.text;
    this.view.lblViewRejectedByValue.text=requestData.lblRejectedBy.text;
    this.view.lblRejectedReasonValue.text=requestData.rejectedReason;
    ownerDetails[0] = ownerDetails.length > 0 ? ownerDetails[0] : {};
    this.view.lblViewFirstNameVal.text=this.AdminConsoleCommonUtils.getParamValueOrNA(ownerDetails[0].firstName);
    this.view.lblViewLastNameVal.text=this.AdminConsoleCommonUtils.getParamValueOrNA(ownerDetails[0].lastName);
    this.view.lblViewSSNVal.text=this.AdminConsoleCommonUtils.getParamValueOrNA(ownerDetails[0].Ssn);
    if(this.view.lblViewSSNVal.text!=="NA"){
      this.view.lblViewSSNVal.text=this.AdminConsoleCommonUtils.maskSSN(this.view.lblViewSSNVal.text);
    }
    var dob=this.AdminConsoleCommonUtils.getParamValueOrNA(ownerDetails[0].dateOfBirth);
     if(dob!=="NA"){
      var date = dob.split("-");
       dob=date[2]+"-"+date[1]+"-"+date[0];
    }
    this.view.lblViewDOBVal.text=dob;//this.AdminConsoleCommonUtils.getParamValueOrNA(ownerDetails[0].dateOfBirth);
    this.view.lblCustIdValue.text=this.AdminConsoleCommonUtils.getParamValueOrNA(ownerDetails[0].customerId);
    
    this.view.lblArrowIcon.text="";
    this.view.lblArrowIcon.skin="sknfontIconDescRightArrow14px";
    this.view.flxViewUserDetails.setVisibility(false);
    
    // setting accounts
    this.accountsData=detailsData.accountContext;
    this.setCompanyAccounts(detailsData.accountContext);
    this.changeUIBasedOnRequestType();
    this.view.flxRequestDetails.setVisibility(true);
    this.view.flxRequestsListContainer.setVisibility(false);
    
    // this.view.lblViewTINValue.text = this.AdminConsoleCommonUtils.getParamValueOrNA(companyDetails[0].taxId);
    // if(this.view.lblViewTINValue.text !== "N/A")
    //   this.setDataForTaxIdHoverTooltip(this.view.lblViewTINValue.text);
  
    this.view.forceLayout();
  },
  changeUIBasedOnRequestType : function(){
    var selIndex=this.view.segRequests.selectedRowIndex[1];
    var requestData= this.view.segRequests.data[selIndex];
    var screenHeight = kony.os.deviceInfo().screenHeight;
    if(this.view.breadcrumbs.lblCurrentScreen.text===kony.i18n.getLocalizedString("i18n.Companies.Pending_Requests_UC")){
      this.view.flxRow2.setVisibility(true);
      this.view.flxViewRejectedOn.setVisibility(false);
      this.view.flxViewRejectedBy.setVisibility(false);
      this.view.flxButtons.setVisibility(true);
      this.view.flxDetailContainer.height=screenHeight-230+"px";
      this.view.flxViewRejectedReason.setVisibility(false);
    }else{
      this.view.flxRow2.setVisibility(true);
      this.view.flxViewRejectedOn.setVisibility(true);
      this.view.flxViewRejectedBy.setVisibility(true);
      this.view.flxButtons.setVisibility(false);
      this.view.flxDetailContainer.height=screenHeight-150+"px";
      this.view.flxViewRejectedReason.setVisibility(true);
    }
    this.view.breadcrumbs.btnPreviousPage.text=this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.breadcrumbs.lblCurrentScreen.text=requestData.lblContractName.text.toUpperCase();
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.forceLayout();
  },
  /*
   * set data to company accounts 
   */
  setCompanyAccounts : function(accData,isFilter){
    var self=this;
    var statusFilterData=[];
    var accDataMap=accData;
    var accData=this.groupContractAccounts(accData);
    var accountContext = accData ? accData : [];
    if(accountContext && accountContext.length > 0){
      var finalData = accountContext.map(function(res){
        if(!statusFilterData.contains(res.StatusDesc))
          statusFilterData.push(res.StatusDesc);
        //commenting customercentric enhancement flow 
        //return  self.isAccountCentricConfig === true? self.mappingCompanyAccounts(res):self.mappingCompanyAccountsCustomerCentric(res);
        return self.mappingCompanyAccountsCustomerCentric(res);
      });
      var widgetDataMap = {
        "flxCompanyAccounts": "flxCompanyAccounts",
        "flxCompanyDetailsAccounts": "flxCompanyDetailsAccounts",
        "flxStatus": "flxStatus",
        "lblAccountNumber": "lblAccountNumber",
        "lblAccountName":"lblAccountName",
        "lblAccountType":"lblAccountType",
        "lblSeperator": "lblSeperator",
        "fontIconStatus": "fontIconStatus",
        "lblStatus": "lblStatus",
        "flxUnlink" : "flxUnlink",
        "flblUnlink" : "flblUnlink",
        "flxAccountOwner" : "flxAccountOwner",
        "Membership_id":"Membership_id",
        "Status_id":"Status_id"
      };
      this.view.segCompanyDetailAccount.widgetDataMap = widgetDataMap;
      if(!this.isAccountCentricConfig === false){ //for customer centric
        finalData = this.groupAccountsByCIF(finalData,2);
        this.popUpData = finalData;
        var segData = [].concat.apply([], Object.values(finalData));
        this.view.segCompanyDetailAccount.setData(segData);
        this.view.flxCustomerIdPart.setVisibility(true);
        this.view.lblAccountTypeSortIcon.setVisibility(false);
        this.view.lblAccountNameSortIcon.setVisibility(false);
        this.view.lblAccountNumberSortIcon.setVisibility(false);
        this.view.lblAccountTin.setVisibility(false);

        this.view.flxAccountsSegmentPart.left = "18%";
        this.view.flxAccountsSegmentPart.width = "82%";
        this.view.flxAccountType.width = "23%";
        this.view.flxAccountType.left = "35dp";
        this.view.flxAccountName.left = "25%";
        this.view.flxAccountNumber.left="56%";
        this.view.flxStatus.left="83%";
        this.view.flxAccountName.width = "25.5%";
        this.view.flxAccountsSegmentPart.top = "0dp";
       /*commenting customercentric enhancementflow*/
        this.view.flxAccountSegsolepro.setVisibility(true);
        this.view.flxRequestsdetSearch.setVisibility(true);
        this.view.flxCustomerIdPart.setVisibility(false);
        this.view.flxAccountsSegmentPart.setVisibility(false);
        this.originalAccDataArray=finalData;
        this.generateCompanyDetails(finalData);
//         this.view.flxRequestsdetSearch.setVisibility(false);
//         this.view.flxRequestsdetSearchAcc.setVisibility(false);
//         this.generateCustomerIdRows(finalData);

      } else{ 
        // for account centric
        this.view.flxAccountSegsolepro.setVisibility(false);
        this.view.flxRequestsdetSearch.setVisibility(false);
        this.view.flxRequestsdetSearchAcc.setVisibility(false);
        this.view.flxAccountsSegmentPart.setVisibility(true);

        this.view.flxCustomerIdPart.setVisibility(false);
        this.view.lblAccountTypeSortIcon.setVisibility(true);
        this.view.lblAccountNameSortIcon.setVisibility(true);
        this.view.lblAccountNumberSortIcon.setVisibility(true);
        this.view.lblAccountTin.setVisibility(true);
        this.view.flxAccountsSegmentPart.left = "0dp";
        this.view.flxAccountsSegmentPart.width = "100%";
        this.view.flxAccountType.width = "23%";
        this.view.flxAccountType.left = "10dp";
        this.view.flxAccountName.left = "25%";
        this.view.flxAccountNumber.left="53%";
        this.view.flxStatus.left="80%";
        this.view.flxAccountName.width = "26.5%";
        this.searchData = finalData;
        this.view.segCompanyDetailAccount.setData(finalData);
      }
      this.showHideCompanyAccountsData(1);
    } else{
      this.showHideCompanyAccountsData(2);
    }
    if(!isFilter){
      this.setStatusFilterData(statusFilterData);
    }
    this.view.flxAccountStatusFilter.setVisibility(false);
    // this.sortBy = this.getObjectSorter("lblAccountType");
    //this.resetSortImages("accounts");
    //var sortedData = finalData.sort(this.sortBy.sortData);

    this.view.forceLayout();
  },

  changeSubTabSkin : function(list,widget){
    for(var i = 0 ;i< list.length;i++){
      list[i].skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    }
    widget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
  },
  mappingCompanyAccounts : function(data){
    var self = this;
    return{
      "flxCompanyDetailsAccounts": {
        "onHover" : self.onHoverAccountsSeg
      },
      "lblAccountNumber": {
        "text" : data.Account_id ? data.Account_id : "N/A",
        "left":self.isAccountCentricConfig === true ?"53%":"56%"
      },
      "lblAccountType":self.isAccountCentricConfig === true ? 
      {"width":"25%",
       "left":"10dp",
       "text":data.accountType ? data.accountType : "N/A"} :
      {"width":"23%",
       "left":"35dp",
       "text":data.accountType ? data.accountType : "N/A"},
      "lblAccountName":self.isAccountCentricConfig === true ? 
      {"width":"25.5%",
       "left":"25%",
       "text" : data.AccountName ? self.AdminConsoleCommonUtils.getTruncatedString(data.AccountName,30,27) : "N/A"} :
      {"width":"26.5%",
       "left":"25%",
       "text" : data.AccountName ? self.AdminConsoleCommonUtils.getTruncatedString(data.AccountName,25,22) : "N/A"},
      "lblSeperator": ".",
      "fontIconStatus": {
        "skin": data.StatusDesc?data.StatusDesc.toLowerCase() === "active" ? "sknFontIconActivate" : "sknfontIconInactive":"sknFontIconWhite"
      },
      "lblStatus": {
        "text": data.StatusDesc ? data.StatusDesc : "N/A",
        "skin": data.StatusDesc ? data.StatusDesc.toLowerCase() === "active" ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px": "sknlblLato5bc06cBold14px"
      },
      "flxStatus" : {"left":self.isAccountCentricConfig === true ?"80%":"83%"},
      "flxUnlink" : {
        isVisible : false,
      },
      "flblUnlink" : {
        "text" : "\ue974",
        "tooltip": "Unlink"
      },
      "Status_Desc" : data.StatusDesc? data.StatusDesc:"",
      "Status_id": data.Status_id || "",
      "Membership_id":data.Membership_id || "",
      "template": "flxCompanyDetailsAccounts"
    };
  },
  generateCustomerIdRows: function(data){
    var custList = Object.keys(data);
    var newRow ="";
    this.view.flxAccCustomerIdColumn.removeAll();
    for(var i=0;i<custList.length;i++){
      var rowCount = data[custList[i]].length;
      newRow = this.view.flxAccountsCustRow.clone("c"+i);
      newRow.isVisible = true;
      var lblname = "c"+i + "lblCustomerId";
      newRow[lblname].text = custList[i];
      newRow.top = "0px";
      newRow.height = (rowCount*46) +"px";
      this.view.flxAccCustomerIdColumn.addAt(newRow,i);
    } 
    this.view.forceLayout();
  },
  /*
  * show accounts list or no results found based on opt
  * @param: opt - 1/2
  */
  showHideCompanyAccountsData : function(opt){
    if(opt === 1){ //show accounts list
      this.view.flxNoAccountResults.setVisibility(false);
      this.view.segCompanyDetailAccount.setVisibility(true);
      if(this.isAccountCentricConfig === false){ //for customer centric
        this.view.flxAccountCustVerticalLine.setVisibility(true);
        this.view.flxAccCustomerIdColumn.setVisibility(true);
        this.view.segCompanyDetailAccount.setVisibility(true);
      }
    } else if(opt === 2){ //show no record found
      this.view.flxNoAccountResults.setVisibility(true);
      this.view.segCompanyDetailAccount.setVisibility(false);
      if(this.isAccountCentricConfig === false){ //for customer centric
        this.view.flxAccountCustVerticalLine.setVisibility(false);
        this.view.flxAccCustomerIdColumn.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  resetSortImages : function(context){
    var self=this;
    if(context === "accounts"){
      self.sortIconFor('lblAccountType.text', 'lblAccountTypeSortIcon');
      self.sortIconFor('lblAccountName.text', 'lblAccountNameSortIcon');
      self.sortIconFor('lblAccountNumber.text', 'lblAccountNumberSortIcon');
    }else if(context === "companies"){
      if(self.view.flxRejectedRequestsHeader.isVisible){
        self.sortIconFor('lblCompanyName.text', 'lblSortCompanyName2');
        self.sortIconFor('lblSubmittedOn.text', 'lblSubmittedOnSort2');
        self.sortIconFor('lblRejetedOn.text', 'lblRejectedOnSort');
        self.sortIconFor('lblRejectedBy.text', 'lblRejectedBySort');
      }else{
        self.sortIconFor('lblCompanyName.text', 'lblSortCompanyName1');
        self.sortIconFor('lblSubmittedOn.text', 'lblSubmittedOnSort1');
        self.sortIconFor('lblSubmittedBy.text', 'lblSubmittedBySort');
      }
    }
  },
  sortAndSetData : function(segData, sortColumn, context) {
    var self = this;
    self.sortBy.column(sortColumn);
    self.resetSortImages(context);
    return segData.sort(self.sortBy.sortData);
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },
  setDataForTaxIdHoverTooltip : function(data){
    var tinId = data.split(",");
    var tinText ="";
    var remainingTin = [];
    for(var i=0;i< tinId.length;i++){
      if(tinText.concat(tinId[i]).length < 35){
        tinText = tinText + ", "+ tinId[i];
      }else{
        remainingTin.push(tinId[i]);
      }
    }
    this.view.lblViewTINValue.text = tinText.substring(2,tinText.length);
    //set tooltip data
    if(remainingTin.length > 0){
      var widgetMap = {
        "flxMore":"flxMore",
        "lblName":"lblName"
      };
      var segData = remainingTin.map(function(rec){
        return{
          "lblName":rec,
          "template":"flxMore"
        };
      });
      this.view.segTaxId.widgetDataMap=widgetMap;
      this.view.segTaxId.setData(segData);
      this.view.lblDetailsMore.text = "+"+segData.length+" more";
      this.view.lblDetailsMore.setVisibility(true);
    } else{
      this.view.lblDetailsMore.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
   * hover on more text for tax nuber in case of customer centric
   */
  onHoverTaxIdMoreText : function(widget,context){
    if (widget) { 
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        this.view.flxTaxIdTooltip.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        this.view.flxTaxIdTooltip.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  /*
   * groups the accounts based on CIF
   * accounts list
   */
  groupAccountsByCIF : function(accounts,opt){
    var groupedAcc = accounts.reduce(function(group, acc) {
      if(opt === 1){ //for create company accounts
        (group[acc.completeRecord.Membership_id] = group[acc.completeRecord.Membership_id] || []).push(acc);
      } else{ //for company detail accouns
        //(group[acc.Membership_id] = group[acc.Membership_id] || []).push(acc);
        (group[acc.CoreCustomerId] = group[acc.CoreCustomerId] || []).push(acc);
      }
      return group;
    }, {});
    return groupedAcc;
  },
  setBusinessTypesFilterData : function(typesData){
    var self = this;
    var maxSizeText="";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription",
      "type_id" : "type_id"
    };
    var data = typesData.map(function(segData){
      maxSizeText=segData.length>maxSizeText.length?segData:maxSizeText;
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": segData,
        "imgCheckBox":{
          "src":"checkbox.png"
        }
      };
    });

    this.view.BusinessTypesFilterMenu.widgetDataMap = widgetMap;
    this.view.BusinessTypesFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    self.view.BusinessTypesFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    self.view.flxBusinessTypesFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55+"px";
    self.view.forceLayout();
  },
  setStatusFilterData : function(statusData){
    var self = this;
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var data = statusData.map(function(segData){
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": segData,
        "imgCheckBox":{
          "src":"checkbox.png"
        }
      };
    });

    this.view.accountStatusFilterMenu.widgetDataMap = widgetMap;
    this.view.accountStatusFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for(var index = 0; index < data.length; index++){
      indices.push(index);
    }
    self.view.accountStatusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
  },
  searchFilter: function (Company) {
    var searchText = this.view.tbxSearchBox.text;
    if(typeof searchText === 'string' && searchText.length >0){
      return Company.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }else{
      return true;
    }
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
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.accountsData;
    var segStatusData = self.view.accountStatusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.accountStatusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.accountStatusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      self.view.flxNoAccountResults.setVisibility(false);
      self.view.flxAccountsHeader.setVisibility(true);
      if(self.isAccountCentricConfig===false)
        self.view.flxAccCustomerIdHeader.setVisibility(true);
      //all are selected
      if (selInd.length === segStatusData.length) {
        self.setCompanyAccounts(self.accountsData,true);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.Status_Desc) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setCompanyAccounts(dataToShow,true);
        } else {
          self.view.lblNoAccountResults.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          self.view.flxNoAccountResults.setVisibility(true);
          self.view.flxAccountsHeader.setVisibility(true);
          if(self.isAccountCentricConfig===false){
            self.view.flxAccCustomerIdHeader.setVisibility(true);
            self.view.flxAccountCustVerticalLine.setVisibility(true);
          }
          self.view.segCompanyDetailAccount.setData([]);
        }
      }
    } else {
      self.view.lblNoAccountResults.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.flxNoAccountResults.setVisibility(true);
      self.view.flxAccountsHeader.setVisibility(true);
      if(self.isAccountCentricConfig===false){
        self.view.flxAccCustomerIdHeader.setVisibility(true);
        self.view.flxAccountCustVerticalLine.setVisibility(true);
      }
      self.view.segCompanyDetailAccount.setData([]);
    }
  },
  performTypeFilter : function () {
    var self = this;
    var selType = [];
    var selInd;
    var dataToShow = [];
    var allData = self.RequestsData;
    var segStatusData = self.view.BusinessTypesFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.BusinessTypesFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selType.push(self.view.BusinessTypesFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      self.view.flxNoRequestsFound.setVisibility(false);
      if(self.isAccountCentricConfig===false)
        self.view.flxAccCustomerIdHeader.setVisibility(true);
      //all are selected
      if (selInd.length === segStatusData.length) {
        self.setSegRequestsData(self.RequestsData,true);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selType.indexOf(rec.businessType.name) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setSegRequestsData(dataToShow,true);
        } else {
          self.view.lblNoRequestsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          self.view.flxNoRequestsFound.setVisibility(true);
          self.view.flxRequestsHeader.setVisibility(true);
          self.view.segRequests.setData([]);
        }
      }
    } else {
      self.view.lblNoRequestsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.flxNoRequestsFound.setVisibility(true);
      self.view.flxRequestsHeader.setVisibility(true);
      self.view.segRequests.setData([]);
    }
  },
  showAutoApprovalNoti : function(businessConfigData){
    var screenHeight = kony.os.deviceInfo().screenHeight;
    for(var i=0;i<businessConfigData.length;i++){
      if(businessConfigData[i].key==="BUSINESS_ENROLLMENT_AUTO_APPROVAL"){
        this.view.flxRequestsList.height=screenHeight-215+"px";
        this.view.flxRequests.height=screenHeight-340+"px";
        this.view.flxApprovalNotification.setVisibility(businessConfigData[i].value==="0"?false:true);
        break;
      }
    }
    this.view.forceLayout();
  },
  rejectOnClick : function(){
    var selIndex=this.view.segRequests.selectedRowIndex[1];
    var requestData= this.view.segRequests.data[selIndex];
    if(this.view.txtReason.text.trim().length!==0){
      this.view.flxRejectPopUp.setVisibility(false);
      this.presenter.updateContractStatus({
        "companyName":requestData.lblContractName.text,
        "contractId":requestData.lblContractId,
        "statusId":"SID_CONTRACT_REJECTED",
        "rejectedReason":this.view.txtReason.text,
        "rejectedBy":requestData.lblRejectedBy.text
      });
    }else{
      this.view.txtReason.skin="sknTxtError";
      this.view.flxNoReasonError.setVisibility(true);
    }
    this.view.forceLayout();
  },
  generateCompanyDetails:function(data)
  {
    //based on no of company creating segment
    // this.view.segCompanyDetailAccount
    this.searchData=[];
    var scope=this;
    try{
    var custList = Object.keys(data);
    var AccountList=Object.values(data);
    this.view.flxAccountsSegSubsidaryPart.removeAll();
      
    for(var i=0;i<custList.length;i++){
      var rowCount = data[custList[i]].length;
      var segData=AccountList[i];
//       if(i===0)
//         {
//          var newArray=((((AccountList[i].concat(AccountList[i])).concat(AccountList[i])).concat(AccountList[i])).concat(AccountList[i])).concat(AccountList[i]);
//           segData=newArray;
//         }//duplicate array
       
        var id="segId"+i;
        var flexid="flexContainer"+i;
        var flex = new kony.ui.FlexContainer({
          "id": flexid,"top": "10dp","left": "0dp","width": "100%","height": "preferred","zIndex": 1,
          "isVisible": true,"clipBounds": true,"skin": "sknflxfffffborderd7d9e0","layoutType": kony.flex.FREE_FORM,"autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        }, {
          "padding": [0, 0, 0, 0],"margin": [0, 0, 0, 0],"parent": "flxAccountsSegSubsidaryPart",
        }, {});

        var basicConf ={id:id,
                        isVisible:true, 
                        widgetSkin:"seg2Normal", 
                        rowSkin:"seg2Normal", 
                        rowFocusSkin:"seg2Focus", 
                        alternateRowSkin:"seg2Normal", 
                        sectionHeaderSkin:"seg2Normal", 
                        widgetDataMap:{
                          "flxAccountHeader": "flxAccountHeader",
                          "flxAccountHeaderSection":"flxAccountHeaderSection",
                          "flxAccountName": "flxAccountName",
                          "flxAccountNum": "flxAccountNum",
                          "flxAccountType": "flxAccountType",
                          "flxAccounts": "flxAccounts",
                          "flxArrow": "flxArrow",
                          "flxCompany": "flxCompany",
                          "flxCompanyAccounts": "flxCompanyAccounts",
                          "flxCompanyDetailsAccounts": "flxCompanyDetailsAccounts",
                          "flxCompanyDetailsView": "flxCompanyDetailsView",
                          "flxCompanydetails": "flxCompanydetails",
                          "flxCompanyname": "flxCompanyname",
                          "flxCustomerID": "flxCustomerID",
                          "flxAddress": "flxAddress",
                          "flxNumber": "flxNumber",
                          "flxOwnershipType": "flxOwnershipType",
                          "flxPagingContainer": "flxPagingContainer",
                          "flxPagingNumber": "flxPagingNumber",
                          "flxPrevious": "flxPrevious",
                          "flxPreviousfirst": "flxPreviousfirst",
                          "flxPrimary": "flxPrimary",
                          "flxSectionHeader": "flxSectionHeader",
                          "flxSeparator": "flxSeparator",
                          "flxStatus": "flxStatus",
                          "flxTaxID": "flxTaxID",
                          "flxnext": "flxnext",
                          "flxnextLast": "flxnextLast",
                          "flxpageGoContainer": "flxpageGoContainer",
                          "flxpageNocontainer": "flxpageNocontainer",
                          "imgArrow": "imgArrow",
                          "labelOne": "labelOne",
                          "lblAccountCounts": "lblAccountCounts",
                          "lblAccountName": "lblAccountName",
                          "lblAccountNumber": "lblAccountNumber",
                          "lblAccountType": "lblAccountType",
                          "lblAcntNameSorticon": "lblAcntNameSorticon",
                          "lblAcntNumSorticon": "lblAcntNumSorticon",
                          "lblAcntOwnershipSorticon": "lblAcntOwnershipSorticon",
                          "lblAcntTypeSorticon": "lblAcntTypeSorticon",
                          "lblCompanyName": "lblCompanyName",
                          "lblCustomerID": "lblCustomerID",
                          "lblCustomerIDVal": "lblCustomerIDVal",
                          "lblAddressTitle": "lblAddressTitle",
                          "lblAddressVal": "lblAddressVal",
                          "lblOwnershipType": "lblOwnershipType",
                          "lblPageCount": "lblPageCount",
                          "lblPageGo": "lblPageGo",
                          "lblPrimary": "lblPrimary",
                          "lblSeperator": "lblSeperator",
                          "lblShowing": "lblShowing",
                          "lblStatus": "lblStatus",
                          "lblStatusSorticon": "lblStatusSorticon",
                          "lblStatusicon": "lblStatusicon",
                          "lblTaxiDTitle": "lblTaxiDTitle",
                          "lblTaxiDValue": "lblTaxiDValue",
                          "lblarrowNext": "lblarrowNext",
                          "lblarrowNextLast": "lblarrowNextLast",
                          "lblarrowprevfirst": "lblarrowprevfirst",
                          "lblarrowprevious": "lblarrowprevious",
                          "lblsegId": "lblsegId",
                          "textpageNo": "textpageNo",
                          "txtPageGo": "txtPageGo"
                        },
                        rowTemplate:"flxAccountHeader",
                        sectionHeaderTemplate:"flxCompanydetails",
                        "retaincontentalignment": false,
                        "retainflexpositionproperties": false,
                        "retainselection": false,
                        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                        "layoutType": kony.flex.FREE_FORM,

                       };

        var layoutConf ={padding:[0,0,0,0],margin:[0,0,0,0],containerweight: 100, hasSections: true,height:"preferred",indicator: "none",
                         left: "0dp",orientation: 2,right:"0dp",top: "0dp",
                        };

        var pspConf ={border:constants.SEGUI_BORDER_NONE, 
                      defaultSelection:true};

        var segment1 = new kony.ui.SegmentedUI2(basicConf, layoutConf, pspConf);
        this.view.flxAccountsSegSubsidaryPart.add(flex);
        if(i===0) this.view[flexid].top="80dp";
        this.view[flexid].add(segment1);   
        var segHeader = {
          "imgArrow": {
            "src": "img_desc_arrow.png"
          },
          "lblAccountName": {
            "text": "ACCOUNT NAME"
          },
          "lblAccountNumber": {
            "text": "ACCOUNT NUMBER"
          },
          "lblAccountType": {
            "text": "ACCOUNT TYPE"
          },
          "lblCompanyName": {
            "text": segData[0].lblCompanyName.text
          },
          "lblCustomerID": {
            "text": "CUSTOMER ID"
          },
          "lblCustomerIDVal": {
            "text": segData[0].lblCustomerIDVal.text
          },
          "lblOwnershipType":{
            "text":"OWNERSHIP TYPE"
          },
          "lblAcntNameSorticon": {
            "text": ""
          },
          "lblAcntNumSorticon": {
            "text": ""
          },
          "lblAcntOwnershipSorticon": {
            "text": ""
          },
          "lblAcntTypeSorticon": {
            "text": ""
          },
          "lblAddressTitle": {
            "text": "ADDRESS"
          },
          "lblAddressVal":{
            "text": segData[0].Address
          },
          "lblAccountCounts": {
            "text": "Accounts"+"  ("+rowCount+") "
          },
          "lblSeperator": {
            "text": "."
          },
          "lblStatus": {
            "text": "STATUS"
          },
          "lblTaxiDTitle": {
            "text": "TAX ID"
          },
          "lblTaxiDValue": {
            "text": segData[0].lblTaxiDValue.text
          },
           "flxPrimary":{
            "isVisible":segData[0].isPrimary?segData[0].isPrimary:false
          },
          "lblPrimary":{
            "text":"Primary"
          },
            "flxAccounts":{
              "isVisible":true
            },
          "flxAccountHeaderSection":{"isVisible":false},
          "flxArrow": {
            "onClick" : function(eventobject, context) {
              var id = context.widgetInfo.id;
              var segData = scope.view[id].data;
              var sectionData = segData[context.sectionIndex];
              var updateParams = {
                "imgArrow" : {"src" : "img_down_arrow.png"},
                "flxAccountHeader":{"isVisible":true},
                "flxAccountHeaderSection":{"isVisible" : true},
              };
              var updateCollapseParams = {
                "imgArrow" : {"src" : "img_desc_arrow.png"},
                "flxAccountHeader" : {"isVisible" : false},
                "flxAccountHeaderSection":{"isVisible" : false},
              };
              if(sectionData[0].imgArrow.src === "img_desc_arrow.png") {
                this.expandAccountDetails(context, updateParams, updateCollapseParams);
                //                   scope.view.TabBodyAccountWiseFeatures.addRowsAndUpdateSection(scope.getFeaturesDataForSelectedAccount(accounts, context.sectionIndex), context.sectionIndex, updateParams, updateCollapseParams);
                //                   scope.view.TabBodyAccountWiseOtherFeatures.collapseSection(updateCollapseParams);
                //                   scope.view.TabBodyNewAccountCollapsibleList.collapseSection(updateCollapseParams);
              }
              else {
                this.collapseAccountDetails(context, updateParams, updateParams)
                //scope.view.TabBodyAccountWiseFeatures.collapseSection(updateCollapseParams);
              }
            }.bind(this)
          },
          "segID":id,
          "data":segData,
        };
     
      //calculate data for pagination
      var pageNo=0;
      var resultData=segData;
      var lengthVal=resultData.length/10;
      var num= Math.floor(lengthVal); 
      var rem=resultData.length%10;
      if(rem!==0){
        pageNo=num+1; 
      }
      else{
        pageNo=num;
      }
      var splicedata=JSON.parse(JSON.stringify( resultData)); 
      var pageData;
      if(resultData.length>10)
      {
        pageData=splicedata.splice(0,10);
      }
      else 
        pageData=segData;
      if(segData.length>10)
      {
        var maxlength=pageData.length-1;
        pageData[maxlength].flxPreviousfirst.isVisible=false;
        pageData[maxlength].flxPrevious.isVisible=false;
        pageData[maxlength].flxnext.isVisible=true;
        pageData[maxlength].flxnextLast.isVisible=true;
        pageData[maxlength].lblsegId.text=id;
        pageData[maxlength].lblPageCount.text=pageNo;
        pageData[pageData.length-1].flxPreviousfirst.onClick=this.onArrowPrevfirstClick;
        pageData[pageData.length-1].flxPrevious.onClick=this.onArrowPrevClick;
        pageData[pageData.length-1].flxnext.onClick=this.onArrowNextClick;
        pageData[pageData.length-1].flxnextLast.onClick=this.onArrowNextLastClick;
        pageData[pageData.length-1].flxpageGoContainer.onClick=this.goPageOnclick;
        pageData[maxlength].lblShowing.text = "Showing 1 - 10 Of "+segData.length;
        pageData[maxlength].labelOne.text = "1";
        pageData[maxlength].flxPagingContainer.isVisible=true;
      }

        var  segRowData = pageData; //segData;
        var segDataModel = [
          [segHeader, segRowData]
        ];

        this.view[id].setData(segDataModel);
        this.searchData.push(segDataModel);
        this.view.forceLayout();

      }
    }catch(err)
    {
      kony.print("error"+err);
    }

    },
      mappingCompanyAccountsCustomerCentric : function(data){
        var self = this;
       var isPrimary= data.isPrimary;
        if(isPrimary=="true") 
          data.isPrimary=true;
        else data.isPrimary=false;
        return{
          "lblAccountNumber": {
            "text" : data.accountId ? data.accountId : "N/A",
          },
          "lblAccountType":
          {
            "text":data.accountType ? data.accountType : "N/A"},
          "lblAccountName":
          {
            "text" : data.accountName ? self.AdminConsoleCommonUtils.getTruncatedString(data.accountName,25,22) : "N/A"},
          "lblStatus": {
            "text": data.statusDesc ? data.statusDesc : "N/A",
            "skin": data.statusDesc ? data.statusDesc.toLowerCase() === "active" ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px": "sknlblLato5bc06cBold14px"
          },
          "lblSeperator": {
            "text": "."
          },
          "lblStatusicon": {
            "text": ""
          },
          "Status_Desc" : data.statusDesc? data.statusDesc:"",
          "Status_id": data.Status_id || "",
          "isPrimary":data.isPrimary?data.isPrimary:"",
          "Membership_id":data.coreCustomerId || "",
          "CoreCustomerId":data.coreCustomerId|| "",
          "Address":data.addressLine1 ? data.addressLine1 : "N/A",
          "lblTaxiDValue":{"text" :data.taxId ? data.taxId : "N/A"},
          "lblCompanyName":{ "text": data.coreCustomerName ? data.coreCustomerName : "N/A"},
          "lblCustomerIDVal":{"text": data.coreCustomerId ? data.coreCustomerId : "N/A"},
          "lblOwnershipType":{"text":data.ownerType ?data.ownerType:"NA"},
          "lblShowing": {"text": "Showing 1-10 of 95" },
          "textpageNo": {"text": "01" },
          "lblPageGo": { "text": "GO"},
          "lblarrowNext": {
            "text":kony.i18n.getLocalizedString("i18n.enrollrequest.fontnext")
          },
          "lblarrowprevious": {
            "text":kony.i18n.getLocalizedString("i18n.enrollrequest.fontprevious")
          },
          "lblarrowNextLast": {
            "text":kony.i18n.getLocalizedString("i18n.enrollrequest.fontnextLast")
          },
          "lblarrowprevfirst": {
            "text":kony.i18n.getLocalizedString("i18n.enrollrequest.fontpreviousfirst")
          },
          "labelOne": {"text": "1"},
          "flxPagingContainer":{"isVisible":false},
          "flxnext": {
            "onClick" :this.onArrowNextClick,
            "isVisible":true
          },
          "flxnextLast": {
           "onClick" : this.onArrowNextLastClick,
            "isVisible":true
          },
          "flxPrevious": {
            "onClick" : this.onArrowPrevClick,
            "isVisible":true
          },
          "flxPreviousfirst": {
            "onClick" : this.onArrowPrevfirstClick,
            "isVisible":true
          },
          "flxpageGoContainer":{
          "onClick":this.goPageOnclick
        },
          "lblsegId": {text:"lblsegId"},
          "lblPageCount": {text:"lblPageCount"},
          "flxAccountHeader":{"isVisible":false},
  
    };
  },
  onRowClickCallBck:function(seguiWidget, sectionNumber, rowNumber, selectedState)
  {
   // alert(sectionNumber+"======"+rowNumber+"======"+selectedState);
  },
  searchAccountsDataCustomerCentric: function(){
    var searchText = this.view.tbxSearchBoxdet.text;
    //var headerarray=this.view.
    var finalArr = [];
    var accountArray=[];
    if(searchText === ""){
      this.generateCompanyDetails(this.originalAccDataArray);
      return;
    }
    for (var i = 0; i < this.searchData.length; i++){
      var rowItems = this.searchData[i][0][1];
      var headerItem = this.searchData[i][0][0];
      var rowitem=[];
      if(headerItem.lblCompanyName.text.includes(searchText)||headerItem.lblCustomerIDVal.text.includes(searchText)){
        if(!(finalArr.includes(this.searchData[i])))
          finalArr.push(this.searchData[i]);
      }
      else
      {
        for(var j=0;j<rowItems.length;j++)
        {
          if(rowItems[j].lblAccountNumber.text.includes(searchText)){
            if(!(finalArr.includes(this.searchData[i])))
            {
              rowItems[j].flxPagingContainer.isVisible=false; 
              rowitem.push(rowItems[j]);
            }
          }
        }
        if(rowitem.length>0)
        {
          accountArray.push([headerItem,rowitem]);
          finalArr.push(accountArray);
        }
      }
    }
    if(finalArr.length>0) 
      this.generateSearchData(finalArr);
    this.view.forceLayout();

  },
  
  generateSearchData:function(data)
  {
    this.view.flxAccountsSegSubsidaryPart.removeAll();
    for(var i=0;i<data.length;i++){
        var id="segId"+i;
        var flexid="flexContainer"+i;
        var flex = new kony.ui.FlexContainer({
          "id": flexid,"top": "10dp","left": "0dp","width": "100%","height": "preferred","zIndex": 1,"isVisible": true,
          "clipBounds": true,"skin": "sknflxfffffborderd7d9e0","layoutType": kony.flex.FREE_FORM,"autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        }, {
          "padding": [0, 0, 0, 0],"margin": [0, 0, 0, 0],"parent": "flxAccountsSegSubsidaryPart",
        }, {});

        var basicConf ={id:id,
                        isVisible:true, 
                        widgetSkin:"seg2Normal", 
                        rowSkin:"seg2Normal", 
                        rowFocusSkin:"seg2Focus", 
                        alternateRowSkin:"seg2Normal", 
                        sectionHeaderSkin:"seg2Normal", 
                        widgetDataMap:{
                          "flxAccountHeader": "flxAccountHeader",
                          "flxAccountHeaderSection": "flxAccountHeaderSection",
                          "flxAccountName": "flxAccountName",
                          "flxAccountNum": "flxAccountNum",
                          "flxAccountType": "flxAccountType",
                          "flxAccounts": "flxAccounts",
                          "flxAddress": "flxAddress",
                          "flxArrow": "flxArrow",
                          "flxCompany": "flxCompany",
                          "flxCompanyAccounts": "flxCompanyAccounts",
                          "flxCompanyDetailsAccounts": "flxCompanyDetailsAccounts",
                          "flxCompanyDetailsView": "flxCompanyDetailsView",
                          "flxCompanydetails": "flxCompanydetails",
                          "flxCompanyname": "flxCompanyname",
                          "flxCustomerID": "flxCustomerID",
                          "flxNumber": "flxNumber",
                          "flxOwnershipType": "flxOwnershipType",
                          "flxPagingContainer": "flxPagingContainer",
                          "flxPagingNumber": "flxPagingNumber",
                          "flxPrevious": "flxPrevious",
                          "flxPreviousfirst": "flxPreviousfirst",
                          "flxPrimary": "flxPrimary",
                          "flxSectionHeader": "flxSectionHeader",
                          "flxSeparator": "flxSeparator",
                          "flxStatus": "flxStatus",
                          "flxTaxID": "flxTaxID",
                          "flxnext": "flxnext",
                          "flxnextLast": "flxnextLast",
                          "flxpageGoContainer": "flxpageGoContainer",
                          "flxpageNocontainer": "flxpageNocontainer",
                          "imgArrow": "imgArrow",
                          "labelOne": "labelOne",
                          "lblAccountCounts": "lblAccountCounts",
                          "lblAccountName": "lblAccountName",
                          "lblAccountNumber": "lblAccountNumber",
                          "lblAccountType": "lblAccountType",
                          "lblAcntNameSorticon": "lblAcntNameSorticon",
                          "lblAcntNumSorticon": "lblAcntNumSorticon",
                          "lblAcntOwnershipSorticon": "lblAcntOwnershipSorticon",
                          "lblAcntTypeSorticon": "lblAcntTypeSorticon",
                          "lblAddressTitle": "lblAddressTitle",
                          "lblAddressVal": "lblAddressVal",
                          "lblCompanyName": "lblCompanyName",
                          "lblCustomerID": "lblCustomerID",
                          "lblCustomerIDVal": "lblCustomerIDVal",
                          "lblOwnershipType": "lblOwnershipType",
                          "lblPageCount": "lblPageCount",
                          "lblPageGo": "lblPageGo",
                          "lblPrimary": "lblPrimary",
                          "lblSeperator": "lblSeperator",
                          "lblShowing": "lblShowing",
                          "lblStatus": "lblStatus",
                          "lblStatusSorticon": "lblStatusSorticon",
                          "lblStatusicon": "lblStatusicon",
                          "lblTaxiDTitle": "lblTaxiDTitle",
                          "lblTaxiDValue": "lblTaxiDValue",
                          "lblarrowNext": "lblarrowNext",
                          "lblarrowNextLast": "lblarrowNextLast",
                          "lblarrowprevfirst": "lblarrowprevfirst",
                          "lblarrowprevious": "lblarrowprevious",
                          "lblsegId": "lblsegId",
                          "textpageNo": "textpageNo",
                          "txtPageGo": "txtPageGo"
                        }, 
                        rowTemplate:"flxAccountHeader",
                        sectionHeaderTemplate:"flxCompanydetails",
                        "retaincontentalignment": false,
                        "retainflexpositionproperties": false,
                        "retainselection": false,
                        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                        "viewType": constants.SEGUI_VIEW_TYPE_TABLEVIEW,
                        "layoutType": kony.flex.FREE_FORM,

                       };

        var layoutConf ={padding:[0,0,0,0],margin:[0,0,0,0],containerweight: 100,hasSections: true,
                         height:"preferred",indicator: "none",left: "0dp",orientation: 2,right:"0dp",top: "0dp",
                        };

        var pspConf ={border:constants.SEGUI_BORDER_NONE, 
                      defaultSelection:true};

        var segment1 = new kony.ui.SegmentedUI2(basicConf, layoutConf, pspConf);
        this.view.flxAccountsSegSubsidaryPart.add(flex);
        if(i===0) this.view[flexid].top="80dp";
        this.view[flexid].add(segment1); 
        this.view[id].setData(data[i]);
        this.view.forceLayout();

  }
  },
  clearSearchDataCustomer:function()
  {
    this.view.tbxSearchBoxdet.text = "";
    this.generateCompanyDetails(this.originalAccDataArray);
  },
  setPopupArray:function()
  {
    var dataMap = this.dataMap();
    var popUpData = this.popUpData;
    var data = Object.values(popUpData).map(function(actionRec){
      return{
        "lblCompanyName":actionRec[0].lblCompanyName.text,
        "lblBusinessTypes":actionRec[0].lblCustomerIDVal.text,
        "lblSubmittedOn":actionRec[0].lblTaxiDValue.text,
        "lblSubmittedBy":actionRec.length,
        "lblSeperator":"."
      };
    });
    this.view.segSubViews.widgetDataMap = dataMap;
    this.view.segSubViews.setData(data); 
  },
  
  onArrowNextClick:function(segWidget,sectionNumber,rowindex,selectedstate)
  {
    var pageData1="";
    var scope=this;
    var segid=segWidget.containerId;
    var splicedata=[];
    var rowData=this.view[segid].selectedRowItems[0];
    var data=this.view[segid].data;
    var resultData=data[0][0].data;
    var headerData=data[0][0];
    var currentpage=Number(rowData.labelOne.text);
    var totalpageCount=Number(rowData.lblPageCount.text);
    var pageCount=0;
    pageCount=currentpage+1;
    splicedata=JSON.parse(JSON.stringify( resultData )); 
    if(pageCount > 1)
    {
      pageData1=splicedata.splice(((pageCount-1)*10),10);
    }
    else
      pageData1=splicedata.splice(0,10);
    if(pageCount === totalpageCount)
    {
      pageData1[pageData1.length-1].flxPreviousfirst.isVisible=true;
      pageData1[pageData1.length-1].flxPrevious.isVisible=true;
      pageData1[pageData1.length-1].flxnext.isVisible=false;
      pageData1[pageData1.length-1].flxnextLast.isVisible=false;
      pageData1[pageData1.length-1].labelOne.text =totalpageCount;
      pageData1[pageData1.length-1].lblPageCount.text =totalpageCount;
    }
    else
    {
      pageData1[pageData1.length-1].flxPreviousfirst.isVisible=true;
      pageData1[pageData1.length-1].flxPrevious.isVisible=true;
      pageData1[pageData1.length-1].flxnext.isVisible=true;
      pageData1[pageData1.length-1].flxnextLast.isVisible=true;
      pageData1[pageData1.length-1].labelOne.text =pageCount;
      pageData1[pageData1.length-1].lblPageCount.text =totalpageCount;
    }
    pageData1[pageData1.length-1].flxPagingContainer.isVisible=true;
    pageData1[pageData1.length-1].flxPreviousfirst.onClick=this.onArrowPrevfirstClick;
    pageData1[pageData1.length-1].flxPrevious.onClick=this.onArrowPrevClick;
    pageData1[pageData1.length-1].flxnext.onClick=this.onArrowNextClick;
    pageData1[pageData1.length-1].flxnextLast.onClick=this.onArrowNextLastClick;
    var countVal=(pageCount-1)*10;
    pageData1[pageData1.length-1].lblShowing.text = "Showing"+" "+countVal+" - "+ (countVal+10) +" " +"Of " +resultData.length;
    var segRowDat=[[headerData,pageData1]];
    this.view[segid].widgetDataMap =this.datawidgetMap();
    this.view[segid].setData(segRowDat);

  },
  onArrowNextLastClick:function(segWidget,sectionNumber,rowindex,selectedstate)
  {
    var pageData1="";
    var scope=this;
    var splicedata=[];
    var segid=segWidget.containerId;
    var rowData=this.view[segid].selectedRowItems[0];
    var data=this.view[segid].data;
    var resultData=data[0][0].data;
    var headerData=data[0][0];
    var currentpage=Number(rowData.labelOne.text);
    var totalpageCount=Number(rowData.lblPageCount.text)-1;
    var pageCount=0;
    pageCount=currentpage+1;
    splicedata=JSON.parse(JSON.stringify( resultData )); 
    pageData1=splicedata.splice(((totalpageCount)*10),10);
    pageData1[pageData1.length-1].flxPreviousfirst.isVisible=true;
    pageData1[pageData1.length-1].flxPrevious.isVisible=true;
    pageData1[pageData1.length-1].flxnext.isVisible=false;
    pageData1[pageData1.length-1].flxnextLast.isVisible=false;
    pageData1[pageData1.length-1].lblShowing.text = "Showing "+(totalpageCount)*10 +"  -  " + ((totalpageCount*10)+10)+" "+ "Of " +resultData.length;
    pageData1[pageData1.length-1].labelOne.text =totalpageCount+1;
    pageData1[pageData1.length-1].lblPageCount.text =totalpageCount+1;
    pageData1[pageData1.length-1].flxPagingContainer.isVisible=true;
    pageData1[pageData1.length-1].flxPreviousfirst.onClick=this.onArrowPrevfirstClick;
    pageData1[pageData1.length-1].flxPrevious.onClick=this.onArrowPrevClick;
    pageData1[pageData1.length-1].flxnext.onClick=this.onArrowNextClick;
    pageData1[pageData1.length-1].flxnextLast.onClick=this.onArrowNextLastClick;
    pageData1[pageData1.length-1].flxpageGoContainer.onClick=this.goPageOnclick;
    var segRowDat=[
      [headerData,pageData1]];
    this.view[segid].widgetDataMap=this.datawidgetMap();
    this.view[segid].setData(segRowDat);

  },
  onArrowPrevClick:function(segWidget,sectionNumber,rowindex,selectedstate)
  {
    var scope=this;
    var pageData2="";
    var splicedata=[];
    var segid=segWidget.containerId;
    var rowData=this.view[segid].selectedRowItems[0];
    var data=this.view[segid].data;
    var resultData=data[0][0].data;
    var headerData=data[0][0];
    var currentpage=Number(rowData.labelOne.text);
    var totalpageCount=Number(rowData.lblPageCount.text);    
    var pageCount=0;   
    pageCount=currentpage-1;
    var countVal=(pageCount-1)*10;
    splicedata=JSON.parse(JSON.stringify( resultData )); 
    if(pageCount > 1){
      pageData2=splicedata.splice(((pageCount-1)*10),10);
      pageData2[pageData2.length-1].lblShowing.text ="Showing "+" "+countVal +" - "+ (countVal+10) +" "+"Of " +resultData.length;
      pageData2[pageData2.length-1].flxPreviousfirst.isVisible=true;
      pageData2[pageData2.length-1].flxPrevious.isVisible=true;
      pageData2[pageData2.length-1].flxnext.isVisible=true;
      pageData2[pageData2.length-1].flxnextLast.isVisible=true;
      pageData2[pageData2.length-1].lblPageCount.text =totalpageCount;
      pageData2[pageData2.length-1].labelOne.text =pageCount;
    }

    else
    { 
      pageData2=splicedata.splice(0,10);
      pageData2[pageData2.length-1].lblShowing.text = "Showing 1 - 10 Of " +resultData.length;
      pageData2[pageData2.length-1].flxPreviousfirst.isVisible=false;
      pageData2[pageData2.length-1].flxPrevious.isVisible=false;
      pageData2[pageData2.length-1].flxnext.isVisible=true;
      pageData2[pageData2.length-1].flxnextLast.isVisible=true;
      pageData2[pageData2.length-1].lblPageCount.text =totalpageCount;
      pageData2[pageData2.length-1].labelOne.text ="1";
    }
    pageData2[pageData2.length-1].flxPagingContainer.isVisible=true;
    pageData2[pageData2.length-1].flxPreviousfirst.onClick=this.onArrowPrevfirstClick;
    pageData2[pageData2.length-1].flxPrevious.onClick=this.onArrowPrevClick;
    pageData2[pageData2.length-1].flxnext.onClick=this.onArrowNextClick;
    pageData2[pageData2.length-1].flxnextLast.onClick=this.onArrowNextLastClick;
    pageData2[pageData2.length-1].flxpageGoContainer.onClick=this.goPageOnclick;
    var segRow=[[headerData,pageData2]];
    this.view[segid].widgetDataMap=this.datawidgetMap();
    this.view[segid].setData(segRow);

  },
   onArrowPrevfirstClick:function(segWidget,sectionNumber,rowindex,selectedstate)
  {
    var scope=this;
    var pageData2="";
    var splicedata=[];
    var segid=segWidget.containerId;
    var rowData=this.view[segid].selectedRowItems[0];
    var data=this.view[segid].data;
    var resultData=data[0][0].data;
    var headerData=data[0][0];
    var totalpageCount=Number(rowData.lblPageCount.text);    
    splicedata=JSON.parse(JSON.stringify( resultData ));
    pageData2=splicedata.splice(0,10);
    pageData2[pageData2.length-1].flxPreviousfirst.isVisible=false;
    pageData2[pageData2.length-1].flxPrevious.isVisible=false;
    pageData2[pageData2.length-1].flxnext.isVisible=true;
    pageData2[pageData2.length-1].flxnextLast.isVisible=true;
    pageData2[pageData2.length-1].lblPageCount.text =totalpageCount;
    pageData2[pageData2.length-1].labelOne.text ="1";
    pageData2[pageData2.length-1].lblShowing.text = "Showing 1 - 10 Of " +resultData.length;
    pageData2[pageData2.length-1].flxPagingContainer.isVisible=true;
    pageData2[pageData2.length-1].flxPreviousfirst.onClick=this.onArrowPrevfirstClick;
    pageData2[pageData2.length-1].flxPrevious.onClick=this.onArrowPrevClick;
    pageData2[pageData2.length-1].flxnext.onClick=this.onArrowNextClick;
    pageData2[pageData2.length-1].flxnextLast.onClick=this.onArrowNextLastClick;
    pageData2[pageData2.length-1].flxpageGoContainer.onClick=this.goPageOnclick;
    var segRow=[[headerData,pageData2]];
    this.view[segid].widgetDataMap=this.datawidgetMap();
    this.view[segid].setData(segRow);

  },
  datawidgetMap:function()
  {
    var widgetmap= {
        "flxAccountHeader": "flxAccountHeader",
       "flxAccountHeaderSection": "flxAccountHeaderSection",
        "flxAccountName": "flxAccountName",
        "flxAccountNum": "flxAccountNum",
        "flxAccountType": "flxAccountType",
        "flxAccounts": "flxAccounts",
        "flxAddress": "flxAddress",
        "flxArrow": "flxArrow",
        "flxCompany": "flxCompany",
        "flxCompanyAccounts": "flxCompanyAccounts",
        "flxCompanyDetailsAccounts": "flxCompanyDetailsAccounts",
        "flxCompanyDetailsView": "flxCompanyDetailsView",
        "flxCompanydetails": "flxCompanydetails",
        "flxCompanyname": "flxCompanyname",
        "flxCustomerID": "flxCustomerID",
        "flxNumber": "flxNumber",
        "flxOwnershipType": "flxOwnershipType",
        "flxPagingContainer": "flxPagingContainer",
        "flxPagingNumber": "flxPagingNumber",
        "flxPrevious": "flxPrevious",
        "flxPreviousfirst": "flxPreviousfirst",
        "flxPrimary": "flxPrimary",
        "flxSectionHeader": "flxSectionHeader",
        "flxSeparator": "flxSeparator",
        "flxStatus": "flxStatus",
        "flxTaxID": "flxTaxID",
        "flxnext": "flxnext",
        "flxnextLast": "flxnextLast",
        "flxpageGoContainer": "flxpageGoContainer",
        "flxpageNocontainer": "flxpageNocontainer",
        "imgArrow": "imgArrow",
        "labelOne": "labelOne",
        "lblAccountCounts": "lblAccountCounts",
        "lblAccountName": "lblAccountName",
        "lblAccountNumber": "lblAccountNumber",
        "lblAccountType": "lblAccountType",
        "lblAcntNameSorticon": "lblAcntNameSorticon",
        "lblAcntNumSorticon": "lblAcntNumSorticon",
        "lblAcntOwnershipSorticon": "lblAcntOwnershipSorticon",
        "lblAcntTypeSorticon": "lblAcntTypeSorticon",
        "lblAddressTitle": "lblAddressTitle",
        "lblAddressVal": "lblAddressVal",
        "lblCompanyName": "lblCompanyName",
        "lblCustomerID": "lblCustomerID",
        "lblCustomerIDVal": "lblCustomerIDVal",
        "lblOwnershipType": "lblOwnershipType",
        "lblPageCount": "lblPageCount",
        "lblPageGo": "lblPageGo",
        "lblPrimary": "lblPrimary",
        "lblSeperator": "lblSeperator",
        "lblShowing": "lblShowing",
        "lblStatus": "lblStatus",
        "lblStatusSorticon": "lblStatusSorticon",
        "lblStatusicon": "lblStatusicon",
        "lblTaxiDTitle": "lblTaxiDTitle",
        "lblTaxiDValue": "lblTaxiDValue",
        "lblarrowNext": "lblarrowNext",
        "lblarrowNextLast": "lblarrowNextLast",
        "lblarrowprevfirst": "lblarrowprevfirst",
        "lblarrowprevious": "lblarrowprevious",
        "lblsegId": "lblsegId",
        "textpageNo": "textpageNo",
        "txtPageGo": "txtPageGo"
    };
    return widgetmap;
  },
  goPageOnclick:function(segWidget)
  {
     var pageData1="";
    var scope=this;
    var segid=segWidget.containerId;
    var splicedata=[];
    var rowData=this.view[segid].selectedRowItems[0];
    var data=this.view[segid].data;
    var resultData=data[0][0].data;
    var headerData=data[0][0];
    var textPageNo=Number(rowData.textpageNo.text);
    var totalpageCount=Number(rowData.lblPageCount.text);
    var pageCount=0;
    pageCount=textPageNo;
    splicedata=JSON.parse(JSON.stringify( resultData )); 
    if(pageCount > 1)
    {
      pageData1=splicedata.splice(((pageCount-1)*10),10);
    }
    else
      pageData1=splicedata.splice(0,10);
    if(pageCount === totalpageCount)
    {
      pageData1[pageData1.length-1].flxPreviousfirst.isVisible=true;
      pageData1[pageData1.length-1].flxPrevious.isVisible=true;
      pageData1[pageData1.length-1].flxnext.isVisible=false;
      pageData1[pageData1.length-1].flxnextLast.isVisible=false;
      pageData1[pageData1.length-1].labelOne.text =totalpageCount;
      pageData1[pageData1.length-1].lblPageCount.text =totalpageCount;
    }
    else if(pageCount>1)
    {
      pageData1[pageData1.length-1].flxPreviousfirst.isVisible=true;
      pageData1[pageData1.length-1].flxPrevious.isVisible=true;
      pageData1[pageData1.length-1].flxnext.isVisible=true;
      pageData1[pageData1.length-1].flxnextLast.isVisible=true;
      pageData1[pageData1.length-1].labelOne.text =pageCount;
      pageData1[pageData1.length-1].lblPageCount.text =totalpageCount;
    }
    else 
    {
      pageData1[pageData1.length-1].flxPreviousfirst.isVisible=true;
      pageData1[pageData1.length-1].flxPrevious.isVisible=true;
      pageData1[pageData1.length-1].flxnext.isVisible=true;
      pageData1[pageData1.length-1].flxnextLast.isVisible=true;
      pageData1[pageData1.length-1].labelOne.text ="1";
      pageData1[pageData1.length-1].lblPageCount.text =totalpageCount;
    }
    pageData1[pageData1.length-1].flxPagingContainer.isVisible=true;
    pageData1[pageData1.length-1].flxPreviousfirst.onClick=this.onArrowPrevfirstClick;
    pageData1[pageData1.length-1].flxPrevious.onClick=this.onArrowPrevClick;
    pageData1[pageData1.length-1].flxnext.onClick=this.onArrowNextClick;
    pageData1[pageData1.length-1].flxnextLast.onClick=this.onArrowNextLastClick;
    pageData1[pageData1.length-1].flxpageGoContainer.onClick=this.goPageOnclick;
    pageData1[pageData1.length - 1].textpageNo.text=textPageNo;
    var countVal=(pageCount-1)*10;
    if(countVal==0) pageData1[pageData1.length-1].lblShowing.text = "Showing 1 - 10 " +"Of " +resultData.length;
    else pageData1[pageData1.length-1].lblShowing.text = "Showing"+" "+countVal+" - "+ (countVal+10) +" " +"Of " +resultData.length;
    var segRowDat=[[headerData,pageData1]];
    this.view[segid].widgetDataMap =this.datawidgetMap();
    this.view[segid].setData(segRowDat);

  },
  groupContractAccounts:function(accountsContext)
  {
    var accountsData=[];
    var accountsData = [];
     var count=0;
    for (var i in accountsContext) {
      for (j in accountsContext[i].customerAccounts) {
        accountsData.push(accountsContext[i].customerAccounts[j]);
        accountsData[count]["coreCustomerName"] = accountsContext[i].coreCustomerName;
        accountsData[count]["isPrimary"] = accountsContext[i].isPrimary;
        accountsData[count]["taxId"] = accountsContext[i].taxId;
        accountsData[count]["addressLine1"] = accountsContext[i].addressLine1;
        count=count+1;
      }
    }
    return accountsData;
  },
  expandAccountDetails:function(context,updateParamsexpand,updateParamscollapse)
  {
    var segid = context.widgetInfo.id;
    var segData = this.view[segid].data;
    var updateCollapseParams = {
      "imgArrow" : {"src" : "img_desc_arrow.png"},
      "flxAccountHeader" : {"isVisible" : false},
      "flxAccountHeaderSection":{"isVisible" : false},
    };
    var headerData=segData[context.sectionIndex][0];
    var rowData=segData[context.sectionIndex][1];
    for(i in rowData)
    {
      rowData[i].flxAccountHeader.isVisible= true;
    }
    headerData.imgArrow.src= "img_down_arrow.png";
    headerData.flxAccountHeaderSection.isVisible= true;
    var segRowDat=[[headerData,rowData]];
    this.view[segid].widgetDataMap =this.datawidgetMap();
    this.view[segid].setData(segRowDat);
  },
  collapseAccountDetails:function(context,updateParamsexpand,updateParamscollapse)
  {
    var segid = context.widgetInfo.id;
    var segData = this.view[segid].data;
    var headerData=segData[context.sectionIndex][0];
    var rowData=segData[context.sectionIndex][1];
    for(i in rowData)
    {
      rowData[i].flxAccountHeader.isVisible= false;
    }
    headerData.imgArrow.src= "img_desc_arrow.png";
    headerData.flxAccountHeaderSection.isVisible= false;
    var segRowDat=[[headerData,rowData]];
    this.view[segid].widgetDataMap =this.datawidgetMap();
    this.view[segid].setData(segRowDat);

  },
  
  SetDataForLegalEntity: function(response) {
        var scopeObj = this;
        var legalEntityData;
        var maxSizeText = "";
        response.sort((a, b) => {
            let fa = a.companyName.toLowerCase(),
            fb = b.companyName.toLowerCase();
            if (fa < fb) {
               return -1;
            }
            if (fa > fb) {
               return 1;
            }
            return 0;
         });
        var widgetMap = {
            "flxSearchDropDown": "flxSearchDropDown",
            "flxCheckBox": "flxCheckBox",
            "imgCheckBox": "imgCheckBox",
            "lblDescription": "lblDescription"
        };
        var data = response.map(function(res) {
            return {
                "lblDescription": {
                    "text": res.companyName,
                    "onTouchEnd": function() {
                      legalEntityData = [{"id": res.id,"name": res.companyName}];
                      scopeObj.LegalUnits(legalEntityData);
                      scopeObj.presenter.setLegalEntityData(legalEntityData);
                      scopeObj.view.flxLegalEntityListCont.isVisible = false;
                    }
                },
               "flxCheckBox": {"isVisible":false}
            };
        });
        scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.widgetDataMap = widgetMap;
        scopeObj.view.dropdownLegalEntity.segStatusFilterDropdown.setData(data);
    },  
  LegalUnits : function(legalEntityData){
    this.presenter.getAllEnrollmentRequests(legalEntityData);
  }
  
});
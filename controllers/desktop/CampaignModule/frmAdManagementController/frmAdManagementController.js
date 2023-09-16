define({
  campaignData : null,
  allPossibleFilterData : [],
  statusfilterIndices : null,
  selectedStatus : null,
  isDefault : false,
  defaultCampaignDetails : {},
  prevIndex : -1,
  statusId : null,
  isPostLoginAdSettingsEnabled : undefined,
  allDatasets : undefined,
  showPopUp: false,
  allPriorities: [],
  productIdGlobal: null,
  attributesList : [],
  statusFilterSelection : [],
  offlineChannelSequence : ["SMS", "Email", "Push Notifications"],
  onlineChannelSequence : {
    "MOBILE" : kony.i18n.getLocalizedString("i18n.frmAdManagement.NativeMobileApp"),
    "WEB" : kony.i18n.getLocalizedString("i18n.frmAdManagement.WebApp")
  },
  moduleSequence : {
    "PRELOGIN" : kony.i18n.getLocalizedString("i18n.frmAdManagement.PreLoginScreen"),
    "POSTLOGIN" : kony.i18n.getLocalizedString("i18n.frmAdManagement.PostLoginFullScreenInterstitialAd"),
    "ACCOUNT_DASHBOARD" : kony.i18n.getLocalizedString("i18n.frmAdManagement.AccountDashboard"),
    "APPLY_FOR_NEW_ACCOUNT" : kony.i18n.getLocalizedString("i18n.frmAdManagement.ApplyforNewAcc")
  },
  inAppPopupChannelSequence : {
    "WEB" : "inAppWeb",
    "MOBILE" : "inAppMobile"
  },
  popupPlaceholder : "POPUP",

  campaignsPreShow: function(){
    this.view.selectOptions.flxOption1.hoverSkin = "sknContextualMenuEntryHover";
    this.view.selectOptions.flxOption2.hoverSkin = "sknContextualMenuEntryHover";
    this.view.selectOptions.flxOption3.hoverSkin = "sknContextualMenuEntryHover";
    this.view.selectOptions.flxOption4.hoverSkin = "sknContextualMenuEntryHover";
    this.view.settingsMenuOptions.fontIconOption1.skin = "sknFontIcon485C7518px";
    this.view.settingsMenuOptions.fontIconOption2.skin = "sknFontIcon485C7518px";
    this.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtn163C5DLatoRegularffffff13pxRad28px";
    this.view.mainHeader.btnDropdownList.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnDropdownList.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.popUp.btnPopUpDelete.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.lblCampaignsInfo.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.campaignsRunningInfo");
    this.view.flxListing.setVisibility(true);
    this.view.flxToastMessage.setVisibility(false);
    this.view.flxViewDetails.setVisibility(false);
    this.setFlowActions();
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxViewDetails.height = (kony.os.deviceInfo().screenHeight - 126) + "px";
    this.view.flxFirstLine.isVisible = true;
    this.view.flxSecondLine.isVisible = true;
    this.view.flxDefaultAdCampaign.isVisible = false;
    this.closePopup();
  },

  willUpdateUI: function (context) {
    var scopeObj = this;
    if(context){
      this.updateLeftMenu(context);
      if(context.progressBar) {
        if(context.progressBar.show === "success")
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }
      if(context.fetchCampaigns){
        scopeObj.fetchedCampaignsResponse(context);
      }
      if(context.getAllDefaultCampaigns){
        scopeObj.checkGetDefaultCampaignResponse(context);
      }
      if(context && context.action === "createOrUpdateStatus") {
        scopeObj.showToastMsg(context.status, context.msg);
      }
      if(context && context.action === "updateCampaignStatus") {
        if(context.isViewDetails){
          var statusText = this.getCampaignStatus(this.statusId,this.view.lblStartDate.text, this.view.lblEndDate.text);
          this.view.lblCampaignStatus.text = statusText;
          this.view.flxOptions.setVisibility(!(statusText=="Terminated"||statusText=="Completed"));
          this.view.lblFontIconStatusImg.text = this.getCampaignStatusIcon(statusText);
          this.view.lblFontIconStatusImg.skin = this.getCampaignStatusIconSkin(statusText);
        } 
        scopeObj.showToastMsg(context.status, context.msg);
      }
      if(context && context.action === "updateCampaignSettings") {
        scopeObj.isPostLoginAdSettingsEnabled = context.isShowAd;
        scopeObj.showToastMsg(context.status, context.msg);
        scopeObj.closePopup();
      }
      if(context && context.action === "getCampaignSettings") {
        if(context.status === "success") {
          scopeObj.isPostLoginAdSettingsEnabled = context.isShowAd;
          scopeObj.showPostLoginSettings();
        } else {
          scopeObj.showToastMsg(context.status, context.msg);
        }
      }
      if(context.action && context.action === "getAttributes") {
        if(context.hasOwnProperty("error")) {
          scopeObj.showToastMsg(context.error, context.error);
        } else {
          scopeObj.allDatasets = context.datasets;
          scopeObj.showGroupAttributes(context.data, context.groupName, context.groupDesc, context.numberOfUsers);
        }
      }
      if(context.action && context.action === "getProductsByProductGroup") {
        scopeObj.findProductNameAndGroup(context.items);
      }
    }
  },

  checkGetDefaultCampaignResponse: function(context) {
    var scopeObj = this;
    context.campaignLists = scopeObj.decodeOnlineContents(context.campaignLists);
    if(context.getAllDefaultCampaigns === "success") {
      var defaultDescription = context.campaignLists.length? context.campaignLists[0].placeholderDescription : "N/A";
      scopeObj.view.lblDefaultDescription.text = defaultDescription;
      scopeObj.populateOnlineChannelData(context.campaignLists, true);
      scopeObj.populateInAppPopupData(context.campaignLists);
      let defaultURLSpecifications = scopeObj.manipulateChannelData(context.campaignLists);
      scopeObj.defaultCampaignDetails =  {"description" : defaultDescription, "specifications" : defaultURLSpecifications};
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage("Error in fetching Campaigns", scopeObj);
    }
    scopeObj.view.forceLayout();
  },

  setFlowActions: function() {
    var scopeObj = this;

    this.view.flxCampaignNameHeader.onClick = function(){
      scopeObj.sortCampaignList("name");
    };

    this.view.flxCampaignPriorityHeader.onClick = function(){
      scopeObj.sortCampaignList("priority");
    };

    this.view.flxCampaignStartDateTimeHeader.onClick = function(){
      scopeObj.sortCampaignList("startDateTime");
    };

    this.view.flxCampaignEndDateTimeHeader.onClick = function(){
      scopeObj.sortCampaignList("endDateTime");
    };

    this.view.flxRoleNameHeader.onClick = function(){
      scopeObj.sortCustomerRolesViewDetails("lblRoleName.text");
    };
    
    this.view.flxUsersHeader.onClick = function(){
      scopeObj.sortCustomerRolesViewDetails("lblUsersHeader.text");
    };

    this.view.subHeader.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };

    this.view.subHeader.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    }; 

    this.view.subHeader.tbxSearchBox.onKeyUp = function() {
      scopeObj.searchCampaigns(scopeObj.view.subHeader.tbxSearchBox.text);
    };

    this.view.subHeader.flxClearSearchImage.onClick=function(){
      scopeObj.searchCampaigns("");
    };

    this.view.flxCampaignStatusHeader.onClick = function() {
      scopeObj.showStatusFilterMenu();
    };

    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      var index = scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndex[1];
      scopeObj.showFilterdCampaignsList(index);
    };

    this.view.segCampaigns.onRowClick = function() {
      var selItem = scopeObj.view.segCampaigns.selectedItems[0];
      scopeObj.displayDetails(selItem);
      scopeObj.populateTargetCustomerRoles(selItem.profileDetails);
      scopeObj.populateEventsData(selItem.eventTriggerDetails);
      scopeObj.populateOfflineChannels(selItem.offlineTemplate);
      scopeObj.populateOnlineChannelData(selItem.onlineContent, false);
      scopeObj.populateInAppPopupData(selItem.onlineContent);
      scopeObj.view.tabs.btnTab1.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view.tabs.btnTab2.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      let channelTypes = selItem.channelType;
      let hasOnlineChannel = channelTypes.indexOf(kony.i18n.getLocalizedString("i18n.View.ONLINE").toUpperCase()) !== -1;
      scopeObj.view.flxTab1.setVisibility(hasOnlineChannel);
      let hasOfflineChannel = channelTypes.indexOf(kony.i18n.getLocalizedString("i18n.frmAdManagement.offline").toUpperCase()) !== -1;
      scopeObj.view.flxTab3.setVisibility(hasOfflineChannel);
      var payload = {
        "formName": kony.application.getCurrentForm().id,
        "productGroups": selItem.productGroupId
      };
      scopeObj.productIdGlobal = selItem.productId;
      scopeObj.presenter.getProductsByProductGroup(payload);
    };

    this.view.flxOptions.onClick = function() {
      scopeObj.toggleContextualMenu("viewDetails");
    };

    this.view.flxOptionsDefault.onClick = function() {
      scopeObj.toggleContextualMenu("viewDetails");
    };

    this.view.flxCloseAttributeList.onClick = function() {
      scopeObj.view.flxViewAttributeList.setVisibility(false);
    };

    this.view.lblDescriptionTag.onTouchEnd = function(){
      if(scopeObj.view.lblIconRightArrow.isVisible===true){
        scopeObj.view.flxDescriptionBody.setVisibility(true);
        scopeObj.view.lblIconRightArrow.isVisible = false;
        scopeObj.view.lblIconDownArrow.isVisible = true;
        scopeObj.view.forceLayout();
      }
      else if(scopeObj.view.lblIconDownArrow.isVisible===true){
        scopeObj.view.flxDescriptionBody.setVisibility(false);
        scopeObj.view.lblIconDownArrow.isVisible = false;
        scopeObj.view.lblIconRightArrow.isVisible = true;
        scopeObj.view.forceLayout();
      }
    };
    // To Show Description (By Default it would be hidden)
    this.view.lblIconRightArrow.onTouchEnd = function(){
      if(scopeObj.view.lblIconRightArrow.isVisible===true){
        scopeObj.view.flxDescriptionBody.setVisibility(true);
        scopeObj.view.lblIconRightArrow.isVisible = false;
        scopeObj.view.lblIconDownArrow.isVisible = true;
        scopeObj.view.forceLayout();
      }
    };

    //To Hide Description
    this.view.lblIconDownArrow.onTouchEnd = function(){
      if(scopeObj.view.lblIconDownArrow.isVisible===true){
        scopeObj.view.flxDescriptionBody.setVisibility(false);
        scopeObj.view.lblIconDownArrow.isVisible = false;
        scopeObj.view.lblIconRightArrow.isVisible = true;
        scopeObj.view.forceLayout();
      }
    };

    scopeObj.view.tabs.btnTab1.onClick = function(){
      scopeObj.view.tabs.btnTab1.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view.tabs.btnTab2.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      let hasData = scopeObj.view.segTargetCustomerRoles.data.length > 0;
      scopeObj.view.flxTargetDatasets.setVisibility(hasData);
      scopeObj.view.lblNoAd.setVisibility(!hasData);
      scopeObj.view.flxEventsData.setVisibility(false);
    };

    scopeObj.view.tabs.btnTab2.onClick = function(){
      scopeObj.view.tabs.btnTab1.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      scopeObj.view.tabs.btnTab2.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view.lblNoAd.setVisibility(false);
      scopeObj.view.flxTargetDatasets.setVisibility(false);
      scopeObj.view.flxEventsData.setVisibility(true);
    };

    // When Target Customer Roles TAB is pressed.
    scopeObj.view.flxTab2.onClick = function(){      
      let hasData = scopeObj.view.segTargetCustomerRoles.data.length > 0;
      scopeObj.view.flxTargetDatasets.setVisibility(hasData);
      scopeObj.view.lblNoAd.setVisibility(!hasData);
      scopeObj.view.tabs.btnTab1.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view.tabs.btnTab2.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      scopeObj.view.flxEventsData.setVisibility(false);
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTargetCustomerRoles, scopeObj.view.lblOffline, scopeObj.view.lblAdSpecifications, scopeObj.view.lblPopupAd], scopeObj.view.lblTargetCustomerRoles);
      scopeObj.view.flxTargetCustomerRolesData.isVisible = true;
      scopeObj.view.flxOfflineChannelsData.isVisible = false;
      scopeObj.view.flxChannelsDataFlowVertical.isVisible = false;
      scopeObj.view.flxInAppPopupSection.isVisible = false;
    };

    // When Offline Channels TAB is pressed.
    this.view.flxTab3.onClick = function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTargetCustomerRoles, scopeObj.view.lblOffline, scopeObj.view.lblAdSpecifications, scopeObj.view.lblPopupAd], scopeObj.view.lblOffline);
      scopeObj.view.flxTargetCustomerRolesData.isVisible = false;
      scopeObj.view.flxOfflineChannelsData.isVisible = true;
      scopeObj.view.flxChannelsDataFlowVertical.isVisible = false;
      scopeObj.view.flxInAppPopupSection.isVisible = false;
    };

    // When In App Channels TAB is pressed.
    this.view.flxTab1.onClick = function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTargetCustomerRoles, scopeObj.view.lblOffline, scopeObj.view.lblAdSpecifications, scopeObj.view.lblPopupAd], scopeObj.view.lblAdSpecifications);
      scopeObj.view.flxTargetCustomerRolesData.isVisible = false;
      scopeObj.view.flxOfflineChannelsData.isVisible = false;
      scopeObj.view.flxChannelsDataFlowVertical.isVisible = true;
      scopeObj.view.flxInAppPopupSection.isVisible = false;
    }; 

    // When In App POPUP TAB is pressed.
    this.view.flxTab4.onClick = function(){
      scopeObj.tabUtilLabelFunction([scopeObj.view.lblTargetCustomerRoles, scopeObj.view.lblOffline, scopeObj.view.lblAdSpecifications, scopeObj.view.lblPopupAd], scopeObj.view.lblPopupAd);
      scopeObj.view.flxTargetCustomerRolesData.isVisible = false;
      scopeObj.view.flxOfflineChannelsData.isVisible = false;
      scopeObj.view.flxChannelsDataFlowVertical.isVisible = false;
      scopeObj.view.flxInAppPopupSection.isVisible = true;
    }; 

    this.view.flxClose.onClick = function(){
      scopeObj.view.flxViewAdPreview.setVisibility(false);
      scopeObj.view.richTextAdImage.text = "";
    };

    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.presenter.fetchCampaigns();
    };

    scopeObj.view.mainHeader.btnDropdownList.onClick = function() {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.setCurrentCampaignFilter(scopeObj.getCurrentFilterPayload());
      scopeObj.presenter.getPlaceholders();
    };

    this.view.selectOptions.flxOption1.onClick = function() {
      scopeObj.statusContextualMenuOptionOnSelect(scopeObj.view.selectOptions.lblOption1.text);
    };

    this.view.selectOptions.flxOption2.onClick = function() {
      scopeObj.statusContextualMenuOptionOnSelect(scopeObj.view.selectOptions.lblOption2.text);
    };

    this.view.selectOptions.flxOption3.onClick = function() {
      scopeObj.statusContextualMenuOptionOnSelect(scopeObj.view.selectOptions.lblOption3.text);
    };

    this.view.selectOptions.flxOption4.onClick = function() {
      scopeObj.copyCampaign();
    };

    this.view.popUp.btnPopUpCancel.onClick = function() {
      if(scopeObj.showPopUp){
        scopeObj.view.popUp.setVisibility(false);
        scopeObj.showPopUp = false;
      } else {
        scopeObj.closePopup();
      }
    };
    this.view.popUp.btnPopUpDelete.onClick = function() {
      if(scopeObj.showPopUp){
        scopeObj.presenter.updateCampaignSettings({"showFullScreenAd" : scopeObj.view.postLoginSettingspopup.switchShowAd.selectedIndex === 0});
        scopeObj.showPopUp = false;
      } else {
        scopeObj.updateCampaignStatus();
      }
      scopeObj.closePopup();
    };

    this.view.popUp.flxPopUpClose.onClick = function() {
      if(scopeObj.showPopUp){
        scopeObj.view.popUp.setVisibility(false);
        scopeObj.showPopUp = false;
      } else {
        scopeObj.closePopup();
      }
    };

    scopeObj.view.flxSettings.onClick = function() {
      scopeObj.toggleSettings();
    };

    scopeObj.view.settingsMenuOptions.flxOption1.onClick = function() {
      scopeObj.displayDefaultAdDetails();
      scopeObj.view.settingsMenu.setVisibility(false);
    };

    scopeObj.view.settingsMenuOptions.flxOption2.onClick = function() {
      scopeObj.showPostLoginSettings();
    };

    scopeObj.view.postLoginSettingspopup.flxPopUpClose.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.postLoginSettingspopup.btnPopUpCancel.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.postLoginSettingspopup.btnPopUpDelete.onClick = function() {
      if(scopeObj.isPostLoginAdSettingsEnabled && scopeObj.view.postLoginSettingspopup.switchShowAd.selectedIndex===1){
        scopeObj.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.TurningoffDisplayAds");
        scopeObj.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.TurningoffDisplayAdsMessage");
        scopeObj.showPopUp = true;
        scopeObj.view.popUp.setVisibility(true);
      } else {
        scopeObj.presenter.updateCampaignSettings({"showFullScreenAd" : scopeObj.view.postLoginSettingspopup.switchShowAd.selectedIndex === 0});
      }
    };

    scopeObj.view.lblAttributeHeader.onClick = function(){
      scopeObj.sortAttributes();
    };

    scopeObj.view.lblSortAttribute.onClick = function(){
      scopeObj.sortAttributes();
    };

    scopeObj.view.lblDatasetHeader.onClick = function(){
      var isVisible = scopeObj.view.viewAttributesFilter.isVisible;
      scopeObj.view.viewAttributesFilter.setVisibility(!isVisible);
    };

    scopeObj.view.lblFilterDataset.onClick = function(){
      var isVisible = scopeObj.view.viewAttributesFilter.isVisible;
      scopeObj.view.viewAttributesFilter.setVisibility(!isVisible);
    };

    this.view.flxEmailPreviewClose.onClick = function(){
      scopeObj.view.flxEmailPreview.setVisibility(false);
    };
    this.view.viewPopupEvents.fontIconEventsInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.viewInternalEvents.fontIconEventsInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.viewExternalEvents.fontIconEventsInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    scopeObj.view.viewAttributesFilter.segStatusFilterDropdown.onRowClick = function(segid, sectionIndex, rowIndex){
      let description = scopeObj.view.viewAttributesFilter.segStatusFilterDropdown.data[rowIndex].lblDescription.toUpperCase();
      scopeObj.filterDatasets(description);
    };

    scopeObj.view.popupChannelWrapper.btnTab1.onClick = function(){
      scopeObj.view.popupChannelWrapper.btnTab1.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view.popupChannelWrapper.btnTab2.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      scopeObj.view[scopeObj.inAppPopupChannelSequence["WEB"]].isVisible = true;
      scopeObj.view[scopeObj.inAppPopupChannelSequence["MOBILE"]].isVisible = false;
    };

    scopeObj.view.popupChannelWrapper.btnTab2.onClick = function(){
      scopeObj.view.popupChannelWrapper.btnTab1.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
      scopeObj.view.popupChannelWrapper.btnTab2.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view[scopeObj.inAppPopupChannelSequence["WEB"]].isVisible = false;
      scopeObj.view[scopeObj.inAppPopupChannelSequence["MOBILE"]].isVisible = true;
    };
    
    scopeObj.view.subHeader.tbxSearchBox.onDone = function() {
      kony.print("Function written to avoid opening a new Window in Browser");
    };

  },

  fetchedCampaignsResponse : function(context) {
    var scopeObj = this;

    if(context.fetchCampaigns === "success") {
      scopeObj.showCampaignList(context.campaignsList);
      this.campaignData = this.view.segCampaigns.data;
      scopeObj.setStatusFilterIndices();
      this.setCurrentCampaignFilter();
      this.campaignSpecification = [];
      this.isDefault = false;
    }
    else {
      this.sortBy = this.getObjectSorter("endDateTime");
      scopeObj.view.toastMessage.showErrorToastMessage(context.message, scopeObj);
    }
    this.view.flxSettings.setVisibility(true);
    scopeObj.view.forceLayout();
  },
  
  getCurrentFilterPayload: function(){
    var filterPayload = {
      "statusfilterIndices": this.statusfilterIndices,
      "inAscendingOrder": this.sortBy? this.sortBy.inAscendingOrder : null,
      "sortBy": this.sortBy,
      "searchText": this.view.subHeader.tbxSearchBox.text,
    };
    return filterPayload;
  },

  setCurrentCampaignFilter: function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    var currentCampaignFilter = this.presenter.getCurrentCampaignFilter();
    if(currentCampaignFilter){
      this.sortBy = currentCampaignFilter.sortBy? currentCampaignFilter.sortBy : this.getObjectSorter("endDateTime");
      this.sortBy.inAscendingOrder = currentCampaignFilter.inAscendingOrder !== null? currentCampaignFilter.inAscendingOrder : "false";
      this.view.subHeader.tbxSearchBox.text = currentCampaignFilter.searchText;
      this.statusfilterIndices = currentCampaignFilter.statusfilterIndices !== null ? currentCampaignFilter.statusfilterIndices : this.statusfilterIndices;
      this.searchCampaigns(currentCampaignFilter.searchText);
    }
    else{
      this.sortBy = this.getObjectSorter("endDateTime");
      // setting the sort icon of endDateTime as descending order for first time
      this.sortBy.inAscendingOrder = false;
      if(this.statusfilterIndices["Completed"] !== undefined)
        this.statusfilterIndices["Completed"] = false;
      if(this.statusfilterIndices["Terminated"] !== undefined)
        this.statusfilterIndices["Terminated"] = false;
      this.searchCampaigns("");
    }
    this.resetSortFontIcons();
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },

  showCampaignList: function(data){
    this.allPriorities = [];
    this.view.flxListing.setVisibility(true);
    this.view.flxViewDetails.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxHeaderSeperator.setVisibility(true);
    this.view.subHeader.tbxSearchBox.text="";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    this.view.flxSelectOptions.setVisibility(false);
    var segData = data.map(this.mappingCampaignsdata);
    this.setCampaignsSegmentData(segData);
    this.presenter.assignCampaignPriorities(this.allPriorities);
  },

  showcampaignDetailsToolTip : function(widget,context){
    if(widget.id === "fontIconEventsInfo"){
      var toolTipText;
      if(widget.kmasterid === "viewInternalEvents")
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.internalEventsInfo");
      else if(widget.kmasterid === "viewExternalEvents")
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.externalEventsInfo");
      else
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.popupEventsInfo");
      this.view.campaignDetailsToolTip.left = 20 + this.view[widget.kmasterid].flxEventsHeaderInner.frame.x + this.view[widget.kmasterid].fontIconEventsInfo.frame.x - this.view.campaignDetailsToolTip.lblarrow.frame.x + "dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.text = toolTipText;
      this.view.campaignDetailsToolTip.top = this.view[widget.kmasterid].frame.y + 30 + "dp";
      this.view.campaignDetailsToolTip.width = "220dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.width = "210dp";
    }
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      this.view.campaignDetailsToolTip.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.campaignDetailsToolTip.setVisibility(false);
    }
    this.view.forceLayout();
  },

  mappingCampaignsdata: function(data){
    var statusIcon, status, trimCharacters;
    if (this.view.flxListingMainContainer.frame.width > 1000)
      trimCharacters = 40;
    else
      trimCharacters = 25;
    status = this.getCampaignStatus(data.campaignStatus, data.startDate, data.endDate);
    statusIcon = this.getCampaignStatusIcon(status);
    if(data.campaignStatus !== "TERMINATED" && status !== "Completed")
      this.allPriorities.push({"name": data.campaignName, "priority":data.campaignPriority});
    return {
      name: data.campaignName ,
      priority: data.campaignStatus === "TERMINATED" || status === "Completed" ? "" : data.campaignPriority,
      startDateTime: data.startDate,
      endDateTime: data.endDate,
      lblCampaignsName: {
        text: this.trimSegText(data.campaignName, trimCharacters),
        tooltip: data.campaignName.length > trimCharacters ? data.campaignName : "",
      },
      lblPriority: {
        text : data.campaignStatus === "TERMINATED" || status === "Completed"? "N/A" : data.campaignPriority > 9 ? data.campaignPriority : "0" + data.campaignPriority
      },
      lblStartDateTime: {
        text : data.startDate.substr(5,2) + "/" +  data.startDate.substr(8,2) + "/" + data.startDate.substr(0,4)
        //this.getFormatDate(data.startDateTime)
      },
      lblEndDateTime: {
        text : data.endDate.substr(5,2) + "/" +  data.endDate.substr(8,2) + "/" + data.endDate.substr(0,4)
        //this.getFormatDate(data.endDateTime)
      },
      lblStatus: {
        text : status
      },
      fontIconStatusImg: {
        text : statusIcon,
        skin : this.getCampaignStatusIconSkin(status)
      },
      flxOptions: {
        isVisible : data.campaignStatus === "TERMINATED" || status === "Completed"? false : true,
        onClick : this.toggleContextualMenu
      },
      lblIconOptions: {
        text : ""
      },
      flxDropdown: {
        onClick : this.showCampaignDescription,
      },
      fonticonArrow: {
        text : "\ue922",
        skin : "sknLblIIcoMoon485c7514px"
      },
      flxCampaignExpand: {
        isVisible : false
      },
      lblDescriptionHeader: {
        text : kony.i18n.getLocalizedString("i18n.ConfigurationBundles.descriptionInCaps")
      },
      lblDescription: {
        text : data.campaignDescription
      },
      lblSeparator: {
        text : ".",
        skin : "sknlblSeperatorD7D9E0"
      },
      campaignId : data.campaignId,
      objectiveType: data.objectiveType ? data.objectiveType : "N/A",
      productId: data.productId ? data.productId : "N/A",
      productGroupId: data.productGroupId ? data.productGroupId : "N/A",
      campaignType: data.campaignType ? data.campaignType : "N/A",
      channelType: data.channelType,
      eventTriggerDetails: data.eventTriggerDetails,
      profileDetails: data.profileDetails,
      channelDetails: data.channelDetails,
      onlineContent: this.decodeOnlineContents(data.onlineContent),
      offlineTemplate: data.offlineTemplate,
      campaignStatus : data.campaignStatus
    };
  },

  decodeOnlineContents: function(data){
    if(data){
      for(var i = 0; i < data.length; i++){
        data[i].imageURL = data[i].imageURL? decodeURIComponent(data[i].imageURL) : "";
        data[i].targetURL = data[i].targetURL? decodeURIComponent(data[i].targetURL) : "";
        data[i].callToActionTargetURL = data[i].callToActionTargetURL? decodeURIComponent(data[i].callToActionTargetURL) : "";
        data[i].callToActionButtonLabel = data[i].callToActionButtonLabel ? decodeURIComponent(data[i].callToActionButtonLabel) : "";
        data[i].bannerTitle = data[i].bannerTitle ? decodeURIComponent(data[i].bannerTitle) : "";
        data[i].bannerDescription = data[i].bannerDescription ? decodeURIComponent(data[i].bannerDescription) : "";
      }
    }
    return data;
  },

  setCampaignsSegmentData: function(data){
    var self = this;
    if(data.length === 0){
      self.showNoResultsFound(kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords"));
    }
    else{
      self.view.flxNoResultFound.setVisibility(false);
      self.view.flxSegCampaigns.setVisibility(true);
      var dataMap = {
        flxCampaigns: "flxCampaigns",
        flxCampaignCollapse: "flxCampaignCollapse",
        lblCampaignsName: "lblCampaignsName",
        lblPriority: "lblPriority",
        lblStartDateTime: "lblStartDateTime",
        lblEndDateTime: "lblEndDateTime",
        flxStatus: "flxStatus",
        lblStatus: "lblStatus",
        fontIconStatusImg: "fontIconStatusImg",
        flxOptions: "flxOptions",
        lblIconOptions: "lblIconOptions",
        flxDropdown: "flxDropdown",
        fonticonArrow: "fonticonArrow",
        flxCampaignExpand: "flxCampaignExpand",
        lblDescriptionHeader: "lblDescriptionHeader",
        lblDescription: "lblDescription",
        lblSeparator: "lblSeparator",
      };
      self.view.segCampaigns.widgetDataMap = dataMap;
      self.view.segCampaigns.setData(data);
    }
    //document.getElementById("frmAdManagement_segCampaigns").onscroll = this.contextualMenuOff;
    self.view.forceLayout();
  },

  contextualMenuOff: function(context) {
    var scopeObj = this;
    if(scopeObj.view.flxSelectOptions.isVisible){
      scopeObj.view.flxSelectOptions.isVisible = false;
      var Segment =scopeObj.view.segCampaigns;
      var segData = Segment.data;
      segData[this.prevIndex].flxOptions.skin = "slFbox";
      Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
    }
  },

  trimSegText: function(text,len) {
    var final_text = text ? text : "";
    if (final_text.length > len) final_text = final_text.substr(0, len) + "...";
    return final_text;
  },

  getFormatDate: function(dateTime) {
    var time = dateTime.substr(11);
    var hour = time.substr(0, time.indexOf(":"));
    var ampm = (hour < 12 || hour === 0) ? " AM" : " PM";
    hour = hour % 12 || 12;
    var minute = time.substr(time.indexOf(":"), 3);
    hour = hour < 10 ? "0" + hour : hour;
    time = hour +  minute + ampm;
    var date = dateTime.substr(5,2) + "/" +  dateTime.substr(8,2) + "/" + dateTime.substr(0,4) + " "; 
    return  (date + time);
  },

  getCampaignStatus: function(statusId, startDateTime, endDateTime) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var startDT = new Date(startDateTime.substring(0,10).replace(/-/g,"/"));
    startDT.setHours(0, 0, 0, 0);
    var endDT = new Date(endDateTime.substring(0,10).replace(/-/g,"/"));
    endDT.setHours(0, 0, 0, 0);
    if(statusId === "TERMINATED")
      return "Terminated";
    else if(statusId==="PAUSED") {
      if(today>endDT)
        return "Completed";
      else
        return "Paused";
    } 
    else if(today>=startDT && today<=endDT)
      return "Active";
    else if(today<startDT)
      return "Scheduled";
    else if(today>endDT)
      return "Completed";
  },

  getCampaignStatusIcon: function(status){
    if(status==="Active")
      return "\ue921";
    else if(status==="Scheduled")
      return "\ue94a";
    else if(status==="Completed")
      return "\ue904";
    else if(status === "Terminated")
      return "\ue905";
    else if(status ==="Paused")
      return "\ue91d";
  },

  getCampaignStatusIconSkin: function(status){
    if(status==="Active")
      return "sknFontIconActivate";
    else if(status==="Completed")
      return "sknFontIconCompleted";
    else if(status==="Scheduled")
      return "sknFontIconScheduled";
    else if(status === "Terminated")
      return "sknFontIconTerminate";
    else if(status ==="Paused")
      return "sknFontIconPause";
    else
      return "sknFontIconOptionMenuRow";
  },

  showCampaignDescription: function(){
    var self = this;
    var index = self.view.segCampaigns.selectedRowIndex[1];
    var selItems = self.view.segCampaigns.selectedItems[0];
    if(selItems.fonticonArrow.text==="\ue922"){
      selItems.fonticonArrow.text = "\ue915";
      selItems.fonticonArrow.skin = "sknfontIconDescDownArrow12px";
      selItems.flxCampaignExpand.isVisible=true;
      self.view.segCampaigns.setDataAt(selItems, index);
    }
    else{
      selItems.fonticonArrow.text = "\ue922";
      selItems.fonticonArrow.skin = "sknfontIconDescRightArrow14px";
      selItems.flxCampaignExpand.isVisible=false;
      self.view.segCampaigns.setDataAt(selItems, index);
    }
    self.view.forceLayout();
  },

  showNoResultsFound: function(text){
    var self = this;
    self.view.flxNoResultFound.setVisibility(true);
    self.view.flxSegCampaigns.setVisibility(false);
    self.view.rtxSearchMesg.text=text;
    self.view.forceLayout();
  },

  toggleContextualMenu: function(type){
    var self = this;

    var height = 0;
    var left = 0;
    if(type==="viewDetails"){
      //showing contextual menu for View details page
      height = "165px";
      left = (this.view.flxTopDetails.frame.width - 145) + "px";
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      if(self.view.flxDefaultAdCampaign.isVisible===true)
        var contextualWidgetHeight = self.setContextualMenuItem("Default"); 
      else
        var contextualWidgetHeight = self.setContextualMenuItem(this.view.lblCampaignStatus.text); 
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
    }
    else {
      //showing contextual menu in segment of listing page
      if(self.prevIndex===-1){
        //let segData = self.view.segCampaigns.data;
        let selectedIndex = self.view.segCampaigns.selectedRowIndex[1];
        self.prevIndex = selectedIndex;
      }
      else if(self.prevIndex!==-1){
        let segData = self.view.segCampaigns.data;
        let selectedIndex = self.view.segCampaigns.selectedRowIndex[1];
        segData[self.prevIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
        this.view.segCampaigns.setDataAt(segData[self.prevIndex],self.prevIndex);
        self.prevIndex=selectedIndex;
      }
      var index = self.view.segCampaigns.selectedRowIndex[1];
      var templateArray = self.view.segCampaigns.clonedTemplates;
      var contextualWidgetHeight = self.setContextualMenuItem(templateArray[index].flxStatus.lblStatus.text);
      for (var i = 0; i < index; i++) {
        height += templateArray[i].flxCampaigns.frame.height;
      }
      self.view.selectOptions.flxArrowImage.setVisibility(true);
      self.view.selectOptions.flxDownArrowImage.setVisibility(false);
      self.view.selectOptions.flxSelectOptionsInner.top = "-1px";
      var segmentWidget = this.view.segCampaigns;
      var contextualWidget = this.view.flxSelectOptions;
      height = height + 50 - segmentWidget.contentOffsetMeasured.y;
      if (height + contextualWidgetHeight > segmentWidget.frame.height) {
        height = height - contextualWidgetHeight - 62;
        self.view.selectOptions.flxArrowImage.setVisibility(false);
        self.view.selectOptions.flxDownArrowImage.setVisibility(true);
        self.view.selectOptions.flxSelectOptionsInner.top = "0px";
      }
      height = height + 216 + "px";
      left = templateArray[index].flxOptions.frame.x + 42 - 115 + "px";
    }
    if ((self.view.flxSelectOptions.isVisible === false) || (self.view.flxSelectOptions.isVisible === true && self.view.flxSelectOptions.top !== height)) {
      self.view.flxSelectOptions.top = height;
      self.view.flxSelectOptions.left = left;
      self.view.flxSelectOptions.setVisibility(true);
      self.view.flxSelectOptions.onHover = self.onHoverEventCallback;
    }
    else {
      self.view.flxSelectOptions.setVisibility(false);
    }
    if(self.view.flxDefaultAdCampaign.isVisible===false){
      if(self.view.flxSelectOptions.isVisible===true){
        self.view.flxOptions.skin="sknflxffffffop100Border424242Radius100px";
        let segData = self.view.segCampaigns.data;
        let selectedIndex = self.view.segCampaigns.selectedRowIndex[1];
        segData[selectedIndex].flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
        self.view.segCampaigns.setDataAt(segData[selectedIndex],selectedIndex);
      }
      else{
        self.view.flxOptions.skin="sknFlxBorffffff1pxRound";
        let segData = self.view.segCampaigns.data;
        let selectedIndex = self.view.segCampaigns.selectedRowIndex[1];
        segData[selectedIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
        self.view.segCampaigns.setDataAt(segData[selectedIndex],selectedIndex);
      }
    } else {
      if(self.view.flxSelectOptions.isVisible===true){
        self.view.flxOptionsDefault.skin="sknflxffffffop100Border424242Radius100px";
      } else {
        self.view.flxOptionsDefault.skin="sknFlxBorffffff1pxRound";
      }
    }
    self.view.forceLayout();
  },

  onHoverEventCallback : function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if(scopeObj.view.flxDefaultAdCampaign.isVisible===false){
      let segData = scopeObj.view.segCampaigns.data;
      let selectedIndex = scopeObj.view.segCampaigns.selectedRowIndex[1];
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view[widGetId].setVisibility(true);
        if(widGetId==="flxSelectOptions"){
          segData[selectedIndex].flxOptions.skin="sknflxffffffop100Border424242Radius100px";
          scopeObj.view.segCampaigns.setDataAt(segData[selectedIndex],selectedIndex);
        }
      }
      else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.flxOptions.skin="sknFlxBorffffff1pxRound";
        scopeObj.view[widGetId].setVisibility(false);
        if(widGetId==="flxSelectOptions"){
          segData[selectedIndex].flxOptions.skin="sknFlxBorffffff1pxRound";
          scopeObj.view.segCampaigns.setDataAt(segData[selectedIndex],selectedIndex);
        }
      }
    } else {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view[widGetId].setVisibility(true);
      }
      else if(context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view[widGetId].setVisibility(false);
        scopeObj.view.flxOptionsDefault.skin="sknFlxBorffffff1pxRound";
      }
    }
  },

  searchCampaigns : function (text) {
    var self = this;
    if (text === "") {
      self.view.subHeader.tbxSearchBox.text="";
      self.view.subHeader.flxClearSearchImage.setVisibility(false);
      self.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    }
    else {
      self.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      self.view.subHeader.flxClearSearchImage.setVisibility(true);
    }
    var segData = this.campaignData.filter(this.searchFilter);
    // to apply filter on searched Data
    segData = this.setStatusFilterOnSearch(segData);
    if(this.sortBy){
      this.setCampaignsSegmentData(segData.sort(this.sortBy.sortData));
    }
    else{
      this.setCampaignsSegmentData(segData);
    }
  },

  searchFilter : function (data) {
    var searchText = this.view.subHeader.tbxSearchBox.text;
    if(typeof searchText === 'string' && searchText.length > 0){
      return data.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }else{
      return true;
    }
  },

  setStatusFilterOnSearch: function (segData) {
    var data=[];
    for(var i=0; i<this.allPossibleFilterData.length; i++){
      if(this.statusfilterIndices[this.allPossibleFilterData[i]]){
        var x=[]
        for(var j=0; j<segData.length; j++)
          if(segData[j].lblStatus.text === this.allPossibleFilterData[i])
            x.push(segData[j]);
        data=data.concat(x);
      }
    }
    return data;
  },

  sortCampaignList : function (sortColumn) {
    var self = this;
    var segData = self.view.segCampaigns.data;
    var passSegData = [], x = [];

    self.sortBy.column(sortColumn);
    var sortOrder = self.sortBy.inAscendingOrder;
    segData = segData.sort(this.sortBy.sortData);

    // campaign name is again alphabetically sorted for same value of the coulum
    if(sortColumn !== "name"){
      self.sortBy.column("name");
      for(var i=0; i<segData.length-1; i++){
        if(segData[i][sortColumn] === segData[i+1][sortColumn])
          x.push(segData[i]);
        else{
          x.push(segData[i]);
          passSegData = passSegData.concat(x.sort(this.sortBy.sortData));
          x = [];
        }
      }
      x.push(segData[i]);
      passSegData = passSegData.concat(x.sort(this.sortBy.sortData));
      self.sortBy.columnName = sortColumn;
      self.sortBy.inAscendingOrder = sortOrder;
    }
    else
      passSegData = segData;
    self.resetSortFontIcons();
    self.setCampaignsSegmentData(passSegData);
  },

  resetSortFontIcons : function() {
    this.determineSortFontIcon(this.sortBy,'name',this.view.fontIconSortCampaignName);
    this.determineSortFontIcon(this.sortBy,'priority',this.view.fontIconSortCampaignPriority);
    this.determineSortFontIcon(this.sortBy,'startDateTime',this.view.fontIconSortCampaignStartDateTime);
    this.determineSortFontIcon(this.sortBy,'endDateTime',this.view.fontIconSortCampaignEndDateTime);
  },

  setStatusFilterIndices : function() {
    this.allPossibleFilterData = ["Active","Paused","Completed","Scheduled","Terminated",];
    this.statusfilterIndices = [];
    for(var i=0; i<this.allPossibleFilterData.length; i++){
      this.statusfilterIndices[this.allPossibleFilterData[i]] = true;
    }
  },

  onHoverEventCallbackStatus : function(widget, context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
  },

  showStatusFilterMenu : function() {
    var segCampaignData = this.campaignData.filter(this.searchFilter).sort(this.sortBy.sortData);
    var segStatusFilterData = [], indices = [];
    var maxSizeText="";
    for(var i=0, k=0; i<this.allPossibleFilterData.length; i++){
      for(var j=0; j<segCampaignData.length; j++){
        if(segCampaignData[j].lblStatus.text === this.allPossibleFilterData[i]){
          segStatusFilterData.push({
            lblDescription : this.allPossibleFilterData[i],
            imgCheckBox:{
              "src":"checkboxselected.png"
            }
          });
          maxSizeText=this.allPossibleFilterData[i].length>maxSizeText.length?this.allPossibleFilterData[i]:maxSizeText;
          if(this.statusfilterIndices[this.allPossibleFilterData[i]])
            indices.push(k++);
          else
            k++;
          break;
        }
      }   
    }
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxCampaignStatusFilter.width=flexWidth+"px";
    this.view.statusFilterMenu.segStatusFilterDropdown.setData(segStatusFilterData);
    this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, indices]];
    this.view.flxCampaignStatusFilter.setVisibility(true);
    this.view.flxCampaignStatusFilter.onHover = this.onHoverEventCallbackStatus;
    //StatusHeader left + StatusHeader witdth - StatusFilter width
    var flxRight = this.view.flxCampaignsHeader.frame.width - this.view.flxCampaignStatusHeader.frame.x - this.view.flxCampaignStatusHeader.frame.width;
    var iconRight = this.view.flxCampaignStatusHeader.frame.width - this.view.fontIconFilterCampaignStatus.frame.x;
    this.view.flxCampaignStatusFilter.right = (flxRight + iconRight - 28) +"px";
    this.view.forceLayout();
  },

  showFilterdCampaignsList : function(index) {
    var segStatusFilterData = this.view.statusFilterMenu.segStatusFilterDropdown.data;
    var segCampaignData = [], x = [], indices = [];
    var currentSegCampaignData = this.campaignData.filter(this.searchFilter).sort(this.sortBy.sortData);
    for(var i=0; i<segStatusFilterData.length; i++){
      x = [];
      if(index !== i && this.statusfilterIndices[segStatusFilterData[i].lblDescription]){
        for(var j=0; j<currentSegCampaignData.length; j++)
          if(currentSegCampaignData[j].lblStatus.text === segStatusFilterData[i].lblDescription)
            x.push(currentSegCampaignData[j]);
        indices.push(i);
      }
      else if(index == i && this.statusfilterIndices[segStatusFilterData[i].lblDescription] === false){
        for(var j=0; j<currentSegCampaignData.length; j++)
          if(currentSegCampaignData[j].lblStatus.text === segStatusFilterData[i].lblDescription)
            x.push(currentSegCampaignData[j]);
        indices.push(i);
        this.statusfilterIndices[segStatusFilterData[i].lblDescription] = true;
      }
      else
        this.statusfilterIndices[segStatusFilterData[i].lblDescription] = false;
      segCampaignData = segCampaignData.concat(x);
    }
    this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, indices]];
    this.setCampaignsSegmentData(segCampaignData.sort(this.sortBy.sortData));
    this.view.forceLayout();
  },

  setContextualMenuItem: function(status) {
    this.view.selectOptions.flxOption4.setVisibility(status !== "Default");
    if (status === "Default"){
      this.view.selectOptions.flxOption1.setVisibility(true);
      this.view.selectOptions.fontIconOption1.text = kony.i18n.getLocalizedString("i18n.decisionManagement.editIcon");
      this.view.selectOptions.fontIconOption1.skin = this.getCampaignStatusIconSkin("Edit");
      this.view.selectOptions.lblOption1.text = kony.i18n.getLocalizedString("i18n.LeadManagement.contextualMenuEdit");
      this.view.selectOptions.flxOption2.setVisibility(false);
      this.view.selectOptions.fontIconOption2.text = "";
      this.view.selectOptions.lblOption2.text = "";
      this.view.selectOptions.flxOption3.setVisibility(false);
      this.view.selectOptions.fontIconOption3.text = "";
      this.view.selectOptions.lblOption3.text = "";
      return 46;
    }
    else if (status === "Active") {
      this.view.selectOptions.flxOption1.setVisibility(true);
      this.view.selectOptions.fontIconOption1.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.PauseIcon");
      this.view.selectOptions.fontIconOption1.skin = this.getCampaignStatusIconSkin("Paused");
      this.view.selectOptions.lblOption1.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Pause");
      this.view.selectOptions.flxOption2.setVisibility(true);
      this.view.selectOptions.fontIconOption2.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.TerminateIcon");
      this.view.selectOptions.fontIconOption2.skin = this.getCampaignStatusIconSkin("Terminated");
      this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Terminate");
      this.view.selectOptions.flxOption3.setVisibility(false);
      this.view.selectOptions.fontIconOption3.text = "";
      this.view.selectOptions.lblOption3.text = "";
      return 81;
    } /*else if (status === "Completed") {
      this.view.selectOptions.flxOption1.setVisibility(true);
      this.view.selectOptions.fontIconOption1.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.RestartIcon");
      this.view.selectOptions.fontIconOption1.skin = this.getCampaignStatusIconSkin("Restart");
      this.view.selectOptions.lblOption1.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Restart");
      this.view.selectOptions.flxOption2.setVisibility(false);
      this.view.selectOptions.fontIconOption2.text = "";
      this.view.selectOptions.lblOption2.text = "";
      this.view.selectOptions.flxOption3.setVisibility(false);
      this.view.selectOptions.fontIconOption3.text = "";
      this.view.selectOptions.lblOption3.text = "";
      return 46;
    }*/ else if (status === "Paused") {
      this.view.selectOptions.flxOption1.setVisibility(true);
      this.view.selectOptions.fontIconOption1.text = kony.i18n.getLocalizedString("i18n.decisionManagement.editIcon");
      this.view.selectOptions.fontIconOption1.skin = this.getCampaignStatusIconSkin("Edit");
      this.view.selectOptions.lblOption1.text = kony.i18n.getLocalizedString("i18n.LeadManagement.contextualMenuEdit");
      this.view.selectOptions.flxOption2.setVisibility(true);
      this.view.selectOptions.fontIconOption2.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ResumeIcon");
      this.view.selectOptions.fontIconOption2.skin = this.getCampaignStatusIconSkin("Paused");
      this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Resume");
      this.view.selectOptions.flxOption3.setVisibility(true);
      this.view.selectOptions.fontIconOption3.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.TerminateIcon");
      this.view.selectOptions.fontIconOption3.skin = this.getCampaignStatusIconSkin("Terminated");
      this.view.selectOptions.lblOption3.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Terminate");
      return 116;
    } else if (status === "Scheduled") {
      this.view.selectOptions.flxOption1.setVisibility(true);
      this.view.selectOptions.fontIconOption1.text = kony.i18n.getLocalizedString("i18n.decisionManagement.editIcon");
      this.view.selectOptions.fontIconOption1.skin = this.getCampaignStatusIconSkin("Edit");
      this.view.selectOptions.lblOption1.text = kony.i18n.getLocalizedString("i18n.LeadManagement.contextualMenuEdit");
      this.view.selectOptions.flxOption2.setVisibility(true);
      this.view.selectOptions.fontIconOption2.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.PauseIcon");
      this.view.selectOptions.fontIconOption2.skin = this.getCampaignStatusIconSkin("Paused");
      this.view.selectOptions.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Pause");
      this.view.selectOptions.flxOption3.setVisibility(true);
      this.view.selectOptions.fontIconOption3.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.TerminateIcon");
      this.view.selectOptions.fontIconOption3.skin = this.getCampaignStatusIconSkin("Terminated");
      this.view.selectOptions.lblOption3.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.Terminate");
      return 116;
    }
  },

  statusContextualMenuOptionOnSelect: function(status) {
    this.selectedStatus = status;
    if(status === kony.i18n.getLocalizedString("i18n.LeadManagement.contextualMenuEdit")){
      //edit functionality in contextual Menu
      if(this.isDefault){
        this.defaultCampaignDetails.name = kony.i18n.getLocalizedString("i18n.frmAdManagement.DefaultAdCampaign");
        this.presenter.setCurrentCampaignFilter(this.getCurrentFilterPayload());
        this.presenter.editDefaultCampaign(this.defaultCampaignDetails);
      }
      else
        this.updateCampaign(false);
    }
    /* else if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Restart")){
      //in contextual Menu functionality for restart campaign 
      this.updateCampaignStatus();
    }*/
    else
      this.setCampaignPopUp(status);
  },

  createStatusIdToUpdateStatus: function(status) {
    if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Terminate"))
      return "TERMINATED";
    else if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Pause"))
      return "PAUSED";
    else if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Resume")||status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Restart"))
      return "SCHEDULED_ACTIVE_COMPLETED";
  },

  setCampaignPopUp: function(status) {
    if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Pause")){
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.popUpHeaderPauseCampaign");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.popUpBodyPauseCampaign");
      this.statusId = "PAUSED";
    }
    else if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Resume")){
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.popUpHeaderResumeCampaign");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.popUpBodyResumeCampaign");
      this.statusId = "Active";
    }
    else if(status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Terminate")){
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.popUpHeaderTerminateCampaign");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.popUpBodyTerminateCampaign");
      this.statusId = "TERMINATED";
    }
    this.view.flxAdManagementPopUp.setVisibility(true);
    this.view.popUp.setVisibility(true);
    this.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.forceLayout();
  },

  updateCampaignStatus: function() {
    var scopeObj = this;
    var rowIndex = this.view.segCampaigns.selectedRowIndex[1] ;
    var campaignObj = this.view.segCampaigns.data[rowIndex];
    var startDates = campaignObj.lblStartDateTime.text.replace(/\//g,"-").split("-");
    var endDates = campaignObj.lblEndDateTime.text.replace(/\//g, "-").split("-");
    var campaignData = {
      "campaignId" : campaignObj.campaignId, "campaignName" : campaignObj.name, 
      "campaignDescription" : campaignObj.lblDescription.text, "campaignPriority" : campaignObj.priority.toString(),
      "objectiveType" : campaignObj.objectiveType,"productId" : campaignObj.productId === "N/A"? "" : campaignObj.productId, 
      "productGroupId" : campaignObj.productGroupId === "N/A"? "" : campaignObj.productGroupId, "campaignType" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SINGLE"),
      "startDate" : startDates[2] + "-" + startDates[0] + "-" + startDates[1], "endDate" : endDates[2] + "-" + endDates[0] + "-" + endDates[1],
      "onlineContent" : scopeObj.encodeOnlineContents(campaignObj.onlineContent), "offlineTemplate" : campaignObj.offlineTemplate,
      "channelDetails" : campaignObj.channelDetails, "campaignStatus" : this.createStatusIdToUpdateStatus(this.selectedStatus)
    };
    campaignData.channelType = scopeObj.getSelectedChannels(campaignObj.channelType);
    campaignData.profileIdList = scopeObj.getSelectedProfiles(campaignObj.profileDetails);
    campaignData.eventTriggerIdList = scopeObj.getAllSelectedEvents(campaignObj.eventTriggerDetails);
    this.presenter.setCurrentCampaignFilter(this.getCurrentFilterPayload());
    this.presenter.updateStatus(campaignData,this.view.flxViewDetails.isVisible);
  },

  getAllSelectedEvents: function(eventTriggerDetails) {
    var allEvents = [];
    eventTriggerDetails.forEach(function(obj){
      allEvents.push({"id":obj.eventTriggerId});
    });
    return allEvents;
  },

  getSelectedProfiles : function(profileDetails){
    let profiles = [];
    profileDetails.forEach(function(obj){
      profiles.push({"id" : obj.profileId});
    });
    return profiles;
  },

  getSelectedChannels : function(channelTypes){
    let channels = [];
    channelTypes.forEach(function(obj){
      channels.push({"type" : obj});
    });
    return channels;
  },

  getPopupBannersFromOnlineContent : function(onlineContents){
    var popupBanners = onlineContents.filter(function(data) {
      return data.placeholderIdentifier === "POPUP";
    });
    return popupBanners;
  },

  removePopupBannersFromOnlineContent : function(onlineContents){
    onlineContents = onlineContents.filter(function(data) {
      return data.placeholderIdentifier !== "POPUP";
    });
    return onlineContents;
  },                           

  updateCampaign: function(isCopy) {
    var rowIndex = this.view.segCampaigns.selectedRowIndex[1] ;
    var campaignObj = this.view.segCampaigns.data[rowIndex];
    var campaignData = {"campaignId" : campaignObj.campaignId, "campaignName" : campaignObj.name, 
                        "campaignDescription" : campaignObj.lblDescription.text, "objectiveType" : campaignObj.objectiveType,
                        "productId" : campaignObj.productId, "productGroupId" : campaignObj.productGroupId,
                        "campaignPriority" : campaignObj.priority.toString(), "campaignStatus": campaignObj.campaignStatus,
                        "startDate" : campaignObj.lblStartDateTime.text.replace(/\//g,"-"), "endDate" : campaignObj.lblEndDateTime.text.replace(/\//g,"-"),
                        "channelTypes" : campaignObj.channelType, "eventTriggerDetails" : campaignObj.eventTriggerDetails,
                        "profileDetails" : campaignObj.profileDetails, "channelDetails" : campaignObj.channelDetails,
                        "onlineContents" : this.removePopupBannersFromOnlineContent(campaignObj.onlineContent), "offlineTemplates" : campaignObj.offlineTemplate, "popupBanners" : this.getPopupBannersFromOnlineContent(campaignObj.onlineContent)
                       };
    this.presenter.setCurrentCampaignFilter(this.getCurrentFilterPayload());
    this.presenter.editCampaign(campaignData,isCopy);
  },

  changeVisibility: function(){
    let change = this.view.flxDefaultAdCampaign.isVisible === true ? true : false;
    this.view.flxOptions.setVisibility(!change);
    this.view.flxOptionsDefault.setVisibility(change);
  },

  setDefaultSettingsForViewDetails: function(){
    let scopeObj = this;
    //Initially TAB2 will be highlighted
    scopeObj.tabUtilLabelFunction([scopeObj.view.lblTargetCustomerRoles, scopeObj.view.lblOffline, scopeObj.view.lblAdSpecifications,scopeObj.view.lblPopupAd], scopeObj.view.lblTargetCustomerRoles);
    this.view.flxTargetCustomerRolesData.isVisible = true;
    this.view.flxOfflineChannelsData.isVisible = false;
    this.view.flxChannelsDataFlowVertical.isVisible = false;
    scopeObj.view.flxInAppPopupSection.isVisible = false;
    this.view.flxTab2.setVisibility(true);
    this.view.flxTab3.setVisibility(true);
    this.view.flxTab1.setVisibility(true);
    this.view.lblNoAd.setVisibility(false);
    this.view.flxTargetDatasets.setVisibility(true);
    this.view.flxEventsData.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxHeaderSeperator.setVisibility(false);

    this.view.flxViewDetails.isVisible = true;
    this.view.flxListing.isVisible = false;

    this.view.lblIconRightArrow.isVisible = true;
    this.view.lblIconDownArrow.isVisible = false;
    this.view.flxSelectOptions.setVisibility(false);

    this.view.flxSettings.setVisibility(false);
  },

  setBreadCrumb: function(campaign_name){
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.AdCampaignListCAPS");
    this.view.breadcrumbs.lblCurrentScreen.text = campaign_name.toUpperCase();
  },

  findProductNameAndGroup: function(items){
    var scopeObj = this;
    scopeObj.view.lblProductGroup.text = items.productGroupDisplayName;
    for(let i=0;i<items.products.length;i++){
      if(items.products[i].productId===this.productIdGlobal){
        scopeObj.view.lblProductName.text = items.products[i].productName;
        this.productIdGlobal = null;
        break;
      }
    }
  },

  //Function to be called on onRowClick of Segment on Page 1
  displayDetails: function(campaignDetailsTop){
    let scopeObj = this;
    this.setDefaultSettingsForViewDetails();
    this.setBreadCrumb(campaignDetailsTop.name);
    this.view.flxFirstLine.isVisible = true;
    this.view.flxSecondLineGroup.isVisible = true;
    this.view.flxDefaultAdCampaign.isVisible = false;
    this.view.flxCampaignStatus.setVisibility(true);
    this.view.flxDescriptionBody.setVisibility(false);
    this.view.flxStatus.setVisibility(true);
    this.view.lblCampaignNameSelected.text = campaignDetailsTop.name;
    this.view.lblStartDate.text = campaignDetailsTop.lblStartDateTime.text;
    this.view.lblEndDate.text = campaignDetailsTop.lblEndDateTime.text;
    this.view.lblPriority.text = campaignDetailsTop.lblPriority.text;
    this.view.lblDescription.text = campaignDetailsTop.lblDescription.text;
    this.view.lblCampaignStatus.text = campaignDetailsTop.lblStatus.text;
    this.view.lblAdType.text = campaignDetailsTop.objectiveType;
    this.view.lblChannels.text = campaignDetailsTop.channelType.join();
    //scopeObj.view.flxMarketingLine.isVisible = campaignDetailsTop.objectiveType==="Marketing" ? true : false;
    scopeObj.view.flxMarketingLine.isVisible = (campaignDetailsTop.objectiveType==="Marketing" || (campaignDetailsTop.productId!=="N/A" && campaignDetailsTop.productGroupId!=="N/A")) ? true : false;
    this.view.lblFontIconStatusImg.text = this.getCampaignStatusIcon(campaignDetailsTop.lblStatus.text);
    this.view.lblFontIconStatusImg.skin = this.getCampaignStatusIconSkin(campaignDetailsTop.lblStatus.text);
    this.changeVisibility();
    this.view.flxOptions.setVisibility(!(campaignDetailsTop.lblStatus.text=="Terminated"||campaignDetailsTop.lblStatus.text=="Completed"));
    this.presenter.setCurrentCampaignFilter(this.getCurrentFilterPayload());
    this.view.forceLayout();
  },

  //Function to be called when user Clicks on "Default Ad Campaign"
  displayDefaultAdDetails: function(){
    this.setDefaultSettingsForViewDetails();
    this.setBreadCrumb(kony.i18n.getLocalizedString("i18n.frmAdManagement.DefaultCampaignCAPS"));
    this.isDefault = true;
    this.view.flxFirstLine.isVisible = false;
    this.view.flxSecondLineGroup.isVisible = false;
    this.view.flxDefaultAdCampaign.isVisible = true;
    this.view.flxCampaignStatus.setVisibility(true);
    this.view.flxStatus.setVisibility(false);
    this.view.lblCampaignNameSelected.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.DefaultAdCampaign");
    //tab and screen visibility handling for default campaign 
    this.view.flxTab2.setVisibility(false);
    this.view.flxTab3.setVisibility(false);
    this.view.flxTab1.setVisibility(true);
    this.tabUtilLabelFunction([this.view.lblTargetCustomerRoles, this.view.lblOffline, this.view.lblAdSpecifications], this.view.lblAdSpecifications);
    this.view.flxChannelsDataFlowVertical.setVisibility(true);
    this.view.flxTargetCustomerRolesData.setVisibility(false);
    this.view.flxOfflineChannelsData.setVisibility(false);
    this.view.flxInAppPopupSection.setVisibility(false);

    this.changeVisibility();
    this.presenter.setCurrentCampaignFilter(this.getCurrentFilterPayload());
    this.presenter.getAllDefaultCampaigns();
    this.view.forceLayout();
  },

  setDisplayImageDimensions: function(width){
    var scopeObj = this;
    if(width<600){
      scopeObj.view.flxDisplayImage.left = "21.96%";
      scopeObj.view.flxDisplayImage.right = "21.96%";
    }
    else if(width<800){
      scopeObj.view.flxDisplayImage.left = "14.64%";
      scopeObj.view.flxDisplayImage.right = "14.64%";
    }
    else{
      scopeObj.view.flxDisplayImage.left = "7.32%";
      scopeObj.view.flxDisplayImage.right = "7.32%";
    }
  },

  setUploadedImage: function(resWidth,resHeight,imgWidth,imgHeight,link){
    var scopeObj = this;

    scopeObj.view.lblTargetResolution.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.TargetedContainerResolution") + " : " + resWidth + "*" + resHeight + " | ";
    scopeObj.view.lblUploadedResolution.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.UploadedImageResolution") + " : " + imgWidth + "*" + imgHeight;
    scopeObj.view.flxBorder.width = resWidth;
    scopeObj.view.flxBorder.height = resHeight;
    scopeObj.view.richTextAdImage.text = "<img src=\""+link+"\" alt=\"Image\">";
    scopeObj.view.flxImage.width = imgWidth + 6 + "px";
    scopeObj.view.flxImage.height = imgHeight + 36 + "px";
  },

  setAdjustedImage: function(resWidth,resHeight,imgWidth,imgHeight,link){
    var scopeObj = this;
    scopeObj.view.flxBorder2.width = resWidth;
    scopeObj.view.flxBorder2.height = resHeight;
    scopeObj.view.richTextAdImage2.text = "<img src=\""+link+"\" alt=\"Image\" width=\""+resWidth+"\" height=\""+resHeight+"\">";
    scopeObj.view.flxImage2.width = parseInt(resWidth) + 6 + "px";
    scopeObj.view.flxImage2.height = parseInt(resHeight) + 36 + "px";
  },

  displayImage: function(link,resolution){
    var scopeObj = this;
    var img = new Image();
    img.onload = function(){
      var resWidth = resolution.substring(0, resolution.indexOf("x"));
      var resHeight = resolution.substring(resolution.indexOf("x") + 1, resolution.length);
      scopeObj.setUploadedImage(resWidth,resHeight,img.width,img.height,link);
      scopeObj.setAdjustedImage(resWidth, resHeight, img.width, img.height,link);
      var width = img.width>parseInt(resWidth) ? img.width : parseInt(resWidth);
      scopeObj.setDisplayImageDimensions(width);
      scopeObj.view.flxScreenName.width = scopeObj.view.lblScreenName.text.length*8 + 109 + "px"; //(49 + 60)
      scopeObj.view.flxChannelName.left = scopeObj.view.flxScreenName.width;
      if(img.width===parseInt(resWidth) && img.height===parseInt(resHeight)){
        scopeObj.view.flxMessageColor.skin = "sknFlx1FB44DBackground";
        scopeObj.view.flxMessage.skin = "sknFlx1FB44DBorder2px";
        scopeObj.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.UploadedImageMatchesTheContainer");
        scopeObj.view.lblStatus.text = "\ue94f";
      } else {
        scopeObj.view.flxMessageColor.skin = "sknFlxCF9C37Background";
        scopeObj.view.flxMessage.skin = "sknFlxCF9C37Border2px";
        scopeObj.view.lblMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.UploadedImageResolutionWasAdjustedToFitTheContainer");
        scopeObj.view.lblStatus.text = "\ue94c";
      }
      scopeObj.view.flxViewAdPreview.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    img.src = link;
  },

  openSourceURL: function(widgetId, context){
    let scopeObj = this;
    let data = context.widgetInfo.selectedRowItems;
    var link = data[0].lblImgSourceURL.tooltip ==="" ? data[0].lblImgSourceURL.text :data[0].lblImgSourceURL.tooltip; 
    scopeObj.view.lblChannelName.text = context.widgetInfo.parent.parent.parent.parent.parent.lblHeader.text;
    scopeObj.view.lblScreenName.text = context.widgetInfo.parent.parent.lblScreenName.text;
    scopeObj.displayImage(link,data[0].lblResolution.text);
  },

  openTargetURL: function(widgetId, context){
    let data = context.widgetInfo.selectedRowItems;
    var link = data[0].lblTargetURL.tooltip ==="" ? data[0].lblTargetURL.text :data[0].lblTargetURL.tooltip; 
    window.open(link);
  },

  // For enabling onClick, tooltip and trimText of URL.
  mappingCampaignsURLData: function(onlineDataContents, isDefault) {
    let scopeObj = this;
    let segData = onlineDataContents.map(function(data){
      let breakPoint;
      let URLlength = "imageIndex" in data ? 24 : 42;
      if(data.imageScale[1]!='x'){
        if(data.imageScale=="640")
          breakPoint = kony.i18n.getLocalizedString("i18n.frmAdManagement.Mobile");
        else if(data.imageScale=="1024")
          breakPoint = kony.i18n.getLocalizedString("i18n.frmAdManagement.Tablet");
        else if(data.imageScale=="1366")
          breakPoint = kony.i18n.getLocalizedString("i18n.frmAdManagement.Desktop");
      }
      return {
        lblResolution: {
          text: data.imageResolution
        },
        flxImgSourceURL: {
          onClick: data.imageURL !== "" ? scopeObj.openSourceURL : undefined,
          skin: data.imageURL !== "" ? "sknFlxffffffCursorPointer" : "slFbox"
        },
        flxImgTargetURL: {
          onClick: data.targetURL !== "" ? scopeObj.openTargetURL : undefined,
          skin: data.targetURL !== "" ? "sknFlxffffffCursorPointer" : "slFbox"
        },
        lblImgSourceURL: {
          text: scopeObj.trimSegText(data.imageURL, URLlength),
          tooltip: data.imageURL.length > URLlength ? data.imageURL : ""
        },
        lblTargetURL: {
          text: scopeObj.trimSegText(data.targetURL, URLlength),
          tooltip: data.targetURL.length > URLlength ? data.targetURL : ""
        },
        lblImageContainerNameScale: {
          text: data.imageScale[1]=='x' ? "Carousel Image_" + data.imageIndex + " - " + data.imageScale : breakPoint
        },
        template : isDefault ? "flxDetailsDefaultURLs" : "flxDetailsURLs"
      };
    });
    return segData;
  },

  sortDataByimageIndex: function(data){
    data.sort(function(a, b) {
      return parseInt(a.imageIndex) - parseFloat(b.imageIndex);
    });
    return data;
  },

  showGroupAttributes: function(data, profName, profDesc, numberOfUsers){
    var scopeObj = this;
    if(scopeObj.allDatasets === undefined) {
      scopeObj.presenter.getAttributesForViewDetails(data, profName, profDesc, numberOfUsers);
    } else {
      scopeObj.view.lblCustomerRoleName.text = profName + " " + kony.i18n.getLocalizedString("i18n.frmAdManagement.AttributesList");
      scopeObj.view.lblAttributeDescription.text = profDesc ;
      scopeObj.view.lblAttributeUserAvailable.text = numberOfUsers || "N/A";
      scopeObj.attributesList = scopeObj.populateAttributesList(data);
      scopeObj.view.segAttributeList.widgetDataMap = {"flxAttributeRow": "flxAttributeRow",
                                                      "lblAttribute": "lblAttribute",
                                                      "lblCriteria": "lblCriteria",
                                                      "lblDataset": "lblDataset",
                                                      "lblValue": "lblValue"
                                                     };
      scopeObj.statusFilterSelection = [];
      scopeObj.view.segAttributeList.setData(scopeObj.attributesList);
      scopeObj.view.flxViewAttributeList.setVisibility(true);
      scopeObj.view.forceLayout();
      scopeObj.view.segAttributeList.height = (scopeObj.view.flxAttributesList.frame.height - 54) + "dp";
    }
  },

  populateAttributesList: function(profileConditions){
    var scopeObj = this;
    var attrList = [];
    let datasets = [];
    profileConditions.forEach(function(cond){
      let datasetDetails = scopeObj.allDatasets[cond.dataContextId.replace(/_/g,"")];
      if(datasetDetails) {
        let datasetName = datasetDetails.name;
        datasets.push({
          lblDescription : datasetName,
          imgCheckBox:{"src":"checkboxselected.png"}
        });
        let attributesMap = datasetDetails.attributes;
        let expressions = unescape(cond.conditionExpression).split(" and ");
        expressions.forEach(function(exp){
          let endIndex = exp.indexOf(" ");
          let attrId = exp.substring(0,endIndex);
          let attributeObj = attributesMap[attrId];
          exp = exp.replace(attrId, "").trim();
          endIndex = exp.indexOf(" ");
          let criteriaKey = exp.substring(0,endIndex);
          exp = exp.replace(criteriaKey, "").trim();
          let value = exp.substring(1,exp.length-1);
          attrList.push({
            "lblAttribute": attributeObj.name,
            "lblCriteria": kony.i18n.getLocalizedString(attributeObj.criterias[criteriaKey]),
            "lblDataset": datasetName,
            "lblValue": attributeObj.type === "SELECT" ? (kony.i18n.getLocalizedString(attributeObj.options[value]) ? kony.i18n.getLocalizedString(attributeObj.options[value]) : value) : value
          });
        });
      }
    });
    scopeObj.view.viewAttributesFilter.setVisibility(false);
    scopeObj.view.viewAttributesFilter.segStatusFilterDropdown.setData(datasets);
    return attrList;
  },

  /**
   *  Method to display the Attributes List from the ViewDetails Page
   */
  showAttributesList: function(data){
    this.showGroupAttributes(data.profileConditions, data.profileName, data.profileDescription, data.numberOfUsers);
  },

  sortCustomerRolesViewDetails: function(sortColumn){
    var self = this;
    var segData = self.view.segTargetCustomerRoles.data;
    self.sortBy.column(sortColumn);
    var segDataSorted = segData.sort(this.sortBy.sortData);
    self.determineSortFontIcon(this.sortBy, "lblRoleName.text", this.view.fontIconRoleName);
    self.determineSortFontIcon(this.sortBy, "lblUsersHeader.text", this.view.fontIconSortUsers);
    self.view.segTargetCustomerRoles.setData(segDataSorted);
  },

  mappingCustomerRolesData: function(data){
    var scopeObj = this;
    return {
      profileId: data.profileId,
      profileName: data.profileName,
      profileDescription: data.profileDescription,
      profileConditions: data.profileConditions,
      lblRoleName: {
        text: this.trimSegText(data.profileName, 25),
        tooltip: data.profileName,
        skin: "sknlblLato696c7313px",
        left: "32dp"
      },
      lblRoleDescription: {
        text: data.profileDescription,
        skin: "sknlblLato696c7313px",
        left: "24%"
      },
      lblAttributes: {
        text: kony.i18n.getLocalizedString("i18n.frmAdManagement.View"),
        "onClick" : function(){
          scopeObj.showAttributesList(scopeObj.view.segTargetCustomerRoles.selectedItems[0]);
        }
      },
      flxAttributesContainer:{
        left: "84%"
      },
      lblUserCount : {
        "text" : data.numberOfUsers ? data.numberOfUsers : kony.i18n.getLocalizedString("i18n.common.NA"),
        skin: "sknlblLato696c7313px",
        left: "66%"
      }
    };
  },

  /*For Populating data for View Details Page.
  */
  populateTargetCustomerRoles: function(data){
    var scopeObj = this;
    scopeObj.view.segTargetCustomerRoles.setVisibility(true);
    scopeObj.view.flxAttributesHeader.setVisibility(true);
    scopeObj.view.fontIconRoleName.setVisibility(true);
    let customerRolesData = data.map(this.mappingCustomerRolesData);
    let hasData = customerRolesData.length > 0;
    scopeObj.view.segTargetCustomerRoles.setData(customerRolesData);
    scopeObj.view.flxTargetDatasets.setVisibility(hasData);
    scopeObj.view.lblNoAd.setVisibility(!hasData);
  },

  populateEventsData: function(eventsData){
    let scopeObj = this;
    scopeObj.populateInternalEvents(eventsData.filter(x => x.eventTriggerType.toUpperCase() === "INTERNAL"));
    scopeObj.populateExternalEvents(eventsData.filter(x => x.eventTriggerType.toUpperCase() === "EXTERNAL"));
    scopeObj.populatePopupEvents(eventsData.filter(x => x.eventTriggerType.toUpperCase() === "POPUP"));
  },

  populateInternalEvents : function(data){
    var widgetMap = {
      "lblEvent":"lblEvent",
      "lblEventCode":"lblEventCode",
      "lblEventSource":"lblEventSource",
      "flxDelete":"flxDelete",
      "lblDelete":"lblDelete",
      "lblSeparator":"lblSeparator",
      "flxEventsView":"flxEventsView"
    };
    let scopeObj = this;
    let intEvents = data.map(scopeObj.mapEventsData);
    let hasInternalEventsData = intEvents.length > 0;
    scopeObj.view.viewInternalEvents.segEvents.widgetDataMap = widgetMap;
    scopeObj.view.viewInternalEvents.segEvents.setData(intEvents);
    scopeObj.view.viewInternalEvents.lblEventsHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.internalEvents") + " (" + intEvents.length + ")";
    scopeObj.view.viewInternalEvents.fontIconEventsExpandCollapse.text = "\ue915";
    scopeObj.view.viewInternalEvents.segEvents.setVisibility(hasInternalEventsData);
    scopeObj.view.viewInternalEvents.flxEventsSegHeader.setVisibility(hasInternalEventsData);
    scopeObj.view.viewInternalEvents.flxNoResultFound.setVisibility(!hasInternalEventsData);
  },

  populateExternalEvents : function(data){
    var widgetMap = {
      "lblEvent":"lblEvent",
      "lblEventCode":"lblEventCode",
      "lblEventSource":"lblEventSource",
      "flxDelete":"flxDelete",
      "lblDelete":"lblDelete",
      "lblSeparator":"lblSeparator",
      "flxEventsView":"flxEventsView"
    };
    let scopeObj = this;
    let extEvents = data.map(scopeObj.mapEventsData);
    let hasExternalEventsData = extEvents.length > 0;
    scopeObj.view.viewExternalEvents.segEvents.widgetDataMap = widgetMap;
    scopeObj.view.viewExternalEvents.segEvents.setData(extEvents);
    scopeObj.view.viewExternalEvents.lblEventsHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.externalEvents") + " (" + extEvents.length + ")";
    scopeObj.view.viewExternalEvents.fontIconEventsExpandCollapse.text = "\ue915";
    scopeObj.view.viewExternalEvents.segEvents.setVisibility(hasExternalEventsData);
    scopeObj.view.viewExternalEvents.flxEventsSegHeader.setVisibility(hasExternalEventsData);
    scopeObj.view.viewExternalEvents.flxNoResultFound.setVisibility(!hasExternalEventsData);
  },

  populatePopupEvents : function(data){
    let scopeObj = this;
    let webEvents = data.filter(x => x.eventSource.toUpperCase() === "WEB").map(function(event) {
      return {
        "eventId": event.eventTriggerId,
        "lblEvent": { 
          text: event.eventName,
          left: "0dp"
        },
      };
    });
    let hasWebPopupEvents = webEvents.length > 0;
    scopeObj.view.viewPopupEvents.flxSegWEB.setVisibility(hasWebPopupEvents);
    scopeObj.view.viewPopupEvents.segEventsWEB.setData(webEvents);

    let mobileEvents = data.filter(x => x.eventSource.toUpperCase() === "MOBILE").map(function(event) {
      return {
        "eventId": event.eventTriggerId,
        "lblEvent": { 
          text: event.eventName,
          left: "0dp"
        },
      };
    });
    let hasMobilePopupEvents = mobileEvents.length > 0;
    scopeObj.view.viewPopupEvents.flxSegMOB.setVisibility(hasMobilePopupEvents);
    scopeObj.view.viewPopupEvents.segEventsMOB.setData(mobileEvents);
    scopeObj.view.viewPopupEvents.lblSeparator2.setVisibility(hasWebPopupEvents && hasMobilePopupEvents);

    let hasData = hasWebPopupEvents || hasMobilePopupEvents;
    scopeObj.view.viewPopupEvents.flxSegData.setVisibility(hasData);
    scopeObj.view.viewPopupEvents.flxEventsSegHeader.setVisibility(hasData);
    scopeObj.view.viewPopupEvents.flxNoResultFound.setVisibility(!hasData);
    scopeObj.view.viewPopupEvents.fontIconEventsExpandCollapse.text = "\ue915";
  },

  mapEventsData : function(obj){
    obj.lblEvent = {
      text: obj.eventName
    };
    obj.lblDelete = {
      text: "\ue91b",
      skin: "sknIcon20px",
    };
    obj.lblSeparator = "lblSeparator",
      obj.flxEventsView = "flxEventsView",
      obj.flxDelete = "flxDelete",
      obj.lblEventSource = {
      text: obj.eventSource 
    };
    obj.lblEventCode = {
      text: obj.eventCode 
    };
    return obj;
  },

  populateOfflineChannels: function(offlineData){
    var scopeObj = this;
    let offlineCount = 1;
    scopeObj.view.flxOfflineChannelsData.removeAll();
    scopeObj.offlineChannelSequence.forEach(function(channelType){
      offlineData.forEach(function(offlineTemplate,index){
        if(channelType.toUpperCase() === offlineTemplate.channelSubType.toUpperCase()){
          let isEmail = offlineTemplate.channelSubType.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Email_Content_Caps");
          var viewOfflineChannelDetails = new com.adminConsole.adManagement.viewOfflineChannelDetails({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": offlineTemplate.channelSubType.replace(/ /g,""),
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "left": "0dp",
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "top": "10dp",
            "width": "100%",
            "overrides": {
              "lblChannelArrow" : {
                "onClick" : function(eventobject){
                  let parent = eventobject.parent.parent.parent.parent ;
                  parent.showOrHideContent(parent);
                }
              },
              "lblHeader" : {
                "text": channelType
              },
              "btnPreview" : {
                "isVisible" : isEmail,
                "onClick" : function(eventobject){
                  let parent = eventobject.parent.parent.parent
                  scopeObj.viewEmailPreview(parent);
                  scopeObj.view.flxEmailPreview.setVisibility(true);
                }
              },
              "lblSubjectHeader" : {
                "isVisible" : isEmail
              },
              "lblSubject" : {
                "text" : isEmail ? window.atob(offlineTemplate.subject) : window.atob(offlineTemplate.messageContent)
              },
              "lblDescHeader" : {
                "isVisible" : isEmail
              },
              "rtxDesc" : {
                "isVisible" : isEmail,
                "text" : isEmail ? window.atob(offlineTemplate.messageContent) : ""
              },
              "flxOfflineSection" : {
                "bottom" : (offlineCount === offlineData.length) ? "20dp" : "0dp"
              }
            }
          }, {
            "overrides": {}
          }, {
            "overrides": {}
          });
          offlineCount++;
          scopeObj.view.flxOfflineChannelsData.add(viewOfflineChannelDetails);
        }
      });
    });
    let childrenLength = scopeObj.view.flxOfflineChannelsData.children.length;
    if(childrenLength > 0){
      scopeObj.view.flxOfflineChannelsData[scopeObj.view.flxOfflineChannelsData.children[childrenLength-1]].flxOfflineSection.bottom = "20dp";
    }
  },

  viewEmailPreview: function(parentOject){
    let scopeObj = this;
    scopeObj.view.lblSubject1.text = parentOject.lblSubject.text;
    let str  = parentOject.rtxDesc.text.replace(/"/g, "").replace(/<a href=[a-zA-Z0-9-/:._$@#%^&*+=(){}[\]]*\.(jpg|jpeg|png|gif|bmp|svg) class=>/g,"").replace(/<\/a>/g,"");
    let reg1 = /([a-zA-Z0-9-/:._$@#%^&*+=(){}[\]]*\.(jpg|jpeg|png|gif|bmp|svg))/g;	//regex for Image URL
    let arr = str.match(reg1);	//store all Image URLs given in the Email Content
    let cnt = 0;
    let finalString = ((arr===null)||(arr.length === 0)) ? str : str.replace(reg1,function($0){
      if(cnt===arr.length) cnt = 0;
      return "<img src=\"" + arr[cnt++] +"\" alt=\"Image Format should be jpg/jpeg/gif/png/bmp/svg\">";
    });
    finalString=finalString.replace("<","\u003c").replace(">","\u003e").replace("&","&amp").replace("=","&eq").replace("alert","").replace("marquee","").replace("<","&lt").replace(">","&gt");
     var searchText=finalString.split(">");
      finalString = searchText.join("&gt");
      searchText = finalString.split("<");
      finalString = searchText.join("&lt");
    scopeObj.view.rtxEmailDescPreview.text = finalString;
  },

  showToastMsg : function(status, message){
    if (status === "success") {
      this.view.toastMessage.showToastMessage(message, this);
    } 
    else {
      this.view.toastMessage.showErrorToastMessage(message, this);
    }
  },

  copyCampaign : function(){
    var scopeObj = this;
    scopeObj.updateCampaign(true);
  },

  toggleSettings : function(){
    var scopeObj = this;
    var isVisible = scopeObj.view.settingsMenu.isVisible ;
    scopeObj.view.settingsMenu.setVisibility(!isVisible);
    scopeObj.view.settingsMenu.onHover = this.onHoverEventCallbackStatus;
  },

  showPostLoginSettings : function(){
    var scopeObj = this;
    if(scopeObj.isPostLoginAdSettingsEnabled === undefined) {
      scopeObj.presenter.getCampaignSettings();
    } else {
      scopeObj.view.settingsMenu.setVisibility(false);
      scopeObj.view.postLoginSettingspopup.switchShowAd.selectedIndex = scopeObj.isPostLoginAdSettingsEnabled ? 0 : 1 ;
      scopeObj.view.flxAdManagementPopUp.setVisibility(true);
      scopeObj.view.postLoginSettingspopup.setVisibility(true);
      scopeObj.view.forceLayout();
    }
  },

  closePopup : function() {
    var scopeObj = this;
    scopeObj.view.flxAdManagementPopUp.setVisibility(false);
    scopeObj.view.popUp.setVisibility(false);
    scopeObj.view.postLoginSettingspopup.setVisibility(false);
  },

  sortAttributes : function() {
    var scopeObj = this;  
    var sortOrder = (scopeObj.sortBy) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter('lblAttribute');
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    scopeObj.getObjectSorter().column('lblAttribute');
    var data = scopeObj.view.segAttributeList.data.sort(scopeObj.sortBy.sortData);
    scopeObj.view.segAttributeList.setData(data);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,'lblAttribute',scopeObj.view.lblSortAttribute);
  },

  filterDatasets : function(description){
    let scopeObj = this;
    let datasetIndex = scopeObj.statusFilterSelection.indexOf(description);
    if(datasetIndex === -1) { // dataset selected 
      scopeObj.statusFilterSelection.push(description);
    } else { // dataset unselected 
      scopeObj.statusFilterSelection.splice(datasetIndex,1);
    }
    let filterlen = scopeObj.view.viewAttributesFilter.segStatusFilterDropdown.data.length;
    let selFilterLen = scopeObj.statusFilterSelection.length;
    if(selFilterLen === 0 || selFilterLen === filterlen){ 
      // if all options are selected  OR no options are selected
      scopeObj.view.segAttributeList.setData(scopeObj.attributesList);
    } else {
      // if some of the filters are selected
      let data = [];
      scopeObj.attributesList.forEach(function(obj){
        if(scopeObj.statusFilterSelection.indexOf(obj.lblDataset.toUpperCase()) !== -1){
          data.push(obj);
        }
      });
      scopeObj.view.segAttributeList.setData(data);
    }
  },

  populateOnlineChannelData : function(onlineContent, isDefault){
    var scopeObj = this;
    scopeObj.view.flxChannelsDataFlowVertical.removeAll();
    for(var channel in scopeObj.onlineChannelSequence){
      let hasData = false;
      var viewOnlineChannelDetails = new com.adminConsole.adManagement.viewOnlineChannelDetails({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": channel,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "skin": "slFbox",
        "top": "0dp",
        "width": "100%",
        "overrides": {
          "lblHeader" : {
            "text" : scopeObj.onlineChannelSequence[channel]
          },
          "flxChannelArrow" : {
            "onClick" : function(eventObject){
              let parent = eventObject.parent.parent.parent
              parent.showOrHideContent(parent);
            }
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      for(var module in scopeObj.moduleSequence) {
        var data = onlineContent.filter( x =>  x.channelSubType === channel  && x.placeholderIdentifier === module );
        if(data.length > 0) {
          hasData = true; 
          var channelScreen = new com.adminConsole.adManagement.channelScreen({
            "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
            "clipBounds": true,
            "id": channel+module.replace(/_/g, ""),
            "isVisible": true,
            "layoutType": kony.flex.FLOW_VERTICAL,
            "left": "0dp",
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "isModalContainer": false,
            "skin": "sknBackgroundFFFFFF",
            "top": "0dp",
            "width": "100%",
            "overrides": {
              "lblScreenName" : {
              "text" : scopeObj.moduleSequence[module]
              },
              "segCampaignsData" : {
              "widgetDataMap": {
                  "flxDetailsURLs": "flxDetailsURLs",
                  "flxDetailsURLsParent": "flxDetailsURLsParent",
                  "flxImgSourceURL": "flxImgSourceURL",
                  "flxImgTargetURL": "flxImgTargetURL",
                  "flxResolution": "flxResolution",
                  "lblImgSourceURL": "lblImgSourceURL",
                  "lblResolution": "lblResolution",
                  "lblTargetURL": "lblTargetURL",
                  "flxDetailsDefaultURLs" : "flxDetailsDefaultURLs",
                  "flxImageContainerNameScale" : "flxImageContainerNameScale",
                  "lblImageContainerNameScale" : "lblImageContainerNameScale"
              },
              "data" : scopeObj.mappingCampaignsURLData(data, isDefault)
          	},
            "flxDefTableHeader" : {
              "isVisible" : isDefault
            },
            "flxTableHeader" : {
              "isVisible" : !isDefault
            }
      	  }
        }, {
          "overrides": {}
        }, {
          "overrides": {}
        });
        viewOnlineChannelDetails.flxContent.add(channelScreen);
       }
      }
      if(hasData) {
        scopeObj.view.flxChannelsDataFlowVertical.add(viewOnlineChannelDetails);
      }
      }
      let childrenLength = scopeObj.view.flxChannelsDataFlowVertical.children.length;
      if(childrenLength > 0){
        scopeObj.view.flxChannelsDataFlowVertical[scopeObj.view.flxChannelsDataFlowVertical.children[childrenLength-1]].flxOnlineSection.bottom = "20dp";
      } else {
        var lblNoInAppChannels = new kony.ui.Label({
          "centerX": "50%",
          "height": "30dp",
          "id": "lblNoInAppChannels",
          "isVisible": true,
          "skin": "sknLblLato485c7513px",
          "text": "No In AppChannels Found",
          "top": "50dp",
          "width": kony.flex.USE_PREFFERED_SIZE,
          "zIndex": 1
        }, {
          "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {});
        scopeObj.view.flxChannelsDataFlowVertical.add(lblNoInAppChannels);
      }
	},

  populateInAppPopupData : function(onlineContent){
    let scopeObj = this;
    let hasInAppPopupData = false;
    scopeObj.view.flxInAppPopupContent.removeAll();
    for(let channel in scopeObj.inAppPopupChannelSequence){
      let isWeb = (channel === "WEB");
      var data = onlineContent.filter( x =>  x.placeholderIdentifier === scopeObj.popupPlaceholder  && x.channelSubType === channel );
      let hasData = data.length > 0 ;
      hasInAppPopupData = hasInAppPopupData || hasData;
      var popupCampaign = new com.adminConsole.adManagement.viewPopupAdDetails({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": scopeObj.inAppPopupChannelSequence[channel],
        "isVisible": isWeb,
        "layoutType": kony.flex.FREE_FORM,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "skin": "sknBackgroundFFFFFF",
        "top": "0dp",
        "width": "100%",
        "overrides": {
          "lblBannerValue" : {
            "text" : hasData ? data[0].targetURL : "",
            "skin" : "sknLblLato13px117eb0Cursor",
            "onClick" : function(eventObject){
              window.open(eventObject.text.trim());
            }
          },
          "lblTargetValue" : {
            "text" : hasData ? data[0].callToActionTargetURL : "",
            "skin" : "sknLblLato13px117eb0Cursor",
            "onClick" : function(eventObject){
              window.open(eventObject.text.trim());
            }
          },
          "lblHeading" : {
            "text" : hasData ? data[0].bannerTitle : "",
            "skin" : isWeb ? "sknLabel003e7540px" : "sknLabel003e7524px"
          },
          "lblmessage" : {
            "text" : hasData ? data[0].bannerDescription : "",
            "skin" : isWeb ? "sknLabel42424220px" : "sknLabel42424215px"
          },
          "imgCampaign" : {
            "src" : hasData ? data[0].imageURL : "",
            "height" : isWeb ? "323px" : "175px"
          },
          "btnYes" : {
            "text" : hasData ? data[0].callToActionButtonLabel : "",
            "skin" : "sknBtnBg003e75fontfff15px3Rad",
            "width" : isWeb ? "30%" : "80%",
            "centerX" : isWeb ? "" : "50%",
          },
          "btnNo" : {
            "isVisible" : hasData && data[0].showReadLaterButton && data[0].showReadLaterButton.toUpperCase() === "TRUE",
            "skin" : "sknBtnBgffffont003e7515px3Rad",
            "width" : isWeb ? "30%" : "80%",
            "centerX" : isWeb ? "" : "50%",
            "top" : isWeb ? "0dp" : "10dp",
          },
          "lblcross" : {
            "isVisible" : hasData && data[0].showCloseIcon && data[0].showCloseIcon.toUpperCase() === "TRUE"
          },
          "lblNopopupDatafound" : {
            "isVisible" : !hasData
          },
          "flxContent" : {
            "isVisible" : hasData
          },
          "flxImageContainer" : {
            "width" : isWeb ? "560px" : "300px"
          },
          "flxButtons" : {
            "layoutType" : isWeb ? kony.flex.FLOW_HORIZONTAL : kony.flex.FLOW_VERTICAL,
            "reverseLayoutDirection" : isWeb
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      }); 
      if(isWeb)
        scopeObj.view.popupChannelWrapper.btnTab1.setVisibility(hasData);
      else{
        scopeObj.view.popupChannelWrapper.btnTab2.setVisibility(hasData);
      }
      scopeObj.view.flxInAppPopupContent.add(popupCampaign);
      scopeObj.view.flxTab4.setVisibility(hasInAppPopupData);
    }
    //setting tab skin and data in begining
    if(scopeObj.view.popupChannelWrapper.btnTab1.isVisible){
      scopeObj.view.popupChannelWrapper.btnTab1.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view.popupChannelWrapper.btnTab2.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    }
    else if(scopeObj.view.popupChannelWrapper.btnTab2.isVisible){
      scopeObj.view.popupChannelWrapper.btnTab2.skin = "sknBord7d9e0Rounded3px485c75";
      scopeObj.view[scopeObj.inAppPopupChannelSequence["MOBILE"]].isVisible = true;
    }  
  },

    manipulateChannelData : function(onlineContentsData) {
      let scopeObj = this;
      var sortedData = {};
      for (var channel in scopeObj.onlineChannelSequence) {
        var channelData = onlineContentsData.filter(x => x.channelSubType.toUpperCase() === channel);
        let channelObj = {}
        for (var module in scopeObj.moduleSequence) {
          let screenData = channelData.filter(x => x.placeholderIdentifier.toUpperCase() === module);
          if(screenData.length > 0)
            channelObj[module] = screenData;
        }
        if(Object.keys(channelObj).length > 0)
          sortedData[channel] = channelObj;
      }
      return sortedData;
    },

    encodeOnlineContents: function(data){
      let onlineContents = [];
        if(data){
          for(var i = 0; i < data.length; i++){
            let content = {};
            for(var key in data[i]){
              content[key] = data[i][key];
            }
            content.imageURL =content.imageURL? encodeURIComponent(content.imageURL) : "";
            content.targetURL =content.targetURL? encodeURIComponent(content.targetURL) : "";
            content.callToActionTargetURL =content.callToActionTargetURL? encodeURIComponent(content.callToActionTargetURL) : "";
            content.callToActionButtonLabel =content.callToActionButtonLabel ? encodeURIComponent(content.callToActionButtonLabel) : "";
            content.bannerTitle =content.bannerTitle ? encodeURIComponent(content.bannerTitle) : "";
            content.bannerDescription = content.bannerDescription ? encodeURIComponent(content.bannerDescription) : "";
            onlineContents.push(content);
          }
        }
        return onlineContents;
    },

});
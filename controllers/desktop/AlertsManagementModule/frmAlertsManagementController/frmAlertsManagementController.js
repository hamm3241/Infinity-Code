define({

  tab1: {},
  tab2: {},
  tab3: {},
  tab4: {},
  tabData: {},
  tab: [],
  defaultChannelList : [],
  selectedChannelList : [],
  globalVR: [],
  recentTabData: {
    "header": {},
    "data": {},
    "tabName": ""
  },
  currSubAlertSelected:"",
  alertGroupActionConfig :{
    CREATE:"CREATE",
    EDIT:"EDIT"
  },
  categoryTypeConfig :{
    ACCOUNTS: "ALERT_CAT_ACCOUNTS"
  },
  reorderAlert: false,
  activateDeactivate: "",
  alertGroupScreenContext : 1,
  subAlertScreenView: false,
  alertGroupCurrAction :"",
  reorderAlertIndex: 0,
  recentButton: {},
  recentButtonIndex: 0,
  radioNotSelected: "radio_notselected.png",
  radioSelected: "radio_selected.png",
  radioDisabled: "radio_disabled.png",
  checkboxselected : "checkboxselected.png",
  checkboxnormal : "checkboxnormal.png",
  checkbox :"checkbox.png",
  sPermDeactivate : kony.i18n.getLocalizedString("i18n.permission.Deactivate"),
  sPermActivate: kony.i18n.getLocalizedString("i18n.permission.Activate"),
  sDeactivate : kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.deactivate"),
  sActivate : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.activate"),
  sSubscription : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.subscription"),
  sDeactivateSubStatus : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Deactive_subscription_status"),
  sDeactivateAlertStatus : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Deactivate_alert_status"),
  sActiveSubStatus : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Active_subscription_status"),
  sActivateAlertStatus : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Activate_alert_status"),
  sNoLeaveAsIs : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NO_LEAVE_IT_AS_IT_IS"),
  sWriteDesc : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.WriteDescription"),
  sYesActivate : kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE"),
  sAlerts : kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Alerts"),
  sDeactivateRecord : kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Deactivate_Record"),
  sActive : kony.i18n.getLocalizedString("i18n.secureimage.Active"),
  sInActive : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
  sYesDeactivate : kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate"),
  sSuccess : kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"),
  sUpdateCaps: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UpdataCaps"),
  sAddName: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddName"),
  sLang: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Language"),
  sAlertContentTemplate: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AlertContentTemplate"),
  sNA : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NA"),
  sAll : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.All"),
  sSelected: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected"),
  sAlertCategoryInactive: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AlertCategoryInactive"),
  sAlertGroupInactive: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AlertGroupInactive"),
  selectedAlertId: null,
  cursorPoint:null,
  emailRtxData:null,
  supportedChannels:[],
  filterIndiciesArray: {
    "channel": [0, 1, 2],
    "status": [0, 1]
  },
  localeLanguages :[],
  searchFlag: false,
  searchResentTabData: [],
  prevIndex :-1,
  isSingleEntity : false,
  willUpdateUI: function(viewModel) {
    this.updateLeftMenu(viewModel);
    if(!viewModel)
      return;
    if (viewModel.reset) {
      this.resetUI();
    }
    if(viewModel.action === "masterData"){
      this.setMasterData(viewModel);
    }else if(viewModel.action === "masterDataLE"){
      this.setMasterDataLE(viewModel);
    } else if(viewModel.action === "setLegalEnity"){
      this.setViewLeDropdownData();
    } else if(viewModel.categoryList){
      this.categoryTabsData = viewModel.categoryList;
      this.resetUI();
      this.setAlertCategoryCards(viewModel.categoryList, viewModel.legalEntityId);
    } else if(viewModel.categoryDetail){
      this.view.lblViewDetailsCategoryDisplayName.info = {"categoryDetails":viewModel.categoryDetail};
      this.showAlertCategoryDetailScreen();
      this.setCategoryDetailData(viewModel.categoryDetail);
      this.setAlertGroupListData(viewModel.categoryDetail);
    } else if (viewModel.categoryActivateDecivate){
      this.setCategoryDetailsStatusLabel(viewModel.categoryActivateDecivate);
    } else if(viewModel.subAlertDetails){
      if(viewModel.action === "edit"){
        this.showEditSubAlert(viewModel.subAlertDetails);
      }else
        this.setSubAlertsView(viewModel.subAlertDetails);
    } else if(viewModel.alertDetails && viewModel.action === "viewDetails"){
        
        this.view.lblViewDetailsAlertDisplayName.info = {
          "alertGroupDetails": viewModel.alertDetails
        };
        this.setDataToAlertTypeDetailsScreen(viewModel.alertDetails);
        this.setSubAlertStatusFilterData();
        this.setSubAlertSegData();
        this.showAlertGroupDetailScreen();
        kony.adminConsole.utils.hideProgressBar(this.view);
    } else if(viewModel.alertDetails && viewModel.action === "edit"){
      this.showAddAlertGroupScreen();
      this.view.flxAlertTypesContextualMenu.setVisibility(false);
      this.view.flxOptions.skin = "slFbox";
      this.fillAlertGroupScreenForEdit(viewModel.alertDetails);
    }else if(viewModel.variableRef){
      this.setVariableReferenceSegmentData(viewModel.variableRef.alertContentFields);
    }else if(viewModel.alertCodes){
      this.setServiceTypeStatusData(viewModel.alertCodes.eventSubTypes);
    }else if(viewModel.alertDetails && viewModel.action === "statusChange"){
      this.activateDeactivateAlertGroup(viewModel.alertDetails);
      kony.adminConsole.utils.hideProgressBar(this.view);
    }else if(viewModel.alertDetails){

      this.view.lblViewDetailsAlertDisplayName.info = {
        "alertGroupDetails": viewModel.alertDetails
      };
    } else if(viewModel.categoryListBasedOnAccLevel){
      this.showReassignPopup(viewModel.categoryListBasedOnAccLevel);
    } else if(viewModel.progressBar){
      if (viewModel.progressBar.show) {
        kony.adminConsole.utils.showProgressBar(this.view);
      } else {
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    } else if(viewModel.toast){
      if(viewModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")){
        this.view.toastMessage.showToastMessage(viewModel.toast.message,this);
      }else if(viewModel.toast.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")){
        this.view.toastMessage.showErrorToastMessage (viewModel.toast.message,this);
      }
    } else if(viewModel.action === "hideCreateCategory"){
      this.resetUI();
    }
  },
  /*
  * sets master data to respective widgets
  */
  setMasterData: function(viewModel){
    if(viewModel.appsList && viewModel.appsList.length> 0){
      this.setAppsUsersData(viewModel.appsList, "apps");
      this.view.customListboxAlertApps.segList.info={"data":viewModel.appsList};
    }
    if(viewModel.usersList && viewModel.usersList.length > 0){
      this.setAppsUsersData(viewModel.usersList, "users");
      this.view.customListboxAlertUsertypes.segList.info={"data":viewModel.usersList};
    }
    if(viewModel.languagesList && viewModel.languagesList.length> 0){
      this.setLanguages(viewModel.languagesList);
      this.localeLanguages = viewModel.languagesList;
    }
    if(viewModel.criteriaList.alertConditions && viewModel.criteriaList.alertConditions.length > 0){
      this.setCriteria(viewModel.criteriaList.alertConditions);
    }
    if(viewModel.alertGroupCodes.eventTypes && viewModel.alertGroupCodes.eventTypes.length > 0){
      this.setAlertGroupCodes(viewModel.alertGroupCodes);
    }
    if(viewModel.accountTypes){
      this.setAccountTypes(viewModel.accountTypes.accounttype);
      this.view.customListboxAlertAccountTypes.segList.info={"data":viewModel.accountTypes};
    }
    if(viewModel.frequencyTypes.frequency && viewModel.frequencyTypes.frequency.length > 0){
      this.setFrequencyTypes(viewModel.frequencyTypes.frequency);
    }
    if(viewModel.channelList.channels && viewModel.channelList.channels.length > 0){
      this.defaultChannelList = viewModel.channelList.channels.map(function(rec){
        return {
          "channelDisplayName":rec.channeltext_Description,
          "channelID":rec.channel_id,
          "isChannelSupported":"false"
        };
      });
      //to assign based on current locale
      /* var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
      this.defaultChannelList = viewModel.channelList.channels.filter(function(rec){
        if(rec.channeltext_LanguageCode === currLocale) {
          return rec;
        }
      }).map(function(rec){
        return {
          "channelDisplayName":rec.channeltext_Description,
          "channelID":rec.channel_id,
          "isChannelSupported":"false"
        };
      });*/
    }
    this.setDatesListbox();
  },
  /*
  * sets legalentity based master data to respective widgets
  */
  setMasterDataLE: function(viewModel){
    if(viewModel.attributesList.alertAttributes && viewModel.attributesList.alertAttributes.length > 0){
      this.setAttributes(viewModel.attributesList.alertAttributes);
    }else{
      var attributeList = [["none", "None"]];
      this.view.lstBoxAlertAttribute1.masterData = attributeList;
      this.view.lstBoxAlertAttribute1.selectedKey = "none";
    }
    if(viewModel.recipientsList.recepientTypes && viewModel.recipientsList.recepientTypes.length > 0){
      this.setRecipients(viewModel.recipientsList.recepientTypes);
      this.view.lstBoxRecipients.info = {"data": viewModel.recipientsList.recepientTypes};
    }
  },
  formPreshow: function() {
    this.isSingleEntity = kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY;
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.breadcrumbs.btnBackToMain.setVisibility(true);
    this.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(false);
    this.view.contextualMenu1.lblHeader.setVisibility(false);
    this.view.contextualMenu1.btnLink1.setVisibility(false);
    this.view.contextualMenu1.btnLink2.setVisibility(false);
    this.view.contextualMenu1.flxOptionsSeperator.setVisibility(false);
    this.view.contextualMenu1.flxOption1.setVisibility(false);
    this.view.contextualMenu1.flxOption3.setVisibility(false);
    this.view.contextualMenu1.skin = "slFbox";
    this.view.flxPreviewPopup.setVisibility(false);
    this.view.flxSubAlertCodeGrey.setVisibility(false);
    this.view.flxAddSubAlertPopUp.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
    this.view.contextualMenu1.lblIconOption2.text = "\ue91e";
    this.view.contextualMenuAlertTypeDetail.skin = "slFbox";
    this.recentButton = this.view.btnTabName1;
    this.view.breadcrumbs.skin = "slFbox";
    this.view.customListboxAlertAccountTypes.flxSelectedText.hoverSkin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.customListboxAlertApps.flxSelectedText.hoverSkin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.customListboxAlertUsertypes.flxSelectedText.hoverSkin = "sknflxffffffBorderE1E5EERadius3pxPointer";
    this.view.AlertFrequencySelectionCat.timePicker.lstbxMinutes.masterData=[["mm", "mm"],["0", "00"],["30", "30"]];
    this.view.frequencySelectionCat.timePicker.lstbxMinutes.masterData=[["mm", "mm"],["0", "00"],["30", "30"]];
    this.view.frequencySelectionAlertType.timePicker.lstbxMinutes.masterData=[["mm", "mm"],["0", "00"],["30", "30"]];
    this.currencyValue=this.defaultCurrencyCode();
    this.setFlexHeight();
    this.setFlowActions();
    this.getMasterData();
    this.resetUI();
  },
  resetUI: function() {
    var scopeObj = this;
    scopeObj.view.flxAlertBoxContainer.setVisibility(true);
    scopeObj.view.flxAlertsBreadCrumb.setVisibility(false);
    scopeObj.view.flxEditAlertCategoryScreen.setVisibility(false);
    scopeObj.view.flxAlertCategories.setVisibility(true);
    scopeObj.view.flxAlertTypeDetailsScreen.setVisibility(false);
    scopeObj.view.flxAlertTypes.setVisibility(false);
    scopeObj.view.flxSubAlerts.setVisibility(false);
    scopeObj.view.flxCategoryOptionsMenu.setVisibility(false);
    scopeObj.view.flxCategoryOptions.skin = "slFbox";
    scopeObj.view.flxGroupsListContextualMenu.setVisibility(false);
    scopeObj.view.flxViewAlertLanguagesPopup.setVisibility(false);
    scopeObj.view.flxLegalDropdown.setVisibility(false);
    scopeObj.showCategoryLevelInternalScreens(1);
  },
  setFlexHeight: function() {
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxAlertConfiguration.height = screenHeight - 126 + "px"; 
    if(this.isSingleEntity === false){ // reduce height as LE dropdown will be shown
      this.view.flxAlertCategoriesList.height = (screenHeight - 196 ) + "px";
      this.view.flxAlertCategoryScrollCont.height = (screenHeight - 196 -55) + "px";
    } else{
      this.view.flxAlertCategoriesList.height = (screenHeight - 126 ) + "px";
      this.view.flxAlertCategoryScrollCont.height = (screenHeight - 126 -55) + "px";
    }
    this.view.forceLayout();
  },
  setSkinForChannelTabs: function (btnWidget) {
    this.view.btnSMS.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
    this.view.btnPushNoti.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
    this.view.btnEmail.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
    this.view.btnNotifCenter.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
    btnWidget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
  },
  onHoverEventCallback:function(widget, context) {
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
    this.setOptionsVisibility(widget.id);
  },
  setOptionsVisibility : function(widgetId){
    var self = this;
    var skin = self.view[widgetId].isVisible ? "sknflxffffffop100Border424242Radius100px" : "slFbox";
    if(widgetId === "flxCategoryOptionsMenu"){
      self.view.flxCategoryOptions.skin = skin;
    }
    else if (widgetId === "flxAlertTypesContextualMenu"){
      self.view.flxOptions.skin = skin;
    }
    else if (widgetId === "flxSelectOptions"){
      var segData = self.view.segSubAlerts.data;
      if(self.prevIndex !=-1 && self.prevIndex < segData.length){
        var tempSegDataPrev = segData[this.prevIndex];
        tempSegDataPrev.flxOptions.skin = "slFbox";
        self.view.segSubAlerts.setDataAt(tempSegDataPrev, this.prevIndex, 0);
      }
      var selcRow = self.view.segSubAlerts.selectedRowIndex;
      if(selcRow){
        var selectIndex = self.view.segSubAlerts.selectedRowIndex[1];
        var tempCurrent = segData[selectIndex];
        tempCurrent.flxOptions.skin =skin;
        self.view.segSubAlerts.setDataAt(tempCurrent, selectIndex, 0);
        self.prevIndex = selectIndex;
      }
    }
    else if(widgetId === "flxSubAlertContextualMenu"){
      self.view.flxOptionsSubAlerts.skin = skin;
    }
    else if(widgetId === "flxGroupsListContextualMenu"){
      var selectedGroupName = self.view.flxGroupsListContextualMenu.info ? self.view.flxGroupsListContextualMenu.info.rowName : "";
      if(selectedGroupName)
        self.view[selectedGroupName].flxOptions.skin = skin;
    }
    self.view.forceLayout();
  },
  showSwitchTogglePopup: function(status, type) {
    var scopeObj = this;
    var lblPopUpMainMessage;
    var rtxPopUpDisclaimer;
    var btnPopUpCancelRight;
    var btnPopUpDeleteText;

    if (status === scopeObj.sDeactivate) {
      if (type === scopeObj.sSubscription) {
        lblPopUpMainMessage = scopeObj.sDeactivateSubStatus;
        rtxPopUpDisclaimer = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.deactiveSubscriptionMessage");
        this.view.popUpDeactivate.btnPopUpCancel.text = scopeObj.sNoLeaveAsIs;
        btnPopUpCancelRight = "123px";
        btnPopUpDeleteText = scopeObj.sYesDeactivate;
      } else {
        lblPopUpMainMessage = scopeObj.sDeactivateAlertStatus;
        rtxPopUpDisclaimer = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.DeactivateAlertStatusMessage");
        this.view.popUpDeactivate.btnPopUpCancel.text = scopeObj.sNoLeaveAsIs;
        btnPopUpCancelRight = "123px";
        btnPopUpDeleteText = scopeObj.sYesDeactivate;
      }
    } else if (status === scopeObj.sActivate) {
      if (type === scopeObj.sSubscription) {
        lblPopUpMainMessage = scopeObj.sActiveSubStatus;
        rtxPopUpDisclaimer = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Active_subscription_status_Message");
        this.view.popUpDeactivate.btnPopUpCancel.text = scopeObj.sNoLeaveAsIs;
        btnPopUpCancelRight = "123px";
        btnPopUpDeleteText = scopeObj.sYesActivate;
      } else {
        lblPopUpMainMessage = scopeObj.sActivateAlertStatus;
        rtxPopUpDisclaimer = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Active_alert_status_Message");
        this.view.popUpDeactivate.btnPopUpCancel.text = scopeObj.sNoLeaveAsIs;
        btnPopUpCancelRight = "123px";
        btnPopUpDeleteText = scopeObj.sYesActivate;
      }
    }
    this.view.popUpDeactivate.lblPopUpMainMessage.text = lblPopUpMainMessage;
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = rtxPopUpDisclaimer;
    this.view.popUpDeactivate.btnPopUpCancel.text = scopeObj.sNoLeaveAsIs;
    this.view.popUpDeactivate.btnPopUpDelete.text = btnPopUpDeleteText;
    this.view.flxDeleteAlert.setVisibility(true);
  },
  setOnClick : function(channelToAdd) {
    var scopeObj = this;
    channelToAdd.flxChannel.onClick = function() {
      if(channelToAdd.flxChannel.skin === "sknFlxbgFFFFFFbdrD7D9E0rd4px") {
        scopeObj.selectedChannelList.push(channelToAdd.lblSupportedChannel.text);
        scopeObj.view.flxCategoryChannelError.setVisibility(false);
      } else {
        var selectedChannelindex = scopeObj.selectedChannelList.indexOf(channelToAdd.lblSupportedChannel.text);
        if (selectedChannelindex > -1) {
          scopeObj.selectedChannelList.splice(selectedChannelindex, 1);
        }
      }
      //hide error message
      if(channelToAdd.id.indexOf("alertCatChannel")>=0){
        scopeObj.view.flxCategoryChannelError.setVisibility(false);
      } else if(channelToAdd.id.indexOf("alertGroupChannel")>=0){
        scopeObj.view.flxAddAlertTypeError41.setVisibility(false);
      } else{
        scopeObj.view.flxAlertChannelError.setVisibility(false);
      }
      //change skins for selection
      channelToAdd.onChannelSelected(channelToAdd);
    };
  },
  /*
  * create channels buttons 
  * @param:{"channelDisplayName":"","channelId":"","isChannelSupported":"false"}
  * @param: channels group conainer flex path, unique name for channel button
  */
  createDefaultChannels: function(channels,parentFlexPath,channelName) {
    var scopeObj = this;
    // scopeObj.selectedChannelList = scopeObj.supportedChannels;
    parentFlexPath.removeAll();
    if (channels) {
      for (var i=0; i<channels.length; ++i) {
        var width = (scopeObj.AdminConsoleCommonUtils.getLabelWidth(channels[i].channelDisplayName)+30);
        var channelToAdd = new com.adminConsole.alerts.supportedChannel({
          "autogrowMode" : kony.flex.AUTOGROW_NONE,
          "clipBounds" : true,
          "id" : channelName +"" + i,
          "isVisible" : true,
          "layoutType" : kony.flex.FREE_FORM,
          "masterType" : constants.MASTER_TYPE_DEFAULT,
          "width": width +"dp",
        }, {}, {});
        channelToAdd.flxcbSupportedChannel.isVisible = false;
        channelToAdd.lblSupportedChannel.isVisible = false;
        channelToAdd.flxChannel.isVisible = true;
        channelToAdd.lblChannelName.text = channels[i].channelDisplayName;
        channelToAdd.lblChannelName.info = {"channelId":channels[i].channelID};
        if(channels[i].isChannelSupported === "true"){
          width = width + 10;
          channelToAdd.lblChannelName.left = "0dp";
          channelToAdd.flxChannelImg.isVisible = true;
          channelToAdd.flxChannel.skin = "sknFlxBgF2F9FFBr006CCARd4px";
          channelToAdd.lblChannelName.skin = "sknLbl0069CDLatoSemiBold12px";
        } else {
          channelToAdd.lblChannelName.left = "15dp";
          channelToAdd.flxChannelImg.isVisible = false;
          channelToAdd.flxChannel.skin = "sknFlxbgFFFFFFbdrD7D9E0rd4px";
          channelToAdd.lblChannelName.skin = "sknLbl485C75LatoRegular12Px";
        }
        channelToAdd.width = (width+15)+"dp";
        channelToAdd.flxChannel.width = width+"dp";
        scopeObj.setOnClick(channelToAdd);
        parentFlexPath.add(channelToAdd);
      }
    }
    scopeObj.view.forceLayout();
  },
  /*
  * set assigned channels for add/edit alert category/group
  * @param: channels container path, array of assigned channels list
  */
  setAssignedChannelList : function(channelContainer,assignedChannels){
    var channelsList = channelContainer.children;
    for(var i =0; i< channelsList.length; i++){
      var channelPath = this.view[channelsList[i]];
      if(assignedChannels.contains(channelPath.lblChannelName.info.channelId)){
        channelPath.onChannelSelected(channelPath);
      }
    }
  },
  /*
  * fill data for edit category screen
  */
  setEditAlertCategoryData: function(){
    var scopeObj = this;
    this.clearValidationsForAddCategory();
    this.view.lblEditAlertCategoryName.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.EditCategory");
    var categoryDetails = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails;
    scopeObj.clearFrequencytoDefaults(scopeObj.view.frequencySelectionCat);
    scopeObj.clearValidationsForAddCategory();
    scopeObj.view.flxAlertsSelectedLEVal.setVisibility(true);
    scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Edit").toUpperCase() +" " + categoryDetails.categoryDefintion.categoryName.toUpperCase();
    scopeObj.view.EditAlertCategoryButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UpdateCategory_UC");
    scopeObj.view.EditAlertCategoryButtons.btnSave.width = "180dp";

    scopeObj.view.textBoxEntryCategoryName.tbxEnterValue.text = categoryDetails.categoryDefintion.categoryName;
    scopeObj.view.textBoxEntryCategoryName.tbxEnterValue.info = {"catId" :categoryDetails.categoryDefintion.categoryCode};
    var accLevelAlerts = categoryDetails.categoryDefintion.containsAccountLevelAlerts;
    var data = [{"selectedImg":scopeObj.radioDisabled,"unselectedImg":scopeObj.radioNotSelected,
                 "src":(accLevelAlerts === "true" ? scopeObj.radioDisabled : scopeObj.radioNotSelected),"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                {"selectedImg":scopeObj.radioDisabled,"unselectedImg":scopeObj.radioNotSelected,
                 "src":(accLevelAlerts === "false" ? scopeObj.radioDisabled : scopeObj.radioNotSelected),"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"}];
    scopeObj.view.customCategoryRadioButtonType.setData(data);
    scopeObj.view.flxEditCategoryCol11.setEnabled(false);
    var catLeData =  this.getLEDesc(categoryDetails.categoryDefintion.legalEntityId);
    scopeObj.view.lblEditCategorySelectedLE.text = catLeData && catLeData[0] ? catLeData[0].companyName : "";
    scopeObj.view.lblEditCategorySelectedLE.info.selectedLEId= categoryDetails.categoryDefintion.legalEntityId || "";
    scopeObj.view.lblEditCategorySelectedLE.info.selectedLEName = catLeData && catLeData[0] ? catLeData[0].companyName : "";
    scopeObj.view.flxEditCategorySelectedLE.setEnabled(false);
    scopeObj.view.flxEditCategorySelectedLE.skin = "skinDisabledf3f3f3bordrad3px";
    scopeObj.view.flxEditCategorySelectedLE.hoverSkin = "skinDisabledf3f3f3bordrad3px";
    if(categoryDetails.categoryDefintion.frequencyId){
      scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol1.selectedKey = categoryDetails.categoryDefintion.frequencyId;
      scopeObj.displayBasedOnSelectedFrequencyType(scopeObj.view.frequencySelectionCat);
      scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol2.selectedKey = categoryDetails.categoryDefintion.frequencyValue || "SELECT";
      scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol3.selectedKey = categoryDetails.categoryDefintion.frequencyValue || "SELECT";
      var formatedFreqTime = categoryDetails.categoryDefintion.frequencyTime ? scopeObj.timeValueObj(categoryDetails.categoryDefintion.frequencyTime) : "";
      scopeObj.view.frequencySelectionCat.timePicker.lstbxHours.selectedKey = formatedFreqTime ? formatedFreqTime.hours :"hh";
      scopeObj.view.frequencySelectionCat.timePicker.lstbxMinutes.selectedKey = formatedFreqTime ? formatedFreqTime.minutes : "mm";
      scopeObj.view.frequencySelectionCat.timePicker.lstbxAMPM.selectedKey = formatedFreqTime ? formatedFreqTime.meridiem : "AM";
    } else{
      scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol1.selectedKey = "SELECT";
    }

    scopeObj.view.editAlertCategoryStatusSwitch.switchToggle.selectedIndex = categoryDetails.categoryDefintion.categoryStatus === scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE ? 0 : 1;
    scopeObj.createDefaultChannels(categoryDetails.categoryChannels,scopeObj.view.flxSupportedChannelEntries,"alertCatChannel");
    var langPref = categoryDetails.displayPreferences;
    scopeObj.assignLanguagesSupportedAlertTypes(langPref, 1);
    scopeObj.view.forceLayout();
  },
  /*
   * delete current row from the languages segment
   */
  onClickOfDeleteCategoryLang : function(){
    var self = this;
    var currInd = self.view.segEditAlertCategoryLanguages.selectedRowIndex[1];
    self.view.segEditAlertCategoryLanguages.removeAt(currInd);
    self.view.forceLayout();
  },
  showCategoryDeleteLangPopup : function(){
    var self = this;
    this.view.flxDeleteAlert.isVisible = true;
    this.view.popUpDeactivate.btnPopUpCancel.text = self.sNoLeaveAsIs;
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DeleteLanguage");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AreYouSureDeleteLanguage");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    //overriding actions for alert type delete language
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.onClickOfDeleteCategoryLang();
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  mapLangDesc : function(rec){
    return {
      "languageCode": rec.lblAddAlertTypeSegLanguage.info.id,
      "displayName": rec.lblAddAlertTypeSegDisplayName.text,
      "description": rec.lblAddAlertTypeSegDescription.text
    };
  },
  /*
   * create payload for activate/deactivate alert category
   */
  activateDeactivateAlertCategory : function(){
    var self = this;
    var categoryDetail = self.view.lblViewDetailsCategoryDisplayName.info.categoryDetails;
    var reqParam = {
      "categoryCode": categoryDetail.categoryDefintion.categoryCode,
      "legalEntityId": categoryDetail.categoryDefintion.legalEntityId
    };
    if (categoryDetail.categoryDefintion.categoryStatus === this.AdminConsoleCommonUtils.constantConfig.ACTIVE){
      self.showCategoryDeactivePopup(reqParam);
    } else{
      reqParam.statusId = this.AdminConsoleCommonUtils.constantConfig.ACTIVE;
      self.presenter.editAlertCategory(reqParam, true);
      self.view.flxDeleteAlert.setVisibility(false);
    }

  },
  showCategoryDeactivePopup: function(reqParam) {
    var self = this;
    this.view.flxDeleteAlert.isVisible = true;
    this.view.popUpDeactivate.btnPopUpCancel.text = self.sNoLeaveAsIs;
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DeactivateAlertStatus");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DeactivateAlertCategory");
    this.view.popUpDeactivate.btnPopUpDelete.text = self.sYesDeactivate;
    reqParam.statusId = this.AdminConsoleCommonUtils.constantConfig.INACTIVE;
    this.view.forceLayout();
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.presenter.editAlertCategory(reqParam, true);
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  addEditAlertCategory : function(){
    var self =this;
    var reqParam = self.getAddEditCategoryRequestParam();
    if(self.alertGroupCurrAction === self.alertGroupActionConfig.CREATE){
      self.presenter.addAlertCategory(reqParam);
    }else if(self.alertGroupCurrAction === self.alertGroupActionConfig.EDIT){
      self.presenter.editAlertCategory(reqParam,false);
    }
  },
  /*
   * form request param for add/edit alert group
   * @return: create/edit request param
   */
  getAddEditCategoryRequestParam : function(){
    var self =this;
    var initialParam = self.getAddCategoryBasicDetaisJSON();
    var langPref = self.getAddedRemovedLangList(1); 
    var addedLang = langPref.added.map(self.mapLangDesc);

    if(self.alertGroupCurrAction === self.alertGroupActionConfig.CREATE){
      initialParam.displayPreferences = addedLang;
    }else if(self.alertGroupCurrAction === self.alertGroupActionConfig.EDIT){
      initialParam.categoryCode = self.view.textBoxEntryCategoryName.tbxEnterValue.info.catId;
      initialParam.addedDisplayPreferences = addedLang;
      initialParam.removedDisplayPreferences = langPref.removed;
    }
    return initialParam;
  },
  /*
   * form request param for create and edit category
   * @return: category request Param
   */
  getAddCategoryBasicDetaisJSON :  function(){
    var self = this;
    var reqParam = {
      "categoryName":self.view.textBoxEntryCategoryName.tbxEnterValue.text,
      "channels": self.getSelectedChannelList(self.view.flxSupportedChannelEntries),
      "containsAccountLevelAlerts": self.view.customCategoryRadioButtonType.selectedValue.id === "YES" ? true:false,
      "statusId": self.view.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 0 ? self.AdminConsoleCommonUtils.constantConfig.ACTIVE : self.AdminConsoleCommonUtils.constantConfig.INACTIVE,
      "legalEntityId": self.view.lblEditCategorySelectedLE.info.selectedLEId,
      "frequency":{"id":self.view.frequencySelectionCat.lstBoxFrequencyCol1.selectedKey,
                   "value":self.view.frequencySelectionCat.lstBoxFrequencyCol2.selectedKey,
                   "time":"10:23:00"}
    };
    var freqVal = "";
    if(self.view.frequencySelectionCat.flxFrequencyColumn2.isVisible === true){
      freqVal = self.view.frequencySelectionCat.lstBoxFrequencyCol2.selectedKey === "SELECT" ? "" : self.view.frequencySelectionCat.lstBoxFrequencyCol2.selectedKey;
    } else if(self.view.frequencySelectionCat.flxFrequencyColumn3.isVisible === true){
      freqVal = self.view.frequencySelectionCat.lstBoxFrequencyCol3.selectedKey === "SELECT" ? "" : self.view.frequencySelectionCat.lstBoxFrequencyCol3.selectedKey;
    }
    reqParam.frequency.value = freqVal;
    var timeObj = {"Hours": self.view.frequencySelectionCat.timePicker.lstbxHours.selectedKey,
                   "Minutes":self.view.frequencySelectionCat.timePicker.lstbxMinutes.selectedKeyValue[1],
                   "Meridiem":self.view.frequencySelectionCat.timePicker.lstbxAMPM.selectedKey};
    var formattedTime = self.getFormattedTime(timeObj, "24");
    reqParam.frequency.time = formattedTime;
    return reqParam;
  },
  /*
   * function to get removed lang list
   * @return: removed id's list
   */
  getAddedRemovedCategoryLangList : function(){
    var self = this;
    var originalList = self.view.segEditAlertCategoryLanguages.info.segData;
    var newList = self.view.segEditAlertCategoryLanguages.data;
    var orgId = originalList.map(function(rec){
      return rec.LanguageCode;
    });
    var newId = newList.map(function(rec){
      return rec.lblCategoryLanguage.info.id;
    });
    var removed = self.getDiffOfArray(orgId, newId);
    var addList = newList.filter(function(rec){
      for(var i=0;i<newId.length;i++){
        if(newId[i] !== "" && newId[i] === rec.lblCategoryLanguage.info.id){
          return rec;
        }
      }
      return null;
    });
    return {"added":addList,"removed":removed};
  },
  /*
  * get channels json for add/edit alert category/group
  * @param: channels container path
  * @returns: {"CH_EMAIL": false}
  */
  getSelectedChannelList : function(channelContainer){
    var channelList = {};
    var channelsList = channelContainer.children;
    for(var i =0; i< channelsList.length; i++){
      var channelPath = this.view[channelsList[i]];
      if(channelPath.flxChannel.skin === "sknFlxBgF2F9FFBr006CCARd4px"){
        channelList[channelPath.lblChannelName.info.channelId]= true;
      } else{
        channelList[channelPath.lblChannelName.info.channelId]= false;
      }
    }
    return channelList;
  },
  setFlowActions: function() {
    var scopeObj = this;
    this.view.segSubAlerts.onHover=this.saveScreenY;
    this.view.flxSelectOptions.onHover = this.onHoverEventCallback;
    this.view.flxSubAlertContextualMenu.onHover=this.onHoverEventCallback;
    this.view.flxSubAlertsStatusFilter.onHover = this.onHoverEventCallback;

    this.view.flxArrowTopMostPosition.onClick = function() {
      if(scopeObj.reorderAlertIndex !== -1)
      {
        scopeObj.moveTop(scopeObj.reorderAlertIndex);
      }  	
    };
    this.view.flxArrowTopPosition.onClick = function() {
      if(scopeObj.reorderAlertIndex !== -1)
      {
        scopeObj.moveUp(scopeObj.reorderAlertIndex);
      }  	
    };
    this.view.flxArrowBottomPosition.onClick = function() {
      if(scopeObj.reorderAlertIndex !== -1)
      {
        scopeObj.moveDown(scopeObj.reorderAlertIndex);
      }  	
    };
    this.view.flxArrowBottomMostPosition.onClick = function() {
      if(scopeObj.reorderAlertIndex !== -1)
      {
        scopeObj.moveBottom(scopeObj.reorderAlertIndex);
      }  	
    };	
    this.view.btnReorderAlertTypes.onClick = function(){
      scopeObj.view.flxSequencePopUp.setVisibility(true);
      scopeObj.reorderAlert = true;
      scopeObj.enableDisableAllArrows(1);
      scopeObj.view.lblReorderAlert.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ReorderAlertGroups");
      var alertGroups = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.alertGroups;
      var sequenceData = alertGroups.map(scopeObj.mappingAlertSegmentSequenceData.bind(scopeObj));
      scopeObj.setReorderSegmentData(sequenceData);
    };
    this.view.btnCategoryReorder.onClick = function(){
      scopeObj.reorderAlert = false;
      scopeObj.view.flxSequencePopUp.setVisibility(true);
      scopeObj.enableDisableAllArrows(1);
      scopeObj.view.lblReorderAlert.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ReorderCategory");
      var sequenceData = scopeObj.categoryTabsData.map(scopeObj.mappingCategorySegmentSequenceData.bind(scopeObj));
      scopeObj.setReorderSegmentData(sequenceData);
    };

    this.view.flxPopupCloseSequence.onClick = function(){
      scopeObj.view.btnCancelSequencePopup.onClick();
    };
    this.view.btnCancelSequencePopup.onClick = function(){
      scopeObj.view.flxSequencePopUp.setVisibility(false);
    };
    this.view.btnUpdateSequencePopup.onClick = function(){
      //make an update sequence call
      scopeObj.view.flxSequencePopUp.setVisibility(false);
      scopeObj.updateSequence();
    };
    this.view.flxCategoryOptions.onClick = function() {
      var status = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryStatus;
      scopeObj.view.flxCategoryOptionsMenu.setVisibility(scopeObj.view.flxCategoryOptionsMenu.isVisible === false);
      scopeObj.view.flxCategoryOptionsMenu.top = (scopeObj.view.flxAlertCategoryMessage.isVisible === true) ? "105dp" :"50dp";
      scopeObj.view.contextualMenu1.lblOption4.text = 
        status === scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
        scopeObj.sPermDeactivate :scopeObj.sPermActivate;
      scopeObj.view.contextualMenu1.lblIconOption4.text = 
        status === scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
        "\ue91c" : "\ue931";
      scopeObj.view.flxCategoryOptions.skin = "sknflxffffffop100Border424242Radius100px";
    };
    this.view.flxCategoryOptionsMenu.onHover = scopeObj.onHoverEventCallback;
    this.view.contextualMenu1.flxOption2.onClick = function() {
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.view.flxCategoryOptionsMenu.setVisibility(false);
      scopeObj.view.flxCategoryOptions.skin = "slFbox";
      scopeObj.showCategoryLevelInternalScreens();		
      scopeObj.setEditAlertCategoryData();	
    };
    this.view.contextualMenu1.flxOption4.onClick = function() {
      scopeObj.view.flxCategoryOptionsMenu.setVisibility(false);
      scopeObj.view.flxCategoryOptions.skin = "slFbox";
      scopeObj.activateDeactivateAlertCategory();
    };
    this.view.EditAlertCategoryButtons.btnSave.onClick = function() {
      scopeObj.clearValidationsForAddCategory();
      var isValid = scopeObj.validateEditAlertCategoryScreen();
      if(isValid && scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.CREATE){
        scopeObj.showAddCategoryConfirmationPopup();
      }else if(isValid && scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.EDIT){
        scopeObj.addEditAlertCategory();
      }
    };
    this.view.EditAlertCategoryButtons.btnCancel.onClick = function() {
      if(scopeObj.view.EditAlertCategoryButtons.btnSave.text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UpdateCategory_UC")){
        scopeObj.showAlertCategoryDetailScreen();
      } else{
        scopeObj.view.flxAlertsBreadCrumb.setVisibility(false);
        scopeObj.showCategoryLevelInternalScreens(1);
      }
    };
    this.view.segSubAlerts.onRowClick = function(eventObj){
      var selRowData = scopeObj.view.segSubAlerts.data[eventObj.selectedRowIndex[1]];
      var isViewPermAvail = scopeObj.isPermissionAvailableForLE(selRowData.legalEntityId, "VIEW_CONTENT");
      //naviagte to alert details screen if LE permissions available
      if(isViewPermAvail === true){
        scopeObj.getSubAlertViewData();
        scopeObj.view.flxSelectOptions.setVisibility(false);
        scopeObj.toggleBreadcrumbButtons("subalert");
      }
    };
    this.view.btnAddSubAlerts.onClick = function(){
      scopeObj.view.breadcrumbs.btnPreviousPage1.text=scopeObj.view.breadcrumbs.lblCurrentScreen.text;
      scopeObj.showAddSubAlertScreen();
    };
    this.view.noResultsWithButtonAlerts.btnAddRecord.onClick = function(){
      scopeObj.view.btnAddSubAlerts.onClick();
    };
    this.view.flxEdit.onClick = function(){
      scopeObj.alertGroupCurrAction=scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.subAlertScreenView=false;
      var selectedIndex=scopeObj.view.segSubAlerts.selectedRowIndex[1];
      var subAlertId=scopeObj.view.segSubAlerts.data[selectedIndex].lblCode.info.value;
      var inputData={
        "SubAlertId":subAlertId,
        "legalEntityId": scopeObj.view.segSubAlerts.data[selectedIndex].legalEntityId
      };
      scopeObj.presenter.getSubAlertView(inputData,"edit");
    };
    this.view.flxDeactivate.onClick = function(){
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.subAlertScreenView=false;
      if(scopeObj.view.lblDeactivate.text===scopeObj.sPermDeactivate)
        scopeObj.showDeactivateSubAlert();
      else
        scopeObj.activateDeactivateSubAlert(scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE);
    };
    this.view.flxEyeicon.onClick = function(){
      if(scopeObj.view.flxSubAlertContextualMenu.isVisible){
        scopeObj.view.flxSubAlertContextualMenu.setVisibility(false);
        scopeObj.view.flxOptionsSubAlerts.skin = "slFbox";
      }
      scopeObj.setPreviewData();
    };
    this.view.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxPreviewPopup.setVisibility(false);
    };
    this.view.flxPopUpClose.onClick = function(){
      scopeObj.view.flxPreviewPopup.setVisibility(false);
    };
    this.view.btnEmail.onClick = function(){
      scopeObj.view.lblPreviewTemplateBody.setVisibility(false);
      scopeObj.view.rtxViewer.setVisibility(true);
      if(scopeObj.view.flxViewTemplate.isVisible===true){
        scopeObj.view.lblPreviewSubHeader1.text=scopeObj.populateAlertPreview(scopeObj.view.lblEmailTitleValue.text);
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =scopeObj.populateAlertPreview(scopeObj.emailRtxData);
      }else{
        scopeObj.view.lblPreviewSubHeader1.text=scopeObj.populateAlertPreview(scopeObj.view.tbxEmailSubject.text);
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =scopeObj.populateAlertPreview(scopeObj.emailRtxData);
      }
      scopeObj.view.flxTemplatePreviewHeader.setVisibility(true);
      scopeObj.view.flxPopUpButtons.top="3px";
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnEmail);
      scopeObj.view.forceLayout();
    };
    this.view.btnSMS.onClick = function(){
      if(scopeObj.view.flxViewTemplate.isVisible===true){
        scopeObj.view.lblPreviewTemplateBody.text=scopeObj.populateAlertPreview(scopeObj.view.ViewTemplateSMS.lblChannelMsg.text);
      }else{
        scopeObj.view.lblPreviewTemplateBody.text=scopeObj.populateAlertPreview(scopeObj.view.txtSMSMsg.text);
      }
      scopeObj.view.flxTemplatePreviewHeader.setVisibility(false);
      scopeObj.view.flxPopUpButtons.top="70px";
      scopeObj.view.lblPreviewTemplateBody.setVisibility(true);
      scopeObj.view.rtxViewer.setVisibility(false);
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnSMS);
    };
    this.view.btnPushNoti.onClick = function(){
      if(scopeObj.view.flxViewTemplate.isVisible===true){
        scopeObj.view.lblPreviewSubHeader1.text=scopeObj.populateAlertPreview(scopeObj.view.ViewTemplatePush.lblTitleValue.text);
        scopeObj.view.lblPreviewTemplateBody.text=scopeObj.populateAlertPreview(scopeObj.view.ViewTemplatePush.lblChannelMsg.text);
      }else{
        scopeObj.view.lblPreviewSubHeader1.text=scopeObj.populateAlertPreview(scopeObj.view.tbxPushNotificationTitle.text);
        scopeObj.view.lblPreviewTemplateBody.text=scopeObj.populateAlertPreview(scopeObj.view.txtPushNotification.text);
      }
      scopeObj.view.flxTemplatePreviewHeader.setVisibility(true);
      scopeObj.view.flxPopUpButtons.top="3px";
      scopeObj.view.lblPreviewTemplateBody.setVisibility(true);
      scopeObj.view.rtxViewer.setVisibility(false);
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnPushNoti);
    };
    this.view.btnNotifCenter.onClick = function(){
      if(scopeObj.view.flxViewTemplate.isVisible===true){
        scopeObj.view.lblPreviewSubHeader1.text=scopeObj.populateAlertPreview(scopeObj.view.ViewTemplateCenter.lblTitleValue.text);
        scopeObj.view.lblPreviewTemplateBody.text=scopeObj.populateAlertPreview(scopeObj.view.ViewTemplateCenter.lblChannelMsg.text);
      }else{
        scopeObj.view.lblPreviewSubHeader1.text=scopeObj.populateAlertPreview(scopeObj.view.tbxNotiCenterTitle.text);
        scopeObj.view.lblPreviewTemplateBody.text=scopeObj.populateAlertPreview(scopeObj.view.txtNotiCenterMsg.text);
      }
      scopeObj.view.flxTemplatePreviewHeader.setVisibility(true);
      scopeObj.view.flxPopUpButtons.top="3px";
      scopeObj.view.lblPreviewTemplateBody.setVisibility(true);
      scopeObj.view.rtxViewer.setVisibility(false);
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnNotifCenter);
    };
    this.view.txtSMSMsg.onKeyUp = function(){
      if(scopeObj.view.txtSMSMsg.text.trim().length===0)
      {
        scopeObj.view.lblSMSMsgSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblSMSMsgSize.text=scopeObj.view.txtSMSMsg.text.trim().length+"/300";
        scopeObj.view.lblSMSMsgSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtSMSMsg.onEndEditing = function(){
      if(scopeObj.view.lblSMSMsgSize.isVisible){
        scopeObj.view.lblSMSMsgSize.setVisibility(false);
      }
    };
    this.view.txtPushNotification.onKeyUp = function(){
      if(scopeObj.view.txtPushNotification.text.trim().length===0)
      {
        scopeObj.view.lblPushNotificationSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblPushNotificationSize.text=scopeObj.view.txtPushNotification.text.trim().length+"/300";
        scopeObj.view.lblPushNotificationSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtPushNotification.onEndEditing = function(){
      if(scopeObj.view.lblPushNotificationSize.isVisible){
        scopeObj.view.lblPushNotificationSize.setVisibility(false);
      }
    };
    this.view.txtNotiCenterMsg.onKeyUp = function(){
      if(scopeObj.view.txtNotiCenterMsg.text.trim().length===0)
      {
        scopeObj.view.lblNotiCenterMsgSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblNotiCenterMsgSize.text=scopeObj.view.txtNotiCenterMsg.text.trim().length+"/300";
        scopeObj.view.lblNotiCenterMsgSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtNotiCenterMsg.onEndEditing = function(){
      if(scopeObj.view.lblNotiCenterMsgSize.isVisible){
        scopeObj.view.lblNotiCenterMsgSize.setVisibility(false);
      }
    };
    this.view.tbxPushNotificationTitle.onKeyUp = function(){
      if(scopeObj.view.tbxPushNotificationTitle.text.trim().length===0)
      {
        scopeObj.view.lblPushNotificationSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.flxNoPushNotification.setVisibility(false);
        scopeObj.view.lblPushNotificationSize.text=scopeObj.view.tbxPushNotificationTitle.text.trim().length+"/100";
        scopeObj.view.lblPushNotificationSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.tbxPushNotificationTitle.onEndEditing = function(){
      if(scopeObj.view.lblPushNotificationSize.isVisible){
        scopeObj.view.lblPushNotificationSize.setVisibility(false);
      }
    };
    this.view.tbxNotiCenterTitle.onKeyUp = function(){
      if(scopeObj.view.tbxNotiCenterTitle.text.trim().length===0)
      {
        scopeObj.view.lblNotiCenterMsgSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.flxNoNotiCenterMsgError.setVisibility(false);
        scopeObj.view.lblNotiCenterMsgSize.text=scopeObj.view.tbxNotiCenterTitle.text.trim().length+"/100";
        scopeObj.view.lblNotiCenterMsgSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.tbxNotiCenterTitle.onEndEditing = function(){
      if(scopeObj.view.lblNotiCenterMsgSize.isVisible){
        scopeObj.view.lblNotiCenterMsgSize.setVisibility(false);
      }
    };
    this.view.tbxEmailSubject.onKeyUp = function(){
      if(scopeObj.view.tbxEmailSubject.text.trim().length===0)
      {
        scopeObj.view.lblSubjectSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.flxNoEmailSubject.setVisibility(false);
        scopeObj.view.lblSubjectSize.text=scopeObj.view.tbxEmailSubject.text.trim().length+"/100";
        scopeObj.view.lblSubjectSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.tbxEmailSubject.onEndEditing = function(){
      if(scopeObj.view.lblSubjectSize.isVisible){
        scopeObj.view.lblSubjectSize.setVisibility(false);
      }
    };
    this.view.flxAddTemplateButton.onClick = function(){
      if(scopeObj.view.flxSubAlertContextualMenu.isVisible){
        scopeObj.view.flxSubAlertContextualMenu.setVisibility(false);
        scopeObj.view.flxOptionsSubAlerts.skin = "slFbox";
      }
      scopeObj.addContentTemplate();
    };
    this.view.txtbxSubAlertName.onKeyUp = function(){
      scopeObj.view.txtbxSubAlertName.skin="skntbxLato35475f14px";
      scopeObj.view.flxErrorAlertName.setVisibility(false);
      if(scopeObj.view.txtbxSubAlertName.text.trim().length===0)
      {
        scopeObj.view.lblAlertNameCount.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblAlertNameCount.text=scopeObj.view.txtbxSubAlertName.text.trim().length+"/50";
        scopeObj.view.lblAlertNameCount.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtbxSubAlertName.onEndEditing = function(){
      if(scopeObj.view.lblAlertNameCount.isVisible){
        scopeObj.view.lblAlertNameCount.setVisibility(false);
      }
    };
    this.view.txtAlertDescription.onKeyUp = function(){
      scopeObj.view.txtAlertDescription.skin="skntbxLato35475f14px";
      scopeObj.view.flxNoDescriptionError.setVisibility(false);
      if(scopeObj.view.txtAlertDescription.text.trim().length===0)
      {
        scopeObj.view.lblAlertDescriptionSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblAlertDescriptionSize.text=scopeObj.view.txtAlertDescription.text.trim().length+"/500";
        scopeObj.view.lblAlertDescriptionSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtAlertDescription.onEndEditing = function(){
      if(scopeObj.view.lblAlertDescriptionSize.isVisible){
        scopeObj.view.lblAlertDescriptionSize.setVisibility(false);
      }
    };
    this.view.flxOptionEdit.onClick = function(){
      if(scopeObj.view.flxSubAlertContextualMenu.isVisible){
        scopeObj.view.flxSubAlertContextualMenu.setVisibility(false);
        scopeObj.view.flxOptionsSubAlerts.skin = "slFbox";
      }
      scopeObj.editContentTemplate();
    };
    this.view.btnTemplateCancel.onClick = function(){
      scopeObj.view.lstBoxSubAlertResponseState.setEnabled(true);
      scopeObj.view.lstBoxSubAlertLanguages.setEnabled(true);
      scopeObj.view.lstBoxSubAlertResponseState.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.view.lstBoxSubAlertLanguages.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.setContentTemplateData();
      scopeObj.view.lblTemplateHeader.text=scopeObj.sAlertContentTemplate;
      scopeObj.view.lblContentBy.text="View Content By";//kony.i18n.getLocalizedString("i18n.frmAlertsManagement.viewContentBy");
      scopeObj.view.flxOptionsSubAlerts.setVisibility(true);
      scopeObj.view.flxAddTemplateButton.setVisibility(true);
      scopeObj.view.flxSaveTemplateButtons.setVisibility(false);
      scopeObj.view.flxAddTemplate.setVisibility(false);
    };
    this.view.btnTemplateSave.onClick = function(){
      if(scopeObj.validateTitles()){
        scopeObj.saveTemplate();
        scopeObj.view.lstBoxSubAlertResponseState.setEnabled(true);
        scopeObj.view.lstBoxSubAlertLanguages.setEnabled(true);
        scopeObj.view.lstBoxSubAlertResponseState.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
        scopeObj.view.lstBoxSubAlertLanguages.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
        scopeObj.view.lblTemplateHeader.text=scopeObj.sAlertContentTemplate;
        scopeObj.view.lblContentBy.text="View Content By";//kony.i18n.getLocalizedString("i18n.frmAlertsManagement.viewContentBy");
        scopeObj.view.flxOptionsSubAlerts.setVisibility(true);
        scopeObj.view.flxAddTemplateButton.setVisibility(true);
        scopeObj.view.flxSaveTemplateButtons.setVisibility(false);
        scopeObj.view.flxAddTemplate.setVisibility(false);
      }
    };
    this.view.flxOptionsSubAlerts.onClick = function(){
      if(scopeObj.view.flxSubAlertContextualMenu.isVisible){
        scopeObj.view.flxSubAlertContextualMenu.setVisibility(false);
        scopeObj.view.flxOptionsSubAlerts.skin = "slFbox";
      } else{
        scopeObj.showViewContextualMenu();
      }
    };
    this.view.flxEditSubAlertView.onClick = function(){
      scopeObj.alertGroupCurrAction=scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.subAlertScreenView=true;
      scopeObj.showEditSubAlert(scopeObj.view.lblSubAlertName.info);
    };
    this.view.flxDeactivateAlert.onClick = function(){
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.subAlertScreenView=true;
      if(scopeObj.view.lblDeactivateAlert.text===scopeObj.sPermDeactivate)
        scopeObj.showDeactivateSubAlert();
      else
        scopeObj.activateDeactivateSubAlert(scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE);
    };
    this.view.flxViewSubAlert.onScrollStart = function(){
      if(scopeObj.view.flxSubAlertContextualMenu.isVisible){
        scopeObj.view.flxSubAlertContextualMenu.setVisibility(false);
        scopeObj.view.flxOptionsSubAlerts.skin = "slFbox";
      }
      if(scopeObj.view.flxVariableReferenceContainer.isVisible)
        scopeObj.view.flxVariableReferenceContainer.setVisibility(false);
    };
    this.view.lstBoxSubAlertResponseState.onSelection = function(){
      if(scopeObj.view.flxViewTemplate.isVisible===true||scopeObj.view.flxNoContentTemplate.isVisible===true)
        scopeObj.setChannelsTemplateData();
      else if(scopeObj.view.flxAddTemplate.isVisible===true&&scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.CREATE){
        scopeObj.setListSelectedChannelsData();
      }
    };
    this.view.lstBoxSubAlertLanguages.onSelection = function(){
      if(scopeObj.view.lstBoxSubAlertLanguages.selectedKey!=="select"&&scopeObj.view.flxViewTemplate.isVisible===false){
        scopeObj.view.flxEyeicon.setVisibility(true);
        scopeObj.view.flxSaveTemplateButtons.setVisibility(true);
        scopeObj.view.flxAddTemplate.setVisibility(true);
      }else{
        scopeObj.view.flxEyeicon.setVisibility(false);
        scopeObj.view.flxSaveTemplateButtons.setVisibility(false);
        scopeObj.view.flxAddTemplate.setVisibility(false);
      }
      if(scopeObj.view.flxViewTemplate.isVisible===true||scopeObj.view.flxNoContentTemplate.isVisible===true)
        scopeObj.setChannelsTemplateData();
      else if(scopeObj.view.flxAddTemplate.isVisible===true&&scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.CREATE){
        scopeObj.setListSelectedChannelsData();
      }
    };
    this.view.customListboxAlertApps.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertApps.flxSegmentList.isVisible === false);
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(false);
      scopeObj.clearValidationsForAddSubAlert(3, scopeObj.view.customListboxAlertApps.flxSelectedText, scopeObj.view.customListboxAlertApps.flxListboxError);
    };
    this.view.customListboxAlertUsertypes.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertUsertypes.flxSegmentList.isVisible === false);
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(false);
      scopeObj.clearValidationsForAddSubAlert(3, scopeObj.view.customListboxAlertUsertypes.flxSelectedText, scopeObj.view.customListboxAlertUsertypes.flxListboxError);
    };
    this.view.customListboxAlertAccountTypes.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.isVisible === false);
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(false);
      scopeObj.clearValidationsForAddSubAlert(3, scopeObj.view.customListboxAlertAccountTypes.flxSelectedText, scopeObj.view.customListboxAlertAccountTypes.flxListboxError);
    };
    this.view.customListboxAlertApps.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll("apps");
    };
    this.view.customListboxAlertUsertypes.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll("users");
    };
    this.view.customListboxAlertAccountTypes.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll("accounts");
    };
    this.view.customListboxAlertApps.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick("apps");
    };
    this.view.customListboxAlertUsertypes.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick("users");
    };
    this.view.customListboxAlertAccountTypes.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick("accounts");
    };
    this.view.customListboxAlertApps.flxDropdown.onClick = function(){
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertApps.flxSegmentList.isVisible === false);
    };
    this.view.customListboxAlertUsertypes.flxDropdown.onClick = function(){
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertUsertypes.flxSegmentList.isVisible === false);
    };
    this.view.customListboxAlertAccountTypes.flxDropdown.onClick = function(){
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.isVisible === false);
    };

    this.view.flxOptions.onClick = function(){
      var top = (scopeObj.view.flxOptions.frame.y + 45) - scopeObj.view.flxAlertConfiguration.contentOffsetMeasured.y;
      top = (scopeObj.view.flxAlertTypeMessage.isVisible === true) ? top+55 : top;
      scopeObj.view.flxAlertTypesContextualMenu.top = top +"dp";
      scopeObj.view.flxAlertTypesContextualMenu.setVisibility(scopeObj.view.flxAlertTypesContextualMenu.isVisible === false);
      scopeObj.view.contextualMenuAlertTypeDetail.lblOption2.text = scopeObj.view.lblViewDetailsAlertTypeStatus.text.toLowerCase() === "active" ?
        scopeObj.sPermDeactivate :scopeObj.sPermActivate;
      scopeObj.view.contextualMenuAlertTypeDetail.lblIconOption2.text = scopeObj.view.lblViewDetailsAlertTypeStatus.text.toLowerCase() === "active" ?
        "\ue91c" : "\ue931";
      scopeObj.setOptionsVisibility("flxAlertTypesContextualMenu");
    };
    this.view.flxAlertConfiguration.onScrollStart = function(){
      scopeObj.hideContextualMenuOnScroll();
    };
    this.view.contextualMenuAlertTypeDetail.flxOption1.onClick = function(){
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.alertGroupScreenContext = 2;
      var alertGroupDetails = scopeObj.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails;
      scopeObj.presenter.getAlertTypeDetails({"AlertTypeId":alertGroupDetails.alertTypeDefinition.alertCode,
                                              "legalEntityId": alertGroupDetails.alertTypeDefinition.legalEntityId},
                                              "edit");
      scopeObj.view.flxAlertTypesContextualMenu.setVisibility(false);
      scopeObj.view.flxOptions.skin = "slFbox";
      scopeObj.initializeAlertGroupCreateData();
    };
    this.view.contextualMenuAlertTypeDetail.flxOption2.onClick = function(){
      scopeObj.alertGroupScreenContext = 2;
      var alertGroupDetails = scopeObj.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails;
      scopeObj.presenter.getAlertTypeDetails({"AlertTypeId":alertGroupDetails.alertTypeDefinition.alertCode,
                                              "legalEntityId": alertGroupDetails.alertTypeDefinition.legalEntityId},
                                              "statusChange");
    };
    this.view.contextualMenuAlertTypeDetail.flxOption3.onClick = function() {
      var isAccountLevelCat = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.containsAccountLevelAlerts;
      var alertCatCode = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryCode;
      scopeObj.presenter.getAlertCategoriesByAccountType({"alertCategoryCode" : alertCatCode,"isAccountLevel" : isAccountLevelCat,
                                                          "legalEntityId": scopeObj.view.lblAlertsHeaderSelLEValue.info.id});   
    };
    this.view.flxAlertTypesContextualMenu.onHover = scopeObj.onHoverEventCallback;
    this.view.addAlertTypeButtons.btnCancel.onClick = function(){
      scopeObj.clearValidationsForAddAlertGroup();
      scopeObj.hideAddAlertGroupScreen();
    };
    this.view.addAlertTypeButtons.btnSave.onClick = function(){
      scopeObj.clearValidationsForAddAlertGroup();
      var isValid = scopeObj.validateAddAlertGroupScreen();
      if(scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.CREATE &&
         isValid){
        scopeObj.showAddGroupConfirmationPopup();
      }else if(scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.EDIT &&
               isValid){
        scopeObj.editAlertGroup();
        scopeObj.hideAddAlertGroupScreen();
      }
    };
    this.view.customListboxAlertApps.btnOk.onClick = function(){
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertApps.flxSegmentList.isVisible === false);
    };
    this.view.customListboxAlertUsertypes.btnOk.onClick = function(){
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertUsertypes.flxSegmentList.isVisible === false);
    };
    this.view.customListboxAlertAccountTypes.btnOk.onClick = function(){
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.isVisible === false);
    };
    this.view.lstBoxAlertAttribute1.onSelection = function(){
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(false);
      scopeObj.changeUIForAttibute("attribute");
      scopeObj.view.lstBoxAlertAttribute2.selectedKey = "select";
      scopeObj.view.forceLayout();
    };
    this.view.lstBoxAlertAttribute2.onSelection = function(){
      scopeObj.changeUIForAttibute("criteria");
      scopeObj.view.forceLayout();
    };
    this.view.btnAddAlerts.onClick = function(){
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.CREATE;
      scopeObj.alertGroupScreenContext = 1;
      scopeObj.view.flxAlertTypesContextualMenu.setVisibility(false);
      scopeObj.view.flxOptions.skin = "slFbox";
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddGroup_UC");
      scopeObj.view.lblAddAlertTypeName.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlertGroup");
      scopeObj.initializeAlertGroupCreateData();
      scopeObj.showAddAlertGroupScreen();
    };
    this.view.noResultsWithButton.btnAddRecord.onClick = function(){
      scopeObj.view.btnAddAlerts.onClick();
    };
    this.view.segVariableReference.onRowClick = function() {
      var cursorPos;
      var strLength;
      var data = scopeObj.view.segVariableReference.data[scopeObj.view.segVariableReference.selectedIndex[1]];
      if(scopeObj.cursorPoint==="SMS/Text"){
        cursorPos = document.getElementById("frmAlertsManagement_txtSMSMsg").selectionStart;
        strLength = scopeObj.view.txtSMSMsg.text.length;
        scopeObj.view.txtSMSMsg.text = 
          scopeObj.view.txtSMSMsg.text.substring(0, cursorPos) +
          "[#]" + data.lbVariableReference.text + "[/#]" +
          scopeObj.view.txtSMSMsg.text.substring(cursorPos, strLength);
      }
      else if(scopeObj.cursorPoint==="PushNotification"){
        cursorPos = document.getElementById("frmAlertsManagement_txtPushNotification").selectionStart;
        strLength = scopeObj.view.txtPushNotification.text.length;
        scopeObj.view.txtPushNotification.text = 
          scopeObj.view.txtPushNotification.text.substring(0, cursorPos) +
          "[#]" + data.lbVariableReference.text + "[/#]" +
          scopeObj.view.txtPushNotification.text.substring(cursorPos, strLength);
      }
      else if(scopeObj.cursorPoint==="NotificationCenter"){
        cursorPos = document.getElementById("frmAlertsManagement_txtNotiCenterMsg").selectionStart;
        strLength = scopeObj.view.txtNotiCenterMsg.text.length;
        scopeObj.view.txtNotiCenterMsg.text = 
          scopeObj.view.txtNotiCenterMsg.text.substring(0, cursorPos) +
          "[#]" + data.lbVariableReference.text + "[/#]" +
          scopeObj.view.txtNotiCenterMsg.text.substring(cursorPos, strLength);
      }
      else if(scopeObj.cursorPoint==="Email"){
        document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.execCommand("insertText", false, "[#]" + data.lbVariableReference.text + "[/#]");
        this.emailRtxData = document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("editor").innerHTML;
      }
    };
    this.view.btnTabName1.onClick = function() {
      scopeObj.presenter.fetchAlertCategory(scopeObj.tab1.alertcategory_id);
      scopeObj.recentButton = scopeObj.view.btnTabName1;
      scopeObj.recentButtonIndex = 0;
    };
    this.view.btnTabName2.onClick = function() {
      scopeObj.presenter.fetchAlertCategory(scopeObj.tab2.alertcategory_id);        
      scopeObj.recentButton = scopeObj.view.btnTabName2;
      scopeObj.recentButtonIndex = 1;
    };
    this.view.btnTabName3.onClick = function() {
      scopeObj.presenter.fetchAlertCategory(scopeObj.tab3.alertcategory_id);                
      scopeObj.recentButton = scopeObj.view.btnTabName3;
      scopeObj.recentButtonIndex = 2;
    };
    this.view.btnTabName4.onClick = function() {
      scopeObj.presenter.fetchAlertCategory(scopeObj.tab4.alertcategory_id);                
      scopeObj.recentButton = scopeObj.view.btnTabName4;
      scopeObj.recentButtonIndex = 3;
    };
    this.view.toastMessage.flxRightImage.onClick = function() {
      scopeObj.view.toastMessage.hideToastMessage(scopeObj);
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function() {
      //scopeObj.cancelDeleteAlert();
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
      //scopeObj.deleteAlert();
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function() {
      //scopeObj.cancelDeleteAlert();
    };
    this.view.lblSMSVariableReference.onTouchStart = function() {
      scopeObj.cursorPoint="SMS/Text";
      scopeObj.view.flxVariableReferenceContainer.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.flxVariableReferenceContainer.left = scopeObj.view.lblSMSVariableReference.frame.x + 130 +"px";
      scopeObj.view.flxVariableReferenceContainer.top = (scopeObj.view.flxAddTemplate.frame.y+scopeObj.view.flxAddSMSTemplate.frame.y+ scopeObj.view.flxViewSubAlertContainer2.frame.y)-79 +"px";
      if (scopeObj.view.flxVariableReferenceContainer.isVisible === false) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(true);
      } else if (scopeObj.view.flxVariableReferenceContainer.isVisible === true) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.lblPushNotiVariableReference.onTouchStart = function() {
      scopeObj.cursorPoint="PushNotification";
      scopeObj.view.flxVariableReferenceContainer.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.flxVariableReferenceContainer.left = scopeObj.view.lblPushNotiVariableReference.frame.x + 125 +"px";
      scopeObj.view.flxVariableReferenceContainer.top = (scopeObj.view.flxAddTemplate.frame.y+scopeObj.view.flxAddPushNotification.frame.y+ scopeObj.view.flxViewSubAlertContainer2.frame.y)-79 +"px";
      if (scopeObj.view.flxVariableReferenceContainer.isVisible === false) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(true);
      } else if (scopeObj.view.flxVariableReferenceContainer.isVisible === true) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.lblNotiCenterVariableReference.onTouchStart = function() {
      scopeObj.cursorPoint="NotificationCenter";
      scopeObj.view.flxVariableReferenceContainer.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.flxVariableReferenceContainer.left = scopeObj.view.lblNotiCenterVariableReference.frame.x + 125 +"px";
      scopeObj.view.flxVariableReferenceContainer.top = (scopeObj.view.flxAddTemplate.frame.y+scopeObj.view.flxAddNotificationCenter.frame.y+scopeObj.view.flxViewSubAlertContainer2.frame.y)-79 +"px";
      if (scopeObj.view.flxVariableReferenceContainer.isVisible === false) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(true);
      } else if (scopeObj.view.flxVariableReferenceContainer.isVisible === true) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.lblEmailVariableReference.onTouchStart = function() {
      scopeObj.cursorPoint="Email";
      scopeObj.view.flxVariableReferenceContainer.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.flxVariableReferenceContainer.left = scopeObj.view.lblEmailVariableReference.frame.x + 125 +"px";
      scopeObj.view.flxVariableReferenceContainer.top = (scopeObj.view.flxAddTemplate.frame.y+scopeObj.view.flxAddEmailTemplate.frame.y+ scopeObj.view.flxViewSubAlertContainer2.frame.y)-79 +"px";
      if (scopeObj.view.flxVariableReferenceContainer.isVisible === false) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(true);
      } else if (scopeObj.view.flxVariableReferenceContainer.isVisible === true) {
        scopeObj.view.flxVariableReferenceContainer.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };
    this.view.flxAlertPreviewClose.onClick = function() {
      scopeObj.view.flxAlertPreview.setVisibility(false);
    };
    this.view.dataEntryAddAlertType12.tbxData.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmAlertsManagement_dataEntryAddAlertType12_tbxData");
    };
    this.view.dataEntryAddAlertType12.tbxData.onKeyUp = function(){
      scopeObj.view.dataEntryAddAlertType12.lblTextCounter.setVisibility(true);
      scopeObj.view.dataEntryAddAlertType12.lblTextCounter.text = scopeObj.view.dataEntryAddAlertType12.tbxData.text.length + "/50";
      scopeObj.clearValidationsForAddAlertGroup(1, scopeObj.view.dataEntryAddAlertType12.tbxData, scopeObj.view.dataEntryAddAlertType12.flxError);
    };
    this.view.dataEntryAddAlertType12.tbxData.onEndEditing = function(){
      scopeObj.view.dataEntryAddAlertType12.lblTextCounter.setVisibility(false);
    };
    this.view.lstBoxAddAlertType11.onSelection = function(){
      scopeObj.clearValidationsForAddAlertGroup(2, scopeObj.view.lstBoxAddAlertType11, scopeObj.view.flxAddAlertTypeError11);
      var selKey = scopeObj.view.lstBoxAddAlertType11.selectedKey;
      var check = scopeObj.checkForAlertCodeExsist(selKey);
      if(!check && scopeObj.alertGroupCurrAction === scopeObj.alertGroupActionConfig.CREATE){
        scopeObj.view.lstBoxAddAlertType11.skin = "redListBxSkin";
        scopeObj.view.flxAddAlertTypeError11.setVisibility(true);
        scopeObj.view.lblErrMsgAlertTypeCode.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Alert_group_code_already_exist");
      } else{
        scopeObj.view.lstBoxAddAlertType11.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
        scopeObj.view.flxAddAlertTypeError11.setVisibility(false);
      }
    };
    this.view.dataEntryAddAlertType11.tbxData.onKeyUp = function(){
      scopeObj.view.dataEntryAddAlertType11.lblTextCounter.setVisibility(true);
      scopeObj.view.dataEntryAddAlertType11.lblTextCounter.text = scopeObj.view.dataEntryAddAlertType11.tbxData.text.length + "/20";
      scopeObj.clearValidationsForAddAlertGroup(1,scopeObj.view.dataEntryAddAlertType11.tbxData,scopeObj.view.dataEntryAddAlertType11.flxError);
    };
    this.view.dataEntryAddAlertType11.tbxData.onEndEditing = function(){
      scopeObj.view.dataEntryAddAlertType11.lblTextCounter.setVisibility(false);
    };
    this.view.contextualMenuAlertTypeList.flxOption1.onClick = function() {
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.EDIT;
      scopeObj.alertGroupScreenContext = 1;
      scopeObj.view.flxGroupsListContextualMenu.setVisibility(false);
      scopeObj.view.flxAlertCategoryDetailsScreen.setVisibility(false);
      var groupCard = scopeObj.view.flxGroupsListContextualMenu.info.rowName;
      var alertGroupDetails = scopeObj.view[groupCard].info.alertGroupDetail;
      scopeObj.presenter.getAlertTypeDetails({"AlertTypeId":alertGroupDetails.code,
                                              "legalEntityId": alertGroupDetails.legalEntityId || ""},
                                              "edit");
      scopeObj.view.flxAlertTypesContextualMenu.setVisibility(false);
      scopeObj.view.flxOptions.skin = "slFbox";
      scopeObj.initializeAlertGroupCreateData();
    };	
    this.view.contextualMenuAlertTypeList.flxOption2.onClick = function() {
      scopeObj.view.flxGroupsListContextualMenu.setVisibility(false);
      scopeObj.alertGroupScreenContext = 1;
      var groupCard = scopeObj.view.flxGroupsListContextualMenu.info.rowName;
      var alertGroupDetails = scopeObj.view[groupCard].info.alertGroupDetail;
      scopeObj.presenter.getAlertTypeDetails({"AlertTypeId":alertGroupDetails.code,
                                              "legalEntityId": alertGroupDetails.legalEntityId || ""},
                                              "statusChange");
    };
    this.view.contextualMenuAlertTypeList.flxOption3.onClick = function() {
      scopeObj.alertGroupScreenContext = 1;
      var isAccountLevelCat = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.containsAccountLevelAlerts;
      var alertCatCode = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryCode;
      scopeObj.presenter.getAlertCategoriesByAccountType({"alertCategoryCode" : alertCatCode,"isAccountLevel" : isAccountLevelCat,
                                                          "legalEntityId": scopeObj.view.lblAlertsHeaderSelLEValue.info.id});  
    };
    this.view.segSequenceList.onRowClick = function(){
      scopeObj.selectCurrentRow();
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.presenter.fetchCategoryDetails({"AlertCategoryId":scopeObj.view.breadcrumbs.btnPreviousPage.info.id,
                                               "legalEntityId": scopeObj.view.lblAlertsHeaderSelLEValue.info.id});
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.presenter.fetchAlertCategories({"legalEntityId":scopeObj.view.lblAlertsHeaderSelLEValue.info.id});
    };
    this.view.breadcrumbs.btnPreviousPage1.onClick = function(){
      scopeObj.presenter.getAlertTypeDetails({ "AlertTypeId": scopeObj.view.breadcrumbs.btnPreviousPage1.info.id,
                                              "legalEntityId": scopeObj.view.lblAlertsHeaderSelLEValue.info.id},
                                              "viewDetails");
    };
    this.view.flxCategoryDetailsArrow.onClick = function(){
      if(scopeObj.view.flxAlertCategoryDetailBody.isVisible === true){
        scopeObj.view.flxAlertCategoryDetailBody.setVisibility(false);
        scopeObj.view.lblIconCategoryArrow.skin ="sknIcon6E7178Sz15px";
        scopeObj.view.lblIconCategoryArrow.text ="\ue922";//right-arrow
      } else{
        scopeObj.view.flxAlertCategoryDetailBody.setVisibility(true);
        scopeObj.view.lblIconCategoryArrow.skin ="sknIcon6E7178Sz13px";
        scopeObj.view.lblIconCategoryArrow.text ="\ue915";//down-arrow
      }
      scopeObj.view.forceLayout();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function(){
      scopeObj.alertGroupCurrAction = scopeObj.alertGroupActionConfig.CREATE;
      scopeObj.showCategoryLevelInternalScreens();
      scopeObj.clearAddCategoryScreen();
    };
    this.view.lblCategoryShowLangLink.onClick = function(){
      scopeObj.view.flxViewAlertLanguagesPopup.setVisibility(true);
    };
    this.view.flxLanguagesPopupClose.onClick = function(){
      scopeObj.view.flxViewAlertLanguagesPopup.setVisibility(false);
    };
    this.view.frequencySelectionCat.lstBoxFrequencyCol1.onSelection = function(){
      scopeObj.clearValidationsForAddCategory(2,scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol1,scopeObj.view.frequencySelectionCat.flxInlineError1);
      scopeObj.displayBasedOnSelectedFrequencyType(scopeObj.view.frequencySelectionCat);
    };
    this.view.frequencySelectionAlertType.lstBoxFrequencyCol1.onSelection = function(){
      scopeObj.clearValidationsForAddAlertGroup(2,scopeObj.view.frequencySelectionAlertType.lstBoxFrequencyCol1,scopeObj.view.frequencySelectionAlertType.flxInlineError1);
      scopeObj.displayBasedOnSelectedFrequencyType(scopeObj.view.frequencySelectionAlertType);
    };
    this.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.onSelection = function(){
      scopeObj.view.customListboxAlertApps.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertUsertypes.flxSegmentList.setVisibility(false);
      scopeObj.view.customListboxAlertAccountTypes.flxSegmentList.setVisibility(false);
      scopeObj.clearValidationsForAddSubAlert(2,scopeObj.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1,scopeObj.view.AlertFrequencySelectionCat.flxInlineError1);
      scopeObj.displayBasedOnSelectedFrequencyType(scopeObj.view.AlertFrequencySelectionCat);
    };
    this.view.flxAlertDetailsArrow.onClick = function(){
      if(scopeObj.view.lblIconAlertArrow.text ==="\ue915"){
        scopeObj.view.flxAlertFields.setVisibility(false);
        scopeObj.view.flxAlertDesc.setVisibility(false);
        scopeObj.view.lblIconAlertArrow.skin ="sknIcon6E7178Sz15px";
        scopeObj.view.lblIconAlertArrow.text ="\ue922";
      } else{
        scopeObj.view.flxAlertFields.setVisibility(true);
        scopeObj.view.flxAlertDesc.setVisibility(true);
        scopeObj.view.lblIconAlertArrow.skin ="sknIcon6E7178Sz13px";
        scopeObj.view.lblIconAlertArrow.text ="\ue915"; //down-arrow
      }
      scopeObj.view.forceLayout();
    };
    this.view.lblAlertShowLangLink.onClick = function(){
      scopeObj.view.flxViewAlertLanguagesPopup.setVisibility(true);
    };
    this.view.addAlertButtons.btnSave.onClick = function(){
      scopeObj.clearValidationsForAddSubAlert();
      if(scopeObj.validateFields()){
        if(scopeObj.alertGroupCurrAction===scopeObj.alertGroupActionConfig.CREATE&&scopeObj.view.dataEntrySubAlertName.flxError.isVisible===false&&scopeObj.view.flxAddAlertCodeError.isVisible===false){
          scopeObj.showAddAlertConfirmationPopup();
        }else if(scopeObj.alertGroupCurrAction===scopeObj.alertGroupActionConfig.EDIT&&scopeObj.view.dataEntrySubAlertName.flxError.isVisible===false){
          scopeObj.generateEditAlertJSON();
        }
      }
    };
    this.view.addAlertButtons.btnCancel.onClick = function(){
      scopeObj.presenter.getAlertTypeDetails({ "AlertTypeId": scopeObj.view.breadcrumbs.btnPreviousPage1.info.id,
                                               "legalEntityId":scopeObj.view.lblAlertsHeaderSelLEValue.info.id},
                                               "viewDetails");
    };
    this.view.frequencySelectionCat.lstBoxFrequencyCol2.onSelection = function(){
      scopeObj.clearValidationsForAddCategory(2,scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol2,scopeObj.view.frequencySelectionCat.flxInlineError2);
    };
    this.view.frequencySelectionCat.lstBoxFrequencyCol3.onSelection = function(){
      scopeObj.clearValidationsForAddCategory(2,scopeObj.view.frequencySelectionCat.lstBoxFrequencyCol3,scopeObj.view.frequencySelectionCat.flxInlineError3);
    };
    this.view.frequencySelectionCat.timePicker.lstbxHours.onSelection = function(){
      scopeObj.clearValidationsForAddCategory(2,scopeObj.view.frequencySelectionCat.flxFrequencyTime,scopeObj.view.frequencySelectionCat.flxInlineError4);
    };
    this.view.frequencySelectionCat.timePicker.lstbxMinutes.onSelection = function(){
      scopeObj.clearValidationsForAddCategory(2,scopeObj.view.frequencySelectionCat.flxFrequencyTime,scopeObj.view.frequencySelectionCat.flxInlineError4);
    };
    this.view.textBoxEntryCategoryName.tbxEnterValue.onTouchStart=function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmAlertsManagement_textBoxEntryCategoryName_tbxEnterValue");
    };
    this.view.textBoxEntryCategoryName.tbxEnterValue.onKeyUp = function(){
      scopeObj.view.textBoxEntryCategoryName.lblCount.text = scopeObj.view.textBoxEntryCategoryName.tbxEnterValue.text.length + "/50";
      scopeObj.clearValidationsForAddCategory(3,scopeObj.view.textBoxEntryCategoryName.flxEnterValue,scopeObj.view.textBoxEntryCategoryName.flxInlineError);
    };
    this.view.flxAlertTypeDetailsArrow.onClick = function(){
      if(scopeObj.view.flxAlertTypeDetailBody.isVisible === true){
        scopeObj.view.flxAlertTypeDetailBody.setVisibility(false);
        scopeObj.view.lblAlertTypeHeaderArrow.skin ="sknIcon6E7178Sz15px";
        scopeObj.view.lblAlertTypeHeaderArrow.text ="\ue922"; //right-arrow
      } else{
        scopeObj.view.flxAlertTypeDetailBody.setVisibility(true);
        scopeObj.view.lblAlertTypeHeaderArrow.skin ="sknIcon6E7178Sz13px";
        scopeObj.view.lblAlertTypeHeaderArrow.text ="\ue915"; //down-arrow
      }
      scopeObj.view.forceLayout();
    };
    this.view.lblAlertTypeViewAllLang.onClick = function(){
      scopeObj.view.flxViewAlertLanguagesPopup.setVisibility(true);
    };
    this.view.reassignPopupButtons.btnCancel.onClick = function(){
      scopeObj.view.flxReassignGroupPopup.setVisibility(false);
    };
    this.view.reassignPopupButtons.btnSave.onClick = function(){
      if(scopeObj.validateReassignGroup()){
        scopeObj.view.flxReassignGroupPopup.setVisibility(false);
        scopeObj.reassignAlertGroup();
      }
    };
    this.view.flxReassignGroupClose.onClick = function(){
      scopeObj.view.reassignPopupButtons.btnCancel.onClick();
    };
    this.view.lstBoxReassignGroup.onSelection = function(){
      scopeObj.view.flxReassignGroupError.setVisibility(false);
      scopeObj.view.lstBoxReassignGroup.skin = "sknLbxborderd7d9e03pxradius";
    };
    this.view.popupError.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.popupError.flxPopUpClose.onClick = function(){
      scopeObj.view.popupError.btnPopUpCancel.onClick();
    };
    this.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performSubAlertsStatusFilter();
    };
    this.view.flxSubAlertHeaderStatus.onClick = function(){
      var flxRight = scopeObj.view.flxSubAlertsHeader.frame.width - scopeObj.view.flxSubAlertHeaderStatus.frame.x - scopeObj.view.flxSubAlertHeaderStatus.frame.width;
      var iconRight = scopeObj.view.flxSubAlertHeaderStatus.frame.width - scopeObj.view.lblIconSubAlertStatusFilter.frame.x;
      scopeObj.view.flxSubAlertsStatusFilter.right = (flxRight + iconRight - 8) +"px";
      if(scopeObj.view.flxSubAlertsStatusFilter.isVisible){
        scopeObj.view.flxSubAlertsStatusFilter.setVisibility(false);
      } else{
        scopeObj.view.flxSubAlertsStatusFilter.setVisibility(true);
      }
    };
    this.view.lstBoxAddAlertCode.onSelection = function(){
      scopeObj.checkAlertCode();
    };
    this.view.flxDropDownServType.onClick = function(){
      if(scopeObj.view.flxDropDownDetailServType.isVisible)
        scopeObj.view.flxDropDownDetailServType.setVisibility(false);
      else{
        scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick();
        scopeObj.view.flxDropDownDetailServType.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    
    this.view.AdvancedSearchDropDownServType.sgmentData.onRowClick = function(){
      
      if(scopeObj.view.flxAddAlertCodeError.isVisible){
        
        scopeObj.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3px";
        scopeObj.view.lblErrorAlertCode.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectAlertCode");
        scopeObj.view.flxAddAlertCodeError.setVisibility(false);
      }

      var rowInd=scopeObj.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1];
      var segData=scopeObj.view.AdvancedSearchDropDownServType.sgmentData.data;
      
      // trim the data and add tool tip as there no reuse of values in the below label
      scopeObj.view.lblSelectedRowsServType.text=scopeObj.AdminConsoleCommonUtils.getTruncatedString(segData[rowInd].lblDescription.text, 28, 26);
      scopeObj.view.lblSelectedRowsServType.tooltip = segData[rowInd].lblDescription.text;
      
      scopeObj.checkAlertCode();
      scopeObj.view.flxDropDownDetailServType.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    

    this.view.AdvancedSearchDropDownServType.tbxSearchBox.onKeyUp = function(){
      if(scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text.trim().length>0){
        scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(true);
        var segData=scopeObj.view.AdvancedSearchDropDownServType.sgmentData.data;
        var searchText=scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text;
        var statusName="";
        var filteredData=segData.filter(function(rec){
          statusName=rec.lblDescription.text.toLowerCase();
          if(statusName.indexOf(searchText)>=0)
            return rec;
        });
        if(filteredData.length===0){
          scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(false);
          scopeObj.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(true);
        }else{
          scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(filteredData);
          scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
          scopeObj.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
        }
      }else{
        scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
        var totalRecords=scopeObj.view.AdvancedSearchDropDownServType.sgmentData.info.data;
        scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
      }
      scopeObj.view.forceLayout();
    };
    this.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick = function(){
      scopeObj.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
      scopeObj.view.AdvancedSearchDropDownServType.tbxSearchBox.text="";
      var totalRecords=scopeObj.view.AdvancedSearchDropDownServType.sgmentData.info.data;
      scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
      scopeObj.view.forceLayout();
    };
    this.view.dataEntrySubAlertName.tbxData.onTouchStart = function(){
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmAlertsManagement_dataEntrySubAlertName_tbxData");
    };
    this.view.dataEntrySubAlertName.tbxData.onEndEditing = function(){
      scopeObj.view.dataEntrySubAlertName.lblTextCounter.setVisibility(false);
      if(scopeObj.view.dataEntrySubAlertName.tbxData.text.trim().length>5)
        scopeObj.toCheckAlertNameAvailability();
    };
    this.view.dataEntrySubAlertName.tbxData.onKeyUp = function(){
      scopeObj.view.dataEntrySubAlertName.lblTextCounter.setVisibility(true);
      scopeObj.view.dataEntrySubAlertName.lblTextCounter.text = scopeObj.view.dataEntrySubAlertName.tbxData.text.length + "/50";
      scopeObj.clearValidationsForAddSubAlert(1,scopeObj.view.dataEntrySubAlertName.tbxData,scopeObj.view.dataEntrySubAlertName.flxError);
    };
    this.view.lstBoxRecipients.onSelection = function(){
      scopeObj.clearValidationsForAddSubAlert(2,scopeObj.view.lstBoxRecipients,scopeObj.view.flxAddAlertErrorRecipient);
    };
     this.view.flxLegalEntityDropdown.onClick = function () {
      if (scopeObj.view.flxLegalDropdown.isVisible === true) {
        scopeObj.view.flxLegalDropdown.setVisibility(false);
      } else {
        if(scopeObj.view.txtLegalSearch.text.length > 0){
          scopeObj.view.txtLegalSearch.text = "";
          var segData = scopeObj.view.segLegalEntity.info.allData;
          scopeObj.view.segLegalEntity.setData(segData);
          scopeObj.view.flxNoRecords.setVisibility(false);
          scopeObj.view.segLegalEntity.setVisibility(true);
        }
        scopeObj.view.flxLegalDropdown.setVisibility(true);
      }
    };
    this.view.segLegalEntity.onRowClick = function(eventObject){
      var rowInd = eventObject.selectedRowIndex ? eventObject.selectedRowIndex[1]: null;
      var selLEId = scopeObj.view.segLegalEntity.data[rowInd].id;
      var selLEName =  scopeObj.view.segLegalEntity.data[rowInd].companyName;
      scopeObj.view.lblSelectLegalEntity.text = selLEName;
      scopeObj.view.lblSelectLegalEntity.info.selectedLEId= selLEId;
      scopeObj.view.lblSelectLegalEntity.info.selectedLEName = selLEName;
      scopeObj.view.lblAlertsHeaderSelLEValue.info.id = selLEId;
      scopeObj.view.flxLegalDropdown.setVisibility(false);
      scopeObj.presenter.fetchMasterDataForLE(selLEId);
      scopeObj.presenter.fetchAlertCategories({"legalEntityId":selLEId});
    };
    scopeObj.view.txtLegalSearch.onKeyUp = function () {
      scopeObj.searchLegalEntity();
    };
    scopeObj.view.flxLegalDropdown.onHover = this.onHoverEventCallback;
    scopeObj.view.flxEditCategoryLEDropdown.onHover = this.onHoverEventCallback;
    
    this.view.flxEditCategorySelectedLE.onClick = function () {
      if (scopeObj.view.flxEditCategoryLEDropdown.isVisible === true) {
        scopeObj.view.flxEditCategoryLEDropdown.setVisibility(false);
      } else {
        if(scopeObj.view.txtEditCategoryLESearchbox.text.length > 0){
          scopeObj.view.txtEditCategoryLESearchbox.text = "";
          var segData = scopeObj.view.segEditCategoryLEList.info.allData;
          scopeObj.view.segEditCategoryLEList.setData(segData);
          scopeObj.view.flxEditCategoryLENoRecords.setVisibility(false);
          scopeObj.view.segEditCategoryLEList.setVisibility(true);
        }
        scopeObj.view.flxEditCategoryLEDropdown.setVisibility(true);
      }
    };
    this.view.segEditCategoryLEList.onRowClick = function(eventObject){
      var rowInd = eventObject.selectedRowIndex ? eventObject.selectedRowIndex[1]: null;
      var selLEId = scopeObj.view.segEditCategoryLEList.data[rowInd].id;
      var selLEName =  scopeObj.view.segEditCategoryLEList.data[rowInd].companyName;
      scopeObj.view.lblEditCategorySelectedLE.text = selLEName;
      scopeObj.view.lblEditCategorySelectedLE.info.selectedLEId= selLEId || "";
      scopeObj.view.lblEditCategorySelectedLE.info.selectedLEName = selLEName;
      scopeObj.view.flxEditCategoryLEDropdown.setVisibility(false);
      if(scopeObj.view.flxEditCategoryLEError.isVisible === true){
        scopeObj.clearValidationsForAddCategory(3,scopeObj.view.flxEditCategorySelectedLE, scopeObj.view.flxEditCategoryLEError);
      }
    };
    this.view.txtEditCategoryLESearchbox.onKeyUp = function(){
      scopeObj.searchLegalEntityAddCategory();
    };
  },
  /*
   * call to fetch all masterdata
   */
  getMasterData :  function(){
    var self = this;
    self.presenter.fetchMasterdata();
  },
   /*
   * call to fetch all masterdata dependent on LE
   */
  getLEBasedMasterData :  function(LEId){
    var self = this;
    self.presenter.fetchMasterDataForLE(LEId);
  },
  /*
   * To check if titles/subjects are filled when there is content in the description boxes
   */
  validateTitles : function(){
    var errorFlag=true;
    var emailEditorDocument = document.getElementById("iframe_rtxEmailTemplate").contentWindow.document;
    if(this.view.flxAddPushNotification.isVisible&&this.view.txtPushNotification.text!==""&&this.view.tbxPushNotificationTitle.text===""){
      errorFlag=false;
      this.view.lblNoPushNotificationError.text=kony.i18n.getLocalizedString("i18n.AlertsManagement.pushNotTitleEmpty");
      this.view.flxNoPushNotification.setVisibility(true);
    }else
      this.view.flxNoPushNotification.setVisibility(false);
    if(this.view.flxAddNotificationCenter.isVisible&&this.view.tbxNotiCenterTitle.text===""&&this.view.txtNotiCenterMsg.text!==""){
      errorFlag=false;
      this.view.lblNoNotiCenterError.text=kony.i18n.getLocalizedString("i18n.AlertsManagement.notifCenterTitleEmpty");
      this.view.flxNoNotiCenterMsgError.setVisibility(true);
    }else
      this.view.flxNoNotiCenterMsgError.setVisibility(false);
    if(this.view.flxAddEmailTemplate.isVisible&&this.view.tbxEmailSubject.text===""&&emailEditorDocument.getElementById("editor").innerHTML.length>0){      
      errorFlag=false;
      this.view.lblNoSubjectError.text=kony.i18n.getLocalizedString("i18n.AlertsManagement.emailSubjectEmpty");
      this.view.flxNoEmailSubject.setVisibility(true);
    }else
      this.view.flxNoEmailSubject.setVisibility(false);
    return errorFlag;
  },
  /*
   * show category related internal screens(list/details/add)
   * @param: option
   */
  showCategoryLevelInternalScreens: function(opt){
    this.view.flxAlertCategories.setVisibility(true);
    this.view.flxAlertCategoriesList.setVisibility(false);
    this.view.flxAlertCategoryDetailsScreen.setVisibility(false);
    this.view.flxEditAlertCategoryScreen.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxAlertsLEDropdown.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    if(opt === 1){
      this.view.flxAlertCategoriesList.setVisibility(true);
      this.view.mainHeader.flxHeaderSeperator.setVisibility(!this.isSingleEntity);
      this.view.flxAlertsLEDropdown.setVisibility(!this.isSingleEntity);
      this.view.mainHeader.btnAddNewOption.setVisibility(true);
    } else if(opt === 2){
      this.view.flxAlertCategoryDetailsScreen.setVisibility(true);
      this.view.flxAlertsSelectedLEVal.setVisibility(!this.isSingleEntity);
    } else{
      this.view.flxEditAlertCategoryScreen.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
   * show add/edit alert group screen
   */
  showAddAlertGroupScreen :  function(){
    this.clearValidationsForAddAlertGroup();
    this.view.flxAlertTypes.setVisibility(true);
    this.view.flxAddAlertTypeScreen.setVisibility(true);
    this.view.flxAlertTypeDetailsScreen.setVisibility(false);
    this.view.flxAlertCategories.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(false);
    this.view.lstBoxAddAlertType11.setEnabled(true);
    this.view.breadcrumbs.btnPreviousPage.text = this.view.lblViewDetailsCategoryDisplayName.text.toUpperCase();
    this.toggleBreadcrumbButtons("alertgroup");
    this.view.flxAlertConfiguration.setContentOffset({y:0,x:0});
    if(this.alertGroupCurrAction === this.alertGroupActionConfig.CREATE){
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddGroup_UC");
      this.view.addAlertTypeButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddGroup_UC");
      this.view.addAlertTypeButtons.btnSave.width = "137dp";
    }else if(this.alertGroupCurrAction === this.alertGroupActionConfig.EDIT){
      this.view.breadcrumbs.lblCurrentScreen.text = this.view.lblViewDetailsAlertDisplayName.text ?
        kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Edit")+" "+ this.view.lblViewDetailsAlertDisplayName.text.toUpperCase() : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.EditGroup").toUpperCase();
      this.view.addAlertTypeButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UpdateGroup_UC");
      this.view.addAlertTypeButtons.btnSave.width = "158dp";
    }
    this.view.flxAlertsSelectedLEVal.setVisibility(false);
    this.view.flxAddAlertTypeSelLE.setVisibility(!this.isSingleEntity);
    this.view.forceLayout();
  },
  /*
   * hide add/edit alert group screen
   */
  hideAddAlertGroupScreen : function(){
    this.view.flxAddAlertTypeScreen.setVisibility(false);
    if(this.alertGroupScreenContext === 1){ //show category details screen
      this.view.flxAlertTypes.setVisibility(false);
      this.showCategoryLevelInternalScreens(2);
      this.toggleBreadcrumbButtons("category");
      this.view.breadcrumbs.lblCurrentScreen.text =this.view.lblViewDetailsCategoryDisplayName.text.toUpperCase();
    } else{ //show alert group details screen
      this.view.flxAlertTypeDetailsScreen.setVisibility(true);
      this.view.flxAlertsSelectedLEVal.setVisibility(!this.isSingleEntity);
      this.toggleBreadcrumbButtons("alertgroup");
      this.view.breadcrumbs.lblCurrentScreen.text =this.view.lblViewDetailsAlertDisplayName.text.toUpperCase();
    }

  },
  showAlertCategoryDetailScreen : function(){
    this.showCategoryLevelInternalScreens(2);
    this.view.flxAlertTypes.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ALERTS_UC");
    this.view.breadcrumbs.lblCurrentScreen.text = this.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryName.toUpperCase();
    this.toggleBreadcrumbButtons("category");
    this.view.flxAlertConfiguration.setContentOffset({y:0,x:0});
    this.view.flxAlertCategoryDetailBody.setVisibility(true);
    this.view.lblIconCategoryArrow.skin ="sknIcon6E7178Sz13px";
    this.view.lblIconCategoryArrow.text ="\ue915";
    this.view.forceLayout();
  },
  /*
   * show alert group details screen
   */
  showAlertGroupDetailScreen :  function(){
    this.view.flxAlertTypes.setVisibility(true);
    this.view.flxAddAlertTypeScreen.setVisibility(false);
    this.view.flxAlertTypeDetailsScreen.setVisibility(true);
    this.view.flxAlertCategories.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(false);
    this.view.flxAlertConfiguration.setContentOffset({x:0,y:0});
    this.view.flxAlertsSelectedLEVal.setVisibility(!this.isSingleEntity);
    this.view.breadcrumbs.btnPreviousPage.text = this.view.lblViewDetailsCategoryDisplayName.text.toUpperCase();
    this.view.breadcrumbs.lblCurrentScreen.text =this.view.lblViewDetailsAlertDisplayName.text.toUpperCase();
    this.toggleBreadcrumbButtons("alertgroup");
    this.alertGroupScreenContext = 2;
    this.view.forceLayout();
  },
  /*
  * set data to category details screen
  * category definition details
  */
  setCategoryDetailData: function(categoryDetails) {
    this.view.breadcrumbs.btnPreviousPage.info = {"id": categoryDetails.categoryDefintion.categoryCode};
    this.view.breadcrumbs.btnPreviousPage.text = categoryDetails.categoryDefintion.categoryName.toUpperCase();
    this.view.breadcrumbs.lblCurrentScreen.text = categoryDetails.categoryDefintion.categoryName.toUpperCase();
    this.view.lblViewDetailsCategoryDisplayName.text = categoryDetails.categoryDefintion.categoryName;
    this.view.lblCategoryValueCol01.text = (categoryDetails.categoryDefintion.containsAccountLevelAlerts === "true") ?
      kony.i18n.getLocalizedString("i18n.common.yes") : kony.i18n.getLocalizedString("i18n.common.no");
    this.view.lblCategoryValueCol03.text = "";
    var catLeData =  this.getLEDesc(categoryDetails.categoryDefintion.legalEntityId);
    this.view.lblAlertsHeaderSelLEValue.text = catLeData && catLeData[0] ? catLeData[0].companyName : "";
    this.view.lblAlertsHeaderSelLEValue.info = {"id":categoryDetails.categoryDefintion.legalEntityId};
    var str = "";
    this.supportedChannels=[];
    this.sortBy = this.getObjectSorter("channelDisplayName");
    var sortedChannels = categoryDetails.categoryChannels.sort(this.sortBy.sortData);
    for (var i = 0; i < sortedChannels.length; i++) {
      if (sortedChannels[i].isChannelSupported === "true") {
        str += sortedChannels[i].channelDisplayName + ", ";
        this.supportedChannels.push(sortedChannels[i].channelDisplayName);
      }
    }
    if (str.substr(str.length-2,2) === ", ") {
      str = str.substring(0,str.length-2);
    }
    this.view.lblCategoryValueCol03.text = str || this.sNA;
    if (categoryDetails.categoryDefintion.categoryStatus === this.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      this.view.lblViewDetailsCategoryStatus.text = this.sActive;
      this.view.lblIconViewDetailsCategoryStatus.skin = "sknFontIconActivate";
      this.view.flxAlertCategoryMessage.setVisibility(false);
      this.view.flxAlertTypeMessage.setVisibility(false);
      this.view.flxAlertMessage.setVisibility(false);
    } else {
      this.view.lblViewDetailsCategoryStatus.text = this.sInActive;
      this.view.lblIconViewDetailsCategoryStatus.skin = "sknfontIconInactive";
      this.view.flxAlertCategoryMessage.setVisibility(true);
      this.view.flxAlertTypeMessage.setVisibility(true);
      this.view.alertMessage.lblData.text="Alert notifications will not work as alert category is inactive currently!";
      this.view.flxAlertMessage.setVisibility(true);
      this.view.alertCategoryMessage.lblData.text = this.sAlertCategoryInactive;
      this.view.alertTypeMessage.lblData.text = this.sAlertCategoryInactive;
      this.view.alertMessage.lblData.text = this.sAlertCategoryInactive;
    }
    var frequency = {
      "type":categoryDetails.categoryDefintion.frequencyId || "",
      "value":categoryDetails.categoryDefintion.frequencyValue || "",
      "time": categoryDetails.categoryDefintion.frequencyTime ? this.timeValueObj(categoryDetails.categoryDefintion.frequencyTime) : ""
    };
    var frequencyText = this.getFrequencyText(frequency);
    this.view.lblCategoryValueCol02.text = frequencyText;
    var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
    //get default locale description
    var defaultLangDesc = "";
    for(var j=0; j<categoryDetails.displayPreferences.length; j++){
      if(currLocale === categoryDetails.displayPreferences[j].LanguageCode){
        defaultLangDesc = categoryDetails.displayPreferences[j];
        break;
      }
    }
    //assign curr locale description if available else assign first description record
    if(defaultLangDesc){
      var currLangName = this.getLanguageNameForCode(currLocale);
      this.view.lblCategoryDescLanguage.text = currLangName ? " - "+ currLangName.toUpperCase(): "";
      this.view.lblCategoryDescValue.text = defaultLangDesc.Description;
    } else{
      var langCode =  categoryDetails.displayPreferences.length > 0 ? categoryDetails.displayPreferences[0].LanguageCode : "";
      var localeLangName = this.getLanguageNameForCode(langCode);
      this.view.lblCategoryDescLanguage.text = localeLangName ? " - "+ localeLangName.toUpperCase(): "";
      this.view.lblCategoryDescValue.text = categoryDetails.displayPreferences.length > 0 ? categoryDetails.displayPreferences[0].Description : "N/A";
    }
    this.view.breadcrumbs.btnBackToMain.info = {"id":categoryDetails.categoryDefintion.categoryCode};
    this.setAllLanguagesCategoryData(categoryDetails.displayPreferences);
    var lePermissionsData = this.getLEListForFormAction("frmAlertsManagement", 'UPDATE');
    var accessLEId = [];
    for(let k=0; k<lePermissionsData.length; k++){
      accessLEId.push(lePermissionsData[k].id);
    }
    var showEditOption = accessLEId.includes(categoryDetails.categoryDefintion.legalEntityId) ? true : false;
    this.view.flxCategoryOptions.setVisibility(showEditOption);
  },
  /*
  * to update the category status label on activate or deactivate
  * @param: updated status id value
  */
  setCategoryDetailsStatusLabel : function(statusId){
    if (statusId === this.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      this.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryStatus = this.AdminConsoleCommonUtils.constantConfig.ACTIVE;
      this.view.lblViewDetailsCategoryStatus.text = this.sActive;
      this.view.lblIconViewDetailsCategoryStatus.skin = "sknFontIconActivate";
      this.view.flxAlertCategoryMessage.setVisibility(false);
      this.view.flxAlertTypeMessage.setVisibility(false);
      this.view.flxAlertMessage.setVisibility(false);
    } else {
      this.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryStatus = this.AdminConsoleCommonUtils.constantConfig.INACTIVE;
      this.view.lblViewDetailsCategoryStatus.text = this.sInActive;
      this.view.lblIconViewDetailsCategoryStatus.skin = "sknfontIconInactive";
      this.view.flxAlertCategoryMessage.setVisibility(true);
      this.view.flxAlertTypeMessage.setVisibility(true);
      this.view.alertMessage.lblData.text="Alert notifications will not work as alert category is inactive currently!";
      this.view.flxAlertMessage.setVisibility(true);
      this.view.alertCategoryMessage.lblData.text = this.sAlertCategoryInactive;
      this.view.alertTypeMessage.lblData.text = this.sAlertCategoryInactive;
      this.view.alertMessage.lblData.text = this.sAlertCategoryInactive;
    }
  },
  /*
  * set all locale languages data to languages popup
  * @param: language preferences
  */
  setAllLanguagesCategoryData : function(langPreferences){
    var self =this;
    var widgetMap = {
      "lblLanguage":"lblLanguage",
      "lblAlertDisplayName":"lblAlertDisplayName",
      "lblAlertDisplayDesc":"lblAlertDisplayDesc",
      "lblSeperator":"lblSeperator",
      "flxViewAllLanguagePopup":"flxViewAllLanguagePopup"
    };
    var segData = langPreferences.map(function(rec){
      var getLangName = self.getLanguageNameForCode(rec.LanguageCode|| rec.languageCode);
      return {
        "lblLanguage":getLangName,
        "lblAlertDisplayName": rec.DisplayName|| rec.displayName,
        "lblAlertDisplayDesc": rec.Description|| rec.description,
        "lblSeperator":"-",
        "template":"flxViewAllLanguagePopup"
      };
    });
    this.view.segLanguagesPopup.widgetDataMap = widgetMap;
    this.view.segLanguagesPopup.setData(segData);
    this.view.forceLayout();

  },   
  /** returns channel string based on input type
   * @param {object} data -  object describes which channel is active 
   * @param {string} data.IsSmsActive - "true"/"false" value
   * @param {string} data.IsEmailActive - "true"/"false" value
   * @param {string} data.IsPushActive - "true"/"false" value
   */
  getChannelString: function(data) {
    var channels = "";
    if (data.IsSmsActive === "true") {
      channels = channels + "SMS";
    }
    if (data.IsEmailActive === "true") {
      channels = channels !== "" ? 
        channels + kony.i18n.getLocalizedString("i18n.frmAlertsManagementController._Email") : "Email";
    }
    if (data.IsPushActive === "true") {
      channels = channels !== "" ? 
        channels + kony.i18n.getLocalizedString("i18n.frmAlertsManagementController._Push") :
      kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.Push");
    }
    return channels;
  },
  /*
   * function to populate attributes names in the listbox
   * @param: attribute list
   */
  setAttributes :  function(list){
    var self =this;
    var attributeList = [];
    attributeList = list.reduce(
      function (arr, record) {
        /* if(record.id === "ALERT_ATTRIBUTE_FREQUENCY"){
          self.setFrequency(record.values);
        }*/
        return arr.concat([[record.alertattribute_id, record.alertattribute_name]]);
      }, [["none", "None"]]);
    self.view.lstBoxAlertAttribute1.masterData = attributeList;
    self.view.lstBoxAlertAttribute1.selectedKey = "none";
  },
  /*
   * function to populate criteria in the listbox
   * @param: criteria list
   */
  setCriteria :  function(list){
    var self =this;
    var criteriaList = [];
    criteriaList = list.reduce(
      function (arr, record) {
        return arr.concat([[record.id, record.Name]]);
      }, [["select", "Select a criteria"]]);
    self.view.lstBoxAlertAttribute2.masterData = criteriaList;
    self.view.lstBoxAlertAttribute2.selectedKey = "select";
    self.view.lstBoxAlertAttribute2.info = {"data" : criteriaList};
  },
  /*
   * function to populate recipients in the listbox
   * @param: recipients list
   */
  setRecipients :  function(list){
    var self =this;
    var recipientList = [];
    recipientList = list.reduce(
      function (arr, record) {
        return arr.concat([[record.id+ "", record.Name]]);
      }, [["select", kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectARecipient")]]);
    self.view.lstBoxRecipients.masterData = recipientList;
    self.view.lstBoxRecipients.selectedKey = "select";
  },
  /*
   * function to populate languages in the listbox
   * @param: languages list
   */
  setLanguages : function(data){
    var self = this;
    var langList = [];
    langList = data.reduce(
      function (list, record) {
        return list.concat([[record.Code, record.Language]]);
      }, [["select", "Select"]]);
    self.listBoxDataLang = langList;
    self.langToShow = langList.splice(1,self.listBoxDataLang.length-1);
  },
  /*
   * function to populate alert group codes in the listbox
   * @param: alert group codes list
   */
  setAlertGroupCodes : function(data){
    var self = this;
    var codeList = [];
    codeList = data.eventTypes.reduce(
      function (list, record) {
        return list.concat([[record.id, record.id]]);
      }, [["select", "Select a code"]]);
    self.view.lstBoxAddAlertType11.masterData = codeList;
    self.view.lstBoxAddAlertType11.selectedKey = "select";
  },
  /*
  * function to set accountTypes master data
  * @param: accountTypes
  */
  setAccountTypes : function(data){
    var self = this;
    var listBoxData = [];
    var widgetDataMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    self.view.customListboxAlertAccountTypes.segList.widgetDataMap = widgetDataMap;
    if (data) {
      listBoxData = data.map(function(rec) {
        return {
          "id": rec.TypeID,
          "lblDescription": {"text":rec.displayName},
          "imgCheckBox": {"src":self.checkboxselected},
          "template": "flxSearchDropDown"
        };
      });
    }
    self.view.customListboxAlertAccountTypes.segList.setData(listBoxData);
    self.view.customListboxAlertAccountTypes.imgCheckBox.src=self.checkboxselected;
    var arr = [];
    for(var i= 0; i< data.length; i++){
      arr.push(i);
    }
    self.view.customListboxAlertAccountTypes.segList.selectedIndices = [[0,arr]];
    self.view.customListboxAlertAccountTypes.lblSelectedValue.text = self.sAll;
    self.view.forceLayout();
  },
  /*
  * set master data to frequency type listbox in frequency selection
  */
  setFrequencyTypes: function(data){
    var self = this;
    var freqList = [];
    freqList = data.reduce(
      function (list, record) {
        return list.concat([[record.alertfrequency_id, record.alertfrequencytext_displayName]]);
      }, [["SELECT", "Select a frequency"]]);
    self.view.frequencySelectionCat.lstBoxFrequencyCol1.masterData = freqList;
    self.view.frequencySelectionCat.lstBoxFrequencyCol1.selectedKey = "SELECT";
    self.view.frequencySelectionAlertType.lstBoxFrequencyCol1.masterData = freqList;
    self.view.frequencySelectionAlertType.lstBoxFrequencyCol1.selectedKey = "SELECT";
    var updatedList = freqList.slice(1);
    var defaultKey =[["none","None"]];
    updatedList = defaultKey.concat(updatedList);
    self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.masterData = updatedList;
    self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey = "none";
    self.view.forceLayout();
  },
  /*
  * set master data to days listbox in frequency selection
  */
  setDatesListbox:  function(){
    var masterData = [["SELECT","Select a Date"]];
    for(var i=1;i <=31; i++){
      masterData.push([i.toString(),i]);
    }
    this.view.frequencySelectionCat.lstBoxFrequencyCol2.masterData = masterData;
    this.view.frequencySelectionCat.lstBoxFrequencyCol2.selectedKey = "SELECT";
    this.view.frequencySelectionAlertType.lstBoxFrequencyCol2.masterData = masterData;
    this.view.frequencySelectionAlertType.lstBoxFrequencyCol2.selectedKey = "SELECT";
    this.view.AlertFrequencySelectionCat.lstBoxFrequencyCol2.masterData = masterData;
    this.view.AlertFrequencySelectionCat.lstBoxFrequencyCol2.selectedKey = "SELECT";
    this.view.forceLayout();
  },
  /*
   * initialize required data for add alert group
   */
  initializeAlertGroupCreateData : function(){
    var self =this;
    var accRadioData = [],typeRadioData = [];
    self.selectedChannelList = [];
    self.view.lstBoxAddAlertType11.selectedKey = "select";
    self.view.dataEntryAddAlertType11.tbxData.text = "";
    self.view.dataEntryAddAlertType12.tbxData.text = "";
    self.view.addAlertTypeStatusSwitch.switchToggle.selectedIndex = 0;
    self.clearFrequencytoDefaults(self.view.frequencySelectionAlertType);
    self.createDefaultChannels(self.defaultChannelList, self.view.flxAddAlertTypeChannelCont, "alertGroupChannel");
    var alertCategory = this.view.lblViewDetailsCategoryDisplayName.info.categoryDetails;
    var isAccountLevel = alertCategory.categoryDefintion.containsAccountLevelAlerts;
    if(isAccountLevel === "true"){ //if account level
      accRadioData = [{"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":self.radioDisabled,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                      {"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
      typeRadioData = [{"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GlobalAlert"),"id":"GA"},
                       {"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":self.radioDisabled,"value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UserAlert"),"id":"UA"},];
      self.view.radioBtnAddAlertType13.setData(accRadioData);
      self.view.radioBtnAddAlertType21.setData(typeRadioData);
      self.view.radioBtnAddAlertType13.setEnabled(false);
      self.view.radioBtnAddAlertType21.setEnabled(false);
    } else{ //not account level
      accRadioData = [{"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                      {"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":self.radioDisabled,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
      typeRadioData = [{"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GlobalAlert"),"id":"GA"},
                       {"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":self.radioSelected,"value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UserAlert"),"id":"UA"},];
      self.view.radioBtnAddAlertType13.setData(accRadioData);
      self.view.radioBtnAddAlertType21.setData(typeRadioData);
      self.view.radioBtnAddAlertType13.setEnabled(false);
      self.view.radioBtnAddAlertType21.setEnabled(true);
    }
    if(self.alertGroupCurrAction === self.alertGroupActionConfig.CREATE){
      self.addDefaultRowDataForLangSeg(2);
    }
    this.view.lblAddAlertTypeSelLEVal.text = this.view.lblSelectLegalEntity.info.selectedLEName;

  },
  /*
  * maaping categories for reorder segment
  * @param: category list
  */
  mappingCategorySegmentSequenceData: function(data) {
    return {
      "id": data.alertcategory_id,
      "lblName": data.alertcategory_Name,
      "lblSeqNum": data.alertcategory_DisplaySequence,
      "flxAlertSequenceMap":{"skin":"sknbackGroundffffff100"},
      "template": "flxAlertSequenceMap",
    };
  },
  /*
  * maaping alert groups for reorder segment
  * @param: alert groups list
  */
  mappingAlertSegmentSequenceData: function(data) {
    return {
      "id": data.code,
      "lblName": data.name,
      "lblSeqNum": data.displaySequence,
      "flxAlertSequenceMap":{"skin":"sknbackGroundffffff100"},
      "template": "flxAlertSequenceMap",
    };
  },
  /*
  * set data to reorder popup
  * @param: categories/alert groups list
  */
  setReorderSegmentData: function(data) {
    if (data.length <= 0) {
      this.view.lblSubHeaderSequencePopUp.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NoAssociatedAlerts");
      this.view.segSequenceList.setVisibility(false);
    } else {
      this.view.segSequenceList.setVisibility(true);
      this.view.lblSubHeaderSequencePopUp.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ReorderAlertGroup");
    }
    var widgetMap = {
      "id":"id",
      "lblName": "lblName",
      "lblSeqNum": "lblSeqNum",
      "flxAlertSequenceMap" :"flxAlertSequenceMap"
    };
    this.sortBy = this.getObjectSorter("lblSeqNum");
    this.view.segSequenceList.widgetDataMap = widgetMap;
    //align position of buttons flex based on scrollbar visibility
    if(data.length > 6){
      this.view.flxAlertSequenceIcons.right = "37dp";
    }else{
      this.view.flxAlertSequenceIcons.right = "19dp";
    }
    if(data.length === 1) this.enableDisableAllArrows(0);
    this.view.segSequenceList.setData(data.sort(this.sortBy.sortData));
    this.view.flxSequencePopUp.forceLayout();
  }, 
  moveBottom :function(ind)
  {
    var self = this;
    var rowData = self.view.segSequenceList.data[ind];
    if(ind < self.view.segSequenceList.data.length - 1){
      self.view.segSequenceList.addDataAt(rowData, self.view.segSequenceList.data.length);
      self.view.segSequenceList.removeAt(ind);
      self.reorderAlertIndex = self.view.segSequenceList.data.length-1;
      self.disableArrowsSequencePopup(self.reorderAlertIndex);
    }
  },
  moveTop: function(ind)
  {
    var self = this;
    var rowData = self.view.segSequenceList.data[ind];
    if(ind >0){
      self.view.segSequenceList.addDataAt(rowData, 0);
      self.view.segSequenceList.removeAt(ind+1);
      self.reorderAlertIndex = 0;
      self.disableArrowsSequencePopup(self.reorderAlertIndex);
    }
  },
  moveDown: function(ind)
  {
    var self =this;
    var rowData = self.view.segSequenceList.data[ind];
    var rowData2 = self.view.segSequenceList.data[ind+1];
    if(ind < self.view.segSequenceList.data.length - 1)
    {
      self.view.segSequenceList.removeAt(ind+1);
      self.view.segSequenceList.removeAt(ind);
      self.view.segSequenceList.addDataAt(rowData2,ind);
      self.view.segSequenceList.addDataAt(rowData,ind+1);
      self.reorderAlertIndex = ind+1;
      self.disableArrowsSequencePopup(self.reorderAlertIndex);
    }
  },
  moveUp: function(ind)
  {
    var self = this;
    var rowData = self.view.segSequenceList.data[ind];
    if (ind > 0) {
      self.view.segSequenceList.removeAt(ind);
      self.view.segSequenceList.addDataAt(rowData, ind - 1);
      self.reorderAlertIndex = ind-1;
      self.disableArrowsSequencePopup(self.reorderAlertIndex);
    }
  },
  /*
   * function to disable arrows
   * @param: row position
   */
  disableArrowsSequencePopup : function(rowInd){
    var self = this;
    var segLength = self.view.segSequenceList.data.length;
    if(rowInd <= 0){
      self.enableDisableAllArrows(1);
      //disable skins
      self.view.flxArrowTopMostPosition.hoverSkin ="sknCursorDisabled";
      self.view.flxArrowTopPosition.hoverSkin ="sknCursorDisabled";
      self.view.lblArrowTopMostPosition.skin ="sknIconC0C0C020px";
      self.view.lblArrowTopPosition.skin="sknIconC0C0C014px";
    }else if(rowInd >= segLength-1){
      self.enableDisableAllArrows(1);
      //disable skins
      self.view.flxArrowBottomPosition.hoverSkin ="sknCursorDisabled";
      self.view.flxArrowBottomMostPosition.hoverSkin ="sknCursorDisabled";
      self.view.lblArrowBottomPosition.skin="sknIconC0C0C014px";
      self.view.lblArrowBottomMostPosition.skin="sknIconC0C0C020px";
    } else{
      self.enableDisableAllArrows(1);
    }
    self.view.forceLayout();
  },
  /*
   * function to enable all the arrow's skins
   * @param: status (0-disable,1-enable)
   */
  enableDisableAllArrows : function(status){
    var self =this;
    if(status === 1){ //enabled state
      self.view.flxArrowTopMostPosition.hoverSkin ="sknCursor";
      self.view.flxArrowTopPosition.hoverSkin ="sknCursor";
      self.view.flxArrowBottomPosition.hoverSkin ="sknCursor";
      self.view.flxArrowBottomMostPosition.hoverSkin ="sknCursor";

      self.view.lblArrowTopMostPosition.skin ="sknIcon20px";
      self.view.lblArrowTopPosition.skin="sknIcon00000014px";
      self.view.lblArrowBottomPosition.skin="sknIcon00000014px";
      self.view.lblArrowBottomMostPosition.skin="sknIcon20px";
    } else if(status === 0){   //disabled state
      self.view.flxArrowTopMostPosition.hoverSkin ="sknCursorDisabled";
      self.view.flxArrowTopPosition.hoverSkin ="sknCursorDisabled";
      self.view.flxArrowBottomPosition.hoverSkin ="sknCursorDisabled";
      self.view.flxArrowBottomMostPosition.hoverSkin ="sknCursorDisabled";

      self.view.lblArrowTopMostPosition.skin ="sknIconC0C0C020px";
      self.view.lblArrowTopPosition.skin="sknIconC0C0C014px";
      self.view.lblArrowBottomPosition.skin="sknIconC0C0C014px";
      self.view.lblArrowBottomMostPosition.skin="sknIconC0C0C020px";
    }
  },
  /*
  * create and set alert groups list UI
  * @param: alert groups list
  */
  setAlertGroupListData: function(data) {
    var alertGroups = data.alertGroups;
    if(alertGroups && alertGroups.length > 0){
      this.sortBy = this.getObjectSorter("displaySequence");
      var sortedData = alertGroups.sort(this.sortBy.sortData);
      var groupedAlerts = this.groupAlertsBasedOnAlertGroup(data.alertSubTypes);
      this.view.flxAlertListSegment.removeAll();
      var screenWidth = kony.os.deviceInfo().screenWidth;

      let isAcctLevel = data.categoryDefintion.containsAccountLevelAlerts === "true";
      for (var i = 0; i < sortedData.length; i++) {
        var num = i>10 ? i : "0"+i;
        var alertGroupToAdd = new com.adminConsole.alerts.alertGroupLayout({
          "id": "alertGroupCard" +num,
          "isVisible": true,
          "width": (screenWidth - 305 - 70 - 40) + "px",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": "10px"
        }, {}, {});
        this.view.flxAlertListSegment.add(alertGroupToAdd);
        this.setAlertGroupCardUI(alertGroupToAdd,sortedData[i]);
        this.setAlertsListOfAlertGroup(alertGroupToAdd,groupedAlerts[sortedData[i].code]);

        // updating the user and global alerts count
        let alertsGrp = groupedAlerts[sortedData[i].code];
        let globalAlertsCount  = alertsGrp ? alertsGrp.filter(function(grp){return grp.isGlobal === '1' || grp.isGlobal.toLowerCase() === 'true'}).length : 0; 

        let autoSubCount  = alertsGrp ? alertsGrp.reduce((total , grp)=>{return grp.isAutoSubscribeEnabled === 'true' ? total +1 :total},0) : 0; 
        let defFreqCount  = alertsGrp ? alertsGrp.reduce((total , grp)=>{return grp.defaultFrequencyId ? total +1 : total },0) : 0; 
        
        defFreqCount = defFreqCount<10 ? "0"+defFreqCount:defFreqCount;
        autoSubCount = autoSubCount<10 ? "0"+autoSubCount:autoSubCount;
        globalAlertsCount = globalAlertsCount<10 ? "0"+globalAlertsCount:globalAlertsCount;
        let usrAlertsCount =alertsGrp ? alertsGrp.length - globalAlertsCount:0;
        usrAlertsCount = usrAlertsCount <10 ? "0"+usrAlertsCount:usrAlertsCount;

        alertGroupToAdd.lblAlertsCount.text = globalAlertsCount;
        alertGroupToAdd.lblAutoSubscribeCount.text = autoSubCount;
        alertGroupToAdd.lblDefFreqCount.text = defFreqCount;
        alertGroupToAdd.lblUsrAlertsCount.text = usrAlertsCount;
        
        // if it's account level we hide the global alerts
        if(isAcctLevel){
          alertGroupToAdd.flxAlertGroupTypeIcon.setVisibility(false);
          alertGroupToAdd.lblAlertsHeader.setVisibility(false);
          alertGroupToAdd.lblAlertsCount.setVisibility(false);
          alertGroupToAdd.lblHorizSeperator1.setVisibility(false);
        }
        alertGroupToAdd.lblAlertsCount.centerY="50%";
      }
      this.view.flxAlertListSegment.setVisibility(true);
      this.view.flxAlertListSegHeader.setVisibility(true);
      this.view.flxNoAlertGroups.setVisibility(false);
      this.view.flxAddAlertBtn.setVisibility(true);
    } else{ //no alert groups available
      this.view.flxAlertListSegment.removeAll();
      this.view.flxAlertListSegment.setVisibility(false);
      this.view.flxAlertListSegHeader.setVisibility(false);
      this.view.flxNoAlertGroups.setVisibility(true);
      this.view.flxAddAlertBtn.setVisibility(false);
    }
    //hide/show create alert group button based on the LE permissions
    var isLePermAvail = this.isPermissionAvailableForLE(this.view.lblAlertsHeaderSelLEValue.info.id, "CREATE");
    this.view.btnAddAlerts.setVisibility(isLePermAvail);
    this.view.noResultsWithButton.btnAddRecord.setVisibility(isLePermAvail);
    this.view.forceLayout();
  },
  /*
  * set data to alert group card layout
  * @param: alert group component path, alert group data
  */
  setAlertGroupCardUI : function(alertGroupToAdd,alertGroup){
    var scopeObj =this;
    alertGroupToAdd.info = {"alertGroupDetail": alertGroup};
    alertGroupToAdd.lblToggle.skin ="sknIcon6E7178Sz15px";
    alertGroupToAdd.lblToggle.text = "\ue922";
    alertGroupToAdd.flxHideDisplayContent.isVisible = false;
    alertGroupToAdd.lblHeaderSeperator.isVisible = false;
    alertGroupToAdd.lblIconStatus.skin = alertGroup.statusId === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive";
    alertGroupToAdd.lblStatusName.text = alertGroup.statusId === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ? this.sActive : this.sInActive;
    alertGroupToAdd.lblFeatureName.text = alertGroup.name;
    // alertGroupToAdd.lblAlertsHeader.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ALERTS_UC");
    // as part of the story AAC-8244 we're commenting the below change

    // alertGroupToAdd.lblIconAlertType.text = alertGroup.type.toLowerCase().indexOf("user") ? "\ue9b2" : "\ue9b3";

    //show/hide widgets in list based on LE permissions
    var isLEEditPermAvail = this.isPermissionAvailableForLE(alertGroupToAdd.info.alertGroupDetail.legalEntityId, "UPDATE");
    alertGroupToAdd.flxOptions.isVisible = isLEEditPermAvail;
    var isLECreatePermAvail = this.isPermissionAvailableForLE(alertGroupToAdd.info.alertGroupDetail.legalEntityId, "CREATE");
    alertGroupToAdd.noAlertsWithButton.btnAddRecord.isVisible = isLECreatePermAvail;
    //on-click of row
    alertGroupToAdd.flxHeader.onClick = function(){
      scopeObj.view.breadcrumbs.btnPreviousPage1.info = {"id":alertGroupToAdd.info.alertGroupDetail.code};
      scopeObj.selectedAlertId = alertGroupToAdd.info.alertGroupDetail.code;
      scopeObj.presenter.getAlertTypeDetails({
        "AlertTypeId": alertGroupToAdd.info.alertGroupDetail.code,
        "legalEntityId": alertGroupToAdd.info.alertGroupDetail.legalEntityId
      },"viewDetails");
      scopeObj.getVariableReference();
    };
    //on-click of options menu
    alertGroupToAdd.flxOptions.onClick = function(){
      scopeObj.onClickAlertGroupOptions(alertGroupToAdd);
    };
    //onhover for option menu
    var alertCard = alertGroupToAdd;
    alertGroupToAdd.flxOptions.onHover = function(widget,context){
      scopeObj.onHoverOptionMenu(widget,context,alertCard);
    };
    //onhover for alert group type 
    alertGroupToAdd.flxAlertGroupTypeIcon.onHover = function(widget,context){
      scopeObj.onHoverAlertGroupTypeIcon(widget, context,alertCard);
    };
    //on click of add alerts when no alerts are present for a group
    alertGroupToAdd.noAlertsWithButton.btnAddRecord.onClick = function(){
      
    // the below call is to fetch  the getAlertTypeDefinition service results
    scopeObj.presenter.getAlertTypeDetails({
      "AlertTypeId": alertGroupToAdd.info.alertGroupDetail.code,
      "legalEntityId": alertGroupToAdd.info.alertGroupDetail.legalEntityId
    }, "");
      scopeObj.getVariableReference(alertGroupToAdd.info.alertGroupDetail.code);
      scopeObj.view.breadcrumbs.btnPreviousPage1.info = {"id":alertGroupToAdd.info.alertGroupDetail.code};
      scopeObj.view.breadcrumbs.btnPreviousPage1.text= alertGroupToAdd.info.alertGroupDetail.name.toUpperCase();
      var categoryDetails = scopeObj.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion;
      var groupData = {"isAccountLevel":categoryDetails.containsAccountLevelAlerts === "true" ? "yes" : "no",
                       "alertType": alertGroupToAdd.info.alertGroupDetail.type};
      scopeObj.showAddSubAlertScreen(groupData);
    };
    this.view.forceLayout();

  },
  /*
  * on hover callback for alert group type tooltip
  *@param: widget,context, hovered alertGroup widget ref
  */
  onHoverAlertGroupTypeIcon : function(widget, context,alertGroupCard){
    var scopeObj =this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER ||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if(scopeObj.view.flxAlertGroupTypeTooltip.isVisible === false){
        var top = alertGroupCard.frame.y + 55;
        var left = widget.frame.x + widget.parent.frame.x - 7;
        scopeObj.view.flxAlertGroupTypeTooltip.top = top +"dp";
        scopeObj.view.flxAlertGroupTypeTooltip.left = left +"dp";
        
        scopeObj.view.flxAlertGroupTypeTooltip.setVisibility(true);
        scopeObj.view.forceLayout();
      }
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.flxAlertGroupTypeTooltip.setVisibility(false);
    } 
  },
  /*
  * on hover callback for options menu skin change
  *@param: widget,context, hovered alertGroup widget ref
  */
  onHoverOptionMenu : function(widget, context, alertGroupCard){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER ||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if(alertGroupCard.flxOptions.skin === "slFbox"){
        alertGroupCard.flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
      }
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if(alertGroupCard.flxOptions.skin === "sknflxffffffop100Border424242Radius100px"){
        alertGroupCard.flxOptions.skin = "slFbox";
      }
    } 
  },
  /*
  * set alerts list under alertgroup
  * @param: alert group component path, alerts data
  */
  setAlertsListOfAlertGroup: function(alertGroupToAdd,alerts){
    var self =this;
    var widgetMap = {
      "lblAlertName":"lblAlertName",
      "lblAlertCode":"lblAlertCode",
      "lblDescription":"lblDescription",
      "lblIconStatus":"lblIconStatus",
      "lblAlertStatus":"lblAlertStatus",
      "lblSeperator":"lblSeperator",
      "lblIcon":"lblIcon",
      "flxTagsGroup":"flxTagsGroup",
      "lblFreqEnabled":"lblFreqEnabled",
      "btnAutoSubscribed":"btnAutoSubscribed",
      "btnExt":"btnExt",
      "flxAlertGroupCardList":"flxAlertGroupCardList"
    };
    // index is used for showing the popup position
    var isViewPermAvail = this.isPermissionAvailableForLE(alertGroupToAdd.info.alertGroupDetail.legalEntityId, "VIEW");
    var isCreatePermAvail = this.isPermissionAvailableForLE(alertGroupToAdd.info.alertGroupDetail.legalEntityId, "CREATE");
    var isViewContPermAvail = this.isPermissionAvailableForLE(alertGroupToAdd.info.alertGroupDetail.legalEntityId, "VIEW_CONTENT");
    if(alerts && alerts.length > 0){
      var dataToSet = alerts.map(function(record, index){
        
        return {
          "id":record.groupId,
          "lblAlertName":record.name,
          "lblAlertCode":{"text": self.AdminConsoleCommonUtils.getTruncatedString(record.code, 18, 16),
                          "tooltip":record.code,
                          "info":{"code":record.code}},
          "lblDescription":record.description,
          "btnAutoSubscribed":{ "isVisible" : record.isAutoSubscribeEnabled && record.isAutoSubscribeEnabled === "true" },
          "btnExt" : { "isVisible" : self.isNotInternalAlertSys(record.externalsystem) ,
                      'text': self.getExternalSystemTxt(record.externalsystem),
                      'skin': self.getExternalSystemTxt(record.externalsystem, true)},
          "lblIconStatus":{"skin": record.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
                           "sknFontIconActivate" :"sknfontIconInactive"},
          "lblAlertStatus":record.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
          kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
          "lblSeperator":".",
          "lblFreqEnabled" : {"text":record.defaultFrequencyId ? 'Yes':"N/A"},
          "flxAlertGroupCardList":{"onClick":function(){
            if(isViewPermAvail && isViewContPermAvail){
              self.view.breadcrumbs.btnPreviousPage1.text=alertGroupToAdd.info.alertGroupDetail.name.toUpperCase();
              self.view.breadcrumbs.btnPreviousPage1.info = {"id":alertGroupToAdd.info.alertGroupDetail.code};
              var inputData={
                "SubAlertId": record.code,
                "legalEntityId": alertGroupToAdd.info.alertGroupDetail.legalEntityId
              };
              self.currSubAlertSelected = {"SubAlertId":record.code ,
                                           "alertTypeCode": alertGroupToAdd.info.alertGroupDetail.code }; 
              self.presenter.getSubAlertView(inputData,"view");
              self.getVariableReference();
              self.toggleBreadcrumbButtons("subalert");
            }
          }},
          "lblIcon": {"text": record.isGlobal && (record.isGlobal.toLowerCase() === "true" || record.isGlobal === "1") ? "" :"",
                  "onHover" : function(widget, context) {
                    self.onHoverPopUp(widget, context , index , record.isGlobal);
                  }},
          "template":"flxAlertGroupCardList"
        };
      });

      alertGroupToAdd.segAlertsList.widgetDataMap = widgetMap;
      alertGroupToAdd.segAlertsList.setData(dataToSet);
      alertGroupToAdd.flxNoAlertsList.isVisible = false;
      alertGroupToAdd.flxAlertGroupHeader.isVisible = true;
      alertGroupToAdd.flxAlertsList.isVisible = true;
    } else{
      alertGroupToAdd.noAlertsWithButton.btnAddRecord.isVisible = isCreatePermAvail;
      alertGroupToAdd.flxNoAlertsList.isVisible = true;
      alertGroupToAdd.flxAlertGroupHeader.isVisible = false;
      alertGroupToAdd.flxAlertsList.isVisible = false;
    }
    this.view.forceLayout();
  },
  resetSortImages: function(field) {
    var self = this;
    //self.determineSortFontIcon(self.sortBy, field, this.view.lblSortName);
  },
  /*
  * show activate/deactivate option based on status
  * @param: alert group data
  */
  updateContextualMenu: function(alertGroupDetail) {
    var self = this;
    var status = alertGroupDetail.statusId;
    if (status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      this.view.contextualMenuAlertTypeList.lblOption2.text = self.sDeactivateRecord;
      this.view.contextualMenuAlertTypeList.lblIconOption2.text = "\ue91c";
      this.view.contextualMenuAlertTypeList.lblIconOption2.skin = "sknIcon20px";
    } else {
      this.view.contextualMenuAlertTypeList.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.contextualMenuAlertTypeList.lblIconOption2.text = "\ue931";
      this.view.contextualMenuAlertTypeList.lblIconOption2.skin = "sknIcon20px";
    }
  },
  showStatusChangePopup: function() {
    var self = this;
    this.view.flxDeleteAlert.isVisible = true;
    this.view.popUpDeactivate.btnPopUpCancel.text = self.sNoLeaveAsIs;
    if (this.view.lblOption2.text === self.sDeactivateRecord) {
      this.view.popUpDeactivate.lblPopUpMainMessage.text = self.sDeactivateAlertStatus;
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.deactivate_alert_status_Question");
      this.view.popUpDeactivate.btnPopUpDelete.text = self.sYesDeactivate;
    } else {
      this.view.popUpDeactivate.lblPopUpMainMessage.text = self.sActivateAlertStatus;
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.active_alert_status_Question");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.YES_ACTIVATE");
    }
  },
  getVariableReference : function(groupId){
    this.presenter.getVariableReferenceData();
    this.presenter.getAlertCodes({"eventTypeId":groupId ? groupId : this.view.breadcrumbs.btnPreviousPage1.info.id});
  },
  setVariableReferenceSegmentData: function(vrData) {
    kony.print("Inside setVariableReferenceSegmentData() of frmAlertsManagementController");
    var dataMap = {
      "flxVariableReference":"flxVariableReference",
      "lbVariableReference": "lbVariableReference",
      "lbVariableReferenceValue": "lbVariableReferenceValue"
    };
    this.view.segVariableReference.widgetDataMap = dataMap;
    this.view.segVariableReference.data = [];
    var segVR = this.view.segVariableReference.data;
    for (var i = 0; i < vrData.length; ++i) {
      var toAdd = {
        "lbVariableReference": {
          "text": vrData[i].Code
        },
        "lbVariableReferenceValue": {
          "text": vrData[i].DefaultValue
        }
      };
      segVR.push(toAdd);
    }
    this.view.segVariableReference.setData(segVR);
    this.view.forceLayout();
  },
  populateAlertPreview: function(finalString) {
    var indexArr = [];
    var index = 0;
    var localIndex;
    var data = this.view.segVariableReference.data;
    for (var i = index; i < data.length; i++) {
      indexArr=indexArr.concat(this.getIndicesOf("[#]" + data[i].lbVariableReference.text + "[/#]",finalString,i));
    }
    for (var j = 0; j < indexArr.length; j++) {
      finalString = finalString.replace("[#]" + data[indexArr[j].varRefIndex].lbVariableReference.text + "[/#]", data[indexArr[j].varRefIndex].lbVariableReferenceValue.text);
    }
    return finalString;
  },
  getIndicesOf : function(searchStr, str,referenceId) {
    var searchStrLen = searchStr.length;
    var startIndex = 0, index, indices = [];
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push({
          "text": index,
          "varRefIndex": referenceId
        });
      startIndex = index + searchStrLen;
    }
    if(indices!==[])
    return indices;
  },
  trimmingBreadCrumbs: function(widget, text) {
    var final_text = text;
    if (text.length > 30) final_text = text.substr(0, 30) + "...";
    widget.toolTip = text;
    return final_text;
  },
  getLangSegDataMapJson : function(){
    var self = this;
    var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
    var getName = self.getLanguageNameForCode(currLocale);
    var isLocaleExist = self.checkIfCurrentLocaleAvailable(currLocale);
    if(!isLocaleExist){
      currLocale = self.getOtherDefaultLocale();
      getName = self.getLanguageNameForCode(currLocale);
    }
    var segDataMap = {
      "lblAddAlertTypeSegLanguage":{"text":getName,
                                    "info":{"id":currLocale},
                                    "isVisible":true,
                                    "onClick":self.updateLanguagesBasedOnSelection},
      "lstBoxSelectLanguage":{"isVisible":false,
                              "onSelection":self.hideLangListBoxOnSelection,
                              "masterData":self.langToShow,
                              "selectedKey": currLocale,
                              "onHover":self.hideListBoxOnHover},
      "lblAddAlertTypeSegDisplayName":{"text":self.sAddName,
                                       "isVisible":true,
                                       "onClick":self.showLangTextBox},
      "tbxDisplayName":{"text":"",
                        "isVisible":false,
                        "onHover":self.onHoverHideTextBoxCallback,
                        "onKeyUp":self.addNewRowAtEnd},
      "lblAddAlertTypeSegDescription":{"text":self.sWriteDesc,
                                       "isVisible":true,
                                       "onClick":self.showLangTextBox},
      "lblIconDeleteLang":{"text":"\ue91b","skin":"sknIcon20px"},
      "flxDescription": {"isVisible" : false},
      "lblDescCount": {"isVisible":false},
      "tbxDescription":{"text":"",
                        "onHover":self.onHoverHideTextBoxCallback,
                        "onKeyUp":self.addNewRowAtEnd},
      "lblSeprator":"-",
      "flxDelete":{"isVisible":true, "onClick" : self.showAlertTypeDeleteLangPopup},
      // "flxLanguageRowContainer":{"onHover": self.onHoverDisplayDelete},
      "template":"flxAlertsLanguageData"
    };
    return segDataMap;
  },
  /*
   * adding first default row to languages segment in add alert group
   * @param: option - 1(category)/2(alertgroup)
   */
  addDefaultRowDataForLangSeg : function(option){
    var self = this;
    var widgetDataMap = {
      "lblAddAlertTypeSegLanguage":"lblAddAlertTypeSegLanguage",
      "lstBoxSelectLanguage":"lstBoxSelectLanguage",
      "lblAddAlertTypeSegDisplayName":"lblAddAlertTypeSegDisplayName",
      "tbxDisplayName":"tbxDisplayName",
      "lblAddAlertTypeSegDescription":"lblAddAlertTypeSegDescription",
      "tbxDescription":"tbxDescription",
      "lblSeprator":"lblSeprator",
      "flxDescription":"flxDescription",
      "lblDescCount":"lblDescCount",
      "flxDelete":"flxDelete",
      "lblIconDeleteLang":"lblIconDeleteLang",
      "flxLanguageRowContainer":"flxLanguageRowContainer",
      "flxAlertsLanguageData":"flxAlertsLanguageData"
    };
    var segmentPath = "";
    if(option === 1) segmentPath = self.view.segEditAlertCategoryLanguages;
    else if(option === 2) segmentPath = self.view.segaddalertTypeLanguages;
    else if(option === 3) segmentPath = self.view.segAddAlertLanguages;
    segmentPath.setData([]);
    segmentPath.widgetDataMap = widgetDataMap;
    var segData = self.getLangSegDataMapJson();
    //hide delete btn for default lang
    segData.flxDelete.isVisible = false;
    segmentPath.setData([segData]);
    segmentPath.info = {"segData":[]};
    self.view.forceLayout();
  },
  /*
   * hide the listbox on selection in languages segment
   */
  hideLangListBoxOnSelection : function(event){
    var self = this;
    var segmentPath = "";
    if(event.containerId === "segEditAlertCategoryLanguages") segmentPath = self.view.segEditAlertCategoryLanguages;
    else if(event.containerId === "segaddalertTypeLanguages") segmentPath = self.view.segaddalertTypeLanguages;
    else if(event.containerId === "segAddAlertLanguages") segmentPath = self.view.segAddAlertLanguages;
    var ind = segmentPath.selectedRowIndex[1];
    var rowData = segmentPath.data[ind];
    var selectedValue = rowData.lstBoxSelectLanguage.selectedKeyValue;
    if(selectedValue[0] !== "select"){
      rowData.lblAddAlertTypeSegLanguage.text = selectedValue[1];
      rowData.lblAddAlertTypeSegLanguage.info.id = selectedValue[0];
      rowData.lblAddAlertTypeSegLanguage.isVisible = true;
      rowData.lstBoxSelectLanguage.isVisible = false;
      segmentPath.setDataAt(rowData, ind);
    }
    self.view.forceLayout();
  },
  /*
   * callback function to display textbox on click of label
   */
  showLangTextBox : function(event){
    var self = this;
    var currWidgetId = event.id;
    var segmentPath = "";
    if(event.containerId === "segEditAlertCategoryLanguages") segmentPath = self.view.segEditAlertCategoryLanguages;
    else if(event.containerId === "segaddalertTypeLanguages") segmentPath = self.view.segaddalertTypeLanguages;
    else if(event.containerId === "segAddAlertLanguages") segmentPath = self.view.segAddAlertLanguages;
    var ind = segmentPath.selectedRowIndex[1];
    var rowData = segmentPath.data[ind];
    if(currWidgetId === "lblAddAlertTypeSegDisplayName"){
      rowData.tbxDisplayName.isVisible = true;
      rowData.lblAddAlertTypeSegDisplayName.isVisible = false;
    }else{
      rowData.flxDescription.isVisible = true;
      rowData.lblAddAlertTypeSegDescription.isVisible = false;
    }
    segmentPath.setDataAt(rowData, ind);
    self.view.forceLayout();
  },
  /*
   * function to update languages listbox with the unselected languages list only
   */
  updateLanguagesBasedOnSelection: function(event) {
    var self = this;
    var assignedData = [],
        allLangId = [],diffList = [],commonList = [];
    var segmentPath = "";
    if(event.containerId === "segEditAlertCategoryLanguages") segmentPath = self.view.segEditAlertCategoryLanguages;
    else if(event.containerId === "segaddalertTypeLanguages") segmentPath = self.view.segaddalertTypeLanguages;
    else if(event.containerId === "segAddAlertLanguages") segmentPath = self.view.segAddAlertLanguages;
    var segData = segmentPath.data;
    var currInd = segmentPath.selectedRowIndex[1];
    var currRowData = segmentPath.data[currInd];
    //get all assigned languges id's
    for (var i = 0; i < segData.length; i++) {
      if (segData[i].lblAddAlertTypeSegLanguage.info.id !== "" && i!== currInd ) assignedData.push(segData[i].lblAddAlertTypeSegLanguage.info.id);
    }
    //all exsisting language id's
    allLangId = self.langToShow.map(function(rec) {
      return rec[0];
    });
    //differentiate common and diff id's
    for (var j = 0; j < allLangId.length; j++) {
      if (assignedData.contains(allLangId[j])) {
        commonList.push(allLangId[j]);
      } else {
        diffList.push(allLangId[j]);
      }
    }
    var lstData = self.getListForListBox(diffList);
    currRowData.lstBoxSelectLanguage.masterData = lstData;
    if(currInd !== 0){
      currRowData.lblAddAlertTypeSegLanguage.isVisible = false;
      currRowData.lstBoxSelectLanguage.isVisible = true;
      currRowData.lstBoxSelectLanguage.selectedKey = lstData[0][0];
      segmentPath.setDataAt(currRowData, currInd);
    }
  },
  /* 
   * function to return the required languages in listbox masterdata format
   * @param: unselected language id's list
   * @retrun: masterdata with given language id's
   */
  getListForListBox: function(data) {
    var self = this;
    var finalList = [];
    for (var i = 0; i < self.langToShow.length; i++) {
      if (data.contains(self.langToShow[i][0])) {
        finalList.push(self.langToShow[i]);
      }
    }
    return finalList;
  },
  /*
   * on hover callback for listbox - in case same language is selected from listbox again
   */
  hideListBoxOnHover : function(widget,context){
    var self = this;
    var segmentPath = "";
    if(self.view.flxEditAlertCategoryScreen.isVisible === true){
      segmentPath = self.view.segEditAlertCategoryLanguages;
    }else if(this.view.flxSubAlerts.isVisible===true){
      segmentPath = self.view.segAddAlertLanguages;
    }else
      segmentPath = self.view.segaddalertTypeLanguages;
    var ind = segmentPath.selectedRowIndex[1];
    var rowData = segmentPath.data[ind];
    var selectedLangId = rowData.lblAddAlertTypeSegLanguage.info.id;
    var listSelectedId = rowData.lstBoxSelectLanguage.selectedKey;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      //do-nothing
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if(selectedLangId === listSelectedId){
        rowData.lblAddAlertTypeSegLanguage.isVisible = true;
        rowData.lstBoxSelectLanguage.isVisible = false;
        segmentPath.setDataAt(rowData, ind);
      } else if(selectedLangId === ""){ // for first time selection
        rowData.lblAddAlertTypeSegLanguage.isVisible = true;
        rowData.lblAddAlertTypeSegLanguage.text = self.getLanguageNameForCode(listSelectedId);
        rowData.lblAddAlertTypeSegLanguage.info.id = listSelectedId;
        rowData.lstBoxSelectLanguage.isVisible = false;
        segmentPath.setDataAt(rowData, ind);
      } else{
        rowData.lstBoxSelectLanguage.selectedKey = rowData.lblAddAlertTypeSegLanguage.info.id;
        rowData.lblAddAlertTypeSegLanguage.isVisible = true;
        rowData.lstBoxSelectLanguage.isVisible = false;
        segmentPath.setDataAt(rowData, ind);
      }
    }
  },
  /*
   * function to add a row at end once started typing in name or description textboxes
   * @param- event,rowInfo,option- 1/2
   */
  addNewRowAtEnd : function(event,rowInfo,option){
    var self = this;
    var segmentPath = "";
    if(event && event.containerId === "segEditAlertCategoryLanguages" || option === 1){
      segmentPath = self.view.segEditAlertCategoryLanguages;
    }else if(event && event.containerId === "segaddalertTypeLanguages" || option === 2){
      segmentPath = self.view.segaddalertTypeLanguages;
    }else if(event && event.containerId === "segAddAlertLanguages" || option === 3){
      segmentPath = self.view.segAddAlertLanguages;
    }
    var segData = segmentPath.data;
    var currInd = event ? rowInfo.rowIndex : rowInfo[1];
    kony.store.setItem("keyName", segData[currInd].tbxDisplayName.text);
    kony.store.setItem("keyDescription", segData[currInd].tbxDescription.text);
    if(segData.length === currInd+1 && segData.length !== self.langToShow.length){
      var newRow = self.getLangSegDataMapJson();
      newRow.lblAddAlertTypeSegLanguage.text = self.sLang;
      newRow.lblAddAlertTypeSegLanguage.info.id = "";
      newRow.lstBoxSelectLanguage.selectedKey = self.langToShow[0][0];
      segmentPath.addDataAt(newRow, currInd+1);
      self.view.forceLayout();
    }
  },
  /*
   * callback function to hide textbox and show label
   */
  onHoverHideTextBoxCallback: function(widget, context) {
    var self = this;
    var segmentPath = "";
    if(self.view.flxEditAlertCategoryScreen.isVisible === true){
      segmentPath = self.view.segEditAlertCategoryLanguages;
    }else if(self.view.flxSubAlerts.isVisible ===true){
      segmentPath = self.view.segAddAlertLanguages;
    }else{
      segmentPath = self.view.segaddalertTypeLanguages;
    }
    var ind = segmentPath.selectedRowIndex[1];
    var rowData = segmentPath.data[ind];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      //do-nothing
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if (widget.id === "tbxDisplayName") {
        rowData.tbxDisplayName.isVisible = false;
        rowData.lblAddAlertTypeSegDisplayName.isVisible = true;
        if (rowData.tbxDisplayName.text === "" && rowData.lblAddAlertTypeSegDisplayName.text !== "Add Name") {
          rowData.tbxDisplayName.text = kony.store.getItem("keyName");
        }
        rowData.lblAddAlertTypeSegDisplayName.text = rowData.tbxDisplayName.text === "" ? "Add Name": rowData.tbxDisplayName.text ;
      } else {
        rowData.flxDescription.isVisible = false;
        rowData.lblAddAlertTypeSegDescription.isVisible = true;
        if (rowData.tbxDescription.text === "" && rowData.lblAddAlertTypeSegDescription.text !== self.sWriteDesc) {
          rowData.tbxDescription.text = kony.store.getItem("keyDescription");
        }
        rowData.lblAddAlertTypeSegDescription.text = rowData.tbxDescription.text === ""? self.sWriteDesc: rowData.tbxDescription.text;
      }
      segmentPath.setDataAt(rowData, ind);
      self.view.forceLayout();
    }
  },
  /*
   * hover callback to display delete button on segment hover
   */
  onHoverDisplayDelete : function(widget, context){
    var self = this;
    var ind = context.rowIndex;
    var rowData = self.view.segaddalertTypeLanguages.data[ind];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if(ind !== 0){
        if(rowData.flxDelete.isVisible === false){
          rowData.flxDelete.isVisible = true;
          self.view.segaddalertTypeLanguages.setDataAt(rowData, ind);
        }
      }
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if(rowData.flxDelete.isVisible === true){
        rowData.flxDelete.isVisible = false;
        self.view.segaddalertTypeLanguages.setDataAt(rowData, ind);
      }
    }
    self.view.forceLayout();
  },
  /*
   * display delete confirmation popup in add/edit alert type scrren
   */
  showAlertTypeDeleteLangPopup : function(event){
    var self = this;
    var segmentPath = "";
    if(event.containerId === "segEditAlertCategoryLanguages") segmentPath = self.view.segEditAlertCategoryLanguages;
    else if(event.containerId === "segaddalertTypeLanguages") segmentPath = self.view.segaddalertTypeLanguages;
    else if(event.containerId === "segAddAlertLanguages") segmentPath = self.view.segAddAlertLanguages;
    this.view.flxDeleteAlert.isVisible = true;
    this.view.popUpDeactivate.btnPopUpCancel.text = self.sNoLeaveAsIs;
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DeleteLanguage");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AreYouSureDeleteLanguage");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    //overriding actions for alert type delete language
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.onClickOfDeleteLang(segmentPath);
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  /*
   * delete current row from the languages segment
   * @param: segment path
   */
  onClickOfDeleteLang : function(segmentPath){
    var self = this;
    var currInd = segmentPath.selectedRowIndex[1];
    segmentPath.removeAt(currInd);
    self.view.forceLayout();
  },
  /*
   * map apps/users masterdata list to custom listboxes seg
   * @param: apps/users list
   * @return : mapped data
   */
  mapAppsUsersListData: function(data) {
    var self = this;
    var listBoxData = [];
    var widgetDataMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    self.view.customListboxAlertApps.segList.widgetDataMap = widgetDataMap;
    self.view.customListboxAlertUsertypes.segList.widgetDataMap = widgetDataMap;
    if (data) {
      listBoxData = data.map(function(rec) {
        return {
          "id": rec.id,
          "lblDescription": {"text":rec.Name},
          "imgCheckBox": {"src":self.checkboxselected},
          "template": "flxSearchDropDown"
        };
      });
    }
    return listBoxData;
  },
  /*
   * set apps/users mapped data to listbox
   * @param : mapped data,category("apps" or "users")
   */
  setAppsUsersData : function(data,category){
    var self = this;
    var widgetPath ="";
    if(category === "apps"){
      widgetPath = self.view.customListboxAlertApps;
    }else if(category === "users"){
      widgetPath = self.view.customListboxAlertUsertypes;
    }
    var appData = self.mapAppsUsersListData(data);
    widgetPath.segList.setData(appData);
    widgetPath.imgCheckBox.src=self.checkboxselected;
    widgetPath.lblSelectedValue.text = self.sAll;
    var arr = [];
    for(var i= 0; i< appData.length; i++){
      arr.push(i);
    }
    widgetPath.segList.selectedIndices = [[0,arr]];
  },
  /*
   * on row click of custom listbox of apps/users-list
   * @param : category - apps or users
   */
  onCustomListBoxRowClick : function(category){
    var self = this;
    var widgetPath ="",segData ="",lblText = "";
    if(category === "apps"){
      widgetPath = self.view.customListboxAlertApps;
      lblText =  kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableApps");
    }else if(category === "users"){
      widgetPath = self.view.customListboxAlertUsertypes;
      lblText = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableUserTypes");
    } else if(category === "accounts"){
      widgetPath = self.view.customListboxAlertAccountTypes;
      lblText = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableUserTypes");
    }
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    var selRows = widgetPath.segList.selectedRowItems;
    if(selRows){
      if(selRows.length === segData.length){
        widgetPath.imgCheckBox.src = self.checkboxselected;
        widgetPath.lblSelectedValue.text = self.sAll;
        widgetPath.segList.selectedIndices = [[0,arr]];
      }else{
        widgetPath.lblSelectedValue.text = selRows.length +" "+self.sSelected;
        widgetPath.imgCheckBox.src = self.checkboxnormal;
      }
    } else{
      widgetPath.lblSelectedValue.text = lblText;
    }
    self.view.forceLayout();

  },
  /*
   * select all/unselect all of custom listbox for apps and userlist
   * @param : category - apps or users
   */
  onClickOfSelectAll : function(category){
    var self = this;
    var widgetPath ="",segData ="",lblText = "";
    if(category === "apps"){
      widgetPath = self.view.customListboxAlertApps;
      lblText =  kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableApps");
    }else if(category === "users"){
      widgetPath = self.view.customListboxAlertUsertypes;
      lblText = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableUserTypes");
    } else if(category === "accounts"){
      widgetPath = self.view.customListboxAlertAccountTypes;
      lblText = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableUserTypes");
    }
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    if(widgetPath.imgCheckBox.src === self.checkboxnormal){
      widgetPath.imgCheckBox.src = self.checkboxselected;
      widgetPath.lblSelectedValue.text = self.sAll;
      widgetPath.segList.selectedIndices = [[0,arr]];
    }else if(widgetPath.imgCheckBox.src === self.checkboxselected){
      widgetPath.imgCheckBox.src = self.checkboxnormal;
      widgetPath.segList.selectedIndices = null;
      widgetPath.lblSelectedValue.text = lblText;
    }
    self.view.forceLayout();
  },
  /*
   * set data to sub-alerts listing segment
   * @param : sub-alerts data
   */
  setSubAlertSegData : function(alerts,isFilter){
    var self=this;
    var data =[];
    var dataMap={
      "flxSubAlertHeaderDisplayName": "flxSubAlertHeaderDisplayName",
      "flxSubAlertHeaderCode": "flxSubAlertHeaderCode",
      "flxSubAlertHeaderDescription": "flxSubAlertHeaderDescription",
      "lblRoleHeaderSeperator": "lblRoleHeaderSeperator",
      "flxSubAlertHeaderStatus": "flxSubAlertHeaderStatus",
      "flxOptions": "flxOptions",
      "lblIcon": "lblIcon",
      "lblAlertType": "lblAlertType",
      "lblIconImgOptions": "lblIconImgOptions",
      "lblHeaderSeperator": "lblHeaderSeperator",
      "lblDescription": "lblDescription",
      "lblDisplayName": "lblDisplayName",
      "lblAlertStatus": "lblAlertStatus",
      "fontIconStatusImg": "fontIconStatusImg",
      "lblCode": "lblCode",
      "btnExt": "btnExt",
      "lblSeperator": "lblSeperator",
      "btnAutoSubscribed": "btnAutoSubscribed",
      "flxStatus": "flxStatus",
      "flxSubAlerts": "flxSubAlerts",
      "flxTagsGroup": "flxTagsGroup",
      "flxToggle": "flxToggle",
      "lblDescriptionTxt": "lblDescriptionTxt",
      "lblFreqEnabled": "lblFreqEnabled",
      "lblToggle": "lblToggle",
      "flxDesc": "flxDesc",
      "flxRow1": "flxRow1",
      "legalEntityId":"legalEntityId"
    };
    var alertsList = [];
    alertsList = isFilter === true ? alerts: self.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertSubTypes;
    var isLEEditPermAvail = this.isPermissionAvailableForLE(this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition.legalEntityId, "UPDATE");
    var isViewContentPermAvail = this.isPermissionAvailableForLE(this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition.legalEntityId, "VIEW_CONTENT");
    data = alertsList.map(function(subAlertsData , index) {
      
      return {
        "lblDisplayName": {"text":subAlertsData.name},
        "lblCode":{"text":self.AdminConsoleCommonUtils.getTruncatedString(subAlertsData.code, 20, 18),
                   "tooltip":subAlertsData.code,
                   "info":{"value" :subAlertsData.code }},
        "lblDescription": {"text": subAlertsData.description,"isVisible":false},
        "lblDescriptionTxt" :{"isVisible":false},
        'lblFreqEnabled':{"text":subAlertsData.defaultFrequencyId ? 'Yes':"N/A"},
        "btnAutoSubscribed":{"isVisible":subAlertsData.isAutoSubscribeEnabled === 'true'},
        "lblSeperator": "-",
        "lblIconImgOptions": {"text":"\ue91f"},
        "template":"flxSubAlerts",
        "lblToggle" :{"skin":"sknIcon6E7178Sz15px","text":"\ue922"},
        "flxToggle":{"onClick" :()=>{
          // arrow symbol change
         // lblAlertName.bottom - 45 dp on expand
         // lblAlertName.bottom - 25 dp on collapse and visibility
            let rowData = self.view.segSubAlerts.data[ index];

            if(rowData.lblToggle.skin !== "sknIcon6E7178Sz15px"){
              rowData.lblToggle.skin ="sknIcon6E7178Sz15px";
              rowData.lblToggle.text ="\ue922";//right-arrow
              
              rowData.lblDescription.isVisible =false;
              rowData.lblDescriptionTxt.isVisible =false;
            }else{
              rowData.lblToggle.skin ="sknIcon6E7178Sz13px";
              rowData.lblToggle.text ="\ue915";//down-arrow
                            
              rowData.lblDescription.isVisible =true;            
              rowData.lblDescriptionTxt.isVisible =true;
            }
            self.view.segSubAlerts.setDataAt(rowData,index ,0)
        }},
        "lblAlertStatus": {
          "text": subAlertsData.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ? self.sActive : self.sInActive,
          "skin": subAlertsData.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ? "sknlblLato5bc06cBold14px" : "sknlblLatocacacaBold12px",
        },        
        "btnExt" : { "isVisible" : self.isNotInternalAlertSys(subAlertsData.externalsystem) ,
        'text': self.getExternalSystemTxt(subAlertsData.externalsystem),
        'skin': self.getExternalSystemTxt(subAlertsData.externalsystem, true)},
        "fontIconStatusImg": {
          "text": "\ue921",
          "skin": subAlertsData.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive",
        },
                   
        "lblAlertType": {
          "text": subAlertsData.isGlobal && (subAlertsData.isGlobal.toLowerCase() === "true" || subAlertsData.isGlobal === "1") ? "" :"",
          "onHover" : function(widget, context) {
            self.onHoverPopUp(widget, context , index,subAlertsData.isGlobal );
          }
        },
        "flxOptions": {
          "onClick": function () {
            self.onClickOptions();
          },
          "skin": "slFbox",
          "isVisible": (isLEEditPermAvail && isViewContentPermAvail) === true ? true: false
        },
        "legalEntityId": subAlertsData.legalEntityId
      };
    });
    this.view.segSubAlerts.widgetDataMap=dataMap;
    this.view.segSubAlerts.setData(data);
    this.view.flxNoResultFound.setVisibility(data.length <= 0);
    this.view.flxSegRoles.setVisibility(data.length > 0);
    //show hide add alert button based on LE permissions
    var isLECreatePermAvail = this.isPermissionAvailableForLE(this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition.legalEntityId, "CREATE");
    this.view.noResultsWithButtonAlerts.btnAddRecord.setVisibility(isLECreatePermAvail);
    if(isFilter){
      this.view.flxSubAlertsHeader.setVisibility(true);
      this.view.flxAddSubAlertBtn.setVisibility(true);
      this.view.rtxSearchMesg.setVisibility(data.length <= 0);
      this.view.noResultsWithButtonAlerts.setVisibility(false);
    }else{
      var showAddAlertBtn = (data.length > 0) && isLECreatePermAvail ? true : false;
      this.view.flxAddSubAlertBtn.setVisibility(showAddAlertBtn);
      this.view.flxSubAlertsHeader.setVisibility(data.length > 0);
      this.view.rtxSearchMesg.setVisibility(false);
      this.view.noResultsWithButtonAlerts.setVisibility(data.length <= 0);
    }
    this.view.forceLayout();
  },
  onHoverPopUp:function(widget, context , index , isGlobal){
    var scopeObj = this;
    var widGetId = widget;
    if (widGetId) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.view.ToolTip.setVisibility(true);
        scopeObj.view.ToolTip.left = context.screenX - 60 + 'px';
        scopeObj.view.ToolTip.top = context.screenY + 10 + "px";
        if (isGlobal.toLowerCase() === "true" || isGlobal.toLowerCase()  === "1") {
            scopeObj.view.ToolTip.lblNoConcentToolTip.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GlobalAlert");
        } else {
            scopeObj.view.ToolTip.lblNoConcentToolTip.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UserAlert");
        }
        scopeObj.view.ToolTip.width = scopeObj.AdminConsoleCommonUtils.getLabelWidth(scopeObj.view.ToolTip.lblNoConcentToolTip.text)+20+"px";
        scopeObj.view.forceLayout();
        
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.ToolTip.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.ToolTip.setVisibility(false);
      }
    }
    scopeObj.view.forceLayout();
  },
  onClickOptions:function(){
    var selItems = this.view.segSubAlerts.selectedItems[0];
    this.view.lblDeactivate.text=selItems.lblAlertStatus.text===this.sActive?this.sPermDeactivate :this.sPermActivate;
    this.view.lblDeactivateIcon.text=selItems.lblAlertStatus.text===this.sActive?"\ue91c":"\ue931";
    this.view.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
    if (this.view.flxSelectOptions.isVisible===true){
      this.view.flxSelectOptions.isVisible = false;
    }
    else{
      this.view.flxSelectOptions.isVisible = true;
    }
    this.view.forceLayout();
    var index = this.view.segSubAlerts.selectedIndex;
    var rowIndex = index[1];
    var heightVal= 0;
    var templateArray = this.view.segSubAlerts.clonedTemplates;
    for (var i = 0; i < rowIndex; i++) {
      heightVal = heightVal + templateArray[i].flxSubAlerts.frame.height;
    }
    var segmentWidget = this.view.segSubAlerts;
    var contextualWidget = this.view.flxSelectOptions;
    heightVal = heightVal + 60 + 35- segmentWidget.contentOffsetMeasured.y;
    if ((heightVal + contextualWidget.frame.height) > segmentWidget.frame.height){
      this.view.flxSelectOptions.top=((heightVal-this.view.flxSelectOptions.frame.height)-25)+"px";
      this.view.flxSelectUpArrowImage.setVisibility(false);
      this.view.flxSelectDownArrowImage.setVisibility(true);
      this.view.flxSelectOptionsContainer.top = "0px";    }
    else{
      this.view.flxSelectOptions.top=(heightVal)+"px";
      this.view.flxSelectUpArrowImage.setVisibility(true);
      this.view.flxSelectDownArrowImage.setVisibility(false);
      this.view.flxSelectOptionsContainer.top = "-1px";
    }
    this.setOptionsVisibility("flxSelectOptions");
  },
  /*
  * set data to status filter in sub alerts listing
  */
  setSubAlertStatusFilterData : function(){
    var self = this;
    var statusList=[],maxLenText = "";
    var subAlertsData = self.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertSubTypes;
    for(var i=0;i<subAlertsData.length;i++){
      if(!statusList.contains(subAlertsData[i].status))
        statusList.push(subAlertsData[i].status);
    }
    var widgetMap = {
      "Status_id": "Status_id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){
      var statusText = rec === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ? "Active":"Inactive";
      maxLenText = (statusText.length > maxLenText.length) ? statusText : maxLenText;
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": statusText
      };
    });
    self.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.setData(statusData);
    var selStatusInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    self.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    self.view.flxSubAlertsStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxLenText)+55+"px";
    self.view.forceLayout();
  },
  /*
  * filter the alerts based on the status selected
  */
  performSubAlertsStatusFilter : function(){
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertSubTypes;
    var segStatusData = self.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if(indices){
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.subAlertsStatusFilterMenu.segStatusFilterDropdown.data[selInd[i]].Status_id);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.setSubAlertSegData(allData, true);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.status) >= 0){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.setSubAlertSegData(dataToShow, true);
        } else {
          self.setSubAlertSegData([], true);
        }
      }
    } else{
      self.setSubAlertSegData([], true);
    }

  },
  showViewContextualMenu : function(){
    this.view.lblDeactivateAlert.text=this.view.lblViewDetailsAlertStatus.text===this.sActive?this.sPermDeactivate :this.sPermActivate;
    this.view.lblDeactivateAlertIcon.text=this.view.lblViewDetailsAlertStatus.text===this.sActive?"\ue91c":"\ue931";
    var top = (this.view.flxOptionsSubAlerts.frame.y + 30);
    this.view.flxSubAlertContextualMenu.top = top +"dp";
    this.view.flxSubAlertContextualMenu.setVisibility(true);
    this.view.flxOptionsSubAlerts.skin = "sknflxffffffop100Border424242Radius100px";
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
  },
  getTextForTypeIds : function(typeIds,masterdata,attr){
    var textData="";
    var id="";
    if(attr==="1")
      id="appId";
    else if(attr==="2")
      id="customerTypeId";
    else if(attr==="3")
      id="accountTypeId";
    else if(attr === "4")
      id = "recipientId";
    for (var i=0;i<typeIds.length;i++){
      for(var j=0;j<masterdata.length;j++){
        if(typeIds[i][id]===masterdata[j].id){
          textData= textData+", "+masterdata[j].lblDescription.text;
        }
      }
    }
    return this.checkForNull(textData.substr(2),this.sNA);
  }, 
  /*
  * get recipient name for recipient id
  * @param: recipient Id
  * @return : recipient name
  */
  getRecipientName : function(id){
    var name = "";
    var allRecipients = this.view.lstBoxRecipients.info ? this.view.lstBoxRecipients.info.data : []
    for(var i=0;i<allRecipients.length;i++){
      if(allRecipients[i].id.toString() === id){
        name = allRecipients[i].Name;
        break;
      }
    }
    name = this.checkForNull(name,kony.i18n.getLocalizedString("i18n.common.NA"));
    return name;
  },
  setTypesDataForAlert : function(data){
    var self=this;
    var accountTypesMasterData= self.view.customListboxAlertAccountTypes.segList.data;
    var userTypesMasterData=self.view.customListboxAlertUsertypes.segList.data;
    var appTypesMasterData=self.view.customListboxAlertApps.segList.data;
    self.view.lblAlertAppsValue.text = self.getTextForTypeIds(data.appTypes,appTypesMasterData,"1");
    self.view.lblAlertUserTypesValues.text = self.getTextForTypeIds(data.userTypes,userTypesMasterData,"2");
    self.view.lblAlertRecipientValues.text = self.getRecipientName(data.subAlertDefinition.recipientType);
    var attrName = self.checkForNull(data.subAlertDefinition.alertAttribute,"");
    var attrCriteria = self.checkForNull(data.subAlertDefinition.alertCondition,"");
    var attrValue1 = self.checkForNull(data.subAlertDefinition.value1,"");
    var attrValue2 = self.checkForNull(data.subAlertDefinition.value2,"");
    var attribute ="";
    if(attrName !== ""){
      attribute  = "" + attrName.alertattribute_name +" "+
        (attrCriteria !== "" ? attrCriteria.Name : "") +" "+
        (attrValue1) + (attrValue2 !== "" ? ", "+ attrValue2 : "");
    }else{
      attribute = "";
    }
    //assign to labels based on acc-level
    if(data.subAlertDefinition.isAccountLevel==="yes"){
      if(data.accountTypes&& data.accountTypes.length>0)
        this.view.lblAlertDetailValue31.text=self.getTextForTypeIds(data.accountTypes,accountTypesMasterData,"3");
      this.view.lblAlertDetailValue32.text = self.checkForNull(attribute,self.sNA);
    } else{
      this.view.lblAlertDetailValue31.text = self.checkForNull(attribute,self.sNA);
    }
    self.view.forceLayout();
  },
  setSubAlertsView : function(subAlertData){
    this.subAlertData=subAlertData;
    this.view.breadcrumbs.lblCurrentScreen.text=subAlertData.subAlertDefinition.name.toUpperCase();
    this.view.lblAccountLevelAlertValue.text=subAlertData.subAlertDefinition.isAccountLevel==="yes"?kony.i18n.getLocalizedString("i18n.common.yes"):kony.i18n.getLocalizedString("i18n.common.no");
    this.setSubAlertsViewData(subAlertData);
    if(subAlertData.subAlertDefinition.isAccountLevel==="yes"){
      this.view.flxAlertDetailCol41.setVisibility(true);
      this.view.lblAlertDetailHeading31.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ApplicableAccountType_UC");
      this.view.lblAlertDetailHeading32.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.AttributesCAPS");
      this.view.lblAlertDetailHeading33.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DefaultFrequency_UC");
    }else{
      this.view.flxAlertDetailCol41.setVisibility(false);
      this.view.lblAlertDetailHeading31.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.AttributesCAPS");;
      this.view.lblAlertDetailHeading32.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DefaultFrequency_UC");
      this.view.lblAlertDetailHeading33.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DefaultChannels_UC");
    }
    //this.showSupportedChannels();
    this.contentTemplates=subAlertData.communicationTemplates;
    this.setContentTemplateData();
    this.setDefaultSubAlertView();
    //show/hide edit options based on LE permissions
    var isLEEditPermAvail = this.isPermissionAvailableForLE(subAlertData.subAlertDefinition.legalEntityId, "UPDATE");
    var isViewContentPermAvail = this.isPermissionAvailableForLE(subAlertData.subAlertDefinition.legalEntityId, "VIEW_CONTENT");
    this.view.flxOptionsSubAlerts.setVisibility(isLEEditPermAvail && isViewContentPermAvail);
    this.view.flxAddTemplateButton.setVisibility(isLEEditPermAvail && isViewContentPermAvail);
    if(this.contentTemplates && (Object.keys(this.contentTemplates).length > 0)){
      this.view.flxOptionEdit.setVisibility(isLEEditPermAvail && isViewContentPermAvail);
    }
    this.view.forceLayout();
  },
  setSubAlertsViewData: function(subAlertData){
    this.view.lblSubAlertName.text=subAlertData.subAlertDefinition.name;
    this.view.lblSubAlertName.info=subAlertData;
    // the alert code is getting cut as there is no space between text
    this.view.lblAlertCodeValue.text=this.AdminConsoleCommonUtils.getTruncatedString(subAlertData.subAlertDefinition.code, 35, 32);
    this.view.lblAlertCodeValue.tooltip=subAlertData.subAlertDefinition.code;

    this.view.lblSubAlertTypeValue.text=subAlertData.subAlertDefinition.alertType;
    this.view.btnExt.isVisible = this.isNotInternalAlertSys(subAlertData.subAlertDefinition.externalsystem);
    this.view.btnExt.text = this.getExternalSystemTxt(subAlertData.subAlertDefinition.externalsystem);
    this.view.btnExt.skin = this.getExternalSystemTxt(subAlertData.subAlertDefinition.externalsystem , true);

    this.setTypesDataForAlert(subAlertData);
    this.setAlertLangDescription(subAlertData.displayPreferences);
    var frequencyObj = {
      "type":subAlertData.subAlertDefinition.defaultFrequencyId || "",
      "value":subAlertData.subAlertDefinition.defaultFrequencyValue || "",
      "time": subAlertData.subAlertDefinition.defaultFrequencyTime ? this.timeValueObj(subAlertData.subAlertDefinition.defaultFrequencyTime) : ""
    };  
    this.view.lblViewDetailsStatusIcon.skin=subAlertData.subAlertDefinition.status === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
      "sknFontIconActivate" : "sknfontIconInactive";
    this.view.lblViewDetailsAlertStatus.text=subAlertData.subAlertDefinition.status === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
      kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.permission.Inactive");
    this.view.lblViewDetailsAlertStatus.skin=subAlertData.subAlertDefinition.status === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
      "sknlblLato5bc06cBold14px":"sknlblLatocacacaBold12px"; 
    //assign to labels based on acc-level
    if(subAlertData.subAlertDefinition.isAccountLevel==="yes"){
      this.view.lblAlertDetailValue33.text=this.getFrequencyText(frequencyObj);
      this.view.lblAlertDetailValue41.text = this.getChannelsString(subAlertData.alertsubtypeChannels);
    }else{
      this.view.lblAlertDetailValue32.text=this.getFrequencyText(frequencyObj);
      this.view.lblAlertDetailValue33.text = this.getChannelsString(subAlertData.alertsubtypeChannels);
    }
    this.view.lblAlertAutoSubscribe.text = subAlertData.subAlertDefinition.isAutoSubscribeEnabled && subAlertData.subAlertDefinition.isAutoSubscribeEnabled==='true' ? "Yes" :"No";

    this.view.lblTemplateHeader.text=this.sAlertContentTemplate;
    this.view.lblContentBy.text="View Content By";//kony.i18n.getLocalizedString("i18n.frmAlertsManagement.viewContentBy");
    this.view.forceLayout();
  },
  setAlertLangDescription: function(displayPreferences){
    var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
    var defaultLangDesc = "";
    //get default locale description
    for(var j=0; j<displayPreferences.length; j++){
      if(currLocale === displayPreferences[j].languageCode){
        defaultLangDesc = displayPreferences[j];
        break;
      }
    }
    //assign curr locale description if available else assign first description record
    if(defaultLangDesc){
      var currLangName = this.getLanguageNameForCode(currLocale);
      this.view.lblAlertDescLanguage.text = currLangName ? " - "+ currLangName.toUpperCase(): "";
      this.view.lblAlertDescValue.text = defaultLangDesc.description;
    } else{
      var langCode =  displayPreferences.length > 0 ? displayPreferences[0].languageCode : "";
      var localeLangName = this.getLanguageNameForCode(langCode);
      this.view.lblAlertDescLanguage.text = localeLangName ? " - "+ localeLangName.toUpperCase(): "";
      this.view.lblAlertDescValue.text = displayPreferences.length > 0 ? displayPreferences[0].description : "N/A";
    }
    this.setAllLanguagesCategoryData(displayPreferences);
  },
  getChannelsString: function(data){
    var channelStr="";
    this.supportedChannels=[];
    this.sortBy = this.getObjectSorter("channelId");
    var sortedChannels = data.sort(this.sortBy.sortData);
    for (var j= 0;j < sortedChannels.length; j++) {
      var name = this.getChannelNameFromId(sortedChannels[j].channelId);
      channelStr += name + ", ";
      this.supportedChannels.push(name);
    }
    if (channelStr.substr(channelStr.length-2,2) === ", ") {
      channelStr = channelStr.substring(0,channelStr.length-2);
    }
    if(channelStr==="")
      channelStr=kony.i18n.getLocalizedString("i18n.common.NA");
    return channelStr;
  },
  setDefaultSubAlertView : function(){
    this.view.lstBoxSubAlertResponseState.setEnabled(true);
    this.view.lstBoxSubAlertLanguages.setEnabled(true);
    this.view.lstBoxSubAlertResponseState.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
    this.view.lstBoxSubAlertLanguages.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
    this.view.flxAddTemplateButton.setVisibility(true);
    this.view.flxOptionsSubAlerts.setVisibility(true);
    this.view.flxAddTemplate.setVisibility(false);
    this.view.flxSaveTemplateButtons.setVisibility(false);
    this.view.flxAlertCategories.setVisibility(false);
    this.view.flxAlertTypes.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(true);
    this.view.flxViewSubAlert.setVisibility(true);
    this.view.flxAddAlertScreen.setVisibility(false);
    this.view.flxAlertFields.setVisibility(true);
    this.view.flxAlertDesc.setVisibility(true);
    this.view.lblIconAlertArrow.skin ="sknIcon6E7178Sz13px";
    this.view.lblIconAlertArrow.text ="\ue915";
    this.toggleBreadcrumbButtons("subalert");
    this.view.flxAlertConfiguration.setContentOffset({x:0,y:0});
    this.view.flxAlertsSelectedLEVal.setVisibility(!this.isSingleEntity);
    this.view.forceLayout();
  },
  setContentTemplateData : function(){
    var templateData=Object.keys(this.contentTemplates);
    if(templateData.length===0){
      this.view.flxViewTemplateListBox.setVisibility(false);
      this.view.flxViewTemplate.setVisibility(false);
      this.view.flxNoContentTemplate.setVisibility(true);
      this.showAddTemplateBtn();
      this.view.rtxNoTemplate.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NoTemplateCreated");
      this.view.forceLayout();
    }
    else{
      this.setTemplateListBoxData();
      this.setChannelsTemplateData();
      this.showAllBtns();
      this.view.flxViewTemplateListBox.setVisibility(true);
      this.view.flxViewTemplate.setVisibility(true);
      this.view.flxNoContentTemplate.setVisibility(false);
    }
  },
  showAddTemplateBtn : function(){
    this.view.flxAddTemplateButton.right="0px";
    this.view.flxOptionEdit.setVisibility(false);
    this.view.flxEyeicon.setVisibility(false);
    this.view.flxAddTemplateButton.setVisibility(true);
    this.view.forceLayout();
  },
  showAllBtns : function(){
    this.view.flxAddTemplateButton.right="160px";
    this.view.flxOptionEdit.setVisibility(true);
    this.view.flxEyeicon.setVisibility(true);
    this.view.flxAddTemplateButton.setVisibility(true);
    this.view.forceLayout();
  },
  setTemplateListBoxData : function(){
    var responseStateData=[];
    var templateLanguages=[];
    var templateLangData=[];
    var templateData=this.contentTemplates;
    if(Object.keys(this.contentTemplates).length!==0){
      if(templateData.SID_EVENT_SUCCESS){
        responseStateData.push(["SID_EVENT_SUCCESS","Success"]);
        for(var j in templateData.SID_EVENT_SUCCESS)
          templateLanguages.push(j);
      }
      if(templateData.SID_EVENT_FAILURE){
        responseStateData.push(["SID_EVENT_FAILURE","Failure"]);
        for(var k in templateData.SID_EVENT_FAILURE){
          if(templateLanguages.indexOf(k) == -1)
            templateLanguages.push(k);
        }
      }
      for(var x=0;x<templateLanguages.length;x++){
        for(var y=0;y<this.langToShow.length;y++){
          if(this.langToShow[y][0].toLowerCase()==templateLanguages[x].toLowerCase())
            templateLangData.push(this.langToShow[y]);
        }
      }
    }else{
      responseStateData.push(["SID_EVENT_SUCCESS","Success"],["SID_EVENT_FAILURE","Failure"]);
      templateLangData=this.langToShow;
    }
    this.view.lstBoxSubAlertResponseState.masterData=responseStateData;
    this.view.lstBoxSubAlertLanguages.masterData=templateLangData;
    this.view.forceLayout();
  },
  setChannelsTemplateData : function(){
    var templatesData=this.contentTemplates;
    var selectedLang=this.view.lstBoxSubAlertLanguages.selectedKey;
    var selectedState=this.view.lstBoxSubAlertResponseState.selectedKey;
    var channelsData=null;
    if(templatesData.hasOwnProperty(selectedState)){
      if(templatesData[selectedState].hasOwnProperty(selectedLang))
        channelsData=templatesData[selectedState][selectedLang];
    }
    this.view.flxViewSMSTemplate.setVisibility(false);
    this.view.flxViewNotificationCenter.setVisibility(false);
    this.view.flxViewPushNotification.setVisibility(false);
    this.view.flxViewEmailTemplate.setVisibility(false);
    if(channelsData===null){
      this.view.flxViewTemplate.setVisibility(false);
      this.view.rtxNoTemplate.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NoLanguageTemplate");
      this.view.flxNoContentTemplate.setVisibility(true);
    }else{
      this.view.flxNoContentTemplate.setVisibility(false);
      for(var channel in channelsData){
        if(channel==="CH_SMS"){
          this.view.ViewTemplateSMS.lblChannelMsg.text=channelsData[channel].content;
          this.view.flxViewSMSTemplate.setVisibility(true);
        }else if(channel==="CH_NOTIFICATION_CENTER"){
          this.view.ViewTemplateCenter.lblTitleValue.text=channelsData[channel].templateSubject;
          this.view.ViewTemplateCenter.lblChannelMsg.text=channelsData[channel].content;
          this.view.flxViewNotificationCenter.setVisibility(true);
        }else if(channel==="CH_PUSH_NOTIFICATION"){
          this.view.ViewTemplatePush.lblTitleValue.text=channelsData[channel].templateSubject;
          this.view.ViewTemplatePush.lblChannelMsg.text=channelsData[channel].content;
          this.view.flxViewPushNotification.setVisibility(true);
        }else if(channel==="CH_EMAIL"){
          this.view.lblEmailTitleValue.text=channelsData[channel].templateSubject;
          this.setRtxViewerData(channelsData[channel].content);
          this.view.flxViewEmailTemplate.setVisibility(true);
        }
      }
      this.view.flxEyeicon.setVisibility(true);
      this.view.flxViewTemplate.setVisibility(true);
    }
    this.view.forceLayout();
  },
  setListSelectedChannelsData : function(){
    var templatesData=this.contentTemplates;
    var selectedLang=this.view.lstBoxSubAlertLanguages.selectedKey;
    var selectedState=this.view.lstBoxSubAlertResponseState.selectedKey;
    var channelsData=null;
    if(templatesData.hasOwnProperty(selectedState)){
      if(templatesData[selectedState].hasOwnProperty(selectedLang))
        channelsData=templatesData[selectedState][selectedLang];
    }
    if(channelsData===null){
      this.view.txtSMSMsg.text="";
      this.view.txtPushNotification.text="";
      this.view.tbxPushNotificationTitle.text="";
      this.view.tbxNotiCenterTitle.text="";
      this.view.txtNotiCenterMsg.text="";
      this.view.tbxEmailSubject.text="";
      document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("editor").innerHTML="";
    }else{
      for(var channel in channelsData){
        if(channel==="CH_SMS"){
          this.view.txtSMSMsg.text=channelsData[channel].content;
          this.view.flxAddSMSTemplate.setVisibility(true);
        }else if(channel==="CH_NOTIFICATION_CENTER"){
          this.view.tbxNotiCenterTitle.text=channelsData[channel].templateSubject;
          this.view.txtNotiCenterMsg.text=channelsData[channel].content;
          this.view.flxAddNotificationCenter.setVisibility(true);
        }else if(channel==="CH_PUSH_NOTIFICATION"){
          this.view.tbxPushNotificationTitle.text=channelsData[channel].templateSubject;
          this.view.txtPushNotification.text=channelsData[channel].content;
          this.view.flxAddPushNotification.setVisibility(true);
        }else if(channel==="CH_EMAIL"){
          this.view.tbxEmailSubject.text=channelsData[channel].templateSubject;
          document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("editor").innerHTML=channelsData[channel].content;
          this.view.flxAddEmailTemplate.setVisibility(true);
        }
      }
    }
    this.view.forceLayout();
  },
  showEditSubAlert : function(subAlertData){
    this.clearValidationsForAddSubAlert();
    this.view.flxAlertCategories.setVisibility(false);
    this.view.flxAlertTypes.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(true);
    this.view.flxViewSubAlert.setVisibility(false);
    this.view.flxAddAlertScreen.setVisibility(true);
    this.view.flxAlertsSelectedLEVal.setVisibility(false);
    this.view.addAlertButtons.btnSave.text="UPDATE ALERT";
    var alertGroupDetail = this.view.lblViewDetailsAlertDisplayName.info?this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails:this.view.breadcrumbs.btnPreviousPage1.info.id;
    if(this.view.breadcrumbs.btnPreviousPage1.isVisible===false){
      this.view.breadcrumbs.btnPreviousPage1.text=alertGroupDetail.alertTypeDefinition.name.toUpperCase();
      this.toggleBreadcrumbButtons("subalert");
    }
    this.view.flxAlertConfiguration.setContentOffset({y:0,x:0});
    this.view.lblAddAlertName.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Edit") +" "+ subAlertData.subAlertDefinition.name;
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Edit").toUpperCase() +
      " "+ subAlertData.subAlertDefinition.name.toUpperCase();
    //assign customlistboxes
    this.selectAppsForEdit(subAlertData.appTypes);
    this.selectUsersForEdit(subAlertData.userTypes);
    this.selectAccountTypesForEdit(subAlertData.accountTypes);
    this.createDefaultChannels(this.defaultChannelList, this.view.flxAlertSupportedChannelEntries,"alertChannel");
    this.setSubAlertEditData(subAlertData);
    this.view.forceLayout();
  },
  setSubAlertEditData : function(subAlertData){
    var self=this;
    var isAccountLevel = subAlertData.subAlertDefinition.isAccountLevel.toLowerCase() === "no" ? false : true;
    var currLEData = self.getLEDesc(subAlertData.subAlertDefinition.legalEntityId);
    this.view.lblAddAlertSelLEVal.text = (currLEData && currLEData[0]) ? currLEData[0].companyName: "";
    //filter recipients based on account level
    if(isAccountLevel === true){
      self.view.flxAddAlertAccountTypes.setVisibility(true);
      self.filterRecipientsForAccLevel(false);
    } else{
      self.view.flxAddAlertAccountTypes.setVisibility(false);
      self.filterRecipientsForAccLevel(true);
    }
    self.view.dataEntrySubAlertName.tbxData.text = subAlertData.subAlertDefinition.name;
    
    self.view.lblSelectedRowsServType.text = self.AdminConsoleCommonUtils.getTruncatedString(subAlertData.subAlertDefinition.code, 25, 22);
    self.view.lblSelectedRowsServType.tooltip =subAlertData.subAlertDefinition.code;

    self.view.flxDropDownDetailServType.setVisibility(false);
    /////////////// setting the index for the custom dropdown
    var actions = self.view.AdvancedSearchDropDownServType.sgmentData.data;
    var selInd = 0;
    for(var i=0;i<actions.length;i++){
      if(subAlertData.subAlertDefinition.code === actions[i].customerStatusId){
        selInd = i;
        break;
      } 
    }
    if(self.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex){
      self.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1] = selInd;
    }else{
      self.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex = [0,selInd];
    }
    
    self.view.addAlertStatusSwitch.switchToggle.selectedIndex = subAlertData.subAlertDefinition.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
      0:1;
    self.view.lstBoxAddAlertCode.skin = "lstBxBre1e5edR3pxBgf5f6f8Disable";
    self.view.lstBoxAddAlertCode.setEnabled(false);
    
    self.view.flxColumnServType.setEnabled(false);
    
    // Disable custom dropdown
    self.view.lstBoxRecipients.selectedKey = subAlertData.subAlertDefinition.recipientType || "select";
    //assign is account level radiobuttons
    var radioAccLevelData = [{"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src": isAccountLevel === true ? self.radioDisabled : self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                             {"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":isAccountLevel === false ? self.radioDisabled : self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
    self.view.customRadioButtonAccountLevel.setData(radioAccLevelData);
    self.view.customRadioButtonAccountLevel.setEnabled(false);
    //assign alertype radiobuttons
    var alertType = subAlertData.subAlertDefinition.alertType;
    
    var radioTypeData = [{"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,
                          "src": isAccountLevel ? self.radioNotSelected  : (alertType.trim()).toLowerCase().indexOf("global")>=0 ? self.radioSelected : self.radioNotSelected,
                          "value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GlobalAlert"),"id":"GA"},
                         {"selectedImg":isAccountLevel ? self.radioDisabled :self.radioSelected,"unselectedImg":self.radioNotSelected,
                          "src":  isAccountLevel ? self.radioDisabled : (alertType.trim()).toLowerCase().indexOf("user") >=0 ? self.radioSelected : self.radioNotSelected,
                          "value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UserAlert"),"id":"UA"},];
    self.view.customRadioButtonAlertType.setData(radioTypeData);
    
    self.view.customRadioButtonAlertType.setEnabled(true);
    // disabling the alerts in sublevel alert
    if(isAccountLevel){
      self.view.customRadioButtonAlertType.selectedValue = {id : "UA"};
      self.view.customRadioButtonAlertType.setEnabled(false);
    }
    
    // setting the value to No at default
    let isAutoSubscribed  = subAlertData.subAlertDefinition.isAutoSubscribeEnabled === 'true';
    
    var alertTypeAutoRadioData = [{"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":isAutoSubscribed ? self.radioSelected :self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                                {"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":isAutoSubscribed ? self.radioNotSelected:self.radioSelected,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
    
    self.view.customRadioButtonAlertTypeAutoSubscribe.setData(alertTypeAutoRadioData);
    
    // when alert is user level than we show popup
    if(alertType===kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GlobalAlert")){
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(false);
      self.view.lblAutoSubTxt.setVisibility(true);
    }else{
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(true);
      self.view.lblAutoSubTxt.setVisibility(false);
    }
    
     // when alert is user level than we show popup
     self.view.customRadioButtonAlertType.imgRadioButton1.onClick = function(){
      
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(false);
      self.view.lblAutoSubTxt.setVisibility(true);
      self.view.customRadioButtonAlertType.radioButtonOnClick(self.view.customRadioButtonAlertType.imgRadioButton1);
    };
    self.view.customRadioButtonAlertType.imgRadioButton2.onClick = function(){
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(true);
      self.view.lblAutoSubTxt.setVisibility(false);
      self.view.customRadioButtonAlertType.radioButtonOnClick(self.view.customRadioButtonAlertType.imgRadioButton2);
    };
    
    //assign frequency
    if(subAlertData.subAlertDefinition.defaultFrequencyId){
      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey = subAlertData.subAlertDefinition.defaultFrequencyId;
      self.displayBasedOnSelectedFrequencyType(self.view.AlertFrequencySelectionCat);
      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol2.selectedKey = subAlertData.subAlertDefinition.defaultFrequencyValue || "SELECT";
      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol3.selectedKey = subAlertData.subAlertDefinition.defaultFrequencyValue || "SELECT";
      var formatedFreqTime = subAlertData.subAlertDefinition.defaultFrequencyTime ? self.timeValueObj(subAlertData.subAlertDefinition.defaultFrequencyTime) : "";
      self.view.AlertFrequencySelectionCat.timePicker.lstbxHours.selectedKey = formatedFreqTime ? formatedFreqTime.hours :"hh";
      self.view.AlertFrequencySelectionCat.timePicker.lstbxMinutes.selectedKey = formatedFreqTime ? formatedFreqTime.minutes : "mm";
      self.view.AlertFrequencySelectionCat.timePicker.lstbxAMPM.selectedKey = formatedFreqTime ? formatedFreqTime.meridiem : "AM";
    } else{
      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey = "none";
      self.displayBasedOnSelectedFrequencyType(self.view.AlertFrequencySelectionCat);
    }
    //assign attibute fields
    var alertDefinition = subAlertData.subAlertDefinition;
    //set currency symbol based on the LE
    var currLEData = self.getLEDesc(alertDefinition.legalEntityId);
    this.currencyValue =  self.defaultCurrencyCode(currLEData[0].baseCurrency,true);
    self.view.ValueEntryTo.lblCurrencySymbol.text = self.currencyValue;
    self.view.ValueEntryFrom.lblCurrencySymbol.text = self.currencyValue;
    if(alertDefinition.alertAttribute){
      self.view.lstBoxAlertAttribute1.selectedKey = alertDefinition.alertAttribute.alertattribute_id;
      self.changeUIForAttibute("attribute");
      self.view.lstBoxAlertAttribute2.selectedKey = alertDefinition.alertCondition.id;
      self.changeUIForAttibute("criteria");
      self.view.ValueEntryFrom.tbxEnterValue.text = alertDefinition.value1;
      self.view.ValueEntryTo.tbxEnterValue.text = alertDefinition.value2;
    }else{
      self.view.lstBoxAlertAttribute1.selectedKey = "none";
      self.changeUIForAttibute("attribute");
    }
    //assign channels
    var channelArr = subAlertData.alertsubtypeChannels.map(function(rec){
      return rec.channelId;
    });
    self.setAssignedChannelList(self.view.flxAlertSupportedChannelEntries,channelArr);
    //assign languages
    var langPref = subAlertData.displayPreferences;
    self.assignLanguagesSupportedAlertTypes(langPref,3);
    self.view.forceLayout();
  },
  showDeactivateSubAlert : function(){
    var self = this;
    this.view.flxDeleteAlert.isVisible = true;
    this.view.popUpDeactivate.btnPopUpCancel.text = self.sNoLeaveAsIs;
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DeactivateSubAlertStatus");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.DeactivateSubAlertMsg");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    //overriding actions for alert type delete language
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.activateDeactivateSubAlert(self.AdminConsoleCommonUtils.constantConfig.INACTIVE);
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  activateDeactivateSubAlert : function(statusId){
    var self = this;
    let alertCode = "" , alertTypeCode="",leId = "";
    if(this.view.segSubAlerts.selectedRowIndex && !(this.currSubAlertSelected && this.currSubAlertSelected.SubAlertId)){
      var selectedIndex=this.view.segSubAlerts.selectedRowIndex[1];
      alertCode = this.view.segSubAlerts.data[selectedIndex].lblCode.info.value;
      leId = this.view.segSubAlerts.data[selectedIndex].legalEntityId;
    }else if(this.currSubAlertSelected && this.currSubAlertSelected.SubAlertId){
      alertCode = this.currSubAlertSelected.SubAlertId;
      alertTypeCode = this.currSubAlertSelected.alertTypeCode;
      leId = this.view.lblAlertsHeaderSelLEValue.info.id;
      this.currSubAlertSelected ={};
    }
    var alertData={
      "alertTypeCode": alertTypeCode ? alertTypeCode : this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition.alertCode,
      "code": alertCode,
      "statusId": statusId,
      "legalEntityId":leId
    };//self.getDefaultAlertRequest();
    alertData.statusId=statusId;
    self.presenter.editSubAlertStatus(alertData,self.subAlertScreenView);
  },
  setRtxViewerData : function(data){
    this.emailRtxData=data;
    if(document.getElementById("iframe_rtxEmailViewer").contentWindow.document.getElementById("viewer")) {
      document.getElementById("iframe_rtxEmailViewer").contentWindow.document.getElementById("viewer").innerHTML = data;
    } else {
      if(!document.getElementById("iframe_rtxEmailViewer").newOnload) {
        document.getElementById("iframe_rtxEmailViewer").newOnload = document.getElementById("iframe_rtxEmailViewer").onload;
      }
      document.getElementById("iframe_rtxEmailViewer").onload = function() {
        document.getElementById("iframe_rtxEmailViewer").newOnload();
        document.getElementById("iframe_rtxEmailViewer").contentWindow.document.getElementById("viewer").innerHTML =data;
      };
    }
    this.view.forceLayout();
  },
  editContentTemplate : function(){
    this.alertGroupCurrAction=this.alertGroupActionConfig.EDIT;
    //this.showSupportedChannels();
	this.view.flxAddSMSTemplate.setVisibility(true);
    this.view.flxAddEmailTemplate.setVisibility(true);
    this.view.flxAddPushNotification.setVisibility(true);
    this.view.flxAddNotificationCenter.setVisibility(true);
    this.view.lblTemplateHeader.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.EditAlertContentTemplate");
    this.view.lblContentBy.text="Edit Content By";//kony.i18n.getLocalizedString("i18n.frmAlertsManagement.editContentBy");
    this.view.lstBoxSubAlertResponseState.setEnabled(false);
    this.view.lstBoxSubAlertLanguages.setEnabled(false);
    this.view.lstBoxSubAlertResponseState.skin="lstBxBre1e5edR3pxBgf5f6f8Disable";
    this.view.lstBoxSubAlertLanguages.skin="lstBxBre1e5edR3pxBgf5f6f8Disable";
    if(this.view.flxViewSMSTemplate.isVisible){
      this.view.txtSMSMsg.text=this.view.ViewTemplateSMS.lblChannelMsg.text;
    }else{
      this.view.txtSMSMsg.text="";
    }
    if(this.view.flxViewPushNotification.isVisible){
      this.view.tbxPushNotificationTitle.text=this.view.ViewTemplatePush.lblTitleValue.text;
      this.view.txtPushNotification.text=this.view.ViewTemplatePush.lblChannelMsg.text;
    }
    else{
      this.view.tbxPushNotificationTitle.text="";
      this.view.txtPushNotification.text="";
    }
    if(this.view.flxViewNotificationCenter.isVisible){
      this.view.tbxNotiCenterTitle.text=this.view.ViewTemplateCenter.lblTitleValue.text;
      this.view.txtNotiCenterMsg.text=this.view.ViewTemplateCenter.lblChannelMsg.text;
    }
    else{
      this.view.tbxNotiCenterTitle.text="";
      this.view.txtNotiCenterMsg.text="";
    }
    if(this.view.flxViewEmailTemplate.isVisible){
      this.view.tbxEmailSubject.text=this.view.lblEmailTitleValue.text;
      var emailEditorDocument = document.getElementById("iframe_rtxEmailTemplate").contentWindow.document;
      var emailViewerDocument = document.getElementById("iframe_rtxEmailViewer").contentWindow.document;
      this.emailRtxData=emailViewerDocument.getElementById("viewer").innerHTML;
      emailEditorDocument.getElementById("editor").innerHTML = this.emailRtxData;
    }
    else{
      this.view.tbxEmailSubject.text="";
      document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("editor").innerHTML="";
    }

    this.view.flxViewTemplate.setVisibility(false);
    this.view.flxOptionEdit.setVisibility(false);
    this.view.flxAddTemplateButton.setVisibility(false);
    this.view.flxOptionsSubAlerts.setVisibility(false);
    this.view.flxSaveTemplateButtons.setVisibility(true);
    this.view.btnTemplateSave.text=this.sUpdateCaps;
    this.view.flxAddTemplate.setVisibility(true);
  },
  addContentTemplate : function(){
    this.alertGroupCurrAction=this.alertGroupActionConfig.CREATE;
    this.view.txtSMSMsg.text="";
    this.view.txtPushNotification.text="";
    this.view.tbxPushNotificationTitle.text="";
    this.view.tbxNotiCenterTitle.text="";
    this.view.txtNotiCenterMsg.text="";
    this.view.tbxEmailSubject.text="";
    var langMasterData=this.listBoxDataLang.concat(this.langToShow);
    this.view.lstBoxSubAlertLanguages.masterData=langMasterData;
    this.view.lstBoxSubAlertResponseState.masterData=([["SID_EVENT_SUCCESS","Success"],["SID_EVENT_FAILURE","Failure"]]);
    this.view.lblTemplateHeader.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlertContentTemplate");
    this.view.lblContentBy.text="Add Content By";//kony.i18n.getLocalizedString("i18n.frmAlertsManagement.addContentBy");
    //this.showSupportedChannels();
    //     this.setTemplateListBoxData();
	this.view.flxAddSMSTemplate.setVisibility(true);
    this.view.flxAddEmailTemplate.setVisibility(true);
    this.view.flxAddPushNotification.setVisibility(true);
    this.view.flxAddNotificationCenter.setVisibility(true);
    this.view.flxViewTemplateListBox.setVisibility(true);
    this.view.flxViewTemplate.setVisibility(false);
    this.view.flxOptionEdit.setVisibility(false);
    this.view.flxAddTemplateButton.setVisibility(false);
    this.view.flxOptionsSubAlerts.setVisibility(false);
    this.view.btnTemplateSave.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SAVE");
    this.view.lstBoxSubAlertLanguages.selectedKey="select";
    document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("editor").innerHTML="";
    this.view.flxNoContentTemplate.setVisibility(false);
    //document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementsByClassName("table-palette")[0].style.display = "none";
    document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.querySelector("#editor").dataset.text =kony.i18n.getLocalizedString("i18n.frmAlertsManagement.addContentHere");
    document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementsByClassName("icon-image")[0].style.display = "block";
    this.view.forceLayout();
  },
  saveTemplate : function(){
    var templateData;
    var addedChannels=[];
    var emailEditorDocument = document.getElementById("iframe_rtxEmailTemplate").contentWindow.document;
    if(this.view.flxAddSMSTemplate.isVisible&&this.view.txtSMSMsg.text!==""){
      var smsChannelData={
        "locale": this.view.lstBoxSubAlertLanguages.selectedKey,
        "statusId": this.view.lstBoxSubAlertResponseState.selectedKey,
        "channelId": "CH_SMS",
        "content": this.view.txtSMSMsg.text
      };
      addedChannels.push(smsChannelData);
    }
    if(this.view.flxAddPushNotification.isVisible&&this.view.txtPushNotification.text!==""&&this.view.tbxPushNotificationTitle.text!==""){
      var pushChannelData={
        "locale": this.view.lstBoxSubAlertLanguages.selectedKey,
        "statusId": this.view.lstBoxSubAlertResponseState.selectedKey,
        "channelId": "CH_PUSH_NOTIFICATION",
        "subject": this.view.tbxPushNotificationTitle.text,
        "content": this.view.txtPushNotification.text
      };
      addedChannels.push(pushChannelData);
    }
    if(this.view.flxAddNotificationCenter.isVisible&&this.view.tbxNotiCenterTitle.text!==""&&this.view.txtNotiCenterMsg.text!==""){
      var notiChannelData={
        "locale": this.view.lstBoxSubAlertLanguages.selectedKey,
        "statusId": this.view.lstBoxSubAlertResponseState.selectedKey,
        "channelId": "CH_NOTIFICATION_CENTER",
        "subject": this.view.tbxNotiCenterTitle.text,
        "content": this.view.txtNotiCenterMsg.text
      };
      addedChannels.push(notiChannelData);
    }
    if(this.view.flxAddEmailTemplate.isVisible&&this.view.tbxEmailSubject.text!==""&&emailEditorDocument.getElementById("editor").innerHTML.length>0){      
      var emailChannelData={
        "locale": this.view.lstBoxSubAlertLanguages.selectedKey,
        "statusId": this.view.lstBoxSubAlertResponseState.selectedKey,
        "channelId": "CH_EMAIL",
        "subject": this.view.tbxEmailSubject.text,
        "content": emailEditorDocument.getElementById("editor").innerHTML
      };
      addedChannels.push(emailChannelData);
    }
    if(addedChannels.length!==0){
      templateData=this.getDefaultAlertRequest();
      templateData.addedTemplates=addedChannels;
      this.callEditSubAlert(templateData,true);
    }else{
      this.setContentTemplateData();
    }
  },
  showSupportedChannels : function(){
    if(this.supportedChannels.contains("Email"))
      this.view.flxAddEmailTemplate.setVisibility(true);
    else
      this.view.flxAddEmailTemplate.setVisibility(false);
    if(this.supportedChannels.contains("SMS/Text"))
      this.view.flxAddSMSTemplate.setVisibility(true);
    else
      this.view.flxAddSMSTemplate.setVisibility(false);
    if(this.supportedChannels.contains("Push Notification"))
      this.view.flxAddPushNotification.setVisibility(true);
    else
      this.view.flxAddPushNotification.setVisibility(false);
    if(this.supportedChannels.contains("Notification Center"))
      this.view.flxAddNotificationCenter.setVisibility(true);
    else
      this.view.flxAddNotificationCenter.setVisibility(false);
    this.view.forceLayout();
  },
  validateEditAlertCategoryScreen : function(){
    var isValid = true;
    if(this.view.textBoxEntryCategoryName.tbxEnterValue.text.trim() === ""){
      this.view.textBoxEntryCategoryName.flxEnterValue.skin = "sknFlxCalendarError";
      this.view.textBoxEntryCategoryName.flxInlineError.setVisibility(true);
      isValid = false;
    }
    if (this.view.customCategoryRadioButtonType.selectedValue === null) {
      this.view.flxCategoryRadioButtonError.setVisibility(true);
      this.view.lblErrMsgRadioCategory.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Please_select_value");
      isValid = false;
    }
    if(this.isSingleEntity === false &&
       this.view.lblEditCategorySelectedLE.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity")){
      this.view.flxEditCategoryLEError.setVisibility(true);
      this.view.flxEditCategorySelectedLE.skin = "sknFlxCalendarError";
      isValid = false;
    }
    var isFrequencyValid = this.validateFrequency(this.view.frequencySelectionCat);
    if(!isFrequencyValid) isValid = false;
    var isLangValid = this.validateSupportedLanguages(1);
    if (!isLangValid) {
      this.view.flxEditAlertCategoryLanguagesError.setVisibility(true);
      isValid = false;
    }
    var isChannelValid = this.validateChannelSelection(this.view.flxSupportedChannelEntries);
    if(!isChannelValid){
      this.view.flxCategoryChannelError.setVisibility(true);
      isValid = false;
    }
    return isValid;
  },
  validateAddAlertGroupScreen : function(){
    //var self = this;
    var isValid = true;

    if(this.view.dataEntryAddAlertType12.tbxData.text === ""){
      this.view.dataEntryAddAlertType12.flxError.setVisibility(true);
      this.view.dataEntryAddAlertType12.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Alert_group_name_cannot_be_empty");
      this.view.dataEntryAddAlertType12.tbxData.skin = "skinredbg";
      isValid =false;
    } else if(this.view.dataEntryAddAlertType12.tbxData.text.length < 5){
      this.view.dataEntryAddAlertType12.flxError.setVisibility(true);
      this.view.dataEntryAddAlertType12.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Name_cannot_exceed_characters");
      this.view.dataEntryAddAlertType12.tbxData.skin = "skinredbg";
      isValid =false;
    }else{
      var uniqueName = this.validateAlertName(this.view.dataEntryAddAlertType12.tbxData.text);
      if(uniqueName === false &&
         this.alertGroupCurrAction === this.alertGroupActionConfig.CREATE ){
        this.view.dataEntryAddAlertType12.flxError.setVisibility(true);
        this.view.dataEntryAddAlertType12.lblErrorMsg.text = kony.i18n.getLocalizedString("Name already exsist");
        this.view.dataEntryAddAlertType12.tbxData.skin = "skinredbg";
        isValid = false;
      }
    }
    if(this.view.lstBoxAddAlertType11.selectedKey === "select"){
      this.view.flxAddAlertTypeError11.setVisibility(true);
      this.view.lblErrMsgAlertTypeCode.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Please_select_alertgroup_code");
      this.view.lstBoxAddAlertType11.skin = "redListBxSkin";
      isValid = false;
    }
    if(this.view.radioBtnAddAlertType21.selectedValue === null){
      this.view.flxAddAlertTypeError21.setVisibility(true);
      this.view.lblErrMsgAddAlertType21.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Please_select_type");
      isValid =false;
    }
    var isLangValid = this.validateSupportedLanguages(2);
    if(!isLangValid){
      this.view.flxAddAlertTypeLangError.setVisibility(true);
      isValid = false;
    }
    var isFrequencyValid = this.validateFrequency(this.view.frequencySelectionAlertType);
    if(!isFrequencyValid){
      isValid = false;
    }
    var isChannelValid = this.validateChannelSelection(this.view.flxAddAlertTypeChannelCont);
    if(!isChannelValid){
      isValid = false;
      this.view.flxAddAlertTypeError41.setVisibility(true);
    }
    return isValid;
  },
  /*
   * check for unique alert group name
   * @param : alertName
   */
  validateAlertName : function(alertName){
    var isValid = true;
    var segData =  this.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.alertGroups || [];
    for(var i=0;i<segData.length;i++){
      if(segData[i].name === alertName){
        isValid = false;
        break;
      }
    }
    return isValid;
  },
  /*
   * validate the fields in supported languages segment
   * @param: option- 1(categoryLang)/2(alert group lang)
   * @return: true or false
   */
  validateSupportedLanguages : function(option){
    var self =this;
    var isValid = true;
    var segmentPath = "";
    if(option === 1) segmentPath = self.view.segEditAlertCategoryLanguages;
    else if(option === 2) segmentPath = self.view.segaddalertTypeLanguages;
    else if(option === 3) segmentPath = self.view.segAddAlertLanguages;
    var segData =  segmentPath.data;
    if(segData[segData.length-1].lblAddAlertTypeSegLanguage.info.id === "" &&
       segData[segData.length-1].tbxDisplayName.text === "" &&
       segData[segData.length-1].tbxDescription.text === ""){
      segData = segData.slice(0,segData.length -1);
    }
    for(var i=0;i<segData.length;i++){
      if(segData[i].lblAddAlertTypeSegLanguage.info.id === "" ||
         segData[i].tbxDisplayName.text === "" ||
         segData[i].tbxDescription.text === ""){
        isValid = false;
        break;
      }
    }
    return isValid;
  },
  /*
  * validate if atleast one channel selected
  * @param: channels container path
  * @returns: true/false
  */
  validateChannelSelection : function(channelContainer){
    var isValid = false;
    var channelsList = channelContainer.children;
    for(var i =0; i< channelsList.length; i++){
      var channelPath = this.view[channelsList[i]];
      if(channelPath.flxChannel.skin === "sknFlxBgF2F9FFBr006CCARd4px"){
        isValid = true;
        break;
      }
    }
    return isValid;
  },
  /*
  * validates the frequency for alert
  * @param: frequency selection component path
  * @return : isValid - true/false
  */
  validateFrequency : function(frequencyCompPath){
    var isValid = true;
    var freqType = frequencyCompPath.lstBoxFrequencyCol1.selectedKey;
    var timePicker = frequencyCompPath.timePicker;
    if(freqType === "SELECT"){
      isValid = false;
      frequencyCompPath.lstBoxFrequencyCol1.skin = "sknLstBoxeb3017Bor3px";
      frequencyCompPath.flxInlineError1.setVisibility(true);
    }
    if(frequencyCompPath.flxFrequencyColumn2.isVisible &&
       frequencyCompPath.lstBoxFrequencyCol2.selectedKey === "SELECT"){
      isValid = false;
      frequencyCompPath.lstBoxFrequencyCol2.skin = "sknLstBoxeb3017Bor3px";
      frequencyCompPath.flxInlineError2.setVisibility(true);
    }
    if(frequencyCompPath.flxFrequencyColumn3.isVisible &&
       frequencyCompPath.lstBoxFrequencyCol3.selectedKey === "SELECT"){
      isValid = false;
      frequencyCompPath.lstBoxFrequencyCol3.skin = "sknLstBoxeb3017Bor3px";
      frequencyCompPath.flxInlineError3.setVisibility(true);
    }
    if(frequencyCompPath.flxFrequencyColumn4.isVisible && 
       (timePicker.lstbxHours.selectedKey === "hh" || timePicker.lstbxMinutes.selectedKey === "mm")){
      isValid = false;
      frequencyCompPath.flxFrequencyTime.skin = "sknFlxCalendarError";
      frequencyCompPath.flxInlineError4.setVisibility(true);
    }
    return isValid;
  },
  /*
   * validate if alert code exsist
   * @return: true or false
   */
  checkForAlertCodeExsist : function(alertCode){
    var self =this;
    var isValid = true;
    var parentCont = this.view.flxAlertListSegment.widgets();
    for(var i=0;i<parentCont.length;i++){
      var cardAlertCode = parentCont[i].info.alertGroupDetail.code;
      if(cardAlertCode === alertCode){
        isValid = false;
        break;
      }
    }
    return isValid;
  },
  clearValidationsForAddCategory: function(cat,skinWidPath,visWidPath){
    var self = this;
    if(cat === 1){ //textbox
      skinWidPath.skin = "skntbxLato35475f14px";
      if(visWidPath) visWidPath.setVisibility(false);
    } else if(cat === 2){ //listbox
      skinWidPath.skin = "sknLbxborderd7d9e03pxradius";
      if(visWidPath) visWidPath.setVisibility(false);
    } else if(cat === 3){ //flex
      skinWidPath.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      if(visWidPath) visWidPath.setVisibility(false);
    } else{ //clear all
      self.view.textBoxEntryCategoryName.flxEnterValue.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.textBoxEntryCategoryName.flxInlineError.setVisibility(false);
      self.view.flxEditCategorySelectedLE.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.frequencySelectionCat.lstBoxFrequencyCol1.skin = "sknLbxborderd7d9e03pxradius";
      self.view.frequencySelectionCat.lstBoxFrequencyCol2.skin = "sknLbxborderd7d9e03pxradius";
      self.view.frequencySelectionCat.lstBoxFrequencyCol3.skin = "sknLbxborderd7d9e03pxradius";
      self.view.frequencySelectionCat.flxFrequencyTime.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.frequencySelectionCat.flxInlineError1.setVisibility(false);
      self.view.frequencySelectionCat.flxInlineError2.setVisibility(false);
      self.view.frequencySelectionCat.flxInlineError3.setVisibility(false);
      self.view.frequencySelectionCat.flxInlineError4.setVisibility(false);
      self.view.flxCategoryRadioButtonError.setVisibility(false);
      self.view.flxCategoryChannelError.setVisibility(false);
      self.view.flxEditAlertCategoryLanguagesError.setVisibility(false);
      self.view.flxEditCategoryLEError.setVisibility(false);
    }
  },
  /*
   * clears all the error validations for add/edit alert group screen
   */
  clearValidationsForAddAlertGroup : function(cat,skinWidPath,visWidPath){
    var self = this;
    if(cat === 1){ //textbox
      skinWidPath.skin = "skntbxLato35475f14px";
      if(visWidPath) visWidPath.setVisibility(false);
    } else if(cat === 2){ //listbox
      skinWidPath.skin = "sknLbxborderd7d9e03pxradius";
      if(visWidPath) visWidPath.setVisibility(false);
    }else if(cat === 3){ //flex
      skinWidPath.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      if(visWidPath) visWidPath.setVisibility(false);
    } else{
      self.view.dataEntryAddAlertType12.tbxData.skin = "skntbxLato35475f14px";
      self.view.lstBoxAddAlertType11.skin = "sknLbxborderd7d9e03pxradius";
      self.view.dataEntryAddAlertType11.tbxData.skin = "skntbxLato35475f14px";
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol1.skin = "sknLbxborderd7d9e03pxradius";
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol2.skin = "sknLbxborderd7d9e03pxradius";
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol3.skin = "sknLbxborderd7d9e03pxradius";
      self.view.frequencySelectionAlertType.flxFrequencyTime.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.frequencySelectionAlertType.flxInlineError1.setVisibility(false);
      self.view.frequencySelectionAlertType.flxInlineError2.setVisibility(false);
      self.view.frequencySelectionAlertType.flxInlineError3.setVisibility(false);
      self.view.frequencySelectionAlertType.flxInlineError4.setVisibility(false);

      self.view.flxAddAlertTypeError11.setVisibility(false);
      self.view.dataEntryAddAlertType12.flxError.setVisibility(false);
      self.view.dataEntryAddAlertType11.flxError.setVisibility(false);
      self.view.flxAddAlertTypeError13.setVisibility(false);
      self.view.flxAddAlertTypeError21.setVisibility(false);
      self.view.flxAddAlertTypeLangError.setVisibility(false);
      self.view.flxAddAlertTypeError41.setVisibility(false);
    }
    self.view.forceLayout();
  },
  /*
   * set details to alert type details screen
   * @param: alert type details
   */
  setDataToAlertTypeDetailsScreen: function(data){
    var self = this;
    var categoryDetails = self.view.lblViewDetailsCategoryDisplayName.info.categoryDetails;
    //show/hide option based on LE permissions
    var isLEEditPermAvail = self.isPermissionAvailableForLE(data.alertTypeDefinition.legalEntityId, "UPDATE");
    self.view.flxOptions.setVisibility(isLEEditPermAvail);
    
    self.view.lblAlertTypeHeaderArrow.skin ="sknIcon6E7178Sz13px";
    self.view.lblAlertTypeHeaderArrow.text ="\ue915";
    self.view.breadcrumbs.btnPreviousPage1.info = {"id": data.alertTypeDefinition.alertCode};
    self.view.lblViewDetailsAlertDisplayName.text = data.alertTypeDefinition.name;
    self.view.lblAlertTypeColValue11.text =  self.checkForNull(data.alertTypeDefinition.alertCode,kony.i18n.getLocalizedString("i18n.common.NA"));
    self.view.lblAlertTypeColValue12.text = data.alertTypeDefinition.isAccountLevel.toLowerCase() === "no" ? kony.i18n.getLocalizedString("i18n.common.no"): kony.i18n.getLocalizedString("i18n.common.yes");
    
    var frequencyObj = {
      "type":data.alertTypeDefinition.defaultFrequencyId || "",
      "value":data.alertTypeDefinition.defaultFrequencyValue || "",
      "time": data.alertTypeDefinition.defaultFrequencyTime ? this.timeValueObj(data.alertTypeDefinition.defaultFrequencyTime) : ""
    };
    self.view.lblAlertTypeColValue21.text = self.getFrequencyText(frequencyObj);
    var channelStr = "";
    this.supportedChannels=[];
    this.sortBy = this.getObjectSorter("channelId");
    var sortedChannels = data.alertGroupChannels.sort(this.sortBy.sortData);
    for (var j= 0;j < sortedChannels.length; j++) {
      var name = this.getChannelNameFromId(sortedChannels[j].channelId);
      channelStr += name + ", ";
      this.supportedChannels.push(name);
    }
    if (channelStr.substr(channelStr.length-2,2) === ", ") {
      channelStr = channelStr.substring(0,channelStr.length-2);
    }
    self.view.lblAlertTypeColValue22.text = channelStr === "" ? kony.i18n.getLocalizedString("i18n.common.NA") : channelStr;

    var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
    var defaultLangDesc = "";
    //get default locale description
    for(var j=0; j<data.displayPreferences.length; j++){
      if(currLocale === data.displayPreferences[j].LanguageCode){
        defaultLangDesc = data.displayPreferences[j];
        break;
      }
    }
    //assign curr locale description if available else assign first description record
    if(defaultLangDesc){
      var currLangName = this.getLanguageNameForCode(currLocale);
      this.view.lblAlertTypeDescLanguageValue.text = currLangName ? " - "+ currLangName.toUpperCase(): "";
      this.view.lblAlertTypeDescValue.text = defaultLangDesc.Description;
    } else{
      var langCode =  data.displayPreferences.length > 0 ? data.displayPreferences[0].LanguageCode : "";
      var localeLangName = this.getLanguageNameForCode(langCode);
      this.view.lblAlertTypeDescLanguageValue.text = localeLangName ? " - "+ localeLangName.toUpperCase(): "";
      this.view.lblAlertTypeDescValue.text = data.displayPreferences.length > 0 ? data.displayPreferences[0].Description : "N/A";
    }
    if(data.alertTypeDefinition.typeStatus === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      self.view.lblIconViewDetailsStatus.skin = "sknFontIconActivate";
      self.view.lblViewDetailsAlertTypeStatus.text = kony.i18n.getLocalizedString("i18n.permission.Active");
      if(categoryDetails.categoryDefintion.categoryStatus === self.AdminConsoleCommonUtils.constantConfig.INACTIVE) {
        self.view.flxAlertTypeMessage.setVisibility(true);
        self.view.alertMessage.lblData.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.alertNotiMsgCat");
        self.view.flxAlertMessage.setVisibility(true);
      }else{
        self.view.flxAlertTypeMessage.setVisibility(false);
        self.view.flxAlertMessage.setVisibility(false);
      }
    }else{
      self.view.lblIconViewDetailsStatus.skin = "sknfontIconInactive";
      self.view.lblViewDetailsAlertTypeStatus.text = kony.i18n.getLocalizedString("i18n.permission.Inactive");
      self.view.flxAlertTypeMessage.setVisibility(true);
      self.view.alertMessage.lblData.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.alertNotiMsgGrp");
      self.view.flxAlertMessage.setVisibility(true);
      if(categoryDetails.categoryDefintion.categoryStatus === self.AdminConsoleCommonUtils.constantConfig.ACTIVE){
        self.view.alertTypeMessage.lblData.text = self.sAlertGroupInactive;
        self.view.alertMessage.lblData.text = self.sAlertGroupInactive;
      }
    }
    self.setAllLanguagesCategoryData(data.displayPreferences);
    self.view.forceLayout();
  },
  /*
   * display popup for changing alert type status
   */
  displayDeactivatePopupForAlertType : function(statusId){
    var self = this;
    this.view.flxDeleteAlert.setVisibility(true);
    this.view.popUpDeactivate.btnPopUpCancel.text = self.sNoLeaveAsIs;
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Alertgroup_deactivate_heading");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Alertgroup_deactivate_message");
    this.view.popUpDeactivate.btnPopUpDelete.text = self.sYesDeactivate;

    this.view.forceLayout();
    //overriding actions for deactivate alert group
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.presenter.editAlertGroup(self.activateDeactivate,self.alertGroupScreenContext);
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  /*
   * highlight currently selected segment row
   */
  selectCurrentRow : function(){
    var self = this;
    var currInd = self.view.segSequenceList.selectedRowIndex[1];
    var segData = self.view.segSequenceList.data;
    var currRowData = self.view.segSequenceList.data[currInd];
    for(var i=0;i<segData.length;i++){
      if(i !== currInd && segData[i].flxAlertSequenceMap.skin === "sknFlxe1e5ed100O"){
        segData[i].flxAlertSequenceMap.skin = "sknbackGroundffffff100";
      } else{ //do nothing
      }
      self.view.segSequenceList.setDataAt(segData[i], i);
    }
    self.disableArrowsSequencePopup(currInd);
    currRowData.flxAlertSequenceMap.skin = "sknFlxe1e5ed100O";
    self.view.segSequenceList.setDataAt(currRowData, currInd);
    self.reorderAlertIndex = currInd;
    self.view.forceLayout();
  },
  /*
   * set visibility for breadcrumb buttons
   * @param : category - alertgroup or subalert
   */
  toggleBreadcrumbButtons :  function(category){
    var self = this;
    self.view.flxAlertsBreadCrumb.setVisibility(true);
    self.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    if(category === "category"){
      self.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ALERTS_UC");
      self.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
      self.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
      self.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      self.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      self.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
      self.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    } else if(category === "alertgroup"){
      self.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
      self.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      self.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(false);
      self.view.breadcrumbs.btnPreviousPage1.setVisibility(false);
    }else if(category === "subalert"){
      self.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(true);
      self.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      self.view.breadcrumbs.fontIconBreadcrumbsRight3.setVisibility(true);
      self.view.breadcrumbs.btnPreviousPage1.setVisibility(true);
    } else{
      self.view.flxAlertsBreadCrumb.setVisibility(false);
    }
  },
  /*
   * check for null,empty,undefined
   *@param : value, returnValue("","N.A")
   *@return : expected value
   */
  checkForNull : function(value,returnValue){
    if(value){
      return value;
    }else{
      return returnValue;
    }
  },
  validateFields : function(){
    var isValid=true;
    if(this.view.dataEntrySubAlertName.tbxData.text.trim()===""|| this.view.dataEntrySubAlertName.tbxData.text.trim().length<5){
      this.view.dataEntrySubAlertName.tbxData.skin="skinredbg";
      this.view.dataEntrySubAlertName.lblErrorMsg.text=this.view.dataEntrySubAlertName.tbxData.text.trim()===""?"Alert name can not be empty":"Alert name should contain atleast 5 chars";
      this.view.dataEntrySubAlertName.flxError.setVisibility(true);
      isValid = false
    }
    // if(this.view.lstBoxAddAlertCode.selectedKey==="Select"){
    //   this.view.lstBoxAddAlertCode.skin="redListBxSkin";
    //   this.view.lblErrorAlertCode.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectAlertCode");
    //   this.view.flxAddAlertCodeError.setVisibility(true);
    //   isValid = false
    // }
    var selectedInd=this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex?this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1]:null;
    if(selectedInd===null || this.view.lblSelectedRowsServType.text==="Select a code"){
      this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3pxBordee32416";
      this.view.lblErrorAlertCode.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectAlertCode");
      this.view.flxAddAlertCodeError.setVisibility(true);
      isValid = false
    }

    if(this.view.customListboxAlertApps.segList.selectedRowItems===null){
      this.view.customListboxAlertApps.flxSelectedText.skin="sknRedBorder";
      this.view.customListboxAlertApps.flxListboxError.setVisibility(true);
      isValid = false
    }
    if(this.view.customListboxAlertUsertypes.segList.selectedRowItems==null){
      this.view.customListboxAlertUsertypes.flxSelectedText.skin="sknRedBorder";
      this.view.customListboxAlertUsertypes.flxListboxError.setVisibility(true);
      isValid = false
    }
    if(this.view.flxAddAlertAccountTypes.isVisible&&this.view.customListboxAlertAccountTypes.segList.selectedRowItems===null){
      this.view.customListboxAlertAccountTypes.flxSelectedText.skin="sknRedBorder";
      this.view.customListboxAlertAccountTypes.flxListboxError.setVisibility(true);
      isValid = false
    }
    if(this.view.flxAlertAttribute2.isVisible&&this.view.lstBoxAlertAttribute2.selectedKey==="SELECT"){
      this.view.lstBoxAlertAttribute2.skin="redListBxSkin";
      this.view.flxAttributeError2.setVisibility(true);
      isValid=false;
    }
    if(this.view.lstBoxRecipients.selectedKey==="select"){
      this.view.lstBoxRecipients.skin="redListBxSkin";
      this.view.flxAddAlertErrorRecipient.setVisibility(true);
      isValid = false
    }
    var isAttributesValid=this.validateAttributes();
    if(!isAttributesValid){
      this.view.flxAttributeError3.setVisibility(true);
      isValid = false;
    }
    var isLangValid = this.validateSupportedLanguages(3);
    if(!isLangValid){
      this.view.flxAddAlertLanguagesError.setVisibility(true);
      isValid = false;
    }
    var isFrequencyValid = this.validateFrequency(this.view.AlertFrequencySelectionCat);
    if(!isFrequencyValid){
      isValid = false;
    }
    var isChannelValid = this.validateChannelSelection(this.view.flxAlertSupportedChannelEntries);
    if(!isChannelValid){
      isValid = false;
      this.view.flxAlertChannelError.setVisibility(true);
    }
    return isValid;
  },
  toCheckAlertNameAvailability: function () {
    var currentAlertName = this.view.dataEntrySubAlertName.tbxData.text.trim();
    var allAlerts = this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertSubTypes;
    var existingAlertNames = [];
    var doesExsist = false;
    for (var i = 0; i < allAlerts.length; i++) {
      existingAlertNames.push(allAlerts[i].name);
    }
    if(this.alertGroupCurrAction===this.alertGroupActionConfig.EDIT){
      var selectedIndex=this.view.segSubAlerts.selectedRowIndex[1];
      var editAlertName = this.view.segSubAlerts.data[selectedIndex].lblDisplayName;
      existingAlertNames = existingAlertNames.filter(function(user){return user !== editAlertName;});
    }
    for (var j = 0; j < existingAlertNames.length; j++) {
      if (currentAlertName === existingAlertNames[j]) {
        doesExsist = true;
        break;
      } else {
        doesExsist = false;
      }
    }
    if (doesExsist) {
      if(this.view.dataEntrySubAlertName.tbxData.skin !== "skntbxBordereb30173px"){
        this.view.flxSubAlertNameAvailable.setVisibility(false);
        this.view.dataEntrySubAlertName.flxError.setVisibility(true);
        this.view.dataEntrySubAlertName.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AlertNameNotAvailable");
        this.view.dataEntrySubAlertName.lblErrorMsg.skin = "sknLabelRed";
        this.view.dataEntrySubAlertName.tbxData.skin = "skntbxBordereb30173px";
      }
    } else {
      this.view.dataEntrySubAlertName.flxError.setVisibility(false);
      this.view.flxSubAlertNameAvailable.setVisibility(true);
      this.view.lblSubAlertNameAvailable.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AlertNameAvailable");
      this.view.dataEntrySubAlertName.tbxData.skin = "skntxtbxDetails0bbf1235271384a";
    }
  },
  checkAlertCode : function(){
    // var currentAlertCode = this.view.lstBoxAddAlertCode.selectedKey;
    
    var selectedInd=this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex?this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1]:null;
    var currentAlertCode="";
    if(selectedInd!==undefined&&selectedInd!==null){
      currentAlertCode=this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].customerStatusId;
      if(this.view.lblSelectedRowsServType.text==="Select a code"){
        currentAlertCode='';
      }
    }
      if(!this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails){
        // if alertGroupDetails is empty we return from the function
        return;
      }
      
    var allAlerts = this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertSubTypes;
    var existingAlerCodes = [];
    var doesExsist = false;
    if(this.alertGroupCurrAction===this.alertGroupActionConfig.EDIT)
      return true;
    for (var i = 0; i < allAlerts.length; i++) {
      existingAlerCodes.push(allAlerts[i].code);
    }
    for (var j = 0; j < existingAlerCodes.length; j++) {
      if (currentAlertCode === existingAlerCodes[j]) {
        doesExsist = true;
        break;
      } else {
        doesExsist = false;
      }
    }
    if (doesExsist) {
      if(this.view.flxDropDownServType.skin !== "sknflxffffffoptemplateop3pxBordee32416"){
        this.view.flxAddAlertCodeError.setVisibility(true);
        this.view.lblErrMsgAlertCode.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Alert_code_already_exist");
        this.view.lblErrMsgAlertCode.skin = "sknLabelRed";
        this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3pxBordee32416";
        this.view.lstBoxAddAlertCode.skin = "redListBxSkin";
      }
    } else {
      this.view.flxAddAlertCodeError.setVisibility(false);
      this.view.lstBoxAddAlertCode.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3px";
    }
  },
  getSubAlertViewData : function(){
    var alertGroupDetail = this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails;
    this.view.breadcrumbs.btnPreviousPage1.text=alertGroupDetail.alertTypeDefinition.name.toUpperCase();
    this.view.breadcrumbs.btnPreviousPage1.info = {"id":alertGroupDetail.alertTypeDefinition.alertCode};
    var selectedIndex=this.view.segSubAlerts.selectedIndices[0][1];
    var subAlertId=this.view.segSubAlerts.data[selectedIndex].lblCode.info.value;
    var inputData={
      "SubAlertId":subAlertId,
      "legalEntityId": this.view.segSubAlerts.data[selectedIndex].legalEntityId
    };
    this.presenter.getSubAlertView(inputData,"view");
  },
  createEditAlert : function(alertData,isView){
    if(this.alertGroupCurrAction===this.alertGroupActionConfig.EDIT)
      this.callEditSubAlert(alertData,isView);
    else if(this.alertGroupCurrAction===this.alertGroupActionConfig.CREATE)
      this.callCreateSubAlert(alertData);
    this.view.flxAddAlertScreen.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(false);
    this.view.flxAlertTypes.setVisibility(true);
  },
  callCreateSubAlert :function(createAlertData){
    this.presenter.createSubAlert(createAlertData);
  },
  callEditSubAlert :function(EditAlertData, isView){
    this.presenter.editSubAlert(EditAlertData,isView);
  },
  setPreviewData :function(){
    var emailData;
    if(this.view.flxViewTemplate.isVisible===true)
      this.showViewPreviewData();
    else if(this.view.flxAddTemplate.isVisible===true)
      this.showAddPreviewData();
  },
  showViewPreviewData : function(){
    if(this.view.flxViewNotificationCenter.isVisible===true){
      this.view.lblPreviewSubHeader1.text=this.populateAlertPreview(this.view.ViewTemplateCenter.lblTitleValue.text);
      this.view.btnNotifCenter.setVisibility(true);
      this.view.lblPreviewTemplateBody.text=this.view.ViewTemplateCenter.lblChannelMsg.text;
      this.view.lblPreviewTemplateBody.setVisibility(true);
      this.view.rtxViewer.setVisibility(false);
      this.view.flxTemplatePreviewHeader.setVisibility(true);
      this.view.flxPopUpButtons.top="3px";
      this.setSkinForChannelTabs(this.view.btnNotifCenter);
      this.view.flxPreviewPopup.setVisibility(true);
    }
    else
      this.view.btnNotifCenter.setVisibility(false);
    if(this.view.flxViewEmailTemplate.isVisible===true){
      //this.emailRtxData=document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("viewer").innerHTML;
      this.view.btnEmail.setVisibility(true);
      this.view.flxPreviewPopup.setVisibility(true);
      this.view.lblPreviewTemplateBody.setVisibility(false);
      this.view.rtxViewer.setVisibility(true);
      this.view.flxTemplatePreviewHeader.setVisibility(true);
      this.view.flxPopUpButtons.top="3px";
      this.view.lblPreviewSubHeader1.text=this.populateAlertPreview(this.view.lblEmailTitleValue.text);
      this.setSkinForChannelTabs(this.view.btnEmail);
      var emailData=this.populateAlertPreview(this.emailRtxData);
      if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = emailData;
      } else {
        if(!document.getElementById("iframe_rtxViewer").newOnload) {
          document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
        }
        document.getElementById("iframe_rtxViewer").onload = function() {
          document.getElementById("iframe_rtxViewer").newOnload();
          document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =emailData;
        };
      }
    }
    else
      this.view.btnEmail.setVisibility(false);
    if(this.view.flxViewPushNotification.isVisible===true){
      this.view.lblPreviewSubHeader1.text=this.populateAlertPreview(this.view.ViewTemplatePush.lblTitleValue.text);
      this.view.btnPushNoti.setVisibility(true);
      this.view.lblPreviewTemplateBody.setVisibility(true);
      this.view.rtxViewer.setVisibility(false);
      this.view.flxTemplatePreviewHeader.setVisibility(true);
      this.view.flxPopUpButtons.top="3px";
      this.view.lblPreviewTemplateBody.text=this.populateAlertPreview(this.view.ViewTemplatePush.lblChannelMsg.text);
      this.setSkinForChannelTabs(this.view.btnPushNoti);
      this.view.flxPreviewPopup.setVisibility(true);
    }
    else
      this.view.btnPushNoti.setVisibility(false);
    if(this.view.flxViewSMSTemplate.isVisible===true){
      this.view.btnSMS.setVisibility(true);
      this.view.lblPreviewTemplateBody.setVisibility(true);
      this.view.rtxViewer.setVisibility(false);
      this.setSkinForChannelTabs(this.view.btnSMS);
      this.view.lblPreviewTemplateBody.text=this.populateAlertPreview(this.view.ViewTemplateSMS.lblChannelMsg.text);
      this.view.flxPreviewPopup.setVisibility(true);
      this.view.flxTemplatePreviewHeader.setVisibility(false);
      this.view.flxPopUpButtons.top="70px";
    }
    else
      this.view.btnSMS.setVisibility(false);
    if(this.view.flxPreviewPopup.isVisible===false)
      this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NoContentAdded"), this);
    this.view.forceLayout();
  },
  showAddPreviewData : function(){
    this.emailRtxData=document.getElementById("iframe_rtxEmailTemplate").contentWindow.document.getElementById("editor").innerHTML;
    if(this.view.flxNotiCenterTitle.isVisible===true&&this.view.txtNotiCenterMsg.text!==""&&this.view.tbxNotiCenterTitle.text!==""){
      this.view.lblPreviewSubHeader1.text=this.populateAlertPreview(this.view.tbxNotiCenterTitle.text);
      this.view.btnNotifCenter.setVisibility(true);
      this.setSkinForChannelTabs(this.view.btnNotifCenter);
      this.view.lblPreviewTemplateBody.text=this.populateAlertPreview(this.view.txtNotiCenterMsg.text);
      this.view.lblPreviewTemplateBody.setVisibility(true);
      this.view.flxTemplatePreviewHeader.setVisibility(true);
      this.view.flxPopUpButtons.top="3px";
      this.view.rtxViewer.setVisibility(false);
      this.view.flxPreviewPopup.setVisibility(true);
    }
    else
      this.view.btnNotifCenter.setVisibility(false);
    if(this.view.flxAddEmailTemplate.isVisible===true&&this.view.tbxEmailSubject.text!==""&&this.emailRtxData!==""){
      this.view.lblPreviewSubHeader1.text=this.populateAlertPreview(this.view.tbxEmailSubject.text);
      this.view.flxPreviewPopup.setVisibility(true);
      this.view.btnEmail.setVisibility(true);
      this.view.flxTemplatePreviewHeader.setVisibility(true);
      this.view.flxPopUpButtons.top="3px";
      this.view.lblPreviewTemplateBody.setVisibility(false);
      this.view.rtxViewer.setVisibility(true);
      this.setSkinForChannelTabs(this.view.btnEmail);
      var emailData=this.populateAlertPreview(this.emailRtxData);
      if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = emailData;
      } else {
        if(!document.getElementById("iframe_rtxViewer").newOnload) {
          document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
        }
        document.getElementById("iframe_rtxViewer").onload = function() {
          document.getElementById("iframe_rtxViewer").newOnload();
          document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =emailData;
        };
      }
    }
    else
      this.view.btnEmail.setVisibility(false);
    if(this.view.flxAddPushNotification.isVisible===true&&this.view.txtPushNotification.text!==""&&this.view.tbxPushNotificationTitle.text!==""){
      this.view.lblPreviewSubHeader1.text=this.populateAlertPreview(this.view.tbxPushNotificationTitle.text);  
      this.view.btnPushNoti.setVisibility(true);
      this.setSkinForChannelTabs(this.view.btnPushNoti);
      this.view.lblPreviewTemplateBody.text=this.populateAlertPreview(this.view.txtPushNotification.text);
      this.view.lblPreviewTemplateBody.setVisibility(true);
      this.view.flxTemplatePreviewHeader.setVisibility(true);
      this.view.flxPopUpButtons.top="3px";
      this.view.flxPreviewPopup.setVisibility(true);
      this.view.rtxViewer.setVisibility(false);
    }
    else
      this.view.btnPushNoti.setVisibility(false);
    if(this.view.flxAddSMSTemplate.isVisible===true&&this.view.txtSMSMsg.text!==""){
      this.view.btnSMS.setVisibility(true);
      this.setSkinForChannelTabs(this.view.btnSMS);
      this.view.flxTemplatePreviewHeader.setVisibility(false);
      this.view.flxPopUpButtons.top="70px";
      this.view.lblPreviewTemplateBody.text=this.populateAlertPreview(this.view.txtSMSMsg.text);
      this.view.lblPreviewTemplateBody.setVisibility(true);
      this.view.flxPreviewPopup.setVisibility(true);
      this.view.rtxViewer.setVisibility(false);
    }
    else
      this.view.btnSMS.setVisibility(false);
    if(this.view.flxPreviewPopup.isVisible===false)
      this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmAlertsManagement.NoContentAdded"), this);
    this.view.forceLayout();
  },
  /*
   * create request param for reordering alert groups
   */
  updateSequence : function(){
    var self = this;
    var i;
    var segData = self.view.segSequenceList.data;
    var typeOrder ={};
    var categoryOrder = {};
    var updateParam;
    if(self.reorderAlert === true){
      for(i=0;i< segData.length;i++){
        typeOrder[segData[i].id] = i+1;
      }
      var catDetail = self.view.lblViewDetailsCategoryDisplayName.info.categoryDetails;
      var legalEntity = self.view.lblAlertsHeaderSelLEValue.info.id;
      updateParam ={"typeOrder" : typeOrder,
                    "alertCategoryCode" :catDetail.categoryDefintion.categoryCode,
                    "legalEntityId":legalEntity};
      self.presenter.updateAlertTypeSequence(updateParam);
    }else{
      for(i=0;i< segData.length;i++){
        categoryOrder[segData[i].id] = i+1;
      }
      updateParam ={"categoryOrder" : categoryOrder, "legalEntityId": self.view.lblSelectLegalEntity.info.selectedLEId};
      self.presenter.updateAlertCategorySequence(updateParam);
    }
  },
  /*
  *function to fill edit screen for alert group
  *@param: alert group complete details
  */
  fillAlertGroupScreenForEdit : function(data){
    var self =this;
    self.view.lblAddAlertTypeName.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Edit") +" "+ data.alertTypeDefinition.name;
    self.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Edit").toUpperCase() +
      " "+ data.alertTypeDefinition.name.toUpperCase();
    self.view.dataEntryAddAlertType12.tbxData.text = data.alertTypeDefinition.name;
    self.view.dataEntryAddAlertType11.tbxData.text = data.alertTypeDefinition.alertCode;
    self.view.lstBoxAddAlertType11.selectedKey = data.alertTypeDefinition.alertCode;
    self.view.addAlertTypeStatusSwitch.switchToggle.selectedIndex = data.alertTypeDefinition.typeStatus === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
      0:1;
    self.view.lstBoxAddAlertType11.skin = "lstBxBre1e5edR3pxBgf5f6f8Disable";
    self.view.lstBoxAddAlertType11.setEnabled(false);
    //assign is account level radiobuttons
    var isAccountLevel = data.alertTypeDefinition.isAccountLevel.toLowerCase() === "no" ? false : true;
    var radioAccLevelData = [{"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,
                              "src": isAccountLevel === true ? self.radioDisabled : self.radioNotSelected,
                              "value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                             {"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,
                              "src":isAccountLevel === false ? self.radioDisabled : self.radioNotSelected,
                              "value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
    self.view.radioBtnAddAlertType13.setData(radioAccLevelData);
    self.view.radioBtnAddAlertType13.setEnabled(false);

    //assign frequency
    if(data.alertTypeDefinition.defaultFrequencyId){
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol1.selectedKey = data.alertTypeDefinition.defaultFrequencyId;
      self.displayBasedOnSelectedFrequencyType(self.view.frequencySelectionAlertType);
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol2.selectedKey = data.alertTypeDefinition.defaultFrequencyValue || "SELECT";
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol3.selectedKey = data.alertTypeDefinition.defaultFrequencyValue || "SELECT";
      var formatedFreqTime = data.alertTypeDefinition.defaultFrequencyTime ? self.timeValueObj(data.alertTypeDefinition.defaultFrequencyTime) : "";
      self.view.frequencySelectionAlertType.timePicker.lstbxHours.selectedKey = formatedFreqTime ? formatedFreqTime.hours :"hh";
      self.view.frequencySelectionAlertType.timePicker.lstbxMinutes.selectedKey = formatedFreqTime ? formatedFreqTime.minutes : "mm";
      self.view.frequencySelectionAlertType.timePicker.lstbxAMPM.selectedKey = formatedFreqTime ? formatedFreqTime.meridiem : "AM";
    } else{
      self.view.frequencySelectionAlertType.lstBoxFrequencyCol1.selectedKey = "SELECT";
    }
    //assign channels
    var channelArr = data.alertGroupChannels.map(function(rec){
      return rec.channelId;
    });
    self.setAssignedChannelList(self.view.flxAddAlertTypeChannelCont,channelArr);
    //assign languages
    var langPref = data.displayPreferences;
    self.assignLanguagesSupportedAlertTypes(langPref,2);
    self.view.forceLayout();
  },
  /*
   * selects the apps exsisting for alert 
   * @param : app preferences list of alert 
   */
  selectAppsForEdit : function(appData){
    var selectInd = [];
    var segData = this.view.customListboxAlertApps.segList.data;
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<appData.length;j++){
        if(appData[j].appId === segData[i].id){
          selectInd.push(i);
        } 
      }
    }
    this.view.customListboxAlertApps.segList.selectedRowIndices = [[0,selectInd]];
    if(segData.length === selectInd.length){
      this.view.customListboxAlertApps.imgCheckBox.src = this.checkboxselected;
      this.view.customListboxAlertApps.lblSelectedValue.text = this.sAll;
    }else{
      this.view.customListboxAlertApps.imgCheckBox.src = this.checkboxnormal;
      this.view.customListboxAlertApps.lblSelectedValue.text = selectInd.length+ " " +this.sSelected;
    }
  },
  /*
   * selects the apps exsisting for alert 
   * @param : user preferences list of alert 
   */
  selectUsersForEdit : function(userData){
    var selectInd = [];
    var segData = this.view.customListboxAlertUsertypes.segList.data;
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<userData.length;j++){
        if(userData[j].customerTypeId === segData[i].id){
          selectInd.push(i);
        } 
      }
    }
    this.view.customListboxAlertUsertypes.segList.selectedRowIndices = [[0,selectInd]];
    if(segData.length === selectInd.length){
      this.view.customListboxAlertUsertypes.imgCheckBox.src = this.checkboxselected;
      this.view.customListboxAlertUsertypes.lblSelectedValue.text = this.sAll;
    }else{
      this.view.customListboxAlertUsertypes.imgCheckBox.src = this.checkboxnormal;
      this.view.customListboxAlertUsertypes.lblSelectedValue.text = selectInd.length+ " "+this.sSelected;
    }
  },
  /*
   * selects the accountTypes exsisting for alert 
   * @param : account preferences list of alert 
   */
  selectAccountTypesForEdit : function(accData){
    var selectInd = [];
    var segData = this.view.customListboxAlertAccountTypes.segList.data;
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<accData.length;j++){
        if(accData[j].accountTypeId === segData[i].id){
          selectInd.push(i);
        } 
      }
    }
    this.view.customListboxAlertAccountTypes.segList.selectedRowIndices = [[0,selectInd]];
    if(segData.length === selectInd.length){
      this.view.customListboxAlertAccountTypes.imgCheckBox.src = this.checkboxselected;
      this.view.customListboxAlertAccountTypes.lblSelectedValue.text = this.sAll;
    }else{
      this.view.customListboxAlertAccountTypes.imgCheckBox.src = this.checkboxnormal;
      this.view.customListboxAlertAccountTypes.lblSelectedValue.text = selectInd.length+ " "+this.sSelected;
    }
  },
  /*
   * assigns exsisting languages to supported lang segment
   * @param : language preferences of category/alertgroup, option - 1(category)/2(group)
   */
  assignLanguagesSupportedAlertTypes : function(langData,option){
    var self =this;
    var mapData =[];
    var segmentPath = "";
    if(option === 1) segmentPath= self.view.segEditAlertCategoryLanguages;
    else if(option === 2) segmentPath = self.view.segaddalertTypeLanguages;
    else if(option === 3) segmentPath = self.view.segAddAlertLanguages;
    var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
    var getName = self.getLanguageNameForCode(currLocale);
    mapData = langData.map(function(rec){
      var rowData = self.getLangSegDataMapJson();
      rowData.lblAddAlertTypeSegLanguage.text = self.getLanguageNameForCode(rec.LanguageCode|| rec.languageCode) || self.sLang;
      rowData.lblAddAlertTypeSegLanguage.info.id = rec.LanguageCode|| rec.languageCode;
      rowData.lstBoxSelectLanguage.selectedKey = rec.LanguageCode || rec.languageCode;
      rowData.lblAddAlertTypeSegDisplayName.text = rec.DisplayName || rec.displayName;
      rowData.tbxDisplayName.text = rec.DisplayName || rec.displayName;
      rowData.lblAddAlertTypeSegDescription.text = rec.Description || rec.description;
      rowData.tbxDescription.text = rec.Description || rec.description;
      return rowData;
    });
    var defaultRow,currRow ;
    //set default locale language to first row
    for(var i=0;i< mapData.length;i++){
      if(mapData[i].lblAddAlertTypeSegLanguage.info.id === currLocale){
        currRow = mapData[i];
        mapData[i] = mapData[0];
        mapData[0] = currRow;
        //hide delete btn for first row
        mapData[0].flxDelete.isVisible = false;
        break;
      }
    }
    var checkLocaleExist = this.checkIfCurrentLocaleAvailable(currLocale);
    //hide delete button for first row if not default locale also
    if(mapData.length > 0){
      mapData[0].flxDelete.isVisible = false;
    }
    segmentPath.setData(mapData);
    segmentPath.info = {"segData" : langData};
    if(mapData.length <= 0){
      self.addDefaultRowDataForLangSeg(option);
    } else{
      self.addNewRowAtEnd(null,[0,mapData.length-1], option);
    }
    self.view.forceLayout();
  },
  /*
   * creates request param for create and edit alert group
   * @return: request Param
   */
  createAlertGroupRequestParam :  function(){
    var self = this;
    var lang =  self.view.segaddalertTypeLanguages.data;
    var finalLangList = [];
    for(var k=0;k<lang.length;k++){
      if(lang[k].lblAddAlertTypeSegLanguage.info.id !== ""){
        finalLangList.push(lang[k]);
      }
    }
    var langPrefer = finalLangList.map(function(rec){
      return {
        "languageCode": rec.lblAddAlertTypeSegLanguage.info.id,
        "displayName": rec.lblAddAlertTypeSegDisplayName.text,
        "description": rec.lblAddAlertTypeSegDescription.text
      };
    });
    var reqParam = {
      "legalEntityId": self.view.lblAlertsHeaderSelLEValue.info.id,
      "alertCategoryCode":self.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryCode,
      "alertCode": self.view.lstBoxAddAlertType11.selectedKey,
      "alertName": self.view.dataEntryAddAlertType12.tbxData.text, 
      "statusId": self.view.addAlertTypeStatusSwitch.switchToggle.selectedIndex === 0 ? self.AdminConsoleCommonUtils.constantConfig.ACTIVE : self.AdminConsoleCommonUtils.constantConfig.INACTIVE,
      "isGlobalAlert": self.view.radioBtnAddAlertType21.selectedValue.id === "UA" ? "FALSE":"TRUE",
      "isAccountLevel": self.view.radioBtnAddAlertType13.selectedValue.id === "NO" ? "FALSE":"TRUE",
      "addedDisplayPreferences": langPrefer,
      "removedDisplayPreferences": [],
      "frequency":{
        "id":self.view.frequencySelectionAlertType.lstBoxFrequencyCol1.selectedKey,
        "value": "",
        "time": ""
      },
      "channels": self.getSelectedChannelList(self.view.flxAddAlertTypeChannelCont),
    };
    var freqVal = "";
    if(self.view.frequencySelectionAlertType.flxFrequencyColumn2.isVisible === true){
      freqVal = self.view.frequencySelectionAlertType.lstBoxFrequencyCol2.selectedKey === "SELECT" ? "" : self.view.frequencySelectionAlertType.lstBoxFrequencyCol2.selectedKey;
    } else if(self.view.frequencySelectionAlertType.flxFrequencyColumn3.isVisible === true){
      freqVal = self.view.frequencySelectionAlertType.lstBoxFrequencyCol3.selectedKey === "SELECT" ? "" : self.view.frequencySelectionAlertType.lstBoxFrequencyCol3.selectedKey;
    }
    reqParam.frequency.value = freqVal;
    var timeObj = {"Hours": self.view.frequencySelectionAlertType.timePicker.lstbxHours.selectedKey,
                   "Minutes":self.view.frequencySelectionAlertType.timePicker.lstbxMinutes.selectedKeyValue[1],
                   "Meridiem":self.view.frequencySelectionAlertType.timePicker.lstbxAMPM.selectedKey};
    var formattedTime = self.getFormattedTime(timeObj, "24");
    reqParam.frequency.time = formattedTime;
    return reqParam;
  },
  /*
   * form request param for edit alert group
   * @return: edit request param
   */
  editAlertGroupRequestParam : function(){
    var self =this;
    var initialParam = self.createAlertGroupRequestParam();
    var removedPref = self.getAddedRemovedLangList(2);
    initialParam.removedDisplayPreferences = removedPref.removed;
    var addedLang = removedPref.added.map(self.mapLangDesc);
    initialParam.statusId = self.view.addAlertTypeStatusSwitch.switchToggle.selectedIndex === 0 ?
      self.AdminConsoleCommonUtils.constantConfig.ACTIVE : self.AdminConsoleCommonUtils.constantConfig.INACTIVE;
    initialParam.addedDisplayPreferences = addedLang;
    initialParam.alertCode = self.view.lstBoxAddAlertType11.selectedKey;
    return initialParam;
  },
  /*
   * function to get removed lang list
   * @param: option- 1(category)/2(alert group)
   * @return: removed id's list
   */
  getAddedRemovedLangList : function(option){
    var self = this;
    var segmentPath = "";
    if(option === 1) segmentPath= self.view.segEditAlertCategoryLanguages;
    else if(option === 2) segmentPath = self.view.segaddalertTypeLanguages;
    else if(option === 3) segmentPath = self.view.segAddAlertLanguages;
    var originalList = segmentPath.info.segData;
    var newList = segmentPath.data;
    var orgId = originalList.map(function(rec){
      return rec.LanguageCode;
    });
    var newId = newList.map(function(rec){
      return rec.lblAddAlertTypeSegLanguage.info.id;
    });
    var removed = self.getDiffOfArray(orgId, newId);
    var added = self.getDiffOfArray(newId, orgId);
    var addList = newList.filter(function(rec){
      for(var i=0;i<newId.length;i++){
        if(newId[i] !== "" && newId[i] === rec.lblAddAlertTypeSegLanguage.info.id){
          return rec;
        }
      }

    });
    return {"added":addList,"removed":removed};
  },
  /*
   * call presentation cntrl for create alert group
   */
  createNewAlertGroup : function(){
    var self =this;
    var reqParam = self.createAlertGroupRequestParam();
    self.presenter.createAlertGroup(reqParam);
  },
  /*
   * call presentation cntrl for create alert group
   */
  editAlertGroup : function(){
    var self =this;
    var reqParam = self.editAlertGroupRequestParam();
    var context = self.alertGroupScreenContext;
    self.presenter.editAlertGroup(reqParam,context);
  },
  /*
   * function to change UI widgets based on attributes selection
   * @param : categroy - "attribute" or "criteris"
   */
  changeUIForAttibute : function(category){
    var self =this;
    var criteriaData = self.view.lstBoxAlertAttribute2.info.data;
    self.view.flxAlertAttribute2.setVisibility(true);
    self.view.ValueEntryFrom.setVisibility(true);
    self.view.ValueEntryTo.setVisibility(false);
    self.view.ValueEntryFrom.tbxEnterValue.text="";
    self.view.ValueEntryTo.tbxEnterValue.text="";
    self.view.ValueEntryFrom.tbxEnterValue.placeholder =kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value");
    self.view.ValueEntryFrom.width="100%";
    if(category === "attribute"&&self.view.lstBoxAlertAttribute1.selectedKey!=="none"){
      self.view.lstBoxAlertAttribute2.masterData = criteriaData;
      self.view.flxAlertAttribute2.setVisibility(true);
      self.view.flxAlertAttribute3.setVisibility(true);
    } else if(self.view.lstBoxAlertAttribute1.selectedKey==="none"){
      self.view.flxAlertAttribute2.setVisibility(false);
      self.view.flxAlertAttribute3.setVisibility(false);
    }
    if((self.view.lstBoxAlertAttribute2.selectedKey).indexOf("BETWEEN")>= 0 && category === "criteria"){
      self.view.ValueEntryFrom.tbxEnterValue.placeholder = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_from");
      self.view.ValueEntryFrom.width="45%";
      self.view.ValueEntryFrom.setVisibility(true);
      self.view.ValueEntryTo.setVisibility(true);
    }else{
      self.view.ValueEntryFrom.tbxEnterValue.placeholder = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value");
      self.view.ValueEntryFrom.width="100%";
      self.view.ValueEntryFrom.setVisibility(true);
      self.view.ValueEntryTo.setVisibility(false);
    }
  },
  /*
   * function to get language name value for language code
   *@param : language code
   *@return : language name value
   */
  getLanguageNameForCode : function(code){
    var self =this;
    for(var i=0;i<self.langToShow.length;i++){
      if(code === self.langToShow[i][0]){
        return self.langToShow[i][1];
      }
    }
  },
  /*
  * function to get difference of two sets.
  */
  getDiffOfArray: function (a1, a2) {
    return a1.filter(function(x) {
      if(a2.indexOf(x) >= 0) return false;
      else return true;
    });
  },
  /*
   * create payload for activate/deactivate alert group
   * @param: alertgroup details
   */
  activateDeactivateAlertGroup : function(data){
    var self = this;
    var reqParam = {
      "legalEntityId": data.alertTypeDefinition.legalEntityId,
      "alertCategoryCode":self.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryCode,
      "alertCode": data.alertTypeDefinition.alertCode,
      "alertName": data.alertTypeDefinition.name, 
      "statusId": data.alertTypeDefinition.typeStatus === self.AdminConsoleCommonUtils.constantConfig.ACTIVE ? self.AdminConsoleCommonUtils.constantConfig.INACTIVE : self.AdminConsoleCommonUtils.constantConfig.ACTIVE,
      "isAccountLevel": data.alertTypeDefinition.isAccountLevel.indexOf("yes") >= 0 ? "TRUE":"FALSE",
      "addedDisplayPreferences": [],
      "removedDisplayPreferences": [],
      "frequency":{
        "id":data.alertTypeDefinition.defaultFrequencyId,
        "value": data.alertTypeDefinition.defaultFrequencyValue,
        "time": data.alertTypeDefinition.defaultFrequencyTime
      },
      "channels": "",
    };
    var channelArr = data.alertGroupChannels.map(function(rec){
      return rec.channelId;
    });
    var channelsFormatted = self.defaultChannelList.reduce(function(list,rec){
      if(channelArr.contains(rec.channelID)){
        list[rec.channelID] = true;
      } else{
        list[rec.channelID] = false;
      }
      return list;
    },{});
    reqParam.channels = channelsFormatted;
    self.activateDeactivate = reqParam;
    if(data.alertTypeDefinition.typeStatus === self.AdminConsoleCommonUtils.constantConfig.ACTIVE){
      self.displayDeactivatePopupForAlertType(data.alertTypeDefinition.typeStatus);
    } else{
      self.presenter.editAlertGroup(self.activateDeactivate,self.alertGroupScreenContext);
      self.view.flxDeleteAlert.setVisibility(false);
    }

  },
  /*
  * create categories card UI
  * @param: categories list
  */
  setAlertCategoryCards : function(categories, legalEntityId){
    if(categories && categories.length > 0){
      this.sortBy = this.getObjectSorter("alertcategory_DisplaySequence");
      var sortedData = categories.sort(this.sortBy.sortData);
      this.view.flxAlertCategoryCards.removeAll();
      this.view.flxAlertCategoryCards.setVisibility(true);
      this.view.flxNoAlertCategories.setVisibility(false);
      this.view.flxCategoryHeaderBtns.setVisibility(true);
      var screenWidth = kony.os.deviceInfo().screenWidth;
      var left =20, top =0, width = 0;
      for (var i = 0; i < sortedData.length; i++) {
        width = (screenWidth -305-35-35-20-60)/3;
        var alertCategoryCard = new com.adminConsole.alerts.alertCategoryCard({
          "id": "categoryCard"+i,
          "isVisible": true,
          "width": width + "px",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "top": top+"dp",
          "left": left +"dp"
        }, {}, {});
        left = left + width + 20;
        if(i!== 0 && i%3 === 0){ //new row
          alertCategoryCard.left = "20dp";
          left = 20 + width + 20;
          top = top + 120 + 20;
          alertCategoryCard.top = top +"dp";

        } 
        this.setCategoryCardData(sortedData[i], alertCategoryCard);
      }
    } else{
      this.view.flxAlertCategoryCards.removeAll();
      this.view.flxAlertCategoryCards.setVisibility(false);
      this.view.flxNoAlertCategories.setVisibility(true);
      this.view.flxCategoryHeaderBtns.setVisibility(false);
    }
    //to update viewscreen listbox value after create/edit
    if(legalEntityId){
      var leData =  this.getLEDesc(legalEntityId);
      this.view.lblSelectLegalEntity.text = leData && leData[0] ? leData[0].companyName : "";
      this.view.lblSelectLegalEntity.info.selectedLEId= legalEntityId;
      this.view.lblSelectLegalEntity.info.selectedLEName = leData && leData[0] ? leData[0].companyName : "";
    }
  },
  /*
  * set category data to each cardalertcategory_id
  * category data, card to add
  */
  setCategoryCardData : function(category, alertCategoryCard){
    var self = this;
    alertCategoryCard.lblCategoryName.text = category.alertcategory_Name;
    alertCategoryCard.lblCategoryName.info ={"catId":category.alertcategory_id};
    alertCategoryCard.lblIconStatus.skin = category.alertcategory_status_id === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ? "sknFontIconActivate" :"sknfontIconInactive";
    alertCategoryCard.lblCategoryStatus.text = category.alertcategory_status_id === this.AdminConsoleCommonUtils.constantConfig.ACTIVE ?
      kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    alertCategoryCard.lblGroupsCount.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GROUPS_UC") + " - "+ (category.Groups_count || 0);
    alertCategoryCard.lblAlertsCount.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ALERTS_UC") + " - "+ (category.Alerts_count || 0);
    alertCategoryCard.onClick = function(){
      var LEId = category.alertcategory_companyLegalUnit || self.view.lblSelectLegalEntity.info.selectedLEId;
      self.presenter.fetchCategoryDetails({"AlertCategoryId":category.alertcategory_id,
                                           "legalEntityId":LEId});
    };
    this.view.flxAlertCategoryCards.add(alertCategoryCard);
    this.view.forceLayout();
  },
  /*
  * reset the add category screen fields
  */
  clearAddCategoryScreen : function(){
    this.view.flxAlertsSelectedLEVal.setVisibility(false);
    this.view.flxEditCategoryCol02.setVisibility(!this.isSingleEntity);
    this.view.lblEditAlertCategoryName.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddCategory_LC");
    this.view.textBoxEntryCategoryName.tbxEnterValue.text ="";
    this.view.editAlertCategoryStatusSwitch.switchToggle.selectedIndex = 0;
    this.toggleBreadcrumbButtons("category");
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddCategory_UC");
    this.view.editAlertCategoryStatusSwitch.switchToggle.selectedIndex = 0;
    var radioData = [{"selectedImg":this.radioSelected,"unselectedImg":this.radioNotSelected,"src":this.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                     {"selectedImg":this.radioSelected,"unselectedImg":this.radioNotSelected,"src":this.radioSelected,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
    this.view.customCategoryRadioButtonType.setData(radioData);
    this.view.flxEditCategoryCol11.setEnabled(true);
    this.view.flxEditCategorySelectedLE.setEnabled(true);
    this.view.flxEditCategorySelectedLE.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.flxEditCategorySelectedLE.hoverSkin = "sknFlxSegRowHover11abeb";
    this.addDefaultRowDataForLangSeg(1);
    
    this.setAddLeDropdownData();
    this.createDefaultChannels(this.defaultChannelList, this.view.flxSupportedChannelEntries,"alertCatChannel");
    this.view.EditAlertCategoryButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddCategory_UC");
    this.view.EditAlertCategoryButtons.btnSave.width = "158dp";
    this.clearFrequencytoDefaults(this.view.frequencySelectionCat);
    this.clearValidationsForAddCategory();
    this.view.forceLayout();
  },
  /*
  * clear the frequency to default values
  * @param: frequency component path 
  */
  clearFrequencytoDefaults : function(frequencySelctionPath){
    frequencySelctionPath.lstBoxFrequencyCol1.selectedKey = "SELECT";
    frequencySelctionPath.lstBoxFrequencyCol2.selectedKey = "SELECT";
    frequencySelctionPath.lstBoxFrequencyCol3.selectedKey = "SELECT";
    frequencySelctionPath.timePicker.lstbxHours.selectedKey = "hh";
    frequencySelctionPath.timePicker.lstbxMinutes.selectedKey = "mm";
    frequencySelctionPath.timePicker.lstbxAMPM.selectedKey = "AM";
    frequencySelctionPath.lstBoxFrequencyCol1.skin = "sknLbxborderd7d9e03pxradius";
    frequencySelctionPath.lstBoxFrequencyCol2.skin = "sknLbxborderd7d9e03pxradius";
    frequencySelctionPath.lstBoxFrequencyCol3.skin = "sknLbxborderd7d9e03pxradius";
    frequencySelctionPath.flxFrequencyTime.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    frequencySelctionPath.flxInlineError1.setVisibility(false);
    frequencySelctionPath.flxInlineError2.setVisibility(false);
    frequencySelctionPath.flxInlineError3.setVisibility(false);
    frequencySelctionPath.flxInlineError4.setVisibility(false);
    frequencySelctionPath.flxFrequencyColumn2.setVisibility(false);
    frequencySelctionPath.flxFrequencyColumn3.setVisibility(false);
    frequencySelctionPath.flxFrequencyColumn4.setVisibility(false);
    this.view.forceLayout();
  },
  /*
  * show/hide other selection listbox based on selected frequency type
  * frequency selection component path
  */
  displayBasedOnSelectedFrequencyType : function(frequencySelctionPath){
    frequencySelctionPath.lstBoxFrequencyCol2.selectedKey = "SELECT";
    frequencySelctionPath.lstBoxFrequencyCol3.selectedKey = "SELECT";
    frequencySelctionPath.timePicker.lstbxHours.selectedKey = "hh";
    frequencySelctionPath.timePicker.lstbxMinutes.selectedKey = "mm";
    frequencySelctionPath.timePicker.lstbxAMPM.selectedKey = "AM";
    if(frequencySelctionPath.lstBoxFrequencyCol1.selectedKey === "SELECT" || frequencySelctionPath.lstBoxFrequencyCol1.selectedKey === "none"){
      frequencySelctionPath.flxFrequencyColumn2.setVisibility(false);
      frequencySelctionPath.flxFrequencyColumn3.setVisibility(false);
      frequencySelctionPath.flxFrequencyColumn4.setVisibility(false);
    } 
    else if(frequencySelctionPath.lstBoxFrequencyCol1.selectedKey === "MONTHLY"){
      frequencySelctionPath.flxFrequencyColumn2.setVisibility(true);
      frequencySelctionPath.flxFrequencyColumn3.setVisibility(false);
      frequencySelctionPath.flxFrequencyColumn4.setVisibility(true);
    } 
    else if(frequencySelctionPath.lstBoxFrequencyCol1.selectedKey === "WEEKLY"){
      frequencySelctionPath.flxFrequencyColumn2.setVisibility(false);
      frequencySelctionPath.flxFrequencyColumn3.setVisibility(true);
      frequencySelctionPath.flxFrequencyColumn4.setVisibility(true);
    } 
    else if(frequencySelctionPath.lstBoxFrequencyCol1.selectedKey === "DAILY"){
      frequencySelctionPath.flxFrequencyColumn2.setVisibility(false);
      frequencySelctionPath.flxFrequencyColumn3.setVisibility(false);
      frequencySelctionPath.flxFrequencyColumn4.setVisibility(true);
    }
  },
  /*
  * show confirmation poup on add category
  */
  showAddCategoryConfirmationPopup : function(){
    var self = this;
    var status = this.view.editAlertCategoryStatusSwitch.switchToggle.selectedIndex;
    this.view.flxDeleteAlert.setVisibility(true);
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddCategory_LC");
    if(status === 0){
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddActiveCategoryPopupMessage");
    } else{
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddDeactiveCategoryPopupMessage");
    }
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.permission.CANCEL");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddCategory_UC");
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
      self.addEditAlertCategory();
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  /*
  * show confirmation poup on add category
  */
  showAddGroupConfirmationPopup : function(){
    var self = this;
    var status = this.view.addAlertTypeStatusSwitch.switchToggle.selectedIndex;
    this.view.flxDeleteAlert.setVisibility(true);
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlertGroup");
    if(status === 0){
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddActiveGroupPopupMsg");
    } else{
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddDeactiveGroupPopupMsg");
    }
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.permission.CANCEL");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddGroup_UC");
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
      self.createNewAlertGroup();
      self.hideAddAlertGroupScreen();
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  /*
  * groups alerts under same alert group
  * @param: alerts list
  * @return: grouped alerts
  */
  groupAlertsBasedOnAlertGroup : function(alerts){
    var groupedList = alerts.reduce(function(group, alert) {
      (group[alert.groupId] = group[alert.groupId] || []).push(alert);
      return group;
    }, {});
    return groupedList;
  },
  showAddSubAlertScreen :  function(groupData){
    var self=this;
    this.clearValidationsForAddSubAlert();
    this.clearFrequencytoDefaults(this.view.AlertFrequencySelectionCat);
    this.clearTypesToDefault();
    this.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey = "none";

    this.createDefaultChannels(this.defaultChannelList, this.view.flxAlertSupportedChannelEntries,"alertChannel");
    this.alertGroupCurrAction=this.alertGroupActionConfig.CREATE;
    this.view.addAlertStatusSwitch.switchToggle.selectedIndex= 0;
    this.view.lblAddAlertName.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlert");
    
    this.view.lblSelectedRowsServType.text="Select a code";
    this.view.flxDropDownDetailServType.setVisibility(false);
    this.view.lstBoxAlertAttribute1.selectedKey="none";
    this.view.addAlertButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlert").toUpperCase();
    this.view.flxAlertAttribute2.setVisibility(false);
    this.view.flxAlertAttribute3.setVisibility(false);
    this.view.dataEntrySubAlertName.tbxData.text="";
    this.view.ValueEntryFrom.tbxEnterValue.text="";
    this.view.ValueEntryTo.tbxEnterValue.text="";
    this.view.flxAlertCategories.setVisibility(false);
    this.view.flxAlertTypes.setVisibility(false);
    this.view.flxSubAlerts.setVisibility(true);
    this.view.flxViewSubAlert.setVisibility(false);
    this.view.flxAddAlertScreen.setVisibility(true)
    this.view.lstBoxAddAlertCode.setEnabled(true);
    this.view.flxColumnServType.setEnabled(true);
	this.view.breadcrumbs.btnPreviousPage.text = this.view.lblViewDetailsCategoryDisplayName.text.toUpperCase();
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddNewAlert");
    this.toggleBreadcrumbButtons("subalert");
    this.view.flxAlertConfiguration.setContentOffset({y:0,x:0});
    this.view.flxAlertsSelectedLEVal.setVisibility(false);
    this.view.flxAddAlertSelLEVal.setVisibility(!this.isSingleEntity);
    var alertCategory = this.view.breadcrumbs.btnPreviousPage.info? this.view.breadcrumbs.btnPreviousPage.info.id:this.categoryTypeConfig.ACCOUNTS;
    var isaccountlevel="no";
    //set currency symbol based on the LE
    var currLEData = this.getLEDesc(this.view.lblSelectLegalEntity.info.selectedLEId);
    this.currencyValue =  this.defaultCurrencyCode(currLEData[0].baseCurrency,true);
    this.view.ValueEntryTo.lblCurrencySymbol.text=this.currencyValue;
    this.view.ValueEntryFrom.lblCurrencySymbol.text=this.currencyValue;
    
    if(groupData){
      isaccountlevel= groupData.isAccountLevel;  
    } else if(this.view.lblViewDetailsAlertDisplayName.info){
      var groupDetails= this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition;
      isaccountlevel= groupDetails.isAccountLevel;
    } 
    var alertTypeRadioData = [{"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":isaccountlevel === "yes"? self.radioNotSelected  :self.radioSelected ,"value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.GlobalAlert"),"id":"GA"},
                              {"selectedImg":isaccountlevel === "yes" ? self.radioDisabled :self.radioSelected,"unselectedImg":self.radioNotSelected,"src":isaccountlevel === "yes" ? self.radioDisabled :self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.frmAlertsManagement.UserAlert"),"id":"UA"},];
    self.view.customRadioButtonAlertType.setData(alertTypeRadioData);
    
    
    // disabling the alerts in sublevel alert
    if(isaccountlevel=== "yes"){
      self.view.customRadioButtonAlertType.selectedValue = {id : "UA"};
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(true);
      self.view.lblAutoSubTxt.setVisibility(false);
      
      self.view.customRadioButtonAlertType.setEnabled(false);
    }else{

      // by default setting to global alert as per invisions
      self.view.lblAutoSubTxt.setVisibility(true);
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(false);
      self.view.customRadioButtonAlertType.setEnabled(true);
    }
     // when alert is user level than we show popup
     self.view.customRadioButtonAlertType.imgRadioButton1.onClick = function(){
      
      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(false);
      self.view.lblAutoSubTxt.setVisibility(true);
      self.view.customRadioButtonAlertType.radioButtonOnClick(self.view.customRadioButtonAlertType.imgRadioButton1);
    };
    self.view.customRadioButtonAlertType.imgRadioButton2.onClick = function(){

      self.view.customRadioButtonAlertTypeAutoSubscribe.setVisibility(true);
      self.view.lblAutoSubTxt.setVisibility(false);
      self.view.customRadioButtonAlertType.radioButtonOnClick(self.view.customRadioButtonAlertType.imgRadioButton2);
    };
    
    var alertTypeAutoRadioData = [{"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                                {"selectedImg":self.radioSelected,"unselectedImg":self.radioNotSelected,"src":self.radioSelected,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
    
    self.view.customRadioButtonAlertTypeAutoSubscribe.setData(alertTypeAutoRadioData);

    var alertAcountRadioData = [{"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":isaccountlevel==="no"?self.radioNotSelected: self.radioDisabled,"value":kony.i18n.getLocalizedString("i18n.common.yes"),"id":"YES"},
                                {"selectedImg":self.radioDisabled,"unselectedImg":self.radioNotSelected,"src":isaccountlevel==="no"?self.radioDisabled: self.radioNotSelected,"value":kony.i18n.getLocalizedString("i18n.common.no"),"id":"NO"},];
    self.view.customRadioButtonAccountLevel.setData(alertAcountRadioData);
    self.view.customRadioButtonAccountLevel.setEnabled(false);
    //account level alert specific changes
    if(isaccountlevel === "yes"){
      self.view.flxAddAlertAccountTypes.setVisibility(true);
      self.filterRecipientsForAccLevel(false);
    } else{
      self.view.flxAddAlertAccountTypes.setVisibility(false);
      self.filterRecipientsForAccLevel(true);
    }
    self.addDefaultRowDataForLangSeg(3);
    this.view.lblAddAlertSelLEVal.text = this.view.lblSelectLegalEntity.info.selectedLEName;
    this.view.forceLayout();
  },
  clearValidationsForAddSubAlert : function(cat,skinWidPath,visWidPath){
    var self=this;
    if(cat === 1){ //textbox
      skinWidPath.skin = "skntbxLato35475f14px";
      if(visWidPath) visWidPath.setVisibility(false);
    } else if(cat === 2){ //listbox
      skinWidPath.skin = "sknLbxborderd7d9e03pxradius";
      if(visWidPath) visWidPath.setVisibility(false);
    } else if(cat === 3){ //flex
      skinWidPath.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      if(visWidPath) visWidPath.setVisibility(false);
    } else{ //clear all
      self.view.dataEntrySubAlertName.tbxData.skin = "skntbxLato35475f14px";
      self.view.lstBoxAddAlertCode.skin = "sknLbxborderd7d9e03pxradius";
      self.view.flxDropDownServType.skin = "sknflxffffffoptemplateop3px";
      self.view.lstBoxRecipients.skin = "sknLbxborderd7d9e03pxradius";
      self.view.customListboxAlertApps.flxSelectedText.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.customListboxAlertUsertypes.flxSelectedText.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.customListboxAlertAccountTypes.flxSelectedText.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.ValueEntryFrom.tbxEnterValue.skin = "sknTbxBgFFFFFFf485c7513pxNoBorder";
      self.view.ValueEntryTo.tbxEnterValue.skin = "sknTbxBgFFFFFFf485c7513pxNoBorder";
      self.view.ValueEntryFrom.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.ValueEntryTo.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";

      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.skin = "sknLbxborderd7d9e03pxradius";
      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol2.skin = "sknLbxborderd7d9e03pxradius";
      self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol3.skin = "sknLbxborderd7d9e03pxradius";
      self.view.AlertFrequencySelectionCat.flxFrequencyTime.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.lstBoxAlertAttribute1.skin = "sknLbxborderd7d9e03pxradius";
      self.view.lstBoxAlertAttribute2.skin = "sknLbxborderd7d9e03pxradius";

      self.view.flxSubAlertNameAvailable.setVisibility(false);
      self.view.dataEntrySubAlertName.flxError.setVisibility(false);
      self.view.flxAddAlertCodeError.setVisibility(false);
      self.view.flxRadioGroupErrorAlertLevel.setVisibility(false);
      self.view.flxRadioGroupErrorAlertType.setVisibility(false);
      self.view.flxAddAlertErrorRecipient.setVisibility(false);
      self.view.customListboxAlertApps.flxListboxError.setVisibility(false);
      self.view.flxAddAlertErrorAccounts.setVisibility(false);
      self.view.customListboxAlertUsertypes.flxListboxError.setVisibility(false);
      self.view.AlertFrequencySelectionCat.flxInlineError1.setVisibility(false);
      self.view.AlertFrequencySelectionCat.flxInlineError2.setVisibility(false);
      self.view.AlertFrequencySelectionCat.flxInlineError3.setVisibility(false);
      self.view.AlertFrequencySelectionCat.flxInlineError4.setVisibility(false);
      self.view.flxAttributeError1.setVisibility(false);
      self.view.flxAttributeError2.setVisibility(false);
      self.view.flxAttributeError3.setVisibility(false);
      self.view.flxAlertChannelError.setVisibility(false);
      self.view.flxAddAlertLanguagesError.setVisibility(false);
    }
    self.view.flxColumnServType.setVisibility(true);
    self.view.forceLayout();
  },
  /*
  * create sentence for frequency values
  * @param: {"type":"","value":"","time":""}
  * @return: frequency string
  */
  getFrequencyText : function(frequencyObj){
    var freqString = "";
    if(frequencyObj.type){
      var minutesVal = frequencyObj.time.minutes < 10 ? "0"+frequencyObj.time.minutes : frequencyObj.time.minutes;
      if(frequencyObj.type.indexOf("MONTHLY") >=0){
        freqString = frequencyObj.value.toLowerCase() +kony.i18n.getLocalizedString("i18n.frmAlertsManagement.frequencyStringMonth")+ frequencyObj.time.hours+":"+
          minutesVal+" "+ frequencyObj.time.meridiem;
      } else if(frequencyObj.type.indexOf("WEEKLY") >=0){
        freqString =  "Every "+ frequencyObj.value.charAt(0)+ frequencyObj.value.slice(1).toLowerCase() +" at "+frequencyObj.time.hours+":"+
          minutesVal+" "+ frequencyObj.time.meridiem;
      } else if(frequencyObj.type.indexOf("DAILY") >=0){
        freqString = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.frequencyStringDay")+ frequencyObj.time.hours+":"+
          minutesVal+" "+ frequencyObj.time.meridiem;
      } else if(frequencyObj.type.indexOf("NONE") >=0){
        freqString = "None";
      }
    } else{
      freqString = kony.i18n.getLocalizedString("i18n.common.NA");
    }
    return freqString;
  },
  /*
  * get the channel name for the given id
  * @param: channel id
  * @return: channel name
  */
  getChannelNameFromId : function(channelId){
    var channelName = "";
    for(var i=0;i< this.defaultChannelList.length;i++){
      if(this.defaultChannelList[i].channelID === channelId){
        channelName = this.defaultChannelList[i].channelDisplayName;
        break;
      }
    }
    return channelName;
  },
  /*
  * hide contextual menu on scroll 
  */
  hideContextualMenuOnScroll : function(){
    if(this.view.flxAlertTypesContextualMenu.isVisible === true){
      this.view.flxAlertTypesContextualMenu.setVisibility(false);
      this.view.flxOptions.skin = "slFbox";
      this.setOptionsVisibility("flxSelectOptions");
    } else if(this.view.flxCategoryOptionsMenu.isVisible === true){
      this.view.flxCategoryOptionsMenu.setVisibility(false);
      this.view.flxCategoryOptions.skin = "slFbox";
      this.view.flxGroupsListContextualMenu.setVisibility(false);
    } else if(this.view.flxGroupsListContextualMenu.isVisible === true){
      this.view.flxGroupsListContextualMenu.setVisibility(false);
      this.setOptionsVisibility("flxGroupsListContextualMenu");
    } else if(this.view.flxSubAlertsStatusFilter.isVisible === true){
      this.view.flxSubAlertsStatusFilter.setVisibility(false);
    }
  },
  /*
  * show contextual menu for alert groups list in category detail screen
  * @param: clicked alertgroup card
  */
  onClickAlertGroupOptions : function(alertGroupCard){
    if (this.view.flxGroupsListContextualMenu.isVisible === false) {
      alertGroupCard.flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
      this.view.flxGroupsListContextualMenu.setVisibility(true);
      this.view.flxGroupsListContextualMenu.info = {"rowName":alertGroupCard.id };
      this.view.forceLayout();
      var finalHeight = alertGroupCard.frame.y + 45;
      this.updateContextualMenu(alertGroupCard.info.alertGroupDetail);
      var scrollWidget = this.view.flxAlertConfiguration;
      var contextualWidget =this.view.flxGroupsListContextualMenu;
      if (finalHeight + contextualWidget.frame.height > scrollWidget.contentOffsetMeasured.y){
        finalHeight = finalHeight - contextualWidget.frame.height - (25);
        this.view.contextualMenuAlertTypeList.flxUpArrowImage.setVisibility(false);
        this.view.contextualMenuAlertTypeList.flxDownArrowImage.setVisibility(true);
        this.view.contextualMenuAlertTypeList.contextualMenu1Inner.top = "0px";
      }
      else{
        this.view.contextualMenuAlertTypeList.flxUpArrowImage.setVisibility(true);
        this.view.contextualMenuAlertTypeList.flxDownArrowImage.setVisibility(false);
        this.view.contextualMenuAlertTypeList.contextualMenu1Inner.top = "-1px";
      }
      contextualWidget.top= finalHeight + "px";
      contextualWidget.setVisibility(true);
      this.view.flxGroupsListContextualMenu.onHover = this.onHoverEventCallback;

    } else {
      alertGroupCard.flxOptions.skin = "slFbox";
      this.view.flxGroupsListContextualMenu.setVisibility(false);
    }
  },
  /*
  * show re-assign alert group popup
  * @param: categories list
  */
  showReassignPopup : function(list){
    this.view.flxReassignGroupError.setVisibility(false);
    this.view.lstBoxReassignGroup.skin = "sknLbxborderd7d9e03pxradius";
    if(list && list.length > 0){ //show reassign popup
      var catgoryList = list.reduce(
        function (arr, record) {
          return arr.concat([[record.id, record.Name]]);
        }, [["SELECT", kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectACategory")]]);
      this.view.lstBoxReassignGroup.masterData = catgoryList;
      this.view.lstBoxReassignGroup.selectedKey = "SELECT";
      this.view.flxReassignGroupPopup.setVisibility(true);
    } else{ //show error popup
      this.view.popupError.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.reassignGroup");
      this.view.popupError.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.reassignGroupMsg");
      this.view.flxErrorPopup.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
  * reassign alert group to another category
  */
  reassignAlertGroup : function(){
    var currentCategory = this.view.lblViewDetailsCategoryDisplayName.info.categoryDetails.categoryDefintion.categoryCode;
    var newCategory = this.view.lstBoxReassignGroup.selectedKey;
    var alertGroupCode ="",LEId = "";
    if(this.alertGroupScreenContext === 1){
      var selectedRowName = this.view.flxGroupsListContextualMenu.info.rowName;
      var selectedGroup = this.view[selectedRowName].info.alertGroupDetail;
      alertGroupCode = selectedGroup.code;
      LEId = selectedGroup.legalEntityId;
    }else{
      alertGroupCode =  this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition.alertCode;
      LEId = this.view.lblAlertsHeaderSelLEValue.info.id;
    }
    var inputParam = {"alertCode" : alertGroupCode,
                      "fromAlertyCategory" : currentCategory,
                      "toAlertCategory": newCategory,
                      "legalEntityId": LEId
                     };
    this.presenter.reassignAlertType(inputParam);
  },
  /*
  * validation for reassign group to another category
  * @return: isValid - true/false
  */
  validateReassignGroup : function(){
    var isValid = true;
    var selectedCat = this.view.lstBoxReassignGroup.selectedKey;
    if(selectedCat === "SELECT"){
      isValid = false;
      this.view.flxReassignGroupError.setVisibility(true);
      this.view.lstBoxReassignGroup.skin = "sknLstBoxeb3017Bor3px";
      this.view.lblReassignErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectACategory");
    }
    return isValid;
  },
  generateSubAlertJSON : function(){
    var self=this;
    var frequency={};
    var alertName=this.view.dataEntrySubAlertName.tbxData.text;
    var alertCode= "", externalsystem="";
    var selectedInd=this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex?this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowIndex[1]:null;
    
    if(selectedInd!==undefined&&selectedInd!==null)
    {
      alertCode = this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].customerStatusId;
      if(this.view.lblSelectedRowsServType.text==="Select a code"){
        alertCode='';
      }
      externalsystem= this.view.AdvancedSearchDropDownServType.sgmentData.data[selectedInd].externalsystem;
    }
    
    var arrAppTypes=this.view.customListboxAlertApps.segList.selectedItems;
    var arrUserTypes= this.view.customListboxAlertUsertypes.segList.selectedItems;
    var arrAccountTypes=this.view.flxAddAlertAccountTypes.isVisible?this.view.customListboxAlertAccountTypes.segList.selectedItems:[];
    var alertTypeCode=this.view.breadcrumbs.btnPreviousPage1.info.id;
    var lang =  self.view.segAddAlertLanguages.data;
    var finalLangList = [];
    for(var k=0;k<lang.length;k++){
      if(lang[k].lblAddAlertTypeSegLanguage.info.id !== ""){
        finalLangList.push(lang[k]);
      }
    }
    var langPrefer = finalLangList.map(function(rec){
      return {
        "languageCode": rec.lblAddAlertTypeSegLanguage.info.id,
        "displayName": rec.lblAddAlertTypeSegDisplayName.text,
        "description": rec.lblAddAlertTypeSegDescription.text
      };
    });
    var requestParam={
      "legalEntityId": self.view.lblAlertsHeaderSelLEValue.info.id, 
      "recipientTypePreference": self.view.lstBoxRecipients.selectedKey,
      "alertTypeCode": alertTypeCode,
      'isAutoSubscribeEnabled':self.view.customRadioButtonAlertTypeAutoSubscribe.selectedValue.value.toLowerCase() === 'yes' ? 'true' : 'false',
      "name": alertName,
      "code": alertCode,
      "externalsystem" : externalsystem, 
      "addedTemplates": [],
      "removedTemplates": [],
      "frequency": {
        "id": self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey==="none"?"":self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey,
        "value": "",
        "time": ""
      },
      "channels": self.getSelectedChannelList(self.view.flxAlertSupportedChannelEntries),
      "statusId": self.view.addAlertStatusSwitch.switchToggle.selectedIndex=== 0 ?
      self.AdminConsoleCommonUtils.constantConfig.ACTIVE : self.AdminConsoleCommonUtils.constantConfig.INACTIVE,
      "isGlobalAlert": self.view.customRadioButtonAlertType.selectedValue.id === "UA" ? "FALSE":"TRUE",
      "isAccountLevel": self.view.customRadioButtonAccountLevel.selectedValue.id === "NO" ? "FALSE":"TRUE",
      "attributeId": self.view.lstBoxAlertAttribute1.selectedKey==="none"?"": self.view.lstBoxAlertAttribute1.selectedKey,
      "conditionId": self.view.flxAlertAttribute2.isVisible?self.view.lstBoxAlertAttribute2.selectedKey:"",
      "value1": self.view.ValueEntryFrom.isVisible?self.view.ValueEntryFrom.tbxEnterValue.text:"",
      "value2": self.view.ValueEntryTo.tbxEnterValue.text,
      "accountTypePreference": arrAccountTypes.length!==0?self.getSelectedTypesJSON(arrAccountTypes, self.view.customListboxAlertAccountTypes):{},
      "appPreferences": self.getSelectedTypesJSON(arrAppTypes,self.view.customListboxAlertApps),
      "userTypePreferences": self.getSelectedTypesJSON(arrUserTypes, self.view.customListboxAlertUsertypes),
      "addedDisplayPreferences": langPrefer,
      "removedDisplayPreferences": []
    }
    var freqVal = "";
    if(self.view.AlertFrequencySelectionCat.flxFrequencyColumn2.isVisible === true){
      freqVal = self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol2.selectedKey === "SELECT" ? "" : self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol2.selectedKey;
    } else if(self.view.AlertFrequencySelectionCat.flxFrequencyColumn3.isVisible === true){
      freqVal = self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol3.selectedKey === "SELECT" ? "" : self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol3.selectedKey;
    }
    if(self.view.AlertFrequencySelectionCat.lstBoxFrequencyCol1.selectedKey!=="none"){
      requestParam.frequency.value = freqVal;
      var timeObj = {"Hours": self.view.AlertFrequencySelectionCat.timePicker.lstbxHours.selectedKey,
                     "Minutes":self.view.AlertFrequencySelectionCat.timePicker.lstbxMinutes.selectedKeyValue[1],
                     "Meridiem":self.view.AlertFrequencySelectionCat.timePicker.lstbxAMPM.selectedKey};
      var formattedTime = self.getFormattedTime(timeObj, "24");
      requestParam.frequency.time = formattedTime;
    }
    return requestParam;
  },
  getSelectedTypesJSON : function(arrTypes,widgetPath){
    var typesJSON={};
    var segData= widgetPath.segList.data;
//     for(var i=0;i<arrTypes.length;i++){
//       typesJSON[arrTypes[i].id]=true;
//     }
    var selAppList = widgetPath.segList.selectedIndices[0][1];
    for(var i=0;i<segData.length;i++){
      if(selAppList.contains(i)){
        typesJSON[segData[i].id] = true;
      }else{
        typesJSON[segData[i].id] = false;
      }
    }
    return typesJSON;
  },
  validateAttributes: function(){
    var isValid=true;
    var enteredFromVal=this.view.ValueEntryFrom.tbxEnterValue.text.trim();
    var enteredToVal=this.view.ValueEntryTo.tbxEnterValue.text.trim();
    if(this.view.flxAlertAttribute2.isVisible&&(enteredFromVal===""|| (this.view.ValueEntryTo.isVisible&&enteredToVal===""))){
      this.view.ValueEntryFrom.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.ValueEntryTo.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      if(this.view.ValueEntryTo.isVisible&&enteredToVal===""&& enteredFromVal===""){
        this.view.lblErrorText3.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ValuesEmpty");
      }else if(enteredFromVal===""){
        this.view.ValueEntryFrom.flxValueTextBox.skin="sknRedBorder";
        this.view.lblErrorText3.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.FromValEmpty");
      }else if(this.view.ValueEntryTo.isVisible&&enteredToVal===""){
        this.view.ValueEntryTo.flxValueTextBox.skin="sknRedBorder";
        this.view.lblErrorText3.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ToValEmpty");
      }
      isValid=false;
    }else if(this.view.ValueEntryTo.isVisible&&parseInt(enteredFromVal)>=parseInt(enteredToVal)){
      this.view.ValueEntryFrom.flxValueTextBox.skin="sknRedBorder";
      this.view.ValueEntryTo.flxValueTextBox.skin="sknRedBorder";
      this.view.lblErrorText3.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.ToLessThanFrom");
      isValid=false;
    }
    return isValid;
  },
  generateEditAlertJSON: function(){
    var editRequestParam= this.generateSubAlertJSON();
    var removedPref = this.getAddedRemovedLangList(3);
    editRequestParam.removedDisplayPreferences = removedPref.removed;
    this.createEditAlert(editRequestParam,this.subAlertScreenView);    
  },
  setAlertCodesData: function(alertCodes){
    var alertCodeList=[["Select","Select a code"]];
    for(var i=0;i<alertCodes.length;i++){
      alertCodeList.push([alertCodes[i].id,alertCodes[i].id]);
    }
    this.view.lstBoxAddAlertCode.masterData=alertCodeList;
  },
  isNotInternalAlertSys :function( externalSystem){ 
    return externalSystem && externalSystem !=='0' ;
  },
  getExternalSystemTxt : function( externalSystem, skin){
    if(!externalSystem){return ''}
    if(skin){

      let externJsonSkn ={
        '0' : '',
        '1' : 'sknbtnffffffLatoRegular12PxA94240',
        '2' : 'sknbtnffffffLatoRegular12Px485c75',
        '3' : 'sknbtnffffffLatoRegular12Px2B80CA'
      };
  
      return externJsonSkn[externalSystem];
    }else{
      let externJson ={
        '0' : 'User Internal',
        '1' : 'Transact',
        '2' : 'External',
        '3' : 'Wealth FO'
      };
      return externJson[externalSystem];
    }
  },
  setServiceTypeStatusData : function(records){
    this.view.lblSelectedRowsServType.text="Select a code";
    var statusData=[];
    var widgetMap = {
      "customerStatusId": "customerStatusId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "btnExt":"btnExt",
      "lblDescription": "lblDescription"
    };
    var scopeObj = this;
    var statusData = records.map(function(rec){     
      return {
        "customerStatusId": rec.id,
        "flxSearchDropDown": "flxSearchDropDown",
        "btnExt" : { "isVisible" : scopeObj.isNotInternalAlertSys(rec.externalSystem) ,
                     'text': scopeObj.getExternalSystemTxt(rec.externalSystem),
                     'skin': scopeObj.getExternalSystemTxt(rec.externalSystem, true)},
        "externalsystem":rec.externalSystem,
        "flxCheckBox": {"isVisible":false},
        // trimming the text because the alert code is a continuos text and label doesn't split the text into multiple lines 
        "lblDescription":{"text":scopeObj.AdminConsoleCommonUtils.getTruncatedString(rec.id, 42, 39), 
                "tooltip": rec.id,
                "info": {
                    "code": rec.id
                },
                'width':scopeObj.isNotInternalAlertSys(rec.externalSystem)  ? "70%" : "95%"} 
      };
    });
    this.view.AdvancedSearchDropDownServType.sgmentData.widgetDataMap = widgetMap;
    this.view.AdvancedSearchDropDownServType.sgmentData.setData(statusData);
    this.view.AdvancedSearchDropDownServType.sgmentData.info={"data":statusData};
    this.view.AdvancedSearchDropDownServType.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    this.view.forceLayout();
  },
  //To set  user types, app types and account types to defaults for create page
  clearTypesToDefault : function(){
    var appTypesData=this.view.customListboxAlertApps.segList.info.data;
    var userTypesData= this.view.customListboxAlertUsertypes.segList.info.data;
    var accountTypesData=this.view.flxAddAlertAccountTypes.isVisible?this.view.customListboxAlertAccountTypes.segList.info.data:[];
    if(appTypesData.length!==0){
      this.setAppsUsersData(appTypesData, "apps");
    }
    if(userTypesData.length!==0){
      this.setAppsUsersData(userTypesData, "users");
    }
    if(accountTypesData.length!==0){
      this.setAccountTypes(accountTypesData.accounttype);
    }
    
  },
  showAddAlertConfirmationPopup : function(){
    var self = this;
    var status = this.view.addAlertStatusSwitch.switchToggle.selectedIndex;
    this.view.flxDeleteAlert.setVisibility(true);
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlert");
    if(status === 0){
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.addActiveAlertMsg");
    } else{
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.addInactiveAlertMsg")
    }
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.AddAlert").toUpperCase();
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
      self.createEditAlert(self.generateSubAlertJSON());
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      self.view.flxDeleteAlert.setVisibility(false);
    };
  },
  getDefaultAlertRequest : function(){
    var subAlertData= this.subAlertData;
    var alertTypeCode=this.view.lblViewDetailsAlertDisplayName.info && this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails ?this.view.lblViewDetailsAlertDisplayName.info.alertGroupDetails.alertTypeDefinition.alertCode: this.view.breadcrumbs.btnPreviousPage1.info.id;
    var requestParam={
      "legalEntityId": subAlertData.subAlertDefinition.legalEntityId,
      "recipientTypePreference":subAlertData.subAlertDefinition.recipientType,
      "alertTypeCode": alertTypeCode,
      "name": subAlertData.subAlertDefinition.name,
      "code": subAlertData.subAlertDefinition.code,
      "addedTemplates": [],
      "removedTemplates": [],
      "frequency": {
        "id": subAlertData.subAlertDefinition.defaultFrequencyId,
        "value": subAlertData.subAlertDefinition.defaultFrequencyValue,
        "time": subAlertData.subAlertDefinition.defaultFrequencyTime
      },
      "channels": subAlertData.alertsubtypeChannels,
      "statusId": subAlertData.subAlertDefinition.status,
      "isGlobalAlert": subAlertData.subAlertDefinition.alertType.toLowerCase().indexOf("global")>=0?"TRUE":"FALSE",
      "isAccountLevel": subAlertData.subAlertDefinition.isAccountLevel.toUpperCase() === "NO" ? "FALSE":"TRUE",
      "attributeId": subAlertData.subAlertDefinition.alertAttribute?subAlertData.subAlertDefinition.alertAttribute.alertattribute_id:"",
      "conditionId": subAlertData.subAlertDefinition.alertCondition?subAlertData.subAlertDefinition.alertCondition.id:"",
      "value1": subAlertData.subAlertDefinition.value1,
      "value2": subAlertData.subAlertDefinition.value2,
      "accountTypePreference": subAlertData.accountTypes,
      "appPreferences": subAlertData.appTypes,
      "userTypePreferences": subAlertData.userTypes,
      "addedDisplayPreferences": [],
      "removedDisplayPreferences": []
    };
    return requestParam;
  },
  /*
  * update the recipients list in listbox based on account level of alert
  * @param: isFilter - true/false
  */
  filterRecipientsForAccLevel : function(isFilter){
    var listBoxData = [];
    var allRecipients = this.view.lstBoxRecipients.info.data || [];
    for(var i=0;i<allRecipients.length;i++){
      if(isFilter === true){
        if(allRecipients[i].isAccountLevel === 0){ //for non account level alerts
          listBoxData.push(allRecipients[i]);
        }
      }else{ //for account level alerts
        listBoxData.push(allRecipients[i]);
      }
      
    }
    this.setRecipients(listBoxData);
  },
  /*
  * check if current locale is available in languages array
  * @param: lang locale code
  * @returns: true/false
  */
  checkIfCurrentLocaleAvailable : function(langCode){
    var filterLangCode = this.langToShow.filter(function(rec){
      return rec[0] === langCode;
    });
    return (filterLangCode.length > 0);
  },
  /*
  * get other locale if current locale is not available
  * @returns: locale lang code
  */
  getOtherDefaultLocale : function(){
    var otherLangCode = this.langToShow.filter(function(rec){
      if(rec[0].indexOf("en") >= 0){
        return rec;
      }
    });
    var langToSet = otherLangCode.length  > 0 ? otherLangCode[0][0] : 
                         (this.langToShow.length > 0 ? this.langToShow[0][0] : "");
    return langToSet;
  },
  /*
  * set legal entity data to dropdown in view/add screens
  */
  setViewLeDropdownData: function (){
    var leData =[],segData =[],selLeId = "";
    var widgetDataMap = {
      "flxsegList":"flxsegList",
      "lblLegalEntityList": "lblLegalEntityList",
      "id":"id",
      "companyName":"companyName"
    };
    leData = this.getLEListForFormAction("frmAlertsManagement", 'VIEW');
    this.sortBy = this.getObjectSorter("companyName");
    var sortedLeData = leData.sort(this.sortBy.sortData);
    segData = sortedLeData.map(function(rec){
      var rowObj = {
        "lblLegalEntityList": rec.companyName || "",
        "id": rec.id,
        "companyName": rec.companyName,
        "template":"flxsegList"
      };
      return rowObj;
    });
    this.view.segLegalEntity.widgetDataMap = widgetDataMap;
    if(segData.length > 0){
      selLeId = sortedLeData[0] ? sortedLeData[0].id :"";
      this.view.lblSelectLegalEntity.text = sortedLeData[0] ? sortedLeData[0].companyName :  kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity");
      this.view.lblSelectLegalEntity.info = {"selectedLEId":selLeId,
                                             "selectedLEName":sortedLeData[0] ? sortedLeData[0].companyName : ""};
      this.view.lblAlertsHeaderSelLEValue.info = {"id": selLeId};
      this.view.segLegalEntity.setVisibility(true);
      this.view.flxNoRecords.setVisibility(false);
      this.view.segLegalEntity.setData(segData);
      this.view.segLegalEntity.info = {"allData": segData};
      // to disbale the dropdown onclick in case there is only one LE
      this.view.flxLegalEntityDropdown.setEnabled(segData.length > 1);
    } else{
      this.view.segLegalEntity.setVisibility(false);
      this.view.flxNoRecords.setVisibility(true);
    }
    this.getLEBasedMasterData(selLeId);
    this.presenter.fetchAlertCategories({"legalEntityId":selLeId});
  },
   /*
  * set legal entity data to dropdown in view/add screens
  */
  setAddLeDropdownData: function (){
    var leData =[],segData =[];
    var widgetDataMap = {
      "flxsegList":"flxsegList",
      "lblLegalEntityList": "lblLegalEntityList",
      "id":"id",
      "companyName":"companyName"
    };
    leData = this.getLEListForFormAction("frmAlertsManagement", 'CREATE');
    this.sortBy = this.getObjectSorter("companyName");
    var sortedLeData = leData.sort(this.sortBy.sortData);
    segData = sortedLeData.map(function(rec){
      var rowObj = {
        "lblLegalEntityList": rec.companyName || "",
        "id": rec.id,
        "companyName":rec.companyName,
        "template":"flxsegList"
      };
      return rowObj;
    });
    this.view.segEditCategoryLEList.widgetDataMap = widgetDataMap;
    if(segData.length > 0){
      this.view.lblEditCategorySelectedLE.text = kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity");
      this.view.lblEditCategorySelectedLE.info = {"selectedLEId":"","selectedLEName":""};
      this.view.segEditCategoryLEList.setVisibility(true);
      this.view.flxEditCategoryLENoRecords.setVisibility(false);
      this.view.segEditCategoryLEList.setData(segData);
      this.view.segEditCategoryLEList.info = {"allData": segData};
      // to disbale the dropdown onclick and select the LE by default in case there is only one LE
      this.view.flxEditCategorySelectedLE.setEnabled(segData.length > 1);
      if(segData.length === 1){
        this.view.lblEditCategorySelectedLE.text = segData[0].companyName;
        this.view.lblEditCategorySelectedLE.info = {"selectedLEId":segData[0].id,"selectedLEName": segData[0].companyName};
      }
    } else{
      this.view.segEditCategoryLEList.setVisibility(false);
      this.view.flxEditCategoryLENoRecords.setVisibility(true);
    }
  },
  /*
  * search for LE in the dropdown list
  */
  searchLegalEntity : function(){
    var segLEData = this.view.segLegalEntity.info.allData;
     if (this.view.txtLegalSearch.text.trim().length > 0) {
        var search = this.view.txtLegalSearch.text.toLowerCase();
        var status = "";
        var filterData = segLEData.filter(function (rec) {
          name = rec.companyName.toLowerCase();
          if (name.indexOf(search) >= 0) return rec;
        });
        if (filterData.length === 0) {
          this.view.segLegalEntity.setVisibility(false);
          this.view.flxNoRecords.setVisibility(true);
        } else {
          this.view.segLegalEntity.setData(filterData);
          this.view.segLegalEntity.setVisibility(true);
          this.view.flxNoRecords.setVisibility(false);
        }
      } else {
        this.view.segLegalEntity.setData(segLEData);
        this.view.segLegalEntity.setVisibility(true);
        this.view.flxNoRecords.setVisibility(false);
      }
      this.view.forceLayout();
  },
   /*
  * search for LE in the dropdown list in add category screen
  */
  searchLegalEntityAddCategory : function(){
    var segLEData = this.view.segEditCategoryLEList.info.allData;
     if (this.view.txtEditCategoryLESearchbox.text.trim().length > 0) {
        var search = this.view.txtEditCategoryLESearchbox.text.toLowerCase();
        var status = "";
        var filterData = segLEData.filter(function (rec) {
          name = rec.companyName.toLowerCase();
          if (name.indexOf(search) >= 0) return rec;
        });
        if (filterData.length === 0) {
          this.view.segEditCategoryLEList.setVisibility(false);
          this.view.flxEditCategoryLENoRecords.setVisibility(true);
        } else {
          this.view.segEditCategoryLEList.setData(filterData);
          this.view.segEditCategoryLEList.setVisibility(true);
          this.view.flxEditCategoryLENoRecords.setVisibility(false);
        }
      } else {
        this.view.segEditCategoryLEList.setData(segLEData);
        this.view.segEditCategoryLEList.setVisibility(true);
        this.view.flxEditCategoryLENoRecords.setVisibility(false);
      }
      this.view.forceLayout();
  },
  /*
  * check if LEId is present in the supported LE list
  * @param: LE id, action("CREATE"/"VIEW")
  * @return: true/false
  */
  isPermissionAvailableForLE : function(LeId, action){
    var permLE = this.getLEListForFormAction("frmAlertsManagement",action);
    var isLeAvail = false;
    for(let i=0; i<permLE.length; i++){
      if(permLE[i].id === LeId){
        isLeAvail = true;
        break;
      }
    }
    return isLeAvail;
  }
});

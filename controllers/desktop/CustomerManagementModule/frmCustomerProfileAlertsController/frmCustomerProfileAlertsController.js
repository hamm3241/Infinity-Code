define({
  prefData :{},
  isModified: false,
  isInitialLoad : false,
  supportedChannels : [],
  previewData : [],
  sortBy: null,
  actionConfig:{
    EDIT:"EDIT",
    VIEW:"VIEW"
  },
  scrollHeight: 0,
  channelCount: 0,
  sALL: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.ALL"),
  sActive: kony.i18n.getLocalizedString("i18n.secureimage.Active"),
  sInactive: kony.i18n.getLocalizedString("i18n.permission.Inactive"),
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
      } else if (context.enrollACustomer) {
        this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      }else if(context.alertCategory){
        this.setAlertCategory(context.alertCategory.records,context.accountAlerts);
      }
      else if (context.prefData){
        this.prefData = context.prefData;
        this.setAlertPrefData();
        if(context.prefData.accountPref){
          var data = this.mapAccountsDataForSeg(context.prefData.accountPref, {"alertcategory_id":"ALERT_CAT_ACCOUNTS"});
        }
        if(context.isOnTabClick){
          this.changeVisibilty(this.view.flxAlertWrapper);
          this.selectedCategoryOnClick();
        }
      }else if (context.alertHistory){
        this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName7);
        this.resetAllSortImagesAlertHistory();
        //this.unloadOnScrollEvent();
        //this.presenter.getAlertCategories(this.presenter.getCurrentCustomerDetails().Customer_id);
        this.view.notificationsSearch.flxSubHeader.skin = "sknFlxffffffWithOutBorder";
        this.view.notificationsSearch.lblShowing.setVisibility(true);
        this.view.notificationsSearch.lblShowing.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Alert_history");
        // commenting the btnNotifications.onClick() and adding actual functionality next four lines - AAC-6360
        //this.view.btnNotifications.onClick(); 
        this.AdminConsoleCommonUtils.storeScrollHeight(this.view.flxMainContent);
        this.changeTabSelection(this.view.btnNotifications);
        this.changeVisibilty(this.view.flxNotificationsWrapper);
        this.AdminConsoleCommonUtils.scrollToDefaultHeight(this.view.flxMainContent);
        // end of fix AAC-6360
        this.setDataForAlertHistorySegment(context.alertHistory);
      }else if (context.CustomerNotifications) {
        this.setDataForNotificationsSegment(context.CustomerNotifications);

      } else if (context.AlertPrefrences) {
        this.setAlertData(context.AlertPrefrences);
      }else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);
      }else if (context.AccountSpecificAlerts) {
        this.view.alerts.listBoxAccounts.info = { "AccountSpecificAlerts": context.AccountSpecificAlerts };

        if (context.AccountSpecificAlerts.length > 0) {
          var defaultAlertId = context.AccountSpecificAlerts[0].alertId;
          this.setDataForListBoxAccounts(defaultAlertId);
          this.setDataForAccountSpecificAlerts();
        } else {
          this.view.alerts.lblStatus.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Disabled");
          this.view.alerts.lblStatusIcon.text = "?";
          this.view.alerts.lblStatusIcon.skin = "sknfontIconInactive";
          this.view.alerts.flxOverLay.setVisibility(false);
          this.view.alerts.flxSubAlerts.setVisibility(false);
        }
        this.view.forceLayout();
        this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
      } else if(context.userNameRulesPolicy){
        this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
      } else if(context.linkProfilesList){
        this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList,this);
      } else if(context.userNameIsAvailable){
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
    }
  },
  setDataForListBoxAccounts: function (defaultAlertId) {
    var AccountSpecificAlerts = this.view.alerts.listBoxAccounts.info.AccountSpecificAlerts;
    var accounts = [];
    for (var i = 0; i < AccountSpecificAlerts.length; i++) {
      accounts.push([AccountSpecificAlerts[i].alertId, AccountSpecificAlerts[i].accountType + " XXXXXX" +
                     AccountSpecificAlerts[i].accountNumber.slice(AccountSpecificAlerts[i].accountNumber.length - 4)]);
    }
    this.view.alerts.listBoxAccounts.masterData = accounts;
    this.view.alerts.listBoxAccounts.selectedKey = defaultAlertId;
  },


  CustomerProfileAlertsPreshow: function () {
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName7);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 115 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    //Notifications segment default behaviour
    this.AdminConsoleCommonUtils.setVisibility(this.view.flxAlertsHistorySegmentHeader, true);
    this.AdminConsoleCommonUtils.setVisibility(this.view.lblNotificationHeaderSeperator, true);
    this.AdminConsoleCommonUtils.setVisibility(this.view.rtxMsgNotifications, false);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
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
    //search on notifications
    this.view.notificationsSearch.tbxSearchBox.onKeyUp = function () {
      if (scopeObj.view.notificationsSearch.tbxSearchBox.text === "") {
        scopeObj.view.notificationsSearch.flxSearchCancel.setVisibility(false);
      } else {
        scopeObj.view.notificationsSearch.flxSearchCancel.setVisibility(true);
      }
      var searchParameters = [{
        "searchKey": "lblAlertName",
        "searchValue": scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.notificationsSearch.tbxSearchBox.text)
      }];
      var listOfWidgetsToHide = [scopeObj.view.flxAlertsHistorySegmentHeader, scopeObj.view.lblNotificationHeaderSeperator];
      scopeObj.search(scopeObj.view.segAlertHistory, searchParameters, scopeObj.view.rtxMsgNotifications, 
                      scopeObj.view.flxOtherInfoWrapper, scopeObj.sALL, null, listOfWidgetsToHide);
    };
    this.view.notificationsSearch.flxSearchCancel.onClick = function () {
      scopeObj.view.notificationsSearch.tbxSearchBox.text = "";
      var listOfWidgetsToHide = [scopeObj.view.flxAlertsHistorySegmentHeader, scopeObj.view.lblNotificationHeaderSeperator];
      scopeObj.clearSearch(scopeObj.view.segAlertHistory, scopeObj.view.rtxMsgNotifications, scopeObj.view.flxOtherInfoWrapper, 
                           scopeObj.sALL, null, listOfWidgetsToHide);
      scopeObj.view.notificationsSearch.flxSearchCancel.setVisibility(false);
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
    this.view.btnEmail.onClick = function(){
      var previewTabData = scopeObj.previewData.CH_EMAIL;
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      var emailDescription="<p style=\"text-align:justify\">"+previewTabData.content+"</p>";
      if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = emailDescription;
      } else {
        if(!document.getElementById("iframe_rtxViewer").newOnload) {
          document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
        }
        document.getElementById("iframe_rtxViewer").onload = function() {
          document.getElementById("iframe_rtxViewer").newOnload();
          document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =emailDescription;
        };
      }
      scopeObj.view.lblPreviewTemplateBody.setVisibility(false);
      scopeObj.view.rtxViewer.setVisibility(true);
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnEmail);
      scopeObj.view.forceLayout();
    };
    this.view.btnAlertPopUpCancel.onClick = function(){
      scopeObj.view.flxPreviewPopup.setVisibility(false);
    };
    this.view.flxAlertPopUpClose.onClick = function(){
      scopeObj.view.flxPreviewPopup.setVisibility(false);
    };
    this.view.alerts.btnEditAlerts.onClick = function(){
      scopeObj.view.alerts.flxAlertDetailContainer.setVisibility(false);
      scopeObj.view.alerts.flxBackBtn.setVisibility(true);
      scopeObj.view.alerts.btnEditAlerts.setVisibility(false);
      scopeObj.view.alerts.flxButtonsSeperator.setVisibility(true);
      scopeObj.view.alerts.commonButtons.setVisibility(true);
      scopeObj.isModified = true;
      scopeObj.isInitialLoad = scopeObj.prefData.typePref.categorySubscription.isInitialLoad;
      scopeObj.setAlertsSegmentData(scopeObj.actionConfig.EDIT);
      scopeObj.setChannelsDataToUI();
      scopeObj.view.alerts.flxAlertEditContainer.setVisibility(true);
      scopeObj.enableDisableEntryFields();
      scopeObj.view.forceLayout();
    };
    this.view.alerts.flxBackBtn.onClick = function(){
      scopeObj.view.alerts.flxBackBtn.setVisibility(false);
      scopeObj.view.alerts.btnEditAlerts.setVisibility(true);
      scopeObj.view.alerts.flxClickBlocker.setVisibility(false);
      scopeObj.view.alerts.flxAlertEditContainer.setVisibility(false);
      scopeObj.view.alerts.flxButtonsSeperator.setVisibility(false);
      scopeObj.view.alerts.commonButtons.setVisibility(false);
      scopeObj.view.alerts.flxAlertChannelError.setVisibility(false);
      scopeObj.isModified = false;
      scopeObj.setAlertChannelsAndStatus();
      scopeObj.setAlertsSegmentData(scopeObj.actionConfig.VIEW);
      scopeObj.view.alerts.flxAlertDetailContainer.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.alerts.btnBack.onClick = function(){
      scopeObj.view.alerts.flxBackBtn.onClick();
    };
    this.view.alerts.commonButtons.btnSave.onClick = function(){
      scopeObj.saveAlertPreferences(scopeObj.view.alerts);
    };
    this.view.alerts.commonButtons.btnCancel.onClick = function() {
      scopeObj.view.alerts.flxAlertChannelError.setVisibility(false);
      scopeObj.isInitialLoad = scopeObj.prefData.typePref.categorySubscription.isInitialLoad;
      scopeObj.setAlertChannelsAndStatus();
      scopeObj.setChannelsDataToUI();
      scopeObj.setAlertsSegmentData(scopeObj.actionConfig.EDIT);
    };
    this.view.alerts.editAlertCategoryStatusSwitch.switchToggle.onSlide = function() {
      if (scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 0){
        scopeObj.view.alerts.lblAlertEditNotiStatus.text = "Enabled";
        scopeObj.view.alerts.lblAlertEditNotiStatus.skin = "sknlblLato5bc06cBold14px";
        scopeObj.view.alerts.lblAlertEditNotiStatusIcon.skin = "sknFontIconActivate";
        scopeObj.view.alerts.flxClickBlocker.setVisibility(false);
        if (scopeObj.isInitialLoad === "true" || scopeObj.isInitialLoad === true ) {
          scopeObj.enableAllChannelsAndAlerts();
          scopeObj.isInitialLoad = false;
          return;
        }else{
          scopeObj.disableEditAlertChannels(0);
        }  
      }
      else{
        scopeObj.view.alerts.lblAlertEditNotiStatus.text = "Disabled";
        scopeObj.view.alerts.lblAlertEditNotiStatus.skin = "sknlblLato5bc06cBold14px";
        scopeObj.view.alerts.lblAlertEditNotiStatusIcon.skin = "sknfontIconInactive";
        scopeObj.disableEditAlertChannels(1);
      }
      var imgSrc = scopeObj.getCheckboxImage();
      var hSkin = scopeObj.getHoverSkin();
      var data = scopeObj.view.alerts.segAlerts2.data;
      for(var i=0;i<data.length;i++){
        if (data[i].imgEnabledCheckBox.src !== scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
          data[i].imgEnabledCheckBox.src = imgSrc;
        }
        data[i].imgEnabledCheckBox.hoverSkin = hSkin;
        scopeObj.view.alerts.segAlerts2.setDataAt(data[i],i);
      }
    };
    this.view.alerts.flxChannel1.onClick = function() {
      if(scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 1){
        return;
      }
      var imgSrc = scopeObj.getCheckboxImage();
      if(scopeObj.view.alerts.imgCheckBoxChannel1.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
        scopeObj.view.alerts.imgCheckBoxChannel1.src = imgSrc;
        scopeObj.view.alerts.flxAlertChannelError.setVisibility(false);
      }else{
        scopeObj.view.alerts.imgCheckBoxChannel1.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
      }
    };
    this.view.alerts.flxChannel2.onClick = function() {
      if(scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 1){
        return;
      }
      var imgSrc = scopeObj.getCheckboxImage();
      if(scopeObj.view.alerts.imgCheckBoxChannel2.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
        scopeObj.view.alerts.imgCheckBoxChannel2.src = imgSrc;
        scopeObj.view.alerts.flxAlertChannelError.setVisibility(false);
      }else{
        scopeObj.view.alerts.imgCheckBoxChannel2.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
      }
    };
    this.view.alerts.flxChannel3.onClick = function() {
      if(scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 1){
        return;
      }
      var imgSrc = scopeObj.getCheckboxImage();
      if(scopeObj.view.alerts.imgCheckBoxChannel3.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
        scopeObj.view.alerts.imgCheckBoxChannel3.src = imgSrc;
        scopeObj.view.alerts.flxAlertChannelError.setVisibility(false);
      }else{
        scopeObj.view.alerts.imgCheckBoxChannel3.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
      }
    };
    this.view.alerts.flxChannel4.onClick = function() {
      if(scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 1){
        return;
      }
      var imgSrc = scopeObj.getCheckboxImage();
      if(scopeObj.view.alerts.imgCheckBoxChannel4.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
        scopeObj.view.alerts.imgCheckBoxChannel4.src = imgSrc;
        scopeObj.view.alerts.flxAlertChannelError.setVisibility(false);
      }else{
        scopeObj.view.alerts.imgCheckBoxChannel4.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
      }
    };
    this.view.btnSMS.onClick = function(){
      var previewTabData = scopeObj.previewData.CH_SMS;
      scopeObj.view.lblPreviewTemplateBody.setVisibility(true);
      scopeObj.view.rtxViewer.setVisibility(false);
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.view.lblPreviewTemplateBody.text = previewTabData.content;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnSMS);
      scopeObj.view.forceLayout();      
    };
    this.view.btnPushNoti.onClick = function(){
      var previewTabData = scopeObj.previewData.CH_PUSH_NOTIFICATION;
      scopeObj.view.lblPreviewTemplateBody.setVisibility(true);			  
      scopeObj.view.rtxViewer.setVisibility(false);
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.view.lblPreviewTemplateBody.text = previewTabData.content;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnPushNoti);
      scopeObj.view.forceLayout();      
    };
    this.view.btnNotifCenter.onClick = function(){
      var previewTabData = scopeObj.previewData.CH_NOTIFICATION_CENTER;
      scopeObj.view.lblPreviewTemplateBody.setVisibility(true);
      scopeObj.view.rtxViewer.setVisibility(false);		      
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.view.lblPreviewTemplateBody.text = previewTabData.content;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnNotifCenter);
      scopeObj.view.forceLayout();      
    };
    this.view.btnNotifications.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.changeTabSelection(scopeObj.view.btnNotifications);
      scopeObj.changeVisibilty(scopeObj.view.flxNotificationsWrapper);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.btnPrefrences.onClick = function () {
      var customerId = scopeObj.presenter.getCurrentCustomerDetails().Customer_id;
      scopeObj.presenter.getAlertCategories(customerId,true);
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.changeTabSelection(scopeObj.view.btnPrefrences);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.alerts.segAlertCategory.onRowClick = function () {
      scopeObj.onClickOfAccountNumber();
      scopeObj.toggleArrowForSegmentRow();
    };
    this.view.alerts.segSubAlerts.onRowClick = function(){
      scopeObj.onClickOfSegSubAlerts();
    };
    this.view.alerts.flxHeaderDescription.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.sortBy.column("description");
      scopeObj.resetAlertPrefrenceSortImages();
      scopeObj.setSubAlerts(scopeObj.view.alerts.segSubAlerts.data.sort(scopeObj.sortBy.sortData),
                            scopeObj.view.alerts.segAlertCategory.selectedRowIndex[1] === 3 ? true : false);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.alerts.flxHeaderStatus.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.sortBy.column("status.text");
      scopeObj.resetAlertPrefrenceSortImages();
      scopeObj.setSubAlerts(scopeObj.view.alerts.segSubAlerts.data.sort(scopeObj.sortBy.sortData),
                            scopeObj.view.alerts.segAlertCategory.selectedRowIndex[1] === 3 ? true : false);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
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
    this.view.alerts.flxHeaderValue.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.sortBy.column("value");
      scopeObj.resetAlertPrefrenceSortImages();
      scopeObj.setSubAlerts(scopeObj.view.alerts.segSubAlerts.data.sort(scopeObj.sortBy.sortData),
                            scopeObj.view.alerts.segAlertCategory.selectedRowIndex[1] === 3 ? true : false);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    //sorting on notifications
    this.view.flxAlertName.onClick = function () {
      scopeObj.resetAllSortImagesAlertHistory();
      scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segAlertHistory, "lblAlertName", scopeObj.view.fonticonSortAlertName, scopeObj.view.flxOtherInfoWrapper, scopeObj.sALL, null,scopeObj);
    };
    this.view.flxAlertSentDate.onClick = function () {
      scopeObj.resetAllSortImagesAlertHistory();
      scopeObj.AdminConsoleCommonUtils.sort(scopeObj.view.segAlertHistory, "lblSentDate", scopeObj.view.fonticonSortSentDate, scopeObj.view.flxOtherInfoWrapper, scopeObj.sALL, null,scopeObj);
    };

    //Notification search skin
    this.view.notificationsSearch.tbxSearchBox.onBeginEditing = function () {
      scopeObj.view.notificationsSearch.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
    };
    this.view.notificationsSearch.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.notificationsSearch.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
    };

  },
  enableAllChannelsAndAlerts: function(){
    var scopeObj = this;
    var widget = scopeObj.view.alerts;
    var hSkin = scopeObj.getHoverSkin();
    var data = scopeObj.view.alerts.segAlerts2.data;
    var i;
    for (i = 1; i <= 4; i++) {
      widget["imgCheckBoxChannel"+i].src = scopeObj.AdminConsoleCommonUtils.checkboxSelected;
      widget["imgCheckBoxChannel"+i].hoverSkin = hSkin;
    }
    for (i = 0;i < data.length; i++){
      data[i].imgEnabledCheckBox.src = scopeObj.AdminConsoleCommonUtils.checkboxSelected;
      data[i].imgEnabledCheckBox.hoverSkin = hSkin;
      scopeObj.view.alerts.segAlerts2.setDataAt(data[i],i);
      scopeObj.showOrHideAlertsInputField(data[i], data[i].attributeType, i);
    }
  },
  changeTabSelection: function (selectedButton) {
    var tabArr = [this.view.btnNotifications, this.view.btnPrefrences];
    for (var i = 0; i < tabArr.length; i++) {
      tabArr[i].skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    }
    selectedButton.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
  },
  changeVisibilty: function (selectedFlex) {
    var flexArr = [this.view.flxNotificationsWrapper, this.view.flxAlertWrapper];
    for (var i = 0; i < flexArr.length; i++) {
      flexArr[i].setVisibility(false);
    }
    selectedFlex.setVisibility(true);
  },

  mapAccountSpecificAlertsData: function (data) {
    return {
      "lblAccountNumValue":data.accountId,
      "lblIconEnabled":{"skin":data.isEnabled === "true" ? "sknFontIconActivate" : "sknfontIconInactive"},
      "lblEnabledValue":data.isEnabled === "true" ? kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Enabled"):kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Disabled"),
      "lblSeperator":"-",
      "accountType":data.accountType,
      "template":"flxAlertPreferAccountsList"
    };
  },
  setDataForAccountSpecificAlerts: function () {
    var selectedSec = this.view.alerts.segAlertCategory.selectedsectionindex;
    var segData = this.view.alerts.segAlertCategory.info.data;
    var AccountSpecificAlerts = [];
    if(selectedSec !== null){
      AccountSpecificAlerts = segData[selectedSec][1];
    }
    this.setSubAlerts(AccountSpecificAlerts.map(this.mapAccountSpecificAlertsData), true);
    this.showAccountsListSegment(true);
    this.view.forceLayout();
  },
  setCategorySegmentHeight: function () {
    this.view.forceLayout();
    var height = this.view.alerts.frame.height - 20;
    if (height < 350) {
      this.view.alerts.flxAlertCategory.height = "350px";
    } else {
      this.view.alerts.flxAlertCategory.height = height + "px";
    }
  },
  enableAllCheckboxes:function(alertWidget){
    var data = alertWidget.data;
    for (var index = 0; index < data.length; index++) {
      data[index].imgEnabledCheckBox.onClick();
    }
  },
  setChannelsDataToUI: function() {
    var self = this;
    var imgSrc = self.getCheckboxImage();
    var channelsData = self.prefData.channelPref.records;
    for (var i = 1, j=0; i <=channelsData.length; i++, j++) {
      this.view.alerts["flxChannel" + i].isVisible = true;
      this.view.alerts["imgCheckBoxChannel" + i].src = channelsData[j].isSubscribed === "true" ? imgSrc : self.AdminConsoleCommonUtils.checkboxnormal;
      this.view.alerts["imgCheckBoxChannel" + i].hoverSkin = self.getHoverSkin();
      this.view.alerts["lblChannel" + i].text = channelsData[j].channeltext_Description;
      this.view.alerts["lblChannel" + i].isVisible = true;
    }
  },

  setAlertPrefData:  function () {
    var self = this;
    self.isModified = false;
    self.view.alerts.flxAlertDetailContainer.setVisibility(true);
    self.view.alerts.flxAlertEditContainer.setVisibility(false);
    self.view.alerts.commonButtons.setVisibility(false);
    self.view.alerts.flxButtonsSeperator.setVisibility(false);
    self.view.alerts.flxBackBtn.setVisibility(false);
    self.view.alerts.btnEditAlerts.setVisibility(true);
    self.view.alerts.flxClickBlocker.setVisibility(false);
    self.setAlertChannelsAndStatus();
    self.setAlertsSegmentData(self.actionConfig.VIEW);
  },
  mapAlertCategoryData: function (data) {
    return {
      "categoryName": {
        "text": data.alertcategory_Name.toUpperCase(),
        "skin": "sknlblLatoBold485c7512px"
      },
      "id": data.alertcategory_id,
      "Enabled": "",
      "alerts": "",
      "icon": ""
    };
  },
  /*
   * update UI for selected category and toggle category tabs
   */
  changeSelectedArrow: function (event) {
    var self = this;
    var allCatList = self.view.alerts.flxCategoryRowContainer.children;
    var selectedWid = event.children;
    var selTabLabel = self.view.alerts[selectedWid[0]];
    var selTabArrow = self.view.alerts[selectedWid[1]];
    var widgetArr = "",arrBtn=[],arrArrow = [];
    for(var i=0;i< allCatList.length;i++){
      widgetArr = self.view.alerts[allCatList[i]].children;
      arrBtn.push(self.view.alerts[widgetArr[0]]);
      arrArrow.push(self.view.alerts[widgetArr[1]]);
    }
    self.tabUtilVerticleButtonFunction(arrBtn,selTabLabel);
    self.tabUtilVerticleArrowVisibilityFunction(arrArrow,selTabArrow);
  },
  /*
   * update UI for selected row and toggle account's tabs ,on click of row/accId
   */
  toggleArrowForSegmentRow: function(){
    var self = this;
    var selInd = self.view.alerts.segAlertCategory.selectedRowIndex;
    var segdata = self.view.alerts.segAlertCategory.data;
    if(selInd){
      var secInd = selInd[0];
      var rowInd = selInd[1];
      var rowsDataArr = segdata[secInd][1];
      for(var i=0;i<rowsDataArr.length;i++){
        //show current selected row arow
        if(i === rowInd && (rowsDataArr[i].lblArrow.isVisible === false)){ 
          self.adjustAlertPreferencesListTop(1);
          self.view.alerts.lblAlertDetailAccountValue.text = rowsDataArr[i].accountId; 
          rowsDataArr[i].lblArrow.isVisible = true;
          rowsDataArr[i].lblAlertCategory.skin = "sknlblLatoBold485c7512px";
          rowsDataArr[i].lblAlertCategory.hoverSkin = "sknlblLatoBold485c7512px";
          self.view.alerts.segAlertCategory.setDataAt(rowsDataArr[i], rowInd, secInd);
          self.view.alerts.segAlertCategory.selectedsectionindex = secInd;
        }//hide previous selected row arrow
        else if((i!== rowInd) && (rowsDataArr[i].lblArrow.isVisible === true)){ 
          rowsDataArr[i].lblArrow.isVisible = false;
          rowsDataArr[i].lblAlertCategory.skin = "sknLblUtilRest73767812pxReg";
          rowsDataArr[i].lblAlertCategory.hoverSkin = "sknLblUtilHover30353612pxReg";
          self.view.alerts.segAlertCategory.setDataAt(rowsDataArr[i], i, secInd);
          self.view.alerts.segAlertCategory.selectedsectionindex = secInd;
        }
        
      }
    }
  },
  /*
   * update UI for selected section and toggle account's tabs ,on click of type/section
   */
  toggleArrowForSegmentSection:function(category){
    var self = this;
    var segdata = self.view.alerts.segAlertCategory.data;
    var secInd = self.view.alerts.segAlertCategory.selectedsectionindex;
    var secDataArr = segdata[secInd][0];
    for(var i=0;i<segdata.length;i++){
      //show current selected row
      if((segdata[i][0].lblArrow.isVisible === false) && (i === secInd)){ 
        segdata[i][0].lblArrow.isVisible = true;
        segdata[i][0].btnAccountName.skin = "sknBtnUtilActive485b7512pxBold";
        segdata[i][0].btnAccountName.hoverSkin = "sknBtnUtilActive485b7512pxBold";
        if(category === 2){
          segdata[i][0].btnAccountsCount.skin = "sknBtnUtilActive485b7512pxBold";
          segdata[i][0].btnAccountsCount.hoverSkin = "sknBtnUtilActive485b7512pxBold";
          segdata[i][0].lblDropArrow.text = "\ue906"; //downward arrow-\ue920
          segdata[i][0].lblDropArrow.skin = "sknicon15pxBlack";
          if(segdata[i][1].length > 0)
			 segdata[i][0].lblArrow.isVisible = false;
        } 
      } //hide previous selected rows
      else if ((category === 1) && (i !== secInd) && (segdata[i][0].lblArrow.isVisible === true)) {
        segdata[i][0].lblArrow.isVisible = false;
        segdata[i][0].btnAccountName.skin = "sknBtnUtilRest73767812pxReg";
        segdata[i][0].btnAccountName.hoverSkin = "sknBtnUtilHover30353612pxReg";
      } else if((category === 2) && (i !== secInd) && (segdata[i][0].btnAccountName.skin === "sknBtnUtilActive485b7512pxBold")){
        
        segdata[i][0].lblArrow.isVisible = false;
        segdata[i][0].btnAccountName.skin = "sknBtnUtilRest73767812pxReg";
        segdata[i][0].btnAccountName.hoverSkin = "sknBtnUtilHover30353612pxReg";
        segdata[i][0].btnAccountsCount.skin = "sknBtnUtilRest73767812pxReg";
        segdata[i][0].btnAccountsCount.hoverSkin = "sknBtnUtilHover30353612pxReg";
        segdata[i][0].lblDropArrow.text = "\ue906"; //rigth-sided arrow
        segdata[i][0].lblDropArrow.skin = "sknIcon73767815px";
        segdata[i] = [segdata[i][0],[]];
      }
    }
    self.adjustAlertPreferencesListTop();
    self.view.alerts.segAlertCategory.setData(segdata);
    self.view.forceLayout();
  },
  /*
  * on click of alert category tab
  */
  selectedCategoryOnClick : function(event){
    var scopeObj = this;
    scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
    if(event){
      var widgets = event.children;
      var btnWidget = scopeObj.view.alerts[widgets[0]];
      var selTabArrow = scopeObj.view.alerts[widgets[1]];
      
      scopeObj.adjustAlertPreferencesListTop();
      scopeObj.changeSelectedArrow(event);
      if(btnWidget.info.id === "ALERT_CAT_ACCOUNTS"){  //on-click of category tab
        selTabArrow.setVisibility(false);
        var segdata = scopeObj.view.alerts.segAlertCategory.info.data;
        var category = 0;
        scopeObj.tranformDataForAccountIdType(segdata);
        category = (segdata[0][0].isAlertsAccountNumberLevel === true) ? 2 :1;
        scopeObj.onClickOfAccountTypes(category);
        scopeObj.view.alerts.flxSubCategory.setVisibility(true);
        scopeObj.adjustSegmentPosition(event,true);
      }else{
        scopeObj.getAlertCatPref(btnWidget.info);
        scopeObj.view.alerts.flxSubCategory.setVisibility(false);
        scopeObj.showAccountsListSegment(false);
        scopeObj.adjustSegmentPosition(event,false);
      }
    }else{  //initial load, on-click of preferences tab
      var flxCategory = scopeObj.view.alerts[scopeObj.view.alerts.flxCategoryRowContainer.children[0]];
      var categoryLabel = scopeObj.view.alerts[flxCategory.children[0]];
      var arrowWid = scopeObj.view.alerts[flxCategory.children[1]];
      scopeObj.adjustAlertPreferencesListTop();
      scopeObj.changeSelectedArrow(flxCategory);
      scopeObj.setAlertMessageByCategoryId(categoryLabel.info.id);
      if(categoryLabel.text.toLowerCase().indexOf("account")>=0){
        arrowWid.setVisibility(false);
        var secData = scopeObj.view.alerts.segAlertCategory.data[0];
        var isAccNumLevel = secData[0].isAlertsAccountNumberLevel;
        var accType = 1;
        if(isAccNumLevel){
          accType = 2;
        }else{
          accType = 1;
        }
        scopeObj.setAlertMessageByCategoryId(secData[0].alertCatId,secData[0].btnAccountName.text);
        scopeObj.view.alerts.flxSubCategory.setVisibility(true);
        scopeObj.tranformDataForAccountIdType(scopeObj.view.alerts.segAlertCategory.data);
        scopeObj.view.alerts.segAlertCategory.selectedsectionindex =0;
        scopeObj.onClickOfAccountTypes(accType);
        scopeObj.adjustSegmentPosition(flxCategory,true);
      }
    }  
    scopeObj.view.forceLayout();
    scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
  },
  /*
   *set data for segment of account-id config and select first row
   */
  tranformDataForAccountIdType :  function(segdata){
    var updatedData = [];
    updatedData = segdata.map(function(arr){
          //reset selections
          arr[0].lblArrow.isVisible = false;
          arr[0].btnAccountName.skin = "sknBtnUtilRest73767812pxReg";
          arr[0].btnAccountName.hoverSkin = "sknBtnUtilHover30353612pxReg";
          if(arr[0].isAlertsAccountNumberLevel === true){
            arr[0].btnAccountsCount.skin = "sknBtnUtilRest73767812pxReg";
            arr[0].btnAccountsCount.hoverSkin = "sknBtnUtilHover30353612pxReg";
            arr[0].lblDropArrow.text = "\ue906"; //rigth-sided arrow
            arr[0].lblDropArrow.skin = "sknIcon73767815px";
          }
          //hide the rows under section
          return [arr[0],[]];
        });
        //select the first section by default
        updatedData = this.selectInitialSection(updatedData);
        this.view.alerts.segAlertCategory.setData(updatedData);
        this.view.alerts.segAlertCategory.selectedsectionindex = 0; 
  },
  /*
  *fetch data for account-type click of account-type
  */
  onClickOfAccountTypes: function(category){
    var self = this;
    var selectedSecInd = self.view.alerts.segAlertCategory.selectedsectionindex || 0;
    var secData = "",context = "";
    if(selectedSecInd != null && category === 2){ //in-case of accountId config
      secData = self.view.alerts.segAlertCategory.data[selectedSecInd];
      this.setDataForAccountSpecificAlerts();
      this.toggleArrowForSegmentSection(category);
      var accTabFlex = this.getAccountCategoryFlexName();
      this.adjustSegmentPosition(accTabFlex,true);
      this.setAlertMessageByCategoryId(secData[0].alertCatId,secData[0].btnAccountName.text);
    } else if(selectedSecInd != null && category === 1){ //in-case of account type config
      secData = self.view.alerts.segAlertCategory.data[selectedSecInd];
      this.toggleArrowForSegmentSection(category);
      context = {"AlertCategoryId":secData[0].alertCatId,
                 "CustomerId":self.presenter.getCurrentCustomerDetails().Customer_id,
                 "AccountTypeName":secData[0].btnAccountName.text};
      this.setAlertMessageByCategoryId(secData[0].alertCatId,secData[0].btnAccountName.text);
      this.presenter.getAlertCategoryPref(context);
      this.showAccountsListSegment(false);
    } 
  },
  /*
  *fetch data for account id on click of account-id row
  */
  onClickOfAccountNumber: function(){
    var self = this;
    var defaultSel =[0,0];
    var selectedInd = self.view.alerts.segAlertCategory.selectedRowIndex || defaultSel;
    var segData = self.view.alerts.segAlertCategory.data;
    var rowsData = [];
    if(selectedInd){
      selectedInd = (selectedInd.length === 2) ? selectedInd : defaultSel;
      for(var i=0;i<segData.length;i++){
        if(selectedInd[0] === i){
          rowsData = segData[i][1];
        }
      }
      var selRowData = rowsData[selectedInd[1]];
      var context = {"AlertCategoryId":selRowData.alertCatId,
                     "CustomerId":self.presenter.getCurrentCustomerDetails().Customer_id,
                     "AccountId":selRowData.accountId};
      this.presenter.getAlertCategoryPref(context);
    }
  },
  onClickOfSegSubAlert : function(){
    var self = this;
    var selVal = [];
    var selRow = self.view.alerts.segSubAlerts.selectedRowItems[0];
    var accSegData = self.view.alerts.segAlertCategory.info.data;
    var segData = self.view.alerts.segAlertCategory.data;
    for(var i=0;i<accSegData.length;i++){
      if(selRow.accountType === accSegData[0].btnAccountName){
        segData[i][1] = accSegData[i][1];
        selVal.push(i);
        for(var j=0;j<accSegData[i][1].length;j++){
          if(accSegData[i][1][j].accountId === selRow.lblAccountNumValue){
            selVal.push(j);
            break;
          }
        }
        self.view.alerts.segSubAlerts.setData(segData);
        self.view.alerts.segAlertCategory.selectedRowIndex = selVal;
      }
    }
  },
  
  getAlertCatPref: function(info){
    if (info.id === "ALERT_CAT_ACCOUNTS") {
      this.presenter.getAccountSpecificAlerts({
        "customerUsername": this.presenter.getCurrentCustomerDetails().Username
      });
    } else {
      this.setAlertMessageByCategoryId(info.id);
      var context = {"AlertCategoryId":info.id,"CustomerId":this.presenter.getCurrentCustomerDetails().Customer_id};
      this.presenter.getAlertCategoryPref(context);
    }
  },
  setAlertMessageByCategoryId: function (alertId,name) {
    if (alertId === "ALERT_CAT_SECURITY") {
      this.view.alerts.lblAlertDetailDisplayName.text = "Security " + kony.i18n.getLocalizedString("i18n.frmCustomerProfileAlertsController.Alerts_Preferences");
    }
    else if (alertId === "ALERT_CAT_TRANSACTIONAL") {
      this.view.alerts.lblAlertDetailDisplayName.text =  "Transactional "+ kony.i18n.getLocalizedString("i18n.frmCustomerProfileAlertsController.Alerts_Preferences"); 
    } else if (alertId === "ALERT_CAT_ACCOUNTS") {
      this.view.alerts.lblAlertDetailDisplayName.text =  name +" "+ kony.i18n.getLocalizedString("i18n.frmCustomerProfileAlertsController.Alerts_Preferences"); 
    }
    else {
      this.view.alerts.lblAlertDetailDisplayName.text = "Receive Alert Preferences";
    }
  },
  /*
  * create category tabs dynamically
  */
  setAlertCategory: function (data,accountData) {
    var self = this;
    var initialLabel = "",initialArrow = "",accCatPath ="";
    self.view.alerts.flxCategoryRowContainer.removeAll();
    for (var i=0;i<data.length;i++){
      var newCategoryRow = self.view.alerts.flxAlertCategoryRow.clone(data[i].alertcategory_DisplaySequence);
      var btnAlertCategory = data[i].alertcategory_DisplaySequence + "btnAlertCategory";
      var lblArrow = data[i].alertcategory_DisplaySequence +"lblArrow";
      newCategoryRow[btnAlertCategory].text = data[i].alertcategory_Name.toUpperCase();
      newCategoryRow[btnAlertCategory].info = {"id":data[i].alertcategory_id,};
      newCategoryRow.isVisible = true;
      newCategoryRow.onTouchStart = function(event) {
        self.selectedCategoryOnClick(event);
      };
      self.view.alerts.flxCategoryRowContainer.addAt(newCategoryRow, i+1);
      self.view.alerts.flxSubCategory.setVisibility(false);
      if(data[i].alertcategory_accountLevel === "true"){
         accCatPath = newCategoryRow;
        self.createSubTabsForCategory(accCatPath,data[i],accountData);
        
       }
    }
   self.view.forceLayout();
  },
  /*
   * set data for account's tab segment based on config
   */
  createSubTabsForCategory : function(parentPath, alertdata,accData){
    var self = this;
    var newId = alertdata.alertcategory_DisplaySequence;
    var rowWidgetMap = {
      "accountId":"accountId",
      "alertCatId":"alertCatId",
      "accountType":"accountType",
      "isEnabled":"isEnabled",
      "lblDropArrow":"lblDropArrow",
      "btnAccountName":"btnAccountName",
      "btnAccountsCount": "btnAccountsCount",
      "lblArrow":"lblArrow",
      "isAlertsAccountNumberLevel":"isAlertsAccountNumberLevel",
      "flxAccountAlertPreferTab":"flxAccountAlertPreferTab",
      "lblAlertCategory":"lblAlertCategory",
      "flxAlertCategory":"flxAlertCategory",
      "lblLine":"lblLine"
    };
      var finalData = [];
      finalData =this.mapAccountsDataForSeg(accData,alertdata);
      finalData = this.selectInitialSection(finalData);
      this.view.alerts.segAlertCategory.widgetDataMap = rowWidgetMap;
      this.view.alerts.segAlertCategory.setData(finalData);
      this.view.forceLayout();
  },
  mapAccountsDataForSeg : function(accData, alertdata){
    var self = this;
    var rowWidgetMap = {
      "accountId":"accountId",
      "alertCatId":"alertCatId",
      "accountType":"accountType",
      "isEnabled":"isEnabled",
      "lblDropArrow":"lblDropArrow",
      "btnAccountName":"btnAccountName",
      "btnAccountsCount": "btnAccountsCount",
      "lblArrow":"lblArrow",
      "isAlertsAccountNumberLevel":"isAlertsAccountNumberLevel",
      "flxAccountAlertPreferTab":"flxAccountAlertPreferTab",
      "lblAlertCategory":"lblAlertCategory",
      "flxAlertCategory":"flxAlertCategory",
      "lblLine":"lblLine"
    };
    //account number config
    if(accData.isAlertsAccountNumberLevel === "true"){

      var groupedAccount = this.groupAccountTypes(accData.accountInfo,"accountType");
      var rowData = [],finalData=[];
      Object.keys(groupedAccount).forEach(function(key) {
        var accounts = groupedAccount[key];
        var headerData = {"btnAccountName": {"text":key,
                                             "skin":"sknBtnUtilRest73767812pxReg",
                                             "hoverSkin":"sknBtnUtilHover30353612pxReg",
                                             "left":"43px"},
                          "btnAccountsCount":{"text":groupedAccount[key].length,
                                              "isVisible":true,
                                              "skin":"sknBtnUtilRest73767812pxReg",
                                              "hoverSkin":"sknBtnUtilHover30353612pxReg"},
                          "isAlertsAccountNumberLevel":true,
                          "lblDropArrow":{"isVisible":true,
                                          "text":"\ue906",
                                          "skin":"sknIcon73767815px"},
                          "lblArrow":{"isVisible":false},
                          "lblLine":{"text":"-","left":"20px"},
                          "alertCatId":alertdata.alertcategory_id,
                          "isEnabled": "",
                          "flxAccountAlertPreferTab":{"onClick":function(){
                            self.onClickOfAccountTypes(2);
                            self.showAccountsListSegment(true);
                          }},
                          "template":"flxAccountAlertPreferTab" };
        //create array of account's
        rowData = accounts.map(function(rec){
          return {
            "lblAlertCategory":{"skin":"sknLblUtilRest73767812pxReg",
                                "hoverSkin":"sknLblUtilHover30353612pxReg",
                                "text":rec.nickName},
            "alertCatId":alertdata.alertcategory_id,
            "accountType": key,
            "accountId": rec.accountID,
            "isEnabled":rec.isEnabled,
            "lblArrow":{"isVisible":false},
            "flxAlertCategory":{"isVisible":true},
            "template":"flxAlertCategory"
          };
        });
        finalData.push([headerData,rowData]);
      });
      this.view.alerts.segAlertCategory.info = {"data":finalData};
      return finalData;
    } 
    //account type config
    else {
      var accountTypes = accData.accountInfo;
      var accTypeSegData = accountTypes.map(function(rec){
        return [{"btnAccountName": {"text":rec.accountType,
                                    "skin":"sknBtnUtilRest73767812pxReg",
                                    "hoverSkin":"sknBtnUtilHover30353612pxReg",
                                    "left":"30px"},
                 "btnAccountsCount":{"text":"",
                                     "isVisible":false,
                                     "skin":"sknBtnUtilRest73767812pxReg",
                                     "hoverSkin":"sknBtnUtilHover30353612pxReg"},
                 "isAlertsAccountNumberLevel":false,
                 "lblDropArrow":{"isVisible":false},
                 "lblArrow":{"isVisible":false},
                 "lblLine":{"text":"-","left":"30px"},
                 "alertCatId":alertdata.alertcategory_id,
                 "isEnabled": rec.isEnabled,
                 "flxAccountAlertPreferTab":{"onClick":function(){
                   self.onClickOfAccountTypes(1);
                   self.showAccountsListSegment(false);
                 }},
                 "template":"flxAccountAlertPreferTab" },[]
               ];
      });
      this.view.alerts.segAlertCategory.info = {"data":accTypeSegData};
      return accTypeSegData;
    }
  },
  /*
   * group all the account id's list based on account-type
   */
  groupAccountTypes: function(arr,propertyKey){
    return arr.reduce(function (acc, obj) {
      var key = obj[propertyKey];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  },
  /*
   * select first row of accounts segment
   */
  selectInitialSection : function(data){
    if((data.length > 0) && data[0][0].isAlertsAccountNumberLevel === true){
        //section
        data[0][0].lblArrow.isVisible = true;
        data[0][0].btnAccountName.skin = "sknBtnUtilActive485b7512pxBold";
        data[0][0].btnAccountName.hoverSkin = "sknBtnUtilActive485b7512pxBold";
        data[0][0].btnAccountsCount.skin = "sknBtnUtilActive485b7512pxBold";
        data[0][0].btnAccountsCount.hoverSkin = "sknBtnUtilActive485b7512pxBold";
        data[0][0].lblDropArrow.text = "\ue906";
        data[0][0].lblDropArrow.skin = "sknIcon73767815px";
      } else if((data.length > 0) && data[0][0].isAlertsAccountNumberLevel === false){
        data[0][0].lblArrow.isVisible = true;
        data[0][0].btnAccountName.skin = "sknBtnUtilActive485b7512pxBold";
        data[0][0].btnAccountName.hoverSkin = "sknBtnUtilActive485b7512pxBold";
      }
    return data;
  },
  /*
   * show alert preferences details/account's list 
   */
  showAccountsListSegment : function(value){
    if(value === true){
      this.view.alerts.flxAlerts2.setVisibility(false);
      this.view.alerts.flxAlertDetailBody.setVisibility(false);
      this.view.alerts.flxEditAlertsBtn.setVisibility(false);
      this.view.alerts.flxSubAlerts.setVisibility(true);
      this.view.alerts.flxSeperator.setVisibility(false);
    } else{
      this.view.alerts.flxAlerts2.setVisibility(true);
      this.view.alerts.flxAlertDetailBody.setVisibility(true);
      this.view.alerts.flxEditAlertsBtn.setVisibility(true);
      this.view.alerts.flxSubAlerts.setVisibility(false);
      this.view.alerts.flxSeperator.setVisibility(true);
    }
    this.view.forceLayout();
  },
  setAlertChannelsAndStatus: function(){
    var self = this;
    var channelsData = self.prefData.channelPref.records;
    var str = "";
    self.supportedChannels=[];
    channelsData.forEach(function(rowChannel, index){
      if (rowChannel.isSubscribed === "true") {
        str += rowChannel.channeltext_Description + ", ";
        self.supportedChannels.push(rowChannel.channeltext_Description);
      }
    });
    if (str.substr(str.length-2,2) === ", ") {
      str = str.substring(0,str.length-2);
    }
    self.view.alerts.lblAlertDetailChannels.text = str || "None";
    self.view.alerts.lblAlertNotiStatus.text =
      (self.prefData.typePref.categorySubscription.isSubscribed === "true") ?
      "Enabled" : "Disabled";
    self.view.alerts.lblAlertNotiStatus.skin = "sknlblLato5bc06cBold14px";
    self.view.alerts.lblAlertNotiStatusIcon.skin =
      (self.prefData.typePref.categorySubscription.isSubscribed === "true") ?
      "sknFontIconActivate" : "sknfontIconInactive";
    self.view.alerts.lblAlertEditNotiStatus.text = self.view.alerts.lblAlertNotiStatus.text;
    self.view.alerts.lblAlertEditNotiStatus.skin = self.view.alerts.lblAlertNotiStatus.skin;
    self.view.alerts.lblAlertEditNotiStatusIcon.skin = self.view.alerts.lblAlertNotiStatusIcon.skin;
    self.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex = (self.prefData.typePref.categorySubscription.isSubscribed === "true")? 0:1;  
  },
  alertInputType:function(rowAlert){
    var self = this;
    if(rowAlert.alertCondition){
      if(rowAlert.alertCondition.NoOfFields==="2"){
        return self.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.Range;
      } else if(rowAlert.alertCondition.NoOfFields==="1"){
        if(rowAlert.alertAttribute && rowAlert.alertAttribute.values){
          return self.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.List;
        }
        else{
          return self.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.EqualTo;
        }
      }
    }
    return self.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.NoInputNeeded;
  },
  getCheckboxImage : function()
  {
    var scopeObj = this;
    return scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 0 ? 
      scopeObj.AdminConsoleCommonUtils.checkboxSelected:scopeObj.AdminConsoleCommonUtils.checkboxDisable;
  },
  getHoverSkin : function()
  {
    var scopeObj = this;
    return scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 0 ? "sknCursor":"sknCursorDisabled";
  },
  enableDisableEntryFields: function(){
    if(this.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 0){ //enable
      this.view.alerts.flxClickBlocker.setVisibility(false);
    }else{ //disable
      this.view.alerts.flxClickBlocker.setVisibility(true);
    }
    this.view.forceLayout();
  },
  fetchAlertsSegmentData:function(alertWidget){
    var scopeObj = this;
    var alertsData = this.prefData.typePref.records;
    var data = alertWidget.data;
    var typePreference = [];
    var imgSrc = scopeObj.getCheckboxImage();
    data.forEach(function (rowAlert, i) {
      var type = scopeObj.alertInputType(alertsData[i]);
      var list = {};
      list.typeId = rowAlert.alerttype_id;
      list.isSubscribed = (rowAlert.imgEnabledCheckBox.src === imgSrc) ? "true" : "false";
      if (type === scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.Range) {
        list.value1 = rowAlert.tbxMinLimit.text;
        list.value2 = rowAlert.tbxMaxLimit.text;
      }
      else if (type === scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.EqualTo) {
        list.value1 = rowAlert.tbxAmount.text;
      }
      else if (type === scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.List) {
        list.value1 = rowAlert.lstNotify.selectedKey;
      }
      typePreference.push(list);
    });
    return typePreference;
  },
  showOrHideAlertsInputField:function(rowData, type, index){
    var scopeObj = this;
    var data = rowData;
    var imgSrc = scopeObj.getCheckboxImage();
    rowData.flxAccBalanceInBetween.isVisible = (type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.Range && rowData.imgEnabledCheckBox.src === imgSrc)?true:false;
    rowData.flxAccBalanceCreditedDebited.isVisible = (type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.EqualTo && rowData.imgEnabledCheckBox.src === imgSrc)?true:false;
    rowData.flxNotifyBalance.isVisible = (type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.List && rowData.imgEnabledCheckBox.src === imgSrc)?true:false;
    scopeObj.view.alerts.segAlerts2.setDataAt(data, index);
  },
  showNoAlertsFoundUI:function(){
  },
  setAlertsSegmentData: function(action) 
  {
    var scopeObj = this;
    var dataMap = {
      "flxAccountAlertsCategoryDetails": "flxAccountAlertsCategoryDetails",
      "flxAccountAlertCategoryContainer":"flxAccountAlertCategoryContainer",
      "flxEnabledIcon":"flxEnabledIcon",
      "imgEnabledCheckBox":"imgEnabledCheckBox",
      "lblEnabledIcon":"lblEnabledIcon",
      "lblAlertDescription":"lblAlertDescription",
      "flxAccBalanceInBetween":"flxAccBalanceInBetween",
      "tbxMinLimit":"tbxMinLimit",
      "tbxMaxLimit":"tbxMaxLimit",
      "flxHorSeparator":"flxHorSeparator",
      "lblHorSeparator":"lblHorSeparator",
      "flxAccBalanceCreditedDebited":"flxAccBalanceCreditedDebited",
      "tbxAmount": "tbxAmount",
      "flxNotifyBalance":"flxNotifyBalance",
      "lstNotify":"lstNotify",
      "lblSeperator": "lblSeperator",
      "alerttype_id":"alerttype_id",
      "attributeType":"attributeType",
      "template":"template"
    };
    var list = [];
    var alertsData = this.prefData.typePref.records;
    if(alertsData.length===0){
      scopeObj.showNoAlertsFoundUI();
    }
    var isModified = scopeObj.isModified;
    var imgSrc = scopeObj.getCheckboxImage();
    var hSkin = scopeObj.getHoverSkin();
    alertsData.forEach(function(rowAlert, index){
      var type = scopeObj.alertInputType(rowAlert);
      var data = {};
      var descText = "";
      var isRange = false,isValue =false,isList=false;
      if(type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.Range){
        isRange =true;
        descText = (rowAlert.alerttype_Value1 && rowAlert.alerttype_Value2) ? (rowAlert.alerttypetext_Description + ": " + rowAlert.alerttype_Value1+ "-"+ rowAlert.alerttype_Value1) :
        																		rowAlert.alerttypetext_Description;
      }else if(type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.EqualTo){
        isValue=true;
        descText = rowAlert.alerttype_Value1 ? (rowAlert.alerttypetext_Description + ": " + rowAlert.alerttype_Value1) : rowAlert.alerttypetext_Description;
      }else if(type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.List){
        isList = true;
        descText = rowAlert.alerttype_Value1 ? (rowAlert.alerttypetext_Description + ": " + rowAlert.alerttype_Value1) : rowAlert.alerttypetext_Description;
      } else{
        descText = rowAlert.alerttypetext_Description
      }
      if(action === scopeObj.actionConfig.EDIT) descText = rowAlert.alerttypetext_Description;
      data = {
        "attributeType":type,
        "imgEnabledCheckBox":{
          isVisible: (isModified===true)?true:false,
          "src":rowAlert.isSubscribed==="true"?imgSrc:scopeObj.AdminConsoleCommonUtils.checkboxnormal,
          "hoverSkin": hSkin,
          "onClick":function(){
            if(scopeObj.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 1){
              return;
            }
            var imgSrc2 = scopeObj.getCheckboxImage();
            var rowData = scopeObj.view.alerts.segAlerts2.data[index];
            if (rowData.imgEnabledCheckBox.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
              rowData.imgEnabledCheckBox.src = imgSrc2;
            }
            else{
              rowData.imgEnabledCheckBox.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
            }
            scopeObj.view.alerts.segAlerts2.setDataAt(rowData, index);
            scopeObj.showOrHideAlertsInputField(rowData, type, index);
          }
        },
        "lblEnabledIcon":{
          isVisible: (isModified===false)?true:false,
          "skin":(rowAlert.isSubscribed==="true")?"sknFontIconActivate":"sknfontIconInactive",
        },
        "lblAlertDescription": descText,
        "flxAccBalanceInBetween": {
          isVisible: action === scopeObj.actionConfig.EDIT ? (isRange && rowAlert.isSubscribed==="true"?true:false):false
        },
        "tbxMinLimit":{
          "text":(isRange && rowAlert.alerttype_Value1)?rowAlert.alerttype_Value1:"",
        },
        "tbxMaxLimit":{
          "text":(isRange && rowAlert.alerttype_Value1)?rowAlert.alerttype_Value1:"",
        },
        "flxHorSeparator":{
          isVisible:true
        },
        "lblHorSeparator":"-",
        "flxAccBalanceCreditedDebited":{
          isVisible: action === scopeObj.actionConfig.EDIT ?(isValue && rowAlert.isSubscribed==="true"?true:false):false,
        },
        "tbxAmount":{
          "text": (isValue && rowAlert.alerttype_Value1)?rowAlert.alerttype_Value1:"",
        },
        "flxNotifyBalance": {
          isVisible: action === scopeObj.actionConfig.EDIT ?(isList && rowAlert.isSubscribed==="true"?true:false) : false,
        },
        //Needs Refactor
        "lstNotify":{
          selectedKey: (isList && rowAlert.preference)?
          rowAlert.preference.Value1:isList === true?
          scopeObj.returnMasterDataFromAlerts(rowAlert.alertAttribute.values)[0][0]:"",
          masterData: isList === true?scopeObj.returnMasterDataFromAlerts(rowAlert.alertAttribute.values):"",
        },
        "lblSeperator": "-",
        "alerttype_id":rowAlert.alerttype_id,
        "template":"flxAccountAlertsCategoryDetails"
      };
      list.push(data);
    });
    scopeObj.view.alerts.segAlerts2.widgetDataMap = dataMap;
    scopeObj.view.alerts.segAlerts2.setData([]);
    scopeObj.view.alerts.segAlerts2.setData(list);
    scopeObj.showAccountsListSegment(false);
    scopeObj.view.forceLayout();
  },
  returnMasterDataFromAlerts:function(values){
    var data=[];
    values.forEach(function(value){
      var list = [];
      list.push(value.alertattributelistvalues_id);
      list.push(value.alertattributelistvalues_name);
      data.push(list);
    });
    return data;
  },
  validateAlertsSegmentData:function(alertWidget){
    var scopeObj = this;
    var data = alertWidget.data;
    var alertsData = this.prefData.typePref.records;
    var isValid=true;
    var imgSrc = scopeObj.getCheckboxImage();
    data.forEach(function(rowAlert, i){
      var type = scopeObj.alertInputType(alertsData[i]);
      if(type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.Range){
        if(rowAlert.imgEnabledCheckBox.src === imgSrc && (rowAlert.tbxMinLimit.text.trim().length === 0 || rowAlert.tbxMaxLimit.text.trim().length === 0))
        {
          alertWidget.setDataAt(rowAlert, i);
          isValid= false;
        }
      }
      else if(type===scopeObj.AdminConsoleCommonUtils.ALERTS_INPUT_TYPES.EqualTo){
        if(rowAlert.imgEnabledCheckBox.src === imgSrc && rowAlert.tbxAmount.text.trim().length === 0 )
        {
          alertWidget.setDataAt(rowAlert, i);
          isValid= false;
        }
      }
    });
    return isValid;
  },
  getSelectedAlertsChannels: function(widget){
    var self = this;
    var channelPreferences = [];
    var channelData = self.prefData.channelPref.records;
    var imgSrc = self.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 0 ? 
        self.AdminConsoleCommonUtils.checkboxSelected:self.AdminConsoleCommonUtils.checkboxDisable;
    self.channelCount = 0;
    for (var i = 1, j=0; widget["flxChannel" + i] !== undefined ; i++, j++) {
      if(widget["flxChannel" + i] !== undefined && (widget["flxChannel" + i].isVisible === true || widget["flxChannel" + i].isVisible === "true")) {
        var temp={};
        if(widget["imgCheckBoxChannel" + i].src === imgSrc)
        {
          temp.isSubscribed = true;
          self.channelCount++;
        }else{
          temp.isSubscribed = false;
        }
        temp.channelId = channelData[j].channel_id;
        channelPreferences.push(temp);
      }
    }
    return channelPreferences;
  },
  /**
 *saveAlerts- function that saves/updates alerts changed
 * @param {Object} alerts - alerts array
 */
  saveAlertPreferences: function(alertWidget) {
    var self = this;
    var id = self.presenter.getCurrentCustomerDetails().Customer_id;
    var alertsChannelData = this.getSelectedAlertsChannels(alertWidget);
    var isvalidAlertTypePreference= this.validateAlertsSegmentData(alertWidget.segAlerts2);
    var subscriptionStatus = self.view.alerts.editAlertCategoryStatusSwitch.switchToggle.selectedIndex === 1 ? false : true;
    if(self.channelCount === 0)
    {
      this.view.alerts.flxAlertChannelError.setVisibility(true);
    }
    if(isvalidAlertTypePreference && self.channelCount !== 0){
      var alertTypePreference = this.fetchAlertsSegmentData(alertWidget.segAlerts2);
      var alertsData = {
        channelPreference: alertsChannelData,
        typePreference: alertTypePreference,
        CustomerId: id,
        isSubscribed:  subscriptionStatus,
        AlertCategoryId: self.prefData.AlertCategoryId,
        accNumLevel:"",
      };
      var accFlex = this.getAccountCategoryFlexName();
      var btnName = accFlex.children[0];
      var btnSkin = this.view.alerts[btnName].skin;
      if(btnSkin === "sknBtnUtilActive485b7512pxBold"){
        var secData = this.view.alerts.segAlertCategory.data[0][0];
        var isAccountNumLevel = secData.isAlertsAccountNumberLevel;
        
        if(isAccountNumLevel){
          alertsData.accNumLevel = true;
          var selInd = this.view.alerts.segAlertCategory.selectedRowIndex;
          if(selInd){
            alertsData["AccountId"]= this.view.alerts.segAlertCategory.data[selInd[0]][1][selInd[1]].accountId;
          } 
        } else{
          alertsData.accNumLevel = false;
          var secInd = this.view.alerts.segAlertCategory.selectedsectionindex || 0;
          alertsData["AccountTypeName"]= this.view.alerts.segAlertCategory.data[secInd][0].btnAccountName.text;
        }
      }
      
      this.presenter.setAlertPreferences(alertsData);
    }
  },
  disableEditAlertChannels : function(enable){
    var widget = this.view.alerts;
    var i;
    if(enable === 0){ // category enabled
      this.view.alerts.flxClickBlocker.setVisibility(false);
      for (i = 1; i <= 4; i++) {
        widget["imgCheckBoxChannel"+i].src =
          widget["imgCheckBoxChannel"+i].src === this.AdminConsoleCommonUtils.checkboxDisable ?
          this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
        widget["imgCheckBoxChannel"+i].hoverSkin = "sknCursor";

      }
    }else if(enable === 1){ //category disabled
      this.view.alerts.flxClickBlocker.setVisibility(true);
      for (i = 1; i <= 4; i++) {
        widget["imgCheckBoxChannel"+i].src =
          widget["imgCheckBoxChannel"+i].src === this.AdminConsoleCommonUtils.checkboxSelected ?
          this.AdminConsoleCommonUtils.checkboxDisable : this.AdminConsoleCommonUtils.checkboxnormal;
        widget["imgCheckBoxChannel"+i].hoverSkin = "sknCursorDisabled";
      }
    }
  },
  sendSubAlerts: function (data) {
    var alerts = data.alerts.map(this.mapSubAlertsData);
    if (data.Enabled === "true") {
      this.view.alerts.lblStatus.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Enabled");
      this.view.alerts.lblStatusIcon.text = "";
      this.view.alerts.lblStatusIcon.skin = "sknFontIconActivate";
      this.setSubAlerts(alerts, false);
      this.view.alerts.flxHeaderValue.setVisibility(false);
      this.view.alerts.listBoxAccounts.setVisibility(false);
      this.view.alerts.flxOverLay.setVisibility(false);
      this.view.alerts.flxSubAlerts.setVisibility(true);
    } else {
      this.view.alerts.lblStatus.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Disabled");
      this.view.alerts.lblStatusIcon.text = "";
      this.view.alerts.lblStatusIcon.skin = "sknfontIconInactive";
      this.view.alerts.flxOverLay.setVisibility(false);
      this.view.alerts.flxSubAlerts.setVisibility(false);
    }
    this.view.forceLayout();
  },
  mapSubAlertsData: function (data) {
    return {
      "id": data.alertId,
      "description": data.name,
      "status": {
        "text": data.isSelected === "true" ? this.sActive : this.sInactive
      },
      "push": data.isPushActive === "true" ? "" : "",
      "sms": data.isEmailActive === "true" ? "" : "",
      "email": data.isSmsActive === "true" ? "" : "",
      "statusIcon": {
        "skin": data.isSelected === "true" ? "sknFontIconActivate" : "sknfontIconInactive",
        "text": ""
      },
      "value": data.value ? data.value : "N.A." // add value term
    };
  },
  setSubAlerts: function (data, isAccount) {
   /* var widgetDataMap = {
      "lblHeaderDescription": "description",
      "lblHeaderStatus": "status",
      "lblHeaderPush": "push",
      "lblHeaderSMS": "sms",
      "lblheaderEmail": "email",
      "lblHeaderStatusIcon": "statusIcon",
    };*/
    var widgetDataMap = {
      "lblAccountNumValue":"lblAccountNumValue",
      "lblIconEnabled":"lblIconEnabled",
      "lblEnabledValue":"lblEnabledValue",
      "lblSeperator":"lblSeperator",
      "accountType":"accountType",
      "flxAlertPreferAccountsList":"flxAlertPreferAccountsList"
    };
   /* if (isAccount)
      widgetDataMap.lblValue = "value";*/
    this.view.alerts.segSubAlerts.widgetDataMap = widgetDataMap;
    this.view.alerts.segSubAlerts.setData(data);
  },


  resetAllSortImagesAlertHistory: function () {
    if (this.view.fonticonSortAlertName.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortAlertName.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortAlertName.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
    if (this.view.fonticonSortSentDate.text !== kony.adminConsole.utils.fonticons.SORTABLE_IMAGE) {
      this.view.fonticonSortSentDate.text = kony.adminConsole.utils.fonticons.SORTABLE_IMAGE;
      this.view.fonticonSortSentDate.skin = kony.adminConsole.utils.fonticons.SORTABLE_SKIN;
    }
  },

  resetAlertPrefrenceSortImages: function () {
    var self = this;
    self.determineSortFontIcon(this.sortBy, 'description', this.view.alerts.lblHeaderDescriptionIcon);
    self.determineSortFontIcon(this.sortBy, 'status.text', this.view.alerts.lblHeaderStatusIcon);
    self.determineSortFontIcon(this.sortBy, 'value', this.view.alerts.lblHeaderValueIcon);
  },
  showNotificationsScreen: function () {
    this.view.flxNotificationsWrapper.setVisibility(true);
    this.view.flxAlertPrefrenceWrapper.setVisibility(true);
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },

  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileAlerts_flxMainContent").onscroll = function () { };
  },
  setAllAlertPreviewTabsData: function(){
    var scopeObj = this;
    var previewTabData = scopeObj.previewData.CH_NOTIFICATION_CENTER;
    if(previewTabData !== undefined)
    {
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.view.lblPreviewTemplateBody.text = previewTabData.content;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnNotifCenter);
    }
    previewTabData = scopeObj.previewData.CH_EMAIL;
    if(previewTabData !== undefined)
    {
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnEmail);
      var emailDescription="<p style=\"text-align:justify\">"+previewTabData.content+"</p>";
      if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = emailDescription;
      } else {
        if(!document.getElementById("iframe_rtxViewer").newOnload) {
          document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
        }
        document.getElementById("iframe_rtxViewer").onload = function() {
          document.getElementById("iframe_rtxViewer").newOnload();
          document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =emailDescription;

        };
      }
    }
    previewTabData = scopeObj.previewData.CH_PUSH_NOTIFICATION;
    if(previewTabData !== undefined)
    {
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.view.lblPreviewTemplateBody.text = previewTabData.content;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnPushNoti);
    }
    previewTabData = scopeObj.previewData.CH_SMS;
    if(previewTabData !== undefined)
    {
      scopeObj.view.lblPreviewSubHeader1.text = previewTabData.subject;
      scopeObj.view.lblPreviewSubHeader2.text = previewTabData.sentDate;
      scopeObj.view.lblPreviewTemplateBody.text = previewTabData.content;
      scopeObj.setSkinForChannelTabs(scopeObj.view.btnSMS);
    }
  },
  showAlertPreview : function(){
    var scopeObj  = this;
    scopeObj.view.flxPreviewPopup.setVisibility(true);
    var previewData =scopeObj.view.segAlertHistory.selecteditems[0].data;
    scopeObj.previewData = previewData;
    scopeObj.view.btnSMS.setVisibility(false);
    scopeObj.view.btnPushNoti.setVisibility(false);
    scopeObj.view.btnNotifCenter.setVisibility(false);
    scopeObj.view.btnEmail.setVisibility(false);
    scopeObj.setAllAlertPreviewTabsData();
    if (previewData.CH_SMS !== undefined) {
      this.view.btnSMS.setVisibility(true);
    }
    if (previewData.CH_PUSH_NOTIFICATION !== undefined) {
      this.view.btnPushNoti.setVisibility(true);
    }
    if (previewData.CH_NOTIFICATION_CENTER !== undefined) {
      this.view.btnNotifCenter.setVisibility(true);
    }
    if (previewData.CH_EMAIL !== undefined) {
      this.view.btnEmail.setVisibility(true);
    }
  },

  getAlertChannelData: function(channel){
    var val;
    var json = {};
    if (!channel || (channel && channel.alerthistory_Status !== "SID_DELIVERYFAILED" && channel.alerthistory_Status !== "SID_DELIVERY_SUBMITTED")) {
      json = {
        "flxChannel": {
          "isVisible": false
        },
        "imgIconChannel": {
          "isVisible": false
        },
        "channel": {
          "text": ""
        },
      };
    }
    else if (channel.alerthistory_Status === "SID_DELIVERY_SUBMITTED") {
      val = channel.alerthistory_ChannelId;
      json = {
        "flxChannel": {
          "isVisible": true
        },
        "imgIconChannel": {
          "isVisible": true,
          "skin": "sknFontIconActivate",
          "text": "\ue94f"
        },
        "channel": {
          "text": channel.channeltext_Description
        },                
      };
      json[val] = {
        "subject": channel.alerthistory_Subject,
        "sentDate": this.getLocaleDate(channel.alerthistory_sentDate),
        "content": channel.alerthistory_Message
      };
    } else if (channel.alerthistory_Status === "SID_DELIVERYFAILED") {			
      val = channel.alerthistory_ChannelId;
      json = {
        "flxChannel": {
          "isVisible": true
        },
        "imgIconChannel": {
          "isVisible": true,
          "skin": "sknFontIconSuspend",
          "text": "\ue929"
        },
        "channel": {
          "text": channel.channeltext_Description
        },                
      };
      json[val] = {
        "subject": channel.alerthistory_Subject,
        "sentDate": this.getLocaleDate(channel.alerthistory_sentDate),
        "content": channel.alerthistory_Message
      };
    }
    return json;
  },
  getAlertNameAndSentDate: function(alertHistoryItem) {
    var lblAlertName;
    var lblSentDate;
    if (alertHistoryItem.CH_PUSH_NOTIFICATION !== null && alertHistoryItem.CH_PUSH_NOTIFICATION !== undefined)
    {
      lblAlertName = alertHistoryItem.CH_PUSH_NOTIFICATION.alertsubtype_Name;
      lblSentDate = this.getLocaleDate(alertHistoryItem.CH_PUSH_NOTIFICATION.alerthistory_sentDate);
    }
    if (alertHistoryItem.CH_SMS !== null && alertHistoryItem.CH_SMS !== undefined) 
    {
      lblAlertName = alertHistoryItem.CH_SMS.alertsubtype_Name;
      lblSentDate = this.getLocaleDate(alertHistoryItem.CH_SMS.alerthistory_sentDate);
    }
    if (alertHistoryItem.CH_EMAIL !== null && alertHistoryItem.CH_EMAIL !== undefined) 
    {
      lblAlertName = alertHistoryItem.CH_EMAIL.alertsubtype_Name;
      lblSentDate = this.getLocaleDate(alertHistoryItem.CH_EMAIL.alerthistory_sentDate);
    }
    if (alertHistoryItem.CH_NOTIFICATION_CENTER !== null && alertHistoryItem.CH_NOTIFICATION_CENTER !== undefined) 
    {
      lblAlertName = alertHistoryItem.CH_NOTIFICATION_CENTER.alertsubtype_Name;
      lblSentDate = this.getLocaleDate(alertHistoryItem.CH_NOTIFICATION_CENTER.alerthistory_sentDate);
    }
    return {"lblAlertName":lblAlertName,"lblSentDate":lblSentDate};
  },
  setDataForAlertHistorySegment : function (alertHistory) {
    var self  = this;
    var dataMap = {
      "flxCustMangAlertHistory": "flxCustMangAlertHistory",
      "data":"data",
      "flxAlertName": "flxAlertName",
      "lblAlertName": "lblAlertName",
      "flxSentDate": "flxSentDate",
      "lblSentDate": "lblSentDate",
      "flxFirstColoum": "flxFirstColoum",
      "flxChannel1": "flxChannel1",
      "lblChannel1": "lblChannel1",
      "imgIconChannel1": "imgIconChannel1",
      "flxChannel2": "flxChannel2",
      "lblChannel2": "lblChannel2",
      "imgIconChannel2": "imgIconChannel2",
      "flxChannel3": "flxChannel3",
      "lblChannel3": "lblChannel3",
      "imgIconChannel3": "imgIconChannel3",
      "flxChannel4": "flxChannel4",
      "lblChannel4": "lblChannel4",
      "imgIconChannel4": "imgIconChannel4",
      "lblSeperator": "lblSeperator",
      "flxAddAlertBtn": "flxAddAlertBtn",
      "btnAddAlerts": "btnAddAlerts"
    };
    var data = [];
    var toAdd;
    if (alertHistory.length > 0) {
      for (var i = 0; i < alertHistory.length; i++) {
        var channelAlertData = [];
        var item = self.getAlertNameAndSentDate(alertHistory[i]);
        var pushInfo = self.getAlertChannelData(alertHistory[i].CH_PUSH_NOTIFICATION);
        if (pushInfo.CH_PUSH_NOTIFICATION !== undefined) {
          channelAlertData.CH_PUSH_NOTIFICATION = pushInfo.CH_PUSH_NOTIFICATION;
        }
        var smsInfo = self.getAlertChannelData(alertHistory[i].CH_SMS);
        if (smsInfo.CH_SMS !== undefined) {
          channelAlertData.CH_SMS = smsInfo.CH_SMS;
        }
        var emailInfo = self.getAlertChannelData(alertHistory[i].CH_EMAIL);
        if (emailInfo.CH_EMAIL !== undefined) {
          channelAlertData.CH_EMAIL = emailInfo.CH_EMAIL;
        }
        var notificationCenterInfo = self.getAlertChannelData(alertHistory[i].CH_NOTIFICATION_CENTER);
        if (notificationCenterInfo.CH_NOTIFICATION_CENTER !== undefined) {
          channelAlertData.CH_NOTIFICATION_CENTER = notificationCenterInfo.CH_NOTIFICATION_CENTER;
        }		
        toAdd = {
          "data":channelAlertData,
          "flxAlertName": "flxAlertName",
          "lblAlertName": item.lblAlertName,
          "flxSentDate": "flxSentDate",
          "lblSentDate" : item.lblSentDate,
          "flxFirstColoum": "flxFirstColoum",
          "flxChannel1": pushInfo.flxChannel,
          "lblChannel1": "PUSH",
          "imgIconChannel1": pushInfo.imgIconChannel,
          "flxChannel2": smsInfo.flxChannel,
          "lblChannel2": "SMS",
          "imgIconChannel2": smsInfo.imgIconChannel,
          "flxChannel3": emailInfo.flxChannel,
          "lblChannel3": "EMAIL",
          "imgIconChannel3": emailInfo.imgIconChannel,
          "flxChannel4": notificationCenterInfo.flxChannel,
          "lblChannel4": "NOTIFICATION CENTER",
          "imgIconChannel4": notificationCenterInfo.imgIconChannel,
          "lblSeperator": "lblSeperator",
          "flxAddAlertBtn": "flxAddAlertBtn",
          "btnAddAlerts": {"text":"Preview","onClick":self.showAlertPreview},
          "template": "flxCustMangAlertHistory"
        };
        data.push(toAdd);
      }
      this.view.segAlertHistory.widgetDataMap = dataMap;
      this.view.segAlertHistory.setData(data);
      this.view.segAlertHistory.info = {
        "data": data,
        "searchAndSortData": data
      };

      this.view.flxAlertsHistorySegmentHeader.setVisibility(true);
      this.view.lblNotificationHeaderSeperator.setVisibility(true);
      this.view.rtxMsgNotifications.setVisibility(false);
      this.view.segAlertHistory.setVisibility(true);
      this.view.notificationsSearch.flxSubHeader.setVisibility(true);
    } else {
      this.view.segAlertHistory.setVisibility(false);
      this.view.lblNotificationHeaderSeperator.setVisibility(false);
      this.view.rtxMsgNotifications.setVisibility(true);
      this.view.flxAlertsHistorySegmentHeader.setVisibility(false);
      this.view.notificationsSearch.flxSubHeader.setVisibility(false);
    }
    this.view.notificationsSearch.tbxSearchBox.text = "";
    this.showNotificationsScreen();

  },  
  setSkinForChannelTabs: function (btnWidget) {
    this.view.btnSMS.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnPushNoti.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnEmail.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    this.view.btnNotifCenter.skin = "sknbtnBgf5f6f8Lato485c75Radius3Px12Px";
    btnWidget.skin = "sknbtnBgffffffLato485c75Radius3Px12Px";
  },
  setDataForNotificationsSegment: function (CustomerNotifications) {
    var dataMap = {
      "fonticonArrow": "fonticonArrow",
      "flxArrow": "flxArrow",
      "flxCustMangNotification": "flxCustMangNotification",
      "flxCustMangNotificationSelected": "flxCustMangNotificationSelected",
      "flxCustMangRequestDesc": "flxCustMangRequestDesc",
      "flxCustMangRequestHeader": "flxCustMangRequestHeader",
      "flxFirstColoum": "flxFirstColoum",
      "flxSeperator": "flxSeperator",
      "lblDesc": "lblDesc",
      "lblExpDate": "lblExpDate",
      "lblName": "lblName",
      "lblSeperator": "lblSeperator",
      "lblStartDate": "lblStartDate",
      "lblStatus": "lblStatus"
    };
    var data = [];
    var toAdd;
    if (CustomerNotifications.length > 0) {
      for (var i = 0; i < CustomerNotifications.length; i++) {
        var statusName;
        if (CustomerNotifications[i].Status_id.toUpperCase() === "SID_N_ACTIVE".toUpperCase()) {
          statusName = this.sActive;
        } else if (CustomerNotifications[i].Status_id.toUpperCase() === "SID_STARTINGSOON".toUpperCase()) {
          statusName = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Starting");
        } else if (CustomerNotifications[i].Status_id.toUpperCase() === "SID_EXPIRED".toUpperCase()) {
          statusName = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Expired");
        }
        toAdd = {
          "fonticonArrow": {
            "text": "î¤¢",
            "isVisible": true
          },
          "flxArrow": "flxArrow",
          "flxCustMangNotification": "flxCustMangNotification",
          "flxCustMangNotificationSelected": "flxCustMangNotificationSelected",
          "flxCustMangRequestDesc": "flxCustMangRequestDesc",
          "flxCustMangRequestHeader": "flxCustMangRequestHeader",
          "flxFirstColoum": "flxFirstColoum",
          "flxSeperator": "flxSeperator",

          "lblDesc": CustomerNotifications[i].Description,
          "lblExpDate": this.getLocaleDate(CustomerNotifications[i].ExpirationDate),
          "lblName": CustomerNotifications[i].Name,
          "lblSeperator": ".",
          "lblStartDate": this.getLocaleDate(CustomerNotifications[i].StartDate),
          "lblStatus": {
            "text": statusName
          },
          "template": "flxCustMangNotification"
        };
        data.push(toAdd);
      }
      this.view.segNotifications.widgetDataMap = dataMap;
      this.view.segNotifications.setData(data);
      this.view.segNotifications.info = {
        "data": data,
        "searchAndSortData": data
      };
      this.view.flxNotificationsSegmentHeader.setVisibility(true);
      this.view.lblNotificationHeaderSeperator.setVisibility(true);
      this.view.rtxMsgNotifications.setVisibility(false);
      this.view.segNotifications.setVisibility(true);
      this.view.notificationsSearch.flxSubHeader.setVisibility(true);
    } else {
      this.view.flxNotificationsSegmentHeader.setVisibility(false);
      this.view.lblNotificationHeaderSeperator.setVisibility(false);
      this.view.rtxMsgNotifications.setVisibility(true);
      this.view.segNotifications.setVisibility(false);
      this.view.notificationsSearch.flxSubHeader.setVisibility(false);
    }
    this.view.notificationsSearch.tbxSearchBox.text = "";
    this.showNotificationsScreen();
  },
  adjustSegmentPosition : function(event,isDisplay){
    var self = this;
    var catFlex = this.view.alerts.flxCategoryRowContainer.children;
    if(isDisplay){
      var segFlexPos = event.frame.y + (event.frame.height === 0 ? 50 : event.frame.height);
      self.view.alerts.flxSubCategory.top = (segFlexPos - 10) + "dp";
      var downwardFlex = [];
      for(var i=0;i<catFlex.length;i++){
        if((catFlex[i] === event.id) && ((i+1) <= catFlex.length)){
          downwardFlex = catFlex.slice(i+1);
          break;
        }
      }
      self.view.forceLayout();
      var pos = self.view.alerts.flxSubCategory.frame.height; 
      //adjust the top of remaining category flexs at bottom 
      if(downwardFlex.length > 0){
        this.view.alerts[downwardFlex[0]].top = (pos - 10 )+"dp";
      }
    }else{
      //reset to normal positions
      for(var j=0;j<catFlex.length;j++){
        self.view.alerts[catFlex[j]].top = "0dp";
      }
    }
  },
  /*
   *on click of account-id's list and update selected tabs UI
   */
  onClickOfSegSubAlerts : function(){
    var selectedItem = this.view.alerts.segSubAlerts.selectedRowItems[0];
    var accSegData = this.view.alerts.segAlertCategory.info.data;
    var segData = this.view.alerts.segAlertCategory.data;
    var rowData = [];
    var rowToSel = [];
    for(var i=0;i<accSegData.length;i++){
      if(selectedItem.accountType === accSegData[i][0].btnAccountName.text){
        rowData = accSegData[i][1];
        segData[i][0].lblArrow.isVisible = false;
        segData[i][1] = accSegData[i][1];
        rowToSel.push(i);
        break;
      }
    }
    
    for(var j=0;j<rowData.length;j++){
      if(rowData[j].accountId === selectedItem.lblAccountNumValue){
        this.view.alerts.lblAlertDetailAccountValue.text = rowData[j].accountId;
        this.adjustAlertPreferencesListTop(1);
        rowToSel.push(j);
        break;
      }
    }
    this.view.alerts.segAlertCategory.setData(segData);
    this.view.alerts.segAlertCategory.selectedRowIndex = rowToSel;
    this.view.alerts.segAlertCategory.selectedsectionindex = rowToSel[0];
    this.onClickOfAccountNumber();
    this.toggleArrowForSegmentRow();
    var accTabFlex = this.getAccountCategoryFlexName();
    this.adjustSegmentPosition(accTabFlex,true);
  },
  /*
  *  returns account category's flex path
  */
  getAccountCategoryFlexName : function(){
    //get path for accounts tab flex
    var flexList = this.view.alerts.flxCategoryRowContainer.children;
    var eventFlex ="";
    for(var k=0;k<flexList.length;k++){
      var catTab = this.view.alerts[flexList[k]];
      var catFlexLabel = catTab.children[0];
      var lblText = this.view.alerts[catFlexLabel].text;
      if(lblText.toLowerCase().indexOf("account") >= 0){
        eventFlex = catTab;
      }
    }
    return eventFlex;
  },
  /*
   * adjust top value when we display account id at heading
   */
  adjustAlertPreferencesListTop : function(cat){
    if(cat === 1){
      this.view.alerts.lblAlertDetailAccountValue.setVisibility(true);
      this.view.alerts.flxSeperator.top = "172dp";
      this.view.alerts.flxAlerts2.top = "173dp";
    }else{
      this.view.alerts.lblAlertDetailAccountValue.setVisibility(false);
      this.view.alerts.flxSeperator.top = "150dp";
      this.view.alerts.flxAlerts2.top = "151dp";
    }
    this.view.forceLayout();
  },
});
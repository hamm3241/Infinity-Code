define({ 

  isCreate : false,
  isDefaultCampaign : false,
  isEdit : false,
  isCopy : false,
  campaignSpecifications : {},
  defaultCampaignObject : {},
  channelNameMapper : {
    "MOBILE" : kony.i18n.getLocalizedString("i18n.frmAdManagement.NativeMobileApp"),
    "WEB" : kony.i18n.getLocalizedString("i18n.frmAdManagement.WebApp")
  },
  moduleNameMapper : {
    "PRELOGIN" : [kony.i18n.getLocalizedString("i18n.frmAdManagement.PreLoginScreen"), "flxPreLogin"],
    //"POSTLOGIN" : [kony.i18n.getLocalizedString("i18n.frmAdManagement.PostLoginFullScreenInterstitialAd"), "flxPostLogin"],
    "ACCOUNT_DASHBOARD" : [kony.i18n.getLocalizedString("i18n.frmAdManagement.AccountDashboard"), "flxDashboard"],
    "APPLY_FOR_NEW_ACCOUNT" : [kony.i18n.getLocalizedString("i18n.frmAdManagement.ApplyforNewAcc"), "flxNewAccount"]
  },
  breakpointMapper : {
    "640" : kony.i18n.getLocalizedString("i18n.frmAdManagement.Mobile"),
    "1024" : kony.i18n.getLocalizedString("i18n.frmAdManagement.Tablet"),
    "1366" : kony.i18n.getLocalizedString("i18n.frmAdManagement.Desktop")
  },
  availableCustomerGroups : [],
  groupsToAdd : [],
  groupsToDelete : [],
  hasValidBasicDetails : false,
  hasValidSpecifiactions : false,
  previousPriority : "",
  campaignData : {},
  existingCustomerGroups : [],
  urlRegex : /\b(https|ftp):(\/\/|\\\\)[^\s]+\b$/,
  imageValidationRegex : /\b(https|ftp):(\/\/|\\\\)[^\s]+\.(png|jpg|gif)\b$/,
  hasUniqueCampaignName : true,
  imageCounterMaxValue : 3,
  prevSelectedRadioId : "",
  selectedRadioId : "",
  templateId : undefined ,
  widgetArrowArray : [],
  widgetArray : [],
  widgetCompletedArray : [],
  inAppSelected : null,
  inAppPopupSelected: null,
  offlineSelected : null,
  selectedWidgetMapper : {},
  selectedWidgetArrowMapper : {},
  navigateToScreenId : "",
  screenValidationMapper : {},
  allDatasets : [],
  allAttributes : {},
  isRTEDemo : true,
  existingRolesAllData: null,
  roleRowIndex: -1,
  prevSelRoleindex : {main: null, seg:null},
  campaignId: -1,
  attrubuteId : "",
  adCount : 0,
  currentEventObj : null,
  isExisitingPriority : false,
  isPriorityTextChange : false,
  selectedDatasetCount : 0,
  selectedProfileCount : 0,
  currentDatasetId : undefined,
  currentProfileId : undefined,
  selectedAttributes : [],
  selectedDatasets : [],
  selectedProfiles : [],
  allProfiles : {},
  eventType: null,
  addEventData: {},
  campaignNamePriorityList:[],
  allAttributesList : [],
  offlineTemplateMapper : { "SMS" : ["txtAreaSMSContent", "flxSMSChannelParent"],
                           "EMAIL" : ["txtFieldSubject", "flxEmailChannelParent"],
                           "PUSH NOTIFICATIONS" : ["txtAreaPushNotificationsValue", "flxEmailChannelParent"]  },
  templatesMapper : {},
  activestatus : "SCHEDULED_ACTIVE_COMPLETED",
  statusFilterSelection : [],
  emailContent : "",
  hasUnsavedChanges : false,

  willUpdateUI: function (context) {
    var scopeObj = this;
    if(context) {
      this.updateLeftMenu(context);
      if(context.action && context.action === "createCampaign") {
        scopeObj.isCreate = true;
        scopeObj.isEdit = false;
        scopeObj.isDefaultCampaign = false;
        scopeObj.isCopy = false;
        scopeObj.campaignSpecifications = {"screens" : context.screens };
        scopeObj.resetAllFields();
        scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateAdCampaignCAPS");
      }
      if(context.action && (context.action === "editCampaign" || context.action === "copyCampaign")) {
        scopeObj.isCreate = false;
        scopeObj.isEdit = context.isEdit;
        scopeObj.isDefaultCampaign = false;
        scopeObj.isCopy = !context.isEdit;
        scopeObj.campaignSpecifications = context.campaignSpecifications ;
        scopeObj.campaignData = context.campaignData ;
        scopeObj.resetAllFields();
        scopeObj.setEditCampaignData();
        let screenText = scopeObj.isEdit ? context.campaignData.campaignName : kony.i18n.getLocalizedString("i18n.frmAdManagement.CopyCampaign");
        scopeObj.view.breadcrumbs.lblCurrentScreen.text = screenText.toUpperCase();
      }
      if(context.action && context.action === "defaultCampaign") {
        scopeObj.isCreate = false;
        scopeObj.isEdit = false;
        scopeObj.isDefaultCampaign = true;
        scopeObj.setDefaultCampaignSpecifications(context.defaultCampaignObject);
        scopeObj.resetAllFields();
        scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.DefaultCampaignCAPS");
      }
      if(context.action && context.action === "CampaignPriorityList") {
        scopeObj.setCampaignPriorityList(context.campaignList);
        scopeObj.showCampaignPriorityList();
      }
      if(context.action && context.action === "checkPriority") {
        scopeObj.hasExistingPriority(context.campaignList);
      }
      if(context.action && context.action === "getCustomerGroups") {
        scopeObj.formatCustomerRolesData(context.customerRoles);
        scopeObj.showCustomerRoles();
        scopeObj.navigateToScreen();
      }
      if (context.action && context.action === "ErrorOccured") {
        kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        scopeObj.view.toastMessage.showErrorToastMessage("Something went wrong. Please try again.", scopeObj);
      }
      if (context.toastModel) {
        if (context.toastModel.status === "SUCCESS") {
          scopeObj.view.toastMessage.showToastMessage(context.toastModel.message, scopeObj);
          kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        } else {
          scopeObj.view.toastMessage.showErrorToastMessage(context.toastModel.message, scopeObj);
          kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        }
      }
      if(context.action && context.action === "validateCampaignName") {
        if(context.campaignExists) {
          scopeObj.view.txtAdName.skin = "skinredbg" ;
          scopeObj.view.AdNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignNameExists");
          scopeObj.view.AdNameError.setVisibility(true);
          scopeObj.hasUniqueCampaignName = false;
        }  else if(scopeObj.hasValidBasicDetails) {
          scopeObj.navigateToScreen();
        }
      }
      if(context.action && context.action === "getAttributes") {
        scopeObj.allDatasets = context.datasets;
        scopeObj.populateDatasets();
        scopeObj.navigateToScreen();
      }
      if(context.action && context.action === "getProfiles") {
        context.profiles = scopeObj.filterActiveProfiles(context.profiles);
        scopeObj.viewExistingRolesPopUp(context.profiles);
      }
      if(context.action && context.action === "createProfile") {
        scopeObj.view.commonButtons.btnNext.setVisibility(false);
        scopeObj.view.commonButtons.btnSave.setVisibility(true);
        scopeObj.allProfiles[context.profile.profileId] = context.profile;
        scopeObj.selectedProfiles.push(context.profileId);
        scopeObj.populateTargetCustomerRoles([context.profile], true);
      }
      if(context.action && context.action === "campaignNameAndPriorityExistingConflicts") {
        if(context.campaignExists) {
          scopeObj.view.txtAdName.skin = "skinredbg" ;
          scopeObj.view.AdNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignNameExists");
          scopeObj.view.AdNameError.setVisibility(true);
          scopeObj.hasUniqueCampaignName = false;
        }
        scopeObj.hasExistingPriority(context.campaignList);
        if(scopeObj.hasValidBasicDetails && scopeObj.hasUniqueCampaignName && !scopeObj.isExisitingPriority) {
          scopeObj.navigateToScreenId = "1";
          scopeObj.navigateToScreen();
        }
      }
      if(context.action && context.action === "getEvents") {
        scopeObj.setAddEventsData(context.events);
      }
      if(context.action && context.action === "getProductsByProductGroup") {
        scopeObj.setProductNameList(context.items);
      }
      if(context.action && context.action === "getAllProductGroups") {
        scopeObj.setProductGroupList(context.allProductGroups);
      }
      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
        else
          kony.adminConsole.utils.hideProgressBar(scopeObj.view);
      }
    }
    scopeObj.view.forceLayout();
  },

  frmCampaignDetailsPreShow : function() {
    var scopeObj = this ;
    scopeObj.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    var containerHeight = kony.os.deviceInfo().screenHeight - 145;
    scopeObj.view.flxContainer.height = containerHeight +"dp";
    scopeObj.view.flxDetails.height = containerHeight +"dp";
    scopeObj.view.flxContent.height = (containerHeight - 80) +"dp";
    scopeObj.view.flxAddOptionsSegment.height = (containerHeight - 195) + "dp";
    scopeObj.view.flxSegSelectedOptions.height = (containerHeight - 130) + "dp";
    scopeObj.view.commonButtons.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    scopeObj.view.commonButtons.btnSave.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    scopeObj.view.commonButtons.btnNext.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    scopeObj.view.commonButtons.btnNext.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
    scopeObj.view.flxToastMessage.setVisibility(false);
    scopeObj.view.commonButtons.btnNext.setVisibility(false);
    scopeObj.view.commonButtons.btnSave.setVisibility(true);
    scopeObj.widgetArray = [];
    scopeObj.widgetArrowArray = [];
    scopeObj.widgetCompletedArray = [];
    scopeObj.selectedWidgetMapper = {"0" : scopeObj.view.verticalTabs1.btnOption1, "1" : scopeObj.view.verticalTabs1.btnSubOption31,
                                     "2" : scopeObj.view.verticalTabs1.btnSubOption32, "3" : scopeObj.view.verticalTabs1.btnOption4,
                                     "4" : scopeObj.view.verticalTabs1.btnSubOption1, "5" : scopeObj.view.verticalTabs1.btnSubOption2,
                                     "6" : scopeObj.view.verticalTabs1.btnSubOption3, "7" : scopeObj.view.verticalTabs1.btnSubOption4, "8" : scopeObj.view.verticalTabs1.btnOption5} ;
    scopeObj.selectedWidgetArrowMapper = {"0" : scopeObj.view.verticalTabs1.lblSelected1, "1" : scopeObj.view.verticalTabs1.lblSelectedSub31,
                                          "2" : scopeObj.view.verticalTabs1.lblSelectedSub32, "3" : scopeObj.view.verticalTabs1.lblSelected4,
                                          "4" : scopeObj.view.verticalTabs1.lblSelectedSub1, "5" : scopeObj.view.verticalTabs1.lblSelectedSub2,
                                          "6" : scopeObj.view.verticalTabs1.lblSelectedSub3, "7" : scopeObj.view.verticalTabs1.lblSelectedSub4, "8" : scopeObj.view.verticalTabs1.lblSelected5} ;
    scopeObj.setFlowActions();
    scopeObj.closePopup();
  },

  frmCampaignDetailsPostShow : function(){
    var scopeObj = this ;
    scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmAdDetails_txtPriority");
    scopeObj.widgetArrowArray = [scopeObj.view.verticalTabs1.lblSelected1, scopeObj.view.verticalTabs1.lblSelectedSub31,
                                 scopeObj.view.verticalTabs1.lblSelectedSub32, scopeObj.view.verticalTabs1.lblSelected4,
                                 scopeObj.view.verticalTabs1.lblSelectedSub1, scopeObj.view.verticalTabs1.lblSelectedSub2,
                                 scopeObj.view.verticalTabs1.lblSelectedSub3,scopeObj.view.verticalTabs1.lblSelectedSub4, scopeObj.view.verticalTabs1.lblSelected5];
    scopeObj.widgetArray = [scopeObj.view.verticalTabs1.btnOption1, scopeObj.view.verticalTabs1.btnSubOption31,
                            scopeObj.view.verticalTabs1.btnSubOption32, scopeObj.view.verticalTabs1.btnOption4,
                            scopeObj.view.verticalTabs1.btnSubOption1, scopeObj.view.verticalTabs1.btnSubOption2,
                            scopeObj.view.verticalTabs1.btnSubOption3, scopeObj.view.verticalTabs1.btnSubOption4, scopeObj.view.verticalTabs1.btnOption5];
    scopeObj.widgetCompletedArray = [scopeObj.view.verticalTabs1.lblCompleted1, scopeObj.view.verticalTabs1.lblCompleted3,
                                     scopeObj.view.verticalTabs1.lblCompleted4, scopeObj.view.verticalTabs1.lblCompleted2, scopeObj.view.verticalTabs1.lblCompleted5];
    scopeObj.navigateToScreenId = "0";
    scopeObj.navigateToScreen();
    if(scopeObj.isEdit){
      setTimeout(function() {
        scopeObj.view.customStartDate.value = scopeObj.campaignData.startDate;
        scopeObj.view.customStartDate.resetData = scopeObj.campaignData.startDate;
        scopeObj.view.customEndDate.value = scopeObj.campaignData.endDate;
        scopeObj.view.customEndDate.resetData = scopeObj.campaignData.endDate;
      }, 100);
    } else {
      scopeObj.view.customStartDate.value = "";
      scopeObj.view.customEndDate.value = "";
    }
  },

  setFlowActions: function() {
    var scopeObj = this;

    scopeObj.view.tbxSearchBox.onKeyUp = function() {
      scopeObj.view.flxClearSearch.setVisibility(true);
      scopeObj.showCustomerRoles();
    };

    scopeObj.view.tbxSearchBox.onTouchStart = function() {
      scopeObj.view.flxClearSearch.setVisibility(true);
    };

    scopeObj.view.tbxSearchBox.onTouchEnd = function() {
      scopeObj.view.flxClearSearch.setVisibility(false);
    };

    scopeObj.view.flxClearSearch.onClick = function(){
      scopeObj.view.tbxSearchBox.text = "";
      scopeObj.showCustomerRoles();
    };

    scopeObj.view.tbxSearchBox.onTouchStart = function() {
      scopeObj.view.flxClearSearch.setVisibility(true);
    };

    scopeObj.view.btnAddAll.onClick = function(){
      scopeObj.addAllGroups();
    };

    scopeObj.view.btnRemoveAll.onClick = function(){
      scopeObj.deleteAllGroups();
    };

    scopeObj.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.unsavedChanges();
    };

    scopeObj.view.commonButtons.btnCancel.onClick = function() {
      scopeObj.unsavedChanges();
    };

    scopeObj.view.commonButtons.btnSave.onClick = function(){
      scopeObj.validateAndNavigate(undefined,true);
    };

    scopeObj.view.verticalTabs1.btnOption1.onClick = function() {
      scopeObj.validateAndNavigate("0",false);
    };

    scopeObj.view.verticalTabs1.btnSubOption31.onClick = function() {
      if(scopeObj.screenValidationMapper["1"])
        scopeObj.validateAndNavigate("1",false);
    };

    scopeObj.view.verticalTabs1.btnSubOption32.onClick = function() {
      if(scopeObj.screenValidationMapper["2"])
        scopeObj.validateAndNavigate("2",false);
    };

    scopeObj.view.verticalTabs1.btnOption4.onClick = function() {
      if(scopeObj.screenValidationMapper["3"])
        scopeObj.validateAndNavigate("3",false);
    };

    scopeObj.view.verticalTabs1.btnSubOption1.onClick = function(){
      if(scopeObj.screenValidationMapper["4"])
        scopeObj.validateAndNavigate("4",false);
    };

    scopeObj.view.verticalTabs1.btnSubOption2.onClick = function(){
      if(scopeObj.screenValidationMapper["5"])
        scopeObj.validateAndNavigate("5",false);
    };

    scopeObj.view.verticalTabs1.btnSubOption3.onClick = function(){
      if(scopeObj.screenValidationMapper["6"])
        scopeObj.validateAndNavigate("6",false);
    };

    scopeObj.view.verticalTabs1.btnSubOption4.onClick = function(){
      if(scopeObj.screenValidationMapper["7"])
        scopeObj.validateAndNavigate("7",false);
    };
    
    scopeObj.view.verticalTabs1.btnOption5.onClick = function(){
      if(scopeObj.screenValidationMapper["8"])
        scopeObj.validateAndNavigate("8",false);
    };

    scopeObj.view.txtAdName.onKeyUp = function() {
      scopeObj.view.txtAdName.skin = "txtD7d9e0";
      scopeObj.view.AdNameError.setVisibility(false);
      var textLen = scopeObj.view.txtAdName.text.length ;
      scopeObj.view.lblAdNameSize.text = textLen + "/" + scopeObj.view.txtAdName.maxtextlength;
      scopeObj.view.lblAdNameSize.setVisibility(true);
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.flxBasicDetails.forceLayout();
    };

    scopeObj.view.txtAdName.onTouchStart = function() {
      scopeObj.view.txtAdName.setEnabled(!scopeObj.isDefaultCampaign); 
      if(!scopeObj.isDefaultCampaign){
        var textLen = scopeObj.view.txtAdName.text.length ;
        scopeObj.view.lblAdNameSize.text = textLen + "/" + scopeObj.view.txtAdName.maxtextlength;
        scopeObj.view.lblAdNameSize.setVisibility(true);
        scopeObj.view.flxAdName.forceLayout();
      }
    };

    scopeObj.view.txtAdName.onEndEditing = function(){
      scopeObj.view.lblAdNameSize.setVisibility(false);
    };

    scopeObj.view.txtDescription.onKeyUp = function() {
      scopeObj.view.txtDescription.skin = "skntxtAread7d9e0";
      scopeObj.view.AdDescriptionError.setVisibility(false);
      var textLen = scopeObj.view.txtDescription.text.length ;
      scopeObj.view.lblDescriptionSize.text = textLen + "/" + scopeObj.view.txtDescription.maxtextlength;
      scopeObj.view.lblDescriptionSize.setVisibility(true);
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.flxBasicDetails.forceLayout();
    };

    scopeObj.view.txtDescription.onTouchStart = function() {
      var textLen = scopeObj.view.txtDescription.text.length ;
      scopeObj.view.lblDescriptionSize.text = textLen + "/" + scopeObj.view.txtDescription.maxtextlength;
      scopeObj.view.lblDescriptionSize.setVisibility(true);
      scopeObj.view.flxDescription.forceLayout();
    };

    scopeObj.view.txtDescription.onEndEditing = function(){
      scopeObj.view.lblDescriptionSize.setVisibility(false);
    };

    scopeObj.view.txtPriority.onKeyUp = function() {
      scopeObj.view.txtPriority.skin = "txtD7d9e0";
      scopeObj.view.PriorityError.setVisibility(false); 
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.flxBasicDetails.forceLayout();
    };

    scopeObj.view.txtPriority.onTextChange = function() {
      scopeObj.isPriorityTextChange = true;
    };

    scopeObj.view.txtPriority.onTouchStart = function() {
      scopeObj.view.txtPriority.setEnabled(!scopeObj.isDefaultCampaign);
    };

    scopeObj.view.btnPriorityList.onClick = function() {
      scopeObj.showCampaignPriorityList();
    };

    scopeObj.view.flxStartDate.onTouchStart = function(){
      scopeObj.view.flxStartDate.skin = "sknFlxCalendar";
      scopeObj.view.StartDateError.setVisibility(false);
      scopeObj.view.lblStartDateTip.setVisibility(true);
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.forceLayout();
    };

    scopeObj.view.flxEndDate.onTouchStart = function(){
      scopeObj.view.flxEndDate.skin = "sknFlxCalendar";
      scopeObj.view.EndDateError.setVisibility(false);
      scopeObj.view.lblEndDateTip.setVisibility(true);
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.forceLayout();
    };

    scopeObj.view.lblPopupClose.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.popUp.btnPopUpCancel.onClick = function() {
      if(scopeObj.view.popUp.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.frmAdManagement.ExistingPriorityConflictHeader")){
        scopeObj.view.txtPriority.text = scopeObj.previousPriority;
      }
      scopeObj.closePopup();
    };

    scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
      if(scopeObj.view.popUp.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.frmAdManagement.ExistingPriorityConflictHeader")){
        scopeObj.previousPriority = scopeObj.view.txtPriority.text;
        if(scopeObj.hasValidBasicDetails && scopeObj.hasUniqueCampaignName && scopeObj.isExisitingPriority) {
          scopeObj.navigateToScreenId = "1";
          scopeObj.navigateToScreen();
        }
      } else if(scopeObj.view.popUp.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.frmAdManagement.TurningoffDisplayAds")) {
        scopeObj.currentEventObj.selectedIndex = 1;
        scopeObj.currentEventObj.parent.parent.flxChannelDetails.setVisibility(false);
        scopeObj.currentEventObj.parent.parent.flxHideAdContainer.setVisibility(true);
        var imageContainers = scopeObj.currentEventObj.parent.parent.flxChannelDetails;
        for (var i = 0; i < imageContainers.children.length; i++) {
          var imgSources = imageContainers[imageContainers.children[i]].flxImageSource;
          for (var j = 0; j < imgSources.children.length; j++) {
            imgSources[imgSources.children[j]].txtImgSource.text = "";
          }
          imageContainers[imageContainers.children[i]].flxTargetSourceValue.txtTargetSource.text = "";
        }
        scopeObj.currentEventObj.parent.parent.forceLayout();
        scopeObj.adCount--;
      } else if(scopeObj.view.popUp.lblPopUpMainMessage.text === "Missing offline channel configuration") {
        scopeObj.closePopup();
      }
      scopeObj.closePopup();
    };

    scopeObj.view.popUp.flxPopUpClose.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.flxClose.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.lblCampaignHeader.onClick = function(){
      scopeObj.sortPriorityList('name');
    };

    scopeObj.view.lblCampaignSort.onClick = function(){
      scopeObj.sortPriorityList('name');
    };

    scopeObj.view.lblPriorityHeader.onClick = function(){
      scopeObj.sortPriorityList('priority');
    };

    scopeObj.view.lblPrioritySort.onClick = function(){
      scopeObj.sortPriorityList('priority');
    };

    scopeObj.view.warningpopup.btnPopUpDelete.onClick = function() {
      var headerText = scopeObj.view.warningpopup.lblPopUpMainMessage.text;
      if(headerText === kony.i18n.getLocalizedString("i18n.frmAdManagement.RemoveRole")){
        var segData = scopeObj.view.segTargetCustomerRoles.data;
        scopeObj.updateGroups(segData[roleRowIndex].groupId,false);
        // var dataToBeRemoved = {
        //   "id": campaignId,
        //   "groupsToBeRemoved": [{"groupId":segData[roleRowIndex].groupId}]
        // };
        // scopeObj.presenter.updateCampaignGroup(dataToBeRemoved);
        scopeObj.view.segTargetCustomerRoles.removeAt(roleRowIndex);
        var hasRolesAssigned = scopeObj.view.segTargetCustomerRoles.data.length > 0;
        scopeObj.view.flxNoRoles.setVisibility(!hasRolesAssigned);
        scopeObj.view.flxViewDetails.setVisibility(hasRolesAssigned);
        scopeObj.view.commonButtons.btnNext.setVisibility(hasRolesAssigned);
        scopeObj.view.commonButtons.btnSave.setVisibility(!hasRolesAssigned);
        scopeObj.closePopup();
        scopeObj.roleRowIndex = -1;
        scopeObj.campaignId = -1;
      } else if(headerText === kony.i18n.getLocalizedString("i18n.frmAdManagement.RemoveAttribute")){
        var addAttrFlex = scopeObj.view.flxAddAttributes["addAttr" + scopeObj.attrubuteId];
        if (addAttrFlex) {
          scopeObj.view.flxAddAttributes.remove(addAttrFlex);
          scopeObj.removeAttribute(scopeObj.attrubuteId);
        }
        var hasData = scopeObj.view.flxAddAttributes.children.length > 0 ;
        scopeObj.view.flxAddAttributes.setVisibility(hasData);
        scopeObj.view.flxNoAttributes.setVisibility(!hasData);
        scopeObj.view.btnAddMoreAttrs.setVisibility(hasData);
        scopeObj.closePopup();
      } else if(headerText === kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderUnsavedChanges")){
        scopeObj.closePopup();
        scopeObj.presenter.fetchCampaigns();
      } else if(headerText === kony.i18n.getLocalizedString("i18n.frmAdManagement.popupHeaderDataReplaceWarning")){
        scopeObj.copyPopupBannerDetails("MobilePopupDetails", "WebPopupDetails");
        scopeObj.resetSkinPopupDetails("MobilePopupDetails");
        scopeObj.closePopup();
      } else {
        scopeObj.undoChanges();
      }
    };

    scopeObj.view.warningpopup.flxPopUpClose.onClick = function(){
      var headerText = scopeObj.view.warningpopup.lblPopUpMainMessage.text ;
      if(headerText === kony.i18n.getLocalizedString("i18n.frmAdManagement.ReduceAdPlaceholders")) {
        scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + scopeObj.selectedRadioId].src = "radio_notselected.png";
        scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + scopeObj.prevSelectedRadioId].src = "radio_selected.png";
      }
      scopeObj.closePopup();
    };

    scopeObj.view.warningpopup.btnPopUpCancel.onClick = function() {
      var headerText = scopeObj.view.warningpopup.lblPopUpMainMessage.text ;
      if(headerText === kony.i18n.getLocalizedString("i18n.frmAdManagement.ReduceAdPlaceholders")) {
        scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + scopeObj.selectedRadioId].src = "radio_notselected.png";
        scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + scopeObj.prevSelectedRadioId].src = "radio_selected.png";
      }
      scopeObj.closePopup();
    };

    scopeObj.view.flxAttributesPopUpClose.onClick = function() {
      scopeObj.closePopup();
      scopeObj.resetAttributeSelectionOnCancel();
    };

    scopeObj.view.btnAttributesCancel.onClick = function() {
      scopeObj.closePopup();
      scopeObj.resetAttributeSelectionOnCancel(); 
    };

    scopeObj.view.tbxDatasetSearchBox.onTouchStart = function(){
      scopeObj.view.flxDatasetClearSearch.setVisibility(true);
      scopeObj.view.flxDatasetSearch.skin = "slFbox0ebc847fa67a243Search";
    };

    scopeObj.view.tbxDatasetSearchBox.onTouchEnd = function(){
      scopeObj.view.flxDatasetClearSearch.setVisibility(false);
      scopeObj.view.flxDatasetSearch.skin = "sknflxd5d9ddop100";
    };

    scopeObj.view.tbxDatasetSearchBox.onKeyUp = function() {
      scopeObj.searchDatasets();
    };

    scopeObj.view.flxDatasetClearSearch.onClick=function(){
      scopeObj.view.tbxDatasetSearchBox.text = "";
      scopeObj.searchDatasets();
    };

    scopeObj.view.btnExisting.onClick = function() {
      scopeObj.presenter.getProfiles();
    };

    scopeObj.view.btnExistingProfiles.onClick = function() {
      scopeObj.presenter.getProfiles();
    };

    scopeObj.view.btnNewRole.onClick = function() {
      scopeObj.resetRolesSkins();
    };

    scopeObj.view.btnNewProfile.onClick = function() {
      scopeObj.resetRolesSkins();
    };

    scopeObj.view.btnAddAttibutes.onClick = function() {
      scopeObj.view.tbxDatasetSearchBox.text = "";
      scopeObj.view.flxConsentPopup.setVisibility(true);
      scopeObj.view.flxAddAttributesPopUp.setVisibility(true);
      scopeObj.view.flxAddAttributesMsgContainer.setVisibility(scopeObj.view.lblDatasetCount.text === "00"); 
      scopeObj.view.flxAddAttributesDetailsMain.setVisibility(!scopeObj.view.flxAddAttributesMsgContainer.isVisible);
      scopeObj.view.forceLayout();
      scopeObj.view.flxDatasets.height = scopeObj.view.flxDatasetContainer.frame.height - 50 + "dp";
      scopeObj.view.flxDatasetList.height = scopeObj.view.flxDatasets.frame.height - 60 + "dp";
    };

    scopeObj.view.txtRoleName.onKeyUp = function() {
      scopeObj.view.txtRoleName.skin = "txtD7d9e0";
      scopeObj.view.RoleNameError.setVisibility(false);
      var textLen = scopeObj.view.txtRoleName.text.length ;
      scopeObj.view.lblRoleNameSize.text = textLen + "/" + scopeObj.view.txtRoleName.maxtextlength;
      scopeObj.view.lblRoleNameSize.setVisibility(true);
      scopeObj.view.flxAddRole.forceLayout();
    };

    scopeObj.view.txtRoleName.onTouchStart = function() {
      scopeObj.view.txtRoleName.skin = "txtD7d9e0";
      scopeObj.view.RoleNameError.setVisibility(false);
      var textLen = scopeObj.view.txtRoleName.text.length ;
      scopeObj.view.lblRoleNameSize.text = textLen + "/" + scopeObj.view.txtRoleName.maxtextlength;
      scopeObj.view.lblRoleNameSize.setVisibility(true);
      scopeObj.view.flxAddRole.forceLayout();
    };

    scopeObj.view.txtRoleName.onEndEditing = function(){
      scopeObj.view.lblRoleNameSize.setVisibility(false);
    };

    scopeObj.view.txtRoleDescription.onKeyUp = function() {
      scopeObj.view.txtRoleDescription.skin = "skntxtAread7d9e0";
      scopeObj.view.RoleDescError.setVisibility(false);
      var textLen = scopeObj.view.txtRoleDescription.text.length ;
      scopeObj.view.lblRoleDescSize.text = textLen + "/" + scopeObj.view.txtRoleDescription.maxtextlength;
      scopeObj.view.lblRoleDescSize.setVisibility(true);
      scopeObj.view.flxAddRole.forceLayout();
    };

    scopeObj.view.txtRoleDescription.onTouchStart = function() {
      scopeObj.view.txtRoleDescription.skin = "skntxtAread7d9e0";
      scopeObj.view.RoleDescError.setVisibility(false);
      var textLen = scopeObj.view.txtRoleDescription.text.length ;
      scopeObj.view.lblRoleDescSize.text = textLen + "/" + scopeObj.view.txtRoleDescription.maxtextlength;
      scopeObj.view.lblRoleDescSize.setVisibility(true);
      scopeObj.view.flxAddRole.forceLayout();
    };

    scopeObj.view.txtRoleDescription.onEndEditing = function(){
      scopeObj.view.lblRoleDescSize.setVisibility(false);
    };

    scopeObj.view.backToRoles.flxBack.onClick = function() {
      scopeObj.navigateBackToProfiles();
    };

    scopeObj.view.backToRoles.btnBack.onClick = function() {
      scopeObj.navigateBackToProfiles();
    };

    scopeObj.view.btnAttributesSave.onClick = function() {
      var hasValidAttributes = scopeObj.validateAttributes();
      if(hasValidAttributes){
        scopeObj.addAttributesToMainScreen();
      }
      scopeObj.view.flxConsentPopup.setVisibility(!hasValidAttributes);
      scopeObj.view.flxAddAttributesPopUp.setVisibility(!hasValidAttributes);
      scopeObj.view.flxNoAttributes.skin = hasValidAttributes ? "sknflxf8f9fabkgdddee0border3pxradius" : scopeObj.view.flxNoAttributes.skin;
      scopeObj.view.NoAttributesError.setVisibility(hasValidAttributes ? false : scopeObj.view.NoAttributesError.isVisible);
    };

    scopeObj.view.btnAddMoreAttrs.onClick = function() {
      scopeObj.view.tbxDatasetSearchBox.text = "";
      scopeObj.view.flxConsentPopup.setVisibility(true);
      scopeObj.view.flxAddAttributesPopUp.setVisibility(true);
    };

    scopeObj.view.commonButtons.btnNext.onClick = function() {
      scopeObj.validateRoleDetails();
    };

    scopeObj.view.btnExistingRoleAdd.onClick = function() {
      scopeObj.addProfilesToCampaign();
    };

    scopeObj.view.btnExistingRoleCancel.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.flxAddExistingRolesPopUpClose.onClick = function() {
      scopeObj.closePopup();
    };
    //
    scopeObj.view.tbxExistingRolesSearchBox.onTouchStart = function(){
      scopeObj.view.flxExistingRolesSearch.skin = "slFbox0ebc847fa67a243Search";
    };

    scopeObj.view.tbxExistingRolesSearchBox.onKeyUp = function() {
      scopeObj.searchProfiles();
      scopeObj.view.flxExistingRolesClearSearch.setVisibility(true);
      scopeObj.view.flxExistingRolesSearch.skin = "slFbox0ebc847fa67a243Search";
    };

    scopeObj.view.flxExistingRolesClearSearch.onClick=function(){
      scopeObj.view.tbxExistingRolesSearchBox.text="";
      scopeObj.searchProfiles();
      scopeObj.view.flxExistingRolesClearSearch.setVisibility(false);
      scopeObj.view.flxExistingRolesSearch.skin = "sknflxd5d9ddop100";
    };

    scopeObj.view.flxCloseAttributeList.onClick = function() {
      scopeObj.view.flxViewAttributeList.setVisibility(false);
    };

    scopeObj.view.lblReset.onClick = function() {
      scopeObj.resetAllDatasets();
    };

    scopeObj.view.lblAttributeHeader.onClick = function(){
      scopeObj.sortAttributes('attributeName',"segSelectedAttributes","lblSortAttribute");
    };

    scopeObj.view.lblSortAttribute.onClick = function(){
      scopeObj.sortAttributes('attributeName',"segSelectedAttributes","lblSortAttribute");
    };

    scopeObj.view.lblAttributeHeader1.onClick = function(){
      scopeObj.sortAttributes('lblAttribute',"segAttributeList","lblSortAttribute1");
    };

    scopeObj.view.lblSortAttribute1.onClick = function(){
      scopeObj.sortAttributes('lblAttribute',"segAttributeList","lblSortAttribute1");
    };

    scopeObj.view.lblDatasetHeader.onClick = function(){
      var isVisible = scopeObj.view.datasetFilter.isVisible;
      scopeObj.view.datasetFilter.setVisibility(!isVisible);
    };

    scopeObj.view.lblFilterDataset.onClick = function(){
      var isVisible = scopeObj.view.datasetFilter.isVisible;
      scopeObj.view.datasetFilter.setVisibility(!isVisible);
    };

    scopeObj.view.lblDropDownIcon1.onClick = function() {
      if(scopeObj.view.lblDropDownIcon1.text==="\ue915"){
        scopeObj.view.flxSMSDetails.setVisibility(false);
        scopeObj.view.lblDropDownIcon1.text = "\ue922";
      } else {
        scopeObj.view.flxSMSDetails.setVisibility(true);
        scopeObj.view.lblDropDownIcon1.text = "\ue915";
      }
    };

    scopeObj.view.txtAreaSMSContent.onKeyUp= function(){
      scopeObj.hideErrorMessagesOfflineChannel();
      scopeObj.view.lblSMSCount.setVisibility(true);
      scopeObj.view.lblSMSCount.text = scopeObj.view.txtAreaSMSContent.text.length + "/" + scopeObj.view.txtAreaSMSContent.maxtextlength;
      scopeObj.view.forceLayout();
    };

    scopeObj.view.txtAreaSMSContent.onEndEditing = function(){
      scopeObj.view.lblSMSCount.setVisibility(false);
    };

    scopeObj.view.lblDropDownIcon2.onClick = function() {
      if(scopeObj.view.lblDropDownIcon2.text==="\ue915"){
        scopeObj.view.flxEmailDetails.setVisibility(false);
        scopeObj.view.lblDropDownIcon2.text = "\ue922";
      } else {
        scopeObj.view.flxEmailDetails.setVisibility(true);
        scopeObj.view.lblDropDownIcon2.text = "\ue915";
      }
    };

    scopeObj.view.txtFieldSubject.onKeyUp = function(){
      scopeObj.hideErrorMessagesOfflineChannel();
      scopeObj.view.forceLayout();
    };

    scopeObj.view.btnEmailPreview.onClick = function(){
      scopeObj.view.flxEmailPreview.setVisibility(true);
      scopeObj.viewEmailPreview();
    };

    scopeObj.view.flxEmailPreviewClose.onClick = function(){
      scopeObj.view.flxEmailPreview.setVisibility(false);
    };

    scopeObj.view.lblDropDownIcon3.onClick = function() {
      if(scopeObj.view.lblDropDownIcon3.text==="\ue915"){
        scopeObj.view.flxPushNotificationsDetails.setVisibility(false);
        scopeObj.view.lblDropDownIcon3.text = "\ue922";
      } else {
        scopeObj.view.flxPushNotificationsDetails.setVisibility(true);
        scopeObj.view.lblDropDownIcon3.text = "\ue915";
      }
    };

    scopeObj.view.txtAreaPushNotificationsValue.onKeyUp= function(){
      scopeObj.hideErrorMessagesOfflineChannel();
      scopeObj.view.lblPushNotificationsCount.setVisibility(true);
      scopeObj.view.lblPushNotificationsCount.text = scopeObj.view.txtAreaPushNotificationsValue.text.length + "/" + scopeObj.view.txtAreaPushNotificationsValue.maxtextlength;
      scopeObj.view.forceLayout();
    };

    scopeObj.view.txtAreaPushNotificationsValue.onEndEditing = function(){
      scopeObj.view.lblPushNotificationsCount.setVisibility(false);
    };

    scopeObj.view.lblERAttributeHeader.onClick = function(){
      scopeObj.sortAttributes('lblAttribute',"segERAttributeList","lblERSortAttribute");
    };

    scopeObj.view.lblERSortAttribute.onClick = function(){
      scopeObj.sortAttributes('lblAttribute',"segERAttributeList","lblERSortAttribute");
    };

    scopeObj.view.lblERDatasetHeader.onClick = function(){
      var isVisible = scopeObj.view.statusFilterMenu.isVisible;
      scopeObj.view.statusFilterMenu.setVisibility(!isVisible);
    };

    scopeObj.view.lblERFilterDataset.onClick = function(){
      var isVisible = scopeObj.view.statusFilterMenu.isVisible;
      scopeObj.view.statusFilterMenu.setVisibility(!isVisible);
    };

    scopeObj.view.fontIconOfflineChannelSelectOption.onClick = function() {
      //scopeObj.setOfflineChannelVisibility(scopeObj.view.fontIconOfflineChannelSelectOption.text);
    };
    
    this.view.fontIconSmsChannelSelectOption.onClick = function() {
      scopeObj.setOfflineChannelVisibility(scopeObj.view.fontIconSmsChannelSelectOption.text, "fontIconSmsChannelSelectOption", "flxSMSChannelParent");
    };

    this.view.fontIconEmailChannelSelectOption.onClick = function() {
      scopeObj.setOfflineChannelVisibility(scopeObj.view.fontIconEmailChannelSelectOption.text, "fontIconEmailChannelSelectOption", "flxEmailChannelParent");
    };
    
    this.view.fontIconPushNotificationChannelSelectOption.onClick = function() {
      scopeObj.setOfflineChannelVisibility(scopeObj.view.fontIconPushNotificationChannelSelectOption.text, "fontIconPushNotificationChannelSelectOption", "flxPushNotificationsParent");
    };

    this.view.fontIconInAppChannelSelectOption.onClick = function() {
      scopeObj.setChannelsVisibility(scopeObj.view.fontIconInAppChannelSelectOption.text, "fontIconInAppChannelSelectOption", "inAppSelected");
    };

    this.view.fontIconInAppPopupChannelSelectOption.onClick = function() {
      scopeObj.setChannelsVisibility(scopeObj.view.fontIconInAppPopupChannelSelectOption.text, "fontIconInAppPopupChannelSelectOption", "inAppPopupSelected");
    };
    
    this.view.viewPopupEvents.btnAddEvents.onClick = function() {
      scopeObj.eventType = "popup";
      scopeObj.presenter.getEvents();
    };
    
    scopeObj.view.viewInternalEvents.btnAddEvents.onClick = function() {
      scopeObj.eventType = "internal";
      scopeObj.presenter.getEvents();
    };

    scopeObj.view.viewExternalEvents.btnAddEvents.onClick = function() {
      scopeObj.eventType = "external";
      scopeObj.presenter.getEvents();
    };

    scopeObj.view.flxEventsPopUpClose.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.btnEventsCancel.onClick = function() {
      scopeObj.closePopup();
    };

    scopeObj.view.lblResetProfiles.onClick = function() {
      var availableProfiles = scopeObj.view.flxProfilesData.children;
      for(var i=0; i<availableProfiles.length; i++){
        let profile = scopeObj.view.flxProfilesData[availableProfiles[i]];
        let profileId = profile.lblId.text;
        profile.flxDataset.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
        profile.fontIconArrow.setVisibility(false);
        profile.fonticonCheckBox.text = "\ue966";
        profile.fonticonCheckBox.skin = "sknFontIconCheckBoxUnselected";
        // scopeObj.view["flxAttrContainer" + datasetId].setVisibility(false);
      }
      scopeObj.view.flxExistingRoleDetailsInner.setVisibility(false);
      scopeObj.view.flxAddExistingRoleMsgContainer.setVisibility(true);
      scopeObj.selectedProfileCount = 0;
      scopeObj.displayProfileCount();
    };
    
    scopeObj.view.flxRoleNameHeader.onClick = function(){
      scopeObj.sortProfiles("lblRoleName.text");
    };
    
    scopeObj.view.flxNoOfUsersHeader.onClick = function() {
      scopeObj.sortProfiles("lblUserCount.text");
    };

    this.view.customRadioButtonGroup.imgRadioButton1.onTouchStart = function() {
      scopeObj.view.flxProduct.setVisibility(true);
      scopeObj.view.AdTypeError.setVisibility(false);
      scopeObj.hasUnsavedChanges = true;
    };

    this.view.customRadioButtonGroup.imgRadioButton2.onTouchStart = function() {
      scopeObj.view.flxProduct.setVisibility(false);
      scopeObj.view.AdTypeError.setVisibility(false);
      scopeObj.hasUnsavedChanges = true;
    };

    this.view.customRadioButtonGroup.imgRadioButton3.onTouchStart = function() {
      scopeObj.view.flxProduct.setVisibility(false);
      scopeObj.view.AdTypeError.setVisibility(false);
      scopeObj.hasUnsavedChanges = true;
    };

    this.view.btnEventsAdd.onClick = function() {
      scopeObj.setEventsViewData([]);
      scopeObj.closePopup();
    };

    this.view.lblResetEventsSelection.onClick = function() {
      scopeObj.resetEventsSelected("segSelectEvents", "lblDatasetCountEventsSelected");
    };

    this.view.lbxProductGroup.onSelection=function(){
      scopeObj.view.productGroupError.setVisibility(false);
      scopeObj.view.lbxProductGroup.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.getProductNameList(scopeObj.view.lbxProductGroup.selectedKeyValue);
    };

    this.view.lbxProductName.onSelection=function(){
      scopeObj.view.productNameError.setVisibility(false);
      scopeObj.view.lbxProductName.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    };

    this.view.fontIconInAppPopupChannelInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.fontIconInAppChannelInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.viewPopupEvents.fontIconEventsInfo.onHover = scopeObj.showcampaignDetailsToolTip;
    
    this.view.viewInternalEvents.fontIconEventsInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.viewExternalEvents.fontIconEventsInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    scopeObj.view.lblDatasetHeader1.onClick = function() {
      var isVisible = scopeObj.view.viewAttributesFilter.isVisible;
      scopeObj.view.viewAttributesFilter.setVisibility(!isVisible);
    };

    scopeObj.view.lblFilterDataset1.onClick = function() {
      var isVisible = scopeObj.view.viewAttributesFilter.isVisible ;
      scopeObj.view.viewAttributesFilter.setVisibility(!isVisible);
    };

    scopeObj.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(seguiWidget, sectionIndex, rowIndex){
      let description = scopeObj.view.statusFilterMenu.segStatusFilterDropdown.data[rowIndex].lblDescription.toUpperCase();
      scopeObj.filterDatasets(description, "statusFilterMenu", "segERAttributeList");
    };

    scopeObj.view.viewAttributesFilter.segStatusFilterDropdown.onRowClick = function(seguiWidget, sectionIndex, rowIndex){
      let description = scopeObj.view.viewAttributesFilter.segStatusFilterDropdown.data[rowIndex].lblDescription.toUpperCase();
      scopeObj.filterDatasets(description, "viewAttributesFilter", "segAttributeList");
    };

    scopeObj.view.datasetFilter.segStatusFilterDropdown.onRowClick = function(seguiWidget, sectionIndex, rowIndex){
      let description = scopeObj.view.datasetFilter.segStatusFilterDropdown.data[rowIndex].lblDescription.toUpperCase();
      scopeObj.filterDatasets(description, "datasetFilter", "segSelectedAttributes");
    };

    this.view.btnTab1.onClick = function() {
      scopeObj.eventType = "WEB";
      scopeObj.showPopupEventsPopup();
    };

    this.view.btnTab2.onClick = function() {
      scopeObj.eventType = "MOBILE";
      scopeObj.showPopupEventsPopup();
    };
    
    this.view.flxResetPopupEventsSelectionWEB.onClick = function() {
      scopeObj.resetPopupEventsSelected("segSelectPopupEventsWEB", "lblDatasetCountPopupEventsWEB");
    };

    this.view.flxResetPopupEventsSelectionMOB.onClick = function() {
      scopeObj.resetPopupEventsSelected("segSelectPopupEventsMOB", "lblDatasetCountPopupEventsMOB");
    };
    
    this.view.tbxDatasetSearchBoxPopupEventsWEB.onKeyUp = function() {
      scopeObj.searchPopupEvents(scopeObj.view.tbxDatasetSearchBoxPopupEventsWEB.text);
    };

    this.view.flxPopupEventsClearSearchWEB.onClick=function(){
      scopeObj.searchPopupEvents("");
    };
    
    this.view.tbxDatasetSearchBoxPopupEventsMOB.onKeyUp = function() {
      scopeObj.searchPopupEvents(scopeObj.view.tbxDatasetSearchBoxPopupEventsMOB.text);
    };

    this.view.flxPopupEventsClearSearchMOB.onClick=function(){
      scopeObj.searchPopupEvents("");
    };

    this.view.fontIconSortPopupScreensWEB.onClick=function(){
      scopeObj.sortPopupEvents("lblName", scopeObj.view.segSelectPopupEventsWEB, scopeObj.view.fontIconSortPopupScreensWEB);
    };

    this.view.fontIconSortPopupScreensMOB.onClick=function(){
      scopeObj.sortPopupEvents("lblName", scopeObj.view.segSelectPopupEventsMOB, scopeObj.view.fontIconSortPopupScreensMOB);
    };
    
    this.view.btnPopupEventsAdd.onClick=function(){
      var eventData = scopeObj.filterPopupEventsView();
      scopeObj.setPopupEventsViewData(eventData);
      scopeObj.closePopup();
    };
    
    this.view.flxPopupEventsPopUpClose.onClick = function() {
      scopeObj.closePopup();
    };
    
    this.view.btnPopupEventsCancel.onClick = function() {
      scopeObj.closePopup();
    };
	
    this.view.WebPopupDetails.btnPreview.onClick = function() {
      scopeObj.showCampaignPopupPreview(true, "campaignPopupWeb", "WebPopupDetails");
    };

    this.view.MobilePopupDetails.btnPreview.onClick = function() {
      scopeObj.showCampaignPopupPreview(false, "campaignPopupMobile", "MobilePopupDetails");
    };
    
    this.view.flxClosePopupScreen.onClick = function() {
      scopeObj.closePopup();
    };
    
    this.view.WebPopupDetails.btnBannerImgVerify.onClick = function() {
      scopeObj.showCampaignPopupPreview(true, "campaignPopupWeb", "WebPopupDetails");
    };

    this.view.MobilePopupDetails.btnBannerImgVerify.onClick = function() {
      scopeObj.showCampaignPopupPreview(false, "campaignPopupMobile", "MobilePopupDetails");
    };
    
    this.view.WebPopupDetails.btnBannerTargetURLVerify.onClick = function() {
      scopeObj.showTargetURL(scopeObj.view.WebPopupDetails.txtBannerTargetURLSource, scopeObj.view.WebPopupDetails.BannerTargetURLError);
    };
    
    this.view.WebPopupDetails.btnCTATargetURLVerify.onClick = function() {
      scopeObj.showTargetURL(scopeObj.view.WebPopupDetails.txtCTATargetURL, scopeObj.view.WebPopupDetails.CTATargetURLError);
    };
    
    this.view.MobilePopupDetails.btnBannerTargetURLVerify.onClick = function() {
      scopeObj.showTargetURL(scopeObj.view.MobilePopupDetails.txtBannerTargetURLSource, scopeObj.view.MobilePopupDetails.BannerTargetURLError);
    };

    this.view.MobilePopupDetails.btnCTATargetURLVerify.onClick = function() {
      scopeObj.showTargetURL(scopeObj.view.MobilePopupDetails.txtCTATargetURL, scopeObj.view.MobilePopupDetails.CTATargetURLError);
    };
    
    this.view.WebPopupDetails.txtBannerHeadline.onKeyUp= function(){
      scopeObj.view.WebPopupDetails.txtBannerHeadline.skin = "txtD7d9e0";
      scopeObj.view.WebPopupDetails.BannerHeadlineError.setVisibility(false);
      scopeObj.view.WebPopupDetails.lblBannerHeadlineSize.setVisibility(true);
      scopeObj.view.WebPopupDetails.lblBannerHeadlineSize.text = scopeObj.view.WebPopupDetails.txtBannerHeadline.text.length + "/" + scopeObj.view.WebPopupDetails.txtBannerHeadline.maxtextlength;
      scopeObj.view.forceLayout();
    };

    this.view.WebPopupDetails.txtBannerHeadline.onEndEditing = function(){
       scopeObj.view.WebPopupDetails.lblBannerHeadlineSize.setVisibility(false);
    };

    this.view.WebPopupDetails.txtBannerDescription.onKeyUp= function(){
      scopeObj.view.WebPopupDetails.txtBannerDescription.skin = "skntxtAread7d9e0";
      scopeObj.view.WebPopupDetails.BannerDescriptionError.setVisibility(false);
      scopeObj.view.WebPopupDetails.lblBannerDescriptionSize.setVisibility(true);
      scopeObj.view.WebPopupDetails.lblBannerDescriptionSize.text = scopeObj.view.WebPopupDetails.txtBannerDescription.text.length + "/" + scopeObj.view.WebPopupDetails.txtBannerDescription.maxtextlength;
      scopeObj.view.forceLayout();
    };

    this.view.WebPopupDetails.txtBannerDescription.onEndEditing = function(){
      scopeObj.view.WebPopupDetails.lblBannerDescriptionSize.setVisibility(false);
    };
    
    this.view.WebPopupDetails.txtBannerImgSource.onKeyUp = function(){
      scopeObj.view.WebPopupDetails.txtBannerImgSource.skin = "txtD7d9e0";
      scopeObj.view.WebPopupDetails.BannerImageError.setVisibility(false);
      scopeObj.view.forceLayout();
    };

    this.view.WebPopupDetails.txtBannerTargetURLSource.onKeyUp = function(){
      scopeObj.view.WebPopupDetails.txtBannerTargetURLSource.skin = "txtD7d9e0";
      scopeObj.view.WebPopupDetails.BannerTargetURLError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    
    this.view.WebPopupDetails.txtCTABtnLablel.onKeyUp = function(){
      scopeObj.view.WebPopupDetails.txtCTABtnLablel.skin = "txtD7d9e0";
      scopeObj.view.WebPopupDetails.CTABtnLblError.setVisibility(false);
      scopeObj.view.WebPopupDetails.lblCTABtnLablelSize.setVisibility(true);
      scopeObj.view.WebPopupDetails.lblCTABtnLablelSize.text = scopeObj.view.WebPopupDetails.txtCTABtnLablel.text.length + "/" + scopeObj.view.WebPopupDetails.txtCTABtnLablel.maxtextlength;
      scopeObj.view.forceLayout();
    };

    this.view.WebPopupDetails.txtCTABtnLablel.onEndEditing = function(){
      scopeObj.view.WebPopupDetails.lblCTABtnLablelSize.setVisibility(false);
    };
    
    this.view.WebPopupDetails.txtCTATargetURL.onKeyUp = function(){
      scopeObj.view.WebPopupDetails.txtCTATargetURL.skin = "txtD7d9e0";
      scopeObj.view.WebPopupDetails.CTATargetURLError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    
    this.view.MobilePopupDetails.txtBannerHeadline.onKeyUp= function(){
      scopeObj.view.MobilePopupDetails.txtBannerHeadline.skin = "txtD7d9e0";
      scopeObj.view.MobilePopupDetails.BannerHeadlineError.setVisibility(false);
      scopeObj.view.MobilePopupDetails.lblBannerHeadlineSize.setVisibility(true);
      scopeObj.view.MobilePopupDetails.lblBannerHeadlineSize.text = scopeObj.view.MobilePopupDetails.txtBannerHeadline.text.length + "/" + scopeObj.view.MobilePopupDetails.txtBannerHeadline.maxtextlength;
      scopeObj.view.forceLayout();
    };

    this.view.MobilePopupDetails.txtBannerHeadline.onEndEditing = function(){
       scopeObj.view.MobilePopupDetails.lblBannerHeadlineSize.setVisibility(false);
    };

    this.view.MobilePopupDetails.txtBannerDescription.onKeyUp = function(){
      scopeObj.view.MobilePopupDetails.txtBannerDescription.skin = "skntxtAread7d9e0";
      scopeObj.view.MobilePopupDetails.BannerDescriptionError.setVisibility(false);
      scopeObj.view.MobilePopupDetails.lblBannerDescriptionSize.setVisibility(true);
      scopeObj.view.MobilePopupDetails.lblBannerDescriptionSize.text = scopeObj.view.MobilePopupDetails.txtBannerDescription.text.length + "/" + scopeObj.view.MobilePopupDetails.txtBannerDescription.maxtextlength;
      scopeObj.view.forceLayout();
    };

    this.view.MobilePopupDetails.txtBannerDescription.onEndEditing = function(){
      scopeObj.view.MobilePopupDetails.lblBannerDescriptionSize.setVisibility(false);
    };
    
    this.view.MobilePopupDetails.txtBannerImgSource.onKeyUp = function(){
      scopeObj.view.MobilePopupDetails.txtBannerImgSource.skin = "txtD7d9e0";
      scopeObj.view.MobilePopupDetails.BannerImageError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    
    this.view.MobilePopupDetails.txtBannerTargetURLSource.onKeyUp = function(){
      scopeObj.view.MobilePopupDetails.txtBannerTargetURLSource.skin = "txtD7d9e0";
      scopeObj.view.MobilePopupDetails.BannerTargetURLError.setVisibility(false);
      scopeObj.view.forceLayout();
    };

    this.view.MobilePopupDetails.txtCTABtnLablel.onKeyUp = function(){
      scopeObj.view.MobilePopupDetails.txtCTABtnLablel.skin = "txtD7d9e0";
      scopeObj.view.MobilePopupDetails.CTABtnLblError.setVisibility(false);
      scopeObj.view.MobilePopupDetails.lblCTABtnLablelSize.setVisibility(true);
      scopeObj.view.MobilePopupDetails.lblCTABtnLablelSize.text = scopeObj.view.MobilePopupDetails.txtCTABtnLablel.text.length + "/" + scopeObj.view.MobilePopupDetails.txtCTABtnLablel.maxtextlength;
      scopeObj.view.forceLayout();
    };

    this.view.MobilePopupDetails.txtCTABtnLablel.onEndEditing = function(){
      scopeObj.view.MobilePopupDetails.lblCTABtnLablelSize.setVisibility(false);
    };
    
    this.view.MobilePopupDetails.txtCTATargetURL.onKeyUp = function(){
      scopeObj.view.MobilePopupDetails.txtCTATargetURL.skin = "txtD7d9e0";
      scopeObj.view.MobilePopupDetails.CTATargetURLError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    
    this.view.WebPopupDetails.switchAds.onSlide = function(){
      scopeObj.showOrHidePopupBanner("WebPopupDetails");
    };
    
    this.view.MobilePopupDetails.switchAds.onSlide = function(){
      scopeObj.showOrHidePopupBanner("MobilePopupDetails");
    };

    this.view.WebPopupDetails.fontIconInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.MobilePopupDetails.fontIconInfo.onHover = scopeObj.showcampaignDetailsToolTip;
    
    this.view.WebPopupDetails.fontIconShowReadLaterInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.WebPopupDetails.fontIconShowCloseIconInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.MobilePopupDetails.fontIconShowReadLaterInfo.onHover = scopeObj.showcampaignDetailsToolTip;

    this.view.MobilePopupDetails.fontIconShowCloseIconInfo.onHover = scopeObj.showcampaignDetailsToolTip;
    
    this.view.MobilePopupDetails.flxSelectOption.onClick = function() {
      scopeObj.copyWebToMobBannerDetails(scopeObj.view.MobilePopupDetails.fontIconSelectOption);
    };
  },
  
  copyWebToMobBannerDetails : function(widget){
    var isEmpty = this.isEmptyBannerDetails("MobilePopupDetails");
    var isSame = this.isSameBannerDetails("MobilePopupDetails", "WebPopupDetails");
    if(widget.text === "\ue966"){
      //make it selcted and change skin
      widget.text = "\ue965";
      widget.skin = "sknFontIconCheckBoxSelected";
      if(!isEmpty && !isSame)
        this.showWarningPopup(kony.i18n.getLocalizedString("i18n.frmAdManagement.popupHeaderDataReplaceWarning"), kony.i18n.getLocalizedString("i18n.frmAdManagement.popupBodyDataReplaceWarning"),
                            kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"), kony.i18n.getLocalizedString("i18n.PopUp.YesDelete"));
      else if(isEmpty && !isSame){
        this.copyPopupBannerDetails("MobilePopupDetails", "WebPopupDetails");
        this.resetSkinPopupDetails("MobilePopupDetails");
      }
    }
    else{
      if(!isEmpty && isSame)
        this.resetFieldsPopupDetails("MobilePopupDetails");
      widget.text = "\ue966";
      widget.skin = "sknFontIconCheckBoxUnselected";
    }
  },
  
  isEmptyBannerDetails: function(componentId){
   return this.view[componentId].txtBannerHeadline.text === "" &&
        this.view[componentId].txtBannerImgSource.text === "" &&
        this.view[componentId].txtBannerTargetURLSource.text === "" &&
        this.view[componentId].txtCTABtnLablel.text === "" &&
        this.view[componentId].txtCTATargetURL.text === "" &&
        this.view[componentId].fonticonArrow.text === "\ue915" &&
        this.view[componentId].SwithShowReadLater.selectedIndex === 0 &&
        this.view[componentId].SwitchShowCloseIcon.selectedIndex === 0 &&
        this.view[componentId].switchAds.selectedIndex === 0;
  },
  
  isSameBannerDetails: function(componentId, componentId1){
    return this.view[componentId].txtBannerHeadline.text === this.view[componentId1].txtBannerHeadline.text &&
      this.view[componentId].txtBannerDescription.text === this.view[componentId1].txtBannerDescription.text &&
      this.view[componentId].txtBannerImgSource.text === this.view[componentId1].txtBannerImgSource.text &&
      this.view[componentId].txtBannerTargetURLSource.text === this.view[componentId1].txtBannerTargetURLSource.text &&
      this.view[componentId].txtCTABtnLablel.text === this.view[componentId1].txtCTABtnLablel.text &&
      this.view[componentId].txtCTATargetURL.text === this.view[componentId1].txtCTATargetURL.text &&
      this.view[componentId].fonticonArrow.text === this.view[componentId1].fonticonArrow.text &&
      this.view[componentId].SwithShowReadLater.selectedIndex === this.view[componentId1].SwithShowReadLater.selectedIndex &&
      this.view[componentId].SwitchShowCloseIcon.selectedIndex === this.view[componentId1].SwitchShowCloseIcon.selectedIndex &&
      this.view[componentId].switchAds.selectedIndex === this.view[componentId1].switchAds.selectedIndex;
  },
  
  copyPopupBannerDetails: function(componentId, componentId1){
    this.view[componentId].txtBannerHeadline.text = this.view[componentId1].txtBannerHeadline.text;
    this.view[componentId].txtBannerDescription.text = this.view[componentId1].txtBannerDescription.text;
    this.view[componentId].txtBannerImgSource.text = this.view[componentId1].txtBannerImgSource.text;
    this.view[componentId].txtBannerTargetURLSource.text = this.view[componentId1].txtBannerTargetURLSource.text;
    this.view[componentId].txtCTABtnLablel.text = this.view[componentId1].txtCTABtnLablel.text;
    this.view[componentId].txtCTATargetURL.text = this.view[componentId1].txtCTATargetURL.text;
    this.view[componentId].fonticonArrow.text = this.view[componentId1].fonticonArrow.text;
    this.view[componentId].SwithShowReadLater.selectedIndex = this.view[componentId1].SwithShowReadLater.selectedIndex;
    this.view[componentId].SwitchShowCloseIcon.selectedIndex = this.view[componentId1].SwitchShowCloseIcon.selectedIndex;
    this.view[componentId].switchAds.selectedIndex = this.view[componentId1].switchAds.selectedIndex;
  },
  
  unsavedChanges: function(){
    if(this.hasUnsavedChanges || this.isEdit)
      this.showWarningPopup(kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderUnsavedChanges"), kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBodyUnsavedChanges"),
                            kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"), kony.i18n.getLocalizedString("i18n.PopUp.YesDelete"));
    else
      this.presenter.fetchCampaigns();
  },
  
  showWarningPopup: function(headerText, bodyText, btnYesText, btnNoText){
    var scopeObj = this;
    scopeObj.view.warningpopup.lblPopUpMainMessage.text = headerText;
    scopeObj.view.warningpopup.rtxPopUpDisclaimer.text = bodyText;
    scopeObj.view.warningpopup.btnPopUpCancel.text = btnYesText;
    scopeObj.view.warningpopup.btnPopUpDelete.text = btnNoText;
    scopeObj.view.flxConsentPopup.setVisibility(true);
    scopeObj.view.warningpopup.setVisibility(true);
  },
  
  showOrHidePopupBanner: function(componentId){
    this.view[componentId].flxPopupDetails.setVisibility(!this.view[componentId].switchAds.selectedIndex);
    this.view[componentId].flxPopupDetails2.setVisibility(!this.view[componentId].switchAds.selectedIndex);
    this.view[componentId].flxPopupDetails3.setVisibility(!this.view[componentId].switchAds.selectedIndex);
    this.view[componentId].flxHideAdContainer.setVisibility(this.view[componentId].switchAds.selectedIndex);
    if(this.view[componentId].switchAds.selectedIndex === 0)
      this.view.flxNoPopupBannerError.setVisibility(false);
    this.view.forceLayout();
  },
  
  showTargetURL: function(txtBox, errorWidget){
    var isValidUrl = this.verifyTargetURL(txtBox, errorWidget);
    if(isValidUrl)
      kony.application.openURL(txtBox.text);
  },
  
  verifyTargetURL: function(txtBox, errorWidget){
    var targetURL = txtBox.text;
    if(targetURL.trim() === "") {
      txtBox.skin = "skinredbg" ;
      errorWidget.setVisibility(true);
      errorWidget.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLEmpty");
      return false;
    }
    else if(targetURL.indexOf("http:") === 0) {
      txtBox.skin = "skinredbg" ;
      errorWidget.setVisibility(true);
      errorWidget.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLHttp");
      return false;
    }
    else if(!this.urlRegex.test(targetURL)){
      txtBox.skin = "skinredbg" ;
      errorWidget.setVisibility(true);
      errorWidget.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURL");
      return false;
    } 
    else{
        return true;
    }
  },
  
  verifyImageURL: function(txtBox, errorWidget){
    var imgURL = txtBox.text;
    if(imgURL.trim() === "") {
      txtBox.skin = "skinredbg" ;
      errorWidget.setVisibility(true);
      errorWidget.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorImageSourceURL");
      return false;
    }
    else if(imgURL.indexOf("http:") === 0) {
      txtBox.skin = "skinredbg" ;
      errorWidget.setVisibility(true);
      errorWidget.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLHttp");
      return false;
    }
    else if(!this.imageValidationRegex.test(imgURL)){
      txtBox.skin = "skinredbg" ;
      errorWidget.setVisibility(true);
      errorWidget.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorImageExtension");
      return false;
    } 
    else{
      return true;
    }
  },
  
  showCampaignPopupPreview: function(isWeb, campaignPopupComponent, PopupDetailsComponent){
    var imgSrc;
    this.view.flxConsentPopup.setVisibility(true);
    this.view.flxPopUpScreenPreview.setVisibility(true);
    this.view[campaignPopupComponent].lblHeading.text = this.view[PopupDetailsComponent].txtBannerHeadline.text;
    this.view[campaignPopupComponent].lblDescription.text = this.view[PopupDetailsComponent].txtBannerDescription.text;
    imgSrc = this.view[PopupDetailsComponent].txtBannerImgSource.text;
    if(imgSrc !== "" && this.imageValidationRegex.test(imgSrc) && imgSrc.indexOf("http:"))
      this.view[campaignPopupComponent].imgPopup.src = imgSrc;
    else
      this.view[campaignPopupComponent].imgPopup.src = "";
    this.view[campaignPopupComponent].btnYes.text = this.view[PopupDetailsComponent].txtCTABtnLablel.text;
    this.view[campaignPopupComponent].btnYes.toolTip = this.view[PopupDetailsComponent].txtCTABtnLablel.text;
    this.view[campaignPopupComponent].btnYes.setVisibility(this.view[PopupDetailsComponent].txtCTABtnLablel.text !== "");
    this.view[campaignPopupComponent].btnNo.toolTip = this.view[campaignPopupComponent].btnNo.text;
    this.view[campaignPopupComponent].btnNo.setVisibility(!this.view[PopupDetailsComponent].SwithShowReadLater.selectedIndex);
    this.view[campaignPopupComponent].lblClose.setVisibility(!this.view[PopupDetailsComponent].SwitchShowCloseIcon.selectedIndex);
    this.view.flxPopScreenWeb.setVisibility(isWeb);
    this.view.flxPopScreenMobile.setVisibility(!isWeb);
    this.view.forceLayout();
  },

  setProductNameListOnEdit: function(){
    // setting Product Name List on edit
    var scopeObj = this;
    if(scopeObj.campaignData.objectiveType === "Marketing"){
      if(scopeObj.campaignData.productGroupId)
        scopeObj.getProductNameList([scopeObj.campaignData.productGroupId, scopeObj.campaignData.productGroupId]);
      scopeObj.view.flxProduct.setVisibility(true);
    }
  },

  setCompletedIconOnEdit: function(){
    // setting completed option skin and text on edit
    var scopeObj = this;
    scopeObj.view.verticalTabs1.lblCompleted1.skin = "sknFontIconCompleted";
    scopeObj.view.verticalTabs1.lblCompleted3.skin = "sknFontIconCompleted";
    scopeObj.view.verticalTabs1.lblCompleted4.skin = this.offlineSelected? "sknFontIconCompleted" : "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted2.skin = this.inAppSelected? "sknFontIconCompleted" : "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted5.skin = this.inAppPopupSelected? "sknFontIconCompleted" : "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted1.text = "\ue9ae";
    scopeObj.view.verticalTabs1.lblCompleted3.text = "\ue9ae";
    scopeObj.view.verticalTabs1.lblCompleted4.text = this.offlineSelected? "\ue9ae" : "\ue9af";
    scopeObj.view.verticalTabs1.lblCompleted2.text = this.inAppSelected? "\ue9ae" : "\ue9af";
    scopeObj.view.verticalTabs1.lblCompleted5.text = this.inAppPopupSelected? "\ue9ae" : "\ue9af";
  },
  
  setValidatorOnEdit: function(){
  },

  setChannelSelectionOnEdit: function(){
    var self = this;
    var channelsSelected = this.campaignData.channelDetails;
    //setting offling channel selection
    //making all offline channel option unselect in the begining
    self.setOfflineChannelVisibility("\ue965", "fontIconSmsChannelSelectOption", "flxSMSChannelParent");
    self.setOfflineChannelVisibility("\ue965", "fontIconEmailChannelSelectOption", "flxEmailChannelParent");
    self.setOfflineChannelVisibility("\ue965", "fontIconPushNotificationChannelSelectOption", "flxPushNotificationsParent");
    if(channelsSelected)
      channelsSelected.forEach(function(obj){
        if(obj.channelSubType === "SMS"){
          self.setOfflineChannelVisibility("\ue966", "fontIconSmsChannelSelectOption", "flxSMSChannelParent");
        }
        else if(obj.channelSubType === "EMAIL"){
          self.setOfflineChannelVisibility("\ue966", "fontIconEmailChannelSelectOption", "flxEmailChannelParent");
        }
        else if(obj.channelSubType === "PUSH NOTIFICATIONS"){
          self.setOfflineChannelVisibility("\ue966", "fontIconPushNotificationChannelSelectOption", "flxPushNotificationsParent");
        }
      });
    if(this.campaignData.onlineContents.length>0)
      this.setChannelsVisibility("\ue966", "fontIconInAppChannelSelectOption", "inAppSelected");
    else
      this.setChannelsVisibility("\ue965", "fontIconInAppChannelSelectOption", "inAppSelected");
    if(this.campaignData.popupBanners.length>0)
      this.setChannelsVisibility("\ue966", "fontIconInAppPopupChannelSelectOption", "inAppPopupSelected");
    else
      this.setChannelsVisibility("\ue965", "fontIconInAppPopupChannelSelectOption", "inAppPopupSelected");
  },

  setAdTypeOnEdit: function(){
    if(this.campaignData.objectiveType === "Marketing"){
      this.view.customRadioButtonGroup.imgRadioButton1.src = "radio_selected.png";
    }
    else if(this.campaignData.objectiveType === "Informational"){
      this.view.customRadioButtonGroup.imgRadioButton2.src = "radio_selected.png";
    }
    else if(this.campaignData.objectiveType === "Regulatory"){
      this.view.customRadioButtonGroup.imgRadioButton3.src = "radio_selected.png";
    }
  },

  setProductGroupList: function(data){
    var selectedId = null, isSelectedIdPresent = false, allProductGroups = [["lb0", kony.i18n.getLocalizedString("i18n.frmAdManagement.selectProductGroup")]];
    // if  Edit storing product group id.
    if(this.campaignData && (this.isEdit || this.isCopy))
      if(this.campaignData.productGroupId)
        selectedId =  this.campaignData.productGroupId;

    var maxProductGrouplen = 0;
    for(var keys in data) {
      var subGroups = data[keys];
      for(var i = 0; i < subGroups.length; i++){
        var toPush = true;
        for(var j = 0; j< allProductGroups.length; j++){
          if(subGroups[i].productGroupId === allProductGroups[j][0]){
            toPush = false;
            break;
          }
          if(subGroups[i].productGroupId === selectedId)
            isSelectedIdPresent = true;
        }
        if(toPush){
          allProductGroups.push([subGroups[i].productGroupId,subGroups[i].productGroupName]);
          if(subGroups[i].productGroupName && subGroups[i].productGroupName.length > maxProductGrouplen)
            maxProductGrouplen = subGroups[i]. productGroupName.length;
        }
      }
    }
    this.view.lbxProductGroup.masterData = allProductGroups;
    //setting selected key on product Group list box for Edit & create.
    if(isSelectedIdPresent){
      this.view.lbxProductGroup.selectedKey = selectedId;
    }
    else{
      this.view.lbxProductGroup.selectedKey = "lb0";
    } 
    this.setListBoxWidth("flxProductGroup", maxProductGrouplen);
  },

  getProductNameList: function(productGroupKeyVal){
    if(productGroupKeyVal[0] !== "lb0"){
      var payLoad = {
        "productGroups": productGroupKeyVal[0]
      };
      this.presenter.getProductsByProductGroup(payLoad);
    }
  },

  setProductNameList: function(data){
    this.view.lbxProductName.setEnabled(true);
    this.view.productNameError.setVisibility(false);
    this.view.lbxProductName.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    var selectedId = null, isSelectedIdPresent = false, productNameMasterData = [["lb0", kony.i18n.getLocalizedString("i18n.frmAdManagement.selectProductName")]];
    // if  Edit storing product name id.
    if(this.campaignData && (this.isEdit || this.isCopy))
      if(this.campaignData.productId)
        selectedId =  this.campaignData.productId;

    var maxProductNamelen = 0;
    for(var i = 0; i < data.products.length; i++){
      if(data.products[i].productId === selectedId)
        isSelectedIdPresent = true;
      if(data.products[i].productName)
        if(data.products[i].productName.length > maxProductNamelen)
          maxProductNamelen = data.products[i].productName.length;
      productNameMasterData.push([data.products[i].productId, data.products[i].productName]);
    }
    this.view.lbxProductName.masterData = productNameMasterData;
    //setting selected key on product Name list box for Edit & create.
    if(isSelectedIdPresent){
      this.view.lbxProductName.selectedKey = selectedId;
    }
    else{
      this.view.lbxProductName.selectedKey = "lb0";
    }
    this.setListBoxWidth("flxProductName", maxProductNamelen);
  },

  setListBoxWidth : function(widgetId, length){
    var widgetWidth = length * 7 + 20;
    this.view[widgetId].width = (widgetWidth > 200 ? widgetWidth : 200) + "dp";
  },

  showcampaignDetailsToolTip : function(widget,context){
          var toolTipText;
    if(widget.id === "fontIconInAppChannelInfo"){
      this.view.campaignDetailsToolTip.lblarrow.left = "85%";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.mobileOrDesktopWebApp");
      this.view.campaignDetailsToolTip.left = 20 + this.view.flxInAppChannel.frame.x + this.view.fontIconInAppChannelInfo.frame.x - this.view.campaignDetailsToolTip.lblarrow.frame.x;
      this.view.campaignDetailsToolTip.top = this.view.flxChannels.frame.y + 70 + "dp";
      this.view.campaignDetailsToolTip.width = "200dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.width = "190dp";
    }
    else if(widget.id === "fontIconInAppPopupChannelInfo"){
      this.view.campaignDetailsToolTip.lblarrow.left = "85%";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.mobileOrDesktopWebApp") + ", Popups";
      this.view.campaignDetailsToolTip.left = 20 + this.view.flxInAppPopupChannel.frame.x + this.view.fontIconInAppPopupChannelInfo.frame.x - this.view.campaignDetailsToolTip.lblarrow.frame.x + "dp";
      this.view.campaignDetailsToolTip.top = this.view.flxChannels.frame.y + 70 + "dp";
      this.view.campaignDetailsToolTip.width = "240dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.width = "230dp";
    }
    else if(widget.id === "fontIconEventsInfo"){
      if(widget.kmasterid === "viewInternalEvents")
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.internalEventsInfo");
      else if(widget.kmasterid === "viewExternalEvents")
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.externalEventsInfo");
      else
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.popupEventsInfo");
      this.view.campaignDetailsToolTip.lblarrow.left = "10dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.text = toolTipText;
      this.view.campaignDetailsToolTip.left = 20 + this.view[widget.kmasterid].flxEventsHeaderInner.frame.x + this.view[widget.kmasterid].fontIconEventsInfo.frame.x - this.view.campaignDetailsToolTip.lblarrow.frame.x + "dp";
      this.view.campaignDetailsToolTip.top = this.view[widget.kmasterid].frame.y + 30 + "dp";
      this.view.campaignDetailsToolTip.width = "290dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.width = "280dp";
    }
    else if(widget.id === "fontIconInfo"){
      if(widget.kmasterid === "WebPopupDetails")
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.WebBannerInfo");
      else
        toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.MobileBannerInfo");
      this.view.campaignDetailsToolTip.lblarrow.left = "10dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.text = toolTipText;
      this.view.campaignDetailsToolTip.left = 20 + this.view[widget.kmasterid].flxPopupTypeHeader.frame.x + this.view[widget.kmasterid].fontIconInfo.frame.x - this.view.campaignDetailsToolTip.lblarrow.frame.x + "dp";
      this.view.campaignDetailsToolTip.top = this.view[widget.kmasterid].frame.y + 50 + "dp";
      this.view.campaignDetailsToolTip.width = "215dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.width = "205dp";
    } else if(widget.id === "fontIconShowReadLaterInfo" || widget.id === "fontIconShowCloseIconInfo"){
      toolTipText = kony.i18n.getLocalizedString("i18n.frmAdManagement.buttonHideShowInfo");
      this.view.campaignDetailsToolTip.lblarrow.left = "10dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.text = toolTipText;
      this.view.campaignDetailsToolTip.left = 20 + this.view[widget.kmasterid][widget.id].parent.frame.x + this.view[widget.kmasterid][widget.id].frame.x - this.view.campaignDetailsToolTip.lblarrow.frame.x + "dp";
      this.view.campaignDetailsToolTip.top = this.view[widget.kmasterid].frame.y + 50 + this.view[widget.kmasterid].flxPopupDetails3.frame.y + 40 + "dp";
      this.view.campaignDetailsToolTip.width = "235dp";
      this.view.campaignDetailsToolTip.lblNoConcentToolTip.width = "225dp";
    }
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      this.view.campaignDetailsToolTip.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.campaignDetailsToolTip.setVisibility(false);
    }
    this.view.forceLayout();
  },
  
  showPopupEventsPopup: function(){
    this.view.flxConsentPopup.setVisibility(true);
    this.view.flxAddPopupEventsPopup.setVisibility(true);
    this.sortBy = this.getObjectSorter("lblName");
    if(this.eventType === "WEB"){
      this.view.btnTab1.skin = "sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
      this.view.btnTab2.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
      this.view.flxPopupScreenWEB.setVisibility(true);
      this.view.flxPopupScreenMOB.setVisibility(false);
    }
    else{
      this.view.btnTab1.skin = "sknBtnBgD2D7E2Rou3pxLato485B7512px";
      this.view.btnTab2.skin = "sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
      this.view.flxPopupScreenMOB.setVisibility(true);
      this.view.flxPopupScreenWEB.setVisibility(false);
    }
    this.view.forceLayout();
  },

  showInternalEventsPopup: function(){
    this.view.lblEventsPopUpHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.selectInternalEvents");
    this.view.lblEventTypeSourceHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.type");
    this.view.lblEventIdentifierCodeHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.identifier");
    //this.view.fontIconSortEventCode.setVisibility(false);
    this.view.flxConsentPopup.setVisibility(true);
    this.view.flxAddEventsPopUp.setVisibility(true);
    this.view.forceLayout();
  },

  showExternalEventsPopup: function(){
    this.view.lblEventsPopUpHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.selectExternalEvents");
    this.view.lblEventTypeSourceHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.eventSource");
    this.view.lblEventIdentifierCodeHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.eventCode");
    //this.view.fontIconSortEventCode.setVisibility(true);
    this.view.flxConsentPopup.setVisibility(true);
    this.view.flxAddEventsPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  
  setOptionVisibilty : function(){
    this.view.verticalTabs1.flxSeparatorContainer3.setVisibility(this.inAppSelected||this.inAppPopupSelected||this.offlineSelected);
    this.view.verticalTabs1.flxSeparatorContainer4.setVisibility(this.offlineSelected||this.inAppPopupSelected);
    this.view.verticalTabs1.flxSeparatorContainer2.setVisibility(this.inAppPopupSelected);
    this.view.verticalTabs1.flxOption4.setVisibility(this.offlineSelected);
    this.view.verticalTabs1.flxOption2.setVisibility(this.inAppSelected);
    this.view.verticalTabs1.flxOption5.setVisibility(this.inAppPopupSelected);
    this.hasUnsavedChanges = true;
  },
  
  setCompletedIconVisibility: function(){
    if(!this.offlineSelected){
      this.view.verticalTabs1.lblCompleted4.text = "\ue9af";
      this.view.verticalTabs1.lblCompleted4.skin = "sknIcon18pxGray";
    }
    if(!this.inAppSelected){
      this.view.verticalTabs1.lblCompleted2.text = "\ue9af";
      this.view.verticalTabs1.lblCompleted2.skin = "sknIcon18pxGray";
    }
    if(!this.inAppPopupSelected){
      this.view.verticalTabs1.lblCompleted5.text = "\ue9af";
      this.view.verticalTabs1.lblCompleted5.skin = "sknIcon18pxGray";
    }
  },

  setOfflineChannelVisibility: function(selectType, fontIcon, flxHide){
    this.setCompletedIconVisibility();
    //unselected option
    if(selectType === "\ue966"){
      //make it selcted and change skin
      this.view[fontIcon].text = "\ue965";
      this.view[fontIcon].skin = "sknFontIconCheckBoxSelected";
      this.view[flxHide].setVisibility(true);
    }
    else{
      this.view[fontIcon].text = "\ue966";
      this.view[fontIcon].skin = "sknFontIconCheckBoxUnselected";
      this.view[flxHide].setVisibility(false);
    }
    //setting offline channel vertical option visibilty on/off  on selection of channel's in details page 
    if(!this.view.flxSMSChannelParent.isVisible && !this.view.flxEmailChannelParent.isVisible && !this.view.flxPushNotificationsParent.isVisible)
      this.offlineSelected = false;
    else
      this.offlineSelected = true;
    //top of flx on channel's visibilty on/off
    if(!this.view.flxSMSChannelParent.isVisible)
      this.view.flxEmailChannelParent.top = "20dp";
    else 
      this.view.flxEmailChannelParent.top = "10dp";
    if(!this.view.flxSMSChannelParent.isVisible && !this.view.flxEmailChannelParent.isVisible)
      this.view.flxPushNotificationsParent.top = "20dp";
    else 
      this.view.flxPushNotificationsParent.top = "10dp";
    
    this.setOptionVisibilty();
    this.view.ChannelsError.setVisibility(false);
  },
  
  setChannelsVisibility: function(selectType, fontIcon, channelSelected){
    this.setCompletedIconVisibility();
    //unselected option
    if(selectType === "\ue966"){
      //make it selcted and change skin
      this.view[fontIcon].text = "\ue965";
      this.view[fontIcon].skin = "sknFontIconCheckBoxSelected";
      this[channelSelected] = true;
    }
    else{
      this.view[fontIcon].text = "\ue966";
      this.view[fontIcon].skin = "sknFontIconCheckBoxUnselected";
      this[channelSelected] = false;
    }
    this.setOptionVisibilty();
    this.view.ChannelsError.setVisibility(false);
  },
  
  sortPopupEvents : function (sortColumn, segment, sortIcon) {
    var segData = segment.data;
    this.sortBy.column(sortColumn);
    segData = segData.sort(this.sortBy.sortData);
    this.determineSortFontIcon(this.sortBy, sortColumn, sortIcon);
    segment.setData(segData);
  },

  searchPopupEvents : function (text) {
    var self = this, segSelectEvents, flxNoResultFound, flxSearch, txtSearch, flxClearSearch;
    if(this.eventType==="WEB"){
      segSelectEvents = "segSelectPopupEventsWEB";
      flxNoResultFound = "flxNoResultFoundPopupEventsWEB";
      flxSearch = "flxDatasetSearchPopupEventsWEB";
      txtSearch = "tbxDatasetSearchBoxPopupEventsWEB";
      flxClearSearch = "flxPopupEventsClearSearchWEB";
    }
    else{
      segSelectEvents = "segSelectPopupEventsMOB";
      flxNoResultFound = "flxNoResultFoundPopupEventsMOB";
      flxSearch = "flxDatasetSearchPopupEventsMOB";
      txtSearch = "tbxDatasetSearchBoxPopupEventsMOB";
      flxClearSearch = "flxPopupEventsClearSearchMOB";
    }
    if (text === "") {
      self.view[txtSearch].text="";
      self.view[flxSearch].skin = "sknflxd5d9ddop100"; 
    }
    else {
      self.view[flxSearch].skin = "slFbox0ebc847fa67a243Search";
      self.view[flxClearSearch].setVisibility(true);
    }
    var segData = this.addEventData[this.eventType].filter(function(data)	{
      var searchText = self.view[txtSearch].text;
      if(typeof searchText === 'string' && searchText.length > 0){
        return data.lblName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      }else{
        return true;
      }
    });
    if(this.sortBy){
      this.view[segSelectEvents].setData(segData.sort(this.sortBy.sortData));
    }
    else{
      this.view[segSelectEvents].setData(segData);
    }
    this.view[segSelectEvents].setVisibility(segData.length>0);
    this.view[flxNoResultFound].setVisibility(segData.length===0);
    this.view.forceLayout();
  },

  setAddPopEventsData: function(data){
    var self = this, selectedEventsCount = 0, segSelectEvents, flxNoResultFound, lblDatasetCount, eventsPrevSelectedData;
    
    if(this.eventType==="WEB"){
      segSelectEvents = "segSelectPopupEventsWEB";
      flxNoResultFound = "flxNoResultFoundPopupEventsWEB";
      lblDatasetCount = "lblDatasetCountPopupEventsWEB";
    }
    else{
      segSelectEvents = "segSelectPopupEventsMOB";
      flxNoResultFound = "flxNoResultFoundPopupEventsMOB";
      lblDatasetCount = "lblDatasetCountPopupEventsMOB";
    }
    
    data = data.filter(function(val) {
      return val.eventSource === self.eventType;
    }); 
    if(this.eventType === "WEB")
      eventsPrevSelectedData = this.view.viewPopupEvents.segEventsWEB.data;
    else
      eventsPrevSelectedData = this.view.viewPopupEvents.segEventsMOB.data;
    var segData = data.map(function(event){
      // check events previously selected for view events page
      var isSelectedEvent = false, selectedEvent = eventsPrevSelectedData.filter(function(val) {
        return val.eventId === event.eventTriggerId;
      }); 
      if(selectedEvent.length){
        isSelectedEvent = true;
        selectedEventsCount++;
      }
      return {
        "eventId": event.eventTriggerId,
        "fontIconSelectOption":{
          text: isSelectedEvent? "\ue965" : "\ue966",
          skin: isSelectedEvent? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected",
          onClick: function(){
            self.selectUnselectEvents(segSelectEvents, lblDatasetCount);
          }
        },
        "lblName":event.eventName,
        "lblSeparator":"lblSeparator",
        "flxEventsDataSet":"flxEventsDataSet"
      };
    });
    this.view[segSelectEvents].setData(segData);
    this.view[segSelectEvents].setVisibility(segData.length>0);
    this.view[flxNoResultFound].setVisibility(segData.length===0);
    this.settingDataSetCount(selectedEventsCount, lblDatasetCount);
    this.view.forceLayout();
  },

  setAddEventsData: function(data){
    var self = this, componentId = null, selectedEventsCount = 0;
    if(this.eventType === "popup"){
      data = data.filter(function(data) {
        return data.eventTriggerType === "Popup";
      }); 
      this.addEventData = {};
      this.eventType = "MOBILE";
      self.setAddPopEventsData(data);
      this.eventType = "WEB";
      self.setAddPopEventsData(data);
      self.showPopupEventsPopup();
      this.addEventData.MOBILE = this.view.segSelectPopupEventsMOB.data;
      this.addEventData.WEB = this.view.segSelectPopupEventsWEB.data;
      return;
    }
    else if(this.eventType === "internal"){
      componentId = "viewInternalEvents";
      self.showInternalEventsPopup();
      data = data.filter(function(data) {
        return data.eventTriggerType === "Internal";
      }); 
    }
    else if(this.eventType === "external"){
      componentId = "viewExternalEvents";
      self.showExternalEventsPopup();
      data = data.filter(function(data) {
        return data.eventTriggerType === "External";
      }); 

    }
    var eventsPrevSelectedData = this.view[componentId].segEvents.data;
    var segData = data.map(function(event){
      // check events previously selected for view events page
      var isSelectedEvent = false, selectedEvent = eventsPrevSelectedData.filter(function(data) {
        return data.eventId === event.eventTriggerId;
      }); 
      if(selectedEvent.length){
        isSelectedEvent = true;
        selectedEventsCount++;
      }
      return {
        "eventId": event.eventTriggerId,
        "eventType": event.eventTriggerType,
        "fontIconSelectOption":{
          text: isSelectedEvent? "\ue965" : "\ue966",
          skin: isSelectedEvent? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected",
          onClick: function(){
            self.selectUnselectEvents("segSelectEvents", "lblDatasetCountEventsSelected");
          }
        },
        "lblName":event.eventName,
        "lblType":event.eventSource,
        "lblIdentifier":event.eventCode,
        "lblDate":event.eventDate || "N/A",
        "lblSeparator":"lblSeparator",
        "flxEventsDataSet":"flxEventsDataSet"
      };
    });
    this.view.segSelectEvents.setData(segData);
    this.view.segSelectEvents.setVisibility(segData.length);
    this.view.flxNoResultFoundEvents.setVisibility(!segData.length);
    this.settingDataSetCount(selectedEventsCount, "lblDatasetCountEventsSelected");
  },

  selectUnselectEvents: function(segSelectEvents, lblCount){
    var index = this.view[segSelectEvents].selectedRowIndex[1];
    var selItems = this.view[segSelectEvents].selectedItems[0];
    var selectedEventsCount = parseInt(this.view[lblCount].text);
    if(selItems.fontIconSelectOption.text === "\ue966"){
      selItems.fontIconSelectOption.text = "\ue965";
      selItems.fontIconSelectOption.skin = "sknFontIconCheckBoxSelected";
      selectedEventsCount++;
    }
    else{
      selItems.fontIconSelectOption.text = "\ue966";
      selItems.fontIconSelectOption.skin = "sknFontIconCheckBoxUnselected";
      selectedEventsCount--;
    }
    this.view[segSelectEvents].setDataAt(selItems, index);
    this.settingDataSetCount(selectedEventsCount, lblCount);
    // setting slected/unselect event in popup add events global variable 
    if(this.eventType === "MOBILE" || this.eventType === "WEB"){
      for(var i=0; i<this.addEventData[this.eventType].length; i++){
		if(this.addEventData[this.eventType][i].eventId === selItems.eventId){
          this.addEventData[this.eventType][i] = selItems;
          break;
        }
      }
    }
    this.view.forceLayout();
  },

  settingDataSetCount : function(count, lblCount){
    //setting data set(events selected) count
    if(!parseInt(count/10)) 
      count = "0" + count;
    this.view[lblCount].text = count;
  },

  resetEventsSelected : function(segSelectEvents, lblCount){
    var events = this.view[segSelectEvents].data;
    for(var i=0; i<events.length; i++){
      if(events[i].fontIconSelectOption.text === "\ue965"){
        events[i].fontIconSelectOption.text = "\ue966";
        events[i].fontIconSelectOption.skin = "sknFontIconCheckBoxUnselected";
        this.view[segSelectEvents].setDataAt(events[i], i);
      } 
    }    
    this.view[lblCount].text = "00";
    this.view.forceLayout();
  },

  resetPopupEventsSelected : function(segSelectEvents, lblCount){
    for(var i=0; i<this.addEventData[this.eventType].length; i++){
      if(this.addEventData[this.eventType][i].fontIconSelectOption.text === "\ue965"){
        this.addEventData[this.eventType][i].fontIconSelectOption.text = "\ue966";
        this.addEventData[this.eventType][i].fontIconSelectOption.skin = "sknFontIconCheckBoxUnselected";
      } 
    }   
    this.view[segSelectEvents].setData(this.addEventData[this.eventType]);
    this.view[lblCount].text = "00";
    this.view.forceLayout();
  },
  
  setViewEventsOnEdit : function(data){
    var setData = data.filter(function(data) {
      return data.eventTriggerType === "Internal";
    }); 
    this.eventType="internal";
    this.setEventsViewData(setData);
    
    setData = data.filter(function(data) {
      return data.eventTriggerType === "External";
    }); 
    this.eventType="external";
    this.setEventsViewData(setData);
    
    var setDataWeb = data.filter(function(data) {
      return data.eventTriggerType === "Popup" && data.eventSource === "WEB";
    });
    var setDataMobile = data.filter(function(data) {
      return data.eventTriggerType === "Popup" && data.eventSource === "MOBILE";
    });
    this.eventType="Popup";
    this.setPopupEventsViewData({"WEB":setDataWeb, "MOBILE": setDataMobile});

  },

  setViewEventsExpandCollapse: function(length, componentId){
    //setting events Body to collapse expand and changing icon on data length
    if(length < 1){
      this.view[componentId].flxEventsBody.setVisibility(false);
      this.view[componentId].fontIconEventsExpandCollapse.text = "\ue922";
    }
    else{
      this.view[componentId].flxEventsBody.setVisibility(true);
      this.view[componentId].fontIconEventsExpandCollapse.text = "\ue915";
    }
  },
  
  filterPopupEventsView: function(){
    var eventdata = {"WEB":[],"MOBILE":[]}, i;
    for(i=0; i<this.addEventData.WEB.length; i++){
      if(this.addEventData.WEB[i].fontIconSelectOption.text === "\ue965")
        eventdata.WEB.push(this.addEventData.WEB[i]);
    }
    for(i=0; i<this.addEventData.MOBILE.length; i++){
      if(this.addEventData.MOBILE[i].fontIconSelectOption.text === "\ue965")
        eventdata.MOBILE.push(this.addEventData.MOBILE[i]);
    }
    return eventdata;
  },

  setPopupEventsViewData: function(events){
    var segDataLen = 0;
    var segData = events.WEB.map(function(event){
      return {
        "eventId": event.eventId|| event.eventTriggerId,
        "lblEvent": { 
          text: event.lblName || event.eventName,
          left: "0dp"
        },
      };
    });
    this.view.viewPopupEvents.flxSegWEB.setVisibility(segData.length > 0);
    this.view.viewPopupEvents.segEventsWEB.setData(segData);
    segDataLen += segData.length;
    segData = events.MOBILE.map(function(event){
      return {
        "eventId": event.eventId|| event.eventTriggerId,
        "lblEvent": { 
          text: event.lblName || event.eventName,
          left: "0dp"
        },
      };
    });
    this.view.viewPopupEvents.flxSegMOB.setVisibility(segData.length > 0);
    this.view.viewPopupEvents.lblSeparator2.setVisibility(segData.length>0&&segDataLen>0);
    this.view.viewPopupEvents.segEventsMOB.setData(segData);
    segDataLen += segData.length;
    this.view.viewPopupEvents.flxEventsSegHeader.setVisibility(segDataLen > 0);
    this.view.viewPopupEvents.flxSegData.setVisibility(segDataLen > 0);
    this.view.viewPopupEvents.flxNoResultFound.setVisibility(!segDataLen > 0);
    this.view.flxNoEventsError.setVisibility(!segDataLen > 0);
    this.setViewEventsExpandCollapse(segDataLen, "viewPopupEvents");
    this.view.forceLayout();
  },
  
  setEventsViewData: function(eventsData){
    var self = this, componentId = null, header, eventsSelectedData;
    if(this.eventType === "internal"){
      componentId = "viewInternalEvents";
      header = kony.i18n.getLocalizedString("i18n.frmAdManagement.internalEvents");
    }
    else if(this.eventType === "external"){
      componentId = "viewExternalEvents";
      header = kony.i18n.getLocalizedString("i18n.frmAdManagement.externalEvents");
    }
    if(eventsData.length === 0){
      eventsSelectedData = this.view.segSelectEvents.data;
      eventsData = eventsSelectedData.filter(function(data) {
        return data.fontIconSelectOption.text === "\ue965";
      });
    }
    var segData = eventsData.map(function(event){
      return {
        "eventId": event.eventId|| event.eventTriggerId,
        "lblEvent": { text: event.lblName || event.eventName },
        "lblEventSource": {text: event.lblType || event.eventSource },
        "lblEventCode": {text: event.lblIdentifier || event.eventCode },
        "lblDelete":{
          text: "\ue91b",
          skin: "sknIcon20px",
        },
        "lblSeparator":"lblSeparator",
        "flxDelete":{
          isvisible: true,
          onClick: self.deleteViewEvent,
        },
        "flxEventsView":{
          //onHover: self.deleteButtonVisiblity
        },
      };
    });
    this.view[componentId].segEvents.setData(segData);
    this.changeSegViewEventsheaderText(componentId, header);
    this.setViewEventsExpandCollapse(segData.length, componentId);
    this.view.forceLayout();
  },

  changeSegViewEventsheaderText : function(componentId, header){
    var segData = this.view[componentId].segEvents.data;
    if(segData.length){
      var count;
      if(parseInt(segData.length/10)) 
        count = segData.length; 
      else
        count = "0"+ segData.length;
      this.view[componentId].lblEventsHeader.text = header + " (" + count +") ";
      this.view.flxNoEventsError.setVisibility(false);
    }
    else
      this.view[componentId].lblEventsHeader.text = header;
    //setting segment visibility according to segment length
    var hasData = segData.length > 0? true : false;
    this.view[componentId].flxEventsSegHeader.setVisibility(hasData);
    this.view[componentId].segEvents.setVisibility(hasData);
    this.view[componentId].flxNoResultFound.setVisibility(!hasData); 
  },

  deleteViewEvent: function(widget){
    var formPath = widget.parent.formPathId;
    var componentId = formPath.substring(formPath.indexOf("_") + 1, formPath.lastIndexOf("_")), header;
    if(componentId === "viewInternalEvents"){
      header = kony.i18n.getLocalizedString("i18n.frmAdManagement.internalEvents");
    }
    else if(componentId === "viewExternalEvents"){
      header = kony.i18n.getLocalizedString("i18n.frmAdManagement.externalEvents");
    }
    var index = this.view[componentId].segEvents.selectedRowIndex[1];
    this.view[componentId].segEvents.removeAt(index);
    this.changeSegViewEventsheaderText(componentId, header);
    this.view.forceLayout();
  },

  viewEmailPreview: function(){
    let scopeObj = this;
    scopeObj.view.lblSubject.text = scopeObj.view.txtFieldSubject.text;
    let str = document.getElementById("iframe_rtxEmailValue").contentWindow.document.getElementById("editor").innerHTML.replace(/"/g, "").replace(/<a href=[a-zA-Z0-9-/:._$@#%^&*+=(){}[\]]*\.(jpg|jpeg|png|gif|bmp|svg) class=>/g,"").replace(/<\/a>/g,"");
    let reg1 = /([a-zA-Z0-9-/:._$@#%^&*+=(){}[\]]*\.(jpg|jpeg|png|gif|bmp|svg))/g;	//regex for Image URL
    let arr = str.match(reg1);	//store all Image URLs given in the Email Content
    let cnt = 0;
    let finalString = ((arr===null)||(arr.length === 0)) ? str : str.replace(reg1,function($0){
      if(cnt===arr.length) cnt = 0;
      return "<img src=\"" + arr[cnt++] +"\" alt=Image Format should be jpg/jpeg/gif/png/bmp/svg>";
    });
    var finalStringafterclean=finalString.replace("<","\u003c").replace(">","\u003e").replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").replace("marquee","").replace("prompt","").replace("<","&lt").replace(">","&gt");
    var searchText=finalStringafterclean.split(">");
      finalStringafterclean = searchText.join("&gt");
      searchText = finalStringafterclean.split("<");
      finalStringafterclean = searchText.join("&lt");
    scopeObj.view.rtxEmailDescPreview.text = finalStringafterclean;
  },

  hideErrorMessagesOfflineChannel: function(){
    this.view.SMSError.setVisibility(false);
    this.view.txtAreaSMSContent.skin = "skntxtAread7d9e0";
    this.view.EmailSubjectError.setVisibility(false);
    this.view.flxEmailSubject.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.EmailError.setVisibility(false);
    this.view.flxRichTextParent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.PushNotificationsError.setVisibility(false);
    this.view.txtAreaPushNotificationsValue.skin = "skntxtAread7d9e0";
  },

  validateOfflineChannels: function(){
    var scopeObj = this;
    let isSmsON = this.view.flxSMSChannelParent.isVisible;
    let isEmailON = this.view.flxEmailChannelParent.isVisible;
    let isPushNotificationON = this.view.flxPushNotificationsParent.isVisible;
    let smsLength = scopeObj.view.txtAreaSMSContent.text.length;
    let emailSubjectLength = scopeObj.view.txtFieldSubject.text.length;
    scopeObj.emailContent = document.getElementById("iframe_rtxEmailValue").contentWindow.document.getElementById("editor").innerHTML;
    let emailLength = scopeObj.emailContent.length;
    let pushNotificationLength = scopeObj.view.txtAreaPushNotificationsValue.text.length;
    let proceed = true;
    if(isSmsON && smsLength===0){
      scopeObj.view.SMSError.setVisibility(true);
      scopeObj.view.txtAreaSMSContent.skin = "sknTxtError";
      proceed = false;
    }
    if(isEmailON){
      if(emailSubjectLength===0){
        scopeObj.view.EmailSubjectError.setVisibility(true);
        scopeObj.view.flxEmailSubject.skin = "sknFlxErrorE32416Border1pxRadius3px";
        proceed = false;
      }
      if(emailLength===0){
        scopeObj.view.EmailError.setVisibility(true);
        scopeObj.view.flxRichTextParent.skin = "sknFlxErrorE32416Border1pxRadius3px";
        proceed = false;
      }
    }
    if(isPushNotificationON && pushNotificationLength===0){
      scopeObj.view.PushNotificationsError.setVisibility(true);
      scopeObj.view.txtAreaPushNotificationsValue.skin = "sknTxtError";
      proceed = false;
    }
    return proceed;
  },
  
  filterActiveProfiles: function(profiles){
    if(profiles){
      profiles = profiles.filter(function (data) {
        if(data.profileStatus === "Active"){
          return data;
        }
      });
      return profiles;
    }
    else
      return [];
  },

  viewExistingRolesPopUp: function(profiles){
    var scopeObj = this;  
    scopeObj.view.flxConsentPopup.setVisibility(true);
    scopeObj.view.flxAddExistingRolesPopUp.setVisibility(true);
    scopeObj.view.flxAddExistingRoleMsgContainer.setVisibility(true);
    scopeObj.view.flxExistingRoleDetailsInner.setVisibility(false);
    scopeObj.view.tbxExistingRolesSearchBox.text="";
    scopeObj.view.flxExistingRolesClearSearch.setVisibility(false);
    scopeObj.view.flxExistingRolesSearch.skin = "sknflxd5d9ddop100";
    scopeObj.prevSelRoleindex.main=null;
    scopeObj.prevSelRoleindex.seg=null;
    scopeObj.view.flxProfilesData.removeAll();
    scopeObj.allProfiles = {};
    scopeObj.selectedProfileCount = 0;
    var hasData = profiles.length > 0;
    profiles.forEach(function(obj){
      scopeObj.allProfiles[obj.profileId] = obj;
      let isSelected = scopeObj.selectedProfiles.indexOf(obj.profileId) !== -1;
      scopeObj.selectedProfileCount = isSelected ? scopeObj.selectedProfileCount+1 : scopeObj.selectedProfileCount;
      var profileData = new com.adminConsole.adManagement.dataset({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": "flxProfile" + obj.profileId,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "overrides": {
          "lblName": {
            "text": obj.profileName,
            "width" : "122dp"
          },
          "lblId": {
            "text": obj.profileId ,
          },
          "fonticonCheckBox": {
            "text" :  isSelected ? "\ue965" : "\ue966",
            "skin" : isSelected ? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected",
            "onClick": function(eventobject) {
              scopeObj.onSelectProfile(eventobject, true);
            }
          },
          "flxDataset" : {
            "onClick": function(eventobject) {
              scopeObj.onSelectProfile(eventobject, false);
            }
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      scopeObj.view.flxProfilesData.add(profileData);
    });
    scopeObj.view.flxProfilesData.setVisibility(hasData);
    scopeObj.view.flxNoExistingRolesFound.setVisibility(!hasData);
    scopeObj.displayProfileCount();
    scopeObj.view.forceLayout();
    scopeObj.view.flxExistingRolesListSearchContainer.height = scopeObj.view.flxSelectRoleContainer.frame.height - 50 + "dp";
    scopeObj.view.flxProfilesData.height = scopeObj.view.flxExistingRolesListSearchContainer.frame.height - 60 + "dp";
  },

  populateAllAvailableAttributes : function(attributesMap, datasetId) {
    var scopeObj = this;
    var attribute ;
    var hasData = false;
    var attributesContainer = new com.adminConsole.adManagement.attributesContainer({
      "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
      "clipBounds": true,
      "id": "flxAttrContainer" + datasetId.replace(/_/g, ""),
      "isVisible": false,
      "layoutType": kony.flex.FLOW_VERTICAL,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "isModalContainer": false,
      "overrides": {}
    }, {
      "overrides": {}
    }, {
      "overrides": {}
    });
    for(var attrkey in attributesMap){
      hasData = true;
      attribute = attributesMap[attrkey];
      let isSelect = attribute.type === "SELECT";
      let isDate = attribute.type === "DATE";
      var attributeSelection = new com.adminConsole.adManagement.attributeSelection({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "id": "flxAttr" + attrkey.replace(/_/g, ""),
        "overrides": {
          "lblName" : {
            "text" : attribute.name + (attribute.helpText ? " ("+attribute.helpText + ") " : "")
          },
          "lblId" : {
            "text" : attrkey
          },
          "lblType" : {
            "text" : attribute.type.trim()
          },
          "lblRange" : {
            "text" : attribute.range.trim()
          },
          "txtValue" : {
            "isVisible" : !(isSelect || isDate)
          },
          "lstCriteria" : {
            "masterData" : scopeObj.formatOptionsData(attribute.criterias, false)
          },
          "lstValues" : {
            "isVisible" : isSelect,
            "masterData" : scopeObj.formatOptionsData(attribute.options, true)
          },
          "fonticonCheckBox" : {
            "onClick" : function(eventobject) {
              scopeObj.onSelectAttribute(eventobject);
            }
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      attributesContainer.flxAttributesDetailsBody.add(attributeSelection);
    }
    attributesContainer.lblNoAttributesFound.setVisibility(!hasData);
    attributesContainer.flxAttributesDetailsBody.setVisibility(hasData);
    scopeObj.view.flxAddAttributesDetailsMain.add(attributesContainer);
  },

  onSelectAttribute : function(eventobject){
    var scopeObj = this;
    if(scopeObj.view["flxDS" + scopeObj.currentDatasetId].fonticonCheckBox.text === "\ue966"){
      scopeObj.view["flxDS" + scopeObj.currentDatasetId].fonticonCheckBox.text = "\ue965";
      scopeObj.view["flxDS" + scopeObj.currentDatasetId].fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
      scopeObj.view["flxDS" + scopeObj.currentDatasetId].fontIconArrow.setVisibility(true);
      scopeObj.selectedDatasetCount = scopeObj.selectedDatasetCount + 1;
      scopeObj.displayDatasetCount();
    }
    var isSelected = eventobject.text === "\ue966" ;
    eventobject.text = isSelected ? "\ue965" : "\ue966" ;
    eventobject.skin = isSelected ? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected" ;
    eventobject.parent.parent.parent.parent.parent.updateAttributeSelectionCount(isSelected);
  },

  resetAllFields : function() {
    var scopeObj = this ;
    //reset of acces for navigation through vertical tab.
    scopeObj.screenValidationMapper = {"0" : true, "1" : !scopeObj.isCreate, "2" : !scopeObj.isCreate, 
                                       "3" : !scopeObj.isCreate, "4" : !scopeObj.isCreate, "5" : !scopeObj.isCreate,
                                       "6" : !scopeObj.isCreate, "7" : !scopeObj.isCreate, "8" : !scopeObj.isCreate } ;
    // making vertical flx visibility on for offline and in app channel
    scopeObj.view.verticalTabs1.flxOption5.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.verticalTabs1.flxOption3.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.verticalTabs1.flxOption4.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.verticalTabs1.flxOption2.setVisibility(true);
    // making channel selcted global variable true
    scopeObj.offlineSelected = true;
    scopeObj.inAppSelected = true;
    scopeObj.inAppPopupSelected = true;
    // making separator on for target customer, offline channel
    scopeObj.view.verticalTabs1.flxSeparatorContainer3.setVisibility(true);
    scopeObj.view.verticalTabs1.flxSeparatorContainer4.setVisibility(true);
    scopeObj.view.verticalTabs1.flxSeparatorContainer2.setVisibility(true);
    var radioBtnData = [{src:"radio_notselected.png", value:"Marketing", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"},
                        {src:"radio_notselected.png", value:"Informational", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"},
                        {src:"radio_notselected.png", value:"Regulatory", selectedImg:"radio_selected.png", unselectedImg:"radio_notselected.png"}];
    scopeObj.view.customRadioButtonGroup.setData(radioBtnData);
    // resetting completed option skin and text
    scopeObj.view.verticalTabs1.lblCompleted1.skin = "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted3.skin = "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted4.skin = "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted5.skin = "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted2.skin = scopeObj.isDefaultCampaign? "sknFontIconCompleted" : "sknIcon18pxGray";
    scopeObj.view.verticalTabs1.lblCompleted1.text = "\ue9af";
    scopeObj.view.verticalTabs1.lblCompleted3.text = "\ue9af";
    scopeObj.view.verticalTabs1.lblCompleted4.text = "\ue9af";
    scopeObj.view.verticalTabs1.lblCompleted5.text = "\ue9af";
    scopeObj.view.verticalTabs1.lblCompleted2.text = scopeObj.isDefaultCampaign? "\ue9ae" : "\ue9af";
    // setting skin on for offline and in app channel's slected option
    scopeObj.view.fontIconSmsChannelSelectOption.text = "\ue965";
    scopeObj.view.fontIconEmailChannelSelectOption.text = "\ue965";
    scopeObj.view.fontIconPushNotificationChannelSelectOption.text = "\ue965";
    scopeObj.view.fontIconInAppChannelSelectOption.text = "\ue965";
    scopeObj.view.fontIconInAppPopupChannelSelectOption.text = "\ue965";
    scopeObj.view.fontIconSmsChannelSelectOption.skin = "sknFontIconCheckBoxSelected";
    scopeObj.view.fontIconEmailChannelSelectOption.skin = "sknFontIconCheckBoxSelected";
    scopeObj.view.fontIconPushNotificationChannelSelectOption.skin = "sknFontIconCheckBoxSelected";
    scopeObj.view.fontIconInAppChannelSelectOption.skin = "sknFontIconCheckBoxSelected";
    scopeObj.view.fontIconInAppPopupChannelSelectOption.skin = "sknFontIconCheckBoxSelected";
    //Popup Banner details copy Unselect 1st time
    this.view.MobilePopupDetails.fontIconSelectOption.text = "\ue966";
    this.view.MobilePopupDetails.fontIconSelectOption.skin = "sknFontIconCheckBoxUnselected";
    this.view.WebPopupDetails.flxCopyBannerDetails.setVisibility(false);
    //set Events Data on Begining
    this.view.viewInternalEvents.segEvents.setVisibility(false);
    this.view.viewExternalEvents.segEvents.setVisibility(false);
    this.view.viewPopupEvents.flxSegData.setVisibility(false);
    this.view.viewInternalEvents.flxNoResultFound.setVisibility(true);
    this.view.viewExternalEvents.flxNoResultFound.setVisibility(true);
    this.view.viewPopupEvents.flxNoResultFound.setVisibility(true);
    this.view.viewInternalEvents.flxEventsBody.setVisibility(false);
    this.view.viewExternalEvents.flxEventsBody.setVisibility(false);
    this.view.viewPopupEvents.flxEventsBody.setVisibility(false);
    this.view.viewInternalEvents.fontIconEventsExpandCollapse.text ="\ue922";
    this.view.viewExternalEvents.fontIconEventsExpandCollapse.text ="\ue922";
    this.view.viewPopupEvents.fontIconEventsExpandCollapse.text ="\ue922";
    this.view.viewPopupEvents.segEventsWEB.setData([]);
    this.view.viewPopupEvents.segEventsMOB.setData([]);
    this.view.viewInternalEvents.segEvents.setData([]);
    this.view.viewExternalEvents.segEvents.setData([]);
    this.setViewEventsExpandCollapse(0, "viewInternalEvents");
    this.setViewEventsExpandCollapse(0, "viewExternalEvents");
    this.setViewEventsExpandCollapse(0, "viewPopupEvents");
    this.view.viewInternalEvents.lblEventsHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.internalEvents");
    this.view.viewExternalEvents.lblEventsHeader.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.externalEvents");
    this.view.segSelectEvents.setData([]);
    //Events error msg visibility off
    this.view.flxNoEventsError.setVisibility(false);
    this.view.flxNoPopupBannerError.setVisibility(false);
    //setting product group first time data
    this.view.flxProductGroup.width = "200dp";
    this.view.flxProduct.setVisibility(false);
    this.presenter.getAllProductGroups({});
    //setting product name first time data
    this.view.flxProductName.width = "200dp";
    this.view.lbxProductName.setEnabled(false);
    this.view.lbxProductName.skin = "sknLstBxBre1e5edBgf5f6f813pxDisableHover";
    this.view.lbxProductName.masterData = [["lb0", kony.i18n.getLocalizedString("i18n.frmAdManagement.selectProductName")],];
    //setting priority list popup
    this.campaignNamePriorityList = scopeObj.presenter.getCampaignPriorities();
    scopeObj.view.segCampaigns.setData([]);
    if(this.campaignNamePriorityList)
      this.setCampaignPriorityList(scopeObj.campaignNamePriorityList); 
    // adname
    scopeObj.view.txtAdName.text = scopeObj.isDefaultCampaign ? scopeObj.defaultCampaignObject.name : "";
    scopeObj.view.txtDescription.text = scopeObj.isDefaultCampaign ? scopeObj.defaultCampaignObject.description : "";
    scopeObj.view.txtPriority.text = scopeObj.isDefaultCampaign ? "00" : "";
    scopeObj.view.lblPriorityInfoText.text = scopeObj.isDefaultCampaign ? kony.i18n.getLocalizedString("i18n.frmAdManagement.DefaultCampaignPriority") : kony.i18n.getLocalizedString("i18n.frmAdManagement.PriorityInfoText");
    scopeObj.allDatasets = {};
    scopeObj.view.tbxSearchBox.text = "";
    scopeObj.previousPriority = "";
    scopeObj.groupsToAdd = [];
    scopeObj.groupsToDelete = [];
    scopeObj.resetSkins();
    scopeObj.view.segSelectedOptions.removeAll();
    scopeObj.view.segAddOptions.removeAll();
    scopeObj.hasSelectedCustomersData();
    scopeObj.hasAvailableCustomersData();
    scopeObj.view.txtAdName.setEnabled(!scopeObj.isDefaultCampaign);
    scopeObj.view.txtDescription.setEnabled(!scopeObj.isDefaultCampaign);
    scopeObj.view.txtPriority.setEnabled(!scopeObj.isDefaultCampaign);
    scopeObj.view.txtPriority.secureTextEntry = scopeObj.isDefaultCampaign;
    scopeObj.view.flxDateContainer.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.rtxDefaultDateInfo.setVisibility(scopeObj.isDefaultCampaign);
    scopeObj.view.flxAdType.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.flxChannels.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.segTargetCustomerRoles.setData([]);
    scopeObj.constructAdSpecifications();
    scopeObj.selectedAttributes = [];
    scopeObj.selectedDatasets = [];
    scopeObj.selectedProfiles = [];
    scopeObj.templatesMapper = {};
    scopeObj.resetOfflineTemplates();
    //In app popup reset
    scopeObj.showHideAllPopupBanner(true);
    scopeObj.resetSkinPopupDetails("WebPopupDetails");
    scopeObj.resetSkinPopupDetails("MobilePopupDetails");
    scopeObj.resetFieldsPopupDetails("WebPopupDetails");
    scopeObj.resetFieldsPopupDetails("MobilePopupDetails");
	this.hasUnsavedChanges = false;
  },

  resetOfflineTemplates : function(){
    var scopeObj = this;
    for(var type in scopeObj.offlineTemplateMapper){
      let template = scopeObj.offlineTemplateMapper[type];
      scopeObj.view[template[0]].text = "";
      scopeObj.view[template[1]].setVisibility(scopeObj.isCreate);
      scopeObj.emailContent = "";
    }
    scopeObj.view.txtAreaPushNotificationsValue.skin = "skntxtAread7d9e0";
    scopeObj.view.txtAreaSMSContent.skin = "skntxtAread7d9e0";
    scopeObj.view.flxEmailSubject.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    scopeObj.view.flxRichTextParent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
  },

  resetSkins : function() {
    var scopeObj = this ;
    scopeObj.view.txtAdName.skin = scopeObj.isDefaultCampaign ? "txtD7d9e0disabledf3f3f3" : "txtD7d9e0";
    scopeObj.view.AdNameError.setVisibility(false);
    scopeObj.view.txtDescription.skin = "skntxtAread7d9e0";
    scopeObj.view.AdDescriptionError.setVisibility(false);
    scopeObj.view.txtPriority.skin = scopeObj.isDefaultCampaign ? "txtD7d9e0disabledf3f3f3" : "txtD7d9e0";
    scopeObj.view.PriorityError.setVisibility(false);
    scopeObj.view.AdTypeError.setVisibility(false);
    scopeObj.view.ChannelsError.setVisibility(false);
    scopeObj.view.flxStartDate.skin = "sknFlxCalendar";
    scopeObj.view.flxEndDate.skin = "sknFlxCalendar";
    scopeObj.view.StartDateError.setVisibility(false);
    scopeObj.view.EndDateError.setVisibility(false);
    scopeObj.view.lblEndDateTip.setVisibility(true);
    scopeObj.view.lblStartDateTip.setVisibility(true);
  },
  
  resetSkinPopupDetails: function(componentId){
    //skin reset of popup details
    this.view[componentId].txtBannerHeadline.skin = "txtD7d9e0";
    this.view[componentId].txtBannerDescription.skin = "skntxtAread7d9e0";
    this.view[componentId].txtBannerImgSource.skin = "txtD7d9e0";
    this.view[componentId].txtBannerTargetURLSource.skin = "txtD7d9e0";
    this.view[componentId].txtCTABtnLablel.skin = "txtD7d9e0";
    this.view[componentId].txtCTATargetURL.skin = "txtD7d9e0";
    this.view[componentId].BannerHeadlineError.setVisibility(false);
    this.view[componentId].BannerDescriptionError.setVisibility(false);
    this.view[componentId].BannerImageError.setVisibility(false);
    this.view[componentId].BannerTargetURLError.setVisibility(false);
    this.view[componentId].CTABtnLblError.setVisibility(false);
    this.view[componentId].CTATargetURLError.setVisibility(false);
  },
  
  resetFieldsPopupDetails: function(componentId){
    //text reset of popup details
    this.view[componentId].txtBannerHeadline.text = "";
    this.view[componentId].txtBannerDescription.text = "";
    this.view[componentId].txtBannerImgSource.text = "";
    this.view[componentId].txtBannerTargetURLSource.text = "";
    this.view[componentId].txtCTABtnLablel.text = "";
    this.view[componentId].txtCTATargetURL.text = "";
    this.view[componentId].fonticonArrow.text = "\ue915";
    this.view[componentId].SwithShowReadLater.selectedIndex = 0;
    this.view[componentId].SwitchShowCloseIcon.selectedIndex = 0;
    this.view[componentId].switchAds.selectedIndex = 0;
  },

  validateEvents: function() {
    var scopeObj = this;
    var hasInternalEvents = this.view.viewInternalEvents.segEvents.data.length > 0;
    var hasExternalEvents = this.view.viewExternalEvents.segEvents.data.length > 0;
    var hasPopupEvents = this.view.viewPopupEvents.segEventsWEB.data.length > 0 || this.view.viewPopupEvents.segEventsMOB.data.length > 0
    if(scopeObj.inAppSelected && !hasInternalEvents){
      this.view.flxNoEventsError.setVisibility(true);
      this.view.lblNoEventsErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorInternalEventSelect");
      return false;
    } else if(scopeObj.inAppPopupSelected && !hasPopupEvents){
      this.view.flxNoEventsError.setVisibility(true);
      this.view.lblNoEventsErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorPopupEventSelect");
      return false;
    } else if(hasInternalEvents || hasExternalEvents || hasPopupEvents){
      this.view.flxNoEventsError.setVisibility(false);
      return true;
    }
    else{
      this.view.flxNoEventsError.setVisibility(true);
      this.view.lblNoEventsErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEventSelect");
      return false;
    }
  },

  validatePopupScreens: function(){
    var hasValidPopupDetails = true;
    var isWebBannerHidden = this.view.WebPopupDetails.flxHideAdContainer.isVisible;
    var isMobileBannerHidden = this.view.MobilePopupDetails.flxHideAdContainer.isVisible;
    var isWebPopupEventsSelected = this.view.viewPopupEvents.segEventsWEB.data.length !== 0;
    var isMobilePopupEventsSelected = this.view.viewPopupEvents.segEventsMOB.data.length !== 0;

    if(isWebBannerHidden && isMobileBannerHidden) {
      this.view.lblNoPopupBannerErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorRequireOnePopupBanner");
      this.view.flxNoPopupBannerError.setVisibility(true);
      hasValidPopupDetails = false;   
    }
    else if(isWebBannerHidden && isWebPopupEventsSelected){
      this.view.lblNoPopupBannerErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorRequireWebPopupBanner");
      this.view.flxNoPopupBannerError.setVisibility(true);
      hasValidPopupDetails = false;   
    }
    else if(isMobileBannerHidden && isMobilePopupEventsSelected){
      this.view.lblNoPopupBannerErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorRequireMobilePopupBanner");
      this.view.flxNoPopupBannerError.setVisibility(true);
      hasValidPopupDetails = false;   
    }
    else{
      var hasValidPopupDetailsWeb = this.validatePopupScreenFields("MobilePopupDetails");
      var hasValidPopupDetailsMobile = this.validatePopupScreenFields("WebPopupDetails");
      hasValidPopupDetails = hasValidPopupDetailsWeb && hasValidPopupDetailsMobile;
    }
    return hasValidPopupDetails;
  },
  
  validatePopupScreenFields: function(componentId) {
    var hasValidPopupDetails = true;
    this.resetSkinPopupDetails(componentId);
    var isBannerHidden = this.view[componentId].flxHideAdContainer.isVisible;
    if(!isBannerHidden){
      if(this.view[componentId].txtBannerHeadline.text.trim() === "") {
        this.view[componentId].txtBannerHeadline.skin = "skinredbg" ;
        this.view[componentId].BannerHeadlineError.setVisibility(true);
        hasValidPopupDetails = false;
      }

      if(this.view[componentId].txtBannerDescription.text.trim() === "") {
        this.view[componentId].txtBannerDescription.skin = "sknTxtError" ;
        this.view[componentId].BannerDescriptionError.setVisibility(true);
        hasValidPopupDetails = false;
      }

      hasValidPopupDetails = this.verifyImageURL(this.view[componentId].txtBannerImgSource, this.view[componentId].BannerImageError);
      hasValidPopupDetails = this.verifyTargetURL(this.view[componentId].txtBannerTargetURLSource, this.view[componentId].BannerTargetURLError);

      if(this.view[componentId].txtCTABtnLablel.text.trim() === "") {
        this.view[componentId].txtCTABtnLablel.skin = "skinredbg" ;
        this.view[componentId].CTABtnLblError.setVisibility(true);
        hasValidPopupDetails = false;
      }
      hasValidPopupDetails = this.verifyTargetURL(this.view[componentId].txtCTATargetURL, this.view[componentId].CTATargetURLError);
    }
    return hasValidPopupDetails;
  },

  validateBasicDetails : function() {
    var scopeObj = this;
    scopeObj.resetSkins();
    scopeObj.hasValidBasicDetails = true;
    scopeObj.hasUniqueCampaignName = true;
    scopeObj.isExisitingPriority = false;
    var hasCampaignNameChange = false;
    if(scopeObj.view.txtDescription.text.trim() === "") {
      scopeObj.view.txtDescription.skin = "sknTxtError" ;
      scopeObj.view.AdDescriptionError.setVisibility(true);
      scopeObj.hasValidBasicDetails = false;
    }
    if(!scopeObj.isDefaultCampaign){
      var adName = scopeObj.view.txtAdName.text.trim() ;
      if(adName === "") {
        scopeObj.view.txtAdName.skin = "skinredbg" ;
        scopeObj.view.AdNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorAdName");
        scopeObj.view.AdNameError.setVisibility(true);
        scopeObj.hasValidBasicDetails = false;
      }
      var radBtn = this.view.customRadioButtonGroup.imgRadioButton1.src;
      var radBtn1 = this.view.customRadioButtonGroup.imgRadioButton2.src;
      var radBtn2 = this.view.customRadioButtonGroup.imgRadioButton3.src;
      if(radBtn === "radio_notselected.png" && radBtn1 === "radio_notselected.png" && radBtn2 === "radio_notselected.png"){
        scopeObj.view.AdTypeError.setVisibility(true);
        scopeObj.hasValidBasicDetails = false;
      }

      if(radBtn === "radio_selected.png"){
        if(this.view.lbxProductGroup.selectedKey === "lb0"){
          scopeObj.view.productGroupError.setVisibility(true);
          scopeObj.view.lbxProductGroup.skin = "sknlbxeb30173px";
          scopeObj.hasValidBasicDetails = false;
        }
        else if(this.view.lbxProductName.selectedKey === "lb0"){
          scopeObj.view.productNameError.setVisibility(true);
          scopeObj.view.lbxProductName.skin = "sknlbxeb30173px";

        }
      }

      if(!scopeObj.offlineSelected && !scopeObj.inAppSelected && !scopeObj.inAppPopupSelected){
        scopeObj.view.ChannelsError.setVisibility(true);
        scopeObj.view.ChannelsError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorOneChannelSelect");
        scopeObj.hasValidBasicDetails = false;
      }
      var priority = scopeObj.view.txtPriority.text.trim();
      if(priority === "") {
        scopeObj.view.txtPriority.skin = "skinredbg" ;
        scopeObj.view.PriorityError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorPriority");
        scopeObj.view.PriorityError.setVisibility(true);
        scopeObj.hasValidBasicDetails = false;
      } else if(parseInt(priority) < 1 || parseInt(priority) > 99) {
        scopeObj.view.txtPriority.skin = "skinredbg" ;
        scopeObj.view.PriorityError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorPriorityRange");
        scopeObj.view.PriorityError.setVisibility(true);
        scopeObj.hasValidBasicDetails = false;
      }
      var startDate = scopeObj.view.customStartDate.value.trim().replace(/-/g,"/");
      var isValidateDates = scopeObj.isCreate || (scopeObj.isEdit && startDate !== scopeObj.campaignData.startDate.replace(/-/g,"/") );
      var maxStartDate = new Date(new Date().setDate(new Date().getDate()+90)) ;
      startDate = new Date(startDate);
      if(isNaN(startDate) ) {
        scopeObj.view.StartDateError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorStartDate");
        scopeObj.view.StartDateError.setVisibility(true);
        scopeObj.view.lblStartDateTip.setVisibility(false);
        scopeObj.view.flxStartDate.skin = "sknFlxCalendarError";
        scopeObj.hasValidBasicDetails = false;
      } else if(isValidateDates && scopeObj.isInValidDate(new Date(),startDate)) {
        scopeObj.view.StartDateError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorStartDateLessThanToday");
        scopeObj.view.StartDateError.setVisibility(true);
        scopeObj.view.lblStartDateTip.setVisibility(false);
        scopeObj.view.flxStartDate.skin = "sknFlxCalendarError";
        scopeObj.hasValidBasicDetails = false;
      } else if(isValidateDates && scopeObj.isInValidDate(startDate,maxStartDate)){
        scopeObj.view.StartDateError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorStartDateLessThan90Days");
        scopeObj.view.StartDateError.setVisibility(true);
        scopeObj.view.lblStartDateTip.setVisibility(false);
        scopeObj.view.flxStartDate.skin = "sknFlxCalendarError";
        scopeObj.hasValidBasicDetails = false;
      }
      var endDate = scopeObj.view.customEndDate.value.trim().replace(/-/g,"/");
      isValidateDates = scopeObj.isCreate || (scopeObj.isEdit && endDate !== scopeObj.campaignData.endDate.replace(/-/g,"/") );
      endDate = new Date(endDate);  
      if(isNaN(endDate)) {
        scopeObj.view.EndDateError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDate");
        scopeObj.view.EndDateError.setVisibility(true);
        scopeObj.view.lblEndDateTip.setVisibility(false);
        scopeObj.view.flxEndDate.skin = "sknFlxCalendarError";
        scopeObj.hasValidBasicDetails = false;
      } else if(isValidateDates &&  scopeObj.isInValidDate(startDate,endDate, true)){
        scopeObj.view.EndDateError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDateLessThanStartDate");
        scopeObj.view.EndDateError.setVisibility(true);
        scopeObj.view.lblEndDateTip.setVisibility(false);
        scopeObj.view.flxEndDate.skin = "sknFlxCalendarError";
        scopeObj.hasValidBasicDetails = false;
      } else if(isValidateDates && scopeObj.isInValidDate(endDate,new Date(startDate.setDate(startDate.getDate()+90)))){
        scopeObj.view.EndDateError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDateLessThan90Days");
        scopeObj.view.EndDateError.setVisibility(true);
        scopeObj.view.lblEndDateTip.setVisibility(false);
        scopeObj.view.flxEndDate.skin = "sknFlxCalendarError";
        scopeObj.hasValidBasicDetails = false;
      }
      hasCampaignNameChange = adName !== "" && ((scopeObj.isEdit && adName !== scopeObj.campaignData.campaignName) || scopeObj.isCreate);
      if(hasCampaignNameChange)
        scopeObj.campaignNameExistingConflict();
      if(scopeObj.isPriorityTextChange){
        scopeObj.hasExistingPriority(this.campaignNamePriorityList);
        if(scopeObj.isExisitingPriority)
          scopeObj.hasValidBasicDetails = false;
      }    
      /*if(hasCampaignNameChange || scopeObj.isPriorityTextChange) {
        scopeObj.presenter.campaignNameAndPriorityExistingConflicts({ "name" : adName }, hasCampaignNameChange, scopeObj.isPriorityTextChange);
      }*/
    }
    return scopeObj.hasValidBasicDetails;
  },

  campaignNameExistingConflict: function(){
    var adName = this.view.txtAdName.text;
    var data = this.campaignNamePriorityList.filter(function(data) {
      return data.name === adName;
    });
    if(data.length){
      this.view.txtAdName.skin = "skinredbg" ;
      this.view.AdNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignNameExists");
      this.view.AdNameError.setVisibility(true);
      this.hasUniqueCampaignName = false;
      this.hasValidBasicDetails = false;
    }
  },

  isInValidDate: function(date1, date2, isEndDateValidation ){
    var isInValid = false;
    if (isNaN(date1.getDate()) || isNaN(date2.getDate())) {
      isInValid = true;
    } 
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    if(date1 - date2 > 0 || (isEndDateValidation && date1 - date2 === 0)) {
      isInValid = true;
    }
    return isInValid;
  },

  closePopup : function() {
    var scopeObj = this;
    scopeObj.view.flxConsentPopup.setVisibility(false);
    scopeObj.view.flxCampaignList.setVisibility(false);
    scopeObj.view.popUp.setVisibility(false);
    scopeObj.view.warningpopup.setVisibility(false);
    scopeObj.view.flxViewAdPreview.setVisibility(false);
    scopeObj.view.flxAddAttributesPopUp.setVisibility(false);
    scopeObj.view.flxAddExistingRolesPopUp.setVisibility(false);
    scopeObj.view.flxAddEventsPopUp.setVisibility(false);
    scopeObj.view.flxAddPopupEventsPopup.setVisibility(false);
    scopeObj.view.flxPopUpScreenPreview.setVisibility(false);
  },

  constructAdSpecifications : function() {
    var scopeObj = this;
    var isWeb = false;
    var screenObj ;
    var channelObj ;
    var concatId ;
    scopeObj.existingCustomerGroups = [];
    scopeObj.adCount = 0;
    var specificationsArray = scopeObj.isDefaultCampaign ? scopeObj.defaultCampaignObject.specifications : scopeObj.campaignSpecifications;
    for(var modulekey in scopeObj.moduleNameMapper){
      for(var i = 0; i<specificationsArray.screens.length; i++){
        screenObj = specificationsArray.screens[i];
        if(modulekey === screenObj.screenId) {
          scopeObj.view[scopeObj.moduleNameMapper[modulekey][1]].removeAll();
          for(var channelKey in scopeObj.channelNameMapper){
            for(var j = 0; j<screenObj.channels.length; j++){
              channelObj = screenObj.channels[j];
              if(channelKey === channelObj.channelId) {
                concatId = modulekey.replace(/_/g,"") + channelKey.replace(/_/g,"");
                scopeObj.adCount = scopeObj.isCreate ? scopeObj.adCount+1 : scopeObj.adCount;
                var channelTemplate = new com.adminConsole.adManagement.channelTemplate({
                  "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                  "clipBounds": true,
                  "id": concatId,
                  "isVisible": true,
                  "layoutType": kony.flex.FLOW_VERTICAL,
                  "masterType": constants.MASTER_TYPE_DEFAULT,
                  "isModalContainer": false,
                  "overrides": {
                    "lblChannelName" : {
                      "text" : scopeObj.channelNameMapper[channelKey]
                    },
                    "lblModuleName" : {
                      "text" : scopeObj.moduleNameMapper[modulekey][0]
                    },
                    "switchAds" : {
                      "onSlide": function(eventobject){
                        scopeObj.showOrHideAds(eventobject);
                      }
                    },
                    "lblChannelArrow" : {
                      "onClick" : function(eventobject) {
                        scopeObj.showOrHideChannel(eventobject);
                      }
                    },
                    "flxImageCounter" : {
                      "isVisible" : scopeObj.isDefaultCampaign
                    },
                    "flxDisplayAds" : {
                      "isVisible" : !scopeObj.isDefaultCampaign
                    }
                  }
                }, {
                  "overrides": {}
                }, {
                  "overrides": {}
                });
                scopeObj.constructImageConainer(channelTemplate, channelObj.resolutions);
                if(j > 0){
                  var lblLine = new kony.ui.Label(extendConfig({
                    "bottom": "0dp",
                    "height": "1dp",
                    "id": "lblLine",
                    "isVisible": true,
                    "left": "0dp",
                    "right": "0dp",
                    "skin": "sknlblSeperatorD7D9E0",
                    "text": "l",
                    "top": "30dp",
                    "width": "100%",
                    "zIndex": 1
                  }), extendConfig({
                    "contentAlignment": constants.CONTENT_ALIGN_MIDDLE_LEFT,
                    "padding": [0, 0, 0, 0],
                    "paddingInPixel": false
                  }), extendConfig({}));
                  channelTemplate.add(lblLine);
                }
                if(scopeObj.isDefaultCampaign) {
                  scopeObj.constructImageCounter(channelTemplate);
                }
                scopeObj.view[scopeObj.moduleNameMapper[modulekey][1]].add(channelTemplate);
              }
            }
          }
        }
      }
    }
    scopeObj.view.forceLayout();
  },

  showOrHideChannel : function(eventobject) {
    var scopeObj = this;
    var toCollapse = eventobject.text === "\ue915";
    eventobject.text = toCollapse ? "\ue922" : "\ue915";
    eventobject.parent.parent.parent.flxChannelContainer.setVisibility(!toCollapse);
    scopeObj.view[eventobject.parent.parent.parent.parent.id].forceLayout();
  },

  constructImageCounter : function(channelTemplate) {
    var scopeObj = this;
    var imageContainerCount = channelTemplate.flxChannelDetails.children.length ;
    var defaultImageCount = new com.adminConsole.adManagement.defaultImageCount({
      "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
      "clipBounds": true,
      "id": "defaultImageCount",
      "isVisible": true,
      "layoutType": kony.flex.FREE_FORM,
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "isModalContainer": false,
      "overrides": {
        "flxRadioOption1" : {
          "onClick" : function(eventobject) {
            scopeObj.selectRadio(1, channelTemplate.id);
          }
        },
        "flxRadioOption2" : {
          "onClick" : function(eventobject) {
            scopeObj.selectRadio(2, channelTemplate.id);
          }
        },
        "flxRadioOption3" : {
          "onClick" : function(eventobject) {
            scopeObj.selectRadio(3, channelTemplate.id);
          }
        },
      }
    }, {
      "overrides": {}
    }, {
      "overrides": {}
    });
    defaultImageCount["imgRadio" + imageContainerCount].src = "radio_selected.png";
    channelTemplate.flxImageCounter.add(defaultImageCount);
  },

  constructImageConainer : function(channelTemplate, resolutions) {
    var scopeObj = this;
    var imageConfigurations = {};
    var imageIndex = "";
    if(scopeObj.isDefaultCampaign) {
      for(var i = 0; i<resolutions.length; i++){
        imageIndex = resolutions[i].imageIndex;
        if(imageIndex) {
          var configObj = [];
          if(imageConfigurations.hasOwnProperty(imageIndex)) {
            configObj = imageConfigurations[imageIndex];
          }
          configObj.push(resolutions[i]);
          imageConfigurations[imageIndex] = configObj ;
        }
      }
    } else {
      imageConfigurations[imageIndex] = resolutions ;
    }
    for(var imageIndex in imageConfigurations) {
      var imageContainer = new com.adminConsole.adManagement.imageContainer({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": "imageContainer"+imageIndex,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "overrides": {
          "btnTargetVerify" : {
            "onClick" : function(eventobject) {
              scopeObj.showTargetURL(eventobject.parent.txtTargetSource, eventobject.parent.parent.imgTargetError);
            }
          },
          "lblImgConfig" : {
            "text" : kony.i18n.getLocalizedString("i18n.frmAdManagement.ImageConfiguration") + " " + imageIndex
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {
          "txtTargetSource" : {
            "onKeyUp" : function(eventobject){
              scopeObj.hideTargetErrorMsg(eventobject);
            },
            "onEndEditing" : function(eventobject){
              var targetURL = eventobject.text;
              if(targetURL.indexOf("www.") === 0){
                eventobject.text = "https://" + targetURL;
              }
            }
          }
        }
      });
      scopeObj.constructResolutions(imageContainer, imageConfigurations[imageIndex]);
      channelTemplate.flxChannelDetails.add(imageContainer);
    }
  },

  constructResolutions : function(imageContainer, resolutions) {
    var scopeObj = this;
    var resolutionObj ;
    var imageId  ;
    var targetUrl ;
    for(var i=0; i<resolutions.length; i++){
      resolutionObj = resolutions[i];
      imageId = resolutionObj.imageResolution ? resolutionObj.imageResolution : "";
      imageId += resolutionObj.imageIndex ? resolutionObj.imageIndex : "";
      imageId += resolutionObj.imageScale ? resolutionObj.imageScale : "";
      targetUrl = resolutionObj.targetURL && resolutionObj.targetURL.length > 0 ? resolutionObj.targetURL : "";
      var imageSourceURL = new com.adminConsole.adManagement.imageSourceURL({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": resolutionObj.placeholderId,
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "overrides": {
          "lblImageIndex" : {
            "text" : resolutionObj.imageScale
          },
          "lblResolutionValue" : {
            "text" : resolutionObj.imageResolution
          },
          "btnImgVerify" : {
            "onClick" : function(eventobject) {
              scopeObj.verifyImageSource(eventobject);
            }
          },
          "txtImgSource" : {
            "text" : scopeObj.isDefaultCampaign ? resolutionObj.imageURL : ""
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {
          "txtImgSource" : {
            "onKeyUp" : function(eventobject){
              scopeObj.hideErrorMsg(eventobject);
            },
            "onEndEditing" : function(eventobject){
              var url = eventobject.text;
              if(url.indexOf("www.") === 0){
                eventobject.text = "https://" + url;
              }
            }
          },
        }
      });
      imageContainer.txtTargetSource.text = targetUrl;
      imageContainer.flxImageSource.add(imageSourceURL);
    }
  },

  hideTargetErrorMsg : function(eventobject){
    var parentflx = eventobject.parent.parent.parent.parent;
    eventobject.skin = "txtD7d9e0";
    parentflx.imgTargetError.setVisibility(false);
  },

  hideErrorMsg : function(eventobject){
    var parentflx = eventobject.parent.parent;
    eventobject.skin = "txtD7d9e0";
    parentflx.imageSrcError.setVisibility(false);
  },

  showOrHideAds : function(eventobject){
    var scopeObj = this;
    var isHideAd = eventobject.selectedIndex === 1;
    if(scopeObj.adCount == 1 && isHideAd) {
      scopeObj.showPopupMessgae(true,kony.i18n.getLocalizedString("i18n.frmAdManagement.RemoveImageHeader"),
                                kony.i18n.getLocalizedString("i18n.frmAdManagement.RemoveImageInfo"));
      eventobject.selectedIndex = 0;
    } else {
      if(isHideAd) {
        var isFieldsEmpty = true;
        var imageContainers = eventobject.parent.parent.flxChannelDetails;
        for (var i = 0; i < imageContainers.children.length; i++) {
          var imgSources = imageContainers[imageContainers.children[i]].flxImageSource;
          for (var j = 0; j < imgSources.children.length; j++) {
            if(imgSources[imgSources.children[j]].txtImgSource.text !== ""){
              isFieldsEmpty = false;
              break;
            }
          }
          if(!isFieldsEmpty)
            break;
          imageContainers[imageContainers.children[i]].flxTargetSourceValue.txtTargetSource.text = "";
        }
        if(isFieldsEmpty){
          eventobject.parent.parent.flxChannelDetails.setVisibility(!isHideAd);
          eventobject.parent.parent.flxHideAdContainer.setVisibility(isHideAd);
          scopeObj.adCount--;
        }
        else{
          eventobject.selectedIndex = 0;
          scopeObj.showPopupMessgae(false,kony.i18n.getLocalizedString("i18n.frmAdManagement.TurningoffDisplayAds"),
                                    kony.i18n.getLocalizedString("i18n.frmAdManagement.TurningoffDisplayAdsMessage"));
          scopeObj.currentEventObj = eventobject;
        }
      }
      else{
        eventobject.parent.parent.flxChannelDetails.setVisibility(!isHideAd);
        eventobject.parent.parent.flxHideAdContainer.setVisibility(isHideAd);
        scopeObj.adCount++;
      }
      eventobject.parent.parent.forceLayout();
    }
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

  verifyImageSource : function(eventobject) {
    var scopeObj = this;
    var imageURL = eventobject.parent.parent.txtImgSource.text;
    var errorWidget = eventobject.parent.parent.imageSrcError;
    var textWidget = eventobject.parent.parent.txtImgSource;
    scopeObj.view.lblChannelName.text = eventobject.parent.parent.parent.parent.parent.parent.parent.parent.parent.flxChannelHeader.lblChannelName.text;
    scopeObj.view.lblScreenName.text = eventobject.parent.parent.parent.parent.parent.parent.parent.parent.parent.flxChannelHeader.lblModuleName.text;
    if (scopeObj.verifyImageURL(textWidget, errorWidget)){
      var img = new Image();
      img.onload = function() {
        var resolutions = eventobject.parent.parent.flxInfo.lblResolutionValue.text.split("x");
        var resWidth = resolutions[0];
        var resHeight = resolutions[1];
        scopeObj.setUploadedImage(resWidth,resHeight,img.width,img.height,imageURL);
        scopeObj.setAdjustedImage(resWidth, resHeight, img.width, img.height,imageURL);
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
      img.src = imageURL;
    }
  },

  setCampaignPriorityList : function(list) {
    var scopeObj = this;
    scopeObj.view.segCampaigns.widgetDataMap = {
      "lblPriority": "priority",
      "lblCampaign": "name",
    };
    scopeObj.view.segCampaigns.setData(list);
  },

  showCampaignPriorityList : function(list) {
    var scopeObj = this;
    scopeObj.view.flxConsentPopup.setVisibility(true);
    scopeObj.view.flxCampaignList.setVisibility(true);
  },

  showCustomerRoles : function(){
    var scopeObj = this;
    if(scopeObj.isDefaultCampaign) {
      scopeObj.view.flxCustomer.setVisibility(true);
      scopeObj.view.flxRoles.setVisibility(false);
      scopeObj.view.rtxdefaultCampaignCustomerMsg.setVisibility(scopeObj.isDefaultCampaign);
    }
    else if(scopeObj.isRTEDemo) {
      var hasRolesAssigned = scopeObj.view.segTargetCustomerRoles.data.length > 0;
      scopeObj.view.flxAddRole.setVisibility(false);
      scopeObj.view.flxNoRoles.setVisibility(!hasRolesAssigned);
      scopeObj.view.flxViewDetails.setVisibility(hasRolesAssigned);
      scopeObj.view.commonButtons.btnNext.setVisibility(false);
      scopeObj.view.commonButtons.btnSave.setVisibility(true);
      scopeObj.view.flxTargetCustomers.forceLayout();
    } else {
      var searchText = scopeObj.view.tbxSearchBox.text.toUpperCase();
      var selectedDataList = [];
      var unSelectedDataList = [];
      var obj ;
      var groupId = "";
      for(var i=0; i<scopeObj.availableCustomerGroups.length;i++){
        obj = scopeObj.availableCustomerGroups[i];
        groupId = obj.Group_id;
        if(scopeObj.groupsToAdd.indexOf(groupId) !== -1 || 
           (scopeObj.groupsToDelete.indexOf(groupId) === -1 && scopeObj.existingCustomerGroups.indexOf(groupId)!==-1)){
          selectedDataList.push(obj);
        } else if(searchText === "" || obj.Group_Name.toUpperCase().indexOf(searchText) !== -1){
          unSelectedDataList.push(obj);
        }
      }
      scopeObj.view.segAddOptions.setData(unSelectedDataList);
      scopeObj.view.segSelectedOptions.setData(selectedDataList);
      scopeObj.hasAvailableCustomersData();
      scopeObj.hasSelectedCustomersData();
    }
  },

  formatCustomerRolesData : function(customerGroups) {
    var scopeObj = this;
    scopeObj.availableCustomerGroups = [];
    for(var i=0;i<customerGroups.length;i++){
      var obj = customerGroups[i] ;
      if(obj.Status_id === "SID_ACTIVE") {
        obj.btnAdd = {
          "text" : kony.i18n.getLocalizedString("i18n.DragBox.ADD"),
          "onClick" : scopeObj.addGroup
        };
        obj.fontIconClose =  {
          "text" : "\ue929",
          "onClick" : scopeObj.removeGroup
        };
        obj.lblDesc = obj.Group_Desc;
        obj.lblName = obj.Group_Name;
        obj.lblOption = obj.Group_Name;
        scopeObj.availableCustomerGroups.push(obj);
      }
    }
  },

  hasSelectedCustomersData : function(){
    var scopeObj = this;
    var hasData = scopeObj.view.segSelectedOptions.data.length > 0;
    scopeObj.view.segSelectedOptions.setVisibility(hasData);
    scopeObj.view.lblNoSelectedCustomers.setVisibility(!hasData);
  },

  hasAvailableCustomersData : function(){
    var scopeObj = this;
    var hasData = scopeObj.view.segAddOptions.data.length > 0;
    scopeObj.view.segAddOptions.setVisibility(hasData);
    scopeObj.view.lblNoCustomersAvailable.setVisibility(!hasData);
  },

  addGroup : function(eventobject,context) {
    var scopeObj = this;
    var dataObj = scopeObj.view.segAddOptions.data[context.rowIndex];
    var dataLen = scopeObj.view.segSelectedOptions.data.length ;
    scopeObj.view.segSelectedOptions.addDataAt(dataObj, dataLen, context.sectionIndex);
    scopeObj.view.segAddOptions.removeAt(context.rowIndex, context.sectionIndex);
    scopeObj.hasSelectedCustomersData();
    scopeObj.hasAvailableCustomersData();
    scopeObj.updateGroups(dataObj.Group_id,true);
  },

  removeGroup : function(eventobject,context) {
    var scopeObj = this;
    var dataObj = scopeObj.view.segSelectedOptions.data[context.rowIndex];
    var dataLen = scopeObj.view.segAddOptions.data.length ;
    scopeObj.view.segAddOptions.addDataAt(dataObj, dataLen, context.sectionIndex);
    scopeObj.view.segSelectedOptions.removeAt(context.rowIndex, context.sectionIndex);
    scopeObj.hasSelectedCustomersData();
    scopeObj.hasAvailableCustomersData();
    scopeObj.updateGroups(dataObj.Group_id,false);
  },

  addAllGroups : function() {
    var scopeObj = this;
    var dataArray = scopeObj.view.segAddOptions.data;
    var selectedData = [];
    dataArray.forEach(function(dataObj){
      selectedData.push(dataObj);
      scopeObj.updateGroups(dataObj.Group_id,true);
    });
    scopeObj.view.segAddOptions.removeAll();
    scopeObj.view.segSelectedOptions.addAll(selectedData);
    scopeObj.hasSelectedCustomersData();
    scopeObj.hasAvailableCustomersData();
  },

  deleteAllGroups : function(){
    var scopeObj = this;
    var dataArray = scopeObj.view.segSelectedOptions.data;
    var unSelectedData = [];
    dataArray.forEach(function(dataObj){
      unSelectedData.push(dataObj);
      scopeObj.updateGroups(dataObj.Group_id,false);
    });
    scopeObj.view.segSelectedOptions.removeAll();
    scopeObj.view.segAddOptions.addAll(unSelectedData);
    scopeObj.hasSelectedCustomersData();
    scopeObj.hasAvailableCustomersData();
  },

  updateGroups : function(groupId, isAdd){
    var scopeObj = this;
    var isAddIndex = scopeObj.groupsToAdd.indexOf(groupId);
    var isDeleteIndex = scopeObj.groupsToDelete.indexOf(groupId);
    if(isAdd && scopeObj.existingCustomerGroups.indexOf(groupId) === -1) {
      scopeObj.groupsToAdd.push(groupId);
    } else if( !isAdd && scopeObj.existingCustomerGroups.indexOf(groupId) !== -1) {
      scopeObj.groupsToDelete.push(groupId);
    } 
    if(isAdd && isDeleteIndex !== -1){
      scopeObj.groupsToDelete.splice(isDeleteIndex,1);
    } 
    if( !isAdd && isAddIndex !== -1){
      scopeObj.groupsToAdd.splice(isAddIndex,1);
    }
  },

  getSelectedAdType : function() {
    var radBtn = this.view.customRadioButtonGroup.imgRadioButton1.src;
    var radBtn1 = this.view.customRadioButtonGroup.imgRadioButton2.src;
    var radBtn2 = this.view.customRadioButtonGroup.imgRadioButton3.src;
    if(radBtn === "radio_selected.png") 
      return "Marketing";
    if( radBtn1 === "radio_selected.png") 
      return "Informational";
    if(radBtn2 === "radio_selected.png")
      return "Regulatory";

  },

  getSelectedProduct : function() {
    var product = {
      "productId": "",
      "productGroupId": ""
    };
    var radBtn = this.view.customRadioButtonGroup.imgRadioButton1.src;
    if(radBtn === "radio_selected.png"){
      product.productId=this.view.lbxProductName.selectedKeyValue[0];
      product.productGroupId=this.view.lbxProductGroup.selectedKeyValue[0];
    }
    return product;
  },

  getAllSelectedEvents: function() {
    var allEvents = [];
    var internalEvents = this.view.viewInternalEvents.segEvents.data;
    var externalEvents = this.view.viewExternalEvents.segEvents.data;
    var popupEventsWEB = this.view.viewPopupEvents.segEventsWEB.data;
    var popupEventsMOB = this.view.viewPopupEvents.segEventsMOB.data;
    for(var i = 0; i < internalEvents.length; i++){
      allEvents.push({"id" :internalEvents[i].eventId});
    }
    for(i = 0; i < externalEvents.length; i++){
      allEvents.push({"id" :externalEvents[i].eventId});
    }
    for(i = 0; i < popupEventsWEB.length; i++){
      allEvents.push({"id" :popupEventsWEB[i].eventId});
    }
    for(i = 0; i < popupEventsMOB.length; i++){
      allEvents.push({"id" :popupEventsMOB[i].eventId});
    }
    return allEvents;
  },

  getSelectedProfiles : function(){
    var scopeObj = this;
    let profiles = [];
    let segProfiles = scopeObj.view.segTargetCustomerRoles.data;
    segProfiles.forEach(function(obj){
      profiles.push({"id" : obj.profileId});
    });
    return profiles;
  },

  getSelectedChannels : function(){
    var scopeObj = this;
    var channelTypes = [];
    if(scopeObj.offlineSelected){
      channelTypes.push({"type" : kony.i18n.getLocalizedString("i18n.frmAdManagement.offline").toUpperCase()});
    } 
    if(scopeObj.inAppSelected || scopeObj.inAppPopupSelected){
      channelTypes.push({"type" : kony.i18n.getLocalizedString("i18n.View.ONLINE").toUpperCase()});
    }
    return channelTypes;
  },

  getChannelDetails : function(channelData){
    let channelDetails = [];
    channelData.forEach(function(obj, index){
      channelDetails.push({"channelSubType" : obj, "channelPriority" : "2"});
    });
    return channelDetails;
  },

  getOfflineChannelDetails : function(channelDetails){
    var scopeObj = this;
    let offlineTemplate = [];
    if(scopeObj.offlineSelected){
      if(scopeObj.view.flxSMSChannelParent.isVisible){
        let templateId = scopeObj.isEdit ? (scopeObj.templatesMapper["SMS"] ? scopeObj.templatesMapper["SMS"] : "") : "";
        offlineTemplate.push({
          "offlineTemplateId" : templateId,
          "channelSubType" : "SMS",
          "subject" : "",
          "messageContent" : window.btoa(scopeObj.view.txtAreaSMSContent.text)
        });
        channelDetails.add("SMS");
      }
      if(this.view.flxEmailChannelParent.isVisible){
        let templateId = scopeObj.isEdit ? (scopeObj.templatesMapper["EMAIL"] ? scopeObj.templatesMapper["EMAIL"] : "") : "";
        offlineTemplate.push({
          "offlineTemplateId" : templateId,
          "channelSubType" : "EMAIL",
          "subject" : window.btoa(scopeObj.view.txtFieldSubject.text),
          "messageContent" : window.btoa(document.getElementById("iframe_rtxEmailValue").contentWindow.document.getElementById("editor").innerHTML)
        });
        channelDetails.add("EMAIL");
      }
      if(this.view.flxPushNotificationsParent.isVisible){
        let templateId = scopeObj.isEdit ? (scopeObj.templatesMapper["PUSH NOTIFICATIONS"] ? scopeObj.templatesMapper["PUSH NOTIFICATIONS"] : "") : "";
        offlineTemplate.push({
          "offlineTemplateId" : templateId,
          "channelSubType" : "PUSH NOTIFICATIONS",
          "subject" : "",
          "messageContent" : window.btoa(scopeObj.view.txtAreaPushNotificationsValue.text)
        });
        channelDetails.add("PUSH NOTIFICATIONS");
      }
    }
    return offlineTemplate;
  },

  getPopupDetailsJSON: function(onlineContent, channelDetails) {
    var channels = this.campaignSpecifications.screens.filter(function(obj) {
      return obj.screenId === "POPUP";
    })[0].channels;

    var webPlaceholderId = channels.filter(function(obj) {
      return obj.channelId === "WEB";
    })[0].resolutions[0].placeholderId;

    var mobilePlaceholderId = channels.filter(function(obj) {
      return obj.channelId === "MOBILE";
    })[0].resolutions[0].placeholderId;

    if(this.inAppPopupSelected){
      if(!this.view.WebPopupDetails.flxHideAdContainer.isVisible){
        var webPopupJson =   {
          "onlineContentId": "",
          "placeholderId": webPlaceholderId,
          "targetURL": encodeURIComponent(this.view.WebPopupDetails.txtBannerTargetURLSource.text),
          "imageURL": encodeURIComponent(this.view.WebPopupDetails.txtBannerImgSource.text),
          "callToActionButtonLabel": encodeURIComponent(this.view.WebPopupDetails.txtCTABtnLablel.text),
          "callToActionTargetURL": encodeURIComponent(this.view.WebPopupDetails.txtCTATargetURL.text),
          "showReadLaterButton": !this.view.WebPopupDetails.SwithShowReadLater.selectedIndex,
          "showCloseIcon": !this.view.WebPopupDetails.SwitchShowCloseIcon.selectedIndex,
          "bannerTitle": encodeURIComponent(this.view.WebPopupDetails.txtBannerHeadline.text),
          "bannerDescription": encodeURIComponent(this.view.WebPopupDetails.txtBannerDescription.text)
        };
        channelDetails.add("WEB");
        onlineContent.push(webPopupJson);
      }
      if(!this.view.MobilePopupDetails.flxHideAdContainer.isVisible){
        var mobilePopupJson = {
          "onlineContentId": "",
          "placeholderId": mobilePlaceholderId,
          "targetURL": encodeURIComponent(this.view.MobilePopupDetails.txtBannerTargetURLSource.text),
          "imageURL": encodeURIComponent(this.view.MobilePopupDetails.txtBannerImgSource.text),
          "callToActionButtonLabel": encodeURIComponent(this.view.MobilePopupDetails.txtCTABtnLablel.text),
          "callToActionTargetURL": encodeURIComponent(this.view.MobilePopupDetails.txtCTATargetURL.text),
          "showReadLaterButton": !this.view.MobilePopupDetails.SwithShowReadLater.selectedIndex,
          "showCloseIcon": !this.view.MobilePopupDetails.SwitchShowCloseIcon.selectedIndex,
          "bannerTitle": encodeURIComponent(this.view.MobilePopupDetails.txtBannerHeadline.text),
          "bannerDescription": encodeURIComponent(this.view.MobilePopupDetails.txtBannerDescription.text)
        };
        channelDetails.add("MOBILE");
        onlineContent.push(mobilePopupJson);
      }
    }
    return onlineContent;
  },

  updateJSON : function() {
    var scopeObj = this;
    var product = scopeObj.getSelectedProduct();
    var channelDetails = new Set();
    var startDates = scopeObj.view.customStartDate.value.replace(/\//g, "-").split("-");
    var endDates = scopeObj.view.customEndDate.value.replace(/\//g, "-").split("-");
    var saveJSON = {
      "campaignName" : scopeObj.view.txtAdName.text.trim(),
      "campaignDescription": scopeObj.view.txtDescription.text.trim(),
      "campaignPriority" : scopeObj.view.txtPriority.text.trim(),
      "startDate": startDates[2] + "-" + startDates[0] + "-" + startDates[1],
      "endDate": endDates[2] + "-" + endDates[0] + "-" + endDates[1],
      "campaignType" : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SINGLE"),
      "objectiveType": scopeObj.getSelectedAdType(),
      "productId": product.productId,
      "productGroupId": product.productGroupId
    };
    saveJSON.eventTriggerIdList = scopeObj.getAllSelectedEvents();
    saveJSON.profileIdList = scopeObj.getSelectedProfiles();
    saveJSON.channelType = scopeObj.getSelectedChannels();
    saveJSON.offlineTemplate = scopeObj.getOfflineChannelDetails(channelDetails); 
    if(scopeObj.isDefaultCampaign){
      var updatedDefaultCampaignsArray = scopeObj.getDefaultSpecificationsJSON();
      scopeObj.presenter.updateDefaultCampaigns({"defaultCampaign" : updatedDefaultCampaignsArray});
    } else {
      saveJSON.onlineContent = scopeObj.getSpecificationsJSON(channelDetails);
      saveJSON.onlineContent = scopeObj.getPopupDetailsJSON(saveJSON.onlineContent, channelDetails);
      saveJSON.channelDetails = scopeObj.getChannelDetails(channelDetails);
      if(scopeObj.isCreate || scopeObj.isCopy){
        scopeObj.presenter.createCampaignMS(saveJSON);
      } else {
        saveJSON.campaignId = scopeObj.campaignData.campaignId;
        saveJSON.campaignStatus = scopeObj.activestatus;
        scopeObj.presenter.updateCampaignMS(saveJSON);
      }
    }
  },

  getSpecificationsJSON : function(channelDetails){
    var scopeObj = this;
    var specificationsToSaveArray = [];
    if(scopeObj.inAppSelected){
      var channelObj ;
      var screenObj ;
      var resolutionObj;
      var imageContainer ;
      var concatId ;
      var specificationsArray = scopeObj.campaignSpecifications;
      for (var i = 0; i < specificationsArray.screens.length; i++) {
        screenObj = specificationsArray.screens[i];
        for (var j = 0; j < screenObj.channels.length; j++) {
          channelObj = screenObj.channels[j];
          concatId = screenObj.screenId.replace(/_/g,"") + channelObj.channelId.replace(/_/g,"");
          if(scopeObj.view[concatId] && scopeObj.view[concatId].switchAds.selectedIndex === 0){
            channelDetails.add(channelObj.channelId);
            imageContainer = scopeObj.view[concatId].imageContainer;
            for (var k = 0; k < channelObj.resolutions.length; k++) {
              resolutionObj = channelObj.resolutions[k];
              let placeholderId = resolutionObj.placeholderId;
              let templateId = scopeObj.isEdit ? (scopeObj.templatesMapper[placeholderId] ? scopeObj.templatesMapper[placeholderId] : "") : "";
              specificationsToSaveArray.push({
                "onlineContentId" : templateId,
                "placeholderId" : placeholderId,
                "targetURL": imageContainer.txtTargetSource.text.trim()? encodeURIComponent(imageContainer.txtTargetSource.text.trim()) : "",
                "imageURL": encodeURIComponent(imageContainer[placeholderId].txtImgSource.text),
                "callToActionButtonLabel": "",
                "callToActionTargetURL": "",
                "showReadLaterButton": "",
                "showCloseIcon": "",
                "bannerTitle": "",
                "bannerDescription": ""
              });
            }
          }
        }
      }
    }
    return specificationsToSaveArray;
  },

  hasExistingPriority : function(list){
    var scopeObj = this;
    scopeObj.isExisitingPriority = false;
    scopeObj.isPriorityTextChange = false;
    var priority = parseInt(scopeObj.view.txtPriority.text.trim());
    for(var i = 0; i<list.length; i++) {
      if(list[i].priority === priority) {
        if(scopeObj.isEdit && parseInt(scopeObj.campaignData.campaignPriority) === priority) {
          scopeObj.previousPriority = scopeObj.campaignData.campaignPriority ;
        } else {
          scopeObj.isExisitingPriority = true;
          scopeObj.showPopupMessgae(false,kony.i18n.getLocalizedString("i18n.frmAdManagement.ExistingPriorityConflictHeader"),
                                    kony.i18n.getLocalizedString("i18n.frmAdManagement.ExistingPriorityConflictInfo"));
          return;}
      }
    }
  },

  sortPriorityList : function(sortColumn){
    var scopeObj = this;  
    var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    scopeObj.getObjectSorter().column(sortColumn);
    var data = scopeObj.view.segCampaigns.data.sort(scopeObj.sortBy.sortData);
    scopeObj.view.segCampaigns.setData(data);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,'name',this.view.lblCampaignSort);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,'priority',this.view.lblPrioritySort);
  },

  setEditCampaignData : function(){
    var scopeObj = this;
    scopeObj.view.txtAdName.text = scopeObj.isCopy ? "" : scopeObj.campaignData.campaignName;
    scopeObj.view.txtDescription.text = scopeObj.isCopy ? "" : scopeObj.campaignData.campaignDescription;
    scopeObj.view.txtPriority.text = scopeObj.campaignData.campaignPriority;
    scopeObj.view.customStartDate.value = scopeObj.isCopy ? "" : scopeObj.campaignData.startDate;
    scopeObj.view.customStartDate.resetData = scopeObj.isCopy ? kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date") : scopeObj.campaignData.startDate;
    scopeObj.view.customEndDate.value = scopeObj.isCopy ? "" : scopeObj.campaignData.endDate;
    scopeObj.view.customEndDate.resetData = scopeObj.isCopy ? kony.i18n.getLocalizedString("i18n.frmLogsController.Select_date") : scopeObj.campaignData.endDate;
    scopeObj.setOnlineContents(scopeObj.campaignData.onlineContents);
    scopeObj.setPopupBannersOnEdit(scopeObj.campaignData.popupBanners);
    scopeObj.setOfflineContents(scopeObj.campaignData.offlineTemplates);
    scopeObj.setProfiles(scopeObj.campaignData.profileDetails);
    scopeObj.validateEditCampaignSpecificationsData();
    scopeObj.setViewEventsOnEdit(scopeObj.campaignData.eventTriggerDetails);
    scopeObj.setProductNameListOnEdit();
    scopeObj.setAdTypeOnEdit();
    scopeObj.setChannelSelectionOnEdit();  
    scopeObj.setCompletedIconOnEdit();
    scopeObj.setValidatorOnEdit();
    scopeObj.closePopup();
  },

  setProfiles : function(profiles){
    var scopeObj = this;
    profiles.forEach(function(obj){
      scopeObj.allProfiles[obj.profileId] = obj;
    });
    scopeObj.populateTargetCustomerRoles(profiles);
  },

  setOnlineContents : function(onlineContents){
    var scopeObj = this;
    onlineContents.forEach(function(obj){
      scopeObj.templatesMapper[obj.placeholderId] = obj.onlineContentId;
      let concatId = obj.placeholderIdentifier.replace(/_/g,"") + obj.channelSubType.replace(/_/g,"");
      let imageContainer = scopeObj.view[concatId].imageContainer;
      imageContainer[obj.placeholderId].txtImgSource.text = obj.imageURL;
      imageContainer.txtTargetSource.text = obj.targetURL;
    });
  },
  
  setPopupBannersOnEdit : function(popupBanners) {
    var self = this;
    this.showHideAllPopupBanner(false);
    var popupChannelTypeMapper = { "WEB" : "WebPopupDetails", "MOBILE" : "MobilePopupDetails" };
    popupBanners.forEach(function(obj){
      self.view[popupChannelTypeMapper[obj.channelSubType]].txtBannerHeadline.text = obj.bannerTitle;
      self.view[popupChannelTypeMapper[obj.channelSubType]].txtBannerDescription.text = obj.bannerDescription;
      self.view[popupChannelTypeMapper[obj.channelSubType]].txtBannerImgSource.text = obj.imageURL;
      self.view[popupChannelTypeMapper[obj.channelSubType]].txtBannerTargetURLSource.text = obj.targetURL;
      self.view[popupChannelTypeMapper[obj.channelSubType]].txtCTABtnLablel.text = obj.callToActionButtonLabel;
      self.view[popupChannelTypeMapper[obj.channelSubType]].txtCTATargetURL.text = obj.callToActionTargetURL;
      self.view[popupChannelTypeMapper[obj.channelSubType]].SwithShowReadLater.selectedIndex = obj.showReadLaterButton === "true"? 0 : 1;
      self.view[popupChannelTypeMapper[obj.channelSubType]].SwitchShowCloseIcon.selectedIndex = obj.showCloseIcon === "true"? 0 : 1;
      self.view[popupChannelTypeMapper[obj.channelSubType]].switchAds.selectedIndex = 0;
      self.showOrHidePopupBanner(popupChannelTypeMapper[obj.channelSubType]);
    });
    if(!this.isEmptyBannerDetails("MobilePopupDetails") && this.isSameBannerDetails("MobilePopupDetails", "WebPopupDetails")){
      this.view.MobilePopupDetails.fontIconSelectOption.text = "\ue965";
      this.view.MobilePopupDetails.fontIconSelectOption.skin = "sknFontIconCheckBoxSelected";
    }
  },
  
  showHideAllPopupBanner: function(show) {
    var self = this;
    var allPopupBannerComponent = ["WebPopupDetails", "MobilePopupDetails"];
    allPopupBannerComponent.forEach(function(obj){
      self.view[obj].switchAds.selectedIndex = show? 0 : 1;
      self.showOrHidePopupBanner(obj);
    });
  },

  setOfflineContents : function(offlineTemplates) {
    var scopeObj = this;
    offlineTemplates.forEach(function(obj){
      scopeObj.templatesMapper[obj.channelSubType] = obj.offlineTemplateId;
      let template = scopeObj.offlineTemplateMapper[obj.channelSubType];
      if(obj.messageContent)
      	scopeObj.view[template[0]].text = window.atob(obj.messageContent);
      scopeObj.view[template[1]].setVisibility(true);
      if(obj.channelSubType === kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Email_Content_Caps")){
        if(obj.messageContent)
        	scopeObj.emailContent = window.atob(obj.messageContent);
        if(obj.subject)
        	scopeObj.view[template[0]].text = window.atob(obj.subject);
        // Value of Email Content will be assigned in navigateToScreen() once flxOfflineChannels is opened
      }
    });
  },

  validateEditCampaignSpecificationsData : function(){
    var scopeObj = this;
    var channelObj;
    var screenObj;
    var resolutionObj;
    var hasChannelData = true;
    scopeObj.adCount = 0;
    var specificationsArray = scopeObj.campaignSpecifications.screens;
    for (var i = 0; i < specificationsArray.length; i++) {
      screenObj = specificationsArray[i];
      for (var j = 0; j < screenObj.channels.length; j++) {
        hasChannelData = true;
        channelObj = screenObj.channels[j];
        let channelTemplate = scopeObj.view[screenObj.screenId.replace(/_/g,"") + channelObj.channelId.replace(/_/g,"")];
        if(channelTemplate){
          let imageContainer = channelTemplate.imageContainer;
          for (var k = 0; k < channelObj.resolutions.length; k++) {
            resolutionObj = channelObj.resolutions[k];
            let placeholderId = resolutionObj.placeholderId;
            hasChannelData = hasChannelData && imageContainer[placeholderId].txtImgSource.text !== "";
          }
          scopeObj.adCount = hasChannelData ? scopeObj.adCount+1 : scopeObj.adCount ;
          channelTemplate.switchAds.selectedIndex = hasChannelData ? 0 : 1;
          channelTemplate.flxChannelDetails.setVisibility(hasChannelData);
          channelTemplate.flxHideAdContainer.setVisibility(!hasChannelData);
        }
      }
    }
  },

  setDefaultCampaignSpecifications : function(defaultCampaignData){
    var scopeObj = this;
    var screensData = [];
    var channelData = [] ;
    for(var modulekey in scopeObj.moduleNameMapper){
      channelData = [];
      for(var channel in defaultCampaignData.specifications){
        for(var module in defaultCampaignData.specifications[channel]) {
          if(modulekey === module) {
            channelData.push({"channelId" : channel, "resolutions" : defaultCampaignData.specifications[channel][module]});
          }
        }
      }
      screensData.push({"screenId" : modulekey, "channels" : channelData}) ;
    }
    scopeObj.defaultCampaignObject = {"name" : defaultCampaignData.name,
                                      "description" : defaultCampaignData.description, 
                                      "specifications" : {"screens" : screensData}
                                     };
  },

  showPopupMessgae : function(isError, header, message){
    var scopeObj = this;
    scopeObj.view.popUp.flxPopUpTopColor.skin = isError ? "sknFlxee6565Op100NoBorder" : "sknflxebb54cOp100";
    scopeObj.view.popUp.lblPopUpMainMessage.text = header;
    scopeObj.view.popUp.rtxPopUpDisclaimer.text = message;
    scopeObj.view.popUp.btnPopUpDelete.text = isError ?
      kony.i18n.getLocalizedString("i18n.frmCustomerManagement.close_popup").toUpperCase() : kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    scopeObj.view.popUp.btnPopUpCancel.setVisibility(!isError);
    scopeObj.view.flxConsentPopup.setVisibility(true);
    scopeObj.view.popUp.setVisibility(true);
  },

  validateSpecifications: function(modulekey){
    var scopeObj = this;
    var screenObj ;
    var channelObj;
    var concatId;
    var channelTemplate;
    var targeturl ; 
    var targetErrormsg;
    var isValidTargetSourceURL;
    var imageSource ;
    var imgsrc;
    var imgErrormsg;
    var isValidImageSource;
    var isValidScreen = true;
    var imageContainer ;
    var specificationsArray = scopeObj.isDefaultCampaign ? scopeObj.defaultCampaignObject.specifications : scopeObj.campaignSpecifications;
    for (var i = 0; i < specificationsArray.screens.length; i++) {
      screenObj = specificationsArray.screens[i];
      if (modulekey === screenObj.screenId) {
        for (var channelKey in scopeObj.channelNameMapper) {
          for (var j = 0; j < screenObj.channels.length; j++) {
            channelObj = screenObj.channels[j];
            if (channelKey === channelObj.channelId) {
              concatId = modulekey.split('_').join("") + channelKey.split('_').join("");
              channelTemplate = scopeObj.view[concatId];
              if(channelTemplate.switchAds.selectedIndex === 0){
                for (var l = 0; l < channelTemplate.flxChannelDetails.children.length; l++) {
                  imageContainer = channelTemplate[channelTemplate.flxChannelDetails.children[l]] ;
                  // validate target soruce
                  targeturl = imageContainer.txtTargetSource.text.trim().toLowerCase();
                  targetErrormsg = "";
                  isValidTargetSourceURL = true;
                  if (targeturl !== "") {
                    if (targeturl.indexOf("http:") === 0) {
                      targetErrormsg = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLHttp");
                      isValidTargetSourceURL = false;
                    } else if (!scopeObj.urlRegex.test(targeturl)) {
                      targetErrormsg = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURL");
                      isValidTargetSourceURL = false;
                    }
                  }
                  channelTemplate.flxChannelDetails.setVisibility(isValidTargetSourceURL ? channelTemplate.flxChannelDetails.isVisible : true);
                  channelTemplate.lblChannelArrow.text = isValidTargetSourceURL ? channelTemplate.lblChannelArrow.text : "\ue915";
                  imageContainer.txtTargetSource.skin = isValidTargetSourceURL ? "txtD7d9e0" : "skinredbg";
                  imageContainer.imgTargetError.lblErrorText.text = targetErrormsg;
                  imageContainer.imgTargetError.setVisibility(!isValidTargetSourceURL);
                  // validate image soruce
                  for (var k = 0; k < imageContainer.flxImageSource.children.length; k++) {
                    imageSource = imageContainer.flxImageSource[imageContainer.flxImageSource.children[k]];
                    imgErrormsg = "";
                    isValidImageSource = true;
                    imgsrc = imageSource.txtImgSource.text.trim().toLowerCase();
                    if (imgsrc === "") {
                      imgErrormsg = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorImageSourceURL");
                      isValidImageSource = false;
                    } else if (imgsrc.indexOf("http:") === 0) {
                      imgErrormsg = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorTargetURLHttp");
                      isValidImageSource = false;
                    } else if (!scopeObj.imageValidationRegex.test(imgsrc)) {
                      imgErrormsg = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorImageExtension");
                      isValidImageSource = false;
                    }
                    imageSource.txtImgSource.skin = isValidImageSource ? "txtD7d9e0" : "skinredbg";
                    imageSource.imageSrcError.setVisibility(!isValidImageSource);
                    imageSource.imageSrcError.lblErrorText.text = imgErrormsg;
                    channelTemplate.flxChannelDetails.setVisibility(isValidImageSource ? channelTemplate.flxChannelDetails.isVisible : true);
                    channelTemplate.lblChannelArrow.text = isValidImageSource ? channelTemplate.lblChannelArrow.text : "\ue915";
                    isValidScreen = isValidScreen && isValidTargetSourceURL && isValidImageSource ; 
                  }
                }
                scopeObj.view[channelTemplate.id].forceLayout();
              }
            }
          }
        }
      }
    }
    scopeObj.view.forceLayout();
    return isValidScreen ;
  },

  selectRadio : function(radioId, templateId){
    var scopeObj = this;
    scopeObj.selectedRadioId = radioId;
    scopeObj.templateId = templateId;
    for(var i=1; i<=scopeObj.imageCounterMaxValue ; i++) {
      if(scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + i].src === "radio_selected.png") {
        scopeObj.prevSelectedRadioId = i;
      }
      scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + i].src = "radio_notselected.png";
    }
    if(scopeObj.selectedRadioId < scopeObj.prevSelectedRadioId) {
      scopeObj.view.warningpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ReduceAdPlaceholders");
      scopeObj.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ReduceAdPlaceholdersMsg");
      scopeObj.view.flxConsentPopup.setVisibility(true);
      scopeObj.view.warningpopup.setVisibility(true);
    } else if(scopeObj.selectedRadioId > scopeObj.prevSelectedRadioId){
      scopeObj.addImageConfiguations();
    }
    scopeObj.view[scopeObj.templateId].flxImageCounter.defaultImageCount["imgRadio" + radioId].src = "radio_selected.png";
  },

  deleteImageConfiguations : function() {
    var scopeObj = this;
    var tobeDeleted = scopeObj.prevSelectedRadioId - scopeObj.selectedRadioId ;
    var imageConfigsAvailable = scopeObj.view[scopeObj.templateId].flxChannelDetails.children.length-1 ;
    for(var i = tobeDeleted; i > 0; i--,imageConfigsAvailable--) {
      scopeObj.view[scopeObj.templateId].flxChannelDetails[scopeObj.view[scopeObj.templateId].flxChannelDetails.children[imageConfigsAvailable]].removeFromParent();
    }
    scopeObj.view[scopeObj.templateId].forceLayout();
  },

  addImageConfiguations : function() {
    var scopeObj = this;
    var tobeAdded = scopeObj.selectedRadioId - scopeObj.prevSelectedRadioId ;
    var imageConfigsAvailable = scopeObj.view[scopeObj.templateId].flxChannelDetails.children.length ;
    var imageContainer = scopeObj.view[scopeObj.templateId].flxChannelDetails[scopeObj.view[scopeObj.templateId].flxChannelDetails.children[imageConfigsAvailable-1]];
    for(var i = 0; i < tobeAdded ; i++) {
      imageConfigsAvailable++;
      var newImageContainer = scopeObj.addNewImageContainer(imageConfigsAvailable,imageContainer.flxImageSource);
      scopeObj.view[scopeObj.templateId].flxChannelDetails.add(newImageContainer);
    }
    scopeObj.view[scopeObj.templateId].forceLayout();
    scopeObj.closePopup();
  },

  getDefaultSpecificationsJSON : function() {
    var scopeObj = this;
    var json = [], k=1;
    var channelObj ;
    var screenObj ;
    var concatId;
    var imageContainer ;
    var channelTemplate;
    var resolutionTempate ;
    var specificationsArray = scopeObj.defaultCampaignObject.specifications;
    for (var modulekey in scopeObj.moduleNameMapper) {
      for (var i = 0; i < specificationsArray.screens.length; i++) {
        screenObj = specificationsArray.screens[i];
        if (modulekey === screenObj.screenId) {
          for (var channelKey in scopeObj.channelNameMapper) {
            for (var j = 0; j < screenObj.channels.length; j++) {
              channelObj = screenObj.channels[j];
              if (channelKey === channelObj.channelId) {
                concatId = modulekey.split('_').join("") + channelKey.split('_').join("");
                channelTemplate = scopeObj.view[concatId];
                for(var p=0; p<channelTemplate.flxChannelDetails.children.length; p++) {
                  imageContainer = channelTemplate.flxChannelDetails[channelTemplate.flxChannelDetails.children[p]] ;
                  for(var q=0; q<imageContainer.flxImageSource.children.length; q++) {
                    resolutionTempate = imageContainer[imageContainer.flxImageSource.children[q]];
                    var idNumber = scopeObj.padWithZeroes(k,3);
                    json.push({
                      "placeholderId": resolutionTempate.id,
                      "onlineContentId": "OC" + idNumber,
                      "imageURL":  encodeURIComponent(resolutionTempate.txtImgSource.text.trim()),
                      "targetURL": imageContainer.txtTargetSource.text.trim()? encodeURIComponent(imageContainer.txtTargetSource.text.trim()) : "",
                      "imageIndex" : imageContainer.id.replace("imageContainer","")
                    });
                    k++;
                  }
                }
              }
            }
          }
        }
      }
    }
    return json;
  },

  padWithZeroes : function(number, length) {
    var finalNumber = '' + number;
    while (finalNumber.length < length) {
      finalNumber = '0' + finalNumber;
    }
    return finalNumber;
  },

  addNewImageContainer : function(count, flxImageSource){
    var scopeObj = this;
    var imageContainer = new com.adminConsole.adManagement.imageContainer({
      "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
      "clipBounds": true,
      "id": "imageContainer"+count,
      "isVisible": true,
      "layoutType": kony.flex.FLOW_VERTICAL,
      "left": "0dp",
      "masterType": constants.MASTER_TYPE_DEFAULT,
      "isModalContainer": false,
      "overrides": {
        "btnTargetVerify" : {
          "onClick" : function(eventobject) {
           scopeObj.showTargetURL(eventobject.parent.txtTargetSource, eventobject.parent.parent.imgTargetError);
          }
        },
        "lblImgConfig" : {
          "text" : kony.i18n.getLocalizedString("i18n.frmAdManagement.ImageConfiguration") + " " + count
        }
      }
    }, {
      "overrides": {}
    }, {
      "overrides": {
        "txtTargetSource" : {
          "onKeyUp" : function(eventobject){
            scopeObj.hideTargetErrorMsg(eventobject);
          },
          "onEndEditing" : function(eventobject){
            var targetURL = eventobject.text;
            if(targetURL.indexOf("www.") === 0){
              eventobject.text = "https://" + targetURL;
            }
          }
        }
      }
    });
    var resolutionsArray = [];
    var placeHolderArray = flxImageSource.children;
    for(var i=0;i<flxImageSource.children.length; i++){
      resolutionsArray.push({
        "imageResolution" : flxImageSource[flxImageSource.children[i]].lblResolutionValue.text,
        "imageIndex" : count,
        "imageScale" : flxImageSource[flxImageSource.children[i]].lblImageIndex.text,
        "imageURL" : "",
        "placeholderId" : placeHolderArray[i],
      });
    }
    scopeObj.constructResolutions(imageContainer, resolutionsArray);
    imageContainer.txtTargetSource.text = "";
    return imageContainer;
  },

  validateAndNavigate : function(navigateToScreenId, isNext) {
    var scopeObj = this;
    var currentScreenId ;
    var isToNavigate = true;
    if(scopeObj.view.flxBasicDetails.isVisible) {
      currentScreenId = "0" ;
      navigateToScreenId = isNext ? scopeObj.isDefaultCampaign? "4" : "1" : navigateToScreenId ;
    } else if(scopeObj.view.flxTargetCustomers.isVisible) {
      currentScreenId = "1" ;
      navigateToScreenId = isNext ? "2" : navigateToScreenId ;
    } else if(scopeObj.view.flxViewEvents.isVisible) {
      currentScreenId = "2" ;
      navigateToScreenId = isNext && scopeObj.offlineSelected? "3" : isNext && scopeObj.inAppSelected? "4" : isNext && scopeObj.inAppPopupSelected? "8" : navigateToScreenId ;
    } else if(scopeObj.view.flxOfflineChannels.isVisible) {
      currentScreenId = "3" ;
      navigateToScreenId = isNext && scopeObj.inAppSelected? "4" : isNext && scopeObj.inAppPopupSelected? "8" :navigateToScreenId ;
    } else if(scopeObj.view.flxAdSpecifications.isVisible && scopeObj.view.flxPreLogin.isVisible) {
      currentScreenId = "4" ;
      navigateToScreenId = isNext ? "6" : navigateToScreenId ;
    } else if(scopeObj.view.flxAdSpecifications.isVisible && scopeObj.view.flxPostLogin.isVisible) {
      currentScreenId = "5" ;
      navigateToScreenId = isNext ? "6" : navigateToScreenId ;
    } else if(scopeObj.view.flxAdSpecifications.isVisible && scopeObj.view.flxDashboard.isVisible) {
      currentScreenId = "6" ;
      navigateToScreenId = isNext ? "7" : navigateToScreenId ;
    } else if(scopeObj.view.flxAdSpecifications.isVisible && scopeObj.view.flxNewAccount.isVisible) {
      currentScreenId = "7" ;
      navigateToScreenId = isNext ? "8" : navigateToScreenId ;
    } else if(scopeObj.view.flxPopupDetails.isVisible) {
      currentScreenId = "8" ;
    }
    switch(currentScreenId) {
      case "0" :
        isToNavigate = scopeObj.validateBasicDetails();
        scopeObj.previousPriority = isToNavigate ? scopeObj.view.txtPriority.text : scopeObj.previousPriority ;
        break;
      case "1" :
        if(parseInt(navigateToScreenId)<parseInt(currentScreenId)){
          isToNavigate = true;
        }
        else if(scopeObj.isRTEDemo && scopeObj.view.segTargetCustomerRoles.data.length === 0 &&  !scopeObj.isDefaultCampaign) {
          isToNavigate = true;  //tempChange //false;
          //scopeObj.showPopupMessgae(true,kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignCustomersMandatory"),
          //                          kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignCustomersMandatoryMsg"));
        } else if(!scopeObj.isRTEDemo && scopeObj.view.segSelectedOptions.data.length === 0 &&  !scopeObj.isDefaultCampaign) {
          isToNavigate = false;
          scopeObj.showPopupMessgae(true,kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignCustomersMandatory"),
                                    kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorCampaignCustomersMandatoryMsg"));
        }
        break;
      case "2":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) || scopeObj.validateEvents();
        if(scopeObj.isEdit){
			isToNavigate = scopeObj.validateEvents();
        }
        if(isNext && !scopeObj.offlineSelected && !scopeObj.inAppSelected && !scopeObj.inAppPopupSelected){
          isToNavigate = false;
          if(scopeObj.validateEvents()){
            //skin change for completed icon
            scopeObj.widgetCompletedArray[1].skin = "sknFontIconCompleted";
            scopeObj.widgetCompletedArray[1].text = "\ue9ae";
            scopeObj.updateJSON();
          }
        }        
        break;
      case "3":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) || scopeObj.validateOfflineChannels();
        if(scopeObj.isEdit){
			isToNavigate = scopeObj.validateOfflineChannels();
        }
        if(isNext && !scopeObj.inAppSelected && !scopeObj.inAppPopupSelected){
          isToNavigate = false;
          if(scopeObj.validateOfflineChannels()){
            //skin change for completed icon
            scopeObj.widgetCompletedArray[2].skin = "sknFontIconCompleted";
            scopeObj.widgetCompletedArray[2].text = "\ue9ae";
            scopeObj.updateJSON();
          }
        } 
        break;
      case "4":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) ? true : scopeObj.validateSpecifications("PRELOGIN");
        if(scopeObj.isEdit){
			isToNavigate = scopeObj.validateSpecifications("PRELOGIN");
        }
        break;
      case "5":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) ? true : scopeObj.validateSpecifications("POSTLOGIN");
        if(scopeObj.isEdit){
			isToNavigate = scopeObj.validateSpecifications("POSTLOGIN");
		}
        break;
      case "6":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) ? true : scopeObj.validateSpecifications("ACCOUNT_DASHBOARD");
        if(scopeObj.isEdit){
          isToNavigate = scopeObj.validateSpecifications("ACCOUNT_DASHBOARD");
        }
        break;
      case "7":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) ? true : scopeObj.validateSpecifications("APPLY_FOR_NEW_ACCOUNT");
        if(scopeObj.isEdit){
          isToNavigate = scopeObj.validateSpecifications("APPLY_FOR_NEW_ACCOUNT");
        }
        if(isNext && (!scopeObj.inAppPopupSelected || scopeObj.isDefaultCampaign)) {
          isToNavigate = false;
          if(scopeObj.validateSpecifications("APPLY_FOR_NEW_ACCOUNT")){
            //skin change for completed icon
            scopeObj.widgetCompletedArray[3].skin = "sknFontIconCompleted";
            scopeObj.widgetCompletedArray[3].text = "\ue9ae";
            scopeObj.updateJSON();
          }
        }
        break;
      case "8":
        isToNavigate = parseInt(navigateToScreenId)<parseInt(currentScreenId) || scopeObj.validatePopupScreens();
        if(scopeObj.isEdit){
          isToNavigate = scopeObj.validatePopupScreens();
        }
        if(isNext && scopeObj.validatePopupScreens()){
          isToNavigate = false;
          //skin change for completed icon
          scopeObj.widgetCompletedArray[4].skin = "sknFontIconCompleted";
          scopeObj.widgetCompletedArray[4].text = "\ue9ae";
          scopeObj.updateJSON();
        }
        break;
    }
    scopeObj.navigateToScreenId = navigateToScreenId ;
    if(isToNavigate) {
      scopeObj.navigateToScreen();
    }
  },

  navigateToScreen : function() {
    var scopeObj = this ;
    var isAdSpecificationScreen = parseInt(scopeObj.navigateToScreenId) > 3 && parseInt(scopeObj.navigateToScreenId) < 8;
    var isShowCustomers = scopeObj.navigateToScreenId === "1" ;
    if(scopeObj.navigateToScreenId === "3"){      
      document.getElementById("iframe_rtxEmailValue").contentWindow.document.getElementById("editor").innerHTML = scopeObj.emailContent;
    }
    scopeObj.view.flxBasicDetails.setVisibility(scopeObj.navigateToScreenId === "0") ;
    scopeObj.view.flxViewEvents.setVisibility(scopeObj.navigateToScreenId === "2") ;
    scopeObj.view.flxOfflineChannels.setVisibility(scopeObj.navigateToScreenId === "3") ;
    scopeObj.view.flxAdSpecifications.setVisibility(isAdSpecificationScreen) ;
    scopeObj.view.flxPreLogin.setVisibility(scopeObj.navigateToScreenId === "4") ;
    scopeObj.view.flxPostLogin.setVisibility(scopeObj.navigateToScreenId === "5") ;
    scopeObj.view.flxDashboard.setVisibility(scopeObj.navigateToScreenId === "6") ;
    scopeObj.view.flxNewAccount.setVisibility(scopeObj.navigateToScreenId === "7") ;
    scopeObj.view.flxPopupDetails.setVisibility(scopeObj.navigateToScreenId === "8") ;
    scopeObj.view.flxTargetCustomers.setVisibility(isShowCustomers) ;
    scopeObj.view.flxCustomer.setVisibility(!scopeObj.isRTEDemo);
    scopeObj.view.flxRoles.setVisibility(scopeObj.isRTEDemo);
    scopeObj.screenValidationMapper["1"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["1"] ? scopeObj.navigateToScreenId === "1" : true ;
    scopeObj.screenValidationMapper["2"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["2"] ? scopeObj.navigateToScreenId === "2" : true ;
    scopeObj.screenValidationMapper["3"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["3"] ? scopeObj.navigateToScreenId === "3" : true ;
    scopeObj.screenValidationMapper["4"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["4"] ? scopeObj.navigateToScreenId === "4" : true ;
    scopeObj.screenValidationMapper["5"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["5"] ? scopeObj.navigateToScreenId === "5" : true ;
    scopeObj.screenValidationMapper["6"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["6"] ? scopeObj.navigateToScreenId === "6" : true ;
    scopeObj.screenValidationMapper["7"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["7"] ? scopeObj.navigateToScreenId === "7" : true ;
    scopeObj.screenValidationMapper["8"] = scopeObj.isCreate && !scopeObj.screenValidationMapper["8"] ? scopeObj.navigateToScreenId === "8" : true ;
    var btnText;
    if(scopeObj.isEdit){
      btnText = kony.i18n.getLocalizedString("i18n.frmAdManagement.UpdateCampaignCAPS");
    }
    else if(scopeObj.isDefaultCampaign){
      btnText = kony.i18n.getLocalizedString("i18n.frmAdManagement.updateDefaultCampaignCAPS");
    }
    else {
      btnText = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateCampaignCAPS");   
    }
    var isCreateButton = false;
    if(scopeObj.navigateToScreenId === "2" && !scopeObj.offlineSelected && !scopeObj.inAppSelected && !scopeObj.inAppPopupSelected)
      isCreateButton = true;
    else if(scopeObj.navigateToScreenId === "3" && !scopeObj.inAppSelected && !scopeObj.inAppPopupSelected)
      isCreateButton = true;
    else if(scopeObj.navigateToScreenId === "7" && (!scopeObj.inAppPopupSelected || scopeObj.isDefaultCampaign))
      isCreateButton = true;
    else if(scopeObj.navigateToScreenId === "8")
      isCreateButton = true;
    scopeObj.view.commonButtons.btnSave.text = isCreateButton ? btnText : kony.i18n.getLocalizedString("i18n.frmAdManagement.Next") ;
    scopeObj.view.commonButtons.btnSave.width = isCreateButton ? scopeObj.isDefaultCampaign ? "240px" : "180px" : "100px";
    scopeObj.view.flxAvailableOptions.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.flxSelectedOptions.setVisibility(!scopeObj.isDefaultCampaign);
    scopeObj.view.rtxdefaultCampaignCustomerMsg.setVisibility(scopeObj.isDefaultCampaign);
    this.tabUtilVerticleArrowVisibilityFunction(scopeObj.widgetArrowArray,scopeObj.selectedWidgetArrowMapper[scopeObj.navigateToScreenId]);
    this.verticleButtonFunction(scopeObj.widgetArray, scopeObj.selectedWidgetMapper[scopeObj.navigateToScreenId]);
    scopeObj.setVerticalTabSkins();
    scopeObj.setCompletedIconOnNavigate();
    if(!scopeObj.isRTEDemo && isShowCustomers && scopeObj.availableCustomerGroups.length === 0 && !scopeObj.isDefaultCampaign) {
      scopeObj.presenter.fetchCustomerGroups();
    } else if(scopeObj.isRTEDemo && isShowCustomers && Object.keys(scopeObj.allDatasets).length === 0 && !scopeObj.isDefaultCampaign) {
      scopeObj.presenter.getAttributes();
    } else if(isShowCustomers) {
      scopeObj.showCustomerRoles();
    }
  },

  setCompletedIconOnNavigate: function () {
    var scopeObj = this;
    //skin change for completed icon
    if(scopeObj.screenValidationMapper["1"]){
      scopeObj.widgetCompletedArray[0].skin = "sknFontIconCompleted";
      scopeObj.widgetCompletedArray[0].text = "\ue9ae";
    }
    if(scopeObj.screenValidationMapper["3"] || (scopeObj.screenValidationMapper["3"] && scopeObj.screenValidationMapper["4"]) || (scopeObj.screenValidationMapper["3"] && scopeObj.screenValidationMapper["8"])){
      scopeObj.widgetCompletedArray[1].skin = "sknFontIconCompleted";
      scopeObj.widgetCompletedArray[1].text = "\ue9ae";
    }
    if(scopeObj.screenValidationMapper["4"] || (scopeObj.screenValidationMapper["4"] && scopeObj.screenValidationMapper["8"])){
      scopeObj.widgetCompletedArray[2].skin = "sknFontIconCompleted";
      scopeObj.widgetCompletedArray[2].text = "\ue9ae";
    }
    if(scopeObj.screenValidationMapper["8"]){
      scopeObj.widgetCompletedArray[3].skin = "sknFontIconCompleted";
      scopeObj.widgetCompletedArray[3].text = "\ue9ae";
    }
  },

  verticleButtonFunction: function (widgetArray, selectedTab) {
    for (var i = 0; i < widgetArray.length; i++) {

      if (widgetArray[i] === selectedTab) {
        widgetArray[i].skin = "sknBtnUtilActive485c7512pxBold"; //selected skin
        widgetArray[i].hoverSkin = "sknBtnUtilActive485c7512pxBold";

      } else {
        widgetArray[i].skin = "Btn737678font12pxKA"; //normal skin sknBtnUtilRest73767812pxReg
      }
    }
  },

  setVerticalTabSkins : function() {
    var scopeObj = this;
    scopeObj.view.verticalTabs1.btnSubOption31.skin = scopeObj.screenValidationMapper["1"] ? scopeObj.view.verticalTabs1.btnSubOption31.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnSubOption32.skin = scopeObj.screenValidationMapper["2"] ? scopeObj.view.verticalTabs1.btnSubOption32.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnOption4.skin = scopeObj.screenValidationMapper["3"] ? scopeObj.view.verticalTabs1.btnOption4.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnSubOption1.skin = scopeObj.screenValidationMapper["4"] ? scopeObj.view.verticalTabs1.btnSubOption1.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnSubOption2.skin = scopeObj.screenValidationMapper["5"] ? scopeObj.view.verticalTabs1.btnSubOption2.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnSubOption3.skin = scopeObj.screenValidationMapper["6"] ? scopeObj.view.verticalTabs1.btnSubOption3.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnSubOption4.skin = scopeObj.screenValidationMapper["7"] ? scopeObj.view.verticalTabs1.btnSubOption4.skin : "Btn737678font12pxKA";
    scopeObj.view.verticalTabs1.btnOption5.skin = scopeObj.screenValidationMapper["8"] ? scopeObj.view.verticalTabs1.btnOption5.skin : "Btn737678font12pxKA";
  },

  undoChanges : function() {
    var scopeObj = this;
    var headerText = scopeObj.view.warningpopup.lblPopUpMainMessage.text ;
    if(headerText === kony.i18n.getLocalizedString("i18n.frmAdManagement.ReduceAdPlaceholders")) {
      scopeObj.deleteImageConfiguations();
    }
    scopeObj.closePopup();
  },

  formatOptionsData : function(optionsData, hasSelect) {
    let selectOption = kony.i18n.getLocalizedString("i18n.frmAdManagement.Select");
    let options = hasSelect ? [[selectOption,selectOption]] : [];
    for(let key in optionsData) {
      if(key !== selectOption){
        options.push([unescape(key), kony.i18n.getLocalizedString(optionsData[key])]);
      }
    }
    return options;
  },

  removeAttribute : function(attrid) {
    var scopeObj = this;
    var flex = scopeObj.view.flxAttributesDetailsBody["flx"+attrid];
    if(flex) {
      scopeObj.view.flxAttributesDetailsBody.remove(flex);
    }
    var attributeFlex = scopeObj.view["flxAttr"+attrid];
    attributeFlex.fonticonCheckBox.text = "\ue966" ;
    attributeFlex.fonticonCheckBox.skin = "sknFontIconCheckBoxUnselected" ;
    var hasData = scopeObj.view.flxAttributesDetailsBody.children.length > 0 ;
    scopeObj.view.flxAddAttributesDetailsMain.setVisibility(hasData);
    scopeObj.view.flxAddAttributesMsgContainer.setVisibility(!hasData);
  },

  validateRoleDetails : function() {
    var scopeObj = this;
    var isValidRoleDetails = true ;
    if(scopeObj.view.txtRoleName.text.trim() === "") {
      scopeObj.view.txtRoleName.skin = "skinredbg";
      scopeObj.view.RoleNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorRoleName");
      scopeObj.view.RoleNameError.setVisibility(true);
      isValidRoleDetails = false;
    }
    if(scopeObj.view.txtRoleDescription.text.trim() === "") {
      scopeObj.view.txtRoleDescription.skin = "sknTxtError";
      scopeObj.view.RoleDescError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorRoleDesc");
      scopeObj.view.RoleDescError.setVisibility(true);
      isValidRoleDetails = false;
    }
    if(scopeObj.view.flxNoAttributes.isVisible){
      scopeObj.view.flxNoAttributes.skin = "sknflxf8f9fabkge32416border3pxradius";
      scopeObj.view.NoAttributesError.setVisibility(true);
      isValidRoleDetails = false;
    }
    if(isValidRoleDetails) {
      var profileData = {
        "profileName" : scopeObj.view.txtRoleName.text.trim(),
        "profileDescription" : scopeObj.view.txtRoleDescription.text.trim(),
        "profileConditions" : scopeObj.selectedDatasets
      };
      scopeObj.presenter.createProfile(profileData);
      // scopeObj.sortBy = this.getObjectSorter("groupName");
    }
  },

  validateAttributes : function(datasetId) {
    var scopeObj = this;
    if(scopeObj.currentDatasetId === undefined || scopeObj.currentDatasetId === datasetId || scopeObj.view["flxDS" + scopeObj.currentDatasetId].fonticonCheckBox.text === "\ue966"){
      return true;
    }
    var hasValidAttributes = true;
    var hasAtleastOneAttributeSelected = scopeObj.currentDatasetId ? false : true;
    var attributesContainer = scopeObj.view["flxAttrContainer"+scopeObj.currentDatasetId].flxAttributesDetailsBody;
    var attribute ;
    for(var i=1; i<attributesContainer.children.length; i++) {
      attribute = attributesContainer[attributesContainer.children[i]];
      if(attribute.fonticonCheckBox.text === "\ue965") {
        hasAtleastOneAttributeSelected = true;
        hasValidAttributes = attribute.isValidAttribute() && hasValidAttributes;
      } else {
        attribute.showOrHideError(true);
      }
    }
    scopeObj.view["flxAttrContainer"+scopeObj.currentDatasetId].displayErrorMsg(!hasAtleastOneAttributeSelected, false);
    return hasValidAttributes && hasAtleastOneAttributeSelected;
  },

  populateAttributesList: function(profileConditions, filterId, segName){
    var scopeObj = this;
    var attrList = [], maxDatasetName = "";
    let datasets = [];
    profileConditions.forEach(function(cond){
      let datasetDetails = scopeObj.allDatasets[cond.dataContextId.replace(/_/g,"")];
      if(datasetDetails) {
        let datasetName = datasetDetails.name;
       	maxDatasetName = datasetName.length > maxDatasetName.length? datasetName : maxDatasetName;
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
    if(scopeObj.view[filterId]){
      scopeObj.view[filterId].setVisibility(false);
      scopeObj.view[filterId].segStatusFilterDropdown.setData(datasets);
      scopeObj.view[filterId].width = 60 + maxDatasetName.length*6 + "dp";
      scopeObj.view[filterId].onHover = this.onHoverEventCallbackStatus;
    }
    scopeObj.statusFilterSelection = [];
    scopeObj.allAttributesList = attrList;
    return attrList;
  },
  
  onHoverEventCallbackStatus : function(widget, context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
  },

  deleteButtonVisiblity: function(widget, context){
    var self = this;
    var formPath = widget.formPathId;
    var componentId = formPath.substring(formPath.indexOf("_") + 1, formPath.lastIndexOf("_"));
    var rowData = self.view[componentId].segEvents.data[context.rowIndex];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      rowData.flxDelete.isvisible = true;
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      rowData.flxDelete.isvisible = false;
    }
    self.view[componentId].segEvents.setDataAt(rowData, context.rowIndex);
    self.view.forceLayout();
  },

  removeRole: function() {
    var scopeObj = this;
    // i18n for Remove Role
    scopeObj.view.warningpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.RemoveRole");
    scopeObj.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.RemoveRoleMsg");
    scopeObj.view.warningpopup.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    scopeObj.view.warningpopup.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    scopeObj.view.flxConsentPopup.setVisibility(true);
    scopeObj.view.warningpopup.setVisibility(true);
    scopeObj.view.flxAddAttributesPopUp.setVisibility(false);
  },

  mappingCustomerRolesData: function(data){
    let scopeObj = this;
    scopeObj.selectedProfiles.push(data.profileId);
    return {
      "lblAttributes": {
        "text" : kony.i18n.getLocalizedString("i18n.frmAdManagement.View"),
        "onClick" : function(eventObject){
          scopeObj.showAttributesList(eventObject);
        }
      },
      "flxAttributesContainer":{
        "left": "82%"
      },
      "lblRoleDescription": {
        "text": data.profileDescription,
        "skin": "sknlblLatoReg485c7513px",
        "left": "23%",
        "width": "33%"
      },
      "lblRoleName": {
        text: scopeObj.AdminConsoleCommonUtils.getTruncatedString(data.profileName, 20, 18),
        tooltip: data.profileName,
        "skin": "sknlblLatoReg485c7513px",
        "left": "15px"
      },
      "lblUserCount": {
        "text": data.numberOfUsers || "N/A",
        "skin": "sknlblLatoReg485c7513px",
        "left": "60%"
      },
      "profileId" : data.profileId,
      "flxTargetCustRoles": {
        "onHover": scopeObj.OnHoverProfiles
      },
      "flxIconDelete": {
        onClick: scopeObj.deleteProfile,
        isVisible: false,
        "left": "95%"
      },
      "lblDeleteIcon": {
        "text": "\ue91b",
      },
      "lblSeparator": {
		"text": ".",
        "left": "0dp",
        "right": "0dp"
      }
    };
  },

  deleteProfile: function(widget, context) {
    var scopeObj = this;
    let profileId = scopeObj.view.segTargetCustomerRoles.data[context.rowIndex].profileId;
    scopeObj.view.segTargetCustomerRoles.removeAt(context.rowIndex);
    let hasRolesAssigned = scopeObj.view.segTargetCustomerRoles.data.length > 0;
    scopeObj.view.flxAddRole.setVisibility(false);
    scopeObj.view.flxNoRoles.setVisibility(!hasRolesAssigned);
    scopeObj.view.flxViewDetails.setVisibility(hasRolesAssigned);
    scopeObj.view.flxTargetCustomers.forceLayout();
    let index = scopeObj.selectedProfiles.indexOf(profileId);
    if(index !== -1){
      scopeObj.selectedProfiles.splice(index,1);  
    }
  },

  OnHoverProfiles : function(widget, context) {
    var self = this;
    var rowData = self.view.segTargetCustomerRoles.data[context.rowIndex];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      if (rowData.flxIconDelete.isVisible === false) {
        rowData.flxIconDelete.isVisible = true;
        rowData.lblDeleteIcon.isVisible = true;
        self.view.segTargetCustomerRoles.setDataAt(rowData, context.rowIndex);
      }
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if (rowData.flxIconDelete.isVisible === true) {
        rowData.flxIconDelete.isVisible = false;
        rowData.lblDeleteIcon.isVisible = false;
        self.view.segTargetCustomerRoles.setDataAt(rowData, context.rowIndex);
      }
    }
    self.view.forceLayout();
  },

  showAttributesList: function(eventObject){
    var scopeObj = this;
    var profileData = scopeObj.allProfiles[scopeObj.view.segTargetCustomerRoles.selectedRowItems[0].profileId];
    scopeObj.view.lblCustomerRoleName.text = profileData.profileName + " " + kony.i18n.getLocalizedString("i18n.frmAdManagement.AttributesList");
    scopeObj.view.lblAttributeDescription.text = profileData.profileDescription;
    scopeObj.view.lblAttributeUserAvailable.text = profileData.numberOfUsers || "N/A";
    let profileConds = profileData.profileConditions;
    let attrList = scopeObj.populateAttributesList(profileConds,'viewAttributesFilter','segAttributeList');
    scopeObj.view.segAttributeList.widgetDataMap = {"flxAttributeRow": "flxAttributeRow",
                                                    "lblAttribute": "lblAttribute",
                                                    "lblCriteria": "lblCriteria",
                                                    "lblDataset": "lblDataset",
                                                    "lblValue": "lblValue"
                                                   };
    scopeObj.view.segAttributeList.setData(attrList);
    scopeObj.getObjectSorter().column('lblAttribute');
    scopeObj.view.lblSortAttribute1.text = '\ue92b';
    scopeObj.view.flxViewAttributeList.setVisibility(true);
  },

  /** This function is to be called when 'Create Role' is Clicked
  */
  populateTargetCustomerRoles: function(selectedProfiles, isCreateProfile){
    var scopeObj = this;
    let customerRolesData = selectedProfiles.map(this.mappingCustomerRolesData);
    if(isCreateProfile){
      let len = scopeObj.view.segTargetCustomerRoles.data.length;
      scopeObj.view.segTargetCustomerRoles.addDataAt(customerRolesData[0],len);
    } else {
      scopeObj.view.segTargetCustomerRoles.setData(customerRolesData);
    }
    let len = scopeObj.view.segTargetCustomerRoles.data.length;
    scopeObj.view.flxAddRole.setVisibility(false);
    scopeObj.view.flxViewDetails.setVisibility(len > 0);
    scopeObj.view.flxNoRoles.setVisibility(len === 0);
  },

  sortCustomerRolesViewDetails: function(sortColumn){
    var self = this;
    var segData = self.view.segTargetCustomerRoles.data;

    self.sortBy.column(sortColumn);
    var sortOrder = self.sortBy.inAscendingOrder;
    var segDataSorted = segData.sort(this.sortBy.sortData);

    self.determineSortFontIcon(this.sortBy, sortColumn, this.view.fontIconRoleName);
    self.view.segTargetCustomerRoles.setData(segDataSorted);
  },

  resetRolesSkins : function() {
    var scopeObj = this;
    scopeObj.view.txtRoleName.text = "";
    scopeObj.view.txtRoleDescription.text = "";
    scopeObj.view.txtRoleName.skin = "txtD7d9e0";
    scopeObj.view.RoleNameError.setVisibility(false);
    scopeObj.view.txtRoleDescription.skin = "skntxtAread7d9e0";
    scopeObj.view.RoleDescError.setVisibility(false);
    scopeObj.view.flxNoAttributes.skin = "sknflxf8f9fabkgdddee0border3pxradius";
    scopeObj.view.NoAttributesError.setVisibility(false);
    scopeObj.view.flxAddAttributes.setVisibility(false);
    scopeObj.view.flxNoAttributes.setVisibility(true);
    scopeObj.view.flxNoRoles.setVisibility(false);
    scopeObj.view.btnAddMoreAttrs.setVisibility(false);
    scopeObj.view.flxAddRole.setVisibility(true);
    scopeObj.view.commonButtons.btnNext.setVisibility(true);
    scopeObj.view.commonButtons.btnSave.setVisibility(false);
    scopeObj.view.flxViewDetails.setVisibility(false);
    scopeObj.view.flxTargetCustomers.forceLayout();
  },

  displayDatasetCount : function() {
    var scopeObj = this;
    scopeObj.view.lblDatasetCount.text = scopeObj.selectedDatasetCount > 9 ? scopeObj.selectedDatasetCount : "0" + scopeObj.selectedDatasetCount;
  },

  populateDatasets : function() {
    var scopeObj = this;
    var datasetObj ;
    var hasData = false;
    scopeObj.selectedDatasetCount = 0;
    scopeObj.view.flxDatasetList.removeAll();
    scopeObj.view.flxAddAttributesDetailsMain.removeAll();
    for(var key in scopeObj.allDatasets){
      hasData = true;
      datasetObj = scopeObj.allDatasets[key];
      var dataset = new com.adminConsole.adManagement.dataset({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": "flxDS" + key,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "overrides": {
          "lblName": {
            "text": datasetObj.name ,
            "width" : "122dp"
          },
          "lblId": {
            "text": datasetObj.id ,
          },
          "fonticonCheckBox": {
            "onClick": function(eventobject) {
              scopeObj.onSelectDataset(eventobject, false);
            }
          },
          "flxDataset" : {
            "onClick": function(eventobject) {
              scopeObj.onViewDataset(eventobject);
            }
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      scopeObj.view.flxDatasetList.add(dataset);
      scopeObj.populateAllAvailableAttributes(datasetObj.attributes, key);
    }
    scopeObj.view.flxDatasetList.setVisibility(hasData);
    scopeObj.view.flxAddAttributesDetailsMain.setVisibility(hasData);
    scopeObj.view.flxAddAttributesMsgContainer.setVisibility(!hasData);
    scopeObj.view.flxNoDatasetFound.setVisibility(!hasData);
    scopeObj.displayDatasetCount();
  },

  onViewDataset : function(eventobject){
    var scopeObj = this;
    let datasetId = eventobject.lblId.text.replace(/_/g,"");
    if(scopeObj.currentDatasetId && scopeObj.currentDatasetId !== datasetId){
      let isSelected = eventobject.fonticonCheckBox.text === "\ue965";
      scopeObj.onSelectDataset(eventobject.fonticonCheckBox, true);
      eventobject.fonticonCheckBox.text = isSelected ? "\ue965" : "\ue966";
      eventobject.fonticonCheckBox.skin = isSelected ? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected";
    } else {
      scopeObj.currentDatasetId = datasetId;
      eventobject.skin = "sknFlxBorder117eb0radius3pxbgfff";
      eventobject.fontIconArrow.setVisibility(true);
      scopeObj.view["flxAttrContainer" + datasetId].setVisibility(true);
      scopeObj.view.flxAddAttributesDetailsMain.setVisibility(true);
      scopeObj.view.flxAddAttributesMsgContainer.setVisibility(false);
      scopeObj.view["flxAttrContainer" + scopeObj.currentDatasetId].flxAttributesDetailsBody.height = (scopeObj.view.flxAddAttributesDetailsContainer.frame.height-122) + "dp";
      scopeObj.view["flxAttrContainer" + scopeObj.currentDatasetId].forceLayout();
    }
  },

  onSelectDataset : function(eventobject, isFromViewDataset) {
    var scopeObj = this;
    let datasetId = eventobject.parent.lblId.text.replace(/_/g,"");
    let isSelected = eventobject.text === "\ue966" ;
    if(isSelected || isFromViewDataset) {
      scopeObj.validateDataset(datasetId, isFromViewDataset);
    } else {
      scopeObj.resetDataset(datasetId);
      scopeObj.selectedDatasetCount = scopeObj.selectedDatasetCount-1;
    }
    scopeObj.displayDatasetCount();
  },

  resetDataset : function(datasetId){
    var scopeObj = this;
    if(scopeObj.currentDatasetId){
      let prevDataset = scopeObj.view["flxDS"+scopeObj.currentDatasetId];
      prevDataset.fontIconArrow.setVisibility(false);
      prevDataset.flxDataset.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      scopeObj.view["flxAttrContainer" + scopeObj.currentDatasetId].setVisibility(false);
    }
    let dataset = scopeObj.view["flxDS" + datasetId];
    var attributesContainer = scopeObj.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody;
    var attribute;
    for (var i = 1; i < attributesContainer.children.length; i++) {
      attribute = attributesContainer[attributesContainer.children[i]];
      attribute.resetData();
    }
    dataset.fonticonCheckBox.text = "\ue966";
    dataset.fonticonCheckBox.skin = "sknFontIconCheckBoxUnselected";
    dataset.flxDataset.skin = "sknFlxBorder117eb0radius3pxbgfff";
    dataset.fontIconArrow.setVisibility(true);
    attributesContainer.parent.flxError.setVisibility(false);
    attributesContainer.parent.flxAttributesDetailsBody.height = (attributesContainer.parent.flxAttributesDetailsBody.frame.height + 55) + "dp" ;
    attributesContainer.parent.displayErrorMsg(false);
    attributesContainer.parent.resetAttributeSelectionCount();
    attributesContainer.parent.setVisibility(true);
    attributesContainer.parent.forceLayout();
    scopeObj.currentDatasetId = datasetId;
  },

  validateDataset : function(datasetId, isFromViewDataset){
    var scopeObj = this;
    var hasValidAttributes = scopeObj.validateAttributes(datasetId);
    if(hasValidAttributes) {
      if(scopeObj.currentDatasetId){
        let prevDataset = scopeObj.view["flxDS"+scopeObj.currentDatasetId];
        prevDataset.fontIconArrow.setVisibility(false);
        prevDataset.flxDataset.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
        scopeObj.view["flxAttrContainer" + scopeObj.currentDatasetId].setVisibility(false);
        scopeObj.view["flxAttrContainer" + datasetId].setVisibility(false);
      }
      let dataset = scopeObj.view["flxDS"+datasetId];
      dataset.fonticonCheckBox.text = "\ue965";
      dataset.fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
      dataset.fontIconArrow.setVisibility(true);
      dataset.flxDataset.skin = "sknFlxBorder117eb0radius3pxbgfff";
      scopeObj.view["flxAttrContainer" + datasetId].setVisibility(true);
      scopeObj.view.flxAddAttributesMsgContainer.setVisibility(false);
      scopeObj.view.flxAddAttributesDetailsMain.setVisibility(true);
      dataset.forceLayout();
      scopeObj.currentDatasetId = datasetId;
      scopeObj.view["flxAttrContainer" + scopeObj.currentDatasetId].flxAttributesDetailsBody.height = (scopeObj.view.flxAddAttributesDetailsContainer.frame.height-122) + "dp";
      scopeObj.view["flxAttrContainer" + scopeObj.currentDatasetId].forceLayout();
      scopeObj.selectedDatasetCount = isFromViewDataset ? scopeObj.selectedDatasetCount : scopeObj.selectedDatasetCount+1;
    }
  },

  searchDatasets : function() {
    var scopeObj = this;
    var searchText = scopeObj.view.tbxDatasetSearchBox.text.trim().toUpperCase();
    var availableDatasets = scopeObj.view.flxDatasetList.children;
    var datasetName ;
    var hasSearchResults = false ;
    var isVisible = (searchText === "");
    for(var i=0; i<availableDatasets.length; i++){
      datasetName = scopeObj.view.flxDatasetList[availableDatasets[i]].lblName.text.toUpperCase();
      isVisible = (searchText === "") ? true : datasetName.indexOf(searchText) !== -1;
      hasSearchResults = hasSearchResults || isVisible;
      scopeObj.view.flxDatasetList[availableDatasets[i]].setVisibility(isVisible);
    }
    scopeObj.view.flxDatasetList.setVisibility(hasSearchResults);
    scopeObj.view.flxNoDatasetFound.setVisibility(!hasSearchResults);
    scopeObj.view.flxDatasetList.forceLayout();
  },

  addAttributesToMainScreen : function(){
    var scopeObj = this;
    var availableDatasets = scopeObj.view.flxDatasetList.children;
    scopeObj.selectedAttributes = [];
    scopeObj.selectedDatasets = [];
    let datasets = [];
    for (var i = 0; i < availableDatasets.length; i++) {
      let dataset = scopeObj.view.flxDatasetList[availableDatasets[i]];
      let datasetId = dataset.id.replace("flxDS", "");
      if(dataset.fonticonCheckBox.text === "\ue965"){
        let expression = "";
        var attributesContainer = scopeObj.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody;
        for (var j = 1; j < attributesContainer.children.length; j++) {
          let attribute = attributesContainer[attributesContainer.children[j]];
          if(attribute.fonticonCheckBox.text === "\ue965"){
            let attrId = attribute.lblId.text;
            let attributeObj = scopeObj.allDatasets[datasetId].attributes[attrId];
            let attrCriteriaKey = attribute.lstCriteria.selectedKeyValue[0];
            let attrValueKey = attribute.txtValue.isVisible ? attribute.txtValue.text.trim() : attribute.lstValues.selectedKeyValue[0];
            expression += expression.length > 0 ? " and "  : "";
            expression = expression + attributeObj.attributendpoint + " " + attrCriteriaKey + " '" + attrValueKey + "'";
            scopeObj.selectedAttributes.push({
              "datasetId" : datasetId,
              "datasetName" : dataset.lblName.text,
              "attributeId" : attribute.lblId.text,
              "attributeName" : attribute.lblName.text,
              "criteriaKey" : attrCriteriaKey,
              "criteriaValue" : attribute.lstCriteria.selectedKeyValue[1],
              "valueKey" : attrValueKey,
              "value" : attribute.txtValue.isVisible ? attribute.txtValue.text.trim() : attribute.lstValues.selectedKeyValue[1]
            });
          } else {
            attribute.resetData();
          }
        }
        scopeObj.selectedDatasets.push({
          "profileConditionId" : "",
          "conditionExpression" : escape(expression),
          "dataContextId" : scopeObj.allDatasets[datasetId].id
        });
        datasets.push({
          lblDescription : scopeObj.allDatasets[datasetId].name,
          imgCheckBox:{"src":"checkboxselected.png"}
        });
      } else {
        dataset.fonticonCheckBox.text = "\ue966";
        dataset.fonticonCheckBox.skin = "sknFontIconCheckBoxUnselected";
        dataset.flxDataset.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
        dataset.fontIconArrow.setVisibility(false);
      }
      if(scopeObj.view["flxAttrContainer" + datasetId].txtAttributeSearch.text.trim() !== ""){
        scopeObj.view["flxAttrContainer" + datasetId].txtAttributeSearch.text = "";
        scopeObj.view["flxAttrContainer" + datasetId].searchAttributes();
      }
    }
    var hasData = scopeObj.selectedAttributes.length > 0;
    scopeObj.view.segSelectedAttributes.widgetDataMap = {
      "flxAttributeRow": "flxAttributeRow",
      "lblAttribute": "attributeName",
      "lblCriteria": "criteriaValue",
      "lblDataset": "datasetName",
      "lblValue": "value"
    };
    scopeObj.statusFilterSelection = [];
    scopeObj.allAttributesList = scopeObj.selectedAttributes;
    scopeObj.view.segSelectedAttributes.setData(scopeObj.selectedAttributes);
    scopeObj.view.flxNoAttributes.setVisibility(!hasData);
    scopeObj.view.flxAddAttributes.setVisibility(hasData);
    scopeObj.view.btnAddMoreAttrs.setVisibility(hasData);
    scopeObj.view.datasetFilter.segStatusFilterDropdown.setData(datasets);
    scopeObj.view.datasetFilter.setVisibility(false);
    scopeObj.getObjectSorter().column('attributeName');
    scopeObj.view.lblSortAttribute.text = '\ue92b';
  },

  sortAttributes : function(propname, segName, arrowName) {
    var scopeObj = this;  
    var sortOrder = (scopeObj.sortBy) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter(propname);
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    scopeObj.getObjectSorter().column(propname);
    var data = scopeObj.view[segName].data.sort(scopeObj.sortBy.sortData);
    scopeObj.view[segName].setData(data);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,propname,scopeObj.view[arrowName]);
    scopeObj.view.statusFilterMenu.setVisibility(false);
    scopeObj.view.viewAttributesFilter.setVisibility(false);
    scopeObj.view.datasetFilter.setVisibility(false);
  },

  onSelectProfile : function(eventobject, isCheckBox){
    var scopeObj = this;  
    let profile = isCheckBox ? eventobject.parent : eventobject ;
    let profileId = profile.lblId.text;
    if (isCheckBox) {
      let isSelected = profile.fonticonCheckBox.text === "\ue966";
      profile.fonticonCheckBox.text = isSelected ? "\ue965" : "\ue966";
      profile.fonticonCheckBox.skin = isSelected ? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected";
      scopeObj.selectedProfileCount = isSelected ? scopeObj.selectedProfileCount+1 : scopeObj.selectedProfileCount-1;
    }
    if(scopeObj.currentProfileId){
      let prevProfile = scopeObj.view["flxProfile"+scopeObj.currentProfileId];
      prevProfile.flxDataset.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      prevProfile.fontIconArrow.setVisibility(false);
    }
    profile.skin = "sknFlxBorder117eb0radius3pxbgfff";
    profile.fontIconArrow.setVisibility(true);
    scopeObj.showProfileAttributes(profileId);
    scopeObj.displayProfileCount();
  },

  searchProfiles : function() {
    var scopeObj = this;
    var searchText = scopeObj.view.tbxExistingRolesSearchBox.text.trim().toUpperCase();
    var availableProfiles = scopeObj.view.flxProfilesData.children;
    var hasSearchResults = false ;
    var isVisible = (searchText === "");
    for(var i=0; i<availableProfiles.length; i++){
      let profileName = scopeObj.view.flxProfilesData[availableProfiles[i]].lblName.text.toUpperCase();
      isVisible = (searchText === "") ? true : profileName.indexOf(searchText) !== -1;
      hasSearchResults = hasSearchResults || isVisible;
      scopeObj.view.flxProfilesData[availableProfiles[i]].setVisibility(isVisible);
    }
    scopeObj.view.flxProfilesData.setVisibility(hasSearchResults);
    scopeObj.view.flxNoExistingRolesFound.setVisibility(!hasSearchResults);
    scopeObj.view.forceLayout();
  },

  displayProfileCount : function() {
    var scopeObj = this;
    scopeObj.view.lblProfileCount.text = scopeObj.selectedProfileCount > 9 ? scopeObj.selectedProfileCount : "0" + scopeObj.selectedProfileCount;
  },

  addProfilesToCampaign : function(){
    var scopeObj = this;
    var availableProfiles = scopeObj.view.flxProfilesData.children;
    var data = [];
    for(var i=0; i<availableProfiles.length; i++){
      let profile = scopeObj.view.flxProfilesData[availableProfiles[i]];
      if(profile.fonticonCheckBox.text === "\ue965"){
        data.push(scopeObj.allProfiles[profile.lblId.text]);
      }
    }
    scopeObj.populateTargetCustomerRoles(data);
    scopeObj.closePopup();
  },

  sortProfiles : function(columnName){
    var scopeObj = this;
    var sortOrder = (scopeObj.sortBy) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter(columnName);
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    var data = scopeObj.view.segTargetCustomerRoles.data.sort(scopeObj.sortBy.sortData);
    scopeObj.view.segTargetCustomerRoles.setData(data);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,'lblRoleName.text',scopeObj.view.fontIconRoleName);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,'lblUserCount.text',scopeObj.view.fontIconNoOfUsers);
  },

  showProfileAttributes : function(profileId){
    var scopeObj = this;
    let profileData = scopeObj.allProfiles[profileId];
    scopeObj.view.lblSelectedRoleName.text = profileData.profileName;
    scopeObj.view.lblERAttributeDescription.text = profileData.profileDescription;
    scopeObj.view.lblERAttributeUserAvailable.text = profileData.numberOfUsers || "N/A";
    scopeObj.view.flxExistingRoleDetailsInner.setVisibility(true);
    scopeObj.view.flxAddExistingRoleMsgContainer.setVisibility(false);
    let attrList = scopeObj.populateAttributesList(profileData.profileConditions, "statusFilterMenu", 'segERAttributeList');
    var hasData = attrList.length > 0;
    scopeObj.view.segERAttributeList.setVisibility(hasData);
    scopeObj.view.flxNoExistingAttributesFound.setVisibility(!hasData);
    scopeObj.view.segERAttributeList.widgetDataMap = {"flxAttributeRow": "flxAttributeRow",
                                                      "lblAttribute": "lblAttribute",
                                                      "lblCriteria": "lblCriteria",
                                                      "lblDataset": "lblDataset",
                                                      "lblValue": "lblValue"
                                                     };
    scopeObj.view.segERAttributeList.setData(attrList);
    scopeObj.currentProfileId = profileId;
    scopeObj.getObjectSorter().column('lblAttribute');
    scopeObj.view.lblERSortAttribute.text = '\ue92b';
  },

  navigateBackToProfiles : function(){
    var scopeObj = this;
    var hasRolesAssigned = scopeObj.view.segTargetCustomerRoles.data.length > 0;
    scopeObj.view.flxNoRoles.setVisibility(!hasRolesAssigned);
    scopeObj.view.flxAddRole.setVisibility(false);
    scopeObj.view.flxViewDetails.setVisibility(hasRolesAssigned);
    scopeObj.view.commonButtons.btnNext.setVisibility(false);
    scopeObj.view.commonButtons.btnSave.setVisibility(true);
    scopeObj.view.flxTargetCustomers.forceLayout();
  },

  filterDatasets: function(description,filterId, segName){
    let scopeObj = this;
    let datasetIndex = scopeObj.statusFilterSelection.indexOf(description);
    if(datasetIndex === -1) { // dataset selected 
      scopeObj.statusFilterSelection.push(description);
    } else { // dataset unselected 
      scopeObj.statusFilterSelection.splice(datasetIndex,1);
    }
    let filterlen = scopeObj.view[filterId].segStatusFilterDropdown.data.length;
    let selFilterLen = scopeObj.statusFilterSelection.length;
    if(selFilterLen === 0 || selFilterLen === filterlen){ 
      // if all options are selected  OR no options are selected
      scopeObj.view[segName].setData(scopeObj.allAttributesList);
    } else {
      // if some of the filters are selected
      let data = [];
      scopeObj.allAttributesList.forEach(function(obj){
        let datasetName = obj.datasetName ? obj.datasetName.toUpperCase() : obj.lblDataset.toUpperCase();
        if(scopeObj.statusFilterSelection.indexOf(datasetName) !== -1){
          data.push(obj);
        }
      });
      scopeObj.view[segName].setData(data);
    }
  },

  resetAttributeSelectionOnCancel : function() {
    let scopeObj = this;
    scopeObj.resetAllDatasets();
    if(scopeObj.selectedAttributes.length > 0){
      scopeObj.selectedAttributes.forEach(function(obj){
        let datasetId = obj.datasetId;
        scopeObj.view["flxDS" + datasetId].fonticonCheckBox.text = "\ue965";
        scopeObj.view["flxDS" + datasetId].fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
        let attrContainer = scopeObj.view["flxAttrContainer" + datasetId];
        let attribute = attrContainer["flxAttr" + obj.attributeId.replace(/_/g, "")];
        attribute.fonticonCheckBox.text = "\ue965";
        attribute.fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
        attribute.lstCriteria.selectedKey = obj.criteriaKey;
        if(attribute.txtValue.isVisible) {
          attribute.txtValue.text = obj.valueKey ;
        } else {
          attribute.lstValues.selectedKey = obj.valueKey;
        }
      });
    }
  },

  resetAllDatasets : function(){
    let scopeObj = this;
    var availableDatasets = scopeObj.view.flxDatasetList.children;
    for(var i=0; i<availableDatasets.length; i++){
      let dataset = scopeObj.view.flxDatasetList[availableDatasets[i]];
      let datasetId = dataset.id.replace("flxDS","");
      dataset.flxDataset.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      dataset.fontIconArrow.setVisibility(false);
      if(dataset.fonticonCheckBox.text === "\ue965") {
        scopeObj.resetDataset(datasetId);
      }
      if(scopeObj.view["flxAttrContainer" + datasetId].txtAttributeSearch.text.trim() !== ""){
        scopeObj.view["flxAttrContainer" + datasetId].txtAttributeSearch.text = "";
        scopeObj.view["flxAttrContainer" + datasetId].searchAttributes();
      }
      dataset.fonticonCheckBox.text = "\ue966";
      dataset.fonticonCheckBox.skin = "sknFontIconCheckBoxUnselected";
      scopeObj.view["flxAttrContainer" + datasetId].setVisibility(false);
    }
    scopeObj.selectedDatasetCount = 0;
    scopeObj.view.flxAddAttributesDetailsMain.setVisibility(false);
    scopeObj.view.flxAddAttributesMsgContainer.setVisibility(true);
    scopeObj.displayDatasetCount();
  }

});
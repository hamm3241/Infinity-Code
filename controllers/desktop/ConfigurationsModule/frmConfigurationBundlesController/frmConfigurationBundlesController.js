define({
  allBundles : [],
  allConfigurations : [],
  activeConfigurations : [],
  clientServerToggle : true,
  activeBundle : {
    "bundleId" : "",
    "bundleName" : "",
    "appId" : ""
  },
  activeConfiguration : {
    "segmentIndex" : "",
    "configurationId" : "",
    "key" : "",
    "value" : "",
    "type" : "",
    "target" : "",
    "description" : ""
  },
  configurationType : {
   "PREFERENCE" : "PARAMETERS",
    "IMAGE/ICON" : "IMAGE/ICON",
    "SKIN" : "SKIN",
  },
  bundleAddMode : false,
  bundleEditMode : false,
  bundleDeleteMode : false,
  configurationEditMode : false,
  configurationDeleteMode : false,
  typeFilterIndiciesArray: [0, 1],
  targetFilterIndiciesArray: [0, 1],
  prevIndex : -1,

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

    if(context.fetchAllBundlesAndConfigurationsStatus) {
      this.fetchAllBundlesAndConfigurationsResponse(context.fetchAllBundlesAndConfigurationsStatus, context.bundles, context.configurations);
    }
    else if(context.fetchConfigurationsStatus) {
      this.fetchConfigurationsResponse(context.fetchConfigurationsStatus, context.configurations);
    }
    else if(context.addBundleAndConfigurationsStatus) {
      this.addBundleAndConfigurationsResponse(context.addBundleAndConfigurationsStatus);
    }
    else if(context.editBundleAndConfigurationsStatus) {
      this.editBundleAndConfigurationsResponse(context.editBundleAndConfigurationsStatus);
    }
    else if(context.deleteBundleStatus) {
      this.deleteBundleResponse(context);
    }
    else if(context.deleteConfigurationStatus) {
      this.deleteConfigurationResponse(context);
    }
    this.view.forceLayout();
  },

  preShowActions : function() {
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;

    this.view.flxMain.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.flxMainContent.height = (kony.os.deviceInfo().screenHeight - 126) + "px";
    this.view.flxAddConfigurationBundles.height = (kony.os.deviceInfo().screenHeight - 136 - 20) + "px";
    this.view.flxViewConfigurationBundles.height = (kony.os.deviceInfo().screenHeight - 146 - 20) + "px";
    this.view.flxAddConfigurationBundlesBody.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 20) + "px";
    this.view.flxAddConfiguration.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 20 - 20) + "px";
    this.view.configurationData.flxTableView.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 40 - 20 - 20) + "px";
    this.view.flxViewConfigurationBundleBody.height = (kony.os.deviceInfo().screenHeight - 146 - 60 - 20) + "px";

    this.view.btnConfigurationBundlesAdd.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonAdd");
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleConfigurationBundle");
    this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.addBundleButton");
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.breadcrumbConfigurationBundles");
    this.view.tbxBundleSearchBox.text = "";
    this.view.tbxConfigurationSearchBox.text = "";

    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.flxDeleteBundleOrConfiguration.setVisibility(false);
    this.view.flxBundleNameCharCount.setVisibility(false);
    this.view.flxAddConfigurationBundles.setVisibility(false);
    this.view.flxNoConfigurationBundles.setVisibility(false);
    this.view.flxViewConfigurationBundles.setVisibility(false);
    this.view.flxAddConfigurationPopUp.setVisibility(false);
    this.view.flxPopUpWarning.setVisibility(false);
    this.view.flxDeleteBundleOrConfiguration.setVisibility(false);
    this.view.flxConfigTypeFilter.setVisibility(false);
    this.view.flxConfigTargetFilter.setVisibility(false);
    this.view.flxNoBundleNameError.setVisibility(false);
    this.view.flxNoAppIdError.setVisibility(false);
    this.view.txtBundleName.skin="skntbxConfigurationBundlesNormal";
    this.view.txtAppId.skin="skntbxConfigurationBundlesNormal";
    this.view.flxToastMessage.setVisibility(false);

    this.view.configTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,[0,1,2]]];
    this.view.configTargetFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,[0,1]]];
	this.clientServerToggle = true;
    this.setFlowActions();
    this.view.forceLayout();
  },

  setFlowActions : function() {
    var scopeObj = this;

    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.openBundlesPage();
    };

    this.view.noStaticData.btnAddStaticContent.onClick = function() {
      scopeObj.openAddBundlesAndConfigurationPage();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function() {
      scopeObj.openAddBundlesAndConfigurationPage();
    };

    this.view.flxAddConfigurationButton.onClick = function() {
      scopeObj.openAddConfigurationPopUp();
    };

    this.view.btnAddConfigurationPopUpAdd.onClick = function() {
      scopeObj.setNewConfigurationToSegment();
    };
    this.view.btnAddConfigurationPopUpCancel.onClick = function() {
      scopeObj.closeConfigurationPopUp();
    };
    this.view.flxAddConfigurationClose.onClick = function() {
      scopeObj.closeConfigurationPopUp();
    };

    this.view.btnConfigurationBundlesAdd.onClick = function() {
      scopeObj.addOrEditBundleAndConfigurations();
    };

    this.view.btnConfigurationBundlesCancel.onClick = function() {
      scopeObj.openBundlesPage();
    };

    this.view.configurationData.segConfiguration.onRowClick = function() {
      scopeObj.configurationRowClick();
    };

    this.view.contextualMenu1.flxOption2.onClick = function() {
      scopeObj.view.contextualMenu1.setVisibility(false);
      scopeObj.openEditConfigurationPopUp();
    };

    this.view.contextualMenu1.flxOption4.onClick = function() {
      scopeObj.view.contextualMenu1.setVisibility(false);
      scopeObj.openDeleteConfigurationPopUp();
    };

    this.view.lblFonticonBundleEdit.onClick = function() {
      scopeObj.openEditBundlesAndConfigurationPage();
    };

    this.view.txtBundleName.onBeginEditing = function() {
      scopeObj.view.lblBundleNameCharCount.text = scopeObj.view.txtBundleName.text.length + "/100";
      scopeObj.view.flxBundleNameCharCount.setVisibility(true);
    };

    this.view.txtBundleName.onEndEditing = function() {
      scopeObj.view.flxBundleNameCharCount.setVisibility(false);
    };

    this.view.txtBundleName.onKeyUp = function() {
      scopeObj.bundleNameEntered();
    };

    this.view.txtAppId.onKeyUp = function() {
      scopeObj.appIdEntered();
    };

    this.view.txtAddConfigurationKey.onKeyUp = function() {
      scopeObj.configurationKeyEntered();
    };
    
    this.view.txtAreaAddConfigurationValue.onBeginEditing = function() {
      scopeObj.view.lblValueCharCount.text = scopeObj.view.txtAreaAddConfigurationValue.text.length + "/20000";
      scopeObj.view.flxValueCharCount.setVisibility(true);
    };

    this.view.txtAreaAddConfigurationValue.onEndEditing = function() {
      scopeObj.view.flxValueCharCount.setVisibility(false);
    };

    this.view.txtAreaAddConfigurationValue.onKeyUp = function() {
      scopeObj.configurationValueEntered();
    };

    this.view.txtAreaAddConfigurationDescription.onBeginEditing = function() {
      scopeObj.view.lblDescriptionCharCount.text = scopeObj.view.txtAreaAddConfigurationDescription.text.length + "/20000";
      scopeObj.view.flxDescriptionCharCount.setVisibility(true);
    };

    this.view.txtAreaAddConfigurationDescription.onEndEditing = function() {
      scopeObj.view.flxDescriptionCharCount.setVisibility(false);
    };

    this.view.txtAreaAddConfigurationDescription.onKeyUp = function() {
      scopeObj.configurationDescriptionEntered();
    };

    this.view.flxPopUpWarningClose.onClick = function() {
      scopeObj.view.flxPopUpWarning.setVisibility(false);
    };

    this.view.btnOk.onClick = function() {
      scopeObj.view.flxPopUpWarning.setVisibility(false);
    };

    this.view.btnBundleNameExistsClick.onClick = function() {
      scopeObj.showExistingBundleAndConfigurations();
    };

    this.view.popUpDelete.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeleteBundleOrConfiguration.setVisibility(false);
    };

    this.view.popUpDelete.flxPopUpClose.onClick = function() {
      scopeObj.view.flxDeleteBundleOrConfiguration.setVisibility(false);
    };

    this.view.popUpDelete.btnPopUpDelete.onClick = function() {
      scopeObj.deleteBundleOrConfiguration();
    };

    this.view.lbxBundleSortByOptions.onSelection = function() {
      scopeObj.setBundles(scopeObj.allBundles, scopeObj.view.lbxBundleSortByOptions.selectedKey);
    };

    this.view.configTypeFilterMenu.segStatusFilterDropdown.onRowClick =  function() {
      scopeObj.performTypeFilter();
    };

    this.view.configTargetFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      scopeObj.performTargetFilter();
    };

    this.view.tbxBundleSearchBox.onBeginEditing = function() {
      scopeObj.bundleSearchBoxBeginEditing();
    };

    this.view.tbxBundleSearchBox.onKeyUp = function() {
      scopeObj.searchBundles();
    };

    this.view.tbxBundleSearchBox.onEndEditing = function() {
      scopeObj.bundleSearchBoxEndEditing();
    };

    this.view.tbxConfigurationSearchBox.onBeginEditing = function() {
      scopeObj.configurationSearchBoxBeginEditing();
    };

    this.view.tbxConfigurationSearchBox.onKeyUp = function() {
      scopeObj.searchConfigurations();
    };

    this.view.tbxConfigurationSearchBox.onEndEditing = function() {
      scopeObj.configurationSearchBoxEndEditing();
    };

    this.view.configurationData.flxConfigurationKeySort.onClick = function() {
      scopeObj.sortConfigurationsByConfigKey();
    };

    this.view.configurationData.flxConfigurationValueSort.onClick = function() {
      scopeObj.sortConfigurationsByConfigValue();
    };

    this.view.configurationData.flxConfigurationTypeFilter.onClick = function() {
      scopeObj.toggleTypeFilter();
    };

    this.view.configurationData.flxConfigurationTargetFilter.onClick = function() {
      scopeObj.toggleTargetFilter();
    };

    this.view.flxClearBundleSearchImage.onClick = function() {
      scopeObj.cancelSearchBundles();
    };

    this.view.flxClearSearchImage.onClick = function() {
      scopeObj.cancelSearchConfigurations();
    };
    
    this.view.btnToggleClient.onClick = function() {
      scopeObj.clientToggleButtonClick();
    };

    this.view.btnToggleServer.onClick = function() {
      scopeObj.serverToggleButtonClick();
    };
    
    this.view.flxConfigTypeFilter.onHover = scopeObj.onHoverEventCallback;
    this.view.flxConfigTargetFilter.onHover = scopeObj.onHoverEventCallback;

    this.view.forceLayout();
  },

  // --> UI screen management functions <--
  openBundlesPage : function() {
    var scopeObj = this;

    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleConfigurationBundle");
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.flxBreadcrumb.setVisibility(false);
    this.view.flxBundleNameCharCount.setVisibility(false);
    this.view.flxAddConfigurationBundles.setVisibility(false);
    if(this.allBundles.length > 0) {
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      scopeObj.view.flxNoConfigurationBundles.setVisibility(false);
      scopeObj.view.flxViewConfigurationBundles.setVisibility(true);
    }
    else {
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      scopeObj.view.flxViewConfigurationBundles.setVisibility(false);
      scopeObj.view.flxNoConfigurationBundles.setVisibility(true);
    }
  },

  openAddBundlesAndConfigurationPage : function() {
    this.bundleAddMode = true;
    this.bundleEditMode = false;
    this.activeConfigurations = [];
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleAddConfigurationBundle");
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxViewConfigurationBundles.setVisibility(false);
    this.view.flxNoConfigurationBundles.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxConfigurationSearchContainer.setVisibility(false);
    this.view.flxNoBundleNameError.setVisibility(false);
    this.view.flxNoAppIdError.setVisibility(false);
    this.view.txtBundleName.skin="skntbxConfigurationBundlesNormal";
    this.view.txtAppId.skin="skntbxConfigurationBundlesNormal";
    this.view.flxBundleNameCharCount.setVisibility(false);
    this.view.flxAddConfigurationBundles.setVisibility(true);
    this.view.flxConfigurationData.setVisibility(false);
    this.view.flxConfigurationEmpty.setVisibility(true);
    this.view.lblConfigurationEmpty.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.clickOnConfigurationMessage");

    this.view.lblFonticonBundleEdit.setVisibility(false);
    this.view.lblBundleNameHeader.skin = "sknlblConfigurationBundlesNormal";
    this.view.lblAppIdHeader.skin = "sknlblConfigurationBundlesNormal";
    this.view.flxConfigDetailsSeparatorH.setVisibility(false);
    this.view.flxConfigDetailsSeparatorV.setVisibility(false);
    this.view.lblBundleName.setVisibility(false);
    this.view.txtBundleName.setVisibility(true);
    this.view.txtBundleName.text = "";
    this.view.lblAppId.setVisibility(false);
    this.view.txtAppId.setVisibility(true);
    this.view.txtAppId.text = "";

    this.view.configurationData.segConfiguration.removeAll();
    this.view.flxAddConfigurationPopUp.setVisibility(false);
    this.view.txtAddConfigurationKey.text = "";
    this.view.txtAreaAddConfigurationValue.text = "";
    this.view.txtAreaAddConfigurationDescription.text = "";

    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleAddConfigurationBundle");
    this.view.flxAddConfigurationBundlesBody.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 20) + "px";
    this.view.flxAddConfiguration.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 20 - 20) + "px";
    this.view.configurationData.flxTableView.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 40 - 20 - 20) + "px";

    this.view.btnConfigurationBundlesAdd.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonAdd");
    this.view.flxAddConfigurationBundlesButtons.setVisibility(true);
    this.view.forceLayout();
  },

  openEditBundlesAndConfigurationPage : function() {
    var scopeObj = this;

    scopeObj.bundleAddMode = false;
    scopeObj.bundleEditMode = true;
    scopeObj.view.lblFonticonBundleEdit.setVisibility(false);
    scopeObj.view.lblBundleNameHeader.skin = "sknlblConfigurationBundlesNormal";
    scopeObj.view.lblAppIdHeader.skin = "sknlblConfigurationBundlesNormal";
    scopeObj.view.flxConfigDetailsSeparatorH.setVisibility(false);
    scopeObj.view.flxConfigDetailsSeparatorV.setVisibility(false);
    scopeObj.view.lblBundleName.setVisibility(false);
    scopeObj.view.txtBundleName.setVisibility(true);
    scopeObj.view.txtBundleName.text = this.activeBundle.bundleName;
    scopeObj.view.lblAppId.setVisibility(false);
    scopeObj.view.txtAppId.setVisibility(true);
    scopeObj.view.txtAppId.text = this.activeBundle.appId;

    scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleEditConfigurationBundle");
    scopeObj.view.flxAddConfigurationBundlesBody.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 20) + "px";
    scopeObj.view.flxAddConfiguration.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 20 - 20) + "px";
    scopeObj.view.configurationData.flxTableView.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 40 - 20 - 20) + "px";
    scopeObj.view.btnConfigurationBundlesAdd.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");
    scopeObj.view.flxAddConfigurationBundlesButtons.setVisibility(true);
    scopeObj.view.forceLayout();
  },

  openAddConfigurationPopUp : function() {
    this.view.txtAddConfigurationKey.text = "";
    this.view.txtAreaAddConfigurationValue.text = "";
    this.view.txtAreaAddConfigurationDescription.text = "";
    this.view.flxNoKeyError.setVisibility(false);
    this.view.txtAddConfigurationKey.skin="skntbxConfigurationBundlesNormal";
    this.view.flxNoValueError.setVisibility(false);
    this.view.txtAreaAddConfigurationValue.skin="skntbxAreaConfigurationBundlesNormal";
    this.view.flxNoDescriptionError.setVisibility(false);
    this.view.txtAreaAddConfigurationDescription.skin="skntbxAreaConfigurationBundlesNormal";
    this.view.flxDescriptionCharCount.setVisibility(false);
    this.view.btnAddConfigurationPopUpAdd.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonAdd");
    this.view.flxAddConfigurationPopUp.setVisibility(true);
  },
  
  getKeyByValue: function(object, value) {
    var returnKey = function(key) {
      return object[key] === value ? true : false;
    };
    return Object.keys(object).find(returnKey);
  },

  openEditConfigurationPopUp : function() {
    var scopeObj = this;

    scopeObj.configurationEditMode = true;
    scopeObj.view.txtAddConfigurationKey.text = scopeObj.activeConfiguration.key;
    scopeObj.view.txtAreaAddConfigurationValue.text = scopeObj.activeConfiguration.value;
    scopeObj.view.lbxAddConfigurationType.selectedKey = scopeObj.activeConfiguration.type;
    scopeObj.toggleButtonsUtilFunction([scopeObj.view.btnToggleClient,scopeObj.view.btnToggleServer],scopeObj.activeConfiguration.target === "CLIENT"? 1 : 2);
    scopeObj.view.txtAreaAddConfigurationDescription.text = scopeObj.activeConfiguration.description;
    scopeObj.view.lblConfigurationId.text = scopeObj.activeConfiguration.configurationId;
    scopeObj.view.contextualMenu1.setVisibility(false);
    scopeObj.view.flxNoKeyError.setVisibility(false);
    scopeObj.view.txtAddConfigurationKey.skin="skntbxConfigurationBundlesNormal";
    scopeObj.view.flxNoValueError.setVisibility(false);
    scopeObj.view.txtAreaAddConfigurationValue.skin="skntbxAreaConfigurationBundlesNormal";
    scopeObj.view.flxNoDescriptionError.setVisibility(false);
    scopeObj.view.txtAreaAddConfigurationDescription.skin="skntbxAreaConfigurationBundlesNormal";
    scopeObj.view.btnAddConfigurationPopUpAdd.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");
    scopeObj.view.flxAddConfigurationPopUp.setVisibility(true);
  },

  closeConfigurationPopUp : function() {
    this.view.flxAddConfigurationPopUp.setVisibility(false);
  },

  openDeleteBundlePopUp : function() {
    var scopeObj = this;

    scopeObj.bundleDeleteMode = true;
    scopeObj.view.popUpDelete.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.deleteBundleHeader");
    scopeObj.view.popUpDelete.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.deleteBundleBody");
    scopeObj.view.flxDeleteBundleOrConfiguration.setVisibility(true);
  },

  openDeleteConfigurationPopUp : function() {
    var scopeObj = this;

    scopeObj.configurationDeleteMode = true;
    scopeObj.view.popUpDelete.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.deleteConfigurationHeader");
    scopeObj.view.popUpDelete.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.deleteConfigurationBody");
    scopeObj.view.flxDeleteBundleOrConfiguration.setVisibility(true);
  },
  // --> UI screen management functions <--

  // --> Backend response management functions <--
  fetchAllBundlesAndConfigurationsResponse : function(status, bundles, configurations) {
    var scopeObj = this;

    if(status === "success") {
      scopeObj.allBundles = bundles;
      scopeObj.allConfigurations = configurations;
      scopeObj.bundleAddMode = false;
      scopeObj.bundleEditMode = false;
      scopeObj.bundleDeleteMode = false;
      scopeObj.activeBundle = {
        "bundleId" : "",
        "bundleName" : "",
        "appId" : ""
      };
      scopeObj.activeConfiguration = {
        "segmentIndex" : "",
        "configurationId" : "",
        "key" : "",
        "value" : "",
        "type" : "",
        "target" : "",
        "description" : ""
      };
      scopeObj.activeConfigurations = [];

      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleConfigurationBundle");
      scopeObj.view.mainHeader.btnAddNewOption.setVisibility(true);
      scopeObj.view.flxBreadcrumb.setVisibility(false);
      scopeObj.view.mainHeader.btnAddNewOption.setVisibility(true);
      scopeObj.view.flxAddConfigurationBundles.setVisibility(false);

      if(bundles.length > 0) {
        scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
        scopeObj.view.flxNoConfigurationBundles.setVisibility(false);
        scopeObj.view.flxViewConfigurationBundles.setVisibility(true);
        scopeObj.setBundles(bundles, "bundleName");
      }
      else {
        scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
        scopeObj.view.flxViewConfigurationBundles.setVisibility(false);
        scopeObj.view.flxNoConfigurationBundles.setVisibility(true);
      }
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageFetchBundleAndConfigurationFailure"), scopeObj);
    }

    this.view.forceLayout();
  },

  fetchConfigurationsResponse : function(status, configurations) {
    var scopeObj = this;

    if(status === "success") {
      scopeObj.activeConfigurations = configurations;
      scopeObj.activeConfiguration = {
        "segmentIndex" : "",
        "configurationId" : "",
        "key" : "",
        "value" : "",
        "type" : "",
        "target" : "",
        "description" : ""
      };
      scopeObj.view.mainHeader.btnAddNewOption.setVisibility(false);
      scopeObj.view.flxBreadcrumb.setVisibility(true);
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = scopeObj.activeBundle.bundleName;
      scopeObj.view.mainHeader.btnAddNewOption.setVisibility(false);
      scopeObj.view.flxConfigurationSearchContainer.setVisibility(true);
      scopeObj.view.contextualMenu1.setVisibility(false);
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      scopeObj.view.flxNoConfigurationBundles.setVisibility(false);
      scopeObj.view.flxViewConfigurationBundles.setVisibility(false);
      scopeObj.view.flxNoBundleNameError.setVisibility(false);
      scopeObj.view.flxNoAppIdError.setVisibility(false);
      scopeObj.view.txtBundleName.skin="skntbxConfigurationBundlesNormal";
      scopeObj.view.txtAppId.skin="skntbxConfigurationBundlesNormal";
      scopeObj.view.flxBundleNameCharCount.setVisibility(false);
      scopeObj.view.flxAddConfigurationBundles.setVisibility(true);
      scopeObj.view.flxClearSearchImage.setVisibility(false);
      scopeObj.view.tbxConfigurationSearchBox.text = "";
      scopeObj.resetSortIcons();

      if(scopeObj.bundleEditMode) {
        scopeObj.view.lblBundleNameHeader.skin = "sknlblConfigurationBundlesNormal";
        scopeObj.view.lblAppIdHeader.skin = "sknlblConfigurationBundlesNormal";
        scopeObj.view.flxConfigDetailsSeparatorH.setVisibility(false);
        scopeObj.view.flxConfigDetailsSeparatorV.setVisibility(false);
        scopeObj.view.lblBundleName.setVisibility(false);
        scopeObj.view.lblBundleName.text = scopeObj.activeBundle.bundleName;
        scopeObj.view.txtBundleName.text = scopeObj.activeBundle.bundleName;
        scopeObj.view.txtBundleName.setVisibility(true);
        scopeObj.view.lblAppId.setVisibility(false);
        scopeObj.view.lblAppId.text = scopeObj.activeBundle.appId;
        scopeObj.view.txtAppId.text = scopeObj.activeBundle.appId;
        scopeObj.view.txtAppId.setVisibility(true);
        scopeObj.view.lblFonticonBundleEdit.setVisibility(false);
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleEditConfigurationBundle");
        scopeObj.view.flxAddConfigurationBundlesBody.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 20) + "px";
        scopeObj.view.flxAddConfiguration.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 20 - 20) + "px";
        scopeObj.view.configurationData.flxTableView.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 40 - 20 - 20) + "px";
        scopeObj.view.btnConfigurationBundlesAdd.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");
        scopeObj.view.flxAddConfigurationBundlesButtons.setVisibility(true);
        scopeObj.view.forceLayout();
      }
      else {
        scopeObj.view.lblBundleNameHeader.skin = "sknlblConfigurationBundlesNormalViewMode";
        scopeObj.view.lblAppIdHeader.skin = "sknlblConfigurationBundlesNormalViewMode";
        scopeObj.view.flxConfigDetailsSeparatorH.setVisibility(true);
        scopeObj.view.flxConfigDetailsSeparatorV.setVisibility(true);
        scopeObj.view.txtBundleName.setVisibility(false);
        scopeObj.view.txtBundleName.text = scopeObj.activeBundle.bundleName;
        scopeObj.view.lblBundleName.text = scopeObj.activeBundle.bundleName;
        scopeObj.view.lblBundleName.setVisibility(true);
        scopeObj.view.txtAppId.setVisibility(false);
        scopeObj.view.txtAppId.text = scopeObj.activeBundle.appId;
        scopeObj.view.lblAppId.text = scopeObj.activeBundle.appId;
        scopeObj.view.lblAppId.setVisibility(true);
        scopeObj.view.lblFonticonBundleEdit.setVisibility(true);
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.titleViewConfigurationBundle");
        scopeObj.view.flxAddConfigurationBundlesButtons.setVisibility(false);
        scopeObj.view.flxAddConfigurationBundlesBody.height = (kony.os.deviceInfo().screenHeight - 136 - 20) + "px";
        scopeObj.view.flxAddConfiguration.height = (kony.os.deviceInfo().screenHeight - 136 - 180 - 20 - 20) + "px";
        scopeObj.view.configurationData.flxTableView.height = (kony.os.deviceInfo().screenHeight - 136 - 180 - 40 - 20 - 20) + "px";
        scopeObj.view.forceLayout();
      }

      scopeObj.setConfigurations(configurations);
      scopeObj.setFilterData();
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageFetchBundleAndConfigurationFailure"), scopeObj);
    }

    this.view.flxAddConfigurationPopUp.setVisibility(false);
    this.view.flxDeleteBundleOrConfiguration.setVisibility(false);
    this.view.flxPopUpWarning.setVisibility(false);
    this.view.forceLayout();
  },

  addBundleAndConfigurationsResponse : function(status) {
    var scopeObj = this;
    scopeObj.activeConfigurations = [];

    if(status === "success") {
      scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageAddBundleSuccess"), scopeObj);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageAddBundleFailure"), scopeObj);
    }

    this.presenter.fetchBundles();
  },

  editBundleAndConfigurationsResponse : function(status) {
    var scopeObj = this;
    scopeObj.activeConfigurations = [];

    if(status === "success") {
      scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageEditBundleSuccess"), scopeObj);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageEditBundleFailure"), scopeObj);
    }

    this.presenter.fetchBundles();
  },

  deleteBundleResponse : function(context) {
    var scopeObj = this;
    scopeObj.activeConfigurations = [];

    if(context.deleteBundleStatus === "success") {
      scopeObj.bundleDeleteMode = false;
      scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageDeleteBundleSuccess"), scopeObj);
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageDeleteBundleFailure"), scopeObj);
    }

    this.presenter.fetchBundles();
  },

  deleteConfigurationResponse : function(context) {
    var scopeObj = this;

    if(context.deleteConfigurationStatus === "success") {
      scopeObj.configurationDeleteMode = false;

      for(var i=0; i<scopeObj.allConfigurations.length; ++i) {
        if(scopeObj.allConfigurations[i].configurationId === context.configurationId) {
          scopeObj.allConfigurations.splice(i, 1);
          break;
        }
      }

      for(var j=0; j<scopeObj.activeConfigurations.length; ++j) {
        if(scopeObj.activeConfigurations[j].configurationId === context.configurationId) {
          scopeObj.activeConfigurations.splice(j, 1);
          break;
        }
      }

      scopeObj.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageDeleteConfigurationSuccess"), scopeObj);
      scopeObj.view.configurationData.segConfiguration.removeAt(scopeObj.activeConfiguration.segmentIndex);
      scopeObj.setFilterData();
    }
    else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.ConfigurationBundles.toastMessageDeleteConfigurationFailure"), scopeObj);
    }
  },
  // --> Backend response management functions <--

  // --> Data setting functions <--
  setBundles: function(bundles, sortBy) {
    var scopeObj = this;

    bundles = scopeObj.sortBundles(bundles, sortBy);

    var flxWidth = (((kony.os.deviceInfo().screenWidth - 305 - 70)/2) - 10) + "px";
    var leftOffset = (((kony.os.deviceInfo().screenWidth - 305 - 70)/2) + 10) + "px";
    scopeObj.view.flxViewConfigurationBundleEntries.removeAll();

    if (bundles && bundles.length > 0) {
      var count = 0;
      var noOfRows = Math.ceil(bundles.length / 2);
      var top = 0;

      for (var i = 0; i < noOfRows; i++) {
        var noOfColumns = (count == bundles.length-1) ? 1 : 2;

        for (var j = 0; j < noOfColumns; j++) {
          var bundleToAdd = new com.adminConsole.configurationBundle.bundleData({
            "autogrowMode" : kony.flex.AUTOGROW_NONE,
            "clipBounds" : true,
            "id" : "bundle" + count,
            "isVisible" : true,
            "layoutType" : kony.flex.FREE_FORM,
            "masterType" : constants.MASTER_TYPE_DEFAULT,
            "skin" : "sknflxConfigurationBundlesWithBorder",
            "width" : flxWidth,
            "top" : top + "px",
            "left" : j === 0 ? "0px" : leftOffset
          }, {}, {});

          bundleToAdd.lblBundleName.text = bundles[count].bundleName;
          bundleToAdd.lblAppId.text = bundles[count].bundleAppId;
          bundleToAdd.bundleId = bundles[count].bundleId;
          this.setOnBundleClick(bundleToAdd);
          this.setOnBundleClickEdit(bundleToAdd);
          this.setOnBundleClickDelete(bundleToAdd);

          scopeObj.view.flxViewConfigurationBundleEntries.add(bundleToAdd);
          scopeObj.view.flxNoBundleFound.setVisibility(false);
          scopeObj.view.flxViewConfigurationBundleBodyScroll.setVisibility(true);
          ++count;
        }
        top = top + 100;
      }
    }
    else {
      scopeObj.view.flxViewConfigurationBundleBodyScroll.setVisibility(false);
      scopeObj.view.flxNoBundleFound.setVisibility(true);
    }

    this.view.forceLayout();
  },

  sortBundles : function(bundles, sortByColumn) {
    var scopeObj = this;

    scopeObj.sortBy = this.getObjectSorter(sortByColumn);
    return bundles.sort(scopeObj.sortBy.sortData);
  },

  setOnBundleClick : function(bundleToAdd) {
    var scopeObj = this;

    bundleToAdd.onClick = function() {
      scopeObj.activeBundle.bundleId = bundleToAdd.bundleId;
      scopeObj.activeBundle.bundleName = bundleToAdd.lblBundleName.text;
      scopeObj.activeBundle.appId = bundleToAdd.lblAppId.text;

      var bundleIdJSON = {
        "bundleId" : bundleToAdd.bundleId
      };
      scopeObj.bundleEditMode = false;
      scopeObj.presenter.fetchConfigurations(bundleIdJSON);
    };
  },

  setOnBundleClickEdit : function(bundleToAdd) {
    var scopeObj = this;

    bundleToAdd.flxBundleEdit.onClick = function() {
      scopeObj.activeBundle.bundleId = bundleToAdd.bundleId;
      scopeObj.activeBundle.bundleName = bundleToAdd.lblBundleName.text;
      scopeObj.activeBundle.appId = bundleToAdd.lblAppId.text;

      var bundleIdJSON = {
        "bundleId" : bundleToAdd.bundleId
      };
      scopeObj.bundleEditMode = true;
      scopeObj.presenter.fetchConfigurations(bundleIdJSON);
    };
  },

  setOnBundleClickDelete : function(bundleToAdd) {
    var scopeObj = this;

    bundleToAdd.flxBundleDelete.onClick = function() {
      scopeObj.activeBundle.bundleId = bundleToAdd.bundleId;
      scopeObj.activeBundle.bundleName = bundleToAdd.lblBundleName.text;
      scopeObj.activeBundle.appId = bundleToAdd.lblAppId.text;
      scopeObj.openDeleteBundlePopUp();
    };
  },

  setConfigurations: function(configurations) {
    this.view.configurationData.segConfiguration.removeAll();

    var configurationSegmentData = configurations.map(this.mappingConfigurationsData);
    this.setConfigurationSegmentData(configurationSegmentData);
  },

  mappingConfigurationsData : function(data) {
    var scopeObj = this;

    var configurationKey = data.configurationKey || data.lblConfigurationKey.text;
    var configurationKeyTooltip = data.configurationKey || data.lblConfigurationKey.text;

    var configurationValue = data.configurationValue || data.lblConfigurationValue.text;
    var configurationValueTooltip = data.configurationValue || data.lblConfigurationValue.text;

    if(configurationKey.length > 15) {
      configurationKey = configurationKey.substring(0, 15) + "...";
    }
    if(configurationValue.length > 15) {
      configurationValue = configurationValue.substring(0, 15) + "...";
    }

    return {
      "isNewlyAdded":"",
      "configurationId" : data.configurationId,
      "fonticonArrow" : {
        "text" : "\ue922",
        "skin" : "sknfontIconDescRightArrow14px"
      },
      "lblConfigurationKey" : {
        "text" : configurationKey,
        "tooltip" : configurationKey === configurationKeyTooltip? "" : configurationKeyTooltip
      },
      "lblConfigurationValue" : {
        "text" : configurationValue,
        "tooltip" : configurationValue === configurationValueTooltip? "" : configurationValueTooltip
      },
      "lblConfigurationDescription" : {
        "text" : data.configurationDescription || data.lblConfigurationDescription.text
      },
      "lblConfigurationType" : {
        "text" : scopeObj.configurationType[data.configurationType] || data.lblConfigurationType.text
      },
      "lblConfigurationTarget" : {
        "text" : data.configurationTarget || data.lblConfigurationTarget.text
      },
      "lblConfigurationDescriptionHeader" : {
        "text" : kony.i18n.getLocalizedString("i18n.ConfigurationBundles.descriptionInCaps"),
      },
      "flxArrow" : {
        "onClick": function() {
          scopeObj.configurationRowClick();
        }
      },
      "flxOptions": {
        "onClick": function() {
          scopeObj.toggleContextualMenu(50);
        }
      },
      "lblIconOptions" : {
        "text" : "",
        "skin" : "sknFontIconOptionMenu"
      },
      "lblConfigSeparator" : {
        "skin" : "sknConfigSeparator"
      }
    };
  },

  setConfigurationSegmentData : function(data) {
    var scopeObj = this;

    if(data.length === 0) {
      if(scopeObj.view.tbxConfigurationSearchBox.text !== "") {
        scopeObj.view.configurationData.flxTableView.setVisibility(false);
        scopeObj.view.rtxNoResultsFound.setVisibility(true);
        scopeObj.view.flxConfigurationEmpty.setVisibility(false);
        scopeObj.view.flxConfigurationData.setVisibility(true);
      }
      else {
        scopeObj.view.flxConfigurationData.setVisibility(false);
        scopeObj.view.flxConfigurationEmpty.setVisibility(true);
      }
    }
    else {
      scopeObj.view.rtxNoResultsFound.setVisibility(false);
      scopeObj.view.configurationData.flxTableView.setVisibility(true);
      scopeObj.view.flxConfigurationEmpty.setVisibility(false);
      scopeObj.view.flxConfigurationData.setVisibility(true);

      var dataMap = {
        "fonticonArrow" : "fonticonArrow",
        "configurationId" : "configurationId",
        "lblConfigurationKey" : "lblConfigurationKey",
        "lblConfigurationValue" : "lblConfigurationValue",
        "lblConfigurationType" : "lblConfigurationType",
        "lblConfigurationTarget" : "lblConfigurationTarget",
        "lblConfigurationDescription" : "lblConfigurationDescription",
        "lblConfigurationDescriptionHeader" : "lblConfigurationDescriptionHeader",
        "flxConfigurationArrow" : "flxConfigurationArrow",
        "flxOptions" : "flxOptions",
        "lblIconOptions" : "lblIconOptions",
        "lblConfigSeparator" : "lblConfigSeparator",
        "isNewlyAdded":"isNewlyAdded"
      };

      scopeObj.view.configurationData.segConfiguration.widgetDataMap = dataMap;
      scopeObj.view.configurationData.segConfiguration.setData(data);
      scopeObj.view.configurationData.flxTableView.setVisibility(true);
    }

    document.getElementById("frmConfigurationBundles_configurationData_segConfiguration").onscroll = this.contextualMenuOff;
    this.view.forceLayout();
  },

  contextualMenuOff: function(context) {
    var scopeObj = this;
    scopeObj.view.contextualMenu1.setVisibility(false);
    scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
    this.view.forceLayout();
  },

  toggleContextualMenu: function() {
    var scopeObj = this;

    var index = scopeObj.view.configurationData.segConfiguration.selectedRowIndex[1];
    scopeObj.optionButtonStateChange(index, true);

    var templateArray = this.view.configurationData.segConfiguration.clonedTemplates;
    var height = 0;
    for(var i = 0; i < index; i++){
      if(templateArray[i].flxConfiguration) {
        height += templateArray[i].flxConfiguration.frame.height;
      }
      else if(templateArray[i].flxConfigurationWithDescription) {
        height += templateArray[i].flxConfigurationWithDescription.frame.height;
      }
    }

    var segmentWidget = this.view.configurationData.segConfiguration;
    var contextualWidget = this.view.contextualMenu1;
    height = (height + 40) - segmentWidget.contentOffsetMeasured.y;
    if(height + contextualWidget.frame.height > segmentWidget.frame.height) {
      height = height - contextualWidget.frame.height - 32;
      scopeObj.view.contextualMenu1.flxUpArrowImage.setVisibility(false);
      scopeObj.view.contextualMenu1.flxDownArrowImage.setVisibility(true);
      scopeObj.view.contextualMenu1.contextualMenu1Inner.top = "0px";
    }
    else {
      scopeObj.view.contextualMenu1.flxUpArrowImage.setVisibility(true);
      scopeObj.view.contextualMenu1.flxDownArrowImage.setVisibility(false);
      scopeObj.view.contextualMenu1.contextualMenu1Inner.top = "-1px";
    }
    height = height + 40 + "px";

    if ((this.view.contextualMenu1.isVisible === false) ||
        (this.view.contextualMenu1.isVisible === true && scopeObj.view.contextualMenu1.top !== height)) {

      var selectedConfiguration = scopeObj.view.configurationData.segConfiguration.data[index];

      scopeObj.activeConfiguration = {
        "segmentIndex" : index,
        "configurationId" : selectedConfiguration.configurationId,
        "key" : selectedConfiguration.lblConfigurationKey.tooltip !== ""? selectedConfiguration.lblConfigurationKey.tooltip : selectedConfiguration.lblConfigurationKey.text,
        "value" : selectedConfiguration.lblConfigurationValue.tooltip !== ""? selectedConfiguration.lblConfigurationValue.tooltip : selectedConfiguration.lblConfigurationValue.text,
        "type" : scopeObj.getKeyByValue(scopeObj.configurationType, selectedConfiguration.lblConfigurationType.text),
        "target" : selectedConfiguration.lblConfigurationTarget.text,
        "description" : selectedConfiguration.lblConfigurationDescription.text,
      };

      scopeObj.view.contextualMenu1.top = height;
      scopeObj.view.contextualMenu1.setVisibility(true);
      scopeObj.view.contextualMenu1.onHover = scopeObj.onHoverEventCallback;
    }
    else {
      scopeObj.view.contextualMenu1.setVisibility(false);
    }

    this.view.forceLayout();
  },

  optionButtonStateChange : function(selectedIndex, condition) {
    var scopeObj = this;
    var data = scopeObj.view.configurationData.segConfiguration.data;

    if(scopeObj.prevIndex != -1 && (scopeObj.prevIndex < data.length)) {
      var tempDataPrev = data[scopeObj.prevIndex];
      tempDataPrev.flxOptions.skin = "slFbox";
      scopeObj.view.configurationData.segConfiguration.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    tempDataCurrent.flxOptions.skin = condition === true ? "sknflxffffffop100Border424242Radius100px" : "slFbox";

    scopeObj.view.configurationData.segConfiguration.setDataAt(tempDataCurrent, selectedIndex, 0);
    scopeObj.prevIndex = selectedIndex;
  },

  setNewConfigurationToSegment : function() {
    var scopeObj = this;
    var noErrors = scopeObj.validateNewConfiguration();

    var configurationKey = scopeObj.view.txtAddConfigurationKey.text;
    var configurationKeyTooltip = scopeObj.view.txtAddConfigurationKey.text;

    var configurationValue = scopeObj.view.txtAreaAddConfigurationValue.text;
    var configurationValueTooltip = scopeObj.view.txtAreaAddConfigurationValue.text;

    if(configurationKey.length > 15) {
      configurationKey = configurationKey.substring(0, 15) + "...";
    }
    if(configurationValue.length > 15) {
      configurationValue = configurationValue.substring(0, 15) + "...";
    }

    if(noErrors === true) {
      var data = {
        "isNewlyAdded":"",
        "configurationId" : "",
        "fonticonArrow" : {
          "text" : "\ue922",
          "skin" : "sknfontIconDescRightArrow14px"
        },
        "lblConfigurationKey" : {
          "text" : configurationKey,
          "tooltip" : configurationKey === configurationKeyTooltip? "" : configurationKeyTooltip
        },
        "lblConfigurationValue" : {
          "text" : configurationValue,
          "tooltip" : configurationValue === configurationValueTooltip? "" : configurationValueTooltip
        },
        "lblConfigurationType" : {
          "text" : scopeObj.configurationType[scopeObj.view.lbxAddConfigurationType.selectedKey]
        },
        "lblConfigurationTarget" : {
          "text" : scopeObj.clientServerToggle? "CLIENT" : "SERVER"
        },
        "lblConfigurationDescription" : {
          "text" : scopeObj.view.txtAreaAddConfigurationDescription.text
        },
        "lblConfigurationDescriptionHeader" : {
          "text" : kony.i18n.getLocalizedString("i18n.ConfigurationBundles.descriptionInCaps"),
        },
        "flxArrow" : {
          "onClick": function() {
            scopeObj.configurationRowClick();
          }
        },
        "flxOptions": {
          "onClick": function() {
            scopeObj.toggleContextualMenu();
          },
          "skin" : "slFbox",
        },
        "lblIconOptions" : {
          "text" : "",
          "skin" : "sknFontIconOptionMenu"
        },
        "lblConfigSeparator" : {
          "skin" : "sknConfigSeparator"
        }
      };

      var configuration = {
        "configurationKey" : scopeObj.view.txtAddConfigurationKey.text,
        "configurationValue" : scopeObj.view.txtAreaAddConfigurationValue.text,
        "configurationDescription" : scopeObj.view.txtAreaAddConfigurationDescription.text,
        "configurationType" : scopeObj.view.lbxAddConfigurationType.selectedKey,
        "configurationTarget" : scopeObj.clientServerToggle? "CLIENT" : "SERVER"
      };

      if(scopeObj.configurationEditMode) {
        scopeObj.configurationEditMode = false;
        //set status based on newly added or already existing record
        var currSelRowData = scopeObj.view.configurationData.segConfiguration.data[scopeObj.activeConfiguration.segmentIndex];
        configuration.configurationStatus = currSelRowData.isNewlyAdded === true ? "CREATE":"UPDATE";
        configuration.configurationId = scopeObj.view.lblConfigurationId.text;
        scopeObj.view.configurationData.segConfiguration.setDataAt(data, scopeObj.activeConfiguration.segmentIndex);
        //remove the previous data for selected record
        for (var j = 0; j < scopeObj.activeConfigurations.length; ++j) {
          if (scopeObj.activeConfigurations[j].configurationId === configuration.configurationId) {
            scopeObj.activeConfigurations.splice(j, 1);
            break;
          }
        }
      }
      else {
        data.isNewlyAdded = true;
        //adding a temp config id for newly added record,later removed while sending in request param
        var tempConfigId =new Date().getTime();
        data.configurationId = tempConfigId+"";
        configuration.configurationId = tempConfigId+"";
        configuration.configurationStatus = "CREATE";
        var currentConfigurationData = scopeObj.view.configurationData.segConfiguration.data;
        currentConfigurationData.unshift(data);
        scopeObj.view.configurationData.segConfiguration.setData(currentConfigurationData);
      }

      scopeObj.activeConfigurations.push(configuration);

      scopeObj.view.flxAddConfigurationBundlesBody.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 20) + "px";
      scopeObj.view.flxAddConfiguration.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 20 - 20) + "px";
      scopeObj.view.configurationData.flxTableView.height = (kony.os.deviceInfo().screenHeight - 136 - 81 - 180 - 40 - 20 - 20) + "px";
      scopeObj.view.btnConfigurationBundlesAdd.text = scopeObj.bundleAddMode ? 
        kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonAdd") : kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");
      scopeObj.view.flxAddConfigurationBundlesButtons.setVisibility(true);

      scopeObj.view.flxAddConfigurationPopUp.setVisibility(false);
      scopeObj.view.flxConfigurationEmpty.setVisibility(false);
      scopeObj.view.rtxNoResultsFound.setVisibility(false);
      scopeObj.view.configurationData.flxTableView.setVisibility(true);
      scopeObj.view.flxConfigurationData.setVisibility(true);

      scopeObj.resetSortIcons();
      scopeObj.view.tbxConfigurationSearchBox.text = "";
      scopeObj.setFilterData();

      scopeObj.view.forceLayout();
    }
  },

  validateNewConfiguration : function() {
    var scopeObj = this;
    var noErrors = true;

    var configKeyExists = false;
    for(var i=0; i<scopeObj.allConfigurations.length; ++i) {
      if(scopeObj.allConfigurations[i].configurationKey.toUpperCase() === this.view.txtAddConfigurationKey.text.toUpperCase()) {
        configKeyExists = true;
        break;
      }
    }

    if(this.view.txtAddConfigurationKey.text === "") {
      noErrors = false;
      scopeObj.view.flxNoKeyError.setVisibility(true);
      scopeObj.view.txtAddConfigurationKey.skin="skinredbg";
      scopeObj.view.lblNoKeyError.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.enterKey");
    }
    else if(configKeyExists && !scopeObj.configurationEditMode) {
      noErrors = false;
      scopeObj.view.flxNoKeyError.setVisibility(true);
      scopeObj.view.txtAddConfigurationKey.skin="skinredbg";
      scopeObj.view.lblNoKeyError.text = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.keyAlreadyExists");
    }

    if(this.view.txtAreaAddConfigurationValue.text === "") {
      noErrors = false;
      scopeObj.view.flxNoValueError.setVisibility(true);
      scopeObj.view.txtAreaAddConfigurationValue.skin="sknTxtError";
    }
    if(this.view.txtAreaAddConfigurationDescription.text === "") {
      noErrors = false;
      scopeObj.view.flxNoDescriptionError.setVisibility(true);
      scopeObj.view.txtAreaAddConfigurationDescription.skin="sknTxtError";
    }

    return noErrors;
  },

  setFilterData : function() {
    var scopeObj = this;

    var activeConfigurations = scopeObj.activeConfigurations;
    var activeConfigurationsTypeList = [];
    var activeConfigurationsTargetList = [];

    for (var i1 = 0; i1 < activeConfigurations.length; i1++) {
      if (!activeConfigurationsTypeList.contains(scopeObj.configurationType[activeConfigurations[i1].configurationType])) {
        activeConfigurationsTypeList.push(scopeObj.configurationType[activeConfigurations[i1].configurationType]);
      }
      if (!activeConfigurationsTargetList.contains(activeConfigurations[i1].configurationTarget)) {
        activeConfigurationsTargetList.push(activeConfigurations[i1].configurationTarget);
      }
    }

    var segmentConfigurations = scopeObj.view.configurationData.segConfiguration.data;
    var segmentConfigurationsTypeList = [];
    var segmentConfigurationsTargetList = [];

    for (var i2 = 0; i2 < segmentConfigurations.length; i2++) {
      if (!segmentConfigurationsTypeList.contains(segmentConfigurations[i2].lblConfigurationType.text)) {
        segmentConfigurationsTypeList.push(segmentConfigurations[i2].lblConfigurationType.text);
      }
      if (!segmentConfigurationsTargetList.contains(segmentConfigurations[i2].lblConfigurationTarget.text)) {
        segmentConfigurationsTargetList.push(segmentConfigurations[i2].lblConfigurationTarget.text);
      }
    }

    scopeObj.typeFilterIndiciesArray = [];
    for(var j1 = 0; j1 < segmentConfigurationsTypeList.length; ++j1) {
      scopeObj.typeFilterIndiciesArray.push(activeConfigurationsTypeList.indexOf(segmentConfigurationsTypeList[j1]));
    }

    scopeObj.targetFilterIndiciesArray = [];
    for(var j2 = 0; j2 < segmentConfigurationsTargetList.length; ++j2) {
      scopeObj.targetFilterIndiciesArray.push(activeConfigurationsTargetList.indexOf(segmentConfigurationsTargetList[j2]));
    }

    var widgetMap = {
      flxSearchDropDown: "flxSearchDropDown",
      flxCheckBox: "flxCheckBox",
      imgCheckBox: "imgCheckBox",
      lblDescription: "lblDescription",
      id: "id"
    };

    this.view.configTypeFilterMenu.segStatusFilterDropdown.removeAll();
    this.view.configTypeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.configTypeFilterMenu.segStatusFilterDropdown.setData(activeConfigurationsTypeList.map(scopeObj.filterMapper));
    this.view.configTypeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, scopeObj.typeFilterIndiciesArray]];

    this.view.configTargetFilterMenu.segStatusFilterDropdown.removeAll();
    this.view.configTargetFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.configTargetFilterMenu.segStatusFilterDropdown.setData(activeConfigurationsTargetList.map(scopeObj.filterMapper));
    this.view.configTargetFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, this.targetFilterIndiciesArray]];
  },

  filterMapper : function(record) {
    return {
      flxSearchDropDown: "flxSearchDropDown",
      flxCheckBox: "flxCheckBox",
      id: "SID_ACTIVE",
      lblDescription: record,
      imgCheckBox: {
        src: "checkbox.png"
      }
    };
  },
  // --> Data setting functions <--

  // --> Backend request functions <--
  showExistingBundleAndConfigurations : function() {
    var scopeObj = this;

    for(var i=0; i<scopeObj.allBundles.length; ++i) {
      if(scopeObj.allBundles[i].bundle_id === scopeObj.view.lblPopUpBundleId.text) {
        scopeObj.activeBundle.bundleId = scopeObj.view.lblPopUpBundleId.text;
        scopeObj.activeBundle.bundleName = scopeObj.allBundles[i].bundle_name;
        scopeObj.activeBundle.appId = scopeObj.allBundles[i].app_id;
        break;
      }
    }

    var existingBundleJSON = {
      "bundleId" : scopeObj.view.lblPopUpBundleId.text
    };
    scopeObj.view.flxPopUpWarning.setVisibility(false);
    this.view.forceLayout();

    scopeObj.presenter.fetchConfigurations(existingBundleJSON);
  },

  addOrEditBundleAndConfigurations : function() {
    var scopeObj = this;
    var noErrors = true;

    if(this.view.txtBundleName.text === "") {
      noErrors = false;
      scopeObj.view.flxNoBundleNameError.setVisibility(true);
      scopeObj.view.txtBundleName.skin="skinredbg";
    }
    if(this.view.txtAppId.text === "") {
      noErrors = false;
      scopeObj.view.flxNoAppIdError.setVisibility(true);
      scopeObj.view.txtAppId.skin="skinredbg";
    }

    if(noErrors === true) {
      scopeObj.view.flxNoBundleNameError.setVisibility(false);
      scopeObj.view.flxNoAppIdError.setVisibility(false);
      scopeObj.view.txtBundleName.skin="skntbxConfigurationBundlesNormal";
      scopeObj.view.txtAppId.skin="skntbxConfigurationBundlesNormal";
      scopeObj.view.flxBundleNameCharCount.setVisibility(false);
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      scopeObj.view.flxAddConfigurationBundles.setVisibility(false);
      scopeObj.view.flxViewConfigurationBundles.setVisibility(true);
      //remove the 'configuration id' key for newly added records if any
      var activeConfigList = [];
      for(var i=0; i<scopeObj.activeConfigurations.length;i++){
        if(scopeObj.activeConfigurations[i].configurationStatus === "CREATE")
          delete scopeObj.activeConfigurations[i]["configurationId"];
        activeConfigList.push(scopeObj.activeConfigurations[i]);
      }
      var bundle = {};
      if(scopeObj.bundleAddMode) {
        bundle = {
          "bundleStatus" : "CREATE",
          "bundleName" : scopeObj.view.txtBundleName.text,
          "bundleAppId" : scopeObj.view.txtAppId.text,
          "configurations" : activeConfigList
        };

        scopeObj.presenter.addBundleAndConfigurations(bundle);
      }
      else if(scopeObj.bundleEditMode) {
        bundle = {
          "bundleStatus" : "UPDATE",
          "bundleId" : scopeObj.activeBundle.bundleId,
          "bundleName" : scopeObj.view.txtBundleName.text,
          "bundleAppId" : scopeObj.view.txtAppId.text,
          "configurations" : activeConfigList
        };

        scopeObj.presenter.editBundleAndConfigurations(bundle);
      }
      else if(scopeObj.activeConfigurations.length > 0) {
        bundle = {
          "bundleStatus" : "UPDATE",
          "bundleId" : scopeObj.activeBundle.bundleId,
          "configurations" : activeConfigList
        };

        scopeObj.presenter.editBundleAndConfigurations(bundle);
      }
    }

    this.view.forceLayout();
  },

  deleteBundleOrConfiguration : function() {
    var scopeObj = this;

    if(scopeObj.bundleDeleteMode) {
      scopeObj.deleteBundle();
    }
    else if(scopeObj.configurationDeleteMode) {
      scopeObj.deleteConfiguration();
    }

    scopeObj.view.flxDeleteBundleOrConfiguration.setVisibility(false);
    this.view.forceLayout();
  },

  deleteBundle : function() {
    var scopeObj = this;

    var idJSON = {
      "bundleId" : scopeObj.activeBundle.bundleId
    };
    scopeObj.presenter.deleteBundle(idJSON);
  },

  deleteConfiguration : function() {
    var scopeObj = this;

    var activeConfigurationId = scopeObj.activeConfiguration.configurationId;
    var configurationExistsAtBackend = false;

    for(var i=0; i<scopeObj.allConfigurations.length; ++i) {
      if(scopeObj.allConfigurations[i].configurationId === activeConfigurationId) {
        configurationExistsAtBackend = true;
        break;
      }
    }

    if(configurationExistsAtBackend) {
      var idJSON = {
        "configurationId" : activeConfigurationId
      };
      scopeObj.presenter.deleteConfiguration(idJSON);
    }
    else {
      for(var j=0; j<scopeObj.activeConfigurations.length; ++j) {
        if(scopeObj.activeConfigurations[j].configurationKey === scopeObj.activeConfiguration.key) {
          scopeObj.activeConfigurations.splice(j, 1);
          break;
        }
      }
      scopeObj.view.configurationData.segConfiguration.removeAt(scopeObj.activeConfiguration.segmentIndex);
    }
  },
  // --> Backend request functions <--

  // --> Event listener functions <--
  bundleNameEntered : function() {
    var scopeObj = this;

    if(scopeObj.view.txtBundleName.text !== "") {
      scopeObj.view.flxNoBundleNameError.setVisibility(false);
      scopeObj.view.txtBundleName.skin="skntbxConfigurationBundlesNormal";
      scopeObj.view.lblBundleNameCharCount.text = scopeObj.view.txtBundleName.text.length + "/100";
      scopeObj.view.flxBundleNameCharCount.setVisibility(true);
    }
    else {
      scopeObj.view.flxBundleNameCharCount.setVisibility(false);
    }

    var userBundleName = scopeObj.view.txtBundleName.text;
    var userBundleId = "";
    var bundleExists = false;

    for(var i=0; i<scopeObj.allBundles.length; ++i) {
      if(scopeObj.allBundles[i].bundle_name === userBundleName) {
        bundleExists = true;
        userBundleId = scopeObj.allBundles[i].bundle_id;
        break;
      }
    }

    if(bundleExists) {
      scopeObj.view.txtBundleName.text = "";
      scopeObj.view.btnBundleNameExistsClick.text = userBundleName;
      scopeObj.view.lblPopUpBundleId.text = userBundleId;
      scopeObj.view.flxPopUpWarning.setVisibility(true);
    }

    this.view.forceLayout();
  },

  appIdEntered : function() {
    var scopeObj = this;

    if(scopeObj.view.txtAppId.text !== "") {
      scopeObj.view.flxNoAppIdError.setVisibility(false);
      scopeObj.view.txtAppId.skin="skntbxConfigurationBundlesNormal";
    }
  },

  configurationKeyEntered : function() {
    var scopeObj = this;

    if(scopeObj.view.txtAddConfigurationKey.text !== "") {
      scopeObj.view.flxNoKeyError.setVisibility(false);
      scopeObj.view.txtAddConfigurationKey.skin="skntbxConfigurationBundlesNormal";
    }
  },

  configurationValueEntered : function() {
    var scopeObj = this;

    if(scopeObj.view.txtAreaAddConfigurationValue.text !== "") {
      scopeObj.view.flxNoValueError.setVisibility(false);
      scopeObj.view.txtAreaAddConfigurationValue.skin="skntbxAreaConfigurationBundlesNormal";
      scopeObj.view.flxValueCharCount.setVisibility(true);
      scopeObj.view.lblValueCharCount.text = scopeObj.view.txtAreaAddConfigurationValue.text.length + "/20000";
    }
    else {
      scopeObj.view.flxValueCharCount.setVisibility(false);
    }
    this.view.forceLayout();
  },

  configurationDescriptionEntered : function() {
    var scopeObj = this;

    if(scopeObj.view.txtAreaAddConfigurationDescription.text !== "") {
      scopeObj.view.flxNoDescriptionError.setVisibility(false);
      scopeObj.view.flxDescriptionCharCount.setVisibility(true);
      scopeObj.view.lblDescriptionCharCount.text = scopeObj.view.txtAreaAddConfigurationDescription.text.length + "/20000";
    }
    else {
      scopeObj.view.flxDescriptionCharCount.setVisibility(false);
    }

    this.view.forceLayout();
  },

  configurationRowClick : function() {
    var scopeObj = this;

    var index = scopeObj.view.configurationData.segConfiguration.selectedRowIndex[1];
    var data = scopeObj.view.configurationData.segConfiguration.data;

    for(var i=0; i<data.length; i++) {
      if(i === index && data[i].template !== "flxConfigurationWithDescription") {
        data[i].fonticonArrow.text = "\ue915";
        data[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
        data[i].template = "flxConfigurationWithDescription";
        scopeObj.view.configurationData.segConfiguration.setDataAt(data[i], i);
      }
      else {
        data[i].fonticonArrow.text = "\ue922";
        data[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
        data[i].template = "flxConfiguration";
        scopeObj.view.configurationData.segConfiguration.setDataAt(data[i], i);
      }
    }
  },

  bundleSearchBoxBeginEditing : function() {
    var scopeObj = this;
    scopeObj.view.flxSearchBundleContainer.skin ="sknflxConfigBundlesSearchFocus";
  },

  searchBundles : function() {
    var scopeObj = this;

    if(scopeObj.view.tbxBundleSearchBox.text !== "") {
      scopeObj.view.flxClearBundleSearchImage.setVisibility(true);

      var searchedBundles = scopeObj.allBundles.filter(scopeObj.filterSearchBundles);
      scopeObj.setBundles(searchedBundles, scopeObj.view.lbxBundleSortByOptions.selectedKey);
    }
    else {
      scopeObj.view.flxClearBundleSearchImage.setVisibility(false);
      scopeObj.setBundles(scopeObj.allBundles, scopeObj.view.lbxBundleSortByOptions.selectedKey);
    }
  },

  bundleSearchBoxEndEditing : function() {
    var scopeObj = this;
    scopeObj.view.flxSearchBundleContainer.skin = "sknflxConfigBundlesSearchNormal";
  },

  cancelSearchBundles : function() {
    var scopeObj = this;

    scopeObj.view.tbxBundleSearchBox.text = "";
    scopeObj.view.flxClearBundleSearchImage.setVisibility(false);
    scopeObj.view.flxSearchBundleContainer.skin = "sknflxConfigBundlesSearchNormal";
    scopeObj.setBundles(scopeObj.allBundles, scopeObj.view.lbxBundleSortByOptions.selectedKey);
  },

  filterSearchBundles : function(bundle) {
    var searchText = this.view.tbxBundleSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      return bundle.bundleName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || bundle.bundleAppId.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },

  configurationSearchBoxBeginEditing : function() {
    var scopeObj = this;
    scopeObj.view.flxConfigurationSearchContainer.skin ="sknflxConfigBundlesSearchFocus";
  },

  searchConfigurations : function() {
    var scopeObj = this;

    scopeObj.resetSortIcons();
    var configurationsFilteredByTypeAndTarget = scopeObj.getConfigurationsFilteredByTarget(scopeObj.getConfigurationsFilteredByType(scopeObj.activeConfigurations));

    if(scopeObj.view.tbxConfigurationSearchBox.text !== "") {
      scopeObj.view.flxClearSearchImage.setVisibility(true);
      scopeObj.setConfigurations(configurationsFilteredByTypeAndTarget.filter(scopeObj.filterConfigurationsBySearchCriteria));
    }
    else {
      scopeObj.view.flxClearSearchImage.setVisibility(false);
      scopeObj.setConfigurations(configurationsFilteredByTypeAndTarget);
    }
  },

  configurationSearchBoxEndEditing : function() {
    var scopeObj = this;
    scopeObj.view.flxConfigurationSearchContainer.skin = "sknflxConfigBundlesSearchNormal";
  },

  cancelSearchConfigurations : function() {
    var scopeObj = this;

    scopeObj.view.tbxConfigurationSearchBox.text = "";
    scopeObj.view.flxClearSearchImage.setVisibility(false);
    scopeObj.view.flxConfigurationSearchContainer.skin = "sknflxConfigBundlesSearchNormal";

    var configurationsFilteredByTypeAndTarget = scopeObj.getConfigurationsFilteredByTarget(scopeObj.getConfigurationsFilteredByType(scopeObj.activeConfigurations));
    scopeObj.setConfigurations(configurationsFilteredByTypeAndTarget);
  },

  filterConfigurationsBySearchCriteria : function(configuration) {
    var searchText = this.view.tbxConfigurationSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      if(configuration.lblConfigurationKey && configuration.lblConfigurationValue) {
        return configuration.lblConfigurationKey.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || 
          configuration.lblConfigurationValue.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      }
      else {
        return configuration.configurationKey.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || 
          configuration.configurationValue.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
      }
    } else {
      return true;
    }
  },

  sortConfigurationsByConfigKey : function() {
    var scopeObj = this;

    if(!scopeObj.sortConfigurationsBy) {
      scopeObj.sortConfigurationsBy = this.getObjectSorter("lblConfigurationKey.text");
    } else {
      scopeObj.sortConfigurationsBy.column('lblConfigurationKey.text');
    }

    var sortedConfigurations =  scopeObj.view.configurationData.segConfiguration.data.sort(scopeObj.sortConfigurationsBy.sortData);

    if(scopeObj.view.configurationData.fonticonConfigurationKeySort.text === "\ue92b" || scopeObj.view.configurationData.fonticonConfigurationKeySort.text === "\ue920") {
      scopeObj.view.configurationData.fonticonConfigurationKeySort.text = "\ue92a";
    }
    else if(scopeObj.view.configurationData.fonticonConfigurationKeySort.text === "\ue92a") {
      scopeObj.view.configurationData.fonticonConfigurationKeySort.text = "\ue920";
    }
    scopeObj.view.configurationData.fonticonConfigurationValueSort.text = "\ue92b";

    scopeObj.setConfigurations(sortedConfigurations);
  },

  sortConfigurationsByConfigValue : function() {
    var scopeObj = this;

    if(!scopeObj.sortConfigurationsBy) {
      scopeObj.sortConfigurationsBy = this.getObjectSorter("lblConfigurationValue.text");
    } else {
      scopeObj.sortConfigurationsBy.column('lblConfigurationValue.text');
    }

    var sortedConfigurations =  scopeObj.view.configurationData.segConfiguration.data.sort(scopeObj.sortConfigurationsBy.sortData);

    if(scopeObj.view.configurationData.fonticonConfigurationValueSort.text === "\ue92b" || scopeObj.view.configurationData.fonticonConfigurationValueSort.text === "\ue920") {
      scopeObj.view.configurationData.fonticonConfigurationValueSort.text = "\ue92a";
    }
    else if(scopeObj.view.configurationData.fonticonConfigurationValueSort.text === "\ue92a") {
      scopeObj.view.configurationData.fonticonConfigurationValueSort.text = "\ue920";
    }
    scopeObj.view.configurationData.fonticonConfigurationKeySort.text = "\ue92b";

    scopeObj.setConfigurations(sortedConfigurations);
  },

  resetSortIcons : function() {
    var scopeObj = this;

    scopeObj.view.configurationData.fonticonConfigurationKeySort.text = "\ue92b";
    scopeObj.view.configurationData.fonticonConfigurationValueSort.text = "\ue92b";
  },

  onHoverEventCallback : function(widget, context) {
    var scopeObj = this;
    var selectedIndex = scopeObj.view.configurationData.segConfiguration.selectedRowIndex[1];

    var widGetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view[widGetId].setVisibility(true);
      scopeObj.optionButtonStateChange(selectedIndex, true);
    }
    else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view[widGetId].setVisibility(false);
      scopeObj.optionButtonStateChange(selectedIndex, false);
    }
  },

  clientToggleButtonClick : function() {
    var scopeObj = this;
    scopeObj.toggleButtonsUtilFunction([scopeObj.view.btnToggleClient,scopeObj.view.btnToggleServer],1);
    scopeObj.clientServerToggle = true;
  },

  serverToggleButtonClick : function() {
    var scopeObj = this;
    scopeObj.toggleButtonsUtilFunction([scopeObj.view.btnToggleClient,scopeObj.view.btnToggleServer],2);
    scopeObj.clientServerToggle = false;
  },

  toggleTypeFilter : function() {
    var scopeObj = this;

    if(this.view.flxConfigTypeFilter.isVisible) {
      scopeObj.view.flxConfigTypeFilter.setVisibility(false);
    }
    else {
      scopeObj.view.flxConfigTypeFilter.setVisibility(true);
    }
  },

  performTypeFilter : function() {
    var scopeObj = this;

    scopeObj.resetSortIcons();
    var typeFilterIndices = scopeObj.view.configTypeFilterMenu.segStatusFilterDropdown.selectedIndices;

    if (typeFilterIndices !== null) {
      var configurationsFilteredBySearchCriteria = scopeObj.activeConfigurations.filter(scopeObj.filterConfigurationsBySearchCriteria);
      var configurationsFilteredByTarget = scopeObj.getConfigurationsFilteredByTarget(configurationsFilteredBySearchCriteria);

      scopeObj.typeFilterIndiciesArray = typeFilterIndices ? typeFilterIndices[0][1] : [];

      var configurationsFilteredByType = scopeObj.getConfigurationsFilteredByType(configurationsFilteredByTarget);

      if (configurationsFilteredByType.length > 0) {
        scopeObj.setConfigurations(configurationsFilteredByType);
      }
      else {
        scopeObj.view.configurationData.segConfiguration.removeAll();
        scopeObj.view.configurationData.flxTableView.setVisibility(false);
        scopeObj.view.rtxNoResultsFound.setVisibility(true);
      }
    }
    else {
      scopeObj.view.configurationData.flxTableView.setVisibility(false);
      scopeObj.view.rtxNoResultsFound.setVisibility(true);
    }

    this.view.flxConfigTypeFilter.setVisibility(false);
    this.view.forceLayout();
  },

  getConfigurationsFilteredByType : function(configurations) {
    var scopeObj = this;
    var selectedFilter = [];

    var selectedTypeFilterIndices = scopeObj.view.configTypeFilterMenu.segStatusFilterDropdown.selectedIndices[0][1];
    for(var i=0; i < selectedTypeFilterIndices.length; i++) {
      selectedFilter.push(scopeObj.view.configTypeFilterMenu.segStatusFilterDropdown.data[selectedTypeFilterIndices[i]].lblDescription);
    }

    var filteredConfigurations = configurations.filter(function(record) {
      if (selectedFilter.indexOf(scopeObj.configurationType[record.configurationType]) >= 0) {
        return record;
      }
      else {
        return null;
      }
    });

    return filteredConfigurations;
  },

  toggleTargetFilter : function() {
    var scopeObj = this;

    if(this.view.flxConfigTargetFilter.isVisible) {
      scopeObj.view.flxConfigTargetFilter.setVisibility(false);
    }
    else {
      scopeObj.view.flxConfigTargetFilter.setVisibility(true);
    }
  },

  performTargetFilter : function() {
    var scopeObj = this;

    scopeObj.resetSortIcons();
    var targetFilterIndices = scopeObj.view.configTargetFilterMenu.segStatusFilterDropdown.selectedIndices;

    if (targetFilterIndices !== null) {
      var configurationsFilteredBySearchCriteria = scopeObj.activeConfigurations.filter(scopeObj.filterConfigurationsBySearchCriteria);
      var configurationsFilteredByType = scopeObj.getConfigurationsFilteredByType(configurationsFilteredBySearchCriteria);

      scopeObj.targetFilterIndiciesArray = targetFilterIndices ? targetFilterIndices[0][1] : [];

      var configurationsFilteredByTarget = scopeObj.getConfigurationsFilteredByTarget(configurationsFilteredByType);

      if (configurationsFilteredByTarget.length > 0) {
        scopeObj.setConfigurations(configurationsFilteredByTarget);
      }
      else {
        scopeObj.view.configurationData.segConfiguration.removeAll();
        scopeObj.view.configurationData.flxTableView.setVisibility(false);
        scopeObj.view.rtxNoResultsFound.setVisibility(true);
      }
    }
    else {
      scopeObj.view.configurationData.flxTableView.setVisibility(false);
      scopeObj.view.rtxNoResultsFound.setVisibility(true);
    }

    this.view.flxConfigTargetFilter.setVisibility(false);
    this.view.forceLayout();
  },

  getConfigurationsFilteredByTarget : function(configurations) {
    var scopeObj = this;
    var selectedFilter = [];

    var selectedTargetFilterIndices = scopeObj.view.configTargetFilterMenu.segStatusFilterDropdown.selectedIndices[0][1];
    for(var i=0; i < selectedTargetFilterIndices.length; i++) {
      selectedFilter.push(scopeObj.view.configTargetFilterMenu.segStatusFilterDropdown.data[selectedTargetFilterIndices[i]].lblDescription);
    }

    var filteredConfigurations = configurations.filter(function(record) {
      if (selectedFilter.indexOf(record.configurationTarget) >= 0) {
        return record;
      }
      else {
        return null;
      }
    });

    return filteredConfigurations;
  }
  // --> Event listener functions <--
});
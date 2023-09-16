define({ 

  //Type your controller code here 
  allAttributesList : [],
  allDatasets: [],
  allAttributes: {},
  currentDatasetId: undefined,
  selectedDatasetCount: 0,
  selectedDatasets : [],
  selectedAttributes : [],
  statusFilterSelection: [],
  isEdit: false,
  isCreate: false,
  isCopy: false,
  currentProfileData: null,
  profileConditionId: null,
  hasUnsavedChanges: false,

  willUpdateUI: function(context) {
    if(context){
      this.updateLeftMenu(context);
      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }
      if (context.toastModel) {
        if (context.toastModel.status === "SUCCESS") {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
          kony.adminConsole.utils.hideProgressBar(this.view);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      if(context.showCreateProfile){
        this.isCreate = true;
        this.isEdit = false;
        this.isCopy = false;
        this.resetProfileData();
      }
      if(context.showEditProfile){
        this.isCreate = false;
        this.isEdit = context.isEdit;
        this.isCopy = !context.isEdit;
        this.resetProfileData();
        this.currentProfileData = context.profileDetails;
        this.showEditProfile(); 
      }
    }
    this.view.forceLayout();
  },

  createProfilePreShow: function(){
    this.setFlowActions();
  },

  setFlowActions: function() {
    var scopeObj = this;

    this.view.breadcrumbs.btnBackToMain.onClick = function(){ 
      scopeObj.unsavedChanges();
    };

    this.view.txtProfileName.onTouchStart = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmCreateProfile_txtProfileName");
      var textLen = scopeObj.view.txtProfileName.text.length ;
      scopeObj.view.lblProfileNameSize.text = textLen + "/" + scopeObj.view.txtProfileName.maxtextlength;
      scopeObj.view.lblProfileNameSize.setVisibility(true);
      scopeObj.view.flxAddProfile.forceLayout();
    };
    
    this.view.txtProfileName.onKeyUp = function(){
      scopeObj.view.ProfileNameError.setVisibility(false);
      scopeObj.view.txtProfileName.skin = "txtD7d9e0";
      var textLen = scopeObj.view.txtProfileName.text.length ;
      scopeObj.view.lblProfileNameSize.text = textLen + "/" + scopeObj.view.txtProfileName.maxtextlength;
      scopeObj.view.lblProfileNameSize.setVisibility(true);
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.flxAddProfile.forceLayout();
    };

    this.view.txtProfileName.onEndEditing = function(){
      scopeObj.view.lblProfileNameSize.setVisibility(false);
    };

    this.view.txtProfileDescription.onTouchStart = function() {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToAlphaNumericWithSpace("frmCreateProfile_txtProfileDescription");
      var textLen = scopeObj.view.txtProfileDescription.text.length ;
      scopeObj.view.lblProfileDescSize.text = textLen + "/" + scopeObj.view.txtProfileDescription.maxtextlength;
      scopeObj.view.lblProfileDescSize.setVisibility(true);
      scopeObj.view.flxAddProfile.forceLayout();
    };

    this.view.txtProfileDescription.onKeyUp = function(){
      scopeObj.view.txtProfileDescription.skin = "skntxtAread7d9e0";
      scopeObj.view.ProfileDescError.setVisibility(false);
      var textLen = scopeObj.view.txtProfileDescription.text.length ;
      scopeObj.view.lblProfileDescSize.text = textLen + "/" + scopeObj.view.txtProfileDescription.maxtextlength;
      scopeObj.view.lblProfileDescSize.setVisibility(true);
      scopeObj.hasUnsavedChanges = true;
      scopeObj.view.flxAddProfile.forceLayout();
    };

    this.view.txtProfileDescription.onEndEditing = function(){
      scopeObj.view.lblProfileDescSize.setVisibility(false);
    };

    this.view.commonButtons.btnCancel.onClick = function(){ 
      scopeObj.unsavedChanges();
    };

    this.view.btnAddAttibutes.onClick = function(){ 
      scopeObj.showPopup("showAllDatasets");
      scopeObj.hasUnsavedChanges = true;
    };

    this.view.btnAttributesCancel.onClick = function(){ 
      scopeObj.view.flxDatasetPopup.setVisibility(false);
    };

    this.view.flxAttributesPopUpClose.onClick = function(){ 
      scopeObj.view.flxDatasetPopup.setVisibility(false);
    };

    this.view.commonButtons.btnSave.onClick = function() {
      scopeObj.validateProfileDetails();
    };

    this.view.tbxDatasetSearchBox.onTouchStart = function(){
      scopeObj.view.flxDatasetClearSearch.setVisibility(true);
      scopeObj.view.flxDatasetSearch.skin = "slFbox0ebc847fa67a243Search";
    };

    this.view.tbxDatasetSearchBox.onTouchEnd = function(){
      scopeObj.view.flxDatasetClearSearch.setVisibility(false);
      scopeObj.view.flxDatasetSearch.skin = "sknflxd5d9ddop100";
    };

    this.view.tbxDatasetSearchBox.onKeyUp = function() {
      scopeObj.searchDatasets();
    };

    this.view.flxDatasetClearSearch.onClick=function(){
      scopeObj.view.tbxDatasetSearchBox.text = "";
      scopeObj.searchDatasets();
    };

    this.view.lblReset.onClick = function() {
      scopeObj.showPopup("resetAllDatasets");
    };

    this.view.btnAttributesSave.onClick = function() {
      var hasValidAttributes = scopeObj.validateAttributes();
      if(hasValidAttributes){
        scopeObj.addAttributesToMainScreen();
      }
      scopeObj.view.flxDatasetPopup.setVisibility(!hasValidAttributes);
      scopeObj.view.flxNoAttributes.skin = hasValidAttributes ? "sknflxf8f9fabkgdddee0border3pxradius" : scopeObj.view.flxNoAttributes.skin;
      scopeObj.view.NoAttributesError.setVisibility(hasValidAttributes ? false : scopeObj.view.NoAttributesError.isVisible);
    };

    this.view.btnAddMoreAttrs.onClick = function() {
      scopeObj.view.tbxDatasetSearchBox.text = "";
      scopeObj.showPopup("showAllDatasets");
      scopeObj.hasUnsavedChanges = true;
    };

    this.view.lblAttributeHeader.onClick = function(){
      scopeObj.sortAttributes('attributeName',"segSelectedAttributes","lblSortAttribute");
    };

    this.view.lblSortAttribute.onClick = function(){
      scopeObj.sortAttributes('attributeName',"segSelectedAttributes","lblSortAttribute");
    };

    this.view.lblFilterDataset.onClick = function(){
      var isVisible = scopeObj.view.flxDatasetFilter.isVisible;
      scopeObj.view.flxDatasetFilter.setVisibility(!isVisible);
    };

    this.view.datasetFilter.segStatusFilterDropdown.onRowClick = function(seguiWidget, sectionIndex, rowIndex){
      let description = scopeObj.view.datasetFilter.segStatusFilterDropdown.data[rowIndex].lblDescription.toUpperCase();
      scopeObj.filterDatasets(description, "datasetFilter", "segSelectedAttributes");
    };

    this.view.warningpopup.flxPopUpClose.onClick = function(){ 
      scopeObj.view.flxWarningPopup.setVisibility(false);
    };

    this.view.warningpopup.btnPopUpCancel.onClick = function(){ 
      scopeObj.view.flxWarningPopup.setVisibility(false);
    };

    this.view.warningpopup.btnPopUpDelete.onClick = function(){
      if(scopeObj.view.warningpopup.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderUnsavedChanges"))
        scopeObj.presenter.getProfiles();
      else if(scopeObj.view.warningpopup.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderDataResetWarning"))
        scopeObj.resetAllDatasets();
    };
    this.view.forceLayout();
  },

  resetProfileData: function() {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.view.txtProfileName.text = "";
    this.view.txtProfileName.skin = "txtD7d9e0";
    this.view.txtProfileName.setEnabled(true);
    this.view.txtProfileDescription.text = "";
    this.view.btnAddMoreAttrs.setVisibility(false);
    this.view.flxNoAttributes.setVisibility(true);
    this.view.flxAttrContainer.setVisibility(false);
    this.view.ProfileNameError.setVisibility(false);
    this.view.ProfileDescError.setVisibility(false);
    this.view.NoAttributesError.setVisibility(false);
    this.view.flxDatasetPopup.setVisibility(false);
    this.view.flxWarningPopup.setVisibility(false);
    this.hasUnsavedChanges = false;
    this.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.createSegmentCaps");
    this.view.commonButtons.btnSave.width = "170dp";
    this.getObjectSorter().column('attributeName');
    this.view.lblSortAttribute.text = '\ue92b';
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.createSegment");
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.common.newCAPS");
    this.populateDatasets();
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.forceLayout();
  },

  showEditProfile: function() {
    var breadCrumbName = this.AdminConsoleCommonUtils.getEncodedTextInput(this.currentProfileData.profileName, true);
    var profileName = this.AdminConsoleCommonUtils.getEncodedTextInput(this.currentProfileData.profileName);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.editSegment");
    this.view.breadcrumbs.lblCurrentScreen.text = this.isEdit? breadCrumbName.toUpperCase() : kony.i18n.getLocalizedString("i18n.common.newCAPS");
    this.view.txtProfileName.text = this.isEdit? profileName : ("Copy_" + profileName).substring(0, 50);
    this.view.txtProfileName.skin = this.isEdit? "txtD7d9e0disabledf3f3f3": "txtD7d9e0";
    this.view.txtProfileName.setEnabled(!this.isEdit);
    this.view.txtProfileDescription.text = this.AdminConsoleCommonUtils.getEncodedTextInput(this.currentProfileData.profileDescription,true);
    if(this.isEdit){
      this.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.updateSegmentCaps");
      this.view.commonButtons.btnSave.width = "174dp";
    }
    this.setAttributesOnEdit();
    this.view.forceLayout();
  },

  unsavedChanges: function() {
    if(this.hasUnsavedChanges)
      this.showPopup("unsaved");
    else
      this.presenter.getProfiles();
  },

  showPopup: function(popupType) {
    if(popupType === "unsaved"){
      this.view.flxWarningPopup.setVisibility(true);
      this.view.flxDatasetPopup.setVisibility(false);
      this.view.warningpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderUnsavedChanges");
      this.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBodyUnsavedChanges");
    }
    else if(popupType === "resetAllDatasets"){
      this.view.flxWarningPopup.setVisibility(true);
      this.view.flxDatasetPopup.setVisibility(true);
      this.view.warningpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupHeaderDataResetWarning");
      this.view.warningpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.popupBodyDataResetWarning");
    }
    else if(popupType === "showAllDatasets"){
      this.view.flxWarningPopup.setVisibility(false);
      this.view.flxDatasetPopup.setVisibility(true);
      this.view.forceLayout();
      this.view["flxAttrContainer" + this.currentDatasetId].flxAttributesDetailsBody.height = (this.view.flxAddAttributesDetailsContainer.frame.height-122) + "dp";
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

  populateDatasets : function() {
    var scopeObj = this;
    var datasetObj ;
    var hasData = false;
    scopeObj.allDatasets = this.presenter.getModelAttributes();
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
            "isVisible" : !(isSelect || isDate),
            "onKeyUp" : scopeObj.onInputChangeSelectAttribute,
            "onTextChange" : scopeObj.onInputChangeSelectAttribute,
          },
          "lstCriteria" : {
            "masterData" : scopeObj.formatOptionsData(attribute.criterias, false)
          },
          "lstValues" : {
            "isVisible" : isSelect,
            "masterData" : scopeObj.formatOptionsData(attribute.options, true),
            "onSelection": scopeObj.onInputChangeSelectAttribute,
          },
          "fonticonCheckBox" : {
            "onClick" : function(eventobject) {
              scopeObj.onSelectAttribute(eventobject);
            }
          },
          "lblLine": {
            "text": "."
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      attributesContainer.flxAttributesDetailsBody.add(attributeSelection);
      scopeObj.currentDatasetId = datasetId.replace(/_/g, "");
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

  onInputChangeSelectAttribute : function(eventobject){
    if (this.view["flxDS" + this.currentDatasetId].fonticonCheckBox.text === "\ue966") {
      this.view["flxDS" + this.currentDatasetId].fonticonCheckBox.text = "\ue965";
      this.view["flxDS" + this.currentDatasetId].fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
      this.view["flxDS" + this.currentDatasetId].fontIconArrow.setVisibility(true);
      this.selectedDatasetCount = this.selectedDatasetCount + 1;
      this.displayDatasetCount();
    }
    var attributeConatinerId = eventobject.kmasterid.substring(0, eventobject.kmasterid.indexOf("_"));
    var attributeId = eventobject.kmasterid.substring(eventobject.kmasterid.indexOf("_") + 1);
    var hasVal, notSelected = this.view[attributeConatinerId][attributeId].fonticonCheckBox.text === "\ue966";
    if(eventobject.text !== undefined)
      hasVal = eventobject.text === ""? false : true;
    if(eventobject.selectedKey !== undefined)
      hasVal = eventobject.selectedKey === "Select"? false : true;
    this.view[attributeConatinerId][attributeId].fonticonCheckBox.text = hasVal || notSelected ? "\ue965" : "\ue966";
    this.view[attributeConatinerId][attributeId].fonticonCheckBox.skin = hasVal || notSelected ? "sknFontIconCheckBoxSelected" : "sknFontIconCheckBoxUnselected";
    if(notSelected)
      eventobject.parent.parent.parent.parent.parent.updateAttributeSelectionCount(true);
    if(!notSelected && !hasVal)
      eventobject.parent.parent.parent.parent.parent.updateAttributeSelectionCount(false);
  },

  displayDatasetCount : function() {
    var scopeObj = this;
    scopeObj.view.lblDatasetCount.text = scopeObj.selectedDatasetCount > 9 ? scopeObj.selectedDatasetCount : "0" + scopeObj.selectedDatasetCount;
  },

  formatOptionsData : function(optionsData, hasSelect) {
    let selectOption = kony.i18n.getLocalizedString("i18n.frmAdManagement.Select");
    let options = hasSelect ? [[selectOption,selectOption]] : [];
    for(let key in optionsData) {
      if(key !== selectOption){
        let value = kony.i18n.getLocalizedString(optionsData[key]) ? kony.i18n.getLocalizedString(optionsData[key]) : optionsData[key]; 
        options.push([unescape(key), value]);
      }
    }
    return options;
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
    scopeObj.view.flxDatasetFilter.onHover = scopeObj.onHoverEventCallbackStatus;
    scopeObj.allAttributesList = scopeObj.selectedAttributes;
    scopeObj.view.segSelectedAttributes.setData(scopeObj.selectedAttributes);
    scopeObj.view.flxNoAttributes.setVisibility(!hasData);
    scopeObj.view.flxAttrContainer.setVisibility(hasData);
    scopeObj.view.flxAddAttributes.setVisibility(hasData);
    scopeObj.view.btnAddMoreAttrs.setVisibility(hasData);
    scopeObj.view.datasetFilter.segStatusFilterDropdown.setData(datasets);
    scopeObj.view.flxDatasetFilter.setVisibility(false);
    scopeObj.getObjectSorter().column('attributeName');
    scopeObj.view.lblSortAttribute.text = '\ue92b';
  },

  setAttributesOnEdit: function(){
    var self = this;
    this.selectedAttributes = [];
    this.selectedDatasets = [];
    var datasets = [];
    var profileConditions = this.currentProfileData.profileConditions;
    profileConditions.forEach(function(ds){
      var datasetDetails = self.allDatasets[ds.dataContextId.replace(/_/g,"")];
      if(datasetDetails) {
        var datasetName = datasetDetails.name;
        datasets.push({
          lblDescription : datasetName,
          imgCheckBox:{"src":"checkboxselected.png"}
        });
        // dataset id from profile Conditions
        var dataContextId = ds.dataContextId;

        var allAvailableDatasets = self.view.flxDatasetList.children;
        for (var i = 0; i < allAvailableDatasets.length; i++) {
          var dataset = self.view.flxDatasetList[allAvailableDatasets[i]];
          var datasetId = dataset.id.replace("flxDS", "");
          if(datasetId === dataContextId){
            // on dataset match checkbox filled
            self.view.flxDatasetList[allAvailableDatasets[i]].fonticonCheckBox.text = "\ue965";
            self.view.flxDatasetList[allAvailableDatasets[i]].fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
            self.selectedDatasetCount++;
            if(self.selectedDatasetCount === 1){
              self.currentDatasetId = datasetId;
              self.view.flxDatasetList[allAvailableDatasets[i]].flxDataset.skin = "sknFlxBorder117eb0radius3pxbgfff";
              self.view.flxDatasetList[allAvailableDatasets[i]].fontIconArrow.setVisibility(true);
              self.view["flxAttrContainer" + datasetId].setVisibility(true);
              self.view.flxAddAttributesDetailsMain.setVisibility(true);
              self.view.flxAddAttributesMsgContainer.setVisibility(false);
              self.view["flxAttrContainer" + self.currentDatasetId].forceLayout();
            }
            var expressions = unescape(ds.conditionExpression).split(" and ");
            var attributesMap = datasetDetails.attributes;
            expressions.forEach(function(exp){
              var endIndex = exp.indexOf(" ");
              // getting attribute ID from expression
              var attrIdFromExp = exp.substring(0,endIndex);
              var attributeObj = attributesMap[attrIdFromExp];
              exp = exp.replace(attrIdFromExp, "").trim();
              endIndex = exp.indexOf(" ");
              var criteriaKey = exp.substring(0,endIndex);
              exp = exp.replace(criteriaKey, "").trim();
              var value = exp.substring(1,exp.length-1);
              var attributesContainer = self.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody;
              //pust in Attributes dispaly segment data
              self.selectedAttributes.push({
                "attributeName": attributeObj.name,
                "criteriaValue": kony.i18n.getLocalizedString(attributeObj.criterias[criteriaKey]) ? kony.i18n.getLocalizedString(attributeObj.criterias[criteriaKey]) : attributeObj.criterias[criteriaKey],
                "datasetName": datasetName,
                "value": attributeObj.type === "SELECT" ? (kony.i18n.getLocalizedString(attributeObj.options[value]) ? kony.i18n.getLocalizedString(attributeObj.options[value]) : attributeObj.options[value]) : value
              });
              var allAvailableAttributes = attributesContainer.children;

              for (var j = 1; j < allAvailableAttributes.length; j++) {

                var attribute = attributesContainer[allAvailableAttributes[j]];
                var attributeId = attribute.lblId.text;
                if(attributeId === attrIdFromExp){
                  self.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody[allAvailableAttributes[j]].fonticonCheckBox.text = "\ue965";
                  self.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody[allAvailableAttributes[j]].fonticonCheckBox.skin = "sknFontIconCheckBoxSelected";
                  self.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody[allAvailableAttributes[j]].lstCriteria.selectedKey = criteriaKey;
                  if(attributeObj.type === "SELECT" )
                    self.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody[allAvailableAttributes[j]].lstValues.selectedKey = value;
                  else
                    self.view["flxAttrContainer" + datasetId].flxAttributesDetailsBody[allAvailableAttributes[j]].txtValue.text = value;
                  self.view["flxAttrContainer" + datasetId].updateAttributeSelectionCount(true);
                }
              }
            });
          }
        }        
        self.selectedDatasets.push({
          "profileConditionId" : ds.profileConditionId,
          "conditionExpression" : ds.conditionExpression,
          "dataContextId" : dataContextId
        });
        this.profileConditionId = ds.profileConditionId;
      }
    });
    this.displayDatasetCount();
    this.view.flxDatasetFilter.setVisibility(false);
    this.view.flxDatasetFilter.onHover = this.onHoverEventCallbackStatus;
    this.view.datasetFilter.segStatusFilterDropdown.setData(datasets);
    this.view.segSelectedAttributes.widgetDataMap = {
      "flxAttributeRow": "flxAttributeRow",
      "lblAttribute": "attributeName",
      "lblCriteria": "criteriaValue",
      "lblDataset": "datasetName",
      "lblValue": "value"
    };
    this.view.segSelectedAttributes.setData(self.selectedAttributes);
    this.view.flxNoAttributes.setVisibility(false);
    this.view.flxAttrContainer.setVisibility(true);
    this.view.btnAddMoreAttrs.setVisibility(true);
    this.view.forceLayout();
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

  sortAttributes : function(propname, segName, arrowName) {
    var scopeObj = this;  
    var sortOrder = (scopeObj.sortBy) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter(propname);
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    scopeObj.getObjectSorter().column(propname);
    var data = scopeObj.view[segName].data.sort(scopeObj.sortBy.sortData);
    scopeObj.view[segName].setData(data);
    scopeObj.determineSortFontIcon(scopeObj.sortBy,propname,scopeObj.view[arrowName]);
    scopeObj.view.flxDatasetFilter.setVisibility(false);
  },

  resetAllDatasets : function(){
    var scopeObj = this;
    var availableDatasets = scopeObj.view.flxDatasetList.children;
    for(var i=0; i<availableDatasets.length; i++){
      var dataset = scopeObj.view.flxDatasetList[availableDatasets[i]];
      var datasetId = dataset.id.replace("flxDS","");
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
    this.view.flxDatasetPopup.setVisibility(false);
    this.view.flxWarningPopup.setVisibility(false);
    this.view.flxNoAttributes.setVisibility(true);
    this.view.flxAttrContainer.setVisibility(false);
    this.view.btnAddMoreAttrs.setVisibility(false);
    scopeObj.displayDatasetCount();
  },

  validateProfileDetails : function() {
    var scopeObj = this, payload = {};
    var isValidProfileDetails = true ;
    if(scopeObj.view.txtProfileName.text.trim() === "") {
      scopeObj.view.txtProfileName.skin = "skinredbg";
      scopeObj.view.ProfileNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.errMsgFieldCantEmpty");
      scopeObj.view.ProfileNameError.setVisibility(true);
      isValidProfileDetails = false;
    }
    if(this.validateProfileNameExist() && !this.isEdit){
      scopeObj.view.txtProfileName.skin = "skinredbg";
      scopeObj.view.ProfileNameError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.errMsgSegmentNameExists");
      scopeObj.view.ProfileNameError.setVisibility(true);
      isValidProfileDetails = false;
    }
    if(scopeObj.view.txtProfileDescription.text.trim() === "") {
      scopeObj.view.txtProfileDescription.skin = "sknTxtError";
      scopeObj.view.ProfileDescError.lblErrorText.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.errMsgFieldCantEmpty");
      scopeObj.view.ProfileDescError.setVisibility(true);
      isValidProfileDetails = false;
    }
    if(scopeObj.view.flxNoAttributes.isVisible || !this.view.segSelectedAttributes.data.length){
      scopeObj.view.flxNoAttributes.skin = "sknflxf8f9fabkge32416border3pxradius";
      scopeObj.view.NoAttributesError.setVisibility(true);
      isValidProfileDetails = false;
    }
    if(isValidProfileDetails) {
      if(this.isEdit){
        var profileData = this.currentProfileData;
        payload ={
          "profileId": profileData.profileId,
          "profileName": profileData.profileName,
          "profileDescription": this.view.txtProfileDescription.text,
          "profileStatus": profileData.profileStatus,
          "profileConditions": this.selectedDatasets,
          "isEdit": true
        };
        scopeObj.presenter.updateProfile(payload);
      }
      else{
        payload = {
          "profileName" : scopeObj.view.txtProfileName.text.trim(),
          "profileDescription" : scopeObj.view.txtProfileDescription.text.trim(),
          "profileConditions" : scopeObj.selectedDatasets
        };
        scopeObj.presenter.createProfile(payload);
      }
    }
  },

  validateProfileNameExist: function(){
    var profileName = this.presenter.findProfileName(this.view.txtProfileName.text);
    if(profileName.length>0)
      return true;
    return false;
  },

  onHoverEventCallbackStatus : function(widget, context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
  },

});
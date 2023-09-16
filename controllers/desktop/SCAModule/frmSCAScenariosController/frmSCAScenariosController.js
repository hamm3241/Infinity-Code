define([],function(){
  var STATUS_CONTANTS = {
    active: "SID_ACTIVE",
    inactive: "SID_INACTIVE"
  };
  
  var ACTION_CONFIG=  {
    create: "CREATE",
    edit: "EDIT",
    view: "VIEW"
  };
  var ACTION = "CREATE";
  var FilterSel = "";
  var mfaScenarioState = {
  };

  var mouseYCoordinate = 0;
  var segmentYCoordinate = 0;
  var masterData = {
    features:[],
    actions:[],
    mfaTypes:[],
    mfaModes:[],
    frequencyTypes:[],
    isLoaded:false
  };
  var SELECTED_FILTERS = {
    type: ["MONETARY","NON_MONETARY"],
    status: [kony.i18n.getLocalizedString("i18n.secureimage.Enforced"),kony.i18n.getLocalizedString("i18n.secureimage.NotEnforced")],
    app:[],
    searchText: ""
  };
  var CURRENT_SELECTION = {
    featureId : "",
    actionId : "",
    statusId : ""
  };
  var NAVIGATE_FLAG ="main";
  var prevIndex = -1;
  var isScaRiskAssessmentEnable = true;
  return {
    state:{
      selectedMFAScenario:null
    },
    scaScenariosList:[],
    mfaSegDataList : [] ,
    willUpdateUI: function (model) {
      this.updateLeftMenu(model);
      this.isScaRiskAssessmentEnable = this.getScaRiskAssessmentEnable();
      if (model && model.scaScenariosList) {
        this.loadMFACompleteData();
      } else if (model.action === "hideLoadingScreen") {
        kony.adminConsole.utils.hideProgressBar(this.view);
      } else if (model.loadingScreen) {
        if (model.loadingScreen.focus){
          kony.adminConsole.utils.showProgressBar(this.view);
        }
        else{
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }else if(model.fetchSCAScenarios){
        this.view.flxMFAConfigContainer.setVisibility(true);
        this.scaScenariosList = model.fetchSCAScenarios;
        this.mfaSegDataList = model.fetchSCAScenarios;
        this.sortBy = this.getObjectSorter("Action_id");
      	this.determineSortFontIcon(this.sortBy,"Action_id",this.view.fontIconSortFeature);
        this.mapSCAScenarios(model.fetchSCAScenarios.sort(this.sortBy.sortData));
        var statusFilter=[];
        var scenarioTypes=[];
        var appFilter = [];
        for(var i=0;i<model.fetchSCAScenarios.length;i++){
          var statusText = (model.fetchSCAScenarios[i].Status_id===
              STATUS_CONTANTS.active)?
              kony.i18n.getLocalizedString("i18n.secureimage.Enforced"):
          	  kony.i18n.getLocalizedString("i18n.secureimage.NotEnforced");
          var scenarioText=model.fetchSCAScenarios[i].actionType;
          var appData=model.fetchSCAScenarios[i].App_id;
          if(!statusFilter.contains(statusText))
            statusFilter.push(statusText);
           if(!scenarioTypes.contains(scenarioText))
             scenarioTypes.push(scenarioText);
			 if(!appFilter.contains(appData))
	             appFilter.push(appData);
        }
        if(model.variableReference){
          this.setVariableReferenceData(model.variableReference);
        }
        if (model.featuresList){
          this.featuresList=model.featuresList;
        }
        this.setStatusFilterData(statusFilter);
        this.setTypeFilterData(scenarioTypes);
        this.setApplicationsFilterData(appFilter);
        SELECTED_FILTERS.type=["MONETARY","NON_MONETARY"];
        SELECTED_FILTERS.status=[kony.i18n.getLocalizedString("i18n.secureimage.Enforced"),kony.i18n.getLocalizedString("i18n.secureimage.NotEnforced")];
        this.performStatusAppSearchFilter();
      }else if(model.createSCAScenario){
        if(NAVIGATE_FLAG === "view"){
          this.backToCallerView();
        }
        else{
          this.showMFAScenarios();
          this.presenter.getFeaturesList({});
          this.presenter.fetchSCAScenarios({});
        }
      }else if (model.featuresList){
        this.featuresList=model.featuresList;
        this.CheckCreateScenario();
      }else if (model.featureTypeActions){
        this.enableMFAScenarios(model.featureTypeActions);
      }else if (model.featureMFATypeActions){
        var sortedDataObject=this.sortListBoxData(model.featureMFATypeActions, "actionId");
        this.view.lbxActionType.info=sortedDataObject.map(function(rec){return [rec.actionId,rec.actionName,rec.actionType];});
        this.view.lbxActionType.masterData = [["SELECT","Select an Action"]].concat(sortedDataObject.map(function(rec){return [rec.actionId,rec.actionName];}));
      }else if (model.toastMessage) {
        if (model.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(model.toastMessage.message, this);
        } else if (model.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
          this.view.toastMessage.showErrorToastMessage(model.toastMessage.message, this);
        }
      }
      else if(model.fetchMFAScenariosById){
        if(ACTION === ACTION_CONFIG.edit)
        	this.refreshMfaEdit(model.fetchMFAScenariosById);
        else
          this.refreshMfaView(model.fetchMFAScenariosById);
      }
      if(model.masterData){
        this.setMasterData(model.masterData);
      }
    },
    initActions: function () {
      var scopeObj = this;
      this.view.segMFAScenarios.onHover=this.saveScreenY.bind(this);
    },
    preshow: function(){
      var scopeObj = this;
      this.view.segMFAScenarios.setData([]);
      this.view.flxMFAConfigContainer.setVisibility(false);
      this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
      scopeObj.view.flxToastMessage.setVisibility(false);
      scopeObj.view.popUpCancelEdits.flxPopUp.skin = "sknFlxFFFFFF1000";
      scopeObj.view.popUpCancelEdits.lblPopUpMainMessage.skin = "sknLbl192b45LatoReg16px";
      scopeObj.view.popUpCancelEdits.lblPopupClose.skin = "sknIcon12px192b45";
      scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.skin = "sknrtxLatoRegular485c7512px";
      scopeObj.view.popUpCancelEdits.flxPopUpTopColor.skin = "sknflxebb54cOp100";
      scopeObj.view.popUpCancelEdits.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      scopeObj.view.popUpCancelEdits.btnPopUpDelete.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
      scopeObj.view.popUpCancelEdits.btnPopUpDelete.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";

      scopeObj.view.popUpCancelEdits.btnPopUpCancel.skin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      scopeObj.view.popUpCancelEdits.btnPopUpCancel.focusSkin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      
      scopeObj.view.commonButtonsEditMFAConfig.btnCancel.skin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      scopeObj.view.commonButtonsEditMFAConfig.btnCancel.focusSkin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";      

      scopeObj.view.commonButtonsEditMFAConfig.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      scopeObj.view.commonButtonsEditMFAConfig.btnSave.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
      scopeObj.view.commonButtonsEditMFAConfig.btnSave.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      
      scopeObj.view.mainHeader.lblHeading.skin = "sknLblLatoRegular22px";
      scopeObj.view.breadcrumbs.btnBackToMain.focusSkin = "sknBtnLatoReg006CCA10px";
      scopeObj.view.breadcrumbs.btnBackToMain.skin = "sknBtnLatoReg006CCA10px";
      scopeObj.view.breadcrumbs.lblCurrentScreen.skin = "sknlblLatoLight485c7510px";
      scopeObj.view.mainHeader.btnDropdownList.skin = "sknBtnBg4A77A0R28pxF13pxLatoReg";
      scopeObj.view.mainHeader.btnDropdownList.focusSkin = "sknBtnBg4A77A0R28pxF13pxLatoReg";
      scopeObj.view.mainHeader.btnDropdownList.hoverSkin = "sknBtnBg4A77A0R28pxF13pxLatoReg";
     // this.loadMFACompleteData();
      //When create permission is'nt there Manage button has to be right cornered
      if(!scopeObj.view.mainHeader.btnAddNewOption.isVisible)
        scopeObj.view.mainHeader.btnDropdownList.right="0px";
      scopeObj.currencyValue = scopeObj.defaultCurrencyCode();
      scopeObj.view.btnCheck.text = scopeObj.currencyValue;
    },
    loadMFACompleteData : function(){
      if(!masterData.isLoaded){
        this.presenter.loadMasterData();
      } else{
        this.presenter.fetchSCAScenarios({});
      }
      this.view.smsVariableReferencesMenu.segOptionsDropdown.widgetDataMap = {
        "lblIdName":"lblIdName"
      };
      this.view.emailVariableReferencesMenu.segOptionsDropdown.widgetDataMap = {
        "lblIdName":"lblIdName"
      };
      this.view.statusFilterMenu.isVisible = false;
      this.view.lblAppFilterTitle.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.All_Apps");
      this.showMFAScenarios();
      this.setFlowActions();
    },
    setVariableReferenceData : function(data){
      var scopeObj =this;
      var segData = data.map(function(rec){
        return {
          lblIdName: rec.Name,
          code: rec.Code,
          template:"flxSegVariableOptions"
        };
      });
      scopeObj.view.smsVariableReferencesMenu.segOptionsDropdown.setData(segData);
      scopeObj.view.emailVariableReferencesMenu.segOptionsDropdown.setData(segData); 
    },
    mapSCAScenarios: function(data){
      
      this.isScaRiskAssessmentEnable ? this.view.flxRiskScore.isVisible = true : this.view.flxRiskScore.isVisible = false;
      var dataMap = {
        "appId":"appId",        
        "lblApplicationName": "lblApplicationName",
        "lblFeatureName": "lblFeatureName",
        "lblScenarioType" : "lblScenarioType",
        "lblIconOptions": "lblIconOptions",
        "lblAction": this.isScaRiskAssessmentEnable ? "lblAction" : "",
        "lblServiceStatus": "lblServiceStatus",
        "imgServiceStatus": "imgServiceStatus",
        "fontIconStatusImg" : "fontIconStatusImg",
        "lblDescription":"lblDescription",
        "lblDescriptionTitle":"lblDescriptionTitle",
        "lblSeperator":"lblSeperator",
        "fontIconImgViewDescription":"fontIconImgViewDescription",
        "flxOptions":"flxOptions"
      };
      this.view.segMFAScenarios.widgetDataMap = dataMap;
      if(FilterSel == null){
		data = this.processSCAScenariosForView([]);
	  }else
        data = this.processSCAScenariosForView(data);
      this.view.segMFAScenarios.setData(data);
      
      if(data.length > 0){
        this.view.flxNorecordsFound.setVisibility(false);
        this.view.flxMFAConfigContainer.setVisibility(true);
      }else {
        this.view.flxNorecordsFound.setVisibility(true);
        if(this.inFilter){
          this.view.flxNorecordsFound.top = "110dp";
          this.view.flxNorecordsFound.height = "85%";
          this.view.flxMFAConfigContainer.setVisibility(false);
        }else{
          this.view.flxNorecordsFound.top = "160dp";
          this.view.flxNorecordsFound.height = "90%";
          this.view.flxMFAConfigContainer.setVisibility(false);
        }
      }
      NAVIGATE_FLAG ="main";
      document.getElementById("frmSCAScenarios_segMFAScenarios").onscroll = this.contextualMenuOff;
      this.view.forceLayout();
    },
    contextualMenuOff: function() {
      var newYCoordinate = this.view.flxSegmentMFAScenarios.contentOffsetMeasured.y;
      if (this.view.flxSelectOptions.isVisible) {
        if(segmentYCoordinate !== undefined && (segmentYCoordinate !== newYCoordinate)){
          this.view.flxSelectOptions.setVisibility(false);
          this.setOptionsVisibility("flxSelectOptions");
        }
      }
      segmentYCoordinate = newYCoordinate;
    },
    setMasterData: function(data){
      var self = this;
      masterData = data;
      var sortedDataObject = {
        "frequencyTypes" : self.sortListBoxData(data.frequencyTypes, "frequencyTypeName"),
        "mfaTypes" : self.sortListBoxData(data.mfaTypes, "mfaTypeName"),
        "appsList": self.sortListBoxData(data.appsList, "appName")
      };
      this.view.lstBoxSelectApplication.masterData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Select_an_App")]].concat(sortedDataObject.appsList.map(function(rec){return [rec.appId,rec.appName];}));
      this.view.lbxFrequency.masterData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Select_a_Frequency")]].concat(sortedDataObject.frequencyTypes.map(function(rec){return [rec.frequencyTypeId,rec.frequencyTypeName];}));
      this.view.lbxChallengePrimary.masterData = [["SELECT",kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Select_an_Option")]].concat(sortedDataObject.mfaTypes.map(function(rec){return [rec.mfaTypeId,rec.mfaTypeName];}));
      this.view.lbxChallengeBackup.masterData =  [["SELECT",kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Select_an_Option")]].concat(sortedDataObject.mfaTypes.map(function(rec){return [rec.mfaTypeId,rec.mfaTypeName];}));
      this.CheckCreateScenario();
    },
    sortListBoxData : function(listBoxData,sortParam){
      this.sortBy = this.getObjectSorter(sortParam); 
      var sortedData = listBoxData.sort(this.sortBy.sortData);
      return sortedData;
    },
    setFlowActions: function(){
      var scopeObj = this;
      this.view.flxDeactivate.onClick = this.handleSCAActivateDeactivateClick.bind(this);
      this.view.flxDeactivateView.onClick=this.handleSCAActivateDeactivateClick.bind(this);
      this.view.flxDelete.onClick = this.handleMFAScenarioDeleteClick.bind(this);
      this.view.flxDeleteView.onClick = this.handleMFAScenarioDeleteClick.bind(this);
      this.view.flxRiskScoreIncrement.onClick = this.incrementRiskScoreClick.bind(this);
      this.view.flxRiskScoreDecrement.onClick = this.decrementRiskScoreClick.bind(this);
      this.view.chkEnforceSCA.onTouchEnd = this.enforceOrNotEnforceClick.bind(this);
      this.view.unChkEnforceSCA.onTouchEnd = this.enforceOrNotEnforceClick.bind(this);
      this.view.fontIconSortFeature.onClick = function(){
        scopeObj.sortBy.column("lblFeatureName");
        scopeObj.resetSortImages();
        scopeObj.mapSCAScenarios(scopeObj.view.segMFAScenarios.data.sort(scopeObj.sortBy.sortData));
        scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblFeatureName', scopeObj.view.fontIconSortFeature);
      };
      this.view.fontIconSortAction.onTouchStart = function(){
        scopeObj.sortBy.column("lblScenarioType");
        scopeObj.resetSortImages();
        scopeObj.mapSCAScenarios(scopeObj.view.segMFAScenarios.data.sort(scopeObj.sortBy.sortData));
        scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblScenarioType', scopeObj.view.fontIconSortAction);
      };
      this.view.fontIconSortRiskScore.onTouchStart = function(){
        scopeObj.sortBy.column("lblAction");
        scopeObj.resetSortImages();
        scopeObj.mapSCAScenarios(scopeObj.view.segMFAScenarios.data.sort(scopeObj.sortBy.sortData));
        scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblAction', scopeObj.view.fontIconSortAction);
      };
      this.view.statusFilterMenu.onHover = this.onDropDownsHoverCallback;
      this.view.flxProductStatusFilter.onHover =  this.onDropDownsHoverCallback;
      this.view.flxApplicationsFilter.onHover = this.onDropDownsHoverCallback;
      this.view.smsVariableReferencesMenu.onHover = this.onDropDownsHoverCallback;
      this.view.flxHeaderSMS.onHover = function(widget,context){
        scopeObj.onDropDownsHoverCallbackLeave(scopeObj.view.smsVariableReferencesMenu, context);
      };
      this.view.btnSMSVariableReferences.onClick = function(){
        scopeObj.view.smsVariableReferencesMenu.isVisible = true;
      };
      
      this.view.emailVariableReferencesMenu.onHover = this.onDropDownsHoverCallback;
      this.view.flxHeaderEmail.onHover = function(widget,context){
        scopeObj.onDropDownsHoverCallbackLeave(scopeObj.view.emailVariableReferencesMenu, context);
      };
      this.view.btnEmailVariableReferences.onClick = function(){
        scopeObj.view.emailVariableReferencesMenu.isVisible = true;
      };

      this.view.flxSelectOptions.isVisible = false;
      this.view.flxSelectOptions.onHover = this.onDropDownsHoverCallback;
      this.view.flxSelectOptionsView.isVisible = false;
      this.view.flxSelectOptionsView.onHover = this.onDropDownsHoverCallback;
      this.view.flxViewContent.onScrollStart = function(){
         scopeObj.view.flxSelectOptionsView.isVisible = false;
         scopeObj.view.flxOptions.skin="slFbox";
      };
      this.view.flxEdit.onClick = this.handleMFAConfigEditClick.bind(this);
      this.view.flxEditView.onClick = this.handleMFAConfigEditClick.bind(this);
      this.view.commonButtonsEditMFAConfig.btnCancel.onClick = function(){
        var msg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.cancel_mfa_configs_message");
        var yesText = kony.i18n.getLocalizedString("i18n.frmSCAConfigurations.YES_CANCEL");
        var cancelText = kony.i18n.getLocalizedString("i18n.frmSCAConfigurations.NO_LEAVE_AS_IS");
        scopeObj.showAlertPopup("Cancel Changes",msg,cancelText,yesText,function(){
          scopeObj.editPopupYesClickHandler();
        });
      };
      this.view.commonButtonsEditMFAConfig.btnSave.onClick = function(){
        scopeObj.handleCreateUpdateScenario();
      };
      this.view.flxTransactional.onClick = function(){
        scopeObj.transactionTypeClick();
      };
      this.view.flxNonTransactional.onClick = function(){
        scopeObj.nonTransactionTypeClick();
      };
      this.view.lstBoxSelectApplication.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          appId:eventObject.selectedKey
        });
        if(scopeObj.view.lstBoxSelectApplication.selectedKey!=="SELECT"){
          scopeObj.view.lstBoxSelectApplication.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
          scopeObj.view.flxApplicationError.isVisible = false;
          scopeObj.setFilteredFeaturesData();
        }
      };
      this.view.lstBoxSelectFeature.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          featureId:eventObject.selectedKey
        });
        if(scopeObj.view.lstBoxSelectFeature.selectedKey!=="SELECT"){
          scopeObj.view.lstBoxSelectFeature.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
          scopeObj.view.flxErrorHeader.isVisible = false;
        }
        scopeObj.getRelatedActions({"featureId":scopeObj.view.lstBoxSelectFeature.selectedKey});
      };
      this.view.lbxChallengePrimary.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          primaryMFATypeId:eventObject.selectedKey
        });
        if(scopeObj.view.lbxChallengePrimary.selectedKey!=="SELECT"){
          scopeObj.view.lbxChallengePrimary.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
          scopeObj.view.flxErrorPrimary.isVisible = false;
        }
        scopeObj.changeMessageTemplateDisplay();
      };
      this.view.lbxChallengeBackup.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          secondaryMFATypeId:eventObject.selectedKey
        });
        if(scopeObj.view.lbxChallengeBackup.selectedKey!=="SELECT"){
          scopeObj.view.lbxChallengeBackup.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
          scopeObj.view.flxErrorBackup.isVisible = false;
        }
        scopeObj.changeMessageTemplateDisplay();
      };
      this.view.lbxFrequency.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          frequencyTypeId:eventObject.selectedKey
        });
        if(scopeObj.view.lbxFrequency.selectedKey!=="SELECT"){
          scopeObj.view.lbxFrequency.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
          scopeObj.view.flxErrorFrequency.isVisible = false;
        }
        if(mfaScenarioState.frequencyTypeId === "VALUE_BASED"){
          scopeObj.view.flxValue.isVisible = true;
        }else{
          scopeObj.view.flxValue.isVisible = false;
        }
      };
      this.view.lbxActionType.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          actionId:eventObject.selectedKey
        });
      };
      this.view.lbxActivityType.onSelection = function(eventObject){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          serviceId:eventObject.selectedKey
        });
      };
      this.view.switchMFAConfigStatus.onSlide = function(eventobject) {
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          mfaScenarioStatusId: eventobject.selectedIndex === 1 ? STATUS_CONTANTS.inactive : STATUS_CONTANTS.active
        });
        //scopeObj.view.lblMFAConfigStatus.text = mfaScenarioState.mfaScenarioStatusId === STATUS_CONTANTS.active ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
      };
      this.view.mainHeader.btnAddNewOption.onClick = function(){
        scopeObj.createSceanrioClickHandler();
      };
      this.view.popUpCancelEdits.btnPopUpCancel.onClick = function() {
        scopeObj.editPopupCancelClickHandler();
      };
      this.view.popUpCancelEdits.btnPopUpDelete.onClick = function() {
        scopeObj.editPopupYesClickHandler();
      };
      this.view.popUpCancelEdits.flxPopUpClose.onClick = function() {
        scopeObj.view.flxEditCancelConfirmation.isVisible = false;
      };
      this.view.subHeader.tbxSearchBox.onBeginEditing = function () {
        scopeObj.view.subHeader.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
        scopeObj.view.flxAppFilterContainer.setVisibility(true);
      };
      this.view.subHeader.tbxSearchBox.onEndEditing = function () {
        scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
      };
      this.view.subHeader.tbxSearchBox.onKeyUp = function () {
        if(scopeObj.view.subHeader.tbxSearchBox.text === ""){
          scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
          //scopeObj.view.flxAppFilterContainer.setVisibility(false);
        }
        else{
          scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
          scopeObj.view.flxAppFilterContainer.setVisibility(true);
        }
        var text = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);
        if(text){
          scopeObj.mapSCAScenarios(scopeObj.scaScenariosList.filter(function(rec){
            return ((rec.actionName.toLowerCase().indexOf(text.toLowerCase())>=0) ||
                    (rec.featureName.toLowerCase().indexOf(text.toLowerCase())>=0));
          }));
          if(scopeObj.view.segMFAScenarios.data.length>0){
            scopeObj.view.rtxNoResultsFound.isVisible = false;
            scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.NoResultsFound");          
          }else{
            scopeObj.view.rtxNoResultsFound.isVisible = true;
            scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.NoResultsFound");            
          }
          scopeObj.mfaSegDataList = scopeObj.view.segMFAScenarios.data;
          scopeObj.inFilter = false;
          scopeObj.view.statusFilterMenu2.segStatusFilterDropdown.selectedIndices = [[ 0,[0,1]]];
        }else{
          scopeObj.mfaSegDataList = scopeObj.scaScenariosList;
          if(scopeObj.mfaSegDataList.length==0){
            scopeObj.view.rtxNoResultsFound.isVisible = true;
            scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.NoResultsFound");            
          }
          scopeObj.performStatusFilter();
          scopeObj.view.subHeader.flxClearSearchImage.isVisible = false;
        }
      };
      this.view.subHeader.flxClearSearchImage.onClick = function(){
        scopeObj.view.subHeader.tbxSearchBox.text = "";
        scopeObj.view.subHeader.flxClearSearchImage.isVisible = false;
        scopeObj.view.subHeader.tbxSearchBox.onKeyUp();
      };
      this.view.breadcrumbs.btnBackToMain.onClick = function() {
        scopeObj.showMFAScenarios();
        scopeObj.presenter.fetchSCAScenarios({});
      };
      this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = this.onTypeFilterSelection.bind(this);
      this.view.txtSubject.onBeginEditing = function(){
        scopeObj.view.flxSubject.skin = "sknflxffffffop100Border006ccaRadius3px";
      };
      this.view.txtSubject.onEndEditing = function(){        
        scopeObj.view.flxSubject.skin = "sknflxffffffop100Bordercbcdd1Radius3px";
      };
      this.view.flxAppFilterContainer.onClick = function() {
        /*if(scopeObj.view.flxApplicationsFilter.isVisible){
          scopeObj.view.flxApplicationsFilter.setVisibility(false);
        }*/
        if(scopeObj.view.flxProductStatusFilter.isVisible){
          scopeObj.view.flxProductStatusFilter.setVisibility(false);
        }
        if(scopeObj.view.statusFilterMenu.isVisible){
          scopeObj.view.statusFilterMenu.setVisibility(false);
        }else
          scopeObj.view.statusFilterMenu.setVisibility(true);
        
        scopeObj.view.statusFilterMenu.right = "8px";
        scopeObj.view.statusFilterMenu.top = "104px";
        scopeObj.view.forceLayout();
      };
      this.view.flxHeaderStatus.onClick = function() {
        /*if(scopeObj.view.flxAppFilterContainer.isVisible){
          scopeObj.view.flxAppFilterContainer.isVisible=false;
        }*/
        var flxRight = scopeObj.view.flxHeaderPermissions.frame.width - scopeObj.view.flxHeaderStatus.frame.x - scopeObj.view.flxHeaderStatus.frame.width;
        var iconRight = scopeObj.view.flxHeaderStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
        scopeObj.view.flxProductStatusFilter.right = (flxRight + iconRight - 10) +"px";
        if(scopeObj.view.statusFilterMenu.isVisible)
          scopeObj.view.statusFilterMenu.setVisibility(false);
        if(scopeObj.view.flxApplicationsFilter.isVisible){
          scopeObj.view.flxApplicationsFilter.setVisibility(false);
        }
        if(scopeObj.view.flxProductStatusFilter.isVisible){
          scopeObj.view.flxProductStatusFilter.setVisibility(false);
        }else{
          scopeObj.view.flxProductStatusFilter.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.flxApplicationName.onClick = function(){
        var flxRight = scopeObj.view.flxHeaderPermissions.frame.width - scopeObj.view.flxApplicationName.frame.x - scopeObj.view.flxApplicationName.frame.width;
        var iconRight = scopeObj.view.flxApplicationName.frame.width - scopeObj.view.fontIconApplicationFilter.frame.x;
        if(scopeObj.view.statusFilterMenu.isVisible)
          scopeObj.view.statusFilterMenu.setVisibility(false);
        if(scopeObj.view.flxProductStatusFilter.isVisible){
          scopeObj.view.flxProductStatusFilter.setVisibility(false);
        }
        if(scopeObj.view.flxApplicationsFilter.isVisible){
          scopeObj.view.flxApplicationsFilter.setVisibility(false);
        }else{
          scopeObj.view.flxApplicationsFilter.setVisibility(true);
          scopeObj.view.forceLayout();
        }
        scopeObj.view.flxApplicationsFilter.right = (flxRight + iconRight-scopeObj.view.applicationsFilterMenu.imgUpArrow.frame.x+5) +"px";
        scopeObj.view.forceLayout();
      };
      this.view.applicationsFilterMenu.segStatusFilterDropdown.onRowClick = function(){
        scopeObj.performApplicationFilter();
      };
      this.view.statusFilterMenu2.segStatusFilterDropdown.onRowClick=function(){
        scopeObj.performStatusFilter();
      };
      this.view.flxScenarioName.onClick = function() {
        if(scopeObj.view.flxProductStatusFilter.isVisible){
          scopeObj.view.flxProductStatusFilter.setVisibility(false);
        }
        var flxRight = scopeObj.view.flxHeaderPermissions.frame.width - scopeObj.view.flxScenarioName.frame.x - scopeObj.view.flxScenarioName.frame.width;
        var iconRight = scopeObj.view.flxScenarioName.frame.width - scopeObj.view.fontIconScenarioTypeFilter.frame.x;
        scopeObj.view.statusFilterMenu.right = (flxRight + iconRight-10) +"px";
        if(scopeObj.view.flxProductStatusFilter.isVisible){
          scopeObj.view.flxProductStatusFilter.setVisibility(false);
        }
        if(scopeObj.view.flxApplicationsFilter.isVisible){
          scopeObj.view.flxApplicationsFilter.setVisibility(false);
        }
        if(scopeObj.view.statusFilterMenu.isVisible){
          scopeObj.view.statusFilterMenu.setVisibility(false);
        }else{
          scopeObj.view.statusFilterMenu.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.smsVariableReferencesMenu.segOptionsDropdown.onRowClick = function(){
        scopeObj.view.smsVariableReferencesMenu.isVisible = false;
        var cursorPos;
        var strLength;
        var data = scopeObj.view.smsVariableReferencesMenu.segOptionsDropdown.data[scopeObj.view.smsVariableReferencesMenu.segOptionsDropdown.selectedRowIndex[1]];        
        cursorPos = document.getElementById("frmMFAScenarios_txtSMSContent").selectionStart;
        strLength = scopeObj.view.txtSMSContent.text.length;
        scopeObj.view.txtSMSContent.text = 
          scopeObj.view.txtSMSContent.text.substring(0, cursorPos) +
          "[#]" + data.lblIdName + "[/#]" +
          scopeObj.view.txtSMSContent.text.substring(cursorPos, strLength);
      };
      this.view.emailVariableReferencesMenu.segOptionsDropdown.onRowClick = function(){
        scopeObj.view.emailVariableReferencesMenu.isVisible = false;
        var data = scopeObj.view.emailVariableReferencesMenu.segOptionsDropdown.data[scopeObj.view.emailVariableReferencesMenu.segOptionsDropdown.selectedRowIndex[1]];        
        document.getElementById("iframe_rtxMessage").contentWindow.document.execCommand("insertText", false, "[#]" + data.lblIdName + "[/#]");      
      };
      this.view.flxOptions.onClick = function(){
         scopeObj.toggleVisibilityFromView();
      };
      this.view.txtScenarioDescription.onKeyUp = function(){
        scopeObj.view.txtScenarioDescription.skin="skntbxLato35475f14px";
        scopeObj.view.flxNoDescriptionError.setVisibility(false); 
        if(scopeObj.view.txtScenarioDescription.text.length===0)
        {
          scopeObj.view.lblScenarioDescriptionSize.setVisibility(false);
        }
        else
        {
          scopeObj.view.lblScenarioDescriptionSize.text=scopeObj.view.txtScenarioDescription.text.length+"/300";
          scopeObj.view.lblScenarioDescriptionSize.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.txtScenarioDescription.onEndEditing = function(){
        scopeObj.view.lblScenarioDescriptionSize.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.mainHeader.btnDropdownList.onClick = function(){
        scopeObj.presenter.navigateToMFAConfigurations();
      }; 
    },
    toggleVisibilityFromView : function(){
      if (this.view.flxSelectOptionsView.isVisible){
        this.view.flxSelectOptionsView.isVisible = false;
        this.view.flxOptions.skin="slFbox";
      }
      
      else {
        if (CURRENT_SELECTION.statusId === STATUS_CONTANTS.active) {
          this.view.lblActOrDeact.text = kony.i18n.getLocalizedString("i18n.secureimage.NotEnforce");
          this.view.fontIconActOrDeact.text = "";
        }
        else{
          this.view.lblActOrDeact.text = kony.i18n.getLocalizedString("i18n.secureimage.Enforce");
          this.view.fontIconActOrDeact.text = "";
        }
        this.view.flxSelectOptionsView.left=(this.view.flxRightOptions.frame.x+this.view.flxOptions.frame.x-120)+"px";
        this.view.flxSelectOptionsView.isVisible = true;
        this.view.flxOptions.skin="sknflxffffffop100Border424242Radius100px";
      }
      this.view.forceLayout();
    },
    onTypeFilterSelection: function(){
      var self=this;
      var selInd;
      var selType=[];      
      this.view.statusFilterMenu.isVisible = false;
      var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
      FilterSel = indices;
      if (indices !== null) {
        selInd = indices[0][1];
        for(var i=0;i<selInd.length;i++){
          selType.push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].info);
        }
        SELECTED_FILTERS.type = selType;
        if(SELECTED_FILTERS.type.length === 2)
          self.inFilter = false;
        else
          self.inFilter = true;
        this.performStatusAppSearchFilter();
      }else{
        this.mapSCAScenarios([]);
        SELECTED_FILTERS.type = [];
        this.view.rtxNoResultsFound.isVisible = true;
        this.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
      }
    },
    showSelectedRow: function () {
      var index = this.view.segMFAScenarios.selectedIndex;
      var rowIndex = index[1];
      var data = this.view.segMFAScenarios.data;
      this.view.segMFAScenarios.setData(data);
      var segData = this.view.segMFAScenarios.data[rowIndex];
	  CURRENT_SELECTION.appId = segData.App_id;
      CURRENT_SELECTION.actionId = segData.Action_id;
      CURRENT_SELECTION.statusId = segData.Status_id;
      this.handleMFAViewClick();
      this.view.forceLayout();
    },
    processSCAScenariosForView: function (mfaScenarios) {
      var self=this;
      if (mfaScenarios && mfaScenarios instanceof Array && mfaScenarios.length > 0) {
        return mfaScenarios.map(function (rec, index) {
          var obj = Object.assign({}, rec);
          obj.lblServiceStatus = rec.Status_id === STATUS_CONTANTS.active ? {
            "text": kony.i18n.getLocalizedString("i18n.secureimage.Enforced"),
            "skin": "sknlblLato5bc06cBold14px"
          } : {
            "text": kony.i18n.getLocalizedString("i18n.secureimage.NotEnforced"),
            "skin": "sknlblLato5bc06cBold14px"
          };
          obj.fontIconStatusImg = rec.Status_id === STATUS_CONTANTS.active ?
            					{"skin" : "sknFontIconActivate"} : 
          						{"skin" : "sknfontIconInactive"} ;
          obj.lblIconOptions = {
            text: ""
          };
          obj.template = "flxSegMFAConfigs";
          obj.fontIconImgViewDescription = {
            text: "",
            visible: false
          };
          obj.flxOptions = {
            "onClick" : function(){self.toggleVisibility();},
            "skin" : "slFbox"
          };
                    obj.lblApplicationName = rec.appName;
                    obj.appId = rec.App_id;
                    obj.lblFeatureName = rec.featureName;
                    obj.lblAction = rec.risk_score + " of 10";
                    obj.lblScenarioType = rec.actionName;
                    obj.lblDescription = rec.Description;
                    obj.lblDescriptionTitle = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Description").toUpperCase();
                    obj.lblSeperator = ".";
          return obj;
        });
      }
      return [];
    },
    saveScreenY: function (widget, context) {
      mouseYCoordinate = context.screenY;
    },
    fixContextualMenu: function(heightVal) {
      if (((this.view.flxSelectOptions.frame.height + heightVal) > (this.view.flxSegmentMFAScenarios.frame.height)) && this.view.flxSelectOptions.frame.height < this.view.flxSegmentMFAScenarios.frame.height) {
        this.view.flxSelectOptions.top = ((heightVal - this.view.flxSelectOptions.frame.height) - 28) + "px";
        this.view.flxUpArrowImage.setVisibility(false);
        this.view.flxDownArrowImage.setVisibility(true);
        this.view.flxOptionsMenuContainer.top = "0px";
      } else {
        this.view.flxSelectOptions.top = heightVal + "px";
        this.view.flxUpArrowImage.setVisibility(true);
        this.view.flxDownArrowImage.setVisibility(false);
        this.view.flxOptionsMenuContainer.top = "-1px";
      }
      this.view.forceLayout();
    },
    onDropDownsHoverCallback:function(widget,context){
      var self=this;
      var widgetId = widget.id;
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        self.view[widgetId].setVisibility(true);
       } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view[widgetId].setVisibility(false);
       }
      self.setOptionsVisibility(widgetId);
      self.view.forceLayout();
    },
    setOptionsVisibility : function(widgetId){
      var self = this;
      var skin = self.view[widgetId].isVisible ? "sknflxffffffop100Border424242Radius100px" : "slFbox";
      if(widgetId === "flxSelectOptionsView"){
        self.view.flxOptions.skin=skin;
      }
      else if(widgetId === "flxSelectOptions"){
        var data = self.view.segMFAScenarios.data;
        if(prevIndex !=-1){
          var tempDataPrev = data[prevIndex];
          tempDataPrev.flxOptions.skin = "slFbox";
          self.view.segMFAScenarios.setDataAt(tempDataPrev, prevIndex, 0);
        }
        var selectedIndex = self.view.segMFAScenarios.selectedRowIndex[1];
        var tempDataCurrent = data[selectedIndex];
        tempDataCurrent.flxOptions.skin =skin;
        self.view.segMFAScenarios.setDataAt(tempDataCurrent, selectedIndex, 0);
        prevIndex = selectedIndex;
      }
      self.view.forceLayout();
    },
    onDropDownsHoverCallbackLeave: function(widget,context){
      var self=this;
      var widgetId = widget.id;
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view[widgetId].setVisibility(false);
      }
      self.view.forceLayout();      
    },
    onVariableRefsDropDownsHoverCallback: function(widget,context){
      var self=this;
      var widgetId = widget.id;
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        self.view[widgetId].setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view[widgetId].setVisibility(false);
      }
      self.view.forceLayout();
    },
    toggleVisibility: function() {
      var selItems = this.view.segMFAScenarios.selectedItems[0];
      this.gblselIndex = this.view.segMFAScenarios.selectedIndex[1];
      var clckd_selectedRowIndex = this.view.segMFAScenarios.selectedRowIndex[1];
      kony.print("clckd_selectedRowIndex----" + JSON.stringify(clckd_selectedRowIndex));
      CURRENT_SELECTION.appId = selItems.App_id;
      CURRENT_SELECTION.actionId = selItems.Action_id;
      CURRENT_SELECTION.statusId = selItems.Status_id;
      if (this.view.flxSelectOptions.isVisible) {
        this.view.flxSelectOptions.setVisibility(false);
        this.view.forceLayout();
      } else {
        if (selItems.Status_id === STATUS_CONTANTS.active) {
          if (this.view.flxSelectOptions.isVisible === false) {
            this.gblsegRoles = clckd_selectedRowIndex;
            this.view.flxSelectOptions.setVisibility(true);
            this.view.forceLayout();
            this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.secureimage.NotEnforce");
            this.view.fonticonDeactive.text = "";

          }
        } else {
          if (this.view.flxSelectOptions.isVisible === false) {
            this.gblsegRoles = clckd_selectedRowIndex;
            this.view.flxSelectOptions.setVisibility(true);
            this.view.forceLayout();
            this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.secureimage.Enforce");
            this.view.fonticonDeactive.text = "";

          }
        }
        var templateArray = this.view.segMFAScenarios.clonedTemplates;
        var finalHeight = 0;
        for(var i = 0; i < clckd_selectedRowIndex; i++){
          finalHeight = finalHeight + templateArray[i].flxSegMFAConfigs.frame.height;
        }
        finalHeight = ((finalHeight + 85)-this.view.flxSegmentMFAScenarios.contentOffsetMeasured.y);
        this.fixContextualMenu(finalHeight);
      }
      this.setOptionsVisibility("flxSelectOptions");
      //       if (this.view.flxSelectOptions.isVisible)
      //         this.view.flxSelectOptions.isVisible = false;
      //       else
      //         this.view.flxSelectOptions.isVisible = true;
      //       this.view.forceLayout();
    },
    createSceanrioClickHandler: function(){
      ACTION = ACTION_CONFIG.create;
      if(this.featuresList.length===0){
        this.presenter.getFeaturesList({});
      }
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.Create_Multi_Factor_Authentication_Scenario");
      this.view.commonButtonsEditMFAConfig.btnSave.text = "CREATE";
      this.view.breadcrumbs.lblCurrentScreen.text = "NEW";
      this.view.lblMFAScenarioName.text = "Scenario Details";
      this.view.flxActionContainer.lbxActionType.setEnabled(true);
      this.view.flxDisableAction.setVisibility(false);
      this.view.flxActivityType.lbxActivityType.setEnabled(true);
      this.view.lstBoxSelectFeature.setEnabled(false);
      this.view.flxDisableFeature.setVisibility(true);
      this.view.lstBoxSelectApplication.setEnabled(true);
      this.view.flxDisableApplication.setVisibility(false);
      this.view.flxNonTransactional.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.flxCircleNonTransaction.skin = "sknCircleGrey";
      this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
      this.resetErrorState();
      this.showMFAScenarioEdit({
        "appId":"SELECT",
        "featureId":"SELECT",
        "featureName":"Select a feature",
        "actionType":"SELECT",
        "actionId":"SELECT",
//         "frequencyTypeId":"SELECT",
//         "frequencyValue":"",
        "mfaScenarioDescription":"",
//         "primaryMFATypeId":"SELECT",
//         "secondaryMFATypeId":"SELECT",
//         "smsText":"",
//         "emailSubject":"",
//         "emailBody":"",
           "riskScore": "00",
        "mfaScenarioStatusId":STATUS_CONTANTS.active
      });
      this.view.forceLayout();
    },
    handleMFAConfigEditClick:function(){
      ACTION = ACTION_CONFIG.edit;
      this.backToCallerView();
      
    },
    refreshMfaEdit : function(data){
      data=data[0];
      this.view.flxSelectOptions.isVisible = false;
      this.view.flxSelectOptionsView.isVisible = false;
      this.view.flxOptions.skin="slFbox";
      var segIndex = this.view.segMFAScenarios.selectedRowIndex[1];
      var segData = this.view.segMFAScenarios.data[segIndex];
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.Edit_Strong_Customer_Authentication_Scenario");
      this.view.commonButtonsEditMFAConfig.btnSave.text = "UPDATE";
      this.view.breadcrumbs.lblCurrentScreen.text = segData.Action_id.toUpperCase();
      this.view.lblMFAScenarioName.text = "Scenario Details";
      this.view.flxScenarioTypeSelection.setEnabled(false);
      this.view.flxActionContainer.lbxActionType.setEnabled(false);
      this.view.flxDisableAction.setVisibility(true);
      this.view.flxActivityType.lbxActivityType.setEnabled(false);
      this.view.lstBoxSelectFeature.setEnabled(false);
      this.view.lstBoxSelectApplication.setEnabled(false);
      this.view.flxDisableFeature.setVisibility(true);
      this.view.flxDisableApplication.setVisibility(true);
      this.view.flxMonetaryContainer.setEnabled(false);
      this.view.flxNonMonetaryContainer.setEnabled(false);
      this.resetErrorState();      
      this.showMFAScenarioEdit({
      "featureName": data.featureName,
                "featureId":data.featureId,
                //         "frequencyTypeId":data.frequencyType.frequencyTypeId,
                //         "frequencyTypeName":data.frequencyType.frequencyTypeName,
                //         "frequencyValue":data.frequencyType.frequencyValue,
                "mfaScenarioDescription": data.Description,
                //         "primaryMFATypeId":data.primaryMFATypeId,
                //         "secondaryMFATypeId":data.secondaryMFATypeId,
                //         "primaryMFAType":data.primaryMFATypeId=="SECURE_ACCESS_CODE"?data.mfaTypes.SECURE_ACCESS_CODE.mfaTypeName:data.mfaTypes.SECURITY_QUESTIONS.mfaTypeName,
                //         "secondaryMFAType":data.secondaryMFATypeId=="SECURE_ACCESS_CODE"?data.mfaTypes.SECURE_ACCESS_CODE.mfaTypeName:data.mfaTypes.SECURITY_QUESTIONS.mfaTypeName,
                //         "smsText":data.smsText,
                //         "emailSubject":data.emailSubject,
                //         "emailBody":data.emailBody,
                "mfaScenarioStatusId": data.Status_id,
                "actionId": data.Action_id,
                "actionName": data.actionName,
                "actionType": data.actionType,
                "riskScore": data.risk_score,
                "appId": data.App_id
      });
    },
    showMFAScenarioEdit: function(data){
      var scopeobj = this;
      mfaScenarioState = Object.assign({},{},data);
      this.view.flxMFANotification.setVisibility(false);
      this.isScaRiskAssessmentEnable ? this.view.flxRiskScoreNew.isVisible = true : this.view.flxRiskScoreNew.isVisible = false;
      this.hideTemplateOptions();
      this.view.mainHeader.btnAddNewOption.isVisible = false;
      this.view.mainHeader.btnDropdownList.setVisibility(false);
      this.view.flxValue.isVisible = false; 
      this.view.lstBoxSelectFeature.masterData=[[mfaScenarioState.featureId,mfaScenarioState.featureName]];
      this.view.lstBoxSelectFeature.selectedKey = mfaScenarioState.featureId;
      this.view.lblRiskScoreValue.text = mfaScenarioState.riskScore;
      //this.view.lbxActivityType.selectedKey = mfaScenarioState.serviceId;
      this.view.lstBoxSelectApplication.selectedKey = mfaScenarioState.appId;
      this.view.lbxFrequency.selectedKey = mfaScenarioState.frequencyTypeId;
      this.view.lbxChallengePrimary.selectedKey = mfaScenarioState.primaryMFATypeId;
      this.view.lbxChallengeBackup.selectedKey = mfaScenarioState.secondaryMFATypeId;
      this.view.tbxEnterValue.text = mfaScenarioState.frequencyValue;
      this.view.txtScenarioDescription.text = mfaScenarioState.mfaScenarioDescription;
      this.view.txtSMSContent.text = mfaScenarioState.smsText;
      this.view.txtSubject.text = mfaScenarioState.emailSubject;
      this.view.flxTransactional.hoverSkin="sknCursorDisabled";
      this.view.flxNonTransactional.hoverSkin="sknCursorDisabled";
      this.view.flxTransactional.setEnabled(false);
      this.view.flxNonTransactional.setEnabled(false);
      var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
      messageDocument.getElementById("editor").innerHTML = mfaScenarioState.emailBody;
      if(mfaScenarioState.emailBody==="")
        messageDocument.querySelector("#editor").dataset.text ="Content to Be Sent Via Email";
      messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";

      if(mfaScenarioState.actionType === "MONETARY"){
        this.transactionTypeClick();
        this.view.flxNonTransactional.skin = "sknTbxDisabledf3f3f3";
        this.view.flxCircleNonTransaction.skin = "sknflxBgE1E5EERadiusCircular";
        this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
        this.view.flxCircleNonTransaction.hoverSkin = "sknCircleGreyDisabled";
        this.view.flxNonTransactional.hoverSkin="sknCursorDisabled";
        this.view.lblNonTransactional.hoverSkin = "sknlblLat485c7513pxDisabledCursor";
        this.view.lblTransactional.skin = "sknlblLato485c7514px";
        this.view.lblTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.flxNonTransactional.setEnabled(false);
      }else if(mfaScenarioState.actionType === "NON_MONETARY"){
        this.nonTransactionTypeClick();
        this.view.flxTransactional.skin = "sknTbxDisabledf3f3f3";
        this.view.flxCircleTransaction.skin = "sknflxBgE1E5EERadiusCircular";
        this.view.flxCircleTransaction.hoverSkin = "sknCircleGreyDisabled";
        this.view.lblTransactional.skin = "sknlblLato485c7514px";
        this.view.lblTransactional.hoverSkin = "sknlblLat485c7513pxDisabledCursor";
        this.view.lblTransactional.skin = "sknlblLato485c7514px";
        this.view.lblTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
        this.view.lblNonTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.flxTransactional.hoverSkin="sknCursorDisabled";
        this.view.flxTransactional.setEnabled(false);
      }else{
        this.view.flxTransactional.skin = "slFbox";
        this.view.flxCircleTransaction.skin = "sknCircleGrey";
        this.view.flxNonTransactional.skin = "slFbox";
        this.view.flxCircleNonTransaction.skin = "sknCircleGrey";
        this.view.lblTransactional.skin = "sknlblLato485c7514px";
        this.view.lblTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
        this.view.lblNonTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.flxActivityType.isVisible = false;
        this.view.flxActionContainer.isVisible = false;
        this.view.flxFrequency.isVisible = false;
        this.view.flxValue.isVisible = false;
        this.view.flxScenarioType.isVisible=false;
        this.view.flxSelectScenarioType.isVisible = true;
      }
      //this.view.lblMFAConfigStatus.text = mfaScenarioState.mfaScenarioStatusId === STATUS_CONTANTS.active ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive");
      this.view.lbxActionType.masterData =mfaScenarioState.actionId!=="SELECT"?[[mfaScenarioState.actionId,mfaScenarioState.actionName]]:[["SELECT","Select an action"]];
      this.view.switchMFAConfigStatus.selectedIndex = mfaScenarioState.mfaScenarioStatusId === STATUS_CONTANTS.inactive ? 1 : 0;
     if(mfaScenarioState.mfaScenarioStatusId === STATUS_CONTANTS.inactive) {
       this.view.unChkEnforceSCA.isVisible=true ;
       this.view.chkEnforceSCA.isVisible=false;
     } else {
       this.view.unChkEnforceSCA.isVisible=false ;
       this.view.chkEnforceSCA.isVisible=true;
     }
      this.view.flxMFAScenarios.isVisible = false;
      this.view.flxViewMFAScenario.isVisible = false;
      this.view.flxEditMFAScenario.isVisible = true;
      this.view.flxMainSubHeader.isVisible = false;
      this.view.flxBreadcrumb.isVisible = true;
      this.view.lbxFrequency.onSelection(this.view.lbxFrequency);
      this.changeMessageTemplateDisplay();
      this.view.flxEditContent.scrollToWidget(this.view.flxRowHeader);
      this.view.forceLayout();
    },
    handleMFAViewClick: function(){
      
      ACTION = ACTION_CONFIG.view;
      this.backToCallerView();
    },
    showMFAScenarioView: function(data){
      this.isScaRiskAssessmentEnable ? this.view.details2.flxColumn2.isVisible=true : this.view.details2.flxColumn2.isVisible=false;
      NAVIGATE_FLAG = "view";
      mfaScenarioState = Object.assign({},{},data);
      CURRENT_SELECTION.statusId = mfaScenarioState.mfaScenarioStatusId;
      this.view.lblServiceStatus.skin = mfaScenarioState.mfaScenarioStatusId === STATUS_CONTANTS.active ? "sknlblLato5bc06cBold14px":"sknlblLatocacacaBold12px";
      this.view.fontIconStatusImg.skin = mfaScenarioState.mfaScenarioStatusId === STATUS_CONTANTS.active ?"sknFontIconActivate":"sknfontIconInactive";
      var statusText = mfaScenarioState.mfaScenarioStatusId===STATUS_CONTANTS.active?kony.i18n.getLocalizedString("i18n.secureimage.Enforced"):kony.i18n.getLocalizedString("i18n.secureimage.NotEnforced");
      this.view.lblServiceStatus.text=statusText;
      this.view.details.lblData1.text= mfaScenarioState.appName;
      this.view.details.lblData2.text= mfaScenarioState.featureName;
      var scenarioTypetext = mfaScenarioState.actionType.toLowerCase();
      this.view.details.lblData3.text= scenarioTypetext==="monetary"?"Monetary":"Non-Monetary";
      this.view.details2.lblData1.text= mfaScenarioState.actionName;
      this.view.details2.lblData2.text= mfaScenarioState.riskScore+" of 10";
//       this.view.details2.lblIconData3.setVisibility(true);
//       this.view.details2.lblIconData3.text="";
      this.view.details2.lblData3.text= statusText;
      this.view.lblDescVal.text= mfaScenarioState.mfaScenarioDescription;
      this.view.details3.lblData1.text= mfaScenarioState.primaryMFAType;
      this.view.details3.lblData2.text= mfaScenarioState.secondaryMFAType;
      this.view.lblSmsContent.text= mfaScenarioState.smsText;
      this.view.lblSubjectEmailContent.text= kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblSubject")+" "+mfaScenarioState.emailSubject;
    // Assign Email body to rtxViewer
      if(document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer")) {
        document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML = mfaScenarioState.emailBody;
      } else {
        if(!document.getElementById("iframe_rtxViewer").newOnload) {
          document.getElementById("iframe_rtxViewer").newOnload = document.getElementById("iframe_rtxViewer").onload;
        }
        document.getElementById("iframe_rtxViewer").onload = function() {
          document.getElementById("iframe_rtxViewer").newOnload();
          document.getElementById("iframe_rtxViewer").contentWindow.document.getElementById("viewer").innerHTML =mfaScenarioState.emailBody;
        };
      }
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.View_Multi_Factor_Authentication_Scenario");
      this.view.breadcrumbs.lblCurrentScreen.text = mfaScenarioState.actionName.toUpperCase();
      this.view.lblMFAViewHeading.text = mfaScenarioState.featureName.toUpperCase();
      this.view.flxBreadcrumb.isVisible = true;
      this.view.flxSelectOptionsView.setVisibility(false);
      this.view.flxOptions.skin="slFbox";
      this.view.flxMFANotification.setVisibility(false);
      this.view.mainHeader.btnAddNewOption.setVisibility(false);
      this.view.mainHeader.btnDropdownList.setVisibility(false);
      this.view.flxViewMFAScenario.setVisibility(true);
      this.view.flxMFAScenarios.setVisibility(false);
      /* 1)If service type is "transactional" and frequency is "Always" no need to show "Value Above" field.
         2) If service type is "non transactional" then no need to show "Frequency" and "Value Above" field. 
         3)If mfa type is not secure access code no need to show template fields.*/
      if (mfaScenarioState.actionType === "MONETARY" && mfaScenarioState.frequencyTypeId == "ALWAYS") {
        this.view.flxViewRow2.setVisibility(true);
        this.view.details2.flxColumn3.setVisibility(false);
      }  else if(mfaScenarioState.actionType==="NON_MONETARY"){
        this.view.flxViewRow2.setVisibility(true);
      }
      else{
        this.view.flxViewRow2.setVisibility(true);
        
      }
      if (mfaScenarioState.primaryMFATypeId === "SECURE_ACCESS_CODE" || mfaScenarioState.secondaryMFATypeId === "SECURE_ACCESS_CODE") {
        this.showTemplateOptionsForView();
      } else {
        this.hideTemplateOptionsForView();
      }
      
      this.view.forceLayout();
    },
    showTemplateOptionsForView: function(){
      this.view.lblMfaChallengeTypeSubHeader.setVisibility(true);
      this.view.flxViewRow4.setVisibility(true);
      this.view.flxViewRow5.setVisibility(true);
      this.view.flxViewRow6.setVisibility(true);
    },
    hideTemplateOptionsForView: function(){
      this.view.lblMfaChallengeTypeSubHeader.setVisibility(false);
      this.view.flxViewRow4.setVisibility(false);
      this.view.flxViewRow5.setVisibility(false);
      this.view.flxViewRow6.setVisibility(false);
    },
    showMFAScenarios: function(){
      this.view.subHeader.tbxSearchBox.text = "";
      this.view.subHeader.flxClearSearchImage.isVisible = false;
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.StrongCustomerAuthentication");
      this.view.flxMFAScenarios.isVisible = true;
      this.view.flxEditMFAScenario.isVisible = false;
      this.view.flxViewMFAScenario.isVisible = false;
      this.view.flxMainSubHeader.isVisible = true;
      this.view.flxBreadcrumb.isVisible = false;
      this.view.mainHeader.btnAddNewOption.isVisible = true;
      if(this.featuresList&&this.featuresList.length===0){
        this.view.flxMFANotification.setVisibility(true);
        this.view.flxMFAScenarios.top="55px";
      }else
        this.view.flxMFAScenarios.top="0px";
      this.view.mainHeader.btnDropdownList.setVisibility(false);
    },
    transactionTypeClick : function(){
      mfaScenarioState = Object.assign({}, mfaScenarioState, {
        actionType:"MONETARY"
      });
      this.view.flxTransactional.skin = "sknFlx006CCA0pxRad";
      this.view.flxCircleTransaction.skin = "sknCircleBlue";
      this.view.lblTransactional.skin = "lblfffffflatoregular14px";

      this.view.flxNonTransactional.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.flxCircleNonTransaction.skin = "sknCircleGrey";
      this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
      this.view.flxFrequency.setVisibility(false);
      var masterData=this.view.lbxActionType.info;
      var filteredData=[];
      if(ACTION === ACTION_CONFIG.create){
      for(var i=0;i<masterData.length;i++){
        if(masterData[i][2]==="MONETARY")
          filteredData.push(masterData[i]);
      }
      this.view.lbxActionType.masterData=[["SELECT","Select an Action"]].concat(filteredData);
      }
      this.view.flxActionContainer.isVisible = true;
      this.view.flxScenarioType.isVisible=true;
      this.view.flxSelectScenarioType.isVisible = false;
      this.view.forceLayout();
    },
    nonTransactionTypeClick : function(){
      mfaScenarioState = Object.assign({}, mfaScenarioState, {
        actionType:"NON_MONETARY"
      });
      this.view.flxNonTransactional.skin = "sknFlx006CCA0pxRad";
      this.view.flxCircleNonTransaction.skin = "sknCircleBlue";
      this.view.lblNonTransactional.skin = "lblfffffflatoregular14px";

      this.view.flxTransactional.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.flxCircleTransaction.skin = "sknCircleGrey";
      this.view.lblTransactional.skin = "sknlblLato485c7514px";
      this.view.flxFrequency.setVisibility(false);
      var masterData=this.view.lbxActionType.info;
      var filteredData=[];
      if(ACTION === ACTION_CONFIG.create){
      for(var i=0;i<masterData.length;i++){
        if(masterData[i][2]==="NON_MONETARY")
          filteredData.push(masterData[i]);
      }
      this.view.lbxActionType.masterData=[["SELECT","Select an Action"]].concat(filteredData);
      }
      this.view.flxActionContainer.isVisible = true;
      this.view.flxScenarioType.isVisible=true;
      this.view.flxSelectScenarioType.isVisible = false;
      this.view.forceLayout();
    },
    getRelatedActions: function(context){
      this.presenter.getSCAAction(context);
    },
    changeMessageTemplateDisplay: function(){
      if(mfaScenarioState.primaryMFATypeId === "SECURE_ACCESS_CODE" || mfaScenarioState.secondaryMFATypeId === "SECURE_ACCESS_CODE"){
        this.showTemplateOptions();
      }else{
        this.hideTemplateOptions();
      }
    },
    showTemplateOptions: function(){
      this.view.lblMessageContentTemplateTitle.isVisible = true;
      this.view.lblMessageContentTemplateNote.isVisible = true;
      this.view.flxRow6.isVisible = true;
      this.view.flxRow7.isVisible = true;
    },
    hideTemplateOptions: function(){
      this.view.lblMessageContentTemplateTitle.isVisible = false;
      this.view.lblMessageContentTemplateNote.isVisible = false;
      this.view.flxRow6.isVisible = false;
      this.view.flxRow7.isVisible = false;
    },
    handleCreateUpdateScenario: function(){
	  var messageText = document.getElementById("iframe_rtxMessage").contentWindow.document.getElementById("editor").innerHTML;
      mfaScenarioState = Object.assign({}, mfaScenarioState, {
        appId:this.view.lstBoxSelectApplication.selectedKey,
        featureId:this.view.lstBoxSelectFeature.selectedKey,
        actionId:this.view.lbxActionType.selectedKey,
        frequencyValue:this.view.tbxEnterValue.text,
        mfaScenarioDescription:this.view.txtScenarioDescription.text,
        smsText:this.view.txtSMSContent.text,
        emailSubject:this.view.txtSubject.text,
        emailBody:messageText,
        frequencyTypeId: this.view.lbxFrequency.selectedKey,
        riskScore: this.view.lblRiskScoreValue.text,
        mfaScenarioStatusId: (CURRENT_SELECTION.statusId == "" ? "SID_ACTIVE" : CURRENT_SELECTION.statusId)
      });
      if(this.isValidPayload(mfaScenarioState)){
        if(ACTION === ACTION_CONFIG.create){
          this.presenter.createSCAScenario(mfaScenarioState);
        }else{
          ACTION = ACTION_CONFIG.view;
          this.presenter.updateSCAScenario(mfaScenarioState);       
        }
      }
    },
    editPopupCancelClickHandler:function(){
      this.view.flxEditCancelConfirmation.isVisible = false;
    },
    editPopupYesClickHandler:function(){
      this.view.flxEditCancelConfirmation.isVisible = false;
      if(NAVIGATE_FLAG !== "view"){
     	this.showMFAScenarios();
      }
      else{
		  this.view.flxViewMFAScenario.setVisibility(true);
          this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmMFAScenarios.View_Multi_Factor_Authentication_Scenario");
      
      }
      
    },
    /**
   * Called when clicked on activate.deactivate option from options menu.
   */
    handleSCAActivateDeactivateClick: function() {
      var scopeObj = this;
      this.view.flxSelectOptions.isVisible = false;
      this.view.flxSelectOptionsView.isVisible = false;
      this.view.flxOptions.skin="slFbox";
      var segIndex = this.view.segMFAScenarios.selectedRowIndex[1];
      var segData = this.view.segMFAScenarios.data[segIndex];
      if(ACTION!==ACTION_CONFIG.view){
      Object.assign(mfaScenarioState, {  
        "featureId": segData.featureId,
        "actionType": segData.actionType,
        "actionId": segData.Action_id,
//         "frequencyTypeId": segData.frequencyType.frequencyTypeId,
//         "frequencyValue": segData.frequencyType.frequencyValue,
        "mfaScenarioDescription": segData.Description,
//         "primaryMFATypeId": segData.primaryMFATypeId,
//         "secondaryMFATypeId": segData.secondaryMFATypeId,
//         "smsText": segData.smsText,
//         "emailSubject": segData.emailSubject,
//         "emailBody": segData.emailBody,
        "mfaScenarioStatusId": segData.Status_id,
        "appActionId": segData.Action_id,
        "riskScore": segData.risk_score,
        "appId": segData.appId
        //"appActionMFAId": segData.appActionMFAId
      });
      }
      if (CURRENT_SELECTION.statusId === STATUS_CONTANTS.active) {
        var heading = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.deactivate_popup_header") + " " + '"'+ segData.Action_id + '"' + "?";
        var msg = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.deactivate_popup_content") + '"'+ segData.Action_id + '"' + ".";
        var yesText = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.YES_DEACTIVATE");
        var cancelText = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.NO_LEAVE_AS_IS");
        this.showAlertPopup(heading,msg,cancelText,yesText,function(){
          mfaScenarioState.mfaScenarioStatusId = STATUS_CONTANTS.inactive;
          scopeObj.presenter.updateSCAScenario(mfaScenarioState,"Status Update");        
        });
      } else {
        var heading = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.activate_popup_header") + '"'+ segData.Action_id + '"' + "?";
        var msg = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.activate_popup_content") + '"'+ segData.Action_id + '"' + ".";
        var yesText = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.YES_Activate");
        var cancelText = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.NO_LEAVE_AS_IS");
        this.showAlertPopup(heading,msg,cancelText,yesText,function(){
          mfaScenarioState.mfaScenarioStatusId = STATUS_CONTANTS.active;
          scopeObj.presenter.updateSCAScenario(mfaScenarioState,"Status Update");   
        });
      }
    },
    handleMFAScenarioDeleteClick: function(){
      var scopeObj = this;
      this.view.flxSelectOptions.isVisible = false;  
      var heading = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.delete_popup_header");
      var msg = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.delete_popup_content");
      var yesText = kony.i18n.getLocalizedString("i18n.frmSCAScenarios.YES_DELETE");
      var cancelText = kony.i18n.getLocalizedString("i18n.frmSCAConfigurations.NO_LEAVE_AS_IS");
      NAVIGATE_FLAG = "main";
      this.showAlertPopup(heading,msg,cancelText,yesText,function(){
        
        var segIndex = scopeObj.view.segMFAScenarios.selectedRowIndex[1];
        var segData = scopeObj.view.segMFAScenarios.data[segIndex];
        scopeObj.presenter.deleteSCAScenario({  
          "actionId":segData.Action_id,
          "appId":segData.App_id
        });        
      });            
    },
    showAlertPopup: function(headerMsg,contentMsg,cancelText,yesText,yesCallback){
      var scopeObj = this;
      this.view.popUpCancelEdits.lblPopUpMainMessage.text = headerMsg;
      this.view.popUpCancelEdits.rtxPopUpDisclaimer.text = contentMsg;
      this.view.popUpCancelEdits.btnPopUpCancel.text = cancelText;
      this.view.popUpCancelEdits.btnPopUpDelete.text = yesText;        
      this.view.popUpCancelEdits.btnPopUpDelete.onClick = function(){
        scopeObj.view.flxEditCancelConfirmation.isVisible = false;
        yesCallback();
      };
      this.view.flxEditCancelConfirmation.isVisible = true;
      this.view.popUpCancelEdits.forceLayout();
    },
    setStatusFilterData:function(data){
      var self=this;
      var maxSizeText="";
      var widgetMap = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
      };
      var filterData = data.map(function(item){
        maxSizeText= maxSizeText.length<item.length?item:maxSizeText;
        return{
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "lblDescription": item,
          "imgCheckBox":{
            "src":"checkbox.png"
          }
        };
      });
      self.view.statusFilterMenu2.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.statusFilterMenu2.segStatusFilterDropdown.setData(filterData);
      self.view.flxProductStatusFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+57+"px";
      var indices = [];
      for(var index = 0; index < filterData.length; index++){
        indices.push(index);
      }
      self.view.statusFilterMenu2.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    },
    setTypeFilterData:function(data){
      var self=this;
      var maxSizeText="Monetary";
      var widgetMap = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription"
      };
      var filterData = data.map(function(item){
        if(item!=="MONETARY"&&maxSizeText!=="Non-Monetary")
          maxSizeText="Non-Monetary";
        return{
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "lblDescription": item==="MONETARY"?"Monetary":"Non-Monetary",
          "info":item,
          "imgCheckBox":{
            "src":"checkbox.png"
          }
        };
      });
      self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.statusFilterMenu.segStatusFilterDropdown.setData(filterData);
      self.view.statusFilterMenu.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+65+"px";
      var indices = [];
      for(var index = 0; index < filterData.length; index++){
        indices.push(index);
      }
      self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    },
    setApplicationsFilterData:function(data){
      var self=this;
      var maxSizeText="";
      SELECTED_FILTERS.app=[];
      var widgetMap = {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "imgCheckBox",
        "lblDescription": "lblDescription",
      };
      var filterData = data.map(function(item){
        SELECTED_FILTERS.app.push(item);
        maxSizeText=maxSizeText.length<item.length?item:maxSizeText;
        return{
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": "flxCheckBox",
          "lblDescription": item,
          "imgCheckBox":{
            "src":"checkbox.png"
          }
        };
      });
      self.view.applicationsFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
      self.view.applicationsFilterMenu.segStatusFilterDropdown.setData(filterData);
      self.view.flxApplicationsFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+60+"px";
      var indices = [];
      for(var index = 0; index < filterData.length; index++){
        indices.push(index);
      }
      self.view.applicationsFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
    },
    performStatusFilter: function () {
      var self = this;
      var selStatus = [];
      var selInd;
      var dataToShow = [];
      var indices = self.view.statusFilterMenu2.segStatusFilterDropdown.selectedIndices;
      if (indices !== null) {
        selInd = indices[0][1];
        for(var i=0;i<selInd.length;i++){
          selStatus.push(self.view.statusFilterMenu2.segStatusFilterDropdown.data[selInd[i]].lblDescription);
        }
        SELECTED_FILTERS.status = selStatus;
        if(SELECTED_FILTERS.status.length === 2)
          self.inFilter = false;
        else
          self.inFilter = true;
        this.performStatusAppSearchFilter();
      }else{
        this.mapSCAScenarios([]);
        SELECTED_FILTERS.status = [];
        this.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
      }
    },
    performApplicationFilter: function () {
      var self = this;
      var selApps = [];
      var selInd;
      var dataToShow = [];
      var indices = self.view.applicationsFilterMenu.segStatusFilterDropdown.selectedIndices;
      if (indices !== null) {
        selInd = indices[0][1];
        for(var i=0;i<selInd.length;i++){
          selApps.push(self.view.applicationsFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
        }
        SELECTED_FILTERS.app = selApps;
        if(SELECTED_FILTERS.app.length === self.view.applicationsFilterMenu.segStatusFilterDropdown.data.length)
          self.inFilter = false;
        else
          self.inFilter = true;
        this.performStatusAppSearchFilter();
      }else{
        self.inFilter = true;
        this.mapSCAScenarios([]);
        SELECTED_FILTERS.app = [];
        this.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
      }
    },
    performStatusAppSearchFilter: function(){
      var self = this;
      var data = Array.from(this.mfaSegDataList);        
      /*Applying type Filter*/
		if(SELECTED_FILTERS.type!==""){
	         data = data.filter(function(rec){
	           if(SELECTED_FILTERS.type.indexOf(rec.actionType) >=0 ){
	             return rec;
	           }else
				 this.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
	         });
	       }
       // this.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");   
      /*Applying Status Filter*/
     // var segStatusData = self.view.statusFilterMenu2.segStatusFilterDropdown.data;
     /* if (SELECTED_FILTERS.status.length === segStatusData.length) { //all are selected
      } else {*/
        data = data.filter(function(rec){
          if(SELECTED_FILTERS.status.indexOf(rec.Status_id===STATUS_CONTANTS.active?
                                             kony.i18n.getLocalizedString("i18n.secureimage.Enforced"):
                                             kony.i18n.getLocalizedString("i18n.secureimage.NotEnforced")) >=0 ){
            return rec;
          }
        });
      //}
      /*Applying App Filter*/
       if(SELECTED_FILTERS.app !== undefined &&SELECTED_FILTERS.app !== ""){
         data = data.filter(function(rec){
           if(SELECTED_FILTERS.app.indexOf(rec.App_id) >=0 ){
             return rec;
           }
         });
       }
      this.mapSCAScenarios(data);
    },
    isValidPayload: function(data){
      this.resetErrorState();
      var valid = true;
      if(data.appId === "SELECT"){
        this.view.lstBoxSelectApplication.skin = "redListBxSkin";
        this.view.lblErrorMsgApp.text= kony.i18n.getLocalizedString("i18n.frmMFAScenarios.select_app");
        this.view.flxApplicationError.isVisible = true;
        valid = false;
      }
      if(data.featureId === "SELECT"){
        this.view.lstBoxSelectFeature.skin = "redListBxSkin";
        this.view.flxErrorHeader.isVisible = true;
        valid = false;
      }
      if(this.view.flxCircleTransaction.skin==="sknCircleGrey"&&this.view.flxCircleNonTransaction.skin==="sknCircleGrey"){
        this.view.flxErrorScenarioType.isVisible = true;
          valid = false;
      }
      if(data.actionId === "SELECT"){
          this.view.lbxActionType.skin = "redListBxSkin";
          this.view.flxErrorAction.isVisible = true;
          valid = false;
      }
      if(data.actionType==="MONETARY"){
        if(data.frequencyTypeId === "SELECT"){
          this.view.lbxFrequency.skin = "redListBxSkin";
          this.view.flxErrorFrequency.isVisible = true;
          valid = false;
        }
        if(data.frequencyTypeId === "VALUE_BASED"){
          if(!data.frequencyValue|| data.frequencyValue<="0"|| data.frequencyValue>"999999999999"){
            this.view.tbxEnterValue.skin = "skinredbg";
            if(data.frequencyValue<="0"|| data.frequencyValue>"999999999999"){
              this.view.lblErrorMsgFrequencyValue.text="Please Enter valid value";
            }else
              this.view.lblErrorMsgFrequencyValue.text="Value cannot be empty";
            this.view.flxErrorFrequencyValue.isVisible = true;
            valid = false;
          }
        }
      }
      if(data.mfaScenarioDescription===""){
        this.view.txtScenarioDescription.skin = "skinredbg";
        this.view.flxNoDescriptionError.isVisible = true;
        valid = false;
      } else {
        var regEx = /^[0-9a-zA-Z ]+$/;
        if(!data.mfaScenarioDescription.match(regEx))
        {
          this.view.txtScenarioDescription.skin = "skinredbg";
          this.view.lblNoDescriptionError.text=kony.i18n.getLocalizedString("i18n.StopPayments.errormessages.InvalidDescription");
          this.view.flxNoDescriptionError.isVisible = true;
          valid = false;
        }
      }
//       if(data.primaryMFATypeId === "SELECT"){
//         this.view.lbxChallengePrimary.skin = "redListBxSkin";
//         this.view.flxErrorPrimary.isVisible = true;
//         valid = false;
//       }
//       if(data.secondaryMFATypeId === "SELECT"){
//         this.view.lbxChallengeBackup.skin = "redListBxSkin";
//         this.view.flxErrorBackup.isVisible = true;
//         valid = false;
//       }
//       if(data.primaryMFATypeId==="SECURE_ACCESS_CODE"){
//         if(!data.smsText){
//           this.view.txtSMSContent.skin = "skinredbg";
//           this.view.flxErrorSMSContent.isVisible = true;
//           valid = false;
//         }
//         if(!data.emailSubject){
//           this.view.flxErrorEmailSubject.isVisible = true;
//           valid = false;
//         }
//         if(!data.emailBody){
//           this.view.flxErrorEmailContent.isVisible = true;
//           valid = false;
//         }
//       }
      return valid;
    },
    resetErrorState: function(){
      this.view.lstBoxSelectApplication.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.lstBoxSelectFeature.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.lbxActivityType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.lbxActionType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.lbxFrequency.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.tbxEnterValue.skin = "sknTbxFFFFFFBorDEDEDE13pxKA";
      this.view.txtScenarioDescription.skin="skntxtAreaLato35475f14Px";
      this.view.lbxChallengePrimary.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.lbxChallengeBackup.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      this.view.txtSMSContent.skin = "sknTbxFFFFFFBorDEDEDE13pxKA";
      this.view.flxErrorHeader.isVisible = false;
      this.view.flxApplicationError.isVisible=false;
      this.view.flxErrorScenarioType.isVisible = false;
      this.view.flxErrorAction.isVisible = false;
      this.view.flxErrorFrequency.isVisible = false;
      this.view.flxErrorFrequencyValue.isVisible = false;
      this.view.flxNoDescriptionError.isVisible = false;
      this.view.flxErrorEmailSubject.isVisible = false;
      this.view.flxErrorEmailContent.isVisible = false;
      this.view.flxErrorSMSContent.isVisible = false;
      this.view.flxErrorMessageTemplate.isVisible = false;
      this.view.flxErrorPrimary.isVisible = false;
      this.view.flxErrorBackup.isVisible = false;
    },
    backToCallerView : function(){
      var scopeObj = this;
      var payload={
        "actionId" : CURRENT_SELECTION.actionId,
        "appId" : CURRENT_SELECTION.appId
      };
      this.presenter.fetchSCAScenariosById(payload);
      
    },
    refreshMfaView : function(viewData){
	  viewData=viewData[0];
      CURRENT_SELECTION.statusId = viewData.Status_id;
      this.showMFAScenarioView({
        "featureName":viewData.featureName,
        "featureId":viewData.featureId,
//         "frequencyTypeId":viewData.frequencyType.frequencyTypeId,
//         "frequencyTypeName":viewData.frequencyType.frequencyTypeName,
//         "frequencyValue":viewData.frequencyType.frequencyValue,
        "mfaScenarioDescription":viewData.Description,
//         "primaryMFATypeId":viewData.primaryMFATypeId,
//         "secondaryMFATypeId":viewData.secondaryMFATypeId,
//         "primaryMFAType":viewData.primaryMFATypeId=="SECURE_ACCESS_CODE"?viewData.mfaTypes.SECURE_ACCESS_CODE.mfaTypeName:viewData.mfaTypes.SECURITY_QUESTIONS.mfaTypeName,
//         "secondaryMFAType":viewData.secondaryMFATypeId=="SECURE_ACCESS_CODE"?viewData.mfaTypes.SECURE_ACCESS_CODE.mfaTypeName:viewData.mfaTypes.SECURITY_QUESTIONS.mfaTypeName,
//         "smsText":viewData.smsText,
//         "emailSubject":viewData.emailSubject,
//         "emailBody":viewData.emailBody,
        "mfaScenarioStatusId":viewData.Status_id,
        "actionId": viewData.Action_id,
        "actionName": viewData.actionName,
        "actionType": viewData.actionType,
        "appName":viewData.appName,
        "riskScore":viewData.risk_score,
        "appId":viewData.App_id
      });
    },
    resetSortImages: function() {
      var self = this;
      self.determineSortFontIcon(self.sortBy, 'lblFeatureName', this.view.fontIconSortFeature);
      self.determineSortFontIcon(self.sortBy, 'lblScenarioType', this.view.fontIconSortAction);
    },
    enableMFAScenarios : function(featureTypeActions){
      var isMonetary=false;
      var isNonMonetary=false;
      for(var i=0;i<featureTypeActions.length;i++){
        if(featureTypeActions[i].actionType==="MONETARY"){
          isMonetary=true;
        }else{
          isNonMonetary=true;
        }
      }
      if(isMonetary&&isNonMonetary){
        this.view.flxTransactional.skin = "slFbox";
        this.view.flxCircleTransaction.skin = "sknCircleGrey";
        this.view.flxNonTransactional.setEnabled(true);
        this.view.flxNonTransactional.skin = "slFbox";
        this.view.flxCircleNonTransaction.skin = "sknCircleGrey";
        this.view.flxTransactional.hoverSkin="sknCursor";
        this.view.flxNonTransactional.hoverSkin="sknCursor";
        this.view.lblTransactional.skin = "sknlblLato485c7514px";
        this.view.lblTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
        this.view.lblNonTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.flxTransactional.setEnabled(true);
      }else {
        if(isNonMonetary){
        mfaScenarioState = Object.assign({}, mfaScenarioState, {
          actionType:"NON_MONETARY"
        });
        this.view.flxNonTransactional.skin = "sknFlx006CCA0pxRad";
        this.view.flxCircleNonTransaction.skin = "sknCircleBlue";
        this.view.lblNonTransactional.skin = "lblfffffflatoregular14px";
        this.view.lblNonTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
        this.view.flxTransactional.skin = "sknTbxDisabledf3f3f3";
        this.view.flxCircleTransaction.skin = "sknflxBgE1E5EERadiusCircular";
        this.view.flxCircleTransaction.hoverSkin = "sknCircleGreyDisabled";
        this.view.lblTransactional.skin = "sknlblLato485c7514px";
        this.view.lblTransactional.hoverSkin = "sknlblLat485c7513pxDisabledCursor";
        this.view.flxTransactional.hoverSkin="sknCursorDisabled";
        this.view.flxTransactional.setEnabled(false);
        this.view.flxFrequency.setVisibility(false);
        this.view.flxNonTransactional.setEnabled(false);
      }
             if(isMonetary){
               mfaScenarioState = Object.assign({}, mfaScenarioState, {
                 actionType:"MONETARY"
               });
               this.view.flxTransactional.skin = "sknFlx006CCA0pxRad";
               this.view.flxCircleTransaction.skin = "sknCircleBlue";
               this.view.lblTransactional.skin = "lblfffffflatoregular14px";
               this.view.lblTransactional.hoverSkin = "sknLbl485c7513pxHoverCursorNew";
               this.view.flxNonTransactional.skin = "sknTbxDisabledf3f3f3";
               this.view.flxCircleNonTransaction.skin = "sknflxBgE1E5EERadiusCircular";
               this.view.lblNonTransactional.skin = "sknlblLato485c7514px";
               this.view.flxCircleNonTransaction.hoverSkin = "sknCircleGreyDisabled";
               this.view.flxNonTransactional.hoverSkin="sknCursorDisabled";
               this.view.lblNonTransactional.hoverSkin = "sknlblLat485c7513pxDisabledCursor";
               this.view.flxNonTransactional.setEnabled(false);
               this.view.flxFrequency.setVisibility(false);
               this.view.flxTransactional.setEnabled(false);
             }
             this.view.flxActionContainer.isVisible = true;
             this.view.flxValue.isVisible = false;
             this.view.flxScenarioType.isVisible=true;
             this.view.flxSelectScenarioType.isVisible = false;
            }
      var sortedDataObject=this.sortListBoxData(featureTypeActions, "actionId");
      this.view.lbxActionType.info=sortedDataObject.map(function(rec){return [rec.actionId,rec.actionName,rec.actionType];});
      this.view.lbxActionType.masterData = [["SELECT","Select an Action"]].concat(sortedDataObject.map(function(rec){return [rec.actionId,rec.actionName];}));
      this.view.forceLayout();
    },
    setFeaturesListboxData : function(featuresData){
     var sortedList=this.sortListBoxData(featuresData, "name");
      this.view.lstBoxSelectFeature.masterData = [["SELECT","Select a feature"]].concat(sortedList.map(function(rec){return [rec.featureId,rec.featureName];}));
      this.view.forceLayout();
    },
    setFilteredFeaturesData : function(){
      var allFeatures= this.featuresList;
      var selectedApp=this.view.lstBoxSelectApplication.selectedKey;
      var filteredFeatures=[];
      this.view.lstBoxSelectApplication.skin="sknlbxBgffffffBorderc1c9ceRadius3Px";
      for(var i=0;i<allFeatures.length;i++){
        if(allFeatures[i].appId===selectedApp)
          filteredFeatures.push(allFeatures[i]);
      }
      if(filteredFeatures.length!==0)
        this.setFeaturesListboxData(filteredFeatures);
      else{
        this.view.lstBoxSelectFeature.masterData = [["SELECT","Select a feature"]];
        this.view.lstBoxSelectFeature.selectedKey="SELECT";
        this.view.lstBoxSelectApplication.skin = "redListBxSkin";
        this.view.lblErrorMsgApp.text=kony.i18n.getLocalizedString("i18n.frmMFAScenarios.AllFeaturesConfiguredForAppMsg");
        this.view.flxApplicationError.setVisibility(true);
      }
      this.view.lstBoxSelectFeature.setEnabled(true);
      this.view.flxDisableFeature.setVisibility(false);
      this.view.forceLayout();
    },
    CheckCreateScenario : function(){
      var self=this;
      if(this.featuresList.length===0){
        this.view.flxMFANotification.setVisibility(true);
        this.view.flxMFAScenarios.top="55px";
        this.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtnb7b7b7Rad20px";
        this.view.mainHeader.btnAddNewOption.focusSkin = "sknBtnb7b7b7Rad20px";
        this.view.mainHeader.btnAddNewOption.skin = "sknBtnb7b7b7Rad20px";
        this.view.mainHeader.btnAddNewOption.onHover = this.onButtonHover;
        this.view.mainHeader.btnAddNewOption.onClick = function(){};
      }else{
        this.view.flxMFANotification.setVisibility(false);
        this.view.flxMFAScenarios.top="0px";
        this.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
        this.view.mainHeader.btnAddNewOption.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
        this.view.mainHeader.btnAddNewOption.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
        this.view.mainHeader.btnAddNewOption.onHover = function(){};
        this.view.mainHeader.btnAddNewOption.onClick = function(){
          self.createSceanrioClickHandler();
        };
      }
      this.view.forceLayout();
    },
    onButtonHover : function(widget, context) {
    var scopeObj = this;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.CreateScenarioBtnToolTip.setVisibility(true);
      }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.CreateScenarioBtnToolTip.setVisibility(false);
      }
    }     
    },
    
    incrementRiskScoreClick : function()
    {
      var value = parseInt(this.view.lblRiskScoreValue.text);
      value = isNaN(value) ? 0 : value;
      if(value!==10)
         value++;
      if(value!==10)
      this.view.lblRiskScoreValue.text = "0"+value;
      else
       this.view.lblRiskScoreValue.text = value; 
    },

    decrementRiskScoreClick : function()
    {
       var value = parseInt(this.view.lblRiskScoreValue.text);
      value = isNaN(value) ? 0 : value;
      if(value!==0)
         value--;
      this.view.lblRiskScoreValue.text = "0"+value;  
    },
    
    enforceOrNotEnforceClick : function()
    {
     if(this.view.chkEnforceSCA.isVisible)
       {
         CURRENT_SELECTION.statusId="SID_INACTIVE";
         this.view.unChkEnforceSCA.isVisible=true;
         this.view.chkEnforceSCA.isVisible=false;
       } else {
         CURRENT_SELECTION.statusId="SID_ACTIVE";
         this.view.unChkEnforceSCA.isVisible=false;
         this.view.chkEnforceSCA.isVisible=true;
       }
    
    },
    
     getScaRiskAssessmentEnable : function(){
    let self = this;
    if(self.clientProperties){
      if(self.clientProperties && self.clientProperties.SCA_RISK_ASSESSMENT && self.clientProperties.SCA_RISK_ASSESSMENT.toUpperCase()==="FALSE")
      return false;
      else 
        return true;
    } else {
      let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
      configurationSvc.getAllClientAppProperties(function(response) {
        self.clientProperties = response;
        if(response && response.SCA_RISK_ASSESSMENT && response.SCA_RISK_ASSESSMENT.toUpperCase()==="FALSE")
         return false;
      else 
        return true;
      },function(){
        kony.print("error", "unable to fetch client properties");
      });
    }
  }
  };
});
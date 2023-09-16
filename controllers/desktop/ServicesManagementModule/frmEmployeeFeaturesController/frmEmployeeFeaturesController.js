define(['AdminConsoleCommonUtilities'],function( CommonUtilities) {
  return {
  createServiceReqParam: null,
  editFeatureReqParam : null,
  editFacilityReqParam: null,  
  actionStatusReqParam : null,
  editLimitGroupReqParam : null,    
     updateReqParam : null,
    editFeaturePayloadParam:[],
  globalSelectedItem : 0,
  currSelectedIndex : 0,
  featuresRecList:null,
    actionDataList: [],
  actionsRecList:null,
  firstLoad : false,
  prevIndex : -1,
  isActionEdit : false,
  currSuccessMsg:"",
  successMsgParam :{
    EDIT:"EDIT"
	},
  
  preShowActions : function() {
    this.setFlowActions();
    this.preShowData();
    this.setScrollHeight();
  },

  preShowData : function() {
    this.view.flxServiceManagement.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.flxMainContent.setVisibility(true);
    this.view.mainHeader.lblHeading.centerY = "80";
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.EmployeeFeatures");
    this.view.flxFeatureStatusFilter.setVisibility(false);
    this.view.flxContextualMenu.setVisibility(false);
    this.view.flxContextualMenuAction.setVisibility(false);
    this.view.searchBoxFeatures.tbxSearchBox.text="";
    this.view.searchBoxFeatures.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.frmServiceManagement.Search_by_Service_Name");
    this.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
    
    this.view.contextualMenu.lblHeader.setVisibility(false);
    this.view.contextualMenu.btnLink1.setVisibility(false);
    this.view.contextualMenu.btnLink2.setVisibility(false);
    this.view.contextualMenu.flxOptionsSeperator.setVisibility(false);
    this.view.contextualMenu.flxOption4.setVisibility(false);
    this.view.contextualMenu.flxOption3.setVisibility(false);
    this.view.contextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
    this.view.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
    this.view.contextualMenuAction.lblHeader.setVisibility(false);
    this.view.contextualMenuAction.btnLink1.setVisibility(false);
    this.view.contextualMenuAction.btnLink2.setVisibility(false);
    this.view.contextualMenuAction.flxOptionsSeperator.setVisibility(false);
    this.view.contextualMenuAction.flxOption4.setVisibility(false);
    this.view.contextualMenuAction.flxOption3.setVisibility(false);
    this.view.contextualMenuAction.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
    this.view.contextualMenuAction.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
    this.view.flxToastMessage.setVisibility(false);
    this.view.flxScrollViewServices.setVisibility(true);
    this.view.flxViewServiceData.setVisibility(false);
    this.setSegmentSelectionProperty();
    this.view.forceLayout();     
  },

  willUpdateUI: function (serviceModel) {
    this.updateLeftMenu(serviceModel);
    var scopeObj = this; 
    if (serviceModel.featuresList) {      
      // Read the facilities list - API call
      if(serviceModel.featuresList.length === 0){
        scopeObj.view.segFeatures.setData([]);
        scopeObj.showAddService();
      }else{
        scopeObj.featuresRecList = serviceModel.featuresList;
        scopeObj.setListFiltersData();
        scopeObj.firstLoad = true;
        scopeObj.sortBy = scopeObj.getObjectSorter("name");
        scopeObj.resetSortImages();
        scopeObj.view.searchBoxFeatures.tbxSearchBox.text="";
        scopeObj.loadPageData = function() {
          var searchResult = scopeObj.featuresRecList
          .filter(scopeObj.searchFilter)
          .sort(scopeObj.sortBy.sortData);
          scopeObj.records = scopeObj.featuresRecList.filter(scopeObj.searchFilter).length;
          var searchFiltered = scopeObj.filterBasedOnTypeStatus(searchResult);
          scopeObj.setFeaturesSegmentData(searchFiltered);
        };
        scopeObj.loadPageData();
        scopeObj.hideService();
      }
    }else if (serviceModel.masterDataServices) {
      if (serviceModel.masterDataServices.serviceChannel || serviceModel.masterDataServices.serviceType ||serviceModel.masterDataServices.serviceCategory) {
       // scopeObj.addServicesMasterDataMappings(serviceModel.masterDataServices);
      }
    }else if (serviceModel.toast) {
      if (serviceModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
        	this.view.toastMessage.showToastMessage(serviceModel.toast.message, this);        
      } else {
        this.view.toastMessage.showErrorToastMessage(serviceModel.toast.message, this);
      }
    }else if(serviceModel.LoadingScreen){
      if(serviceModel.LoadingScreen.show){
        kony.adminConsole.utils.showProgressBar(this.view);
      }else{
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    } else if(serviceModel.statusUpdateTo){
      this.updateFeatureDetailScreenStatus(serviceModel.statusUpdateTo);
    } else if(serviceModel.actionsOfFeature && serviceModel.context === "detailsView"){
      if(this.currSuccessMsg===this.successMsgParam.EDIT){
        this.showViewFeatureScreen();
        this.setViewFeatureData(serviceModel.actionsOfFeature);
      }
      this.actionsRecList = serviceModel.actionsOfFeature.actions;
      this.mapActionsList(serviceModel.actionsOfFeature.actions);
    }
    //veiwpage editfeature
  else if(serviceModel.actionsOfFeature && serviceModel.context === "editView"){
       this.actionsRecList = serviceModel.actionsOfFeature.actions;
      this.prefillFeatureDataForEdit();
     this.setActionDetailsData(true);
    this.updateActionPayload();
    //  this.setFeaturedActionsData(serviceModel.actionsOfFeature,true);
      this.view.flxEditFeaturePopup.setVisibility(true);
      if(this.isActionEdit===true){
        scopeObj.isActionEdit=false;
        var selInd=scopeObj.view.segActionList.selectedRowIndex;
        scopeObj.subTabsButtonUtilFunction([scopeObj.view.btnFeatures,scopeObj.view.btnActions],scopeObj.view.btnActions);
        scopeObj.view.segFeaturedActions.selectedRowIndex= selInd;
        scopeObj.toggleSelectedRow();
        var featureId=scopeObj.view.lblFeatureNamePopup.text;
        scopeObj.mapDependencies(scopeObj.view.segFeaturedActions.data[selInd[1]].dependentActions,featureId);
        scopeObj.view.flxFeaturedAction.setVisibility(true);
        scopeObj.view.flxFeatureContainer.setVisibility(false);
        scopeObj.view.forceLayout();
      }
    }  
    else if(serviceModel.actionsOfFeature && serviceModel.context === "editLimits"){
      this.setFeaturedActionsData(serviceModel.actionsOfFeature,false);
      this.selectRequiredLimit();
      this.view.flxEditFeaturePopup.setVisibility(true);
    }
    if(serviceModel.localeLanguages){
      this.setLanguagesList(serviceModel.localeLanguages, true);
    }
    if(serviceModel.limitGroups){
      scopeObj.setLimitGroupsData(serviceModel.limitGroups.limitGroups);
    }
    scopeObj.view.forceLayout();
  },
  setScrollHeight :function() {
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight = screenHeight-150;
    this.view.flxMainContent.height=scrollHeight+"px";
  },

  setFlowActions : function() {
    var scopeObj = this;    
    this.view.flxContextualMenu.onHover = scopeObj.onHoverEventCallback;
    this.view.flxContextualMenuAction.onHover = scopeObj.onHoverEventCallback;
    this.view.flxFeatureStatusFilter.onHover = scopeObj.onHoverEventCallback;
    this.view.flxFeatureTypeFilter.onHover = scopeObj.onHoverEventCallback;
    this.view.flxLanguages.onHover = scopeObj.onHoverEventCallback;
    this.view.flxFeatureDetailsContextualMenu.onHover = scopeObj.onHoverEventCallback;
    this.view.flxActionDetailsContextualMenu.onHover = scopeObj.onHoverEventCallback;
    this.view.flxDetailsActionTypeFilter.onHover = scopeObj.onHoverEventCallback;
    this.view.flxTCPopupLanguages.onHover = scopeObj.onHoverEventCallback;
    this.view.flxFeatureLanguages.onHover = scopeObj.onHoverEventCallback;
    this.view.flxActionLanguages.onHover = scopeObj.onHoverEventCallback;
    this.view.displayContentView.flxLanguages.onHover = scopeObj.onHoverEventCallback;

    this.view.btnFeatures.onClick = function(){
      if(scopeObj.view.flxFeaturedAction.isVisible&&scopeObj.validateLimitFields()&&scopeObj.validateFieldsAction()){
      scopeObj.subTabsButtonUtilFunction([scopeObj.view.btnFeatures,scopeObj.view.btnActions],scopeObj.view.btnFeatures);
      scopeObj.view.flxFeaturedAction.setVisibility(false);
      scopeObj.view.flxFeatureContainer.setVisibility(true);
      scopeObj.view.forceLayout();      
      }
    };
   this.view.btnActions.onClick = function(){
     // scopeObj.prevSelLang=scopeObj.view.lblSelectedLanguage.info.selLang.langCode;
     var selAction = scopeObj.view.segActionList.selectedRowItems;
     if(scopeObj.view.flxFeatureContainer.isVisible){//&&scopeObj.validateFields()){
       scopeObj.subTabsButtonUtilFunction([scopeObj.view.btnFeatures,scopeObj.view.btnActions],scopeObj.view.btnActions);
       scopeObj.view.segFeaturedActions.selectedRowIndex=[0,0];
       var selInd=scopeObj.view.segFeaturedActions.selectedRowIndex;
       scopeObj.toggleSelectedRow();
       var featureId=scopeObj.view.lblFeatureNamePopup.text;
       scopeObj.mapDependencies(scopeObj.view.segFeaturedActions.data[selInd[1]].dependentActions,featureId);
       scopeObj.view.flxFeaturedAction.setVisibility(true);
       scopeObj.view.flxFeatureContainer.setVisibility(false);
       scopeObj.view.forceLayout();
      }
    };
    this.view.flxActionsDependencyFeatureNameHeader.onClick = function () {
      scopeObj.sortData("lblFeatureName");
    };
    this.view.flxActionsDependencyActionNameHeader.onClick = function () {
      scopeObj.sortData("lblActionName");
    };
     this.view.flxActionsDependencyActionCodeHeader.onClick = function () {
      scopeObj.sortData("lblActionCode");
    };
    
	
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.showViewFeatureScreen();
    };
    
    this.view.segFeatures.onRowClick = function(){
      scopeObj.showViewFeatureScreen();
      scopeObj.setViewFeatureData();
      var selRowData = scopeObj.view.segFeatures.selectedRowItems;
      var inputReq = {"context": "detailsView",
                      "requestParam": {"featureId": selRowData[0].id }
                     };
      scopeObj.presenter.getActionsOfEmployeeFeature(inputReq);
    };
   
//     this.view.segActionList.onRowClick = function(){
//       var selRowData = scopeObj.view.segActionList.selectedRowItems;
//       scopeObj.showViewActionScreen();
//       scopeObj.setViewActionData();
//       scopeObj.mapDependencies(selRowData[0].dependentActions);
//     };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.getAllFeatures();
      scopeObj.hideService();
    };
    this.view.contextualMenu.flxOption2.onClick = function(){
      if(scopeObj.view.contextualMenu.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
        scopeObj.showDeactivatePopup(1);
      }
      else {
        scopeObj.deactivateService();
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      }
    };
    this.view.contextualMenuAction.flxOption2.onClick = function(){
      if(scopeObj.view.contextualMenuAction.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
        scopeObj.showDeactivatePopup(2);
      }
      else if(scopeObj.view.contextualMenuAction.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate") && scopeObj.view.lblFeatureDetailsStatusValue.text === "Inactive"){
        scopeObj.showActivatePopup(1);
      }
      else
        scopeObj.deactivateAction();
    };
    //viewpage
    this.view.contextualMenu.flxOption1.onClick = function(){
      var selRowIndex =scopeObj.view.segFeatures.selectedRowIndex[1];
      var selData =scopeObj.view.segFeatures.data[selRowIndex];
      var selectedFeatureId =selData.id;
    var inputReq = {"context": "editView",
                  "requestParam": {"featureId": selectedFeatureId} };
      scopeObj.presenter.getActionsOfEmployeeFeature(inputReq); 
    };
    this.view.contextualMenuAction.flxOption1.onClick = function(){
     scopeObj.setActionDetailsData();
      scopeObj.isActionEdit=true;
      scopeObj.updateActionPayload();
     // scopeObj.setActionDetailsData();
    scopeObj.prefillFeatureDataForEdit();  
         };
      this.view.contextualMenuFeatureDetails.flxOption2.onClick = function(){
      scopeObj.prefillFeatureDataForEdit();
      scopeObj.setActionDetailsData();
        scopeObj.updateActionPayload();
     // scopeObj.view.flxFeaturedAction.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
      scopeObj.deactivateService();
      scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
    };
	
    this.view.flxDownArrowFeatures.onClick = function(){
      scopeObj.view.flxRightArrowFeatures.setVisibility(true);  
      scopeObj.view.flxFeatureDependencyContainer.setVisibility(false);
      scopeObj.view.flxDownArrowFeatures.setVisibility(false);
          };
    this.view.flxRightArrowFeatures.onClick=function(){
      scopeObj.view.flxRightArrowFeatures.setVisibility(false);  
      scopeObj.view.flxFeatureDependencyContainer.setVisibility(true);
      scopeObj.view.flxDownArrowFeatures.setVisibility(true);    
    };
    this.view.flxActionDependencyDownArrow.onClick = function(){
      scopeObj.view.flxActionDependencyRightArrow.setVisibility(true);  
      scopeObj.view.flxActionDependencyContainer.setVisibility(false);
      scopeObj.view.flxActionDependencyDownArrow.setVisibility(false);
    };
    this.view.flxActionDependencyRightArrow.onClick = function(){
      scopeObj.view.flxActionDependencyRightArrow.setVisibility(false);  
      scopeObj.view.flxActionDependencyContainer.setVisibility(true);
      scopeObj.view.flxActionDependencyDownArrow.setVisibility(true); 
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function(){
      scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
    };
    this.view.popupError.flxPopUpClose.onClick = function(){
      scopeObj.view.flxActivateActionPopup.setVisibility(false);
    };
    this.view.popupError.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxActivateActionPopup.setVisibility(false);
    };
    this.view.flxCloseDependency.onClick = function(){
      scopeObj.view.flxDependencyPopup.setVisibility(false);
      scopeObj.view.flxRightArrowFeatures.setVisibility(false);
      scopeObj.view.flxDownArrowFeatures.setVisibility(true); 
      scopeObj.view.flxFeatureDependencyContainer.setVisibility(true); 
      scopeObj.view.flxActionDependencyDownArrow.setVisibility(true); 
      scopeObj.view.flxActionDependencyRightArrow.setVisibility(false);
      scopeObj.view.flxActionDependencyContainer.setVisibility(true);
    };
    this.view.flxCloseLimitGroup.onClick = function(){
      scopeObj.view.flxLimitGroupPopup.setVisibility(false);
    };
    this.view.btnCancelLimitGroupPopup.onClick = function(){
      scopeObj.view.flxLimitGroupPopup.setVisibility(false);
    };
    this.view.btnUpdateLimitGroup.onClick = function(){ 
      scopeObj.prevSelLangLimitGroup = scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode;
      if(scopeObj.validateFieldsLimitGroup()){
        scopeObj.view.flxLimitGroupPopup.setVisibility(false);
      	scopeObj.presenter.editLimitGroup(scopeObj.editLimitGroupReqParam);
		}
    };
    this.view.btnEditLimitGroup.onClick = function(){
      scopeObj.showEditLimitGroupPopup();
    };
    this.view.flxFeatureName.onClick = function () {
      scopeObj.sortData("name");
    };
    this.view.flxFeatureCode.onClick = function () {
      scopeObj.sortData("id");
    };
    this.view.flxFeatureType.onClick = function(){
//       var flxRight = scopeObj.view.flxHeaderFeatures.frame.width - scopeObj.view.flxFeatureType.frame.x - scopeObj.view.flxFeatureType.frame.width;
//       var iconRight = scopeObj.view.flxFeatureType.frame.width - scopeObj.view.fontIconTypeFilter.frame.x;
//       scopeObj.view.flxFeatureTypeFilter.right = (flxRight + iconRight - 8) +"px";
//       scopeObj.view.flxFeatureTypeFilter.setVisibility(!scopeObj.view.flxFeatureTypeFilter.isVisible);
//       if(scopeObj.view.flxContextualMenu.isVisible){
//         scopeObj.view.flxContextualMenu.setVisibility(false);
//       }
//       if(scopeObj.view.flxFeatureStatusFilter.isVisible){
//         scopeObj.view.flxFeatureStatusFilter.setVisibility(false);
//       }
      scopeObj.sortData("actionsCount");
    };
    this.view.flxFeatureStatus.onClick = function(){
      var flxRight = scopeObj.view.flxHeaderFeatures.frame.width - scopeObj.view.flxFeatureStatus.frame.x - scopeObj.view.flxFeatureStatus.frame.width;
      var iconRight = scopeObj.view.flxFeatureStatus.frame.width - scopeObj.view.fontIconFilterStatus.frame.x;
      scopeObj.view.flxFeatureStatusFilter.right = (flxRight + iconRight - 8) +"px";
      scopeObj.view.flxFeatureStatusFilter.setVisibility(!scopeObj.view.flxFeatureStatusFilter.isVisible);
      if(scopeObj.view.flxContextualMenu.isVisible){
        scopeObj.view.flxContextualMenu.setVisibility(false);
      }
      if(scopeObj.view.flxFeatureTypeFilter.isVisible){
        scopeObj.view.flxFeatureTypeFilter.setVisibility(false);
      }

    };
    
    // search Features
    this.view.searchBoxFeatures.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
    };
    this.view.searchBoxFeatures.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "sknflxd5d9ddop100"; 
    };
    this.view.searchBoxFeatures.tbxSearchBox.onKeyUp = function() {
      if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text.length >=0 ){
        if(!scopeObj.containSpecialChars(scopeObj.view.searchBoxFeatures.tbxSearchBox.text)){
          scopeObj.sortBy = scopeObj.getObjectSorter("name");
          scopeObj.loadPageData();
        }
      } 
        if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text === ""){
          scopeObj.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
        }else{
          scopeObj.view.searchBoxFeatures.flxSearchCancel.setVisibility(true);
          scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search"; 
          scopeObj.view.forceLayout();
        }

        if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices === null){
          scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          scopeObj.view.flxHeaderFeatures.setVisibility(true);
          scopeObj.view.segFeatures.setData([]);
          scopeObj.view.forceLayout();
        }
    };
    this.view.searchBoxFeatures.flxSearchCancel.onClick = function() {
      scopeObj.view.searchBoxFeatures.tbxSearchBox.text = "";
      scopeObj.view.searchBoxFeatures.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.searchBoxFeatures.flxSearchCancel.setVisibility(false);
      scopeObj.loadPageData();
      if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices === null){
        scopeObj.view.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        scopeObj.view.flxHeaderFeatures.setVisibility(true);
        scopeObj.view.segFeatures.setData([]);
        scopeObj.view.forceLayout();
      }
    };
    
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var filterData = scopeObj.filterBasedOnTypeStatus();
      scopeObj.setFeaturesSegmentData(filterData.sort(scopeObj.sortBy.sortData), true);
    };
    this.view.TypeFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      var filterData = scopeObj.filterBasedOnTypeStatus();
      scopeObj.setFeaturesSegmentData(filterData.sort(scopeObj.sortBy.sortData), true);
    };
    this.view.flxFeatureDetailsOptions.onClick = function(){
      var left = scopeObj.view.flxFeatureDetailsOptions.frame.x - 60;
      scopeObj.view.flxFeatureDetailsContextualMenu.left = left +"dp";
      scopeObj.view.flxFeatureDetailsContextualMenu.setVisibility(scopeObj.view.flxFeatureDetailsContextualMenu.isVisible === false);
	  scopeObj.view.contextualMenuFeatureDetails.flxOption4.setVisibility(true);
      if (scopeObj.view.lblFeatureDetailsStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      scopeObj.view.contextualMenuFeatureDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.text = "\ue91c";
      scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.skin = "sknIcon20px";
    } else if(scopeObj.view.lblFeatureDetailsStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
      scopeObj.view.contextualMenuFeatureDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.text = "\ue931";
      scopeObj.view.contextualMenuFeatureDetails.lblIconOption4.skin = "sknIcon20px";
    }else{
  	  scopeObj.view.contextualMenuFeatureDetails.flxOption4.setVisibility(false);
	}
    scopeObj.view.forceLayout();
    };
    this.view.flxActionDetailsOptions.onClick = function(){
      var left = scopeObj.view.flxActionDetailsOptions.frame.x - 60;
      scopeObj.view.flxActionDetailsContextualMenu.left = left +"dp";
      scopeObj.view.flxActionDetailsContextualMenu.setVisibility(scopeObj.view.flxActionDetailsContextualMenu.isVisible === false);
	  scopeObj.view.contextualMenuActionDetails.flxOption4.setVisibility(true);
      if (scopeObj.view.lblActionStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      scopeObj.view.contextualMenuActionDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      scopeObj.view.contextualMenuActionDetails.lblIconOption4.text = "\ue91c";
      scopeObj.view.contextualMenuActionDetails.lblIconOption4.skin = "sknIcon20px";
    } else if(scopeObj.view.lblActionStatusValue.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
      scopeObj.view.contextualMenuActionDetails.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      scopeObj.view.contextualMenuActionDetails.lblIconOption4.text = "\ue931";
      scopeObj.view.contextualMenuActionDetails.lblIconOption4.skin = "sknIcon20px";
    }else{
  	  scopeObj.view.contextualMenuActionDetails.flxOption4.setVisibility(false);
	}
    scopeObj.view.forceLayout();
    };
    this.view.flxDropdownLanguages.onClick = function(){
      var left = scopeObj.view.lblIconArrowDescription.frame.x  +68 ;
      var top = scopeObj.view.flxViewServiceDataHeader.frame.height + scopeObj.view.flxServiceDescription.frame.y +
                 scopeObj.view.flxServiceDescriptionContent.frame.y -20;
      scopeObj.view.flxLanguages.top = top +"dp";
      scopeObj.view.flxLanguages.left = left + "dp";
      scopeObj.view.flxLanguages.setVisibility(scopeObj.view.flxLanguages.isVisible === false);
      scopeObj.view.forceLayout();
    };
    this.view.flxActionDropdownLanguages.onClick = function(){
      var left = scopeObj.view.lblIconArrowActionDescription.frame.x  +68 ;
      var top = scopeObj.view.flxViewActionDetailsHeader.frame.height + scopeObj.view.flxActionDisplayContent.frame.y +
                 scopeObj.view.flxActionDescriptionContent.frame.y -20;
      scopeObj.view.flxActionLanguages.top = top +"dp";
      scopeObj.view.flxActionLanguages.left = left + "dp";
      scopeObj.view.flxActionLanguages.setVisibility(scopeObj.view.flxActionLanguages.isVisible === false);
      scopeObj.view.forceLayout();
    };
    this.view.displayContentEdit.flxLanguageHeader.onClick = function(){
      var left = 165+scopeObj.view.displayContentEdit.lblSelectedLanguage.frame.width-115;
      scopeObj.view.displayContentEdit.flxLanguagesEdit.left = left + "dp";
      if(scopeObj.view.displayContentEdit.flxLanguagesEdit.isVisible===true)
        scopeObj.view.displayContentEdit.flxLanguagesEdit.setVisibility(false);
      else
        scopeObj.view.displayContentEdit.flxLanguagesEdit.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.displayContentView.flxDropdownLanguages.onClick = function(){      
      var left = scopeObj.view.displayContentView.lblIconArrowDescription.frame.x  +12 ;
      var top = scopeObj.view.displayContentView.flxDescriptionHeader.frame.height + scopeObj.view.displayContentView.flxDisplayContent.frame.y +
                 scopeObj.view.displayContentView.flxDescriptionContent.frame.y -40;
      scopeObj.view.displayContentView.flxLanguages.top = top +"dp";
      scopeObj.view.displayContentView.flxLanguages.left = left + "dp";
      scopeObj.view.displayContentView.flxLanguages.setVisibility(scopeObj.view.displayContentView.flxLanguages.isVisible === false);
      scopeObj.view.forceLayout();
    };
    this.view.displayContentLimitGroupEdit.flxLanguageHeader.onClick = function(){
      var left = 165+scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage.frame.width-115;
      scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.left = left + "dp";
      if(scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.isVisible===true)
        scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(false);
      else
        scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.ValueEntry.tbxEnterValue.onKeyUp = function() {
      scopeObj.view.ValueEntry.flxValueTextBox.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoServiceFee.setVisibility(false);

    };
    this.view.displayContentEdit.tbxEditName.onKeyUp = function() {
      scopeObj.view.displayContentEdit.tbxEditName.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.displayContentEdit.flxNoEditNameError.setVisibility(false);
      scopeObj.view.displayContentEdit.lblNameCount.text = scopeObj.view.displayContentEdit.tbxEditName.text.length + "/60";
    };
    this.view.tbxEditFeatureName.onKeyUp = function(){
      scopeObj.view.tbxEditFeatureName.skin = "skntbxLato35475f14px";
      scopeObj.view.flxNoEditFeatureNameError.isVisible = false;
      /*if(scopeObj.view.tbxEditFeatureName.text.length===0){
        scopeObj.view.lblFeatureNameCount.setVisibility(false);
      }else{*/
      scopeObj.view.lblFeatureNameCount.setVisibility(true);
      scopeObj.view.lblFeatureNameCount.text=scopeObj.view.tbxEditFeatureName.text.length+"/60";
      //}
      scopeObj.view.forceLayout();
    };
    /*this.view.tbxEditFeatureName.onEndEditing = function(){
      if(scopeObj.view.lblFeatureNameCount.isVisible===true)
      	scopeObj.view.lblFeatureNameCount.setVisibility(false);
    };*/
    this.view.displayContentEdit.txtareaEditDescription.onKeyUp = function() {
      scopeObj.view.displayContentEdit.txtareaEditDescription.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.displayContentEdit.flxNoEditDescriptionError.setVisibility(false);
      //scopeObj.view.displayContentEdit.lblDescriptionCount.text = scopeObj.view.displayContentEdit.txtareaEditDescription.text.length + "/100";
    };
    this.view.txtareaEditFeatureDescription.onKeyUp= function(){
      scopeObj.view.txtareaEditFeatureDescription.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoEditFeatureDescriptionError.isVisible = false;
      /*if(scopeObj.view.txtareaEditFeatureDescription.text.length===0){
        scopeObj.view.lblFeatureDescriptionCount.setVisibility(false);
      }else{*/
      scopeObj.view.lblFeatureDescriptionCount.setVisibility(false);
     // scopeObj.view.lblFeatureDescriptionCount.text=scopeObj.view.txtareaEditFeatureDescription.text.length+"/100";
      //}
      scopeObj.view.forceLayout();
    };
    /*this.view.txtareaEditFeatureDescription.onEndEditing = function(){
      if(scopeObj.view.lblFeatureDescriptionCount.isVisible)
      	scopeObj.view.lblFeatureDescriptionCount.setVisibility(false);
    };*/
    this.view.flxLanguageHeader.onClick = function(){
      var left = 165+scopeObj.view.lblSelectedLanguage.frame.width-115;
      scopeObj.view.flxFeatureLanguages.left = left + "dp";
      if(scopeObj.view.flxFeatureLanguages.isVisible===true)
        scopeObj.view.flxFeatureLanguages.setVisibility(false);
      else
        scopeObj.view.flxFeatureLanguages.setVisibility(true);
    };
    this.view.flxCloseFeature.onClick = function(){
      scopeObj.view.btnFeatures.skin="sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
      scopeObj.view.btnActions.skin="sknBtnBgD2D7E2Rou3pxLato485B7512px";
      scopeObj.view.flxFeaturedAction.setVisibility(false);
      scopeObj.view.flxFeatureContainer.setVisibility(true);
      scopeObj.view.flxEditFeaturePopup.setVisibility(false);
    };
    this.view.btnEditCancel.onClick = function(){
      scopeObj.view.btnFeatures.skin="sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
      scopeObj.view.btnActions.skin="sknBtnBgD2D7E2Rou3pxLato485B7512px";
      scopeObj.view.flxFeaturedAction.setVisibility(false);
      scopeObj.view.flxFeatureContainer.setVisibility(true);
      scopeObj.view.flxEditFeaturePopup.setVisibility(false);
    };
    this.view.txtareaAssociatedActionDescription.onendediting=function()
    {
      var data=     scopeObj.actionsRecList;       
      var actions = scopeObj.editFeaturePayloadParam;
      var text=scopeObj.view.txtareaAssociatedActionDescription.text;
      var toMatch = scopeObj.view.lblViewActionCodeValue.text;
      for(var i=0;i<data.length;i++)
      {
        if(toMatch===data[i].actionId)
        {
          scopeObj.editFeaturePayloadParam.actions[i].actionDisplay[0].displayDescription=text;
        }
      }
    };
  this.view.actionStatusSwitch.switchToggle.onSlide=function(){
     var data=  scopeObj.actionsRecList;
     var actions = scopeObj.editFeaturePayloadParam;
     var toCheck=scopeObj.view.lblViewActionCodeValue.text;
     var status=scopeObj.view.actionStatusSwitch.switchToggle.selectedindex===0?"SID_ACTION_ACTIVE":"SID_ACTION_INACTIVE";
     for(var i=0;i<data.length;i++)
     {
       if(toCheck===data[i].actionId)
       {
         scopeObj.editFeaturePayloadParam.actions[i].statusId=status;
       }  
     }
   };
    this.view.btnUpdate.onClick = function(){
      var data =scopeObj.actionsRecList;
      var actions = scopeObj.editFeaturePayloadParam.actions;
      var index = scopeObj.view.segFeatures.currentIndex[1];
      var rowData =  scopeObj.view.segFeatures.data[index];     
      var featureId=rowData.id;
      var statusId = scopeObj.view.featureStatusSwitch.switchToggle.selectedindex===0?"SID_FEATURE_ACTIVE":"SID_FEATURE_INACTIVE";
      var displayName = rowData.displayContent["en-US"].displayName;
      var displayDescription = scopeObj.view.txtareaEditFeatureDescription.text;
      var opt=scopeObj.view.flxViewServiceData.isVisible?2:1;//view/list
     // var segRowData=scopeObj.view.segActionList.data;
      var inputReq = {
        "featureId":featureId,
        "statusId":statusId,
        "featureDisplay":[{
        "localeId":"en-US",
          "displayName":displayName,
          "displayDescription":displayDescription
        }],
      actions
      }; 
       scopeObj.presenter.updateInternalUserFeatureActions(inputReq,opt);
       scopeObj.view.flxEditFeaturePopup.setVisibility(false);
      scopeObj.view.btnFeatures.skin="sknBtnBgffffffBrD7D9E0Rd3px485B75Bold12px";
      scopeObj.view.btnActions.skin="sknBtnBgD2D7E2Rou3pxLato485B7512px";
      scopeObj.view.flxFeaturedAction.setVisibility(false);
      scopeObj.view.flxFeatureContainer.setVisibility(true);
     /* scopeObj.prevSelLang=scopeObj.view.lblSelectedLanguage.info.selLang.langCode;
      if((scopeObj.view.flxFeaturedAction.isVisible && scopeObj.validateFieldsAction() && scopeObj.validateLimitFields()) || 
         (scopeObj.view.flxFeaturedAction.isVisible === false && scopeObj.validateFields())){
        scopeObj.updateFeatureDetails();
      }
      /*if((scopeObj.view.flxFeatureContainer.isVisible&&scopeObj.validateFields())||(scopeObj.validateFieldsAction())||(scopeObj.view.flxFeaturedAction.isVisible&&scopeObj.validateLimitFields()))
        scopeObj.updateFeatureDetails();*/
    };
	this.view.flxActionTCClosePopup.onClick = function(){
      scopeObj.view.flxViewActionTCPopup.setVisibility(false);
    };
    this.view.flxCloseLimits.onClick = function(){
      scopeObj.view.flxViewEditLimitsPopup.setVisibility(false);
    };
    this.view.btnEditActionLimits.onClick = function(){
      scopeObj.prefillFeatureDataForEdit(1);
      
      scopeObj.view.flxViewEditLimitsPopup.setVisibility(false);
    };
    this.view.featuresLangList.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.updateLanguagesDropdown(scopeObj.view.featuresLangList.segStatusFilterDropdown,scopeObj.view.lblFeatureDetailsSelectedLang);
      scopeObj.view.flxLanguages.setVisibility(false);
      scopeObj.displaySelectedLanguageContent();
    };
    this.view.actionLangList.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.updateLanguagesDropdown(scopeObj.view.actionLangList.segStatusFilterDropdown,scopeObj.view.lblActionDetailsSelectedLang);
      scopeObj.view.flxActionLanguages.setVisibility(false);
      scopeObj.displaySelectedLanguageContentAction();
    };
    this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.prevSelLangAction = scopeObj.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode;
      scopeObj.updateLanguagesDropdown(scopeObj.view.displayContentEdit.EditLangList.segStatusFilterDropdown,scopeObj.view.displayContentEdit.lblSelectedLanguage);
      scopeObj.view.displayContentEdit.flxLanguagesEdit.setVisibility(false);
      scopeObj.displaySelectedLangActionEditMode("langClick");
    };
    this.view.displayContentView.EditLangList.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.updateLanguagesDropdown(scopeObj.view.displayContentView.EditLangList.segStatusFilterDropdown,scopeObj.view.displayContentView.lblDetailsSelectedLang);
      scopeObj.view.displayContentView.flxLanguages.setVisibility(false);
      scopeObj.displaySelectedLangLimitGroup();
    };
    this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.prevSelLangLimitGroup = scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode;
      scopeObj.updateLanguagesDropdown(scopeObj.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown,scopeObj.view.displayContentLimitGroupEdit.lblSelectedLanguage);
      scopeObj.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(false);
      scopeObj.displaySelectedLangLimitGroupEditMode("langClick");
    };
    this.view.flxActionTypeFilterIcon.onClick = function(){
      var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionTypeHeader.frame.x - scopeObj.view.flxActionTypeHeader.frame.width;
      var iconRight = scopeObj.view.flxActionTypeHeader.frame.width - scopeObj.view.flxActionTypeFilterIcon.frame.x;
      scopeObj.view.flxDetailsActionTypeFilter.right = (flxRight + iconRight -10) +"px";
      scopeObj.view.flxDetailsActionTypeFilter.setVisibility(!scopeObj.view.flxDetailsActionTypeFilter.isVisible);
    };
//     this.view.flxActionCategoryFilterIcon.onClick = function(){
//       var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionCategoryHeader.frame.x - scopeObj.view.flxActionCategoryHeader.frame.width;
//       var iconRight = scopeObj.view.flxActionCategoryHeader.frame.width - scopeObj.view.flxActionCategoryFilterIcon.frame.x;
//       scopeObj.view.flxDetailsActionCategoryFilter.right = (flxRight + iconRight -10) +"px";
//       scopeObj.view.flxDetailsActionCategoryFilter.setVisibility(!scopeObj.view.flxDetailsActionCategoryFilter.isVisible);
//     };
//     this.view.flxActionLimitGroupFilterIcon.onClick = function(){
//       var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionLimitGroupHeader.frame.x - scopeObj.view.flxActionLimitGroupHeader.frame.width;
//       var iconRight = scopeObj.view.flxActionLimitGroupHeader.frame.width - scopeObj.view.flxActionLimitGroupFilterIcon.frame.x;
//       scopeObj.view.flxDetailsActionLimitGroupFilter.right = (flxRight + iconRight -10) +"px";
//       scopeObj.view.flxDetailsActionLimitGroupFilter.setVisibility(!scopeObj.view.flxDetailsActionLimitGroupFilter.isVisible);
//     };
    this.view.flxActionStatusFilterIcon.onClick = function(){
      var flxRight = scopeObj.view.flxActionsHeader.frame.width - scopeObj.view.flxActionStatusHeader.frame.x - scopeObj.view.flxActionStatusHeader.frame.width;
      var iconRight = scopeObj.view.flxActionStatusHeader.frame.width - scopeObj.view.flxActionStatusFilterIcon.frame.x;
      scopeObj.view.flxDetailsActionStatusFilter.right = (flxRight + iconRight -10) +"px";
      scopeObj.view.flxDetailsActionStatusFilter.setVisibility(!scopeObj.view.flxDetailsActionStatusFilter.isVisible);
    };
    this.view.actionTypeDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performFilterOnActionTypes();
    };
//     this.view.actionCategoryDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
//       scopeObj.performFilterOnActionCategory();
//     };
    this.view.actionStatusDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.performFilterOnActionStatus();
    };
//     this.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.onRowClick = function(){
//       scopeObj.performFilterOnActionLimitGroup();
//     };
    this.view.flxTcLanguageDropdown.onClick = function(){
      var left = scopeObj.view.flxTcLanguageDropdown.frame.x-3;
      scopeObj.view.flxTCPopupLanguages.left = left + "dp";
      scopeObj.view.flxTCPopupLanguages.setVisibility(!scopeObj.view.flxTCPopupLanguages.isVisible);

    };
  
    this.view.contextualMenuActionDetails.flxOption2.onClick = function(){
      scopeObj.isActionEdit=true;
      scopeObj.prefillFeatureDataForEdit();
      scopeObj.setActionDetailsData();
    };
    this.view.contextualMenuFeatureDetails.flxOption4.onClick = function(){
      if(scopeObj.view.lblFeatureDetailsStatusValue.text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active")) {
        scopeObj.showDeactivatePopup(1);
      }
      else {
        scopeObj.deactivateFeatureDetails();
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      }
    };
    this.view.contextualMenuActionDetails.flxOption4.onClick = function(){
      if(scopeObj.view.contextualMenuActionDetails.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) {
        scopeObj.showDeactivatePopup(2);
      }
      else if(scopeObj.view.contextualMenuActionDetails.lblOption4.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate") && scopeObj.view.lblFeatureDetailsStatusValue.text === "Inactive"){
        scopeObj.showActivatePopup(1);
      }
      else
        scopeObj.deactivateAction();
    };
    this.view.flxActionNameHeader.onClick = function(){
      scopeObj.sortFeatureActions("lblActionName");
    };
    this.view.flxActionCodeHeader.onClick = function(){
      scopeObj.sortFeatureActions("lblActionCode.toolTip");
    };
    this.view.flxLimitGroupNameHeader.onClick = function() {
      var segData = scopeObj.view.segLimitGroup.data;
      scopeObj.sortBy.column("lblLimitGroupName");
      scopeObj.determineSortFontIcon(scopeObj.sortBy, 'lblLimitGroupName', scopeObj.view.fontIconSortLimitGroup);
      scopeObj.view.segLimitGroup.setData(segData.sort(scopeObj.sortBy.sortData));
    };
    this.view.lblTAndCView.onTouchStart = function(){
      scopeObj.showTermsConditionsPopupEditMode();
    };
   
    this.view.valueEntryMinValueLimit.tbxEnterValue.onEndEditing = function(){
      if(scopeObj.view.valueEntryMinValueLimit.tbxEnterValue.text===""){
        scopeObj.view.lblMinValueLimitErrorMsg.text="Please enter a valid number";
        scopeObj.view.valueEntryMinValueLimit.flxValueTextBox.skin = "sknBorderRed";
        scopeObj.view.flxMinValueError.setVisibility(true);
        scopeObj.view.forceLayout();
      }
    };
   
    this.view.valueEntryMaxValueLimit.tbxEnterValue.onEndEditing = function(){
      if(scopeObj.view.valueEntryMaxValueLimit.tbxEnterValue.text===""){
        scopeObj.view.lblMaxValueLimitErrorMsg.text="Please enter a valid number";
        scopeObj.view.valueEntryMaxValueLimit.flxValueTextBox.skin = "sknBorderRed";
        scopeObj.view.flxMaxValueExceedError.setVisibility(true);
        scopeObj.view.forceLayout();
      }
    };

    this.view.valueEntryMaxDailyValue.tbxEnterValue.onEndEditing = function(){
      if(scopeObj.view.valueEntryMaxDailyValue.tbxEnterValue.text===""){
        scopeObj.view.lblDailyLimitValueErrorMsg.text="Please enter a valid number";
        scopeObj.view.valueEntryMaxDailyValue.flxValueTextBox.skin = "sknBorderRed";
        scopeObj.view.flxMaxDailyLimitError.setVisibility(true);
        scopeObj.view.forceLayout();
      }
    };
  /*   this.view.languagesListTCPopup.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.updateLanguagesDropdown(scopeObj.view.languagesListTCPopup.segStatusFilterDropdown,scopeObj.view.lblSelectedLangTCPopup);
      scopeObj.view.flxTCPopupLanguages.setVisibility(false);
      if(scopeObj.view.flxEditFeaturePopup.isVisible===false)
      	scopeObj.displaySelectedLanguageTC(scopeObj.view.segActionList.data[scopeObj.view.segActionList.selectedRowIndex[1]].termsAndConditions);
      else
        scopeObj.displaySelectedLanguageTC(scopeObj.view.segFeaturedActions.selectedRowIndex ? scopeObj.view.segFeaturedActions.data[scopeObj.view.segFeaturedActions.selectedRowIndex[1]].termsAndConditions :scopeObj.view.segFeaturedActions.data[0].termsAndConditions);
    }; 
   this.view.valueEntryMinValueLimit.tbxEnterValue.onTextChange = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
    };
    this.view.valueEntryMaxValueLimit.tbxEnterValue.onTextChange = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
    };
      this.view.valueEntryMaxDailyValue.tbxEnterValue.onTextChange = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
    };
    this.view.valueEntryWeeklyLimitValue.tbxEnterValue.onTextChange = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isEdited=true;
    };
    this.view.displayContentEdit.tbxEditName.onTextChange = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isContentEdited=true;
    };
    this.view.displayContentEdit.txtareaEditDescription.onTextChange = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isContentEdited=true;
    };
    this.view.actionStatusSwitch.switchToggle.onTouchEnd = function(){
      scopeObj.view.segFeaturedActions.data[scopeObj.currSelectedIndex].isStatusEdited=true;
    };
    */
    this.view.valueEntryWeeklyLimitValue.tbxEnterValue.onEndEditing = function(){
      if(scopeObj.view.valueEntryWeeklyLimitValue.tbxEnterValue.text===""){
        scopeObj.view.lblWeeklyLimitValueErrorMsg.text="Please enter a valid number";
        scopeObj.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin = "sknBorderRed";
        scopeObj.view.flxWeeklyLimitValueError.setVisibility(true);
        scopeObj.view.forceLayout();
      }
    };
    this.view.valueEntryMinValueLimit.tbxEnterValue.onTouchStart=function(){
      scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryMinValueLimit_tbxEnterValue');
      scopeObj.view.valueEntryMinValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      scopeObj.view.flxMinValueError.setVisibility(false);
    };
    this.view.valueEntryMaxValueLimit.tbxEnterValue.onTouchStart=function(){
      scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryMaxValueLimit_tbxEnterValue');
      scopeObj.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      scopeObj.view.flxMaxValueExceedError.setVisibility(false);
    };
    this.view.valueEntryMaxDailyValue.tbxEnterValue.onTouchStart=function(){
      scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryMaxDailyValue_tbxEnterValue');
      scopeObj.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      scopeObj.view.flxMaxDailyLimitError.setVisibility(false);
    };
    this.view.valueEntryWeeklyLimitValue.tbxEnterValue.onTouchStart=function(){
      scopeObj.restrictTextFieldToNumericAndDot('frmServiceManagement_valueEntryWeeklyLimitValue_tbxEnterValue');
      scopeObj.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      scopeObj.view.flxWeeklyLimitValueError.setVisibility(false);
    };
    this.view.EditFeatureLangList.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.view.flxFeatureLanguages.setVisibility(false);
      scopeObj.prevSelLang=scopeObj.view.lblSelectedLanguage.info.selLang.langCode;
      scopeObj.updateLanguagesDropdown(scopeObj.view.EditFeatureLangList.segStatusFilterDropdown, scopeObj.view.lblSelectedLanguage);
      scopeObj.displaySelectedLanguageContentEditMode("langClick");
    };
    this.view.fontIconActionTypes.onHover = function(widget, context) {
      var info = "Specifies that the action is applicable to Feature types indicated.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
	this.view.fontIconActionCategory.onHover = function(widget, context) {
      var info = "Specifies if the Action involves financial transactions or not. Possible values are MONETARY and NON MONETARY.";
      scopeObj.onHoverCallBack(widget, context, info);
    };	
    this.view.fontIconActionDependencies.onHover = function(widget, context) {
      var info = "Shows the list of actions, which the current action is dependent on, with in the feature.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconActionLimitGroup.onHover = function(widget, context) {
      var info = "For the Monetary Actions, Limit Group specified indicates the logical group at which limit controls can be set up.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconFeatureDetailsRow11Header.onHover = function(widget, context) {
      var info = "Specifies that this feature is applicable to Service types indicated.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMinPerTxLimit.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum per transaction value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMaxTxLimit.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum transaction limit value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMaxDailyLimit.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum daily limit value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMaxWeeklyLimit.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum weekly limit value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconActionType.onHover = function(widget, context) {
      var info = "Specifies that the action is applicable to Feature types indicated.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconViewDependency.onHover = function(widget, context) {
      var info = "Shows the list of actions, which the current action is dependent on, with in the feature.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconViewLimitGroup.onHover = function(widget, context) {
      var info = "For the Monetary Actions, Limit Group specified indicates the logical group at which limit controls can be set up.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconData2.onHover = function(widget, context) {
      var info = "Specifies that this feature is applicable to Service types indicated.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMinVal.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum per transaction value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMaxVal.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum transaction limit value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMaxDailyVal.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum daily limit value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.fontIconMaxWeeklyVal.onHover = function(widget, context) {
      var selInd = scopeObj.view.segFeatures.selectedRowIndex[1];
      var featureName = scopeObj.view.segFeatures.data[selInd].lblFeatureName.text;
      var info = "This is the maximum weekly limit value for any " + featureName + " transaction submitted over the online banking channel.";
      scopeObj.onHoverCallBack(widget, context, info);
    };
    this.view.mainHeader.flxDownload.onClick = function(){
      scopeObj.downloadEmpFeaturesCSV();
    };
  },
  //Hiding unnecessary flexes
  hideAll: function(){
    this.view.breadcrumbs.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.flxAddService.setVisibility(false);
    this.view.flxScrollViewServices.setVisibility(false);
    this.view.flxLanguages.setVisibility(false);
    this.view.flxActionLanguages.setVisibility(false);
    this.view.flxViewServiceData.setVisibility(false);
    if(this.currSuccessMsg==="")
    this.view.flxToastMessage.setVisibility(false);
    this.view.flxViewActionData.setVisibility(false);
    this.view.flxViewLimitsGroup.setVisibility(false);
  },    
 updateActionPayload :function(){
   var data =this.actionsRecList;
   this.editFeaturePayloadParam={
     "actions":[]
   }; 
   for(var i=0;i<data.length;i++){
     var actionObj = {
       "actionId":"",
       "statusId":"",
       "actionDisplay":[{}]
     };
     actionObj.actionId=data[i].actionId;
     actionObj.statusId=data[i].status;
       //this.view.actionStatusSwitch.switchToggle.selectedindex===0?"SID_ACTION_ACTIVE":"SID_ACTION_INACTIVE";
     // this.editFeaturePayloadParam.actions[i]["actionDisplay"]=[{}];
     actionObj.actionDisplay[0].localeId="en-US";
     actionObj.actionDisplay[0].displayName=data[i].actionDisplayName["en-US"].displayName;
     actionObj.actionDisplay[0].displayDescription=data[i].actionDisplayName["en-US"].displayDescription;
     this.editFeaturePayloadParam.actions.push(actionObj);  
   } 
 }, 
  /*overwritting component widget level selection property
  */
  setSegmentSelectionProperty : function(){
    var selectionProp = {
      imageIdentifier: "imgCheckBox",
      selectedStateImage: "checkboxselected.png",
      unselectedStateImage: "checkboxnormal.png"
    };
    this.view.EditFeatureLangList.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.EditFeatureLangList.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    if(this.view.EditFeatureLangList.flxSearchContainer)
      this.view.EditFeatureLangList.flxSearchContainer.setVisibility(false);
    this.view.featuresLangList.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.featuresLangList.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    if(this.view.featuresLangList.flxSearchContainer)
      this.view.featuresLangList.flxSearchContainer.setVisibility(false);
    this.view.languagesListTCPopup.segStatusFilterDropdown.selectionBehavior = constants.SEGUI_MULTI_SELECT_BEHAVIOR;
    this.view.languagesListTCPopup.segStatusFilterDropdown.selectionBehaviorConfig = selectionProp;
    if(this.view.languagesListTCPopup.flxSearchContainer)
      this.view.languagesListTCPopup.flxSearchContainer.setVisibility(false);
    this.view.forceLayout();
  },

  validateFields : function(){
    var isValid=true;
    var phoneRegex= /^\d+(\.\d{0,2})?$/g; // /^\d+(\.\d\d)?$/g;
    if(this.view.ValueEntry.tbxEnterValue.text===""){
      isValid=false;
      this.view.ValueEntry.flxValueTextBox.skin = "sknFlxCalendarError";
      this.view.flxNoServiceFee.setVisibility(true);
      this.view.lblNoServiceFeeError.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ServiceFeeCannotBeEmpty");
    } else if(phoneRegex.test(this.view.ValueEntry.tbxEnterValue.text) === false){
      isValid=false;
      this.view.ValueEntry.flxValueTextBox.skin = "sknFlxCalendarError";
      this.view.flxNoServiceFee.setVisibility(true);
      this.view.lblNoServiceFeeError.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.EnterValidServiceFee");
    }
    if (this.view.tbxEditFeatureName.text.trim().length === 0) {
            isValid = false;
            this.view.tbxEditFeatureName.skin = "sknTxtError";
            this.view.flxNoEditFeatureNameError.setVisibility(true);
    }
    if(this.view.txtareaEditFeatureDescription.text.trim().length===0){
      isValid=false;
      this.view.txtareaEditFeatureDescription.skin="sknTxtError";
      this.view.flxNoEditFeatureDescriptionError.setVisibility(true);
    }
    if(isValid)
      this.displaySelectedLanguageContentEditMode("langClick");
    return isValid;
  },
  validateFieldsLimitGroup : function(){
    var isValid=true;
    if(this.view.displayContentLimitGroupEdit.txtareaEditDescription.text.trim().length===0){
      isValid=false;
      this.view.displayContentLimitGroupEdit.txtareaEditDescription.skin="sknTxtError";
      this.view.displayContentLimitGroupEdit.flxNoEditDescriptionError.setVisibility(true);
    }else{
      this.view.displayContentLimitGroupEdit.txtareaEditDescription.skin="skntxtAreaLato35475f14Px";
      this.view.displayContentLimitGroupEdit.flxNoEditDescriptionError.setVisibility(false);
    }
    if(this.view.displayContentLimitGroupEdit.tbxEditName.text.trim().length===0){
      isValid=false;
      this.view.displayContentLimitGroupEdit.tbxEditName.skin="sknTxtError";
      this.view.displayContentLimitGroupEdit.flxNoEditNameError.setVisibility(true);
    }else{
      this.view.displayContentLimitGroupEdit.tbxEditName.skin="skntbxLato35475f14px";
      this.view.displayContentLimitGroupEdit.flxNoEditNameError.setVisibility(false);
    }
    if(isValid)
      this.displaySelectedLangLimitGroupEditMode("langClick");
    return isValid;
  },
  validateFieldsAction : function(){
    var isValid=true;
    this.prevSelLangAction = this.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode;
    if (this.view.displayContentEdit.tbxEditName.text.trim().length === 0) {
            isValid = false;
            this.view.displayContentEdit.tbxEditName.skin = "sknTxtError";
            this.view.displayContentEdit.flxNoEditNameError.setVisibility(true);
    }
    if(this.view.displayContentEdit.txtareaEditDescription.text.trim().length===0){
      isValid=false;
      this.view.displayContentEdit.txtareaEditDescription.skin="sknTxtError";
      this.view.displayContentEdit.flxNoEditDescriptionError.setVisibility(true);
    }
    if(isValid)
      this.updateActionEditPayload();
    return isValid;
  },
  showDeactivatePopup : function(opt) {
    var scopeObj = this;
    var featureIndex = this.view.segFeatures.selectedRowIndex;
    var featureData = this.view.segFeatures.data[featureIndex[1]];
    var featureName=featureData.name;
    this.view.popUpDeactivate.flxPopUp.top="250px";
    this.view.popUpDeactivate.flxDependencyViewContainer.setVisibility(false);
    this.view.popUpDeactivate.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagementController.Deactivate_Service");//+" \""+featureName+"\"";
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent1")+"\""+featureName+"\"?"+kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent2");
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    this.view.popUpDeactivate.btnPopUpCancel.left="15px";
    this.view.popUpDeactivate.btnPopUpDelete.left="20px";
    //this.view.popUpDeactivate.btnPopUpDelete
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivatepopBtn");
    this.view.flxDeactivateServiceManagement.setVisibility(true);
    if(opt === 1){
      this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
        scopeObj.deactivateService();
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      };
    }
    else if(opt === 2){
      var actionIndex = this.view.segActionList.selectedRowIndex;
      var actionData = this.view.segActionList.data[actionIndex[1]];
      var actionName=actionData.lblActionName;
      this.view.popUpDeactivate.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagement.deactivateAction")+" \""+actionName+"\" ?";
      if(this.view.flxFeatureDetailsWarning.isVisible){
        this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.closeCAPS");
        this.view.popUpDeactivate.btnPopUpDelete.setVisibility(false);
        this.view.popUpDeactivate.rtxPopUpDisclaimer.text =  kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent5")+featureName+"\"?"+kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent6");
        this.view.popUpDeactivate.flxPopUpTopColor.skin="sknFlxBge61919";
      }else{
      this.view.popUpDeactivate.flxDependencyViewContainer.setVisibility(true);
      this.mapPopupDependencies();
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent3")+" \""+featureName+"\"? "+kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent4");
      this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
        scopeObj.deactivateAction();
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      };
      }
    }
    else{
      this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
        scopeObj.deactivateFeatureDetails();
        scopeObj.view.flxDeactivateServiceManagement.setVisibility(false);
      };
    }
    
    this.view.forceLayout();
  },
  showActivatePopup : function(opt) {
    var scopeObj = this;
     var actionIndex = this.view.segActionList.selectedRowIndex;
      var actionData = this.view.segActionList.data[actionIndex[1]];
      var actionName=actionData.lblActionName;
    var featureIndex = this.view.segFeatures.selectedRowIndex;
    var featureData = this.view.segFeatures.data[featureIndex[1]];
    var featureName=featureData.name;
    this.view.popupError.lblPopUpMainMessage.text =  kony.i18n.getLocalizedString("i18n.frmServiceManagement.activateAction")+" \""+actionName+"\" ?";
    this.view.popupError.rtxPopUpDisclaimer.text =  kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent5")+" \""+featureName+" \""+kony.i18n.getLocalizedString("i18n.frmEmpFeature.deactivate_MessageContent6");
    this.view.flxActivateActionPopup.setVisibility(true);
    this.view.forceLayout();
  },
  deactivateService : function() {
    var self = this;
    var index = self.view.segFeatures.selectedRowIndex;
    var rowInd = index[1];
    var rowData = self.view.segFeatures.data[rowInd];
    var statusId = "";
    if(rowData !== null){
      if (rowData.Status_id === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) {
        statusId = self.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE;
      } else {
        statusId = self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE;
      }

      self.changeStatusOfService(rowData,statusId);
    }
    this.view.forceLayout();
  },
  deactivateAction : function() {
    var self = this;
    var featureIndex = self.view.segFeatures.selectedRowIndex;
    var actionIndex = self.view.segActionList.selectedRowIndex;
    var featureData = self.view.segFeatures.data[featureIndex[1]];
    var actionData = self.view.segActionList.data[actionIndex[1]];
    var statusId = "";
    this.actionStatusReqParam={
        "actionId":actionData.actionCode,
      "status":(actionData.lblActionStatus.text === "Active")?this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE:this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE
    };
    self.currSuccessMsg=self.successMsgParam.EDIT;
    this.presenter.updateStatusOfEmpAction(this.actionStatusReqParam,featureData.id);
    this.view.forceLayout();
  },
  /* deactivate feature from details screen*/
  deactivateFeatureDetails : function(){
    var status = this.view.lblFeatureDetailsStatusValue.text;
    var serviceFee=this.view.lblFeatureDetailsRow13Value.text.slice(2);
    var statusId = "";
    var data = {"id": this.view.lblFeatureDetailsName.info.id,
                 "Service_fee" :this.checkForNull(serviceFee, "")
               };
    if(status.toLowerCase() === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active").toLowerCase()){
      statusId = this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE;
    } else{
      statusId = this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE;
    }
    this.changeStatusOfService(data,statusId);
    
  },
  //show add service screen,when no services exists
  showAddService : function() {
    this.view.breadcrumbs.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
	this.view.flxMainSubHeader.setVisibility(false);
    this.view.flxScrollViewServices.setVisibility(false);
    this.view.flxMainContent.setVisibility(true);
    this.view.flxAddService.setVisibility(true);
    this.view.forceLayout();
  },
  //hide edit/add screen
  hideService : function() {
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxAddService.setVisibility(false);
    this.view.flxMainContent.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxMainSubHeader.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "Features";
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.EmployeeFeatures");
    this.adjustFeaturesContTop(true);
    this.view.flxViewServiceData.setVisibility(false);
    this.view.flxScrollViewServices.setVisibility(true);
    this.view.flxContextualMenu.setVisibility(false);
  },
  //show  view service details screen on row click
  showViewFeatureScreen : function() {
    this.hideAll();
    this.view.breadcrumbs.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "FEATURE LIST";
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.mainHeader.lblHeading.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFeature");

    this.view.flxAddService.setVisibility(false);
    this.view.flxScrollViewServices.setVisibility(false);
    if(this.view.flxFeatureDetailsContextualMenu.isVisible)
      this.view.flxFeatureDetailsContextualMenu.setVisibility(false);
    this.view.flxViewServiceData.setVisibility(true);
    this.adjustFeaturesContTop(false);
    this.view.forceLayout();
  },
  //show  view action details screen on row click
  showViewActionScreen: function() {
    this.hideAll();
    this.view.breadcrumbs.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "FEATURES";
    this.view.breadcrumbs.btnPreviousPage.text = this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewFeature");
    if(this.view.flxActionDetailsContextualMenu.isVisible)
      this.view.flxActionDetailsContextualMenu.setVisibility(false);
    this.view.flxViewActionData.setVisibility(true);
    this.adjustFeaturesContTop(false);
    this.view.forceLayout();
  },
  //show  view limits group screen on row click
  showViewLimitGroupScreen: function() {
    this.hideAll();
    this.view.breadcrumbs.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = "FEATURES";
    this.view.breadcrumbs.lblCurrentScreen.text= "LIMIT GROUPS";
    this.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.mainHeader.lblHeading.text = "View Limit Groups";    
    this.view.flxViewLimitsGroup.setVisibility(true);
    this.adjustFeaturesContTop(false);
    this.view.forceLayout();
  },
  /*
   * adjust the features content top based on feture-facility tabs visibility
   */
  adjustFeaturesContTop : function(isTabVisible){
    if(isTabVisible === true){
      this.view.flxMainContent.top = "175dp";
    } else{
      this.view.flxMainContent.top ="135dp";
    }
  },
  /*
   * function to set data to view limits group screen, called on click of btnaddnewoption
   */
  setLimitGroupsData: function(response) {
    var self = this;
    var widgetMap = {
      "flxArrow":"flxArrow",
      "lblArrow":"lblArrow",
      "lblLimitGroupName":"lblLimitGroupName",
      "flxLimitGroupDetails":"flxLimitGroupDetails",
      "lblLimitGroupCode":"lblLimitGroupCode",
      "flxOptions": "flxOptions",
      "lblIconImgOptions":"lblIconImgOptions",
      "flxDescription":"flxDescription",
      "lblDescriptionValue":"lblDescriptionValue",
      "lblDescriptionHeader":"lblDescriptionHeader",
      "lblSeperatorLine":"lblSeperatorLine",
      "displayContent":"displayContent"
    };
    
    var segData = response.map(function(rec){
      return {       
        "lblLimitGroupName": rec.name,
        "lblLimitGroupCode": rec.id,
        "flxArrow": {
          "onClick": self.toggleLimitDescription
        },
        "lblArrow": {
          "text": "\ue922",
          "skin": "sknfontIconDescRightArrow14px"
        },  
        "flxLimitGroupDetails": {
          "onClick": self.showViewLimitGroupPopup,
         },
        "flxOptions": {
          "onClick": self.showEditLimitGroupPopup
        },
        "lblIconImgOptions": {
          "text":kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblIconOption1")
        },
        "flxDescription": {
          "isVisible": false
        },
        "lblDescriptionValue": rec.description,
        "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
        "lblSeperatorLine": "-",
        "displayContent":rec.limitGroupDisplayName,
        "template": "flxLimitGroup"
      };
    });
    self.sortBy = self.getObjectSorter("lblLimitGroupName");
    self.determineSortFontIcon(self.sortBy, 'lblLimitGroupName', self.view.fontIconSortLimitGroup);
    self.view.segLimitGroup.widgetDataMap = widgetMap;
    self.view.segLimitGroup.setData(segData.sort(self.sortBy.sortData));
    self.view.segLimitGroup.info = {"segData":segData};
    self.view.forceLayout();
  },
  /*
   * function to set data to view service details screen, called on click of seg row
   */
  setViewActionData : function(){
    var index = this.view.segActionList.selectedIndex;
    var rowIndex = index[1];
    var rowData = this.view.segActionList.data[rowIndex];
    this.view.breadcrumbs.lblCurrentScreen.text = (rowData.lblActionName).toUpperCase();
    this.view.lblActionDetailsName.text = this.checkForNull(rowData.lblActionName,kony.i18n.getLocalizedString("i18n.Applications.NA"));
    this.view.lblActionDetailsName.info = {"id":rowData.id};
    this.view.lblActionStatusValue.text = this.checkForNull(rowData.lblActionStatus.text,kony.i18n.getLocalizedString("i18n.Applications.NA"));
    this.view.lblIconActionStatus.text = rowData.fontIconStatusImg.text;
    this.view.lblIconActionStatus.skin = rowData.fontIconStatusImg.skin;
    this.view.lblActionCategoryValue.text=rowData.lblActionCategory;
    this.view.lblActionCodeValue.text=rowData.actionCode; 
   // this.view.lblActionTnCValue.text=rowData.lblActionTaCLink.text;
   // this.view.lblActionTnCValue.skin=rowData.lblActionTaCLink.skin;
    //this.view.lblActionTnCValue.hoverSkin=rowData.lblActionTaCLink.hoverSkin;
    this.view.lblActionMFAValue.text=(rowData.actionMfa === true)? "Yes": kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.lblActionTypesValue.text=rowData.lblActionType;
   // this.view.lblActionLevelValue.text=rowData.actionLevel.toUpperCase();
    this.view.lblActionAccessLevelValue.text=rowData.accessLevel.toUpperCase();
    this.view.lblActionDependenciesValue.text=rowData.lblDependencies.text;
    this.view.lblActionDependenciesValue.skin=rowData.lblDependencies.skin;
    this.view.lblActionDependenciesValue.hoverSkin=rowData.lblDependencies.hoverSkin;   
    this.view.lblActionDependenciesValue.onClick=rowData.lblDependencies.onClick;
    if(this.view.lblActionStatusValue.text === "Inactive"){
      this.view.flxActionDetailsWarning.setVisibility(true);
    }else{
      this.view.flxActionDetailsWarning.setVisibility(false);
    }   
    var langList = this.view.actionLangList.segStatusFilterDropdown.info.lang;
    this.setLanguagesList(langList,false);    
    this.displaySelectedLanguageContentAction();
    if(rowData.lblActionCategory.toUpperCase() === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
      this.view.flxLimit.setVisibility(true);
      this.view.flxActionLimitGroup.setVisibility(true);
      this.view.lblActionLimitGroupValue.text=rowData.lblActionLimitGroup;
      var maplimits; 
      maplimits = rowData.limits.reduce(function(maplimits, obj) {
        maplimits[obj.type] = obj.value;
        return maplimits;
      },{});
      this.view.lblMinPerTxLimitValue.text = maplimits.MIN_TRANSACTION_LIMIT;
      this.view.lblMaxTxLimitValue.text = maplimits.MAX_TRANSACTION_LIMIT;
      this.view.lblMaxDailyLimitValue.text = maplimits.DAILY_LIMIT;
      this.view.lblMaxWeeklyLimitValue.text = maplimits.WEEKLY_LIMIT;
    }
    else{
      this.view.flxLimit.setVisibility(false);
      this.view.flxActionLimitGroup.setVisibility(false);
    }
    document.getElementById("frmEmployeeFeatures_flxViewServiceData").onscroll = this.hideOptionMenuOnScroll;
  },
  /*
   * function called on click of save from create service to call presentation controller
   */
  saveService : function () {
    var self = this;
    var condition = self.validation();
    if (condition) {
      self.presenter.createService(self.createServiceReqParam);
      self.hideService();
    }
  },
  
  setFeaturesSegmentData: function (featuresList,isFilter) {

    var scopeObj = this;
    this.gblServicesData = [
      [
        this.gblServicesList
      ]
    ];
    if (featuresList === undefined) {
      scopeObj.view.segFeatures.setData([]);
    } else {
      var records = featuresList;
      if (records.length === 0) {
        scopeObj.showNoResultsFound();
        if(isFilter){
          this.view.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
          this.view.flxHeaderFeatures.setVisibility(true);
        }
      } else {
        var dataMap = {
          //required fields mappings
          "id": "id",
          "name": "name",
          "Type_id":"Type_id",
          "Status_id":"Status_id",
          "DisplayName": "DisplayName",
          "DisplayDesc": "DisplayDesc",
          "Service_fee":"Service_fee",
          "displayContent":"displayContent",
          "featureIds":"featureIds",
          //widget mappings
          "lblFeatureName": "lblFeatureName",
          "lblFeatureCode" : "lblFeatureCode",
          "lblIconImgOptions": "lblIconImgOptions",
          "lblFeatureType": "lblFeatureType",
          "lblFeatureStatus": "lblFeatureStatus",
          "fontIconStatusImg" : "fontIconStatusImg",
          "flxFeatureStatus" : "flxFeatureStatus",
          "lblSeperator":"lblSeperator",
          "flxOptions":"flxOptions",
          "flxDropdown":"flxDropdown",
          "fonticonArrow":"fonticonArrow",
          "flxFeatureDescriptionContent":"flxFeatureDescriptionContent",
          "lblDescriptionHeader": "lblDescriptionHeader",
          "lblDescriptionValue": "lblDescriptionValue"
        };
        scopeObj.hideNoResultsFound();
        var data = featuresList.map(scopeObj.toViewFeaturesSegment.bind(scopeObj)); 
        scopeObj.view.segFeatures.widgetDataMap = dataMap;
        scopeObj.view.segFeatures.setData(data);
        if (document.getElementById("frmEmployeeFeatures_listingSegmentClient_segListing"))
        	document.getElementById("frmEmployeeFeatures_flxSegmentFeatures").onscroll = scopeObj.contextualMenuOff;
        scopeObj.view.forceLayout();
      }
    }
  },
  contextualMenuOff: function(context) {
    var scopeObj = this;
    scopeObj.view.flxContextualMenu.setVisibility(false);
    scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
    this.view.forceLayout();
  },
   /*
  * function to set data to type and status filter segments
  */
  setListFiltersData: function () {
    var self = this;
    var statusList=[],typeList=[],maxStatusText = "",maxTypeText ="";
    for(var i=0;i<self.featuresRecList.length;i++){
      if(!statusList.contains(self.featuresRecList[i].Status_id))
        statusList.push(self.featuresRecList[i].Status_id);
    }
    var widgetMap = {
      "Status_id": "Status_id",
      "Type_id": "Type_id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){
      var mapJson = {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": (rec === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE)? kony.i18n.getLocalizedString("i18n.secureimage.Active"):(rec === self.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE)?kony.i18n.getLocalizedString("i18n.secureimage.Inactive"):kony.i18n.getLocalizedString("i18n.common.Unavailable")
      };
      maxStatusText = mapJson['lblDescription'].length > maxStatusText.length ? mapJson['lblDescription'] : maxStatusText; 
      return mapJson;
    });
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(statusData);

    var selStatusInd = [],selTypeInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedRowIndices = [[0,selStatusInd]];
    //set filter width
    self.view.flxFeatureStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxStatusText)+55+"px";
    self.view.forceLayout();
  },
  /*
   * filters groups list based on selected type and status
   * @param: groups backend data
   * @return : filtered data
   */
  filterBasedOnTypeStatus : function(data){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var featuresList = data || self.featuresRecList;
    var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selStatusInd = null;
    //get selected status
      var statuses = "";
      selStatusInd = statusIndices ? statusIndices[0][1] : [];
      for (var j = 0; j < selStatusInd.length; j++) {
        selFilter[0][0].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id);
        statuses += self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id + ",";
      }
    var accesslevel = "";
      selStatusInd = statusIndices ? statusIndices[0][1] : [];
      for (var j = 0; j < selStatusInd.length; j++) {
        selFilter[0][0].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id);
        statuses += self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id + ",";
      }
    
      if(self.view.mainHeader.btnDropdownList.info === undefined) {
        self.view.mainHeader.btnDropdownList.info = {};
      }
      self.view.mainHeader.btnDropdownList.info.selectedStatusList = statuses.substring(0, statuses.length-1);
  
    if (selFilter[0][0].length === 0) { //none selected - show no results
      dataToShow = [];
    } else if (selFilter[0][0].length > 0) {
      dataToShow = featuresList.filter(function (rec) {
        var featureIdList = [];        
        if (selFilter[0][0].indexOf(rec.Status_id) >= 0) {
          return rec;
        }
      });
    } else { //single filter selected
    }
    return dataToShow;
  },
  toViewFeaturesSegment: function(feature) {
    var scopeObj = this;
    var featureNameList = [],featureIdList = [];
    var status ="",statusSkin="";
    var totalactions = feature.numberOfActions?feature.numberOfActions.toString():"00";
    if(feature.Status_id === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE){
      status = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      statusSkin = "sknFontIconActivate";
    }else if(feature.Status_id === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
      status = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      statusSkin = "sknfontIconInactive";
    }else{
      status = kony.i18n.getLocalizedString("i18n.common.Unavailable");
      statusSkin = "sknIconBgE61919S12px";
    }
    return {
      "id": feature.id,
      "name":feature.name,
      "Type_id":feature.Type_id,
      "Status_id":feature.Status_id,
      "Service_fee":feature.Service_Fee,
      "displayContent":feature.featureDisplayName,
      "featureIds":featureIdList,
      "description":feature.featureDisplayName["en-US"]?feature.featureDisplayName["en-US"].displayDescription:"N/A",
      "actionsCount":totalactions,
      "lblFeatureName": {
        "text": feature.name
      },
      "flxDropdown": {
        "onClick": scopeObj.toggleFeatureDescription
      },
      "fonticonArrow": {
        "text": "\ue922",
        "skin": "sknfontIconDescRightArrow14px"
      },
      "flxFeatureDescriptionContent": {
        "isVisible": false
      },
      "lblFeatureCode": {
        "text": scopeObj.AdminConsoleCommonUtils.getTruncatedString(feature.id,25,21),
        "info":{"value" :feature.id || "-"},
        "tooltip":feature.id || ""
      },
      "lblFeatureType": {
        "text":scopeObj.getTwoDigitNumber(totalactions)
      },
      "fontIconStatusImg": {
        "text": "\ue921",
        "skin": statusSkin
      },
      "lblFeatureStatus": {
        "text": status
      },

      "flxOptions": {
        "onClick": function () {
          scopeObj.toggleContextualMenu(50);
        },
        "skin" : "slFbox"
      },
      "lblIconImgOptions": {
        "text":"\ue91f",
        "skin":"sknFontIconOptionMenu"
      },
      "lblSeperator": {
        "text": "."
      },
      "lblDescriptionHeader": "DESCRIPTION" ,
      "lblDescriptionValue":feature.featureDisplayName["en-US"]?feature.featureDisplayName["en-US"].displayDescription:"N/A",
      "template": "flxFeatures",
    };

  },
    
  toggleContextualMenu: function() {
    var scopeObj = this;
    
    var index = this.view.segFeatures.selectedIndex;
    this.optionButtonStateChange(index[1], true);

    if (this.view.flxContextualMenu.isVisible === false) {
      this.rowIndex = index[1];
      var templateArray = this.view.segFeatures.clonedTemplates;
      //to caluclate top from preffered row heights
      var finalHeight = 0;
      for(var i = 0; i < this.rowIndex; i++){
        finalHeight = finalHeight + templateArray[i].flxFeatures.frame.height;
      }
      var flexLeft = this.view.segFeatures.clonedTemplates[this.rowIndex].flxOptions.frame.x;
      this.view.flxContextualMenu.left=flexLeft-74+"px";
      this.updateContextualMenu();
      this.view.flxContextualMenu.setVisibility(true);
      this.view.forceLayout();
      var segmentWidget = this.view.flxSegmentFeatures;
      var contextualWidget =this.view.contextualMenu;
      finalHeight = ((finalHeight + 39)- segmentWidget.contentOffsetMeasured.y+60);
      if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
        finalHeight = finalHeight - contextualWidget.frame.height - 30;
        scopeObj.view.contextualMenu.flxUpArrowImage.setVisibility(false);
        scopeObj.view.contextualMenu.flxDownArrowImage.setVisibility(true);
        scopeObj.view.contextualMenu.contextualMenu1Inner.top = "0px";
      }
      else {
        scopeObj.view.contextualMenu.flxUpArrowImage.setVisibility(true);
        scopeObj.view.contextualMenu.flxDownArrowImage.setVisibility(false);
        scopeObj.view.contextualMenu.contextualMenu1Inner.top = "-1px";
      }
      this.view.flxContextualMenu.top= finalHeight + "px";
    } else {
      this.view.flxContextualMenu.setVisibility(false);
    }
    if(this.view.flxFeatureStatusFilter.isVisible){
      this.view.flxFeatureStatusFilter.setVisibility(false);
    }
  },
  toggleContextualMenuAction: function() {
    var scopeObj = this;
    
    var index = this.view.segActionList.selectedIndex;
    this.optionButtonStateChangeAction(index[1], true);

    if (this.view.flxContextualMenuAction.isVisible === false) {
      this.rowIndex = index[1];
      var templateArray = this.view.segActionList.clonedTemplates;
      //to caluclate top from preffered row heights
      var finalHeight = 0;
      for(var i = 0; i < this.rowIndex; i++){
        finalHeight = finalHeight + templateArray[i].flxEmployeeFeatureActions.frame.height;
      }
      var flexLeft = this.view.segActionList.clonedTemplates[this.rowIndex].flxOptions.frame.x;
      this.view.flxContextualMenuAction.left=flexLeft-74+"px";
      this.updateContextualMenuAction();
      this.view.flxContextualMenuAction.setVisibility(true);
      this.view.forceLayout();
      var segmentWidget = this.view.flxViewServiceData;
      var contextualWidget =this.view.contextualMenuAction;
      finalHeight = ((finalHeight + 75)- segmentWidget.contentOffsetMeasured.y+60);
      if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
        finalHeight = finalHeight - contextualWidget.frame.height - 30;
        scopeObj.view.contextualMenuAction.flxUpArrowImage.setVisibility(false);
        scopeObj.view.contextualMenuAction.flxDownArrowImage.setVisibility(true);
        scopeObj.view.contextualMenuAction.contextualMenu1Inner.top = "0px";
      }
      else {
        scopeObj.view.contextualMenuAction.flxUpArrowImage.setVisibility(true);
        scopeObj.view.contextualMenuAction.flxDownArrowImage.setVisibility(false);
        scopeObj.view.contextualMenuAction.contextualMenu1Inner.top = "-1px";
      }
      this.view.flxContextualMenuAction.top= finalHeight + segmentWidget.contentOffsetMeasured.y + "px";
    } else {
      this.view.flxContextualMenuAction.setVisibility(false);
    }
    this.view.flxDetailsActionStatusFilter.setVisibility(false);
    this.view.flxDetailsActionTypeFilter.setVisibility(false);
    this.view.flxDetailsActionCategoryFilter.setVisibility(false);
    this.view.flxDetailsActionLimitGroupFilter.setVisibility(false);
  },
  updateContextualMenuAction: function() {
    kony.print("Inside updateContextualMenu()");
	this.view.contextualMenuAction.flxOption2.setVisibility(true);
    this.view.contextualMenuAction.flxOption1.top="10px";
    var data = this.view.segActionList.data;
    if (data[this.rowIndex].lblActionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.contextualMenuAction.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.contextualMenuAction.lblIconOption2.text = "\ue91c";
      this.view.contextualMenuAction.lblIconOption2.skin = "sknIcon20px";
    } else if(data[this.rowIndex].lblActionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
      this.view.contextualMenuAction.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.contextualMenuAction.lblIconOption2.text = "\ue931";
      this.view.contextualMenuAction.lblIconOption2.skin = "sknIcon20px";
    }else{
      this.view.contextualMenuAction.flxOption1.top="0px";
  	  this.view.contextualMenuAction.flxOption2.setVisibility(false);
	}
    this.view.forceLayout();
  },

  updateContextualMenu: function() {
    kony.print("Inside updateContextualMenu()");
	this.view.contextualMenu.flxOption2.setVisibility(true);
    this.view.contextualMenu.flxOption1.top="10px";
    var data = this.view.segFeatures.data;
    if (data[this.rowIndex].lblFeatureStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.contextualMenu.lblIconOption2.text = "\ue91c";
      this.view.contextualMenu.lblIconOption2.skin = "sknIcon20px";
    } else if(data[this.rowIndex].lblFeatureStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")){
      this.view.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.contextualMenu.lblIconOption2.text = "\ue931";
      this.view.contextualMenu.lblIconOption2.skin = "sknIcon20px";
    }else{
      this.view.contextualMenu.flxOption1.top="0px";
  	  this.view.contextualMenu.flxOption2.setVisibility(false);
	}
    this.view.forceLayout();
  },
  showNoResultsFound : function(){
    this.view.segFeatures.setVisibility(false);
    this.view.rtxNoResultsFound.setVisibility(true);
    this.view.flxHeaderFeatures.setVisibility(false);
    this.view.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+this.view.searchBoxFeatures.tbxSearchBox.text+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
    this.view.forceLayout();
  },
  hideNoResultsFound : function(){
    this.view.segFeatures.setVisibility(true);
    this.view.rtxNoResultsFound.setVisibility(false);
    this.view.flxHeaderFeatures.setVisibility(true);
    this.view.forceLayout();
  },
  searchFilter: function(serviceData) {
    var searchText = this.view.searchBoxFeatures.tbxSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      return (
        serviceData.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    } else {
      return true;
    }
  },
    
  /*
   *function to clear inline  errors
   */
  clearInlineErrors : function(){
    var self = this;
    self.view.ValueEntry.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    self.view.tbxEditFeatureName.skin="skntbxLato35475f14px";
    self.view.txtareaEditFeatureDescription.skin="skntxtAreaLato35475f14Px";
    self.view.flxNoServiceFee.setVisibility(false);
    self.view.flxNoEditFeatureNameError.setVisibility(false);
    self.view.flxNoEditFeatureDescriptionError.setVisibility(false);
    self.view.valueEntryMinValueLimit.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    self.view.valueEntryMaxValueLimit.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    self.view.valueEntryMaxDailyValue.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    self.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin ="sknFlxbgFFFFFFbdrD7D9E0rd3px";
    self.view.forceLayout();
  },
  /*
   * function to call presentation controller to get all master data
   */
  getMasterDataservices : function(){
    var self =this;
    self.presenter.getFeaturesMasterData();
  },
  /*
   * function to call presentation controller to fetch all features
   */
  getAllFeatures : function(){
    var self = this;
    self.presenter.fetchAllEmpFeatures();
  },
  /*
   * function to call update function of presentation controller
   * @ param : edited data request param
   */
  updateServiceDetails : function (editReqParam) {
    var self = this;
    var condition = self.validation();
    if (condition) {
      self.presenter.updateService(editReqParam);
      self.hideService();
    }
  },  /*
   * function to prefill service details form
   */ 
   prefillFeatureDataForEdit : function(opt){
     
      if (this.isActionEdit === true) {
                    this.isActionEdit = false;
                    var selInd = this.view.segActionList.selectedRowIndex;
                    this.subTabsButtonUtilFunction([this.view.btnFeatures, this.view.btnActions], this.view.btnActions);
                    this.view.segFeaturedActions.selectedRowIndex= selInd;
                    this.toggleSelectedRow();
        var featureId=this.view.lblFeatureNamePopup.text;
                    this.mapDependencies(this.view.segFeaturedActions.data[selInd[1]].dependentActions,featureId);
                    this.view.flxFeaturedAction.setVisibility(true);
                    this.view.flxFeatureContainer.setVisibility(false);
                 //   this.view.forceLayout();
                }
     this.view.flxEditFeaturePopup.setVisibility(true);
    var index = this.view.segFeatures.selectedRowIndex;
    var rowInd = index[1];
    var rowData = this.view.segFeatures.data[rowInd];
    var featureDisplay=[];
    this.editFeatureReqParam={
      "featureId":rowData.id,
      "serviceFee":rowData.Service_fee,
      "statusId":rowData.Status_id,
      "featureDisplay":featureDisplay,
      "actions":[]
    };
  /*  var inputReq = {};
    if(opt === 1){
      inputReq = {"context": "editLimits",
                    "requestParam": {"featureId":rowData.id }
                   };
    }else{
      inputReq = {"context": "editView",
                    "requestParam": {"featureId":rowData.id }
                   };
      this.subTabsButtonUtilFunction([this.view.btnFeatures,this.view.btnActions],this.view.btnFeatures);
      this.view.flxFeaturedAction.setVisibility(false);
      this.view.flxFeatureContainer.setVisibility(true);
    }*/
  //  this.presenter.getActionsOfFeature(inputReq);
   // this.setSegLangData(rowData);
    this.displaySelectedLanguageContentEditMode();
    this.view.lblData2.text=rowData.lblFeatureType.text;
    this.view.lblData1.text=rowData.lblFeatureCode.text;
    this.view.lblData1.toolTip=rowData.lblFeatureCode.tooltip;
    this.view.ValueEntry.tbxEnterValue.text=rowData.Service_fee!==""?rowData.Service_fee:"0";
    this.view.ValueEntry.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    
   // this.view.btnActions.onClick =this.showFeatureActionContainer;
    if(rowData.Status_id!==this.AdminConsoleCommonUtils.constantConfig.FEATURE_UNAVAILABLE){
      this.view.lblActiveText.text=kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active");
      this.view.featureStatusSwitch.switchToggle.selectedIndex=rowData.lblFeatureStatus.text==="Active"?0:1;
      this.view.flxEditAlertStatusSwitch.setVisibility(true);
    }else{
      this.view.flxEditAlertStatusSwitch.setVisibility(false);
      this.view.lblActiveText.text=kony.i18n.getLocalizedString("i18n.common.Unavailable");
    }
    this.view.tbxEditFeatureName.skin="skntbxLato35475f14px";
    this.view.txtareaEditFeatureDescription.skin="skntxtAreaLato35475f14Px";
    this.view.lblFeaturesPopupHeading.text=kony.i18n.getLocalizedString("i18n.frmServiceManagement.EditFeature")+" - ";
    this.view.lblFeatureNamePopup.text=rowData.name;
    this.clearInlineErrors();
     
    this.view.forceLayout();
  },
  /*
   *null check function
   *@param: value to compare, default value to return
   *@return
   */
  checkForNull : function(value,defaultReturnValue){
    if(value === null || value === undefined || value === kony.i18n.getLocalizedString("i18n.Applications.NA") || value === "-" || value === "")
      return defaultReturnValue;
    else
      return value;
  },
  /*
    * function called on click of download csv
    */
  downloadEmpFeaturesCSV:function() {
    kony.print("Inside downloadEmpFeaturesCSV() of frmEmployeeFeaturesController");
    var scopeObj = this;

    var authToken = KNYMobileFabric.currentClaimToken;
    var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];
    var downloadURL = mfURL + "/services/data/v1/InternalusersObjService/operations/employeeFeatures/downloadEmployeeFeaturesList?authToken=" + authToken ;

    if(scopeObj.view.searchBoxFeatures.tbxSearchBox.text !== "") {
      downloadURL = downloadURL + "&searchText=" + scopeObj.view.searchBoxFeatures.tbxSearchBox.text;
    }

    var downloadServicesFilterJSON = scopeObj.view.mainHeader.btnDropdownList.info;

    if(downloadServicesFilterJSON !== undefined && downloadServicesFilterJSON.selectedStatusList !== undefined &&
       downloadServicesFilterJSON.selectedTypeList !== undefined) {
      var status = "&status=" + downloadServicesFilterJSON.selectedStatusList;
      downloadURL = downloadURL + status;
      var types = "&type=" + downloadServicesFilterJSON.selectedTypeList;
      downloadURL = downloadURL + types;
    }

    var encodedURI = encodeURI(downloadURL);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedURI;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  },
  /*
   * function to set data to view service details screen, called on click of seg row
   */
  setViewFeatureData : function(record){
    var index = this.view.segFeatures.selectedIndex;
    var rowIndex = index[1];
    var rowData = record?record:this.view.segFeatures.data[rowIndex];
    var featureDisplayContent=rowData.featureDisplayName||rowData.displayContent;
    var status,statusSkin;
    this.view.breadcrumbs.lblCurrentScreen.text = (rowData.name).toUpperCase();
    this.view.lblFeatureDetailsName.text = this.checkForNull(rowData.name,kony.i18n.getLocalizedString("i18n.Applications.NA"));
    this.view.lblFeatureDetailsName.info = {"id":rowData.id};
        if(rowData.Status_id === this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE){
      status = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      statusSkin = "sknFontIconActivate";
    }else if(rowData.Status_id === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
      status = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      statusSkin = "sknfontIconInactive";
    }else{
      status = kony.i18n.getLocalizedString("i18n.common.Unavailable");
      statusSkin = "sknIconBgE61919S12px";
    }
    this.view.lblFeatureDetailsStatusValue.text = this.checkForNull(status,kony.i18n.getLocalizedString("i18n.Applications.NA"));
    this.view.lblIconViewKey.text = "\ue921";
    this.view.lblIconViewKey.skin = statusSkin;
    this.view.lblServiceData2Limits.text="Actions("+this.getTwoDigitNumber(rowData.actionsCount)+")";
    
    if(this.view.lblFeatureDetailsStatusValue.text === "Inactive"){
      this.view.flxFeatureDetailsWarning.setVisibility(true);
    }else{
      this.view.flxFeatureDetailsWarning.setVisibility(false);
    }
    var langList = this.view.featuresLangList.segStatusFilterDropdown.info.lang;
    this.setLanguagesList(langList,false);
    this.view.lblFeatureDetailsRow11Value.text =this.AdminConsoleCommonUtils.getTruncatedString(this.checkForNull(rowData.id,kony.i18n.getLocalizedString("i18n.Applications.NA")),28,26); //this.checkForNull(rowData.lblFeatureType.text,kony.i18n.getLocalizedString("i18n.Applications.NA"));
    this.view.lblFeatureDetailsRow11Value.toolTip = this.checkForNull(rowData.id,kony.i18n.getLocalizedString("i18n.Applications.NA"));
    this.view.lblFeatureDetailsRow11Value.info = {"id":this.checkForNull(rowData.id,kony.i18n.getLocalizedString("i18n.Applications.NA"))};
//     this.view.lblFeatureDetailsRow12Value.text = this.AdminConsoleCommonUtils.getTruncatedString(this.checkForNull(rowData.lblFeatureCode.info.value,kony.i18n.getLocalizedString("i18n.Applications.NA")),28,26);
//     this.view.lblFeatureDetailsRow12Value.toolTip = this.checkForNull(rowData.lblFeatureCode.info.value,kony.i18n.getLocalizedString("i18n.Applications.NA"));
//     this.view.lblFeatureDetailsRow12Value.info = {"id":this.checkForNull(rowData.lblFeatureCode.info.value,kony.i18n.getLocalizedString("i18n.Applications.NA"))};
//     this.view.lblFeatureDetailsRow13Value.text = this.checkForNull(rowData.Service_fee,"") === "" ? kony.i18n.getLocalizedString("i18n.Applications.NA") : "$ "+rowData.Service_fee;
    this.view.lblFeatureDescValue.text=featureDisplayContent["en-US"].displayDescription;
    //this.displaySelectedLanguageContent();
    document.getElementById("frmEmployeeFeatures_flxViewServiceData").onscroll = this.hideOptionMenuOnScroll;
  },
    
  /* update status value in feature details screen*/
  updateFeatureDetailScreenStatus : function(statusId){
    this.view.lblFeatureDetailsStatusValue.text = (statusId === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ?
      kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive") : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active");
    this.view.lblIconViewKey.skin = (statusId === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE) ? "sknfontIconInactive" : "sknFontIconActivate";
    if(statusId === this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE){
      this.view.flxFeatureDetailsWarning.setVisibility(true);
    }else{
      this.view.flxFeatureDetailsWarning.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
   * function called on status change to active/deactive
   * @param : row data , updated new status id,opt(1-list/2-details)
   */
  changeStatusOfService : function(rowData,updatedStatus){
    var self =this;
    var opt=this.view.flxViewServiceData.isVisible?2:1;//view-2/list-1
    var editStatusReqParam = {
      "featureId": rowData.id,
      "statusId": updatedStatus,
      "serviceFee": self.checkForNull(rowData.Service_fee, "0"),
      "featureDisplay":[],
      "actions":[]
    };
    self.callUpdateStatus(editStatusReqParam,opt);
  },
  /*
   * function to call presentation controller to change status of service
   */
  callUpdateStatus : function(param,opt){
    var self = this;
    self.currSuccessMsg=self.successMsgParam.EDIT;
    self.presenter.updateStatusOfEmpFeature(param,opt);
  },

  sortIconFor: function(column){
    return this.determineSortIcon(this.sortBy,column);
  },

  /*
   * function to reset all the sort images in groups list page
   */
  resetSortImages: function() {
    var self = this;
    self.determineSortFontIcon(self.sortBy, 'name', this.view.fontIconSortFeature);
    self.determineSortFontIcon(self.sortBy, 'id', this.view.fontIconCodeSort);
  },
  validation : function () {
    var returnValue =true;
    return returnValue;
  },
  /*
   *on hover event for  hiding dropdown visibility
   */
  onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widGetId === "flxFeatureStatusFilter") { //for filter dropdown
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.flxFeatureStatusFilter.setVisibility(true);
      }  else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.flxFeatureStatusFilter.setVisibility(false);
      }
    } else if (widGetId === "flxContextualMenu") {
      var selectedIndex = scopeObj.view.segFeatures.selectedrowindex[1];
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.flxContextualMenu.setVisibility(true);
        scopeObj.optionButtonStateChange(selectedIndex, true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.flxContextualMenu.setVisibility(false);
        scopeObj.optionButtonStateChange(selectedIndex, false);
      }
    } else if (widGetId === "flxContextualMenuAction") {
      var selectedIndex = scopeObj.view.segActionList.selectedrowindex[1];
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view.flxContextualMenuAction.setVisibility(true);
        scopeObj.optionButtonStateChangeAction(selectedIndex, true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view.flxContextualMenuAction.setVisibility(false);
        scopeObj.optionButtonStateChangeAction(selectedIndex, false);
      }
    } else {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widget.setVisibility(true);
      }  else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.setVisibility(false);
      }
    }
  },
  
  optionButtonStateChange : function(selectedIndex,condition){
    var scopeObj = this;
    var data = scopeObj.view.segFeatures.data;
    
    if(scopeObj.prevIndex !=-1 && scopeObj.prevIndex < data.length){
      	var tempDataPrev = data[scopeObj.prevIndex];
      	tempDataPrev.flxOptions.skin = "slFbox";
      	scopeObj.view.segFeatures.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    if(tempDataCurrent){
      tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
      scopeObj.view.segFeatures.setDataAt(tempDataCurrent, selectedIndex, 0);
      scopeObj.prevIndex = selectedIndex;
    }
    
  },
  optionButtonStateChangeAction : function(selectedIndex,condition){
    var scopeObj = this;
    var data = scopeObj.view.segActionList.data;
    
    if(scopeObj.prevIndex !=-1 && scopeObj.prevIndex < data.length){
      	var tempDataPrev = data[scopeObj.prevIndex];
      	tempDataPrev.flxOptions.skin = "slFbox";
      	scopeObj.view.segActionList.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    if(tempDataCurrent){
      tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
      scopeObj.view.segActionList.setDataAt(tempDataCurrent, selectedIndex, 0);
      scopeObj.prevIndex = selectedIndex;
    }
    
  },
  /*
   * get string value for backend, based on selected switch value
   */
  getToggleSelectedValueToString : function(index){
    if(index !== null && index === 0){
      return "1";
    } else{
      return "0";
    }
  },

  sortData : function(sortColumn){
    var scopeObj = this;
    var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
    scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
    scopeObj.sortBy.inAscendingOrder = sortOrder;
    scopeObj.getObjectSorter().column(sortColumn);
    var data = scopeObj.view.segFeatures.data.sort(scopeObj.sortBy.sortData);
    scopeObj.view.segFeatures.setData(data.slice(0,10));
     scopeObj.resetSortImages();
    var i = 10;
    if(data.length > 10 ){
      var timer = setInterval(function(){
        scopeObj.view.segFeatures.addAll(data.slice(i,i+10));
        i=i+10;
        if(i>data.length){
          clearInterval(timer);
        }
    }, 100);
    }
  },

  mapActionsList : function(data){
    var self = this;
    var widgetMap = {
      "flxDropdown":"flxDropdown",
      "lblArrow":"lblArrow",
      "lblActionName":"lblActionName",
      "lblActionCode":"lblActionCode",
      "lblAccessLevel":"lblAccessLevel",
      "lblDependencies":"lblDependencies",
//       "lblActionType":"lblActionType",
      "accessLevel": "accessLevel",
      "actionLevel":"actionLevel",
//       "lblActionCategory":"lblActionCategory",
//       "lblActionLimitGroup":"lblActionLimitGroup",
      "flxStatus":"flxStatus",
      "lblActionStatus":"lblActionStatus",
      "fontIconStatusImg":"fontIconStatusImg",
      "lblIconImgOptions":"lblIconImgOptions",
      "flxOptions": "flxOptions",
      "flxActionDesc":"flxActionDesc",
      "flxActionDescription":"flxActionDescription",
      "lblDescriptionValue":"lblDescriptionValue",
      "lblDescriptionHeader":"lblDescriptionHeader",
      "lblSeperator":"lblSeperator",
      "flxEmployeeFeatureActions":"flxEmployeeFeatureActions",
      "termsAndConditions":"termsAndConditions",
      "actionMfa":"actionMfa",
      "limits":"limits",
      "displayContent":"displayContent"
    };
    var actionLevels = [];
    var actionStatus = [];
    var actionCategory = [];
    var segData = data.map(function(rec){
      if(!actionCategory.contains(rec.accesspolicyId)){
        actionCategory.push(rec.accesspolicyId);
      }
      if(!actionStatus.contains(rec.status)){
        actionCategory.push(rec.status);
      }
      return {
        "displayContent":rec.actionDisplayName,
        "actionCode":rec.actionId,
        "lblActionCode": {
	          "text": self.AdminConsoleCommonUtils.getDisplayCode(rec.actionId,16),
          "toolTip": rec.actionId
        },
        "flxDropdown": {
          "onClick": self.toggleActionDescription
        },
        "lblArrow": {
          "text": "\ue922",
          "skin": "sknfontIconDescRightArrow14px"
        },
        "lblActionName": rec.actionName,
        //"lblActionType": actionNameList.substr(2),
        "lblAccessLevel": self.checkForNull(rec.accesspolicyId, kony.i18n.getLocalizedString("i18n.Applications.NA")),
        "accessLevel": self.checkForNull(rec.accesspolicyId, kony.i18n.getLocalizedString("i18n.Applications.NA")),
        "actionLevel": self.checkForNull(rec.actionlevel, kony.i18n.getLocalizedString("i18n.Applications.NA")),
//         "lblActionLimitGroup": self.checkForNull(rec.limitgroup,kony.i18n.getLocalizedString("i18n.Applications.NA")),
//         "lblActionCategory": (rec.Type_id === self.AdminConsoleCommonUtils.constantConfig.MONETARY) ? kony.i18n.getLocalizedString("i18n.frmServiceManagement.Monetary") : kony.i18n.getLocalizedString("i18n.frmServiceManagement.NonMonetary"),
        "actionMfa": rec.isMFAApplicable,     
//         "lblActionTaCLink": (Object.keys(rec.termandcondition).length > 0) ? {
//           "text": kony.i18n.getLocalizedString("i18n.permission.View"),
//           "skin" :"sknLblLatoReg117eb013px",
//           "hoverSkin" :"sknLbl117eb013pxHov",
//           "onClick": self.showTermsConditionsPopup
//         } : {
//           "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
//           "skin" :"sknLatoSemibold485c7313px",
//           "hoverSkin" :"sknLatoSemibold485c7313px",
//           "onClick":""
//         },        
        "fontIconStatusImg": {
          "text": "\ue921",
          "skin": (rec.status=== self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?"sknFontIconActivate":"sknfontIconInactive"
        },
        "lblActionStatus": {
          "text": (rec.status=== self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?kony.i18n.getLocalizedString("i18n.secureimage.Active"): kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")
        },
        "flxOptions": {
          "onClick": function() {
            self.toggleContextualMenuAction(50);
          },
          "skin": "slFbox"
        },
        "lblIconImgOptions": {
          "text": "\ue91f",
          "skin": "sknFontIconOptionMenu"
        },
        "flxActionDescription": {
          "isVisible": false
        },
        "lblDescriptionValue": rec.actionDisplayName["en-US"]?rec.actionDisplayName["en-US"].displayDescription:"N/A",
        "lblDescriptionHeader": kony.i18n.getLocalizedString("i18n.View.DESCRIPTION"),
        "lblSeperator": "-",
        "termsAndConditions":rec.termandcondition,
        "limits":rec.limits,
        "lblDependencies":(Object.keys(rec.dependentActions).length > 0) ? {
          "text": kony.i18n.getLocalizedString("i18n.permission.View"),//.toUpperCase(),
          "skin" :"sknLblLatoReg117eb013px",
          "hoverSkin" :"sknLbl117eb013pxHov",
          "onClick": self.showDependenciesPopup
        } : {
          "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
          "skin" :"sknLatoSemibold485c7313px",
          "hoverSkin" :"sknLatoSemibold485c7313px",
          "onClick":""
        },
        "dependentActions":rec.dependentActions,
        "template": "flxEmployeeFeatureActions"
      };
    });
    self.sortBy = self.getObjectSorter("lblActionName");
    self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.lblIconActionNameSort);
    self.view.segActionList.widgetDataMap = widgetMap;
    self.view.segActionList.setData(segData.sort(self.sortBy.sortData));
    self.view.segActionList.info = {"segData":segData};
    self.setActionsFilterData();
    self.view.forceLayout();
  },
    /*mapping dependency for editFeaturePopup*/
    
  mapDependencies : function(data,featureId){
   var self = this;
    var feature = featureId.toUpperCase();
    self.view.lblDependencyHeader.text="Features (" + data.length + ")";
    var widgetMap = {      
      "lblActionName":"lblActionName",
      "lblActionCode":"lblActionCode",
      "lblFeatureName":"lblFeatureName",      
      "lblSeperatorLine":"lblSeperatorLine",
      "flxDependency":"flxDependency",
    };
    var segData = data.map(function(rec){      
      return {
        "lblFeatureName":self.checkForNull(rec.dependentFeatureName, kony.i18n.getLocalizedString("i18n.Applications.NA")),
        "lblActionCode": {"isVisible":false},
        //            "text": self.checkForNull(self.AdminConsoleCommonUtils.getDisplayCode(rec.id,16), kony.i18n.getLocalizedString("i18n.Applications.NA")),
        //      "toolTip": rec.id},        
        "lblActionName": {"width": "250dp","left": "12%", "text":self.checkForNull(rec.dependentFeatureId, kony.i18n.getLocalizedString("i18n.Applications.NA"))},
                    
        "lblSeperatorLine": "-",        
        "template": "flxDependency"
      };
    });
    self.sortBy = self.getObjectSorter("lblActionName");
    self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.fontIconSortDependencyActionName);
    self.view.segDependencyList.widgetDataMap = widgetMap;
    self.view.segDependencyList.setData(segData.sort(self.sortBy.sortData));
    self.view.segDependencyList.info = {"segData":segData};  
    
//     //dummydata for Dependency - actions
//       var totalFeatures={
//         "features": [{
//           "featureName": "Service Definition",
//           "actionName": "Add Account",
//           "actionCode": "ADD_ACCOUNT",
//           "serviceType":"same"
//         },{
//           "featureName":"View Service Definition",
//           "actionName": "View Account",
//           "actionCode":"VIEW_ACCOUNT",
//           "serviceType":"same"
//         },
//                      {
//                        "featureName": "Reports Feature",
//                        "actionName": "Create Reports",
//                        "actionCode":"VIEW_REPORTS",
//                        "serviceType":"other"
//                      },{"featureName": "Reports Feature",
//                         "actionName": "Delete Report",
//                         "actionCode":"DELETE_REPORT",
//                         "serviceType":"other"}]
//       };
    var countUsers=data.length;
    var widgetDataMap= {      
      "flxEmployeeFeatureDependency":"flxEmployeeFeatureDependency",
      "flxDependencyDetails":"flxDependencyDetails",      
      "fontIconFeatureStatus":"fontIconFeatureStatus",
      "lblFeatureName":"lblFeatureName",  
      "lblActionName":"lblActionName",
      "lbActionCode":"lbActionCode",     
      "lblSeperatorLine":"lblSeperatorLine"
      };
     var segmentData = data.map(function(rec){
        return{
          "template":"flxEmployeeFeatureDependency",       
          "flxEmployeeFeatureDependency":{"isVisible":true},
          "flxDependencyDetails":{"isVisible":true},
          "lblSeperatorLine":{"isVisible":true},
          "lblActionName": {"text":rec.dependentActionName,"skin":"sknLbl485C75LatoRegular13Px"},
          "lblFeatureName":{"text":rec.dependentFeatureName,"skin":"sknLbl485C75LatoRegular13Px"},
          "lbActionCode":{"text": self.AdminConsoleCommonUtils.getDisplayCode(rec.dependentactionId,16),
                          "toolTip": rec.actionId,
                          "skin":"sknLbl485C75LatoRegular13Px"},                                                                   
          //sknFontIconIndicator039DFF  =  otherFeature  sknFontIconIndicator1F844D  ==sameFeature    //||rec.serviceType=== "other" 
       "fontIconFeatureStatus":{"text":"\ue921","skin":feature === rec.dependentFeatureId?"sknFontIconIndicator1F844D":"sknFontIconIndicator039DFF"}               
          }
        });
    
     self.view.lblActionDependencyHeader.text="Actions ("+countUsers+")";
     self.sortBy = self.getObjectSorter("lblActionName");
    self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.fontIconSortDependencyActionName);
    self.view.segActionsDependencyList.widgetDataMap = widgetDataMap;
    self.view.segActionsDependencyList.setData(segmentData);//.sort(self.segmentData.sortData));
    self.view.segActionsDependencyList.info = {"segData":segmentData};
    self.view.forceLayout();
  },
  mapPopupDependencies : function(){
    var self = this;
    var data=[];
    var selInd= self.view.segFeatures.selectedRowIndex[1];
    var selActionInd= self.view.segActionList.selectedRowIndex[1];
    var actionData = self.view.segActionList.data[selActionInd];
    var featureName = self.view.segFeatures.data[selInd].lblFeatureName.text;
    for(var i=0;i<self.view.segActionList.data.length;i++){
      for(var j=0;j<self.view.segActionList.data[i].dependentActions.length;j++){
        if(actionData.actionCode===self.view.segActionList.data[i].dependentActions[j].id)
          data.push({"id":self.view.segActionList.data[i].actionCode,
                     "name":self.view.segActionList.data[i].lblActionName});
      }     
    }
    if(data.length === 0){
      this.view.popUpDeactivate.flxPopUp.top="250px";
      self.view.popUpDeactivate.flxDependencyViewContainer.setVisibility(false);
    }
    else{
      this.view.popUpDeactivate.flxPopUp.top="60px";
    var widgetMap = {      
      "lblActionName":"lblActionName",
      "lblActionCode":"lblActionCode",
      "lblFeatureName":"lblFeatureName",      
      "lblSeperatorLine":"lblSeperatorLine",
      "flxDependency":"flxDependency",
    };
      var segData = data.map(function(rec){      
      return {
        "lblFeatureName":featureName,
        "lblActionCode": {
           "text": self.AdminConsoleCommonUtils.getDisplayCode(rec.id,16), 
           "toolTip": rec.id
        },
        "lblActionName": rec.name,
        "lblSeperatorLine": "-",        
        "template": "flxDependency"
      };
    });
   // self.view.popUpDeactivate.lblDependencyHeader.text="Actions(" + data.length + ")";
    self.sortBy = self.getObjectSorter("lblActionName");
    self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.popUpDeactivate.fontIconSortDependencyActionName);
    self.view.popUpDeactivate.segDependencyList.widgetDataMap = widgetMap;
    self.view.popUpDeactivate.segDependencyList.setData(segData.sort(self.sortBy.sortData));
    self.view.popUpDeactivate.segDependencyList.info = {"segData":segData};    
    }
    self.view.forceLayout();
  },
  /* hide dropdowns in details page on scroll*/
  hideOptionMenuOnScroll : function(){
    if(this.view.flxLanguages.isVisible){
      this.view.flxLanguages.setVisibility(false);
    }
    if(this.view.flxFeatureDetailsContextualMenu.isVisible){
      this.view.flxFeatureDetailsContextualMenu.setVisibility(false);
    }
    if(this.view.flxDetailsActionTypeFilter.isVisible){
      this.view.flxDetailsActionTypeFilter.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /* show/hide description for feature segment*/
  toggleFeatureDescription : function(){
    var selInd = this.view.segFeatures.selectedRowIndex[1];
    var segData = this.view.segFeatures.data;
    for(var i=0;i<segData.length;i++){
      if(i === selInd){
        if(segData[i].flxFeatureDescriptionContent.isVisible === false){
          segData[i].flxFeatureDescriptionContent.isVisible = true;
          segData[i].fonticonArrow.text = "\ue915";//down-arrow
          segData[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
        }else{
          segData[i].flxFeatureDescriptionContent.isVisible = false;
          segData[i].fonticonArrow.text = "\ue922";//right-arrow
          segData[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
        }
        this.view.segFeatures.setDataAt(segData[i], i);
      }else{
        if(segData[i].flxFeatureDescriptionContent.isVisible === true){
          segData[i].flxFeatureDescriptionContent.isVisible = false;
          segData[i].fonticonArrow.text = "\ue922";//right-arrow
          segData[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
          this.view.segFeatures.setDataAt(segData[i], i);
        }
      }
    }
  },
  /* show/hide description for action segment*/
  toggleActionDescription : function(){
    var selInd = this.view.segActionList.selectedRowIndex[1];
    var segData = this.view.segActionList.data;
    for(var i=0;i<segData.length;i++){
      if(i === selInd){
        if(segData[i].flxActionDescription.isVisible === false){
          segData[i].flxActionDescription.isVisible = true;
          segData[i].lblArrow.text = "\ue915";//down-arrow
          segData[i].lblArrow.skin = "sknfontIconDescDownArrow12px";
        }else{
          segData[i].flxActionDescription.isVisible = false;
          segData[i].lblArrow.text = "\ue922";//right-arrow
          segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
        }
        this.view.segActionList.setDataAt(segData[i], i);
      }else{
        if(segData[i].flxActionDescription.isVisible === true){
          segData[i].flxActionDescription.isVisible = false;
          segData[i].lblArrow.text = "\ue922";//right-arrow
          segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
          this.view.segActionList.setDataAt(segData[i], i);
        }
      }
    }
  },
  /* show/hide description for limit segment*/
  toggleLimitDescription : function(){
    var selInd = this.view.segLimitGroup.selectedRowIndex[1];
    var segData = this.view.segLimitGroup.data;
    for(var i=0;i<segData.length;i++){
      if(i === selInd){
        if(segData[i].flxDescription.isVisible === false){
          segData[i].flxDescription.isVisible = true;
          segData[i].lblArrow.text = "\ue915";//down-arrow
          segData[i].lblArrow.skin = "sknfontIconDescDownArrow12px";
        }else{
          segData[i].flxDescription.isVisible = false;
          segData[i].lblArrow.text = "\ue922";//right-arrow
          segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
        }
        this.view.segLimitGroup.setDataAt(segData[i], i);
      }else{
        if(segData[i].flxDescription.isVisible === true){
          segData[i].flxDescription.isVisible = false;
          segData[i].lblArrow.text = "\ue922";//right-arrow
          segData[i].lblArrow.skin = "sknfontIconDescRightArrow14px";
          this.view.segLimitGroup.setDataAt(segData[i], i);
        }
      }
    }
  },
  /*display popup for terms and conditions of action */
  showTermsConditionsPopup: function(){
    var selInd = this.view.segActionList.selectedRowIndex[1];
    var rowData = this.view.segActionList.selectedRowItems[0];
    var termsCond = rowData.termsAndConditions;
    var langList = this.view.languagesListTCPopup.segStatusFilterDropdown.info.lang;
    this.setLanguagesList(langList, false);
    this.view.lblTCPopupHeader.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.viewTandC") + " - "+
                       rowData.lblActionName;
    this.view.featuresLangList.segStatusFilterDropdown.info.langDetail = termsCond;
    this.view.flxViewActionTCPopup.setVisibility(true);
    this.displaySelectedLanguageTC(this.view.segActionList.data[selInd].termsAndConditions);
    this.view.forceLayout();
  },
    /*display popup for terms and conditions of action */
    showDependenciesPopup: function(){
      var selRowData = this.view.segActionList.selectedRowItems;
      var featureId=this.view.lblFeatureDetailsRow11Value.text;
      this.mapActionDependencies(selRowData[0].dependentActions,featureId);
    },
    mapActionDependencies : function(data,feature){
      var self = this;
    self.view.lblDependencyHeader.text="Features (" + data.length + ")";
//     var widgetMap = {      
//       "lblActionName":"lblActionName",
//       "lblActionCode":"lblActionCode",
//       "lblFeatureName":"lblFeatureName",      
//       "lblSeperatorLine":"lblSeperatorLine",
//       "flxDependency":"flxDependency",
//     };
//     var segData = data.map(function(rec){      
//       return {
//         "lblFeatureName":self.checkForNull(rec.dependentFeatureName, kony.i18n.getLocalizedString("i18n.Applications.NA")),
//         "lblActionCode": {"isVisible":false},
//         //            "text": self.checkForNull(self.AdminConsoleCommonUtils.getDisplayCode(rec.id,16), kony.i18n.getLocalizedString("i18n.Applications.NA")),
//         //      "toolTip": rec.id},        
//         "lblActionName": {"width": "250dp","left": "12%", "text":self.checkForNull(rec.dependentFeatureId, kony.i18n.getLocalizedString("i18n.Applications.NA"))},
                    
//         "lblSeperatorLine": "-",        
//         "template": "flxDependency"
//       };
//     });
//     self.sortBy = self.getObjectSorter("lblActionName");
//     self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.fontIconSortDependencyActionName);
//     self.view.segDependencyList.widgetDataMap = widgetMap;
//     self.view.segDependencyList.setData(segData.sort(self.sortBy.sortData));
//     self.view.segDependencyList.info = {"segData":segData};  
    
//     //dummydata for Dependency - actions
//       var totalFeatures={
//         "features": [{
//           "featureName": "Service Definition",
//           "actionName": "Add Account",
//           "actionCode": "ADD_ACCOUNT",
//           "serviceType":"same"
//         },{
//           "featureName":"View Service Definition",
//           "actionName": "View Account",
//           "actionCode":"VIEW_ACCOUNT",
//           "serviceType":"same"
//         },
//                      {
//                        "featureName": "Reports Feature",
//                        "actionName": "Create Reports",
//                        "actionCode":"VIEW_REPORTS",
//                        "serviceType":"other"
//                      },{"featureName": "Reports Feature",
//                         "actionName": "Delete Report",
//                         "actionCode":"DELETE_REPORT",
//                         "serviceType":"other"}]
//       };
    var countUsers=data.length;
    var widgetDataMap= {      
      "flxEmployeeFeatureDependency":"flxEmployeeFeatureDependency",
      "flxDependencyDetails":"flxDependencyDetails",      
      "fontIconFeatureStatus":"fontIconFeatureStatus",
      "lblFeatureName":"lblFeatureName",  
      "lblActionName":"lblActionName",
      "lbActionCode":"lbActionCode",     
      "lblSeperatorLine":"lblSeperatorLine"
      };
     var segmentData = data.map(function(rec){
        return{
          "template":"flxEmployeeFeatureDependency",       
          "flxEmployeeFeatureDependency":{"isVisible":true},
          "flxDependencyDetails":{"isVisible":true},
          "lblSeperatorLine":{"isVisible":true},
          "lblActionName": {"text":rec.dependentActionName,"skin":"sknLbl485C75LatoRegular13Px"},
          "lblFeatureName":{"text":rec.dependentFeatureName,"skin":"sknLbl485C75LatoRegular13Px"},
          "lbActionCode":{"text": self.AdminConsoleCommonUtils.getDisplayCode(rec.dependentactionId,16),
                          "toolTip": rec.actionId,
                          "skin":"sknLbl485C75LatoRegular13Px"},                                                                   
          //sknFontIconIndicator039DFF  =  otherFeature  sknFontIconIndicator1F844D  ==sameFeature    //||rec.serviceType=== "other" 
       "fontIconFeatureStatus": {"text":"\ue921","skin":feature === rec.dependentFeatureId?"sknFontIconIndicator1F844D":"sknFontIconIndicator039DFF"}           
          }
        });
    
     self.view.lblActionDependencyHeader.text="Actions ("+countUsers+")";
     self.sortBy = self.getObjectSorter("lblActionName");
    self.determineSortFontIcon(self.sortBy, 'lblActionName', self.view.fontIconSortDependencyActionName);
    self.view.segActionsDependencyList.widgetDataMap = widgetDataMap;
    self.view.segActionsDependencyList.setData(segmentData);//.sort(self.segmentData.sortData));
    self.view.segActionsDependencyList.info = {"segData":segmentData};
    this.view.flxDependencyPopup.setVisibility(true);
    self.view.forceLayout();
    },
  /*display popup for edit of limit group */
  showEditLimitGroupPopup: function(){
    var selInd = this.view.segLimitGroup.selectedRowIndex[1];
    var rowData = this.view.segLimitGroup.selectedRowItems[0];
    var langList = this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.info.lang;
    this.view.lblLimitGroupDetailsValue.text=rowData.lblLimitGroupCode;
    this.view.lblEditLimitGroupHeader.text = "Edit Limit Group";
    this.editLimitGroupReqParam = {
      "id": this.view.lblLimitGroupDetailsValue.text,
      "limitGroupDisplay":[] ,
    }
    this.setLanguagesList(langList, false);
    this.displaySelectedLangLimitGroupEditMode();
    this.setSegLangDataLimitGroup(rowData);
    this.view.flxLimitGroupPopup.setVisibility(true);
    this.view.flxDisplayContentLimitGroup.setVisibility(true);
    this.view.flxViewDisplayContentLimitGroup.setVisibility(false);
    this.view.flxLimitGroupEditButtons.setVisibility(true);
    this.view.flxLimitGroupHeading.height = "22dp";
	this.view.displayContentLimitGroupEdit.txtareaEditDescription.skin="skntxtAreaLato35475f14Px";
    this.view.displayContentLimitGroupEdit.tbxEditName.skin="skntbxLato35475f14px";
    this.view.displayContentLimitGroupEdit.flxNoEditNameError.setVisibility(false);
    this.view.displayContentLimitGroupEdit.flxNoEditDescriptionError.setVisibility(false);
    this.view.btnEditLimitGroup.setVisibility(false);
    this.view.forceLayout();
  },
  /*display popup for view of limit group */
  showViewLimitGroupPopup: function(){
    var selInd = this.view.segLimitGroup.selectedRowIndex[1];
    var rowData = this.view.segLimitGroup.selectedRowItems[0];
    var langList = this.view.displayContentView.EditLangList.segStatusFilterDropdown.info.lang;
    this.view.lblLimitGroupDetailsValue.text=rowData.lblLimitGroupCode;
    this.view.lblEditLimitGroupHeader.text = "View Limit Group";
    this.view.displayContentView.flxLanguages.setVisibility(false);
    this.view.displayContentLimitGroupEdit.flxLanguagesEdit.setVisibility(false);
    this.setLanguagesList(langList, false);
    this.displaySelectedLangLimitGroup(this.view.segLimitGroup.data[selInd].displayContent);
    this.view.flxLimitGroupPopup.setVisibility(true);
    this.view.flxLimitGroupHeading.height = "40dp";
    this.view.flxDisplayContentLimitGroup.setVisibility(false);
    this.view.flxViewDisplayContentLimitGroup.setVisibility(true);
    this.view.flxLimitGroupEditButtons.setVisibility(false);
    this.view.btnEditLimitGroup.setVisibility(true);
    this.view.forceLayout();
  },
  /*display popup for view/edit limits of an action*/
  showLimitsPopup : function(){
    var rowData = this.view.segActionList.selectedRowItems[0];
    
    this.view.lblMinValue11.text = kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.lblMaxValue12.text =  kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.lblMaxDailyLimitValue21.text =  kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.lblWeeklyLimitValue22.text =  kony.i18n.getLocalizedString("i18n.Applications.NA");
    var mapping = {"MIN_TRANSACTION_LIMIT": this.view.lblMinValue11,
                   "MAX_TRANSACTION_LIMIT": this.view.lblMaxValue12,
                   "DAILY_LIMIT": this.view.lblMaxDailyLimitValue21,
                   "WEEKLY_LIMIT": this.view.lblWeeklyLimitValue22
                  };
    if(rowData.limits && rowData.limits.length > 0){
      var limits = rowData.limits;
      for(var i=0;i< limits.length;i++){
        var lblWidget = mapping[limits[i].type];
        lblWidget.text = "$ "+ limits[i].value;
      }
    }
    this.view.flxViewEditLimitsPopup.setVisibility(true);
    this.view.lblLimitsPopupHeading.text = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ViewLimits");

    this.view.forceLayout();
  },
  /* clear textbox values and errors for edit limit screen*/
  clearValuesLimitsPopup : function(){
    this.view.flxMinValueLimitError11.setVisibility(false);
    this.view.flxMaxValueLimitError12.setVisibility(false);
    this.view.flxMaxDailyLimitError21.setVisibility(false);
    this.view.flxWeeklyLimitValueError22.setVisibility(false);
    
    this.view.valueEntryMinValueLimit11.tbxEnterValue.text = "";
    this.view.valueEntryMaxValueLimit12.tbxEnterValue.text = "";
    this.view.valueEntryMaxDailyValue21.tbxEnterValue.text = "";
    this.view.valueEntryWeeklyLimitValue22.tbxEnterValue.text = "";
    
    this.view.valueEntryMinValueLimit11.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.valueEntryMaxValueLimit12.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.valueEntryMaxDailyValue21.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.valueEntryWeeklyLimitValue22.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
    this.view.forceLayout();
    
  },
  /* set lanuages to dropdown
   *@param: list of all languages
  */
  setLanguagesList : function(langList, isInitial){
    var widMap = {"flxSearchDropDown":"flxSearchDropDown",
                  "flxCheckBox":"flxCheckBox",
                  "lblDescription":"lblDescription",
                  "langCode":"langCode"};
    var currLocale = (kony.i18n.getCurrentLocale()).replace("_","-");
    var segData = [],removedRec = [],allLang = [];
    //initial load-sets data from backend
    if(langList && isInitial){
      segData = langList.map(function(rec){
        return {
          "flxCheckBox": {"isVisible" :false},
          "lblDescription":rec.Language,
          "langCode":rec.Code,
          "template":"flxSearchDropDown",
        };
      });
    }else if(isInitial === false){ //resets data to default lang
      segData = langList;
    }
    for(var i=0;i<segData.length;i++){
      if(segData[i].langCode === currLocale){
        this.view.lblFeatureDetailsSelectedLang.text = segData[i].lblDescription;
        this.view.lblFeatureDetailsSelectedLang.info = {"selLang":segData[i]};
        
        this.view.lblSelectedLangTCPopup.text = segData[i].lblDescription;
        this.view.lblSelectedLangTCPopup.info = {"selLang":segData[i]};
        
        this.view.lblSelectedLanguage.text = segData[i].lblDescription;
        this.view.lblSelectedLanguage.info = {"selLang":segData[i]};
        
        this.view.lblActionDetailsSelectedLang.text = segData[i].lblDescription;
        this.view.lblActionDetailsSelectedLang.info = {"selLang":segData[i]};
        
        this.view.displayContentEdit.lblSelectedLanguage.text = segData[i].lblDescription;
        this.view.displayContentEdit.lblSelectedLanguage.info = {"selLang":segData[i]};
        
        this.view.displayContentLimitGroupEdit.lblSelectedLanguage.text = segData[i].lblDescription;
        this.view.displayContentLimitGroupEdit.lblSelectedLanguage.info = {"selLang":segData[i]};
        
        this.view.displayContentView.lblDetailsSelectedLang.text = segData[i].lblDescription;
        this.view.displayContentView.lblDetailsSelectedLang.info = {"selLang":segData[i]};
        
        removedRec = segData.splice(i,1);
        break;
      }
    }
    allLang = segData.concat(removedRec);
    this.sortBy = this.getObjectSorter("lblDescription");
    this.sortBy.inAscendingOrder = true;
    segData.sort(this.sortBy.sortData);
    //set languages to features details languages segment
    this.view.featuresLangList.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.featuresLangList.segStatusFilterDropdown.setData(segData);
    this.view.featuresLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
    //set languages to termsCondition popup languages segment
    this.view.languagesListTCPopup.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.languagesListTCPopup.segStatusFilterDropdown.setData(segData);
    this.view.languagesListTCPopup.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
    //set languages to edit features popup languages segment
    this.view.EditFeatureLangList.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.EditFeatureLangList.segStatusFilterDropdown.setData(segData);
    this.view.EditFeatureLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
    //set languages to edit action details languages segment
    this.view.actionLangList.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.actionLangList.segStatusFilterDropdown.setData(segData);
    this.view.actionLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};
    //set languages to edit limit group details languages segment
    this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.setData(segData);
    this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};    
    //set languages to view limit group details languages segment
    this.view.displayContentView.EditLangList.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.displayContentView.EditLangList.segStatusFilterDropdown.setData(segData);
    this.view.displayContentView.EditLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};    
    //set languages to edit action details languages segment
    this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.widgetDataMap = widMap;
    this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.setData(segData);
    this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.info = {"lang":allLang.sort(this.sortBy.sortData),"langDetail":{}};    
    
    this.view.forceLayout();

  },
  /* set selected language from the dropdown and update list on row click 
  * @param: langListSegment,selectedLanguageLabel
  */
  updateLanguagesDropdown : function(langListSegment,selectedLanguageLabel){
    var selInd = langListSegment.selectedRowIndex[1];
    var segData = langListSegment.data;
    var prevAssgnLang = [selectedLanguageLabel.info.selLang];
    selectedLanguageLabel.text = segData[selInd].lblDescription;
    selectedLanguageLabel.info.selLang = segData[selInd];
    langListSegment.removeAt(selInd);
    //set segment with updated data
    var updatedData = prevAssgnLang.concat(langListSegment.data);
    this.sortBy.columnName = "lblDescription";
    this.sortBy.inAscendingOrder = true;
    updatedData.sort(this.sortBy.sortData)
    langListSegment.setData(updatedData);
    this.view.forceLayout();
  },
  /* display selected language terms and conditions */
  displaySelectedLanguageTC: function(termsCond){
    var selLanguageCode = this.view.lblSelectedLangTCPopup.info.selLang.langCode;
    var selLang = this.view.lblSelectedLangTCPopup.info.selLang.lblDescription;
    var selLangTC = termsCond[selLanguageCode];
    if(selLangTC){
      this.view.rtxContentViewer.setVisibility(true);
      this.view.flxNoTermsConditionsAvailable.setVisibility(false);
      document.getElementById("iframe_rtxContentViewer").contentWindow.document.getElementById("viewer").innerHTML =selLangTC.content;
    }else{
      this.view.flxNoTermsConditionsAvailable.setVisibility(true);
      this.view.rtxContentViewer.setVisibility(false);
      this.view.lblNoTCAvailable.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.NoContentAdded") + " "+ selLang;
    }
    this.view.forceLayout();
    
  },
  /* show display name and display desc for selected language */
  displaySelectedLanguageContent: function(){
    var selInd = this.view.segFeatures.selectedRowIndex[1];
    var displayContent = this.view.segFeatures.data[selInd].displayContent;
    var selLanguageCode = this.view.lblFeatureDetailsSelectedLang.info.selLang.langCode;
    var selLang = this.view.lblFeatureDetailsSelectedLang.info.selLang.lblDescription;
    var selLangDiplayContent = displayContent[selLanguageCode];
    if(selLangDiplayContent){
      this.view.flxServiceDescriptionContent.setVisibility(true);
      this.view.flxFeatureDetailsNoDisplayContent.setVisibility(false);
      this.view.lblFeatureDisplayNameValue.text = selLangDiplayContent.displayName;
      this.view.lblFeatureDisplayDescValue.text = selLangDiplayContent.displayDescription;
    }else{
      this.view.flxFeatureDetailsNoDisplayContent.setVisibility(true);
      this.view.flxServiceDescriptionContent.setVisibility(false);
      this.view.lblFeatureDetailsNoDisplayContent.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.NoDisplayContentAvailableFor") + " "+ selLang+ ".";
    }
    this.view.forceLayout();
    
  },
  /* show display name and display desc for selected language action*/
  displaySelectedLanguageContentAction: function(){
    var selInd = this.view.segActionList.selectedRowIndex[1];
    var displayContent = this.view.segActionList.data[selInd].displayContent;
    var selLanguageCode = this.view.lblActionDetailsSelectedLang.info.selLang.langCode;
    var selLang = this.view.lblActionDetailsSelectedLang.info.selLang.lblDescription;
    var selLangDiplayContent = displayContent[selLanguageCode];
    if(selLangDiplayContent){
      this.view.flxActionDescriptionContent.setVisibility(true);
      this.view.flxActionDetailsNoDisplayContent.setVisibility(false);
      this.view.lblActionDisplayNameValue.text = selLangDiplayContent.displayName;
      this.view.lblActionDisplayDescValue.text = selLangDiplayContent.displayDescription;
    }else{
      this.view.flxActionDetailsNoDisplayContent.setVisibility(true);
      this.view.flxActionDescriptionContent.setVisibility(false);
      this.view.lblActionDetailsNoDisplayContent.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.NoDisplayContentAvailableFor") + " "+ selLang+ ".";
    }
    this.view.forceLayout();
    
  },
  /* show display name and display desc for selected language limit group*/
  displaySelectedLangLimitGroup: function(){
    var selInd = this.view.segLimitGroup.selectedRowIndex[1];
    var displayContent = this.view.segLimitGroup.data[selInd].displayContent;
    var selLanguageCode = this.view.displayContentView.lblDetailsSelectedLang.info.selLang.langCode;
    var selLang = this.view.displayContentView.lblDetailsSelectedLang.info.selLang.lblDescription;
    var selLangDiplayContent = displayContent[selLanguageCode];
    if(selLangDiplayContent){
      this.view.displayContentView.flxDescriptionContent.setVisibility(true);
      this.view.displayContentView.flxDetailsNoDisplayContent.setVisibility(false);
      this.view.displayContentView.lblDisplayNameValue.text = selLangDiplayContent.displayName;
      this.view.displayContentView.lblDisplayDescValue.text = selLangDiplayContent.displayDescription;
    }else{
      this.view.displayContentView.flxDetailsNoDisplayContent.setVisibility(true);
      this.view.displayContentView.flxDescriptionContent.setVisibility(false);
      this.view.displayContentView.lblDetailsNoDisplayContent.text =kony.i18n.getLocalizedString("i18n.frmServiceManagement.NoDisplayContentAvailableFor") + " "+ selLang+ ".";
    }
    this.view.forceLayout();
    
  },  
    /*display popup for terms and conditions of action */
    showDependencyPopup(){
      this.view.flxDependencyPopup.setVisibility(true);
      this.view.forceLayout();
    },
    
  /* set data to action-type filter in feture details
  * @param: actionType_id's array
  */
  setActionsFilterData : function(){
    var self = this;
    var statusList=[],accessLevelList=[],maxStatusText = "",maxAccessLeveltext = "";
    for(var i=0;i<self.actionsRecList.length;i++){
      if(!statusList.contains(self.actionsRecList[i].status))
        statusList.push(self.actionsRecList[i].status);
      if(!accessLevelList.contains(self.actionsRecList[i].accesspolicyId))
        accessLevelList.push(self.actionsRecList[i].accesspolicyId);	
    }
    var widgetMap = {
      "Status_id": "Status_id",
      "Type_id": "Type_id",
      "Category": "Category",
      "LimitGroup": "LimitGroup",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){
      var mapJson = {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": (rec === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)? kony.i18n.getLocalizedString("i18n.secureimage.Active"):(rec === self.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE)?kony.i18n.getLocalizedString("i18n.secureimage.Inactive"):kony.i18n.getLocalizedString("i18n.common.Unavailable")
      };
      maxStatusText = mapJson['lblDescription'].length > maxStatusText.length ? mapJson['lblDescription'] : maxStatusText; 
      return mapJson;
    });
    var accessLevelData = accessLevelList.map(function (rec) {    
      maxAccessLeveltext = rec.length > maxAccessLeveltext.length ? rec : maxAccessLeveltext; 
      return {
        "LimitGroup": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    self.view.actionStatusDetailsFilter.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.actionTypeDetailsFilter.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.actionTypeDetailsFilter.segStatusFilterDropdown.setData(accessLevelData);
    self.view.actionStatusDetailsFilter.segStatusFilterDropdown.setData(statusData);

    var selStatusInd = [],selTypeInd = [],selCategoryInd = [],selAccessLevelInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    for(var k=0;k<accessLevelList.length;k++){
      selAccessLevelInd.push(k);
    }
    self.view.actionStatusDetailsFilter.segStatusFilterDropdown.selectedRowIndices = [[0,selStatusInd]];
    self.view.actionTypeDetailsFilter.segStatusFilterDropdown.selectedRowIndices = [[0,selAccessLevelInd]];
    //set filter width
    self.view.flxDetailsActionStatusFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxStatusText)+55+"px";
    self.view.flxDetailsActionTypeFilter.width = self.AdminConsoleCommonUtils.getLabelWidth(maxAccessLeveltext)+55+"px";
    self.view.forceLayout();
  },
  /* filter action's list based on action type*/
  performFilterOnActionTypes : function(){
    var self =this;
    self.view.flxDetailsActionTypeFilter.setVisibility(false);
    var selIndices = self.view.actionTypeDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
    var actionsData = self.view.segActionList.info.segData;
    var selTypes = [],filteredRec = [];
    if(selIndices){
      var ind = selIndices[0][1];
      for(var i=0;i<ind.length;i++){
        selTypes.push(self.view.actionTypeDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
      }
      if(selTypes.length >0){
        filteredRec = actionsData.filter(function(rec){
          if(selTypes.indexOf(rec.lblAccessLevel) >= 0){
            return rec;
          }
        });
      }
    }
    if(filteredRec.length > 0){
      self.view.segActionList.setData(filteredRec);
      self.view.segActionList.setVisibility(true);
      self.view.lblActionsListNoResultsFound.setVisibility(false);
    }else{
      self.view.segActionList.setData([]);
      self.view.segActionList.setVisibility(false);
      self.view.lblActionsListNoResultsFound.setVisibility(true);
    }
    self.view.forceLayout();
  },
  /* filter action's list based on action type*/
  performFilterOnActionCategory : function(){
    var self =this;
    self.view.flxDetailsActionCategoryFilter.setVisibility(false);
    var selIndices = self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
    var actionsData = self.view.segActionList.info.segData;
    var selTypes = [],filteredRec = [];
    if(selIndices){
      var ind = selIndices[0][1];
      for(var i=0;i<ind.length;i++){
        selTypes.push(self.view.actionCategoryDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
      }
      if(selTypes.length >0){
        filteredRec = actionsData.filter(function(rec){
          if(selTypes.indexOf(rec.lblActionCategory) >= 0){
            return rec;
          }
        });
      }
    }
    if(filteredRec.length > 0){
      self.view.segActionList.setData(filteredRec);
      self.view.segActionList.setVisibility(true);
      self.view.lblActionsListNoResultsFound.setVisibility(false);
    }else{
      self.view.segActionList.setData([]);
      self.view.segActionList.setVisibility(false);
      self.view.lblActionsListNoResultsFound.setVisibility(true);
    }
    self.view.forceLayout();
  },
  /* filter action's list based on action type*/
  performFilterOnActionStatus : function(){
    var self =this;
    self.view.flxDetailsActionStatusFilter.setVisibility(false);
    var selIndices = self.view.actionStatusDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
    var actionsData = self.view.segActionList.info.segData;
    var selTypes = [],filteredRec = [];
    if(selIndices){
      var ind = selIndices[0][1];
      for(var i=0;i<ind.length;i++){
        selTypes.push(self.view.actionStatusDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
      }
      if(selTypes.length >0){
        filteredRec = actionsData.filter(function(rec){
          if(selTypes.indexOf(rec.lblActionStatus.text) >= 0){
            return rec;
          }
        });
      }
    }
    if(filteredRec.length > 0){
      self.view.segActionList.setData(filteredRec);
      self.view.segActionList.setVisibility(true);
      self.view.lblActionsListNoResultsFound.setVisibility(false);
    }else{
      self.view.segActionList.setData([]);
      self.view.segActionList.setVisibility(false);
      self.view.lblActionsListNoResultsFound.setVisibility(true);
    }
    self.view.forceLayout();
  },
  /* filter action's list based on action type*/
  performFilterOnActionLimitGroup : function(){
    var self =this;
    self.view.flxDetailsActionLimitGroupFilter.setVisibility(false);
    var selIndices = self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.selectedRowIndices;
    var actionsData = self.view.segActionList.info.segData;
    var selTypes = [],filteredRec = [];
    if(selIndices){
      var ind = selIndices[0][1];
      for(var i=0;i<ind.length;i++){
        selTypes.push(self.view.actionLimitGroupDetailsFilter.segStatusFilterDropdown.data[ind[i]].lblDescription);
      }
      if(selTypes.length >0){
        filteredRec = actionsData.filter(function(rec){
          if(selTypes.indexOf(rec.lblActionLimitGroup) >= 0){
            return rec;
          }
        });
      }
    }
    if(filteredRec.length > 0){
      self.view.segActionList.setData(filteredRec);
      self.view.segActionList.setVisibility(true);
      self.view.lblActionsListNoResultsFound.setVisibility(false);
    }else{
      self.view.segActionList.setData([]);
      self.view.segActionList.setVisibility(false);
      self.view.lblActionsListNoResultsFound.setVisibility(true);
    }
    self.view.forceLayout();
  },
    
    setActionDetailsData : function(){
     var self = this;
     var segData=[];     
      var data =this.actionsRecList;
     var widgetMap = {
      "flxRow":"flxRow",
      "flxContentContainer":"flxContentContainer",
      "btnOption1":"btnOption1",
      "flxImgArrow":"flxImgArrow",
      "lblSelected1":"lblSelected1",
      "lblSeperator":"lblSeperator",
    };
        for(var a=0;a<data.length;a++){  
       segData.push({
     // "actionId":data[i].actionName,
          "btnOption1":{
            "text":data[a].actionName.toUpperCase(),
           "onClick":self.validateLimits,
            "skin":"sknBtn737678LatoReg12pxNoBgBorder"
          },
          "flxImgArrow": {
            "isVisible": false,
          },
       "lblSelected1":{"text":""},     
        "lblActionName":data[a].actionName,
         "description": data[a].description,
          "actionId":data[a].actionId,
          //"actionType":actionNameList.substr(2),
        //  "actionLevel":self.checkForNull(data[i].actionlevel, kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase(),
         "accessLevel":self.checkForNull(data[a].accesspolicyId, kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase(),  
          //"limitGroup":self.checkForNull(data[i].limitgroup, kony.i18n.getLocalizedString("i18n.Applications.NA")),  
      //    "limits":data[i].limits,
    //      "displayContent":data[i].actionDisplayName,
      "displayDescriptionEnUS":data[a].actionDisplayName["en-US"].displayDescription, //en-us
        "dependentActions":data[a].dependentActions,
         "status":data[a].status,
          "lblSeperator": {
           "text": "."
          },
         "lblDependencies":(Object.keys(data[a].dependentActions).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showDependencyPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },
         "template": "flxRow"
        });
    }
     
    self.sortBy = self.getObjectSorter("btnOption1.text");
    self.view.segFeaturedActions.widgetDataMap = widgetMap;
     var selectInitialRow =true;
            if (segData.length !== 0) {
                segData.sort(self.sortBy.sortData);
                segData[0].flxImgArrow.isVisible = true;
                segData[0].btnOption1.skin = "sknBtnLatoBold485c7512PxNoBorder";
              if (selectInitialRow===true) {
                  self.currSelectedIndex = 0;
                  self.setAssociatedActionData(segData[0]);
                }
            }
            self.view.segFeaturedActions.setData(segData);
            self.view.segFeaturedActions.info = {
                "segData": segData
            };
    this.view.forceLayout();
  }, 
    
    toggleSelectedRow : function(){
       var segData=this.view.segFeaturedActions.data;
       var data =  this.actionsRecList;
       var selectedRowIndex=this.view.segFeaturedActions.selectedRowIndex[1];
       this.currSelectedIndex=selectedRowIndex;
          for(var x = 0; x < segData.length; x++){
              if(x===selectedRowIndex){
               segData[x].btnOption1.skin="sknBtnLatoBold485c7512PxNoBorder";
               segData[x].flxImgArrow.isVisible=true;
           this.view.segFeaturedActions.setDataAt(segData[x], x);
      }
      else{
            if (segData[x].flxImgArrow.isVisible === true) {
              segData[x].btnOption1.skin="sknBtn737678LatoReg12pxNoBgBorder";
              segData[x].flxImgArrow.isVisible=false;
          this.view.segFeaturedActions.setDataAt(segData[x], x);
         }
       }
     }
    this.setAssociatedActionData(segData[selectedRowIndex]);
    this.displaySelectedLangActionEditMode(segData[selectedRowIndex].displayContent);
    this.view.forceLayout();
  },
 
    setAssociatedActionData:function(dataToSet){      
      this.view.lblViewActionCodeValue.text = this.AdminConsoleCommonUtils.getDisplayCode(dataToSet.actionId,26),
      this.view.lblViewActionCodeValue.toolTip = this.AdminConsoleCommonUtils.getTruncatedString(this.checkForNull(dataToSet.actionId, kony.i18n.getLocalizedString("i18n.Applications.NA")));
      this.view.lblViewAccessLevelValue.text=dataToSet.accessLevel;
      this.view.actionStatusSwitch.switchToggle.selectedIndex=(dataToSet.status === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?0:1;
      this.view.lblViewDependencyValue.hoverSkin ="sknLbl117eb013pxHov",
      this.view.txtareaAssociatedActionDescription.text = dataToSet.displayDescriptionEnUS;
      this.view.lblViewDependencyValue.text=dataToSet.lblDependencies.text;
      this.view.lblViewDependencyValue.skin=dataToSet.lblDependencies.skin;
      this.view.lblViewDependencyValue.hoverSkin=dataToSet.lblDependencies.hoverSkin;
      this.view.lblViewDependencyValue.onClick=dataToSet.lblDependencies.onClick;
      this.view.forceLayout();
    },
    
  setFeaturedActionsData : function(data,selectInitialRow){
    var self = this;
    var segData=[];
     
			 var rowData =  this.actionsRecList;
    var widgetMap = {
      "flxRow":"flxRow",
      "flxContentContainer":"flxContentContainer",
      "btnOption1":"btnOption1",
      "flxImgArrow":"flxImgArrow",
      "lblSelected1":"lblSelected1",
      "lblSeperator":"lblSeperator",
    };
    for(var i=0;i<data.length;i++){
        var actionType = data[i].roleTypes;
        var actionNameList = [],
            actionIdList = [];
        actionNameList = actionType.reduce(function(list, record) {
          var name = ", " + record.name;
          return list + name;
        }, "");
        actionIdList = actionType.reduce(function(list, record) {
          return list.concat([record.id]);
        }, []);
        segData.push({
          "actionId":data[i].actionId,
          "btnOption1":{
            "text":data[i].actionName.toUpperCase(),"onClick":self.validateLimits,"skin":"sknBtn737678LatoReg12pxNoBgBorder"
          },
          "flxImgArrow": {
            "isVisible": false,
          },
          "lblSelected1":{"text":""},
          "type_id": data[i].Type_id,
          "description": data[i].description,
          "isEdited": false,
          "isContentEdited": false,
          "isStatusEdited": false,
          "actionCategory": (data[i].Type_id === self.AdminConsoleCommonUtils.constantConfig.MONETARY) ? kony.i18n.getLocalizedString("i18n.frmServiceManagement.Monetary") : kony.i18n.getLocalizedString("i18n.frmServiceManagement.NonMonetary"),
          "lblActionMfa": (data[i].isMFAApplicable === true) ? "Yes" : "No",
          "lblTNC":(Object.keys(data[i].termandcondition).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showTermsConditionsPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },
          "termsAndConditions":data[i].termandcondition,
          "lblActionName":data[i].actionName,
          "actionType":actionNameList.substr(2),
          "actionLevel":self.checkForNull(data[i].actionlevel, kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase(),
          "accessLevel":self.checkForNull(data[i].accesspolicy, kony.i18n.getLocalizedString("i18n.Applications.NA")).toUpperCase(),  
          "limitGroup":self.checkForNull(data[i].limitgroup, kony.i18n.getLocalizedString("i18n.Applications.NA")),  
          "limits":data[i].limits,
          "displayContent":data[i].actionDisplayName,
          "lblDependencies":(Object.keys(data[i].dependentActions).length > 0) ? {
            "text": kony.i18n.getLocalizedString("i18n.permission.View"),
            "skin" :"sknLblLatoReg117eb013px",
            "hoverSkin" :"sknLbl117eb013pxHov",
            "onClick": self.showDependenciesPopup
          } : {
            "text": kony.i18n.getLocalizedString("i18n.Applications.NA"),
            "skin" :"sknLatoSemibold485c7313px",
            "hoverSkin" :"sknLatoSemibold485c7313px",
            "onClick":""
          },
          "dependentActions":data[i].dependentActions,
          "status":data[i].status,
          "lblSeperator": {
            "text": "."
          },
          "template": "flxRow"
        });
    }
    self.sortBy = self.getObjectSorter("btnOption1.text");
    //self.view.segFeaturedActions.widgetDataMap = widgetMap;
    if(segData.length!==0){
      segData.sort(self.sortBy.sortData);
      segData[0].flxImgArrow.isVisible=true;
      segData[0].btnOption1.skin="sknBtnLatoBold485c7512PxNoBorder";
      if(selectInitialRow){
        self.currSelectedIndex=0;
        self.setActionDetailsData(segData[0]);
      }
    }
   // self.view.segFeaturedActions.setData(segData);
   // self.view.segFeaturedActions.info = {"segData":segData};
    self.view.forceLayout();
  },
 
    
   // var langList = this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.info.lang;
    //this.view.lblViewActionCodeValue.text=dataToSet.actionId;
   // this.view.lblViewActionCodeValue.info=dataToSet.actionId;
    //this.view.lblActionTypeValue.text=dataToSet.actionType;
   // this.view.lblViewActionCategoryValue.text=dataToSet.actionCategory;
   // this.view.lblViewActionLevelValue.text=dataToSet.actionLevel;
   // this.view.lblViewAccessLevelValue.text=dataToSet.accessLevel;
   // this.view.lblViewLimitGroupValue.text=dataToSet.limitGroup;
  //  this.view.lblMFAValue.text=dataToSet.lblActionMfa;
   // this.view.lblTAndCView.info=dataToSet.termsAndConditions;  
  //  this.view.lblTAndCView.text=dataToSet.lblTNC.text;
    //this.view.lblTAndCView.skin=dataToSet.lblTNC.skin;
   // this.view.lblTAndCView.hoverSkin=dataToSet.lblTNC.hoverSkin;
   // this.view.lblTAndCView.onClick=dataToSet.lblTNC.onClick;  
   //this.view.lblViewDependencyValue.text=dataToSet.lblDependencies.text;
   // this.view.lblViewDependencyValue.skin=dataToSet.lblDependencies.skin;
   // this.view.lblViewDependencyValue.hoverSkin=dataToSet.lblDependencies.hoverSkin;
   // this.view.lblViewDependencyValue.onClick=dataToSet.lblDependencies.onClick;
   // this.setLanguagesList(langList, false);
    //this.setSegLangDataAction(dataToSet);
    //this.view.lblActionActiveText.text=(dataToSet.status === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active"):kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Inactive");
    //this.view.actionStatusSwitch.switchToggle.selectedIndex=(dataToSet.status === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE)?0:1;
  //  if(dataToSet.type_id === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
  /*    var mapping = {"MIN_TRANSACTION_LIMIT": this.view.valueEntryMinValueLimit.tbxEnterValue,
                     "MAX_TRANSACTION_LIMIT": this.view.valueEntryMaxValueLimit.tbxEnterValue,
                     "DAILY_LIMIT": this.view.valueEntryMaxDailyValue.tbxEnterValue,
                     "WEEKLY_LIMIT": this.view.valueEntryWeeklyLimitValue.tbxEnterValue
                    };
      if(dataToSet.limits && dataToSet.limits.length > 0){
        var limits = dataToSet.limits;
        for(var i=0;i< limits.length;i++){
          var txtWidget = mapping[limits[i].type];
          txtWidget.text = limits[i].value;
        }
      }else if(dataToSet.limits&&dataToSet.limits.length===0){
        this.view.valueEntryMinValueLimit.tbxEnterValue.text="0";
        this.view.valueEntryMaxValueLimit.tbxEnterValue.text="0";
        this.view.valueEntryMaxDailyValue.tbxEnterValue.text="0";
        this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text="0";
      } 
      this.view.valueEntryMinValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
      this.view.flxFeaturedActionLimits.setVisibility(true);
      this.view.flxActionDetails4.setVisibility(true);
    }else{
      this.view.flxFeaturedActionLimits.setVisibility(false);
      this.view.flxActionDetails4.setVisibility(false);
    }
    this.view.flxWeeklyLimitValueError.setVisibility(false);
    this.view.flxMaxDailyLimitError.setVisibility(false);
    this.view.flxMaxValueExceedError.setVisibility(false);
    this.view.flxMinValueError.setVisibility(false);
   */ 
    /* show display name and display desc for selected language */
  displaySelectedLanguageContentEditMode: function(onClick){
    var selInd = this.view.segFeatures.selectedRowIndex[1];
    var displayContent = this.view.segFeatures.data[selInd].displayContent?this.view.segFeatures.data[selInd].displayContent:[];
    var selLanguageCode = this.view.lblSelectedLanguage.info.selLang.langCode;
    if(onClick)
    	this.updateContentEditPayload(displayContent);
    var selLangDiplayContent = displayContent[selLanguageCode];
    if(selLangDiplayContent){
      this.view.tbxEditFeatureName.text = selLangDiplayContent.displayName;
      this.view.txtareaEditFeatureDescription.text = selLangDiplayContent.displayDescription;
    }
    this.view.forceLayout();    
  },
  onHoverCallBack:function(widget, context,info) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.showOnHoverInfo(widGetId, info);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.showOnHoverInfo(widGetId, info);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        this.view.ToolTip.setVisibility(false);
      }
    }
  },

  showOnHoverInfo: function(widGetId, info) {
    var scopeObj = this;
    var leftVal = 0;
    var topVal = 0;
    switch (widGetId) {
      case 'fontIconActionTypes':
        leftVal = this.view.fontIconActionTypes.parent.frame.x + 255;
        topVal = this.view.fontIconActionTypes.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 225;
        break;
      case 'fontIconActionCategory':
        leftVal = this.view.fontIconActionCategory.parent.frame.x + 288;
        topVal = this.view.fontIconActionCategory.frame.y- this.view.flxViewActionData.contentOffsetMeasured.y + 225;
        break;
      case 'fontIconFeatureDetailsRow11Header':
        leftVal = this.view.fontIconFeatureDetailsRow11Header.parent.frame.x + 260;
        topVal = this.view.fontIconFeatureDetailsRow11Header.frame.y - this.view.flxViewServiceData.contentOffsetMeasured.y + 228;
        break;
      case 'fontIconActionDependencies':
        leftVal = this.view.fontIconActionDependencies.parent.frame.x  + 268;//this.view.fontIconActionDependencies.frame.x + this.view.fontIconActionDependencies.parent.frame.x;//480;
        topVal = this.view.fontIconActionDependencies.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 383;
        break;
      case 'fontIconActionLimitGroup':
        leftVal = this.view.fontIconActionLimitGroup.frame.x + 167;
        topVal = this.view.fontIconActionLimitGroup.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 611;
        break;
      case 'fontIconMinPerTxLimit':
        leftVal = this.view.fontIconMinPerTxLimit.frame.x + 188;
        topVal = this.view.fontIconMinPerTxLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 732;
        break;
      case 'fontIconMaxTxLimit':
        leftVal = this.view.fontIconMaxTxLimit.parent.frame.x + 379;
        topVal = this.view.fontIconMaxTxLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 732;
        break;
      case 'fontIconMaxDailyLimit':
        leftVal = this.view.fontIconMaxDailyLimit.parent.frame.x + 329;
        topVal = this.view.fontIconMaxDailyLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 732;
        break;
      case 'fontIconMaxWeeklyLimit':
        leftVal = this.view.fontIconMaxWeeklyLimit.frame.x + 189;
        topVal = this.view.fontIconMaxWeeklyLimit.frame.y - this.view.flxViewActionData.contentOffsetMeasured.y + 812;
        break;     
      case 'fontIconActionType':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 415;
        topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + 163;
        break;
      case 'fontIconViewActionCategory':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 657;
        topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + 163;
        break;
      case 'fontIconData2':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 222;
        topVal = this.view.flxEditFeatureContainer.frame.y - this.view.flxFeatureContainer.contentOffsetMeasured.y + 167;
        break;
      case 'fontIconViewDependency':
       leftVal = this.view.flxEditFeatureContainer.frame.x + 635;
       topVal = this.view.flxEditFeatureContainer.frame.y +163;// this.view.flxViewDependency.contentOffsetMeasured.x - 23;
       break;
      case 'fontIconViewLimitGroup':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 207;
        topVal = this.view.fontIconViewLimitGroup.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 695;
        break;
      case 'fontIconMinVal':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 282;
        topVal = this.view.fontIconMinVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 791;
        break;
      case 'fontIconMaxVal':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 472;
        topVal = this.view.fontIconMaxVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 791;
        break;
      case 'fontIconMaxDailyVal':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 646;
        topVal = this.view.fontIconMaxDailyVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 791;
        break;
      case 'fontIconMaxWeeklyVal':
        leftVal = this.view.flxEditFeatureContainer.frame.x + 248;
        topVal = this.view.fontIconMaxWeeklyVal.frame.y - this.view.flxActionLimits.contentOffsetMeasured.y + this.view.flxEditFeatureContainer.frame.y + 882;
        break;
    }
    this.view.ToolTip.left = leftVal + "dp";
    this.view.ToolTip.top = topVal + "dp";
    this.view.ToolTip.lblNoConcentToolTip.text = info;
    this.view.ToolTip.lblarrow.skin =  "sknfontIconDescRightArrow14px";
    this.view.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
    this.view.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    this.view.ToolTip.setVisibility(true);
    scopeObj.view.forceLayout();
  },
    /* show display name and display desc for selected language */
  displaySelectedLangLimitGroupEditMode: function(onClick){
    var selInd = this.view.segLimitGroup.selectedRowIndex[1];
    var displayContent = this.view.segLimitGroup.data[selInd].displayContent?this.view.segLimitGroup.data[selInd].displayContent:[];
    var selLanguageCode = this.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode;
    if(onClick)
    	this.updateLimitGroupEditPayload(displayContent);
    var selLangDiplayContent = displayContent[selLanguageCode];
    if(selLangDiplayContent){
      this.view.displayContentLimitGroupEdit.tbxEditName.text = selLangDiplayContent.displayName;
      this.view.displayContentLimitGroupEdit.txtareaEditDescription.text = selLangDiplayContent.displayDescription;
    }
    this.view.forceLayout();    
  },
    /* show display name and display desc for selected language */
  displaySelectedLangActionEditMode: function(onClick){
    var selInd = this.view.segFeaturedActions.selectedRowIndex[1];
    var displayContent = this.view.segFeaturedActions.data[selInd].displayContent?this.view.segFeaturedActions.data[selInd].displayContent:[];
    var selLanguageCode = this.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode;
    if(onClick)
    	this.updateActionEditPayload(displayContent);
    var selLangDiplayContent = displayContent[selLanguageCode];
    if(selLangDiplayContent){
      this.view.displayContentEdit.tbxEditName.text = selLangDiplayContent.displayName;
      this.view.displayContentEdit.lblNameCount.text = this.view.displayContentEdit.tbxEditName.text.length + "/60";
      this.view.displayContentEdit.txtareaEditDescription.text = selLangDiplayContent.displayDescription;
      this.view.displayContentEdit.lblDescriptionCount.text = this.view.displayContentEdit.txtareaEditDescription.text.length + "/100";
    }
    this.view.forceLayout();    
  },
    /*display popup for terms and conditions of action */
  showTermsConditionsPopupEditMode: function(){
    var selInd = this.view.segFeaturedActions.selectedRowIndex?this.view.segFeaturedActions.selectedRowIndex[1]:0;
    var rowData = this.view.segFeaturedActions.selectedRowItems?this.view.segFeaturedActions.selectedRowItems[0]:this.view.segFeaturedActions.data[selInd];
    var termsCond = rowData.termsAndConditions;
    this.view.lblTCPopupHeader.text = kony.i18n.getLocalizedString("i18n.TermsAndConditions.viewTandC") + " - "+
                       rowData.lblActionName;
    this.view.languagesListTCPopup.segStatusFilterDropdown.info.langDetail = termsCond;
    this.view.flxViewActionTCPopup.setVisibility(true);
    this.displaySelectedLanguageTC(this.view.segFeaturedActions.data[selInd].termsAndConditions);
    this.view.forceLayout();
  },
  updateFeatureDetails: function(){
    this.editFeatureReqParam.serviceFee=this.view.ValueEntry.tbxEnterValue.text;
    this.editFeatureReqParam.statusId=this.view.featureStatusSwitch.switchToggle.selectedIndex===0?
      this.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE:this.AdminConsoleCommonUtils.constantConfig.FEATURE_INACTIVE;
    this.view.flxEditFeaturePopup.setVisibility(false);
    this.currSuccessMsg=this.successMsgParam.EDIT;
    this.presenter.updateFeature(this.editFeatureReqParam);
    this.view.forceLayout();
  },   
  updateActionEditPayload: function(){
    var isPresent=false;
    var isPresentDisplayContent=false; 
    var isStatusPresent=false;
    var currentIndex = -1;
    var segData=this.view.segFeaturedActions.data;
    var dataToSet=segData[this.currSelectedIndex];
    var displayContent = dataToSet.displayContent?dataToSet.displayContent:[];
    var selLangDisplayContent=displayContent[this.prevSelLangAction];
    if(dataToSet.isEdited || dataToSet.isContentEdited || dataToSet.isStatusEdited){
      for(var i=0;i<this.editFeatureReqParam.actions.length;i++){
        if(dataToSet.isContentEdited && Object.values(this.editFeatureReqParam.actions[i]).includes(dataToSet.actionId) && selLangDisplayContent&&((selLangDisplayContent.displayName!==this.view.displayContentEdit.tbxEditName.text)||(selLangDisplayContent.displayDescription!==this.view.displayContentEdit.txtareaEditDescription.text))){
          currentIndex =i;
          for(var j=0;j<this.editFeatureReqParam.actions[i].actionDisplay.length;j++){
            if(Object.values(this.editFeatureReqParam.actions[i].actionDisplay[j]).includes(this.prevSelLangAction)){
              this.editFeatureReqParam.actions[i].actionDisplay[j].displayName=this.view.displayContentEdit.tbxEditName.text;
              this.editFeatureReqParam.actions[i].actionDisplay[j].displayDescription=this.view.displayContentEdit.txtareaEditDescription.text;
              isPresentDisplayContent=true;
              break;
            }
          }         
        }
        if(dataToSet.isStatusEdited && Object.values(this.editFeatureReqParam.actions[i]).includes(dataToSet.actionId)){
          this.editFeatureReqParam.actions[i].statusId=this.view.actionStatusSwitch.switchToggle.selectedIndex===0?
      	  this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE:
          this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE;
          isStatusPresent=true;
        }
        if(dataToSet.isEdited && Object.values(this.editFeatureReqParam.actions[i]).includes(dataToSet.actionId)){
          this.editFeatureReqParam.actions[i].limits=[ 
            { 
              "type":"DAILY_LIMIT",
              "value":this.view.valueEntryMaxDailyValue.tbxEnterValue.text
            },
            { 
              "type":"MAX_TRANSACTION_LIMIT",
              "value":this.view.valueEntryMaxValueLimit.tbxEnterValue.text
            },
            { 
              "type":"MIN_TRANSACTION_LIMIT",
              "value":this.view.valueEntryMinValueLimit.tbxEnterValue.text
            },
            { 
              "type":"WEEKLY_LIMIT",
              "value":this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text
            }];
          isPresent=true;
          break;
        }
      }  
      if(!isPresentDisplayContent && !isPresent && !isStatusPresent) {
        if(currentIndex === -1){
        	currentIndex =this.editFeatureReqParam.actions.length;
        	this.editFeatureReqParam.actions.push({"actionId":dataToSet.actionId,
                                                   "statusId":this.view.actionStatusSwitch.switchToggle.selectedIndex===0?
      														  this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE:
                                                   			  this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE,
                                                   "limits":[],"actionDisplay":[]});    
        }
      }
      if(!isPresentDisplayContent && dataToSet.isContentEdited){         
        this.editFeatureReqParam.actions[currentIndex].actionDisplay.push({
          "localeId":this.prevSelLangAction,
          "displayName":this.view.displayContentEdit.tbxEditName.text,
          "displayDescription":this.view.displayContentEdit.txtareaEditDescription.text
        });
      }
      if(!isPresent && dataToSet.isEdited){
        this.editFeatureReqParam.actions[currentIndex].limits.push(
          { 
            "type":"DAILY_LIMIT",
            "value":this.view.valueEntryMaxDailyValue.tbxEnterValue.text
          },
          { 
            "type":"MAX_TRANSACTION_LIMIT",
            "value":this.view.valueEntryMaxValueLimit.tbxEnterValue.text
          },
          { 
            "type":"MIN_TRANSACTION_LIMIT",
            "value":this.view.valueEntryMinValueLimit.tbxEnterValue.text
          },
          { 
            "type":"WEEKLY_LIMIT",
            "value":this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text
                                              });
      }      
      this.view.segFeaturedActions.data[this.currSelectedIndex].displayContent[this.prevSelLangAction]={
        "displayName":this.view.displayContentEdit.tbxEditName.text,
        "displayDescription":this.view.displayContentEdit.txtareaEditDescription.text};
      this.view.segFeaturedActions.data[this.currSelectedIndex].status=this.view.actionStatusSwitch.switchToggle.selectedIndex===0?
      														  	       this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE:
                                                   			  		   this.AdminConsoleCommonUtils.constantConfig.ACTION_INACTIVE;
      this.view.segFeaturedActions.data[this.currSelectedIndex].limits=[
            { 
              "type":"DAILY_LIMIT",
              "value":this.view.valueEntryMaxDailyValue.tbxEnterValue.text
            },
            { 
              "type":"MAX_TRANSACTION_LIMIT",
              "value":this.view.valueEntryMaxValueLimit.tbxEnterValue.text
            },
            { 
              "type":"MIN_TRANSACTION_LIMIT",
              "value":this.view.valueEntryMinValueLimit.tbxEnterValue.text
            },
            { 
              "type":"WEEKLY_LIMIT",
              "value":this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text
            }];
    }
  },
  updateContentEditPayload: function(){
    var isPresent=false;
    var self=this;
    var selInd = this.view.segFeatures.selectedRowIndex[1];
    var displayContent = this.view.segFeatures.data[selInd].displayContent?this.view.segFeatures.data[selInd].displayContent:[];
    var selLangDisplayContent=displayContent[this.prevSelLang];
    if(selLangDisplayContent&&((selLangDisplayContent.displayName!==this.view.tbxEditFeatureName.text)||(selLangDisplayContent.displayDescription!==this.view.txtareaEditFeatureDescription.text))){
    for(var j=0;j<self.editFeatureReqParam.featureDisplay.length;j++){
      if(Object.values(self.editFeatureReqParam.featureDisplay[j]).includes(self.prevSelLang)){
        self.editFeatureReqParam.featureDisplay[j].displayName=self.view.tbxEditFeatureName.text;
        self.editFeatureReqParam.featureDisplay[j].displayDescription=self.view.txtareaEditFeatureDescription.text;
        isPresent=true;
        break;
      }
    }
    if(!isPresent){
      self.editFeatureReqParam.featureDisplay.push({
        "localeId":self.prevSelLang,
        "displayName":self.view.tbxEditFeatureName.text,
        "displayDescription":self.view.txtareaEditFeatureDescription.text
      });
    }
     this.view.segFeatures.data[selInd].displayContent[this.prevSelLang]={"displayName":self.view.tbxEditFeatureName.text,
        "displayDescription":self.view.txtareaEditFeatureDescription.text};
    }
  },
  updateLimitGroupEditPayload: function(){
    var isPresent=false;
    var self=this;
    var selInd = this.view.segLimitGroup.selectedRowIndex[1];
    var displayContent = this.view.segLimitGroup.data[selInd].displayContent?this.view.segLimitGroup.data[selInd].displayContent:[];
    var selLangDisplayContent=displayContent[this.prevSelLangLimitGroup];
    if(selLangDisplayContent&&((selLangDisplayContent.displayName!==this.view.displayContentLimitGroupEdit.tbxEditName.text)||(selLangDisplayContent.displayDescription!==this.view.displayContentLimitGroupEdit.txtareaEditDescription.text))){
      for(var j=0;j<self.editLimitGroupReqParam.limitGroupDisplay.length;j++){
        if(Object.values(self.editLimitGroupReqParam.limitGroupDisplay[j]).includes(self.prevSelLangLimitGroup)){
          self.editLimitGroupReqParam.limitGroupDisplay[j].displayName=self.view.displayContentLimitGroupEdit.tbxEditName.text;
          self.editLimitGroupReqParam.limitGroupDisplay[j].displayDescription=self.view.displayContentLimitGroupEdit.txtareaEditDescription.text;
          isPresent=true;
          break;
        }
      }
      if(!isPresent){
        self.editLimitGroupReqParam.limitGroupDisplay.push({
          "localeId":self.prevSelLangLimitGroup,
          "displayName":self.view.displayContentLimitGroupEdit.tbxEditName.text,
          "displayDescription":self.view.displayContentLimitGroupEdit.txtareaEditDescription.text
        });
      }
     this.view.segLimitGroup.data[selInd].displayContent[this.prevSelLangLimitGroup]={"displayName":self.view.displayContentLimitGroupEdit.tbxEditName.text,
        "displayDescription":self.view.displayContentLimitGroupEdit.txtareaEditDescription.text};
    }
  },
  setSegLangData: function(rowData){
    var lang = this.view.EditFeatureLangList.segStatusFilterDropdown.info.lang;
    this.view.EditFeatureLangList.segStatusFilterDropdown.setData(lang);
    var segData =this.view.EditFeatureLangList.segStatusFilterDropdown.data;
    var filteredLang = [];
    var keys=Object.keys(rowData.displayContent);
    for(var i=0;i<this.view.EditFeatureLangList.segStatusFilterDropdown.data.length;i++){
      if (keys.includes(this.view.EditFeatureLangList.segStatusFilterDropdown.data[i].langCode) && this.view.lblSelectedLanguage.info.selLang.langCode !== this.view.EditFeatureLangList.segStatusFilterDropdown.data[i].langCode) {
        filteredLang.push(segData[i]);
      }
    }
    this.view.EditFeatureLangList.segStatusFilterDropdown.setData(filteredLang);
    this.view.forceLayout();
  },
  setSegLangDataLimitGroup: function(rowData){
    var lang = this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.info.lang;
    this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.setData(lang);
    var segData =this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data;
    var filteredLang = [];
    var keys=Object.keys(rowData.displayContent);
    for(var i=0;i<this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data.length;i++){
      if (keys.includes(this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) && this.view.displayContentLimitGroupEdit.lblSelectedLanguage.info.selLang.langCode !== this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) {
        filteredLang.push(segData[i]);
      }
    }
    this.view.displayContentLimitGroupEdit.EditLangList.segStatusFilterDropdown.setData(filteredLang);
    this.view.forceLayout();
  },
  setSegLangDataAction: function(rowData){
    var lang = this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.info.lang;
    this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.setData(lang);
    var segData =this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data;
    var filteredLang = [];
    var keys=Object.keys(rowData.displayContent);
    for(var i=0;i<this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data.length;i++){
      if (keys.includes(this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) && this.view.displayContentEdit.lblSelectedLanguage.info.selLang.langCode !== this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.data[i].langCode) {
        filteredLang.push(segData[i]);
      }
    }
    this.view.displayContentEdit.EditLangList.segStatusFilterDropdown.setData(filteredLang);
    this.view.forceLayout();
  },
  validateLimits : function(){
    //if(this.validateLimitFields() && this.validateFieldsAction()){
      var selInd=this.view.segFeaturedActions.selectedRowIndex;
      this.toggleSelectedRow();
    var featureId=this.view.lblFeatureNamePopup.text;
      this.mapDependencies(this.view.segFeaturedActions.data[selInd[1]].dependentActions,featureId);
    //}
  },
  validateLimitFields : function(){
    var isValid=true;
    var segData=this.view.segFeaturedActions.data;
    var minVal=parseFloat(this.view.valueEntryMinValueLimit.tbxEnterValue.text);
    var maxVal=parseFloat(this.view.valueEntryMaxValueLimit.tbxEnterValue.text);
    var maxDailyVal=parseFloat(this.view.valueEntryMaxDailyValue.tbxEnterValue.text);
    var maxWeeklyVal=parseFloat(this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text);
    if(this.view.flxFeaturedActionLimits.isVisible){
      if(this.view.valueEntryMinValueLimit.tbxEnterValue.text===""||minVal<0){
        this.view.valueEntryMinValueLimit.flxValueTextBox.skin = "sknBorderRed";
        if(this.view.valueEntryMinValueLimit.tbxEnterValue.text==="")
          this.view.lblMinValueLimitErrorMsg.text="Value cannot be empty";
        else
          this.view.lblMinValueLimitErrorMsg.text="Value cannot be less than 0";
        this.view.flxMinValueError.setVisibility(true);
      }else{
        this.view.valueEntryMinValueLimit.flxValueTextBox.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.flxMinValueError.setVisibility(false);
      }
        
      if(this.view.valueEntryMaxValueLimit.tbxEnterValue.text===""|| maxVal<0 || maxVal<minVal){
        if(this.view.valueEntryMaxValueLimit.tbxEnterValue.text==="")
          this.view.lblMaxValueLimitErrorMsg.text="Value cannot be empty";
        else if(maxVal<0)
          this.view.lblMaxValueLimitErrorMsg.text="Value cannot be less than 0";
        else if(maxVal<minVal)
          this.view.lblMaxValueLimitErrorMsg.text="Value cannot be less than min transaction limit";
        this.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknBorderRed";
        this.view.flxMaxValueExceedError.setVisibility(true);
      }else{
        this.view.valueEntryMaxValueLimit.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.flxMaxValueExceedError.setVisibility(false);
      }
      
      if(this.view.valueEntryMaxDailyValue.tbxEnterValue.text===""||maxDailyVal<0 || maxDailyVal<maxVal){
        if(this.view.valueEntryMaxDailyValue.tbxEnterValue.text==="")
          this.view.lblDailyLimitValueErrorMsg.text="Value cannot be empty";
        else if(maxDailyVal<0)
          this.view.lblDailyLimitValueErrorMsg.text="Value cannot be less than 0";
        else if(maxDailyVal<maxVal)
          this.view.lblDailyLimitValueErrorMsg.text="Value cannot be less than max transaction limit";
        this.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknBorderRed";
        this.view.flxMaxDailyLimitError.setVisibility(true);
      }else{
        this.view.valueEntryMaxDailyValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.flxMaxDailyLimitError.setVisibility(false);
      }
      
      if(this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text===""|| maxWeeklyVal<0||maxWeeklyVal<maxDailyVal){
        if(this.view.valueEntryWeeklyLimitValue.tbxEnterValue.text==="")
          this.view.lblWeeklyLimitValueErrorMsg.text="Value cannot be empty";
        else if(maxWeeklyVal<0)
          this.view.lblWeeklyLimitValueErrorMsg.text="Value cannot be less than 0";
        else if(maxWeeklyVal<maxDailyVal)
          this.view.lblWeeklyLimitValueErrorMsg.text="Value cannot be less than daily transaction limit";
        this.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknBorderRed";
        this.view.flxWeeklyLimitValueError.setVisibility(true);
      }else{
        this.view.valueEntryWeeklyLimitValue.flxValueTextBox.skin="sknFlxbgFFFFFFbdrD7D9E0rd3px";
        this.view.flxWeeklyLimitValueError.setVisibility(false);
      }
      if(this.view.flxMinValueError.isVisible||this.view.flxMaxValueExceedError.isVisible||this.view.flxMaxDailyLimitError.isVisible||this.view.flxWeeklyLimitValueError.isVisible)
        isValid=false;
      
      if(isValid)
        this.updateActionEditPayload(segData[this.currSelectedIndex]);
    }
    return isValid;
  },
  /* select the current action in the edit screen
   */
  selectRequiredLimit : function(){
    this.subTabsButtonUtilFunction([this.view.btnFeatures,this.view.btnActions],this.view.btnActions);
    this.view.flxFeaturedAction.setVisibility(true);
    this.view.flxFeatureContainer.setVisibility(false);

    var selAction = this.view.segActionList.selectedRowItems;
    var actionId = selAction[0].actionId;
    var actions = this.view.segFeaturedActions.data;
    var selInd = 0;
    for(var i=0;i<actions.length;i++){
      if(actionId === actions[i].actionId){
        selInd = i;
        break;
      } 
    }
    if(this.view.segFeaturedActions.selectedRowIndex){
      this.view.segFeaturedActions.selectedRowIndex[1] = selInd;
    }else{
      this.view.segFeaturedActions.selectedRowIndex = [0,selInd];
    }
    this.toggleSelectedRow();
    this.view.forceLayout();
  },
  allowOnlyNumericValuesAndDot: function (evt) {
    if (evt.which !== 8 && evt.which !== 0 && evt.which!==46&&(evt.which < 48 || evt.which > 57))
    {
        return false;
    }else
      return true;
  },
    restrictTextFieldToNumericAndDot : function (widgetID) {
      var text = document.getElementById(widgetID);
      text.onkeypress = text.onpaste = this.allowOnlyNumericValuesAndDot;
    },
    containSpecialChars: function(name){
      var regex = /[+=\\\\|<>^*%]/;  
      if(regex.test(name)){
        return true;
      }
      return false;
    },
    /* get 2 digit string for number */
    getTwoDigitNumber : function(count){
      var updatedCount = 0;
      count = parseInt(count,10);
      if(count > 9){
        updatedCount = count;
      } else{
        updatedCount = "0"+count;
      }
      return updatedCount;
    },
    sortFeatureActions:function(sortColumn){
      var scopeObj  = this;
      var sortOrder = (scopeObj.sortBy && sortColumn === scopeObj.sortBy.columnName) ? !scopeObj.sortBy.inAscendingOrder : true;  
      scopeObj.sortBy = scopeObj.getObjectSorter(sortColumn);
      scopeObj.sortBy.inAscendingOrder = sortOrder;
      scopeObj.getObjectSorter().column(sortColumn);
      let sectionData = scopeObj.view.segActionList.data;
      var sortedData = sectionData.sort(scopeObj.sortBy.sortData);

      scopeObj.view.lblIconActionNameSort.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy,'lblActionName');
      scopeObj.view.lblIconActionCodeSort.text = scopeObj.returnSortFontIconValue(scopeObj.sortBy, 'lblActionCode.toolTip');

      scopeObj.view.segActionList.setData(sortedData);
      scopeObj.view.forceLayout();
    },
};
});
define({
  groupsCurrAction:"",
  prevIndex : -1,
  prevKey:null,
  groupActionConfig :{
    CREATE:"CREATE",
    EDIT:"EDIT",
    VIEW:"VIEW"
  },
  serviceTypeConfig:{
    "TYPE_ID_RETAIL":kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking"),
    "TYPE_ID_BUSINESS":kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking"),
    "TYPE_ID_WEALTH":kony.i18n.getLocalizedString("i18n.frmGroupsController.WealthBanking")
  },
  data:[],
  createRequestParam:{},
  isReviewDataset:0,
  roleSegment: [],
  isFeaturedataset:0,
  delayTimer : null,
  featureactionmap:[],
  featuresegData:[],
  accessPolicies:[],
  features:[],
  groupsMasterData:[],
  groupsData:[],
  masterData:[],
  serviceFeatures:[],
  servicename:[],
  isFeatureSelectionPage: false,
  advanceSelectionFlag:true,
  isSingleEntity:false,
  getMoreDataModel : null,
  getMoreDataModelAdvSel: null,
  selectedFeatureActionObj:{},
  selectedLegalEntityCurrency: null,
  currentAction: kony.i18n.getLocalizedString("i18n.frmBusinessTypes.Business_Type_List_UC"),
  actionConfig: {
    edit: kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.EDIT"),
    view: kony.i18n.getLocalizedString("i18n.permission.View").toUpperCase()
  },
  currencyValue : "\ue96c",
  delayedSearch : function() {
    var scopeObj = this;
    clearTimeout(scopeObj.delayTimer);
    scopeObj.delayTimer = setTimeout(function() {
      scopeObj.loadPageData();
    }, 300);
  },
    PreShowGroups: function() {
    this.isSingleEntity = kony.mvc.MDAApplication.getSharedInstance().appContext.IS_SINGLE_ENTITY;
    this.legalEntityList = this.presenter.fetchLegalEntityList();
    this.data = this.legalEntityList;
    this.setFlowActions();
    this.setPreshowData();
    this.showGroupUIChanges();
    this.setHeight();
    
  },

  willUpdateUI: function (groupsModel) {
    var scopeObj = this;
    this.updateLeftMenu(groupsModel);
    if(groupsModel === undefined) {}
    else if(groupsModel.LoadingScreen){
      if(groupsModel.LoadingScreen.focus)
        kony.adminConsole.utils.showProgressBar(this.view);
      else
        kony.adminConsole.utils.hideProgressBar(this.view);
    }else if(groupsModel.toast){
      if(groupsModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")){
        this.view.toastMessage.showToastMessage(groupsModel.toast.message,this);
      }else if(groupsModel.toast.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")){
        this.view.toastMessage.showErrorToastMessage (groupsModel.toast.message,this);
      }else{}
      kony.adminConsole.utils.hideProgressBar(this.view);
    }else if (groupsModel.custGroupsList  ) {
      kony.adminConsole.utils.showProgressBar(this.view);
      this.servicename = groupsModel.custGroupsList;
      if (groupsModel.custGroupsList.length > 0) {
        this.view.flxGroupList.setVisibility(true);
        this.view.flxNoGroups.setVisibility(false);
        this.sortBy = this.getObjectSorter("name");
        this.groupsData = groupsModel.custGroupsList;
        this.setListFiltersData();
        this.resetSortImages("grouplist");
        this.loadPageData = function () {
          var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
          if(searchText.length>3 && !this.containSpecialChars(searchText))
            var searchfilterlist = this.groupsData.filter(this.searchFilter);
          else
            var searchfilterlist = this.groupsData;
          var groupsList = searchfilterlist.sort(this.sortBy.sortData);
          var filteredGroupList = this.filterBasedOnTypeStatus(groupsList);
          if (filteredGroupList.length === 0) {
            this.showGroupList(groupsList);
          } else {
          this.showGroupList(filteredGroupList);
          }
          this.view.flxSegGroups.isVisible = true;
        };
        this.loadPageData();
      } else {
        this.groupsData = [];
        this.hideAll();
        this.view.flxNoGroups.setVisibility(true);
        this.view.flxNoGroups.top = "180dp";
        this.view.flxGroupList.isVisible = true;
        this.view.flxGroupSearch.isVisible = true;
        this.view.flxSegGroups.isVisible = false;
        this.view.mainHeader.flxButtons.isVisible = true;
        this.view.forceLayout();
      }
      kony.adminConsole.utils.hideProgressBar(this.view);

    }
    else if(groupsModel.associatedRoles){
      this.currentAction=groupsModel.action;
      if(this.currentAction===this.actionConfig.edit)
        this.showEditAssociatedRolesUi(groupsModel.associatedRoles);
      else if(this.currentAction===this.actionConfig.view)
        this.showViewAssociatedRolesUi(groupsModel.associatedRoles);
    }
    else if(groupsModel.getAllGroups){
      this.groupsMasterData=groupsModel.getAllGroups;
    }
    else if(groupsModel.getGroupFeaturesAction){
      this.showViewRoleFeaturesList(groupsModel.getGroupFeaturesAction.features);
    }
    else if(groupsModel.action===this.actionConfig.view){
      this.roleIdSelected= groupsModel.defaultRoleId;
      this.roleNameSelected="";//Tobe assigned while populating roles segment
      this.toggleEditRoles(false);
    }
    else if(groupsModel.fetchFeaturesAndActions) {
      this.viewFeaturesActionList(groupsModel.fetchFeaturesAndActions);
    } 
    else if(groupsModel.accessPolicies) {
      scopeObj.accessPolicies = groupsModel.accessPolicies;
    } 
    else if(groupsModel.allFeaturesAndActions){
      scopeObj.features = groupsModel.allFeaturesAndActions[0].features;
      scopeObj.masterData = JSON.parse(JSON.stringify(scopeObj.features));
      scopeObj.setactions(scopeObj.features);
      if(scopeObj.advanceSelectionFlag==="true"){
        scopeObj.view.segAdvanceSelFeatures.setData([]);
        scopeObj.settingAdvanceSelComp();//setAdvanceSelectionContent();
      }
      scopeObj.initialiseFeatureActionMap();
      scopeObj.setDynamicActionsLimits();
    }
    else if(groupsModel.serviceFeaturesForEdit){
      scopeObj.features = groupsModel.features;
      scopeObj.groupsMasterData=groupsModel.associatedRolesForEdit;
      scopeObj.filterGroupBasedOnType(scopeObj.createRequestParam.serviceType);    	 
      scopeObj.masterData = JSON.parse(JSON.stringify(scopeObj.features));
      scopeObj.setactions(scopeObj.features);
      if(scopeObj.advanceSelectionFlag==="true"){
        scopeObj.view.segAdvanceSelFeatures.setData([]);
        scopeObj.settingAdvanceSelComp();//setAdvanceSelectionContent();
      }
      scopeObj.initialiseFeatureActionMap();
      scopeObj.serviceFeatures = groupsModel.serviceFeaturesForEdit;
      scopeObj.setactions(scopeObj.serviceFeatures);
      if (scopeObj.serviceFeatures.length > 0) {
        scopeObj.selectedFeatureActionObj ={};
        scopeObj.fillFeatureActionMapForEdit();
        scopeObj.SetIsSelectedForEdit();
        scopeObj.createRequest();
      }
      scopeObj.setDynamicActionsLimits();
    }
  },

  PostShowGroups: function () {
    this.setDataLegalEntity();
    this.setDropdownHeight();
  },

  setDropdownHeight: function () {
    if (kony.os.deviceInfo().screenHeight > 700) {
      this.view.flxDropDownServTypServDetails.height = "40dp";
      this.view.switchStatus.height = "28dp";
      this.view.flxGroupStatus.height = "30dp";
      this.view.lblSwitchActivate.top = "3dp";
    }
  },

  setDataLegalEntity: function () {
    if (this.view.lblSelectedRowsServType.text !== "") {
      for (var i = 0; i < this.legalEntityList.length; i++) {
        if (this.legalEntityList[i].companyName === this.view.lblSelectedRowsServType.text) {
          this.selectedLegalEntity = this.legalEntityList[i].id;
        }
      }
      this.getAllGroups();
    }
  },

  /*sets isSelected flag for all the actions*/
  setactions: function(array) {
    var scopeObj = this;
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].actions.length; j++) {
        array[i].actions[j].isSelected = 0;
        array[i].actions[j].retained= 0;
      }
    }
  },

  getAccessPolicies: function(){
    var scopeObj=this;
    if(scopeObj.accessPolicies.length == 0){
      scopeObj.presenter.getAccessPolicies();
    }
  },

  initialiseFeatureActionMap:function(){
    var scopeObj=this;
    var arr;
    for(var i=0 ;i<scopeObj.features.length;i++){
      arr=[]
      for (var j=0;j<scopeObj.accessPolicies.length;j++){
        arr[j]=0;
      }
      scopeObj.featureactionmap[i]=arr;
    }	
  },

  containsAccesspolicy(policy){
    var scopeObj=this;
    for (var j=0;j<scopeObj.accessPolicies.length;j++){
      if(scopeObj.accessPolicies[j].name===policy)
        return true;
    }
    return false;
  },

  resetSortImages: function(context,fontIconName) {
    var self = this;    
    if (context === "grouplist") {
      self.sortIconFor('name', 'fontIconSortName');
      self.sortIconFor('numberOfContracts', 'fontIconSortContracts');
      self.sortIconFor('numberOfFeatures', 'fontIconSortFeatures');
      self.sortIconFor('numberOfRoles', 'fontIconSortRoles');
    }
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },

  setHeight : function(){
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    scrollHeight= screenHeight-106;
    this.view.flxGroupListContainer.height=screenHeight-255+"px";
    this.view.flxGroupList.height=scrollHeight+"px";
    this.view.flxGroupListContainer.height = scrollHeight - 130 + "px";
  },

  filterBasedOnTypeStatus : function(data){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var groupsList = data || self.groupsData;
    var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    var typeIndices = self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];

    var selStatusInd = null;
    var selTypeInd = null;

    //get selected types
    var types = "";
    selTypeInd = typeIndices ? typeIndices[0][1] : [];
    for (var i = 0; i < selTypeInd.length; i++) {

      selFilter[0][0].push(self.view.typeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].Type_id) ;
      types += self.serviceTypeConfig[self.view.typeFilterMenu.segStatusFilterDropdown.data[selTypeInd[i]].Type_id] + ",";
    }
    //get selected status
    var statuses = "";
    selStatusInd = statusIndices ? statusIndices[0][1] : [];
    for (var j = 0; j < selStatusInd.length; j++) {
      selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id);
      statuses += self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id + ",";
    }

    if(self.view.mainHeader.btnDropdownList.info === undefined) {
      self.view.mainHeader.btnDropdownList.info = {};
    }
    self.view.mainHeader.btnDropdownList.info.selectedTypeList = types.substring(0, types.length-1);
    self.view.mainHeader.btnDropdownList.info.selectedStatusList = statuses.substring(0, statuses.length-1);

    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0 ) { //none selected - show no results
      dataToShow = [];
    }else if(selFilter[0][1].length==self.view.statusFilterMenu.segStatusFilterDropdown.data.length&&selFilter[0][0].length==self.view.typeFilterMenu.segStatusFilterDropdown.data.length)
      dataToShow=groupsList;
    else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0 ) {//both filters selected
      dataToShow = self.filterGroupsData(groupsList,selFilter);
    } else { //single filter selected
    }
    return dataToShow;
  },

  filterGroupsData(groupsList,selFilter){
    var self=this;
    var dataToReturn= groupsList.filter(function (rec) {
      if (selFilter[0][1].indexOf(rec.status) >= 0 && selFilter[0][0].indexOf(rec.serviceType) >= 0) {
        return rec;
      }
    });
    return dataToReturn;
  },

  selectAllRows: function() {
    var data = this.view.segCustomers.data;
    var limit=data.length;
    var indices = [[0,[]]];
    for(var i=0;i<limit;i++){
      indices[0][1].push(i);
    }
    this.view.segCustomers.selectedIndices = indices;
    this.view.lblCustSearchCount.text = data.length+" "+kony.i18n.getLocalizedString("i18n.frmGroupsController.Customers_Selected");
  },
  unSelectAllRows: function() {
    this.view.segCustomers.selectedIndices = null;
  },

  setListFiltersData: function () {
    var self = this;
    var statusList=[],typeList=[],typeIdList=[],businessTypeList=[];
    var maxSizeTypeText="", maxSizeBTypeText="",maxSizeStatusText=kony.i18n.getLocalizedString("i18n.secureimage.Active");
    for(var i=0;i<self.groupsData.length;i++){
      if(!statusList.contains(self.groupsData[i].status))
        statusList.push(self.groupsData[i].status);
      if(!typeIdList.contains(self.groupsData[i].serviceType)){
        var value = self.serviceTypeConfig[self.groupsData[i].serviceType];
        typeList.push(value);
        typeIdList.push(self.groupsData[i].serviceType);
      }

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
      if(rec !== self.AdminConsoleCommonUtils.constantConfig.ACTIVE)
        maxSizeStatusText=kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": (rec === self.AdminConsoleCommonUtils.constantConfig.ACTIVE)? kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive")
      };
    });
    var typeData = typeIdList.map(function(rec){
      maxSizeTypeText= self.serviceTypeConfig[rec].length> maxSizeTypeText.length? self.serviceTypeConfig[rec]: maxSizeTypeText;
      return {
        "Type_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": self.serviceTypeConfig[rec]
      };
    });
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.typeFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(statusData);
    self.view.typeFilterMenu.segStatusFilterDropdown.setData(typeData);
    self.view.flxStatusFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeStatusText)+55+"px";
    self.view.flxTypeFilter.width=self.AdminConsoleCommonUtils.getLabelWidth(maxSizeTypeText)+55+"px";

    var selStatusInd = [],selTypeInd = [],selBusiTypeInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    for(var k=0;k<typeList.length;k++){
      selTypeInd.push(k);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    self.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selTypeInd]];
    self.view.forceLayout();
  },
  setFeaturesPageSegment: function() {
    var scopeObj=this;
    var dropdownWidgetMap = {
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var dropdownSegData = scopeObj.accessPolicies.map(function(rec) {
      return {
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": {
          "src":"checkboxnormal.png",
          "onClick": function() {
            //scopeObj.toggleCheckBox(2);
            scopeObj.toggleCheckBox(scopeObj.view.featureAndActions.imgCheckBox,scopeObj.view.featureAndActions.segDropdown);
          }
        },
        "lblDescription": rec.name
      };
    });
    this.view.featureAndActions.segDropdown.widgetDataMap = dropdownWidgetMap;
    this.view.featureAndActions.segDropdown.setData(dropdownSegData);
    this.view.forceLayout();
  },

  toggleCheckBox: function(imgcheckbox,segmentwidget) {
    this.view.featureAndActions.flxAssignActions.setVisibility(true);
    this.view.featureAndActions.lblSelect.text = "Select All";
    var segData = segmentwidget.data;
    var seglength = segData.length;
    var selIndex = segmentwidget.selectedRowIndex[1];
    var rowData = segData[selIndex];
    var data=rowData;
    var count = 0;
    for (var i = 0; i < segData.length; i++) {
      if (segData[i].imgCheckBox.src === "checkboxselected.png") count = count + 1;
    }
    if (rowData.imgCheckBox.src === "checkboxnormal.png") {
      data.imgCheckBox.src = "checkboxselected.png";
      count++;
    } else {               
      data.imgCheckBox.src = "checkboxnormal.png";
      count--;
    }
    segmentwidget.setDataAt(data, selIndex, 0);
    if (count === 0) {
      this.view.featureAndActions.flxAssignActions.setVisibility(false);
      imgcheckbox.src = "checkboxnormal.png";
    } else {
      this.view.featureAndActions.flxAssignActions.setVisibility(true);
      if (count === seglength) imgcheckbox.src = "checkboxselected.png";
      else imgcheckbox.src = "checkboxpartial.png";
    }        
    this.view.forceLayout();
  },

  selectAllSegmentData: function(checkboxwidget,segwidget) {
    this.view.featureAndActions.flxAssignActions.setVisibility(true);
    var scopeObj = this;
    var segData = segwidget.data;
    var seglength = segData.length;

    if (checkboxwidget.src === "checkboxnormal.png") {
      //this.view.featureAndActions.flxAssignActions.setVisibility(true);
      for (var cnt = 0; cnt < seglength; cnt++) {
        segData[cnt].imgCheckBox =  {
          "src": "checkboxselected.png",
          "onClick": function() {
            scopeObj.toggleCheckBox(checkboxwidget,segwidget);
          }
        };
      }
      checkboxwidget.src = "checkboxselected.png";
    } else {
      //this.view.featureAndActions.flxAssignActions.setVisibility(false);
      for (var cnt = 0; cnt < seglength; cnt++) {
        segData[cnt].imgCheckBox = {
          "src": "checkboxnormal.png",
          "onClick": function() {
            scopeObj.toggleCheckBox(checkboxwidget,segwidget);
          }
        };
      }
      checkboxwidget.src = "checkboxnormal.png";
    }
    segwidget.setData(segData);
    this.view.forceLayout();
  },

  /*enable or disable save button in features page based on actions selected*/
  setVisibilityOfSave:function(){
    var scopeObj= this;
    if(scopeObj.isFeatureActionMapEmpty() ===1)
      scopeObj.disableBtn(scopeObj.view.featureAndActions.btnSave);
    else
      scopeObj.enableBtn(scopeObj.view.featureAndActions.btnSave);
  },

  disableBtn: function(widget){
    widget.setEnabled(false);
    widget.skin="sknBtnDisable7B7B7Brad20px";
  },

  enableBtn:function(widget){
    widget.setEnabled(true);
    widget.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
  },

  setFlowActions: function(){
    var scopeObj = this;
    this.view.btnUpdate.onClick = function(){
      scopeObj.updateServiceDefinition();
    },
      this.view.btnAdd.onClick = function(){
      scopeObj.createServiceDefinition();
    },
      this.view.listingSegmentClient.contextualMenu.flxOption2.onClick = function(){
      scopeObj.view.mainHeader.lblHeading.text = "Edit Service";
      scopeObj.onEditServiceClick();
    },
      this.view.contextualMenu1.flxOption1.onClick = function() {
      scopeObj.view.listingSegmentClient.contextualMenu.flxOption2.onClick();
    },
      this.view.featureAndActions.imgCheckBox.onClick= function(){
      scopeObj.selectAllSegmentData(scopeObj.view.featureAndActions.imgCheckBox,scopeObj.view.featureAndActions.segDropdown);
    },
      this.view.featureAndActions.imgFeatureCheckbox.onClick = function() {
      scopeObj.selectAllSegmentData(scopeObj.view.featureAndActions.imgFeatureCheckbox,scopeObj.view.featureAndActions.segFeatures);
    };
    this.view.btnNext.onClick = function() {
      var isValid = scopeObj.validateLimits();
      if(isValid)
        scopeObj.showAssignRolesPage();
    };
    this.view.btnOption1.onClick = function() {
      scopeObj.showResetAllLimitsPopup();
    };
    this.view.popUpCancelEdits.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
    };
    this.view.popUpCancelEdits.lblPopupClose.onClick = function() {
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
    };
    this.view.btnCancel.onClick = function() {
      scopeObj.getAllGroups();
    };
    this.view.featureAndActions.btnCancel.onClick = function(){
      scopeObj.getAllGroups();
    };

    this.view.featureAndActions.commonButtons.btnCancel.onClick = function(){
      scopeObj.getAllGroups();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function(){
      scopeObj.featureactionmap = [];
      scopeObj.prevKey=null;
      scopeObj.groupsCurrAction = scopeObj.groupActionConfig.CREATE;
      scopeObj.view.flxDropDownServTypServDetails.setEnabled(true);
      scopeObj.view.flxDropDownServTypServDetails.skin = "sknflxffffffoptemplateop3px";
      scopeObj.view.lstBoxType.hoverSkin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.view.lblSelectedRowsServTypeServDetails.text = "Select Legal Entity";
      scopeObj.view.mainHeader.lblHeading.text = "Add Service";
      scopeObj.isFeatureSelectionPage = false;
      scopeObj.view.segAdvanceSelFeatures.setData([]);
      scopeObj.selectedFeatureActionObj = {};
      scopeObj.createRequestParam = {
        "name": "",
        "description": "",
        "status": scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE,
        "serviceType": "",
        "featureactions": [],
        "defaultRole": "",
        "legalEntityId": scopeObj.selectedLegalEntity
      };
      scopeObj.showAddGroupDetails();
      scopeObj.view.switchStatus.setEnabled(true);
    // scopeObj.presenter.getGroups(scopeObj.createRequestParam);
    };
    this.view.noStaticData.btnAddStaticContent.onClick = function(){
      scopeObj.featureactionmap = [];
      scopeObj.prevKey=null;
      scopeObj.groupsCurrAction = scopeObj.groupActionConfig.CREATE;
      scopeObj.view.segAdvanceSelFeatures.setData([]);
      scopeObj.createRequestParam = {"name":"","description":"","status":scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE,
                                     "serviceType" : "","featureactions":[]};
      scopeObj.showAddGroupDetails();
    };
    this.view.listingSegmentClient.segListing.onRowClick = function(){
      scopeObj.groupsCurrAction=scopeObj.groupActionConfig.VIEW;
      scopeObj.viewServiceDefinition();
    };

    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.getAllGroups();
    };

    this.view.btnAdvancedSelection.onClick = function() {
      scopeObj.showAdvanceSelectionUI();
    };

    this.view.featureAndActions.btnSelection.onClick = function() {
      scopeObj.showAdvanceSelectionUI();
    };

    this.view.tbxSearchBox.onDone = function(){
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxSearchBox.text);
      if(searchText && searchText.length >=3){
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.searchAdvanceSelection();
      }
    };

    this.view.btnCancelAdvSel.onClick = function() {
      if(scopeObj.isFeatureActionMapEmpty() === 1)
        scopeObj.showfeaturesPage();
      else{
        scopeObj.hideAllGroups();
        if(scopeObj.isFeatureSelectionPage === true){
          scopeObj.view.flxFeatureComponent.setVisibility(true);
          var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
          scopeObj.view.featureAndActions.segFeatures.setData(data);
          scopeObj.view.featureAndActions.flxFeatures.setVisibility(true);
        }
        else{
          scopeObj.view.flxFeatureComponent.setVisibility(true);
          scopeObj.view.featureAndActions.flxReview.setVisibility(true);
        }
        //         var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
        //         scopeObj.showReviewPage(data);
      }
    };

    this.view.btnSave.onClick = function() {  
      scopeObj.setFeatureactionMappingForComponent();
      if (scopeObj.isFeatureActionMapEmpty() === 1) scopeObj.showfeaturesPage();
      else {
        scopeObj.isFeatureSelectionPage = false;
        var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
        scopeObj.showReviewPage(data);
        scopeObj.createRequest();
      }
    };

    this.view.associatedRoles.btnCancel.onClick = function() {
      scopeObj.getAllGroups();
    };

    this.view.btnAddGroupCancel.onClick = function() {
      scopeObj.getAllGroups();
    };

    this.view.backToRolesList.btnBack.onClick = function(){
      scopeObj.toggleEditRoles(false);
    };

    this.view.commonButtonsRoles.btnCancel.onClick = function(){
      scopeObj.toggleEditRoles(false);
    };

    this.view.commonButtonsRoles.btnSave.onClick = function(){
      scopeObj.updateDefaultRole();
    };

    this.view.flxOptions1.onClick = function(){
      scopeObj.view.contextualMenu1.setVisibility(!scopeObj.view.contextualMenu1.isVisible);
        
    };

    this.view.contextualMenu1.onHover = this.onDropdownHoverCallback;

    this.view.contextualMenu1.flxOption4.onClick = function(){
      scopeObj.showGroupDeactive();
    };

    this.view.contextualMenu1.flxOption3.onClick = function() {
      scopeObj.showGroupDelete();
    };

    this.view.flxViewTab1.onClick = function(){
      scopeObj.showFeaturesAndActions();
    };

    this.view.flxViewTab2.onClick = function(){
      scopeObj.viewLimits();
    };

    this.view.flxViewTab3.onClick = function(){
      scopeObj.setDefaultRoleSelected();
      scopeObj.showAssociatedRoles(scopeObj.actionConfig.view);
    };

    this.view.btnChangeDefaultRole.onClick = function(){
      scopeObj.toggleEditRoles(true);
    };

    this.view.flxCloseLimits.onClick = function(){
      scopeObj.view.flxViewLimitsPopup.setVisibility(false);
    };

    this.view.associatedRoles.btnChangeDefaultRole.onClick = function(){
      scopeObj.view.associatedRoles.toggleEditRoles(true);
    };

    this.view.associatedRoles.backToRolesList.btnBack.onClick = function(){  
      if(scopeObj.selectedDefaultIndex!=scopeObj.selectedRoleIndex){
        scopeObj.createRequestParam.defaultRole = scopeObj.view.associatedRoles.segAssociatedRoles.data[scopeObj.selectedDefaultIndex].id;
        scopeObj.view.associatedRoles.segAssociatedRoles.data[scopeObj.selectedDefaultIndex].flxDefaultRoleButton.isVisible=true;
        scopeObj.view.associatedRoles.segAssociatedRoles.data[scopeObj.selectedRoleIndex].flxDefaultRoleButton.isVisible=false;
      }
      scopeObj.view.associatedRoles.toggleEditRoles(false);
    };

    this.view.associatedRoles.commonButtonsRoles.btnCancel.onClick = function(){
      scopeObj.getAllGroups();
    };

    this.view.associatedRoles.tbxSearchBox.onkeyup = function() {
      scopeObj.searchInRoleSegment();
    };

    this.view.txtGroupDescription.onEndEditing = function() {
      if (scopeObj.view.lblGroupDescriptionCount.isVisible === true) {
        scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
      }
    };
    const groupDesc = function() {
      scopeObj.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
      scopeObj.view.flxNoGroupDescriptionError.setVisibility(false);
      scopeObj.createRequestParam.description = scopeObj.view.txtGroupDescription.text;
      if (scopeObj.view.txtGroupDescription.text.trim().length === 0) {
        scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
      } else {
        scopeObj.view.lblGroupDescriptionCount.setVisibility(true);
        scopeObj.view.lblGroupDescriptionCount.text = scopeObj.view.txtGroupDescription.text.trim().length + "/150";
      }
      scopeObj.view.forceLayout();
    };
    const debounce = function(func, delay) {
      var self = this;
      let timer;
      return function() {
        let context = self,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          func.apply(context, args);
        }, delay);
      };
    };
    const groupDescKeyUp = debounce(groupDesc, 200);
    this.view.txtGroupDescription.onKeyUp = function() {
      groupDescKeyUp();
    };
    const groupName = function() {
      scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
      scopeObj.view.flxNoGroupNameError.setVisibility(false);
      scopeObj.createRequestParam.name = scopeObj.view.tbxGroupNameValue.text;
      if (scopeObj.view.tbxGroupNameValue.text.trim().length === 0) {
        scopeObj.view.lblGroupNameCount.setVisibility(false);
      } else {
        scopeObj.view.lblGroupNameCount.setVisibility(true);
        scopeObj.view.lblGroupNameCount.text = scopeObj.view.tbxGroupNameValue.text.trim().length + "/50";
      }
      scopeObj.view.forceLayout();
    };
    const groupNameKeyUp = debounce(groupName, 200);
    this.view.tbxGroupNameValue.onKeyUp = function() {
      groupNameKeyUp();
    };
    this.view.tbxGroupNameValue.onEndEditing = function() {
      if (scopeObj.view.lblGroupNameCount.isVisible === true) {
        scopeObj.view.lblGroupNameCount.setVisibility(false);
      }
    };
    this.view.listingSegmentClient.contextualMenu.flxOption3.onClick = function(){
      scopeObj.showGroupDelete();
    };
    this.view.listingSegmentClient.contextualMenu.flxOption4.onClick = function() {
      scopeObj.showGroupDeactive();
    };
    this.view.popUpConfirm.flxPopUpClose.onClick = function(){
      scopeObj.view.flxConfirmGroup.setVisibility(false);
    };
    this.view.popUpConfirm.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxConfirmGroup.setVisibility(false);
    };
    this.view.popUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.popUp.flxPopUpClose.onClick = function(){
      scopeObj.view.flxErrorPopup.setVisibility(false);
    };
    this.view.flxGroupName.onClick = function () {
      var data = scopeObj.sortBy.column("name");
      scopeObj.loadPageData();
      scopeObj.resetSortImages("grouplist");
    };
    this.view.flxContracts.onClick = function () {
      var data = scopeObj.sortBy.column("numberOfContracts");
      scopeObj.loadPageData();
      scopeObj.resetSortImages("grouplist");
    };
    this.view.flxGroupFeatures.onClick = function () {
      var data = scopeObj.sortBy.column("numberOfFeatures");
      scopeObj.loadPageData();
      scopeObj.resetSortImages("grouplist");
    };
    this.view.flxRoles.onClick = function () {
      var data = scopeObj.sortBy.column("numberOfRoles");
      scopeObj.loadPageData();
      scopeObj.resetSortImages("grouplist");
    };
    this.view.flxGroupType.onClick = function(){
      if(scopeObj.view.flxTypeFilter.isVisible){
        scopeObj.view.flxTypeFilter.setVisibility(false);
      }else{
        scopeObj.view.flxTypeFilter.onHover = scopeObj.onDropdownHoverCallback;
        scopeObj.view.flxTypeFilter.setVisibility(true);
      }
      if(scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible){
        scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      }
      scopeObj.view.flxStatusFilter.setVisibility(false);
      scopeObj.view.flxBusinessTypeFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxGroupHeader.frame.width - scopeObj.view.flxGroupType.frame.x - scopeObj.view.flxGroupType.frame.width;
      var iconRight = scopeObj.view.flxGroupType.frame.width - scopeObj.view.fontIconFilterGrpType.frame.x;
      scopeObj.view.flxTypeFilter.right = (flxRight + iconRight - 8) +"px";
    };
    this.view.flxGroupHeaderStatus.onClick = function(){
      if(scopeObj.view.flxStatusFilter.isVisible){
        scopeObj.view.flxStatusFilter.setVisibility(false);
      }else{
        scopeObj.view.flxStatusFilter.onHover = scopeObj.onDropdownHoverCallback;
        scopeObj.view.flxStatusFilter.setVisibility(true);
      }
      if(scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible){
        scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      }
      scopeObj.view.flxTypeFilter.setVisibility(false);
      scopeObj.view.flxBusinessTypeFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxGroupHeader.frame.width - scopeObj.view.flxGroupHeaderStatus.frame.x - scopeObj.view.flxGroupHeaderStatus.frame.width;
      var iconRight = scopeObj.view.flxGroupHeaderStatus.frame.width - scopeObj.view.fontIconGroupStatusFilter.frame.x;
      scopeObj.view.flxStatusFilter.right = (flxRight + iconRight - 10) +"px";
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      var data = scopeObj.filterBasedOnTypeStatus();
      scopeObj.showGroupList(data.sort(scopeObj.sortBy.sortData));
      scopeObj.view.flxGroupHeader.setVisibility(true);
      scopeObj.view.flxGroupSeparator.setVisibility(true);
      scopeObj.view.subHeader.flxSearchContainer.setVisibility(data.length > 0);
      scopeObj.view.forceLayout();
    };
    this.view.subHeader.tbxSearchBox.onDone = function(){
      scopeObj.delayedSearch(); 
      var searchText = scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.subHeader.tbxSearchBox.text);
      if(searchText === ""){
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      }else{
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
        scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      }
      if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices === null ||
         scopeObj.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices === null){
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        scopeObj.view.flxGroupHeader.setVisibility(true);
        scopeObj.view.flxGroupSeparator.setVisibility(true);
        scopeObj.view.listingSegmentClient.segListing.setData([]);
        scopeObj.view.forceLayout();
      }
    };
    this.view.subHeader.flxClearSearchImage.onClick = function(){
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";    
      scopeObj.loadPageData();
	    scopeObj.view.forceLayout();
      /*if(scopeObj.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices === null &&
         scopeObj.view.typeFilterMenu.segStatusFilterDropdown.selectedIndices === null && scopeObj.view.BusinessTypeFilterMenu.segStatusFilterDropdown.selectedIndices === null){
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        scopeObj.view.flxGroupHeader.setVisibility(true);
        scopeObj.view.flxGroupSeparator.setVisibility(true);
        scopeObj.view.listingSegmentClient.segListing.setData([]);
        scopeObj.view.forceLayout();
      }*/
    };
    this.view.featureAndActions.subHeader.flxClearSearchImage.onClick = function(){
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
      scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.featureAndActions.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";    
      scopeObj.loadFeatureData();
    };
    this.view.flxClearSearchImage.onClick = function(){
      scopeObj.view.tbxSearchBox.text = "";
      scopeObj.searchAdvanceSelection();
    };
    this.view.typeFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      scopeObj.view.statusFilterMenu.segStatusFilterDropdown.onRowClick();
    };
    this.view.btnAddGroupNext.onClick = function(){
      var isValid = scopeObj.checkGroupDetailsValidation();
      if (isValid) {
        if(scopeObj.createRequestParam.featureactions.length === 0){
          scopeObj.showfeaturesPage();
          scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
        }
        else{
          scopeObj.hideAllGroups();
          scopeObj.setLeftMenu(scopeObj.view.verticalTabs.btnOption2, scopeObj.view.verticalTabs.flxImgArrow2);
          if(scopeObj.isFeatureSelectionPage === true){
            scopeObj.view.btnAddpermissions.onClick();
          }
          else
            scopeObj.view.featureAndActions.btnSave.onClick();
        }
      }
    };
    this.view.verticalTabs.btnOption3.onClick = function() {
      var isValid = scopeObj.checkGroupDetailsValidation();
      if (isValid && scopeObj.createRequestParam.featureactions.length >0 ) {
        scopeObj.hideAllGroups();
        scopeObj.showAssignLimits();
      }
    };
    this.view.verticalTabs.btnOption5.onClick = function() {
      var isValid = scopeObj.checkGroupDetailsValidation();
      if (isValid && scopeObj.createRequestParam.featureactions.length >0) {
        if(scopeObj.validateLimits())
          scopeObj.showAssignRolesPage();
      }
    };

    this.view.verticalTabs.btnOption4.onClick = function() {
      scopeObj.view.verticalTabs.btnOption5.onClick();
    };

    this.view.btnAddpermissions.onClick = function(){
      scopeObj.hideAllGroups();
      scopeObj.isFeatureSelectionPage = true;
      scopeObj.view.flxFeatureComponent.setVisibility(true);
      scopeObj.view.featureAndActions.flxReview.setVisibility(false);
      scopeObj.view.featureAndActions.flxFeatures.setVisibility(true);
      scopeObj.view.featureAndActions.lblSelEntity.text = "("+scopeObj.view.lblSelectedRowsServTypeServDetails.text +")";
      scopeObj.view.featureAndActions.lblSelect.text = "Select All";
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
      scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.configurations.searchByServiceDefinition");
      scopeObj.view.featureAndActions.imgFeatureCheckbox.src = "checkboxnormal.png";
      scopeObj.view.featureAndActions.flxAssignActions.setVisibility(false);
      scopeObj.setFeaturesPageSegment();
      var data = scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
      scopeObj.view.featureAndActions.segFeatures.setData(data);
      scopeObj.featuresegData=scopeObj.view.featureAndActions.segFeatures.data;
    };

    this.view.featureAndActions.flxAssignActions.onClick = function (){    
      var data =scopeObj.view.featureAndActions.segDropdown.data;
      scopeObj.clearSelection(data);
      if (scopeObj.view.featureAndActions.flxDropDown.isVisible === true) 
      {
        scopeObj.view.featureAndActions.lblIconDownArrow.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.fontIconBreadcrumbsDown");   
        scopeObj.view.featureAndActions.flxDropDown.setVisibility(false);
      }

      else 
      {
        scopeObj.view.featureAndActions.flxDropDown.setVisibility(true);   
        scopeObj.view.featureAndActions.lblIconDownArrow.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.fontIconUpArrow");
      }

    };
    this.view.featureAndActions.btnSave.onClick = function(){
      var data=scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
      //scopeObj.view.featureAndActions.commonButtons.btnNext.isVisible = false;
      scopeObj.showReviewPage(data);
      scopeObj.createRequest();
      scopeObj.isFeatureSelectionPage = false;
    };
    this.view.verticalTabs.btnOption1.onClick = function(){
      var isValid = true;
      if( scopeObj.createRequestParam.featureactions.length > 0){
        if(!scopeObj.validateLimits())
          isValid = false;
      }
      if(isValid){
        scopeObj.hideAllGroups();
        scopeObj.view.flxGroupDetails.setVisibility(true);
        scopeObj.setLeftMenu(scopeObj.view.verticalTabs.btnOption1, scopeObj.view.verticalTabs.flxImgArrow1);
      }
    };
    this.view.verticalTabs.btnOption2.onClick = function(){
      var isValid = scopeObj.checkGroupDetailsValidation();
      if(scopeObj.createRequestParam.featureactions.length > 0)
        isValid = isValid && scopeObj.validateLimits();
      if (isValid) {
        if(scopeObj.createRequestParam.featureactions.length === 0){
          scopeObj.showfeaturesPage();
          scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
        }
        else{
          scopeObj.hideAllGroups();
          scopeObj.setLeftMenu(scopeObj.view.verticalTabs.btnOption2, scopeObj.view.verticalTabs.flxImgArrow2);
          if(scopeObj.isFeatureSelectionPage === true){
            scopeObj.view.btnAddpermissions.onClick();
          }
          else
            scopeObj.view.featureAndActions.btnSave.onClick();
        }
      }
    };

    this.view.featureAndActions.btnAdvancedSelection.onClick = function() {
      scopeObj.showAdvanceSelectionUI();
    };
    this.view.featureAndActions.btnAddPermission.onClick = function() {
      scopeObj.isFeatureSelectionPage = true;
      var widget =scopeObj.view.featureAndActions.segFeatures;
      scopeObj.view.featureAndActions.flxReview.setVisibility(false);
      scopeObj.view.featureAndActions.flxFeatures.setVisibility(true);
      scopeObj.view.featureAndActions.flxFeatures.flxHeader.flxHeading.lblSelEntity.text = "("+scopeObj.view.lblSelectedRowsServTypeServDetails.text+")";
      scopeObj.setFeaturesPageSegment();
      var data=scopeObj.setFeatureData(widget, scopeObj.isFeaturedataset);
      widget.setData(data);
      scopeObj.featuresegData=scopeObj.view.featureAndActions.segFeatures.data;
      scopeObj.view.featureAndActions.lblSelect.text = scopeObj.view.featureAndActions.segReview.data.length +" Selected";
    };
    this.view.featureAndActions.commonButtons.btnNext.onClick = function() {
      scopeObj.hideAllGroups();
      scopeObj.showAssignLimits();
    };

    this.view.featureAndActions.commonButtons.btnSave.onClick = function(){
      if(scopeObj.groupsCurrAction === scopeObj.groupActionConfig.CREATE)
        scopeObj.createServiceDefinition();
      else
        scopeObj.updateServiceDefinition();
    };

    this.view.featureAndActions.subHeader.tbxSearchBox.onDone = function() {
      if(scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text.length >=3 ){
        if(!scopeObj.containSpecialChars(scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text)){
          scopeObj.loadFeatureData();
        }
        if (scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text === "") {
          scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
        } else {
          scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(true);
          scopeObj.view.featureAndActions.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        }
      }
    };
    this.view.featureAndActions.btnApply.onClick = function(){
      var segPolicyData = scopeObj.getSelectedData(scopeObj.view.featureAndActions.segDropdown);
      var featureData = scopeObj.getSelectedData(scopeObj.view.featureAndActions.segFeatures);
      if (scopeObj.view.featureAndActions.imgFeatureCheckbox.src === "checkboxselected.png") {
        scopeObj.view.featureAndActions.lblSelect.text = "Select All";
      } else {
        scopeObj.view.featureAndActions.lblSelect.text = featureData.length + " Selected";
      }
      if(segPolicyData.length > 0 && featureData.length >0){
        scopeObj.setFeatureactionMapping();
        var data=scopeObj.setFeatureData(scopeObj.view.featureAndActions.segFeatures, scopeObj.isFeaturedataset);
        scopeObj.view.featureAndActions.segFeatures.setData(data);
        scopeObj.featuresegData=scopeObj.view.featureAndActions.segFeatures.data;

      }
      if(segPolicyData.length == 0)
        scopeObj.selectAllSegmentData(scopeObj.view.featureAndActions.imgFeatureCheckbox,scopeObj.view.featureAndActions.segFeatures);
      scopeObj.view.featureAndActions.flxDropDown.setVisibility(false);
      scopeObj.view.featureAndActions.lblIconDownArrow.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.fontIconBreadcrumbsDown");
      //scopeObj.view.featureAndActions.imgFeatureCheckbox.src = "checkboxnormal.png";
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.text = "";
      scopeObj.view.featureAndActions.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.featureAndActions.subHeader.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.configurations.searchByServiceDefinition");
      scopeObj.view.featureAndActions.flxAssignActions.setVisibility(false);
    };

    this.view.switchStatus.onSlide = function(){
      scopeObj.createRequestParam.status = scopeObj.view.switchStatus.selectedIndex === 0 ?
        scopeObj.AdminConsoleCommonUtils.constantConfig.ACTIVE : scopeObj.AdminConsoleCommonUtils.constantConfig.INACTIVE;
    };

    this.view.lstBoxType.onSelection = function(){
      scopeObj.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
      scopeObj.view.flxTypeError.setVisibility(false);
      scopeObj.createRequestParam.serviceType = scopeObj.view.lstBoxType.selectedKey;
      let payload = {
        "roleTypeId": scopeObj.createRequestParam.serviceType,
        "legalEntityId": scopeObj.createRequestParam.legalEntityId
    };
       if(scopeObj.createRequestParam.serviceType !="select"){
      if (scopeObj.prevKey=== null){
        scopeObj.prevKey= scopeObj.createRequestParam.serviceType;
        scopeObj.filterGroupBasedOnType(scopeObj.prevKey);
        scopeObj.presenter.fetchAllFeaturesAndActions(payload);
      }else{
        if(scopeObj.prevKey!== scopeObj.createRequestParam.serviceType || scopeObj.prevLegalEntity!== scopeObj.createRequestParam.legalEntityId){
          scopeObj.view.segAdvanceSelFeatures.setData([]);
          if(scopeObj.view.flxScrollAssignLimits.children.length > 0)
            scopeObj.view.flxScrollAssignLimits.removeAll();
          scopeObj.createRequestParam.featureactions=[];
          scopeObj.filterGroupBasedOnType(scopeObj.createRequestParam.serviceType);
          scopeObj.presenter.fetchAllFeaturesAndActions(payload);
        }
        scopeObj.prevKey=scopeObj.createRequestParam.serviceType;
        scopeObj.prevLegalEntity =  scopeObj.createRequestParam.legalEntityId;
      }
       }
    };
    this.view.associatedRoles.btnUpdate.onClick = function(){
      scopeObj.updateServiceDefinition();
    };
    this.view.associatedRoles.commonButtonsRoles.btnSave.onClick = function() {
      scopeObj.view.associatedRoles.toggleEditRoles(false);
    };
    this.view.associatedRoles.btnAdd.onClick = function() {
      scopeObj.createServiceDefinition();
    };
  },
  createServiceDefinition: function(){
    var scopeObj=this;
    scopeObj.createRequestParam.featureactions= JSON.stringify(scopeObj.createRequestParam.featureactions);
    scopeObj.presenter.createServiceDefinition(scopeObj.createRequestParam);
  },
  updateServiceDefinition:function(){
    var scopeObj=this;
    var newFeaturActions = scopeObj.getNewlyAddedFeaturesOnEdit();
    //appending newly added features,actions array to edit payload
    scopeObj.createRequestParam["addedFeatures"] = newFeaturActions.addedFeatures;
    scopeObj.createRequestParam["addedActions"] = newFeaturActions.addedActions;
    var actionsArr = scopeObj.createRequestParam.featureactions;
    //add 'isNewAction' key to newly added feature/actions
    for(var  i=0; i<actionsArr.length; i++){
      if(newFeaturActions.addedActions.includes(actionsArr[i].id)){
        actionsArr[i]["isNewAction"] = true;
      }
    }
    scopeObj.createRequestParam.featureactions= JSON.stringify(actionsArr);
    scopeObj.presenter.editServiceDefinition(scopeObj.createRequestParam);
  },

  fillFeatureActionMapForEdit:function(){
    var scopeObj=this;
    for (var i=0;i< scopeObj.serviceFeatures.length ;i++){
      var ind = scopeObj.getFeatureIndex(scopeObj.serviceFeatures[i].name);
      for (var j=0 ;j<scopeObj.accessPolicies.length;j++){
        var actual=0;
        var selected=0;

        for(var k=0;k<scopeObj.features[ind].actions.length;k++)
          if(scopeObj.features[ind].actions[k].accessPolicy===scopeObj.accessPolicies[j].name)
            actual++;

        for(var k=0;k<scopeObj.serviceFeatures[i].actions.length;k++)
          if(scopeObj.serviceFeatures[i].actions[k].accessPolicy===scopeObj.accessPolicies[j].name)
            selected++;

        if(selected===0)
          scopeObj.featureactionmap[ind][j]=0;
        else if(actual===selected)
          scopeObj.featureactionmap[ind][j]=1;
        else if(selected<actual)
          scopeObj.featureactionmap[ind][j]=2;
      }
    } 
  }, 

  SetIsSelectedForEdit:function(){
    var scopeObj=this;
    for (var i=0;i<scopeObj.serviceFeatures.length;i++){
      var ind = scopeObj.getFeatureIndex(scopeObj.serviceFeatures[i].name);
      for(var j=0;j<scopeObj.serviceFeatures[i].actions.length;j++){
        for(var k=0;k<scopeObj.features[ind].actions.length;k++){
          if(scopeObj.serviceFeatures[i].actions[j].id===scopeObj.features[ind].actions[k].id){
            scopeObj.features[ind].actions[k].isSelected=1;
            //get segment mapped data for curr feature actions
            var segSectionData = scopeObj.getMappedAdvSelFeatureActionData(scopeObj.features[ind]);
            scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][k], 1);
            if(scopeObj.features[ind].actions[k].type===scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY && scopeObj.serviceFeatures[i].actions[j].limits !== undefined){
              var minTransactionLimit = scopeObj.features[ind].actions[k].limits[3];
              scopeObj.features[ind].actions[k].limits=JSON.parse(JSON.stringify(scopeObj.serviceFeatures[i].actions[j].limits));
              scopeObj.features[ind].actions[k].limits[3] = minTransactionLimit;
            }
          }
        }
      }
    }
  },

  /*creates input request for featureactions */
  createRequest:function(){
    var scopeObj=this;
    var featureRequest = scopeObj.createRequestParam.featureactions
    if(featureRequest.length ===0){
      scopeObj.createRequestParam.featureactions= scopeObj.getFeatureActionIds();
      // to track the newly selected access policies in selectedFeatureAction obj
      for(var p=0; p<scopeObj.features.length; p++){
        var segSectionData = scopeObj.getMappedAdvSelFeatureActionData(scopeObj.features[p]);
        for(var q=0; q<scopeObj.features[p].actions.length; q++){
          if(scopeObj.features[p].actions[q].isSelected === 1)
            scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][q], 1);
        }
      }
    }else{
      for (var i = 0; i < scopeObj.features.length; i++) {
        //get segment mapped data for curr feature actions
        var segSectionData = scopeObj.getMappedAdvSelFeatureActionData(scopeObj.features[i]);
        for (var j = 0; j < scopeObj.features[i].actions.length; j++) {

          if(scopeObj.features[i].actions[j].isSelected === 1 && !scopeObj.containsActionId(featureRequest,scopeObj.features[i].actions[j].id)){
            scopeObj.addActionToRequest(scopeObj.features[i].actions[j]);
            scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][j], 1);
          }else if(scopeObj.features[i].actions[j].isSelected === 0 && scopeObj.containsActionId(featureRequest,scopeObj.features[i].actions[j].id)){
            scopeObj.removeActionFromRequest(scopeObj.features[i].actions[j].id);
            scopeObj.addRemoveSelectedFeatureAction(segSectionData[1][j], 0);
          }

          if(scopeObj.features[i].actions[j].isSelected===1)
            scopeObj.features[i].actions[j].retained=1;
          else
            scopeObj.features[i].actions[j].retained=0;


        }
      }
    }
  },

  /*checks if request contains the action id*/
  containsActionId:function(featureArray, actionId){
    if (featureArray.some(rec => rec.id === actionId))
      return true;
    return false;
  },

  addActionToRequest: function(action){
    var scopeObj = this;
    var obj={"id":action.id};
    if (action.type === scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY && action.limits !== undefined) 
      obj.limits = JSON.parse(JSON.stringify(action.limits.filter(function(rec) {
        if (rec.id !== "MIN_TRANSACTION_LIMIT") return rec;
      })));
    else 
      obj.limits = [];
    scopeObj.createRequestParam.featureactions.push(obj);
  },

  removeActionFromRequest:function(actionId){
    var scopeObj = this;
    scopeObj.createRequestParam.featureactions = scopeObj.createRequestParam.featureactions.filter(function(rec){
      if(rec.id !== actionId )
        return rec;
    });
  },
  filterGroupBasedOnType:function(type){
    var rolesData;
    if(this.groupsCurrAction === this.groupActionConfig.CREATE){
      rolesData = this.groupsMasterData.filter(function(rec){
        if(rec.isApplicabletoAllServices === "true" && rec.Type_id===type)
          return rec;
      });
    }
    else if(this.groupsCurrAction === this.groupActionConfig.EDIT)
      rolesData=this.groupsMasterData;
    if(rolesData.length>0){
      if(this.groupsCurrAction === this.groupActionConfig.EDIT){
        this.view.verticalTabs.flxOption4.setVisibility(true);
        this.view.verticalTabs.flxOption5.setVisibility(false);          
      }
      else if(this.groupsCurrAction === this.groupActionConfig.CREATE){
        this.view.verticalTabs.flxOption5.setVisibility(false);
        this.view.verticalTabs.flxOption4.setVisibility(true);
      }
      this.view.featureAndActions.commonButtons.btnSave.setVisibility(false);
      this.view.btnNext.setVisibility(true);
      this.view.btnAdd.setVisibility(false);
      this.view.btnUpdate.setVisibility(false);
      this.view.featureAndActions.commonButtons.btnNext.left = "220px";
      this.enableBtn(this.view.featureAndActions.commonButtons.btnNext);
      this.view.featureAndActions.commonButtons.btnNext.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.featureAndActions.commonButtons.btnNext.focusSkin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.featureAndActions.commonButtons.btnNext.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px";
      this.setAssignRolesPageData(rolesData);
    }
    else {
      this.view.verticalTabs.flxOption4.setVisibility(false);
      this.view.verticalTabs.flxOption5.setVisibility(false);
      if(this.groupsCurrAction === this.groupActionConfig.CREATE){
        this.view.featureAndActions.commonButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.AddServiceDef.AddServiceDefinition");
        this.view.featureAndActions.commonButtons.btnSave.width="200px";
        this.view.btnNext.setVisibility(false);
        this.view.btnUpdate.setVisibility(false);
        this.view.btnAdd.setVisibility(true);
      }
      if(this.groupsCurrAction === this.groupActionConfig.EDIT){
        this.view.featureAndActions.commonButtons.btnSave.text=kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");
        this.view.featureAndActions.commonButtons.btnSave.width="100px";
        this.view.btnNext.setVisibility(false);
        this.view.btnAdd.setVisibility(false);
        this.view.btnUpdate.setVisibility(true);
      }
      this.view.featureAndActions.commonButtons.btnSave.setVisibility(true);
      this.view.featureAndActions.commonButtons.btnNext.left = "0px";
      this.view.featureAndActions.commonButtons.btnNext.skin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
      this.view.featureAndActions.commonButtons.btnNext.focusSkin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
      this.view.featureAndActions.commonButtons.btnNext.hoverSkin = "sknBtn2D5982LatoRegular13pxFFFFFFRad20px";       
    }
  },
  /*
  * fetches all the action ids which are selected
  * @returns: all selected actions arr
  */
  getFeatureActionIds:function(){
    var scopeObj=this;
    var actions=[];
    var action_id;
    for(var i=0;i<scopeObj.features.length;i++){
      for(var j=0;j<scopeObj.features[i].actions.length;j++){
        action_id ={};
        if(scopeObj.features[i].actions[j].isSelected===1){
          action_id = {"id":scopeObj.features[i].actions[j].id};
          if(scopeObj.features[i].actions[j].type===scopeObj.AdminConsoleCommonUtils.constantConfig.MONETARY && scopeObj.features[i].actions[j].limits !== undefined)
            action_id.limits = JSON.parse(JSON.stringify(scopeObj.features[i].actions[j].limits.filter(function(rec){
              if(rec.id !== "MIN_TRANSACTION_LIMIT") return rec;
            })));
          else 
            action_id.limits = [];
          actions.push(action_id);
          scopeObj.features[i].actions[j].retained=1;
        }else {
          scopeObj.features[i].actions[j].retained=0;
        }
      }
    }
    return actions;
  },

  loadFeatureData : function (){
    var list = this.featuresegData.filter(this.featureSearch);
    if(list.length>0){
      this.view.featureAndActions.segFeatures.setVisibility(true);
      this.view.featureAndActions.segFeatures.setData(list);
    }else{
      this.view.featureAndActions.segFeatures.setVisibility(false);	
    }
  },
  showRemovePopup :function(){
    var scopeObj=this;
    scopeObj.view.popUpConfirm.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.serviceDefinition.RemoveFeature");
    scopeObj.view.popUpConfirm.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.Disclaimer");
    scopeObj.view.popUpConfirm.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.popUpConfirm.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.serviceDefinition.REMOVE");
    scopeObj.view.flxConfirmGroup.setVisibility(true);
    scopeObj.view.popUpConfirm.btnPopUpDelete.onClick=function(){
      scopeObj.view.flxConfirmGroup.setVisibility(false);
      scopeObj.removeFeature();
    }
  },
  showResetAllLimitsPopup: function() {
    var scopeObj = this;
    scopeObj.view.popUpCancelEdits.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.ResetLimits");
    scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.common.Disclaimer");
    scopeObj.view.popUpCancelEdits.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmCustomers.CANCEL");
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.common.RESET");
    this.view.popUpCancelEdits.btnPopUpCancel.right = "170dp";
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.width = "116dp";
    scopeObj.view.popUpCancelEdits.rtxPopUpDisclaimer.width = "80%";
    scopeObj.view.flxEditCancelConfirmation.setVisibility(true);
    scopeObj.view.popUpCancelEdits.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxEditCancelConfirmation.setVisibility(false);
      scopeObj.resetAllLimits();
    }
    scopeObj.view.forceLayout();
  },
  removeFeature:function(){
    var scopeObj=this;
    var selIndex=scopeObj.view.featureAndActions.segReview.selectedIndex;
    var rowdata=scopeObj.view.featureAndActions.segReview.data[selIndex[1]];
    var ind=0;
    for(var i=0;i<scopeObj.features.length;i++){
      if(scopeObj.features[i].name === rowdata.lblFeatureName)
        ind=i;
    }			
    var len = scopeObj.featureactionmap[ind].length;
    for (var i=0;i<len;i++){
      scopeObj.featureactionmap[ind][i] = 0;
      scopeObj.setIsSelectedForActions(ind,null,0,true);
    }

    var data=scopeObj.setFeatureData(scopeObj.view.featureAndActions.segReview, scopeObj.isReviewDataset);
    scopeObj.view.featureAndActions.segReview.setData(data);
    scopeObj.createRequest();

    if(scopeObj.isFeatureActionMapEmpty() ===1)
      scopeObj.showfeaturesPage();
  },

  getGroupSetData: function() {
    var self = this;
    var index = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var rowIndex = index[1];
    var rowData = self.view.listingSegmentClient.segListing.data[rowIndex];
    self.editRequestParam = {
      "Name": rowData.lblGroupName.text,
      "Description": rowData.lblDescriptionValue.text,
      "Status_id": rowData.Status_id,
      "serviceType": rowData.serviceType,
      "Id":rowData.id,
      "defaultRole":rowData.defaultRole,
      "noOfContracts":rowData.lblContracts.text
    };
    var data = {
      "Name": self.editRequestParam.Name,
      "Description": self.editRequestParam.Description,
      "Status": self.editRequestParam.Status_id,
      "serviceType": self.editRequestParam.serviceType,
      "Id": self.editRequestParam.Id,
      "defaultRole":self.editRequestParam.defaultRole,
      "noOfContracts":self.editRequestParam.noOfContracts
    };
    return data;
  },

  onEditServiceClick: function() {
    var scopeObj = this;
    scopeObj.isFeatureSelectionPage = false;
    scopeObj.presenter.showLoadingScreen();
    scopeObj.editRequestParam = null;
    scopeObj.groupsCurrAction = scopeObj.groupActionConfig.EDIT;
    scopeObj.view.lblSelectedRowsServTypeServDetails.text = scopeObj.view.lblSelectedRowsServType.text;
	  scopeObj.view.flxDropDownServTypServDetails.setEnabled(false);
    scopeObj.view.flxDropDownServTypServDetails.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    var groupData = scopeObj.getGroupSetData();
    var request={"id":groupData.Id,"type":groupData.serviceType,"entityId": this.selectedLegalEntity};
    scopeObj.featureactionmap=[];
    scopeObj.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
    scopeObj.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
    scopeObj.view.flxNoGroupNameError.setVisibility(false);
    scopeObj.view.flxNoGroupDescriptionError.setVisibility(false);
    scopeObj.view.lblGroupDescriptionCount.setVisibility(false);
    scopeObj.view.lblGroupNameCount.setVisibility(false);
    scopeObj.view.segAdvanceSelFeatures.setData([]);
    scopeObj.showAddGroupDetails();
    scopeObj.fillDataForEdit(groupData);
    if(groupData.noOfContracts==="0"){
      scopeObj.view.switchStatus.setEnabled(true);
    }else {
      scopeObj.view.switchStatus.setEnabled(false);
    }
    scopeObj.createRequestParam = {
      "id":groupData.Id,
      "name": groupData.Name,
      "serviceType":groupData.serviceType,
      "description": groupData.Description,
      "status": groupData.Status,
      "featureactions": [],
      "defaultRole":groupData.defaultRole,
      "legalEntityId":this.selectedLegalEntity
    };
    scopeObj.presenter.fetchFeaturesForEdit(request);
  },

  fillDataForEdit: function(data) {
    var self = this;
    var statusVal = 0;
    self.view.flxBreadCrumbs.setVisibility(true);
    self.view.breadcrumbs.lblCurrentScreen.setVisibility(true);
    self.view.breadcrumbs.lblCurrentScreen.text = (data.Name).toUpperCase();
    self.view.tbxGroupNameValue.text = data.Name;
    self.view.txtGroupDescription.text = data.Description;
    self.view.lblGroupDescriptionCount.text = self.view.txtGroupDescription.text.length + "/250";
    self.view.lblGroupNameCount.text = self.view.tbxGroupNameValue.text.length + "/50";
    self.view.lstBoxType.selectedKey = data.serviceType;
    statusVal = data.Status;
    if (statusVal === 0 || statusVal === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) {
      self.view.switchStatus.selectedIndex = 0;
    } else {
      self.view.switchStatus.selectedIndex = 1;
    }
  },

  clearSelection: function(data){
    var scopeObj=this;
    data = data.map(function(rec){
      rec.imgCheckBox.src="checkboxnormal.png";
      return rec;
    });
    scopeObj.view.featureAndActions.imgCheckBox.src="checkboxnormal.png";
    scopeObj.view.featureAndActions.segDropdown.setData(data);
  },

  /*this sets featureactionmap */
  setFeatureactionMapping:function(){
    var scopeObj=this;
    var policydata = scopeObj.view.featureAndActions.segDropdown.data;
    var featuredata = scopeObj.view.featureAndActions.segFeatures.data;
    var arr ;
    var ind;
    for ( var i = 0 ;i<featuredata.length;i++){
      ind = scopeObj.getindexForFeature(featuredata[i].lblFeatureName);
      if(ind !== -1){
        if(featuredata[i].template==="flxFeaturesList"){
          arr =[];
          var tempPolicy=[];
          for(var k=0;k<scopeObj.features[i].actions.length;k++){
            for (var l=0;l<policydata.length;l++){
              if(tempPolicy[l]===undefined)
                tempPolicy[l]=0;
              if(scopeObj.features[i].actions[k].accessPolicy===policydata[l].lblDescription)
                tempPolicy[l]++;
            }
          }

          for (var j=0;j<policydata.length;j++){
            var temp=[];
            if (featuredata[i].imgCheckBox.src==="checkboxselected.png" && policydata[j].imgCheckBox.src==="checkboxselected.png"  && scopeObj.isActionApplicable(ind,policydata[j].lblDescription)){               
              arr[j]=1
              temp=scopeObj.setIsSelectedForActions(ind,policydata[j].lblDescription,1,false);  
              for(var k=0;k<temp.length;k++){
                var count=0;
                var totalCount;
                for (var l=0;l<scopeObj.features[i].actions.length;l++){
                  if(scopeObj.features[i].actions[l].isSelected===1 && scopeObj.features[i].actions[l].accessPolicy===temp[k]){
                    count++;
                  }
                }
                for (var l=0;l<policydata.length;l++){
                  if(policydata[l].lblDescription===temp[k]){
                    totalCount=tempPolicy[l];
                    if(count===totalCount)
                      arr[l]=1;
                    else
                      arr[l]=2;
                    break;
                  }
                }     
              }
            }else if(arr[j]===undefined)
              arr[j]=0
          }
        }else{
          arr =this.featureactionmap[ind];
          var tempPolicy=[];
          for(var k=0;k<scopeObj.features[i].actions.length;k++){
            for (var l=0;l<policydata.length;l++){
              if(tempPolicy[l]===undefined)
                tempPolicy[l]=0;
              if(scopeObj.features[i].actions[k].accessPolicy===policydata[l].lblDescription)
                tempPolicy[l]++;
            }
          }
          for (var j=0;j<policydata.length;j++){
            if (featuredata[i].imgCheckBox.src==="checkboxselected.png" && policydata[j].imgCheckBox.src==="checkboxselected.png"  && scopeObj.isActionApplicable(ind,policydata[j].lblDescription)){
              arr[j]=1
              temp=scopeObj.setIsSelectedForActions(ind,policydata[j].lblDescription,1,false);  
              for(var k=0;k<temp.length;k++){
                var count=0;
                var totalCount;
                for (var l=0;l<scopeObj.features[i].actions.length;l++){
                  if(scopeObj.features[i].actions[l].isSelected===1 && scopeObj.features[i].actions[l].accessPolicy===temp[k]){
                    count++;
                  }
                }
                for (var l=0;l<policydata.length;l++){
                  if(policydata[l].lblDescription===temp[k]){
                    totalCount=tempPolicy[l];
                    if(count===totalCount)
                      arr[l]=1;
                    else
                      arr[l]=2;
                    break;
                  }
                }     
              }
            }
          }
        }
        this.featureactionmap[ind]=arr;
      }
    }
  },

  getindexForFeature:function(featureName){
    var scopeObj = this;
    for(var i=0;i<scopeObj.features.length;i++){
      if(scopeObj.features[i].name === featureName)
        return i;
    }
    return -1;
  },

  isActionApplicable: function(index,policyName){
    var scopeObj = this;
    for(var i=0;i<scopeObj.features[index].actions.length;i++){
      if(scopeObj.features[index].actions[i].accessPolicy===policyName)
        return true;
    }
    return false;

  },

  setIsSelectedForActions:function(featureIndex,policyName,val,entirefeature){
    var scopeObj=this;
    if(!entirefeature){
      var dependentPolicies=[];
      for (var i = 0; i < scopeObj.features[featureIndex].actions.length; i++) {
        if (scopeObj.features[featureIndex].actions[i].accessPolicy === policyName) {
          scopeObj.features[featureIndex].actions[i].isSelected = val;
          if(val===1){
            for(var j=0;j<scopeObj.features[featureIndex].actions[i].dependentActions.length;j++){
              for (var k = 0; k < scopeObj.features[featureIndex].actions.length; k++) {
                if(scopeObj.features[featureIndex].actions[i].dependentActions[j].id===scopeObj.features[featureIndex].actions[k].id){
                  if(!dependentPolicies.contains(scopeObj.features[featureIndex].actions[k].accessPolicy))
                    dependentPolicies.push(scopeObj.features[featureIndex].actions[k].accessPolicy);
                  scopeObj.features[featureIndex].actions[k].isSelected = val;
                }
              }
            }
          }
          else if(val===0){
            for (var k = 0; k < scopeObj.features[featureIndex].actions.length; k++) {
              for(var j=0;j<scopeObj.features[featureIndex].actions[k].dependentActions.length;j++){
                if(scopeObj.features[featureIndex].actions[k].dependentActions[j].id===scopeObj.features[featureIndex].actions[i].id){
                  if(!dependentPolicies.contains(scopeObj.features[featureIndex].actions[k].accessPolicy))
                    dependentPolicies.push(scopeObj.features[featureIndex].actions[k].accessPolicy);
                  scopeObj.features[featureIndex].actions[k].isSelected = val;
                }
              }
            }
          }
        }
      }
      return dependentPolicies;
    }else {
      for (var i = 0; i < scopeObj.features[featureIndex].actions.length; i++) {
        scopeObj.features[featureIndex].actions[i].isSelected = val;
      }	
    }
  },


  isFeatureActionMapEmpty:function(){
    var scopeObj=this;
    if(this.featureactionmap.length === 0)
      return 1;
    for (var i = 0; i < this.featureactionmap.length; i++) {      
      for (var j = 0; j < this.accessPolicies.length ; j++) 
        if(this.featureactionmap[i][j]===1 || this.featureactionmap[i][j]===2)
          return 0;
    }
    return 1;
  },
  /*
  * update the selected features selected in advance selction screen
  */
  setFeatureactionMappingForComponent:function(){
    var scopeObj = this;
    var arr = [];
    for (var i = 0; i < scopeObj.features.length; i++) {
      var featureSelected = 0;
      var advSelSegData = scopeObj.view.segAdvanceSelFeatures.data;
      for (var k = 0; k < this.featureactionmap[i].length; k++) {
        var actions = scopeObj.features[i].actions;
        var c = 0;
        var d = 0;
        for (var j = 0; j < actions.length; j++) {
          var featureActionId= scopeObj.features[i].id+"#"+actions[j].id;
          var actionData = scopeObj.selectedFeatureActionObj[featureActionId];
          if (actionData && actionData.lblFeatureName.tag === this.accessPolicies[k].name) d++;
          if (actionData && actionData.imgCheckbox.src === scopeObj.AdminConsoleCommonUtils.checkboxSelected &&
              actionData.lblFeatureName.tag === this.accessPolicies[k].name) {
            c++;
            featureSelected = 1;
            this.features[i].actions[j].isSelected = 1;
          } else if (actionData && actionData.imgCheckbox.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal){
            this.features[i].actions[j].isSelected = 0;
          } else if(actionData === undefined){
            this.features[i].actions[j].isSelected = 0;
          }
        }
        if (c === 0 || d === 0)
          scopeObj.featureactionmap[i][k] = 0; //no access policies
        else if (c === d)
          scopeObj.featureactionmap[i][k] = 1;//all access policies
        else
          scopeObj.featureactionmap[i][k] = 2;//partial
      }
      if (featureSelected === 1)
        arr.push(i);
    }
  },

  onclickofViewMore: function(selIndex, widget) {
    var scopeObj = this;
    var segdata = widget.data[selIndex];
    var flxcount = segdata.visibleflexes;
    var reviewpageVisible = (widget.id==='segReview');
    segdata.flxMain2.isVisible = (flxcount > 4) ? true : false;
    segdata.flxMain3.isVisible = (flxcount > 10) ? true : false;
    segdata.flxMain4.isVisible = (flxcount > 15) ? true : false;
    segdata.btnView1.isVisible = false;
    segdata.btnView2.isVisible = (flxcount > 4 && flxcount < 10) ? true : false;
    segdata.btnView3.isVisible = (flxcount > 10 && flxcount < 15) ? true : false;
    segdata.btnView4.isVisible = (flxcount > 15 && flxcount < 20) ? true : false;
    segdata.flxRemove2.isVisible = reviewpageVisible ? ( (flxcount > 4 && flxcount < 10) ? true : false) : false;
    segdata.flxRemove3.isVisible = reviewpageVisible ? ( (flxcount > 10 && flxcount < 15) ? true : false) : false;
    segdata.flxRemove4.isVisible = reviewpageVisible ? ( (flxcount > 15 && flxcount < 20) ? true : false) : false;
    widget.setDataAt(segdata, selIndex);
  },

  onclickofViewLess: function(selIndex,widget){
    var scopeObj=this;
    var segdata = widget.data[selIndex];
    segdata.flxMain2.isVisible= false;
    segdata.flxMain3.isVisible= false;
    segdata.flxMain4.isVisible= false;
    segdata.btnView1.isVisible=true;
    widget.setDataAt(segdata,selIndex);
  },

  setFeatureData: function(widget,flag) {
		var scopeObj = this;
    var widgetmap = this.setWidgetdataForReviewPage();
    widget.widgetDataMap = widgetmap;
    var data = [];
    var reviewpageVisible = (widget.id==='segReview');
    var widgetdata = widget.data ;
    var flxdata = [];
    for (var i = 0; i < this.features.length; i++) {
      var visibleflexes = 0;
      for (var rem = 0; rem < 20; rem++) {
        flxdata[rem] = {
          "isVisible": false
        }
      }
      if(this.featureactionmap.length >0){
        for (var j = 0; j < this.featureactionmap[i].length; j++) {
          if (this.featureactionmap[i][j] !== 0) {
            flxdata[visibleflexes] = {
              "isVisible": true,
              "text": this.accessPolicies[j].name,
              "value":this.featureactionmap[i][j]
            };
            visibleflexes++;
          }
        }
      }
      data[i] = {
        "visibleflexes": visibleflexes,
        "flxFeaturesListSelected": "flxFeaturesListSelected",
        "flxFeatureNameContainer": "flxFeatureNameContainer",
        "flxFeatureCheckbox": {
          "isVisible": reviewpageVisible === true ? false : true
        },
        "imgCheckBox": {
          "isVisible": true,
          "src": "checkboxnormal.png",
          "onClick": function() {
            scopeObj.toggleCheckBox(scopeObj.view.featureAndActions.imgFeatureCheckbox, scopeObj.view.featureAndActions.segFeatures);
          }
        },
        "flxFeatureStatus": "flxFeatureStatus",
        "flxMain1": {
          "isVisible": true
        },
        "flxMain2": {
          "isVisible":  false
        },
        "flxMain3": {
          "isVisible": false
        },
        "flxMain4": {
          "isVisible":  false
        },
        "flxRemove1": {
          "isVisible": (reviewpageVisible) ? ((visibleflexes === 1)? false :((visibleflexes <= 4) ? true : false)) : false,
          "onClick": scopeObj.showRemovePopup
        },
        "flxRemove2": {
          "isVisible": false,//(reviewpageVisible) ? ((visibleflexes === 1)? false :((visibleflexes <= 4) ? true : false)) : false,
          "onClick": scopeObj.showRemovePopup,
          "left": visibleflexes > 4 ? (visibleflexes>=6 ? "10dp" : "0dp") : "0dp",
        },
        "flxRemove3": {
          "isVisible": false,
          "onClick": scopeObj.showRemovePopup
        },
        "flxRemove4": {
          "isVisible": false,
          "onClick": scopeObj.showRemovePopup
        },
        "btnView1": {
          "isVisible": visibleflexes > 4 ? true : false,
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
              var	wid=scopeObj.view.featureAndActions.segFeatures;
            else var wid = scopeObj.view.featureAndActions.segReview;
            scopeObj.onclickofViewMore(wid.selectedIndex[1], wid);
          }
        },
        "btnView2": {
          "isVisible": false,
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
              var	wid=scopeObj.view.featureAndActions.segFeatures;
            else var wid = scopeObj.view.featureAndActions.segReview;
            scopeObj.onclickofViewLess(wid.selectedIndex[1],wid);
          }
        },
        "btnView3": {
          "isVisible": false,
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
              var	wid=scopeObj.view.featureAndActions.segFeatures;
            else var wid = scopeObj.view.featureAndActions.segReview;
            scopeObj.onclickofViewLess(wid.selectedIndex[1],wid);
          }
        },
        "btnView4": {
          "isVisible": false,
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible)
              var	wid=scopeObj.view.featureAndActions.segFeatures;
            else var wid = scopeObj.view.featureAndActions.segReview;
            scopeObj.onclickofViewLess(wid.selectedIndex[1],wid);
          }
        },
        "lblSeparator": "lblSeparator",
        "lblIconStatus": {
          "isVisible": true,
          "skin": (scopeObj.features[i].status === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) ? "sknFontIconActivate" : "sknfontIconInactive",
          "text": ""
        },
        "lblFeatureStatusValue": (scopeObj.features[i].status === scopeObj.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE) ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
        "flxAction1": flxdata[0],
        "flxAction2": flxdata[1],
        "flxAction3": flxdata[2],
        "flxAction4": flxdata[3],
        "flxAction5": flxdata[4],
        "flxAction6": flxdata[5],
        "flxAction7": flxdata[6],
        "flxAction8": flxdata[7],
        "flxAction9": flxdata[8],
        "flxAction10": flxdata[9],
        "flxAction11": flxdata[10],
        "flxAction12": flxdata[11],
        "flxAction13": flxdata[12],
        "flxAction14": flxdata[13],
        "flxAction15": flxdata[14],
        "flxAction16": flxdata[15],
        "flxAction17": flxdata[16],
        "flxAction18": flxdata[17],
        "flxAction19": flxdata[18],
        "flxAction20": flxdata[19],
        "lblRemove1":{
          "isVisible":true
        },
        "lblRemove2":{
          "isVisible":true
        },
        "lblRemove3":{
          "isVisible":true
        },
        "lblRemove4":{
          "isVisible":true
        },
        "lblIconRemove1":{
          "isVisible":true,
          "skin":"sknlblFontIconDelete",
          "text": "\ue91b"
        },
        "lblIconRemove2":{
          "isVisible":true,
          "skin":"sknlblFontIconDelete",
          "text": "\ue91b"
        },
        "lblIconRemove3":{
          "isVisible":true,
          "skin":"sknlblFontIconDelete",
          "text": "\ue91b"
        },
        "lblIconRemove4":{
          "isVisible":true,
          "skin":"sknlblFontIconDelete",
          "text": "\ue91b"
        },
        "lblAction1": {
          "text": flxdata[0].text
        },
        "lblAction2": {
          "text": flxdata[1].text
        },
        "lblAction3": {
          "text": flxdata[2].text
        },
        "lblAction4": {
          "text": flxdata[3].text
        },
        "lblAction5": {
          "text": flxdata[4].text
        },
        "lblAction6": {
          "text": flxdata[5].text
        },
        "lblAction7": {
          "text": flxdata[6].text
        },
        "lblAction8": {
          "text": flxdata[7].text
        },
        "lblAction9": {
          "text": flxdata[8].text
        },
        "lblAction10": {
          "text": flxdata[9].text
        },
        "lblAction11": {
          "text": flxdata[10].text
        },
        "lblAction12": {
          "text": flxdata[11].text
        },
        "lblAction13": {
          "text": flxdata[12].text
        },
        "lblAction14": {
          "text": flxdata[13].text
        },
        "lblAction15": {
          "text": flxdata[14].text
        },
        "lblAction16": {
          "text": flxdata[15].text
        },
        "lblAction17": {
          "text": flxdata[16].text
        },
        "lblAction18": {
          "text": flxdata[17].text
        },
        "lblAction19": {
          "text": flxdata[18].text
        },
        "lblAction20": {
          "text": flxdata[19].text
        },
        "fontIconCross1": {
          "isVisible": true,
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata,rowdata.lblAction1);
          }
        },
        "fontIconCross2": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction2);
          }
        },
        "fontIconCross3": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction3);
          }
        },
        "fontIconCross4": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction4);
          }
        },
        "fontIconCross5": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction5);
          }
        },
        "fontIconCross6": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction6);
          }
        },
        "fontIconCross7": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction7);
          }
        },
        "fontIconCross8": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction8);
          }
        },
        "fontIconCross9": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction9);
          }
        },
        "fontIconCross10": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction10);
          }
        },
        "fontIconCross11": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction11);
          }
        },
        "fontIconCross12": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction12);
          }
        },
        "fontIconCross13": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction13);
          }
        },
        "fontIconCross14": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction14);
          }
        },
        "fontIconCross15": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction15);
          }
        },
        "fontIconCross16": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction16);
          }
        },
        "fontIconCross17": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction17);
          }
        },
        "fontIconCross18": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction18);
          }
        },
        "fontIconCross19": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction19);
          }
        },
        "fontIconCross20": {
          "text": "",
          "skin": "sknFontIcon10pxSearchCrossD7D9E0",
          "onClick": function() {
            if(scopeObj.view.featureAndActions.flxFeatures.isVisible){
              var selIndex = scopeObj.view.featureAndActions.segFeatures.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segFeatures.data[selIndex];
            }else{
              var selIndex = scopeObj.view.featureAndActions.segReview.selectedIndex[1];
              var rowdata = scopeObj.view.featureAndActions.segReview.data[selIndex];
            }
            scopeObj.onTagRemoval(rowdata, rowdata.lblAction20);
          }
        },
        "lblIcon1": {
          "isVisible": true,
          "skin": flxdata[0].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[0].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon2": {
          "isVisible": true,
          "skin": flxdata[1].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[1].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon3": {
          "isVisible": true,
          "skin": flxdata[2].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[2].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon4": {
          "isVisible": true,
          "skin": flxdata[3].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[3].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon5": {
          "isVisible": true,
          "skin": flxdata[4].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[4].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon6": {
          "isVisible": true,
          "skin": flxdata[5].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[5].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon7": {
          "isVisible": true,
          "skin": flxdata[6].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[6].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon8": {
          "isVisible": true,
          "skin": flxdata[7].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[7].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon9": {
          "isVisible": true,
          "skin": flxdata[8].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[8].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon10": {
          "isVisible": true,
          "skin": flxdata[9].value === 1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[9].value === 1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon11": {
          "isVisible": true,
          "skin": flxdata[10].value ===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[10].value ===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon12": {
          "isVisible": true,
          "skin": flxdata[11].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[11].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon13": {
          "isVisible": true,
          "skin": flxdata[12].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[12].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon14": {
          "isVisible": true,
          "skin": flxdata[13].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[13].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon15": {
          "isVisible": true,
          "skin": flxdata[14].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[14].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon16": {
          "isVisible": true,
          "skin": flxdata[15].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[15].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon17": {
          "isVisible": true,
          "skin": flxdata[16].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[16].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon18": {
          "isVisible": true,
          "skin": flxdata[17].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[17].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon19": {
          "isVisible": true,
          "skin": flxdata[18].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[18].value===1 ? "\ue9ae" : "\ue960"
        },
        "lblIcon20": {
          "isVisible": true,
          "skin": flxdata[19].value===1 ? "sknlblFonticonCompleteSelection" :"sknlblFontIconpartialselection",
          "text": flxdata[19].value===1 ? "\ue9ae" : "\ue960"
        },
        "flxFeatureNameContainer": "flxFeatureNameContainer",
        "lblFeatureName": scopeObj.features[i].name,
        "template": visibleflexes > 0 ? "flxFeaturesListSelected" : "flxFeaturesList"
      };
      widgetdata[i] = data[i];
    }
    if (flag === 0) {
      flag = 1;
      if (reviewpageVisible) {
        var selecteddata = scopeObj.filteredData(data);
        return selecteddata;
      } else {
        scopeObj.setVisibilityOfSave();
        for (var i = 0; i < data.length; i++) {
          if (data[i].visibleflexes >= 1) {
            data[i].imgCheckBox.src = "checkboxselected.png";
          } else {
            data[i].imgCheckBox.src = "checkboxnormal.png";
          }
        } 
        return data;
      }
    } else {
      if (reviewpageVisible) {
        var selecteddata = scopeObj.filteredData(widgetdata);
        return selecteddata;
      } else {
        scopeObj.setVisibilityOfSave();
        return widgetdata;
      }
    }

  },

  onTagRemoval: function(rowdata, widget) {
    var scopeObj = this;
    var policydata = scopeObj.accessPolicies;
    var index=scopeObj.getFeatureIndex(rowdata.lblFeatureName);
    if (scopeObj.view.featureAndActions.flxFeatures.isVisible){
      var wid=scopeObj.view.featureAndActions.segFeatures;
      var flag = scopeObj.isFeaturedataset;
    }else{
      var wid=scopeObj.view.featureAndActions.segReview;
      var flag= scopeObj.isReviewDataset;
    }
    var tempPolicy = [];
    for (var k = 0; k < scopeObj.features[index].actions.length; k++) {
      for (var l = 0; l < policydata.length; l++) {
        if (tempPolicy[l] === undefined) tempPolicy[l] = 0;
        if (scopeObj.features[index].actions[k].accessPolicy === policydata[l].name) tempPolicy[l]++;
      }
    }
    for (var i = 0; i < policydata.length; i++) {
      if (widget.text === policydata[i].name) {
        scopeObj.featureactionmap[index][i] = 0;
        var temp = [];               
        temp=scopeObj.setIsSelectedForActions(index,policydata[i].name,0,false);
        for (var k = 0; k < temp.length; k++) {
          var count = 0;
          var totalCount;
          for (var l = 0; l < scopeObj.features[index].actions.length; l++) {
            if (scopeObj.features[index].actions[l].isSelected === 0 && scopeObj.features[index].actions[l].accessPolicy === temp[k]) {
              count++;
            }
          }
          for (var l = 0; l < policydata.length; l++) {
            if (policydata[l].name === temp[k]) {
              totalCount = tempPolicy[l];
              if (count === totalCount) 
                scopeObj.featureactionmap[index][l] = 0;
              else 
                scopeObj.featureactionmap[index][l] = 2;
              break;
            }
          }
        }
        var data=scopeObj.setFeatureData(wid, flag);
        wid.setData(data);
      }
    }
    if(wid.id==="segReview"){
      scopeObj.createRequest();
      if(scopeObj.isFeatureActionMapEmpty() ===1)
        scopeObj.showfeaturesPage();
    }
  },

  getFeatureIndex:function(name){
    var scopeObj=this;
    for (var i=0 ;i<scopeObj.features.length;i++){
      if(scopeObj.features[i].name===name)
        return i;
    }
    return 0;		
  },

  getSelectedData:  function(widget) {
    var data = widget.data;
    var selData=[]
    selData = data.filter(function(rec){
      if (rec.imgCheckBox.src==="checkboxselected.png")
        return rec;
    });

    selData.data = data.filter(function(rec){
      if (rec.imgCheckBox.src==="checkboxselected.png")
        return rec;
    });
    return selData;
  },

  showfeaturesPage: function() {
    this.hideAllGroups();
    this.view.flxSelectFeatures.setVisibility(true);
    this.view.flxHeader.lblSelLegalEntity.text = "("+this.view.lblSelectedRowsServTypeServDetails.text +")";
    this.setLeftMenu(this.view.verticalTabs.btnOption2, this.view.verticalTabs.flxImgArrow2);
  },
  setWidgetdataForReviewPage :function(){
    var scopeObj = this;
    var widgetMap = {
      "flxFeaturesList": "flxFeaturesList",
      "flxFeaturesListSelected": "flxFeaturesListSelected",
      "flxFeatureNameContainer": "flxFeatureNameContainer",
      "flxFeatureCheckbox":"flxFeatureCheckbox",
      "imgCheckBox":"imgCheckBox",
      "flxFeatureStatus": "flxFeatureStatus",
      "flxMain1": "flxMain1",
      "flxMain2": "flxMain2",
      "flxMain3": "flxMain3",
      "flxMain4": "flxMain4",
      "flxRemove1":"flxRemove1",
      "flxRemove2":"flxRemove2",
      "flxRemove3":"flxRemove3",
      "flxRemove4":"flxRemove4",
      "lblRemove1": "lblRemove1",
      "lblRemove2": "lblRemove2",
      "lblRemove3": "lblRemove3",
      "lblRemove4": "lblRemove4",
      "lblIconRemove1": "lblIconRemove1",
      "lblIconRemove2": "lblIconRemove2",
      "lblIconRemove3": "lblIconRemove3",
      "lblIconRemove4": "lblIconRemove4",
      "btnView1":"btnView1",
      "btnView2":"btnView2",
      "btnView3":"btnView3",
      "btnView4":"btnView4",
      "lblSeparator": "lblSeparator",
      "lblIconStatus": "lblIconStatus",
      "lblFeatureStatusValue": "lblFeatureStatusValue",
      "flxAction1": "flxAction1",
      "flxAction2": "flxAction2",
      "flxAction3": "flxAction3",
      "flxAction4": "flxAction4",
      "flxAction5": "flxAction5",
      "flxAction6": "flxAction6",
      "flxAction7": "flxAction7",
      "flxAction8": "flxAction8",
      "flxAction9": "flxAction9",
      "flxAction10": "flxAction10",
      "flxAction11": "flxAction11",
      "flxAction12": "flxAction12",
      "flxAction13": "flxAction13",
      "flxAction14": "flxAction14",
      "flxAction15": "flxAction15",
      "flxAction16": "flxAction16",
      "flxAction17": "flxAction17",
      "flxAction18": "flxAction18",
      "flxAction19": "flxAction19",
      "flxAction20": "flxAction20",
      "lblAction1": "lblAction1",
      "lblAction2": "lblAction2",
      "lblAction3": "lblAction3",
      "lblAction4": "lblAction4",
      "lblAction5": "lblAction5",
      "lblAction6": "lblAction6",
      "lblAction7": "lblAction7",
      "lblAction8": "lblAction8",
      "lblAction9": "lblAction9",
      "lblAction10": "lblAction10",
      "lblAction11": "lblAction11",
      "lblAction12": "lblAction12",
      "lblAction13": "lblAction13",
      "lblAction14": "lblAction14",
      "lblAction15": "lblAction15",
      "lblAction16": "lblAction16",
      "lblAction17": "lblAction17",
      "lblAction18": "lblAction18",
      "lblAction19": "lblAction19",
      "lblAction20": "lblAction20",
      "fontIconCross1": "fontIconCross1",
      "fontIconCross2": "fontIconCross2",
      "fontIconCross3": "fontIconCross3",
      "fontIconCross4": "fontIconCross4",
      "fontIconCross5": "fontIconCross5",
      "fontIconCross6": "fontIconCross6",
      "fontIconCross7": "fontIconCross7",
      "fontIconCross8": "fontIconCross8",
      "fontIconCross9": "fontIconCross9",
      "fontIconCross10": "fontIconCross10",
      "fontIconCross11": "fontIconCross11",
      "fontIconCross12": "fontIconCross12",
      "fontIconCross13": "fontIconCross13",
      "fontIconCross14": "fontIconCross14",
      "fontIconCross15": "fontIconCross15",
      "fontIconCross16": "fontIconCross16",
      "fontIconCross17": "fontIconCross17",
      "fontIconCross18": "fontIconCross18",
      "fontIconCross19": "fontIconCross19",
      "fontIconCross20": "fontIconCross20",
      "lblIcon1": "lblIcon1",
      "lblIcon2": "lblIcon2",
      "lblIcon3": "lblIcon3",
      "lblIcon4": "lblIcon4",
      "lblIcon5": "lblIcon5",
      "lblIcon6": "lblIcon6",
      "lblIcon7": "lblIcon7",
      "lblIcon8": "lblIcon8",
      "lblIcon9": "lblIcon9",
      "lblIcon10": "lblIcon10",
      "lblIcon11": "lblIcon11",
      "lblIcon12": "lblIcon12",
      "lblIcon13": "lblIcon13",
      "lblIcon14": "lblIcon14",
      "lblIcon15": "lblIcon15",
      "lblIcon16": "lblIcon16",
      "lblIcon17": "lblIcon17",
      "lblIcon18": "lblIcon18",
      "lblIcon19": "lblIcon19",
      "lblIcon20": "lblIcon20",
      "flxFeatureNameContainer": "flxFeatureNameContainer",
      "lblFeatureName": "lblFeatureName"
    };
    return widgetMap;
  },

  showReviewPage: function(data) {
    var scopeObj = this;
    scopeObj.hideAllGroups();
    var selecteddata = scopeObj.filteredData(data);
    selecteddata= selecteddata.map(function(rec){
      rec.flxFeatureCheckbox.isVisible=false;
      return rec;
    });
    scopeObj.view.featureAndActions.flxFeatures.setVisibility(false);
    scopeObj.view.featureAndActions.flxReview.setVisibility(true);
    scopeObj.view.flxFeatureComponent.setVisibility(true);
    scopeObj.view.featureAndActions.lblEntityRegion.text = "("+scopeObj.view.lblSelectedRowsServTypeServDetails.text +")";
    scopeObj.view.featureAndActions.segReview.widgetDataMap = scopeObj.setWidgetdataForReviewPage();
    scopeObj.view.featureAndActions.segReview.setData(selecteddata);
    scopeObj.isReviewDataset = 1;
    scopeObj.view.forceLayout();
  },

  filteredData:function(data){
    var selecteddata = data.filter(function(rec) {
      if (rec.visibleflexes !== undefined && rec.visibleflexes > 0) {
        return rec;
      }
    });
    return selecteddata;
  },

  showAssignLimits: function() {
    this.hideAllGroups();
    this.view.flxAssignLimitsComponent.setVisibility(true);
    this.view.lblLimits.text = "Limits";
    this.view.lblSelectedEntity.text = "("+this.view.lblSelectedRowsServTypeServDetails.text +")";
    this.setLeftMenu(this.view.verticalTabs.btnOption3, this.view.verticalTabs.flxImgArrow3);
    this.getMoreDataModel = {
      "PAGE_OFFSET": 0
    };
    this.view.flxScrollAssignLimits.setVisibility(true);
    this.setDynamicActionsLimits();
  },

  setDynamicActionsLimits: function() {
    var self = this;
    var flag = false;
    var screenWidth = kony.os.deviceInfo().screenWidth;
    self.view.flxNoLimitsForFeatureSelected.setVisibility(false);
    self.view.flxBtnContainer.setVisibility(true);
    for(var i = 0; i < self.features.length ; i++){
      if(self.features[i].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY){
        flag = true;
        var featureSegment = this.view.flxScrollAssignLimits.widgets().filter( x => x.id === "actionLimits"+i)[0];
        if(featureSegment === undefined){
          featureSegment = new com.adminConsole.common.assignLimits({
            "id": "actionLimits" + i,
            "isVisible": true,
            "width": 99 + "%",
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "top": "0px"
          }, {}, {});
          this.view.flxScrollAssignLimits.add(featureSegment);
        }
        featureSegment.setVisibility(true);
        self.setActionLimitsData(featureSegment,self.features[i], i);
      }
    }
    if(this.createRequestParam.featureactions.filter(x => x.limits.length >0).length === 0){
      self.view.flxBtnContainer.setVisibility(false);
      self.view.flxNoLimitsForFeatureSelected.setVisibility(true);
    }
    self.view.forceLayout();
  },

  setActionLimitsData : function(featureSegment, feature, featureIndex){
    var self = this;
    var actionPresent = false;
    var actions = feature.actions;
    for(var i = 0; i < actions.length ; i++){

      if( actions[i].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY){
        var actionFlx = featureSegment.flxActionsLimitsSegment.widgets().filter( widget => widget.id === "flxActionsLimits" + i)[0];

        if(actionFlx === undefined){
          actionFlx = featureSegment.flxActionsLimitsSegment.flxActionsLimits.clone("x" + i);
          actionFlx = self.getDynamicWidgets(actionFlx, i);

          actionFlx.widgets()[0].widgets()[0].text = actions[i].name;

          featureSegment.flxActionsLimitsSegment.add(actionFlx);

          self.addEventsOnTextBox(actionFlx, actions[i], featureIndex, i);
        }
        featureSegment["lblCurrencySymbolA"+i].text = this.currencyValue;
        featureSegment["lblCurrencySymbolB"+i].text = this.currencyValue;
        featureSegment["lblCurrencySymbolC"+i].text = this.currencyValue;
        if (actions[i].isSelected !== undefined && actions[i].isSelected === 1 && actions[i].retained === 1){
          actionPresent = true;
          actionFlx.setVisibility(true);
        }
        else actionFlx.setVisibility(false);
      }
    }

    featureSegment.lblFeatureName.text =  feature.name;
    featureSegment.flxDefaultInfo1.onHover = function(widget, context) {
      var info = "This is per transaction value for " + feature.name + " submitted over the online banking channel.";
      self.onHoverCallBack(widget, context, featureSegment, info);
    };
    featureSegment.flxDefaultInfo2.onHover = function(widget, context) {
      var info = "This is daily transaction value for " + feature.name + " submitted over the online banking channel.";
      self.onHoverCallBack(widget, context, featureSegment, info);
    };
    featureSegment.flxDefaultInfo3.onHover = function(widget, context) {
      var info = "This is weekly transaction value for " + feature.name + " submitted over the online banking channel.";
      self.onHoverCallBack(widget, context, featureSegment, info);
    };
    if(!actionPresent)
      featureSegment.setVisibility(false);
  },

  addEventsOnTextBox : function(actionFlx, action, featureIndex , actionIndex){
    var self = this;
    var componentname = "actionLimits"+ featureIndex;
    var tbxIntials = "tbxLimitValue";

    //per transaction
    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].text = action.limits[1].value;

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].onBeginEditing = function(widget) {
      widget.parent.skin = "sknflxffffffBorderd6dbe7Radius4pxFocus";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeA"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["flxErrorA"+actionIndex].setVisibility(false);
      self.view.flxScrollAssignLimits[componentname]["lblRangeA"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["lblRangeA"+actionIndex].skin = "sknIcon485C7513px";
      self.view.flxScrollAssignLimits[componentname]["lblRangeA"+actionIndex].text = "Range: " + self.currencyValue + self.masterData[featureIndex].actions[actionIndex].limits[3].value + " - " + self.currencyValue + self.masterData[featureIndex].actions[actionIndex].limits[1].value;
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].onEndEditing = function(widget) {
      widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeA"+actionIndex].setVisibility(false);
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'A'+actionIndex].onTextChange = function(widget) {
      self.createRequestParam.featureactions.filter(x => x.id === self.features[featureIndex].actions[actionIndex].id)[0].limits[1].value = widget.text;
    }

    //daily transaction
    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].text = action.limits[2].value;

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].onBeginEditing = function(widget) {
      widget.parent.skin = "sknflxffffffBorderd6dbe7Radius4pxFocus";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeB"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["flxErrorB"+actionIndex].setVisibility(false);
      self.view.flxScrollAssignLimits[componentname]["lblRangeB"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["lblRangeB"+actionIndex].skin = "sknIcon485C7513px";
      self.view.flxScrollAssignLimits[componentname]["lblRangeB"+actionIndex].text = "Range: " + self.currencyValue + self.masterData[featureIndex].actions[actionIndex].limits[3].value + " - " + self.currencyValue + self.masterData[featureIndex].actions[actionIndex].limits[2].value;
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].onEndEditing = function(widget) {
      widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeB"+actionIndex].setVisibility(false);
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'B'+actionIndex].onTextChange = function(widget) {
      self.createRequestParam.featureactions.filter(x => x.id === self.features[featureIndex].actions[actionIndex].id)[0].limits[2].value = widget.text;
    }

    //weekly transaction
    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].text = action.limits[0].value;

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].onBeginEditing = function(widget) {
      widget.parent.skin = "sknflxffffffBorderd6dbe7Radius4pxFocus";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeC"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["flxErrorC"+actionIndex].setVisibility(false);
      self.view.flxScrollAssignLimits[componentname]["lblRangeC"+actionIndex].setVisibility(true);
      self.view.flxScrollAssignLimits[componentname]["lblRangeC"+actionIndex].skin = "sknIcon485C7513px";
      self.view.flxScrollAssignLimits[componentname]["lblRangeC"+actionIndex].text = "Range: " + self.currencyValue + self.masterData[featureIndex].actions[actionIndex].limits[3].value + " - " + self.currencyValue + self.masterData[featureIndex].actions[actionIndex].limits[0].value;
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].onEndEditing = function(widget) {
      widget.parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
      self.view.flxScrollAssignLimits[componentname]["flxLimitRangeC"+actionIndex].setVisibility(false);
      self.view.forceLayout();
    }

    self.view.flxScrollAssignLimits[componentname][tbxIntials+'C'+actionIndex].onTextChange = function(widget) {
      self.createRequestParam.featureactions.filter(x => x.id === self.features[featureIndex].actions[actionIndex].id)[0].limits[0].value = widget.text;
    }
  },
  validateLimits : function(){
    var self = this;
    var action = self.createRequestParam.featureactions[2];
    var isValid = true;
    for(var i= 0; i< self.features.length; i++){
      var feature = self.features[i];
      if(feature.type === self.AdminConsoleCommonUtils.constantConfig.MONETARY ){
        for(var j=0; j < feature.actions.length; j++){
          if(feature.actions[j].type === self.AdminConsoleCommonUtils.constantConfig.MONETARY && feature.actions[j].isSelected === 1 && feature.actions[j].retained === 1){
            if(!self.validateActionLimitsEntered(self.masterData[i].actions[j], i, j))
              isValid = false;
            self.view.forceLayout();
          }
        }
      }			
    }
    return isValid;
  },
  validateActionLimitsEntered: function(action, featureIndex, actionIndex) {
    var self = this;
    var componentname = "actionLimits" + featureIndex;
    var tbxIntials = "tbxLimitValue";
    var isValid = true, errCount = 0;

    var actualLimits = [];
    actualLimits[0] = (action.limits.filter(x => x.id === "MAX_TRANSACTION_LIMIT"))[0].value; //   action.limits[1].value; // per transaction value
    actualLimits[1] = (action.limits.filter(x => x.id === "DAILY_LIMIT"))[0].value;  // action.limits[2].value; // daily transaction value
    actualLimits[2] = (action.limits.filter(x => x.id === "WEEKLY_LIMIT"))[0].value; // action.limits[0].value; // weekly transaction value
    actualLimits[3] = (action.limits.filter(x => x.id === "MIN_TRANSACTION_LIMIT"))[0].value;
    var minTransLimit = actualLimits[3];
    var perVal = parseFloat(self.view.flxScrollAssignLimits[componentname][tbxIntials + 'A' + actionIndex].text);
    var dailyVal = parseFloat(self.view.flxScrollAssignLimits[componentname][tbxIntials + 'B' + actionIndex].text);
    var weeklyVal = parseFloat(self.view.flxScrollAssignLimits[componentname][tbxIntials + 'C' + actionIndex].text);

    for (var k = 0; k < 3; k++) {
      isValid = true;
      var limit = actualLimits[k];
      var tbxId = String.fromCharCode(65 + k); // can be A, B or C
      var tbxname = tbxIntials + String.fromCharCode(65 + k) + actionIndex;
      var value = self.view.flxScrollAssignLimits[componentname][tbxname].text;
      //min/max range validations
      if (value === "" || value === undefined) {
        var errorMsg = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty");
        self.showErrorOnTbx(componentname, tbxname, tbxId, actionIndex , errorMsg);
        self.view.flxScrollAssignLimits[componentname][tbxname].parent.skin = "sknFlxCalendarError";
        isValid = false;
      } else if (parseFloat(value) < 0) {
        var errorMsg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " " + self.currencyValue + minTransLimit;
        self.showErrorOnTbx(componentname, tbxname, tbxId, actionIndex , errorMsg);
        isValid = false;
      } else if (parseFloat(value) > parseFloat(limit) || parseFloat(value) < parseFloat(minTransLimit)) {
        var errorMsg ="";
        if(parseFloat(value) > parseFloat(limit))
          errorMsg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_more_than") + " " + self.currencyValue + parseFloat(limit);
        else
          errorMsg = kony.i18n.getLocalizedString("i18n.frmMFAConfigurations.Value_cannot_be_less_than") + " " + self.currencyValue + minTransLimit;
        self.showErrorOnTbx(componentname, tbxname, tbxId, actionIndex , errorMsg);
        isValid = false;
      } 
      if(isValid === true){ //compare within limit values only if no min/max range validations
        if (perVal > dailyVal && k === 0 && dailyVal >= parseFloat(minTransLimit)) {
          var errorMsg = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanDailyLimit");
          self.showErrorOnTbx(componentname, tbxIntials+"A"+actionIndex, "A", actionIndex , errorMsg);
          isValid = false;
        } else if (dailyVal > weeklyVal && k === 1 && weeklyVal >= parseFloat(minTransLimit)) {
          var errorMsg = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
          self.showErrorOnTbx(componentname, tbxIntials+"B"+actionIndex, "B", actionIndex , errorMsg);
          isValid = false;
          if(perVal > weeklyVal && (perVal <= dailyVal)){
            var errorMsg2 = kony.i18n.getLocalizedString("i18n.frmServiceManagement.ValueShouldBeLessThanWeeklyLimit");
            self.showErrorOnTbx(componentname, tbxIntials+"A"+actionIndex, "A", actionIndex , errorMsg2);
          }
        } 
      }
      errCount = isValid === false ? errCount +1 : errCount;
      //clear errors
      if(isValid === true){
        self.view.flxScrollAssignLimits[componentname][tbxname].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
        self.view.flxScrollAssignLimits[componentname]["flxLimitRange" + tbxId + actionIndex].setVisibility(false);
      }
    }
    return (errCount === 0);
  },
  showErrorOnTbx: function(componentname, tbxname, tbxId, actionIndex, errorMsg) {
    var self = this;
    self.view.flxScrollAssignLimits[componentname][tbxname].parent.skin = "sknFlxCalendarError";
    self.view.flxScrollAssignLimits[componentname]["flxLimitRange" + tbxId + actionIndex].setVisibility(true);
    self.view.flxScrollAssignLimits[componentname]["lblRange" + tbxId + actionIndex].setVisibility(false);
    self.view.flxScrollAssignLimits[componentname]["flxError" + tbxId + actionIndex].setVisibility(true);
    self.view.flxScrollAssignLimits[componentname]["lblError" + tbxId + actionIndex].text = errorMsg;
    if(errorMsg.indexOf(self.currencyValue)>-1)
      self.view.flxScrollAssignLimits[componentname]["lblError" + tbxId + actionIndex].skin = "sknlblErrorIcon12px";//if text includes currency icon assigning fonticon skin
    else
      self.view.flxScrollAssignLimits[componentname]["lblError" + tbxId + actionIndex].skin = "sknlblError";
  },
  resetAllLimits: function() {
    for(var i=0;i<this.features.length;i++){
      if(this.features[i].type === this.AdminConsoleCommonUtils.constantConfig.MONETARY){
        var componentname= "actionLimits"+i;
        var component=this.view.flxScrollAssignLimits[componentname];
        for(var j=0;j<this.features[i].actions.length;j++){
          if(this.features[i].actions[j].type === this.AdminConsoleCommonUtils.constantConfig.MONETARY && this.features[i].actions[j].limits !== undefined && this.features[i].actions[j].retained === 1){
            var perTxLimit= "tbxLimitValueA"+j;
            var dailyLimit= "tbxLimitValueB"+j;
            var weeklyLimit= "tbxLimitValueC"+j;
            var maplimits; 
            maplimits = this.features[i].actions[j].limits.reduce(function(maplimits, obj) {
              maplimits[obj.id] = obj.value;
              return maplimits;
            },{});
            this.view.flxScrollAssignLimits[componentname][perTxLimit].text = maplimits.MAX_TRANSACTION_LIMIT;
            this.view.flxScrollAssignLimits[componentname][perTxLimit].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
            this.view.flxScrollAssignLimits[componentname]["flxLimitRangeA"+j].setVisibility(false);

            this.view.flxScrollAssignLimits[componentname][dailyLimit].text = maplimits.DAILY_LIMIT;
            this.view.flxScrollAssignLimits[componentname][dailyLimit].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
            this.view.flxScrollAssignLimits[componentname]["flxLimitRangeB"+j].setVisibility(false);

            this.view.flxScrollAssignLimits[componentname][weeklyLimit].text = maplimits.WEEKLY_LIMIT;
            this.view.flxScrollAssignLimits[componentname][weeklyLimit].parent.skin = "sknFlxbgFFFFFFbdrD7D9E0rd3px";
            this.view.flxScrollAssignLimits[componentname]["flxLimitRangeC"+j].setVisibility(false);

            this.createRequestParam.featureactions.filter(x => x.id === this.features[i].actions[j].id)[0].limits[0].value = this.view.flxScrollAssignLimits[componentname][weeklyLimit].text;
            this.createRequestParam.featureactions.filter(x => x.id === this.features[i].actions[j].id)[0].limits[1].value = this.view.flxScrollAssignLimits[componentname][perTxLimit].text;
            this.createRequestParam.featureactions.filter(x => x.id === this.features[i].actions[j].id)[0].limits[2].value = this.view.flxScrollAssignLimits[componentname][dailyLimit].text;
          }
        }
      }
    }
  },

  getDynamicWidgets: function(actionFlx, i) {
    actionFlx.id = "flxActionsLimits" + i;
    actionFlx.widgets()[0].widgets()[3].id = "flxLimitValueC" + i;
    actionFlx.widgets()[0].widgets()[2].id = "flxLimitValueB" + i;
    actionFlx.widgets()[0].widgets()[1].id = "flxLimitValueA" + i;
    actionFlx.widgets()[0].widgets()[4].id = "flxLimitRangeA" + i;
    actionFlx.widgets()[0].widgets()[5].id = "flxLimitRangeB" + i;
    actionFlx.widgets()[0].widgets()[6].id = "flxLimitRangeC" + i;
    actionFlx.widgets()[0].widgets()[7].id = "lblSeparatorA" + i;
    actionFlx.widgets()[0].id = "flxLimitsRow" + i;
    actionFlx.widgets()[0].widgets()[1].widgets()[0].id = "lblCurrencySymbolA" + i;
    actionFlx.widgets()[0].widgets()[2].widgets()[0].id = "lblCurrencySymbolB" + i;
    actionFlx.widgets()[0].widgets()[3].widgets()[0].id = "lblCurrencySymbolC" + i;
    actionFlx.widgets()[0].widgets()[1].widgets()[1].id = "tbxLimitValueA" + i;
    actionFlx.widgets()[0].widgets()[2].widgets()[1].id = "tbxLimitValueB" + i;
    actionFlx.widgets()[0].widgets()[3].widgets()[1].id = "tbxLimitValueC" + i;
    actionFlx.widgets()[0].widgets()[4].widgets()[0].id = "lblRangeA" + i;
    actionFlx.widgets()[0].widgets()[5].widgets()[0].id = "lblRangeB" + i;
    actionFlx.widgets()[0].widgets()[6].widgets()[0].id = "lblRangeC" + i;
    actionFlx.widgets()[0].widgets()[4].widgets()[1].id = "flxErrorA" + i;
    actionFlx.widgets()[0].widgets()[5].widgets()[1].id = "flxErrorB" + i;
    actionFlx.widgets()[0].widgets()[6].widgets()[1].id = "flxErrorC" + i;
    actionFlx.widgets()[0].widgets()[4].widgets()[1].widgets()[1].id = "lblErrorA" + i;
    actionFlx.widgets()[0].widgets()[5].widgets()[1].widgets()[1].id = "lblErrorB" + i;
    actionFlx.widgets()[0].widgets()[6].widgets()[1].widgets()[1].id = "lblErrorC" + i;
    actionFlx.widgets()[0].widgets()[0].id = "lblActionName" + i;
    return actionFlx;
  },

  onHoverCallBack:function(widget, context,featureSegment,info) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        scopeObj.showOnHoverInfo(featureSegment, widGetId, info);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.showOnHoverInfo(featureSegment, widGetId, info);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        featureSegment.ToolTip.setVisibility(false);
      }
    }
  },

  showOnHoverInfo: function(featureSegment, widGetId, info) {
    var scopeObj = this;
    var leftVal = 0;
    switch (widGetId) {
      case 'flxDefaultInfo1':
        leftVal = featureSegment.flxDefaultInfo1.parent.frame.x - 75;
        break;
      case 'flxDefaultInfo2':
        leftVal = featureSegment.flxDefaultInfo2.parent.frame.x - 65;
        break;
      case 'flxDefaultInfo3':
        leftVal = featureSegment.flxDefaultInfo3.parent.frame.x - 54;
        break;
    }
    featureSegment.ToolTip.left = leftVal + "dp";
    featureSegment.ToolTip.lblNoConcentToolTip.text = info;
    featureSegment.ToolTip.lblarrow.skin =  "sknfontIconDescRightArrow14px";
    featureSegment.ToolTip.flxToolTipMessage.skin ="sknFlxFFFFFF";
    featureSegment.ToolTip.lblNoConcentToolTip.skin = "sknLbl485C75LatoRegular13Px";
    featureSegment.ToolTip.setVisibility(true);
    scopeObj.view.forceLayout();
  },

  checkGroupDetailsValidation : function(){
    var self =this;
    var isValid = true;
    var groupName = self.view.tbxGroupNameValue.text.trim();
    var groupDesc = self.view.txtGroupDescription.text.trim();
    var selectedItem = self.view.lstBoxType.selectedKey;

    self.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
    self.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
    self.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    self.view.flxNoGroupNameError.setVisibility(false);
    self.view.flxNoGroupDescriptionError.setVisibility(false);
    self.view.flxTypeError.setVisibility(false);

    if(groupName === "") {
      isValid = false;
      self.view.tbxGroupNameValue.skin = "skntbxBordereb30173px";
      self.view.flxNoGroupNameError.setVisibility(true);
      self.view.lblNoGroupNameError.text = kony.i18n.getLocalizedString("i18n.AddServiceDef.EmptyServiceName");
    }

    if( groupDesc === "") {
      isValid = false;
      self.view.txtGroupDescription.skin = "skinredbg";
      self.view.flxNoGroupDescriptionError.setVisibility(true);
    }

    if(selectedItem === "select"){
      isValid = false;
      self.view.lstBoxType.skin = "redListBxSkin";
      self.view.flxTypeError.setVisibility(true);
    }     

    if(this.containSpecialChars(groupName)) {
      isValid = false;
      self.view.tbxGroupNameValue.skin = "skntbxBordereb30173px";
      self.view.lblNoGroupNameError.text = kony.i18n.getLocalizedString("kony.i18n.namespecialchar");
      self.view.flxNoGroupNameError.setVisibility(true);
    }
    if(this.containSpecialChars(groupDesc)) {
      isValid = false;
      self.view.txtGroupDescription.skin = "skntbxBordereb30173px";
      self.view.lblNoGroupDescriptionError.text = kony.i18n.getLocalizedString("kony.i18n.descspecialchar");
      self.view.flxNoGroupDescriptionError.setVisibility(true);
    }

    if(!kony.sdk.isNullOrUndefined(self.servicename) && self.servicename.length > 0 && groupName != "") {
      var oldName = "";
      if(self.groupsCurrAction === self.groupActionConfig.EDIT){
        var index = self.view.listingSegmentClient.segListing.selectedRowIndex;
        var rowIndex = index[1];
        var rowData = self.view.listingSegmentClient.segListing.data[rowIndex];
        oldName = rowData.lblGroupName.text;
      }
      if(groupName.toLowerCase() != oldName.toLowerCase()){
        for (var i = 0; i < self.servicename.length; i++) {
          if (groupName.toLowerCase() === self.servicename[i].name.toLowerCase()) {
            isValid = false;
            self.view.tbxGroupNameValue.skin = "skntbxBordereb30173px";
            self.view.lblNoGroupNameError.text = kony.i18n.getLocalizedString("i18n.AddServiceDef.UniqueServiceName");
            self.view.flxNoGroupNameError.setVisibility(true);
            break;
          }
        }
      }
    }

    return isValid;
  },

  containSpecialChars: function(name){
    var regex = /[+=\\\\|<>^*%]/;  
    if(regex.test(name)){
      return true;
    }
    return false;
  },

  showGroupDelete : function(){
    var self = this;
    var index = [];
    var row = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var grpName = "";
    var service_id = "";
    var contractCount ="";

    if(row !== null){
      index = row[1];
      grpName= self.view.listingSegmentClient.segListing.data[index].lblGroupName.text;
      service_id= self.view.listingSegmentClient.segListing.data[index].id;
      contractCount=self.view.listingSegmentClient.segListing.data[index].lblContracts.text;
    }else{
      grpName = "";
    }

    if(contractCount==="0"){
      this.view.popUpConfirm.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeleteService");
      this.view.popUpConfirm.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeleteServiceConfirmMsg") +
        "\""+grpName+"\" ?";
      this.view.popUpConfirm.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.Common.button.NoLeaveAsIs");
      this.view.popUpConfirm.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.Common.button.YesProceed");
      this.view.flxConfirmGroup.setVisibility(true);

      this.view.popUpConfirm.btnPopUpDelete.onClick = function(){
        self.view.flxConfirmGroup.setVisibility(false);
        self.presenter.deleteService(service_id);
        self.setDataLegalEntity();
      };
    }else{
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeleteService");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeleteServiceErrMsg1")+" \""+
        grpName+"\" "+ kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeleteServiceErrMsg2");
      this.view.popUp.flxPopUpTopColor.skin="sknFlxBge61919";
      this.view.popUp.btnPopUpCancel.skin="sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      this.view.flxErrorPopup.setVisibility(true);
    }
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.forceLayout();
  },

  showGroupDeactive : function(){
    var self = this;
    var index = [];
    var row = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var grpName = "";
    var service_id = "";
    var statusType = "";
    var request;
    var isActive;
    var contractCount = "";
    if (row !== null) {
      index = row[1];
      grpName = self.view.listingSegmentClient.segListing.data[index].lblGroupName.text;
      service_id = self.view.listingSegmentClient.segListing.data[index].id;
      statusType=self.view.listingSegmentClient.segListing.data[index].Status_id;
      contractCount = self.view.listingSegmentClient.segListing.data[index].lblContracts.text;
    } else {
      grpName = "";
    }
    isActive= (statusType===self.AdminConsoleCommonUtils.constantConfig.ACTIVE);
    request={"id":service_id ,"status": (isActive ? self.AdminConsoleCommonUtils.constantConfig.INACTIVE : self.AdminConsoleCommonUtils.constantConfig.ACTIVE )};


    if (contractCount === "0" && isActive ) {
      this.view.popUpConfirm.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate") + " "+kony.i18n.getLocalizedString("i18n.frmServiceDefinition.serviceDefinition");
      this.view.popUpConfirm.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeactivateServiceConfirmMsg1") + " \"" + grpName + "\" " + kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeactivateServiceConfirmMsg2");
      this.view.popUpConfirm.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.Common.button.NoLeaveAsIs");
      this.view.popUpConfirm.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.Common.button.YesProceed");
      this.view.flxConfirmGroup.setVisibility(true);
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      this.view.popUpConfirm.btnPopUpDelete.onClick = function() {
        self.view.flxConfirmGroup.setVisibility(false);
        self.presenter.manageServiceDefinitionStatus(request);
        self.setDataLegalEntity();
      };
    } else if(isActive){
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeactivateService");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeactivateServiceErrMsg1") + " \"" + grpName + "\" " + kony.i18n.getLocalizedString("i18n.ServiceDefinition.DeactivateServiceErrMsg2");
      this.view.popUp.flxPopUpTopColor.skin = "sknFlxBge61919";
      this.view.popUp.btnPopUpCancel.skin = "sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      this.view.flxErrorPopup.setVisibility(true);
    } else if(!isActive){
      self.presenter.manageServiceDefinitionStatus(request);
      self.setDataLegalEntity();
    }
    this.view.forceLayout();
  },

  onDropdownHoverCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) { //for filter dropdown
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widget.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.setVisibility(false);
      }
    }
  },


  hideAll : function(){
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxNoGroups.setVisibility(false);
    this.view.flxGroupList.setVisibility(false);
    this.view.flxViewServiceDef.setVisibility(false);
    this.view.flxAddGroups.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(false);    
    this.view.flxSelectFeatures.setVisibility(false);
    this.view.flxFeatureComponent.setVisibility(false);
    this.view.flxGroupDetails.setVisibility(false);
    this.view.flxAdvancedSelectionComponent.setVisibility(false);
    this.view.flxAssignRoles.setVisibility(false);
  },

  hideAllGroups : function(){
    this.view.toastMessage.hideToastMessage (this);
    this.view.flxAddGroups.setVisibility(true);   
    this.view.flxGroupDetails.setVisibility(false);
    this.view.flxSelectFeatures.setVisibility(false);
    this.view.flxFeatureComponent.setVisibility(false);
    this.view.flxAdvancedSelectionComponent.setVisibility(false);
    this.view.flxAssignRoles.setVisibility(false);
    this.view.flxAssignLimitsComponent.setVisibility(false);
  },
  /*
     * function to show the view page. For now, just moving to landing page
     */
  getAllGroups: function() {
    let payload = {
      "legalEntityId": this.selectedLegalEntity
    }
    this.presenter.showServiceDefinition(payload);
  },
  setPreshowData : function(){
    
     // To do: Fetch the data from the back end service

   /*  As the data has to get from the service we are giving static data here*/
    
   //this.view.lblSelectedRowsServType.text = "Select Legal Entity";
   //this.view.lblSelectedRowsServTypeServDetails.text = "Select Legal Entity";
    var self = this;
    var statusData = [];
    var widgetMap = {
      //"customerStatusId": "customerStatusId",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblCheckbox": "lblCheckbox",
      "lblDescription": "lblDescription"
    };
    this.legalEntityList = this.presenter.fetchLegalEntityList();
    var records = [...this.legalEntityList].sort((a, b) => {
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
      var statusData = records.map(function(rec){    
        return {
          // "customerStatusId": rec.id,
          "flxSearchDropDown": "flxSearchDropDown",
          "flxCheckBox": {"isVisible": false},
          "lblDescription": rec.companyName,
          "onRowClick": function() {
            self.segRowClick(rec);
          }
        };
    });
var legalEntityList = self.getLEListForFormAction("frmServiceDefinition",'CREATE');
	var statusData1 = legalEntityList.map(function(rec) {
      return {
        // "customerStatusId": rec.id,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": {
          "isVisible": false
        },
                "lblDescription": rec.companyName,
                "onRowClick": function() {
                    self.segRowClick1(rec);
                }
      };
    });
    this.view.lblSelectedRowsServType.text = this.legalEntityList[0].companyName;
   this.view.lblSelectedRowsServTypeServDetails.text = "Select Legal Entity";
    this.view.flxDropDownServType.onClick = this.toggleDropdown.bind(this);
  this.view.flxDropDownServTypServDetails.onClick = this.toggleDropdownInside.bind(this);
    this.view.AdvancedSearchDropDownServType.flxSearchCancel.onClick = function () {
      self.view.AdvancedSearchDropDownServType.tbxSearchBox.text = "";
      self.entitySearch();
    }
    this.view.AdvancedSearchDropDownServTypeServDetails.flxSearchCancel.onClick = function () {
      self.view.AdvancedSearchDropDownServTypeServDetails.tbxSearchBox.text = "";
      self.entitySearchDetails1();
    }
     this.view.AdvancedSearchDropDownServType.sgmentData.widgetDataMap = widgetMap;
 this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.widgetDataMap = widgetMap;
   this.view.AdvancedSearchDropDownServType.sgmentData.setData(statusData);
  this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setData(statusData1);
      
    this.view.AdvancedSearchDropDownServType.sgmentData.info = {
      "data": statusData
    };

   this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.info = {
      "data": statusData1
    };
   this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
   this.view.AdvancedSearchDropDownServType.sgmentData.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
    var flxGroupListVisibility = this.view.flxGroupList.isVisible;
    var flxNoGroupsVisibility = this.view.flxNoGroups.isVisible;
    this.hideAll();
    this.advanceSelectionFlag = kony.sdk.isNullOrUndefined(kony.adminConsole.utils.clientProperties.ADVANCED_FEATURE_SELECTION)===true? "true":kony.adminConsole.utils.clientProperties.ADVANCED_FEATURE_SELECTION.toLowerCase();
    this.view.subHeader.tbxSearchBox.text = "";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.view.subHeader.lbxPageNumbers.selectedKey = "lbl1";
    this.view.flxMain.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.subHeader.tbxSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.configurations.searchByServiceDefinition");
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.serviceDefinition");
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.flxGroupList.setVisibility(flxGroupListVisibility);
    this.view.flxNoGroups.setVisibility(flxNoGroupsVisibility);
    this.view.flxStatusFilter.setVisibility(false);
    this.view.flxTypeFilter.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
    if(this.advanceSelectionFlag==="false"){
      this.view.btnAdvancedSelection.setVisibility(false);
      this.view.featureAndActions.btnSelection.setVisibility(false);
      this.view.featureAndActions.btnAdvancedSelection.setVisibility(false);
      this.view.featureAndActions.btnAddPermission.right="20dp";
      this.view.flxButtons.left="180dp";
    }
    this.view.featureAndActions.subHeader.flxSubHeader.skin = "slFbox";
    this.selectedLegalEntityCurrency = this.legalEntityList[0].baseCurrency;
    this.currencyValue = this.defaultCurrencyCode(this.selectedLegalEntityCurrency,true);
    // this.view.AdvancedSearchDropDownServType.sgmentData.height = (40 * records.length) + "dp";
    // this.view.AdvancedSearchDropDownServType.sgmentData.onRowClick = this.segRowClick;
   
    this.view.AdvancedSearchDropDownServType.tbxSearchBox.onKeyUp = this.entitySearch.bind(this); 
    
   this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.onRowClick = this.segRowClick1.bind(this);
   this.view.AdvancedSearchDropDownServTypeServDetails.tbxSearchBox.onKeyUp = this.entitySearchDetails1.bind(this); 
    if (this.isSingleEntity) {
      this.view.flxSearchDownImgServType.setVisibility(false);
      this.view.lblSelectedRowsServType.skin = "sknLbl485C75LatoRegular13Px";
      this.view.flxDropDownServType.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      this.view.flxDropDownServType.onClick = function () {
        self.view.AdvancedSearchDropDownServType.setVisibility(false);
      }
    }
this.view.forceLayout();
  },
  
  /* Function for  enabling and disabling drop down*/
  toggleDropdown: function () {
    if (this.view.flxDropDownDetailServType.isVisible) {
      this.view.flxDropDownDetailServType.setVisibility(false);
        
//this.view.lblSelectedRowsMultipleEntity.text = "";
    } else {
      this.view.flxDropDownDetailServType.setVisibility(true);
       
      // this.view.lblSelectedRowsMultipleEntity.text = "";
    }
  },
toggleDropdownInside: function () {
    if (this.view.flxDropDownDetailServTypeServDetails.isVisible) {
      this.view.flxDropDownDetailServTypeServDetails.setVisibility(false);
        
//this.view.lblSelectedRowsMultipleEntity.text = "";
    } else {
      this.view.flxDropDownDetailServTypeServDetails.setVisibility(true);
      this.view.AdvancedSearchDropDownServTypeServDetails.flxDropDown.top= "43px";
      this.view.flxDropDownServTypServDetails.zIndex = "205";
      // this.view.lblSelectedRowsMultipleEntity.text = "";
    }
  },
  /* function for selecting the row in segment*/
  segRowClick: function (rowObject) {
    const selectedData = this.view.AdvancedSearchDropDownServType.sgmentData.selectedRowItems[0];
      // const selectedData = this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.selectedRowItems[0];
    this.view.flxDropDownDetailServType.setVisibility(false);
    this.view.lblSelectedRowsServType.text = rowObject.companyName;
    this.currencyValue = this.defaultCurrencyCode(rowObject.baseCurrency,true);
    this.selectedLegalEntity = rowObject.id;
    this.getAllGroups();
  },
  segRowClick1: function (rowObject) {
    this.view.lstBoxType.selectedKey = "select";
    const selectedData = this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.selectedRowItems[0];
    this.view.flxDropDownDetailServTypeServDetails.setVisibility(false);
    this.view.lblSelectedRowsServTypeServDetails.text = rowObject.companyName;
    this.currencyValue = this.defaultCurrencyCode(rowObject.baseCurrency,true);
    this.createRequestParam.legalEntityId = rowObject.id;
    this.createRequestParam.serviceType="";
    this.view.lstBoxType.setEnabled(true);
    this.presenter.getGroups(this.createRequestParam);
    //this.view.lblSelectedRowsServTypeServDetails.text = selectedData.lblDescription;
  },
   /*function for searching the entity in the drop down*/
  
  entitySearch: function(){
    // scopeObj.view.AdvancedSearchDropDownServType.sgmentData.setData(segData);
    if (this.view.AdvancedSearchDropDownServType.tbxSearchBox.text.trim().length > 0) {
      this.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(true);
      // var segData=entityData;
      var segData = this.view.AdvancedSearchDropDownServType.sgmentData.data;
      var searchText = this.view.AdvancedSearchDropDownServType.tbxSearchBox.text.toLowerCase();
      var statusName = "";
      var filteredData = segData.filter(function(rec) {
        statusName = rec.lblDescription.toLowerCase();
        if (statusName.indexOf(searchText) >= 0) return rec;
      });
      if (filteredData.length === 0) {
        this.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(false);
        this.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(true);
      } else {
        this.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
        this.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
        this.view.AdvancedSearchDropDownServType.sgmentData.setData(filteredData);
        
      }
    } else {
      this.view.AdvancedSearchDropDownServType.richTexNoResult.setVisibility(false);
        this.view.AdvancedSearchDropDownServType.sgmentData.setVisibility(true);
      this.view.AdvancedSearchDropDownServType.flxSearchCancel.setVisibility(false);
      var totalRecords = this.view.AdvancedSearchDropDownServType.sgmentData.info.data;
      this.view.AdvancedSearchDropDownServType.sgmentData.setData(totalRecords);
    }

  },
entitySearchDetails1: function(){
    // scopeObj.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setData(segData);
    if (this.view.AdvancedSearchDropDownServTypeServDetails.tbxSearchBox.text.trim().length > 0) {
      this.view.AdvancedSearchDropDownServTypeServDetails.flxSearchCancel.setVisibility(true);
      // var segData=entityData;
      var segData = this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.data;
      var searchText = this.view.AdvancedSearchDropDownServTypeServDetails.tbxSearchBox.text.toLowerCase();
      var statusName = "";
      var filteredData = segData.filter(function(rec) {
        statusName = rec.lblDescription.toLowerCase();
        if (statusName.indexOf(searchText) >= 0) return rec;
      });
      if (filteredData.length === 0) {
        this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setVisibility(false);
        this.view.AdvancedSearchDropDownServTypeServDetails.richTexNoResult.setVisibility(true);
      } else {
        this.view.AdvancedSearchDropDownServTypeServDetails.richTexNoResult.setVisibility(false);
        this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setVisibility(true);
        this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setData(filteredData);
        
      }
    } else {
        this.view.AdvancedSearchDropDownServTypeServDetails.richTexNoResult.setVisibility(false);
        this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setVisibility(true);
        this.view.AdvancedSearchDropDownServTypeServDetails.flxSearchCancel.setVisibility(false);
        var totalRecords = this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.info.data;
        this.view.AdvancedSearchDropDownServTypeServDetails.sgmentData.setData(totalRecords);
    }

  },
  showAddGroupDetails: function() {
    var self = this;
    this.hideAll();
    this.hideAllGroups();
    this.view.flxAddGroups.setVisibility(true);
    this.view.flxGroupDetails.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.switchStatus.skin = "sknSwitchServiceManagement";
	this.view.flxDropDownDetailServTypeServDetails.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.ServicesList");
    if(this.isSingleEntity){

      this.view.flxSearchDownImgServTypeServDetails.isVisible = false;
      this.view.lblSelectedRowsServTypeServDetails.text = this.data[0].companyName;
      this.view.lblSelectedRowsServTypeServDetails.skin= "sknLbl485C75LatoRegular13Px";
      this.view.flxDropDownServTypServDetails.skin = "sknFlxbgF3F3F3bdrd7d9e0";
      this.view.flxDropDownServTypServDetails.onClick = function() {
        self.view.AdvancedSearchDropDownServTypeServDetails.setVisibility(false);
      }
    }
    var listBoxData = [
      ['select', kony.i18n.getLocalizedString("i18n.AddServiceDef.SelectServiceType")],
      [this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.RetailBanking")],
      [this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE, kony.i18n.getLocalizedString("i18n.frmCustomerManagement.BusinessBanking")],
      [this.AdminConsoleCommonUtils.constantConfig.WEALTH_TYPE, kony.i18n.getLocalizedString("i18n.frmGroupsController.WealthBanking")]
    ];
    this.setLeftMenu(this.view.verticalTabs.btnOption1, this.view.verticalTabs.flxImgArrow1);
    this.view.lstBoxType.masterData = listBoxData;
    this.view.lstBoxType.selectedKey = "select";
    this.view.tbxGroupNameValue.skin = "skntbxLato35475f14px";
    this.view.txtGroupDescription.skin = "skntxtAreaLato35475f14Px";
    this.view.lstBoxType.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    this.view.flxNoGroupNameError.setVisibility(false);
    this.view.flxNoGroupDescriptionError.setVisibility(false);
    this.view.flxTypeError.setVisibility(false);
    this.getAccessPolicies();
    this.view.verticalTabs.flxOption5.setVisibility(false);
    this.view.verticalTabs.flxOption4.setVisibility(false);
    this.view.lstBoxType.setEnabled(false);
    if (this.groupsCurrAction === this.groupActionConfig.EDIT){ //Edit - disabling
      this.view.lstBoxType.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
      this.view.lstBoxType.hoverSkin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
      this.view.breadcrumbs.lblCurrentScreen.text = this.actionConfig.edit;
//       this.view.lstBoxType.setEnabled(false);
    }else if (this.groupsCurrAction === this.groupActionConfig.CREATE) { //Create - enabling  
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.NEW");
//       this.view.lstBoxType.setEnabled(true);
      if(this.isSingleEntity){
        this.view.lstBoxType.setEnabled(true);
      }
      this.view.tbxGroupNameValue.text = "";
      this.view.txtGroupDescription.text = "";
      this.view.switchStatus.selectedIndex = 0;
    }
    this.view.flxScrollAssignLimits.removeAll();
    //as without forcelayout first time we will not get the frame width
    this.view.forceLayout();
    var widthOfFlxgroupDetails = this.view.flxGroupDetails.frame.width;
    //added this forcelayout to force the width changes at runtime
    this.view.forceLayout();
  },

  showGroupUIChanges : function(){
    //this.hideAll();
    //this.view.flxGroupList.setVisibility(true);
    this.view.mainHeader.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.subHeader.flxMenu.left = "0dp";
    this.view.subHeader.flxSearch.right = "0dp";
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
  },


  viewServiceDefinition : function(){
    kony.adminConsole.utils.showProgressBar(this.view);
    var currentIndex=this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var data=this.view.listingSegmentClient.segListing.data;
    var legalEntities=this.getLEListForFormAction("frmServiceDefinition",'UPDATE');
    var legalEntities1=this.getLEListForFormAction("frmServiceDefinition",'DELETE');
   
    for(var i=0; i<legalEntities.length; i++){
      if(legalEntities[i].companyName.indexOf(this.view.lblSelectedRowsServType.text) === 0){
        this.view.contextualMenu1.flxOption1.isVisible=true;
        this.view.contextualMenu1.flxOption4.isVisible=true;
       break;
      }
      else{
        this.view.contextualMenu1.flxOption1.isVisible=false;
        this.view.contextualMenu1.flxOption4.isVisible=false;
        this.view.flxRolesEdit.isVisible=false;
      }
    }
     for(var i=0; i<legalEntities1.length; i++){
      if(legalEntities1[i].companyName.indexOf(this.view.lblSelectedRowsServType.text) === 0){
        this.view.contextualMenu1.flxOption3.isVisible=true;
       break;
      }
       
      else{
        this.view.contextualMenu1.flxOption3.isVisible=false;
      }
     }
      if( this.view.contextualMenu1.flxOption3.isVisible===false&& this.view.contextualMenu1.flxOption1.isVisible===false&& this.view.contextualMenu1.flxOption4.isVisible===false){
         this.view.flxOptions1.isVisible=false;
        // this.view.associatedRoles.btnChangeDefaultRole.isVisible=false;
        this.view.flxRolesEdit.isVisible=false;
      }
      
    this.hideAll();
    this.view.toastMessage.hideToastMessage (this);
    this.view.flxLimits.removeAll();
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.configurations.ServicesList");
    this.view.breadcrumbs.lblCurrentScreen.text = (data[currentIndex].lblGroupName.text).toUpperCase();
    this.view.lblName.text=data[currentIndex].lblGroupName.text;
    this.view.lblServiceTypeValue.text=data[currentIndex].lblGroupBusinessType.text;
    this.view.lblServiceDescriptionValue.text=data[currentIndex].lblDescriptionValue.text;
    this.view.lblStatusIcon.skin= data[currentIndex].fontIconGroupStatus.skin;
    this.view.lblStatus.text=data[currentIndex].lblGroupStatus.text;
    if (this.view.lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.contextualMenu1.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.contextualMenu1.lblIconOption4.text= "\ue91c";
    } else {
      this.view.contextualMenu1.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.contextualMenu1.lblIconOption4.text= "\ue931";
    }
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);  
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
    this.showFeaturesAndActions();
    this.view.flxViewServiceDef.setVisibility(true);
  },

  showFeaturesAndActions: function() {
    var self = this;
    this.view.lblTabName1.skin = 'sknLblTabUtilActive';
    this.view.lblTabName2.skin = 'sknLblTabUtilRest';
    this.view.lblTabName3.skin = 'sknLblTabUtilRest';
    this.view.flxAssociatedRoles.setVisibility(false);
    this.view.flxLimits.setVisibility(false);
    /*if(this.view.flxDynamicFeaturesAndActionsList.children.length>0)
      this.view.flxDynamicFeaturesAndActionsList.setVisibility(true);
    else
    {*/
    var servicedefId = this.getSelectedServiceDefId();    
    self.presenter.fetchFeaturesAndActions({
      "serviceDefinitionId": servicedefId
    });
    // }
  },

  getSelectedServiceDefId: function() {
    var self = this;
    var selRow = self.view.listingSegmentClient.segListing.selectedRowIndex;
    var groupId = "";
    if (selRow) groupId = self.view.listingSegmentClient.segListing.data[selRow[1]].id;
    else groupId = null;
    return groupId;
  },

  setDefaultRoleSelected : function(){
    var currentIndex=this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var row=this.view.listingSegmentClient.segListing.data[currentIndex];  
    this.roleIdSelected=row.defaultRole;
  },

  showAssociatedRoles: function(action) {
    this.view.lblTabName3.skin = 'sknLblTabUtilActive';
    this.view.lblTabName1.skin = 'sknLblTabUtilRest';
    this.view.lblTabName2.skin = 'sknLblTabUtilRest';
    this.view.segViewServiceDefFA.setVisibility(false);
    this.view.flxLimits.setVisibility(false);
    var id=this.getSelectedServiceDefId();
    var payload= {
      "serviceDefinitionId": id
    };
    this.presenter.getAssociatedRoles(payload,action);
  },

  viewLimits: function() {
    this.view.lblTabName2.skin = 'sknLblTabUtilActive';
    this.view.lblTabName1.skin = 'sknLblTabUtilRest';
    this.view.lblTabName3.skin = 'sknLblTabUtilRest';
    this.view.segViewServiceDefFA.setVisibility(false);
    this.view.flxAssociatedRoles.setVisibility(false);
    this.view.flxLimits.setVisibility(true);
  },

  viewFeaturesActionList: function(response) {
    var self = this;
    var featuresList= response.features;
    var limitsList = self.filterForMonetaryFeatures(JSON.stringify(response.features));
    self.getMoreDataModel = {
      "PAGE_OFFSET": 0
    };
    document.getElementById("frmServiceDefinition_flxGroupViewServiceDef").onscroll = this.appendMoreOnEndForViewFeatures;
    self.view.lblTabName1.info={"features":featuresList,"limits":limitsList };
    if (featuresList.length > 0) {
      self.view.segViewServiceDefFA.setData([]);
      self.view.flxLimits.removeAll();
      self.setDynamicFeatures(0, 10);
      if(limitsList.length > 0)
        self.setDynamicLimitsView(0, 10);
      self.getMoreDataModel.PAGE_OFFSET = 10;
      self.view.segViewServiceDefFA.setVisibility(true);
    } else {
      self.view.segViewServiceDefFA.setVisibility(false);
    }
    this.view.flxLimits.setVisibility(false);
    self.view.forceLayout();
  },
  filterForMonetaryFeatures : function(features){ 
    var monetaryFeatures =[];
    var allFeatures = JSON.parse(features);
    for(var i=0; i<allFeatures.length; i++){
      var monetaryActions = [];
      for(var j=0; j<allFeatures[i].actions.length; j++){
        if(allFeatures[i].actions[j].limits){
          monetaryActions.push(allFeatures[i].actions[j]);
        }
      }
      allFeatures[i].actions = monetaryActions;
      if(monetaryActions.length > 0){
        monetaryFeatures.push(allFeatures[i]);
      } 
    }
    return monetaryFeatures;
  },
  appendMoreOnEndForViewFeatures: function(context){
    var self = this;
    var offsetHeight = Math.ceil(context.currentTarget.offsetHeight);
    var scrollTop = Math.ceil(context.currentTarget.scrollTop);
    var scrollHeight = Math.ceil(context.currentTarget.scrollHeight);
    if( offsetHeight + scrollTop >= scrollHeight - offsetHeight -50 && offsetHeight + scrollTop <= scrollHeight) {
      var featuresToAppend;
      //features tab
      if(this.view.lblTabName1.skin === "sknLblTabUtilActive"){
        featuresToAppend= self.view.lblTabName1.info.features;
        if(self.getMoreDataModel.PAGE_OFFSET < featuresToAppend.length){
          self.setDynamicFeatures(self.getMoreDataModel.PAGE_OFFSET,self.getMoreDataModel.PAGE_OFFSET + 10);
          self.getMoreDataModel.PAGE_OFFSET = self.getMoreDataModel.PAGE_OFFSET + 10;
        }
      } //limits tab 
      else if(this.view.lblTabName2.skin === "sknLblTabUtilActive"){
        featuresToAppend= self.view.lblTabName1.info.limits;
        if(self.getMoreDataModel.PAGE_OFFSET < featuresToAppend.length){
          self.setDynamicLimitsView(self.getMoreDataModel.PAGE_OFFSET,self.getMoreDataModel.PAGE_OFFSET + 1);
          self.getMoreDataModel.PAGE_OFFSET = self.getMoreDataModel.PAGE_OFFSET + 1;
        }
      }

    }
  },
  /*
  * sets paginated record to service definition view features segment
  * @param: start ind, end ind
  */
  setDynamicFeatures: function(start, end) {
    var self = this;
    var c = this.getMoreDataModel.PAGE_OFFSET;
    var flag = false;
    var features = self.view.lblTabName1.info.features;
    if(end >= features.length)
      end = features.length;
    self.setViewServiceDefFeatureSegData(start,end);
    for (var i = start; i < end; i++) {
      flag =true;
      c=c+1;
    }
    if(flag === false && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.segViewServiceDefFA.setVisibility(false);
    }else if (flag === true && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.segViewServiceDefFA.setVisibility(true);
    }
    self.view.forceLayout();
  },
  /*
  * set paginated record to cust roles view features segment
  * @param: start ind, end ind
  */
  setViewServiceDefFeatureSegData : function(start,end){
    var self =this;
    this.view.segViewServiceDefFA.widgetDataMap = this.getWidgetMapServiceDefFASeg();
    var actualData =[],segData =[];
    var featuresData = self.view.lblTabName1.info.features;
    for (var j = start; j < end; j++) {
      var rowsData = [], selRowCount =0;
      var actions = featuresData[j].actions;
      for(var i=0; i<actions.length; i++){
        rowsData.push({
          "id":actions[i].id,
          "featureId":featuresData[j].id,
          "isSelected": actions[i].isSelected,
          "flxContractEnrollFeaturesEditRow":{"isVisible":false,
                                              "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
          "flxFeatureNameCont":{"left":"40dp"},
          "flxCheckbox":{"isVisible": false},
          "lblFeatureName":{"text": actions[i].name,
                            "tag": actions[i].accessPolicy, "left":"0px"},
          "lblIconStatus":{"text":"\ue921",
                           "skin":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
          "lblStatus":{"text":actions[i].actionStatus === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                       kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
          "dependentActions": actions[i].dependentActions,
          "template":"flxContractEnrollFeaturesEditRow",
        });
      }
      if(rowsData.length >= 1)
        rowsData[rowsData.length -1].flxFeatureNameCont.bottom = "10dp";
      var sectionData = {
        "id": featuresData[j].id,
        "actions": featuresData[j].actions,
        "isSelected":  featuresData[j].isSelected,
        "flxHeaderContainer":{"isVisible":false},
        "flxActionsHeaderContainer":{"isVisible":false},
        "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px"},
        "lblFeatureName": {"text":  featuresData[j].name},
        "flxToggleArrow": {"onClick": self.toggleServiceDefFARows.bind(self,self.view.segViewServiceDefFA,2)},
        "lblIconToggleArrow":{"text":"\ue922","skin":"sknIcon00000015px"},
        "lblAvailableActions":{"text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon")},
        "lblCountActions":{"text": self.getTwoDigitNumber(rowsData.length)},
        "lblTotalActions":{"text":" of "+  self.getTwoDigitNumber(rowsData.length)},
        "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
        "lblActionSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
        "flxActionCheckbox":{"isVisible":false},
        "flxRight":{"isVisible":true},
        "lblIconStatus":{"text":"\ue921",
                         "skin": featuresData[j].status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblStatusValue":{"text": featuresData[j].status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                          kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "flxActionNameHeading":{"left":"40dp"},
        "lblActionName":{"text":"ACTION","left":"0px"},
        "lblActionStatus":{"text":"STATUS"},
        "template":"flxEnrollSelectedAccountsSec"
      };
      var secData = [sectionData, rowsData]
      this.view.segViewServiceDefFA.addSectionAt([secData], j);
    }  
    this.view.segViewServiceDefFA.setVisibility(true);
  },
  setDynamicLimitsView: function(start, end) {
    var self = this;
    var c = this.getMoreDataModel.PAGE_OFFSET;
    var flag = false;
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var features= self.view.lblTabName1.info.limits;
    if(end >= features.length)
      end = features.length;
    for (var i = start; i < end; i++) {
      flag = true;
      var collapsibleSegmentToAddLimit = new com.adminConsole.common.assignLimits({
        "id": "limitRow" +c,
        "isVisible": true,
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "top": "20px"
      }, {}, {});
      self.view.flxLimits.add(collapsibleSegmentToAddLimit);
      self.setLimitsData(features[i], collapsibleSegmentToAddLimit);        
      c=c+1;
      if(i === (features.length-1))
        kony.adminConsole.utils.hideProgressBar(this.view);
    }
    if(flag === false && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.flxLimits.setVisibility(false);
    }else if (flag === true && (this.getMoreDataModel.PAGE_OFFSET === 0)){
      this.view.flxLimits.setVisibility(true);
    }
    self.view.forceLayout();
  },	

  toggleFeaturesonClick : function(collapsibleSegmentToAdd){
    var scopeObj = this;
    collapsibleSegmentToAdd.flxToggle.onClick= function(){
      collapsibleSegmentToAdd.toggleContent();
      scopeObj.view.forceLayout();
    };
  },	

  setLimitsData: function(feature,collapsibleSegmentToAdd) {
    var actions = feature.actions;
    var self = this;
    var dataMap = {
      "lblActionName": "lblActionName",
      "tbxLimitValue1": "tbxLimitValue1",
      "tbxLimitValue2": "tbxLimitValue2",     
      "tbxLimitValue3": "tbxLimitValue3",      
      "flxLimitValue1": "flxLimitValue1",
      "flxLimitValue2": "flxLimitValue2",
      "flxLimitValue3": "flxLimitValue3",
      "lblCurrencySymbol1": "lblCurrencySymbol1",
      "lblCurrencySymbol2": "lblCurrencySymbol2",
      "lblCurrencySymbol3": "lblCurrencySymbol3",
      "template" : "template"
    };
    var data = actions.filter(function(rec) {
      if (rec.limits !== undefined) {
        return rec;
      }
    });
    data=data.map(function(rec)  { 
      var maplimits; 
      maplimits = rec.limits.reduce(function(maplimits, obj) {
        maplimits[obj.id] = obj.value;
        return maplimits;

      },{});
      return {
        "lblActionName": rec.name || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        "flxLimitValue1": {
          "skin" : "flxTranspSknNormal",
        },
        "flxLimitValue2": {
          "skin" : "flxTranspSknNormal",
        },
        "flxLimitValue3": {
          "skin" : "flxTranspSknNormal",
        },
        "lblCurrencySymbol1": self.currencyValue,
        "lblCurrencySymbol2": self.currencyValue,
        "lblCurrencySymbol3": self.currencyValue,
        "tbxLimitValue1": {
          "enable": false,
          "text" : maplimits.MAX_TRANSACTION_LIMIT === undefined ? kony.i18n.getLocalizedString("i18n.Applications.NA") : maplimits.MAX_TRANSACTION_LIMIT
        },
        "tbxLimitValue2": {
          "enable": false,
          "text" : maplimits.DAILY_LIMIT === undefined ? kony.i18n.getLocalizedString("i18n.Applications.NA") : maplimits.DAILY_LIMIT
        },
        "tbxLimitValue3": {
          "enable": false,
          "text" : maplimits.WEEKLY_LIMIT === undefined ? kony.i18n.getLocalizedString("i18n.Applications.NA") : maplimits.WEEKLY_LIMIT
        },
        "template": "flxActionsLimits"
      };
    });
    collapsibleSegmentToAdd.SegActionsLimits.widgetDataMap = dataMap;
    collapsibleSegmentToAdd.SegActionsLimits.setData(data);
    collapsibleSegmentToAdd.SegActionsLimits.setVisibility(true);
    collapsibleSegmentToAdd.lblFeatureName.text = feature.name;
    collapsibleSegmentToAdd.featureStatus.text = (feature.status === "SID_FEATURE_ACTIVE" )?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    collapsibleSegmentToAdd.featureStatusIcon.skin = (feature.status === "SID_FEATURE_ACTIVE")?"sknFontIconActivate":"sknfontIconInactive";
    collapsibleSegmentToAdd.flxDefaultInfo1.onHover = function(widget, context) {
      var info = "This is per transaction value for " + collapsibleSegmentToAdd.lblFeatureName.text + " submitted over the online banking channel.";
      self.onHoverCallBack(widget, context, collapsibleSegmentToAdd, info);
    };
    collapsibleSegmentToAdd.flxDefaultInfo2.onHover = function(widget, context) {
      var info = "This is daily transaction value for " + collapsibleSegmentToAdd.lblFeatureName.text + " submitted over the online banking channel.";
      self.onHoverCallBack(widget, context, collapsibleSegmentToAdd, info);
    };
    collapsibleSegmentToAdd.flxDefaultInfo3.onHover = function(widget, context) {
      var info = "This is weekly transaction value for " + collapsibleSegmentToAdd.lblFeatureName.text + " submitted over the online banking channel.";
      self.onHoverCallBack(widget, context, collapsibleSegmentToAdd, info);
    };
    this.view.forceLayout();
  },

  setViewLimits : function(limits){
    var map;
    if(limits === undefined || limits === null)
      map="";
    else{
      map= limits.reduce(function(map, obj) {
        map[obj.id] = obj.value;
        return map;
      }, {});
    }
    this.view.lblMaxValue12.text = map.MAX_TRANSACTION_LIMIT=== undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+map.MAX_TRANSACTION_LIMIT);
    this.view.lblMaxDailyLimitValue21.text = map.DAILY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+map.DAILY_LIMIT);
    this.view.lblWeeklyLimitValue22.text = map.WEEKLY_LIMIT===undefined?kony.i18n.getLocalizedString("i18n.Applications.NA"):(this.currencyValue+" "+map.WEEKLY_LIMIT);
    this.view.flxViewLimitsPopup.setVisibility(true);
    this.view.forceLayout();
  },

  showViewAssociatedRolesUi: function(roles){
    this.view.btnChangeDefaultRole.skin = "sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
    this.view.btnChangeDefaultRole.hoverSkin = "sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
    this.setDataForRolesSegment(roles);
    this.view.flxRoleUndoHeader.setVisibility(false);
    this.view.flxCommonButtonsRolesSave.setVisibility(false);
    this.view.flxAssociatedRoles.bottom="0px";    
    this.view.forceLayout();
  },
  showEditAssociatedRolesUi: function(roles){ 
    this.setDataForRolesSegment(roles);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.btnChangeDefaultRole.setVisibility(false);
    this.view.flxRoleUndoHeader.setVisibility(true);
    this.view.flxCommonButtonsRolesSave.setVisibility(true);
    this.view.forceLayout();
  },

  setDataForRolesSegment : function(roles){
    var self = this;
    var dataMap = {
      "flxAssociatedRoles": "flxAssociatedRoles",
      "flxRoleNameContainer": "flxRoleNameContainer",
      "flxRoleCheckbox": "flxRoleCheckbox",
      "imgRoleCheckbox": "imgRoleCheckbox",
      "flxRoleInfo": "flxRoleInfo",
      "lblRoleName": "lblRoleName",
      "lblRoleDesc": "lblRoleDesc",
      "btnViewDetails": "btnViewDetails",
      "flxRoleRadio":"flxRoleRadio",
      "imgRoleRadio": "imgRoleRadio",
      "flxDefaultRoleButton" : "flxDefaultRoleButton"
    };
    var data = [];
    var toAdd;
    var height = kony.os.deviceInfo().screenHeight;
    if (roles.length > 0) {
      self.view.flxResults.setVisibility(true);
      self.view.flxNoAssociatedRolesAvailable.setVisibility(false);
      for (var i = 0; i < roles.length; i++) {
        toAdd = {
          "flxCustomerProfileRoles": "flxCustomerProfileRoles",
          "flxRoleNameContainer": "flxRoleNameContainer",
          "flxRoleCheckbox": {"isVisible":false},
          "imgRoleCheckbox": "imgRoleCheckbox",
          "flxRoleInfo": "flxRoleInfo",
          "lblRoleName": roles[i].name,
          "lblRoleDesc": roles[i].description,
          "btnViewDetails": {"text":"View Details","isVisible":true},
          "template": "flxCustomerProfileRoles",
          "id": roles[i].id,
          "imgRoleRadio": {"src": self.isRoleSelected(roles[i])},
          "flxRoleRadio": {"isVisible":(self.actionConfig.edit===self.currentAction)},
          "flxDefaultRoleButton":{"isVisible":self.roleIdSelected===roles[i].id}
        };
        if(self.roleIdSelected===roles[i].id)
          self.roleNameSelected=roles[i].name;
        self.onClickActionRoleSegment(toAdd,roles[i],null);
        data.push(toAdd);
      }
      this.view.segAssociatedRoles.widgetDataMap = dataMap;
      this.view.segAssociatedRoles.setData(data);
      this.view.segAssociatedRoles.info = {
        "data": data,
        "searchAndSortData": data
      };  
      self.view.flxResults.setVisibility(true);
      self.view.flxAssociatedRoles.setVisibility(true);
      self.view.btnChangeDefaultRole.setVisibility(true);
    }else{
      self.view.flxResults.setVisibility(false);
      if(self.actionConfig.view === self.currentAction){
        self.view.flxAssociatedRoles.setVisibility(true);
        self.view.flxNoAssociatedRolesAvailable.setVisibility(true);
        self.view.btnChangeDefaultRole.setVisibility(false);
        self.view.flxNoAssociatedRolesAvailable.height=height-142-10-148-51-25+"px";
        self.view.flxAssociatedRoles.bottom="0px";
      }
      else{
        self.view.flxAssociatedRoles.setVisibility(false);
      }
    }
    this.view.forceLayout();
  }, 

  onClickActionRoleSegment : function(toAdd,group,comp){
    var self=this;
    var component = comp;
    toAdd.btnViewDetails.onClick=function(){
      self.view.lblFeatureName.text= group.name || group.Group_Name;
      self.view.lblViewRoleDescriptionValue.text= group.description || group.Group_Desc;
      var inputReq= {
        "group_id":group.Group_id || group.id
      }
      self.presenter.getGroupFeatureActions(inputReq);
    };
    toAdd.flxRoleRadio.onClick=function(){
      self.toggleRadio(component);
    };
  },

  toggleRadio : function(component){
    var self=this;
    var segment;
    if(component==null )
      segment = self.view.segAssociatedRoles;
    else if(component === "associatedRoles")
      segment = self.view.associatedRoles.segAssociatedRoles;
    var index = segment.selectedIndex;
    var rowIndex = index[1];
    var data = segment.data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].imgRoleRadio.src === "radio_selected.png") data[i].flxDefaultRoleButton.isVisible = false;
      data[i].imgRoleRadio.src = "radio_notselected.png";
    }
    data[rowIndex].imgRoleRadio.src = "radio_selected.png";
    data[rowIndex].flxDefaultRoleButton.isVisible = true;
    self.selectedRoleIndex=rowIndex;
    if(self.groupsCurrAction === self.groupActionConfig.CREATE)
      self.createRequestParam.defaultRole=data[rowIndex].id;
    else if(self.groupsCurrAction === self.groupActionConfig.EDIT)
      self.createRequestParam.defaultRole=data[rowIndex].id;
    segment.setData(data);
    self.view.forceLayout();
  },

  toggleEditRoles :  function(flag){
    this.view.flxRolesEdit.setVisibility(!flag);
    this.view.flxRoleUndoHeader.setVisibility(flag);
    this.view.flxCommonButtonsRolesSave.setVisibility(flag);
    // set/reset radio
    var data = this.view.segAssociatedRoles.data;
    var roleId=this.roleIdSelected;
    for(var row=0;row<data.length;row++){
      data[row].flxRoleRadio.isVisible=flag;
      if(roleId===data[row].id){
        data[row].flxDefaultRoleButton.isVisible=true;
        data[row].imgRoleRadio.src = "radio_selected.png";
        this.roleNameSelected=data[row].lblRoleName;
      }
      else if(data[row].imgRoleRadio.src === "radio_selected.png"){
        data[row].flxDefaultRoleButton.isVisible=false;
        data[row].imgRoleRadio.src = "radio_notselected.png";
      }
    }
    if(flag){
      this.view.segAssociatedRoles.height = "470dp";
      this.view.segAssociatedRoles.width = "97%";
    }else{
      this.view.segAssociatedRoles.height = "preferred";
      this.view.segAssociatedRoles.width = "100%";
    }
    this.view.segAssociatedRoles.setData(data);
    this.view.flxAssociatedRoles.bottom="0px";
    this.view.forceLayout();
  },

  isRoleSelected : function(row){
    var roleId=this.roleIdSelected;
    if(roleId === row.id)
    {
      this.roleId;
      return "radio_selected.png";
    }
    else
      return "radio_notselected.png";
  },

  showViewRoleFeaturesList : function(features){
    if(features !== undefined && features.length>0){
      this.view.flxFeaturesList.removeAll();
      for (var i = 0; i < features.length; i++) {
        // Add dynamic companonet
        var ViewRoleFeaturesActionsToAdd = new com.adminConsole.customerRoles.ViewRoleFeaturesActions({
          "id": "dynamicsegment" + i,
          "isVisible": true,
          "masterType": constants.MASTER_TYPE_DEFAULT
        }, {}, {});
        ViewRoleFeaturesActionsToAdd.lblFeatureName.text=features[i].name;
        ViewRoleFeaturesActionsToAdd.statusValue.text=features[i].status === "SID_FEATURE_ACTIVE"?kony.i18n.getLocalizedString("i18n.secureimage.Active"):kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
        ViewRoleFeaturesActionsToAdd.statusIcon.skin=features[i].status === "SID_FEATURE_ACTIVE"?"sknFontIconActivate":"sknfontIconInactive";
        ViewRoleFeaturesActionsToAdd.statusIcon.text="\ue921";
        ViewRoleFeaturesActionsToAdd.lblActionStatus.setVisibility(true);
        ViewRoleFeaturesActionsToAdd.flxFeatureStatus.right="32dp";
        var actions= features[i].actions;
        // mapping actions segment
        var dataMap = {
          "lblActionName": "lblActionName",
          "lblActionDescription": "lblActionDescription",
          "lbActionStatus":"lbActionStatus",
          "lblIconStatus":"lblIconStatus",
          "flxStatus":"flxStatus"
        };
        var data=[];
        var action;
        for (var j = 0; j < actions.length; j++) {
          action = {
            "lblActionName": actions[j].name,
            "lblActionDescription": actions[j].description,
            "lbActionStatus": actions[j].actionStatus === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ? kony.i18n.getLocalizedString("i18n.secureimage.Active"):
            kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
            "lblIconStatus":actions[j].actionStatus === this.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE?
            {"skin":"sknFontIconActivate"} : {"skin":"sknfontIconInactive"},
            "template": "flxRoleDetailsActions",
          };
          data.push(action);
        }
        ViewRoleFeaturesActionsToAdd.SegActions.widgetDataMap = dataMap;
        ViewRoleFeaturesActionsToAdd.SegActions.setData(data);
        this.view.flxFeaturesList.add(ViewRoleFeaturesActionsToAdd);
      }
    }
    this.view.flxRoleClosePopup.onClick = function() {
      this.view.flxViewRolePopup.setVisibility(false);
    }.bind(this);
    this.view.flxViewRolePopup.setVisibility(true);
    this.view.forceLayout();
  },

  updateDefaultRole : function(){ 
    var currentIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var row = this.view.listingSegmentClient.segListing.data[currentIndex];
    var newDefaultRole = this.getSelectedRoleFromSegment().id;
    var payload= {
      "id": row.id,
    };
    if(row.lblNoOfRoles!=="0"){
      payload.defaultRole = newDefaultRole;
    }
    this.view.listingSegmentClient.segListing.data[currentIndex].defaultRole = newDefaultRole;
    this.presenter.updateDefaultRole(payload,this.currentAction);
  },
  getSelectedRoleFromSegment:function(){
    var data = this.view.segAssociatedRoles.data;
    var role={
      name:"",
      id:""
    };
    for(var row=0;row<data.length;row++){
      if(data[row].imgRoleRadio.src === "radio_selected.png"){
        role.name=data[row].lblRoleName;
        role.id=data[row].id;
        break;
      }
    }
    return role;
  },

  expandGroupRowClick : function(){
    var index = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var data = this.view.listingSegmentClient.segListing.data;
    //  var selIndices = this.view.listingSegmentClient.segListing.selectedRowIndices;
    for(var i=0;i<data.length;i++) {
      if(i === index  &&  data[i].template === "flxServicesList") {
        data[i].fonticonArrow.text = "\ue915";
        data[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
        data[i].template = "flxServicesListSelected";
        this.view.listingSegmentClient.segListing.setDataAt(data[i], i);
      }
      else if(data[i].template === "flxServicesListSelected") {
        data[i].fonticonArrow.text = "\ue922";
        data[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
        data[i].template = "flxServicesList";
        this.view.listingSegmentClient.segListing.setDataAt(data[i], i);
      }
    }
  },
  optionButtonStateChange : function(selectedIndex,condition){
    var data = this.view.listingSegmentClient.segListing.data;
    var scopeObj = this;
    if(scopeObj.prevIndex !=-1 && (scopeObj.prevIndex < data.length)){
      var tempDataPrev = data[scopeObj.prevIndex];
      tempDataPrev.flxOptions.skin = "slFbox";
      scopeObj.view.listingSegmentClient.segListing.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
    scopeObj.view.listingSegmentClient.segListing.setDataAt(tempDataCurrent, selectedIndex, 0);
    scopeObj.prevIndex = selectedIndex;
  },
  toggleContextualMenu : function(rowHeight){
    var scopeObj = this;
    var index=this.view.listingSegmentClient.segListing.selectedIndex;  
    this.sectionIndex=index[0];
    var rowIndex=index[1];
    var templateArray = this.view.listingSegmentClient.segListing.clonedTemplates;
    if (this.view.listingSegmentClient.flxContextualMenu.isVisible===false) {
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(true);
      this.optionButtonStateChange(index[1],true);
    }
    else{
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      this.optionButtonStateChange(index[1],false);
    }
    this.view.forceLayout();
    //to caluclate top from preffered row heights
    var finalHeight = 0;
    for(var i = 0; i < rowIndex; i++){
      finalHeight = finalHeight + templateArray[i].flxServicesList.frame.height;
    }
    var flexLeft = this.view.listingSegmentClient.segListing.clonedTemplates[rowIndex].flxOptions.frame.x;
    var data = this.view.listingSegmentClient.segListing.data;
    if (data[rowIndex].lblGroupStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.listingSegmentClient.contextualMenu.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption4.text= "\ue91c";
    } else {
      this.view.listingSegmentClient.contextualMenu.lblOption4.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption4.text= "\ue931";
    }
    var segmentWidget = this.view.listingSegmentClient.segListing;
    var contextualWidget =this.view.listingSegmentClient.contextualMenu;
    finalHeight = ((finalHeight + 45)- segmentWidget.contentOffsetMeasured.y);

    if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
      finalHeight = finalHeight - contextualWidget.frame.height - 34;
      scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(true);
      scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "0px";
    }else{
      finalHeight = finalHeight - 13;
      scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(true);
      scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "-1px";
    }
    this.view.listingSegmentClient.flxContextualMenu.top= finalHeight + "px";

    if(this.view.flxStatusFilter.isVisible){
      this.view.flxStatusFilter.setVisibility(false);
    }
    kony.print(kony.i18n.getLocalizedString("i18n.frmGroupsController.called_in_form_controller"));
  },
  searchFilter: function (Group) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if(typeof searchText === 'string' && searchText.length >0){
      return Group.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    }else{
      return true;
    }
  },
  featureSearch:   function (feature) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.featureAndActions.subHeader.tbxSearchBox.text);
    if (typeof  searchText  ===  'string'  &&  searchText.length  > 0) {
      return  feature.lblFeatureName.toLowerCase().indexOf(searchText.toLowerCase())  !==  -1;
    } else {
      return  true;
    }
  },

  showAdvanceSelectionUI: function() {
    this.hideAllGroups();
    this.view.flxAdvancedSelectionComponent.setVisibility(true);
    this.view.flxAdvSelectionSegCont.setVisibility(true);
    var screenWidth = kony.os.deviceInfo().screenWidth;
    this.view.flxClearSearchImage.onClick();
    if(this.view.segAdvanceSelFeatures.data.length > 0)
      this.updateAdvSelFeaturesData();

    this.view.forceLayout();
  },
  settingAdvanceSelComp: function(){
    this.getMoreDataModelAdvSel = {
      "PAGE_OFFSET": 0
    };
    document.getElementById("frmServiceDefinition_flxAdvSelectionSegCont").onscroll = this.appendMoreRecordsReachingEndAdvSel;
    this.setAdvanceSelectionContent(0, 10, false);
    this.getMoreDataModelAdvSel.PAGE_OFFSET = 10;
  },
  appendMoreRecordsReachingEndAdvSel: function(context){
    var self = this;
    var offsetHeight = Math.ceil(context.currentTarget.offsetHeight);
    var scrollTop = Math.ceil(context.currentTarget.scrollTop);
    var scrollHeight = Math.ceil(context.currentTarget.scrollHeight);
    if (offsetHeight + scrollTop === scrollHeight) {
      var isSearch = self.view.tbxSearchBox.text.length >  0;
      var featuresData = isSearch === false ? self.features : self.view.segAdvanceSelFeatures.info.searchResult;
      if (self.getMoreDataModelAdvSel.PAGE_OFFSET < featuresData.length) {
        self.setAdvanceSelectionContent(self.getMoreDataModelAdvSel.PAGE_OFFSET, self.getMoreDataModelAdvSel.PAGE_OFFSET + 10, isSearch);
        self.getMoreDataModelAdvSel.PAGE_OFFSET = self.getMoreDataModelAdvSel.PAGE_OFFSET + 10;
      }
    }
  },
  /*
  * set paginated record to features advance selection segment
  * @param: start index, end index, isSearch(true/false)
  */
  setAdvanceSelectionContent: function(start, end, isSearch) {
    var featuresData = isSearch === false ? this.features : this.view.segAdvanceSelFeatures.info.searchResult;
    if (end > featuresData.length) {
      end = featuresData.length;
    }
    var actualData =[],featuresList=[];
    this.view.segAdvanceSelFeatures.widgetDataMap = this.getWidgetMapServiceDefFASeg();
    for (var j = start; j < end; j++) {
      var rowsData = this.getMappedAdvSelFeatureActionData(featuresData[j]);
      this.view.segAdvanceSelFeatures.addSectionAt([rowsData], j);
    }
    this.view.forceLayout();
  },
  /*
  * map feature data to segment row
  * @param: feature data obj
  * @return: mapped feature row( [section data,rows arr])
  */
  getMappedAdvSelFeatureActionData : function(featureData){
    var self =this;
    var rowsData =[],actualData=[], selRowCount = 0;
    var actions = featureData.actions;
    for(var i=0; i<actions.length; i++){
      rowsData.push({
        "id":actions[i].id,
        "featureId":featureData.id,
        "isSelected": actions[i].isSelected,
        "flxContractEnrollFeaturesEditRow":{"isVisible":true,
                                            "skin":"sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"},
        "flxFeatureNameCont":{"left":"40dp"},
        "flxCheckbox":{ "onClick":self.onCheckFeatureCheckbox.bind(self,self.view.segAdvanceSelFeatures,false)},
        "imgCheckbox":{"src": (actions[i].isSelected === 1) ? self.AdminConsoleCommonUtils.checkboxSelected : self.AdminConsoleCommonUtils.checkboxnormal},
        "lblFeatureName":{"text": actions[i].name,
                          "tag": actions[i].accessPolicy},
        "lblIconStatus":{"text":"\ue921",
                         "skin":actions[i].status === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
        "lblStatus":{"text":actions[i].status === self.AdminConsoleCommonUtils.constantConfig.ACTION_ACTIVE ?
                     kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
        "dependentActions": actions[i].dependentActions,
        "template":"flxContractEnrollFeaturesEditRow",
      });
      if(actions[i].isSelected === 1){
        selRowCount = selRowCount +1;
      }
    }
    if(rowsData.length >= 1){
      rowsData[rowsData.length -1].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";
      rowsData[rowsData.length -1].flxFeatureNameCont.bottom = "10dp";
    }

    var sectionData = {
      "id": featureData.id,
      "actions": featureData.actions,
      "isSelected":  featureData.isSelected,
      "flxHeaderContainer":{"isVisible":false},
      "flxActionsHeaderContainer":{"isVisible":true},
      "flxAccountSectionCont":{"skin":"sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound"},
      "lblFeatureName": {"text":  featureData.name},
      "flxToggleArrow": {"onClick": self.toggleServiceDefFARows.bind(self,self.view.segAdvanceSelFeatures,1)},
      "lblIconToggleArrow":{"text":"\ue915","skin":"sknIcon00000014px"},
      "lblAvailableActions":{"text": kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.SelectedActionsColon")},
      "lblCountActions":{"text": self.getTwoDigitNumber(selRowCount)},
      "lblTotalActions":{"text":" of "+  self.getTwoDigitNumber(rowsData.length)},
      "lblSectionLine":{"isVisible":false,"text":"-","width":"100%"},
      "lblActionSeperator":{"text":"-","width":"100%","skin":"sknlblSeperatorD7D9E0"},
      "imgActionHeaderCheckbox":{"src": self.getHeaderCheckboxImage(rowsData,true,true)},
      "flxActionCheckbox":{"onClick":self.onCheckFeatureCheckbox.bind(self,self.view.segAdvanceSelFeatures,true),
                           "isVisible":true},
      "flxRight":{"isVisible":true},
      "lblIconStatus":{"text":"\ue921",
                       "skin": featureData.status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ? "sknFontIconActivate" : "sknfontIconInactive"},
      "lblStatusValue":{"text": featureData.status === self.AdminConsoleCommonUtils.constantConfig.FEATURE_ACTIVE ?
                        kony.i18n.getLocalizedString("i18n.permission.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive")},
      "flxActionNameHeading":{"left":"40dp"},
      "lblActionName":{"text":"ACTION"},
      "lblActionStatus":{"text":"STATUS"},
      "template":"flxEnrollSelectedAccountsSec"
    };
    actualData[featureData.featureId] = {"sectionData":sectionData,"rowData":rowsData};
    return [sectionData,rowsData];
  },
  /*
  * check/uncheck checkbox in features/actions
  * @param: segment widget ref, is header(true/false)
  */
  onCheckFeatureCheckbox : function(segmentPath, isHeader,eventObj,context) {
    var selSecInd = context.sectionIndex;
    var segData = segmentPath.data;
    var segSecData = segData[selSecInd][0];
    var rowsData = segData[selSecInd][1];
    var selectedRowsCount = 0;
    //on section checkbox click
    if(isHeader){
      var img = (segSecData.imgActionHeaderCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ?
          this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      segSecData.imgActionHeaderCheckbox.src = img;
      for(var i=0; i<rowsData.length; i++){
        rowsData[i].imgCheckbox.src =img;
        rowsData[i].isSelected = img === this.AdminConsoleCommonUtils.checkboxnormal ? 0 : 1;
        this.addRemoveSelectedFeatureAction(rowsData[i],rowsData[i].isSelected);
      }
      selectedRowsCount = img === this.AdminConsoleCommonUtils.checkboxnormal ? "0" : "" + rowsData.length;
      segSecData.lblCountActions.text = this.getTwoDigitNumber(selectedRowsCount);
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    } 
    //on row checkbox click
    else{ 
      var selInd = segmentPath.selectedRowIndex[1];
      rowsData[selInd].isSelected = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? 1 : 0;
      rowsData[selInd].imgCheckbox.src = (rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal) ? this.AdminConsoleCommonUtils.checkboxSelected : this.AdminConsoleCommonUtils.checkboxnormal;
      if(rowsData[selInd].imgCheckbox.src === this.AdminConsoleCommonUtils.checkboxnormal){
        rowsData = this.deselectDependentActions(rowsData,rowsData[selInd].id);
      } else{
        rowsData = this.selectDependentActions(rowsData,rowsData[selInd].dependentActions);
      }
      this.addRemoveSelectedFeatureAction(rowsData[selInd],rowsData[selInd].isSelected);
      segSecData.imgActionHeaderCheckbox.src = this.getHeaderCheckboxImage(rowsData,true,true);
      selectedRowsCount = this.getSelectedFeatureActionCount(rowsData,"imgCheckbox",false);
      segSecData.lblCountActions.text= selectedRowsCount;
      segmentPath.setSectionAt([segSecData,rowsData],selSecInd);
    }

  },
  /*
   * add/remove features from selected features obj
   * @param:seg row data,category(1:add,0:remove)
   */
  addRemoveSelectedFeatureAction : function(rowData, category){
    var featureActionId = rowData.featureId+ "#"+ rowData.id;
    if(category === 1){
      this.selectedFeatureActionObj[featureActionId] = rowData;
    } else if(category === 0){
      delete this.selectedFeatureActionObj[featureActionId];
    }
  },
  updateAdvSelFeaturesData: function() {
    var scopeObj = this;
    var featureActionId,segData;
    for (var i = 0; i < scopeObj.features.length; i++) {
      var advSelSegData = this.getMappedAdvSelFeatureActionData(scopeObj.features[i]);
      if (advSelSegData && advSelSegData.length >0) {
        var actionData = advSelSegData[1];
        for (var k = 0; k < this.accessPolicies.length; k++) {
          if (this.featureactionmap[i][k] === 1) { //all selected
            for (let j = 0; j < actionData.length; j++) {
              featureActionId= scopeObj.features[i].id+"#"+actionData[j].id;
              if (actionData[j]  && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                  actionData[j].imgCheckbox.src === scopeObj.AdminConsoleCommonUtils.checkboxnormal) {
                actionData[j].imgCheckbox.src = scopeObj.AdminConsoleCommonUtils.checkboxSelected;
                actionData[j].isSelected = 1;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j], 1);
              }
            }
          } else if (this.featureactionmap[i][k] === 2) { //partial selections
            for (let j = 0; j < actionData.length; j++) {
              featureActionId= scopeObj.features[i].id+"#"+actionData[j].id;
              if (actionData[j] && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                  scopeObj.features[i].actions.isSelected === 1){
                actionData[j].imgCheckbox.src = scopeObj.AdminConsoleCommonUtils.checkboxSelected;
                actionData[j].isSelected = 1;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j], 1);
              }
              else if (actionData[j] && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                       scopeObj.features[i].actions.isSelected === 0){ 
                actionData[j].imgCheckbox.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
                actionData[j].isSelected= 0;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j], 0);
              }
            }
          } else if (this.featureactionmap[i][k] === 0) {
            for (let j = 0; j < actionData.length; j++) {
              featureActionId= scopeObj.features[i].id+"#"+actionData[j].id;
              if (actionData[j] && actionData[j].lblFeatureName.tag === this.accessPolicies[k].name &&
                  actionData[j].imgCheckbox.src === scopeObj.AdminConsoleCommonUtils.checkboxSelected) {
                actionData[j].imgCheckbox.src = scopeObj.AdminConsoleCommonUtils.checkboxnormal;
                actionData[j].isSelected = 0;
                scopeObj.addRemoveSelectedFeatureAction(actionData[j],0);
              }
            }
          }
        }
        //update section header count, checkbox img
        advSelSegData[0].lblCountActions.text = scopeObj.getSelectedFeatureActionCount(actionData,"imgCheckbox",false)
        advSelSegData[0].imgActionHeaderCheckbox.src = scopeObj.getHeaderCheckboxImage(actionData,true,true);
        advSelSegData[1] = actionData;
        scopeObj.view.segAdvanceSelFeatures.setSectionAt(advSelSegData, i);
      }
    }
  },

  searchAdvanceSelection: function(){		
    var scopeObj=this;
    var filterdResults =[];
    var searchText= scopeObj.AdminConsoleCommonUtils.getEncodedTextInput(scopeObj.view.tbxSearchBox.text).toLowerCase();
    var len = scopeObj.features.length;
    if(searchText != ""){
      this.view.flxClearSearchImage.setVisibility(true);
    }
    else{
      this.view.flxClearSearchImage.setVisibility(false);
    }
    //clear the seg data, based on search criteria new rows are added
    scopeObj.view.segAdvanceSelFeatures.setData([]);
    if(searchText.length > 0){
      for (var i = 0; i < len; i++) {
        if(scopeObj.features[i].name.toLowerCase().indexOf(searchText)  >= 0){
          filterdResults.push(scopeObj.features[i]);
        }
      }
      var maxLimit = filterdResults.length >= 10 ? 10 :filterdResults.length;
      scopeObj.view.segAdvanceSelFeatures.info = {"searchResult":filterdResults };
      scopeObj.getMoreDataModelAdvSel.PAGE_OFFSET = 10;
      this.view.flxAdvSelectionSegCont.setContentOffset({x:0,y:0});
      scopeObj.setAdvanceSelectionContent(0,maxLimit,true);
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    } else{
      scopeObj.setAdvanceSelectionContent(0, 10,false);
      scopeObj.getMoreDataModelAdvSel.PAGE_OFFSET = 10;
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    }
    this.view.forceLayout();
  },

  searchInRoleSegment: function() {
    var scopeObj = this;
    var features=[];
    var searchText=scopeObj.view.associatedRoles.tbxSearchBox.text;    
    searchText=searchText.replace("<","&lt").replace(">","&gt");
    var segment=scopeObj.view.associatedRoles.flxAssociatedRoles.flxRolesSegment.segAssociatedRoles;
    if(searchText.length>0){
      var requiredData = function (entData) {
        return entData.lblRoleName.toLowerCase().indexOf(searchText) > -1;
      };
      features=this.roleSegment.filter(requiredData);
      if(features.length!==0){
        segment.setData(features);	
        segment.setVisibility(true);
      }
      else
        segment.setVisibility(false);
    }
    else{
      segment.setVisibility(true);
      segment.setData(scopeObj.roleSegment);
    }
    this.view.forceLayout();
  },
  selectDependentActions: function(segData,dependencies){
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<dependencies.length;j++){
        if(segData[i].actionId=== dependencies[j].id && 
           segData[i].imgCheckbox.src=== this.AdminConsoleCommonUtils.checkboxnormal){
          segData[i].imgCheckbox.src = this.AdminConsoleCommonUtils.checkboxSelected;
          segData[i].isSelected = 1;
          this.addRemoveSelectedFeatureAction(segData[i],segData[i].isSelected);
        }
      }      
    }    
    return segData;
  },
  deselectDependentActions: function(segData,actionId){
    for(var i=0;i<segData.length;i++){
      var dependencies=segData[i].dependentActions;
      for(var j=0;j<dependencies.length;j++){
        if(actionId===dependencies[j].id && 
           segData[i].imgCheckbox.src===this.AdminConsoleCommonUtils.checkboxSelected){
          segData[i].imgCheckbox.src=this.AdminConsoleCommonUtils.checkboxnormal;
          segData[i].isSelected = 0;
          this.addRemoveSelectedFeatureAction(segData[i], segData[i].isSelected);
        }
      }      
    }
    return segData;
  },
  setLeftMenu: function(btn, img) {
    var widgetArray = [this.view.verticalTabs.btnOption1, this.view.verticalTabs.btnOption2, this.view.verticalTabs.btnOption3, this.view.verticalTabs.btnOption4,
                       this.view.verticalTabs.btnOption5];
    this.tabUtilVerticleButtonFunction(widgetArray, btn);
    this.tabUtilVerticleArrowVisibilityFunction([this.view.verticalTabs.flxImgArrow1, this.view.verticalTabs.flxImgArrow2,
                                                 this.view.verticalTabs.flxImgArrow3, this.view.verticalTabs.flxImgArrow4, this.view.verticalTabs.flxImgArrow5
                                                ], img);
  },

  showAssignRolesPage: function() {
    this.hideAllGroups();
    this.view.flxAssignRoles.setVisibility(true); 
    var height = kony.os.deviceInfo().screenHeight;
    this.view.associatedRoles.flxRolesSegment.setVisibility(true);
    this.view.associatedRoles.flxRolesSegment.setVisibility(true);
    this.view.associatedRoles.flxAssociatedRoles.setVisibility(true); 
    this.view.associatedRoles.lblSelectedLegalEntity.text= "("+this.view.lblSelectedRowsServTypeServDetails.text +")";
    if(this.groupsCurrAction === this.groupActionConfig.EDIT){ 
      this.view.associatedRoles.toggleEditRoles(false);
      this.roleSegment=this.view.associatedRoles.segAssociatedRoles.data;
      this.setLeftMenu(this.view.verticalTabs.btnOption4, this.view.verticalTabs.flxImgArrow4);     
      this.view.associatedRoles.lblDefaultRole.text = kony.i18n.getLocalizedString("i18n.frmBusinessTypes.label.defaultRoleChange");
      this.view.associatedRoles.backToRolesList.setVisibility(true);
      this.view.associatedRoles.btnUpdate.setVisibility(true);    
      this.view.associatedRoles.btnAdd.setVisibility(false); 
    }
    else{
      this.view.associatedRoles.toggleEditRoles(true);
      this.setLeftMenu(this.view.verticalTabs.btnOption5, this.view.verticalTabs.flxImgArrow4);
      this.view.associatedRoles.lblDefaultRole.text = kony.i18n.getLocalizedString("i18n.ServiceDefinition.SetDefaultRoleLower");
      this.view.associatedRoles.backToRolesList.setVisibility(false);
      this.view.associatedRoles.flxRolesSegment.height = "75%";
      this.view.associatedRoles.flxRoleUndoHeader.setVisibility(false);
      this.view.associatedRoles.flxRolesHeader.setVisibility(true);
      this.view.associatedRoles.btnUpdate.setVisibility(false); 
      this.view.associatedRoles.btnAdd.setVisibility(true);
    }
    this.view.associatedRoles.flxCommonButtons.setVisibility(true);
    this.view.associatedRoles.flxCommonButtonsRolesSave.setVisibility(false);
    this.view.forceLayout();
  },
  setAssignRolesPageData: function(response) {
    var self = this;
    var dataMap = {
      "flxAssociatedRoles": "flxAssociatedRoles",
      "flxRoleNameContainer": "flxRoleNameContainer",
      "flxRoleCheckbox": "flxRoleCheckbox",
      "imgRoleCheckbox": "imgRoleCheckbox",
      "flxRoleInfo": "flxRoleInfo",
      "lblRoleName": "lblRoleName",
      "lblRoleDesc": "lblRoleDesc",
      "btnViewDetails": "btnViewDetails",
      "flxRoleRadio":"flxRoleRadio",
      "imgRoleRadio": "imgRoleRadio",
      "flxDefaultRoleButton" : "flxDefaultRoleButton"
    };
    var data = [];
    var toAdd;    
    for (var i = 0; i < response.length; i++) {
      toAdd = {
        "flxCustomerProfileRoles": "flxCustomerProfileRoles",
        "flxRoleNameContainer": "flxRoleNameContainer",
        "flxRoleCheckbox": {"isVisible":false},
        "imgRoleCheckbox": "imgRoleCheckbox",
        "flxRoleInfo": "flxRoleInfo",
        "lblRoleName": response[i].Group_Name || response[i].name,
        "lblRoleDesc": response[i].Group_Desc || response[i].description,
        "btnViewDetails": {"text":"View Details","isVisible":true},
        "template": "flxCustomerProfileRoles",
        "id": response[i].Group_id || response[i].id,
        "imgRoleRadio": {"src": (i==0)?"radio_selected.png":"radio_notselected.png"},
        "flxRoleRadio": {
          "isVisible": true
        },
        "flxDefaultRoleButton": {
          "isVisible": (self.groupsCurrAction === self.groupActionConfig.EDIT)?
          (response[i].id===self.createRequestParam.defaultRole)?true:false
          :(i===0)?true:false
        }
      };
      if(self.groupsCurrAction === self.groupActionConfig.EDIT && response[i].id===self.createRequestParam.defaultRole)
        this.selectedDefaultIndex=i;
      var component = "associatedRoles";
      data.push(toAdd);
      self.onClickActionRoleSegment(toAdd,response[i],component);     
    }
    this.view.associatedRoles.segAssociatedRoles.widgetDataMap = dataMap;
    this.view.associatedRoles.segAssociatedRoles.setData(data);
    this.view.associatedRoles.segAssociatedRoles.info = {
      "data": data,
      "searchAndSortData": data
    }; 
    if(self.groupsCurrAction === self.groupActionConfig.CREATE)
      this.createRequestParam.defaultRole = this.view.associatedRoles.segAssociatedRoles.data[0].id;
  },

  showGroupList: function(response) {
    this.hideAll();
    this.view.flxGroupList.setVisibility(true);
    this.view.mainHeader.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.subHeader.flxMenu.left = "0dp";
    this.view.subHeader.flxSearch.right = "0dp";
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.forceLayout();
    this.view.flxStatusFilter.setVisibility(false);
    //  this.hideShowHeadingSeperator(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.serviceDefinition");
    var self = this;
    this.groupId = undefined;
    var data;
    var legalEntities=self.getLEListForFormAction("frmServiceDefinition",'UPDATE');
    var legalEntities1=self.getLEListForFormAction("frmServiceDefinition",'DELETE');
   
    for(var i=0; i<legalEntities.length; i++){
      if(legalEntities[i].companyName.indexOf(this.view.lblSelectedRowsServType.text) === 0){
        this.view.listingSegmentClient.contextualMenu.flxOption2.isVisible = true;
        this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible = true;
       break;
      }
      else{
        this.view.listingSegmentClient.contextualMenu.flxOption2.isVisible = false;
        this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible = false;
      }
    }
     for(var i=0; i<legalEntities1.length; i++){
      if(legalEntities1[i].companyName.indexOf(this.view.lblSelectedRowsServType.text) === 0){
        this.view.listingSegmentClient.contextualMenu.flxOption3.isVisible = true;
       break;
      }
       
      else{
        this.view.listingSegmentClient.contextualMenu.flxOption3.isVisible = false;
      }
     }
     var isOptionsVisible = true;
    if(this.view.listingSegmentClient.contextualMenu.flxOption3.isVisible === false && this.view.listingSegmentClient.contextualMenu.flxOption4.isVisible === false &&this.view.listingSegmentClient.contextualMenu.flxOption2.isVisible ===false){
       var isOptionsVisible = false;
    }
    
    //segGroupListData
    var dataMap = {
      "Group_id": "Group_id",
      "Status_id": "Status_id",
      "flxServicesList": "flxServicesList",
      "flxGroupsegmain": "flxGroupsegmain",
      "flxOptions": "flxOptions",
      "flxSegMain": "flxSegMain",
      "flxDropdown": "flxDropdown",
      "fonticonArrow": "fonticonArrow",
      "flxRowBusinessTypes": "flxRowBusinessTypes",
      "lblGroupBusinessType":"lblGroupBusinessType",
      "flxContracts": "flxContracts",
      "lblMore": "lblMore",
      "flxStatus": "flxStatus",
      "fontIconGroupStatus": "fontIconGroupStatus",
      "fontIconOptions": "fontIconOptions",
      "lblGroupCustomers": "lblGroupCustomers",
      "lblContracts": "lblContracts",
      "lblFeatures": "lblFeatures",
      "lblRoles": "lblRoles",
      "lblGroupType": "lblGroupType",
      "lblGroupName": "lblGroupName",
      "lblGroupStatus": "lblGroupStatus",
      "lblSeparator": "lblSeparator",
      "Type_id": "Type_id",
      "lblDescriptionHeader": "lblDescriptionHeader",
      "lblDescriptionValue": "lblDescriptionValue",
      "isEAgreementActive": "isEAgreementActive",
      "segServicesList": "segServicesList",
      "defaultRole":"defaultRole"
    };
    if (typeof response !== 'undefined' || response !== null) {
      if (response.length > 0) {
        data = response.map(function(groupViewData) {
         
          return {
            "id": groupViewData.id,
            "fontIconGroupStatus": {
              "skin": (groupViewData.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) ? "sknFontIconActivate" : "sknfontIconInactive"
            },
            "Status_id": groupViewData.status,
            "fontIconOptions": {
              "text": "\ue91f"
            },
            "lblGroupName": {
              "text": groupViewData.name
            },
            "lblGroupStatus": (groupViewData.status === self.AdminConsoleCommonUtils.constantConfig.ACTIVE) ? {
              "text": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
              "skin": "sknlblLato5bc06cBold14px"
            } : {
              "text": kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
              "skin": "sknlblLatocacacaBold12px"
            },
            "lblGroupBusinessType": {
              "text": self.serviceTypeConfig[groupViewData.serviceType] || kony.i18n.getLocalizedString("i18n.Applications.NA")
            },
            "lblContracts": {
              "text": groupViewData.numberOfContracts
            },
            "lblFeatures": {
              "text": groupViewData.numberOfFeatures
            },
            "lblRoles": {
              "text": groupViewData.numberOfRoles
            },
            "lblSeparator": ".",
            "flxOptions": {
              "isVisible": isOptionsVisible,
              "onClick": function() {
                self.toggleContextualMenu(50);
              }
            },
            "flxDropdown": {
              "onClick": self.expandGroupRowClick
            },
            "fonticonArrow": {
              "text": "\ue922",
              "skin": "sknfontIconDescRightArrow14px"
            },
            "serviceType": groupViewData.serviceType,
            "lblDescriptionHeader": "DESCRIPTION",
            "lblDescriptionValue": {
              "text": groupViewData.description
            },
            "defaultRole" : groupViewData.defaultGroup,
            "template": "flxServicesList"
          };
        });
        self.view.listingSegmentClient.segListing.setVisibility(true);
        self.view.flxGroupHeader.setVisibility(true);
        self.view.flxGroupSeparator.setVisibility(true);
        self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
        self.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
        self.view.listingSegmentClient.segListing.setData(data);
        if (document.getElementById("frmServiceDefinition_listingSegmentClient_segListing")) document.getElementById("frmServiceDefinition_listingSegmentClient_segListing").onscroll = this.contextualMenuOff;
        this.view.forceLayout();
      } else {
        var searchText= self.AdminConsoleCommonUtils.getEncodedTextInput(self.view.subHeader.tbxSearchBox.text);
        if (searchText !== "") {
          self.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + searchText + kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
        } else {
          self.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        }
        self.view.flxGroupHeader.setVisibility(false);
        self.view.flxGroupSeparator.setVisibility(false);
        self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
        self.view.listingSegmentClient.segListing.setVisibility(false);
        this.view.forceLayout();
      }
    }
    kony.adminConsole.utils.hideProgressBar(this.view);
  },
  /*
  * widget data map for features actions listing segment
  * @return : seg widgetDataMap json
  */
  getWidgetMapServiceDefFASeg : function(){
    var widgetMap = {
      "flxEnrollSelectedAccountsSec":"flxEnrollSelectedAccountsSec",
      "flxAccountSectionCont":"flxAccountSectionCont",
      "flxActionsHeaderContainer":"flxActionsHeaderContainer",
      "flxHeaderContainer":"flxHeaderContainer",
      "flxLeftDetailsCont":"flxLeftDetailsCont",
      "flxToggleArrow":"flxToggleArrow",
      "lblIconToggleArrow":"lblIconToggleArrow",
      "flxHeadingCheckbox":"flxHeadingCheckbox",
      "imgTopCheckbox":"imgTopCheckbox",
      "flxDetailsCont":"flxDetailsCont",
      "lblFeatureName":"lblFeatureName", 
      "flxRow2":"flxRow2",
      "lblAvailableActions":"lblAvailableActions",
      "lblCountActions":"lblCountActions",
      "lblTotalActions":"lblTotalActions",
      "flxRight":"flxRight",
      "lblIconStatus":"lblIconStatus",
      "lblStatusValue":"lblStatusValue",
      "lblSectionLine":"lblSectionLine",
      "flxActionNameHeading":"flxActionNameHeading",
      "flxActionStatusHeading":"flxActionStatusHeading",
      "lblActionStatus":"lblActionStatus",
      "lblActionName":"lblActionName",
      "imgActionHeaderCheckbox":"imgActionHeaderCheckbox",
      "flxActionCheckbox":"flxActionCheckbox",
      "lblActionSeperator":"lblActionSeperator",
      //row template
      "flxContractEnrollFeaturesEditRow":"flxContractEnrollFeaturesEditRow",
      "flxFeatureNameCont":"flxFeatureNameCont",
      "flxStatus":"flxStatus",
      "lblStatus":"lblStatus",
      "flxCheckbox":"flxCheckbox",
      "imgCheckbox":"imgCheckbox",
      "lblSeperator":"lblSeperator",
      "id":"id",
      "actions":"actions",
      "isEnabled":"isEnabled",

    };
    return widgetMap;
  },
  /*
  * expand/collapse the selected feature actions card
  * @param: segment wid ref
  */
  toggleServiceDefFARows : function(segmentPath,category,context){
    var selSecInd = context.rowContext ? context.rowContext.sectionIndex : -1;
    var selRowInd = context.rowContext ? context.rowContext.rowIndex: -1;
    var segData = segmentPath.data;
    if(category === 2){
      for(var i=0; i<segData.length; i++){
        if(selSecInd !== i){ //collapse
          if(segData[i][0].lblIconToggleArrow.skin === "sknIcon00000014px"){
            segData[i][0] = this.getCollapsedSectionProperties(segData[i][0]);
            segData[i][1] = this.showHideSegRowFlex(segData[i][1],false);
            segmentPath.setSectionAt(segData[i], i);
          }
        }
      }
    }

    if(segData[selSecInd][0].lblIconToggleArrow.skin === "sknIcon00000015px"){
      segData[selSecInd][0].lblIconToggleArrow.text = "\ue915"; //down-arrow
      segData[selSecInd][0].lblIconToggleArrow.skin = "sknIcon00000014px";
      segData[selSecInd][0].flxActionsHeaderContainer.isVisible = true;
      segData[selSecInd][0].lblSectionLine.isVisible = true;
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],true);
      segData[selSecInd][0].flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0rd3pxTopRound";

    } else{ //collapse
      segData[selSecInd][0] = this.getCollapsedSectionProperties(segData[selSecInd][0]);
      segData[selSecInd][1] = this.showHideSegRowFlex(segData[selSecInd][1],false);
    }
    segmentPath.setSectionAt(segData[selSecInd], selSecInd);

  },
  /* 
   *set collapsed section properties
   *@param: selected card section data
   */
  getCollapsedSectionProperties : function(sectionData){
    sectionData.lblIconToggleArrow.text = "\ue922"; //right-arrow
    sectionData.lblIconToggleArrow.skin = "sknIcon00000015px";
    sectionData.flxActionsHeaderContainer.isVisible = false;
    sectionData.lblSectionLine.isVisible = false;
    sectionData.flxAccountSectionCont.skin = "sknFlxBgF5F6F8BrD7D9E0Br1pxRd3px";
    return sectionData;
  },
  /*
  * set segment rows visibility
  * @params: rows array, visibility - true/false
  * @return: updated rows data with visibilty
  */
  showHideSegRowFlex : function(rowsData,visibility){
    for(var i=0;i<rowsData.length;i++){
      rowsData[i].flxContractEnrollFeaturesEditRow.isVisible = visibility;
      if(visibility === true && (i === rowsData.length-1)){
        rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r3pxBottomRound";    
      } else{
        rowsData[i].flxContractEnrollFeaturesEditRow.skin = "sknFlxBgFFFFFFbrD7D9E0r1pxLeftRight"; 
      }
    }
    return rowsData;
  },
  /*
  * check if all the rows of segment are selected or not
  * @param: data,rowData or section data, is partial selection behaviour
  * @return: image to be set (checked/unchecked/partial)
  */
  getHeaderCheckboxImage : function(data,isRowData,hasPartialSelection){
    var img = this.AdminConsoleCommonUtils.checkboxnormal;
    var currImg = (isRowData === true) ? "imgCheckbox" :"imgActionHeaderCheckbox";
    var selCount = 0, partialCount = 0,unselCount = 0;
    for(var i=0; i<data.length; i++){
      var list = (isRowData === true) ? data[i] : data[i][0];
      if(list[currImg].src === this.AdminConsoleCommonUtils.checkboxSelected || list[currImg].src === this.AdminConsoleCommonUtils.checkboxPartial){
        selCount  = selCount +1;
        partialCount = (list[currImg].src === this.AdminConsoleCommonUtils.checkboxPartial) ? partialCount +1 : partialCount;
      }
    }
    if(hasPartialSelection){
      if(selCount !== 0 && selCount === data.length)
        img = partialCount === 0 ? this.AdminConsoleCommonUtils.checkboxSelected: this.AdminConsoleCommonUtils.checkboxPartial;
      else if(selCount !== 0 && selCount < data.length)
        img = this.AdminConsoleCommonUtils.checkboxPartial;
    } else{
      if(selCount === data.length)
        img = this.AdminConsoleCommonUtils.checkboxSelected;
    }
    return img;

  },
  /*
   * get the selected features/actions count
   * @param: actions segment data,checkboc img id,isSection(true/false)
   * @returns" selected actions count
   */
  getSelectedFeatureActionCount : function(segData,imgCheckboxId,isSection){
    var selectedCount = 0;
    for(var i=0;i < segData.length; i++){
      var data = (isSection === true) ? segData[i][0] : segData[i];
      if(data[imgCheckboxId].src === this.AdminConsoleCommonUtils.checkboxSelected ||
         data[imgCheckboxId].src === this.AdminConsoleCommonUtils.checkboxPartial)
        selectedCount = selectedCount +1;
    }
    selectedCount =  this.getTwoDigitNumber(selectedCount);
    return selectedCount;
  },
  /*
  * get 2 digit string number
  * @param: number
  * @return: 2-digit sting number
  */
  getTwoDigitNumber : function(count){
    var updatedCount =0;
    count = parseInt(count,10);
    if(count <= 9){
      updatedCount = "0"+count;
    } else{
      updatedCount = count;
    }
    return updatedCount+ "";
  },
  /*
  * checks for the newly added feature action while edit
  */
  getNewlyAddedFeaturesOnEdit : function(){
    var addedFeatures =[],addedActions =[], initialFeatures =[], initialActions =[];
    //initial features of selected service def
    for(var p=0; p<this.serviceFeatures.length; p++){
      for(var q=0; q<this.serviceFeatures[p].actions.length; q++){
        if(!initialFeatures.includes(this.serviceFeatures[p].id))
          initialFeatures.push(this.serviceFeatures[p].id);
        initialActions.push(this.serviceFeatures[p].actions[q].id);
      }
    }
    //added features,actions
    for(var i=0;i<this.features.length;i++){
      for(var j=0;j<this.features[i].actions.length;j++){
        if(!initialActions.includes(this.features[i].actions[j].id) &&
           this.features[i].actions[j].isSelected===1){
          addedActions.push(this.features[i].actions[j].id);
          if(!addedFeatures.includes(this.features[i].id)){
            addedFeatures.push(this.features[i].id);
          } 
        }
      }
    }
    return {"addedFeatures":addedFeatures,
            "addedActions":addedActions};

  },
});
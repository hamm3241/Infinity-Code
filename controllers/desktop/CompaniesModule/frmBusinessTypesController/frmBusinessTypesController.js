define({
  prevIndex:-1,
  currentAction: kony.i18n.getLocalizedString("i18n.frmBusinessTypes.Business_Type_List_UC"),
  actionConfig: {
    create: kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonAdd"),
    edit: kony.i18n.getLocalizedString("i18n.frmTermsAndConditionsController.EDIT"),
    view: kony.i18n.getLocalizedString("i18n.permission.View").toUpperCase(),
    viewAllBusinessTypes: kony.i18n.getLocalizedString("i18n.frmBusinessTypes.Business_Type_List_UC")
  },
  businessTypeRecords : [],
  roleIdSelected:"",
  roleNameSelected:"",
  popupTypeConfig:{
    save:"save",
    delete:"delete",
    saveRole:"saveRole"
  },
  currentPopupAction : "",

  //Type your controller code here 
  willUpdateUI: function (context) {
    this.updateLeftMenu(context);
    this.view.forceLayout();
    if(context){
      if (context.action === "hideLoadingScreen") {
        kony.adminConsole.utils.hideProgressBar(this.view);
      }else if (context.loadingScreen) {
        if (context.loadingScreen.focus)
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      }else if (context.toastMessage) {
        if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
          this.view.toastMessage.showToastMessage(context.toastMessage.message, this);
        } else if (context.toastMessage.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")) {
          this.view.toastMessage.showErrorToastMessage(context.toastMessage.message, this);
        }
      }
      else if(context.businessTypeRecords){	
        this.currentAction=this.actionConfig.viewAllBusinessTypes;
        this.businessTypeRecords=context.businessTypeRecords;
        this.showBusinessTypesUi();
      }
      else if(context.rolesForBusinessType){
        this.currentAction=context.action;
        if(this.currentAction===this.actionConfig.edit)
          this.showEditBusinessTypeUi(context.rolesForBusinessType);
        else if(this.currentAction===this.actionConfig.view)
          this.showViewBusinessTypeUi(context.rolesForBusinessType);
      }
      else if(context.action===this.actionConfig.view){
        this.roleIdSelected= context.defaultRoleId;
        this.roleNameSelected="";//Tobe assigned while populating roles segment
        this.toggleEditRoles(false);
      }
    }
  },
  businessTypesPreShow: function(){
    this.setFlowActions();
    this.view.MinEdit.flxPlus.focusSkin="sknflxffffffBorderLeftRound1293cc";
    this.view.MaxEdit.flxPlus.focusSkin="sknflxffffffBorderLeftRound1293cc";
    this.view.MinEdit.flxMinus.focusSkin="sknflxffffffBorderRightRound1293cc";
    this.view.MaxEdit.flxMinus.focusSkin="sknflxffffffBorderRightRound1293cc";
    this.view.conflictPopup.flxPopUpTopColor.skin="sknRedFill";
    this.view.conflictPopup.lblPopupClose.skin="sknFontIconSearchCross16px";
    this.view.conflictPopup.flxPopUpClose.skin="sknFlxPointer";
    this.view.conflictPopup.btnPopUpCancel.skin="sknbtnf7f7faLatoRegular4f555dBorder1px8b96a5";
    this.view.conflictPopup.btnPopUpCancel.hoverSkin="sknbtnffffffLatoRegular4f555dBorder1px485c75";
  },
  setFlowActions : function(){
    var scopeObj=this;
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.presenter.showCompaniesForm();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function(){
      scopeObj.showAddBusinessType();
    };
    this.view.subHeader.tbxSearchBox.onTouchStart = function(){
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.subHeader.tbxSearchBox.onEndEditing = function(){
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.subHeader.tbxSearchBox.onKeyUp = function(){
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      if(scopeObj.view.subHeader.tbxSearchBox.text === ""){
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      }else{
        scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      }
      scopeObj.performSearchOnBusinessTypes();
    };
    this.view.subHeader.flxClearSearchImage.onClick = function(){
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.performSearchOnBusinessTypes();
    };
    this.view.flxBusinessType.onClick = function(){
      var segData = scopeObj.view.segBusinessTypes.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblBusinessTypes");
      scopeObj.view.segBusinessTypes.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxAuthorizedSignatories.onClick = function(){
      var segData = scopeObj.view.segBusinessTypes.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblAuthorizedSignatories.text");
      scopeObj.view.segBusinessTypes.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxNoOfRoles.onClick = function(){
      var segData = scopeObj.view.segBusinessTypes.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblNoOfRoles");
      scopeObj.view.segBusinessTypes.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxDelete.onClick = function(){
      scopeObj.showDeletePopup();
    };
    this.view.flxPopUpClose.onClick = function(){
      scopeObj.view.flxActionPopup.setVisibility(false);
    };
    this.view.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxActionPopup.setVisibility(false);
    };
    this.view.btnPopUpProceed.onClick = function(){
      var popupType=scopeObj.currentPopupAction;
      if(popupType===scopeObj.popupTypeConfig.save|| popupType===scopeObj.popupTypeConfig.saveRole){
        scopeObj.updateBusinessType();
      }
      else {
        scopeObj.deleteSelectedBusinessType();
      }
      scopeObj.view.flxActionPopup.setVisibility(false);
    };
    this.view.conflictPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxConflictPopup.setVisibility(false);
    };
    this.view.conflictPopup.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxConflictPopup.setVisibility(false);
    };
    this.view.segBusinessTypes.onRowClick = function(){
      scopeObj.setDefaultRoleSelected();
      scopeObj.callForAssociatedRoles(scopeObj.actionConfig.view);
    };
    this.view.flxRoleClosePopup.onClick = function(){
      scopeObj.view.flxViewRolePopup.setVisibility(false);
    };
    this.view.flxChangeDefaultRoleButton.onClick = function(){
      scopeObj.toggleEditRoles(true);
    };
    this.view.backToRolesList.btnBack.onClick = function(){
      scopeObj.toggleEditRoles(false);
    };
    this.view.commonButtonsRoles.btnCancel.onClick = function(){
      scopeObj.toggleEditRoles(false);
    };
    this.view.commonButtonsRoles.btnSave.onClick = function(){
      scopeObj.populatePopup(scopeObj.popupTypeConfig.saveRole);
    };
    this.view.breadcrumbs.btnPreviousPage.onClick = function(){
      scopeObj.presenter.getBusinessTypes();
    };
    this.view.commonButtonsAddEdit.btnCancel.onClick = function(){
      scopeObj.presenter.getBusinessTypes();
    };
    this.view.commonButtonsAddEdit.btnSave.onClick = function(){
      if(scopeObj.validateForm()){
       if(scopeObj.actionConfig.create===scopeObj.currentAction)
         scopeObj.createBusinessType();
        else
         scopeObj.populatePopup(scopeObj.popupTypeConfig.save);
      }
    };
    this.view.flxEdit.onClick = function(){
      scopeObj.setDefaultRoleSelected();
      scopeObj.callForAssociatedRoles(scopeObj.actionConfig.edit);
    };
    this.view.MinEdit.tbxcharcterSize.onKeyUp = function(){
      scopeObj.view.flxErrorRowEdit2.isVisible = false;
      scopeObj.view.flxMin.skin="slFbox";
      scopeObj.view.flxMax.skin="slFbox"; 
    }
    this.view.MinEdit.tbxcharcterSize.onEndEditing = function(){
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) >= 1){
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text)===1?true:false;
      }
      else{
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = true;
      }
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) <= 99){
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text)===99?true:false;
      }
      else{
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MaxEdit.tbxcharcterSize.onKeyUp = function(){
      scopeObj.view.flxErrorRowEdit2.isVisible = false;
      scopeObj.view.flxMin.skin="slFbox";
      scopeObj.view.flxMax.skin="slFbox";
    };
    this.view.MaxEdit.tbxcharcterSize.onEndEditing = function(){
       if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)>= 1){
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)===1?true:false;
      }
      else{
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = true;
      }
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) <= 99){
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)===99?true:false;
      }
      else{
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = true;
      }        
      scopeObj.view.forceLayout();
    };
    this.view.MinEdit.flxPlus.onTouchStart = function(){
      scopeObj.view.flxErrorRowEdit2.isVisible = false;
      scopeObj.view.flxMin.skin="slFbox";
      scopeObj.view.flxMax.skin="slFbox";
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) > 1){
        scopeObj.view.MinEdit.tbxcharcterSize.text = parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) - 1;
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text)===1?true:false;
      }
      else{
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = true;
      }
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) < 99){
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MinEdit.flxMinus.onTouchStart = function(){
      scopeObj.view.flxErrorRowEdit2.isVisible = false;
      scopeObj.view.flxMin.skin="slFbox";
      scopeObj.view.flxMax.skin="slFbox";
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) < 99){
        scopeObj.view.MinEdit.tbxcharcterSize.text = parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text)+ 1;
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text)===99?true:false;
      }
      else{
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = true;
      }
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) >1){
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MaxEdit.flxPlus.onTouchStart = function(){
      scopeObj.view.flxErrorRowEdit2.isVisible = false;
      scopeObj.view.flxMin.skin="slFbox";
      scopeObj.view.flxMax.skin="slFbox";
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)> 1){
        scopeObj.view.MaxEdit.tbxcharcterSize.text = parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) -1;
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)===1?true:false;
      }
      else{
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = true;
      }
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) < 99){
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MaxEdit.flxMinus.onTouchStart = function(){
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) < 99){
        scopeObj.view.MaxEdit.tbxcharcterSize.text = parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) + 1;
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)===99?true:false;
      }
      else{
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = true;
      }
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)> 1){
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
     this.view.tbxEditBusinessTypeName.onBeginEditing = function(){
      scopeObj.view.lblBusinessTypeNameCount.setVisibility(true);
      scopeObj.view.lblBusinessTypeNameCount.text = scopeObj.view.tbxEditBusinessTypeName.text.length + "/50";
      scopeObj.view.forceLayout();
    };
    this.view.tbxEditBusinessTypeName.onKeyUp = function(){
      scopeObj.view.lblBusinessTypeNameCount.text = scopeObj.view.tbxEditBusinessTypeName.text.length + "/50";
      scopeObj.view.tbxEditBusinessTypeName.skin="skntbxLato35475f14px";
      scopeObj.view.flxEditErrorRow11.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.tbxEditBusinessTypeName.onEndEditing = function(){
      scopeObj.view.lblBusinessTypeNameCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxOptions.onClick = function(){
      scopeObj.view.flxSelectOptionsView.setVisibility(!scopeObj.view.flxSelectOptionsView.isVisible);
      scopeObj.setOptionsVisibility("flxSelectOptionsView");
    };
    this.view.flxSelectOptions.onHover = this.onHoverEventCallback;
    this.view.flxSelectOptionsView.onHover = this.onHoverEventCallback;
    this.view.flxBusinessTypeViewEdit.onScrollStart = function(){
      scopeObj.view.flxSelectOptionsView.setVisibility(false);
      scopeObj.setOptionsVisibility("flxSelectOptionsView");
    };
    this.view.flxBusinessTypeViewEdit.onScrollStart = function(){
      scopeObj.view.flxSelectOptionsView.setVisibility(false);
      scopeObj.setOptionsVisibility("flxSelectOptionsView");
    };
    this.view.flxBusinessTypesSegment.onScrollStart = function(){
      scopeObj.view.flxSelectOptions.setVisibility(false);
      scopeObj.setOptionsVisibility("flxSelectOptions");
    };
    this.view.flxEditView.onClick = function(){
      scopeObj.callForAssociatedRoles(scopeObj.actionConfig.edit);
    };
    this.view.flxDeleteView.onClick = function(){
      scopeObj.showDeletePopup();
    };
    this.view.addButton.onClick = function(){
      scopeObj.resetAuthorizedSignatories(true,-1);
    };
    this.view.segBusinessTypes.onHover=this.saveScreenY;
    this.view.flxMoreView.onHover = this.onMoreHover;
  },
  showAddBusinessType : function(){
    this.currentAction=this.actionConfig.create;
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxSelectOptions.setVisibility(false);
    this.view.flxBusinessTypesList.setVisibility(false);
    this.resetBreadCrumbs();
    this.resetCreateForm();
    this.view.flxViewEditBusinessTypes.setVisibility(true);
    this.view.flxBusinessTypeEditDetails.setVisibility(true);
    this.view.flxBusinessTypeViewDetails.setVisibility(false);
    this.view.flxAssociatedRoles.setVisibility(false);
    this.view.flxCommonButtonsRolesSave.setVisibility(false);
    this.view.flxAddEditButtons.setVisibility(true);
    this.resetCommonFields();
    this.setAuthSignatories([{name:"",customers:0}]);
  },
  resetBreadCrumbs : function(){
    var flag;
    if((this.currentAction === this.actionConfig.create)|| (this.currentAction === this.actionConfig.edit)|| (this.currentAction === this.actionConfig.view)){
      flag=true;
      this.view.breadcrumbs.btnPreviousPage.text=this.actionConfig.viewAllBusinessTypes;
    }
    else{
      flag=false;
    }
    this.view.breadcrumbs.lblCurrentScreen.text=this.currentAction;
    this.view.breadcrumbs.btnPreviousPage.setVisibility(flag);
    this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(flag);
  },
  showBusinessTypesUi : function(){
    this.clearSearchBoxToDefaults();
    this.populateBusinessTypesSegment(this.businessTypeRecords);
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.flxBusinessTypesList.setVisibility(true);
    this.view.flxSelectOptions.setVisibility(false);
    this.view.flxViewEditBusinessTypes.setVisibility(false);
    this.resetBreadCrumbs();
  },
  populateBusinessTypesSegment : function(records){
    var self = this;
    if(records.length>0){
      this.view.flxSegBusinessTypes.setVisibility(true);
      this.view.flxNoBusinessTypesFound.setVisibility(false);
      var data;
      self.view.flxBusinessTypesSegment.height=(kony.os.deviceInfo().screenHeight-267)+"px";
      var dataMap = {
        "lblBusinessTypes": "lblBusinessTypes",
        "lblAuthorizedSignatories":"lblAuthorizedSignatories",
        "lblNoOfRoles": "lblNoOfRoles",
        "lblSeperator": "lblSeperator",
        "max" : "max",
        "min" : "min",
        "id" : "id",
        "flxOptions":"flxOptions",
        "flxRow" : "flxRow",
        "customersCount" : "customersCount",
        "lblIconOptions" : "lblIconOptions",
        "defaultRole" : "defaultRole",
        "signatories":"signatories",
        "flxMore" : "flxMore",
        "lblMore" : "lblMore"
      };
      data=records.map(function (row) {
        var signatories="";
        var avgCaseStringLength=35;
        var stringLength=0;
        var moreData=[];
        var firstMoreElement;
        var isMoreVisible=false;
        for(var k=0;k<row.Signatories.length;k++){
          if(stringLength+(row.Signatories[k].name.toString().length)<avgCaseStringLength){
            if(k===0 || signatories==="")
              signatories= row.Signatories[k].name;
            else
              signatories= signatories+", "+row.Signatories[k].name;
            stringLength=stringLength+(row.Signatories[k].name.toString().length)+2;
          }
          else{
            moreData.push(row.Signatories[k].name.trim());
            isMoreVisible=true;
          }
        }
        if(isMoreVisible && signatories===""){
          firstMoreElement=moreData.pop();
          signatories=self.AdminConsoleCommonUtils.getTruncatedString(firstMoreElement, 35, 33);
          if(row.Signatories.length===1)
            isMoreVisible=false;
        }
        return {
          "lblBusinessTypes": row.BusinessType_name,
          "lblAuthorizedSignatories":{"text":signatories,"tooltip": firstMoreElement},
          "lblNoOfRoles":  row.Groups_count,
          "lblSeperator": ".",
          "max" : row.maxAuthSignatory,
          "min" : row.minAuthSignatory,
          "id" : row. BusinessType_id,
          "flxOptions": {
            "onClick": function () {
              self.toggleContextualMenu();
            }
          },
          "lblMore":{"text":"+"+moreData.length+" more"},
          "flxMore": {"isVisible":isMoreVisible,
                        "onHover":function(widget,context){
                          if(moreData.length>0)
                          self.onMoreHover(widget,context,moreData);
                        }
                       },
          "lblIconOptions":{"text":"\ue91f"},
          "customersCount" : row.Customers_Count,
          "defaultRole" : row.Default_group,
          "signatories" : row.Signatories,
          "template": "flxBusinessTypes"
        };

      });
      self.sortBy = self.getObjectSorter("lblBusinessTypes");
      self.resetSortImages();
      var sortedData = data.sort(self.sortBy.sortData);
      self.view.segBusinessTypes.widgetDataMap = dataMap;
      self.view.segBusinessTypes.setData(sortedData);
    }
    else{
      this.view.flxSegBusinessTypes.setVisibility(false); 
      this.view.flxNoBusinessTypesFound.setVisibility(true);
    }
    self.view.forceLayout();
  },

  toggleContextualMenu:function(){ 
    var row_index = this.view.segBusinessTypes.selectedRowIndex[1];
    var templateArray = this.view.segBusinessTypes.clonedTemplates;
     //to caluclate top from preffered row heights
    var finalHeight = 0;
    for(var i = 0; i < row_index; i++){
      finalHeight = finalHeight + templateArray[i].flxBusinessTypes.frame.height;
    }
   
    var height=(finalHeight+50)-this.view.flxBusinessTypesSegment.contentOffsetMeasured.y;
    var flexLeft = this.view.segBusinessTypes.clonedTemplates[row_index].flxOptions.frame.x;
    this.view.flxSelectOptions.left = (flexLeft -36) + "px";
    var contextMenuFrameHeight = this.view.flxSelectOptions.frame.height;
    var segBusinessTypesFrameHeight = this.view.flxBusinessTypesSegment.frame.height;
    this.view.flxSelectOptions.setVisibility(!this.view.flxSelectOptions.isVisible);
    if(((contextMenuFrameHeight+height)>(segBusinessTypesFrameHeight))&&contextMenuFrameHeight<segBusinessTypesFrameHeight){
      this.view.flxSelectOptions.top=((height-contextMenuFrameHeight)+20)+"px";
      this.view.flxSelectOptions.flxUpArrowImage.setVisibility(false);
      this.view.flxSelectOptions.flxDownArrowImage.setVisibility(true);
    }
    else{
      this.view.flxSelectOptions.top = (height+50) + "px";
      this.view.flxSelectOptions.flxUpArrowImage.setVisibility(true);
      this.view.flxSelectOptions.flxDownArrowImage.setVisibility(false);
    }
    this.setOptionsVisibility("flxSelectOptions");
    this.view.forceLayout();
  },
  /*
   * function to clear search box to defaults
   */
  clearSearchBoxToDefaults : function(){
    var scopeObj =this;
    if (scopeObj.view.subHeader.tbxSearchBox.text !== "") {
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
    }
  },
  performSearchOnBusinessTypes : function(){
    var self =this;  
    var searchResult = this.businessTypeRecords.filter(self.searchFilter);
    self.populateBusinessTypesSegment(searchResult);
  },
  searchFilter: function(record) {
    var searchText = this.view.subHeader.tbxSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      var sign= record.Signatories;
      var flag=false;
      for(var i=0;i<sign.length;i++){
        if(sign[i].name.toLowerCase().indexOf(searchText.toLowerCase())!==-1){
           flag=true; 
           break;
           }
      }
      return (record.BusinessType_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || flag);
    } else {
      return true;
    }
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },
  resetSortImages : function() {
    var self = this;
    self.sortIconFor('lblBusinessTypes', 'fontIconSortBusinessType');
    self.sortIconFor('lblAuthorizedSignatories.text', 'fontIconSortAuthorizedSignatories');
    self.sortIconFor('lblNoOfRoles', 'fontIconSortNoOfRoles');
  },
  sortAndSetData : function(segData, sortColumn) {
    var self = this;
    self.sortBy.column(sortColumn);
    self.resetSortImages();
    return segData.sort(self.sortBy.sortData);
  },
  showDeletePopup : function(){
    var scopeObj=this;
    var currentIndex=scopeObj.view.segBusinessTypes.selectedRowIndex[1];
    var data=scopeObj.view.segBusinessTypes.data;
    var customersCount=data[currentIndex].customersCount;
    if(customersCount==="0")
      scopeObj.populatePopup(scopeObj.popupTypeConfig.delete);      
    else{
      var message=this.view.conflictPopup.rtxPopUpDisclaimer.text;
      this.view.conflictPopup.rtxPopUpDisclaimer.text=message.replace("<token1>",data[currentIndex].lblBusinessTypes);
      scopeObj.view.flxConflictPopup.setVisibility(true);
    }
  },
  deleteSelectedBusinessType : function(){
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var data=this.view.segBusinessTypes.data;
    var id=data[currentIndex].id;
    var payload= {
      "id": id
    };
    this.presenter.deleteBusinessType(payload);
    this.view.flxActionPopup.setVisibility(false);
  },
  showViewBusinessTypeUi : function(roles){
    this.populateViewForm(roles);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxSelectOptionsView.setVisibility(false);
    this.setOptionsVisibility("flxSelectOptionsView");
    this.view.flxAssociatedRoles.setVisibility(true);
    this.view.flxCommonButtonsRolesSave.setVisibility(false);
    this.view.flxAddEditButtons.setVisibility(false);
    this.view.flxBusinessTypesList.setVisibility(false);
    this.view.flxViewEditBusinessTypes.setVisibility(true);
    this.view.flxBusinessTypeEditDetails.setVisibility(false);
    this.view.flxBusinessTypeViewDetails.setVisibility(true);
    this.view.flxRoleUndoHeader.setVisibility(false);
    this.view.lblChangeDefaultRole.setVisibility(false);
    this.resetBreadCrumbs();
    this.view.flxBusinessTypeViewEdit.bottom="0px";
    this.view.forceLayout();
  },
  showEditBusinessTypeUi: function(roles){ 
    this.populateEditForm(roles);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxCommonButtonsRolesSave.setVisibility(false);
    this.view.flxAddEditButtons.setVisibility(true);
    this.view.flxBusinessTypesList.setVisibility(false);
    this.view.flxViewEditBusinessTypes.setVisibility(true);
    this.view.flxBusinessTypeEditDetails.setVisibility(true);
    this.view.flxBusinessTypeViewDetails.setVisibility(false);
    this.view.flxChangeDefaultRoleButton.setVisibility(false);
    this.view.flxRoleUndoHeader.setVisibility(false);
    this.resetBreadCrumbs();
    this.resetCommonFields();
    this.view.forceLayout();
  },
  setDataForRolesSegment : function(roles){
    var self = this;
    var dataMap = {
      "flxCustomerProfileRoles": "flxCustomerProfileRoles",
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
      self.view.flxNoResultsFound.setVisibility(false);
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
        data.push(toAdd);
        self.onClickActionRoleSegment(toAdd,roles[i]);
      }
      this.view.segCustomerRolesEdit.widgetDataMap = dataMap;
      this.view.segCustomerRolesEdit.setData(data);
      this.view.segCustomerRolesEdit.info = {
        "data": data,
        "searchAndSortData": data
      };  
      self.view.flxAssociatedRoles.setVisibility(true);
      self.view.flxResults.setVisibility(true);

    }else{
      self.view.flxResults.setVisibility(false);
      if(self.actionConfig.view === self.currentAction){
        self.view.flxAssociatedRoles.setVisibility(true);
        self.view.flxNoResultsFound.setVisibility(true);
        self.view.flxNoResultsFound.height=height-142-10-148-51-25+"px";
        self.view.flxBusinessTypeViewEdit.bottom="0px";
      }
      else{
        self.view.flxAssociatedRoles.setVisibility(false);
      }
    }
    this.view.forceLayout();
  }, 
  showViewRoleFeaturesList : function(features){
    //if(features.length>0){
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
      var actions= features[i].actions;
      // mapping actions segment
      var dataMap = {
      "lblActionName": "lblActionName",
      "lblActionDescription": "lblActionDescription"
      };
      var data=[];
      var action;
      for (var j = 0; j < actions.length; j++) {
        action = {

          "lblActionName": actions[j].name,
          "lblActionDescription": actions[j].description,
          "template": "flxRoleDetailsActions",
        };
        data.push(action);
      }
      ViewRoleFeaturesActionsToAdd.SegActions.widgetDataMap = dataMap;
      ViewRoleFeaturesActionsToAdd.SegActions.setData(data);
      this.view.flxFeaturesList.add(ViewRoleFeaturesActionsToAdd);
    }
    this.view.flxViewRolePopup.setVisibility(true);
  },
  onClickActionRoleSegment : function(toAdd,group){
    var self=this;
    toAdd.btnViewDetails.onClick=function(){
      self.view.lblFeatureName.text= group.name;
      self.view.lblViewRoleDescriptionValue.text= group.description;
      self.showViewRoleFeaturesList(group.features);
    };
    toAdd.flxRoleRadio.onClick=function(){
      self.toggleRadio();
    };
  },
  toggleRadio : function(){
    var self=this;
    var index = self.view.segCustomerRolesEdit.selectedIndex;
    var rowIndex = index[1];
    var data = self.view.segCustomerRolesEdit.data;
    for(var i=0; i<data.length; i++){
      if(data[i].imgRoleRadio.src ==="radio_selected.png")
        data[i].flxDefaultRoleButton.isVisible=false;
      data[i].imgRoleRadio.src ="radio_notselected.png";
    }
    data[rowIndex].imgRoleRadio.src = "radio_selected.png";
    data[rowIndex].flxDefaultRoleButton.isVisible=true;
    self.view.segCustomerRolesEdit.setData(data);
    self.view.forceLayout();
  },
  callForAssociatedRoles : function(action){
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var data=this.view.segBusinessTypes.data;
    var id=data[currentIndex].id;
    var payload= {
      "id": id
    };
    this.presenter.getBusinessTypeGroups(payload,action);
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
  toggleEditRoles :  function(flag){
    this.view.flxChangeDefaultRoleButton.setVisibility(!flag);
    this.view.flxRoleUndoHeader.setVisibility(flag);
    this.view.lblChangeDefaultRole.setVisibility(false);
    this.view.flxCommonButtonsRolesSave.setVisibility(flag);
    // set/reset radio
    var data = this.view.segCustomerRolesEdit.data;
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
    this.view.segCustomerRolesEdit.setData(data);
    this.view.flxBusinessTypeViewEdit.bottom=flag===true?"80px":"0px";
    this.view.forceLayout();
  },
  updateBusinessType : function(){
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var data=this.view.segBusinessTypes.data;
    var row=data[currentIndex];
    var name;
    var authSignatories=[];
    var min;
    var max;
    if(this.currentAction===this.actionConfig.edit){
      var flxAuthSignatories=this.view.flxAddSignatories.children;
      var path=this.view.flxAddSignatories;
      for(var i=0;i<flxAuthSignatories.length;i++){
        authSignatories.push(path[flxAuthSignatories[i]].tbxEnterValue.text);
      }
      name=this.view.tbxEditBusinessTypeName.text;
      min=this.view.MinEdit.tbxcharcterSize.text;
      max= this.view.MaxEdit.tbxcharcterSize.text;
    }
    else{
      var signatoriesList=row.signatories;
      for(var j=0;j<signatoriesList.length;j++){
        authSignatories.push(signatoriesList[j].name);
      }
    }
    var payload= {
      "id": row.id,
      "name": name||row.lblBusinessTypes,
      "signatoryTypes": authSignatories,
      "minAuthSignatories": min||row.min,
      "maxAuthSignatories": this.currentAction===this.actionConfig.edit?max:row.max
    };
    if(row.lblNoOfRoles!=="0"){
      payload.defaultRole=this.getSelectedRoleFromSegment().id;
    }
    
    this.presenter.updateBusinessType(payload,this.currentAction);
  },
  createBusinessType : function(){
    var authSignatories=[];
    var flxAuthSignatories=this.view.flxAddSignatories.children;
      var path=this.view.flxAddSignatories;
      for(var i=0;i<flxAuthSignatories.length;i++){
        authSignatories.push(path[flxAuthSignatories[i]].tbxEnterValue.text);
      }
    var payload= {
      "name": this.view.tbxEditBusinessTypeName.text,
      "signatoryTypes": authSignatories,
      "minAuthSignatories": this.view.MinEdit.tbxcharcterSize.text,
      "maxAuthSignatories": this.view.MaxEdit.tbxcharcterSize.text
    };
    this.presenter.createBusinessType(payload);
  },
  resetCreateForm : function(){
    this.view.tbxEditBusinessTypeName.text="";
    this.view.tbxAuthSignatoriesEdit.text="";
    this.view.MinEdit.tbxcharcterSize.text="1";
    this.view.MaxEdit.tbxcharcterSize.text="99";
    this.view.MinEdit.flxPlusDisable.isVisible = true;
    this.view.MaxEdit.flxMinusDisable.isVisible = true;
  },
  validateForm(){
    var scopeObj=this;
    var flag=true;
    
    if((scopeObj.view.MaxEdit.tbxcharcterSize.text.toString().trim()!=="" &&( parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) > 99)) 
       || parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) > 99 || (scopeObj.view.MinEdit.tbxcharcterSize.text==="")){

      scopeObj.view.lblErrormsgMinEdit.text = kony.i18n.getLocalizedString("i18n.frmBusinessTypes.error.range");
      scopeObj.view.flxErrorRowEdit2.isVisible = true;
      flag = false;
      if(scopeObj.view.MaxEdit.tbxcharcterSize.text.toString().trim()!=="" &&(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) > 99 )){
        scopeObj.view.flxMax.skin="sknRedBorder";
      }
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) > 99 || (scopeObj.view.MinEdit.tbxcharcterSize.text==="")){
        scopeObj.view.flxMin.skin="sknRedBorder";
      }
    }else if(scopeObj.view.MaxEdit.tbxcharcterSize.text.toString().trim()!=="" &&(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) > parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text))){
      scopeObj.view.lblErrormsgMinEdit.text = kony.i18n.getLocalizedString("i18n.frmBusinessTypes.error.minMax");
      scopeObj.view.flxErrorRowEdit2.isVisible = true;
      scopeObj.view.flxMin.skin="sknRedBorder";
      scopeObj.view.flxMax.skin="sknRedBorder";
      flag = false;
    }
    else{
      scopeObj.view.flxErrorRowEdit2.isVisible = false;
      scopeObj.view.flxMin.skin="slFbox";
      scopeObj.view.flxMax.skin="slFbox";
    }
    if(!this.isAuthSignatoriesValid()){
      flag=false;
    }
    if(this.view.tbxEditBusinessTypeName.text.trim()===""){
      scopeObj.view.flxEditErrorRow11.setVisibility(true);
      scopeObj.view.tbxEditBusinessTypeName.skin="skinredbg";
      flag=false;
    }
    else{
      scopeObj.view.flxEditErrorRow11.setVisibility(false);
      scopeObj.view.tbxEditBusinessTypeName.skin="skntbxLato35475f14px";
    }
    return flag;
  },
  resetCommonFields : function(){
    var scopeObj=this;
    scopeObj.view.flxBusinessTypeViewEdit.bottom="80px";
    scopeObj.view.flxErrorRowEdit2.isVisible = false;
    scopeObj.view.flxMin.skin="slFbox";
    scopeObj.view.flxMax.skin="slFbox";
    scopeObj.view.tbxAuthSignatoriesEdit.skin="skntbxLato35475f14px";
    scopeObj.view.tbxEditBusinessTypeName.skin="skntbxLato35475f14px";
    scopeObj.view.flxEditErrorRow11.setVisibility(false);
    scopeObj.view.flxErrorRowEdit12.setVisibility(false);
    scopeObj.view.lblBusinessTypeNameCount.setVisibility(false);
    scopeObj.view.lblAuthSignatoriesEditCount.setVisibility(false);
    if(this.currentAction===this.actionConfig.create)
      this.view.commonButtonsAddEdit.btnSave.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateCAPS");
    else
      this.view.commonButtonsAddEdit.btnSave.text=kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");
    if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) === 1){
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MinEdit.flxPlusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) === 99){
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = true;
      }
      else if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) >= parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)){
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MinEdit.flxMinusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) === 99){
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MaxEdit.flxMinusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text) === 1){
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = true;
      }
      else if(parseInt(scopeObj.view.MinEdit.tbxcharcterSize.text) >= parseInt(scopeObj.view.MaxEdit.tbxcharcterSize.text)){
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MaxEdit.flxPlusDisable.isVisible = false;
      }
    scopeObj.view.flxErrorRowEdit12.setVisibility(false);
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
    var row_index = this.view.segBusinessTypes.selectedRowIndex[1];
    var skin = this.view[widgetId].isVisible ? "sknflxffffffop100Border424242Radius100px" : "slFbox";
    if(widgetId === "flxSelectOptions"){
      var data = this.view.segBusinessTypes.data;
      if(this.prevIndex !==-1 && this.prevIndex < data.length){
        var tempDataPrev = data[this.prevIndex];
        tempDataPrev.flxOptions.skin = "slFbox";
        this.view.segBusinessTypes.setDataAt(tempDataPrev, this.prevIndex, 0);
      }
      var tempDataCurrent = data[row_index];
      tempDataCurrent.flxOptions.skin =skin;
      this.view.segBusinessTypes.setDataAt(tempDataCurrent, row_index, 0);
      this.prevIndex = row_index;
    }
    else if(widgetId==="flxSelectOptionsView"){
      this.view.flxOptions.skin = skin;
    }
  },
  populateEditForm :function(roles){
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var row=this.view.segBusinessTypes.data[currentIndex];
    //this.view.tbxAuthSignatoriesEdit.text=row.lblAuthorizedSignatories;
    this.view.tbxEditBusinessTypeName.text=row.lblBusinessTypes;
    this.view.MinEdit.tbxcharcterSize.text=row.min;
    this.view.MaxEdit.tbxcharcterSize.text=row.max;
    this.view.lblRolesCount.text="("+row.lblNoOfRoles+")";
    if(row.lblNoOfRoles==="0"){
      this.view.flxChangeDefaultRoleButton.setVisibility(false);      
    }
    this.view.lblChangeDefaultRole.setVisibility(true);
    this.setAuthSignatories(row.signatories);
    this.setDataForRolesSegment(roles);
  },
  populateViewForm:function(roles){
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var row=this.view.segBusinessTypes.data[currentIndex];
    this.view.lblName.text=row.lblBusinessTypes;
    var moreData=[];
    var stringLength=0;
    var isMoreVisible=false;
    var avgCaseStringLength=35;
    var signatories="";
    var firstMoreElement;
    for(var k=0;k<row.signatories.length;k++){
      if(stringLength+(row.signatories[k].name.toString().length)<avgCaseStringLength){
        if(k===0)
          signatories= row.signatories[k].name;
        else
          signatories= signatories+", "+row.signatories[k].name;
        stringLength=stringLength+(row.signatories[k].name.toString().length)+2;
      }
      else{
        moreData.push(row.signatories[k].name.trim());
        isMoreVisible=true;
      }
    }
    if(isMoreVisible && signatories===""){
      firstMoreElement=moreData.pop();
      signatories=this.AdminConsoleCommonUtils.getTruncatedString(firstMoreElement, 35, 33);
      if(row.signatories.length===1)
            isMoreVisible=false;
    }
    this.view.flxMoreView.setVisibility(isMoreVisible);
    this.view.lblAuthSignatoriesValue.text=signatories;
    this.view.lblAuthSignatoriesValue.toolTip=firstMoreElement;
    this.view.lblMore.text="+"+moreData.length+" more",
    this.setFlxViewMoreData(moreData);
    this.view.lblMinAuthSIgnatoriesValue.text=row.min;
    this.view.lblMaxAuthSIgnatoriesValue.text=row.max;
    this.view.lblRolesCount.text="("+row.lblNoOfRoles+")";
    if(parseInt(row.lblNoOfRoles)<=1){
      this.view.flxChangeDefaultRoleButton.setVisibility(false);      
    }
    else{
      this.view.flxChangeDefaultRoleButton.setVisibility(true); 
    }
    this.view.flxChangeDefaultRoleButton.skin="sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
    this.view.flxChangeDefaultRoleButton.hoverSkin="sknbtnf7f7faLatoRegular12Px485c75Border1px485C75Radius20px";
    this.setDataForRolesSegment(roles);
  },
  populatePopup : function(popupType){
    this.currentPopupAction=popupType;
    var title,message;
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var row=this.view.segBusinessTypes.data[currentIndex];
    var businessType=row.lblBusinessTypes;
    if(popupType===this.popupTypeConfig.save){
       title=kony.i18n.getLocalizedString("i18n.frmBusinessTypes.saveChanges");
       message=kony.i18n.getLocalizedString("i18n.frmBusinessTypes.confirmationmessage.saveChanges");
    }
    else if(popupType===this.popupTypeConfig.saveRole){
      var fromText=this.roleNameSelected;
      var roleRow=this.getSelectedRoleFromSegment();
      var toText=roleRow.name;
      if(this.roleIdSelected===roleRow.id){
        this.updateBusinessType();
        return;
      }
      else{
        title=kony.i18n.getLocalizedString("i18n.frmBusinessTypes.defaultRole");
        message=kony.i18n.getLocalizedString("i18n.frmBusinessTypes.confirmationmessage.changeDefaultRole");
        message=message.replace("<token1>",fromText).replace("<token2>",toText).replace("<token3>",businessType);
      }
    }
     else{ //if(popupType===this.popupConfig.delete){
      title=kony.i18n.getLocalizedString("i18n.frmBusinessTypes.deleteBusinessType");
      message=kony.i18n.getLocalizedString("i18n.frmBusinessTypes.confirmationmessage.delete");
      message=message.replace("<token>",businessType);
    }
    this.view.lblPopUpMainMessage.text=title;
    this.view.rtxPopUpDisclaimer.text=message;
    this.view.flxActionPopup.setVisibility(true);
    this.view.forceLayout();
  },
  setDefaultRoleSelected : function(){
    var currentIndex=this.view.segBusinessTypes.selectedRowIndex[1];
    var row=this.view.segBusinessTypes.data[currentIndex];  
    this.roleIdSelected=row.defaultRole;
  },
  getSelectedRoleFromSegment:function(){
    var data = this.view.segCustomerRolesEdit.data;
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
  
  setAuthSignatories: function(authSignatories) {
    var scopeObj = this;
    var flxWidth = (((kony.os.deviceInfo().screenWidth - 305 - 70 - 40)/2)) + "px";
    var leftOffset = (((kony.os.deviceInfo().screenWidth - 305 - 70 - 40)/2)) + "px";
    scopeObj.view.flxAddSignatories.removeAll();

    if (authSignatories && authSignatories.length > 0) {
      var count = 0;
      var noOfRows = Math.ceil(authSignatories.length / 2);
      var top = 0;
      var isOneOfDeleteDisabled=false;
      for (var i = 0; i < noOfRows; i++) {
        var noOfColumns = (count === authSignatories.length-1) ? 1 : 2;

        for (var j = 0; j < noOfColumns; j++) {
          var toAdd = new com.adminConsole.businessTypes.addBusinessTypes({
            "autogrowMode" : kony.flex.AUTOGROW_NONE,
            "clipBounds" : true,
            "id" : "signatory" + count,
            "isVisible" : true,
            "layoutType" : kony.flex.FREE_FORM,
            "masterType" : constants.MASTER_TYPE_DEFAULT,
            "width" : flxWidth,
            "top" : top + "px",
            "left" : j === 0 ? "0px" : leftOffset
          }, {}, {});

          toAdd.tbxEnterValue.text = authSignatories[count].name;
          toAdd.customers=authSignatories[count].customers;
          toAdd.index=count;
          ++count;
          if((count===authSignatories.length && count===1 && !isOneOfDeleteDisabled)||parseInt(toAdd.customers)>0){
            toAdd.flxDelete.setVisibility(false); 
            isOneOfDeleteDisabled=true;
            if(parseInt(toAdd.customers)>0){
            toAdd.tbxEnterValue.skin="txtD7d9e0disabledf3f3f3";
            toAdd.tbxEnterValue.setEnabled(false);
            }
          }
          scopeObj.view.flxAddSignatories.add(toAdd);
          scopeObj.setOnSignatoryActions(toAdd);
        }
        top = top + 70;
      }
    }
    this.view.forceLayout();
  },
  resetAuthorizedSignatories : function(toAdd,index){
    if(this.isAuthSignatoriesValid() || toAdd===false){
    var flxAuthSignatories=this.view.flxAddSignatories.children;
    var names=[];
    var path=this.view.flxAddSignatories;
    for(var i=0;i<flxAuthSignatories.length;i++){
      if(i!==index) // index equals i then element is not needed, a delete case
        names.push({name:path[flxAuthSignatories[i]].tbxEnterValue.text,customers:path[flxAuthSignatories[i]].customers});
    }
    if(toAdd === true){//Add scenario
      names.push({name:"",customers:0});
    }
    this.setAuthSignatories(names); 
    }
  },
  setOnSignatoryActions : function(component) {
    var scopeObj = this;

    component.flxDelete.onClick = function() {
      scopeObj.resetAuthorizedSignatories(false,component.index);
    };
     component.tbxEnterValue.onBeginEditing = function(){
      component.lblCount.setVisibility(true);
      component.lblCount.text = component.tbxEnterValue.text.length + "/50";
      scopeObj.view.forceLayout();
    };
    component.tbxEnterValue.onKeyUp = function(){
      component.lblCount.text = component.tbxEnterValue.text.length + "/50";
      component.tbxEnterValue.skin="skntbxLato35475f14px";
      component.flxInlineError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    component.tbxEnterValue.onEndEditing = function(){
      component.lblCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
  },
  isAuthSignatoriesValid : function(){
    var flxAuthSignatories=this.view.flxAddSignatories.children;
    var name;
    var flag=true;
    var path=this.view.flxAddSignatories;
    var namesSet=new Set();
    for(var i=0;i<flxAuthSignatories.length;i++){
      name=path[flxAuthSignatories[i]].tbxEnterValue.text.trim().toLowerCase();
      if(name==="" || namesSet.has(name)){
        path[flxAuthSignatories[i]].flxInlineError.setVisibility(true);
        path[flxAuthSignatories[i]].tbxEnterValue.skin="skinredbg";
        path[flxAuthSignatories[i]].lblError.text=name===""?kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Value_cannot_be_empty"): 
        //.kony.i18n.getLocalizedString("i18.authorizedSIgnatories.error.sameName");
        "Authorized Signatory with same name already exists.";
        flag=false;
      }
      else{
        path[flxAuthSignatories[i]].flxInlineError.setVisibility(false);
        path[flxAuthSignatories[i]].tbxEnterValue.skin=path[flxAuthSignatories[i]].customers>0?"txtD7d9e0disabledf3f3f3":"skntbxLato35475f14px";
      }
      namesSet.add(name);
    }
    return flag;
  },
  setFlxMoreData: function(moreData){
    var heightVal= this.mouseYCoordinate-197+10;
    var maxSizeText="";
     var widgetMap = {
      "flxMore": "flxMore",
      "lblName": "lblName"
    };
    var data = moreData.map(function(segData){
      maxSizeText=segData.length>maxSizeText.length?segData:maxSizeText;
      return{
        "lblName" : segData
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+40;
    this.view.flxSegMore.width=flexWidth+"px";
    this.view.segMore.widgetDataMap = widgetMap;
    this.view.segMore.setData(data);
    this.view.flxAdjustSegMore.setVisibility(true);
    if(((this.view.flxSegMore.frame.height+heightVal)>(this.view.flxBusinessTypesSegment.frame.height+50))&&this.view.flxSegMore.frame.height<this.view.flxBusinessTypesSegment.frame.height){
      this.view.flxUp.setVisibility(false);
      this.view.flxDown.setVisibility(true);
      this.view.flxOuter.top="0px";
      this.view.flxAdjustSegMore.top=((heightVal-this.view.flxSegMore.frame.height)-19)+"px";
    }
    else{
      this.view.flxUp.setVisibility(true);
      this.view.flxDown.setVisibility(false);
      this.view.flxOuter.top="-1px";
      this.view.flxAdjustSegMore.top=(heightVal)+"px";
    }
    this.view.forceLayout();
  },
  onMoreHover :  function(widget, context,data){
    var scopeObj = this;
    var widGetId = widget.id;
    if (widget) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER) {
        if(widGetId==="flxMore")
          scopeObj.setFlxMoreData(data);
        else
          scopeObj.view.flxSegViewMore.setVisibility(true);
      }else if (context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        if(widGetId==="flxMore")
          scopeObj.view.flxAdjustSegMore.setVisibility(true);
        else
          scopeObj.view.flxSegViewMore.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        if(widGetId==="flxMore")
          scopeObj.view.flxAdjustSegMore.setVisibility(false);
        else
          scopeObj.view.flxSegViewMore.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
    this.mouseXCoordinate=context.screenX;
  },
  setFlxViewMoreData: function(moreData){
     var widgetMap = {
      "flxMore": "flxMore",
      "lblName": "lblName"
    };
    var maxSizeText="";
    var data = moreData.map(function(segData){
      maxSizeText=segData.length>maxSizeText.length?segData:maxSizeText;
        return {"lblName" : segData};
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+40;
    this.view.flxSegViewMore.width=flexWidth+"px";
    this.view.segViewMore.widgetDataMap = widgetMap;
    this.view.segViewMore.setData(data);
    this.view.forceLayout();
  }
});

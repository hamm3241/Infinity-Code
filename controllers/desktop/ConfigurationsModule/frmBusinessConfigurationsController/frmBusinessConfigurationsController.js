define({
  selectedConfig : 0,
  preShowActions: function() {
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.businessconfigurations");
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxLeftOptions.setVisibility(false);
    this.view.flxNoConfigurations.setVisibility(false);
    this.view.noStaticData.height=kony.os.deviceInfo().screenHeight-160+"px";
    this.view.txtRoleDescription.text="";
    this.view.flxMainHeader.setVisibility(true);
    this.view.flxScrollMainContent.height=kony.os.deviceInfo().screenHeight-120+"px";
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxToastMessage.setVisibility(false);
    this.view.flxErrorPopUp.setVisibility(false);
    this.view.SwitchToggleStatus.selectedIndex = 0;
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setFlowActions();
    this.leftMenuOptionClick(1);
  },
  willUpdateUI:function(viewModel){
    if(typeof viewModel.LoadingScreen!=='undefined'){
      if(viewModel.LoadingScreen.focus===true) {
        kony.adminConsole.utils.showProgressBar(this.view);
      } else {
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    }

    if (viewModel) {
      this.updateLeftMenu(viewModel);
      if(viewModel.toast){
        if(viewModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")){
          this.view.toastMessage.showToastMessage(viewModel.toast.message,this);
        }else{
          this.view.toastMessage.showErrorToastMessage (viewModel.toast.message,this);
        }
      }
      if(viewModel.criteriaList!==undefined&&viewModel.criteriaList!==null){
        this.view.flxLeftOptions.setVisibility(true);
        this.view.flxNoConfigurations.setVisibility(true);
        this.criteriaData=viewModel.criteriaList;
        this.hideNoResultsFound();
        this.showEligibilityCriteriaList();
        this.view.forceLayout();
      }else if(viewModel.configurationsList!==undefined&&viewModel.configurationsList!==null){
        this.view.flxAlertConfigContainer.setVisibility(false);
        this.view.flxConfigurationsList.setVisibility(false);
        this.view.flxBusinessConfigSegment.setVisibility(true);
        this.setBusinessConfigData(viewModel.configurationsList);
      }else if(viewModel.CombinedUserCount) {
        if(viewModel.CombinedUserCount>"0")
          this.showErrorPopup();
        else
          this.linkProfileSwitchOnClick();
      }else if(viewModel.alertConfigurationsList!==undefined&&viewModel.alertConfigurationsList!==null){
        this.showAlertConfigurations(viewModel.alertConfigurationsList[0]);
      }   
    }
  },
  showEligibilityCriteriaList: function(){
    this.view.flxBusinessConfigSegment.setVisibility(false);
    this.view.flxAlertConfigContainer.setVisibility(false);
    if(this.criteriaData.length <= 0){
      this.view.noStaticData.setVisibility(true);
      this.view.flxConfigurationsList.setVisibility(false);
    }
    else{
      this.view.noStaticData.setVisibility(false);
      this.view.flxConfigurationsList.setVisibility(true);
      this.setCriteriaSegmentData(this.criteriaData,false);
    }
  },
  setFlowActions: function(){
    var scopeObj=this;
    this.view.criteriaList.flxCriteriaStatus.onClick = function(){
      var flxRight = scopeObj.view.criteriaList.flxCriteriaHeader.frame.width - scopeObj.view.criteriaList.flxCriteriaStatus.frame.x - scopeObj.view.criteriaList.flxCriteriaStatus.frame.width;
      var iconRight = scopeObj.view.criteriaList.flxCriteriaStatus.frame.width - scopeObj.view.criteriaList.fontIconFilterStatus.frame.x;
      scopeObj.view.flxCriteriaStatusFilter.right = (flxRight + iconRight - 30) +"px";
      scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
      if(scopeObj.view.flxCriteriaStatusFilter.isVisible===false)
        scopeObj.view.flxCriteriaStatusFilter.setVisibility(true);
      else
        scopeObj.view.flxCriteriaStatusFilter.setVisibility(false);
    };
    this.view.criteriaList.flxDeactivate.onClick = function() {
      if (scopeObj.view.criteriaList.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) scopeObj.showDeactivate();
      else scopeObj.showActivate();
    };
    this.view.criteriaList.flxDelete.onClick = function() {
      scopeObj.showDeleteCriteria();
    };
    this.view.criteriaList.flxEdit.onClick = function() {
      scopeObj.isEdit = true;
      scopeObj.editCriteria();
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeactivateCriteria.setVisibility(false);
      if(scopeObj.view.flxConfigurationsList.isVisible)
        scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
      if(scopeObj.view.flxConfigurationsList.isVisible){
        scopeObj.deactivateCriteria();
        scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
      }else if(scopeObj.view.flxBusinessConfigSegment.isVisible){
        scopeObj.updateBusinessConfiguration();
      }else if(scopeObj.view.flxEditAlertConfigContainer.isVisible){
        scopeObj.updateAlertConfiguration();
      }
      scopeObj.view.flxDeactivateCriteria.setVisibility(false);
    };
    this.view.popUp.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeleteCriteria.setVisibility(false);
      scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function() {
      scopeObj.view.flxDeactivateCriteria.setVisibility(false);
      if(scopeObj.view.flxConfigurationsList.isVisible)
        scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
    };
    this.view.popUp.flxPopUpClose.onClick = function() {
      scopeObj.view.flxDeleteCriteria.setVisibility(false);
      scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
    };
    this.view.popUp.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxDeleteCriteria.setVisibility(false);
      scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
      scopeObj.deleteCriteria();
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick=function(){
      scopeObj.performStatusFilter();
    };
    this.view.noStaticData.btnAddStaticContent.onClick = function() {
      scopeObj.isEdit = false;
      scopeObj.view.SwitchToggleStatus.selectedIndex = 0;
      scopeObj.view.flxNoCriteriaError.isVisible = false;
      scopeObj.view.lblAddCriteria.text=kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.addNewCriteria");
      scopeObj.view.flxAddEligibityCriteria.setVisibility(true);
      scopeObj.view.lblRoleDescriptionSize.isVisible = false;
      scopeObj.view.lblRoleDescriptionSize.text=scopeObj.view.txtRoleDescription.text.trim().length+"/2000";
    };
    this.view.flxAddButton.onClick = function(){
      scopeObj.isEdit = false;
      scopeObj.view.flxNoCriteriaError.isVisible = false;
      scopeObj.view.txtRoleDescription.text="";
      scopeObj.view.lblAddCriteria.text=kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.addNewCriteria");
      scopeObj.view.SwitchToggleStatus.selectedIndex = 0;
      scopeObj.view.flxAddEligibityCriteria.setVisibility(true);
      scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
      scopeObj.view.lblRoleDescriptionSize.isVisible = false;
      scopeObj.view.lblRoleDescriptionSize.text=scopeObj.view.txtRoleDescription.text.trim().length+"/2000";
    };
    this.view.flxEligibilityClose.onClick = function(){
      scopeObj.view.flxAddEligibityCriteria.setVisibility(false);
      if(scopeObj.view.noStaticData.isVisible===true)
        scopeObj.view.flxConfigurationsList.setVisibility(false);
      else
        scopeObj.view.flxConfigurationsList.setVisibility(true);
    };
    this.view.btnCancel.onClick = function(){
      scopeObj.view.flxEligibilityClose.onClick();
    };
    this.view.btnsave.onClick = function() {
      var context, statusId;
      if(scopeObj.view.txtRoleDescription.text.trim().length===0){
        scopeObj.view.lblNoCriteriaError.text =  kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.criteriaCannotBeBlank");
        scopeObj.view.flxNoCriteriaError.isVisible = true;
      }
      else if(scopeObj.view.txtRoleDescription.text.trim().length < 5){
        scopeObj.view.lblNoCriteriaError.text =  kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.CriteriaMinDescriptionLength");
        scopeObj.view.flxNoCriteriaError.isVisible = true;
      }
      else if(scopeObj.isEdit === false){
        scopeObj.view.flxNoCriteriaError.isVisible = false;
        scopeObj.view.flxAddEligibityCriteria.setVisibility(false);
        scopeObj.view.noStaticData.setVisibility(false);
        scopeObj.view.flxConfigurationsList.setVisibility(true);
        scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
        statusId = scopeObj.view.SwitchToggleStatus.selectedIndex === 1?"SID_INACTIVE":"SID_ACTIVE";
        context = {
          "description":scopeObj.view.txtRoleDescription.text,
          "status_id":statusId};
        scopeObj.presenter.addEligibilityCriteria(context);
      } 
      else{
        var selItems = scopeObj.view.criteriaList.segCriteria.selectedRowIndex[1];
        scopeObj.view.flxNoCriteriaError.isVisible = false;
        scopeObj.view.flxAddEligibityCriteria.setVisibility(false);
        scopeObj.view.criteriaList.flxSelectOptions.setVisibility(false);
        statusId = scopeObj.view.SwitchToggleStatus.selectedIndex === 1?"SID_INACTIVE":"SID_ACTIVE";
        context = {
          "criteriaID":scopeObj.view.criteriaList.segCriteria.data[selItems].lblCriteriaDesc.info,
          "description":scopeObj.view.txtRoleDescription.text,
          "status_id":statusId
        };
        scopeObj.presenter.updateEligibilityCriteria(context);
      }
    };
    this.view.txtRoleDescription.onKeyUp=function(){
      if(scopeObj.view.txtRoleDescription.text.trim().length===0)
      {
        scopeObj.view.lblRoleDescriptionSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.lblRoleDescriptionSize.text=scopeObj.view.txtRoleDescription.text.trim().length+"/2000";
        scopeObj.view.lblRoleDescriptionSize.setVisibility(true);
      }
      scopeObj.view.forceLayout();
    };
    this.view.configLeftMenu.flxHeader1.onTouchStart = function(){
      scopeObj.leftMenuOptionClick(1);
    };
    this.view.configLeftMenu.flxHeader2.onTouchStart = function(){
      scopeObj.leftMenuOptionClick(2);
    };
    this.view.configLeftMenu.flxHeader3.onTouchStart = function(){
      scopeObj.leftMenuOptionClick(3);
    };
    this.view.flxSwitch1.onTouchStart = function(){
      scopeObj.selectedConfig="1";
      scopeObj.approvalSwitchOnClick();
    };
    this.view.flxSwitch2.onTouchStart = function(){
      scopeObj.selectedConfig="2";
      if(scopeObj.view.switchStatus2.selectedIndex===0)
        scopeObj.presenter.fetchCombinedUserCount();
      else
        scopeObj.linkProfileSwitchOnClick();
    };
    this.view.ErrorPopUp.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxErrorPopUp.setVisibility(false);
    };
    this.view.ErrorPopUp.flxPopUpClose.onClick = function(){
      scopeObj.view.flxErrorPopUp.setVisibility(false);
    };
    this.view.flxCheckBox1.onClick = function(){
      if(scopeObj.view.imgCheckBox1.src==="checkboxnormal.png")
        scopeObj.view.imgCheckBox1.src="checkboxselected.png";
      else
        scopeObj.view.imgCheckBox1.src="checkboxnormal.png";
    };
    this.view.flxCheckBox2.onClick = function(){
      if(scopeObj.view.imgCheckBox2.src==="checkboxnormal.png")
        scopeObj.view.imgCheckBox2.src="checkboxselected.png";
      else
        scopeObj.view.imgCheckBox2.src="checkboxnormal.png";
    };
    this.view.flxRadioButton1.onClick = function(){
      if(scopeObj.view.imgRadioBtn1.src==="radio_notselected.png"){
        scopeObj.view.imgRadioBtn1.src="radio_selected.png";
        scopeObj.view.imgRadioBtn2.src="radio_notselected.png";
        scopeObj.view.imgRadioBtn3.src="radio_notselected.png";
      }
      scopeObj.view.forceLayout();
    };
    this.view.flxRadioButton2.onClick = function(){
      if(scopeObj.view.imgRadioBtn2.src==="radio_notselected.png"){
        scopeObj.view.imgRadioBtn2.src="radio_selected.png";
        scopeObj.view.imgRadioBtn1.src="radio_notselected.png";
        scopeObj.view.imgRadioBtn3.src="radio_notselected.png";
      }
      scopeObj.view.forceLayout();
    };
    this.view.flxRadioButton3.onClick = function(){
      if(scopeObj.view.imgRadioBtn3.src==="radio_notselected.png"){
        scopeObj.view.imgRadioBtn3.src="radio_selected.png";
        scopeObj.view.imgRadioBtn1.src="radio_notselected.png";
        scopeObj.view.imgRadioBtn2.src="radio_notselected.png";
      }
      scopeObj.view.forceLayout();
    };
    this.view.btnAdd.onClick = function(){
      scopeObj.showEditAlertConfig();
    };
    this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.view.flxViewAlertConfigContainer.setVisibility(true);
      scopeObj.view.flxEditAlertConfigContainer.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.commonButtons.btnSave.onClick = function(){
      scopeObj.showUpdateConfirmationPopup();
    };
    this.view.flxDefaultInfo.onHover = scopeObj.onHoverInfo;
    this.view.flxCriteriaStatusFilter.onHover = scopeObj.onHoverEventCallback;
  },
  onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var widGetId = widget.id;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view[widGetId].setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view[widGetId].setVisibility(false);
    }
  },

  showDeactivate: function(opt) {
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.Deactivate_Criteria");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.deactivate_Criteria_MessageContent");
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    this.view.flxDeactivateCriteria.setVisibility(true);
    this.view.forceLayout();
  },
  showActivate: function(opt) {
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.Activate_Criteria");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.Are_you_sure_to_Activate_Criteria");
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE");
    this.view.flxDeactivateCriteria.setVisibility(true);

    this.view.forceLayout();
  },
  showDeleteCriteria: function(opt) {
    this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.Delete_Criteria");
    this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.Are_you_sure_to_delete_Criteria");
    this.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    this.view.toastMessage.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.Delete_Criteria_successfully");
    this.view.flxDeleteCriteria.setVisibility(true);
    this.view.forceLayout();
  },
  deleteCriteria: function(){
    var selIndex = this.view.criteriaList.segCriteria.selectedRowIndex[1];
    this.presenter.deleteEligibilityCriteria(this.view.criteriaList.segCriteria.data[selIndex].lblCriteriaDesc.info);
  },
  deactivateCriteria: function(){
    var selIndex = this.view.criteriaList.segCriteria.selectedRowIndex[1];
    var criteriaStatusData={"criteriaID":this.view.criteriaList.segCriteria.data[selIndex].lblCriteriaDesc.info};
    if(this.view.criteriaList.segCriteria.data[selIndex].lblCriteriaStatus.text===kony.i18n.getLocalizedString("i18n.secureimage.Active"))
      criteriaStatusData.status_id="SID_INACTIVE";
    else
      criteriaStatusData.status_id="SID_ACTIVE";
    this.presenter.updateEligibilityCriteriaStatus(criteriaStatusData);
  },
  editCriteria: function(){
    this.view.lblAddCriteria.text=kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.editCriteria");
    var selItems = this.view.criteriaList.segCriteria.selectedRowIndex[1];
    this.view.txtRoleDescription.text=this.view.criteriaList.segCriteria.data[selItems].lblCriteriaDesc.text;
    if(this.view.criteriaList.segCriteria.data[selItems].lblCriteriaStatus.text===kony.i18n.getLocalizedString("i18n.secureimage.Active"))
      this.view.SwitchToggleStatus.selectedIndex = 0;
    else
      this.view.SwitchToggleStatus.selectedIndex = 1;
    this.view.txtRoleDescription.onKeyUp();
    this.view.flxAddEligibityCriteria.setVisibility(true);
  },
  showNoResultsFound: function() {
    this.view.flxLeftOptions.height=240+"px";
    this.view.flxConfigurationsList.height=240+"px";
    this.view.criteriaList.setVisibility(false);
    this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") ;
    this.view.rtxNoRecords.setVisibility(true);
    this.view.flxNoRecordsFound.setVisibility(true);
  },
  hideNoResultsFound: function() {
    this.view.flxLeftOptions.height=kony.os.deviceInfo().screenHeight-160+"px";
    this.view.flxConfigurationsList.height=kony.os.deviceInfo().screenHeight-160+"px";
    this.view.criteriaList.setVisibility(true);
    this.view.rtxNoRecords.setVisibility(false);
    this.view.flxNoRecordsFound.setVisibility(false);
  },
  setCriteriaSegmentData:function(resData,isFilter){
    var self = this;
    var data = [];
    this.view.criteriaList.lblCriteriaDesc.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.elegibleCriteria");
    this.view.criteriaList.lblStatus.text = kony.i18n.getLocalizedString("i18n.roles.STATUS");
    var dataMap = {
      "flxOptions":"flxOptions",
      "lblOptions": "lblOptions",
      "fonticonActive":"fonticonActive",
      "flxStatus": "flxStatus",
      "lblCriteriaDesc": "lblCriteriaDesc",
      "lblCriteriaStatus": "lblCriteriaStatus",
      "lblSeparator": "lblSeparator",
    };
    if (resData) {
      data = resData.map(self.toCriteriaSegment.bind(self));
    }
    else if(resData==[])
      resData.map(this.toCriteriaSegment.bind(self));
    var statusFilter=[];
    this.allCriteriasList=data;
    for(var i=0;i<data.length;i++){
      if(!statusFilter.contains(data[i].lblCriteriaStatus.text))
        statusFilter.push(data[i].lblCriteriaStatus.text);
    }
    if(!isFilter){
      self.setCriteriaStatusFilterData(statusFilter);
    }
    this.view.criteriaList.segCriteria.widgetDataMap = dataMap;
    this.view.criteriaList.segCriteria.setData(data);
    this.view.flxConfigurationsList.setVisibility(true);
    this.view.forceLayout();
  },
  toCriteriaSegment: function(criteriaData) {
    var statusText = "",
        statusSkin = "",
        statusImgSkin = "";
    if (criteriaData.Status_id === "SID_ACTIVE") {
      statusText = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      statusSkin = "sknlblLato5bc06cBold14px";
      statusImgSkin = "sknFontIconActivate";
    } else if (criteriaData.Status_id === "SID_INACTIVE") {
      statusText = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      statusSkin = "sknlblLatocacacaBold12px";
      statusImgSkin = "sknfontIconInactive";
    }
    return {
      lblOptions: {
        "text":"\ue91f",
        "skin": "sknFontIconOptionMenu"
      },
      fonticonActive: {
        "skin":statusImgSkin
      },
      lblCriteriaDesc: {"text":criteriaData.Description,"info":criteriaData.id},
      lblSeparator: ".",
      lblCriteriaStatus: {
        text: statusText,
        skin: statusSkin
      },
      template: "flxCriterias"
    };
  },
  setCriteriaStatusFilterData:function(data){
    var self=this;
    var maxSizeText="";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var filterData = data.map(function(data){
      maxSizeText=data.length>maxSizeText.length?data:maxSizeText;
      return{
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "lblDescription": data,
        "imgCheckBox":{
          "src":"checkbox.png"
        }
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxCriteriaStatusFilter.width=flexWidth+"px";
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(filterData);
    var indices = [];
    for(var index = 0; index < filterData.length; index++){
      indices.push(index);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,indices]];
  },
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var allData = self.criteriaData;
    var segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      for(var i=0;i<selInd.length;i++){
        selStatus.push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription);
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.inFilter=false;
        self.hideNoResultsFound();
        self.setCriteriaSegmentData(self.criteriaData,true);
      } else {
        dataToShow = allData.filter(function(rec){
          if(selStatus.indexOf(rec.Status_id==="SID_ACTIVE"?
                               kony.i18n.getLocalizedString("i18n.secureimage.Active"):
                               kony.i18n.getLocalizedString("i18n.secureimage.Inactive")) >=0 ){
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          self.hideNoResultsFound();
          self.setCriteriaSegmentData(dataToShow,true);
        } else {
          self.view.criteriaList.segCriteria.setData([]);
        }
      }
    }
    else {
      self.view.rtxNoRecords.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
      self.view.rtxNoRecords.setVisibility(true);
      self.view.flxNoRecordsFound.setVisibility(true);
      var data=[];
      self.view.criteriaList.segCriteria.setData(data);
    }
    self.view.forceLayout();
  },
  leftMenuOptionClick : function(opt){
    this.view.configLeftMenu.flxSelected.setVisibility(false);
    this.view.configLeftMenu.flxSelected2.setVisibility(false);
    this.view.configLeftMenu.flxSelected3.setVisibility(false);
    if(opt===1){
      this.view.configLeftMenu.flxSelected.setVisibility(true);
      this.presenter.fetchEligibilityCriteria();
    }else if(opt===2){
      this.view.configLeftMenu.flxSelected2.setVisibility(true);
      this.presenter.fetchAllBusinessConfigurations();
    }else if(opt===3){
      this.view.configLeftMenu.flxSelected3.setVisibility(true);
      this.presenter.fetchAlertConfigurations();
      //this.showAlertConfigurations();
    }
    this.view.forceLayout();
  },
  setBusinessConfigData : function(data){
    for(var i=0;i<data.length;i++){
      if(data[i].key==="BUSINESS_ENROLLMENT_AUTO_APPROVAL"){
        this.view.lblConfigName1.text=data[i].displayname;
        this.view.rtxConfigDescription1.text= data[i].description;
        this.view.switchStatus1.selectedIndex=data[i].value==="0"? 1:0;
        this.view.switchStatus1.disabled=true;
        this.view.lblConfigName1.info=data[i].key;
        this.view.flxBusinessConfigContainer.setVisibility(true);
      }else if(data[i].key==="LINK_RETAIL_AND_BUSINESS_PROFILES"){
        this.view.lblConfigName2.text=data[i].displayname;
        this.view.rtxConfigDescription2.text= data[i].description;
        this.view.switchStatus2.selectedIndex=data[i].value==="0"? 1:0;
        this.view.switchStatus2.disabled=true;
        this.view.lblConfigName2.info=data[i].key;
        this.view.flxLinkProfileConfig.setVisibility(true);
      }
    }
    this.view.forceLayout();
  },
  approvalSwitchOnClick : function(){
    var approvalStatus=this.view.switchStatus1.selectedIndex;
    if(approvalStatus){
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.enableAutoApprove");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.enableAutoApproveMsg");
      this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE");
    }else{
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.disableAutoApprove");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.disableAutoApproveMsg");
      this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE");
    }    
    this.view.flxDeactivateCriteria.setVisibility(true);
    this.view.forceLayout();
  },
  updateBusinessConfiguration : function(){
    var approvalStatus;
    var configWidget="";
    if(this.selectedConfig==="1"){
      approvalStatus=this.view.switchStatus1.selectedIndex;
      configWidget=this.view.lblConfigName1;
    }else if(this.selectedConfig==="2"){
      approvalStatus=this.view.switchStatus2.selectedIndex;
      configWidget=this.view.lblConfigName2;
    }
    var payload= {
      "id":configWidget.info,
      "value":approvalStatus===0?"0":"1"
    };
    this.presenter.updateBusinessConfiguration(payload,configWidget.text);
  },
  linkProfileSwitchOnClick : function(){
    var approvalStatus=this.view.switchStatus2.selectedIndex;
    if(approvalStatus){
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.enableLinkProfile");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.enableLinkProfileMsg");
      this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE");
    }else{
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.disableLinkProfile");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.disableLinkProfileMsg");
      this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
      this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE");
    }    
    this.view.flxDeactivateCriteria.setVisibility(true);
    this.view.forceLayout();
  },
  showErrorPopup : function(){
    this.view.ErrorPopUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.disableLinkingProfiles");
    this.view.ErrorPopUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.disableLinkingProfilesMsg");
    this.view.ErrorPopUp.flxPopUpTopColor.skin="sknFlxBge61919";
    this.view.flxErrorPopUp.setVisibility(true);
    this.view.forceLayout();
  },
  showAlertConfigurations : function(alertConfigs){
    this.view.flxViewAlertConfigContainer.info=alertConfigs;
    var channelFreqText;
    if(alertConfigs.alertPreferenceView==="GROUP")
      channelFreqText= kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.groupLevel");
    else if(alertConfigs.alertPreferenceView==="CATEGORY")
      channelFreqText= kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.categoryLevel");
    else
      channelFreqText= kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.alertLevel");
    this.view.lblChannelFrequencyValue.text=channelFreqText;
    this.view.lblContactConfigValue.text=alertConfigs.enableSeparateContact==="1"?kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Enabled"):kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.notEnabled");
    this.view.lblFrequencyValue.text=alertConfigs.enableFrequency==="1"?kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Enabled"):kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.notEnabled");
    this.view.flxConfigurationsList.setVisibility(false);
    this.view.flxBusinessConfigSegment.setVisibility(false);
    this.view.flxAlertConfigContainer.setVisibility(true);
    this.view.flxViewAlertConfigContainer.setVisibility(true);
    this.view.flxEditAlertConfigContainer.setVisibility(false);
    this.view.forceLayout();
  },
  onHoverInfo : function(widget, context){
    this.view.DefaultInfo.left=this.view.flxDefaultInfo.frame.x-10+"px";
    var scopeObj=this;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER|| context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view.DefaultInfo.setVisibility(true);
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.DefaultInfo.setVisibility(false);
    }
    scopeObj.view.forceLayout();
  },
  showEditAlertConfig : function(){
    var configDetails= this.view.flxViewAlertConfigContainer.info;
    var alertPreferenceView=configDetails.alertPreferenceView;
    var enableSeparateContact=configDetails.enableSeparateContact;
    var enableFrequency=configDetails.enableFrequency;
    this.view.imgRadioBtn3.src="radio_notselected.png";
    this.view.imgRadioBtn1.src="radio_notselected.png";
    this.view.imgRadioBtn2.src="radio_notselected.png";
    if(alertPreferenceView==="CATEGORY")
      this.view.imgRadioBtn1.src="radio_selected.png";
    else if(alertPreferenceView==="GROUP")
      this.view.imgRadioBtn2.src="radio_selected.png";
    else
      this.view.imgRadioBtn3.src="radio_selected.png";
    if(enableSeparateContact==="1")
      this.view.imgCheckBox1.src="checkboxselected.png";
    else
      this.view.imgCheckBox1.src="checkboxnormal.png";
    if(enableFrequency==="1")
      this.view.imgCheckBox2.src="checkboxselected.png";
    else
      this.view.imgCheckBox2.src="checkboxnormal.png";
    this.view.flxViewAlertConfigContainer.setVisibility(false);
    this.view.flxEditAlertConfigContainer.setVisibility(true);
    this.view.forceLayout();
  },
  showUpdateConfirmationPopup: function() {
    this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.common.saveChanges");
    this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmBusinessConfigurations.SaveAlertConfigMsg");
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.flxDeactivateCriteria.setVisibility(true);

    this.view.forceLayout();
  },
  updateAlertConfiguration : function(){
    var configDetails= this.view.flxViewAlertConfigContainer.info;
    var alertPreferenceView="";
    var enableSeparateContact="0";
    var enableFrequency="0";
    if(this.view.imgRadioBtn1.src==="radio_selected.png")
      alertPreferenceView="CATEGORY";
    else if(this.view.imgRadioBtn2.src==="radio_selected.png")
      alertPreferenceView="GROUP";
    else
      alertPreferenceView="ALERT";
    if(this.view.imgCheckBox1.src==="checkboxselected.png")
      enableSeparateContact="1";
    if(this.view.imgCheckBox2.src==="checkboxselected.png")
      enableFrequency="1";
    var editParam= {
      "id": configDetails.id,
      "alertViewPreference": alertPreferenceView,
      "enableFrequency": enableFrequency,
      "enableAlertCommunication": enableSeparateContact
    };
    this.presenter.updateAlertConfiguration(editParam);

  },
});

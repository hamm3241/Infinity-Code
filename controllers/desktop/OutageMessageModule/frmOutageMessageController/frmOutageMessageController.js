define({
  servicesList: [],
  masterData: [],
  records: 0,
  CREATE_SCREEN: 1,
  EDIT_SCREEN: 2,
  DELETE_ACTION: 3,
  TERMINATE_ACTION: 4,
  PAUSE_ACTION: 5,
  RESUME_ACTION: 6,
  currentAction: "",
  inAscendingOrder: true,
  prevIndex : -1,
  appsList: [],
  checkboxselected : "checkboxselected.png",
  checkboxnormal : "checkboxnormal.png",
  sAll : kony.i18n.getLocalizedString("i18n.frmAlertsManagement.All"),
  sSelected: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected"),
  segmentYCoordinate : 0,

  preShowActions: function() {
    this.setflowActions();
    kony.adminConsole.utils.showProgressBar(this.view);
    this.setPreshowData();
    this.setScrollHeight();
    this.view.flxOutageMsg.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.search.tbxSearchBox.text = "";
    this.view.search.flxSearchCancel.setVisibility(false);
    this.view.flxSelectOptionsHeader.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
  },
  shouldUpdateUI: function(viewModel) {
    return viewModel !== undefined && viewModel !== null;
  },

  willUpdateUI: function(outageMsgModel) {
    this.updateLeftMenu(outageMsgModel);
    if(outageMsgModel.appsList){
      this.appsList=outageMsgModel.appsList;
      this.populateApplicationsList(this.appsList);
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    if (outageMsgModel.context === "viewOutageMessages") {
      this.renderOutageMessageList(outageMsgModel.outageMessageList);
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else if (outageMsgModel.context === "createOutageMessage") {
      if(outageMsgModel.data) {
        this.showOutageMessageList(outageMsgModel.data.records, outageMsgModel.context);
      }
      else {
        this.showOutageMessageList(outageMsgModel.data, outageMsgModel.context);
      }
      this.showEditOutageMessage(this.CREATE_SCREEN);
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    else if(outageMsgModel.toast){
      if(outageMsgModel.toast.status === "success"){
        this.view.toastMessage.showToastMessage(outageMsgModel.toast.message,this);
      }else if(outageMsgModel.toast.status === "error"){
        this.view.toastMessage.showErrorToastMessage(outageMsgModel.toast.message,this);
      }
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else if (outageMsgModel.context === "showLoadingScreen") {
      kony.adminConsole.utils.showProgressBar(this.view);
    } else if (outageMsgModel.context === "hideLoadingScreen") {
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else if (outageMsgModel.action === "createEditOutageMessageSuccess") {
      this.hidePopupLoadingScreen();
      this.view.flxAddOutageMessage.setVisibility(false);
      this.fetchOutageMessageData();
    }else if (outageMsgModel.action === "createEditOutageMessageFailure") {
      this.hidePopupLoadingScreen();
      if(outageMsgModel.response.dbpErrCode === "20197"){
        this.view.flxErrorText2.setVisibility(true);
      }
      else {
        this.view.flxAddOutageMessage.setVisibility(false);
        this.view.toastMessage.showErrorToastMessage(outageMsgModel.response.dbpErrMsg, this);
      }
    }
    this.view.forceLayout();
  },

  renderOutageMessageList: function(outageMessageList) {
    var scope=this;
    if (outageMessageList !== undefined ) {
      if (outageMessageList.length === 0) {
        //show Add new screen
        this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Add_Outage_Message");
        this.view.breadcrumbs.setVisibility(false);
        this.view.flxAddOutageMessage.setVisibility(false);
        this.view.flxNoOutageMsgWrapper.setVisibility(true);
        this.view.segOutageMessages.setData([]);
        this.view.segOutageMessages.info = {
          "data": [],
          "searchAndSortData": []
        };
        this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
        this.view.mainHeader.btnAddNewOption.isVisible = false;
        this.view.flxMainContent.setVisibility(false);
      } else {
        //display the list
        this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblServiceOutageMessages");
        this.view.flxNoOutageMsgWrapper.setVisibility(false);
        this.view.mainHeader.btnAddNewOption.isVisible = true;
        this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
        if (outageMessageList) { 
          var self = this;
          this.loadPageData = function () {
            self.showOutageMessageList(outageMessageList);
          };
          this.loadPageData();
        }
      }
    }
  },
  resetSortImages: function() {
     this.determineSortFontIcon(this.sortBy,"lblName",this.view.lblFontIconSortName);
     this.determineSortFontIcon(this.sortBy,"startTimedb",this.view.lblFontIconSortStartDate);
     this.determineSortFontIcon(this.sortBy,"endTimedb",this.view.lblFontIconSortEndDate);
  },

  setflowActions: function() {
    var scopeObj = this;
    this.view.segOutageMessages.onHover=this.saveScreenY;
    this.view.noStaticData.btnAddStaticContent.onClick = function() {
      scopeObj.showEditOutageMessage(scopeObj.CREATE_SCREEN);
    };
    this.view.lblFontIconSortName.onClick = function(){
      
      scopeObj.sortBy.column("lblName");
      var segData = scopeObj.view.segOutageMessages.data;
      scopeObj.view.segOutageMessages.setData(segData.sort(scopeObj.sortBy.sortData));
      scopeObj.resetSortImages();
    };
    this.view.lblFontIconSortStartDate.onClick = function(){
      scopeObj.sortBy.column("startTimedb");
      var segData = scopeObj.view.segOutageMessages.data;
      scopeObj.view.segOutageMessages.setData(segData.sort(scopeObj.sortBy.sortData));
      scopeObj.resetSortImages();
    };
    this.view.lblFontIconSortEndDate.onClick = function(){
      scopeObj.sortBy.column("endTimedb");
      var segData = scopeObj.view.segOutageMessages.data;
      scopeObj.view.segOutageMessages.setData(segData.sort(scopeObj.sortBy.sortData));
      scopeObj.resetSortImages();
    };
    this.view.flxPauseOutage.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.PAUSE_ACTION);
    };
    this.view.flxResumeOption.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.RESUME_ACTION);
    };
	this.view.flxResume.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.RESUME_ACTION);
    };
    this.view.flxTerminateOutage.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.TERMINATE_ACTION);
    };

    this.view.flxDelete.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.DELETE_ACTION);
    };

    this.view.flxPause.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.PAUSE_ACTION);
    };

    this.view.flxTerminate.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.TERMINATE_ACTION);
    };

    this.view.flxDeleteAction.onClick = function(){
      scopeObj.showOutageActionPopup(scopeObj.DELETE_ACTION);
    };
    this.view.flxSelectActions.onHover = function(widget, context) {
      if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widget.setVisibility(false);
      }
    };
    this.view.search.tbxSearchBox.onTouchStart=function(){
      scopeObj.view.search.flxSearchContainer.skin="slFbox0ebc847fa67a243Search";
    };
    this.view.search.tbxSearchBox.onKeyUp = function() {
      if(scopeObj.view.search.tbxSearchBox.text!=="")
        scopeObj.view.search.flxSearchCancel.setVisibility(true);
      else
        scopeObj.view.search.flxSearchCancel.setVisibility(false);
      scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
      scopeObj.searchOutageMessages();
    };
    this.view.search.tbxSearchBox.onEndEditing=function(){
      scopeObj.view.search.flxSearchContainer.skin="sknflxd5d9ddop100";
    };
    this.view.commonButtons.btnCancel.onClick = function() {
      scopeObj.fetchOutageMessageData();
    };
    this.view.addStaticData.rtxAddStaticContent.onKeyUp = function() {
      var messageLength = scopeObj.view.addStaticData.rtxAddStaticContent.text.trim().length;
      if(messageLength===0)
      {
        scopeObj.view.addStaticData.lblMessageSize.setVisibility(false);
      }
      else
      {
        scopeObj.view.addStaticData.lblMessageSize.setVisibility(true);
        scopeObj.view.addStaticData.lblMessageSize.text=messageLength+"/200";
      }
      scopeObj.view.forceLayout();
      scopeObj.hideDescriptionError();
    };
    this.view.commonButtons.btnSave.onClick = function() {
      var isEdit = false;
      if (scopeObj.view.commonButtons.btnSave.text === kony.i18n.getLocalizedString("i18n.permission.SAVE")) {
        isEdit = true;
      } else {
        isEdit = false;
      }
      if(scopeObj.validateFields(isEdit)){
        scopeObj.onSaveClicked(isEdit);
        scopeObj.showOutageMessageList();
      }
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
      scopeObj.clearSelection();
    };
    this.view.search.flxSearchCancel.onClick = function() {
      scopeObj.view.search.tbxSearchBox.text = "";
      scopeObj.view.search.flxSearchCancel.setVisibility(false);
      scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
      scopeObj.hideNoResultsFound();
      scopeObj.searchOutageMessages();
      scopeObj.view.forceLayout();
    };

    this.view.flxHeaderCheckbox.onTouchEnd = function() {
      scopeObj.selectAllRows();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function() {
      var self = scopeObj;
      $("#customCalStartDate").daterangepicker({startDate: moment(), opens: "center", drops: "up", singleDatePicker: true, 
                                                maxDate: moment().add(self.view.customCalStartDate.maxDateRangeInMonths , 'M').format("MM/DD/YYYY"),
                                                minDate:moment().add(self.view.customCalStartDate.minDateRangeInMonths , 'M').format("MM/DD/YYYY")}, 
                                               function (start) {
        self.view.customCalStartDate.value = self.view.customCalStartDate.resetData  = start.format(require("DateTimeUtils_FormExtn").getLocaleFormat());
      } );
      $("#customCalEndDate").daterangepicker({startDate: moment(), opens: "center", drops: "up", singleDatePicker: true, 
                                              maxDate: moment().add(self.view.customCalEndDate.maxDateRangeInMonths , 'M').format("MM/DD/YYYY"),
                                              minDate:moment().add(self.view.customCalEndDate.minDateRangeInMonths , 'M').format("MM/DD/YYYY")}, 
                                             function (start) {
        self.view.customCalEndDate.value = self.view.customCalEndDate.resetData  = start.format(require("DateTimeUtils_FormExtn").getLocaleFormat());
      } );
      scopeObj.view.addStaticData.lblMessageSize.setVisibility(false);
      scopeObj.hideDescriptionError();
      scopeObj.showEditOutageMessage(scopeObj.CREATE_SCREEN);
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.fetchOutageMessageData();
    };
    this.view.flxEdit.onClick = function() {
      scopeObj.hideDescriptionError();
      scopeObj.showEditOutageMessage(scopeObj.EDIT_SCREEN);
    };
    this.view.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeleteOutageMessage.setVisibility(false);
    };
    this.view.flxPopUpClose.onClick = function() {
      scopeObj.view.flxDeleteOutageMessage.setVisibility(false);
    };
    this.view.btnPopUpDelete.onClick = function() {
      scopeObj.navigateToAction();
      scopeObj.view.flxDeleteOutageMessage.setVisibility(false);
      scopeObj.fetchOutageMessageData();
    };
    this.view.flxSelectOptions.onHover = scopeObj.onHoverEventCallback;
    this.view.flxSelectOptionsHeader.onClick = function(){
      if(scopeObj.validateRowsSelected()){
        scopeObj.view.flxSelectActions.setVisibility(!scopeObj.view.flxSelectActions.isVisible);
      	scopeObj.displayOrHideActions();
      }  
      else
        scopeObj.view.flxConflictPopup.setVisibility(true);
    };
    this.view.conflictPopup.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxConflictPopup.setVisibility(false);
    };
    this.view.conflictPopup.flxPopUpClose.onClick = function(){
      scopeObj.view.flxConflictPopup.setVisibility(false);
    };
    this.view.flxAddOutageClose.onClick = function(){
      scopeObj.clearSelection();
      scopeObj.view.flxAddOutageMessage.setVisibility(false);
    };
    this.view.commonButtons.btnCancel.onClick = function(){
      scopeObj.clearSelection();
      scopeObj.view.flxAddOutageMessage.setVisibility(false);
    };
    this.view.flxViewOutageClose.onClick = function(){
      scopeObj.clearSelection();
      scopeObj.view.flxViewOutageMessagePopup.setVisibility(false);
    };
    this.view.customListboxApps.flxDropdown.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
    }; 
    this.view.customListboxApps.flxSelectedText.onClick = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
    };
    this.view.customListboxApps.btnOk.onClick = function(){
      scopeObj.resetAppsError();
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(scopeObj.view.customListboxApps.flxSegmentList.isVisible === false);
  	  scopeObj.view.forceLayout();
    };
    this.view.customListboxApps.flxCheckBox.onClick = function(){
      scopeObj.onClickOfSelectAll();
    };
    this.view.customListboxApps.flxSelectAll.onClick = function() {
      scopeObj.onClickOfSelectAll();
    };
    this.view.customListboxApps.segList.onRowClick = function(){
      scopeObj.onCustomListBoxRowClick();
    };
    this.view.flxViewEditButton.onClick = function(){
      scopeObj.view.flxViewOutageMessagePopup.setVisibility(false);
      scopeObj.showEditOutageMessage(scopeObj.EDIT_SCREEN);
    };
    this.view.tbxData.onBeginEditing = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
      scopeObj.view.lblNameSize.setVisibility(true);
      scopeObj.view.lblNameSize.text = scopeObj.view.tbxData.text.length + "/25";
      scopeObj.view.forceLayout();
    };
    this.view.tbxData.onKeyUp = function(){
      scopeObj.view.flxNoNameError.setVisibility(false);
      scopeObj.view.tbxData.skin="skntbxLato35475f14px";
      scopeObj.view.lblNameSize.text = scopeObj.view.tbxData.text.length + "/25";
      scopeObj.view.forceLayout();
    };
    this.view.tbxData.onEndEditing = function(){
	  scopeObj.view.tbxData.text = scopeObj.view.tbxData.text.trim();
      scopeObj.view.lblNameSize.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.rtxAddStaticContent.onBeginEditing = function(){
      scopeObj.view.customListboxApps.flxSegmentList.setVisibility(false);
      scopeObj.view.lblMessageSize.setVisibility(true);
      scopeObj.view.lblMessageSize.text = scopeObj.view.rtxAddStaticContent.text.length + "/200";
      scopeObj.view.forceLayout();
    };
    this.view.rtxAddStaticContent.onKeyUp = function(){
      scopeObj.view.flxNoMessageError.setVisibility(false);
      scopeObj.view.rtxAddStaticContent.skin="skntxtAreaLato35475f14Px";
      scopeObj.view.lblMessageSize.text = scopeObj.view.rtxAddStaticContent.text.length + "/200";
      scopeObj.view.forceLayout();
    };
    this.view.rtxAddStaticContent.onEndEditing = function(){
	  scopeObj.view.rtxAddStaticContent.text = scopeObj.view.rtxAddStaticContent.text.trim();
      scopeObj.view.lblMessageSize.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.timePicker.lstbxHours.onSelection = function() {
      scopeObj.clearDateValidations();
    };
    this.view.timePicker.lstbxMinutes.onSelection = function() {
      scopeObj.clearDateValidations();
    };
    this.view.timePicker.lstbxAMPM.onSelection = function() {
      scopeObj.clearDateValidations();
    };
    this.view.timePicker1.lstbxHours.onSelection = function() {
      scopeObj.clearDateValidations();
    };
    this.view.timePicker1.lstbxMinutes.onSelection = function() {
      scopeObj.clearDateValidations();
    };
    this.view.timePicker1.lstbxAMPM.onSelection = function() {
      scopeObj.clearDateValidations();
    };
    this.view.customCalStartDate.event = function(){
      scopeObj.clearDateValidations();
    };
    this.view.customCalStartDate.onTouchStart = function(){
      scopeObj.clearDateValidations();
    };
    this.view.customCalEndDate.onTouchStart = function(){
      scopeObj.clearDateValidations();
    };
    this.view.customCalEndDate.event = function(){
      scopeObj.clearDateValidations();
    };
    this.view.flxCopy.onClick = function(){
      scopeObj.showEditOutageMessage(scopeObj.CREATE_SCREEN,true);
    };
    this.view.flxHeaderAppName.onClick = function(){
      var leftPos = scopeObj.view.fontIconSortApp.left;
      if(scopeObj.view.flxAppFilter.isVisible){
        scopeObj.view.flxAppFilter.setVisibility(false);
      }else{
        scopeObj.view.flxAppFilter.onHover = scopeObj.onHoverEventCallback;
        scopeObj.view.flxAppFilter.setVisibility(true);
      }
      if(scopeObj.view.flxSelectOptions.isVisible){
        scopeObj.view.flxSelectOptions.setVisibility(false);
      }
      scopeObj.view.flxStatusFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxHeaders.frame.width - scopeObj.view.flxHeaderAppName.frame.x - scopeObj.view.flxHeaderAppName.frame.width;
      var iconRight = scopeObj.view.flxHeaderAppName.frame.width - scopeObj.view.fontIconSortApp.frame.x;
      scopeObj.view.flxAppFilter.right = (flxRight + iconRight - 33) +"px";
    };
    this.view.flxStatus.onClick = function(){
      if(scopeObj.view.flxStatusFilter.isVisible){
        scopeObj.view.flxStatusFilter.setVisibility(false);
      }else{
        scopeObj.view.flxStatusFilter.onHover = scopeObj.onHoverEventCallback;
        scopeObj.view.flxStatusFilter.setVisibility(true);
      }
      if(scopeObj.view.flxSelectOptions.isVisible){
        scopeObj.view.flxSelectOptions.setVisibility(false);
      }
      scopeObj.view.flxAppFilter.setVisibility(false);
      var flxRight = scopeObj.view.flxHeaders.frame.width - scopeObj.view.flxStatus.frame.x - scopeObj.view.flxStatus.frame.width;
      var iconRight = scopeObj.view.flxStatus.frame.width - scopeObj.view.fontIconSortStatus.frame.x;
      scopeObj.view.flxStatusFilter.right = (flxRight + iconRight - 33) +"px";
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.searchOutageMessages();
    };    
    this.view.appFilterMenu.segStatusFilterDropdown.onRowClick = function(){
      scopeObj.view.statusFilterMenu.segStatusFilterDropdown.onRowClick();
    };
  },
  onHoverEventCallback:function(widget, context) {
    var self = this;
    var path = "";
    if(widget.id === "flxSelectOptions")
      path = this.view.flxSelectOptions;
    else if(widget.id === "flxAppFilter")
      path= this.view.flxAppFilter;
    else if(widget.id === "flxStatusFilter")
      path= this.view.flxStatusFilter;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      path.setVisibility(true);
      if(widget.id === "flxSelectOptions"){
       self.optionButtonStateChange(self.view.segOutageMessages.selectedrowindex[1], true);
      }
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      path.setVisibility(false);
      if(widget.id === "flxSelectOptions"){
        this.clearSelection();
        self.optionButtonStateChange(self.view.segOutageMessages.selectedrowindex[1], false);
      }
    }
  },
  clearSelection : function(){
    this.view.segOutageMessages.selectedIndices = null;
    this.view.flxSelectOptionsHeader.setVisibility(false);
    this.view.imgHeaderCheckBox.src = "checkbox.png";
    this.view.search.flxSearchCancel.setVisibility(false);
    this.view.forceLayout();
  },
  showDeleteFaq: function() {
    this.view.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Delete_FAQ");
    this.view.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.delete_Outage_message_Popup");
    this.view.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    this.view.toastMessage.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Deleted_Outage_Message_successfully");
    this.view.flxDeleteOutageMessage.setVisibility(true);
    this.view.forceLayout();
  },
  setPreshowData: function() {
    this.view.flxAddOutageMessage.setVisibility(false);
    this.view.flxMainHeader.setVisibility(true);
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxDeleteOutageMessage.setVisibility(false);
    this.view.flxNoOutageMsgWrapper.setVisibility(false);
    this.view.noStaticData.lblNoStaticContentCreated.text = kony.i18n.getLocalizedString("i18n.Outage.NoOutageService");
    this.view.noStaticData.lblNoStaticContentMsg.text = kony.i18n.getLocalizedString("i18n.Outage.AddOutageServiceMsg");
    this.view.noStaticData.btnAddStaticContent.text = kony.i18n.getLocalizedString("i18n.Outage.AddOutageService");
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.btnDropdownList.isVisible = false;
    this.view.mainHeader.btnAddNewOption.hoverSkin = "sknBtn163C5DLatoRegularffffff13pxRad28px";
  },
  setScrollHeight: function() {
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    scrollHeight = screenHeight - 106;
    this.view.FlexUserTable.height = scrollHeight - 100 + "px";
    this.view.flxMainContent.height = scrollHeight - 30 + "px";
  },

  prepareCreateScreen: function(isCopy) {
    this.view.lblAddOutageMessageTitle.text=kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Add_Outage_Message");
    this.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAdManagement.CreateCAPS");
    this.resetCreateForm(isCopy);
    this.view.lblDataCol2Edit.setVisibility(false);
    this.view.customListboxApps.setVisibility(true);
    this.view.flxAddOutageMessage.setVisibility(true);
  },  
  resetCreateForm: function(isCopy) {
    this.populateApplicationsList(this.appsList);
    if(isCopy){
      var rowIndex = this.view.segOutageMessages.selectedRowIndex[1];
      var data = this.view.segOutageMessages.data;
      this.view.tbxData.text = "";
      var appIds=data[rowIndex].appId;
      this.selectAppsForCopy(appIds.split(","));
      this.fillEditableFields(data);    
    }
    else
    {
      this.view.tbxData.text = "";
      this.view.rtxAddStaticContent.text = "";
      this.view.customCalStartDate.value = "";
      this.view.customCalStartDate.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
      this.view.customCalEndDate.value = "";
      this.view.customCalEndDate.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
      //Set time picker
      this.view.timePicker.lstbxHours.selectedKey = "hh";
      this.view.timePicker.lstbxMinutes.selectedKey = "mm";
      this.view.timePicker.lstbxAMPM.selectedKey = "AM";
      this.view.timePicker1.lstbxHours.selectedKey = "hh";
      this.view.timePicker1.lstbxMinutes.selectedKey = "mm";
      this.view.timePicker1.lstbxAMPM.selectedKey = "AM";
    }
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
  },
  prepareEditScreen: function() {
    this.view.lblAddOutageMessageTitle.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Edit_Outage_Message");
    this.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.permission.SAVE");
    this.view.flxAddOutageMessage.setVisibility(true);
    this.view.customListboxApps.setVisibility(false);
    this.view.lblDataCol2Edit.setVisibility(true);
    this.showPrefillDataForEdit();
  },

  showEditOutageMessage: function(opt,isCopy) {
    // reset errors
    this.view.flxNoNameError.setVisibility(false);
    this.view.customListboxApps.flxListboxError.setVisibility(false);
    this.view.flxNoMessageError.setVisibility(false);
    this.clearDateValidations();
    this.view.rtxAddStaticContent.skin="skntxtAreaLato35475f14Px";
    this.view.tbxData.skin="skntbxLato35475f14px";
    this.view.customListboxApps.flxSelectedText.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    if(opt ===this.CREATE_SCREEN){
      this.prepareCreateScreen(isCopy);
    }
    else
      this.prepareEditScreen();
    this.view.forceLayout();
  },

  showPrefillDataForEdit: function() {
    var rowIndex = this.view.segOutageMessages.selectedRowIndex[1];
    var data = this.view.segOutageMessages.data;
    this.view.tbxData.text = data[rowIndex].lblName;
    var appName = data[rowIndex].lblAppName.split(",").join(", ");
    this.view.lblDataCol2Edit.text = appName;
    this.fillEditableFields(data);
   
  },
  fillEditableFields : function(data){
     var rowIndex = this.view.segOutageMessages.selectedRowIndex[1];
     this.view.rtxAddStaticContent.text = data[rowIndex].messageText || "";
     if (this.view.rtxAddStaticContent.text.trim()) {
      var messageLength = this.view.rtxAddStaticContent.text.trim().length;
      this.view.lblMessageSize.text = messageLength + "/200";
    }
    var self = this;
    //Start time
    $("#customCalStartDate").daterangepicker({startDate: moment(data[rowIndex].lblStartDate.substring(0,10), 'YYYY-MM-DD'), opens: "center", drops: "up", singleDatePicker: true, 
                                              maxDate: moment().add(self.view.customCalStartDate.maxDateRangeInMonths , 'M').format("MM/DD/YYYY"),
                                              minDate:moment().add(self.view.customCalStartDate.minDateRangeInMonths , 'M').format("MM/DD/YYYY")}, 
                                             function (start) {
      self.view.customCalStartDate.value = self.view.customCalStartDate.resetData  = start.format(require("DateTimeUtils_FormExtn").getLocaleFormat());
    } );
    var startDateInstance = this.getLocalizedDateFromDatabaseTS(data[rowIndex].startTimedb);
    this.view.customCalStartDate.value = (startDateInstance.getMonth() + 1)+"/"+startDateInstance.getDate() + "/" + startDateInstance.getFullYear();
    this.view.customCalStartDate.resetData = this.getLocaleDate(startDateInstance);
    var meridiem = "AM";
    var hours = startDateInstance.getHours();
    if(hours >=12){
      meridiem = "PM";
    }
    if(hours > 12){
      hours = hours - 12;
    } else if(hours === 0){
      hours = 12;
    }
    this.view.timePicker.setTime(hours, startDateInstance.getMinutes(), meridiem);

    //End Time
    $("#customCalEndDate").daterangepicker({startDate: moment(data[rowIndex].lblEndDate.substring(0,10), 'YYYY-MM-DD'), opens: "center", drops: "up", singleDatePicker: true, 
                                            maxDate: moment().add(self.view.customCalEndDate.maxDateRangeInMonths , 'M').format("MM/DD/YYYY"),
                                            minDate:moment().add(self.view.customCalEndDate.minDateRangeInMonths , 'M').format("MM/DD/YYYY")}, 
                                           function (start) {
      self.view.customCalEndDate.value = self.view.customCalEndDate.resetData  = start.format(require("DateTimeUtils_FormExtn").getLocaleFormat());
    } );
    var endDateInstance = this.getLocalizedDateFromDatabaseTS(data[rowIndex].endTimedb);
    this.view.customCalEndDate.value =+ (endDateInstance.getMonth() + 1) + "/" + endDateInstance.getDate() + "/" + endDateInstance.getFullYear();
    this.view.customCalEndDate.resetData = this.getLocaleDate(endDateInstance);
    var endmeridiem = "AM";
    var endhours = endDateInstance.getHours();
    if(endhours >=12){
      endmeridiem = "PM";
    }
    if(endhours > 12){
      endhours = endhours - 12;
    } else if(endhours === 0){
      endhours = 12;
    }
    this.view.timePicker1.setTime(endhours, endDateInstance.getMinutes(), endmeridiem);
  },
  showOutageMessageList: function(res, context) {
    this.view.flxSelectOptions.isVisible = false;
    if(context === undefined || context !== "createOutageMessage") {
      //this.view.flxAddOutageMessage.setVisibility(false);
    }
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxMainContent.setVisibility(true);
    this.view.flxSelectOptions.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxSelectOptionsHeader.setVisibility(false);
    this.view.flxNoRecordsFound.setVisibility(false);
    this.view.flxTableView.setVisibility(true);
    this.view.FlexUserTable.skin = "Copysknflxffffffop0e23e7fddf7bd4b";
    this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.Outage.AddOutageService");
    this.view.mainHeader.btnAddNewOption.isVisible = true;
    if (res !== null && res !== undefined) {
      this.SetOutageMessageSegmentData(res);
    }
    this.view.flxDeleteOutageMessage.setVisibility(false);
  },
  SetOutageMessageSegmentData: function(resData) {
    var self = this;
    var data = [];
    this.view.imgHeaderCheckBox.src="checkbox.png";
    var dataMap = {
      outageId: "outageId",
      appId: "appId",
      statusId:"statusId",
      messageText: "messageText",
      flxCheckbox: "flxCheckbox",
      imgCheckBox: "imgCheckBox",
      lblName: "lblName",
      lblAppName: "lblAppName",
      lblStartDate: "lblStartDate",
      lblEndDate: "lblEndDate",
      fonticonActive: "fonticonActive",
      lblServiceStatus: "lblServiceStatus",
      flxOptions: "flxOptions",
      lblIconOptions: "lblIconOptions",
      lblSeparator: "lblSeparator",
      flxRow: "flxRow",
    };
    if (resData) {
      data = resData.map(this.toOutageSegment.bind(self));
    }
    this.sortBy = this.getObjectSorter("lblName");
    data = data.sort(this.sortBy.sortData);
    this.view.segOutageMessages.widgetDataMap = dataMap;
    this.masterData = data;
    this.setListFiltersData();
    
    this.view.segOutageMessages.setData(data);
    this.view.segOutageMessages.info = {
      "data": data,
      "searchAndSortData": data
    };
    this.resetSortImages();
    document.getElementById("frmOutageMessage_segOutageMessages").onscroll = this.contextualMenuOff;    
    this.view.forceLayout();
    this.view.segOutageMessages.height = this.view.FlexUserTable.frame.height - 63 + "px";
  },
  contextualMenuOff: function() {
    var self = this;
    var newYCoordinate = this.view.segOutageMessages.contentOffsetMeasured.y;
    if (this.view.flxSelectOptions.isVisible) {
      if(self.segmentYCoordinate !== undefined && (self.segmentYCoordinate !== newYCoordinate)){
        this.view.flxSelectOptions.setVisibility(false);
        this.optionButtonStateChange(this.view.segOutageMessages.selectedrowindex[1], false);
      }
    }
    self.segmentYCoordinate = newYCoordinate;
  },
  toOutageSegment: function(outageMessage) {
    var self=this;
    var d =require('AdminConsoleDateTimeUtilities');
    
    var statusText = "",
        statusImgSkin = "",
        statusImgText = "";
    if (outageMessage.Status_id === "SID_OUTAGE_TERMINATED") {
      //Terminated
      statusText = kony.i18n.getLocalizedString("i18n.frmAdManagement.Terminated");
      statusImgText = "\ue905";
      statusImgSkin = "sknFontIconTerminate";
    } else if (outageMessage.Status_id === "SID_OUTAGE_PAUSED") {
      //Paused
      statusText = kony.i18n.getLocalizedString("i18n.frmAdManagement.Paused");
      statusImgText = "\ue91d";
      statusImgSkin = "sknFontIconPause";
    } else if(outageMessage.Status_id === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED"){
      var startDateInstance = d.getLocalizedDateFromDatabaseTS(outageMessage.startTime);
      var endDateInstance = d.getLocalizedDateFromDatabaseTS(outageMessage.endTime);
      var currentDateInstance = new Date();
      if(currentDateInstance.getTime() < startDateInstance.getTime()){
        // Scheduled
        statusText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Scheduled");
        statusImgText = "\ue94a";
        statusImgSkin = "sknFontIconScheduled";
      }else if(currentDateInstance.getTime() > endDateInstance.getTime()){
        // Completed
        statusText = kony.i18n.getLocalizedString("i18n.frmAdManagement.Completed");
        statusImgText = "\ue904";
        statusImgSkin = "sknFontIconCompleted";
      }else if(currentDateInstance.getTime() > startDateInstance.getTime() && currentDateInstance.getTime() < endDateInstance.getTime()){
        // Active
        statusText = kony.i18n.getLocalizedString("i18n.secureimage.Active");
        statusImgText = "\ue921";
        statusImgSkin = "sknFontIconActivate";
      }
    }

    return {
      outageId: outageMessage.id,
      appId: outageMessage.app_id,
      statusId: outageMessage.Status_id,
      messageText: outageMessage.MessageText,
      flxCheckbox:{
        "onClick":this.toggleCheckbox2
      },
      imgCheckBox: {
        src: "checkbox.png"
      },
      lblName: outageMessage.name || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      lblAppName: outageMessage.app_name || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      lblStartDate: d.getLocalizedStandardTimeFromDatabaseTS(outageMessage.startTime,d.STANDARD_CLIENT_DATETIME_FORMAT) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      lblEndDate: d.getLocalizedStandardTimeFromDatabaseTS(outageMessage.endTime,d.STANDARD_CLIENT_DATETIME_FORMAT) || kony.i18n.getLocalizedString("i18n.Applications.NA"),
      startTimedb:outageMessage.startTime,
      endTimedb:outageMessage.endTime,
      fonticonActive: {
        "text":statusImgText,
        "skin":statusImgSkin
      },
      lblServiceStatus: {
        text: statusText || kony.i18n.getLocalizedString("i18n.Applications.NA"),
        skin: "sknlblLatoRegular484b5213px"
      },
      flxOptions:{
        "onClick":this.toggleContextualMenu,
        "skin" : "slFbox"
      },
     lblIconOptions:{ "text":"\ue91f","skin":"sknFontIconOptionMenu"},
     lblSeparator: ".",
     template: "flxOutageMessages",
     flxRow: {
      "onClick":function(){
       self.showViewPopup(outageMessage,statusText);
     }
    }
    };
  },
  showViewPopup: function(row,status) {
    var d = require('AdminConsoleDateTimeUtilities');
    var appName = row.app_name.split(",").join(", ");
    this.view.details1.lblData1.text = row.name || kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.details1.lblData2.text = appName || kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.lblDataRow2.text = row.MessageText || kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.details2.lblData1.text = d.getLocalizedStandardTimeFromDatabaseTS(row.startTime, d.STANDARD_CLIENT_DATETIME_FORMAT) || kony.i18n.getLocalizedString("i18n.Applications.NA");
    this.view.details2.lblData2.text = d.getLocalizedStandardTimeFromDatabaseTS(row.endTime, d.STANDARD_CLIENT_DATETIME_FORMAT) || kony.i18n.getLocalizedString("i18n.Applications.NA");
    if (status === kony.i18n.getLocalizedString("i18n.frmAdManagement.Completed") || row.Status_id === "SID_OUTAGE_TERMINATED"||status === kony.i18n.getLocalizedString("i18n.secureimage.Active")) this.view.flxViewEditButton.setVisibility(false);
    else this.view.flxViewEditButton.setVisibility(true);
    this.view.flxViewOutageMessagePopup.setVisibility(true);
  },
  selectAllRows : function(){
    //outage
    this.view.flxSelectOptions.setVisibility(false);
    var data = this.view.segOutageMessages.data;
    var index = this.view.segOutageMessages.selectedIndices;
    if (index === null) {
      this.view.segOutageMessages.selectedIndices = null;
    }
    if (this.view.imgHeaderCheckBox.src === "checkbox.png") {

      //this.view.flxSepartor2.setVisibility(true);
      this.view.flxSelectOptionsHeader.setVisibility(true);
      this.view.imgHeaderCheckBox.src = "checkboxselected.png";
      var limit = data.length;
      var indices = [[0, []]];
      for (var i = 0; i < limit; i++) {
        indices[0][1].push(i);
      }
      this.view.segOutageMessages.selectedRowIndices = indices;
      var rowIndex = this.view.segOutageMessages.selectedRowIndices[0][1];
      var active = false;
      var inactive = false;
      for (var j = 0; j < rowIndex.length; j++) {
        if (data[rowIndex[j]].lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active"))
          active = true;
        else
          inactive = true;
      }
      } else{
      this.view.segOutageMessages.selectedIndices = null;
      this.view.imgHeaderCheckBox.src = "checkbox.png";
      this.view.flxSelectOptionsHeader.setVisibility(false);
    }
    this.view.mainHeader.btnDropdownList.isVisible =false;
    this.view.forceLayout();
  },
  /*
   * function perform save by calling presentation controller
   */
  onSaveClicked: function(isEdit) {
    var scopeObj = this;
    var statusId = "";
    var selectedApps = [];
    var segData = scopeObj.view.customListboxApps.segList.selecteditems;
    if (segData !== null) {
      for (var i = 0; i < segData.length; i++) {
        selectedApps.push(segData[i].id);
      }
    }
   var startDateTime = scopeObj.getStartEndDates()[0];
   var endDateTime = scopeObj.getStartEndDates()[1];
   var timeOffset=new Date().getTimezoneOffset();
    //Create
    if (!isEdit) {
      var newData1 = {
        Name: scopeObj.view.tbxData.text,
        Status_id: "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED",
        App_ids_Added: selectedApps,
        Start_Time: startDateTime,
        End_Time: endDateTime,
        MessageText: scopeObj.view.rtxAddStaticContent.text.trim(),
        timezoneOffset: timeOffset
      };
      scopeObj.showPopupLoadingScreen();
      scopeObj.presenter.createOutageMessage(newData1);
    } 
    //Edit
    else {
      var index = this.view.segOutageMessages.selectedRowIndex;
      var rowIndex = "";
      if (index !== null) {
        rowIndex = index[1];
      }
      var newData = [];
      var segData1 = scopeObj.view.segOutageMessages.data;
      var outageId = segData1[rowIndex].outageId;
      newData = {
        id: outageId,
        Name: scopeObj.view.tbxData.text,
        MessageText: scopeObj.view.rtxAddStaticContent.text.trim(),
        Status_id: segData1[rowIndex].statusId,
        App_ids_Removed: [],
        App_ids_Added: [],
        Start_Time: startDateTime,
        End_Time: endDateTime,
        timezoneOffset: timeOffset
      };
      scopeObj.showPopupLoadingScreen();
      scopeObj.presenter.editOutageMessage(newData);
    }
  },
      getStartEndDates: function() {
        var dateArray = [];
        var dateAr = [];
        var startTime = this.view.timePicker.getTime();
        var startHrs = parseInt(startTime.Hours);
        if (startTime.Meridiem === "PM" || startTime.Meridiem === "pm" && startHrs < 12) startHrs = startHrs + 12;
        if (startTime.Meridiem === "AM" || startTime.Meridiem === "am" && startHrs === 12) startHrs = startHrs - 12;
        var endTime = this.view.timePicker1.getTime();
        var endHrs = parseInt(endTime.Hours);
        if (endTime.Meridiem === "PM" || endTime.Meridiem === "pm" && endHrs < 12) endHrs = endHrs + 12;
        if (endTime.Meridiem === "AM" || endTime.Meridiem === "am" && endHrs === 12) endHrs = endHrs - 12;
        var startDateToUTC = this.view.customCalStartDate.value;
        var endDateToUTC = this.view.customCalEndDate.value;
        var [mo, da, ye] = ["","",""];
        var [m, d, y] = ["","",""];
        if(startDateToUTC.indexOf("/") >= 0){
          [mo, da, ye] = startDateToUTC.split('/');
        } else if(startDateToUTC.indexOf("-") >= 0){
          [mo, da, ye] = startDateToUTC.split('-');
        }
        mo = mo.length === 1 && (parseInt(mo) <10) ? "0"+mo : mo;
        da = da.length === 1 && (parseInt(da) <10) ? "0"+da : da;
        var finalStartingDate = ye + "-" + mo + "-" + da;
        var startDateTime1 = finalStartingDate + " " + startHrs + ":" + startTime.Minutes + ":" + "00";
        if(endDateToUTC.indexOf("/") >= 0){
          [m, d, y] = endDateToUTC.split('/');
        } else if(endDateToUTC.indexOf("-") >= 0){
          [m, d, y] = endDateToUTC.split('-');
        }
        m = m.length === 1 && (parseInt(m) <10) ? "0"+m : m;
        d = d.length === 1 && (parseInt(d) <10) ? "0"+d : d;
        var finalDateEnding = y + "-" + m + "-" + d;
        var endDateTime1 = finalDateEnding + " " + endHrs + ":" + endTime.Minutes + ":" + "00";
        dateAr.push(startDateTime1, endDateTime1);
        return dateAr;
       /* if ((ch >= 1 || chaStart >=0) &&(charEnding === -1)){//|| chaStart === "/" || charEnd === "/") {
          const [mo, da, ye] = startDateToUTC.split('/');
          var finalStartingDate = ye + "-" + mo + "-" + da;
          var startDateTime1 = finalStartingDate + " " + startHrs + ":" + startTime.Minutes + ":" + "00";
          const [m, d, y] = endDateToUTC.split('/');
          var finalDateEnding = y + "-" + m + "-" + d;
          var endDateTime1 = finalDateEnding + " " + endHrs + ":" + endTime.Minutes + ":" + "00";
          dateAr.push(startDateTime1, endDateTime1);
          return dateAr;
        } 
		       else if(charStarting===2 &&charEnd ==1){
		            const [mo, da, ye] = startDateToUTC.split('-');
            var finalStartingDate = ye + "-" + mo + "-" + da;
            var startDateTime1 = finalStartingDate + " " + startHrs + ":" + startTime.Minutes + ":" + "00";
            const [m, d, y] = endDateToUTC.split('/');
            var finalDateEnding = y + "-" + m + "-" + d;
            var endDateTime1 = finalDateEnding + " " + endHrs + ":" + endTime.Minutes + ":" + "00";
            dateAr.push(startDateTime1, endDateTime1);
            return dateAr;
        } 
		       		else if ((char===2|| charEnd===1)&&(charStarting!=2)){// === "-" || char === "-" || chaStart === "/" || charEnd === "/") {
            const [month, date, year] = startDateToUTC.split('/');
            var finalStartDate = year + "-" + month + "-" + date;
            var startDateTime = finalStartDate + " " + startHrs + ":" + startTime.Minutes + ":" + "00";
            const [mon, dat, yr] = endDateToUTC.split('-');
            var finalEndDate = yr + "-" + mon + "-" + dat;
            var endDateTime = finalEndDate + " " + endHrs + ":" + endTime.Minutes + ":" + "00";
            dateArray.push(startDateTime, endDateTime);
            return dateArray;
        }
        else if(charStarting >= 0 && charEnding  >= 0 ){
          const [month, date, year] = startDateToUTC.split('-');
          var finalStartDate = year + "-" + month + "-" + date;
          var startDateTime = finalStartDate + " " + startHrs + ":" + startTime.Minutes + ":" + "00";
          const [mon, dat, yr] = endDateToUTC.split('-');
          var finalEndDate = yr + "-" + mon + "-" + dat;
          var endDateTime = finalEndDate + " " + endHrs + ":" + endTime.Minutes + ":" + "00";
          dateArray.push(startDateTime, endDateTime);
          return dateArray;  
        }*/
    },
  hideDescriptionError : function(){
    this.view.addStaticData.flxNoDescriptionError.setVisibility(false);
    this.view.addStaticData.rtxAddStaticContent.skin = "skntxtAreaLato0i538905e260549Stat";
  },
  showErrorMessage: function() {
    if (this.view.customListboxApps.selectedKey === "placeholder") {
      this.view.flxNoOutageMsgError.setVisibility(true);
    } 
    if (this.view.addStaticData.rtxAddStaticContent.text === "") {
      this.view.addStaticData.rtxAddStaticContent.skin = "skinredbg";
      this.view.addStaticData.rtxAddStaticContent.height = "170px";
      this.view.addStaticData.flxNoDescriptionError.setVisibility(true);
    } else this.view.addStaticData.rtxAddStaticContent.skin = "skntxtAreaLato0i538905e260549Stat";
  },
  /*
   * function to call presentation controller to fetch segment data
   */
  fetchOutageMessageData: function() {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.fetchOutageMessage();
  },
  showNoResultsFound: function() {
    this.view.flxTableView.setVisibility(false);
    this.view.flxNoRecordsFound.setVisibility(true);
    this.view.rtxNoRecords.setVisibility(true);
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.search.tbxSearchBox.text);
    this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + '"' + searchText + '"' + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
  },
  hideNoResultsFound: function() {
    this.view.flxTableView.setVisibility(true);
    this.view.flxNoRecordsFound.setVisibility(false);
    this.view.rtxNoRecords.setVisibility(false);
  },

  /*
   * function to get search box text and call search
   */
  searchOutageMessages: function() {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.search.tbxSearchBox.text);
    var data = this.filterBasedOnAppStatus();
    this.view.segOutageMessages.setData(data);
    if (data.length === 0 && searchTxt !== "") {
      this.showNoResultsFound();
    } else if(data.length === 0 && searchTxt === ""){
      this.view.flxNoRecordsFound.setVisibility(true);
      this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNorecords");
    } else {
      this.hideNoResultsFound();
    }
    this.view.forceLayout();
  },

  sortData: function(Permission1, Permission2) {
    var s1 = Permission1.statusId;
    var s2 = Permission2.statusId;
    var comparisonResult = this.sortAlphaNum(s1, s2);
    if (this.inAscendingOrder) {
      return comparisonResult;
    } else {
      return comparisonResult === 1 ? -1 : 1;
    }
  },

  sortAlphaNum: function(a, b) {
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var aA = a.replace(reA, "");
    var bA = b.replace(reA, "");
    if (aA === bA) {
      var aN = parseInt(a.replace(reN, ""), 10);
      var bN = parseInt(b.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  },
  sortIconFor: function(column){
    var self = this;
    return self.determineSortFontIcon(self.sortBy,column);
  },
  //Temporary fix for onclick actions on the segment (8.3 issue)
  toggleContextualMenu : function(){
    var scopeObj = this;
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
    kony.application.getCurrentForm().imgHeaderCheckBox.src = "checkbox.png";
    var index = kony.application.getCurrentForm().segOutageMessages.selectedRowIndex;
    scopeObj.optionButtonStateChange(index[1], true);
    
    var sectionIndex = index[0];
    var rowIndex = index[1];
    kony.application.getCurrentForm().segOutageMessages.selectedIndices = null;
    var mainSegmentRowIndex;
    kony.store.setItem(mainSegmentRowIndex, rowIndex); 
    var templateHeight=65;
    var data = kony.application.getCurrentForm().segOutageMessages.data;
    var height = 45+((rowIndex+1)*templateHeight);
    if (kony.application.getCurrentForm().flxSelectOptions.isVisible === false) {
      this.filterContextualMenuWithStatus(data[rowIndex]);
      kony.application.getCurrentForm().flxSelectOptions.setVisibility(true);
    }
    else{
      kony.application.getCurrentForm().flxSelectOptions.setVisibility(false);
      kony.application.getCurrentForm().forceLayout();
    }
    this.view.forceLayout();
    this.fixContextualMenu(this.mouseYCoordinate-150);
    kony.print("toggleVisibility TableView called");
  },
  filterContextualMenuWithStatus : function(row){
    var status = row.statusId;
    var flexChildrenlength = this.view.flxSelectOptionsInner.children.length;
    for(var i = 0; i < flexChildrenlength; i++) {
      this.view[this.view.flxSelectOptionsInner.children[i]].setVisibility(true);
    }
    if(status === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED" && row.lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.frmAdManagement.Completed")){
      for(var k = 0; k < flexChildrenlength; k++) {
        this.view[this.view.flxSelectOptionsInner.children[k]].setVisibility(false);
      }
      this.view.flxCopy.setVisibility(true);
    }
    else if(status === "SID_OUTAGE_PAUSED"){
      this.view.flxPauseOutage.setVisibility(false);
    }
    else if(status === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED" && row.lblServiceStatus.text !== kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active")){
      this.view.flxPauseOutage.setVisibility(false);
      this.view.flxTerminateOutage.setVisibility(false);
      this.view.flxResumeOption.setVisibility(false);
    }
    else if(row.lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active")){
     this.view.flxResumeOption.setVisibility(false);
     this.view.flxEdit.setVisibility(false);
    }
    else if(status === "SID_OUTAGE_TERMINATED"){
      for(var j = 0; j < flexChildrenlength; j++) {
        this.view[this.view.flxSelectOptionsInner.children[j]].setVisibility(false);
      }
      this.view.flxCopy.setVisibility(true);
    }
  },
  optionButtonStateChange : function(selectedIndex,condition){
    var scopeObj = this;
    var data = scopeObj.view.segOutageMessages.data;
    
    if(scopeObj.prevIndex !=-1 && scopeObj.prevIndex < data.length){
      var tempDataPrev = data[scopeObj.prevIndex];
      tempDataPrev.flxOptions.skin = "slFbox";
      scopeObj.view.segOutageMessages.setDataAt(tempDataPrev, scopeObj.prevIndex, 0);
    }
    var tempDataCurrent = data[selectedIndex];
    tempDataCurrent.flxOptions.skin = condition === true ?"sknflxffffffop100Border424242Radius100px":"slFbox";
    scopeObj.view.segOutageMessages.setDataAt(tempDataCurrent, selectedIndex, 0);
    scopeObj.prevIndex = selectedIndex;
  },

  fixContextualMenu:function(heightVal){
    var scopeObj = this;
    if(((this.view.flxSelectOptions.frame.height+heightVal)>(this.view.segOutageMessages.frame.height+50))&&this.view.flxSelectOptions.frame.height<this.view.segOutageMessages.frame.height){
      scopeObj.view.flxSelectOptions.top=((heightVal-this.view.flxSelectOptions.frame.height)-50)+"px";
      scopeObj.view.flxUpArrowImage.setVisibility(false);
      scopeObj.view.flxDownArrowImage.setVisibility(true);
      scopeObj.view.flxSelectOptionsInner.top = "0px";
    }
    else{
      scopeObj.view.flxSelectOptions.top=(heightVal-20)+"px";
      scopeObj.view.flxDownArrowImage.setVisibility(false);
      scopeObj.view.flxUpArrowImage.setVisibility(true);
      scopeObj.view.flxSelectOptionsInner.top = "-1px";
    }
    this.view.forceLayout();
  }, 
  toggleCheckbox2: function() {
    var index = kony.application.getCurrentForm().segOutageMessages.selectedIndices;
    var data = kony.application.getCurrentForm().segOutageMessages.data;
    if(index !== null && index!==undefined && index[0][1].length>0){
      var flag =true;
      if(this.validateRowsSelected()){
      var row = data[index[0][1][0]];
      var status = row.statusId;
      if(status === "SID_OUTAGE_TERMINATED" || (status === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED" && row.lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.frmAdManagement.Completed")))
      	flag=false;
      else
        flag=true;
      }
      this.view.flxSelectOptionsHeader.setVisibility(flag);
    }
    else
      this.view.flxSelectOptionsHeader.setVisibility(false);

    if (index !== null && data.length === index[0][1].length){
      this.view.imgHeaderCheckBox.src = "checkboxselected.png";
    }
    else this.view.imgHeaderCheckBox.src = "checkbox.png";
    this.view.forceLayout();
  },
  showAllOptions : function(){
    //kony.application.getCurrentForm().flxSepartor2.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showDeactivateAndDelete : function()
  {
    //kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showActivateAndDelete : function()
  {
    //kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  populateApplicationsList : function(list){
    var self = this;
    var widgetPath = self.view.customListboxApps;
    var data = self.mapCustomerColumnsList(list);
    widgetPath.segList.setData(data);
    widgetPath.segList.selectedIndices =[[0,[0]]];
    widgetPath.lblSelectedValue.text = "All";
    widgetPath.imgCheckBox.src = self.checkboxnormal;
    self.onClickOfSelectAll();
  },
  mapCustomerColumnsList: function(data) {
    var self = this;
    var listBoxData = [];
    var widgetDataMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox":"flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    self.view.customListboxApps.segList.widgetDataMap = widgetDataMap;
    if (data) {
      listBoxData = data.map(function(rec) {
        return {
          "id": rec.appId,
          "lblDescription": {"text":rec.appName},
          "imgCheckBox": {"src":self.checkboxnormal},
          "template": "flxSearchDropDown"
        };
      });
    }
    return listBoxData;
  },
  onCustomListBoxRowClick : function(){
    var self = this;
    var widgetPath ="",segData ="";
    widgetPath = self.view.customListboxApps;
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    var selRows = widgetPath.segList.selectedRowItems;
    self.resetAppsError();
    if (selRows) {
      if (selRows.length === segData.length) {
        widgetPath.imgCheckBox.src = self.checkboxselected;
        widgetPath.lblSelectedValue.text = self.sAll;
        widgetPath.segList.selectedIndices = [
          [0, arr]
        ];
      } else {
        widgetPath.lblSelectedValue.text = selRows.length + " " + self.sSelected;
        widgetPath.imgCheckBox.src = self.checkboxnormal;}
    }else{
      widgetPath.lblSelectedValue.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableApps");
    }
    self.view.forceLayout();

  },
  onClickOfSelectAll : function(){
    var self = this;
    var widgetPath ="",segData ="";
    widgetPath = self.view.customListboxApps;
    segData = widgetPath.segList.data;
    var arr = [];
    for(var i= 0; i< segData.length; i++){
      arr.push(i);
    }
    if(widgetPath.imgCheckBox.src === self.checkboxnormal){
      widgetPath.imgCheckBox.src = self.checkboxselected;
      widgetPath.lblSelectedValue.text = self.sAll;
      widgetPath.segList.selectedIndices = [[0,arr]];
      self.resetAppsError();
    }else if(widgetPath.imgCheckBox.src === self.checkboxselected){
      widgetPath.imgCheckBox.src = self.checkboxnormal;
      widgetPath.segList.selectedIndices = null;
      widgetPath.lblSelectedValue.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagement.SelectApplicableApps");
	 }
    self.view.forceLayout();
  },
  resetAppsError : function(){
    var selRows = this.view.customListboxApps.segList.selectedRowItems;
    if(selRows!== null && selRows.length >0){
      this.view.customListboxApps.flxListboxError.setVisibility(false);
      this.view.customListboxApps.flxSelectedText.skin="sknflxffffffop100Bordercbcdd1Radius3px";
    }
  },
  validateFields : function(isEdit){
	var isValid =true;
    //Message validation
    var message = this.view.rtxAddStaticContent.text;
    var alphanumeric = /[^\d|a-z|A-Z|\s,|.|-]/i;
    if (message === "") {
      this.view.rtxAddStaticContent.skin = "skinredbg";
      this.view.flxNoMessageError.setVisibility(true);
      this.view.lblNoDescriptionError.text = kony.i18n.getLocalizedString("i8n.outageMessages.error.message");
      isValid = false;
    }else if(alphanumeric.test(message)) {
      this.view.rtxAddStaticContent.skin = "skinredbg";
      this.view.flxNoMessageError.setVisibility(true);
      this.view.flxNoMessageError.width = "100%";
      this.view.lblNoDescriptionError.text = kony.i18n.getLocalizedString("i8n.outageMessages.warning.allowedMessage");
      isValid = false;
    }
    // Date time validations
    if(this.view.customCalStartDate.value === "" || this.view.customCalEndDate.value === "" || this.view.timePicker.lstbxHours.selectedKey === "hh" || this.view.timePicker.lstbxMinutes.selectedKey === "mm"|| this.view.timePicker1.lstbxHours.selectedKey === "hh" || this.view.timePicker1.lstbxMinutes.selectedKey === "mm"){
      this.view.flxErrorText.setVisibility(true);
      this.view.lblErrorText.text = kony.i18n.getLocalizedString("i8n.outageMessages.error.startEndDatesRequired");
      isValid = false;
      if(this.view.customCalStartDate.value === "")
        this.view.flxCalendarStartDate.skin="sknRedBorder";
      if(this.view.customCalEndDate.value === "")
        this.view.flxCalendarEndDate.skin="sknRedBorder";
      if(this.view.timePicker.lstbxHours.selectedKey === "hh" || this.view.timePicker.lstbxMinutes.selectedKey === "mm")
        this.view.timePicker.flxOuterBorder.skin="sknRedBorder";
      if(this.view.timePicker1.lstbxHours.selectedKey === "hh" || this.view.timePicker1.lstbxMinutes.selectedKey === "mm")
        this.view.timePicker1.flxOuterBorder.skin="sknRedBorder";
    }
    else{ 
      var startDateTime = new Date(this.getStartEndDates()[0]);
      var endDateTime = new Date(this.getStartEndDates()[1]);
      var diff=(startDateTime.getTime()-(new Date().getTime()))/1000;
      diff /= (60 * 60 * 24 * 7 * 4);
      diff = Math.abs(Math.round(diff));
      if ((startDateTime > endDateTime)|| (startDateTime.getTime() ===endDateTime.getTime())) {
        this.view.lblErrorText.text = kony.i18n.getLocalizedString("i8n.outageMessages.error.endLessThanStartDate");
        this.errorDateValidations();
      	isValid = false;
      }
      else if(diff > 3 && (startDateTime.getTime() > new Date().getTime())){
        this.view.lblErrorText.text = kony.i18n.getLocalizedString("i8n.outageMessages.error.starthreeMonthsFromStart");
      	this.view.flxErrorText.setVisibility(true);
        this.view.flxCalendarStartDate.skin="sknRedBorder";
        this.view.timePicker.flxOuterBorder.skin="sknRedBorder";
        this.view.timepicker.lstbxAMPM.skin="redListBxSkin";
        isValid = false;
      }
      else if(!isEdit &&((startDateTime.getTime() < new Date().getTime()) && (endDateTime.getTime() < new Date().getTime()))) {
        this.view.lblErrorText.text = kony.i18n.getLocalizedString("i8n.outageMessages.error.messageScheduledForPast");
      	this.errorDateValidations();
        isValid = false;
      }
    }
    //Name validations
    var name = this.view.tbxData.text;
    var alphaNumeric = /[^\d|a-z|A-Z|\s,|.|-]/i;
    if(name === "" ){
        this.view.flxNoNameError.setVisibility(true);
        this.view.lblNoNameError.text= kony.i18n.getLocalizedString("i8n.outageMessages.error.name");
        this.view.tbxData.skin = "skinredbg";
        isValid = false;
      }
      else if(alphaNumeric.test(name)){
        this.view.flxNoNameError.setVisibility(true);
        this.view.lblNoNameError.text= kony.i18n.getLocalizedString("i8n.outageMessages.warning.allowedName");
        this.view.tbxData.skin = "skinredbg";
        isValid = false;
      }
    //Create
    if(!isEdit){
      // Apps Listbox validation
      var segData = this.view.customListboxApps.segList.selecteditems;
      if(segData === null || segData.length===0){
       this.view.customListboxApps.flxSelectedText.skin="sknRedBorder";
       this.view.customListboxApps.flxListboxError.setVisibility(true);
       isValid = false;
      }
    }
	return isValid;
  },
  validateRowsSelected : function(){
    var flag=true;
    this.view.conflictPopup.flxPopUpTopColor.skin="sknRedFill";
    var index = kony.application.getCurrentForm().segOutageMessages.selectedIndices;
    var length;
    if (index !== null && index!==undefined) {
      length = index[0][1].length;
      var data = kony.application.getCurrentForm().segOutageMessages.data;
      var rowStatus="";
      for(var i =0; i< length; i++){
        var currRowStatus = data[index[0][1][i]].lblServiceStatus.text;
        if(rowStatus!=="" && (rowStatus !== currRowStatus)){
          flag=false;
          break;
        }
        else{
          rowStatus=currRowStatus;
        }
      }
    }
    return flag;
  },
   selectAppsForCopy : function(appIds){
    var selectInd = [];
    var segData = this.view.customListboxApps.segList.data;
    for(var i=0;i<segData.length;i++){
      for(var j=0;j<appIds.length;j++){
        if(appIds[j] === segData[i].id){
          selectInd.push(i);
        } 
      }
    }
    this.view.customListboxApps.segList.selectedRowIndices = [[0,selectInd]];
    if(segData.length === selectInd.length){
      this.view.customListboxApps.imgCheckBox.src = this.checkboxselected;
      this.view.customListboxApps.lblSelectedValue.text = this.sAll;
    }else{
      this.view.customListboxApps.imgCheckBox.src = this.checkboxnormal;
      this.view.customListboxApps.lblSelectedValue.text = selectInd.length+ " "+this.sSelected;
    }
  },
  displayOrHideActions: function() {
    var index = this.view.segOutageMessages.selectedIndices;
    var data = this.view.segOutageMessages.data;
    if (index !== null) {
      var row = data[index[0][1][0]];
      var status = row.statusId;
      var flexChildrenlength = this.view.flxSelectActions.children.length;
      for (var i = 0; i < flexChildrenlength; i++) {
        this.view[this.view.flxSelectActions.children[i]].setVisibility(false);
      }
      if (status === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED" && row.lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.frmAdManagement.Completed")) {
        this.view.flxSelectOptionsHeader.setVisibility(false);                
        this.view.flxSelectOptions.setVisibility(false);
      }else if (status === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED" && row.lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Active")) {
        for (var j = 0; j < flexChildrenlength; j++) {
          this.view[this.view.flxSelectActions.children[j]].setVisibility(true);
        }
        this.view.flxResume.setVisibility(false);
      }else if (status === "SID_OUTAGE_PAUSED") {
        this.view.flxDeleteAction.setVisibility(true);
        this.view.flxTerminate.setVisibility(true);
        this.view.flxResume.setVisibility(true);
      } else if (status === "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED") {
        this.view.flxDeleteAction.setVisibility(true);
      } else {
        this.view.flxSelectOptions.setVisibility(false);
        this.view.flxSelectOptionsHeader.setVisibility(false);
      }
    }
  },
  setListFiltersData: function () {
    var self = this;
    var statusList=[],appList=[];
    var maxSizeText="";
    for (var i = 0; i < self.masterData.length; i++) {
      if (!statusList.contains(self.masterData[i].lblServiceStatus.text)) statusList.push(self.masterData[i].lblServiceStatus.text);
      var apps = (self.masterData[i].lblAppName).split(",");
      for(var j=0;j<apps.length;j++){
        if (!appList.contains(apps[j])) {
          appList.push(apps[j]);
        }
      }
    }
    //Status Filter
    var widgetMap = {
      "Status_id": "Status_id",
      "Type_id": "Type_id",
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    var statusData = statusList.map(function(rec){
      maxSizeText=rec.length>maxSizeText.length?rec:maxSizeText;
      return {
        "Status_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": rec
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxStatusFilter.width=flexWidth+"px";
    //Apps FIlter
    maxSizeText="";
    var appData = appList.map(function(rec){
      maxSizeText=rec.length>maxSizeText.length?rec:maxSizeText;
      return {
        "Type_id": rec,
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "imgCheckBox": "checkbox.png",
        "lblDescription": {"text":rec,
                           "tooltip":rec}
      };
    });
    flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxAppFilter.width=flexWidth+"px";
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.appFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(statusData);
    self.view.appFilterMenu.segStatusFilterDropdown.setData(appData);

    var selStatusInd = [],selTypeInd = [];
    for(var j=0;j<statusList.length;j++){
      selStatusInd.push(j);
    }
    for(var k=0;k<appList.length;k++){
      selTypeInd.push(k);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selStatusInd]];
    self.view.appFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,selTypeInd]];
    self.view.forceLayout();
  },
  filterBasedOnAppStatus : function(){
    var self = this;
    var selFilter = [[]];
    var dataToShow = [];
    var dataList = self.masterData;
    var statusIndices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    var appIndices = self.view.appFilterMenu.segStatusFilterDropdown.selectedIndices;
    selFilter[0][1] = [];
    selFilter[0][0] = [];
    var selStatusInd = null;
    var selappInd = null;
    var searchKey = self.AdminConsoleCommonUtils.getEncodedTextInput(self.view.search.tbxSearchBox.text);
    //get selected types
    selappInd = appIndices ? appIndices[0][1] : [];
    for (var i = 0; i < selappInd.length; i++) {
      selFilter[0][0].push(self.view.appFilterMenu.segStatusFilterDropdown.data[selappInd[i]].Type_id);
    }
    //get selected status
    selStatusInd = statusIndices ? statusIndices[0][1] : [];
    for (var j = 0; j < selStatusInd.length; j++) {
      selFilter[0][1].push(self.view.statusFilterMenu.segStatusFilterDropdown.data[selStatusInd[j]].Status_id);
    }
    if (selFilter[0][0].length === 0 || selFilter[0][1].length === 0) { //none selected - show no results
      dataToShow = [];
    } else if (selFilter[0][0].length > 0 && selFilter[0][1].length > 0) {//both filters selected
      dataToShow = dataList.filter(function (rec) {
        var appsArray = rec.lblAppName.split(",");
        if (selFilter[0][1].indexOf(rec.lblServiceStatus.text) >= 0) {
          for(var arr=0;arr<appsArray.length;arr++){
            // filter based on selected filter and searchbox text
            if(selFilter[0][0].contains(appsArray[arr]) && 
               rec.lblName.toLowerCase().indexOf(searchKey.toLowerCase()) >= 0)
              return rec;
          }
        }
      });
    } else { //single filter selected
    }
    return dataToShow;
  },
  deleteOutageMessage: function() {
    var scopeObj = this;
    var payload;
    scopeObj.view.flxSelectActions.setVisibility(false);
    if(scopeObj.view.segOutageMessages.selecteditems !== null){
      var messages = scopeObj.view.segOutageMessages.selecteditems.map(function(outageMsg) {
        return {
          "id": outageMsg.outageId
        };
      });
     payload = {
        "OutageMessageIds": messages
      };
    }
    else{
      payload = {
        "OutageMessageIds":[{
          "id": scopeObj.view.segOutageMessages.data[scopeObj.view.segOutageMessages.selectedRowIndex[1]].outageId
        }]
      };
    }
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    scopeObj.view.search.tbxSearchBox.text = "";
    scopeObj.view.search.flxSearchCancel.setVisibility(false);
    scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
    scopeObj.view.imgHeaderCheckBox.src = "checkbox.png";
    scopeObj.presenter.deleteOutageMessage(payload);
  }, 
  updateOutageMessage: function() {
    var scopeObj = this;
    var payload;
    var status;
    scopeObj.view.flxSelectActions.setVisibility(false);
    if(scopeObj.currentAction == scopeObj.TERMINATE_ACTION)
      status = "SID_OUTAGE_TERMINATED";
    else if(scopeObj.currentAction == scopeObj.PAUSE_ACTION)
      status ="SID_OUTAGE_PAUSED";
    else
      status = "SID_OUTAGE_SCHEDULED_ACTIVE_COMPLETED";
    if(scopeObj.view.segOutageMessages.selecteditems !== null){
      var messages = scopeObj.view.segOutageMessages.selecteditems.map(function(outageMsg) {
        return {
          "id": outageMsg.outageId,
          "Status_id": status
        };
      });
      payload =  {
        "OutageMessageIds":messages
      };
    }
    else{
      payload = {
        "OutageMessageIds":[{
          "id": scopeObj.view.segOutageMessages.data[scopeObj.view.segOutageMessages.selectedRowIndex[1]].outageId,
          "Status_id": status
        }]
      };
    }
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    scopeObj.view.search.tbxSearchBox.text = "";
    scopeObj.view.search.flxSearchCancel.setVisibility(false);
    scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
    scopeObj.view.imgHeaderCheckBox.src = "checkbox.png";
    scopeObj.presenter.bulkUpdateOutageMessage(payload);
  },
  showOutageActionPopup : function(action)
  {
    this.currentAction = action;
    var messageHeading;
    var messageText;
    var toastMessage;
    if(action === this.DELETE_ACTION){
      toastMessage= kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Deleted_Outage_Message_successfully");
      messageHeading = kony.i18n.getLocalizedString("i18n.OutageMessage.delete");
      messageText = kony.i18n.getLocalizedString("i18n.frmOutageMessages.popUp.DeleteOutageText");
    }
    else if(action === this.TERMINATE_ACTION){
      toastMessage= kony.i18n.getLocalizedString("i18n.frmOutageMessageController.i18n.frmoutage.updatedsuccessfully");
      messageHeading =kony.i18n.getLocalizedString("i18n.OutageMessage.terminate");
      messageText = kony.i18n.getLocalizedString("i18n.frmOutageMessages.popUp.TerminateOutageText");
    }
    else if(action === this.PAUSE_ACTION){
      toastMessage= kony.i18n.getLocalizedString("i18n.frmOutageMessageController.i18n.frmoutage.updatedsuccessfully");
      messageHeading =kony.i18n.getLocalizedString("i18n.OutageMessage.pause");
      messageText = kony.i18n.getLocalizedString("i18n.frmOutageMessages.popUp.PauseOutageText");
    }
    else if(action === this.RESUME_ACTION){
      toastMessage= kony.i18n.getLocalizedString("i18n.frmOutageMessageController.i18n.frmoutage.updatedsuccessfully");
      messageHeading =kony.i18n.getLocalizedString("i18n.frmAdManagement.Resume");
      messageText = kony.i18n.getLocalizedString("i18n.frmOutageMessages.popUp.ResumeOutageText");
    }
    
    this.view.lblPopUpMainMessage.text = messageHeading;
    this.view.rtxPopUpDisclaimer.text = messageText;
    this.view.toastMessage.lbltoastMessage.text = toastMessage;
    this.view.flxDeleteOutageMessage.setVisibility(true);
    this.view.forceLayout();
  },
  navigateToAction : function(){
    if(this.currentAction === this.TERMINATE_ACTION || this.currentAction === this.PAUSE_ACTION || this.currentAction === this.RESUME_ACTION)
      this.updateOutageMessage();
    else
      this.deleteOutageMessage();
  },
  showPopupLoadingScreen : function(){
    var self = this;
    kony.adminConsole.utils.LOADING_TIMEOUT_IN_SEC = 20;
    self.view.flxLoading2.setVisibility(true);
    if (self.view.flxLoading2.timeoutHandle) clearTimeout(self.view.flxLoading2.timeoutHandle);
    self.view.flxLoading2.timeoutHandle = setTimeout(function() {
      kony.adminConsole.utils.hideProgressBar(self.view);
    }, kony.adminConsole.utils.LOADING_TIMEOUT_IN_SEC * 1000);
  },
  hidePopupLoadingScreen : function(){
    var self = this;
    if (self.view.flxLoading2.isVisible) {
      self.view.flxLoading2.setVisibility(false);
      if (self.view.flxLoading2.timeoutHandle) clearTimeout(self.view.flxLoading2.timeoutHandle);
    }
  },
  clearDateValidations : function(){
    this.view.flxCalendarStartDate.skin="sknflxffffffoptemplateop3px";
    this.view.flxCalendarEndDate.skin="sknflxffffffoptemplateop3px";
    this.view.timePicker.flxOuterBorder.skin="sknflxBorder";
    this.view.timePicker1.flxOuterBorder.skin="sknflxBorder";
    this.view.flxErrorText.setVisibility(false);
    this.view.flxErrorText2.setVisibility(false);
    this.view.customListboxApps.flxSegmentList.setVisibility(false);
    this.view.timePicker.lstbxAMPM.skin="CopysknlbxBorderc0b0e9d087e19a44";
    this.view.timePicker1.lstbxAMPM.skin="CopysknlbxBorderc0b0e9d087e19a44";
    },
  errorDateValidations : function(){
    this.view.flxErrorText.setVisibility(true);
    this.view.flxCalendarStartDate.skin="sknRedBorder";
    this.view.flxCalendarEndDate.skin="sknRedBorder";
    this.view.timePicker.flxOuterBorder.skin="sknRedBorder";
    this.view.timePicker1.flxOuterBorder.skin="sknRedBorder";
    this.view.timePicker.lstbxAMPM.skin="redListBxSkin";
    this.view.timePicker1.lstbxAMPM.skin="redListBxSkin";
  }
 });


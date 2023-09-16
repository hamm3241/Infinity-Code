define({ 
  mouseYCoordinate : 0,
  allDecisionsFromBackend : [],
  activeDecision: {
    "decisionId" : "",
    "decisionName" : "",
    "decisionDesc" : "",
    "file" :""
  },
  STATUS_CONSTANTS : {
    active: "1",
    archived: "0"
  },
  attachmentFile: [],
  
 //Type your controller code here 
  willUpdateUI : function(context){
    kony.print("in Decision management controller");

    this.updateLeftMenu(context);
    if(!context) {
      return;
    }
    if(context && context.reponse){
      kony.print(success);
      this.resetUI();
    }
    if(context.fetchAllDecisionsStatus){
      this.fetchAllDecisionsResponse(context.fetchAllDecisionsStatus,  context.decisions);
     }
    else if(context.fetchFilesByDecisionStatus){
      this.fetchFilesByDecisionResponse(context.fetchFilesByDecisionStatus, context.files);
    }
    else if (context.loadingScreen) {
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
    else if(context.updateDeleteDecision || context.createDecision){
      this.presenter.fetchDecisions({});

    }else if(context.uploadFileResponse){
      this.fetchFilesByDecision();
    }
  },
  preshow :  function(){
    this.view.flxDecisionManagement.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.setFlowActions();
    this.view.flxToastMessage.setVisibility(false);
  },
  setFlowActions : function(){
    var scopeObj  = this;
    this.view.mainHeader.imgLogout.onTouchStart = function(){
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authModule.presentationController.doLogout();
    };
    this.view.noStaticData.btnAddStaticContent.onClick = function(){
      scopeObj.addNewDecisionPopup();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function(){
      
      if(scopeObj.view.breadcrumbs.isVisible)
        scopeObj.uploadNewFilesPopUp();
      else
      	scopeObj.addNewDecisionPopup();
      
      
    };
    this.view.flxAddNewDecisionClose.onTouchEnd = function(){
      scopeObj.addNewDecisionCancel();
    };
    this.view.btnflxAddNewDecisionCancel.onClick = function(){
      scopeObj.addNewDecisionCancel();
    };
    this.view.btnAddNewDecisionCreate.onClick = function(){
      
      scopeObj.addnewDecisionCreate();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.resetUI();
    };
    this.view.flxUploadNewFilesBodyClose.onTouchEnd = function(){
      scopeObj.uploadNewFilesCancel();
    };
    this.view.btnUploadNewFilesCancel.onClick = function(){
      scopeObj.uploadNewFilesCancel();
    };
    this.view.btnUploadNewFilesUpload.onClick = function(){
      scopeObj.uploadNewFilesCreate();
    };
    this.view.btnBrowse.onclick = function(){
      scopeObj.browseFile();
    };
    this.view.flxSelectOptions.onHover = this.onOptionsHoverCallback;
    this.view.flxVersion.onClick =function(){
      var segData = scopeObj.view.segDecisionFiles.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblVersion");
      scopeObj.view.segDecisionFiles.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxCreatedOn.onClick =function(){
      var segData = scopeObj.view.segDecisionFiles.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblCreatedOn");
      scopeObj.view.segDecisionFiles.setData(sortedData);
      scopeObj.view.forceLayout();
    };
    this.view.flxFileStatus.onClick =function(){
      var segData = scopeObj.view.segDecisionFiles.data;
      var sortedData = scopeObj.sortAndSetData(segData, "lblFileStatus.text");
      scopeObj.view.segDecisionFiles.setData(sortedData);
      scopeObj.view.forceLayout();
    }; 
    this.view.flxOption3.onClick =function(){
       scopeObj.onDownloadAction();
    };
    this.view.dataEntryDecisionName.tbxData.onKeyUp = function() {
      scopeObj.validateName();
      scopeObj.view.forceLayout();
    };
    this.view.txtAddNewDecisionDescription.onBeginEditing = function(){
      scopeObj.view.lblAddNewDecisionDescriptionCount.setVisibility(true);
      scopeObj.view.lblAddNewDecisionDescriptionCount.text = scopeObj.view.txtAddNewDecisionDescription.text.length + "/250";
      scopeObj.view.forceLayout();
    };
    this.view.txtAddNewDecisionDescription.onKeyUp = function(){
      scopeObj.validateDescription();
      scopeObj.view.lblAddNewDecisionDescriptionCount.text = scopeObj.view.txtAddNewDecisionDescription.text.length + "/250";
      scopeObj.view.forceLayout();
    };
    this.view.txtAddNewDecisionDescription.onEndEditing = function(){
      scopeObj.view.lblAddNewDecisionDescriptionCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
   this.view.txtUploadNewFilesComments.onBeginEditing = function(){
     scopeObj.view.flxUploadNewFilesCommentsCount.setVisibility(true);
     scopeObj.view.flxUploadNewFilesCommentsCount.text = scopeObj.view.txtUploadNewFilesComments.text.length + "/250";
	 scopeObj.view.forceLayout();
    };
    this.view.txtUploadNewFilesComments.onKeyUp = function(){
      scopeObj.view.flxUploadNewFilesCommentsCount.text = scopeObj.view.txtUploadNewFilesComments.text.length + "/250";
      scopeObj.view.forceLayout();
    };
    this.view.txtUploadNewFilesComments.onEndEditing = function(){
      scopeObj.view.flxUploadNewFilesCommentsCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.popUpDelete.btnPopUpCancel.onClick = function(){
      scopeObj.view.flxDeleteDecision.setVisibility(false);
    };
    this.view.popUpDelete.btnPopUpDelete.onClick = function(){
      scopeObj.deleteDecision();
    };
    this.view.popUpDelete.flxPopUpClose.onClick = function(){
      scopeObj.view.flxDeleteDecision.setVisibility(false);
    };
    
  }, 
  initActions: function () {
    this.view.segDecisionFiles.onHover=this.saveScreenY.bind(this);
  },
  addNewDecisionPopup : function(){
    var scopeObj=this;
    scopeObj.view.lblInfoIcon.text="\ue94d";
    scopeObj.view.lblInfoIcon.toolTip=kony.i18n.getLocalizedString("i18n.decisionManagement.decisionNameToolTip");	
    scopeObj.view.flxAddNewDecision.setVisibility(true);
    scopeObj.view.lblAddNewDecisionHeader.text= kony.i18n.getLocalizedString("i18n.frmDecisionManagement.createHeader");
    scopeObj.view.dataEntryDecisionName.tbxData.text="";
    scopeObj.view.txtAddNewDecisionDescription.text="";
    scopeObj.view.lblDecisionName.text="";
    scopeObj.view.btnAddNewDecisionCreate.text=kony.i18n.getLocalizedString("i18n.frmPermissionsController.CREATE");
    scopeObj.view.dataEntryDecisionName.tbxData.skin="skntbxLato35475f14px";
    scopeObj.view.dataEntryDecisionName.flxError.setVisibility(false);
    scopeObj.view.txtAddNewDecisionDescription.skin="skntbxLato35475f14px";
    scopeObj.view.flxAddNewDecisionDescriptionError.setVisibility(false);
    scopeObj.view.dataEntryDecisionName.tbxData.setVisibility(true);  
    scopeObj.view.lblDecisionName.setVisibility(false);
  },
  addNewDecisionCancel : function(){
    this.view.flxAddNewDecision.setVisibility(false);
  },
  addnewDecisionCreate : function(){
    var isNameValidated=this.validateName();
    var isDescValidated=this.validateDescription();
    if(isNameValidated === true &&  isDescValidated === true){
    var payload = {};
    this.view.flxAddNewDecision.setVisibility(false);
    payload.decisionName = this.view.dataEntryDecisionName.tbxData.text;
    payload.description = this.view.txtAddNewDecisionDescription.text;
    if(this.view.lblAddNewDecisionHeader.text === kony.i18n.getLocalizedString("i18n.frmDecisionManagement.editDecision")){
    	payload.decisionId = this.activeDecision.decisionId;
    	payload.decisionName = this.view.lblDecisionName.text;
        payload.isActive = 1;
        this.presenter.updateDeleteDecision(payload,"update");
    }
    else{
        payload.decisionName = this.view.dataEntryDecisionName.tbxData.text;
        this.presenter.createDecision(payload);
    }
    }
  },
  uploadNewFilesPopUp : function(){
    this.view.flxUploadNewFileValue.text=kony.i18n.getLocalizedString("i18n.decisionManagement.lblFile1");
    this.attachmentFile=[];
    this.view.txtUploadNewFilesComments.text="";
    this.view.flxUploadNewFiles.setVisibility(true);
  },
  uploadNewFilesCancel : function(){
    this.view.flxUploadNewFiles.setVisibility(false);
  },
  uploadNewFilesCreate : function(){
    var self=this;
    if(self.attachmentFile.length===0){
      self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.decisionManagement.selectFileError"), self);
    }
    else{
  	var payload = {
        "decisionName": self.activeDecision.decisionName,
        "comments" : self.view.txtUploadNewFilesComments.text,
        "fileForUpload" : self.attachmentFile[0]
         };
     
    this.view.flxUploadNewFiles.setVisibility(false);
    this.view.forceLayout();
    this.presenter.uploadFile(payload);
    }
  },
  decisionFolderCompleteView : function(decisionToAdd){
    decisionToAdd.flxDecisionButtons.setVisibility(false);
    decisionToAdd.lblDecisionHeading.top = "40dp";
    decisionToAdd.lblDecisionDescription.height = "90dp";
    decisionToAdd.flxlMyQueueViewAllContaner.setVisibility(false);
    this.view.forceLayout();
  },
  decisionFolderNormalView : function(decisionToAdd){
    decisionToAdd.flxDecisionButtons.setVisibility(true);
    decisionToAdd.lblDecisionHeading.top = "20dp";
    decisionToAdd.lblDecisionDescription.height = "45dp";
    decisionToAdd.flxlMyQueueViewAllContaner.setVisibility(true);    
    this.view.forceLayout();
  },
  decisionFolderHoverOut : function(widget, context) {
   var self = this;
    if(context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      self.decisionFolderCompleteView(widget);
    }else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      self.decisionFolderNormalView(widget);
      widget.onHover = null;
    }
  },
  //this function will get optimised to acomodate multiple folder clicks
  setupFilesUi : function(){ 
    this.view.breadcrumbs.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.decisionManagement.DecisionManagement").toUpperCase();
    this.view.breadcrumbs.lblCurrentScreen.text = this.activeDecision.decisionName.toUpperCase();
    this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.frmDecisionManagement.uploadNewFile");
    this.view.flxDecisionsContainer.setVisibility(false);
    this.view.flxFileListContainer.setVisibility(true); 
    this.view.flxSelectOptions.setVisibility(false);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxFileListContainer.height = (screenHeight - 176) +"px";
    this.view.segDecisionFiles.height = (screenHeight - 176-60) +"px";
  },
  resetUI : function(){
   if(this.allDecisionsFromBackend.length>0){
      this.view.flxDecisionsContainer.setVisibility(true);
      this.view.mainHeader.btnAddNewOption.setVisibility(true);
      this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.frmDecisionManagement.CREATENEW");
    }
    else{
      this.view.flxNoDecisionCreated.setVisibility(true);
      this.view.flxDecisionsContainer.setVisibility(false);
      this.view.mainHeader.btnAddNewOption.setVisibility(false);
      this.view.noStaticData.btnAddStaticContent.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.noStaticData.btnAddStaticContent.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
    }
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxFileListContainer.setVisibility(false);
    this.view.flxUploadNewFiles.setVisibility(false);
	this.view.flxAddNewDecision.setVisibility(false);
    this.view.flxDeleteDecision.setVisibility(false);
    this.view.forceLayout();
  },
  browseFile : function(){
    var scopeObj = this;
   	var config = {
        selectMultipleFiles: false,        
        filter: ["application/vnd.ms-excel , application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
    };
    kony.io.FileSystem.browse(config, selectedFileCallback);
    function selectedFileCallback(event, fileList) {
      var fileName=fileList[0].name;
      var fileType = fileName.substring(fileName.lastIndexOf(".") + 1);
      if (fileType.toUpperCase() === "xls".toUpperCase() || fileType.toUpperCase() === "xlsx".toUpperCase()) {
        scopeObj.view.flxUploadNewFileValue.text=fileName;
        scopeObj.attachmentFile.push(event.target.files[0]);
        scopeObj.view.forceLayout();
      } else {
        scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.decisionManagement.uploadError"), scopeObj);
      }
    }
  },
  fetchAllDecisionsResponse : function(status, decisions){
   var scopeObj = this;
    
    if(status === "success"){
      scopeObj.allDecisionsFromBackend=decisions;
      if (decisions.length > 0) {
        scopeObj.setDecisions(decisions, "decisionName");
       }
      scopeObj.resetUI();
    }
     else {
      scopeObj.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.decisionManagement.toastMessageFetchDecisionFailure"), scopeObj);
    }
    
  },
  setDecisions: function(decisions, sortBy) {
    var scopeObj = this;
    var flxWidth = 336;
    decisions = scopeObj.sortDecisions(decisions, sortBy);
    scopeObj.view.flxDecisionEntries.removeAll();
    if (decisions && decisions.length > 0) {
      var count = 0;
      var screenWidth = kony.os.deviceInfo().screenWidth - 305 - 70;
      var maxNoOfColumns = Math.floor(screenWidth / (flxWidth + 50));
      maxNoOfColumns = (maxNoOfColumns > decisions.length) ? decisions.length : maxNoOfColumns;
      var noOfRows = Math.ceil(decisions.length / maxNoOfColumns);
      var top = 0;
      scopeObj.view.flxDecisionsContainer.setVisibility(true);
      scopeObj.view.flxNoDecisionCreated.setVisibility(false);
      scopeObj.view.flxDecisionContainerScroll.setVisibility(true);
      scopeObj.view.flxMainHeader.mainHeader.btnAddNewOption.setVisibility(true);
      for (var i = 0; i < noOfRows; i++) {
        var noOfColumns = (i == (noOfRows - 1)) ? (decisions.length - count) : maxNoOfColumns;
        var leftOffset = 0;
        for (var j = 0; j < noOfColumns; j++) {
          leftOffset = (j === 0) ? 0 : (leftOffset + flxWidth + 50);
          var decisionToAdd = new com.adminConsole.decisionManagement.DecisionFolder({
            "autogrowMode": kony.flex.AUTOGROW_NONE,
            "id": "decision" + count,
            "isVisible": true,
            "layoutType": kony.flex.FREE_FORM,
            "masterType": constants.MASTER_TYPE_DEFAULT,
            "width": flxWidth + "px",
            "top": top + "px",
            "left": j === 0 ? "0px" : leftOffset + "px"
          }, {}, {});
          decisionToAdd.lblDecisionHeading.text = decisions[count].decisionName;
          decisionToAdd.lblDecisionDescription.text = decisions[count].description;
          decisionToAdd.decisionId = decisions[count].decisionId;
          decisionToAdd.file = decisions[count].fileName;
          decisionToAdd.lblImgEdit.tooltip = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.edit");
          decisionToAdd.lblDelete.tooltip = kony.i18n.getLocalizedString("i18n.ConfigurationBundles.delete");
          scopeObj.view.flxDecisionEntries.add(decisionToAdd);
          scopeObj.setOnDecisionClick(decisionToAdd);
          ++count;
        }
        top = top + 250;
      }
    } else {
      scopeObj.view.flxNoDecisionCreated.setVisibility(true);
      scopeObj.view.flxDecisionContainerScroll.setVisibility(false);
    }
    this.view.forceLayout();
  },
  sortDecisions : function(decisions, sortByColumn) {
    var scopeObj = this;
	scopeObj.sortBy = this.getObjectSorter(sortByColumn);
    return decisions.sort(scopeObj.sortBy.sortData);
  },
   setOnDecisionClick : function(decisionToAdd) {
    var scopeObj = this;
      
    decisionToAdd.flxClick.onClick = function() {
      scopeObj.activeDecision.decisionId = decisionToAdd.decisionId;
      scopeObj.activeDecision.decisionName = decisionToAdd.lblDecisionHeading.text;
      scopeObj.activeDecision.decisionDesc = decisionToAdd.lblDecisionDescription.text;
	  scopeObj.activeDecision.file = decisionToAdd.file;
      scopeObj.fetchFilesByDecision();
    };
     decisionToAdd.flxLblImgEdit.onClick = function() {
      scopeObj.activeDecision.decisionId = decisionToAdd.decisionId;
      scopeObj.activeDecision.decisionName = decisionToAdd.lblDecisionHeading.text;
      scopeObj.activeDecision.decisionDesc = decisionToAdd.lblDecisionDescription.text;
	  scopeObj.activeDecision.file = decisionToAdd.file;
      scopeObj.editDecisionPopup();
      scopeObj.view.forceLayout(); 
    };
     decisionToAdd.flxDelete.onClick = function() {
      scopeObj.activeDecision.decisionId = decisionToAdd.decisionId;
      scopeObj.activeDecision.decisionName = decisionToAdd.lblDecisionHeading.text;
      scopeObj.activeDecision.decisionDesc = decisionToAdd.lblDecisionDescription.text;
	  scopeObj.view.flxDeleteDecision.setVisibility(true);
      scopeObj.view.forceLayout(); 
    };
    decisionToAdd.flxlMyQueueViewAllContaner.onTouchEnd = function(){
      scopeObj.decisionFolderCompleteView(decisionToAdd);
      decisionToAdd.flxDecisionFolder.onHover = scopeObj.decisionFolderHoverOut;
      scopeObj.view.forceLayout();
    };
     
  },
  fetchFilesByDecisionResponse : function(status , files){
     if(files.length===0){
      this.view.flxNorecordsFound.setVisibility(true);
      this.view.flxRecordsFound.setVisibility(false);
    }
    else{
    var fileData=this.mapResultsData(files);
    var sortedData=this.sortAndSetData(fileData, "lblCreatedOn");
    this.view.segDecisionFiles.setData(sortedData); 
    this.view.flxRecordsFound.setVisibility(true);
    this.view.flxNorecordsFound.setVisibility(false);
    }
    this.setupFilesUi();
    this.view.forceLayout();
  },
  editDecisionPopup : function(){
    var scopeObj=this;
    scopeObj.view.lblInfoIcon.toolTip=kony.i18n.getLocalizedString("i18n.decisionManagement.decisionNameToolTip");	
    scopeObj.view.flxAddNewDecision.setVisibility(true);
    scopeObj.view.lblAddNewDecisionHeader.text= kony.i18n.getLocalizedString("i18n.frmDecisionManagement.editDecision");
    scopeObj.view.lblDecisionName.text=scopeObj.activeDecision.decisionName;
    scopeObj.view.txtAddNewDecisionDescription.text=scopeObj.activeDecision.decisionDesc;
    scopeObj.view.btnAddNewDecisionCreate.text=kony.i18n.getLocalizedString("i18n.ConfigurationBundles.buttonUpdate");	
    scopeObj.view.dataEntryDecisionName.flxError.setVisibility(false);
    scopeObj.view.txtAddNewDecisionDescription.skin="skntbxLato35475f14px";
    scopeObj.view.lblDecisionName.skin="sknlblLatoBold35475f14px";
    scopeObj.view.flxAddNewDecisionDescriptionError.setVisibility(false);
    scopeObj.view.dataEntryDecisionName.tbxData.setVisibility(false);  
    scopeObj.view.dataEntryDecisionName.lblDecisionName.setVisibility(true);  
  },
  mapResultsData: function(data) {
        var self = this;
        var widgetMap = {
            "lblFileName": "lblFileName",
            "lblVersion": "lblVersion",
            "lblCreatedOn": "lblCreatedOn",
            "lblCreatedBy": "lblCreatedBy",
            "lblFileStatus": "lblFileStatus",
            "lblComments": "lblComments",
            "lblFontIconOptions": "lblFontIconOptions",
            "lblSeperator": "lblSeperator",
            "flxOptions": "flxOptions",
            "lblIconStatus": "lblIconStatus",
            "flxComments": "flxComments",
            "lblCommentsDetail": "lblCommentsDetail",
            "flxCommentsContainer": "flxCommentsContainer",
            "fontIconComments": "fontIconComments"
        };
        self.view.segDecisionFiles.widgetDataMap = widgetMap;
        this.sortBy = this.getObjectSorter("lblCreatedOn");
        var result = data.map(function(record) {
            return {
                "lblFileName": record.fileName,
                "lblVersion": record.version,
                "lblCreatedOn": record.uploadedDate,
                "lblCreatedBy": record.uploadedBy,
                "lblComments": {
                    "text": "\ue904"
                },
                "lblSeperator": "-",
                "lblFontIconOptions": {
                    "text": "\ue91f"
                },
                "flxOptions": {
                    "onClick": function() {
                        self.toggleVisibility();
                    }
                },
                "lblIconStatus": {
                    "text": "\ue921",
                    "skin": record.status === self.STATUS_CONSTANTS.active ? "sknIcon13pxGreen" : "sknIcon13pxGray"
                },
                "lblFileStatus": {
                   "text": self.getStatusText(record.status),
                    "skin": record.status === self.STATUS_CONSTANTS.active ? "sknlblLato5bc06cBold14px" : "sknlblLatoDeactive"
                },
                "lblCommentsDetail": {
                    "text": record.comment
				},
                "fontIconComments": {
                    "text": "\ue904"
                },
                "flxCommentsContainer": {
                    "onHover": self.onDecisionCommentsHoverCallbackLeave
                },
                "flxComments": {
                    "visible": record.comment!=="",
                    "onClick": self.showSelectedRow
                }
            };
        });
        return result;
    },
   getStatusText : function(status){
     var active = kony.i18n.getLocalizedString("i18n.secureimage.Active");
     var archived = kony.i18n.getLocalizedString("i18n.frmdecisionManagement.archived");
     if(status === this.STATUS_CONSTANTS.active){
       return active;
     }
     else{
       return archived;
     }
   },
   showSelectedRow: function() {
   var index = this.view.segDecisionFiles.selectedIndex;
   var rowIndex = index[1];
   var data = this.view.segDecisionFiles.data;
   if (data[rowIndex].template === "flxDecisionComments") {
      data[rowIndex].template = "flxDecisionFiles";
    } else {
      data[rowIndex].template = "flxDecisionComments";
    }
   this.view.segDecisionFiles.setDataAt(data[rowIndex], rowIndex, 0);
   this.view.forceLayout();
  },
  fixContextualMenu:function(heightVal){
    var menuHeight = this.view.flxSelectOptions.frame.height;
    var segHeight = this.view.segDecisionFiles.frame.height;
    if(((menuHeight+heightVal)>(segHeight+50))&&menuHeight<segHeight){
        this.view.flxSelectOptions.top=((heightVal-this.view.flxSelectOptions.frame.height)-39)+"px";
    }
    else{
        this.view.flxSelectOptions.top=(heightVal)+"px";
    }
    this.view.forceLayout();
  },
  toggleVisibility: function(){
    var hgtValue;
    var clckd_selectedRowIndex = this.view.segDecisionFiles.selectedRowIndex[1];
    kony.print("clckd_selectedRowIndex----" + JSON.stringify(clckd_selectedRowIndex));
    if (this.view.flxSelectOptions.isVisible === false) {

      hgtValue = ((clckd_selectedRowIndex + 1) * 50) + 65 - this.view.segDecisionFiles.contentOffsetMeasured.y;
      kony.print("hgtValue------" + hgtValue);
      this.view.flxSelectOptions.top = this.mouseYCoordinate - 138 + "px";
      this.fixContextualMenu(this.mouseYCoordinate - 138);
      this.view.flxSelectOptions.isVisible = true;
    }
    else
      this.view.flxSelectOptions.isVisible = false;
  },
  saveScreenY: function (widget, context) {
    this.mouseYCoordinate = context.screenY;
  },
  onOptionsHoverCallback:function(widget,context){
      var self=this;
      var widgetId = widget.id;
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        self.view[widgetId].setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        self.view[widgetId].setVisibility(false);
      }
      self.view.forceLayout();
    },
  onDecisionCommentsHoverCallbackLeave: function(widget, context) {
    var self = this;
    var id=context.rowIndex;
    if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      var data = self.view.segDecisionFiles.data;
      data[id].template = "flxDecisionFiles";

      self.view.segDecisionFiles.setDataAt(data[id], id, 0);
    }
  },
  sortAndSetData : function(segData, sortColumn) {
    var self = this;
    self.sortBy.column(sortColumn);
    self.resetSortImages();
    return segData.sort(self.sortBy.sortData);
  },
  resetSortImages : function() {
    var self = this;
    self.sortIconFor('lblVersion', 'lblSortVersion');
    self.sortIconFor('lblCreatedOn', 'lblCreatedOnSort');
    self.sortIconFor('lblFileStatus.text', 'lblFileStatusSort');
  },
  sortIconFor: function(column,iconPath){
    var self =this;
    self.determineSortFontIcon(this.sortBy,column,self.view[iconPath]);
  },
  onDownloadAction: function() {
    var scopeObj = this;
    var payload={
        "decisionName" : scopeObj.activeDecision.decisionName,
  	    "version" : scopeObj.view.segDecisionFiles.selectedItems[0].lblVersion
    };
    
    scopeObj.presenter.downloadFile(payload);
  },
  fetchFilesByDecision: function(){
    var scopeObj = this;
    var decisionIdJSON = {
        "decisionId" :  scopeObj.activeDecision.decisionId,
        "decisionName" : scopeObj.activeDecision.decisionName
      };
      
      scopeObj.presenter.fetchFilesByDecision(decisionIdJSON);
  },
 validateName:function(){
    var decisionName=this.view.dataEntryDecisionName.tbxData.text;
    decisionName=(decisionName === "") ? this.view.lblDecisionName.text : decisionName;
    var flag=true;
    if(decisionName === ""){
      this.view.dataEntryDecisionName.tbxData.skin="skinredbg";
      this.view.dataEntryDecisionName.flxError.setVisibility(true);
      flag = false;
    }
    else{
      this.view.dataEntryDecisionName.tbxData.skin="skntbxLato35475f14px";
      this.view.dataEntryDecisionName.flxError.setVisibility(false);
    }
    return flag;
  },
  validateDescription:function(){
    var desc=this.view.txtAddNewDecisionDescription.text;
    var flag=true;
    if(desc === ""){
      this.view.txtAddNewDecisionDescription.skin="skinredbg";
      this.view.flxAddNewDecisionDescriptionError.setVisibility(true);
      flag = false;
    }
    else{
      this.view.txtAddNewDecisionDescription.skin="skntbxLato35475f14px";
      this.view.flxAddNewDecisionDescriptionError.setVisibility(false);
    }
    return flag;
  },
  deleteDecision : function(){
    var payload = {};
    this.view.flxDeleteDecision.setVisibility(false);
    payload.decisionName = this.activeDecision.decisionName;
    payload.description = this.activeDecision.decisionDesc;
    payload.decisionId = this.activeDecision.decisionId;
    payload.isSoftDeleted=1;
    this.presenter.updateDeleteDecision(payload,"delete");
   
  }
  
   
});
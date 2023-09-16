define({
  rowIndex: 0,
  currentPage: 1,
  lastAppend:0,
  previousPage: 0,
  totalRecordPerPage: 40,
  attchmentFiles: [],
  draftAttchmentFiles:[],
  selectedUsers: "",
  flxArray: [],
  discardAttchments:[],
  totalPage: 1,
  currentStatus: "SID_OPEN",

  downloadFileId: "",
  user_ID: "",
  selectedRequestId: "",
  assignTo: "",
  assignedToID: "",
  assignedToSearchID: "",
  requestmessage_id: "",
  oldMessageText: "",
  repliedID: "",
  emailCount: 0,
  emailRowCount: 0,
  NoOfEmail: 0,
  dashBoardReq: false,
  CustomerSuggestionsPriority: 0,
  sortColoumn: "",
  sortOrder: "",
  searchParam: {},
  attachmentDraft:false,
  showingDraft:false,
  isSorting : false,
  isNext:true,
  prevIndex: -1,
  selectedRequestIds: [],
  multiAssign:true,
  totalMessages: 0,
  segmentWidth:1114,
  isKeyCloakEnabled:null,
  //Type your controller code here 

  /**
   * Function preshow of actions
   **/
  preShowActions: function () {
    this.byfalutHide();
    // this.view.lblCharCount1.setVisibility(false);
    //kony.adminConsole.utils.showProgressBar(this.view);
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    this.view.Message.flxAttatchments.isVisible = false;
    this.currentStatus = "SID_OPEN";
    this.currentPage = 1;
    this.lastAppend=0;
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMain.height= screenHeight + "px";
    this.view.flxTemplatesAddSpace.height = screenHeight - 350 + "px";
    this.view.flxScrollMainContent.height = screenHeight - 130 + "px";
    this.view.MessageFilter.FlexResult.height = screenHeight - 130 + "px";
    this.view.MessageFilter.flxSegSearchResult.height=screenHeight - 240 + "px";
    this.view.MessageFilter.flxScrollMessages.height=screenHeight - 190 + "px";
    this.view.myQueueMessageFilter.FlexResult.height = screenHeight - 130 + "px";
    this.view.myQueueMessageFilter.flxSegSearchResult.height=screenHeight - 240 + "px";
    this.view.myQueueMessageFilter.flxScrollMessages.height=screenHeight - 190 + "px";
    this.view.flxLocationsSegment.height = screenHeight - 208 + "px";
    this.view.flxCreateTempplate.height =screenHeight - 300 + 120 + "px";
    this.view.MessageFilter.lblSelectedRows.text = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.myQueueMessageFilter.flxRepliedOnDropdown.isVisible = false;
    this.view.flxNewMessage.setVisibility(false);
    this.view.flxTemplates.isVisible = false;
    this.view.editMessages.btnAssign.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Reassign");

    this.view.noTemplateData.btnAddStaticContent.width="120dp";
    //this.view.mainHeader.btnDropdownList.skin="sknBtn4A77A0LatoRegular13pxFFFFFFRad20px";
   //this.view.mainHeader.btnDropdownList.hoverSkin="sknBtn2D5982LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnDropdownList.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnDropdownList.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnAddNewOption.skin="sknBtn1F844DLatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnAddNewOption.hoverSkin="sknBtn056F35LatoRegular13pxFFFFFFRad20px";
    this.view.mainHeader.btnAddNewOption.focusSkin="sknBtn056F35LatoRegular13pxFFFFFFRad20px"
    
   

    this.view.myQueueMessageFilter.flxColumn3.isVisible=false;
    this.view.myQueueMessageFilter.flxColumn4.isVisible=false;
    this.view.commonButtons.btnNext.isVisible=false;
    this.view.mainHeader.frmCSR_setBtnDropDownText(kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_MESSAGE"));
    this.view.noTemplateData.lblNoStaticContentCreated.text = kony.i18n.getLocalizedString("i18n.frmCSRController.message_template_Success");
    this.view.noTemplateData.lblNoStaticContentMsg.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Click_On_Add_Template");
    this.view.noTemplateData.btnAddStaticContent.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ADD_TEMPLATE");
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.MessageFilter.FlexContextMenu.setVisibility(false);
    this.view.myQueueMessageFilter.FlexContextMenu.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    //  this.view.popUp.imgPopUpClose.setVisibility(false);
    this.view.flxAssignPopup.isVisible=false;
    // this.view.detailHeader.flxSelected5.isVisible=false; 
    this.view.MessageFilter.lblIconSubject.isVisible = false;
    this.view.myQueueMessageFilter.lblIconSubject.isVisible = false;
    this.view.Message.flxErrorMessage.zIndex = 100;
    /////////////////
    this.view.listingSegmentClient.rtxNoResultsFound.isVisible = false;
    this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    this.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Delete_message_template");
    this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCSRController.delete_message_Question");
    this.view.lblNoAssignToError.isVisible = false;
    this.view.flxToastMessage.setVisibility(false);
    this.setTemplateDummyData();
    this.hideContextualMenuOptions();
    this.resetDataFields();
    // Fetch Categories
    // this.presenter.fetchAllCategories();
    this.view.lblCharCount.setVisibility(false);
    this.view.lblCharCount2.setVisibility(false);
    this.segmentWidth=1114;//Segement width initialization is necessary for the horizontal scroll
    this.hideCustomerIdColumn();
    this.view.forceLayout();
  },
  byfalutHide: function () {
    //this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxNewMessagePage.setVisibility(true);
    this.view.flxMyQueuePage.setVisibility(false);
    this.view.flxMessageDetailsPage.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxMainHeader.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
  },
  renderCalendar: function () {
    this.view.flxScrollMainContent.isVisible = false;
  },
  postShow: function () {
  },
  fetchRequestFirstTime: function () {
    var params = {
      "csrRepID": this.user_ID,
      "requestStatusID": "[SID_OPEN]",
      "recordsPerPage": this.totalRecordPerPage,
      "currPageIndex": "1",
      "sortCriteria": "",
      "sortOrder": "desc"
    };
    this.presenter.fetchRequests(params);
  },
  hideContextualMenuOptions: function () {
    this.view.listingSegmentClient.contextualMenu.lblHeader.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.btnLink1.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.btnLink2.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.flxOptionsSeperator.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.flxOption2.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.flxOption4.setVisibility(false);
    this.view.MessageFilter.contextualMenu.lblIconOption1.text="\ue91e";

    this.view.listingSegmentClient.contextualMenu.lblOption1.text=kony.i18n.getLocalizedString("i18n.roles.Edit");
    this.view.listingSegmentClient.contextualMenu.lblIconOption3.text="\ue91b";
    this.view.MessageFilter.contextualMenu.lblIconOption3.text="\ue91b";
    this.view.listingSegmentClient.contextualMenu.lblOption3.text=kony.i18n.getLocalizedString("i18n.SecurityQuestions.Delete");

    this.view.MessageFilter.contextualMenu.lblHeader.isVisible=false;
    this.view.MessageFilter.contextualMenu.btnLink1.isVisible=false;
    this.view.MessageFilter.contextualMenu.btnLink2.isVisible=false;
    this.view.MessageFilter.contextualMenu.flxOptionsSeperator.isVisible=false;
    this.view.MessageFilter.contextualMenu.flxOption1.isVisible=false;
    this.view.MessageFilter.contextualMenu.flxOption4.isVisible=false;
    this.view.MessageFilter.contextualMenu.lblOption2.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Reply");
    this.view.MessageFilter.contextualMenu.lblOption3.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Reassign");
    //this.view.MessageFilter.contextualMenu.imgOption2.src="reply_2x.png";
    this.view.MessageFilter.contextualMenu.lblIconOption2.text = "\ue939";
    this.view.MessageFilter.contextualMenu.lblIconOption2.skin = "sknIcon20px";
    //this.view.MessageFilter.contextualMenu.imgOption3.src="assign2x.png";
    this.view.MessageFilter.contextualMenu.lblIconOption3.text = "\ue93e";
    this.view.MessageFilter.contextualMenu.lblIconOption3.skin = "sknIcon20px";
    //       this.view.MessageFilter.contextualMenu.lblOption4.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_RESOLVED");
    this.view.myQueueMessageFilter.contextualMenu.lblHeader.isVisible=false;
    this.view.myQueueMessageFilter.contextualMenu.btnLink1.isVisible=false;
    this.view.myQueueMessageFilter.contextualMenu.btnLink2.isVisible=false;
    this.view.myQueueMessageFilter.contextualMenu.flxOptionsSeperator.isVisible=false;
    this.view.myQueueMessageFilter.contextualMenu.flxOption1.isVisible=false;
    this.view.myQueueMessageFilter.contextualMenu.lblOption2.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Reply");
    this.view.myQueueMessageFilter.contextualMenu.lblOption3.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Reassign");
    this.view.myQueueMessageFilter.contextualMenu.lblIconOption2.text = "\ue939";
    this.view.myQueueMessageFilter.contextualMenu.lblIconOption2.skin = "sknIcon20px";
    this.view.myQueueMessageFilter.contextualMenu.lblIconOption3.text = "\ue93e";
    this.view.myQueueMessageFilter.contextualMenu.lblIconOption3.skin = "sknIcon20px";
    // this.view.myQueueMessageFilter.contextualMenu.lblOption4.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_RESOLVED");
    this.view.myQueueMessageFilter.contextualMenu.flxOption4.isVisible = false;
  },
  showContent: function () {

    this.view.flxLocationsWrapper.setVisibility(true);
    this.view.flxNewMessagePage.setVisibility(true);
    this.view.flxCloseCal1.isVisible = false;
    this.view.flxMyQueuePage.setVisibility(false);
    this.view.flxMessageDetailsPage.setVisibility(false);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.New_Messages");
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
    this.view.mainHeader.frmCSR_setBtnDropDownText(kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_MESSAGE"));
  },
  showListingPage: function () {
    this.view.flxScrollMainContent.setVisibility(false);
    this.view.flxTemplates.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Templates");
    this.view.flxMainHeader.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.flxAddTemplates.setVisibility(false);
    this.view.flxTemplateView.setVisibility(true);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TEMPLATES");
    this.view.flxTemplatesDetails.setVisibility(false);
    this.view.mainHeader.frmCSR_setBtnDropDownText(kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_TEMPLATE"));
  },
  showAddTemplatePage: function (context) {
    if (context === kony.i18n.getLocalizedString("i18n.frmPoliciesController.edit")) {
      this.view.txtfldAddressLine1.text = this.rowClickData.tempName;
      this.view.breadcrumbs.lblCurrentScreen.text = this.rowClickData.tempName.toUpperCase();
      var templateDocument = document.getElementById("iframe_rtxTemplate").contentWindow.document;
      templateDocument.querySelectorAll("a[data-command='insertimage']")[0].style.display = "none";
      templateDocument.getElementById("editor").innerHTML = this.rowClickData.tempBody;
      templateDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
      document.getElementById("iframe_rtxTemplate").contentWindow.charCounterAfterActivity("initial_count");
      this.view.txtAreaData.text = this.rowClickData.tempNote;
      this.context = context;
    } else {
      this.view.lblCharCount.isVisible = false;
      this.view.lblCharCount.text = "0/80";
      var templateDocumentAdd = document.getElementById("iframe_rtxTemplate").contentWindow.document;
      document.getElementById("iframe_rtxTemplate").contentWindow.charCounterAfterActivity("initial_count");
      templateDocumentAdd.querySelectorAll("a[data-command='insertimage']")[0].style.display = "none";
      this.view.lblCharCount2.isVisible = false;
      this.view.lblCharCount2.text = "0/500";
      this.resetDataFields();
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.NEW_TEMPLATE");
    }
    this.view.flxMainHeader.setVisibility(true);
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Create_new");
    this.view.mainHeader.flxButtons.setVisibility(false);
    this.view.flxNoTemplate.setVisibility(false);
    this.view.flxTemplateView.setVisibility(false);
    this.view.flxTemplatesDetails.setVisibility(false);
    this.view.flxAddTemplates.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.leftmenu.MESSAGES");
    this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TEMPLATES");
    this.view.flxTemplatesAddSpace.setContentOffset({
      y:0,
      x:0
    });
    this.view.forceLayout();
  },
  sortIconFor: function (column) {
    return this.determineSortIcon(this.sortBy, column);
  },
  showEmailMessagesScreen: function (messages,status, requestId, subject, isPriorityMessage) {
    //var status= this.view.mainHeader.lblHeading.text.replace(kony.i18n.getLocalizedString("i18n.frmCSRController.Messages"),"");
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxNewMessagePage.setVisibility(false);
    this.view.flxMyQueuePage.setVisibility(false);
    this.view.flxMessageDetailsPage.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
    this.view.editMessages.flxNomesg.setVisibility(false);
    this.view.editMessages.flxDraft.setVisibility(true);
    this.view.breadcrumbs.btnBackToMain.text=(status==="SID_OPEN")?kony.i18n.getLocalizedString("i18n.frmCSRController.NEW"):(status==="SID_INPROGRESS")?kony.i18n.getLocalizedString("i18n.frmCSRController.IN_PROGRESS"):(status==="SID_RESOLVED")?kony.i18n.getLocalizedString("i18n.frmCSRController.RESOLVED"):kony.i18n.getLocalizedString("i18n.frmCSRController.ARCHIVED");
    // this.view.editMessages.imgPermissionStatus.src=(status==="SID_OPEN")?"newmessages_2x.png":(status==="SID_INPROGRESS")?"inprogress_2x.png":(status==="SID_RESOLVED")?"resolved_2x.png":"archived_2x.png";
    this.view.editMessages.lblIconPermissionStatus.skin=(status==="SID_OPEN")?"sknIcon13pxBlue":(status==="SID_INPROGRESS")?"sknIconOrange":(status==="SID_RESOLVED")?"sknIcon13pxGreen":"sknIcon13pxGray";
    this.view.editMessages.btnStatus.text=(status==="SID_OPEN")?kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_IN_PROGRESS"):(status==="SID_INPROGRESS")?kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_RESOLVED"):(status==="SID_RESOLVED")?kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_IN_PROGRESS"):"";
    this.view.editMessages.imgMsgIconPriority.isVisible = isPriorityMessage;
    this.view.editMessages.imgMsgIconPriority.setVisibility(isPriorityMessage);
    this.view.editMessages.lblHighPriority.isVisible = isPriorityMessage;
    this.view.editMessages.lblHighPriority.setVisibility(isPriorityMessage);
    this.view.editMessages.lblHighPriority.text = "High Priority";
    this.view.breadcrumbs.lblCurrentScreen.text = requestId;
    this.view.editMessages.lblHeading.text = subject;
    this.view.forceLayout();
  },
  showNoEmailMessagesScreen: function (status, requestId, subject) {
    //var status= this.view.mainHeader.lblHeading.text.replace(kony.i18n.getLocalizedString("i18n.frmCSRController.Messages"),"");
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.mainHeader.flxButtons.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxNewMessagePage.setVisibility(false);
    this.view.flxMyQueuePage.setVisibility(false);
    this.view.flxMessageDetailsPage.setVisibility(true);
    this.view.editMessages.flxNomesg.setVisibility(true);
    this.view.editMessages.flxDraft.setVisibility(false);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);

    this.view.breadcrumbs.btnBackToMain.text = (status === "SID_OPEN") ? kony.i18n.getLocalizedString("i18n.frmCSRController.NEW") : (status === "SID_INPROGRESS") ? kony.i18n.getLocalizedString("i18n.frmCSRController.IN_PROGRESS") : (status === "SID_RESOLVED") ? kony.i18n.getLocalizedString("i18n.frmCSRController.RESOLVED") : kony.i18n.getLocalizedString("i18n.frmCSRController.ARCHIVED");
    // this.view.editMessages.imgPermissionStatus.src=(status==="SID_OPEN")?"newmessages_2x.png":(status==="SID_INPROGRESS")?"inprogress_2x.png":(status==="SID_RESOLVED")?"resolved_2x.png":"archived_2x.png";
    this.view.editMessages.lblIconPermissionStatus.skin = (status === "SID_OPEN") ? "sknIcon13pxBlue" : (status === "SID_INPROGRESS") ? "sknIconOrange" : (status === "SID_RESOLVED") ? "sknIcon13pxGreen" : "sknIcon13pxGray";
    this.view.editMessages.btnStatus.text = (status === "SID_OPEN") ? kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_IN_PROGRESS") : (status === "SID_INPROGRESS") ? kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_RESOLVED") : (status === "SID_RESOLVED") ? kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_IN_PROGRESS") : "";
    this.view.breadcrumbs.lblCurrentScreen.text = requestId;
    this.view.editMessages.lblHeading.text = subject;
    this.view.forceLayout();
  },
  showAssignedToScreen: function () {
    //var status= this.view.mainHeader.lblHeading.text.replace(kony.i18n.getLocalizedString("i18n.frmCSRController.Messages"),"");
    this.view.flxAssignDropdown.isVisible = true;
  },
  showNewEmailMessage: function () {
    this.view.flxNewMessage.setVisibility(true);
    this.view.Message.flxErrorMessage.isVisible=false;
    this.view.flxNewMessage.height="90%";
    this.view.flxNewMessage.width="44.56%";
    this.view.Message.flxMinimize.setVisibility(true);
    this.view.Message.flxMaximize.setVisibility(false);
    //Reseting atachmentfiles intially
    this.attchmentFiles.splice(0, this.attchmentFiles.length);
    this.view.Message.imgCheckBoxMsg.src = "checkboxnormal.png";
    this.view.Message.imgMsgIconPriority.isVisible = false;
    this.view.Message.lblHighPriority.isVisible = false;

  },
  backToListingpage: function () {
    this.view.flxBreadCrumbs.setVisibility(false);

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.New_Messages")) {
      kony.adminConsole.utils.showProgressBar(this.view);

      if(this.searchParam.currPageIndex===undefined){
        this.resetDataFields();
        var params1 = {
          "csrRepID": this.user_ID,
          "requestStatusID": "[SID_OPEN]",
          "recordsPerPage": this.totalRecordPerPage,
          "sortCriteria": "",
          "sortOrder": "desc",
          "currPageIndex": "1"
        };
        this.presenter.fetchRequests(params1);
      }else{
        this.presenter.fetchRequests(this.searchParam);
      }
    }

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.In_Progress_Messages")) {
      kony.adminConsole.utils.showProgressBar(this.view);
      if(this.searchParam.currPageIndex===undefined){
        this.resetDataFields();
        var params2 = {
          "csrRepID": this.user_ID,
          "requestStatusID": "[SID_INPROGRESS]",
          "recordsPerPage": this.totalRecordPerPage,
          "sortCriteria": "",
          "sortOrder": "desc",
          "currPageIndex": "1"
        };
        this.presenter.fetchRequests(params2);
      }else{
        this.presenter.fetchRequests(this.searchParam);
      }
    }

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.Resolved_Messages")) {
      kony.adminConsole.utils.showProgressBar(this.view);
      if(this.searchParam.currPageIndex===undefined){
        this.resetDataFields();
        var params3 = {
          "csrRepID": this.user_ID,
          "requestStatusID": "[SID_RESOLVED]",
          "recordsPerPage": this.totalRecordPerPage,
          "sortCriteria": "",
          "sortOrder": "desc",
          "currPageIndex": "1"
        };
        this.presenter.fetchRequests(params3);
      }else{
        this.presenter.fetchRequests(this.searchParam);
      }
    }

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.Archived_Messages")) {
      kony.adminConsole.utils.showProgressBar(this.view);
      if(this.searchParam.currPageIndex===undefined){
        this.resetDataFields();
        var params4 = {
          "csrRepID": this.user_ID,
          "requestStatusID": "[SID_ARCHIVED]",
          "recordsPerPage": this.totalRecordPerPage,
          "sortCriteria": "",
          "sortOrder": "desc",
          "currPageIndex": "1"
        };
        this.presenter.fetchRequests(params4);
      }else{
        this.presenter.fetchRequests(this.searchParam);
      }
    }

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) {
      kony.adminConsole.utils.showProgressBar(this.view);
      if(this.searchParam.currPageIndex===undefined){
        this.resetDataFields();
        var params5 = {
          "csrRepID": this.user_ID,
          "requestStatusID": "[SID_OPEN,SID_INPROGRESS]",
          "requestAssignedTo": this.user_ID,
          "recordsPerPage": this.totalRecordPerPage,
          "currPageIndex": "1",
          "sortCriteria": "",
          "sortOrder": "desc"
        };
        this.presenter.fetchMyQueueRequests(params5);
      }else{
        this.presenter.fetchMyQueueRequests(this.searchParam);
      }
    }
    //If conditions for further tabs
  },
  resetSortImages: function () {
    var self = this;
    self.determineSortFontIcon(self.sortBy, 'Name', this.view.fontIconUsersHeaderName);
    self.determineSortFontIcon(self.sortBy, 'creadtedts',this.view.fontIconUsername);
    self.determineSortFontIcon(self.sortBy, 'lastmodifiedts',this.view.fontIconLastUpdated);

  },
  filledData: function() {
    this.view.Message.lblSaving.text = "";
    this.requestmessage_id = "";
    this.oldMessageText = "";
    var lblHeading = this.view.editMessages.lblHeading.text;
    var isPriorityMessage = this.view.editMessages.imgMsgIconPriority.isVisible;
    if(isPriorityMessage){
      this.view.Message.imgCheckBoxMsg.src="checkboxselected.png";
      this.view.Message.imgMsgIconPriority.isVisible = true;
      this.view.Message.lblHighPriority.isVisible = true;
    }else{
      this.view.Message.imgCheckBoxMsg.src="checkboxnormal.png";
      this.view.Message.imgMsgIconPriority.isVisible = false;
      this.view.Message.lblHighPriority.isVisible = false;
    }
    this.view.Message.lblMsg.text=this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.lblMsg.text=this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.Message.txtTo.text=this.view.editMessages.segMesgs.data[0].lblCustomerFullName; 
    this.selectedUsers=this.view.editMessages.segMesgs.data[0].lblCustomerUsername; 
    this.view.Message.txtTo.setEnabled(false);
    this.view.Message.txtSubject.text = lblHeading.indexOf(kony.i18n.getLocalizedString("i18n.frmCSRController.Re")) >= 0 ? lblHeading : "Re : " + lblHeading;
    var selectedRow;
    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) {
      var selIndQueue =this.view.myQueueMessageFilter.SegSearchResult.selectedRowIndex[1];
      selectedRow = this.view.myQueueMessageFilter.SegSearchResult.data[selIndQueue];
    }
    else{
      var selInd = this.view.MessageFilter.SegSearchResult.selectedRowIndex[1];
      selectedRow = this.view.MessageFilter.SegSearchResult.data[selInd]; 
    }
    this.view.Message.lstbocCategory.selectedKey = selectedRow.lblCategoryId;

  },
  filledNewRequestData: function (requestData) {
    this.oldMessageText = "";
    this.view.Message.lblSaving.text = "";
    this.view.Message.lstbocCategory.selectedKey = requestData.lblCategoryId;
    this.selectedRequestId = requestData.lblRequestID.text; //
    this.view.Message.lblMsg.text = requestData.lblRequestID.text;
    this.view.lblMsg.text = requestData.lblRequestID.text;
    this.view.Message.txtTo.text = requestData.lblCustomerName.text;
    this.selectedUsers = requestData.lblCustomerUserName;
    this.view.Message.txtTo.setEnabled(false);
    this.view.Message.txtSubject.text = requestData.lblSubject.text.indexOf(kony.i18n.getLocalizedString("i18n.frmCSRController.Re")) >= 0 ? requestData.lblSubject.text : "Re : " + requestData.lblSubject.text;
    if(requestData.imgMsgIcon.isVisible){
      this.view.Message.imgCheckBoxMsg.src="checkboxselected.png";
      this.view.Message.imgMsgIconPriority.isVisible = true;
      this.view.Message.lblHighPriority.isVisible = true;
    }else{
      this.view.Message.imgCheckBoxMsg.src="checkboxnormal.png";
      this.view.Message.imgMsgIconPriority.isVisible = false;
      this.view.Message.lblHighPriority.isVisible = false;
    }
  },
  fillDraftedData: function (selectedRow) {

    this.view.Message.lblSaving.text = "";
    this.draftAttchmentFiles=[];
    this.discardAttchments=[];
    var selectedDataRow = this.view.editMessages.segMesgs.data[selectedRow];   
    var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
    messageDocument.getElementById("editor").innerHTML = selectedDataRow.rtxDescriptionHide;
    messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
    var lblHeading = this.view.editMessages.lblHeading.text;
    this.requestmessage_id = selectedDataRow.requestmessage_id;
    this.view.Message.lblMsg.text=this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.lblMsg.text=this.view.breadcrumbs.lblCurrentScreen.text;
    this.view.Message.txtTo.text=this.view.editMessages.segMesgs.data[0].lblCustomerFullName;
    this.selectedUsers=this.view.editMessages.segMesgs.data[0].lblCustomerUsername;
    this.view.Message.txtTo.setEnabled(false);
    this.view.Message.txtSubject.text = lblHeading.indexOf(kony.i18n.getLocalizedString("i18n.frmCSRController.Re")) >= 0 ? lblHeading : "Re : " + lblHeading;
    // Fill attachment data
    if (selectedDataRow.lblAttatchmentName.text !== kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment")) {
      this.view.Message.flxAttatchment1.isVisible = true;
      this.view.Message.lblAttatchmnet1.text = selectedDataRow.lblAttatchmentName.toolTip;
      this.view.Message.flxAttatchments.isVisible = true;
      this.view.Message.flxAttatchments.bottom = "80px";
      this.attchmentFiles[0]={"file": new File([""], selectedDataRow.lblAttatchmentName.toolTip, {type: "ae"}), "mediaId": selectedDataRow.attatchmentMediaId5};
      this.draftAttchmentFiles[0]={"fileName":selectedDataRow.lblAttatchmentName.toolTip,"mediaId":selectedDataRow.attatchmentMediaId1};
      //var rtxMessageHeight = this.view.Message.rtxMessage.height;
      this.view.Message.rtxMessage.height = "90%"; 
      this.view.forceLayout();
    }
    if (selectedDataRow.lblAttatchmentName2.text !== kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment")) {
      this.view.Message.flxAttatchment2.isVisible = true;
      this.view.Message.lblAttatchmnet2.text = selectedDataRow.lblAttatchmentName2.toolTip;
      this.attchmentFiles[1]={"file": new File([""], selectedDataRow.lblAttatchmentName2.toolTip, {type: "ae"}), "mediaId": selectedDataRow.attatchmentMediaId5};
      this.draftAttchmentFiles[1]={"fileName":selectedDataRow.lblAttatchmentName2.toolTip,"mediaId":selectedDataRow.attatchmentMediaId2};
    }
    if (selectedDataRow.lblAttatchmentName3.text !== kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment")) {
      this.view.Message.flxAttatchment3.isVisible = true;
      this.view.Message.lblAttatchmnet3.text = selectedDataRow.lblAttatchmentName3.toolTip;
      this.attchmentFiles[2]={"file": new File([""], selectedDataRow.lblAttatchmentName3.toolTip, {type: "ae"}), "mediaId": selectedDataRow.attatchmentMediaId5};
      this.draftAttchmentFiles[2]={"fileName":selectedDataRow.lblAttatchmentName3.toolTip,"mediaId":selectedDataRow.attatchmentMediaId3};
    }
    if (selectedDataRow.lblAttatchmentName4.text !== kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment")) {
      this.view.Message.flxAttatchment4.isVisible = true;
      this.view.Message.lblAttatchmnet4.text = selectedDataRow.lblAttatchmentName4.toolTip;
      this.attchmentFiles[3]={"file": new File([""], selectedDataRow.lblAttatchmentName4.toolTip, {type: "ae"}), "mediaId": selectedDataRow.attatchmentMediaId5};
      this.draftAttchmentFiles[3]={"fileName":selectedDataRow.lblAttatchmentName4.toolTip,"mediaId":selectedDataRow.attatchmentMediaId4};
    }
    if (selectedDataRow.lblAttatchmentName5.text !== kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment")) {
      this.view.Message.flxAttatchment5.isVisible = true;
      this.view.Message.lblAttatchmnet5.text = selectedDataRow.lblAttatchmentName5.toolTip;
      this.attchmentFiles[4]={"file": new File([""], selectedDataRow.lblAttatchmentName5.toolTip,{type: "ae"}), "mediaId": selectedDataRow.attatchmentMediaId5};
      this.draftAttchmentFiles[4]={"fileName":selectedDataRow.lblAttatchmentName5.toolTip,"mediaId":selectedDataRow.attatchmentMediaId5};
    }
  },

  EmptyData: function () {
    this.view.Message.lblMsg.text = kony.i18n.getLocalizedString("i18n.frmCSRController.New_Message");
    this.view.lblMsg.text = kony.i18n.getLocalizedString("i18n.frmCSRController.New_Message");
    this.view.Message.txtTo.text = "";
    this.view.Message.txtTo.setEnabled(true);
    this.view.Message.txtSubject.text = "";
    this.view.Message.flxErrorMessage.isVisible = false;
    this.view.Message.flxTo.height = "40px";   
    var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
    messageDocument.getElementById("editor").innerHTML = "";
    messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
    this.attchmentFiles.splice(0, this.attchmentFiles.length);
    this.draftAttchmentFiles=[];
    this.discardAttchments=[];
  },
  draftMesg: function () {
    this.showNewEmailMessage();
    this.filledData();
  },
  showDraftMesg: function () {
    var selectedRow = this.view.editMessages.segMesgs.selectedIndex[1];
    this.view.Message.flxFilter.isVisible = false;
    this.showNewEmailMessage();
    this.checkUploadedFiles();
    this.fillDraftedData(selectedRow);
    this.sendDraftMessage();
    this.showingDraft = true;
    this.view.forceLayout();
  },
  setFlowActions: function () {
    var scopeObj = this;
    this.preShowActions();
    this.view.fontIconUsersHeaderName.onTouchStart = function(){
      scopeObj.sortBy.column("Name");
      scopeObj.loadPageData();
      scopeObj.resetSortImages();
    };
    this.view.lblUsersHeaderName.onTouchStart = function(){
      scopeObj.view.fontIconUsersHeaderName.onTouchStart();
    };
    this.view.flxCreated.onClick = function(){
      scopeObj.sortBy.column("creadtedts");
      scopeObj.loadPageData();
      scopeObj.resetSortImages();
    };
    this.view.flxLastUpdate.onClick = function(){
      scopeObj.sortBy.column("lastmodifiedts");
      scopeObj.loadPageData();
      scopeObj.resetSortImages();
    };
    this.view.flxCloseCal1.onClick = function () {
      scopeObj.view.datePicker.resetData = "Select Date";
      scopeObj.view.datePicker.rangeType = "";
      scopeObj.view.datePicker.value = "";
      scopeObj.view.flxCloseCal1.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.flxCloseCal2.onClick = function () {
      scopeObj.view.datePicker1.resetData = "Select Date";
      scopeObj.view.datePicker1.rangeType = "";
      scopeObj.view.datePicker1.value = "";
      scopeObj.view.flxCloseCal2.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.datePicker.event = function () {
      scopeObj.view.flxCloseCal1.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.datePicker1.event = function () {
      scopeObj.view.flxCloseCal2.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.subHeader.lbxPageNumbers.onSelection = function () {
      scopeObj.loadPageData();
    };
    this.view.listingSegmentClient.pagination.lbxPagination.onSelection = function () {
      scopeObj.gotoPage();
    };
    this.view.txtfldAddressLine1.onBeginEditing = function () {
      if (scopeObj.view.lblCharCount.text.trim().length === 0) {
        scopeObj.view.lblCharCount.setVisibility(false);
      } else {
        scopeObj.view.lblCharCount.setVisibility(true);
        scopeObj.view.lblCharCount.text = scopeObj.view.txtfldAddressLine1.text.trim().length + "/80";
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtAreaData.onBeginEditing = function () {
      if (scopeObj.view.lblCharCount2.text.trim().length === 0) {
        scopeObj.view.lblCharCount.setVisibility(false);
      } else {
        scopeObj.view.lblCharCount2.setVisibility(true);
        scopeObj.view.lblCharCount2.text = scopeObj.view.txtAreaData.text.trim().length + "/500";
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtAreaData.onKeyUp = function () {
      if (scopeObj.view.lblCharCount2.text.trim().length === 0) {
        scopeObj.view.txtAreaData.setVisibility(false);
      } else {
        scopeObj.view.lblCharCount2.setVisibility(true);
        scopeObj.view.lblCharCount2.text = scopeObj.view.txtAreaData.text.trim().length + "/500";
      }
      scopeObj.view.forceLayout();
    };
    this.view.txtfldAddressLine1.onKeyUp = function () {
      if (scopeObj.view.txtfldAddressLine1.text.trim().length === 0) {
        scopeObj.view.lblCharCount.setVisibility(false);
      } else {
        scopeObj.view.lblCharCount.setVisibility(true);
        scopeObj.view.lblCharCount.text = scopeObj.view.txtfldAddressLine1.text.trim().length + "/80";
      }
      scopeObj.view.forceLayout();
    };

    this.view.Message.txtTo.onBeginEditing = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
    };
    this.view.subHeader.flxClearSearchImage.onClick = function () {
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
      scopeObj.view.flxNoTemplate.setVisibility(false);
      scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.context = kony.i18n.getLocalizedString("i18n.frmLogsController.search");
      scopeObj.loadPageData();
    };
    this.view.listingSegmentClient.contextualMenu.flxOption1.onClick = function () {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.context = kony.i18n.getLocalizedString("i18n.frmPoliciesController.edit");
      scopeObj.showAddTemplatePage(scopeObj.context);
      scopeObj.view.lblCharCount.setVisibility(false);
      scopeObj.view.lblCharCount2.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Edit_template");
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.THANK_YOU_MESSAGE");
    };
    this.view.txtbxAssign.onBeginEditing = function () {
      scopeObj.view.txtbxAssign.text = "";
      scopeObj.view.flxAssignClose.isVisible = false;
      scopeObj.view.flxAssignDropdown.isVisible = false;
    };
    this.view.txtbxAssign.onKeyUp = function () {
      scopeObj.popup = true;
      scopeObj.view.flxAssignDropdown.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.lblNoAssignToError.isVisible = false;
      scopeObj.view.flxAssignDropdown.isVisible = true;
      if (scopeObj.view.txtbxAssign.text.length === 0)
        scopeObj.view.flxAssignClose.isVisible = false;
      else
        scopeObj.view.flxAssignClose.isVisible = true;
      scopeObj.sortBy.column("Name");
      scopeObj.assignedToSegmentPopup((scopeObj.userData).filter(scopeObj.searchFilterAssignee).sort(scopeObj.sortBy.sortData));
    };
    this.view.mainHeader.btnAddNewOption.onClick = function (context) {
      var templateDocument = document.getElementById("iframe_rtxTemplate").contentWindow.document;
      templateDocument.getElementById("charCounterStatus").value = "true";
      templateDocument.getElementById("maxCharCounter").innerHTML = "1500";
      templateDocument.getElementById("editor").innerHTML = "";
      templateDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      if(context !== "noData"){
        scopeObj.presenter.fetchAllTemplates();
      }
      else if (context === "noData") {
        scopeObj.view.lblCharCount2.setVisibility(false);
        scopeObj.view.mainHeader.flxButtons.setVisibility(false);
        scopeObj.view.flxScrollMainContent.setVisibility(false);
        scopeObj.view.flxTemplates.setVisibility(true);
        scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
        scopeObj.view.flxNoTemplate.setVisibility(true);
        scopeObj.view.flxTemplateView.setVisibility(false);
        scopeObj.view.flxAddTemplates.setVisibility(false);
        scopeObj.view.flxTemplatesDetails.setVisibility(false);
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Templates");
        scopeObj.view.flxBreadCrumbs.setVisibility(true);
        scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.leftmenu.MESSAGES");
        scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ADD_TEMPLATES");
        scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
        scopeObj.view.breadcrumbs.btnBackToMain.isVisible = true;
        scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight.setVisibility(true);
        scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
        scopeObj.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
        scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      } 
    };
    this.view.TemplateMessage.btnEdit.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(true);
    };
    this.view.TemplateMessage.btnAdd.onClick = function () {
      scopeObj.context = kony.i18n.getLocalizedString("i18n.frmPoliciesController.edit");
      scopeObj.showAddTemplatePage(scopeObj.context);
      scopeObj.view.lblCharCount.setVisibility(false);
      scopeObj.view.lblCharCount2.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Edit_template");
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.THANK_YOU_MESSAGE");
    };
    this.view.listingSegmentClient.contextualMenu.flxOption3.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(true);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.flxImportDeletePopup.setVisibility(true);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    };
    this.view.MessageFilter.tbxSearchBox.onBeginEditing = function () {
      scopeObj.view.MessageFilter.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
      scopeObj.view.forceLayout();
    };

    this.view.MessageFilter.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.MessageFilter.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
    };
    this.view.MessageFilter.tbxSearchBox.onKeyUp= function(){
      if (scopeObj.view.MessageFilter.tbxSearchBox.text === "") 
        scopeObj.view.MessageFilter.flxClearSearchImage.setVisibility(false);
      else 
        scopeObj.view.MessageFilter.flxClearSearchImage.setVisibility(true);
      scopeObj.view.forceLayout();
    };

    this.view.myQueueMessageFilter.tbxSearchBox.onKeyUp= function(){
      if (scopeObj.view.myQueueMessageFilter.tbxSearchBox.text === "") 
        scopeObj.view.myQueueMessageFilter.flxClearSearchImage.setVisibility(false);
      else 
        scopeObj.view.myQueueMessageFilter.flxClearSearchImage.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.MessageFilter.tbxSearchBox.onDone= function(){
      scopeObj.view.MessageFilter.btnAdd.onClick();
    };
    this.view.myQueueMessageFilter.tbxSearchBox.onBeginEditing = function () {
      scopeObj.view.myQueueMessageFilter.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
      scopeObj.view.forceLayout();
    };

    this.view.myQueueMessageFilter.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.myQueueMessageFilter.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
    };

    this.view.myQueueMessageFilter.tbxSearchBox.onDone= function(){
      scopeObj.view.myQueueMessageFilter.btnAdd.onClick();
    };
    this.view.subHeader.tbxSearchBox.onEndEditing = function () {
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxBgffffffBorderc1c9ceRadius30px";
    };

    this.view.MessageFilter.flxClearSearchImage.onClick = function () {
      scopeObj.view.MessageFilter.tbxSearchBox.text = "";
      scopeObj.view.MessageFilter.flxClearSearchImage.setVisibility(false);
      scopeObj.view.MessageFilter.btnAdd.onClick();
      scopeObj.view.forceLayout();
    };

    this.view.myQueueMessageFilter.flxClearSearchImage.onClick = function () {
      scopeObj.view.myQueueMessageFilter.tbxSearchBox.text = "";
      scopeObj.view.myQueueMessageFilter.flxClearSearchImage.setVisibility(false);
      scopeObj.view.myQueueMessageFilter.btnAdd.onClick();
      scopeObj.view.forceLayout();
    };

    this.view.listingSegmentClient.contextualMenu.flxOption1.onClick = function () {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.context = kony.i18n.getLocalizedString("i18n.frmPoliciesController.edit");
      scopeObj.showAddTemplatePage(scopeObj.context);
      scopeObj.view.lblCharCount.setVisibility(false); 
      scopeObj.view.flxNoTemplateNameError.isVisible=false;
      scopeObj.view.flxNoTemplateDescError.isVisible=false;
      scopeObj.view.lblCharCount2.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Edit_template");
      //scopeObj.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.THANK_YOU_MESSAGE");
    };
    this.view.listingSegmentClient.pagination.flxPrevious.onClick = function () {
      scopeObj.prevPage();
    };
    this.view.listingSegmentClient.pagination.flxNext.onClick = function () {
      scopeObj.nextPage();
    };


    this.view.flxPopUpClose.onClick = function () {
      scopeObj.view.flxAssignPopup.setVisibility(false);
    };
    this.view.popUp.flxPopUpClose.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(false);
    };
    this.view.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxAssignPopup.setVisibility(false);
    };
    this.view.btnPopUpDelete.onClick = function () {
      scopeObj.assignTo = scopeObj.view.txtbxAssign.text === kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me") ? scopeObj.user_ID : scopeObj.view.txtbxAssign.text;
      if (scopeObj.assignTo === "") {
        scopeObj.view.lblNoAssignToError.isVisible = true; 
      } else if (scopeObj.assignTo!==scopeObj.user_ID && !scopeObj.validateName(scopeObj.assignTo)) {
        scopeObj.view.lblNoAssignToError.text= "Please select a valid user.";
        scopeObj.view.lblNoAssignToError.isVisible = true; 
      }else {
        if(scopeObj.multiAssign===true){
          var requestIds = scopeObj.selectedRequestIds.join();
          var param = {
            "csrId": scopeObj.view.txtbxAssign.text.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").split(">").join("&gt").split("<").join("&lt")=== kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me") ? scopeObj.assignTo : scopeObj.assignedToID,
            "requestIds": requestIds
          };
          scopeObj.presenter.assignRequests(param);
        }
        else{
          var payload = {
            "assignedto": scopeObj.view.txtbxAssign.text === kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me") ? scopeObj.assignTo : scopeObj.assignedToID,
            "requestid": scopeObj.selectedRequestId,
            "requeststatus": ""
          };
          payload.username = scopeObj.getCurrentRequestCustomerUsername();
          payload.user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
          payload.isAdminRequest = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
          scopeObj.presenter.updateAssignTo(payload);
        }
      }
    };
    this.view.noTemplateData.btnAddStaticContent.onClick = function () {
      scopeObj.showAddTemplatePage();
      scopeObj.view.forceLayout();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function () {
      scopeObj.view.flxTemplates.setVisibility(false);
      scopeObj.view.flxScrollMainContent.setVisibility(true);
      scopeObj.context = "";
      scopeObj.showContent();
      scopeObj.backToListingpage();

    };

    this.view.breadcrumbs.btnPreviousPage.onClick = function () {
      scopeObj.presenter.fetchAllTemplates();
      scopeObj.resetDataFields();
    };

    this.view.commonButtons.btnSave.onClick = function () {
      kony.adminConsole.utils.showProgressBar(this.view);
      var templateName = scopeObj.view.txtfldAddressLine1.text;
      var templateDescrption = document.getElementById("iframe_rtxTemplate").contentWindow.document.getElementById("editor").innerHTML;
      var templateAdditionalText = scopeObj.view.txtAreaData.text;
      if (templateName !== "" && templateName.trim().length >= 5 && templateName.trim().length <= 80 && templateDescrption.trim().length >= 5 && templateDescrption.trim().length <= 1500) {
        var templateToInsert;
        var CSRModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule(kony.i18n.getLocalizedString("i18n.frmCSRController.CSRModule"));
        scopeObj.view.flxNoTemplateDescError.isVisible = false;
        scopeObj.view.flxNoTemplateNameError.isVisible = false;
        if (scopeObj.context === kony.i18n.getLocalizedString("i18n.frmPoliciesController.edit")) {
          templateToInsert = {
            "templateID": scopeObj.rowClickData.tempId,
            "templateName": scopeObj.getXSSSanitizedString(scopeObj.getXSSSanitizedString(templateName)),
            "templateBody": window.btoa(scopeObj.getXSSSanitizedString(templateDescrption)),
            "additionalNote": scopeObj.getXSSSanitizedString(templateAdditionalText)
          };
          CSRModule.presentationController.editTemplate(templateToInsert);

        } else {
          templateToInsert = {
            "templateName": scopeObj.getXSSSanitizedString(templateName),
           // "templateBody": window.btoa(scopeObj.getXSSSanitizedString(encodeURI(templateDescrption))),
            "templateBody":window.btoa(scopeObj.getXSSSanitizedString(templateDescrption)),
            "additionalNote": scopeObj.getXSSSanitizedString(templateAdditionalText)
          };
          CSRModule.presentationController.createNewTemplate(templateToInsert);
        }
      } else {
        if (templateName === "") {
          scopeObj.view.flxNoTemplateNameError.isVisible = true;
        } else if (templateName.trim().length < 5) {
          scopeObj.view.lblNoTemplateNameError.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Template_Name_Min_Message");
          scopeObj.view.flxNoTemplateNameError.isVisible = true;
        } else if (templateName.trim().length > 80) {
          scopeObj.view.lblNoTemplateNameError.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Template_Name_Max_Message");
          scopeObj.view.flxNoTemplateNameError.isVisible = true;
        } else if (templateDescrption.trim().length < 5) {
          scopeObj.view.lblNoTemplateDescription.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Template_Des_Min_Message");
          scopeObj.view.flxNoTemplateDescError.isVisible = true;
        } else if (templateDescrption.trim().length > 1500) {
          scopeObj.view.lblNoTemplateDescription.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Template_Des_Max_Message");
          scopeObj.view.flxNoTemplateDescError.isVisible = true;
        }
      }
    };

    this.view.txtfldAddressLine1.onBeginEditing = function () {
      scopeObj.view.flxNoTemplateNameError.isVisible = false;
      scopeObj.view.flxNoTemplateDescError.isVisible = false;
    };

    this.view.commonButtons.btnCancel.onClick = function () {
      scopeObj.presenter.fetchAllTemplates();
      kony.adminConsole.utils.showProgressBar(this.view);
    };

    this.view.txtfldAddressLine1.onBeginEditing = function () {
      scopeObj.view.flxNoTemplateNameError.isVisible = false;
    };

    this.view.commonButtons.btnCancel.onClick = function () {
      scopeObj.presenter.fetchAllTemplates();
      kony.adminConsole.utils.showProgressBar(this.view);
    };


    this.view.detailHeader.flxHeader1.onClick = function () {
      scopeObj.hideMessageToSearchBox();
      scopeObj.view.MessageFilter.flxClearSearchImage.isVisible = false;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.resetDataFields();
      scopeObj.currentStatus = "SID_OPEN";
      scopeObj.currentPage = 1;
      scopeObj.lastAppend=0;
      scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey = scopeObj.currentPage;

      scopeObj.view.MessageFilter.ListBoxCategory.selectedKey=scopeObj.view.MessageFilter.ListBoxCategory.masterData[0][0];

      var params = {
        "csrRepID": scopeObj.user_ID,
        "requestStatusID": "[SID_OPEN]",
        "recordsPerPage": scopeObj.totalRecordPerPage,
        "currPageIndex": "1",
        "sortCriteria": "",
        "sortOrder": "desc" //||desc
      };
      scopeObj.view.MessageFilter.SegSearchResult.removeAll(); 
      scopeObj.presenter.fetchRequests(params);
      // scopeObj.view.MessageFilter.imgRequestIdSortName.src="arrowreverse1x.png";

    };

    this.view.detailHeader.flxHeader2.onClick = function () {
      scopeObj.view.MessageFilter.flxClearSearchImage.isVisible = false;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.resetDataFields();
      scopeObj.currentStatus = "SID_INPROGRESS";
      scopeObj.currentPage = 1;
      scopeObj.lastAppend=0;
      scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey = scopeObj.currentPage;

      scopeObj.view.MessageFilter.ListBoxCategory.selectedKey=scopeObj.view.MessageFilter.ListBoxCategory.masterData[0][0];

      var params = {
        "csrRepID": scopeObj.user_ID,
        "requestStatusID": "[SID_INPROGRESS]",
        "recordsPerPage": scopeObj.totalRecordPerPage,
        "currPageIndex": "1",
        "sortCriteria": "",
        "sortOrder": "desc"
      };
      scopeObj.view.MessageFilter.SegSearchResult.removeAll();
      scopeObj.presenter.fetchRequests(params);
      //scopeObj.view.MessageFilter.imgRequestIdSortName.src="arrowreverse1x.png";
    };

    this.view.detailHeader.flxHeader3.onClick = function () {
      scopeObj.view.MessageFilter.flxClearSearchImage.isVisible = false;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.resetDataFields();
      scopeObj.currentStatus = "SID_RESOLVED";
      scopeObj.currentPage = 1;
      scopeObj.lastAppend=0;
      scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey = scopeObj.currentPage;

      scopeObj.view.MessageFilter.ListBoxCategory.selectedKey=scopeObj.view.MessageFilter.ListBoxCategory.masterData[0][0];

      var params = {
        "csrRepID": scopeObj.user_ID,
        "requestStatusID": "[SID_RESOLVED]",
        "recordsPerPage": scopeObj.totalRecordPerPage,
        "currPageIndex": "1",
        "sortCriteria": "",
        "sortOrder": "desc"
      };
      scopeObj.view.MessageFilter.SegSearchResult.removeAll();
      scopeObj.presenter.fetchRequests(params);
      // scopeObj.view.MessageFilter.imgRequestIdSortName.src="arrowreverse1x.png"; 
    };

    this.view.detailHeader.flxHeader4.onClick = function () {
      scopeObj.view.MessageFilter.flxClearSearchImage.isVisible = false;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.resetDataFields();
      scopeObj.currentStatus = "SID_ARCHIVED";
      scopeObj.currentPage = 1;
      scopeObj.lastAppend=0;
      scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey = scopeObj.currentPage;

      scopeObj.view.MessageFilter.ListBoxCategory.selectedKey=scopeObj.view.MessageFilter.ListBoxCategory.masterData[0][0];

      var params = {
        "csrRepID": scopeObj.user_ID,
        "requestStatusID": "[SID_ARCHIVED]",
        "recordsPerPage": scopeObj.totalRecordPerPage,
        "currPageIndex": "1",
        "sortCriteria": "",
        "sortOrder": "desc"
      };
      scopeObj.view.MessageFilter.SegSearchResult.removeAll();
      scopeObj.presenter.fetchRequests(params);
      // scopeObj.view.MessageFilter.imgRequestIdSortName.src="arrowreverse1x.png";

    };

    this.view.detailHeader.flxHeader5.onClick = function () {
      scopeObj.view.MessageFilter.flxClearSearchImage.isVisible = false;
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.resetDataFields();
      scopeObj.view.myQueueMessageFilter.FlexResult.isVisible = true;
      scopeObj.view.myQueueMessageFilter.FlexNoResult.isVisible = false;
      scopeObj.view.MessageFilter.ListBoxCategory.selectedKey=scopeObj.view.MessageFilter.ListBoxCategory.masterData[0][0];
      // Calling presentation method to fetch my messages
      scopeObj.view.MessageFilter.ListBoxCategory.selectedKey=scopeObj.view.MessageFilter.ListBoxCategory.masterData[0][0];
      var params = {
        "csrRepID": scopeObj.user_ID,
        "requestAssignedTo": scopeObj.user_ID,
        "requestStatusID": "[SID_OPEN,SID_INPROGRESS]",
        "recordsPerPage": scopeObj.totalRecordPerPage,
        "currPageIndex": "1",
        "sortCriteria": "",
        "sortOrder": "desc"
      };
      scopeObj.view.myQueueMessageFilter.SegSearchResult.removeAll();
      scopeObj.presenter.fetchMyQueueRequests(params);
      // scopeObj.view.myQueueMessageFilter.imgRequestIdSortName.src="arrowreverse1x.png";
    };

    this.view.MessageFilter.segAssignDropdown.onRowClick = function () {
      var index = scopeObj.view.MessageFilter.segAssignDropdown.selectedRowIndex;
      var assignedTo = scopeObj.view.MessageFilter.segAssignDropdown.data[index[1]].lblViewFullName;
      scopeObj.assignedToSearchID = scopeObj.view.MessageFilter.segAssignDropdown.data[index[1]].id;
      scopeObj.view.MessageFilter.txtfldAssignTo.text = assignedTo;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      scopeObj.view.forceLayout();
    };

    this.view.MessageFilter.segRepliedOnDropdown.onRowClick = function () {
      var index = scopeObj.view.MessageFilter.segRepliedOnDropdown.selectedRowIndex;
      var assignedTo = scopeObj.view.MessageFilter.segRepliedOnDropdown.data[index[1]].lblViewFullName;
      scopeObj.repliedID = scopeObj.view.MessageFilter.segRepliedOnDropdown.data[index[1]].id;
      scopeObj.view.MessageFilter.txtfldRepliedby.text = assignedTo;
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.forceLayout();
    };

    this.view.mainHeader.btnDropdownList.onClick = function () {
      var templateDocument = document.getElementById("iframe_rtxTemplate").contentWindow.document;
      templateDocument.getElementById("editor").innerHTML = "";
      templateDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
      if (scopeObj.view.mainHeader.btnDropdownList.text === kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_TEMPLATE")) {
        scopeObj.showAddTemplatePage();
        scopeObj.view.flxNoTemplateNameError.isVisible=false;
        scopeObj.view.flxNoTemplateDescError.isVisible=false;
        scopeObj.view.forceLayout();
      }
      else{
        scopeObj.view.flxNewMessage.right = "31px";
        scopeObj.view.Message.lblSaving.text= "";
        scopeObj.requestmessage_id="";
        scopeObj.selectedRequestId="";
        scopeObj.view.Message.txtTo.text="";
        scopeObj.view.Message.imgCheckBoxMsg.src = "checkboxnormal.png";
        scopeObj.view.Message.imgMsgIconPriority.isVisible = false;
        scopeObj.view.Message.lblHighPriority.isVisible = false;
        scopeObj.view.Message.lstbocCategory.selectedKey="Select Category";
        scopeObj.view.Message.flxFilter.isVisible=false;
        scopeObj.presenter.fetchAllEmailTemplates();
      }


    };
    this.view.Message.flxClose.onClick = function () {
      kony.timer.cancel("sendDraftMessage");
      scopeObj.view.flxNewMessage.setVisibility(false);
      scopeObj.view.flxNewMessageHeader.setVisibility(false);
      //Reset emails if added
      scopeObj.removeAllTag();
      scopeObj.view.forceLayout();
      if(!scopeObj.showingDraft && scopeObj.view.Message.lblSaving.text === "")
        scopeObj.deleteAllAttachments();
      scopeObj.showingDraft = false;
      if(scopeObj.view.Message.lblMsg.text!==kony.i18n.getLocalizedString("i18n.frmCSRController.New_Message"))
        scopeObj.fetchEmailMsg();
    };
    this.view.flxRightPannel.onTouchStart=function () {
      scopeObj.hideMessageToSearchBox();
    };
    this.view.Message.flxEmail.onTouchStart=function () {
      scopeObj.hideMessageToSearchBox();
    };
    //     this.view.Message.flxMessageHeader.onTouchStart=function () {
    //   scopeObj.hideMessageToSearchBox();
    // };
    this.view.Message.flxMinimize.onClick = function () {
      scopeObj.hideMessageToSearchBox();
      scopeObj.view.flxNewMessage.isVisible = false;
      scopeObj.view.flxNewMessageHeader.isVisible = true;
      scopeObj.view.flxNewMessageHeader.height="10%";
      scopeObj.view.forceLayout();
    };
    this.view.flxMaximize.onClick = function () {
      scopeObj.view.flxNewMessage.isVisible = true;
      scopeObj.view.flxNewMessageHeader.isVisible = false;
    };

    this.view.Message.btnCancel.onClick = function () {
      scopeObj.view.flxNewMessage.setVisibility(false);
      scopeObj.view.Message.txtTo.text = "";
      scopeObj.hideMessageToSearchBox();
    };

    this.view.flxClose.onClick = function () {
      kony.timer.cancel("sendDraftMessage");
      scopeObj.view.flxNewMessage.setVisibility(false);
      scopeObj.view.flxNewMessageHeader.isVisible = false;

      //Reset emails if added
      scopeObj.removeAllTag();
      if(!scopeObj.showingDraft && scopeObj.view.Message.lblSaving.text === "")
        scopeObj.deleteAllAttachments();
      scopeObj.showingDraft = false;
      // if(scopeObj.view.Message.lblMsg.text!==kony.i18n.getLocalizedString("i18n.frmCSRController.New_Message"))
      //   scopeObj.fetchEmailMsg();
    };

    this.view.Message.flxSubject.onClick = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      scopeObj.hideMessageToSearchBox();
    };
    this.view.Message.flxEmail.onClick = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      scopeObj.hideMessageToSearchBox();
    };

    this.view.Message.flxAttatchments.onClick = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      scopeObj.hideMessageToSearchBox();
    };
    this.view.Message.flxEditButtons.onClick = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      scopeObj.hideMessageToSearchBox();
    };



    this.view.Message.txtSubject.onBeginEditing = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      scopeObj.hideMessageToSearchBox();
    };
    this.view.Message.btnsave.onClick = function () {
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      scopeObj.view.Message.flxErrorMessage.zIndex = 100;
      var messageText = document.getElementById("iframe_rtxMessage").contentWindow.document.getElementById("editor").innerHTML;
      var replaceSpace = messageText.replace(/\&nbsp;/g, '');
      var trimReplace = replaceSpace.trim();
      trimReplace = trimReplace.replaceAll("&", "&amp;");
      trimReplace = window.btoa(encodeURI(trimReplace));
      kony.print("trimReplace (after encoding): " + trimReplace);
      var category = scopeObj.view.Message.lstbocCategory.selectedKey;
      var subject = scopeObj.view.Message.txtSubject.text;
      if(scopeObj.selectedUsers.length===0){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Please_select_user");
      }
      else if(subject===""){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text=kony.i18n.getLocalizedString("i18n.frmCSRController.subject_Min_Message");
      }else if(category===kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Category")){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Please_select_the_category");
      }else if(trimReplace===""){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text=kony.i18n.getLocalizedString("i18n.frmCSRController.messageText_Empty");
      }else if(subject.length>50){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Subject_Exceed_50Chars");
      } else if(scopeObj.checkForAcceptedTags(replaceSpace)){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text="Message text contains invalid text";
      }
      else{
        kony.timer.cancel("sendDraftMessage");
        var statusId =  "SID_INPROGRESS";
        var isPriorityMessage =scopeObj.view.Message.imgCheckBoxMsg.src === "checkboxselected.png"?"1":"0";
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        let openedMsgRequestId = "";
        if(scopeObj.selectedRequestId !== ""){
          openedMsgRequestId = scopeObj.view.Message.lblMsg.text;
        }
        var param  = {
          // "requestid":scopeObj.selectedRequestId===undefined?"":scopeObj.selectedRequestId,
          "requestid": openedMsgRequestId,
          "messageid":scopeObj.requestmessage_id,
          "username":scopeObj.selectedUsers=scopeObj.selectedUsers +"",
          "customer_id":"",
          "priority":kony.i18n.getLocalizedString("i18n.frmCSRController.High"),
          "requestsubject":scopeObj.getXSSSanitizedString(subject),
          "requeststatus": statusId,
          // "modifiedby":scopeObj.user_ID,//CSR ID
          "requestcategory_id": category,
          "messagedescription": trimReplace,
          "mediaIds": scopeObj.getMediaIdList(),
          "discardedMediaIds":scopeObj.discardAttchments,
          "messagestatus": kony.i18n.getLocalizedString("i18n.frmCSRController.SENT"),
          "isAdminRequest": true,
          "recipientList": "[" + scopeObj.selectedUsers + "]",
          "user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
          "isPriorityMessage":isPriorityMessage

        };
        // scopeObj.view.MessageFilter.SegSearchResult.removeAll(); 
        //scopeObj.view.myQueueMessageFilter.SegSearchResult.removeAll();
        scopeObj.presenter.createNewMessage(param);
      }
    };
    this.view.listingSegmentClient.segListing.onRowClick = function () {
      scopeObj.view.flxNoTemplate.setVisibility(false);
      scopeObj.view.flxTemplateView.setVisibility(false);
      scopeObj.view.flxTemplatesDetails.setVisibility(true);
      scopeObj.view.mainHeader.flxButtons.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.View_Template");
      scopeObj.view.flxBreadCrumbs.setVisibility(true);
      scopeObj.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.leftmenu.MESSAGES");
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = scopeObj.rowClickData.tempName.toUpperCase();
      scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      scopeObj.view.TemplateMessage.rtxAddressAdditional1.text = scopeObj.rowClickData.tempBody;
      if(scopeObj.rowClickData.tempBody.indexOf("<li") >= 0) {
        scopeObj.view.TemplateMessage.rtxAddressAdditional1.padding = [1.6,0,0,0];
      }
      else {
        scopeObj.view.TemplateMessage.rtxAddressAdditional1.padding = [0,0,0,0];
      }
      scopeObj.view.breadcrumbs.btnPreviousPage.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TEMPLATES");
      scopeObj.view.TemplateMessage.lblAdditionalNoteValue.text = scopeObj.rowClickData.tempNote !== ""?scopeObj.rowClickData.tempNote:"N/A";
      scopeObj.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    };

    this.view.editMessages.segMesgs.onRowClick = function () {
      var index = scopeObj.view.editMessages.segMesgs.selectedIndex;
      var data = scopeObj.view.editMessages.segMesgs.data;
      //Reseting data for other tab 
      for (var i = 0; i < data.length; i++) {
        data[i].template = "flxMain";
      }

      if(data[index[1]].rtxDescription.indexOf("<li") >= 0) {
        data[index[1]].template = "flxEmailMainLeftPadding";
      }
      else {
        data[index[1]].template = "flxEmailMain";
      }

      scopeObj.view.editMessages.segMesgs.setData(data);
      scopeObj.view.forceLayout();

    };

    this.view.segUsers.onRowClick = function () {
      var index = scopeObj.view.segUsers.selectedIndex;
      var data = scopeObj.view.segUsers.data;
      var assignedTo = data[index[0]].lblViewFullName;
      scopeObj.assignedToID = data[index[0]].id;
      if (assignedTo === "") {
        scopeObj.view.lblAssignedToError.isVisible = true;
      }
    }; 
    this.view.MessageFilter.contextualMenu.flxOption2.onClick = function(){
      scopeObj.presenter.fetchEmailTemplates();
      scopeObj.sendDraftMessage();
      var selectedRow = scopeObj.view.MessageFilter.SegSearchResult.selectedRowIndex[1];
      var rowData = scopeObj.view.MessageFilter.SegSearchResult.data[selectedRow];
      var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
      messageDocument.getElementById("editor").innerHTML = "";
      messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
      scopeObj.view.MessageFilter.FlexContextMenu.setVisibility(false);  
      scopeObj.view.Message.flxFilter.isVisible=false;

      scopeObj.showNewEmailMessage();
      scopeObj.checkUploadedFiles();
      scopeObj.filledNewRequestData(rowData);

    };
    this.view.MessageFilter.contextualMenu.flxOption3.onClick = function () {
      var selectedIndex = scopeObj.view.MessageFilter.SegSearchResult.selectedRowIndex[1];
      scopeObj.selectedRequestId = scopeObj.view.MessageFilter.SegSearchResult.data[selectedIndex].lblRequestID.text; 
      scopeObj.view.MessageFilter.FlexContextMenu.setVisibility(false);
      scopeObj.view.txtbxAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me");
      scopeObj.view.flxAssignPopup.setVisibility(true);
      scopeObj.multiAssign=false;
    };
    this.view.MessageFilter.contextualMenu.flxOption4.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(true);
      scopeObj.view.MessageFilter.FlexContextMenu.setVisibility(false);
    };
    this.view.popUp.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(false);
    };
    this.view.popUp.btnPopUpDelete.onClick = function () {
      scopeObj.presenter.deleteTemplate(scopeObj.rowClickData.tempId);
      scopeObj.view.flxImportDeletePopup.setVisibility(false);
      scopeObj.view.toastMessage.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmCSRController.template_deleted_Message");
    };
    this.view.myQueueMessageFilter.contextualMenu.flxOption2.onClick = function () {
      var selectedInd = scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedRowIndex[1];
      var rowData = scopeObj.view.myQueueMessageFilter.SegSearchResult.data[selectedInd];
      var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
      messageDocument.getElementById("editor").innerHTML = "";
      messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
      scopeObj.view.myQueueMessageFilter.FlexContextMenu.setVisibility(false);
      scopeObj.view.Message.flxFilter.isVisible=false;
      scopeObj.presenter.fetchEmailTemplates();
      scopeObj.showNewEmailMessage();
      scopeObj.filledNewRequestData(rowData);
      scopeObj.checkUploadedFiles();
      scopeObj.sendDraftMessage();
    };
    this.view.myQueueMessageFilter.contextualMenu.flxOption3.onClick = function () {
      var selectedInd = scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedRowIndex[1];
      var rowData = scopeObj.view.myQueueMessageFilter.SegSearchResult.data[selectedInd];
      scopeObj.selectedRequestId =rowData.lblRequestID.text;
      scopeObj.view.myQueueMessageFilter.FlexContextMenu.setVisibility(false);
      scopeObj.view.txtbxAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me");
      scopeObj.view.flxAssignPopup.setVisibility(true);
      scopeObj.multiAssign=false;
    };
    this.view.myQueueMessageFilter.contextualMenu.flxOption4.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(true);
      scopeObj.view.myQueueMessageFilter.FlexContextMenu.setVisibility(false);
    };
    this.view.editMessages.btnStatus.onClick = function(){
      var param="";
      var isDraft=false;
      var msgData = scopeObj.view.editMessages.segMesgs.data;
      for(var i=0;i<msgData.length;i++)
      {
        if(msgData[i].btnDraft.isVisible===true || msgData[i].btnDraft.isVisible.btnDraftMain===true)
        {
          isDraft=true;
        }
      }

      var currentStatus = scopeObj.view.editMessages.btnStatus.text;
      if(currentStatus === "Mark as IN PROGRESS" || isDraft===false){

        if(currentStatus === kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_RESOLVED")){
          param  = {"requeststatus":"SID_RESOLVED","requestid":scopeObj.selectedRequestId,"assignedto":""};
        }else{
          param  = {"requeststatus":"SID_INPROGRESS","requestid":scopeObj.selectedRequestId,"assignedto":""};
        }
        param.username = scopeObj.getCurrentRequestCustomerUsername();
        param.user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
        param.isAdminRequest = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
        scopeObj.presenter.updateRequestStatus(param,currentStatus,true);
      }else{
        scopeObj.view.toastMessage.showErrorToastMessage (kony.i18n.getLocalizedString("i18n.frmCSRController.prop774"),scopeObj);
      }
    };

    this.view.editMessages.backToPageHeader.flxBack.onClick=function(){
      scopeObj.view.flxMessageDetailsPage.setVisibility(false);
      scopeObj.backToListingpage();

    };
    this.view.editMessages.backToPageHeader.btnBack.onClick = function () {
      scopeObj.view.flxMessageDetailsPage.setVisibility(false);
      scopeObj.backToListingpage();

    };
    this.view.editMessages.btnReply.onClick = function () {
      scopeObj.hideMessageToSearchBox();
      scopeObj.presenter.fetchEmailTemplates();
      var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
      messageDocument.getElementById("editor").innerHTML = "";
      messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
      scopeObj.showNewEmailMessage();
      scopeObj.checkUploadedFiles();
      scopeObj.filledData();
      scopeObj.sendDraftMessage();
    };
    this.view.editMessages.btnAssign.onClick = function () {
      scopeObj.view.txtbxAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me");
      scopeObj.view.flxAssignPopup.setVisibility(true);
      scopeObj.multiAssign=false;
    };
    this.view.MessageFilter.btnAdd.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible=false;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible=false;
      scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible=false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible=false;
      scopeObj.view.myQueueMessageFilter.FlexContextMenu.isVisible=false;
      scopeObj.selectedRequestIds=[];
      // Search
      var searchText = scopeObj.view.MessageFilter.tbxSearchBox.text;
      var category = scopeObj.view.MessageFilter.ListBoxCategory.selectedKey;
      var assignedTo = scopeObj.view.MessageFilter.txtfldAssignTo.text;
      var repliedBy = scopeObj.view.MessageFilter.txtfldRepliedby.text;
      var status = scopeObj.currentStatus;

      // Date calculation for date picker
      var receivedOn = "";
      var finalDate = "";
      if (scopeObj.view.datePicker.value !== "") {
        // var receivedOnText = scopeObj.view.datePicker.rangeType !== "custom" ? scopeObj.view.datePicker.rangeType : scopeObj.view.datePicker.value;
        //scopeObj.view.mainHeader.lblHeading.text.replace(kony.i18n.getLocalizedString("i18n.frmCSRController.Messages"),"");
        var receivedOnText = "";
        if(scopeObj.view.datePicker.rangeType === "custom" || scopeObj.view.datePicker.rangeType === "Last 7 days" || scopeObj.view.datePicker.rangeType === "Last 30 days")
        {
          receivedOnText = scopeObj.view.datePicker.value;
        }
        else{
          receivedOnText =scopeObj.view.datePicker.rangeType;
        }
        if (receivedOnText.indexOf("-") > 0) { 
          receivedOn = scopeObj.getDateForString(receivedOnText.substring(0, 10));
          finalDate = scopeObj.getEndDateForString(receivedOnText.substring(13, 24));
        } else {
          receivedOn = receivedOnText !== "" ? (scopeObj.getDateForString(receivedOnText)) : "";
        }
      }
      scopeObj.currentPage=1;
      scopeObj.lastAppend=0;
      var params={"csrRepID":scopeObj.user_ID,
                  "searchKey":searchText!==""?searchText:"",
                  "requestAssignedTo": assignedTo!==""?scopeObj.assignedToSearchID!==""?scopeObj.assignedToSearchID:assignedTo:"",
                  "requestCategory": category!==kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Category")?category:"",
                  "messageRepliedBy": repliedBy!==""?scopeObj.repliedID!==""?scopeObj.repliedID:repliedBy:"",
                  "dateInitialPoint":receivedOn,
                  "dateFinalPoint":finalDate,
                  "requestStatusID": "["+ status +"]",
                  "currPageIndex":"1", 
                  "sortCriteria":"",
                  "recordsPerPage":scopeObj.totalRecordPerPage,
                  "sortOrder":"asc"};

      scopeObj.searchParam=params;

      scopeObj.presenter.fetchSearchRequests(params);
    };

    this.view.myQueueMessageFilter.btnAdd.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible=false;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible=false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible=false;
      scopeObj.view.listingSegmentClient.flxContextualMenu.isVisible=false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible=false;
      scopeObj.view.myQueueMessageFilter.FlexContextMenu.isVisible=false;
      scopeObj.selectedRequestIds=[];
      // Search
      var searchText = scopeObj.view.myQueueMessageFilter.tbxSearchBox.text;
      var category = scopeObj.view.myQueueMessageFilter.ListBoxCategory.selectedKey;
      var status = scopeObj.view.myQueueMessageFilter.ListBoxStatus.selectedKey;
      // var assignedTo	=	scopeObj.view.myQueueMessageFilter.txtfldAssignTo.text;
      //  var repliedBy		=	scopeObj.view.myQueueMessageFilter.txtfldRepliedby.text;
      var receivedOn = "";
      var finalDate = "";
      if (scopeObj.view.datePicker1.value !== "") {
        //var receivedOnText = scopeObj.view.datePicker1.rangeType !== "custom" ? scopeObj.view.datePicker1.rangeType : scopeObj.view.datePicker1.value;
        //scopeObj.view.mainHeader.lblHeading.text.replace(kony.i18n.getLocalizedString("i18n.frmCSRController.Messages"),"");
        var receivedOnText = "";
        if(scopeObj.view.datePicker1.rangeType === "custom" || scopeObj.view.datePicker1.rangeType === "Last 7 days" || scopeObj.view.datePicker1.rangeType === "Last 30 days")
        {
          receivedOnText = scopeObj.view.datePicker1.value;
        }
        else{
          receivedOnText =scopeObj.view.datePicker1.rangeType;
        }
        if (receivedOnText.indexOf("-") > 0) {
          receivedOn = scopeObj.getDateForString(receivedOnText.substring(0, 10));
          finalDate = scopeObj.getEndDateForString(receivedOnText.substring(13, 24));
        } else {
          receivedOn = receivedOnText !== "" ? (scopeObj.getDateForString(receivedOnText)) : "";
        }
      }
      // var status		=   "MyQueue";
      scopeObj.currentPage=1;
      scopeObj.lastAppend=0;
      var params={"csrRepID":scopeObj.user_ID,
                  "searchKey":searchText!==""?searchText:"",
                  "requestAssignedTo": scopeObj.user_ID,
                  "recordsPerPage":scopeObj.totalRecordPerPage,
                  "requestStatusID": status!==kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Status")?"["+ status +"]":"[SID_OPEN,SID_INPROGRESS]",
                  "requestCategory": category!==kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Category")?category:"",
                  "dateInitialPoint":receivedOn,   
                  "dateFinalPoint":finalDate,
                  "currPageIndex":"1", 
                  "sortCriteria":"",
                  "sortOrder":"asc"};

      scopeObj.searchParam=params;
      scopeObj.presenter.fetchQueueSearchMyRequests(params);
    };


    this.view.flxAssignClose.onClick = function () {
      scopeObj.view.txtbxAssign.text = "";
      scopeObj.view.flxAssignDropdown.isVisible = false;
    };



    this.view.myQueueMessageFilter.selectDate.btnApply.onClick = function () {
      scopeObj.view.myQueueMessageFilter.flxDropDownDetail1.isVisible = false;
      var calFrom = scopeObj.view.myQueueMessageFilter.selectDate.calFrom.date;
      var calTo = scopeObj.view.myQueueMessageFilter.selectDate.calTo.date;
      if (calFrom !== null && calTo !== null) {
        scopeObj.view.myQueueMessageFilter.lblSelectedRows.text = calFrom + "-" + calTo;
      } else if (calFrom !== null) {
        scopeObj.view.myQueueMessageFilter.lblSelectedRows.text = calFrom;
      } else {
        scopeObj.view.myQueueMessageFilter.lblSelectedRows.text = calTo;
      }
    };

    // Sorting related code for all requests

    this.view.MessageFilter.flxCategory.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_RequestCategory_id";
      scopeObj.getSortedRequest(false);
    };

    this.view.MessageFilter.flxRequestIdHederName.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_id";
      scopeObj.getSortedRequest(false);
    };

    this.view.MessageFilter.flxCustomername.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customer_Fullname";
      scopeObj.getSortedRequest(false);
    };

    this.view.MessageFilter.flxDate.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_createdts";
      scopeObj.getSortedRequest(false);
    };

    this.view.MessageFilter.flxAssignedTo.onClick = function(){
      if(scopeObj.isKeyCloakEnabled!==true){
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.sortColoumn = "customerrequest_AssignedTo_Name";
        scopeObj.getSortedRequest(false);
      }
    };
    this.view.MessageFilter.flxCustomerId.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_Customer_id";
      scopeObj.getSortedRequest(false);
    };

    ////////////// for my queue ///////// 
    this.view.myQueueMessageFilter.flxCategory.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_RequestCategory_id";
      scopeObj.getSortedRequest(true);
    };
    this.view.myQueueMessageFilter.flxRequestIdHederName.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_id";
      scopeObj.getSortedRequest(true);
    };

    this.view.myQueueMessageFilter.flxCustomername.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customer_Fullname";//customer_Username";
      scopeObj.getSortedRequest(true);
    };

    this.view.myQueueMessageFilter.flxDate.onClick = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_createdts";
      scopeObj.getSortedRequest(true);
    };
    this.view.myQueueMessageFilter.flxAssignedTo.onClick = function () {
      if(scopeObj.isKeyCloakEnabled!==true){
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.sortColoumn = "customerrequest_Status_id";
        scopeObj.getSortedRequest(true);
      }
    };
    this.view.myQueueMessageFilter.flxCustomerId.onClick = function(){
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.sortColoumn = "customerrequest_Customer_id";
      scopeObj.getSortedRequest(true);
    };
    /////////// Sorting for template 
    this.view.MessageFilter.flxBody.onClick = function () {
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxDropDownDetail1.isVisible = false;
    };

    this.view.myQueueMessageFilter.flxBody.onClick = function () {
      scopeObj.view.myQueueMessageFilter.flxDropDownDetail1.isVisible = false;
    };
    this.view.MessageFilter.txtfldAssignTo.onTouchStart = function(){
      scopeObj.view.MessageFilter.flxAssignedToTxtcont.skin = "sknFlxBgFFFFFFBr1293cc1pxRound3px";
    };
    this.view.MessageFilter.txtfldAssignTo.onEndEditing = function(){
      scopeObj.view.MessageFilter.flxAssignedToTxtcont.skin = "sknflxffffffope1e5edcsr";
    };
    this.view.MessageFilter.txtfldAssignTo.onKeyUp = function () {
      scopeObj.view.MessageFilter.flxAssignedToTxtcont.skin = "sknFlxBgFFFFFFBr1293cc1pxRound3px";
      scopeObj.view.MessageFilter.flxAssignDropdown.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = true;
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      if(scopeObj.view.MessageFilter.txtfldAssignTo.text === ""){
        scopeObj.view.MessageFilter.flxClearAssignTo.setVisibility(false);
      } else{
        scopeObj.view.MessageFilter.flxClearAssignTo.setVisibility(true);
      }
      scopeObj.view.forceLayout();
      scopeObj.loadUsersData(kony.i18n.getLocalizedString("i18n.frmCSRController.Assign"));
    };

    this.view.MessageFilter.flxClearAssignTo.onClick = function(){
      scopeObj.view.MessageFilter.flxClearAssignTo.setVisibility(false);
      scopeObj.view.MessageFilter.txtfldAssignTo.text = "";
      scopeObj.view.MessageFilter.flxAssignDropdown.setVisibility(false);
    };

    this.view.MessageFilter.txtfldRepliedby.onTouchStart = function(){
      scopeObj.view.MessageFilter.flxRepliedByTxtcont.skin = "sknFlxBgFFFFFFBr1293cc1pxRound3px";
    };
    this.view.MessageFilter.txtfldRepliedby.onEndEditing = function(){
      scopeObj.view.MessageFilter.flxRepliedByTxtcont.skin = "sknflxffffffope1e5edcsr";
    };
    this.view.MessageFilter.txtfldRepliedby.onKeyUp = function () {
      scopeObj.view.MessageFilter.flxRepliedByTxtcont.skin = "sknFlxBgFFFFFFBr1293cc1pxRound3px";
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.onHover = scopeObj.onHoverEventCallback;
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = true;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      if(scopeObj.view.MessageFilter.txtfldRepliedby.text === ""){
        scopeObj.view.MessageFilter.flxClearRepliedBy.setVisibility(false);
      } else{
        scopeObj.view.MessageFilter.flxClearRepliedBy.setVisibility(true);
      }
      scopeObj.view.forceLayout();
      scopeObj.loadUsersData(kony.i18n.getLocalizedString("i18n.frmCSRController.Replied"));
    };

    this.view.MessageFilter.flxClearRepliedBy.onClick = function(){
      scopeObj.view.MessageFilter.flxClearRepliedBy.setVisibility(false);
      scopeObj.view.MessageFilter.txtfldRepliedby.text = "";
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.setVisibility(false);
    };

    this.view.subHeader.tbxSearchBox.onKeyUp = function () {
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
      scopeObj.currentPage = 1;
      scopeObj.lastAppend=0;
      scopeObj.view.listingSegmentClient.pagination.lbxPagination.selectedKey = scopeObj.currentPage;
      if (scopeObj.view.subHeader.tbxSearchBox.text === "")
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      else
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      scopeObj.context = kony.i18n.getLocalizedString("i18n.frmLogsController.search");
      scopeObj.loadPageData();
    };

    this.view.segUsers.onRowClick = function () {
      var index = scopeObj.view.segUsers.selectedRowIndex[1];
      var assignTo = scopeObj.view.segUsers.data[index].lblViewFullName;
      scopeObj.assignedToID = scopeObj.view.segUsers.data[index].id;
      scopeObj.view.txtbxAssign.text = assignTo;

      scopeObj.view.flxAssignDropdown.isVisible = false;
      scopeObj.view.forceLayout();
    };

    //Get suggestions
    this.view.Message.txtTo.onKeyUp = function () {
      var searchText = scopeObj.view.Message.txtTo.text;
      if(searchText && searchText.trim() !== '' && searchText.length > 2){
        scopeObj.view.Message.flxFilter.setVisibility(true);
        scopeObj.view.Message.flxCSRInnerLoading.setVisibility(true);
        scopeObj.view.Message.segFilterDropdown.setVisibility(false);
        scopeObj.view.Message.richtextNoResult.setVisibility(false);
        scopeObj.view.Message.richTxtTopSuggestions.setVisibility(false);
        scopeObj.view.Message.forceLayout();

        scopeObj.CustomerSuggestionsPriority++;
        scopeObj.presenter.customerSuggestions(scopeObj.CustomerSuggestionsPriority, searchText);

      }else{
        scopeObj.view.Message.flxFilter.setVisibility(false);
        scopeObj.view.Message.forceLayout();
      }
    };

    this.view.Message.segFilterDropdown.onRowClick = function () {
      var index = scopeObj.view.Message.segFilterDropdown.selectedRowIndex[1];
      var assignTo = scopeObj.view.Message.segFilterDropdown.data[index].username;
      var id = scopeObj.view.Message.segFilterDropdown.data[index].id;
      var email = scopeObj.view.Message.segFilterDropdown.data[index].email;
      var name = scopeObj.view.Message.segFilterDropdown.data[index].lblViewFullName;
      var userType = scopeObj.view.Message.segFilterDropdown.data[index].type;

      scopeObj.addTag(assignTo, id, email, name, userType);
    };

    this.view.segUsers.onRowClick = function () {
      var index = scopeObj.view.segUsers.selectedRowIndex[1];
      var assignTo = scopeObj.view.segUsers.data[index].lblViewFullName;
      scopeObj.assignedToID = scopeObj.view.segUsers.data[index].id;
      scopeObj.view.txtbxAssign.text = assignTo;
      scopeObj.view.flxAssignDropdown.isVisible = false;
      scopeObj.view.forceLayout();
    };

    // Pagination Related calls
    this.view.MessageFilter.pagination.flxNext.onClick = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNo+1;
        scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey=scopeObj.currentPage;

        var params={"csrRepID":scopeObj.user_ID,
                    "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                    "requestAssignedTo": scopeObj.searchParam.requestAssignedTo!==undefined?scopeObj.searchParam.requestAssignedTo:"",
                    "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                    "messageRepliedBy": scopeObj.searchParam.messageRepliedBy!==undefined?scopeObj.searchParam.messageRepliedBy:"",
                    "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                    "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                    "requestStatusID": "["+scopeObj.currentStatus+"]",
                    "currPageIndex":scopeObj.currentPage, 
                    "sortCriteria":scopeObj.sortColoumn,
                    "recordsPerPage":scopeObj.totalRecordPerPage,
                    "sortOrder":scopeObj.sortOrder};

        scopeObj.presenter.fetchRequests(params);
      }
    };

    this.view.MessageFilter.pagination.flxNext.onHover = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        scopeObj.view.MessageFilter.pagination.flxNext.hoverSkin ="sknCursor";
        scopeObj.view.MessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.MessageFilter.pagination.flxNext.hoverSkin ="sknDisableCursor";
        scopeObj.view.MessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextDisable";
      }

      if (pageNo - 1 > 0)  {
        scopeObj.view.MessageFilter.pagination.flxPrevious.hoverSkin ="sknCursor";
        scopeObj.view.MessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.MessageFilter.pagination.flxPrevious.hoverSkin ="sknDisableCursor";
        scopeObj.view.MessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextDisable";
      }
    };

    this.view.MessageFilter.pagination.flxPrevious.onHover = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo - 1 > 0)  {
        scopeObj.view.MessageFilter.pagination.flxPrevious.hoverSkin ="sknCursor";
        scopeObj.view.MessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.MessageFilter.pagination.flxPrevious.hoverSkin ="sknDisableCursor";
        scopeObj.view.MessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextDisable";
      }

      if (pageNo + 1 <= scopeObj.totalPage) {
        scopeObj.view.MessageFilter.pagination.flxNext.hoverSkin ="sknCursor";
        scopeObj.view.MessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.MessageFilter.pagination.flxNext.hoverSkin ="sknDisableCursor";
        scopeObj.view.MessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextDisable";
      }
    };

    this.view.MessageFilter.pagination.flxPrevious.onClick = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo - 1 > 0) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);

        scopeObj.currentPage = pageNo-1;
        scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey=scopeObj.currentPage;

        var params={"csrRepID":scopeObj.user_ID,
                    "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                    "requestAssignedTo": scopeObj.searchParam.requestAssignedTo!==undefined?scopeObj.searchParam.requestAssignedTo:"",
                    "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                    "messageRepliedBy": scopeObj.searchParam.messageRepliedBy!==undefined?scopeObj.searchParam.messageRepliedBy:"",
                    "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                    "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                    "requestStatusID": "["+scopeObj.currentStatus+"]",
                    "currPageIndex":scopeObj.currentPage, 
                    "sortCriteria":scopeObj.sortColoumn,
                    "recordsPerPage":scopeObj.totalRecordPerPage,
                    "sortOrder":scopeObj.sortOrder};


        scopeObj.presenter.fetchRequests(params);
      }
    };

    this.view.myQueueMessageFilter.pagination.flxNext.onClick = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNo+1;
        scopeObj.view.myQueueMessageFilter.pagination.lbxPagination.selectedKey=scopeObj.currentPage;

        var params={"csrRepID":scopeObj.user_ID,
                    "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                    "requestAssignedTo": scopeObj.user_ID,
                    "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                    "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                    "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                    "requestStatusID": scopeObj.searchParam.requestStatusID!==undefined?scopeObj.searchParam.requestStatusID:"[SID_OPEN,SID_INPROGRESS]",
                    "currPageIndex":scopeObj.currentPage, 
                    "sortCriteria":scopeObj.sortColoumn,
                    "recordsPerPage":scopeObj.totalRecordPerPage,
                    "sortOrder":scopeObj.sortOrder};


        scopeObj.presenter.fetchMyQueueRequests(params);
      }
    };

    this.view.myQueueMessageFilter.pagination.flxPrevious.onClick = function () {
      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo - 1 > 0) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNo-1;
        scopeObj.view.myQueueMessageFilter.pagination.lbxPagination.selectedKey=scopeObj.currentPage;

        var params={"csrRepID":scopeObj.user_ID,
                    "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                    "requestAssignedTo": scopeObj.user_ID,
                    "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                    "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                    "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                    "requestStatusID": scopeObj.searchParam.requestStatusID!==undefined?scopeObj.searchParam.requestStatusID:"[SID_OPEN,SID_INPROGRESS]",
                    "currPageIndex":scopeObj.currentPage, 
                    "sortCriteria":scopeObj.sortColoumn,
                    "recordsPerPage":scopeObj.totalRecordPerPage,
                    "sortOrder":scopeObj.sortOrder};


        scopeObj.presenter.fetchMyQueueRequests(params);
      }
    };

    this.view.myQueueMessageFilter.pagination.flxNext.onHover = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        scopeObj.view.myQueueMessageFilter.pagination.flxNext.hoverSkin ="sknCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.myQueueMessageFilter.pagination.flxNext.hoverSkin ="sknDisableCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextDisable";
      }

      if (pageNo - 1 > 0)  {
        scopeObj.view.myQueueMessageFilter.pagination.flxPrevious.hoverSkin ="sknCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.myQueueMessageFilter.pagination.flxPrevious.hoverSkin ="sknDisableCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextDisable";
      }
    };

    this.view.myQueueMessageFilter.pagination.flxPrevious.onHover = function () {

      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo - 1 > 0)  {
        scopeObj.view.myQueueMessageFilter.pagination.flxPrevious.hoverSkin ="sknCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.myQueueMessageFilter.pagination.flxPrevious.hoverSkin ="sknDisableCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconPrevious.skin="sknFontIconPrevNextDisable";
      }

      if (pageNo + 1 <= scopeObj.totalPage) {
        scopeObj.view.myQueueMessageFilter.pagination.flxNext.hoverSkin ="sknCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextPage";
      }else{
        scopeObj.view.myQueueMessageFilter.pagination.flxNext.hoverSkin ="sknDisableCursor";
        scopeObj.view.myQueueMessageFilter.pagination.lblIconNext.skin="sknFontIconPrevNextDisable";
      }
    };

    this.view.MessageFilter.pagination.lbxPagination.onSelection = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var pageNo = scopeObj.view.MessageFilter.pagination.lbxPagination.selectedKey;
      scopeObj.currentPage = pageNo;

      var params={"csrRepID":scopeObj.user_ID,
                  "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                  "requestAssignedTo": scopeObj.searchParam.requestAssignedTo!==undefined?scopeObj.searchParam.requestAssignedTo:"",
                  "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                  "messageRepliedBy": scopeObj.searchParam.messageRepliedBy!==undefined?scopeObj.searchParam.messageRepliedBy:"",
                  "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                  "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                  "requestStatusID": "["+scopeObj.currentStatus+"]",
                  "currPageIndex":pageNo, 
                  "sortCriteria":scopeObj.sortColoumn,
                  "recordsPerPage":scopeObj.totalRecordPerPage,
                  "sortOrder":scopeObj.sortOrder};

      //var params={"csrRepID":scopeObj.user_ID,
      //            "requestStatusID":"["+scopeObj.currentStatus+"]",
      //           "recordsPerPage":scopeObj.totalRecordPerPage,
      //           "currPageIndex":pageNo,
      //           "sortCriteria":scopeObj.sortColoumn,
      //          "sortOrder":scopeObj.sortOrder
      //         };
      scopeObj.presenter.fetchRequests(params);
    };

    this.view.myQueueMessageFilter.pagination.lbxPagination.onSelection = function () {
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      var pageNo = scopeObj.view.myQueueMessageFilter.pagination.lbxPagination.selectedKey;
      scopeObj.currentPage = pageNo;

      var params={"csrRepID":scopeObj.user_ID,
                  "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                  "requestAssignedTo": scopeObj.user_ID,
                  "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                  "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                  "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                  "requestStatusID": scopeObj.searchParam.requestStatusID!==undefined?scopeObj.searchParam.requestStatusID:"[SID_OPEN,SID_INPROGRESS]",
                  "currPageIndex":pageNo, 
                  "sortCriteria":scopeObj.sortColoumn,
                  "recordsPerPage":scopeObj.totalRecordPerPage,
                  "sortOrder":scopeObj.sortOrder};


      // var params={"csrRepID":scopeObj.user_ID,
      //            "requestAssignedTo": scopeObj.user_ID,
      //            "requestStatusID": "[SID_OPEN,SID_INPROGRESS]",
      //            "recordsPerPage":scopeObj.totalRecordPerPage,
      //           "currPageIndex":pageNo,
      //          "sortCriteria":scopeObj.sortColoumn,
      //          "sortOrder":scopeObj.sortOrder
      //         };
      scopeObj.presenter.fetchMyQueueRequests(params);
    };

    this.view.Message.lstboxMail.onSelection = function () {
      var selectedTemplateID = scopeObj.view.Message.lstboxMail.selectedKey;
      var param = {
        "templateID": selectedTemplateID
      };
      scopeObj.view.Message.flxErrorMessage.isVisible = false;
      if(selectedTemplateID!=="Select Template"){
        scopeObj.presenter.fetchTemplateByID(param);
      }
    };

    this.view.Message.flxAttatchment.onClick = function () {
      scopeObj.hideMessageToSearchBox();
      scopeObj.uploadDocuments(1);
    };

    this.view.Message.flxDelete.onClick = function () {

      if(scopeObj.view.Message.lblSaving.text === kony.i18n.getLocalizedString("i18n.frmCSRController.Saved") || scopeObj.showingDraft)
      {
        var param = {
          "requestid": scopeObj.selectedRequestId,
          "requestmessage_id": scopeObj.requestmessage_id === undefined ? "" : scopeObj.requestmessage_id,
          "isNewRequest": false,
          "isDiscardRequest": true,
          "messagestatus": kony.i18n.getLocalizedString("i18n.frmCSRController.DISCARD")
        };

        // scopeObj.discardEmailMessages();
        scopeObj.presenter.discardMessage(param);
      }else{
        var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
        messageDocument.getElementById("editor").innerHTML = "";
        messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
        scopeObj.discardEmailMessages();

      }
      if(!scopeObj.showingDraft && scopeObj.view.Message.lblSaving.text === "")
        scopeObj.deleteAllAttachments();
      scopeObj.showingDraft=false;
    };

    this.view.Message.flxClose1.onClick = function () {
      // scopeObj.view.Message.flxAttatchment1.isVisible = false;
      scopeObj.discardAttachmentID(scopeObj.view.Message.lblAttatchmnet1.text);
      scopeObj.removeAttachment(scopeObj.view.Message.lblAttatchmnet1.text);
      scopeObj.hideAllAttachment();
      scopeObj.showUploadedDocument();

      //scopeObj.attchmentFiles.splice(0, 1);
      // scopeObj.checkUploadedFiles();
    };

    this.view.Message.flxClose2.onClick = function () {
      scopeObj.discardAttachmentID(scopeObj.view.Message.lblAttatchmnet2.text);
      scopeObj.removeAttachment(scopeObj.view.Message.lblAttatchmnet2.text);
      scopeObj.hideAllAttachment();
      scopeObj.showUploadedDocument();

      // scopeObj.checkUploadedFiles();
    };

    this.view.Message.flxClose3.onClick = function () {
      scopeObj.discardAttachmentID(scopeObj.view.Message.lblAttatchmnet3.text);
      scopeObj.removeAttachment(scopeObj.view.Message.lblAttatchmnet3.text);
      scopeObj.hideAllAttachment();
      scopeObj.showUploadedDocument();

    };
    this.view.Message.flxClose4.onClick = function () {
      scopeObj.discardAttachmentID(scopeObj.view.Message.lblAttatchmnet4.text);
      scopeObj.removeAttachment(scopeObj.view.Message.lblAttatchmnet4.text);
      scopeObj.hideAllAttachment();
      scopeObj.showUploadedDocument();

    };

    this.view.Message.flxClose5.onClick = function () {
      scopeObj.discardAttachmentID(scopeObj.view.Message.lblAttatchmnet5.text);
      scopeObj.removeAttachment(scopeObj.view.Message.lblAttatchmnet5.text);
      scopeObj.hideAllAttachment();
      scopeObj.showUploadedDocument();

    };

    this.view.MessageFilter.flxColumn4.onClick = function () {
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible = false;
    };
    this.view.MessageFilter.flxColumn3.onClick = function () {
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible = false;
    };
    this.view.MessageFilter.FlexResult.onClick = function () {
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible = false;
    };


    this.view.flxScrollMainContent.onClick = function () {
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
      scopeObj.view.MessageFilter.FlexContextMenu.isVisible = false;
    };

    this.view.MessageFilter.ListBoxCategory.onSelection = function () {
      scopeObj.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      scopeObj.view.MessageFilter.flxAssignDropdown.isVisible = false;
    };
    this.view.MessageFilter.flxCheckbox.onTouchEnd = function() {
      scopeObj.selectAllRows();
    };
    this.view.myQueueMessageFilter.flxCheckbox.onTouchEnd = function() {
      scopeObj.selectAllRows();
    };
    this.view.MessageFilter.flxAssignTo.onClick = function(){
      scopeObj.view.txtbxAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me");
      scopeObj.view.flxAssignPopup.isVisible = true;
      scopeObj.multiAssign=true;
    };
    this.view.myQueueMessageFilter.flxAssignTo.onClick = function(){
      scopeObj.view.txtbxAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Assign_to_me");
      scopeObj.view.flxAssignPopup.isVisible = true;
      scopeObj.multiAssign=true;
    };
    this.view.Message.flxCheckboxMsg.onTouchEnd= function() {
      if (scopeObj.view.Message.imgCheckBoxMsg.src === "checkboxnormal.png"){
        scopeObj.view.Message.imgCheckBoxMsg.src = "checkboxselected.png";
        scopeObj.view.Message.imgMsgIconPriority.isVisible = true;
        scopeObj.view.Message.lblHighPriority.isVisible = true;
        this.forceLayout();
      }
      else{
        scopeObj.view.Message.imgCheckBoxMsg.src = "checkboxnormal.png";
        scopeObj.view.Message.imgMsgIconPriority.isVisible = false;
        scopeObj.view.Message.lblHighPriority.isVisible = false;
      }
    };
  },
  
  /*
   * Transforms the specified input string into something whitout potential malicious executable code at runtime (on loading a page or a text widget when loading a page)
   */
  getXSSSanitizedString: function(strInput) {
    if (strInput !== null && strInput !== undefined) {
      var strSanitized = strInput.slice();// create a new string whitout modifying the initial string
      // encode the characters which permit creation of html tags inside the sensitive fields accepting free user inputs
      strSanitized = strSanitized			.replaceAll(">", "&gt;")
                                 .replaceAll("<", "&lt;")
                                 .replaceAll("\"", "&quot;")
                                 .replaceAll("\'", "&#x27;")
                                 .replaceAll("\/", "&#x2F;")
                                 .replaceAll("=", "&eq;").replaceAll("^", "&#94;").replaceAll("*", "&#42;");
      return strSanitized;
    } else {
      return null;
    }
  },
  /*
   * Re-Transforms the response of getMessageTemplate to the redable format at runtime
   */
  setSantizedStringToText:function(string,opt)
  {
     if (string !== null && string !== undefined) {
      var stringText ;
      stringText = string.replaceAll("&amp;","&");
       stringText= stringText.replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&quot;","\"").replaceAll("&amp;", "&")
       .replaceAll("&#42;","*").replaceAll("&#x2F;","\/").replaceAll("&#x27;","\'").replaceAll( "&#94;","^").replaceAll("&eq;","=");
       //to replace html keyword that cannot be added through editor and causes security issues
       if(opt === 1){
         var regex = /<\/?[^(a|i|u|b|br|div|span|ul|li|table|tbody|tr|th|td|font|blockquote|h1|h2|h3|h4|p|img|/)]>*/g;
         stringText = stringText.replaceAll("alert(","(").replaceAll("iframe"," ").replaceAll("prompt(","(")
           .replaceAll("onload=","").replaceAll("confirm(","(").replaceAll(regex,"< ");
       }
        return stringText;
    } else {
      return null;
    }
  },

  addTag: function (userName, userId, email, name, userType) {
    var self = this;
    var id = userId.split("_").join("-");
    //check if already exist 
    if (self.view.Message.flxUserGroup[id + "flxUser1"] === undefined) {
      var newTextTag = this.view.Message.flxUser1.clone(id);
      if(userType === kony.i18n.getLocalizedString("i18n.frmGroupsController.Username")){ //for customers
        this.selectedUsers = (this.selectedUsers === "" ? "" : this.selectedUsers + ",") + userName;
      }else{  //for service,service types
        this.selectedUsers = (this.selectedUsers === "" ? "" : this.selectedUsers + ",") + userId;
      }  
      var lblname = id + "lblUserName1";
      var imgname = id + "imgCross1";
      var screenWidth = kony.os.deviceInfo().screenWidth;
      var emailScreenSize = ((screenWidth / 100) * 44.5);
      this.NoOfEmail = parseInt(emailScreenSize / 140);
      newTextTag.info = {"id":userId};
      newTextTag[lblname].text = this.trimData(name, 12);
      newTextTag.isVisible = true;
      newTextTag[lblname].toolTip = name + (email === "" ? "<GROUP>" : "<" + userName + ">");
      newTextTag[imgname].onTouchStart = function () {
        var tagContentId ="";
        if(userType === kony.i18n.getLocalizedString("i18n.frmGroupsController.Username"))
          tagContentId = userName;
        else
          tagContentId = userId;
        self.removeTag(newTextTag.id, tagContentId);
      };

      if (this.emailCount >= this.NoOfEmail) {
        this.emailCount = 1;
        this.emailRowCount++;
        newTextTag.left=("0px");
        newTextTag.top=(((this.emailRowCount*40)+10)+"px");
        this.view.Message.txtTo.left="140px";
        this.view.Message.flxFilter.left="140px";
        this.view.Message.txtTo.top=((this.emailRowCount*40)+"px");

      }else{
        if(this.emailCount===0){
          newTextTag.left="0px";
          this.view.Message.txtTo.left="140px";
          this.view.Message.flxFilter.left="140px";
        }else{
          newTextTag.left=((this.emailCount)*100)+(this.emailCount*10)+"px";
          this.view.Message.txtTo.left=140+((this.emailCount)*100)+(this.emailCount*10)+"px";
          if(this.emailCount!==(this.NoOfEmail-1))
            this.view.Message.flxFilter.left=140+((this.emailCount)*100)+(this.emailCount*10)+"px";
          else
            this.view.Message.flxFilter.right="0px";
        }
        newTextTag.top = (((this.emailRowCount * 40) + 10) + "px");
        this.view.Message.txtTo.top = ((this.emailRowCount * 40) + "px");
        this.emailCount++;

      }

      if (this.emailRowCount === 1) {
        this.view.Message.flxTo.height = "80px";
        // document.getElementById("iframe_rtxMessage").contentWindow.document.getElementById("editor").style.marginTop="40px";
        this.view.Message.flxContent.top = "202px";
      }
      self.view.Message.flxUserGroup.addAt(newTextTag, self.view.Message.flxUserGroup.children.length);

      this.view.Message.flxUserGroup.width = "100%";
      this.view.Message.flxUserGroup.isVisible = true;
      this.view.Message.flxFilter.isVisible = false;
      this.view.Message.flxUser1.isVisible = false;
      this.view.Message.txtTo.setFocus(true);
      this.view.Message.txtTo.text = "";

      this.view.Message.flxFilter.zIndex = 200;

      this.view.forceLayout();
    }
  },
  removeTag: function (flexName, tagContentId) {
    //var selectedOptions = flexName.slice(0,-8);
    this.flxArray = [];
    var self = this;

    this.view.Message.flxUserGroup.remove(self.view.Message[flexName]);

    var childArray = self.view.Message.flxUserGroup.children;

    for (var j = 0; j < childArray.length; j++) {
      this.flxArray.push(self.view.Message[childArray[j]]);
    }
    this.emailCount = 0;
    this.emailRowCount = 0;
    this.view.Message.flxUserGroup.removeAll();
    this.view.Message.flxTo.height = "40px";
    // document.getElementById("iframe_rtxMessage").contentWindow.document.getElementById("editor").style.marginTop="0px";
    this.view.Message.flxContent.top = "162px";
    if (this.flxArray.length === 0) {
      this.view.Message.txtTo.left = "40px";
      this.view.Message.flxFilter.left = "40px";
    } else {
      for (var k = 0; k < this.flxArray.length; k++) {
        var newTextTag = this.flxArray[k];

        if (this.emailCount >= this.NoOfEmail) {
          this.emailCount = 1;
          this.emailRowCount++;
          newTextTag.left = ("0px");
          newTextTag.top = (((this.emailRowCount * 40) + 10) + "px");
          this.view.Message.txtTo.left = "140px";
          this.view.Message.flxFilter.left = "140px";
          this.view.Message.txtTo.top = ((this.emailRowCount * 40) + "px");

        } else {
          if (this.emailCount === 0) {
            newTextTag.left = "0px";
            this.view.Message.txtTo.left = "140px";
            this.view.Message.flxFilter.left = "140px";
          } else {
            newTextTag.left = ((this.emailCount) * 100) + (this.emailCount * 10) + "px";
            this.view.Message.txtTo.left = 140 + ((this.emailCount) * 100) + (this.emailCount * 10) + "px";
            //this.view.Message.flxFilter.left=140+((this.emailCount)*100)+(this.emailCount*10)+"px";
            if(this.emailCount!==(this.NoOfEmail-1))
              this.view.Message.flxFilter.left=140+((this.emailCount)*100)+(this.emailCount*10)+"px";
            else
              this.view.Message.flxFilter.right="0px";
          }
          newTextTag.top = (((this.emailRowCount * 40) + 10) + "px");
          this.view.Message.txtTo.top = ((this.emailRowCount * 40) + "px");
          this.emailCount++;
          if (this.emailRowCount === 1)
            this.view.Message.flxTo.height = "80px";
        }

        if (this.emailRowCount === 1) {
          this.view.Message.flxTo.height = "80px";
          // document.getElementById("iframe_rtxMessage").contentWindow.document.getElementById("editor").style.marginTop="40px";
          this.view.Message.flxContent.top = "202px";
        }
        self.view.Message.flxUserGroup.addAt(newTextTag, self.view.Message.flxUserGroup.children.length);

      }
    }

    var selectedUsers = this.selectedUsers.split(",");
    // Removing user from selected users
    for (var i = 0; i < selectedUsers.length; i++) {
      if (selectedUsers[i] === tagContentId) {
        selectedUsers.splice(i, 1);
        break;
      }
    }
    this.selectedUsers = selectedUsers + "";
    this.view.forceLayout();
  },
  onHoverEventCallback: function(widget, context) {
    let segData;
    let selectedIndex;
    if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.MessageFilter.flxAssignDropdown.isVisible = false;
      this.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
      this.view.flxAssignDropdown.isVisible = false;
      this.view.listingSegmentClient.flxContextualMenu.isVisible = false;
      if (widget.kmasterid === "myQueueMessageFilter" || widget.kmasterid === "MessageFilter") {
        var path = (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) ? this.view.myQueueMessageFilter : this.view.MessageFilter;
        segData = path.SegSearchResult.data;
        selectedIndex = path.SegSearchResult.selectedRowIndex[1];
        segData[selectedIndex].flxOptions.skin = "slFbox";
        path.SegSearchResult.setDataAt(segData[selectedIndex], selectedIndex);
        path.FlexContextMenu.setVisibility(false);
      }else if (widget.kmasterid === "listingSegmentClient") {
        segData = this.view.listingSegmentClient.segListing.data;
        selectedIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
        segData[selectedIndex].flxOptions.skin = "slFbox";
        this.view.listingSegmentClient.segListing.setDataAt(segData[selectedIndex], selectedIndex);
      }
    }
  },
  onHoverEventCallback2 : function(widget, context) {

    if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.Message.txtTo.text="";
      this.view.Message.flxFilter.setVisibility(false);

    }

  },
  hideMessageToSearchBox : function() {
    this.view.Message.flxFilter.setVisibility(false);
    if(this.view.Message.txtTo.disabled === false){
      this.view.Message.txtTo.text="";
    }
  },
  removeAllTag: function () {
    this.view.Message.flxUserGroup.removeAll();

    this.view.Message.txtTo.left = "40px";
    this.view.Message.txtTo.top = "0px";
    this.view.Message.flxFilter.left = "40px";
    this.emailCount = 0;
    this.emailRowCount = 0;
    this.NoOfEmail = 0;
    this.selectedUsers = "";
    this.view.forceLayout();
  },
  checkUploadedFiles: function () {
    if (this.attchmentFiles.length === 0 || (this.attchmentFiles[0] === "" && (this.attchmentFiles[1] === undefined || this.attchmentFiles[1] === "") && (this.attchmentFiles[2] === undefined || this.attchmentFiles[2] === "") && (this.attchmentFiles[3] === undefined || this.attchmentFiles[3] === "") && (this.attchmentFiles[4] === undefined || this.attchmentFiles[4] === ""))) {
      // Reset data filed
      this.hideAllAttachment();
    }
  },

  hideAllAttachment: function(){
    this.view.Message.flxAttatchments.isVisible = false;
    this.view.Message.flxAttatchment1.isVisible = false;
    this.view.Message.flxAttatchment2.isVisible = false;
    this.view.Message.flxAttatchment3.isVisible = false;
    this.view.Message.flxAttatchment4.isVisible = false;
    this.view.Message.flxAttatchment5.isVisible = false;
    this.view.Message.rtxMessage.height = "100%";
    this.view.forceLayout();
  },
  fetchEmailMsg: function () {

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) {
      var qSelectedId = this.view.myQueueMessageFilter.SegSearchResult.selectedRowIndex[1];
      var qRowData = this.view.myQueueMessageFilter.SegSearchResult.data[qSelectedId];
      var requestId1 = qRowData.lblRequestID.text;
      var subject1 = qRowData.lblSubject.text;
      var isPriorityMessage = qRowData.imgMsgIcon.isVisible;
      var requestIdParam1 = {
        "requestID": requestId1
      };
      var lblStatus1 = qRowData.lblStatus;
      this.selectedRequestId = requestId1;
      if(this.view.myQueueMessageFilter.SegSearchResult.selectedRowIndex !==null)
        this.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + qRowData.lblAssignto.tooltip;
      this.presenter.fetchEmailMessages(requestIdParam1, lblStatus1, requestId1, subject1,isPriorityMessage);
    } else {
      var selectedId = this.view.MessageFilter.SegSearchResult.selectedRowIndex[1];
      var rowData = this.view.MessageFilter.SegSearchResult.data[selectedId];
      var requestId = rowData.lblRequestID.text;
      var subject = rowData.lblSubject.text;
      var isPriorityMessage1 = rowData.imgMsgIcon.isVisible;
      var requestIdParam = {
        "requestID": requestId
      };
      var lblStatus = rowData.lblStatus;
      this.selectedRequestId = requestId;
      if(this.view.MessageFilter.SegSearchResult.selectedRowIndex !==null)
        this.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + rowData.lblAssignto.tooltip;
      this.presenter.fetchEmailMessages(requestIdParam, lblStatus, requestId, subject,isPriorityMessage1);
    }
  },
  sendDraftMsg: function () {
    var messageText = document.getElementById("iframe_rtxMessage").contentWindow.document.getElementById("editor").innerHTML;
    messageText = this.getXSSSanitizedString(messageText);
    messageText = window.btoa(encodeURI(messageText));
    kony.print("messageText (after encoding): " + messageText);
    if ((messageText !== "" && messageText !== this.oldMessageText) || this.attachmentDraft ) {
      this.attachmentDraft=false;
      this.oldMessageText = messageText;
      var category = this.view.Message.lstbocCategory.selectedKey;
      var subject = this.view.Message.txtSubject.text;
      var to = this.view.Message.txtTo.text;

      var param = {
        "requestid": this.selectedRequestId === undefined ? "" : this.selectedRequestId,
        "customer_id": "", 
        "username": this.selectedUsers+"",
        "messageid": this.requestmessage_id === undefined ? "" : this.requestmessage_id, 
        "accountid": "1",
        "priority": kony.i18n.getLocalizedString("i18n.frmCSRController.High"),
        "requestsubject": this.getXSSSanitizedString(subject),
        "requeststatus":"SID_INPROGRESS",
        //  "modifiedby":this.user_ID,//CSR ID
        "requestcategory_id": category,
        "messagedescription": messageText,
        "mediaIds": this.getMediaIdList(),
        "discardedMediaIds":this.discardAttchments,
        "messagestatus": kony.i18n.getLocalizedString("i18n.frmCSRController.DRAFT"),
        "isAdminRequest": true,
        "recipientList": "[" + this.selectedUsers + "]",
        "user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID
      };
      this.view.Message.lblSaving.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Saving");
      this.view.forceLayout();
      this.presenter.draftMessage(param);
    }
  },
  showToastMessage: function () {
    this.view.toastMessage.flxToastContainer.skin = "sknflxSuccessToast1F844D";
    // this.view.toastMessage.imgLeft.src = "arrow2x.png";
    this.view.flxToastMessage.setVisibility(true);
    var self = this;
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100: {
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        kony.timer.schedule("toastMessageTimer", self.hideToastMessage, 2, false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  sendDraftMessage: function () {

    var self = this;
    kony.timer.schedule("sendDraftMessage", self.sendDraftMsg, 10, true);

  },
  resetDataFields: function () {
    this.hideMessageToSearchBox();
    this.sortColoumn = "";
    this.sortOrder = "";
    this.context = "";
    this.currentPage=1;
    this.lastAppend=0;
    this.view.txtfldAddressLine1.text="";
    this.view.txtAreaData.text = "";
    this.view.datePicker.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.datePicker1.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    // this.view.richTextData.text="";
    // this.view.flxNewMessage.setVisibility(false);
    this.view.MessageFilter.tbxSearchBox.text="";
    if(!this.dashBoardReq){
      this.view.MessageFilter.ListBoxCategory.selectedKey=this.view.MessageFilter.ListBoxCategory.masterData[0][0]; 
      this.view.myQueueMessageFilter.ListBoxStatus.selectedKey=this.view.myQueueMessageFilter.ListBoxStatus.masterData[0][0];
      this.searchParam={};
    }
    this.dashBoardReq=false;//Reseting this flag to false
    this.view.listingSegmentClient.flxContextualMenu.isVisible = false;
    this.view.MessageFilter.flxRepliedByTxtcont.skin = "sknflxffffffope1e5edcsr";
    this.view.MessageFilter.flxAssignedToTxtcont.skin = "sknflxffffffope1e5edcsr";

    this.view.MessageFilter.txtfldAssignTo.text = "";
    this.view.MessageFilter.txtfldRepliedby.text = "";
    this.view.MessageFilter.lblSelectedRows.text = "";
    this.view.MessageFilter.flxClearAssignTo.setVisibility(false);
    this.view.MessageFilter.flxClearRepliedBy.setVisibility(false);
    // this.view.MessageFilter.lblCol1.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.MessageFilter.lblSelectedRows.text=kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.MessageFilter.FlexContextMenu.isVisible=false;
    this.view.MessageFilter.flxRepliedOnDropdown.isVisible=false;
    this.view.MessageFilter.flxAssignDropdown.isVisible=false;
    this.view.MessageFilter.flxClearSearchImage.setVisibility(false);
    this.view.MessageFilter.imgCheckBox.src="checkbox.png";
    this.selectedRequestIds=[];
    this.view.flxCloseCal1.isVisible=false;
    // this.view.mainHeader.lblHeading.text="";
    this.view.MessageFilter.flxAssignTo.setVisibility(false);
    this.view.myQueueMessageFilter.flxAssignTo.setVisibility(false);
    this.view.myQueueMessageFilter.imgCheckBox.src="checkbox.png";
    this.view.myQueueMessageFilter.tbxSearchBox.text="";
    this.view.myQueueMessageFilter.ListBoxCategory.selectedKey=this.view.myQueueMessageFilter.ListBoxCategory.masterData[0][0];

    this.view.myQueueMessageFilter.txtfldAssignTo.text="";
    this.view.myQueueMessageFilter.txtfldRepliedby.text="";
    this.view.myQueueMessageFilter.lblSelectedRows.text="";
    this.view.myQueueMessageFilter.flxDropDownDetail1.isVisible=false;
    this.view.myQueueMessageFilter.FlexContextMenu.isVisible=false;
    this.view.MessageFilter.flxDropDownDetail1.isVisible=false;
    if(this.view.flxNewMessage.isVisible===false && this.view.flxNewMessageHeader.isVisible===false){
      this.attchmentFiles = []; 
      this.draftAttchmentFiles=[];
      this.discardAttchments=[];
      this.removeAllTag();
    }
    this.view.flxLoading.zIndex = 90;
    this.view.forceLayout(); 
    this.resetSortIcons();
  },

  resetSortIcons: function () {

    // Reseting sorting icons 
    this.view.MessageFilter.lblIconAssignedTo.text=(this.sortColoumn==="customerrequest_AssignedTo_Name"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.MessageFilter.lblIconAssignedTo.left=(this.sortColoumn==="customerrequest_AssignedTo_Name"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.MessageFilter.lblIconAssignedTo.skin=(this.sortColoumn==="customerrequest_AssignedTo_Name"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    // this.view.MessageFilter.lblIconAssignedTo.skin="sknFontIconSortTwoArrows";
    this.view.MessageFilter.lblIconDate.text=(this.sortColoumn==="customerrequest_createdts"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.MessageFilter.lblIconDate.left=(this.sortColoumn==="customerrequest_createdts"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.MessageFilter.lblIconDate.skin=(this.sortColoumn==="customerrequest_createdts"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    //this.view.MessageFilter.lblIconDate.skin="sknFontIconSortTwoArrows";
    this.view.MessageFilter.lblIconCategory.text=(this.sortColoumn==="customerrequest_RequestCategory_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.MessageFilter.lblIconCategory.left=(this.sortColoumn==="customerrequest_RequestCategory_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.MessageFilter.lblIconCategory.skin=(this.sortColoumn==="customerrequest_RequestCategory_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    // this.view.MessageFilter.lblIconCategory.skin="sknFontIconSortTwoArrows";
    this.view.MessageFilter.lblIconRequestIdSortName.text=(this.sortColoumn==="customerrequest_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.MessageFilter.lblIconRequestIdSortName.left=(this.sortColoumn==="customerrequest_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.MessageFilter.lblIconRequestIdSortName.skin=(this.sortColoumn==="customerrequest_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    // this.view.MessageFilter.lblIconRequestIdSortName.skin="sknFontIconSortTwoArrows";
    this.view.MessageFilter.lblIconCustSortUsername.text=(this.sortColoumn==="customer_Fullname"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.MessageFilter.lblIconCustSortUsername.left=(this.sortColoumn==="customer_Fullname"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.MessageFilter.lblIconCustSortUsername.skin=(this.sortColoumn==="customer_Fullname"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    this.view.MessageFilter.lblIconCustSortId.text=(this.sortColoumn==="customerrequest_Customer_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.MessageFilter.lblIconCustSortId.left=(this.sortColoumn==="customerrequest_Customer_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.MessageFilter.lblIconCustSortId.skin=(this.sortColoumn==="customerrequest_Customer_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    //this.view.MessageFilter.lblIconCustSortUsername.skin="sknFontIconSortTwoArrows";

    this.view.myQueueMessageFilter.lblIconAssignedTo.text=(this.sortColoumn==="customerrequest_Status_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.myQueueMessageFilter.lblIconAssignedTo.left=(this.sortColoumn==="customerrequest_Status_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.myQueueMessageFilter.lblIconAssignedTo.skin=(this.sortColoumn==="customerrequest_Status_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    this.view.myQueueMessageFilter.lblIconDate.text=(this.sortColoumn==="customerrequest_createdts"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.myQueueMessageFilter.lblIconDate.left=(this.sortColoumn==="customerrequest_createdts"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.myQueueMessageFilter.lblIconDate.skin=(this.sortColoumn==="customerrequest_createdts"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    this.view.myQueueMessageFilter.lblIconCustSortUsername.text=(this.sortColoumn==="customer_Fullname"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.myQueueMessageFilter.lblIconCustSortUsername.left=(this.sortColoumn==="customer_Fullname"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.myQueueMessageFilter.lblIconCustSortUsername.skin=(this.sortColoumn==="customer_Fullname"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    this.view.myQueueMessageFilter.lblIconRequestIdSortName.text=(this.sortColoumn==="customerrequest_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.myQueueMessageFilter.lblIconRequestIdSortName.left=(this.sortColoumn==="customerrequest_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.myQueueMessageFilter.lblIconRequestIdSortName.skin=(this.sortColoumn==="customerrequest_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    this.view.myQueueMessageFilter.lblIconCategory.text=(this.sortColoumn==="customerrequest_RequestCategory_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.myQueueMessageFilter.lblIconCategory.left=(this.sortColoumn==="customerrequest_RequestCategory_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.myQueueMessageFilter.lblIconCategory.skin=(this.sortColoumn==="customerrequest_RequestCategory_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

    this.view.myQueueMessageFilter.lblIconCustSortId.text=(this.sortColoumn==="customerrequest_Customer_id"?(this.sortOrder === "asc"?"\ue920":"\ue92a"):"\ue92b");
    this.view.myQueueMessageFilter.lblIconCustSortId.left=(this.sortColoumn==="customerrequest_Customer_id"?(this.sortOrder === "asc"?"10px":"10px"):"5px");
    this.view.myQueueMessageFilter.lblIconCustSortId.skin=(this.sortColoumn==="customerrequest_Customer_id"?(this.sortOrder === "asc"?"sknIcon12pxBlack":"sknIcon12pxBlack"):"sknIcon15px");

  },
  getSortedRequest:function(isMyQueue){
    this.isSorting = true;
    this.resetSortIcons();  
    this.currentPage=1;
    if(isMyQueue===false){

      this.sortOrder= (this.sortOrder !== "asc"?"asc":"desc");

      var param={};
      if(this.searchParam.csrRepID!==undefined){
        param = this.searchParam;
        param.sortCriteria = this.sortColoumn;
        param.sortOrder=this.sortOrder;
      }else{
        param={"csrRepID":this.user_ID,
               "requestStatusID": "["+ this.currentStatus +"]",
               "recordsPerPage":this.totalRecordPerPage,
               "currPageIndex":this.currentPage, 
               "sortCriteria":this.sortColoumn,
               "sortOrder":this.sortOrder};
      }
      this.presenter.fetchRequests(param);
    }else{

      this.sortOrder= (this.sortOrder !== "asc"?"asc":"desc");
      var params1={};
      if(this.searchParam.csrRepID!==undefined){
        params1 = this.searchParam;
        params1.sortCriteria = this.sortColoumn;
        params1.sortOrder=this.sortOrder;
      }else{
        params1= {"csrRepID":this.user_ID,
                  "requestAssignedTo": this.user_ID,
                  "requestStatusID": "[SID_OPEN,SID_INPROGRESS]",
                  "recordsPerPage":this.totalRecordPerPage,
                  "currPageIndex":this.currentPage, 
                  "sortCriteria":this.sortColoumn,
                  "sortOrder":this.sortOrder};
      }
      this.presenter.fetchMyQueueRequests(params1);
    }
  },
  hideToastMessage: function () {
    var self = this;
    var animationDefinition = {
      0: {
        "bottom": "0px"
      },
      100: {
        "bottom": "-70px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        self.view.flxToastMessage.setVisibility(false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    this.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  toggleContextualMenu: function (Segment, template) {

    var QueueSegment = this.view.myQueueMessageFilter.SegSearchResult;
    var otherSegment = this.view.MessageFilter.SegSearchResult;
    var templateSegment = this.view.listingSegmentClient.segListing;
    let segData = Segment.data;
    var index;
    var currentContexualMenu;
    var finalHeight;
    var adjustHeight;
    if (Segment == templateSegment) {
      currentContexualMenu = this.view.listingSegmentClient.flxContextualMenu;
      finalHeight = 45;
      index=Segment.selectedIndex;
      //currentContexualMenu.left = "600px";
    } else {
      var path;
      if (Segment == QueueSegment) {
        currentContexualMenu = this.view.myQueueMessageFilter.FlexContextMenu;
        path=this.view.myQueueMessageFilter;
      } else if (Segment == otherSegment) {
        currentContexualMenu = this.view.MessageFilter.FlexContextMenu;
        path=this.view.MessageFilter;
      }
      finalHeight = 295;
      adjustHeight = 480;
      index=Segment.selectedRowIndex;
      path.flxAssignTo.setVisibility(false);
      path.imgCheckBox.src = "checkbox.png";
      path.SegSearchResult.selectedIndices = null;
      path.lblRowHeader1.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TOTAL_MESSAGES") + " " + this.totalMessages;
      this.selectedRequestIds=[];
      // currentContexualMenu.left = "668px";
    }
    this.sectionIndex = index[0];
    var rowIndex = index[1];
    let selectedIndex = Segment.selectedRowIndex[1];

    if (currentContexualMenu.isVisible === false) {
      currentContexualMenu.setVisibility(true);
      segData[selectedIndex].flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
      Segment.setDataAt(segData[selectedIndex],selectedIndex);
      this.prevIndex = selectedIndex;
    } else {
      currentContexualMenu.setVisibility(false);
      segData[this.prevIndex].flxOptions.skin = "slFbox";
      Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
    }
    this.view.forceLayout();
    var templateArray = Segment.clonedTemplates;
    //to calculate top from preferred row heights
    for (var i = 0; i < rowIndex; i++) {
      finalHeight = finalHeight + templateArray[i][template].frame.height;
      adjustHeight = adjustHeight + templateArray[i][template].frame.height;
    }
    var flexLeft = Segment.clonedTemplates[rowIndex].flxOptions.frame.x;
    //currentContexualMenu.left = ((flexLeft + 25) - 200) + "px";
    //finalHeight = this.mouseYCoordinate-168;
    if(Segment == templateSegment) {
      currentContexualMenu.right = 38 + "px";
      finalHeight = finalHeight - this.view.listingSegmentClient.segListing.contentOffsetMeasured.y - 6;
      if (finalHeight + currentContexualMenu.frame.height > this.view.listingSegmentClient.segListing.frame.height) {
        finalHeight = finalHeight - currentContexualMenu.frame.height - 28;
        this.view.listingSegmentClient.contextualMenu.flxUpArrowImage.isVisible = false;
        this.view.listingSegmentClient.contextualMenu.flxDownArrowImage.isVisible = true;
      }
      else {
        this.view.listingSegmentClient.contextualMenu.flxUpArrowImage.isVisible = true;
        this.view.listingSegmentClient.contextualMenu.flxDownArrowImage.isVisible = false;
      }
    }
    else {
      currentContexualMenu.right = 11 + "px";
      adjustHeight = adjustHeight - this.view.flxScrollMainContent.contentOffsetMeasured.y;
      if (Segment == otherSegment) {
        finalHeight = finalHeight - this.view.MessageFilter.flxSegSearchResult.contentOffsetMeasured.y;
        //(finalHeight + currentContexualMenu.frame.height > this.view.MessageFilter.flxSegSearchResult.frame.height + 270)
        if (adjustHeight + currentContexualMenu.frame.height > window.innerHeight) {
          finalHeight = finalHeight - currentContexualMenu.frame.height - 22;
          this.view.MessageFilter.contextualMenu.flxUpArrowImage.isVisible = false;
          this.view.MessageFilter.contextualMenu.flxDownArrowImage.isVisible = true;
        }
        else {
          this.view.MessageFilter.contextualMenu.flxUpArrowImage.isVisible = true;
          this.view.MessageFilter.contextualMenu.flxDownArrowImage.isVisible = false;
        }
      } else if (Segment == QueueSegment) {
        finalHeight = finalHeight - this.view.myQueueMessageFilter.flxSegSearchResult.contentOffsetMeasured.y;
        //(finalHeight + currentContexualMenu.frame.height > this.view.myQueueMessageFilter.flxSegSearchResult.frame.height + 270)
        if(adjustHeight + currentContexualMenu.frame.height > window.innerHeight) {
          finalHeight = finalHeight - currentContexualMenu.frame.height - 22;
          this.view.myQueueMessageFilter.contextualMenu.flxUpArrowImage.isVisible = false;
          this.view.myQueueMessageFilter.contextualMenu.flxDownArrowImage.isVisible = true;
        }
        else {
          this.view.myQueueMessageFilter.contextualMenu.flxUpArrowImage.isVisible = true;
          this.view.myQueueMessageFilter.contextualMenu.flxDownArrowImage.isVisible = false;
        }
      } 
    }
    currentContexualMenu.top = finalHeight + "px";
    currentContexualMenu.onHover = this.onHoverEventCallback;
  },
  saveScreenY:function(widget,context){
    this.mouseYCoordinate=context.screenY;
  },
  setMessageSegmentData: function (messages) {
    var self = this;
    var dataMap = {
      "lblName": "lblName",
      "lblDate": "lblDate",
      "btnDraft": "btnDraft",
      "rtxDescription": "rtxDescription",
      "lblSeperator": "lblSeperator",
      "lblSeperator1": "lblSeperator1",
      "flxMain": "flxMain",
      "flxAttatchment": "flxAttatchment",
      "imgAttatch": "imgAttatch",
      "lblAttach": "lblAttach",
      "flxHeading": "flxHeading",
      "btnMail": "btnMail",
      "flxAttachment": "flxAttachment",
      "flxAttachments": "flxAttachments",
      "flxAttatchments": "flxAttatchments",
      "flxAttatcmentImage": "flxAttatcmentImage",
      "flxEmailMain": "flxEmailMain",
      "flxMailAdr": "flxMailAdr",
      "flxMessage": "flxMessage",
      "imgDownload": "imgDownload",
      "lblAttatchmentName": "lblAttatchmentName",
      "lblAttatchments": "lblAttatchments",
      "lblAttatchmentSize": "lblAttatchmentSize",
      "lblSeperator2": "lblSeperator2",
      "rtxMail": "rtxMail",
      "lblEmailName": "lblEmailName",
      "lblEmailDate": "lblEmailDate",
      "btnDraftMain": "btnDraftMain",
      "lblIconDownload": "lblIconDownload",
      "lblIconDownload2": "lblIconDownload2",
      "lblIconDownload3": "lblIconDownload3",
      "lblIconDownload4": "lblIconDownload4",
      "lblIconDownload5": "lblIconDownload5",
      "flxFlagSeperator": "flxFlagSeperator",
      "flxFlagSeperator2": "flxFlagSeperator2",
      "flxFlagSeperator3": "flxFlagSeperator3",
      "flxFlagSeperator4": "flxFlagSeperator4",
      "flxFlagSeperator5": "flxFlagSeperator5",
      // added for extra attahments
      "flxAttachmnetWrapper": "flxAttachmnetWrapper",
      "flxAttachment2": "flxAttachment2",
      "flxAttatcmentImage2": "flxAttatcmentImage2",
      "imgDownload2": "imgDownload2",
      "flxAttachments2": "flxAttachments2",
      "lblAttatchmentName2": "lblAttatchmentName2",
      "lblAttatchmentSize2": "lblAttatchmentSize2",
      "flxAttachment3": "flxAttachment3",
      "flxAttatcmentImage3": "flxAttatcmentImage3",
      "imgDownload3": "imgDownload3",
      "flxAttachments3": "flxAttachments3",
      "lblAttatchmentName3": "lblAttatchmentName3",
      "lblAttatchmentSize3": "lblAttatchmentSize3",
      "flxAttachment4": "flxAttachment4",
      "flxAttatcmentImage4": "flxAttatcmentImage4",
      "imgDownload4": "imgDownload4",
      "flxAttachments4": "flxAttachments4",
      "lblAttatchmentName4": "lblAttatchmentName4",
      "lblAttatchmentSize4": "lblAttatchmentSize4",
      "flxAttachment5": "flxAttachment5",
      "flxAttatcmentImage5": "flxAttatcmentImage5",
      "imgDownload5": "imgDownload5",
      "flxAttachments5": "flxAttachments5",
      "lblAttatchmentName5": "lblAttatchmentName5",
      "lblAttatchmentSize5": "lblAttatchmentSize5",
    };

    var emailMessages = messages.MessageThread;
    var toSegment = function (emailMessages) {
      var dateUtils = require('AdminConsoleDateTimeUtilities');
      var localizedDateObject = emailMessages.requestmessage_createdts ? dateUtils.getLocalizedStandardTimeFromDatabaseTS(emailMessages.requestmessage_createdts, dateUtils.STANDARD_CLIENT_DATETIME_FORMAT) : "N/A";
      var rtxMailDecodedVal = decodeURI(window.atob(emailMessages.requestmessage_MessageDescription));
	  rtxMailDecodedVal = self.setSantizedStringToText(rtxMailDecodedVal, 1);
      return { 
        "lblName":emailMessages.requestmessage_RepliedBy_Name,
        "lblDate":self.getLocaleDate(self.getDateInstanceFromDBDateTime(emailMessages.requestmessage_createdts)),
        "lblEmailName":emailMessages.requestmessage_RepliedBy_Name+" <"+emailMessages.requestmessage_createdby+">",
        "lblCustomerFullName":messages.customer_FirstName +" "+messages.customer_LastName,
        "lblCustomerUsername":messages.customer_Username,
        "lblEmailDate":localizedDateObject,
        "flxEmailMain":{
          "isVisible":true
        },
        "flxAttatchment": {
          "isVisible": true
        },
        //"imgAttatch":emailMessages.MessageAttachments.length>0? "attachment_2x.png":"",
        "lblAttach": {
          "text": emailMessages.MessageAttachments.length > 0 ? "\ue93d" : "",
          "skin": "sknIcon20px"
        },
        "btnDraft": {
          "onClick": function () {
            self.showDraftMesg();
          },
          "isVisible": emailMessages.requestmessage_IsRead === kony.i18n.getLocalizedString("i18n.frmCSRController.DRAFT") ? true : false,
          "text": kony.i18n.getLocalizedString("i18n.frmCSRController.Draft")
        },
        "btnDraftMain": {
          "onClick": function () {
            self.showDraftMesg();
          },
          "isVisible": emailMessages.requestmessage_IsRead === kony.i18n.getLocalizedString("i18n.frmCSRController.DRAFT") ? true : false,
          "text": kony.i18n.getLocalizedString("i18n.frmCSRController.Draft")
        },
        "rtxDescription": rtxMailDecodedVal,
        "rtxDescriptionHide": rtxMailDecodedVal,
        "lblSeperator": "_",
        "lblSeperator1": "_",
        "template": "flxMain",
        "btnMail": {
          "isVisible": false,
          "text": messages.customerEmail
        },
        "lblAttatchments": emailMessages.MessageAttachments.length > 0 ? emailMessages.MessageAttachments.length + kony.i18n.getLocalizedString("i18n.frmCSRController.Attachments") : "",
        "lblSeperator2": "_",
        "rtxMail": rtxMailDecodedVal ,
        "requestmessage_id": emailMessages.requestmessage_id,
        "flxAttatchments": {
          "isVisible": emailMessages.MessageAttachments.length > 0 ? true : false,
        },
        "lblIconDownload2":{
          "text":"\ue93c",
          "skin":"sknIconDownload24pxBlue"
        },
        "lblIconDownload3":{
          "text":"\ue93c",
          "skin":"sknIconDownload24pxBlue"
        },
        "lblIconDownload4":{
          "text":"\ue93c",
          "skin":"sknIconDownload24pxBlue"
        },
        "lblIconDownload5":{
          "text":"\ue93c",
          "skin":"sknIconDownload24pxBlue"
        },

        //         "flxFlagSeperator":{"isVisible":true},
        //       "flxFlagSeperator2":{"isVisible":true},
        //       "flxFlagSeperator3":{"isVisible":true},
        //       "flxFlagSeperator4":{"isVisible":true},
        //       "flxFlagSeperator5":{"isVisible":true},

        //Attachment no 1
        "flxAttachment": {
          "isVisible": emailMessages.MessageAttachments.length > 0 ? true : false,
          "onClick": function () {
            self.getMediaContent(emailMessages.MessageAttachments[0].media_id, emailMessages.MessageAttachments[0].media_Name);
          }
        },
        // "imgDownload":"download_blue_2x.png",
        "lblAttatchmentName":{
          "text" : emailMessages.MessageAttachments[0]!==undefined?self.trimData(emailMessages.MessageAttachments[0].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
          "toolTip":emailMessages.MessageAttachments[0]!==undefined ? emailMessages.MessageAttachments[0].media_Name : ""
        },
        "lblAttatchmentSize":(emailMessages.MessageAttachments[0]!==undefined?parseInt(emailMessages.MessageAttachments[0].media_Size)/1000:"0")+" KB",
        "attatchmentMediaId1":emailMessages.MessageAttachments[0]!==undefined?emailMessages.MessageAttachments[0].media_id:"",
        
        //Attachment No 2
        "flxAttachment2": {
          "isVisible": emailMessages.MessageAttachments.length > 1 ? true : false,
          "onClick": function () {
            self.getMediaContent(emailMessages.MessageAttachments[1].media_id, emailMessages.MessageAttachments[1].media_Name);
          }
        },
        // "imgDownload2":"download_blue_2x.png",
        "lblAttatchmentName2":{
          "text":emailMessages.MessageAttachments[1]!==undefined?self.trimData(emailMessages.MessageAttachments[1].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
          "toolTip":emailMessages.MessageAttachments[1]!==undefined ? emailMessages.MessageAttachments[1].media_Name : ""
        },
        //blAttatchmentName2":emailMessages.MessageAttachments[1]!==undefined?self.trimData(emailMessages.MessageAttachments[1].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
        "lblAttatchmentSize2":(emailMessages.MessageAttachments[1]!==undefined?parseInt(emailMessages.MessageAttachments[1].media_Size)/1000:"0")+" KB",
        "attatchmentMediaId2":emailMessages.MessageAttachments[1]!==undefined?emailMessages.MessageAttachments[1].media_id:"",
        
        //Attachment No 3
        "flxAttachment3": {
          "isVisible": emailMessages.MessageAttachments.length > 2 ? true : false,
          "onClick": function () {
            self.getMediaContent(emailMessages.MessageAttachments[2].media_id, emailMessages.MessageAttachments[2].media_Name);
          }
        },
        // "imgDownload3":"download_blue_2x.png",
        "lblAttatchmentName3":{
          "text":emailMessages.MessageAttachments[2]!==undefined?self.trimData(emailMessages.MessageAttachments[2].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
          "toolTip":emailMessages.MessageAttachments[2]!==undefined ? emailMessages.MessageAttachments[2].media_Name : ""
        },
        //lblAttatchmentName3":emailMessages.MessageAttachments[2]!==undefined?self.trimData(emailMessages.MessageAttachments[2].media_Name,20):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
        "lblAttatchmentSize3":(emailMessages.MessageAttachments[2]!==undefined?parseInt(emailMessages.MessageAttachments[2].media_Size)/1000:"0")+" KB",
        "attatchmentMediaId3":emailMessages.MessageAttachments[2]!==undefined?emailMessages.MessageAttachments[2].media_id:"",
        
        //Attachment No 4
        "flxAttachment4": {
          "isVisible": emailMessages.MessageAttachments.length > 3 ? true : false,
          "onClick": function () {
            self.getMediaContent(emailMessages.MessageAttachments[3].media_id, emailMessages.MessageAttachments[3].media_Name);
          }
        },
        "imgDownload4":"download_blue_2x.png",
        "lblAttatchmentName4":{
          "text":emailMessages.MessageAttachments[3]!==undefined?self.trimData(emailMessages.MessageAttachments[3].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
          "toolTip":emailMessages.MessageAttachments[3]!==undefined ? emailMessages.MessageAttachments[3].media_Name : ""
        },
        //lblAttatchmentName4":emailMessages.MessageAttachments[3]!==undefined?self.trimData(emailMessages.MessageAttachments[3].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
        "lblAttatchmentSize4":(emailMessages.MessageAttachments[3]!==undefined?parseInt(emailMessages.MessageAttachments[3].media_Size)/1000:"0")+" KB",
        "attatchmentMediaId4":emailMessages.MessageAttachments[3]!==undefined?emailMessages.MessageAttachments[3].media_id:"",
        
        //Attachment No 5
        "flxAttachment5": {
          "isVisible": emailMessages.MessageAttachments.length > 4 ? true : false,
          "onClick": function () {
            self.getMediaContent(emailMessages.MessageAttachments[4].media_id, emailMessages.MessageAttachments[4].media_Name);
          }
        },
        // "imgDownload5":"download_blue_2x.png",
        "lblAttatchmentName5":{
          "text":emailMessages.MessageAttachments[4]!==undefined?self.trimData(emailMessages.MessageAttachments[4].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),
          "toolTip":emailMessages.MessageAttachments[4]!==undefined ? emailMessages.MessageAttachments[4].media_Name : ""
        },
        //lblAttatchmentName5":emailMessages.MessageAttachments[4]!==undefined?self.trimData(emailMessages.MessageAttachments[4].media_Name,15):kony.i18n.getLocalizedString("i18n.frmCSRController.No_Attachment"),

        "lblAttatchmentSize5":(emailMessages.MessageAttachments[4]!==undefined?parseInt(emailMessages.MessageAttachments[4].media_Size)/1000:"0")+" KB",
        "attatchmentMediaId5":emailMessages.MessageAttachments[4]!==undefined?emailMessages.MessageAttachments[4].media_id:""
      };
    };
    var data = emailMessages.map(toSegment);
    this.view.editMessages.segMesgs.widgetDataMap = dataMap;
    data[0].template = data[0].rtxDescription.indexOf("<li") >= 0 ? "flxEmailMainLeftPadding" : "flxEmailMain";
    this.view.editMessages.segMesgs.setData(data);
    this.view.forceLayout();
  },
  setTemplateDummyData: function () {
    var dataMap = {
      "lblSeperator": "lblSeperator"
    };
    var data = [{
      "lblSeperator": "-",
      "template": "flxCSRMessageTemplate"
    }];
    this.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
    this.view.listingSegmentClient.segListing.setData(data);
    this.view.forceLayout();
  },


  getNameById: function (searchId) {
    if (this.userData !== undefined) {
      for (var i = 0; i < this.userData.length; i++) {
        if (this.userData[i].User_id === searchId)
          return this.userData[i].Name;
      }
    }
  },
  validateName: function (name) {
    if (this.userData !== undefined) {
      for (var i = 0; i < this.userData.length; i++) {
        if (this.userData[i].Name === name)
          return true;
      }

    }
    return false;
  },
  showNewMessageScreen: function (noResult) {
    if (noResult) {
      this.view.MessageFilter.FlexResult.isVisible = false;
      this.view.MessageFilter.FlexNoResult.isVisible = true;
    } else {
      this.view.MessageFilter.FlexResult.isVisible = true;
      this.view.MessageFilter.FlexNoResult.isVisible = false;
    }
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.New_Messages");
    this.view.detailHeader.flxHeader1.skin = "sknflxffffffop0i2986200ef4e48cursor";
    this.view.detailHeader.flxHeader5.skin="sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader2.skin="sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader3.skin="sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader4.skin="sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.editMessages.btnAssign.isVisible=true;
    this.view.editMessages.btnReply.isVisible=true;
    this.view.editMessages.lblAssign.right="225px";
    this.view.detailHeader.flxSelected2.isVisible=false;
    this.view.detailHeader.flxSelected.isVisible=true;
    this.view.detailHeader.flxSelected3.isVisible=false;
    this.view.detailHeader.flxSelected4.isVisible=false;
    this.view.detailHeader.flxSelected5.isVisible=false;
    this.view.myQueueMessageFilter.flxColumn3.isVisible=false;
    this.view.myQueueMessageFilter.flxColumn4.isVisible=false;
    this.view.flxBreadCrumbs.setVisibility(false);
    //this.view.listingSegmentClient1.rtxNoResultsFound.isVisible=false;
    this.view.flxNewMessagePage.isVisible = true;
    this.view.flxScrollMainContent.isVisible = true;
    this.view.flxMyQueuePage.isVisible = false;
    this.view.flxMessageDetailsPage.isVisible = false;
    this.setWidthForMessages();
  },
  showInProgressScreen: function (noResult) {
    if (noResult) {
      this.view.MessageFilter.FlexResult.isVisible = false;
      this.view.MessageFilter.FlexNoResult.isVisible = true;
    } else {
      this.view.MessageFilter.FlexResult.isVisible = true;
      this.view.MessageFilter.FlexNoResult.isVisible = false;
    }
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmCSRController.In_Progress_Messages");
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.editMessages.btnAssign.isVisible=true;
    this.view.editMessages.btnReply.isVisible=true;
    this.view.editMessages.lblAssign.right="225px";
    this.view.detailHeader.flxHeader2.skin = "sknflxffffffop0i2986200ef4e48cursor";
    this.view.detailHeader.flxHeader1.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader3.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader4.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader5.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.flxScrollMainContent.isVisible = true;
    this.view.flxNewMessagePage.isVisible = true;
    this.view.flxMyQueuePage.isVisible = false;
    this.view.flxMessageDetailsPage.isVisible = false;
    this.view.detailHeader.flxSelected.isVisible = false;
    this.view.detailHeader.flxSelected2.isVisible = true;
    this.view.detailHeader.flxSelected3.isVisible = false;
    this.view.detailHeader.flxSelected4.isVisible = false;
    this.view.detailHeader.flxSelected5.isVisible = false;
    this.setWidthForMessages();
  },
  showResolvedScreen: function (noResult) {
    if (noResult) {
      this.view.MessageFilter.FlexResult.isVisible = false;
      this.view.MessageFilter.FlexNoResult.isVisible = true;
    } else {
      this.view.MessageFilter.FlexResult.isVisible = true;
      this.view.MessageFilter.FlexNoResult.isVisible = false;
    }
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Resolved_Messages");
    this.view.editMessages.btnAssign.isVisible=false;
    this.view.editMessages.btnReply.isVisible=false;
    this.view.editMessages.lblAssign.right="35px";
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.detailHeader.flxHeader3.skin = "sknflxffffffop0i2986200ef4e48cursor";
    this.view.detailHeader.flxHeader1.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader2.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader4.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader5.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.flxScrollMainContent.isVisible = true;
    this.view.flxNewMessagePage.isVisible = true;
    this.view.flxMyQueuePage.isVisible = false;
    this.view.flxMessageDetailsPage.isVisible = false;
    this.view.detailHeader.flxSelected.isVisible = false;
    this.view.detailHeader.flxSelected3.isVisible = true;
    this.view.detailHeader.flxSelected2.isVisible = false;
    this.view.detailHeader.flxSelected4.isVisible = false;
    this.view.detailHeader.flxSelected5.isVisible = false;
    this.setWidthForMessages();
  },
  showArchivedScreen: function (noResult) {
    if (noResult) {
      this.view.MessageFilter.FlexResult.isVisible = false;
      this.view.MessageFilter.FlexNoResult.isVisible = true;
    } else {
      this.view.MessageFilter.FlexResult.isVisible = true;
      this.view.MessageFilter.FlexNoResult.isVisible = false;
    }
    this.view.editMessages.btnAssign.isVisible=false;
    this.view.editMessages.btnReply.isVisible=false;
    this.view.editMessages.lblAssign.right="35px";
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Archived_Messages");
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.detailHeader.flxHeader4.skin = "sknflxffffffop0i2986200ef4e48cursor";
    this.view.detailHeader.flxHeader1.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader2.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader3.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader5.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.flxScrollMainContent.isVisible = true;
    this.view.flxNewMessagePage.isVisible = true;
    this.view.flxMyQueuePage.isVisible = false;
    this.view.flxMessageDetailsPage.isVisible = false;
    this.view.detailHeader.flxSelected.isVisible = false;
    this.view.detailHeader.flxSelected4.isVisible = true;
    this.view.detailHeader.flxSelected2.isVisible = false;
    this.view.detailHeader.flxSelected3.isVisible = false;
    this.view.detailHeader.flxSelected5.isVisible = false;
    this.setWidthForMessages();
  },
  showMyQueueScreen: function (noResult) {
    if (noResult) {
      this.view.myQueueMessageFilter.FlexResult.isVisible = false;
      this.view.myQueueMessageFilter.FlexNoResult.isVisible = true;
    } else {
      this.view.myQueueMessageFilter.FlexResult.isVisible = true;
      this.view.myQueueMessageFilter.FlexNoResult.isVisible = false;
    }

    this.view.myQueueMessageFilter.lblAssignedTo.text= kony.i18n.getLocalizedString("i18n.roles.STATUS");
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue");
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.editMessages.btnAssign.isVisible=true;
    this.view.editMessages.btnReply.isVisible=true;
    this.view.editMessages.lblAssign.right="225px";
    this.view.detailHeader.flxHeader5.skin = "sknflxffffffop0i2986200ef4e48cursor";
    this.view.detailHeader.flxHeader1.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader2.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader3.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.detailHeader.flxHeader4.skin = "sknflxffffffop0jb4a0a5ca39742Cursor";
    this.view.flxScrollMainContent.isVisible = true;
    this.view.flxNewMessagePage.isVisible = false;
    this.view.flxMyQueuePage.isVisible = true;
    this.view.flxCloseCal2.isVisible = false;
    this.view.flxMessageDetailsPage.isVisible = false;
    this.view.detailHeader.flxSelected5.isVisible = true;
    this.view.detailHeader.flxSelected4.isVisible = false;
    this.view.detailHeader.flxSelected3.isVisible = false;
    this.view.detailHeader.flxSelected2.isVisible = false;
    this.view.detailHeader.flxSelected.isVisible = false;
    this.setWidthForMessages();
  },

  generatePaginationArr: function (numPerPage, totalCount) {
    var noOfPages = Math.ceil(totalCount / numPerPage);
    this.totalPage = noOfPages;
    var paginationArr = Array.apply(null, {
      length: noOfPages
    });
    return paginationArr.map(function (elem,index) {
      return [++index,"Page "+index+" of "+noOfPages];
    });
  },

  updateHeaderCount: function(messages,totalMsg){
    this.view.flxScrollMainContent.setVisibility(true);
    totalMsg =  messages.requestsSummary.FILTERED_REQUESTS;
    this.totalMessages=totalMsg;
    this.view.detailHeader.lblCount1.text = messages.requestsSummary.SID_OPEN===undefined?"0":messages.requestsSummary.SID_OPEN; 
    this.view.detailHeader.lblCount2.text = messages.requestsSummary.SID_INPROGRESS===undefined?"0":messages.requestsSummary.SID_INPROGRESS;
    this.view.detailHeader.lblCount3.text = messages.requestsSummary.SID_RESOLVED===undefined?"0":messages.requestsSummary.SID_RESOLVED;
    this.view.detailHeader.lblCount4.text = messages.requestsSummary.SID_ARCHIVED===undefined?"0":messages.requestsSummary.SID_ARCHIVED;
    this.view.detailHeader.lblCount5.text =  messages.requestsSummary.MY_QUEUE===undefined?"0":messages.requestsSummary.MY_QUEUE;
    this.view.MessageFilter.lblRowHeader1.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TOTAL_MESSAGES")+ " "+(totalMsg===undefined?"0":totalMsg);


    //var paginationD = this.view.MessageFilter.pagination.lbxPagination.clone(this.view.MessageFilter.pagination.lbxPagination.id);
    if(this.currentPage+""==="1")
      this.view.MessageFilter.pagination.lbxPagination.masterData = this.generatePaginationArr(this.totalRecordPerPage,totalMsg);
    this.view.forceLayout(); 
  },
  updateMyHeaderCount: function(messages,totalMsg){
    totalMsg =  messages.requestsSummary.FILTERED_REQUESTS;
    this.totalMessages=totalMsg;
    this.view.detailHeader.lblCount1.text = messages.requestsSummary.SID_OPEN===undefined?"0":messages.requestsSummary.SID_OPEN; 
    this.view.detailHeader.lblCount2.text = messages.requestsSummary.SID_INPROGRESS===undefined?"0":messages.requestsSummary.SID_INPROGRESS;
    this.view.detailHeader.lblCount3.text = messages.requestsSummary.SID_RESOLVED===undefined?"0":messages.requestsSummary.SID_RESOLVED;
    this.view.detailHeader.lblCount4.text = messages.requestsSummary.SID_ARCHIVED===undefined?"0":messages.requestsSummary.SID_ARCHIVED;
    this.view.detailHeader.lblCount5.text =  messages.requestsSummary.MY_QUEUE===undefined?"0":messages.requestsSummary.MY_QUEUE;
    this.view.myQueueMessageFilter.lblRowHeader1.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TOTAL_MESSAGES")+ " "+(totalMsg===undefined?"0":totalMsg);

    if(this.currentPage+""==="1") 
      this.view.myQueueMessageFilter.pagination.lbxPagination.masterData = this.generatePaginationArr(this.totalRecordPerPage,totalMsg);
    this.view.forceLayout();
  },
  toCustomerRequestSegment: function(messages) {
    var self = this;
    var assignToName=(self.isKeyCloakEnabled===true)?(self.getNameById(messages.customerrequest_AssignedTo)):messages.customerrequest_AssignedTo_Name;
    return {
      "imgCheckBoxMsg": {
        "src": "checkbox.png"
      },
      "flxCheckboxMsg":{
        "isVisible":!self.view.detailHeader.flxSelected3.isVisible,
        "onClick":self.toggleCheckbox
      },
      "flxOptions": {
        "isVisible": self.currentStatus === "SID_ARCHIVED" || self.currentStatus === "SID_RESOLVED" ? false : true,
        "onClick": function() {
          self.toggleContextualMenu(self.view.MessageFilter.SegSearchResult, "flxCSRMsgList");
        }
      },
      "lblReply": {
        "text": "\ue939",
        "isVisible": messages.customerrequest_lastupdatedbycustomer === "true" ? true : false,
        "skin": "sknIcon12pxBlack"
      },
      "lblIconOptions": {
        "text": "\ue91f",
        "skin": "sknFontIconOptionMenu"
      },
      "lblRequestID": {
        "text": messages.customerrequest_id,
        "toolTip": messages.customerrequest_id
      },
      "lblCustomerId": {
        "isVisible":self.view.MessageFilter.flxCustomerId.isVisible,
        "text" : messages.customerrequest_Customer_id || "N/A"
      },
      "lblCustomerName": {
        "text": messages.customer_FirstName + " " + messages.customer_LastName,
        "toolTip": "Username: " + messages.customer_Username + ",CustomerID: " + messages.customerrequest_Customer_id
      },
      "lblCustomerUserName": messages.customer_Username,
      "lblDate": self.getLocaleDate(self.getDateInstanceFromDBDateTime(messages.customerrequest_createdts)),
      "lblDraft": messages.customerrequest_hasDraftMessage === 1 ? kony.i18n.getLocalizedString("i18n.frmCSRController.Draft") : "",
      "lblSubject":{
        "width":self.view.MessageFilter.flxSubject.width,
        "text":self.getXSSSanitizedString(messages.customerrequest_RequestSubject)
      },
      "lblCategory": messages.requestcategory_Name,
      "lblCategoryId": messages.customerrequest_RequestCategory_id,
      "lblSeparator": "-",
      "lblAssignto":{ 
        "text": assignToName ?
        self.AdminConsoleCommonUtils.getTruncatedString(assignToName, 15, 12): "       ",
        "tooltip": assignToName?assignToName:"       "
      },
      "lblStatus": messages.customerrequest_Status_id,
      "flxSegMain" : {
        "left": self.view.detailHeader.flxSelected3.isVisible ? "0px" : "50px",
        "onClick":self.onMessageFilterRowClick
      },
      "template": "flxCSRMsgList",
      "imgMsgIcon": {
        "isVisible":  messages.requestmessage_isPriorityMessage === "1" ? true : false,
        "src" :"path_1x.png",
         
        "tooltip": "Priority"

      }
    };
  },
  setRequestsSegmentData: function(messages) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.MessageFilter.lblCustHeaderSeperator.skin = "sknLblTableHeaderLine";
    var self = this;
    var dataMap = {
      "imgCheckBoxMsg" : "imgCheckBoxMsg",
      "flxCheckboxMsg" : "flxCheckboxMsg",
      "flxOptions": "flxOptions",
      "flxCSRMsgList": "flxCSRMsgList",
      "flxSegMain": "flxSegMain",
      "lblRequestID": "lblRequestID",
      "lblCustomerId": "lblCustomerId",
      "lblCustomerName": "lblCustomerName",
      "lblDraft": "lblDraft",
      "lblSubject": "lblSubject",
      "lblCategory": "lblCategory",
      "lblDate": "lblDate",
      "lblAssignto": "lblAssignto",
      "lblSeparator": "lblSeparator",
      "lblStatus": "lblStatus",
      "lblIconOptions": "lblIconOptions",
      "flxReqId": "flxReqId",
      "lblReply": "lblReply",
      "imgMsgIcon":"imgMsgIcon"
    };
    var data = messages.map(this.toCustomerRequestSegment);
    this.view.MessageFilter.SegSearchResult.widgetDataMap = dataMap;
    if (this.isNext && this.currentPage !== 1) {
      var segData1 = this.view.MessageFilter.SegSearchResult.data;
      if (this.currentPage === 2) {
        segData1 = segData1.concat(data);
      } else {
        var segTemp=segData1.slice(40, 80);
        segData1 = segTemp.concat(data);
      }
      this.view.MessageFilter.SegSearchResult.setData(segData1);
      this.view.MessageFilter.flxSegSearchResult.setContentOffset({
        y: document.getElementById("frmCSR_MessageFilter_flxSegSearchResult").scrollHeight / 2,
        x: 0
      });
    }
    else if(!this.isNext && this.currentPage !== 1){
      var segDataTemp=data;
      var segData2 = this.view.MessageFilter.SegSearchResult.data;
      segDataTemp=segDataTemp.concat(segData2.slice(0, 40));

      this.view.MessageFilter.SegSearchResult.setData(segDataTemp);
      this.view.MessageFilter.flxSegSearchResult.setContentOffset({
        y: document.getElementById("frmCSR_MessageFilter_flxSegSearchResult").scrollHeight / 2,
        x: 0
      });
    }
    else {
      this.isSorting = false;
      this.view.MessageFilter.SegSearchResult.setData(data);
      this.view.MessageFilter.flxSegSearchResult.setContentOffset({
        y: 0,
        x: 0
      });
    }
    this.view.MessageFilter.SegSearchResult.onHover = this.saveScreenY;
    this.selectPreviouslySelectedRequests(this.view.MessageFilter.SegSearchResult.data);
    // fix for AAC-6360
    if(document.getElementById("frmCSR_MessageFilter_flxSegSearchResult"))
      document.getElementById("frmCSR_MessageFilter_flxSegSearchResult").onscroll = this.populateResultsOnReachingendNewRequest;
    // end of fix for AAC-6360
    this.view.forceLayout();
  },
  populateResultsOnReachingendNewRequest: function(context) {
    var scopeObj = this;
    if (this.view.MessageFilter.FlexContextMenu.isVisible){
      this.view.MessageFilter.FlexContextMenu.setVisibility(false);
      let Segment = this.view.MessageFilter.SegSearchResult;
      let segData = Segment.data;
      segData[this.prevIndex].flxOptions.skin = "slFbox";
      Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
    }
    if (this.view.myQueueMessageFilter.FlexContextMenu.isVisible){ 
      this.view.myQueueMessageFilter.FlexContextMenu.setVisibility(false);
      let Segment = this.view.myQueueMessageFilter.SegSearchResult;
      let segData = Segment.data;
      segData[this.prevIndex].flxOptions.skin = "slFbox";
      Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
    }
    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {
      var pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        if (scopeObj.lastAppend !== 1) {
          //scopeObj.addSelectedRequestIdsToList();
          scopeObj.view.MessageFilter.flxSegSearchResult.setContentOffset({
            y: 1,
            x: 0
          });
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.currentPage = pageNo + 1;
          scopeObj.isNext = true;
          var params = {
            "csrRepID": scopeObj.user_ID,
            "searchKey": scopeObj.searchParam.searchKey !== undefined ? scopeObj.searchParam.searchKey : "",
            "requestAssignedTo": scopeObj.searchParam.requestAssignedTo !== undefined ? scopeObj.searchParam.requestAssignedTo : "",
            "requestCategory": scopeObj.searchParam.requestCategory !== undefined ? scopeObj.searchParam.requestCategory : "",
            "messageRepliedBy": scopeObj.searchParam.messageRepliedBy !== undefined ? scopeObj.searchParam.messageRepliedBy : "",
            "dateInitialPoint": scopeObj.searchParam.dateInitialPoint !== undefined ? scopeObj.searchParam.dateInitialPoint : "",
            "dateFinalPoint": scopeObj.searchParam.dateFinalPoint !== undefined ? scopeObj.searchParam.dateFinalPoint : "",
            "requestStatusID": "[" + scopeObj.currentStatus + "]",
            "currPageIndex": scopeObj.currentPage,
            "sortCriteria": scopeObj.sortColoumn,
            "recordsPerPage": scopeObj.totalRecordPerPage,
            "sortOrder": scopeObj.sortOrder
          };
          scopeObj.presenter.fetchRequests(params);
        }
      }
    } else if (Math.ceil(context.currentTarget.scrollTop) === 0) {
      var pageNum = parseInt(scopeObj.currentPage);
      if (pageNum - 1 > 0 && pageNum !== 2) {
        //scopeObj.addSelectedRequestIdsToList();
        scopeObj.view.MessageFilter.flxSegSearchResult.setContentOffset({
          y: 640,
          x: 0
        });
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.currentPage = pageNum - 1;
        scopeObj.isNext = false;
        var param = {
          "csrRepID": scopeObj.user_ID,
          "searchKey": scopeObj.searchParam.searchKey !== undefined ? scopeObj.searchParam.searchKey : "",
          "requestAssignedTo": scopeObj.searchParam.requestAssignedTo !== undefined ? scopeObj.searchParam.requestAssignedTo : "",
          "requestCategory": scopeObj.searchParam.requestCategory !== undefined ? scopeObj.searchParam.requestCategory : "",
          "messageRepliedBy": scopeObj.searchParam.messageRepliedBy !== undefined ? scopeObj.searchParam.messageRepliedBy : "",
          "dateInitialPoint": scopeObj.searchParam.dateInitialPoint !== undefined ? scopeObj.searchParam.dateInitialPoint : "",
          "dateFinalPoint": scopeObj.searchParam.dateFinalPoint !== undefined ? scopeObj.searchParam.dateFinalPoint : "",
          "requestStatusID": "[" + scopeObj.currentStatus + "]",
          "currPageIndex": scopeObj.currentPage-1,
          "sortCriteria": scopeObj.sortColoumn,
          "recordsPerPage": scopeObj.totalRecordPerPage,
          "sortOrder": scopeObj.sortOrder
        };
        scopeObj.presenter.fetchRequests(param);
      }
    }
    scopeObj.view.forceLayout();
  },
  setMyRequestSegmentData: function (messages) {
    var self = this;
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.myQueueMessageFilter.lblCustHeaderSeperator.skin="sknLblTableHeaderLine";
    var dataMap = {
      "imgCheckBoxMsg" : "imgCheckBoxMsg",
      "flxCheckboxMsg" : "flxCheckboxMsg",
      "flxOptions": "flxOptions",
      "flxCSRMsgList": "flxCSRMsgList",
      "flxSegMain": "flxSegMain",
      "flxStatus": "flxStatus",
      "lblRequestID": "lblRequestID",
      "lblCustomerId" : "lblCustomerId",
      "lblCustomerName": "lblCustomerName",
      "lblDraft": "lblDraft",
      "lblSubject": "lblSubject",
      "lblCategory": "lblCategory",
      "lblDate": "lblDate",
      "lblStatus": "lblStatus",
      "lblIconStatus": "lblIconStatus",
      "imgStatus": "imgStatus",
      "lblAssignto": "lblAssignto",
      "imgOptions": "imgOptions",
      "lblSeparator": "lblSeparator",
      "lblIconOptions": "lblIconOptions",
      "flxReqId":"flxReqId",
      "lblReply":"lblReply",
      "imgMsgIcon":"imgMsgIcon"
    };
    var toSegment = function (messages) { 
      return {
        "imgCheckBoxMsg": {
          "src": "checkbox.png"
        },
        "flxCheckboxMsg":{
          "onClick":self.toggleCheckbox
        },
        "flxOptions": {
          "onClick": function () {
            self.toggleContextualMenu(self.view.myQueueMessageFilter.SegSearchResult,"flxCSRQueueList");
          }
        },
        "lblReply":{"text":"\ue939","isVisible":messages.customerrequest_lastupdatedbycustomer==="true"?true:false,
                    "skin":"sknIcon12pxBlack"},
        "lblIconOptions":{ "text":"\ue91f","skin":"sknFontIconOptionMenu"},
        "lblIconStatus":{
          "skin":(messages.customerrequest_Status_id==="SID_OPEN")?"sknIcon13pxBlue":(messages.customerrequest_Status_id==="SID_INPROGRESS")?"sknIconOrange":(messages.customerrequest_Status_id==="SID_RESOLVED")?"sknIcon13pxGreen":"sknIcon13pxGray",
          "text":"\ue921"
        },
        "lblStatus":(messages.customerrequest_Status_id==="SID_OPEN")?kony.i18n.getLocalizedString("i18n.frmCSRController.NEW"):(messages.customerrequest_Status_id==="SID_INPROGRESS")?kony.i18n.getLocalizedString("i18n.frmCSRController.In_Progress"):(messages.customerrequest_Status_id==="SID_RESOLVED")?kony.i18n.getLocalizedString("i18n.frmCSRController.Resolved"):kony.i18n.getLocalizedString("i18n.frmCSRController.Archived"),
        "lblRequestID": { "text":messages.customerrequest_id,"toolTip":messages.customerrequest_id},
        //"lblCustomerName": messages.customer_Salutation +" "+messages.customer_FirstName +" "+messages.customer_LastName,
        "lblCustomerId": {
          "isVisible":self.view.myQueueMessageFilter.flxCustomerId.isVisible,
          "text" : messages.customerrequest_Customer_id || "N/A"
        },
        "lblCustomerName":{ "text":  messages.customer_FirstName + " " + messages.customer_LastName,
                           "toolTip":"Username: "+messages.customer_Username+ ",CustomerID: "+messages.customerrequest_Customer_id
                          },
        "lblCustomerUserName":messages.customer_Username,
        "lblDate":self.getLocaleDate(self.getDateInstanceFromDBDateTime(messages.customerrequest_createdts)),
        "lblDraft":messages.customerrequest_hasDraftMessage===1?kony.i18n.getLocalizedString("i18n.frmCSRController.Draft"):"",
        "lblSubject":{
          "width":self.view.myQueueMessageFilter.flxSubject.width,
          "text":self.getXSSSanitizedString(messages.customerrequest_RequestSubject)
        },
        "lblCategory":messages.requestcategory_Name,
        "lblCategoryId":messages.customerrequest_RequestCategory_id,
        "lblSeparator": "-",

        "lblAssignto": messages.customerrequest_AssignedTo === undefined ? "       " : self.getNameById(messages.customerrequest_AssignedTo),
        "flxSegMain" :{
          "onClick": self.onMyQueueMessageFilterClick
        },
        "template": "flxCSRQueueList",
        "imgMsgIcon": {
          "isVisible":  messages.requestmessage_isPriorityMessage === "1" ? true : false,
          "src" :"path_1x.png"

        }
      };
    };

    var data = messages.map(toSegment);
    this.view.myQueueMessageFilter.SegSearchResult.widgetDataMap = dataMap;
    if (this.isNext && this.currentPage !== 1) {
      var segData1 = this.view.myQueueMessageFilter.SegSearchResult.data;
      if (this.currentPage === 2) {
        segData1 = segData1.concat(data);
      } else {
        var segTemp=segData1.slice(40, 80);
        segData1 = segTemp.concat(data);
      }
      this.view.myQueueMessageFilter.SegSearchResult.setData(segData1);
      this.view.myQueueMessageFilter.flxSegSearchResult.setContentOffset({
        y: document.getElementById("frmCSR_myQueueMessageFilter_flxSegSearchResult").scrollHeight / 2,
        x: 0
      });
    }
    else if(!this.isNext && this.currentPage !== 1){
      var segDataTemp=data;
      var segData2 = this.view.myQueueMessageFilter.SegSearchResult.data;
      segDataTemp=segDataTemp.concat(segData2.slice(0, 40));

      this.view.myQueueMessageFilter.SegSearchResult.setData(segDataTemp);
      this.view.myQueueMessageFilter.flxSegSearchResult.setContentOffset({
        y: document.getElementById("frmCSR_myQueueMessageFilter_flxSegSearchResult").scrollHeight / 2,
        x: 0
      });
    }
    else {
      this.isSorting = false;
      this.view.myQueueMessageFilter.SegSearchResult.setData(data);
      this.view.myQueueMessageFilter.flxSegSearchResult.setContentOffset({
        y: 0,
        x: 0
      });
    } 
    this.selectPreviouslySelectedRequests(this.view.myQueueMessageFilter.SegSearchResult.data);
    document.getElementById("frmCSR_myQueueMessageFilter_flxSegSearchResult").onscroll = this.populateResultsOnReachingendMyNewRequest;
    this.view.forceLayout();
  },

  populateResultsOnReachingendMyNewRequest: function(context) {
    var scopeObj = this;
    if (this.view.myQueueMessageFilter.FlexContextMenu.isVisible){ 
      this.view.myQueueMessageFilter.FlexContextMenu.setVisibility(false);
      let Segment = this.view.myQueueMessageFilter.SegSearchResult;
      let segData = Segment.data;
      segData[this.prevIndex].flxOptions.skin = "slFbox";
      Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
    }
    if ((Math.ceil(context.currentTarget.offsetHeight) + Math.ceil(context.currentTarget.scrollTop) === Math.ceil(context.currentTarget.scrollHeight))) {

      var  pageNo = parseInt(scopeObj.currentPage);
      if (pageNo + 1 <= scopeObj.totalPage) {
        if(scopeObj.lastAppend!==1){
          //scopeObj.addSelectedRequestIdsToList();
          scopeObj.view.myQueueMessageFilter.flxSegSearchResult.setContentOffset({
            y:1,
            x:0
          });
          scopeObj.isNext=true;
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.currentPage = pageNo+1;

          var params={"csrRepID":scopeObj.user_ID,
                      "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                      "requestAssignedTo": scopeObj.user_ID,
                      "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                      "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                      "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                      "requestStatusID": scopeObj.searchParam.requestStatusID!==undefined?scopeObj.searchParam.requestStatusID:"[SID_OPEN,SID_INPROGRESS]",
                      "currPageIndex":scopeObj.currentPage, 
                      "sortCriteria":scopeObj.sortColoumn,
                      "recordsPerPage":scopeObj.totalRecordPerPage,
                      "sortOrder":scopeObj.sortOrder};
          scopeObj.presenter.fetchMyQueueRequests(params);

        }
      }
    } else if (Math.ceil(context.currentTarget.scrollTop === 0)) {
      var pageNum = parseInt(scopeObj.currentPage);
      if (pageNum - 1 > 0 && pageNum !== 2) {
        //scopeObj.addSelectedRequestIdsToList();
        scopeObj.view.myQueueMessageFilter.flxSegSearchResult.setContentOffset({
          y:640,
          x:0
        });

        kony.adminConsole.utils.showProgressBar(scopeObj.view);      
        scopeObj.currentPage = pageNum-1;
        scopeObj.isNext=false;
        var param={"csrRepID":scopeObj.user_ID,
                   "searchKey":scopeObj.searchParam.searchKey!==undefined?scopeObj.searchParam.searchKey:"",
                   "requestAssignedTo": scopeObj.user_ID,
                   "requestCategory": scopeObj.searchParam.requestCategory!==undefined ? scopeObj.searchParam.requestCategory:"",
                   "dateInitialPoint":scopeObj.searchParam.dateInitialPoint!==undefined?scopeObj.searchParam.dateInitialPoint:"",
                   "dateFinalPoint":scopeObj.searchParam.dateFinalPoint!==undefined?scopeObj.searchParam.dateFinalPoint:"",
                   "requestStatusID": scopeObj.searchParam.requestStatusID!==undefined?scopeObj.searchParam.requestStatusID:"[SID_OPEN,SID_INPROGRESS]",
                   "currPageIndex":scopeObj.currentPage-1,
                   "sortCriteria":scopeObj.sortColoumn,
                   "recordsPerPage":scopeObj.totalRecordPerPage,
                   "sortOrder":scopeObj.sortOrder};
        scopeObj.presenter.fetchMyQueueRequests(param);
      }

    }
    scopeObj.view.forceLayout();
  },
  setAssignedToSegmentData: function (messages) {
    var dataMap = {
      "flxAssignUsers": "flxAssignUsers",
      "lblViewFullName": "lblViewFullName"
    };
    var toSegment = function (message) {
      return {
        "lblViewFullName": message.assignTo,
        "template": "flxAssignUsers"
      };

    };

    var data = messages.map(toSegment);
    this.view.segUsers.widgetDataMap = dataMap;
    this.view.segUsers.setData(data);
    this.view.forceLayout();
  },
  showNewMessagesPage: function (messages,totalRecord) {
    this.view.mainHeader.btnAddNewOption.setVisibility(true);		
    this.view.mainHeader.btnDropdownList.text = kony.i18n.getLocalizedString("i18n.frmCSRController.CREATE_NEW_MESSAGE");		
    this.view.mainHeader.flxButtons.setVisibility(true);
    kony.adminConsole.utils.hideProgressBar(this.view);
    if (messages.length === 0)
      this.showNewMessageScreen(true);
    else
      this.showNewMessageScreen(false);
    if(messages.length<38 && totalRecord>40)
    {
      this.lastAppend=1;
    }else 
      this.lastAppend=0;
    this.setRequestsSegmentData(messages);
  },
  showInProgressMessages: function (messages,totalRecord) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    if (messages.length === 0)
      this.showInProgressScreen(true);
    else
      this.showInProgressScreen(false);
    if(messages.length<18 && totalRecord>20)
    {
      this.lastAppend=1;
    }else 
      this.lastAppend=0;
    this.setRequestsSegmentData(messages);
  },
  showResolvedMessages: function (messages,totalRecord) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    if (messages.length === 0)
      this.showResolvedScreen(true);
    else
      this.showResolvedScreen(false);
    if(messages.length<18 && totalRecord>20)
    {
      this.lastAppend=1;
    }else 
      this.lastAppend=0;
    this.setRequestsSegmentData(messages);
  },
  showArchivedMessages: function (messages,totalRecord) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    if (messages.length === 0)
      this.showArchivedScreen(true);
    else
      this.showArchivedScreen(false);
    if(messages.length<18 && totalRecord>20)
    {
      this.lastAppend=1;
    }else 
      this.lastAppend=0;
    this.setRequestsSegmentData(messages);
  },
  showMyQueueMessages: function (messages,totalRecord) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    if (messages.length === 0)
      this.showMyQueueScreen(true);
    else
      this.showMyQueueScreen(false);

    if(messages.length<18 && totalRecord>20)
    {
      this.lastAppend=1;
    }else 
      this.lastAppend=0;
    this.setMyRequestSegmentData(messages);
  },
  showEmailMessages: function (messages, msgStatus, requestId, subject,isPriorityMessage) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    msgStatus = msgStatus === kony.i18n.getLocalizedString("i18n.frmCSRController.Resolved") ? "SID_RESOLVED" : msgStatus === kony.i18n.getLocalizedString("i18n.frmCSRController.In_Progress") ? "SID_INPROGRESS" : msgStatus === kony.i18n.getLocalizedString("i18n.frmCSRController.NEW") ? "SID_OPEN" : msgStatus;
    if (messages.records[0].MessageThread.length > 0) {
      this.showEmailMessagesScreen(messages,msgStatus, requestId, subject,isPriorityMessage);
      this.setMessageSegmentData(messages.records[0]);
    } else {
      this.showNoEmailMessagesScreen(msgStatus, requestId, subject);
    }
  },
  saveDraftedAttachment:function (messages) {
    this.draftAttchmentFiles=[];
    this.discardAttchments=[];
    if(messages.data[messages.username].requestMessage && 
       messages.data[messages.username].requestMessage.attachments && messages.data[messages.username].requestMessage.attachments.upload){
      var UploadOprRec = messages.data[messages.username].requestMessage.attachments.upload;

      var len = UploadOprRec.uploadAttachments.length;

      for(var i=0;i<len;i++)
      {
        var temp =  UploadOprRec.uploadAttachments[i];

        this.draftAttchmentFiles[i]={"fileName":temp.fileName,"mediaId":temp.mediaId};
      }

    }

  },
  sentEmailMessages: function (context) {
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.flxNewMessage.setVisibility(false);
    if(context && context.CREATING_MESSAGES_IN_BACKGROUND){
      this.view.toastMessage.lbltoastMessage.text=kony.i18n.getLocalizedString("i18n.frmCSRController.RequestBeingProcessedAtBackend");
      this.showToastMessage();
      this.removeAllTag();
      return;
    }
    this.view.toastMessage.lbltoastMessage.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Message_sent_successfully");
    this.showToastMessage();
    this.removeAllTag();
    if(this.view.Message.lblMsg.text!==kony.i18n.getLocalizedString("i18n.frmCSRController.New_Message")){
      // this.fetchEmailMsg();
      var currentStatus = this.view.editMessages.btnStatus.text;
      // if(currentStatus !== "Mark as IN PROGRESS"){
      var statusId = "SID_INPROGRESS";
      var isPriority= this.view.Message.imgCheckBoxMsg.src === "checkboxselected.png" ? "1" :"0"; 
      var param  = {"requeststatus":statusId,"requestid":this.selectedRequestId,"assignedto":this.user_ID,"isPriorityMessage":isPriority};
      param.username = this.getCurrentRequestCustomerUsername();
      param.user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
      param.isAdminRequest = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
      this.presenter.updateRequestStatus(param,currentStatus,false);
      //}
    }
    else{
      this.fetchRequestFirstTime();
    }
  },
  getCurrentRequestCustomerUsername: function(){

    if (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) {
      var selecInd = this.view.myQueueMessageFilter.SegSearchResult.selectedRowIndex[1];
      var rowData = this.view.myQueueMessageFilter.SegSearchResult.data[selecInd];
      if(rowData){
        return rowData.lblCustomerUserName;
      }else if (this.view.myQueueMessageFilter.SegSearchResult.info){
        return this.view.myQueueMessageFilter.SegSearchResult.info.lblCustomerUserName;
      }
    }else{
      var selecIndMsg = this.view.MessageFilter.SegSearchResult.selectedRowIndex[1];
      var rowDataMsg = this.view.MessageFilter.SegSearchResult.data[selecIndMsg];
      if(rowDataMsg){
        return rowDataMsg.lblCustomerUserName;
      }else if(this.view.MessageFilter.SegSearchResult.info){
        return this.view.MessageFilter.SegSearchResult.info.lblCustomerUserName;
      }
    }
  },
  draftEmailMessages: function (messages) {
    if (messages.data[messages.username] && messages.data[messages.username].requestMessage)
      this.requestmessage_id = messages.data[messages.username].requestMessage.messageId;
    this.view.Message.lblSaving.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Saved");
    this.saveDraftedAttachment(messages); 
    this.view.forceLayout();
  },
  discardEmailMessages: function () {
    kony.timer.cancel("sendDraftMessage");
    this.view.flxNewMessage.setVisibility(false);
    this.removeAllTag();
    this.fetchEmailMsg();

  },
  updateRequestStatus: function () {
    this.backToListingpage();
  },
  updateAssignTo: function () {
    this.view.flxAssignPopup.setVisibility(false);
    //this.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + this.assignTo;
    this.showToastMessage();
    this.view.toastMessage.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Message_assigned_successfully");
    this.assignTo = "";
    this.backToListingpage();
  },
  showAssignedToPage: function (messages) {
    this.showAssignedToScreen();
    this.setAssignedToSegmentData(messages);
  },
  setTemplateData: function (templates) {
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.leftmenu.MESSAGES");
    this.view.flxNoTemplate.setVisibility(false);
    this.view.flxBreadCrumbs.setVisibility(true);
    var self = this;
    this.templateData = templates;
    self.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TEMPLATES");
    if (templates.length === 0) {
      //self.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ADD_TEMPLATES");
      self.view.flxGroupSegHeader.setVisibility(false);
      self.view.lblSeperator.setVisibility(false);
      var searchTexting = self.view.subHeader.tbxSearchBox.text.replaceAll("<","\u003c").replaceAll(">","\u003e").replace("&","&amp").replace("=","&eq").replace("alert","").replace("marquee","").replace("<","&lt").replace(">","&gt").split(">").join("&gt").split("<").join("&lt");
      var searchText=searchTexting.split(">");
      searchTexting = searchText.join("&gt");
      searchText = searchTexting.split("<");
      searchTexting = searchText.join("&lt");
      self.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchTexting+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
      self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
      self.view.listingSegmentClient.flxPagination.setVisibility(false);
      self.view.listingSegmentClient.segListing.setVisibility(false);

    } else {
      self.view.listingSegmentClient.segListing.setVisibility(true);
      self.view.flxGroupSegHeader.setVisibility(true);
      self.view.lblSeperator.setVisibility(true);
      self.view.listingSegmentClient.flxPagination.setVisibility(true);
      self.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
      var dataMap = {
        "flxOptions": "flxOptions",
        "imgOptions": "imgOptions",
        "lblCreated": "lblCreated",
        "lblLastUpdateby": "lblLastUpdate",
        "lblName": "lblName",
        "flxHederName": "flxHederName",
        "flxCreated": "flxCreated",
        "flxLastUpdate": "flxLastUpdate",
        "lblSeperator": "lblSeperator",
        "flxSegMain": "flxSegMain"
      };
      var toSegment = function (templates) {
        return {
          "imgOptions": "dots3x.png",
          "flxOptions": {
            "onClick": function () {
              self.toggleContextualMenu(self.view.listingSegmentClient.segListing, "flxCSRMessageTemplate");
              self.rowClickData = {
                tempId: templates.id,
                tempName: self.setSantizedStringToText(templates.Name, 1),
                tempBody: self.setSantizedStringToText(templates.Body, 1),
                tempNote: self.setSantizedStringToText(templates.AdditionalInfo, 1)
              };
            }
          },
          "lblCreated": self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(templates.creadtedts)),
          "lblLastUpdate": self.getLocaleDateAndTime(self.getDateInstanceFromDBDateTime(templates.lastmodifiedts)),
        //  "lblName": self.getXSSSanitizedString(templates.Name),
          "lblName":self.setSantizedStringToText(templates.Name, 1),
          "lblSeperator": "-",
          "template": "flxCSRMessageTemplate",
          "flxSegMain": {
            "onClick": function () {
              kony.print(kony.i18n.getLocalizedString("i18n.frmCSRController.accounts_EDIT_Message"));
              self.rowClickData = {
                tempId: templates.id,
                tempName: self.setSantizedStringToText(templates.Name, 1),
                tempBody: self.setSantizedStringToText(templates.Body, 1),
                tempNote: self.setSantizedStringToText(templates.AdditionalInfo, 1)
              };
              self.view.listingSegmentClient.segListing.onRowClick();
            }
          }
        };
      };
      var data = templates.map(toSegment);
      this.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
      this.view.listingSegmentClient.segListing.setData(data);
      //document.getElementById("frmCSR_flxLocationsSegment").onscroll = this.contextualMenuOff;
    }
    this.view.forceLayout();
  },
  contextualMenuOff: function(context) {
    if(this.view.listingSegmentClient.flxContextualMenu.isVisible){
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      let Segment = this.view.listingSegmentClient.segListing;
      let segData = Segment.data;
      segData[this.prevIndex].flxOptions.skin = "slFbox";
      Segment.setDataAt(segData[this.prevIndex],this.prevIndex);
    }
  },

  removeAttachment:function(name){
    var mediaId;
    for (var i =0; i < this.attchmentFiles.length; i++)
      if (this.attchmentFiles[i].file.name === name) {
        mediaId = this.attchmentFiles[i].mediaId;
        this.attchmentFiles.splice(i,1);
        break;
      }
    if(mediaId){
      var len = this.discardAttchments.length;
      this.discardAttchments[len]=mediaId;
    }
  },

  removeAlreadyAttached:function(){
    var destinationArray = Array.from(this.attchmentFiles);
    var len = destinationArray.length;
    for (var i =len-1; i >=0; i--){
      if (destinationArray[i].file.type !== undefined && destinationArray[i].file.type==="ae") {
        destinationArray.splice(i,1);
      }
    }
    return destinationArray;
  },

  deleteAllAttachments: function(){
    var mediaIds = [];
    for (var i =0; i < this.attchmentFiles.length; i++)
      mediaIds.push(this.attchmentFiles[i].mediaId);
    for (var i =0; i < this.discardAttchments.length; i++)
      mediaIds.push(this.discardAttchments[i]);
    this.presenter.discardMessageAttachments({"mediaIds" : mediaIds});
    this.attchmentFiles = [];
    this.discardAttchments = [];
  },

  getMediaIdList: function(){
    var mediaIdList = [];
    for (var i =0; i < this.attchmentFiles.length; i++)
      if(this.attchmentFiles[i].mediaId !== "" && this.attchmentFiles[i].mediaId !== null && this.attchmentFiles[i].mediaId !== undefined)
        mediaIdList.push(this.attchmentFiles[i].mediaId);
    return mediaIdList;
  },

  discardAttachmentID:function(name){
    var mediaId;
    for (var i =0; i < this.draftAttchmentFiles.length; i++){
      if (this.draftAttchmentFiles[i].fileName === name) {
        mediaId =  this.draftAttchmentFiles[i].mediaId;
        break;
      }
    }
    if(mediaId){
      var len = this.discardAttchments.length;
      this.discardAttchments[len]=mediaId;
    }
  },
  showAllTemplatePage: function (templates) {
    this.showListingPage();
    this.setTemplateData(templates.messagetemplate.filter(this.searchFilter).sort(this.sortBy.sortData));
  },
  showAllEmailTemplatePage: function (templates) {
    this.showNewEmailMessage();
    this.EmptyData();
    this.checkUploadedFiles();
    this.templateDropDown(templates.messagetemplate);
  },
  setEmailTemplateData: function (templates) {
    var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
    templates.messagetemplate[0].Body = templates.messagetemplate[0].Body.replace("&amp;", "&");
    messageDocument.getElementById("editor").innerHTML = this.setSantizedStringToText(templates.messagetemplate[0].Body, 1);
    messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
  },
  showNoResultPage: function () {
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.MessageFilter.FlexResult.isVisible = false;
    this.view.MessageFilter.FlexNoResult.isVisible = true;
    this.view.forceLayout();
  },
  showResultPage: function () {
    this.view.MessageFilter.FlexResult.isVisible = true;
    this.view.MessageFilter.FlexNoResult.isVisible = false;
  },
  showNoResultMyQueuePage: function () {
    kony.adminConsole.utils.hideProgressBar(this.view);
    this.view.myQueueMessageFilter.FlexResult.isVisible = false;
    this.view.myQueueMessageFilter.FlexNoResult.isVisible = true;
    this.view.forceLayout();
  },
  showMyQueueResultPage: function () {
    this.view.myQueueMessageFilter.FlexResult.isVisible = true;
    this.view.myQueueMessageFilter.FlexNoResult.isVisible = false;
  },
  trimData : function(message,count){
    if(message!==undefined && message!=="" && message.length>count){
      // To remove <BR> tag
      var msg =  message.replace(/[<]br[^>]*[>]/gi,"");
      return msg.substring(0, count)+"..";

      //      emailMessages.MessageAttachments[0].media_Name;
    }else{
      return message;
    }
  },
  //   assignPageList: function (pageData) {
  //     var selectedPage = Number(this.view.listingSegmentClient.pagination.lbxPagination.selectedKey) || 1;
  //     this.view.listingSegmentClient.pagination.lbxPagination.masterData = pageData;
  //     this.view.listingSegmentClient.pagination.lbxPagination.selectedKey = selectedPage;
  //   },
  //   gotoPage: function () {
  //     this.currentPage = this.view.listingSegmentClient.pagination.lbxPagination.selectedKey;
  //     this.loadPageData();
  //     this.view.listingSegmentClient.pagination.lbxPagination.selectedKey = this.currentPage;
  //   },
  //   getNumPerPage: function () {
  //     return this.view.subHeader.lbxPageNumbers.selectedKeyValue ?
  //       this.view.subHeader.lbxPageNumbers.selectedKeyValue[1] : "10";
  //   },
  //   nextPage: function () {
  //     if (this.nextPageDisabled) {
  //       return;
  //     }
  //     this.currentPage++;
  //     this.view.listingSegmentClient.pagination.lbxPagination.selectedKey = this.currentPage;
  //     this.loadPageData();
  //   },
  //   prevPage: function () {
  //     if (this.prevPageDisabled) {
  //       return;
  //     }
  //     this.currentPage--;
  //     this.view.listingSegmentClient.pagination.lbxPagination.selectedKey = this.currentPage;
  //     this.loadPageData();
  //   },
  searchData: function () {
    this.loadPageData();
  },
  searchFilter: function (Role) {
    var searchText = this.view.subHeader.tbxSearchBox.text;
    searchText = searchText.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").split(">").join("&gt").split("<").join("&lt");
    if (typeof searchText === 'string' && searchText.length > 0) {
      return Role.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },
  searchFilterAssignee: function (assigne) {
    this.sortBy = this.getObjectSorter('Name');
    var searchText;
    if(this.view.flxAssignPopup.isVisible){
      searchText = this.view.txtbxAssign.text;
      // searchText=searchText.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","");
      //  var searchTexting=searchText.split(">");
      // searchText = searchTexting.join("&gt");
      // searchTexting = searchText.split("<");
      // searchText = searchText.join("&lt");
    } else {
      searchText = this.view.MessageFilter.txtfldAssignTo.text;
      // searchText=searchText.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","");
      //  var searchTexting=searchText.split(">");
      // searchText = searchTexting.join("&gt");
      // searchTexting = searchText.split("<");
      // searchText = searchText.join("&lt");

    } 
    if (typeof searchText === 'string' && searchText.length > 0) {
      return assigne.Name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
    } else {
      return true;
    }
  },
  searchFilterReplied: function (assigne) {
    this.sortBy = this.getObjectSorter('Name');
    var searchText = this.view.MessageFilter.txtfldRepliedby.text;

    //     searchText=searchText.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","");
    //      var searchTexting=searchText.split(">");
    //       searchText = searchTexting.join("&gt");
    //       searchTexting = searchText.split("<");
    //       searchText = searchText.join("&lt");
    if (typeof searchText === 'string' && searchText.length > 0) {
      this.view.MessageFilter.richtextNoResult1.isVisible = false;
      this.view.MessageFilter.segRepliedOnDropdown.isVisible = true;
      return assigne.Name.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
    } else {
      this.view.MessageFilter.richtextNoResult2.isVisible = true;
      this.view.MessageFilter.segRepliedOnDropdown.isVisible = false;
      return true;
    } 
  },
  categoriesSegment: function (categoryData) {
    var listBoxData = [
      [kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Category"), kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Category")]
    ];
    var finalCategoryData = this.sortListBoxData(categoryData, "Name");
    for (var i = 0; i < finalCategoryData.length; i++) {
      listBoxData.push([finalCategoryData[i].id, finalCategoryData[i].Name]);
    }    
    this.view.MessageFilter.ListBoxCategory.masterData = listBoxData;
    this.view.myQueueMessageFilter.ListBoxCategory.masterData = listBoxData;
    this.view.Message.lstbocCategory.masterData = listBoxData;
    this.view.Message.lstbocCategory.selectedKey = "Select Category";
    this.view.forceLayout();
  },
  templateDropDown: function (templateData) {
    var listBoxData = [
      [kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Template"), kony.i18n.getLocalizedString("i18n.frmCSRController.Select_Template")]
    ];
    var finalMailData = this.sortListBoxData(templateData, "Name");
    for (var i = 0; i < finalMailData.length; i++) {
      listBoxData.push([finalMailData[i].id, finalMailData[i].Name]);
    }
    this.view.Message.lstboxMail.masterData = listBoxData;
    this.view.forceLayout();
  },
  sortListBoxData : function(listBoxData,sortParam){
    this.sortBy = this.getObjectSorter(sortParam); 
    var sortedData = listBoxData.sort(this.sortBy.sortData);
    return sortedData;
  },
  assignedToSegment: function (assignedData, method) {
    if (assignedData.length === 0) {
      if (method === kony.i18n.getLocalizedString("i18n.frmCSRController.Assign")) {
        this.view.MessageFilter.richtextNoResult1.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + this.view.MessageFilter.txtfldAssignTo.text.replace("<","&lt").replace(">","&gt").replace("&","&amp").replace("=","&eq").replace("alert","").split(">").join("&gt").split("<").join("&lt") + kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
        this.view.MessageFilter.richtextNoResult1.isVisible = true;
        this.view.MessageFilter.segAssignDropdown.isVisible = false;
      } else if (method === kony.i18n.getLocalizedString("i18n.frmCSRController.Replied")) {
        this.view.MessageFilter.richtextNoResult2.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + this.view.MessageFilter.txtfldRepliedby.text.replace("<","&lt").replace(">","&gt").replace("&","&amp") .replace("=","&eq").replace("alert","").split(">").join("&gt").split("<").join("&lt")+ kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
        this.view.MessageFilter.richtextNoResult2.isVisible = true;
        this.view.MessageFilter.segRepliedOnDropdown.isVisible = false;
      }
    } else {
      if (method === kony.i18n.getLocalizedString("i18n.frmCSRController.Assign")) {
        this.view.MessageFilter.richtextNoResult1.isVisible = false;
        this.view.MessageFilter.segAssignDropdown.isVisible = true;
      } else if (method === kony.i18n.getLocalizedString("i18n.frmCSRController.Replied")) {
        this.view.MessageFilter.richtextNoResult2.isVisible = false;
        this.view.MessageFilter.segRepliedOnDropdown.isVisible = true;
      }
      var dataMap = {
        "flxAssignUsers": "flxAssignUsers",
        "lblViewFullName": "lblViewFullName",
        "id": "id"
      };
      var toSegment = function (assignedData) {
        return {
          "lblViewFullName": assignedData.Name,
          "flxAssignUsers": "flxAssignUsers",
          "id": assignedData.User_id,
          "template": "flxAssignUsers"
        };
      };
      var data = assignedData.map(toSegment);
      this.view.MessageFilter.segAssignDropdown.widgetDataMap = dataMap;
      this.view.MessageFilter.segRepliedOnDropdown.widgetDataMap = dataMap;
      this.view.segUsers.widgetDataMap = dataMap;
      this.view.segUsers.setData(data);
      this.view.flxAssignDropdown.setVisibility(true);
      this.view.MessageFilter.segAssignDropdown.setData(data);
      this.view.MessageFilter.segRepliedOnDropdown.setData(data);

    }
  },
  assignedToSegmentPopup: function (assignedData) {
    if (assignedData.length === 0) {
      this.view.richtextNoResult.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + this.view.txtbxAssign.text + kony.i18n.getLocalizedString("i18n.frmCSRController._Try_with_another_keyword");
      this.view.richtextNoResult.isVisible = true;
      this.view.segUsers.isVisible = false;
    } else {
      this.view.richtextNoResult.isVisible = false;
      this.view.segUsers.isVisible = true;
      var dataMap = {
        "flxAssignUsers": "flxAssignUsers",
        "lblViewFullName": "lblViewFullName",
        "id": "id"
      };
      var toSegment = function (assignedData) {
        return {
          "lblViewFullName": assignedData.Name,
          "flxAssignUsers": "flxAssignUsers",
          "id": assignedData.User_id,
          "template": "flxAssignUsers"
        };
      };
      this.view.flxAssignDropdown.setVisibility(true);
      var data = assignedData.map(toSegment);
      this.view.segUsers.widgetDataMap = dataMap;
      this.view.segUsers.setData(data);
      this.view.forceLayout();
    }
  },
  setCustomerSegment: function (customers, incomingPriority) {
    //Check for incoming priority
    var info = this.view.Message.segFilterDropdown.info;
    if(info && info.segmentPriority && (info.segmentPriority > incomingPriority || incomingPriority < this.CustomerSuggestionsPriority) ){
      return;
    }else{
      this.view.Message.segFilterDropdown.info = {"segmentPriority":incomingPriority};
    }

    if (customers.length === 0) {
      this.view.Message.richtextNoResult.isVisible = true;
      this.view.Message.segFilterDropdown.isVisible = false;
    } else {

      var dataMap = {
        "flxFullName": "flxFullName",
        "flxUserName": "flxUserName",
        "lblSeperator": "lblSeperator",
        "flxAssignUsers": "flxAssignUsers",
        "lblViewFullName": "lblViewFullName",
        "lblUserName": "lblUserName",
        "type":"type"
      };
      var toSegment = function (customers) {
        var subText = "",type ="";
        if(customers.isService && customers.isService === true){
          subText = kony.i18n.getLocalizedString("i18n.frmCSRController.Service");
          type = kony.i18n.getLocalizedString("i18n.frmCSRController.Service");
        }else if(customers.isServiceType && customers.isServiceType === true){
          subText = kony.i18n.getLocalizedString("i18n.frmCSRController.ServiceType");
          type = kony.i18n.getLocalizedString("i18n.frmCSRController.ServiceType");
        }else{
          subText = kony.i18n.getLocalizedString("i18n.frmGroupsController.Username")+ ": "+customers.UserName;
          type = kony.i18n.getLocalizedString("i18n.frmGroupsController.Username");
        }
        return {
          "lblViewFullName": customers.FirstName !== undefined ? customers.FirstName + " " + customers.LastName : customers.UserName,
          "flxAssignUsers": "flxAssignUsers",
          "flxFullName": "flxFullName",
          "flxUserName": "flxUserName",
          "lblSeperator": "-",
          "id": customers.id,
          "lblUserName": subText,
          "username": customers.UserName,
          "fname": customers.FirstName,
          "lname": customers.LastName,
          "type": type,
          "template": "flxsegCustomerGroup"

        };
      };
      var data = customers.map(toSegment);
      this.view.Message.segFilterDropdown.widgetDataMap = dataMap;
      this.view.Message.segFilterDropdown.setData(data.slice(0,20));
      this.view.Message.richtextNoResult.isVisible = false;
      this.view.Message.richTxtTopSuggestions.setVisibility(true);
      this.view.Message.segFilterDropdown.isVisible = true;
    }
    this.view.Message.forceLayout();
    this.view.Message.flxCSRInnerLoading.setVisibility(false);
  },
  showUploadedDocument:function(){
    var scopeObj = this;
    for(var ii=0; ii<scopeObj.attchmentFiles.length; ++ii){
      scopeObj.view.Message.flxAttatchments.isVisible=true;
      scopeObj.view.Message.flxAttatchments.bottom="80px";
      //var rtxMessageHeight = scopeObj.view.Message.rtxMessage.height;
      scopeObj.view.Message.rtxMessage.height = "90%"; //parseInt(rtxMessageHeight.substring(0, rtxMessageHeight.length-2), 10) - 50 + "px";
      scopeObj.view.forceLayout();
      scopeObj.attachmentDraft=true;
      if(ii===0){
        scopeObj.view.Message.flxAttatchment1.isVisible=true;
        scopeObj.view.Message.lblAttatchmnet1.text=scopeObj.trimData(scopeObj.attchmentFiles[ii].file.name,31);
        scopeObj.view.Message.lblAttatchmnet1.toolTip=scopeObj.attchmentFiles[ii].file.name;
      }
      else if(ii===1){ 
        scopeObj.view.Message.flxAttatchment2.isVisible=true;
        scopeObj.view.Message.lblAttatchmnet2.text=scopeObj.trimData(scopeObj.attchmentFiles[ii].file.name,31);
        scopeObj.view.Message.lblAttatchmnet2.toolTip=scopeObj.attchmentFiles[ii].file.name;
      }
      else if(ii===2){
        scopeObj.view.Message.flxAttatchment3.isVisible=true;
        scopeObj.view.Message.lblAttatchmnet3.text=scopeObj.trimData(scopeObj.attchmentFiles[ii].file.name,31);
        scopeObj.view.Message.flxAttatchment3.setFocus(true);
        scopeObj.view.Message.lblAttatchmnet3.toolTip=scopeObj.attchmentFiles[ii].file.name;
      }
      else if(ii===3){

        scopeObj.view.Message.flxAttatchment4.isVisible=true;
        scopeObj.view.Message.lblAttatchmnet4.text=scopeObj.trimData(scopeObj.attchmentFiles[ii].file.name,31);
        scopeObj.view.Message.lblAttatchmnet4.toolTip=scopeObj.attchmentFiles[ii].file.name;

      }
      else if(ii===4){

        scopeObj.view.Message.flxAttatchment5.isVisible=true;
        scopeObj.view.Message.lblAttatchmnet5.text=scopeObj.trimData(scopeObj.attchmentFiles[ii].file.name,31);
        scopeObj.view.Message.flxAttatchment5.setFocus(true);
        scopeObj.view.Message.lblAttatchmnet5.toolTip=scopeObj.attchmentFiles[ii].file.name;
      }
      scopeObj.view.flxLoading.zIndex = 90;
      scopeObj.view.forceLayout();
    }
  },


  uploadDocuments: function (c) {
    kony.print("Inside uploaddocument() of frmCSRController");
    var scopeObj = this;
    scopeObj.view.Message.flxErrorMessage.zIndex=100;
    scopeObj.view.Message.flxErrorMessage.isVisible=false;
    scopeObj.view.flxLoading.zIndex = 150;
    scopeObj.view.forceLayout();
    var config = {
      selectMultipleFiles: true,
      // filter: ["image/png", "image/jpeg", "image/tiff"]
    };
    kony.io.FileSystem.browse(config, docCallback);

    function docCallback(event, filesList) {
      var flag=true;
      var fileListCount = filesList.length;
      var filenameRegex = /^[a-zA-Z0-9]{1,200}\.[a-zA-Z0-9]{1,10}$/;
      var totalFileCount = filesList.length +scopeObj.attchmentFiles.length;
      if(totalFileCount>5){
        scopeObj.view.Message.flxErrorMessage.isVisible=true;
        scopeObj.view.Message.lblErrormsg.text=kony.i18n.getLocalizedString("i18n.frmCSRController.Attachment_Min_Message");
        return false;
      }
      for (var i = 0; i < fileListCount; ++i) {
        var fileType = filesList[i].name;
        var fileSize = filesList[i].size;
        fileType = fileType.substring(fileType.lastIndexOf(".") + 1);

        if (parseInt(fileSize, 10) > 1000000) {
          //scopeObj.view.flxPopUpWarning.setVisibility(true);
          scopeObj.view.Message.lblErrormsg.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Attachment_Max_Message");
          scopeObj.view.Message.flxErrorMessage.isVisible = true;
          // scopeObj.view.RichTextDisclaimer2.text = kony.i18n.getLocalizedString("i18n.frmCSRController.A_file_be_in_size");
          scopeObj.view.forceLayout();
          flag = false;
          break;
        }
        //Check for malicious file upload
        if (!filenameRegex.test(filesList[i].name)) {
          scopeObj.view.Message.lblErrormsg.text = kony.i18n.getLocalizedString("i18n.frmCSRController.CreateRequestFailedInvalidFilename");
          scopeObj.view.Message.flxErrorMessage.isVisible = true;
          scopeObj.view.forceLayout();
          flag = false;
          break;
        }
        //check for file type
        if(!scopeObj.checkFileTypeSupport(fileType)){
          scopeObj.view.Message.lblErrormsg.text = kony.i18n.getLocalizedString("i18n.ach.uploadTypeFailure");
          scopeObj.view.Message.flxErrorMessage.isVisible = true;
          scopeObj.view.forceLayout();
          flag = false;
          break;
        }
      }

      if (flag === true) {
        /*if (c == 1) {
          scopeObj.showUploadingIndicator();
        } else {
          scopeObj.showUploadingIndicator2();
        }*/
        for (var k = 0; k < event.target.files.length; ++k) {
          scopeObj.getBase64File(event.target.files[k]);
        }  
      } else {
        return false;
      }
    }
  },

  getBase64File: function(file) {
    var scopeObj = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      kony.print(reader.result);
      var content = reader.result.substring(reader.result.indexOf(",")+1);
      var payload = {
        "content": btoa(content),
        "file": file
      };
      scopeObj.presenter.createMedia(payload);
    };
    reader.onerror = function (error) {
      kony.print('Error: ', error);
    };
  },

  checkFileTypeSupport: function(fileType){
    var allSupportedFileTypes = ["txt", "png", "jpg", "jpeg", "doc", "docx", "pdf"];
    for(var i=0; i<allSupportedFileTypes.length; i++){
      var type = allSupportedFileTypes[i];
      if(fileType === type || fileType.toLowerCase() === type)
        return true;
    }
    return false;
  },

  getMediaContent: function (mediaId, mediaName) {
    var payload = {
      "mediaId" : mediaId,
      "mediaName" : mediaName
    };
    this.presenter.getMediaContent(payload);
  },

  downloadAttachment: function (fileName, fileContent) {
    var element = document.createElement('a');
    var base64file =  fileContent? this.getBase64DataType(fileName.substring(fileName.lastIndexOf(".") + 1)) + fileContent : this.getBase64DataType("txt") + btoa("Failed to fetch file content.");
    element.setAttribute("href", base64file);
    element.setAttribute("download", fileName);

    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },

  getBase64DataType: function(fileType){
    if(fileType === "txt" || fileType.toLowerCase() === "txt")
      return "data:text/plain;base64,";
    else if(fileType === "png" || fileType.toLowerCase() === "png")
      return "data:image/png;base64,";
    else if(fileType === "jpg" || fileType === "jpeg" || fileType.toLowerCase() === "jpg" || fileType.toLowerCase() === "jpeg")
      return "data:image/jpeg;base64,";
    else if(fileType === "doc" || fileType.toLowerCase() === "doc")
      return "data:application/msword;base64,";
    else if(fileType === "docx" || fileType.toLowerCase() === "docx")
      return "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,";
    else if(fileType === "pdf" || fileType.toLowerCase() === "pdf")
      return "data:application/pdf;base64,";
    else if(fileType === "csv" || fileType.toLowerCase() === "csv")
      return "data:application/vnd.ms-excel;base64,";
  },

  removeScript: function (inputData) {
    //var editorText = "<span>abcde<p>aaa</p></span>";
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = inputData;
    var editorTextWithoutElements = String(tempDiv.innerText);
    return editorTextWithoutElements;
  }, 


  showUploadingIndicator: function () {
    kony.print("Inside showUploadingIndicator() of frmSecureImageController");
    this.imgUploadVal = 0;
    kony.timer.schedule("mytimer1", this.callBackTimer2.bind(this), 3, false);
    this.view.flxUploadingIndiacatorKA.setVisibility(true);
    this.view.flxBrowseOrDrag.setVisibility(false);
    this.view.forceLayout();
  },
  showUploadingIndicator2: function () {
    kony.print("Inside showUploadingIndicator2() of frmSecureImageController");
    this.imgUploadVal = 1;
    kony.timer.schedule("mytimer1", this.callBackTimer2.bind(this), 3, false);
    this.view.flxUploadingIndiacator2KA.setVisibility(true);
    this.view.flxBrowseOrDrag2.setVisibility(false);
    this.view.forceLayout();
  },

  willUpdateUI: function (viewModel) {

    if(typeof viewModel.showLoading!=='undefined'){
      if(viewModel.showLoading===true) {
        kony.adminConsole.utils.showProgressBar(this.view);
      } else {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.flxLoading.zIndex = 90;
      }
    }

    if (viewModel) {
      this.updateLeftMenu(viewModel);
      if (viewModel.action === "myQueueRequests") {
        this.updateMyHeaderCount(viewModel.messages, viewModel.messages.requestsSummary.MY_QUEUE);
        this.showMyQueueMessages(viewModel.messages.records, viewModel.messages.requestsSummary.MY_QUEUE);
      } else if (viewModel.action === "allTemplates") {
        this.sortBy = this.getObjectSorter('Name');
        this.determineSortFontIcon(this.sortBy,"Name",this.view.fontIconUsersHeaderName);
        this.resetSortImages();
        this.loadPageData = function () {
          if (viewModel.templates.messagetemplate.length === 0) {
            this.view.mainHeader.btnAddNewOption.onClick("noData");
            this.view.forceLayout();
          } else {

            this.showAllTemplatePage(viewModel.templates);
          }

          //           if(this.nextPageDisabled){
          //               this.view.listingSegmentClient.pagination.flxNext.hoverSkin ="sknDisableCursor";
          //               this.view.listingSegmentClient.pagination.lblIconNext.skin="sknFontIconPrevNextDisable";
          //             }else{
          //               this.view.listingSegmentClient.pagination.flxNext.hoverSkin ="sknCursor";
          //               this.view.listingSegmentClient.pagination.lblIconNext.skin= "sknFontIconPrevNextPage";
          //             }
          //             if(this.prevPageDisabled){
          //               this.view.listingSegmentClient.pagination.flxPrevious.hoverSkin ="sknDisableCursor";
          //               this.view.listingSegmentClient.pagination.lblIconPrevious.skin="sknFontIconPrevNextDisable";
          //             }else{
          //               this.view.listingSegmentClient.pagination.flxPrevious.hoverSkin ="sknCursor";
          //                this.view.listingSegmentClient.pagination.lblIconPrevious.skin="sknFontIconPrevNextPage";
          //             }

        };
        this.loadPageData();
        kony.adminConsole.utils.hideProgressBar(this.view);
      } else if (viewModel.action === "allEmailTemplates") {
        this.sortBy = this.getObjectSorter('Name');
        this.loadPageData = function () {
          this.showAllEmailTemplatePage(viewModel.templates);
        };
        this.loadPageData();
      } else if (viewModel.action === "emailTemplates") {
        this.sortBy = this.getObjectSorter('Name');
        this.loadPageData = function () {
          this.templateDropDown(viewModel.templates.messagetemplate);
        };
        this.loadPageData();
      } else if (viewModel.action === "TemplateDetails") {
        this.setEmailTemplateData(viewModel.templates);

      } else if (viewModel.action === "SID_ARCHIVED") {
        this.updateHeaderCount(viewModel.messages, viewModel.messages.requestsSummary.SID_ARCHIVED);
        this.showArchivedMessages(viewModel.messages.records,viewModel.messages.requestsSummary.SID_ARCHIVED);
      } else if (viewModel.action === "SID_INPROGRESS") {
        this.updateHeaderCount(viewModel.messages, viewModel.messages.requestsSummary.SID_INPROGRESS);
        this.showInProgressMessages(viewModel.messages.records,viewModel.messages.requestsSummary.SID_INPROGRESS);
      } else if (viewModel.action === "SID_RESOLVED") {
        this.updateHeaderCount(viewModel.messages, viewModel.messages.requestsSummary.SID_RESOLVED);
        this.showResolvedMessages(viewModel.messages.records, viewModel.messages.requestsSummary.SID_RESOLVED);
      } else if (viewModel.action === "SID_OPEN" || (viewModel.action && viewModel.action[0] === "SID_OPEN")) {

        this.updateHeaderCount(viewModel.messages, viewModel.messages.requestsSummary.SID_OPEN);
        this.showNewMessagesPage(viewModel.messages.records, viewModel.messages.requestsSummary.SID_OPEN);
      } else if (viewModel.action === "searchRequests") {
        if (viewModel.messages.records.length > 0) {
          this.updateHeaderCount(viewModel.messages, viewModel.messages.records.length);
          this.showResultPage();
          this.setRequestsSegmentData(viewModel.messages.records);
        } else {
          this.showNoResultPage();
        }
      } else if (viewModel.action === "searchMyRequests") {
        if (viewModel.messages.records.length > 0) {
          this.updateMyHeaderCount(viewModel.messages, viewModel.messages.records.length);
          this.showMyQueueResultPage();
          this.setMyRequestSegmentData(viewModel.messages.records);
        } else {
          this.showNoResultMyQueuePage();
        }
      } else if (viewModel.action === "emailMessages") {
        this.showEmailMessages(viewModel.emailMessages, viewModel.msgStatus, viewModel.requestId, viewModel.subject,viewModel.isPriorityMessage);
      } else if (viewModel.action === "createMessage") {
        this.sentEmailMessages(viewModel);
      } else if (viewModel.action === "draftMessage") {
        this.draftEmailMessages(viewModel.message);
      } else if (viewModel.action === "discardMessage") {
        var messageDocument = document.getElementById("iframe_rtxMessage").contentWindow.document;
        messageDocument.getElementById("editor").innerHTML = "";
        messageDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "-180px";
        this.discardEmailMessages();
      } else if (viewModel.action === "updateRequestStatus") {
        this.updateRequestStatus(viewModel.currentStatus);
      } else if (viewModel.action === "updateAssignTo") {
        this.updateAssignTo();
      } else if (viewModel.action === "assigendTo") {
        this.assignedToSegment(viewModel.messages);
      } else if (viewModel.action === "searchedTemplates") {
        this.setTemplateData(viewModel.templates);
      } else if (viewModel.CustomerSuggestions) {

        if(document.getElementById("frmCSR_Message_flxFilter")) {
          document.getElementById("frmCSR_Message_flxFilter").style.display = "block";
        }
        this.view.Message.flxFilter.isVisible = true;
        this.view.MessageFilter.flxRepliedOnDropdown.isVisible = false;
        this.setCustomerSegment(viewModel.CustomerSuggestions, viewModel.CustomerSuggestionsPriority); 
        this.view.forceLayout();

      }
      if (viewModel.users) {
        // Fetching requests first time

        this.userData = viewModel.users.templates.internalusers_view;
        this.loadUsersData = function (method) {
          this.sortBy = this.getObjectSorter('Name');
          if (method === kony.i18n.getLocalizedString("i18n.frmCSRController.Assign"))
            this.assignedToSegment((viewModel.users.templates.internalusers_view).filter(this.searchFilterAssignee).sort(this.sortBy.sortData), kony.i18n.getLocalizedString("i18n.frmCSRController.Assign"));
          else if (method === kony.i18n.getLocalizedString("i18n.frmCSRController.Replied"))
            this.assignedToSegment((viewModel.users.templates.internalusers_view).filter(this.searchFilterReplied).sort(this.sortBy.sortData), kony.i18n.getLocalizedString("i18n.frmCSRController.Replied"));
        };
        this.loadUsersData();
      }
      if (viewModel.categories) {
        this.categoriesSegment(viewModel.categories.templates.requestcategory);
        //this.fetchRequestFirstTime();
      }
      if(viewModel.isKeyCloakEnabled){        
        this.isKeyCloakEnabled=viewModel.isKeyCloakEnabled;
        this.view.MessageFilter.lblIconAssignedTo.setVisibility(!(this.isKeyCloakEnabled));
      }
      if (viewModel.requests) {
        kony.adminConsole.utils.hideProgressBar(this.view);
        var params = viewModel.requests.params;
        this.searchParam = params;

        // this.currentPage=1;
        this.lastAppend=0;
        if(params.requestCategory!==undefined){
          this.view.MessageFilter.ListBoxCategory.selectedKey=params.requestCategory;
          this.dashBoardReq=true;
          this.view.forceLayout();
        }
        if(params.requestStatusID!==undefined && viewModel.requests.params.requestStatusID.length===1){
          this.view.myQueueMessageFilter.ListBoxStatus.selectedKey=params.requestStatusID[0];
          this.dashBoardReq=true;
          this.view.forceLayout();
        }else{
          this.view.myQueueMessageFilter.ListBoxStatus.selectedKey=this.view.myQueueMessageFilter.ListBoxStatus.masterData[0][0];
        }
        if(viewModel.requests.action==="MyQueue"){ 

          this.updateMyHeaderCount(viewModel.requests.messages,viewModel.requests.messages.records.length);
          this.showMyQueueMessages(viewModel.requests.messages.records);
        } else {
          if (params.isFirstTime){
            this.resetDataFields();
            this.updateHeaderCount(viewModel.requests.messages, viewModel.requests.messages.requestsSummary.SID_OPEN);
          } else{
            this.updateHeaderCount(viewModel.requests.messages, viewModel.requests.messages.records.length);
          }
          this.showNewMessagesPage(viewModel.requests.messages.records);
        }

        var requestFromCustomerModule = this.presenter.getRequestFromCustomerModule();
        if(requestFromCustomerModule){
          kony.adminConsole.utils.showProgressBar(this.view);
          if(requestFromCustomerModule.customPayload.assignTo){
            this.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + requestFromCustomerModule.customPayload.assignTo;
          }else{
            this.view.editMessages.lblAssign.text = "";
          }

          if(requestFromCustomerModule.customPayload.currentStatus==="SID_INPROGRESS")
            this.showInProgressScreen(false);
          if(requestFromCustomerModule.customPayload.currentStatus==="SID_RESOLVED")
            this.showResolvedScreen(false);
          this.selectedRequestId = requestFromCustomerModule.customPayload.customerrequest_id;
          this.view.MessageFilter.SegSearchResult.info = this.toCustomerRequestSegment( requestFromCustomerModule.customPayload );
          this.presenter.fetchEmailMessages(requestFromCustomerModule.requestIdParam, requestFromCustomerModule.customPayload.currentStatus, requestFromCustomerModule.customPayload.customerrequest_id, 
                                            this.getXSSSanitizedString(requestFromCustomerModule.customPayload.customerrequest_RequestSubject), false);
          this.presenter.setRequestFromCustomerModule(null);
        }
      }
      if (viewModel.action === "createMedia") {
        this.attchmentFiles.push(viewModel.mediaObj);
        this.showUploadedDocument();
      }
      if (viewModel.action === "getMediaContent") {
        this.downloadAttachment(viewModel.mediaName, viewModel.mediaContent);
      }
      if (viewModel.toast) {
        kony.adminConsole.utils.hideProgressBar(this.view);
        if (viewModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.view.toastMessage.showToastMessage(viewModel.toast.message, this);
        } else {
          this.view.toastMessage.showErrorToastMessage(viewModel.toast.message, this);
        }
      }
    }
    this.view.forceLayout();
  },
  toggleCheckbox: function() {
    var scopeObj = this;
    var length = 0;
    var path = (scopeObj.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) ? scopeObj.view.myQueueMessageFilter : scopeObj.view.MessageFilter;
    var index = path.SegSearchResult.selectedIndices;
    if (index !== null) {
      length = index[0][1].length;
    }
    var data = path.SegSearchResult.data;
    var currIndex = path.SegSearchResult.currentIndex[1];
    var currRow = path.SegSearchResult.data[currIndex];
    var reqId = currRow.lblRequestID.text;
    if (length>0 && index[0][1].contains(currIndex)) {
      if (this.selectedRequestIds.indexOf(reqId) < 0) this.selectedRequestIds.push(reqId);
    } else this.removeUnselectRequestIdsFromList(currRow.lblRequestID.text);
    if (this.selectedRequestIds.length > 0) {
      path.lblRowHeader1.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Selected_Messages") + " " + this.selectedRequestIds.length;
      path.flxAssignTo.setVisibility(true);
    } else {
      path.lblRowHeader1.text = kony.i18n.getLocalizedString("i18n.frmCSRController.TOTAL_MESSAGES") + " " + scopeObj.totalMessages;
      path.flxAssignTo.setVisibility(false);
    }
    if (index !== null && data.length === index[0][1].length) path.imgCheckBox.src = "checkboxselected.png";
    else path.imgCheckBox.src = "checkbox.png";
    scopeObj.view.forceLayout();
  },
  onMessageFilterRowClick : function () {
    var scopeObj = this;
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    scopeObj.view.MessageFilter.FlexContextMenu.isVisible=false;
    var requestId = scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].lblRequestID.text;
    var subject = scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].lblSubject.text;
    var isPriorityMessage =scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].imgMsgIcon.isVisible;
    var requestIdParam = {
      "requestID": requestId
    };
    var lblStatus = scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].lblStatus;
    scopeObj.selectedRequestId = requestId;
    var asnTo=scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].lblAssignto.tooltip;
    if(asnTo === null || asnTo.trim() === ""){
      scopeObj.view.editMessages.lblAssign.text = "";
    }
    else{
      scopeObj.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].lblAssignto.tooltip;
    }
    // scopeObj.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + scopeObj.view.MessageFilter.SegSearchResult.selectedItems[0].lblAssignto;
    scopeObj.presenter.fetchEmailMessages(requestIdParam, lblStatus, requestId, subject,isPriorityMessage);
  },
  onMyQueueMessageFilterClick : function() {
    var scopeObj = this;
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    scopeObj.view.myQueueMessageFilter.FlexContextMenu.isVisible=false;
    var requestId = scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedItems[0].lblRequestID.text;
    var subject = scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedItems[0].lblSubject.text;
    var isPriorityMessage = scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedItems[0].imgMsgIcon.isVisible;
    var requestIdParam = {
      "requestID": requestId
    };
    var lblStatus = scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedItems[0].lblStatus;
    scopeObj.selectedRequestId = requestId;
    scopeObj.view.editMessages.lblAssign.text = kony.i18n.getLocalizedString("i18n.frmCSRController.ASSIGN_TO") + scopeObj.view.myQueueMessageFilter.SegSearchResult.selectedItems[0].lblAssignto;
    scopeObj.presenter.fetchEmailMessages(requestIdParam, lblStatus, requestId, subject,isPriorityMessage); //getRequestMessages
  },
  selectAllRows : function(){
    var path =(this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) ? this.view.myQueueMessageFilter : this.view.MessageFilter;
    path.FlexContextMenu.isVisible = false;
    var data = path.SegSearchResult.data;
    var index =path.SegSearchResult.selectedIndices;
    if (index === null) {
      path.SegSearchResult.selectedIndices = null;
    }
    var limit = data.length;
    var indices = [[0, []]];
    if (path.imgCheckBox.src === "checkbox.png") {
      for (var i = 0; i < limit; i++) {
        indices[0][1].push(i);
      }
      path.flxAssignTo.setVisibility(true);
      path.imgCheckBox.src = "checkboxselected.png";
      path.SegSearchResult.selectedRowIndices = indices;
      this.addSelectedRequestIdsToList();
      path.lblRowHeader1.text = kony.i18n.getLocalizedString("i18n.frmCSRController.Selected_Messages") + " " + this.selectedRequestIds.length;

    } 
    else{
      path.SegSearchResult.selectedIndices = null;
      path.imgCheckBox.src = "checkbox.png";
      for (var j = 0; j < limit; j++) {
        this.removeUnselectRequestIdsFromList(data[j].lblRequestID.text);
      }
      path.flxAssignTo.setVisibility(this.selectedRequestIds.length>0);
      path.lblRowHeader1.text = (this.selectedRequestIds.length>0)?(kony.i18n.getLocalizedString("i18n.frmCSRController.Selected_Messages") + " " + this.selectedRequestIds.length):(kony.i18n.getLocalizedString("i18n.frmCSRController.TOTAL_MESSAGES") + " " + this.totalMessages);
    }
    this.view.forceLayout();
  },
  /*
   * add current page selected messages to list
   */
  addSelectedRequestIdsToList : function(){
    var self = this;
    var reqId ="";
    var path =(this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) ? this.view.myQueueMessageFilter : this.view.MessageFilter;
    var selRowData = path.SegSearchResult.selectedRowItems || null;
    if(selRowData){
      for(var i=0;i< selRowData.length; i++){
        reqId =selRowData[i].lblRequestID.text;
        if(self.selectedRequestIds.indexOf(reqId) < 0){
          self.selectedRequestIds.push(reqId);
        }
      }
    }
  },
  /*
   * remove requestId from selected list
   * @param: customerId
   */
  removeUnselectRequestIdsFromList : function(reqId){
    var self =this;
    var index = self.selectedRequestIds.indexOf(reqId);
    if(index >= 0){
      self.selectedRequestIds.splice(index,1);
    } 
  },
  /*
   * select the page requestid which were selected previously before scroll
   * @param: segment page data
   */
  selectPreviouslySelectedRequests: function(data) {
    var self = this;
    var selInd = [];
    for (var i = 0; i < data.length; i++) {
      if ((self.selectedRequestIds).indexOf(data[i].lblRequestID.text) >= 0) {
        selInd.push(i);
      }
    }
    var path = (this.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) ? this.view.myQueueMessageFilter : this.view.MessageFilter;
    if(data.length>selInd.length)
      path.imgCheckBox.src = "checkbox.png";	
    else
      path.imgCheckBox.src = "checkboxselected.png";	

    if (selInd.length > 0) {
      path.SegSearchResult.selectedRowIndices = [
        [0, selInd]
      ];
    } else {
      path.SegSearchResult.selectedRowIndices = "";
    }
    path.lblRowHeader1.text = (self.selectedRequestIds.length > 0) ? (kony.i18n.getLocalizedString("i18n.frmCSRController.Selected_Messages") + " " + self.selectedRequestIds.length)
    :kony.i18n.getLocalizedString("i18n.frmCSRController.TOTAL_MESSAGES") + " " + self.totalMessages;
  },
  hideCustomerIdColumn : function(){
    var self = this;
    self.view.MessageFilter.flxCustomerId.isVisible=false;
    self.view.myQueueMessageFilter.flxCustomerId.isVisible=false;
    var width = self.segmentWidth-120-15;
    self.view.MessageFilter.flxHeader.width= width+"px";
    self.view.myQueueMessageFilter.flxHeader.width= width+"px";
    self.view.MessageFilter.flxSegSearchResult.width= width+"px";
    self.view.myQueueMessageFilter.flxSegSearchResult.width= width+"px";
    self.view.MessageFilter.lblCustHeaderSeperator.width= (width-20)+"px";
    self.view.myQueueMessageFilter.lblCustHeaderSeperator.width= (width-20)+"px";
    self.segmentWidth=width;
  },
  // Checkbox has to be hidden for Resolved Messages
  setWidthForMessages : function(){
    var self = this;
    var width;
    var path = (self.view.mainHeader.lblHeading.text === kony.i18n.getLocalizedString("i18n.frmCSRController.My_Queue")) ? self.view.myQueueMessageFilter : self.view.MessageFilter;
    //In Resolved screen
    if(self.view.detailHeader.flxSelected3.isVisible){
      width=self.segmentWidth - 50 -30;
      path.flxCheckbox.isVisible=false;
    }
    else{
      width=self.segmentWidth;
      path.flxCheckbox.isVisible=true;
    }
    //When resolution is more subject column to be increased
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var calSegWidth=screenWidth-305-70-20;
    var diff=width-calSegWidth;
    if(diff<0){
      diff=calSegWidth-width;
      width=width+diff;
      path.flxSubject.width=(180+diff)+"px";
    }
    else path.flxSubject.width=180+"px";

    path.flxHeader.width= width+"px";
    path.flxSegSearchResult.width= width+"px";
    path.lblCustHeaderSeperator.width= (width-20)+"px";
  },
  /*
  * to check if any tags  are existing in message other then the one supported by richtext editor
  * @param: message text
  * @returns: true/false
  */
  checkForAcceptedTags : function(htmlText){
    var regex = /<\/?[^(a|i|u|b|br|div|span|ul|li|table|tbody|tr|th|td|font|blockquote|h1|h2|h3|h4|p|img|/)]>*/g;
    var fomratedHtmlStr = this.setSantizedStringToText(htmlText,2);
    var matchArr = fomratedHtmlStr.match(regex);
    var isInValid = false;
    if(matchArr && matchArr.length > 0){
      return true;//invalid tag exists
    }
    var executableKeywords = this.AdminConsoleCommonUtils.executableHtmlKeywords;
    let threatExists = executableKeywords.find((key) => htmlText.indexOf(key)>= 0);
    if(threatExists && threatExists.length > 0){
      isInValid = true;
    }
    return isInValid;
  }

});

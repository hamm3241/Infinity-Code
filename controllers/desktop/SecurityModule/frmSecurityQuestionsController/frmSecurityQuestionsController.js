define({
  segMainSectionIndex: 0,
  segMainRowIndex: 0,
  mouseYCoordinate: 0,
  records:0,
  listOfQuestions:null,
  finalQuestionsdata: [],
  flag: 0,
  filterIndiciesArray: [0, 1],
  prevIndex : -1,

  willUpdateUI: function(context) {
    this.updateLeftMenu(context);
    if (context === undefined);
    else {
      if (context.questions) {
        var scopeObj = this;
        this.sortBy = this.getObjectSorter("SecurityQuestion_Status");
        this.listOfQuestions= context.questions;
        var questions = context.questions;
        this.loadPageData = function() {
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.setSecurityQuestionsSegmentData(questions.sort(scopeObj.sortBy.sortData));
          kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        };
        this.loadPageData();
      }
      if (context.action === "showQuestions") {
        this.showQuestionsUI(context);
        kony.adminConsole.utils.hideProgressBar(this.view);
      } else if (context.action === "addedNewQuestions") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.addedNewQuestionsUI(context);
      } else if (context.action === "changedStatus") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.toggleQuestionStatus();

        if (context.isActive) {
          this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Security_Question_activated_successfully"), this);
        } else {
          this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Security_Question_deactivated_successfully"), this);
        }
      } else if (context.action === "deletedSuccesfull") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Question_deleted_successfully"), this);
      } else if (context.action === "addedNewQuestionsFailed") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } else if (context.action === "changedStatusFailed") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        if (context.isActive) {
          this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Failed_to_activate"), this);
        } else {
          this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Failed_to_deactivate"), this);
        }
      } else if (context.action === "deletedUnSuccesfull") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.flxPopUpWrapper.setVisibility(false);
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } else if(context.action === "showLoadingScreen"){
        kony.adminConsole.utils.showProgressBar(this.view);
      } else if(context.action === "hideLoadingScreen"){
        kony.adminConsole.utils.hideProgressBar(this.view);
      }
    }
    this.view.forceLayout();
  },

  showQuestionsUI: function(context) {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.hideAll();
    if (context.questions.length !== 0) {
      this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
      this.showMainHeaderButtons();
      this.view.flxSecurityQuestionsWrapper.setVisibility(true);
      this.view.flxMainSubHeader.setVisibility(true);
      this.view.flxSegmentWrapper.setVisibility(true);
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      this.setSecurityQuestionsSegmentData(context.questions);
      kony.adminConsole.utils.hideProgressBar(this.view);
    } else {
      this.hideMainHeaderButtons();
      this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      this.view.flxNoQuestionsCreatedWrapper.setVisibility(true);
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
  },
  addedNewQuestionsUI: function() {
    this.view.toastMessage.flxToastContainer.skin = "sknflxSuccessToast1F844D";
    this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.SecurityQuestions.SecurityQuestionsavedsuccessfully"), this);
    this.addQuestionDataToSegment();
    this.showCreatedQuestions();
  },

  //preshow
  usersPreShow: function() {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.setHeaderTextAndButtons();
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.subHeader.tbxSearchBox.text = "";
    this.view.subHeader.flxClearSearchImage.setVisibility(false);
    this.view.flxMain.height = kony.os.deviceInfo().screenHeight + "px";
    this.view.flxMainContent.height = (kony.os.deviceInfo().screenHeight - 106 - 10) +"px";
    this.view.flxSegmentWrapper.height = (kony.os.deviceInfo().screenHeight - 106 - 10 - 63 - 20) + "px";
    this.view.flxViewSecurityQuestionsSegment.height = (kony.os.deviceInfo().screenHeight - 106 - 10 - 63 - 60 - 20) + "px";
    this.view.segAddQuestions.height = (kony.os.deviceInfo().screenHeight - 106 - 20 - 60 - 60 - 80) + "px";
    this.view.flxAddQuestionsSegmentWrapper.height = (kony.os.deviceInfo().screenHeight - 106 - 20 - 60) + "px";
    this.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
    this.view.flxSecurityQuestionsStatusFilter.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
    this.setFlowActions();
    this.view.forceLayout();
  },
  setStatusFilterData: function() {
    var scopeObj = this;
    var statusList = [];
    var maxSizeText="";
    var sample = this.finalQuestionsdata;
    for (var i = 0; i < sample.length; i++) {
      if (!statusList.contains(sample[i].lblSecurityQuestionStatus.text)) {
        statusList.push(sample[i].lblSecurityQuestionStatus.text);
      }
    }

    var widgetMap = {
      flxSearchDropDown: "flxSearchDropDown",
      flxCheckBox: "flxCheckBox",
      imgCheckBox: "imgCheckBox",
      lblDescription: "lblDescription",
      id: "id"
    };
    var data = statusList.map(function(record) {
      maxSizeText=record.length>maxSizeText.length?record:maxSizeText;
      return {
        flxSearchDropDown: "flxSearchDropDown",
        flxCheckBox: "flxCheckBox",
        id: "SID_ACTIVE",
        lblDescription: record,
        imgCheckBox: {
          src: "checkbox.png"
        }
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxSecurityQuestionsStatusFilter.width=flexWidth+"px";
    scopeObj.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    scopeObj.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for (var index = 0; index < data.length; index++) {
      indices.push(index);
    }
    scopeObj.filterIndiciesArray = indices;
    scopeObj.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0, scopeObj.filterIndiciesArray]];
  },

  performStatusFilter: function() {
    var scopeObj = this;
    var selStatus = [];
    var selInd;
    var allData = scopeObj.finalQuestionsdata;
    var segStatusData = scopeObj.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.data;
    var indices = scopeObj.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.selectedIndices;
    scopeObj.filterIndiciesArray = indices ? indices[0][1] : [];
    if (indices !== null) {
      //show selected indices data
      selInd = indices[0][1];
      for (var i = 0; i < selInd.length; i++) {
        selStatus.push(scopeObj.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription.toLowerCase());
      }
      if (selInd.length === segStatusData.length) {
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
        scopeObj.view.listingSegmentClient.segListing.setData(scopeObj.finalQuestionsdata);
        scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
      } else {
        var filteredQuestions = scopeObj.finalQuestionsdata.filter(function(record) {
          if (selStatus.indexOf(record.lblSecurityQuestionStatus.text.toLowerCase()) >= 0) {
            return record;
          }
        });
        if (filteredQuestions.length > 0) {
          scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
          scopeObj.view.listingSegmentClient.segListing.setData(filteredQuestions);
          scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
        } else {
          scopeObj.view.listingSegmentClient.segListing.removeAll();
          scopeObj.view.listingSegmentClient.segListing.setVisibility(false);
          scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
          scopeObj.view.listingSegmentClient.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
        }
      }
    } else {
      scopeObj.view.listingSegmentClient.segListing.removeAll();
      scopeObj.view.listingSegmentClient.segListing.setVisibility(false);
      scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
      scopeObj.view.listingSegmentClient.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
    }

    this.view.flxSecurityQuestionsStatusFilter.setVisibility(false);
    this.view.forceLayout();
  },

  //hide functions
  hideAll: function() {
    this.view.flxBreadcrumbs.setVisibility(false);
    this.view.flxPopUpWrapper.setVisibility(false);
    this.view.flxSecurityQuestionsWrapper.setVisibility(false);
    this.view.flxMainSubHeader.setVisibility(false);
    this.view.flxSegmentWrapper.setVisibility(false);
    this.view.flxAddQuestions.setVisibility(false);
    this.view.flxNoQuestionsCreatedWrapper.setVisibility(false);
  },
  hideMainHeaderButtons: function() {
    this.view.mainHeader.btnAddNewOption.setVisibility(false);
    this.view.mainHeader.btnDropdownList.setVisibility(false);
  },
  hideBreadcrumbs: function() {
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxBreadcrumbs.setVisibility(false);
  },
  //show functions
  showMainHeaderButtons: function() {
    this.view.mainHeader.btnAddNewOption.setVisibility(true);
  },
  showCreatedQuestions: function() {
    this.hideAll();
    if (this.view.listingSegmentClient.segListing.data.length !== 0) {
      this.showMainHeaderButtons();
      this.view.flxSecurityQuestionsWrapper.setVisibility(true);
      this.view.flxMainSubHeader.setVisibility(true);
      this.view.flxSegmentWrapper.setVisibility(true);
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    } else {
      this.hideMainHeaderButtons();
      this.view.flxNoQuestionsCreatedWrapper.setVisibility(true);
    }
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
  },
  showAddQuestions: function() {
    this.hideAll();
    this.showBreadcrumbs();
    this.hideMainHeaderButtons();
    this.view.flxSecurityQuestionsWrapper.setVisibility(true);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxAddQuestions.setVisibility(true);
    this.view.flxMainSubHeader.setVisibility(false);
    this.setAddQuestionSegmentData();
  },
  showBreadcrumbs: function() {
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.flxBreadcrumbs.setVisibility(true);
  },

  setFlowActions: function() {
    var scopeObj = this;
    this.view.flxLoading.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.onClick = function() {
      scopeObj.showAddQuestions();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.showCreatedQuestions();
    };
    this.view.btnAddQuestionSave.onClick = function() {
      scopeObj.insertNewSecurityQuestion(scopeObj.view.segAddQuestions.data);
    };
    this.view.btnAddQuestionCancel.onClick = function() {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.showCreatedQuestions();
    };
    this.view.btnAddNewQuestion.onClick = function() {
      scopeObj.addNewQuestionRow();
    };
    this.view.btnAddQuestion.onClick = function() {
      scopeObj.showAddQuestions();
    };
    this.view.listingSegmentClient.contextualMenu.flxOption1.onClick = function() {
      scopeObj.changeSecurityQuestionStatus();
    };
    this.view.listingSegmentClient.contextualMenu.flxOption2.onClick = function() {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.DeleteQuestion");
      scopeObj.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.delete_question_popup");
      scopeObj.view.popUp.btnPopUpCancel.setVisibility(true);
      scopeObj.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
      scopeObj.view.popUp.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      scopeObj.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
      scopeObj.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
      scopeObj.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
      scopeObj.onClickDeleteFlex();
    };
    this.view.popUp.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxPopUpWrapper.isVisible = false;
      scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
        scopeObj.removeQuestionStatus();
      };
    };
    this.view.popUp.btnPopUpDelete.onClick = function() {
      scopeObj.removeQuestionStatus();
    };
    this.view.subHeader.tbxSearchBox.onEndEditing = function() {
      if (scopeObj.view.subHeader.tbxSearchBoxtext === "") {
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      }
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.subHeader.tbxSearchBox.onBeginEditing = function() {
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      scopeObj.view.forceLayout();
    };
    this.view.subHeader.tbxSearchBox.onKeyUp = function() {
      var data = scopeObj.listOfQuestions.filter(scopeObj.searchFilter);
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflx0cc44f028949b4cradius30px";
      if (scopeObj.view.subHeader.tbxSearchBox.text === "") scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      else scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      scopeObj.loadPageData();
      if(data.length===0){
        scopeObj.view.listingSegmentClient.segListing.setVisibility(false);
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.text=kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found")+"\""+searchText+"\""+kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
        scopeObj.view.forceLayout();
      }else{
        scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
        scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
        scopeObj.view.flxMainSubHeader.setVisibility(true);
        scopeObj.view.flxSegmentWrapper.setVisibility(true);
        scopeObj.setSecurityQuestionsSegmentData(data);
        scopeObj.view.forceLayout();    
      }
      scopeObj.resetSortIcons();
    };
    this.view.subHeader.tbxSearchBox.onEndEditing.onDone = {

    };
    this.view.subHeader.flxClearSearchImage.onClick = function() {
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
      scopeObj.view.listingSegmentClient.segListing.setVisibility(true);
      scopeObj.view.flxMainSubHeader.setVisibility(true);
      scopeObj.view.flxSegmentWrapper.setVisibility(true);
      scopeObj.setSecurityQuestionsSegmentData(scopeObj.listOfQuestions.filter(scopeObj.searchFilter));
      scopeObj.view.forceLayout();
    };
    this.view.popUp.flxPopUpClose.onClick = function() {
      scopeObj.view.flxPopUpWrapper.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    };
    this.view.flxStatus.onClick = function() {
      if(scopeObj.view.flxSecurityQuestionsStatusFilter.isVisible === false) {
        scopeObj.view.flxSecurityQuestionsStatusFilter.setVisibility(true);
      }
      else {
        scopeObj.view.flxSecurityQuestionsStatusFilter.setVisibility(false);
      }
      var flxRight = scopeObj.view.flxViewSecurityQuestionsHeader.frame.width - scopeObj.view.flxStatus.frame.x - scopeObj.view.flxStatus.frame.width;
      var iconRight = scopeObj.view.flxStatus.frame.width - scopeObj.view.lblSortStatus.frame.x;
      scopeObj.view.flxSecurityQuestionsStatusFilter.right = (flxRight + iconRight - 30) +"px";
      scopeObj.resetSortIcons();
    };
    this.view.securityQuestionsStatusFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      scopeObj.performStatusFilter();
    };
    this.view.flxViewSecurityQuestionsHeaderName.onClick = function() {
      scopeObj.sortSecurityQuestions();
    }
  },
  setHeaderTextAndButtons: function() {
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.SecurityQuestions");
    this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.ADDQUESTION");
    this.view.mainHeader.btnDropdownList.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.width = "130px";
    this.view.mainHeader.btnAddNewOption.right = "0px";
    this.view.mainHeader.flxButtons.width = "130px";
  },

  //toggle functions
  togglePopup: function(popUpCase) {
    var scopeObj = this;
    if (this.view.flxPopUpWrapper.isVisible === false) {
      this.view.flxPopUpWrapper.setVisibility(true);
    } else {
      this.view.flxPopUpWrapper.setVisibility(false);
    }
  },

  setPopUpData: function(popUpCase) {
    if (popUpCase === kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.delete")) {
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.DeleteQuestion");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.delete_question_popup");
      this.view.popUp.btnPopUpCancel.setVisibility(true);
      this.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
      this.view.popUp.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
      this.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
      this.buttonClicked = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.delete");
    } else if (popUpCase === "deleteError") {
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Unable_to_Delete_the_Question");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Unable_to_Delete_the_Question_Popup");
      this.view.popUp.btnPopUpCancel.setVisibility(false);
      this.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
      this.view.popUp.btnPopUpDelete.skin = "sknBtnLato12Pxee6565Radius25Px";
      this.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLato12Pxed4848Radius25Px";
      this.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLato12Pxed4848Radius25Px";
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i8n.navigation.okButton");
      this.buttonClicked = "deleteError";
    } else if (popUpCase === kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.deactivate")) {
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Deactivate_Question");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Minimum_questions");
      this.view.popUp.btnPopUpCancel.setVisibility(true);
      this.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
      this.view.popUp.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
      this.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
      this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    }
  },

  updateContextualMenu: function() {
    var questionsData = this.view.listingSegmentClient.segListing.data;
    var rowIndex = this.view.listingSegmentClient.segListing.selectedIndex[1];
    if (questionsData[rowIndex].lblSecurityQuestionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.listingSegmentClient.contextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption1.text = "\ue91c";
      this.view.listingSegmentClient.contextualMenu.lblIconOption1.skin = "sknIcon20px";
    } else {
      this.view.listingSegmentClient.contextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
      this.view.listingSegmentClient.contextualMenu.lblIconOption1.text = "\ue931";
      this.view.listingSegmentClient.contextualMenu.lblIconOption1.skin = "sknIcon20px";
    }
  },

  toggleQuestionStatus: function() {
    var scopeObj = this;
    var questionsData = this.view.listingSegmentClient.segListing.data;
    var sectionIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[0];
    var rowIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    if (questionsData[rowIndex].lblSecurityQuestionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      questionsData[rowIndex].lblSecurityQuestionStatus = { text: kony.i18n.getLocalizedString("i18n.secureimage.Inactive"), skin: "sknlblLato5bc06cBold14px" };
      questionsData[rowIndex].lblIconStatus.text = "\ue921";
      questionsData[rowIndex].lblIconStatus.skin = "sknfontIconInactive";
    } else {
      questionsData[rowIndex].lblSecurityQuestionStatus = { text: kony.i18n.getLocalizedString("i18n.secureimage.Active"), skin: "sknlblLato5bc06cBold14px" };
      questionsData[rowIndex].lblIconStatus.text = "\ue921";
      questionsData[rowIndex].lblIconStatus.skin = "sknFontIconActivate";
    }
    this.view.listingSegmentClient.segListing.setData(questionsData);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.presenter.fetchAllSecurityQuestions();
  },

  onClickDeleteFlex: function() {
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.flxPopUpWrapper.setVisibility(true);
  },
  //other functions
  callBackTimer: function() {
    this.view.flxToastMessage.setVisibility(false);
  },
  deleteRow: function() {
    var scopeObj = this;
    var data = scopeObj.view.segAddQuestions.data;
    var index = scopeObj.view.segAddQuestions.selectedRowIndex[1];
    var selectedData = scopeObj.view.segAddQuestions.data[index];
    var Index = scopeObj.view.segAddQuestions.selectedRowIndex;
    var rowIndex = Index[1];
    if (data.length === 1) {
      data[0].flxDelete.isVisible = false;
      data[index].txtAddSecurityQuestion.text = "";
      scopeObj.view.segAddQuestions.setData(data);
    } else this.view.segAddQuestions.removeAt(rowIndex);
  },
  addNewQuestionRow: function() {
    var scopeObj = this;
    var data = this.view.segAddQuestions.data;
    var toAdd = {
      imgSwitch: "imagedrag.png",
      lblAddSecurityQuestionSeperator: "-",
      lblQuestionStatus: kony.i18n.getLocalizedString("i18n.secureimage.Active"),
      flxDelete: {
        isVisible: true,
        onClick: function() {
          scopeObj.deleteRow();
        }
      },
      lblCharCount: {
        isVisible: false
      },
      fontIconDelete: {
        text: "",
        isVisible: true
      },
      txtAddSecurityQuestion: {
        skin: "skntxtAddSecurityQuestion",
        focusSkin: "skntxtAreaLato9ca9ba12Px",
        placeholder: kony.i18n.getLocalizedString("i18n.SecurityQuestions.AddSecurityQuestion"),
        onKeyUp: function() {
          scopeObj.charCount();
        },
        onEndEditing: function() {
          scopeObj.charCount1();
        }
      },
      StatusswitchToggle: {
        selectedIndex: 0,
        skin: "sknSwitchServiceManagement"
      },
      template: "flxAddSecurityQuestion"
    };
    data.push(toAdd);
    this.view.segAddQuestions.setData(data);
    this.view.forceLayout();
  },
  addQuestionDataToSegment: function() {
    var data = this.view.segAddQuestions.data;
    var questionsData = this.view.listingSegmentClient.segListing.data;
    var newQuestion = "";
    var addedQuestion = false;
    var switchStatus;
    for (var i = 0; i < data.length; i++) {
      newQuestion = data[i].txtAddSecurityQuestion.text;
      switchStatus = data[i].StatusswitchToggle.selectedIndex;
      if (newQuestion !== "" && newQuestion !== null) {
        var toAdd = {
          flxQuestionStatus: { skin: "slFbox" },
          lblIconOptions: {
            text: "\ue91f",
            skin: "sknFontIconOptionMenu"
          },
          StatusswitchToggle: { selectedIndex: 0, skin: "sknSwitchServiceManagement" },
          lblSecurityQuestionStatus: {
            text: switchStatus === 0 ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
            skin: switchStatus === "sknlblLato5bc06cBold14px"
          },
          lblSecurityQuestionsSeperator: "-",
          lblIconStatus: {
            text: "\ue921",
            skin: switchStatus === 0 ? "sknFontIconActivate" : "sknfontIconInactive"
          },
          lblSecurityQuestion: "" + newQuestion,
          template: "flxSecurityQuestions"
        };
        questionsData.push(toAdd);
        addedQuestion = true;
      }
    }
    if (addedQuestion) {
      this.view.listingSegmentClient.segListing.setData(questionsData);
    }
  },
	
  toggleContextualMenu: function() {
    var scopeObj = this;

    scopeObj.updateContextualMenu();
    
    var selectedIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var templateArray = this.view.listingSegmentClient.segListing.clonedTemplates;
    
    var height = 0;
    for(var i = 0; i < selectedIndex; i++){
      height = height + templateArray[i].flxSecurityQuestions.frame.height;
    }
	if (this.view.listingSegmentClient.flxContextualMenu.isVisible === false) {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(true);
      this.optionButtonStateChange(selectedIndex,true);
    } else {
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      this.optionButtonStateChange(selectedIndex,false);
    }

    this.view.forceLayout();
    var segmentWidget = this.view.listingSegmentClient.segListing;
    var contextualWidget = this.view.listingSegmentClient.contextualMenu;
    height = (height + 47) - segmentWidget.contentOffsetMeasured.y;
    if(height + contextualWidget.frame.height > segmentWidget.frame.height) {
      height = height - contextualWidget.frame.height - 27;
      scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(true);
      scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "0px";
    }
    else {
      scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(true);
      scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(false);
      scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "-1px";
    }
	this.view.listingSegmentClient.flxContextualMenu.onHover = this.onHoverEventCallback;
    this.view.listingSegmentClient.flxContextualMenu.top = height + "px";

    this.view.forceLayout();
  },
  onHoverEventCallback:function(widget, context) {
    var scopeObj = this;
    var selectedIndex;
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
      selectedIndex = scopeObj.view.listingSegmentClient.segListing.selectedrowindex[1];
      scopeObj.optionButtonStateChange(selectedIndex, true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
      selectedIndex = scopeObj.view.listingSegmentClient.segListing.selectedrowindex[1];
      scopeObj.optionButtonStateChange(selectedIndex, false);
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
  charCount: function() {
    var scopeObj = this;
    var index = this.view.segAddQuestions.selectedRowIndex;
    var rowindex = index[1];
    this.view.flxCharCount.top = (5 + 95*rowindex) + 'px';
    var data = this.view.segAddQuestions.data;
    var questions_data = data[rowindex].txtAddSecurityQuestion.text;
    if (data.length === 1) {
      if (questions_data === "") {
        data[rowindex].flxDelete.isVisible = false;
        data[rowindex].fontIconDelete.isVisible = false;
      } else {
        data[rowindex].flxDelete.isVisible = true;
        data[rowindex].fontIconDelete.isVisible = true;
      }
    }
    this.view.lblCharCount.text = data[rowindex].txtAddSecurityQuestion.text.length + "/150";
    this.view.flxCharCount.setVisibility(true);
    this.view.forceLayout();
    //data[rowindex].txtAddSecurityQuestion.setFocus(true)
  },
  charCount1: function() {
    this.view.flxCharCount.setVisibility(false);
    this.view.forceLayout();
  },
  //segment data set functions
  setAddQuestionSegmentData: function() {
    var scopeObj = this;
    var dataMap = {
      flxAddSecurityQuestion: "flxAddSecurityQuestion",
      flxQuestionStatus: "flxQuestionStatus",
      imgSwitch: "imgSwitch",
      StatusswitchToggle: "StatusswitchToggle",
      lblAddSecurityQuestionSeperator: "lblAddSecurityQuestionSeperator",
      lblQuestionStatus: "lblQuestionStatus",
      txtAddSecurityQuestion: "txtAddSecurityQuestion",
      lblCharCount: "lblCharCount",
      flxDelete: "flxDelete",
      flxQuestions: "flxQuestions",
      fontIconDelete: "fontIconDelete"
    };

    var data = [
      {
        imgSwitch: "imagedrag.png",
        lblCharCount: {
          isVisible: false
        },
        fontIconDelete: {
          text: "",
          isVisible: true
        },
        flxDelete: {
          isVisible: true,
          onClick: function() {
            scopeObj.deleteRow();
          }
        },
        StatusswitchToggle: {
          skin: "sknSwitchServiceManagement",
          selectedIndex: 0
        },
        lblAddSecurityQuestionSeperator: "-",
        lblQuestionStatus: kony.i18n.getLocalizedString("i18n.secureimage.Active"),
        txtAddSecurityQuestion: {
          skin: "skntxtAddSecurityQuestion",
          focusSkin: "skntxtAreaLato9ca9ba12Px",
          placeholder: kony.i18n.getLocalizedString("i18n.SecurityQuestions.AddSecurityQuestion"),
          onKeyUp: function() {
            scopeObj.charCount();
          },
          onEndEditing: function() {
            scopeObj.charCount1();
          }
        },
        template: "flxAddSecurityQuestion"
      }
    ];
    this.view.segAddQuestions.widgetDataMap = dataMap;
    this.view.segAddQuestions.setData(data);
    this.view.forceLayout();
  },

  setSecurityQuestionsSegmentData: function(questionsData) {
    var scopeObj = this;
    var dataMap = {
      flxHeaderQuestions: "flxHeaderQuestions",
      flxHeaderStatus: "flxHeaderStatus",
      imgSortStatus: "imgSortStatus",
      fontIconFilterStatus: "fontIconFilterStatus",
      lblHeaderQuestions: "lblHeaderQuestions",
      lblHeaderStatus: "lblHeaderStatus",
      lblSecurityQuestionsHeaderSeperator: "lblSecurityQuestionsHeaderSeperator",
      flxOptions: "flxOptions",
      flxQuestionStatus: "flxQuestionStatus",
      flxSecurityQuestions: "flxSecurityQuestions",
      lblIconOptions: "lblIconOptions",
      lblIconStatus: "lblIconStatus",
      lblSecurityQuestionStatus: "lblSecurityQuestionStatus",
      lblSecurityQuestionsSeperator: "lblSecurityQuestionsSeperator",
      lblSecurityQuestion: "lblSecurityQuestion",
      question_id: "questionId"
    };

    var dataQuestions = questionsData.map(function(questionsData) {
      return {
        lblSecurityQuestionsSeperator: "-",
        question_id: questionsData.SecurityQuestion_id,
        userCount: questionsData.UserCount,
        lblIconOptions: {
          text: "\ue91f",
          skin: "sknFontIconOptionMenu"
        },
        lblSecurityQuestionStatus: {
          text: questionsData.SecurityQuestion_Status === "SID_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive"),
          skin: questionsData.SecurityQuestion_Status === "sknlblLato5bc06cBold14px"
        },
        lblSecurityQuestion: questionsData.SecurityQuestion,
        lblIconStatus: {
          text: "\ue921",
          skin: questionsData.SecurityQuestion_Status === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive"
        },
        template: "flxSecurityQuestions",
        flxOptions: {
          skin : "slFbox",
          onClick: function() {
            scopeObj.toggleContextualMenu();
          }
        }
      };
    });
    this.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
    this.view.listingSegmentClient.segListing.setData(dataQuestions);

    this.finalQuestionsdata = dataQuestions;
    this.setStatusFilterData();
    kony.adminConsole.utils.hideProgressBar(this.view);
    // adding null check for AAC-6360
    if(document.getElementById("frmSecurityQuestions_listingSegmentClient_segListing"))
      document.getElementById("frmSecurityQuestions_listingSegmentClient_segListing").onscroll = this.contextualMenuOff;
    // end of fix AAC-6360
    this.view.forceLayout();
  },
  
  contextualMenuOff: function(context) {
    var scopeObj = this;
    scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
    this.view.forceLayout();
  },
  
  insertNewSecurityQuestion: function(dataToinsert) {
    var scopeObj = this;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var finalData = {
      user_ID: user_ID
    };
    var insertJson = [];
    if (dataToinsert.length > 0) {
      for (var i = 0; i < dataToinsert.length; i++) {
        var insertRow = {};
        if (dataToinsert[i].txtAddSecurityQuestion.text !== "" && dataToinsert[i].txtAddSecurityQuestion.text !== undefined) {
          insertRow["Question"] = dataToinsert[i].txtAddSecurityQuestion.text;
          if (dataToinsert[i].StatusswitchToggle.selectedIndex === 0) {
            insertRow["Status_id"] = "SID_ACTIVE";
          } else {
            insertRow["Status_id"] = "SID_INACTIVE";
          }
          insertJson.push(insertRow);
        }
      }
      finalData["SecurityQuestionsList"] = insertJson;
    }
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    if (finalData["SecurityQuestionsList"] !== undefined && finalData.SecurityQuestionsList.length > 0) {
      var isValid = true;
      //check if question contains atleast three words
      for(var k=0; k<finalData.SecurityQuestionsList.length; k++){
        var ques = finalData.SecurityQuestionsList[k].Question.split(" ");
        if(ques.length < 3){
          isValid = false;
          break;
        }
      }
      if(isValid){
        scopeObj.presenter.addNewSecurityQuestion(finalData);
      }else{
        kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestions.SecurityQuestionShouldHaveAtleastThreeWords"), this);
      }
    } else {
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
      this.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.No_question_added"), this);
    }
  },

  countActiveQuestions: function() {
    var allQuestions = this.view.listingSegmentClient.segListing.data;
    var count = 0;
    for (var i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].lblSecurityQuestionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) count++;
    }
    return count;
  },
  changeSecurityQuestionStatus: function() {
    var scopeObj = this;

    scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    var questionsData = scopeObj.view.listingSegmentClient.segListing.data;
    var sectionIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[0];
    var rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var dataToChange = questionsData[rowIndex];
    var status_id = dataToChange.lblSecurityQuestionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? "SID_INACTIVE" : "SID_ACTIVE";
    var count = scopeObj.countActiveQuestions();
    if (status_id === "SID_INACTIVE" && count <= 10) {
      scopeObj.deactivatePopUpUI();
    } else {
      scopeObj.clickedOkDeactivate();
    }
  },
  removeQuestionStatus: function() {
    var scopeObj = this;
    scopeObj.flag = 0;
    var questionsData = this.view.listingSegmentClient.segListing.data;
    var sectionIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[0];
    var rowIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var questionId = questionsData[rowIndex].question_id;
    var data = questionsData[rowIndex];
    var count = scopeObj.countActiveQuestions();
    if (count <= 10) {
      scopeObj.clickedDeletewithValidations();
    } else {
      scopeObj.clickedOkDelete();
    }
  },

  clickedDeletewithValidations: function() {
    var scopeObj = this;
    scopeObj.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.DeleteQuestion");
    scopeObj.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Cannot_delete_Minimum_questions");
    scopeObj.view.popUp.btnPopUpCancel.setVisibility(true);
    scopeObj.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
    scopeObj.view.popUp.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    scopeObj.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
    scopeObj.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
    scopeObj.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    scopeObj.view.flxPopUpWrapper.setVisibility(true);
    var backUpOkAction = scopeObj.view.popUp.btnPopUpDelete.onClick;

    scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
      scopeObj.clickedOkDelete(backUpOkAction);
      if (scopeObj.flag === 0) {
        scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        scopeObj.view.popUp.btnPopUpDelete.onClick = backUpOkAction;
      }
    };
  },
  clickedOkDelete: function(backUpOkAction) {
    var scopeObj = this;
    var questionsData = this.view.listingSegmentClient.segListing.data;
    var sectionIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[0];
    var rowIndex = this.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var questionId = questionsData[rowIndex].question_id;
    var data = questionsData[rowIndex];
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var finalData = {
      user_ID: user_ID,
      id: questionId
    };
    if (data.userCount === "0") {
      scopeObj.view.flxPopUpWrapper.setVisibility(false);
      kony.adminConsole.utils.showProgressBar(scopeObj.view);
      scopeObj.presenter.deleteSecurityQuestion(finalData);
    } else {
      scopeObj.flag = 1;
      scopeObj.clickedCannotDelete(backUpOkAction);
    }
  },
  clickedCannotDelete: function(backUpOkAction) {
    var scopeObj = this;
    scopeObj.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Unable_to_Delete_the_Question");
    scopeObj.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Unable_to_Delete_the_Question_Popup");
    scopeObj.view.popUp.btnPopUpCancel.setVisibility(false);
    scopeObj.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
    scopeObj.view.popUp.btnPopUpDelete.skin = "sknBtnLato12Pxee6565Radius25Px";
    scopeObj.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLato12Pxed4848Radius25Px";
    scopeObj.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLato12Pxed4848Radius25Px";
    scopeObj.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i8n.navigation.okButton");
    scopeObj.view.flxPopUpWrapper.setVisibility(true);
    scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxPopUpWrapper.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.popUp.btnPopUpDelete.onClick = backUpOkAction;
    };
  },
  clickedOkDeactivate: function() {
    var scopeObj = this;
    var questionsData = scopeObj.view.listingSegmentClient.segListing.data;
    var sectionIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[0];
    var rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var dataToChange = questionsData[rowIndex];
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var status_id = dataToChange.lblSecurityQuestionStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? "SID_INACTIVE" : "SID_ACTIVE";
    var finalData = {
      user_ID: user_ID,
      id: dataToChange.question_id,
      status_ID: status_id
    };
    kony.adminConsole.utils.showProgressBar(scopeObj.view);
    scopeObj.presenter.editSecurityQuestion(finalData);
  },
  clickedCancelDeactivate: function() {
    this.view.flxPopUpWrapper.setVisibility(false);
  },
  deactivatePopUpUI: function() {
    var scopeObj = this;
    scopeObj.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Deactivate_Question");
    scopeObj.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmSecurityQuestionsController.Cannot_deactivate_Minimum_questions");
    scopeObj.view.popUp.btnPopUpCancel.setVisibility(true);
    scopeObj.view.popUp.flxPopUpTopColor.skin = "sknflxebb54cOp100";
    scopeObj.view.popUp.btnPopUpDelete.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px";
    scopeObj.view.popUp.btnPopUpDelete.hoverSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
    scopeObj.view.popUp.btnPopUpDelete.focusSkin = "sknBtnLatoffffff12pxBg0b70ccRadius28Px";
    scopeObj.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    scopeObj.view.flxPopUpWrapper.setVisibility(true);
    var backUpAction = scopeObj.view.popUp.btnPopUpCancel.onClick;
    var backUpOkAction = scopeObj.view.popUp.btnPopUpDelete.onClick;

    scopeObj.view.popUp.btnPopUpCancel.onClick = function() {
      scopeObj.clickedCancelDeactivate();
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.popUp.btnPopUpCancel.onClick = backUpAction;
    };
    scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
      scopeObj.clickedOkDeactivate();
      scopeObj.view.flxPopUpWrapper.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.popUp.btnPopUpDelete.onClick = backUpOkAction;
    };
  },
  searchFilter: function(data) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if (typeof searchText === "string" && searchText.length > 0) {
      return data.SecurityQuestion.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },
  sortSecurityQuestions : function() {
    var scopeObj = this;

    if(scopeObj.view.lblSortName.text === "\ue92b" || scopeObj.view.lblSortName.text === "\ue920") {
      scopeObj.view.lblSortName.text = "\ue92a";
    }
    else if(scopeObj.view.lblSortName.text === "\ue92a") {
      scopeObj.view.lblSortName.text = "\ue920";
    }

    if(!scopeObj.sortBy) {
      scopeObj.sortBy = this.getObjectSorter("lblSecurityQuestion");
    } else {
      scopeObj.sortBy.column('lblSecurityQuestion');
    }

    var sortedSecurityQuestions = scopeObj.view.listingSegmentClient.segListing.data.sort(scopeObj.sortBy.sortData);
    scopeObj.view.listingSegmentClient.segListing.setData(sortedSecurityQuestions);
  },
  resetSortIcons : function() {
    var scopeObj = this;
    scopeObj.view.lblSortName.text = "\ue92b";
    this.view.forceLayout();
  }
});
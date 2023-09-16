define({
  records: 0,
  recordsSize:20,
  OnFirstScroll: false,
  //Type your controller code here
  //Type your controller code here
  editdata: {
    listOfFAQs: []
  },
  bunchChanges: {
    listOfFAQs: []
  },
  actionsConfig:{
    EDIT:"EDIT",
    CREATE:"CREATE"
  },
  currFAQAction:"",
  currentFAQData: [],
  firstTime: true,
  filterIndiciesArray  :[0,1],
  shouldUpdateUI: function(viewModel) {
    return viewModel !== undefined;
  },
  uniqueCode: "",
  showFAQRecords : function(data){
    if (data.length) {
      this.filterIndiciesArray  = [0,1] ;
      this.view.FlexUsers.height = "preferred" ;
      this.setDatafilterMenu();
      this.currentFAQData = data;
      this.showListFaq(data.filter(this.searchFilter));
      var self = this;
      this.loadPageData = function() {
        self.sortBy = self.getObjectSorter("Status_id");
        self.changesorticon();
        self.showListFaq(data.filter(self.searchFilter).sort(self.sortBy.sortData));
        self.firstTime = false;
        self.records = data.filter(self.searchFilter).length;
        self.view.flxtreeviewContainer.setVisibility(true);
        self.view.forceLayout();
        kony.adminConsole.utils.hideProgressBar(self.view);
      };
      this.loadPageData();
    } else {
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
  },
  willUpdateUI: function(viewModel) {
    var self = this;
    this.updateLeftMenu(viewModel);
    if (viewModel.context === "fetchCategories") {
      viewModel.context = "";
      this.categories = viewModel.categories;
      this.showEditFaq(viewModel.opt);
      kony.adminConsole.utils.hideProgressBar(self.view);
      this.view.forceLayout();
    } else if (viewModel.context === "showLoadingScreen") {
      kony.adminConsole.utils.showProgressBar(this.view);
    } else if (Array.isArray(viewModel.records)) {
      var data = viewModel.records;
      this.showFAQRecords(data);
      
    }else if(viewModel.context === "FetchFAQsError"){
      this.view.mainHeader.btnDropdownList.isVisible = false;
      this.showFAQRecords([]);

      kony.adminConsole.utils.hideProgressBar(self.view);
      var change = function(widget, property, value){
        var oldValue = widget[property];
        widget[property] = value;
        return function reverse(){
          widget[property] = oldValue;
        };
      };
      var changes = [
        change(this.view.toastMessage.flxToastContainer, 'skin', 'sknFlxErrorToastBgE61919'),
        change(this.view.toastMessage.lbltoastMessage, 'text', kony.i18n.getLocalizedString('i18n.FAQ.errorFetchingFAQs')),
        change(this.view.toastMessage.flxRightImage, 'onClick', function reverseAllChanges(){
          changes.forEach(function(reverseChange){
            reverseChange();
          });
          self.view.forceLayout();
        }),
        change(this.view.flxToastMessage, 'isVisible', true)
      ];
      self.view.forceLayout();
    }
  },
  searchFilter: function(FAQs) {
    var searchText = this.view.search.tbxSearchBox.text;
    if (typeof searchText === "string" && searchText.length > 0) {
      return FAQs.Question.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else {
      return true;
    }
  },
  searchData: function() {
    this.loadPageData();
  },
  preShowActions: function() {
    kony.adminConsole.utils.showProgressBar(this.view);
    var scopeObj = this;
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString('i18n.frmFAQController.FAQs');
    this.flowActions();
    this.view.search.tbxSearchBox.text = "";
    this.setScrollHeight();
    this.view.lblMessageSize.setVisibility(false);
    this.view.flxSelectOptions.onHover = scopeObj.onDropdownHoverCallback;
    this.view.flxSelectOptions.setVisibility(false);
    this.view.statusFilterMenu.setVisibility(false);
    this.setPreshowData();
    this.view.forceLayout();
  },

  setPreshowData: function() {
    this.view.flxNoFAQWrapper.setVisibility(false);
    this.view.flxAddFAQ.setVisibility(false);
    this.view.flxMainHeader.setVisibility(true);
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxDeactivateFAQ.setVisibility(false);
    this.view.flxDeleteFAQ.setVisibility(false);
    this.view.flxSelectOptions.setVisibility(false);
    this.view.statusFilterMenu.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
    this.view.tableView.flxHeaders.setVisibility(true);
    this.view.tableView.flxNoRecordsFound.setVisibility(false);
    this.view.tableView.imgHeaderCheckBox.src = "checkbox.png";
    this.view.flxFAQ.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.noStaticData.lblNoStaticContentCreated.text = kony.i18n.getLocalizedString("i18n.Faq.NoFAQCreated");
    this.view.noStaticData.lblNoStaticContentMsg.text = kony.i18n.getLocalizedString("i18n.Faq.clickOnAddFaq");
    this.view.noStaticData.btnAddStaticContent.text = kony.i18n.getLocalizedString("i18n.Faq.AddFaq");
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.mainHeader.btnDropdownList.isVisible = false;
    this.view.flxToastMessage.setVisibility(false);
  },
  sortListBoxData : function(listBoxData,sortParam){
    this.sortBy = this.getObjectSorter(sortParam); 
    var sortedData = listBoxData.sort(this.sortBy.sortData);
    return sortedData;
  },
  showEditFaq: function(opt) {
    // populate categories
    var finalCategories = [] ;
    var categoriesList = this.sortListBoxData(this.categories.faqcategory, "Name");
    for(var i=0; i<categoriesList.length; i++){
      var temp = [];
      temp.push(categoriesList[i].id);
      temp.push(categoriesList[i].Name);
      finalCategories.push(temp);
    }
    this.view.lbxCategory.masterData = finalCategories;
    if (opt === 1) {
      var date = new Date();
      this.uniqueCode = "FAQ_" + date.getDate() + date.getDay() + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds();
      this.view.lblFAQValue.text = this.uniqueCode;
      this.view.flxNoFAQWrapper.setVisibility(false);
      this.view.flxMainContent.setVisibility(false);
      this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.commonButtons.btnNext.setVisibility(true);
      this.view.breadcrumbs.setVisibility(false);
      this.view.addStaticData.flxDescription.setVisibility(true);
      this.view.addStaticData.imgMandatory.setVisibility(false);
      this.view.addStaticData.lblDescription.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Add_Answer");
      this.view.txbFaqQuestion.text = "";
      this.view.flxSelectOptions.setVisibility(false);
      this.view.statusFilterMenu.setVisibility(false);
      this.view.addStaticData.flxNoDescriptionError.setVisibility(false);
      this.view.flxNoQuestionError.setVisibility(false);
      this.view.txbFaqQuestion.skin = "skntxtbx484b5214px";
      this.view.addStaticData.rtxAddStaticContent.skin = "skntxtAreaLato35475f14Px";
      this.view.addStaticData.rtxAddStaticContent.text = "";
      this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmFAQController.FAQs").toUpperCase();
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.DragBox.ADD");
      this.view.addStaticData.rtxAddStaticContent.placeholder = kony.i18n.getLocalizedString("i18n.frmFAQController.Add_Answer");
      this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(false);
      this.view.breadcrumbs.setVisibility(true);
      this.view.flxAddFAQ.setVisibility(true);
      this.view.commonButtons.btnNext.text = kony.i18n.getLocalizedString("i18n.CommonButtons.Save_AddNew");
      this.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.permission.SAVE");
      this.view.mainHeader.btnAddNewOption.setVisibility(false);
      this.view.mainHeader.btnDropdownList.isVisible = false;
      this.currFAQAction = this.actionsConfig.CREATE; 
      this.view.addStaticData.SwitchToggleStatus.selectedIndex = 0;
      this.view.addStaticData.lblMessageSize.text = "0/4000";
      this.view.lblMessageSize.text = "0/300";
    } else {
      var index = this.view.tableView.segServicesAndFaq.selectedRowIndex;
      var rowIndex = index[1];
      var data = this.view.tableView.segServicesAndFaq.data;
      var questionNumber = data[rowIndex].lblServiceName;
      this.currFAQAction = this.actionsConfig.EDIT; 
      this.view.txbFaqQuestion.text = data[rowIndex].lblDescription;
      this.view.lblMessageSize.text = data[rowIndex].lblDescription.length + "/300";
      this.view.addStaticData.rtxAddStaticContent.text = data[rowIndex].lblServiceDescription.text;
      this.view.addStaticData.lblMessageSize.text = data[rowIndex].lblServiceDescription.text.length + "/4000";
      this.view.addStaticData.SwitchToggleStatus.selectedIndex = data[rowIndex].lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? 0 : 1;
      this.view.lblFAQValue.text = data[rowIndex].lblServiceName;
      this.view.flxNoFAQWrapper.setVisibility(false);
      this.view.flxMainContent.setVisibility(false);
      this.view.addStaticData.flxDescription.setVisibility(true);
      this.view.addStaticData.imgMandatory.setVisibility(false);
      this.view.addStaticData.lblDescription.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Add_Answer");
      this.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      this.view.commonButtons.btnNext.setVisibility(false);
      this.view.breadcrumbs.btnBackToMain.setVisibility(true);
      this.view.txbFaqQuestion.skin = "skntxtbx484b5214px";
      this.view.addStaticData.rtxAddStaticContent.skin = "skntxtAreaLato35475f14Px";
      this.view.breadcrumbs.btnPreviousPage.text = questionNumber;
      this.view.breadcrumbs.btnPreviousPage.setVisibility(true);
      this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
      this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.EDIT");
      this.view.breadcrumbs.setVisibility(true);
      this.view.addStaticData.flxNoDescriptionError.setVisibility(false);
      this.view.flxNoQuestionError.setVisibility(false);
      this.view.flxAddFAQ.setVisibility(true);
      this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmFAQController.FAQs").toUpperCase();
      this.view.commonButtons.btnNext.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.UPDATE_ADD_NEW");
      this.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.permission.SAVE");
      this.view.mainHeader.btnAddNewOption.setVisibility(false);
      this.view.mainHeader.btnDropdownList.isVisible = false;
      this.view.lbxCategory.selectedKey = data[rowIndex].categoryId;
    }
  },
  showListFaq: function(viewModelData) {
    this.view.flxAddFAQ.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxDeactivateFAQ.setVisibility(false);
    this.view.flxDeleteFAQ.setVisibility(false);
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxMainContent.setVisibility(true);
    this.view.flxSelectOptions.setVisibility(false);
    this.view.statusFilterMenu.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.Faq.AddFaq");
    this.view.flxSelectOptionsHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.isVisible = true;
    this.view.tableView.flxNoRecordsFound.isVisible = false;
    this.view.tableView.flxHeaders.setVisibility(true);
    this.view.tableView.flxTableView.isVisible = true;
    this.view.mainHeader.btnDropdownList.isVisible = false;
    var mappedSegData = viewModelData.map(this.mappingFaqdata);
    var segData = mappedSegData;
    this.SetFaqSegmentData(segData);
    this.view.forceLayout();
  },
  selectAllRows: function() {
     this.view.flxSelectOptions.setVisibility(false);
    var data = this.view.tableView.segServicesAndFaq.data;
    var index = this.view.tableView.segServicesAndFaq.selectedIndices;
    if (index === null) {
      this.view.tableView.segServicesAndFaq.selectedIndices = null;
    }
    if (this.view.tableView.imgHeaderCheckBox.src === "checkbox.png") {
      this.view.flxSepartor2.setVisibility(true);
      this.view.flxSelectOptionsHeader.setVisibility(true);
      this.view.search.flxMenu.setVisibility(false);
      this.view.tableView.imgHeaderCheckBox.src = "checkboxselected.png";
      var limit = data.length;
      var indices = [[0, []]];
      for (var i = 0; i < limit; i++) {
        indices[0][1].push(i);
      }
      this.view.tableView.segServicesAndFaq.selectedRowIndices = indices;
      var rowIndex = this.view.tableView.segServicesAndFaq.selectedRowIndices[0][1];
      var active = false;
      var inactive = false;
      for (var counter = 0; counter< rowIndex.length; counter++) {
        if (data[rowIndex[counter]].lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) active = true;
        else inactive = true;
      }
      if (active && inactive) this.view.flxSelectOptionsHeader.width = "107px";
      else this.view.flxSelectOptionsHeader.width = "71px";
      this.view.flxSelectOptionsHeader.flxDeactivateOption.setVisibility(active);
      this.view.flxSelectOptionsHeader.flxDeleteOption.setVisibility(true);
      this.view.flxSelectOptionsHeader.flxActiveOption.setVisibility(inactive);
    } else {
      this.view.tableView.segServicesAndFaq.selectedIndices = null;
      this.view.tableView.imgHeaderCheckBox.src = "checkbox.png";
      this.view.flxSelectOptionsHeader.setVisibility(false);
    }
    this.view.mainHeader.btnDropdownList.isVisible = false;
    this.view.forceLayout();
  },
  showDeactivate: function(opt) {
    if (opt === 1) {
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Deactivate_FAQ");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmFAQController.deactivate_FAQ_MessageContent");
    } else {
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Deactivate_All_FAQs");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Deactivate_All_FAQs_MessageContent");
    }
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    this.view.flxDeactivateFAQ.setVisibility(true);

    this.view.forceLayout();
  },
  showActivate: function(opt) {
    if (opt === 1) {
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Activate_FAQ");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Are_you_sure_to_Activate_FAQ");
    } else {
      this.view.popUpDeactivate.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Activate_All_FAQs");
      this.view.popUpDeactivate.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Activate_All_FAQs_MessageContent");
    }
    this.view.popUpDeactivate.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUpDeactivate.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.frmPermissionsController.YES__ACTIVATE");
    this.view.flxDeactivateFAQ.setVisibility(true);

    this.view.forceLayout();
  },
  showDeleteFaq: function(opt) {
    if (opt === 1) {
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.Delete_FAQ");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Are_you_sure_to_delete_FAQ");
    } else {
      this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Delete_All_FAQs");
      this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Delete_All_FAQs_MessageContent");
    }
    this.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.NO__LEAVE_AS_IT_IS");
    this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    this.view.toastMessage.lbltoastMessage.text = kony.i18n.getLocalizedString("i18n.frmFAQController.Delete_FAQ_successfully");
    this.view.flxDeleteFAQ.setVisibility(true);
    this.view.forceLayout();
  },
  toggleActive: function() {
    var toDo = {
      text: ""
    };
    var data = this.view.tableView.segServicesAndFaq.data;
    var indices = this.view.tableView.segServicesAndFaq.selectedRowIndices;
    if (indices[0][1].length === 1 || indices[0][1].length === 0) {
      var a = (indices[0][1].length === 1 ) ? indices[0][1] : this.view.tableView.segServicesAndFaq.selectedRowIndex[1] ;
      if (this.view.tableView.segServicesAndFaq.data[a].lblServiceStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        toDo.text = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
      } else {
        toDo.text = kony.i18n.getLocalizedString("i18n.secureimage.Active");
      }
    } else {
      var selIndices = indices[0][1];
      for (var i = 0; i < selIndices.length; i++) {
        if (this.view.popUpDeactivate.lblPopUpMainMessage.text === kony.i18n.getLocalizedString("i18n.frmFAQController.Activate_All_FAQs")) {
          toDo.text = kony.i18n.getLocalizedString("i18n.secureimage.Active");
        } else {
          toDo.text = kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
        }
      }
    }
    this.view.tableView.segServicesAndFaq.setData(data);
    this.view.forceLayout();
    return toDo;
  },
  navigateBreadcrum: function() {
    kony.adminConsole.utils.showProgressBar(this.view);
    this.view.flxtreeviewContainer.setVisibility(true);
    this.presenter.fetchFAQs();
  },

  showNoResultsFound: function() {
    var ht = this.view.tableView.flxNoRecordsFound.height;
    this.view.tableView.flxTableView.setVisibility(false);
    this.view.tableView.flxHeaders.setVisibility(false);
    this.view.tableView.flxNoRecordsFound.setVisibility(true);
    this.view.tableView.lblNoRecords.setVisibility(true);
    this.view.tableView.flxHeaderCheckbox.setVisibility(false);
    var searchText = this.view.search.tbxSearchBox.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;");
    this.view.tableView.lblNoRecords.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + 
      '"' + 
      searchText + 
      '"' + ".\n"+
      kony.i18n.getLocalizedString("i18n.frmFAQController.TryWithAnotherKeyword");
    this.view.FlexUsers.height = ht;
  },
  onDropdownHoverCallback: function(widget, context) {
    var scopeObj = this;
    var row_index = scopeObj.view.tableView.segServicesAndFaq.selectedRowIndex[1];
    var data = scopeObj.view.tableView.segServicesAndFaq.data[row_index];
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      scopeObj.view.flxSelectOptions.setVisibility(true);
      data.flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      scopeObj.view.flxSelectOptions.setVisibility(false);
      scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
      data.flxOptions.skin = "slFbox";
      scopeObj.view.tableView.imgHeaderCheckBox.src = "checkbox.png";
      scopeObj.resetSegmentData();
    }
    scopeObj.view.tableView.segServicesAndFaq.setDataAt(data, row_index);
    scopeObj.view.forceLayout();
  },
  hideNoResultsFound: function() {
    var ht1 = this.view.tableView.flxTableView.height;
    this.view.tableView.flxTableView.setVisibility(true);
    this.view.tableView.flxHeaders.setVisibility(true);
    this.view.tableView.flxNoRecordsFound.setVisibility(false);
    this.view.tableView.lblNoRecords.setVisibility(false);
    this.view.tableView.flxHeaderCheckbox.setVisibility(true);
    this.view.FlexUsers.height = ht1;
  },
  flowActions: function() {
    var scopeObj = this;
    this.view.txbFaqQuestion.onKeyUp = function() {
      scopeObj.view.txbFaqQuestion.skin = "skntxtbx484b5214px";
      scopeObj.view.flxNoQuestionError.setVisibility(false);
      if (scopeObj.view.txbFaqQuestion.text.length === 0) {
        scopeObj.view.lblMessageSize.setVisibility(false);
      } else {
        scopeObj.view.lblMessageSize.setVisibility(true);
        scopeObj.view.lblMessageSize.text = scopeObj.view.txbFaqQuestion.text.length + "/300";
      }
      scopeObj.view.forceLayout();
    };
    this.view.txbFaqQuestion.onEndEditing = function(){
      scopeObj.view.lblMessageSize.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.addStaticData.rtxAddStaticContent.onKeyUp = function() {
      scopeObj.view.addStaticData.rtxAddStaticContent.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.addStaticData.flxNoDescriptionError.setVisibility(false);
      if (scopeObj.view.addStaticData.rtxAddStaticContent.text.length === 0) {
        scopeObj.view.addStaticData.lblMessageSize.setVisibility(false);
      } else {
        scopeObj.view.addStaticData.lblMessageSize.setVisibility(true);
        scopeObj.view.addStaticData.lblMessageSize.text = scopeObj.view.addStaticData.rtxAddStaticContent.text.length + "/4000";
      }
      scopeObj.view.forceLayout();
    };
    this.view.addStaticData.rtxAddStaticContent.onEndEditing = function(){
      scopeObj.view.addStaticData.lblMessageSize.setVisibility(false);
      scopeObj.view.forceLayout();

    };
    this.view.tableView.segServicesAndFaq.onRowClick = function() {
      var index = scopeObj.view.tableView.segServicesAndFaq.selectedRowIndex[1];
      var data = scopeObj.view.tableView.segServicesAndFaq.data;
      var selIndices = scopeObj.view.tableView.segServicesAndFaq.selectedRowIndices;
      for(var i=0;i<data.length;i++) {
        if(i === index  &&  data[i].template === "flxServicesAndFaq") {
          data[i].fonticonArrow.text = "\ue915";
          data[i].fonticonArrow.skin = "sknLblIIcoMoon485c7514px";
          data[i].template = "flxServicesAndFaqSelected";
          scopeObj.view.tableView.segServicesAndFaq.setDataAt(data[i], i);
        }
        else if(data[i].template === "flxServicesAndFaqSelected") {
          data[i].fonticonArrow.text = "\ue922";
          data[i].fonticonArrow.skin = "sknLblIIcoMoon485c7514px";
          data[i].template = "flxServicesAndFaq";
          scopeObj.view.tableView.segServicesAndFaq.setDataAt(data[i], i);
        }
      }
      if (selIndices) {  //to hide 'flxSelectOptionsHeader' when everything gets deselected
        if(selIndices[0][1].length === 0)
          scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
      }else{
        scopeObj.view.flxSelectOptionsHeader.setVisibility(false);
      }
      scopeObj.view.forceLayout();
    };

    this.view.noStaticData.btnAddStaticContent.onClick = function() {
      // call to fetch categories
      if (!scopeObj.categories) {
        scopeObj.presenter.fetchCategories(1);
      } else {
        scopeObj.showEditFaq(1);
      }
    };
    this.view.commonButtons.btnNext.onClick = function() {
      if (scopeObj.view.txbFaqQuestion.text.trim() !== "" && scopeObj.view.addStaticData.rtxAddStaticContent.text.trim() !== "") {
        scopeObj.generateEditedData("dontCallFetch");
        scopeObj.clearDataForNew();
      } else {
        scopeObj.showErrorMessage();
      }
      scopeObj.editdata = {
        listOfFAQs: []
      };
    };
    this.view.commonButtons.btnSave.onClick = function() {
      if (scopeObj.view.txbFaqQuestion.text.trim() !== "" && scopeObj.view.addStaticData.rtxAddStaticContent.text.trim() !== "") {
        scopeObj.generateEditedData("callFetch");
      } else {
        scopeObj.showErrorMessage();
      }
      scopeObj.editdata = {
        listOfFAQs: []
      };
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.navigateBreadcrum();
    };
    this.view.tableView.flxHeaderCheckbox.onClick = function() {
      scopeObj.selectAllRows();
    };
    this.view.mainHeader.btnAddNewOption.onClick = function() {
      // call to fetch categories
      if (!scopeObj.categories) {
        scopeObj.presenter.fetchCategories(1);
      } else {
        scopeObj.showEditFaq(1);
      }
    };
    this.view.commonButtons.btnCancel.onClick = function() {
      scopeObj.editdata = {
        listOfFAQs: []
      };
      scopeObj.bunchChanges = {
        listOfFAQs: []
      };
      scopeObj.navigateBreadcrum();
    };
    this.view.flxDeactivate.onClick = function() {
      if (scopeObj.view.lblOption2.text === kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate")) scopeObj.showDeactivate(1);
      else scopeObj.showActivate(1);
    };
    this.view.flxDelete.onClick = function() {
      scopeObj.showDeleteFaq(1);
    };
    this.view.flxEdit.onClick = function() {
      // call to fetch categories
      if (!scopeObj.categories) {
        scopeObj.presenter.fetchCategories(2);
      } else {
        scopeObj.showEditFaq(2);
      }
    };
    this.view.popUpDeactivate.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeactivateFAQ.setVisibility(false);
      scopeObj.view.flxSelectOptions.setVisibility(false);
      scopeObj.view.statusFilterMenu.setVisibility(false);
    };
    this.view.popUpDeactivate.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxDeactivateFAQ.setVisibility(false);
      var toDo = scopeObj.toggleActive();
      scopeObj.changeFAQStatus(toDo, "callFetch");
    };
    this.view.popUp.btnPopUpCancel.onClick = function() {
      scopeObj.view.flxDeleteFAQ.setVisibility(false);
      scopeObj.view.flxSelectOptions.setVisibility(false);
      scopeObj.view.statusFilterMenu.setVisibility(false);
    };
    this.view.popUpDeactivate.flxPopUpClose.onClick = function() {
      scopeObj.view.popUpDeactivate.btnPopUpCancel.onClick();
    };
    this.view.popUp.flxPopUpClose.onClick = function() {
     scopeObj.view.popUp.btnPopUpCancel.onClick();
    };
    this.view.popUp.btnPopUpDelete.onClick = function() {
      scopeObj.view.flxDeleteFAQ.setVisibility(false);
      var toDo = {
        text: true
      };
      scopeObj.changeFAQStatus(toDo, "callFetch");
    };
    this.view.search.flxClearSearchImage.onClick = function() {
      scopeObj.view.search.tbxSearchBox.text = "";
      scopeObj.view.tableView.imgHeaderCheckBox.src = "checkbox.png";
      scopeObj.view.search.flxClearSearchImage.setVisibility(false);
      scopeObj.hideNoResultsFound();
      scopeObj.filterIndiciesArray=[0,1];
      scopeObj.showListFaq(scopeObj.currentFAQData.filter(scopeObj.searchFilter).sort(scopeObj.sortBy.sortData));
      scopeObj.view.forceLayout();
    };

    this.view.search.tbxSearchBox.onKeyUp = function() {
      var data = scopeObj.currentFAQData.filter(scopeObj.searchFilter);
      scopeObj.view.tableView.imgHeaderCheckBox.src = "checkbox.png";
      if (scopeObj.view.search.tbxSearchBox.text === "") {
        scopeObj.view.search.flxClearSearchImage.setVisibility(false);
      } else {
        scopeObj.view.search.flxClearSearchImage.setVisibility(true);
      }
      scopeObj.filterIndiciesArray=[0,1];
      if (data.length === 0) {
        scopeObj.showNoResultsFound();
        scopeObj.view.forceLayout();

      } else {
        scopeObj.hideNoResultsFound();
        scopeObj.showListFaq(data.filter(scopeObj.searchFilter).sort(scopeObj.sortBy.sortData));
        scopeObj.view.forceLayout();
      }
    };
    this.view.flxActiveOption.onClick = function() {
      scopeObj.showActivate(2);
    };
    this.view.flxDeactivateOption.onClick = function() {
      scopeObj.showDeactivate(2);
    };
    this.view.flxDeleteOption.onClick = function() {
      scopeObj.showDeleteFaq(2);
    };

    this.view.tableView.flxHeaderStatus.onClick = function() {
      if(scopeObj.view.statusFilterMenu.isVisible === true){
        scopeObj.view.statusFilterMenu.setVisibility(false);
      }else{
        scopeObj.view.statusFilterMenu.setVisibility(true);
      }  
      scopeObj.view.statusFilterMenu.onHover = scopeObj.filterOnHover;
      var flxRight = scopeObj.view.tableView.flxHeaders.frame.width - scopeObj.view.tableView.flxHeaderStatus.frame.x - scopeObj.view.tableView.flxHeaderStatus.frame.width;
      var iconRight = scopeObj.view.tableView.flxHeaderStatus.frame.width - scopeObj.view.tableView.flxHeaderStatus.flxHeaderStatus1.frame.x;
      scopeObj.view.statusFilterMenu.right = (flxRight + iconRight - 30) +"px";
      scopeObj.setDatafilterMenu();
    };
    this.view.tableView.flxHeaderCategory.onClick = function() {
      var data = scopeObj.view.tableView.segServicesAndFaq.data;
      scopeObj.sortBy.column("lblCategory");
      scopeObj.changesorticon();
      scopeObj.view.tableView.segServicesAndFaq.setData(data.filter(scopeObj.searchFilter).sort(scopeObj.sortBy.sortData));
    };
    this.view.tableView.segServicesAndFaq.onHover=this.saveScreenY;
  },
  filterOnHover: function(widget,context){
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      this.view.statusFilterMenu.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      this.view.statusFilterMenu.setVisibility(false);
    }
  },
  setDatafilterMenu: function() {
    var data = [];
    var left = "";
    var self = this;
    var maxSizeText=kony.i18n.getLocalizedString("i18n.secureimage.Inactive");
    data = [{
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "checkbox.png",
      "lblDescription": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
      "id": "SID_ACTIVE"
    }, {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "checkbox.png",
      "lblDescription": kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
      "id": "SID_INACTIVE"
    }];
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.statusFilterMenu.width=flexWidth+"px";
    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription"
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    this.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [[0,self.filterIndiciesArray]];
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function() {
      self.filterIndiciesArray = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices !== null ? self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices[0][1] : [];
      self.filterData();
    };
  },
  filterData: function() {
    var self = this;
    var filteredData = [];
    var targetSegmentData;
    targetSegmentData = this.currentFAQData;
    var filterSegmentData = this.view.statusFilterMenu.segStatusFilterDropdown.data;
    var filterSegmentIndexArray = this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices !== null ? this.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices[0][1] : [];
    if(filterSegmentIndexArray.length<=0){
      var ht = this.view.tableView.flxNoRecordsFound.height;
      this.showNoResultsFound();
      this.view.tableView.lblNoRecords.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.No_result_found");
      this.view.FlexUsers.height = parseInt(ht.substring(0,ht.indexOf("px")),10) + 60 + "px";
      this.view.flxSelectOptionsHeader.setVisibility(false);
      this.view.tableView.flxHeaders.setVisibility(true);
      return;
    }
    for (var i = 0; i < targetSegmentData.length; i++)
      for (var j = 0; j < filterSegmentIndexArray.length; j++)
        if (targetSegmentData[i].Status_id === filterSegmentData[filterSegmentIndexArray[j]].id) {
          filteredData.push(targetSegmentData[i]);
        }
    if (filteredData.length > 0) {
      var faqData = filteredData.map(this.mappingFaqdata.bind(this));
      this.SetFaqSegmentData(faqData);
      this.hideNoResultsFound();
    } else {
     this.showNoResultsFound();
     this.view.tableView.lblNoRecords.text = kony.i18n.getLocalizedString("i18n.frmAlertsManagementController.No_result_found");
    }
    if(self.view.tableView.imgHeaderCheckBox.src !== "checkbox.png") {
      self.view.tableView.imgHeaderCheckBox.src = "checkbox.png"
      
    } 
    self.view.flxSelectOptionsHeader.setVisibility(false);
    self.view.tableView.flxHeaders.setVisibility(true);
  },
  saveScreenY:function(widget,context){
    this.view.tableView.fixScreenY(context.screenY);
  },
  changesorticon: function() {
    var categorySort = this.determineSortIconForSeg(this.sortBy, "lblCategory");
    this.view.tableView.fonticonHeaderCategory.text = categorySort.text;
    this.view.tableView.fonticonHeaderCategory.skin = categorySort.skin;
    this.view.tableView.fonticonHeaderCategory.hoverSkin = categorySort.hoverSkin;
  },
  callBackTimer: function() {
    this.view.flxToastMessage.isVisible = false;
  },

  setScrollHeight: function() {
    var screenHeight = kony.os.deviceInfo().screenHeight;
    var scrollHeight;
    scrollHeight = screenHeight - 106;
    this.view.flxNoFAQWrapper.height = scrollHeight + "px";
    this.view.flxAddFAQ.height = scrollHeight - 30 + "px";
    this.view.FlexUserTable.height = scrollHeight - 100 + "px";
    this.view.tableView.segServicesAndFaq.height=scrollHeight - 160 + "px";
  },
  ShowNoRecords: function() {
    this.view.flxAddFAQ.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxDeactivateFAQ.setVisibility(false);
    this.view.flxDeleteFAQ.setVisibility(false);
    this.view.breadcrumbs.setVisibility(false);
    this.view.flxMainContent.setVisibility(true);
    this.view.flxSelectOptions.setVisibility(false);
    this.view.statusFilterMenu.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.text = kony.i18n.getLocalizedString("i18n.Faq.AddFaq");
    this.view.flxSelectOptionsHeader.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.isVisible = true;
    this.view.tableView.flxTableView.setVisibility(false);
    this.view.tableView.flxHeaders.setVisibility(false);
    this.view.tableView.flxNoRecordsFound.setVisibility(true);
    this.view.forceLayout();
  },
  generateEditedData: function(condition) {
    var self = this;
    var FAQid,index,data;
    var lblServiceName;
    var flag;
    if (this.currFAQAction === this.actionsConfig.CREATE ) {
      flag = 1;
      FAQid = "NULL";
      lblServiceName = null;
    } else {
      flag = 2;
      index = this.view.tableView.segServicesAndFaq.selectedRowIndex[1];
      data = this.view.tableView.segServicesAndFaq.data;
      if (data[index].FAQid !== "NULL") {
        FAQid = data[index].FAQid;
        lblServiceName = data[index].lblServiceName;
      } else {
        FAQid = "NULL";
        lblServiceName = null;
      }
    }
    //var date = new Date();
    //var uniqueCode = "" + date.getDate() + date.getDay() + date.getFullYear() + date.getHours() + date.getMinutes() + date.getSeconds();
    var editedParam = {
      Status_id: this.view.addStaticData.SwitchToggleStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
      Channel_id: "CH_ID_MOB_INT",
      Answer: this.view.addStaticData.rtxAddStaticContent.text.trim(),
      Question: this.view.txbFaqQuestion.text.trim(),
      QuestionCode: lblServiceName !== null ? lblServiceName : this.uniqueCode,
      CategoryId: this.view.lbxCategory.selectedKey, 
      id: FAQid
    };
    
    if (editedParam.Answer === "" || editedParam.Question === "") {
      // add popup for validation
    } else {
      this.editdata.listOfFAQs.push(editedParam);
    }
    this.editdata.user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    if (flag === 2 && data) data[index].FAQid = "NULL";
    FAQid = "NULL";
    lblServiceName = null;
    var callBack = function(status) {
      if (status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
        kony.adminConsole.utils.hideProgressBar(self.view);
        if (self.view.breadcrumbs.lblCurrentScreen.text === kony.i18n.getLocalizedString("i18n.frmOutageMessageController.EDIT")) {
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmFAQController.FAQ_Updated_successfully"), self);
        } else {
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmFAQController.FAQ_Saved_successfully"), self);
        }
      } else {
        kony.adminConsole.utils.hideProgressBar(self.view);
        self.showListFaq(self.currentFAQData);
        self.view.toastMessage.showErrorToastMessage(self.errorMessage(status), self);
      }
    };
    kony.adminConsole.utils.showProgressBar(self.view);
    if (this.currFAQAction === this.actionsConfig.CREATE )
      self.presenter.createFAQs(self.editdata, condition, callBack);
    else
    self.presenter.updateFAQs(self.editdata, condition, callBack);
  },
  clearDataForNew: function() {
    this.view.txbFaqQuestion.text = "";
    this.view.addStaticData.rtxAddStaticContent.text = "";
    this.view.addStaticData.SwitchToggleStatus.selectedIndex = 0;
    this.view.addStaticData.lblMessageSize.text = "0/4000";
    this.view.lblMessageSize.text = "0/300";
  },
  changeFAQStatus: function(toDo, condition) {
    var self = this;
    self.view.tableView.imgHeaderCheckBox.src = "checkbox.png";
    var data = this.view.tableView.segServicesAndFaq.data;
    var indices = this.view.tableView.segServicesAndFaq.selectedRowIndices;
    if (indices[0][1].length === 1 || indices[0][1].length === 0) {
      var index = this.view.tableView.segServicesAndFaq.selectedRowIndex[1];
      this.bunchChanges.listOfFAQs.push(data[index].FAQid);
    } else {
      var selIndices = indices[0][1];
      for (var i = 0; i < parseInt(selIndices.length); i++) {
        this.bunchChanges.listOfFAQs.push(data[selIndices[i]].FAQid);
      }
    }
    this.bunchChanges.user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    if (toDo.text === true) this.bunchChanges.RemoveFlag = true;
    else if (toDo.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")) this.bunchChanges.Status_id = "SID_INACTIVE";
    else this.bunchChanges.Status_id = "SID_ACTIVE";
    var callBack = function(status) {
      if (status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")) {
        kony.adminConsole.utils.hideProgressBar(self.view);
        if (toDo.text === true) 
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmFAQController.FAQ_deleted_successfully"), self);
        else if (toDo.text === kony.i18n.getLocalizedString("i18n.secureimage.Inactive")) 
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmFAQController.FAQ_deactivated_successfully"), self);
        else 
          self.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmFAQController.FAQ_activated_successfully"), self);
      } else {
        kony.adminConsole.utils.hideProgressBar(self.view);
        self.showListFaq(self.currentFAQData);
        self.view.toastMessage.showErrorToastMessage(self.errorMessage(status), self);
      }
    };
    this.presenter.updateFAQs(this.bunchChanges, condition, callBack);
    kony.adminConsole.utils.showProgressBar(self.view);
    this.bunchChanges = {
      listOfFAQs: []
    };
  },
  mappingFaqdata: function(data) {
    return {
      fonticonArrow: {
        text: "\ue922",
        skin: "sknLblIIcoMoon485c7514px"
      },
      lbleft: ".",
      imgCheckBox: {
        src: "checkbox.png"
      },
      lblIconOptions: {
        text: ""
      },
      fonticonActive: {
        skin: data.Status_id === "SID_ACTIVE" ? "sknFontIconActivate" : "sknfontIconInactive"
      },
      lblDescription: data.Question,
      lblSeparator: ".",
      lblServiceName: data.QuestionCode,
      lblServiceStatus: {
        text: data.Status_id === "SID_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.secureimage.Inactive"),
        skin: "sknlblLatoReg485c7513px"
      },
      lblDescriptionServices: kony.i18n.getLocalizedString("i18n.frmFAQController.ANSWER"),
      lblCategory: data.CategoryName,
      categoryId: data.CategoryId,
      flxLeft: {
        isVisible: true
      },
      lblServiceDescription: {
        text: data.Answer
      },
      template: "flxServicesAndFaq",
      FAQid: data.id,
      Question:data.Question
    };
  },
  //segFaq
  SetFaqSegmentData: function(data) {
    var self = this;
    if(data.length === 0){
      self.showNoResultsFound();
      self.view.search.flxClearSearchImage.isVisible = true;
      self.view.forceLayout();
    }else{
      this.view.tableView.lblHeaderServiceName.text = kony.i18n.getLocalizedString("i18n.Faq.QuestionCode");
      this.view.tableView.lblHeaderDescription.text = kony.i18n.getLocalizedString("i18n.Faq.Question");
      this.view.tableView.lblHeaderServiceStatus.text = kony.i18n.getLocalizedString("i18n.permission.STATUS");
      var dataMap = {
        fonticonArrow: "fonticonArrow",
        flxCheckbox: "flxCheckbox",
        flxDropdown: "flxDropdown",
        flxOptions: "flxOptions",
        flxServicesAndFaq: "flxServicesAndFaq",
        flxServicesAndFaqLeft: "flxServicesAndFaqLeft",
        flxStatus: "flxStatus",
        imgCheckBox: "imgCheckBox",
        lblIconOptions: "lblIconOptions",
        fonticonActive: "fonticonActive",
        lblDescription: "lblDescription",
        lblSeparator: "lblSeparator",
        lblServiceName: "lblServiceName",
        lblServiceStatus: "lblServiceStatus",
        lblDescriptionServices: "lblDescriptionServices",
        lblServiceDescription: "lblServiceDescription",
        flxLeft: "flxLeft",
        lbleft: "lbleft",
        lblCategory: "lblCategory",
        Question:"Question"
      };
      self.OnFirstScroll = true;
      this.view.tableView.segServicesAndFaq.widgetDataMap = dataMap;
      this.view.tableView.segServicesAndFaq.setData(data);
      // adding null check to avoid AAC- 6360
      if(document.getElementById("frmFAQ_tableView_segServicesAndFaq"))
        document.getElementById("frmFAQ_tableView_segServicesAndFaq").onscroll = this.contextualMenuOff;
      // end of fix AAC- 6360
      this.view.forceLayout();
    }
  },
  contextualMenuOff: function(context) {
    this.view.flxSelectOptions.isVisible = false;
  },

  showErrorMessage: function() {
    if (this.view.txbFaqQuestion.text === "") {
      this.view.txbFaqQuestion.skin = "skinredbg";
      this.view.flxNoQuestionError.setVisibility(true);
      this.view.forceLayout();
    } else {
      this.view.flxNoQuestionError.setVisibility(false);
      this.view.txbFaqQuestion.skin = "skntxtbx484b5214px";
      this.view.forceLayout();
    }
    if (this.view.addStaticData.rtxAddStaticContent.text === "") {
      this.view.addStaticData.rtxAddStaticContent.skin = "skinredbg";
      this.view.addStaticData.flxNoDescriptionError.setVisibility(true);
      this.view.forceLayout();
    } else {
      this.view.addStaticData.flxNoDescriptionError.setVisibility(false);
      this.view.forceLayout();
      this.view.addStaticData.rtxAddStaticContent.skin = "skntxtAreaLato35475f14Px";
    }
  },
  resetSegmentData: function() {
    var scopeObj = this;
    var data = scopeObj.view.tableView.segServicesAndFaq.data;
    for(var i=0;i<data.length;i++)
    {
      if(data[i].imgCheckBox.src == "checkboxselected.png") {
        data[i].imgCheckBox.src = "checkbox.png";
      }
    }
    scopeObj.view.tableView.segServicesAndFaq.setData(data);
    document.getElementById("frmFAQ_tableView_segServicesAndFaq").onscroll = scopeObj.contextualMenuOff;
    scopeObj.view.tableView.forceLayout();
  }
});

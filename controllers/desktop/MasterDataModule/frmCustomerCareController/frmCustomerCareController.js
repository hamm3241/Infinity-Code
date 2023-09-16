define({
  flag: null,
  flagTrack: 1,
  flagOfError: 0,
  flagSaveTrack: 1,
  flagFillOne: 0,
  countArray: {},
  contactsData: {},
  serviceID: "",
  deletedContacts: [],
  records: 0,
  finalData: {},
  listingData: [],
  addCustCareInfoNoOfEntries: 1,
  prevIndex : -1,

  willUpdateUI: function (context) {

    if (context !== undefined) {
      this.updateLeftMenu(context);
      this.finalData = context;
      if (context.action === "contactsList") {
        this.showContactsUI(context);
      } else if (context.progressBar && context.progressBar.show && context) {
        if (context.progressBar.show === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success"))
          kony.adminConsole.utils.showProgressBar(this.view);
        else
          kony.adminConsole.utils.hideProgressBar(this.view);
      } else if (context.action === "editSuccess") {
        this.view.flxCustomercareInformation.setVisibility(false);
        this.view.flxListingPage.setVisibility(true);
        this.view.flxBreadCrumbs.setVisibility(false);
        this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
        this.showHeaderButtons();
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.listingSegmentClient.contextualMenu.flxOptionsSeperator.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_edit_Successfully"), this);
        //this.presenter.fetchAllCustomerCareDetails();
        this.showContactsUI(context);
      } else if (context.action === "editFailure") {
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } else if (context.action === "deleteSuccess") {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.flxImportDeletePopup.setVisibility(false);
        this.deleteSelectedRow();
        this.presenter.fetchAllCustomerCareDetails();
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_Delete_Successfully"), this);
      } else if (context.action === "deleteFailure") {
        this.view.flxImportDeletePopup.setVisibility(false);
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } else if (context.action === "addSuccess") {
        if (this.flagSaveTrack === 1) {
          this.view.flxCustomercareInformation.setVisibility(false);
          this.view.flxListingPage.setVisibility(true);
          this.view.flxBreadCrumbs.setVisibility(false);
          this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
          this.showHeaderButtons();
          this.view.listingSegmentClient.contextualMenu.flxOptionsSeperator.setVisibility(false);
          this.presenter.fetchAllCustomerCareDetails();
          this.loadPageData();
        } else {
          this.view.addNewRow.segData.removeAll();
          this.addNewContactDetails();
          this.flagTrack = 1;
          this.addCustomerCareInformation();
          this.view.flxScrollMainContent.setVisibility(true);
          this.view.flxScrollMainContent.flxCustomercareInformation.isVisible = true;
          this.view.flxScrollMainContent.flxListingPage.isVisible = false;
          this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
          this.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
          this.view.informationButtons.btnNext.setVisibility(true);
        }
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.flxError.setVisibility(false);
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_added_Successfully"), this);
      } else if (context.action === "addFailure") {
        this.view.flxError.setVisibility(false);
        this.view.flxCustomercareInformation.setVisibility(false);
        this.view.flxListingPage.setVisibility(true);
        this.view.flxBreadCrumbs.setVisibility(false);
        this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
        this.showHeaderButtons();
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.listingSegmentClient.contextualMenu.flxOptionsSeperator.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } else if (context.action === "updateSuccess") {
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.flxDeactivePopup.setVisibility(false);
        this.toggleLocationStatus();
        this.showContactsUI(context);
        kony.adminConsole.utils.hideProgressBar(this.view);
      } else if (context.action === "updateFailure") {
        this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
        this.view.flxDeactivePopup.setVisibility(false);
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      } else if (context.action === "error") {
        this.view.toastMessage.showErrorToastMessage(context.message, this);
      }
    }
  },

  showContactsUI: function (context) {
    this.view.subHeader.tbxSearchBox.text = "";
    this.hideNoResultsFound();
    kony.adminConsole.utils.showProgressBar(this.view);
    if (context[kony.i18n.getLocalizedString("i18n.frmCustomerCareController.contacts")] && context[kony.i18n.getLocalizedString("i18n.frmCustomerCareController.contacts")].length !== 0) {
      this.view.flxScrollMainContent.isVisible = true;
      this.view.flxScrollMainContent.flxCustomercareInformation.isVisible = false;
      this.view.flxScrollMainContent.flxListingPage.isVisible = true;
      this.view.flxImportDetails.isVisible = false;
      this.showHeaderButtons();
      if (context.contacts) {
        this.sortBy = this.getObjectSorter('Service_Name');
        var self = this;
        this.loadPageData = function () {
          self.setListingPageData(context.contacts.filter(self.searchFilter).sort(self.sortBy.sortData));
          self.records = context.contacts.filter(self.searchFilter).length;
          self.view.subHeader.flxClearSearchImage.setVisibility(false);

        };
        this.loadPageData();
      }
      kony.adminConsole.utils.hideProgressBar(this.view);

    } else {
      this.view.flxImportDetails.isVisible = true;
      this.view.flxScrollMainContent.isVisible = false;
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    this.view.forceLayout();
  },
  setStatusFilterData: function () {
    var self = this;
    var statusList = [];
    var maxSizeText="";
    for (var i = 0; i < this.listingdata.length; i++) {
      if (!statusList.contains(this.listingdata[i].lblStatus.text))
        statusList.push(this.listingdata[i].lblStatus.text);
    }

    var widgetMap = {
      "flxSearchDropDown": "flxSearchDropDown",
      "flxCheckBox": "flxCheckBox",
      "imgCheckBox": "imgCheckBox",
      "lblDescription": "lblDescription",
      "id": "id"
    };
    var data = statusList.map(function (record) {
      maxSizeText=record.length>maxSizeText.length?record:maxSizeText;
      return {
        "flxSearchDropDown": "flxSearchDropDown",
        "flxCheckBox": "flxCheckBox",
        "id": "SID_ACTIVE",
        "lblDescription": record,
        "imgCheckBox": {
          "src": "checkbox.png"
        },
      };
    });
    var flexWidth= this.AdminConsoleCommonUtils.getLabelWidth(maxSizeText)+55;
    this.view.flxStatusFilter.width=flexWidth+"px";
    self.view.statusFilterMenu.segStatusFilterDropdown.widgetDataMap = widgetMap;
    self.view.statusFilterMenu.segStatusFilterDropdown.setData(data);
    var indices = [];
    for (var index = 0; index < data.length; index++) {
      indices.push(index);
    }
    self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices = [
      [0, indices]
    ];
  },
  performStatusFilter: function () {
    var self = this;
    var selStatus = [];
    var selInd;
    var dataToShow = [];
    var segStatusData = self.view.statusFilterMenu.segStatusFilterDropdown.data;
    var indices = self.view.statusFilterMenu.segStatusFilterDropdown.selectedIndices;
    if (indices !== null) { //show selected indices data
      selInd = indices[0][1];
      for (var i = 0; i < selInd.length; i++) {
        selStatus.push((self.view.statusFilterMenu.segStatusFilterDropdown.data[selInd[i]].lblDescription).toLowerCase());
      }
      if (selInd.length === segStatusData.length) { //all are selected
        self.view.listingSegmentClient.segListing.setData(self.listingdata);
      } else {
        dataToShow = self.listingdata;

        dataToShow = self.listingdata.filter(function (rec) {
          if (selStatus.indexOf(rec.lblStatus.text.toLowerCase()) >= 0) {
            return rec;
          }
        });
        if (dataToShow.length > 0) {
          //self.view.rtxNoResultsFound.setVisibility(false);
          self.view.listingSegmentClient.segListing.setData(dataToShow);
        }
      }
      this.view.listingSegmentClient.segListing.setVisibility(true);
      this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
    } else {
      // self.view.listingSegmentClient.segListing.setData(self.listingdata);
      self.view.listingSegmentClient.segListing.setData([]);
      this.view.listingSegmentClient.segListing.setVisibility(false);
      this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
      this.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmUsersController.No_results_found");
    }
    this.view.forceLayout();
  },
  customercarePreShow: function () {
    this.view.addNewRow.btnAddMore.setVisibility(false);
    //     kony.adminConsole.utils.showProgressBar(this.view);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    this.view.flxScrollMainContent.height = screenHeight - 130 + "px";
    this.view.flxCustomerData.maxHeight = screenHeight - 335 + "px";
    this.view.listingSegmentClient.segListing.height = screenHeight - 240 + "px";
    this.view.imgSortEmail.setVisibility(false);
    this.view.imgSortPhone.setVisibility(false);
    this.sortBy = this.getObjectSorter('Service_Name');
    this.resetSortImages();
    this.view.flxStatusFilter.setVisibility(false);
    this.view.lblCharCount.setVisibility(false);
    //this.view.flxImportDetails.setVisibility(true);
    // this.view.flxScrollMainContent.setVisibility(false);
    this.view.mainHeader.flxHeaderSeperator.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(false);
    this.setFlowActions();
    //this.hideHeaderButtons();
    this.setWidgetsDataByDefault();
    this.view.listingSegmentClient.flxPagination.isVisible = false;
    this.view.subHeader.flxMenu.isVisible = false;
    this.view.mainHeader.btnDropdownList.isVisible = false;
    this.view.mainHeader.btnAddNewOption.right = "0px";
    this.view.flxBreadCrumbs.setVisibility(false);
    this.view.flxToastMessage.setVisibility(false);
    this.view.mainHeader.btnAddNewOption.text=kony.i18n.getLocalizedString("i18n.frmCustomerCare.addCustomerCareInfo");
    this.setMasterData();
  },
  setMasterData: function () {
    var dataMap = {
      "flxCustomerInformation": "flxCustomerInformation",
      "flxContactNumberWrapper": "flxContactNumberWrapper",
      "txtbxPhoneNumber": "txtbxPhoneNumber",
      "txtISDCode":"txtISDCode",
      "lblDash":"lblDash",
      "flxError":"flxError",
      "lblErrorIcon":"lblErrorIcon",
      "lblErrorText": "lblErrorText",
      "lblActive": "lblActive",
      "SwitchActive": "SwitchActive",
      "txtbxEmailid": "txtbxEmailid",
      "lblActiveStatus": "lblActiveStatus",
      "SwitchActiveStatus": "SwitchActiveStatus",
      "flxDelete": "flxDelete",
      "fontIconDelete": "fontIconDelete",
      "lblSeparator": "lblSeparator",
      "communication_id_phone": "communication_id_phone",
      "communication_id_email": "communication_id_email",
      "lblNoPhoneNumberError": "lblNoPhoneNumberError",
      "lblNoEmailIDError": "lblNoEmailIDError",
    };
    this.view.addNewRow.segData.widgetDataMap = dataMap;
  },
  setWidgetsDataByDefault: function () {
    //this.view.flxLoading.setVisibility(false);
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.lblHeader.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.btnLink1.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.btnLink2.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.flxOptionsSeperator.setVisibility(false);
    this.view.listingSegmentClient.contextualMenu.lblIconOption1.text = "";
    this.view.listingSegmentClient.contextualMenu.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
    this.view.listingSegmentClient.contextualMenu.lblIconOption2.text = "";
    this.view.listingSegmentClient.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Deactivate_Record");
    this.view.listingSegmentClient.contextualMenu.lblIconOption3.text = "";
    this.view.listingSegmentClient.contextualMenu.lblOption3.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Delete_Record");
    this.view.listingSegmentClient.contextualMenu.flxOption4.setVisibility(false);
    this.view.informationButtons.btnNext.text = kony.i18n.getLocalizedString("i18n.CommonButtons.Save_AddNew");
    // this.view.noStaticData.imgBackground.setVisibility(false);
    this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_Heading");
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.DragBox.ADD");
    this.view.breadcrumbs.btnPreviousPage.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.PLATINUM_DEBIT_CARD_SERVICE");
    this.view.noStaticData.btnAddStaticContent.text = kony.i18n.getLocalizedString("i18n.DragBox.ADD");
    this.view.noStaticData.lblNoStaticContentCreated.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.No_Customer_care_added");
    this.view.noStaticData.lblNoStaticContentMsg.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Click_Add_Enter_Customer_care");
    this.view.popUp1.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Deactivate_Customer_Care");
    this.view.popUp1.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUp1.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDeactivate");
    this.view.popUp1.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Deactivate_Customer_Care_PopupMessage");
    this.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Delete_Customer_Care_PopupQuestion");
    this.view.popUp.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUp.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesDelete");
    this.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Delete_Customer_Care_PopupContent");
  },
  hideHeaderButtons: function () {
    this.view.mainHeader.flxButtons.setVisibility(false);
  },
  showHeaderButtons: function () {
    this.view.mainHeader.flxButtons.setVisibility(true);
  },
  togglePhoneNumber: function () {
    //functionality for deactive and active the phonenumber
  },
  toggleEmailId: function () {
    //functionality for deactive and active the emaiid
  },

  isValidPhone: function (phone) {
    if (phone.length < 10) {
      return false;
    } else {
      return true;
    }
  },

  isValidEmail: function (email) {
    var emailCheck = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email));
    if (emailCheck) {
      return true;
      // this.view.registerErrorMsgTextbox.isVisible=false;
      // authModule.presentationController.sendResetPasswordEmail(this, {"emailId":userEmailId});
    } else {
      return false;
      //this.view.registerErrorMsgTextbox.isVisible=true;
    }
  },
  allowOnlyPhoneNumber: function(e) {
    var phoneNumber = /^[+|\-|0-9]/;
    e = e || event;
    var char = e.type === 'keyup' ? String.fromCharCode(e.keyCode || e.which) : event.target.value;
    var sec = phoneNumber.test(char);
    if (!sec) {
      let num='';
      let str = event.target.value;
      for(var i=0;i<str.length;i++){
        if((str[i].charCodeAt(0)>=48 && str[i].charCodeAt(0)<=57) || str[i].charCodeAt(0)==43 || str[i].charCodeAt(0)==45)
          num += str[i];
      }
      event.target.value = num;
    }
  },
  restrictTextFieldToPhoneNumber: function(widgetID) {
    var text = document.getElementById(widgetID);
    this.allowOnlyPhoneNumber();
  },
  allowOnlyISDCode : function(e){
    var ISDCode = /^(\+?\d{1,3}|\+?\d{1,4})$/;
    e = e || event;
    var char = e.type === 'keyup' ? String.fromCharCode(e.keyCode || e.which) : event.target.value;
    var sec = ISDCode.test(char);
    if(!sec) {
      let num = '';
      let str = event.target.value;
      for(var i=0;i<str.length;i++){
        if((str[i].charCodeAt(0)>=48 && str[i].charCodeAt(0)<=57) || (str[i].charCodeAt(0)==43 && i===0))
          num += str[i];
      }
      event.target.value = num;
    }
    if(event.target.value[0]!='+' && event.target.value.length!==0){
      event.target.value = "+"+event.target.value;
    }
  },
  restrictTextFieldToISDCode: function(widgetID){
    var text = document.getElementById(widgetID);
    this.allowOnlyISDCode();
  },
  addNewContactDetails: function () {
    var self = this;
    var data = this.view.addNewRow.segData.data;
    if (data.length === 1) {
      self.showFirstRowDeleteIcon();
    }
    var toAdd = {
      "txtbxPhoneNumber": {
        "placeholder": kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Phone_Number"),
        "text": "",
        "skin": "skntxtbxDetails0bbf1235271384a",
        "onKeyUp": function () {
          self.restrictTextFieldToPhoneNumber('flxCustomerInformation_txtbxPhoneNumber');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        },
        "onBeginEditing": function() {
          self.restrictTextFieldToPhoneNumber('flxCustomerInformation_txtbxPhoneNumber');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        },
      },
      "lblActive": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
      "SwitchActive": {
        "selectedIndex": 0,
        "skin": "sknSwitchServiceManagement",
        "onSlide": function () {
          self.togglePhoneNumber();
        }
      },
      "txtISDCode":{
        "text": "+",
        "onKeyUp": function(){
          self.restrictTextFieldToISDCode('flxCustomerInformation_txtISDCode');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        },
        "onBeginEditing": function(){
          self.restrictTextFieldToISDCode('flxCustomerInformation_txtISDCode');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        }
      },
      "txtbxEmailid": {
        "onKeyUp": function () {
          self.errorDeactive("email");
        },
        "placeholder": kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Email_ID"),
        "text": "",
        "skin": "skntxtbxDetails0bbf1235271384a"
      },
      "lblActiveStatus": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
      "flxDelete": {
        "isVisible": true,
        "onClick": function () {
          self.deleteRow();
        }
      },
      "fontIconDelete": {
        "text": "",
        "isVisible": true
      },
      "SwitchActiveStatus": {
        "skin": "sknSwitchServiceManagement",
        "selectedIndex": 0,
        "onSlide": function () {
          self.toggleEmailId();
        }
      },
      "lblSeparator": {
        "skin": "sknlblSeperator"
      },
      "lblNoPhoneNumberError": {
        "isVisible": false
      },
      "lblNoEmailIDError": {
        "isVisible": false
      },
      "template": "flxCustomerInformation",
      "communication_id_phone": undefined,
      "communication_id_email": undefined,

    };
    data.push(toAdd);
    this.view.addNewRow.segData.setData(data);
    this.addCustCareInfoNoOfEntries = this.addCustCareInfoNoOfEntries + 1;
    this.view.addNewRow.btnAddMore.setVisibility(false);
    this.view.forceLayout();
  },
  errorsRemove: function () {
    this.view.flxError.setVisibility(false);
    this.view.txtbxServiceName.skin = "skntxtbxDetails0bbf1235271384a";
    this.view.flxNoServiceNameError.setVisibility(false);
  },
  errorDeactive: function (param) {
    var scopeObj = this;
    // this.view.flxError.setVisibility(false);
    var data = this.view.addNewRow.segData.data;
    var index = this.view.addNewRow.segData.selectedIndex[1];
    var email_data = data[index].txtbxEmailid.text;
    var phone_data = data[index].txtISDCode.text+data[index].txtbxPhoneNumber.text;
    //     if(data.length === 1){
    // if(email_data ===  "" && phone_data ===""){
    //   data[index].flxDelete.isVisible = false;
    //   data[index].fontIconDelete.isVisible = false;
    // }
    // else
    // {
    //    data[index].flxDelete.isVisible = true;
    //    data[index].fontIconDelete.isVisible = true;
    //   }
    //       scopeObj.view.addNewRow.segData.setData(data);
    // }
    if (scopeObj.flagOfError === 1) {
      if (param === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone")) {
        data[index].txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
        data[index].txtbxPhoneNumber.skin = "skntxtbxDetails0bbf1235271384a";
        data[index].lblNoPhoneNumberError.isVisible = false;
      } else if (param === "email") {
        data[index].txtbxEmailid.skin = "skntxtbxDetails0bbf1235271384a";
        data[index].lblNoEmailIDError.isVisible = false;
      }
      this.view.addNewRow.segData.setData(data);
      scopeObj.flagOfError = 0;
    }
    if (scopeObj.countArray[index] !== undefined) {
      if (scopeObj.countArray[index] === "true") {
        data[index].txtbxEmailid.skin = "skntxtbxDetails0bbf1235271384a";
        data[index].txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
        data[index].txtbxPhoneNumber.skin = "skntxtbxDetails0bbf1235271384a";
        delete scopeObj.countArray[index];
        if (Object.keys(scopeObj.countArray).length === 0) {
          this.view.flxError.setVisibility(false);
        }
      }
      this.view.addNewRow.segData.setData(data);
    }
  },
  showNoResultsFound: function () {
    this.view.listingSegmentClient.segListing.setVisibility(false);
    this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(true);
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    this.view.listingSegmentClient.rtxNoResultsFound.text = kony.i18n.getLocalizedString("i18n.frmPoliciesController.No_results_found") + "\"" + searchText + "\"" + kony.i18n.getLocalizedString("i18n.frmPoliciesController.Try_with_another_keyword");
    this.view.flxCustomerCareHeader.setVisibility(false);
  },
  hideNoResultsFound: function () {
    this.view.listingSegmentClient.segListing.setVisibility(true);
    this.view.listingSegmentClient.rtxNoResultsFound.setVisibility(false);
    this.view.flxCustomerCareHeader.setVisibility(true);
  },
  showEditCustomerCareInfo: function () {
    this.hideHeaderButtons();
    this.errorsRemove();
    this.view.subHeader.flxSearchContainer.setVisibility(false);
    this.view.flxImportDetails.setVisibility(false);
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxCustomercareInformation.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.breadcrumbs.btnPreviousPage.setVisibility(false);
    var dataEdit = this.view.listingSegmentClient.segListing.data;
    var index = this.view.listingSegmentClient.segListing.selectedRowIndex;
    this.view.breadcrumbs.lblCurrentScreen.text = dataEdit[index[1]].lblName;
    this.view.mainHeader.lblHeading.text = "Edit Customer Care Information";
    //this.view.breadcrumbs.btnPreviousPage.text=dataEdit[index[0]][1][index[1]].lblName;
    //this.view.breadcrumbs.imgBreadcrumbsRight2.setVisibility(true);
    this.view.flxListingPage.setVisibility(false);
    this.view.informationButtons.btnNext.setVisibility(false);

    this.view.SwitchActive.selectedindex = dataEdit[index[1]].lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? 0 : 1;
    this.view.txtbxServiceName.text = dataEdit[index[1]].lblName;
    this.serviceID = dataEdit[index[1]].contact_id;
    this.view.addNewRow.segData.removeAll();
    this.setsegCustomerInformationData(this.contactsData[index[1]].Communication_Records);
    this.view.forceLayout();
  },
  showSelectedSegment: function () {

    var index = this.view.listingSegmentClient.segListing.selectedIndex;
    //var rowIndex = index[1];
    var data = this.view.listingSegmentClient.segListing.data;
    // dataindex[0]][1][index[1].imgArrow
    if (data[index[1]].template === "flxCustomerCareSelected") {
      for (var i = 0; i < data.length; i++) {
        data[i].template = "flxCustomerCare";
        data[i].fonticonArrow.text = data[i].lblEmail1 === undefined && data[i].lblPhone1 === undefined ? "" : "";
      }
      data[index[1]].template = "flxCustomerCare";
      data[index[1]].fonticonArrow.text = "";
    } else {
      for (var j = 0; j < data.length; j++) {
        data[j].template = "flxCustomerCare";
        data[j].fonticonArrow.text = data[j].lblEmail1 === undefined && data[j].lblPhone1 === undefined ? "" : "";
      }
      data[index[1]].template = "flxCustomerCareSelected";
      data[index[1]].fonticonArrow.text = "";
    }
    this.view.listingSegmentClient.segListing.setData(data);
    this.view.forceLayout();
  },

  toggleContextualMenu: function (rowHeight) {
    var scopeObj = this;
    
    var index = this.view.listingSegmentClient.segListing.selectedIndex;
    scopeObj.optionButtonStateChange(index[1], true);

    if (this.view.listingSegmentClient.flxContextualMenu.isVisible === false) {
      scopeObj.updateContextualMenu(index[1]);
      this.rowIndex = index[1];  
      var templateArray = this.view.listingSegmentClient.segListing.clonedTemplates;
      //to caluclate top from preffered row heights
      var finalHeight = 0;
      for(var i = 0; i < this.rowIndex; i++){
        finalHeight = finalHeight + templateArray[i].flxCustomerCareSelected.frame.height;
      }
      var flexLeft = this.view.listingSegmentClient.segListing.clonedTemplates[this.rowIndex].flxOptions.frame.x;
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(true);
      this.view.forceLayout();
      
      var segmentWidget = this.view.listingSegmentClient.segListing;
      var contextualWidget =this.view.listingSegmentClient.contextualMenu;
      finalHeight = ((finalHeight + 42)- segmentWidget.contentOffsetMeasured.y);
      if(finalHeight+contextualWidget.frame.height > segmentWidget.frame.height){
        finalHeight = finalHeight - contextualWidget.frame.height - 28;
        scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(false);
        scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(true);
        scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "0px";
      }
      else {
        scopeObj.view.listingSegmentClient.contextualMenu.flxUpArrowImage.setVisibility(true);
        scopeObj.view.listingSegmentClient.contextualMenu.flxDownArrowImage.setVisibility(false);
        scopeObj.view.listingSegmentClient.contextualMenu.contextualMenu1Inner.top = "-1px";
      }
      this.view.listingSegmentClient.flxContextualMenu.top= finalHeight + "px";
    } else {
      this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    }
    kony.print(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.toggleContextualMenu_customercare"));
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

  searchFilter: function (Permission) {
    var searchText = this.AdminConsoleCommonUtils.getEncodedTextInput(this.view.subHeader.tbxSearchBox.text);
    if (typeof searchText === 'string' && searchText.length > 0) {
      return Permission.Service_Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    } else  
      return true;
  },
  updateContextualMenu: function(index) {
    var data = this.view.listingSegmentClient.segListing.data;
    if (data[index].lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      this.view.listingSegmentClient.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Deactivate_Record");
      this.view.listingSegmentClient.contextualMenu.lblIconOption2.text = "";
    } else {
      this.view.listingSegmentClient.contextualMenu.lblOption2.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Activate_Record");
      this.view.listingSegmentClient.contextualMenu.lblIconOption2.text = "";
    }
  },
  toggleLocationStatus: function () {
    var data = this.view.listingSegmentClient.segListing.data;
    var index = this.view.listingSegmentClient.segListing.selectedrowindex;

    if (data[index[1]].lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
      data[index[1]].lblStatus = {
        "text": kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive"),
        "skin": "sknlblLato5bc06cBold14px"
      };
      data[index[1]].fontIconStatus.skin = "sknfontIconInactive";
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_Status_Deactivate_Successful"), this);
      // this.view.toastMessage.lbltoastMessage.text=kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_deactivated_successfully");
    } else {
      data[index[1]].lblStatus = {
        "text": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
        "skin": "sknlblLato5bc06cBold14px"
      };
      data[index[1]].fontIconStatus.skin = "sknFontIconActivate";
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_Status_Activate_Successful"), this);
      //this.view.toastMessage.lbltoastMessage.text=kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_activated_successfully");
    }

    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    this.view.listingSegmentClient.segListing.setData(data);
  },
  deleteSelectedRow: function () {
    var data = this.view.listingSegmentClient.segListing.data;
    if (data.length >= 2) {
      this.view.listingSegmentClient.segListing.removeAt(this.rowIndex);
      //this.view.toastMessage.lbltoastMessage.text=kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Customer_Care_Delete_Successfully");
    } else {
      this.hideHeaderButtons();
      this.view.flxImportDetails.setVisibility(true);
      this.view.flxScrollMainContent.setVisibility(false);
      this.view.flxCustomercareInformation.setVisibility(false);
      this.view.flxBreadCrumbs.setVisibility(false);
      this.view.listingSegmentClient.segListing.removeAt(this.rowIndex);

    }
    this.view.listingSegmentClient.flxContextualMenu.setVisibility(false);

  },

  hideFirstRowDeleteIcon: function() {
    var scopeObj = this;
    var data = scopeObj.view.addNewRow.segData.data;
    data[0].flxDelete.isVisible = false;
    scopeObj.view.addNewRow.segData.setData(data);
  },

  showFirstRowDeleteIcon: function() {
    var scopeObj = this;
    var data = scopeObj.view.addNewRow.segData.data;
    data[0].flxDelete.isVisible = true;
    scopeObj.view.addNewRow.segData.setData(data);
  },

  deleteRow: function () {
    var scopeObj = this;
    var hideDeleteIcon = false;
    var data = scopeObj.view.addNewRow.segData.data;
    var index = scopeObj.view.addNewRow.segData.selectedindex[1];
    var selectedData = scopeObj.view.addNewRow.segData.data[index];
    if (selectedData.communication_id_phone !== undefined) {
      scopeObj.deletedContacts.push(selectedData.communication_id_phone);
    }
    if (selectedData.communication_id_email !== undefined) {
      scopeObj.deletedContacts.push(selectedData.communication_id_email);
    }

    if (data.length === 1) {
      data[0].flxDelete.isVisible = false;

      data[index].txtbxEmailid.text = "";
      data[index].txtISDCode.text = "+";
      data[index].txtbxPhoneNumber.text = "";
      scopeObj.view.addNewRow.segData.setData(data);
      //scopeObj.setsegCustomerInformationData();
    } else {
      if (data.length === 2) {
        hideDeleteIcon = true;
      }
      var Index = scopeObj.view.addNewRow.segData.selectedIndex;
      var rowIndex = Index[1];
      delete scopeObj.countArray[rowIndex];
      this.view.addNewRow.segData.removeAt(rowIndex);
    }
    if (hideDeleteIcon) scopeObj.hideFirstRowDeleteIcon();
    if (Object.keys(scopeObj.countArray).length === 0) {
      this.view.flxError.setVisibility(false);
    }
    this.addCustCareInfoNoOfEntries = this.addCustCareInfoNoOfEntries - 1;
    this.view.btnAddMore.setVisibility(true);
    this.view.forceLayout();
  },
  addCustomerCareInformation: function () {
    var self = this;
    this.hideHeaderButtons();
    this.view.flxImportDetails.setVisibility(false);
    this.view.flxScrollMainContent.setVisibility(true);
    this.view.flxCustomercareInformation.setVisibility(true);
    this.view.flxBreadCrumbs.setVisibility(true);
    this.view.flxListingPage.setVisibility(false);
    this.view.txtbxServiceName.text = "";
    //  var data=this.view.addNewRow.segData.data;
    var data = [{
      "communication_id_phone": undefined,
      "communication_id_email": undefined,
      "txtISDCode":{
        "text": "+",
        "onKeyUp": function(){
          self.restrictTextFieldToISDCode('flxCustomerInformation_txtISDCode');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        },
        "onBeginEditing": function(){
          self.restrictTextFieldToISDCode('flxCustomerInformation_txtISDCode');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        }
      },
      "lblDash":"-",
      "flxError":"flxError",
      "lblErrorIcon":"lblErrorIcon",
      "lblErrorText": "lblErrorText",
      "txtbxPhoneNumber": {
        "placeholder": kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Phone_Number"),
        "onKeyUp": function () {
          self.restrictTextFieldToPhoneNumber('flxCustomerInformation_txtbxPhoneNumber');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        },
        "onBeginEditing": function() {
          self.restrictTextFieldToPhoneNumber('flxCustomerInformation_txtbxPhoneNumber');
          self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
        },
        "text": "",
        "skin": "skntxtbxDetails0bbf1235271384a"
      },
      "lblActive": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
      "SwitchActive": {
        "selectedIndex": 0,
        "skin": "sknSwitchServiceManagement",
        "onSlide": function () {
          self.togglePhoneNumber();
        }
      },
      "txtbxEmailid": {
        "onKeyUp": function () {
          self.errorDeactive("email");
        },
        "placeholder": kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Email_ID"),
        "text": "",
        "skin": "skntxtbxDetails0bbf1235271384a"
      },
      "lblActiveStatus": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
      "flxDelete": {
        "isVisible": true,
        "onClick": function () {
          self.deleteRow();
        }
      },
      "lblNoPhoneNumberError": {
        "isVisible": false
      },
      "lblNoEmailIDError": {
        "isVisible": false
      },
      "fontIconDelete": {
        "text": "",
        "isVisible": true
      },
      "SwitchActiveStatus": {
        "skin": "sknSwitchServiceManagement",
        "onSlide": function () {
          self.toggleEmailId();
        },
        "selectedIndex": 0
      },
      "lblSeparator": {
        "skin": "sknlblSeperator"
      },
      "template": "flxCustomerInformation"
    }];
    this.view.addNewRow.segData.setData(data);
    this.view.forceLayout();
  },
  setsegCustomerInformationData: function (data) {
    var self = this;
    var dataMap = {
      "flxCustomerInformation": "flxCustomerInformation",
      "flxContactNumberWrapper":"flxContactNumberWrapper",
      "txtISDCode":"txtISDCode",
      "lblDash":"lblDash",
      "flxError":"flxError",
      "lblErrorIcon":"lblErrorIcon",
      "lblErrorText": "lblErrorText",
      "txtbxPhoneNumber": "txtbxPhoneNumber",
      "lblActive": "lblActive",
      "SwitchActive": "SwitchActive",
      "txtbxEmailid": "txtbxEmailid",
      "lblActiveStatus": "lblActiveStatus",
      "SwitchActiveStatus": "SwitchActiveStatus",
      "flxDelete": "flxDelete",
      "lblNoPhoneNumberError": "lblNoPhoneNumberError",
      "lblNoEmailIDError": "lblNoEmailIDError",
      "fontIconDelete": "fontIconDelete",
      "lblSeparator": "lblSeparator",
      "communication_id_phone": "communication_id_phone",
      "communication_id_email": "communication_id_email",

    };

    var dataToAdd = [];
    dataToAdd = data.map(function (data) {
      return {
        "communication_id_phone": data.phoneCommId,
        "communication_id_email": data.emailCommId,
        "txtISDCode":{
          "text": data.phone.split("-")[0],
          "onKeyUp": function(){
            self.restrictTextFieldToISDCode('flxCustomerInformation_txtISDCode');
            self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
          },
          "onBeginEditing": function(){
            self.restrictTextFieldToISDCode('flxCustomerInformation_txtISDCode');
            self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
          }
        },
        "lblDash":"-",
        "flxError":"flxError",
        "lblErrorIcon":"lblErrorIcon",
        "lblErrorText": "lblErrorText",
        "txtbxPhoneNumber": {
          "placeholder": kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Phone_Number"),
          "textInputMode": constants.TEXTBOX_INPUT_MODE_ANY,
          "onKeyUp": function (event) {
            self.restrictTextFieldToPhoneNumber('flxCustomerInformation_txtbxPhoneNumber');
            self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
          },
          "onBeginEditing": function() {
            self.restrictTextFieldToPhoneNumber('flxCustomerInformation_txtbxPhoneNumber');
            self.errorDeactive(kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone"));
          },
          "text": (data.phone === undefined ||  data.phone ===kony.i18n.getLocalizedString("i18n.frmCustomers.NA")) ? "" : data.phone.split("-")[1],
          "skin": "skntxtbxDetails0bbf1235271384a"
        },
        "lblActive": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
        "SwitchActive": {
          "skin": "sknSwitchServiceManagement",
          "onSlide": function () {
            self.togglePhoneNumber();
          },
          "selectedIndex": data.phoneStatus === "SID_ACTIVE" ? 0 : 1
        },
        "txtbxEmailid": {
          "onKeyUp": function () {
            self.errorDeactive("email");
          },
          "placeholder": kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Email_ID"),
          "text":( data.email === undefined || data.email ===  kony.i18n.getLocalizedString("i18n.frmCustomers.NA")) ? "" : data.email,
          "skin": "skntxtbxDetails0bbf1235271384a"
        },
        "lblActiveStatus": kony.i18n.getLocalizedString("i18n.secureimage.Active"),
        "flxDelete": {
          "isVisible": true,
          "onClick": function () {
            self.deleteRow();
          }
        },
        "lblNoPhoneNumberError": {
          "isVisible": false
        },
        "lblNoEmailIDError": {
          "isVisible": false
        },
        "fontIconDelete": {
          "text": "",
          "isVisible": true
        },
        "SwitchActiveStatus": {
          "skin": "sknSwitchServiceManagement",
          "onSlide": function () {
            self.toggleEmailId();
          },
          "selectedIndex": data.emailStatus === "SID_ACTIVE" ? 0 : 1
        },
        "lblSeparator": {
          "skin": "sknlblSeperator"
        },
        "template": "flxCustomerInformation"
      };
    });

    this.view.addNewRow.segData.widgetDataMap = dataMap;
    this.view.addNewRow.segData.setData(dataToAdd);

    this.view.forceLayout();
  },
  
  contextualMenuOff: function(context) {
    var scopeObj = this;
    scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    scopeObj.optionButtonStateChange(scopeObj.prevIndex, false);
    this.view.forceLayout();
  },
  
  onDropDownsHoverCallback: function (widget, context) {
    var self = this;
    var widgetId = widget.id;
    var selectedIndex = self.view.listingSegmentClient.segListing.selectedrowindex[1];

    if ((context.eventType === constants.ONHOVER_MOUSE_ENTER)||(context.eventType === constants.ONHOVER_MOUSE_MOVE)) {
      if (self.view.listingSegmentClient.hasOwnProperty(widgetId))
        self.view.listingSegmentClient[widgetId].setVisibility(true);
      else
        self.view[widgetId].setVisibility(true);
      self.optionButtonStateChange(selectedIndex, true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      if (self.view.listingSegmentClient.hasOwnProperty(widgetId))
        self.view.listingSegmentClient[widgetId].setVisibility(false);
      else
        self.view[widgetId].setVisibility(false);
      self.optionButtonStateChange(selectedIndex, false);
    }
    self.view.forceLayout();
  },
  setListingPageData: function (contactsList) {
    var self = this;
    var dataModified = self.modifyData(contactsList);
    self.contactsData = dataModified;
    contactsList = dataModified;
    var dataMap = {
      "flxAccordianContainer": "flxAccordianContainer",
      "flxArrow": "flxArrow",
      "fonticonArrow": "fonticonArrow",
      "lblName": "lblName",
      "flxMainEmail": "flxMainEmail",
      "flxEmail": "flxEmail",
      "fontIconEmail": "fontIconEmail",
      "lblEmail": "lblEmail",
      "fontIconEmail1": "fontIconEmail1",
      "lblEmail1": "lblEmail1",
      "fontIconEmail2": "fontIconEmail2",
      "lblEmail2": "lblEmail2",
      "fontIconEmail3": "fontIconEmail3",
      "lblEmail3": "lblEmail3",
      "flxEmail1": "flxEmail1",
      "flxEmail2": "flxEmail2",
      "flxEmail3": "flxEmail3",
      "flxMainPhone": "flxMainPhone",
      "flxPhone": "flxPhone",
      "flxPhone1": "flxPhone1",
      "flxPhone2": "flxPhone2",
      "flxPhone3": "flxPhone3",
      "fontIconPhone": "fontIconPhone",
      "lblPhone": "lblPhone",
      "fontIconPhone1": "fontIconPhone1",
      "lblPhone1": "lblPhone1",
      "fontIconPhone2": "fontIconPhone2",
      "lblPhone2": "lblPhone2",
      "fontIconPhone3": "fontIconPhone3",
      "lblPhone3": "lblPhone3",
      "flxStatus": "flxStatus",
      "fontIconStatus": "fontIconStatus",
      "lblStatus": "lblStatus",
      "flxOptions": "flxOptions",
      "lblIconOptions": "lblIconOptions",
      "lblSeperator": "lblSeperator",
      "communication_id": "communication_id"

    };
    var dataContacts = [];
    dataContacts = contactsList.map(function (contactsList) {
      var mappedRec =  {
        "lblSeperator": {
          "skin": "sknlblSeperator"
        },
        "contact_id": contactsList.Service_id,
        "lblIconOptions": {
          "text": ""
        },
        "lblStatus": {
          "text": contactsList.Service_Status_id === "SID_ACTIVE" ? kony.i18n.getLocalizedString("i18n.secureimage.Active") : kony.i18n.getLocalizedString("i18n.frmPermissionsController.InActive"),
          "skin": contactsList.Service_Status_id === "sknlblLato5bc06cBold14px",
        },
        "lblName": contactsList.Service_Name,
        "lblEmail": contactsList.Communication_Records[0] === undefined ? "N/A" : contactsList.Communication_Records[0].email === undefined ? "N/A" : contactsList.Communication_Records[0].email,
        "lblPhone": contactsList.Communication_Records[0] === undefined ? "N/A" : contactsList.Communication_Records[0].phone === undefined ? "N/A" : contactsList.Communication_Records[0].phone,
        "fontIconEmail": contactsList.Communication_Records[0] === undefined ? undefined : contactsList.Communication_Records[0].emailStatus === undefined ? undefined : (contactsList.Communication_Records[0].emailStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "fontIconPhone": contactsList.Communication_Records[0] === undefined ?  undefined: contactsList.Communication_Records[0].phoneStatus === undefined ? undefined : (contactsList.Communication_Records[0].phoneStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "communicationEmailId": contactsList.Communication_Records[0] === undefined ? undefined : contactsList.Communication_Records[0].emailCommId === undefined ? undefined : contactsList.Communication_Records[0].emailCommId,
        "communicationPhoneId": contactsList.Communication_Records[0] === undefined ? undefined : contactsList.Communication_Records[0].phoneCommId === undefined ? undefined : contactsList.Communication_Records[0].phoneCommId,
        "lblEmail1": contactsList.Communication_Records[1] === undefined ? "N/A" : contactsList.Communication_Records[1].email === undefined ? "N/A" : contactsList.Communication_Records[1].email,
        "lblPhone1": contactsList.Communication_Records[1] === undefined ? "N/A" : contactsList.Communication_Records[1].phone === undefined ? "N/A" : contactsList.Communication_Records[1].phone,
        "flxEmail1" : {
          "isVisible" : contactsList.Communication_Records[1] === undefined ? false : true
        },
        "fontIconEmail1": contactsList.Communication_Records[1] === undefined ? undefined : contactsList.Communication_Records[1].emailStatus === undefined ? undefined : (contactsList.Communication_Records[1].emailStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "fontIconPhone1": contactsList.Communication_Records[1] === undefined ? undefined : contactsList.Communication_Records[1].phoneStatus === undefined ? undefined : (contactsList.Communication_Records[1].phoneStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "communicationEmailId1": contactsList.Communication_Records[1] === undefined ? undefined : contactsList.Communication_Records[1].emailCommId === undefined ? undefined : contactsList.Communication_Records[1].emailCommId,
        "communicationPhoneId1": contactsList.Communication_Records[1] === undefined ? undefined : contactsList.Communication_Records[1].phoneCommId === undefined ? undefined : contactsList.Communication_Records[1].phoneCommId,
        "lblEmail2": contactsList.Communication_Records[2] === undefined ? "N/A" : contactsList.Communication_Records[2].email === undefined ? "N/A" : contactsList.Communication_Records[2].email,
        "lblPhone2": contactsList.Communication_Records[2] === undefined ? "N/A" : contactsList.Communication_Records[2].phone === undefined ? "N/A" : contactsList.Communication_Records[2].phone,
        "flxEmail2" : {
          "isVisible" : contactsList.Communication_Records[2] === undefined ? false : true
        },
        "fontIconEmail2": contactsList.Communication_Records[2] === undefined ? undefined : contactsList.Communication_Records[2].emailStatus === undefined ? undefined : (contactsList.Communication_Records[2].emailStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "fontIconPhone2": contactsList.Communication_Records[2] === undefined ? undefined : contactsList.Communication_Records[2].phoneStatus === undefined ? undefined : (contactsList.Communication_Records[2].phoneStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "communicationEmailId2": contactsList.Communication_Records[2] === undefined ? undefined : contactsList.Communication_Records[2].emailCommId === undefined ? undefined : contactsList.Communication_Records[2].emailCommId,
        "communicationPhoneId2": contactsList.Communication_Records[2] === undefined ? undefined : contactsList.Communication_Records[2].phoneCommId === undefined ? undefined : contactsList.Communication_Records[2].phoneCommId,
        "lblEmail3": contactsList.Communication_Records[3] === undefined ? "N/A" : contactsList.Communication_Records[3].email === undefined ? "N/A" : contactsList.Communication_Records[3].email,
        "lblPhone3": contactsList.Communication_Records[3] === undefined ? "N/A" : contactsList.Communication_Records[3].phone === undefined ? "N/A" : contactsList.Communication_Records[3].phone,
        "flxEmail3" : {
          "isVisible" : contactsList.Communication_Records[3] === undefined ? false : true
        },
        "fontIconEmail3": contactsList.Communication_Records[3] === undefined ? undefined : contactsList.Communication_Records[3].emailStatus === undefined ? undefined : (contactsList.Communication_Records[3].emailStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "fontIconPhone3": contactsList.Communication_Records[3] === undefined ? undefined : contactsList.Communication_Records[3].phoneStatus === undefined ? undefined : (contactsList.Communication_Records[3].phoneStatus === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }),
        "communicationEmailId3": contactsList.Communication_Records[3] === undefined ? undefined : contactsList.Communication_Records[3].emailCommId === undefined ? undefined : contactsList.Communication_Records[3].emailCommId,
        "communicationPhoneId3": contactsList.Communication_Records[3] === undefined ? undefined : contactsList.Communication_Records[3].phoneCommId === undefined ? undefined : contactsList.Communication_Records[3].phoneCommId,
        "fontIconStatus": contactsList.Service_Status_id === "SID_ACTIVE" ? {
          "skin": "sknFontIconActivate"
        } : {
          "skin": "sknfontIconInactive"
        }, 
        "template": "flxCustomerCareSelected",
        "flxOptions": {
          "onClick": function () {
            self.toggleContextualMenu(50);
          },
          skin : "slFbox"
        }
      };
      if(mappedRec.lblEmail || mappedRec.lblEmail1 || mappedRec.lblEmail2 || mappedRec.lblEmail3){
        //do-nothing as atleast one record data exist
      }else{
        mappedRec.lblEmail = kony.i18n.getLocalizedString("i18n.frmCustomers.NA");
      }
      if(mappedRec.lblPhone || mappedRec.lblPhone1 || mappedRec.lblPhone2 || mappedRec.lblPhone3){
        //do-nothing as atleast one record data exist
      }else{
        mappedRec.lblEmail = kony.i18n.getLocalizedString("i18n.frmCustomers.NA");
      }
      return mappedRec;
    });

    //this.contactsData={}; 
    if( document.getElementById("frmCustomerCare_listingSegmentClient_segListing"))
    	document.getElementById("frmCustomerCare_listingSegmentClient_segListing").onscroll = this.contextualMenuOff;
    this.view.listingSegmentClient.segListing.widgetDataMap = dataMap;
    this.listingdata = dataContacts;
    this.view.listingSegmentClient.segListing.setData(dataContacts);
    this.setStatusFilterData();
    this.view.forceLayout();
  },
  resetSortImages: function () {
    this.determineSortFontIcon(this.sortBy,'Service_Name',this.view.lblFonticonName);
  },
  modifyData: function (contacts) {
    var contactsData = JSON.parse(JSON.stringify(contacts));
    var data = [];
    var row = {};
    for (var k = 0; k < contactsData.length; k++) {
      var initId = null,
          currId = null;
      var i = 0;
      data = [];
      row = {};
      while (i < contactsData[k].Communication_Records.length) {
        if (initId === null) {
          initId = contactsData[k].Communication_Records[i].ServiceCommunication_Priority;
          currId = initId;
        }
        currId = contactsData[k].Communication_Records[i].ServiceCommunication_Priority;
        if (currId === initId) {
          row["id"] = contactsData[k].Communication_Records[i].ServiceCommunication_Priority;
          if (contactsData[k].Communication_Records[i].ServiceCommunication_Typeid === "COMM_TYPE_EMAIL") {
            row["email"] = contactsData[k].Communication_Records[i].ServiceCommunication_Value;
            row["emailStatus"] = contactsData[k].Communication_Records[i].ServiceCommunication_Status_id;
            row["emailCommId"] = contactsData[k].Communication_Records[i].ServiceCommunication_id;

          } else if (contactsData[k].Communication_Records[i].ServiceCommunication_Typeid === "COMM_TYPE_PHONE") {
            row[kony.i18n.getLocalizedString("i18n.frmCustomerCareController.phone")] = contactsData[k].Communication_Records[i].ServiceCommunication_Value;
            row["phoneStatus"] = contactsData[k].Communication_Records[i].ServiceCommunication_Status_id;
            row["phoneCommId"] = contactsData[k].Communication_Records[i].ServiceCommunication_id;

          }
          i++;
        } else {
          data.push(row);
          row = {};
          initId = contactsData[k].Communication_Records[i].ServiceCommunication_Priority;
          currId = initId;
          //continue;
        }
        // id=contactsData[k].Communication_Records[i].ServiceCommunication_Priority;
      }
      data.push(row);
      row = {};
      contactsData[k]["Communication_Records"] = data;
    }
    return contactsData;
  },
  setFlowActions: function () {
    var scopeObj = this;
    this.view.toastMessage.flxRightImage.onClick = function () {
      scopeObj.view.flxToastMessage.setVisibility(false);
    };
    this.view.btnAddMore.onClick = function () {
      if(scopeObj.addCustCareInfoNoOfEntries < 7) {
        scopeObj.addNewContactDetails();
      }
      else {
        scopeObj.view.btnAddMore.setVisibility(false);
      }
    };
    this.view.statusFilterMenu.segStatusFilterDropdown.onRowClick = function () {
      scopeObj.performStatusFilter();
    };
    this.view.flxLocationsHeaderName.onClick = function () {
      scopeObj.sortBy.column("Service_Name");
      scopeObj.loadPageData(); 
      scopeObj.resetSortImages();
    };
    // this.view.flxStatus.onClick = function () {
    //   scopeObj.sortBy.column("Service_Status_id");
    //   scopeObj.loadPageData();
    //   scopeObj.resetSortImages();
    // };
    this.view.listingSegmentClient.flxContextualMenu.onHover = scopeObj.onDropDownsHoverCallback;
    this.view.flxStatusFilter.onHover = scopeObj.onDropDownsHoverCallback;
    this.view.listingSegmentClient.contextualMenu.flxOption3.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(true);
    };
    this.view.listingSegmentClient.contextualMenu.flxOption1.onClick = function () {
      scopeObj.flagTrack = 0;
      scopeObj.showEditCustomerCareInfo();
    };
    this.view.listingSegmentClient.contextualMenu.flxOption2.onClick = function () {
      if (scopeObj.view.listingSegmentClient.contextualMenu.lblOption2.text === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Deactivate_Record")) {
        scopeObj.view.flxDeactivePopup.setVisibility(true);
      } else {
        scopeObj.view.flxDeactivePopup.setVisibility(false);
        scopeObj.updateCustomerCareStatus();
      }

    };
    this.view.txtbxServiceName.onEndEditing = function () {

      if (scopeObj.view.txtbxServiceName.text === "") {
        scopeObj.view.lblNoServiceNameError.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Service_Name_cannot_be_empty");
        scopeObj.view.txtbxServiceName.skin = "skinredbg";
        scopeObj.view.flxNoServiceNameError.setVisibility(true);
      } else if ((scopeObj.view.txtbxServiceName.text.trim()).length < 6) {
        scopeObj.view.lblNoServiceNameError.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Service_Name_Min_Limit");
        scopeObj.view.txtbxServiceName.skin = "skinredbg";
        scopeObj.view.flxNoServiceNameError.setVisibility(true);
      } else {
        scopeObj.view.txtbxServiceName.skin = "skntxtbxDetails0bbf1235271384a";
        //   scopeObj.view.lblNoServiceNameError.setVisibility(false); 

      }
      scopeObj.view.lblCharCount.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxServiceName.onKeyUp=function(){	
      scopeObj.view.flxNoServiceNameError.setVisibility(false); 
      scopeObj.view.lblCharCount.setVisibility(true);
      scopeObj.view.lblCharCount.text = scopeObj.view.txtbxServiceName.text.length+"/150";
      scopeObj.view.forceLayout();

    };
    this.view.txtbxServiceName.onBeginEditing = function () {
      scopeObj.view.txtbxServiceName.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.txtbxServiceName.restrictCharactersSet = "~`!@#$%^&*()_-+=}{]][|\"':;?/>.<,1234567890";
      // scopeObj.view.lblNoServiceNameError.setVisibility(false);
      scopeObj.view.forceLayout();
    };
    //      this.view.subHeader.tbxSearchBox.onKeyUp = function() {
    // 	  scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
    //       scopeObj.showNoResultsFound();
    // 	  scopeObj.view.forceLayout();
    // 	};
    this.view.subHeader.flxClearSearchImage.onClick = function () {
      scopeObj.view.subHeader.tbxSearchBox.text = "";
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      scopeObj.hideNoResultsFound();
      scopeObj.loadPageData();
      scopeObj.view.forceLayout();
    };
    this.view.popUp.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    };
    this.view.popUp.btnPopUpDelete.onClick = function () {
      scopeObj.deleteCustomerCareDetails();
    };
    this.view.subHeader.tbxSearchBox.onEndEditing = function () {
      if (scopeObj.view.subHeader.tbxSearchBox.text === "") {
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      }
      scopeObj.view.subHeader.flxSearchContainer.skin = "sknflxd5d9ddop100";
    };
    this.view.subHeader.tbxSearchBox.onTouchStart = function () {
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
    };
    this.view.subHeader.tbxSearchBox.onKeyUp = function () {
      scopeObj.view.subHeader.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      scopeObj.loadPageData();
      scopeObj.view.subHeader.flxClearSearchImage.setVisibility(true);
      if (scopeObj.records === 0) {
        scopeObj.showNoResultsFound();
        scopeObj.view.forceLayout();
      } else {
        scopeObj.hideNoResultsFound();
        scopeObj.view.forceLayout();
      }
      if (scopeObj.view.subHeader.tbxSearchBox.text === "") {
        scopeObj.view.subHeader.flxClearSearchImage.setVisibility(false);
      }
    };
    this.view.popUp1.btnPopUpCancel.onClick = function () {
      scopeObj.view.flxDeactivePopup.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    };
    this.view.popUp1.btnPopUpDelete.onClick = function () {
      scopeObj.updateCustomerCareStatus();
    };
    this.view.popUp.flxPopUpClose.onClick = function () {
      scopeObj.view.flxImportDeletePopup.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    };
    this.view.popUp1.flxPopUpClose.onClick = function () {
      scopeObj.view.flxDeactivePopup.setVisibility(false);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function () {
      scopeObj.view.subHeader.flxSearchContainer.setVisibility(false);
      //scopeObj.hideHeaderButtons();
      scopeObj.showHeaderButtons();
      // scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = "Manage Customer Care Information";
      scopeObj.presenter.fetchAllCustomerCareDetails();
      //scopeObj.showContactsUI(scopeObj.finalData);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.flxCustomercareInformation.setVisibility(false);
      scopeObj.view.flxBreadCrumbs.setVisibility(false);
    };
    this.view.mainHeader.btnAddNewOption.onClick = function () {
      scopeObj.view.addNewRow.segData.removeAll();
      scopeObj.errorsRemove();
      scopeObj.addNewContactDetails();
      scopeObj.flagTrack = 1;
      scopeObj.addCustomerCareInformation();
      scopeObj.view.flxBreadCrumbs.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = "Add Customer Care Information";
      scopeObj.view.informationButtons.btnNext.setVisibility(true);
      scopeObj.hideFirstRowDeleteIcon();
      scopeObj.addCustCareInfoNoOfEntries = 1;
    };
    this.view.flxStatus.onClick = function () {

      scopeObj.view.flxStatusFilter.setVisibility(!scopeObj.view.flxStatusFilter.isVisible);

    };
    this.view.noStaticData.btnAddStaticContent.onClick = function () {
      scopeObj.view.breadcrumbs.btnPreviousPage.setVisibility(false);
      scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.setVisibility(false);
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      scopeObj.view.flxError.setVisibility(false);
      scopeObj.view.noStaticData.btnAddStaticContent.text = kony.i18n.getLocalizedString("i18n.DragBox.ADD");
      scopeObj.view.txtbxServiceName.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.flxNoServiceNameError.setVisibility(false);
      scopeObj.addCustomerCareInformation();
    };
    //     this.view.informationButtons.btnSave.onClick=function(){
    //       if(scopeObj.flagTrack===1)
    //       {scopeObj.addCustomerCareDetails();}
    //       else
    //         { scopeObj.editCustomerCareDetails();}
    //     };
    this.view.informationButtons.btnCancel.onClick = function () {
      scopeObj.view.subHeader.flxSearchContainer.setVisibility(true);
      scopeObj.view.flxCustomercareInformation.setVisibility(false);
      scopeObj.errorsRemove();
      scopeObj.view.flxListingPage.setVisibility(true);
      scopeObj.view.listingSegmentClient.flxContextualMenu.setVisibility(false);
      scopeObj.view.flxBreadCrumbs.setVisibility(false);
      scopeObj.view.mainHeader.lblHeading.text = "Manage Customer Care Information";
      scopeObj.view.mainHeader.flxHeaderSeperator.setVisibility(true);
      //scopeObj.hideHeaderButtons();
      scopeObj.showHeaderButtons();
      scopeObj.presenter.fetchAllCustomerCareDetails();
    };
    this.view.informationButtons.btnSave.onClick = function () {
      scopeObj.view.subHeader.flxSearchContainer.setVisibility(true);
      var flag = false;
      var errorFlag = true;
      scopeObj.countArray = {};
      var data = scopeObj.view.addNewRow.segData.data;
      for (var j = 0; j < data.length; j++) {
        if (data[j].txtbxEmailid.text === "" && data[j].txtbxPhoneNumber.text === "" && data[j].txtISDCode.text === "+") {
          //flag=false;
          errorFlag = false;
          scopeObj.view.flxError.setVisibility(true);
          scopeObj.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Enter_Atleast_One");
          data[j].txtISDCode.skin = "skinredbg";
          data[j].txtbxPhoneNumber.skin = "skinredbg";
          data[j].txtbxEmailid.skin = "skinredbg";
          scopeObj.countArray[j] = "true";
          //flagFillOne=1;
          // break;
        } else if (data[j].txtbxEmailid.text !== "" && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data[j].txtbxEmailid.text) === false) {
          //flag=false;
          errorFlag = false;
          data[j].txtbxEmailid.skin = "skinredbg";
          data[j].lblNoEmailIDError.isVisible = true;
          //  break;
        } else if (data[j].txtISDCode.text !== "" && /^([a-zA-Z0-9+-]){10,16}$/.test(data[j].txtISDCode.text) === false && data[j].txtbxPhoneNumber.text !== "" && /^([a-zA-Z0-9+-]){10,16}$/.test(data[j].txtbxPhoneNumber.text) === false) {
          //flag=false;
          errorFlag = false;
          data[j].txtISDCode.skin = "skinredbg";
          data[j].txtbxPhoneNumber.skin = "skinredbg";
          data[j].lblNoPhoneNumberError.isVisible = true;
          //  break;
        } else if((data[j].txtISDCode.text === "" || data[j].txtISDCode.text === "+") && data[j].txtbxPhoneNumber.text!== ""){
          errorFlag = false;
          data[j].txtISDCode.skin = "skinredbg";
          data[j].lblNoPhoneNumberError.isVisible = true;
        } else if((data[j].txtISDCode.text !== "" || data[j].txtISDCode.text !== "+") && data[j].txtbxPhoneNumber.text=== ""){
          errorFlag = false;
          data[j].txtbxPhoneNumber.skin = "skinredbg";
          data[j].lblNoPhoneNumberError.isVisible = true;
        } else {
          data[j].txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
          data[j].txtbxPhoneNumber.skin = "skntxtbxDetails0bbf1235271384a";
          data[j].txtbxEmailid.skin = "skntxtbxDetails0bbf1235271384a";
          flag = true;
        }
        flag = errorFlag;
      }

      if (scopeObj.view.txtbxServiceName.text === "") {
        scopeObj.view.txtbxServiceName.skin = "skinredbg";
        scopeObj.view.lblNoServiceNameError.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Service_Name_cannot_be_empty");
        scopeObj.view.flxNoServiceNameError.setVisibility(true);
        flag = false;
      } else if ((scopeObj.view.txtbxServiceName.text.trim()).length < 6) {
        scopeObj.view.txtbxServiceName.skin = "skinredbg";
        scopeObj.view.lblNoServiceNameError.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Service_Name_Min_Limit");
        scopeObj.view.flxNoServiceNameError.setVisibility(true);
        flag = false;
      }
      if (flag === false) {
        flag = true;
        scopeObj.flagOfError = 1;
        scopeObj.view.addNewRow.segData.setData(data);
        scopeObj.view.forceLayout();
      } else {
        scopeObj.flagOfError = 0;
        scopeObj.countArray = {};
        for (var k = 0; k < data.length; k++) {
          data[k].txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
          data[k].txtbxPhoneNumber.skin = "skntxtbxDetails0bbf1235271384a";
          data[k].txtbxEmailid.skin = "skntxtbxDetails0bbf1235271384a";
        }
        scopeObj.view.addNewRow.segData.setData(data);
        scopeObj.view.forceLayout();
        if (scopeObj.flagTrack === 1) {
          scopeObj.flagSaveTrack = 1;
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.addCustomerCareDetails();
        } else {
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.editCustomerCareDetails();
        }
      }
      scopeObj.view.mainHeader.lblHeading.text = "Manage Customer Care Information";

    };
    this.view.informationButtons.btnNext.onClick = function () {
      var data = scopeObj.view.addNewRow.segData.data;
      var flag = false;
      scopeObj.countArray = {};
      var errorFlag = true;
      var j;
      for (j = 0; j < data.length; j++) {
        if (data[j].txtbxEmailid.text === "" && data[j].txtbxPhoneNumber.text === "" && data[j].txtISDCode.text === "") {
          //flag=false;
          errorFlag = false;
          scopeObj.view.flxError.setVisibility(true);
          scopeObj.view.lblErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Enter_Atleast_One");
          data[j].txtISDCode.skin = "skinredbg";
          data[j].txtbxPhoneNumber.skin = "skinredbg";
          data[j].txtbxEmailid.skin = "skinredbg";
          scopeObj.countArray[j] = "true";
          // break;
        } else if (data[j].txtbxEmailid.text !== "" && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data[j].txtbxEmailid.text) === false) {
          //flag=false;
          errorFlag = false;
          data[j].txtbxEmailid.skin = "skinredbg";
          data[j].lblNoEmailIDError.isVisible = true;
          //  break;
        } else if (data[j].txtISDCode.text !== "" && /^([a-zA-Z0-9+-]){10,16}$/.test(data[j].txtISDCode.text) === false&& data[j].txtbxPhoneNumber.text !== "" && /^([a-zA-Z0-9+-]){10,16}$/.test(data[j].txtbxPhoneNumber.text) === false) {
          //flag=false;
          errorFlag = false;
          data[j].txtISDCode.skin = "skinredbg";
          data[j].txtbxPhoneNumber.skin = "skinredbg";
          data[j].lblNoPhoneNumberError.isVisible = true;
          //  break;
        } else {
          data[j].txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
          data[j].txtbxPhoneNumber.skin = "skntxtbxDetails0bbf1235271384a";
          data[j].txtbxEmailid.skin = "skntxtbxDetails0bbf1235271384a";
          flag = true;
        }
        flag = errorFlag;
      }

      if (scopeObj.view.txtbxServiceName.text === "") {
        scopeObj.view.txtbxServiceName.skin = "skinredbg";
        scopeObj.view.lblNoServiceNameError.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Service_Name_cannot_be_empty");
        scopeObj.view.flxNoServiceNameError.setVisibility(true);
        flag = false;
      } else if ((scopeObj.view.txtbxServiceName.text.trim()).length < 6) {
        scopeObj.view.txtbxServiceName.skin = "skinredbg";
        scopeObj.view.lblNoServiceNameError.text = kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Service_Name_Min_Limit");
        scopeObj.view.flxNoServiceNameError.setVisibility(true);
        flag = false;
      }
      if (flag === false) {
        flag = true;
        scopeObj.flagOfError = 1;
        scopeObj.view.addNewRow.segData.setData(data);
        scopeObj.view.forceLayout();
      } else {
        scopeObj.flagOfError = 0;
        scopeObj.countArray = {};
        for (var k = 0; k < data.length; k++) {
          data[k].txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
          data[k].txtbxPhoneNumber.skin = "skntxtbxDetails0bbf1235271384a";
          data[k].txtbxEmailid.skin = "skntxtbxDetails0bbf1235271384a";
        }
        scopeObj.view.addNewRow.segData.setData(data);
        scopeObj.view.forceLayout();
        scopeObj.flagSaveTrack = 0;
        scopeObj.addCustomerCareDetails();
        // scopeObj.view.mainHeader.btnAddNewOption.onClick();
        //scopeObj.addNewContactDetails();

      }
    };

  },

  editCustomerCareDetails: function () {
    var scopeObj = this;
    var data = this.view.addNewRow.segData.data;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var dataToEdit = {
      "User_ID": user_ID,
      "Service_id": scopeObj.serviceID,
      "Status_id": this.view.SwitchActive.selectedindex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
      "Service_Details": {
        "Name": scopeObj.view.txtbxServiceName.text,
        "Channel_id": "CH_ID_MOB_INT",
        "Status_id": this.view.SwitchActive.selectedindex === 0 ? "SID_ACTIVE" : "SID_INACTIVE"
      },
    };
    var insertJson = [];
    for (var i = 0; i < data.length; i++) {
      var insertRow = {};
      if (data[i].txtISDCode.text !== "" && data[i].txtISDCode.text !== undefined && data[i].txtbxPhoneNumber.text !== "" && data[i].txtbxPhoneNumber.text !== undefined && (data[i].txtbxEmailid.text === "" || data[i].txtbxEmailid.text === undefined)) {
        insertRow = {
          "Priority": "" + (i + 1) + "",
          "Value": data[i].txtISDCode.text + "-"+data[i].txtbxPhoneNumber.text,
          "Type": "COMM_TYPE_PHONE",
          "Status_id": data[i].SwitchActive.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
          "Extension": "ext1",
          "Description": data[i].txtISDCode.text +data[i].txtbxPhoneNumber.text + " DESC",
          "communicationID": data[i].communication_id_phone,
        };
        insertJson.push(insertRow);
      } else if (data[i].txtbxEmailid.text !== "" && data[i].txtbxEmailid.text !== undefined && (data[i].txtbxPhoneNumber.text === "" || data[i].txtbxPhoneNumber.text === undefined) && (data[i].txtISDCode.text !== "" || data[i].txtISDCode.text !== undefined)) {
        insertRow = {
          "Priority": "" + (i + 1) + "",
          "Value": data[i].txtbxEmailid.text,
          "Type": "COMM_TYPE_EMAIL",
          "Status_id": data[i].SwitchActiveStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
          "Extension": "ext1",
          "Description": data[i].txtbxEmailid.text + " DESC",
          "communicationID": data[i].communication_id_email,
        };
        insertJson.push(insertRow);
      } else if (data[i].txtbxEmailid.text !== "" && data[i].txtbxPhoneNumber.text !== "" && data[i].txtbxEmailid.text !== undefined && data[i].txtbxPhoneNumber.text !== undefined && data[i].txtISDCode.text !== "" && data[i].txtISDCode.text !== undefined) {
        insertRow = {
          "Priority": "" + (i + 1) + "",
          "Value": data[i].txtISDCode.text +"-"+data[i].txtbxPhoneNumber.text,
          "Type": "COMM_TYPE_PHONE",
          "Status_id": data[i].SwitchActive.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
          "Extension": "ext1",
          "Description": data[i].txtISDCode.text +data[i].txtbxPhoneNumber.text + " DESC",
          "communicationID": data[i].communication_id_phone,
        };
        var insertRow1 = {
          "Priority": "" + (i + 1) + "",
          "Value": data[i].txtbxEmailid.text,
          "Type": "COMM_TYPE_EMAIL",
          "Status_id": data[i].SwitchActiveStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
          "Extension": "ext1",
          "Description": data[i].txtbxEmailid.text + " DESC",
          "communicationID": data[i].communication_id_email,
        };
        insertJson.push(insertRow);
        insertJson.push(insertRow1);
      }
    }
    for (var j = 0; j < scopeObj.deletedContacts.length; j++) {
      var insertdeletedRow = {};
      insertdeletedRow = {
        "communicationID": scopeObj.deletedContacts[j],
        "DeleteFlag": "true",
      };
      insertJson.push(insertdeletedRow);
    }
    scopeObj.deletedContacts = [];
    dataToEdit["Communication_Records"] = insertJson;
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.editCustomerCareInfo(dataToEdit);
  },

  updateCustomerCareStatus: function () {
    var scopeObj = this;
    var data = scopeObj.view.listingSegmentClient.segListing.data;
    var rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var dataToChange = data[rowIndex];
    var dataToModify = {
      "User_ID": user_ID,
      "Status_id": dataToChange.lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? "SID_INACTIVE" : "SID_ACTIVE",
      "Service_id": data[rowIndex].contact_id,
      "Service_Details": {
        "Status_id": dataToChange.lblStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active") ? "SID_INACTIVE" : "SID_ACTIVE",
      },
    };
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.updateCustomerCareStatus(dataToModify);
  },

  deleteCustomerCareDetails: function () {
    var scopeObj = this;
    var data = scopeObj.view.listingSegmentClient.segListing.data;
    var rowIndex = scopeObj.view.listingSegmentClient.segListing.selectedRowIndex[1];
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var dataToDelete = {
      "User_ID": user_ID,
      "Service_id": data[rowIndex].contact_id
    };
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.deleteCustomerCareInfo(dataToDelete);
  },

  addCustomerCareDetails: function () {
    var scopeObj = this;
    var data = this.view.addNewRow.segData.data;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var dataToAdd = {
      "User_ID": user_ID,
      "Status_id": this.view.SwitchActive.selectedindex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
      "Service_Details": {
        "Name": scopeObj.view.txtbxServiceName.text,
        "Channel_id": "CH_ID_MOB_INT",
        "Description": scopeObj.view.txtbxServiceName.text + kony.i18n.getLocalizedString("i18n.frmCustomerCareController.Description"),
        "Status_id": this.view.SwitchActive.selectedindex === 0 ? "SID_ACTIVE" : "SID_INACTIVE"
      },
    };
    var insertJson = [];
    for (var i = 0; i < data.length; i++) {
      var insertRow = {};
      if (data[i].txtISDCode.text !== "" && data[i].txtISDCode.text !== undefined && data[i].txtbxPhoneNumber.text !== "" && data[i].txtbxPhoneNumber.text !== undefined && (data[i].txtbxEmailid.text === "" || data[i].txtbxEmailid.text === undefined)) {
        insertRow = {
          "Priority": "" + (i + 1) + "",
          "Value": data[i].txtISDCode.text +"-"+ data[i].txtbxPhoneNumber.text,
          "Type": "COMM_TYPE_PHONE",
          "Status_id": data[i].SwitchActive.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
          "Extension": "ext1",
          "Description": data[i].txtISDCode.text + data[i].txtbxPhoneNumber.text + " DESC",
        };
        insertJson.push(insertRow);
      } else if (data[i].txtbxEmailid.text !== "" && data[i].txtbxEmailid.text !== undefined && (data[i].txtbxPhoneNumber.text === "" || data[i].txtbxPhoneNumber.text === undefined) && (data[i].txtISDCode.text !== "" || data[i].txtISDCode.text !== undefined)) {
        insertRow = {
          "Priority": "" + (i + 1) + "",
          "Value": data[i].txtbxEmailid.text,
          "Type": "COMM_TYPE_EMAIL",
          "Status_id": data[i].SwitchActiveStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
          "Extension": "ext1",
          "Description": data[i].txtbxEmailid.text + " DESC",
        };
        insertJson.push(insertRow);
      } else if ((data[i].txtbxEmailid.text !== "" || (data[i].txtbxPhoneNumber.text !== "" && data[i].txtISDCode.text !== "" )) && (data[i].txtbxEmailid.text !== undefined || (data[i].txtbxPhoneNumber.text !== undefined && data[i].txtISDCode.text !== undefined))) {
        if (data[i].txtbxPhoneNumber.text !== "" && data[i].txtbxPhoneNumber.text !== undefined && data[i].txtISDCode.text !== "" && data[i].txtISDCode.text !== undefined) {
          insertRow = {
            "Priority": "" + (i + 1) + "",
            "Value":data[i].txtISDCode.text +"-"+ data[i].txtbxPhoneNumber.text,
            "Type": "COMM_TYPE_PHONE",
            "Status_id": data[i].SwitchActive.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
            "Extension": "ext1",
            "Description":data[i].txtISDCode.text + data[i].txtbxPhoneNumber.text + " DESC",
          };
          insertJson.push(insertRow);
        }
        if (data[i].txtbxEmailid.text !== "" && data[i].txtbxEmailid.text !== undefined) {
          var insertRow1 = {
            "Priority": "" + (i + 1) + "",
            "Value": data[i].txtbxEmailid.text,
            "Type": "COMM_TYPE_EMAIL",
            "Status_id": data[i].SwitchActiveStatus.selectedIndex === 0 ? "SID_ACTIVE" : "SID_INACTIVE",
            "Extension": "ext1",
            "Description": data[i].txtbxEmailid.text + " DESC",
          };
          insertJson.push(insertRow1);
        }

      }
    }
    dataToAdd["Communication_Records"] = insertJson;
    kony.adminConsole.utils.showProgressBar(this.view);
    this.presenter.addNewCustomerCareInfo(dataToAdd);
  },
});
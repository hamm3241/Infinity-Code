define({
  allMonActionsList: null,
  removeCount: 0,
  employmentStatusSelected: null,
  selectedFeatureIndex: 0,
  prevSelectedFeature: [],
  currentCustomerType: "",
  additionalFeaturesAndActions: [],
  allRetailFeatures: [],
  employeeDataUpdated: false,
  sendPayDataUpdated: false,
  receivePayDataUpdated: false,
  isCitizenshipEdited: false,
  isTaxEdited: false,
  taxReference: "",
  sendPayReference: "",
  receivePayReference: "",
  EditedCountryToBeRemoved: "",
  saveAndAddAnotherFlow: false,
  prevSelectedIndices: [],
  checkboxselected: "checkboxselected.png",
  checkboxnormal: "checkboxnormal.png",
  checkbox: "checkbox.png",
  //editSendAccountData:null,
  //editReceiveAccountData:null,
  sSelected: kony.i18n.getLocalizedString("i18n.frmAlertsManagement.Selected"),
  willUpdateUI: function (context) {
    if (context) {
      this.updateLeftMenu(context);

      if (context.LoadingScreen) {
        if (context.LoadingScreen.focus) {
          kony.adminConsole.utils.showProgressBar(this.view);
        } else {
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      } else if (context.toastModel) {
        if (context.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")) {
          this.view.toastMessage.showToastMessage(context.toastModel.message, this);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
        }
      } else if (context.CustomerBasicInfo) {
        this.view.flxGeneralInfoWrapper.setBasicInformation(context.CustomerBasicInfo, this);
        this.view.tabs.setCustomerProfileTabs(this);
        this.showToggleButtons(context.CustomerBasicInfo.customer);
        this.currentCustomerType = context.CustomerBasicInfo.customer.CustomerType_id;
        this.customerId = context.CustomerBasicInfo.customer.Customer_id;
        var configurations = this.presenter.CustomerBasicInfo.clientConfigurations;
        if (configurations.length != 0) {
          var r1 = configurations.filter(function (rec) {
            return rec.configurationTarget == "CLIENT";
          });
          this.showOrHideDataPoints(r1);
        }

      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.enrollACustomer) {
        this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();

      } else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

      } else if (context.userNameRulesPolicy) {
        this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);

      } else if (context.linkProfilesList) {
        this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList, this);
      } else if (context.userNameIsAvailable) {
        this.view.delinkProfilePopup.checkUserNameAvailability(context.userNameIsAvailable);
      } else if (context.checkAuthSignatory) {
        //for business user,to get isauthSignatory flag in case not available in basicInfo
        var custType = context.checkAuthSignatory.customer.CustomerType_id;
        var status = context.checkAuthSignatory.customer.CustomerStatus_id;
         //hiding link/delink profile buttons
        /*if (status === "LOCKED" || status === "SUSPENDED" || status === "NEW") {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this, custType, false);
        } else {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this, custType, true);
        }*/
      }
    }
    //this.setDueDiligenceVerticalTabsData();
  },

  CustomerProfileDueDiligencePreshow: function () {
    this.view.map1.mapLocations.mapKey = this.presenter.getGoogleMapAPIKeys();
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName9);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 115 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.view.verticalTabs.verticalTabsPreShow();
    this.showCitizenshipAndTax();
    this.view.dropdownEntity.flxSegEntity.setVisibility(false);
    var LEData = this.presenter.getDataLegalEntities();
    if(LEData) {
    this.setDataforLegalEntity(LEData);
    } else {
      var legalEntityId = this.presenter.getLegalEntity();
      var legalEntity = this.getLEDesc(legalEntityId);
      this.setDataforSingleLegalEntity(legalEntity);
    } 
    this.setFlowActions();
    this.getAddressSegmentData();
  },
  unloadOnScrollEvent: function () {
    document.getElementById("frmCustomerProfileRoles_flxMainContent").onscroll = function () {};
  },
  setDataforLegalEntity: function(segData)
    {
      var heading = [      {
        "id":"LEGAL ENTITY",
        "companyName":"LEGAL ENTITY",
        "region":"LEGAL ENTITY",
        "description":"LEGAL ENTITY"
      },
                    ];
      var widMap={
        "flxSearchDropDown":"flxSearchDropDown",
        "lblDescription":"lblDescription",
        "id":"id"
      };
      var data=heading.concat(segData);
      var LegalEntityData = data.map(function(en){
        return {
          "flxSearchDropDown": {"isVisible": true,"hoverSkin":"sknFlxBgd7effa"},
          "lblDescription": en.description,
          "id":en.legalEntity,
        };
      });
      
       if(data.length>1){
        var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
        var legalEntity = presentationController.getLegalEntity();
        for(var i=1;i<data.length;i++)
        {
          if(data[i].legalEntity==legalEntity){
            this.view.dropdownEntity.lblSelectLegalEntity.text = data[i].description;
          }
        }   
        this.view.dropdownEntity.lblSelectLegalEntity.info = legalEntity;
        this.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
      }
      else if(this.view.dropdownEntity.lblSelectLegalEntity.text === kony.i18n.getLocalizedString("i18n.frmGroups.lblSelectLegalEntity")){
      }
      this.view.dropdownEntity.segEntity.widgetDataMap = widMap;
      this.view.dropdownEntity.segEntity.setData(LegalEntityData);
      this.view.dropdownEntity.segEntity.info = {
        "data": LegalEntityData
      };
      this.view.dropdownEntity.segEntity.setVisibility(LegalEntityData.length > 1);
      this.view.dropdownEntity.segEntity.selectedRowIndex = [0,1];
      this.view.dropdownEntity.segEntity.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
      this.view.forceLayout();
    },
    setDataforSingleLegalEntity: function(segData) {
      var widMap={
       "lblDescription":"lblDescription",
       "id":"id"
     };
     var LegalEntityData = segData.map(function(en){
       return {
         "lblDescription": en.companyName,
         "id":en.id,
       };
      });
     this.view.dropdownEntity.lblSelectLegalEntity.text = segData[0].companyName;
     this.view.dropdownEntity.segEntity.widgetDataMap = widMap;
     this.view.dropdownEntity.segEntity.setData(LegalEntityData);
     this.view.dropdownEntity.segEntity.info = {
       "data": LegalEntityData
     };  
     this.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
     this.view.dropdownEntity.segEntity.selectionBehavior = constants.SEGUI_DEFAULT_BEHAVIOR;
     this.view.forceLayout();
   },
   

  setFlowActions: function () {
    var scopeObj = this;
    this.view.SuspendUserpopUp.flxPopUpClose.onClick = function () {
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.SuspendUserpopUp.flxPopUpClose.onClick = function () {
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.SuspendUserpopUp.btnPopUpNo.onClick = function () {
      scopeObj.view.flxPopUpConfirmation.setVisibility(false);
    };
    this.view.addCitizenshipTemplate.btnAddDetails.onClick = function () {
      scopeObj.clearCitizenshipPopupData();
      scopeObj.view.flxAddCitizenshipDetailsPopup.setVisibility(true);
    };
    this.view.btnAddCitizenship.onClick = function () {
      scopeObj.clearCitizenshipPopupData();
      scopeObj.isCitizenshipEdited = false;
      scopeObj.view.flxAddCitizenshipDetailsPopup.setVisibility(true);
      if (scopeObj.view.segListing.data.length >= 4)
        scopeObj.view.btnDuePopUpSaveAndAdd.setEnabled(false);
    };
    this.view.addTaxTemplate.btnAddDetails.onClick = function () {
      scopeObj.clearTaxPopupData();
      scopeObj.view.flxAddTaxDetailsPopup.setVisibility(true);
    };
    this.view.btnAddTax.onClick = function () {
      scopeObj.clearTaxPopupData();
      scopeObj.isTaxEdited = false;
      scopeObj.view.flxAddTaxDetailsPopup.setVisibility(true);
      if (scopeObj.view.segTaxListing.data.length >= 4)
        scopeObj.view.btnTaxPopUpSaveAndAdd.setEnabled(false);
    };
    this.view.flxClosePopup.onClick = this.closePopup.bind(this, this.view.flxAddCitizenshipDetailsPopup);
    this.view.btnDuePopUpCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxAddCitizenshipDetailsPopup.setVisibility(false);
        if (scopeObj.EditedCountryToBeRemoved != "") {
          scopeObj.removeItemFromListBox(scopeObj.view.lstbxCountryUser, scopeObj.EditedCountryToBeRemoved);
        }
      };
      var cancelAction = function () {
        scopeObj.view.flxAddCitizenshipDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.btnDuePopUpSave.onClick = function () {
      var valid = scopeObj.validateCitizenshipDetails();
      if (valid == true) {
        scopeObj.saveAndAddAnotherFlow = false;
        scopeObj.createCitizenshipDetails();
      }
    };
    this.view.btnDuePopUpSaveAndAdd.onClick = function () {
      var valid = scopeObj.validateCitizenshipDetails();
      if (valid == true) {
        scopeObj.saveAndAddAnotherFlow = true;
        scopeObj.createCitizenshipDetails();
      }
    };
    this.view.flxCloseTaxPopup.onClick = this.closePopup.bind(this, this.view.flxAddTaxDetailsPopup);
    this.view.btnTaxPopUpCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxAddTaxDetailsPopup.setVisibility(false);
        if (scopeObj.EditedCountryToBeRemoved != "") {
          scopeObj.removeItemFromListBox(scopeObj.view.lstbxTaxCountryUser, scopeObj.EditedCountryToBeRemoved);
        }
      };
      var cancelAction = function () {
        scopeObj.view.flxAddTaxDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.btnTaxPopUpSave.onClick = function () {
      var valid = scopeObj.validateTaxDetails();
      if (valid == true) {
        scopeObj.view.flxAddTaxDetailsPopup.setVisibility(false);
        scopeObj.saveAndAddAnotherFlow = false;
        if (scopeObj.isTaxEdited)
          scopeObj.updateTaxDetails();
        else
          scopeObj.createTaxDetails();
      }
    }
    this.view.btnTaxPopUpSaveAndAdd.onClick = function () {
      var valid = scopeObj.validateTaxDetails();
      if (valid == true) {
        scopeObj.view.flxAddTaxDetailsPopup.setVisibility(false);
        scopeObj.saveAndAddAnotherFlow = true;
        scopeObj.createTaxDetails();
      }
      //       scopeObj.clearTaxPopupData();
      //       scopeObj.isTaxEdited=false;
      //       scopeObj.view.flxAddTaxDetailsPopup.setVisibility(true);
    }
    this.view.flxCloseStudntPopup.onClick = this.closePopup.bind(this, this.view.flxStudentDetailsPopup);
    this.view.btnStudentCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxStudentDetailsPopup.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxStudentDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.dropdownEntity.flxSelectLegalEntity.onClick = function(){
      var segmntData = scopeObj.view.dropdownEntity.segEntity.data;
      if(segmntData.length === 1 ){  
        scopeObj.this.view.dropdownEntity.flxSegEntity.setVisibility(false);
      }
      else {
        if(scopeObj.view.dropdownEntity.flxSegEntity.isVisible === false) {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(true);
        } else {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
        }
      }
    };
    this.view.flxCloseEmploymentStatus.onClick = this.closePopup.bind(this, this.view.flxEmploymentStatusDetailsPopup);
    this.view.btnEmploymentStatusCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxEmploymentStatusDetailsPopup.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxEmploymentStatusDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.flxCloseUmemploy.onClick = this.closePopup.bind(this, this.view.flxUnemployDetailsPopup);
    this.view.flxCloseEmploymentPopup.onClick = this.closePopup.bind(this, this.view.flxEmploymentDetailsPopupParent);
    this.view.btnUnemployCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxUnemployDetailsPopup.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxUnemployDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.btnUnemploySave.onClick = this.CreateorUpdateEmploymentDetails;
    this.view.btnEmploymentCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxEmploymentDetailsPopupParent.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxEmploymentDetailsPopupParent.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.btnEmploymentSave.onClick = this.CreateorUpdateEmploymentDetails;
    this.view.btnSelfEmploymentCancel.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxSelfEmploymentDetailsPopupParent.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxSelfEmploymentDetailsPopupParent.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.flxSendPayClosePopup.onClick = this.closePopup.bind(this, this.view.flxSendPaymentsDetailsPopup);
    this.view.btnSendPayClose.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxSendPaymentsDetailsPopup.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxSendPaymentsDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.btnSendPaySave.onClick = this.createOrUpdateAccountUsage.bind(this, "SendPayments");
    this.view.flxReceivePayClosePopup.onClick = this.closePopup.bind(this, this.view.flxReceivePaymentsDetailsPopup);
    this.view.btnReceivePayClose.onClick = function () {
      var confirmAction = function () {
        scopeObj.view.flxReceivePaymentsDetailsPopup.setVisibility(false);
      };
      var cancelAction = function () {
        scopeObj.view.flxReceivePaymentsDetailsPopup.setVisibility(true);
      };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Discard Changes',
        message: "Are you sure you want to discard the changes ?<br><br> Once discarded, the changes will be Lost.",
        confirmAction: confirmAction,
        cancelMsg: "CANCEL",
        cancelAction: cancelAction,
        confirmMsg: 'DISCARD',

      }, scopeObj);
    };
    this.view.dropdownEntity.tbxSearchBox.onKeyUp = function() {
      if (scopeObj.view.dropdownEntity.tbxSearchBox.text.trim().length > 0) {
          scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(true);
          var segData = scopeObj.view.dropdownEntity.segEntity.data;
          var searchText = scopeObj.view.dropdownEntity.tbxSearchBox.text;
          var statusName = "";
          var filteredData = segData.filter(function(rec) {
              statusName = rec.lblDescription.toLowerCase();
              if (statusName.indexOf(searchText) >= 0)
              { 
                scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(true);
                return rec;
              }
          });
          if (filteredData.length === 0) {
              scopeObj.view.dropdownEntity.segEntity.setVisibility(false);
              scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(true);
          } else {
              scopeObj.view.dropdownEntity.segEntity.setData(filteredData);
              scopeObj.view.dropdownEntity.segEntity.setVisibility(true);
              scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(false);
              
          }
      } else {
         scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(false);
          var totalRecords = scopeObj.view.dropdownEntity.segEntity.info.data;
          scopeObj.view.dropdownEntity.segEntity.setData(totalRecords);
      }
      scopeObj.view.forceLayout();
  },
  this.view.dropdownEntity.flxSearchCancel.onClick = function() {
      scopeObj.view.dropdownEntity.flxSearchCancel.setVisibility(false);
      scopeObj.view.dropdownEntity.tbxSearchBox.text = "";
      var totalRecords = scopeObj.view.dropdownEntity.segEntity.info.data;
      scopeObj.view.dropdownEntity.segEntity.setData(totalRecords);
      scopeObj.view.dropdownEntity.segEntity.setVisibility(true);
      scopeObj.view.dropdownEntity.flxNoResultFound.setVisibility(false);
  },
  this.view.dropdownEntity.flxSegEntity.flxSegData.segEntity.onRowClick = function() {
   var rowInd = scopeObj.view.dropdownEntity.segEntity.selectedRowIndex[1];
   var segData = scopeObj.view.dropdownEntity.segEntity.data;
    if(segData[rowInd].lblDescription !== "LEGAL ENTITY")
     {
      scopeObj.view.dropdownEntity.lblSelectLegalEntity.text = segData[rowInd].lblDescription;
      scopeObj.view.dropdownEntity.lblSelectLegalEntity.info={"id":segData[rowInd].id};
      scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
      scopeObj.view.dropdownEntity.lblSelectLegalEntity.skin = "sknlblLatoBold35475f14px";
      var presentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule").presentationController;
      var Id = presentationController.getCustomerId();
      scopeObj.presenter.getCustomerBasicInfo({
       "Customer_id":Id,
       "legalEntityId": segData[rowInd].id, 
      }
      );
     }
  };
    this.view.btnReceivePaySave.onClick = this.createOrUpdateAccountUsage.bind(this, "ReceivePayments");
    this.view.verticalTabs.btnOption1.onClick = function () {
      scopeObj.isCitizenshipEdited = false;
      scopeObj.isTaxEdited = false;
      scopeObj.getCitizenshipAndTaxDetails();
      scopeObj.showCitizenshipAndTax();
    };
    //     this.view.verticalTabs.btnOption4.onClick = function() {    
    //       scopeObj.addEmploymentDetails(scopeObj.view.verticalTabs.btnOption4);
    //     };
    this.view.verticalTabs.btnOption4.onClick = this.getEmploymentDetails;
    this.view.verticalTabs.btnSubOption31.onClick = function () {
      scopeObj.view.verticalTabs.setSelectedOptionButtonStyle(scopeObj.view.verticalTabs.btnOption3);
      scopeObj.view.verticalTabs.setSelectedOptionButtonStyle(scopeObj.view.verticalTabs.btnSubOption31);
      scopeObj.getAccountUsage("SendPayments");
    };
    this.view.verticalTabs.btnSubOption32.onClick = function () {
      scopeObj.view.verticalTabs.setSelectedOptionButtonStyle(scopeObj.view.verticalTabs.btnOption3);
      scopeObj.view.verticalTabs.setSelectedOptionButtonStyle(scopeObj.view.verticalTabs.btnSubOption32);
      scopeObj.getAccountUsage("ReceivePayments");
    };
    this.view.lstBoxEmploymentStatus.onSelection = this.onlstBoxEmploymentStatusSelected.bind(this);
    //this.setDataForCountries(this.presenter.getCountries(),scopeObj.view.lstbxCountryUser);
    this.view.lstbxCountryUser.onSelection = this.onCountrySelected.bind(this);
    this.view.lstbxTaxCountryUser.onSelection = this.onTaxCountrySelected.bind(this);
    this.view.flxRadio1.onClick = this.selectRadioYesOrNo.bind(this, scopeObj.view.imgRadio1);
    this.view.flxRadio2.onClick = this.selectRadioYesOrNo.bind(this, scopeObj.view.imgRadio2);
    this.view.flxRadioYes.onClick = this.selectResident.bind(this, scopeObj.view.imgResidentRadio1);
    this.view.flxRadioNo.onClick = this.selectResident.bind(this, scopeObj.view.imgResidentRadio2);
    this.view.flxYesRadio.onClick = this.selectStatutoryPeriod.bind(this, scopeObj.view.imgYesStayRadio);
    this.view.flxNoRadio.onClick = this.selectStatutoryPeriod.bind(this, scopeObj.view.imgNoStayRadio);
    this.view.flxYesBenefitsRadio.onClick = this.selectSecurityBenefits.bind(this, scopeObj.view.imgYesBenefitsRadio);
    this.view.flxNoBenefitsRadio.onClick = this.selectSecurityBenefits.bind(this, scopeObj.view.imgNoBenefitsRadio);
    this.view.customListbox.flxSelectedText.onClick = this.showMultiSelectCountryList.bind(this, scopeObj.view.customListbox);
    this.view.customListbox1.flxSelectedText.onClick = this.showMultiSelectCountryList.bind(this, scopeObj.view.customListbox1);
    this.view.customListbox.segList.onRowClick = this.onCustomListBoxRowClick.bind(this, scopeObj.view.customListbox);
    this.view.customListbox1.segList.onRowClick = this.onCustomListBoxRowClick.bind(this, scopeObj.view.customListbox1);
    this.view.typeHeadCity.tbxSearchKey.info = {
      "isValid": false,
      "data": ""
    };
    this.view.typeHeadCountry.tbxSearchKey.info = {
      "isValid": false,
      "data": ""
    };
    this.view.typeHeadState.tbxSearchKey.info = {
      "isValid": false,
      "data": ""
    };
    this.view.btnEditEmploymentDetails.onClick = this.showEmploymentPopups.bind(this, "edit");
    this.view.btnEditAccountUsageDetails.onClick = this.showAccountPopups.bind(this, "edit");
    this.view.btnEmploymentStatusSave.onClick = this.CreateorUpdateEmploymentDetails;
    this.view.customListbox.tbxSearchCountry.onKeyUp = function () {
      scopeObj.filterData(scopeObj.view.customListbox);
    };
    this.view.customListbox1.tbxSearchCountry.onKeyUp = function () {
      scopeObj.filterData(scopeObj.view.customListbox1);
    };
    this.view.txtbxExpectedPayments.onBeginEditing = function(){
       scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmCustomerProfileDueDiligence_txtbxExpectedPayments");
    }
    this.view.txtbxExpectedPayments.onKeyUp = this.validatCharacterCount.bind(this,this.view.txtbxExpectedPayments,this.view.lblExpectedSendPaymentCount,"");
    this.view.txtbxExpectedAmount.onKeyUp = this.validatCharacterCount.bind(this,this.view.txtbxExpectedAmount,this.view.lblExpectedAmountCount,"");
    this.view.txtReason.onKeyUp = this.validatCharacterCount.bind(this,this.view.txtReason,this.view.lblExpectedReasonCount,"reason");
    this.view.txtbxExpectedReceivePayments.onBeginEditing = function(){
       scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmCustomerProfileDueDiligence_txtbxExpectedReceivePayments");
    }
    this.view.txtbxExpectedReceivePayments.onKeyUp = this.validatCharacterCount.bind(this,this.view.txtbxExpectedReceivePayments,this.view.lblExpectedReceivePaymentCount,"");
    this.view.txtbxExpectedReceivedAmount.onKeyUp = this.validatCharacterCount.bind(this,this.view.txtbxExpectedReceivedAmount,this.view.lblExpectedReceivedAmountCount,"");
    this.view.txtReasonReceivePayment.onKeyUp = this.validatCharacterCount.bind(this,this.view.txtReasonReceivePayment,this.view.lblExpectedReceivedReasonCount,"reason");
  },
  customerDueDiligencePostshow: function () {
    var scopeObj = this;
    var res = this.presenter.getCountries();
    this.view.lstBoxEmploymentRole.masterData = this.setListBoxMasterData("EMPLOYMENT_ROLE");
    this.view.lstBoxEmploymentStatus.masterData = this.setListBoxMasterData("EMPLOYMENTSTATUS_TYPE");
    this.view.lstBoxEmpStatus.masterData = this.setListBoxMasterData("EMPLOYMENTSTATUS_TYPE");
    this.view.lstbxUnemployStatus.masterData = this.setListBoxMasterData("EMPLOYMENTSTATUS_TYPE");
    this.view.lstBoxOccupation.masterData = this.setListBoxMasterData("OCCUPATION");
    this.view.lstBoxBusinessCategory.masterData = this.setListBoxMasterData("CDD_BUSINESS_CATEGORY");
    this.view.lstBoxBusinessCategory.onSelection = this.setBusinessDescMasterData.bind(this);
    this.view.lblCurrencySymbol.text = this.setListBoxMasterData("CDD_DEFAULTCURRENCY_SYMBOL");
    this.view.lbldefaultCurrencySymbol.text = this.setListBoxMasterData("CDD_DEFAULTCURRENCY_SYMBOL");
    this.view.tbxSearch.onKeyUp = function () {
      scopeObj.getGoogleSuggestion(scopeObj.view.tbxSearch.text);
    };
    this.view.segSearch.onRowClick = function () {
      scopeObj.mappingRowToWidgets();
    };
    this.view.typeHeadCountry.tbxSearchKey.onKeyUp = function () {
      scopeObj.clearValidation(scopeObj.view.typeHeadCountry.tbxSearchKey, scopeObj.view.flxNoCountry, 1);
      scopeObj.view.typeHeadCountry.tbxSearchKey.info.isValid = false;
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadCountry);
      scopeObj.view.flxCountry.zIndex = 2;
      scopeObj.searchForAddress(scopeObj.view.typeHeadCountry.tbxSearchKey, scopeObj.view.typeHeadCountry.segSearchResult, scopeObj.view.typeHeadCountry.flxNoResultFound, 1);
      if (scopeObj.view.typeHeadCountry.tbxSearchKey.text === "") {
        scopeObj.view.typeHeadState.tbxSearchKey.setEnabled(false);
        scopeObj.view.typeHeadCity.tbxSearchKey.setEnabled(false);
      } else {
        scopeObj.view.typeHeadState.tbxSearchKey.setEnabled(true);
      }
      scopeObj.view.typeHeadState.tbxSearchKey.text = "";
      scopeObj.view.typeHeadCity.tbxSearchKey.text = "";
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadCity.tbxSearchKey.onKeyUp = function () {
      scopeObj.clearValidation(scopeObj.view.typeHeadCity.tbxSearchKey, scopeObj.view.flxNoCity, 1);
      scopeObj.view.typeHeadCity.tbxSearchKey.info.isValid = false;
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadCity);
      scopeObj.searchForAddress(scopeObj.view.typeHeadCity.tbxSearchKey, scopeObj.view.typeHeadCity.segSearchResult, scopeObj.view.typeHeadCity.flxNoResultFound, 3);
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadState.tbxSearchKey.onKeyUp = function () {
      scopeObj.clearValidation(scopeObj.view.typeHeadState.tbxSearchKey, scopeObj.view.flxNoState, 1);
      scopeObj.view.typeHeadState.tbxSearchKey.info.isValid = false;
      if (scopeObj.view.typeHeadState.tbxSearchKey.text === "") {
        scopeObj.view.typeHeadCity.tbxSearchKey.setEnabled(false);
      } else {
        scopeObj.view.typeHeadCity.tbxSearchKey.setEnabled(true);
      }
      scopeObj.hideAddressSegments(scopeObj.view.typeHeadState);
      scopeObj.searchForAddress(scopeObj.view.typeHeadState.tbxSearchKey, scopeObj.view.typeHeadState.segSearchResult, scopeObj.view.typeHeadState.flxNoResultFound, 2);
      scopeObj.view.typeHeadCity.tbxSearchKey.text = "";
      scopeObj.view.forceLayout();
    };
    this.view.typeHeadCountry.segSearchResult.onRowClick = function () {
      scopeObj.assingText(scopeObj.view.typeHeadCountry.segSearchResult, scopeObj.view.typeHeadCountry.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadCountry.tbxSearchKey, scopeObj.view.flxNoCountry, 1);
    };
    this.view.typeHeadCity.segSearchResult.onRowClick = function () {
      scopeObj.assingText(scopeObj.view.typeHeadCity.segSearchResult, scopeObj.view.typeHeadCity.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadCity.tbxSearchKey, scopeObj.view.flxNoCity, 1);
    };
    this.view.typeHeadState.segSearchResult.onRowClick = function () {
      scopeObj.assingText(scopeObj.view.typeHeadState.segSearchResult, scopeObj.view.typeHeadState.tbxSearchKey);
      scopeObj.clearValidation(scopeObj.view.typeHeadState.tbxSearchKey, scopeObj.view.flxNoState, 1);
    };
    this.view.lblExpectedPayIcon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.paymentsInfoIconComponent);
    };
    this.view.lblExpectedAmountInfocon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.AmountInfoIconComponent);
    };
    this.view.lblSendPayReason.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.reasonInfoIconComponent);
    };
    this.view.lblExpectedReceiveIcon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.ReceivepaymentsInfoComponent);
    };
    this.view.lblExpectedReceivedAmountInfoIcon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.ReceiveAmountInfoComponent);
    };
    this.view.lblReceivePayReason.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.reasonReceiveInfoComponent);
    };
    this.view.lblExpectedNumberPayIcon.onHover = function (widget, context) {
      if (scopeObj.view.lblAccountHeader.text == kony.i18n.getLocalizedString("kony.customers.dueDiligence.ReceivePayTitle"))
        scopeObj.view.SendpaymentsInfoIconComponent.lblOption2.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.EstmatedReceivePayNumber");
      else
        scopeObj.view.SendpaymentsInfoIconComponent.lblOption2.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.EstmatedSendPayNumber");
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.SendpaymentsInfoIconComponent);
    };
    this.view.lblAmountPerMonthInfo.onHover = function (widget, context) {
      if (scopeObj.view.lblAccountHeader.text == kony.i18n.getLocalizedString("kony.customers.dueDiligence.ReceivePayTitle"))
        scopeObj.view.SendAmountInfoIconComponent.lblOption2.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.EstmatedReceivePayAmount");
      else
        scopeObj.view.SendAmountInfoIconComponent.lblOption2.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.EstmatedSendPayAmount");
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.SendAmountInfoIconComponent);
    };
    this.view.flxEmploymentBusinessAddress.onClick = this.getSelectedAddress;
    this.view.lblReasonInfo.onHover = function (widget, context) {
      if (scopeObj.view.lblAccountHeader.text == kony.i18n.getLocalizedString("kony.customers.dueDiligence.ReceivePayTitle"))
        scopeObj.view.SendReasonInfoIconComponent.lblOption2.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.receivePayReason");
      else
        scopeObj.view.SendReasonInfoIconComponent.lblOption2.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.sendPayReason");
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.SendReasonInfoIconComponent);
    };
    this.view.lblCitizenshipInfoIcon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.citizenshipInfoIconComponent);
    };
    this.view.lblResidencynfoIcon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.residencyInfoIconComponent);
    };
    this.view.lblStatutorynfoIcon.onHover = function (widget, context) {
      scopeObj.onHoverCDDText(widget, context, scopeObj.view.statutoryInfoIconComponent);
    };
  },
  selectRadioYesOrNo: function (widgetRef) {
    var scopeObj = this;
    scopeObj.view.imgRadio1.src = "radio_notselected.png";
    scopeObj.view.imgRadio2.src = "radio_notselected.png";
    widgetRef.src = "radio_selected.png";
    if (widgetRef == scopeObj.view.imgRadio2 && this.isCitizenshipEdited === true) {
      var rowData = this.view.segListing.selectedRowItems[0];
      if (rowData.lblCitizenship == "Yes") {
        scopeObj.view.flxEndDateCitizenship.setVisibility(true);
        scopeObj.view.customEndDateCitizenship.value = "";
      }
    } else
      scopeObj.view.flxEndDateCitizenship.setVisibility(false);
  },
  selectResident: function (widgetRef) {
    var scopeObj = this;
    scopeObj.view.imgResidentRadio1.src = "radio_notselected.png";
    scopeObj.view.imgResidentRadio2.src = "radio_notselected.png";
    widgetRef.src = "radio_selected.png";
    if (widgetRef == scopeObj.view.imgResidentRadio2 && this.isCitizenshipEdited === true) {
      var rowData = this.view.segListing.selectedRowItems[0];
      if (rowData.lblResidency == "Yes") {
        scopeObj.view.flxEndDateResidency.setVisibility(true);
        scopeObj.view.customEndDateResidency.value = "";
      }
      this.selectStatutoryPeriod(scopeObj.view.imgNoStayRadio);
      scopeObj.view.flxCustomerStayDuration.setVisibility(false);
      scopeObj.view.flxCustomerStayRadio.setVisibility(false);
    } else {
      scopeObj.view.flxEndDateResidency.setVisibility(false);
      if (widgetRef == scopeObj.view.imgResidentRadio1) {
        scopeObj.view.flxCustomerStayDuration.setVisibility(true);
        scopeObj.view.flxCustomerStayRadio.setVisibility(true);
      }
    }
  },
  selectStatutoryPeriod: function (widgetRef) {
    var scopeObj = this;
    scopeObj.view.imgYesStayRadio.src = "radio_notselected.png";
    scopeObj.view.imgNoStayRadio.src = "radio_notselected.png";
    widgetRef.src = "radio_selected.png";
  },
  selectSecurityBenefits: function (widgetRef) {
    var scopeObj = this;
    scopeObj.view.imgYesBenefitsRadio.src = "radio_notselected.png";
    scopeObj.view.imgNoBenefitsRadio.src = "radio_notselected.png";
    widgetRef.src = "radio_selected.png";
  },
  setDataForCountries: function (res, widgetRef) {
    widgetRef.masterData = res.reduce(
      function (list, country) {
        return list.concat([
          [country.id, country.Name]
        ]);
      },
      [
        [kony.i18n.getLocalizedString("i18n.frmLogsController.Select"), kony.i18n.getLocalizedString("i18n.frmLocations.lblNoCountryError")]
      ]
    );
  },
  setListBoxMasterData: function (name) {
    var configurations = this.presenter.CustomerBasicInfo.clientConfigurations;
    var rolesData = configurations.filter(function (rec) {
      return rec.configurationKey == name;
    });
    if (name == "CDD_BUSINESS_DESCRIPTION") {
      var response = JSON.parse(rolesData[0].configurationValue);
      var data = response[this.businessCategorySelected];
      return data;
    } else if (name == "CDD_DEFAULTCURRENCY_SYMBOL")
      return rolesData[0] ? rolesData[0].configurationValue : "";
    else {
      if (typeof rolesData[0].configurationValue === "string")
        rolesData[0].configurationValue = JSON.parse(rolesData[0].configurationValue);
      return rolesData[0] ? rolesData[0].configurationValue : "";
    }
  },
  setBusinessDescMasterData: function () {
    this.businessCategorySelected = this.view.lstBoxBusinessCategory.selectedKeyValue[0];
    this.view.lstbxBusinessDescription.masterData = this.setListBoxMasterData("CDD_BUSINESS_DESCRIPTION");
  },
  onCountrySelected: function () {
    this.view.flxCitizenshipQuestions.isVisible = true;
  },
  onTaxCountrySelected: function () {
    this.view.flxTaxIdNum.isVisible = true;
  },
  onlstBoxEmploymentStatusSelected: function (data) {
    this.employmentStatusSelected = this.view.lstBoxEmploymentStatus.selectedKeyValue[1];
    this.showEmploymentPopups();
  },

  updatedCollection: function (a1, a2) {
    return a1.filter(function (x) {
      var result = false;
      if (a2.indexOf(x) < 0) result = true;
      return result;
    });
  },

  /*
   * popup shown on click of reset actions buttons
   */
  showResetActionsPopup: function () {
    var self = this;
    this.view.popUpConfirmation.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ResetActions");
    this.view.popUpConfirmation.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmGroupsController.ResetActionsPopupMessage");
    this.view.popUpConfirmation.btnPopUpCancel.text = kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
    this.view.popUpConfirmation.btnPopUpDelete.text = kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
    this.view.flxPopUpConfirmation.setVisibility(true);
    this.view.popUpConfirmation.btnPopUpDelete.onClick = function (event) {
      self.view.flxPopUpConfirmation.setVisibility(false);
      self.resetFeatureActions();
    };
    this.view.forceLayout();
  },

  /**** END ****/
  /*
   * set data to roles vertical tabs
   */
  //   setDueDiligenceVerticalTabsData : function(){
  //     var widgetMap = {
  //       "flxRow":"flxRow",
  //       "lblSeperator":"lblSeperator",
  //       "btnOption1":"btnOption1",
  //       "flxImgArrow":"flxImgArrow",
  //       "lblSelected1":"lblSelected1"
  //     };
  //     var tabNames = [{"name":"CITIZENSHIP & TAX",
  //                      "isSelected":1},
  //                     {"name": "EMPLOYMENT",
  //                      "isSelected":2},
  //                     {"name": "ACCOUNT USAGE",
  //                      "isSelected":3}];
  //     var segData = tabNames.map(function(rec){
  //       return {
  //         "lblSeperator":"-",
  //         "btnOption1":{"text":rec.name,
  //                       "skin":rec.isSelected === 1 ? "sknBtnLatoBold485c7512PxNoBorder" :"sknBtn737678LatoReg12pxNoBgBorder"},
  //         "flxImgArrow":{"isVisible":rec.isSelected === 1 ? true : false},
  //         "lblSelected1":{"text":"\ue918"},
  //         "template":"flxRow",
  //       }
  //     });
  //     this.view.segDueDiligenceVerticalTabs.widgetDataMap = widgetMap;
  //     this.view.segDueDiligenceVerticalTabs.setData(segData);
  //     this.view.forceLayout();
  //   },
  /*
   * change the selected tab in vertical tabs
   */
  toggleSelectedRow: function () {
    var segData = this.view.segDueDiligenceVerticalTabs.data;
    var selectedRowIndex = this.view.segDueDiligenceVerticalTabs.selectedRowIndex ? this.view.segDueDiligenceVerticalTabs.selectedRowIndex[1] : 0;
    for (var i = 0; i < segData.length; i++) {
      if (i === selectedRowIndex) {
        segData[i].btnOption1.skin = "sknBtnLatoBold485c7512PxNoBorder";
        segData[i].flxImgArrow.isVisible = true;
      } else {
        segData[i].btnOption1.skin = "sknBtn737678LatoReg12pxNoBgBorder";
        segData[i].flxImgArrow.isVisible = false;
      }
    }
    this.view.segDueDiligenceVerticalTabs.setData(segData);
    if (selectedRowIndex === 0) { //roles tabs
      this.view.flxRolesListing.setVisibility(false);
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
      this.view.flxNoFeaturesActionsCont.setVisibility(false);
      this.view.flxOtherAddtionalFeaturesActionsContainer.setVisibility(false);
    } else { //additional features tab
      //is.presenter.getAdditionalFeaturesAndActions({ "username": this.presenter.getCurrentCustomerDetails().Username}, "InfoScreen");
      //is.view.lblNoFeaturesActionsHeader.text = kony.i18n.getLocalizedString("i18n.frmLogs.rtxNoResultsFound");
      this.view.flxRolesListing.setVisibility(false);
      this.view.flxNoFeaturesActionsCont.setVisibility(false);
      this.view.btnAddFeaturesActions.setVisibility(false);
      this.view.flxAddFeaturesActionsContainer.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
   * show or hide the toggle buttons based on customer type
   * @param: customer info
   */
  showToggleButtons: function (customerInfo) {
    var custType = customerInfo.CustomerType_id;
    if (custType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE) >= 0 &&
      custType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE) >= 0) {
      this.toggleButtonsUtilFunction([this.view.toggleButtons.btnToggleLeft, this.view.toggleButtons.btnToggleRight], 1);
      this.view.flxToggleButtonsContainer.setVisibility(true);
      this.view.flxGroupsWrapper.top = "60dp";
    } else {
      this.view.flxToggleButtonsContainer.setVisibility(false);
      this.view.flxGroupsWrapper.top = "0dp";
    }
    this.view.forceLayout();
  },
  addEmploymentDetails: function (widgetRef) {
    this.view.flxDueDiligenceRightDetails.setVisibility(false);
    this.view.verticalTabs.setSelectedOptionButtonStyle(widgetRef);
    this.view.flxEmploymentRightDetails.setVisibility(true);
    if (widgetRef === this.view.verticalTabs.btnSubOption31) {
      if (this.sendPayDataUpdated == true) {
        this.view.addTemplate.setVisibility(false);
        this.saveSendPaymentDetails();
        this.view.flxAccountUsageDetails.setVisibility(true);
      } else {
        this.view.addTemplate.setVisibility(true);
        this.view.flxAccountUsageDetails.setVisibility(false);
      }
      this.view.flxEmploymentDetails.setVisibility(false);
      this.view.verticalTabs.showSelectedOptionImage(this.view.verticalTabs.lblSelectedSub31);
      this.view.addTemplate.lblAddDetails.text = kony.i18n.getLocalizedString("Click ADD to enter bank account usage details");
      this.view.addTemplate.lblHeader.text = "Account Usage Details (Send Payments)";
      this.view.addTemplate.btnAddDetails.onClick = this.showSendPaymentsPopup;
    } else if (widgetRef === this.view.verticalTabs.btnSubOption32) {
      if (this.receivePayDataUpdated == true) {
        this.view.addTemplate.setVisibility(false);
        this.saveReceivePaymentDetails();
        this.view.flxAccountUsageDetails.setVisibility(true);
      } else {
        this.view.addTemplate.setVisibility(true);
        this.view.flxAccountUsageDetails.setVisibility(false);
      }
      this.view.flxEmploymentDetails.setVisibility(false);
      this.view.verticalTabs.showSelectedOptionImage(this.view.verticalTabs.lblSelectedSub32);
      this.view.addTemplate.lblAddDetails.text = kony.i18n.getLocalizedString("Click ADD to enter bank account usage details");
      this.view.addTemplate.lblHeader.text = "Account Usage Details (Receive Payments)";
      this.view.addTemplate.btnAddDetails.onClick = this.showReceivePaymentsPopup;
    } else if (widgetRef === this.view.verticalTabs.btnOption4) {
      this.view.flxAccountUsageDetails.setVisibility(false);
      if (this.employeeDataUpdated == true) {
        this.view.addTemplate.setVisibility(false);
        this.view.flxEmploymentDetails.setVisibility(true);
      } else {
        this.view.flxEmploymentDetails.setVisibility(false);
        this.view.addTemplate.setVisibility(true);
      }
      this.view.verticalTabs.showSelectedOptionImage(this.view.verticalTabs.lblSelected4);
      this.view.addTemplate.lblAddDetails.text = "To add Employment details click the ADD button.";
      this.view.addTemplate.lblHeader.text = "Employment Details";
      this.view.flxEmploymentRightDetails.addTemplate.btnAddDetails.onClick = this.showEmploymentStatusPopup;
    }
    this.view.forceLayout();
  },

  showReceivePaymentsPopup: function () {
    this.prevSelectedIndices = [];
    this.view.customListbox1.segList.setData(this.customListboxdata);
    this.view.customListbox1.flxSegmentList.isVisible = false;
    this.view.customListbox1.tbxSearchCountry.text = "";
    this.view.customListbox1.lblSelectedValue.text = "Select Countries";
    this.view.txtbxExpectedReceivePayments.text = "";
    this.view.txtbxExpectedReceivedAmount.text = "";
    this.view.txtReasonReceivePayment.text = "";
    this.view.flxReceivePaymentsDetailsPopup.isVisible = true;
    this.view.flxSendPaymentsDetailsPopup.isVisible = false;
  },

  showSendPaymentsPopup: function () {
    this.prevSelectedIndices = [];
    this.view.customListbox.segList.setData(this.customListboxdata);
    this.view.customListbox.tbxSearchCountry.text = "";
    this.view.customListbox.flxSegmentList.isVisible = false;
    this.view.customListbox.lblSelectedValue.text = "Select Countries";
    this.view.txtbxExpectedPayments.text = "";
    this.view.txtbxExpectedAmount.text = "";
    this.view.txtReason.text = "";
    this.view.flxReceivePaymentsDetailsPopup.isVisible = false;
    this.view.flxSendPaymentsDetailsPopup.isVisible = true;
  },
  showAccountPopups: function () {
    if (this.view.verticalTabs.btnSubOption31.skin === "sknBtnLatoBold485c7512PxNoBorder") {
      this.editSendPaymentDetails();
      this.view.flxReceivePaymentsDetailsPopup.isVisible = false;
      this.view.flxSendPaymentsDetailsPopup.isVisible = true;
    } else {
      this.editReceivePaymentDetails();
      this.view.flxReceivePaymentsDetailsPopup.isVisible = true;
      this.view.flxSendPaymentsDetailsPopup.isVisible = false;
    }
    this.prevSelectedIndices = [];
  },
  showEmploymentStatusPopup: function () {
    var scope = this;
    scope.view.flxEmploymentStatusDetailsPopup.setVisibility(true);
  },

  closePopup: function (widgetRef) {
    widgetRef.setVisibility(false);
    if (widgetRef == this.view.flxAddCitizenshipDetailsPopup && this.EditedCountryToBeRemoved != "")
      this.removeItemFromListBox(this.view.lstbxCountryUser, this.EditedCountryToBeRemoved);
    if (widgetRef == this.view.flxAddTaxDetailsPopup && this.EditedCountryToBeRemoved != "")
      this.removeItemFromListBox(this.view.lstbxTaxCountryUser, this.EditedCountryToBeRemoved);
  },

  showEmploymentPopups(type) {
    var scope = this;
    if (scope.employmentStatusSelected === "Employee") {
      this.resetEmploymentPopup();
      scope.view.flxEmployerNameDetails.setVisibility(true);
      scope.view.flxBusinessTypeDetails.setVisibility(true);
      scope.view.lstBoxEmpStatus.selectedKey = "E";
      scope.view.flxEmploymentDetailsPopupParent.setVisibility(true);
      scope.view.flxStudentDetailsPopup.setVisibility(false);
      scope.view.flxUnemployDetails.setVisibility(false);
      scope.view.flxSelfEmploymentDetailsPopupParent.setVisibility(false);
      this.view.lstBoxEmpStatus.setEnabled(false);
      this.view.lstBoxOccupation.setEnabled(true);
      if (type == "edit") {
        this.view.lstBoxEmploymentRole.selectedKey = this.setListBoxData(this.view.lstBoxEmploymentRole, this.editEmploymentData.employments[0].jobTitle);
        this.view.lstBoxOccupation.selectedKey = this.setListBoxData(this.view.lstBoxOccupation, this.editEmploymentData.occupations[0].occupationType);
        this.view.customStartDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/");
        this.view.customEndDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/");
        var startDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/"));
        this.view.customStartDate.resetData = this.getLocaleDate(startDate);
        var endDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/"));
        this.view.customEndDate.resetData = this.getLocaleDate(endDate);
        this.view.txtbxEmployerName.text = this.editEmploymentData.employments[0].employerName;
        var categoryandDescription = this.editEmploymentData.employments[0].employerSegment.split("$_$");
        this.view.lstBoxBusinessCategory.selectedKey = this.setListBoxData(this.view.lstBoxBusinessCategory, categoryandDescription[0]);
        this.setBusinessDesconEdit(this.view.lstbxBusinessDescription, categoryandDescription[0], categoryandDescription[1]);
        this.view.tbxDetailedDesc.text = this.editEmploymentData.employments[0].extensionData.detailedDescription;
        var addressObj = this.getBusinessAddress(this.editEmploymentData.addresses);
        if ((addressObj.addressType == "Residence")) {
          this.view.imgcbEmploymenyBussinessAddress.src = "checkboxselected.png";
        } else {
          this.view.imgcbEmploymenyBussinessAddress.src = "checkboxnormal.png";
        }
        this.view.typeHeadCountry.tbxSearchKey.text = addressObj.countryCode;
        this.view.tbxStreetName.text = addressObj.streetName;
        this.view.tbxBuildingName.text = addressObj.buildingName;
        this.view.tbxZipCode.text = addressObj.postalOrZipCode;
        this.view.typeHeadState.tbxSearchKey.text = addressObj.regionCode;
        this.view.typeHeadCity.tbxSearchKey.text = addressObj.district;
        this.view.lstBoxOccupation.setEnabled(false);
      }
    } else if (scope.employmentStatusSelected === "Student") {
      scope.resetUnEmploymentPopup();
      scope.view.flxEmploymentDetailsPopupParent.setVisibility(false);
      scope.view.flxUnemployDetailsPopup.setVisibility(true);
      scope.view.flxUnemployQuestions.setVisibility(false);
      scope.view.lstbxUnemployStatus.selectedKey = "G";
      scope.view.lstbxUnemployStatus.setEnabled(false);
      if (type == "edit") {
        this.view.customEmployStartDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/");
        this.view.customEmployEndDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/");
        var startDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/"));
        this.view.customEmployStartDate.resetData = this.getLocaleDate(startDate);
        var endDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/"));
        this.view.customEmployEndDate.resetData = this.getLocaleDate(endDate);
      }
    } else if (scope.employmentStatusSelected === "Un-Employed") {
      scope.resetUnEmploymentPopup();
      scope.view.flxEmploymentDetailsPopupParent.setVisibility(false);
      scope.view.flxStudentDetailsPopup.setVisibility(false);
      scope.view.flxUnemployDetailsPopup.setVisibility(true);
      scope.view.lstbxUnemployStatus.selectedKey = "U";
      scope.view.lstbxUnemployStatus.setEnabled(false);
      scope.view.flxUnemployQuestions.setVisibility(true);
      if (type == "edit") {
        this.view.customEmployStartDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/");
        this.view.customEmployEndDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/");
        var startDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/"));
        this.view.customEmployStartDate.resetData = this.getLocaleDate(startDate);
        var endDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/"));
        this.view.customEmployEndDate.resetData = this.getLocaleDate(endDate);
        var widgetRef = this.editEmploymentData.employments[0].extensionData.securityBenefits == "false" ? this.view.imgNoBenefitsRadio : this.view.imgYesBenefitsRadio;
        this.selectSecurityBenefits.bind(this, widgetRef);
      }
    } else if (scope.employmentStatusSelected === "Self-Employed") {
      this.resetEmploymentPopup();
      scope.view.flxEmployerNameDetails.setVisibility(false);
      scope.view.flxBusinessTypeDetails.setVisibility(false);
      scope.view.lstBoxEmpStatus.selectedKey = "S";
      scope.view.flxEmploymentDetailsPopupParent.setVisibility(true);
      scope.view.flxUnemployDetails.setVisibility(false);
      this.view.lstBoxEmpStatus.setEnabled(false);
      if (type == "edit") {
        this.view.lstBoxEmploymentRole.selectedKey = this.setListBoxData(this.view.lstBoxEmploymentRole, this.editEmploymentData.employments[0].jobTitle);
        this.view.lstBoxOccupation.selectedKey = this.setListBoxData(this.view.lstBoxOccupation, this.editEmploymentData.occupations[0].occupationType);
        this.view.customStartDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/");
        this.view.customEndDate.value = this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/");
        var startDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].startDate, "/"));
        this.view.customStartDate.resetData = this.getLocaleDate(startDate);
        var endDate = new Date(this.getDateFormatMMDDYYYY(this.editEmploymentData.employments[0].endDate, "/"));
        this.view.customEndDate.resetData = this.getLocaleDate(endDate);
        this.view.txtbxEmployerName.text = this.editEmploymentData.employments[0].employerName;
        var addressObj = this.getBusinessAddress(this.editEmploymentData.addresses);
        this.view.typeHeadCountry.tbxSearchKey.text = addressObj.countryCode;
        this.view.tbxStreetName.text = addressObj.streetName;
        this.view.tbxBuildingName.text = addressObj.buildingName;
        this.view.tbxZipCode.text = addressObj.postalOrZipCode;
        this.view.typeHeadState.tbxSearchKey.text = addressObj.regionCode;
        this.view.typeHeadCity.tbxSearchKey.text = addressObj.district;
        this.view.lstBoxOccupation.setEnabled(true);
      }
    }
    scope.view.flxEmploymentStatusDetailsPopup.setVisibility(false);
    scope.view.forceLayout();
  },
  saveCitizenshipData: function (key, response) {
    var scopeObj = this;
    return {
      "lblCountry": key,
      "lblCitizenship": response.isCitizen,
      "lblResidency": response.isResident,
      "lblStatutoryPeriod": response.isStatutoryReq,
      "lblOptions": {
        "text": "\ue91e",
        "skin": "sknFontIconOptionMenuRow"
      },
      "flxOptions": {
        "onClick": function () {
          scopeObj.editCitizenshipData();
        },
        "skin": "sknFlxBorffffff1pxRound"
      },
      "lblSeperator": "lblSeperator",
      "template": "flxDueDiligence"
    }
  },
  setDataToCitizenshipSeg: function (response, entity) {
    var scopeObj = this;
    var widgetMap = {
      "flxDueDiligence": "flxDueDiligence",
      "flxSegHeader": "flxSegHeader",
      "lblCountry": "lblCountry",
      "lblCitizenship": "lblCitizenship",
      "lblResidency": "lblResidency",
      "lblStatutoryPeriod": "lblStatutoryPeriod",
      "imgOptions": "imgOptions",
      "lblOptions": "lblOptions",
      "lblSeperator": "lblSeperator",
      "flxOptions": "flxOptions"
    };
    this.view.segListing.widgetDataMap = widgetMap;
    var data = [];
    var count = 0;
    var maxAllowedCitizenships = this.setListBoxMasterData("CDD_MAX_ALLOWED_CITIZENSHIPS") != "" ? this.setListBoxMasterData("CDD_MAX_ALLOWED_CITIZENSHIPS") : 5;
    this.view.btnAddCitizenship.setEnabled(true);
    for (var key in response) {
      data.push(this.saveCitizenshipData(key, response[key]));
      count++;
      if (count == maxAllowedCitizenships)
        this.view.btnAddCitizenship.setEnabled(false);
    }
    this.view.segListing.setData(data);
    this.view.addCitizenshipTemplate.isVisible = false;
    this.view.flxAlertsSegment.isVisible = true;
    this.view.addTaxTemplate.top = "20dp";
    this.view.flxAddCitizenshipDetailsPopup.setVisibility(false);
    if (entity == "Citizenship" && this.isCitizenshipEdited == false)
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.citizenshipAddedSuccess"), scopeObj);
    else if (this.isCitizenshipEdited == true)
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.citizenshipUpdatedSuccess"), scopeObj);
    kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    if (this.saveAndAddAnotherFlow == true) {
      this.clearCitizenshipPopupData();
      this.isCitizenshipEdited = false;
      this.view.flxAddCitizenshipDetailsPopup.setVisibility(true);
      if (this.view.segListing.data.length >= maxAllowedCitizenships - 1)
        this.view.btnDuePopUpSaveAndAdd.setEnabled(false);
    }
    this.view.forceLayout();
  },
  saveTaxData: function (response) {
    var scopeObj = this;
    return {
      "lblCountry": scopeObj.getCountryName(response.country),
      "lblResidency": response.taxId,
      "lblTaxReference": response.taxReference,
      "lblOptions": {
        "text": "\ue91e",
        "skin": "sknFontIconOptionMenuRow"
      },
      "flxOptions": {
        "onClick": function () {
          scopeObj.editTaxData();
        },
        "skin": "sknFlxBorffffff1pxRound"
      },
      "lblSeperator": "lblSeperator",
      "template": "flxDueDiligence"
    }
  },
  setDataToTaxSeg: function (response, entity) {
    var scopeObj = this;
    var widgetMap = {
      "flxDueDiligence": "flxDueDiligence",
      "flxSegHeader": "flxSegHeader",
      "lblCountry": "lblCountry",
      "lblResidency": "lblResidency",
      "lblTaxReference": "lblTaxReference",
      "imgOptions": "imgOptions",
      "lblOptions": "lblOptions",
      "lblSeperator": "lblSeperator",
      "flxOptions": "flxOptions"
    };
    this.view.segTaxListing.widgetDataMap = widgetMap;
    var data = [];
    var count = 0;
    var maxAllowedTaxDetails = this.setListBoxMasterData("CDD_MAX_ALLOWED_TAXDETAILS") != "" ? this.setListBoxMasterData("CDD_MAX_ALLOWED_TAXDETAILS") : 5;
    for (var i = 0; i < response.length; i++) {
      data.push(this.saveTaxData(response[i]));
      count++;
      if (count == maxAllowedTaxDetails) {
        this.view.btnAddTax.setEnabled(false);
      }
      this.view.segTaxListing.setData(data);
      this.removeDataFromListBox(this.view.lstbxTaxCountryUser, response);
    }
    this.view.flxAddTaxDetailsPopup.setVisibility(false);
    this.view.addTaxTemplate.isVisible = false;
    this.view.flxTaxSegment.isVisible = true;
    if (entity == "Tax" && this.isTaxEdited == false)
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.taxAddedSuccess"), scopeObj);
    else if (this.isTaxEdited == true)
      this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.taxUpdatedSuccess"), scopeObj);
    kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    if (this.saveAndAddAnotherFlow == true) {
      this.clearTaxPopupData();
      this.isTaxEdited = false;
      this.view.flxAddTaxDetailsPopup.setVisibility(true);
      if (this.view.segTaxListing.data.length >= maxAllowedTaxDetails - 1)
        this.view.btnTaxPopUpSaveAndAdd.setEnabled(false);
    }
    this.view.forceLayout();
  },

  saveEmployeeDetails: function (employmentDetails) {
    this.employmentReference = JSON.parse(employmentDetails.rawResponse).employments[0].employmentReference ? JSON.parse(employmentDetails.rawResponse).employments[0].employmentReference : "";
    this.view.lblEmployStatusDetail.text = JSON.parse(employmentDetails.rawResponse).employments[0].type ? JSON.parse(employmentDetails.rawResponse).employments[0].type : "";
    this.view.lblEmployRoleDetails.text = JSON.parse(employmentDetails.rawResponse).employments[0].jobTitle ? JSON.parse(employmentDetails.rawResponse).employments[0].jobTitle : "";
    this.view.lblOccupationDetails.text = JSON.parse(employmentDetails.rawResponse).employments[0].occupationType ? JSON.parse(employmentDetails.rawResponse).employments[0].occupationType : "";
    this.view.lblEmployStartDate.text = JSON.parse(employmentDetails.rawResponse).employments[0].startDate.trim() ? this.getDateFormatYYYYMMDD(JSON.parse(employmentDetails.rawResponse).employments[0].startDate.trim(), "/") : "";
    this.view.lblEmployEndDate.text = JSON.parse(employmentDetails.rawResponse).employments[0].endDate.trim() ? this.getDateFormatYYYYMMDD(JSON.parse(employmentDetails.rawResponse).employments[0].endDate.trim(), "/") : "";
    this.view.lblEmployName.text = JSON.parse(employmentDetails.rawResponse).employments[0].employerName ? JSON.parse(employmentDetails.rawResponse).employments[0].employerName : "";
    var bussinessCategoryandDesc = JSON.parse(employmentDetails.rawResponse).employments[0].employerSegment ? JSON.parse(employmentDetails.rawResponse).employments[0].employerSegment.split("$_$") : "";
    this.view.lblEmployDescription.text = bussinessCategoryandDesc[1] ? bussinessCategoryandDesc[1] : "";
    this.view.lblEmployCategory.text = bussinessCategoryandDesc[0] ? bussinessCategoryandDesc[0] : "";
    this.view.lblEmployDetailedDescription.text = JSON.parse(employmentDetails.rawResponse).employments[0].extensionData ? JSON.parse(employmentDetails.rawResponse).employments[0].extensionData.detailedDescription ? JSON.parse(employmentDetails.rawResponse).employments[0].extensionData.detailedDescription : "" : "";
    var addressObj = this.getBusinessAddress(this.employmentAddress);
    this.addressesReference = addressObj.addressesReference;
    this.communicationNature = addressObj.communicationNature;
    this.communicationType = addressObj.communicationType;
    this.addresstype = addressObj.addressType;
    this.view.lblBusinessAddressLine1.text = (addressObj.streetName ? addressObj.streetName : "") + ", " + (addressObj.buildingName ? addressObj.buildingName : "") + ", " + (addressObj.district ? addressObj.district : "");
    this.view.lblBusinessAddressLine2.text = (addressObj.regionCode ? addressObj.regionCode : "") + ", " + (addressObj.countryCode ? addressObj.countryCode : "") + ", " + (addressObj.postalOrZipCode ? addressObj.postalOrZipCode : "");
  },

  saveUnemployeeStudentDetails: function (employmentDetails) {
    this.employmentReference = JSON.parse(employmentDetails.rawResponse).employments[0].employmentReference ? JSON.parse(employmentDetails.rawResponse).employments[0].employmentReference : "";
    this.view.lblEmploymentType.text = JSON.parse(employmentDetails.rawResponse).employments[0].type ? JSON.parse(employmentDetails.rawResponse).employments[0].type : "";
    this.view.lblStartDateValue.text =JSON.parse(employmentDetails.rawResponse).employments[0].startDate ? this.getDateFormatYYYYMMDD(JSON.parse(employmentDetails.rawResponse).employments[0].startDate.trim(), "/") : "";
    this.view.lblEndDateValue.text = JSON.parse(employmentDetails.rawResponse).employments[0].endDate ? this.getDateFormatYYYYMMDD(JSON.parse(employmentDetails.rawResponse).employments[0].endDate.trim(), "/") : "";
    this.view.lblSecurityBenefits.text = JSON.parse(employmentDetails.rawResponse).employments[0].extensionData ? JSON.parse(employmentDetails.rawResponse).employments[0].extensionData.securityBenefits ? JSON.parse(employmentDetails.rawResponse).employments[0].extensionData.securityBenefits : "" : "";
  },

  saveAndShowEmployeeDetails: function (employmentDetails) {
    var scopeObj = this;
    scopeObj.view.flxDueDiligenceRightDetails.setVisibility(false);
    scopeObj.view.flxAccountUsageDetails.setVisibility(false);
    scopeObj.view.flxEmploymentRightDetails.setVisibility(true);
    this.view.flxEmploymentDetails.setVisibility(true);
    scopeObj.view.verticalTabs.showSelectedOptionImage(this.view.verticalTabs.lblSelected4);
    scopeObj.view.flxEmploymentRightDetails.addTemplate.setVisibility(false);
    if (JSON.parse(employmentDetails.rawResponse).employments[0].type == "Employee" || JSON.parse(employmentDetails.rawResponse).employments[0].type == "Self-Employed") {
      scopeObj.saveEmployeeDetails(employmentDetails);
      if (JSON.parse(employmentDetails.rawResponse).employments[0].type == "Employee") {
        scopeObj.employmentStatusSelected = "Employee";
        scopeObj.view.flxEmployDetailsBody.setVisibility(true);
        scopeObj.view.flxStudentUnEmployeeDetails.setVisibility(false);
        scopeObj.view.flxEmployRoleDetails.setVisibility(true);
        scopeObj.view.flxEmployStartEndDetails.setVisibility(true);
        scopeObj.view.flxEmployName.setVisibility(true);
        scopeObj.view.flxEmployBusinessType.setVisibility(true);
        scopeObj.view.flxEmployBusinessAddress.setVisibility(true);
        scopeObj.view.flxUnemployDetailsPopup.setVisibility(false);
      } else if (JSON.parse(employmentDetails.rawResponse).employments[0].type == "Self-Employed") {
        scopeObj.employmentStatusSelected = "Self-Employed";
        scopeObj.view.flxEmployDetailsBody.setVisibility(true);
        scopeObj.view.flxEmployRoleDetails.setVisibility(true);
        scopeObj.view.flxStudentUnEmployeeDetails.setVisibility(false);
        scopeObj.view.flxEmployStartEndDetails.setVisibility(true);
        scopeObj.view.flxEmployName.setVisibility(false);
        scopeObj.view.flxEmployBusinessType.setVisibility(false);
        scopeObj.view.flxEmployBusinessAddress.setVisibility(true);
        scopeObj.view.flxUnemployDetailsPopup.setVisibility(false);
      }
    } else {
      scopeObj.saveUnemployeeStudentDetails(employmentDetails);
      scopeObj.view.flxUnemployDetailsPopup.setVisibility(false);
      scopeObj.view.flxEmployDetailsBody.setVisibility(false);
      scopeObj.view.flxStudentUnEmployeeDetails.setVisibility(true);
      if (JSON.parse(employmentDetails.rawResponse).employments[0].type == "Student") {
        scopeObj.employmentStatusSelected = "Student";
        scopeObj.view.flxSecurityBenefits.setVisibility(false);
      } else if (JSON.parse(employmentDetails.rawResponse).employments[0].type == "Un-Employed") {
        scopeObj.employmentStatusSelected = "Un-Employed";
        scopeObj.view.flxSecurityBenefits.setVisibility(true);
      }
    }
    //     if(scopeObj.employeeDataUpdated)
    //       scopeObj.view.toastMessage.showToastMessage("Employment Details Updated Successfully", scopeObj);
    //     else
    //       scopeObj.view.toastMessage.showToastMessage("Employment Details Added Successfully", scopeObj);
    scopeObj.employeeDataUpdated = true;
    scopeObj.view.forceLayout();
  },

  saveAndShowUnemployeeStudentDetails: function () {
    var scopeObj = this;
    scopeObj.saveUnemployeeStudentDetails();
    scopeObj.view.flxUnemployDetailsPopup.setVisibility(false);
    scopeObj.view.addTemplate.setVisibility(false);
    if (this.employmentStatusSelected == "Student") {
      this.view.flxSecurityBenefits.setVisibility(false);
    }
    scopeObj.view.flxStudentUnEmployeeDetails.setVisibility(true);
    scopeObj.view.flxEmploymentDetails.setVisibility(true);
    scopeObj.view.flxEmployDetailsBody.setVisibility(false);
    //     if(scopeObj.employeeDataUpdated)
    //       scopeObj.view.toastMessage.showToastMessage("Employment Details Updated Successfully", scopeObj);
    //     else
    //       scopeObj.view.toastMessage.showToastMessage("Employment Details Added Successfully", scopeObj);
    scopeObj.employeeDataUpdated = true;
  },

  saveSendPaymentDetails: function (response) {
    this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption3);
    this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnSubOption31);
    this.view.verticalTabs.showSelectedOptionImage(this.view.verticalTabs.lblSelectedSub31);
    this.view.lblAccountHeader.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.SendPayTitle");
    this.view.lblCountryListHeader.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.ListOfSendCountries").toUpperCase();
    this.view.lblNoOfPaymentsPerMonth.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.estimateSendNumber").toUpperCase();
    this.view.lblPaymentAmountsPerMonth.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.estimateSendAmount").toUpperCase();
    this.view.lblPaymentReasonHeader.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.sendReason").toUpperCase();
    var list = response.intendedTransactionCountry.split(",");
    var finalCoutryList = "";
    for (var str in list) {
      finalCoutryList = finalCoutryList + ", " + this.getCountryName(list[str]);
    }
    finalCoutryList = finalCoutryList.substring(1, finalCoutryList.length);
    this.view.lblCountryList.text = finalCoutryList;
    this.view.lblPaymentPerMonth.text = response.estimatedTransactionNumber;
    this.view.lblAmountPerMonth.text = response.estimatedVolume;
    this.view.lblPaymentReason.text = response.comments;
    this.sendPayReference = response.intentionsReference;
    this.saveAndShowSendPaymentsDetails();
    this.sendPayDataUpdated = true;
  },

  saveAndShowSendPaymentsDetails: function () {
    var scopeObj = this;
    scopeObj.view.flxSendPaymentsDetailsPopup.setVisibility(false);
    scopeObj.view.flxReceivePaymentsDetailsPopup.setVisibility(false);
    scopeObj.view.flxDueDiligenceRightDetails.setVisibility(false);
    scopeObj.view.flxEmploymentRightDetails.setVisibility(false);
    scopeObj.view.flxAccountUsageDetails.setVisibility(true);
    scopeObj.view.forceLayout();
    //     if(scopeObj.sendPayDataUpdated)
    //       scopeObj.view.toastMessage.showToastMessage("Account Usage Details Updated Successfully", scopeObj);
    //     else
    //       scopeObj.view.toastMessage.showToastMessage("Account Usage Details Added Successfully", scopeObj);
  },

  editSendPaymentDetails: function () {
    var countrydata = this.editSendAccountData.intendedTransactionCountry.split(",");
    this.view.customListbox.segList.setData(this.customListboxdata);
    var data = this.view.customListbox.segList.data;
    this.prevSelectedIndices = [];
    var selectedIndices = [];
    for (var i = 0; i < countrydata.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (data[j].id == countrydata[i]) {
          selectedIndices.push(j);
        }
      }
    }
    this.view.customListbox.segList.selectedIndices = [
      [0, selectedIndices]
    ];
    this.view.customListbox.lblSelectedValue.text = selectedIndices.length + " " + this.sSelected;
    this.view.txtbxExpectedPayments.text = this.editSendAccountData.estimatedTransactionNumber;
    this.view.txtbxExpectedAmount.text = this.editSendAccountData.estimatedVolume;
    this.view.txtReason.text = this.editSendAccountData.comments;
    this.view.customListbox.tbxSearchCountry.text = "";
    this.view.customListbox.flxSegmentList.isVisible = false;
    this.validatCharacterCount(this.view.txtbxExpectedPayments,this.view.lblExpectedSendPaymentCount,"");
    this.validatCharacterCount(this.view.txtbxExpectedAmount,this.view.lblExpectedAmountCount,"");
    this.validatCharacterCount(this.view.txtReason,this.view.lblExpectedReasonCount,"reason");
  },

  saveReceivePaymentDetails: function (response) {
    this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption3);
    this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnSubOption32);
    this.view.verticalTabs.showSelectedOptionImage(this.view.verticalTabs.lblSelectedSub32);
    this.view.lblAccountHeader.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.ReceivePayTitle");
    this.view.lblCountryListHeader.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.ListOfReceivedCountries").toUpperCase();
    this.view.lblPaymentPerMonth.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.estimateReceivedNumber").toUpperCase();
    this.view.lblAmountPerMonth.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.estimateReceivedAmount").toUpperCase();
    this.view.lblPaymentReason.text = kony.i18n.getLocalizedString("kony.customers.dueDiligence.receiveReason").toUpperCase();
    var list = response.intendedTransactionCountry.split(",");
    var finalCoutryList = "";
    for (var str in list) {
      finalCoutryList = finalCoutryList + ", " + this.getCountryName(list[str]);
    }
    finalCoutryList = finalCoutryList.substring(1, finalCoutryList.length);
    this.view.lblCountryList.text = finalCoutryList;
    this.view.lblPaymentPerMonth.text = response.estimatedTransactionNumber;
    this.view.lblAmountPerMonth.text = response.estimatedVolume;
    this.view.lblPaymentReason.text = response.comments;
    this.receivePayReference = response.intentionsReference;
    this.saveAndShowSendPaymentsDetails();
    this.receivePayDataUpdated = true;
  },

  editReceivePaymentDetails: function () {
    var countrydata = this.editReceiveAccountData.intendedTransactionCountry.split(",");
    this.view.customListbox1.segList.setData(this.customListboxdata);
    var data = this.view.customListbox1.segList.data;
    this.prevSelectedIndices = [];
    var selectedIndices = [];
    for (var i = 0; i < countrydata.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (data[j].id == countrydata[i]) {
          selectedIndices.push(j);
        }
      }
    }
    this.view.customListbox1.segList.selectedIndices = [
      [0, selectedIndices]
    ];
    this.view.customListbox1.lblSelectedValue.text = selectedIndices.length + " " + this.sSelected;
    this.view.txtbxExpectedReceivePayments.text = this.editReceiveAccountData.estimatedTransactionNumber;
    this.view.txtbxExpectedReceivedAmount.text = this.editReceiveAccountData.estimatedVolume;
    this.view.txtReasonReceivePayment.text = this.editReceiveAccountData.comments;
    this.view.customListbox1.tbxSearchCountry.text = "";
    this.view.customListbox1.flxSegmentList.isVisible = false;
    this.validatCharacterCount(this.view.txtbxExpectedReceivePayments,this.view.lblExpectedReceivePaymentCount,"");
    this.validatCharacterCount(this.view.txtbxExpectedReceivedAmount,this.view.lblExpectedReceivedAmountCount,"");
    this.validatCharacterCount(this.view.txtReasonReceivePayment,this.view.lblExpectedReceivedReasonCount,"reason");
  },

  showMultiSelectCountryList: function (widgetRef) {
    widgetRef.flxSegmentList.setVisibility(widgetRef.flxSegmentList.isVisible === false);
  },

  mapAppsUsersListData: function (data, widgetPath) {
    var self = this;
    var listBoxData = [];
    var widgetDataMap = {
      "id": "id",
      "lblDescription": "lblDescription",
      "imgCheckBox": "imgCheckBox",
      "flxCheckBox": "flxCheckBox",
      "flxSearchDropDown": "flxSearchDropDown"
    };
    widgetPath.segList.widgetDataMap = widgetDataMap;
    if (data) {
      listBoxData = data.map(function (rec) {
        return {
          "id": rec.id,
          "lblDescription": {
            "text": rec.Name
          },
          "imgCheckBox": {
            "src": self.checkboxnormal
          },
          "template": "flxSearchDropDown"
        };
      });
    }
    return listBoxData;
  },

  setCountriesData: function (data, widgetPath) {
    var self = this;
    var countriesData = self.mapAppsUsersListData(data, widgetPath);
    self.customListboxdata = countriesData;
    widgetPath.segList.setData(countriesData);
    //     widgetPath.segList.selectedIndices = [
    //       [0, [0]]
    //     ];
    widgetPath.lblSelectedValue.text = "Select Countries";
  },
  onCustomListBoxRowClick: function (widgetPath) {
    var self = this;
    var segData = "",
      lblText = "";
    lblText = "Select Countries";
    segData = widgetPath.segList.data;
    var arr = [];
    for (var i = 0; i < segData.length; i++) {
      arr.push(i);
    }
    var selRows = widgetPath.segList.selectedRowItems;
    if (selRows) {
      if (selRows.length === 0) {
        widgetPath.lblSelectedValue.text = "Select Countries";
        widgetPath.segList.selectedIndices = [
          [0, arr]
        ];
        // widgetPath.imgCheckBox.src = self.checkboxselected;
      } else {
        widgetPath.lblSelectedValue.text = selRows.length + " " + self.sSelected;

        if (this.prevSelectedIndices.length > 0) {
          widgetPath.lblSelectedValue.text = this.prevSelectedIndices.length + selRows.length + " " + self.sSelected;
        }
        // widgetPath.imgCheckBox.src = self.checkboxnormal;
      }
    } else {
      widgetPath.lblSelectedValue.text = lblText;
    }
    self.view.forceLayout();
  },

  mapping: function (data) {
    return {
      "lblId": data.place_id,
      "lblAddress": data.description,
      "lblPinIcon": "",
      "lat": "17.4947934",
      "long": "78.3996441"
    };
  },

  setSerchSegmentData: function (data) {
    var self = this;
    var finalData;
    if (data.predictions) {
      finalData = data.predictions.map(self.mapping);
      var dataMap = {
        lblAddress: "lblAddress",
        lblPinIcon: "lblPinIcon"
      };
      this.view.segSearch.widgetDataMap = dataMap;
      this.view.segSearch.setData(finalData);
    }
  },

  getGoogleSuggestion: function (text) {
    var self = this;

    function onSuccess(response) {
      self.view.segSearch.setVisibility(true);
      self.setSerchSegmentData(response);
      self.view.forceLayout();
    }

    function onError(response) {
      kony.print("Error", response);
    }
    this.presenter.getAddressSuggestion(text, onSuccess, onError);
  },

  hideAddressSegments: function (typeHeadPath) {
    this.view.typeHeadCity.segSearchResult.setVisibility(false);
    this.view.typeHeadCountry.segSearchResult.setVisibility(false);
    this.view.typeHeadState.segSearchResult.setVisibility(false);
    if (typeHeadPath) {
      typeHeadPath.segSearchResult.setVisibility(true);
    }
    this.view.forceLayout();
  },
  /*
   * search on address fields while typing in textbox
   * @param: textbox path, sement path
   * @param: category ( 1-country, 2- state, 3-city)
   */
  searchForAddress: function (tbxPath, segPath, noResultFlex, category) {
    var self = this;
    var searchText = tbxPath.text;
    var sourceData = [],
      dataToAssign = [];
    if (category === 1) {
      sourceData = self.segCountry;
      dataToAssign = sourceData.filter(function (rec) {
        var name = (rec.lblAddress.text).toLowerCase();
        return (name.indexOf(searchText.toLowerCase()) > -1);
      });
    } else if (category === 2) {
      sourceData = self.segState;
      var country = self.view.typeHeadCountry.tbxSearchKey.info.data;
      dataToAssign = sourceData.filter(function (rec) {
        var name = (rec.lblAddress.text).toLowerCase();
        return ((name.indexOf(searchText.toLowerCase()) > -1) && (rec.Country_id === country.id));
      });

    } else if (category === 3) {
      sourceData = self.segLocationCity;
      var state = self.view.typeHeadState.tbxSearchKey.info.data;
      dataToAssign = sourceData.filter(function (rec) {
        var name = (rec.lblAddress.text).toLowerCase();
        return ((name.indexOf(searchText.toLowerCase()) > -1) && (rec.Region_id === state.id));
      });
    }
    if (searchText === "") dataToAssign = [];
    segPath.setData(dataToAssign);
    if (dataToAssign.length > 0) {
      segPath.setVisibility(true);
      noResultFlex.setVisibility(false);
      if (noResultFlex === this.view.typeHeadCountry.flxNoResultFound) {
        this.view.flxCountry.zIndex = 2;
      } else {
        this.view.flxCountry.zIndex = 1;
      }
    } else {
      segPath.setVisibility(false);
      noResultFlex.setVisibility(true);
      if (noResultFlex === this.view.typeHeadCountry.flxNoResultFound) {
        this.view.flxCountry.zIndex = 2;
      } else {
        this.view.flxCountry.zIndex = 1;
      }
    }
    self.view.forceLayout();
  },
  getAddressSegmentData: function () {
    var self = this;
    var callBack = function (response) {
      kony.print("listboxreponse", response);
      if (response !== "error") {
        self.segCountry = response.countries.reduce(
          function (list, country) {
            return list.concat([{
              "id": country.id,
              "lblAddress": {
                "text": country.Name,
                "left": "10dp"
              },
              "template": "flxSearchCompanyMap"
            }]);
          }, []);
        self.segState = response.regions.reduce(
          function (list, region) {
            return list.concat([{
              "id": region.id,
              "lblAddress": {
                "text": region.Name,
                "left": "10dp"
              },
              "Country_id": region.Country_id,
              "template": "flxSearchCompanyMap"
            }]);
          }, []);
        self.segLocationCity = response.cities.reduce(
          function (list, city) {
            return list.concat([{
              "id": city.id,
              "lblAddress": {
                "text": city.Name,
                "left": "10dp"
              },
              "Region_id": city.Region_id,
              "template": "flxSearchCompanyMap"
            }]);
          }, []);
      }
      /* if(self.action === self.actionConfig.edit){
         self.getAddressCodes([self.view.typeHeadCountry.tbxSearchKey.text,
                               self.view.typeHeadState.tbxSearchKey.text,
                               self.view.typeHeadCity.tbxSearchKey.text]);
       }*/
    self.setAddressSegmentData();
    self.setDataForCountries(response.countries, self.view.lstbxCountryUser);
    self.setDataForCountries(response.countries, self.view.lstbxTaxCountryUser);
    self.setDataForCountries(response.countries, self.view.typeHeadCountry);
    self.setCountriesData(response.countries, self.view.customListbox);
    self.setCountriesData(response.countries, self.view.customListbox1);
    };
    this.presenter.fetchLocationPrefillData(callBack);
  },
  setAddressSegmentData: function () {
    var widgetMap = {
      "flxSearchCompanyMap": "flxSearchCompanyMap",
      "lblAddress": "lblAddress",
      "id": "id",
      "Region_id": "Region_id",
      "Country_id": "Country_id"
    };
    this.view.typeHeadCountry.segSearchResult.widgetDataMap = widgetMap;
    this.view.typeHeadCity.segSearchResult.widgetDataMap = widgetMap;
    this.view.typeHeadState.segSearchResult.widgetDataMap = widgetMap;
    this.view.typeHeadCountry.segSearchResult.setData(this.segCountry);
    this.view.typeHeadCity.segSearchResult.setData(this.segLocationCity);
    this.view.typeHeadState.segSearchResult.setData(this.segState);
  },
  clearValidation: function (widget, errorFlex, type) {
    if (type === 1)
      widget.skin = "skntxtbxDetails0bbf1235271384a";
    else if (type === 2)
      widget.skin = "sknlstbxNormal0f9abd8e88aa64a";
    else if (type === 3)
      widget.skin = "sknflxEnterValueNormal";
    errorFlex.setVisibility(false);
  },
  mappingRowToWidgets: function () {
    var self = this;
    var data = this.view.segSearch.data;
    var index = this.view.segSearch.selectedRowIndex[1];
    var id = data[index].lblId;

    function onSuccess(response) {
      self.fillingData(response, data[index]);
    }

    function onError(response) {
      kony.print("Error", response);
    }
    this.presenter.getPlaceDetails(id, onSuccess, onError);

  },
  fillingData: function (response, rowData) {
    this.clearAllAddressFields();
    var self = this;
    if (response.result) {
      var finalresponse = response.result;
      self.view.tbxSearch.text = "";
      self.view.segSearch.setVisibility(false);
      var pin = {
        id: rowData.lblId,
        lat: finalresponse[0].latitude,
        lon: finalresponse[0].longitude,
        name: "",
        image: "pinb.png",
        focusImage: "pinb.png",
        desc: "",
        showCallout: false
      };
      var locationData = {
        lat: finalresponse[0].latitude,
        lon: finalresponse[0].longitude,
      };
      self.view.typeHeadState.tbxSearchKey.setEnabled(true);
      self.view.typeHeadCity.tbxSearchKey.setEnabled(true);
      self.view.map1.mapLocations.addPin(pin);
      self.view.map1.mapLocations.navigateToLocation(locationData, false, true);
      self.view.tbxStreetName.text = finalresponse[0].address_components[0].long_name;
      self.view.tbxBuildingName.text = finalresponse[0].address_components[1].long_name;
      for (var i = 0; i < finalresponse[0].address_components.length; i++) {
        if (finalresponse[0].address_components[i].types.search("postal_code") !== -1) {
          self.view.tbxZipCode.text = finalresponse[0].address_components[i].long_name;
        } else if (finalresponse[0].address_components[i].types.search("country") !== -1) {
          if (self.checkAvailabilty(finalresponse[0].address_components[i].long_name, self.view.typeHeadCountry.segSearchResult.data)) {
            self.view.typeHeadCountry.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            self.view.typeHeadCountry.tbxSearchKey.info.isValid = true;
          } else {
            self.view.flxNoCountry.setVisibility(true);
            self.view.lblNoCountryError.text = "invalid country";
            self.view.forceLayout();
          }
        } else if (finalresponse[0].address_components[i].types.search("locality") !== -1) {
          if (self.checkAvailabilty(finalresponse[0].address_components[i].long_name, self.view.typeHeadCity.segSearchResult.data)) {
            self.view.typeHeadCity.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            self.view.typeHeadCity.tbxSearchKey.info.isValid = true;
          } else {
            self.view.flxNoCity.setVisibility(true);
            self.view.lblNoCityError.text = "invalid city";
            self.view.forceLayout();
          }
        } else if (finalresponse[0].address_components[i].types.search("administrative_area_level_1") !== -1) {
          if (self.checkAvailabilty(finalresponse[0].address_components[i].long_name, self.view.typeHeadState.segSearchResult.data)) {
            self.view.typeHeadState.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            self.view.typeHeadState.tbxSearchKey.info.isValid = true;
          } else {
            self.view.flxNoState.setVisibility(true);
            self.view.lblNoStateError.text = "invalid state";
            self.view.forceLayout();
          }
        }
      }
      self.getAddressCodes([self.view.typeHeadCountry.tbxSearchKey.text,
        self.view.typeHeadState.tbxSearchKey.text,
        self.view.typeHeadCity.tbxSearchKey.text
      ]);
    }
  },
  clearAllAddressFields: function () {
    this.view.tbxStreetName.text = "";
    this.view.tbxBuildingName.text = "";
    this.view.typeHeadCountry.tbxSearchKey.text = "";
    this.view.typeHeadCountry.tbxSearchKey.info.isValid = false;
    this.view.tbxZipCode.text = "";
    this.view.typeHeadCity.tbxSearchKey.text = "";
    this.view.typeHeadCity.tbxSearchKey.info.isValid = false;
    this.view.typeHeadState.tbxSearchKey.text = "";
    this.view.typeHeadState.tbxSearchKey.info.isValid = false;
    this.clearValidation(this.view.tbxStreetName, this.view.flxNoStreetName, 1);
    this.clearValidation(this.view.typeHeadCountry.tbxSearchKey, this.view.flxNoCountry, 1);
    this.clearValidation(this.view.tbxZipCode, this.view.flxNoZipCode, 1);
    this.clearValidation(this.view.typeHeadCity.tbxSearchKey, this.view.flxNoCity, 1);
    this.clearValidation(this.view.typeHeadState.tbxSearchKey, this.view.flxNoState, 1);
  },
  assingText: function (segment, textBox) {
    var selectedRow = segment.data[segment.selectedRowIndex[1]];
    textBox.text = selectedRow.lblAddress.text;
    textBox.info.isValid = true;
    textBox.info.data = selectedRow;
    segment.setVisibility(false);
    this.view.flxCountry.zIndex = 1;
    this.view.forceLayout();
  },
  checkAvailabilty: function (key, list) {
    for (var i = 0; i < list.length; i++) {
      if ((list[i].lblAddress.text).toLowerCase().indexOf(key.toLowerCase()))
        return true;
    }
    return false;
  },
  getAddressCodes: function (name) {
    var self = this;
    var country = self.segCountry;
    var r1 = country.filter(function (rec) {
      if (rec.lblAddress.text.indexOf(name[0]) >= 0) {
        return rec;
      }
    });
    self.view.typeHeadCountry.tbxSearchKey.info.data = r1[0] || {};
    //state
    var state = self.segState;
    var r2 = state.filter(function (rec) {
      if (rec.lblAddress.text.indexOf(name[1]) >= 0) {
        return rec;
      }
    });
    self.view.typeHeadState.tbxSearchKey.info.data = r2[0] || {};
    //city
    self.view.typeHeadCity.tbxSearchKey.info.data = {};
  },
  clearCitizenshipPopupData: function () {
    this.view.lstbxCountryUser.setEnabled(true);
    this.view.lstbxCountryUser.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    this.view.imgRadio1.src = "radio_selected.png";
    this.view.imgRadio2.src = "radio_notselected.png";
    this.view.imgResidentRadio1.src = "radio_selected.png";
    this.view.imgResidentRadio2.src = "radio_notselected.png";
    this.view.imgYesStayRadio.src = "radio_selected.png";
    this.view.imgNoStayRadio.src = "radio_notselected.png";
    this.view.flxEndDateCitizenship.isVisible = false;
    this.view.flxEndDateResidency.isVisible = false;
    this.view.flxCitizenshipQuestions.isVisible = false;
    this.view.btnDuePopUpSaveAndAdd.isVisible = true;
    this.view.btnDuePopUpSave.text = "SAVE"
  },
  clearTaxPopupData: function () {
    this.view.lstbxTaxCountryUser.setEnabled(true);
    this.view.lstbxTaxCountryUser.selectedKey = kony.i18n.getLocalizedString("i18n.frmLogsController.Select");
    this.view.txtbxTaxIdNum.text = "";
    this.view.flxTaxIdNum.isVisible = false;
    this.view.btnTaxPopUpSaveAndAdd.isVisible = true;
    this.view.btnTaxPopUpSave.text = "SAVE";
  },
  editCitizenshipData: function () {
    var self = this;
    var index = this.view.segListing.selectedIndex;
    this.rowIndex = index[1];
    var rowData = this.view.segListing.selectedRowItems[0];
    var name = rowData.lblCountry;
    var id = self.getCountryCodes(name);
    this.addItemToListBox(id, name, this.view.lstbxCountryUser);
    this.view.lstbxCountryUser.selectedKey = self.getCountryCodes(name);
    this.view.lstbxCountryUser.setEnabled(false);
    this.EditedCountryToBeRemoved = id;
    rowData.lblCitizenship == "Yes" ? this.selectRadioYesOrNo(this.view.imgRadio1) : this.selectRadioYesOrNo(this.view.imgRadio2);
    rowData.lblResidency == "Yes" ? this.selectResident(this.view.imgResidentRadio1) : this.selectResident(this.view.imgResidentRadio2);
    rowData.lblStatutoryPeriod == "Yes" ? this.selectStatutoryPeriod(this.view.imgYesStayRadio) : this.selectStatutoryPeriod(this.view.imgNoStayRadio);
    this.isCitizenshipEdited = true;
    this.view.flxCitizenshipQuestions.isVisible = true;
    this.view.btnDuePopUpSaveAndAdd.isVisible = false;
    this.view.btnDuePopUpSave.text = "UPDATE & CLOSE"
    this.view.flxAddCitizenshipDetailsPopup.setVisibility(true);
  },
  editTaxData: function () {
    var index = this.view.segTaxListing.selectedIndex;
    this.rowIndex = index[1];
    var rowData = this.view.segTaxListing.selectedRowItems[0];
    var name = rowData.lblCountry;
    var id = this.getCountryCodes(name);
    this.addItemToListBox(id, name, this.view.lstbxTaxCountryUser);
    this.view.lstbxTaxCountryUser.selectedKey = this.getCountryCodes(name);
    this.view.lstbxTaxCountryUser.setEnabled(false);
    this.view.flxTaxIdNum.isVisible = true;
    this.EditedCountryToBeRemoved = id;
    this.view.txtbxTaxIdNum.text = rowData.lblResidency;
    this.isTaxEdited = true;
    this.taxReference = rowData.lblTaxReference;
    this.view.btnTaxPopUpSaveAndAdd.isVisible = false;
    this.view.btnTaxPopUpSave.text = "UPDATE & CLOSE";
    this.view.flxAddTaxDetailsPopup.setVisibility(true);
  },
  	getCountryCodes: function(name) {
        var country = this.segCountry;
        var data = this.view.lstbxCountryUser.masterData;
        var countryCode;
        for(var i=0;i<country.length;i++)
            {
                if(country[i].lblAddress.text===name)                  
                {
                    countryCode = country[i].id;               
                    return countryCode;
                    break;
            }
            }    
    },
  showOrHideDataPoints: function (rec) {
    for (var i = 0; i < rec.length; i++) {
      if (rec[i].configurationKey == "CITIZENSHIP") {
        this.view.verticalTabs.flxOption1.setVisibility(rec[i].configurationValue == "SHOW");
      } else if (rec[i].configurationKey == "EMPLOYMENT") {
        this.view.verticalTabs.flxOption4.setVisibility(rec[i].configurationValue == "SHOW");
      } else if (rec[i].configurationKey == "ACCOUNTUSAGE") {
        this.view.verticalTabs.flxOption3.setVisibility(rec[i].configurationValue == "SHOW");
      }
    }
    this.view.forceLayout();
    this.hideRightDetails();
  },
  hideRightDetails: function () {
    if (this.view.verticalTabs.flxOption1.isVisible == false) {
      if (this.view.verticalTabs.flxOption4.isVisible == true) {
        this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption4);
        this.getEmploymentDetails();
        this.view.forceLayout();
      } else {
        this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption3);
        this.addEmploymentDetails(this.view.verticalTabs.btnSubOption31);
      }
    } else if (this.view.verticalTabs.flxOption1.isVisible == true) {
      this.getCitizenshipAndTaxDetails();
    }
  },
  onHoverEventCallback: function (widget, context) {
    if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
      widget.setVisibility(true);
    } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
      widget.setVisibility(false);
    }
    this.setOptionsVisibility(widget.id);
  },

  getCurrentDate: function () {
    var date = new Date();
    return this.getDateFormatYYYYMMDD(date);
  },
  getSendPaymentsPayload: function () {
    var countriesList = this.view.customListbox.segList.selectedRowItems;
    var list = "";
    for (var i = 0; i < countriesList.length; i++) {
      list = list + "," + countriesList[i]["id"];
    }
    var payments = {
      "id": this.customerId,
      "productNature": "Accounts",
      "transactionType": "InternationalPayments",
      "source": "SendPayments",
      "sourceDate": this.getCurrentDate(),
      "intendedTransactionCountry": list.substring(1).trim(),
      "estimatedVolumeCurrency": "",
      "estimatedVolume": this.view.txtbxExpectedAmount.text,
      "estimatedTransactionNumber": this.view.txtbxExpectedPayments.text,
      "frequency": "Monthly",
      "comments": this.view.txtReason.text,
    }
    return payments;
  },
  getReceivePaymentsPayload: function () {
    var countriesList = this.view.customListbox1.segList.selectedRowItems;
    var list = "";
    for (var i = 0; i < countriesList.length; i++) {
      list = list + "," + countriesList[i]["id"];
    }
    var payments = {
      "id": this.customerId,
      "productNature": "Accounts",
      "transactionType": "InternationalPayments",
      "source": "ReceivePayments",
      "sourceDate": this.getCurrentDate(),
      "intendedTransactionCountry": list.substring(1).trim(),
      "estimatedVolumeCurrency": "",
      "estimatedVolume": this.view.txtbxExpectedReceivedAmount.text,
      "estimatedTransactionNumber": this.view.txtbxExpectedReceivePayments.text,
      "frequency": "Monthly",
      "comments": this.view.txtReasonReceivePayment.text,
    }
    return payments;
  },
  createOrUpdateAccountUsage: function (type) {
    var self = this;
    if (type == "SendPayments") {
      if (self.prevSelectedIndices.length > 0) {
        self.pushDataToPrevSelectedIndices(self.view.customListbox);
        self.view.customListbox.segList.setData(this.customListboxdata);
        this.setMultiSelectedCountries(self.view.customListbox, this.customListboxdata, this.prevSelectedIndices);
        self.prevSelectedIndices = [];
      }
      var valid = self.validateSendAccountUsage();
      if (valid == true) {
        if (this.sendPayDataUpdated == true) {
          self.updateAccountUsage(type);
        } else
          self.createAccountUsage(type);
      }
    } else {
      if (self.prevSelectedIndices.length > 0) {
        self.pushDataToPrevSelectedIndices(self.view.customListbox1);
        self.view.customListbox1.segList.setData(this.customListboxdata);
        this.setMultiSelectedCountries(self.view.customListbox1, this.customListboxdata, this.prevSelectedIndices);
        self.prevSelectedIndices = [];
      }
      var valid = self.validateReceiveAccountUsage();
      if (valid == true) {
        if (this.receivePayDataUpdated == true) {
          self.updateAccountUsage(type);
        } else
          self.createAccountUsage(type);
      }
    }
  },
  createAccountUsage: function (type) {
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    if (type == "SendPayments") {
      var payments = this.getSendPaymentsPayload();
      self.view.flxSendPaymentsDetailsPopup.setVisibility(false);
    } else {
      var payments = this.getReceivePaymentsPayload();
      self.view.flxReceivePaymentsDetailsPopup.setVisibility(false);
    }

    function onSuccess(response) {
      if (response.status === "Success") {
        self.getAccountUsage(type);
        self.view.toastMessage.showToastMessage("Account Usage Details Added Successfully", self);
      }
    }

    function onError(response) {
      kony.adminConsole.utils.hideProgressBar(self.view);
      self.view.toastMessage.showErrorToastMessage("Failed to create AccountUsage Details", self);
    }
    this.presenter.createAccountUsage(payments, onSuccess, onError);
  },
  updateAccountUsage: function (type) {
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    if (type == "SendPayments") {
      var payments = this.getSendPaymentsPayload();
      payments.intentionsReference = self.sendPayReference;
      self.view.flxSendPaymentsDetailsPopup.setVisibility(false);
    } else {
      var payments = this.getReceivePaymentsPayload();
      payments.intentionsReference = self.receivePayReference;
      self.view.flxReceivePaymentsDetailsPopup.setVisibility(false);
    }

    function onSuccess(response) {
      if (response.status === "Success") {
        self.getAccountUsage(type);
        self.view.toastMessage.showToastMessage("Account Usage Details Updated Successfully", self);
      }
    }

    function onError(reponse) {
      kony.adminConsole.utils.hideProgressBar(self.view);
      self.view.toastMessage.showErrorToastMessage("Failed to update AccountUsage Details", self);
    }
    this.presenter.updateAccountUsage(payments, onSuccess, onError);
  },
  getAccountUsage: function (key) {
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    var data = {
      "id": this.customerId
    };

    function onSuccess(response) {
      if (response["intentions"] && response["intentions"].length > 0) {
        if (key == "SendPayments") {
          var response = response["intentions"][0].source == "SendPayments" ? response["intentions"][0] : response["intentions"][1];
          if (response != null) {
            self.editSendAccountData = response;
            self.saveSendPaymentDetails(response);
          } else
            self.addEmploymentDetails(self.view.verticalTabs.btnSubOption31);
        } else {
          var response = response["intentions"][0].source == "ReceivePayments" ? response["intentions"][0] : response["intentions"][1];
          if (response != null) {
            self.editReceiveAccountData = response;
            self.saveReceivePaymentDetails(response);
          } else
            self.addEmploymentDetails(self.view.verticalTabs.btnSubOption32);
        }
      } else {
        if (key == "SendPayments")
          self.addEmploymentDetails(self.view.verticalTabs.btnSubOption31);
        else {
          self.addEmploymentDetails(self.view.verticalTabs.btnSubOption32);
        }
      }
      kony.adminConsole.utils.hideProgressBar(self.view);
    }

    function onError(reponse) {
      kony.adminConsole.utils.hideProgressBar(self.view);
      self.view.toastMessage.showErrorToastMessage("Failed to fetch AccountUsage Details", self);
    }
    this.presenter.getAccountUsage(data, onSuccess, onError);
  },

  getTaxPayload: function () {
    return [{
      "CountryCode": this.view.lstbxTaxCountryUser.selectedKeyValue[0],
      "Taxid": this.view.txtbxTaxIdNum.text
    }];
  },
  createTaxDetails: function () {
    var self = this;
    var payload = {};
    payload.id = this.customerId,
    payload.taxDetails = this.getTaxPayload();
    payload.legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
    kony.adminConsole.utils.showProgressBar(this.view);

    function onSuccess(response) {
      if (response.success === "success") {
        self.getCitizenshipAndTaxDetails("Tax");
      }
    }

    function onError(reponse) {
      kony.adminConsole.utils.hideProgressBar(this.view);
      self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.createTaxError"), self);
    }
    this.presenter.createTaxDetails(payload, onSuccess, onError);
  },
  updateTaxDetails: function () {
    var self = this;
    var payload = {};
    payload.id = this.customerId,
      payload.taxDetails = this.getTaxPayload();
    payload.taxDetails[0].taxReference = this.taxReference;
    kony.adminConsole.utils.showProgressBar(this.view);

    function onSuccess(response) {
      if (response.success === "success") {
        self.getCitizenshipAndTaxDetails("Tax");
      }
    }

    function onError(reponse) {
      kony.adminConsole.utils.hideProgressBar(this.view);
      self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.updateTaxError"), self);
    }
    this.presenter.updateTaxDetails(payload, onSuccess, onError);
  },
  getCitizenshipAndTaxDetails: function (entity) {
    var self = this;
    kony.adminConsole.utils.showProgressBar(self.view);
    var payload = {};
    payload.id = this.customerId;

    function onSuccess(response) {
      if (entity == "Citizenship") {
        if ((JSON.parse(response.rawResponse).citizenships && JSON.parse(response.rawResponse).citizenships.length > 0) || (JSON.parse(response.rawResponse).residences && JSON.parse(response.rawResponse).residences.length > 0)) {
          self.constructResultJSON(response, entity);
        }
      } else if (entity == "Tax") {
        if (JSON.parse(response.rawResponse).taxDetails) {
          self.setDataToTaxSeg(JSON.parse(response.rawResponse).taxDetails, entity);
        }
      } else {
        if ((JSON.parse(response.rawResponse).citizenships && JSON.parse(response.rawResponse).citizenships.length > 0) || (JSON.parse(response.rawResponse).residences && JSON.parse(response.rawResponse).residences.length > 0)) {
          self.constructResultJSON(response, entity);
        }
        if (JSON.parse(response.rawResponse).taxDetails && JSON.parse(response.rawResponse).taxDetails.length > 0) {
          self.setDataToTaxSeg(JSON.parse(response.rawResponse).taxDetails, entity);
        }
      }
      kony.adminConsole.utils.hideProgressBar(this.view);
    }

    function onError(response) {
      kony.adminConsole.utils.hideProgressBar(self.view);
      self.showCitizenshipAndTax();
      self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.fetchCitizen&TaxDetailsError"), self);
    }
    this.presenter.getDueDiligenceDetails(payload, onSuccess, onError);
  },
  getCitizenshipPayload: function () {
    return [{
      "CountryCode": this.view.lstbxCountryUser.selectedKeyValue[0],
      "endDate": this.view.customEndDateCitizenship.value != "" ? this.getDateFormatYYYYMMDD(this.view.customEndDateCitizenship.value) : ""
    }];
  },
  getResidencePayload: function () {
    return [{
      "CountryCode": this.view.lstbxCountryUser.selectedKeyValue[0],
      "statutoryRequirementMet": this.view.imgYesStayRadio.src == "radio_selected.png" ? true : false,
      "endDate": this.view.customEndDateResidency.value != "" ? this.getDateFormatYYYYMMDD(this.view.customEndDateResidency.value) : ""
    }];
  },
  createCitizenshipDetails: function () {
    var self = this;
    self.view.flxAddCitizenshipDetailsPopup.setVisibility(false);
    kony.adminConsole.utils.showProgressBar(self.view);
    var isCitizen = self.view.imgRadio1.src == "radio_selected.png" ? "Yes" : "No";
    var isResident = self.view.imgResidentRadio1.src == "radio_selected.png" ? "Yes" : "No";
    var payload = {};
    payload.id = self.customerId;
    payload.legalEntityId = self.presenter.getCurrentCustomerDetails().legalEntityId || self.presenter.custSearchLEId;
    if (isCitizen == "Yes" || self.view.customEndDateCitizenship.value != ""){
		var temp = self.getCitizenshipPayload();
		if(temp[0].endDate=="")
			delete temp[0].endDate;
		payload["citizenships"] = temp;
	}
    if (isResident == "Yes" || self.view.customEndDateResidency.value != ""){
		var temp = self.getCitizenshipPayload();
		if(temp[0].endDate=="")
			delete temp[0].endDate;
		payload["residences"] = temp;
	}

    function onSuccess(response) {
      if (response.success === "success") {
        self.getCitizenshipAndTaxDetails("Citizenship");
      }
    }

    function onError(reponse) {
      kony.adminConsole.utils.hideProgressBar(self.view);
      self.view.toastMessage.showErrorToastMessage(kony.i18n.getLocalizedString("kony.customers.dueDiligence.createCitizenshipError"), self);
    }
    self.presenter.updateCitizenshipDetails(payload, onSuccess, onError);
  },

  getCountryName: function (id) {
    var country = this.segCountry;
    var data = this.view.lstbxCountryUser.masterData;
    var countryName;
    for(var i=0;i<country.length;i++)
    {
      if(country[i].id===id)
      {
        countryName = country[i].lblAddress.text;
        return countryName;
        break;
      }
    }
  },
  constructResultJSON: function (response, entity) {
    var countryJSON = {};
    for (var i = 0; i < JSON.parse(response.rawResponse).citizenships.length; i++) {
      var countryName = this.getCountryName(JSON.parse(response.rawResponse).citizenships[i].countryOfCitizenship);
      countryJSON[countryName] = {};
      countryJSON[countryName].isCitizen = JSON.parse(response.rawResponse).citizenships[i].endDate ? "No" : "Yes";
      countryJSON[countryName].isResident = "No";
      countryJSON[countryName].isStatutoryReq = "No";
    }
    for (var i = 0; i < JSON.parse(response.rawResponse).residences.length; i++) {
      var countryName = this.getCountryName(JSON.parse(response.rawResponse).residences[i].country);
      if (countryJSON[countryName] != null) {
        countryJSON[countryName].isResident = JSON.parse(response.rawResponse).residences[i].endDate ? "No" : "Yes";
        countryJSON[countryName].isStatutoryReq = JSON.parse(response.rawResponse).residences[i].statutoryRequirementMet == true ? "Yes" : "No";
      } else {
        countryJSON[countryName] = {};
        countryJSON[countryName].isCitizen = "No";
        countryJSON[countryName].isResident = JSON.parse(response.rawResponse).residences[i].endDate ? "No" : "Yes";
        countryJSON[countryName].isStatutoryReq = JSON.parse(response.rawResponse).residences[i].statutoryRequirementMet == true ? "Yes" : "No";
      }
    }
    this.setDataToCitizenshipSeg(countryJSON, entity);
    var data = this.view.lstbxCountryUser.masterData;
    var res;
    for (var key in countryJSON) {
      data = data.filter(function (rec) {
        return rec[1] != key;
      });
    }
    this.view.lstbxCountryUser.masterData = data;
  },
  showCitizenshipAndTax: function () {
    var scopeObj = this;
    scopeObj.view.flxEmploymentRightDetails.setVisibility(false);
    scopeObj.view.flxAccountUsageDetails.setVisibility(false);
    scopeObj.view.flxDueDiligenceRightDetails.setVisibility(true);
    scopeObj.view.verticalTabs.setSelectedOptionButtonStyle(scopeObj.view.verticalTabs.btnOption1);
    scopeObj.view.verticalTabs.showSelectedOptionImage(scopeObj.view.verticalTabs.lblSelected1);
    scopeObj.view.flxAlertsSegment.setVisibility(false);
    scopeObj.view.flxTaxSegment.setVisibility(false);
    scopeObj.view.forceLayout();
  },
  addItemToListBox: function (id, name, widgetRef) {
    var data = widgetRef.masterData;
    var newData = [id, name];
    data.push(newData);
    widgetRef.masterData = data;
  },
  removeItemFromListBox: function (widgetRef, id) {
    var data = widgetRef.masterData;
    data = data.filter(function (rec) {
      return rec[0] != id;
    });
    widgetRef.masterData = data;
    this.EditedCountryToBeRemoved = "";
  },
  removeDataFromListBox: function (widgetRef, response) {
    var data = widgetRef.masterData;
    for (var i = 0; i < response.length; i++) {
      data = data.filter(function (rec) {
        return rec[0] != response[i].country;
      });
    }
    widgetRef.masterData = data;
  },
  validateCitizenshipDetails: function () {
    var isValid = true;
    if (this.view.lstbxCountryUser.selectedKey === "Select") {
      this.view.lstbxCountryUser.skin = "redListBxSkin";
      this.view.flxNoCountryError.setVisibility(true);
      isValid = false;
    } else {
      this.view.lstbxCountryUser.skin = "sknlstbxNormal0f9abd8e88aa64a";
      this.view.flxNoCountryError.setVisibility(false);
    }
    if (this.view.flxEndDateCitizenship.isVisible == true && this.view.customEndDateCitizenship.value == "") {
      this.view.CitizenshipEndDateError.setVisibility(true);
      isValid = false;
    } else {
      this.view.CitizenshipEndDateError.setVisibility(false);
    }
    if (this.view.flxEndDateResidency.isVisible == true && this.view.customEndDateResidency.value == "") {
      this.view.ResidencyEndDateError.setVisibility(true);
      isValid = false;
    } else {
      this.view.ResidencyEndDateError.setVisibility(false);
    }
    return isValid;
  },
  validateTaxDetails: function () {
    var isValid = true;
    if (this.view.lstbxTaxCountryUser.selectedKey === "Select") {
      this.view.lstbxTaxCountryUser.skin = "redListBxSkin";
      this.view.flxTaxCountryError.setVisibility(true);
      isValid = false;
    } else {
      this.view.lstbxTaxCountryUser.skin = "sknlstbxNormal0f9abd8e88aa64a";
      this.view.flxTaxCountryError.setVisibility(false);
    }
    if (this.view.flxTaxIdNum.isVisible == true && this.view.txtbxTaxIdNum.text == "") {
      this.view.flxNoCityError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxNoCityError.setVisibility(false);
    }
    return isValid;
  },

  getEmploymentDetails: function () {
    kony.adminConsole.utils.showProgressBar(this.view);
    var employmentDetails = {};
    employmentDetails.id = this.customerId;
    employmentDetails.partyID = this.partyID ? this.partyID : "";

    function onSuccess(response) {
      this.view.verticalTabs.setSelectedOptionButtonStyle(this.view.verticalTabs.btnOption4);
      this.employmentAddress = JSON.parse(response.rawResponse).addresses;
      if ((JSON.parse(response.rawResponse).employments == null) && (JSON.parse(response.rawResponse).occupations == null)) {
        this.employeeDataUpdated = false;
        this.addEmploymentDetails(this.view.verticalTabs.btnOption4);
      } else {
        this.editEmploymentData = JSON.parse(response.rawResponse);
        this.saveAndShowEmployeeDetails(response);
      }
      kony.adminConsole.utils.hideProgressBar(this.view);
    }

    function onError(reponse) {
      kony.adminConsole.utils.hideProgressBar(this.view);
      this.view.toastMessage.showErrorToastMessage("Failed to fetch Employment Details", this);
    }
    this.presenter.getEmploymentdetails(employmentDetails, onSuccess.bind(this), onError.bind(this));
  },

  getEmploymentPayload: function (employmentType) {
    var finalEmploymentDetails = {};
    var employmentDetailsArray = [];
    var employmentDetails = {};
    var occupationDetailsArray = [];
    var occupationDetails = {};
    var addressDetailsArray = [];
    var addressDetails = {};
    if (this.view.imgcbEmploymenyBussinessAddress.src == "checkboxselected.png") {
      addressDetails = this.getResidentialAddress(this.employmentAddress) ? this.getResidentialAddress(this.employmentAddress) : {};
    } else {
      addressDetails = this.getBusinessAddress(this.employmentAddress) ? this.getBusinessAddress(this.employmentAddress) : {};
    }
    finalEmploymentDetails.id = this.customerId;
    finalEmploymentDetails.partyID = this.partyID ? this.partyID : "";
    if (employmentType == "Employee") {
      employmentDetails.employmentReference = this.employmentReference;
      employmentDetails.EmploymentTypeId = this.view.lstBoxEmpStatus.selectedKeyValue[1];
      employmentDetails.jobTitle = this.view.lstBoxEmploymentRole.selectedKeyValue[1];
      occupationDetails.occupationType = this.view.lstBoxOccupation.selectedKeyValue[1];
      employmentDetails.StartDate = this.view.customStartDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customStartDate.value.trim(), "-") : "";
      employmentDetails.endDate = this.view.customEndDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customEndDate.value.trim(), "-") : "";
      employmentDetails.employerName = this.view.txtbxEmployerName.text;
      employmentDetails.employerSegment = this.view.lstBoxBusinessCategory.selectedKeyValue[1] + "$_$" + this.view.lstbxBusinessDescription.selectedKeyValue[1];
      employmentDetails.primaryEmployment = true;
      employmentDetails.detailedDescription = this.view.tbxDetailedDesc.text;
      addressDetails.communicationNature = (addressDetails && addressDetails.communicationNature) ? addressDetails.communicationNature : "Physical";
      addressDetails.communicationType = (addressDetails && addressDetails.communicationType) ? addressDetails.communicationType : "MailingAddress";
      addressDetails.CountryCode = this.view.typeHeadCountry.tbxSearchKey.text;
      addressDetails.streetName = this.view.tbxStreetName.text;
      addressDetails.buildingName = this.view.tbxBuildingName.text;
      addressDetails.postalOrZipCode = this.view.tbxZipCode.text;
      addressDetails.usePurpose = this.employmentReference;
      addressDetails.regionCode = this.view.typeHeadState.tbxSearchKey.text;
      addressDetails.district = this.view.typeHeadCity.tbxSearchKey.text;
      addressDetails.addresstype = (addressDetails && addressDetails.addressType) ? addressDetails.addressType : "Office";
      addressDetails.addressesReference = addressDetails.addressesReference;
      employmentDetailsArray.push(employmentDetails);
      finalEmploymentDetails.employments = employmentDetailsArray;
      occupationDetailsArray.push(occupationDetails);
      finalEmploymentDetails.occupations = occupationDetailsArray;
      addressDetailsArray = this.getCompleteAddressPayload(addressDetails);
      finalEmploymentDetails.addresses = addressDetailsArray;
    } else if (employmentType == "Self-Employed") {
      employmentDetails.employmentReference = this.employmentReference;
      employmentDetails.EmploymentTypeId = this.view.lstBoxEmpStatus.selectedKeyValue[1];
      employmentDetails.jobTitle = this.view.lstBoxEmploymentRole.selectedKeyValue[1];
      occupationDetails.occupationType = this.view.lstBoxOccupation.selectedKeyValue[1];
      employmentDetails.StartDate = this.view.customStartDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customStartDate.value.trim(), "-") : "";
      employmentDetails.endDate = this.view.customEndDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customEndDate.value.trim(), "-") : "";
      employmentDetails.primaryEmployment = true;
      addressDetails.communicationNature = (addressDetails && addressDetails.communicationNature) ? addressDetails.communicationNature : "Physical";
      addressDetails.communicationType = (addressDetails && addressDetails.communicationType) ? addressDetails.communicationType : "MailingAddress";
      addressDetails.CountryCode = this.view.typeHeadCountry.tbxSearchKey.text;
      addressDetails.streetName = this.view.tbxStreetName.text;
      addressDetails.buildingName = this.view.tbxBuildingName.text;
      addressDetails.postalOrZipCode = this.view.tbxZipCode.text;
      addressDetails.usePurpose = this.employmentReference;
      addressDetails.regionCode = this.view.typeHeadState.tbxSearchKey.text;
      addressDetails.district = this.view.typeHeadCity.tbxSearchKey.text;
      addressDetails.addresstype = (addressDetails && addressDetails.addressType) ? addressDetails.addressType : "Office";
      addressDetails.addressesReference = addressDetails.addressesReference;
      employmentDetailsArray.push(employmentDetails);
      finalEmploymentDetails.employments = employmentDetailsArray;
      occupationDetailsArray.push(occupationDetails);
      finalEmploymentDetails.occupations = occupationDetailsArray;
      addressDetailsArray = this.getCompleteAddressPayload(addressDetails);
      finalEmploymentDetails.addresses = addressDetailsArray;
    } else if (employmentType == "Un-Employed") {
      employmentDetails.employmentReference = this.employmentReference;
      employmentDetails.EmploymentTypeId = this.view.lstbxUnemployStatus.selectedKeyValue[1];
      employmentDetails.StartDate = this.view.customEmployStartDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customEmployStartDate.value.trim(), "-") : "";
      employmentDetails.endDate = this.view.customEmployEndDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customEmployEndDate.value.trim(), "-") : "";
      employmentDetails.primaryEmployment = true;
      employmentDetails.securityBenefits = this.view.imgYesBenefitsRadio.src == "radio_selected.png" ? true : this.view.imgNoBenefitsRadio.src == "radio_notselected.png" ? false : true;
      employmentDetailsArray.push(employmentDetails);
      finalEmploymentDetails.employments = employmentDetailsArray;
    } else if (employmentType == "Student") {
      employmentDetails.employmentReference = this.employmentReference;
      employmentDetails.primaryEmployment = true;
      employmentDetails.EmploymentTypeId = this.view.lstbxUnemployStatus.selectedKeyValue[1];
      employmentDetails.StartDate = this.view.customEmployStartDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customEmployStartDate.value.trim(), "-") : "";
      employmentDetails.endDate = this.view.customEmployEndDate.value.trim() ? this.getDateFormatYYYYMMDD(this.view.customEmployEndDate.value.trim(), "-") : "";
      employmentDetailsArray.push(employmentDetails);
      finalEmploymentDetails.employments = employmentDetailsArray;
    }
    finalEmploymentDetails.legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
    return finalEmploymentDetails;
  },

  updateEmploymentDetails: function (type) {
    var employmentPayload = this.getEmploymentPayload(type);
    if (this.employmentDetailsValidation(employmentPayload, type)) {
      kony.adminConsole.utils.showProgressBar(this.view);

      function onSuccess(response) {
        if (response.success && response.success == "success") {
          this.getEmploymentDetails();
          this.view.toastMessage.showToastMessage("Employment Details Updated Successfully", this);
        }
      }

      function onError(reponse) {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage("Failed to update Employment Details", this);
      }
      this.presenter.updateEmploymentdetails(employmentPayload, onSuccess.bind(this), onError.bind(this));
    }
  },

  createEmploymentDetails: function (type) {
    var employmentPayload = this.getEmploymentPayload(type);
    
    if (this.employmentDetailsValidation(employmentPayload, type)) {
      kony.adminConsole.utils.showProgressBar(this.view);

      function onSuccess(response) {
        if (response.success && response.success == "success") {
          this.getEmploymentDetails();
          this.view.toastMessage.showToastMessage("Employment Details Added Successfully", this);
        }
      }

      function onError(reponse) {
        kony.adminConsole.utils.hideProgressBar(this.view);
        this.view.toastMessage.showErrorToastMessage("Failed to Create Employment Details", this);
      }
      this.presenter.createEmploymentdetails(employmentPayload, onSuccess.bind(this), onError.bind(this));
    }

  },

  CreateorUpdateEmploymentDetails: function () {
    if (this.employeeDataUpdated) {
      this.updateEmploymentDetails(this.employmentStatusSelected);
    } else {
      this.createEmploymentDetails(this.employmentStatusSelected);
    }
  },

  employmentDetailsValidation: function (finalEmploymentDetails, employmentType) {
    var addressObj = this.getBusinessAddress(finalEmploymentDetails.addresses);
    if (employmentType == "Employee") {
      if (finalEmploymentDetails.employments[0].EmploymentTypeId == "" || finalEmploymentDetails.employments[0].EmploymentTypeId == "Select Employment Status") {
        this.view.flxNoEmploymentStatusError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoEmploymentStatusError.setVisibility(false);
      }
      if (finalEmploymentDetails.employments[0].jobTitle == "" || finalEmploymentDetails.employments[0].jobTitle == "Select Employment Role") {
        this.view.flxNoEmploymentRoleError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoEmploymentRoleError.setVisibility(false);
      }
      if (finalEmploymentDetails.occupations[0].occupationType == "" || finalEmploymentDetails.occupations[0].occupationType == "Select Occupation Type") {
        this.view.flxNoOccupationError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoOccupationError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].StartDate) == "Invalid Date") {
        this.view.flxDateContainer.StartDateError.setVisibility(true);
        return false;
      } else {
        this.view.StartDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate) == "Invalid Date") {
        this.view.flxDateContainer.EndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateContainer.EndDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate)<=new Date(finalEmploymentDetails.employments[0].StartDate)) {
        this.view.EndDateError.lblErrorText.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDateLessThanStartDate");
        this.view.flxDateContainer.EndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateContainer.EndDateError.setVisibility(false);
      }
      if (finalEmploymentDetails.employments[0].employerName == "") {
        this.view.flxNoEmployerNameError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoEmployerNameError.setVisibility(false);
      }
      if (this.view.lstBoxBusinessCategory.selectedKeyValue[1] == "" || this.view.lstBoxBusinessCategory.selectedKeyValue[1] == "Select Business Categories") {
        this.view.flxNoBusinessCategoryError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoBusinessCategoryError.setVisibility(false);
      }
      if (this.view.lstbxBusinessDescription.selectedKeyValue[1] == "" || this.view.lstbxBusinessDescription.selectedKeyValue[1] == "Select Business Descriptions") {
        this.view.flxNoBusinessDetailedDescriptionError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoBusinessDetailedDescriptionError.setVisibility(false);
      }
      if (finalEmploymentDetails.employments[0].detailedDescription == "") {
        this.view.flxNoBusinessDetailedDescriptionError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoBusinessDetailedDescriptionError.setVisibility(false);
      }
      if (addressObj && addressObj.streetName == "") {
        this.view.flxNoStreetName.setVisibility(true);
        return false;
      } else {
        this.view.flxNoStreetName.setVisibility(false);
      }
      if (addressObj && addressObj.CountryCode == "") {
        this.view.flxNoCountry.setVisibility(true);
        return false;
      } else {
        this.view.flxNoCountry.setVisibility(false);
      }
      if (addressObj && addressObj.regionCode == "") {
        this.view.flxNoState.setVisibility(true);
        return false;
      } else {
        this.view.flxNoState.setVisibility(false);
      }
      if (addressObj && addressObj.district == "") {
        this.view.flxNoCity.setVisibility(true);
        return false;
      } else {
        this.view.flxNoCity.setVisibility(false);
      }
      if (addressObj && addressObj.postalOrZipCode == "") {
        this.view.flxNoZipCode.setVisibility(true);
        return false;
      } else {
        this.view.flxNoZipCode.setVisibility(false);
      }
    } else if (employmentType == "Self-Employed") {
      if (finalEmploymentDetails.employments[0].EmploymentTypeId == "" || finalEmploymentDetails.employments[0].EmploymentTypeId == "Select Employment Status") {
        this.view.flxNoEmploymentStatusError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoEmploymentStatusError.setVisibility(false);
      }
      if (finalEmploymentDetails.employments[0].jobTitle == "" || finalEmploymentDetails.employments[0].jobTitle == "Select Employment Role") {
        this.view.flxNoEmploymentRoleError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoEmploymentRoleError.setVisibility(false);
      }
      if (finalEmploymentDetails.occupations[0].occupationType == "" || finalEmploymentDetails.occupations[0].occupationType == "Select Occupation Type") {
        this.view.flxNoOccupationError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoOccupationError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].StartDate) == "Invalid Date") {
        this.view.flxDateContainer.StartDateError.setVisibility(true);
        return false;
      } else {
        this.view.StartDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate) == "Invalid Date") {
        this.view.flxDateContainer.EndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateContainer.EndDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate)<=new Date(finalEmploymentDetails.employments[0].StartDate)) {
        this.view.EndDateError.lblErrorText.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDateLessThanStartDate");
        this.view.flxDateContainer.EndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateContainer.EndDateError.setVisibility(false);
      }
      if (finalEmploymentDetails.employments[0].employerName == "") {
        this.view.flxNoEmployerNameError.setVisibility(true);
        return false;
      } else {
        this.view.flxNoEmployerNameError.setVisibility(false);
      }
      if (addressObj && addressObj.streetName == "") {
        this.view.flxNoStreetName.setVisibility(true);
        return false;
      } else {
        this.view.flxNoStreetName.setVisibility(false);
      }
      if (addressObj && addressObj.CountryCode == "") {
        this.view.flxNoCountry.setVisibility(true);
        return false;
      } else {
        this.view.flxNoCountry.setVisibility(false);
      }
      if (addressObj && addressObj.regionCode == "") {
        this.view.flxNoState.setVisibility(true);
        return false;
      } else {
        this.view.flxNoState.setVisibility(false);
      }
      if (addressObj && addressObj.district == "") {
        this.view.flxNoCity.setVisibility(true);
        return false;
      } else {
        this.view.flxNoCity.setVisibility(false);
      }
      if (addressObj && addressObj.postalOrZipCode == "") {
        this.view.flxNoZipCode.setVisibility(true);
        return false;
      } else {
        this.view.flxNoZipCode.setVisibility(false);
      }
    } else if (employmentType == "Un-Employed") {
      if (finalEmploymentDetails.employments[0].EmploymentTypeId == "" || finalEmploymentDetails.employments[0].EmploymentTypeId == "Select Employment Status") {
        this.view.flxUnemployStatusError.setVisibility(true);
        return false;
      } else {
        this.view.flxUnemployStatusError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].StartDate) == "Invalid Date") {
        this.view.flxDateWrapper.EmployStartDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateWrapper.EmployStartDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate) == "Invalid Date") {
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate)<=new Date(finalEmploymentDetails.employments[0].StartDate)) {
        this.view.EmployEndDateError.lblErrorText.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDateLessThanStartDate");
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(false);
      }
      if (this.view.imgYesBenefitsRadio.src === "radio_notselected.png" && this.view.imgNoBenefitsRadio.src === "radio_notselected.png") {
        this.view.flxSocialBenifitsError.setVisibility(true);
        return false;
      } else {
        this.view.flxSocialBenifitsError.setVisibility(false);
      }
    } else if (employmentType == "Student") {
      if (finalEmploymentDetails.employments[0].EmploymentTypeId == "" || finalEmploymentDetails.employments[0].EmploymentTypeId == "Select Employment Status") {
        this.view.flxUnemployStatusError.setVisibility(true);
        return false;
      } else {
        this.view.flxUnemployStatusError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].StartDate) == "Invalid Date") {
        this.view.flxDateWrapper.EmployStartDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateWrapper.EmployStartDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate) == "Invalid Date") {
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(false);
      }
      if (new Date(finalEmploymentDetails.employments[0].endDate)<=new Date(finalEmploymentDetails.employments[0].StartDate)) {
        this.view.EmployEndDateError.lblErrorText.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDateLessThanStartDate");
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(true);
        return false;
      } else {
        this.view.flxDateWrapper.EmployEndDateError.setVisibility(false);
      }      
    }
    if (employmentType == "Employee" || employmentType == "Self-Employed") {
      this.view.flxEmploymentDetailsPopupParent.setVisibility(false);
    } else if (employmentType == "Un-Employed" || employmentType == "Student") {
      this.view.flxUnemployDetailsPopup.setVisibility(false);
    }
    return true;
  },

  resetEmploymentPopup: function () {
    this.view.lstBoxEmpStatus.selectedKey = "A";
    this.view.lstBoxEmploymentRole.selectedKey = "01";
    this.view.lstBoxOccupation.selectedKey = "01";
    this.view.customStartDate.value = "";
    this.view.customStartDate.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.customEndDate.value = "";
    this.view.customEndDate.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.EndDateError.lblErrorText.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDate");
    this.view.txtbxEmployerName.text = "";
    this.view.lstBoxBusinessCategory.selectedKey = "01";
    this.view.lstbxBusinessDescription.selectedKey = "01";
    this.view.tbxDetailedDesc.text = "";
    this.view.flxNoEmploymentRoleError.setVisibility(false);
    this.view.flxNoOccupationError.setVisibility(false);
    this.view.StartDateError.setVisibility(false);
    this.view.flxDateContainer.EndDateError.setVisibility(false);
    this.view.flxNoEmployerNameError.setVisibility(false);
    this.view.flxNoBusinessCategoryError.setVisibility(false);
    this.view.flxNoBusinessDetailedDescriptionError.setVisibility(false);
    this.view.flxNoBusinessDetailedDescriptionError.setVisibility(false);
    this.resetEmploymentAddress();
  },

  resetEmploymentAddress: function () {
    this.view.typeHeadCountry.tbxSearchKey.text = "";
    this.view.tbxStreetName.text = "";
    this.view.tbxBuildingName.text = "";
    this.view.tbxZipCode.text = "";
    this.view.typeHeadState.tbxSearchKey.text = "";
    this.view.typeHeadCity.tbxSearchKey.text = "";
    this.view.flxNoStreetName.setVisibility(false);
    this.view.flxNoCountry.setVisibility(false);
    this.view.flxNoState.setVisibility(false);
    this.view.flxNoCity.setVisibility(false);
    this.view.flxNoZipCode.setVisibility(false);
    this.communicationNature = "";
    this.communicationType = "";
    this.addressesReference = "";
    this.addresstype = "";
    this.view.imgcbEmploymenyBussinessAddress.src = "checkboxnormal.png";
  },

  resetUnEmploymentPopup: function () {
    this.view.flxUnemployDetails.setVisibility(true);
    this.view.lstbxUnemployStatus.selectedKey = "A";
    this.view.customEmployStartDate.value = "";
    this.view.customEmployStartDate.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.customEmployEndDate.value = "";
    this.view.customEmployEndDate.resetData = kony.i18n.getLocalizedString("i18n.frmLogsController.Select_Date");
    this.view.EmployEndDateError.lblErrorText.text=kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEndDate");
    this.view.imgYesBenefitsRadio.src = "radio_notselected.png";
    this.view.imgNoBenefitsRadio.src = "radio_notselected.png";
    this.view.flxDateWrapper.EmployStartDateError.setVisibility(false);
    this.view.flxDateWrapper.EmployEndDateError.setVisibility(false);
    this.view.flxSocialBenifitsError.setVisibility(false);
  },

  setListBoxData: function (widgetRef, value) {
    var input = widgetRef.masterdata;
    for (var arrayIndex in input) {
      if (input[arrayIndex][1] === value) {
        return input[arrayIndex][0];
      }
    }
    return "";
  },

  setBusinessDesconEdit: function (widgetRef, catergory, description) {
    this.businessCategorySelected = this.setListBoxData(this.view.lstBoxBusinessCategory, catergory);
    widgetRef.masterData = this.setListBoxMasterData("CDD_BUSINESS_DESCRIPTION");
    widgetRef.selectedKey = this.setListBoxData(widgetRef, description);
  },
  validateSendAccountUsage: function () {
    var isValid = true;
    if (this.view.customListbox.lblSelectedValue.text == "Select Countries") {
      //this.view.customListbox.skin = "redListBxSkin";
      this.view.flxNoCountryErrorSendPay.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxNoCountryErrorSendPay.setVisibility(false);
    }
    if (this.view.txtbxExpectedPayments.text == "") {
      this.view.flxSendNumberOfPaymentsError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxSendNumberOfPaymentsError.setVisibility(false);
    }
    if (this.view.txtbxExpectedAmount.text == "") {
      this.view.flxSendPayAmountError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxSendPayAmountError.setVisibility(false);
    }
    if (this.view.txtReason.text == "") {
      this.view.flxSendPayReasonError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxSendPayReasonError.setVisibility(false);
    }
    return isValid;
  },
  validateReceiveAccountUsage: function () {
    var isValid = true;
    if (this.view.customListbox1.lblSelectedValue.text == "Select Countries") {
      //this.view.customListbox.skin = "redListBxSkin";
      this.view.flxNoCountryErrorReceivePay.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxNoCountryErrorReceivePay.setVisibility(false);
    }
    if (this.view.txtbxExpectedReceivePayments.text == "") {
      this.view.flxReceiveNumberOfPaymentsError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxReceiveNumberOfPaymentsError.setVisibility(false);
    }
    if (this.view.txtbxExpectedReceivedAmount.text == "") {
      this.view.flxReceivePayAmountError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxReceivePayAmountError.setVisibility(false);
    }
    if (this.view.txtReasonReceivePayment.text == "") {
      this.view.flxReceivePayReasonError.setVisibility(true);
      isValid = false;
    } else {
      this.view.flxReceivePayReasonError.setVisibility(false);
    }
    return isValid;
  },
  onHoverCDDText: function (widget, context, widgetRef) {
    var widGetId = widget.id;
    if (widGetId) {
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER || context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        widgetRef.setVisibility(true);
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        widgetRef.setVisibility(false);
      }
    }
    this.view.forceLayout();
  },

  getSelectedAddress: function () {
    if (this.view.imgcbEmploymenyBussinessAddress.src == "checkboxnormal.png") {
      this.view.imgcbEmploymenyBussinessAddress.src = "checkboxselected.png";
      var addressObj = this.getResidentialAddress(this.employmentAddress);
      if (JSON.stringify(addressObj) === JSON.stringify(null)) {
        this.view.imgcbEmploymenyBussinessAddress.src = "checkboxnormal.png";
        this.resetEmploymentAddress();
        this.view.toastMessage.showErrorToastMessage("Resident Address is empty", this);
      } else {
        this.view.typeHeadCountry.tbxSearchKey.text = addressObj.countryCode;
        this.view.tbxStreetName.text = addressObj.streetName;
        this.view.tbxBuildingName.text = addressObj.buildingName;
        this.view.tbxZipCode.text = addressObj.postalOrZipCode;
        this.view.typeHeadState.tbxSearchKey.text = addressObj.regionCode;
        this.view.typeHeadCity.tbxSearchKey.text = addressObj.district;
        this.addressesReference = addressObj.addressesReference;
        this.communicationNature = addressObj.communicationNature;
        this.communicationType = addressObj.communicationType;
        this.addresstype = addressObj.addressType;
      }
    } else {
      this.view.imgcbEmploymenyBussinessAddress.src = "checkboxnormal.png";
      this.resetEmploymentAddress();
    }
    this.view.forceLayout();
  },

  getBusinessAddress: function (address) {
    if (this.employeeDataUpdated) {
      for (var i in address) {
        if (address[i].usePurpose && address[i].usePurpose == this.employmentReference) {
          return address[i];
        }
      }
    } else {
      if (this.view.imgcbEmploymenyBussinessAddress.src == "checkboxnormal.png") {
        for (var i in address) {
          if ((address[i].addressType == "Office")) {
            return address[i];
          }
        }
      } else {
        for (var i in address) {
          if ((address[i].addressType == "Residence")) {
            return address[i];
          }
        }
      }
    }
    return null;
  },

  getResidentialAddress: function (address) {
    for (var i in address) {
      if ((address[i].addressType == "Residence")) {
        return address[i];
      }
    }
    return null;
  },
  filterData: function (widgetRef) {
    var regexFilter = "^";
    var input = widgetRef.tbxSearchCountry.text.toLowerCase();
    if (input.length === 0) {
      var len = widgetRef.segList.selectedRowItems ? widgetRef.segList.selectedRowItems.length : 0;
      var recordExists = false;
      for (var i = 0; i < len; i++) {
        if (this.prevSelectedIndices.length == 0)
          this.prevSelectedIndices.push(widgetRef.segList.selectedRowItems[i]);
        else {
          for (var j = 0; j < this.prevSelectedIndices.length; j++) {
            if (this.prevSelectedIndices[j].id == widgetRef.segList.selectedRowItems[i].id) {
              recordExists = true;
            }
          }
          if (!recordExists)
            this.prevSelectedIndices.push(widgetRef.segList.selectedRowItems[i]);
        }
      }
      widgetRef.segList.setData(this.customListboxdata);
      this.setMultiSelectedCountries(widgetRef, this.customListboxdata, this.prevSelectedIndices);
      this.prevSelectedIndices = [];
      return;
    }
    var reg = new RegExp(regexFilter + input);
    var data = this.customListboxdata.filter(function (country) {
      if (reg.test(country.lblDescription.text.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    var len = widgetRef.segList.selectedRowItems ? widgetRef.segList.selectedRowItems.length : 0;
    var recordExists = false;
    for (var i = 0; i < len; i++) {
      if (this.prevSelectedIndices.length == 0)
        this.prevSelectedIndices.push(widgetRef.segList.selectedRowItems[i]);
      else {
        for (var j = 0; j < this.prevSelectedIndices.length; j++) {
          if (this.prevSelectedIndices[j].id == widgetRef.segList.selectedRowItems[i].id) {
            recordExists = true;
          }
        }
        if (!recordExists)
          this.prevSelectedIndices.push(widgetRef.segList.selectedRowItems[i]);
      }
    }
    widgetRef.segList.setData(data);
    this.setMultiSelectedCountries(widgetRef, data, this.prevSelectedIndices);
    this.view.forceLayout();
  },
  setMultiSelectedCountries: function (widgetRef, data, selectedcountrydata) {
    var selectedIndices = [];
    for (var i = 0; i < selectedcountrydata.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (data[j].id == selectedcountrydata[i].id) {
          selectedIndices.push(j);
        }
      }
    }
    widgetRef.segList.selectedIndices = [
      [0, selectedIndices]
    ];
  },
  pushDataToPrevSelectedIndices: function (widgetRef) {
    var len = widgetRef.segList.selectedRowItems ? widgetRef.segList.selectedRowItems.length : 0;
    var recordExists = false;
    for (var i = 0; i < len; i++) {
      if (this.prevSelectedIndices.length == 0)
        this.prevSelectedIndices.push(widgetRef.segList.selectedRowItems[i]);
      else {
        for (var j = 0; j < this.prevSelectedIndices.length; j++) {
          if (this.prevSelectedIndices[j].id == widgetRef.segList.selectedRowItems[i].id) {
            recordExists = true;
          }
        }
        if (!recordExists)
          this.prevSelectedIndices.push(widgetRef.segList.selectedRowItems[i]);
      }
    }
  },
  getCompleteAddressPayload: function (addressObj) {
    var address = this.employmentAddress;
    if (!this.employeeDataUpdated) {
      var addArr = [];
      addArr.push(addressObj);
      return addArr;
    } else {
      if (this.view.imgcbEmploymenyBussinessAddress.src == "checkboxnormal.png") {
        for (var i = 0; i < address.length; i++) {
          if ((address[i].addressType == "Office")) {
            address[i] = addressObj;
          } else if ((address[i].addressType == "Residence")) {
            address[i].usePurpose = "";
            if (address[i].countryCode) {
              address[i].CountryCode = address[i].countryCode;
              delete address[i].countryCode;
            }
            if (address[i].addressType) {
              address[i].addresstype = address[i].addressType;
              delete address[i].addressType;
            }
          } else {
            address.splice(i, 1);
            i = i - 1;
          }
        }
      } else {
        for (var i = 0; i < address.length; i++) {
          if ((address[i].addressType == "Office")) {
            address[i].usePurpose = "";
            if (address[i].countryCode) {
              address[i].CountryCode = address[i].countryCode;
              delete address[i].countryCode;
            }
            if (address[i].addressType) {
              address[i].addresstype = address[i].addressType;
              delete address[i].addressType;
            }
          } else if ((address[i].addressType == "Residence")) {
            address[i] = addressObj;
          } else {
            address.splice(i, 1);
            i = i - 1;
          }
        }
      }
    }

    if (address && (address[0] == null || address.length == 1)) {
      var addArr = [];
      addArr.push(addressObj);
      return addArr;
    }
    return address;
  },
  validatCharacterCount: function(widgetId,countWidgetId,type){
    var len=widgetId.text.length;
    if(type!="reason")
    countWidgetId.text=len+"/10";
    else
      countWidgetId.text=len+"/100";
  }
});
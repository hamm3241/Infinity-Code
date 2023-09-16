define({
  customerType : "",
  isCustomerEnrolled:"",
  contactInfoCount: 3,
  contactInfo:[],
  getAddressTypes:[],
  contactInfoBB:{},
  addressModel:{},
  PhoneNumbersList: [kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home"),kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Work"),
                     kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mobile") ],
  EmailTypesList: [kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Personal"),kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Work"),
                   kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other") ],
  willUpdateUI: function (context) {
    var self = this;
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
          this.view.flxNoCodeError.setVisibility(false);
          this.view.flxNoCodeErrorContact.setVisibility(false);
        } else {
          this.view.toastMessage.showErrorToastMessage(context.toastModel.message, this);
          this.view.flxNoCodeError.setVisibility(false);
          this.view.flxNoCodeErrorContact.setVisibility(false);
        }
      } else if (context.CustomerBasicInfo) {
        this.view.flxGeneralInfoWrapper.setBasicInformation(context.CustomerBasicInfo, this,()=>{
          self.isCustomerEnrolled = context.CustomerBasicInfo.customer.isCustomerEnrolled;
          var isEnrolledFromSpotlight = context.CustomerBasicInfo.customer.isEnrolledFromSpotlight;
          var isProfileExists = context.CustomerBasicInfo.customer.isProfileExist;
          if (self.isCustomerEnrolled === "false" && (isEnrolledFromSpotlight === undefined || isEnrolledFromSpotlight === null || isEnrolledFromSpotlight === "" || isEnrolledFromSpotlight === "1") &&
              isProfileExists === "false" ) {
            this.view.flxGeneralInfoWrapper.setVisibility(false);
            this.view.flxGeneralInfoWrapperUnEnrolled.setVisibility(true);
            this.view.forceLayout();
            this.setScreenForUnEnrolled(context.CustomerBasicInfo);
          }
          else{
            this.view.flxGeneralInfoWrapper.setVisibility(true);
            this.view.flxGeneralInfoWrapperUnEnrolled.setVisibility(false);     
            this.view.forceLayout();
            this.view.tabs.setCustomerProfileTabs(this);
          } 
          
        });

          
        if(context.CustomerBasicInfo){
          kony.adminConsole.utils.showProgressBar(this.view);
          this.customerType = context.CustomerBasicInfo.customer.CustomerType_id;
          if (context.CustomerBasicInfo.customer.CustomerType_id !== this.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE && 
              context.CustomerBasicInfo.target != "EditScreen") {
          this.getAddressType();
          var customerId = this.presenter.getCurrentCustomerDetails().Customer_id || this.presenter.getCurrentCustomerDetails().primaryCustomerId;
          var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
          this.presenter.getCustomerContactInfo({ "customerID": customerId,"legalEntityId": legalEntityId || "", "partyId" : context.CustomerBasicInfo.customer.partyId }, "InfoScreen");
         // this.presenter.getCitiesStatesAndCountries();
          }
        }

      } else if (context.CustomerContactInfo) {
        
        this.segregateContactsForBusinessAndRetail(context.CustomerContactInfo);
        if (context.CustomerContactInfo.target === "InfoScreen") {
          //contact details screen  
          this.showContactDetailsScreenUI(2);
          this.contactInfo = context.CustomerContactInfo;
          this.setDataForContactScreen(this.contactInfo);

          // if(this.customerType === this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE){
          //   this.showContactDetailsScreenUI(1);
          //   this.setDataForContactScreenBusiness(this.contactInfoBB);

          // } else if(this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
          //           this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0){
          //   this.showContactDetailsScreenUI(2);
          //   this.setDataForContactScreen(this.contactInfo);
          //   this.setDataForContactScreenBusiness(this.contactInfoBB);
          // } else{
          //   this.showContactDetailsScreenUI(2);
          //   this.setDataForContactScreen(this.contactInfo);
          // }
        } else {
          //Edit contact screen
          if(context.CustomerContactInfo.subTarget){
            this.contactInfo.subTarget = context.CustomerContactInfo.subTarget;
          }
          this.setDataForContactEditScreen(this.contactInfo);
        }
      } else if (context.enrollACustomer) {
        this.view.flxGeneralInfoWrapper.setEnrollmentAccessandStatus();
      }
      else if (context.StatusGroup) {
        this.view.flxGeneralInfoWrapper.processAndFillStatusForEdit(context.StatusGroup, this);

      } else if (context.UpdateDBPUserStatus) {
        this.view.flxGeneralInfoWrapper.setLockStatus(context.UpdateDBPUserStatus.status.toUpperCase(), this);

      } else if (context.CustomerNotes) {
        this.view.Notes.displayNotes(this, context.CustomerNotes);

      } else if (context.AddressModel) {
        this.addressModel=context.AddressModel;
        this.populateAllListBoxes(context.AddressModel);

        var target = "EditScreen";
        var id = this.presenter.getCurrentCustomerDetails().Customer_id || this.presenter.getCurrentCustomerDetails().primaryCustomerId;
        var custLEId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
        this.presenter.getCustomerContactInfo({
          "customerID": id, "legalEntityId": custLEId || ""
        }, target, "Address");

      } else if (context.targetAddressModel) {
        this.populateTargetedListBoxes(context.targetAddressModel);

      } else if (context.OnlineBankingLogin) {
        this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);

      } else if(context.userNameRulesPolicy){
        this.view.delinkProfilePopup.setUsernameRules(context.userNameRulesPolicy);
        
      } else if(context.linkProfilesList){
          this.view.linkProfilesPopup.setSearchProfilesSegmentData(context.linkProfilesList,this);
      } else if(context.userNameIsAvailable){
        this.view.delinkProfilePopup.checkUserNameAvailability(context.userNameIsAvailable);
      } else if(context.checkAuthSignatory){ 
        //for business user,to get isauthSignatory flag in case not available in basicInfo
        var customerType = context.checkAuthSignatory.customer.CustomerType_id;
        var status = context.checkAuthSignatory.customer.CustomerStatus_id;
         //hiding link/delink profile buttons
        /*if (status === "LOCKED" || status === "SUSPENDED" || status === "NEW") {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,false);
        }  else {
          this.view.flxGeneralInfoWrapper.showLinkDelinkButtons(this,customerType,true);
        }*/
      }
      else if(context.sendActivationCode){
         this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxNotification.setVisibility(true);
         this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.btnEnrollNow.setVisibility(false);
        this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblMessage.centerY="50%";
        this.view.forceLayout();
      }else if (context.getAddressType){
                this.getAddressTypes=context.getAddressType;
      }
    }
  },
  
  filterSearchResults : function(searchTxt){
    searchTxt = searchTxt.toLowerCase();
    return this.CustomerContracts.filter(function(contract){
            // contract name 
            if(contract.contractName.toLowerCase().indexOf(searchTxt) ){
                return true;
            }
            // customer name
            // customer id 
            return contract.contractCustomers.some(function(customer){
                if(customer.id.toLowerCase().indexOf(searchTxt) || customer.name.toLowerCase().indexOf(searchTxt) ){
                    return true;
                }
                
                // account number
                return customer.coreCustomerAccounts.some(function(account){
                    if(account.accountName.toLowerCase().indexOf(searchTxt) ){
                        return true;
                    }
                }).length >0;
            }).length >0;                              
        }
    );
  },
  CustomerProfileContactsPreshow: function () {
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress.lblAddressLine1Size, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress.lblAddressLine2Size, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress.lblZipcodeSize, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress1.lblAddressLine1Size, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress1.lblAddressLine2Size, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress1.lblZipcodeSize, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress2.lblAddressLine1Size, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress2.lblAddressLine2Size, false);
    this.AdminConsoleCommonUtils.setVisibility(this.view.EditAddress2.lblZipcodeSize, false);
    this.view.flxNoCodeError.setVisibility(false);
    this.view.flxNoCodeErrorContact.setVisibility(false);
    this.view.tabs.setSkinForInfoTabs(this.view.tabs.btnTabName1);
    this.view.Notes.setDefaultNotesData(this);
    var screenHeight = kony.os.deviceInfo().screenHeight;
    this.view.flxMainContent.height = screenHeight - 115 + "px";
    this.view.flxGeneralInfoWrapper.changeSelectedTabColour(this.view.flxGeneralInfoWrapper.dashboardCommonTab.btnProfile);
    this.view.flxGeneralInfoWrapper.generalInfoHeader.setDefaultHeaderData(this);
    this.view.flxGeneralInfoWrapper.setFlowActionsForGeneralInformationComponent(this);
    this.view.linkProfilesPopup.initializeLinkProfileActions(this);
    this.view.delinkProfilePopup.delinkProfilePreshow(this);
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblMessage.centerY="50%";
    this.view.forceLayout();
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblStatus.setVisibility(false);
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.fonticonActive.setVisibility(false);
    this.resetContactsTab();
    this.showHideToggleButtons(1);
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
    
  },

  showContactsViewScreen: function () {
    this.view.flxEditContactDetails.setVisibility(false);
    this.view.flxContactDetails.setVisibility(true);
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
      this.view.dropdownEntity.lblSelectLegalEntity.text = segData && segData[0] ? segData[0].companyName : "";
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
    this.view.EditAddress.txtfldAddressLine1.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress.txtfldAddressLine1);
      scopeObj.view.EditAddress.lblErrorAddressLine1.setVisibility(false);
      scopeObj.view.EditAddress.lblAddressLine1Size.setVisibility(true);
      scopeObj.view.EditAddress.lblAddressLine1Size.text = scopeObj.view.EditAddress.txtfldAddressLine1.text.length + "/100";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress.txtfldAddressLine1.onEndEditing = function () {
      scopeObj.view.EditAddress.lblAddressLine1Size.setVisibility(false);
    }
    this.view.EditAddress.txtfldAddressLine2.onKeyUp = function () {
      scopeObj.view.EditAddress.lblAddressLine2Size.setVisibility(true);
      scopeObj.view.EditAddress.lblAddressLine2Size.text = scopeObj.view.EditAddress.txtfldAddressLine2.text.length + "/100";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress.txtfldAddressLine2.onEndEditing = function () {
      scopeObj.view.EditAddress.lblAddressLine2Size.setVisibility(false);
    }
    this.view.EditAddress.txtfldZipCode.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress.txtfldZipCode);
      scopeObj.view.EditAddress.lblErrorZipcode.setVisibility(false);
      scopeObj.view.EditAddress.lblZipcodeSize.text = scopeObj.view.EditAddress.txtfldZipCode.text.length + "/20";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress.txtfldZipCode.onEndEditing = function () {
      scopeObj.view.EditAddress.lblZipcodeSize.setVisibility(false);
    }
    this.view.EditAddress.txtboxCity.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress.txtboxCity);
      scopeObj.view.EditAddress.lblErrorCity.setVisibility(false);
    };
    this.view.EditAddress.lstboxstate.onSelection = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress.lstboxstate);
      scopeObj.view.EditAddress.lblErrorState.setVisibility(false);
      scopeObj.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.state"), scopeObj.view.EditAddress.lstboxstate.selectedKey, 0);
    };
  //  this.view.dropdownEntity.flxSegEntity.onHover = this.onDropDownsHoverCallback;
    this.view.EditAddress.lstboxCountry.onSelection = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress.lstboxCountry);
      scopeObj.view.EditAddress.lblErrorCountry.setVisibility(false);
      scopeObj.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.country"), scopeObj.view.EditAddress.lstboxCountry.selectedKey, 0);
    };
    this.view.EditAddress1.txtfldAddressLine1.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress1.txtfldAddressLine1);
      scopeObj.view.EditAddress1.lblErrorAddressLine1.setVisibility(false);
      scopeObj.view.EditAddress1.lblAddressLine1Size.setVisibility(true);
      scopeObj.view.EditAddress1.lblAddressLine1Size.text = scopeObj.view.EditAddress1.txtfldAddressLine1.text.length + "/100";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress1.txtfldAddressLine1.onEndEditing = function () {
      scopeObj.view.EditAddress1.lblAddressLine1Size.setVisibility(false);
    }
    this.view.EditAddress1.txtfldAddressLine2.onKeyUp = function () {
      scopeObj.view.EditAddress1.lblAddressLine2Size.setVisibility(true);
      scopeObj.view.EditAddress1.lblAddressLine2Size.text = scopeObj.view.EditAddress1.txtfldAddressLine2.text.length + "/100";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress1.txtfldAddressLine2.onEndEditing = function () {
      scopeObj.view.EditAddress1.lblAddressLine2Size.setVisibility(false);
    }
    this.view.EditAddress1.txtfldZipCode.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress1.txtfldZipCode);
      scopeObj.view.EditAddress1.lblErrorZipcode.setVisibility(false);
      scopeObj.view.EditAddress1.lblZipcodeSize.text = scopeObj.view.EditAddress1.txtfldZipCode.text.length + "/20";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress1.txtfldZipCode.onEndEditing = function () {
      scopeObj.view.EditAddress1.lblZipcodeSize.setVisibility(false);
    }
    this.view.EditAddress1.txtboxCity.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress1.txtboxCity);
      scopeObj.view.EditAddress1.lblErrorCity.setVisibility(false);
    };
    this.view.EditAddress1.lstboxstate.onSelection = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress1.lstboxstate);
      scopeObj.view.EditAddress1.lblErrorState.setVisibility(false);
      scopeObj.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.state"), scopeObj.view.EditAddress1.lstboxstate.selectedKey, 1);
    };
    this.view.EditAddress1.lstboxCountry.onSelection = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress1.lstboxCountry);
      scopeObj.view.EditAddress1.lblErrorCountry.setVisibility(false);
      scopeObj.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.country"), scopeObj.view.EditAddress1.lstboxCountry.selectedKey, 1);
    };
    this.view.EditAddress2.txtfldAddressLine1.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress2.txtfldAddressLine1);
      scopeObj.view.EditAddress2.lblErrorAddressLine1.setVisibility(false);
      scopeObj.view.EditAddress2.lblAddressLine1Size.setVisibility(true);
      scopeObj.view.EditAddress2.lblAddressLine1Size.text = scopeObj.view.EditAddress2.txtfldAddressLine1.text.length + "/100";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress2.txtfldAddressLine1.onEndEditing = function () {
      scopeObj.view.EditAddress2.lblAddressLine1Size.setVisibility(false);
    }
    this.view.EditAddress2.txtfldAddressLine2.onKeyUp = function () {
      scopeObj.view.EditAddress2.lblAddressLine2Size.setVisibility(true);
      scopeObj.view.EditAddress2.lblAddressLine2Size.text = scopeObj.view.EditAddress2.txtfldAddressLine2.text.length + "/100";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress2.txtfldAddressLine2.onEndEditing = function () {
      scopeObj.view.EditAddress2.lblAddressLine2Size.setVisibility(false);
    }
    this.view.EditAddress2.txtfldZipCode.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress2.txtfldZipCode);
      scopeObj.view.EditAddress2.lblErrorZipcode.setVisibility(false);
      scopeObj.view.EditAddress2.lblZipcodeSize.text = scopeObj.view.EditAddress2.txtfldZipCode.text.length + "/20";
      scopeObj.view.forceLayout();
    };
    this.view.EditAddress2.txtfldZipCode.onEndEditing = function () {
      scopeObj.view.EditAddress2.lblZipcodeSize.setVisibility(false);
    }
    this.view.EditAddress2.txtboxCity.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress2.txtboxCity);
      scopeObj.view.EditAddress2.lblErrorCity.setVisibility(false);
    };
    this.view.EditAddress2.lstboxstate.onSelection = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress2.lstboxstate);
      scopeObj.view.EditAddress2.lblErrorState.setVisibility(false);
      scopeObj.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.state"), scopeObj.view.EditAddress2.lstboxstate.selectedKey, 2);
    };
    this.view.EditAddress2.lstboxCountry.onSelection = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditAddress2.lstboxCountry);
      scopeObj.view.EditAddress2.lblErrorCountry.setVisibility(false);
      scopeObj.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.country"), scopeObj.view.EditAddress2.lstboxCountry.selectedKey, 2);
    };
    this.view.backToPageHeader.btnBack.onClick = function () {
      scopeObj.view.flxGeneralInfoWrapper.showGeneralInformationScreen(scopeObj);
      scopeObj.showContactsViewScreen();
      scopeObj.view.forceLayout();
    };
    this.view.EditEmailId.txtfldContactNum1.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditEmailId.txtfldContactNum1);
      scopeObj.view.EditEmailId.flxContactError1.setVisibility(false);
    };
    this.view.EditEmailId.txtfldContactNum2.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditEmailId.txtfldContactNum2);
      scopeObj.view.EditEmailId.flxContactError2.setVisibility(false);
    };
    this.view.EditEmailId.txtfldContactNum3.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditEmailId.txtfldContactNum3);
      scopeObj.view.EditEmailId.flxContactError3.setVisibility(false);
    };
    this.view.EditContact.contactNumber1.txtContactNumber.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditContact.contactNumber1.txtContactNumber);
      scopeObj.view.EditContact.contactNumber1.hideErrorMsg(2);
    };
    this.view.EditContact.contactNumber2.txtContactNumber.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditContact.contactNumber2.txtContactNumber);
      scopeObj.view.EditContact.contactNumber2.hideErrorMsg(2);
    };
    this.view.EditContact.contactNumber3.txtContactNumber.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditContact.contactNumber3.txtContactNumber);
      scopeObj.view.EditContact.contactNumber3.hideErrorMsg(2);
    };
    this.view.EditContact.contactNumber1.txtContactNumber.onTouchStart = function () {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmCustomerProfileContacts_EditContact_contactNumber1_txtContactNumber');
    };
    this.view.EditContact.contactNumber2.txtContactNumber.onTouchStart = function () {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmCustomerProfileContacts_EditContact_contactNumber2_txtContactNumber');
    };
    this.view.EditContact.contactNumber3.txtContactNumber.onTouchStart = function () {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmCustomerProfileContacts_EditContact_contactNumber3_txtContactNumber');
    };
    this.view.EditContact.contactNumber1.txtISDCode.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditContact.contactNumber1.txtISDCode);
      scopeObj.view.EditContact.contactNumber1.flxError.setVisibility(false);
      scopeObj.view.EditContact.contactNumber1.hideErrorMsg(1);
    };
    this.view.EditContact.contactNumber2.txtISDCode.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditContact.contactNumber2.txtISDCode);
      scopeObj.view.EditContact.contactNumber2.flxError.setVisibility(false);
      scopeObj.view.EditContact.contactNumber2.hideErrorMsg(1);
    };
    this.view.EditContact.contactNumber3.txtISDCode.onKeyUp = function () {
      scopeObj.AdminConsoleCommonUtils.showNoError(scopeObj.view.EditContact.contactNumber3.txtISDCode);
      scopeObj.view.EditContact.contactNumber3.flxError.setVisibility(false);
      scopeObj.view.EditContact.contactNumber3.hideErrorMsg(1);
    };
    this.view.EditContact.contactNumber1.txtISDCode.onTouchStart = function () {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmCustomerProfileContacts_EditContact_contactNumber1_txtISDCode');
    };
    this.view.EditContact.contactNumber2.txtISDCode.onTouchStart = function () {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmCustomerProfileContacts_EditContact_contactNumber2_txtISDCode');
    };
    this.view.EditContact.contactNumber3.txtISDCode.onTouchStart = function () {
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmCustomerProfileContacts_EditContact_contactNumber3_txtISDCode');
    };
    this.view.EditContact.contactNumber1.txtISDCode.onEndEditing = function () {
      scopeObj.view.EditContact.contactNumber1.txtISDCode.text =
        scopeObj.view.EditContact.contactNumber1.addingPlus(scopeObj.view.EditContact.contactNumber1.txtISDCode.text);
    };
    this.view.EditContact.contactNumber2.txtISDCode.onEndEditing = function () {
      scopeObj.view.EditContact.contactNumber2.txtISDCode.text =
        scopeObj.view.EditContact.contactNumber2.addingPlus(scopeObj.view.EditContact.contactNumber2.txtISDCode.text);
    };
    this.view.EditContact.contactNumber3.txtISDCode.onEndEditing = function () {
      scopeObj.view.EditContact.contactNumber3.txtISDCode.text =
        scopeObj.view.EditContact.contactNumber3.addingPlus(scopeObj.view.EditContact.contactNumber3.txtISDCode.text);
    };
    this.view.ContactEmail.btnAdd.onClick = function () {
      //service call to fetch address details
      var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var target = "EditScreen";
      var custLEId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      scopeObj.presenter.getCustomerContactInfo({
        "customerID": id, "legalEntityId" : custLEId || ""
      }, target, "Email");
    };
    this.view.ContactEmail.btnEdit.onClick = function () {
      //service call to fetch address details
      var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var target = "EditScreen";
      var custLEId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      scopeObj.presenter.getCustomerContactInfo({
        "customerID": id, "legalEntityId" : custLEId || ""
      }, target, "Email");
    };
    this.view.editEmailIdButtons.btnSave.onClick = function () {

      if (scopeObj.validateCommunicationDetails("EditEmailId")) {
        var EmailIds = [];
        var isPrimary=false;
        for (var i = 1; i <= scopeObj.contactInfoCount; i++) {
          if (scopeObj.isCommunicationEntered("EditEmailId", i)) {
            if(scopeObj.view.EditEmailId["imgRadio" + i].src === scopeObj.AdminConsoleCommonUtils.radioSelected)
             isPrimary=true;
            EmailIds.push({
              value: scopeObj.view.EditEmailId["txtfldContactNum" + i].text,
              isPrimary: scopeObj.view.EditEmailId["imgRadio" + i].src === scopeObj.AdminConsoleCommonUtils.radioSelected ? "1" : "0",
              Extension: scopeObj.view.EditEmailId["lblContactType" + i].selectedKey
            });
            if (scopeObj.view.EditEmailId["txtfldContactNum" + i].info && scopeObj.view.EditEmailId["txtfldContactNum" + i].info.Key)
              EmailIds[i - 1].id = scopeObj.view.EditEmailId["txtfldContactNum" + i].info.Key;
          }
        }
        if(scopeObj.customerType.indexOf(scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
                    scopeObj.customerType.indexOf(scopeObj.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0 && scopeObj.contactInfoBB.email!=="N/A"){
          EmailIds.push({
            value: scopeObj.contactInfoBB.email.Value,
            isPrimary: isPrimary===true ? "0" : "1",
            Extension: scopeObj.contactInfoBB.email.Extension,
            id:scopeObj.contactInfoBB.email.id
          });
          
        }
        //var custDetails=scopeObj.presenter.getCurrentCustomerDetails();
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          //"Customer_id": custDetails.Customer_id,
          //"EmailIds": JSON.stringify(EmailIds)
          
          "Customer_id": scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId,
          "EmailIds": JSON.stringify(EmailIds),
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""
           
        });
        scopeObj.view.flxContactDetails.setVisibility(true);
        scopeObj.view.flxEditContactDetails.setVisibility(false);

      }
    };
    this.view.ContactNum.btnAdd.onClick = function () {
      //service call to fetch address details
      var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var target = "EditScreen";
      var custLEId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      scopeObj.presenter.getCustomerContactInfo({
        "customerID": id, "legalEntityId" : custLEId
      }, target, "Phone");
    };
    this.view.ContactNum.btnEdit.onClick = function () {
      //service call to fetch address details
      var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var target = "EditScreen";
      var custLEId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      scopeObj.presenter.getCustomerContactInfo({
        "customerID": id, "legalEntityId":custLEId || ""
      }, target, "Phone");
    };
    this.view.editContactButtons.btnSave.onClick = function () {
      if (scopeObj.validateCommunicationDetails("EditContact")) {
        var PhoneNumbers = [];
        var isPrimary=false;
        for (var i = 1; i <= scopeObj.contactInfoCount; i++) {
          if (scopeObj.isCommunicationEntered("EditContact", i)) {
          if(scopeObj.view.EditContact["imgRadio" + i].src === scopeObj.AdminConsoleCommonUtils.radioSelected)
            isPrimary=true;
            PhoneNumbers.push({
              //value: scopeObj.view.EditContact["contactNumber" + i].txtISDCode.text + "-" + scopeObj.view.EditContact["contactNumber" + i].txtContactNumber.text,
              phoneNumber: scopeObj.view.EditContact["contactNumber" + i].txtContactNumber.text,
              phoneCountryCode: scopeObj.view.EditContact["contactNumber" + i].txtISDCode.text,
              isPrimary: scopeObj.view.EditContact["imgRadio" + i].src === scopeObj.AdminConsoleCommonUtils.radioSelected ? "1" : "0",
              Extension: scopeObj.view.EditContact["lblContactType" + i].selectedKey
            });
            if (scopeObj.view.EditContact["contactNumber" + i].txtContactNumber.info && scopeObj.view.EditContact["contactNumber" + i].txtContactNumber.info.Key)
              PhoneNumbers[i - 1].id = scopeObj.view.EditContact["contactNumber" + i].txtContactNumber.info.Key;
          
          }
        }
        var custDetails= scopeObj.presenter.getCurrentCustomerDetails();
        if(scopeObj.customerType.indexOf(scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
                    scopeObj.customerType.indexOf(scopeObj.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0 && scopeObj.contactInfoBB.phone!=="N/A"){
          PhoneNumbers.push({
            phoneNumber: scopeObj.contactInfoBB.phone.phoneNumber,
            phoneCountryCode: scopeObj.contactInfoBB.phone.phoneCountryCode,
            isPrimary: isPrimary===true?"0":"1",
            Extension: scopeObj.contactInfoBB.phone.Extension,
            id:scopeObj.contactInfoBB.phone.id

          });
          
        }
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": custDetails.Customer_id || custDetails.primaryCustomerId,
          "UserName": custDetails.Username,
          "phoneNumbers": JSON.stringify(PhoneNumbers),
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""

        });
        scopeObj.view.flxContactDetails.setVisibility(true);
        scopeObj.view.flxEditContactDetails.setVisibility(false);
      }
    };
    this.view.addressEditButtons.btnCancel.onClick = function () {
      scopeObj.view.flxGeneralInfoWrapper.showGeneralInformationScreen(scopeObj);
      scopeObj.showContactsViewScreen();
      scopeObj.view.forceLayout();
    };
    this.view.backToPageHeader.flxBack.onClick = function () {
      scopeObj.view.flxContactDetails.setVisibility(true);
      scopeObj.view.flxEditContactDetails.setVisibility(false);
    };

    this.view.editContactButtons.btnCancel.onClick = function () {
      scopeObj.view.flxContactDetails.setVisibility(true);
      scopeObj.view.flxEditContactDetails.setVisibility(false);
    };
    this.view.editEmailIdButtons.btnCancel.onClick = function () {
      scopeObj.view.flxContactDetails.setVisibility(true);
      scopeObj.view.flxEditContactDetails.setVisibility(false);
    };
    this.view.ContactPrefTimeMethod.btnEdit.onClick = function () {
      //service call to fetch details
      var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var target = "EditScreen";
      var custLEId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      scopeObj.presenter.getCustomerContactInfo({
        "customerID": id, "legalEntityId": custLEId
      }, target, "PrefTimeMethod");

    };
    this.view.Address.btnEdit.onClick = function () {
      //service call to fetch address details
     // var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
     // scopeObj.addressModel = scopeObj.presenter.AddressModel;
     // if(scopeObj.addressModel){
       //   scopeObj.populateAllListBoxes(scopeObj.addressModel);
     // }
     // var target = "EditScreen";
     // scopeObj.presenter.getCustomerContactInfo({
       // "customerID": id
      //}, target, "Address");
       scopeObj.presenter.getCitiesStatesAndCountries();
    };
    this.view.Address.btnAdd.onClick = function () {
      //service call to fetch address details
      var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
      var custLEId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      var target = "EditScreen";
      scopeObj.presenter.getCustomerContactInfo({
        "customerID": id, "legalEntityId": custLEId
      }, target, "Address");
    };

    this.view.EditAddress.flxRadio1.onClick = function () {
      var selectedBtn = scopeObj.view.EditAddress.imgRadio1;
      var allBtns = [scopeObj.view.EditAddress.imgRadio1, scopeObj.view.EditAddress1.imgRadio1, scopeObj.view.EditAddress2.imgRadio1];
      scopeObj.selectRadioButtons(selectedBtn, allBtns);
    };
    this.view.EditAddress1.flxRadio1.onClick = function () {
      var selectedBtn = scopeObj.view.EditAddress1.imgRadio1;
      var allBtns = [scopeObj.view.EditAddress.imgRadio1, scopeObj.view.EditAddress1.imgRadio1, scopeObj.view.EditAddress2.imgRadio1];
      scopeObj.selectRadioButtons(selectedBtn, allBtns);
    };
    this.view.EditAddress2.flxRadio1.onClick = function () {
      var selectedBtn = scopeObj.view.EditAddress2.imgRadio1;
      var allBtns = [scopeObj.view.EditAddress.imgRadio1, scopeObj.view.EditAddress1.imgRadio1, scopeObj.view.EditAddress2.imgRadio1];
      scopeObj.selectRadioButtons(selectedBtn, allBtns);
    };
    this.view.addressEditButtons.btnSave.onClick = function () {
      if (scopeObj.validateEditOrAddAddress()) {
        var Addresses = [];
        var isPrimary=false;
        for (var i = 0; i < scopeObj.contactInfoCount; i++) {
          if (scopeObj.isAddressEntered(i)) {
            var count = (i === 0) ? "" : i;
            if(scopeObj.view["EditAddress" + count].imgRadio1.src === scopeObj.AdminConsoleCommonUtils.radioSelected)
              isPrimary=true;
            Addresses.push({
              Addr_type: scopeObj.view["EditAddress" + count].lblAddressType.selectedKey,
              isPrimary: scopeObj.view["EditAddress" + count].imgRadio1.src === scopeObj.AdminConsoleCommonUtils.radioSelected ? "1" : "0",
              addrLine1: scopeObj.view["EditAddress" + count].txtfldAddressLine1.text,
              addrLine2: scopeObj.view["EditAddress" + count].txtfldAddressLine2.text ? scopeObj.view["EditAddress" + count].txtfldAddressLine2.text : "",
              CityName: scopeObj.view["EditAddress" + count].txtboxCity.text,
              Region_id: scopeObj.view["EditAddress" + count].lstboxstate.selectedKey,
              ZipCode: scopeObj.view["EditAddress" + count].txtfldZipCode.text,
            });
            if (scopeObj.view["EditAddress" + count].flxViewContact.info.Address_id)
              Addresses[i].Addr_id = scopeObj.view["EditAddress" + count].flxViewContact.info.Address_id;
          }
        }
        if(scopeObj.customerType.indexOf(scopeObj.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
           scopeObj.customerType.indexOf(scopeObj.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0 && scopeObj.contactInfoBB.address!=="N/A"){
          Addresses.push({
            Addr_type: scopeObj.contactInfoBB.address.AddressType,
            isPrimary: isPrimary===true ? "0" : "1",
            addrLine1: scopeObj.contactInfoBB.address.AddressLine1,
            addrLine2: scopeObj.contactInfoBB.address.AddressLine2,
            CityName: scopeObj.contactInfoBB.address.CityName,
            Region_id: scopeObj.contactInfoBB.address.RegionCode,
            ZipCode: scopeObj.contactInfoBB.address.ZipCode,
            id: scopeObj.contactInfoBB.address.Address_id
          });

        }
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        var custDetails=scopeObj.presenter.getCurrentCustomerDetails();
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": custDetails.Customer_id || custDetails.primaryCustomerId,
          "ModifiedByName" :custDetails.Name,
          "Addresses": JSON.stringify(Addresses),
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""

        });
        scopeObj.view.flxContactDetails.setVisibility(true);
        scopeObj.view.flxEditContactDetails.setVisibility(false);
      }
    };

    this.view.Address.btnDeleteAddress1.onClick = function () {
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": id,
          "deleteAddressID": scopeObj.view.Address.btnDeleteAddress1.info.Value,
          "legalEntityId": legalEntityId || ""
        });
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Delete Address',
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Delete_address_message_content"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    this.view.Address.btnDeleteAddress2.onClick = function () {
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId ;
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": id,
          "deleteAddressID": scopeObj.view.Address.btnDeleteAddress2.info.Value,
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""

        });
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Delete Address',
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Delete_address_message_content"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    this.view.ContactNum.btnDeleteAdditionalDetails1.onClick = function () {
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": id,
          "deleteCommunicationID": scopeObj.view.ContactNum.btnDeleteAdditionalDetails1.info.Value,
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""

        });
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Delete Phone number',
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Delete_Phone_message_content"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    this.view.ContactNum.btnDeleteAdditionalDetails2.onClick = function () {
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": id,
          "deleteCommunicationID": scopeObj.view.ContactNum.btnDeleteAdditionalDetails2.info.Value,
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""

        });
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Delete Phone number',
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Delete_Phone_message_content"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    this.view.ContactEmail.btnDeleteAdditionalDetails1.onClick = function () {
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": id,
          "deleteCommunicationID": scopeObj.view.ContactEmail.btnDeleteAdditionalDetails1.info.Value,
          "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
          "legalEntityId": legalEntityId || ""

        });
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Delete email',
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Delete_email_message_content"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    this.view.ContactEmail.btnDeleteAdditionalDetails2.onClick = function () {
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
        var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
        scopeObj.presenter.editCustomerContactInfo({
          "Customer_id": id,
          "deleteCommunicationID": scopeObj.view.ContactEmail.btnDeleteAdditionalDetails2.info.Value,
          "legalEntityId": legalEntityId || ""

        });
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Delete email',
        message: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Delete_email_message_content"),
        confirmAction: confirmAction,
        cancelMsg: kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS"),
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    this.view.dropdownEntity.flxSelectLegalEntity.onClick = function () {
      var segmntData = scopeObj.view.dropdownEntity.segEntity.data;
      if (segmntData.length === 1) {
        scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
      }
      else {
        //   scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(segmntData.length > 1);
        if (scopeObj.view.dropdownEntity.flxSegEntity.isVisible === false) {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(true);
        } else {
          scopeObj.view.dropdownEntity.flxSegEntity.setVisibility(false);
        }
      }
    };    
    this.view.flxCheckBox1.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.AdminConsoleCommonUtils.togglePreferredCheckbox(scopeObj.view.imgCheckBox1);
      scopeObj.togglePreferredTimeByCall();
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.flxCheckBox2.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.AdminConsoleCommonUtils.togglePreferredCheckbox(scopeObj.view.imgCheckBox2);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };

    this.view.flxTimeCheckBox1.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.AdminConsoleCommonUtils.togglePreferredCheckbox(scopeObj.view.imgTimeCheckBox1);
      scopeObj.toggleAnyTime(scopeObj.view.imgTimeCheckBox1);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.flxTimeCheckBox2.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.AdminConsoleCommonUtils.togglePreferredCheckbox(scopeObj.view.imgTimeCheckBox2);
      scopeObj.toggleAnyTime(scopeObj.view.imgTimeCheckBox2);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.flxTimeCheckBox3.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.AdminConsoleCommonUtils.togglePreferredCheckbox(scopeObj.view.imgTimeCheckBox3);
      scopeObj.toggleAnyTime(scopeObj.view.imgTimeCheckBox3);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.flxTimeCheckBox4.onClick = function () {
      scopeObj.AdminConsoleCommonUtils.storeScrollHeight(scopeObj.view.flxMainContent);
      scopeObj.AdminConsoleCommonUtils.togglePreferredCheckbox(scopeObj.view.imgTimeCheckBox4);
      scopeObj.toggleAnyTime(scopeObj.view.imgTimeCheckBox4);
      scopeObj.AdminConsoleCommonUtils.scrollToDefaultHeight(scopeObj.view.flxMainContent);
    };
    this.view.editTimeButtons.btnCancel.onClick = function () {
      scopeObj.view.flxContactDetails.setVisibility(true);
      scopeObj.view.flxEditContactDetails.setVisibility(false);
    };
    this.view.editTimeButtons.btnSave.onClick = function () {
      scopeObj.view.flxContactDetails.setVisibility(true);
      scopeObj.view.flxEditContactDetails.setVisibility(false);

      var PreferredMethod = "";
      for (var i = 1; i <= 2; i++) {
        if (scopeObj.view["imgCheckBox" + i].src === scopeObj.AdminConsoleCommonUtils.checkboxSelected) {
          if (PreferredMethod !== "") {
            PreferredMethod += ", " + scopeObj.view["lblCheckBox" + i].text;
          } else {
            PreferredMethod += scopeObj.view["lblCheckBox" + i].text;
          }
        }
      }

      var PreferredTime = "";
      if (scopeObj.view.imgCheckBox1.src === scopeObj.AdminConsoleCommonUtils.checkboxSelected) {
        for (var i = 1; i <= 4; i++) {
          if (scopeObj.view["imgTimeCheckBox" + i].src === scopeObj.AdminConsoleCommonUtils.checkboxSelected)
            if (PreferredTime !== "") {
              PreferredTime += ", " + scopeObj.view["lblPreferredTime" + i].text;
            }
            else {
              PreferredTime += scopeObj.view["lblPreferredTime" + i].text;
            }
        }
      }
      var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      scopeObj.presenter.editCustomerContactInfo({
        "Customer_id": scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId,
        "preferredContactMethod": (PreferredMethod===""||!PreferredMethod)?"N/A": PreferredMethod,
        "preferredContactTime": (PreferredTime===""||!PreferredTime)?"N/A": PreferredTime,
        "isCustomerEnrolled": scopeObj.isCustomerEnrolled,
        "legalEntityId": legalEntityId || ""
      });
    };
    this.view.toggleButtons.btnToggleLeft.onClick = function(){
      scopeObj.showContactDetailsScreenUI(2);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],1);
    };
    this.view.toggleButtons.btnToggleRight.onClick = function(){
      scopeObj.showContactDetailsScreenUI(1);
      scopeObj.toggleButtonsUtilFunction([scopeObj.view.toggleButtons.btnToggleLeft,scopeObj.view.toggleButtons.btnToggleRight],2);
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

    this.view.btnContactsBusinessEdit.onClick = function(){
      scopeObj.view.flxGeneralInfoWrapper.flxGeneralInfoEditButton.onClick();
    };
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.btnEnrollNow.onClick=function(){
     /* var id =scopeObj.presenter.getCurrentCustomerDetails().Customer_id;
      scopeObj.sendActivationCode(id);*/
      var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
      var context = {"navParam":{"legalEntityId":legalEntityId || ""}}
      scopeObj.presenter.showEnrollNowScreen(false, context);
    };
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxResendActivationCode.onClick=function(){
      var confirmAction = function () {
        var id = scopeObj.presenter.getCurrentCustomerDetails().Customer_id || scopeObj.presenter.getCurrentCustomerDetails().primaryCustomerId;
        scopeObj.sendActivationCode(id);
      };
      var cancelAction = function () { };
      scopeObj.AdminConsoleCommonUtils.openConfirm({
        header: 'Confirmation',
        message: 'If you regenerate an activation code, the old code will be invalidated and the new code will be shared with the customer',
        confirmAction: confirmAction,
        cancelMsg: 'NO',
        cancelAction: cancelAction,
        confirmMsg: 'YES',

      }, scopeObj);
    };
    
  },  

  setDataForContactScreen: function(contactInfo) {
    this.EmptyCommunication();
    //
    this.view.ContactPrefTimeMethod.btnEdit.setVisibility(true);
    this.view.Address.btnAdd.setVisibility(false);
    this.view.Address.btnEdit.setVisibility(true);
    this.view.ContactNum.btnAdd.setVisibility(false);
    this.view.ContactNum.btnEdit.setVisibility(true);
    this.view.ContactEmail.btnAdd.setVisibility(false);
    this.view.ContactEmail.btnEdit.setVisibility(true);
    //Populate address data
    var finalAddress, addressCount = 1, i;
    //Handling scenario when no parameters were sent
    contactInfo.Addresses=contactInfo.Addresses? contactInfo.Addresses:[];
    contactInfo.ContactNumbers=contactInfo.ContactNumbers? contactInfo.ContactNumbers:[];
    contactInfo.Emails=contactInfo.ContactNumbers? contactInfo.Emails:[];
    if (contactInfo.Addresses.length === this.contactInfoCount) {
      this.view.Address.btnAdd.setVisibility(false);
    }

    if (contactInfo.ContactNumbers.length === this.contactInfoCount) {
      this.view.ContactNum.btnAdd.setVisibility(false);
    }

    if (contactInfo.Emails && contactInfo.Emails.length === this.contactInfoCount) {
      this.view.ContactEmail.btnAdd.setVisibility(false);
    }

    for (var i = 0; i < this.contactInfoCount && i < contactInfo.Addresses.length; i++) {
      finalAddress = "";
      if (contactInfo.Addresses[i].AddressLine1) {
        finalAddress += contactInfo.Addresses[i].AddressLine1 + ", ";
      }
      if (contactInfo.Addresses[i].AddressLine2) {
        finalAddress += contactInfo.Addresses[i].AddressLine2 + "<br>";
      }
      // if it's coming undefined we're showing empty
      const getParamValueOrEmpty = str => str ? str +", " : "" ;

      finalAddress += getParamValueOrEmpty(contactInfo.Addresses[i].CityName); 
      finalAddress += getParamValueOrEmpty(contactInfo.Addresses[i].RegionName);
      if(contactInfo.Addresses[i].CountryName){
        finalAddress += contactInfo.Addresses[i].CountryName + " ";
      }
      if(contactInfo.Addresses[i].ZipCode){
        finalAddress += contactInfo.Addresses[i].ZipCode;
      }
      var AddressType= kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home");

      for (var j=0;j<this.getAddressTypes.length;j++)
        {
          if(contactInfo.Addresses[i].AddressType===this.getAddressTypes[j].id)
            {
            AddressType=this.getAddressTypes[j].Description;
              break;
            }
        }
      
      if (contactInfo.Addresses[i].isPrimary === "true") {
        this.view.Address.lblAddressPrimary.text = AddressType.toUpperCase();
        this.view.Address.rtxAddressPrimary.text = finalAddress;
		this.view.Address["flxAddressRow1"].setVisibility(true);
      } else if (addressCount < 3) {
        this.view.Address["lblAddressAdditional" + addressCount].text = AddressType.toUpperCase();
        this.view.Address["rtxAddressAdditional" + addressCount].text = finalAddress;
        this.view.Address["lblAddressAdditional" + addressCount].setVisibility(true);
        this.view.Address["btnDeleteAddress" + addressCount].info = {
          "Key": "deleteAddressID",
          "Value": contactInfo.Addresses[i].Address_id
        };
        this.view.Address["btnDeleteAddress" + addressCount].setVisibility(true);
        this.view.forceLayout();
        this.view.Address["flxSeprator" + addressCount].height = this.view.Address["rtxAddressAdditional" + addressCount].frame.height + "px";
        this.view.Address["flxAddressRow"+addressCount].setVisibility(true);
        this.view.Address["flxSeprator" + addressCount].setVisibility(true);
        this.view.Address["btnDeleteAddress" + addressCount].top = (this.view.Address["rtxAddressAdditional" + addressCount].frame.height / 2) + 30 - 17.5 + "px";
        addressCount++;
      }

    }
    // Populate contact numbers data
    var contactCount = 1;

    for (i = 0; i < this.contactInfoCount && i < contactInfo.ContactNumbers.length; i++) {
      var contactTypeText = contactInfo.ContactNumbers[i].Extension;
      if (!this.PhoneNumbersList.contains(contactInfo.ContactNumbers[i].Extension)){
        contactTypeText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other");
      }

      var phoneNumber = contactInfo.ContactNumbers[i].Value;
      if(phoneNumber && phoneNumber.endsWith("-")){
        phoneNumber = phoneNumber.slice(0, phoneNumber.length-1);
      }
      var isd = contactInfo.ContactNumbers[i].phoneCountryCode !== "" ? contactInfo.ContactNumbers[i].phoneCountryCode + "-" : "";
      if (contactInfo.ContactNumbers[i].isPrimary === "true") {
        this.view.ContactNum.lblPrimaryKey.text = contactTypeText.toUpperCase();
        this.view.ContactNum.lblPrimaryValue.text = isd+""+phoneNumber;
		this.view.ContactNum["flxDetailsRow1"].setVisibility(true);
      } else if (contactCount < 3) {
        this.view.ContactNum["lblAdditionalDetailsKey" + contactCount].text = contactTypeText.toUpperCase();
        this.view.ContactNum["lblAdditionalDetailsValue" + contactCount].text = phoneNumber;
        this.view.ContactNum["lblAdditionalDetailsKey" + contactCount].setVisibility(true);
        this.view.ContactNum["btnDeleteAdditionalDetails" + contactCount].info = {
          "Key": "deleteCommunicationID",
          "Value": contactInfo.ContactNumbers[i].id
        };
        this.view.ContactNum["flxDetailsRow"+contactCount].setVisibility(true);
        this.view.ContactNum["btnDeleteAdditionalDetails" + contactCount].setVisibility(true);
        contactCount++;
      }
    }
    //Populate email address data
    var emailCount = 1;
    this.view.ContactEmail.lblDetailsHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Email_IDs");
    var emails = [];
    var primaryEmail = "";
    if(contactInfo.Emails){      
      for (i = 0; i < this.contactInfoCount && i < contactInfo.Emails.length; i++) {
        emails.push(contactInfo.Emails[i].Value);
        var emailTypeText = contactInfo.Emails[i].Extension;
        if (!this.EmailTypesList.contains(contactInfo.Emails[i].Extension)){
          emailTypeText = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other");
        }
        if (contactInfo.Emails[i].isPrimary === "true") {
          this.view.ContactEmail.lblPrimaryKey.text = emailTypeText.toUpperCase();
          this.view.ContactEmail.lblPrimaryValue.text = contactInfo.Emails[i].Value;
          this.view.ContactNum["flxDetailsRow1"].setVisibility(true);
          primaryEmail = contactInfo.Emails[i].Value;
        } else if (emailCount < 3) {
          this.view.ContactEmail["lblAdditionalDetailsKey" + emailCount].text = emailTypeText.toUpperCase();
          this.view.ContactEmail["lblAdditionalDetailsValue" + emailCount].text = contactInfo.Emails[i].Value;
          this.view.ContactEmail["lblAdditionalDetailsKey" + emailCount].setVisibility(true);
          this.view.ContactEmail["btnDeleteAdditionalDetails" + emailCount].info = {
            "Key": "deleteCommunicationID",
            "Value": contactInfo.Emails[i].id
          };
          this.view.ContactNum["flxDetailsRow"+emailCount].setVisibility(true);
          this.view.ContactEmail["btnDeleteAdditionalDetails" + emailCount].setVisibility(true);
          emailCount++;
        }
      }
    }
    this.view.ContactPrefTimeMethod.lblDetailsHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Communication");
    this.view.ContactPrefTimeMethod.lblPrimaryKey.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Preferred_Contact_Method");
    if(!(contactInfo.PreferredContactMethod || contactInfo.PreferredContactTime)){
      this.view.ContactPrefTimeMethod.lblPrimaryValue.text = "N/A";
      this.view.ContactPrefTimeMethod.lblAdditionalDetailsValue1.text = "N/A";
    } else {
      this.view.ContactPrefTimeMethod.lblPrimaryValue.text = contactInfo.PreferredContactMethod ?
      contactInfo.PreferredContactMethod : "N/A";
      this.view.ContactPrefTimeMethod.lblAdditionalDetailsValue1.text = contactInfo.PreferredContactTime ?
      contactInfo.PreferredContactTime : "N/A";
    }
    
    this.view.ContactPrefTimeMethod.lblAdditionalDetailsKey1.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Preferred_Contact_Time");
    this.view.ContactPrefTimeMethod.btnDeleteAdditionalDetails1.setVisibility(false);
    

    if(this.presenter.getCurrentCustomerDetails().isCustomerAccessiable === false){
      //Hide edit and add buttons
      this.view.ContactPrefTimeMethod.btnEdit.setVisibility(false);
      this.view.Address.btnAdd.setVisibility(false);
      this.view.Address.btnEdit.setVisibility(false);
      this.view.ContactNum.btnAdd.setVisibility(false);
      this.view.ContactNum.btnEdit.setVisibility(false);
      this.view.ContactEmail.btnAdd.setVisibility(false);
      this.view.ContactEmail.btnEdit.setVisibility(false);

      //Hide delete buttons
      this.view.Address.btnDeleteAddress1.setVisibility(false);
      this.view.Address.btnDeleteAddress2.setVisibility(false);
      this.view.ContactNum.btnDeleteAdditionalDetails1.setVisibility(false);
      this.view.ContactNum.btnDeleteAdditionalDetails2.setVisibility(false);
      this.view.ContactEmail.btnDeleteAdditionalDetails1.setVisibility(false);
      this.view.ContactEmail.btnDeleteAdditionalDetails2.setVisibility(false);
    }
    this.showContactScreen();
    this.view.forceLayout();
  },
  EmptyCommunication: function (contactInfo) {
    //address
    var addressCount = 2, i;
    this.view.Address.rtxAddressPrimary.text = "N/A";
    for (i = 1; i <= addressCount; i++) {
      this.view.Address["rtxAddressAdditional" + i].text = "";
      this.view.Address["lblAddressAdditional" + i].setVisibility(false);
      this.view.Address["flxSeprator" + i].setVisibility(false);
      this.view.Address["btnDeleteAddress" + i].setVisibility(false);
      this.view.Address["flxAddressRow"+i].setVisibility(false);
    }
    //contact numbers
    var contactCount = 2;
    this.view.ContactNum.lblPrimaryValue.text = "N/A";
    for (i = 1; i <= contactCount; i++) {
      this.view.ContactNum["lblAdditionalDetailsValue" + i].text = "";
      this.view.ContactNum["lblAdditionalDetailsKey" + i].setVisibility(false);
      this.view.ContactNum["btnDeleteAdditionalDetails" + i].setVisibility(false);
      this.view.ContactNum["flxDetailsRow"+i].setVisibility(false);
    }
    //email
    var emailCount = 2;
    this.view.ContactEmail.lblPrimaryValue.text = "N/A";
    for (i = 1; i <= emailCount; i++) {
      this.view.ContactEmail["lblAdditionalDetailsValue" + i].text = "";
      this.view.ContactEmail["lblAdditionalDetailsKey" + i].setVisibility(false);
      this.view.ContactEmail["btnDeleteAdditionalDetails" + i].setVisibility(false);
      this.view.ContactNum["flxDetailsRow"+i].setVisibility(false);
    }
    this.showContactScreen();
  },
  showContactScreen: function () {
    this.view.flxContactWrapper.setVisibility(true);
    this.view.flxContactDetails.setVisibility(true);
    this.view.flxEditContactDetails.setVisibility(false);
    // this.setSkinForInfoTabs(this.view.tabs.btnTabName1); TODO: add this to tabs controller
  },
  setAddressListBoxToDefault: function (target) {
    var data = [];
    data.push(["ADR_TYPE_HOME", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home")]);
    data.push(["ADR_TYPE_WORK", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Work")]);
    data.push(["ADR_TYPE_OTHER", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other")]);
    this.view["EditAddress" + target].lblAddressType.masterData = data;
    this.view["EditAddress" + target].lblAddressType.selectedKey = "ADR_TYPE_HOME";
  },
  resetStateAndCityListbox: function (target) {
    var states = [];
    states.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_State")]);
    this.view["EditAddress" + target].lstboxstate.masterData = states;
  },
  hideAllContactEditScreens: function () {
    this.view.flxEditContactAddress.setVisibility(false);
    this.view.flxEditContactNo.setVisibility(false);
    this.view.flxEditEmailId.setVisibility(false);
    this.view.flxEditTime.setVisibility(false);
  },
  resetAddressValidation: function () {
    for (var i = 0; i < this.contactInfoCount; i++) {
      var count = (i === 0) ? "" : i;
      this.AdminConsoleCommonUtils.showNoError(this.view["EditAddress" + count].txtfldAddressLine1);
      this.AdminConsoleCommonUtils.showNoError(this.view["EditAddress" + count].txtfldZipCode);
      this.AdminConsoleCommonUtils.showNoError(this.view["EditAddress" + count].txtboxCity);
      this.AdminConsoleCommonUtils.showNoError(this.view["EditAddress" + count].lstboxstate);
      this.AdminConsoleCommonUtils.showNoError(this.view["EditAddress" + count].lstboxCountry);
      this.view["EditAddress" + count].flxViewContact.info = {};
      this.view["EditAddress" + count].lblErrorAddressLine1.setVisibility(false);
      this.view["EditAddress" + count].lblErrorZipcode.setVisibility(false);
      this.view["EditAddress" + count].lblErrorCity.setVisibility(false);
      this.view["EditAddress" + count].lblErrorState.setVisibility(false);
      this.view["EditAddress" + count].lblErrorCountry.setVisibility(false);
    }
  },
  setListBoxToDefault: function (context, target) {
    var data = [];
    if (context === "EditEmailId") {
      data.push([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Personal"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Personal")]);
      data.push([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other")]);
    }
    else {
      data.push([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home")]);
      data.push([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mobile"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Mobile")]);
    }
    data.push([kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Work"), kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Work")]);

    this.view["" + context]["lblContactType" + target].masterData = data;
    var defaultValue = (context === "EditEmailId") ? kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Personal")
    : kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home");
    this.view["" + context]["lblContactType" + target].selectedKey = defaultValue;

    this.AdminConsoleCommonUtils.showNoError(this.view["" + context]["txtfldContactNum" + target]);
  },
  setDataForContactEditScreen: function (contactInfo) {
    var i, count, maxIterations, inter;
    this.resetAddressValidation();
    if (contactInfo.subTarget === "Address") {
      //Populate Address details
      for (i = 0; i < this.contactInfoCount; i++) {
        count = (i === 0) ? "" : i;
        this.setAddressListBoxToDefault(count);
        this.view["EditAddress" + count].lblContactHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Address");
        this.view["EditAddress" + count].imgRadio1.src = this.AdminConsoleCommonUtils.radioNotSelected;
        this.view["EditAddress" + count].txtfldAddressLine1.text = "";
        this.view["EditAddress" + count].txtfldAddressLine2.text = "";
        this.view["EditAddress" + count].txtboxCity.text = "";
        this.view["EditAddress" + count].lstboxstate.selectedKey = "lbl1";
        this.view["EditAddress" + count].lstboxCountry.selectedKey = "lbl1";
        this.view["EditAddress" + count].txtfldZipCode.text = "";
        this.view["EditAddress" + count].flxViewContact.info = {};
        this.resetStateAndCityListbox(count);
      }
      contactInfo.Addresses=contactInfo.Addresses?contactInfo.Addresses:[];
      maxIterations = contactInfo.Addresses.length > this.contactInfoCount ?
        this.contactInfoCount : contactInfo.Addresses.length;

      for (i = 0; i < maxIterations; i++) {
        count = (i === 0) ? "" : i;
        if (contactInfo.Addresses[i].isPrimary === "true") {
          this.view["EditAddress" + count].imgRadio1.src = this.AdminConsoleCommonUtils.radioSelected;
        }
        else {
          this.view["EditAddress" + count].imgRadio1.src = this.AdminConsoleCommonUtils.radioNotSelected;
        }

        this.view["EditAddress" + count].flxViewContact.info = {
          "Address_id": contactInfo.Addresses[i].Address_id
        };
        this.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.country"), contactInfo.Addresses[i].Country_id, i);
        this.presenter.getSpecifiedCitiesAndStates(kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.state"), contactInfo.Addresses[i].Region_id, i);

        this.view["EditAddress" + count].lblAddressType.selectedKey = contactInfo.Addresses[i].AddressType;
        this.view["EditAddress" + count].txtfldAddressLine1.text = contactInfo.Addresses[i].AddressLine1;
        this.view["EditAddress" + count].txtfldAddressLine2.text = contactInfo.Addresses[i].AddressLine2 ? contactInfo.Addresses[i].AddressLine2 : "";
        this.view["EditAddress" + count].txtboxCity.text = contactInfo.Addresses[i].CityName;
        this.view["EditAddress" + count].lstboxstate.selectedKey = contactInfo.Addresses[i].Region_id;
        this.view["EditAddress" + count].lstboxCountry.selectedKey = contactInfo.Addresses[i].Country_id;
        this.view["EditAddress" + count].txtfldZipCode.text = contactInfo.Addresses[i].ZipCode;
      }

      this.view.flxContactDetails.setVisibility(false);
      this.view.flxEditContactDetails.setVisibility(true);
      this.hideAllContactEditScreens();
      this.view.flxEditContactAddress.setVisibility(true);
    }

    else if (contactInfo.subTarget === "Phone") {
      //Populate contact details
      this.view.EditContact.lblContactHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Contact_numbers");

      for (i = 1; i <= this.contactInfoCount; i++) {
        this.view.EditContact["contactNumber" + i].txtContactNumber.info = {};
        this.view.EditContact["contactNumber" + i].txtContactNumber.text = "";
        this.view.EditContact["contactNumber" + i].txtISDCode.text = "";
        this.view.EditContact["flxContactError" + i].setVisibility(false);
        this.view.EditContact["imgRadio" + i].src = this.AdminConsoleCommonUtils.radioNotSelected;
        this.setListBoxToDefault("EditContact", i);
      }
      contactInfo.ContactNumbers= contactInfo.ContactNumbers? contactInfo.ContactNumbers:[];
      maxIterations = contactInfo.ContactNumbers.length > this.contactInfoCount ?
        this.contactInfoCount : contactInfo.ContactNumbers.length;

      for (i = 1; i <= maxIterations; i++) {
        var delimeter = contactInfo.ContactNumbers[i - 1].Value.indexOf("-");
        var strLen = contactInfo.ContactNumbers[i - 1].Value.length;
        if ((contactInfo.ContactNumbers[i - 1].Value.substr(delimeter + 1, strLen)).indexOf("-") > -1) {
          inter = (contactInfo.ContactNumbers[i - 1].Value.substr(delimeter + 1, strLen)).indexOf("-");
        } else {
          inter = strLen;
        }
        this.view.EditContact["contactNumber" + i].txtISDCode.text = contactInfo.ContactNumbers[i - 1].phoneCountryCode || "";
        this.view.EditContact["contactNumber" + i].txtContactNumber.text = contactInfo.ContactNumbers[i - 1].Value.substr(delimeter + 1, inter);
        this.view.EditContact["contactNumber" + i].txtContactNumber.info = {
          Key: contactInfo.ContactNumbers[i - 1].id
        };
        if (contactInfo.ContactNumbers[i - 1].isPrimary === "true") {
          this.view.EditContact["imgRadio" + i].src = this.AdminConsoleCommonUtils.radioSelected;
        }

        if(contactInfo.ContactNumbers[i - 1].Extension === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Personal"))
          this.view.EditContact["lblContactType" + i].selectedKey = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Home");
        else if (!this.view.EditContact["lblContactType" + i].masterData.map(function(ele){return ele[0]}).contains(contactInfo.ContactNumbers[i - 1].Extension))
          this.view.EditContact["lblContactType" + i].selectedKey = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other");
        else
          this.view.EditContact["lblContactType" + i].selectedKey = contactInfo.ContactNumbers[i - 1].Extension;

      }

      this.view.flxContactDetails.setVisibility(false);
      this.view.flxEditContactDetails.setVisibility(true);
      this.hideAllContactEditScreens();
      this.view.EditContact.contactNumber1.isVisible = true;
      this.view.EditContact.contactNumber2.isVisible = true;
      this.view.EditContact.contactNumber3.isVisible = true;
      this.view.EditContact.contactNumber1.flxError.isVisible = false;
      this.view.EditContact.contactNumber2.flxError.isVisible = false;
      this.view.EditContact.contactNumber3.flxError.isVisible = false;
      this.view.EditContact.txtfldContactNum1.isVisible = false;
      this.view.EditContact.txtfldContactNum2.isVisible = false;
      this.view.EditContact.txtfldContactNum3.isVisible = false;
      this.view.EditContact.flxContactError1.isVisible = false;
      this.view.EditContact.flxContactError2.isVisible = false;
      this.view.EditContact.flxContactError3.isVisible = false;
      this.view.flxEditContactNo.setVisibility(true);
    }

    else if (contactInfo.subTarget === "Email") {
      //Populate email information
      this.view.EditEmailId.lblContactHeader.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Email_IDs");

      for (i = 1; i <= this.contactInfoCount; i++) {
        this.view.EditEmailId["txtfldContactNum" + i].info = {};
        this.view.EditEmailId["txtfldContactNum" + i].text = "";
        this.view.EditEmailId["flxContactError" + i].setVisibility(false);
        this.view.EditEmailId["imgRadio" + i].src = this.AdminConsoleCommonUtils.radioNotSelected;
        this.setListBoxToDefault("EditEmailId", i);
      }
      contactInfo.Emails= contactInfo.Emails? contactInfo.Emails:[];
      maxIterations = contactInfo.Emails.length > this.contactInfoCount ?
        this.contactInfoCount : contactInfo.Emails.length;

      for (i = 1; i <= maxIterations; i++) {
        this.view.EditEmailId["txtfldContactNum" + i].text = contactInfo.Emails[i - 1].Value;
        this.view.EditEmailId["txtfldContactNum" + i].info = {
          Key: contactInfo.Emails[i - 1].id
        };
        if (contactInfo.Emails[i - 1].isPrimary === "true") {
          this.view.EditEmailId["imgRadio" + i].src = this.AdminConsoleCommonUtils.radioSelected;
        }
        if (!this.view.EditEmailId["lblContactType" + i].masterData.map(function(ele){return ele[0]}).contains(contactInfo.Emails[i - 1].Extension))
          this.view.EditEmailId["lblContactType" + i].selectedKey = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Other");
        else
          this.view.EditEmailId["lblContactType" + i].selectedKey = contactInfo.Emails[i - 1].Extension;
      }

      this.view.flxContactDetails.setVisibility(false);
      this.view.flxEditContactDetails.setVisibility(true);
      this.hideAllContactEditScreens();
      this.view.EditContact.contactNumber1.isVisible = false;
      this.view.EditContact.contactNumber2.isVisible = false;
      this.view.EditContact.contactNumber3.isVisible = false;
      this.view.EditContact.contactNumber1.flxError.isVisible = false;
      this.view.EditContact.contactNumber2.flxError.isVisible = false;
      this.view.EditContact.contactNumber3.flxError.isVisible = false;
      this.view.EditContact.txtfldContactNum1.isVisible = true;
      this.view.EditContact.txtfldContactNum2.isVisible = true;
      this.view.EditContact.txtfldContactNum3.isVisible = true;
      this.view.EditContact.flxContactError1.isVisible = false;
      this.view.EditContact.flxContactError2.isVisible = false;
      this.view.EditContact.flxContactError3.isVisible = false;
      this.view.flxEditEmailId.setVisibility(true);
    }

    else if (contactInfo.subTarget === "PrefTimeMethod") {
      //Populate Time and contact information
      for (i = 1; i <= 2; i++) {
        this.view["imgCheckBox" + i].src = this.AdminConsoleCommonUtils.checkbox;
      }
      var contactMethod = [];
      if (contactInfo.PreferredContactMethod) {
        contactMethod = contactInfo.PreferredContactMethod.indexOf(",") >= 0 ?
          contactInfo.PreferredContactMethod.split(",") : [contactInfo.PreferredContactMethod];
      }
      for (i = 0; i < contactMethod.length; i++) {
        if (contactMethod[i].trim().toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CALL").toUpperCase()) {
          this.view.imgCheckBox1.src = this.AdminConsoleCommonUtils.checkboxSelected;
        } else if (contactMethod[i].trim().toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EMAIL").toUpperCase()) {
          this.view.imgCheckBox2.src = this.AdminConsoleCommonUtils.checkboxSelected;
        }
      }

      for (i = 1; i <= 4; i++) {
        this.view["imgTimeCheckBox" + i].src = this.AdminConsoleCommonUtils.checkbox;
      }
      if (this.view.imgCheckBox1.src === this.AdminConsoleCommonUtils.checkboxSelected) {
        var contactTime = [];
        if (contactInfo.PreferredContactTime) {
          contactTime = contactInfo.PreferredContactTime.indexOf(",") >= 0 ?
            contactInfo.PreferredContactTime.split(",") : [contactInfo.PreferredContactTime];
        }
        for (i = 0; i < contactTime.length; i++) {
          if (contactTime[i].trim().toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Morning").toUpperCase()) {
            this.view.imgTimeCheckBox1.src = this.AdminConsoleCommonUtils.checkboxSelected;
          } else if (contactTime[i].trim().toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Afternoon").toUpperCase()) {
            this.view.imgTimeCheckBox2.src = this.AdminConsoleCommonUtils.checkboxSelected;
          } else if (contactTime[i].trim().toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Evening").toUpperCase()) {
            this.view.imgTimeCheckBox4.src = this.AdminConsoleCommonUtils.checkboxSelected;
          } else if (contactTime[i].trim().toUpperCase() === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Anytime").toUpperCase()) {
            this.view.imgTimeCheckBox3.src = this.AdminConsoleCommonUtils.checkboxSelected;
          }
        }
        this.view.flxContactRow2.setVisibility(true);
      } else {
        this.view.flxContactRow2.setVisibility(false);
      }
      //Set visibility
      this.view.flxContactDetails.setVisibility(false);
      this.view.flxEditContactDetails.setVisibility(true);
      this.hideAllContactEditScreens();
      this.view.flxEditTime.setVisibility(true);
    }
    this.view.forceLayout();
    this.view.flxMainContent.scrollToWidget(this.view.flxOtherInfoWrapper);
  },
  populateAllListBoxes: function (AddressModel) {
    var states = [], countries = [];
    states.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_State")]);
    countries.push(["lbl1", kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Select_a_Country")]);
    var i;
    for (i = 0; i < AddressModel.countries.length; i++) {
      countries.push([AddressModel.countries[i].id, AddressModel.countries[i].Name]);
    }

    for (i = 0; i < this.contactInfoCount; i++) {
      var count = (i === 0) ? "" : i;
      this.view["EditAddress" + count].lstboxstate.masterData = states;
      this.view["EditAddress" + count].lstboxCountry.masterData = countries;
    }
    this.view.forceLayout();
  },
  populateTargetedListBoxes: function (targetAddressModel) {
    var count = (targetAddressModel.target === 0) ? "" : targetAddressModel.target;

    if (targetAddressModel.states) {
      this.view["EditAddress" + count].lstboxstate.masterData = targetAddressModel.states;
    }
    if (targetAddressModel.cities) {
      //this.view["EditAddress" + count].lstboxCity.masterData = targetAddressModel.cities;
    }
    this.view.forceLayout();
  },
  validateEditOrAddAddress: function () {
    var flag = 0;
    for (var i = 0; i < this.contactInfoCount; i++) {
      if (this.isAddressEntered(i)) {
        flag += this.validateTargetedAddress(i);
      }
    }
    if (flag === 0)
      return true;
    return false;
  },
  validateTargetedAddress: function (target) {
    var count = (target === 0) ? "" : target;
    var flag = 0;
    if (this.view["EditAddress" + count].txtfldAddressLine1.text === "") {
      this.AdminConsoleCommonUtils.showError(this.view["EditAddress" + count].txtfldAddressLine1);
      this.view["EditAddress" + count].lblErrorAddressLine1.setVisibility(true);
      flag++;
    }
    if (this.view["EditAddress" + count].txtfldZipCode.text === "") {
      this.AdminConsoleCommonUtils.showError(this.view["EditAddress" + count].txtfldZipCode);
      this.view["EditAddress" + count].lblErrorZipcode.setVisibility(true);
      flag++;
    }
    if (this.view["EditAddress" + count].txtboxCity.text === "") {
      this.AdminConsoleCommonUtils.showError(this.view["EditAddress" + count].txtboxCity);
      this.view["EditAddress" + count].lblErrorCity.setVisibility(true);
      flag++;
    }
    if (this.view["EditAddress" + count].lstboxstate.selectedKey === "lbl1") {
      this.AdminConsoleCommonUtils.showError(this.view["EditAddress" + count].lstboxstate);
      this.view["EditAddress" + count].lblErrorState.setVisibility(true);
      flag++;
    }
    if (this.view["EditAddress" + count].lstboxCountry.selectedKey === "lbl1") {
      this.AdminConsoleCommonUtils.showError(this.view["EditAddress" + count].lstboxCountry);
      this.view["EditAddress" + count].lblErrorCountry.setVisibility(true);
      flag++;
    }
    return flag;
  },
  isAddressEntered: function (target) {
    var count = (target === 0) ? "" : target;
    if (this.view["EditAddress" + count].txtfldAddressLine1.text !== "") return true;
    if (this.view["EditAddress" + count].txtfldAddressLine2.text !== "") return true;
    if (this.view["EditAddress" + count].txtboxCity.text !== "") return true;
    if (this.view["EditAddress" + count].lstboxstate.selectedKey !== "lbl1") return true;
    if (this.view["EditAddress" + count].lstboxCountry.selectedKey !== "lbl1") return true;
    if (this.view["EditAddress" + count].txtfldZipCode.text !== "") return true;
    if (this.view["EditAddress" + count].imgRadio1.src === this.AdminConsoleCommonUtils.radioSelected) return true;
    if (this.view["EditAddress" + count].flxViewContact.info.Address_id) return true;

    return false;
  },
  validateCommunicationDetails: function (Type) {
    var flag = 0;
    for (var i = 1; i <= this.contactInfoCount; i++) {
      if (this.isCommunicationEntered(Type, i)) {
        flag += this.validateTargetedCommunication(Type, i);
      }
    }
    if (flag === 0)
      return true;
    return false;
  },
  isCommunicationEntered: function (Type, target) {
    if (Type === "EditContact") {
      if (this.view["" + Type]["contactNumber" + target].txtContactNumber.text !== "") return true;
      if (this.view["" + Type]["imgRadio" + target].src === this.AdminConsoleCommonUtils.radioSelected) return true;
      if (this.view["" + Type]["contactNumber" + target].txtContactNumber.info.Key) return true;
    } else {
      if (this.view["" + Type]["txtfldContactNum" + target].text !== "") return true;
      if (this.view["" + Type]["imgRadio" + target].src === this.AdminConsoleCommonUtils.radioSelected) return true;
      if (this.view["" + Type]["txtfldContactNum" + target].info.Key) return true;
    }
    return false;
  },
  validateTargetedCommunication: function (Type, target) {
    var flag = 0;
    var emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneReg = /^\d{10}$/;
    var ISD = /^\+(\d{1,3}|\d{1,3})$/;
    if (Type === "EditContact") {
      if (!(phoneReg.test(this.view["" + Type]["contactNumber" + target].txtContactNumber.text))) {
        this.AdminConsoleCommonUtils.showError(this.view["" + Type]["contactNumber" + target].txtContactNumber);
        this.view.EditContact["flxContactError" + target].setVisibility(true);
        this.view.EditContact["lblErrorContact" + target].setVisibility(true);
        this.view.EditContact["lblErrorContact" + target].text = "Invalid contact number";
        flag++;
      }
      if (this.view["" + Type]["contactNumber" + target].txtContactNumber.text === "") {
        this.view["" + Type]["flxContactError" + target].setVisibility(true);
        this.view["" + Type]["lblErrorContact" + target].text = "Contact number cannot be empty";
        this.AdminConsoleCommonUtils.showError(this.view["" + Type]["contactNumber" + target].txtContactNumber);
        flag++;
      }
      if ((!(ISD.test(this.view["" + Type]["contactNumber" + target].txtISDCode.text))) || this.view["" + Type]["contactNumber" + target].txtISDCode.text.length > 4) {
        this.AdminConsoleCommonUtils.showError(this.view["" + Type]["contactNumber" + target].txtISDCode);
        this.view.EditContact["flxContactError" + target].setVisibility(true);
        this.view.EditContact["lblErrorContact" + target].text = "Invalid ISD code";
        flag++;
      }
      if (this.view["" + Type]["contactNumber" + target].txtISDCode.text === "") {
        this.AdminConsoleCommonUtils.showError(this.view["" + Type]["contactNumber" + target].txtISDCode);
        this.view.EditContact["flxContactError" + target].setVisibility(true);
        this.view.EditContact["lblErrorContact" + target].text = "ISD code cannot be empty";
        flag++;
      }

    } else if (Type === "EditEmailId") {
      if (!(emailReg.test(this.view["" + Type]["txtfldContactNum" + target].text))) {
        this.AdminConsoleCommonUtils.showError(this.view["" + Type]["txtfldContactNum" + target]);
        this.view.EditEmailId["flxContactError" + target].setVisibility(true);
        this.view.EditEmailId["lblErrorContact" + target].setVisibility(true);
        this.view.EditEmailId["lblErrorContact" + target].text = "Invalid email";
        flag++;
      }
      if (this.view["" + Type]["txtfldContactNum" + target].text === "") {
        this.view["" + Type]["flxContactError" + target].setVisibility(true);
        this.view["" + Type]["lblErrorContact" + target].setVisibility(true);
        this.view["" + Type]["lblErrorContact" + target].text = "Email cannot be empty";
        this.AdminConsoleCommonUtils.showError(this.view["" + Type]["txtfldContactNum" + target]);
        flag++;
      }
    }
    return flag;
  },
  togglePreferredTimeByCall: function () {

    if (this.view.imgCheckBox1.src === this.AdminConsoleCommonUtils.checkboxSelected) {
      this.view.imgTimeCheckBox1.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.imgTimeCheckBox2.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.imgTimeCheckBox3.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.imgTimeCheckBox4.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.flxContactRow2.setVisibility(true);
    } else {
      this.view.imgTimeCheckBox1.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.imgTimeCheckBox2.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.imgTimeCheckBox3.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.imgTimeCheckBox4.src = this.AdminConsoleCommonUtils.checkbox;
      this.view.flxContactRow2.setVisibility(false);
    }
  },
  toggleAnyTime: function (widget) {

    if (widget === this.view.imgTimeCheckBox1 || widget === this.view.imgTimeCheckBox2 || widget === this.view.imgTimeCheckBox3) {
      if (this.view.imgTimeCheckBox1.src === this.AdminConsoleCommonUtils.checkboxSelected && this.view.imgTimeCheckBox2.src === this.AdminConsoleCommonUtils.checkboxSelected && this.view.imgTimeCheckBox3.src === this.AdminConsoleCommonUtils.checkboxSelected) {
        this.view.imgTimeCheckBox4.src = this.AdminConsoleCommonUtils.checkboxSelected;

      } else {
        this.view.imgTimeCheckBox4.src = this.AdminConsoleCommonUtils.checkbox;
      }
    } else if (widget === this.view.imgTimeCheckBox4) {
      if (this.view.imgTimeCheckBox4.src === this.AdminConsoleCommonUtils.checkboxSelected) {
        this.view.imgTimeCheckBox1.src = this.AdminConsoleCommonUtils.checkboxSelected;
        this.view.imgTimeCheckBox2.src = this.AdminConsoleCommonUtils.checkboxSelected;
        this.view.imgTimeCheckBox3.src = this.AdminConsoleCommonUtils.checkboxSelected;

      } else {
        this.view.imgTimeCheckBox1.src = this.AdminConsoleCommonUtils.checkbox;
        this.view.imgTimeCheckBox2.src = this.AdminConsoleCommonUtils.checkbox;
        this.view.imgTimeCheckBox3.src = this.AdminConsoleCommonUtils.checkbox;

      }
    }
  },
  selectRadioButtons: function (selectedButton, buttonsArray) {
    for (var i = 0; i < buttonsArray.length; i++) {
      buttonsArray[i].src = this.AdminConsoleCommonUtils.radioNotSelected;
    }
    selectedButton.src = this.AdminConsoleCommonUtils.radioSelected;
  },
  /*
  * show /hide the retail/business toggle buttons
  * @param: opt - 1(all other types)/2(combined type)
  */
  showHideToggleButtons : function(opt){
    if(opt === 1){
      this.view.flxToggleButtonsContainer.setVisibility(false);
      this.view.flxSeperatorContactsBB.setVisibility(false);
    } else{
      this.view.flxToggleButtonsContainer.setVisibility(true);
      this.view.flxSeperatorContactsBB.setVisibility(true);
      this.toggleButtonsUtilFunction([this.view.toggleButtons.btnToggleLeft,this.view.toggleButtons.btnToggleRight],1);
    }
    this.view.forceLayout();
  },
  /*
   * show contact details screen for business user
   * @param: opt 1(business type)/2(all other types)
  */
  showContactDetailsScreenUI : function(opt){
    if(opt === 1){ //for business type
      this.view.flxContactDetails.setVisibility(false);
      this.view.flxContactDetailsBB.setVisibility(true);
      this.view.contactNumBB.btnAdd.setVisibility(false);
      this.view.contactNumBB.btnEdit.setVisibility(true);
      this.view.contactNumBB.lblPrimaryValue.setVisibility(false);
      this.view.contactNumBB.flxAdditionalDetails1.setVisibility(false);
      this.view.contactNumBB.flxDetailsRow2.setVisibility(false);
      this.view.contactEmailBB.flxButtons.setVisibility(false);
      this.view.contactEmailBB.lblPrimaryValue.setVisibility(false);
      this.view.contactEmailBB.flxAdditionalDetails1.setVisibility(false);
      this.view.contactEmailBB.flxDetailsRow2.setVisibility(false);
      this.view.contactNumBB.lblPrimaryKey.skin = "sknLatoSemibold485c7313px";
      this.view.contactEmailBB.lblPrimaryKey.skin = "sknLatoSemibold485c7313px";
      this.view.flxEditContactDetails.setVisibility(false);
    } else{
      this.view.flxContactDetails.setVisibility(true);
      this.view.flxContactDetailsBB.setVisibility(false);
      this.view.flxEditContactDetails.setVisibility(false);
    }
    this.view.forceLayout();
  },
  /*
   * set contact details data for business user
  */
  setDataForContactScreenBusiness : function(contactDetails){
    this.view.contactEmailBB.lblPrimaryKey.text=contactDetails.email.Value||"N/A";
    this.view.contactNumBB.lblPrimaryKey.text=contactDetails.phone.Value||"N/A";
    this.view.contactNumBB.flxPrimaryCommunication.setVisibility(contactDetails.phone.isPrimary==="true"?true:false);
    this.view.contactEmailBB.flxPrimaryCommunication.setVisibility(contactDetails.email.isPrimary==="true"?true:false);
    this.view.forceLayout();
  },
  segregateContactsForBusinessAndRetail : function(contactDetails){
    
    var contactDetailsBB={
      "address":"N/A",
      "phone":"N/A",
      "email":"N/A"
    };
    //Combined user
    if(this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0 &&
                    this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.RETAIL_TYPE)>= 0){
    var i=0;
      //Addresses
      if(contactDetails.Addresses){
        for(i=0;i<contactDetails.Addresses.length;i++){
          if(contactDetails.Addresses[i].isTypeBusiness==="1"){
            contactDetailsBB.address=contactDetails.Addresses[i];
            contactDetails.Addresses.pop(i);
          }
        }
      }
      //phone
      if(contactDetails.ContactNumbers){
        for(i=0;i<contactDetails.ContactNumbers.length;i++){
          if(contactDetails.ContactNumbers[i].isTypeBusiness==="1"){
            contactDetailsBB.phone=contactDetails.ContactNumbers[i];
            contactDetails.ContactNumbers.pop(i);
          }
        }
      }
      //email
      if(contactDetails.Emails){
        for(i=0;i<contactDetails.Emails.length;i++){
          if(contactDetails.Emails[i].isTypeBusiness==="1"){
            contactDetailsBB.email=contactDetails.Emails[i];
            contactDetails.Emails.pop(i);
          }
        }
      }
    }
    else if(this.customerType.indexOf(this.AdminConsoleCommonUtils.constantConfig.BUSINESS_TYPE)>= 0){
      if(contactDetails.ContactNumbers && contactDetails.ContactNumbers[0])
        contactDetailsBB.phone=contactDetails.ContactNumbers[0];
      if(contactDetails.Emails && contactDetails.Emails[0])
        contactDetailsBB.email=contactDetails.Emails[0]; 
    }
    this.contactInfo=contactDetails;
    this.contactInfoBB=contactDetailsBB;
  }, 
  resetContactsTab : function(){
    var self=this;
    self.view.ContactPrefTimeMethod.lblPrimaryValue.text="N/A";
    self.view.ContactPrefTimeMethod.lblAdditionalDetailsValue1.text="N/A";
    self.view.Address.rtxAddressPrimary.text="N/A";
    self.view.Address.rtxAddressAdditional1.text="N/A";
    self.view.Address.rtxAddressAdditional2.text="N/A";
    self.view.ContactNum.lblPrimaryValue.text="N/A";
    self.view.ContactNum.lblAdditionalDetailsValue1.text="N/A";
    self.view.ContactNum.lblAdditionalDetailsValue2.text="N/A";
    self.view.ContactEmail.lblPrimaryValue.text="N/A";
    self.view.ContactEmail.lblAdditionalDetailsValue1.text="N/A";
    self.view.ContactEmail.lblAdditionalDetailsValue2.text="N/A";
    self.view.contactEmailBB.lblPrimaryKey.text="N/A";
    self.view.contactNumBB.lblPrimaryKey.text="N/A";
   
  },
  setScreenForUnEnrolled:function(basicInfo) {
    this.view.flxGeneralInfoWrapper.setVisibility(false);
    this.view.flxGeneralInfoWrapperUnEnrolled.setVisibility(true);
    this.view.flxGeneralInfoWrapperUnEnrolled.row1.lblHeading1.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSN_HEADER");
    this.view.flxGeneralInfoWrapperUnEnrolled.row1.lblHeading2.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.DATE_OF_BIRTH");
    this.view.flxGeneralInfoWrapperUnEnrolled.row1.lblHeading3.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.CUSTOMER_ID");
    this.view.flxGeneralInfoWrapperUnEnrolled.row2.lblHeading1.text=kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.MOBILE_ONLINE_BAKING_ACCESS");
    this.view.flxGeneralInfoWrapperUnEnrolled.row1.lblData1.text=basicInfo.customer.SSN ?basicInfo.customer.SSN : "N/A";
    this.view.flxGeneralInfoWrapperUnEnrolled.row1.lblData2.text=basicInfo.customer.DateOfBirth ? basicInfo.customer.DateOfBirth : "N/A";
    this.view.flxGeneralInfoWrapperUnEnrolled.row1.lblData3.text = basicInfo.customer.primaryCustomerId || kony.i18n.getLocalizedString("i18n.common.NA");
    this.view.flxGeneralInfoWrapperUnEnrolled.row2.lblData1.text="UnEnrolled";
    if(basicInfo.customer.hasOwnProperty('Salutation') && basicInfo.customer.Salutation.length!==0){
      this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblCustomerName.text = basicInfo.customer.Salutation + " " + basicInfo.customer.Name;
    } else {
      this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblCustomerName.text = basicInfo.customer.Name;
    }
   //unenrolled
    if(basicInfo.customer.isProfileExist === "false"){
      this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxNotification.setVisibility(false);
      this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxRightDetailsCont.setVisibility(true);
      this.view.forceLayout();
    }
    this.view.tabs.btnTabName9.setVisibility(false);
    this.view.tabs.btnTabName2.setVisibility(false);
    this.view.tabs.btnTabName3.setVisibility(false);
    this.view.tabs.btnTabName4.setVisibility(false);
    this.view.tabs.btnTabName5.setVisibility(false);
    this.view.tabs.btnTabName6.setVisibility(false);
    this.view.tabs.btnTabName7.setVisibility(false);
    this.view.tabs.btnTabName8.setVisibility(false);
    this.view.tabs.btnTabName10.setVisibility(false);
    // this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxRightDetailsCont.setVisibility(true);
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxTagsandbuttons.setVisibility(false);
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.flxDefaultSearchHeader.top ="5dp";
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblStatus.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.New");
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.lblStatus.skin = "sknlblLato5bc06cBold14px";
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.fonticonActive.text = "";
    this.view.flxGeneralInfoWrapperUnEnrolled.generalInfoHeader.fonticonActive.skin = "sknIcon039dffBlue12px";
  },
sendActivationCode : function(id)
{
 
   
  if (this.contactInfo.ContactNumbers&&this.contactInfo.ContactNumbers.length===0)
        {
          this.view.flxNoCodeError.setVisibility(true);
        }
      if (this.contactInfo.Emails&&this.contactInfo.Emails.length===0)
        {
          this.view.flxNoCodeErrorContact.setVisibility(true);
        }
      if(this.contactInfo.ContactNumbers.length!==0 && this.contactInfo.Emails.length!==0)
	{
      this.presenter.sendActivationCode({ "customerID":id }, "InfoScreen");
    }
    
},
  getAddressType : function(){
    this.presenter.getAddressTypes();
  },
});

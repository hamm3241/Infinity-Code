define(['Regexes'], function(Regexes){
  return { 
    applicantInfo:{},
    preshowActions:function(){
      this.setFlowActions();
      this.hideAllOptionsButtonImages();
      this.view.flxUsernameRules.setVisibility(false);
      this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendar";
      this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
      this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.AssistOnBoarding");
      this.view.flxAddMainContainer.setVisibility(true);
      this.tabUtilVerticleArrowVisibilityFunction(
        [this.view.fontIconRightArrow2,
         this.view.fontIconRightArrow3,
         this.view.fontIconRightArrow4,
         this.view.fontIconRightArrow5],this.view.fontIconRightArrow2);
      this.view.flxDetailContentContainer.setVisibility(true);
      this.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.fillOutTheAddressToCheckUSPSValidation");
      this.view.lblUSPSButton.isVisible = false;
      this.view.lblUSPSButton.text = "";
      this.view.lblUSPSIcon.isVisible=false;
      this.view.lblUSPStext.isVisible=true;
      this.view.forceLayout();
      this.USPSWidth();
      this.view.breadcrumbs.btnBackToMain.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.customer");
      this.view.breadcrumbs.lblCurrentScreen.text=kony.i18n.getLocalizedString("i18n.Common.Breadcrumbs.NewCustomer");
      this.view.flxAddIdInfo.setVisibility(false);
      this.view.flxTermsAndCoditions.setVisibility(false);
      this.view.btnAddUsersSave.text=kony.i18n.getLocalizedString("i18n.permission.NEXT");
      this.view.flxUserNameError.isVisible = false;
      // this.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.fillOutTheAddressToCheckUSPSValidation");
      this.view.lblUSPSIcon.isVisible=false;
      var widgetArray = [this.view.btnPersonalDetails,this.view.btnIdInfo,this.view.btnTermsAndCond];
      this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnPersonalDetails);
      this.view.btnAddUsersSave.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.btnAddUsersSave.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
      this.view.btnAddUsersSave.setEnabled(true);
      this.view.map1.mapLocations.mapKey=this.presenter.getGoogleMapAPIKeys();
      this.view.chbxConsent.selectedKeys=null;
      this.view.flxNoChbx.setVisibility(false);
      this.clearAllFields();
      this.view.forceLayout();
    },
    USPSWidth:function(){
      this.view.flxUSPSContainer.width = "283px";//this.view.lblUSPSIcon.frame.width+this.view.lblUSPStext.frame.width+this.view.lblUSPSButton.frame.width+4+"px";
      this.view.flxUSPSContainer.isVisible = true;
      this.view.forceLayout();
    },
    FocusOnError:function(){
      this.view.flxDetailContentContainer.setContentOffset({
        y:0,
        x:0
      });
    },
    clearAllFields:function(){
      this.view.flxNoNameError.isVisible = false;
      this.view.tbxNameValue.skin = "skntbxLato35475f14px";
      this.view.tbxNameValue.text = "";     
      this.view.tbxMiddleName.text = "";    
      this.view.flxNoLastNameError.isVisible = false;
      this.view.tbxLastName.skin = "skntbxLato35475f14px";
      this.view.tbxLastName.text = "";
      this.view.flxNoEmailError.isVisible = false;
      this.view.tbxEmailValue.skin = "skntbxLato35475f14px";
      this.view.tbxEmailValue.text = "";
      this.view.flxNoDOBError.isVisible = false;
      this.view.flxDOBValue.skin = "sknFlxCalendar";
      this.view.datePicker.value = "";
      this.view.flxNoSSN.isVisible = false;
      this.view.tbxSSN.skin = "skntbxLato35475f14px";
      this.view.tbxSSN.text = "";
      this.view.flxNoMotherMaidenNameError.isVisible = false;
      this.view.tbxMotherMaidenName.skin = "skntbxLato35475f14px";
      this.view.tbxMotherMaidenName.text = "";
      this.view.flxUserNameError.isVisible = false;
      this.view.textBoxEntryAsst.tbxEnterValue.skin = "skntbxLato35475f14px";
      this.view.textBoxEntryAsst.tbxEnterValue.text = "";
      this.view.flxNoPhoneNumberError.isVisible = false;
      this.view.contactNumber.txtContactNumber.skin = "skntbxLato35475f14px";
      this.view.contactNumber.txtContactNumber.text = "";  
      this.view.contactNumber.txtISDCode.skin = "skntbxLato35475f14px";
      this.view.contactNumber.txtISDCode.text = "";  
      this.view.tbxExtension.text = "";
      this.view.tbxSearch.text = "";
      this.view.segSearch.isVisible = false;
      this.view.tbxStreetName.skin = "skntbxLato35475f14px";
      this.view.tbxStreetName.text = "";
      this.view.tbxBuildingName.skin = "skntbxLato35475f14px";
      this.view.tbxBuildingName.text = "";
      this.view.flxNoAddressError.isVisible = false;
      this.view.tbxZipCode.skin = "skntbxLato35475f14px";
      this.view.tbxZipCode.text = "";
      this.view.typeHeadCity.tbxSearchKey.skin = "skntbxLato35475f14px";
      this.view.typeHeadCity.tbxSearchKey.text = "";
      this.view.typeHeadState.tbxSearchKey.skin = "skntbxLato35475f14px";
      this.view.typeHeadState.tbxSearchKey.text = "";
      this.view.typeHeadCountry.tbxSearchKey.skin = "skntbxLato35475f14px";
      this.view.typeHeadCountry.tbxSearchKey.text = "";
      this.view.lblNameCount.text = kony.i18n.getLocalizedString("i18n.frmUsers.lblFirstNameCount");
      this.view.lblMiddleNameCount.text = kony.i18n.getLocalizedString("i18n.frmUsers.lblFirstNameCount");
      this.view.lblLastNameCount.text = kony.i18n.getLocalizedString("i18n.frmUsers.lblFirstNameCount");
      this.view.lblEmailCount.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.lblEmailCount");
      this.view.lblSSNCount.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.lblSSNCount");
      this.view.lblMotherMaidenNameCount.text = kony.i18n.getLocalizedString("i18n.frmUsers.lblFirstNameCount");
    },
    clearValidations : function(widget,errorFlex,type){
      if (type === 1)
        widget.skin = "skntbxLato35475f14px";
      else if(type === 2)
        widget.skin = "sknFlxCalendar";
      errorFlex.setVisibility(false);
    }, 
    setFlowActions:function(){
      var scopeObj=this;
      this.view.lblRules.onClick = function() {
        scopeObj.rulesLabelClick();
      };
      this.view.breadcrumbs.btnBackToMain.onClick=function(){
        scopeObj.presenter.displayCustomerMangement();
      };
      this.view.flxDOBValue.onTouchStart = function(){
        scopeObj.clearValidations(scopeObj.view.flxDOBValue,scopeObj.view.flxNoDOBError,2);
      };
      this.view.flxDriversIssueDateErrorBorder.onTouchStart = function(){
        if(scopeObj.view.calDriversLicenceIssueDate.value !== '' && scopeObj.view.flxDriversIssueDateErrorBorder.skin === scopeObj.calenderFlexBorderErrorSkin){
          scopeObj.view.flxDriversIssueDateErrorBorder.skin = scopeObj.calenderFlexBorderSkin;
          scopeObj.view.flxDriversIssueDateError.setVisibility(false);
        }
      };
      this.view.flxDriversExpiryDateErrorBorder.onTouchStart = function(){
        if(scopeObj.view.calDriversLicenceExpiryDate.value !== '' && scopeObj.view.flxDriversExpiryDateErrorBorder.skin === scopeObj.calenderFlexBorderErrorSkin){
          scopeObj.view.flxDriversExpiryDateErrorBorder.skin = scopeObj.calenderFlexBorderSkin;
          scopeObj.view.flxDriversExpiryDateError.setVisibility(false);
        }
      };
      this.view.flxPassportIssueDateErrorBorder.onTouchStart = function(){
        if(scopeObj.view.calPassportIssueDate.value !== '' && scopeObj.view.flxPassportIssueDateErrorBorder.skin === scopeObj.calenderFlexBorderErrorSkin){
          scopeObj.view.flxPassportIssueDateErrorBorder.skin = scopeObj.calenderFlexBorderSkin;
          scopeObj.view.flxPassportIssueDateError.setVisibility(false);
        }
      };
      this.view.flxPassportExpiryDateErrorBorder.onTouchStart = function(){
        if(scopeObj.view.calPassportExpiryDate.value !== '' && scopeObj.view.flxPassportExpiryDateErrorBorder.skin === scopeObj.calenderFlexBorderErrorSkin){
          scopeObj.view.flxPassportExpiryDateErrorBorder.skin = scopeObj.calenderFlexBorderSkin;
          scopeObj.view.flxPassportExpiryDateError.setVisibility(false);
        }
      };
      this.view.btnPersonalDetails.onClick=function(){
        scopeObj.showAddDetailsInfo();
        scopeObj.getAddressSegmentData();
      };
      this.view.btnIdInfo.onClick=function(){
        if(scopeObj.view.flxTermsAndCoditions.isVisible===true)
          scopeObj.showAddIdInfo();
        else
          scopeObj.view.btnAddUsersSave.onClick();
      };
      this.view.btnTermsAndCond.onClick=function(){
        //kony.adminConsole.utils.showProgressBar(scopeObj.view);
        if(scopeObj.view.flxTermsAndCoditions.isVisible===false)
          scopeObj.view.btnAddUsersSave.onClick();
        else
          return true;
      };
      this.view.btnAddUsersCancel.onClick=function(){
        scopeObj.view.popUp.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.are_you_sure");
        scopeObj.view.popUp.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.you_will_Lose_all_Current_Edits");
        scopeObj.view.flxCancelPopup.setVisibility(true);
      };
      this.view.popUp.flxPopUpClose.onClick=function(){
        scopeObj.view.flxCancelPopup.setVisibility(false);
      };
      this.view.submitPopUp.flxPopUpClose.onClick=function(){
        scopeObj.view.flxSubmitPopup.setVisibility(false);
      };
      this.view.popUp.btnPopUpCancel.onClick=function(){
        scopeObj.view.flxCancelPopup.setVisibility(false);
      };
      this.view.tbxSearch.onKeyUp = function(){
        scopeObj.getGoogleSuggestion(scopeObj.view.tbxSearch.text);
      };
      this.view.segSearch.onRowClick = function(){
        scopeObj.mappingRowToWidgets();
      };
      this.view.chbxConsent.onTouchEnd = function(){
        if( scopeObj.view.flxNoChbx.isVisible===true){
          scopeObj.view.flxNoChbx.setVisibility(false);
        }      
      };
      this.view.tbxNameValue.onEndEditing = function(){
        scopeObj.view.lblNameCount.setVisibility(false);
      };
      this.view.flxSSNDuplicateClose.onTouchStart = function(){
        scopeObj.view.flxDuplicateSSN.isVisible = false;
      };
      this.view.tbxNameValue.onTouchStart = function(){
        scopeObj.clearValidations(scopeObj.view.tbxNameValue,scopeObj.view.flxNoNameError,1);
      };
      this.view.tbxNameValue.onKeyUp = function(){
        if(scopeObj.view.tbxNameValue.text.trim().length===0)
        {
          scopeObj.view.lblNameCount.isVisible = false;
        }
        else
        {
          scopeObj.view.lblNameCount.text=scopeObj.view.tbxNameValue.text.trim().length+"/35";
          scopeObj.view.lblNameCount.setVisibility(true);
        }
        scopeObj.view.forceLayout(); 
      };
      this.view.tbxMiddleName.onEndEditing = function(){
        scopeObj.view.lblMiddleNameCount.setVisibility(false);
      };
      this.view.tbxMiddleName.onKeyUp = function(){
        if(scopeObj.view.tbxMiddleName.text.trim().length===0)
        {
          scopeObj.view.lblMiddleNameCount.isVisible = false;
        }
        else
        {
          scopeObj.view.lblMiddleNameCount.text=scopeObj.view.tbxMiddleName.text.trim().length+"/35";
          scopeObj.view.lblMiddleNameCount.setVisibility(true);
        }
        scopeObj.view.forceLayout(); 
      };
      this.view.tbxStreetName.onKeyUp = function(){
        scopeObj.isAddressNull();
        scopeObj.isAddressValidated();

      };
      this.view.typeHeadCountry.tbxSearchKey.onKeyUp = function(){
        scopeObj.isAddressNull();
        scopeObj.isAddressValidated();
      };
      this.view.tbxZipCode.onKeyUp = function(){
        scopeObj.isAddressValidated();
        scopeObj.isAddressNull();
      };
      this.view.typeHeadCity.tbxSearchKey.onKeyUp = function(){
        scopeObj.isAddressValidated();
        scopeObj.isAddressNull();
      };
      this.view.typeHeadState.tbxSearchKey.onKeyUp = function(){
        scopeObj.isAddressValidated();
        scopeObj.isAddressNull();
      };
      this.view.tbxStreetName.onEndEditing = function(){
        scopeObj.isAddressNull();
      };
      this.view.typeHeadCountry.tbxSearchKey.onEndEditing = function(){
        scopeObj.isAddressNull();
      };
      this.view.tbxZipCode.onEndEditing = function(){
        scopeObj.isAddressNull();
      };
      this.view.typeHeadCity.tbxSearchKey.onEndEditing = function(){
        scopeObj.isAddressNull();
      };
      this.view.typeHeadState.tbxSearchKey.onEndEditing = function(){
        scopeObj.isAddressNull();
      };
      this.view.typeHeadCountry.tbxSearchKey.onKeyUp = function(){
        scopeObj.isAddressNull();
        scopeObj.isAddressValidated();
      };
      this.view.tbxLastName.onEndEditing = function(){
        scopeObj.view.lblLastNameCount.setVisibility(false);
      };
      this.view.tbxLastName.onTouchStart = function(){
        scopeObj.clearValidations(scopeObj.view.tbxLastName,scopeObj.view.flxNoLastNameError,1);
      };
      this.view.tbxLastName.onKeyUp = function(){
        if(scopeObj.view.tbxLastName.text.trim().length===0)
        {
          scopeObj.view.lblLastNameCount.isVisible = false;
        }
        else
        {
          scopeObj.view.lblLastNameCount.text=scopeObj.view.tbxLastName.text.trim().length+"/35";
          scopeObj.view.lblLastNameCount.setVisibility(true);
        }
        scopeObj.view.forceLayout(); 
      };
      this.view.tbxEmailValue.onEndEditing = function(){
        scopeObj.view.lblEmailCount.setVisibility(false);
      };
      this.view.tbxEmailValue.onTouchStart = function(){
        scopeObj.clearValidations(scopeObj.view.tbxEmailValue,scopeObj.view.flxNoEmailError,1);
      };
      this.view.tbxEmailValue.onKeyUp = function(){
        if(scopeObj.view.tbxEmailValue.text.trim().length===0)
        {
          scopeObj.view.lblEmailCount.isVisible = false;
        }
        else
        {
          scopeObj.view.lblEmailCount.text=scopeObj.view.tbxEmailValue.text.trim().length+"/70";
          scopeObj.view.lblEmailCount.setVisibility(true);
        }
        scopeObj.view.forceLayout(); 
      };
      this.view.tbxSSN.onBeginEditing = function(){
        scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmAssistedOnboarding_tbxSSN");
      };
      this.view.tbxSSN.onEndEditing = function(){
        scopeObj.view.lblSSNCount.setVisibility(false);
      };
      this.view.tbxSSN.onTouchStart = function(){
        scopeObj.clearValidations(scopeObj.view.tbxSSN,scopeObj.view.flxNoSSN,1);
      };
      this.view.tbxSSN.onKeyUp = function(){
        scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric("frmAssistedOnboarding_tbxSSN");
        if(scopeObj.view.tbxSSN.text.trim().length===0)
        {
          scopeObj.view.lblSSNCount.isVisible = false;
        }
        else
        {
          scopeObj.view.lblSSNCount.text=scopeObj.view.tbxSSN.text.trim().length+"/9";
          scopeObj.view.lblSSNCount.setVisibility(true);
        }
        scopeObj.view.forceLayout(); 
      };
      this.view.flxSSNDuplicateClose.onTouchStart = function(){
        scopeObj.view.flxDuplicateSSN.isVisible = false;
      };
      this.view.tbxMotherMaidenName.onEndEditing = function(){
        scopeObj.view.lblMotherMaidenNameCount.setVisibility(false);
      };
      this.view.tbxMotherMaidenName.onTouchStart = function(){
        scopeObj.clearValidations(scopeObj.view.tbxMotherMaidenName,scopeObj.view.flxNoMotherMaidenNameError,1);
      };
      this.view.tbxMotherMaidenName.onKeyUp = function(){
        if(scopeObj.view.tbxMotherMaidenName.text.trim().length===0)
        {
          scopeObj.view.lblMotherMaidenNameCount.isVisible = false;
        }
        else
        {
          scopeObj.view.lblMotherMaidenNameCount.text=scopeObj.view.tbxMotherMaidenName.text.trim().length+"/35";
          scopeObj.view.lblMotherMaidenNameCount.setVisibility(true);
        }
        scopeObj.view.forceLayout();
      };
      this.view.btnSSNCancel.onClick = function(){
        scopeObj.view.flxDuplicateSSN.isVisible = false;
        scopeObj.presenter.displayCustomerMangement();
      };
      this.view.btnChangeInfo.onClick = function(){
        scopeObj.view.lblUSPSButton.isVisible = false;
        scopeObj.view.lblUSPSButton.text = "";
        scopeObj.view.flxDuplicateSSN.isVisible = false;
        scopeObj.view.tbxStreetName.text = scopeObj.USPSRecommendations.Address2;
        scopeObj.view.typeHeadCity.tbxSearchKey.text = scopeObj.USPSRecommendations.City;
        scopeObj.view.tbxZipCode.text = scopeObj.USPSRecommendations.Zip5;
        scopeObj.view.typeHeadState.tbxSearchKey = scopeObj.USPSRecommendations.State;
        scopeObj.USPSWidth();
        scopeObj.USPSValidated = true;
        scopeObj.USPSWidth();
        scopeObj.view.forceLayout();
      };
      this.view.textBoxEntryAsst.tbxEnterValue.onEndEditing = function(){
        scopeObj.usernameCheck();
      };
      this.view.textBoxEntryAsst.tbxEnterValue.onKeyUp = function(){
        scopeObj.view.textBoxEntryAsst.flxBtnCheck.isVisible = true;
        scopeObj.userNameIsChecked = false;
        scopeObj.showMessageToCheckUserName();
      };
      this.view.textBoxEntryAsst.btnCheck.onTouchStart=function(){
        scopeObj.clearValidations(scopeObj.view.textBoxEntryAsst.tbxEnterValue,scopeObj.view.flxUserNameError,2);
      };
      this.view.textBoxEntryAsst.btnCheck.onClick=function(){
        scopeObj.usernameCheck();
      };
      this.view.lblUSPSButton.onTouchStart = function(){
        scopeObj.addressInput = {
          "Address1": scopeObj.view.tbxBuildingName.text,
          "Address2": scopeObj.view.tbxStreetName.text,
          "City": scopeObj.view.typeHeadCity.tbxSearchKey.text,
          "State": scopeObj.view.typeHeadState.tbxSearchKey.text,
          "Zip5": scopeObj.view.tbxZipCode.text
        };
        scopeObj.presenter.USPSValidations(scopeObj.addressInput);
      };
      this.view.contactNumber.txtContactNumber.onTouchStart = function(){
        scopeObj.AdminConsoleCommonUtils.restrictTextFieldToPhoneNumber('frmAssistedOnboarding_contactNumber_txtContactNumber');
      };
      this.view.contactNumber.txtContactNumber.onKeyUp = function(){
        scopeObj.clearValidations(scopeObj.view.contactNumber.txtContactNumber,scopeObj.view.flxNoPhoneNumberError,1);
      };
      this.view.contactNumber.txtISDCode.onTouchStart = function(){
        scopeObj.AdminConsoleCommonUtils.restrictTextFieldToISDCode('frmAssistedOnboarding_contactNumber_txtISDCode');
      };
      this.view.contactNumber.txtISDCode.onKeyUp = function(){
        scopeObj.clearValidations(scopeObj.view.contactNumber.txtISDCode,scopeObj.view.flxNoPhoneNumberError,1);
      };
      this.view.contactNumber.txtISDCode.onEndEditing = function(){
        scopeObj.view.contactNumber.txtISDCode.text = scopeObj.view.contactNumber.addingPlus(scopeObj.view.contactNumber.txtISDCode.text);
      };
      this.view.btnsave.onClick = function(){
        scopeObj.view.flxUSPSValidation.isVisible = false;
        scopeObj.view.lblUSPSButton.isVisible = false;
        scopeObj.view.lblUSPSButton.text = "";
        scopeObj.view.tbxStreetName.text = scopeObj.USPSRecommendations.Address2;
        scopeObj.view.typeHeadCity.tbxSearchKey.text = scopeObj.USPSRecommendations.City;
        scopeObj.view.tbxZipCode.text = scopeObj.USPSRecommendations.Zip5;
        scopeObj.view.typeHeadState.tbxSearchKey.text = scopeObj.USPSRecommendations.State;
        scopeObj.view.flxUSPSContainer.isVisible = false;
        scopeObj.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecommendationValidated");
        scopeObj.view.lblUSPSIcon.isVisible = true;
        scopeObj.USPSWidth();
        scopeObj.view.lblUSPSIcon.text = "";
        scopeObj.view.lblUSPSIcon.skin = "sknIcomoonGreenTick";
        scopeObj.USPSWidth();
        scopeObj.view.forceLayout();
      };
      this.view.btnCancel.onClick = function(){
        scopeObj.onCancelUspsValidation();
      };
      this.view.flxEligibilityClose.onClick = function(){
        scopeObj.onCancelUspsValidation();
      };
      this.view.btnAddUsersSave.onClick = function(){
        scopeObj.isNextClicked = true;
        if(scopeObj.view.flxDetailContentContainer.isVisible === true){
          var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
          if(scopeObj.ValidateDetails() === true){
            var ssn = {"_searchType":"CUSTOMER_SEARCH",
                       "_SSN":scopeObj.view.tbxSSN.text,
                       "_pageOffset":"0",
                       "_pageSize":20,
                       "legalEntityId": legalEntityId || ""
                      };
            scopeObj.presenter.customerSSNValidation(ssn);
          }
          else {
            scopeObj.FocusOnError();
          }
        }else if(scopeObj.view.flxTermsAndCoditions.isVisible === true){
          if(scopeObj.view.chbxConsent.selectedKeys===null){
            scopeObj.view.flxNoChbx.setVisibility(true);
            scopeObj.view.flxTermsAndCoditions.setContentOffset({
              y:scopeObj.view.flxNoChbx.frame.y,
              x:0
            });
          }else
            scopeObj.createOnboardingApplicant();
        }else if(scopeObj.isSelectedIdInfoValid()){
          //scopeObj.view.btnTermsAndCond.onClick();
          scopeObj.presenter.getTermsAndConditions();
        }
      };
      this.view.lblDeleteDriversLicence.onClick = function(){
        scopeObj.view.flxDriversLicence.setVisibility(false);
        scopeObj.view.flxIDSelect.setVisibility(true);
        scopeObj.currentSelectedIdInfo = null;
        scopeObj.resetIDSelector();
      };
      this.view.lblDeletePassport.onClick = function(){
        scopeObj.view.flxPassportID.setVisibility(false);
        scopeObj.view.flxIDSelect.setVisibility(true);
        scopeObj.currentSelectedIdInfo = null;
        scopeObj.resetIDSelector();
      };
      this.view.popUp.btnPopUpDelete.onClick = function(){
        scopeObj.view.flxCancelPopup.setVisibility(false);
        scopeObj.presenter.displayCustomerMangement ();
      };
      this.view.submitPopUp.btnPopUpCancel.onClick = function(){
        scopeObj.view.flxSubmitPopup.setVisibility(false);
        scopeObj.presenter.displayCustomerMangement ();
      };
      this.view.submitPopUp.btnPopUpDelete.onClick = function(){
        if(scopeObj.view.submitPopUp.btnPopUpDelete.text===kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.close")){
          scopeObj.view.flxSubmitPopup.setVisibility(false);
          scopeObj.presenter.displayCustomerMangement ();
        }
        else{
          scopeObj.view.flxSubmitPopup.setVisibility(false);
          var legalEntityId = scopeObj.presenter.getCurrentCustomerDetails().legalEntityId || scopeObj.presenter.custSearchLEId;
          scopeObj.presenter.getCustomerBasicInfo({"Customer_id": scopeObj.applicantInfo.Customer_id,"legalEntityId":legalEntityId || ""}, "InfoScreen");
        }
      };
      this.view.tbxExtension.onBeginEditing = function(){
        scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmAssistedOnboarding_tbxExtension');
      };
      this.view.tbxExtension.onKeyUp = function(){
        scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmAssistedOnboarding_tbxExtension');
      };
    },
    selectedEligibilityId : null,
    userNameIsChecked : false,

    usernameCheck: function () {
      var self = this;

      var usernameRegexString = "^([a-zA-Z0-9sp]+)$";
      if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
        var supportedSymbols = self.usernameRulesAndPolicy.usernamerules.supportedSymbols.replace(/,/g, "");
        usernameRegexString = usernameRegexString.replace(/sp/g, supportedSymbols);
      }
      else {
        usernameRegexString = usernameRegexString.replace(/sp/g, '');
      }
      var usernameRegex = new RegExp(usernameRegexString);

      this.view.flxUserNameError.isVisible = true;
      var userNameText = this.view.textBoxEntryAsst.tbxEnterValue.text;

      if (userNameText === "") {
        this.showUserNameErrorValidationError(kony.i18n.getLocalizedString("i18n.common.Username_cannot_be_empty"));
      } else if (userNameText.trim().length < self.usernameRulesAndPolicy.usernamerules.minLength) {
        this.showUserNameErrorValidationError("Enter atleast " + self.usernameRulesAndPolicy.usernamerules.minLength + " characters");
      } else if(userNameText.trim().length > self.usernameRulesAndPolicy.usernamerules.maxLength) {
        this.showUserNameErrorValidationError("Enter max of " + self.usernameRulesAndPolicy.usernamerules.maxLength + " characters only");
      } else if(usernameRegex.test(userNameText.trim()) === false) {
        if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
          this.view.lblUsernameCheck.text = "Only following special characters allowed: " + self.usernameRulesAndPolicy.usernamerules.supportedSymbols;
        }
        else {
          this.view.lblUsernameCheck.text = "No special characters allowed";
        }
      } else {
        var legalEntityId = this.presenter.getCurrentCustomerDetails().legalEntityId || this.presenter.custSearchLEId;
        var custSearch = {
          "_searchType": "CUSTOMER_SEARCH",
          "_username": userNameText,
          "_pageOffset": "0",
          "_pageSize": 20,
          "legalEntityId":legalEntityId || ""
        };
        this.presenter.searchCustomersAssistiveOnBoarding(custSearch);
      }

      this.view.forceLayout();
    },
    showUserNameErrorValidationError : function(errorMsg){
      this.view.lblUsernameCheckIcon.text = "";
      this.view.textBoxEntryAsst.tbxEnterValue.skin = "skinredbg";
      this.view.lblUsernameCheckIcon.skin = "sknErrorIcon";
      this.view.lblUsernameCheck.text = errorMsg;
      this.view.lblUsernameCheck.skin = "sknlblError";
      this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendarError";
      this.view.forceLayout();
    },
    showMessageToCheckUserName : function(){
      this.view.flxUserNameError.isVisible = true;
      this.view.lblUsernameCheck.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.checkUsernameForAvailability");
      this.view.lblUsernameCheckIcon.text = "";
      this.view.lblUsernameCheck.skin = "sknLatoCF9C37Yellow";
      this.view.lblUsernameCheckIcon.skin = "sknLatoCF9C37YellowIconn";
      this.view.textBoxEntryAsst.tbxEnterValue.skin = "skntbxLato35475f14px";
      this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendar";
      this.view.textBoxEntryAsst.flxBtnCheck.isVisible = true;
      this.view.forceLayout();
    },
    showUserProgressBar : function (view) {
      if(view === null || view === undefined) {
        return;
      }
      if ('flxUserLoading' in view) {
        view['flxUserLoading'].setVisibility(true);
        if(view.flxUserLoading.timeoutHandle)clearTimeout(view.flxUserLoading.timeoutHandle);
        view.flxUserLoading.timeoutHandle = setTimeout(function(){
          this.hideUserProgressBar(view);
        }, kony.adminConsole.utils.LOADING_TIMEOUT_IN_SEC*1000);
      }
      else {
        kony.print("No Progress bar available in the form. Add a progress bar with widget name flxUserLoading");
      }
    },
    hideUserProgressBar : function (view) {
      if(view === null || view === undefined) {
        return;
      }
      if ('flxUserLoading' in view && view['flxUserLoading'].isVisible) {
        view['flxUserLoading'].setVisibility(false);
        if(view.flxUserLoading.timeoutHandle)clearTimeout(view.flxUserLoading.timeoutHandle);
      }
    },
    usernameRulesAndPolicy :{
      usernamerules : null,
      usernamepolicy : null
    },
    willUpdateUI : function(viewModel){
      if(typeof viewModel.LoadingScreen!=='undefined'){
        if(viewModel.LoadingScreen.focus===true) {
          kony.adminConsole.utils.showProgressBar(this.view);
        } else {
          kony.adminConsole.utils.hideProgressBar(this.view);
        }
      }
      if(typeof viewModel.UserLoadingScreen!=='undefined'){
        if(viewModel.UserLoadingScreen.focus===true) {
          this.showUserProgressBar(this.view);
        } else {
          this.hideUserProgressBar(this.view);
        }
      }
      if (viewModel) {
        this.updateLeftMenu(viewModel);
        if(viewModel.toastModel){
          if(viewModel.toastModel.status === kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")){
            this.view.toastMessage.showToastMessage(viewModel.toastModel.message,this);
          }else{
            this.view.toastMessage.showErrorToastMessage (viewModel.toastModel.message,this);
          }
        }
        else if(viewModel.firstTime === true){
          this.selectedEligibilityId = viewModel.id;
          //         this.view.lblUSPStext.frame.width = "275px";
          // 		this.view.lblUSPStext.centerX = "50%";
          //        	this.view.lblUSPStext.centerY = "50%";
          this.preshowActions();
        }
        else if(viewModel.usernameRulesAndPolicy) {
          this.setUsernameRulesAndPolicy(viewModel.usernameRulesAndPolicy);
        }
        else if(typeof(viewModel.userNameIsAvailable) === 'boolean'){
          if(viewModel.userNameIsAvailable){
            this.view.flxUserNameError.isVisible = true;
            this.view.lblUsernameCheck.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Available");
            this.view.lblUsernameCheckIcon.text = "";
            this.view.lblUsernameCheck.skin = "sknlblLato5bc06cBold14px";
            this.view.lblUsernameCheckIcon.skin = "sknIcomoonGreenTick";
            this.view.textBoxEntryAsst.tbxEnterValue.skin = "skntbxLato35475f14px";
            this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendar";
            this.view.textBoxEntryAsst.flxBtnCheck.isVisible = false;
            this.userNameIsChecked = true;
          }else{
            this.view.flxUserNameError.isVisible = true;
            this.view.lblUsernameCheck.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Not_Available");
            this.view.lblUsernameCheckIcon.text = "";
            this.view.lblUsernameCheck.skin = "sknlblError";
            this.view.lblUsernameCheckIcon.skin = "sknErrorIcon";
            this.view.textBoxEntryAsst.flxBtnCheck.isVisible = true;
            this.view.textBoxEntryAsst.tbxEnterValue.skin = "skinredbg";
            this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendarError";
          }
          this.view.forceLayout();
        }
        else if(viewModel.USPSRecommendations){
          if(viewModel.USPSRecommendations.AddressValidateResponse[0].Address.City){
            if(this.USPSMatch(viewModel.USPSRecommendations.AddressValidateResponse[0].Address) === true){
              this.view.flxUSPSContainer.isVisible = false;
              this.view.lblUSPSIcon.isVisible = true;
              this.view.lblUSPSButton.isVisible = false;
              this.view.lblUSPSButton.text = "";
              this.view.lblUSPSIcon.text = "";
              this.USPSWidth();
              this.view.lblUSPSIcon.skin = "sknIcomoonGreenTick";
              this.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.AddressMatchedWithUSPSRecords");
              this.USPSValidated = true;
              this.USPSWidth();
              this.view.forceLayout();
            }
            else{
              this.view.flxUSPSContainer.isVisible = false;
              this.USPSRecommendations = viewModel.USPSRecommendations.AddressValidateResponse[0].Address;
              this.view.flxUSPSValidation.isVisible = true;
              this.view.lblOriginalAddressValue.text = this.view.tbxStreetName.text +", "+this.view.typeHeadCity.tbxSearchKey.text+", "+this.view.typeHeadState.tbxSearchKey.text+", "+ this.view.typeHeadCountry.tbxSearchKey.text+".";
              this.view.lblUSPSAddressValue.text = this.USPSRecommendations.Address2 +", "+this.USPSRecommendations.City+", "+this.USPSRecommendations.State+", "+ this.view.typeHeadCountry.tbxSearchKey.text+".";
              this.USPSWidth();
              this.USPSWidth();
              this.view.forceLayout();
            }
          }
          else if(viewModel.USPSRecommendations.AddressValidateResponse[0].Address.Error){
            this.view.flxUSPSContainer.isVisible = false;
            this.view.lblUSPSIcon.isVisible = true;
            this.view.lblUSPSIcon.text = "";
            this.view.lblUSPSIcon.skin = "sknErrorIcon";
            this.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.unableToValidateUSPS");
            this.view.lblUSPSButton.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.validateAgain");
            this.USPSValidated = false;
            this.USPSWidth();
            this.USPSWidth();
            this.view.forceLayout();
          }
        }else if(viewModel.termsAndConds){
          this.showTermsAndCond(viewModel.termsAndConds); 
        }
        else if(viewModel.isSSN === true){
          this.view.flxDuplicateSSN.isVisible = true;
          this.view.lblSSNNameValue.text = viewModel.data.FirstName+ " "+ viewModel.data.LastName;
          this.view.lblSSNDOBValue.text = viewModel.data.DateOfBirth;
          this.view.lblSSNEmailValue.text =  viewModel.data.PrimaryEmailAddress.substring(0, 24) + "...";
          this.view.lblSSNEmailValue.toolTip = viewModel.data.PrimaryEmailAddress;
          this.view.lblSSNValue.text = viewModel.data.Ssn;
        }else if(viewModel.isSSN === false){
          this.showAddIdInfo();
        }else if(viewModel.createApplicant){
          this.applicantInfo=viewModel.createApplicant.applicantInfo;
          if(viewModel.createApplicant.status==="SUCCESS"){
            this.showApprovedPopup();
          }
          else
            this.showRejectedPopup();
        }
        if(Array.isArray(viewModel.idInfos)){
          this.presenter.getUsernameRulesAndPolicy();
          this.idInfosMasterData = viewModel.idInfos;
          this.setIDSelectionData(this.idInfosMasterData);
          this.configureDriversLicenceForm();
          this.configurePassportForm();
          this.view.lblDeleteDriversLicence.onClick();
          this.view.lblDeletePassport.onClick();
        }
        this.view.forceLayout();
      }
    },
    USPSMatch:function(result){
      if(result.Address2.toLowerCase() === this.addressInput.Address2.toLowerCase()  && 
         result.City.toLowerCase() === this.addressInput.City.toLowerCase() &&
         result.State.toLowerCase() === this.addressInput.State.toLowerCase() &&
         result.Zip5.toLowerCase() === this.addressInput.Zip5.toLowerCase())
        return true;
      return false;
    },
    isAddressValidated:function(){
      if(this.view.tbxStreetName.text !== ""  && this.view.tbxZipCode.text!=="" && this.view.typeHeadCity.tbxSearchKey.text !== "" && this.view.typeHeadState.tbxSearchKey.text!=="" && this.view.typeHeadCountry.tbxSearchKey.text===""){
        this.view.tbxStreetName.skin = "skntbxLato35475f14px";
        this.view.tbxZipCode.skin = "skntbxLato35475f14px";
        this.view.typeHeadCity.tbxSearchKey.skin = "skntbxLato35475f14px";
        this.view.typeHeadState.tbxSearchKey.skin = "skntbxLato35475f14px";
        this.view.typeHeadCountry.tbxSearchKey.skin = "skntbxLato35475f14px";
        this.view.flxNoAddressError.isVisible = false;
      }
      this.isNextClicked = false;
      this.view.forceLayout();
    },
    isAddressNull:function(){
      this.view.flxUSPSContainer.isVisible = false;
      if(this.view.tbxStreetName.text === ""  || this.view.tbxZipCode.text==="" || this.view.typeHeadCity.tbxSearchKey.text === "" || this.view.typeHeadState.tbxSearchKey.text==="" || this.view.typeHeadCountry.tbxSearchKey.text===""){
        this.size = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.fillOutTheAddressToCheckUSPSValidation").length;
        this.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.fillOutTheAddressToCheckUSPSValidation");
        this.view.lblUSPSButton.isVisible = false;
        this.view.lblUSPSButton.text = "";
        this.view.lblUSPSIcon.isVisible=false;
        this.USPSWidth();
      }
      else{
        this.view.lblUSPStext.text= kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecommendation");
        this.view.lblUSPSButton.isVisible = true;
        this.view.lblUSPSIcon.isVisible = false;
        this.view.lblUSPSButton.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.Validate");
        this.USPSWidth();
      }
      if(this.isNextClicked === true){
        this.isAddressValidated();
      }
      this.USPSWidth();  
      this.view.forceLayout();
    },
    showAddDetailsInfo:function(){
      this.hideAllOptionsButtonImages();
      this.view.btnAddUsersSave.text=kony.i18n.getLocalizedString("i18n.permission.NEXT");
      this.view.btnAddUsersSave.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.btnAddUsersSave.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
      this.view.btnAddUsersSave.setEnabled(true);
      this.view.flxAddIdInfo.setVisibility(false);
      this.view.flxTermsAndCoditions.setVisibility(false);
      this.view.flxDetailContentContainer.setVisibility(true);
      var widgetArray = [this.view.btnPersonalDetails,this.view.btnIdInfo,this.view.btnTermsAndCond];
      this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnPersonalDetails);
      this.tabUtilVerticleArrowVisibilityFunction(
        [this.view.fontIconRightArrow2,
         this.view.fontIconRightArrow3,
         this.view.fontIconRightArrow4,
         this.view.fontIconRightArrow5],this.view.fontIconRightArrow2);
      this.view.forceLayout();
    },
    showAddIdInfo:function(){
      this.hideAllOptionsButtonImages();
      this.view.btnAddUsersSave.text=kony.i18n.getLocalizedString("i18n.permission.NEXT");
      this.view.btnAddUsersSave.skin="sknBtn003E75LatoRegular13pxFFFFFFRad20px";
      this.view.btnAddUsersSave.hoverSkin="sknBtn005198LatoRegular13pxFFFFFFRad20px";
      this.view.btnAddUsersSave.setEnabled(true);
      this.tabUtilVerticleArrowVisibilityFunction(
        [this.view.fontIconRightArrow2,
         this.view.fontIconRightArrow3,
         this.view.fontIconRightArrow4,
         this.view.fontIconRightArrow5],this.view.fontIconRightArrow3);
      this.view.flxAddIdInfo.setVisibility(true);
      this.view.flxTermsAndCoditions.setVisibility(false);
      this.view.flxDetailContentContainer.setVisibility(false);
      var widgetArray = [this.view.btnPersonalDetails,this.view.btnIdInfo,this.view.btnTermsAndCond];
      this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnIdInfo);
      this.view.forceLayout();
    },
    showTermsAndCond:function(response){
      this.hideAllOptionsButtonImages();
      kony.adminConsole.utils.hideProgressBar(this.view);
      this.view.btnAddUsersSave.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.submit");
      if(this.view.chbxConsent.selectedKeys===null){
        this.view.flxNoChbx.setVisibility(true);
      }
      this.tabUtilVerticleArrowVisibilityFunction(
        [this.view.fontIconRightArrow2,
         this.view.fontIconRightArrow3,
         this.view.fontIconRightArrow4,
         this.view.fontIconRightArrow5],this.view.fontIconRightArrow4);
      this.view.flxAddIdInfo.setVisibility(false);
      this.view.flxTermsAndCoditions.setVisibility(true);
      this.view.flxDetailContentContainer.setVisibility(false);
      var widgetArray = [this.view.btnPersonalDetails,this.view.btnIdInfo,this.view.btnTermsAndCond];
      this.tabUtilVerticleButtonFunction(widgetArray,this.view.btnTermsAndCond);
      this.view.rtxTermsAndCond.text = response;
      this.view.forceLayout();
    },
    hideAllOptionsButtonImages : function(){
      this.tabUtilVerticleArrowVisibilityFunction(
        [this.view.fontIconRightArrow2,
      this.view.fontIconRightArrow3,
      this.view.fontIconRightArrow4,
      this.view.fontIconRightArrow5],"");
    },
    getGoogleSuggestion : function(text){
      var self = this;
      function onSuccess(response) {
        console.log(response);
        self.view.segSearch.setVisibility(true);
        self.setSerchSegmentData(response);
        self.view.forceLayout();
      }
      function onError(response) {
        kony.print("Error",response);
      }
      this.presenter.getAddressSuggestion(text, onSuccess, onError);

    },
    setSerchSegmentData : function(data){
      var self = this;
      var finalData;
      if(data.predictions){
        finalData = data.predictions.map(self.mapping);
        var dataMap = {
          lblAddress : "lblAddress",
          lblPinIcon : "lblPinIcon"
        };
        this.view.segSearch.widgetDataMap = dataMap;
        this.view.segSearch.setData(finalData);
      }
    },
    mapping : function(data){
      return{
        "lblId" : data.place_id,
        "lblAddress" : data.description,
        "lblPinIcon" : "",
        "lat" : "17.4947934",
        "long" : "78.3996441"
      };
    },
    mappingRowToWidgets : function(){
      var self = this;
      var data = this.view.segSearch.data;
      var index = this.view.segSearch.selectedRowIndex[1];
      var id = data[index].lblId;
      function onSuccess(response){
        self.fillingData(response,data[index]);
        self.view.flxUSPSContainer.isVisible = false;
        self.view.lblUSPStext.text= kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecommendation");
        self.view.lblUSPSButton.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.Validate");
        self.view.lblUSPSIcon.isVisible = false;
        self.view.lblUSPSButton.isVisible = true;
        self.USPSWidth();
        self.USPSWidth();
        self.view.forceLayout();
      }
      function onError(reponse){
        kony.print("error",reponse);
      }
      this.presenter.getPlaceDetails(id, onSuccess, onError);

    },
    userNameValidation : function(username){
      var self = this;
      var isValid = true;
      var usernameRegexString = "^([a-zA-Z0-9sp]+)$";
      if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
        var supportedSymbols = self.usernameRulesAndPolicy.usernamerules.supportedSymbols.replace(/,/g, "");
        usernameRegexString = usernameRegexString.replace(/sp/g, supportedSymbols);
      }
      else {
        usernameRegexString = usernameRegexString.replace(/sp/g, '');
      }
      var usernameRegex = new RegExp(usernameRegexString);
      if(username < self.usernameRulesAndPolicy.usernamerules.minLength){
        this.view.lblUsernameCheck.text=  "Enter atleast " + self.usernameRulesAndPolicy.usernamerules.minLength + " characters";
        isValid = false;
      }
      else if(username > self.usernameRulesAndPolicy.usernamerules.maxLength){
        this.view.lblUsernameCheck.text= "Enter max of " + self.usernameRulesAndPolicy.usernamerules.maxLength + " characters only";
        isValid = false;
      } 
      else if(usernameRegex.test(username.trim())  === false){
        if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
          this.view.lblUsernameCheck.text = "Only following special characters allowed: " + self.usernameRulesAndPolicy.usernamerules.supportedSymbols;
        }
        else {
          this.view.lblUsernameCheck.text = "No special characters allowed";
        }
        isValid = false;
      }
      return isValid;
    },
    fillingData : function(response,rowData){
      this.clearAllAddressFields();
      var self = this;
      if(response.result){
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
        self.view.map1.mapLocations.addPin(pin);
        self.view.map1.mapLocations.navigateToLocation(locationData,false,true);
        for(var i = 0;i<finalresponse[0].address_components.length ;i++){
          if (finalresponse[0].address_components[i].types.search("postal_code") != -1) {
            self.view.tbxZipCode.text = finalresponse[0].address_components[i].long_name;
          }else if(finalresponse[0].address_components[i].types.search("country") != -1) {
            if(self.checkAvailabilty(finalresponse[0].address_components[i].long_name,self.view.typeHeadCountry.segSearchResult.data)){
              self.view.typeHeadCountry.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            }else{
              self.view.flxNoCountry.setVisibility(true);
              self.view.lblNoCountryError.text = "invalid country";
              self.view.forceLayout();
            }
          }else if(finalresponse[0].address_components[i].types.search("locality") != -1){
            if(self.checkAvailabilty(finalresponse[0].address_components[i].long_name,self.view.typeHeadCity.segSearchResult.data)){
              self.view.typeHeadCity.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            }else{
              self.view.flxNoCity.setVisibility(true);
              self.view.lblNoCityError.text = "invalid city";
              self.view.forceLayout();
            }
          }else if(finalresponse[0].address_components[i].types.search("administrative_area_level_1") != -1){
            if(self.checkAvailabilty(finalresponse[0].address_components[i].long_name,self.view.typeHeadState.segSearchResult.data)){
              self.view.typeHeadState.tbxSearchKey.text = finalresponse[0].address_components[i].long_name;
            }else{
              self.view.flxNoState.setVisibility(true);
              self.view.lblNoStateError.text = "invalid state";
              self.view.forceLayout();
            }
          }
        }
        self.view.tbxStreetName.text = self.getStreetAddress(rowData.lblAddress);
      }
    },
    getStreetAddress: function(wholeAddress){
      return wholeAddress.slice(0,wholeAddress.indexOf(this.view.typeHeadCity.tbxSearchKey.text));
    },
    clearAllAddressFields : function(){
      this.view.flxNoAddressError.isVisible = false;
      this.view.tbxStreetName.text = "";
      this.view.tbxBuildingName.text = "";
      this.view.typeHeadCountry.tbxSearchKey.text = "";
      this.view.tbxZipCode.text = "";
      this.view.typeHeadCity.tbxSearchKey.text = "";
      this.view.typeHeadState.tbxSearchKey.text = "";
      this.clearValidation(this.view.tbxStreetName, this.view.flxNoStreetName, 1);
      this.clearValidation(this.view.typeHeadCountry.tbxSearchKey, this.view.flxNoCountry, 1);
      this.clearValidation(this.view.tbxZipCode, this.view.flxNoZipCode, 1);
      this.clearValidation(this.view.typeHeadCity.tbxSearchKey, this.view.flxNoCity, 1);
      this.clearValidation(this.view.typeHeadState.tbxSearchKey, this.view.flxNoState, 1);
    },
    checkAvailabilty : function(key,list){
      for(var i=0;i<list.length;i++){
        if((list[i].lblAddress).toLowerCase().indexOf(key.toLowerCase()))
          return true;
      }
    },
    clearValidation : function(widget,errorFlex,type){
      if (type === 1)
        widget.skin = "skntxtbxDetails0bbf1235271384a";
      else if(type === 2)
        widget.skin = "sknlstbxNormal0f9abd8e88aa64a";
      errorFlex.setVisibility(false);
    },
    getAddressSegmentData : function(){
      var self = this;
      var callBack = function(response){
        kony.print("listboxreponse",response);
        if(response != "error") {
          self.segCountry = response.countries.reduce(
            function(list, country) {
              return list.concat([{"id":country.id, 
                                   "lblAddress":{"text":country.Name,
                                                 "left" : "10dp"},
                                   "template":"flxSearchCompanyMap"}]);
            },[]);
          self.segState = response.regions.reduce(
            function(list, region) {
              return list.concat([{"id":region.id,
                                   "lblAddress":{"text":region.Name,
                                                 "left" : "10dp"},
                                   "template":"flxSearchCompanyMap"}]);
            },[]);
          self.segLocationCity = response.cities.reduce(
            function(list, city) {
              return list.concat([{"id":city.id,
                                   "lblAddress":{"text":city.Name,
                                                 "left" : "10dp"},
                                   "template":"flxSearchCompanyMap"}]);
            },[]);
        }
        self.setAddressSegmentData();
      };
      this.presenter.fetchLocationPrefillData(callBack);
    },
    setAddressSegmentData : function(){
      var widgetMap = {"flxSearchCompanyMap":"flxSearchCompanyMap",
                       "lblAddress":"lblAddress",
                       "id":"id"};
      this.view.typeHeadCountry.segSearchResult.widgetDataMap = widgetMap;
      this.view.typeHeadCity.segSearchResult.widgetDataMap = widgetMap;
      this.view.typeHeadState.segSearchResult.widgetDataMap = widgetMap;
      this.view.typeHeadCountry.segSearchResult.setData(this.segCountry);
      this.view.typeHeadCity.segSearchResult.setData(this.segLocationCity);
      this.view.typeHeadState.segSearchResult.setData(this.segState);
    },
    getAge: function(DOB) {
      var today = new Date();
      var birthDate = new Date(DOB);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }    
      return age;
    },
    ValidateDetails: function(){
      var isValid = true;
      if(!this.userNameIsChecked){
        this.showMessageToCheckUserName();
        isValid = false;
      }
      if(this.view.tbxNameValue.text === ""){
        this.view.flxNoNameError.isVisible = true;
        this.view.tbxNameValue.skin = "skinredbg";
        isValid = false;
      }
      if(this.view.tbxLastName.text === ""){
        this.view.flxNoLastNameError.isVisible = true;
        this.view.tbxLastName.skin = "skinredbg";
        isValid = false;
      }
      var emailRegex = Regexes.emailRegex;
      if (this.view.tbxEmailValue.text.trim() === "") {
        this.view.tbxEmailValue.skin = "skinredbg";
        this.view.flxNoEmailError.setVisibility(true);
        this.view.lblNoEmailError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing");
        isValid = false;
      } else if (emailRegex.test(this.view.tbxEmailValue.text.trim()) === false) {
        this.view.tbxEmailValue.skin = "skinredbg";
        this.view.flxNoEmailError.setVisibility(true);
        this.view.lblNoEmailError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing1");
        isValid = false;
      }
      if(this.view.datePicker.value === ""){
        this.view.flxDOBValue.skin = "sknFlxCalendarError";
        this.view.flxNoDOBError.setVisibility(true);
        this.view.lblNoDOBError.text = kony.i18n.getLocalizedString("i18n.common.DOB_cannot_be_empty");
        isValid = false; 
      }
      else if(this.getAge(this.view.datePicker.value) < 18){
        this.view.flxDOBValue.skin = "sknFlxCalendarError";
        this.view.flxNoDOBError.setVisibility(true);
        this.view.lblNoDOBError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.age_Cannot_Be_Less_Than_18");
        isValid = false;
      }
      if(this.view.tbxSSN.text === ""){
        this.view.flxNoSSN.isVisible = true;
        this.view.tbxSSN.skin = "skinredbg";
        isValid = false;
      }
      if(this.view.tbxMotherMaidenName.text === ""){
        this.view.flxNoMotherMaidenNameError.isVisible = true;
        this.view.tbxMotherMaidenName.skin = "skinredbg";
        isValid = false;
      }
      if( this.view.textBoxEntryAsst.tbxEnterValue.text === ""){
        this.view.lblUsernameCheckIcon.text = "";
        this.view.lblUsernameCheckIcon.skin = "sknErrorIcon";
        this.view.lblUsernameCheck.text=kony.i18n.getLocalizedString("i18n.common.Username_cannot_be_empty");
        this.view.lblUsernameCheck.skin = "sknlblError";
        this.view.textBoxEntryAsst.tbxEnterValue.skin = "skinredbg";
        this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendarError";
        this.view.flxUserNameError.isVisible = true;
      }
      if( this.userNameValidation(this.view.textBoxEntryAsst.tbxEnterValue.text) === false){
        this.view.lblUsernameCheckIcon.text = "";
        this.view.lblUsernameCheckIcon.skin = "sknErrorIcon";
        this.view.lblUsernameCheck.text=kony.i18n.getLocalizedString("i18n.common.Username_cannot_be_empty");
        this.view.lblUsernameCheck.skin = "sknlblError";
        this.view.textBoxEntryAsst.tbxEnterValue.skin = "skinredbg";
        this.view.textBoxEntryAsst.flxBtnCheck.skin = "sknFlxCalendarError";
        this.view.flxUserNameError.isVisible = true;
        isValid = false;
      }
      if(this.view.lblUsernameCheck.text === kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Not_Available")){
        isValid = false;
      }
      //contact num
      var phoneRegex = Regexes.phoneRegex;
      if (!this.view.contactNumber.txtContactNumber.text || !this.view.contactNumber.txtContactNumber.text.trim()) {
        this.view.contactNumber.txtContactNumber.skin = "skinredbg";
        this.view.flxNoPhoneNumberError.setVisibility(true);
        this.view.lblNoPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");
        isValid = false;
      } else if (this.view.contactNumber.txtContactNumber.text.trim().length > 15) {
        this.view.contactNumber.txtContactNumber.skin = "skinredbg";
        this.view.flxNoPhoneNumberError.setVisibility(true);
        this.view.lblNoPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblNoPhnNumberExceedsLength");
        isValid = false;
      } else if (phoneRegex.test(this.view.contactNumber.txtContactNumber.text) === false) {
        this.view.contactNumber.txtContactNumber.skin = "skinredbg";
        this.view.flxNoPhoneNumberError.setVisibility(true);
        this.view.lblNoPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
        isValid = false;
      }
      //ISD code
      var ISDRegex = Regexes.ISDRegex;
      if (!this.view.contactNumber.txtISDCode.text || !this.view.contactNumber.txtISDCode.text.trim()) {
        this.view.contactNumber.txtISDCode.skin = "skinredbg";
        this.view.flxNoPhoneNumberError.setVisibility(true);
        this.view.lblNoPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
        isValid = false;
      } else if (this.view.contactNumber.txtISDCode.text.trim().length > 4) {
        this.view.contactNumber.txtISDCode.skin = "skinredbg";
        this.view.flxNoPhoneNumberError.setVisibility(true);
        this.view.lblNoPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
        isValid = false;
      } else if (ISDRegex.test(this.view.contactNumber.txtISDCode.text) === false) {
        this.view.contactNumber.txtISDCode.skin = "skinredbg";
        this.view.flxNoPhoneNumberError.setVisibility(true);
        this.view.lblNoPhoneNumberError.text = kony.i18n.getLocalizedString("i18n.common.Enter_valid_ISD_code");
        isValid = false;
      }
      if (this.view.tbxStreetName.text === "" ){
        this.view.flxNoAddressError.isVisible = true;
        this.view.tbxStreetName.skin = "skinredbg";
        isValid = false;
      }
      if(this.view.typeHeadCountry.tbxSearchKey.text === ""){
        this.view.flxNoAddressError.isVisible = true;
        this.view.typeHeadCountry.tbxSearchKey.skin = "skinredbg"; 
        isValid = false;
      }
      if(this.view.tbxZipCode.text === ""){
        this.view.flxNoAddressError.isVisible = true;
        this.view.tbxZipCode.skin = "skinredbg";
        isValid = false;
      }
      if(this.view.typeHeadCity.tbxSearchKey.text === ""){
        this.view.flxNoAddressError.isVisible = true;
        this.view.typeHeadCity.tbxSearchKey.skin = "skinredbg";
        isValid = false;
      }
      if(this.view.typeHeadState.tbxSearchKey.text === ""){
        this.view.flxNoAddressError.isVisible = true;
        this.view.typeHeadState.tbxSearchKey.skin = "skinredbg"; 
        isValid = false;
      }
      return isValid;
    },
    getTermsAndCond: function(){
      this.presenter.getTermsAndConditions();
    },
    showApprovedPopup:function(){
      this.view.submitPopUp.lblPopUpIcon.text="";
      this.view.submitPopUp.btnPopUpCancel.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.backToSearch");
      this.view.submitPopUp.btnPopUpDelete.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.openProfile");
      this.view.submitPopUp.lblPopUpIcon.skin="sknIcomoonOnboardingSuccess";
      this.view.submitPopUp.lblPopupMsg.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.approveMsg");
      this.view.submitPopUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.approveRtx");
      this.view.submitPopUp.flxPopUpTopColor.skin="sknFlxTopColor4A77A0";
      this.view.submitPopUp.btnPopUpCancel.setVisibility(true);
      this.view.flxSubmitPopup.setVisibility(true);
      this.view.forceLayout();
    },
    showRejectedPopup:function(){
      this.view.submitPopUp.lblPopUpIcon.text="";
      this.view.submitPopUp.lblPopUpIcon.skin="sknIcomoonOnboardingFail";
      this.view.submitPopUp.lblPopupMsg.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.errorMsg");
      if(this.applicantInfo.reason)
        this.view.submitPopUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.errorRtx")+this.applicantInfo.reason;
      else
        this.view.submitPopUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.errorRtx");
      this.view.submitPopUp.flxPopUpTopColor.skin="sknFlxee6565Op100NoBorder";
      this.view.submitPopUp.btnPopUpDelete.text=kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.close");
      this.view.submitPopUp.btnPopUpCancel.setVisibility(false);
      this.view.flxSubmitPopup.setVisibility(true);
      this.view.forceLayout();
    },
    configureDriversLicenceForm : function(){
      this.view.DriversCardNumber.configure(
        'ID Card Number',
        '',
        35
      );
      this.view.DriversCardNumber.addValidator(kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty"),
                                               function(text){return text.trim().length > 0;});

      this.view.DriversIssuedByState.configure(
        'Issued By State',
        '',
        35
      );
      this.view.DriversIssuedByState.addValidator(kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty"),
                                                  function(text){return text.trim().length > 0;});
      var normalBorderSkin = this.calenderFlexBorderSkin;
      this.view.flxDriversIssueDateErrorBorder.skin = normalBorderSkin;
      this.view.flxDriversIssueDateError.setVisibility(false);
      this.view.flxDriversExpiryDateErrorBorder.skin = normalBorderSkin;
      this.view.flxDriversExpiryDateError.setVisibility(false);
    },
    configurePassportForm : function(){
      this.view.PassportCardNumber.configure(
        'ID Card Number',
        '',
        35
      );
      this.view.PassportCardNumber.addValidator(kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty"),
                                                function(text){return text.trim().length > 0;});

      this.view.PassportIssuedByCountry.configure(
        'Issued By Country',
        '',
        35
      );
      this.view.PassportIssuedByCountry.addValidator(kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty"),
                                                     function(text){return text.trim().length > 0;});

      this.view.PassportIssuedByState.configure(
        'Issued By State',
        '',
        35
      );
      this.view.PassportIssuedByState.addValidator(kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty"),
                                                   function(text){return text.trim().length > 0;});

      var normalBorderSkin = this.calenderFlexBorderSkin;
      this.view.flxPassportIssueDateErrorBorder.skin = normalBorderSkin;
      this.view.flxPassportIssueDateError.setVisibility(false);
      this.view.flxPassportExpiryDateErrorBorder.skin = normalBorderSkin;
      this.view.flxPassportExpiryDateError.setVisibility(false);
    },
    selectedID : function(id){
      var idToFlexMap = {
        'Driving License' : 'flxDriversLicence',
        'Passport' : 'flxPassportID'
      };
      if(!idToFlexMap[id]){
        throw Error('No Flex was configured for this id'+id);
      }
      if(this.view[idToFlexMap[id]] &&
         typeof(this.view[idToFlexMap[id]].setVisibility) === 'function'){
        this.view[idToFlexMap[id]].setVisibility(true);
        this.view.flxIDSelect.setVisibility(false);
      }else{
        throw Error('The configured flex '+idToFlexMap[id]+' was not found in form');
      }
    },
    currentSelectedIdInfo: null,
    setIDSelectionData : function(idInfos){
      var masterData = [['Select ID', 'Select ID']];
      masterData = masterData.concat(idInfos.map(function(idInfo){
        return [idInfo.IDType, idInfo.IDName];
      }));
      this.view.ListBoxSelectId.masterData = masterData;
      this.view.ListBoxSelectId.selectedKey = masterData[0][0];
      var self = this;
      this.view.ListBoxSelectId.onSelection = function(){
        if(self.view.ListBoxSelectId.selectedKey !== masterData[0][0]){
          self.selectedID(self.view.ListBoxSelectId.selectedKeyValue[1]);
          self.currentSelectedIdInfo = self.view.ListBoxSelectId.selectedKey;
        }
      };
      this.view.forceLayout();
    },
    resetIDSelector : function(){
      this.view.ListBoxSelectId.selectedKey = this.view.ListBoxSelectId.masterData[0][0];
      this.hideSelectIDError();
    },
    showSelectIDError : function(){
      var searchBarErrorSkin = 'sknBorderRed';
      this.view.flxTextListBox.skin = searchBarErrorSkin;
      this.view.flxIdSearchInlineError.setVisibility(true);
    },
    hideSelectIDError : function(){
      var searchBarDefaultSkin = 'sknflxBorder';
      this.view.flxTextListBox.skin = searchBarDefaultSkin;
      this.view.flxIdSearchInlineError.setVisibility(false);
    },
    createOnboardingApplicant: function(){
      var self=this;
      var DOB=this.view.datePicker.value.substr(3,2)+"-"+this.view.datePicker.value.substr(0,2)+"-"+this.view.datePicker.value.substr(6,4);
      var applicantData={
        "criteriaID" : this.selectedEligibilityId,
        "contactInformation":{
          "emailAddress":this.view.tbxEmailValue.text,
          "phoneNumber":this.view.contactNumber.txtISDCode.text+"-"+this.view.contactNumber.txtContactNumber.text+"-"+this.view.tbxExtension.text 
        },
        "personalInformation":{
          "userName":this.view.textBoxEntryAsst.tbxEnterValue.text,
          "firstName":this.view.tbxNameValue.text ,
          "middleName":this.view.tbxMiddleName.text,
          "lastName":this.view.tbxLastName.text,
          "dateofBirth":DOB,
          "SSN":this.view.tbxSSN.text    
        },
        "addressInformation":{
          "addressLine1":this.view.tbxStreetName.text,
          "addressLine2":this.view.tbxBuildingName.text,
          "city":this.view.typeHeadCity.tbxSearchKey.text,
          "state":this.view.typeHeadState.tbxSearchKey.text,
          "zipcode":this.view.tbxZipCode.text,
          "country":this.view.typeHeadCountry.tbxSearchKey.text,
          "uspsValidationStatus":this.USPSValidated
        }
      };
      applicantData.identityInformation=self.getSelectedIdInfo();
      this.presenter.createOnboardingApplicant(applicantData);
    },
    setUsernameRulesAndPolicy : function(usernameRulesAndPolicy) {
      var scopeObj = this;

      scopeObj.usernameRulesAndPolicy.usernamerules = usernameRulesAndPolicy.usernamerules;
      for(var i=0; i<usernameRulesAndPolicy.usernamepolicy.length; ++i) {
        if(usernameRulesAndPolicy.usernamepolicy[i].locale === "en-US") {
          scopeObj.usernameRulesAndPolicy.usernamepolicy = usernameRulesAndPolicy.usernamepolicy[i].content;
          break;
        }
      }
    },

    rulesLabelClick : function() {
      var scopeObj = this;

      if(this.view.flxUsernameRules.isVisible === false) {
        scopeObj.view.flxUsernameRules.setVisibility(true);
        scopeObj.view.rtxUsernameRules.text = scopeObj.usernameRulesAndPolicy.usernamepolicy;
      }
      else {
        scopeObj.view.flxUsernameRules.setVisibility(false);
      }

      this.view.forceLayout();
    },
    calenderFlexBorderSkin : 'sknFlxCalendar',
    calenderFlexBorderErrorSkin : 'sknFlxCalendarError',
    isSelectedIdInfoValid : function(){
      var normalBorderSkin = this.calenderFlexBorderSkin;
      var errorBorderSkin = this.calenderFlexBorderErrorSkin;
      if(this.currentSelectedIdInfo === null){
        this.showSelectIDError();
        return false;
      }else if(this.currentSelectedIdInfo==="ID_DRIVING_LICENSE"){
        var encounteredError = false;
        var dataEntries = [this.view.DriversCardNumber, this.view.DriversIssuedByState];
        var dataEntriesWithErrors = dataEntries.filter(function(e){
          return !e.isValid();
        });
        if(dataEntriesWithErrors.length > 0){
          dataEntriesWithErrors.forEach(function(e){
            e.showErrors();
          });
          encounteredError = true;
        }

        var dob = Date.parse(this.view.datePicker.value);
        var issueDate = Date.parse(this.view.calDriversLicenceIssueDate.value);
        var expiryDate = Date.parse(this.view.calDriversLicenceExpiryDate.value);

        if(this.view.calDriversLicenceIssueDate.value === ''){
          this.view.flxDriversIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversIssueDateError.setVisibility(true);
          this.view.lblDriversIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty");
          encounteredError = true;
        }else if(isNaN(issueDate)){
          this.view.flxDriversIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversIssueDateError.setVisibility(true);
          this.view.lblDriversIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.invalid_date");
          encounteredError = true;
        }else if(dob > issueDate){
          this.view.flxDriversIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversIssueDateError.setVisibility(true);
          this.view.lblDriversIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_greater_date_of_birth");
          encounteredError = true;
        }else if(issueDate > new Date()){
          this.view.flxDriversIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversIssueDateError.setVisibility(true);
          this.view.lblDriversIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_past_date");
          encounteredError = true;
        }else if(!isNaN(expiryDate) && issueDate >= expiryDate){
          this.view.flxDriversIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversIssueDateError.setVisibility(true);
          this.view.lblDriversIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_less_expiry_date");
          encounteredError = true;
        }else{
          this.view.flxDriversIssueDateErrorBorder.skin = normalBorderSkin;
          this.view.flxDriversIssueDateError.setVisibility(false);
        }
        if(this.view.calDriversLicenceExpiryDate.value === ''){
          this.view.flxDriversExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversExpiryDateError.setVisibility(true);
          this.view.lblDriversExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty");
          encounteredError = true;
        }else if(isNaN(expiryDate)){
          this.view.flxDriversExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversExpiryDateError.setVisibility(true);
          this.view.lblDriversExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.invalid_date");
          encounteredError = true;
        }else if(!isNaN(issueDate) && issueDate >= expiryDate){
          this.view.flxDriversExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversExpiryDateError.setVisibility(true);
          this.view.lblDriversExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_greater_issued_date");
          encounteredError = true;
        }else if(new Date() > expiryDate){
          this.view.flxDriversExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxDriversExpiryDateError.setVisibility(true);
          this.view.lblDriversExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.invalid_id_expired");
          encounteredError = true;
        }else{
          this.view.flxDriversExpiryDateErrorBorder.skin = normalBorderSkin;
          this.view.flxDriversExpiryDateError.setVisibility(false);
        }
        return !encounteredError;
      }else if(this.currentSelectedIdInfo==="ID_PASSPORT"){
        var encounteredError = false;
        var dataEntries = [
          this.view.PassportCardNumber,
          this.view.PassportIssuedByState,
          this.view.PassportIssuedByCountry,
        ];
        var dataEntriesWithErrors = dataEntries.filter(function(e){
          return !e.isValid();
        });
        if(dataEntriesWithErrors.length > 0){
          dataEntriesWithErrors.forEach(function(e){
            e.showErrors();
          });
          encounteredError = true;
        }

        var dob = Date.parse(this.view.datePicker.value);
        var issueDate = Date.parse(this.view.calPassportIssueDate.value);
        var expiryDate = Date.parse(this.view.calPassportExpiryDate.value);

        if(this.view.calPassportIssueDate.value === ''){
          this.view.flxPassportIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportIssueDateError.setVisibility(true);
          this.view.lblPassportIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty");
          encounteredError = true;
        }else if(isNaN(issueDate)){
          this.view.flxPassportIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportIssueDateError.setVisibility(true);
          this.view.lblPassportIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.invalid_date");
          encounteredError = true;
        }else if(dob > issueDate){
          this.view.flxPassportIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportIssueDateError.setVisibility(true);
          this.view.lblPassportIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_greater_date_of_birth");
          encounteredError = true;
        }else if(issueDate > new Date()){
          this.view.flxPassportIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportIssueDateError.setVisibility(true);
          this.view.lblPassportIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_past_date");
          encounteredError = true;
        }else if(!isNaN(expiryDate) && issueDate >= expiryDate){
          this.view.flxPassportIssueDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportIssueDateError.setVisibility(true);
          this.view.lblPassportIssueDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_less_expiry_date");
          encounteredError = true;
        }else{
          this.view.flxPassportIssueDateErrorBorder.skin = normalBorderSkin;
          this.view.flxPassportIssueDateError.setVisibility(false);
        }

        if(this.view.calPassportExpiryDate.value === ''){
          this.view.flxPassportExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportExpiryDateError.setVisibility(true);
          this.view.lblPassportExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_not_empty");
          encounteredError = true;
        }else if(isNaN(expiryDate)){
          this.view.flxPassportExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportExpiryDateError.setVisibility(true);
          this.view.lblPassportExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.invalid_date");
          encounteredError = true;
        }else if(!isNaN(issueDate) && issueDate >= expiryDate){
          this.view.flxPassportExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportExpiryDateError.setVisibility(true);
          this.view.lblPassportExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.should_greater_issued_date");
          encounteredError = true;
        }else if(new Date() > expiryDate){
          this.view.flxPassportExpiryDateErrorBorder.skin = errorBorderSkin;
          this.view.flxPassportExpiryDateError.setVisibility(true);
          this.view.lblPassportExpiryDateError.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.invalid_id_expired");
          encounteredError = true;
        }else{
          this.view.flxPassportExpiryDateErrorBorder.skin = normalBorderSkin;
          this.view.flxPassportExpiryDateError.setVisibility(false);
        }
        return !encounteredError;
      }
      return true;
    },
    getSelectedIdInfo:function(){
      var formatDate = function(date){
        return date.substr(3,2)+"-"+date.substr(0,2)+"-"+date.substr(6,4);
      };
      if(this.currentSelectedIdInfo==="ID_DRIVING_LICENSE"){
        return{
          "idType":this.currentSelectedIdInfo,
          "idValue":this.view.DriversCardNumber.getText(),
          "idState":this.view.DriversIssuedByState.getText(), 
          "issueDate":formatDate(this.view.calDriversLicenceIssueDate.value),
          "expiryDate":formatDate(this.view.calDriversLicenceExpiryDate.value),
        };
      }else if(this.currentSelectedIdInfo==="ID_PASSPORT"){
        return{
          "idType":this.currentSelectedIdInfo,
          "idValue":this.view.PassportCardNumber.getText(),
          "idState":this.view.PassportIssuedByState.getText(),
          "idCountry":this.view.PassportIssuedByCountry.getText(),
          "issueDate":formatDate(this.view.calPassportIssueDate.value),
          "expiryDate":formatDate(this.view.calPassportExpiryDate.value),
        };
      }
    },
    onCancelUspsValidation : function(){
      var scopeObj = this;
      scopeObj.view.flxUSPSValidation.isVisible = false;
      scopeObj.view.flxUSPSContainer.isVisible = false;
      scopeObj.view.lblUSPStext.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecomendationIgnored");
      scopeObj.view.lblUSPSIcon.skin = "skinErrorIconYellow";
      scopeObj.view.lblUSPSIcon.text = "";
      scopeObj.view.lblUSPSIcon.isVisible = true;
      scopeObj.view.lblUSPSButton.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.validateAgain");
      scopeObj.USPSValidated = true;
      scopeObj.view.lblUSPSButton.isVisible = true;
      scopeObj.USPSWidth();
      scopeObj.view.forceLayout();
    }

  };

});

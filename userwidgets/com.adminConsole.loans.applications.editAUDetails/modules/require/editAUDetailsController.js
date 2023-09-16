define(['Regexes'], function(Regexes) {

  return {
    flxvalidation:undefined,
    address1:undefined,
    address2:undefined,
    city:undefined,
    country:undefined,
    state:undefined,
    zip:undefined,
    uspserror:undefined,
    lblrecommendation:undefined,
    lblvalidate:undefined,
    editAUDetailsPreShow : function() {
      var scopeObj = this ;
      scopeObj.resetSkins();
      scopeObj.setFlowActions();
    },
    setFlowActions : function() {
      var scopeObj = this ;
      scopeObj.view.editAUPersonalInfo.txtNameValue.onTouchStart = function() {
        scopeObj.view.editAUPersonalInfo.txtNameValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUPersonalInfo.firstNameErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUPersonalInfo.txtLastNameValue.onTouchStart = function() {
        scopeObj.view.editAUPersonalInfo.txtLastNameValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUPersonalInfo.lastNameErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUPersonalInfo.txtDobValue.onTouchStart = function() {
        scopeObj.view.editAUPersonalInfo.lblDobTip.setVisibility(true); 
        scopeObj.view.editAUPersonalInfo.dobErrorMsg.setVisibility(false); 
        scopeObj.view.editAUPersonalInfo.txtDobValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.editAUPersonalInfo.flxDateOfBirthPersonalInfo.forceLayout();
      } ;
      scopeObj.view.editAUPersonalInfo.txtDobValue.onEndEditing = function() {
        scopeObj.view.editAUPersonalInfo.lblDobTip.setVisibility(false); 
        scopeObj.view.editAUPersonalInfo.flxDateOfBirthPersonalInfo.forceLayout();
      } ;
      scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.onTouchStart = function() {
        scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUPersonalInfo.emailAddressErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUPersonalInfo.txtSSNValue.onTouchStart = function() {
        scopeObj.view.editAUPersonalInfo.txtSSNValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUPersonalInfo.SSNErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUPersonalInfo.txtSSNValue.onKeyUp = function() {
        var textLen = scopeObj.view.editAUPersonalInfo.txtSSNValue.text.length ;
        scopeObj.view.editAUPersonalInfo.lblSSNSize.text = textLen + "/" + scopeObj.view.editAUPersonalInfo.txtSSNValue.maxtextlength;
        scopeObj.view.editAUPersonalInfo.lblSSNSize.setVisibility(true);
        scopeObj.view.editAUPersonalInfo.flxSSN.forceLayout();
        if(scopeObj.view.editAUPersonalInfo.txtSSNValue.text.length === 9) {
          var currForm = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
          currForm.presentationController.SSNValidation({
            "Ssn" : scopeObj.view.editAUPersonalInfo.txtSSNValue.text,
            "_searchType": "CUSTOMER_SEARCH"
          }) ;
        }
      };  
      scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.onTouchStart = function() {
        scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.onKeyUp = function() {
        scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.setVisibility(false);
        var textLen = scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.text.length ;
        scopeObj.view.editAUContactInfo.lblBusinessPhoneSize.text = textLen + "/" + scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.maxtextlength;
        scopeObj.view.editAUContactInfo.lblBusinessPhoneSize.setVisibility(true);
      };
      scopeObj.view.editAUContactInfo.txtHomePhoneValue.onTouchStart = function() {
        scopeObj.view.editAUContactInfo.txtHomePhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUContactInfo.homePhoneErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUContactInfo.txtHomePhoneValue.onKeyUp = function() {
        scopeObj.view.editAUContactInfo.txtHomePhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUContactInfo.homePhoneErrorMsg.setVisibility(false);
        var textLen = scopeObj.view.editAUContactInfo.txtHomePhoneValue.text.length ;
        scopeObj.view.editAUContactInfo.lblHomePhoneSize.text = textLen + "/" + scopeObj.view.editAUContactInfo.txtHomePhoneValue.maxtextlength;
        scopeObj.view.editAUContactInfo.lblHomePhoneSize.setVisibility(true);
      };
      scopeObj.view.editAUContactInfo.txtCellPhoneValue.onTouchStart = function() {
        scopeObj.view.editAUContactInfo.txtCellPhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.setVisibility(false);
      };
      scopeObj.view.editAUContactInfo.txtCellPhoneValue.onKeyUp = function() {
        scopeObj.view.editAUContactInfo.txtCellPhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.setVisibility(false);
        var textLen = scopeObj.view.editAUContactInfo.txtCellPhoneValue.text.length;
        scopeObj.view.editAUContactInfo.lblCellPhoneSize.text = textLen + "/" + scopeObj.view.editAUContactInfo.txtCellPhoneValue.maxtextlength;
        scopeObj.view.editAUContactInfo.lblCellPhoneSize.setVisibility(true);
      };

      scopeObj.view.flxRadioButton1.onClick = function() {
        scopeObj.setAutorizationUser(true);
        scopeObj.view.forceLayout();

      };
      scopeObj.view.editAddressInfoAsPrevious.txtAddressLine1Value.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.validateAddressUsps();
      };
      scopeObj.view.editAddressInfoAsPrevious.txtAddressLine2Value.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.validateAddressUsps();
      };
      scopeObj.view.editAddressInfoAsPrevious.txtCountryValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.validateAddressUsps();
      };
      scopeObj.view.editAddressInfoAsPrevious.txtStateValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.validateAddressUsps();
      };
      scopeObj.view.editAddressInfoAsPrevious.txtCityValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.validateAddressUsps();
      };
      scopeObj.view.editAddressInfoAsPrevious.txtZipCodeValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.validateAddressUsps();
      };
    },
    resetSkins : function() {
      var scopeObj = this ;
      scopeObj.view.editAddressInfoAsPrevious.lblConsentMsg.text  = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AddressSameAsApplicant") ;
      scopeObj.view.editAUPersonalInfo.txtNameValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUPersonalInfo.firstNameErrorMsg.setVisibility(false);
      scopeObj.view.editAUPersonalInfo.txtLastNameValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUPersonalInfo.lastNameErrorMsg.setVisibility(false) ;
      scopeObj.view.editAUPersonalInfo.txtDobValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUPersonalInfo.dobErrorMsg.setVisibility(false) ;
      scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUPersonalInfo.emailAddressErrorMsg.setVisibility(false) ;
      scopeObj.view.editAUPersonalInfo.txtSSNValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUPersonalInfo.SSNErrorMsg.setVisibility(false);
      scopeObj.view.editAUPersonalInfo.flxDLNumber.setVisibility(false);
      scopeObj.view.editAUPersonalInfo.flxState.setVisibility(false);

      scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.setVisibility(false);
      scopeObj.view.editAUContactInfo.txtHomePhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUContactInfo.homePhoneErrorMsg.setVisibility(false);
      scopeObj.view.editAUContactInfo.txtCellPhoneValue.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.setVisibility(false);

      scopeObj.view.editAddressInfoAsPrevious.txtAddressLine1Value.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.editAddressInfoAsPrevious.currentAddressErrorMsg.setVisibility(false) ;
      scopeObj.view.editAddressInfoAsPrevious.txtCountryValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.editAddressInfoAsPrevious.currentCountryErrorMsg.setVisibility(false) ;
      scopeObj.view.editAddressInfoAsPrevious.txtStateValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.editAddressInfoAsPrevious.currentStateErrorMsg.setVisibility(false) ;
      scopeObj.view.editAddressInfoAsPrevious.txtCityValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.editAddressInfoAsPrevious.currentCityErrorMsg.setVisibility(false) ;
      scopeObj.view.editAddressInfoAsPrevious.txtZipCodeValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.editAddressInfoAsPrevious.currentZipCodeErrorMsg.setVisibility(false) ;
    },

    validateAuthorizedUserdata : function() {
      var scopeObj = this ;
      var isValid = true;
      scopeObj.resetSkins();
      if(scopeObj.view.imgRadioButton1.src == "radio_selected.png") {
        if(scopeObj.view.editAUPersonalInfo.txtNameValue.text.trim() === "") {
          scopeObj.view.editAUPersonalInfo.txtNameValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.firstNameErrorMsg.setVisibility(true);
          scopeObj.view.editAUPersonalInfo.firstNameErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.FirstNameMissing");
          isValid = false;
        }
        if(scopeObj.view.editAUPersonalInfo.txtLastNameValue.text.trim() === "") {
          scopeObj.view.editAUPersonalInfo.txtLastNameValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.lastNameErrorMsg.setVisibility(true) ;
          scopeObj.view.editAUPersonalInfo.lastNameErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.LastNameMissing");
          isValid = false;
        }
        var dob = scopeObj.view.editAUPersonalInfo.txtDobValue.text.trim() ;
        var age = scopeObj.getAge(dob) ;
        if(dob === "" ) {
          scopeObj.view.editAUPersonalInfo.txtDobValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.dobErrorMsg.setVisibility(true) ;
          scopeObj.view.editAUPersonalInfo.dobErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateisMandatory") ;
          scopeObj.view.editAUPersonalInfo.lblDobTip.setVisibility(false);
          isValid = false; 
        } else if(isNaN(new Date(dob)) || age > 100 || age < 0 ) {
          scopeObj.view.editAUPersonalInfo.txtDobValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.dobErrorMsg.setVisibility(true) ;
          scopeObj.view.editAUPersonalInfo.dobErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.InvalidDateFormat") ;
          scopeObj.view.editAUPersonalInfo.lblDobTip.setVisibility(false);
          isValid = false;
        }else if(age < 18) {
          scopeObj.view.editAUPersonalInfo.txtDobValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.dobErrorMsg.setVisibility(true) ;
          scopeObj.view.editAUPersonalInfo.dobErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateLessthan18") ;
          scopeObj.view.editAUPersonalInfo.lblDobTip.setVisibility(false);
          isValid = false;
        }
        //Validating authorized user personal details
        var emailRegex = Regexes.emailRegex;
        if(scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.text.trim() === "") {
          scopeObj.view.editAUPersonalInfo.emailAddressErrorMsg.setVisibility(true) ;
          scopeObj.view.editAUPersonalInfo.emailAddressErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing");
          scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.skin = "skinredbg";
          isValid = false;
        } else if (emailRegex.test(scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.text.trim()) === false) {
          scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.emailAddressErrorMsg.setVisibility(true) ;
          scopeObj.view.editAUPersonalInfo.emailAddressErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing1");
          isValid = false;
        }
        if(scopeObj.view.editAUPersonalInfo.txtSSNValue.text.trim() === ""){
          scopeObj.view.editAUPersonalInfo.SSNErrorMsg.setVisibility(true);
          scopeObj.view.editAUPersonalInfo.txtSSNValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.SSNErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.errCode.21009");
          isValid = false;
        } else if(scopeObj.view.editAUPersonalInfo.txtSSNValue.text.length < 9){
          scopeObj.view.editAUPersonalInfo.SSNErrorMsg.setVisibility(true);
          scopeObj.view.editAUPersonalInfo.txtSSNValue.skin = "skinredbg";
          scopeObj.view.editAUPersonalInfo.SSNErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSNErrorlbl");
          isValid = false;
        }
        //validating authorized user contact details
        var phoneRegex = Regexes.phoneRegex;
        var primaryContactMethod = scopeObj.view.editAUContactInfo.lstPrimaryContactValue.selectedKeyValue[1].toUpperCase() ;
        var hasNoPhoneNumber = scopeObj.view.editAUContactInfo.txtHomePhoneValue.text.trim() === "" &&
            scopeObj.view.editAUContactInfo.txtCellPhoneValue.text.trim() === "" && scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.text.trim() === "" ;
        if(hasNoPhoneNumber) {
          scopeObj.view.editAUContactInfo.txtHomePhoneValue.skin = "skinredbg";
          scopeObj.view.editAUContactInfo.homePhoneErrorMsg.setVisibility(true);
          scopeObj.view.editAUContactInfo.homePhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");

          scopeObj.view.editAUContactInfo.txtCellPhoneValue.skin = "skinredbg";
          scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.setVisibility(true);
          scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");

          scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.skin = "skinredbg";
          scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.setVisibility(true);
          scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");

          isValid = false;
        } else {
          if (primaryContactMethod === kony.i18n.getLocalizedString("i18n.Applications.HomePhoneCAPS") && scopeObj.view.editAUContactInfo.txtHomePhoneValue.text.trim() === "" ) {
            scopeObj.view.editAUContactInfo.txtHomePhoneValue.skin = "skinredbg";
            scopeObj.view.editAUContactInfo.homePhoneErrorMsg.setVisibility(true);
            scopeObj.view.editAUContactInfo.homePhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PrimaryContactMethodValueCannotBeEmpty");
            isValid = false;
          } else if (scopeObj.view.editAUContactInfo.txtHomePhoneValue.text.trim() !== "" && phoneRegex.test(scopeObj.view.editAUContactInfo.txtHomePhoneValue.text) === false) {
            scopeObj.view.editAUContactInfo.txtHomePhoneValue.skin = "skinredbg";
            scopeObj.view.editAUContactInfo.homePhoneErrorMsg.setVisibility(true);
            scopeObj.view.editAUContactInfo.homePhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
            isValid = false;
          } 

          if (primaryContactMethod === "MOBILE NUMBER" && scopeObj.view.editAUContactInfo.txtCellPhoneValue.text.trim() === "" ) {
            scopeObj.view.editAUContactInfo.txtCellPhoneValue.skin = "skinredbg";
            scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.setVisibility(true);
            scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PrimaryContactMethodValueCannotBeEmpty");
            isValid = false;
          } else if (scopeObj.view.editAUContactInfo.txtCellPhoneValue.text.trim() !== "" && phoneRegex.test(scopeObj.view.editAUContactInfo.txtCellPhoneValue.text) === false) {
            scopeObj.view.editAUContactInfo.txtCellPhoneValue.skin = "skinredbg";
            scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.setVisibility(true);
            scopeObj.view.editAUContactInfo.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
            isValid = false;
          }

          if (primaryContactMethod === "OFFICE NUMBER" && scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.text.trim() === "") {
            scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.skin = "skinredbg";
            scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.setVisibility(true);
            scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PrimaryContactMethodValueCannotBeEmpty");
            isValid = false;
          } else if (scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.text.trim() !== "" && phoneRegex.test(scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.text) === false) {
            scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.skin = "skinredbg";
            scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.setVisibility(true);
            scopeObj.view.editAUContactInfo.businessPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
            isValid = false;
          }
        }
        // validate address details
        isValid = isValid && scopeObj.validateAddress();

      }
      return isValid;
    },

    setAutorizationUser : function(hasAutorizationUser) {
      var scopeObj = this ;
      scopeObj.view.imgRadioButton1.src = hasAutorizationUser ? "radio_selected.png" : "radio_notselected.png" ;
      scopeObj.view.imgRadioButton2.src = hasAutorizationUser ? "radio_notselected.png" : "radio_selected.png" ;
      scopeObj.view.editAUPersonalInfo.setVisibility(hasAutorizationUser);
      scopeObj.view.editAUContactInfo.setVisibility(hasAutorizationUser);
      scopeObj.view.editAddressInfoAsPrevious.setVisibility(hasAutorizationUser);
      scopeObj.view.forceLayout();
    },

    validateAddress : function() {
      var scopeObj = this ;
      var isValidAddress = true ;
      if(scopeObj.view.editAddressInfoAsPrevious.txtAddressLine1Value.text.trim() === "") {
        scopeObj.view.editAddressInfoAsPrevious.txtAddressLine1Value.skin = "skinredbg" ; 
        scopeObj.view.editAddressInfoAsPrevious.currentAddressErrorMsg.setVisibility(true) ;
        scopeObj.view.editAddressInfoAsPrevious.currentAddressErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AddressLine1isMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.editAddressInfoAsPrevious.txtCountryValue.text.trim() === "") {
        scopeObj.view.editAddressInfoAsPrevious.txtCountryValue.skin = "skinredbg" ; 
        scopeObj.view.editAddressInfoAsPrevious.currentCountryErrorMsg.setVisibility(true) ;
        scopeObj.view.editAddressInfoAsPrevious.currentCountryErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CountryisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.editAddressInfoAsPrevious.txtStateValue.text.trim() === "") {
        scopeObj.view.editAddressInfoAsPrevious.txtStateValue.skin = "skinredbg" ; 
        scopeObj.view.editAddressInfoAsPrevious.currentStateErrorMsg.setVisibility(true) ;
        scopeObj.view.editAddressInfoAsPrevious.currentStateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StateisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.editAddressInfoAsPrevious.txtCityValue.text.trim() === "") {
        scopeObj.view.editAddressInfoAsPrevious.txtCityValue.skin = "skinredbg" ; 
        scopeObj.view.editAddressInfoAsPrevious.currentCityErrorMsg.setVisibility(true) ;
        scopeObj.view.editAddressInfoAsPrevious.currentCityErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CityisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.editAddressInfoAsPrevious.txtZipCodeValue.text.trim() === "") {
        scopeObj.view.editAddressInfoAsPrevious.txtZipCodeValue.skin = "skinredbg" ; 
        scopeObj.view.editAddressInfoAsPrevious.currentZipCodeErrorMsg.setVisibility(true) ;
        scopeObj.view.editAddressInfoAsPrevious.currentZipCodeErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.ZipisMandatory");
        isValidAddress = false ;
      }
      return isValidAddress ;
    },

    getAge : function(dob) {
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }    
      return age;
    },
    validateAddressUsps : function() {
      var scopeObj=this;
      if(scopeObj.address1.text===""|| scopeObj.city.text===""||
         scopeObj.country.text===""|| scopeObj.state.text ==="" ||scopeObj.zip.text===""){
        scopeObj.isaddnull=true;
        scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.fillOutTheAddressToCheckUSPSValidation");
        scopeObj.lblvalidate.isVisible = false;
      }
      else{
        scopeObj.isaddnull=true;
        scopeObj.lblrecommendation.text= kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecommendation");
        scopeObj.lblvalidate.isVisible = true;
        scopeObj.lblvalidate.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.Validate");
      }
      scopeObj.view.forceLayout();
    },
    getAddressInput:function(){
      var scopeObj=this;
      var addressInput = {
        "Address1": scopeObj.address1.text,
        "Address2": scopeObj.address2.text,
        "City": scopeObj.city.text,
        "State": scopeObj.state.text,
        "Zip5": scopeObj.zip.text,
      };
      return addressInput;
    },
    setUspsValidationObjects: function (sectionname) {
      var scopeObj = this;
      if (sectionname === "auaddress") {
        scopeObj.address1 = scopeObj.view.editAddressInfoAsPrevious.txtAddressLine1Value;
        scopeObj.address2 = scopeObj.view.editAddressInfoAsPrevious.txtAddressLine2Value;
        scopeObj.city = scopeObj.view.editAddressInfoAsPrevious.txtCityValue;
        scopeObj.country = scopeObj.view.editAddressInfoAsPrevious.txtCountryValue;
        scopeObj.state = scopeObj.view.editAddressInfoAsPrevious.txtStateValue;
        scopeObj.zip = scopeObj.view.editAddressInfoAsPrevious.txtZipCodeValue;
        scopeObj.lblrecommendation = scopeObj.view.editAddressInfoAsPrevious.lblUspsRecommendation;
        scopeObj.lblvalidate = scopeObj.view.editAddressInfoAsPrevious.lblValidate;
        scopeObj.flxvalidation = scopeObj.view.editAddressInfoAsPrevious.flxAddressValidation;
        scopeObj.uspserror= scopeObj.view.editAddressInfoAsPrevious.lblUspsRecommendationErrorIcon;
      }
      scopeObj.uspserror.isVisible=false;
    },
    
    clearContents : function() {
      var scopeObj = this;
      scopeObj.view.editAUPersonalInfo.txtNameValue.text = "";
      scopeObj.view.editAUPersonalInfo.txtMiddleNameValue = "";
      scopeObj.view.editAUPersonalInfo.txtLastNameValue.text = "";
      scopeObj.view.editAUPersonalInfo.txtDobValue.text = "";
      scopeObj.view.editAUPersonalInfo.txtEmailAddressValue.text = "";
      scopeObj.view.editAUPersonalInfo.txtSSNValue.text = "";
      scopeObj.view.editAUContactInfo.txtHomePhoneValue.text = "";
      scopeObj.view.editAUContactInfo.txtCellPhoneValue.text = "";
      scopeObj.view.editAUContactInfo.txtBusinessPhoneValue.text = "";
      scopeObj.view.editAddressInfoAsPrevious.flxAcceptanceIcon.skin = "flxB7B7B7"  ;
      scopeObj.view.editAddressInfoAsPrevious.lblAcceptanceIcon.setVisibility(false) ;
      scopeObj.view.editAddressInfoAsPrevious.txtAddressLine1Value.text = "";
      scopeObj.view.editAddressInfoAsPrevious.txtAddressLine2Value.text = "";
      scopeObj.view.editAddressInfoAsPrevious.txtCountryValue.text = "";
      scopeObj.view.editAddressInfoAsPrevious.txtStateValue.text = "";
      scopeObj.view.editAddressInfoAsPrevious.txtCityValue.text = "";
      scopeObj.view.editAddressInfoAsPrevious.txtZipCodeValue.text = "";
    }
  };
});
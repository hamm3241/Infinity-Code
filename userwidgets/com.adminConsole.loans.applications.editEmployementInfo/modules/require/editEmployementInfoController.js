define(function() {

  return {
    addObj:"",
    flxvalidation:undefined,
    address1:undefined,
    address2:undefined,
    city:undefined,
    country:undefined,
    state:undefined,
    zip:undefined,
    lblrecommendation:undefined,
    lblvalidate:undefined,
    uspserror:undefined,
    editEmployementPreshow : function() {
      var scopeObj = this ;
      scopeObj.resetSkins();
      scopeObj.setFlowActions();
    },
    
    resetSkins : function() {
      var scopeObj = this ;
      scopeObj.view.lstEmploymentStatusValue.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px" ;
      scopeObj.view.employmentStatusErrorMsg.setVisibility(false) ;
      scopeObj.view.txtEmployerNameValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.employerNameErrorMsg.setVisibility(false) ;
      scopeObj.view.txtDesignationValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.designationErrorMsg.setVisibility(false) ;
      scopeObj.view.txtStartDateValue.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.startDateErrorMsg.setVisibility(false) ;
      scopeObj.view.txtGrossIncomeValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.grossIncomeErrorMsg.setVisibility(false) ;
      scopeObj.view.lstPayPeriodValue.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px" ;
      scopeObj.view.payPeriodErrorMsg.setVisibility(false) ;
      scopeObj.view.txtWorkHoursValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.workHoursErrorMsg.setVisibility(false) ;
      scopeObj.view.txtAddressLine1Value.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.addressLine1ErrorMsg.setVisibility(false) ;
      scopeObj.view.txtAddressLine2Value.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.addressLine2ErrorMsg.setVisibility(false) ;
      scopeObj.view.txtCountryValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentCountryErrorMsg.setVisibility(false) ;
      scopeObj.view.txtStateValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentStateErrorMsg.setVisibility(false) ;
      scopeObj.view.txtCityValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentCityErrorMsg.setVisibility(false) ;
      scopeObj.view.txtZipCodeValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentZipCodeErrorMsg.setVisibility(false) ;
      scopeObj.view.txtEmployerNameValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.employerNameErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtDesignationValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.designationErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtAddressLine1ValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.addressLine1ErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtAddressLine2ValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.addressLine2ErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtCountryValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentCountryErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtStateValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentStateErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtCityValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentCityErrorPrevMsg.setVisibility(false) ;
      scopeObj.view.txtZipCodeValuePrev.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.errorMsg.setVisibility(false) ;
      // military section
      scopeObj.view.txtDesignationValueMilitary.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.designationErrorMilitaryMsg.setVisibility(false) ;
      scopeObj.view.txtStartDateValueMilitary.skin = "sknflxffffffoptemplateop3px" ;
      scopeObj.view.startDateErrorMilitaryMsg.setVisibility(false) ;
      scopeObj.view.txtGrossIncomeValueMilitary.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.grossIncomeErrorMilitaryMsg.setVisibility(false) ;
      // other income
      scopeObj.view.txtEmpTypeValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.empTypeErrorMsg.setVisibility(false) ;
      scopeObj.view.txtGrossIncomeValueOther.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.grossIncomeErrorOtherMsg.setVisibility(false) ;
      scopeObj.view.lstPayPeriodValueOther.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px" ;
      scopeObj.view.payPeriodErrorOtherMsg.setVisibility(false) ;
      scopeObj.view.txtDescription.skin = "txtArea485c7513px" ;
    },

    setFlowActions : function() {
      var scopeObj = this ;

      scopeObj.view.flxRadioButton1.onClick = function() {
        scopeObj.showPreviousEmployment(true) ;
      } ;

      scopeObj.view.flxRadioButton2.onClick = function() {
        scopeObj.showPreviousEmployment(false) ;
      } ;

      scopeObj.view.txtDescription.onTouchStart = function() {
        var textLen = scopeObj.view.txtDescription.text.length ;
        scopeObj.view.lblDescriptionSize.text = textLen + "/" + scopeObj.view.txtDescription.maxtextlength; 
        scopeObj.view.lblDescriptionSize.setVisibility(true);
        scopeObj.view.flxDescription.forceLayout();
      } ;

      scopeObj.view.txtDescription.onKeyUp = function() {
        var textLen = scopeObj.view.txtDescription.text.length ;
        scopeObj.view.lblDescriptionSize.text = textLen + "/" + scopeObj.view.txtDescription.maxtextlength;   
        scopeObj.view.lblDescriptionSize.setVisibility(true);
        scopeObj.view.flxDescription.forceLayout();
      } ;

      scopeObj.view.txtDescription.onEndEditing = function(){
        scopeObj.view.lblDescriptionSize.setVisibility(false);
        scopeObj.view.flxDescription.forceLayout();
      };

      scopeObj.view.lstEmploymentStatusValue.onSelection = function() {
        scopeObj.employmentStatus();
      };

      scopeObj.view.lstPayPeriodValue.onSelection = function() {
        scopeObj.payPeriodSelection();
      };

      scopeObj.view.txtEmployerNameValue.onKeyUp = function() {
        scopeObj.view.employerNameErrorMsg.setVisibility(false);
        scopeObj.view.txtEmployerNameValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.flxEmployerName.forceLayout();
      };

      scopeObj.view.txtDesignationValue.onKeyUp = function() {
        scopeObj.view.designationErrorMsg.setVisibility(false);
        scopeObj.view.txtDesignationValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.view.flxDesignation.forceLayout();
      };

      scopeObj.view.txtAddressLine1Value.onKeyUp = function() {
        scopeObj.view.addressLine1ErrorMsg.setVisibility(false);
        scopeObj.view.txtAddressLine1Value.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };

      scopeObj.view.txtAddressLine2Value.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCountryValue.onKeyUp = function() {
        scopeObj.view.currentCountryErrorMsg.setVisibility(false);
        scopeObj.view.txtCountryValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtStateValue.onKeyUp = function() {
        scopeObj.view.currentStateErrorMsg .setVisibility(false);
        scopeObj.view.txtStateValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCityValue.onKeyUp = function() {
        scopeObj.view.currentCityErrorMsg.setVisibility(false);
        scopeObj.view.txtCityValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtZipCodeValue.onKeyUp = function() {
        scopeObj.view.currentZipCodeErrorMsg.setVisibility(false);
        scopeObj.view.txtZipCodeValue.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtDesignationValueMilitary.onTouchStart = function() {
        scopeObj.view.designationErrorMilitaryMsg.setVisibility(false);
        scopeObj.view.txtDesignationValueMilitary.skin = "skntxtbxDetails0bbf1235271384a";
      };

      scopeObj.view.txtStartDateValueMilitary.onTouchStart = function() {
        scopeObj.view.startDateErrorMilitaryMsg.setVisibility(false);
        scopeObj.view.txtStartDateValueMilitary.skin = "skntxtbxDetails0bbf1235271384a";
      };

      scopeObj.view.txtEmpTypeValue.onTouchStart = function() {
        scopeObj.view.empTypeErrorMsg.setVisibility(false);
        scopeObj.view.txtEmpTypeValue.skin = "skntxtbxDetails0bbf1235271384a";
      };
      scopeObj.view.txtEmployerNameValuePrev.onTouchStart = function() {
        scopeObj.view.employerNameErrorPrevMsg.setVisibility(false);
        scopeObj.view.txtEmployerNameValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
      };
      scopeObj.view.txtDesignationValuePrev.onTouchStart = function() {
        scopeObj.view.designationErrorPrevMsg.setVisibility(false);
        scopeObj.view.txtDesignationValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
      };

      scopeObj.view.txtAddressLine1ValuePrev.onKeyUp = function() {
        scopeObj.view.addressLine1ErrorPrevMsg.setVisibility(false);
        scopeObj.view.txtAddressLine1ValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("prevempaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCountryValuePrev.onKeyUp = function() {
        scopeObj.view.currentCountryErrorPrevMsg.setVisibility(false);
        scopeObj.view.txtCountryValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("prevempaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtStateValuePrev.onKeyUp = function() {
        scopeObj.view.currentStateErrorPrevMsg.setVisibility(false);
        scopeObj.view.txtStateValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("prevempaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCityValuePrev.onKeyUp = function() {
        scopeObj.view.currentCityErrorPrevMsg.setVisibility(false);
        scopeObj.view.txtCityValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("prevempaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtZipCodeValuePrev.onKeyUp = function() {
        scopeObj.view.txtZipCodeValuePrev .setVisibility(false);
        scopeObj.view.txtZipCodeValuePrev.skin = "skntxtbxDetails0bbf1235271384a";
        scopeObj.setUspsValidationObjects("prevempaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtGrossIncomeValue.onTouchStart = function() {
        scopeObj.view.txtGrossIncomeValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.grossIncomeErrorMsg.setVisibility(false) ;
      };

      scopeObj.view.txtWorkHoursValue.onTouchStart = function() {
        scopeObj.view.txtWorkHoursValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.workHoursErrorMsg.setVisibility(false) ;
      };

      scopeObj.view.txtGrossIncomeValueMilitary.onTouchStart = function() {
        scopeObj.view.txtGrossIncomeValueMilitary.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.grossIncomeErrorMilitaryMsg.setVisibility(false) ;
      };

      scopeObj.view.txtGrossIncomeValueOther.onTouchStart = function() {
        scopeObj.view.txtGrossIncomeValueOther.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.grossIncomeErrorOtherMsg.setVisibility(false) ;
      };
    },

    showPreviousEmployment : function(hasPreviousEmp) {
      var scopeObj = this ;
      scopeObj.view.imgRadioButton1.src = hasPreviousEmp ? "radio_selected.png" : "radio_notselected.png";
      scopeObj.view.imgRadioButton2.src = hasPreviousEmp ? "radio_notselected.png" : "radio_selected.png" ;
      scopeObj.view.flxPreviousEmployer.setVisibility(hasPreviousEmp) ;
      scopeObj.view.forceLayout();
    },

    employmentStatus : function() {
      var scopeObj = this ;
      var selectedValue = scopeObj.view.lstEmploymentStatusValue.selectedKeyValue[1] ;
      scopeObj.editEmployementPreshow();
      switch(selectedValue) {
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmployed") :  // self employed
          scopeObj.view.loansSectionHeader1.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmploymentDetails") ;
          scopeObj.view.lblEmployerName.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.BusinessName");
          scopeObj.view.flxRowMilitary.setVisibility(false) ;
          scopeObj.view.flxOtherEmp.setVisibility(false) ;   
          scopeObj.view.flxDesignation.setVisibility(false) ;
          scopeObj.view.flxFulltimeEmployment.setVisibility(true) ;
          scopeObj.view.flxPresentEmployer.setVisibility(true) ;
          scopeObj.view.flxPrevEmpStatus.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Military") : // military
          scopeObj.view.loansSectionHeader1.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.MilitaryEmploymentDetails");
          scopeObj.view.flxRowMilitary.setVisibility(true) ;
          scopeObj.view.flxOtherEmp.setVisibility(false) ;   
          scopeObj.view.flxPresentEmployer.setVisibility(true) ;
          scopeObj.view.flxFulltimeEmployment.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Unemployed") : // unemployed
          scopeObj.view.flxPresentEmployer.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Other") : // other
          scopeObj.view.loansSectionHeader1.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.OtherEmployment");
          scopeObj.view.flxRowMilitary.setVisibility(false) ;
          scopeObj.view.flxOtherEmp.setVisibility(true) ;   
          scopeObj.view.flxPresentEmployer.setVisibility(true) ;
          scopeObj.view.flxFulltimeEmployment.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break;
        default : 
          scopeObj.view.loansSectionHeader1.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PresentEmployerDetails") ;
          scopeObj.view.lblEmployerName.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EmployerName");
          scopeObj.view.flxRowMilitary.setVisibility(false) ;
          scopeObj.view.flxOtherEmp.setVisibility(false) ;     
          scopeObj.view.flxDesignation.setVisibility(true) ;
          scopeObj.view.flxFulltimeEmployment.setVisibility(true) ;
          scopeObj.view.flxPresentEmployer.setVisibility(true) ;
          scopeObj.view.flxPrevEmpStatus.setVisibility(true) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(scopeObj.view.imgRadioButton1.src === "radio_selected.png") ;
          break ;
      }
      scopeObj.payPeriodSelection();
    },

    payPeriodSelection : function() {
      var scopeObj = this ;
      var selectedValue = scopeObj.view.lstPayPeriodValue.selectedKeyValue[1] ;
      scopeObj.view.flxRow3.setVisibility(selectedValue.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Hourly").toUpperCase()) ;
      scopeObj.view.flxPresentEmployer.forceLayout();
    },

    validateAddress : function() {
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

    setUspsValidationObjects : function(sectionname){
      var scopeObj=this;
      if(sectionname==="empaddress"){
        scopeObj.address1=scopeObj.view.txtAddressLine1Value;
        scopeObj.address2=scopeObj.view.txtAddressLine2Value;
        scopeObj.city=scopeObj.view.txtCityValue;
        scopeObj.country=scopeObj.view.txtCountryValue;
        scopeObj.state=scopeObj.view.txtStateValue;
        scopeObj.zip=scopeObj.view.txtZipCodeValue;
        scopeObj.lblrecommendation=scopeObj.view.lblUspsRecommendation;
        scopeObj.lblvalidate=scopeObj.view.lblValidate;
        scopeObj.flxvalidation=scopeObj.view.flxAddressValidation;
        scopeObj.uspserror=scopeObj.view.lblUspsRecommendationErrorIcon;
      }
      else if(sectionname==="prevempaddress"){
        scopeObj.address1=scopeObj.view.txtAddressLine1ValuePrev;
        scopeObj.address2=scopeObj.view.txtAddressLine2ValuePrev;
        scopeObj.city=scopeObj.view.txtCityValuePrev;
        scopeObj.country=scopeObj.view.txtCountryValuePrev;
        scopeObj.state=scopeObj.view.txtStateValuePrev;
        scopeObj.zip=scopeObj.view.txtZipCodeValuePrev;
        scopeObj.lblrecommendation=scopeObj.view.lblUspsRecommendationPrev;
        scopeObj.lblvalidate=scopeObj.view.lblVallidatePrev;
        scopeObj.flxvalidation=scopeObj.view.flxAddressValidationPrev;
        scopeObj.uspserror=scopeObj.view.lblUspsRecommendationErrorIconPrev;
      }
      scopeObj.uspserror.isVisible=false;
    },

    validateEmploymentInfo : function() {
      var scopeObj = this ;
      var isValid = true ;
      scopeObj.resetSkins();
      var selectedValue = scopeObj.view.lstEmploymentStatusValue.selectedKeyValue[1] ;
      switch(selectedValue) {
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmployed") :
          if(scopeObj.view.txtEmployerNameValue.text.trim() === "" ) {
            scopeObj.view.txtEmployerNameValue.skin = "skinredbg" ; 
            scopeObj.view.employerNameErrorMsg.setVisibility(true) ;
            scopeObj.view.employerNameErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.BusinessNameIsMandatory");
            isValid = false ;
          }
          var startDate = scopeObj.view.txtStartDateValue.text.trim() ;
          if(startDate === "" ) {
            scopeObj.view.txtStartDateValue.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StartDateIsMandatory");
            isValid = false ;
          } else if(isNaN(new Date(startDate))) {
            scopeObj.view.txtStartDateValue.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.InvalidDateFormat");
            isValid = false ;
          } else if(scopeObj.getAge(startDate) < 0) {
            scopeObj.view.txtStartDateValue.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateExceedToday");
            isValid = false ;
          }
          if(scopeObj.view.txtGrossIncomeValue.text.trim() === "" ) {
            scopeObj.view.txtGrossIncomeValue.skin = "skinredbg" ; 
            scopeObj.view.grossIncomeErrorMsg.setVisibility(true) ;
            scopeObj.view.grossIncomeErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AmountIsMandatory");
            isValid = false ;
          }
          if(scopeObj.view.lstPayPeriodValue.selectedKeyValue[1] === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select") ) {
            scopeObj.view.lstPayPeriodValue.skin = "sknLstBoxeb3017Bor3px" ;
            scopeObj.view.payPeriodErrorMsg.setVisibility(true) ;
            scopeObj.view.payPeriodErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PayPeriodIsMandatory");
            isValid = false ;
          }
          var isValidAddress = scopeObj.validateAddressInfo();
          isValid = isValid && isValidAddress ;
          break;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Military") :
          if(scopeObj.view.txtDesignationValueMilitary.text.trim() === "") {
            scopeObj.view.txtDesignationValueMilitary.skin = "skinredbg" ; 
            scopeObj.view.designationErrorMilitaryMsg.setVisibility(true) ;
            scopeObj.view.designationErrorMilitaryMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DesignationisMandatory");
            isValid = false ;
          }
          var startDate = scopeObj.view.txtStartDateValueMilitary.text.trim() ;
          if(startDate === "") {
            scopeObj.view.txtStartDateValueMilitary.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMilitaryMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMilitaryMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StartDateIsMandatory");
            isValid = false ;
          } else if(isNaN(new Date(startDate))) {
            scopeObj.view.txtStartDateValueMilitary.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMilitaryMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMilitaryMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.InvalidDateFormat");
            isValid = false ;
          } else if(scopeObj.getAge(startDate) < 0) {
            scopeObj.view.txtStartDateValueMilitary.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMilitaryMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMilitaryMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateExceedToday");
            isValid = false ;
          }
          if(scopeObj.view.txtGrossIncomeValueMilitary.text.trim() === "") {
            scopeObj.view.txtGrossIncomeValueMilitary.skin = "skinredbg" ; 
            scopeObj.view.grossIncomeErrorMilitaryMsg.setVisibility(true) ;
            scopeObj.view.grossIncomeErrorMilitaryMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AmountIsMandatory");
            isValid = false ;
          }
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Other") : 
          if(scopeObj.view.txtEmpTypeValue.text.trim() === "") {
            scopeObj.view.txtEmpTypeValue.skin = "skinredbg" ; 
            scopeObj.view.empTypeErrorMsg.setVisibility(true) ;
            scopeObj.view.empTypeErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EmploymentTypeisMandatory");
            isValid = false ;
          }
          if(scopeObj.view.txtGrossIncomeValueOther.text.trim() === "") {
            scopeObj.view.txtGrossIncomeValueOther.skin = "skinredbg" ; 
            scopeObj.view.grossIncomeErrorOtherMsg.setVisibility(true) ;
            scopeObj.view.grossIncomeErrorOtherMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AmountIsMandatory");
            isValid = false ;
          }
          if(scopeObj.view.lstPayPeriodValueOther.selectedKeyValue[1] === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select")) {
            scopeObj.view.lstPayPeriodValue.skin = "sknLstBoxeb3017Bor3px" ;
            scopeObj.view.payPeriodErrorOtherMsg.setVisibility(true) ;
            scopeObj.view.payPeriodErrorOtherMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PayPeriodIsMandatory");
            isValid = false ;
          }
          break;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.FullTimeEmployed") :  
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.PartTimeEmployed") :  
          if(scopeObj.view.txtEmployerNameValue.text.trim() === "" ) {
            scopeObj.view.txtEmployerNameValue.skin = "skinredbg" ; 
            scopeObj.view.employerNameErrorMsg.setVisibility(true) ;
            scopeObj.view.employerNameErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EmployerNameisMandatory");
            isValid = false ;
          }
          if(scopeObj.view.txtDesignationValue.text.trim() === "" ) {
            scopeObj.view.txtDesignationValue.skin = "skinredbg" ; 
            scopeObj.view.designationErrorMsg.setVisibility(true) ;
            scopeObj.view.designationErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DesignationisMandatory");
            isValid = false ;
          }
          var startDate = scopeObj.view.txtStartDateValue.text.trim() ;
          if(startDate === "" ) {
            scopeObj.view.txtStartDateValue.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StartDateIsMandatory");
            isValid = false ;
          } else if(isNaN(new Date(startDate))) {
            scopeObj.view.txtStartDateValue.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.InvalidDateFormat");
            isValid = false ;
          } else if(scopeObj.getAge(startDate) < 0) {
            scopeObj.view.txtStartDateValue.skin = "skinredbg" ; 
            scopeObj.view.startDateErrorMsg.setVisibility(true) ;
            scopeObj.view.startDateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateExceedToday");
            isValid = false ;
          }
          if(scopeObj.view.txtGrossIncomeValue.text.trim() === "" ) {
            scopeObj.view.txtGrossIncomeValue.skin = "skinredbg" ; 
            scopeObj.view.grossIncomeErrorMsg.setVisibility(true) ;
            scopeObj.view.grossIncomeErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AmountIsMandatory");
            isValid = false ;
          }
          if(scopeObj.view.lstPayPeriodValue.selectedKeyValue[1] === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select") ) {
            scopeObj.view.lstPayPeriodValue.skin = "sknLstBoxeb3017Bor3px" ;
            scopeObj.view.payPeriodErrorMsg.setVisibility(true) ;
            scopeObj.view.payPeriodErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PayPeriodIsMandatory");
            isValid = false ;
          }
          var hasWorkHours = scopeObj.view.lstPayPeriodValue.selectedKeyValue[1].toUpperCase() === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Hourly").toUpperCase() ;
          if(hasWorkHours && scopeObj.view.txtWorkHoursValue.text.trim() === "") {
            scopeObj.view.txtWorkHoursValue.skin = "skinredbg" ; 
            scopeObj.view.workHoursErrorMsg.setVisibility(true) ;
            scopeObj.view.workHoursErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.WorkHoursisMandatory");
            isValid = false ;
          }
          var isValidAddress = scopeObj.validateAddressInfo();
          isValid = isValid && isValidAddress ;
          if(scopeObj.view.imgRadioButton1.src === "radio_selected.png") {
            if(scopeObj.view.txtEmployerNameValuePrev.text.trim() === "" ) {
              scopeObj.view.txtEmployerNameValuePrev.skin = "skinredbg" ; 
              scopeObj.view.employerNameErrorPrevMsg.setVisibility(true) ;
              scopeObj.view.employerNameErrorPrevMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EmployerNameisMandatory");
              isValid = false ;
            }
            if(scopeObj.view.txtDesignationValuePrev.text.trim() === "" ) {
              scopeObj.view.txtDesignationValuePrev.skin = "skinredbg" ; 
              scopeObj.view.designationErrorPrevMsg.setVisibility(true) ;
              scopeObj.view.designationErrorPrevMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DesignationisMandatory");
              isValid = false ;
            }
            var isValidAddress = scopeObj.validatePreviousEmpAddressInfo();
            isValid = isValid && isValidAddress ;
          }
          break ;
        default :
          break ;
      }
      return isValid ;
    },

    validateAddressInfo : function() {
      var scopeObj = this ;
      var isValidAddress = true ;
      if(scopeObj.view.txtAddressLine1Value.text.trim() === "") {
        scopeObj.view.txtAddressLine1Value.skin = "skinredbg" ; 
        scopeObj.view.addressLine1ErrorMsg.setVisibility(true) ;
        scopeObj.view.addressLine1ErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AddressLine1isMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtCountryValue.text.trim() === "") {
        scopeObj.view.txtCountryValue.skin = "skinredbg" ; 
        scopeObj.view.currentCountryErrorMsg.setVisibility(true) ;
        scopeObj.view.currentCountryErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CountryisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtStateValue.text.trim() === "") {
        scopeObj.view.txtStateValue.skin = "skinredbg" ; 
        scopeObj.view.currentStateErrorMsg.setVisibility(true) ;
        scopeObj.view.currentStateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StateisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtCityValue.text.trim() === "") {
        scopeObj.view.txtCityValue.skin = "skinredbg" ; 
        scopeObj.view.currentCityErrorMsg.setVisibility(true) ;
        scopeObj.view.currentCityErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CityisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtZipCodeValue.text.trim() === "") {
        scopeObj.view.txtZipCodeValue.skin = "skinredbg" ; 
        scopeObj.view.currentZipCodeErrorMsg.setVisibility(true) ;
        scopeObj.view.currentZipCodeErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.ZipisMandatory");
        isValidAddress = false ;
      }
      return isValidAddress ;
    },

    validatePreviousEmpAddressInfo : function() {
      var scopeObj = this ;
      var isValidAddress = true ;
      if(scopeObj.view.txtAddressLine1ValuePrev.text.trim() === "") {
        scopeObj.view.txtAddressLine1ValuePrev.skin = "skinredbg" ; 
        scopeObj.view.addressLine1ErrorPrevMsg.setVisibility(true) ;
        scopeObj.view.addressLine1ErrorPrevMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AddressLine1isMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtCountryValuePrev.text.trim() === "") {
        scopeObj.view.txtCountryValuePrev.skin = "skinredbg" ; 
        scopeObj.view.currentCountryErrorPrevMsg.setVisibility(true) ;
        scopeObj.view.currentCountryErrorPrevMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CountryisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtStateValuePrev.text.trim() === "") {
        scopeObj.view.txtStateValuePrev.skin = "skinredbg" ; 
        scopeObj.view.currentStateErrorPrevMsg.setVisibility(true) ;
        scopeObj.view.currentStateErrorPrevMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StateisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtCityValuePrev.text.trim() === "") {
        scopeObj.view.txtCityValuePrev.skin = "skinredbg" ; 
        scopeObj.view.currentCityErrorPrevMsg.setVisibility(true) ;
        scopeObj.view.currentCityErrorPrevMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CityisMandatory");
        isValidAddress = false ;
      }
      if(scopeObj.view.txtZipCodeValuePrev.text.trim() === "") {
        scopeObj.view.txtZipCodeValuePrev.skin = "skinredbg" ; 
        scopeObj.view.errorMsg.setVisibility(true) ;
        scopeObj.view.errorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.ZipisMandatory");
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
    }

  };

});
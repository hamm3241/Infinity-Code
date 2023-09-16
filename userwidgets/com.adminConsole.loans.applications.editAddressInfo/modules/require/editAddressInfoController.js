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
    maxCharacterLimit: {
      "txtAddressLine1Value": 40,
      "txtAddressLine2Value": 40,
      "txtAddressLine1Value2" : 40,
      "txtAddressLine2Value2" : 40
    },

    getMaxCharacterLimit: function(key) {
      return this.maxCharacterLimit[key];
    },

    editAddressPreshow : function() {
      var scopeObj = this;
      scopeObj.resetSkins();
      scopeObj.setFlowActions();
    },

    resetSkins : function() {
      var scopeObj = this ;
      // current address
      scopeObj.view.currentAddressErrorMsg.setVisibility(false) ;
      scopeObj.view.txtAddressLine1Value.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.txtAddressLine2Value.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.currentZipCodeErrorMsg.setVisibility(false) ;
      scopeObj.view.txtZipCodeValue.skin = "skntxtbxDetails0bbf1235271384a" ;  
      scopeObj.view.currentCountryErrorMsg.setVisibility(false) ;
      scopeObj.view.txtCountryValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentStateErrorMsg.setVisibility(false) ;
      scopeObj.view.txtStateValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentCityErrorMsg.setVisibility(false) ;
      scopeObj.view.txtCityValue.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.lblAddrLine1Size.setVisibility(false) ;
      scopeObj.view.lblAddreLine2Size.setVisibility(false) ;
      // previous address      
      scopeObj.view.currentAddressError2Msg.setVisibility(false) ;
      scopeObj.view.txtAddressLine1Value2.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.txtAddressLine2Value2.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.currentZipCodeError2Msg.setVisibility(false) ;
      scopeObj.view.txtZipCodeValue2.skin = "skntxtbxDetails0bbf1235271384a" ;  
      scopeObj.view.currentCountryError2Msg.setVisibility(false) ;
      scopeObj.view.txtCountryValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentStateError2Msg.setVisibility(false) ;
      scopeObj.view.txtStateValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.currentCityError2Msg.setVisibility(false) ;
      scopeObj.view.txtCityValue2.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.lblAddrLine1Size2.setVisibility(false) ;
      scopeObj.view.lblAddreLine2Size2.setVisibility(false) ;
    },

    setFlowActions: function() {
      var scopeObj = this;

      scopeObj.view.imgRadioButton1.onClick = function(){
        scopeObj.radioButtonOnClick(false);
      };

      scopeObj.view.imgRadioButton2.onClick = function(){
        scopeObj.radioButtonOnClick(true);
      };

      scopeObj.view.txtAddressLine1Value.onKeyUp = function() {
        var textLen = scopeObj.view.txtAddressLine1Value.text.length ;
        scopeObj.view.lblAddrLine1Size.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine1Value;
        scopeObj.view.lblAddrLine1Size.setVisibility(true);
        scopeObj.view.flxAddressLine1.forceLayout();
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };

      scopeObj.view.txtAddressLine1Value.onEndEditing = function(){
        scopeObj.view.lblAddrLine1Size.setVisibility(false);
      };

      scopeObj.view.txtAddressLine2Value.onKeyUp = function() {
        var textLen = scopeObj.view.txtAddressLine2Value.text.length ;
        scopeObj.view.lblAddreLine2Size.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine2Value;
        scopeObj.view.lblAddreLine2Size.setVisibility(true);
        scopeObj.view.flxAddressLine2.forceLayout();
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.validateAddress();
      };

      scopeObj.view.txtAddressLine2Value.onEndEditing = function(){
        scopeObj.view.lblAddreLine2Size.setVisibility(false);
      };

      scopeObj.view.txtAddressLine1Value.onTouchStart = function() {
        var textLen = scopeObj.view.txtAddressLine1Value.text.length ;
        scopeObj.view.lblAddrLine1Size.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine1Value;
        scopeObj.view.lblAddrLine1Size.setVisibility(true);

        scopeObj.view.currentAddressErrorMsg.setVisibility(false) ;
        scopeObj.view.txtAddressLine1Value.skin = "skntxtbxDetails0bbf1235271384a" ;
        scopeObj.view.flxAddressLine1.forceLayout();
      } ;

      scopeObj.view.txtAddressLine2Value.onTouchStart = function() {
        var textLen = scopeObj.view.txtAddressLine2Value.text.length ;
        scopeObj.view.lblAddreLine2Size.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine2Value;
        scopeObj.view.lblAddreLine2Size.setVisibility(true);
        scopeObj.view.flxAddressLine2.forceLayout();
      } ;

      scopeObj.view.txtZipCodeValue.onTouchStart = function() {
        scopeObj.view.currentZipCodeErrorMsg.setVisibility(false) ;
        scopeObj.view.txtZipCodeValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtCountryValue.onTouchStart = function() {
        scopeObj.view.currentCountryErrorMsg.setVisibility(false) ;
        scopeObj.view.txtCountryValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtStateValue.onTouchStart = function() {
        scopeObj.view.currentStateErrorMsg.setVisibility(false) ;
        scopeObj.view.txtStateValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtCityValue.onTouchStart = function() {
        scopeObj.view.currentCityErrorMsg.setVisibility(false) ;
        scopeObj.view.txtCityValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.flxValidate.onClick = function() {
        scopeObj.validateAddress("") ;
      };

      scopeObj.view.txtAddressLine1Value2.onKeyUp = function() {
        var textLen = scopeObj.view.txtAddressLine1Value2.text.length ;
        scopeObj.view.lblAddrLine1Size2.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine1Value2;
        scopeObj.view.lblAddrLine1Size2.setVisibility(true);
        scopeObj.view.flxPrevAddressLine1.forceLayout();
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.validateAddress();
      };

      scopeObj.view.txtAddressLine1Value2.onEndEditing = function(){
        scopeObj.view.lblAddrLine1Size2.setVisibility(false);
      };

      scopeObj.view.txtAddressLine2Value2.onKeyUp = function() {
        var textLen = scopeObj.view.txtAddressLine2Value2.text.length ;
        scopeObj.view.lblAddreLine2Size2.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine2Value2;
        scopeObj.view.lblAddreLine2Size2.setVisibility(true);
        scopeObj.view.flxPrevAddressLine2.forceLayout();
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.validateAddress();
      };

      scopeObj.view.txtAddressLine2Value2.onEndEditing = function(){
        scopeObj.view.lblAddreLine2Size2.setVisibility(false);
      };

      scopeObj.view.txtAddressLine1Value2.onTouchStart = function() {
        var textLen = scopeObj.view.txtAddressLine1Value2.text.length ;
        scopeObj.view.lblAddrLine1Size2.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine1Value2;
        scopeObj.view.lblAddrLine1Size2.setVisibility(true);
        scopeObj.view.currentAddressError2Msg.setVisibility(false) ;
        scopeObj.view.txtAddressLine1Value2.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.flxPrevAddressLine1.forceLayout();
      } ;

      scopeObj.view.txtAddressLine2Value2.onTouchStart = function() {
        var textLen = scopeObj.view.txtAddressLine2Value2.text.length ;
        scopeObj.view.lblAddreLine2Size2.text = textLen + "/" + scopeObj.maxCharacterLimit.txtAddressLine2Value2;
        scopeObj.view.lblAddreLine2Size2.setVisibility(true);
        scopeObj.view.flxPrevAddressLine2.forceLayout();
      } ;

      scopeObj.view.txtZipCodeValue2.onTouchStart = function() {
        scopeObj.view.currentZipCodeError2Msg.setVisibility(false) ;
        scopeObj.view.txtZipCodeValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtCountryValue2.onTouchStart = function() {
        scopeObj.view.currentCountryError2Msg.setVisibility(false) ;
        scopeObj.view.txtCountryValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtStateValue2.onTouchStart = function() {
        scopeObj.view.currentStateError2Msg.setVisibility(false) ;
        scopeObj.view.txtStateValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtCityValue2.onTouchStart = function() {
        scopeObj.view.currentCityError2Msg.setVisibility(false) ;
        scopeObj.view.txtCityValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.flxValidate2.onClick = function() {
        scopeObj.validateAddress("") ;
      };
      scopeObj.view.txtCountryValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("address");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtStateValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("address");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCityValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("address");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtZipCodeValue.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("address");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCountryValue2.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtStateValue2.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtCityValue2.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.validateAddress();
      };
      scopeObj.view.txtZipCodeValue2.onKeyUp = function(){
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.validateAddress();
      };

    },

    radioButtonOnClick : function(hasPrevAddress){
      var scopeObj =this;      
      scopeObj.view.imgRadioButton1.src = hasPrevAddress ? "radio_notselected.png" : "radio_selected.png" ;
      scopeObj.view.imgRadioButton2.src = hasPrevAddress ? "radio_selected.png" : "radio_notselected.png";  
      scopeObj.view.flxPreviousAddressSection.setVisibility(hasPrevAddress) ;      
      scopeObj.view.forceLayout();
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
      if(sectionname==="address"){
        scopeObj.address1=scopeObj.view.txtAddressLine1Value;
        scopeObj.address2=scopeObj.view.txtAddressLine2Value;
        scopeObj.city=scopeObj.view.txtCityValue;
        scopeObj.country=scopeObj.view.txtCountryValue;
        scopeObj.state=scopeObj.view.txtStateValue;
        scopeObj.zip=scopeObj.view.txtZipCodeValue;
        scopeObj.lblrecommendation=scopeObj.view.lblUspsRecommendation;
        scopeObj.lblvalidate=scopeObj.view.lblValidate;
        scopeObj.flxvalidation=scopeObj.view.flxAddressValidation;
        scopeObj.uspserror= scopeObj.view.lblUspsRecommendationErrorIcon;
      }
      else if(sectionname==="prevaddress"){
        scopeObj.address1=scopeObj.view.txtAddressLine1Value2;
        scopeObj.address2=scopeObj.view.txtAddressLine2Value2;
        scopeObj.city=scopeObj.view.txtCityValue2;
        scopeObj.country=scopeObj.view.txtCountryValue2;
        scopeObj.state=scopeObj.view.txtStateValue2;
        scopeObj.zip=scopeObj.view.txtZipCodeValue2;
        scopeObj.lblrecommendation=scopeObj.view.lblUspsRecommendation2;
        scopeObj.lblvalidate=scopeObj.view.lblValidate2;
        scopeObj.flxvalidation=scopeObj.view.flxPrevAddressValidation;
        scopeObj.uspserror= scopeObj.view.lblUspsRecommendationErrorIcon2;
      }
      scopeObj.uspserror.isVisible=false;
    }, 
    validateAddressData : function() {
      var scopeObj = this;
      scopeObj.resetSkins();
      var isValid = true;
      // applicant details present address info
      if(scopeObj.view.txtAddressLine1Value.text.trim() === "") {
        scopeObj.view.currentAddressErrorMsg.setVisibility(true) ;
        scopeObj.view.currentAddressErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomers.ErrorAddressLine1");
        scopeObj.view.txtAddressLine1Value.skin = "skinredbg";
        isValid = false;
      }
      if(scopeObj.view.txtZipCodeValue.text.trim() === "") {
        scopeObj.view.currentZipCodeErrorMsg.setVisibility(true) ;
        scopeObj.view.currentZipCodeErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomers.ErrorZipcode");
        scopeObj.view.txtZipCodeValue.skin = "skinredbg";
        isValid = false;
      }
      if(scopeObj.view.txtCountryValue.text.trim() === "") {
        scopeObj.view.currentCountryErrorMsg.setVisibility(true) ;
        scopeObj.view.currentCountryErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CountryCannotBeEmpty");
        scopeObj.view.txtCountryValue.skin = "skinredbg";
        isValid = false;
      }
      if(scopeObj.view.txtStateValue.text.trim() === "") {
        scopeObj.view.currentStateErrorMsg.setVisibility(true) ;
        scopeObj.view.currentStateErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StateCannotBeEmpty");
        scopeObj.view.txtStateValue.skin = "skinredbg";
        isValid = false;
      }
      if(scopeObj.view.txtCityValue.text.trim() === "") {
        scopeObj.view.currentCityErrorMsg.setVisibility(true) ;
        scopeObj.view.currentCityErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CityCannotBeEmpty");
        scopeObj.view.txtCityValue.skin = "skinredbg";
        isValid = false;
      }

      //applicant details previous address
      var selectValue = scopeObj.view.imgRadioButton1.src === "radio_notselected.png" ;

      if(selectValue) {

        if(scopeObj.view.txtAddressLine1Value2.text === undefined || scopeObj.view.txtAddressLine1Value2.text.trim() === "") {
          scopeObj.view.currentAddressError2Msg.setVisibility(true) ;
          scopeObj.view.currentAddressError2Msg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomers.ErrorAddressLine1");
          scopeObj.view.txtAddressLine1Value2.skin = "skinredbg";
          isValid = false;
        }
        if(scopeObj.view.txtZipCodeValue2.text === undefined || scopeObj.view.txtZipCodeValue2.text.trim() === "") {
          scopeObj.view.currentZipCodeError2Msg.setVisibility(true) ;
          scopeObj.view.currentZipCodeError2Msg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomers.ErrorZipcode");
          scopeObj.view.txtZipCodeValue2.skin = "skinredbg";
          isValid = false;
        }
        if(scopeObj.view.txtCountryValue2.text === undefined || scopeObj.view.txtCountryValue2.text.trim() === "") {
          scopeObj.view.currentCountryError2Msg.setVisibility(true) ;
          scopeObj.view.currentZipCodeError2Msg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CountryCannotBeEmpty");
          scopeObj.view.txtCountryValue2.skin = "skinredbg";
          isValid = false;
        }
        if(scopeObj.view.txtStateValue2.text === undefined || scopeObj.view.txtStateValue2.text.trim() === "") {
          scopeObj.view.currentStateError2Msg.setVisibility(true) ;
          scopeObj.view.currentStateError2Msg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.StateCannotBeEmpty");
          scopeObj.view.txtStateValue2.skin = "skinredbg";
          isValid = false;
        }
        if(scopeObj.view.txtCityValue2.text === undefined || scopeObj.view.txtCityValue2.text.trim() === "") {
          scopeObj.view.currentCityError2Msg.setVisibility(true) ;
          scopeObj.view.currentCityError2Msg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CityCannotBeEmpty");
          scopeObj.view.txtCityValue2.skin = "skinredbg";
          isValid = false;
        }

      }
      return isValid;
    }


  };
});

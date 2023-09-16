define(['Regexes'], function(Regexes){

  return {

    editContactPreshow : function() {
      var scopeObj = this;
      scopeObj.resetSkins();
      scopeObj.setFlowActions();
    },

    resetSkins : function() {
      var scopeObj = this ;
      scopeObj.view.homePhoneErrorMsg.setVisibility(false) ;
      scopeObj.view.txtHomePhoneValue.skin = "skntxtbxDetails0bbf1235271384a" ;

      scopeObj.view.cellPhoneErrorMsg.setVisibility(false) ;
      scopeObj.view.txtCellPhoneValue.skin = "skntxtbxDetails0bbf1235271384a" ; 

      scopeObj.view.businessPhoneErrorMsg.setVisibility(false) ;
      scopeObj.view.txtBusinessPhoneValue.skin = "skntxtbxDetails0bbf1235271384a" ; 

      scopeObj.view.primaryContactErrorMsg.setVisibility(false) ;
      scopeObj.view.lstPrimaryContactValue.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px" ;

      scopeObj.view.lblHomePhoneSize.setVisibility(false) ;
      scopeObj.view.lblCellPhoneSize.setVisibility(false) ;
      scopeObj.view.lblBusinessPhoneSize.setVisibility(false) ;
    },

    setFlowActions : function() {
      var scopeObj = this;

      scopeObj.view.txtHomePhoneValue.onTouchStart = function() {
        scopeObj.view.homePhoneErrorMsg.setVisibility(false) ;
        scopeObj.view.txtHomePhoneValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        var textLen = scopeObj.view.txtHomePhoneValue.text.length ;
        scopeObj.view.lblHomePhoneSize.text = textLen + "/" + scopeObj.view.txtHomePhoneValue.maxtextlength;
        scopeObj.view.lblHomePhoneSize.setVisibility(true);
        scopeObj.view.flxHomePhone.forceLayout();
      } ;

      scopeObj.view.txtHomePhoneValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtHomePhoneValue.text.length ;
        scopeObj.view.lblHomePhoneSize.text = textLen + "/" + scopeObj.view.txtHomePhoneValue.maxtextlength;
        scopeObj.view.lblHomePhoneSize.setVisibility(true);
        scopeObj.view.flxHomePhone.forceLayout();
      } ;

      scopeObj.view.txtCellPhoneValue.onTouchStart = function() {
        scopeObj.view.cellPhoneErrorMsg.setVisibility(false) ;
        scopeObj.view.txtCellPhoneValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        var textLen = scopeObj.view.txtCellPhoneValue.text.length ;
        scopeObj.view.lblCellPhoneSize.text = textLen + "/" + scopeObj.view.txtCellPhoneValue.maxtextlength ;
        scopeObj.view.lblCellPhoneSize.setVisibility(true);
        scopeObj.view.flxCellphone.forceLayout();
      } ;

      scopeObj.view.txtCellPhoneValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtCellPhoneValue.text.length ;
        scopeObj.view.lblCellPhoneSize.text = textLen + "/" + scopeObj.view.txtCellPhoneValue.maxtextlength ;
        scopeObj.view.lblCellPhoneSize.setVisibility(true);
        scopeObj.view.flxCellphone.forceLayout();
      } ;

      scopeObj.view.txtBusinessPhoneValue.onTouchStart = function() {
        scopeObj.view.businessPhoneErrorMsg.setVisibility(false) ;
        scopeObj.view.txtBusinessPhoneValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        var textLen = scopeObj.view.txtBusinessPhoneValue.text.length ;
        scopeObj.view.lblBusinessPhoneSize.text = textLen + "/" + scopeObj.view.txtBusinessPhoneValue.maxtextlength;
        scopeObj.view.lblBusinessPhoneSize.setVisibility(true);
        scopeObj.view.flxBusinessPhone.forceLayout();
      } ;

      scopeObj.view.txtBusinessPhoneValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtBusinessPhoneValue.text.length ;
        scopeObj.view.lblBusinessPhoneSize.text = textLen + "/" + scopeObj.view.txtBusinessPhoneValue.maxtextlength;
        scopeObj.view.lblBusinessPhoneSize.setVisibility(true);
        scopeObj.view.flxBusinessPhone.forceLayout();
      } ;

      scopeObj.view.lstPrimaryContactValue.onTouchStart = function() {
        scopeObj.view.primaryContactErrorMsg.setVisibility(false) ;
        scopeObj.view.lstPrimaryContactValue.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px" ; 
      } ;

    },
    validateContactInfoData : function() {
      var scopeObj = this;
      var isValid = true;
      scopeObj.resetSkins();
      var phoneRegex = Regexes.phoneRegex;
      var primaryContactMethod = scopeObj.view.lstPrimaryContactValue.selectedKeyValue[1].toUpperCase() ;
      if(scopeObj.view.lstPrimaryContactValue.selectedKey === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select")) {
        scopeObj.view.primaryContactErrorMsg.setVisibility(true);
        scopeObj.view.lstPrimaryContactValue.skin = "sknLstBoxeb3017Bor3px" ;
        isValid = false;
      } 
      var hasNoPhoneNumber = scopeObj.view.txtHomePhoneValue.text.trim() === "" &&
          scopeObj.view.txtCellPhoneValue.text.trim() === "" && scopeObj.view.txtBusinessPhoneValue.text.trim() === "" ;
      if(hasNoPhoneNumber) {
        scopeObj.view.txtHomePhoneValue.skin = "skinredbg";
        scopeObj.view.homePhoneErrorMsg.setVisibility(true);
        scopeObj.view.homePhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");

        scopeObj.view.txtCellPhoneValue.skin = "skinredbg";
        scopeObj.view.cellPhoneErrorMsg.setVisibility(true);
        scopeObj.view.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");

        scopeObj.view.txtBusinessPhoneValue.skin = "skinredbg";
        scopeObj.view.businessPhoneErrorMsg.setVisibility(true);
        scopeObj.view.businessPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.PhoneNumberMissing");

        isValid = false;
      } else {
        if (primaryContactMethod === kony.i18n.getLocalizedString("i18n.Applications.HomePhoneCAPS") && scopeObj.view.txtHomePhoneValue.text.trim() === "" ) {
          scopeObj.view.txtHomePhoneValue.skin = "skinredbg";
          scopeObj.view.homePhoneErrorMsg.setVisibility(true);
          scopeObj.view.homePhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PrimaryContactMethodValueCannotBeEmpty");
          isValid = false;
        } else if (scopeObj.view.txtHomePhoneValue.text.trim() !== "" && phoneRegex.test(scopeObj.view.txtHomePhoneValue.text) === false) {
          scopeObj.view.editApplicantDetails.txtHomePhoneValue.skin = "skinredbg";
          scopeObj.view.homePhoneErrorMsg.setVisibility(true);
          scopeObj.view.homePhoneErrorMsg.lblErrorText = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
          isValid = false;
        } 

        if (primaryContactMethod === "MOBILE NUMBER" && scopeObj.view.txtCellPhoneValue.text.trim() === "" ) {
          scopeObj.view.txtCellPhoneValue.skin = "skinredbg";
          scopeObj.view.cellPhoneErrorMsg.setVisibility(true);
          scopeObj.view.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PrimaryContactMethodValueCannotBeEmpty");
          isValid = false;
        } else if (scopeObj.view.txtCellPhoneValue.text.trim() !== "" && phoneRegex.test(scopeObj.view.txtCellPhoneValue.text) === false) {
          scopeObj.view.txtCellPhoneValue.skin = "skinredbg";
          scopeObj.view.cellPhoneErrorMsg.setVisibility(true);
          scopeObj.view.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
          isValid = false;
        }

        if (primaryContactMethod === "OFFICE NUMBER" && scopeObj.view.txtBusinessPhoneValue.text.trim() === "") {
          scopeObj.view.txtBusinessPhoneValue.skin = "skinredbg";
          scopeObj.view.businessPhoneErrorMsg.setVisibility(true);
          scopeObj.view.businessPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PrimaryContactMethodValueCannotBeEmpty");
          isValid = false;
        } else if (scopeObj.view.txtBusinessPhoneValue.text.trim() !== "" && phoneRegex.test(scopeObj.view.txtBusinessPhoneValue.text) === false) {
          scopeObj.view.txtBusinessPhoneValue.skin = "skinredbg";
          scopeObj.view.businessPhoneErrorMsg.setVisibility(true);
          scopeObj.view.businessPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmLocations.lblInvalidPhnNumberError");
          isValid = false;
        }
      }
      return isValid;
    },

    showNumberValidationError : function() {
      var scopeObj = this ;
      scopeObj.view.txtCellPhoneValue.skin = "skinredbg";
      scopeObj.view.cellPhoneErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.userwidgetmodel.lblErrorContact1");
      scopeObj.view.cellPhoneErrorMsg.setVisibility(true);
    }

  };
});
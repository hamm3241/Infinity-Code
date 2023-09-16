define(['Regexes'], function(Regexes) {

  return {

    editPersonalInfoPreshow : function(isCoapplicant) {
      var scopeObj = this ;
      scopeObj.resetSkins();
      scopeObj.setFlowActions();
    },

    setFlowActions : function() {
      var scopeObj = this ;

      scopeObj.view.txtNameValue.onTouchStart = function() {
        scopeObj.view.firstNameErrorMsg.setVisibility(false) ;
        scopeObj.view.txtNameValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        var textLen = scopeObj.view.txtNameValue.text.length ;
        scopeObj.view.lblFirstNameSize.text = textLen + "/" + scopeObj.view.txtNameValue.maxtextlength;
        scopeObj.view.lblFirstNameSize.setVisibility(true);
        scopeObj.view.flxFirstName.forceLayout();
      } ;

      scopeObj.view.txtLastNameValue.onTouchStart = function() {
        scopeObj.view.lastNameErrorMsg.setVisibility(false) ;
        scopeObj.view.txtLastNameValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        var textLen = scopeObj.view.txtLastNameValue.text.length ;
        scopeObj.view.lblLastNameSize.text = textLen + "/" + scopeObj.view.txtLastNameValue.maxtextlength;
        scopeObj.view.lblLastNameSize.setVisibility(true);
        scopeObj.view.flxLastName.forceLayout();
      } ;

      scopeObj.view.txtMiddleNameValue.onTouchStart = function() {
        var textLen = scopeObj.view.txtMiddleNameValue.text.length ;
        scopeObj.view.lblMiddleNameSize.text = textLen + "/" + scopeObj.view.txtMiddleNameValue.maxtextlength;
        scopeObj.view.lblMiddleNameSize.setVisibility(true);
        scopeObj.view.flxMiddleName.forceLayout();
      };

      scopeObj.view.txtEmailAddressValue.onTouchStart = function() {
        scopeObj.view.emailAddressErrorMsg.setVisibility(false) ;
        scopeObj.view.txtEmailAddressValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtSSNValue.onTouchStart = function() {
        scopeObj.view.SSNErrorMsg.setVisibility(false) ;
        scopeObj.view.txtSSNValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
      } ;

      scopeObj.view.txtNameValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtNameValue.text.length ;
        scopeObj.view.lblFirstNameSize.text = textLen + "/" + scopeObj.view.txtNameValue.maxtextlength;
        scopeObj.view.lblFirstNameSize.setVisibility(true);
        scopeObj.view.flxFirstName.forceLayout();
      };

      scopeObj.view.txtNameValue.onEndEditing = function(){
        scopeObj.view.lblFirstNameSize.setVisibility(false);
      };

      scopeObj.view.txtMiddleNameValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtMiddleNameValue.text.length ;
        scopeObj.view.lblMiddleNameSize.text = textLen + "/" + scopeObj.view.txtMiddleNameValue.maxtextlength;
        scopeObj.view.lblMiddleNameSize.setVisibility(true);
        scopeObj.view.flxMiddleName.forceLayout();
      };

      scopeObj.view.txtMiddleNameValue.onEndEditing = function(){
        scopeObj.view.lblMiddleNameSize.setVisibility(false);
      };

      scopeObj.view.txtLastNameValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtLastNameValue.text.length ;
        scopeObj.view.lblLastNameSize.text = textLen + "/" + scopeObj.view.txtLastNameValue.maxtextlength;
        scopeObj.view.lblLastNameSize.setVisibility(true);
        scopeObj.view.flxLastName.forceLayout();
      };

      scopeObj.view.txtLastNameValue.onEndEditing = function(){
        scopeObj.view.lblLastNameSize.setVisibility(false);
      };

      scopeObj.view.txtDobValue.onTouchStart = function() {
        scopeObj.view.lblDobTip.setVisibility(true); 
        scopeObj.view.dobErrorMsg.setVisibility(false); 
        scopeObj.view.txtDobValue.skin = "skntxtbxDetails0bbf1235271384a" ; 
        scopeObj.view.flxDateOfBirthPersonalInfo.forceLayout();
      } ;

      scopeObj.view.txtDobValue.onEndEditing = function() {
        scopeObj.view.lblDobTip.setVisibility(false); 
        scopeObj.view.flxDateOfBirthPersonalInfo.forceLayout();
      } ;

      scopeObj.view.txtEmailAddressValue.onKeyUp = function() {
        var textLen = scopeObj.view.txtEmailAddressValue.text.length ;
        scopeObj.view.lblEmailSize.text = textLen + "/" + scopeObj.view.txtEmailAddressValue.maxtextlength;
        scopeObj.view.lblEmailSize.setVisibility(true);
        scopeObj.view.flxEmailAddress.forceLayout();
      };

      scopeObj.view.txtEmailAddressValue.onEndEditing = function(){
        scopeObj.view.lblEmailSize.setVisibility(false);
      };

    },
    resetSkins : function() {
      var scopeObj = this;
      scopeObj.view.firstNameErrorMsg.setVisibility(false) ;
      scopeObj.view.txtNameValue.skin = "skntxtbxDetails0bbf1235271384a" ;

      scopeObj.view.lastNameErrorMsg.setVisibility(false) ;
      scopeObj.view.txtLastNameValue.skin = "skntxtbxDetails0bbf1235271384a" ;

      scopeObj.view.emailAddressErrorMsg.setVisibility(false) ;
      scopeObj.view.txtEmailAddressValue.skin = "skntxtbxDetails0bbf1235271384a" ;

      scopeObj.view.SSNErrorMsg.setVisibility(false) ;
      scopeObj.view.txtSSNValue.skin = "skntxtbxDetails0bbf1235271384a" ;
      scopeObj.view.dobErrorMsg.setVisibility(false); 
      scopeObj.view.txtDobValue.skin = "skntxtbxDetails0bbf1235271384a" ;

      scopeObj.view.flxDropDownAdmin2.skin = "sknflxffffffoptemplateop3px" ;
      scopeObj.view.flxDropDownAdmin2.removeAll();


      scopeObj.view.lblFirstNameSize.setVisibility(false) ;
      scopeObj.view.lblMiddleNameSize.setVisibility(false) ;
      scopeObj.view.lblLastNameSize.setVisibility(false) ;
      scopeObj.view.lblEmailSize.setVisibility(false) ;
      scopeObj.view.lblSSNSize.setVisibility(false) ;
    },

    validatePersonalInfodata : function() {
      var scopeObj = this;
      var isValid = true;
      scopeObj.resetSkins();
      if(scopeObj.view.txtNameValue.text.trim() === ""){
        scopeObj.view.firstNameErrorMsg.setVisibility(true) ;
        scopeObj.view.firstNameErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.FirstNameMissing");
        scopeObj.view.txtNameValue.skin = "skinredbg";
        isValid = false;
      }
      if(scopeObj.view.txtLastNameValue.text.trim() === "") {
        scopeObj.view.lastNameErrorMsg.setVisibility(true) ;
        scopeObj.view.lastNameErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.LastNameMissing");
        scopeObj.view.txtLastNameValue.skin = "skinredbg";
        isValid = false;
      }
      var dob = scopeObj.view.txtDobValue.text.trim() ;
      var age = scopeObj.getAge(dob) ;
      if(dob === "" ) {
        scopeObj.view.txtDobValue.skin = "skinredbg";
        scopeObj.view.dobErrorMsg.setVisibility(true) ;
        scopeObj.view.dobErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateisMandatory") ;
        scopeObj.view.lblDobTip.setVisibility(false);
        isValid = false; 
      }  else if(isNaN(new Date(dob)) || age > 100 || age < 0) {
        scopeObj.view.txtDobValue.skin = "skinredbg";
        scopeObj.view.dobErrorMsg.setVisibility(true) ;
        scopeObj.view.dobErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.InvalidDateFormat") ;
        scopeObj.view.lblDobTip.setVisibility(false);
        isValid = false;
      } else if(age < 18) {
        scopeObj.view.txtDobValue.skin = "skinredbg";
        scopeObj.view.dobErrorMsg.setVisibility(true) ;
        scopeObj.view.dobErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.DateLessthan18") ;
        scopeObj.view.lblDobTip.setVisibility(false);
        isValid = false;
      }
      var emailRegex = Regexes.emailRegex;
      if(scopeObj.view.txtEmailAddressValue.text.trim() === "") {
        scopeObj.view.emailAddressErrorMsg.setVisibility(true) ;
        scopeObj.view.emailAddressErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing");
        scopeObj.view.txtEmailAddressValue.skin = "skinredbg";
        isValid = false;
      } else if (emailRegex.test(scopeObj.view.txtEmailAddressValue.text.trim()) === false) {
        scopeObj.view.txtEmailAddressValue.skin = "skinredbg";
        scopeObj.view.emailAddressErrorMsg.setVisibility(true);
        scopeObj.view.emailAddressErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.Common.frmGuestDashboard.EmailMissing1");
        isValid = false;
      }
      if(scopeObj.view.txtSSNValue.text.trim() === ""){
        scopeObj.view.SSNErrorMsg.setVisibility(true);
        scopeObj.view.txtSSNValue.skin = "skinredbg";
        scopeObj.view.SSNErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.errCode.21009");
        isValid = false;
      } else if(scopeObj.view.txtSSNValue.text.length < 9){
        scopeObj.view.SSNErrorMsg.setVisibility(true);
        scopeObj.view.txtSSNValue.skin = "skinredbg";
        scopeObj.view.SSNErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SSNErrorlbl");
        isValid = false;
      }
      scopeObj.view.forceLayout();
      return isValid;
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

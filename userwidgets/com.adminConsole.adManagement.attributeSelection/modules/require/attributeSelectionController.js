define(function() {

  return {

    select :  kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select").toUpperCase(),
    alphaNumeric : /[^\d|a-z|A-Z]/i,
    numeric : /^(\d*)$/,

    isValidAttribute : function() {
      var scopeObj = this ;
      var isValid = true;
      var attrType = scopeObj.view.lblType.text.toUpperCase();
      var errorText = "";
      scopeObj.view.attrError.setVisibility(false);
      if(attrType === "NUMERIC") {
        errorText = scopeObj.validateNumber(scopeObj.view.txtValue.text.trim());
      } else if(attrType === "ALPHANUMERIC") {
        errorText = scopeObj.validateAlphaNumber(scopeObj.view.txtValue.text.trim());
      } else if(attrType === "SELECT") {
        var selectedValue = scopeObj.view.lstValues.selectedKeyValue[1].toUpperCase();
        errorText = (selectedValue === scopeObj.select) ? kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorInvalidValue") : "";
      } else {
        errorText = scopeObj.view.txtValue.text.trim() === "" ? kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEmptyField") : "";
      }
      isValid = errorText.trim().length === 0;
      scopeObj.view.attrError.lblErrorText.text = errorText ;
      scopeObj.showOrHideError(isValid);
      return isValid;
    },

    validateNumber : function(input) {
      var scopeObj = this;
      var range = scopeObj.view.lblRange.text;
      if(input === "") {
        return  kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEmptyField");
      } else if(!scopeObj.numeric.test(input)){
        return kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorNumbersAllowed");
      } else {
        var min = parseInt(range) ;
        if(parseInt(input) < min) {
          return "value cannot be less than "+min+".";
        }
      }
      return "";
    },

    validateAlphaNumber : function(input) {
      var scopeObj = this;
      if(input === "") {
        return  kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorEmptyField");
      } else if(!scopeObj.alphaNumeric.test(input)){
        return kony.i18n.getLocalizedString("i18n.frmAdManagement.ErrorAlphanumericsAllowed");
      }
      return "";
    },

    getSaveJSON : function() {
      var scopeObj = this;
      return {
        "id" : scopeObj.view.lblId.text.trim(),
        "criteria" : scopeObj.view.lstCriteria.selectedKey,
        "value" : scopeObj.view.txtValue.isVisible ? scopeObj.view.txtValue.text.trim() : scopeObj.view.lstValues.selectedKey
      };
    },

    showOrHideError : function(isValid){
      var scopeObj = this;
      scopeObj.view.txtValue.skin = isValid ? "txtD7d9e0" : "skinredbg";
      scopeObj.view.lstValues.skin = isValid ? "sknlbxBgffffffBorderc1c9ceRadius3Px" : "sknLstBoxeb3017Bor3px";
      scopeObj.view.attrError.setVisibility(!isValid);
    },

    resetData : function() {
      var scopeObj = this;
      var attrType = scopeObj.view.lblType.text.toUpperCase();
      if(attrType === "SELECT"){
        scopeObj.view.lstValues.selectedKey = kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select");
      } else {
        scopeObj.view.txtValue.text = "";
      }
      scopeObj.view.fonticonCheckBox.text = "\ue966";
      scopeObj.view.fonticonCheckBox.skin = "sknFontIconCheckBoxUnselected";
      scopeObj.view.lstCriteria.selectedKey = scopeObj.view.lstCriteria.masterData[0][0];
      scopeObj.view.attrError.setVisibility(false);
      scopeObj.view.txtValue.skin = "txtD7d9e0";
      scopeObj.view.lstValues.skin = "sknlbxBgffffffBorderc1c9ceRadius3Px";
    }

  };
});
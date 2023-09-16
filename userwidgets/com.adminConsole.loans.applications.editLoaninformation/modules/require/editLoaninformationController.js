define(function() {

  return {
    editLoanInformationPreshow : function(isPersonalLoan,isCreditCardLoan,isVehicleLoan) {
      var scopeObj = this;
      scopeObj.setFlowActions();
      scopeObj.resetSkins();
      scopeObj.view.flxPersonalLoanInfo.setVisibility(isPersonalLoan) ;
      scopeObj.view.flxCreditCardInfo.setVisibility(isCreditCardLoan) ;
      scopeObj.view.flxVehicleLoanInfo.setVisibility(isVehicleLoan) ;
    },
    setFlowActions : function() {
      var scopeObj = this;
      scopeObj.view.txtLoanAmountValue.onTouchStart = function() {
        scopeObj.view.loanAmountErrorMsg.setVisibility(false);
        scopeObj.view.txtLoanAmountValue.skin = "skntxtbxDetails0bbf1235271384a";
      };
      scopeObj.view.txtLoanTermAmount.onTouchStart = function() {
        scopeObj.view.loanTermErrorMsg.setVisibility(false);
        scopeObj.view.txtLoanTermAmount.skin = "skntxtbxDetails0bbf1235271384a";
      };
      scopeObj.view.txtCreditLimitAmount.onTouchStart = function() {
        scopeObj.view.creditLimitErrorMsg.setVisibility(false);
        scopeObj.view.txtCreditLimitAmount.skin = "skntxtbxDetails0bbf1235271384a";
      };
      scopeObj.view.lstLoanPurposeValue.onTouchStart = function() {
        scopeObj.view.purposeErrorMsg.setVisibility(false) ;
        scopeObj.view.lstLoanPurposeValue.skin = "sknlstbx485c7513px" ; 
      } ;
    },
    resetSkins : function() { 
      var scopeObj = this;
      scopeObj.view.loanAmountErrorMsg.setVisibility(false);
      scopeObj.view.txtLoanAmountValue.skin = "skntxtbxDetails0bbf1235271384a";

      scopeObj.view.loanTermErrorMsg.setVisibility(false) ;
      scopeObj.view.txtLoanTermAmount.skin = "skntxtbxDetails0bbf1235271384a";

      scopeObj.view.creditLimitErrorMsg.setVisibility(false);
      scopeObj.view.txtCreditLimitAmount.skin = "skntxtbxDetails0bbf1235271384a";
      scopeObj.view.purposeErrorMsgVL.setVisibility(false);
      scopeObj.view.loanAmountErrorMsgVL.setVisibility(false);
      scopeObj.view.loanTermErrorMsgVL.setVisibility(false);
    },
    validateLoanInfoData : function(loanType, minAmountRange, maxAmountRange, minMonths, maxMonths,isCreditCardLoan) {
      var scopeObj = this;
      var isValid = true;
      scopeObj.resetSkins();
      if(isCreditCardLoan) {
        if(scopeObj.view.txtCreditLimitAmount.text.trim() === "") {
          scopeObj.view.creditLimitErrorMsg.setVisibility(true);
          scopeObj.view.txtCreditLimitAmount.skin = "skinredbg";
          isValid = false;
        } else if(parseInt(scopeObj.view.txtCreditLimitAmount.text) > parseInt(maxAmountRange)){
          scopeObj.view.creditLimitErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EnterValueIsMore");
          scopeObj.view.creditLimitErrorMsg.setVisibility(true);
          scopeObj.view.txtCreditLimitAmount.skin = "skinredbg";
          isValid = false;
        }
        else if(parseInt(scopeObj.view.txtCreditLimitAmount.text) < parseInt(minAmountRange)) {
          scopeObj.view.creditLimitErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EnteredValueIsLess");
          scopeObj.view.creditLimitErrorMsg.setVisibility(true);
          scopeObj.view.txtCreditLimitAmount.skin = "skinredbg";
          isValid = false;
        }
      }
      else {
        if(scopeObj.view.txtLoanAmountValue.text.trim() === "") {
          scopeObj.view.loanAmountErrorMsg.setVisibility(true);
          scopeObj.view.txtLoanAmountValue.skin = "skinredbg";
          isValid = false;
        }
        else if(parseInt(scopeObj.view.txtLoanAmountValue.text) > parseInt(maxAmountRange)){
          scopeObj.view.loanAmountErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EnterValueIsMore");
          scopeObj.view.loanAmountErrorMsg.setVisibility(true);
          scopeObj.view.txtLoanAmountValue.skin = "skinredbg";
          isValid = false;
        }
        else if(parseInt(scopeObj.view.txtLoanAmountValue.text) < parseInt(minAmountRange)) {
          scopeObj.view.loanAmountErrorMsg.lblErrorText.text =kony.i18n.getLocalizedString("i18n.frmTrackApplication.EnteredValueIsLess");
          scopeObj.view.loanAmountErrorMsg.setVisibility(true);
          scopeObj.view.txtLoanAmountValue.skin = "skinredbg";
          isValid = false;
        }

        if(scopeObj.view.txtLoanTermAmount.text.trim() === "") {
          scopeObj.view.loanTermErrorMsg.setVisibility(true) ;
          scopeObj.view.txtLoanTermAmount.skin = "skinredbg";
          isValid = false;
        }
        else if(parseInt(scopeObj.view.txtLoanTermAmount.text) < parseInt(scopeObj.minMonths)) {
          scopeObj.view.loanTermErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EnteredValueIsLess");
          scopeObj.view.loanTermErrorMsg.setVisibility(true) ;
          scopeObj.view.txtLoanTermAmount.skin = "skinredbg";
          isValid = false;
        }
        else if(parseInt(scopeObj.view.txtLoanTermAmount.text) > parseInt(scopeObj.maxMonths)) {
          scopeObj.view.loanTermErrorMsg.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EnterValueIsMore");
          scopeObj.view.loanTermErrorMsg.setVisibility(true) ;
          scopeObj.view.txtLoanTermAmount.skin = "skinredbg";
          isValid = false;
        }
      } 
      return isValid;
    }
  };
});

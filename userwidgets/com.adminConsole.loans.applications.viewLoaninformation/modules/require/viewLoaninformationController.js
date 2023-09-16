define(function() {

	return {
      viewLoanInformationPreShow : function() {
        var scopeObj = this;
        scopeObj.setFlowActions();
      },
      setFlowActions: function() {
      },
      setLoanInfo : function(value) {
        var scopeObj = this; 
        //scopeObj.view.viewLoaninformation.setVisibility(data.QueryDefinition_id !== "CREDIT_CARD_APPLICATION") ;
        scopeObj.resetFirstRow();
        if(value == "CREDIT_CARD_APPLICATION") {
          scopeObj.view.flxCardType.setVisibility(true);
          scopeObj.view.flxCreditLimit.setVisibility(true);
          scopeObj.view.flxRow1.setVisibility(true);
          scopeObj.view.flxRow2.setVisibility(false);
          scopeObj.view.flxRow3.setVisibility(false);
          scopeObj.view.flxRow4.setVisibility(false);
        } else if(value == "PERSONAL_APPLICATION") {
          scopeObj.view.flxAmount.setVisibility(true);
          scopeObj.view.flxLoanTerm.setVisibility(true);
          scopeObj.view.flxPurposeCollateral.setVisibility(true);
          scopeObj.view.flxApplicationType.setVisibility(true);
          scopeObj.view.flxVehicleTerm.setVisibility(false);
          scopeObj.view.flxVehicleAmount.setVisibility(false);
          scopeObj.view.flxRow1.setVisibility(true);
          scopeObj.view.flxRow2.setVisibility(false);
          scopeObj.view.flxRow3.setVisibility(false);
          scopeObj.view.flxRow4.setVisibility(true);
          scopeObj.view.flxPurposeCollateral.setVisibility(true);
          scopeObj.view.flxVehicleIdentificationNumber.setVisibility(false);
        } else if(value == "VEHICLE_APPLICATION") {
          scopeObj.view.flxPurposeCollateral.left = "0%";
          scopeObj.view.flxAmount.setVisibility(false);
          scopeObj.view.flxLoanTerm.setVisibility(false);
          scopeObj.view.flxVehicleIdentificationNumber.setVisibility(true);
          scopeObj.view.flxPurposeCollateral.setVisibility(true);
          scopeObj.view.lblVehicleAmountRequestedValue.text = scopeObj.view.lblAmountRequestedValue.text;
          scopeObj.view.lblVehicleTermValue.text = scopeObj.view.lblLoanTermValue.text;
          scopeObj.view.flxVehicleTerm.setVisibility(true);
          scopeObj.view.flxVehicleAmount.setVisibility(true);
          scopeObj.view.flxApplicationType.setVisibility(true);
          scopeObj.view.flxRow1.setVisibility(true);
          scopeObj.view.flxRow2.setVisibility(true);
          scopeObj.view.flxRow3.setVisibility(true);
          scopeObj.view.flxRow4.setVisibility(true);
          scopeObj.view.flxPurposeCollateral.setVisibility(true);
        } else if(data.QueryDefinition_id == "MORTAGAGE_APPLICATION") {
          //CURRENTLY DO NOTHING
        }
      },
      resetFirstRow: function() {
        var scopeObj = this; 
        scopeObj.view.flxAmount.left = "0%";
        scopeObj.view.flxLoanTerm.left = "30%";
        scopeObj.view.flxPurposeCollateral.left = "60%";
        scopeObj.view.flxCardType.setVisibility(false);
        scopeObj.view.flxAmount.setVisibility(false);
        scopeObj.view.flxLoanTerm.setVisibility(false);
        scopeObj.view.flxCreditLimit.setVisibility(false);
        scopeObj.view.flxPurposeCollateral.setVisibility(false);
        scopeObj.view.flxVehicleIdentificationNumber.setVisibility(false);
        scopeObj.view.flxApplicationType.setVisibility(false);
        scopeObj.view.lblAmountRequested.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.Summary.AmountRequested");
        scopeObj.view.lblLoanTerm.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.LoanTermCAPS");
        scopeObj.view.flxPurposeCollateral.setVisibility(false);
      }

	};
});
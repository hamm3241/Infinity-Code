define(function() {

  return {

    listBoxData : {},

    editAdditonalIncomePreShow : function(data) {
      var scopeObj = this ;
      scopeObj.listBoxData = data ;
      scopeObj.setFlowActions();
    },

    resetSkins : function() {
      var scopeObj = this ;
      scopeObj.view.txtGrossIncomeValue1.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.grossIncomeError1Msg.setVisibility(false);
      scopeObj.view.txtDescription1.skin = "txtArea485c7513px" ;
      scopeObj.view.txtDescription1.setVisibility(false);
      scopeObj.view.txtGrossIncomeValue2.skin = "skntxtbxDetails0bbf1235271384a" ; 
      scopeObj.view.grossIncomeError2Msg.setVisibility(false);
      scopeObj.view.txtDescription2.skin = "txtArea485c7513px" ;
      scopeObj.view.txtDescription2.setVisibility(false);
    },

    setFlowActions : function() {
      var scopeObj = this ;

      scopeObj.view.flxRadioButtonYes.onClick = function() {
        scopeObj.showAdditionalIncomes(true) ;
      } ;

      scopeObj.view.flxRadioButtonNo.onClick = function() {
        scopeObj.showAdditionalIncomes(false) ;
      } ;

      scopeObj.view.lstTypeOfIncome1.onSelection = function() {
        scopeObj.listBoxSelection("1") ;
        scopeObj.view.txtGrossIncomeValue1.text = "" ;
      } ;

      scopeObj.view.lstTypeOfIncome2.onSelection = function() {
        scopeObj.listBoxSelection("2") ;
        scopeObj.view.txtGrossIncomeValue2.text = "" ;
      } ;

      scopeObj.view.txtDescription1.onTouchStart = function() {
        scopeObj.view.txtDescription1.skin = "txtArea485c7513px" ; 
        var textLen = scopeObj.view.txtDescription1.text.length ;
        scopeObj.view.lblDescriptionSize1.text = textLen + "/" + scopeObj.view.txtDescription1.maxtextlength;
        scopeObj.view.lblDescriptionSize1.setVisibility(true);
        scopeObj.view.flxDescription1.forceLayout();
      } ;

      scopeObj.view.txtDescription1.onKeyUp = function() {
        var textLen = scopeObj.view.txtDescription1.text.length ;
        scopeObj.view.lblDescriptionSize1.text = textLen + "/" + scopeObj.view.txtDescription1.maxtextlength;
        scopeObj.view.lblDescriptionSize1.setVisibility(true);
        scopeObj.view.flxDescription1.forceLayout();
      } ;

      scopeObj.view.txtDescription1.onEndEditing = function(){
        scopeObj.view.lblDescriptionSize1.setVisibility(false);
      };

      scopeObj.view.txtDescription2.onTouchStart = function() {
        scopeObj.view.txtDescription2.skin = "txtArea485c7513px" ; 
        var textLen = scopeObj.view.txtDescription2.text.length ;
        scopeObj.view.lblDescriptionSize2.text = textLen + "/" + scopeObj.view.txtDescription2.maxtextlength;
        scopeObj.view.lblDescriptionSize2.setVisibility(true);
        scopeObj.view.flxDescription2.forceLayout();
      } ;

      scopeObj.view.txtDescription2.onKeyUp = function() {
        var textLen = scopeObj.view.txtDescription2.text.length ;
        scopeObj.view.lblDescriptionSize2.text = textLen + "/" + scopeObj.view.txtDescription2.maxtextlength;
        scopeObj.view.lblDescriptionSize2.setVisibility(true);
        scopeObj.view.flxDescription2.forceLayout();
      } ;

      scopeObj.view.txtDescription2.onEndEditing = function(){
        scopeObj.view.lblDescriptionSize2.setVisibility(false);
      };

      scopeObj.view.txtGrossIncomeValue1.onTouchStart = function() {
        scopeObj.view.txtGrossIncomeValue1.skin = "skntxtbxDetails0bbf1235271384a" ;
        scopeObj.view.grossIncomeError1Msg.setVisibility(false);
      } ;

      scopeObj.view.txtGrossIncomeValue2.onTouchStart = function() {
        scopeObj.view.txtGrossIncomeValue2.skin = "skntxtbxDetails0bbf1235271384a" ;
        scopeObj.view.grossIncomeError2Msg.setVisibility(false);
      } ;

    },

    showAdditionalIncomes : function(isVisible) {
      var scopeObj = this ;
      scopeObj.view.imgRadioButtonYes.src = isVisible ? "radio_selected.png" : "radio_notselected.png";
      scopeObj.view.imgRadioButtonNo.src = isVisible ? "radio_notselected.png" : "radio_selected.png" ;
      scopeObj.listBoxSelection("1");
      scopeObj.listBoxSelection("2");
      scopeObj.view.loansSectionHeader.setVisibility(isVisible) ;
      scopeObj.view.flxSection.setVisibility(isVisible) ;
    },

    listBoxSelection : function(idsuffix) {
      var scopeObj = this ;
      var selectedKeyValue = scopeObj.view["lstTypeOfIncome" + idsuffix].selectedKeyValue ;
      var selectedValue = selectedKeyValue[1].replace("\/", "").replace(" ", "").toUpperCase() ;
      var isOptionSelected = selectedValue !== kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select").toUpperCase() ;
      scopeObj.view["flxPayPeriod" + idsuffix].setVisibility(isOptionSelected) ;
      scopeObj.view["flxDescription" + idsuffix].setVisibility(selectedValue === "OTHER");
      if(isOptionSelected) {
        scopeObj.view["lstPayPeriodValue" + idsuffix].masterData = scopeObj.listBoxData["AddIncome" + selectedValue] ;
      }
      scopeObj.view["flxIncome" + idsuffix].forceLayout();
    },

    validateAdditionalIncomes : function() {
      var scopeObj = this ;
      scopeObj.resetSkins();
      var isValid1 = scopeObj.validateIncome("1") ;
      var isValid2 = scopeObj.validateIncome("2") ;
      scopeObj.view.forceLayout();
      return isValid1 && isValid2 ;
    },

    validateIncome : function(idsuffix){
      var scopeObj = this ;
      var isValid = true ;
      var selectedKeyValue = scopeObj.view["lstTypeOfIncome" + idsuffix].selectedKeyValue ;
      var selectedValue = selectedKeyValue[1].replace("\/", "").replace(" ", "").toUpperCase() ;
      var isOptionSelected = selectedValue !== kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select").toUpperCase() ;
      if(isOptionSelected && scopeObj.view["txtGrossIncomeValue" + idsuffix].text.trim() === "") {
        isValid = false ;
        scopeObj.view["txtGrossIncomeValue" + idsuffix].skin = "skinredbg" ;
        scopeObj.view["grossIncomeError" + idsuffix + "Msg"].setVisibility(true) ;
        scopeObj.view["grossIncomeError" + idsuffix + "Msg"].lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AmountIsMandatory") ;
      }
      return isValid ;
    }
  };
});

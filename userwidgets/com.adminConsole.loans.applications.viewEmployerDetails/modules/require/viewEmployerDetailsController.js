define(function() {

  return {

    showEmployementDetails : function(employmentType, hasPreviousEmployment, payperiod) {
      var scopeObj = this ;      
      switch(employmentType) {
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmployed") : 
          scopeObj.view.loansSectionHeader.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmploymentDetails") ;
          scopeObj.view.lblEmployerName.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.BusinessNameCAPS");
          scopeObj.view.flxRowMilitary.setVisibility(false) ;
          scopeObj.view.flxOtherEmp.setVisibility(false) ; 
          scopeObj.view.flxDesignation.setVisibility(false) ;                
          scopeObj.view.flxPresentEmployment.setVisibility(true) ;
          scopeObj.view.flxEmployerDtls.setVisibility(true) ;
          scopeObj.view.flxPreviousEmpDtls.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Military") : 
          scopeObj.view.loansSectionHeader.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.MilitaryEmploymentDetails");
          scopeObj.view.flxRowMilitary.setVisibility(true) ;
          scopeObj.view.flxOtherEmp.setVisibility(false) ;   
          scopeObj.view.flxEmployerDtls.setVisibility(true) ;
          scopeObj.view.flxPresentEmployment.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          scopeObj.view.flxPreviousEmpDtls.setVisibility(false) ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Unemployed") : 
          scopeObj.view.flxEmployerDtls.setVisibility(false) ;
          scopeObj.view.flxPreviousEmpDtls.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Other") : 
          scopeObj.view.loansSectionHeader.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.OtherEmployment");
          scopeObj.view.flxRowMilitary.setVisibility(false) ;
          scopeObj.view.flxOtherEmp.setVisibility(true) ;      
          scopeObj.view.flxEmployerDtls.setVisibility(true) ;
          scopeObj.view.flxPreviousEmpDtls.setVisibility(false) ;
          scopeObj.view.flxPresentEmployment.setVisibility(false) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(false) ;
          break;
        default : 
          scopeObj.view.loansSectionHeader.lblSectionHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.PresentEmployerDetails") ;
          scopeObj.view.lblEmployerName.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.EmployerNameCAPS");
          scopeObj.view.flxRowMilitary.setVisibility(false) ;
          scopeObj.view.flxOtherEmp.setVisibility(false) ;    
          scopeObj.view.flxDesignation.setVisibility(true) ;
          scopeObj.view.flxPresentEmployment.setVisibility(true) ;
          scopeObj.view.flxEmployerDtls.setVisibility(true) ;
          scopeObj.view.flxPreviousEmpDtls.setVisibility(true) ;
          scopeObj.view.flxPreviousEmployer.setVisibility(hasPreviousEmployment) ;
          break ;
      }
      scopeObj.view.flxTotalWorkingHrs.setVisibility(payperiod !== undefined && payperiod.toUpperCase() === 
                                                     kony.i18n.getLocalizedString("i18n.frmTrackApplication.Hourly").toUpperCase());
    }

  };
});

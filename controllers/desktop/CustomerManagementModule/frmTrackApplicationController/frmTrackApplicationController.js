define(['Regexes'], function(Regexes){
  return {

    customerName : "",
    submitJSON : {},
    hasCoborrower : false ,
    hasPreviousAddress : false,
    hasPreviousEmployer : false ,
    hasAdditionalIncome : false,
    hasCoAppPreviousAddress : false,
    hasCoAppPreviousEmployer : false,    
    hasEmployment : false ,
    hasCoAppEmployment : false ,
    isCreditCardLoan : false,
    isPersonalLoan : false,
    isVehicleLoan : false,
    loanType : "",
    loanTypeId : "" ,
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
    radio_notselected : "radio_notselected.png",
    radio_selected : "radio_selected.png",
    cobrrowerKeyValue : {"LoanCoborrower" : "Jointly With Co-Applicant"},
    valuesMapper : {},
    listBoxMapper : {} ,
    isAddressSameAsApplicant : true,
    hasValidDataToSave: false,
    uspserror:undefined,
    dynamicEvents :  {
      "editLoaninformation" : ["viewLoaninformation","loansSectionHeader"],
      "editPersonalInfo" : ["viewApplicantDetails", "viewPersonalInfo","loansSectionHeader"],
      "editContactInfo" : ["viewApplicantDetails", "viewContactInfo","loansSectionHeader"],
      "editAddressInfo" : ["viewApplicantDetails", "viewAddressInfo","loansSectionHeader"],
      "flxPreviousAddressSection" : ["viewApplicantDetails", "viewAddressInfo","loansSectionHeader1"],
      "editEmployementInfo" : ["viewApplicantDetails", "viewIncomeSource","loansSectionHeader"],
      "flxPresentEmployer" : ["viewApplicantDetails", "viewEmployerDetails","loansSectionHeader"],
      "flxPreviousEmployer" : ["viewApplicantDetails", "viewEmployerDetails","loansSectionHeader1"],
      "editAdditionalIncome" : ["viewApplicantDetails", "viewAdditionalIncome","loansSectionHeader"],
      "editExpenditureInfo" : ["viewApplicantDetails", "viewExpenditureInfo","loansSectionHeader"],
      "editConsent" : ["viewConsent","loansSectionHeader"],
      "editAUDetails" : ["viewAUDetails","loansSectionHeader"],
      "editAUPersonalInfo" : ["viewAUDetails", "viewAUPersonalInfo","loansSectionHeader"],
      "editAUContactInfo" : ["viewAUDetails", "viewAUContactInfo","loansSectionHeader"],
      "editAddressInfoAsPrevious" : ["viewAUDetails", "viewAUAddressInfo","loansSectionHeader"]
    } ,
    applicantFieldMapper : {
      "CardType" : [["viewLoaninformation","lblCardTypeValue"],["editLoaninformation","lblCardTypeValue"]],
      "CardLimit" : [["viewLoaninformation","lblCreditLimitValue"],["editLoaninformation","txtCreditLimitAmount"],kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "LoanAmount" : [["viewLoaninformation","lblAmountRequestedValue"],["editLoaninformation","txtLoanAmountValue"], kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "LoanTerms" : [["viewLoaninformation","lblLoanTermValue"],["editLoaninformation","txtLoanTermAmount"],kony.i18n.getLocalizedString("i18n.Applications.MonthsPlaceHolder")],
      "LoanCoborrower" : [["viewLoaninformation","lblApplicationTypeValue"],["editLoaninformation", "lblApplicationTypeValue"]],
      "LoanPurpose" : [["viewLoaninformation","lblLoanPurposeValue"],["editLoaninformation","lstLoanPurposeValue"]],
      "VehicleType" : [["viewLoaninformation","lblVehicleTypeValue"],[]],
      "VehicleMakeYear" : [["viewLoaninformation", "lblMakeYearValue"],[]],
      "VehicleModel" : [["viewLoaninformation", "lblModelValue"],[]],
      "VehicleTrim" : [["viewLoaninformation", "lblTrimValue"],[]],
      "VehicleMileage" : [["viewLoaninformation", "lblVehicleMileageValue"],[]],
      "FirstName" : [["viewApplicantDetails", "viewPersonalInfo","lblNameValue"], ["editApplicantDetails", "editPersonalInfo","txtNameValue"]],
      "MiddleName" : [["viewApplicantDetails", "viewPersonalInfo","lblMiddleNameValue"], ["editApplicantDetails", "editPersonalInfo","txtMiddleNameValue"]],
      "LastName" : [["viewApplicantDetails", "viewPersonalInfo","lblLastNameValue"], ["editApplicantDetails", "editPersonalInfo","txtLastNameValue"]],
      "Suffix" : [["viewApplicantDetails", "viewPersonalInfo","lblSuffixValue"], ["editApplicantDetails", "editPersonalInfo","lstSuffixValue"]],
      "DOB" : [["viewApplicantDetails", "viewPersonalInfo","lblDobValue"], ["editApplicantDetails", "editPersonalInfo","txtDobValue"]],
      "Email" : [["viewApplicantDetails", "viewPersonalInfo","lblEmailAddressValue"], ["editApplicantDetails", "editPersonalInfo","txtEmailAddressValue"]],
      "SSN" : [["viewApplicantDetails", "viewPersonalInfo","lblSSNValue"], ["editApplicantDetails", "editPersonalInfo","txtSSNValue"]],
      "HomeNumber" : [["viewApplicantDetails", "viewContactInfo","lblHomePhoneValue"], ["editApplicantDetails","editContactInfo","txtHomePhoneValue"]],
      "OfficeNumber" : [["viewApplicantDetails", "viewContactInfo","lblBusinessPhoneValue"], ["editApplicantDetails","editContactInfo","txtBusinessPhoneValue"]],
      "MobileNumber" : [["viewApplicantDetails", "viewContactInfo","lblCellPhoneValue"], ["editApplicantDetails","editContactInfo","txtCellPhoneValue"]],
      "PrimaryContact" : [["viewApplicantDetails", "viewContactInfo","lblPrimaryContactValue"], ["editApplicantDetails","editContactInfo","lstPrimaryContactValue"]],
      "CurrentAddressLine1" : [["viewApplicantDetails", "viewAddressInfo","lblAddressLine1Value"], ["editApplicantDetails","editAddressInfo","txtAddressLine1Value"]],
      "CurrentAddressLine2" : [["viewApplicantDetails", "viewAddressInfo","lblAddressLine2Value"], ["editApplicantDetails","editAddressInfo","txtAddressLine2Value"]],
      "CurrentAddressCountry" : [["viewApplicantDetails", "viewAddressInfo","lblCountryValue"], ["editApplicantDetails","editAddressInfo","txtCountryValue"]],
      "CurrentAddressState" : [["viewApplicantDetails", "viewAddressInfo","lblStateValue"], ["editApplicantDetails","editAddressInfo","txtStateValue"]],
      "CurrentAddressCity" : [["viewApplicantDetails", "viewAddressInfo","lblCityValue"], ["editApplicantDetails","editAddressInfo","txtCityValue"]],
      "CurrentAddressZip" : [["viewApplicantDetails", "viewAddressInfo","lblZipCodeValue"], ["editApplicantDetails","editAddressInfo","txtZipCodeValue"]],
      "CurrentAddressType" : [["viewApplicantDetails", "viewAddressInfo","lblOwnershipValue"],["editApplicantDetails","editAddressInfo","lstHomeOwnershipValue"]],
      "CurrentAddressDuration" : [["viewApplicantDetails", "viewAddressInfo","lblDurationValue"],[]] ,
      "PreviousAddressLine1" : [["viewApplicantDetails", "viewAddressInfo","lblPervAddressLine1Value"],["editApplicantDetails","editAddressInfo","txtAddressLine1Value2"]] ,
      "PreviousAddressLine2" : [["viewApplicantDetails", "viewAddressInfo","lblPervAddressLine2Value"],["editApplicantDetails","editAddressInfo","txtAddressLine2Value2"]] ,
      "PreviousAddressCountry" : [["viewApplicantDetails", "viewAddressInfo","lblPrevCountryValue"],["editApplicantDetails","editAddressInfo","txtCountryValue2"]] ,
      "PreviousAddressState" : [["viewApplicantDetails", "viewAddressInfo","lblPrevAddressStateValue"],["editApplicantDetails","editAddressInfo","txtStateValue2"]] ,
      "PreviousAddressCity" : [["viewApplicantDetails", "viewAddressInfo","lblPrevAddressCityValue"],["editApplicantDetails","editAddressInfo","txtCityValue2"]] ,
      "PreviousAddressZip" : [["viewApplicantDetails", "viewAddressInfo","lblPrevAddressZipCodeValue"],["editApplicantDetails","editAddressInfo","txtZipCodeValue2"]] ,
      "EmploymentStatus" : [["viewApplicantDetails", "viewIncomeSource", "lblEmpStatusValue"],["editApplicantDetails","editEmployementInfo","lstEmploymentStatusValue"]],  
      "AddIncomeChallenge" : [["viewApplicantDetails", "viewAdditionalIncome", "lblAdditionalIncomeValue"],[]],
      "MonthlyExpensesTotalRent" : [["viewApplicantDetails", "viewExpenditureInfo","lblRentValue"], ["editApplicantDetails","editExpenditureInfo","txtRentValue"],
                                    kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "MonthlyExpensesTotalMortgage" : [["viewApplicantDetails", "viewExpenditureInfo","lblMortgageValue"],["editApplicantDetails","editExpenditureInfo","txtMortgageValue"],
                                        kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")], 
    },

    coapplicantFieldMapper : {
      "CoAppFirstName" : [["viewCoApplicantDetails", "viewPersonalInfo","lblNameValue"], ["editPersonalInfo1","txtNameValue"]],
      "CoAppMiddleName" : [["viewCoApplicantDetails", "viewPersonalInfo","lblMiddleNameValue"], ["editPersonalInfo1","txtMiddleNameValue"]],
      "CoAppLastName" : [["viewCoApplicantDetails", "viewPersonalInfo","lblLastNameValue"], ["editPersonalInfo1","txtLastNameValue"]],
      "CoAppSuffix" : [["viewCoApplicantDetails", "viewPersonalInfo","lblSuffixValue"], ["editPersonalInfo1","lstSuffixValue"]],
      "CoAppDOB" : [["viewCoApplicantDetails", "viewPersonalInfo","lblDobValue"], ["editPersonalInfo1","lblDobValue"]],
      "CoAppEmail" : [["viewCoApplicantDetails", "viewPersonalInfo","lblEmailAddressValue"], ["editPersonalInfo1","txtEmailAddressValue"]],
      "CoAppSSN" : [["viewCoApplicantDetails", "viewPersonalInfo","lblSSNValue"], ["editPersonalInfo1","txtSSNValue"]],
      "CoAppHomeNumber" : [["viewCoApplicantDetails", "viewContactInfo","lblHomePhoneValue"], ["editContactInfo","txtHomePhoneValue"]],
      "CoAppOfficeNumber" : [["viewCoApplicantDetails", "viewContactInfo","lblBusinessPhoneValue"], ["editContactInfo","txtBusinessPhoneValue"]],
      "CoAppMobileNumber" : [["viewCoApplicantDetails", "viewContactInfo","lblCellPhoneValue"], ["editContactInfo","txtCellPhoneValue"]],
      "CoAppPrimaryContact" : [["viewCoApplicantDetails", "viewContactInfo","lblPrimaryContactValue"], ["editContactInfo","lstPrimaryContactValue"]],
      "CoAppCurrentAddressLine1" : [["viewCoApplicantDetails", "viewAddressInfo","lblAddressLine1Value"], ["editAddressInfo1","txtAddressLine1Value"]],
      "CoAppCurrentAddressLine2" : [["viewCoApplicantDetails", "viewAddressInfo","lblAddressLine2Value"], ["editAddressInfo1","txtAddressLine2Value"]],
      "CoAppCurrentAddressCountry" : [["viewCoApplicantDetails", "viewAddressInfo","lblCountryValue"], ["editAddressInfo1","txtCountryValue"]],
      "CoAppCurrentAddressState" : [["viewCoApplicantDetails", "viewAddressInfo","lblStateValue"], ["editAddressInfo1","txtStateValue"]],
      "CoAppCurrentAddressCity" : [["viewCoApplicantDetails", "viewAddressInfo","lblCityValue"], ["editAddressInfo1","txtCityValue"]],
      "CoAppCurrentAddressZip" : [["viewCoApplicantDetails", "viewAddressInfo","lblZipCodeValue"], ["editAddressInfo1","txtZipCodeValue"]],
      "CoAppCurrentAddressType" : [["viewCoApplicantDetails", "viewAddressInfo","lblOwnershipValue"]],
      "CoAppCurrentAddressDuration" : [["viewCoApplicantDetails", "viewAddressInfo","lblDurationValue"]] ,
      "CoAppPreviousAddressLine1" : [["viewCoApplicantDetails", "viewAddressInfo","lblPervAddressLine1Value"]] ,
      "CoAppPreviousAddressLine2" : [["viewCoApplicantDetails", "viewAddressInfo","lblPervAddressLine2Value"]] ,
      "CoAppPreviousAddressCountry" : [["viewCoApplicantDetails", "viewAddressInfo","lblPrevCountryValue"]] ,
      "CoAppPreviousAddressState" : [["viewCoApplicantDetails", "viewAddressInfo","lblPrevAddressStateValue"]] ,
      "CoAppPreviousAddressCity" : [["viewCoApplicantDetails", "viewAddressInfo","lblPrevAddressCityValue"]] ,
      "CoAppPreviousAddressZip" : [["viewCoApplicantDetails", "viewAddressInfo","lblPrevAddressZipCodeValue"]] ,
      "CoAppEmploymentStatus" : [["viewCoApplicantDetails", "viewIncomeSource", "lblEmpStatusValue"]],
      "CoAppEmployer" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblEmployerNameValue"]],
      "CoAppDesignation" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblDesignationValue"]],
      "CoAppEmployerStartDate" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblStartDateValue"]],
      "CoAppFullTimeIncomeAmount" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblGrossIncomeValue"],[],kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "CoAppFullTimeIncomePayPeriod" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPayPeriodValue"]],
      "CoAppFullTimeIncomeHours" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblTotalWorkingHrsValue"]],
      "CoAppEmpAddressLine1" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblAddressLine1Value"]],
      "CoAppEmpAddressLine2" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblAddressLine2Value"]],
      "CoAppEmpAddressCountry" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblCountryValue"]],
      "CoAppEmpAddressState" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblStateValue"]],
      "CoAppEmpAddressCity" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblCityValue"]],
      "CoAppEmpAddressPincode" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblZipCodeValue"]],
      "CoAppPrevEmployerChallenge" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPreviousEmpValue"]],
      "CoAppPreviousEmployer" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevEmployerNameValue"]],
      "CoAppPreviousEmployerDesignation" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevDesignationValue"]],
      "CoAppPrevEmpLine1" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevAddressLine1Value"]],
      "CoAppPrevEmpLine2" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevAddressLine2Value"]],
      "CoAppPrevEmpCountry" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevCountryValue"]],
      "CoAppPrevEmpState" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevStateValue"]],
      "CoAppPrevEmpCity" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevCityValue"]],
      "CoAppPrevEmpPincode" : [["viewCoApplicantDetails", "viewEmployerDetails", "lblPrevZipCodeValue"]],
      "CoAppAddIncomeChallenge" : [["viewCoApplicantDetails", "viewAdditionalIncome", "lblAdditionalIncomeValue"]],
      "CoAppMonthlyExpensesTotalRent" : [["viewCoApplicantDetails", "viewExpenditureInfo","lblRentValue"], ["editExpenditureInfo1", "txtRentValue"],
                                         kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "CoAppMonthlyExpensesTotalMortgage" : [["viewCoApplicantDetails", "viewExpenditureInfo","lblMortgageValue"], ["editExpenditureInfo1", "txtMortgageValue"],
                                             kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
    },

    otherEmploymentMapper : {
      "OtherIncomeAmount" : [["viewApplicantDetails", "viewEmployerDetails", "lblGrossIncomeOtherValue"],["editApplicantDetails","editEmployementInfo","txtGrossIncomeValueOther"],
                             kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "OtherIncomePayPeriod" : [["viewApplicantDetails", "viewEmployerDetails", "lblPayPeriodOtherValue"],["editApplicantDetails","editEmployementInfo","lstPayPeriodValueOther"]],
      "OtherEmploymentName" : [["viewApplicantDetails", "viewEmployerDetails", "lblEmpTypeValue"],["editApplicantDetails","editEmployementInfo","txtEmpTypeValue"]],
      "OtherIncomeDescription" : [["viewApplicantDetails", "viewEmployerDetails", "lblDescriptionValue"],["editApplicantDetails","editEmployementInfo","txtDescription"]],
      "OtherIncomeStartDate" : [["viewApplicantDetails", "viewEmployerDetails", "lblStartDateValue"],[]]
    },

    militaryEmploymentMapper : {
      "MilitaryDesignation" : [["viewApplicantDetails", "viewEmployerDetails", "lblDesignationValueMilitary"],
                               ["editApplicantDetails","editEmployementInfo","txtDesignationValueMilitary"]],
      "MilitaryIncomeAmount" : [["viewApplicantDetails", "viewEmployerDetails", "lblGrossIncomeMilitaryValue"],
                                ["editApplicantDetails","editEmployementInfo","txtGrossIncomeValueMilitary"],
                                kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "MilitaryIncomePayPeriod" : [["viewApplicantDetails", "viewEmployerDetails", "lblPayPeriodValue"],["editApplicantDetails","editEmployementInfo","lstPayPeriodValue"]],
      "MilitaryStartDate" : [["viewApplicantDetails", "viewEmployerDetails", "lblStartDateMilitaryValue"],
                             ["editApplicantDetails","editEmployementInfo","txtStartDateValueMilitary"]],
    },

    selfEmploymentMapper : {
      "BusinessName" : [["viewApplicantDetails", "viewEmployerDetails", "lblEmployerNameValue"],["editApplicantDetails","editEmployementInfo","txtEmployerNameValue"]],
      "BusinessStartDate" : [["viewApplicantDetails", "viewEmployerDetails", "lblStartDateValue"],["editApplicantDetails","editEmployementInfo","txtStartDateValue"]],
      "BusinessIncomeAmount" : [["viewApplicantDetails", "viewEmployerDetails", "lblGrossIncomeValue"],["editApplicantDetails","editEmployementInfo","txtGrossIncomeValue"],
                                kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "BusinessIncomePayPeriod" : [["viewApplicantDetails", "viewEmployerDetails", "lblPayPeriodValue"],["editApplicantDetails","editEmployementInfo","lstPayPeriodValue"]],
      "BusinessAddressLine1" : [["viewApplicantDetails", "viewEmployerDetails", "lblAddressLine1Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine1Value"]],
      "BusinessAddressLine2" : [["viewApplicantDetails", "viewEmployerDetails", "lblAddressLine2Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine2Value"]],
      "BusinessAddressCountry" : [["viewApplicantDetails", "viewEmployerDetails", "lblCountryValue"],["editApplicantDetails","editEmployementInfo","txtCountryValue"]],
      "BusinessAddressState" : [["viewApplicantDetails", "viewEmployerDetails", "lblStateValue"],["editApplicantDetails","editEmployementInfo","txtStateValue"]],
      "BusinessAddressCity" : [["viewApplicantDetails", "viewEmployerDetails", "lblCityValue"],["editApplicantDetails","editEmployementInfo","txtCityValue"]],
      "BusinessAddressZipCode" : [["viewApplicantDetails", "viewEmployerDetails", "lblZipCodeValue"],["editApplicantDetails","editEmployementInfo","txtZipCodeValue"]],
    },

    partTimeEmploymentMapper : {
      "EmployerPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblEmployerNameValue"],["editApplicantDetails","editEmployementInfo","txtEmployerNameValue"]],
      "DesignationPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblDesignationValue"],["editApplicantDetails","editEmployementInfo","txtDesignationValue"]],
      "PartTimeIncomeAmount" : [["viewApplicantDetails", "viewEmployerDetails", "lblGrossIncomeValue"],["editApplicantDetails","editEmployementInfo","txtGrossIncomeValue"],
                                kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "PartTimeIncomePayPeriod" : [["viewApplicantDetails", "viewEmployerDetails", "lblPayPeriodValue"],["editApplicantDetails","editEmployementInfo","lstPayPeriodValue"]],
      "PartTimeIncomeHours" : [["viewApplicantDetails", "viewEmployerDetails", "lblTotalWorkingHrsValue"],["editApplicantDetails","editEmployementInfo","txtWorkHoursValue"],
                               kony.i18n.getLocalizedString("i18n.frmTrackApplication.HoursPerWeek")  ],
      "EmpAddressLine1Pt" : [["viewApplicantDetails", "viewEmployerDetails", "lblAddressLine1Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine1Value"]],
      "EmpAddressLine2Pt" : [["viewApplicantDetails", "viewEmployerDetails", "lblAddressLine2Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine2Value"]],
      "EmpAddressCountryPt" :[["viewApplicantDetails", "viewEmployerDetails", "lblCountryValue"],["editApplicantDetails","editEmployementInfo","txtCountryValue"]],
      "EmpAddressStatePt" : [["viewApplicantDetails", "viewEmployerDetails", "lblStateValue"],["editApplicantDetails","editEmployementInfo","txtStateValue"]],
      "EmpAddressCityPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblCityValue"],["editApplicantDetails","editEmployementInfo","txtCityValue"]],
      "EmpAddressPinCodePt" : [["viewApplicantDetails", "viewEmployerDetails", "lblZipCodeValue"],["editApplicantDetails","editEmployementInfo","txtZipCodeValue"]],
      "EmployerStartDatePt" : [["viewApplicantDetails", "viewEmployerDetails", "lblStartDateValue"],["editApplicantDetails","editEmployementInfo","txtStartDateValue"]],      
      "PrevEmployerChallengePt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPreviousEmpValue"],[]],
      "PreviousEmployerPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevEmployerNameValue"],["editApplicantDetails","editEmployementInfo","txtEmployerNameValuePrev"]],
      "PreviousEmployerDesignationPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevDesignationValue"],["editApplicantDetails","editEmployementInfo","txtDesignationValuePrev"]],
      "PrevEmpAddressLine1Pt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevAddressLine1Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine1ValuePrev"]],
      "PrevEmpAddressLine2Pt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevAddressLine2Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine2ValuePrev"]],
      "PrevEmpAddressCountryPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevCountryValue"],["editApplicantDetails","editEmployementInfo","txtCountryValuePrev"]],
      "PrevEmpAddressStatePt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevStateValue"],["editApplicantDetails","editEmployementInfo","txtStateValuePrev"]],
      "PrevEmpAddressCityPt" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevCityValue"],["editApplicantDetails","editEmployementInfo","txtCityValuePrev"]],
      "PrevEmpPincPrevEmpAddressPinCodePtode" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevZipCodeValue"],["editApplicantDetails","editEmployementInfo","txtZipCodeValuePrev"]],
    },

    fullTimeEmploymentMapper : {
      "Employer" : [["viewApplicantDetails", "viewEmployerDetails", "lblEmployerNameValue"],["editApplicantDetails","editEmployementInfo","txtEmployerNameValue"]],
      "Designation" : [["viewApplicantDetails", "viewEmployerDetails", "lblDesignationValue"],["editApplicantDetails","editEmployementInfo","txtDesignationValue"]],
      "EmployerStartDate" : [["viewApplicantDetails", "viewEmployerDetails", "lblStartDateValue"],["editApplicantDetails","editEmployementInfo","txtStartDateValue"]],
      "FullTimeIncomeAmount" : [["viewApplicantDetails", "viewEmployerDetails", "lblGrossIncomeValue"],["editApplicantDetails","editEmployementInfo","txtGrossIncomeValue"],
                                kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol")],
      "FullTimeIncomePayPeriod" : [["viewApplicantDetails", "viewEmployerDetails", "lblPayPeriodValue"],["editApplicantDetails","editEmployementInfo","lstPayPeriodValue"]],
      "FullTimeIncomeHours" : [["viewApplicantDetails", "viewEmployerDetails", "lblTotalWorkingHrsValue"],["editApplicantDetails","editEmployementInfo","txtWorkHoursValue"],
                               kony.i18n.getLocalizedString("i18n.frmTrackApplication.HoursPerWeek")  ],
      "EmpAddressLine1" : [["viewApplicantDetails", "viewEmployerDetails", "lblAddressLine1Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine1Value"]],
      "EmpAddressLine2" : [["viewApplicantDetails", "viewEmployerDetails", "lblAddressLine2Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine2Value"]],
      "EmpAddressCountry" : [["viewApplicantDetails", "viewEmployerDetails", "lblCountryValue"],["editApplicantDetails","editEmployementInfo","txtCountryValue"]],
      "EmpAddressState" : [["viewApplicantDetails", "viewEmployerDetails", "lblStateValue"],["editApplicantDetails","editEmployementInfo","txtStateValue"]],
      "EmpAddressCity" : [["viewApplicantDetails", "viewEmployerDetails", "lblCityValue"],["editApplicantDetails","editEmployementInfo","txtCityValue"]],
      "EmpAddressPincode" : [["viewApplicantDetails", "viewEmployerDetails", "lblZipCodeValue"],["editApplicantDetails","editEmployementInfo","txtZipCodeValue"]], 
      "PrevEmployerChallenge" : [["viewApplicantDetails", "viewEmployerDetails", "lblPreviousEmpValue"],[]],
      "PreviousEmployer" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevEmployerNameValue"],["editApplicantDetails","editEmployementInfo","txtEmployerNameValuePrev"]],
      "PreviousEmployerDesignation" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevDesignationValue"],["editApplicantDetails","editEmployementInfo","txtDesignationValuePrev"]],
      "PrevEmpLine1" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevAddressLine1Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine1ValuePrev"]],
      "PrevEmpLine2" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevAddressLine2Value"],["editApplicantDetails","editEmployementInfo","txtAddressLine2ValuePrev"]],
      "PrevEmpCountry" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevCountryValue"],["editApplicantDetails","editEmployementInfo","txtCountryValuePrev"]],
      "PrevEmpState" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevStateValue"],["editApplicantDetails","editEmployementInfo","txtStateValuePrev"]],
      "PrevEmpCity" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevCityValue"],["editApplicantDetails","editEmployementInfo","txtCityValuePrev"]],
      "PrevEmpPincode" : [["viewApplicantDetails", "viewEmployerDetails", "lblPrevZipCodeValue"],["editApplicantDetails","editEmployementInfo","txtZipCodeValuePrev"]],

    },

    authorizeduserMapper : {
      "AUChallenge" : [["viewAUDetails","lblAUValue"],[]],
      "AUFirstName" : [["viewAUDetails","viewAUPersonalInfo","lblNameValue"],["editAUDetails","editAUPersonalInfo","txtNameValue"]],
      "AUMiddleName" : [["viewAUDetails","viewAUPersonalInfo","lblMiddleNameValue"],["editAUDetails","editAUPersonalInfo","txtMiddleNameValue"]],
      "AULastName" : [["viewAUDetails","viewAUPersonalInfo","lblLastNameValue"],["editAUDetails","editAUPersonalInfo","txtLastNameValue"]],
      "AUSuffix" : [["viewAUDetails","viewAUPersonalInfo","lblSuffixValue"],["editAUDetails","editAUPersonalInfo","lstSuffixValue"]],
      "AUDob" : [["viewAUDetails","viewAUPersonalInfo","lblDobValue"],["editAUDetails","editAUPersonalInfo","txtDobValue"]],
      "AUEmail" : [["viewAUDetails","viewAUPersonalInfo","lblEmailAddressValue"],["editAUDetails","editAUPersonalInfo","txtEmailAddressValue"]], 
      "AUSsn" : [["viewAUDetails","viewAUPersonalInfo","lblSSNValue"],["editAUDetails","editAUPersonalInfo","txtSSNValue"]],
      "AUHomeNumber" : [["viewAUDetails","viewAUContactInfo","lblHomePhoneValue"],["editAUDetails","editAUContactInfo","txtHomePhoneValue"]],
      "AUOfficeNumber" : [["viewAUDetails","viewAUContactInfo","lblBusinessPhoneValue"],["editAUDetails","editAUContactInfo","txtBusinessPhoneValue"]],
      "AUMobNumber" : [["viewAUDetails","viewAUContactInfo","lblCellPhoneValue"],["editAUDetails","editAUContactInfo","txtCellPhoneValue"]],
      "AUPrimaryContact" : [["viewAUDetails","viewAUContactInfo","lblPrimaryContactValue"],["editAUDetails","editAUContactInfo","lstPrimaryContactValue"]],
      "AUIsAddressSameAsApplicant" : [["viewAUDetails","viewAUAddressInfo","lblDurationValue"],["editAUDetails","editAddressInfoAsPrevious","lblAddAU"]],
      "AUCurLine1" : [["viewAUDetails","viewAUAddressInfo","lblAddressLine1Value"],["editAUDetails","editAddressInfoAsPrevious","txtAddressLine1Value"]],
      "AUCurLine2" : [["viewAUDetails","viewAUAddressInfo","lblAddressLine2Value"],["editAUDetails","editAddressInfoAsPrevious","txtAddressLine2Value"]],
      "AUCurCity" : [["viewAUDetails","viewAUAddressInfo","lblCityValue"],["editAUDetails","editAddressInfoAsPrevious","txtCityValue"]],
      "AUCurState" : [["viewAUDetails","viewAUAddressInfo","lblStateValue"],["editAUDetails","editAddressInfoAsPrevious","txtStateValue"]],
      "AUCurCountry" : [["viewAUDetails","viewAUAddressInfo","lblCountryValue"],["editAUDetails","editAddressInfoAsPrevious","txtCountryValue"]],
      "AUCurPinCode" : [["viewAUDetails","viewAUAddressInfo","lblZipCodeValue"],["editAUDetails","editAddressInfoAsPrevious","txtZipCodeValue"]]
    },

    maxAmountRange : 1,
    minAmountRange : 1,
    minMonths : 1,
    maxMonths : 1,

    willUpdateUI: function (context) {
      var scopeObj = this;
      if(context) {
        this.updateLeftMenu(context);
        if(context.action === "getTrackApplicationDetails") {
          scopeObj.submitJSON = {} ;
          scopeObj.loanType = context.loanType ;
          scopeObj.convertToValueMapper(context.response) ;
          scopeObj.deleteAUAndCoapplicantDetails();
          scopeObj.view.forceLayout();
          scopeObj.setApplicationData() ;
        }
        if(context.action === "getTrackApplicationEditMode") {
          scopeObj.submitJSON = {} ;
          scopeObj.loanType = context.loanType ;
          scopeObj.convertToValueMapper(context.response) ;
          scopeObj.deleteAUAndCoapplicantDetails();
          scopeObj.setApplicationData() ;
          scopeObj.getMasterData(scopeObj.loanType.toUpperCase());
        }
        if (context.action && context.action === "ErrorOccured") {
          kony.adminConsole.utils.hideProgressBar(scopeObj.view);
          scopeObj.view.toastMessage.showErrorToastMessage("Something went wrong. Please try again.", scopeObj);
        }
        if (context.toastModel) {
          if (context.toastModel.status === "SUCCESS") {
            scopeObj.view.toastMessage.showToastMessage(context.toastModel.message, scopeObj);
            kony.adminConsole.utils.hideProgressBar(scopeObj.view);
          } else {
            scopeObj.view.toastMessage.showErrorToastMessage(context.toastModel.message, scopeObj);
            kony.adminConsole.utils.hideProgressBar(scopeObj.view);
          }
        }
        if(context.SSNValidation) {
          if(context.SSNValidation.isUserExists === "true") {
            scopeObj.view.flxConsentPopup.setVisibility(true) ;
            scopeObj.view.popUp.setVisibility(true) ;            
          }
        }
        if (context.NumberValidation) {
          if (context.NumberValidation.valid) {
            scopeObj.submitApplication();
          } else {
            scopeObj.view.editApplicantDetails.editContactInfo.showNumberValidationError();
          }
        }

        if(context.editMasterData) {
          scopeObj.setListBoxMasterData(scopeObj.loanType.toUpperCase(), context.editMasterData) ;
          scopeObj.editApplication();
        }
        if (context.LoadingScreen) {
          if (context.LoadingScreen.focus)
            kony.adminConsole.utils.showProgressBar(scopeObj.view);
          else
            kony.adminConsole.utils.hideProgressBar(scopeObj.view);
        }
        //Response of ssn validation
        if(context.action==="SSNValidation") {
          if(context.isSSN) {
            scopeObj.isSSN=true;
            scopeObj.view.flxConsentPopup.setVisibility(true) ;
            scopeObj.view.popUp.lblPopUpMainMessage.text=kony.i18n.getLocalizedString("i18n.frmTrackApplication.SSNExist");
            scopeObj.view.popUp.rtxPopUpDisclaimer.text=kony.i18n.getLocalizedString("i18n.frmTrackApplication.AccountFoundWithSameSSN");

            scopeObj.view.popUp.btnPopUpCancel.text=kony.i18n.getLocalizedString("i18n.PopUp.NoLeaveAsIS");
            scopeObj.view.popUp.btnPopUpDelete.text=kony.i18n.getLocalizedString("i18n.PopUp.YesProceed");
            scopeObj.view.popUp.setVisibility(true) ;            
          }
        }
        //Response of usps validation
        if (context.USPSRecommendations) {
          if (context.USPSRecommendations.AddressValidateResponse[0].Address.City) {
            if (scopeObj.USPSMatch(context.USPSRecommendations.AddressValidateResponse[0].Address) === true) {
              scopeObj.lblvalidate.isVisible = false;
              scopeObj.lblvalidate.text = "";
              scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.AddressMatchedWithUSPSRecords");
              this.USPSValidated = true;
              this.view.forceLayout();
            } else {
              scopeObj.USPSRecommendations = context.USPSRecommendations.AddressValidateResponse[0].Address;
              scopeObj.view.flxUSPSValidation.isVisible = true;
              scopeObj.view.lblOriginalAddressValue.text = scopeObj.address1.text + ", " + scopeObj.city.text + ", " + scopeObj.city.text + ", " + scopeObj.country.text + ".";
              scopeObj.view.lblUSPSAddressValue.text = this.USPSRecommendations.Address2 + ", " + this.USPSRecommendations.City + ", " + this.USPSRecommendations.State + ", " + scopeObj.country.text + ".";
              scopeObj.view.forceLayout();
            }
          } else if (context.USPSRecommendations.AddressValidateResponse[0].Address.Error) {
            scopeObj.flxvalidation.isVisible = true;
            scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.unableToValidateUSPS");
            scopeObj.lblvalidate.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.validateAgain");
            scopeObj.uspserror.isVisible=true;
            scopeObj.USPSValidated = false;
            scopeObj.view.forceLayout();
          }
        }
        scopeObj.view.forceLayout();
      }
    },

    frmTrackApplicationPreShow: function() {
      var scopeObj = this ;
      scopeObj.view.flxGeneralInformationWrapper.setVisibility(true);
      scopeObj.view.generalInfoHeader.flxUnlock.setVisibility(false);
      var currentCustomerDetails = this.presenter.getCurrentCustomerDetails();
      scopeObj.customerName = currentCustomerDetails.Name ;
      scopeObj.view.generalInfoHeader.setDefaultHeaderData(this);
      scopeObj.view.generalInfoHeader.setCustomerNameandTag(currentCustomerDetails);
      scopeObj.view.viewLoaninformation.viewLoanInformationPreShow();
      scopeObj.view.Notes.setDefaultNotesData(this);
      scopeObj.closePopUp();
      scopeObj.setCustomerStatus(currentCustomerDetails.OLBCustomerFlags.Status);
      if(currentCustomerDetails.CustomerType_id === "TYPE_ID_PROSPECT"){
        scopeObj.view.generalInfoHeader.flxActionButtons.setVisibility(false);
        scopeObj.view.generalInfoHeader.flxRiskStatus.setVisibility(false);
        scopeObj.view.alertMessage.setVisibility(false);
      }else{
        scopeObj.view.generalInfoHeader.flxRiskStatus.setVisibility(true);
        scopeObj.view.alertMessage.setVisibility(true);
        scopeObj.view.generalInfoHeader.flxActionButtons.setVisibility(true);
        scopeObj.view.generalInfoHeader.setRiskStatus(currentCustomerDetails.CustomerFlag);
        scopeObj.view.alertMessage.setGeneralInformationAlertMessage(this, this.presenter.getCurrentCustomerLockedOnInfo(),
                                                                     this.presenter.getCurrentCustomerRequestAndNotificationCount());              
      }
      scopeObj.view.Notes.setDefaultNotesData(this);
      scopeObj.view.breadcrumbs.lblCurrentScreen.text = currentCustomerDetails.Name.toUpperCase();
      scopeObj.view.commonButtons.btnCancel.left = "20dp" ;
      scopeObj.view.commonButtons.btnCancel.skin =  "sknbtnffffffLatoBold4F555D13pxKA";
      scopeObj.view.commonButtons.btnCancel.hoverSkin =  "sknbtnffffffLatoBold4F555D13pxKA";
      scopeObj.view.commonButtons.btnSave.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.submit") ;
      scopeObj.view.commonButtons.btnSave.right = "20dp" ;
      scopeObj.view.generalInfoHeader.flxActionButtons.setVisibility(false) ;
      scopeObj.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
      scopeObj.setConsentMessage();
      scopeObj.subTabsButtonUtilFunction([scopeObj.view.dashboardCommonTab.btnProfile, scopeObj.view.dashboardCommonTab.btnLoans,
                                          scopeObj.view.dashboardCommonTab.btnDeposits, scopeObj.view.dashboardCommonTab.btnBanking
                                         ],
                                         scopeObj.view.dashboardCommonTab.btnLoans);
      scopeObj.setFlowActions();
    },

    setCustomerStatus: function (status) {
      var self = this;
      var customerType = this.presenter.getCurrentCustomerType();
      if (status === "LOCKED") {
        self.view.generalInfoHeader.handleLockedUserStatus(customerType, self);    
      } else if (status === "SUSPENDED") {
        self.view.generalInfoHeader.handleSuspendedUserStatus(customerType, self);  
      } else if (status === "NEW") {
        self.view.generalInfoHeader.handleNewUserStatus(customerType, self);
      } else {
        self.view.generalInfoHeader.handleActiveUserStatus(customerType, this.presenter.getCurrentCustomerDetails().IsAssistConsented, self);
      }
    },

    setFlowActions: function() {
      var scopeObj = this;

      scopeObj.view.fontIconImgCLose.onClick = function(){
        scopeObj.view.flxUSPSValidation.setVisibility(false);
      };

      scopeObj.view.editConsent.flxConsentTerms.onClick = function() {
        scopeObj.view.flxConsentPopup.setVisibility(true) ;
        scopeObj.view.consent.setVisibility(true) ;
      };

      scopeObj.view.consent.flxPopUpClose.onClick = function() {
        scopeObj.closePopUp();
      };

      scopeObj.view.consent.btnPopUpCancel.onClick = function() {
        scopeObj.closePopUp();
      };

      scopeObj.view.consent.btnPopUpDelete.onClick = function() {
        scopeObj.closePopUp();
      };

      scopeObj.view.popUp.flxPopUpClose.onClick = function() {
        scopeObj.closePopUp();
      };

      scopeObj.view.popUp.btnPopUpCancel.onClick = function() {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.showLoansForm();
      };

      scopeObj.view.popUp.btnPopUpDelete.onClick = function() {
        scopeObj.closePopUp();
      };

      scopeObj.view.loanApplicationDetails.flxReturnToLoans.onClick = function() {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.showLoansForm();
      };

      scopeObj.view.breadcrumbs.btnBackToMain.onClick = function() {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        scopeObj.presenter.turnOnCustomerManagementSearch();
      };

      scopeObj.view.leftMenu.flxAppplicantHeading.onClick = function() {
        scopeObj.navigateToApplicantSection(true) ;
      };

      scopeObj.view.leftMenu.flxCoApplicantHeading.onClick = function() {
        scopeObj.navigateToCoApplicantSection(true) ;
      };

      scopeObj.view.commonButtons.btnCancel.onClick = function() {
        scopeObj.cancelEdit() ;
      };

      scopeObj.view.commonButtons.btnSave.onClick = function () {
        if (scopeObj.view.editConsent.lblAcceptanceIcon.isVisible) {
          kony.adminConsole.utils.showProgressBar(scopeObj.view);
          scopeObj.hasValidDataToSave = scopeObj.validateApplicantData();
          if (scopeObj.view.editApplicantDetails.editContactInfo.txtCellPhoneValue.text.trim() !== "") {
            scopeObj.presenter.NumberValidation({
              "phoneNo": scopeObj.view.editApplicantDetails.editContactInfo.txtCellPhoneValue.text
            });
          }
        }
      };

      scopeObj.view.editConsent.flxAcceptanceIcon.onClick = function() {
        var isAccepted = !(scopeObj.view.editConsent.lblAcceptanceIcon.isVisible) ;
        scopeObj.view.editConsent.flxAcceptanceIcon.skin = isAccepted ? "flx3B99FC" : "flxB7B7B7" ;
        scopeObj.view.editConsent.lblAcceptanceIcon.setVisibility(isAccepted) ;
        scopeObj.view.commonButtons.btnSave.setEnabled(isAccepted) ;
        scopeObj.view.commonButtons.btnSave.skin = isAccepted ? "sknBtn003E75LatoRegular13pxFFFFFFRad20px" : "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px" ;
        scopeObj.view.commonButtons.btnSave.hoverSkin = isAccepted ? "sknBtn005198LatoRegular13pxFFFFFFRad20px" : "sknBtn2D5982LatoRegular13pxFFFFFFRad20px" ;
      };

      scopeObj.view.consent.btnPopUpDelete.onClick = function() {
        scopeObj.view.editConsent.flxAcceptanceIcon.skin = "flx3B99FC";
        scopeObj.view.editConsent.lblAcceptanceIcon.setVisibility(false) ;
        scopeObj.view.commonButtons.btnSave.setEnabled(true) ;
        scopeObj.view.commonButtons.btnSave.skin = "sknBtn003E75LatoRegular13pxFFFFFFRad20px" ;
        scopeObj.view.commonButtons.btnSave.hoverSkin = "sknBtn005198LatoRegular13pxFFFFFFRad20px" ;
        scopeObj.closePopUp();
      } ;

      scopeObj.view.consent.btnPopUpCancel.onClick = function() {
        scopeObj.view.editConsent.flxAcceptanceIcon.skin = "flxB7B7B7" ;
        scopeObj.view.editConsent.lblAcceptanceIcon.setVisibility(true) ;
        scopeObj.view.commonButtons.btnSave.setEnabled(false) ;
        scopeObj.view.commonButtons.btnSave.skin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px" ;
        scopeObj.view.commonButtons.btnSave.hoverSkin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px" ;
        scopeObj.closePopUp();
      } ;
      // ssn flow actions
      scopeObj.view.editApplicantDetails.editPersonalInfo.txtSSNValue.onKeyUp = function() {
        var textLen = scopeObj.view.editApplicantDetails.editPersonalInfo.txtSSNValue.text.length ;
        scopeObj.view.editApplicantDetails.editPersonalInfo.lblSSNSize.text = textLen + "/" + scopeObj.view.editApplicantDetails.editPersonalInfo.txtSSNValue.maxtextlength;
        scopeObj.view.editApplicantDetails.editPersonalInfo.lblSSNSize.setVisibility(true);
        scopeObj.view.editApplicantDetails.editPersonalInfo.flxSSN.forceLayout();
        if(scopeObj.view.editApplicantDetails.editPersonalInfo.txtSSNValue.text.length === 9) {
          scopeObj.presenter.SSNValidation({
            "Ssn" : scopeObj.view.editApplicantDetails.editPersonalInfo.txtSSNValue.text,
            "_searchType": "CUSTOMER_SEARCH"
          }) ;
        }
      };

      scopeObj.view.editApplicantDetails.editAddressInfo.flxValidate.lblValidate.onTouchStart = function() {
        scopeObj.setUspsValidationObjects("address");
        scopeObj.isAddressNull();
        scopeObj.addressInput = scopeObj.getAddressInput();
        scopeObj.presenter.ValidateAddress(scopeObj.addressInput);
      };

      scopeObj.view.editApplicantDetails.editAddressInfo.flxValidate2.lblValidate2.onTouchStart = function() {
        scopeObj.setUspsValidationObjects("prevaddress");
        scopeObj.isAddressNull();
        scopeObj.addressInput = scopeObj.getAddressInput();
        scopeObj.presenter.ValidateAddress(scopeObj.addressInput);
      };

      scopeObj.view.editApplicantDetails.editEmployementInfo.flxValidate.lblValidate.onTouchStart = function() {
        scopeObj.setUspsValidationObjects("empaddress");
        scopeObj.isAddressNull();
        scopeObj.addressInput = scopeObj.getAddressInput();
        scopeObj.presenter.ValidateAddress(scopeObj.addressInput);
      };

      scopeObj.view.editApplicantDetails.editEmployementInfo.flxValidatePrev.lblVallidatePrev.onTouchStart = function() {
        scopeObj.setUspsValidationObjects("prevempaddress");
        scopeObj.isAddressNull();
        scopeObj.addressInput = scopeObj.getAddressInput();
        scopeObj.presenter.ValidateAddress(scopeObj.addressInput);
      };

      scopeObj.view.btnsave.onClick = function(){
        scopeObj.view.flxUSPSValidation.isVisible = false;
        scopeObj.lblvalidate.isVisible = false;
        scopeObj.lblvalidate.text = "";
        scopeObj.address1.text = scopeObj.USPSRecommendations.Address2;
        scopeObj.city.text = scopeObj.USPSRecommendations.City;
        scopeObj.zip.text = scopeObj.USPSRecommendations.Zip5;
        scopeObj.state.text = scopeObj.USPSRecommendations.State;
        scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecommendationValidated");
        scopeObj.view.forceLayout();
      };

      scopeObj.view.btnCancel.onClick = function(){
        scopeObj.view.flxUSPSValidation.isVisible = false;
        scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecomendationIgnored");
        scopeObj.lblvalidate.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.validateAgain");
        scopeObj.USPSValidated = true;
        scopeObj.lblvalidate.isVisible = true;
        scopeObj.view.forceLayout();
      };

      scopeObj.view.AUpopup.flxPopUpClose.onClick = function () {
        scopeObj.closePopUp();
        scopeObj.view.editAUDetails.clearContents();
      };

      scopeObj.view.AUpopup.btnPopUpCancel.onClick = function () {
        scopeObj.closePopUp();
      };

      scopeObj.view.AUpopup.btnPopUpDelete.onClick = function () {
        scopeObj.view.editAUDetails.setAutorizationUser(false);
        scopeObj.closePopUp();
        scopeObj.view.editAUDetails.clearContents();
      };

    },

    setApplicationData : function(){
      var scopeObj = this ;   
      // clone date picker for DOB
      scopeObj.view.leftMenu.lblLoanType.text = scopeObj.loanType.toUpperCase() ;
      scopeObj.view.viewApplicantDetails.lblApplicantHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.ApplicantDetails") ;
      for(var key in scopeObj.applicantFieldMapper) {
        scopeObj.setValueToElements(key,scopeObj.applicantFieldMapper[key]) ;
      }
      scopeObj.view.viewApplicantDetails.viewEmployerDetails.showEmployementDetails(scopeObj.valuesMapper.EmploymentStatus,
                                                                                    scopeObj.hasPreviousEmployer,scopeObj.valuesMapper.FullTimeIncomePayPeriod) ;
      scopeObj.view.viewApplicantDetails.viewAddressInfo.flxPreviousAddress.setVisibility(scopeObj.hasPreviousAddress);
      scopeObj.view.viewApplicantDetails.viewEmployerDetails.setVisibility(scopeObj.hasEmployment);
      if(scopeObj.isCreditCardLoan) {
        scopeObj.showAUDetailsComponent();
        scopeObj.setAUAddressDetails();
      }
      scopeObj.setEmploymentDetails(false);
      scopeObj.forAdditionalIncomes() ;
      scopeObj.showOrHideCoApplicant() ;      
      scopeObj.registerEvents();
      scopeObj.view.leftMenu.lblApplicantArrow.setVisibility(true);
      scopeObj.view.leftMenu.lblCoApplicantArrow.setVisibility(false); 
      kony.adminConsole.utils.hideProgressBar(scopeObj.view);
    },

    setValueToElements : function(key, obj) {
      var scopeObj = this ;
      var elem  ;
      var path = obj[0] ; 
      var value = scopeObj.valuesMapper[key] ;
      for(var index in path) {
        elem = elem ? elem[path[index]] : scopeObj.view[path[index]] ;
      }     
      var prefix = (obj[2]) ? obj[2].concat(" ") : "";
      if(elem) {
        elem.text = (value === undefined || value === null || value === "") ? kony.i18n.getLocalizedString("i18n.Applications.NA") : prefix.concat(value) ; 
        if(key === "LoanTerms" || key === "FullTimeIncomeHours") {
          elem.text = (value === undefined || value === null || value === "") ? kony.i18n.getLocalizedString("i18n.Applications.NA") : value.concat(" ").concat(prefix) ;
        }
      } 
    },

    setEmploymentDetails : function(isEdit) {
      var scopeObj = this ;
      var employmentType = scopeObj.view.viewApplicantDetails.viewIncomeSource.lblEmpStatusValue.text.toUpperCase() ;
      var mapperType  ;
      switch (employmentType) {
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.FullTimeEmployed").toUpperCase() :  
          mapperType = scopeObj.fullTimeEmploymentMapper;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.PartTimeEmployed").toUpperCase() :  
          mapperType = scopeObj.partTimeEmploymentMapper;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmployed").toUpperCase() :  
          mapperType = scopeObj.selfEmploymentMapper ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Military").toUpperCase() :  
          mapperType = scopeObj.militaryEmploymentMapper;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Other").toUpperCase() : 
          mapperType = scopeObj.otherEmploymentMapper; 
          break ;
        default :
          break ;
      }
      if(mapperType) {
        for(var key in mapperType) {
          if(isEdit) {
            scopeObj.setEditValueToElements(key,mapperType[key]) ;
          } else {
            scopeObj.setValueToElements(key,mapperType[key]) ;
          }
        }
      }
    },

    navigateToApplicantSection : function(isJumpToSection){
      var scopeObj = this ; 
      scopeObj.view.leftMenu.lblApplicantArrow.setVisibility(true);
      scopeObj.view.leftMenu.lblCoApplicantArrow.setVisibility(false); 
      if(isJumpToSection && scopeObj.view.flxViewLoanDetails.isVisible ) {
        scopeObj.view.flxViewLoanDetails.scrollToWidget(scopeObj.view.viewApplicantDetails) ;
      } else if(isJumpToSection && scopeObj.view.flxEditLoanInformation.isVisible ) {
        scopeObj.view.flxEditLoanInformation.flxEditLoanInformation1.scrollToWidget(scopeObj.view.editApplicantDetails) ;
      }
      scopeObj.view.forceLayout();
    },

    navigateToCoApplicantSection : function(isJumpToSection){
      var scopeObj = this ;          
      if(isJumpToSection && scopeObj.view.flxViewLoanDetails.isVisible && scopeObj.view.viewCoApplicantDetails) {
        scopeObj.view.leftMenu.lblApplicantArrow.setVisibility(false);
        scopeObj.view.leftMenu.lblCoApplicantArrow.setVisibility(true); 
        scopeObj.view.flxViewLoanDetails.scrollToWidget(scopeObj.view.viewCoApplicantDetails) ;
      } 
      scopeObj.view.forceLayout();
    },

    editApplication : function() {
      var scopeObj = this ; 
      scopeObj.view.editLoaninformation.editLoanInformationPreshow(scopeObj.isPersonalLoan,scopeObj.isCreditCardLoan,scopeObj.isVehicleLoan);
      scopeObj.view.editApplicantDetails.editPersonalInfo.editPersonalInfoPreshow();
      scopeObj.view.editApplicantDetails.editContactInfo.editContactPreshow();
      scopeObj.view.editApplicantDetails.editAddressInfo.editAddressPreshow();
      scopeObj.view.editApplicantDetails.editEmployementInfo.editEmployementPreshow();
      scopeObj.view.editApplicantDetails.editAdditionalIncome.editAdditonalIncomePreShow(scopeObj.listBoxMapper);
      scopeObj.view.editApplicantDetails.editExpenditureInfo.editExpenditurePreshow();
      scopeObj.view.editApplicantDetails.editPersonalInfo.flxDropDownAdmin2.add(scopeObj.generateCalender("DOB"));
      scopeObj.editApplicantData();
      scopeObj.view.editApplicantDetails.editEmployementInfo.employmentStatus();
      if(scopeObj.isCreditCardLoan) {
        scopeObj.view.editAUDetails.editAUDetailsPreShow();
      }
      scopeObj.view.editConsent.flxAcceptanceIcon.skin = "flxB7B7B7";
      scopeObj.view.editConsent.lblAcceptanceIcon.setVisibility(false) ;
      scopeObj.view.commonButtons.btnSave.setEnabled(false) ;
      scopeObj.view.commonButtons.btnSave.skin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px" ;
      scopeObj.view.commonButtons.btnSave.hoverSkin = "sknBtn4A77A0LatoRegular13pxFFFFFFRad20px" ;
      scopeObj.view.flxViewLoanDetails.setVisibility(false) ;
      scopeObj.view.flxEditLoanInformation.setVisibility(true) ;
      scopeObj.view.forceLayout();
    },

    setEditValueToElements : function (key, obj) {
      var scopeObj = this ;
      var elem  ;
      var path = obj[1] ; 
      var value = scopeObj.valuesMapper[key] ;
      for(var index in path) {
        elem = elem ? elem[path[index]] : scopeObj.view[path[index]] ;
      }     
      if(elem) {
        if(elem && elem.hasOwnProperty("masterData")){
          elem.selectedKey = scopeObj.getKeyOfMasterData(value,elem.masterData);
        }else if(elem){
          elem.text = value;
        }  
      } 
    },

    editApplicantData : function() {
      var scopeObj = this ;   
      for(var key in scopeObj.applicantFieldMapper) {
        scopeObj.setEditValueToElements(key,scopeObj.applicantFieldMapper[key]) ;
      }
      scopeObj.editAdditionalIncome();
      scopeObj.setEmploymentDetails(true);
      scopeObj.view.editApplicantDetails.editAddressInfo.radioButtonOnClick(scopeObj.hasPreviousAddress);
      scopeObj.view.editApplicantDetails.editEmployementInfo.showPreviousEmployment(scopeObj.hasPreviousEmployer);
      scopeObj.view.editApplicantDetails.editAdditionalIncome.showAdditionalIncomes(scopeObj.hasAdditionalIncome) ;
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editLoaninformation_txtLoanAmountValue'); 
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editLoaninformation_txtLoanTermAmount');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editLoaninformation_txtCreditLimitAmount');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editContactInfo_txtCellPhoneValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editContactInfo_txtHomePhoneValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editContactInfo_txtBusinessPhoneValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editEmployementInfo_txtGrossIncomeValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editEmployementInfo_txtWorkHoursValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editEmployementInfo_txtGrossIncomeValueMilitary');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editEmployementInfo_txtGrossIncomeValueOther');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editAdditionalIncome_txtGrossIncomeValue1');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editAdditionalIncome_txtGrossIncomeValue2');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editExpenditureInfo_txtRentValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editApplicantDetails_editExpenditureInfo_txtMortgageValue');
      if(scopeObj.isCreditCardLoan) {
        scopeObj.setAUDetails();
      }
    },

    cancelEdit: function () {
      var scopeObj = this;
      scopeObj.view.flxViewLoanDetails.setVisibility(true);
      scopeObj.view.flxEditLoanInformation.setVisibility(false);
      scopeObj.view.forceLayout();
    },

    setConsentMessage : function() {
      var scopeObj = this ;
      var consentmsg = scopeObj.customerName.concat("'s, ") ;
      scopeObj.view.viewConsent.lblConsentMsg.text = consentmsg.concat(kony.i18n.getLocalizedString("i18n.frmLoansDashboard.Consent")).concat("*") ;
      scopeObj.view.editConsent.lblConsentMsg.text = consentmsg ;
      scopeObj.view.editConsent.lblConsentTerms.text = kony.i18n.getLocalizedString("i18n.frmLoansDashboard.Consent").concat("*") ;
    },

    getValue : function(value, isListbox) {
      return (value === kony.i18n.getLocalizedString("i18n.Applications.NA")) ? (isListbox ? "Select" : "") : value ;
    },

    validateApplicantData: function () {
      var scopeObj = this;
      var isValid = true;
      var isLoanInforDataValid = scopeObj.view.editLoaninformation.validateLoanInfoData(scopeObj.loanType.toUpperCase(), scopeObj.minAmountRange, scopeObj.maxAmountRange,
                                                                                        scopeObj.minMonths, scopeObj.maxMonths, scopeObj.isCreditCardLoan);
      var isPersonalInfoDataValid = scopeObj.view.editApplicantDetails.editPersonalInfo.validatePersonalInfodata();
      var isContactInfoDataValid = scopeObj.view.editApplicantDetails.editContactInfo.validateContactInfoData();
      var isAddressInfoDataValid = scopeObj.view.editApplicantDetails.editAddressInfo.validateAddressData();
      var isEmploymentValid = scopeObj.view.editApplicantDetails.editEmployementInfo.validateEmploymentInfo();
      var isAdditionalIncomeValid = scopeObj.view.editApplicantDetails.editAdditionalIncome.validateAdditionalIncomes();

      //Validating Authorized user for Credit card IF EXISTS
      if (scopeObj.isCreditCardLoan) {
        var isAuthorizedUserDataValid = scopeObj.view.editAUDetails.validateAuthorizedUserdata();
        isValid = isValid && isAuthorizedUserDataValid;
      }
      isValid = isValid && isLoanInforDataValid && isPersonalInfoDataValid && isContactInfoDataValid && isAddressInfoDataValid &&
        isEmploymentValid && isAdditionalIncomeValid;
      return isValid;
    },

    showOrHideCoApplicant : function () {
      var scopeObj = this ;
      scopeObj.view.leftMenu.flxCoApplicantHeading.setVisibility(scopeObj.hasCoborrower);
      if (scopeObj.hasCoborrower) {
        var viewCoApplicantDetails = new com.adminConsole.loans.applications.viewApplicantDetails({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "viewCoApplicantDetails",
          "isVisible": true,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "isModalContainer": false,
          "skin": "slFbox",
          "top": "0dp",
          "overrides": {}
        }, {
          "overrides": {}
        }, {
          "overrides": {}
        });
        viewCoApplicantDetails.viewPersonalInfo.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewContactInfo.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewAddressInfo.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewAddressInfo.loansSectionHeader1.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewIncomeSource.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewEmployerDetails.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewEmployerDetails.loansSectionHeader1.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewAdditionalIncome.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.viewExpenditureInfo.loansSectionHeader.btnEdit.setVisibility(false) ;
        viewCoApplicantDetails.lblApplicantHeader.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.CoApplicantDetails") ;
        scopeObj.forCoAppAdditionalIncomes(viewCoApplicantDetails);
        scopeObj.view.flxViewLoanDetails.addAt(viewCoApplicantDetails,2);
        for(var key in scopeObj.coapplicantFieldMapper) {
          scopeObj.setValueToElements(key,scopeObj.coapplicantFieldMapper[key]) ;
        }
        viewCoApplicantDetails.viewEmployerDetails.showEmployementDetails(scopeObj.valuesMapper.CoAppEmploymentStatus,scopeObj.hasCoAppPreviousEmployer,
                                                                          scopeObj.valuesMapper.CoAppFullTimeIncomePayPeriod) ;
        viewCoApplicantDetails.viewAddressInfo.flxPreviousAddress.setVisibility(scopeObj.hasCoAppPreviousAddress);
        viewCoApplicantDetails.viewEmployerDetails.setVisibility(scopeObj.hasCoAppEmployment);
      }      
    },

    convertToValueMapper: function (data) {
      var scopeObj = this;
      scopeObj.valuesMapper = {};
      scopeObj.hasCoborrower = false;
      for (var i = 0; i < data.records.length; i++) {
        var jsonRowData = data.records[i];
        if (!scopeObj.hasCoborrower && scopeObj.cobrrowerKeyValue.hasOwnProperty(jsonRowData.abstractName) &&
            scopeObj.cobrrowerKeyValue[jsonRowData.abstractName].toUpperCase() === jsonRowData.Value.toUpperCase()) {
          scopeObj.hasCoborrower = true;
        }
        scopeObj.valuesMapper[jsonRowData.abstractName] = jsonRowData.Value ? jsonRowData.Value : "" ;
      }
      scopeObj.hasPreviousAddress = scopeObj.valuesMapper.CurrentAddressDuration ? scopeObj.valuesMapper.CurrentAddressDuration === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Lessthantwoyears") : false ;
      scopeObj.hasPreviousEmployer = scopeObj.valuesMapper.PrevEmployerChallenge ? scopeObj.valuesMapper.PrevEmployerChallenge.toUpperCase() === "YES" : false ;
      scopeObj.hasEmployment = scopeObj.valuesMapper.EmploymentStatus ? scopeObj.valuesMapper.EmploymentStatus.toUpperCase() !== "UNEMPLOYED" : false ;
      scopeObj.hasAdditionalIncome = scopeObj.valuesMapper.AddIncomeChallenge ? scopeObj.valuesMapper.AddIncomeChallenge.toUpperCase() === "YES" : false ;
      scopeObj.hasCoAppPreviousAddress = scopeObj.valuesMapper.CoAppCurrentAddressDuration ? scopeObj.valuesMapper.CoAppCurrentAddressDuration === "Less than two years" : false ;
      scopeObj.hasCoAppPreviousEmployer = scopeObj.valuesMapper.CoAppPrevEmployerChallenge ? scopeObj.valuesMapper.CoAppPrevEmployerChallenge.toUpperCase() === "YES" : false ;
      scopeObj.hasCoAppEmployment = scopeObj.valuesMapper.CoAppEmploymentStatus ? scopeObj.valuesMapper.CoAppEmploymentStatus.toUpperCase() !== "UNEMPLOYED" : false ;
      scopeObj.view.loanApplicationDetails.lblApplicationId.text = data.id ;
      scopeObj.view.loanApplicationDetails.lblCreatedDateValue.text = this.getDateFormatMMDDYYYY(data.createdts);
      scopeObj.view.loanApplicationDetails.lblModDateValue.text = this.getDateFormatMMDDYYYY(data.lastmodifiedts);
      scopeObj.view.leftMenu.lblLoanStatus.text = data.Status_id ;
      scopeObj.loanTypeId = data.QueryDefinition_id ;
      scopeObj.isCreditCardLoan = scopeObj.loanTypeId === kony.i18n.getLocalizedString("i18n.frmTrackApplication.CREDITCARDAPPLICATION") ;
      scopeObj.isPersonalLoan = scopeObj.loanTypeId === kony.i18n.getLocalizedString("i18n.frmTrackApplication.PERSONALAPPLICATION") ;
      scopeObj.isVehicleLoan = scopeObj.loanTypeId === kony.i18n.getLocalizedString("i18n.frmTrackApplication.VEHICLEAPPLICATION") ;
      scopeObj.view.viewLoaninformation.setLoanInfo(data.QueryDefinition_id);
      scopeObj.submitJSON = {
        "CustomerQuerySectionStatus": data.CustomerQuerySectionStatus ? data.CustomerQuerySectionStatus : [],
        "id": data.id,
        "QuestionResponse": [],
        "Customer_id": data.Customer_id,
        "Status_id": data.Status_id,
        "QueryDefinition_id": data.QueryDefinition_id
      };
      scopeObj.closePopUp();
      scopeObj.view.flxViewLoanDetails.setVisibility(true) ;
      scopeObj.view.flxEditLoanInformation.setVisibility(false);
    },

    forAdditionalIncomes : function() {
      var scopeObj = this ;
      var index = 1 ;
      var incomeType = null ;
      var incomeValues = [] ;
      var incomeGroup = null ;
      scopeObj.view.viewApplicantDetails.viewAdditionalIncome.flxIncomeInfoSource.removeAll();
      while(scopeObj.valuesMapper["AddIncome" + index] && scopeObj.valuesMapper["AddIncome" + index] !== "") {
        incomeGroup = new com.adminConsole.loans.applications.incomeGroup({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "incomeGroup" +  index,
          "isVisible": true,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "isModalContainer": false,
          "skin": "slFbox",
          "top": "30dp",
          "overrides": {}
        }, {
          "overrides": {}
        }, {
          "overrides": {}
        });
        incomeType = scopeObj.valuesMapper["AddIncome" + index] ;
        incomeValues = scopeObj.valuesMapper["AddIncome" + incomeType.replace("\/","").replace(" ", "").toUpperCase() ].split("###") ;
        incomeGroup.IncomeTypeValue.text = incomeType ;
        incomeGroup.lblGrossIncomeValue.text = kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol").concat(" ").concat(incomeValues[0]) ;
        incomeGroup.lblPayPeriodValue.text = incomeValues[1];
        if(incomeType === "Other") {
          //incomeGroup.IncomeTypeValue.text = scopeObj.valuesMapper.AddIncomeOtherName ;
          incomeGroup.lblDescriptionValue.text = scopeObj.valuesMapper.AddIncomeOtherDesc ? scopeObj.valuesMapper.AddIncomeOtherDesc : kony.i18n.getLocalizedString("i18n.Applications.NA");
          incomeGroup.flxDescription.setVisibility(true);
        }
        scopeObj.view.viewApplicantDetails.viewAdditionalIncome.flxIncomeInfoSource.add(incomeGroup) ;
        index++ ;
      }
    },

    forCoAppAdditionalIncomes : function(viewCoApplicantDetails) {
      var scopeObj = this ;
      var index = 1 ;
      var incomeType = null ;
      var incomeValues = [] ;
      var incomeGroup = null ;
      while(scopeObj.valuesMapper["CoAppAddIncome" + index] && scopeObj.valuesMapper["CoAppAddIncome" + index] !== "") {
        incomeGroup = new com.adminConsole.loans.applications.incomeGroup({
          "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
          "clipBounds": true,
          "id": "incomeGroup" +  index,
          "isVisible": true,
          "layoutType": kony.flex.FLOW_VERTICAL,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "isModalContainer": false,
          "skin": "slFbox",
          "top": "30dp",
          "overrides": {}
        }, {
          "overrides": {}
        }, {
          "overrides": {}
        });
        incomeType = scopeObj.valuesMapper["CoAppAddIncome" + index] ;
        incomeValues = scopeObj.valuesMapper["CoAppAddIncome" + incomeType.replace("\/","").replace(" ", "").toUpperCase() ].split("###") ;
        incomeGroup.IncomeTypeValue.text = incomeType ;
        incomeGroup.lblGrossIncomeValue.text = kony.i18n.getLocalizedString("i18n.Applications.DollarSymbol").concat(" ").concat(incomeValues[0]) ;
        incomeGroup.lblPayPeriodValue.text = incomeValues[1];
        if(incomeType === "Other") {
          //incomeGroup.IncomeTypeValue.text = scopeObj.valuesMapper.AddIncomeOtherName ;
          incomeGroup.lblDescriptionValue.text = scopeObj.valuesMapper.CoAppAddIncomeOtherDesc ? scopeObj.valuesMapper.CoAppAddIncomeOtherDesc : kony.i18n.getLocalizedString("i18n.Applications.NA") ;
          incomeGroup.flxDescription.setVisibility(true);
        }
        viewCoApplicantDetails.viewAdditionalIncome.flxIncomeInfoSource.add(incomeGroup) ;
        index++ ;
      }
    },

    registerEvents : function() {
      var scopeObj = this;
      var elem ;
      var path ;
      for(var key in scopeObj.dynamicEvents) {
        elem = undefined ;
        path = scopeObj.dynamicEvents[key] ;
        for(var index in path) {
          elem = elem ? elem[path[index]] : scopeObj.view[path[index]] ;
        } 
        if(elem && elem.btnEdit){
          elem.btnEdit.onClick = function() {  
            scopeObj.getMasterData(scopeObj.loanType.toUpperCase());
            //scopeObj.view.flxEditLoanInformation.flxEditLoanInformation1.scrollToWidget(key) ;
          } ;
        }
      }
    },

    getMasterData : function(loanType) {
      var scopeObj = this;
      scopeObj.presenter.getPersonalLoanPurpose(scopeObj.loanTypeId);
    },

    setListBoxMasterData : function(loanType, records) {
      var scopeObj = this;
      scopeObj.listBoxMapper = {} ;
      for(var i = 0; i < records.length; i++) {
        var record = records[i] ;
        if(record.QuerySection_Name === "Your Loan") {
          for(var j = 0; j < record.QuestionDefinition.length; j++) {
            if(record.QuestionDefinition[j].Question_FriendlyName === "LoanPurpose") {
              scopeObj.view.editLoaninformation.lstLoanPurposeValue.masterData = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems) ;
            } 
            if(record.QuestionDefinition[j].Question_FriendlyName === "LoanAmount") {
              var maxAmount = record.QuestionDefinition[j].OptionItems[0].OptionItem_DefaultValue;
              scopeObj.maxAmountRange = maxAmount ;
              scopeObj.view.editLoaninformation.lblLoanAmountRange.text = "(Range: $1K ~ $" + maxAmount +"K)";  
            }
            if(record.QuestionDefinition[j].Question_FriendlyName === "LoanTerms") {
              var length = (record.QuestionDefinition[j].OptionItems.length-1) ;
              var minMonths = record.QuestionDefinition[j].OptionItems[0].OptionItem_DefaultValue.replace(" months", "");
              var maxMonths = record.QuestionDefinition[j].OptionItems[length].OptionItem_DefaultValue.replace(" months", "");
              scopeObj.minMonths = minMonths;
              scopeObj.maxMonths = maxMonths;
              scopeObj.view.editLoaninformation.lblLoanTermRange.text = "(Range: "+minMonths +" ~ " + maxMonths +" Months)";  

            }
          }
        } else if (record.QuerySection_Name === "Personal Info" && record.QuerySection_Parent_id === "APPLICANT") {
          for (var j = 0; j < record.QuestionDefinition.length; j++) {
            if (record.QuestionDefinition[j].Question_FriendlyName === "Suffix") {
              scopeObj.view.editApplicantDetails.editPersonalInfo.lstSuffixValue.masterData = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems, true);
            }
            if(record.QuestionDefinition[j].Question_FriendlyName === "CurrentAddressType") {
              scopeObj.view.editApplicantDetails.editAddressInfo.lstHomeOwnershipValue.masterData = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems);
            }
            if(record.QuestionDefinition[j].OptionItems){
              scopeObj.listBoxMapper[record.QuestionDefinition[j].Question_FriendlyName] = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems) ;
            }
          }
        } else if (record.QuerySection_Name === "Income" && record.QuerySection_Parent_id === "APPLICANT") {
          for (var j = 0; j < record.QuestionDefinition.length; j++) {
            if (record.QuestionDefinition[j].Question_FriendlyName === "EmploymentStatus") {
              scopeObj.view.editApplicantDetails.editEmployementInfo.lstEmploymentStatusValue.masterData = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems);
            } else if (record.QuestionDefinition[j].Question_FriendlyName === "AddIncome1") {
              var list = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems, true);
              scopeObj.view.editApplicantDetails.editAdditionalIncome.lstTypeOfIncome1.masterData = list;
              scopeObj.view.editApplicantDetails.editAdditionalIncome.lstTypeOfIncome2.masterData = list;
            } else if (record.QuestionDefinition[j].Question_FriendlyName === "OtherIncomePayPeriod") {
              var list = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems);
              scopeObj.view.editApplicantDetails.editAdditionalIncome.lstPayPeriodValue1.masterData = list;
              scopeObj.view.editApplicantDetails.editAdditionalIncome.lstPayPeriodValue2.masterData = list;
            } else if (record.QuestionDefinition[j].Question_FriendlyName === "FullTimeIncomeAmount") {
              scopeObj.view.editApplicantDetails.editEmployementInfo.lstPayPeriodValue.masterData = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems);
            } else if (record.QuestionDefinition[j].Question_FriendlyName === "OtherIncomeAmount") {
              scopeObj.view.editApplicantDetails.editEmployementInfo.lstPayPeriodValueOther.masterData = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems);
            } else if (record.QuestionDefinition[j].OptionItems) {
              scopeObj.listBoxMapper[record.QuestionDefinition[j].Question_FriendlyName] = scopeObj.getListForRecords(record.QuestionDefinition[j].OptionItems);
            }
          }
        }
      }
      scopeObj.view.editApplicantDetails.editContactInfo.lstPrimaryContactValue.masterData = [
        ["Home Phone", "Home Phone"],
        ["Office Number", "Office Number"],
        ["Mobile Number", "Mobile Number"],
        ["Email", "Email"]
      ] ;
      if(scopeObj.isCreditCardLoan) {
        scopeObj.view.editLoaninformation.lblCreditLimitRange.text = "(Range: $1K ~ $35K)";
        scopeObj.minAmountRange = "1000";
        scopeObj.maxAmountRange = "35000";
      }
    },

    getListForRecords: function(list, isOptionalField) {
      var self =this;
      var attributeList = isOptionalField ? [[kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select"),kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select")]] : [];
      var optionsList = list.reduce(
        function (list, record) {
          return list.concat([[record.OptionItem_id, record.OptionItem_DefaultValue]]);
        }, []);
      return attributeList.concat(optionsList);
    },

    generateCalender : function(id) {
      var customCalOwnerDOB = new kony.ui.CustomWidget({
        "id": id,
        "isVisible": true,
        "left": "1dp",
        "bottom": "1px",
        "width": kony.flex.USE_PREFFERED_SIZE,
        "centerX": "50%",
        "centerY": "50%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "dateRangePicker",
        "drops": "up",
        "maxDate": "true",
        "opens": "center",
        "rangeType": "",
        "resetData": "",
        "type": "single",
        "value": ""
      });
      return customCalOwnerDOB ;
    },

    closePopUp: function () {
      var scopeObj = this;
      scopeObj.view.flxConsentPopup.setVisibility(false);
      scopeObj.view.consent.setVisibility(false);
      scopeObj.view.popUp.setVisibility(false);
      scopeObj.view.AUpopup.setVisibility(false);
    },

    getKeyOfMasterData : function(value, masterData) {
      if(value) {
        for(var i = 0; i < masterData.length; i++) {
          if(value.toUpperCase() === masterData[i][1].toUpperCase()) {
            return masterData[i][0];
          }
        }
      }
      return kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select");
    },

    editAdditionalIncome : function() {
      var scopeObj = this;
      var index = 1;
      var incomeType = null;
      var incomeValues = [];
      var elem ;
      var isOtherIncome = false ;
      while (scopeObj.valuesMapper["AddIncome" + index] && scopeObj.valuesMapper["AddIncome" + index] !== "" ) {
        incomeType = scopeObj.valuesMapper["AddIncome" + index].replace("\/", "").replace(" ", "").toUpperCase();
        incomeValues = scopeObj.valuesMapper["AddIncome" + incomeType].split("###");
        // type of income
        elem = scopeObj.view.editApplicantDetails.editAdditionalIncome["lstTypeOfIncome" + index] ;
        elem.selectedKey = scopeObj.getKeyOfMasterData(scopeObj.valuesMapper["AddIncome" + index], elem.masterData);
        // description
        isOtherIncome = elem.selectedKey === "INCOME_OTHER_SOURCES_7" ;
        scopeObj.view.editApplicantDetails.editAdditionalIncome["flxDescription"+ index].setVisibility(isOtherIncome) ;
        scopeObj.view.editApplicantDetails.editAdditionalIncome["txtDescription" + index ].text = isOtherIncome ? scopeObj.valuesMapper.AddIncomeOtherDesc : "" ;
        // gross income
        elem = scopeObj.view.editApplicantDetails.editAdditionalIncome["txtGrossIncomeValue" + index] ;
        elem.text = incomeValues[0] ;
        // pay period
        elem = scopeObj.view.editApplicantDetails.editAdditionalIncome["lstPayPeriodValue" + index ] ;
        elem.masterData = scopeObj.listBoxMapper["AddIncome"+incomeType] ;
        elem.selectedKey = scopeObj.getKeyOfMasterData(incomeValues[1], elem.masterData);
        index++ ;
      }
    },

    setAUDetails : function() {
      var scopeObj = this;
      var editAUDetails =  new com.adminConsole.loans.applications.editAUDetails({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": "editAUDetails",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "skin": "slFbox",
        "top": "40dp",
        "overrides": {}
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      scopeObj.view.flxEditLoanInformation1.addAt(editAUDetails,2);
      var hasAuthorizedUser = scopeObj.valuesMapper.AUChallenge.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes").toUpperCase() ;
      scopeObj.view.viewAUDetails.viewAUAddressInfo.loansSectionHeader.lblSectionHeader.text = "Address Details";
      scopeObj.view.editAUDetails.setAutorizationUser(hasAuthorizedUser);
      scopeObj.view.editAUDetails.editAUPersonalInfo.lstSuffixValue.masterData = scopeObj.view.editApplicantDetails.editPersonalInfo.lstSuffixValue.masterData ;
      scopeObj.view.editAUDetails.editAUContactInfo.lstPrimaryContactValue.masterData = scopeObj.view.editApplicantDetails.editContactInfo.lstPrimaryContactValue.masterData ;
      scopeObj.view.editAUDetails.editAddressInfoAsPrevious.flxAcceptanceIcon.skin = scopeObj.isAddressSameAsApplicant ? "flx3B99FC" : "flxB7B7B7"  ;
      scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblAcceptanceIcon.setVisibility(scopeObj.isAddressSameAsApplicant) ;
      scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblValidate.onTouchStart = function(){
        scopeObj.setUspsValidationObjects("auaddress");
        scopeObj.isAddressNull();
        scopeObj.addressInput = scopeObj.getAddressInput();
        scopeObj.presenter.ValidateAddress(scopeObj.addressInput);
      };
      if(hasAuthorizedUser) {
        for(var key in scopeObj.authorizeduserMapper) {
          scopeObj.setEditValueToElements(key,scopeObj.authorizeduserMapper[key]) ;
        }
      }
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editAUDetails_editAUContactInfo_txtCellPhoneValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editAUDetails_editAUContactInfo_txtHomePhoneValue');
      scopeObj.AdminConsoleCommonUtils.restrictTextFieldToNumeric('frmTrackApplication_editAUDetails_editAUContactInfo_txtBusinessPhoneValue');
      if(scopeObj.isAddressSameAsApplicant) {
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtAddressLine1Value.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine1Value.text;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtAddressLine2Value.text  = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine2Value.text;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtCountryValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtCountryValue.text;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtStateValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtStateValue.text;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtCityValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtCityValue.text;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtZipCodeValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtZipCodeValue.text;
      }
      scopeObj.view.editAUDetails.flxRadioButton2.onClick = function() {
        if(scopeObj.valuesMapper.AUChallenge.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes").toUpperCase()) {
          scopeObj.view.AUpopup.lblPopUpMainMessage.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AUpopHeader");
          scopeObj.view.AUpopup.rtxPopUpDisclaimer.text = kony.i18n.getLocalizedString("i18n.frmTrackApplication.AUpopRichText");
          scopeObj.view.AUpopup.setVisibility(true);
          scopeObj.view.flxConsentPopup.setVisibility(true);
          scopeObj.view.forceLayout();
        }
      };
      scopeObj.view.editAUDetails.editAddressInfoAsPrevious.flxAcceptanceIcon.onClick = function() {
        var isPrimaryApplicantAddress = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblAcceptanceIcon.isVisible ;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblAcceptanceIcon.setVisibility(!isPrimaryApplicantAddress) ;
        scopeObj.view.editAUDetails.editAddressInfoAsPrevious.flxAcceptanceIcon.skin = isPrimaryApplicantAddress ? "flxB7B7B7" : "flx3B99FC" ;
        if(!isPrimaryApplicantAddress) {
          scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtAddressLine1Value.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine1Value.text;
          scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtAddressLine2Value.text  = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine2Value.text;
          scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtCountryValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtCountryValue.text;
          scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtStateValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtStateValue.text;
          scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtCityValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtCityValue.text;
          scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtZipCodeValue.text = scopeObj.view.editApplicantDetails.editAddressInfo.txtZipCodeValue.text;
        }
      }
    },

    showAUDetailsComponent : function() {
      var scopeObj = this;
      var viewAUDetails =  new com.adminConsole.loans.applications.viewAUDetails({
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "clipBounds": true,
        "id": "viewAUDetails",
        "isVisible": true,
        "layoutType": kony.flex.FLOW_VERTICAL,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_DEFAULT,
        "isModalContainer": false,
        "skin": "slFbox",
        "top": "40dp",
        "overrides": {}
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      scopeObj.view.flxViewLoanDetails.addAt(viewAUDetails,2);
      for(var key in scopeObj.authorizeduserMapper) {
        scopeObj.setValueToElements(key,scopeObj.authorizeduserMapper[key]) ;
      }
      var hasAuthorizedUser = scopeObj.valuesMapper.AUChallenge.toUpperCase() === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes").toUpperCase() ;
      scopeObj.view.viewAUDetails.viewAUPersonalInfo.setVisibility(hasAuthorizedUser);
      scopeObj.view.viewAUDetails.viewAUContactInfo.setVisibility(hasAuthorizedUser);
      scopeObj.view.viewAUDetails.viewAUAddressInfo.setVisibility(hasAuthorizedUser);
    },

    submitApplication: function () {
      var scopeObj = this;
      if (scopeObj.hasValidDataToSave) {
        kony.adminConsole.utils.showProgressBar(scopeObj.view);
        var queryresponse = [];
        var value = null;
        var path = null;
        var elem = null;
        for (var key in scopeObj.applicantFieldMapper) {
          elem = undefined;
          path = scopeObj.applicantFieldMapper[key][1];
          for (var index in path) {
            elem = elem ? elem[path[index]] : scopeObj.view[path[index]];
          }
          if (elem !== undefined) {
            if (path[0] === "editLoaninformation") {
              if (scopeObj.isCreditCardLoan) {
                // for credit card loan information 
                if (key === "CardType" || key === "CardLimit") {
                  queryresponse.push({
                    "abstractName": key,
                    "Value": elem.text
                  });
                }
              } else if (scopeObj.isPersonalLoan) {
                // for personal loan information
                if (key === "LoanAmount" || key === "LoanTerms" || key === "LoanPurpose") {
                  if (elem.hasOwnProperty("masterData")) {
                    value = elem.selectedKeyValue;
                    if (value[1] !== kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select")) {
                      queryresponse.push({
                        "abstractName": key,
                        "Value": value[1]
                      });
                    }
                  } else if (elem.hasOwnProperty("text")) {
                    queryresponse.push({
                      "abstractName": key,
                      "Value": elem.text
                    });
                  }
                }
              }
            } else {
              // for other sections
              if (key === "CurrentAddressDuration") {
                var hasPreviousAddressinEdit = scopeObj.view.editApplicantDetails.editAddressInfo.imgRadioButton1.src === scopeObj.radio_selected;
                value = hasPreviousAddressinEdit ? kony.i18n.getLocalizedString("i18n.frmTrackApplication.Morethantwoyears") : kony.i18n.getLocalizedString("i18n.frmTrackApplication.Lessthantwoyears");
                queryresponse.push({
                  "abstractName": key,
                  "Value": value,
                  "OptionItem_id": scopeObj.getKeyOfMasterData(value, scopeObj.listBoxMapper[key])
                });
              } else if (elem.hasOwnProperty("src")) {
                value = elem.src;
              } else if (elem.hasOwnProperty("masterData")) {
                value = elem.selectedKeyValue;
                if (value[1] !== kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select")) {
                  queryresponse.push({
                    "abstractName": key,
                    "Value": value[1],
                    "OptionItem_id": value[0]
                  });
                }
              } else if (elem.hasOwnProperty("text")) {
                queryresponse.push({
                  "abstractName": key,
                  "Value": elem.text ? elem.text : ""
                });
              }
            }
          }
        }
        scopeObj.submitApplicantAdditionalIncome(queryresponse);
        scopeObj.submitEmploymentInformtation(queryresponse);
        if (scopeObj.isCreditCardLoan) {
          var hasAuthorizedUser = scopeObj.submitAuthorizedUser(queryresponse);
          var hasAuthorizedUserPreviously = scopeObj.valuesMapper.AUChallenge === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes");
          if (!hasAuthorizedUserPreviously && hasAuthorizedUser) {
            scopeObj.submitJSON.CustomerQuerySectionStatus.push({
              "Customer_id": scopeObj.submitJSON.Customer_id,
              "QuerySection_FriendlyName": "AUPersonalInfo",
              "Status": "DONE",
              "PercentageCompletion": "100"
            });
          }
        }
        scopeObj.submitJSON.QuestionResponse = queryresponse;
        scopeObj.presenter.updateSubmittedLoanApplication(scopeObj.submitJSON, scopeObj.loanType);
      }
    },

    submitApplicantAdditionalIncome : function(queryresponse){
      var scopeObj = this ;
      var hasAdditionalIncomeInEdit = scopeObj.view.editApplicantDetails.editAdditionalIncome.imgRadioButtonYes.src === scopeObj.radio_selected;
      var value ;
      if(hasAdditionalIncomeInEdit) {
        var maxAllowedIncomes = 2 ;
        var typeOfIncome ;
        var grossIncome ;
        var payPeriod ;
        while(maxAllowedIncomes > 0) {
          typeOfIncome = scopeObj.view.editApplicantDetails.editAdditionalIncome["lstTypeOfIncome" + maxAllowedIncomes].selectedKeyValue ;
          if(typeOfIncome[1] !== kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select")) {
            queryresponse.push({"abstractName" : "AddIncome"+maxAllowedIncomes, "Value" : typeOfIncome[1] }) ;
            typeOfIncome  = typeOfIncome[1].replace("\/", "").replace(" ", "").toUpperCase() ;
            grossIncome = scopeObj.view.editApplicantDetails.editAdditionalIncome["txtGrossIncomeValue" + maxAllowedIncomes].text ;
            payPeriod = scopeObj.view.editApplicantDetails.editAdditionalIncome["lstPayPeriodValue" + maxAllowedIncomes].selectedKeyValue ;
            value = grossIncome.concat("###").concat(payPeriod[1]);
            queryresponse.push({"abstractName" : "AddIncome"+typeOfIncome, "Value" : value}) ;
            if(typeOfIncome[1].toUpperCase() === kony.i18n.getLocalizedString("i18n.frmTrackApplication.Other").toUpperCase()) {
              queryresponse.push({"abstractName" : "AddIncomeOtherDesc" , "Value" : scopeObj.view.editApplicantDetails.editAdditionalIncome["txtDescription" + maxAllowedIncomes].text}) ;
            }
          }
          maxAllowedIncomes-- ;
        }
      }
      value = hasAdditionalIncomeInEdit ? kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes") : kony.i18n.getLocalizedString("i18n.frmTrackApplication.No") ;
      queryresponse.push({ "abstractName" :"AddIncomeChallenge", "Value" : value , "OptionItem_id" : scopeObj.getKeyOfMasterData(value,scopeObj.listBoxMapper.AddIncomeChallenge) }) ;
    },

    submitEmploymentInformtation : function(queryresponse) {
      var scopeObj = this ;
      var employmentType = scopeObj.view.editApplicantDetails.editEmployementInfo.lstEmploymentStatusValue.selectedKeyValue[1].toUpperCase() ;
      var mapperType  ;
      switch (employmentType) {
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.FullTimeEmployed").toUpperCase() :  
          mapperType = scopeObj.fullTimeEmploymentMapper ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.PartTimeEmployed").toUpperCase() :  
          mapperType = scopeObj.partTimeEmploymentMapper;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.SelfEmployed").toUpperCase() :  
          mapperType = scopeObj.selfEmploymentMapper ;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Military").toUpperCase() :  
          mapperType = scopeObj.militaryEmploymentMapper;
          break ;
        case kony.i18n.getLocalizedString("i18n.frmTrackApplication.Other").toUpperCase() : 
          mapperType = scopeObj.otherEmploymentMapper ; 
          break ;
        default :
          break ;
      }
      if(mapperType) {
        var elem  ;
        var path ;
        var value ;
        for(var key in mapperType) {
          elem = undefined ;        
          path = mapperType[key][1] ; 
          for(var index in path) {
            elem = elem ? elem[path[index]] : scopeObj.view[path[index]] ;
          } 
          if(key === "PrevEmployerChallenge") {
            var hasPreviousEmpinEdit = scopeObj.view.editApplicantDetails.editEmployementInfo.imgRadioButton1.src === "radio_selected.png" ;
            value = hasPreviousEmpinEdit ? kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes") : kony.i18n.getLocalizedString("i18n.frmTrackApplication.No") ;
            queryresponse.push({"abstractName": key, "Value": value, "OptionItem_id" : scopeObj.getKeyOfMasterData(value,scopeObj.listBoxMapper[key]) }) ; 
          } else if(elem && elem.hasOwnProperty("src")){
            value = elem.src ;
          } else if(elem && elem.hasOwnProperty("masterData")){
            value = elem.selectedKeyValue ;
            if(value[1] !== kony.i18n.getLocalizedString("i18n.frmTrackApplication.Select"))   {
              queryresponse.push({"abstractName": key,  "Value": value[1], "OptionItem_id": value[0] }) ;      
            }   
          }else if(elem && elem.hasOwnProperty("text")) {
            queryresponse.push({"abstractName": key,  "Value": elem.text ? elem.text : ""  }) ;
          }
        }
      }
    },

    submitAuthorizedUser : function(queryresponse) {
      var scopeObj = this ;
      var hasAuthorizedUser = scopeObj.view.editAUDetails.imgRadioButton1.src === scopeObj.radio_selected;
      var value ;
      if(hasAuthorizedUser){
        var elem  ;
        var path ;
        for(var key in scopeObj.authorizeduserMapper) {
          elem = undefined ;        
          path = scopeObj.authorizeduserMapper[key][1] ; 
          for(var index in path) {
            elem = elem ? elem[path[index]] : scopeObj.view[path[index]] ;
          } 
          if(key === "AUChallenge") {
            // do not do anything - this key has to be saved irrespective of other authorizeduser yes or no
          } else if(elem && elem.hasOwnProperty("src")){
            value = elem.src ;
          } else if(elem && elem.hasOwnProperty("masterData")){
            value = elem.selectedKeyValue ;
            queryresponse.push({"abstractName": key,  "Value": value[1], "OptionItem_id": value[0] }) ;      
          }else if(elem && elem.hasOwnProperty("text")) {
            queryresponse.push({"abstractName": key,  "Value": elem.text ? elem.text : ""  }) ;
          }
        }
      }
      value = hasAuthorizedUser ? kony.i18n.getLocalizedString("i18n.frmTrackApplication.Yes") : kony.i18n.getLocalizedString("i18n.frmTrackApplication.No") ;
      queryresponse.push({"abstractName": "AUChallenge", "Value": value, "OptionItem_id" : scopeObj.getKeyOfMasterData(value,scopeObj.listBoxMapper.AUChallenge) }) ; 
      return hasAuthorizedUser ;
    },

    //isAddressNull Check Function
    isAddressNull : function(){
      var scopeObj=this;
      if(scopeObj.address1.text===""|| scopeObj.city.text===""||
         scopeObj.country.text===""|| scopeObj.state.text ==="" ||scopeObj.zip.text===""){
        scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.fillOutTheAddressToCheckUSPSValidation");
        scopeObj.lblvalidate.isVisible = false;
      } else {
        scopeObj.lblrecommendation.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.USPSRecommendation");
        scopeObj.lblvalidate.isVisible = true;
        scopeObj.lblvalidate.text = kony.i18n.getLocalizedString("i18n.frmAssistedOnboarding.Validate");
      }
      scopeObj.view.forceLayout();
    },
    //USPSMatch Chceck
    USPSMatch: function(result){
      var scopeObj = this ; 
      if(result.Address2.toLowerCase() === scopeObj.addressInput.Address1.toLowerCase()  && 
         result.City.toLowerCase() === scopeObj.addressInput.City.toLowerCase() &&
         result.State.toLowerCase() === scopeObj.addressInput.State.toLowerCase() &&
         result.Zip5.toLowerCase() === scopeObj.addressInput.Zip5.toLowerCase())
        return true;
      return false;
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
      if (sectionname === "address") {
        scopeObj.address1 = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine1Value;
        scopeObj.address2 = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine2Value;
        scopeObj.city = scopeObj.view.editApplicantDetails.editAddressInfo.txtCityValue;
        scopeObj.country = scopeObj.view.editApplicantDetails.editAddressInfo.txtCountryValue;
        scopeObj.state = scopeObj.view.editApplicantDetails.editAddressInfo.txtStateValue;
        scopeObj.zip = scopeObj.view.editApplicantDetails.editAddressInfo.txtZipCodeValue;
        scopeObj.lblrecommendation = scopeObj.view.editApplicantDetails.editAddressInfo.lblUspsRecommendation;
        scopeObj.lblvalidate = scopeObj.view.editApplicantDetails.editAddressInfo.flxValidate.lblValidate;
        scopeObj.flxvalidation = scopeObj.view.editApplicantDetails.editAddressInfo.flxAddressValidation;
        scopeObj.uspserror= scopeObj.view.editApplicantDetails.editAddressInfo.lblUspsRecommendationErrorIcon;
      } else if (sectionname === "prevaddress") {
        scopeObj.address1 = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine1Value2;
        scopeObj.address2 = scopeObj.view.editApplicantDetails.editAddressInfo.txtAddressLine2Value2;
        scopeObj.city = scopeObj.view.editApplicantDetails.editAddressInfo.txtCityValue2;
        scopeObj.country = scopeObj.view.editApplicantDetails.editAddressInfo.txtCountryValue2;
        scopeObj.state = scopeObj.view.editApplicantDetails.editAddressInfo.txtStateValue2;
        scopeObj.zip = scopeObj.view.editApplicantDetails.editAddressInfo.txtZipCodeValue2;
        scopeObj.lblrecommendation = scopeObj.view.editApplicantDetails.editAddressInfo.lblUspsRecommendation2;
        scopeObj.lblvalidate = scopeObj.view.editApplicantDetails.editAddressInfo.flxValidate2.lblValidate2;
        scopeObj.flxvalidation = scopeObj.view.editApplicantDetails.editAddressInfo.flxPrevAddressValidation;
        scopeObj.uspserror=scopeObj.view.editApplicantDetails.editAddressInfo.lblUspsRecommendationErrorIcon2;
      } else if (sectionname === "empaddress") {
        scopeObj.address1 = scopeObj.view.editApplicantDetails.editEmployementInfo.txtAddressLine1Value;
        scopeObj.address2 = scopeObj.view.editApplicantDetails.editEmployementInfo.txtAddressLine2Value;
        scopeObj.city = scopeObj.view.editApplicantDetails.editEmployementInfo.txtCityValue;
        scopeObj.country = scopeObj.view.editApplicantDetails.editEmployementInfo.txtCountryValue;
        scopeObj.state = scopeObj.view.editApplicantDetails.editEmployementInfo.txtStateValue;
        scopeObj.zip = scopeObj.view.editApplicantDetails.editEmployementInfo.txtZipCodeValue;
        scopeObj.lblrecommendation = scopeObj.view.editApplicantDetails.editEmployementInfo.lblUspsRecommendation;
        scopeObj.lblvalidate = scopeObj.view.editApplicantDetails.editEmployementInfo.flxValidate.lblValidate;
        scopeObj.flxvalidation = scopeObj.view.editApplicantDetails.editEmployementInfo.flxAddressValidation;
        scopeObj.uspserror=scopeObj.view.editApplicantDetails.editEmployementInfo.lblUspsRecommendationErrorIcon;
      } else if (sectionname === "prevempaddress") {
        scopeObj.address1 = scopeObj.view.editApplicantDetails.editEmployementInfo.txtAddressLine1ValuePrev;
        scopeObj.address2 = scopeObj.view.editApplicantDetails.editEmployementInfo.txtAddressLine2ValuePrev;
        scopeObj.city = scopeObj.view.editApplicantDetails.editEmployementInfo.txtCityValuePrev;
        scopeObj.country = scopeObj.view.editApplicantDetails.editEmployementInfo.txtCountryValuePrev;
        scopeObj.state = scopeObj.view.editApplicantDetails.editEmployementInfo.txtStateValuePrev;
        scopeObj.zip = scopeObj.view.editApplicantDetails.editEmployementInfo.txtZipCodeValuePrev;
        scopeObj.lblrecommendation = scopeObj.view.editApplicantDetails.editEmployementInfo.lblUspsRecommendationPrev;
        scopeObj.lblvalidate = scopeObj.view.editApplicantDetails.editEmployementInfo.flxValidatePrev.lblVallidatePrev;
        scopeObj.flxvalidation = scopeObj.view.editApplicantDetails.editEmployementInfo.flxAddressValidationPrev;
        scopeObj.uspserror=scopeObj.view.editApplicantDetails.editEmployementInfo.lblUspsRecommendationErrorIconPrev;
      }
      else if(sectionname==="auaddress"){
        scopeObj.address1 = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtAddressLine1Value;
        scopeObj.address2 = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtAddressLine2Value;
        scopeObj.city = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtCityValue;
        scopeObj.country = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtCountryValue;
        scopeObj.state = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtStateValue;
        scopeObj.zip = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.txtZipCodeValue;
        scopeObj.lblrecommendation = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblUspsRecommendation;
        scopeObj.lblvalidate = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblValidate;
        scopeObj.flxvalidation = scopeObj.view.editAUDetails.editAddressInfoAsPrevious.flxAddressValidation;
        scopeObj.uspserror=scopeObj.view.editAUDetails.editAddressInfoAsPrevious.lblUspsRecommendationErrorIcon;
      }
      scopeObj.uspserror.isVisible=false;
    },
    setAUAddressDetails : function() {
      var scopeObj=this;
      scopeObj.isAddressSameAsApplicant = scopeObj.view.viewAUDetails.viewAUAddressInfo.lblDurationValue.text;
      if(scopeObj.isAddressSameAsApplicant) {
        scopeObj.view.viewAUDetails.viewAUAddressInfo.lblAddressLine1Value.text = scopeObj.view.viewApplicantDetails.viewAddressInfo.lblAddressLine1Value.text;
        scopeObj.view.viewAUDetails.viewAUAddressInfo.lblAddressLine2Value.text = scopeObj.view.viewApplicantDetails.viewAddressInfo.lblAddressLine2Value.text;
        scopeObj.view.viewAUDetails.viewAUAddressInfo.lblCountryValue.text = scopeObj.view.viewApplicantDetails.viewAddressInfo.lblCountryValue.text;
        scopeObj.view.viewAUDetails.viewAUAddressInfo.lblStateValue.text = scopeObj.view.viewApplicantDetails.viewAddressInfo.lblStateValue.text;
        scopeObj.view.viewAUDetails.viewAUAddressInfo.lblCityValue.text = scopeObj.view.viewApplicantDetails.viewAddressInfo.lblCityValue.text;
        scopeObj.view.viewAUDetails.viewAUAddressInfo.lblZipCodeValue.text = scopeObj.view.viewApplicantDetails.viewAddressInfo.lblZipCodeValue.text;
        scopeObj.view.viewAUDetails.viewAUAddressInfo.flxOwnerShip.setVisibility(false);
        scopeObj.view.viewAUDetails.viewAUAddressInfo.flxDuration.setVisibility(false);
        scopeObj.view.viewAUDetails.viewAUAddressInfo.flxPreviousAddress.setVisibility(false);
      }
      scopeObj.view.viewAUDetails.viewAUAddressInfo.loansSectionHeader.lblSectionHeader.text = "Address Details";
    },

    deleteAUAndCoapplicantDetails : function() {
      var scopeObj = this ;
      if(scopeObj.view.flxViewLoanDetails.viewAUDetails) {
        scopeObj.view.flxViewLoanDetails.remove(scopeObj.view.flxViewLoanDetails.viewAUDetails);
      }
      if(scopeObj.view.flxViewLoanDetails.viewCoApplicantDetails) {
        scopeObj.view.flxViewLoanDetails.remove(scopeObj.view.flxViewLoanDetails.viewCoApplicantDetails) ;
      }
      if(scopeObj.view.flxEditLoanInformation1.editAUDetails) {
        scopeObj.view.flxEditLoanInformation1.remove(scopeObj.view.flxEditLoanInformation1.editAUDetails);
      }
      scopeObj.view.forceLayout();
    }

  } ;


});
kony = kony || {};
kony.dbx = kony.dbx || {};
kony.dbx.loans = kony.dbx.loans || {};
kony.dbx.loans.applicationScreenMapper = kony.dbx.loans.applicationWidgetMapper || {};

kony.dbx.loans.applicationScreenMapper.getMapping = function(QueryDefinition_id){
   if(QueryDefinition_id === "PERSONAL_APPLICATION"){
    return this.getMappingForPersonalLoanApplication();
  }
  if(QueryDefinition_id === "CREDIT_CARD_APPLICATION"){
    return this.getMappingForCreditCardApplication();
  }
  if(QueryDefinition_id === "VEHICLE_APPLICATION"){
    return this.getMappingForVehicleApplication();
  }
};
kony.dbx.loans.applicationScreenMapper.getMappingForPersonalLoanApplication = function(){
  return{
    "YourLoan" : {
      "screen" : "flxLoanInfo"
    },
    "PersonalInfo" : {
      "screen" : "flxPersonalInfo"
    },
    "Income" : {
      "screen" : "flxEmployment"
    },
    "CoAppPersonalInfo" : {
      "screen" : "flxPersonalInfoCoA"
    },
    "CoAppIncome" : {
      "screen" : "flxEmploymentCoA"
    },
    "Consent" : {
      "screen" : "flxConsent"
    }
  };
};

kony.dbx.loans.applicationScreenMapper.getMappingForCreditCardApplication = function(){
  return{
    "CardInfo" : {
      "screen" : "flxCardInfo"
    },
    "PersonalInfo" : {
      "screen" : "flxPersonalInfo"
    },
    "Income" : {
      "screen" : "flxEmployment"
    },
    "AUPersonalInfo" : {
      "screen" : "flxAuthorizedUser"
    },
    "Consent" : {
      "screen" : "flxConsentMainContainer"
    }
  };
};

kony.dbx.loans.applicationScreenMapper.getMappingForVehicleApplication = function(){
  return{
    "VehicleLoan" : {
      "screen" : "flxVehicleLoanInfo"
    },
    "PersonalInfo" : {
      "screen" : "flxPersonalInfo"
    },
    "Income" : {
      "screen" : "flxEmployment"
    },
    "CoAppPersonalInfo" : {
      "screen" : "flxPersonalInfoCoA"
    },
    "CoAppIncome" : {
      "screen" : "flxEmploymentCoA"
    },
    "Consent" : {
      "screen" : "flxConsent"
    }
  };
};
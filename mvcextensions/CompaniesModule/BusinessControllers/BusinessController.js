define([], function () { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
    function BusinessController() { 

        kony.mvc.Business.Controller.call(this); 

    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Controller); 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    BusinessController.prototype.initializeBusinessController = function() { 

    }; 
  
    BusinessController.prototype.getAddressSuggestion=function(context,OnSucess,onError){
       kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServerManagementManager").businessController.getAddressSuggestion(context, OnSucess, onError);
    };

    BusinessController.prototype.getPlaceDetails=function(context,OnSucess,onError){
       kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServerManagementManager").businessController.getPlaceDetails(context, OnSucess, onError);
    };

  /**
     * @name fetchCountryList
     * @param {} context
     * @param (response:[{Code : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchCountryList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCountryList(context, onSuccess, onError);
  };


  /**
     * @name fetchRegionList
     * @param {} context
     * @param (response:[{Code : string, Country_id : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchRegionList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchRegionList(context, onSuccess, onError);
  };
  


  /**
     * @name fetchCityList
     * @param {} context
     * @param (response:[{Country_id : string, id : string, Name : string, Region_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchCityList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCityList(context, onSuccess, onError);
  };

  /**
     * @name creates company
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.createCompany = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.createCompany(context, onSuccess, onError);
  };
  /**
     * @name edit company
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.editCompany = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.editCompany(context, onSuccess, onError);
  };
  /**
     * @name fetch accounts for create company
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getAllAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getAllAccounts(context, onSuccess, onError);
  };
   /**
     * @name fetch contract details
     * @param {"contractId" : id} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    BusinessController.prototype.getContractDetails = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ContractManagementManager").businessController.getContractDetails(context, onSuccess, onError);
  };
  /**
     * @name fetch contract features and limits
     * @param {"contractId" : id} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    BusinessController.prototype.getContractFeatureActionLimits = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ContractManagementManager").businessController.getContractFeatureActionLimits(context, onSuccess, onError);
  };
  /**
     * @name fetch contract Signatories users
     * @param {"contractId" : id} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    BusinessController.prototype.getContractInfinityUsers = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ContractManagementManager").businessController.getContractInfinityUsers(context, onSuccess, onError);
  };
  /**
     * @name fetch company basic details
     * @param {"organizationId" : id} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */  
  BusinessController.prototype.getCompanyDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCompanyDetails(context, onSuccess, onError);
  };
  /**
     * @name fetch company accounts
     * @param {"organizationId" : id} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */  
  BusinessController.prototype.getCompanyAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCompanyAccounts(context, onSuccess, onError);
  };
  /**
     * @name fetch company customers
     * @param {"organizationId" : id} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */  
  BusinessController.prototype.getCompanyCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCompanyCustomers(context, onSuccess, onError);
  };
  
    /* @name validateTin
     * @param {tin:"123"} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.validateTIN = function(context, onSuccess, onError){
   kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.validateTIN(context, onSuccess, onError);
  };
  
  /* @name get Companies Search
     * @param {"Name":"abcd","Email":"abcdefgh@kony.com"} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getCompaniesSearch = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCompanyDetails(context, onSuccess, onError);
  };
  /* @name unlink accounts
     * @param 
     */
  BusinessController.prototype.unlinkAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.unlinkAccounts(context, onSuccess, onError);
  };
  /* @name getListOfCompanyByStatus
   * @param {"statusId":"SID_ORG_PENDING"} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
    */
  BusinessController.prototype.getListOfCompanyByStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getListOfCompanyByStatus(context, onSuccess, onError);
  };
  /* @name getListOfContractsByStatus
  * @param {"statusId":"SID_ORG_PENDING"} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  BusinessController.prototype.getListOfContractsByStatus = function(context, onSuccess, onError){
  kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager().getModule("BusinessBankingManager")
    .businessController.getListOfContractsByStatus(context, onSuccess, onError);
  };
  /* @name updateCompanyStatusToRejected
     * @param {"organizationId":"1","reason" :""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.updateCompanyStatusToRejected = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.updateCompanyStatusToRejected(context, onSuccess, onError);
  };
    /* @name updateCompanyStatusToAcive
     * @param {"organizationId":"1"} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.updateCompanyStatusToActive = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.updateCompanyStatusToActive(context, onSuccess, onError);
  };
  
  BusinessController.prototype.updateContractStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.updateContractStatus(context, onSuccess, onError);
  };
  
  BusinessController.prototype.fetchBusinessConfigurations = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getBusinessConfigurations({}, onSuccess, onError);
  };

  /**
     * @name getCustomerTransactions
     * @member CustomerManagementModule.businessController
     * @param {AccountNumber : string, StartDate : string, EndDate : string} context
     * @param (response:{Status : string, Transactions : [{amount : object, fromAccountNumber : object, toAccountType : object, fromAccountName : object, fromNickName : object, hasDepositImage : object, description : object, scheduledDate : object, isScheduled : object, transactionDate : object, transactionId : object, transactiontype : object, fromAccountType : object, toAccountName : object, statusDescription : object, fromAccountBalance : object, transactionsNotes : object, toAccountNumber : object, frequencyType : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    BusinessController.prototype.getCustomerTransactions = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getCustomerTransactions(context, onSuccess, onError);
    };
  	BusinessController.prototype.getAllFeatures  = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getAllFeaturesAndActions(context, onSuccess, onError);
    };
    BusinessController.prototype.getMonetaryActions  = function(context, onSuccess, onError){
		kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getMonetaryActions(context, onSuccess, onError);
    }; 
    BusinessController.prototype.getCompanyFeaturesActionsLimits = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getCompanyActionLimits(context, onSuccess, onError);
    };
    BusinessController.prototype.suspendFeature = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.suspendFeature(context, onSuccess, onError);
    };  
    /* @name get company approval matrix
     * @param 
     */
    BusinessController.prototype.getCompanyApprovalLimits = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getCompanyApprovalLimits(context, onSuccess, onError);
    };
    /* @name getMembershipDetails
     * @param: {"Membership_id": ""}
     */
    BusinessController.prototype.getMembershipDetails = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getMembershipDetails(context, onSuccess, onError);
    };
   BusinessController.prototype.createBusinessType = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.createBusinessType(context, onSuccess, onError);
    };
   BusinessController.prototype.getBusinessTypes = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getBusinessTypes(context, onSuccess, onError);
    };
   BusinessController.prototype.deleteBusinessType = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.deleteBusinessType(context, onSuccess, onError);
    };
   BusinessController.prototype.updateBusinessType = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.updateBusinessType(context, onSuccess, onError);
    };
   BusinessController.prototype.getBusinessTypeGroups = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getBusinessTypeGroups(context, onSuccess, onError);
    };
   BusinessController.prototype.getCoreTypeInformation = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ConfigurationsManager")
        .businessController.getCoreTypeInformation(context, onSuccess, onError);
    };
    BusinessController.prototype.getCompanySignatories = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getCompanySignatories(context, onSuccess, onError);
    };
    /* @name get Core customers Search
     * @param {"id":"",name":"abcd","Email":"abcdefgh@kony.com",...} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.searchCoreCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.searchCoreCustomers(context, onSuccess, onError);
  };
  /* @name search contract id
     * @param {"id":"",name":"abcd","Email":"abcdefgh@kony.com",...} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    BusinessController.prototype.getSearchContract = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ContractManagementManager").businessController.getSearchContract(context, onSuccess, onError);
  };
  /* @name get Core related customers 
     * @param {"id":""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getCoreRelativeCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getCoreRelativeCustomers(context, onSuccess, onError);
  };
  /* @name get service definition 
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getServiceDefinition = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getServiceDefinitions(context, onSuccess, onError);
  };
   /* @name get service definition based features,actions,limits
     * @param {"servicedefinitionId":""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getFeaturesAndActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getFeaturesAndActions(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionProductIdPermissions
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getServiceDefinitionProductIdPermissions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionProductIdPermissions(context, onSuccess, onError);
  };
    /* @name get service definition based features,actions,limits with dependency actions
     * @param {"servicedefinitionId":""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getServiceDefinitionFeaturesAndLimits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionFeaturesAndLimits(context, onSuccess, onError);
  };
  /* @name get Core related customers accounts
     * @param {"coreCustomerIdList":""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getCoreCustomerAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getCoreCustomerAccounts(context, onSuccess, onError);
  };
   /* @name getContractAccounts
   * @param {"contractId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getContractAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getContractAccounts(context, onSuccess, onError);
  };
  /* @name createContract
     * @param {
    "contractName": "Kony Global1311","serviceDefinitionName": "Business Banking","serviceDefinitionId": "1234","faxId": "abcd","communication": "[\r\n        {\r\n            \"phoneNumber\": \"7659995680\",\r\n            \"phoneCountryCode\": \"+91\",\r\n            \"email\": \"harikrishna.gande@temenos.com\"\r\n        }\r\n    ]","address": "[\r\n        {\r\n            \"country\": \"United States\",\r\n            \"cityName\": \"Dallas\",\r\n            \"state\": \"Texas\",\r\n            \"zipCode\": \"75230\",\r\n            \"addressLine1\": \"7777 Forest Lane, Dallas, TX, USA\",\r\n            \"addressLine2\": \"\"\r\n        }\r\n    ]","contractCustomers": "[\r\n    {\r\n        \"isPrimary\": \"true\",\r\n        \"coreCustomerId\": \"2020131101\",\r\n        \"coreCustomerName\": \"Kony India Pvt LTD\",\r\n        \"isBusiness\":\"true\",\r\n        \"accounts\": [\r\n            {\r\n                \"accountId\": \"202013110101\",\r\n                \"accountType\": \"Savings\",\r\n                \"accountName\": \"Reward Savings\",\r\n                \"typeId\": \"1\",\r\n                \"ownerType\": \"hari\"\r\n            },\r\n            {\r\n                \"accountId\": \"202013110102\",\r\n                \"accountType\": \"Checkings\",\r\n                \"accountName\": \"Checkings\",\r\n                \"typeId\": \"2\",\r\n                \"ownerType\": \"hari\"\r\n            }\r\n        ],\r\n        \"features\": [\r\n            {\r\n                \"featureId\": \"ACH_PAYMENT\",\r\n                \"featureName\": \"Domestic Wire Transfer\",\r\n                \"featureDescription\": \"Wire Transfers within the country\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_UPDATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\"\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                \"featureId\": \"BILL_PAY\",\r\n                \"featureName\": \"Bill Payment Service\",\r\n                \"featureDescription\": \"Pay your bills instantly\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"BILL_PAY_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \".00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"100.00\"\r\n                            }\r\n                        ]\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"coreCustomerId\": \"2020131102\",\r\n        \"coreCustomerName\": \"Kony India Pvt LTD\",\r\n        \"isBusiness\":\"true\",\r\n        \"accounts\": [\r\n            {\r\n                \"accountId\": \"202013110201\",\r\n                \"accountType\": \"Savings\",\r\n                \"accountName\": \"Reward Savings\",\r\n                \"typeId\": \"1\",\r\n                \"ownerType\": \"hari\"\r\n            },\r\n            {\r\n                \"accountId\": \"202013110202\",\r\n                \"accountType\": \"Checkings\",\r\n                \"accountName\": \"Checkings\",\r\n                \"typeId\": \"2\",\r\n                \"ownerType\": \"hari\"\r\n            }\r\n        ],\r\n        \"features\": [\r\n            {\r\n                \"featureId\": \"ACH_PAYMENT\",\r\n                \"featureName\": \"Domestic Wire Transfer\",\r\n                \"featureDescription\": \"Wire Transfers within the country\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_UPDATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\"\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                \"featureId\": \"BILL_PAY\",\r\n                \"featureName\": \"Bill Payment Service\",\r\n                \"featureDescription\": \"Pay your bills instantly\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"BILL_PAY_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \".00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"100.00\"\r\n                            }\r\n                        ]\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    }\r\n]"
} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.createContract = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.createContract(context, onSuccess, onError);
  };
    /* @name editContract
     * @param {
    "contractName": "Kony Global1311","serviceDefinitionName": "Business Banking","serviceDefinitionId": "1234","faxId": "abcd","communication": "[\r\n        {\r\n            \"phoneNumber\": \"7659995680\",\r\n            \"phoneCountryCode\": \"+91\",\r\n            \"email\": \"harikrishna.gande@temenos.com\"\r\n        }\r\n    ]","address": "[\r\n        {\r\n            \"country\": \"United States\",\r\n            \"cityName\": \"Dallas\",\r\n            \"state\": \"Texas\",\r\n            \"zipCode\": \"75230\",\r\n            \"addressLine1\": \"7777 Forest Lane, Dallas, TX, USA\",\r\n            \"addressLine2\": \"\"\r\n        }\r\n    ]","contractCustomers": "[\r\n    {\r\n        \"isPrimary\": \"true\",\r\n        \"coreCustomerId\": \"2020131101\",\r\n        \"coreCustomerName\": \"Kony India Pvt LTD\",\r\n        \"isBusiness\":\"true\",\r\n        \"accounts\": [\r\n            {\r\n                \"accountId\": \"202013110101\",\r\n                \"accountType\": \"Savings\",\r\n                \"accountName\": \"Reward Savings\",\r\n                \"typeId\": \"1\",\r\n                \"ownerType\": \"hari\"\r\n            },\r\n            {\r\n                \"accountId\": \"202013110102\",\r\n                \"accountType\": \"Checkings\",\r\n                \"accountName\": \"Checkings\",\r\n                \"typeId\": \"2\",\r\n                \"ownerType\": \"hari\"\r\n            }\r\n        ],\r\n        \"features\": [\r\n            {\r\n                \"featureId\": \"ACH_PAYMENT\",\r\n                \"featureName\": \"Domestic Wire Transfer\",\r\n                \"featureDescription\": \"Wire Transfers within the country\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_UPDATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\"\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                \"featureId\": \"BILL_PAY\",\r\n                \"featureName\": \"Bill Payment Service\",\r\n                \"featureDescription\": \"Pay your bills instantly\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"BILL_PAY_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \".00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"100.00\"\r\n                            }\r\n                        ]\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n    {\r\n        \"coreCustomerId\": \"2020131102\",\r\n        \"coreCustomerName\": \"Kony India Pvt LTD\",\r\n        \"isBusiness\":\"true\",\r\n        \"accounts\": [\r\n            {\r\n                \"accountId\": \"202013110201\",\r\n                \"accountType\": \"Savings\",\r\n                \"accountName\": \"Reward Savings\",\r\n                \"typeId\": \"1\",\r\n                \"ownerType\": \"hari\"\r\n            },\r\n            {\r\n                \"accountId\": \"202013110202\",\r\n                \"accountType\": \"Checkings\",\r\n                \"accountName\": \"Checkings\",\r\n                \"typeId\": \"2\",\r\n                \"ownerType\": \"hari\"\r\n            }\r\n        ],\r\n        \"features\": [\r\n            {\r\n                \"featureId\": \"ACH_PAYMENT\",\r\n                \"featureName\": \"Domestic Wire Transfer\",\r\n                \"featureDescription\": \"Wire Transfers within the country\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"0.00\"\r\n                            }\r\n                        ]\r\n                    },\r\n                    {\r\n                        \"actionId\": \"ACH_PAYMENT_UPDATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\"\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                \"featureId\": \"BILL_PAY\",\r\n                \"featureName\": \"Bill Payment Service\",\r\n                \"featureDescription\": \"Pay your bills instantly\",\r\n                \"actions\": [\r\n                    {\r\n                        \"actionId\": \"BILL_PAY_CREATE\",\r\n                        \"actionDescription\": \"Automated Clearing House Payment Service\",\r\n                        \"actionName\": \"Automated Clearing House Payment Service\",\r\n                        \"isAllowed\": \"true\",\r\n                        \"limits\": [\r\n                            {\r\n                                \"id\": \"PER_TRANSACTION_LIMIT\",\r\n                                \"value\": \".00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"WEEKLY_LIMIT\",\r\n                                \"value\": \"1000.00\"\r\n                            },\r\n                            {\r\n                                \"id\": \"DAILY_LIMIT\",\r\n                                \"value\": \"100.00\"\r\n                            }\r\n                        ]\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    }\r\n]"
} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.editContract = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.editContract(context, onSuccess, onError);
  };
  /* @name get Configurations
     * @param {"bundle_name" : "","config_key": ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getConfigurations = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getConfigurations(context, onSuccess, onError);
  };
  BusinessController.prototype.getAllEligibleRelationalCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAllEligibleRelationalCustomers(context, onSuccess, onError);
  };
  BusinessController.prototype.customerSearch = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.searchCustomers(context, onSuccess, onError);
  };
  BusinessController.prototype.getCoreCustomerRoleFeatureActionLimits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCoreCustomerRoleFeatureActionLimits(context, onSuccess, onError);
  };
    /* @name getCoreCustomerProductRolesFeatureActionLimits
  * @param {"coreCustomerRoleIdList":"[{"coreCustomerId":"","productsList":[{"accountId":"","productId":"","arrangementRoleId":""}],"serviceDefinitionId":"","roleId":""}]"} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  BusinessController.prototype.getCoreCustomerProductRolesFeatureActionLimits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCoreCustomerProductRolesFeatureActionLimits(context, onSuccess, onError);
  };
  BusinessController.prototype.createInfinityUser = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.createInfinityUser(context, onSuccess, onError);
  };
  BusinessController.prototype.editInfinityUser = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.editInfinityUser(context, onSuccess, onError);
  };
  BusinessController.prototype.getCoreCustomerDetails = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ContractManagementManager").businessController.getCoreCustomerDetails(context, onSuccess, onError);
  };
  /* @name get all signatory groups
     * @param {"contractId" : ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getAllSignatoryGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.getAllSignatoryGroups(context, onSuccess, onError);
  };
  /* @name get all signatory groups
     * @param {"contractId" : ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getSignatoryGroupDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.getSignatoryGroupDetails(context, onSuccess, onError);
  };
   //deleteViewSignatoryGroup
  BusinessController.prototype.updateSignatoryGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.updateSignatoryGroups(context, onSuccess, onError);
  };
  BusinessController.prototype.isSignatoryGroupEligibleForDelete = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.isSignatoryGroupEligibleForDelete(context, onSuccess, onError);
  };
  BusinessController.prototype.deleteSignatoryGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.deleteSignatoryGroup(context, onSuccess, onError);
  };
  
   BusinessController.prototype.getAllSignatoryGroupsbyCoreCustomerIds = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.getAllSignatoryGroupsbyCoreCustomerIds(context, onSuccess, onError);
  };
   /* @name get all No Group Users
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getNoGroupUsers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.getNoGroupUsers(context, onSuccess, onError);
  };
   /* @name get all approval Permissions for a User
     * @param {"userName" : ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getApprovalPermissionsForUser = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.getApprovalPermissionsForUser(context, onSuccess, onError);
  };
     /* @name create signatory group
     * @param {"userName" : ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.createSignatoryGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.createSignatoryGroup(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionRoles
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getServiceDefinitionRoles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionRoles(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionsForContracts
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getServiceDefinitionsForContracts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionsForContracts(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionMonetaryActions
   * @param {"serviceDefinitionId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getServiceDefinitionMonetaryActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionMonetaryActions(context, onSuccess, onError);
  };
  /****** APPROVAL MATRIX *****/
  
  /* @name getApprovalMatrix
   * @param {"contractId":"","cifId": ""}  context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getApprovalMatrix = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.getApprovalMatrix(context, onSuccess, onError);
  };
  /* @name getApprovalMatrixByContractId
   * @param {"contractId": ""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getApprovalMatrixByContractId = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.getApprovalMatrixByContractId(context, onSuccess, onError);
  };
  /* @name getApprovalRules
   * @param {"contractId":"","cifId": "","accountId": "","featureId": "","actionId":"","limitTypeId": ""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getApprovalRules = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.getApprovalRules(context, onSuccess, onError);
  };
  /* @name getApproversInSignatoryGroup
   * @param {"signatoryGroupId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getApproversInSignatoryGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.getApproversInSignatoryGroup(context, onSuccess, onError);
  };
  /* @name createApprovalRuleUserLevel
   * @param context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.createApprovalRuleUserLevel = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.createApprovalRuleUserLevel(context, onSuccess, onError);
  };
  /* @name createApprovalRuleSGLevel
   * @param context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.createApprovalRuleSGLevel = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.createApprovalRuleSGLevel(context, onSuccess, onError);
  };
  /* @name updateApprovalRuleUserLevel
   * @param context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.updateApprovalRuleUserLevel = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.updateApprovalRuleUserLevel(context, onSuccess, onError);
  };
  /* @name updateApprovalRuleSGLevel
   * @param context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.updateApprovalRuleSGLevel = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.updateApprovalRuleSGLevel(context, onSuccess, onError);
  };
  /* @name updateApprovalMode
   * @param {"coreCustomerId": "","contractId": "","isGroupLevel":"1"}
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.updateApprovalMode = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.updateApprovalMode(context, onSuccess, onError);
  };
  /* @name isApprovalMatrixDisabled
   * @param {"contractId": "","cif": ""}
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.isApprovalMatrixDisabled = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.isApprovalMatrixDisabled(context, onSuccess, onError);
  };
  /* @name updateApprovalMatrixStatus
   * @param {"contractId": "","cif": "","disable": "true"}
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.updateApprovalMatrixStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.updateApprovalMatrixStatus(context, onSuccess, onError);
  };
  /* @name getAccountActionCustomerApproverList
   * @param {"contractId": "","cif": "","accountId": "","actionId":""}
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getAccountActionCustomerApproverList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalMatrixManageManager")
      .businessController.getAccountActionCustomerApproverList(context, onSuccess, onError);
  };
  /****** APPROVAL MATRIX - end *****/
    BusinessController.prototype.UserIdSearchOperationDetailedData = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.UserIdSearchOperationDetailedData(context, onSuccess, onError);
  };
  /**
     * @name getCustomerContact
     * @member CustomerManagementModule.businessController
     * @param {Customer_id : string} context
     * @param (response:{Status : string, Addresses : [{RegionCode : object, CountryName : object, City_id : object, Region_id : object, ZipCode : object, Address_id : object, Country_id : object, CityName : object, CustomerId : object, AddressLine2 : object, AddressLine1 : object, RegionName : object, isPrimary : object, CountryCode : object, AddressType : object, AddressId : object}], EmailIds : [{lastmodifiedts : object, Description : object, createdts : object, softdeleteflag : object, Extension : object, createdby : object, isPrimary : object, Customer_id : object, Value : object, modifiedby : object, id : object, synctimestamp : object, Type_id : object}], ContactNumbers : [{lastmodifiedts : object, Description : object, createdts : object, softdeleteflag : object, Extension : object, createdby : object, isPrimary : object, Customer_id : object, Value : object, modifiedby : object, id : object, synctimestamp : object, Type_id : object}], opstatus : number, httpStatusCode : number, PreferredTime&Method : {PreferredContactTime : string, PreferredContactMethod : string}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getCustomerContact = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getContactInfo(context, onSuccess, onError);
  };
  /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	BusinessController.prototype.execute = function(command) { 

		kony.mvc.Business.Controller.prototype.execute.call(this, command);

	};

    return BusinessController;

});

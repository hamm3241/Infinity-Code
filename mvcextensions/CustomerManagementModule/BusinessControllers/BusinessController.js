define([],function () {

  function CustomerManagementModule_BusinessController(){
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(CustomerManagementModule_BusinessController, kony.mvc.Business.Delegator);

  CustomerManagementModule_BusinessController.prototype.initializeBusinessController = function(){
  };

  /**
     * @name getCustomerRequestAndNotificationCount
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string} context
     * @param (response:{requestCount : string, notificationCount : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerRequestAndNotificationCount = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CardManagementManager")
      .businessController.getCustomerRequestAndNotificationCount(context, onSuccess, onError);
  };
   CustomerManagementModule_BusinessController.prototype.CSRAssistCustomerOnboarding = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistCustomerOnboarding(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.GetCustomerApplications = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.GetCustomerApplications(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.checkProspectStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.checkProspectStatus(context, onSuccess, onError);
  };
   CustomerManagementModule_BusinessController.prototype.CSRAssistCustomerOnboardingResumeApp = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistCustomerOnboardingResumeApp(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.CSRAssistCustomerOnboardingNewApp = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistCustomerOnboardingNewApp(context, onSuccess, onError);
  };
   CustomerManagementModule_BusinessController.prototype.CSRAssistProspectOnboardingResumeApp = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistProspectOnboardingResumeApp(context, onSuccess, onError);
  };

  /**
     * @name searchCustomers
     * @member CustomerManagementModule.businessController
     * @param {_searchType : string, _id : null, _name : string, _username : null, _phone : null, _email : null, _group : null, _requestID : null, _SSN : null, _pageOffset : string, _pageSize : number, _sortVariable : string, _sortDirection : string} context
     * @param (response:{statuscode : number, Status : string, SortVariable : string, SortDirection : string, PageSize : number, records : [{PrimaryEmailAddress : object, Username : object, FirstName : object, PrimaryPhoneNumber : object, name : object, Gender : object, id : object, LastName : object, MiddleName : object, Salutation : object, Ssn : object, requestids : object}], opstatus : number, TotalResultsFound : number, PageOffset : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.searchCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.searchCustomers(context, onSuccess, onError);
  };
   CustomerManagementModule_BusinessController.prototype.CustomerLegalEntitiesGetOperation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CustomerLegalEntitiesGetOperation(context, onSuccess, onError);
  };
  
CustomerManagementModule_BusinessController.prototype.logs_enrolledCustomerSearch = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.logs_enrolledCustomerSearch(context, onSuccess, onError);
  };
  /**
     * @name getBasicInfo
     * @member CustomerManagementModule.businessController
     * @param {Customer_username : string} context
     * @param (response:{customerbasicinfo_view : {Branch_id : string, CustomerStatus_name : string, Gender : string, IsEnrolledForOlb : string, Salutation : string, Branch_code : string, Name : string, IsStaffMember : string, EmployementStatus_name : string, MaritalStatus_name : string, Branch_name : string, MaritalStatus_id : string, DateOfBirth : string, IsAssistConsented : string, EmployementStatus_id : string, FirstName : string, IsOlbAllowed : string, MiddleName : string, SpouseName : string, SSN : string, CustomerStatus_id : string, Username : string, Customer_id : string, CustomerSince : string, LastName : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getBasicInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getBasicInfo(context, onSuccess, onError);
  };

  /**
     * @name getContactInfo
     * @member CustomerManagementModule.businessController
     * @param {Customer_id : string} context
     * @param (response:{Status : string, Addresses : [{RegionCode : object, CountryName : object, City_id : object, Region_id : object, ZipCode : object, Address_id : object, Country_id : object, CityName : object, CustomerId : object, AddressLine2 : object, AddressLine1 : object, RegionName : object, isPrimary : object, CountryCode : object, AddressType : object, AddressId : object}], EmailIds : [{lastmodifiedts : object, Description : object, createdts : object, softdeleteflag : object, Extension : object, createdby : object, isPrimary : object, Customer_id : object, Value : object, modifiedby : object, id : object, synctimestamp : object, Type_id : object}], ContactNumbers : [{lastmodifiedts : object, Description : object, createdts : object, softdeleteflag : object, Extension : object, createdby : object, isPrimary : object, Customer_id : object, Value : object, modifiedby : object, id : object, synctimestamp : object, Type_id : object}], opstatus : number, httpStatusCode : number, PreferredTime&Method : {PreferredContactTime : string, PreferredContactMethod : string}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getContactInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getContactInfo(context, onSuccess, onError);
  };
  
  CustomerManagementModule_BusinessController.prototype.sendActivationCode = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.sendActivationCode(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getAddressTypes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAddressTypes(context, onSuccess, onError);
  };

  /**
     * @name getCustomerNotes
     * @member CustomerManagementModule.businessController
     * @param {$filter : string, $orderby : string} context
     * @param (response:{customernotes_view : [{InternalUser_id : object, createdts : object, Customer_Username : object, softdeleteflag : object, InternalUser_Email : object, Customer_LastName : object, Customer_Status_id : object, Customer_MiddleName : object, InternalUser_LastName : object, Customer_id : object, Note : object, Customer_FirstName : object, InternalUser_MiddleName : object, InternalUser_Username : object, InternalUser_FirstName : object, id : object, synctimestamp : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerNotes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerNotes(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getApplicantNotes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getApplicantNotes(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getAccountSpecificAlerts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAccountSpecificAlerts(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.USPSValidation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ServerManagementManager")
      .businessController.USPSAddressValidation(context, onSuccess, onError);
  };
  /**
     * @name getCustomerAccounts
     * @member CustomerManagementModule.businessController
     * @param {CustomerUsername : string} context
     * @param (response:{Status : string, opstatus : number, Accounts : [{lastDividendPaidDate : object, supportBillPay : object, bondInterestLastYear : object, dueDate : object, dividendLastPaidDate : object, availablePoints : object, interestPaidLastYear : object, maturityOption : object, accountID : object, unpaidInterest : object, accountHolder : object, maturityAmount : object, principalValue : object, principalBalance : object, maturityDate : object, creditLimit : object, supportTransferTo : object, outstandingBalance : object, regularPaymentAmount : object, pendingWithdrawal : object, availableCredit : object, nickName : object, currentBalance : object, accountType : object, bsbNum : object, eStatementEmail : object, dividendRate : object, payoffAmount : object, paymentDue : object, minimumDue : object, previousYearsDividends : object, creditCardNumber : object, interestEarned : object, paymentMethod : object, transactionLimit : object, supportTransferFrom : object, lateFeesDue : object, paymentTerm : object, interestPaidPreviousYTD : object, bondInterest : object, dividendPaidYTD : object, accountName : object, favouriteStatus : object, dividendLastPaidAmount : object, swiftCode : object, bankName : object, supportDeposit : object, eStatementEnable : object, availableBalance : object, totalDebitsMonth : object, isPFM : object, supportCardlessCash : object, totalCreditMonths : object, lastPaymentDate : object, lastPaymentAmount : object, dividendYTD : object, openingDate : object, payOffCharge : object, interestRate : object, pendingDeposit : object, statusDesc : object, currentAmountDue : object, previousYearDividend : object, lastDividendPaidAmount : object, routingNumber : object, transferLimit : object, lastStatementBalance : object, originalAmount : object, interestPaidYTD : object, currencyCode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerAccounts(context, onSuccess, onError);
  };
  /**
     * @name getInfinityUserAccounts
     * @member CustomerManagementModule.businessController
     * @param {CustomerUsername : string} context
     * @param (response:{Status : string, opstatus : number, Accounts : [{lastDividendPaidDate : object, supportBillPay : object, bondInterestLastYear : object, dueDate : object, dividendLastPaidDate : object, availablePoints : object, interestPaidLastYear : object, maturityOption : object, accountID : object, unpaidInterest : object, accountHolder : object, maturityAmount : object, principalValue : object, principalBalance : object, maturityDate : object, creditLimit : object, supportTransferTo : object, outstandingBalance : object, regularPaymentAmount : object, pendingWithdrawal : object, availableCredit : object, nickName : object, currentBalance : object, accountType : object, bsbNum : object, eStatementEmail : object, dividendRate : object, payoffAmount : object, paymentDue : object, minimumDue : object, previousYearsDividends : object, creditCardNumber : object, interestEarned : object, paymentMethod : object, transactionLimit : object, supportTransferFrom : object, lateFeesDue : object, paymentTerm : object, interestPaidPreviousYTD : object, bondInterest : object, dividendPaidYTD : object, accountName : object, favouriteStatus : object, dividendLastPaidAmount : object, swiftCode : object, bankName : object, supportDeposit : object, eStatementEnable : object, availableBalance : object, totalDebitsMonth : object, isPFM : object, supportCardlessCash : object, totalCreditMonths : object, lastPaymentDate : object, lastPaymentAmount : object, dividendYTD : object, openingDate : object, payOffCharge : object, interestRate : object, pendingDeposit : object, statusDesc : object, currentAmountDue : object, previousYearDividend : object, lastDividendPaidAmount : object, routingNumber : object, transferLimit : object, lastStatementBalance : object, originalAmount : object, interestPaidYTD : object, currencyCode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getInfinityUserAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getInfinityUserAccounts(context, onSuccess, onError);
  };
  /**
     * @name getInfinityUserContractDetails
     * @member CustomerManagementModule.businessController
     * @param {CustomerUsername : string} context
     * @param (response:{Status : string, opstatus : number, Accounts : [{lastDividendPaidDate : object, supportBillPay : object, bondInterestLastYear : object, dueDate : object, dividendLastPaidDate : object, availablePoints : object, interestPaidLastYear : object, maturityOption : object, accountID : object, unpaidInterest : object, accountHolder : object, maturityAmount : object, principalValue : object, principalBalance : object, maturityDate : object, creditLimit : object, supportTransferTo : object, outstandingBalance : object, regularPaymentAmount : object, pendingWithdrawal : object, availableCredit : object, nickName : object, currentBalance : object, accountType : object, bsbNum : object, eStatementEmail : object, dividendRate : object, payoffAmount : object, paymentDue : object, minimumDue : object, previousYearsDividends : object, creditCardNumber : object, interestEarned : object, paymentMethod : object, transactionLimit : object, supportTransferFrom : object, lateFeesDue : object, paymentTerm : object, interestPaidPreviousYTD : object, bondInterest : object, dividendPaidYTD : object, accountName : object, favouriteStatus : object, dividendLastPaidAmount : object, swiftCode : object, bankName : object, supportDeposit : object, eStatementEnable : object, availableBalance : object, totalDebitsMonth : object, isPFM : object, supportCardlessCash : object, totalCreditMonths : object, lastPaymentDate : object, lastPaymentAmount : object, dividendYTD : object, openingDate : object, payOffCharge : object, interestRate : object, pendingDeposit : object, statusDesc : object, currentAmountDue : object, previousYearDividend : object, lastDividendPaidAmount : object, routingNumber : object, transferLimit : object, lastStatementBalance : object, originalAmount : object, interestPaidYTD : object, currencyCode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getInfinityUserContractDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getInfinityUserContractDetails(context, onSuccess, onError);
  };

  /**
     * @name getCustomerTransactions
     * @member CustomerManagementModule.businessController
     * @param {AccountNumber : string, StartDate : string, EndDate : string} context
     * @param (response:{Status : string, Transactions : [{amount : object, fromAccountNumber : object, toAccountType : object, fromAccountName : object, fromNickName : object, hasDepositImage : object, description : object, scheduledDate : object, isScheduled : object, transactionDate : object, transactionId : object, transactiontype : object, fromAccountType : object, toAccountName : object, statusDescription : object, fromAccountBalance : object, transactionsNotes : object, toAccountNumber : object, frequencyType : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerTransactions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerTransactions(context, onSuccess, onError);
  };

  /**
     * @name getCustomerGroups
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (response:{opstatus : number, httpStatusCode : string, customergroupinfo_view : [{Group_id : object, Group_synctimestamp : object, Customer_id : object, Group_createdby : object, Group_name : object, Group_lastmodifiedts : object, Group_Desc : object, GroupStatus_id : object, Group_createdts : object, GroupStatus_name : object}], httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerGroups(context, onSuccess, onError);
  };

  /**
     * @name getAllGroups
     * @member CustomerManagementModule.businessController
     * @param (...callbackArgs)=>any context
     * @param (response:{opstatus : number, membergroup : [{lastmodifiedts : object, Description : object, createdby : object, Status_id : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object, Name : object}], httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementModule_BusinessController.prototype.getAllGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAllGroupFeatures(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getStatusGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getStatusGroup(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getAllEntitlements = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAllEntitlements(context, onSuccess, onError);
  };
   CustomerManagementModule_BusinessController.prototype.getFeaturesActionsBasedOnAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerFeaturesAndActions(context, onSuccess, onError);
  };
  /**
     * @name getCustomerEntitlements
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (response:{customerpermissions_view : [{ServiceType_description : object, Service_id : object, Status_id : object, ServiceType_id : object, Display_Name : object, Service_notes : object, Channel_id : object, Service_name : object, MaxTransferLimit : object, MinTransferLimit : object, ChannelType_description : object, Display_Description : object, Service_description : object, Customer_id : object, Status_description : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerEntitlements = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerEntitlements(context, onSuccess, onError);
  };

  /**
     * @name getAdditionalFeaturesAndActions
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (response:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getAdditionalFeaturesAndActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerRetailDirectFeaturesAndActions(context, onSuccess, onError);
  };

  /**
     * @name createNote
     * @member CustomerManagementModule.businessController
     * @param {Customer_id : string, Note : string, Internal_username : string} context
     * @param (status:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.createNote = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.createCustomerNote(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.editCustomerBasicInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.editCustomerBasicInfo(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.editCustomerGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.editCustomerGroups(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.editCustomerEntitlements = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.editCustomerEntitlements(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.searchForCustomerLinkProfiles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.searchForCustomerLinkProfiles(context, onSuccess, onError);
  };
  
  CustomerManagementModule_BusinessController.prototype.linkProfileService = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.linkProfileService(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.delinkProfileService = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.deLinkProfileService(context, onSuccess, onError);
  };
  /**
     * @name editCustomerContactInfo
     * @member CustomerManagementModule.businessController
     * @param {ModifiedByName : string, Customer_id : string, EmailIds : [{value : object, isPrimary : object, Extension : object, id : object}]} context
     * @param (status:{Status : string, CreateEmail1 : string, opstatus : number, UpdateEmail0 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.editCustomerContactInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.editCustomerContactInfo(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.enrollCustomer = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.enrollCustomer(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getCityList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCityList(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getCountryList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCountryList(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getRegionList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchRegionList(context, onSuccess, onError);
  };

  /**
     * @name getCustomerRequests
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (response:{customerrequests_view : [{totalAttachments : object, firstMessage : object, requestcategory_id : object, recentMsgDate : object, priority : object, softdeleteflag : object, unreadmsgs : object, accountid : object, msgids : object, requestsubject : object, status_id : object, totalmsgs : object, requestCreatedDate : object, statusIdentifier : object, id : object, customer_id : object, readmsgs : object, username : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerRequests = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerRequests(context, onSuccess, onError);
  };
  /**
     * @name getCustomerAlertHistory
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerAlertHistory = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerAlertHistory(context, onSuccess, onError);
  };
  /**
     * @name getAlertCategories
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getAlertCategories = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.fetchAlertCategories(context, onSuccess, onError);
  };
  /**
     * @name getCustomerAlertCategoryPreference
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerAlertCategoryPreference = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.getCustomerAlertCategoryPreference(context, onSuccess, onError);
  };
  /**
     * @name getCustomerAlertCategoryChannelPreference
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerAlertCategoryChannelPreference = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.getCustomerAlertCategoryChannelPreference(context, onSuccess, onError);
  };
  /**
     * @name getCustomerAlertTypePreference
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerAlertTypePreference = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.getCustomerAlertTypePreference(context, onSuccess, onError);
  };
  /**
     * @name setAlertPreferences
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.setAlertPreferences = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.setAlertPreferences(context, onSuccess, onError);
  };
  /**
     * @name getCustomerNotifications
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (response:{customernotifications_view : [{lastmodifiedts : object, Description : object, Status_id : object, createdts : object, softdeleteflag : object, Name : object, StartDate : object, ExpirationDate : object, createdby : object, isread : object, modifiedby : object, synctimestamp : object, customer_Id : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerNotifications = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerNotifications(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getApplicantInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getApplicantInfo(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getCustomerLockStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerLockStatus(context, onSuccess, onError);
  };

  /**
     * @name updateCustomerLockstatus
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string} context
     * @param (response:{CoreBankingUpdate : {Status : string, responseMsg : string}, AdminConsoleUpdate : {Status : string, responseMsg : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.updateCustomerLockstatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.updateCustomerLockStatus(context, onSuccess, onError);
  };
  /**
       * @name sendResetPasswordLink
       * @member CustomerManagementModule.businessController
       * @param {customerUsername : string} context
       * @param (...callbackArgs)=>any onError
       */
  CustomerManagementModule_BusinessController.prototype.sendResetPasswordLink = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.sendResetPasswordLink(context, onSuccess, onError);
  };    
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorization = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistAuthorization(context, onSuccess, onError);
  };

  /**
     * @name CSRAssistAuthorizationApplyPersonalLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationApplyPersonalLoan = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationApplyPersonalLoan(context, onSuccess, onError);
    };
    /**
     * @name CSRAssistAuthorizationApplyVehicleLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationApplyVehicleLoan = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistAuthorizationApplyVehicleLoan(context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorizationApplyCreditLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationApplyCreditLoan = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationApplyCreditLoan(context, onSuccess, onError);
    };
    /**
     * @name CSRAssistAuthorizationLearnPersonalLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationLearnPersonalLoan = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CSRAssistAuthorizationLearnPersonalLoan(context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorizationLearnVehicleLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationLearnVehicleLoan = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationLearnVehicleLoan(context, onSuccess, onError);
    };
    /**
     * @name CSRAssistAuthorizationLearnCreditLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationLearnCreditLoan = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationLearnCreditLoan(context, onSuccess, onError);
    };

  /**
     * @name CSRAssistAuthorizationLearnCreditLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistLogCloseEvent = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistLogCloseEvent(context, onSuccess, onError);
    };

    /**
     * @name CSRAssistAuthorizationResumeLoan
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationResumeLoan = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationResumeLoan(context, onSuccess, onError);
    };

    /**
     * @name CSRAssistAuthorizationCreateApplicant
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationCreateApplicant = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationCreateApplicant(context, onSuccess, onError);
    };
    
    /**
     * @name CSRAssistAuthorizationViewSpecAccount
     * @member CustomerManagementModule.businessController
     * @param {customerid : string, accountId : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementModule_BusinessController.prototype.CSRAssistAuthorizationViewSpecAccount = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.CSRAssistAuthorizationViewSpecAccount(context, onSuccess, onError);
    };

  /**
     * @name getLastNCustomerSessions
     * @member CustomerManagementModule.businessController
     * @param {username : string, sessionCount : string} context
     * @param (response:{records : [{endDate : object, browser : object, ipAddress : object, channel : object, sessionId : object, operatingSystem : object, device : object, deviceId : object, startDate : object, numberOfActivities : object}], OperationStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getLastNCustomerSessions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.GetLastNCustomerSessions(context, onSuccess, onError);
  };

  /**
     * @name getAllActivitiesInACustomerSession
     * @member CustomerManagementModule.businessController
     * @param {sessionId : string} context
     * @param (response:{records : [{moduleName : object, channel : object, ipAddress : object, description : object, errorCode : object, sessionId : object, eventts : object, deviceId : object, operatingSystem : object, createdOn : object, referenceId : object, createdBy : object, browser : object, id : object, activityType : object, device : object, username : object, status : object}], OperationStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getAllActivitiesInACustomerSession = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.GetAllActivitiesInACustomerSession(context, onSuccess, onError);
  };

  /**
     * @name getCustomerDevices
     * @member CustomerManagementModule.businessController
     * @param {$filter : string} context
     * @param (response:{opstatus : number, customer_device_information_view : [{Channel_Description : object, OperatingSystem : object, lastmodifiedts : object, Status_id : object, Channel_id : object, Registered_Date : object, Status_name : object, LastLoginTime : object, createdby : object, Customer_id : object, Device_id : object, modifiedby : object, LastUsedIp : object, DeviceName : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerDevices = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.GetCustomerDevices(context, onSuccess, onError);
  };

  /**
     * @name customerUpdateDeviceInformation
     * @member CustomerManagementModule.businessController
     * @param {Device_id : string, Customer_id : string, Status_id : string} context
     * @param (status:{Status : string, UpdateResponse : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.customerUpdateDeviceInformation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.CustomerUpdateDeviceInformation(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.updateEstatementStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.UpdateEstatementStatus(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.sendUnlockLinkToCustomer = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.sendUnlockLinkToCustomer(context, onSuccess, onError);
  };

  /**
     * @name getCardsInformation
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string} context
     * @param (response:{records : [{Action : object, accountName : object, currentDueAmount : object, currentDueDate : object, maskedCardNumber : object, issuedOn : object, expiryDate : object, withdrawlLimit : object, lastPaymentDate : object, cardStatus : object, interestRate : object, minimumDueAmount : object, requestCount : object, secondaryCardHolder : object, cardHolderName : object, notificationCount : object, currentBalance : object, rewardPointBalance : object, lastStatementPayment : object, cardType : object, accountNumber : object, userId : object, maskedAccountNumber : object, lastStatementBalance : object, cardProductName : object, cardId : object, serviceProvider : object, cardNumber : object, username : object}], opstatus : number, issuerImages : {Maestro : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, AmericanExpress : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, Visa : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, MasterCard : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCardsInformation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CardManagementManager")
      .businessController.CardsInformation(context, onSuccess, onError);
  };

  /**
     * @name getAllCompanies
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string} context
     * @param (response:{records : [{Action : object, accountName : object, currentDueAmount : object, currentDueDate : object, maskedCardNumber : object, issuedOn : object, expiryDate : object, withdrawlLimit : object, lastPaymentDate : object, cardStatus : object, interestRate : object, minimumDueAmount : object, requestCount : object, secondaryCardHolder : object, cardHolderName : object, notificationCount : object, currentBalance : object, rewardPointBalance : object, lastStatementPayment : object, cardType : object, accountNumber : object, userId : object, maskedAccountNumber : object, lastStatementBalance : object, cardProductName : object, cardId : object, serviceProvider : object, cardNumber : object, username : object}], opstatus : number, issuerImages : {Maestro : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, AmericanExpress : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, Visa : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}, MasterCard : {lastmodifiedts : object, createdby : object, Status_id : object, issuerName : object, modifiedby : object, id : object, synctimestamp : object, Image : object, createdts : object, softdeleteflag : object}}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getAllCompanies = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getAllCompanies(context, onSuccess, onError);
  };
  
  CustomerManagementModule_BusinessController.prototype.getFilteredCompanies = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getFilteredCompanies(context, onSuccess, onError);
  };

  /**
     * @name updateCardsInformation
     * @member CustomerManagementModule.businessController
     * @param {customerUsername : string, cardNumber : string, cardAction : string, actionReason : string} context
     * @param (response:{opstatus : number, status : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.updateCardsInformation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CardManagementManager")
      .businessController.UpdateCardsInformation(context, onSuccess, onError);
  };

  /**
     * @name getAlertPrefrences
     * @member CustomerManagementModule.businessController
     * @param {userName : string} context
     * @param (response:{alertTypes : [{alerts : object, canBeSelected : object, alertType : object, isSelected : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getAlertPrefrences = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.CustomerAlertsPrefrences(context, onSuccess, onError);
  };

  /**
     * @name getTravelNotifications
     * @member CustomerManagementModule.businessController
     * @param {Username : string} context
     * @param (response:{TravelRequests : [{date : object, Status_id : object, endDate : object, cardCount : object, destinations : object, customerId : object, contactNumber : object, notificationId : object, additionalNotes : object, cardNumber : object, startDate : object, status : object, notificationType : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getTravelNotifications = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AccountRequestsManager")
      .businessController.GetTravelNotifications(context, onSuccess, onError);
  };

  /**
     * @name getCardRequests
     * @member CustomerManagementModule.businessController
     * @param {Username : string} context
     * @param (response:{opstatus : number, CardAccountRequests : [{Status : object, Type : object, Request_id : object, DeliveryDetails : object, DeliveryMode : object, CustomerId : object, CardAccountNumber : object, Date : object, Reason : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCardRequests = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AccountRequestsManager")
      .businessController.GetCardRequests(context, onSuccess, onError);
  };

  /**
     * @name cancelTravelNotification
     * @member CustomerManagementModule.businessController
     * @param {request_id : string, Username : string} context
     * @param (status:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.cancelTravelNotification = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AccountRequestsManager")
      .businessController.CancelTravelNotification(context, onSuccess, onError);
  };

  /**
     * @name cancelTravelNotification
     * @member CustomerManagementModule.businessController
     * @param {request_id : string, Username : string} context
     * @param (status:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.updateDBPUserStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.updateDBPUserStatus(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.uploadCustomersCSV = function (data, successCallback, failureCallback) {
    try {
      var mfURL = KNYMobileFabric.mainRef.config.selflink;
      mfURL = mfURL.substring(0, mfURL.indexOf("/authService"));

      var authToken = KNYMobileFabric.currentClaimToken;
      var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

      var csvFile = data.csvFile;
      var uploadURL = mfURL + "/services/data/v1/CustomerManagementObjService/operations/Customer/importCustomersFromCSV";

      var formData = new FormData();
      formData.append("X-Kony-Authorization", authToken);
      formData.append("user_ID", user_ID);
      formData.append("CustomersCSV.csv", csvFile);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', uploadURL, true);
      xhr.setRequestHeader("X-Kony-Authorization", authToken);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var uploadCustomersCSVResponse = JSON.parse(xhr.responseText);
          kony.print("uploadCustomersCSVResponse: " + JSON.stringify(uploadCustomersCSVResponse));

          successCallback(kony.mvc.constants.STATUS_SUCCESS, {
            "uploadCustomersCSVResponse": uploadCustomersCSVResponse
          });
        } else if (xhr.status !== 200) {
          failureCallback(kony.mvc.constants.STATUS_FAILURE, "Upload customers CSV server error");
        }
      };
      xhr.send(formData);
    } catch (err) {
      failureCallback(kony.mvc.constants.STATUS_FAILURE, err);
    }
  };

  CustomerManagementModule_BusinessController.prototype.getCustomerSearchConfiguration = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCustomerSearchConfiguration(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getAddressSuggestion=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServerManagementManager").businessController.getAddressSuggestion(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getPlaceDetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServerManagementManager").businessController.getPlaceDetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.fetchTermsAndConds=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.fetchTermsAndConds(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.createOnboardingApplicant=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.createOnboardingApplicant(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.fetchCountryList = function(context, onSuccess, onError){
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
  CustomerManagementModule_BusinessController.prototype.fetchRegionList = function(context, onSuccess, onError){
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
  CustomerManagementModule_BusinessController.prototype.fetchCityList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCityList(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getEligibilityCriteria = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getEligibilityCriteria(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getIdTypes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getIdTypes(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.execute = function(command){
    kony.mvc.Business.Controller.prototype.execute.call(this,command);
  };

  /**
     * @name getLoanTypes
     * @param {} context
     * @param (response:[{Code : string, id : string, Description : string, softdeleteflag : boolean}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getLoanTypes=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getLoanTypes(context,OnSucess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getPendingApplicationsList=function(context,OnSuccess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getPendingApplicationsList(context,OnSuccess, onError);
  };
 
  CustomerManagementModule_BusinessController.prototype.getAddressSuggestion=function(context,OnSucess,onError){
       kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServerManagementManager").businessController.getAddressSuggestion(context, OnSucess, onError);
    };
  
  CustomerManagementModule_BusinessController.prototype.upgradeUser=function(context,OnSucess,onError){
       kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingManager").businessController.upgradeUser(context, OnSucess, onError);
    };
  
  CustomerManagementModule_BusinessController.prototype.fetchLeads = function(fetchLeadsJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchLeads(fetchLeadsJSON, onSuccess, onError);
  };

   /**
     * @name fetchCountryList
     * @param {} context
     * @param (response:[{Code : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.fetchCountryList = function(context, onSuccess, onError){
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
  CustomerManagementModule_BusinessController.prototype.fetchRegionList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchRegionList(context, onSuccess, onError);
  };
  
  /**
     * @name getUsernameRulesAndPolicy
     * @member CustomerCreateModule.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getUsernameRulesAndPolicy = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("PoliciesManager")
      .businessController.fetchUsernamePoliciesCustomer(context, onSuccess, onError);
  };

  /**
     * @name fetchCityList
     * @param {} context
     * @param (response:[{Country_id : string, id : string, Name : string, Region_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.fetchCityList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCityList(context, onSuccess, onError);
  };
  
  CustomerManagementModule_BusinessController.prototype.getLoanTypeApr=function(OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getLoanTypeApr(OnSucess, onError);
  };
  
  CustomerManagementModule_BusinessController.prototype.trackApplication = function(context, OnSucess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.trackApplication(context, OnSucess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.updatePersonalLoan = function(context, OnSucess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updatePersonalLoan(context, OnSucess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.updateVehicleLoan = function(context, OnSucess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updateVehicleLoan(context, OnSucess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.updateCreditCardApp = function(context, OnSucess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.updateCreditCardApp(context, OnSucess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getPersonalLoanPurpose = function(context, OnSucess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoansServicesManager").businessController.getPersonalLoanPurpose(context, OnSucess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.SSNValidation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.searchCustomers(context, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.NumberValidation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.NumberValidation(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.fetchLeadsDeposits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchLeads(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.fetchProductsDeposits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchProducts(context, onSuccess, onError);
  };
   CustomerManagementModule_BusinessController.prototype.updateLeadStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.updateLead(context, onSuccess, onError);
   };
  CustomerManagementModule_BusinessController.prototype.getTermsAndConditions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("TermsAndConditionsManager")
      .businessController.getTermsAndConditions(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getCustomerAccountAlertSettings = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AlertAndAlertTypesManager")
      .businessController.getCustomerAccountAlertSettings(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getAllFeaturesAndActions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getAllFeaturesAndActions(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.updateCustomerActions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.updateCustomerActions(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getCustomerFeaturesAndActionsCombined = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getCustomerFeaturesAndActionsCombined(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getInfinityUserFeatureActions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.getInfinityUserFeatureActions(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getInfinityUserLimits = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getInfinityUserLimits(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getGroupFeaturesAndActions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getGroupFeaturesAndActions(context, onSuccess, onError);
  };  
  
  CustomerManagementModule_BusinessController.prototype.fetchBusinessConfigurations = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getBusinessConfigurations({}, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.generateReport = function(payload, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.generateReport(payload, onSuccess, onError);
  };

  CustomerManagementModule_BusinessController.prototype.getCompanySignatories = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getCompanySignatories(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.fetchConfigurations = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.fetchConfigurations(context, onSuccess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.createAccountUsage=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.createAccountUsage(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.updateAccountUsage=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.updateAccountUsage(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getAccountUsage=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.getAccountUsage(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.createTaxDetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.createTaxDetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.updateTaxDetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.updateTaxDetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getDueDiligenceDetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.getDueDiligenceDetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.updateCitizenshipDetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.updateCitizenshipDetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.getEmploymentdetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.getEmploymentdetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.updateEmploymentdetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.updateEmploymentdetails(context, OnSucess, onError);
  };
  CustomerManagementModule_BusinessController.prototype.createEmploymentdetails=function(context,OnSucess,onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.createEmploymentdetails(context, OnSucess, onError);
  };
  /* @name get service definitions 
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceDefinitions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getServiceDefinitions(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionRoles
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceDefinitionRoles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionRoles(context, onSuccess, onError);
  };
   /* @name getServiceAndRoleFeatures
   * @param {"serviceDefinitionId": "","groupId": ""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceAndRoleFeatures = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionAndRoleFeatures(context, onSuccess, onError);
  };
  /* @name get Core related customers 
   * @param {"coreCustomerId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getCoreRelativeCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getCoreRelativeCustomers(context, onSuccess, onError);
  };
  /* @name search contracts
   * @param {"contractId": "","contractName": "","coreCustomerId": "","coreCustomerName": "","email": "","phoneCountryCode": "","phoneNumber": "","country": "","serviceDefinitionId": ""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.searchContracts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getSearchContract(context, onSuccess, onError);
  };
  /* @name searchCoreCustomers
   * @param {"id":"1","name":"","email":"","phoneNumber":"","phoneCountryCode":"","dob":"","customerStatus":"","country":"","town":"","zipcode":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.searchCoreCustomers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.searchCoreCustomers(context, onSuccess, onError);
  };
  /* @name get service definition based features,actions,limits
   * @param {"servicedefinitionId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceFeaturesAndActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getFeaturesAndActions(context, onSuccess, onError);
  };
  /* @name get Core related customers accounts
   * @param {"coreCustomerIdList":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getCoreCustomerAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getCoreCustomerAccounts(context, onSuccess, onError);
  };
  /* @name getContractAccounts
   * @param {"contractId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getContractAccounts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getContractAccounts(context, onSuccess, onError);
  };
  /* @name getInfinityUser
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getInfinityUser = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getInfinityUser(context, onSuccess, onError);
  };
  /* @name createInfinityUser
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.createInfinityUser = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.createInfinityUser(context, onSuccess, onError);
  };
  /* @name editInfinityUser
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.editInfinityUser = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.editInfinityUser(context, onSuccess, onError);
  };
  
  //customerSearchByUserName
  CustomerManagementModule_BusinessController.prototype.customerSearchByUserName = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.customerSearchByUserName(context, onSuccess, onError);
  };

  //UserIdSearchOperationDetailedData
  CustomerManagementModule_BusinessController.prototype.UserIdSearchOperationDetailedData = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.UserIdSearchOperationDetailedData(context, onSuccess, onError);
  };


  /* @name getCoreCustomerContractDetails
  * @param {"coreCustomerId" : ""} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  CustomerManagementModule_BusinessController.prototype.getCoreCustomerContractDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCoreCustomerContractDetails(context, onSuccess, onError);
  };
  /* @name getRelativeCoreCustomerContractDetails
  * @param {"coreCustomerId" : ""} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  CustomerManagementModule_BusinessController.prototype.getRelativeCoreCustomerContractDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getRelativeCoreCustomerContractDetails(context, onSuccess, onError);
  };
  /* @name getCoreCustomerRoleFeatureActionLimits
  * @param {"coreCustomerRoleIdList":[{"coreCustomerId":"","serviceDefinitionId":"","roleId":""}]} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  CustomerManagementModule_BusinessController.prototype.getCoreCustomerRoleFeatureActionLimits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCoreCustomerRoleFeatureActionLimits(context, onSuccess, onError);
  };
  /* @name getCoreCustomerProductRolesFeatureActionLimits
  * @param {"coreCustomerRoleIdList":"[{"coreCustomerId":"","productsList":[{"accountId":"","productId":"","arrangementRoleId":""}],"serviceDefinitionId":"","roleId":""}]"} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  CustomerManagementModule_BusinessController.prototype.getCoreCustomerProductRolesFeatureActionLimits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getCoreCustomerProductRolesFeatureActionLimits(context, onSuccess, onError);
  };
    /* @name getCustomerStatusConfig
     * @param {"bundle_name" : "","config_key": ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getCustomerStatusConfig = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ConfigurationsManager")
      .businessController.getConfigurations(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionsForContracts
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceDefinitionsForContracts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionsForContracts(context, onSuccess, onError);
  };
  /* @name createContract
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
   CustomerManagementModule_BusinessController.prototype.createContract = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.createContract(context, onSuccess, onError);
  };
  /* @name editContract
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.editContract = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.editContract(context, onSuccess, onError);
  };
  /* @name get service definition based features,actions,limits with dependency actions
   * @param {"servicedefinitionId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceDefinitionFeaturesAndLimits = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionFeaturesAndLimits(context, onSuccess, onError);
  };
  /**
   * @name fetch contract details
   * @param {"contractId" : id} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getContractDetails = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getContractDetails(context, onSuccess, onError);
  };
  /**
   * @name fetch contract features and limits
   * @param {"contractId" : id} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getContractFeatureActionLimits = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getContractFeatureActionLimits(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionMonetaryActions
   * @param {"serviceDefinitionId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceDefinitionMonetaryActions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionMonetaryActions(context, onSuccess, onError);
  };
  /* @name getAllSignatoryGroupsbyCoreCustomerIds
  * @param {"serviceDefinitionId":""} context
  * @param (response:[])=>any onSuccess
  * @param (...callbackArgs)=>any onError
  */
  CustomerManagementModule_BusinessController.prototype.getAllSignatoryGroupsbyCoreCustomerIds = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SignatoryGroupManageManager")
      .businessController.getAllSignatoryGroupsbyCoreCustomerIds(context, onSuccess, onError);
  };
  /* @name getServiceDefinitionProductIdPermissions
   * @param {} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustomerManagementModule_BusinessController.prototype.getServiceDefinitionProductIdPermissions = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BusinessBankingManager")
      .businessController.getServiceDefinitionProductIdPermissions(context, onSuccess, onError);
  };
  /* @name getInfinityUserServiceDefsRoles
   * @param {"serviceDefinitionId":""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementModule_BusinessController.prototype.getInfinityUserServiceDefsRoles = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getInfinityUserServiceDefsRoles(context, onSuccess, onError);
  };
  //Added Service
  CustomerManagementModule_BusinessController.prototype.getCoreCustomerDetails = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ContractManagementManager")
      .businessController.getCoreCustomerDetails(context, onSuccess, onError);
  };
  /* @name getInfinityUserAccountsForCorecustomer
   * @param {"serviceDefinitionId":""} context
   * @param (response:[])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */

  //CustomerManagementModule_BusinessController.prototype.getAllSignatoryGroupsbyCoreCustomerIds = function(context, onSuccess, onError){
  CustomerManagementModule_BusinessController.prototype.getInfinityUserAccountsForCorecustomer = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
  //    .getModuleManager().getModule("SignatoryGroupManageManager")
    //  .businessController.getAllSignatoryGroupsbyCoreCustomerIds(context, onSuccess, onError);
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getInfinityUserAccountsForCorecustomer(context, onSuccess, onError);
  };
  return CustomerManagementModule_BusinessController;
  
});

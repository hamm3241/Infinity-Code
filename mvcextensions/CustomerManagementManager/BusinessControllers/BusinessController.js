define(['ModelManager'], function (ModelManager) {
  /**
     * CustomerManagementManager manages models: Applicant, Customer, CustomerActivity, CustomerContact, CustomerDevice, CustomerEntitlement, CustomerGroup, CustomerNotification, CustomerProduct, CustomerRequest, CustomerSecurityQuestions, Note, ProductTransaction
     */
  function CustomerManagementManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(CustomerManagementManager, kony.mvc.Business.Delegator);

  CustomerManagementManager.prototype.initializeBusinessController = function () {

  };

  CustomerManagementManager.prototype.getMessages = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'getMessages', context, onSuccess, onError);
  };


  /**
     * @name getRequests
     * @member CustomerManagementManager.businessController
     * @param {csrRepID : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string} context
     * @param (...callbackArgs:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customer_FirstName : object, customerrequest_Customer_id : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customerrequest_hasDraftMessage : object, customer_LastName : object, customerrequest_id : object, requestcategory_Name : object, customerrequest_createdby : object, customerrequest_Priority : object, customer_Salutation : object, customerrequest_modifiedby : object, customerrequest_RequestCategory_id : object, customerrequest_lastupdatedbycustomer : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, requestsSummary : {SID_ONHOLD : number, MY_QUEUE : number, FILTERED_REQUESTS : number, SID_DELETED : number, SID_CANCELLED : number, SID_INPROGRESS : number, SID_OPEN : number, SID_ARCHIVED : number, SID_RESOLVED : number}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getRequests = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'getCustomerRequests', context, onSuccess, onError);
  };

  /**
     * @name getAllCompanies
     * @member CustomerManagementManager.businessController
     * @param {csrRepID : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string} context
     * @param (...callbackArgs:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customer_FirstName : object, customerrequest_Customer_id : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customerrequest_hasDraftMessage : object, customer_LastName : object, customerrequest_id : object, requestcategory_Name : object, customerrequest_createdby : object, customerrequest_Priority : object, customer_Salutation : object, customerrequest_modifiedby : object, customerrequest_RequestCategory_id : object, customerrequest_lastupdatedbycustomer : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, requestsSummary : {SID_ONHOLD : number, MY_QUEUE : number, FILTERED_REQUESTS : number, SID_DELETED : number, SID_CANCELLED : number, SID_INPROGRESS : number, SID_OPEN : number, SID_ARCHIVED : number, SID_RESOLVED : number}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getAllCompanies = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'getAllCompanies', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getFilteredCompanies = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'getFilteredCompanies', context, onSuccess, onError);
  };

  /**
     * @name getRequests
     * @member CustomerManagementManager.businessController
     * @param {csrRepID : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string} context
     * @param (...callbackArgs:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customer_FirstName : object, customerrequest_Customer_id : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customerrequest_hasDraftMessage : object, customer_LastName : object, customerrequest_id : object, requestcategory_Name : object, customerrequest_createdby : object, customerrequest_Priority : object, customer_Salutation : object, customerrequest_modifiedby : object, customerrequest_RequestCategory_id : object, customerrequest_lastupdatedbycustomer : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, requestsSummary : {SID_ONHOLD : number, MY_QUEUE : number, FILTERED_REQUESTS : number, SID_DELETED : number, SID_CANCELLED : number, SID_INPROGRESS : number, SID_OPEN : number, SID_ARCHIVED : number, SID_RESOLVED : number}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.updateDBPUserStatus = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'updateDBPUserStatus', context, onSuccess, onError);
  };

  /**
     * @name getMyRequests
     * @member CustomerManagementManager.businessController
     * @param {csrRepID : string, requestAssignedTo : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string} context
     * @param (...callbackArgs:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customer_FirstName : object, customerrequest_Customer_id : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customerrequest_hasDraftMessage : object, customer_LastName : object, customerrequest_id : object, requestcategory_Name : object, customerrequest_createdby : object, customerrequest_Priority : object, customer_Salutation : object, customerrequest_RequestCategory_id : object, customerrequest_lastupdatedbycustomer : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, requestsSummary : {SID_ONHOLD : number, MY_QUEUE : number, FILTERED_REQUESTS : number, SID_DELETED : number, SID_CANCELLED : number, SID_INPROGRESS : number, SID_OPEN : number, SID_ARCHIVED : number, SID_RESOLVED : number}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getMyRequests = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'getCustomerRequests', context, onSuccess, onError);
  };


  /**
     * @name getRequestMessages
     * @member CustomerManagementManager.businessController
     * @param {requestID : string} context
     * @param (...callbackArgs:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customerrequest_Customer_id : object, customer_FirstName : object, MessageThread : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customer_LastName : object, customerrequest_id : object, customer_Salutation : object, customerrequest_Priority : object, customerrequest_createdby : object, customerrequest_modifiedby : object, customer_Fullname : object, customerrequest_RequestCategory_id : object, customerEmail : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getRequestMessages = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'getRequestMessages', context, onSuccess, onError);
  };


  /**
     * @name getAllCategories
     * @member CustomerManagementManager.businessController
     * @param {} context
     * @param (...callbackArgs:{requestcategory : [{lastmodifiedts : object, createdby : object, modifiedby : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getAllCategories = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'getRequestCategory', context, onSuccess, onError);
  };


  /**
     * @name getListOfCustomersAndGroups
     * @member CustomerManagementManager.businessController
     * @param {} context
     * @param (...callbackArgs:{groupNames : string, opstatus : number, customerInfo : [{customer_MiddleName : object, customer_Username : object, customer_Gender : object, customer_Salutation : object, customer_FirstName : object, customercommunication_Value : object, customer_id : object, customer_LastName : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getListOfCustomersAndGroups = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'getListOfCustomersAndGroups', context, onSuccess, onError);
  };

  /**
     * @name searchCustomers
     * @member CustomerManagementManager.businessController
     * @param {_searchType : string, _id : null, _name : string, _username : null, _phone : null, _email : null, _group : null, _requestID : null, _SSN : null, _pageOffset : string, _pageSize : number, _sortVariable : string, _sortDirection : string} context
     * @param (response:{statuscode : number, Status : string, SortVariable : string, SortDirection : string, PageSize : number, records : [{PrimaryEmailAddress : object, Username : object, FirstName : object, PrimaryPhoneNumber : object, name : object, Gender : object, id : object, LastName : object, MiddleName : object, Salutation : object, Ssn : object, requestids : object}], opstatus : number, TotalResultsFound : number, PageOffset : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.searchCustomers = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CustomerSearch', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.CustomerLegalEntitiesGetOperation = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CustomerLegalEntitiesGetOperation', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.logs_enrolledCustomerSearch = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'enrolledCustomerSearch', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.searchCustomersForGroup = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CustomerSearchByGroup', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.NumberValidation = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'NumberValidation', context, onSuccess, onError);
  };
    CustomerManagementManager.prototype.CSRAssistCustomerOnboarding = function(context, onSuccess, onError){
      ModelManager.invoke('Customer', 'CSRAssistCustomerOnboarding', context, onSuccess, onError);
    }; 
    CustomerManagementManager.prototype.GetCustomerApplications = function(context, onSuccess, onError){
        ModelManager.invoke('Customer', 'GetOnboardingApplications', context, onSuccess, onError);
    };
    CustomerManagementManager.prototype.checkProspectStatus = function(context, onSuccess, onError){
      ModelManager.invoke('Customer', 'checkProspectStatus', context, onSuccess, onError);
    };
   CustomerManagementManager.prototype.CSRAssistCustomerOnboardingResumeApp = function(context, onSuccess, onError){
        ModelManager.invoke('Customer', 'CSRAssistCustomerOnboardingResumeApp', context, onSuccess, onError);
    };
   CustomerManagementManager.prototype.CSRAssistCustomerOnboardingNewApp = function(context, onSuccess, onError){
        ModelManager.invoke('Customer', 'CSRAssistCustomerOnboardingNewApp', context, onSuccess, onError);
    };
   CustomerManagementManager.prototype.CSRAssistProspectOnboardingResumeApp = function(context, onSuccess, onError){
        ModelManager.invoke('Customer', 'CSRAssistProspectOnboardingResumeApp', context, onSuccess, onError);
    };
    
    CustomerManagementManager.prototype.getProductsList = function(context, onSuccess, onError){
        ModelManager.invoke('CustomerProduct', 'GetAllProducts', context, onSuccess, onError);
    };

  /**
     * @name getBasicInfo
     * @member CustomerManagementManager.businessController
     * @param {Customer_username : string} context
     * @param (response:{customerbasicinfo_view : {Branch_id : string, CustomerStatus_name : string, Gender : string, IsEnrolledForOlb : string, Salutation : string, Branch_code : string, Name : string, IsStaffMember : string, EmployementStatus_name : string, MaritalStatus_name : string, Branch_name : string, MaritalStatus_id : string, DateOfBirth : string, IsAssistConsented : string, EmployementStatus_id : string, FirstName : string, IsOlbAllowed : string, MiddleName : string, SpouseName : string, SSN : string, CustomerStatus_id : string, Username : string, Customer_id : string, CustomerSince : string, LastName : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getBasicInfo = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'GetBasicInfo', context, onSuccess, onError);
  };

  /**
     * @name getContactInfo
     * @member CustomerManagementManager.businessController
     * @param {Customer_id : string} context
     * @param (response:{Status : string, Addresses : [{RegionCode : object, CountryName : object, City_id : object, Region_id : object, ZipCode : object, Address_id : object, Country_id : object, CityName : object, CustomerId : object, AddressLine2 : object, AddressLine1 : object, RegionName : object, isPrimary : object, CountryCode : object, AddressType : object, AddressId : object}], EmailIds : [{lastmodifiedts : object, Description : object, createdts : object, softdeleteflag : object, Extension : object, createdby : object, isPrimary : object, Customer_id : object, Value : object, modifiedby : object, id : object, synctimestamp : object, Type_id : object}], ContactNumbers : [{lastmodifiedts : object, Description : object, createdts : object, softdeleteflag : object, Extension : object, createdby : object, isPrimary : object, Customer_id : object, Value : object, modifiedby : object, id : object, synctimestamp : object, Type_id : object}], opstatus : number, httpStatusCode : number, PreferredTime&Method : {PreferredContactTime : string, PreferredContactMethod : string}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getContactInfo = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerContact', 'GetCustomerContact', context, onSuccess, onError);
  };
  
  CustomerManagementManager.prototype.sendActivationCode = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'sendActivationCode', context, onSuccess, onError);
  };
   CustomerManagementManager.prototype.getAddressTypes = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'GetAddressTypes', context, onSuccess, onError);
  };
  	
		  CustomerManagementManager.prototype.customerSearchByUserName = function(context, onSuccess, onError) {
    ModelManager.invoke('Customer', 'customerSearchByUserName', context, onSuccess, onError);
  };


  /**
     * @name getCustomerNotes
     * @member CustomerManagementManager.businessController
     * @param {$filter : string, $orderby : string} context
     * @param (response:{customernotes_view : [{InternalUser_id : object, createdts : object, Customer_Username : object, softdeleteflag : object, InternalUser_Email : object, Customer_LastName : object, Customer_Status_id : object, Customer_MiddleName : object, InternalUser_LastName : object, Customer_id : object, Note : object, Customer_FirstName : object, InternalUser_MiddleName : object, InternalUser_Username : object, InternalUser_FirstName : object, id : object, synctimestamp : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerNotes = function(context, onSuccess, onError){
    ModelManager.invoke('Note', 'GetNotes', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getApplicantNotes = function(context, onSuccess, onError){
    ModelManager.invoke('Note', 'GetApplicantNotes', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getAccountSpecificAlerts = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerProduct', 'GetAccountSpecificAlerts', context, onSuccess, onError);
  };

  /**
     * @name getCustomerAccounts
     * @member CustomerManagementManager.businessController
     * @param {CustomerUsername : string} context
     * @param (response:{Status : string, opstatus : number, Accounts : [{lastDividendPaidDate : object, supportBillPay : object, bondInterestLastYear : object, dueDate : object, dividendLastPaidDate : object, availablePoints : object, interestPaidLastYear : object, maturityOption : object, accountID : object, unpaidInterest : object, accountHolder : object, maturityAmount : object, principalValue : object, principalBalance : object, maturityDate : object, creditLimit : object, supportTransferTo : object, outstandingBalance : object, regularPaymentAmount : object, pendingWithdrawal : object, availableCredit : object, nickName : object, currentBalance : object, accountType : object, bsbNum : object, eStatementEmail : object, dividendRate : object, payoffAmount : object, paymentDue : object, minimumDue : object, previousYearsDividends : object, creditCardNumber : object, interestEarned : object, paymentMethod : object, transactionLimit : object, supportTransferFrom : object, lateFeesDue : object, paymentTerm : object, interestPaidPreviousYTD : object, bondInterest : object, dividendPaidYTD : object, accountName : object, favouriteStatus : object, dividendLastPaidAmount : object, swiftCode : object, bankName : object, supportDeposit : object, eStatementEnable : object, availableBalance : object, totalDebitsMonth : object, isPFM : object, supportCardlessCash : object, totalCreditMonths : object, lastPaymentDate : object, lastPaymentAmount : object, dividendYTD : object, openingDate : object, payOffCharge : object, interestRate : object, pendingDeposit : object, statusDesc : object, currentAmountDue : object, previousYearDividend : object, lastDividendPaidAmount : object, routingNumber : object, transferLimit : object, lastStatementBalance : object, originalAmount : object, interestPaidYTD : object, currencyCode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerManagementManager.prototype.getCustomerAccounts = function(context, onSuccess, onError){
      ModelManager.invoke('CustomerProduct', 'GetCustomerProducts', context, onSuccess, onError);
    };
    /**
     * @name getInfinityUserAccounts
     * @member CustomerManagementManager.businessController
     * @param {CustomerUsername : string} context
     * @param (response:{Status : string, opstatus : number, Accounts : [{lastDividendPaidDate : object, supportBillPay : object, bondInterestLastYear : object, dueDate : object, dividendLastPaidDate : object, availablePoints : object, interestPaidLastYear : object, maturityOption : object, accountID : object, unpaidInterest : object, accountHolder : object, maturityAmount : object, principalValue : object, principalBalance : object, maturityDate : object, creditLimit : object, supportTransferTo : object, outstandingBalance : object, regularPaymentAmount : object, pendingWithdrawal : object, availableCredit : object, nickName : object, currentBalance : object, accountType : object, bsbNum : object, eStatementEmail : object, dividendRate : object, payoffAmount : object, paymentDue : object, minimumDue : object, previousYearsDividends : object, creditCardNumber : object, interestEarned : object, paymentMethod : object, transactionLimit : object, supportTransferFrom : object, lateFeesDue : object, paymentTerm : object, interestPaidPreviousYTD : object, bondInterest : object, dividendPaidYTD : object, accountName : object, favouriteStatus : object, dividendLastPaidAmount : object, swiftCode : object, bankName : object, supportDeposit : object, eStatementEnable : object, availableBalance : object, totalDebitsMonth : object, isPFM : object, supportCardlessCash : object, totalCreditMonths : object, lastPaymentDate : object, lastPaymentAmount : object, dividendYTD : object, openingDate : object, payOffCharge : object, interestRate : object, pendingDeposit : object, statusDesc : object, currentAmountDue : object, previousYearDividend : object, lastDividendPaidAmount : object, routingNumber : object, transferLimit : object, lastStatementBalance : object, originalAmount : object, interestPaidYTD : object, currencyCode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerManagementManager.prototype.getInfinityUserAccounts = function(context, onSuccess, onError){
      ModelManager.invoke('InfinityUser', 'getInfinityUserAccounts', context, onSuccess, onError);
    };
    /**
     * @name getInfinityUserContractDetails
     * @member CustomerManagementManager.businessController
     * @param {CustomerUsername : string} context
     * @param (response:{Status : string, opstatus : number, Accounts : [{lastDividendPaidDate : object, supportBillPay : object, bondInterestLastYear : object, dueDate : object, dividendLastPaidDate : object, availablePoints : object, interestPaidLastYear : object, maturityOption : object, accountID : object, unpaidInterest : object, accountHolder : object, maturityAmount : object, principalValue : object, principalBalance : object, maturityDate : object, creditLimit : object, supportTransferTo : object, outstandingBalance : object, regularPaymentAmount : object, pendingWithdrawal : object, availableCredit : object, nickName : object, currentBalance : object, accountType : object, bsbNum : object, eStatementEmail : object, dividendRate : object, payoffAmount : object, paymentDue : object, minimumDue : object, previousYearsDividends : object, creditCardNumber : object, interestEarned : object, paymentMethod : object, transactionLimit : object, supportTransferFrom : object, lateFeesDue : object, paymentTerm : object, interestPaidPreviousYTD : object, bondInterest : object, dividendPaidYTD : object, accountName : object, favouriteStatus : object, dividendLastPaidAmount : object, swiftCode : object, bankName : object, supportDeposit : object, eStatementEnable : object, availableBalance : object, totalDebitsMonth : object, isPFM : object, supportCardlessCash : object, totalCreditMonths : object, lastPaymentDate : object, lastPaymentAmount : object, dividendYTD : object, openingDate : object, payOffCharge : object, interestRate : object, pendingDeposit : object, statusDesc : object, currentAmountDue : object, previousYearDividend : object, lastDividendPaidAmount : object, routingNumber : object, transferLimit : object, lastStatementBalance : object, originalAmount : object, interestPaidYTD : object, currencyCode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerManagementManager.prototype.getInfinityUserContractDetails = function(context, onSuccess, onError){
      ModelManager.invoke('InfinityUser', 'getInfinityUserContractDetails', context, onSuccess, onError);
    };

  /**
     * @name getCustomerTransactions
     * @member CustomerManagementManager.businessController
     * @param {AccountNumber : string, StartDate : string, EndDate : string} context
     * @param (response:{Status : string, Transactions : [{amount : object, fromAccountNumber : object, toAccountType : object, fromAccountName : object, fromNickName : object, hasDepositImage : object, description : object, scheduledDate : object, isScheduled : object, transactionDate : object, transactionId : object, transactiontype : object, fromAccountType : object, toAccountName : object, statusDescription : object, fromAccountBalance : object, transactionsNotes : object, toAccountNumber : object, frequencyType : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerTransactions = function(context, onSuccess, onError){
    ModelManager.invoke('ProductTransaction', 'GetCustomerTransactions', context, onSuccess, onError);
  };

  /**
     * @name getCustomerGroups
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (response:{opstatus : number, httpStatusCode : string, customergroupinfo_view : [{Group_id : object, Group_synctimestamp : object, Customer_id : object, Group_createdby : object, Group_name : object, Group_lastmodifiedts : object, Group_Desc : object, GroupStatus_id : object, Group_createdts : object, GroupStatus_name : object}], httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerGroups = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerGroup', 'GetCustomerGroup', context, onSuccess, onError);
  };

  /**
     * @name getAllGroups
     * @member CustomerManagementManager.businessController
     * @param (...callbackArgs)=>any context
     * @param (response:{opstatus : number, membergroup : [{lastmodifiedts : object, Description : object, createdby : object, Status_id : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object, Name : object}], httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
    CustomerManagementManager.prototype.getAllGroupFeatures = function(context, onSuccess, onError){
        ModelManager.invoke('GroupFeatures', 'getGroupFeatureActionsByType', context, onSuccess, onError);
    };
    CustomerManagementManager.prototype.getAllGroups = function(context, onSuccess, onError){
        ModelManager.invoke('CustomerGroup', 'GetAllGroups', context, onSuccess, onError);
    };
    CustomerManagementManager.prototype.getStatusGroup = function(context, onSuccess, onError){
        ModelManager.invoke('Customer', 'GetStatus', context, onSuccess, onError);
    };
    
    CustomerManagementManager.prototype.getAllEntitlements = function(context, onSuccess, onError){
        ModelManager.invoke('CustomerEntitlement', 'GetAllEntitlements', context, onSuccess, onError);
    };
    
    /**
     * @name getCustomerEntitlements
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (response:{customerpermissions_view : [{ServiceType_description : object, Service_id : object, Status_id : object, ServiceType_id : object, Display_Name : object, Service_notes : object, Channel_id : object, Service_name : object, MaxTransferLimit : object, MinTransferLimit : object, ChannelType_description : object, Display_Description : object, Service_description : object, Customer_id : object, Status_description : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerEntitlements = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'getCustomerFeaturesAndActionsByRole', context, onSuccess, onError);
  };
      /**
     * @name updateCustomerActions
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.updateCustomerActions = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'updateCustomerActions', context, onSuccess, onError);
  };

  /**
     * @name getCustomerRetailDirectFeaturesAndActions 
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (response:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerRetailDirectFeaturesAndActions  = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'getCustomerRetailDirectFeaturesAndActions', context, onSuccess, onError);
  };

  /**
     * @name createNote
     * @member CustomerManagementManager.businessController
     * @param {Customer_id : string, Note : string, Internal_username : string} context
     * @param (status:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.createCustomerNote = function(context, onSuccess, onError){
    ModelManager.invoke('Note', 'CreateNote', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.editCustomerBasicInfo = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'EditCustomerBasicInfo', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.editCustomerGroups = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerGroup', 'EditCustomerGroup', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.editCustomerEntitlements = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerEntitlement', 'EditCustomerEntitlement', context, onSuccess, onError);
  };

  /**
     * @name editCustomerContactInfo
     * @member CustomerManagementManager.businessController
     * @param {ModifiedByName : string, Customer_id : string, EmailIds : [{value : object, isPrimary : object, Extension : object, id : object}]} context
     * @param (status:{Status : string, CreateEmail1 : string, opstatus : number, UpdateEmail0 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.editCustomerContactInfo = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerContact', 'EditCustomerContact', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.enrollCustomer = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'Enroll', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.sendUnlockLinkToCustomer = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'SendUnlockLinkToCustomer', context, onSuccess, onError);
  };

  /**
     * @name getCustomerRequests
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (response:{customerrequests_view : [{totalAttachments : object, firstMessage : object, requestcategory_id : object, recentMsgDate : object, priority : object, softdeleteflag : object, unreadmsgs : object, accountid : object, msgids : object, requestsubject : object, status_id : object, totalmsgs : object, requestCreatedDate : object, statusIdentifier : object, id : object, customer_id : object, readmsgs : object, username : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerRequests = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'getRequests', context, onSuccess, onError);
  };
  /**
     * @name getCustomerAlertHistory
     * @member CustomerManagementManager.businessController
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerAlertHistory = function(context, onSuccess, onError){
    ModelManager.invoke('alerthistory', 'getCustomerAlertHistory', context, onSuccess, onError);
  };
  /**
     * @name getCustomerNotifications
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (response:{customernotifications_view : [{lastmodifiedts : object, Description : object, Status_id : object, createdts : object, softdeleteflag : object, Name : object, StartDate : object, ExpirationDate : object, createdby : object, isread : object, modifiedby : object, synctimestamp : object, customer_Id : object}], opstatus : number, httpStatusCode : string, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.getCustomerNotifications = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerNotification', 'GetNotifications', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getApplicantInfo = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'GetApplicantInfo', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getCustomerLockStatus = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'GetCustomerLockStatus', context, onSuccess, onError);
  };

  /**
     * @name updateCustomerLockstatus
     * @member CustomerManagementManager.businessController
     * @param {customerUsername : string} context
     * @param (response:{CoreBankingUpdate : {Status : string, responseMsg : string}, AdminConsoleUpdate : {Status : string, responseMsg : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.updateCustomerLockStatus = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'UpdateCustomerLockStatus', context, onSuccess, onError);
  };
  /**
     * @name sendResetPasswordLink
     * @member CustomerManagementManager.businessController
     * @param {customerUsername : string} context
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.sendResetPasswordLink = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'sendResetPasswordLink', context, onSuccess, onError);
  };    
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorization = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorization', context, onSuccess, onError);
  };

  /**
     * @name CSRAssistLogCloseEvent
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistLogCloseEvent = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistLogCloseEvent', context, onSuccess, onError);
  };

  /**
     * @name CSRAssistAuthorizationResumeLoan
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationResumeLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationResumeLoan', context, onSuccess, onError);
  };

  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationApplyVehicleLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationApplyVehicleLoan', context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationApplyPersonalLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationApplyPersonalLoan', context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationApplyCreditLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationApplyCreditLoan', context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationLearnCreditLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationLearnCreditLoan', context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationLearnVehicleLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationLearnVehicleLoan', context, onSuccess, onError);
  };
  /**
     * @name CSRAssistAuthorization
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationLearnPersonalLoan = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationLearnPersonalLoan', context, onSuccess, onError);
  };

  /**
     * @name CSRAssistAuthorizationCreateApplicant
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, customerUsername : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationCreateApplicant = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationCreateApplicant', context, onSuccess, onError);
  };
  
  /**
     * @name CSRAssistAuthorizationViewSpecAccount
     * @member CustomerManagementManager.businessController
     * @param {customerid : string, accountId : string} context
     * @param (response:{statuscode : number, errormessage : string, response : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param undefined onError
     */
  CustomerManagementManager.prototype.CSRAssistAuthorizationViewSpecAccount = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CSRAssistAuthorizationViewSpecAccount', context, onSuccess, onError);
  };

  /**
     * @name getLastNCustomerSessions
     * @member CustomerManagementManager.businessController
     * @param {username : string, sessionCount : string} context
     * @param (response:{records : [{endDate : object, browser : object, ipAddress : object, channel : object, sessionId : object, operatingSystem : object, device : object, deviceId : object, startDate : object, numberOfActivities : object}], OperationStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.GetLastNCustomerSessions = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActivity', 'getLastNCustomerSessions', context, onSuccess, onError);
  };

  /**
     * @name getAllActivitiesInACustomerSession
     * @member CustomerManagementManager.businessController
     * @param {sessionId : string} context
     * @param (response:{records : [{moduleName : object, channel : object, ipAddress : object, description : object, errorCode : object, sessionId : object, eventts : object, deviceId : object, operatingSystem : object, createdOn : object, referenceId : object, createdBy : object, browser : object, id : object, activityType : object, device : object, username : object, status : object}], OperationStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.GetAllActivitiesInACustomerSession = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActivity', 'getAllActivitiesInACustomerSession', context, onSuccess, onError);
  };

  /**
     * @name getCustomerDevices
     * @member CustomerManagementManager.businessController
     * @param {$filter : string} context
     * @param (response:{opstatus : number, customer_device_information_view : [{Channel_Description : object, OperatingSystem : object, lastmodifiedts : object, Status_id : object, Channel_id : object, Registered_Date : object, Status_name : object, LastLoginTime : object, createdby : object, Customer_id : object, Device_id : object, modifiedby : object, LastUsedIp : object, DeviceName : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.GetCustomerDevices = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerDevice', 'GetCustomerDevices', context, onSuccess, onError);
  };

  /**
     * @name customerUpdateDeviceInformation
     * @member CustomerManagementManager.businessController
     * @param {Device_id : string, Customer_id : string, Status_id : string} context
     * @param (status:{Status : string, UpdateResponse : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerManagementManager.prototype.CustomerUpdateDeviceInformation = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerDevice', 'CustomerUpdateDeviceInformation', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.UpdateEstatementStatus = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerProduct', 'updateEstatementStatus', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getCustomerSearchConfiguration = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'getCustomerSearchConfiguration', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getCustomerTypes = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'getCustomerTypes', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.createOnboardingApplicant = function(context, onSuccess, onError){
    ModelManager.invoke('Applicant', 'createApplicantViaAssistedOnboarding', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getIdTypes = function(context, onSuccess, onError){
    ModelManager.invoke('IdType', 'getIdTypes', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.getCustomerSuggestions = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerAndCustomerGroup', 'getSuggestions', context, onSuccess, onError);
  };

  CustomerManagementManager.prototype.assignRequests = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'assignRequests', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getCustomerFeaturesAndActions = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'getCustomerFeaturesAndActions', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getCustomerFeaturesAndActionsCombined = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'getCustomerFeaturesAndActionsCombined', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getInfinityUserFeatureActions = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getInfinityUserFeatureActions', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getInfinityUserLimits = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getInfinityUserLimits', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.generateReport = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'generateCDPReport', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getCoreCustomerRoleFeatureActionLimits = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'getCoreCustomerRoleFeatureActionLimits', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getCoreCustomerProductRolesFeatureActionLimits = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerActions', 'getCoreCustomerProductRolesFeatureActionLimits', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getCombinedUserCount = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'getCombinedUserCount', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.searchForCustomerLinkProfiles = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'CustomerSearchProfileLink', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.linkProfileService = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'linkProfileService', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.deLinkProfileService = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'deLinkProfileService', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createBinary = function(context, onSuccess, onError){
    ModelManager.invoke('media', 'createBinary', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateBinary = function(context, onSuccess, onError){
    ModelManager.invoke('media', 'updateBinary', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getBinary = function(context, onSuccess, onError){
    ModelManager.invoke('media', 'getBinary', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.discardMessageAttachments = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'discardMessageAttachments', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createMeta = function(context, onSuccess, onError){
    var createMetaModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("media");
    var newMeta = new createMetaModel(context);
    newMeta.save(ModelManager.callBackFrom(onSuccess, onError));
    //ModelManager.invoke('media', 'save', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateMeta = function(context, onSuccess, onError){
    ModelManager.invoke('media', 'update', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createNewCustomerRequest = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'createNewCustomerRequest', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateCustomerRequest = function(context, onSuccess, onError){
    ModelManager.invoke('CustomerRequest', 'updateCustomerRequest', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createAccountUsage = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'CreateAccountUsage', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateAccountUsage = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'UpdateAccountUsage', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getAccountUsage = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'GetAccountUsage', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createTaxDetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'CreateTaxDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateTaxDetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'UpdateTaxDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getDueDiligenceDetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'GetDueDiligenceDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateCitizenshipDetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'UpdateCitizenshipDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getEmploymentdetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'GetEmploymentDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.updateEmploymentdetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'UpdateEmploymentDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createEmploymentdetails = function(context, onSuccess, onError){
    ModelManager.invoke('DueDiligence', 'CreateEmploymentDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getInfinityUser = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getInfinityUser', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.createInfinityUser = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'createInfinityUser', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.editInfinityUser = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'editInfinityUser', context, onSuccess, onError);
  };
  //customerSearchByUserName
  CustomerManagementManager.prototype.customerSearchByUserName = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'customerSearchByUserName', context, onSuccess, onError);
  };

  //UserIdSearchOperationDetailedData
  CustomerManagementManager.prototype.UserIdSearchOperationDetailedData = function(context, onSuccess, onError){
    ModelManager.invoke('Customer', 'UserIdSearchOperationDetailedData', context, onSuccess, onError);
  };


  CustomerManagementManager.prototype.getAllEligibleRelationalCustomers = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getAllEligibleRelationalCustomers', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getAssociatedCustomers = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getAssociatedCustomers', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getRelativeCoreCustomerContractDetails = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getRelativeCoreCustomerContractDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getCoreCustomerContractDetails = function(context, onSuccess, onError){
    ModelManager.invoke('InfinityUser', 'getCoreCustomerContractDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getInfinityUserServiceDefsRoles = function (context, onSuccess, onError) {
    ModelManager.invoke('InfinityUser', 'getInfinityUserServiceDefsRoles', context, onSuccess, onError);
  };
  //Added Service
  CustomerManagementManager.prototype.getCoreCustomerDetails = function (context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'getCoreCustomerDetails', context, onSuccess, onError);
  };
  CustomerManagementManager.prototype.getInfinityUserAccountsForCorecustomer = function (context, onSuccess, onError) {
    ModelManager.invoke('InfinityUser', 'getInfinityUserAccountsForCorecustomer', context, onSuccess, onError);
  };
  return CustomerManagementManager;
});
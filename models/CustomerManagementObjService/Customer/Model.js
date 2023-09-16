/*
    This is an auto generated file and any modifications to it may result in corrupted data.
*/
define([], function() {
    var BaseModel = kony.mvc.Data.BaseModel;
    var preProcessorCallback;
    var postProcessorCallback;
    var objectMetadata;
    var context = {"object" : "Customer", "objectService" : "CustomerManagementObjService"};

    var setterFunctions = {
    };

    //Create the Model Class
    function Customer(defaultValues) {
        var privateState = {};

        //Using parent constructor to create other properties req. to kony sdk
        BaseModel.call(this);

        //Defining Getter/Setters
        Object.defineProperties(this, {
        });

        //converts model object to json object.
        this.toJsonInternal = function() {
            return Object.assign({}, privateState);
        };

        //overwrites object state with provided json value in argument.
        this.fromJsonInternal = function(value) {
        };
    }

    //Setting BaseModel as Parent to this Model
    BaseModel.isParentOf(Customer);

    //Create new class level validator object
    BaseModel.Validator.call(Customer);

    var registerValidatorBackup = Customer.registerValidator;

    Customer.registerValidator = function() {
        var propName = arguments[0];
        if(!setterFunctions[propName].changed) {
            var setterBackup = setterFunctions[propName];
            setterFunctions[arguments[0]] = function() {
                if(Customer.isValid(this, propName, val)) {
                    return setterBackup.apply(null, arguments);
                } else {
                    throw Error("Validation failed for " + propName + " : " + val);
                }
            }
            setterFunctions[arguments[0]].changed = true;
        }
        return registerValidatorBackup.apply(null, arguments);
    }

    //Extending Model for custom operations
    //For Operation 'CSRAssistAuthorizationApplyVehicleLoan' with service id 'CSRAssistAuthorizationApplyVehicleLoan4955'
     Customer.CSRAssistAuthorizationApplyVehicleLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationApplyVehicleLoan', params, onCompletion);
     };

    //For Operation 'generateCDPReport' with service id 'GenerateCDPReport6571'
     Customer.generateCDPReport = function(params, onCompletion){
        return Customer.customVerb('generateCDPReport', params, onCompletion);
     };

    //For Operation 'getCustomerTypes' with service id 'GetCustomerTypes5392'
     Customer.getCustomerTypes = function(params, onCompletion){
        return Customer.customVerb('getCustomerTypes', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationNativeApplication' with service id 'CSRAssistAuthorizationNativeApplication5759'
     Customer.CSRAssistAuthorizationNativeApplication = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationNativeApplication', params, onCompletion);
     };

    //For Operation 'GetBasicInfo' with service id 'GetBasicInfo8229'
     Customer.GetBasicInfo = function(params, onCompletion){
        return Customer.customVerb('GetBasicInfo', params, onCompletion);
     };

    //For Operation 'getCustomerIdentifiers' with service id 'GetCustomerIdentifiers7004'
     Customer.getCustomerIdentifiers = function(params, onCompletion){
        return Customer.customVerb('getCustomerIdentifiers', params, onCompletion);
     };

    //For Operation 'createPartyUser' with service id 'createPartyUser8072'
     Customer.createPartyUser = function(params, onCompletion){
        return Customer.customVerb('createPartyUser', params, onCompletion);
     };

    //For Operation 'searchPartyUser' with service id 'searchPartyUser4736'
     Customer.searchPartyUser = function(params, onCompletion){
        return Customer.customVerb('searchPartyUser', params, onCompletion);
     };

    //For Operation 'GetApplicantInfo' with service id 'GetApplicantInfo6631'
     Customer.GetApplicantInfo = function(params, onCompletion){
        return Customer.customVerb('GetApplicantInfo', params, onCompletion);
     };

    //For Operation 'download' with service id 'downloadCustomerResults4395'
     Customer.download = function(params, onCompletion){
        return Customer.customVerb('download', params, onCompletion);
     };

    //For Operation 'EditCustomerBasicInfo' with service id 'EditCustomerBasicInfo8668'
     Customer.EditCustomerBasicInfo = function(params, onCompletion){
        return Customer.customVerb('EditCustomerBasicInfo', params, onCompletion);
     };

    //For Operation 'GetAddressTypes' with service id 'GetAddressTypes7670'
     Customer.GetAddressTypes = function(params, onCompletion){
        return Customer.customVerb('GetAddressTypes', params, onCompletion);
     };

    //For Operation 'fetchCustomerDetailsForOlb' with service id 'getCustomerDetailsForOlb8620'
     Customer.fetchCustomerDetailsForOlb = function(params, onCompletion){
        return Customer.customVerb('fetchCustomerDetailsForOlb', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationApplyCreditLoan' with service id 'CSRAssistAuthorizationApplyCreditLoan2681'
     Customer.CSRAssistAuthorizationApplyCreditLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationApplyCreditLoan', params, onCompletion);
     };

    //For Operation 'customerSearchByUserName' with service id 'customerSearchByUserName8819'
     Customer.customerSearchByUserName = function(params, onCompletion){
        return Customer.customVerb('customerSearchByUserName', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationLearnPersonalLoan' with service id 'CSRAssistAuthorizationLearnPersonalLoan5680'
     Customer.CSRAssistAuthorizationLearnPersonalLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationLearnPersonalLoan', params, onCompletion);
     };

    //For Operation 'GetStatus' with service id 'GetStatus9799'
     Customer.GetStatus = function(params, onCompletion){
        return Customer.customVerb('GetStatus', params, onCompletion);
     };

    //For Operation 'downloadCustomerCSV' with service id 'downloadCustomerCSV5838'
     Customer.downloadCustomerCSV = function(params, onCompletion){
        return Customer.customVerb('downloadCustomerCSV', params, onCompletion);
     };

    //For Operation 'CSRAssistCustomerOnboardingResumeApp' with service id 'CSRAssistCustomerOnboardingResumeApp3010'
     Customer.CSRAssistCustomerOnboardingResumeApp = function(params, onCompletion){
        return Customer.customVerb('CSRAssistCustomerOnboardingResumeApp', params, onCompletion);
     };

    //For Operation 'GetCustomerAccountDetails' with service id 'GetCustomerAccountDetails9529'
     Customer.GetCustomerAccountDetails = function(params, onCompletion){
        return Customer.customVerb('GetCustomerAccountDetails', params, onCompletion);
     };

    //For Operation 'updateDBPUserStatus' with service id 'updateDBPUserStatus6095'
     Customer.updateDBPUserStatus = function(params, onCompletion){
        return Customer.customVerb('updateDBPUserStatus', params, onCompletion);
     };

    //For Operation 'CSRAssistCustomerOnboarding' with service id 'CSRAssistCustomerOnboarding3034'
     Customer.CSRAssistCustomerOnboarding = function(params, onCompletion){
        return Customer.customVerb('CSRAssistCustomerOnboarding', params, onCompletion);
     };

    //For Operation 'getCustomerActions' with service id 'getCustomerActions2229'
     Customer.getCustomerActions = function(params, onCompletion){
        return Customer.customVerb('getCustomerActions', params, onCompletion);
     };

    //For Operation 'deLinkProfileService' with service id 'deLinkProfileService7711'
     Customer.deLinkProfileService = function(params, onCompletion){
        return Customer.customVerb('deLinkProfileService', params, onCompletion);
     };

    //For Operation 'createDMSUser' with service id 'createDMSUser3372'
     Customer.createDMSUser = function(params, onCompletion){
        return Customer.customVerb('createDMSUser', params, onCompletion);
     };

    //For Operation 'enrolledCustomerSearch' with service id 'enrolledCustomerSearch2836'
     Customer.enrolledCustomerSearch = function(params, onCompletion){
        return Customer.customVerb('enrolledCustomerSearch', params, onCompletion);
     };

    //For Operation 'CSRAssistProspectOnboardingResumeApp' with service id 'CSRAssistProspectOnboardingResumeApp1283'
     Customer.CSRAssistProspectOnboardingResumeApp = function(params, onCompletion){
        return Customer.customVerb('CSRAssistProspectOnboardingResumeApp', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationResumeLoan' with service id 'CSRAssistAuthorizationResumeLoan2839'
     Customer.CSRAssistAuthorizationResumeLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationResumeLoan', params, onCompletion);
     };

    //For Operation 'NumberValidation' with service id 'PhoneNumberValidation5875'
     Customer.NumberValidation = function(params, onCompletion){
        return Customer.customVerb('NumberValidation', params, onCompletion);
     };

    //For Operation 'CustomerLegalEntitiesGetOperation' with service id 'CustomerLegalEntitiesGetOperation8589'
     Customer.CustomerLegalEntitiesGetOperation = function(params, onCompletion){
        return Customer.customVerb('CustomerLegalEntitiesGetOperation', params, onCompletion);
     };

    //For Operation 'checkProspectStatus' with service id 'CheckProspectStatus9639'
     Customer.checkProspectStatus = function(params, onCompletion){
        return Customer.customVerb('checkProspectStatus', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorization' with service id 'CSRAssistAuthorization4896'
     Customer.CSRAssistAuthorization = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorization', params, onCompletion);
     };

    //For Operation 'sendResetPasswordLink' with service id 'sendResetPasswordLink6592'
     Customer.sendResetPasswordLink = function(params, onCompletion){
        return Customer.customVerb('sendResetPasswordLink', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationLearnCreditLoan' with service id 'CSRAssistAuthorizationLearnCreditLoan9392'
     Customer.CSRAssistAuthorizationLearnCreditLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationLearnCreditLoan', params, onCompletion);
     };

    //For Operation 'UserIdSearchOperationDetailedData' with service id 'UserIdSearchOperationDetailedData8922'
     Customer.UserIdSearchOperationDetailedData = function(params, onCompletion){
        return Customer.customVerb('UserIdSearchOperationDetailedData', params, onCompletion);
     };

    //For Operation 'createMember' with service id 'createMember4123'
     Customer.createMember = function(params, onCompletion){
        return Customer.customVerb('createMember', params, onCompletion);
     };

    //For Operation 'getAllCompanies' with service id 'get_organisation6356'
     Customer.getAllCompanies = function(params, onCompletion){
        return Customer.customVerb('getAllCompanies', params, onCompletion);
     };

    //For Operation 'sendActivationCode' with service id 'sendActivationCode2052'
     Customer.sendActivationCode = function(params, onCompletion){
        return Customer.customVerb('sendActivationCode', params, onCompletion);
     };

    //For Operation 'Enroll' with service id 'EnrollUser7195'
     Customer.Enroll = function(params, onCompletion){
        return Customer.customVerb('Enroll', params, onCompletion);
     };

    //For Operation 'GetCustomerLockStatus' with service id 'GetCustomerLockStatus2884'
     Customer.GetCustomerLockStatus = function(params, onCompletion){
        return Customer.customVerb('GetCustomerLockStatus', params, onCompletion);
     };

    //For Operation 'GetCustomerApplications' with service id 'GetCustomerApplications1971'
     Customer.GetCustomerApplications = function(params, onCompletion){
        return Customer.customVerb('GetCustomerApplications', params, onCompletion);
     };

    //For Operation 'CustomerSearchByGroup' with service id 'CustomerSearch6017'
     Customer.CustomerSearchByGroup = function(params, onCompletion){
        return Customer.customVerb('CustomerSearchByGroup', params, onCompletion);
     };

    //For Operation 'CustomerSearch' with service id 'CustomerSearch5115'
     Customer.CustomerSearch = function(params, onCompletion){
        return Customer.customVerb('CustomerSearch', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationForOrig' with service id 'CSRAssistAuthorizationForOrig7009'
     Customer.CSRAssistAuthorizationForOrig = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationForOrig', params, onCompletion);
     };

    //For Operation 'CSRAssistLogCloseEvent' with service id 'CSRAssistLogCloseEvent7597'
     Customer.CSRAssistLogCloseEvent = function(params, onCompletion){
        return Customer.customVerb('CSRAssistLogCloseEvent', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationViewSpecAccount' with service id 'CSRAssistAuthorizationViewSpecAccount3036'
     Customer.CSRAssistAuthorizationViewSpecAccount = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationViewSpecAccount', params, onCompletion);
     };

    //For Operation 'UpdateCustomerLockStatus' with service id 'UpdateCustomerLockStatus1818'
     Customer.UpdateCustomerLockStatus = function(params, onCompletion){
        return Customer.customVerb('UpdateCustomerLockStatus', params, onCompletion);
     };

    //For Operation 'getCustomerSearchConfiguration' with service id 'getCustomerSearchConfiguration7050'
     Customer.getCustomerSearchConfiguration = function(params, onCompletion){
        return Customer.customVerb('getCustomerSearchConfiguration', params, onCompletion);
     };

    //For Operation 'getCombinedUserCount' with service id 'getCombinedUserCount1418'
     Customer.getCombinedUserCount = function(params, onCompletion){
        return Customer.customVerb('getCombinedUserCount', params, onCompletion);
     };

    //For Operation 'linkProfileService' with service id 'linkProfileService3010'
     Customer.linkProfileService = function(params, onCompletion){
        return Customer.customVerb('linkProfileService', params, onCompletion);
     };

    //For Operation 'CustomerSearchProfileLink' with service id 'customerSearchProfileLink8770'
     Customer.CustomerSearchProfileLink = function(params, onCompletion){
        return Customer.customVerb('CustomerSearchProfileLink', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationLearnVehicleLoan' with service id 'CSRAssistAuthorizationLearnVehicleLoan2442'
     Customer.CSRAssistAuthorizationLearnVehicleLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationLearnVehicleLoan', params, onCompletion);
     };

    //For Operation 'GetOnboardingApplications' with service id 'getOnboardingApplications3925'
     Customer.GetOnboardingApplications = function(params, onCompletion){
        return Customer.customVerb('GetOnboardingApplications', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationApplyPersonalLoan' with service id 'CSRAssistAuthorizationApplyPersonalLoan5824'
     Customer.CSRAssistAuthorizationApplyPersonalLoan = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationApplyPersonalLoan', params, onCompletion);
     };

    //For Operation 'CSRAssistAuthorizationCreateApplicant' with service id 'CSRAssistAuthorizationCreateApplicant2635'
     Customer.CSRAssistAuthorizationCreateApplicant = function(params, onCompletion){
        return Customer.customVerb('CSRAssistAuthorizationCreateApplicant', params, onCompletion);
     };

    //For Operation 'getInfinityAccounts' with service id 'getInfinityAccounts1641'
     Customer.getInfinityAccounts = function(params, onCompletion){
        return Customer.customVerb('getInfinityAccounts', params, onCompletion);
     };

    //For Operation 'updatePartyUser' with service id 'updatePartyUser4810'
     Customer.updatePartyUser = function(params, onCompletion){
        return Customer.customVerb('updatePartyUser', params, onCompletion);
     };

    //For Operation 'SendUnlockLinkToCustomer' with service id 'SendUnlockLinkToCustomer2278'
     Customer.SendUnlockLinkToCustomer = function(params, onCompletion){
        return Customer.customVerb('SendUnlockLinkToCustomer', params, onCompletion);
     };

    //For Operation 'importCustomersFromCSV' with service id 'importCustomersFromCSV4248'
     Customer.importCustomersFromCSV = function(params, onCompletion){
        return Customer.customVerb('importCustomersFromCSV', params, onCompletion);
     };

    //For Operation 'getFilteredCompanies' with service id 'getFilteredCompanies2688'
     Customer.getFilteredCompanies = function(params, onCompletion){
        return Customer.customVerb('getFilteredCompanies', params, onCompletion);
     };

    //For Operation 'verifyCSRToken' with service id 'verifyCSRToken4431'
     Customer.verifyCSRToken = function(params, onCompletion){
        return Customer.customVerb('verifyCSRToken', params, onCompletion);
     };

    //For Operation 'CSRAssistCustomerOnboardingNewApp' with service id 'CSRAssistCustomerOnboardingNewApp2169'
     Customer.CSRAssistCustomerOnboardingNewApp = function(params, onCompletion){
        return Customer.customVerb('CSRAssistCustomerOnboardingNewApp', params, onCompletion);
     };

    //For Operation 'IsEAgreementAvailableForUser' with service id 'IsEAgreementAvailableForUser2072'
     Customer.IsEAgreementAvailableForUser = function(params, onCompletion){
        return Customer.customVerb('IsEAgreementAvailableForUser', params, onCompletion);
     };

    var relations = [];

    Customer.relations = relations;

    Customer.prototype.isValid = function() {
        return Customer.isValid(this);
    };

    Customer.prototype.objModelName = "Customer";
    Customer.prototype.objServiceName = "CustomerManagementObjService";

    /*This API allows registration of preprocessors and postprocessors for model.
     *It also fetches object metadata for object.
     *Options Supported
     *preProcessor  - preprocessor function for use with setters.
     *postProcessor - post processor callback for use with getters.
     *getFromServer - value set to true will fetch metadata from network else from cache.
     */
    Customer.registerProcessors = function(options, successCallback, failureCallback) {

        if(!options) {
            options = {};
        }

        if(options && ((options["preProcessor"] && typeof(options["preProcessor"]) === "function") || !options["preProcessor"])) {
            preProcessorCallback = options["preProcessor"];
        }

        if(options && ((options["postProcessor"] && typeof(options["postProcessor"]) === "function") || !options["postProcessor"])) {
            postProcessorCallback = options["postProcessor"];
        }

        function metaDataSuccess(res) {
            objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
            successCallback();
        }

        function metaDataFailure(err) {
            failureCallback(err);
        }

        kony.mvc.util.ProcessorUtils.getMetadataForObject("CustomerManagementObjService", "Customer", options, metaDataSuccess, metaDataFailure);
    };

    //clone the object provided in argument.
    Customer.clone = function(objectToClone) {
        var clonedObj = new Customer();
        clonedObj.fromJsonInternal(objectToClone.toJsonInternal());
        return clonedObj;
    };

    return Customer;
});
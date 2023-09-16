define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function CustomerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	CustomerRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerRepository.prototype.constructor = CustomerRepository;

	//For Operation 'CSRAssistAuthorizationApplyVehicleLoan' with service id 'CSRAssistAuthorizationApplyVehicleLoan4955'
	CustomerRepository.prototype.CSRAssistAuthorizationApplyVehicleLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationApplyVehicleLoan', params, onCompletion);
	};

	//For Operation 'generateCDPReport' with service id 'GenerateCDPReport6571'
	CustomerRepository.prototype.generateCDPReport = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('generateCDPReport', params, onCompletion);
	};

	//For Operation 'getCustomerTypes' with service id 'GetCustomerTypes5392'
	CustomerRepository.prototype.getCustomerTypes = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getCustomerTypes', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationNativeApplication' with service id 'CSRAssistAuthorizationNativeApplication5759'
	CustomerRepository.prototype.CSRAssistAuthorizationNativeApplication = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationNativeApplication', params, onCompletion);
	};

	//For Operation 'GetBasicInfo' with service id 'GetBasicInfo8229'
	CustomerRepository.prototype.GetBasicInfo = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetBasicInfo', params, onCompletion);
	};

	//For Operation 'getCustomerIdentifiers' with service id 'GetCustomerIdentifiers7004'
	CustomerRepository.prototype.getCustomerIdentifiers = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getCustomerIdentifiers', params, onCompletion);
	};

	//For Operation 'createPartyUser' with service id 'createPartyUser8072'
	CustomerRepository.prototype.createPartyUser = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('createPartyUser', params, onCompletion);
	};

	//For Operation 'searchPartyUser' with service id 'searchPartyUser4736'
	CustomerRepository.prototype.searchPartyUser = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('searchPartyUser', params, onCompletion);
	};

	//For Operation 'GetApplicantInfo' with service id 'GetApplicantInfo6631'
	CustomerRepository.prototype.GetApplicantInfo = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetApplicantInfo', params, onCompletion);
	};

	//For Operation 'download' with service id 'downloadCustomerResults4395'
	CustomerRepository.prototype.download = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('download', params, onCompletion);
	};

	//For Operation 'EditCustomerBasicInfo' with service id 'EditCustomerBasicInfo8668'
	CustomerRepository.prototype.EditCustomerBasicInfo = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('EditCustomerBasicInfo', params, onCompletion);
	};

	//For Operation 'GetAddressTypes' with service id 'GetAddressTypes7670'
	CustomerRepository.prototype.GetAddressTypes = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetAddressTypes', params, onCompletion);
	};

	//For Operation 'fetchCustomerDetailsForOlb' with service id 'getCustomerDetailsForOlb8620'
	CustomerRepository.prototype.fetchCustomerDetailsForOlb = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('fetchCustomerDetailsForOlb', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationApplyCreditLoan' with service id 'CSRAssistAuthorizationApplyCreditLoan2681'
	CustomerRepository.prototype.CSRAssistAuthorizationApplyCreditLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationApplyCreditLoan', params, onCompletion);
	};

	//For Operation 'customerSearchByUserName' with service id 'customerSearchByUserName8819'
	CustomerRepository.prototype.customerSearchByUserName = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('customerSearchByUserName', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationLearnPersonalLoan' with service id 'CSRAssistAuthorizationLearnPersonalLoan5680'
	CustomerRepository.prototype.CSRAssistAuthorizationLearnPersonalLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationLearnPersonalLoan', params, onCompletion);
	};

	//For Operation 'GetStatus' with service id 'GetStatus9799'
	CustomerRepository.prototype.GetStatus = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetStatus', params, onCompletion);
	};

	//For Operation 'downloadCustomerCSV' with service id 'downloadCustomerCSV5838'
	CustomerRepository.prototype.downloadCustomerCSV = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('downloadCustomerCSV', params, onCompletion);
	};

	//For Operation 'CSRAssistCustomerOnboardingResumeApp' with service id 'CSRAssistCustomerOnboardingResumeApp3010'
	CustomerRepository.prototype.CSRAssistCustomerOnboardingResumeApp = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistCustomerOnboardingResumeApp', params, onCompletion);
	};

	//For Operation 'GetCustomerAccountDetails' with service id 'GetCustomerAccountDetails9529'
	CustomerRepository.prototype.GetCustomerAccountDetails = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetCustomerAccountDetails', params, onCompletion);
	};

	//For Operation 'updateDBPUserStatus' with service id 'updateDBPUserStatus6095'
	CustomerRepository.prototype.updateDBPUserStatus = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('updateDBPUserStatus', params, onCompletion);
	};

	//For Operation 'CSRAssistCustomerOnboarding' with service id 'CSRAssistCustomerOnboarding3034'
	CustomerRepository.prototype.CSRAssistCustomerOnboarding = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistCustomerOnboarding', params, onCompletion);
	};

	//For Operation 'getCustomerActions' with service id 'getCustomerActions2229'
	CustomerRepository.prototype.getCustomerActions = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getCustomerActions', params, onCompletion);
	};

	//For Operation 'deLinkProfileService' with service id 'deLinkProfileService7711'
	CustomerRepository.prototype.deLinkProfileService = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('deLinkProfileService', params, onCompletion);
	};

	//For Operation 'createDMSUser' with service id 'createDMSUser3372'
	CustomerRepository.prototype.createDMSUser = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('createDMSUser', params, onCompletion);
	};

	//For Operation 'enrolledCustomerSearch' with service id 'enrolledCustomerSearch2836'
	CustomerRepository.prototype.enrolledCustomerSearch = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('enrolledCustomerSearch', params, onCompletion);
	};

	//For Operation 'CSRAssistProspectOnboardingResumeApp' with service id 'CSRAssistProspectOnboardingResumeApp1283'
	CustomerRepository.prototype.CSRAssistProspectOnboardingResumeApp = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistProspectOnboardingResumeApp', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationResumeLoan' with service id 'CSRAssistAuthorizationResumeLoan2839'
	CustomerRepository.prototype.CSRAssistAuthorizationResumeLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationResumeLoan', params, onCompletion);
	};

	//For Operation 'NumberValidation' with service id 'PhoneNumberValidation5875'
	CustomerRepository.prototype.NumberValidation = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('NumberValidation', params, onCompletion);
	};

	//For Operation 'CustomerLegalEntitiesGetOperation' with service id 'CustomerLegalEntitiesGetOperation8589'
	CustomerRepository.prototype.CustomerLegalEntitiesGetOperation = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CustomerLegalEntitiesGetOperation', params, onCompletion);
	};

	//For Operation 'checkProspectStatus' with service id 'CheckProspectStatus9639'
	CustomerRepository.prototype.checkProspectStatus = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('checkProspectStatus', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorization' with service id 'CSRAssistAuthorization4896'
	CustomerRepository.prototype.CSRAssistAuthorization = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorization', params, onCompletion);
	};

	//For Operation 'sendResetPasswordLink' with service id 'sendResetPasswordLink6592'
	CustomerRepository.prototype.sendResetPasswordLink = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('sendResetPasswordLink', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationLearnCreditLoan' with service id 'CSRAssistAuthorizationLearnCreditLoan9392'
	CustomerRepository.prototype.CSRAssistAuthorizationLearnCreditLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationLearnCreditLoan', params, onCompletion);
	};

	//For Operation 'UserIdSearchOperationDetailedData' with service id 'UserIdSearchOperationDetailedData8922'
	CustomerRepository.prototype.UserIdSearchOperationDetailedData = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('UserIdSearchOperationDetailedData', params, onCompletion);
	};

	//For Operation 'createMember' with service id 'createMember4123'
	CustomerRepository.prototype.createMember = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('createMember', params, onCompletion);
	};

	//For Operation 'getAllCompanies' with service id 'get_organisation6356'
	CustomerRepository.prototype.getAllCompanies = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getAllCompanies', params, onCompletion);
	};

	//For Operation 'sendActivationCode' with service id 'sendActivationCode2052'
	CustomerRepository.prototype.sendActivationCode = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('sendActivationCode', params, onCompletion);
	};

	//For Operation 'Enroll' with service id 'EnrollUser7195'
	CustomerRepository.prototype.Enroll = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('Enroll', params, onCompletion);
	};

	//For Operation 'GetCustomerLockStatus' with service id 'GetCustomerLockStatus2884'
	CustomerRepository.prototype.GetCustomerLockStatus = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetCustomerLockStatus', params, onCompletion);
	};

	//For Operation 'GetCustomerApplications' with service id 'GetCustomerApplications1971'
	CustomerRepository.prototype.GetCustomerApplications = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetCustomerApplications', params, onCompletion);
	};

	//For Operation 'CustomerSearchByGroup' with service id 'CustomerSearch6017'
	CustomerRepository.prototype.CustomerSearchByGroup = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CustomerSearchByGroup', params, onCompletion);
	};

	//For Operation 'CustomerSearch' with service id 'CustomerSearch5115'
	CustomerRepository.prototype.CustomerSearch = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CustomerSearch', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationForOrig' with service id 'CSRAssistAuthorizationForOrig7009'
	CustomerRepository.prototype.CSRAssistAuthorizationForOrig = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationForOrig', params, onCompletion);
	};

	//For Operation 'CSRAssistLogCloseEvent' with service id 'CSRAssistLogCloseEvent7597'
	CustomerRepository.prototype.CSRAssistLogCloseEvent = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistLogCloseEvent', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationViewSpecAccount' with service id 'CSRAssistAuthorizationViewSpecAccount3036'
	CustomerRepository.prototype.CSRAssistAuthorizationViewSpecAccount = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationViewSpecAccount', params, onCompletion);
	};

	//For Operation 'UpdateCustomerLockStatus' with service id 'UpdateCustomerLockStatus1818'
	CustomerRepository.prototype.UpdateCustomerLockStatus = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('UpdateCustomerLockStatus', params, onCompletion);
	};

	//For Operation 'getCustomerSearchConfiguration' with service id 'getCustomerSearchConfiguration7050'
	CustomerRepository.prototype.getCustomerSearchConfiguration = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getCustomerSearchConfiguration', params, onCompletion);
	};

	//For Operation 'getCombinedUserCount' with service id 'getCombinedUserCount1418'
	CustomerRepository.prototype.getCombinedUserCount = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getCombinedUserCount', params, onCompletion);
	};

	//For Operation 'linkProfileService' with service id 'linkProfileService3010'
	CustomerRepository.prototype.linkProfileService = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('linkProfileService', params, onCompletion);
	};

	//For Operation 'CustomerSearchProfileLink' with service id 'customerSearchProfileLink8770'
	CustomerRepository.prototype.CustomerSearchProfileLink = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CustomerSearchProfileLink', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationLearnVehicleLoan' with service id 'CSRAssistAuthorizationLearnVehicleLoan2442'
	CustomerRepository.prototype.CSRAssistAuthorizationLearnVehicleLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationLearnVehicleLoan', params, onCompletion);
	};

	//For Operation 'GetOnboardingApplications' with service id 'getOnboardingApplications3925'
	CustomerRepository.prototype.GetOnboardingApplications = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('GetOnboardingApplications', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationApplyPersonalLoan' with service id 'CSRAssistAuthorizationApplyPersonalLoan5824'
	CustomerRepository.prototype.CSRAssistAuthorizationApplyPersonalLoan = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationApplyPersonalLoan', params, onCompletion);
	};

	//For Operation 'CSRAssistAuthorizationCreateApplicant' with service id 'CSRAssistAuthorizationCreateApplicant2635'
	CustomerRepository.prototype.CSRAssistAuthorizationCreateApplicant = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistAuthorizationCreateApplicant', params, onCompletion);
	};

	//For Operation 'getInfinityAccounts' with service id 'getInfinityAccounts1641'
	CustomerRepository.prototype.getInfinityAccounts = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getInfinityAccounts', params, onCompletion);
	};

	//For Operation 'updatePartyUser' with service id 'updatePartyUser4810'
	CustomerRepository.prototype.updatePartyUser = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('updatePartyUser', params, onCompletion);
	};

	//For Operation 'SendUnlockLinkToCustomer' with service id 'SendUnlockLinkToCustomer2278'
	CustomerRepository.prototype.SendUnlockLinkToCustomer = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('SendUnlockLinkToCustomer', params, onCompletion);
	};

	//For Operation 'importCustomersFromCSV' with service id 'importCustomersFromCSV4248'
	CustomerRepository.prototype.importCustomersFromCSV = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('importCustomersFromCSV', params, onCompletion);
	};

	//For Operation 'getFilteredCompanies' with service id 'getFilteredCompanies2688'
	CustomerRepository.prototype.getFilteredCompanies = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('getFilteredCompanies', params, onCompletion);
	};

	//For Operation 'verifyCSRToken' with service id 'verifyCSRToken4431'
	CustomerRepository.prototype.verifyCSRToken = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('verifyCSRToken', params, onCompletion);
	};

	//For Operation 'CSRAssistCustomerOnboardingNewApp' with service id 'CSRAssistCustomerOnboardingNewApp2169'
	CustomerRepository.prototype.CSRAssistCustomerOnboardingNewApp = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('CSRAssistCustomerOnboardingNewApp', params, onCompletion);
	};

	//For Operation 'IsEAgreementAvailableForUser' with service id 'IsEAgreementAvailableForUser2072'
	CustomerRepository.prototype.IsEAgreementAvailableForUser = function(params, onCompletion){
		return CustomerRepository.prototype.customVerb('IsEAgreementAvailableForUser', params, onCompletion);
	};

	return CustomerRepository;
})
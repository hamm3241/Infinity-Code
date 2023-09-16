define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function companyRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	companyRepository.prototype = Object.create(BaseRepository.prototype);
	companyRepository.prototype.constructor = companyRepository;

	//For Operation 'getAllAccounts' with service id 'getAllAccounts9702'
	companyRepository.prototype.getAllAccounts = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getAllAccounts', params, onCompletion);
	};

	//For Operation 'getCompanyAccounts' with service id 'getCompanyAccounts7026'
	companyRepository.prototype.getCompanyAccounts = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getCompanyAccounts', params, onCompletion);
	};

	//For Operation 'getCompanyDetails' with service id 'getCompanySearch7925'
	companyRepository.prototype.getCompanyDetails = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getCompanyDetails', params, onCompletion);
	};

	//For Operation 'getCompanyActionLimits' with service id 'getCompanyActionLimits9405'
	companyRepository.prototype.getCompanyActionLimits = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getCompanyActionLimits', params, onCompletion);
	};

	//For Operation 'getListOfCompanyByStatus' with service id 'getListOfCompanyByStatus9425'
	companyRepository.prototype.getListOfCompanyByStatus = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getListOfCompanyByStatus', params, onCompletion);
	};

	//For Operation 'createCompany' with service id 'createOrganization1924'
	companyRepository.prototype.createCompany = function(params, onCompletion){
		return companyRepository.prototype.customVerb('createCompany', params, onCompletion);
	};

	//For Operation 'suspendCompanyFeatures' with service id 'suspendCompanyFeatures6075'
	companyRepository.prototype.suspendCompanyFeatures = function(params, onCompletion){
		return companyRepository.prototype.customVerb('suspendCompanyFeatures', params, onCompletion);
	};

	//For Operation 'updateCompanyStatusToRejected' with service id 'updateCompanyStatusToRejected7524'
	companyRepository.prototype.updateCompanyStatusToRejected = function(params, onCompletion){
		return companyRepository.prototype.customVerb('updateCompanyStatusToRejected', params, onCompletion);
	};

	//For Operation 'updateCompanyStatusToActive' with service id 'updateCompanyStatusToActive9068'
	companyRepository.prototype.updateCompanyStatusToActive = function(params, onCompletion){
		return companyRepository.prototype.customVerb('updateCompanyStatusToActive', params, onCompletion);
	};

	//For Operation 'unlinkAccounts' with service id 'unlinkAccounts7098'
	companyRepository.prototype.unlinkAccounts = function(params, onCompletion){
		return companyRepository.prototype.customVerb('unlinkAccounts', params, onCompletion);
	};

	//For Operation 'getCompanyApprovalMatrix' with service id 'getCompanyApprovalMatrix5183'
	companyRepository.prototype.getCompanyApprovalMatrix = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getCompanyApprovalMatrix', params, onCompletion);
	};

	//For Operation 'fetchAccountSignatories' with service id 'fetchAccountSignatories7148'
	companyRepository.prototype.fetchAccountSignatories = function(params, onCompletion){
		return companyRepository.prototype.customVerb('fetchAccountSignatories', params, onCompletion);
	};

	//For Operation 'editCompany' with service id 'editOrganization5424'
	companyRepository.prototype.editCompany = function(params, onCompletion){
		return companyRepository.prototype.customVerb('editCompany', params, onCompletion);
	};

	//For Operation 'getMembershipDetails' with service id 'getMembershipDetails2406'
	companyRepository.prototype.getMembershipDetails = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getMembershipDetails', params, onCompletion);
	};

	//For Operation 'getCompanySignatories' with service id 'getCompanySignatories1972'
	companyRepository.prototype.getCompanySignatories = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getCompanySignatories', params, onCompletion);
	};

	//For Operation 'verifyOFACandCIP' with service id 'verifyOFACandCIP7054'
	companyRepository.prototype.verifyOFACandCIP = function(params, onCompletion){
		return companyRepository.prototype.customVerb('verifyOFACandCIP', params, onCompletion);
	};

	//For Operation 'validateTIN' with service id 'validateTIN4532'
	companyRepository.prototype.validateTIN = function(params, onCompletion){
		return companyRepository.prototype.customVerb('validateTIN', params, onCompletion);
	};

	//For Operation 'getCompanyCustomers' with service id 'getCompanyCustomers1823'
	companyRepository.prototype.getCompanyCustomers = function(params, onCompletion){
		return companyRepository.prototype.customVerb('getCompanyCustomers', params, onCompletion);
	};

	return companyRepository;
})
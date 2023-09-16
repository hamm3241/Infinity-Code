define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ContractRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ContractRepository.prototype = Object.create(BaseRepository.prototype);
	ContractRepository.prototype.constructor = ContractRepository;

	//For Operation 'editContract' with service id 'editContract4893'
	ContractRepository.prototype.editContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('editContract', params, onCompletion);
	};

	//For Operation 'searchContract' with service id 'searchContract9389'
	ContractRepository.prototype.searchContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('searchContract', params, onCompletion);
	};

	//For Operation 'getCoreRelativeCustomers' with service id 'getCoreRelativeCustomers9183'
	ContractRepository.prototype.getCoreRelativeCustomers = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreRelativeCustomers', params, onCompletion);
	};

	//For Operation 'getListOfContractsByStatus' with service id 'getListOfContractsByStatus5202'
	ContractRepository.prototype.getListOfContractsByStatus = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getListOfContractsByStatus', params, onCompletion);
	};

	//For Operation 'getContractFeatureActionLimits' with service id 'getContractFeatureActionLimits9537'
	ContractRepository.prototype.getContractFeatureActionLimits = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractFeatureActionLimits', params, onCompletion);
	};

	//For Operation 'searchCoreCustomers' with service id 'searchCoreCustomers9816'
	ContractRepository.prototype.searchCoreCustomers = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('searchCoreCustomers', params, onCompletion);
	};

	//For Operation 'getContractInfinityUsers' with service id 'getContractInfinityUsers4359'
	ContractRepository.prototype.getContractInfinityUsers = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractInfinityUsers', params, onCompletion);
	};

	//For Operation 'getContractDetails' with service id 'getContractDetails9946'
	ContractRepository.prototype.getContractDetails = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractDetails', params, onCompletion);
	};

	//For Operation 'getContractAccounts' with service id 'getContractAccounts6743'
	ContractRepository.prototype.getContractAccounts = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getContractAccounts', params, onCompletion);
	};

	//For Operation 'createContract' with service id 'createContract8985'
	ContractRepository.prototype.createContract = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('createContract', params, onCompletion);
	};

	//For Operation 'getCoreCustomerAccounts' with service id 'getCoreCustomerAccounts1587'
	ContractRepository.prototype.getCoreCustomerAccounts = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreCustomerAccounts', params, onCompletion);
	};

	//For Operation 'updateContractStatus' with service id 'updateContractStatus3562'
	ContractRepository.prototype.updateContractStatus = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('updateContractStatus', params, onCompletion);
	};

	//For Operation 'getCoreCustomerDetails' with service id 'getCoreCustomerDetails9194'
	ContractRepository.prototype.getCoreCustomerDetails = function(params, onCompletion){
		return ContractRepository.prototype.customVerb('getCoreCustomerDetails', params, onCompletion);
	};

	return ContractRepository;
})
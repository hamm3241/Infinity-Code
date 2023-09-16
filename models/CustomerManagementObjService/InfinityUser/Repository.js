define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function InfinityUserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	InfinityUserRepository.prototype = Object.create(BaseRepository.prototype);
	InfinityUserRepository.prototype.constructor = InfinityUserRepository;

	//For Operation 'getInfinityUserAccounts' with service id 'getInfinityUserAccounts1836'
	InfinityUserRepository.prototype.getInfinityUserAccounts = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUserAccounts', params, onCompletion);
	};

	//For Operation 'getInfinityUserContractDetails' with service id 'getInfinityUserContractDetails5295'
	InfinityUserRepository.prototype.getInfinityUserContractDetails = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUserContractDetails', params, onCompletion);
	};

	//For Operation 'getAllEligibleRelationalCustomers' with service id 'getAllEligibleRelationalCustomers6193'
	InfinityUserRepository.prototype.getAllEligibleRelationalCustomers = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getAllEligibleRelationalCustomers', params, onCompletion);
	};

	//For Operation 'getInfinityUserAccountsForCorecustomer' with service id 'getInfinityUserAccountsForCorecustomer6990'
	InfinityUserRepository.prototype.getInfinityUserAccountsForCorecustomer = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUserAccountsForCorecustomer', params, onCompletion);
	};

	//For Operation 'getInfinityUserFeatureActions' with service id 'getInfinityUserFeatureActions1507'
	InfinityUserRepository.prototype.getInfinityUserFeatureActions = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUserFeatureActions', params, onCompletion);
	};

	//For Operation 'createInfinityUser' with service id 'createInfinityUser4150'
	InfinityUserRepository.prototype.createInfinityUser = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('createInfinityUser', params, onCompletion);
	};

	//For Operation 'getRelativeCoreCustomerContractDetails' with service id 'getRelativeCoreCustomerContractDetails2286'
	InfinityUserRepository.prototype.getRelativeCoreCustomerContractDetails = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getRelativeCoreCustomerContractDetails', params, onCompletion);
	};

	//For Operation 'getAssociatedCustomers' with service id 'getAssociatedCustomers4126'
	InfinityUserRepository.prototype.getAssociatedCustomers = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getAssociatedCustomers', params, onCompletion);
	};

	//For Operation 'editInfinityUser' with service id 'editInfinityUser4150'
	InfinityUserRepository.prototype.editInfinityUser = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('editInfinityUser', params, onCompletion);
	};

	//For Operation 'getInfinityUser' with service id 'getInfinityUser9007'
	InfinityUserRepository.prototype.getInfinityUser = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUser', params, onCompletion);
	};

	//For Operation 'getInfinityUserLimits' with service id 'getInfinityUserLimits9127'
	InfinityUserRepository.prototype.getInfinityUserLimits = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUserLimits', params, onCompletion);
	};

	//For Operation 'getInfinityUserServiceDefsRoles' with service id 'getInfinityUserServiceDefsRoles2513'
	InfinityUserRepository.prototype.getInfinityUserServiceDefsRoles = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getInfinityUserServiceDefsRoles', params, onCompletion);
	};

	//For Operation 'getCoreCustomerContractDetails' with service id 'getCoreCustomerContractDetails4650'
	InfinityUserRepository.prototype.getCoreCustomerContractDetails = function(params, onCompletion){
		return InfinityUserRepository.prototype.customVerb('getCoreCustomerContractDetails', params, onCompletion);
	};

	return InfinityUserRepository;
})
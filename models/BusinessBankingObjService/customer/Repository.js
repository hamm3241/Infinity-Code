define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function customerRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	customerRepository.prototype = Object.create(BaseRepository.prototype);
	customerRepository.prototype.constructor = customerRepository;

	//For Operation 'editCustomer' with service id 'editCustomer2093'
	customerRepository.prototype.editCustomer = function(params, onCompletion){
		return customerRepository.prototype.customVerb('editCustomer', params, onCompletion);
	};

	//For Operation 'getCustomerAccounts' with service id 'getCustomerAccounts5075'
	customerRepository.prototype.getCustomerAccounts = function(params, onCompletion){
		return customerRepository.prototype.customVerb('getCustomerAccounts', params, onCompletion);
	};

	//For Operation 'createSignatory' with service id 'createSignatory4282'
	customerRepository.prototype.createSignatory = function(params, onCompletion){
		return customerRepository.prototype.customVerb('createSignatory', params, onCompletion);
	};

	//For Operation 'createCustomer' with service id 'createCustomer9096'
	customerRepository.prototype.createCustomer = function(params, onCompletion){
		return customerRepository.prototype.customVerb('createCustomer', params, onCompletion);
	};

	//For Operation 'editSignatory' with service id 'editSignatory5330'
	customerRepository.prototype.editSignatory = function(params, onCompletion){
		return customerRepository.prototype.customVerb('editSignatory', params, onCompletion);
	};

	//For Operation 'upgradeUser' with service id 'upgradeUser2327'
	customerRepository.prototype.upgradeUser = function(params, onCompletion){
		return customerRepository.prototype.customVerb('upgradeUser', params, onCompletion);
	};

	//For Operation 'verifyUsername' with service id 'verifyUsername2376'
	customerRepository.prototype.verifyUsername = function(params, onCompletion){
		return customerRepository.prototype.customVerb('verifyUsername', params, onCompletion);
	};

	//For Operation 'fetchAuthorizedSignatories' with service id 'fetchAuthorizedSignatories7613'
	customerRepository.prototype.fetchAuthorizedSignatories = function(params, onCompletion){
		return customerRepository.prototype.customVerb('fetchAuthorizedSignatories', params, onCompletion);
	};

	//For Operation 'upgradeRolesAndEntiltlements' with service id 'upgradeRolesAndPermissions6743'
	customerRepository.prototype.upgradeRolesAndEntiltlements = function(params, onCompletion){
		return customerRepository.prototype.customVerb('upgradeRolesAndEntiltlements', params, onCompletion);
	};

	return customerRepository;
})
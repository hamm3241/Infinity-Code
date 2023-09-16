define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GroupCustomersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GroupCustomersRepository.prototype = Object.create(BaseRepository.prototype);
	GroupCustomersRepository.prototype.constructor = GroupCustomersRepository;

	//For Operation 'getGroupCustomers' with service id 'getGroupCustomers2906'
	GroupCustomersRepository.prototype.getGroupCustomers = function(params, onCompletion){
		return GroupCustomersRepository.prototype.customVerb('getGroupCustomers', params, onCompletion);
	};

	//For Operation 'getGroupBusinessTypeCustomers' with service id 'getGroupBusinessTypeCustomers3519'
	GroupCustomersRepository.prototype.getGroupBusinessTypeCustomers = function(params, onCompletion){
		return GroupCustomersRepository.prototype.customVerb('getGroupBusinessTypeCustomers', params, onCompletion);
	};

	return GroupCustomersRepository;
})
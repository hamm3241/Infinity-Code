define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function businesstypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	businesstypeRepository.prototype = Object.create(BaseRepository.prototype);
	businesstypeRepository.prototype.constructor = businesstypeRepository;

	//For Operation 'createBusinessType' with service id 'createBusinessType4284'
	businesstypeRepository.prototype.createBusinessType = function(params, onCompletion){
		return businesstypeRepository.prototype.customVerb('createBusinessType', params, onCompletion);
	};

	//For Operation 'getBusinessTypeGroups' with service id 'getBusinessTypeGroups9005'
	businesstypeRepository.prototype.getBusinessTypeGroups = function(params, onCompletion){
		return businesstypeRepository.prototype.customVerb('getBusinessTypeGroups', params, onCompletion);
	};

	//For Operation 'getBusinessTypes' with service id 'getBusinessTypes4872'
	businesstypeRepository.prototype.getBusinessTypes = function(params, onCompletion){
		return businesstypeRepository.prototype.customVerb('getBusinessTypes', params, onCompletion);
	};

	//For Operation 'deleteBusinessType' with service id 'deleteBusinessType2650'
	businesstypeRepository.prototype.deleteBusinessType = function(params, onCompletion){
		return businesstypeRepository.prototype.customVerb('deleteBusinessType', params, onCompletion);
	};

	//For Operation 'updateBusinessType' with service id 'updateBusinessType1948'
	businesstypeRepository.prototype.updateBusinessType = function(params, onCompletion){
		return businesstypeRepository.prototype.customVerb('updateBusinessType', params, onCompletion);
	};

	//For Operation 'getBusinessTypeCustomers' with service id 'getBusinessTypeCustomers4516'
	businesstypeRepository.prototype.getBusinessTypeCustomers = function(params, onCompletion){
		return businesstypeRepository.prototype.customVerb('getBusinessTypeCustomers', params, onCompletion);
	};

	return businesstypeRepository;
})
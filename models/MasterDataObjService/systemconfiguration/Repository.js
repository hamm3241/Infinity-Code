define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function systemconfigurationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	systemconfigurationRepository.prototype = Object.create(BaseRepository.prototype);
	systemconfigurationRepository.prototype.constructor = systemconfigurationRepository;

	//For Operation 'getSystemConfiguration' with service id 'get_systemconfiguration7161'
	systemconfigurationRepository.prototype.getSystemConfiguration = function(params,onCompletion){
		return systemconfigurationRepository.prototype.customVerb('getSystemConfiguration',params, onCompletion);
	};
	//For Operation 'updateSystemConfiguration' with service id 'updateSystemConfigurationService1319'
	systemconfigurationRepository.prototype.updateSystemConfiguration = function(params,onCompletion){
		return systemconfigurationRepository.prototype.customVerb('updateSystemConfiguration',params, onCompletion);
	};
	
	
	return systemconfigurationRepository;
})
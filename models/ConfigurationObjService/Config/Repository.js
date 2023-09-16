define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ConfigRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ConfigRepository.prototype = Object.create(BaseRepository.prototype);
	ConfigRepository.prototype.constructor = ConfigRepository;

	//For Operation 'getConfigurations' with service id 'getConfigurations4886'
	ConfigRepository.prototype.getConfigurations = function(params, onCompletion){
		return ConfigRepository.prototype.customVerb('getConfigurations', params, onCompletion);
	};

	return ConfigRepository;
})
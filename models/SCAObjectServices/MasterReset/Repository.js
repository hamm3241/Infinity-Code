define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function MasterResetRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	MasterResetRepository.prototype = Object.create(BaseRepository.prototype);
	MasterResetRepository.prototype.constructor = MasterResetRepository;

	//For Operation 'reset' with service id 'masterReset1138'
	MasterResetRepository.prototype.reset = function(params, onCompletion){
		return MasterResetRepository.prototype.customVerb('reset', params, onCompletion);
	};

	return MasterResetRepository;
})
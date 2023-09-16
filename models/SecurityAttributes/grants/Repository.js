define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function grantsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	grantsRepository.prototype = Object.create(BaseRepository.prototype);
	grantsRepository.prototype.constructor = grantsRepository;

	//For Operation 'getAllowedOperations' with service id 'getAllowedOperations1525'
	grantsRepository.prototype.getAllowedOperations = function(params,onCompletion){
		return grantsRepository.prototype.customVerb('getAllowedOperations',params, onCompletion);
	};
	
	
	return grantsRepository;
})
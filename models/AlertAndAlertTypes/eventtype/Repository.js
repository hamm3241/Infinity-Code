define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function eventtypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	eventtypeRepository.prototype = Object.create(BaseRepository.prototype);
	eventtypeRepository.prototype.constructor = eventtypeRepository;

	//For Operation 'getEventTypes' with service id 'getEventTypes5694'
	eventtypeRepository.prototype.getEventTypes = function(params,onCompletion){
		return eventtypeRepository.prototype.customVerb('getEventTypes',params, onCompletion);
	};
	
	
	return eventtypeRepository;
})
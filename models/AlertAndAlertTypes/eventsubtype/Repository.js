define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function eventsubtypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	eventsubtypeRepository.prototype = Object.create(BaseRepository.prototype);
	eventsubtypeRepository.prototype.constructor = eventsubtypeRepository;

	//For Operation 'getEventSubTypes' with service id 'getEventSubTypes9069'
	eventsubtypeRepository.prototype.getEventSubTypes = function(params, onCompletion){
		return eventsubtypeRepository.prototype.customVerb('getEventSubTypes', params, onCompletion);
	};

	return eventsubtypeRepository;
})
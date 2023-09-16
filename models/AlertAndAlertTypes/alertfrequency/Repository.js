define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function alertfrequencyRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	alertfrequencyRepository.prototype = Object.create(BaseRepository.prototype);
	alertfrequencyRepository.prototype.constructor = alertfrequencyRepository;

	//For Operation 'getAlertFrequency' with service id 'getAlertFrequency7070'
	alertfrequencyRepository.prototype.getAlertFrequency = function(params, onCompletion){
		return alertfrequencyRepository.prototype.customVerb('getAlertFrequency', params, onCompletion);
	};

	return alertfrequencyRepository;
})
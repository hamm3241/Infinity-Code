define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function alertrecipientRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	alertrecipientRepository.prototype = Object.create(BaseRepository.prototype);
	alertrecipientRepository.prototype.constructor = alertrecipientRepository;

	//For Operation 'getAlertRecipientTypes' with service id 'getAlertRecipientTypes1540'
	alertrecipientRepository.prototype.getAlertRecipientTypes = function(params, onCompletion){
		return alertrecipientRepository.prototype.customVerb('getAlertRecipientTypes', params, onCompletion);
	};

	return alertrecipientRepository;
})
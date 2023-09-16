define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alertcontentfieldRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alertcontentfieldRepository.prototype = Object.create(BaseRepository.prototype);
	alertcontentfieldRepository.prototype.constructor = alertcontentfieldRepository;

	//For Operation 'getAlertContentFields' with service id 'getAlertContentFields1951'
	alertcontentfieldRepository.prototype.getAlertContentFields = function(params,onCompletion){
		return alertcontentfieldRepository.prototype.customVerb('getAlertContentFields',params, onCompletion);
	};
	
	
	return alertcontentfieldRepository;
})
define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alertattributeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alertattributeRepository.prototype = Object.create(BaseRepository.prototype);
	alertattributeRepository.prototype.constructor = alertattributeRepository;

	//For Operation 'getAlertAttributes' with service id 'getAlertAttributes3717'
	alertattributeRepository.prototype.getAlertAttributes = function(params,onCompletion){
		return alertattributeRepository.prototype.customVerb('getAlertAttributes',params, onCompletion);
	};
	
	
	return alertattributeRepository;
})
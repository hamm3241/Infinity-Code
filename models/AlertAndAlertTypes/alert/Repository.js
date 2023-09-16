define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alertRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alertRepository.prototype = Object.create(BaseRepository.prototype);
	alertRepository.prototype.constructor = alertRepository;

	//For Operation 'updateAlert' with service id 'updateAlert6838'
	alertRepository.prototype.updateAlert = function(params,onCompletion){
		return alertRepository.prototype.customVerb('updateAlert',params, onCompletion);
	};
	//For Operation 'deleteAlert' with service id 'deleteAlert1017'
	alertRepository.prototype.deleteAlert = function(params,onCompletion){
		return alertRepository.prototype.customVerb('deleteAlert',params, onCompletion);
	};
	//For Operation 'getAlertAndAlertTypes' with service id 'getAlertTypesAndAlerts5216'
	alertRepository.prototype.getAlertAndAlertTypes = function(params,onCompletion){
		return alertRepository.prototype.customVerb('getAlertAndAlertTypes',params, onCompletion);
	};
	
	
	return alertRepository;
})
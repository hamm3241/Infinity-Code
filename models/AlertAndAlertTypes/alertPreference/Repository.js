define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alertPreferenceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alertPreferenceRepository.prototype = Object.create(BaseRepository.prototype);
	alertPreferenceRepository.prototype.constructor = alertPreferenceRepository;

	//For Operation 'getAlerts' with service id 'fetchAlertPreferences6702'
	alertPreferenceRepository.prototype.getAlerts = function(params,onCompletion){
		return alertPreferenceRepository.prototype.customVerb('getAlerts',params, onCompletion);
	};
	//For Operation 'updateAlerts' with service id 'updateAlertPreferences4395'
	alertPreferenceRepository.prototype.updateAlerts = function(params,onCompletion){
		return alertPreferenceRepository.prototype.customVerb('updateAlerts',params, onCompletion);
	};
	//For Operation 'setAlertPreferences' with service id 'setAlertPreferences9883'
	alertPreferenceRepository.prototype.setAlertPreferences = function(params,onCompletion){
		return alertPreferenceRepository.prototype.customVerb('setAlertPreferences',params, onCompletion);
	};
	
	
	return alertPreferenceRepository;
})
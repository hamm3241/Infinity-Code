define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alertconditionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alertconditionRepository.prototype = Object.create(BaseRepository.prototype);
	alertconditionRepository.prototype.constructor = alertconditionRepository;

	//For Operation 'getAlertConditions' with service id 'getAlertConditions1730'
	alertconditionRepository.prototype.getAlertConditions = function(params,onCompletion){
		return alertconditionRepository.prototype.customVerb('getAlertConditions',params, onCompletion);
	};
	
	
	return alertconditionRepository;
})
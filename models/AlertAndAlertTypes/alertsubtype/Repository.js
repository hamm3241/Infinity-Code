define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function alertsubtypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	alertsubtypeRepository.prototype = Object.create(BaseRepository.prototype);
	alertsubtypeRepository.prototype.constructor = alertsubtypeRepository;

	//For Operation 'createAlertSubType' with service id 'createAlertSubType4443'
	alertsubtypeRepository.prototype.createAlertSubType = function(params, onCompletion){
		return alertsubtypeRepository.prototype.customVerb('createAlertSubType', params, onCompletion);
	};

	//For Operation 'getAlertSubTypeDefinition' with service id 'getAlertSubTypeDefinition4575'
	alertsubtypeRepository.prototype.getAlertSubTypeDefinition = function(params, onCompletion){
		return alertsubtypeRepository.prototype.customVerb('getAlertSubTypeDefinition', params, onCompletion);
	};

	//For Operation 'updateAlertSubTypeStatus' with service id 'updateAlertSubTypeStatus4000'
	alertsubtypeRepository.prototype.updateAlertSubTypeStatus = function(params, onCompletion){
		return alertsubtypeRepository.prototype.customVerb('updateAlertSubTypeStatus', params, onCompletion);
	};

	//For Operation 'editAlertSubType' with service id 'editAlertSubType7903'
	alertsubtypeRepository.prototype.editAlertSubType = function(params, onCompletion){
		return alertsubtypeRepository.prototype.customVerb('editAlertSubType', params, onCompletion);
	};

	return alertsubtypeRepository;
})
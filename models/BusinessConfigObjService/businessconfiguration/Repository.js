define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function businessconfigurationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	businessconfigurationRepository.prototype = Object.create(BaseRepository.prototype);
	businessconfigurationRepository.prototype.constructor = businessconfigurationRepository;

	//For Operation 'getAlertConfigurations' with service id 'getAlertConfigurations2071'
	businessconfigurationRepository.prototype.getAlertConfigurations = function(params, onCompletion){
		return businessconfigurationRepository.prototype.customVerb('getAlertConfigurations', params, onCompletion);
	};

	//For Operation 'editBusinessConfiguration' with service id 'editBusinessConfiguration7976'
	businessconfigurationRepository.prototype.editBusinessConfiguration = function(params, onCompletion){
		return businessconfigurationRepository.prototype.customVerb('editBusinessConfiguration', params, onCompletion);
	};

	//For Operation 'getBusinessConfigurations' with service id 'getBusinessConfigurations1506'
	businessconfigurationRepository.prototype.getBusinessConfigurations = function(params, onCompletion){
		return businessconfigurationRepository.prototype.customVerb('getBusinessConfigurations', params, onCompletion);
	};

	//For Operation 'editAlertConfiguration' with service id 'editAlertConfiguration5397'
	businessconfigurationRepository.prototype.editAlertConfiguration = function(params, onCompletion){
		return businessconfigurationRepository.prototype.customVerb('editAlertConfiguration', params, onCompletion);
	};

	//For Operation 'getCoreTypeInformation' with service id 'getCoreTypeInformation9400'
	businessconfigurationRepository.prototype.getCoreTypeInformation = function(params, onCompletion){
		return businessconfigurationRepository.prototype.customVerb('getCoreTypeInformation', params, onCompletion);
	};

	return businessconfigurationRepository;
})
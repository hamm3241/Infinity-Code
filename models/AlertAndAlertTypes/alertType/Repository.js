define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function alertTypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	alertTypeRepository.prototype = Object.create(BaseRepository.prototype);
	alertTypeRepository.prototype.constructor = alertTypeRepository;

	//For Operation 'getCustomerAlertTypePreference' with service id 'getCustomerAlertTypePreference6045'
	alertTypeRepository.prototype.getCustomerAlertTypePreference = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('getCustomerAlertTypePreference', params, onCompletion);
	};

	//For Operation 'getAlertTypeDefinition' with service id 'getAlertTypeDefinition7175'
	alertTypeRepository.prototype.getAlertTypeDefinition = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('getAlertTypeDefinition', params, onCompletion);
	};

	//For Operation 'getAccountTypes' with service id 'get_accounttype4542'
	alertTypeRepository.prototype.getAccountTypes = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('getAccountTypes', params, onCompletion);
	};

	//For Operation 'getAlertCategoriesByAccountType' with service id 'getAlertCategoriesByAccountType6038'
	alertTypeRepository.prototype.getAlertCategoriesByAccountType = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('getAlertCategoriesByAccountType', params, onCompletion);
	};

	//For Operation 'getCustomerAccountAlertSettings' with service id 'getCustomerAccountAlertSettings4192'
	alertTypeRepository.prototype.getCustomerAccountAlertSettings = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('getCustomerAccountAlertSettings', params, onCompletion);
	};

	//For Operation 'createAlertType' with service id 'createAlertType6549'
	alertTypeRepository.prototype.createAlertType = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('createAlertType', params, onCompletion);
	};

	//For Operation 'updateAlertType' with service id 'updateAlertType8630'
	alertTypeRepository.prototype.updateAlertType = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('updateAlertType', params, onCompletion);
	};

	//For Operation 'reassignAlertType' with service id 'reassignAlertType8550'
	alertTypeRepository.prototype.reassignAlertType = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('reassignAlertType', params, onCompletion);
	};

	//For Operation 'editAlertType' with service id 'editAlertType6322'
	alertTypeRepository.prototype.editAlertType = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('editAlertType', params, onCompletion);
	};

	//For Operation 'reorderAlertType' with service id 'reorderAlertType2337'
	alertTypeRepository.prototype.reorderAlertType = function(params, onCompletion){
		return alertTypeRepository.prototype.customVerb('reorderAlertType', params, onCompletion);
	};

	return alertTypeRepository;
})
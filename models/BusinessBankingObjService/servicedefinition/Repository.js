define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function servicedefinitionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	servicedefinitionRepository.prototype = Object.create(BaseRepository.prototype);
	servicedefinitionRepository.prototype.constructor = servicedefinitionRepository;

	//For Operation 'getServiceDefinitionMonetaryActions' with service id 'getServiceDefinitionMonetaryActions5203'
	servicedefinitionRepository.prototype.getServiceDefinitionMonetaryActions = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinitionMonetaryActions', params, onCompletion);
	};

	//For Operation 'deleteServiceDefinition' with service id 'deleteServiceDefinition8080'
	servicedefinitionRepository.prototype.deleteServiceDefinition = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('deleteServiceDefinition', params, onCompletion);
	};

	//For Operation 'getServiceDefinitionProductIdPermissions' with service id 'getServiceDefinitionProductIdPermissions1835'
	servicedefinitionRepository.prototype.getServiceDefinitionProductIdPermissions = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinitionProductIdPermissions', params, onCompletion);
	};
       //For Operation 'getServiceDefinitionsForContracts' with service id 'getServiceDefinitionsForContracts1013'
	servicedefinitionRepository.prototype.getServiceDefinitionsForContracts = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinitionsForContracts', params, onCompletion);
	};

	//For Operation 'createServiceDefinition' with service id 'createServiceDefinition7525'
	servicedefinitionRepository.prototype.createServiceDefinition = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('createServiceDefinition', params, onCompletion);
	};

	//For Operation 'getServicedefinitionAndRoleFeatures' with service id 'getServicedefinitionAndRoleFeatures9730'
	servicedefinitionRepository.prototype.getServicedefinitionAndRoleFeatures = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServicedefinitionAndRoleFeatures', params, onCompletion);
	};

	//For Operation 'getServiceDefinition' with service id 'getServiceDefinition8278'
	servicedefinitionRepository.prototype.getServiceDefinition = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinition', params, onCompletion);
	};

	//For Operation 'getServiceDefinitionFeaturesAndLimits' with service id 'getServiceDefinitionFeaturesAndLimits2839'
	servicedefinitionRepository.prototype.getServiceDefinitionFeaturesAndLimits = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinitionFeaturesAndLimits', params, onCompletion);
	};

	//For Operation 'getServiceDefinitionActionLimit' with service id 'getServiceDefinitionActionLimit6965'
	servicedefinitionRepository.prototype.getServiceDefinitionActionLimit = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinitionActionLimit', params, onCompletion);
	};

	//For Operation 'updateDefaultRole' with service id 'updateDefaultRole6448'
	servicedefinitionRepository.prototype.updateDefaultRole = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('updateDefaultRole', params, onCompletion);
	};

	//For Operation 'editServiceDefinition' with service id 'editServiceDefinition1700'
	servicedefinitionRepository.prototype.editServiceDefinition = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('editServiceDefinition', params, onCompletion);
	};

	//For Operation 'getServiceDefinitionRoles' with service id 'getServiceDefinitionRoles7115'
	servicedefinitionRepository.prototype.getServiceDefinitionRoles = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('getServiceDefinitionRoles', params, onCompletion);
	};

	//For Operation 'manageServiceDefinitionStatus' with service id 'deactivateServiceDefinition7817'
	servicedefinitionRepository.prototype.manageServiceDefinitionStatus = function(params, onCompletion){
		return servicedefinitionRepository.prototype.customVerb('manageServiceDefinitionStatus', params, onCompletion);
	};

	return servicedefinitionRepository;
})

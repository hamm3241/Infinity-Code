define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function employeePermissionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	employeePermissionRepository.prototype = Object.create(BaseRepository.prototype);
	employeePermissionRepository.prototype.constructor = employeePermissionRepository;

	//For Operation 'getEmployeePermissionDetails' with service id 'getEmployeePermissionDetails6629'
	employeePermissionRepository.prototype.getEmployeePermissionDetails = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('getEmployeePermissionDetails', params, onCompletion);
	};

	//For Operation 'fetchLegalEntityList' with service id 'fetchLegalEntityList3278'
	employeePermissionRepository.prototype.fetchLegalEntityList = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('fetchLegalEntityList', params, onCompletion);
	};

	//For Operation 'updateEmployeePermissionStatus' with service id 'updateEmployeePermissionStatus5077'
	employeePermissionRepository.prototype.updateEmployeePermissionStatus = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('updateEmployeePermissionStatus', params, onCompletion);
	};

	//For Operation 'createEmployeePermission' with service id 'createEmployeePermission5816'
	employeePermissionRepository.prototype.createEmployeePermission = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('createEmployeePermission', params, onCompletion);
	};

	//For Operation 'getPermissionsByLegalEntities' with service id 'getPermissionsByLegalEntities2378'
	employeePermissionRepository.prototype.getPermissionsByLegalEntities = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('getPermissionsByLegalEntities', params, onCompletion);
	};

	//For Operation 'getEmployeePermissions' with service id 'getEmployeePermissions4918'
	employeePermissionRepository.prototype.getEmployeePermissions = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('getEmployeePermissions', params, onCompletion);
	};

	//For Operation 'updateEmployeePermissionDetails' with service id 'updateEmployeePermissionDetails1993'
	employeePermissionRepository.prototype.updateEmployeePermissionDetails = function(params, onCompletion){
		return employeePermissionRepository.prototype.customVerb('updateEmployeePermissionDetails', params, onCompletion);
	};

	return employeePermissionRepository;
})
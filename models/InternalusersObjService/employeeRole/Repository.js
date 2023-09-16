define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function employeeRoleRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	employeeRoleRepository.prototype = Object.create(BaseRepository.prototype);
	employeeRoleRepository.prototype.constructor = employeeRoleRepository;

	//For Operation 'getEmployeeRoles' with service id 'getEmployeeRoles4314'
	employeeRoleRepository.prototype.getEmployeeRoles = function(params, onCompletion){
		return employeeRoleRepository.prototype.customVerb('getEmployeeRoles', params, onCompletion);
	};

	//For Operation 'createEmployeeRole' with service id 'createEmployeeRole7525'
	employeeRoleRepository.prototype.createEmployeeRole = function(params, onCompletion){
		return employeeRoleRepository.prototype.customVerb('createEmployeeRole', params, onCompletion);
	};

	//For Operation 'getEmployeeRoleDetails' with service id 'getEmployeeRoleDetails9950'
	employeeRoleRepository.prototype.getEmployeeRoleDetails = function(params, onCompletion){
		return employeeRoleRepository.prototype.customVerb('getEmployeeRoleDetails', params, onCompletion);
	};

	//For Operation 'updateEmployeeRoleStatus' with service id 'updateEmployeeRoleStatus7257'
	employeeRoleRepository.prototype.updateEmployeeRoleStatus = function(params, onCompletion){
		return employeeRoleRepository.prototype.customVerb('updateEmployeeRoleStatus', params, onCompletion);
	};

	//For Operation 'updateEmployeeRoleDetails' with service id 'updateEmployeeRoleDetails7866'
	employeeRoleRepository.prototype.updateEmployeeRoleDetails = function(params, onCompletion){
		return employeeRoleRepository.prototype.customVerb('updateEmployeeRoleDetails', params, onCompletion);
	};

	return employeeRoleRepository;
})
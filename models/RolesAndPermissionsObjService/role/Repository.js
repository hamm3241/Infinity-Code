define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function roleRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	roleRepository.prototype = Object.create(BaseRepository.prototype);
	roleRepository.prototype.constructor = roleRepository;

	//For Operation 'manageRole' with service id 'manageRole7029'
	roleRepository.prototype.manageRole = function(params, onCompletion){
		return roleRepository.prototype.customVerb('manageRole', params, onCompletion);
	};

	//For Operation 'manageRoleCompositeActions' with service id 'manageRoleCompositeActions9268'
	roleRepository.prototype.manageRoleCompositeActions = function(params, onCompletion){
		return roleRepository.prototype.customVerb('manageRoleCompositeActions', params, onCompletion);
	};

	//For Operation 'getUserOrRoleCompositePermissions' with service id 'getUserOrRoleCompositePermissions7117'
	roleRepository.prototype.getUserOrRoleCompositePermissions = function(params, onCompletion){
		return roleRepository.prototype.customVerb('getUserOrRoleCompositePermissions', params, onCompletion);
	};

	//For Operation 'manageRoleCompositePermissions' with service id 'manageRoleCompositePermissions2866'
	roleRepository.prototype.manageRoleCompositePermissions = function(params, onCompletion){
		return roleRepository.prototype.customVerb('manageRoleCompositePermissions', params, onCompletion);
	};

	//For Operation 'getUserOrRoleCompositeActions' with service id 'getUserOrRoleCompositeActions2916'
	roleRepository.prototype.getUserOrRoleCompositeActions = function(params, onCompletion){
		return roleRepository.prototype.customVerb('getUserOrRoleCompositeActions', params, onCompletion);
	};

	//For Operation 'generateRolesList' with service id 'generateRolesList3278'
	roleRepository.prototype.generateRolesList = function(params, onCompletion){
		return roleRepository.prototype.customVerb('generateRolesList', params, onCompletion);
	};

	//For Operation 'createRole' with service id 'CreateRole8570'
	roleRepository.prototype.createRole = function(params, onCompletion){
		return roleRepository.prototype.customVerb('createRole', params, onCompletion);
	};

	//For Operation 'editInternalRoleToCustomerRoleMapping' with service id 'editInternalRoleToCustomerRoleMapping6530'
	roleRepository.prototype.editInternalRoleToCustomerRoleMapping = function(params, onCompletion){
		return roleRepository.prototype.customVerb('editInternalRoleToCustomerRoleMapping', params, onCompletion);
	};

	//For Operation 'getInternalRoleToCustomerRoleMapping' with service id 'getInternalRoleToCustomerRoleMapping8371'
	roleRepository.prototype.getInternalRoleToCustomerRoleMapping = function(params, onCompletion){
		return roleRepository.prototype.customVerb('getInternalRoleToCustomerRoleMapping', params, onCompletion);
	};

	//For Operation 'downloadRoleList' with service id 'downloadRoleList7484'
	roleRepository.prototype.downloadRoleList = function(params, onCompletion){
		return roleRepository.prototype.customVerb('downloadRoleList', params, onCompletion);
	};

	//For Operation 'getRoles' with service id 'get_role3876'
	roleRepository.prototype.getRoles = function(params, onCompletion){
		return roleRepository.prototype.customVerb('getRoles', params, onCompletion);
	};

	return roleRepository;
})
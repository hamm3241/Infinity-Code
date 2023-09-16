define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UsersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UsersRepository.prototype = Object.create(BaseRepository.prototype);
	UsersRepository.prototype.constructor = UsersRepository;

	//For Operation 'getPermissionsForLegalEntities' with service id 'getPermissionsForLegalEntities8710'
	UsersRepository.prototype.getPermissionsForLegalEntities = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('getPermissionsForLegalEntities', params, onCompletion);
	};

	//For Operation 'getUserType' with service id 'get_usertype9016'
	UsersRepository.prototype.getUserType = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('getUserType', params, onCompletion);
	};

	//For Operation 'manageUserCompositeActions' with service id 'manageUserCompositeActions2955'
	UsersRepository.prototype.manageUserCompositeActions = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('manageUserCompositeActions', params, onCompletion);
	};

	//For Operation 'EditInternalUser' with service id 'editInternalUser4755'
	UsersRepository.prototype.EditInternalUser = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('EditInternalUser', params, onCompletion);
	};

	//For Operation 'UpdateUserStatus' with service id 'updateUserStatus1710'
	UsersRepository.prototype.UpdateUserStatus = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('UpdateUserStatus', params, onCompletion);
	};

	//For Operation 'manageUserCompositePermissions' with service id 'manageUserCompositePermissions3308'
	UsersRepository.prototype.manageUserCompositePermissions = function(params, onCompletion){
		return UsersRepository.prototype.customVerb('manageUserCompositePermissions', params, onCompletion);
	};

	return UsersRepository;
})
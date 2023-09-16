define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function DirectAndIndirectPermissionUsersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	DirectAndIndirectPermissionUsersRepository.prototype = Object.create(BaseRepository.prototype);
	DirectAndIndirectPermissionUsersRepository.prototype.constructor = DirectAndIndirectPermissionUsersRepository;

	//For Operation 'getAllUsers' with service id 'get_systemuser_permissions_view8163'
	DirectAndIndirectPermissionUsersRepository.prototype.getAllUsers = function(params,onCompletion){
		return DirectAndIndirectPermissionUsersRepository.prototype.customVerb('getAllUsers',params, onCompletion);
	};
	
	
	return DirectAndIndirectPermissionUsersRepository;
})
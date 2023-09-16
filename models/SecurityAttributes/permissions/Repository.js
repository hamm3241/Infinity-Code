define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function permissionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	permissionsRepository.prototype = Object.create(BaseRepository.prototype);
	permissionsRepository.prototype.constructor = permissionsRepository;

	//For Operation 'getGrantedPermissions' with service id 'getGrantedPermissions3156'
	permissionsRepository.prototype.getGrantedPermissions = function(params,onCompletion){
		return permissionsRepository.prototype.customVerb('getGrantedPermissions',params, onCompletion);
	};
	
	
	return permissionsRepository;
})
define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function PermissionObjectRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	PermissionObjectRepository.prototype = Object.create(BaseRepository.prototype);
	PermissionObjectRepository.prototype.constructor = PermissionObjectRepository;

	//For Operation 'getRoles' with service id 'get_role4039'
	PermissionObjectRepository.prototype.getRoles = function(params,onCompletion){
		return PermissionObjectRepository.prototype.customVerb('getRoles',params, onCompletion);
	};
	
	
	return PermissionObjectRepository;
})
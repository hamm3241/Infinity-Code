define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function managePermissionsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	managePermissionsRepository.prototype = Object.create(BaseRepository.prototype);
	managePermissionsRepository.prototype.constructor = managePermissionsRepository;

	//For Operation 'updatePermission' with service id 'managePermission8225'
	managePermissionsRepository.prototype.updatePermission = function(params,onCompletion){
		return managePermissionsRepository.prototype.customVerb('updatePermission',params, onCompletion);
	};
	
	
	return managePermissionsRepository;
})
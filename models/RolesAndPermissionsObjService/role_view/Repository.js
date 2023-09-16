define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function role_viewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	role_viewRepository.prototype = Object.create(BaseRepository.prototype);
	role_viewRepository.prototype.constructor = role_viewRepository;

	//For Operation 'downloadRolesList' with service id 'downloadRolesList4209'
	role_viewRepository.prototype.downloadRolesList = function(params, onCompletion){
		return role_viewRepository.prototype.customVerb('downloadRolesList', params, onCompletion);
	};

	//For Operation 'getRoleList' with service id 'get_roles_view2023'
	role_viewRepository.prototype.getRoleList = function(params, onCompletion){
		return role_viewRepository.prototype.customVerb('getRoleList', params, onCompletion);
	};

	return role_viewRepository;
})
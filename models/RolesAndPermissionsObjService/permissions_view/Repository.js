define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function permissions_viewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	permissions_viewRepository.prototype = Object.create(BaseRepository.prototype);
	permissions_viewRepository.prototype.constructor = permissions_viewRepository;

	//For Operation 'downloadPermissionsList' with service id 'downloadPermissionsList3496'
	permissions_viewRepository.prototype.downloadPermissionsList = function(params, onCompletion){
		return permissions_viewRepository.prototype.customVerb('downloadPermissionsList', params, onCompletion);
	};

	//For Operation 'generatePermissionsList' with service id 'generatePermissionsList5214'
	permissions_viewRepository.prototype.generatePermissionsList = function(params, onCompletion){
		return permissions_viewRepository.prototype.customVerb('generatePermissionsList', params, onCompletion);
	};

	//For Operation 'getPermissions' with service id 'get_permissions_view1866'
	permissions_viewRepository.prototype.getPermissions = function(params, onCompletion){
		return permissions_viewRepository.prototype.customVerb('getPermissions', params, onCompletion);
	};

	//For Operation 'downloadPermissionList' with service id 'downloadPermissionList1042'
	permissions_viewRepository.prototype.downloadPermissionList = function(params, onCompletion){
		return permissions_viewRepository.prototype.customVerb('downloadPermissionList', params, onCompletion);
	};

	return permissions_viewRepository;
})
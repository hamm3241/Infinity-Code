define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GroupRepository.prototype = Object.create(BaseRepository.prototype);
	GroupRepository.prototype.constructor = GroupRepository;

	//For Operation 'downloadGroupsList' with service id 'downloadGroupsList5501'
	GroupRepository.prototype.downloadGroupsList = function(params, onCompletion){
		return GroupRepository.prototype.customVerb('downloadGroupsList', params, onCompletion);
	};

	//For Operation 'createGroup' with service id 'createGroup9799'
	GroupRepository.prototype.createGroup = function(params, onCompletion){
		return GroupRepository.prototype.customVerb('createGroup', params, onCompletion);
	};

	//For Operation 'CustomerAssignRole' with service id 'CustomerAssignRoleService3822'
	GroupRepository.prototype.CustomerAssignRole = function(params, onCompletion){
		return GroupRepository.prototype.customVerb('CustomerAssignRole', params, onCompletion);
	};

	//For Operation 'editGroup' with service id 'editGroup2800'
	GroupRepository.prototype.editGroup = function(params, onCompletion){
		return GroupRepository.prototype.customVerb('editGroup', params, onCompletion);
	};

	//For Operation 'FetchEntityStatus' with service id 'EntityStatusGetService1502'
	GroupRepository.prototype.FetchEntityStatus = function(params, onCompletion){
		return GroupRepository.prototype.customVerb('FetchEntityStatus', params, onCompletion);
	};

	//For Operation 'manageStatus' with service id 'manageStatus2919'
	GroupRepository.prototype.manageStatus = function(params, onCompletion){
		return GroupRepository.prototype.customVerb('manageStatus', params, onCompletion);
	};

	return GroupRepository;
})
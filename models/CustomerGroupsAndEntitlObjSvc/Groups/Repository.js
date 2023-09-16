define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GroupsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GroupsRepository.prototype = Object.create(BaseRepository.prototype);
	GroupsRepository.prototype.constructor = GroupsRepository;

	//For Operation 'getGroups' with service id 'getGroups4052'
	GroupsRepository.prototype.getGroups = function(params, onCompletion){
		return GroupsRepository.prototype.customVerb('getGroups', params, onCompletion);
	};

	return GroupsRepository;
})
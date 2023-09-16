define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function GroupRecordsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	GroupRecordsRepository.prototype = Object.create(BaseRepository.prototype);
	GroupRecordsRepository.prototype.constructor = GroupRecordsRepository;

	//For Operation 'getGroups' with service id 'getGroups3524'
	GroupRecordsRepository.prototype.getGroups = function(params, onCompletion){
		return GroupRecordsRepository.prototype.customVerb('getGroups', params, onCompletion);
	};

	return GroupRecordsRepository;
})
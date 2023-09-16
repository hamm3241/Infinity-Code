define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function getAndPushUsersCountRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	getAndPushUsersCountRepository.prototype = Object.create(BaseRepository.prototype);
	getAndPushUsersCountRepository.prototype.constructor = getAndPushUsersCountRepository;

	//For Operation 'getAndPushUsersCountToMeteringStore' with service id 'getAndPushUsersCountToMeteringStore9826'
	getAndPushUsersCountRepository.prototype.getAndPushUsersCountToMeteringStore = function(params, onCompletion){
		return getAndPushUsersCountRepository.prototype.customVerb('getAndPushUsersCountToMeteringStore', params, onCompletion);
	};

	return getAndPushUsersCountRepository;
})
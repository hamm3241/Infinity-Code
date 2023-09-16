define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function UserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	UserRepository.prototype = Object.create(BaseRepository.prototype);
	UserRepository.prototype.constructor = UserRepository;

	//For Operation 'updateStatus' with service id 'updateUserStatus4217'
	UserRepository.prototype.updateStatus = function(params, onCompletion){
		return UserRepository.prototype.customVerb('updateStatus', params, onCompletion);
	};

	return UserRepository;
})
define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function internalUsers_viewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	internalUsers_viewRepository.prototype = Object.create(BaseRepository.prototype);
	internalUsers_viewRepository.prototype.constructor = internalUsers_viewRepository;

	//For Operation 'downloadUserList' with service id 'downloadUserList4157'
	internalUsers_viewRepository.prototype.downloadUserList = function(params, onCompletion){
		return internalUsers_viewRepository.prototype.customVerb('downloadUserList', params, onCompletion);
	};

	//For Operation 'generateUsersList' with service id 'generateUsersList4596'
	internalUsers_viewRepository.prototype.generateUsersList = function(params, onCompletion){
		return internalUsers_viewRepository.prototype.customVerb('generateUsersList', params, onCompletion);
	};

	//For Operation 'GetUsers' with service id 'getUserList2642'
	internalUsers_viewRepository.prototype.GetUsers = function(params, onCompletion){
		return internalUsers_viewRepository.prototype.customVerb('GetUsers', params, onCompletion);
	};

	//For Operation 'downloadUsersList' with service id 'downloadUsersList4453'
	internalUsers_viewRepository.prototype.downloadUsersList = function(params, onCompletion){
		return internalUsers_viewRepository.prototype.customVerb('downloadUsersList', params, onCompletion);
	};

	return internalUsers_viewRepository;
})
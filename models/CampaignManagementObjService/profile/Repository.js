define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function profileRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	profileRepository.prototype = Object.create(BaseRepository.prototype);
	profileRepository.prototype.constructor = profileRepository;

	//For Operation 'getAndUpdateUsersForSegment' with service id 'getAndUpdateUsersForSegment6751'
	profileRepository.prototype.getAndUpdateUsersForSegment = function(params, onCompletion){
		return profileRepository.prototype.customVerb('getAndUpdateUsersForSegment', params, onCompletion);
	};

	//For Operation 'updateProfile' with service id 'updateProfile6183'
	profileRepository.prototype.updateProfile = function(params, onCompletion){
		return profileRepository.prototype.customVerb('updateProfile', params, onCompletion);
	};

	//For Operation 'createProfile' with service id 'createProfile8378'
	profileRepository.prototype.createProfile = function(params, onCompletion){
		return profileRepository.prototype.customVerb('createProfile', params, onCompletion);
	};

	//For Operation 'getProfiles' with service id 'getProfiles4415'
	profileRepository.prototype.getProfiles = function(params, onCompletion){
		return profileRepository.prototype.customVerb('getProfiles', params, onCompletion);
	};

	return profileRepository;
})
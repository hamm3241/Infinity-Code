define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function internalUserProfile_viewRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	internalUserProfile_viewRepository.prototype = Object.create(BaseRepository.prototype);
	internalUserProfile_viewRepository.prototype.constructor = internalUserProfile_viewRepository;

	//For Operation 'GetUserProfile' with service id 'getUserProfile3307'
	internalUserProfile_viewRepository.prototype.GetUserProfile = function(params,onCompletion){
		return internalUserProfile_viewRepository.prototype.customVerb('GetUserProfile',params, onCompletion);
	};
	
	
	return internalUserProfile_viewRepository;
})
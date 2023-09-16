define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function DMSUserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	DMSUserRepository.prototype = Object.create(BaseRepository.prototype);
	DMSUserRepository.prototype.constructor = DMSUserRepository;

	//For Operation 'createUser' with service id 'createDMSUser3721'
	DMSUserRepository.prototype.createUser = function(params,onCompletion){
		return DMSUserRepository.prototype.customVerb('createUser',params, onCompletion);
	};
	
	
	return DMSUserRepository;
})
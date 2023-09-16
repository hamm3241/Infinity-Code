define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AuthenticatorRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AuthenticatorRepository.prototype = Object.create(BaseRepository.prototype);
	AuthenticatorRepository.prototype.constructor = AuthenticatorRepository;

	//For Operation 'getUserAuthenticators' with service id 'getAuthenticatorDetails1568'
	AuthenticatorRepository.prototype.getUserAuthenticators = function(params, onCompletion){
		return AuthenticatorRepository.prototype.customVerb('getUserAuthenticators', params, onCompletion);
	};

	return AuthenticatorRepository;
})
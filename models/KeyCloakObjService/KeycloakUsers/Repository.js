define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function KeycloakUsersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	KeycloakUsersRepository.prototype = Object.create(BaseRepository.prototype);
	KeycloakUsersRepository.prototype.constructor = KeycloakUsersRepository;

	//For Operation 'getKeycloakUsers' with service id 'fetchKeyCloakUsers5516'
	KeycloakUsersRepository.prototype.getKeycloakUsers = function(params, onCompletion){
		return KeycloakUsersRepository.prototype.customVerb('getKeycloakUsers', params, onCompletion);
	};

	//For Operation 'getKeycloakUserRole' with service id 'fetchKeyCloakUserRole6548'
	KeycloakUsersRepository.prototype.getKeycloakUserRole = function(params, onCompletion){
		return KeycloakUsersRepository.prototype.customVerb('getKeycloakUserRole', params, onCompletion);
	};

	return KeycloakUsersRepository;
})
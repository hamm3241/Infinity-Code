define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function LoginTypeRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	LoginTypeRepository.prototype = Object.create(BaseRepository.prototype);
	LoginTypeRepository.prototype.constructor = LoginTypeRepository;

	//For Operation 'getLoginTypeConfiguration' with service id 'getLoginTypeConfiguration4354'
	LoginTypeRepository.prototype.getLoginTypeConfiguration = function(params, onCompletion){
		return LoginTypeRepository.prototype.customVerb('getLoginTypeConfiguration', params, onCompletion);
	};

	//For Operation 'getAttribute' with service id 'getAttribute2378'
	LoginTypeRepository.prototype.getAttribute = function(params, onCompletion){
		return LoginTypeRepository.prototype.customVerb('getAttribute', params, onCompletion);
	};

	return LoginTypeRepository;
})
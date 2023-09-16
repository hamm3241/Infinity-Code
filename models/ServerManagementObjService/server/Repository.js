define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function serverRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	serverRepository.prototype = Object.create(BaseRepository.prototype);
	serverRepository.prototype.constructor = serverRepository;

	//For Operation 'getServerTimeZoneOffset' with service id 'getServerTimeZoneOffset1538'
	serverRepository.prototype.getServerTimeZoneOffset = function(params,onCompletion){
		return serverRepository.prototype.customVerb('getServerTimeZoneOffset',params, onCompletion);
	};
	
	
	return serverRepository;
})
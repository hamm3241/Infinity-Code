define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function appRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	appRepository.prototype = Object.create(BaseRepository.prototype);
	appRepository.prototype.constructor = appRepository;

	//For Operation 'getApplications' with service id 'get_app8982'
	appRepository.prototype.getApplications = function(params,onCompletion){
		return appRepository.prototype.customVerb('getApplications',params, onCompletion);
	};
	
	
	return appRepository;
})
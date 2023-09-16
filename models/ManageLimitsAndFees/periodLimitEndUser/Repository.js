define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function periodLimitEndUserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	periodLimitEndUserRepository.prototype = Object.create(BaseRepository.prototype);
	periodLimitEndUserRepository.prototype.constructor = periodLimitEndUserRepository;

	//For Operation 'fetchPeriodicLimitForEndUser' with service id 'getPeriodicLimitForEndUser1251'
	periodLimitEndUserRepository.prototype.fetchPeriodicLimitForEndUser = function(params,onCompletion){
		return periodLimitEndUserRepository.prototype.customVerb('fetchPeriodicLimitForEndUser',params, onCompletion);
	};
	
	
	return periodLimitEndUserRepository;
})
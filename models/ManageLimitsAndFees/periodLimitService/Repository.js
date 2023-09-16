define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function periodLimitServiceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	periodLimitServiceRepository.prototype = Object.create(BaseRepository.prototype);
	periodLimitServiceRepository.prototype.constructor = periodLimitServiceRepository;

	//For Operation 'fetchServicePeriodicLimitsView' with service id 'getPeriodicLimitsFromServiceView4955'
	periodLimitServiceRepository.prototype.fetchServicePeriodicLimitsView = function(params,onCompletion){
		return periodLimitServiceRepository.prototype.customVerb('fetchServicePeriodicLimitsView',params, onCompletion);
	};
	
	
	return periodLimitServiceRepository;
})
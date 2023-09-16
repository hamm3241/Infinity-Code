define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerActivityRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerActivityRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerActivityRepository.prototype.constructor = CustomerActivityRepository;

	//For Operation 'getLastNCustomerSessions' with service id 'getLastNCustomerSessions3721'
	CustomerActivityRepository.prototype.getLastNCustomerSessions = function(params,onCompletion){
		return CustomerActivityRepository.prototype.customVerb('getLastNCustomerSessions',params, onCompletion);
	};
	//For Operation 'getAllActivitiesInACustomerSession' with service id 'getAllActivitiesInACustomerSession8287'
	CustomerActivityRepository.prototype.getAllActivitiesInACustomerSession = function(params,onCompletion){
		return CustomerActivityRepository.prototype.customVerb('getAllActivitiesInACustomerSession',params, onCompletion);
	};
	
	
	return CustomerActivityRepository;
})
define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alerthistoryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alerthistoryRepository.prototype = Object.create(BaseRepository.prototype);
	alerthistoryRepository.prototype.constructor = alerthistoryRepository;

	//For Operation 'getCustomerAlertHistory' with service id 'getCustomerAlertHistory7407'
	alerthistoryRepository.prototype.getCustomerAlertHistory = function(params,onCompletion){
		return alerthistoryRepository.prototype.customVerb('getCustomerAlertHistory',params, onCompletion);
	};
	
	
	return alerthistoryRepository;
})
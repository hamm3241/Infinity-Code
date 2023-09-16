define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerNotificationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerNotificationRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerNotificationRepository.prototype.constructor = CustomerNotificationRepository;

	//For Operation 'GetNotifications' with service id 'GetNotifications1005'
	CustomerNotificationRepository.prototype.GetNotifications = function(params,onCompletion){
		return CustomerNotificationRepository.prototype.customVerb('GetNotifications',params, onCompletion);
	};
	
	
	return CustomerNotificationRepository;
})
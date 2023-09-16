define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function TravelNotificationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	TravelNotificationRepository.prototype = Object.create(BaseRepository.prototype);
	TravelNotificationRepository.prototype.constructor = TravelNotificationRepository;

	//For Operation 'deleteTravelNotification' with service id 'deleteTravelNotification1376'
	TravelNotificationRepository.prototype.deleteTravelNotification = function(params,onCompletion){
		return TravelNotificationRepository.prototype.customVerb('deleteTravelNotification',params, onCompletion);
	};
	//For Operation 'cancelTravelNotification' with service id 'cancelTravelNotification6424'
	TravelNotificationRepository.prototype.cancelTravelNotification = function(params,onCompletion){
		return TravelNotificationRepository.prototype.customVerb('cancelTravelNotification',params, onCompletion);
	};
	//For Operation 'getTravelNotification' with service id 'getTravelNotification1347'
	TravelNotificationRepository.prototype.getTravelNotification = function(params,onCompletion){
		return TravelNotificationRepository.prototype.customVerb('getTravelNotification',params, onCompletion);
	};
	//For Operation 'createTravelNotification' with service id 'createTravelNotification3601'
	TravelNotificationRepository.prototype.createTravelNotification = function(params,onCompletion){
		return TravelNotificationRepository.prototype.customVerb('createTravelNotification',params, onCompletion);
	};
	//For Operation 'updateTravelNotification' with service id 'updateTraveNotification4429'
	TravelNotificationRepository.prototype.updateTravelNotification = function(params,onCompletion){
		return TravelNotificationRepository.prototype.customVerb('updateTravelNotification',params, onCompletion);
	};
	//For Operation 'getTravelNotificationStatus' with service id 'getTravelNotificationStatus4726'
	TravelNotificationRepository.prototype.getTravelNotificationStatus = function(params,onCompletion){
		return TravelNotificationRepository.prototype.customVerb('getTravelNotificationStatus',params, onCompletion);
	};
	
	
	return TravelNotificationRepository;
})
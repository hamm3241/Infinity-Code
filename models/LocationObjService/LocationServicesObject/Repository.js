define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function LocationServicesObjectRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	LocationServicesObjectRepository.prototype = Object.create(BaseRepository.prototype);
	LocationServicesObjectRepository.prototype.constructor = LocationServicesObjectRepository;

	//For Operation 'deleteLocation' with service id 'DeleteLocation1668'
	LocationServicesObjectRepository.prototype.deleteLocation = function(params,onCompletion){
		return LocationServicesObjectRepository.prototype.customVerb('deleteLocation',params, onCompletion);
	};
	//For Operation 'updateLocationAndLocationServices' with service id 'UpdateLocationAndLocationServices5979'
	LocationServicesObjectRepository.prototype.updateLocationAndLocationServices = function(params,onCompletion){
		return LocationServicesObjectRepository.prototype.customVerb('updateLocationAndLocationServices',params, onCompletion);
	};
	//For Operation 'getLocationAndLocationServices' with service id 'GetLocationAndLocationServices4061'
	LocationServicesObjectRepository.prototype.getLocationAndLocationServices = function(params,onCompletion){
		return LocationServicesObjectRepository.prototype.customVerb('getLocationAndLocationServices',params, onCompletion);
	};
	//For Operation 'createLocationAndAssignServices' with service id 'CreateLocationAndLocationServices7821'
	LocationServicesObjectRepository.prototype.createLocationAndAssignServices = function(params,onCompletion){
		return LocationServicesObjectRepository.prototype.customVerb('createLocationAndAssignServices',params, onCompletion);
	};
	
	
	return LocationServicesObjectRepository;
})
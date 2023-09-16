define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function serviceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	serviceRepository.prototype = Object.create(BaseRepository.prototype);
	serviceRepository.prototype.constructor = serviceRepository;

	//For Operation 'createService' with service id 'createService8182'
	serviceRepository.prototype.createService = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('createService',params, onCompletion);
	};
	//For Operation 'updateService' with service id 'updateService8793'
	serviceRepository.prototype.updateService = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('updateService',params, onCompletion);
	};
	//For Operation 'getServicesForLogs' with service id 'getServicesForLogs7292'
	serviceRepository.prototype.getServicesForLogs = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('getServicesForLogs',params, onCompletion);
	};
	//For Operation 'downloadServicesList' with service id 'downloadServicesList9069'
	serviceRepository.prototype.downloadServicesList = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('downloadServicesList',params, onCompletion);
	};
	//For Operation 'getCategory' with service id 'getCategory3861'
	serviceRepository.prototype.getCategory = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('getCategory',params, onCompletion);
	};
	//For Operation 'getServiceTypes' with service id 'get_serviceTypes8132'
	serviceRepository.prototype.getServiceTypes = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('getServiceTypes',params, onCompletion);
	};
	//For Operation 'manageServiceStatus' with service id 'manageStatus1328'
	serviceRepository.prototype.manageServiceStatus = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('manageServiceStatus',params, onCompletion);
	};
	//For Operation 'getService' with service id 'getServiceView9025'
	serviceRepository.prototype.getService = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('getService',params, onCompletion);
	};
	//For Operation 'getServiceChannels' with service id 'getServiceChannels3590'
	serviceRepository.prototype.getServiceChannels = function(params,onCompletion){
		return serviceRepository.prototype.customVerb('getServiceChannels',params, onCompletion);
	};
	
	
	return serviceRepository;
})
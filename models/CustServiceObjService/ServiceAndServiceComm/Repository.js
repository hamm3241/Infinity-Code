define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function ServiceAndServiceCommRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	ServiceAndServiceCommRepository.prototype = Object.create(BaseRepository.prototype);
	ServiceAndServiceCommRepository.prototype.constructor = ServiceAndServiceCommRepository;

	//For Operation 'contactUs' with service id 'getCustomerServiceAndCommunicationRecords2226'
	ServiceAndServiceCommRepository.prototype.contactUs = function(params,onCompletion){
		return ServiceAndServiceCommRepository.prototype.customVerb('contactUs',params, onCompletion);
	};
	//For Operation 'editServiceAndServiceCommunicationRecords' with service id 'editServiceAndCommunicationRecords8919'
	ServiceAndServiceCommRepository.prototype.editServiceAndServiceCommunicationRecords = function(params,onCompletion){
		return ServiceAndServiceCommRepository.prototype.customVerb('editServiceAndServiceCommunicationRecords',params, onCompletion);
	};
	//For Operation 'deleteServiceAndServiceCommunicationRecords' with service id 'deleteServiceAndCommunicationRecords3776'
	ServiceAndServiceCommRepository.prototype.deleteServiceAndServiceCommunicationRecords = function(params,onCompletion){
		return ServiceAndServiceCommRepository.prototype.customVerb('deleteServiceAndServiceCommunicationRecords',params, onCompletion);
	};
	//For Operation 'createServiceAndServiceCommunicationRecords' with service id 'createServiceAndCommunicationRecords6537'
	ServiceAndServiceCommRepository.prototype.createServiceAndServiceCommunicationRecords = function(params,onCompletion){
		return ServiceAndServiceCommRepository.prototype.customVerb('createServiceAndServiceCommunicationRecords',params, onCompletion);
	};
	//For Operation 'getServiceAndServiceCommunicationRecords' with service id 'getCustomerServiceAndCommunicationRecords3348'
	ServiceAndServiceCommRepository.prototype.getServiceAndServiceCommunicationRecords = function(params,onCompletion){
		return ServiceAndServiceCommRepository.prototype.customVerb('getServiceAndServiceCommunicationRecords',params, onCompletion);
	};
	
	
	return ServiceAndServiceCommRepository;
})
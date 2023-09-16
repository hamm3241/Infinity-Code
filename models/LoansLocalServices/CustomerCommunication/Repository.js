define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerCommunicationRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerCommunicationRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerCommunicationRepository.prototype.constructor = CustomerCommunicationRepository;

	//For Operation 'GetCustomerCommunication' with service id 'CustomerCommunicationGet7255'
	CustomerCommunicationRepository.prototype.GetCustomerCommunication = function(params,onCompletion){
		return CustomerCommunicationRepository.prototype.customVerb('GetCustomerCommunication',params, onCompletion);
	};
	
	
	return CustomerCommunicationRepository;
})
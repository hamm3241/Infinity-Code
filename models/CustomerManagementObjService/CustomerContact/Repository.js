define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerContactRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerContactRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerContactRepository.prototype.constructor = CustomerContactRepository;

	//For Operation 'GetCustomerContact' with service id 'GetCustomerContactInfo2579'
	CustomerContactRepository.prototype.GetCustomerContact = function(params,onCompletion){
		return CustomerContactRepository.prototype.customVerb('GetCustomerContact',params, onCompletion);
	};
	//For Operation 'EditCustomerContact' with service id 'EditCustomerContactInfo4251'
	CustomerContactRepository.prototype.EditCustomerContact = function(params,onCompletion){
		return CustomerContactRepository.prototype.customVerb('EditCustomerContact',params, onCompletion);
	};
	
	
	return CustomerContactRepository;
})
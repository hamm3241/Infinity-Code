define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerProductRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerProductRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerProductRepository.prototype.constructor = CustomerProductRepository;

	//For Operation 'GetCustomerProducts' with service id 'GetCustomerProducts5310'
	CustomerProductRepository.prototype.GetCustomerProducts = function(params,onCompletion){
		return CustomerProductRepository.prototype.customVerb('GetCustomerProducts',params, onCompletion);
	};
	//For Operation 'GetAllProducts' with service id 'get_product3611'
	CustomerProductRepository.prototype.GetAllProducts = function(params,onCompletion){
		return CustomerProductRepository.prototype.customVerb('GetAllProducts',params, onCompletion);
	};
	//For Operation 'GetAccountSpecificAlerts' with service id 'GetAccountSpecificAlerts9991'
	CustomerProductRepository.prototype.GetAccountSpecificAlerts = function(params,onCompletion){
		return CustomerProductRepository.prototype.customVerb('GetAccountSpecificAlerts',params, onCompletion);
	};
	//For Operation 'updateEstatementStatus' with service id 'updateEstatementStatus1504'
	CustomerProductRepository.prototype.updateEstatementStatus = function(params,onCompletion){
		return CustomerProductRepository.prototype.customVerb('updateEstatementStatus',params, onCompletion);
	};
	
	
	return CustomerProductRepository;
})
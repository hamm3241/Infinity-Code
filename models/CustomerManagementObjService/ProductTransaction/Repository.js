define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function ProductTransactionRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	ProductTransactionRepository.prototype = Object.create(BaseRepository.prototype);
	ProductTransactionRepository.prototype.constructor = ProductTransactionRepository;

	//For Operation 'GetCustomerTransactions' with service id 'GetCustomerTransactions3165'
	ProductTransactionRepository.prototype.GetCustomerTransactions = function(params,onCompletion){
		return ProductTransactionRepository.prototype.customVerb('GetCustomerTransactions',params, onCompletion);
	};
	
	
	return ProductTransactionRepository;
})
define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function transactionFeesEndUserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	transactionFeesEndUserRepository.prototype = Object.create(BaseRepository.prototype);
	transactionFeesEndUserRepository.prototype.constructor = transactionFeesEndUserRepository;

	//For Operation 'fetchTransactionFeesForEndUser' with service id 'getTransactionFeesForEndUser4206'
	transactionFeesEndUserRepository.prototype.fetchTransactionFeesForEndUser = function(params,onCompletion){
		return transactionFeesEndUserRepository.prototype.customVerb('fetchTransactionFeesForEndUser',params, onCompletion);
	};
	
	
	return transactionFeesEndUserRepository;
})
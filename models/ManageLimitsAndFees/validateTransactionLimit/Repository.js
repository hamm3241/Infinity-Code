define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function validateTransactionLimitRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	validateTransactionLimitRepository.prototype = Object.create(BaseRepository.prototype);
	validateTransactionLimitRepository.prototype.constructor = validateTransactionLimitRepository;

	//For Operation 'validate' with service id 'validateTransactionLimits5266'
	validateTransactionLimitRepository.prototype.validate = function(params,onCompletion){
		return validateTransactionLimitRepository.prototype.customVerb('validate',params, onCompletion);
	};
	
	
	return validateTransactionLimitRepository;
})
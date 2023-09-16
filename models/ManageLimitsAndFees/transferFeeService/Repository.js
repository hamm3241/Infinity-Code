define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function transferFeeServiceRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	transferFeeServiceRepository.prototype = Object.create(BaseRepository.prototype);
	transferFeeServiceRepository.prototype.constructor = transferFeeServiceRepository;

	//For Operation 'getTransferFeeService' with service id 'getTransferFeeService6859'
	transferFeeServiceRepository.prototype.getTransferFeeService = function(params,onCompletion){
		return transferFeeServiceRepository.prototype.customVerb('getTransferFeeService',params, onCompletion);
	};
	
	
	return transferFeeServiceRepository;
})
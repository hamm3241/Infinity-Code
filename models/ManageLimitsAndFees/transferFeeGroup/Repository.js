define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function transferFeeGroupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	transferFeeGroupRepository.prototype = Object.create(BaseRepository.prototype);
	transferFeeGroupRepository.prototype.constructor = transferFeeGroupRepository;

	//For Operation 'fetchTransferFeeUserGroup' with service id 'getTransferFeeUserGroup4167'
	transferFeeGroupRepository.prototype.fetchTransferFeeUserGroup = function(params,onCompletion){
		return transferFeeGroupRepository.prototype.customVerb('fetchTransferFeeUserGroup',params, onCompletion);
	};
	
	
	return transferFeeGroupRepository;
})
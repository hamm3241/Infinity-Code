define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function overallPaymentLimitsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	overallPaymentLimitsRepository.prototype = Object.create(BaseRepository.prototype);
	overallPaymentLimitsRepository.prototype.constructor = overallPaymentLimitsRepository;

	//For Operation 'read' with service id 'viewOverallPaymentLimits3834'
	overallPaymentLimitsRepository.prototype.read = function(params,onCompletion){
		return overallPaymentLimitsRepository.prototype.customVerb('read',params, onCompletion);
	};
	
	
	return overallPaymentLimitsRepository;
})
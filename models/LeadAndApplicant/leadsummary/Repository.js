define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function leadsummaryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	leadsummaryRepository.prototype = Object.create(BaseRepository.prototype);
	leadsummaryRepository.prototype.constructor = leadsummaryRepository;

	//For Operation 'getStatusCountSummary' with service id 'getStatusCountSummary5955'
	leadsummaryRepository.prototype.getStatusCountSummary = function(params,onCompletion){
		return leadsummaryRepository.prototype.customVerb('getStatusCountSummary',params, onCompletion);
	};
	
	
	return leadsummaryRepository;
})
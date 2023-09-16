define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function CustomerRequestSummaryRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	CustomerRequestSummaryRepository.prototype = Object.create(BaseRepository.prototype);
	CustomerRequestSummaryRepository.prototype.constructor = CustomerRequestSummaryRepository;

	//For Operation 'getRequestSummaryCount' with service id 'getRequestSummaryCount9974'
	CustomerRequestSummaryRepository.prototype.getRequestSummaryCount = function(params,onCompletion){
		return CustomerRequestSummaryRepository.prototype.customVerb('getRequestSummaryCount',params, onCompletion);
	};
	
	
	return CustomerRequestSummaryRepository;
})
define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function ReportsInfoRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	ReportsInfoRepository.prototype = Object.create(BaseRepository.prototype);
	ReportsInfoRepository.prototype.constructor = ReportsInfoRepository;

	//For Operation 'getReportsInfo' with service id 'getReportsInfo6516'
	ReportsInfoRepository.prototype.getReportsInfo = function(params,onCompletion){
		return ReportsInfoRepository.prototype.customVerb('getReportsInfo',params, onCompletion);
	};
	
	
	return ReportsInfoRepository;
})
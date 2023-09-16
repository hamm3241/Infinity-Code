define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReportsListRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReportsListRepository.prototype = Object.create(BaseRepository.prototype);
	ReportsListRepository.prototype.constructor = ReportsListRepository;

	//For Operation 'getReportsList' with service id 'getUserReports7447'
	ReportsListRepository.prototype.getReportsList = function(params, onCompletion){
		return ReportsListRepository.prototype.customVerb('getReportsList', params, onCompletion);
	};

	return ReportsListRepository;
})
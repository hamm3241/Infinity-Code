define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function ReportFiltersRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	ReportFiltersRepository.prototype = Object.create(BaseRepository.prototype);
	ReportFiltersRepository.prototype.constructor = ReportFiltersRepository;

	//For Operation 'getReportFilters' with service id 'getFiltersForReport7584'
	ReportFiltersRepository.prototype.getReportFilters = function(params, onCompletion){
		return ReportFiltersRepository.prototype.customVerb('getReportFilters', params, onCompletion);
	};

	return ReportFiltersRepository;
})
define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function reportRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	reportRepository.prototype = Object.create(BaseRepository.prototype);
	reportRepository.prototype.constructor = reportRepository;

	//For Operation 'displayAllColumns' with service id 'displayAllColumns1818'
	reportRepository.prototype.displayAllColumns = function(params, onCompletion){
		return reportRepository.prototype.customVerb('displayAllColumns', params, onCompletion);
	};

	//For Operation 'fetchRecords' with service id 'fetchRecords9182'
	reportRepository.prototype.fetchRecords = function(params, onCompletion){
		return reportRepository.prototype.customVerb('fetchRecords', params, onCompletion);
	};

	//For Operation 'showReports' with service id 'showReports6799'
	reportRepository.prototype.showReports = function(params, onCompletion){
		return reportRepository.prototype.customVerb('showReports', params, onCompletion);
	};

	//For Operation 'saveReports' with service id 'saveReports4357'
	reportRepository.prototype.saveReports = function(params, onCompletion){
		return reportRepository.prototype.customVerb('saveReports', params, onCompletion);
	};

	return reportRepository;
})
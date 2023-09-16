define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function FabricReportsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	FabricReportsRepository.prototype = Object.create(BaseRepository.prototype);
	FabricReportsRepository.prototype.constructor = FabricReportsRepository;

	//For Operation 'getFabricReports' with service id 'getFabricReportsList9017'
	FabricReportsRepository.prototype.getFabricReports = function(params, onCompletion){
		return FabricReportsRepository.prototype.customVerb('getFabricReports', params, onCompletion);
	};

	return FabricReportsRepository;
})
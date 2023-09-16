define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function DataSourcesRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	DataSourcesRepository.prototype = Object.create(BaseRepository.prototype);
	DataSourcesRepository.prototype.constructor = DataSourcesRepository;

	//For Operation 'getDataSources' with service id 'getDataSourcesList4847'
	DataSourcesRepository.prototype.getDataSources = function(params, onCompletion){
		return DataSourcesRepository.prototype.customVerb('getDataSources', params, onCompletion);
	};

	return DataSourcesRepository;
})
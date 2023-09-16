define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function AnalyticsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	AnalyticsRepository.prototype = Object.create(BaseRepository.prototype);
	AnalyticsRepository.prototype.constructor = AnalyticsRepository;

	//For Operation 'GetJWTToken' with service id 'GetJWTToken4327'
	AnalyticsRepository.prototype.GetJWTToken = function(params, onCompletion){
		return AnalyticsRepository.prototype.customVerb('GetJWTToken', params, onCompletion);
	};

	return AnalyticsRepository;
})
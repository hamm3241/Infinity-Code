define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function BrowserRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	BrowserRepository.prototype = Object.create(BaseRepository.prototype);
	BrowserRepository.prototype.constructor = BrowserRepository;

	//For Operation 'getSupportedBrowsers' with service id 'getSupportedBrowsers3622'
	BrowserRepository.prototype.getSupportedBrowsers = function(params, onCompletion){
		return BrowserRepository.prototype.customVerb('getSupportedBrowsers', params, onCompletion);
	};

	return BrowserRepository;
})
define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function channelandscreenRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	channelandscreenRepository.prototype = Object.create(BaseRepository.prototype);
	channelandscreenRepository.prototype.constructor = channelandscreenRepository;

	//For Operation 'getChannelsAndScreensInformation' with service id 'getChannelsAndScreenInformation6291'
	channelandscreenRepository.prototype.getChannelsAndScreensInformation = function(params,onCompletion){
		return channelandscreenRepository.prototype.customVerb('getChannelsAndScreensInformation',params, onCompletion);
	};
	
	
	return channelandscreenRepository;
})
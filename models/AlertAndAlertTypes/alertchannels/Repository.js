define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function alertchannelsRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	alertchannelsRepository.prototype = Object.create(BaseRepository.prototype);
	alertchannelsRepository.prototype.constructor = alertchannelsRepository;

	//For Operation 'getAlertChannels' with service id 'getAlertChannels9385'
	alertchannelsRepository.prototype.getAlertChannels = function(params,onCompletion){
		return alertchannelsRepository.prototype.customVerb('getAlertChannels',params, onCompletion);
	};
	
	
	return alertchannelsRepository;
})
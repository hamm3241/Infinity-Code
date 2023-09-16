define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function defaultcampaignRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	defaultcampaignRepository.prototype = Object.create(BaseRepository.prototype);
	defaultcampaignRepository.prototype.constructor = defaultcampaignRepository;

	//For Operation 'getDefaultCampaign' with service id 'getDefaultCampaign2335'
	defaultcampaignRepository.prototype.getDefaultCampaign = function(params,onCompletion){
		return defaultcampaignRepository.prototype.customVerb('getDefaultCampaign',params, onCompletion);
	};
	//For Operation 'updateDefaultCampaign' with service id 'updateDefaultCampaign7044'
	defaultcampaignRepository.prototype.updateDefaultCampaign = function(params,onCompletion){
		return defaultcampaignRepository.prototype.customVerb('updateDefaultCampaign',params, onCompletion);
	};
	
	
	return defaultcampaignRepository;
})
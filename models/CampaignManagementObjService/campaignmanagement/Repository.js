define([], function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;

	//Create the Repository Class
	function campaignmanagementRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};

	//Setting BaseRepository as Parent to this Repository
	campaignmanagementRepository.prototype = Object.create(BaseRepository.prototype);
	campaignmanagementRepository.prototype.constructor = campaignmanagementRepository;

	//For Operation 'getEvents' with service id 'getEvents6553'
	campaignmanagementRepository.prototype.getEvents = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('getEvents', params, onCompletion);
	};

	//For Operation 'updateDefaultCampaigns' with service id 'updateDefaultCampaigns4311'
	campaignmanagementRepository.prototype.updateDefaultCampaigns = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('updateDefaultCampaigns', params, onCompletion);
	};

	//For Operation 'getCampaigns' with service id 'getCampaigns2521'
	campaignmanagementRepository.prototype.getCampaigns = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('getCampaigns', params, onCompletion);
	};

	//For Operation 'getAllDefaultCampaigns' with service id 'getAllDefaultCampaigns2781'
	campaignmanagementRepository.prototype.getAllDefaultCampaigns = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('getAllDefaultCampaigns', params, onCompletion);
	};

	//For Operation 'createCampaign' with service id 'createCampaign7341'
	campaignmanagementRepository.prototype.createCampaign = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('createCampaign', params, onCompletion);
	};

	//For Operation 'getPlaceholders' with service id 'getPlaceholders4051'
	campaignmanagementRepository.prototype.getPlaceholders = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('getPlaceholders', params, onCompletion);
	};

	//For Operation 'updateCampaign' with service id 'updateCampaign6451'
	campaignmanagementRepository.prototype.updateCampaign = function(params, onCompletion){
		return campaignmanagementRepository.prototype.customVerb('updateCampaign', params, onCompletion);
	};

	return campaignmanagementRepository;
})
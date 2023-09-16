define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function campaignRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	campaignRepository.prototype = Object.create(BaseRepository.prototype);
	campaignRepository.prototype.constructor = campaignRepository;

	//For Operation 'updateCampaignSettings' with service id 'updateCampaignSettings5434'
	campaignRepository.prototype.updateCampaignSettings = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('updateCampaignSettings',params, onCompletion);
	};
	//For Operation 'getCampaignSpecificationsAndGroups' with service id 'getCampaignSpecificationsAndGroups7784'
	campaignRepository.prototype.getCampaignSpecificationsAndGroups = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('getCampaignSpecificationsAndGroups',params, onCompletion);
	};
	//For Operation 'checkIfCampaignExists' with service id 'checkIfCampaignExists7085'
	campaignRepository.prototype.checkIfCampaignExists = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('checkIfCampaignExists',params, onCompletion);
	};
	//For Operation 'getCampaigns' with service id 'getCampaigns5102'
	campaignRepository.prototype.getCampaigns = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('getCampaigns',params, onCompletion);
	};
	//For Operation 'createCampaign' with service id 'createCampaign5609'
	campaignRepository.prototype.createCampaign = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('createCampaign',params, onCompletion);
	};
	//For Operation 'updateCampaignStatus' with service id 'updateCampaignStatus5655'
	campaignRepository.prototype.updateCampaignStatus = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('updateCampaignStatus',params, onCompletion);
	};
	//For Operation 'getCampaignSettings' with service id 'getCampaignSettings8043'
	campaignRepository.prototype.getCampaignSettings = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('getCampaignSettings',params, onCompletion);
	};
	//For Operation 'getCampaignPriorityList' with service id 'getCampaignPriorityList9290'
	campaignRepository.prototype.getCampaignPriorityList = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('getCampaignPriorityList',params, onCompletion);
	};
	//For Operation 'updateCampaign' with service id 'updateCampaign2196'
	campaignRepository.prototype.updateCampaign = function(params,onCompletion){
		return campaignRepository.prototype.customVerb('updateCampaign',params, onCompletion);
	};
	
	
	return campaignRepository;
})
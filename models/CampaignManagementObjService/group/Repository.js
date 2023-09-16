define([],function(){
	var BaseRepository = kony.mvc.Data.BaseRepository;
	
	//Create the Repository Class
	function groupRepository(modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource) {
		BaseRepository.call(this, modelDefinition, config, defaultAppMode, dataSourceFactory, injectedDataSource);
	};
	
	//Setting BaseRepository as Parent to this Repository
	groupRepository.prototype = Object.create(BaseRepository.prototype);
	groupRepository.prototype.constructor = groupRepository;

	//For Operation 'getAttributesPerCampaignGroup' with service id 'getAttributesPerCampaignGroup3215'
	groupRepository.prototype.getAttributesPerCampaignGroup = function(params,onCompletion){
		return groupRepository.prototype.customVerb('getAttributesPerCampaignGroup',params, onCompletion);
	};
	//For Operation 'createCampaignGroup' with service id 'createCampaignGroup1338'
	groupRepository.prototype.createCampaignGroup = function(params,onCompletion){
		return groupRepository.prototype.customVerb('createCampaignGroup',params, onCompletion);
	};
	//For Operation 'getCampaignGroups' with service id 'getCampaignGroups6131'
	groupRepository.prototype.getCampaignGroups = function(params,onCompletion){
		return groupRepository.prototype.customVerb('getCampaignGroups',params, onCompletion);
	};
	//For Operation 'updateCampaignGroup' with service id 'updateCampaignGroup7028'
	groupRepository.prototype.updateCampaignGroup = function(params,onCompletion){
		return groupRepository.prototype.customVerb('updateCampaignGroup',params, onCompletion);
	};
	
	
	return groupRepository;
})
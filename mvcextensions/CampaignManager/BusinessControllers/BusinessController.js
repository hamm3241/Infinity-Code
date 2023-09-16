define(['ModelManager'], function (ModelManager) { 

  function CampaignManager() { 
    kony.mvc.Business.Controller.call(this); 
  } 

  inheritsFrom(CampaignManager, kony.mvc.Business.Delegator); 

  CampaignManager.prototype.initializeBusinessController = function() { 

  }; 

  CampaignManager.prototype.fetchCampaigns = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'getCampaigns', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.fetchCampaignURLandGroups = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'getCampaignSpecificationsAndGroups', context, onSuccess, onError);
  };

  CampaignManager.prototype.updateCampaignStatus = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'updateCampaignStatus', context, onSuccess, onError);
  };

  CampaignManager.prototype.fetchCampaignMasterData = function(context, onSuccess, onError) {
    ModelManager.invoke('channelandscreen', 'getChannelsAndScreensInformation', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.fetchCampaignPriorities = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'getCampaignPriorityList', context, onSuccess, onError);
  };

  CampaignManager.prototype.createCampaign = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'createCampaign', context, onSuccess, onError);
  };

  CampaignManager.prototype.updateCampaign = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'updateCampaign', context, onSuccess, onError);
  };

  CampaignManager.prototype.getDefaultCampaign = function(context, onSuccess, onError) {
    ModelManager.invoke('defaultcampaign', 'getDefaultCampaign', context, onSuccess, onError);
  };

  CampaignManager.prototype.updateDefaultCampaign = function(context, onSuccess, onError) {
    ModelManager.invoke('defaultcampaign', 'updateDefaultCampaign', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.isCampaignNameExists = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'checkIfCampaignExists', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.updateCampaignSettings = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'updateCampaignSettings', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getCampaignSettings = function(context, onSuccess, onError) {
    ModelManager.invoke('campaign', 'getCampaignSettings', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getAttributes = function(context, onSuccess, onError) {
    ModelManager.invoke('attribute', 'getAttributes', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getAttributeCriteriaTypes = function(context, onSuccess, onError) {
    ModelManager.invoke('attribute', 'getAttributeCriteriaTypes', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getAttributesPerCampaignGroup = function(context, onSuccess, onError) {
    ModelManager.invoke('group', 'getAttributesPerCampaignGroup', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getCampaignGroups = function(context, onSuccess, onError) {
    ModelManager.invoke('group', 'getCampaignGroups', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.createRole = function(context, onSuccess, onError) {
    ModelManager.invoke('group', 'createCampaignGroup', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.updateCampaignGroup = function(context, onSuccess, onError) {
    ModelManager.invoke('group', 'updateCampaignGroup', context, onSuccess, onError);
  };

  CampaignManager.prototype.getProfiles = function(context, onSuccess, onError) {
    ModelManager.invoke('profile', 'getProfiles', context, onSuccess, onError);
  };

  CampaignManager.prototype.createProfile = function(context, onSuccess, onError) {
    ModelManager.invoke('profile', 'createProfile', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getCampaignMS = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'getCampaigns', context, onSuccess, onError);
  };

  CampaignManager.prototype.createCampaignMS = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'createCampaign', context, onSuccess, onError);
  };

  CampaignManager.prototype.updateCampaignMS = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'updateCampaign', context, onSuccess, onError);
  };

  CampaignManager.prototype.getPlaceholders = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'getPlaceholders', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getEvents = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'getEvents', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getAllDefaultCampaigns = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'getAllDefaultCampaigns', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.updateDefaultCampaigns = function(context, onSuccess, onError) {
    ModelManager.invoke('campaignmanagement', 'updateDefaultCampaigns', context, onSuccess, onError);
  };

  CampaignManager.prototype.getProductsByProductGroup = function(context, onSuccess, onError) {
    ModelManager.invoke('product', 'getProductsByProductGroup', context, onSuccess, onError);
  };
  
  CampaignManager.prototype.getAllProductGroups = function(context, onSuccess, onError) {
    ModelManager.invoke('product', 'GetAllProductGroups', context, onSuccess, onError);
  };
  return CampaignManager;

});
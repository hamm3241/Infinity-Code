define([], function () { 

  function CampaignModule_BusinessController() { 
    kony.mvc.Business.Delegator.call(this); 
  } 

  inheritsFrom(CampaignModule_BusinessController, kony.mvc.Business.Delegator); 

  CampaignModule_BusinessController.prototype.initializeBusinessController = function() { 
  }; 

  CampaignModule_BusinessController.prototype.execute = function(command) { 
    kony.mvc.Business.Controller.prototype.execute.call(this, command);
  };

  /**
     * @name fetchCampaigns
     * @member CampaignModule_BusinessController.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CampaignModule_BusinessController.prototype.fetchCampaigns = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.fetchCampaigns(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.fetchCampaignURLandGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.fetchCampaignURLandGroups(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.updateCampaignStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateCampaignStatus(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.fetchCampaignMasterData = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.fetchCampaignMasterData(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.fetchCampaignPriorities = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.fetchCampaignPriorities(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.fetchCustomerGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsAndEntitlManager").businessController.getCustomerGroupsView(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.createCampaign = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.createCampaign(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.updateCampaign = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateCampaign(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.getDefaultCampaign = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getDefaultCampaign(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.updateDefaultCampaign = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateDefaultCampaign(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.isCampaignNameExists = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.isCampaignNameExists(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.updateCampaignSettings = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateCampaignSettings(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getCampaignSettings = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getCampaignSettings(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getAttributes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getAttributes(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getAttributeCriteriaTypes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getAttributeCriteriaTypes(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getAttributesPerCampaignGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getAttributesPerCampaignGroup(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getCampaignGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getCampaignGroups(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.createRole = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.createRole(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.updateCampaignGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateCampaignGroup(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.getProfiles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getProfiles(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.createProfile = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.createProfile(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getCampaignMS = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getCampaignMS(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.createCampaignMS = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.createCampaignMS(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.updateCampaignMS = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateCampaignMS(context, onSuccess, onError);
  };

  CampaignModule_BusinessController.prototype.getPlaceholders = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getPlaceholders(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getEvents = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getEvents(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getProductsByProductGroup = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getProductsByProductGroup(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getAllProductGroups = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getAllProductGroups(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.getAllDefaultCampaigns = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.getAllDefaultCampaigns(context, onSuccess, onError);
  };
  
  CampaignModule_BusinessController.prototype.updateDefaultCampaigns = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManager").businessController.updateDefaultCampaigns(context, onSuccess, onError);
  };

  return CampaignModule_BusinessController;

});
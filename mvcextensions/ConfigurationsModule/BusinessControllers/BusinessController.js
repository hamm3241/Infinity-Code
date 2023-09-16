define([],function () {

  function ConfigurationsModule_BusinessController(){
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(ConfigurationsModule_BusinessController, kony.mvc.Business.Delegator);

  ConfigurationsModule_BusinessController.prototype.initializeBusinessController = function(){
  };
  ConfigurationsModule_BusinessController.prototype.fetchEligibilityCriterias = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getEligibilityCriteria({}, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.deleteEligibilityCriteria = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.deleteEligibilityCriteria(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.updateEligibilityCriteria = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.updateEligibilityCriteria(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.addEligibilityCriterias = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.addEligibilityCriterias(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.fetchBusinessConfigurations = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getBusinessConfigurations({}, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.updateBusinessConfiguration = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.updateBusinessConfiguration(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.fetchAlertConfigurations = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getAlertConfigurations({}, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.updateAlertConfiguration = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.editAlertConfiguration(context, onSuccess, onError);
  };

  ConfigurationsModule_BusinessController.prototype.fetchAllBundles = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.fetchAllBundles({}, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.fetchAllConfigurations = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.fetchAllConfigurations({}, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.fetchConfigurations = function(bundleId, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.fetchConfigurations(bundleId, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.manageBundleAndConfigurations = function(bundle, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.manageBundleAndConfigurations(bundle, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.deleteBundleAndConfigurations = function(id, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.deleteBundleAndConfigurations(id, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.getCombinedUserCount = function(id, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementManager").businessController.getCombinedUserCount(id, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.getAssociatedRoles = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getServiceDefinitionRoles(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.getGroups = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsAndEntitlManager").businessController.getCustomerGroupsView(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.getGroupFeatureActions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsAndEntitlManager").businessController.getGroupFeaturesAndActions(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.updateDefaultRole = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.updateDefaultRole(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.fetchFeaturesAndActions = function(id, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getFeaturesAndActions(id, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.fetchServiceDefinitions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.getServiceDefinitions(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.deleteBusinessType = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BusinessBankingManager").businessController.deleteBusinessType(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.execute = function(command){
    kony.mvc.Business.Controller.prototype.execute.call(this,command);
  };
  ConfigurationsModule_BusinessController.prototype.getAllFeaturesAndActions = function(context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeaturesManager").businessController.getAllFeaturesAndActions(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.createServiceDefinition = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.createServiceDefinition(context, onSuccess, onError);
  };
    ConfigurationsModule_BusinessController.prototype.editServiceDefinition = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.editServiceDefinition(context, onSuccess, onError);
  };
	ConfigurationsModule_BusinessController.prototype.manageServiceDefinitionStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.manageServiceDefinitionStatus(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.deleteServiceDefinition = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ConfigurationsManager").businessController.deleteServiceDefinition(context, onSuccess, onError);
  };
  ConfigurationsModule_BusinessController.prototype.getAccessPolicies = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeaturesManager").businessController.getAccessPolicies(context, onSuccess, onError);
  };
  
  return ConfigurationsModule_BusinessController;
});
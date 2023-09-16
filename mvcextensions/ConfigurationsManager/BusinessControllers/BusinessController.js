define(['ModelManager'], function (ModelManager) {

  function ConfigurationsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(ConfigurationsManager, kony.mvc.Business.Delegator);

  ConfigurationsManager.prototype.initializeBusinessController = function () {

  };

  ConfigurationsManager.prototype.addEligibilityCriterias = function(context, onSuccess, onError) {
    ModelManager.invoke('EligibilityCriteria', 'addEligibilityCriteria', context, onSuccess, onError);
  };  
  ConfigurationsManager.prototype.getEligibilityCriteria = function(context, onSuccess, onError) {
    ModelManager.invoke('EligibilityCriteria', 'getEligibilityCriteria', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.deleteEligibilityCriteria = function(context, onSuccess, onError) {
    ModelManager.invoke('EligibilityCriteria', 'deleteEligibilityCriteria', {"criteriaID":context.id}, onSuccess, onError);
  };
  ConfigurationsManager.prototype.updateEligibilityCriteria = function(context, onSuccess, onError) {
    ModelManager.invoke('EligibilityCriteria', 'editEligibilityCriteria', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.getBusinessConfigurations = function(context, onSuccess, onError) {
    ModelManager.invoke('businessconfiguration', 'getBusinessConfigurations', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.updateBusinessConfiguration = function(context, onSuccess, onError) {
    ModelManager.invoke('businessconfiguration', 'editBusinessConfiguration', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.getCoreTypeInformation = function(context, onSuccess, onError) {
    ModelManager.invoke('businessconfiguration', 'getCoreTypeInformation', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.getAlertConfigurations = function(context, onSuccess, onError) {
    ModelManager.invoke('businessconfiguration', 'getAlertConfigurations', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.editAlertConfiguration = function(context, onSuccess, onError) {
    ModelManager.invoke('businessconfiguration', 'editAlertConfiguration', context, onSuccess, onError);
  };

  ConfigurationsManager.prototype.fetchAllBundles = function(context, onSuccess, onError) {
    ModelManager.invoke('Configuration', 'fetchBundles', {}, onSuccess, onError);
  };
  ConfigurationsManager.prototype.fetchAllConfigurations = function(context, onSuccess, onError) {
    ModelManager.invoke('Configuration', 'fetchConfigurations', {}, onSuccess, onError);
  };
  ConfigurationsManager.prototype.fetchConfigurations = function(bundleId, onSuccess, onError) {
    ModelManager.invoke('Configuration', 'fetchConfigurations', bundleId, onSuccess, onError);
  };
  ConfigurationsManager.prototype.manageBundleAndConfigurations = function(bundle, onSuccess, onError) {
    ModelManager.invoke('Configuration', 'manageBundleAndConfigurations', bundle, onSuccess, onError);
  };
  ConfigurationsManager.prototype.deleteBundleAndConfigurations = function(id, onSuccess, onError) {
    ModelManager.invoke('Configuration', 'deleteBundleAndConfigurations', id, onSuccess, onError);
  };
  ConfigurationsManager.prototype.getConfigurations = function(context, onSuccess, onError) {
    ModelManager.invoke('Config', 'getConfigurations', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.getFeaturesAndActions = function(id, onSuccess, onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionActionLimit', id, onSuccess, onError);
  };
  ConfigurationsManager.prototype.getServiceDefinitionRoles = function(id, onSuccess, onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionRoles', id, onSuccess, onError);
  };
  ConfigurationsManager.prototype.updateDefaultRole = function(context, onSuccess, onError) {
    ModelManager.invoke('servicedefinition', 'updateDefaultRole', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.fetchTermsAndConds = function(context, onSuccess, onError){
    ModelManager.invoke('OnboardingTermsAndConditions', 'getOnboardingTermsAndConditions', context, onSuccess, onError);
  };
	ConfigurationsManager.prototype.getServiceDefinitions = function(context, onSuccess, onError){
    ModelManager.invoke('servicedefinition', 'getServiceDefinition', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.createServiceDefinition = function(context, onSuccess, onError){
    ModelManager.invoke('servicedefinition', 'createServiceDefinition', context, onSuccess, onError);
  };
   ConfigurationsManager.prototype.editServiceDefinition = function(context, onSuccess, onError){
    ModelManager.invoke('servicedefinition', 'editServiceDefinition', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.manageServiceDefinitionStatus = function(context, onSuccess, onError){
    ModelManager.invoke('servicedefinition', 'manageServiceDefinitionStatus', context, onSuccess, onError);
  };
  ConfigurationsManager.prototype.deleteServiceDefinition = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'deleteServiceDefinition', context, onSuccess, onError);
  };
  return ConfigurationsManager;
});
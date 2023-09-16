define(['ModelManager'], function (ModelManager) { 

  /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
  function BusinessController() { 

    kony.mvc.Business.Controller.call(this); 

  } 

  inheritsFrom(BusinessController, kony.mvc.Business.Controller); 

  /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
  BusinessController.prototype.initializeBusinessController = function() { 

  }; 

  /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
  BusinessController.prototype.execute = function(command) { 

    kony.mvc.Business.Controller.prototype.execute.call(this, command);

  };
  BusinessController.prototype.createCustomer = function(createRequest,onSuccess,onError) { 
    ModelManager.invoke('customer', 'createCustomer', createRequest, onSuccess, onError);	
  };
  BusinessController.prototype.verifyUsername = function(context,onSuccess,onError) { 
    ModelManager.invoke('customer', 'verifyUsername', context, onSuccess, onError);	
  };
  BusinessController.prototype.getCompanyAccounts = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'getCompanyAccounts', context, onSuccess, onError);	
  };
  BusinessController.prototype.getCompanyDetails = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'getCompanyDetails', context, onSuccess, onError);	
  };
  BusinessController.prototype.editCompany = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'editCompany', context, onSuccess, onError);	
  };
  BusinessController.prototype.validateTIN = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'validateTIN', {}, onSuccess, onError);	
  };
  BusinessController.prototype.createCompany = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'createCompany', context, onSuccess, onError);	
  };
  BusinessController.prototype.validateTIN = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'validateTIN', context, onSuccess, onError);	
  };
  BusinessController.prototype.getCompanyCustomers = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'getCompanyCustomers', context, onSuccess, onError);	
  };
  BusinessController.prototype.getAllAccounts = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'getAllAccounts', context, onSuccess, onError);	
  };
  BusinessController.prototype.verifyOFACandCIP = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'verifyOFACandCIP', context, onSuccess, onError);	
  };
  BusinessController.prototype.getBBCustomerServiceLimit = function(context,onSuccess,onError) { 
    ModelManager.invoke('bbcustomerservicelimit', 'getBBCustomerServiceLimit', context, onSuccess, onError);	
  };
  BusinessController.prototype.unlinkAccounts = function(context,onSuccess,onError){
    ModelManager.invoke('company','unlinkAccounts',context,onSuccess,onError);
  };
  BusinessController.prototype.editCustomer = function(context,onSuccess,onError) { 
    ModelManager.invoke('customer', 'editCustomer', context, onSuccess, onError);	
  };
  BusinessController.prototype.getCustomerAccounts = function(context,onSuccess,onError) { 
    ModelManager.invoke('customer', 'getCustomerAccounts', context, onSuccess, onError);	
  };
  BusinessController.prototype.upgradeUser = function(context,onSuccess,onError) { 
    ModelManager.invoke('customer', 'upgradeUser', context, onSuccess, onError);	
  }; 
  BusinessController.prototype.getCompanyActionLimits = function(context,onSuccess,onError) { 
    ModelManager.invoke('company', 'getCompanyActionLimits', context, onSuccess, onError);	
  };
  BusinessController.prototype.getAllLimits = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'getCompanyActionLimits', context, onSuccess, onError);	
  };
  BusinessController.prototype.getCompanyApprovalLimits = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'getCompanyApprovalMatrix', context, onSuccess, onError);	
  };
  BusinessController.prototype.suspendFeature = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'suspendCompanyFeatures', context, onSuccess, onError);
  };
  BusinessController.prototype.createBusinessType = function(context,onSuccess,onError) {
    ModelManager.invoke('businesstype', 'createBusinessType', context, onSuccess, onError);
  };
  BusinessController.prototype.getBusinessTypes = function(context,onSuccess,onError) {
    ModelManager.invoke('businesstype', 'getBusinessTypes', context, onSuccess, onError);
  };
  BusinessController.prototype.deleteBusinessType = function(context,onSuccess,onError) {
    ModelManager.invoke('businesstype', 'deleteBusinessType', context, onSuccess, onError);
  };
  BusinessController.prototype.updateBusinessType = function(context,onSuccess,onError) {
    ModelManager.invoke('businesstype', 'updateBusinessType', context, onSuccess, onError);
  };
  BusinessController.prototype.getBusinessTypeGroups = function(context,onSuccess,onError) {
    ModelManager.invoke('businesstype', 'getBusinessTypeGroups', context, onSuccess, onError);
  };
  BusinessController.prototype.getListOfCompanyByStatus = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'getListOfCompanyByStatus', context, onSuccess, onError);
  };
  BusinessController.prototype.getListOfContractsByStatus = function(context,onSuccess,onError) {
    ModelManager.invoke('Contract', 'getListOfContractsByStatus', context, onSuccess, onError);
  };
  BusinessController.prototype.updateCompanyStatusToActive = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'updateCompanyStatusToActive', context, onSuccess, onError);
  };
  BusinessController.prototype.updateCompanyStatusToRejected = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'updateCompanyStatusToRejected', context, onSuccess, onError);
  };
  BusinessController.prototype.updateContractStatus = function(context,onSuccess,onError) {
    ModelManager.invoke('Contract', 'updateContractStatus', context, onSuccess, onError);
  };
  BusinessController.prototype.fetchAuthorizedSignatories = function(context,onSuccess,onError) {
    ModelManager.invoke('customer', 'fetchAuthorizedSignatories', context, onSuccess, onError);
  };
  BusinessController.prototype.getCompanySignatories = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'getCompanySignatories', context, onSuccess, onError);
  };
  BusinessController.prototype.getMembershipDetails = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'getMembershipDetails', context, onSuccess, onError);
  };
  BusinessController.prototype.fetchAccountSignatories = function(context,onSuccess,onError) {
    ModelManager.invoke('company', 'fetchAccountSignatories', context, onSuccess, onError);
  };
  BusinessController.prototype.createSignatory = function(context,onSuccess,onError) {
    ModelManager.invoke('customer', 'createSignatory', context, onSuccess, onError);
  };
  BusinessController.prototype.editSignatory = function(context,onSuccess,onError) {
    ModelManager.invoke('customer', 'editSignatory', context, onSuccess, onError);
  };
  BusinessController.prototype.getServiceDefinitionRoles = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionRoles', context, onSuccess, onError);
  };
  BusinessController.prototype.getServiceDefinitionAndRoleFeatures = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'getServicedefinitionAndRoleFeatures', context, onSuccess, onError);
  };
  BusinessController.prototype.getServiceDefinitionsForContracts = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionsForContracts', context, onSuccess, onError);
  };
  BusinessController.prototype.getServiceDefinitionFeaturesAndLimits = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionFeaturesAndLimits', context, onSuccess, onError);
  };
  
  BusinessController.prototype.getServiceDefinitionMonetaryActions = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionMonetaryActions', context, onSuccess, onError);
  };
  BusinessController.prototype.getServiceDefinitionProductIdPermissions = function(context,onSuccess,onError) {
    ModelManager.invoke('servicedefinition', 'getServiceDefinitionProductIdPermissions', context, onSuccess, onError);
  };
  return BusinessController;

});

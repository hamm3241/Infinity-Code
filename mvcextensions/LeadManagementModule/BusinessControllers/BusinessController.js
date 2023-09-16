define([], function () { 

  function LeadManagementModule_BusinessController() { 
    kony.mvc.Business.Delegator.call(this);
  } 

  inheritsFrom(LeadManagementModule_BusinessController, kony.mvc.Business.Delegator);

  LeadManagementModule_BusinessController.prototype.initializeBusinessController = function(){
  };

  LeadManagementModule_BusinessController.prototype.createLead = function(createLeadJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.createLead(createLeadJSON, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.fetchLeads = function(fetchLeadsJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchLeads(fetchLeadsJSON, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.fetchAllProducts = function(fetchAllProductsJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BankProductManagmentManager").businessController.getProducts(fetchAllProductsJSON, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.fetchSupportedProducts = function(fetchSupportedProducts, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchProducts(fetchSupportedProducts, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.fetchNotes = function(fetchNotesJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchNotes(fetchNotesJSON, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.addNotes = function(addNotesJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.addNotes(addNotesJSON, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.updateLead = function(updateLeadJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.updateLead(updateLeadJSON, onSuccess, onError);
  };

  LeadManagementModule_BusinessController.prototype.fetchLeadStatusCount = function(fetchLeadStatusCountJSON, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LeadManagementManager").businessController.fetchLeadStatusCount(fetchLeadStatusCountJSON, onSuccess, onError);
  };

  return LeadManagementModule_BusinessController;
});
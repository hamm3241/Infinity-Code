define(['ModelManager'], function (ModelManager) { 

  function LeadManagementManager() { 
    kony.mvc.Business.Controller.call(this); 
  } 

  inheritsFrom(LeadManagementManager, kony.mvc.Business.Delegator); 

  LeadManagementManager.prototype.initializeBusinessController = function() { 

  }; 
  LeadManagementManager.prototype.createLead = function(createLeadJSON, onSuccess, onError) {
    ModelManager.invoke('lead', 'createLead', createLeadJSON, onSuccess, onError);
  };
  
  LeadManagementManager.prototype.fetchLeads = function(fetchLeadsJSON, onSuccess, onError) {
    ModelManager.invoke('lead', 'fetchLeads', fetchLeadsJSON, onSuccess, onError);
  };

  LeadManagementManager.prototype.fetchProducts = function(fetchProductsJSON, onSuccess, onError) {
    ModelManager.invoke('leadproduct', 'getProducts', fetchProductsJSON, onSuccess, onError);
  };

  LeadManagementManager.prototype.fetchNotes = function(fetchNotesJSON, onSuccess, onError) {
    ModelManager.invoke('leadnote', 'fetchLeadNotes', fetchNotesJSON, onSuccess, onError);
  };

  LeadManagementManager.prototype.addNotes = function(addNotesJSON, onSuccess, onError) {
    ModelManager.invoke('leadnote', 'createLeadNote', addNotesJSON, onSuccess, onError);
  };

  LeadManagementManager.prototype.updateLead = function(updateLeadJSON, onSuccess, onError) {
    ModelManager.invoke('lead', 'updateLead', updateLeadJSON, onSuccess, onError);
  };

  LeadManagementManager.prototype.fetchLeadStatusCount = function(fetchLeadStatusCountJSON, onSuccess, onError) {
    ModelManager.invoke('leadsummary', 'getStatusCountSummary', fetchLeadStatusCountJSON, onSuccess, onError);
  };

  return LeadManagementManager;
});
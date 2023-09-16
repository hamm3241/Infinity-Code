define(['ModelManager'], function (ModelManager) { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function BusinessController() { 

        kony.mvc.Business.Delegator.call(this); 

    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 
  
    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    BusinessController.prototype.initializeBusinessController = function() { 

    };
  BusinessController.prototype.execute = function(command) { 

    kony.mvc.Business.Controller.prototype.execute.call(this, command);

  };
  BusinessController.prototype.getAllSignatoryGroups = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'getAllSignatoryGroups', context, onSuccess, onError);
  };
  BusinessController.prototype.getSignatoryGroupDetails = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'getSignatoryGroupDetails', context, onSuccess, onError);
  };

  BusinessController.prototype.updateSignatoryGroups = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'updateSignatoryGroups', context, onSuccess, onError);
  };
  
   BusinessController.prototype.isSignatoryGroupEligibleForDelete = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'isSignatoryGroupEligibleForDelete', context, onSuccess, onError);
  };
  
   BusinessController.prototype.deleteSignatoryGroup = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'deleteSignatoryGroup', context, onSuccess, onError);
   };
  BusinessController.prototype.getNoGroupUsers = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'getNoGroupUsers', context, onSuccess, onError);
  };
  BusinessController.prototype.getApprovalPermissionsForUser = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'getApprovalPermissionsForUser', context, onSuccess, onError);
  };
  BusinessController.prototype.createSignatoryGroup = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'createSignatoryGroup', context, onSuccess, onError);

  };
  
  BusinessController.prototype.getAllSignatoryGroupsbyCoreCustomerIds = function(context,onSuccess,onError) {
    ModelManager.invoke('SignatoryGroup', 'getAllSignatoryGroupsbyCoreCustomerIds', context, onSuccess, onError);
  };
  BusinessController.prototype.updateApprovalMode = function(context,onSuccess,onError) {
    ModelManager.invoke('ApprovalMode', 'updateApprovalMode', context, onSuccess, onError);
  };

    return BusinessController;

});
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
  BusinessController.prototype.execute = function(command) { 

    kony.mvc.Business.Controller.prototype.execute.call(this, command);

  };
  BusinessController.prototype.searchCoreCustomers = function(context,onSuccess,onError) {
    ModelManager.invoke('Contract', 'searchCoreCustomers', context, onSuccess, onError);
  };
  BusinessController.prototype.getCoreRelativeCustomers = function(context,onSuccess,onError) {
    ModelManager.invoke('Contract', 'getCoreRelativeCustomers', context, onSuccess, onError);
  };
  BusinessController.prototype.getCoreCustomerAccounts = function(context,onSuccess,onError) {
    ModelManager.invoke('Contract', 'getCoreCustomerAccounts', context, onSuccess, onError);
  };
  BusinessController.prototype.getContractAccounts = function(context,onSuccess,onError) {
    ModelManager.invoke('Contract', 'getContractAccounts', context, onSuccess, onError);
  };
  BusinessController.prototype.getSearchContract = function(context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'searchContract', context, onSuccess, onError);
  };
  BusinessController.prototype.getContractDetails = function(context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'getContractDetails', context, onSuccess, onError);
  };
  BusinessController.prototype.createContract = function(context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'createContract', context, onSuccess, onError);
  };
  BusinessController.prototype.editContract = function(context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'editContract', context, onSuccess, onError);
  };
  BusinessController.prototype.getContractFeatureActionLimits = function(context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'getContractFeatureActionLimits', context, onSuccess, onError);
  };
  BusinessController.prototype.getContractInfinityUsers = function(context, onSuccess, onError) {
    ModelManager.invoke('Contract', 'getContractInfinityUsers', context, onSuccess, onError);
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
//Added Service
   BusinessController.prototype.getCoreCustomerDetails = function(context, onSuccess, onError){
   ModelManager.invoke('Contract', 'getCoreCustomerDetails', context, onSuccess, onError);
 };

    return BusinessController;

});
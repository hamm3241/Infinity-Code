define([], function () { 

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
     * @name fetch mfa configurations
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */  
  BusinessController.prototype.getAllMFAConfigurations = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.getAllMFAConfigurations(context, onSuccess, onError);
  };
  

  /**
     * @name update mfa configuration
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.updateMFAConfiguration = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.updateMFAConfiguration(context, onSuccess, onError);
  };
  
  
  /**
     * @name fetch mfa scenarios
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */  
  BusinessController.prototype.fetchMFAScenarios = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchMFAScenarios(context, onSuccess, onError);
  };

  /**
     * @name fetches list of applications supported 
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchFeaturesList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchFeaturesList(context, onSuccess, onError);
  };


  /**
     * @name fetches list of actions supported 
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchActionsList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchActionsList(context, onSuccess, onError);
  };
	
  /**
     * @name fetches list of actions for selected feature and scenario type
     * @param {"featureId":"","actionType": ""} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchAction = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchAction(context, onSuccess, onError);
  };
  /**
     * @name fetches list of mfa types supported 
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchMFATypes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchMFATypes(context, onSuccess, onError);
  };

  /**
     * @name fetches list of mfa modes supported 
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchMFAModes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchMFAModes(context, onSuccess, onError);
  };


  /**
     * @name fetches list of frequency types supported 
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchFrequencyTypes = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchFrequencyTypes(context, onSuccess, onError);
  };

  /**
     * @name create mfa scenario
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.createMFAScenario = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.createMFAScenario(context, onSuccess, onError);
  };
  
  /**
     * @name update mfa scenario
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.updateMFAScenario = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.updateMFAScenario(context, onSuccess, onError);
  };
  
  /**
     * @name delete mfa scenario
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.deleteMFAScenario = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.deleteMFAScenario(context, onSuccess, onError);
  };

  /**
     * @name getMFAVariableReferences
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.getMFAVariableReferences = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.getMFAVariableReferences(context, onSuccess, onError);
  };
  /**
     * @name fetchApplicationsList
     * @param {} context
     * @param (response:[])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  BusinessController.prototype.fetchApplicationsList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchApplicationsList(context, onSuccess, onError);
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

  return BusinessController;

});
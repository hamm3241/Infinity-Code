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
       * @name getActionsOfFeature
       * @member FeaturesManager.businessController
       * @param payload : {"featureId":""}
       * @param (...callbackArgs:[{"termandcondition": {"en-US": {"contentType": "TEXT","content": ""}},"actionId": "","description": "","isMFAApplicable": "","limits": [{"type": "","value": ""}],"actionName": "","Type_id": ""}])=>any onSuccess
       * @param (...callbackArgs)=>any onError
       */
    BusinessController.prototype.getActionsOfFeature = function(payload, onSuccess, onError){
      ModelManager.invoke('feature', 'getFeatureActions', payload, onSuccess, onError);	
    };
  /**
       * @name getAllFeatures
       * @member FeaturesManager.businessController
       * @param payload : {}
       * @param (response:{{"features": [{"Service_Fee": "","Status_id": "","displayName": {},"name": "","description": "","id": "","roleTypes": [{"name": "","id": ""}],"Type_id": ""}]})=>any onSuccess
       * @param (...callbackArgs)=>any onError
       */
    BusinessController.prototype.getAllFeatures = function(payload, onSuccess, onError){
      ModelManager.invoke('feature', 'getAllFeatures', payload, onSuccess, onError);	
    };
   /**
       * @name editFeatureAndActionLimits
       * @member FeaturesManager.businessController
       * @param payload : { "featureId":"","serviceFee":"","statusId":"","featureDisplay":[ { "localeId":"","displayName":"","displayDescription":""}],"actions":[ { "actionId":"","limits":[ { "type":"","value":""}]}]}
       * @param ()=>any onSuccess
       * @param (...callbackArgs)=>any onError
       */
    BusinessController.prototype.editFeatureAndActionLimits = function(payload, onSuccess, onError){
      ModelManager.invoke('feature', 'editFeatureAndActionLimits', payload, onSuccess, onError);	
    };
   /**
       * @name manageActionStatus
       * @member FeaturesManager.businessController
       * @param payload : {  "actionId":"","status":""}
       * @param ()=>any onSuccess
       * @param (...callbackArgs)=>any onError
       */
    BusinessController.prototype.manageActionStatus = function(payload, onSuccess, onError){
      ModelManager.invoke('feature', 'manageActionStatus', payload, onSuccess, onError);	
    };
  /**
       * @name getAllFeaturesAndActions
       * @member FeaturesManager.businessController
       * @param payload : {}
       * @param ()=>any onSuccess
       * @param (...callbackArgs)=>any onError
       */
    BusinessController.prototype.getAllFeaturesAndActions  = function(context, onSuccess, onError){
      ModelManager.invoke('feature','getAllFeaturesAndActions', context, onSuccess, onError);
    };
    BusinessController.prototype.getMonetaryActions = function(context,onSuccess,onError) {
      ModelManager.invoke('feature', 'getAllMonetaryActions', context, onSuccess, onError);	
    }; 
  	BusinessController.prototype.getAccessPolicies = function(context,onSuccess,onError) {
      ModelManager.invoke('feature', 'getAccessPolicies', context, onSuccess, onError);	
    }; 
    /** Get the list of all possible features and actions*/
    BusinessController.prototype.getAccountLevelFeatureAction = function(context,onSuccess,onError) {
      ModelManager.invoke('feature', 'getAccountLevelFeatureAction', context, onSuccess, onError);	
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
define(["ModelManager"], function (ModelManager) { 
    
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
   * @name getLegalEntities
   * @member MultiEntityManager.businessController
   * @param {} context
   * @param (...callbackArgs)=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  BusinessController.prototype.getLegalEntities = function(context, onSuccess, onError) {
    ModelManager.invoke('MultiEntity', 'getLegalEntities', {}, onSuccess, onError);
  };    return BusinessController;

});
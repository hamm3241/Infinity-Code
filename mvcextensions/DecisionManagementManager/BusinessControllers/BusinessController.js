define(['ModelManager'],  function (ModelManager) { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Controller
     */
    function DecisionManagementManager_BusinessController() { 

       kony.mvc.Business.Delegator.call(this);

    } 

    inheritsFrom(DecisionManagementManager_BusinessController, kony.mvc.Business.Controller); 

    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller gets initialized
     * @method
     */
    DecisionManagementManager_BusinessController.prototype.initializeBusinessController = function() { 

    }; 
  DecisionManagementManager_BusinessController.prototype.createDecisionRule = function(context, onSuccess, onError){
    ModelManager.invoke('decision', 'createDecisionRule', context, onSuccess, onError);
  };
  DecisionManagementManager_BusinessController.prototype.getDecisionRules = function(context, onSuccess, onError){
    ModelManager.invoke('decision', 'getDecisionRules', context, onSuccess, onError);
  };
  DecisionManagementManager_BusinessController.prototype.editDecisionRule = function(context, onSuccess, onError){
    ModelManager.invoke('decision', 'editDecisionRule', context, onSuccess, onError);
  };
  DecisionManagementManager_BusinessController.prototype.GetAllFilesofDecisionRule = function(context, onSuccess, onError){
    ModelManager.invoke('decision', 'GetAllFilesofDecisionRule', context, onSuccess, onError);
  };
  DecisionManagementManager_BusinessController.prototype.DownloadRuleFile = function(context, onSuccess, onError){
    ModelManager.invoke('decision', 'DownloadRulesFile', context, onSuccess, onError);
  };
  DecisionManagementManager_BusinessController.prototype.UploadRuleFile = function(context, onSuccess, onError){
    ModelManager.invoke('decision', 'UploadRulesFile', context, onSuccess, onError);
  };
    /**
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	DecisionManagementManager_BusinessController.prototype.execute = function(command) { 

		kony.mvc.Business.Controller.prototype.execute.call(this, command);

	};

    return DecisionManagementManager_BusinessController;

});
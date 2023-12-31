define(["ModelManager"], function (ModelManager) { 
    
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
  
    BusinessController.prototype.getAllMFAConfigurations = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getMFAConfiguration', context, onSuccess, onError);	
	};
  
    BusinessController.prototype.updateMFAConfiguration = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'editMFAConfiguration', context, onSuccess, onError);	
	};  
  
  

  BusinessController.prototype.fetchSCAScenarios = function(context,onSuccess,onError) { 
    ModelManager.invoke('scaconfigandscenarios', 'getSCAScenario', context, onSuccess, onError);
  };
    BusinessController.prototype.fetchFeaturesList = function(context,onSuccess,onError) { 
        ModelManager.invoke('scaconfigandscenarios', 'getSCAFeature', context, onSuccess, onError);	
	};  
    BusinessController.prototype.fetchActionsList = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getAllActions', context, onSuccess, onError);	
	};
  BusinessController.prototype.fetchAction = function(context,onSuccess,onError) { 
        ModelManager.invoke('scaconfigandscenarios', 'getSCAAction', context, onSuccess, onError);	
	};
    BusinessController.prototype.fetchMFATypes = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getMFAType', context, onSuccess, onError);	
	};  
    BusinessController.prototype.fetchMFAModes = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getMFAMode', context, onSuccess, onError);	
	};  
    BusinessController.prototype.fetchFrequencyTypes = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getFrequencyType', context, onSuccess, onError);	
	};  
    BusinessController.prototype.createSCAScenario = function(context,onSuccess,onError) { 
        ModelManager.invoke('scaconfigandscenarios', 'createSCAScenario', context, onSuccess, onError);	
	};  
    BusinessController.prototype.updateSCAScenario = function(context,onSuccess,onError) { 
        ModelManager.invoke('scaconfigandscenarios', 'editSCAScenario', context, onSuccess, onError);	
	};  
  
    BusinessController.prototype.deleteSCAScenario = function(context,onSuccess,onError) { 
        ModelManager.invoke('scaconfigandscenarios', 'deleteSCAScenario', context, onSuccess, onError);	
	};  
  
    BusinessController.prototype.getMFAVariableReferences = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getMFAVariableReference', context, onSuccess, onError);	
	};
    
    BusinessController.prototype.fetchApplicationsList = function(context,onSuccess,onError) { 
        ModelManager.invoke('mfaconfigandscenarios', 'getApp', context, onSuccess, onError);	
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
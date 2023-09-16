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

  	BusinessController.prototype.getPasswordLockoutSettings = function(payload,onSuccess,onError) {
      kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("PasswordAgeAndLockoutManager")
      .businessController.getPasswordLockoutSettings(payload, onSuccess, onError);
    };
  
  	BusinessController.prototype.updatePasswordLockoutSettings = function(payload,onSuccess,onError) {
      kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("PasswordAgeAndLockoutManager")
      .businessController.updatePasswordLockoutSettings(payload, onSuccess, onError);
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
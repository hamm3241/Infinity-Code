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
     * Overridden Method of kony.mvc.Business.Controller
     * This method gets called when business controller is told to execute a command
     * @method
     * @param {Object} kony.mvc.Business.Command Object
     */
	BusinessController.prototype.execute = function(command) { 

		kony.mvc.Business.Controller.prototype.execute.call(this, command);

	};
  
  	BusinessController.prototype.getPasswordLockoutSettings=function(context,sucess,error){
           ModelManager.invoke('identitymanagement','getPasswordLockoutSettings', context, sucess, error);
     };
  
  	BusinessController.prototype.updatePasswordLockoutSettings=function(context,sucess,error){
           ModelManager.invoke('identitymanagement','updatePasswordLockoutSettings', context, sucess, error);
     };

    return BusinessController;

});
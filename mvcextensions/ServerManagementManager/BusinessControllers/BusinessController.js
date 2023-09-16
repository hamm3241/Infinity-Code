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
    BusinessController.prototype.getAddressSuggestion=function(context,sucess,error){
           ModelManager.invoke('maplocation','getSuggestions', context, sucess, error);
     };   
    BusinessController.prototype.getPlaceDetails=function(context,sucess,error){
           ModelManager.invoke('maplocation','getDetails', context, sucess, error);
     };
    BusinessController.prototype.USPSAddressValidation=function(context,sucess,error){
           ModelManager.invoke('address','validateAddress', context, sucess, error);
     };

    return BusinessController;

});
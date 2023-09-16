define([], function() {

  	function TestCase_ServicesManagement_GetAllServices(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_GetAllServices, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_GetAllServices.prototype.execute = function(command){
		
    };
	
	TestCase_ServicesManagement_GetAllServices.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_GetAllServices;
    
});
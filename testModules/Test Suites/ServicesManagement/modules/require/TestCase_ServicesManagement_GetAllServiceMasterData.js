define([], function() {

  	function TestCase_ServicesManagement_GetAllServiceMasterData(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_GetAllServiceMasterData, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_GetAllServiceMasterData.prototype.execute = function(command){
		
    };
	
	TestCase_ServicesManagement_GetAllServiceMasterData.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_GetAllServiceMasterData;
    
});
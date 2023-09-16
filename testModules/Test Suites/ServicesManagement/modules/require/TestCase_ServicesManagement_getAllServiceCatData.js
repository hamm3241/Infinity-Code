define([], function() {

  	function TestCase_ServicesManagement_getAllServiceCatData(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_getAllServiceCatData, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_getAllServiceCatData.prototype.execute = function(command){
		
    };
	
	TestCase_ServicesManagement_getAllServiceCatData.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_getAllServiceCatData;
    
});
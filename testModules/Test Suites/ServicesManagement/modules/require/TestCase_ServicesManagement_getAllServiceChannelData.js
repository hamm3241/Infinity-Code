define([], function() {

  	function TestCase_ServicesManagement_getAllServiceChannelData(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_getAllServiceChannelData, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_getAllServiceChannelData.prototype.execute = function(command){
		
    };
	
	TestCase_ServicesManagement_getAllServiceChannelData.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_getAllServiceChannelData;
    
});
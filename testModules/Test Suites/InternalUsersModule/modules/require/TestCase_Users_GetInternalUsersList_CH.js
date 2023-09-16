define([], function() {

  	function TestCase_Users_GetInternalUsersList_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetInternalUsersList_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetInternalUsersList_CH.prototype.execute = function(command){
		
    };
	
	TestCase_Users_GetInternalUsersList_CH.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetInternalUsersList_CH;
    
});
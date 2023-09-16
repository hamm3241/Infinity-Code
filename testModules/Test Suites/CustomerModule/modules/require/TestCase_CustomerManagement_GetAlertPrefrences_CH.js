define([], function() {

  	function TestCase_CustomerManagement_GetAlertPrefrences_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetAlertPrefrences_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetAlertPrefrences_CH.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {
			"userName": "konyolbuser"
		};
		function onFetchCompletion(response) {
			try {
				expect(response.data, 'to verify response').to.include.all.keys(['opstatus','alertTypes']);
				expect(response.data.opstatus, 'to verify opstatus').to.equal(0);
				expect(response.data.alertTypes, 'to verify alerts length').to.have.length.above(0);
				expect(response.data.alertTypes[0], 'to verify fields in alerts record').to.include.all.
					keys(['alertType', 'alerts', 'canBeSelected', 'isSelected']);
				//sub-alerts
				expect(response.data.alertTypes[0], 'to verify sub-alerts object exists').to.have.property("alerts");
				expect(response.data.alertTypes[0].alerts, 'to verify sub-alerts length').to.have.length.above(0);
				expect(response.data.alertTypes[0].alerts[0], 'to verify fields sub-alerts record').to.include.all.
					keys(['alertId', 'name', 'isSmsActive', 'isPushActive', 'isEmailActive', 'canEmailBeSelected', 'canPushBeSelected', 'canSmsBeSelected', 'canBeSelected', 'isSelected']);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			customerModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.CustomerAlertsPrefrences", reqParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetAlertPrefrences_CH.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetAlertPrefrences_CH;
    
});
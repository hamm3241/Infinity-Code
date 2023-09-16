define([], function() {

  	function TestCase_PrivacyPolicy_createPrivacyPolicy_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_createPrivacyPolicy_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_createPrivacyPolicy_CH.prototype.execute = function(command){
		var expect = chai.expect;
        var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var inputParam = {
			"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
            "PrivacyPolicyData": {
                "Status_id": "SID_ACTIVE",
                "Description": btoa("abc <div>abc </div><div>abc</div>"),
                "Channel_id": "CH_ID_MOB_INT"
            }          
        };
        function onCreateCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to verify privacy policy create success').to.have.property('PrivacyPolicyCreateStatus', "Successful");
                expect(response.data.opstatus, 'to verify create opstatus ').to.equal(0);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try{
            privacyPolicyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.PrivacyPolicy.addPrivacyPolicy", inputParam, onCreateCompletion));
        }catch(e){
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_createPrivacyPolicy_CH.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_createPrivacyPolicy_CH;
    
});
define([], function() {

  	function TestCase_PrivacyPolicy_fetchPrivacyPolicy_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_fetchPrivacyPolicy_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_fetchPrivacyPolicy_CH.prototype.execute = function(command){
		var expect = chai.expect;
        var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");

        function onFetchCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to verify privacy policy response').to.include.all.keys(["privacypolicy","opstatus"]);
                expect(response.data.privacypolicy, 'to verify privacy policy exsist').to.have.length.above(0);
                expect(response.data.opstatus, 'to verify fetch opstatus ').to.equal(0);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try{
            privacyPolicyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.PrivacyPolicy.getPrivacyPolicy", {}, onFetchCompletion));
        }catch(e){
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_fetchPrivacyPolicy_CH.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_fetchPrivacyPolicy_CH;
    
});
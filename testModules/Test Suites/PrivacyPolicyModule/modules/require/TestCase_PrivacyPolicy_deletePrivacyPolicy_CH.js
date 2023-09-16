define([], function() {

  	function TestCase_PrivacyPolicy_deletePrivacyPolicy_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_deletePrivacyPolicy_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_deletePrivacyPolicy_CH.prototype.execute = function(command){
		var expect = chai.expect;
        var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var inputParam = {
            "user_ID":kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
            "id":""     
        };
        function onDeleteCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to verify privacy policy delete success').to.have.property('PrivacyPolicyDeleteStatus', "Successful");
                expect(response.data.opstatus, 'to verify delete opstatus ').to.equal(0);
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        function onFetchCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to verify privacy policy response').to.include.keys("privacypolicy");
                expect(response.data.privacypolicy, 'to verify privacy policy exsist').to.have.length.above(0);
                expect(response.data.privacypolicy[0], 'to verify privacypolicy id').to.have.property('id');
                inputParam.id = response.data.privacypolicy[0].id;
                privacyPolicyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.PrivacyPolicy.deletePrivacyPolicy", inputParam, onDeleteCompletion));
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            privacyPolicyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.PrivacyPolicy.getPrivacyPolicy", {}, onFetchCompletion));
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_deletePrivacyPolicy_CH.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_deletePrivacyPolicy_CH;
    
});
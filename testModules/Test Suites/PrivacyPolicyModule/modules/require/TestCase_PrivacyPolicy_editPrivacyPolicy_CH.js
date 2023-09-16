define([], function() {

  	function TestCase_PrivacyPolicy_editPrivacyPolicy_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_PrivacyPolicy_editPrivacyPolicy_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_PrivacyPolicy_editPrivacyPolicy_CH.prototype.execute = function(command){
		var expect = chai.expect;
        var privacyPolicyModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PrivacyPolicyModule");
        var inputParam = {
			"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID, 
			"PrivacyPolicyData": {
				"Status_id": "SID_ACTIVE",
                "Description": btoa("abc <div>abc </div><div>abc abc</div>")
            }           
        };
        function onEditCompletion(response) {
            try {
                expect(response.status, 'status to be success').to.equal(kony.mvc.constants.STATUS_SUCCESS);
                expect(response.data,
                    'to verify privacy policy edit success').to.have.property('PrivacyPolicyEditStatus', "Successful");
                expect(response.data.opstatus, 'to verify edit opstatus ').to.equal(0);    
                this.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
            } catch (e) {
                this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try{
            privacyPolicyModule.businessController.execute(new kony.mvc.Business.Command("com.kony.PrivacyPolicy.updatePrivacyPolicy", inputParam, onEditCompletion));
        }catch(e){
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_PrivacyPolicy_editPrivacyPolicy_CH.prototype.validate = function(){
		
    };
    
    return TestCase_PrivacyPolicy_editPrivacyPolicy_CH;
    
});
define([], function() {

  	function TestCase_CustomerManagement_GetCustomerCards_CH(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCustomerCards_CH, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCustomerCards_CH.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
		var self = this;
		var expect = chai.expect;
		var reqParam = {
			customerUsername : "konyolbuser"
		};
      
		function onFetchCompletion(response) {
			try {
				expect(response.data, 'to verify data have keys ').to.include.all.
                   keys('issuerImages', 'records','opstatus');
                expect(response.data.opstatus,'to verify opstatus of records').to.equal(0);
                expect(response.data.records,'to verifylength of records').to.have.length.above(0);
                expect(response.data.records[0], 'to verify fields in records').to.include.all.
                   keys(['accountName', 'accountNumber', 'cardId','cardNumber','cardStatus','cardType','Action','cardHolderName','currentBalance','userId','username','serviceProvider','currentDueAmount','currentDueDate','expiryDate']);
				self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, 'successful');
			} catch (e) {
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
			customerModule.businessController.execute(new kony.mvc.Business.Command("com.kony.CustomerManagement.CardsInformation", reqParam, onFetchCompletion));
		} catch (e) {
			this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
		}
    };
	
	TestCase_CustomerManagement_GetCustomerCards_CH.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCustomerCards_CH;
    
});
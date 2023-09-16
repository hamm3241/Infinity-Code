define([], function() {

  	function TestCase_CustomerManagement_GetCustomerCards(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_CustomerManagement_GetCustomerCards, kony.mvc.Business.CommandHandler);
  
  	TestCase_CustomerManagement_GetCustomerCards.prototype.execute = function(command){
		var customerModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerManagementModule");
        var self = this;
        var expect = chai.expect;
        var reqParam = {customerUsername : "konyolbuser"};
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.cardsInfomartion ){
                    expect(viewModel.cardsInfomartion, 'to verify cards have keys ').to.include.all.
                      keys('issuerImages', 'records');
                    expect(viewModel.cardsInfomartion.records,'to verify length of records').to.have.length.above(0);
                    expect(viewModel.cardsInfomartion.records[0], 'to verify fields in records').to.include.all.
                      keys(['accountName', 'accountNumber', 'cardId','cardNumber','cardStatus','cardType','Action','cardHolderName','currentBalance','userId','username','serviceProvider','currentDueAmount','currentDueDate','expiryDate']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmCustomerManagement', onFetchCompletion);
            customerModule.presentationController.getCardsInformation(reqParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_CustomerManagement_GetCustomerCards.prototype.validate = function(){
		
    };
    
    return TestCase_CustomerManagement_GetCustomerCards;
    
});
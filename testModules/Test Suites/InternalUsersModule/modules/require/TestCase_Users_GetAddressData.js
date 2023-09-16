define([], function() {

  	function TestCase_Users_GetAddressData(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Users_GetAddressData, kony.mvc.Business.CommandHandler);
  
  	TestCase_Users_GetAddressData.prototype.execute = function(command){
		var usersModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InternalUserModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.addressDetails){
                expect(viewModel, 'to get country,state and city lists').to.include.keys("addressDetails");
                expect(viewModel.addressDetails.country, 'to get more than zero countries').to.have.length.above(0);
				expect(viewModel.addressDetails.region, 'to get more than zero regions').to.have.length.above(0);
				expect(viewModel.addressDetails.city, 'to get more than zero cities').to.have.length.above(0);
                expect(viewModel.addressDetails.country[0], 'for country list to have fields').to.include.keys(['id','Code','Name']);
				expect(viewModel.addressDetails.region[0], 'for region list to have fields').to.include.keys(['id','Code','Name']);
				expect(viewModel.addressDetails.city[0], 'for city list to have fields').to.include.keys(['id','Name','Region_id','Country_id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmUsers',onCompletion);
            usersModule.presentationController.navigateTo('InternalUserModule','fetchAddressData');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Users_GetAddressData.prototype.validate = function(){
		
    };
    
    return TestCase_Users_GetAddressData;
    
});
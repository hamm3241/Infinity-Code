define([], function() {

  	function TestCase_OutageMessages_getServicesView(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_OutageMessages_getServicesView, kony.mvc.Business.CommandHandler);
  
  	TestCase_OutageMessages_getServicesView.prototype.execute = function(command){
		var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("OutageMessageModule");
        var self = this;
        var expect = chai.expect;

        function onCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.serviceViewList){
                expect(viewModel, 'to get outage messages').to.include.keys("serviceViewList");
                expect(viewModel.serviceViewList, 'to get more than zero').to.have.length.above(0);
                expect(viewModel.serviceViewList[0], 'for services to have fields').to.include.keys(['Description','BeneficiarySMSCharge','Category_Id','Channel_id','Code','DisplayDescription','DisplayName','HasWeekendOperation','IsAgreementActive','MaxTransferLimit','MinTransferLimit','Name','Status_id','TransactionFee_id','TransactionLimit_id','Type_Name','Type_id','WorkSchedule_id','id']);
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmOutageMessage',onCompletion);
            messagesModule.presentationController.navigateTo('OutageMessageModule','fetchServiceView');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_OutageMessages_getServicesView.prototype.validate = function(){
		
    };
    
    return TestCase_OutageMessages_getServicesView;
    
});
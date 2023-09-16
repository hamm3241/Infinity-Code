define([], function() {

  	function TestCase_ServicesManagement_CreateService(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_CreateService, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_CreateService.prototype.execute = function(command){
		var servicesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServicesManagementModule");
        var self = this;
        var expect = chai.expect;
		var createInputParam={"User_id":"UID11","Service":[{"Type_id":"SER_TYPE_TRNS","Channel_id":"CH_ID_MOB","Code":"6588","Category_Id":"CAT_TYPE_PAYMENT","DisplayName":"Service Test","DisplayDescription":"Description","Name":"Testing Service","Description":"sfgvbnbhgf","Status_id":"SID_INACTIVE","MaxTransferLimit":"5000","MinTransferLimit":"1","TransferDenominations":"100","IsFutureTransaction":"0","TransactionCharges":"20","IsAuthorizationRequired":"0","IsSMSAlertActivated":"1","SMSCharges":"86771.00","IsBeneficiarySMSAlertActivated":"0","BeneficiarySMSCharge":"6532.00","HasWeekendOperation":"0","IsOutageMessageActive":"0","IsAlertActive":"0","IsTCActive":"0","IsAgreementActive":"0","IsCampaignActive":"1","WorkSchedule_id":"WORK_SCH_ID1","TransactionLimit_id":"TID1"}],"transactionFeeName":"IMPS","transactionFeeDescription":"desc","transferFeeSlabs":[],"periodLimits":[]};
        function onCreateCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to get create status').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if service created successfully').to.equal("success");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
        try {
            command.context.onPresentForm('frmServiceManagement',onCreateCompletion);
            servicesModule.presentationController.createService(createInputParam);
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_ServicesManagement_CreateService.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_CreateService;
    
});
define([], function() {

  	function TestCase_ServicesManagement_UpdateService(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_ServicesManagement_UpdateService, kony.mvc.Business.CommandHandler);
  
  	TestCase_ServicesManagement_UpdateService.prototype.execute = function(command){
		var servicesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ServicesManagementModule");
        var self = this;
        var expect = chai.expect;
		var editInputParam={"User_id":"UID11","editedEntitlement":[{"Service_id":"","Type_id":"","Channel_id":"","Code":"","Category_Id":"","DisplayName":"","DisplayDescription":"","Name":"","Description":"","Status_id":"","MaxTransferLimit":"5000.0","MinTransferLimit":"1.0","TransferDenominations":"100","IsFutureTransaction":"0","TransactionCharges":"20","IsAuthorizationRequired":"0","IsSMSAlertActivated":"0","SMSCharges":"0.1","IsBeneficiarySMSAlertActivated":"0","BeneficiarySMSCharge":"3.00","HasWeekendOperation":"0","IsOutageMessageActive":"0","IsAlertActive":"1","IsTCActive":"0","IsAgreementActive":"0","IsCampaignActive":"0","WorkSchedule_id":"","TransactionFee_id":"","TransactionLimit_id":""}],"periodLimits":[],"transferFeeSlabs":[]};
        function onUpdateCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to get update status').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if service updated successfully').to.equal("success");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
		  function onFetchCompletion(viewModel){
			try{
               if(viewModel&&viewModel.servicesList){
                    command.context.onPresentForm('frmServiceManagement', onUpdateCompletion);
					editInputParam.editedEntitlement[0].Service_id=viewModel.servicesList[0].id;
                 	editInputParam.editedEntitlement[0].Status_id=viewModel.servicesList[0].Status_id==="SID_ACTIVE"?"SID_INACTIVE":"SID_ACTIVE";
                 	editInputParam.editedEntitlement[0].Channel_id=viewModel.servicesList[0].Channel_id;
					editInputParam.editedEntitlement[0].Category_Id=viewModel.servicesList[0].Category_Id;
					editInputParam.editedEntitlement[0].Code=viewModel.servicesList[0].Code;
					editInputParam.editedEntitlement[0].DisplayName=viewModel.servicesList[0].DisplayName+"Edited";
					editInputParam.editedEntitlement[0].DisplayDescription=viewModel.servicesList[0].DisplayDescription;
					editInputParam.editedEntitlement[0].Name=viewModel.servicesList[0].Name;
					editInputParam.editedEntitlement[0].Description=viewModel.servicesList[0].Description.slice(0,10)+"Edited";
                    servicesModule.presentationController.updateService(editInputParam);
              }
         }catch(e){
          self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
         }
        }
        try {
            command.context.onPresentForm('frmServiceManagement',onFetchCompletion);
            servicesModule.presentationController.navigateTo('ServicesManagementModule','fetchAllServices');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_ServicesManagement_UpdateService.prototype.validate = function(){
		
    };
    
    return TestCase_ServicesManagement_UpdateService;
    
});
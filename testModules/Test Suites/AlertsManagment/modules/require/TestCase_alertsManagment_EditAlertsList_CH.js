define([], function() {

  function TestCase_alertsManagment_EditAlertsList_CH(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_alertsManagment_EditAlertsList_CH, kony.mvc.Business.CommandHandler);

  TestCase_alertsManagment_EditAlertsList_CH.prototype.execute = function(command){
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("AlertsManagementModule");
    var self = this;
    var expect = chai.expect;
    function onEditComplition(viewModel){
      try {
        if(viewModel.data){
          expect(viewModel,'to get response').to.include.keys(["alias","commandId","data","status"]);
          expect(viewModel.status , 'check status').to.equal(100);
          expect(viewModel.data, 'to get alerts').to.include.keys(["httpStatusCode","response","httpresponse","opstatus","VariableReference"]);
          expect(viewModel.data.response, 'to get more than zero records').to.have.length.above(0);
          expect(viewModel.data.VariableReference, 'to get more than zero variable reference').to.have.length.above(0);    
          expect(viewModel.data.opstatus).to.equal(0);
          expect(viewModel.data.httpresponse.responsecode).to.equal(200);
          self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
        }
      } catch (e) {
        self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
    try {
      var contextAlert = {
        alertContent : "A scheduled transaction for $BillAmount$ has been completed",
        alertDescription : "Sent when a new payee is registered for Bill Payment",
        alertID : "ALERT_ID_3_6_STE",
        alertName : "Scheduled Transaction Execution automated edit",
        alertTypeID : "ALERT_TYPE_ID_2_TP",
        isAlertEnabledOn_All : "false",
        isAlertEnabledOn_Email : "false",
        isAlertEnabledOn_Push : "true",
        isAlertEnabledOn_SMS : "true",
        status_ID : "SID_ACTIVE"
      };
      alertsModule.businessController
        .execute(new kony.mvc.Business.Command
                 ("com.kony.AlertsManagement.editAlert", contextAlert, onEditComplition));

    } catch (e) {
      this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
    }
  };

  TestCase_alertsManagment_EditAlertsList_CH.prototype.validate = function(){

  };

  return TestCase_alertsManagment_EditAlertsList_CH;

});
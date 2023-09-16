define([], function() {

  function TestCase_alertsManagment_EditAlerts_CH(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_alertsManagment_EditAlerts_CH, kony.mvc.Business.CommandHandler);

  TestCase_alertsManagment_EditAlerts_CH.prototype.execute = function(command){
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("AlertsManagementModule");
    var self = this;
    var expect = chai.expect;
    function onEditComplition(viewModel) {
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
      var contextAlertType = {
        alertTypeDescription : "Alerts generated irrespective of any user/customer/account type, and are independent of customer's alert subscriptions",
        alertTypeID : "ALERT_TYPE_ID_1_SECURITY",
        alertTypeName : "Security edit automated",
        isAlertSubscriptionRequired : true
      };
      alertsModule.businessController
        .execute(new kony.mvc.Business.Command
                 ("com.kony.AlertsManagement.editAlertType", contextAlertType, onEditComplition));
    } catch (e) {
      this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
    }		

  };

  TestCase_alertsManagment_EditAlerts_CH.prototype.validate = function(){

  };

  return TestCase_alertsManagment_EditAlerts_CH;

});
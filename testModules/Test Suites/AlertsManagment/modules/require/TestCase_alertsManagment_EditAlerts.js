define([], function() {

  function TestCase_alertsManagment_EditAlerts(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_alertsManagment_EditAlerts, kony.mvc.Business.CommandHandler);

  TestCase_alertsManagment_EditAlerts.prototype.execute = function(command){
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("AlertsManagementModule");
    var self = this;
    var expect = chai.expect;
    function onCompletionAlertType(viewModel) {
      try {
        if(viewModel.records){
          expect(viewModel, 'to get alerts').to.include.keys(["action","records","type","variableReference"]);
          expect(viewModel.records, 'to get more than zero records').to.have.length.above(0);
          expect(viewModel.variableReference, 'to get more than zero variable reference').to.have.length.above(0);              
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
        alertTypeName : "Security edit done with if",
        isAlertSubscriptionRequired : true
      };
      var completionCallback = function(response){
        kony.print(response);
      };
      command.context.onPresentForm('frmAlertsManagement', onCompletionAlertType);
      alertsModule.presentationController.editAlertType(contextAlertType, completionCallback);
    } catch (e) {
      this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
    }		
  };

  TestCase_alertsManagment_EditAlerts.prototype.validate = function(){

  };

  return TestCase_alertsManagment_EditAlerts;

});
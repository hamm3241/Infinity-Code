define([], function() {

  function TestCase_alertsManagment_EditAlertsList(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_alertsManagment_EditAlertsList, kony.mvc.Business.CommandHandler);

  TestCase_alertsManagment_EditAlertsList.prototype.execute = function(command){
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("AlertsManagementModule");
    var self = this;
    var expect = chai.expect;
    function onCompletionAlert(viewModel){
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
      var contextAlert = {
        alertContent : "You have recently signed in from new device",
        alertDescription : "Sent when a user attempts to login from new device",
        alertID : "ALERT_ID_1_7_LOGIN_NEW_DEVICE",
        alertName : "Login from new device automated edit ",
        alertTypeID : "ALERT_TYPE_ID_1_SECURITY",
        isAlertEnabledOn_All : "false",
        isAlertEnabledOn_Email : "false",
        isAlertEnabledOn_Push : "true",
        isAlertEnabledOn_SMS : "true",
        status_ID : "SID_ACTIVE"
      };
      var completionCallback = function(response){
        kony.print(response);
      };
      command.context.onPresentForm('frmAlertsManagement', onCompletionAlert);
      alertsModule.presentationController.editAlert(contextAlert,completionCallback,false);
    } catch (e) {
      this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
    }
  };

  TestCase_alertsManagment_EditAlertsList.prototype.validate = function(){

  };

  return TestCase_alertsManagment_EditAlertsList;

});
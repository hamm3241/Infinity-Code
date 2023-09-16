define([], function() {

  function TestCase_alertsManagment_DeleteAlert_CH(commandId) {
    kony.mvc.Business.CommandHandler.call(this, commandId);
  }

  inheritsFrom(TestCase_alertsManagment_DeleteAlert_CH, kony.mvc.Business.CommandHandler);

  TestCase_alertsManagment_DeleteAlert_CH.prototype.execute = function(command){
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager()
    .getModule("AlertsManagementModule");
    var self = this;
    var context = {
      "alertID" : ""
    };
    var expect = chai.expect;
    function onCompletion(viewModel) {
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
    function onFetchCompletion(res){
      try{
        if(res.records){
          context.alertID = res.records[1].Alerts[0].id;
          alertsModule.businessController
            .execute(new kony.mvc.Business.Command
                     ("com.kony.AlertsManagement.deleteAlert", context, onCompletion));
        }
      }catch(e){
        self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
      }
    }
    try {
      command.context.onPresentForm('frmAlertsManagement', onFetchCompletion);
      alertsModule.presentationController.navigateTo('AlertsManagementModule','initAlerts');
    } catch (e) {
      this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
    }		
  };

  TestCase_alertsManagment_DeleteAlert_CH.prototype.validate = function(){

  };

  return TestCase_alertsManagment_DeleteAlert_CH;

});
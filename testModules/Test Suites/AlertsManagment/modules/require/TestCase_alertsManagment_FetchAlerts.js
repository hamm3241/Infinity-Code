define([], function() {

  	function TestCase_alertsManagment_FetchAlerts(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_alertsManagment_FetchAlerts, kony.mvc.Business.CommandHandler);
  
  	TestCase_alertsManagment_FetchAlerts.prototype.execute = function(command){
		var alertsModule = kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager()
        .getModule("AlertsManagementModule");
        var self = this;
        var expect = chai.expect;
      	function onCompletion(viewModel) {
            try {
              if(viewModel.records){
              	expect(viewModel, 'to get alerts').to.include.keys(["action","records","reset","type","variableReference"]);
                expect(viewModel.records, 'to get more than zero records').to.have.length.above(0);
                expect(viewModel.variableReference, 'to get more than zero variable reference').to.have.length.above(0);              
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
      	try {
            command.context.onPresentForm('frmAlertsManagement', onCompletion);
            alertsModule.presentationController.navigateTo('AlertsManagementModule','initAlerts');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_alertsManagment_FetchAlerts.prototype.validate = function(){
		
    };
    
    return TestCase_alertsManagment_FetchAlerts;
    
});
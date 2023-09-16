define([], function() {

  	function TestCase_OutageMessages_AddOutageMessage(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_OutageMessages_AddOutageMessage, kony.mvc.Business.CommandHandler);
  
  	TestCase_OutageMessages_AddOutageMessage.prototype.execute = function(command){
		var messagesModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("OutageMessageModule");
        var self = this;
        var expect = chai.expect;
		var serviceIds=[];
      	var addServId="";
		var deleteInputParam=[{"id":""}];
		var createInputParam={"Service_id":"","MessageText":"Sample outage message","Status_id":"","createdby":"UID11","modifiedby":"UID11"};
        function onCreateCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to get update status').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if status changed successfully').to.equal("success");
                self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
      function addOutageMessage() {
            try {
                command.context.onPresentForm('frmOutageMessage', onCreateCompletion);
				createInputParam.Service_id=addServId;
				createInputParam.Status_id="SID_ACTIVE";
                messagesModule.presentationController.createOutageMessage(createInputParam);
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
		  function onDeleteCompletion(viewModel) {
            try {
              if(viewModel&&viewModel.toast){
                expect(viewModel.toast, 'to get update status').to.include.keys("status","message");
                expect(viewModel.toast.status, 'to check if message deleted successfully').to.equal("success");
                addOutageMessage();
              }
            }catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
        }
     	function onServFetchCompletion(viewModel){
			try{
                 	if(viewModel&&viewModel.serviceViewList){
                        for(var i=0;i<viewModel.serviceViewList.length;i++){
                            if(!serviceIds.contains(viewModel.serviceViewList[i].id)){
                              addServId=viewModel.serviceViewList[i].id;
                              addOutageMessage();
                         	  break;
                            }
                          }
                      if(addServId===""){
                        addServId=viewModel.serviceViewList[0].id;
                        deleteInputParam[0].id=viewModel.serviceViewList[0].id;
                        command.context.onPresentForm('frmOutageMessage', onDeleteCompletion);
                     	messagesModule.presentationController.deleteOutageMessage(deleteInputParam);
                      }
                    }
            }
           catch(e){
            self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
           }
          }
      function onFetchCompletion(viewModel){
        try{
          if(viewModel&&viewModel.outageMessageList){
            if(viewModel.outageMessageList.length>0){
                   for(var i=0;i<viewModel.outageMessageList.length;i++){
                        serviceIds.push(viewModel.outageMessageList[i].Service_id);
                   }
            }
                  command.context.onPresentForm('frmOutageMessage',onServFetchCompletion);
                  messagesModule.presentationController.navigateTo('OutageMessageModule','fetchServiceView');
          }
        }
        catch(e){
            self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
           }
      }
        try {
            command.context.onPresentForm('frmOutageMessage',onFetchCompletion);
            messagesModule.presentationController.navigateTo('OutageMessageModule','fetchOutageMessage');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_OutageMessages_AddOutageMessage.prototype.validate = function(){
		
    };
    
    return TestCase_OutageMessages_AddOutageMessage;
    
});
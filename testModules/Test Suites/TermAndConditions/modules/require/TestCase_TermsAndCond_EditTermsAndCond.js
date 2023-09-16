define([], function() {

  	function TestCase_TermsAndCond_EditTermsAndCond(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_TermsAndCond_EditTermsAndCond, kony.mvc.Business.CommandHandler);
  
  	TestCase_TermsAndCond_EditTermsAndCond.prototype.execute = function(command){
  	
		var termsAndCondModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsModule");
        var self = this;
        var expect = chai.expect;
        
        var inputParam = {
			"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID, 
			"TermsAndConditionsData": {
				"Status_id": "SID_INACTIVE",
                "Description": btoa("abc <div>abc </div><div>abc abc</div>")
            }           
        };
        
        try {
            command.context.onPresentForm('frmTermsAndConditions', onFetchCompletion);
            termsAndCondModule.presentationController.navigateTo('TermsAndConditionsModule', 'fetchTermsConditions');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
        
        	function onFetchCompletion(viewModel){
        	
        	if(viewModel && viewModel.termsAndConditionsViewModel){
        
            try {
                expect(viewModel, 'to get terms and cond').to.include.keys("termsAndConditionsViewModel");
                expect(viewModel.termsAndConditionsViewModel, 'to get terms and cond').to.include.keys("termsAndConditions");
              //  expect(viewModel.termsAndConditionsViewModel.termsAndConditions, 'to get more than zero').to.have.length.above(0);
              expect(viewModel.termsAndConditionsViewModel.termsAndConditions, 'for permission to have fields').to.include.keys(["Description", "createdby", "Status_id", "id", "synctimestamp", "createdts", "softdeleteflag"]);
			
			var inputParam = {
						"user_ID": kony.mvc.MDAApplication.getSharedInstance().appContext.userID,
                      "TermsAndConditionsData": {  
                        "Description": btoa("abc <div>abc </div><div>abc abc</div>"),
                        "Status_id": "SID_INACTIVE"
                        }
                        
                    };
			command.context.onPresentForm('frmTermsAndConditions', onEditCompletion);
            termsAndCondModule.presentationController.editTermsConditions(inputParam);

            } catch (e) {
                self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
            }
            }
            
                          
            
		}
        
		
        function onEditCompletion(viewModel){
			try{
               if(viewModel && viewModel.toastModel){

                 expect(viewModel.toastModel, 'to delete terms and cond').to.include.keys("status");
                    expect(viewModel.toastModel.status, 'to edit terms and cond').to.equal("SUCCESS");
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
	
		
    };
	
	TestCase_TermsAndCond_EditTermsAndCond.prototype.validate = function(){
		
    };
    
    return TestCase_TermsAndCond_EditTermsAndCond;
    
});
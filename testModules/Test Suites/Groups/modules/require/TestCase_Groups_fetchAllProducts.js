define([], function() {

  	function TestCase_Groups_fetchAllProducts(commandId) {
        kony.mvc.Business.CommandHandler.call(this, commandId);
    }
	
    inheritsFrom(TestCase_Groups_fetchAllProducts, kony.mvc.Business.CommandHandler);
  
  	TestCase_Groups_fetchAllProducts.prototype.execute = function(command){
		var groupsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CustomerGroupsModule");
        var self = this;
        var expect = chai.expect;
		function onFetchCompletion(viewModel){
			try{
               if(viewModel){
                 if(viewModel.products && viewModel.context === ""){
                    expect(viewModel.products,'to get products').to.have.length.above(0);
                    expect(viewModel.products[0], 'to verify fields in product').to.include.all.
                      keys(['id', 'Name','Status_id','Type_id','ProductFeatures','ProductCode','productDescription']);
                    self.sendResponse(command, kony.mvc.constants.STATUS_SUCCESS, viewModel);
                 }
              }
			}catch(e){
				self.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
			}
		}
		try {
            command.context.onPresentForm('frmGroups', onFetchCompletion);
            groupsModule.presentationController.navigateTo('CustomerGroupsModule','fetchAllProducts');
        } catch (e) {
            this.sendResponse(command, kony.mvc.constants.STATUS_Failure, e);
        }
    };
	
	TestCase_Groups_fetchAllProducts.prototype.validate = function(){
		
    };
    
    return TestCase_Groups_fetchAllProducts;
    
});
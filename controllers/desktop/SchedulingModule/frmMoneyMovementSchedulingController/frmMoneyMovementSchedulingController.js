define({ 
  formPreshow: function() {
    this.view.mainHeader.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.leftMenu.MoneyMovementScheduling");
    this.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftMenu.MoneyMovementScheduling");
    this.setFlowActions();
  },
  willUpdateUI : function(viewModel){
    var self=this;
    this.updateLeftMenu(viewModel);
    if(viewModel){
      if(viewModel==="showJobsList"){
        self.showJobsList();
      }
    }else
      return;
  },
  setFlowActions : function(){
    var scopeObj=this;
	this.view.mainHeader.btnAddNewOption.onClick = function(){
      scopeObj.showAddJobScreen();
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function(){
      scopeObj.showJobsList();
    };
    this.view.btnCancel.onClick = function(){
      scopeObj.showJobsList();
    };
    this.view.btnsave.onClick = function(){
      scopeObj.showJobsList();
    };
  },
  showJobsList : function(){
    this.view.flxViews.setVisibility(false);
    this.view.flxJobList.setVisibility(true);
    this.view.flxSegJobs.setVisibility(true);
  },
  showAddJobScreen: function(){
    this.view.flxJobList.setVisibility(false);
    this.view.flxViews.setVisibility(true);
  }


});
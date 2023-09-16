define(function() {

  return {
    setCompFlowActions : function(){
      var scopeObj = this;
      this.view.tbxSearchBox.onTouchStart = function(){
        scopeObj.view.flxSearchContainer.skin = "sknFlxSegRowHover11abeb";
      };
      this.view.tbxSearchBox.onEndEditing = function(){
        scopeObj.view.flxSearchContainer.skin = "sknflxffffffBorderd6dbe7Radius4px";
      };
    },
    showSchedulerDetails : function(){
      var ScopeObj = this;
      
    }
  };
});
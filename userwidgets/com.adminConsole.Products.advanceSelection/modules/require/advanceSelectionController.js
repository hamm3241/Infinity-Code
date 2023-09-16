define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.flxDropdown.onClick = function(){
          scopeObj.toggleContent();
        };
        this.view.lblFeatureName.onClick = function(){
          scopeObj.toggleContent();
        };
      },
      toggleContent : function(){
        if(this.view.flxHideDisplayActions.isVisible){
          this.view.fonticonArrow.text = "\ue922";
          this.view.flxHideDisplayActions.setVisibility(false);
        }
        else{
          this.view.fonticonArrow.text = "\ue915";
          this.view.flxHideDisplayActions.setVisibility(true);
        }
      }
	};
});
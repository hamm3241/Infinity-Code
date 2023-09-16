define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.flxToggle.onClick = function(){
          scopeObj.toggleContent();
        };
        this.view.lblFeatureName.onClick = function(){
          scopeObj.toggleContent();
        };
      },
      toggleContent : function(){
        if(this.view.flxHideDisplayContent.isVisible){
          this.view.lblToggle.text = "\ue922";
          this.view.flxHideDisplayContent.setVisibility(false);
        }
        else{
          this.view.lblToggle.text = "\ue915";
          this.view.flxHideDisplayContent.setVisibility(true);
        }
      }
	};
});
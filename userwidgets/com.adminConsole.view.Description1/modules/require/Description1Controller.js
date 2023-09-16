define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.flxToggleDescription.onClick = function(){
          scopeObj.toggleDescription();
        };
        this.view.lblDescription.onClick = function(){
          scopeObj.toggleDescription();
        };
      },
      toggleDescription : function(){
        if(this.view.rtxDescription.isVisible){
          this.view.lblToggleDescription.text = "\ue922";
          this.view.rtxDescription.setVisibility(false);
        }
        else{
          this.view.lblToggleDescription.text = "\ue915";
          this.view.rtxDescription.setVisibility(true);
        }
      }
	};
});
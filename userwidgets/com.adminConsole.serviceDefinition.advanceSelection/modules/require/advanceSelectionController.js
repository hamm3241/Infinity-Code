define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.flxFeatureNameContainer.onClick = function(){
          scopeObj.toggleContent();
        };
      },
      toggleContent : function(){
        if(this.view.flxAdvancedSelectionContent.isVisible){
          this.view.fonticonArrow.text = "\ue922";
          this.view.flxAdvancedSelectionContent.setVisibility(false);
        }
        else{
          this.view.fonticonArrow.text = "\ue915";
          this.view.flxAdvancedSelectionContent.setVisibility(true);
        }
      }
	};
});
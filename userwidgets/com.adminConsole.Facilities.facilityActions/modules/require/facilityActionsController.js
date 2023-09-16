define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.flxFacilityActionDropdown.onClick = function(){
          scopeObj.toggleContent();
        };
        this.view.lblFacilityName.onClick = function(){
          scopeObj.toggleContent();
        };

      },
      toggleContent : function(){
        if(this.view.flxFacilityActionsContent.isVisible){
          this.view.fonticonArrowActionFacility.text = "\ue922";
          this.view.flxFacilityActionsContent.setVisibility(false);
        }
        else{
          this.view.fonticonArrowActionFacility.text = "\ue915";
          this.view.flxFacilityActionsContent.setVisibility(true);
        }
      },
	  collapseFeature : function() {
		this.view.fonticonArrowActionFacility.text = "\ue922";
		this.view.flxFacilityActionsContent.setVisibility(false);
      }

	};
});

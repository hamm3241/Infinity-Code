define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.flxToggleDescription.onClick = function(){
          scopeObj.toggleDescription();
        };
      },
      toggleDescription : function(){
        if(this.view.rtxDescription.isVisible){
          this.view.imgToggleDescription.src = "img_desc_arrow.png";
          this.view.rtxDescription.setVisibility(false);
        }
        else{
          this.view.imgToggleDescription.src = "img_down_arrow.png";
          this.view.rtxDescription.setVisibility(true);
        }
      }

	};
});
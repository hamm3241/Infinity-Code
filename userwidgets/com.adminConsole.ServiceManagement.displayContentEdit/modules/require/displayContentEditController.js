define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.tbxEditName.onKeyUp = function(){
          scopeObj.view.tbxEditName.skin = "skntbxLato35475f14px";
          scopeObj.view.flxNoEditNameError.isVisible = false;
          if(scopeObj.view.tbxEditName.text.length===0){
              scopeObj.view.lblNameCount.setVisibility(false);
          }else{
            scopeObj.view.lblNameCount.setVisibility(true);
            scopeObj.view.lblNameCount.text=scopeObj.view.tbxEditName.text.length+"/60";
          }
          scopeObj.view.forceLayout();
        };
        this.view.txtareaEditDescription.onKeyUp= function(){
          scopeObj.view.txtareaEditDescription.skin = "skntxtAreaLato35475f14Px";
          scopeObj.view.flxNoEditDescriptionError.isVisible = false;
          if(scopeObj.view.txtareaEditDescription.text.length===0){
            scopeObj.view.lblDescriptionCount.setVisibility(false);
          }else{
            scopeObj.view.lblDescriptionCount.setVisibility(true);
            scopeObj.view.lblDescriptionCount.text=scopeObj.view.txtareaEditDescription.text.length+"/100";
          }
          scopeObj.view.forceLayout();
        };
      },	
	};
});
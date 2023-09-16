define(function() {

  return {
    setFlowActions : function(){
      var scopeObj=this;
      this.view.lblToggle.skin ="sknIcon6E7178Sz15px";
      this.view.lblToggle.text = "\ue922";
      this.view.flxHideDisplayContent.setVisibility(false);
      this.view.lblHeaderSeperator.setVisibility(false);
      this.view.flxToggle.onClick = function(){
        scopeObj.toggleContent();
      };
    },
    toggleContent : function(){
      if(this.view.flxHideDisplayContent.isVisible){
        this.view.lblToggle.skin ="sknIcon6E7178Sz15px";
        this.view.lblToggle.text = "\ue922";
        this.view.flxHideDisplayContent.setVisibility(false);
        this.view.lblHeaderSeperator.setVisibility(false);
      }
      else{
        this.view.lblToggle.skin ="sknIcon6E7178Sz13px";
        this.view.lblToggle.text = "\ue915";
        this.view.flxHideDisplayContent.setVisibility(true);
        this.view.lblHeaderSeperator.setVisibility(true);
      }
      this.view.forceLayout();
    }
  };
});
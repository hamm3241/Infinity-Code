define(function() {

  return {
    callPreshow : function(){
      this.initializeActions();
    },
    initializeActions : function(){
    },
    /*
  * set the collapse arrow images based on visibility
  */
    toggleCollapseArrow : function(opt){
      if(opt === true){
        this.view.lblArrow.text = "\ue915"; //down-arrow
        this.view.lblArrow.skin = "sknIcon00000014px";
        this.view.flxBottomContainer.setVisibility(true);
        this.view.flxBottomSeperator.setVisibility(true);
      } else{
        this.view.lblArrow.text = "\ue922"; //right-arrow
        this.view.lblArrow.skin = "sknIcon00000015px";
        this.view.flxBottomContainer.setVisibility(false);
        this.view.flxBottomSeperator.setVisibility(false);
      }

    },
  };
});
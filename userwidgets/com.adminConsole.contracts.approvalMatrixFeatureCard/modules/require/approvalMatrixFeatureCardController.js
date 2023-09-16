define(function() {

  return {
    callPreShow : function(){
      this.setActions();
    },
    setActions : function(){

    },

    /*
  * toggle listing segment on clock of arrow
  */
    toggleCollapseArrow : function(opt){
      if(opt === true){
        this.view.lblToggle.text = "\ue915"; //down-arrow
        this.view.lblToggle.skin = "sknIcon00000014px";
        this.view.flxCardBottomContainer.setVisibility(true);
        this.view.flxBottomSeperator.setVisibility(true);
        this.view.flxTopSeperatorLine.setVisibility(false);
      } else if(opt === false){
        this.view.lblToggle.text = "\ue922"; //right-arrow
        this.view.lblToggle.skin = "sknIcon00000015px";
        this.view.flxCardBottomContainer.setVisibility(false);
        this.view.flxBottomSeperator.setVisibility(false);
        this.view.flxTopSeperatorLine.setVisibility(true);
      }
    }
  };
});
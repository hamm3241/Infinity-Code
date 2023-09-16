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
        this.view.lblArrow.text = "\ue915"; //down-arrow
        this.view.lblArrow.skin = "sknIcon00000014px";
        this.view.flxCardBottomContainer.setVisibility(true);
        this.view.flxBottomSeperator.setVisibility(true);
      } else if(opt === false){
        this.view.lblArrow.text = "\ue922"; //right-arrow
        this.view.lblArrow.skin = "sknIcon00000015px";
        this.view.flxCardBottomContainer.setVisibility(false);
        this.view.flxBottomSeperator.setVisibility(false);
      }
    },
    /*
    * show 3 column division for details part
    */
    showThreeColumns : function(){
      this.view.flxColumn4.setVisibility(false);
      this.view.flxColumn1.width = "29%";
      this.view.flxColumn2.width = "29%";
      this.view.flxColumn3.width = "29%";
      this.view.forceLayout();
    },
    /*
    * show 4 column division for details part
    */
    showFourColumns : function(){
      this.view.flxColumn4.setVisibility(true);
      this.view.flxColumn1.width = "22.5%";
      this.view.flxColumn2.width = "22.5%";
      this.view.flxColumn3.width = "22.5%";
      this.view.flxColumn4.width = "22.5%";
      this.view.forceLayout();
      
    },
  };
});
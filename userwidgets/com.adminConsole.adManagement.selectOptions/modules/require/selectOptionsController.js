define(function() {

  return {
    setContextualMenuItem : function(status){
      if(status==="Active"){
        this.view.flxOption1.setVisibility(true);
        this.view.fontIconOption1.text="\ue91d";
        this.view.lblOption1.text="Pause";
        this.view.flxOption2.setVisibility(true);
        this.view.fontIconOption2.text="";
        this.view.lblOption2.text="Terminate";
        this.view.flxOption3.setVisibility(false);
        this.view.fontIconOption3.text="";
        this.view.lblOption3.text="";
      }
      else if(status==="Completed"){
        this.view.flxOption1.setVisibility(true);
        this.view.fontIconOption1.text="";
        this.view.lblOption1.text="Restart";
        this.view.flxOption2.setVisibility(false);
        this.view.fontIconOption2.text="";
        this.view.lblOption2.text="";
        this.view.flxOption3.setVisibility(false);
        this.view.fontIconOption3.text="";
        this.view.lblOption3.text="";
      }
      else if(status==="Paused"){
        this.view.flxOption1.setVisibility(true);
        this.view.fontIconOption1.text="\ue91e";
        this.view.lblOption1.text="Edit";
        this.view.flxOption2.setVisibility(true);
        this.view.fontIconOption2.text="\ue956";
        this.view.lblOption2.text="Resume";
        this.view.flxOption3.setVisibility(true);
        this.view.fontIconOption3.text="";
        this.view.lblOption3.text="Terminate";
      }
      else if(status==="Scheduled"){
        this.view.flxOption1.setVisibility(true);
        this.view.fontIconOption1.text="\ue91e";
        this.view.lblOption1.text="Edit";
        this.view.flxOption2.setVisibility(true);
        this.view.fontIconOption2.text="\ue91d";
        this.view.lblOption2.text="Pause";
        this.view.flxOption3.setVisibility(true);
        this.view.fontIconOption3.text="";
        this.view.lblOption3.text="Terminate";
      }
    },


  };
});
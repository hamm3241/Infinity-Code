define(function() {

  return {

    popupDetailsPreShow: function(){
      this.setFlowActions();
    },

    showPopupDetails : function(){
      //setting flx details visibility off and changing icon to collapse
      if(this.view.flxPopupDetailsBody.isVisible){
        this.view.flxPopupDetailsBody.setVisibility(false);
        this.view.fonticonArrow.text = "\ue922";
      }
      else{
        this.view.flxPopupDetailsBody.setVisibility(true);
        this.view.fonticonArrow.text = "\ue915";
      }
    },

    setFlowActions : function(){
      var scopeObj=this;
      this.view.flxDropdown.onClick = function(){
        scopeObj.showPopupDetails();
      };

    }
  };
});
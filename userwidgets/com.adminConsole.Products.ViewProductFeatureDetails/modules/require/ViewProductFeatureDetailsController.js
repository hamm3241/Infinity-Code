define(function() {

  return {

    viewFeatureDetailsPreShow: function(){
      this.setFlowActions();
    },

    showFeatureDetails : function(){
      //setting Details visibility off and changing icon to collapse
      if(this.view.flxExpand.isVisible){
        this.view.flxExpand.setVisibility(false);
        this.view.fonticonArrow.text = "\ue922";
      }
      else{
        this.view.flxExpand.setVisibility(true);
        this.view.fonticonArrow.text = "\ue915";
      }
    },

    setFlowActions : function(){
      var scopeObj=this;
      this.view.flxDropdown.onClick = function(){
        scopeObj.showFeatureDetails();
      };

    }
  };
});
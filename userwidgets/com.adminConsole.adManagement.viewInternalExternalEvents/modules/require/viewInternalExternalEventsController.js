define(function() {

  return {

    viewInternalExternalEventsPreShow: function(){
      this.setFlowActions();
    },

    showEvents : function(){
      //setting segment visibility off and changing icon to collapse
      if(this.view.flxEventsBody.isVisible){
        this.view.flxEventsBody.setVisibility(false);
        this.view.fontIconEventsExpandCollapse.text = "\ue922";
      }
      else{
        this.view.flxEventsBody.setVisibility(true);
        this.view.fontIconEventsExpandCollapse.text = "\ue915";
      }
      this.view.forceLayout();
    },

    setFlowActions : function(){
      var scopeObj=this;
      this.view.flxEventsExpandCollapse.onClick = function(){
        scopeObj.showEvents();
      };

    }
  };
});
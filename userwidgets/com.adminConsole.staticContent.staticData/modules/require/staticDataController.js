define(function() {

  return {
    setCompFlowActions : function(){
      var scopeObj=this;
      scopeObj.view.flxSelectOptions.isVisible =false;
      this.view.flxOptions.onClick=function(){
        scopeObj.toggleContextualMenu();
        if(scopeObj.view.flxSelectOptions.isVisible===true)
          scopeObj.view.flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
        else
          scopeObj.view.flxOptions.skin = "sknFlxBorffffff1pxRound";
      };
    },
    toggleContextualMenu : function(){
      if(this.view.flxSelectOptions.isVisible){
        this.view.flxSelectOptions.isVisible = false;
        this.view.forceLayout();
      }
      else{
        this.view.flxSelectOptions.isVisible = true;
        this.view.forceLayout();
      }
    },
    updateContextualMenu : function(){
      kony.print("updating contextual menu");
    },
    deactivateContant : function(){
      this.view.lblUsersStatus.text = "InActive";
    }
  };




});
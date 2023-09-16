define(function() {

  return {
    callPreshow : function(){
    },
    initializeActions : function(){
      var scopeObj =this;
    },
    incrementValue: function(){
      var value = this.view.plusMinusApprovals.tbxcharcterSize.text || "1";
      var incVal = parseInt(value,10) + 1;
      this.view.plusMinusApprovals.tbxcharcterSize.text = incVal;
      if(incVal > 1){
        this.view.plusMinusApprovals.flxPlus.setVisibility(true);
        this.view.plusMinusApprovals.flxPlusDisable.setVisibility(false);
      }
    },
    decrementValue: function(){
      var value = this.view.plusMinusApprovals.tbxcharcterSize.text || "1";
      var decVal = parseInt(value,10) -1;
      this.view.plusMinusApprovals.tbxcharcterSize.text = decVal;
      if(decVal <= 1){
        this.view.plusMinusApprovals.flxPlus.setVisibility(false);
        this.view.plusMinusApprovals.flxPlusDisable.setVisibility(true);
      }
      this.view.forceLayout();
    },
  };
});
define( {

	editGeneralInfoPreshow :function(){
      //this.setFlowActions();
    },
  setFlowActions :function(){
    var scopeObj = this;
    this.view.flxFlag1.onClick = function() {
	  if (scopeObj.view.imgFlag1.src ==="checkbox.png") {
		scopeObj.view.imgFlag1.src = "checkboxselected.png";
	  }
      else{
        scopeObj.view.imgFlag1.src = "checkbox.png";
      }
	};
    this.view.flxFlag2.onClick = function() {
	  if (scopeObj.view.imgFlag2.src ==="checkbox.png") {
		scopeObj.view.imgFlag2.src = "checkboxselected.png";
	  }
      else{
        scopeObj.view.imgFlag2.src = "checkbox.png";
      }
	};
    this.view.flxFlag3.onClick = function() {
	  if (scopeObj.view.imgFlag3.src ==="checkbox.png") {
		scopeObj.view.imgFlag3.src = "checkboxselected.png";
	  }
      else{
        scopeObj.view.imgFlag3.src = "checkbox.png";
      }
	};
  
}
});
define( {

 editContactPreShow: function() {
   this.setFlowActions();
 },
  setFlowActions: function(){
	var scopeObj = this;
    this.view.flxRadio1.onClick = function() {
	  if (scopeObj.view.imgRadio1.src === "radio_notselected.png") {
		
		
		scopeObj.view.imgRadio1.src = "radio_selected.png";
		scopeObj.view.imgRadio2.src = "radio_notselected.png";
        scopeObj.view.imgRadio3.src = "radio_notselected.png";
	  }
	};
	this.view.flxRadio2.onClick = function() {
	  if (scopeObj.view.imgRadio2.src === "radio_notselected.png") {
		scopeObj.view.imgRadio2.src = "radio_selected.png";
		scopeObj.view.imgRadio1.src = "radio_notselected.png";
        scopeObj.view.imgRadio3.src = "radio_notselected.png";
	  }
	};
	this.view.flxRadio3.onClick = function() {
	  if (scopeObj.view.imgRadio3.src === "radio_notselected.png") {
		scopeObj.view.imgRadio3.src = "radio_selected.png";
		scopeObj.view.imgRadio1.src = "radio_notselected.png";
        scopeObj.view.imgRadio2.src = "radio_notselected.png";
	  }
	};
  }
	
});
define({ 
  toggleCheckbox :  function(){
    var ScopeObj = this;
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndex;
    var rowIndex = index[1];
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    if (data[rowIndex].imgCheckBox.src === "checkbox.png") {
    	if (data[rowIndex].lblServiceStatus.text === "Active")
    		ScopeObj.showDeactivateAndDelete();
    	else
    		ScopeObj.showActivateAndDelete();
    	data[rowIndex].imgCheckBox.src = "checkboxselected.png";
    } else {
    	data[rowIndex].imgCheckBox.src = "checkbox.png";
    	kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
    }
    kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(data[rowIndex], rowIndex);
  },
  toggleCheckbox2 : function(){
    var ScopeObj = this;
    var length = 0;
    var active = false;
    var inactive = false;
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndices;
    if (index !== null) {
    	length = index[0][1].length;
    	var rowIndex = index[0][1];
    }
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    if (length === 1) {
    	if (data[rowIndex].lblServiceStatus.text === "Active")
    		ScopeObj.showDeactivateAndDelete();
    	else
    		ScopeObj.showActivateAndDelete();
    	data[rowIndex].imgCheckBox.src = "checkboxselected.png";
    } else if (length > 1) {
    	for (var i = 0; i < length; i++) {
    		if (data[index[0][1][i]].lblServiceStatus.text === "Active") {
    			active = true;
    		}
    		if (data[index[0][1][i]].lblServiceStatus.text === "Inactive") {
    			inactive = true;
    		}
    	}
    	ScopeObj.callActiveInactiveFunction(active,inactive);
    } else {
    	kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
    	kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkbox.png";
    }
    if (index !== null && data.length === index[0][1].length)
    	kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkboxselected.png";
    else
    	kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkbox.png";
  },
  callActiveInactiveFunction : function(active,inactive){
	 var ScopeObj = this;
	 if (active && inactive) {
    		ScopeObj.showAllOptions();
    	} else if (active === true && inactive === false) {
    		ScopeObj.showDeactivateAndDelete();
    	} else if (active === false && inactive === true) {
    		ScopeObj.showActivateAndDelete();
    	} 
  },
  showAllOptions : function(){
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "107px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(true);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showDeactivateAndDelete : function()
  {
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "71px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(false);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showActivateAndDelete : function()
  {
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "71px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(false);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  }
});
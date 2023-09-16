define({ 

	removeRow: function(){
		var index = kony.application.getCurrentForm().segSelectedOptions.selectedIndex;
		var rowIndex = index[0];
		kony.application.getCurrentForm().segSelectedOptions.removeAt(rowIndex);
	}

 });
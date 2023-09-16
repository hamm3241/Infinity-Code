define({ 

 addUsers: function(){
		var index = kony.application.getCurrentForm().segAddOptions.selectedIndex;
		var rowIndex = index[0];
		var data = kony.application.getCurrentForm().segAddOptions.data;
		var lblOptionText=data[rowIndex].lblFullName;
		var toAdd={
			"imgClose": "close_blue.png",
			"lblOption": ""+lblOptionText
		};
		var data2 = kony.application.getCurrentForm().segSelectedOptions.data;
		data2.push(toAdd);
   		kony.application.getCurrentForm().segSelectedOptions.setData(data2);
   		kony.application.getCurrentForm().forceLayout();
	},

 });
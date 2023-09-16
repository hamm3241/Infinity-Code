define(function() {

	return {
		addService : function(){
			var lblOptionText = kony.application.getCurrentForm().addAndRemoveOptions.segAddOptions.selectedItems[0].lblName;
			var toAdd={
			"imgClose": "close_blue.png",
			"lblOption": ""+lblOptionText
			};
			var data2 = kony.application.getCurrentForm().addAndRemoveOptions.segSelectedOptions.data;
			data2.push(toAdd);
			kony.application.getCurrentForm().addAndRemoveOptions.segSelectedOptions.setData(data2);
			kony.application.getCurrentForm().forceLayout();
          kony.print("called in template controller");
		}
	};
});
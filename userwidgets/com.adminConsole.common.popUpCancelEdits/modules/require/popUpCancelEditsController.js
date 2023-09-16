define(function() {
	return {
		setPopUpActions : function(navigate, cancel){
			this.view.btnPopUpCancel.onClick = cancel;
			this.view.flxPopUpClose.onClick = cancel;
			this.view.btnPopUpDelete.onClick = navigate;
		},
		clearPopUpActions : function(){
			var noAction = function(){
				kony.print('No Action Assigned this Event.');
			};
			this.view.btnPopUpCancel.onClick = noAction;
			this.view.flxPopUpClose.onClick = noAction;
			this.view.btnPopUpDelete.onClick = noAction;
		}
	};
});
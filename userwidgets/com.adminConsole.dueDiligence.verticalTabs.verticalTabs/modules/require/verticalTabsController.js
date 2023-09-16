define(function() {

	return {
		showSelectedOptionImage : function(imgWidget){
	        this.view.lblSelected1.setVisibility(false);
	        this.view.lblSelected2.setVisibility(false);
	        this.view.lblSelected3.setVisibility(false);
	        this.view.lblSelected4.setVisibility(false);
            this.view.lblSelectedSub31.setVisibility(false);
            this.view.lblSelectedSub32.setVisibility(false);
	        imgWidget.setVisibility(true);
    	},
    	setSelectedOptionButtonStyle : function(btnWidget){
    		this.view.btnOption1.skin="sknBtn737678LatoReg12pxNoBgBorder";
    		this.view.btnOption2.skin="sknBtn737678LatoReg12pxNoBgBorder";
    		this.view.btnOption3.skin="sknBtn737678LatoReg12pxNoBgBorder";
    		this.view.btnOption4.skin="sknBtn737678LatoReg12pxNoBgBorder";
            this.view.btnSubOption31.skin="sknBtn737678LatoReg12pxNoBgBorder";
            this.view.btnSubOption32.skin="sknBtn737678LatoReg12pxNoBgBorder";
    		btnWidget.skin="sknBtnLatoBold485c7512PxNoBorder";
    	},
    	verticalTabsPreShow: function(){
    		this.showSelectedOptionImage(this.view.lblSelected1);
    		this.setSelectedOptionButtonStyle(this.view.btnOption1);
    	}

/*
example to use above functions
    	setFlowActions : function(){
    		var scopeObj=this;
    		this.view.btnOption1.onClick= function(){
	            scopeObj.showSelectedOptionImage(scopeObj.view.imgSelected1);
	            scopeObj.setSelectedOptionButtonStyle(scopeObj.view.btnOption1);
	            //additional functions which needs to be called
	        };
    	}
*/
	};
});
define(function() {

	return {
		showSelectedOptionImage : function(imgWidget){
	        this.view.fontIconSelected1.setVisibility(false);
	        this.view.fontIconSelected2.setVisibility(false);
	        this.view.fontIconSelected3.setVisibility(false);
	        this.view.fontIconSelected4.setVisibility(false);
	        imgWidget.setVisibility(true);
    	},
    	setSelectedOptionButtonStyle : function(btnWidget){
    		this.view.btnOption1.skin="Btn84939efont13px";
    		this.view.btnOption2.skin="Btn84939efont13px";
    		this.view.btnOption3.skin="Btn84939efont13px";
    		this.view.btnOption4.skin="Btn84939efont13px";
    		btnWidget.skin="Btn000000font13px";
    	},
    	verticalTabsPreShow: function(){
    		this.showSelectedOptionImage(this.view.fontIconSelected1);
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
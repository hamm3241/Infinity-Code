define(function() {

	return {
      setFlowActions : function(){
        var scopeObj = this;
        this.view.tbxSearchBox.onTouchStart = function(){
          //scopeObj.view.flxSearchContainer.skin = "sknFontIconSearchCross16px";
          scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
        };
        this.view.tbxSearchBox.onEndEditing = function(){
          scopeObj.view.flxSearchContainer.skin = "sknflxd5d9ddop100";
        };
      },
	};
});
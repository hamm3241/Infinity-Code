define(function() {
	return {

      callPreshow : function(){
        this.setActions();
        this.view.flxEnterValue.skin = "sknflxEnterValueNormal";
      },
      setActions: function(){
        var scopeObj =this;
        this.view.tbxEnterValue.onBeginEditing = function(){
          if(scopeObj.view.flxEnterValue.skin !== "sknFlxBgFFFFFFBr1293cc1pxRound3px" && (scopeObj.view.flxBtnCheck.isVisible === false))
            scopeObj.view.flxEnterValue.skin = "sknFlxBgFFFFFFBr1293cc1pxRound3px";
        };
        this.view.tbxEnterValue.onEndEditing = function(){
          if(scopeObj.view.flxEnterValue.skin !== "sknflxEnterValueNormal")
            scopeObj.view.flxEnterValue.skin = "sknflxEnterValueNormal";
        };
      }
	};
});
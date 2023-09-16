define(function() {

	return {
      
      setPreShow : function(){
        var scopeObj=this;
        this.view.txtfldName.onKeyUp= function(){
            scopeObj.view.lblNoNameError.skin = "sknErrorTransparent";
            scopeObj.view.txtfldName.skin="skntxtbxDetails0bbf1235271384a";
            if(scopeObj.view.txtfldName.text.trim().length===0)
            {
              scopeObj.view.lblNameSize.setVisibility(false);
            }
            else
            {
              scopeObj.view.lblNameSize.setVisibility(true);
              scopeObj.view.lblNameSize.text=scopeObj.view.txtfldName.text.trim().length+"/60";
            }
          scopeObj.view.forceLayout();
           };
        this.view.txtareaDescription.onKeyUp= function(){
           if(scopeObj.view.txtareaDescription.text.trim().length===0)
            {
              scopeObj.view.lbldescriptionSize.setVisibility(false);
            }
            else
            {
              scopeObj.view.lbldescriptionSize.setVisibility(true);
              scopeObj.view.lbldescriptionSize.text=scopeObj.view.txtareaDescription.text.trim().length+"/70";
            }
          scopeObj.view.forceLayout();
        };
      },
	};
});
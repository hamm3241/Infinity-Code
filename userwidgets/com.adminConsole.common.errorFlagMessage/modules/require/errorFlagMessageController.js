define(function() {

	return {
      /*
      * set error message skin
      */
      setErrorSkin : function(){
        this.view.flxErrorContainer.skin = "sknFlxBorder1pxe61919";
        this.view.flxErrorIconContainer.skin = "sknFlxBge61919";
        this.view.lblAccountErrorIcon.text = "";
        
      },
      /*
      * set info message skin
      */
      setInfoSkin : function(){
        this.view.flxErrorContainer.skin = "sknFlxBor4A77A0Rd2px";
        this.view.flxErrorIconContainer.skin = "sknFlxBg4A77A0";
        this.view.lblAccountErrorIcon.text = "\ue94d";
      }
	};
});
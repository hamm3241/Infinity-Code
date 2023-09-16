define(function() {

	return {
      setFlowActions : function(){
        var scopeObj=this;
        this.view.btnChangeDefaultRole.onClick = function(){
          scopeObj.toggleEditRoles(true);
        };
        this.view.backToRolesList.btnBack.onClick = function(){
          scopeObj.toggleEditRoles(false);
        };
      },
      toggleEditRoles :  function(flag){
        this.view.flxRolesHeader.setVisibility(!flag);
        this.view.flxRolesEdit.setVisibility(!flag);
        this.view.flxRoleUndoHeader.setVisibility(flag);
        this.view.flxCommonButtons.setVisibility(!flag);
        this.view.flxCommonButtonsRolesSave.setVisibility(flag);
        if(flag===true)
          this.view.flxRolesSegment.height="320dp";
        else
          this.view.flxRolesSegment.height="280dp";
        // set/reset radio
        var data = this.view.segAssociatedRoles.data;
        for(var row=0;row<data.length;row++){
          data[row].flxRoleRadio.isVisible=flag;
          if(data[row].flxDefaultRoleButton.isVisible===true){
            data[row].flxDefaultRoleButton.isVisible=true;
            data[row].imgRoleRadio.src = "radio_selected.png";
          }
          else{
            data[row].flxDefaultRoleButton.isVisible=false;
            data[row].imgRoleRadio.src = "radio_notselected.png";
          }
        }
        this.view.segAssociatedRoles.setData(data);
        this.view.flxAssociatedRoles.bottom="0px";
        this.view.forceLayout();
      },

	};
});
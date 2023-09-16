define(function() {

  return {
    /*
    * to select/unselect a channel
    * @param: channel selected/unselected
    */
    onChannelSelected : function(selectedChannel){
      var width = 0;
      //change to selected
      if(selectedChannel.flxChannel.skin === "sknFlxbgFFFFFFbdrD7D9E0rd4px"){
        selectedChannel.flxChannel.skin = "sknFlxBgF2F9FFBr006CCARd4px";
        selectedChannel.lblChannelName.skin = "sknLbl0069CDLatoSemiBold12px";
        selectedChannel.lblChannelName.left = "0dp";
        selectedChannel.flxChannelImg.isVisible = true;
        width = selectedChannel.flxChannel.frame.width + 10;
        selectedChannel.flxChannel.width = width + "dp";
        selectedChannel.width = (width + 15) +"dp";
      }else{ // change to unselected
        selectedChannel.flxChannel.skin = "sknFlxbgFFFFFFbdrD7D9E0rd4px";
        selectedChannel.lblChannelName.skin = "sknLbl485C75LatoRegular12Px";
        selectedChannel.lblChannelName.left = "15dp";
        selectedChannel.flxChannelImg.isVisible = false;
        width = selectedChannel.flxChannel.frame.width - 10;
        selectedChannel.flxChannel.width = width + "dp";
        selectedChannel.width = (width + 15) +"dp";
      }
      this.view.forceLayout();

    },
  };
});
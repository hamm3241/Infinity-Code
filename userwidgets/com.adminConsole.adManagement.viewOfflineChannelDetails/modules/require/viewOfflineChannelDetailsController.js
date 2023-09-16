define(function() {

  return {

    showOrHideContent: function(parentObject) {
      let isHide = parentObject.lblChannelArrow.text === "\ue915";
      parentObject.lblChannelArrow.text = isHide ? "\ue922" : "\ue915";
      parentObject.flxContent.isVisible = !isHide;
      parentObject.forceLayout();
    }

  };
});
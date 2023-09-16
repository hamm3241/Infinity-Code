define(function() {

	return {
      dropdownPreshow: function(){
        var self=this;
        this.view.flxSelectedText.onClick = function(){
          self.showHideCustomersDropdown();
        };
      },
      showHideCustomersDropdown: function(){
        this.view.flxSegmentList.setVisibility(!this.view.flxSegmentList.isVisible);
        this.view.lblIconDropdown.text=this.view.flxSegmentList.isVisible?"":"";
        this.view.forceLayout();
      }
	};
});
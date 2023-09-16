define(function() {

  return {
    showSchedulerDetails : function(){
      var ScopeObj = this;
      var index = kony.application.getCurrentForm().SelectScheduler.segMasterList.selectedIndex;
      var rowIndex = index[1];
      var data = kony.application.getCurrentForm().SelectScheduler.segMasterList.data;
      if(data[rowIndex].imgCheckbox.src === "radio_notselected.png")
        {
          kony.application.getCurrentForm().SelectScheduler.flxNoDetails.setVisibility(true);
     	  kony.application.getCurrentForm().SelectScheduler.flxDetails.setVisibility(false);
        }
      else
        {
          kony.application.getCurrentForm().SelectScheduler.flxNoDetails.setVisibility(false);
     	  kony.application.getCurrentForm().SelectScheduler.flxDetails.setVisibility(true);
        }
    }
  };
});
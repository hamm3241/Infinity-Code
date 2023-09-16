define(function() {

  return {
    toggleContextualMenu : function(){
      // alert("infunction");
      var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndex;
      var sectionIndex = index[0];
      var rowIndex = index[1];
      kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndices = [[0, [rowIndex]]];
      var mainSegmentRowIndex;
      kony.store.setItem(mainSegmentRowIndex, rowIndex); 
      var templateHeight;
      var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
      if(data[0].template === "flxOutage")
        templateHeight = 65;
      else
        templateHeight = 50;
      var height = 45+((rowIndex+1)*templateHeight);
      //this.updateContextualMenu();
      if (data[rowIndex].lblServiceStatus.text === "Active") {
        kony.application.getCurrentForm().flxSelectOptions.flxDeactivate.lblOption2.text = "Deactivate";
       // kony.application.getCurrentForm().flxSelectOptions.flxDeactivate.imgOption2.src = "deactive_2x.png";
        kony.application.getCurrentForm().flxSelectOptions.flxDeactivate.lblIconOption1.text = kony.i18n.getLocalizedString("i18n.frmFAQ.fonticonDeactive");
       
        if(data[0].template === "flxOutage"){
          kony.application.getCurrentForm().flxSelectOptions.flxDelete.setVisibility(false);
        }
      } else {
        kony.application.getCurrentForm().flxSelectOptions.flxDeactivate.lblOption2.text = "Activate";
        kony.application.getCurrentForm().flxSelectOptions.flxDeactivate.lblIconOption1.text = kony.i18n.getLocalizedString("i18n.frmFAQ.fonticonActiveSearch");
        if(data[0].template === "flxOutage"){
          kony.application.getCurrentForm().flxSelectOptions.flxDelete.setVisibility(true);
        }
      }
      kony.application.getCurrentForm().flxSelectOptions.top = height+"px";
      if (kony.application.getCurrentForm().flxSelectOptions.isVisible === false) {
        kony.application.getCurrentForm().flxSelectOptions.setVisibility(true);
      }
      else{
        kony.application.getCurrentForm().flxSelectOptions.setVisibility(false);
        kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndices = null;
        kony.application.getCurrentForm().view.forceLayout();
      }
      kony.print("toggleVisibility TableView called");
    }



  };
});
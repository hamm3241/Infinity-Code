define(function() {

  return {
    toggleContextualMenu : function(){
      // alert("infunction");
       kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
      kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkbox.png"
      var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndex;
      var sectionIndex = index[0];
      var rowIndex = index[1];
      var row_index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndex[1];
      var Row_data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data[row_index];
      if(kony.application.getCurrentForm().flxSelectOptions.isVisible === false) {
      //  kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndices = [[0, [rowIndex]]];
        Row_data.flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
      } else {
        //kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndices = null;
        Row_data.flxOptions.skin = "slFbox";
      }
      kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(Row_data, row_index);
      var mainSegmentRowIndex;
      kony.store.setItem(mainSegmentRowIndex, rowIndex); 
      var templateHeight;
      var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
      if(data[0].template === "flxOutage")
        templateHeight = 80;
       else if(data[0].template === "flxServicesAndFaq")
          templateHeight = 65;
      else
        templateHeight = 50;
      var height;
      
       if(data[0].template === "flxServicesAndFaq")
         if(data.length === rowIndex+1){
          var menu_height =  kony.application.getCurrentForm().flxSelectOptions.height;
          height = (80+((rowIndex)*templateHeight))-105;
         }
      	 else{
           height = 80+((rowIndex+1)*templateHeight);          
         }
      else
       height = 45+((rowIndex+1)*templateHeight);
      //this.updateContextualMenu();
      if (data[rowIndex].lblServiceStatus.text === "Active") {
        kony.application.getCurrentForm().lblOption2.text = "Deactivate";
        kony.application.getCurrentForm().fonticonDeactive.text = "";
        if(data[0].template === "flxOutage"){
          kony.application.getCurrentForm().flxDelete.setVisibility(true);
        }
      } else {
        kony.application.getCurrentForm().lblOption2.text = "Activate";
        kony.application.getCurrentForm().fonticonDeactive.text = "";
        if(data[0].template === "flxOutage"){
          kony.application.getCurrentForm().flxDelete.setVisibility(false);
        }
      }
      kony.application.getCurrentForm().flxSelectOptions.top = (this.ScreenY-148)+"px";
      if (kony.application.getCurrentForm().flxSelectOptions.isVisible === false) {

        kony.application.getCurrentForm().flxSelectOptions.setVisibility(true);
        kony.application.getCurrentForm().flxSelectOptions.setFocus(true);
        kony.application.getCurrentForm().forceLayout();
        this.fixContextualMenu(this.ScreenY-148);
      }
      else{
        kony.application.getCurrentForm().flxSelectOptions.setVisibility(false);
         
      }
      kony.print("toggleVisibility TableView called");
    },
    fixContextualMenu:function(heightVal){
      if((( kony.application.getCurrentForm().flxSelectOptions.frame.height+heightVal)>(kony.application.getCurrentForm().tableView.segServicesAndFaq.frame.height+50))&& kony.application.getCurrentForm().flxSelectOptions.frame.height<kony.application.getCurrentForm().tableView.segServicesAndFaq.frame.height){
        kony.application.getCurrentForm().flxSelectOptions.top=((heightVal- kony.application.getCurrentForm().flxSelectOptions.frame.height)-40)+"px";
        kony.application.getCurrentForm().flxUpArrowImage.setVisibility(false);
        kony.application.getCurrentForm().flxDownArrowImage.setVisibility(true);
      }
      else{
        kony.application.getCurrentForm().flxSelectOptions.top=(heightVal-22)+"px";
        kony.application.getCurrentForm().flxSelectOptions.right = "25px";
        kony.application.getCurrentForm().flxUpArrowImage.setVisibility(true);
        kony.application.getCurrentForm().flxDownArrowImage.setVisibility(false);
      }
      this.view.forceLayout();
    },
    fixScreenY:function(screenY){
      this.ScreenY=screenY;
    }
  };
});
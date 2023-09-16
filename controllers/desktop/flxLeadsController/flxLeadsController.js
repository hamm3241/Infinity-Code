define({
  toggleCheckbox :  function(){
    var ScopeObj = this;
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndex;
    var rowIndex = index[1];
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    if(data[rowIndex].imgCheckBox.src === "checkbox.png")
    {
      if(data[rowIndex].lblServiceStatus.text === "Active")
        ScopeObj.showDeactivateAndDelete();
      else
        ScopeObj.showActivateAndDelete(); 
      data[rowIndex].imgCheckBox.src ="checkboxselected.png";
    }

    else{
      data[rowIndex].imgCheckBox.src ="checkbox.png";   
      kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
    }
    kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(data[rowIndex], rowIndex);
  },
  toggleCheckbox2 : function(){
    var ScopeObj = this;
    var length = 0;
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndices;
    if(index !== null){
    	 length = index[0][1].length;
    	var rowIndex = index[0][1];
    }
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    if(length === 1)
    { 
      if(data[rowIndex].lblServiceStatus.text === "Active")
        ScopeObj.showDeactivateAndDelete();
      else
        ScopeObj.showActivateAndDelete(); 
      data[rowIndex].imgCheckBox.src ="checkboxselected.png";
    }
    else if (length > 1){
      var active = false;
      var inactive = false;
      for(var i=0;i<length;i++){
        if(data[rowIndex[i]].lblServiceStatus.text === "Active")
          active = true;
        else
          inactive = true;
      }
      if(active && inactive)
      	ScopeObj.showAllOptions();
      else if(active)
        ScopeObj.showDeactivateAndDelete();
      else if(inactive)
        ScopeObj.showActivateAndDelete();
      if(data.length === length){
        kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkboxselected.png";
      }else{
        kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkbox.png";
      }  
    }
    else
      {
       kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
      kony.application.getCurrentForm().tableView.imgHeaderCheckBox.src = "checkbox.png";
      }
    //For pagination
      if(kony.application.getCurrentForm().flxSelectOptionsHeader.isVisible){
        kony.application.getCurrentForm().search.flxMenu.setVisibility(false);
      }
      },
  showAllOptions : function(){
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "107px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(true);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showDeactivateAndDelete : function()
  {
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "71px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(false);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showActivateAndDelete : function()
  {
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "71px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(false);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showSelectedRow : function(){
    kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndices = null;
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndex;
    var rowIndex = index[1];
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    for(var i=0;i<data.length;i++)
    {
      if(i===rowIndex)
      {
        kony.print("index:" + index);
        data[i].fonticonArrow.text = "\ue915";//down-arrow
        data[i].fonticonArrow.skin = "sknfontIconDescDownArrow12px";
        data[i].template = "flxServicesAndFaqSelected";
        kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(data[i],i);
        if(data[i].imgCheckBox.src == "checkboxselected.png") {
        	kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndices=[[0,[i]]];
        }
      }
      else
      {
        if(data[i].template === "flxServicesAndFaqSelected" ){
        data[i].fonticonArrow.text = "\ue922";//right-arrow
        data[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
        data[i].template = "flxServicesAndFaq";
        kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(data[i],i);
        }
      }
    }
  }
});

define({ 

 //Type your controller code here 
  toggleCheckboxSelected :  function(){
    var scopeObj = this;
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndex;
    var rowIndex = index[1];
    var selInd = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndices;
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
  
    if(data[rowIndex].imgCheckBox.src === "checkbox.png")
    {
      if(data[rowIndex].lblServiceStatus.text === "Active")
        scopeObj.showDeactivateAndDeleteSelected();
      else
        scopeObj.showActivateAndDeleteSelected(); 
      data[rowIndex].imgCheckBox.src ="checkboxselected.png";
    }

    else{
      data[rowIndex].imgCheckBox.src ="checkbox.png";   
      kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
    }
    if(selInd){
      if(selInd[0][1].length === 0)
        kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
      else
        kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    }else{
      kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(false);
    }
    //for pagination
    if(kony.application.getCurrentForm().flxSelectOptionsHeader.isVisible){
        kony.application.getCurrentForm().search.flxMenu.setVisibility(false);
    }
},
  showDeactivateAndDeleteSelected : function()
  {
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "71px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(false);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showActivateAndDeleteSelected : function()
  {
    kony.application.getCurrentForm().flxSelectOptionsHeader.width = "71px";
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxActiveOption.setVisibility(true);
    kony.application.getCurrentForm().flxSelectOptionsHeader.flxDeactivateOption.setVisibility(false);
    kony.application.getCurrentForm().flxSepartor2.setVisibility(false);
    kony.application.getCurrentForm().flxSelectOptionsHeader.setVisibility(true);
    kony.application.getCurrentForm().forceLayout();
  },
  showSelectedRow : function(){
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedRowIndex[1];
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    kony.application.getCurrentForm().flxSelectOptions.setVisibility(false);
    for(var i=0;i<data.length;i++) {
      if(i === index &&  data[i].template === "flxServicesAndFaqSelected") {
        data[i].fonticonArrow.text = "\ue922";
        data[i].fonticonArrow.skin = "sknfontIconDescRightArrow14px";
        data[i].template = "flxServicesAndFaq";
        kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(data[i], i);
      }
    }
  }


 });

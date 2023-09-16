define({ 

 //Type your controller code here 
  toggleCheckboxSelected :  function(){
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndex;
    var rowIndex = index[1];
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    if(data[rowIndex].imgCheckBox.src === "checkbox.png")
      data[rowIndex].imgCheckBox.src ="checkboxselected.png";
    else
      data[rowIndex].imgCheckBox.src ="checkbox.png"; 
    kony.application.getCurrentForm().tableView.segServicesAndFaq.setDataAt(data[rowIndex], rowIndex);
  },
  
  showSelectedRow : function(){
    var index = kony.application.getCurrentForm().tableView.segServicesAndFaq.selectedIndex;
    var rowIndex = index[1];
    var data = kony.application.getCurrentForm().tableView.segServicesAndFaq.data;
    kony.print("index:" + index);
    data[rowIndex].ImgArrow = "img_desc_arrow.png";
	data[rowIndex].template = "flxServicesAndFaq";
    kony.application.getCurrentForm().tableView.segServicesAndFaq.setData(data);
      
  }


 });
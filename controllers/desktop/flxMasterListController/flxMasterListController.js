define({ 

 //Type your controller code here 
  toggleCheckbox : function(){
    var ScopeObj = this;
    var index = kony.application.getCurrentForm().SelectScheduler.segMasterList.selectedIndex;
    var rowIndex = index[1];
    var data = kony.application.getCurrentForm().SelectScheduler.segMasterList.data;
    for(var i=0; i<data.length; i++){
      data[i].imgCheckbox.src ="radio_notselected.png";
    }
    data[rowIndex].imgCheckbox.src = "radioselected_2x.png";
    kony.application.getCurrentForm().SelectScheduler.flxNoDetails.setVisibility(false);
    kony.application.getCurrentForm().SelectScheduler.flxDetails.setVisibility(true);
    
    kony.application.getCurrentForm().SelectScheduler.segMasterList.setData(data);
  }

 });
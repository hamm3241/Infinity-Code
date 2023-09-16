define({ 

  //Type your controller code here

  showApplyOnHover : function(rowIndex){
    this.executeOnParent("showApplyButtonOnHoveredResult",rowIndex);
  },

  showLoanApplications : function(){
    this.executeOnParent("createLoanOnClickOfApply");
  }

});
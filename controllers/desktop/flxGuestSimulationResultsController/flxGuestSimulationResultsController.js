define({ 

  showApplyOnHover : function(rowIndex){
      this.executeOnParent("showApplyButtonOnHoveredResult",rowIndex);
  },
  
  showLoanApplications : function(){
    this.executeOnParent("createLoanOnClickOfApply");
  }
  
});
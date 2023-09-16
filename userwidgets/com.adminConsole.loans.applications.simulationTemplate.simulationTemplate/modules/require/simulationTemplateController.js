define(function() {

	return {
      simulationTemplatePreShow :function(){
         var scopObj=this;
        scopObj.setFlowActions();
        scopObj.view.lblCreditScoreError.setVisibility(false);
        scopObj.view.lblEmploymentStatusError.setVisibility(false);
        scopObj.view.lblSimulationResults.setVisibility(false);       
        scopObj.view.segSimulationResults.setVisibility(false);
        scopObj.view.lblSimulateToGetRes.setVisibility(true);
      },
      
      setFlowActions :function(){
        var scopObj=this;
        scopObj.view.sliderSimulate.onSlide = function(eventobject){
          var amount = parseInt(scopObj.view.sliderSimulate.selectedValue);
          amount = amount.toLocaleString();
          scopObj.view.txtLoanAmount.text=amount;
        };
       scopObj.view.txtLoanAmount.onEndEditing = function(eventobject){
         var amount = scopObj.view.txtLoanAmount.text.replace(",","");
         scopObj.view.sliderSimulate.selectedValue = parseInt(amount);
       };
      },
      
      showApplyButtonOnHoveredResult : function(rowIndex){
        var custType = kony.store.getItem("CustomerType_id");
        if(custType !== null){
          var selectedIndex=rowIndex;
          var selectedData = this.view.segSimulationResults.data;
          for(var i = 0;i<selectedData.length;i++){
            if(selectedIndex == i){
              selectedData[i].flxRecommendedLoans = {"skin":"sknflxffffffBorder3ebaed7Radius4px"};
              selectedData[i].lblApply = {"text":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"isVisible":true};
            }else{
              selectedData[i].flxRecommendedLoans = {"skin":"sknflxffffffBorderd6dbe7Radius4px"};
              selectedData[i].lblApply = {"text":kony.i18n.getLocalizedString("i18n.frmLoansDashboard.ApplyStaticMessage"),"isVisible":false};
            }
          }
          this.view.segSimulationResults.setData(selectedData);
          this.view.forceLayout();
        }
  	 }
	};
});
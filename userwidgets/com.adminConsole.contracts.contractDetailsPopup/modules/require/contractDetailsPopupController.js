define(['AdminConsoleCommonUtilities'],function(commonUtils) {

	return {
      /*
      * set the customer related data for popup
      * @param: details - {"id": "",name":"",industry":"","email":"",phone":"",address": ""}
      */
      setDataForPopup : function(details){
        this.view.detailsRow1.lblData1.text = details.name;
        this.view.detailsRow1.lblData2.text = details.id;
        this.view.detailsRow1.lblData3.text = commonUtils.AdminConsoleCommonUtils.getParamValueOrNA(details.industry);
        this.view.detailsRow2.lblData1.text = commonUtils.AdminConsoleCommonUtils.getParamValueOrNA(details.email);
        this.view.detailsRow2.lblData2.text = commonUtils.AdminConsoleCommonUtils.getParamValueOrNA(details.phone);
        this.view.detailsRow3.lblData1.text = details.address;
        this.view.detailsRow2.flxColumn3.setVisibility(false);
        this.view.detailsRow3.flxColumn2.setVisibility(false);
        this.view.detailsRow3.flxColumn3.setVisibility(false);
        this.view.forceLayout();
      },
      /*
      * show/hide the back option in the popup
      * @param: option -(true/false)
      */
      showBackButton : function(option){
        if(option === true){
          this.view.flxBackOption.setVisibility(true);
          this.view.flxDetailsContainer.top = "80dp";
          this.view.flxContractDetailsPopupContainer.height = "370dp";
        }else{
          this.view.flxBackOption.setVisibility(false);
          this.view.flxDetailsContainer.top = "50dp";
          this.view.flxContractDetailsPopupContainer.height = "330dp";
        }
      },
	};
});
define(function() {

	return {
        viewConfigureCSRPreshow: function(){
           this.setFlowActions();
         },
         setFlowActions : function(){
           var scopeObj = this;
           this.view.segViewConfigureCSR.onRowClick = function(){
             scopeObj.toggleDescription();
           };
         },
         toggleDescription : function(){
           var self = this;
           var index = self.view.segViewConfigureCSR.selectedRowIndex;
           var rowItem = self.view.segViewConfigureCSR.selectedRowItems;
           var segData = self.view.segViewConfigureCSR.data;
           var rowData = rowItem[0];
           //for remaining rows
           for(var i=0;i<segData.length;i++){
             if(i !== index[1] && segData[i].flxViewConfigureDesc.isVisible){
               segData[i].flxViewConfigureDesc ={"isVisible" : false};
               segData[i].lblIconArrow = {"skin":"sknfontIconDescRightArrow14px",
                                          "text":"\ue922"};  //right-arrow
               self.view.segViewConfigureCSR.setDataAt(segData[i],i);
               break;
             }
           }
           //for selected row
           if(rowData.flxViewConfigureDesc.isVisible){
             rowData.flxViewConfigureDesc ={"isVisible" : false};
             rowData.lblIconArrow = {"skin":"sknfontIconDescRightArrow14px",
                                     "text":"\ue922"};  //right-arrow
           }else{
             rowData.flxViewConfigureDesc ={"isVisible" : true};
             rowData.lblIconArrow = {"skin":"sknfontIconDescDownArrow12px",
                                     "text":"\ue915"}; //down-arrow
           }
           self.view.segViewConfigureCSR.setDataAt(rowData,index[1]);
           self.view.forceLayout();
         }
	};
});
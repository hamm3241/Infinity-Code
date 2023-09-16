define({

	deleteRowPreshow : function(){
     
      this.setFlowActions();
      //this.setSegData();
    },
//   setSegData : function(){
//     var self = this;

//     this.view.segFeeRange.widgetDataMap = dataMap;
//     this.view.segFeeRange.setData(data);
//     this.view.forceLayout();
// },
//    addFeeRange : function(){
//         flag=true;
//         var self=this;
//         var data = this.view.segFeeRange.data;
//         var toAdd=   {   
//                     "flxMinAmount" : {"skin":"skntxtbxNormald7d9e0"},
//                     "flxMaxAmount" : {"skin":"skntxtbxNormald7d9e0"},
//                     "flxFee" : {"skin":"skntxtbxNormald7d9e0"},
//                     "txtbxAmount":{"placeholder":"0.00"},
//                     "txtbxMaxAmount":{"placeholder":"0.00"},
//                     "txtbxFee":{"placeholder":"0.00"},
//           			"flxDelete":{
//                      "isVisible":true,
//                      "onClick": function(){self.deleteRow();}
//                      },
//           			"lblSeparator3" : ".",
//           			"lblSeparator2" : ".",
//           			"lblSeparator1" : ".",
//           			"flx1" : {"skin" : "sknflxNoneditable"},
//           			"flxMax1" : {"skin" : "sknflxNoneditable"},
//           			"flxFee1" : {"skin" : "sknflxNoneditable"},
//           			"lblDollar" : "$",
//           			"lblDollar1" : "$",
//           			"lblDollar2" : "$",
//                     "imgDelete":{"src":"delete_2x.png","isVisible":true},
//                     "template":"flxFeeRange"
//                    };
//         data.push(toAdd);
//         this.view.segFeeRange.setData(data);
//          if(data.length >1){
//        data[0].imgDelete.isVisible = true;
//         }
//         this.view.forceLayout();
//     },

  setFlowActions : function(){
    var scopeObj=this;
//     this.view.btnAdd.onClick=function(){
//        scopeObj.addFeeRange();
//     };
  },
//    deleteRow :function(){
//     var data =this.view.segFeeRange.data;
//     var Index = this.view.segFeeRange.selectedIndex;
//     var rowIndex = Index[1];
//     this.view.segFeeRange.removeAt(rowIndex);
//      if(data.length===1){
//     data[0].imgDelete.isVisible = false;
//      }
     
       
//   },
});
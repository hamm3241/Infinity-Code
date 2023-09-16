define({
    flag:null,
	LimitPreshow : function(){
     
      this.setFlowActions();
    },
  
   addLimits : function(){
     var v1 = this.view.flxLimit1.isVisible;
     var v2 = this.view.flxLimit2.isVisible;    
  	var v3 = this.view.flxLimit3.isVisible;
   if(v1){
     if(v2){
       this.view.flxLimit3.setVisibility(true);
       this.view.btnAdd.skin = "sknlbld7d8e0Latod7d9db12pxBlockedButton";
     }
     else
       this.view.flxLimit2.setVisibility(true);
     
   }
     else
       this.view.flxLimit1.setVisibility(true);
    },		
  deleteRow : function(){
    var visibility1 = this.view.flxLimit1.isVisible;
    var visibility2 = this.view.flxLimit2.isVisible;
    var visibility3 = this.view.flxLimit3.isVisible;
    //if()
  },
  setMasterData : function(lbx1,lbx2,selLbx){
    
    if(selLbx.selectedKey !== "ko"){
      if(lbx1.selectedKey === "ko"){
        if(lbx2.selectedKey === "ko"){
          var m1 = lbx1.masterData;
          var m2 = lbx2.masterData;
          var Key = selLbx.selectedKey;
          var toDelete1,toDelete2;
          for(var i=0;i<3; i++){
            if(masterData1[i][0] === Key){
              toDelete1 = i;
            }
          }
          masterData1.splice(toDelete1,1);
      masterData2.splice(toDelete2,1);
      lbx1.masterData = masterData1;
      lbx1.masterData = masterData2;
        }
      }
      else{
        //lbx1.selectedKey 
      }
    }
 },
  setFlowActions : function(){
    var scopeObj=this;
    this.view.btnAdd.onClick=function(){
       scopeObj.addLimits();
    };
    this.view.lstboxPeriod1.onSelection = function(){
      scopeObj.setMasterData(scopeObj.view.lstboxPeriod2,scopeObj.view.lstboxPeriod3,scopeObj.view.lstboxPeriod1);
    };
     this.view.lstboxPeriod2.onSelection = function(){
      scopeObj.setMasterData(scopeObj.view.lstboxPeriod1,scopeObj.view.lstboxPeriod3,scopeObj.view.lstboxPeriod2);
    };
     this.view.lstboxPeriod3.onSelection = function(){
      scopeObj.setMasterData(scopeObj.view.lstboxPeriod2,scopeObj.view.lstboxPeriod1,scopeObj.view.lstboxPeriod3);
    };
    this.view.flxDelete1.onClick=function(){
      if(scopeObj.view.flxLimit2.isVisible === true && scopeObj.view.flxLimit3.isVisible === true){
         scopeObj.view.flxLimit1.setVisibility(false);
      }
     
    };
    this.view.flxDelete2.onClick=function(){
      if(scopeObj.view.flxLimit3.isVisible === true || scopeObj.view.flxLimit1.isVisible === true ){
         scopeObj.view.flxLimit2.setVisibility(false);
      }
     
    };
    this.view.flxDelete3.onClick=function(){
      scopeObj.view.flxLimit3.setVisibility(false);
    };
    
    this.view.txtbxMaxLimit1.onBeginEditing=function(){
      scopeObj.view.flxHint1.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxMaxLimit1.onEndEditing=function(){
      scopeObj.view.flxHint1.setVisibility(false);
    };
   
    this.view.txtbxMaxLimit2.onBeginEditing=function(){
      scopeObj.view.flxHint2.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxMaxLimit2.onEndEditing=function(){
      scopeObj.view.flxHint2.setVisibility(false);
    };
    this.view.txtbxMaxLimit3.onBeginEditing=function(){
      scopeObj.view.flxHint3.setVisibility(true);
      scopeObj.view.forceLayout();
    };
    this.view.txtbxMaxLimit3.onEndEditing=function(){
      scopeObj.view.flxHint3.setVisibility(false);
    };
  },
  
});
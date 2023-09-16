define(function() {

	return {
      selectedValue: null,
      callPreshow : function(){
        this.setActions();
        this.selectedValue = null;
      },
      setActions: function(){
        var scopeObj = this;
        this.view.flxValueBox1.onClick = function(){
          var val = scopeObj.view.lblValue1.info.value;
          scopeObj.setSkinForSelected(val);
        };
        this.view.flxValueBox2.onClick = function(){
          var val = scopeObj.view.lblValue2.info.value;
          scopeObj.setSkinForSelected(val);
        };
        this.view.flxValueBox3.onClick = function(){
          var val = scopeObj.view.lblValue3.info.value;
          scopeObj.setSkinForSelected(val);
        };
        this.view.flxValueBox4.onClick = function(){
          var val = scopeObj.view.lblValue4.info.value;
          scopeObj.setSkinForSelected(val);
        };
        this.view.flxValueBox5.onClick = function(){
          var val = scopeObj.view.lblValue5.info.value;
          scopeObj.setSkinForSelected(val);
        };
        this.view.flxValueBox6.onClick = function(){
          var val = scopeObj.view.lblValue6.info.value;
          scopeObj.setSkinForSelected(val);
        };
        this.view.flxValueBox7.onClick = function(){
          var val = scopeObj.view.lblValue7.info.value;
          scopeObj.setSkinForSelected(val);
        };
      },
      setValues : function(start,end){
        var self = this;
        var val = start;
        var totalLength = end-start;
        //reset visibility of all
        for(var j=2; j<=7; j++){
          var flexBox = "flxValueBox"+j;
          this.view[flexBox].setVisibility(false);
        }
        //set values to each box
        for(var i=1; i<=totalLength+1; i++){
          var labelName = "lblValue"+i;
          var flexName = "flxValueBox"+i;
          this.view[flexName].setVisibility(true);
          this.view[labelName].text = val;
          this.view[labelName].info = {"value":val};
          val = val+1;  
        }
        var flexWidth = (totalLength+1)*37;
        this.view.flxOuterContainerBox.width = flexWidth+"dp";
        this.view.forceLayout();
      }, 
      
      /* set skin for currently selected box*/
      setSkinForSelected : function(selValue){
        var lblValue = "";
        for(var i=1; i<=7; i++){
          this.view["flxValueSelectedBox"+i].skin = "slFbox";
          this.view["lblValue"+i].skin = "sknLbl485C75LatoRegular13Px";
          if(this.view["flxValueBox"+i].isVisible === true){
            lblValue = this.view["lblValue"+i].info.value;
          }
          if((lblValue !== "") && (lblValue === selValue)){
            this.view["flxValueSelectedBox"+i].skin = "sknFlxBg003E75Op100Rad3PX";
            this.view["lblValue"+i].skin = "sknLblffffff13px";
            this.selectedValue = selValue;
          }
        }
        this.view.forceLayout();
      }
	};
});
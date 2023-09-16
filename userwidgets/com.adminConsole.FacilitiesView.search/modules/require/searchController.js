define(function() {

    return {
        setCompFlowActions : function(){
          var scopeObj=this;
         
         this.view.fonticonClose.isVisible=false;
          
      this.view.tbxSearchBox.onTouchStart = function(){
        //scopeObj.view.flxSearchContainer.skin = "sknFontIconSearchCross16px";
        scopeObj.view.flxSearchContainer.skin = "slFbox0ebc847fa67a243Search";
      };

          this.view.tbxSearchBox.onKeyDown = function(){
         scopeObj.showCancel();
        };
          
//          this.view.flxSearchCancel.onClick = function(){
//           scopeObj.resetTextBox();
//         };
          
        },
      showCancel: function(){
         this.view.fonticonClose.isVisible=true;
         this.view.forceLayout();
        },
       resetTextBox: function(){
          this.view.tbxSearchBox.text="";
          this.view.fonticonClose.isVisible=false;
          this.view.forceLayout();
        }
      
    };
});
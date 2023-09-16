  define(function() {

    return {
      setCompFlowActions : function(){
        var scopeObj=this;
        this.preshow();

        this.view.flxDropDown01.onClick=function(){
          scopeObj.showHideSearchOption01();
        };

        this.view.flxDropDown11.onClick=function(){
          scopeObj.showHideSearchOption11();
        };
        this.view.flxDropDown03.onClick=function(){
          scopeObj.showHideSearchOption03();
        };
        this.view.flxDropDown12.onClick=function(){
          scopeObj.showHideSearchOption12();
        };
        // this.view.AdvancedSearchDropDown01.sgmentData.onRowClick=function(){
        //   var selInd=scopeObj.view.AdvancedSearchDropDown01.sgmentData.selectedindices;
        //   var count=selInd[0][1].length;
        //   if (count===0) {
        //     scopeObj.view.lblSelectedRows.text="Select the Branches";
        //     scopeObj.view.lblSelectedRows.skin="sknlbl0h2ff0d6b13f947AD";
        //   }
        //   else if(count===1){
        //     scopeObj.view.lblSelectedRows.text = "" + scopeObj.view.AdvancedSearchDropDown01.sgmentData.data[selInd[0][1]].lblDescription;
        //     scopeObj.view.lblSelectedRows.skin="sknlbl0h2ff0d6b13f947AD";
        //   }
        //   else if(count>1){
        //     scopeObj.view.lblSelectedRows.text=""+count+" Branches selected";
        //     scopeObj.view.lblSelectedRows.skin="sknlbl0h2ff0d6b13f947AD";
        //   }
        //   scopeObj.view.forceLayout();
        // };

      },
      renderCalendarPostShow: function() {
              var contextForCal =[ {
                  "widget": this.view.flxColumn31,
                  "anchor": "right"
              },{
                  "widget": this.view.flxColumn32,
                  "anchor": "right"
              },{
                  "widget": this.view.flxColumn33,
                  "anchor": "right"
              }];
              this.view.calValidDate1.setContext(contextForCal[0]);
              this.view.calValidDate2.setContext(contextForCal[1]);
			  this.view.calValidDate3.setContext(contextForCal[2]);
              this.view.calValidDate4.setContext(contextForCal[2]);
          },
      showHideSearchOption01 : function(){
        if(this.view.flxDropDownDetail01.isVisible){
          this.view.flxDropDownDetail01.isVisible= false;
          this.view.fontIconSearchDown01.text="\ue920";  //dropdown down arrow
          
        }
        else{
          this.view.flxDropDownDetail01.isVisible = true;
          this.view.fontIconSearchDown01.text="\ue92a"; //dropdown up arrow
		  //Reset other drop down
          this.view.flxDropDownDetail11.isVisible= false;
		  this.view.fontIconSearchDown11.text="\ue920";
          this.view.flxDropDownDetail03.isVisible= false;
		  this.view.fontIconSearchDown03.text="\ue920";
		  this.view.flxDropDownDetail12.isVisible= false;
		  this.view.fontIconSearchDown12.text="\ue920";
        }
        this.view.forceLayout();
      },
      showHideSearchOption11 : function(){
        if(this.view.flxDropDownDetail11.isVisible){
          this.view.flxDropDownDetail11.isVisible= false;
          this.view.fontIconSearchDown11.text="\ue920";
        }
        else{
          this.view.flxDropDownDetail11.isVisible = true;
          this.view.fontIconSearchDown11.text="\ue92a";
         //Reset other drop down
		  this.view.flxDropDownDetail01.isVisible = false;
		  this.view.fontIconSearchDown01.text="\ue920";
          this.view.flxDropDownDetail03.isVisible= false;
		  this.view.fontIconSearchDown03.text="\ue920";
		  this.view.flxDropDownDetail12.isVisible= false;
		  this.view.fontIconSearchDown12.text="\ue920";
        }
      },
      showHideSearchOption03 : function(){
        if(this.view.flxDropDownDetail03.isVisible){
          this.view.flxDropDownDetail03.isVisible= false;
          this.view.fontIconSearchDown03.text="\ue920";
        }
        else{
          this.view.flxDropDownDetail03.isVisible = true;
          this.view.fontIconSearchDown03.text="\ue92a";
		  // Reset drop down
          this.view.flxDropDownDetail01.isVisible = false;
		  this.view.fontIconSearchDown01.text="\ue920";
          this.view.flxDropDownDetail11.isVisible= false;
		  this.view.fontIconSearchDown11.text="\ue920";
		  this.view.flxDropDownDetail12.isVisible= false;
		  this.view.fontIconSearchDown12.text="\ue920";
        }
        this.view.forceLayout();
      },
      showHideSearchOption12 : function(){
        if(this.view.flxDropDownDetail12.isVisible){
          this.view.flxDropDownDetail12.isVisible= false;
          this.view.fontIconSearchDown12.text="\ue920";
        }
        else{
          this.view.flxDropDownDetail12.isVisible = true;
          this.view.fontIconSearchDown12.text="\ue92a";
		  //Reset drop down
           this.view.flxDropDownDetail11.isVisible = false;
		   this.view.fontIconSearchDown11.text="\ue920";
          this.view.flxDropDownDetail03.isVisible= false;
		  this.view.fontIconSearchDown03.text="\ue920";
		  this.view.flxDropDownDetail01.isVisible= false;
		  this.view.fontIconSearchDown01.text="\ue920";
        }
        this.view.forceLayout();
      },
      preShow:function(){
        this.view.commonButtons.btnNext.text="RESET";
        this.view.commonButtons.btnSave.text="SEARCH";
      }
    };
  });
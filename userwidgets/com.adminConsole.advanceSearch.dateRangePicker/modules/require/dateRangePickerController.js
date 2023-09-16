define(function() {

	return {
		timer:false,
		setFlowActions : function(){
			var scopeObj=this;
			this.view.calFrom.onTouchStart=function(){
				if (scopeObj.timer===true) {
					kony.timer.cancel("calTimer");
					scopeObj.timer=false;
				}
				var height=scopeObj.view.flxRangePickerBody.frame.height;
				if(height===100){
					scopeObj.view.flxRangePickerBody.height=height+310+"px";
				}
				scopeObj.view.forceLayout();
				if (scopeObj.timer===false) {
					kony.timer.schedule("calTimer",scopeObj.calenderListener,1,true);
					scopeObj.timer=true;
				}
               scopeObj.view.lblInlineError.isVisible=false;
			};
			this.view.calTo.onTouchStart=function(){
				if (scopeObj.timer===true) {
					kony.timer.cancel("calTimer");
					scopeObj.timer=false;
				}
				var height=scopeObj.view.flxRangePickerBody.frame.height;
				if(height===100){
					scopeObj.view.flxRangePickerBody.height=height+310+"px";
				}
				scopeObj.view.forceLayout();
				if (scopeObj.timer===false) {
					kony.timer.schedule("calTimer",scopeObj.calenderListener,1,true);
					scopeObj.timer=true;
				}
              scopeObj.view.lblInlineError.isVisible=false;
			};
			this.view.calFrom.onSelection=function(){
				var height=scopeObj.view.flxRangePickerBody.frame.height;
				scopeObj.view.flxRangePickerBody.height=height-310+"px";
				scopeObj.view.forceLayout();
				if (scopeObj.timer===true) {
					kony.timer.cancel("calTimer");
					scopeObj.timer=false;
				}
               if(scopeObj.view.calTo.date!==null&&scopeObj.validateDates(scopeObj.view.calTo.date,scopeObj.view.calFrom.date)){
                scopeObj.view.lblInlineError.text="From date can not be greater than to date";
                scopeObj.view.lblInlineError.isVisible=true;
              }
              else
                scopeObj.view.lblInlineError.isVisible=false;
			};
			
			this.view.calTo.onSelection=function(){
				var height=scopeObj.view.flxRangePickerBody.frame.height;
				scopeObj.view.flxRangePickerBody.height=height-310+"px";
				scopeObj.view.forceLayout();
				if (scopeObj.timer===true) {
					kony.timer.cancel("calTimer");
					scopeObj.timer=false;
				}
              if(scopeObj.view.calFrom.date!==null&&scopeObj.validateDates(scopeObj.view.calTo.date,scopeObj.view.calFrom.date)){
                scopeObj.view.lblInlineError.text="To date can not be less than from date";
                scopeObj.view.lblInlineError.isVisible=true;
              }
              else
                scopeObj.view.lblInlineError.isVisible=false;
			};
		},
		renderCalendarPostShow:function(){
			var contextForCal = {
				"widget": this.view.flxInlineError,
				"anchor": "bottom"
			};
			this.view.calFrom.setContext(contextForCal);
			this.view.calTo.setContext(contextForCal);
		},
		calenderListener : function(){
			calNode=document.getElementsByClassName("-k-w-c-datepicker-holder-main");
			if(calNode.length===0){
				if (this.view.flxRangePickerBody.height!=="100px") {
					this.view.flxRangePickerBody.height="100px";
					this.view.forceLayout();
					kony.timer.cancel("calTimer");
				}
			}
		},
      	validateDates:function(endDate,startDate){
      		var regExp = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/;
              if(parseInt(endDate.replace(regExp, "$3$2$1")) >= parseInt(startDate.replace(regExp, "$3$2$1"))){
               	return false;
              }
          else
            return true;
      
    }
       
	};
});
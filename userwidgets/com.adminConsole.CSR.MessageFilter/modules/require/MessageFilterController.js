  define(function() {

    return {
       sectionIndex :0,
      	rowIndex :0,
      setCompFlowActions : function(){
		this.updateContextualMenu();
      },
        toggleContextualMenu : function(rowHeight){
            var index=this.view.segListing.selectedIndex;
            this.sectionIndex=index[0];
            this.rowIndex=index[1];
            //kony.store.setItem(mainSegmentSectionIndex, sectionIndex);
            //kony.store.setItem(mainSegmentRowIndex, rowIndex);
            var height=((this.rowIndex)*rowHeight)+50;
          	//var height=45+((rowIndex+1)*50);
            this.updateContextualMenu();
            this.view.flxContextualMenu.top=height+"px";
            if (this.view.flxContextualMenu.isVisible===false) {
                this.view.flxContextualMenu.setVisibility(true);
            }
            else{
                this.view.flxContextualMenu.setVisibility(false);
            }
            kony.print("called in form controller");
        },
        updateContextualMenu : function(){
            kony.print("updating contextual menu");
          
            kony.print("updating contextual menu");
          this.view.contextualMenu.lblHeader.isVisible=false;
          this.view.contextualMenu.btnLink1.isVisible=false;
          this.view.contextualMenu.btnLink2.isVisible=false;
          this.view.contextualMenu.flxOptionsSeperator.isVisible=false;
          this.view.contextualMenu.flxOption4.isVisible=false;
        
        }
    };
  });
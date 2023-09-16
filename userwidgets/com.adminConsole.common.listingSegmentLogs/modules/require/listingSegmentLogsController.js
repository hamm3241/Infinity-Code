define(function() {

    return {
      	sectionIndex :0,
      	rowIndex :0,
      
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
          if(kony.application.getCurrentForm() === "frmGroups")
            {
              this.view.contextualMenu.btnLink1.text = "Entitlements";
              this.view.contextualMenu.btnLink2.text = "Customers";
              var data = this.view.segListing.data;
              if (data[rowIndex].lblGroupStatus.text === "Active") {
          this.view.contextualMenu.lblOption4.text = "Deactivate";
          this.view.contextualMenu.imgOption4.src = "deactive_2x.png";
        } else {
          this.view.contextualMenu.lblOption4.text = "Activate";
          this.view.contextualMenu.imgOption4.src = "activate_select2.png";
        }
            }
        },
        deactivateQuestion : function(){
            var questionsData=this.view.segListing.selectedItems();
            questionsData.lblSecurityQuestionStatus={"text":"Inactive","skin":"sknlblLatocacacaBold12px"};
            this.view.segListing.setDataAt(questionsData,this.rowIndex);
        },
//       showContextualMenu : function(){
//         this.view.contextualMenu.btnLink1.text = "Entitlements";
//    	     this.view.contextualMenu.btnLink2.text = "Customers";
//         var index = this.view.segListing.selectedIndex;
//         var rowIndex = index[1];
//         var data = this.view.segListing.data;
//         var height = 45+((rowIndex+1)*50);
//         if (data[rowIndex].lblGroupStatus.text === "Active") {
//           this.view.contextualMenu.lblOption4.text = "Deactivate";
//           this.view.contextualMenu.imgOption4.src = "deactive_2x.png";
//         } else {
//           this.view.contextualMenu.lblOption4.text = "Activate";
//           this.view.contextualMenu.imgOption4.src = "activate_select2.png";
//         }
//         this.view.flxContextualMenu = height+"px";
//         if (this.view.flxContextualMenu.isVisible === false) {
//           this.view.flxContextualMenu.setVisibility(true);
//         }
//         else{
//           this.view.flxContextualMenu.setVisibility(false);
//         }
//         kony.print("showContextualMenu called");
//       },
    };
});
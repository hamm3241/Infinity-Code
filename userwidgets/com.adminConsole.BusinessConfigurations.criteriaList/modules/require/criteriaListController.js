define(function() {

  return {
    mouseYCoordinate:0,
    prevIndex: -1,
    flowActions:function(){
      this.view.segCriteria.onHover=this.saveScreenY;
      this.view.flxSelectOptions.onHover = this.onHoverEventCallback;
    },
    onHoverEventCallback:function(widget, context) {
      var scopeObj = this;
      var widGetId = widget.id;
      let segData = scopeObj.view.segCriteria.data;
      let selectedIndex = scopeObj.view.segCriteria.selectedRowIndex[1];
      if (context.eventType === constants.ONHOVER_MOUSE_ENTER||context.eventType === constants.ONHOVER_MOUSE_MOVE) {
        scopeObj.view[widGetId].setVisibility(true);
        if(widGetId==="flxSelectOptions"){
          segData[selectedIndex].flxOptions.skin="sknflxffffffop100Border424242Radius100px";
          scopeObj.view.segCriteria.setDataAt(segData[selectedIndex],selectedIndex);
        }
      } else if (context.eventType === constants.ONHOVER_MOUSE_LEAVE) {
        scopeObj.view[widGetId].setVisibility(false);
        if(widGetId==="flxSelectOptions"){
          segData[selectedIndex].flxOptions.skin="sknFlxBorffffff1pxRound";
          scopeObj.view.segCriteria.setDataAt(segData[selectedIndex],selectedIndex);
        }
      }
    },
    onClickOptions:function(){
      var selItems = this.view.segCriteria.selectedItems[0];
      var hgtValue;
      var usersindex = this.view.segCriteria.selectedIndex;
      var scopeObj = this;
      let segData = this.view.segCriteria.data;
      let selectedRowIndex = this.view.segCriteria.selectedRowIndex[1];
      var templateArray = this.view.segCriteria.clonedTemplates;
      var finalHeight = 231;
      for(var i=0;i<selectedRowIndex;i++){
        finalHeight = finalHeight + templateArray[i].frame.height;
      }
      this.usersSectionindex=usersindex[0];
      //var paginationIndex = (this.getNumPerPage()) * (this.currentPage - 1);
      this.usersRowIndex = this.view.segCriteria.selectedRowIndex[1];
      //this.usersRowIndex = this.view.segCriteria.selectedRowIndex[1] + paginationIndex;
      this.gblselIndex = this.view.segCriteria.selectedIndex[1];
      var clckd_selectedRowIndex = this.view.segCriteria.selectedRowIndex[1];
      var flexLeft = this.view.segCriteria.clonedTemplates[clckd_selectedRowIndex].flxOptions.frame.x;
      this.view.flxSelectOptions.left=parseInt((flexLeft-165),10) + "px";
      if (selItems.lblCriteriaStatus.text === kony.i18n.getLocalizedString("i18n.secureimage.Active")) {
        this.gblsegRoles = clckd_selectedRowIndex;
        hgtValue = (((clckd_selectedRowIndex + 1) * 50)+65)-this.view.segCriteria.contentOffsetMeasured.y;
        kony.print("hgtValue in roles------" + hgtValue);
        this.view.flxSelectOptions.top = finalHeight - 126 + "px";
        //this.view.flxSelectOptions.top = this.mouseYCoordinate-148+ "px";
        this.view.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
        this.view.lblOption3.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Delete");
        this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Deactivate");
        this.view.fonticonDeactive.text = "\ue91c";
        this.view.fonticonDelete.text = "\ue91b";
        this.view.flxSelectOptions.frame.height=105;
        this.fixContextualMenu(finalHeight - 126);
      } else {
        this.gblsegRoles = clckd_selectedRowIndex;
        hgtValue = (((clckd_selectedRowIndex + 1) * 50)+65)-this.view.segCriteria.contentOffsetMeasured.y;
        kony.print("hgtValue in permissions------" + hgtValue);
        //this.view.flxSelectOptions.top = this.mouseYCoordinate-148 + "px";
        this.view.flxSelectOptions.top = finalHeight - 126 + "px";
        this.view.lblOption1.text = kony.i18n.getLocalizedString("i18n.roles.Edit");
        this.view.lblOption3.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Delete");
        this.view.lblOption2.text = kony.i18n.getLocalizedString("i18n.SecurityQuestions.Activate");
        this.view.fonticonDeactive.text = "";
        this.view.flxSelectOptions.frame.height=105;
        this.fixContextualMenu(finalHeight - 126);
      }
      kony.application.getCurrentForm().flxCriteriaStatusFilter.setVisibility(false);
      if (this.view.flxSelectOptions.isVisible===true){
        this.view.flxSelectOptions.isVisible = false;
        let segData = this.view.segCriteria.data;
        let selectedIndex = this.view.segCriteria.selectedRowIndex[1];
        if(scopeObj.prevIndex!==-1){
          segData[scopeObj.prevIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
          this.view.segCriteria.setDataAt(segData[scopeObj.prevIndex],scopeObj.prevIndex);
          scopeObj.prevIndex=-1;
        }
        segData[selectedIndex].flxOptions.skin = "sknFlxBorffffff1pxRound";
        this.view.segCriteria.setDataAt(segData[selectedIndex],selectedIndex);
      }
      else{
        this.view.flxSelectOptions.isVisible = true;
        let segData = this.view.segCriteria.data;
        let selectedIndex = this.view.segCriteria.selectedRowIndex[1];
        scopeObj.prevIndex = selectedIndex;
        segData[selectedIndex].flxOptions.skin = "sknflxffffffop100Border424242Radius100px";
        this.view.segCriteria.setDataAt(segData[selectedIndex],selectedIndex);
      }
      //this.fixContextualMenu(hgtValue);
      this.view.forceLayout();
    },
    fixContextualMenu:function(heightVal){
      if(((this.view.flxSelectOptions.frame.height+heightVal)>(this.view.segCriteria.frame.height+50))&&this.view.flxSelectOptions.frame.height<this.view.segCriteria.frame.height){
        this.view.flxSelectOptions.top = ((heightVal - this.view.flxSelectOptions.frame.height) - 36) + "px";
        this.view.flxArrowImage.setVisibility(false);
        this.view.flxDownArrowImage.setVisibility(true);
      }
      else{
        this.view.flxSelectOptions.top=(heightVal)+"px";
        this.view.flxArrowImage.setVisibility(true);
        this.view.flxDownArrowImage.setVisibility(false);
      }
      this.view.forceLayout();
    },
    saveScreenY:function(widget,context){
      this.mouseYCoordinate=context.screenY;
    }
  };
});
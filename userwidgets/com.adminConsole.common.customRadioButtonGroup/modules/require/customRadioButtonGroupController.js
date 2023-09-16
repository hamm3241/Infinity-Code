define(function() {
	return {
      selectedValue : null,
      setFlowActions: function(){
        var scopeObj = this;
        this.view.imgRadioButton1.onClick = function(){
          scopeObj.radioButtonOnClick(scopeObj.view.imgRadioButton1);
        };
        this.view.imgRadioButton2.onClick = function(){
          scopeObj.radioButtonOnClick(scopeObj.view.imgRadioButton2);
        };
        this.view.imgRadioButton3.onClick = function(){
          scopeObj.radioButtonOnClick(scopeObj.view.imgRadioButton3);
        };
        this.view.imgRadioButton4.onClick = function(){
          scopeObj.radioButtonOnClick(scopeObj.view.imgRadioButton4);
        };
        this.view.imgRadioButton5.onClick = function(){
          scopeObj.radioButtonOnClick(scopeObj.view.imgRadioButton5);
        };
      },
      /*
       * function to show the selected radio button image
       */
      radioButtonOnClick : function(selectedWidget){
        var self =this;
        var ind ="",labelName ="";
        var currWidgetID = selectedWidget.id;
        self.resetAllRadioImages();
        if(selectedWidget){
          selectedWidget.src = self.view.imgRadioButton1.info? self.view.imgRadioButton1.info.selectedImg : "radio_selected.png";
          //to set selected value to current radiobutton clicked
          ind = currWidgetID.substr(currWidgetID.length -1, currWidgetID.length);
          labelName = "lblRadioButtonValue"+ ind;
          self.selectedValue = {"id":self.view[labelName].info ? self.view[labelName].info.id : "",
                                "value":self.view[labelName].text || ""};
        }
        self.view.forceLayout();
      },
      /*
       * reset all radio images to unselected state
       */
      resetAllRadioImages : function(){
        var self =this;
        self.view.imgRadioButton1.src = self.view.imgRadioButton1.info? self.view.imgRadioButton1.info.unselectedImg : "radio_notselected.png";
        self.view.imgRadioButton2.src = self.view.imgRadioButton1.info? self.view.imgRadioButton1.info.unselectedImg : "radio_notselected.png";
        self.view.imgRadioButton3.src = self.view.imgRadioButton1.info? self.view.imgRadioButton1.info.unselectedImg : "radio_notselected.png";
        self.view.imgRadioButton4.src = self.view.imgRadioButton1.info? self.view.imgRadioButton1.info.unselectedImg : "radio_notselected.png";
        self.view.imgRadioButton5.src = self.view.imgRadioButton1.info? self.view.imgRadioButton1.info.unselectedImg : "radio_notselected.png";
      },
      /*
       * function to set data to radio group
       *@param : data to set in format[{"selectedImg":"","unselectedImg":"","src":"","value":"","id":""}]
       */
      setData : function(data){
        var self = this;
        var imgScr ="",lblValue="",flxValue="";
        self.selectedValue = null;
        if(data){
          self.hideAllRadioOption();
          self.view.imgRadioButton1.info ={"selectedImg":data[0].selectedImg,"unselectedImg":data[0].unselectedImg};
          for(var i=0; i<data.length; i++){
            flxValue = "flxRadioButton"+(i+1)+"";
            imgScr = "imgRadioButton"+(i+1)+"";
            lblValue = "lblRadioButtonValue"+(i+1)+"";
            self.view[flxValue].setVisibility(true);
            self.view[imgScr].src = data[i].src;
            self.view[lblValue].text = data[i].value;
            self.view[lblValue].info = {"id" : data[i].id};
            if(self.view.imgRadioButton1.info.selectedImg === data[i].src){
              self.selectedValue = {"id":data[i].id, "value":data[i].value};
            }
          }
        }
      },
      hideAllRadioOption : function(){
        var self = this;
        self.view.flxRadioButton1.setVisibility(false);
        self.view.flxRadioButton2.setVisibility(false);
        self.view.flxRadioButton3.setVisibility(false);
        self.view.flxRadioButton4.setVisibility(false);
        self.view.flxRadioButton5.setVisibility(false);
      },
      /*
       * returns the selected radio button value
       * @return {"value":"","id":""}
       */
      getSelectedValue : function(){
        var self = this;
        var selectedValue = null;
        var radioBoxLen = 0, flxName = "",imgName = "",lblValue = "";
        for(var i=0;i<5;i++){
          flxName = "flxRadioButton"+(i+1)+"";
          if(self.view[flxName].isVisible === true){
            radioBoxLen = radioBoxLen + 1;
          }
        }
        for(var j=0; j< radioBoxLen;j++){
          imgName = "imgRadioButton"+(j+1)+"";
          lblValue = "lblRadioButtonValue"+(j+1)+"";
          if(self.view[imgName].src === self.view.imgRadioButton1.info.selectedImg){
            selectedValue = {"id" : self.view[lblValue].info.id,
                    "value" :self.view[lblValue].text };
            break;
          }
        }
        return selectedValue;
      },
      callPreshow : function(){
        this.setFlowActions();
      }
	};
});
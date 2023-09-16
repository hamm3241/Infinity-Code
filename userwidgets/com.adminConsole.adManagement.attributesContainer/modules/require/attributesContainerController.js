define(function() {

  return {

    selectedAttrCount : 0,

    preshow : function() {
      var scopeObj = this;
      scopeObj.setFlowActions();
    },

    setFlowActions : function() {
      var scopeObj = this;
      scopeObj.view.txtAttributeSearch.onTouchStart = function(){
        scopeObj.view.flxAttributesClearSearch.setVisibility(true);
        scopeObj.view.flxAttributesSearch.skin = "slFbox0ebc847fa67a243Search";
      };

      scopeObj.view.txtAttributeSearch.onTouchEnd = function(){
        scopeObj.view.flxAttributesClearSearch.setVisibility(false);
        scopeObj.view.flxAttributesSearch.skin = "sknflxd5d9ddop100";
      };

      scopeObj.view.txtAttributeSearch.onKeyUp = function() {
        scopeObj.searchAttributes();
      };

      scopeObj.view.flxAttributesClearSearch.onClick=function(){
        scopeObj.view.txtAttributeSearch.text = "";
      };
    },

    searchAttributes: function(){
      var scopeObj = this;
      var attributesList = scopeObj.view.flxAttributesDetailsBody.children;
      var hasSearchData = false;
      if(attributesList.length > 1) {
        var attributeObj ;
        var attributeName ;
        var searchText = scopeObj.view.txtAttributeSearch.text.trim().toLowerCase() ;
        for(var i=1; i<attributesList.length; i++){
          attributeObj = scopeObj.view.flxAttributesDetailsBody[attributesList[i]];
          attributeName = attributeObj.lblName.text.toLowerCase() ;
          var isShowAttribute = searchText === "" ? true : attributeName.indexOf(searchText) !== -1 ;
          hasSearchData = hasSearchData || isShowAttribute;
          attributeObj.setVisibility(isShowAttribute);
        }
      }
      scopeObj.view.lblNoAttributesFound.setVisibility(!hasSearchData);
      scopeObj.view.flxAttributesDetailsBody.forceLayout();
    },

    updateAttributeSelectionCount : function(isSelected){
      var scopeObj = this;
      scopeObj.selectedAttrCount = isSelected ? scopeObj.selectedAttrCount+1 : scopeObj.selectedAttrCount-1;
      scopeObj.view.lblAttributeCount.text = scopeObj.selectedAttrCount;
    },

    displayErrorMsg : function(isError, isDatasetUnselected){
      var scopeObj = this;
      let height = scopeObj.view.flxError.isVisible ? scopeObj.view.flxAttributesDetailsBody.frame.height : 
            (isError ? scopeObj.view.flxAttributesDetailsBody.frame.height-55 : scopeObj.view.flxAttributesDetailsBody.frame.height);
      scopeObj.view.lblErrorMsg.text = isDatasetUnselected ? "Please select the dataset." : "Add atleast 1 attribute to proceed further.";
      scopeObj.view.flxError.setVisibility(isError);
      scopeObj.view.flxAttributesDetailsBody.height = height + "dp" ;
      scopeObj.view.forceLayout();
    },

    resetAttributeSelectionCount : function(){
      var scopeObj = this;
      scopeObj.selectedAttrCount = 0;
      scopeObj.view.lblAttributeCount.text = scopeObj.selectedAttrCount;
    }

  };
});
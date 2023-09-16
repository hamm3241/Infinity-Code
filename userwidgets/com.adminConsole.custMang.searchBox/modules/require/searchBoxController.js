define(function() {

  return {
  /*
  * focus search box
  * @param: opt - true/false
  */
    setSearchBoxFocus : function(opt){
      if(opt === true){
        this.view.flxSearchBoxContainer.skin =  "sknflxBgffffffBorder1293ccRadius30Px";
      } else if(opt === false){
        this.view.flxSearchBoxContainer.skin =  "sknflxd5d9ddop100";
      }
    },
  /*
  * clear search text
  */
    clearSearchBox : function(){
      this.setSearchBoxFocus(false);
      this.view.flxClearSearch.setVisibility(false);
      this.view.tbxSearchBox.text = "";
    },
  };
});
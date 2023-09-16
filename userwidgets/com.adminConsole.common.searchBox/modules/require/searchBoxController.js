define(function() {

  return {
  /*
  * focus search box
  * @param: opt - true/false
  */
    setSearchBoxFocus : function(opt){
      if(opt === true){
        this.view.flxSearchContainer.skin =  "sknflxBgffffffBorder1293ccRadius30Px";
      } else if(opt === false){
        this.view.flxSearchContainer.skin =  "sknflxd5d9ddop100";
      }
    },
  /*
  * clear search text
  */
    clearSearchBox : function(){
      this.setSearchBoxFocus(false);
      this.view.flxSearchCancel.setVisibility(false);
      this.view.tbxSearchBox.text = "";
    },

  };
});
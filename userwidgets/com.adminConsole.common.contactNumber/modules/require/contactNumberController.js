define(function() {

  	var addingPlus = function(text){
      var finalText;
      if(text && text !== "" && text.substr(0,1) !== "+")
        finalText = "+" + text;
      else
        finalText = text;
      return finalText;
    };
  	var ISDErrorValidations = function(text){
    };
  	var phoneNumberErrorValidations = function(text,ref){
    };
  	
  	var showErrorMsg = function(text){
      this.view.flxError.setVisibility(true);
      this.view.lblErrorText.text = text;
      this.view.txtContactNumber.skin = "skinredbg";
    };
  	var hideErrorMsg = function(box){
      this.view.flxError.setVisibility(false);
      if(box === 1)
        this.view.txtISDCode.skin = "skntxtbxDetails0bbf1235271384a";
      else
        this.view.txtContactNumber.skin = "skntxtbxDetails0bbf1235271384a";
    };
	return {
		addingPlus : addingPlus,
      	showErrorMsg : showErrorMsg,
      	hideErrorMsg : hideErrorMsg
	};
});
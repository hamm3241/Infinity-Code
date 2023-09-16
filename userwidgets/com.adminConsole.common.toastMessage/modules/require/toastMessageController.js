define({
  //toast message functions
  showToastMessage: function(toastText,formController) {
    var self = this;
    self.view.flxRightImage.onClick = function(){
  		self.hideToastMessage(formController);
  	};
    kony.print("in toast controller");
    kony.print("toast text "+toastText );
    this.view.lbltoastMessage.text=toastText;
    this.view.flxToastContainer.skin = "sknflxSuccessToast1F844D";
    this.view.fontIconImgLeft.text="\ue944";
    formController.view.flxToastMessage.setVisibility(true);
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100:{
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function() {
        kony.timer.schedule("toastMessageTimer", function () {
          self.hideToastMessage(formController);
        }, 2, false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    formController.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  showErrorToastMessage: function(toastText,formController) {
    kony.print("toast text "+toastText );
    var self = this;
    self.view.flxRightImage.onClick = function(){
  		self.hideToastMessage(formController);
  	};
    this.view.lbltoastMessage.text=toastText;
    this.view.flxToastContainer.skin = "sknFlxErrorToastBgE61919";
    this.view.fontIconImgLeft.text="\ue94b";
    formController.view.flxToastMessage.setVisibility(true);
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100: {
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        kony.timer.schedule("toastMessageTimer", function () {
          self.hideToastMessage(formController);
        }, 2, false);
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    formController.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  showInfoToastMessage: function(toastText,formController,isTimer) {
    var self = this;
    var callbacks = {};
    self.view.flxRightImage.onClick = function(){
  		self.hideToastMessage(formController);
  	};
    kony.print("in toast controller");
    kony.print("toast text "+toastText );
    this.view.lbltoastMessage.text=toastText;
    this.view.flxToastContainer.skin = "sknFlxInfoToastBg357C9E";
    this.view.fontIconImgLeft.text="\ue94d";
    formController.view.flxToastMessage.setVisibility(true);
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100:{
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    if(isTimer === false){
      callbacks = {
        animationEnd: function() { }
      };
    } else{
      callbacks = {
        animationEnd: function() {
          kony.timer.schedule("toastMessageTimer", function () {
            self.hideToastMessage(formController);
          }, 2, false);
        }
      };
    }
    
    var animationDef = kony.ui.createAnimation(animationDefinition);
    formController.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  showWarningToastMessage: function(toastText,formController,isTimer) {
    var self = this;
    var callbacks ={};
    self.view.flxRightImage.onClick = function(){
  		self.hideToastMessage(formController);
  	};
    kony.print("in toast controller");
    kony.print("toast text "+toastText );
    this.view.lbltoastMessage.text=toastText;
    this.view.flxToastContainer.skin = "sknFlxWarningToastBgCF9C37";
    this.view.fontIconImgLeft.text="\ue94b";
    formController.view.flxToastMessage.setVisibility(true);
    var animationDefinition = {
      0: {
        "bottom": "-70px"
      },
      100:{
        "bottom": "0px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    if(isTimer === false){
      callbacks = {
        animationEnd: function() { }
      };
    } else{
      callbacks = {
        animationEnd: function() {
          kony.timer.schedule("toastMessageTimer", function () {
            self.hideToastMessage(formController);
          }, 2, false);
        }
      };
    } 
    var animationDef = kony.ui.createAnimation(animationDefinition);
    formController.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  },
  hideToastMessage : function(formController){
    var self=this;
    var animationDefinition = {
      0:{
        "bottom":"0px"
      },
      100: {
        "bottom":"-70px"
      }
    };
    var animationConfiguration = {
      duration: 0.5,
      fillMode: kony.anim.FILL_MODE_FORWARDS
    };
    var callbacks = {
      animationEnd: function () {
        formController.view.flxToastMessage.setVisibility(false);        
      }
    };
    var animationDef = kony.ui.createAnimation(animationDefinition);
    formController.view.flxToastMessage.animate(animationDef, animationConfiguration, callbacks);
  }
});
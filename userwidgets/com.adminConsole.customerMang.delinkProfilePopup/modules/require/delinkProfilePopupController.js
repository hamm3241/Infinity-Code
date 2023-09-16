define(function() {

  return {
    currentCustomerInfo:"",
    usernameRulesAndPolicy :{usernamerules:"",usernamepolicy :""},
    userNameIsChecked : false,
    /*
    * component preshow
    */
    delinkProfilePreshow : function(formInstance){
      this. initializeDelinkPopupActions(formInstance);
      this.view.usernameEntry.tbxEnterValue.text = "";
      this.view.usernameEntry.flxInlineError.setVisibility(false);
      this.view.usernameEntry.lblCount.skin = "sknLblLatoReg117eb013px";
      this.view.usernameEntry.lblCount.hoverSkin = "sknLbl117eb013pxHov";
    },
    initializeDelinkPopupActions : function(formInstance){
      var scopeObj =this;
      this.currentCustomerInfo = formInstance.presenter.getCurrentCustomerDetails();
      
      this.view.usernameEntry.btnCheck.onClick = function(){
        scopeObj.isCreateButtonClick=false;
        scopeObj.validateUsername(formInstance);
      };
      this.view.usernameEntry.tbxEnterValue.onTextChange = function(){
        scopeObj.userNameIsChecked = false;
      };
      this.view.usernameEntry.tbxEnterValue.onKeyUp = function(){
        scopeObj.view.usernameEntry.flxEnterValue.skin="sknflxEnterValueNormal";
        scopeObj.view.usernameEntry.flxInlineError.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.btnPopUpCancel.onClick = function(){
        formInstance.view.flxDelinkProfilePopup.setVisibility(false);
      };
      this.view.flxPopUpClose.onClick = function(){
        scopeObj.view.btnPopUpCancel.onClick();
      };
      this.view.btnCreatePopup.onClick = function(){
        scopeObj.currentCustomerInfo = formInstance.presenter.getCurrentCustomerDetails();
        if(scopeObj.userNameIsChecked){
        if(scopeObj.isUserNameAvailable){
          var userFullName= formInstance.view.flxGeneralInfoWrapper.generalInfoHeader.lblCustomerName.text;
          var delinkParam= {
            "combinedUser": scopeObj.currentCustomerInfo.id|| scopeObj.currentCustomerInfo.Customer_id ,
            "newUser": scopeObj.view.usernameEntry.tbxEnterValue.text
          };
          formInstance.presenter.deLinkProfileService(delinkParam, userFullName);
          formInstance.view.flxDelinkProfilePopup.setVisibility(false);
        }
        }else{
          scopeObj.isCreateButtonClick=true;
          scopeObj.validateUsername(formInstance);
        }
      };
      this.view.usernameEntry.lblCount.onClick = function(){
        if(scopeObj.view.flxUsernameRules.isVisible){
          scopeObj.view.flxUsernameRules.setVisibility(false);
        } else{
          scopeObj.view.flxUsernameRules.setVisibility(true);
        }
      };
    },
    /*
    * set the rules for username validation
    */
    setUsernameRules: function(usernameRules){
      this.usernameRulesAndPolicy.usernamerules = usernameRules.usernamerules;
      for(var i=0; i<usernameRules.usernamepolicy.length; ++i) {
        if(usernameRules.usernamepolicy[i].locale === "en-US") {
          this.usernameRulesAndPolicy.usernamepolicy = usernameRules.usernamepolicy[i].content;
          break;
        }
      }
    },
    /*
    * validations for username
    *@returns : true or false
    */
    userNameValidation : function(){
      var self = this;
      var isValid = true;
      var usernameRegexString = "^([a-zA-Z0-9sp]+)$";
      var supportedSymbols="";
      this.view.usernameEntry.lblErrorIcon.text = "";
      if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
        supportedSymbols = self.usernameRulesAndPolicy.usernamerules.supportedSymbols.replace(/,/g, "");
        supportedSymbols = supportedSymbols.replace("-","\\-");
        usernameRegexString = usernameRegexString.replace(/sp/g, supportedSymbols);
      }
      else {
        usernameRegexString = usernameRegexString.replace(/sp/g, '');
      }
      var usernameRegex = new RegExp(usernameRegexString);

      if (self.view.usernameEntry.tbxEnterValue.text.trim() === "") {
        self.view.usernameEntry.flxEnterValue.skin = "sknflxEnterValueError";
        self.view.usernameEntry.flxInlineError.setVisibility(true);
        self.view.usernameEntry.lblErrorText.text = kony.i18n.getLocalizedString("i18n.common.Username_cannot_be_empty");
        isValid = false;
      } else if(self.view.usernameEntry.tbxEnterValue.text.trim().length < self.usernameRulesAndPolicy.usernamerules.minLength){
        self.view.usernameEntry.flxEnterValue.skin = "sknflxEnterValueError";
        self.view.usernameEntry.flxInlineError.setVisibility(true);
        self.view.usernameEntry.lblErrorText.text = "Enter atleast " + self.usernameRulesAndPolicy.usernamerules.minLength + " characters";
        isValid = false;
      } else if(self.view.usernameEntry.tbxEnterValue.text.trim().length > self.usernameRulesAndPolicy.usernamerules.maxLength){
        self.view.usernameEntry.flxEnterValue.skin = "sknflxEnterValueError";
        self.view.usernameEntry.flxInlineError.setVisibility(true);
        self.view.usernameEntry.lblErrorText.text = "Enter max of " + self.usernameRulesAndPolicy.usernamerules.maxLength + " characters only";
        isValid = false;
      } 
      else if(usernameRegex.test(self.view.usernameEntry.tbxEnterValue.text.trim()) === false){
        self.view.usernameEntry.flxEnterValue.skin = "sknflxEnterValueError";
        self.view.usernameEntry.flxInlineError.setVisibility(true);
        if(self.usernameRulesAndPolicy.usernamerules.symbolsAllowed) {
          self.view.usernameEntry.lblErrorText.text = "Only following special characters allowed: " + self.usernameRulesAndPolicy.usernamerules.supportedSymbols;
        }
        else {
          self.view.usernameEntry.lblErrorText.text = "No special characters allowed";
        }
        isValid = false;
      }
      else if(self.validateOnSpecialCharacter(self.view.usernameEntry.tbxEnterValue.text.trim(),supportedSymbols) === false){
        self.view.usernameEntry.flxEnterValue.skin = "sknflxEnterValueError";
        self.view.usernameEntry.flxInlineError.setVisibility(true);
        self.view.usernameEntry.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmErrorLogin.lblRulesB");
        isValid = false;
      }
      if(isValid===false){
        self.view.usernameEntry.lblErrorIcon.text = "";
        self.view.usernameEntry.lblErrorText.skin = "sknlblError";
        self.view.usernameEntry.lblErrorIcon.skin = "sknErrorIcon";
      }
      self.view.forceLayout();
      return isValid;
    },
      validateOnSpecialCharacter:function(str,specialcharacters){
    if(specialcharacters.length===0)
      return true;
    for(var i=0;i<specialcharacters.length;i++){
      if(str.indexOf(specialcharacters[i])>-1)
        return true;
    }
    return false;
  },
    checkUserNameAvailability : function(isAvailable){
      this.userNameIsChecked = true;
      if(typeof(isAvailable) === 'boolean'){
          if(isAvailable===true){
            this.view.usernameEntry.flxInlineError.setVisibility(true);
            this.view.usernameEntry.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Available");
            this.view.usernameEntry.lblErrorIcon.text = "";
            this.view.usernameEntry.lblErrorText.skin = "sknlblLato5bc06cBold14px";
            this.view.usernameEntry.lblErrorIcon.skin = "sknIcomoonGreenTick";
            this.view.usernameEntry.tbxEnterValue.skin = "skntbxLato35475f14px";
            this.isUserNameAvailable=true;
            if(this.isCreateButtonClick===true)
              this.view.btnCreatePopup.onClick();
          }else{
            this.view.usernameEntry.flxInlineError.setVisibility(true);
            this.view.usernameEntry.lblErrorText.text = kony.i18n.getLocalizedString("i18n.frmUsersController.Username_Not_Available");
            this.view.usernameEntry.lblErrorIcon.text = "";
            this.view.usernameEntry.lblErrorText.skin = "sknlblError";
            this.view.usernameEntry.lblErrorIcon.skin = "sknErrorIcon";
            this.view.usernameEntry.tbxEnterValue.skin = "skinredbg";
            this.isUserNameAvailable=false;
          }
          this.view.forceLayout();
      }
    },
    validateUsername : function(formInstance){
      var isUsernameValid= this.userNameIsChecked?this.isUserNameAvailable:this.userNameValidation();
        if(isUsernameValid){
          var userNameText= this.view.usernameEntry.tbxEnterValue.text;
          var legalEnityId = formInstance.presenter.getCurrentCustomerDetails().legalEntityId || formInstance.presenter.custSearchLEId;
          var custSearch = {
          "_searchType": "CUSTOMER_SEARCH",
          "_username": userNameText,
          "_pageOffset": "0",
          "_pageSize": 20,
          "legalEntityId":legalEnityId || ""
        };
          formInstance.presenter.searchCustomersUnlinkProfile(custSearch);
        }
    }
  };
});
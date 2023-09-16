define({ 

  //Type your controller code here 
  listOfPolicies:null,
  filterPolicy:null,
  records:0,
  isCustomers:false,
  isUsername:false,
  numberRegex : new RegExp("^([1-9][0-9]*)$"),
  policiesPreShow : function(){
    this.view.mainHeader.lblUserName.text=kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    kony.adminConsole.utils.showProgressBar(this.view);
    this.setHeaderText();
    this.setFlowActions();
    this.view.flxPolicies.isVisible = true;
    this.view.flxBreadcrumb.setVisibility(false);
     this.view.breadcrumbs.btnBackToMain.text = kony.i18n.getLocalizedString("i18n.leftmenu.CredentialManagementCaps");
    this.view.flxPoliciesParentRulesView.isVisible = false;
    this.view.flxPoliciesEdit.isVisible = false;
    this.view.flxPolicies.isVisible = false;
    this.view.maxConsecutiveChars.isVisible = true;
    this.view.forceLayout();
    this.view.flxMain.height=kony.os.deviceInfo().screenHeight+"px";
    this.view.MinCharacters.flxPlus.focusSkin="sknflxffffffBorderLeftRound1293cc";
    this.view.MaxCharacters.flxPlus.focusSkin="sknflxffffffBorderLeftRound1293cc";
    this.view.MinCharacters.flxMinus.focusSkin="sknflxffffffBorderRightRound1293cc";
    this.view.MaxCharacters.flxMinus.focusSkin="sknflxffffffBorderRightRound1293cc";
   },
  setEditPasswordRules: function(passwordRules){
       var scopeObj = this;
       scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.editPasswordPolicies");
       scopeObj.view.flxSpecialCharacters.isVisible = false;
       scopeObj.view.flxBreadcrumb.setVisibility(true);
       scopeObj.view.breadcrumbs.isVisible = true;
       scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPolicies");
       scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
       scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
       scopeObj.view.forceLayout();
       scopeObj.view.flxErrorMessage.isVisible = false; 
       scopeObj.view.flxErrorConsecutive.isVisible = false;
       scopeObj.view.flxPasswordAdditionalRules.isVisible = true;
       scopeObj.view.flxPolicies.isVisible = false;
       scopeObj.view.imgLowercaseCharacters.src = passwordRules.passwordrules.atleastOneLowerCase === true?"checkboxselected.png":"checkbox.png";
       scopeObj.view.imgUppercaseCharacters.src = passwordRules.passwordrules.atleastOneUpperCase===true?"checkboxselected.png":"checkbox.png";
       scopeObj.view.imgNumbers.src = passwordRules.passwordrules.atleastOneNumber===true?"checkboxselected.png":"checkbox.png";
       scopeObj.view.imgSpecialChars.src = passwordRules.passwordrules.atleastOneSymbol===true?"checkboxselected.png":"checkbox.png";
       if(passwordRules.passwordrules.charRepeatCount === -1){
          scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = 4;
          scopeObj.view.imgNoRepetition.src = "checkboxselected.png";
          scopeObj.view.maxConsecutiveChars.isVisible = false; 
       }
       else{
         scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = passwordRules.passwordrules.charRepeatCount;
         scopeObj.view.imgNoRepetition.src = "checkbox.png";
          scopeObj.view.maxConsecutiveChars.isVisible = true;
       }
       scopeObj.view.flxPoliciesParentRulesView.isVisible = false;
       scopeObj.view.flxPoliciesEdit.isVisible = true;
       scopeObj.view.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPoliciesForCustomers");
       scopeObj.view.MinCharacters.tbxcharcterSize.text = passwordRules.passwordrules.minLength;
       scopeObj.view.MinCharacters.flxPlusDisable.isVisible = true;
       scopeObj.view.MaxCharacters.tbxcharcterSize.text = passwordRules.passwordrules.maxLength;
       scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = true;
       scopeObj.view.forceLayout();
  },
   camelize: function(str) {
 return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
},
  setEditUsernameRules: function(usernameRules){
       var scopeObj = this;
       scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.editUsernamePolicies");
       scopeObj.view.flxSpecialCharacters.isVisible = true;
       scopeObj.view.flxErrorMessage.isVisible = false; 
       scopeObj.view.flxErrorConsecutive.isVisible = false;
       scopeObj.view.flxBreadcrumb.setVisibility(true);
       scopeObj.view.flxPolicies.isVisible = false;
       scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.usernamePolicies");
       scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
       scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
       scopeObj.view.flxPasswordAdditionalRules.isVisible = false;
       scopeObj.view.flxPoliciesParentRulesView.isVisible = false;
       scopeObj.view.flxPoliciesEdit.isVisible = true;
       scopeObj.view.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.policyConfiguration");
       scopeObj.view.MinCharacters.tbxcharcterSize.text = usernameRules.usernamerules.minLength;
       scopeObj.view.MaxCharacters.tbxcharcterSize.text = usernameRules.usernamerules.maxLength;
       if(usernameRules.usernamerules.symbolsAllowed === true){
         scopeObj.view.imgYes.src = "radio_selected.png";
         scopeObj.view.imgNo.src = "radio_notselected.png";
       }
       else{
         scopeObj.view.imgNo.src = "radio_selected.png";
         scopeObj.view.imgYes.src = "radio_notselected.png";
       }
        if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) === 8){
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) === 64){
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === 64){
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === 8){
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = false;
      }
       scopeObj.view.MaxCharacters.tbxcharcterSize.text = usernameRules.usernamerules.maxLength;
       scopeObj.view.forceLayout();
  },
  setUsernamePasswordPoliciesForCustomers : function(policies){
    this.view.flxPolicies.isVisible = true;
    this.view.flxPoliciesParentRulesView.isVisible = false;
    this.view.flxPoliciesEdit.isVisible = false;
    if(policies.usernamepolicy && policies.usernamepolicy.content){
      this.view.customersPolicies.lblUsernamePoliciesValue.text = policies.usernamepolicy.content;
    }
    if(policies.passwordpolicy && policies.passwordpolicy.content){
      this.view.customersPolicies.lblPasswordPoliciesValue.text = policies.passwordpolicy.content;
    }
    this.view.forceLayout();
  },
  setUsernameRulesPolicies : function(usernameRulesPolicies){
    var scopeObj = this;
    scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.viewPolicies");
    scopeObj.view.flxPolicies.isVisible = false;
    scopeObj.view.btnAddNew.isVisible = true;
    scopeObj.view.flxPoliciesEdit.isVisible = false;
    scopeObj.view.policiesRulesView.flxPasswordAdditionalRules.isVisible = false;
    scopeObj.view.flxAddNewPolicyDescription.isVisible = false;
    scopeObj.view.flxBreadcrumb.isVisible = true;
    scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.usernamePolicies");
    scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
    scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
    scopeObj.view.flxPoliciesParentRulesView.isVisible = true;
    scopeObj.view.policiesRulesView.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.policyConfiguration");
    scopeObj.view.policiesRulesView.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.USERNAMEMUSTCONTAIN");
    scopeObj.view.policiesRulesView.flxPasswordAdditionalRules.isVisible = false;
    scopeObj.view.lblPolicyDescriptionName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.UsernamePolicyHeader");
    scopeObj.view.policiesRulesView.lblMinNumberCharsValue.text = usernameRulesPolicies.usernamerules.minLength;
    scopeObj.view.policiesRulesView.lblMaxNumberCharsValue.text = usernameRulesPolicies.usernamerules.maxLength;
    scopeObj.view.policiesRulesView.lblSpecialCharsValue.text = usernameRulesPolicies.usernamerules.symbolsAllowed === true?"Yes":"No";
    scopeObj.setPoliciesSegData(usernameRulesPolicies.usernamepolicy);
    scopeObj.view.forceLayout();
  },
  updateUsernamePasswordRulesPolicies:function(usernameRulesPolicies){
    var scopeObj=this;
    scopeObj.view.flxBreadcrumb.setVisibility(true);
    scopeObj.view.breadcrumbs.isVisible = true;
    scopeObj.view.flxErrorMessage.isVisible = true;
    scopeObj.view.flxErrorConsecutive.isVisible = true;
    scopeObj.view.toastMessageWithWarning.isVisible = true;
    if(scopeObj.isUsername === true){
          scopeObj.view.toastMessageWithWarning.lblToastMessageRight.text = "  " + kony.i18n.getLocalizedString("i18n.frmPolicies.usernamePoliciesForCustomersLowerCase") + ".";
    }
    else{
          scopeObj.view.toastMessageWithWarning.lblToastMessageRight.text = "  " +kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPoliciesForCustomersLowerCase") + ".";
    }
    if(scopeObj.isUsername === true){
      this.setUsernameRulesPolicies(usernameRulesPolicies);
    }
    else{
      this.setPasswordRulesPolicies(usernameRulesPolicies);
    }
    scopeObj.view.flxToastMsg.isVisible = true;
    scopeObj.view.forceLayout();
  },
  setPasswordRulesPolicies : function(passwordRulesPolicies){
    var scopeObj = this;
    scopeObj.view.flxBreadcrumb.isVisible = true;
    scopeObj.view.policiesRulesView.flxPasswordAdditionalRules.isVisible = true;
    scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.viewPasswordPolicies");
    scopeObj.view.btnAddNew.isVisible = true;
    scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPolicies");
    scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
    scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
    scopeObj.view.flxPoliciesParentRulesView.isVisible = true;
    scopeObj.view.flxAddNewPolicyDescription.isVisible = false;
    scopeObj.view.flxPolicies.isVisible = false;
    scopeObj.view.flxPoliciesEdit.isVisible = false;
    scopeObj.view.policiesRulesView.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPoliciesForCustomers");
    scopeObj.view.policiesRulesView.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.lengthOfPassword");
    scopeObj.view.policiesRulesView.flxPasswordAdditionalRules.isVisible = true;
    scopeObj.view.policiesRulesView.lblMinNumberCharsValue.text = passwordRulesPolicies.passwordrules.minLength;
    scopeObj.view.policiesRulesView.lblMaxNumberCharsValue.text = passwordRulesPolicies.passwordrules.maxLength;
    scopeObj.view.lblPolicyDescriptionName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.PasswordPolicyHeader");
    scopeObj.view.policiesRulesView.lblSelectedOptionsValue.text = this.getAdditionalRules(passwordRulesPolicies.passwordrules);
    scopeObj.view.policiesRulesView.lblSpecialCharsValue.text =  passwordRulesPolicies.passwordrules.atleastOneSymbol === true ? "Yes" : "No";
    scopeObj.view.policiesRulesView.lblMaxConsecutiveRepetitionValue.text = passwordRulesPolicies.passwordrules.charRepeatCount === -1 ? "No restriction": passwordRulesPolicies.passwordrules.charRepeatCount;
    scopeObj.setPoliciesSegData(passwordRulesPolicies.passwordpolicy);
    scopeObj.view.forceLayout();
  },
  getAdditionalRules : function(rules){
    var result = [];
    if(rules.atleastOneUpperCase === true){
      result.push("Uppercase letters");
    }
    if(rules.atleastOneLowerCase === true){
      result.push("Lowercase letters");
    }
    if(rules.atleastOneNumber === true){
     result.push("Number");
    }
    if(rules.atleastOneSymbol === true){
      result.push("Special characters (" + rules.supportedSymbols+")");
    }
    return result.join(",");
  },
  setHeaderText : function(){
    this.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.leftmenu.credentialManagement");
  },
  willUpdateUI: function (policyModel) {
    this.updateLeftMenu(policyModel);
    if(policyModel && policyModel.action === 'showLoadingScreen'){
      kony.adminConsole.utils.showProgressBar(this.view);
    }else if(policyModel && policyModel.action === 'hideLoadingScreen'){
      kony.adminConsole.utils.hideProgressBar(this.view);
    }
    if(policyModel.error === undefined || policyModel.error === null){
    if(policyModel && policyModel.localeList){
      this.localeData = policyModel.localeList;
    }
    if(policyModel && policyModel.policyList){
      this.setUsernamePasswordPoliciesForCustomers(policyModel.policyList);
    }
    if(policyModel && policyModel.usernameRulesPolicies){
      this.view.flxBreadcrumb.setVisibility(true);
      this.view.breadcrumbs.isVisible = true;
      this.usernamePolicies = policyModel.usernameRulesPolicies.usernamepolicy;
      if(this.updateRules === true){
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPolicies.usernamePoliciesUpdatedSuccessfully"),this);
        this.updateUsernamePasswordRulesPolicies(policyModel.usernameRulesPolicies);
      }
      else{
        this.view.flxToastMsg.isVisible = false;
        this.setUsernameRulesPolicies(policyModel.usernameRulesPolicies);
      }
    }
    if(policyModel && policyModel.passwordRulesPolicies){
      this.view.flxBreadcrumb.setVisibility(true);
      this.view.breadcrumbs.isVisible = true;
      this.passwordPolicies = policyModel.passwordRulesPolicies.passwordpolicy;
      if(this.updateRules === true){
        this.view.toastMessage.showToastMessage(kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPoliciesUpdatedSuccessfully"),this);
        this.updateUsernamePasswordRulesPolicies(policyModel.passwordRulesPolicies);
      }
      else{
         this.view.flxToastMsg.isVisible = false;
         this.setPasswordRulesPolicies(policyModel.passwordRulesPolicies);
      } 
    }
    if(policyModel && policyModel.usernamePolicies){
      this.view.flxAddNewPolicyDescription.isVisible = false;
      this.usernamePolicies = policyModel.usernamePolicies.usernamepolicy;
      this.setPoliciesSegData(this.usernamePolicies);
    }
    if(policyModel && policyModel.passwordPolicies){
      this.view.flxAddNewPolicyDescription.isVisible = false;
      this.passwordPolicies = policyModel.passwordPolicies.passwordpolicy;
      this.setPoliciesSegData(this.passwordPolicies);
    }
    if(policyModel && policyModel.usernameRules){
      this.setEditUsernameRules(policyModel.usernameRules);
    }
    if(policyModel && policyModel.passwordRules){
      this.setEditPasswordRules(policyModel.passwordRules);
    }
    }
    else{
      this.view.toastMessage.showErrorToastMessage (policyModel.error,this);
    }
    if(policyModel.toast){
      if(policyModel.toast.status === kony.i18n.getLocalizedString("i18n.frmCustomerCareController.success")){
        this.view.toastMessage.showToastMessage(policyModel.toast.message,this);
      }else if(policyModel.toast.status === kony.i18n.getLocalizedString("i18n.frmGroupsController.error")){
        this.view.toastMessage.showErrorToastMessage (policyModel.toast.message,this);
      }
    }
  },
  removeUsedLocales : function(data){
      var list = this.localeData.locale;
      var attributeList = list.reduce(function(list, record) {
            return list.concat([
                [record.code, record.language]]);
        }, [
            ["select", "Select A Language"]
        ]);
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < list.length; j++) {
                if (data[i].locale === list[j].code) {
                  for(var k = 0; k < attributeList.length; k++){
                    if(attributeList[k][0] === list[j].code){
                      attributeList.splice(k, 1);
                    }
                  }
                    
                }
            }
        }
        this.view.lstDropDown.masterData = attributeList;
    },
  setFlowActions: function (){
    var scopeObj = this;
     this.view.MinCharacters.tbxcharcterSize.onEndEditing = function(){
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) < 8 || parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) > 64){
        scopeObj.view.MinCharacters.flxPlusDisable.setVisibility(true);
        scopeObj.view.lblErrormsg.text = "Range is between 8 and 64";
        scopeObj.view.flxErrorMessage.isVisible = true;
      }
      else{
        scopeObj.view.MinCharacters.flxPlusDisable.setVisibility(false);
      }
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) < 8 || parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) > 64){
        scopeObj.view.MinCharacters.flxMinusDisable.setVisibility(true);
        scopeObj.view.lblErrormsg.text = "Range is between 8 and 64";
        scopeObj.view.flxErrorMessage.isVisible = true;
      }
      else{
        scopeObj.view.flxErrorMessage.isVisible = false;
        scopeObj.view.MinCharacters.flxMinusDisable.setVisibility(false);
      }
	  if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) === 8){
		 scopeObj.view.MinCharacters.flxPlusDisable.setVisibility(true); 
	  }
	  if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) === 64){
		 scopeObj.view.MinCharacters.flxMinusDisable.setVisibility(true); 
	  }
	  scopeObj.view.forceLayout();
    };
    this.view.MaxCharacters.tbxcharcterSize.onEndEditing = function(){
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) < 8 || parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) > 64){
        scopeObj.view.MaxCharacters.flxPlusDisable.setVisibility(true);
        scopeObj.view.lblErrormsg.text = "Range is between 8 and 64";
        scopeObj.view.flxErrorMessage.isVisible = true;
      }
      else{
        scopeObj.view.flxErrorMessage.isVisible = false;
        scopeObj.view.MaxCharacters.flxPlusDisable.setVisibility(false);
      }
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) < 8 || parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) > 64){
        scopeObj.view.MaxCharacters.flxMinusDisable.setVisibility(true);
        scopeObj.view.lblErrormsg.text = "Range is between 8 and 64";
        scopeObj.view.flxErrorMessage.isVisible = true;
      }
      else{
        scopeObj.view.MaxCharacters.flxMinusDisable.setVisibility(false);
      }
	  if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === 8){
		scopeObj.view.flxErrorMessage.isVisible = false;
        scopeObj.view.MaxCharacters.flxPlusDisable.setVisibility(true); 
	  }
	  if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === 64){
		 scopeObj.view.MaxCharacters.flxMinusDisable.setVisibility(true); 
	  }
	  scopeObj.view.forceLayout();
    };
    this.view.maxConsecutiveChars.tbxcharcterSize.onEndEditing = function(){
      if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) > 9){
        scopeObj.view.maxConsecutiveChars.flxPlusDisable.setVisibility(true);
        scopeObj.view.flxErrorConsecutive.isVisible = true;
        scopeObj.view.lblImgError.text = "Range is between 1 and 9";
      }
      else{
        scopeObj.view.maxConsecutiveChars.flxPlusDisable.setVisibility(false);
      }
      if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) > 9){
        scopeObj.view.maxConsecutiveChars.flxMinusDisable.setVisibility(true);
        scopeObj.view.flxErrorConsecutive.isVisible = true;
        scopeObj.view.lblImgError.text = "Range is between 1 and 9";
      }
      else{
        scopeObj.view.flxErrorConsecutive.isVisible = false;
        scopeObj.view.maxConsecutiveChars.flxMinusDisable.setVisibility(false);
      }
	  if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) === 1){
		 scopeObj.view.maxConsecutiveChars.flxPlusDisable.setVisibility(true); 
	  }
	  if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) === 9){
		 scopeObj.view.maxConsecutiveChars.flxMinusDisable.setVisibility(true); 
	  }
	  scopeObj.view.forceLayout();
    };
    this.view.flxYes.onTouchStart = function(){
      scopeObj.view.imgYes.src = "radio_selected.png";
      scopeObj.view.imgNo.src = "radio_notselected.png";
    };
    this.view.flxNo.onTouchStart = function(){
      scopeObj.view.imgNo.src = "radio_selected.png";
      scopeObj.view.imgYes.src = "radio_notselected.png";
    };
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.view.flxPolicies.isVisible = true;
      scopeObj.view.flxPolicies.setContentOffset({
                y: 0,
                x: 0
            });
      scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.credentialManagement");
      scopeObj.view.flxPoliciesParentRulesView.isVisible = false;
      scopeObj.view.flxPoliciesEdit.isVisible = false;
      scopeObj.view.flxToastMsg.isVisible = false;
      scopeObj.view.flxBreadcrumb.isVisible = false;
      scopeObj.view.forceLayout();
    };
    this.view.commonButtons.btnCancel.onClick = function(){
      if(scopeObj.directEdit === true){
        scopeObj.view.flxPolicies.isVisible = true;
        scopeObj.view.flxPoliciesParentRulesView.isVisible = false;
        scopeObj.view.flxBreadcrumb.setVisibility(false);
        scopeObj.view.breadcrumbs.isVisible = false;
        scopeObj.view.mainHeader.lblHeading.text = kony.i18n.getLocalizedString("i18n.leftmenu.credentialManagement");
      }
      else{
        scopeObj.view.flxPolicies.isVisible = false;
        scopeObj.view.flxPoliciesParentRulesView.isVisible = true;
        scopeObj.view.flxBreadcrumb.setVisibility(true);
        scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
        scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
      }
      scopeObj.view.flxPoliciesEdit.isVisible = false;
      scopeObj.view.flxToastMsg.isVisible = false;
      scopeObj.view.forceLayout();
    };
    this.view.toastMessageWithWarning.flxRightImage.onTouchStart = function(){
      scopeObj.view.flxToastMsg.isVisible = false;
      scopeObj.view.forceLayout();
    };
    this.view.commonButtons.btnSave.onClick = function(){
      var request;
      var flag = true;
      if(scopeObj.numberRegex.test(scopeObj.view.MinCharacters.tbxcharcterSize.text) === false) {
        scopeObj.view.lblErrormsg.text = "Value is invalid";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      else if (scopeObj.view.MinCharacters.tbxcharcterSize.text === "") {
        scopeObj.view.lblErrormsg.text = "Field can't be empty";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      else if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) < 8 || parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) > 64){
        scopeObj.view.lblErrormsg.text = "Range is between 8 and 64";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      
      if(scopeObj.numberRegex.test(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === false) {
        scopeObj.view.lblErrormsg.text = "Value is invalid";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      else if (scopeObj.view.MaxCharacters.tbxcharcterSize.text === ""){
        scopeObj.view.lblErrormsg.text = "Field cannot be empty";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      else if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) < 8 || parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) > 64){
        scopeObj.view.lblErrormsg.text = "Range is between 8 and 64";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      
      if(flag && parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) > parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text)){
        scopeObj.view.lblErrormsg.text = "Min cannot be greater than max";
        scopeObj.view.flxErrorMessage.isVisible = true;
        flag = false;
      }
      else if(scopeObj.view.lblNoValueErrorIcon.isVisible === true){
        
      }
      
      if(scopeObj.isUsername === true && flag){
        request = {"minLength": scopeObj.view.MinCharacters.tbxcharcterSize.text,
                   "maxLength": scopeObj.view.MaxCharacters.tbxcharcterSize.text,
                   "symbolsAllowed": scopeObj.view.imgYes.src === "radio_selected.png"? true: false
                  };
        scopeObj.presenter.updateUsernameRules(request);
      }
      else if (flag) {
        if (scopeObj.numberRegex.test(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) === false) {
          scopeObj.view.lblImgError.text = "Value is invalid";
          scopeObj.view.flxErrorConsecutive.isVisible = true;
        }
        else if(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text === "") {
          scopeObj.view.lblImgError.text = "Field can't be empty";
          scopeObj.view.flxErrorConsecutive.isVisible = true;
        }
        else if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) < 1 || parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) > 9){
          scopeObj.view.flxErrorConsecutive.isVisible = true;
          scopeObj.view.lblImgError.text = "Range is between 1 and 9";
        } else {
          request = {
            "minLength": scopeObj.view.MinCharacters.tbxcharcterSize.text,
            "maxLength": scopeObj.view.MaxCharacters.tbxcharcterSize.text,
            "atleastOneLowerCase":  scopeObj.view.imgLowercaseCharacters.src==="checkboxselected.png"?true:false,
            "atleastOneUpperCase":scopeObj.view.imgUppercaseCharacters.src==="checkboxselected.png"?true:false,
            "atleastOneNumber": scopeObj.view.imgNumbers.src==="checkboxselected.png"?true:false,
            "atleastOneSymbol": scopeObj.view.imgSpecialChars.src==="checkboxselected.png"?true:false,
            "charRepeatCount": scopeObj.view.imgNoRepetition.src==="checkboxselected.png"?-1:scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text,
          };
          scopeObj.presenter.updatePasswordRules(request);
        }
      }
    };
    this.view.customersPolicies.flxUsernamePolicies.onClick = function(){
      scopeObj.isCustomers = true;
      scopeObj.isUsername = true;
      scopeObj.updateRules = false;
      scopeObj.view.breadcrumbs.isVisible = true;
      scopeObj.view.forceLayout();
      scopeObj.presenter.fetchUsernamePoliciesCustomer();
    };
    this.view.customersPolicies.lblUsernamePoliciesValue.onTouchStart = function(){
      scopeObj.view.customersPolicies.flxUsernamePolicies.onClick();
    };
    this.view.customersPolicies.flxPasswordPolicies.onClick = function(){
      scopeObj.isCustomers = true;
      scopeObj.isUsername = false;
      scopeObj.updateRules = false;
      scopeObj.view.breadcrumbs.isVisible = true;
      scopeObj.view.forceLayout();
      scopeObj.presenter.fetchPasswordPoliciesCustomer();
    };
    this.view.customersPolicies.lblPasswordPoliciesValue.onTouchStart = function(){
      scopeObj.view.customersPolicies.flxPasswordPolicies.onClick();
    };
    this.view.internalUserPolicies.lblPasswordPoliciesValue.onTouchStart = function(){
      scopeObj.isCustomers = false;
      scopeObj.isUsername = false;
      scopeObj.view.flxBreadcrumb.isVisible = true;
      scopeObj.view.flxToastMsg.isVisible = false;
      scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.viewPasswordPolicies");
      scopeObj.view.btnAddNew.isVisible = true;
      scopeObj.view.flxAddNewPolicyDescription.isVisible = false;
      scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
      scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
      scopeObj.view.flxPoliciesParentRulesView.isVisible = true;
      scopeObj.view.flxPolicies.isVisible = false;
      scopeObj.view.policiesRulesView.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPoliciesForInternalUsers");
      scopeObj.view.policiesRulesView.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.lengthOfPassword");
      scopeObj.view.policiesRulesView.flxPasswordAdditionalRules.isVisible = true;
      scopeObj.setPoliciesSegData();
      scopeObj.view.forceLayout();
    };
    this.view.btnAddNew.onClick = function(){
      scopeObj.view.flxErrorLanguage.isVisible = false;
      scopeObj.policyUpdate = false;
      scopeObj.view.btnAddNew.isVisible = false;
      scopeObj.view.flxToastMsg.isVisible = false;
      if(scopeObj.isUsername === true){
        scopeObj.removeUsedLocales(scopeObj.usernamePolicies);
      }
      else{
        scopeObj.removeUsedLocales(scopeObj.passwordPolicies);
      }
      scopeObj.view.flxAddNewPolicyDescription.isVisible = true;
      var tncEditorDocument = document.getElementById("iframe_rtxTnC").contentWindow.document;
      tncEditorDocument.getElementById("editor").innerHTML = "";
      tncEditorDocument.getElementsByClassName("table-palette")[0].style.marginLeft = "0px";
      //scopeObj.view.lblSelectALanguage.text = kony.i18n.getLocalizedString("i18n.frmPolicies.selectALanguage");
      scopeObj.view.btnSave.text =  kony.i18n.getLocalizedString("i18n.policies.ADD");
      scopeObj.view.forceLayout();
    };
    this.view.btnCancel.onClick = function(){
      if(scopeObj.policyUpdate === true){
        var selectedIndex = scopeObj.view.segPolicyDescriptions.selectedRowIndex[1];        
        scopeObj.view.segPolicyDescriptions.addDataAt(scopeObj.currentData, selectedIndex);
      }
      scopeObj.view.btnAddNew.isVisible = true;
      scopeObj.view.flxAddNewPolicyDescription.isVisible = false;
      scopeObj.view.forceLayout();
    };
    this.view.btnSave.onClick = function(){
      if(scopeObj.view.lstDropDown.selectedKeyValue[0] === "select"){
        scopeObj.view.flxErrorLanguage.isVisible = true;
      }
      else{
         scopeObj.view.btnAddNew.isVisible = true;
      var tncText = document.getElementById("iframe_rtxTnC").contentWindow.document.getElementById("editor").innerHTML;
      tncText = window.btoa(encodeURI(tncText));
      var request = {
          "policyForCustomer": false,
          "localeCode": scopeObj.view.lstDropDown.selectedKeyValue[0],
          "policyDescription": tncText
        };
      if(scopeObj.isUsername === true){
        scopeObj.presenter.createUsernamePolicy(request);
      }
      else {
        scopeObj.presenter.createPasswordPolicy(request);
      }
      }
      scopeObj.view.forceLayout();
    };
    this.view.customersPolicies.lblEditIconUsername.onTouchStart = function(){
      scopeObj.isUsername = true; 
      scopeObj.updateRules = true;
      scopeObj.directEdit = true;
      scopeObj.view.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.USERNAMEMUSTCONTAIN");
      scopeObj.view.forceLayout();
      scopeObj.presenter.getUsernameRules();
    };
    this.view.customersPolicies.lblEditIconPassword.onTouchStart = function(){
      scopeObj.isUsername = false;  
      scopeObj.updateRules = true;
      scopeObj.directEdit = true;
      scopeObj.view.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.lengthOfPassword");
      scopeObj.view.forceLayout();
      scopeObj.presenter.getPasswordRules();
    };
    this.view.internalUserPolicies.lblEditIconPassword.onTouchStart = function(){
      scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.editPasswordPolicies");
       scopeObj.view.flxSpecialCharacters.isVisible = false;
       scopeObj.view.flxErrorMessage.isVisible = false; 
       scopeObj.view.flxErrorConsecutive.isVisible = false;
       scopeObj.view.flxPasswordAdditionalRules.isVisible = true;
       scopeObj.view.flxPolicies.isVisible = false;
       scopeObj.view.flxBreadcrumb.setVisibility(true);
       scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPolicies");
       scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
       scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
       scopeObj.view.imgUppercaseCharacters.src = "checkboxselected.png";
       scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = "4";
       scopeObj.view.flxPoliciesParentRulesView.isVisible = false;
       scopeObj.view.flxPoliciesEdit.isVisible = true;
       scopeObj.view.MinCharacters.tbxcharcterSize.text = "8";
       scopeObj.view.MinCharacters.flxPlusDisable.isVisible = true;
       scopeObj.view.MaxCharacters.tbxcharcterSize.text = "64";
       scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = true;
       scopeObj.view.forceLayout();
    };
    this.view.policiesRulesView.lblIconOption1.onTouchStart = function(){
      scopeObj.updateRules = true;
      scopeObj.directEdit = false;
      scopeObj.view.flxErrorMessage.isVisible = false; 
      scopeObj.view.flxErrorConsecutive.isVisible = false;
      scopeObj.view.flxBreadcrumb.setVisibility(true);
      if(scopeObj.isUsername === true){
        scopeObj.view.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.USERNAMEMUSTCONTAIN");
        scopeObj.view.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.policyConfiguration");
        scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.editUsernamePolicies");
        scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.usernamePolicies");
        scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
        scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
      }
      else{
        scopeObj.view.lblLengthOfPassword.text = kony.i18n.getLocalizedString("i18n.frmPolicies.lengthOfPassword");
        scopeObj.view.lblPoliciesRuleName.text = kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPoliciesForCustomers");
        scopeObj.view.breadcrumbs.lblCurrentScreen.text =kony.i18n.getLocalizedString("i18n.frmPolicies.passwordPolicies");
        scopeObj.view.breadcrumbs.fontIconBreadcrumbsRight2.isVisible = true;
        scopeObj.view.mainHeader.lblHeading.text=kony.i18n.getLocalizedString("i18n.frmPolicies.editPasswordPolicies");
        scopeObj.view.breadcrumbs.lblCurrentScreen.isVisible = true;
      }
      if(scopeObj.isUsername === true){
        scopeObj.view.flxSpecialCharacters.isVisible = true;
        if(scopeObj.view.policiesRulesView.lblSpecialCharsValue.text === "Yes"){
         scopeObj.view.imgYes.src = "radio_selected.png";
         scopeObj.view.imgNo.src = "radio_notselected.png";
       }
       else{
         scopeObj.view.imgNo.src = "radio_selected.png";
         scopeObj.view.imgYes.src = "radio_notselected.png";
       }
        scopeObj.view.flxPasswordAdditionalRules.isVisible = false;
      }
      else{
        scopeObj.view.flxSpecialCharacters.isVisible = false;
        scopeObj.view.flxPasswordAdditionalRules.isVisible = true;
        
        var selectedOptionsValueText = scopeObj.view.policiesRulesView.lblSelectedOptionsValue.text;
        if(selectedOptionsValueText.includes("Special characters")) {
          selectedOptionsValueText = selectedOptionsValueText.slice(0,-16);
        }
        var res = selectedOptionsValueText.split(",");
        if(res.indexOf("Lowercase letters") !== -1){
          scopeObj.view.imgLowercaseCharacters.src = "checkboxselected.png";
        }
        if(res.indexOf("Uppercase letters") !== -1){
          scopeObj.view.imgUppercaseCharacters.src = "checkboxselected.png";
        }
        if(res.indexOf("Number") !== -1){
          scopeObj.view.imgNumbers.src = "checkboxselected.png";
        }
        if(res.indexOf("Special characters") !== -1){
          scopeObj.view.imgSpecialChars.src = "checkboxselected.png";
        }
        if(scopeObj.view.policiesRulesView.lblMaxConsecutiveRepetitionValue.text === "No restriction"){
          scopeObj.view.imgNoRepetition.src = "checkboxselected.png";
          scopeObj.view.maxConsecutiveChars.isVisible = false;
          scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = 4;
        }
        else{
          scopeObj.view.imgNoRepetition.src = "checkbox.png";
          scopeObj.view.maxConsecutiveChars.isVisible = true;
          scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = scopeObj.view.policiesRulesView.lblMaxConsecutiveRepetitionValue.text;
          if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text)=== 1){
            scopeObj.view.maxConsecutiveChars.flxPlusDisable.isVisible = true;
          }
          else{
            scopeObj.view.maxConsecutiveChars.flxPlusDisable.isVisible = false;
          }
          if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text)=== 9){
            scopeObj.view.maxConsecutiveChars.flxMinusDisable.isVisible = true;
          }
          else{
            scopeObj.view.maxConsecutiveChars.flxMinusDisable.isVisible = false;
          }
        }
      }
      scopeObj.view.flxPoliciesParentRulesView.isVisible = false;
      scopeObj.view.flxPoliciesEdit.isVisible = true;
      scopeObj.view.MinCharacters.tbxcharcterSize.text = scopeObj.view.policiesRulesView.lblMinNumberCharsValue.text;
      scopeObj.view.MaxCharacters.tbxcharcterSize.text = scopeObj.view.policiesRulesView.lblMaxNumberCharsValue.text;
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) === 8){
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) === 64){
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = true;
      }
      else if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) >= parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text)){
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === 64){
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = false;
      }
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) === 8){
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = true;
      }
      else if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) >= parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text)){
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = true;
      }
      else{
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = false;
      }
      scopeObj.view.flxBreadcrumb.setVisibility(true);
      scopeObj.view.breadcrumbs.isVisible = true;
      scopeObj.view.forceLayout();
    };
    this.view.MinCharacters.flxPlus.onTouchStart = function(){
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) > 8){
        scopeObj.view.MinCharacters.tbxcharcterSize.text = parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) - 1;
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = false;
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MinCharacters.flxMinus.onTouchStart = function(){
      if(parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text) < 64){
        scopeObj.view.MinCharacters.tbxcharcterSize.text = parseInt(scopeObj.view.MinCharacters.tbxcharcterSize.text)+ 1;
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = false;
        scopeObj.view.MinCharacters.flxPlusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MinCharacters.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MaxCharacters.flxPlus.onTouchStart = function(){
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text)> 8){
        scopeObj.view.MaxCharacters.tbxcharcterSize.text = parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) -1;
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = false;
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.MaxCharacters.flxMinus.onTouchStart = function(){
      if(parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) < 64){
        scopeObj.view.MaxCharacters.tbxcharcterSize.text = parseInt(scopeObj.view.MaxCharacters.tbxcharcterSize.text) + 1;
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = false;
        scopeObj.view.MaxCharacters.flxPlusDisable.isVisible = false;
      }
      else{
        scopeObj.view.MaxCharacters.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.imgUppercaseCharacters.onTouchStart = function(){
      if(scopeObj.view.imgUppercaseCharacters.src === "checkbox.png"){
        scopeObj.view.imgUppercaseCharacters.src = "checkboxselected.png";
      }
      else{
        scopeObj.view.imgUppercaseCharacters.src = "checkbox.png";
      }
      scopeObj.atLeastOneOptionPasswordRules();
      scopeObj.view.forceLayout();
    };
    this.view.imgLowercaseCharacters.onTouchStart = function(){
      if(scopeObj.view.imgLowercaseCharacters.src === "checkbox.png"){
        scopeObj.view.imgLowercaseCharacters.src = "checkboxselected.png";
      }
      else{
        scopeObj.view.imgLowercaseCharacters.src = "checkbox.png";
      }
      scopeObj.atLeastOneOptionPasswordRules();
      scopeObj.view.forceLayout();
    };
    this.view.imgNumbers.onTouchStart = function(){
      if(scopeObj.view.imgNumbers.src === "checkbox.png"){
        scopeObj.view.imgNumbers.src = "checkboxselected.png";
      }
      else{
        scopeObj.view.imgNumbers.src = "checkbox.png";
      }
       scopeObj.atLeastOneOptionPasswordRules();
      scopeObj.view.forceLayout();
    };
    this.view.imgSpecialChars.onTouchStart = function(){
      if(scopeObj.view.imgSpecialChars.src === "checkbox.png"){
        scopeObj.view.imgSpecialChars.src = "checkboxselected.png";
      }
      else{
        scopeObj.view.imgSpecialChars.src = "checkbox.png";
      }
      scopeObj.atLeastOneOptionPasswordRules();
      scopeObj.view.forceLayout();
    };
    this.view.imgNoRepetition.onTouchStart = function(){
      if(scopeObj.view.imgNoRepetition.src === "checkbox.png"){
        scopeObj.view.imgNoRepetition.src = "checkboxselected.png";
        scopeObj.view.maxConsecutiveChars.isVisible = false;
      }
      else{
        scopeObj.view.imgNoRepetition.src = "checkbox.png";
        scopeObj.view.maxConsecutiveChars.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.maxConsecutiveChars.flxMinus.onTouchStart = function(){
       if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) < 9){
        scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) + 1;
        scopeObj.view.maxConsecutiveChars.flxMinusDisable.isVisible = false;
        scopeObj.view.maxConsecutiveChars.flxPlusDisable.isVisible = false;
      }
      else{
        scopeObj.view.maxConsecutiveChars.flxMinusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
    this.view.maxConsecutiveChars.flxPlus.onTouchStart = function(){
    if(parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) > 1){
        scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text = parseInt(scopeObj.view.maxConsecutiveChars.tbxcharcterSize.text) - 1;
        scopeObj.view.maxConsecutiveChars.flxPlusDisable.isVisible = false;
        scopeObj.view.maxConsecutiveChars.flxMinusDisable.isVisible = false;
      }
      else{
        scopeObj.view.maxConsecutiveChars.flxPlusDisable.isVisible = true;
      }
      scopeObj.view.forceLayout();
    };
  },
  atLeastOneOptionPasswordRules : function(){
    if(this.view.imgUppercaseCharacters.src === "checkbox.png" &&this.view.imgSpecialChars.src === "checkbox.png" &&
      this.view.imgNumbers.src === "checkbox.png" && this.view.imgLowercaseCharacters.src === "checkbox.png"){
      this.view.lblNoValueErrorIcon.isVisible = true;
      this.view.lblSelectedOptions.skin = "sknlbl13latoRegularB2BDCBRed";
    }
    else{
      this.view.lblNoValueErrorIcon.isVisible = false;
      this.view.lblSelectedOptions.skin = "sknlblLatoRegularB2BDCB";
    }
  },
 fetchLanguageByLocale: function(locale){
    for (var i = 0; i < this.localeData.locale.length; i++){
      if (this.localeData.locale[i].code == locale){
        return this.localeData.locale[i].language;
     }
    }
  },
  
  setPoliciesSegData: function(response){
    var dataMap={
      "flxPolicyDescription": "flxPolicyDescription",
      "flxLanguage": "flxLanguage",
      "lblEdit": "lblEdit",
      "flxEdit":"flxEdit",
      "lblLanguage": "lblLanguage",
      "lblDelete": "lblDelete",
      "flxDelete": "flxDelete",
      "lblLanguageDescription": "lblLanguageDescription",
      "lblSeperator": "lblSeperator"
    };
    var data;
    var self = this;
        if (typeof response !== 'undefined') {
      data = response.map(function(response) {
        return {
          "flxPolicyDescription": {"isVisible": true},
          "flxLanguage": "flxLanguage",
          "flxEdit": {"onClick": function(){self.editPolicyDescription(response.locale);}},
          "lblLanguage": self.fetchLanguageByLocale(response.locale).toUpperCase(),
          "lblEdit": "",
          "lblDelete":"",
          "flxDelete":{"onClick": function(){self.deletePolicyDescription(response.locale);}},
          "lblLanguageDescription": response.content,
          "lblSeperator": "-"
         };       
      });
    }
    this.view.segPolicyDescriptions.widgetDataMap=dataMap;
    this.view.segPolicyDescriptions.setData(data);
    this.view.forceLayout();
  },
  deletePolicyDescription: function(locale){
    var selectedIndex = this.view.segPolicyDescriptions.selectedRowIndex[1];
    var currentData = this.view.segPolicyDescriptions.data[selectedIndex];
    var request = {"localeCode" : locale};
    if(this.isUsername === true){
      this.presenter.deleteUsernamePolicy(request);
    }
    else{
      this.presenter.deletePasswordPolicy(request);
    }
  },
  editPolicyDescription: function(locale){
    this.view.flxErrorLanguage.isVisible = false;
    this.view.flxAddNewPolicyDescription.isVisible = true;
    var selectedIndex = this.view.segPolicyDescriptions.selectedRowIndex[1];
    this.currentData = this.view.segPolicyDescriptions.data[selectedIndex];
    var tncEditorDocument = document.getElementById("iframe_rtxTnC").contentWindow.document;
    tncEditorDocument.getElementById("editor").innerHTML=this.view.segPolicyDescriptions.data[selectedIndex].lblLanguageDescription;
    var list = this.localeData.locale;
    var attributeList = [[locale, this.camelize(this.view.segPolicyDescriptions.data[selectedIndex].lblLanguage.toLowerCase())]];
    this.view.lstDropDown.masterData = attributeList;
    this.view.btnAddNew.isVisible = false;
    this.view.forceLayout();
    this.view.btnSave.text = kony.i18n.getLocalizedString("i18n.frmOutageMessageController.UPDATE");
    this.view.segPolicyDescriptions.removeAt(selectedIndex);
    this.policyUpdate = true;
    this.view.forceLayout();
  }
});

define({ 

  //Type your controller code here 

  willUpdateUI: function (context) {
    this.updateLeftMenu(context);
    if(context.value) {

    } else if (context.LoadingScreen) {
      if (context.LoadingScreen.focus)
        kony.adminConsole.utils.showProgressBar(this.view);
      else
        kony.adminConsole.utils.hideProgressBar(this.view);
    } else if (context.OnlineBankingLogin) {
      this.view.CSRAssist.onlineBankingLogin(context.OnlineBankingLogin, this);
    }
    if (Array.isArray(context.eligibilityCriteria)) {
      this.eligibilityCriteriaMasterData = context.eligibilityCriteria
        .filter(function (ec) {
        return ec.Status_id === 'SID_ACTIVE';
      })
        .map(function (ec) {
        return {
          text: ec.Description,
          status: ec.Status_id === 'SID_ACTIVE' ? 'Active' : 'InActive',
          id: ec.id
        };
      });
      this.setEligibilityCriteria(this.eligibilityCriteriaMasterData);
      this.view.flxOnboarding.setVisibility(true);
      this.isOnboardingCriteriaDisabled = false;
      this.view.radioNoEligibilityMatches.masterData = [['1', '']];
      this.view.radioNoEligibilityMatches.selectedKey = null;
      this.currentSelectedCriteria = null;
      this.hideEligibilityErrorWidgets();
    }
    this.view.forceLayout();
  },
  setFlowActions: function () {
    //New Customer Flow actions
    var scopeObj = this;

    this.view.btnonBoarding.onClick = function() {
      scopeObj.presenter.showEligibilityCriteria();
    };
    this.view.lblOnBoardingPopupClose.onClick = function () {
      scopeObj.view.flxOnboarding.setVisibility(false);
    };
    this.view.btnOnBoardingCancel.onClick = function () {
      scopeObj.view.flxOnboarding.setVisibility(false);
    };
    this.view.btnContinueOnBoarding.onClick = function () {
      if (scopeObj.currentSelectedCriteria && !scopeObj.isOnboardingCriteriaDisabled) {
        scopeObj.view.flxOnboarding.setVisibility(false);
        scopeObj.presenter.showAssistedOnboarding(scopeObj.currentSelectedCriteria.id);
      } else if (scopeObj.view.btnContinueOnBoarding.text === kony.i18n.getLocalizedString("i18n.frmCustomerManagement.close_popup")) {
        scopeObj.view.flxOnboarding.setVisibility(false);
      } else {
        scopeObj.updateOnboardErrorMsg();
      };
    };
    
    this.view.breadcrumbs.btnBackToMain.onClick = function() {
      scopeObj.showCustomerManagementSearchScreen();
      scopeObj.view.forceLayout();
    };
    this.view.btnAppply.onClick = function() {
      var selectedType = scopeObj.view.listBoxLoanTypes.selectedKey;
      scopeObj.onClickOfApplyButton(selectedType);
    };
    this.view.flxLearnMore.onClick = function() {
      var selectedType = scopeObj.view.listBoxLoanTypes.selectedKey;
      scopeObj.onClickOfLearnMore(selectedType);
    };
    var setNoEligibilityCriteriaMatches = function () {
      scopeObj.isOnboardingCriteriaDisabled = true;
      scopeObj.view.radioNoEligibilityMatches.selectedKey = '1';
      scopeObj.currentSelectedCriteria = null;
      scopeObj.setEligibilityCriteria(scopeObj.eligibilityCriteriaMasterData);
      scopeObj.updateOnboardErrorMsg();
      scopeObj.view.forceLayout();
    };
	

    this.view.flxNoEligibilityCriteriaMatches.onClick = setNoEligibilityCriteriaMatches;
    this.view.radioNoEligibilityMatches.onSelection = setNoEligibilityCriteriaMatches;
  },
  newCustomerPreshow : function(){
    this.setFlowActions();
    this.view.flxDetails.setVisibility(true);
    this.view.flxOnboarding.setVisibility(false);
    this.view.CSRAssist.setVisibility(false);
    this.view.breadcrumbs.lblCurrentScreen.text = kony.i18n.getLocalizedString("i18n.frmNewCustomer.leadTag").toUpperCase();
    this.view.mainHeader.lblUserName.text = kony.mvc.MDAApplication.getSharedInstance().appContext.userName;
    if(!(this.view.flxLoans.isVisible)) {
      this.view.flxOnBoardingInner.right = "0px";
      this.view.flxOnBoardingInner.left = "35px";
    }
    this.view.forceLayout();
  },
  setEligibilityCriteria: function (ecs) {
    if(ecs.length>4)
      this.view.flxOnBoardingEligibility.height="178dp";
    else
      this.view.flxOnBoardingEligibility.height="189dp";
    var statusToIcons = {
      Active: {
        text: '',
        skin: 'lblIconGrey14px'
      },
      InActive: {
        text: '',
        skin: 'lblIconGrey14px'
      },
      Selected: {
        text: '',
        skin: 'lblIconGreen'
      },

    };
    var statusForSkin = {
      Active: 'sknTextDarkGreyLightBold',
      InActive: 'sknTextDarkGreyLightBoldDisabled',
    };
    var self = this;
    var onRowClickFor = function (criteria) {
      return function () {
        if (criteria.status === 'Active') {
          self.currentSelectedCriteria = criteria;
          self.isOnboardingCriteriaDisabled = false;
          self.updateOnboardErrorMsg();
          self.view.radioNoEligibilityMatches.selectedKey = null;
          self.setEligibilityCriteria(ecs.map(function (oc) {
            if (criteria === oc) {
              return Object.assign({}, oc, { isSelected: true });
            } else {
              return Object.assign({}, oc, { isSelected: false });
            }
          }));
        }
      };
    };
    var segmentDate = ecs.map(function (criteria) {
      return {
        lblEligibilityCriteria: {
          text: criteria.text,
          skin: statusForSkin[criteria.status]
        },
        radioBtn: {
          masterData: [['1', '']],
          selectedKey: criteria.isSelected ? '1' : null,
          onSelection: onRowClickFor(criteria)
        },
        onClick: onRowClickFor(criteria)
      };
    });
    this.view.segOnBoardingPopup.setData(segmentDate);
    this.view.forceLayout();
  },
  showEligibilityErrorWidgets: function () {
    this.view.lblOnBoardingErrorIcon.setVisibility(true);
    this.view.lblOnBoardingErrorMsg.setVisibility(true);
  },
  hideEligibilityErrorWidgets: function () {
    this.view.lblOnBoardingErrorIcon.setVisibility(false);
    this.view.lblOnBoardingErrorMsg.setVisibility(false);
  },
  updateOnboardErrorMsg: function () {
    var errorlblSkin = 'sknTextRedSmall';
    var successlblSkin = 'sknTextGreenSmall';
    var errorIconSkin = 'sknErrorIconBig';
    var succussIconSkin = 'sknSuccessIconBig';
    if (this.isOnboardingCriteriaDisabled) {
      this.view.lblOnBoardingErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.customer_not_eligible");
      this.view.lblOnBoardingErrorMsg.skin = errorlblSkin;
      this.view.lblOnBoardingErrorIcon.text = '';
      this.view.lblOnBoardingErrorIcon.skin = errorIconSkin;
      this.view.btnContinueOnBoarding.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.close_popup");
      this.view.btnOnBoardingCancel.setVisibility(false);
      this.showEligibilityErrorWidgets();
    } else if (this.currentSelectedCriteria === null) {
      this.view.lblOnBoardingErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.please_select_one_criteria");
      this.view.lblOnBoardingErrorMsg.skin = errorlblSkin;
      this.view.lblOnBoardingErrorIcon.text = '';
      this.view.lblOnBoardingErrorIcon.skin = errorIconSkin;
      this.view.btnContinueOnBoarding.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.continue_onboarding");
      this.view.btnOnBoardingCancel.setVisibility(true);
      this.showEligibilityErrorWidgets();
    } else {
      this.view.lblOnBoardingErrorMsg.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.customer_is_eligible");
      this.view.lblOnBoardingErrorMsg.skin = successlblSkin;
      this.view.lblOnBoardingErrorIcon.text = '';
      this.view.lblOnBoardingErrorIcon.skin = succussIconSkin;
      this.view.btnContinueOnBoarding.text = kony.i18n.getLocalizedString("i18n.frmCustomerManagement.continue_onboarding");
      this.view.btnOnBoardingCancel.setVisibility(true);
      this.showEligibilityErrorWidgets();
    }
    this.view.forceLayout();
  },
  onClickOfApplyButton : function(selectedType) {
    var scopeObj = this;
    var data = {
      "currentAction" : "CREATE_APPLICANT"
    };
    if(selectedType == "PERSONAL_LOAN"){
      data["Loan_Type"] = "PersonalLoan";
      scopeObj.presenter.authorizeCSRAssist(data);
    }else if(selectedType == "VEHICLE_LOAN"){
      data["Loan_Type"] = "VehicleLoan";
      scopeObj.presenter.authorizeCSRAssist(data);
    }else {
      data["Loan_Type"] = "CreditCard";
      scopeObj.presenter.authorizeCSRAssist(data);
    }
  },
  onClickOfLearnMore : function(selectedType) {
    var scopeObj = this;
    var data = {
      "currentAction" : "CREATE_APPLICANT"
    };
    if(selectedType == "PERSONAL_LOAN"){
      data["Loan_Type"] = "LEARN_PERSONAL_LOAN";
      scopeObj.presenter.authorizeCSRAssist(data);
    }else if(selectedType == "VEHICLE_LOAN"){
      data["Loan_Type"] = "LEARN_VEHICLE_LOAN";
      scopeObj.presenter.authorizeCSRAssist(data);
    }else {
      data["Loan_Type"] = "LEARN_CREDIT_LOAN";
      scopeObj.presenter.authorizeCSRAssist(data);
    }
  },
  showCustomerManagementSearchScreen: function () {
    this.presenter.getSearchInputs();
  }

});
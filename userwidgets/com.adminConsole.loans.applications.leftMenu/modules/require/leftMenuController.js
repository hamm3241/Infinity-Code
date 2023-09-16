define(function() {

  return {
    
    incomeSourceMasterData: {
      "values": "",
      "selectedKeys": ""
    },
    

    maxCharacterLimit: {
      "txtName": 35,
      "txtMiddleName": 35,
      "txtLastName": 35,
      "txtEmailAddress": 70,
      "txtDLNumber": 70,
      "txtAddressLine1": 40,
      "txtAddressLine2": 40,
      "txtAddressLine1Previous": 40,
      "txtAddressLine2Previous": 40,
      "txtNameOfTheEmployer": 35,
      "txtPresentEmployerAddressLine1": 40,
      "txtPresentEmployerAddressLine2": 40,
      "txtPresentTitleGrade": 70,
      "tbxPreviousEmployerName": 35,
      "txtPreviousAddressOne": 40,
      "txtPreviousAddressTwo": 40,
    },

    getMaxCharacterLimit: function(key) {
      return this.maxCharacterLimit[key];
    },

    vehicleLoanApplicationTemplatePreShow: function() {
      var scopeObj = this;

      scopeObj.view.lblFirstNameSize.isVisible = false;
      scopeObj.view.lblMiddleNameSize.setVisibility(false);
      scopeObj.view.lblLastNameSize.setVisibility(false);
      scopeObj.view.lblEmailSize.setVisibility(false);
      scopeObj.view.lblDLSize.setVisibility(false);
      scopeObj.view.lblAddrLine1Size.setVisibility(false);
      scopeObj.view.lblAddreLine2Size.setVisibility(false);
      scopeObj.view.lblAddrLine1PreviousSize.setVisibility(false);
      scopeObj.view.lblAddrLine2PreviousSize.setVisibility(false);
      scopeObj.view.lblNameOfEmployerSize.setVisibility(false);
      scopeObj.view.lblPresentEmployerAddrLine1Size.setVisibility(false);
      scopeObj.view.lblPresentEmployerAddrLine2Size.setVisibility(false);
      scopeObj.view.lblTitleSize.setVisibility(false);
      scopeObj.view.lblPreviousEmployerSize.setVisibility(false);
      scopeObj.view.lblPreviousAddressOneSize.setVisibility(false);
      scopeObj.view.lblPreviousAddressTwoSize.setVisibility(false);

      scopeObj.setFlowActions();
      this.setMaxCharactersForTextBoxes();
    },

    setFlowActions: function() {
      var scopeObj = this;
      scopeObj.view.lstEmploymentBasedIncome.onSelection = function(eventobject) {
        scopeObj.populateQuestionsBasedOnIncome(eventobject.selectedKey);
      };
      scopeObj.view.rbgIsPreviouslyEmployed.onSelection = function(eventobject) {
        scopeObj.checkToShowPreviousEmployment(eventobject.selectedKey);
      };
      scopeObj.view.rbgYears.onSelection = function(eventobject) {
        if (scopeObj.view.rbgYears.selectedKey == "rbg2") {
          scopeObj.view.flxAddress2.isVisible = true;
        } else {
          scopeObj.view.flxAddress2.isVisible = false;
        }
      };
    },

    widgetEventForApplications: function(eventobject, jsonForValidation, sizeLabel) {
      var scopeObj = this;
      eventobject.skin = jsonForValidation[eventobject.id].normalSkin;
      scopeObj.view[jsonForValidation[eventobject.id].errorLabel].setVisibility(false);
      if (eventobject.wType && eventobject.wType == "TextField") {
        var errorLabel = jsonForValidation[eventobject.id].errorLabel;
        scopeObj.view[errorLabel].text = jsonForValidation[eventobject.id].errorMessageValid;
        scopeObj.view[errorLabel].setVisibility(false);
        if (eventobject.text.trim() === "") {
          jsonForValidation[eventobject.id].isValidated = false;
          jsonForValidation[eventobject.id].isDatavalidated = true;
        } else {
          jsonForValidation[eventobject.id].isValidated = true;
          if (eventobject.id == "textBoxAmountRequested") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9]{10}$/, eventobject.text);
            if (eventobject.text && eventobject.text.trim() !== "") {
              var loanAmount = parseInt(eventobject.text, 10);
              if (loanAmount >= jsonForValidation[eventobject.id].minAmount && loanAmount <= jsonForValidation[eventobject.id].maxAmount) {
                jsonForValidation[eventobject.id].isDatavalidated = true;
              } else {
                jsonForValidation[eventobject.id].isDatavalidated = false;
              }
            }
          } else if (eventobject.id == "txtPreviousIncome" || eventobject.id == "txtPresentMonthlySalary" || eventobject.id == "txtHousingRent" || eventobject.id == "txtYearSpentPreviousCoA") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9]+$/, eventobject.text);
          } else if (eventobject.id == "txtHomePhoneNumber" || eventobject.id == "txtBusinessPhone" || eventobject.id == "txtCellPhone" || eventobject.id == "txtHomePhoneNumberCoA" || eventobject.id == "txtBusinessPhoneCoA" || eventobject.id == "txtCellPhoneCoA") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9]{10}$/, eventobject.text);
          } else if (eventobject.id == "txtSSN" || eventobject.id == "txtSSNCoA") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9]{10}$/, eventobject.text);
          } else if (eventobject.id == "txtEmailAddress" || eventobject.id == "txtEmailAddressCoA") {
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(emailRegex, eventobject.text);
          } else if (eventobject.id == "txtPreviousCity" || eventobject.id == "tbxPreviousEmployerName" || eventobject.id == "txtPreviousDesignation" || eventobject.id == "txtNameOfTheEmployer" || eventobject.id == "txtPresentEmploymentCity" || eventobject.id == "txtBussinessName" || eventobject.id == "txtPresentTitleGrade" || eventobject.id == "txtName" || eventobject.id == "txtLastName" || eventobject.id == "txtNameCoA" || eventobject.id == "txtMiddleNameCoA" || eventobject.id == "txtLastNameCoA" || eventobject.id == "txtMiddleName" || eventobject.id == "txtAddress1CityCoA" || eventobject.id == "txtAddressCityPreviousCoA" || eventobject.id == "txtAddress1City") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[a-zA-Z\s]+$/, eventobject.text);
          } else if (eventobject.id == "txtPreviousAddressTwo" || eventobject.id == "txtPreviousAddressOne" || eventobject.id == "txtPresentEmployerAddressLine1" || eventobject.id == "txtPresentEmployerAddressLine2" || eventobject.id == "txtAddressLine1" || eventobject.id == "txtAddressLine2" || eventobject.id == "txtAddressLine1Previous" || eventobject.id == "txtAddressLine2Previous" || eventobject.id == "txtAddressLine1CoA" || eventobject.id == "txtAddressLine2CoA" || eventobject.id == "txtAddressLine1PreviousCoA" || eventobject.id == "txtAddressLine2PreviousCoA") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9a-zA-Z_#,\.\-\s\/]+$/, eventobject.text);
          } else if (eventobject.id == "txtPreviousZipCode" || eventobject.id == "txtPresentZipCode" || eventobject.id == "txtAddress1ZipCode" || eventobject.id == "txtAddressZipCodePrevious" || eventobject.id == "txtAddress1ZipCodeCoA" || eventobject.id == "txtAddressZipCodePreviousCoA") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9]{5}$/, eventobject.text);
          } else if (eventobject.id == "txtDLNumberCoA" || eventobject.id == "txtDLNumber") {
            jsonForValidation[eventobject.id].isDatavalidated = scopeObj.checkRegex(/^[0-9a-zA-Z]{8}$/, eventobject.text);
          }
        }
      } else if (eventobject.wType && eventobject.wType == "ListBox") {
        if (eventobject.selectedKey && (eventobject.selectedKey).toLowerCase() == "select") {
          jsonForValidation[eventobject.id].isValidated = false;
        } else {
          jsonForValidation[eventobject.id].isValidated = true;
        }
      } else if (eventobject.wType && eventobject.wType == "RadioButtonGroup") {
        jsonForValidation[eventobject.id].isValidated = true;
      }
      if (sizeLabel) {
        sizeLabel.text = eventobject.text.length + "/" + scopeObj.getMaxCharacterLimit(eventobject.id);
      }
    },

    setMaxCharactersForTextBoxes: function() {
      var scopeObj = this;
      Object.keys(scopeObj.maxCharacterLimit).forEach(function(key) {
        scopeObj.view[key].maxTextLength = scopeObj.getMaxCharacterLimit(key);
      });
    },

    checkAndShowErrorMessage: function(eventObject, jsonForValidation) {
      if (jsonForValidation[eventObject.id].isDatavalidated === false) {
        var scopeObj = this;
        var errorLabel = jsonForValidation[eventObject.id].errorLabel;
        scopeObj.view[errorLabel].text = jsonForValidation[eventObject.id].errorMessageValid;
        scopeObj.view[eventObject.id].skin = jsonForValidation[eventObject.id].skin;
        scopeObj.view[errorLabel].setVisibility(true);
        scopeObj.view.forceLayout();
      }
    },

    checkRegex: function(regex, input) {
      if (regex.test(input)) {
        return true;
      } else {
        return false;
      }
    },
    
    checkToShowPreviousEmployment: function(selectedKey) {
      var scopeObj = this;
      if (selectedKey.toLowerCase() == "yes") {
        scopeObj.view.flxPreviousEmployement.setVisibility(true);
      } else {
        scopeObj.view.flxPreviousEmployement.setVisibility(false);
      }
      //     scopeObj.populateQuestionsBasedOnIncome(scopeObj.view.lstEmploymentBasedIncome.selectedKey);
    },

    populateQuestionsBasedOnIncome: function(selectedKey) {
      var scopeObj = this;
      scopeObj.view.flxFirstAddIncome.setVisibility(false);
      scopeObj.view.flxPreviousEmployement.setVisibility(false);
      scopeObj.view.flxPresentEmployement.setVisibility(false);
      if (selectedKey == "EMP_TYPE_1") {
        scopeObj.view.lblPresentEmploymentDetails.text = "EMPLOYMENT - " + (selectedKey).toUpperCase();
        scopeObj.view.lblPresntEmploymentTitle.text = "Present Employment Details";
        scopeObj.view.flxPresentEmployement.setVisibility(true);
      } else if (selectedKey == "EMP_TYPE_5") {
        scopeObj.view.flxFirstAddIncome.setVisibility(true);
      }
      //     var questionsToShow=kony.adminConsole.loans.IncomeBasedQuestions[selectedKey];
      //     Object.keys(questionsToShow).forEach(function(key) {
      //       scopeObj.view[key].setVisibility(questionsToShow[key]);
      //     });
    },
    populateQuestionsBasedOnFirstAddIncome: function(selectedKey) {
      var scopeObj = this;
      scopeObj.view.lblFirstAddIncomeTitle.text = "INCOME SOURCE - " + (selectedKey).toUpperCase();
      scopeObj.view.lblFirstaddIncomeHeading.text = selectedKey + " Details";
      var questionsToShow = kony.adminConsole.loans.firstAdditionalIncomeBasedQuestions[selectedKey];
      Object.keys(questionsToShow).forEach(function(key) {
        scopeObj.view[key].setVisibility(questionsToShow[key]);
      });
    },
    populateQuestionsBasedOnSecondAddIncome: function(selectedKey) {
      var scopeObj = this;
      scopeObj.view.lblSecondAddIncomeTitle.text = "INCOME SOURCE - " + (selectedKey).toUpperCase();
      scopeObj.view.lblSecondAddIncomeHeading.text = selectedKey + " Details";
      var questionsToShow = kony.adminConsole.loans.secondAdditionalIncomeBasedQuestions[selectedKey];
      Object.keys(questionsToShow).forEach(function(key) {
        scopeObj.view[key].setVisibility(questionsToShow[key]);
      });
    },
    loanInforadioCOborroweSelction: function() {
      if (this.view.rbgResponseCoApplicant.selectedKey != "Individual") {
        this.view.flxLoanAmountNPurpose.isVisible = true;
        this.view.textBoxAmountRequested.isVisible = true;
        this.view.flxApplicantDetailsSection.isVisible = true;
        this.view.flxCoApplicantDetailsSection.isVisible = true;
        this.view.forceLayout();
      } else {
        this.view.flxLoanAmountNPurpose.isVisible = true;
        this.view.textBoxAmountRequested.isVisible = true;
        this.view.flxApplicantDetailsSection.isVisible = true;
        this.view.flxCoApplicantDetailsSection.isVisible = false;
        this.view.forceLayout();
      }
    },
    onClickOfAddNewIncome: function() {
      var self = this;
      self.view.flxProvideIncomeIfAny.setVisibility(false);
      self.view.flxAddIncomeFirst.setVisibility(true);
  	},
    onClickOfAddMoreFirst: function() {
      var self = this;
      self.view.flxAddMoreFirst.setVisibility(false);
      self.view.flxAddIncomeSecond.setVisibility(true);
      self.view.flxAddMoreSecond.setVisibility(true);
    },
    onClickOfAddMoreSecond: function() {
      var self = this;
      self.view.flxAddMoreSecond.setVisibility(false);
      self.view.flxAddIncomeThird.setVisibility(true);
      self.view.flxAddMoreThird.setVisibility(true);
    },
    onClickOfAddMoreThird: function() {
      var self = this;
      self.view.flxAddMoreThird.setVisibility(false);
      self.view.flxAddIncomeFourth.setVisibility(true);
      self.view.flxAddMoreFourth.setVisibility(true);
    },
    onClickOfAddMoreFourth: function() {
      var self = this;
      self.view.flxAddMoreFourth.setVisibility(false);
      self.view.flxAddIncomeFive.setVisibility(true);
      self.view.flxAddMoreFive.setVisibility(true);
    },
    onClickOfAddMoreFive: function() {
      var self = this;
      self.view.flxAddMoreFive.setVisibility(false);
      self.view.flxAddIncomeSix.setVisibility(true);
      self.view.flxAddMoreSix.setVisibility(true);
    },
    onClickOfAddMoreSix: function() {
      var self = this;
      self.view.flxAddMoreSix.setVisibility(false);
      self.view.flxAddIncomeSeven.setVisibility(true);
    },
    ondeleteFirstIncome: function() {
      var self = this;
      self.view.flxAddIncomeFirst.setVisibility(false);
    },
    ondeleteSecondIncome: function() {
      var self = this;
      self.view.flxAddIncomeSecond.setVisibility(false);
    },
    ondeleteThirdIncome: function() {
      var self = this;
      self.view.flxAddIncomeThird.setVisibility(false);
    },
    ondeleteFourthIncome: function() {
      var self = this;
      self.view.flxAddIncomeFourth.setVisibility(false);
    },
    ondeleteFiveIncome: function() {
      var self = this;
      self.view.flxAddIncomeFive.setVisibility(false);
    },
    ondeleteSixIncome: function() {
      var self = this;
      self.view.flxAddIncomeSix.setVisibility(false);
    },
    ondeleteSevenIncome: function() {
      var self = this;
      self.view.flxAddIncomeSeven.setVisibility(false);
    },
    getMasterDateFromListBox: function() {
      var self = this;
      var data = self.view.lstFirstIncomeType.masterData;
      incomeSourceMasterData.values = data;
    },
    setDataToListBox: function() {
      var masterData = incomeSourceMasterData.values;
      var newData = deleteSelectedDataFromMasterData(masterData);
      
    },
    deleteSelectedDataFromMasterData: function() {
      
    }
  };
});

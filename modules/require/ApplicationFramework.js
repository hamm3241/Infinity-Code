define([], function() {
  return {
    /**
         * Initializes a new application
         * @param {string} QueryDefinition_id - QueryDefinition_id for the new application
         * @param {string} sectionList - List of sections and options (usually fetched through the get on Query Definition)
         * @param {string} successCallback - success callback to execute
         * @param {string} errorCallback - error callback to execute
         */
    initializeNewApplication: function(QueryDefinition_id, sectionList, successCallback, errorCallback, questionResponseList) {
      this.QueryDefinition = {};
      this.QueryDefinition.id = QueryDefinition_id;
      this.QueryDefinition.QuerySection = sectionList;
      this.dependecyList = {};
      this.generateDependencyList(sectionList);
      this.currentSection = {};
      this.currentResponse = {
        "User_id": kony.store.getItem("Customer_id"),
        "Status_id": "PENDING",
        "QueryDefinition_id": QueryDefinition_id,
        "QuestionResponse": []
      };
      this.savedResponses = {};
      this.savedResponses.QuestionResponse = [];
      this.createNewApplication(this.currentResponse, successCallback, errorCallback);
    },
    /**
         * Initializes an existing application
         * @param {string} QueryDefinition_id - QueryDefinition_id for the new application
         * @param {string} sectionList - List of sections and options (usually fetched through the get on Query Definition)
         * @param {string} QueryResponse_id - Application Id to fetch responses for
         * @param {string} successCallback - success callback to execute
         * @param {string} errorCallback - error callback to execute
         */
    resumeApplication: function(QueryDefinition_id, sectionList, QueryResponse_id, successCallback, errorCallback) {
      this.businessController.fetchResponses(QueryResponse_id, this.fetchedPreviousResponses.bind(this, QueryDefinition_id, sectionList, QueryResponse_id, successCallback, errorCallback), errorCallback);
    },
    fetchedPreviousResponses: function(QueryDefinition_id, sectionList, QueryResponse_id, successCallback, errorCallback, response) {
      var responseList = response.records;
      this.QueryDefinition = {};
      this.QueryDefinition.id = QueryDefinition_id;
      this.QueryDefinition.QuerySection = sectionList;
      this.dependecyList = {};
      this.generateDependencyList(sectionList);
      this.currentSection = {};
      this.currentResponse = {
        "id": QueryResponse_id,
        "User_id": kony.store.getItem("Customer_id"),
        "Status_id": "PENDING",
        "QueryDefinition_id": QueryDefinition_id,
        "QuestionResponse": []
      };
      this.savedResponses = {
        "id": QueryResponse_id,
        "User_id": kony.store.getItem("Customer_id"),
        "Status_id": "PENDING",
        "QueryDefinition_id": QueryDefinition_id,
        "QuestionResponse": []
      };
      if (responseList && responseList.length) {
        this.savedResponses.QuestionResponse = responseList;
      }
      successCallback();
    },
    createNewApplication: function(request, successCallback, errorCallback) {
      this.businessController.submitResponses(request, this.storeQueryResponse_id.bind(this, successCallback), errorCallback);
    },
    storeQueryResponse_id: function(successCallback, response) {
      this.savedResponses = JSON.parse(JSON.stringify(response));
      this.currentResponse = JSON.parse(JSON.stringify(response));
      successCallback();
    },
    getSectionList: function() {
      var sectionsToReturn = [];
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        if (!this.QueryDefinition.QuerySection[i].isDisabled) {
          sectionsToReturn.push(this.QueryDefinition.QuerySection[i]);
        }
      }
      return sectionsToReturn;
    },
    /**
         * Enable a section
         * @param {Array} sectionsToEnable - Array of strings of section's friendlyname
         */
    enableSections: function(sectionsToEnable) {
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        for (var j = 0; j < sectionsToEnable.length; j++) {
          if (this.QueryDefinition.QuerySection[i].QuerySection_FriendlyName === sectionsToEnable[j]) {
            this.QueryDefinition.QuerySection[i].isDisabled = false;
          }
        }
      }
    },
    /**
         * Disable a section
         * @param {Array} sectionsToDisable - Array of strings of section's friendlyname
         */
    disableSections: function(sectionsToDisable) {
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        for (var j = 0; j < sectionsToDisable.length; j++) {
          if (this.QueryDefinition.QuerySection[i].QuerySection_FriendlyName === sectionsToDisable[j]) {
            this.QueryDefinition.QuerySection[i].isDisabled = true;
          }
        }
      }
    },
    /**
         * Gets the data for next section
         * @param {string} currentSection - QueryDefinition_id for the new application
         * @returns {Object|number} sectionData for next enabled section or false in case current section is the last
         */
    getNextSectionData: function(currentSection) {
      if (!currentSection && Object.keys(this.currentSection).length === 0) {
        this.currentSection = this.QueryDefinition.QuerySection[0];
        return this.currentSection;
      } else if (!currentSection) {
        currentSection = this.currentSection;
      }
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        if (this.QueryDefinition.QuerySection[i].QuerySection_FriendlyName === currentSection.QuerySection_FriendlyName && i != this.QueryDefinition.QuerySection.length - 1) {
          for (var j = i + 1; j < this.QueryDefinition.QuerySection.length; j++) {
            if (!this.QueryDefinition.QuerySection[j].isDisabled) {
              this.currentSection = this.QueryDefinition.QuerySection[j];
              return this.currentSection;
            }
            if (j === this.QueryDefinition.QuerySection.length - 1) {
              return false;
            }
          }
        }
        if (i === this.QueryDefinition.QuerySection.length - 1) {
          return false;
        }
      }
      return false;
    },
    /**		
         * Gets the data for previous section		
         * @param {string} currentSection - QueryDefinition_id for the new application		
         * @returns {Object|number} sectionData for next enabled section or false in case current section is the first		
         */
    getPreviousSectionData: function(currentSection) {
      if (!currentSection && Object.keys(this.currentSection).length === 0) {
        this.currentSection = this.QueryDefinition.QuerySection[0];
        return this.currentSection;
      } else if (!currentSection) {
        currentSection = this.currentSection;
      }
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        if (this.QueryDefinition.QuerySection[i].QuerySection_FriendlyName === currentSection.QuerySection_FriendlyName) {
          if (i === 0) {
            return false;
          }
          for (j = i - 1; j >= 0; j--) {
            if (!this.QueryDefinition.QuerySection[j].isDisabled) {
              this.currentSection = this.QueryDefinition.QuerySection[j];
              return this.currentSection;
            }
            if (j === 0) {
              return false;
            }
          }
        }
      }
      return false;
    },
    /**
         * Gets all previous responses by the user in the current application
         * @returns {Object|number} response data or false in case no previous data found
         */
    getPreviousResponses: function() {
      if (this.savedResponses && this.savedResponses.QuestionResponse && this.savedResponses.QuestionResponse.length > 0) {
        return this.savedResponses.QuestionResponse;
      } else {
        return false;
      }
    },
    /**
         * Gets the current section's data
         * @returns {Object} current section data
         */
    getCurrentSectionData: function() {
      return this.currentSection;
    },
    /**
         * Gets the current response
         * @returns {Object} current response
         */
    getCurrentResponse: function() {
      return this.currentResponse;
    },
    /**
         * Gets the screen mapped to the a section's friendly name defined in ApplicationScreenMapping.js
         * @param {string} sectionName - friendlyName for section to return screen for
         * @returns {string} screen name
         */
    getScreenForSection: function(sectionName) {
      var mapping = kony.dbx.loans.applicationScreenMapper.getMapping(this.QueryDefinition.id);
      return mapping[sectionName].screen;
    },
    getDelimiter: function() {
      return "###";
    },
    getQueryDefinitionId: function() {
      return this.QueryDefinition.id;
    },
    /**
         * Submits the staged responses to the backend. Also takes care of calling update and create wherever required
         * @param {function} successCallback - success callback to execute
         * @param {function} errorCallback - error callback to execute
         */
    sendResponses: function(successCallback, errorCallback) {
      var currentResponse = this.currentResponse;
      var savedResponses = this.savedResponses;
      var responsesToCreate = [];
      var responsesToUpdate = [];
      for (var i = 0; i < currentResponse.QuestionResponse.length; i++) {
        var isResponseFound = false;
        for (var j = 0; j < savedResponses.QuestionResponse.length; j++) {
          if (currentResponse.QuestionResponse[i].abstractName === savedResponses.QuestionResponse[j].abstractName) {
            responsesToUpdate.push(currentResponse.QuestionResponse[i]);
            isResponseFound = true;
          }
        }
        if (!isResponseFound && !currentResponse.QuestionResponse[i].softdeleteflag) {
          responsesToCreate.push(currentResponse.QuestionResponse[i]);
        }
      }
      var createRequestParams = JSON.parse(JSON.stringify(currentResponse));
      createRequestParams.QuestionResponse = responsesToCreate;
      createRequestParams.id = savedResponses.id;
      var updateRequestParams = JSON.parse(JSON.stringify(currentResponse));
      updateRequestParams.QuestionResponse = responsesToUpdate;
      updateRequestParams.id = savedResponses.id;
      this.createResponses(createRequestParams, errorCallback,
                           this.updateResponses.bind(this, updateRequestParams, errorCallback,
                                                     this.cleanCurrentResponse.bind(this, successCallback)));
    },
    createResponses: function(request, errorCallback, successCallback, response) {
      if ((request.QuestionResponse && request.QuestionResponse.length > 0) || (this.savedResponses.QueryCoBorrower && request.QueryCoBorrower && request.QueryCoBorrower.CoBorrower_Type !== this.savedResponses.QueryCoBorrower.CoBorrower_Type)) {
        this.businessController.submitResponses(request,
                                                this.addToSavedResponses.bind(this, request,
                                                                              successCallback), errorCallback);
      } else {
        successCallback();
      }
    },
    updateResponses: function(request, errorCallback, successCallback, response) {
      if (request.QuestionResponse && request.QuestionResponse.length > 0) {
        this.businessController.updateResponses(request, this.updateSavedResponses.bind(this, request, successCallback), errorCallback);
      } else {
        successCallback();
      }
    },
    addToSavedResponses: function(addedResponses, successCallback) {
      this.savedResponses.QuestionResponse = this.savedResponses.QuestionResponse.concat(addedResponses.QuestionResponse);
      this.savedResponses.QueryCoBorrower = this.currentResponse.QueryCoBorrower;
      successCallback();
    },
    updateSavedResponses: function(updatedResponses, successCallback) {
      for (var i = 0; i < this.savedResponses.QuestionResponse.length; i++) {
        for (var j = 0; j < updatedResponses.QuestionResponse.length; j++) {
          if (this.savedResponses.QuestionResponse[i].abstractName === updatedResponses.QuestionResponse[j].abstractName) {
            this.savedResponses.QuestionResponse[i].Value = updatedResponses.QuestionResponse[j].Value;
            break;
          }
        }
        if (i === this.savedResponses.QuestionResponse.length - 1) {
          successCallback();
        }
      }
    },
    cleanCurrentResponse: function(successCallback) {
      this.savedResponses.QueryCoBorrower = this.currentResponse.QueryCoBorrower;
      this.currentResponse = JSON.parse(JSON.stringify(this.savedResponses));
      this.currentResponse.QuestionResponse = [];
      successCallback();
    },
    /**
         * Stages responses to be saved but does not save to backend
         * @param {Array} formData - List of abstractName and Values to stage
         * @param {function} succ - success callback to execute
         * @param {function} err - error callback to execute
         */
    saveAllResponses: function(formData, succ, err) {
      if (this.currentResponse && this.currentResponse.QuestionResponse && this.currentResponse.QuestionResponse.length > 0) {
        for (var i = 0; i < formData.length; i++) {
          var isPreviousResponsePresent = false;
          for (var j = 0; j < this.currentResponse.QuestionResponse.length; j++) {
            if (formData[i].abstractName === this.currentResponse.QuestionResponse[j].abstractName) {
              formData[i].Value = this.currentResponse.QuestionResponse[j].Value;
              isPreviousResponsePresent = true;
              continue;
            }
          }
          if (!isPreviousResponsePresent) {
            this.currentResponse.QuestionResponse.push(formData[i]);
          }
        }
      } else {
        this.currentResponse.QuestionResponse = JSON.parse(JSON.stringify(formData));
      }
      this.processDependencies(succ, err);
    },
    processDependencies: function(successCallback, errorCallback) {
      for (var i = 0; i < this.currentResponse.QuestionResponse.length; i++) {
        if (this.dependecyList[this.currentResponse.QuestionResponse[i].abstractName]) {
          this.markForDeletion(this.dependecyList[this.currentResponse.QuestionResponse[i].abstractName].allDependencies);
          this.unmarkForDeletion(this.dependecyList[this.currentResponse.QuestionResponse[i].abstractName][this.currentResponse.QuestionResponse[i].Value]);
        }
        if (i === this.currentResponse.QuestionResponse.length - 1) {
          successCallback();
        }
      }
    },
    markForDeletion: function(questionList) {
      if (!questionList)
        return;
      for (var i = 0; i < questionList.length; i++) {
        for (var j = 0; j < this.currentResponse.QuestionResponse.length; j++) {
          if (this.currentResponse.QuestionResponse[j].abstractName === questionList[i]) {
            this.currentResponse.QuestionResponse[j].softdeleteflag = 1;
          }
        }
      }
    },
    unmarkForDeletion: function(questionList) {
      if (!questionList)
        return;
      for (var i = 0; i < questionList.length; i++) {
        for (var j = 0; j < this.currentResponse.QuestionResponse.length; j++) {
          if (this.currentResponse.QuestionResponse[j].abstractName === questionList[i]) {
            delete this.currentResponse.QuestionResponse[j].softdeleteflag;
          }
        }
      }
    },
    generateDependencyList: function(sectionList) {
      for (var i = 0; i < sectionList.length; i++) {
        for (var j = 0; j < sectionList[i].QuestionDefinition.length; j++) {
          if (sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName) {
            if (!this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName]) {
              this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName] = {
                "allDependencies": [sectionList[i].QuestionDefinition[j].Question_FriendlyName]
              };
              this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName][sectionList[i].QuestionDefinition[j].ParentQuestion_Value] = [sectionList[i].QuestionDefinition[j].Question_FriendlyName];
            } else {
              this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName].allDependencies.push(sectionList[i].QuestionDefinition[j].Question_FriendlyName);
              if (this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName][sectionList[i].QuestionDefinition[j].ParentQuestion_Value]) {
                this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName][sectionList[i].QuestionDefinition[j].ParentQuestion_Value].push(sectionList[i].QuestionDefinition[j].Question_FriendlyName);
              } else {
                this.dependecyList[sectionList[i].QuestionDefinition[j].ParentQuestion_FriendlyName][sectionList[i].QuestionDefinition[j].ParentQuestion_Value] = [sectionList[i].QuestionDefinition[j].Question_FriendlyName];
              }
            }
          }
        }
      }
    },
    /**
         * Submits the application. Basically this method changes the Status_id to Submitted
         * @param {function} successCallback - success callback to execute
         * @param {function} errorCallback - error callback to execute
         */
    submitApplication: function(successCallback, errorCallback) {
      this.currentResponse.Status_id = "SUBMITTED";
      this.currentResponse.QuestionResponse = [];
      this.businessController.updateResponses(this.currentResponse,
                                              this.updateSavedResponses.bind(this, this.currentResponse,
                                                                             successCallback), errorCallback);

    },
    getAllSections: function() {
      return this.QueryDefinition.QuerySection;
    },
    getSectionOfQuestion: function(QuestionFriendlyName) {
      var currSectionQuestionDef = [];
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        currSectionQuestionDef = this.QueryDefinition.QuerySection[i].QuestionDefinition;
        for (var j = 0; j < currSectionQuestionDef.length; j++) {
          if (currSectionQuestionDef[j].Question_FriendlyName == QuestionFriendlyName) {
            return this.QueryDefinition.QuerySection[i].QuerySection_FriendlyName;
          }
        }
        if (i === this.QueryDefinition.QuerySection.length - 1) {
          return false;
        }
      }
    },
    /**
         * Gets the data for section required
         * @param {string} sectionFriendlyName - Section friendly name
         * @returns {Object|number} sectionData for next enabled section or false in case current section is the last
         */
    getSectionData: function(sectionFriendlyName) {
      if (!sectionFriendlyName || sectionFriendlyName === "") {
        return false;
      }
      if (this.currentSection && this.currentSection.QuerySection_FriendlyName == sectionFriendlyName) {
        return false;
      }
      for (var i = 0; i < this.QueryDefinition.QuerySection.length; i++) {
        if (this.QueryDefinition.QuerySection[i].QuerySection_FriendlyName == sectionFriendlyName && !this.QueryDefinition.QuerySection[i].isDisabled) {
          this.currentSection = this.QueryDefinition.QuerySection[i];
          return this.currentSection;
        }
        if (i === this.QueryDefinition.QuerySection.length - 1) {
          return false;
        }
      }
      return false;
    },
    /**
         * Returns the Application Id of the current Application
         * @returns {string} application id
         */
    getApplicationId: function() {
      return this.currentResponse.id;
    },
    /**
         * Returns the started date of the current Application
         * @returns {Object} Date object of the started date or null in case not found
         */
    getApplicationStartDate: function() {
      if (this.currentResponse && this.currentResponse.createdts) {
        return new Date(this.currentResponse.createdts);
      } else {
        return null;
      }
    },
    /**
         * Add a coborrower to the application
         * @param {string} type - Type of coapplicant
         * @param {string} firstName - firstName of coapplicant
         * @param {string} lastName - lastname of coapplicant
         * @param {string} email - Email address of coapplicant
         * @param {string} phoneNumber - phoneNumber of coapplicant
         */
    addCoborrower: function(type, firstName, lastName, email, phoneNumber) {
      var QueryCoBorrower = {
        "CoBorrower_Type": type,
        "FirstName": firstName,
        "LastName": lastName,
        "Email": email,
        "PhoneNumber": phoneNumber
      };
      this.currentResponse.QueryCoBorrower = QueryCoBorrower;
    },
    /**
         * Remove the coborrower to the application
         */
    removeCoborrower: function() {
      if (this.currentResponse.QueryCoBorrower) {
        this.currentResponse.QueryCoBorrower.CoBorrower_Type = "Individually";
      }
    },
    /**
         * Get the coborrower's details
         * @returns {Object} - contains type, firstName, lastName, email, phoneNumber
         */
    fetchCoborrower: function() {
      return {
        "type": this.currentResponse.QueryCoBorrower.CoBorrower_Type,
        "firstName": this.currentResponse.QueryCoBorrower.FirstName,
        "lastName": this.currentResponse.QueryCoBorrower.LastName,
        "email": this.currentResponse.QueryCoBorrower.Email,
        "phoneNumber": this.currentResponse.QueryCoBorrower.PhoneNumber
      };
    }
  };
});
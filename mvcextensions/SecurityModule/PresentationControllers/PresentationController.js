define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {
  function Security_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(Security_PresentationController, kony.mvc.Presentation.BasePresenter);

  Security_PresentationController.prototype.allQuestions = null;


  Security_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface(self.currentForm, {
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };

  Security_PresentationController.prototype.showImages = function(context) {
    this.currentForm = "frmSecureImage";
    this.presentUserInterface("frmSecureImage",context);
  };

  Security_PresentationController.prototype.showPhrase = function(context) {
    this.currentForm = "frmSecureImage";
    this.presentUserInterface("frmSecureImage",context);
  };

  Security_PresentationController.prototype.fetchAllSecurityQuestions = function(){
    var self = this;

    function successCallback(response) {
      self.hideLoadingScreen();
      kony.print("response"+JSON.stringify(response));
      self.allQuestions=response.records;
      self.showListofQuestionsUI({"action":"showQuestions","questions" : response.records});
    }

    function failureCallback(error) {
      self.hideLoadingScreen();
      kony.print('Not able to fetch questions records',error);
    }

    this.businessController.getSecurityQuestions({}, successCallback, failureCallback);
    self.showListofQuestionsUI();
    this.showLoadingScreen();
  };

  Security_PresentationController.prototype.showLoadingScreen = function(){
    this.showListofQuestionsUI({action : 'showLoadingScreen'});
  };
  Security_PresentationController.prototype.hideLoadingScreen = function(){
    this.showListofQuestionsUI({action : 'hideLoadingScreen'});
  };

  Security_PresentationController.prototype.showListofQuestionsUI = function (context) {
    this.currentForm = "frmSecurityQuestions";
    this.presentUserInterface('frmSecurityQuestions', context);
  };

   /**
     * @name addNewSecurityQuestion
     * @member SecurityModule.presentationController
     * @param {user_ID : string, SecurityQuestionsList : [{Question : string, Status_id : string}]} dataToinsert
     */
  Security_PresentationController.prototype.addNewSecurityQuestion = function(dataToinsert){
    var self = this;

    function successCallback(response) {
      kony.print("response"+JSON.stringify(response));
      self.fetchAllSecurityQuestions();
      self.showListofQuestionsUI({"action":"addedNewQuestions"});
    }

    function failureCallback(error) {
      kony.print('Not able to add questions ',error);
      self.showListofQuestionsUI({"action":"addedNewQuestionsFailed","message":ErrorInterceptor.errorMessage(error)});
    }

    this.businessController.addSecurityQuestions(dataToinsert, successCallback, failureCallback);
  };
	
	/**
     * @name editSecurityQuestion
     * @member SecurityModule.presentationController
     * @param {user_ID : string, id : string, status_ID : string} segmentData
     */
  Security_PresentationController.prototype.editSecurityQuestion = function(segmentData){
    var self = this;

    function successCallback(response) {
      kony.print("response"+JSON.stringify(response));
      self.showListofQuestionsUI({"action":"changedStatus", "isActive": segmentData.status_ID === 'SID_ACTIVE'});
    }

    function failureCallback(error) {
      kony.print('Not able to change the status id of question ',error);
      self.showListofQuestionsUI({"action":"changedStatusFailed", "isActive": segmentData.status_ID === 'SID_ACTIVE',"message":ErrorInterceptor.errorMessage(error)});
    }

    this.businessController.editSecurityQuestions(segmentData, successCallback, failureCallback);
  };

   /**
     * @name deleteSecurityQuestion
     * @member SecurityModule.presentationController
     * @param {user_ID : string, id : string} dataToDelete
     */
  Security_PresentationController.prototype.deleteSecurityQuestion = function(dataToDelete){
    var self = this;

    function successCallback(response) {
      kony.print("response"+JSON.stringify(response));
      self.showListofQuestionsUI({"action":"deletedSuccesfull"});
      self.fetchAllSecurityQuestions();
    }

    function failureCallback(error) {
      kony.print('Not able to delete the question ',error);
      self.showListofQuestionsUI({"action":"deletedUnSuccesfull","message":ErrorInterceptor.errorMessage(error)});
    }

    this.businessController.deleteSecurityQuestions(dataToDelete, successCallback, failureCallback);
  };


  // SECURE IMAGES
   /**
     * @name fetchAllImages
     * @member SecurityModule.presentationController
     * 
     */
  Security_PresentationController.prototype.fetchAllImages = function(){
    kony.print("Inside fetchAllImages() of Security_PresentationController");
    var self = this;
    self.currentForm = "frmSecureImage";

    function successCallback(response) {
      var context = {
        "action" : "showImages",
        "images" : response
      };
      self.showImages(context);
    }

    function failureCallback(error) {
      kony.print("Inside failure of completionFetchAllImagesCallback");
    }

    this.businessController.getImages({}, successCallback, failureCallback);
  };


  Security_PresentationController.prototype.addNewImage = function(imageJSON){
    kony.print("Inside addNewImage() of Security_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "action" : "showImages",
        "images" : response
      };
      self.showImages(context);
    }

    function failureCallback(error) {
      kony.print("Inside failure of completionAddImageCallback");
    }

    this.businessController.addImage(imageJSON, successCallback, failureCallback);
  };

	 /**
     * @name editImage
     * @member SecurityModule.presentationController
     * @param {id : string, status : string} editImageStatusJSON
     */
  Security_PresentationController.prototype.editImage = function(editImageStatusJSON){
    kony.print("Inside editImage() of Security_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "action" : "showImages",
        "images" : response
      };
      self.showImages(context);
    }

    function failureCallback(error) {
      kony.print("Inside failure of completionEditImageCallback");
    }

    this.businessController.editImageStatus(editImageStatusJSON, successCallback, failureCallback);
  };

	/**
     * @name deleteImage
     * @member SecurityModule.presentationController
     * @param {id : string} deleteImageJSON
     */
  Security_PresentationController.prototype.deleteImage = function(deleteImageJSON){
    kony.print("Inside deleteImage() of Security_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "action" : "showImages",
        "images" : response
      };
      self.showImages(context);
    }

    function failureCallback(error) {
      kony.print("Inside failure of completionDeleteImageCallback");
    }

    this.businessController.deleteImage(deleteImageJSON, successCallback, failureCallback);
  };


  // PHRASE
	/**
     * @name getPhraseStatus
     * @member SecurityModule.presentationController
     * 
     */
  Security_PresentationController.prototype.getPhraseStatus = function(){
    kony.print("Inside getPhraseStatus() of Security_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "action" : "showPhrase",
        "phrase" : response
      };
      self.showPhrase(context);
    }

    function failureCallback(error) {
      kony.print("Inside failure of completionGetPhraseStatusCallback");
    }

    this.businessController.getPhraseStatus({}, successCallback, failureCallback);
  };

	/**
     * @name editPhraseStatus
     * @member SecurityModule.presentationController
     * @param {phraseStatus : number} phraseJSON
     */
  Security_PresentationController.prototype.editPhraseStatus = function(phraseJSON){
    kony.print("Inside editPhraseStatus() of Security_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "action" : "showPhrase",
        "phrase" : phraseJSON.phraseStatus
      };
      self.showPhrase(context);
    }

    function failureCallback(response) {
      kony.print("Inside failure of editPhraseStatusCallback");
    }

    this.businessController.editPhraseStatus(phraseJSON, successCallback, failureCallback);
  };

  return Security_PresentationController;
});
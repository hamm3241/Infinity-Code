define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {

  function FAQs_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(FAQs_PresentationController, kony.mvc.Presentation.BasePresenter);

  FAQs_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmFAQ',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
	/**
     * @name showLoadError
     * @member FAQsModule.presentationController
     * 
     */
  FAQs_PresentationController.prototype.showLoadError = function() {
    this.showFAQs({
      context : 'FetchFAQsError'
    });
  };
	/**
     * @name showFAQs
     * @member FAQsModule.presentationController
     * @param {records : [{CategoryId : object, Answer : object, QuestionCode : object, Status_id : object, CategoryName : object, Question : object, Channel_id : object, id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}} data
     */
  FAQs_PresentationController.prototype.showFAQs = function(data) {
    this.presentUserInterface('frmFAQ',data);
  };

  /**
     * @name showFAQs
     * @member FAQsModule.presentationController
     * @param {records : [{CategoryId : object, Answer : object, QuestionCode : object, Status_id : object, CategoryName : object, Question : object, Channel_id : object, id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}} data
     */
  FAQs_PresentationController.prototype.fetchFAQs =function(){
    var self = this;

    function successCallback(response) {
      self.showFAQs(response);
    }

    function failureCallback(error) {
      kony.print(error.dbpErrMsg);
      self.showLoadError();
    }

    self.businessController.fetchAllFAQs({}, successCallback, failureCallback);
    this.showLoadingScreen();
  };
  /**
     * @name createFAQs
     * @member FAQsModule.presentationController
     * @param {listOfFAQs : [string], user_ID : string, Status_id : string} editedData
     * @param string condition
     * @param (status:string)=>any callBack
     */
  FAQs_PresentationController.prototype.createFAQs =function(editedData,condition,callBack){
    var self = this;

    function successCallback(response) {
      if(condition === "callFetch"){
        callBack("success");
        self.fetchFAQs();
      }else{
        callBack("success");
      }
    }

    function failureCallback(error) {
      callBack(error);
      kony.print('ERROR : Unable to create faq', error);
    }

    self.businessController.createFAQs(editedData, successCallback, failureCallback);
  };

 /**
     * @name updateFAQs
     * @member FAQsModule.presentationController
     * @param {listOfFAQs : [string], user_ID : string, Status_id : string} editedData
     * @param string condition
     * @param (status:string)=>any callBack
     */
  FAQs_PresentationController.prototype.updateFAQs =function(editedData,condition,callBack){
    var self = this;

    function successCallback(response) {
      if(condition === "callFetch"){
        callBack("success");
        self.fetchFAQs();
      }else{
        callBack("success");
      }
    }

    function failureCallback(error) {
      callBack(error);
      kony.print('ERROR : Unable to update faq', error);
    }

    self.businessController.updateFAQs(editedData, successCallback, failureCallback);
  };

  /**
     * @name showFAQScreen
     * @member FAQsModule.presentationController
     * @param {context : string} viewModel
     */
  FAQs_PresentationController.prototype.showFAQScreen =function(viewModel){
    var self =this;

    if(viewModel){
      self.presentUserInterface("frmFAQ",viewModel);
    }else{
      self.presentUserInterface("frmFAQ");
    }
  };

  /**
     * @name showLoadingScreen
     * @member FAQsModule.presentationController
     * @param undefined viewModel
     */
  FAQs_PresentationController.prototype.showLoadingScreen =function(viewModel){
    this.showFAQScreen({
      context : 'showLoadingScreen'
    });
  };
	/**
     * @name fetchCategories
     * @member FAQsModule.presentationController
     * @param number opt
     */
  FAQs_PresentationController.prototype.fetchCategories =function(opt){
    var self = this;
    function successCallback(response) {
      var data = {};
      data.context = "fetchCategories"; 
      data.opt = opt ;
      data.categories = response ;
      self.presentUserInterface('frmFAQ',data);
    }

    function failureCallback(error) {
      kony.print('ERROR : Not able to fetch faq categories', error);
    }

    self.businessController.fetchCategories({}, successCallback, failureCallback);
  };

  return FAQs_PresentationController;
});
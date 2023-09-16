define(['ErrorInterceptor', 'ErrorIsNetworkDown','Promisify'], function (ErrorInterceptor, isNetworkDown, Promisify) {

  function ReportsManagement_PresentationController() {
    this.reportsModel = {
          reportsInfo:null,
          dataSources:null,
          reports:null,
          roles:null,
          users:null
        };
    this.isKeyCloakLogin=null;
    kony.mvc.Presentation.BasePresenter.call(this);
  }

  inheritsFrom(ReportsManagement_PresentationController, kony.mvc.Presentation.BasePresenter);

  ReportsManagement_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface('frmReportsManagement',{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  ReportsManagement_PresentationController.prototype.showLoadingScreen = function(){
    this.presentUserInterface('frmReportsManagement', {LoadingScreen : {
      focus : true
    }});
  };
  ReportsManagement_PresentationController.prototype.hideLoadingScreen = function(){
    this.presentUserInterface('frmReportsManagement', {LoadingScreen : {
      focus : false
    }});
  };


  /**
     * @name showReportTabs
     * @member ReportsManagementModule.presentationController
     * 
     */
  ReportsManagement_PresentationController.prototype.showReportTabs = function() {
    kony.print("Inside showReportTabs() of ReportsManagement_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "reportsInfo" : response
      };
      self.presentUserInterface('frmReportsManagement', context);
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      var context = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', context);
      self.hideLoadingScreen();
    }

    this.businessController.getReportsInfo({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  /**
     * @name getMessagesReport
     * @member ReportsManagementModule.presentationController
     * @param {user_ID : string, startDate : string, endDate : string, category : string, csrName : string} getMessagesReportJSON
     */
  ReportsManagement_PresentationController.prototype.getMessagesReport = function(getMessagesReportJSON) {
    kony.print("Inside getMessagesReport() of ReportsManagement_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "messagesReport" : response
      };
      self.presentUserInterface('frmReportsManagement', context);
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
       var context = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', context);
      self.hideLoadingScreen();
    }

    this.businessController.getMessagesReport(getMessagesReportJSON, successCallback, failureCallback);
    self.showLoadingScreen();
  };


  /**
     * @name getTransactionalReport
     * @member ReportsManagementModule.presentationController
     * @param {startDate : string, endDate : string} getTransactionalReportJSON
     */
  ReportsManagement_PresentationController.prototype.getTransactionalReport = function(getTransactionalReportJSON) {
    kony.print("Inside getMessagesReport() of ReportsManagement_PresentationController");
    var self = this;

    function successCallback(response) {
      var context = {
        "transactionalReport" : response.records
      };
      self.presentUserInterface('frmReportsManagement', context);
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
      self.hideLoadingScreen();
      var context = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', context);
    }

    this.businessController.getTransactionalReport(getTransactionalReportJSON, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  
 ReportsManagement_PresentationController.prototype.renderReports = function() {
    var self=this;
    
    function onFetchSuccess(response){
      self.isKeyCloakLogin = response.isKeyCloakEnabled;
      self.renderReportsMain();
    }    
    function onFetchError(error){  
       var context = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', context);
      console.log("----ERROR: fetching login type " +ErrorInterceptor.errorMessage(error));
    }    
    this.businessController.getLoginTypeConfiguration({}, onFetchSuccess, onFetchError);    
  };
  ReportsManagement_PresentationController.prototype.renderReportsMain = function() {
    var self = this;
    self.showLoadingScreen();
    var promiseGetReportsInfo = Promisify(this.businessController,'getReportsInfo');
    var promiseGetDataSources = Promisify(this.businessController, 'getDataSources');
    var promiseGetReports = Promisify(this.businessController, 'getReports');
    var promiseGetRoles = Promisify(this.businessController, 'getRoles');
    var promiseGetUsers;
    if(self.isKeyCloakLogin===true)
       promiseGetUsers = Promisify(this.businessController, 'fetchKeyCloakUsers');
    else
      promiseGetUsers = Promisify(this.businessController, 'getUsers');
    var promiseList=[];
    promiseList.push(
      promiseGetReportsInfo({}),
      promiseGetDataSources({}),
      promiseGetReports({}),
      promiseGetRoles({}),
      promiseGetUsers({})
    );
    Promise.all(promiseList).then(function (responses) {
      self.reportsModel.reportsInfo = responses[0];
      self.reportsModel.dataSources = responses[1];
      self.reportsModel.reports = responses[2];
      self.reportsModel.roles = responses[3];
      self.reportsModel.users = responses[4];
      self.hideLoadingScreen();
      self.presentUserInterface('frmReportsManagement',{"initialUi":self.reportsModel});
    }).catch(function (res) {
      self.hideLoadingScreen();
      var context = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(res)
      };
      self.presentUserInterface('frmReportsManagement', context);
    });	
  };
  ReportsManagement_PresentationController.prototype.deleteReport = function(context) {
    var self = this;

    function successCallback() {
      var successContext = {
        "toast":"success",
         "message": kony.i18n.getLocalizedString("i18n.frmReportsManagement.toast.reportDeleteSuccessful")};
      self.presentUserInterface('frmReportsManagement', successContext);
      self.hideLoadingScreen();
      self.getReports();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.deleteReport(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  ReportsManagement_PresentationController.prototype.createReport = function(context) {
    var self = this;

    function successCallback() {
      var successContext = {
        "toast":"success",
         "message":  kony.i18n.getLocalizedString("i18n.frmReportsManagement.toast.reportCreateSuccessful")};
      self.presentUserInterface('frmReportsManagement', successContext);
      self.hideLoadingScreen();
      self.getReports();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.createReport(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  ReportsManagement_PresentationController.prototype.getFilters = function(context) {
    var self = this;

    function successCallback(response) {
      if(response.filters.length===0){
        // No filters
        self.getReport({
          "reportId": context.reportId,
          "filters":""
        },"no");
      }
      else{
        self.presentUserInterface('frmReportsManagement', response);
        self.hideLoadingScreen();
      }
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.getFilters(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  ReportsManagement_PresentationController.prototype.getReport = function(context, isFiltersAvailable) {
    var self = this;

    function successCallback(response) {
      self.presentUserInterface('frmReportsManagement', {"getReportResponse":response,"page":context.page,"isFiltersAvailable":isFiltersAvailable});
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.getReport(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  ReportsManagement_PresentationController.prototype.getReports = function() {
    var self = this;

    function successCallback(response) {
      self.presentUserInterface('frmReportsManagement', response);
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.getReports({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  ReportsManagement_PresentationController.prototype.shareReport = function(context) {
    var self = this;

    function successCallback() {
       var successContext = {
        "toast":"success",
         "message": kony.i18n.getLocalizedString("i18n.frmReportsManagement.toast.reportShareSuccessful")};
      self.presentUserInterface('frmReportsManagement', successContext);
      self.hideLoadingScreen();
      self.getReports();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.shareReport(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
   ReportsManagement_PresentationController.prototype.downloadReport = function(context) {
    var self = this;

    function successCallback(response) {
      self.presentUserInterface('frmReportsManagement', {"downloadReport":response});
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.downloadReport(context, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  
  ReportsManagement_PresentationController.prototype.getDataSources = function() {
    var self = this;

    function successCallback(response) {
      self.presentUserInterface('frmReportsManagement', {"dataSources":response});
      self.hideLoadingScreen();
    }

    function failureCallback(error) {
       var errorContext = {
         "toast":"error",
         "message": ErrorInterceptor.errorMessage(error)
      };
      self.presentUserInterface('frmReportsManagement', errorContext);
      self.hideLoadingScreen();
    }

    this.businessController.getDataSources({}, successCallback, failureCallback);
    self.showLoadingScreen();
  };
  ReportsManagement_PresentationController.prototype.getFabricReports = function() {
    var self = this;
    self.showLoadingScreen();
    var promiseGetReports = Promisify(this.businessController,'getFabricReports');
    var promiseGetDataSources = Promisify(this.businessController, 'getDataSources');
    var promiseList=[];
    promiseList.push(
      promiseGetReports({}),
      promiseGetDataSources({})
    );
    Promise.all(promiseList).then(function (responses) {
      self.reportsModel.reports = responses[0];
      self.reportsModel.dataSources = responses[1];
      self.hideLoadingScreen();
      self.presentUserInterface('frmReportsManagement',{"fabricReports":{"reports":responses[0].reports,"dataSources":responses[1].reportdatasource}});
    }).catch(function (res) {
      self.hideLoadingScreen();
      var context = {
        "toast":"error",
        "message": ErrorInterceptor.errorMessage(res)
      };
      self.presentUserInterface('frmReportsManagement', context);
    });	
  };
  return ReportsManagement_PresentationController;
});
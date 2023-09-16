define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {

  function Logs_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.requestFromCustomerManagement = null;
  }

  inheritsFrom(Logs_PresentationController, kony.mvc.Presentation.BasePresenter);
  Logs_PresentationController.prototype.filters = null;

  Logs_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface("frmLogs",{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  Logs_PresentationController.prototype.showLogsUIScreen = function(context) {
		this.showLogs();
        this.presentUserInterface("frmLogs", {
            "initialUIrender": true
        });
    };
  /**
     * @name showLogs
     * @member LogsModule.presentationController
     * @param {action : string, filtersData : {Status : [object], Events : [object], ModuleNames : [object], Roles : [object], httpresponse : {headers : object, url : object, responsecode : object}, opstatus : number}} context
     */
  Logs_PresentationController.prototype.showLogs = function(context) {
    if(context && context.CustomerManagementRequest){
      this.requestFromCustomerManagement = context.CustomerManagementRequest;
    }
    this.presentUserInterface("frmLogs",context);
  };

  Logs_PresentationController.prototype.setRequestFromcustomerManagement = function(requestFromCustomerManagement) {
    this.requestFromCustomerManagement = requestFromCustomerManagement;
  };
  /**
     * @name getRequestFromcustomerManagement
     * @member LogsModule.presentationController
     * 
     */
  Logs_PresentationController.prototype.getRequestFromcustomerManagement = function(){
    return this.requestFromCustomerManagement;
  };


  Logs_PresentationController.prototype.fetchAllFilters = function(param){
    var self = this;

    function successCallback(response) {
      self.filters=response;
      if(param==="showFiltersPage") {
        self.showLogs({"action":"getAllFiltersSuccess", "filtersData":self.filters, "showFiltersPage":true});
      }
      else if(param==="deleteCall") {
        self.showLogs({"action":"deletedFiltersSuccess", "filtersData":self.filters});
      }
      else {
        self.showLogs({"action":"getAllFiltersSuccess", "filtersData":self.filters});
      }
    }

    function failureCallback(error) {
      self.showLogs({"action":"getAllFiltersFailure","filtersData" : error});
    }

    this.businessController.getFilters({}, successCallback, failureCallback);
  };
   /**
     * @name fetchAllServicesList
     * @member LogsModule.presentationController
     * 
     */
  Logs_PresentationController.prototype.fetchAllServicesList = function(){
    var self = this;

    function successCallback(response) {
      self.showLogs({"action":"getServicesList","servicesList" : response.Services});
    }

    function failureCallback(error) {
    }

    this.businessController.getServicesForLogs({}, successCallback, failureCallback);
  };


  Logs_PresentationController.prototype.saveFilter = function(dataToSave){
    var self = this; 

    function successCallback(response) {
      self.showLogs({"action":"createFiltersSuccess","filtersData" : response});
    }

    function failureCallback(error) {
      self.showLogs({"action":"createFiltersFailure","filtersData" : error});
    }

    this.businessController.saveFilter(dataToSave, successCallback, failureCallback);
  };


  Logs_PresentationController.prototype.deleteFilter = function(dataToDelete){
    var self = this;

    function successCallback(response) {
      self.fetchAllFilters("deleteCall");
    }

    function failureCallback(error) {
      self.showLogs({"action":"deletedFiltersFailure","filtersData" : error});
    }

    this.businessController.deleteFilter(dataToDelete, successCallback, failureCallback);
  };


  Logs_PresentationController.prototype.fetchCustomerActivityLogs = function(payload){
    var self = this;

    function successCallback(response) {
      var context = {} ;
      context.action = "getCustomerLogsSuccess";
      context.records =  response.logs;
      context.count= response.count;
      context.page= response.page;
      context.pageSize= response.pageSize;
      context.isMemberActivity=payload.FilterData.isMemberActivity;
      self.showLogs(context);
    }

    function failureCallback(error) {
      var context = {} ;
      context.action = "getCustomerLogsFailure";
      context.message = ErrorInterceptor.errorMessage(error);
      self.showLogs(context);
    }

    this.businessController.getCustomerLogs({"FilterData":JSON.stringify(payload.FilterData).split("\"").join("'")}, successCallback, failureCallback);
  };


  Logs_PresentationController.prototype.fetchCustomerActivityMasterData = function(selectedKey){
    var self = this;

    function successCallback(response) {
      var context = {} ;
      if(typeof(response.Events) === 'string'){
        response.Events = JSON.parse(response.Events);
      }
      if(typeof(response.Roles) === 'string'){
        response.Roles = JSON.parse(response.Roles);
      }

      context.action = "getCustomerLogsMasterDataSuccess";
      context.adminActivities= response.Events;
      context.roles= response.Roles;
      context.selectedKey= selectedKey ;
      self.showLogs(context);
    }

    function failureCallback(error) {
      var context = {} ;
      context.action = "getCustomerLogsMasterDataFailure" ;
      context.message = ErrorInterceptor.errorMessage(error);
      self.showLogs(context);
    }

    this.businessController.getCustomerLogsMasterData({}, successCallback, failureCallback);
  };


  Logs_PresentationController.prototype.fetchAdminConsoleLogs = function(dataToFilter){
    var self = this;
	dataToFilter.FilterData.NoOfRecords=50;
    function successCallback(response) {
      self.showLogs( {"action" : "getAdminConsoleLogsSuccess", "adminConsoleLogsData" : response});
    }

    function failureCallback(error) {
      self.showLogs( {"action" : "getAdminConsoleLogsFailure","message":ErrorInterceptor.errorMessage(error)});
    }

    this.businessController.getAdminConsoleLogs({"FilterData":JSON.stringify(dataToFilter.FilterData).split("\"").join("'")}, successCallback, failureCallback);
  };


  Logs_PresentationController.prototype.fetchTransactionLogs = function(filterDataJSON) {
    var self = this;

    function successCallback(response) {
      self.showLogs( {"action" : "getTransactionLogs", "transactionLogsData" : response});
    }

    function failureCallback(error) {
    }

    this.businessController.getTransactionLogs({"FilterData":JSON.stringify(filterDataJSON.FilterData).split("\"").join("'")}, successCallback, failureCallback);
  };
  /**
     * @name fetchTransactionFiltersMasterData
     * @member LogsModule.presentationController
     * 
     */

  Logs_PresentationController.prototype.fetchTransactionFiltersMasterData = function() {
    var self = this;

    function successCallback(response) {
      if(typeof(response.AccountTypes) === 'string'){
        response.AccountTypes = JSON.parse(response.AccountTypes);
      }
      if(typeof(response.Channel) === 'string'){
        response.Channel = JSON.parse(response.Channel);
      }
      if(typeof(response.Status) === 'string'){
        response.Status = JSON.parse(response.Status);
      }
      if(typeof(response.Type) === 'string'){
        response.Type = JSON.parse(response.Type);
      }
      if(typeof(response.currency) === 'string'){
        response.currency = JSON.parse(response.currency);
      }
      self.showLogs( {"action" : "getTransactionFiltersMasterData", "filtersData" : response});
    }

    function failureCallback(error) {
    }

    this.businessController.getTransactionFiltersMasterData({}, successCallback, failureCallback);
  };

  /**
     * @name fetchAdminFiltersMasterData
     * @member LogsModule.presentationController
     * 
     */
  Logs_PresentationController.prototype.fetchAdminFiltersMasterData = function() {
    var self = this;

    function successCallback(response) {
      if(typeof(response.Events) === 'string'){
        response.Events = JSON.parse(response.Events);
      }
      if(typeof(response.ModuleNames) === 'string'){
        response.ModuleNames = JSON.parse(response.ModuleNames);
      }
      if(typeof(response.Roles) === 'string'){
        response.Roles = JSON.parse(response.Roles);
      }
      if(typeof(response.Status) === 'string'){
        response.Status = JSON.parse(response.Status);
      }
      self.showLogs( {"action" : "getAdminFiltersMasterData", "filtersData" : response});
    }

    function failureCallback(error) {
    }

    this.businessController.getAdminFiltersMasterData({}, successCallback, failureCallback);
  };
  
   Logs_PresentationController.prototype.getAllModules = function(payLoad,navigation) {
    var self = this;
    function successCallback(response) {
      self.showLogs( {"action" : "getAllModulesSuccess", "modules" : response.eventtype,"navigation":navigation});
    }

    function failureCallback(error) {
      self.showLogs( {"action" : "getAllModulesFailure", "message" : ErrorInterceptor.errorMessage(error)});
    }
	this.businessController.getModules(payLoad, successCallback, failureCallback);
  };
  
  Logs_PresentationController.prototype.getActivityType = function(logType) {
    var self = this;

    function successCallback(response) {
      self.showLogs( {"action" : "getActivityTypeSuccess", "activityTypes" : response.eventsubtype, "logType" : logType});
    }
    function failureCallback(error) {
      self.showLogs( {"action" : "getActivityTypeFailure", "message" : ErrorInterceptor.errorMessage(error)});
    }

    this.businessController.getActivityType({}, successCallback, failureCallback);
  };
    Logs_PresentationController.prototype.searchCustomerAuditLogs = function(context,logType) {
    var self = this;

    function successCallback(response) {
      self.showLogs( {"action" : "searchCustomerAuditLogsResponse", "logs" : response, "logType" : logType});
    }
    function failureCallback(error) {
      self.showLogs( {"action" : "searchCustomerAuditLogsResponseFailure", "message" : ErrorInterceptor.errorMessage(error)});
    }

    this.businessController.searchCustomerAuditLogs(context, successCallback, failureCallback);
  };


  return Logs_PresentationController;
});
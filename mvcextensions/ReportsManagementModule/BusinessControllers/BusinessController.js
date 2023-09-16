define([],function () {

  function ReportsManagementModule_BusinessController(){
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(ReportsManagementModule_BusinessController, kony.mvc.Business.Delegator);

  ReportsManagementModule_BusinessController.prototype.initializeBusinessController = function(){
  };


  /**
     * @name getReportsInfo
     * @member ReportsManagementModule.businessController
     * @param {} payload
     * @param (response:{csrNames : [{name : string, id : string}], opstatus : number, category : [{name : string, id : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  ReportsManagementModule_BusinessController.prototype.getReportsInfo = function(payload, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getReportsInfo(payload, onSuccess, onError);
  };


  /**
     * @name getMessagesReport
     * @member ReportsManagementModule.businessController
     * @param {user_ID : string, startDate : string, endDate : string, category : string, csrName : string} getMessagesReportJSON
     * @param (response:{opstatus : number, messages : [{name : string, value : string}], threads : [{name : string, value : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  ReportsManagementModule_BusinessController.prototype.getMessagesReport = function(getMessagesReportJSON, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getMessagesReport(getMessagesReportJSON, onSuccess, onError);
  };


  /**
     * @name getTransactionalReport
     * @member ReportsManagementModule.businessController
     * @param {startDate : string, endDate : string} getTransactionalReportJSON
     * @param (response:{records : [], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  ReportsManagementModule_BusinessController.prototype.getTransactionalReport = function(getTransactionalReportJSON, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getTransactionalReport(getTransactionalReportJSON, onSuccess, onError);
  };
   ReportsManagementModule_BusinessController.prototype.getFabricReports = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getFabricReports(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getDataSources = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getDataSources(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getReports = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getReports(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.deleteReport = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.deleteReport(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.createReport = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.createReport(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getFilters = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getFilters(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getReport = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ReportsManager")
      .businessController.getReport(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getRoles = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("RolesAndPermissionsManager")
      .businessController.fetchAllRoles(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getUsers = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchInternalUsers(context, onSuccess, onError);
  };
   ReportsManagementModule_BusinessController.prototype.shareReport = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ReportsManager")
        .businessController.shareReport(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.downloadReport = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ReportsManager")
        .businessController.downloadReport(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.fetchKeyCloakUsers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("KeyCloakManager")
      .businessController.getKeycloakUsers({}, onSuccess, onError);
  };
  ReportsManagementModule_BusinessController.prototype.execute = function(command){
    kony.mvc.Business.Controller.prototype.execute.call(this,command);
  };

  return ReportsManagementModule_BusinessController;
});
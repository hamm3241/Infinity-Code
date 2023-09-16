define(['ModelManager'], function (ModelManager) {
  /**
     * ReportsManager manages models: MessagesReport, ReportsInfo, TransactionReport
     */
  function ReportsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(ReportsManager, kony.mvc.Business.Delegator);

  ReportsManager.prototype.initializeBusinessController = function () {

  };


  /**
     * @name getReportsInfo
     * @member ReportsManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{csrNames : [{name : string, id : string}], opstatus : number, category : [{name : string, id : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  ReportsManager.prototype.getReportsInfo = function(payload, onSuccess, onError){
    ModelManager.invoke('ReportsInfo', 'getReportsInfo', {}, onSuccess, onError);
  };


  /**
     * @name getMessagesReport
     * @member ReportsManager.businessController
     * @param {user_ID : string, startDate : string, endDate : string, category : string, csrName : string} getMessagesReportJSON
     * @param (...callbackArgs:{opstatus : number, messages : [{name : string, value : string}], threads : [{name : string, value : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  ReportsManager.prototype.getMessagesReport = function(getMessagesReportJSON, onSuccess, onError){
    ModelManager.invoke('MessagesReport', 'getMessagesReport', getMessagesReportJSON, onSuccess, onError);
  };


  /**
     * @name getTransactionalReport
     * @member ReportsManager.businessController
     * @param {startDate : string, endDate : string} getTransactionalReportJSON
     * @param (...callbackArgs:{records : [], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  ReportsManager.prototype.getTransactionalReport = function(getTransactionalReportJSON, onSuccess, onError){
    ModelManager.invoke('TransactionReport', 'getTransactionValueVolumeByService', getTransactionalReportJSON, onSuccess, onError);
  };
  
  ReportsManager.prototype.getFabricReports = function(context, onSuccess, onError){
   ModelManager.invoke('FabricReports', 'getFabricReports', context, onSuccess, onError);
  }; 
  ReportsManager.prototype.getDataSources = function(context, onSuccess, onError){
   ModelManager.invoke('DataSources', 'getDataSources', context, onSuccess, onError);
  };
  ReportsManager.prototype.getReports = function(context, onSuccess, onError){
   ModelManager.invoke('ReportsList', 'getReportsList', context, onSuccess, onError);
  };
   ReportsManager.prototype.deleteReport = function(context, onSuccess, onError){
   ModelManager.invoke('Reports', 'deleteReport', context, onSuccess, onError);
  };
  ReportsManager.prototype.createReport = function(context, onSuccess, onError){
   ModelManager.invoke('Reports', 'createReport', context, onSuccess, onError);
  };
  ReportsManager.prototype.getFilters = function(context, onSuccess, onError){
   ModelManager.invoke('ReportFilters', 'getReportFilters', context, onSuccess, onError);
  };
  ReportsManager.prototype.getReport = function(context, onSuccess, onError){
   ModelManager.invoke('Reports', 'getReport', context, onSuccess, onError);
  };
  ReportsManager.prototype.shareReport = function(context, onSuccess, onError){
   ModelManager.invoke('Reports', 'shareReport', context, onSuccess, onError);
  };
  ReportsManager.prototype.downloadReport = function(context, onSuccess, onError){
   ModelManager.invoke('Reports', 'downloadReport', context, onSuccess, onError);
  };
  return ReportsManager;
});
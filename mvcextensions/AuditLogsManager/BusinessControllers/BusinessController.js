define(['ModelManager'], function (ModelManager) {
  /**
     * AuditLogsManager manages models: LogView, TransactionAndAuditLogs
     */
  function AuditLogsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(AuditLogsManager, kony.mvc.Business.Delegator);

  AuditLogsManager.prototype.initializeBusinessController = function () {

  };

  /**
   * @name getFilters
   * @member AuditLogsManager.businessController
   * @param {} payload
   * @param (...callbackArgs:{AdmincConsoleCount : string, TransactionalCount : string, CustomerActivityCount : string, opstatus : number, FilterData : [{Description : object, ViewData : object, LogType : object, id : object, createdOn : object, Name : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getFilters = function(payload, onSuccess, onError){
    ModelManager.invoke('LogView', 'getFilters', {}, onSuccess, onError);
  };

  /**
   * @name saveFilter
   * @member AuditLogsManager.businessController
   * @param {FilterData : {LogType : string, ViewName : string, Description : string, ViewData : {type : object, date : object, range : object, module : object}}} dataToSave
   * @param (...callbackArgs:{operationStatusParam : string, operationStatusCodeParam : string, opstatus : number, operationRecord : {CreateAlert_7aeb4ceb-74d8-4854-a7ee-7a7f7eda5257 : string}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.saveFilter = function(dataToSave, onSuccess, onError){
    ModelManager.invoke('LogView', 'createFilter', dataToSave, onSuccess, onError);
  };

  /**
   * @name deleteFilter
   * @member AuditLogsManager.businessController
   * @param {view_ID : string} dataToDelete
   * @param (...callbackArgs:{operationStatusParam : string, operationStatusCodeParam : string, opstatus : number, operationRecord : {}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.deleteFilter = function(dataToDelete, onSuccess, onError){
    ModelManager.invoke('LogView', 'deleteFilter', dataToDelete, onSuccess, onError);
  };

  /**
   * @name getCustomerLogs
   * @member AuditLogsManager.businessController
   * @param {FilterData : {userName : string, id : string, isMemberActivity : boolean, noOfRecords : string, startDate : string, endDate : string, sortDirection : string}} payload
   * @param (...callbackArgs:{page : number, pageSize : number, count : number, logs : [], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getCustomerLogs = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getCustomerLogs', payload, onSuccess, onError);
  };

  /**
   * @name getCustomerLogsMasterData
   * @member AuditLogsManager.businessController
   * @param {} payload
   * @param (...callbackArgs:{Events : [string], Roles : [string], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getCustomerLogsMasterData = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getCustomerActivityMasterData', payload, onSuccess, onError);
  };

  /**
   * @name getAdminConsoleLogs
   * @member AuditLogsManager.businessController
   * @param {FilterData : {StartDate : string, EndDate : string}} dataToFilter
   * @param (...callbackArgs:{page : number, pageSize : number, count : number, logs : [{logType : object, id : object, createdOn : object, event : object, description : object, username : object, userRole : object, moduleName : object, eventts : object, status : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getAdminConsoleLogs = function(dataToFilter, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getAdminActivityLogs', dataToFilter, onSuccess, onError);
  };


  /**
   * @name getTransactionLogs
   * @member AuditLogsManager.businessController
   * @param {FilterData : {StartDate : string, EndDate : string}} filterDataJSON
   * @param (...callbackArgs:{page : number, pageSize : number, count : number, logs : [], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getTransactionLogs = function(filterDataJSON, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getTransactionLogs', filterDataJSON, onSuccess, onError);
  };

  /**
   * @name getTransactionFiltersMasterData
   * @member LogsModule.businessController
   * @param {} payload
   * @param (response:{Status : [string], Type : [string], Channel : [string], currency : [string], AccountTypes : [string], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getTransactionFiltersMasterData = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getTransactionMasterData', {}, onSuccess, onError);
  };

  /**
   * @name getAdminFiltersMasterData
   * @member LogsModule.businessController
   * @param {} payload
   * @param (response:{Status : [string], Events : [string], ModuleNames : [string], Roles : [string], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  AuditLogsManager.prototype.getAdminFiltersMasterData = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getAdminActivityMasterData', {}, onSuccess, onError);
  };
  
  AuditLogsManager.prototype.getModules = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getModules', payload, onSuccess, onError);
  };

  AuditLogsManager.prototype.getActivityType = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'getActivityType', {}, onSuccess, onError);
  };
  AuditLogsManager.prototype.searchCustomerAuditLogs = function(payload, onSuccess, onError){
    ModelManager.invoke('TransactionAndAuditLogs', 'SearchCustomerAuditLogs', payload, onSuccess, onError);
  };

  return AuditLogsManager;
});
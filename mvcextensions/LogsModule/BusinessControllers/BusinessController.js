define([],function () {

    function LogsModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(LogsModule_BusinessController, kony.mvc.Business.Delegator);
    
    LogsModule_BusinessController.prototype.initializeBusinessController = function(){
    };

    LogsModule_BusinessController.prototype.getFilters = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getFilters(payload, onSuccess, onError);
    };
    
    LogsModule_BusinessController.prototype.saveFilter = function(dataToSave, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.saveFilter(dataToSave, onSuccess, onError);
    };
    
    LogsModule_BusinessController.prototype.deleteFilter = function(dataToDelete, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.deleteFilter(dataToDelete, onSuccess, onError);
    };
      /**
     * @name getServicesForLogs
     * @member LogsModule.businessController
     * @param {} payload
     * @param (response:{Services : [{code : object, Description : object, DisplayDescription : object, IsSMSAlertActivated : object, IsAgreementActive : object, BeneficiarySMSCharge : object, TransactionFee_id : object, Channel_id : object, createdts : object, softdeleteflag : object, Category_id : object, IsFutureTransaction : object, Name : object, IsOutageMessageActive : object, IsBeneficiarySMSAlertActivated : object, MinTransferLimit : object, MaxTransferLimit : object, createdby : object, DisplayName : object, HasWeekendOperation : object, id : object, synctimestamp : object, TransactionCharges : object, Notes : object, lastmodifiedts : object, Status_id : object, IsAuthorizationRequired : object, SMSCharges : object, TransferDenominations : object, IsCampaignActive : object, WorkSchedule_id : object, IsTCActive : object, modifiedby : object, IsAlertActive : object, TransactionLimit_id : object, Type_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    LogsModule_BusinessController.prototype.getServicesForLogs = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.getServicesForLogs(payload, onSuccess, onError);
    };
    
    LogsModule_BusinessController.prototype.getCustomerLogs = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getCustomerLogs(payload, onSuccess, onError);
    };
    
    LogsModule_BusinessController.prototype.getCustomerLogsMasterData = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getCustomerLogsMasterData(payload, onSuccess, onError);
    };
    
    LogsModule_BusinessController.prototype.getAdminConsoleLogs = function(dataToFilter, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getAdminConsoleLogs(dataToFilter, onSuccess, onError);
    };
    
    LogsModule_BusinessController.prototype.getTransactionLogs = function(filterDataJSON, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getTransactionLogs(filterDataJSON, onSuccess, onError);
    };
     /**
     * @name getTransactionFiltersMasterData
     * @member LogsModule.businessController
     * @param {} payload
     * @param (response:{Status : [string], Type : [string], Channel : [string], currency : [string], AccountTypes : [string], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    LogsModule_BusinessController.prototype.getTransactionFiltersMasterData = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getTransactionFiltersMasterData(payload, onSuccess, onError);
    };
    /**
     * @name getAdminFiltersMasterData
     * @member LogsModule.businessController
     * @param {} payload
     * @param (response:{Status : [string], Events : [string], ModuleNames : [string], Roles : [string], httpresponse : {headers : string, url : string, responsecode : number}, opstatus : number})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    LogsModule_BusinessController.prototype.getAdminFiltersMasterData = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getAdminFiltersMasterData(payload, onSuccess, onError);
    };
   LogsModule_BusinessController.prototype.getModules = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getModules(payload, onSuccess, onError);
    };
  
   LogsModule_BusinessController.prototype.getActivityType = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.getActivityType(payload, onSuccess, onError);
    };
   LogsModule_BusinessController.prototype.searchCustomerAuditLogs = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AuditLogsManager")
        .businessController.searchCustomerAuditLogs(payload, onSuccess, onError);
    };
    LogsModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };

    return LogsModule_BusinessController;
});
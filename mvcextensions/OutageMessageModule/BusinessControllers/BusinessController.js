define([],function () {

    function OutageMessageModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(OutageMessageModule_BusinessController, kony.mvc.Business.Delegator);
    
    OutageMessageModule_BusinessController.prototype.initializeBusinessController = function(){
    };
/**
     * @name fetchOutageMessage
     * @member OutageMessageModule.businessController
     * @param {} context
     * @param (response:{records : [{lastmodifiedts : string, Service_id : string, Status_id : string, MessageText : string, Channel_id : string, createdts : string, softdeleteflag : string, Name : string, createdby : string, modifiedby : string, service_Status_id : string, id : string, synctimestamp : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    OutageMessageModule_BusinessController.prototype.fetchOutageMessage = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.fetchOutageMessage(context, onSuccess, onError);
    };
     /**
     * @name updateOutageMessage
     * @member OutageMessageModule.businessController
     * @param [{Service_id : string, MessageText : string, Status_id : string, id : string, modifiedby : string}] context
     * @param (response:{opstatus : number, OUT_MSG_2 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    OutageMessageModule_BusinessController.prototype.updateOutageMessage = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.updateOutageMessage(context, onSuccess, onError);
    };
    
    /**
     * @name bulkUpdateOutageMessage
     * @member OutageMessageModule.businessController
     * @param [{Service_id : string, MessageText : string, Status_id : string, id : string, modifiedby : string}] context
     * @param (response:{opstatus : number, OUT_MSG_2 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    OutageMessageModule_BusinessController.prototype.bulkUpdateOutageMessage = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.bulkUpdateOutageMessage(context, onSuccess, onError);
    };

   /**
     * @name addOutageMessage
     * @member OutageMessageModule.businessController
     * @param {Service_id : string, Status_id : string, MessageText : string, createdby : string, modifiedby : string} context
     * @param (...callbackArgs)=>any onSuccess
     * @param (response:{errcode : number, errmsg : string, opstatus : number, httpStatusCode : string})=>any onError
     */
    OutageMessageModule_BusinessController.prototype.addOutageMessage = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.addOutageMessage(context, onSuccess, onError);
    };
     /**
     * @name deleteOutageMessage
     * @member OutageMessageModule.businessController
     * @param [{id : string}] context
     * @param (response:{opstatus : number, OUT_MSG_2 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    OutageMessageModule_BusinessController.prototype.deleteOutageMessage = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.deleteOutageMessage(context, onSuccess, onError);
    };
    
  /**
     * @name getServices
     * @member OutageMessageModule.businessController
     * @param {} context
     * @param (response:{Services : [{Description : string, DisplayDescription : string, WorkSchedule_Desc : string, IsSMSAlertActivated : string, IsAgreementActive : string, BeneficiarySMSCharge : string, TransactionFee_id : string, Channel_id : string, IsFutureTransaction : string, Name : string, IsOutageMessageActive : string, IsBeneficiarySMSAlertActivated : string, MinTransferLimit : string, MaxTransferLimit : string, createdby : string, DisplayName : string, HasWeekendOperation : string, id : string, TransactionCharges : string, TransactionFees : [], Status : string, Type_Name : string, Status_id : string, Channel : string, IsAuthorizationRequired : string, SMSCharges : string, TransferDenominations : string, Category_Name : string, IsCampaignActive : string, Code : string, WorkSchedule_id : string, Category_Id : string, IsTCActive : string, IsAlertActive : string, TransactionLimit_id : string, Type_id : string, PeriodicLimits : []}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    OutageMessageModule_BusinessController.prototype.getServices = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.getServices(context, onSuccess, onError);
    };
    
    OutageMessageModule_BusinessController.prototype.fetchApplicationsList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MFAManager")
      .businessController.fetchApplicationsList(context, onSuccess, onError);
  };
    
    OutageMessageModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  
  
    return OutageMessageModule_BusinessController;
});
define(['ModelManager'], function (ModelManager) {
  /**
     * StaticContentManager manages models: frequentlyAskedQuestions, outageMessage, privacyPolicy, service, termsAndConditions
     */
  function StaticContentManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(StaticContentManager, kony.mvc.Business.Delegator);

  StaticContentManager.prototype.initializeBusinessController = function () {

  };

	/**
     * @name fetchAllFAQs
     * @member StaticContentManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{records : [{CategoryId : object, Answer : object, QuestionCode : object, Status_id : object, CategoryName : object, Question : object, Channel_id : object, id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.fetchAllFAQs = function(payload, onSuccess, onError){
    ModelManager.invoke('frequentlyAskedQuestions', 'getFAQs', {}, onSuccess, onError);	
  };

	/**
     * @name updateFAQs
     * @member StaticContentManager.businessController
     * @param {listOfFAQs : [string], user_ID : string, Status_id : string} payload
     * @param (...callbackArgs:{SuccessEditRecordOps : {EditFAQ_53e26903-ca09-4393-82bd-94d9ea6d83f5 : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.updateFAQs = function(payload, onSuccess, onError){
    ModelManager.invoke('frequentlyAskedQuestions', 'updateFAQs', payload, onSuccess, onError);	
  };


  StaticContentManager.prototype.createFAQs = function(payload, onSuccess, onError){
    ModelManager.invoke('frequentlyAskedQuestions', 'createFAQs', payload, onSuccess, onError);
  };

	/**
     * @name fetchCategories
     * @member StaticContentManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{opstatus : number, faqcategory : [{lastmodifiedts : object, createdby : object, modifiedby : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object, Name : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.fetchCategories = function(payload, onSuccess, onError){
    ModelManager.invoke('frequentlyAskedQuestions', 'getCategories', {}, onSuccess, onError);	
  };

   /**
     * @name getServicesForLogs
     * @member LogsModule.businessController
     * @param {} payload
     * @param (response:{Services : [{code : object, Description : object, DisplayDescription : object, IsSMSAlertActivated : object, IsAgreementActive : object, BeneficiarySMSCharge : object, TransactionFee_id : object, Channel_id : object, createdts : object, softdeleteflag : object, Category_id : object, IsFutureTransaction : object, Name : object, IsOutageMessageActive : object, IsBeneficiarySMSAlertActivated : object, MinTransferLimit : object, MaxTransferLimit : object, createdby : object, DisplayName : object, HasWeekendOperation : object, id : object, synctimestamp : object, TransactionCharges : object, Notes : object, lastmodifiedts : object, Status_id : object, IsAuthorizationRequired : object, SMSCharges : object, TransferDenominations : object, IsCampaignActive : object, WorkSchedule_id : object, IsTCActive : object, modifiedby : object, IsAlertActive : object, TransactionLimit_id : object, Type_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.getServicesForLogs = function(payload, onSuccess, onError){
    ModelManager.invoke('service', 'getServicesForLogs', {}, onSuccess, onError);	
  };

/**
     * @name fetchOutageMessage
     * @member OutageMessageModule.businessController
     * @param {} context
     * @param (response:{records : [{lastmodifiedts : string, Service_id : string, Status_id : string, MessageText : string, Channel_id : string, createdts : string, softdeleteflag : string, Name : string, createdby : string, modifiedby : string, service_Status_id : string, id : string, synctimestamp : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.fetchOutageMessage = function(context, onSuccess, onError){
    ModelManager.invoke("outageMessage", "getOutageMessage", context, onSuccess, onError);
  };

 /**
     * @name updateOutageMessage
     * @member OutageMessageModule.businessController
     * @param [{Service_id : string, MessageText : string, Status_id : string, id : string, modifiedby : string}] context
     * @param (response:{opstatus : number, OUT_MSG_2 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.updateOutageMessage = function(context, onSuccess, onError){
    ModelManager.invoke("outageMessage", "updateOutageMessage", context, onSuccess, onError);
  };

   /**
     * @name bulkUpdateOutageMessage
     * @member OutageMessageModule.businessController
     * @param [{Service_id : string, MessageText : string, Status_id : string, id : string, modifiedby : string}] context
     * @param (response:{opstatus : number, OUT_MSG_2 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    StaticContentManager.prototype.bulkUpdateOutageMessage = function(context, onSuccess, onError){
      ModelManager.invoke("outageMessage", "bulkUpdateOutageMessage", context, onSuccess, onError);
    };

   /**
     * @name addOutageMessage
     * @member OutageMessageModule.businessController
     * @param {Service_id : string, Status_id : string, MessageText : string, createdby : string, modifiedby : string} context
     * @param (...callbackArgs)=>any onSuccess
     * @param (response:{errcode : number, errmsg : string, opstatus : number, httpStatusCode : string})=>any onError
     */
  StaticContentManager.prototype.addOutageMessage = function(context, onSuccess, onError){
    ModelManager.invoke("outageMessage", "createOutageMessage", context, onSuccess, onError);
  };

 /**
     * @name deleteOutageMessage
     * @member OutageMessageModule.businessController
     * @param [{id : string}] context
     * @param (response:{opstatus : number, OUT_MSG_2 : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.deleteOutageMessage = function(context, onSuccess, onError){
    ModelManager.invoke("outageMessage", "deleteOutageMessage", context, onSuccess, onError);
  };

/**
     * @name getServices
     * @member OutageMessageModule.businessController
     * @param {} context
     * @param (response:{Services : [{Description : string, DisplayDescription : string, WorkSchedule_Desc : string, IsSMSAlertActivated : string, IsAgreementActive : string, BeneficiarySMSCharge : string, TransactionFee_id : string, Channel_id : string, IsFutureTransaction : string, Name : string, IsOutageMessageActive : string, IsBeneficiarySMSAlertActivated : string, MinTransferLimit : string, MaxTransferLimit : string, createdby : string, DisplayName : string, HasWeekendOperation : string, id : string, TransactionCharges : string, TransactionFees : [], Status : string, Type_Name : string, Status_id : string, Channel : string, IsAuthorizationRequired : string, SMSCharges : string, TransferDenominations : string, Category_Name : string, IsCampaignActive : string, Code : string, WorkSchedule_id : string, Category_Id : string, IsTCActive : string, IsAlertActive : string, TransactionLimit_id : string, Type_id : string, PeriodicLimits : []}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.getServices = function(context, onSuccess, onError){
    ModelManager.invoke("service", "getService", context, onSuccess, onError);
  };


  /**
     * @name getPrivacyPolicy
     * @member StaticContentManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{privacypolicy : [], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.getPrivacyPolicy = function(payload, onSuccess, onError){
    ModelManager.invoke("privacyPolicy", "getPrivacyPolicy", payload, onSuccess, onError);
  };


  /**
     * @name addPrivacyPolicy
     * @member StaticContentManager.businessController
     * @param {user_ID : string, PrivacyPolicyData : {Status_id : string, Description : string, Channel_id : string}} createParam
     * @param (...callbackArgs:{PrivacyPolicyCreateStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.addPrivacyPolicy = function(createParam, onSuccess, onError){
    ModelManager.invoke("privacyPolicy", "createPrivacyPolicy", createParam, onSuccess, onError);
  };


  /**
     * @name updatePrivacyPolicy
     * @member StaticContentManager.businessController
     * @param {user_ID : string, PrivacyPolicyData : {Status_id : string, Description : string}} updateParam
     * @param (...callbackArgs:{PrivacyPolicyEditStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.updatePrivacyPolicy = function(updateParam, onSuccess, onError){
    ModelManager.invoke("privacyPolicy", "updatePrivacyPolicy", updateParam, onSuccess, onError);
  };


  /**
     * @name deletePrivacyPolicy
     * @member StaticContentManager.businessController
     * @param {user_ID : string, id : string} deleteParam
     * @param (...callbackArgs:{opstatus : number, PrivacyPolicyDeleteStatus : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  StaticContentManager.prototype.deletePrivacyPolicy = function(deleteParam, onSuccess, onError){
    ModelManager.invoke("privacyPolicy", "deletePrivacyPolicy", deleteParam, onSuccess, onError);
  };


  StaticContentManager.prototype.createService = function(createData, onSuccess, onError){
    ModelManager.invoke("service", "createService", createData, onSuccess, onError);
  };


  StaticContentManager.prototype.updateService = function(editedParamReq, onSuccess, onError){
    ModelManager.invoke("service", "updateService", editedParamReq, onSuccess, onError);
  };


  StaticContentManager.prototype.updateServiceStatus = function(editedParamReq, onSuccess, onError){
    ModelManager.invoke("service", "manageServiceStatus", editedParamReq, onSuccess, onError);
  };


  StaticContentManager.prototype.getServiceTypes = function(payload, onSuccess, onError){
    ModelManager.invoke("service", "getServiceTypes", {}, onSuccess, onError);
  };


  StaticContentManager.prototype.getServiceChannels = function(payload, onSuccess, onError){
    ModelManager.invoke("service", "getServiceChannels", {}, onSuccess, onError);
  };


  StaticContentManager.prototype.getServiceCategories = function(payload, onSuccess, onError){
    ModelManager.invoke("service", "getCategory", {}, onSuccess, onError);
  };


  StaticContentManager.prototype.getTermsAndCond = function(payload, onSuccess, onError){
    ModelManager.invoke("termsAndConditions", "getTermsAndConditions", {}, onSuccess, onError);
  };


  StaticContentManager.prototype.addTermsAndCond = function(createdData, onSuccess, onError){
    ModelManager.invoke("termsAndConditions", "createTermsAndConditions", createdData, onSuccess, onError);
  };


  StaticContentManager.prototype.updateTermsAndCond = function(editedData, onSuccess, onError){
    ModelManager.invoke("termsAndConditions", "updateTermsAndConditions", editedData, onSuccess, onError);
  };


  StaticContentManager.prototype.deleteTermsAndCond = function(deletedData, onSuccess, onError){
    ModelManager.invoke("termsAndConditions", "deleteTermsAndConditions", deletedData, onSuccess, onError);
  };

  return StaticContentManager;
});
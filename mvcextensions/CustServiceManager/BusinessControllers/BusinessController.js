define(['ModelManager'], function (ModelManager) {
  /**
     * CustServiceManager manages models: ServiceAndServiceComm, messageTemplate
     */
  function CustServiceManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(CustServiceManager, kony.mvc.Business.Delegator);

  CustServiceManager.prototype.initializeBusinessController = function () {

  };

  /**
   * @name createTemplate
   * @member CustServiceManager.businessController
   * @param {templateName : string, templateBody : string, additionalNote : string} context
   * @param (...callbackArgs:{operationStatusParam : string, operationStatusCodeParam : string, opstatus : number, operationRecord : {CreateMessageTemplate_359e62d6-3fce-4a56-af0a-bed238b63957 : string}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustServiceManager.prototype.createTemplate = function (context, onSuccess, onError) {
    ModelManager.invoke('messageTemplate', 'createMessageTemplate', context, onSuccess, onError);
  };

  /**
   * @name getTemplates
   * @member CustServiceManager.businessController
   * @param {} context
   * @param (...callbackArgs:{messagetemplate : [{lastmodifiedts : object, AdditionalInfo : object, creadtedts : object, createdby : object, id : object, synctimestamp : object, Body : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustServiceManager.prototype.getTemplates = function (context, onSuccess, onError) {
    ModelManager.invoke('messageTemplate', 'getMessageTemplate', context, onSuccess, onError);
  };

  /**
   * @name editTemplate
   * @member CustServiceManager.businessController
   * @param {templateID : string, templateName : string, templateBody : string, additionalNote : string} context
   * @param (...callbackArgs:{operationStatusParam : string, operationStatusCodeParam : string, opstatus : number, operationRecord : {UpdateMessageTemplate_359e62d6-3fce-4a56-af0a-bed238b63957 : string}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustServiceManager.prototype.editTemplate = function (context, onSuccess, onError) {
    ModelManager.invoke('messageTemplate', 'updateMessageTemplate', context, onSuccess, onError);
  };

  /**
   * @name deleteTemplate
   * @member CustServiceManager.businessController
   * @param string context
   * @param (...callbackArgs:{operationStatusParam : string, operationStatusCodeParam : string, opstatus : number, operationRecord : {DeleteMessageTemplate_359e62d6-3fce-4a56-af0a-bed238b63957 : string}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustServiceManager.prototype.deleteTemplate = function (context, onSuccess, onError) {
    var input = {
      templateID: context
    };
    ModelManager.invoke('messageTemplate', 'deleteMessageTemplate', input, onSuccess, onError);
  };

  /**
   * @name getTemplateByID
   * @member CustServiceManager.businessController
   * @param {templateID : string} context
   * @param (...callbackArgs:{messagetemplate : [{lastmodifiedts : object, AdditionalInfo : object, creadtedts : object, createdby : object, id : object, synctimestamp : object, Body : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  CustServiceManager.prototype.getTemplateByID = function (context, onSuccess, onError) {
    ModelManager.invoke('messageTemplate', 'getMessageTemplate', context, onSuccess, onError);
  };


  /**
     * @name getAllCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {} context
     * @param (...callbackArgs:{records : [{Service_id : object, Service_SoftDeleteFlag : object, Service_Name : object, Service_Status_id : object, Communication_Records : object, Service_Description : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustServiceManager.prototype.getAllCustomerCareInfo = function(context, onSuccess, onError){
    ModelManager.invoke("ServiceAndServiceComm", "getServiceAndServiceCommunicationRecords", context, onSuccess, onError);
  };


  /**
     * @name addCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {User_ID : string, Status_id : string, Service_Details : {Name : string, Channel_id : string, Description : string, Status_id : string}, Communication_Records : [{Priority : object, Value : object, Type : object, Status_id : object, Extension : object, Description : object}]} context
     * @param (...callbackArgs:{ManageCustomerServiceOperation : {CreateCustomerServiceStatus : string, ServiceResponse : string}, ManageCommunicationRecordsDataSet : [{a5ddb17d-9ee9-4e35-8ac1-afb602b2a007_CreateRequestStatus : object, a5ddb17d-9ee9-4e35-8ac1-afb602b2a007_ServiceResponse : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustServiceManager.prototype.addCustomerCareInfo = function(context, onSuccess, onError){
    ModelManager.invoke("ServiceAndServiceComm", "createServiceAndServiceCommunicationRecords", context, onSuccess, onError);
  };


  /**
     * @name editCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {User_ID : string, Status_id : string, Service_id : string, Service_Details : {Status_id : string}} context
     * @param (...callbackArgs:{ManageCustomerServiceOperation : {ServiceResponse : string, UpdateCustomerServiceStatus : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustServiceManager.prototype.editCustomerCareInfo = function(context, onSuccess, onError){
    ModelManager.invoke("ServiceAndServiceComm", "editServiceAndServiceCommunicationRecords", context, onSuccess, onError);
  };


  /**
     * @name deleteCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {User_ID : string, Service_id : string} context
     * @param (...callbackArgs:{DeleteCustomerServiceStatus : string, opstatus : number, DeleteCustomerServiceResponse : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustServiceManager.prototype.deleteCustomerCareInfo = function(context, onSuccess, onError){
    ModelManager.invoke("ServiceAndServiceComm", "deleteServiceAndServiceCommunicationRecords", context, onSuccess, onError);
  };

  return CustServiceManager;
});
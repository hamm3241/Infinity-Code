define([],function () {

    function CSRModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(CSRModule_BusinessController, kony.mvc.Business.Delegator);
    
    CSRModule_BusinessController.prototype.initializeBusinessController = function(){
    };

    CSRModule_BusinessController.prototype.getMessages = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getMessages(context, onSuccess, onError);
    };
    
    CSRModule_BusinessController.prototype.createMessage = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("SecurityOpsManager")
        .businessController.createMessage(context, onSuccess, onError);
    };
    
  
      /**
     * @name getRequests
     * @member CSRModule.businessController
     * @param {csrRepID : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string} context
     * @param (response:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customer_FirstName : object, customerrequest_Customer_id : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customerrequest_hasDraftMessage : object, customer_LastName : object, customerrequest_id : object, requestcategory_Name : object, customerrequest_createdby : object, customerrequest_Priority : object, customer_Salutation : object, customerrequest_RequestCategory_id : object, customerrequest_lastupdatedbycustomer : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, requestsSummary : {SID_ONHOLD : number, MY_QUEUE : number, FILTERED_REQUESTS : number, SID_DELETED : number, SID_CANCELLED : number, SID_INPROGRESS : number, SID_OPEN : number, SID_ARCHIVED : number, SID_RESOLVED : number}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.getRequests = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getRequests(context, onSuccess, onError);
    };
    
  
      /**
     * @name getMyRequests
     * @member CSRModule.businessController
     * @param {csrRepID : string, requestAssignedTo : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string} context
     * @param (response:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customer_FirstName : object, customerrequest_Customer_id : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customerrequest_hasDraftMessage : object, customer_LastName : object, customerrequest_id : object, requestcategory_Name : object, customerrequest_createdby : object, customerrequest_Priority : object, customer_Salutation : object, customerrequest_RequestCategory_id : object, customerrequest_lastupdatedbycustomer : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, requestsSummary : {SID_ONHOLD : number, MY_QUEUE : number, FILTERED_REQUESTS : number, SID_DELETED : number, SID_CANCELLED : number, SID_INPROGRESS : number, SID_OPEN : number, SID_ARCHIVED : number, SID_RESOLVED : number}, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.getMyRequests = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getMyRequests(context, onSuccess, onError);
    };
    
    CSRModule_BusinessController.prototype.createTemplate = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustServiceManager")
        .businessController.createTemplate(context, onSuccess, onError);
    };
    
      /**
     * @name getTemplates
     * @member CSRModule.businessController
     * @param {} context
     * @param (response:{messagetemplate : [{lastmodifiedts : object, AdditionalInfo : object, creadtedts : object, createdby : object, modifiedby : object, id : object, synctimestamp : object, Body : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.getTemplates = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustServiceManager")
        .businessController.getTemplates(context, onSuccess, onError);
    };
    
    CSRModule_BusinessController.prototype.editTemplate = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustServiceManager")
        .businessController.editTemplate(context, onSuccess, onError);
    };
    
    CSRModule_BusinessController.prototype.deleteTemplate = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustServiceManager")
        .businessController.deleteTemplate(context, onSuccess, onError);
    };
    
  
      /**
     * @name getRequestMessages
     * @member CSRModule.businessController
     * @param {requestID : string} context
     * @param (response:{records : [{customer_MiddleName : object, customer_Username : object, customerrequest_RequestSubject : object, customerrequest_Customer_id : object, customer_FirstName : object, MessageThread : object, customerrequest_lastmodifiedts : object, customerrequest_AssignedTo : object, customer_LastName : object, customerrequest_id : object, customer_Salutation : object, customerrequest_Priority : object, customerrequest_createdby : object, customerrequest_modifiedby : object, customer_Fullname : object, customerrequest_RequestCategory_id : object, customerEmail : object, customerrequest_Accountid : object, customerrequest_createdts : object, customerrequest_synctimestamp : object, customerrequest_softdeleteflag : object, customerrequest_Status_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.getRequestMessages = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getRequestMessages(context, onSuccess, onError);
    };
    
  
      /**
     * @name fetchInternalUsers
     * @member CSRModule.businessController
     * @param {} context
     * @param (response:{opstatus : number, internalusers_view : [{Home_CityID : object, Email : object, Home_AddressLine1 : object, Home_Zipcode : object, Work_Addr : object, Home_AddressLine2 : object, Home_CityName : object, Status_Desc : object, Home_AddressID : object, Home_Addr : object, createdts : object, Name : object, Work_AddressID : object, Home_StateID : object, Role_Desc : object, Role_Name : object, User_id : object, Work_CountryName : object, Work_CityID : object, Work_CityName : object, lastmodifiedts : object, Work_AddressLine2 : object, Status_id : object, FirstName : object, Work_AddressLine1 : object, MiddleName : object, Role_id : object, Home_CountryID : object, Work_StateName : object, Permission_Count : object, Work_StateID : object, Username : object, Home_StateName : object, Work_CountryID : object, Home_CountryName : object, LastName : object, Work_Zipcode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.fetchInternalUsers = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchInternalUsers(context, onSuccess, onError);
    };
    
  
      /**
     * @name getAllCategories
     * @member CSRModule.businessController
     * @param {} context
     * @param (response:{requestcategory : [{lastmodifiedts : object, createdby : object, modifiedby : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.getAllCategories = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getAllCategories(context, onSuccess, onError);
    };
    
    CSRModule_BusinessController.prototype.getTemplateByID = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustServiceManager")
        .businessController.getTemplateByID(context, onSuccess, onError);
    };
    
  
      /**
     * @name getListOfCustomersAndGroups
     * @member CSRModule.businessController
     * @param {} context
     * @param (response:{groupNames : string, opstatus : number, customerInfo : [{customer_MiddleName : object, customer_Username : object, customer_Gender : object, customer_Salutation : object, customer_FirstName : object, customercommunication_Value : object, customer_id : object, customer_LastName : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CSRModule_BusinessController.prototype.getListOfCustomersAndGroups = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getListOfCustomersAndGroups(context, onSuccess, onError);
    };
    

    CSRModule_BusinessController.prototype.customerSuggestions = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getCustomerSuggestions(context, onSuccess, onError);
    };
    
  
      /**
     * @name createNewCustomerRequest
     * @member CSRModule.businessController
     * @param {requestid : string, requestmessage_id : string, username : string, customer_id : string, priority : string, requestsubject : string, requeststatus : string, requestcategory_id : string, messagedescription : string, attachments : [], messagestatus : string} context
     * @param (response:{manageCustomerRequestRecord : {operationStatusParam : string, operationStatusCodeParam : number, ManageCustomerRequest : string}, opstatus : number, manageRequestMessageRecord : {operationStatusParam : string, operationStatusCodeParam : number, ManageRequestMessage : string, messageAttachmentsOperation : {attachmentsOperation : object}}, httpStatusCode : number})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    /*CSRModule_BusinessController.prototype.createNewCustomerRequest = function (context, onSuccess, onError) {
        try {
            var isRequestComplete = false;
            var mfURL =  KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];

            var authToken = KNYMobileFabric.currentClaimToken;
            var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
            var uploadURL = mfURL + "/services/data/v1/CustomerManagementObjService/operations/CustomerRequest/createNewCustomerRequest";

            var formData = new FormData();
            formData.append("X-Kony-Authorization", authToken);
            formData.append("user_ID", context.user_ID);

            formData.append("requestid", context.requestid);
            formData.append("messageid", context.messageid);
            formData.append("customer_id", context.customer_id);
            formData.append("recipientList", context.recipientList);
            formData.append("accountid", context.accountid);
            formData.append("requeststatus", context.requeststatus);
            formData.append("priority", context.priority);
            formData.append("requestsubject", context.requestsubject);
            formData.append("isAdminRequest", true);
            formData.append("requestcategory_id", context.requestcategory_id);
            formData.append("messagedescription", context.messagedescription);
            formData.append("messagestatus", context.messagestatus);
          
			if (context.mediaIds !== undefined)
                formData.append("mediaIds", "[" +context.mediaIds + "]");
            if (context.isNewRequest !== undefined)
                formData.append("isNewRequest", context.isNewRequest);
            if (context.isDiscardRequest !== undefined)
                formData.append("isDiscardRequest", context.isDiscardRequest);

            if (context.discardedAttachments !== undefined)
                formData.append("discardedAttachments", "[" + context.discardedAttachments + "]");

            if (context.attachments !== undefined) {
                formData.append("attachment1", context.attachments[0]);
                formData.append("attachment2", context.attachments[1]);
                formData.append("attachment3", context.attachments[2]);
                formData.append("attachment4", context.attachments[3]);
                formData.append("attachment5", context.attachments[4]);
            }
            //formData
            var xhr = new XMLHttpRequest();
            xhr.open('POST', uploadURL, true);
            var createTimeOut = function(){
              if(!isRequestComplete){
                createMessagesRunningAtBackground();
              }
              clearTimeout(timmer);
            }
            var createMessagesRunningAtBackground = function(){
                var response = {};
                response.context = "CREATING_MESSAGES_IN_BACKGROUND";
                onSuccess(response);
            }
            var timmer = setTimeout(createTimeOut, 28000);
            //xhr.setRequestHeader("Content-type", "multipart/form-data");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  isRequestComplete = true;
                  var response = JSON.parse(xhr.responseText);
                  onSuccess(response);
                }else if(xhr.readyState === 4 && (xhr.status === 504 || xhr.status === 0)){
                  isRequestComplete = true;
                  createMessagesRunningAtBackground();
                }else if (xhr.readyState === 4 && xhr.status !== 200) {
                  isRequestComplete = true;
                  onError();
                }
            };
            xhr.setRequestHeader("X-Kony-Authorization", KNYMobileFabric.currentClaimToken);
            xhr.send(formData);
        } catch (err) {
            onError(err);
        }
    };*/
  CSRModule_BusinessController.prototype.createNewCustomerRequest = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.createNewCustomerRequest(context, onSuccess, onError);
  };
  
      /**
     * @name updateCustomerRequest
     * @member CSRModule.businessController
     * @param {assignedto : string, requestid : string, requeststatus : string} context
     * @param (response:{opstatus : number, httpStatusCode : number})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  
  CSRModule_BusinessController.prototype.updateCustomerRequest = function (context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.updateCustomerRequest(context, onSuccess, onError);
  };
    CSRModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  CSRModule_BusinessController.prototype.assignRequests = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.assignRequests(context, onSuccess, onError);
  };
  
  CSRModule_BusinessController.prototype.createBinary = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.createBinary(context, onSuccess, onError);
  };

  CSRModule_BusinessController.prototype.updateBinary = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.updateBinary(context, onSuccess, onError);
  };
  
  CSRModule_BusinessController.prototype.getBinary = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.getBinary(context, onSuccess, onError);
  };
  
  CSRModule_BusinessController.prototype.discardMessageAttachments = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.discardMessageAttachments(context, onSuccess, onError);
  };

  CSRModule_BusinessController.prototype.createMeta = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.createMeta(context, onSuccess, onError);
  };
  
  CSRModule_BusinessController.prototype.updateMeta = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerManagementManager")
      .businessController.updateMeta(context, onSuccess, onError);
  };
  CSRModule_BusinessController.prototype.fetchKeyCloakUsers = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("KeyCloakManager")
      .businessController.getKeycloakUsers({}, onSuccess, onError);
  };
  CSRModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
    };
  return CSRModule_BusinessController;
});
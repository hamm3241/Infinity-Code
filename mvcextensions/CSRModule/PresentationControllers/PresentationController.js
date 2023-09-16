define(['ErrorInterceptor', 'ErrorIsNetworkDown'], function (ErrorInterceptor, isNetworkDown) {
  function CSR_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.listData = {users:null,
                        categories:null,
                     requests:null,
                     params:null
                       };
    this.requestFromCustomerModule = null;
    this.AsyncLoadingModel = {
      isAsyncLoading: false,
      currentCTR: 0,
      expectedCTR: 0
    };
    this.isKeyCloakLogin=null;
  }

  inheritsFrom(CSR_PresentationController, kony.mvc.Presentation.BasePresenter);

  CSR_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface("frmCSR",{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };

  
  CSR_PresentationController.prototype.showCSR = function(context) {
    kony.print("Inside showCSR() of CSR_PresentationController");
    this.presentUserInterface("frmCSR",context);
    //Dismiss loading indicator
    if (this.AsyncLoadingModel.isAsyncLoading) {
      this.AsyncLoadingModel.currentCTR++;
      if (this.AsyncLoadingModel.currentCTR === this.AsyncLoadingModel.expectedCTR) {
        this.presentUserInterface("frmCSR",{showLoading : false});
        this.AsyncLoadingModel.isAsyncLoading = false;
        this.AsyncLoadingModel.currentCTR = 0;
        this.AsyncLoadingModel.expectedCTR = 0;
      }
    } else {
      this.presentUserInterface("frmCSR",{showLoading : false});
    }
  };
  
    CSR_PresentationController.prototype.showCSRLoading = function() {
    kony.print("Inside showCSR() of CSR_PresentationController");
    this.presentUserInterface("frmCSR",{showLoading : true});
  };
  

      /**
     * @name fetchRequests
     * @member CSRModule.presentationController
     * @param {csrRepID : string, searchKey : string, requestAssignedTo : string, requestCategory : string, messageRepliedBy : string, dateInitialPoint : string, dateFinalPoint : string, requestStatusID : string, currPageIndex : number, sortCriteria : string, recordsPerPage : number, sortOrder : string} params
     */
  CSR_PresentationController.prototype.fetchRequests = function (params) { //messageType,sortByColumn,ascOrder
    var self = this; 

    function completionfetchRequestsCallback(response) {
        self.showCSR({
        messages: response,
        action: params.requestStatusID.indexOf("[")>=0?params.requestStatusID.replace("[", "").replace("]", ""):params.requestStatusID 
        
        });
    }
       
    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      } 
    this.showCSRLoading();
    this.businessController.getRequests(params, completionfetchRequestsCallback, onError);
  };
  
  
    /**
     * @name fetchRequestsFirst
     * @member CSRModule.presentationController
     * @param {csrRepID : string, requestStatusID : string, recordsPerPage : number, currPageIndex : string, sortCriteria : string, sortOrder : string, isFirstTime : boolean} params
     */
  CSR_PresentationController.prototype.fetchRequestsFirst = function (params) { //messageType,sortByColumn,ascOrder
    var self = this; 

    function completionfetchRequestsFirstCallback(response) {
      if (params.requestAssignedTo === undefined || params.requestAssignedTo === null || params.requestAssignedTo === "") {
        self.listData.requests = {
          messages: response,
          action: params.requestStatusID,
          params: params
        };
      } else {
        self.listData.requests = {
          messages: response,
          action: "MyQueue",
          params: params
        };
            }
        self.showCSR(self.listData);
    }
      
    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    } 
    this.showCSRLoading();
    this.businessController.getRequests(params, completionfetchRequestsFirstCallback, onError);
  };
  
  
      /**
     * @name fetchMyQueueRequests
     * @member CSRModule.presentationController
     * @param {csrRepID : string, requestAssignedTo : string, requestStatusID : string, recordsPerPage : number, currPageIndex : number, sortCriteria : string, sortOrder : string} params
     */
  CSR_PresentationController.prototype.fetchMyQueueRequests = function (params) {
    var self = this; 
      
    function completionFetchMyQueueRequestsCallback(response) {
         self.showCSR({
        messages: response,
        action: "myQueueRequests"
        });
    }
        
    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      } 
    this.showCSRLoading();
    this.businessController.getMyRequests(params, completionFetchMyQueueRequestsCallback, onError);
  };
  
  
      /**
     * @name fetchSearchRequests
     * @member CSRModule.presentationController
     * @param {csrRepID : string, searchKey : string, requestAssignedTo : string, requestCategory : string, messageRepliedBy : string, dateInitialPoint : string, dateFinalPoint : string, requestStatusID : string, currPageIndex : string, sortCriteria : string, recordsPerPage : number, sortOrder : string} params
     */
   CSR_PresentationController.prototype.fetchSearchRequests = function (params) {
    var self = this; 

    function completionFetchSearchRequestsCallback(response) {
         self.showCSR({
         messages: response,
         action: "searchRequests"
        });
     }
     function onError(error) {
       self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      }
     this.showCSRLoading();
     this.businessController.getRequests(params, completionFetchSearchRequestsCallback, onError);
  };
  
  
      /**
     * @name fetchQueueSearchMyRequests
     * @member CSRModule.presentationController
     * @param {csrRepID : string, searchKey : string, requestAssignedTo : string, recordsPerPage : number, requestStatusID : string, requestCategory : string, dateInitialPoint : string, dateFinalPoint : string, currPageIndex : string, sortCriteria : string, sortOrder : string} params
     */
  CSR_PresentationController.prototype.fetchQueueSearchMyRequests = function (params) {
    var self = this; 
        
    function completionFetchSearchMyRequestsCallback(response) {
      kony.print("response" + JSON.stringify(response));
        self.showCSR({
        messages: response,
        action: "searchMyRequests"
        });
      }

    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
     this.showCSRLoading();
    this.businessController.getRequests(params, completionFetchSearchMyRequestsCallback, onError);
  };
  
  
      /**
     * @name fetchEmailMessages
     * @member CSRModule.presentationController
     * @param {requestID : string} requestIDParam
     * @param string msgStatus
     * @param string requestId
     * @param string subject
     */
   CSR_PresentationController.prototype.fetchEmailMessages = function (requestIDParam, msgStatus, requestId, subject, isPriorityMessage) {
    var self = this; 
        
     function completionFetchEmailMessagesCallback(response) {
         self.showCSR({
         emailMessages: response,
         action: "emailMessages",
         msgStatus: msgStatus,
         requestId: requestId,
         subject: subject,
         isPriorityMessage: isPriorityMessage
         });
      } 

     function onError(error) {
       self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
     this.showCSRLoading();
     this.businessController.getRequestMessages(requestIDParam, completionFetchEmailMessagesCallback, onError);
  };  
  
  
      /**
     * @name fetchAssignedToUser
     * @member CSRModule.presentationController
     * 
     */
  CSR_PresentationController.prototype.fetchAssignedToUser = function () {
    var self = this; 

    function completionMessageDetailsCallback(response) {
      self.listData.users = {
        templates: response,
        action: "allUsers"
      };
      self.showCSR({"users":self.listData.users});
    }

    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    if(self.isKeyCloakLogin===true)
      this.businessController.fetchKeyCloakUsers({}, completionMessageDetailsCallback, onError);
    else
      this.businessController.fetchInternalUsers({}, completionMessageDetailsCallback, onError);
  };
  
  
      /**
     * @name fetchAllTemplates
     * @member CSRModule.presentationController
     * 
     */
   CSR_PresentationController.prototype.fetchAllTemplates = function () {
    var self = this; 

    function completionFetchAllTemplatesCallback(response) {
       self.showCSR({
         templates: response,
         action: "allTemplates"
       });
      }

     function onError(error) {
       self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
     this.showCSRLoading();
     this.businessController.getTemplates({}, completionFetchAllTemplatesCallback, onError);
  };
  
  CSR_PresentationController.prototype.fetchTemplateByID = function (param) {
    var self = this; 

    function completionFetchTemplateByIDCallback(response) {
      self.showCSR({
        templates: response,
        action: "TemplateDetails"
      });
      }

    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.showCSRLoading();
    this.businessController.getTemplateByID(param, completionFetchTemplateByIDCallback, onError);
  }; 
  
   CSR_PresentationController.prototype.fetchAllEmailTemplates = function () {
    var self = this; 

    function completionFetchAllTemplatesCallback(response) {
       self.showCSR({
         templates: response,
         action: "allEmailTemplates"
       });
      }

     function onError(error) {
       self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
     this.showCSRLoading();
     this.businessController.getTemplates({}, completionFetchAllTemplatesCallback, onError);
  };
  
   CSR_PresentationController.prototype.fetchEmailTemplates = function () {
    var self = this; 

    function completionFetchAllTemplatesCallback(response) {
       self.showCSR({
         templates: response,
         action: "emailTemplates"
       });
      }

     function onError(error) {
       self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
     this.showCSRLoading();
     this.businessController.getTemplates({}, completionFetchAllTemplatesCallback, onError);
  };
  

  CSR_PresentationController.prototype.createNewTemplate = function (dataToinsert) {
    var self = this; 

    function completioncreateTemplateCallback(response) {
      if (response.httpStatusCode === 0) {
        self.showToastMessage('Template Created Successfully', 'SUCCESS');
        self.fetchAllTemplates();
      } else {
        onError(response);
      }
         }

    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.showCSRLoading();
    this.businessController.createTemplate(dataToinsert, completioncreateTemplateCallback, onError);
  };

  CSR_PresentationController.prototype.deleteTemplate = function (dataToinsert) {
    var self = this; 

    function completiondeleteTemplateCallback(response) {
      self.showToastMessage('Template Deleted Successfully', 'SUCCESS');
        self.fetchAllTemplates();
         }

    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.showCSRLoading();
    this.businessController.deleteTemplate(dataToinsert, completiondeleteTemplateCallback, onError);
  };
  CSR_PresentationController.prototype.showToastMessage = function(message, status){
    this.presentUserInterface("frmCSR", {toast : {
      message : message,
      status : status
    }});
  };
  CSR_PresentationController.prototype.editTemplate = function (dataToinsert) {
    var self = this;

    function completioneditTemplateCallback(response) {
      if (response.httpStatusCode === 0) {
        self.showToastMessage('Template Saved Successfully', 'SUCCESS');
        self.fetchAllTemplates();
      } else {
        onError(response);
      }
    }

    function onError(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.showCSRLoading();
    this.businessController.editTemplate(dataToinsert, completioneditTemplateCallback, onError);
  };
  
  
      /**
     * @name createNewMessage
     * @member CSRModule.presentationController
     * @param {requestid : string, requestmessage_id : string, username : string, customer_id : string, priority : string, requestsubject : string, requeststatus : string, requestcategory_id : string, messagedescription : string, attachments : [], messagestatus : string} dataToinsert
     */
  CSR_PresentationController.prototype.createNewMessage = function(dataToinsert){
    var self = this; 
    function completionCreateMessageCallback(response) {
      if (response.context && response.context==="CREATING_MESSAGES_IN_BACKGROUND"){
        self.showCSR({
          message: {
            data: response
          },
          action:"createMessage",
          CREATING_MESSAGES_IN_BACKGROUND:true
        });
      }else if (response.dbpErrCode) {
         onError(response);
      } else {
         self.showCSR({
          message: {
            data: response
          },
          action: "createMessage"
        });
      }
    }
    function onError(response) {
          self.showToastMessage(ErrorInterceptor.errorMessage(response),'FAILURE');
    }
	this.showCSRLoading();
    this.businessController.createNewCustomerRequest(dataToinsert, completionCreateMessageCallback, onError);
  };
  
  
      /**
     * @name draftMessage
     * @member CSRModule.presentationController
     * @param {requestid : string, customer_id : string, username : string, requestmessage_id : string, accountid : string, priority : string, requestsubject : string, requeststatus : string, requestcategory_id : string, messagedescription : string, attachments : [], discardedAttachments : [], messagestatus : string} dataToinsert
     */
   CSR_PresentationController.prototype.draftMessage = function (dataToinsert) {
     var self = this;

     function completionCreateMessageCallback(response) { //kony.mvc.constants.STATUS_SUCCESS
       if (response[dataToinsert.username].requestMessage.statusCode === 0) {
         self.showCSR({
           message: {data : response, username: dataToinsert.username},
           action: "draftMessage"
         });
       } else {
         onError();
       }
     }

     function onError() {
       self.showToastMessage('Error while drafting message.', 'FAILURE');
     }
     this.showCSRLoading();
     this.businessController.createNewCustomerRequest(dataToinsert, completionCreateMessageCallback, onError);
   };
  
  
      /**
     * @name discardMessage
     * @member CSRModule.presentationController
     * @param {requestid : string, requestmessage_id : string, isNewRequest : boolean, isDiscardRequest : boolean, messagestatus : string} param
     */
    CSR_PresentationController.prototype.discardMessage = function (param) {
      var self = this;

      function completionDiscardCallback(response) {
        self.showCSR({
          message: {
            data: response
          },
          action: "discardMessage"
        });
      }

      function onError() {
        self.showToastMessage('Error in discard Message.', 'FAILURE');
      }
      this.showCSRLoading();
      this.businessController.createNewCustomerRequest(param, completionDiscardCallback, onError);
    };
  
   CSR_PresentationController.prototype.updateRequestStatus = function (param, currentStatus, showToastMsg) {
     var self = this;

     function completionUpdateRequestStatusCallback(response) {
       if (response[param.username].customerRequest.statusCode === 0) {
         self.showCSR({
           message: {
             data: response
           },
           action: "updateRequestStatus",
           currentStatus: currentStatus
         });
         if (showToastMsg){
           var messageText;
           if(currentStatus === kony.i18n.getLocalizedString("i18n.frmCSRController.Mark_as_IN_PROGRESS"))
             messageText =  kony.i18n.getLocalizedString("i18n.frmCSRController.Marked_IN_PROGRESS");
           else 
             messageText = kony.i18n.getLocalizedString("i18n.frmCSRController.Marked_RESOLVED");
           self.showToastMessage(messageText, 'SUCCESS');
         }
		} else {
         onError();
       }
     }

     function onError() {
       self.showToastMessage('Error in updateCustomerRequest.', 'FAILURE');
     }
     this.showCSRLoading();
     this.businessController.updateCustomerRequest(param, completionUpdateRequestStatusCallback, onError);
   };
  
  
      /**
     * @name updateAssignTo
     * @member CSRModule.presentationController
     * @param {assignedto : string, requestid : string, requeststatus : string} param
     */
    CSR_PresentationController.prototype.updateAssignTo = function (param) {
      var self = this;

      function completionUpdateAssignToCallback(response) {
        if (response[param.username].customerRequest.statusCode === 0) {
          self.showCSR({
            message: {data : response},
            action: "updateAssignTo"
          });
        } else {
          onError();
        }
      }

      function onError() {
        self.showToastMessage('Error in updateCustomerRequest.', 'FAILURE');
      }
      this.showCSRLoading();
      this.businessController.updateCustomerRequest(param, completionUpdateAssignToCallback, onError);
    };
  
   CSR_PresentationController.prototype.fetchAllCategories = function (params, requestFromCustomerModule) {
     var self = this;
      if (requestFromCustomerModule) {
        self.requestFromCustomerModule = requestFromCustomerModule;
      }
     function completioneditTemplateCallback(response) {
       self.listData.categories = {
         templates: response,
         action: "allCategories"
       };
       self.showCSR({"categories":self.listData.categories,"isKeyCloakEnabled":self.isKeyCloakLogin});
       self.listData.params = params;
     }

     function onError(error) {
       self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
     }
     this.showCSRLoading();

     this.AsyncLoadingModel.isAsyncLoading = true;
     this.AsyncLoadingModel.currentCTR = 0;
     this.AsyncLoadingModel.expectedCTR = 3;
     this.businessController.getAllCategories({}, completioneditTemplateCallback, onError);
     this.fetchAssignedToUser();

       if (params === undefined || params === null || params === "") {
         var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
         var params = {
           "csrRepID": user_ID,
           "requestStatusID": "[SID_OPEN]",
           "recordsPerPage": 40,
           "currPageIndex": "1",
           "sortCriteria": "",
           "sortOrder": "desc",
           "isFirstTime": true
         };
         this.fetchRequestsFirst(params);
       } else {
         this.fetchRequestsFirst(params);
       }
   };

  CSR_PresentationController.prototype.getRequestFromCustomerModule = function(){
    return this.requestFromCustomerModule;
  };

  CSR_PresentationController.prototype.setRequestFromCustomerModule = function(value){
    this.requestFromCustomerModule = value;
  };

  CSR_PresentationController.prototype.customerSuggestions = function (CustomerSuggestionsPriority,searchText) {
    var self = this; 
    function successCallBack(response) {
      var customers = response.customers;
      var serviceTypes = response.serviceType || [];
      var services = response.servicedefinition || [];
      for (var i = 0; i < serviceTypes.length; i++) {
        customers.push({
          "UserName": serviceTypes[i].description,
          "id": serviceTypes[i].id,
          "isServiceType": true,
          "isService":false
        });
      }
      for (var j = 0; j < services.length; j++) {
        customers.push({
          "UserName": services[j].name,
          "id": services[j].id,
          "isServiceType": false,
          "isService":true
        });
      }
      self.presentUserInterface("frmCSR",{"CustomerSuggestions" : customers, "CustomerSuggestionsPriority":CustomerSuggestionsPriority});
    }

    function errorCallBack(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }

    this.businessController.customerSuggestions({"searchText":searchText}, successCallBack, errorCallBack);
  };
  CSR_PresentationController.prototype.assignRequests = function (param) {
    var self = this;

    function completionUpdateAssignToCallback(response) {
      if (response.assignedRequests>0) {
        self.showCSR({
          message: {data : response},
          action: "updateAssignTo"
        });
      }
    }

    function onError() {
      self.showToastMessage('Error in assignRequests.', 'FAILURE');
    }
    this.showCSRLoading();
    this.businessController.assignRequests(param, completionUpdateAssignToCallback, onError);
  };

  CSR_PresentationController.prototype.createMedia = function (context) {
    var self = this, payload; 
    self.showCSRLoading();
    function successCallBack(response) {
      kony.print("Created media record without content field successfully");
      payload = {
        "id": response.id,
        "content": context.content,
        "file": context.file
      };
      self.createBinary(payload);  
    }
    function errorCallBack(error) {
      kony.print("Failed to create media record");
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      self.presentUserInterface("frmCSR", {showLoading : false});
    }
    payload = {
      "Name": context.file.name,
      "Size": context.file.size
    };
    this.businessController.createMeta(payload, successCallBack, errorCallBack);
  };

  CSR_PresentationController.prototype.createBinary = function (context) {
    var self = this, payload; 
    function successCallBack(response) {
      kony.print("Created media successfully with id : " + response.id);
      payload = {
        "mediaId" :  response.id,
        "file" : context.file
      };
      self.presentUserInterface("frmCSR", {"action" : "createMedia", "mediaObj" : payload, showLoading : false});
    }
    function errorCallBack(error) {
      kony.print("Failed to add content field in media record with id : " + context.id);
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      self.presentUserInterface("frmCSR", {showLoading : false});
    }
    payload = {
      "id": context.id,
      "fieldName": "Content",
      "data": context.content
    };
    this.businessController.createBinary(payload, successCallBack, errorCallBack);
  };

  CSR_PresentationController.prototype.discardMessageAttachments = function (context) {
    var self = this; 
    function successCallBack(response) {
      kony.print("Deleted media records successfully with ids : " + context);
    }
    function errorCallBack(error) {
      kony.print("Failed to delete media records with ids : " + context + ", error message - " + ErrorInterceptor.errorMessage(error));
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    this.businessController.discardMessageAttachments(context, successCallBack, errorCallBack);
  };
  
  CSR_PresentationController.prototype.getMediaContent = function (context) {
    var self = this; 
    function successCallBack(response) {
      kony.print("fetched media field successfully with id : " + context);
      self.presentUserInterface("frmCSR", {"action" : "getMediaContent", "mediaName" : context.mediaName, "mediaContent" : response.data, showLoading : false});
    }
    function errorCallBack(error) {
      kony.print("Failed to get media field with id : " + context + ", error message - " + ErrorInterceptor.errorMessage(error));
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
    }
    var payload ={
      "id" : context.mediaId,
      "fieldName" : "Content"
    };
    this.businessController.getBinary(payload, successCallBack, errorCallBack);
  };
  
  CSR_PresentationController.prototype.showMessages = function(){
    var self=this;
    
    function onFetchSuccess(response){
      self.isKeyCloakLogin = response.isKeyCloakEnabled;
      self.fetchAllCategories();
    }    
    function onFetchError(error){  
      self.showToastMessage(ErrorInterceptor.errorMessage(error), 'FAILURE');
      console.log("----ERROR: fetching login type " +ErrorInterceptor.errorMessage(error));
    }    
    this.businessController.getLoginTypeConfiguration({}, onFetchSuccess, onFetchError);
  };
  
  return CSR_PresentationController;
});
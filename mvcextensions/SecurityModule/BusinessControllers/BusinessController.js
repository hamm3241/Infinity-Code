define([],function () {

  function SecurityModule_BusinessController(){
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(SecurityModule_BusinessController, kony.mvc.Business.Delegator);

  SecurityModule_BusinessController.prototype.initializeBusinessController = function(){
  };
  
	 /**
     * @name getSecurityQuestions
     * @member SecurityModule.businessController
     * @param {} payload
     * @param (response:{records : [{lastmodifiedts : string, SecurityQuestion_Status : string, UserCount : string, SecurityQuestion_id : string, softdeleteflag : string, SecurityQuestion : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.getSecurityQuestions = function(payload, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.getSecurityQuestions(payload, onSuccess, onError);
  };
	
	/**
     * @name addSecurityQuestions
     * @member SecurityModule.businessController
     * @param {user_ID : string, SecurityQuestionsList : [{Question : string, Status_id : string}]} dataToinsert
     * @param (response:{Failed Insert Count : string, Successful Insert Count : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.addSecurityQuestions = function(dataToinsert, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.addSecurityQuestions(dataToinsert, onSuccess, onError);
  };
  
	 /**
     * @name editSecurityQuestions
     * @member SecurityModule.businessController
     * @param {user_ID : string, id : string, status_ID : string} segmentData
     * @param (response:{opstatus : number, updatedRecords : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.editSecurityQuestions = function(segmentData, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.editSecurityQuestions(segmentData, onSuccess, onError);
  };
	
	/**
     * @name deleteSecurityQuestions
     * @member SecurityModule.businessController
     * @param {user_ID : string, id : string} dataToDelete
     * @param (response:{deletedRecords : number, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.deleteSecurityQuestions = function(dataToDelete, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.deleteSecurityQuestions(dataToDelete, onSuccess, onError);
  };
  
	/**
     * @name getImages
     * @member SecurityModule.businessController
     * @param {} payload
     * @param (response:{records : [{UserCount : string, SecurityImage_id : string, SecurityImage_Status : string, softdeleteflag : string, SecurityImageBase64String : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.getImages = function(payload, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.getImages(payload, onSuccess, onError);
  };

  SecurityModule_BusinessController.prototype.addImage = function(imageJSON, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.addImage(imageJSON, onSuccess, onError);
  };
  
	/**
     * @name editImageStatus
     * @member SecurityModule.businessController
     * @param {id : string, status : string} editImageStatusJSON
     * @param (response:{records : [{UserCount : string, SecurityImage_id : string, SecurityImage_Status : string, softdeleteflag : string, SecurityImageBase64String : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.editImageStatus = function(editImageStatusJSON, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.editImageStatus(editImageStatusJSON, onSuccess, onError);
  };
	
	 /**
     * @name deleteImage
     * @member SecurityModule.businessController
     * @param {id : string} deleteImageJSON
     * @param (response:{records : [{UserCount : string, SecurityImage_id : string, SecurityImage_Status : string, softdeleteflag : string, SecurityImageBase64String : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.deleteImage = function(deleteImageJSON, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("SecurityOpsManager")
      .businessController.deleteImage(deleteImageJSON, onSuccess, onError);
  };
	
    /**
     * @name getPhraseStatus
     * @member SecurityModule.businessController
     * @param {} payload
     * @param (response:string)=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.getPhraseStatus = function(payload, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MasterDataManager")
      .businessController.getPhraseStatus(payload, onSuccess, onError);
  };
	
	 /**
     * @name editPhraseStatus
     * @member SecurityModule.businessController
     * @param {phraseStatus : number} phraseJSON
     * @param (response:{opstatus : number, updatedRecords : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityModule_BusinessController.prototype.editPhraseStatus = function(phraseJSON, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("MasterDataManager")
      .businessController.editPhraseStatus(phraseJSON, onSuccess, onError);
  };



  SecurityModule_BusinessController.prototype.execute = function(command){
    kony.mvc.Business.Controller.prototype.execute.call(this,command);
  };

  return SecurityModule_BusinessController;
});
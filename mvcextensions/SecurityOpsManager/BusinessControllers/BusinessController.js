define(['ModelManager'], function (ModelManager) {
  /**
     * SecurityOpsManager manages models: manageSecurityImages, manageSecurityQuestions
     */
  function SecurityOpsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(SecurityOpsManager, kony.mvc.Business.Delegator);

  SecurityOpsManager.prototype.initializeBusinessController = function () {

  };

  SecurityOpsManager.prototype.createMessage = function(payload, onSuccess, onError){
    ModelManager.invoke('manageSecurityQuestions', 'insertSecurityQuestions', payload, onSuccess, onError);
  };

	/**
     * @name getSecurityQuestions
     * @member SecurityModule.businessController
     * @param {} payload
     * @param (response:{records : [{lastmodifiedts : string, SecurityQuestion_Status : string, UserCount : string, SecurityQuestion_id : string, softdeleteflag : string, SecurityQuestion : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.getSecurityQuestions = function(payload, onSuccess, onError){
    ModelManager.invoke('manageSecurityQuestions', 'getSecurityQuestions', {}, onSuccess, onError);
  };

	/**
     * @name addSecurityQuestions
     * @member SecurityModule.businessController
     * @param {user_ID : string, SecurityQuestionsList : [{Question : string, Status_id : string}]} dataToinsert
     * @param (response:{Failed Insert Count : string, Successful Insert Count : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.addSecurityQuestions = function(payload, onSuccess, onError){
    ModelManager.invoke('manageSecurityQuestions', 'insertSecurityQuestions', payload, onSuccess, onError);
  };
	
	 /**
     * @name editSecurityQuestions
     * @member SecurityModule.businessController
     * @param {user_ID : string, id : string, status_ID : string} segmentData
     * @param (response:{opstatus : number, updatedRecords : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.editSecurityQuestions = function(payload, onSuccess, onError){
    ModelManager.invoke('manageSecurityQuestions', 'updateSecurityQuestion', payload, onSuccess, onError);
  };

	/**
     * @name deleteSecurityQuestions
     * @member SecurityModule.businessController
     * @param {user_ID : string, id : string} dataToDelete
     * @param (response:{deletedRecords : number, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.deleteSecurityQuestions = function(payload, onSuccess, onError){
    ModelManager.invoke('manageSecurityQuestions', 'deleteSecurityQuestion', payload, onSuccess, onError);
  };

	/**
     * @name getImages
     * @member SecurityModule.businessController
     * @param {} payload
     * @param (response:{records : [{UserCount : string, SecurityImage_id : string, SecurityImage_Status : string, softdeleteflag : string, SecurityImageBase64String : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.getImages = function(payload, onSuccess, onError){
    ModelManager.invoke('manageSecurityImages', 'getSecurityImages', {}, onSuccess, onError); 
  };

  SecurityOpsManager.prototype.addImage = function(payload, onSuccess, onError){
    kony.print("Inside addImage() of SecurityOpsManager.BusinessController");
    var self = this;

    var images_base64 = payload;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;
    var SecurityImagesList = [];

    for(var i=0; i<images_base64.length; ++i){
      SecurityImagesList[i] = {
        "ImageBase64String": images_base64[i],
        "createdby": "Kony User"
      };
    }

    var param =  {
      "user_ID": user_ID,
      "SecurityImagesList": SecurityImagesList
    };

    try{
      ModelManager.invoke('manageSecurityImages', 'insertSecurityImages', param, function(){
        self.getImages({}, onSuccess, onError);
      }, onError);
    }
    catch(err){
      onError(err);
    }

  };

	/**
     * @name editImageStatus
     * @member SecurityModule.businessController
     * @param {id : string, status : string} editImageStatusJSON
     * @param (response:{records : [{UserCount : string, SecurityImage_id : string, SecurityImage_Status : string, softdeleteflag : string, SecurityImageBase64String : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.editImageStatus = function(payload, onSuccess, onError){
    kony.print("Inside editImageStatus() of SecurityOpsManager.BusinessController");
    var self=this;

    var editImageStatusJSON = payload;
    var id=editImageStatusJSON.id;
    var status = editImageStatusJSON.status === "Deactivate" ? "SID_INACTIVE" : "SID_ACTIVE";
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var param = {"id": id, "user_ID": user_ID, "status_ID": status};

    try{
      ModelManager.invoke('manageSecurityImages', 'updateSecurityImages', param, function(){
        self.getImages({}, onSuccess, onError);
      }, onError);
    } 
    catch(err){
      kony.print("error: "+err);
    }
  };

	/**
     * @name deleteImage
     * @member SecurityModule.businessController
     * @param {id : string} deleteImageJSON
     * @param (response:{records : [{UserCount : string, SecurityImage_id : string, SecurityImage_Status : string, softdeleteflag : string, SecurityImageBase64String : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  SecurityOpsManager.prototype.deleteImage = function(payload, onSuccess, onError){
    kony.print("Inside deleteImage() of SecurityOpsManager.BusinessController");
    var self=this;

    var deleteImageJSON = payload;
    var id=deleteImageJSON.id;
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var param = {"id" : id, "user_ID" : user_ID};

    try{
      ModelManager.invoke('manageSecurityImages', 'deleteSecurityImages', param, function(){
        self.getImages({}, onSuccess, onError);
      }, onError);
    } 
    catch(error){
      kony.print("error: "+error);
    }
  };

  return SecurityOpsManager;
});
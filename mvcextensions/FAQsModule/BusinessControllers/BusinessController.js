define([],function () {

    function FAQsModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(FAQsModule_BusinessController, kony.mvc.Business.Delegator);
    
    FAQsModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	/**
     * @name fetchAllFAQs
     * @member FAQsModule.businessController
     * @param {} payload
     * @param (response:{records : [{CategoryId : object, Answer : object, QuestionCode : object, Status_id : object, CategoryName : object, Question : object, Channel_id : object, id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    FAQsModule_BusinessController.prototype.fetchAllFAQs = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.fetchAllFAQs(payload, onSuccess, onError);
    };
    /**
     * @name updateFAQs
     * @member FAQsModule.businessController
     * @param {listOfFAQs : [string], user_ID : string, Status_id : string} payload
     * @param (response:{SuccessEditRecordOps : {EditFAQ_FAQ_ID30 : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    FAQsModule_BusinessController.prototype.updateFAQs = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.updateFAQs(payload, onSuccess, onError);
    };
    
    FAQsModule_BusinessController.prototype.createFAQs = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.createFAQs(payload, onSuccess, onError);
    };
    /**
     * @name fetchCategories
     * @member FAQsModule.businessController
     * @param {} payload
     * @param (response:{opstatus : number, faqcategory : [{lastmodifiedts : object, createdby : object, modifiedby : object, id : object, synctimestamp : object, createdts : object, softdeleteflag : object, Name : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    FAQsModule_BusinessController.prototype.fetchCategories = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.fetchCategories(payload, onSuccess, onError);
    };
    
    FAQsModule_BusinessController.prototype.deleteFAQs = function(payload, onSuccess, onError){
        //TODO: move code from Command Handler File: FAQsModule/BusinessControllers/deleteFAQs_CommandHandler.js
        //Empty Command Handler Found
    };
    
    FAQsModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };

    return FAQsModule_BusinessController;
});
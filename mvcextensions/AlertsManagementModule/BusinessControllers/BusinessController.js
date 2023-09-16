define([],function () {

    function AlertsManagementModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(AlertsManagementModule_BusinessController, kony.mvc.Business.Delegator);
    
    AlertsManagementModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	/**
     * @name fetchAlertAndAlertTypes
     * @member AlertsManagementModule.businessController
     * @param {} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.fetchAlertAndAlertTypes = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.fetchAlertAndAlertTypes(context, onSuccess, onError);
    };
	/**
     * @name fetchAlertCategories
     * @member AlertsManagementModule.businessController
     * @param {} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */    
    AlertsManagementModule_BusinessController.prototype.fetchAlertCategories = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.fetchAlertCategories(context, onSuccess, onError);
    };
    /**
     * @name fetchAlertCategory
     * @member AlertsManagementModule.businessController
     * @param {} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
     AlertsManagementModule_BusinessController.prototype.fetchAlertCategory = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.fetchAlertCategory(context, onSuccess, onError);
    };
  /**
     * @name createAlertCategory
     * @member AlertsManagementModule.businessController
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.createAlertCategory = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.createAlertCategory(context, onSuccess, onError);
    };
  /**
     * @name editAlertCategory
     * @member AlertsManagementModule.businessController
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.editAlertCategory = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.editAlertCategory(context, onSuccess, onError);
    };
	  /**
     * @name updateAlertCategorySequence
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.updateAlertCategorySequence = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.reorderAlertCategory(context, onSuccess, onError);
    };
    
    /**
     * @name editAlertType
     * @member AlertsManagementModule.businessController
     * @param {alertTypeID : string, alertTypeName : string, alertTypeDescription : string, isAlertSubscriptionRequired : boolean} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.editAlertType = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.editAlertType(context, onSuccess, onError);
    };
 	/**
     * @name editAlert
     * @member AlertsManagementModule.businessController
     * @param {alertID : string, alertName : string, alertTypeID : string, alertDescription : string, status_ID : string, alertContent : string, isAlertEnabledOn_SMS : string, isAlertEnabledOn_Email : string, isAlertEnabledOn_Push : string, isAlertEnabledOn_All : string} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.editAlert = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.editAlert(context, onSuccess, onError);
    };
    /**
     * @name deleteAlert
     * @member AlertsManagementModule.businessController
     * @param {alertID : string} context
     * @param (response:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.deleteAlert = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.deleteAlert(context, onSuccess, onError);
    };
    /**
     * @name getAlertTypeDetails
     * @member AlertsManagementModule.businessController
     * @param {alert type ID : string} context
     * @param {accountTypes:[],alertSubTypes:[],alertTypeDefinition:{},appTypes:[],userTypes:[]}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertTypeDetails = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertTypeDetails(context, onSuccess, onError);
    };
    /**
     * @name getSubAlertDetails
     * @member AlertsManagementModule.businessController
     * @param {SubAlertId ID : string,TemplateStatus : string, Locale : string} context
     * @param {communicationTemplates:[],subAlertDefinition:{}}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getSubAlertDetails = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getSubAlertDetails(context, onSuccess, onError);
    };
    /**
     * @name getAlertAttributes
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertAttributes = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertAttributes(context, onSuccess, onError);
    };
    /**
     * @name getAlertAttributeConditions
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertAttributeConditions = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertAttributeConditions(context, onSuccess, onError);
    };
    /**
     * @name updateAlertTypeSequence
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.updateAlertTypeSequence = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.reorderAlertType(context, onSuccess, onError);
    };
    /**
     * @name getAllAppsList
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAllAppsList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.getApplications(context, onSuccess, onError);
    };
    /**
     * @name getAllUsersList
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAllUsersList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.getCustomerTypes(context, onSuccess, onError);
    };
    /**
     * @name getAllLocaleLanguagesList
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAllLocaleLanguagesList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.getLocales(context, onSuccess, onError);
    };
    /**
     * @name createAlertType
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.createAlertType = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.createAlertType(context, onSuccess, onError);
    };
    /**
     * @name createSubAlert
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.createSubAlert = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.createSubAlert(context, onSuccess, onError);
    };
    /**
     * @name editSubAlert
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.editSubAlert = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.editSubAlert(context, onSuccess, onError);
    };
    /**
     * @name editSubAlertStatus
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.editSubAlertStatus = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.editSubAlertStatus(context, onSuccess, onError);
    };
    /**
     * @name getVariableReferenceData
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getVariableReferenceData = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getVariableReferenceData(context, onSuccess, onError);
    };
        /**
     * @name getAlertCodes
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertCodes = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertCodes(context, onSuccess, onError);
    };
    /**
     * @name editAlertType
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.editAlertType = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.editAlertType(context, onSuccess, onError);
    };
    /**
     * @name getEventTypes
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getEventTypes = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getEventTypes(context, onSuccess, onError);
    };
    /**
     * @name getAccountTypes
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAccountTypes = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAccountTypes(context, onSuccess, onError);
    };
    /**
     * @name getAlertChannels
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertChannels = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertChannels(context, onSuccess, onError);
    };
    /**
     * @name getAlertFrequency
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertFrequency = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertFrequency(context, onSuccess, onError);
    };
    /**
     * @name reassignAlertType
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.reassignAlertType = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.reassignAlertType(context, onSuccess, onError);
    };
    /**
     * @name getAlertCategoriesByAccountType
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertCategoriesByAccountType = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertCategoriesByAccountType(context, onSuccess, onError);
    };
    /**
     * @name getAlertRecipientTypes
     * @member AlertsManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertsManagementModule_BusinessController.prototype.getAlertRecipientTypes = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AlertAndAlertTypesManager")
        .businessController.getAlertRecipientTypes(context, onSuccess, onError);
    };
    AlertsManagementModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };

    return AlertsManagementModule_BusinessController;
});
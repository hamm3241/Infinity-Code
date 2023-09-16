define(['ModelManager'], function (ModelManager) {
    /**
     * AlertAndAlertTypesManager manages models: alert, alertPreference, alertType
     */
    function AlertAndAlertTypesManager() {
        kony.mvc.Business.Delegator.call(this);
    }
    
    inheritsFrom(AlertAndAlertTypesManager, kony.mvc.Business.Delegator);
    
    AlertAndAlertTypesManager.prototype.initializeBusinessController = function () {
    
    };
    /**
     * @name fetchAlertAndAlertTypes
     * @member AlertAndAlertTypesManager.businessController
     * @param {} context
     * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.fetchAlertAndAlertTypes = function (context, onSuccess, onError) {
        ModelManager.invoke('alert', 'getAlertAndAlertTypes', {}, onSuccess, onError);
    };
    /**
     * @name fetchAlertCategories
     * @member AlertAndAlertTypesManager.businessController
     * @param {} context
     * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.fetchAlertCategories = function (context, onSuccess, onError) {
        ModelManager.invoke('alertcategory', 'getCustomerAlertCategories', context, onSuccess, onError);
    };
    /**
     * @name fetchAlertCategory
     * @member AlertAndAlertTypesManager.businessController
     * @param {} context
     * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.fetchAlertCategory = function (context, onSuccess, onError) {
        ModelManager.invoke('alertcategory', 'getAlertCategoryDefinition', context, onSuccess, onError);
    };	
   /**
     * @name editAlertCategory
     * @member AlertAndAlertTypesManager.businessController
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.createAlertCategory = function (context, onSuccess, onError) {
        ModelManager.invoke('alertcategory', 'createAlertCategory', context, onSuccess, onError);
    };
      /**
     * @name editAlertCategory
     * @member AlertAndAlertTypesManager.businessController
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.editAlertCategory = function (context, onSuccess, onError) {
        ModelManager.invoke('alertcategory', 'editAlertCategory', context, onSuccess, onError);
    };
	/**
     * @name reorderAlertCategory
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.reorderAlertCategory = function(context, onSuccess, onError){
        ModelManager.invoke('alertcategory','reorderAlertCategory', context, onSuccess, onError);
    };
      /**
     * @name getCustomerAlertCategoryPreference
     * @member AlertAndAlertTypesManager.businessController
     * @param {} context
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getCustomerAlertCategoryPreference = function (context, onSuccess, onError) {
        ModelManager.invoke('alertcategory', 'getCustomerAlertCategoryPreference', context, onSuccess, onError);
    };
	/**
     * @name getCustomerAlertCategoryChannelPreference
     * @member AlertAndAlertTypesManager.businessController
     * @param {} context
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getCustomerAlertCategoryChannelPreference = function(context, onSuccess, onError){
        ModelManager.invoke('alertcategory','getCustomerAlertCategoryChannelPreference', context, onSuccess, onError);
    };
	/**
     * @name getCustomerAlertTypePreference
     * @member AlertAndAlertTypesManager.businessController
     * @param {} context
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getCustomerAlertTypePreference = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','getCustomerAlertTypePreference', context, onSuccess, onError);
    };
    /**
     * @name editAlertType
     * @member AlertAndAlertTypesManager.businessController
     * @param {alertTypeID : string, alertTypeName : string, alertTypeDescription : string, isAlertSubscriptionRequired : boolean} context
     * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.editAlertType = function (context, onSuccess, onError) {
        ModelManager.invoke('alertType', 'updateAlertType', context, function(){
            ModelManager.invoke('alert', 'getAlertAndAlertTypes', {}, onSuccess, onError);
        }, onError);
    };
    /**
     * @name editAlert
     * @member AlertAndAlertTypesManager.businessController
     * @param {alertID : string, alertName : string, alertTypeID : string, alertDescription : string, status_ID : string, alertContent : string, isAlertEnabledOn_SMS : string, isAlertEnabledOn_Email : string, isAlertEnabledOn_Push : string, isAlertEnabledOn_All : string} context
     * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.editAlert = function (context, onSuccess, onError) {
        ModelManager.invoke('alert', 'updateAlert', context, function(){
            ModelManager.invoke('alert', 'getAlertAndAlertTypes', {}, onSuccess, onError);
        }, onError);
    };
    /**
     * @name deleteAlert
     * @member AlertAndAlertTypesManager.businessController
     * @param {alertID : string} context
     * @param (...callbackArgs:{VariableReference : [{vr_key : object, vr_value : object}], response : [{lastmodifiedts : object, Description : object, createdby : object, modifiedby : object, id : object, Alerts : object, synctimestamp : object, IsSubscriptionNeeded : object, createdts : object, softdeleteflag : object, Name : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.deleteAlert = function (context, onSuccess, onError) {
        ModelManager.invoke('alert', 'deleteAlert', context, function(){
            ModelManager.invoke('alert', 'getAlertAndAlertTypes', {}, onSuccess, onError);
        }, onError);
    };
    
    AlertAndAlertTypesManager.prototype.CustomerAlertsPrefrences = function(context, onSuccess, onError){
        ModelManager.invoke('alertPreference','getAlerts', context, onSuccess, onError);
    };
    /**
     * @name getAlertTypeDetails
     * @member AlertAndAlertTypesManager.businessController
     * @param {alert type ID : string} context
     * @param {accountTypes:[],alertSubTypes:[],alertTypeDefinition:{},appTypes:[],userTypes:[]}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertTypeDetails = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','getAlertTypeDefinition', context, onSuccess, onError);
    };
     /**
     * @name getSubAlertDetails
     * @member AlertAndAlertTypesManager.businessController
     * @param {SubAlertId ID : string,TemplateStatus : string, Locale : string} context
     * @param {communicationTemplates:[],subAlertDefinition:{}}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getSubAlertDetails = function(context, onSuccess, onError){
        ModelManager.invoke('alertsubtype','getAlertSubTypeDefinition', context, onSuccess, onError);
    };
  /**
     * @name getAlertAttributes
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertAttributes = function(context, onSuccess, onError){
        ModelManager.invoke('alertattribute','getAlertAttributes', context, onSuccess, onError);
    };
  /**
     * @name getAlertAttributeConditions
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertAttributeConditions = function(context, onSuccess, onError){
        ModelManager.invoke('alertcondition','getAlertConditions', context, onSuccess, onError);
    };
   /**
     * @name reorderAlertType
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.reorderAlertType = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','reorderAlertType', context, onSuccess, onError);
    };
    /**
     * @name createAlertType
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.createAlertType = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','createAlertType', context, onSuccess, onError);
    };
    /**
     * @name createSubAlert
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.createSubAlert = function(context, onSuccess, onError){
        ModelManager.invoke('alertsubtype','createAlertSubType', context, onSuccess, onError);
    };
    /**
     * @name editSubAlert
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.editSubAlert = function(context, onSuccess, onError){
        ModelManager.invoke('alertsubtype','editAlertSubType', context, onSuccess, onError);
    };
  /**
     * @name editSubAlertStatus
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.editSubAlertStatus = function(context, onSuccess, onError){
        ModelManager.invoke('alertsubtype','updateAlertSubTypeStatus', context, onSuccess, onError);
    };
    /**
     * @name getVariableReferenceData
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getVariableReferenceData = function(context, onSuccess, onError){
        ModelManager.invoke('alertcontentfield','getAlertContentFields', context, onSuccess, onError);
    };
        /**
     * @name getAlertCodes
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertCodes = function(context, onSuccess, onError){
        ModelManager.invoke('eventsubtype','getEventSubTypes', context, onSuccess, onError);
    };
    
    /**
     * @name editAlertType
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.editAlertType = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','editAlertType', context, onSuccess, onError);
    };
    /**
     * @name editAlertType
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getEventTypes = function(context, onSuccess, onError){
        ModelManager.invoke('eventtype','getEventTypes', context, onSuccess, onError);
    };
   /**
     * @name getAccountTypes
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAccountTypes = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','getAccountTypes', context, onSuccess, onError);
    };
    /**
     * @name setAlertPreferences
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.setAlertPreferences = function(context, onSuccess, onError){
        ModelManager.invoke('alertPreference','setAlertPreferences', context, onSuccess, onError);
    };
    /**
     * @name setAlertPreferences
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getCustomerAccountAlertSettings = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','getCustomerAccountAlertSettings', context, onSuccess, onError);
    };
  /**
     * @name getAlertChannels
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertChannels = function(context, onSuccess, onError){
        ModelManager.invoke('alertchannels','getAlertChannels', context, onSuccess, onError);
    };
    /**
     * @name getAlertFrequency
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertFrequency = function(context, onSuccess, onError){
        ModelManager.invoke('alertfrequency','getAlertFrequency', context, onSuccess, onError);
    };
    /**
     * @name reassignAlertType
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.reassignAlertType = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','reassignAlertType', context, onSuccess, onError);
    };
    /**
     * @name getAlertCategoriesByAccountType
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertCategoriesByAccountType = function(context, onSuccess, onError){
        ModelManager.invoke('alertType','getAlertCategoriesByAccountType', context, onSuccess, onError);
    };
  /**
     * @name getAlertRecipientTypes
     * @member AlertAndAlertTypesManager.businessController
     * @param {}
     * @param (...callbackArgs)=>any onError
     */
    AlertAndAlertTypesManager.prototype.getAlertRecipientTypes = function(context, onSuccess, onError){
        ModelManager.invoke('alertrecipient','getAlertRecipientTypes', context, onSuccess, onError);
    };
    return AlertAndAlertTypesManager;
});
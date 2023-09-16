define(['ModelManager'],function (ModelManager) {

    function ServicesManagementModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(ServicesManagementModule_BusinessController, kony.mvc.Business.Delegator);
    
    ServicesManagementModule_BusinessController.prototype.initializeBusinessController = function(){
    };
     /**
     * @name getServices
     * @member ServicesManagementModule.businessController
     * @param {} payload
     * @param (response:{{"features": [{"Service_Fee": "","Status_id": "","displayName": {},"name": "","description": "","id": "","roleTypes": [{"name": "","id": ""}],"Type_id": ""}]})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    ServicesManagementModule_BusinessController.prototype.getAllFeatures = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getAllFeatures(payload, onSuccess, onError);
    };
    
    ServicesManagementModule_BusinessController.prototype.updateService = function(editedParamReq, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.editFeatureAndActionLimits(editedParamReq, onSuccess, onError);
    };
    
    ServicesManagementModule_BusinessController.prototype.updateActionStatus = function(editedParamReq, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.manageActionStatus(editedParamReq, onSuccess, onError);
    };
    
     /**
     * @name getAllLocaleLanguagesList
     * @member  ServicesManagementModule.businessController
     * @param {}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    ServicesManagementModule_BusinessController.prototype.getAllLocaleLanguagesList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.getLocales(context, onSuccess, onError);
    };
  /**
     * @name getActionsOfFeature
     * @member  ServicesManagementModule.businessController
     * @param Payload: {"featureId":""}
     * @param ([{"termandcondition": {"en-US": {"contentType": "TEXT","content": ""}},"actionId": "","description": "","isMFAApplicable": "","limits": [{"type": "","value": ""}],"actionName": "","Type_id": ""}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    ServicesManagementModule_BusinessController.prototype.getActionsOfFeature = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getActionsOfFeature(context, onSuccess, onError);
    };
    
  /**
     * @name getLimitGroups
     * @member  ServicesManagementModule.businessController
     * @param Payload: {}
     * @param ({"limitGroupRecords":[{"name":"Account to account","description":"Account to account","id":"ACCOUNT_TO_ACCOUNT"},{"name":"Bulk payment","description":"Payment made for bulk payment","id":"BULK_PAYMENT"},{"name":"payment single","description":"single transaction","id":"SINGLE_PAYMENT"}],"opstatus":0,"httpStatusCode":0})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    ServicesManagementModule_BusinessController.prototype.getLimitGroups = function(context,onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.getLimitGroups(context,onSuccess, onError);
    };
    
    /**
     * @name editLimitGroup
     * @member  ServicesManagementModule.businessController
     * @param Payload: {}
     * @param ()=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    ServicesManagementModule_BusinessController.prototype.editLimitGroup = function(context,onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("MasterDataManager")
        .businessController.editLimitGroup(context,onSuccess, onError);
    };
    
    ServicesManagementModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  //[ELENA]: To delete this after getFacilities is implemented in Fabric and 
  //to use getAllFacilities function in our code to get facilities list
    ServicesManagementModule_BusinessController.prototype.getAllFeaturesAndActions = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getAllFeaturesAndActions(context, onSuccess, onError);
    };
    /** Get the list of all possible features and actions*/
    ServicesManagementModule_BusinessController.prototype.getAccountLevelFeatureAction = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getAccountLevelFeatureAction(context, onSuccess, onError);
    };  
  
    ServicesManagementModule_BusinessController.prototype.getAllFacilities = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BankProductManagmentManager")
        .businessController.getFacilities(context, onSuccess, onError);
    };
  
    /* Cal getFacility API with a given facilityId in order to get the features list*/
    ServicesManagementModule_BusinessController.prototype.getFacilityDetails = function(editedParamReq, context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BankProductManagmentManager")
        .businessController.getFacilities(editedParamReq, onSuccess, onError);
    };
  
    //Call to update a facility
    ServicesManagementModule_BusinessController.prototype.editFacility = function(editedParamReq, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BankProductManagmentManager")
        .businessController.editFacility(editedParamReq, onSuccess, onError);
    };
     //Call to add a facility
    ServicesManagementModule_BusinessController.prototype.createFacility = function(editedParamReq, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BankProductManagmentManager")
        .businessController.createFacility(editedParamReq, onSuccess, onError);
    };
  
  /* Call to get all employee features API */
    ServicesManagementModule_BusinessController.prototype.getAllEmployeeFeatures = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchEmployeeFeatures(context, onSuccess, onError);
    };
  
  ServicesManagementModule_BusinessController.prototype.getActionsOfEmployeeFeature = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchActionsOfEmployeeFeature(context, onSuccess, onError);
    };
  
    ServicesManagementModule_BusinessController.prototype.updateInternalUserFeatureActions = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.updateInternalUserFeatureActions(context, onSuccess, onError);
    };
    ServicesManagementModule_BusinessController.prototype.updateInternalUserActionStatus = function(context, onSuccess, onError) {
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.updateInternalUserActionStatus(context, onSuccess, onError);
    };

    return ServicesManagementModule_BusinessController;
});
define([],function () {

    function PermissionsModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(PermissionsModule_BusinessController, kony.mvc.Business.Delegator);
    
    PermissionsModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	/**
     * @name fetchPermissions
     * @member PermissionsModule.businessController
     * @param {} payload
     * @param (response:[{PermissionType_id : string, Permission_Desc : string, Permission_id : string, Permission_Name : string, Role_Count : string, Status_Desc : string, Status_id : string, Users_Count : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.fetchPermissions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchPermissions(payload, onSuccess, onError);
    };
    /**
     * @name changePermissionStatus
     * @member PermissionsModule.businessController
     * @param {Permission_id : string, Status_id : string} params
     * @param (response:{totalRecords : number, id : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.changePermissionStatus = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.changePermissionStatus(params, onSuccess, onError);
    };
  PermissionsModule_BusinessController.prototype.generatePermissionsList = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.generatePermissionsList(params, onSuccess, onError);
    };
    /**
     * @name getRolesDirectlyWithPermissions
     * @member PermissionsModule.businessController
     * @param {id : string} payload
     * @param (response:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.getRolesDirectlyWithPermissions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getRolesDirectlyWithPermissions(payload, onSuccess, onError);
    };
     /**
     * @name getUsersDirectlyWithPermissions
     * @member PermissionsModule.businessController
     * @param {id : string} params
     * @param (response:[{createdby : string, createdts : string, Email : string, FirstName : string, LastName : string, MiddleName : string, Permission_Description : string, Permission_id : string, Permission_Name : string, Permission_Status_id : string, softdeleteflag : string, updatedby : string, updatedts : string, UserName : string, User_id : string, User_Status_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.getUsersDirectlyWithPermissions = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getUsersDirectlyWithPermissions(params, onSuccess, onError);
    };
    /**
     * @name getActiveRoles
     * @member PermissionsModule.businessController
     * @param {} payload
     * @param (response:{roles_view : [{Status : object, role_Name : object, Status_id : object, role_id : object, permission_Count : object, Users_Count : object, Status_Desc : object, role_Desc : object, roleType_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.getActiveRoles = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getActiveRoles(payload, onSuccess, onError);
    };
    /**
     * @name getActiveUsers
     * @member PermissionsModule.businessController
     * @param {} payload
     * @param (response:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Status_id : string, UpdatedBy : string, UserID : string, Username : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.getActiveUsers = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getActiveUsers(payload, onSuccess, onError);
    };
    /**
     * @name updatePermissions
     * @member PermissionsModule.businessController
     * @param {permissionDetail : {id : string, Name : string, Description : string, Status_id : string}, addedTo : {rolesList : [], usersList : []}, removedFrom : {rolesList : [], usersList : []}, User_id : string} params
     * @param (...callbackArgs)=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    PermissionsModule_BusinessController.prototype.updatePermissions = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.updatePermissions(params, onSuccess, onError);
    };
  
  	PermissionsModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("AppConfigurationsManager")
      .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
    };
    
    PermissionsModule_BusinessController.prototype.getPermissionsCount = function(payload, onSuccess, onError){
        //TODO: move code from Command Handler File: PermissionsModule/BusinessControllers/GetPermissionsCount_CommandHandler.js
        //Empty Command Handler Found
    };
    
    PermissionsModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  return PermissionsModule_BusinessController;
});
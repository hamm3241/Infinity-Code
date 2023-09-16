define([],function () {

    function RoleModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(RoleModule_BusinessController, kony.mvc.Business.Delegator);
    
    RoleModule_BusinessController.prototype.initializeBusinessController = function(){
    };

    /**
     * @name fetchActivePermissions
     * @member RoleModule.businessController
     * @param {} payload
     * @param (response:[{PermissionType_id : string, Permission_Desc : string, Permission_id : string, Permission_Name : string, Role_Count : string, Status_Desc : string, Status_id : string, Users_Count : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.fetchActivePermissions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchActivePermissions(payload, onSuccess, onError);
    };
    
    /**
     * @name fetchActiveUsers
     * @member RoleModule.businessController
     * @param {} payload
     * @param (response:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Status_id : string, UpdatedBy : string, UserID : string, Username : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.fetchActiveUsers = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchActiveUsers(payload, onSuccess, onError);
    };
    
    /**
     * @name createRole
     * @member RoleModule.businessController
     * @param {Role_Name : string, Role_Desc : string, Status_id : string, system_user : string, Permission_ids : [string], User_ids : [string]} param
     * @param ()=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.createRole = function(param, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.createRole(param, onSuccess, onError);
    };
    
    /**
     * Used to get Roles List
     * @name fetchAllRoles
     * @member RoleModule.businessController
     * @param {} payload
     * @param (response:{roles_view : [{Status : string, role_Name : string, Status_id : string, role_id : string, permission_Count : string, Users_Count : string, Status_Desc : string, role_Desc : string, roleType_id : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.fetchAllRoles = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchAllRoles(payload, onSuccess, onError);
    };
    
    /**
     * @name updateRole
     * @member RoleModule.businessController
     * @param {User_id : string, Role_Details : {id : string, Name : string, Description : string, Status_id : string}, AssignedTo : {permissionsList : [], usersList : []}, RemovedFrom : {permissionsList : [], usersList : []}} param
     * @param ()=>any onSuccess
     * @param ()=>any onError
     */
    RoleModule_BusinessController.prototype.updateRole = function(param, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.updateRole(param, onSuccess, onError);
    };
    
    /**
     * @name fetchRolePermissions
     * @member RoleModule.businessController
     * @param string roleId
     * @param (response:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.fetchRolePermissions = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchRolePermissions(params, onSuccess, onError);
    };
    
    /**
     * @name fetchRoleUsers
     * @member RoleModule.businessController
     * @param string roleId
     * @param (response:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Role_id : string, Status_id : string, UpdatedBy : string, Username : string, User_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.fetchRoleUsers = function(roleId, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchRoleUsers(roleId, onSuccess, onError);
    };
    
    /**
     * @name updateRoleStatus
     * @member RoleModule.businessController
     * @param {User_id : string, Role_Details : {id : string, Status_id : string}} params
     * @param (...callbackArgs)=>any onSuccess
     * @param (error:{errcode : number, errmsg : string, opstatus : undefined, httpStatusCode : string, httpResponse : {response : string, headers : string, responsecode : string, url : string}})=>any onError
     */
    RoleModule_BusinessController.prototype.updateRoleStatus = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.updateRoleStatus(params, onSuccess, onError);
    };
    
    /**
     * @name getUserOrRoleCompositeActions
     * @member RoleModule.businessController
     * @param {Role_id : string, Permission_id : string} params
     * @param (response:{opstatus : number, CompositePermissions : [{Description : object, isEnabled : object, id : object, Action_id : object, Name : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.getUserOrRoleCompositeActions = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getUserOrRoleCompositeActions(params, onSuccess, onError);
    };
    RoleModule_BusinessController.prototype.generateRolesList = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.generateRolesList(params, onSuccess, onError);
    };
    
    /**
     * @name updateRoleCompositeActions
     * @member RoleModule.businessController
     * @param {roleId : string, addedCompositeActions : [], removedCompositeActions : [string]} params
     * @param (response:{initializeUserCompositeActionMapping : {insertAction: CPID10 : string}, opstatus : number, removedCompositePermissions : {permission: CPID10 : string, status : string}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.updateRoleCompositeActions = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.updateRoleCompositeActions(params, onSuccess, onError);
    };
   /**
     * @name getInternalRoleToCustomerRoleMapping
     * @member RoleModule.businessController
     * @param {"InternalRole_id":"RID_SUPERADMIN"} params
     * @param (...callbackArgs:{"internal_role_to_customer_role_mapping": [{"InternalRole_Name": "","InternalRole_Status_id": "","InternalRole_Description": "","CustomerRole_id": "","InternalRole_Type_id": "","CustomerRole_Status_id": "","InternalRole_id": "","CustomerRole_Description": "","CustomerRole_Type_id": "","CustomerRole_Name": ""}]})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    RoleModule_BusinessController.prototype.getInternalRoleToCustomerRoleMapping = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getInternalRoleToCustomerRoleMapping(params, onSuccess, onError);
    };
    /**
     * @name getAllCustomerRoles
     * @member RoleModule.businessController
     */
    RoleModule_BusinessController.prototype.getAllCustomerRoles = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getAllGroups(params, onSuccess, onError);
    };
  
    RoleModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
    };
   /**
    * @name getAllCustomerRoles
    * @member RoleModule.businessController
    */
    RoleModule_BusinessController.prototype.fetchAllServiceDefinitions = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ConfigurationsManager")
        .businessController.getServiceDefinitions(context, onSuccess, onError);
    };
    
    RoleModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };

    return RoleModule_BusinessController;
});
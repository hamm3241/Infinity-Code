define(['ModelManager'], function (ModelManager) {
  /**
     * RolesAndPermissionsManager manages models: DirectAndIndirectPermissionUsers, PermissionObject, managePermissions, permissions_view, role, role_view, rolepermission_view, roleuser_view, status, systemuser_view, userRole, userdirectpermission_view
     */
  function RolesAndPermissionsManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(RolesAndPermissionsManager, kony.mvc.Business.Delegator);

  RolesAndPermissionsManager.prototype.initializeBusinessController = function () {

  };

  /**
   * @name fetchAllRolePermissions
   * @member RolesAndPermissionsManager.businessController
   * @param {} payload
   * @param (...callbackArgs:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.fetchAllRolePermissions = function(payload, onSuccess, onError){
    ModelManager.invoke('rolepermission_view', 'getAll', payload, onSuccess, onError);
  };


    /**
     * Used to get Roles List
     * @name fetchAllRoles
     * @member RolesAndPermissionsManager.businessController
     * @param {} payload
     * @param (response:{roles_view : [{Status : string, role_Name : string, Status_id : string, role_id : string, permission_Count : string, Users_Count : string, Status_Desc : string, role_Desc : string, roleType_id : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.fetchAllRoles = function(payload, onSuccess, onError){
    ModelManager.invoke('role_view', 'getRoleList', payload, onSuccess, onError); 
  };

	/**
     * @name fetchPermissions
     * @member RolesAndPermissionsManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{PermissionType_id : string, Permission_Desc : string, Permission_id : string, Permission_Name : string, Role_Count : string, Status_Desc : string, Status_id : string, Users_Count : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.fetchPermissions = function(payload, onSuccess, onError){
    ModelManager.invoke('permissions_view', 'getAll', {}, onSuccess, onError);
  };

	/**
     * @name changePermissionStatus
     * @member RolesAndPermissionsManager.businessController
     * @param {Permission_id : string, Status_id : string} params
     * @param (...callbackArgs:{totalRecords : number, id : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.changePermissionStatus = function(params, onSuccess, onError){
    kony.print("Inside changePermissionStatus() of RolesAndPermissionsManager.BusinessController");
    var self=this;

    try {
      var permissionObjModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("PermissionObject");
      var permissionObject = new permissionObjModel({
        "id": params.Permission_id
      });
      permissionObject.Status_id = params.Status_id;
      var isString = function(string){
        return typeof string === 'string';
      };
      if (isString(params.Name) || isString(params.Description)) {
        permissionObject.Name = params.Name;
        permissionObject.Description = params.Description;
      }
      permissionObject.partialUpdate(ModelManager.callBackFrom(onSuccess, onError));
    } catch (err) {
      onError(err);
    }
  };

	/**
     * @name getRolesDirectlyWithPermissions
     * @member RolesAndPermissionsManager.businessController
     * @param {id : string} payload
     * @param (...callbackArgs:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.getRolesDirectlyWithPermissions = function(payload, onSuccess, onError){
    ModelManager.invoke('rolepermission_view', 'getAll', {}, onSuccess, onError);
  };

	/**
     * @name getUsersDirectlyWithPermissions
     * @member RolesAndPermissionsManager.businessController
     * @param {id : string} params
     * @param (...callbackArgs:[{createdby : string, createdts : string, Email : string, FirstName : string, LastName : string, MiddleName : string, Permission_Description : string, Permission_id : string, Permission_Name : string, Permission_Status_id : string, softdeleteflag : string, updatedby : string, updatedts : string, UserName : string, User_id : string, User_Status_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.getUsersDirectlyWithPermissions = function(params, onSuccess, onError){
    ModelManager.invoke('userdirectpermission_view', 'getByCriteria', kony.mvc.Expression.eq("$filter","Permission_id eq "+params.id), onSuccess, onError);
  };

	/**
     * @name getActiveRoles
     * @member RolesAndPermissionsManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{roles_view : [{Status : object, role_Name : object, Status_id : object, role_id : object, permission_Count : object, Users_Count : object, Status_Desc : object, role_Desc : object, roleType_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.getActiveRoles = function(payload, onSuccess, onError){
    ModelManager.invoke('role_view', 'getRoleList', {}, onSuccess, onError); 
  };

	/**
     * @name getActiveUsers
     * @member RolesAndPermissionsManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Status_id : string, UpdatedBy : string, UserID : string, Username : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.getActiveUsers = function(payload, onSuccess, onError){
    ModelManager.invoke('systemuser_view', 'getByCriteria', kony.mvc.Expression.eq("$filter","Status_id eq SID_ACTIVE"), onSuccess, onError);
  };

	/**
     * @name updatePermissions
     * @member RolesAndPermissionsManager.businessController
     * @param {permissionDetail : {id : string, Name : string, Description : string, Status_id : string}, addedTo : {rolesList : [], usersList : []}, removedFrom : {rolesList : [], usersList : []}, User_id : string} params
     * @param (...callbackArgs)=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  RolesAndPermissionsManager.prototype.updatePermissions = function(params, onSuccess, onError){
    var permissionModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("managePermissions");
    var PermissionObj = new permissionModel({"id": params.permissionDetail.id});
    PermissionObj.Permission_Details = params.permissionDetail;
    PermissionObj.AssignedTo = params.addedTo;
    PermissionObj.RemovedFrom = params.removedFrom;
    PermissionObj.User_id = params.User_id;
    permissionModel.updatePermission(PermissionObj, ModelManager.callBackFrom(onSuccess, onError));
  };

  /**
   * @name fetchActivePermissions
   * @member RolesAndPermissionsManager.businessController
   * @param {} payload
   * @param (...callbackArgs:[{PermissionType_id : string, Permission_Desc : string, Permission_id : string, Permission_Name : string, Role_Count : string, Status_Desc : string, Status_id : string, Users_Count : string}])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.fetchActivePermissions = function(payload, onSuccess, onError){
    ModelManager.invoke('permissions_view', 'getByCriteria', kony.mvc.Expression.eq("$filter","Status_id eq SID_ACTIVE"), onSuccess, onError);
  };

  /**
   * @name fetchActiveUsers
   * @member RolesAndPermissionsManager.businessController
   * @param {} payload
   * @param (...callbackArgs:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Status_id : string, UpdatedBy : string, UserID : string, Username : string}])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.fetchActiveUsers = function(payload, onSuccess, onError){
    ModelManager.invoke('systemuser_view', 'getByCriteria', kony.mvc.Expression.eq("$filter","Status_id eq SID_ACTIVE"), onSuccess, onError);
  };

  /**
   * @name createRole
   * @member RolesAndPermissionsManager.businessController
   * @param {Role_Name : string, Role_Desc : string, Status_id : string, system_user : string, Permission_ids : [string], User_ids : [string]} param
   * @param ()=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.createRole = function(param, onSuccess, onError){
    ModelManager.invoke('role', 'createRole', param, onSuccess, onError); 
  };

  /**
   * @name updateRole
   * @member RolesAndPermissionsManager.businessController
   * @param {User_id : string, Role_Details : {id : string, Name : string, Description : string, Status_id : string}, AssignedTo : {permissionsList : [string], usersList : []}, RemovedFrom : {permissionsList : [], usersList : []}} param
   * @param (...callbackArgs:{successStateRecord : {}, updateRoleResponse : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.updateRole = function(param, onSuccess, onError){
    ModelManager.invoke('role', 'manageRole', param, onSuccess, onError); 
  };

  /**
   * @name fetchRolePermissions
   * @member RolesAndPermissionsManager.businessController
   * @param string roleId
   * @param (...callbackArgs:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.fetchRolePermissions = function(params, onSuccess, onError){
    let param = {};
    if(params.legalEntityId){
      param = kony.mvc.Expression.and(kony.mvc.Expression.eq("$filter", "Role_id eq " + params.roleId + " and Permission_Status_id eq SID_ACTIVE"),
      kony.mvc.Expression.eq("legalEntityId", params.legalEntityId));
    } else {
      param = kony.mvc.Expression.eq("$filter", "Role_id eq " + params.roleId + " and Permission_Status_id eq SID_ACTIVE");
    }
    ModelManager.invoke('rolepermission_view', 'getByCriteria', param, onSuccess, onError);
  };

  /**
   * @name fetchRoleUsers
   * @member RolesAndPermissionsManager.businessController
   * @param string roleId
   * @param (...callbackArgs:[{Email : string, FirstName : string, LastModifiedTimeStamp : string, LastName : string, MiddleName : string, Role_id : string, Status_id : string, UpdatedBy : string, Username : string, User_id : string}])=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.fetchRoleUsers = function(roleId, onSuccess, onError){
    ModelManager.invoke('roleuser_view', 'getByCriteria', 
                        kony.mvc.Expression.eq("$filter","Role_id eq " + roleId ), onSuccess, onError);
  };

  /**
   * @name updateRoleStatus
   * @member RolesAndPermissionsManager.businessController
   * @param {User_id : string, Role_Details : {id : string, Status_id : string}} params
   * @param (...callbackArgs)=>any onSuccess
   * @param (error:{errcode : number, errmsg : string, opstatus : undefined, httpStatusCode : string, httpResponse : {response : string, headers : string, responsecode : string, url : string}})=>any onError
   */
  RolesAndPermissionsManager.prototype.updateRoleStatus = function(params, onSuccess, onError){
    ModelManager.invoke('role', 'manageRole', params, onSuccess, onError); 
  };


  /**
   * @name getUserOrRoleCompositeActions
   * @member RolesAndPermissionsManager.businessController
   * @param {Role_id : string, Permission_id : string} params
   * @param (response:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.getUserOrRoleCompositeActions = function(params, onSuccess, onError){
    ModelManager.invoke('role', 'getUserOrRoleCompositeActions', params, onSuccess, onError); 
  };
  RolesAndPermissionsManager.prototype.generateRolesList = function(params, onSuccess, onError){
    ModelManager.invoke('role', 'generateRolesList', params, onSuccess, onError); 
  };
  RolesAndPermissionsManager.prototype.generatePermissionsList = function(params, onSuccess, onError){
    ModelManager.invoke('permissions_view', 'generatePermissionsList', params, onSuccess, onError); 
  };

  /**
   * @name updateRoleCompositeActions
   * @member RolesAndPermissionsManager.businessController
   * @param {roleId : string, addedCompositeActions : [string], removedCompositeActions : []} params
   * @param (...callbackArgs:{addCompositePermissions : {permission: CPID10 : string, status : string}, initializeRoleCompositeActionMapping : {insertAction: CPID10 : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.updateRoleCompositeActions = function(params, onSuccess, onError){
    ModelManager.invoke('role', 'manageRoleCompositeActions', params, onSuccess, onError); 
  };
  
  /**
   * @name getInternalRoleToCustomerRoleMapping
   * @member RolesAndPermissionsManager.businessController
   * @param {"InternalRole_id":"RID_SUPERADMIN"} params
   * @param (...callbackArgs:{"internal_role_to_customer_role_mapping": [{"InternalRole_Name": "","InternalRole_Status_id": "","InternalRole_Description": "","CustomerRole_id": "","InternalRole_Type_id": "","CustomerRole_Status_id": "","InternalRole_id": "","CustomerRole_Description": "","CustomerRole_Type_id": "","CustomerRole_Name": ""}]})=>any onSuccess
   * @param (...callbackArgs)=>any onError
   */
  RolesAndPermissionsManager.prototype.getInternalRoleToCustomerRoleMapping = function(params, onSuccess, onError){
    ModelManager.invoke('role', 'getInternalRoleToCustomerRoleMapping', params, onSuccess, onError); 
  };

  return RolesAndPermissionsManager;
});
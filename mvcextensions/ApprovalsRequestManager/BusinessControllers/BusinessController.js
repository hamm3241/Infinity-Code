define(['ModelManager'], function (ModelManager) { 
    
    /**
     * User defined business controller
     * @constructor
     * @extends kony.mvc.Business.Delegator
     */
    function ApprovalsRequestManager() { 

        kony.mvc.Business.Delegator.call(this); 

    } 

    inheritsFrom(ApprovalsRequestManager, kony.mvc.Business.Delegator); 
  
  ApprovalsRequestManager.prototype.fetchApprovalsData = function (context, onSuccess, onError) {
    ModelManager.invoke('Requests', 'PendingApprovals', {}, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.fetchHistoryData = function (context, onSuccess, onError) {
    ModelManager.invoke('Requests', 'ApprovalHistory', {}, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.approveRole = function (context, onSuccess, onError) {
    ModelManager.invoke('ApprovalRequest', 'invokeApprovalWorkflow', context, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.approvePermission = function (context, onSuccess, onError) {
    this.invokeApprovalWorkFlow(context, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.approveUser = function (context, onSuccess, onError) {
    this.invokeApprovalWorkFlow(context, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.fetchPermissionById = function(param, onSuccess, onError){
    let params = kony.mvc.Expression.and(kony.mvc.Expression.eq("ExperienceAPIContext","Approval"), 
                                         kony.mvc.Expression.eq("$filter","Permission_id eq "+ param.permissionId), 
                                         kony.mvc.Expression.eq("RequestId", param.requestId));
    ModelManager.invoke('permissions_view', 'getByCriteria', params, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.getRolesDirectlyWithPermissions = function(param, onSuccess, onError){
    let params = kony.mvc.Expression.and(kony.mvc.Expression.eq("ExperienceAPIContext","Approval"),
                                         kony.mvc.Expression.eq("$filter","Permission_id eq " + param.permissionId), 
                                         kony.mvc.Expression.eq("RequestId", param.requestId)); 
    ModelManager.invoke('permissionrole_view', 'getByCriteria', params, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.getUsersDirectlyWithPermissions = function(param, onSuccess, onError){
    let params = kony.mvc.Expression.and(kony.mvc.Expression.eq("ExperienceAPIContext","Approval"), 
                                         kony.mvc.Expression.eq("$filter","Permission_id eq "+ param.permissionId), 
                                         kony.mvc.Expression.eq("RequestId", param.requestId));
    ModelManager.invoke('userdirectpermission_view', 'getByCriteria', params, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.fetchUserProfile = function(param, onSuccess, onError){
    let params = {
      "ExperienceAPIContext": "Approval",
      "RequestId": param.requestId,
      "User_id": param.userId
    };
    ModelManager.invoke('internalUserProfile_view', 'GetUserProfile', params, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
    ModelManager.invoke('LoginType', 'getLoginTypeConfiguration', context, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.fetchRolePermissions = function(param, onSuccess, onError){
    let params = kony.mvc.Expression.and(kony.mvc.Expression.eq("ExperienceAPIContext","Approval"),
                                         kony.mvc.Expression.eq("RequestId",param.requestId),  
                                         kony.mvc.Expression.eq("$filter","Role_id eq " + param.roleId + " and Permission_Status_id eq SID_ACTIVE"));
    ModelManager.invoke('rolepermission_view', 'getByCriteria',params, onSuccess, onError);
  };//ExperienceAPIContext=Approval&$filter=Role_id eq RID_IT_ADMINISTRATOR and Permission_Status_id eq SID_ACTIVE
  ApprovalsRequestManager.prototype.getInternalRoleToCustomerRoleMapping = function(param, onSuccess, onError){
    let params  = {
      "ExperienceAPIContext": "Approval",
      "RequestId": param.requestId,
      "InternalRole_id": param.roleId
    };
    ModelManager.invoke('role', 'getInternalRoleToCustomerRoleMapping', params, onSuccess, onError); 
  };
  ApprovalsRequestManager.prototype.fetchRoleUsers = function(param, onSuccess, onError){
    let params = kony.mvc.Expression.and(kony.mvc.Expression.eq("ExperienceAPIContext","Approval"),
                                         kony.mvc.Expression.eq("RequestId",param.requestId),   
                                         kony.mvc.Expression.eq("$filter","Role_id eq " + param.roleId));
    ModelManager.invoke('roleuser_view', 'getByCriteria', 
                       params, onSuccess, onError);
  };
  ApprovalsRequestManager.prototype.invokeApprovalWorkFlow = function (context, onSuccess, onError) {
    ModelManager.invoke('ApprovalRequest', 'invokeApprovalWorkflow', context, onSuccess, onError);
  };

  return ApprovalsRequestManager;

});
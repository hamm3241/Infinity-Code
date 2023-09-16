define([],function () {

    function ApprovalsRequestModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(ApprovalsRequestModule_BusinessController, kony.mvc.Business.Delegator);
    
    ApprovalsRequestModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	
	 /**
     * @name fetchDashBoardCounts
     * @member DashboardModule.businessController
     * @param {} context
     * @param (data:{categorySummary : [{requestcategory_Name : string, requestcategory_id : string, request_count : string}], opstatus : number, csrSummary : [{customerrequest_assignedTo : string, status_Description : string, request_count : string, customerrequest_Status_id : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    ApprovalsRequestModule_BusinessController.prototype.fetchApprovalsData = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.fetchApprovalsData(context, onSuccess, onError);
    };
  
  ApprovalsRequestModule_BusinessController.prototype.fetchHistoryData = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.fetchHistoryData(context, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.approveRole = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.approveRole(context, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.fetchRolePermissions = function(param, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.fetchRolePermissions(param, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.updatePermissionRequestStatus = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.approvePermission(context, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.updateUserRequestStatus = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.approveUser(context, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.fetchAllRolePermissions = function(param, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalsRequestManager")
      .businessController.fetchAllRolePermissions(param, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.fetchUserPermissions = function(param, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("ApprovalsRequestManager")
      .businessController.fetchUserPermissions(param, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.fetchPermissionById = function(param, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager().getModule("ApprovalsRequestManager")
    .businessController.fetchPermissionById(param, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.getRolesDirectlyWithPermissions = function(payload, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager().getModule("ApprovalsRequestManager")
    .businessController.getRolesDirectlyWithPermissions(payload, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.getUsersDirectlyWithPermissions = function(params, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager().getModule("ApprovalsRequestManager")
    .businessController.getUsersDirectlyWithPermissions(params, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.fetchUserProfile = function(data, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager().getModule("ApprovalsRequestManager")
    .businessController.fetchUserProfile(data, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.getLoginTypeConfiguration = function(data, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
    .getModuleManager().getModule("ApprovalsRequestManager")
    .businessController.getLoginTypeConfiguration(data, onSuccess, onError);
  };
  ApprovalsRequestModule_BusinessController.prototype.getInternalRoleToCustomerRoleMapping = function(params, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.getInternalRoleToCustomerRoleMapping(params, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.fetchAllServiceDefinitions = function(context, onSuccess, onError) {
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ConfigurationsManager")
        .businessController.getServiceDefinitions(context, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.fetchRoleUsers = function(param, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ApprovalsRequestManager")
        .businessController.fetchRoleUsers(param, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
    };
  ApprovalsRequestModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };

    return ApprovalsRequestModule_BusinessController;
});
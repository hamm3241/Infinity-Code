define([],function () {

    function DashboardModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(DashboardModule_BusinessController, kony.mvc.Business.Delegator);
    
    DashboardModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	
	 /**
     * @name fetchDashBoardCounts
     * @member DashboardModule.businessController
     * @param {} context
     * @param (data:{categorySummary : [{requestcategory_Name : string, requestcategory_id : string, request_count : string}], opstatus : number, csrSummary : [{customerrequest_assignedTo : string, status_Description : string, request_count : string, customerrequest_Status_id : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    DashboardModule_BusinessController.prototype.fetchDashBoardCounts = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("DashboardManager")
        .businessController.fetchDashBoardCounts(context, onSuccess, onError);
    };
  
  DashboardModule_BusinessController.prototype.fetchApprovalsData = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("DashboardManager")
        .businessController.fetchApprovalsData(context, onSuccess, onError);
    };
    
	 /**
     * @name fetchDashBoardAlerts
     * @member DashboardModule.businessController
     * @param {} context
     * @param (data:[{Type : string, Description : string, created : string, Priority : string, Title : string, id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    DashboardModule_BusinessController.prototype.fetchDashBoardAlerts = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("DashboardManager")
        .businessController.fetchDashBoardAlerts(context, onSuccess, onError);
    };
  
  DashboardModule_BusinessController.prototype.fetchApprovalsCount = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("DashboardManager")
      .businessController.fetchApprovalsCount(context, onSuccess, onError);
  };
    
    
    
    DashboardModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };

    return DashboardModule_BusinessController;
});
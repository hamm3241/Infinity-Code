define(['ModelManager'], function (ModelManager) {
    /**
     * DashboardManager manages models: CustomerRequestSummary, dashboardalerts
     */
    function DashboardManager() {
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(DashboardManager, kony.mvc.Business.Delegator);

    DashboardManager.prototype.initializeBusinessController = function () {

    };
	 
	 /**
     * @name fetchDashBoardCounts
     * @member DashboardManager.businessController
     * @param {} context
     * @param (...callbackArgs:{categorySummary : [{requestcategory_Name : string, requestcategory_id : string, request_count : string}], opstatus : number, csrSummary : [{customerrequest_assignedTo : string, status_Description : string, request_count : string, customerrequest_Status_id : string}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    DashboardManager.prototype.fetchDashBoardCounts = function (context, onSuccess, onError) {
        ModelManager.invoke('CustomerRequestSummary', 'getRequestSummaryCount', {}, onSuccess, onError);
    };
  
  DashboardManager.prototype.fetchApprovalsData = function (context, onSuccess, onError) {
        ModelManager.invoke('Requests', 'PendingApprovals', {}, onSuccess, onError);
    };
  
  DashboardManager.prototype.fetchApprovalsCount = function (context, onSuccess, onError) {
    ModelManager.invoke('Requests', 'getCounts', {}, onSuccess, onError);
  };

	/**
     * @name fetchDashBoardAlerts
     * @member DashboardManager.businessController
     * @param {} context
     * @param (...callbackArgs:[{Type : string, Description : string, created : string, Priority : string, Title : string, id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    DashboardManager.prototype.fetchDashBoardAlerts = function (context, onSuccess, onError) {
        ModelManager.invoke('dashboardalerts', 'GetDashboardAlerts', {}, onSuccess, onError);
    };
  
  /**
     * @name getJWTToken
     * @member DashboardManager.businessController
     * @param {} context
     * @param (...callbackArgs:[{Type : string, Description : string, created : string, Priority : string, Title : string, id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    DashboardManager.prototype.getJWTToken = function (context, onSuccess, onError) {
        ModelManager.invoke('Analytics', 'GetJWTToken', {}, onSuccess, onError);
    };

    return DashboardManager;
});
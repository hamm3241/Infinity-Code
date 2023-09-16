define(['ModelManager'], function (ModelManager) {
    /**
     * CustomerGroupsAndEntitlManager manages models: Group, GroupCustomers, GroupEntitlements, GroupRecords
     */
    function CustomerGroupsAndEntitlManager() {
        kony.mvc.Business.Delegator.call(this);
    }
    
    inheritsFrom(CustomerGroupsAndEntitlManager, kony.mvc.Business.Delegator);
    
    CustomerGroupsAndEntitlManager.prototype.initializeBusinessController = function () {
    
    };
    
	/**
     * @name getCustomerGroupsView
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:[{Customers_Count : string, Entitlements_Count : string, Group_Desc : string, Group_id : string, Group_Name : string, Status_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsAndEntitlManager.prototype.getCustomerGroupsView = function (context, onSuccess, onError) {
        ModelManager.invoke('Groups', 'getGroups', context, onSuccess, onError);
    };
    
	/**
     * @name updateCustomerGroups
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string, Status_id : string, Name : string, Description : string, User_id : string, removedEntitlementIds : [], addedEntitlementIds : [], removedCustomerIds : [{Customer_id : string}], addedCustomerIds : []} context
     * @param (response:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */	
    CustomerGroupsAndEntitlManager.prototype.updateCustomerGroups = function (context, onSuccess, onError) {
        ModelManager.invoke('Group', 'editGroup', context, onSuccess, onError);
    };

	/**
     * @name updateCustomerGroupStatus
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string, Status_id : string, User_id : string} context
     * @param (response:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsAndEntitlManager.prototype.updateCustomerGroupStatus = function (context, onSuccess, onError) {
        ModelManager.invoke('Group', 'manageStatus', context, onSuccess, onError);
    };
    
	/**
     * @name addCustomerGroups
     * @member CustomerGroupsModule.businessController
     * @param {Name : string, Description : string, Status_id : string, User_id : string, Entitlements : [{Service_id : string, TransactionFee_id : string, TransactionLimit_id : string}], Customers : [{Customer_id : string}]} context
     * @param (response:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsAndEntitlManager.prototype.addCustomerGroups = function (context, onSuccess, onError) {
        ModelManager.invoke('Group', 'createGroup', {
            "name": context.name,
            "description": context.description,
            "status": context.status,
            "User_id": context.User_id,
            "typeId" : context.typeId,
            "isEAgreementActive" : context.isEAgreementActive,
            "servicedefinitions" : JSON.stringify(context.servicedefinitions),
            "featureactions": JSON.stringify(context.featureactions),
             "legalEntityId": idForCreate,
            "isApplicabletoAllServices": context.isApplicabletoAllServices
        }, onSuccess, onError);
    };
  
  CustomerGroupsAndEntitlManager.prototype.getCustomerGroupsWithEntity = function (context, onSuccess, onError) {
        ModelManager.invoke('Groups', 'getGroups', {
            "legalEntityId": context
        }, onSuccess, onError);
    };
    
	 /**
     * @name getEntitlements
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string} context
     * @param (response:[{Description : string, Group_id : string, Name : string, Service_id : string, TransactionFee_id : string, TransactionLimit_id : string, entId : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsAndEntitlManager.prototype.getEntitlements = function (context, onSuccess, onError) {
        ModelManager.invoke('GroupEntitlements', 'getGroupEntitlements', {
            "Group_id": context.Group_id
        }, onSuccess, onError);
    };
    
	 /**
     * @name getGroupCustomers
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string} context
     * @param (response:[{Customer_id : string, Email : string, FullName : string, Group_id : null, Status_id : string, UpdatedBy : string, UpdatedOn : string, Username : string, cusId : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsAndEntitlManager.prototype.getGroupCustomers = function(context, onSuccess, onError){
        ModelManager.invoke('GroupCustomers', 'getGroupCustomers', {
            "Group_id": context.Group_id
        }, onSuccess, onError);
    };

	 /**
     * @name getRoles
     * @member CustomerGroupsAndEntitlManager.businessController
     * @param {} context
     * @param (response:[)=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerGroupsAndEntitlManager.prototype.getRoles = function(context, onSuccess, onError){
    ModelManager.invoke('GroupRecords', 'getGroups', context, onSuccess, onError);
  };
	 /**
     * @name getGroupEntitlements
     * @member CustomerGroupsAndEntitlManager.businessController
     * @param {} context
     * @param (response:[)=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerGroupsAndEntitlManager.prototype.getGroupEntitlements = function(context, onSuccess, onError){
    ModelManager.invoke('GroupEntitlements', 'getGroupEntitlements', context, onSuccess, onError);
  };
  /**
     * @name importCustomersForGroup
     * @member CustomerGroupsAndEntitlManager.businessController
     * @param {} context
     * @param (response:[)=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  /*CustomerGroupsAndEntitlManager.prototype.importCustomersForGroup = function(context, onSuccess, onError){
   // ModelManager.invoke('Group', 'CustomerAssignRole', context, onSuccess, onError);
    try{

      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];

      var authToken = KNYMobileFabric.currentClaimToken;
      var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

      var csvFile = context.file;
      var uploadURL = mfURL + "/services/data/v1/CustomerGroupsAndEntitlObjSvc/operations/Group/CustomerAssignRole";

      var formData = new FormData();
      formData.append("roleId", context.roleId);
      formData.append("file", csvFile);
      formData.append("User_id", context.User_id);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', uploadURL, true);
      xhr.setRequestHeader("X-Kony-Authorization", authToken);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)  {
          var responseJSON = JSON.parse(xhr.responseText);
          if(responseJSON.dbpErrCode || responseJSON.dbpErrMsg){ //FAILURE
            onError(responseJSON);
          } else{ //SUCCESS
            onSuccess(responseJSON);
          }
        }
        else if(xhr.status !== 200) {
          onError("Import locations server error");
        }
      };
      xhr.send(formData);
    }

    catch(err){
      self.sendResponse(command,kony.mvc.constants.STATUS_FAILURE,err);
    }
  };*/
  
  CustomerGroupsAndEntitlManager.prototype.importCustomersForGroup = function(context, onSuccess, onError){
    ModelManager.invoke('Group', 'CustomerAssignRole', context, onSuccess, onError);
  };
  /**
     * @name getImportStatusIdList
     * @member CustomerGroupsAndEntitlManager.businessController
     * @param {} context
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  CustomerGroupsAndEntitlManager.prototype.getImportStatusIdList = function(context, onSuccess, onError){
    ModelManager.invoke('Group', 'FetchEntityStatus', context, onSuccess, onError);
  };
  CustomerGroupsAndEntitlManager.prototype.getGroupFeaturesAndActions  = function(context, onSuccess, onError){
    ModelManager.invoke('GroupFeatures', 'getGroupFeaturesAndActions', context, onSuccess, onError);
  };
  /**
     * @name getGroupFeaturesAndActionsForEdit
     * @member CustomerGroupsAndEntitlManager.businessController
     */
  CustomerGroupsAndEntitlManager.prototype.getGroupFeaturesAndActionsForEdit  = function(context, onSuccess, onError){
    ModelManager.invoke('GroupFeatures', 'getGroupFeaturesAndActionsForEdit', context, onSuccess, onError);
  };
   CustomerGroupsAndEntitlManager.prototype.getGroupBusinessTypeCustomers  = function(context, onSuccess, onError){
    ModelManager.invoke('GroupCustomers', 'getGroupBusinessTypeCustomers', context, onSuccess, onError);
  };
  
    return CustomerGroupsAndEntitlManager;
});
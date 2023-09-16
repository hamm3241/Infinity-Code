define([],function () {

    function CustomerGroupsModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(CustomerGroupsModule_BusinessController, kony.mvc.Business.Delegator);
    
    CustomerGroupsModule_BusinessController.prototype.initializeBusinessController = function(){
    };

	/**
     * @name getCustomerGroupsView
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:[{Customers_Count : string, Entitlements_Count : string, Group_Desc : string, Group_id : string, Group_Name : string, Status_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getCustomerGroupsView = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getCustomerGroupsView(context, onSuccess, onError);
    };
    
	 /**
     * @name updateCustomerGroups
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string, Status_id : string, Name : string, Description : string, User_id : string, removedEntitlementIds : [], addedEntitlementIds : [], removedCustomerIds : [{Customer_id : string}], addedCustomerIds : []} context
     * @param (response:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */	
    CustomerGroupsModule_BusinessController.prototype.updateCustomerGroups = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.updateCustomerGroups(context, onSuccess, onError);
    };
    
	 /**
     * @name updateCustomerGroupStatus
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string, Status_id : string, User_id : string} context
     * @param (response:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.updateCustomerGroupStatus = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.updateCustomerGroupStatus(context, onSuccess, onError);
    };
    
	/**
     * @name addCustomerGroups
     * @member CustomerGroupsModule.businessController
     * @param {Name : string, Description : string, Status_id : string, User_id : string, Entitlements : [{Service_id : string, TransactionFee_id : string, TransactionLimit_id : string}], Customers : [{Customer_id : string}]} context
     * @param (response:{Status : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.addCustomerGroups = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.addCustomerGroups(context, onSuccess, onError);
    };
    
	 /**
     * @name getEntitlements
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string} context
     * @param (response:[{Description : string, Group_id : string, Name : string, Service_id : string, TransactionFee_id : string, TransactionLimit_id : string, entId : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getEntitlements = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getEntitlements(context, onSuccess, onError);
    };

    CustomerGroupsModule_BusinessController.prototype.getBusinessTypes = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("BusinessBankingManager")
        .businessController.getBusinessTypes(context, onSuccess, onError);
    };
  
  	CustomerGroupsModule_BusinessController.prototype.getServiceDefinitions = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("ConfigurationsManager")
        .businessController.getServiceDefinitions(context, onSuccess, onError);
    };
    
	 /**
     * @name searchCustomers
     * @member CustomerGroupsModule.businessController
     * @param {_searchType : string, _name : string, _id : string, _username : string, _branchIDS : null, _productIDS : null, _cityIDS : null, _entitlementIDS : null, _groupIDS : null, _customerStatus : null, _before : null, _after : null, _pageOffset : string, _pageSize : number, _sortVariable : string, _sortDirection : string} context
     * @param (response:{statuscode : number, Status : string, SortVariable : string, SortDirection : string, PageSize : number, records : [{City_name : string, FirstName : string, City_id : string, Gender : string, MiddleName : string, Salutation : string, Username : string, branch_id : string, customer_status : string, branch_name : string, name : string, id : string, LastName : string}], opstatus : number, TotalResultsFound : number, PageOffset : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.searchCustomers = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.searchCustomersForGroup(context, onSuccess, onError);
    };
    
	 /**
     * @name getGroupCustomers
     * @member CustomerGroupsModule.businessController
     * @param {Group_id : string} context
     * @param (response:[{Customer_id : string, Email : string, FullName : string, Group_id : null, Status_id : string, UpdatedBy : string, UpdatedOn : string, Username : string, cusId : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getGroupCustomers = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getGroupCustomers(context, onSuccess, onError);
    };
    
	/**
     * @name getServices
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:{Services : [{Description : string, DisplayDescription : string, WorkSchedule_Desc : string, IsSMSAlertActivated : string, IsAgreementActive : string, BeneficiarySMSCharge : string, TransactionFee_id : string, Channel_id : string, IsFutureTransaction : string, Name : string, IsOutageMessageActive : string, IsBeneficiarySMSAlertActivated : string, MinTransferLimit : string, MaxTransferLimit : string, createdby : string, DisplayName : string, HasWeekendOperation : string, id : string, TransactionCharges : string, TransactionFees : [], Status : string, Type_Name : string, Status_id : string, Channel : string, IsAuthorizationRequired : string, SMSCharges : string, TransferDenominations : string, Category_Name : string, IsCampaignActive : string, Code : string, WorkSchedule_id : string, Category_Id : string, IsTCActive : string, IsAlertActive : string, TransactionLimit_id : string, Type_id : string, PeriodicLimits : []}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getServices = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("StaticContentManager")
        .businessController.getServices(context, onSuccess, onError);
    };
    
	 /**
     * @name fetchCityList
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:[{Country_id : string, id : string, Name : string, Region_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.fetchCityList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchCityList(context, onSuccess, onError);
    };
	
	 /**
     * @name fetchAllBranches
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:{branch_view : [{Branch_synctimestamp : string, Branch_WebSiteUrl : string, Branch_modifiedby : string, Branch_lastmodifiedts : string, Address_id : string, City_id : string, Branch_Description : string, Branch_createdts : string, Branch_id : string, Branch_MainBranchCode : string, Branch_IsMainBranch : string, City_Name : string, Branch_createdby : string, Branch_EmailId : string, Branch_PhoneNumber : string, Branch_Name : string, Branch_Status_id : string, Branch_Typeid : string, Branch_Complete_Addr : string, Branch_WorkSchedule_id : string, Branch_Code : string, Branch_DisplayName : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.fetchAllBranches = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchAllBranches(context, onSuccess, onError);
    };
    
	/**
     * @name getProductsList
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:{product : [{AdditionalInformation : string, lastmodifiedts : string, Status_id : string, ProductCode : string, ProductCharges : string, createdts : string, softdeleteflag : string, termsAndConditions : string, Name : string, ProductFeatures : string, createdby : string, modifiedby : string, id : string, synctimestamp : string, productDescription : string, Type_id : string}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getProductsList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getProductsList(context, onSuccess, onError);
    };
    /**
     * @name getRoleTypes
     * @member CustomerGroupsModule.businessController
     * @param {} context
     * @param (response:{"CustomerTypeRecords": [{"Description": string,"createdby": string,"modifiedby": string,"id": string,"softdeleteflag": boolean,"Name": string}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getRoleTypes = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerManagementManager")
        .businessController.getCustomerTypes(context, onSuccess, onError);
    };
     /**
     * @name importCustomersForGroup
     * @member CustomerGroupsModule.businessController
     * @param context: {file: "(File)",roleId: " "} 
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.importCustomersForGroup = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.importCustomersForGroup(context, onSuccess, onError);
    };
     /**
     * @name getImportStatusIdList
     * @member CustomerGroupsModule.businessController
     * @param context: {} 
     * @param (response:{})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    CustomerGroupsModule_BusinessController.prototype.getImportStatusIdList = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getImportStatusIdList(context, onSuccess, onError);
    };
  
  	CustomerGroupsModule_BusinessController.prototype.getGroupFeaturesAndActions  = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getGroupFeaturesAndActions(context, onSuccess, onError);
    };
  CustomerGroupsModule_BusinessController.prototype.getAllFeaturesAndActions  = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("FeaturesManager")
        .businessController.getAllFeaturesAndActions(context, onSuccess, onError);
    };
   /**
     * @name getFeaturesAndActionsForEdit
     * @member CustomerGroupsModule.businessController
     */
  CustomerGroupsModule_BusinessController.prototype.getFeaturesAndActionsForEdit  = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
      .businessController.getGroupFeaturesAndActionsForEdit(context, onSuccess, onError);
  };
  /**
     * @name getGroupBusinessTypeCustomers
     * @member CustomerGroupsModule.businessController
     */
  CustomerGroupsModule_BusinessController.prototype.getGroupBusinessTypeCustomers  = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
      .businessController.getGroupBusinessTypeCustomers(context, onSuccess, onError);
  };
  
  CustomerGroupsModule_BusinessController.prototype.getAccessPolicies = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("FeaturesManager").businessController.getAccessPolicies(context, onSuccess, onError);
  };
    CustomerGroupsModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  
  CustomerGroupsModule_BusinessController.prototype.getCustomerGroupsWithEntity = function (context, onSuccess, onError) {
    kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("CustomerGroupsAndEntitlManager")
        .businessController.getCustomerGroupsWithEntity(context, onSuccess, onError);    
    
//     ModelManager.invoke('Groups', 'getGroups', {
//             "legalEntityId": context
//         }, onSuccess, onError);
    };

    return CustomerGroupsModule_BusinessController;
});
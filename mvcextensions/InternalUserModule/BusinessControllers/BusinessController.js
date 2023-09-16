define([],function () {

    function InternalUserModule_BusinessController(){
        kony.mvc.Business.Delegator.call(this);
    }

    inheritsFrom(InternalUserModule_BusinessController, kony.mvc.Business.Delegator);
    
    InternalUserModule_BusinessController.prototype.initializeBusinessController = function(){
    };
	/**
     * @name fetchAllBranches
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:{branch_view : [{Branch_synctimestamp : object, Branch_WebSiteUrl : object, Branch_modifiedby : object, Branch_lastmodifiedts : object, Address_id : object, City_id : object, Branch_Description : object, Branch_createdts : object, Branch_id : object, Branch_MainBranchCode : object, Branch_IsMainBranch : object, City_Name : object, Branch_createdby : object, Branch_EmailId : object, Branch_PhoneNumber : object, Branch_Name : object, Branch_Status_id : object, Branch_Typeid : object, Branch_Complete_Addr : object, Branch_WorkSchedule_id : object, Branch_Code : object, Branch_DisplayName : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchAllBranches = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchAllBranches(payload, onSuccess, onError);
    };
    /**
     * @name fetchAllRolePermissions
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchAllRolePermissions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchAllRolePermissions(payload, onSuccess, onError);
    };
    /**
     * @name sendEmail
     * @member InternalUserModule.businessController
     * @param {emailId : string, emailType : string} payload
     * @param (...callbackArgs)=>any onSuccess
     * @param (error:string)=>any onError
     */
    InternalUserModule_BusinessController.prototype.sendEmail = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("EmailManager")
        .businessController.sendEmail(payload, onSuccess, onError);
    };
    /**
     * @name createInternalUser
     * @member InternalUserModule.businessController
     * @param {userData : {firstName : string, lastName : string, middleName : string, userName : string, email : string}, homeAddrData : {addressLine1 : string, addressLine2 : string, city_id : string, region_id : string, country_id : string, zipcode : string}, workAddrData : {location : string, branch : string, workAddress : string, zipcode : string}, roleData : {user_id : string, role_id : string}, permissionList : [string]} createUserData
     * @param (response:{RoleStatus : string, EmailStatus : string, opstatus : number, UserStatus : string, AddressStatus : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.createInternalUser = function(createUserData, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.createInternalUser(createUserData, onSuccess, onError);
    };
    /**
     * @name editInternalUser
     * @member InternalUserModule.businessController
     * @param {User_id : string, ModifiedByID : string, ModifiedByName : string, FirstName : string, LastName : string, MiddleName : string, UserName : string, Email : string, addr1 : string, addr2 : string, City_id : string, State_id : string, Country_id : string, City_Name : string, State_Name : string, Country_Name : string, Zipcode : string, BranchLocation_Name : string, BranchLocation_id : string, zipcode : string, Role_id : string, Role_Name : string, listOfAddedPermissionsNames : [], listOfRemovedPermissionsNames : [], listOfAddedPermissions : [], listOfRemovedPermissions : []} editDetails
     * @param (response:{Status : string, EmailStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.editInternalUser = function(editDetails, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.editInternalUser(editDetails, onSuccess, onError);
    };
    
  	/**
     * @name fetchInternalUsers
     * @member InternalUserModule.businessController
     * @param (response:{opstatus : number, internalusers_view : [{Home_CityID : object, Email : object, Home_AddressLine1 : object, Home_Zipcode : object, Work_Addr : object, Home_AddressLine2 : object, lastLogints : object, Home_CityName : object, Status_Desc : object, Home_AddressID : object, Home_Addr : object, createdts : object, Name : object, Work_AddressID : object, Home_StateID : object, Role_Desc : object, Role_Name : object, User_id : object, Work_CountryName : object, Work_CityID : object, Work_CityName : object, lastmodifiedts : object, Work_AddressLine2 : object, Status_id : object, FirstName : object, Work_AddressLine1 : object, MiddleName : object, Role_id : object, Home_CountryID : object, Work_StateName : object, Permission_Count : object, Work_StateID : object, Username : object, Home_StateName : object, Work_CountryID : object, Home_CountryName : object, LastName : object, Work_Zipcode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchInternalUsers = function(context, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchInternalUsers({}, onSuccess, onError);
    };
    /**
     * @name updateUserStatus
     * @member InternalUserModule.businessController
     * @param {Systemuser_id : string, Status_id : string} payload
     * @param (response:{Status : string, EmailStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.updateUserStatus = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.updateUserStatus(payload, onSuccess, onError);
    };
    /**
     * @name fetchUserProfile
     * @member InternalUserModule.businessController
     * @param {User_id : string, isEdit : boolean} data
     * @param (response:{Status : string, userpermission_view : [{Permission_isComposite : object, Permission_Name : object, Permission_Desc : object, User_id : object, Permission_id : object, Role_id : object}], userdirectpermission_view : [], opstatus : number, internalusers_view : [{Home_CityID : object, Email : object, Home_AddressLine1 : object, Home_Zipcode : object, Work_Addr : object, Home_AddressLine2 : object, lastLogints : object, Home_CityName : object, Status_Desc : object, Home_AddressID : object, Home_Addr : object, createdts : object, Name : object, Work_AddressID : object, Home_StateID : object, Role_Desc : object, Role_Name : object, User_id : object, Work_CountryName : object, Work_CityID : object, Work_CityName : object, lastmodifiedts : object, Work_AddressLine2 : object, Status_id : object, FirstName : object, Work_AddressLine1 : object, MiddleName : object, Role_id : object, Home_CountryID : object, Work_StateName : object, Permission_Count : object, Work_StateID : object, Username : object, Home_StateName : object, Work_CountryID : object, Home_CountryName : object, LastName : object, Work_Zipcode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}, role : [{lblDescription : object, lblRoleName : object, lblSeperator : object, template : object}], permissions : [{lblDescription : object, lblPermissionName : object, lblSeperator : object, Permission_id : object, Role_id : object, User_id : object, Permission_isComposite : object, lblIconAction : object, template : object}]})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchUserProfile = function(data, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchUserProfile(data, onSuccess, onError);
    };
    /**
     * @name fetchCityList
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{Country_id : string, id : string, Name : string, Region_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchCityList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchCityList(payload, onSuccess, onError);
    };

    /**
     * @name fetchCountryList
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{Code : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchCountryList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchCountryList(payload, onSuccess, onError);
    };

    /**
     * @name fetchRegionList
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{Code : string, Country_id : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchRegionList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.fetchRegionList(payload, onSuccess, onError);
    };

    /**
     * @name fetchAllRoles
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:{roles_view : [{Status : object, role_Name : object, Status_id : object, role_id : object, permission_Count : object, Users_Count : object, Status_Desc : object, role_Desc : object, roleType_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchAllRoles = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchAllRoles(payload, onSuccess, onError);
    };
  
  InternalUserModule_BusinessController.prototype.generateUsersList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.generateUsersList(payload, onSuccess, onError);
    };
    /**
     * @name fetchPermissions
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{PermissionType_id : string, Permission_Desc : string, Permission_id : string, Permission_Name : string, Role_Count : string, Status_Desc : string, Status_id : string, Users_Count : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.fetchPermissions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.fetchPermissions(payload, onSuccess, onError);
    };
     /**
     * @name getUserOrRoleCompositeActions
     * @member InternalUserModule.businessController
     * @param {User_id : string, Role_id : string, Permission_id : string} payload
     * @param (response:{opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
    InternalUserModule_BusinessController.prototype.getUserOrRoleCompositeActions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("RolesAndPermissionsManager")
        .businessController.getUserOrRoleCompositeActions(payload, onSuccess, onError);
    };

    /**
     * @name getUserTypeList
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
     InternalUserModule_BusinessController.prototype.getUserTypeList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.getUserTypeList(payload, onSuccess, onError);
    };

    /**
     * @name getLineOfBusinessList
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
     InternalUserModule_BusinessController.prototype.getLineOfBusinessList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.getLineOfBusinessList(payload, onSuccess, onError);
    };

    /**
     * @name getBranchList
     * @member InternalUserModule.businessController
     * @param {} payload
     * @param (response:[{DataType_id : null, PermissionValue : string, Permission_createdby : string, Permission_createdts : string, Permission_Description : string, Permission_id : string, Permission_lastmodifiedts : string, Permission_modifiedby : string, Permission_Name : string, Permission_softdeleteflag : string, Permission_Status_id : string, Permission_synctimestamp : string, Permission_Type_id : string, Role_Description : string, Role_id : string, Role_Name : string, Role_Status_id : string, Permission_isComposite : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
     InternalUserModule_BusinessController.prototype.getBranchList = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.getBranchList(payload, onSuccess, onError);
    };
    
    InternalUserModule_BusinessController.prototype.updateUserCompositeActions = function(payload, onSuccess, onError){
        kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("InternalusersManager")
        .businessController.updateUserCompositeActions(payload, onSuccess, onError);
    };
    InternalUserModule_BusinessController.prototype.getLoginTypeConfiguration = function(context, onSuccess, onError){
      kony.mvc.MDAApplication.getSharedInstance()
        .getModuleManager().getModule("AppConfigurationsManager")
        .businessController.getLoginTypeConfiguration(context, onSuccess, onError);
    };

    InternalUserModule_BusinessController.prototype.sendEmailOnUpdate = function(payload, onSuccess, onError){
        //TODO: move code from Command Handler File: InternalUserModule/BusinessControllers/sendEmailOnUpdate_CommandHandler.js
        //Empty Command Handler Found
    };
    
    InternalUserModule_BusinessController.prototype.execute = function(command){
        kony.mvc.Business.Controller.prototype.execute.call(this,command);
    };
  InternalUserModule_BusinessController.prototype.doLogout = function (context, onSuccess, onError) {
    var self = this;
    var integrationClient;
    var serviceName = "CustomIdentity";
    var operationName = "logout";
    var params = {};
    var options = {
      "httpRequestOptions": {
        "timeoutIntervalForRequest": 60,
        "timeoutIntervalForResource": 600
      }
    };
    try {
      integrationClient = KNYMobileFabric.getIdentityService("KonyBankingAdminConsoleIdentityService");
      integrationClient.logout(
        function (result) {
          kony.print("Integration Service Response is :" + JSON.stringify(result));
          kony.mvc.MDAApplication.getSharedInstance().appContext.session_token = "";
          //Remove all the active OLB CSR assist windows
          var activeWindows = kony.mvc.MDAApplication.getSharedInstance().appContext.activeCSRAssistWindows;
          if (activeWindows && activeWindows.length > 0) {
            for (var count = 0; count < activeWindows.length; count++) {
              activeWindows[count].windowObject.close();
            }
          }
          //Remove all the active Loans CSR assist windows
          activeWindows = kony.mvc.MDAApplication.getSharedInstance().appContext.activeLoansCSRAssistWindows;
          if (activeWindows && activeWindows.length > 0) {
            for (count = 0; count < activeWindows.length; count++) {
              activeWindows[count].windowObject.close();
            }
          }
          onSuccess();
        },
        function (error) {
          kony.print(error);
          onError(error);
        }, options);
    } catch (exception) {
      onError(exception);
      kony.print("Exception" + exception.message);
    }
  };
    return InternalUserModule_BusinessController;
});
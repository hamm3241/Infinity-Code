define(['ModelManager'], function (ModelManager) {
  /**
     * InternalusersManager manages models: Branch, Users, city, country, createUser, internalUserProfile_view, internalUsers_view, location, region
     */
  function InternalusersManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(InternalusersManager, kony.mvc.Business.Delegator);

  InternalusersManager.prototype.initializeBusinessController = function () {};

/**
     * @name fetchInternalUsers
     * @member InternalusersManager.businessController
     * @param {} context
     * @param (...callbackArgs:{opstatus : number, internalusers_view : [{Home_CityID : object, Email : object, Home_AddressLine1 : object, Home_Zipcode : object, Work_Addr : object, Home_AddressLine2 : object, lastLogints : object, Home_CityName : object, Status_Desc : object, Home_AddressID : object, Home_Addr : object, createdts : object, Name : object, Work_AddressID : object, Home_StateID : object, Role_Desc : object, Role_Name : object, User_id : object, Work_CountryName : object, Work_CityID : object, Work_CityName : object, lastmodifiedts : object, Work_AddressLine2 : object, Status_id : object, FirstName : object, Work_AddressLine1 : object, MiddleName : object, Role_id : object, Home_CountryID : object, Work_StateName : object, Permission_Count : object, Work_StateID : object, Username : object, Home_StateName : object, Work_CountryID : object, Home_CountryName : object, LastName : object, Work_Zipcode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.fetchInternalUsers = function(context, onSuccess, onError) {
    ModelManager.invoke('internalUsers_view', 'GetUsers', {}, onSuccess, onError);
  };
  InternalusersManager.prototype.generateUsersList = function(context, onSuccess, onError) {
    ModelManager.invoke('internalUsers_view', 'generateUsersList', context, onSuccess, onError);
  };

/**
     * @name fetchAllBranches
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{branch_view : [{Branch_synctimestamp : object, Branch_WebSiteUrl : object, Branch_modifiedby : object, Branch_lastmodifiedts : object, Address_id : object, City_id : object, Branch_Description : object, Branch_createdts : object, Branch_id : object, Branch_MainBranchCode : object, Branch_IsMainBranch : object, City_Name : object, Branch_createdby : object, Branch_EmailId : object, Branch_PhoneNumber : object, Branch_Name : object, Branch_Status_id : object, Branch_Typeid : object, Branch_Complete_Addr : object, Branch_WorkSchedule_id : object, Branch_Code : object, Branch_DisplayName : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.fetchAllBranches = function(payload, onSuccess, onError){
    ModelManager.invoke('Branch', 'getAllBranches', payload, onSuccess, onError);
  };

/**
     * @name getUserTypeList
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{"opstatus":0,"usertype":[{"lastmodifiedts":"2021-06-30 21:34:42.0","name":"Contract","id":"CONTRACT","synctimestamp":"2021-06-30 21:34:42.0","createdts":"2021-06-30 21:34:42.0","softdeleteflag":"0"},{"lastmodifiedts":"2021-06-30 21:34:42.0","name":"External","id":"EXTERNAL","synctimestamp":"2021-06-30 21:34:42.0","createdts":"2021-06-30 21:34:42.0","softdeleteflag":"0"},{"lastmodifiedts":"2021-06-30 21:34:42.0","name":"Internal","id":"INTERNAL","synctimestamp":"2021-06-30 21:34:42.0","createdts":"2021-06-30 21:34:42.0","softdeleteflag":"0"}],"httpStatusCode":0}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
 InternalusersManager.prototype.getUserTypeList = function(payload, onSuccess, onError){
  ModelManager.invoke('Users', 'getUserType', payload, onSuccess, onError);
};
 
   InternalusersManager.prototype.getPermissionsForLegalEntities = function(payload, onSuccess, onError){
  ModelManager.invoke('Users', 'getPermissionsForLegalEntities', payload, onSuccess, onError);
}; 
  
/**
     * @name getLineOfBusinessList
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{"opstatus":0,"lob_view":[{"lobtext_description":"SME Banking","lobtext_displayName":"SME Banking","lobtext_languageCode":"en-US","lob_id":"TYPE_ID_BUSINESS"},{"lobtext_description":"Corporate Banking","lobtext_displayName":"Corporate Banking","lobtext_languageCode":"en-US","lob_id":"TYPE_ID_CORPORATE"},{"lobtext_description":"Mid Corporate Banking","lobtext_displayName":"Mid Corporate Banking","lobtext_languageCode":"en-US","lob_id":"TYPE_ID_MID_CORPORATE"},{"lobtext_description":"Retail Banking","lobtext_displayName":"Retail Banking","lobtext_languageCode":"en-US","lob_id":"TYPE_ID_RETAIL"},{"lobtext_description":"Wealth Banking","lobtext_displayName":"Wealth Banking","lobtext_languageCode":"en-US","lob_id":"TYPE_ID_WEALTH"}],"httpStatusCode":0}=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
 InternalusersManager.prototype.getLineOfBusinessList = function(payload, onSuccess, onError){
  ModelManager.invoke('LOB', 'getLOB', payload, onSuccess, onError);
};

/**
     * @name getBranchList
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:{branch_view : [{Branch_synctimestamp : object, Branch_WebSiteUrl : object, Branch_modifiedby : object, Branch_lastmodifiedts : object, Address_id : object, City_id : object, Branch_Description : object, Branch_createdts : object, Branch_id : object, Branch_MainBranchCode : object, Branch_IsMainBranch : object, City_Name : object, Branch_createdby : object, Branch_EmailId : object, Branch_PhoneNumber : object, Branch_Name : object, Branch_Status_id : object, Branch_Typeid : object, Branch_Complete_Addr : object, Branch_WorkSchedule_id : object, Branch_Code : object, Branch_DisplayName : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
 InternalusersManager.prototype.getBranchList = function(payload, onSuccess, onError){
  ModelManager.invoke('Branch', 'getAllBranches', payload, onSuccess, onError);
};

/**
     * @name createInternalUser
     * @member InternalusersManager.businessController
     * @param {userData : {firstName : string, lastName : string, middleName : string, userName : string, email : string}, homeAddrData : {addressLine1 : string, addressLine2 : string, city_id : string, region_id : string, country_id : string, zipcode : string}, workAddrData : {location : string, branch : string, workAddress : string, zipcode : string}, roleData : {user_id : string, role_id : string}, permissionList : [string]} createUserData
     * @param (...callbackArgs:{RoleStatus : string, EmailStatus : string, opstatus : number, UserStatus : string, AddressStatus : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.createInternalUser = function(createUserData, onSuccess, onError){  
    kony.print("Inside createInternalUser() of InternalusersManager.BusinessController");
    var self = this;

    var userDetails = createUserData.userData;
    var roles = createUserData.roleData;
    var vizServerURL = window.location.href;
    var businessDetails = createUserData.businessData;

    try {
      var internalUserModel = kony.mvc.MDAApplication.getSharedInstance().modelStore.getModelDefinition("createUser");
      var newInternalUser = new internalUserModel({
        'Status_id':"SID_ACTIVE",
        'FirstName': userDetails.firstName,
        'MiddleName':userDetails.middleName,
        'LastName':userDetails.lastName,
        'Username': userDetails.userName,
        'Email': userDetails.email,
        'role_id':roles.role_id,
        'permission_ids':JSON.stringify(createUserData.permissionList),
        'currUser':"konydev",
        'WorkID':businessDetails.branchName,
        'vizServerURL':vizServerURL,
        'userType': businessDetails.userType,
        'lineOfBusiness': businessDetails.lobId,
        'reportingManager': businessDetails.reportingManager,
      });
      newInternalUser.save(ModelManager.callBackFrom(onSuccess, onError));
    } catch (err) {
      onError(err);
    }
  };

	/**
     * @name editInternalUser
     * @member InternalusersManager.businessController
     * @param {User_id : string, ModifiedByID : string, ModifiedByName : string, FirstName : string, LastName : string, MiddleName : string, UserName : string, Email : string, addr1 : string, addr2 : string, City_id : string, State_id : string, Country_id : string, City_Name : string, State_Name : string, Country_Name : string, Zipcode : string, BranchLocation_Name : string, BranchLocation_id : string, zipcode : string, Role_id : string, Role_Name : string, listOfAddedPermissionsNames : [], listOfRemovedPermissionsNames : [], listOfAddedPermissions : [], listOfRemovedPermissions : []} editDetails
     * @param (...callbackArgs:{Status : string, EmailStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.editInternalUser = function(editDetails, onSuccess, onError){
    ModelManager.invoke('Users', 'EditInternalUser', editDetails, onSuccess, onError);
  };

	/**
     * @name updateUserStatus
     * @member InternalusersManager.businessController
     * @param {Systemuser_id : string, Status_id : string} payload
     * @param (...callbackArgs:{Status : string, EmailStatus : string, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.updateUserStatus = function(payload, onSuccess, onError){
    ModelManager.invoke('Users', 'UpdateUserStatus', {
      "User_id" : payload.Systemuser_id, 
      "Status_id" : payload.Status_id }, onSuccess, onError);
  };

/**
     * @name fetchUserProfile
     * @member InternalusersManager.businessController
     * @param {User_id : string, isEdit : boolean} data
     * @param (...callbackArgs:{Status : string, userpermission_view : [{Permission_isComposite : object, Permission_Name : object, Permission_Desc : object, User_id : object, Permission_id : object, Role_id : object}], userdirectpermission_view : [], opstatus : number, internalusers_view : [{Home_CityID : object, Email : object, Home_AddressLine1 : object, Home_Zipcode : object, Work_Addr : object, Home_AddressLine2 : object, lastLogints : object, Home_CityName : object, Status_Desc : object, Home_AddressID : object, Home_Addr : object, createdts : object, Name : object, Work_AddressID : object, Home_StateID : object, Role_Desc : object, Role_Name : object, User_id : object, Work_CountryName : object, Work_CityID : object, Work_CityName : object, lastmodifiedts : object, Work_AddressLine2 : object, Status_id : object, FirstName : object, Work_AddressLine1 : object, MiddleName : object, Role_id : object, Home_CountryID : object, Work_StateName : object, Permission_Count : object, Work_StateID : object, Username : object, Home_StateName : object, Work_CountryID : object, Home_CountryName : object, LastName : object, Work_Zipcode : object}], httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}, role : [{lblDescription : object, lblRoleName : object, lblSeperator : object, template : object}], permissions : [{lblDescription : object, lblPermissionName : object, lblSeperator : object, Permission_id : object, Role_id : object, User_id : object, Permission_isComposite : object, lblIconAction : object, template : object}]})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */  
  InternalusersManager.prototype.fetchUserProfile = function(data, onSuccess, onError){
    ModelManager.invoke('internalUserProfile_view', 'GetUserProfile', data, onSuccess, onError);
  };

  /**
     * @name fetchCityList
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{Country_id : string, id : string, Name : string, Region_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.fetchCityList = function(payload, onSuccess, onError){
    ModelManager.invoke('city', 'getByCriteria', kony.mvc.Expression.eq("$orderby","Name"), onSuccess, onError);
  };

  /**
     * @name fetchCountryList
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{Code : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.fetchCountryList = function(payload, onSuccess, onError){
    ModelManager.invoke('country', 'getByCriteria', kony.mvc.Expression.eq("$orderby","Name"), onSuccess, onError);
  };

  /**
     * @name fetchRegionList
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{Code : string, Country_id : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.fetchRegionList = function(payload, onSuccess, onError){
    ModelManager.invoke('region', 'getByCriteria', kony.mvc.Expression.eq("$orderby","Name"), onSuccess, onError);
  };

  
  InternalusersManager.prototype.updateUserCompositeActions = function(payload, onSuccess, onError){
    ModelManager.invoke('Users', 'manageUserCompositeActions', payload, onSuccess, onError);
  };
  
  /**
     * @name fetchEmployeeFeatures
     * @member InternalusersManager.businessController
     * @param {} payload
     * @param (...callbackArgs:[{..}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  InternalusersManager.prototype.fetchEmployeeFeatures = function(payload, onSuccess, onError){
    ModelManager.invoke('employeeFeatures', 'getInternalUserFeatures', payload, onSuccess, onError);
  };
  
  InternalusersManager.prototype.fetchActionsOfEmployeeFeature = function(payload, onSuccess, onError){
    ModelManager.invoke('employeeFeatures', 'getInternalUserFeatureActions', payload, onSuccess, onError);
  };
   InternalusersManager.prototype.updateInternalUserFeatureActions = function(payload, onSuccess, onError){
    ModelManager.invoke('employeeFeatures', 'updateInternalUserFeatureActions', payload, onSuccess, onError);
  };
  InternalusersManager.prototype.updateInternalUserActionStatus = function(payload, onSuccess, onError){
    ModelManager.invoke('employeeFeatures', 'updateInternalUserActionStatus', payload, onSuccess, onError);
  };
  
  return InternalusersManager;
});
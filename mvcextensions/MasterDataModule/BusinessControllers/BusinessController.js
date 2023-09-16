define([],function () {

  function MasterDataModule_BusinessController(){
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(MasterDataModule_BusinessController, kony.mvc.Business.Delegator);

  MasterDataModule_BusinessController.prototype.initializeBusinessController = function(){
  };


  /**
     * @name getAllCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {} context
     * @param (...callbackArgs:{records : [{Service_id : object, Service_SoftDeleteFlag : object, Service_Name : object, Service_Status_id : object, Communication_Records : object, Service_Description : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getAllCustomerCareInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustServiceManager")
      .businessController.getAllCustomerCareInfo(context, onSuccess, onError);
  };


  /**
     * @name addCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {User_ID : string, Status_id : string, Service_Details : {Name : string, Channel_id : string, Description : string, Status_id : string}, Communication_Records : [{Priority : object, Value : object, Type : object, Status_id : object, Extension : object, Description : object}]} context
     * @param (...callbackArgs:{ManageCustomerServiceOperation : {CreateCustomerServiceStatus : string, ServiceResponse : string}, ManageCommunicationRecordsDataSet : [{a5ddb17d-9ee9-4e35-8ac1-afb602b2a007_CreateRequestStatus : object, a5ddb17d-9ee9-4e35-8ac1-afb602b2a007_ServiceResponse : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.addCustomerCareInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustServiceManager")
      .businessController.addCustomerCareInfo(context, onSuccess, onError);
  };


  /**
     * @name editCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {User_ID : string, Status_id : string, Service_id : string, Service_Details : {Status_id : string}} context
     * @param (...callbackArgs:{ManageCustomerServiceOperation : {ServiceResponse : string, UpdateCustomerServiceStatus : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.editCustomerCareInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustServiceManager")
      .businessController.editCustomerCareInfo(context, onSuccess, onError);
  };


  /**
     * @name deleteCustomerCareInfo
     * @member CustServiceManager.businessController
     * @param {User_ID : string, Service_id : string} context
     * @param (...callbackArgs:{DeleteCustomerServiceStatus : string, opstatus : number, DeleteCustomerServiceResponse : string, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.deleteCustomerCareInfo = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("CustServiceManager")
      .businessController.deleteCustomerCareInfo(context, onSuccess, onError);
  };


  /**
     * @name fetchAllLocations
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:{data : [{lastmodifiedts : object, EmailId : object, IsMainBranch : object, Description : object, Status_id : object, Address_id : object, createdts : object, Code : object, softdeleteflag : object, WorkSchedule_id : object, Name : object, DisplayName : object, PhoneNumber : object, id : object, synctimestamp : object, Type_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.fetchAllLocations = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.fetchAllLocations(context, onSuccess, onError);
  };


  /**
     * @name changeLocationStatus
     * @member MasterDataModule.businessController
     * @param {Location_id : string, Status_id : string} context
     * @param (res:{ManageLocation : {ServiceResponse : string, ManageLocationStatus : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.changeLocationStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.changeLocationStatus(context, onSuccess, onError);
  };


  /**
     * @name addNewLocation
     * @member MasterDataModule.businessController
     * @param {User_ID : string, Location_id : string, Status_id : string, Location_Details : {Name : string, DisplayName : string, Description : string, Type_id : string, Code : string, Email : string, IsMainBranch : string, PhoneNumber : string}, Service_Details : {AddedServices : [], RemovedServices : []}, Address_Details : {AddressID : string, City_id : string, AddressLine1 : string, Longitude : string, Latitude : string, ZipCode : string, Region_id : string, Country_id : string}, Schedule_Details : {WorkScheduleID : string, WorkScheduleDescription : string, WeekendWorkingDays : {AddedDays : object, RemovedDays : object}, WeekDayStartTime : string, WeekDayEndTime : string, WeekEndStartTime : string, WeekEndEndTime : string}} context
     * @param (response:{ManageLocationWorkSchedule : {ManageDaySchedule : {FRIDAY_CreateScheduleResponse : object, WEDNESDAY_CreateScheduleResponse : object, MONDAY_CreateScheduleResponse : object, THURSDAY_CreateScheduleResponse : object, TUESDAY_CreateScheduleResponse : object}, ManageWorkSchedule : {ManageLocationWorkScheduleResponse : object, ManageLocationWorkScheduleStatus : object}}, ManageLocation : {ServiceResponse : string, ManageLocationStatus : string}, ManageLocationAddress : {AddressIDParam : string, ManageLocationAddressStatus : string, ManageLocationAddressResponse : string}, opstatus : number, ManageLocationServices : {RemoveServices : {}, AssignServices : {}}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.addNewLocation = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.addNewLocation(context, onSuccess, onError);
  };


  MasterDataModule_BusinessController.prototype.editLocationDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.editLocationDetails(context, onSuccess, onError);
  };


  /**
     * @name importLocationsCSVFile
     * @member MasterDataModule.businessController
     * @param {csvFile : {}} context
     * @param (response:{importLocationsResponse : {correctTemplate : boolean, successCount : number, opstatus : number, failureCount : number, httpStatusCode : number}, getLocationsResponse : {data : [object], opstatus : number, httpStatusCode : number, httpresponse : {headers : object, url : object, responsecode : object}}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.importLocationsCSVFile = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.importLocationsCSVFile(context, onSuccess, onError);
  };


  /**
     * @name getLocationDetails
     * @member MasterDataModule.businessController
     * @param {Location_id : string} context
     * @param (response:{records : [{Location_EmailId : object, Service_id : object, Sunday_EndTime : object, Location_Code : object, Location_Longitude : object, Location_Display_Name : object, Location_id : object, Weekday_StartTime : object, Location_Latitude : object, Sunday_StartTime : object, Service_Description : object, Location_Type_id : object, Location_Name : object, Location_Address_id : object, Service_Name : object, Location_Status_id : object, Location_DeleteFlag : object, Location_IsMainBranch : object, Location_Phone_Number : object, Weekday_EndTime : object, Service_Type_id : object, Location_WorkScheduleId : object, ADDRESS : object, Service_Status_id : object, Location_Description : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getLocationDetails = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.getLocationDetails(context, onSuccess, onError);
  };
  
  MasterDataModule_BusinessController.prototype.getSearchedLocations = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.getSearchedLocations(context, onSuccess, onError);
  };
  MasterDataModule_BusinessController.prototype.generateLocationsCSV = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.generateLocationsCSV(context, onSuccess, onError);
  };
  MasterDataModule_BusinessController.prototype.generateLocationsList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.generateLocationsList(context, onSuccess, onError);
  };


  /**
     * @name fetchCountryList
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{Code : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.fetchCountryList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCountryList(context, onSuccess, onError);
  };


  /**
     * @name fetchRegionList
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{Code : string, Country_id : string, id : string, Name : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.fetchRegionList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchRegionList(context, onSuccess, onError);
  };


  /**
     * @name fetchCityList
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{Country_id : string, id : string, Name : string, Region_id : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.fetchCityList = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("InternalusersManager")
      .businessController.fetchCityList(context, onSuccess, onError);
  };


  /**
     * @name getServices
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{id : string, code : string, name : string, facilitytype : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getFacilities = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.getFacilities(context, onSuccess, onError);
  };


  /**
     * @name getProducts
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:{records : [{lastmodifiedts : object, productId : object, Status_id : object, rates : object, createdts : object, softdeleteflag : object, productName : object, productTypeId : object, termsAndConditions : object, features : object, createdby : object, modifiedby : object, synctimestamp : object, productType : object, productDescription : object, info : object, Type_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getProducts = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BankProductManagmentManager")
      .businessController.getProducts(context, onSuccess, onError);
  };
  
  MasterDataModule_BusinessController.prototype.getProductListFromMS = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("BankProductManagmentManager")
      .businessController.getProductListFromMS(context, onSuccess, onError);
  };
  
  
    /**
     * @name getCurrencies
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{id : string, Code : string, Name : string, Symbol : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getCurrencies = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.getCurrencies(context, onSuccess, onError);
  };
   /**
     * @name getCurrencies
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{id : string, Code : string, Name : string, Symbol : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getImportLocationsStatus = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("LocationManager")
      .businessController.getImportLocationsStatus(context, onSuccess, onError);
  };
  /**
     * @name getJWTToken
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{jwttoken : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  MasterDataModule_BusinessController.prototype.getJWTToken = function(context, onSuccess, onError){
    kony.mvc.MDAApplication.getSharedInstance()
      .getModuleManager().getModule("DashboardManager")
      .businessController.getJWTToken(context, onSuccess, onError);
  };


  MasterDataModule_BusinessController.prototype.execute = function(command){
    kony.mvc.Business.Controller.prototype.execute.call(this,command);
  };

  return MasterDataModule_BusinessController;
});
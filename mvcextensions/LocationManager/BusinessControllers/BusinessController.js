define(['ModelManager'], function (ModelManager) {
  /**
     * LocationManager manages models: LocationObject, LocationServicesObject, LocationsUsingCSV
     */
  function LocationManager() {
    kony.mvc.Business.Delegator.call(this);
  }

  inheritsFrom(LocationManager, kony.mvc.Business.Delegator);

  LocationManager.prototype.initializeBusinessController = function () {

  };


  /**
     * @name fetchAllLocations
     * @member LocationManager.businessController
     * @param {} context
     * @param (...callbackArgs:{data : [{lastmodifiedts : object, EmailId : object, IsMainBranch : object, Description : object, Status_id : object, Address_id : object, createdts : object, Code : object, softdeleteflag : object, WorkSchedule_id : object, Name : object, DisplayName : object, PhoneNumber : object, id : object, synctimestamp : object, Type_id : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.fetchAllLocations = function(context, onSuccess, onError){
    ModelManager.invoke("LocationObject", "getLocations", context, onSuccess, onError);
  };


  /**
     * @name changeLocationStatus
     * @member LocationManager.businessController
     * @param {Location_id : string, Status_id : string} context
     * @param (...callbackArgs:{ManageLocation : {ServiceResponse : string, ManageLocationStatus : string}, opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.changeLocationStatus = function(context, onSuccess, onError){
    ModelManager.invoke("LocationServicesObject", "updateLocationAndLocationServices", {
      Location_id: context.Location_id,
      Status_id: context.Status_id,
      Location_OfflineOnlineStatus: context.locationConnectivity
    }, onSuccess, onError);
  };


  /**
     * @name addNewLocation
     * @member LocationManager.businessController
     * @param {User_ID : string, Location_id : string, Status_id : string, Location_Details : {Name : string, DisplayName : string, Description : string, Type_id : string, Code : string, Email : string, IsMainBranch : string, PhoneNumber : string}, Service_Details : {AddedServices : [object], RemovedServices : []}, Address_Details : {AddressID : string, City_id : string, AddressLine1 : string, Longitude : string, Latitude : string, ZipCode : string, Region_id : string, Country_id : string}, Schedule_Details : {WorkScheduleID : string, WorkScheduleDescription : string, WeekendWorkingDays : {AddedDays : object, RemovedDays : object}, WeekDayStartTime : string, WeekDayEndTime : string, WeekEndStartTime : string, WeekEndEndTime : string}} context
     * @param (...callbackArgs:{ManageLocationWorkSchedule : {ManageDaySchedule : {FRIDAY_CreateScheduleResponse : object, WEDNESDAY_CreateScheduleResponse : object, MONDAY_CreateScheduleResponse : object, THURSDAY_CreateScheduleResponse : object, TUESDAY_CreateScheduleResponse : object}, ManageWorkSchedule : {ManageLocationWorkScheduleResponse : object, ManageLocationWorkScheduleStatus : object}}, ManageLocation : {ServiceResponse : string, ManageLocationStatus : string}, ManageLocationAddress : {AddressIDParam : string, ManageLocationAddressStatus : string, ManageLocationAddressResponse : string}, opstatus : number, ManageLocationServices : {RemoveServices : {}, AssignServices : {AssignServiceSERVICE_ID_9 : object}}, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.addNewLocation = function(context, onSuccess, onError){
    ModelManager.invoke("LocationServicesObject", "createLocationAndAssignServices", context, onSuccess, onError);
  };


  LocationManager.prototype.editLocationDetails = function(context, onSuccess, onError){
    ModelManager.invoke("LocationServicesObject", "updateLocationAndLocationServices", context, onSuccess, onError);
  };


  /**
     * @name importLocationsCSVFile
     * @member LocationManager.businessController
     * @param {csvFile : {}} context
     * @param (...callbackArgs:{importLocationsResponse : {correctTemplate : boolean, successCount : number, opstatus : number, failureCount : number, httpStatusCode : number}, getLocationsResponse : {data : [object], opstatus : number, httpStatusCode : number, httpresponse : {headers : object, url : object, responsecode : object}}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
 /* LocationManager.prototype.importLocationsCSVFile = function(context, onSuccess, onError){
    kony.print("Inside execute() of MasterData_importLocationsCSVFile_CommandHandler");
    var self=this;

    try{

      var mfURL = KNYMobileFabric.mainRef.config.reportingsvc.session.split("/services")[0];

      var authToken = KNYMobileFabric.currentClaimToken;
      var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

      var csvFile = context.csvFile;
      var uploadURL = mfURL + "/services/data/v1/LocationObjService/operations/LocationsUsingCSV/importLocations";

      var formData = new FormData();
      formData.append("user_ID", user_ID);
      formData.append("branchAtmCSV.csv", csvFile);
	
      var xhr = new XMLHttpRequest();
      xhr.open('POST', uploadURL, true);
      xhr.setRequestHeader("X-Kony-Authorization", authToken);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200)  {
          var importLocationsResponse = JSON.parse(xhr.responseText);
          kony.print("importLocationsResponse: "+JSON.stringify(importLocationsResponse));

          try {
            ModelManager.invoke('LocationObject', 'getLocations', {}, function(getLocationsResponse){
              onSuccess({
                "importLocationsResponse" : importLocationsResponse,
                "getLocationsResponse" : getLocationsResponse
              });
            }, onError);
          } catch (error) {
            onError(error);
          }
        }
        else if(xhr.status === 504 || (xhr.readyState === 4 && xhr.status === 0)) {
          var errCode = 504;
          onError(errCode);
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
  };
*/

  LocationManager.prototype.importLocationsCSVFile = function(context, onSuccess, onError){
    ModelManager.invoke("LocationsUsingCSV", "importLocations", context, onSuccess, onError);
  };
  /**
     * @name getLocationDetails
     * @member LocationManager.businessController
     * @param {Location_id : string} context
     * @param (...callbackArgs:{records : [{Location_EmailId : object, Service_id : object, Sunday_EndTime : object, Location_Code : object, Location_Longitude : object, Location_Display_Name : object, Location_id : object, Weekday_StartTime : object, Location_Latitude : object, Sunday_StartTime : object, Service_Description : object, Location_Type_id : object, Location_Name : object, Location_Address_id : object, Service_Name : object, Location_Status_id : object, Location_DeleteFlag : object, Location_IsMainBranch : object, Location_Phone_Number : object, Weekday_EndTime : object, Service_Type_id : object, Location_WorkScheduleId : object, ADDRESS : object, Service_Status_id : object, Location_Description : object}], opstatus : number, httpStatusCode : number, httpresponse : {headers : string, url : string, responsecode : number}})=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.getLocationDetails = function(context, onSuccess, onError){
    ModelManager.invoke("LocationServicesObject", "getLocationAndLocationServices", context, onSuccess, onError);
  };
  
   LocationManager.prototype.getSearchedLocations = function(context, onSuccess, onError){
    ModelManager.invoke("LocationObject", "getFilteredLocations", context, onSuccess, onError);
  };
  LocationManager.prototype.generateLocationsCSV = function(context, onSuccess, onError){
    ModelManager.invoke("LocationsUsingCSV", "generateLocationsCSV", context, onSuccess, onError);
  };
   LocationManager.prototype.generateLocationsList = function(context, onSuccess, onError){
    ModelManager.invoke("LocationObject", "generateLocationList", context, onSuccess, onError);
  };
  
  
    /**
     * @name getCurrencies
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{id : string, Code : string, Name : string, Symbol : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.getCurrencies = function(payload, onSuccess, onError){
    ModelManager.invoke('currency', 'getByCriteria', kony.mvc.Expression.eq("$orderby","name"), onSuccess, onError);
  };
  
      /**
     * @name getFacilties
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{id : string, code : string, name : string, facilitytype : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.getFacilities = function(payload, onSuccess, onError){
    ModelManager.invoke('facility', 'getByCriteria', kony.mvc.Expression.eq("$orderby","name"), onSuccess, onError);
  };
  
      /**
     * @name getImportLocationsStatus
     * @member MasterDataModule.businessController
     * @param {} context
     * @param (response:[{id : string, code : string, name : string, facilitytype : string}])=>any onSuccess
     * @param (...callbackArgs)=>any onError
     */
  LocationManager.prototype.getImportLocationsStatus = function(payload, onSuccess, onError){
    ModelManager.invoke('LocationsUsingCSV', 'getImportLocationsStatus',payload, onSuccess, onError);
  };

  return LocationManager;
});
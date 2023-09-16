define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown'], function (Promisify, ErrorInterceptor, isNetworkDown) {

  function MasterData_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.currentLocationDetails = null;
    this.allLocations = [];
    this.unassignedServices = [];
    this.assignedServices = [];
    this.productsModel=[];
    this.getLocationsResponse=[];
    this.globalDetails = {country:[], region:[], city:[]};
  }

  inheritsFrom(MasterData_PresentationController, kony.mvc.Presentation.BasePresenter);

  MasterData_PresentationController.prototype.allContacts = null;

  MasterData_PresentationController.prototype.initializePresentationController = function() {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function(on){
      return [
        on(isNetworkDown).do(function(){
          self.presentUserInterface(self.currentForm,{
            NetworkDownMessage : {}
          });
        })
      ];
    });
  };
  MasterData_PresentationController.prototype.showProgressBarCustomerCare = function(){
    this.showCustomerCareDetailsForm({progressBar : {
      show : "success"
    }});
  };
  MasterData_PresentationController.prototype.hideProgressBarCustomerCare = function(){
    this.showCustomerCareDetailsForm({progressBar : {
      show : "fail"
    }});
  };

  MasterData_PresentationController.prototype.showCustomerCareDetailsForm = function(context) {
    this.currentForm = "frmCustomerCare";
    this.presentUserInterface("frmCustomerCare",context);
  };

  MasterData_PresentationController.prototype.getCurrentLocation = function() {
    return this.currentLocationDetails;
  };

  MasterData_PresentationController.prototype.resetLocationData = function() {
    this.currentLocationDetails = undefined;
  };

  MasterData_PresentationController.prototype.getUnAssignedServices = function() {
    return this.unassignedServices;
  };

  MasterData_PresentationController.prototype.getAssignedServices = function() {
    return this.assignedServices;
  };


  /**
     * @name fetchAllCustomerCareDetails
     * @member MasterDataModule.presentationController
     * 
     */
  MasterData_PresentationController.prototype.fetchAllCustomerCareDetails = function(){
    var self = this; 
    self.showProgressBarCustomerCare();
    function onSuccess(response) {
      kony.print("response"+JSON.stringify(response));
      self.allContacts=response.records;
      self.showListofContactsUI({"action":"contactsList","contacts" : response.records});
    }

    function onError(response) {
      self.hideProgressBarCustomerCare();
      self.showListofContactsUI({"action":"error","message":ErrorInterceptor.errorMessage(response)});
      kony.print('Not able to fetch contacts records');
    }

    this.businessController.getAllCustomerCareInfo({}, onSuccess, onError);
  };

  MasterData_PresentationController.prototype.showListofContactsUI = function (context) {
    this.currentForm = "frmCustomerCare";
    this.presentUserInterface('frmCustomerCare', context);
  };


  /**
     * @name addNewCustomerCareInfo
     * @member MasterDataModule.presentationController
     * @param {User_ID : string, Status_id : string, Service_Details : {Name : string, Channel_id : string, Description : string, Status_id : string}, Communication_Records : [{Priority : string, Value : string, Type : string, Status_id : string, Extension : string, Description : string}]} dataToAdd
     */
  MasterData_PresentationController.prototype.addNewCustomerCareInfo = function(dataToAdd){
    var self = this; 
    function onSuccess(response) {
      kony.print("response"+JSON.stringify(response));
      //self.fetchAllCustomerCareDetails();
      self.showListofContactsUI({"action":"addSuccess"});
    }

    function onError(response) {
      kony.print('Not able to add contact records');
      self.showListofContactsUI({"action":"addFailure", "message":ErrorInterceptor.errorMessage(response)});
    }

    this.businessController.addCustomerCareInfo(dataToAdd, onSuccess, onError);
  };


  /**
     * @name editCustomerCareInfo
     * @member MasterDataModule.presentationController
     * @param {User_ID : string, Service_id : string, Status_id : string, Service_Details : {Name : string, Channel_id : string, Status_id : string}, Communication_Records : [{Priority : string, Value : string, Type : string, Status_id : string, Extension : string, Description : string, communicationID : string}]} dataToModify
     */
  MasterData_PresentationController.prototype.editCustomerCareInfo = function(dataToModify){
    var self = this; 
    function onSuccess(response) {
      kony.print("response"+JSON.stringify(response));
      self.fetchAllCustomerCareDetails();
      self.showListofContactsUI({"action":"editSuccess","contacts" : self.allContacts});
    }

    function onError(response) {
      kony.print('Not able to edit contact records');
      self.showListofContactsUI({"action":"editFailure","message":ErrorInterceptor.errorMessage(response)});
    }

    this.businessController.editCustomerCareInfo(dataToModify, onSuccess, onError);
  };


  /**
     * @name updateCustomerCareStatus
     * @member MasterDataModule.presentationController
     * @param {User_ID : string, Status_id : string, Service_id : string, Service_Details : {Status_id : string}} dataToModify
     */
  MasterData_PresentationController.prototype.updateCustomerCareStatus = function(dataToModify){
    var self = this; 
    function onSuccess(response) {
      kony.print("response"+JSON.stringify(response));
      self.fetchAllCustomerCareDetails();
      self.showListofContactsUI({"action":"updateSuccess","contacts" : self.allContacts});
    }

    function onError(response) {
      kony.print('Not able to edit contact records');
      self.showListofContactsUI({"action":"updateFailure","message":ErrorInterceptor.errorMessage(response)});
    }

    this.businessController.editCustomerCareInfo(dataToModify, onSuccess, onError);
  };


  /**
     * @name deleteCustomerCareInfo
     * @member MasterDataModule.presentationController
     * @param {User_ID : string, Service_id : string} dataToDelete
     */
  MasterData_PresentationController.prototype.deleteCustomerCareInfo = function(dataToDelete){
    var self = this; 
    function onSuccess(response) {
      kony.print("response"+JSON.stringify(response));
      self.showListofContactsUI({"action":"deleteSuccess"});
    }

    function onError(response) {
      kony.print('Not able to delete customer care data');
      self.showListofContactsUI({"action":"deleteFailure","message":ErrorInterceptor.errorMessage(response)});
    }

    this.businessController.deleteCustomerCareInfo(dataToDelete, onSuccess, onError);
  };


  MasterData_PresentationController.prototype.showLocationsForm = function (context) {
    this.currentForm = "frmLocations";
    this.presentUserInterface('frmLocations', context);
  };

  MasterData_PresentationController.prototype.showLocationsLoadingScreen = function(){
    this.showLocationsForm({
      action :"showLoadingScreen"
    });
  };

  MasterData_PresentationController.prototype.hideLocationsLoadingScreen = function(){
    this.showLocationsForm({
      action :"hideLoadingScreen"
    });
  };


  /**
     * @name changeStatusOfLocation
     * @member MasterDataModule.presentationController
     * @param string statusId
     * @param string LocationId
     * @param ()=>any cb
     */
  MasterData_PresentationController.prototype.changeStatusOfLocation=function(statusId, LocationId, cb){
    var self = this;
    var params = {
      "Location_id": LocationId,
      "Status_id": statusId
    };
    function onSuccess (res){
      self.hideLocationsLoadingScreen();
      cb("success");
    }

    function onError(res){
      self.hideLocationsLoadingScreen();
      cb("error");
      kony.print("not able to change status of location", res);
    }

    self.showLocationsLoadingScreen();
    self.businessController.changeLocationStatus(params, onSuccess, onError);
  };


  /**
     * @name changeConnectivityStatusOfLocation
     * @member MasterDataModule.presentationController
     * @param string connectivity
     * @param string LocationId
     * @param ()=>any cb
     */
  MasterData_PresentationController.prototype.changeConnectivityStatusOfLocation=function(connectivity, LocationId, cb){
    var self = this;
    var params = {
      "Location_id": LocationId,
      "locationConnectivity": connectivity
    };
    function onSuccess (res){
      self.hideLocationsLoadingScreen();
      cb("success");
    }

    function onError(res){
      self.hideLocationsLoadingScreen();
      cb("error");
      kony.print("not able to change status of location", res);
    }
    self.businessController.changeLocationStatus(params, onSuccess, onError);
    self.showLocationsLoadingScreen();
  };


  /**
     * @name fetchAllLocationDetails
     * @member MasterDataModule.presentationController
     * @param undefined cb
     */
  MasterData_PresentationController.prototype.fetchAllLocationDetails = function(param,cb){
    var self = this;
    this.assignedServices = [];
    this.unassignedServices = [];
    this.currentLocationDetails = null;
    var locRequest,isFirstTime = true;
    if(param){
      locRequest = param;
      isFirstTime = false;
    }else{
      //$top-no of records per page
      locRequest = {"$top":50,
                    "$skip":0};
      isFirstTime = true;
    }
    function onSuccess(response) {
      if(isFirstTime){self.getImportLocationsStatus();}
      self.hideLocationsLoadingScreen();
      self.allLocations=response;
      self.getLocationsResponse=response;
      self.showLocationsForm({"action":"locationsList","locations" : response});
      if (typeof cb === 'function') cb();
    }

    function onError(response) {
      self.hideLocationsLoadingScreen();
      self.showLocationsForm({"action":"error","message":ErrorInterceptor.errorMessage(response)});
      kony.print('Not able to fetch questions records');
    }

    this.businessController.fetchAllLocations(locRequest, onSuccess, onError);
    self.showLocationsLoadingScreen();
  };


  /**
     * @name getLocationDetails
     * @member MasterDataModule.presentationController
     * @param string LocationId
     * @param (locationDetails:{Location_EmailId : string, Location_Type_id : string, Service_id : string, Location_Name : string, Location_Address_id : string, Location_Code : string, Service_Name : string, Location_Status_id : string, Location_Longitude : string, Location_DeleteFlag : string, Location_Display_Name : string, Location_IsMainBranch : string, Location_Phone_Number : string, Location_id : string, Service_Type_id : string, Location_WorkScheduleId : string, ADDRESS : string, Service_Status_id : string, Location_Latitude : string, Service_Description : string, Location_Description : string, services : [{Service_id : object, Service_Description : object, Service_Name : object}]})=>any cb
     */
  MasterData_PresentationController.prototype.getLocationDetails = function(LocationId, cb){
    var self = this; 
    var params = {
      "Location_id": LocationId
    };

    function onSuccess(response) {
      var locations = response.records.filter(function(l) {
        return l.Location_id === LocationId;
      });
      var locationsData = locations[0];
      var facilities = locations.map(function(l) {
        return {
          Facility_id: l.Facility_id,
          Facility_Description: l.Facility_description,
          Facility_Name: l.Facility_name,
        };
      });
      var facilityIds = {};
      locationsData.facilities = facilities
        .filter(function(f) {
        return f.Facility_id !== undefined;
      })
        .filter(function(f) {
        if (facilityIds[f.Facility_id]) return false;
        facilityIds[f.Facility_id] = true;
        return true;
      });
      self.currentLocationDetails = locationsData;
      cb(locationsData);
    }

    function onError(res) {
      cb("error");
    }

    self.showLocationsLoadingScreen();
    this.businessController.getLocationDetails(params, onSuccess, onError);
  };


  /**
     * @name importLocationsCSVFile
     * @member MasterDataModule.presentationController
     * @param {csvFile : {}} csvJSON
     */
  MasterData_PresentationController.prototype.importLocationsCSVFile = function(csvJSON){
    var self = this; 
    var onSuccess = function(response){
      self.fetchAllLocationDetails();
      self.allLocations=self.getLocationsResponse;

      var locationsResponse =  {
        "importLocationsResponse" : response,
        "getLocationsResponse" : self.getLocationsResponse.data
      };
      var importLocationsContext = {
        "action" : "showImportLocationsResponseCount",
        "locationsResponse" : locationsResponse
      };

      self.showLocationsForm(importLocationsContext);
    };

    var onError = function(response){
      var context;
      if(response === 504){
        context = {"action": "importTimeout"};
      } else{
        context = {
          "action" : "showDowntime",
          "message" : ErrorInterceptor.errorMessage(response)
        };
      }
      self.showLocationsForm(context);
    };
    var user_ID = kony.mvc.MDAApplication.getSharedInstance().appContext.userID;

    var csvFile = csvJSON.csvFile;
    var payload = {"user_ID": user_ID, 
                   "branchAtmCSV.csv": csvFile[1]};
    this.businessController.importLocationsCSVFile(payload, onSuccess, onError);
  };

  MasterData_PresentationController.prototype.getSearchedLocations = function(searchText){
    var self = this; 
    var params = {
      "query": searchText
    };
    function onSuccess(response) {
      self.hideLocationsLoadingScreen();
      self.allLocations=response;
      self.showLocationsForm({"action":"searchLocations","locations" : response});
    }

    function onError(response) {
      self.hideLocationsLoadingScreen();
      //self.showLocationsForm({"action":"error","message":ErrorInterceptor.errorMessage(response)});
      kony.print('Not able to fetch questions records');
    }
    this.businessController.getSearchedLocations(params, onSuccess, onError);
  };
  MasterData_PresentationController.prototype.generateLocationsCSV = function(params){
    var self = this; 
    function onSuccess(response) {
      self.showLocationsForm({"action":"fileId","fileId" : response.fileId});
    }

    function onError(response) {
      self.hideLocationsLoadingScreen();
      //self.showLocationsForm({"action":"error","message":ErrorInterceptor.errorMessage(response)});
      kony.print('Not able to fetch questions records');
    }
    this.businessController.generateLocationsCSV(params, onSuccess, onError);
  };
  MasterData_PresentationController.prototype.generateLocationsList = function(params){
    var self = this; 
    function onSuccess(response) {
      self.showLocationsForm({"action":"fileIdLocationsList","fileId" : response.fileId});
    }

    function onError(response) {
      self.hideLocationsLoadingScreen();
      //self.showLocationsForm({"action":"error","message":ErrorInterceptor.errorMessage(response)});
      kony.print('Not able to fetch questions records');
    }
    this.businessController.generateLocationsList(params, onSuccess, onError);
  };

  /**
     * @name addNewLocation
     * @member MasterDataModule.presentationController
     * @param {User_ID : string, Location_id : string, Status_id : string, Location_Details : {Name : string, DisplayName : string, Description : string, Type_id : string, Code : string, Email : string, IsMainBranch : string, PhoneNumber : string}, Service_Details : {AddedServices : [], RemovedServices : []}, Address_Details : {AddressID : string, City_id : string, AddressLine1 : string, Longitude : string, Latitude : string, ZipCode : string, Region_id : string, Country_id : string}, Schedule_Details : {WorkScheduleID : string, WorkScheduleDescription : string, WeekendWorkingDays : {AddedDays : object, RemovedDays : object}, WeekDayStartTime : string, WeekDayEndTime : string, WeekEndStartTime : string, WeekEndEndTime : string}} param
     * @param (resStatus:string)=>any callBack
     */
  MasterData_PresentationController.prototype.addNewLocation = function(param,callBack){
    var self = this; 
    function onSuccess(response) {
      self.hideLocationsLoadingScreen();
      kony.print("Add new location response"+JSON.stringify(response));
      callBack("success");
    }

    function onError(response) {
      self.hideLocationsLoadingScreen();
      kony.print('not able to add data to location');
      callBack("fail");
    }

    this.businessController.addNewLocation(param, onSuccess, onError);
    self.showLocationsLoadingScreen();
  };


  MasterData_PresentationController.prototype.editLocationDetails = function(editLocationDetails, cb){
    var self = this; 
    var param = {};
    function onSuccess(response) {
      self.fetchAllLocationDetails(param,function() {
        cb('success');
      });
      self.hideLocationsLoadingScreen();
    }

    function onError(response) {
      if (typeof cb === 'function') cb('fail');
      self.hideLocationsLoadingScreen();
    }

    this.businessController.editLocationDetails(editLocationDetails, onSuccess, onError);
    self.showLocationsLoadingScreen();
  };


  /**
     * @name fetchLocationPrefillData
     * @member MasterDataModule.presentationController
     * @param (res:{countries : [{Code : object, id : object, Name : object}], 
     				regions : [{Code : object, Country_id : object, id : object, Name : object}], 
                    cities : [{Country_id : object, id : object, Name : object, Region_id : object}], 
                    facilityList : [{}],
                    currencyList : [{}],})=>any callback
     */
  MasterData_PresentationController.prototype.fetchLocationPrefillData = function(callback) {
    var self = this;
    self.globalDetails = {
      countries: null,
      regions: null,
      cities: null,
      facilityList: null,
      currencyList: null
    };

    var promiseFetchCountryList = Promisify(this.businessController, 'fetchCountryList');
    var promiseFetchRegionList = Promisify(this.businessController, 'fetchRegionList');
    var promiseFetchCityList = Promisify(this.businessController, 'fetchCityList');
    var promiseGetFacilities = Promisify(this.businessController, 'getFacilities');
    var promiseGetCurrencies = Promisify(this.businessController, 'getCurrencies');

    Promise.all([
      promiseFetchCountryList({}),
      promiseFetchRegionList({}),
      promiseFetchCityList({}),
      promiseGetFacilities({}),
      promiseGetCurrencies({})
    ]).then(function (responses) {
      self.globalDetails.countries = responses[0];
      self.globalDetails.regions = responses[1];
      self.globalDetails.cities = responses[2];
      self.globalDetails.facilityList = responses[3];
      self.globalDetails.currencyList = responses[4];
      self.hideLocationsLoadingScreen();
      if (typeof callback === 'function') callback(self.globalDetails);
    }).catch(function (res) {
      self.hideLocationsLoadingScreen();
      callback("error");
      kony.print("unable to fetch preloaded data",res);
    });
  };

  /**
     * @name fetchGlobalAddressData
     * @member MasterDataModule.presentationController
     * @param string addressString
     * @param string addressCode
     */
  MasterData_PresentationController.prototype.fetchGlobalAddressData = function (addressString, addressCode) {
    kony.print("Inside fetchGlobalAddressData() of MasterData_PresentationController");
    var self = this;

    if(addressString === "country") {
      self.showLocationsForm({
        globalAddress : {
          regions : self.globalDetails.regions,
          addressCode : addressCode
        } 
      });
    } else if(addressString === "region") {
      self.showLocationsForm({
        globalAddress : {
          cities : self.globalDetails.cities,
          addressCode : addressCode
        } 
      });
    }
  };
  /**
     * @name getImportLocationsStatus
     * @member MasterDataModule.presentationController
     * 
     */
  MasterData_PresentationController.prototype.getImportLocationsStatus = function () {
    var self = this;
    function onSuccess(response) {
      self.hideLocationsLoadingScreen();
      self.showLocationsForm({"action":"importStatusCheck",
                              "response" : response,
                              "status":"success"});
    }
    function onError(error) {
      self.showLocationsForm({ "action":"importStatusCheck",
                              "response" : ErrorInterceptor.errorMessage(error),
                              "status":"error"});
      self.hideLocationsLoadingScreen();
    }
    this.businessController.getImportLocationsStatus({}, onSuccess, onError);
    self.showLocationsLoadingScreen();
  };

  MasterData_PresentationController.prototype.showProgressBarProducts = function(){
    this.showProductsForm({progressBar : {
      show : "success"
    }});
  };

  MasterData_PresentationController.prototype.hideProgressBarProducts = function(){
    this.showProductsForm({progressBar : {
      show : "fail"
    }});
  };

  MasterData_PresentationController.prototype.showProductsForm = function(context) {
    this.currentForm = "frmLocations";
    this.presentUserInterface("frmProduct",context);
  };


  /**
     * @name fetchAllProducts
     * @member MasterDataModule.presentationController
     * 
     */
  MasterData_PresentationController.prototype.fetchAllProducts = function () {
    kony.print("Inside fetchAllProducts() of MasterData_PresentationController");
    var self = this;
    function onSuccess(response) {
      self.hideProgressBarProducts();
      kony.print("response"+JSON.stringify(response));
      self.productsModel.productsList=response.productCatalogue;
      self.productsModel.context="viewProductsList";
      self.showProductsForm(self.productsModel);
    }

    function onError(response) {
      self.productsModel.context="error";
      self.productsModel.message=ErrorInterceptor.errorMessage(response);
      self.showProductsForm(self.productsModel);
      self.hideProgressBarProducts();
      kony.print('Not able to fetch product records'+ response);
    }

    //this.businessController.getProducts({}, onSuccess, onError); //Commented since new data coming from Microservices
    this.businessController.getProductListFromMS({}, onSuccess, onError);
    this.showProgressBarProducts();
  };

  MasterData_PresentationController.prototype.openAppManagement = function(context) {
    var base_url ;
    var append_url ;
	if(context.productType === "Lending"){
      base_url = kony.adminConsole.utils.clientProperties.AC_INFINITY_ASSIST_URL;
      append_url = "#_frmLoginKA?requestId="+context.requestId;
      window.open(base_url+append_url,"_self");
    }else{
      base_url = kony.adminConsole.utils.clientProperties.AC_TASK_MANAGEMENT_URL;
      append_url = "#_frmLogin?applicationID="+context.applicationId;
      window.open(base_url+append_url,"_self");
    }
  };

  MasterData_PresentationController.prototype.getProducts = function () {
    this.showProductsForm({action : "getProducts"});
  };

  MasterData_PresentationController.prototype.openJourneyManager = function(context) {

    if(kony.adminConsole.utils.clientProperties && kony.adminConsole.utils.clientProperties.AC_APPLICATION_MANAGEMENT_URL){
      let url = kony.adminConsole.utils.clientProperties.AC_APPLICATION_MANAGEMENT_URL;
      var ssoEncToken = window.localStorage.getItem('ssoAuth');
      var generatedkey = window.localStorage.getItem('ssoSecretKey');
      var applicationId = context && context.applicationId ? context.applicationId : null;
      var my_form=document.createElement('FORM');
      my_form.name='myForm';
      my_form.method='POST';
      my_form.target='_blank';
      my_form.action=url;

      var my_tb=document.createElement('INPUT');
      my_tb.type='hidden';
      my_tb.name='key';
      my_tb.value=generatedkey;
      my_form.appendChild(my_tb);

      my_tb=document.createElement('INPUT');
      my_tb.type='HIDDEN';
      my_tb.name='token';
      my_tb.value=ssoEncToken;
      my_form.appendChild(my_tb);

      my_tb=document.createElement('INPUT');
      my_tb.type='HIDDEN';
      my_tb.name='applicationId';
      my_tb.value=applicationId;
      my_form.appendChild(my_tb);
      document.body.appendChild(my_form);
      my_form.submit();
    } else {
      kony.web.logger("error", "cannot find AC_APPLICATION_MANAGEMENT_URL property");
    }

  };

  MasterData_PresentationController.prototype.openJADashboard = function(context) {
    var self = this;
    function getJWTTokenSuccess(response) {
      var token = response.token;
      // all client properties will be stored in global parameters. Hence call to fetch the same is deleted
      if(kony.adminConsole.utils.clientProperties && kony.adminConsole.utils.clientProperties.AC_JA_MANAGEMENT_URL){
        onSuccess(kony.adminConsole.utils.clientProperties.AC_JA_MANAGEMENT_URL, token);
      } else {
        onError();
      }
    }

    function getJWTTokenError(response) {
      kony.web.logger("error while generating JWT token"+ response);
    }
    this.businessController.getJWTToken({}, getJWTTokenSuccess, getJWTTokenError);
    function onSuccess(url, token){
      //       var ssoEncToken = window.localStorage.getItem('ssoAuth');
      //       var generatedkey = window.localStorage.getItem('ssoSecretKey');
      var applicationId = context && context.applicationId ? context.applicationId : null;
      var my_form=document.createElement('FORM');
      my_form.name='myForm';
      my_form.method='POST';
      my_form.target='_blank';
      my_form.action=url;
      //       my_form.setAttribute("Authorization",token);

      var my_tb=document.createElement('INPUT');
      my_tb.type='hidden';
      my_tb.name='Authorization';
      my_tb.value=token;
      my_form.appendChild(my_tb);

      //       my_tb=document.createElement('INPUT');
      //       my_tb.type='HIDDEN';
      //       my_tb.name='Authorization';
      //       my_tb.value=token;
      //       my_form.appendChild(my_tb);

      //       my_tb=document.createElement('INPUT');
      //       my_tb.type='HIDDEN';
      //       my_tb.name='applicationId';
      //       my_tb.value=applicationId;
      //       my_form.appendChild(my_tb);
      document.body.appendChild(my_form);
      my_form.submit();
    }

    function onError(){
      kony.web.logger("error", "cannot find AC_JA_MANAGEMENT_URL property");
    }
  };

  MasterData_PresentationController.prototype.openTaskManagement = function(context) {
    var my_form=document.createElement('FORM');
    my_form.name='myForm';
    my_form.method='POST';
    my_form.target='_self';
    my_form.action=kony.adminConsole.utils.clientProperties.AC_TASK_MANAGEMENT_URL;
    document.body.appendChild(my_form);
    my_form.submit();
  };
  
  MasterData_PresentationController.prototype.openInfinityAssist = function(context) {
    var my_form=document.createElement('FORM');
    my_form.name='myForm';
    my_form.method='POST';
    my_form.target='_blank';
    my_form.action=kony.adminConsole.utils.clientProperties.AC_INFINITY_ASSIST_URL;
    document.body.appendChild(my_form);
    my_form.submit();
  };

  return MasterData_PresentationController;
});
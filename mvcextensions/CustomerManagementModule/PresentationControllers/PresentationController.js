define(['Promisify', 'ErrorInterceptor', 'ErrorIsNetworkDown',], function (Promisify, ErrorInterceptor, isNetworkDown) {

  let CDPReportRequestedCustomer = [];
  let CDPReportDownloadStatus = {};
  var legalEntityArray = [];
  var LEArray = [];
  var SuspendedLEArray = [];
  var Id;
  var legalEntity;
  var userIderror;
  function CustomerManagement_PresentationController() {
    kony.mvc.Presentation.BasePresenter.call(this);
    this.searchCount = 0;
    this.companies = [];
    this.AsyncLoadingModel = {
      isAsyncLoading: false,
      currentCTR: 0,
      expectedCTR: 0
    };
    this.customerCreateModel = {
      usernameRulesAndPolicy: null
    };
    this.searchInputs = {
      name: null,
      firstname: null,
      lastname: null,
      email: null,
      id: null,
      phone: null,
      username: null,
      applicationId: null,
      SSN: null,
      driverLicense: null
    };
    this.searchModel = {
      customers: null,
      target: null
    };
    this.searchModel1 = {
      customers: null,
      target: null
    };
    this.CustomerBasicInfo = {
      customer: null,
      configuration: null,
      target: null,
      linkDelinkConfig:false,
      clientConfigurations:null
    };
    this.ApplicantInfo = {
      applicant: null
    };
    this.CustomerContactInfo = {
      Addresses: null,
      Emails: null,
      ContactNumbers: null,
      PreferredContactMethod: null,
      PreferredContactTime: null,
      target: null,
      subTarget: null
    };
    this.toastModel = {
      message: null,
      status: null,
      operation: null,
      context: null
    };
    this.searchTarget = null;
    this.StatusGroup = null;
    this.AllGroups = null;
    this.CustomerNotes = null;
    this.CustomerAccounts = null;
    this.AccountTrasactions = null;
    this.CustomerSessions = null;
    this.CustomerSessionActivities = null;
    this.CustomerGroups = {
      AssignedGroups: [],
      AllGroups: [],
      target: null
    };
    this.CustomerEntitlements = {
      AssignedEntitlements: [],
      AllEntitlements: [],
      CustomerIndirectEntitlements: [],
      target: null
    };
    this.CustomerIndirectEntitlements = null;
    this.AllEntitlements = null;
    this.AddressModel = {
      countries: [],
      states: [],
      cities: []
    };
    this.addressTypes =[];
    this.prefData = {
      AlertCategoryId: null,
      categories: null,
      catPref: null,
      channelPref: null,
      typePref: null
    };
    this.ActivityHistory = {
      modulesMap:null,
      activityMap:null
    };
    this.CustomerRequestAndNotificationCount = null;
    this.LockedOnInfo = null;
    this.CustomerRequests = null;
    this.CustomerNotifications = null;
    this.alertHistory = null;
    this.CoreBankingUpdate = null;
    this.customerLockStatus = null;
    this.OnlineBankingLogin = null;
    this.SEARCH_CONFIG_LOANS = "LOANS";
    this.SEARCH_CONFIG_BANKING = "BANKING";
    this.SEARCH_CONFIG_BASIC = "BASIC";
    this.LoansMasterData = null;
    this.custSearchLEId = "";
    this.sourceFormDetail = {
      name : null,
      data : null
    };
    this.temporaryContract = null;
    this.enrollCustAccountsFeatures = {};
    this.setGoogleMapAPIKeys();
  }

  inheritsFrom(CustomerManagement_PresentationController, kony.mvc.Presentation.BasePresenter);

  CustomerManagement_PresentationController.prototype.initializePresentationController = function () {
    var self = this;
    ErrorInterceptor.wrap(this, 'businessController').match(function (on) {
      return [
        on(isNetworkDown).do(function () {
          self.presentUserInterface('frmCustomerManagement', {
            NetworkDownMessage: {}
          });
        })
      ];
    });
  };

  /**
    * @name showCustomerManagement
    * @member CustomerManagementModule.presentationController
    * 
    */
  CustomerManagement_PresentationController.prototype.showCustomerManagement = function () {
    this.navigateTo('CustomerManagementModule', 'loadCustomerManagement');
  };

  /**
    * @name getCDPReportRequestedStatus
    * @member CustomerManagementModule.presentationController
    * 
    */
  CustomerManagement_PresentationController.prototype.getCDPReportRequestedStatus = function (customerId) {
    return CDPReportRequestedCustomer.includes(customerId);    
  };

  /**
    * @name setCDPReportRequestedStatus
    * @member CustomerManagementModule.presentationController
    * 
    */
  CustomerManagement_PresentationController.prototype.setCDPReportRequestedStatus = function (customerId) {
    CDPReportRequestedCustomer.push(customerId);
  };

  /**
    * @name getCDPReportDownloadedStatus
    * @member CustomerManagementModule.presentationController
    * 
    */
  CustomerManagement_PresentationController.prototype.getCDPReportDownloadedStatus = function (customerId) {
    return CDPReportDownloadStatus.hasOwnProperty(customerId) ? CDPReportDownloadStatus[customerId] : null;
  };

  /**
    * @name setCDPReportDownloadedStatus
    * @member CustomerManagementModule.presentationController
    * 
    */
  CustomerManagement_PresentationController.prototype.setCDPReportDownloadedStatus = function (customerId,status) {
    CDPReportDownloadStatus[customerId] = status;
  };

  /**
    * @name showCompaniesCustomerEdit
    * @member CustomerManagementModule.presentationController
    * 
    */
  CustomerManagement_PresentationController.prototype.showCompaniesCustomerEdit = function (context,navigationParams) {
    this.navigateTo('CompaniesModule', 'navigateToEditCustomerScreen',[context, navigationParams]);
  };

  CustomerManagement_PresentationController.prototype.loadCustomerManagement = function () {
    this.presentUserInterface('frmCustomerManagement', { "showCustomerSearch": true, "shouldReset": true });
    this.AsyncLoadingModel.isAsyncLoading = true;
    this.AsyncLoadingModel.currentCTR = 0;
    this.AsyncLoadingModel.expectedCTR = 3;
    //this.getCitiesStatesAndCountries();
    this.AsyncLoadingModel.expectedCTR = 2;
    this.getBusinessConfigurations();
    // fetching the system configuration if it's not invoked
    if(!this.CustomerBasicInfo.clientConfigurations){
      this.getSystemConfigurations();
    }
    
    this.sourceFormDetail = {
      name : null,
      data : null
    };
  };

  /**
     * @name displayCustomerMangement
     * @member CustomerManagementModule.presentationController
     * 
     */
  CustomerManagement_PresentationController.prototype.displayCustomerMangement = function () {
    this.presentUserInterface('frmCustomerManagement', { "showCustomerSearch": true, "shouldReset": true });
    this.AsyncLoadingModel.isAsyncLoading = true;
    this.AsyncLoadingModel.currentCTR = 0;
    this.AsyncLoadingModel.expectedCTR = 1;
    //this.getCitiesStatesAndCountries();
    //is.getAllCompanies();
    this.getBusinessConfigurations();
    this.sourceFormDetail = {
      name : null,
      data : null
    };
  };

  CustomerManagement_PresentationController.prototype.displayCustomerMangementSearchForm = function () {
    this.presentUserInterface('frmCustomerManagement', { "showCustomerSearch": true });
  };

  CustomerManagement_PresentationController.prototype.navigateToProfileForm = function () {
    this.navigateTo('CustomerManagementModule', 'showCustomerManagementPersonal');
  };

  CustomerManagement_PresentationController.prototype.showCustomerManagementPersonal = function () {
    var self = this;
    self.presentUserInterface('frmCustomerProfileContacts', { "CustomerBasicInfo": self.CustomerBasicInfo });
  };

  CustomerManagement_PresentationController.prototype.turnOnCustomerManagementPersonal = function () {
    this.presentUserInterface('frmCustomerProfileContacts', { "HeaderRefresh": true });
  };
  CustomerManagement_PresentationController.prototype.turnOnCustomerManagementSearch = function () {
    this.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
  };
  CustomerManagement_PresentationController.prototype.diplayCustomerProfileFromOtherModule = function (Customer_id,legalEntityId,formDetail) {
    var viewModel = { "showCustomerSearch": true, "shouldReset": true };
    //display toast message when navigated from other forms in search screen
    if(formDetail && formDetail.toast && formDetail.toast.status === "success") {
     viewModel['toastModel']= {"status":"SUCCESS","message":formDetail.toast.message};
    }else if(formDetail && formDetail.toast && formDetail.toast.status === "error"){
      viewModel['toastModel'] = {"status":"FAILURE","message":formDetail.toast.message };
    }
    this.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerManagement',viewModel);
    this.AsyncLoadingModel.isAsyncLoading = true;
    this.AsyncLoadingModel.currentCTR = 0;
    this.AsyncLoadingModel.expectedCTR = 3;
    this.sourceFormDetail = formDetail || null;
    this.getCitiesStatesAndCountries();
    this.getBusinessConfigurations();
    this.getSystemConfigurations();
    this.getAllCompanies();
    var legalEntity = legalEntityId;//this.getCurrentCustomerDetails().legalEntityId || this.custSearchLEId;
    this.custSearchLEId = legalEntityId;
    this.getCustomerBasicInfo({ "Customer_id": Customer_id,"legalEntityId": legalEntity || "" }, "InfoScreen", null);
  };
  CustomerManagement_PresentationController.prototype.sourceFormNavigatedFrom = function () {
    return this.sourceFormDetail;
  };
  CustomerManagement_PresentationController.prototype.navigateToContactsTab = function (Customer_id) {
    this.CustomerBasicInfo.target = "InfoScreen";
    var legalEntityId = this.getCurrentCustomerDetails().legalEntityId || this.custSearchLEId;
    if (this.CustomerBasicInfo.customer) {
      this.presentUserInterface('frmCustomerProfileContacts', { "CustomerBasicInfo": this.CustomerBasicInfo });
    } else {
      this.getCustomerBasicInfo({ "Customer_id": Customer_id,"legalEntityId": legalEntityId || ""}, "InfoScreen");
    }
  };

  CustomerManagement_PresentationController.prototype.navigateToAccountsTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
   /* // adding loading indicator for current form 
    this.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    // using forceLayout for loading indicator displaying
    kony.application.getCurrentForm().forceLayout();
    // this.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });*/
    this.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });
    var userId = this.getCurrentCustomerDetails().userId || this.getCurrentCustomerDetails().Customer_id;
    this.presentUserInterface('frmCustomerProfileAccounts', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.getCustomerAccounts({ "userId": userId });
  };

  CustomerManagement_PresentationController.prototype.navigateToHelpCenterTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.getCustomerRequests({ "username": this.getCurrentCustomerDetails().Username });
  };
  CustomerManagement_PresentationController.prototype.navigateToContractsTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    // adding loading indicator for current form 
    this.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    // using forceLayout for loading indicator displaying
    kony.application.getCurrentForm().forceLayout();
    this.presentUserInterface('frmCustomerProfileContracts', { "CustomerBasicInfo": this.CustomerBasicInfo });
    var userId = this.getCurrentCustomerDetails().userId || this.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.getCurrentCustomerDetails().legalEntityId || this.custSearchLEId;
    this.getCustomerContacts({
      "userId": userId,
      "legalEntityId": legalEntityId || "",
    });
    //this.getAllGroups({ "Type_id": this.getCurrentCustomerType()}, "InfoScreen");
  };
  CustomerManagement_PresentationController.prototype.navigateToRolesTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileRoles', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.getAllGroups({ "Type_id": this.getCurrentCustomerType()}, "InfoScreen");
  };

  CustomerManagement_PresentationController.prototype.navigateToActivityHistoryTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileActivityHistory', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.getLastNCustomerSessions({ "customerUsername": this.getCurrentCustomerDetails().Username });
  };

  CustomerManagement_PresentationController.prototype.navigateToAlertHistoryTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    var customerId = this.getCurrentCustomerDetails().Customer_id;
    this.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileAlerts', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.getCustomerAlertHistory({ "CustomerId": customerId },true);
    this.getAlertCategories(customerId);
  };

  CustomerManagement_PresentationController.prototype.navigateToDeviceInfoTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileDeviceInfo', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.getCustomerDevices({ "$filter": "Customer_id eq " + this.getCurrentCustomerDetails().Customer_id });
  };

  CustomerManagement_PresentationController.prototype.navigateToEntitlementsTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: true } });
   // this.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileEntitlements', { "CustomerBasicInfo": this.CustomerBasicInfo });
    var userId = this.getCurrentCustomerDetails().userId || this.getCurrentCustomerDetails().Customer_id;
   // this.getInfinityUserFeatureActions({ "userId": userId}, "InfoScreen");
    var legalEntityId = this.getCurrentCustomerDetails().legalEntityId || this.custSearchLEId;
    this.getCustomerContractInfo({"userId": userId,"legalEntityId":legalEntityId|| ""}, "InfoScreen","frmCustomerProfileEntitlements");
  };

  CustomerManagement_PresentationController.prototype.navigateToDueDiligenceTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileDueDiligence', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileDueDiligence', { "CustomerBasicInfo": this.CustomerBasicInfo });    
  };
  
  CustomerManagement_PresentationController.prototype.navigateToLimitsTab = function () {
    this.CustomerBasicInfo.target = "InfoScreen";
    this.presentUserInterface('frmCustomerProfileLimits', { "LoadingScreen": { focus: true } });
    this.presentUserInterface('frmCustomerProfileLimits', { "CustomerBasicInfo": this.CustomerBasicInfo });
    var userId = this.getCurrentCustomerDetails().userId || this.getCurrentCustomerDetails().Customer_id;
    var legalEntityId = this.getCurrentCustomerDetails().legalEntityId || this.custSearchLEId;
    this.getCustomerContractInfo({"userId": userId,"legalEntityId":legalEntityId|| "",}, "InfoScreen","frmCustomerProfileLimits");
  };
 
  CustomerManagement_PresentationController.prototype.setDataLegalEntities = function (data) {
     this.legalEntityArray = data;
  };  
     
  CustomerManagement_PresentationController.prototype.getDataLegalEntities = function () {
    return this.legalEntityArray;
  }; 
  
  CustomerManagement_PresentationController.prototype.setCustomerId = function (data) {
     this.Id = data;
  };
  
   CustomerManagement_PresentationController.prototype.getCustomerId = function () {
    return this.Id;
  }; 
  
  CustomerManagement_PresentationController.prototype.setActiveLegalEntities = function (data) {
     this.LEArray = data;
  };  
     
  CustomerManagement_PresentationController.prototype.getActiveLegalEntities = function () {
    return this.LEArray;
  }; 
  
  CustomerManagement_PresentationController.prototype.setSuspendedLegalEntities = function (data) {
     this.SuspendedLEArray = data;
  };  
     
  CustomerManagement_PresentationController.prototype.getSuspendedLegalEntities = function () {
    return this.SuspendedLEArray;
  }; 
  
   CustomerManagement_PresentationController.prototype.setsearchByUseridError = function (data) {
     this.userIderror = data;
  };
  
   CustomerManagement_PresentationController.prototype.getsearchByUseridError = function () {
    return this.userIderror;
  }; 
  
  /**
     * @name searchCustomers
     * @member CustomerManagementModule.presentationController
     * @param {_searchType : string, _id : "", _name : string, _username : "", _phone : "", _email : "", _group : "", _requestID : "", _SSN :"", _pageOffset : string, _pageSize : number, _sortVariable : string, _sortDirection : string} data
     * @param string target
     */
  CustomerManagement_PresentationController.prototype.searchCustomers = function (data) {
    var self = this;
    var LEArr = [];
    this.searchModel.customers = [];
    self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: true } });

    function searchCompletionCallback(response) {
      self.searchCount++;
      self.custSearchLEId = data["_legalEntityId"] || "";
      self.searchModel.customers = response.records;
     /* var Id = response.records[0].id;
      self.setCustomerId(Id); */
      self.presentUserInterface('frmCustomerManagement', { "searchModel": self.searchModel });
      self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerManagement', { "toastModel": self.toastModel });
    }

    data["_searchType"] = "CUSTOMER_SEARCH";
    self.businessController.searchCustomers(data, searchCompletionCallback, failureCallback);
  };

    CustomerManagement_PresentationController.prototype.CustomerLegalEntitiesGetOperation = function (data) {
     var self = this;
     var LEArr = [];
     var LegalEntities = [];
     var SuspendLEArray = [];
     var payload = {
       "customerId": data.customerId,
     }
     function searchCompletionCallback(response) {
       if(response.records && response.records[0] &&
          response.records[0].hasOwnProperty('legalEntities') && response.records[0].legalEntities.length > 0) {
        var j=0 , k=0;
       for(var i=0;i<response.records[0].legalEntities.length ;i++) { 
            if(response.records[0].legalEntities[i].statusId==="SID_CUS_ACTIVE") {
             LEArr[j]=response.records[0].legalEntities[i];
             j++;
            }  
           if(response.records[0].legalEntities[i].statusId==="SID_CUS_SUSPENDED") {
             SuspendLEArray[k]=response.records[0].legalEntities[i];
             k++;
            }
         }
       self.setActiveLegalEntities(LEArr);
       self.setSuspendedLegalEntities(SuspendLEArray);  
        for(var i=0;i<response.records[0].legalEntities.length;i++) {
             LegalEntities.push(response.records[0].legalEntities[i]);
         }
       self.setDataLegalEntities(LegalEntities);   
     } else {
       LegalEntities = null;
       self.setDataLegalEntities(LegalEntities);
       LEArr = null;
       self.setActiveLegalEntities(LEArr);
       SuspendLEArray = null;
       self.setSuspendedLegalEntities(SuspendLEArray); 
     }
     }
     function failureCallback(error) {
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
     }
   self.businessController.CustomerLegalEntitiesGetOperation(data, searchCompletionCallback, failureCallback);
  };
  

  //customerSearchByUserName
  CustomerManagement_PresentationController.prototype.customerSearchByUserName = function (data) {
    var self = this;
    //this.searchModel.customers = []; //getCurrentCustomerDetails
    // var 
    self.presentUserInterface('frmEnrollCustomer', { "LoadingScreen": { focus: true } });

    function searchCompletionCallback(response) {
       //self.searchModel.customers = response.records;
      // var backendResponse = response;
      self.presentUserInterface('frmEnrollCustomer', { "customerSearchByName": response });
	    self.presentUserInterface('frmEnrollCustomer', { "LoadingScreen": { focus: false } });
    }

    function failureCallback(error) {
      //self.presentUserInterface('frmEnrollCustomer', { "customerSearchByNameerror": error });
      self.presentUserInterface('frmEnrollCustomer', { "LoadingScreen": { focus: false } });
      if (error && (error.dbpErrCode === 22233)){
        self.presentUserInterface('frmEnrollCustomer', { "customerSearchByNameerror": error });
      }
      else{
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmEnrollCustomer', { "toastModel": self.toastModel });
    }
    }

    // data["_searchType"] = "CUSTOMER_SEARCH";
    // if(data === undefined){
    //   data={}
    // }
    self.businessController.customerSearchByUserName(data, searchCompletionCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.customerSearchByUserName1 = function (data) {
    var self = this;
    var status ;
    this.searchModel1.customers = []; //getCurrentCustomerDetails
    // var 
    self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: true } });

    function searchCompletionCallback(response) {
      self.searchModel1.customers = response.records;
      // var backendResponse = response;
      self.status = 1;
      self.setsearchByUseridError(self.status);
      self.presentUserInterface('frmCustomerManagement', { "searchModel12": self.searchModel1 });
      self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
      if(error && (error.dbpErrCode === 22212 || error.dbpErrCode === 22213)){ //dbpErrCode === 22212(inavlid username),dbpErrCode === 22213(access restricted)
        self.presentUserInterface('frmCustomerManagement', { "searchByUseridError": {"option": error.dbpErrCode === 22212 ? 1 :2} });
        self.status = 1;
          if(error.dbpErrCode === 22213) {
          self.status = 2;
         }
        self.setsearchByUseridError(self.status);
        } else{
        self.toastModel.message = ErrorInterceptor.errorMessage(error);
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface('frmCustomerManagement', { "toastModel": self.toastModel });
      }
    }

    // data["_searchType"] = "CUSTOMER_SEARCH";
    // if(data === undefined){
    //   data={}
    // }
    self.businessController.UserIdSearchOperationDetailedData(data, searchCompletionCallback, failureCallback);
  };
  
  

  CustomerManagement_PresentationController.prototype.isValidForApplicantSearch = function (data) {
    return data["_phone"] || data["_id"] || data["_email"] || data["_SSN"] || data["_IDValue"];
  };
  CustomerManagement_PresentationController.prototype.getUsernameRulesAndPolicy = function (opt) {
    var self = this;
    function successCallback(response) {
      var usernameRulesAndPolicy = {
        usernamerules: response.usernamerules,
        usernamepolicy: response.usernamepolicy
      };
      if(opt === 1){
        self.customerCreateModel.usernameRulesAndPolicy = usernameRulesAndPolicy;
        self.presentUserInterface('frmAssistedOnboarding', self.customerCreateModel);
      } else{
        self.presentUserInterface(kony.application.getCurrentForm().id, {"userNameRulesPolicy":usernameRulesAndPolicy });
      }
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
    }

    function failureCallback(error) {
      self.showToastMessage(ErrorInterceptor.errorMessage(error), kony.i18n.getLocalizedString("i18n.frmGroupsController.error"));
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
    }

    self.businessController.getUsernameRulesAndPolicy({}, successCallback, failureCallback);
  };
  CustomerManagement_PresentationController.prototype.searchCustomersAssistiveOnBoarding = function (data, target) {
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "UserLoadingScreen": { focus: true } });
    function successCallback(response) {
      if (response.records.length === 0) {
        self.presentUserInterface('frmAssistedOnboarding', { "UserLoadingScreen": { focus: false }, "userNameIsAvailable": true });
      }
      else {
        self.presentUserInterface('frmAssistedOnboarding', { "UserLoadingScreen": { focus: false }, "userNameIsAvailable": false });
      }
    }

    function failureCallback(error) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmAssistedOnboarding', { "toastModel": self.toastModel });
    }
    self.businessController.searchCustomers(data, successCallback, failureCallback);
  };
  CustomerManagement_PresentationController.prototype.customerSSNValidation = function (data, target) {
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      if (response.records.length === 0) {
        self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false }, "isSSN": false });
      }
      else {
        self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false }, "isSSN": true, "data": response.records[0] });
      }
    }

    function failureCallback(error) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmAssistedOnboarding', { "toastModel": self.toastModel });
    }
    self.businessController.searchCustomers(data, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerBasicInfo = function () {
    return this.CustomerBasicInfo;
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerType = function () {
    return this.CustomerBasicInfo.customer.CustomerType_id;
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerDetails = function () {
    return this.CustomerBasicInfo.customer;
  };

  CustomerManagement_PresentationController.prototype.getCurrentApplicantDetails = function () {
    return this.ApplicantInfo.applicant;
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerRequestAndNotificationCount = function () {
    return this.CustomerRequestAndNotificationCount;
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerLockedOnInfo = function () {
    return this.LockedOnInfo;
  };

  CustomerManagement_PresentationController.prototype.setCurrentCustomerLockedOnInfo = function (LockedOnInfo) {
    this.LockedOnInfo = LockedOnInfo;
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerEmailInformation = function () {
    var emails = this.CustomerContactInfo.Emails;
    var emailsList = [];
    var primaryEmail = null;
    if (emails) {
      for (var i = 0; i < emails.length; i++) {
        if (emails[i].isPrimary === "true") {
          primaryEmail = emails[i].Value;
        }
        emailsList.push(emails[i].Value);
      }
    }
    return { "emails": emailsList, "primaryEmail": primaryEmail };
  };

  CustomerManagement_PresentationController.prototype.dismissLoadingIndicator = function () {
    var self = this;
    if (self.AsyncLoadingModel.isAsyncLoading) {
      self.AsyncLoadingModel.currentCTR++;
      if (self.AsyncLoadingModel.currentCTR === self.AsyncLoadingModel.expectedCTR) {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
        self.AsyncLoadingModel.isAsyncLoading = false;
        self.AsyncLoadingModel.currentCTR = 0;
        self.AsyncLoadingModel.expectedCTR = 0;
      }
    } else {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
    }
  };

  CustomerManagement_PresentationController.prototype.alertMessageRequestOnClick = function () {
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "alertMessageRequestOnclick": true });
  };

  CustomerManagement_PresentationController.prototype.alertMessageNotificationOnClick = function () {
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "CustomerBasicInfo": this.CustomerBasicInfo });
    this.presentUserInterface('frmCustomerProfileHelpCenter', { "alertMessageNotoficationOnclick": true });
  };
  
  CustomerManagement_PresentationController.prototype.setLegalEntity = function (data) {
     this.legalEntity = data;
  };  
     
  CustomerManagement_PresentationController.prototype.getLegalEntity = function () {
    return this.legalEntity;
  }; 
  /**
    * @name getCustomerBasicInfo
    * @member CustomerManagementModule.presentationController
    * @param {Customer_username : string} data
    * @param string target
    * @param {flxCustMangSearch : string, flxCustMangSearchWrapper : string, flxFirstColumn : string, flxlastColoumn : string, lblContactNo : string, lblEmailId : string, lblHiddenCustomerId : string, lblName : string, lblSeperator : string, lblDOB : string, lblUserId : string, lblUserName : string, lblSSN : string, template : string} 
    */
  CustomerManagement_PresentationController.prototype.getCustomerBasicInfo = function (data, target, previousFormDetails) {
    var self = this;
    let currenForm = kony.application.getCurrentForm().id;
    if (target === "InfoScreenProfile") {
      self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: true } });
    } else {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    }

    if(previousFormDetails && previousFormDetails.name) {
      self.sourceFormDetail.name = previousFormDetails.name;
    }
    if(previousFormDetails && previousFormDetails.data) {
      self.sourceFormDetail.data = previousFormDetails.data;
    }
    //to display toast message after lead creation and navigated to customer
    if(previousFormDetails && previousFormDetails.toast){
      if(previousFormDetails.toast.status === "success") {
         self.presentUserInterface('frmCustomerProfileContacts', { "toastModel": {"status":"SUCCESS","message":previousFormDetails.toast.message } });
      }else{
         self.presentUserInterface('frmCustomerProfileContacts', { "toastModel":{"status":"FAILURE","message":previousFormDetails.toast.message }});
      }
    }

    function successCallback(response) {
      let Customer_id = response.customerbasicinfo_view.Customer_id;
      let payload = {
        "Customer_id" : Customer_id,
        "isCDPFlow":"true"
      };
      var legalEntity =response.customerbasicinfo_view.legalEntityId ||data.legalEntityId ;
      self.setLegalEntity(legalEntity);
      var Id = response.customerbasicinfo_view.id;
      self.setCustomerId(Id);
      self.custSearchLEId = legalEntity;
      if ( response.customerbasicinfo_view.CustomerType_id === self.AdminConsoleCommonUtils.constantConfig.PROSPECT_TYPE ) {
        self.getCustomerApplicationsForCDP(payload,(customerApplication)=> {
          if(customerApplication && customerApplication[0]) {
            let checkProspectStatusPayload = {
              applicationId : customerApplication[0].ApplicationId,
              applicationType : customerApplication[0].ApplicationType
            }
            self.businessController.checkProspectStatus(checkProspectStatusPayload, (status)=>{
              successCallbackCommonFlow(response,!(status.isVerifiedParty==="true"));
            }, (err) => {
              self.presentUserInterface(currenForm, { "LoadingScreen" : { focus: false } });
              self.presentUserInterface(currenForm, { "toastModel" : { message:ErrorInterceptor.errorMessage(err), status:"FAILURE" }});
            });
          } else {
              self.presentUserInterface(currenForm, { "LoadingScreen": { focus: false }});
              successCallbackCommonFlow(response,false);
          }
        }, (error) => {
          self.presentUserInterface(currenForm, { "LoadingScreen": { focus: false } });
          self.presentUserInterface(currenForm, { "toastModel": {message:ErrorInterceptor.errorMessage(error),status:"FAILURE"}});
        }); 
      } else {
        successCallbackCommonFlow(response,false);
      }
    }

    function successCallbackCommonFlow(response,prospectStatus) {
      if (target === "InfoScreenProfile") {
        self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
      } else {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      }

      self.CustomerBasicInfo.customer = response.customerbasicinfo_view;
      self.CustomerBasicInfo.customer.prospectStatus = prospectStatus;
      self.CustomerBasicInfo.configuration = response.Configuration;
      var partyId = "partyId" in data ? data.partyId : null;
      if (response.requestCount && response.notificationCount && (response.requestCount != 0 || response.notificationCount != 0)) {
        self.CustomerRequestAndNotificationCount = { "requestCount": response.requestCount, "notificationCount": response.notificationCount };
      }else{
        self.CustomerRequestAndNotificationCount = null;
      }
      self.CustomerBasicInfo.target = target;
      //to navigate from business user edit form to customer profile roles/features form
      var prevFormDetails = self.sourceFormNavigatedFrom();
      if(prevFormDetails && (prevFormDetails.name === "frmCustomerCreate" || prevFormDetails.name === "frmEnrollCustomer")){
        if(prevFormDetails.data === "ROLES") self.navigateToRolesTab();
        else if(prevFormDetails.data === "ACCOUNTS") self.navigateToAccountsTab();
        else if(prevFormDetails.data === "CONTRACTS") self.navigateToContractsTab();
        else if(prevFormDetails.data === "FEATURES") self.navigateToEntitlementsTab();
        else if(prevFormDetails.data === "LIMITS") self.navigateToLimitsTab();
        else self.presentUserInterface('frmCustomerProfileContacts', { "CustomerBasicInfo": self.CustomerBasicInfo, "partyId": partyId });
      }
      else if (target === "InfoScreenPostEdit") {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
        self.presentUserInterface(kony.application.getCurrentForm().id, { "CustomerBasicInfo": self.CustomerBasicInfo });
      } else {
        self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
        self.presentUserInterface('frmCustomerProfileContacts', { "CustomerBasicInfo": self.CustomerBasicInfo, "partyId": partyId });
      }
      
    }

    function failureCallback(error) {
      kony.print("Failed to get customer basic info");
      if (target === "EditScreen") {
        self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(error);
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface('frmCustomerProfileContacts', { "toastModel": self.toastModel });
      } else {
        self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(error);
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface('frmCustomerManagement', { "toastModel": self.toastModel });
      }
    }
    self.businessController.getBasicInfo(data, successCallback, failureCallback);
  };

  /*
    * function to call command handler to get all companies
    * @param: customerID
    */
  CustomerManagement_PresentationController.prototype.getAllCompanies = function () {
    var self = this;
    var payload = {
      "$orderby": "Name"
    };

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.dismissLoadingIndicator();
      self.companies = response.organisation;
      self.presentUserInterface(kony.application.getCurrentForm().id, { "Companies": self.companies });
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print(error.dbpErrMsg);
    }

    self.businessController.getAllCompanies(payload, successCallback, failureCallback);

  };

  /**
   * @name getFilteredCompanies
   * @member CustomerManagement_PresentationController
   * @param: searchText (string)
   * function to get filtered list of Companies based on the searchText provided by the user 
     in the Companies TextBox on frmCustomerManagement. 
   * It's a LIKE search
   */
  CustomerManagement_PresentationController.prototype.getFilteredCompanies = function(searchText) {
    var self = this;
    var payload = {
      "searchText": searchText,
    };
    self.presentUserInterface("frmCustomerManagement", { "LoadingScreen": { focus: true } });
    function successCallback(response){
      /*
      	DUMMY RESPOSE TYPE
      	response = {"companies":[{"Description": "DBX Micro Business", "id": "1", "Type_Id": "TYPE_ID_MICRO_BUSINESS", "Name": "DBX Micro Business"},
        {"Description": "DBX Small Business","id": "2","Type_Id": "TYPE_ID_SMALL_BUSINESS","Name": "DBX Small Business"}], 
        "opstatus": 0, 
        "httpStatusCode": 0}
      */
      self.presentUserInterface("frmCustomerManagement", { "LoadingScreen": { focus: false }, "Companies": response.companies });
    }
    function failureCallback(error){
      self.presentUserInterface("frmCustomerManagement", { "LoadingScreen": { focus: false } });
      kony.print(error.dbpErrMsg);
    }
    self.businessController.getFilteredCompanies(payload, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerContactInfo = function () {
    return this.CustomerContactInfo;
  };

  /**
     * @name getCustomerContactInfo
     * @member CustomerManagementModule.presentationController
     * @param {customerID : string} data
     * @param string target
     * @param undefined subTarget
     */
  CustomerManagement_PresentationController.prototype.getCustomerContactInfo = function (data, target, subTarget) {
    var self = this;
    var partyId = "partyId" in data ? data.partyId : null;
    var payload = {
      "Customer_id": data.customerID,
      "legalEntityId": data.legalEntityId,
      "partyId": partyId
    };

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      response=response.records[0] || {};
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.CustomerContactInfo.Addresses = response.Addresses;
      self.CustomerContactInfo.Emails = response.EmailIds;
      self.CustomerContactInfo.ContactNumbers = response.ContactNumbers;
      self.CustomerContactInfo.PreferredContactMethod = response["PreferredContactMethod"];
      self.CustomerContactInfo.PreferredContactTime = response["PreferredContactTime"];
      self.CustomerContactInfo.target = target;
      self.CustomerContactInfo.subTarget = subTarget;
      self.CustomerContactInfo.userId = response.userId;
      
      self.CustomerBasicInfo.customer.userId = response.userId;
      
      self.presentUserInterface(kony.application.getCurrentForm().id, { "CustomerContactInfo": self.CustomerContactInfo });
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print("Failed to get customer contact info" + error.dbpErrMsg);
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "getContactInfo";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    self.businessController.getContactInfo(payload, successCallback, failureCallback);

  };
  CustomerManagement_PresentationController.prototype.getAddressTypes = function ()
  {
   var self =this;
    var payload ={};
    function successCallback(response){
      var addressTypesRes =[];
      if(response.rawResponse){
        addressTypesRes = JSON.parse(response.rawResponse).addresstype;
      } else{
        addressTypesRes = response.addresstype;
      }
      self.addressTypes = addressTypesRes;
      self.presentUserInterface(kony.application.getCurrentForm().id,{"getAddressType":self.addressTypes});
    }
    function failureCallback(error)
    {
      kony.print(error);
    }
    if(self.addressTypes.length === 0){
      self.businessController.getAddressTypes(payload,successCallback,failureCallback);
    }else{
      successCallback({"addresstype": self.addressTypes});
    }
  };
	CustomerManagement_PresentationController.prototype.sendActivationCode = function (data, target,subTarget){
      var self = this;
       var payload = {
      "Customer_id": data.customerID
    };
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
	function successCallback(response) {
      if(response.status)
      kony.print(response.status);
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.CustomerContactInfo.target = target;
      self.CustomerContactInfo.subTarget = subTarget;
      kony.print("Activation Code sent successful");
      self.toastModel.message = data.isSCADisabled ? "Username and Activation Code sent to customer successfully" : "Activation Code sent to customer successfully";
      self.toastModel.status = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS");
      self.toastModel.operation = "EnrollNow";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      self.presentUserInterface(kony.application.getCurrentForm().id,{ "sendActivationCode":true});
      
    }
      function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print("Failed to send Activation Code" + error.dbpErrMsg);
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "EnrollNow";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
      self.businessController.sendActivationCode(payload, successCallback, failureCallback);

    };
  /**
     * @name getCustomerNotes
     * @member CustomerManagementModule.presentationController
     * @param {customerID : string} data
     */
  CustomerManagement_PresentationController.prototype.getCustomerNotes = function (data) {
    var self = this;
    var payload = {
      "Customer_id":data.customerID
    };

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      //for keyclock enable case
      if(response.customernotes_view)
     self.CustomerNotes = response.customernotes_view;
      else
      self.CustomerNotes = response.customernotesfetch_view;
      self.presentUserInterface(kony.application.getCurrentForm().id, { "CustomerNotes": self.CustomerNotes }); 
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print("Failed to get customer notes");
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "GetCustomerNotes";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    self.businessController.getCustomerNotes(payload, successCallback, failureCallback);

  };

  /**
       * @name updateDBPUserStatus
       * @member CustomerManagementModule.presentationController
       * @param {customerID : string} data
       */
  CustomerManagement_PresentationController.prototype.updateDBPUserStatus = function (data) {
    var self = this;
    var payload = {
      "customerUsername": data.customerUsername,
      "status": data.status,
      "legalEntityList":data.legalEntityList,
    };

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      if(data.status==="ACTIVE")
        self.toastModel.message = kony.i18n.getLocalizedString("i18n.ProfileManagement.userActivateSuccessMsg");
      else if(data.status === "SUSPENDED")
        self.toastModel.message = kony.i18n.getLocalizedString("i18n.ProfileManagement.userSuspendSuccessMsg");
      else if(data.status === "INACTIVE")
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.ProfileManagement.userBlockedSuccessMsg");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
      self.getCustomerBasicInfo({ "Customer_id": data.Customer_id,"legalEntityId": legalEntityId || "" }, "InfoScreen");
      var customerId = self.getCurrentCustomerDetails().Customer_id;
      self.CustomerLegalEntitiesGetOperation({ "customerId": customerId});
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print("Failed to update user status");
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.updateDBPUserStatus(payload, successCallback, failureCallback);
    
  };

  CustomerManagement_PresentationController.prototype.sendUnlockLinkToCustomer = function (payload) {
    var self = this;

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.CustomerManagement.UnlockLinkSuccessMessage");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print("Failed to send unlock link to customer");
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    self.businessController.sendUnlockLinkToCustomer(payload, successCallback, failureCallback);

  };

  CustomerManagement_PresentationController.prototype.updateStatusData = function (status) {
    this.CustomerBasicInfo.customer.OLBCustomerFlags.Status = status;
  }

  /*
  * function to call command handler to get customer accounts specific alerts
  * @param: customerID or accountnumber
  */
  CustomerManagement_PresentationController.prototype.getAccountSpecificAlerts = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      self.AccountSpecificAlerts = response.accountSpecificAlerts;
      self.presentUserInterface('frmCustomerProfileAlerts', { "AccountSpecificAlerts": self.AccountSpecificAlerts });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
    }

    self.businessController.getAccountSpecificAlerts(data, successCallback, failureCallback);

  };
  
  /**
     * @name getCustomerContacts
     * @member CustomerManagementModule.presentationController
     * @param {CustomerUsername : string} data
     */
    CustomerManagement_PresentationController.prototype.getCustomerContacts = function (data,option) {
      var self = this;
  
      self.presentUserInterface('frmCustomerProfileContracts', { "LoadingScreen": { focus: true } });
  
      function successCallback(response) {
        self.presentUserInterface('frmCustomerProfileContracts', { "LoadingScreen": { focus: false } });
        // self.CustomerAccounts = response.contracts;
              self.presentUserInterface('frmCustomerProfileContracts', { "contractsView": response.contracts,
                                                                     "signatoryGroupsView":response.signatoryGroups
                                                                       });
      }
      
    function failureCallback(error) {      
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    
    self.businessController.getInfinityUserContractDetails( data, successCallback, failureCallback);
  };
  /**
     * @name getCustomerContractInfo
     * @member CustomerManagementModule.presentationController
     * @param {CustomerUsername : string} data
     */
  CustomerManagement_PresentationController.prototype.getCustomerContractInfo = function (input,target,frmName) {
    var self = this;

    self.presentUserInterface(frmName, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface(frmName, { "LoadingScreen": { focus: false } });
      self.presentUserInterface(frmName, { "contractsView": response.contracts,
                                           "featuresList":{"target":target,"FeaturesAndActions": response.contracts } 
                                                               });
    }

    function failureCallback(error) {      
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    self.businessController.getInfinityUserContractDetails( input, successCallback, failureCallback);
  };
  /**
     * @name getCustomerAccounts
     * @member CustomerManagementModule.presentationController
     * @param {CustomerUsername : string} data
     */
  CustomerManagement_PresentationController.prototype.getCustomerAccounts = function (data,option) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      //to show products list getInfinityUserAccounts
      self.presentUserInterface('frmCustomerProfileAccounts',{ "CustomerContracts": response.contracts});
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmCustomerProfileAccounts', { "CustomerAccounts": [] });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "Getaccounts";
      self.presentUserInterface('frmCustomerProfileAccounts', { "toastModel": self.toastModel });
    }
    var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
    self.businessController.getInfinityUserAccounts( {"userId" : data.userId,"legalEntityId": legalEntityId || "" }, successCallback, failureCallback);
  };

  /**
    * @name getCustomerAccountInfo
    * @member CustomerManagementModule.presentationController
    * @param string accountID
    */
  CustomerManagement_PresentationController.prototype.getCustomerAccountInfo = function (accountID) {
    return this.CustomerAccounts.filter(function (x) { return x.accountID === accountID; });
  };

  /**
    * @name getAccountTransactions
    * @member CustomerManagementModule.presentationController
    * @param {AccountNumber : string, StartDate : string, EndDate : string} data
    */
  CustomerManagement_PresentationController.prototype.getAccountTransactions = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });
    self.presentUserInterface('frmCustomerProfileAccounts', { "hideToastModel":  true });
    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.AccountTrasactions = response.Transactions;
      self.presentUserInterface('frmCustomerProfileAccounts', { "AccountTrasactions": self.AccountTrasactions });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileAccounts', { "toastModel": self.toastModel });
    }

    self.businessController.getCustomerTransactions(data, successCallback, failureCallback);

  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerGroups = function () {
    return this.CustomerGroups;
  };

  /**
     * @name getCustomerGroups
     * @member CustomerManagementModule.presentationController
     * @param {customerID : string} data
     * @param string target
     */
  CustomerManagement_PresentationController.prototype.getCustomerGroups = function (data, target) {
    var self = this;
    var payload = {
      "$filter": "Customer_id eq " + data.customerID
    };

    self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
      self.CustomerGroups.AssignedGroups = response.customergroupinfo_view;
      self.CustomerGroups.AllGroups = self.AllGroups;
      self.CustomerGroups.target = target;
      self.presentUserInterface('frmCustomerProfileRoles', { "CustomerGroups": self.CustomerGroups });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
      kony.print("Failed to get customer groups");
    }

    self.businessController.getCustomerGroups(payload, successCallback, failureCallback);

  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerEntitlements = function () {
    return this.CustomerEntitlements;
  };

  /*
        * function to call command handler to get customer entitlements
        * @param: customerID
        */
  CustomerManagement_PresentationController.prototype.getAllEntitlements = function () {
    var self = this;
    function successCallback(response) {
      self.AllEntitlements = response.service;
    }

    function failureCallback(response) {
      kony.print("Failed to get all entitlements");
    }

    if (!self.AllEntitlements) {
      self.businessController.getAllEntitlements({}, successCallback, failureCallback);
    }

  };
  
  /**
     * @name getGroupFeaturesAndActions
     * @member CustomerManagementModule.presentationController
     * @param {​​​​​"group_id": string} data
     * @param string target
     */
    CustomerManagement_PresentationController.prototype.getGroupFeaturesAndActions = function (userRoleID,legalEntityId , target) {
      var self = this;
      self.presentUserInterface(target, { "LoadingScreen": { focus: true } });

      function successCallback(response) {
        self.presentUserInterface(target, { "LoadingScreen": { focus: false } });
        self.presentUserInterface(target, { "featureDetails": response});
      }

      function failureCallback(response) {
        self.presentUserInterface(target, { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(response);
        self.toastModel.status = "FAILURE";
        self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
        kony.print("Failed to get customer entitlements");
      }
      self.businessController.getGroupFeaturesAndActions({'group_id': userRoleID,"legalEntityId":legalEntityId} , successCallback, failureCallback);

    };
  
  /**
     * @name getInfinityUserFeatureActions
     * @member CustomerManagementModule.presentationController
     * @param {customerID : string} data
     * @param string target
     */
    CustomerManagement_PresentationController.prototype.getInfinityUserFeatureActions = function (data, target, cardContext) {
      var self = this;
     // self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: true } });
      self.presentUserInterface('frmCustomerProfileEntitlements', { "hideToastModel":  true });

      function successCallback(response) {
        
        self.CustomerEntitlements.target = target;
        if(cardContext){ //for customer specific features on expand arrow click
           self.presentUserInterface('frmCustomerProfileEntitlements', { "custFeaturesList":{"FeaturesAndActions": response,"cardContext":cardContext} });
        }else{ // for all features fetch on featureaction tab click
           self.presentUserInterface('frmCustomerProfileEntitlements', { "featuresList":{"target":target,"FeaturesAndActions": response } });
        }
       
        self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: false } });
      }

      function failureCallback(response) {
        self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(response);
        self.toastModel.status = "FAILURE";
        self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
        kony.print("Failed to get customer entitlements");
      }
      self.businessController.getInfinityUserFeatureActions(data, successCallback, failureCallback);

    };
  
  /**
     * @name getInfinityUserLimits
     * @member CustomerManagementModule.presentationController
     * @param {customerID : string} data
     * @param string target
     */
    CustomerManagement_PresentationController.prototype.getInfinityUserLimits = function (data, target, cardContext) {
      var self = this;
      self.presentUserInterface('frmCustomerProfileLimits', { "LoadingScreen": { focus: true } });

      function successCallback(response) {
        self.presentUserInterface('frmCustomerProfileLimits', { "LoadingScreen": { focus: false } });
        self.CustomerEntitlements.target = target;
        if(cardContext){
          self.presentUserInterface('frmCustomerProfileLimits', { "custLimitsList":{"FeaturesAndActions": response,"cardContext":cardContext } });
        }else{
          self.presentUserInterface('frmCustomerProfileLimits', { "limitsList":{"target":target,"FeaturesAndActions": response } });
        }
        
      }

      function failureCallback(response) {
        self.presentUserInterface('frmCustomerProfileLimits', { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(response);
        self.toastModel.status = "FAILURE";
        self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
        kony.print("Failed to get customer Limits");
      }
      self.businessController.getInfinityUserLimits(data, successCallback, failureCallback);

    };
  
  /**
     * @name getFeaturesActionsBasedOnAccounts
     * @member CustomerManagementModule.presentationController
     * @param {username : string} data
     * @param string target
     */
  CustomerManagement_PresentationController.prototype.getFeaturesActionsBasedOnAccounts = function (data, target) {
    var self = this;
    self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: false } });
      self.CustomerEntitlements.target = target;
      self.presentUserInterface('frmCustomerProfileEntitlements', { "FeaturesAndActionsForBB":{"target":target,"groups": response.groups} });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(response);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      kony.print("Failed to get customer entitlements");
    }

    self.businessController.getFeaturesActionsBasedOnAccounts(data, successCallback, failureCallback);

  };
  /**
    * @name getAdditionalFeaturesAndActions
    * @member CustomerManagementModule.presentationController
    * @param {username : string} data
    * @param string target
    */
  CustomerManagement_PresentationController.prototype.getAdditionalFeaturesAndActions = function (payload, target) {
    var self = this;
    self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileRoles', {"additionalFeaturesAndActions": response.otherFeaturesAndActions,
                                                            "target": target});
      self.getAllFeaturesAndActionsDetails();
    }

    function failureCallback(error) {
      self.getAllFeaturesAndActionsDetails();
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmCustomerProfileRoles', { "toastModel": self.toastModel });
    }

    self.businessController.getAdditionalFeaturesAndActions(payload, successCallback, failureCallback);

  };

  /**
     * @name getAllGroups
     * @member CustomerManagementModule.presentationController
     * 
     */
  CustomerManagement_PresentationController.prototype.getAllGroups = function (context) {
    var self = this;

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.AllGroups = response.groups;
      self.getCustomerGroups({ "customerID": self.getCurrentCustomerDetails().Customer_id }, "InfoScreen");
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    self.businessController.getAllGroups(context, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.getDueDilignece = function () {
    //alert("OnClick Added"); 
    var self = this;

    self.presentUserInterface('frmCustomerProfileDueDiligence', {});

  };
  /*
        * function to call command handler to get status group
        * 
        */
  CustomerManagement_PresentationController.prototype.getStatusGroup = function (data) {
    var self = this;
    if(self.StatusGroup && self.StatusGroup.length > 0){
      self.presentUserInterface(kony.application.getCurrentForm().id, { "StatusGroup": self.StatusGroup });
    }else{
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

      function successCallback(response) {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
        self.StatusGroup = response.status;
        self.presentUserInterface(kony.application.getCurrentForm().id, { "StatusGroup": self.StatusGroup });
      }

      function failureCallback(response) {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
        kony.print("Failed to get status group");
        self.presentUserInterface(kony.application.getCurrentForm().id, { "StatusGroup": [] });
      }

      self.businessController.getStatusGroup({}, successCallback, failureCallback);
    }
  };

  /**
     * @name createNote
     * @member CustomerManagementModule.presentationController
     * @param {Customer_id : string, Note : string, Internal_username : string} data
     * @param string target
     */
  CustomerManagement_PresentationController.prototype.createNote = function (data, target) {
    var self = this;

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });

      self.toastModel.message = "Customer note created successfully.";
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "CreateNote";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      self.getCustomerNotes({ "customerID": data.Customer_id });
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "CreateNote";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      self.getCustomerNotes({ "customerID": data.Customer_id });
    }

    self.businessController.createNote(data, successCallback, failureCallback);

  };

  /*
        * function to call command handler to edit customer basic info
        * @param: Edit data
        */
  CustomerManagement_PresentationController.prototype.editCustomerBasicInfo = function (data) {
    var self = this;

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = "Customer profile edit complete.";
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
      self.getCustomerBasicInfo({ "Customer_id": data.Customer_id,"legalEntityId": legalEntityId || "" }, "InfoScreenPostEdit");
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
      self.getCustomerBasicInfo({ "Customer_id": data.Customer_id,"legalEntityId": legalEntityId || ""}, "InfoScreenPostEdit");
    }

    self.businessController.editCustomerBasicInfo(data, successCallback, failureCallback);

  };

  /*
        * function to call command handler to edit customer groups
        * @param: Edit data
        */
  CustomerManagement_PresentationController.prototype.editCustomerGroups = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.editCustomerRoleSuccess");
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileRoles', { "toastModel": self.toastModel });
      self.getCustomerGroups({ "customerID": data.Customer_id }, "InfoScreen");
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileRoles', { "toastModel": self.toastModel });
      self.getCustomerGroups({ "customerID": data.Customer_id }, "InfoScreen");
    }

    self.businessController.editCustomerGroups(data, successCallback, failureCallback);

  };

  /*
        * function to call command handler to edit customer entitlements
        * @param: Edit data
        */
  CustomerManagement_PresentationController.prototype.editCustomerEntitlements = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.editCustomerPermissionSuccess");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface('frmCustomerProfileEntitlements', { "toastModel": self.toastModel });
      self.getCustomerEntitlements({ "customerID": data.Customer_id }, "InfoScreen");
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileEntitlements', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmCustomerProfileEntitlements', { "toastModel": self.toastModel });
      self.getCustomerEntitlements({ "customerID": data.Customer_id }, "InfoScreen");
    }

    self.businessController.editCustomerEntitlements(data, successCallback, failureCallback);

  };
    /* 
  To get all the features with respective actions 
  */
  CustomerManagement_PresentationController.prototype.getAllFeaturesAndActionsDetails =function(category){
    var self = this;
    var formName = category === "enroll" ?  "frmEnrollCustomer" : "frmCustomerProfileRoles";
    self.presentUserInterface(formName, { "LoadingScreen": { focus: true } });
    function onSuccess(response) {
      if(category === "enroll"){
        self.presentUserInterface('frmEnrollCustomer', { "LoadingScreen": { focus: false } });
        self.presentUserInterface('frmEnrollCustomer', { "allFeaturesActions": response});
      }else{
        self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
        self.presentUserInterface('frmCustomerProfileRoles', { "allFeatures": response.groups});
      }
     
    }
    function onError(error) {
       self.presentUserInterface(formName, { "LoadingScreen": { focus: false } ,
                                                            "toast": {message:ErrorInterceptor.errorMessage(error),status:"FAILURE"}});
    }
    self.businessController.getAllFeaturesAndActions({}, onSuccess, onError);
  };
    /* 
  To get all the features with respective actions 
  */
  CustomerManagement_PresentationController.prototype.updateAdditionalFeaturesList =function(context){
    var self = this;
    self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: true } });
    context.userName=this.getCurrentCustomerDetails().Username;
    function onSuccess(response) {
      self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.CustomerProfileEntitle.actions_save_success");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface('frmCustomerProfileRoles', { "toastModel": self.toastModel });
      self.getAdditionalFeaturesAndActions({ "username": self.getCurrentCustomerDetails().Username}, "InfoScreen");
    }
    function onError(error) {
      self.presentUserInterface('frmCustomerProfileRoles', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmCustomerProfileRoles', { "toastModel": self.toastModel });
    }
    self.businessController.updateCustomerActions(context, onSuccess, onError);
  };

  /**
    * @name editCustomerContactInfo
    * @member CustomerManagementModule.presentationController
    * @param {ModifiedByName : string, Customer_id : string, PhoneNumbers : [{value : object, isPrimary : object, Extension : object, id : object}]} data
    */
  CustomerManagement_PresentationController.prototype.editCustomerContactInfo = function (data) {
    var self = this;

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    function successCallback(status) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = "Edit customer contact info successful.";
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
      self.getCustomerContactInfo({ "customerID": data.Customer_id,"legalEntityId": legalEntityId || ""  }, "InfoScreen");
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
      self.getCustomerContactInfo({ "customerID": data.Customer_id,"legalEntityId": legalEntityId || "" }, "InfoScreen");
    }

    self.businessController.editCustomerContactInfo(data, successCallback, failureCallback);

  };

  /*
        * function to call command handler to enroll a customer
        * @param: enroll data
        */
  CustomerManagement_PresentationController.prototype.enrollACustomer = function (data) {
    var self = this;

    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.EnrollmentLinkSent");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      self.presentUserInterface(kony.application.getCurrentForm().id, { "enrollACustomer": true });
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      self.presentUserInterface(kony.application.getCurrentForm().id, { "enrollACustomer": true });
    }

    self.businessController.enrollCustomer(data, successCallback, failureCallback);

  };

  /**
       * @name getCitiesStatesAndCountries
       * @member CustomerManagementModule.presentationController
       * 
       */
  CustomerManagement_PresentationController.prototype.getCitiesStatesAndCountries = function () {
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    if (self.AddressModel.countries.length === 0 || self.AddressModel.states.length === 0) {
      var getCountryList = Promisify(self.businessController, 'getCountryList');
      var getRegionList = Promisify(self.businessController, 'getRegionList');

      Promise.all([
        getCountryList({}),
        getRegionList({})
      ]).then(function (responses) {
        self.AddressModel.countries = responses[0];
        self.AddressModel.states = responses[1];
        self.presentUserInterface(kony.application.getCurrentForm().id, { "AddressModel": self.AddressModel });
        self.dismissLoadingIndicator();
      }).catch(function failureCallback(error) {
        kony.print("Failed to get country, region & city list");
        self.toastModel.message = "Failed to get country, region & city lists and " + ErrorInterceptor.errorMessage(error);
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
        self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      });
    } else {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "AddressModel": self.AddressModel });
      self.dismissLoadingIndicator();
    }
  };

  CustomerManagement_PresentationController.prototype.getCountries=function(){
    return this.AddressModel.countries;
  };
  
  CustomerManagement_PresentationController.prototype.getSpecifiedCitiesAndStates = function (addressSelection, addressId, target) {
    var self = this;

    if (addressSelection === "country") {
      var states = [];
      states.push(["lbl1", "Select a State"]);

      for (var i = 0; i < Object.keys(self.AddressModel.states).length; ++i) {
        if (self.AddressModel.states[i].Country_id === addressId) {
          states.push([self.AddressModel.states[i].id, self.AddressModel.states[i].Name]);
        }
      }
      self.presentUserInterface(kony.application.getCurrentForm().id,
                                { "targetAddressModel": { "states": states, "target": target } });
    }

    else if (addressSelection === "state") {
      var cities = [];
      cities.push(["lbl1", "Select a City"]);
      for (var j = 0; j < Object.keys(self.AddressModel.cities).length; ++j) {
        if (self.AddressModel.cities[j].Region_id === addressId) {
          cities.push([self.AddressModel.cities[j].id, self.AddressModel.cities[j].Name]);
        }
      }
      self.presentUserInterface(kony.application.getCurrentForm().id,
                                { "targetAddressModel": { "cities": cities, "target": target } });
    }

  };




  /**
       * @name getCustomerRequests
       * @member CustomerManagementModule.presentationController
       * @param {customerID : string} data
       */
  CustomerManagement_PresentationController.prototype.getCustomerRequests = function (data) {
    var self = this;
    var payload = {
      "username": data.username
    };

    self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      self.CustomerRequests = response.customerrequests_view;
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "CustomerRequests": self.CustomerRequests });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      kony.print("Failed to get customer requests");
    }

    self.businessController.getCustomerRequests(payload, successCallback, failureCallback);

  };

  /**
       * @name getCustomerNotifications
       * @member CustomerManagementModule.presentationController
       * @param {customerID : string} data
       */
  CustomerManagement_PresentationController.prototype.getCustomerNotifications = function (data) {
    var self = this;
    var payload = {
      "$filter": "customer_Id eq " + data.customerID
    };

    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      self.CustomerNotifications = response.customernotifications_view;
      self.presentUserInterface('frmCustomerProfileAlerts', { "CustomerNotifications": self.CustomerNotifications });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      kony.print("Failed to get customer notifications");
    }

    self.businessController.getCustomerNotifications(payload, successCallback, failureCallback);

  };
  CustomerManagement_PresentationController.prototype.getAlertCategories = function (customerId,isOnTabClick) {
    var self = this;
    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });
      var promiseFetchAlertCategory = Promisify(self.businessController, 'getAlertCategories');
      var promiseFetchAccountAlert = Promisify(self.businessController, 'getCustomerAccountAlertSettings');
      Promise.all([
        promiseFetchAlertCategory({}),
        promiseFetchAccountAlert({"username":this.getCurrentCustomerDetails().Username})
      ]).then(function (responses) {
        var param = {alertCategory: responses[0],
                     accountAlerts : responses[1]};
        self.presentUserInterface('frmCustomerProfileAlerts', param);
        if(isOnTabClick){
          self.prefData.categories = responses[0];
          var accountNumLevel = responses[1] ? responses[1].isAlertsAccountNumberLevel : "";
          var context = { "AlertCategoryId": responses[0].records[0].alertcategory_id, "CustomerId": customerId };
          if(context.AlertCategoryId === "ALERT_CAT_ACCOUNTS")
          	context["AccountTypeName"] = responses[1].accountInfo.length>0 ? responses[1].accountInfo[0].accountType : "";
          self.getAlertCategoryPref(context,isOnTabClick);
        }else{
          self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false }});
        }
        
    }).catch(function (error) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "ERROR";
      self.presentUserInterface('frmCustomerProfileAlerts', { "toastModel": self.toastModel });
      console.log("ERROR" + error);
    });
  };
  CustomerManagement_PresentationController.prototype.getAlertCategoryPref = function (context,isOnTabClick) {
    var self = this;
    self.prefData.AlertCategoryId = context.AlertCategoryId;
    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });
    var promiseFetchAlertCategoryPref = Promisify(self.businessController, 'getCustomerAlertCategoryPreference');
    var promiseFetchAlertCategoryChannelPref = Promisify(self.businessController, 'getCustomerAlertCategoryChannelPreference');
    var promiseFetchAlertTypePref = Promisify(self.businessController, 'getCustomerAlertTypePreference');
    var promiseFetchAccountAlert = Promisify(self.businessController, 'getCustomerAccountAlertSettings');
    Promise.all([
      promiseFetchAlertCategoryPref(context),
      promiseFetchAlertCategoryChannelPref(context),
      promiseFetchAlertTypePref(context),
      promiseFetchAccountAlert({"username":this.getCurrentCustomerDetails().Username})
    ]).then(function (responses) {
      self.prefData.catPref = responses[0];
      self.prefData.channelPref = responses[1];
      self.prefData.typePref = responses[2];
      if(context.AlertCategoryId === "ALERT_CAT_ACCOUNTS"){
        self.prefData.accountPref = responses[3];
      }else{
        self.prefData.accountPref = null;
      }
      self.presentUserInterface('frmCustomerProfileAlerts', {
        "prefData": self.prefData,
        "isOnTabClick":  isOnTabClick
      });
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
    }).catch(function (error) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "ERROR";
      self.presentUserInterface('frmCustomerProfileAlerts', { "toastModel": self.toastModel });
      console.log("ERROR" + error);
    });
  };
  CustomerManagement_PresentationController.prototype.setAlertPreferences = function (alertsData) {
    var self = this;
    var params = {
      AlertCategoryId: alertsData.AlertCategoryId,
      CustomerId: alertsData.CustomerId,
      isSubscribed: alertsData.isSubscribed,
      channelPreference: alertsData.channelPreference,
      typePreference: alertsData.typePreference
    };
    if(alertsData.accNumLevel === true){
      params["AccountId"]= alertsData.AccountId;
    } else if(alertsData.accNumLevel === false){
      params["AccountTypeName"]= alertsData.AccountTypeName;
    }
    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      var context = { "AlertCategoryId": alertsData.AlertCategoryId, "CustomerId": alertsData.CustomerId };
      if(params.AccountId){
        context["AccountId"]= alertsData.AccountId;
      }else if(params.AccountTypeName){
        context["AccountTypeName"]= alertsData.AccountId;
      }
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = "Preferences updated successfully";
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "setAlertPreferences";
      self.toastModel.context = alertsData;
      self.presentUserInterface('frmCustomerProfileAlerts', { "toastModel": self.toastModel });
      self.getAlertCategoryPref(context);
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "resetPassword";
      self.toastModel.context = alertsData;
      self.presentUserInterface('frmCustomerProfileAlerts', { "toastModel": self.toastModel });
    }
    self.businessController.setAlertPreferences(params, successCallback, failureCallback);
  };
  /**
     * @name getCustomerNotifications
     * @member CustomerManagementModule.presentationController
     * @param {customerID : string} data
     */
  CustomerManagement_PresentationController.prototype.getCustomerAlertHistory = function (data,isTabOnClick) {
    var self = this;
    var payload = {
      "CustomerId": data.CustomerId
    };

    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.alertHistory = response.alertHistory;
      if(isTabOnClick){ //do nothing
      } else{
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      }
      self.presentUserInterface('frmCustomerProfileAlerts', { "alertHistory": self.alertHistory });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      kony.print("Failed to get customer notifications");
    }

    self.businessController.getCustomerAlertHistory(payload, successCallback, failureCallback);

  };

  /**
     * @name updateCustomerLockstatus
     * @member CustomerManagementModule.presentationController
     * @param {customerUsername : string} data
     */
  CustomerManagement_PresentationController.prototype.updateCustomerLockstatus = function (data, onSuccess) {
    var self = this;
    var payload = {
      "customerUsername": data.customerUsername
    };
    self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      if (onSuccess) {
        onSuccess(response);
      }
      self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
      self.CoreBankingUpdate = response.CoreBankingUpdate;
      self.presentUserInterface('frmCustomerProfileContacts', { "CoreBankingUpdate": self.CoreBankingUpdate });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileContacts', { "toastModel": self.toastModel });
      kony.print("Failed to update customer lock status");
    }

    self.businessController.updateCustomerLockstatus(payload, successCallback, failureCallback);

  };

  /**
      * @name authorizeCSRAssist
      * @member CustomerManagementModule.presentationController
      * @param {customerid : string, customerUsername : string} data
      */
  CustomerManagement_PresentationController.prototype.authorizeCSRAssist = function (data) {
    var self = this;

    function authCallback(response) {
      if (response.opstatus === 0 && !response.dbpErrCode) {
        self.OnlineBankingLogin = { "BankingURL": response.BankingURL, "currentAction": data.currentAction };
        self.presentUserInterface(kony.application.getCurrentForm().id, { "OnlineBankingLogin": self.OnlineBankingLogin });
      } else if (response.dbpErrCode === 20932) {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "OnlineBankingLogin": "USER_LOCKED" });
      } else {
        self.presentUserInterface(kony.application.getCurrentForm().id, { "OnlineBankingLogin": "FAILED" });
      }
    }

    if (data.currentAction === "OLB") {
      self.businessController.CSRAssistAuthorization(data, authCallback, authCallback);

    } else if (data.currentAction === "SIMULATE_PERSONAL_LOAN") {
      self.businessController.CSRAssistAuthorizationLearnPersonalLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "SIMULATE_VEHICLE_LOAN") {
      self.businessController.CSRAssistAuthorizationLearnVehicleLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "SIMULATE_CREDIT_LOAN") {
      self.businessController.CSRAssistAuthorizationLearnCreditLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "APPLY_CREDIT_LOAN") {
      self.businessController.CSRAssistAuthorizationApplyCreditLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "APPLY_PERSONAL_LOAN") {
      self.businessController.CSRAssistAuthorizationApplyPersonalLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "APPLY_VEHICLE_LOAN") {
      self.businessController.CSRAssistAuthorizationApplyVehicleLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "RESUME_LOAN") {
      self.businessController.CSRAssistAuthorizationResumeLoan(data, authCallback, authCallback);

    } else if (data.currentAction === "CREATE_APPLICANT") {
      self.businessController.CSRAssistAuthorizationCreateApplicant(data, authCallback, authCallback);

    } else if (data.currentAction === "OLB_ACCOUNTS") {
      self.businessController.CSRAssistAuthorizationViewSpecAccount(data, authCallback, authCallback);
    }
  };

  /**
     * @name CSRAssistLogCloseEvent
     * @member CustomerManagementModule.presentationController
     * @param reset data
     */
  CustomerManagement_PresentationController.prototype.CSRAssistLogCloseEvent = function (data) {
    var self = this;
    var payload = {
      "customerid": data.customerid,
      "customerUsername": data.customerUsername
    };

    function callback() { }
    self.businessController.CSRAssistLogCloseEvent(payload, callback, callback);
  };

  /**
     * @name sendResetPasswordLink
     * @member CustomerManagementModule.presentationController
     * @param reset data
     */
  CustomerManagement_PresentationController.prototype.sendResetPasswordLink = function (data) {
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.PasswordResetLinkSent");
      self.toastModel.status = "SUCCESS";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.sendResetPasswordLink(data, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerRequests = function () {
    return this.CustomerRequests;
  };

  CustomerManagement_PresentationController.prototype.getCurrentCustomerRequest = function (requestId) {
    for(var i=0; i< this.CustomerRequests.length; i++){
      if(this.CustomerRequests[i].id === requestId){
        return this.CustomerRequests[i];
      }
    }
    return null;
  };

  /**
       * @name showMessageModule
       * @member CustomerManagementModule.presentationController
       * @param {requestID : string} requestIdParam
       * @param string status
       * @param string requestId
       * @param string subject
       */
  CustomerManagement_PresentationController.prototype.showMessageModule = function (requestIdParam, customPayload) {
    this.navigateTo('CSRModule', 'fetchAllCategories', [null, { "requestIdParam": requestIdParam, "customPayload":customPayload }]);
  };


  /**
     * @name navigateToCustomerLogs
     * @member CustomerManagementModule.presentationController
     * @param {CustomerManagementRequest : {Username : string, CustomerSegmentDetails : {flxCustMangSearch : object, flxCustMangSearchWrapper : object, flxFirstColumn : object, flxlastColoumn : object, lblContactNo : object, lblEmailId : object, lblHiddenCustomerId : object, lblName : object, lblSeperator : object, lblDOB : object, lblUserId : object, lblUserName : object, lblSSN : object, template : object}}} param
     */
  CustomerManagement_PresentationController.prototype.navigateToCustomerLogs = function (param) {
    this.navigateTo('LogsModule', 'showLogs', [param]);
  };

  /**
     * @name getLastNCustomerSessions
     * @member CustomerManagementModule.presentationController
     * @param {customerUsername : string} data
     */
  CustomerManagement_PresentationController.prototype.getLastNCustomerSessions = function (data) {
    var self = this;
    var payload = {
      "username": data.customerUsername,
      "sessionCount": "4"
    };

    self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: false } });
      self.CustomerSessions = response.sessions;
      
      var onGetModulesOnSuccess = function(response){
        
        var modulesMap = {};
        response.eventtype.forEach(function(ele){
          modulesMap[ele.id] = ele.Name;
        });
        self.ActivityHistory.modulesMap = modulesMap;
      }
      var onGetModulesOnError = function(error){
        self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(error);
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface('frmCustomerProfileActivityHistory', { "toastModel": self.toastModel });
      }
      var logsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LogsModule");

      if(!self.ActivityHistory.modulesMap){
        logsModule.businessController.getModules({},onGetModulesOnSuccess,onGetModulesOnError);
      }
      

      var onGetActivitiesOnSuccess = function(response){
         
        var activityMap = {};
        response.eventsubtype.forEach(function(ele){
          activityMap[ele.id] = ele.Name;
        });
        self.ActivityHistory.activityMap = activityMap;
        self.presentUserInterface('frmCustomerProfileActivityHistory', { "CustomerSessions": self.CustomerSessions });
      }
      var onGetActivitiesOnError = function(error){
        self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: false } });
        self.toastModel.message = ErrorInterceptor.errorMessage(error);
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface('frmCustomerProfileActivityHistory', { "toastModel": self.toastModel });
      }

      if(!self.ActivityHistory.activityMap){
        logsModule.businessController.getActivityType({},onGetActivitiesOnSuccess,onGetActivitiesOnError);
      }else{
        self.presentUserInterface('frmCustomerProfileActivityHistory', { "CustomerSessions": self.CustomerSessions });
      }

    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer activity sessions");
    }

    self.businessController.getLastNCustomerSessions(payload, successCallback, failureCallback);

  };

  CustomerManagement_PresentationController.prototype.getModuleNameFromModuleID = function (moduleID) {
    if(this.ActivityHistory.modulesMap[moduleID]){
      return this.ActivityHistory.modulesMap[moduleID];
    }else{
      return moduleID;
    }
  };

  CustomerManagement_PresentationController.prototype.getActivityNameFromActivityID = function (activityID) {
    if(this.ActivityHistory.activityMap[activityID]){
      return this.ActivityHistory.activityMap[activityID];
    }else{
      return activityID;
    }
  };

  /**
    * @name getAllActivitiesInACustomerSession
    * @member CustomerManagementModule.presentationController
    * @param {sessionId : string} data
    */
  CustomerManagement_PresentationController.prototype.getAllActivitiesInACustomerSession = function (data) {
    var self = this;
    var payload = {
      "sessionId": data.sessionId
    }

    self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: false } });
      self.CustomerSessionActivities = response.activities;
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "CustomerSessionActivities": self.CustomerSessionActivities });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileActivityHistory', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer activities");
    }

    self.businessController.getAllActivitiesInACustomerSession(payload, successCallback, failureCallback);

  };

  /**
     * @name getCustomerDevices
     * @member CustomerManagementModule.presentationController
     * @param {$filter : string} data
     */
  CustomerManagement_PresentationController.prototype.getCustomerDevices = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: false } });
      self.CustomerDevices = response.customer_device_information_view;
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "CustomerDevices": self.CustomerDevices });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer activities");
    }

    self.businessController.getCustomerDevices(data, successCallback, failureCallback);

  };

  /**
     * @name customerUpdateDeviceInformation
     * @member CustomerManagementModule.presentationController
     * @param {Device_id : string, Customer_id : string, Status_id : string} data
     */
  CustomerManagement_PresentationController.prototype.customerUpdateDeviceInformation = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: false } });
      if (data.Status_id === "SID_DEVICE_INACTIVE") { self.toastModel.message = "Device deactivated successfully"; }
      else { self.toastModel.message = "Device deregistered successfully"; }
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "toastModel": self.toastModel });
      self.getCustomerDevices({ "$filter": "Customer_id eq " + data.Customer_id });
    }

    function failureCallback(status) {
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(status);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileDeviceInfo', { "toastModel": self.toastModel });
      kony.print("Failed to update the record ");
    }

    self.businessController.customerUpdateDeviceInformation(data, successCallback, failureCallback);

  };

  /*
   * function to call command handler to update e-Statement status (whether Paper or e-Statement)
   */
  CustomerManagement_PresentationController.prototype.updateEstatementStatus = function (eStatementJSON) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.getCustomerAccounts({"CustomerUsername":self.getCurrentCustomerDetails().Username},true);
      self.presentUserInterface('frmCustomerProfileAccounts', { "eStatementUpdate": response });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmCustomerProfileAccounts', { "eStatementUpdateStatus": "failure" });
    }

    self.businessController.updateEstatementStatus(eStatementJSON, successCallback, failureCallback);

  };

  /**
     * @name getAlertPrefrences
     * @member CustomerManagementModule.presentationController
     * @param {userName : string} userName
     */
  CustomerManagement_PresentationController.prototype.getAlertPrefrences = function (userName) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAlerts', { "LoadingScreen": { focus: false } });
      var alertPreferences = { alertTypes: [] };
      var c = 0;
      for (var i = 0; i < response.alertTypes.length; ++i) {
        if (response.alertTypes[i].alertType !== "Account") {
          alertPreferences.alertTypes[c++] = response.alertTypes[i];
        }
      }
      self.AlertPrefrences = alertPreferences;
      self.presentUserInterface('frmCustomerProfileAlerts', { "AlertPrefrences": self.AlertPrefrences });
    }

    function failureCallback(response) {
    }

    self.businessController.getAlertPrefrences(userName, successCallback, failureCallback);

  };


  /**
     * @name getCardsInformation
     * @member CustomerManagementModule.presentationController
     * @param {customerUsername : string} data
     */
  CustomerManagement_PresentationController.prototype.getCardsInformation = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmCustomerProfileAccounts', { "cardsInfomartion": response });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileAccounts', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer activities");
    }

    self.businessController.getCardsInformation(data, successCallback, failureCallback);

  };


  /**
     * @name getCustomerRequestAndNotificationCount
     * @member CustomerManagementModule.presentationController
     * @param {customerUsername : string} data
     */
  CustomerManagement_PresentationController.prototype.getCustomerRequestAndNotificationCount = function (data) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
      if (response.requestCount != 0 || response.notificationCount != 0) {
        self.CustomerRequestAndNotificationCount =
          { "requestCount": response.requestCount, "notificationCount": response.notificationCount };
      }

      self.presentUserInterface('frmCustomerProfileContacts', {
        "CustomerRequestAndNotificationCount":
        self.CustomerRequestAndNotificationCount
      });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileContacts', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmCustomerProfileContacts', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer request and notification count");
    }

    self.businessController.getCustomerRequestAndNotificationCount(data, successCallback, failureCallback);

  };

  /**
     * @name getTravelNotifications
     * @member CustomerManagementModule.presentationController
     * @param {Username : string} reqParam
     */
  CustomerManagement_PresentationController.prototype.getTravelNotifications = function (reqParam) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      var notificationResponse = null;
      if (response.TravelRequests) {
        notificationResponse = response;
        for (var i = 0; i < notificationResponse.TravelRequests.length; i++) {
          notificationResponse.TravelRequests[i].notificationType = "Travel Notification";
        }
      }
      else {
        notificationResponse = { TravelRequests: [] };
      }
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "TravelNotifications": notificationResponse });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer travel notifications");
    }


    self.businessController.getTravelNotifications(reqParam, successCallback, failureCallback);
  };

  /**
       * @name getCardRequests
       * @member CustomerManagementModule.presentationController
       * @param {Username : string} reqParam
       */
  CustomerManagement_PresentationController.prototype.getCardRequests = function (reqParam) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "CardRequests": response });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(response),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer card requests");
    }

    self.businessController.getCardRequests(reqParam, successCallback, failureCallback);

  };

  /**
       * @name updateCardStatus
       * @member CustomerManagementModule.presentationController
       * @param {customerUsername : string, cardNumber : string, cardAction : string, actionReason : string} reqParam
       */
  CustomerManagement_PresentationController.prototype.updateCardStatus = function (reqParam) {
    var self = this;

    self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmCustomerProfileAccounts', { "UpdateCardRequests": response });
    }

    function failureCallback(response) {
      self.presentUserInterface('frmCustomerProfileAccounts', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmCustomerProfileAccounts', { "toastModel": self.toastModel });
      kony.print("Failed to get the customer card requests");
    }

    self.businessController.updateCardsInformation(reqParam, successCallback, failureCallback);

  };

  /**
     * @name cancelNotification
     * @member CustomerManagementModule.presentationController
     * @param {notificationId : string, username : string} reqParam
     */
  CustomerManagement_PresentationController.prototype.cancelNotification = function (reqParam) {
    var self = this;
    var requestParam = {
      "request_id": reqParam.notificationId,
      "Username": reqParam.username
    };

    self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: true } });

    function successCallback(status) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: "Travel Notification successfully cancelled",
        status: "SUCCESS",
        operation: ""
      };
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "toastModel": self.toastModel });
      self.getTravelNotifications({ "Username": reqParam.username });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmCustomerProfileHelpCenter', { "toastModel": self.toastModel });
      kony.print("Failed to cancel notification");
    }

    self.businessController.cancelTravelNotification(requestParam, successCallback, failureCallback);

  };

  /**
      * @name showCustomerManagementSearchResults
      * @member CustomerManagementModule.presentationController
      * 
      */
  CustomerManagement_PresentationController.prototype.showCustomerManagementSearchResults = function () {
    var self = this;
    self.presentUserInterface('frmCustomerManagement', { "showCustomerSearch": true });
    self.presentUserInterface('frmCustomerManagement', { "showCustomerSearchResults": self.searchModel });
  };

  CustomerManagement_PresentationController.prototype.getSearchInputs = function () {
    var self = this;
		    self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } });
    self.presentUserInterface('frmCustomerManagement', { "searchInputs": self.searchInputs });
  };
  CustomerManagement_PresentationController.prototype.showAssistedOnboarding = function (eligibityID) {
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "firstTime": true, id: eligibityID });
    self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: true } });

    self.businessController.getIdTypes({}, function onSuccess(response) {
      self.presentUserInterface('frmAssistedOnboarding', {
        idInfos: response.idtype,
      });
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
    },
                                       function onError(error) {
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmAssistedOnboarding', { "toastModel": self.toastModel });
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
    });
  };
  CustomerManagement_PresentationController.prototype.getAddressSuggestion = function (text, onSucess, OnError) {
    var context = {
      "input": text,
    };
    this.businessController.getAddressSuggestion(context, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.getPlaceDetails = function (PlaceId, onSucess, OnError) {
    var context = {
      "placeid": PlaceId,
    };
    this.businessController.getPlaceDetails(context, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.USPSValidations = function (context) {
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmAssistedOnboarding', { "USPSRecommendations": response });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmAssistedOnboarding', { "toastModel": self.toastModel });
    }

    self.businessController.USPSValidation(context, successCallback, failureCallback);

  };
  /*
  * fetch country information for create/edit contract screens in enroll flow
  */
  CustomerManagement_PresentationController.prototype.getAddressDataforContract = function (callback) {
    var self = this;
    if (self.AddressModel.countries.length === 0) {
      var getCountryList = Promisify(self.businessController, 'getCountryList');
      Promise.all([
        getCountryList({})
      ]).then(function (responses) {
        self.AddressModel.countries = responses[0];
        if (typeof callback === 'function') callback(self.AddressModel);
      }).catch(function failureCallback(error) {
        callback("error");
      });
    } else {
      if (typeof callback === 'function') callback(self.AddressModel);
    }
  };
  CustomerManagement_PresentationController.prototype.fetchLocationPrefillData = function (callback) {
    var self = this;
    self.globalDetails = {
      countries: null,
      regions: null,
      cities: null,
    };

    var promiseFetchCountryList = Promisify(this.businessController, 'fetchCountryList');
    var promiseFetchRegionList = Promisify(this.businessController, 'fetchRegionList');
    var promiseFetchCityList = Promisify(this.businessController, 'fetchCityList');

    Promise.all([
      promiseFetchCountryList({}),
      promiseFetchRegionList({}),
      promiseFetchCityList({}),
    ]).then(function (responses) {
      self.globalDetails.countries = responses[0];
      self.globalDetails.regions = responses[1];
      self.globalDetails.cities = responses[2];
      if (typeof callback === 'function') callback(self.globalDetails);
    }).catch(function (res) {
      callback("error");
      kony.print("unable to fetch preloaded data", res);
    });
  };

  CustomerManagement_PresentationController.prototype.getTermsAndConds = function () {
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface('frmAssistedOnboarding', { "termsAndConds": response.onboardingtermsandconditions });
    }
    function failureCallback(error) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmAssistedOnboarding', { "toastModel": self.toastModel });
    }
    this.businessController.fetchTermsAndConds({}, successCallback, failureCallback);
  };
  CustomerManagement_PresentationController.prototype.createOnboardingApplicant = function (context) {
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      if (response.applicantStatus === "ACCEPTED") {
        self.presentUserInterface('frmAssistedOnboarding', { "createApplicant": { status: "SUCCESS", applicantInfo: response.applicantInformation } });
      } else
        self.presentUserInterface('frmAssistedOnboarding', { "createApplicant": { status: "FAILURE", applicantInfo: response.applicantInformation } });
    }
    function failureCallback(error) {
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmAssistedOnboarding', { "toastModel": self.toastModel });
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } });
    }
    this.businessController.createOnboardingApplicant(context, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.showEligibilityCriteria = function () {
    var self = this;
    self.presentUserInterface('frmNewCustomer', { "LoadingScreen": { focus: true } });
    this.businessController.getEligibilityCriteria({"$orderby":"lastmodifiedts desc"}, function onSuccess(response) {
      self.presentUserInterface('frmNewCustomer', {
        eligibilityCriteria: response.eligibilitycriteria
      });
      self.presentUserInterface('frmNewCustomer', { "LoadingScreen": { focus: false } });
    },
                                                   function onError(error) {
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmNewCustomer', { "toastModel": self.toastModel });
      self.presentUserInterface('frmNewCustomer', { "LoadingScreen": { focus: false } });
    });
  };

  /**
         * @name showLoansForm
         * 
         */
  CustomerManagement_PresentationController.prototype.showLoansForm = function (context) {
    var scopeObj = this;

    function successCallback(response) {
      scopeObj.LoansMasterData = response.LoanTypeAPRs;
      scopeObj.retrieveAllLoansDetails();
      var resonseObject = {
        "LoansMasterData": scopeObj.LoansMasterData,
        "LoadingScreen": { focus: true }
      };
      if (context && context.isApplicantFlow === true) {
        resonseObject.isApplicantFlow = true;
        resonseObject.response = context.response;
      }
      scopeObj.presentUserInterface("frmLoansDashboard", resonseObject);
    }

    function failureCallback(response) {
      scopeObj.retrieveAllLoansDetails();
    }
    scopeObj.businessController.getLoanTypeApr(successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.retrieveAllLoansDetails = function () {
    var scopeObj = this;
    var applicationListResponse = {
      PendingList: null,
      SubmittedList: null
    };
    function getSubmittedApplicationsListSuccess(response) {
      applicationListResponse.SubmittedList = (response.hasOwnProperty("errorCode") && response.errorCode === "3402") ? { "records": [] } : response;
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getAllApplicationData",
        "response": applicationListResponse,
        "LoadingScreen": {
          focus: false
        }
      });
    }
    function getSubmittedApplicationsListError(response) {
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getAllApplicationData",
        "response": applicationListResponse,
        "LoadingScreen": {
          focus: false
        }
      });
    }
    var customerId = kony.store.getItem("Customer_id");
    var idtobesent = { "Customer_id": customerId, "Status_id": "PENDING" };

    function getPendingApplicationsListSuccess(response) {
      applicationListResponse.PendingList = (response.hasOwnProperty("errorCode") && response.errorCode === "3402") ? { "records": [] } : response;
      var idtobesent = { "Customer_id": customerId, "Status_id": "SUBMITTED" };
      scopeObj.businessController.getPendingApplicationsList(idtobesent, getSubmittedApplicationsListSuccess, getSubmittedApplicationsListError);
    }
    function getPendingApplicationsListError(response) {
      var idtobesent = { "Customer_id": customerId, "Status_id": "SUBMITTED" };
      scopeObj.businessController.getPendingApplicationsList(idtobesent, getSubmittedApplicationsListSuccess, getSubmittedApplicationsListError);
    }
    scopeObj.businessController.getPendingApplicationsList(idtobesent, getPendingApplicationsListSuccess, getPendingApplicationsListError);
  };

  CustomerManagement_PresentationController.prototype.retrieveLoansList = function (Status_id) {
    var scopeObj = this;
    var customerId = kony.store.getItem("Customer_id");

    function getPendingApplicationsListSuccess(response) {
      if (response.hasOwnProperty("errorCode") && response.errorCode === "3402") {
        response.records = [];
      }
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getPendingApplicationsList" + Status_id,
        "response": response,
        "LoadingScreen": {
          focus: false
        }
      });
    }

    function getPendingApplicationsListError(response) {
      kony.print("failed retrieving pending applications list");
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getPendingApplicationsList" + Status_id,
        "response": response,
        "LoadingScreen": {
          focus: false
        }
      });
    }
    var idtobesent = { "Customer_id": customerId, "Status_id": Status_id };
    scopeObj.businessController.getPendingApplicationsList(idtobesent, getPendingApplicationsListSuccess, getPendingApplicationsListError);
  };

  CustomerManagement_PresentationController.prototype.fetchLeads = function () {
    var scopeObj = this;

    function getLeadsListSuccess(response) {
      if (response.hasOwnProperty("errorCode") && response.errorCode === "3402") {
        response.records = [];
      }
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "getLeadsList",
        "response": response,
        "LoadingScreen": {
          focus: false
        }
      });
    }

    function getLeadsListError(response) {
      scopeObj.presentUserInterface("frmLoansDashboard", {
        "action": "ErrorOccured",
        "response": response,
        "LoadingScreen": {
          focus: false
        }
      });
    }
    var customerId = kony.store.getItem("Customer_id");
    var idtobesent = {
      "statusIds":"SID_NEW,SID_INPROGRESS",
      "productId":"",
      "leadType":"",
      "assignedTo":"",
      "phoneNumber":"",
      "emailAddress":"",
      "customerId": customerId,
      "pageNumber":"1",
      "recordsPerPage":"50",
      "modifiedStartDate":"",
      "modifiedEndDate":"",
    };
    scopeObj.businessController.fetchLeads(idtobesent, getLeadsListSuccess, getLeadsListError);
  };

  CustomerManagement_PresentationController.prototype.showUpgrdageUserScreen = function (param1) {
    var self = this;
    this.navigateTo('CustomerManagementModule', 'showUpgrdageUserScreenDetails', [param1]);
  };

  CustomerManagement_PresentationController.prototype.showUpgrdageUserScreenDetails = function (username) {
    var self = this;
    self.presentUserInterface('frmUpgradeUser', { "value": username });
  };

  CustomerManagement_PresentationController.prototype.getAddressSuggestion = function (text, onSucess, OnError) {
    var self = this;
    var context = {
      "input": text,
    };
    this.businessController.getAddressSuggestion(context, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.upgradeUser = function (params) {
    var self = this;
    self.presentUserInterface('frmUpgradeUser', { "LoadingScreen": { focus: true } });
    function onSucess(response) {
      if (response.errMsg) {
        self.toastModel.message = response.errMsg;
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface('frmUpgradeUser', { "toastModel": self.toastModel });
        self.presentUserInterface('frmUpgradeUser', { "LoadingScreen": { focus: false } });
      } else {
        self.presentUserInterface('frmUpgradeUser', { "LoadingScreen": { focus: false } });
        var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
        self.getCustomerBasicInfo({ "Customer_id": self.getCurrentCustomerDetails().Customer_id,"legalEntityId":legalEntityId || ""  }, "InfoScreenProfile");
      }
    }
    function OnError(error) {
      self.toastModel.message = error.dbpErrMsg;
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmUpgradeUser', { "toastModel": self.toastModel });
      self.presentUserInterface('frmUpgradeUser', { "LoadingScreen": { focus: false } });
    }
    this.businessController.upgradeUser(params, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.fetchLocationPrefillData = function (callback) {
    var self = this;
    self.globalDetails = {
      countries: null,
      regions: null,
      cities: null,
    };

    var promiseFetchCountryList = Promisify(this.businessController, 'fetchCountryList');
    var promiseFetchRegionList = Promisify(this.businessController, 'fetchRegionList');
    var promiseFetchCityList = Promisify(this.businessController, 'fetchCityList');

    Promise.all([
      promiseFetchCountryList({}),
      promiseFetchRegionList({}),
      promiseFetchCityList({}),
    ]).then(function (responses) {
      self.globalDetails.countries = responses[0];
      self.globalDetails.regions = responses[1];
      self.globalDetails.cities = responses[2];
      if (typeof callback === 'function') callback(self.globalDetails);
    }).catch(function (res) {
      callback("error");
      kony.print("unable to fetch preloaded data", res);
    });
  };

  CustomerManagement_PresentationController.prototype.trackApplication = function (context) {
    var self = this;

    function successCallback(response) {
      var responseObject = { "action": context.isEdit? "getTrackApplicationEditMode" : "getTrackApplicationDetails", 
                            "response": response, "loanType": context.loanType, "LoadingScreen": { focus: context.isEdit? true : false }  };
      if (context.hasOwnProperty("status")) {
        responseObject.toastModel = { "status": context.status, "message": kony.i18n.getLocalizedString("i18n.frmLoansDashboard.SavedSuccessfully") };
      }
      self.presentUserInterface("frmTrackApplication", responseObject);
    }

    function failureCallback(response) {
      self.presentUserInterface("frmLoansDashboard", { "action": "ErrorOccured", "LoadingScreen": { focus: false } });
    }
    self.businessController.trackApplication(context, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.showNewCustomerScreen = function () {
    var self = this;
    this.navigateTo('CustomerManagementModule', 'newCustomerScreenDisplay', []);
  };

  CustomerManagement_PresentationController.prototype.newCustomerScreenDisplay = function () {
    var self = this;
    self.presentUserInterface('frmNewCustomer', { "value": "display" });
  };

  CustomerManagement_PresentationController.prototype.updateSubmittedLoanApplication = function (context, loantype) {
    var self = this;

    function successCallback(response) {
      self.trackApplication({ "QueryResponseID": context.id, "loanType": loantype, "status": "SUCCESS" });
    }

    function failureCallback(response) {
      self.presentUserInterface("frmTrackApplication", { "action": "ErrorOccured", "LoadingScreen": { focus: false } });
    }

    if (context.QueryDefinition_id === "PERSONAL_APPLICATION") {
      self.businessController.updatePersonalLoan(context, successCallback, failureCallback);
    } else if (context.QueryDefinition_id === "VEHICLE_APPLICATION") {
      self.businessController.updateVehicleLoan(context, successCallback, failureCallback);
    } else {
      self.businessController.updateCreditCardApp(context, successCallback, failureCallback);
    }
  };

  CustomerManagement_PresentationController.prototype.navigateToCompanyDetailsScreen = function (context, currForm) {
    this.navigateTo('CompaniesModule', 'showCompaniesFromCustomerModule', [context]);
  };

  CustomerManagement_PresentationController.prototype.navigateToLeadDetailsScreen = function (context) {
    this.navigateTo('LeadManagementModule', 'fetchLeadDetails', [context]);
  };
  
    CustomerManagement_PresentationController.prototype.navigateToLeadScreen = function () {
    this.navigateTo('LeadManagementModule', 'fetchLeads', []);
  };

  CustomerManagement_PresentationController.prototype.getPersonalLoanPurpose= function (loanType) {
    var self = this; 
    self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } ,
                                                        "editMasterData": response.records
                                                       });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } ,
                                                        "toastModel": { status: "FAILURE", message : ErrorInterceptor.errorMessage(error) }
                                                       });
    }
    self.businessController.getPersonalLoanPurpose( {"QueryDefinitionID" : loanType }, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.ValidateAddress = function (context) {
    var self = this;
    self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } });
      self.presentUserInterface('frmTrackApplication', { "USPSRecommendations": response });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmTrackApplication', { "toastModel": self.toastModel });
    }

    self.businessController.USPSValidation(context, successCallback, failureCallback);

  };

  CustomerManagement_PresentationController.prototype.SSNValidation = function (context) {
    var self = this;
    self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      if (response.records.length === 0) {
        self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false }, "isSSN": false,"action":"SSNValidation" });
      }
      else {
        self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false }, "isSSN": true, "data": response.records[0],"action":"SSNValidation"  });
      }
    }
    function failureCallback(error) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface('frmTrackApplication', { "toastModel": self.toastModel });
    }
    self.businessController.SSNValidation(context, successCallback, failureCallback);
  };    
  CustomerManagement_PresentationController.prototype.NumberValidation = function (context) {
    var self = this;
    self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: true } });

    function successCallback(response) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } ,
                                                        "NumberValidation": response 
                                                       });
    }

    function failureCallback(error) {
      self.presentUserInterface('frmTrackApplication', { "LoadingScreen": { focus: false } });
      self.toastModel = {
        message: ErrorInterceptor.errorMessage(error),
        status: "FAILURE",
        operation: ""
      };
      self.presentUserInterface('frmTrackApplication', { "toastModel": self.toastModel });
    }

    self.businessController.NumberValidation(context, successCallback, failureCallback);

  };
  /*
   * @name: showDepositsForm
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.showDepositsForm = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', {});
    self.fetchProductTypesForDeposits();
  };
  /*
   * @name: fetchLeadsForDeposits
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.fetchLeadsForDeposits = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                          "depositsLeads": response 
                                                        });
    }
    function failureCallback(error) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } });
    }
    self.businessController.fetchLeadsDeposits(context, successCallback, failureCallback);
  };
  /*
   * @name: fetchProductTypesForDeposits
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.fetchProductTypesForDeposits = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                         "depositsProducts": response.productTypes 
                                                        });
    }
    function failureCallback(error) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } });
    }
    self.businessController.fetchProductsDeposits(context, successCallback, failureCallback);
  };
  /*
   * @name: fetchSubmittedApplicationsDeposits
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.fetchSubmittedApplicationsDeposits = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                         "depositsSubmitApplications": response.Accounts 
                                                        });
    }
    function failureCallback(error) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } });
    }
    self.businessController.getCustomerAccounts(context, successCallback, failureCallback);
  };
  /*
   * @name: navigateToLeadCreateScreen
   * @member CustomerManagementModule.presentationController
   * @param: create payload for lead, action-create/edit,navObj - {formName:"",breadcrumbBack:""}
   */
  CustomerManagement_PresentationController.prototype.navigateToLeadCreateScreen = function(param,action,navObj){
    var self =this;
    self.navigateTo('LeadManagementModule', 'createLeadFromCustomer', [param,action,navObj]);
  };
  CustomerManagement_PresentationController.prototype.updateLeadStatus = function(payload,context){
    var self =this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      if(context === "deposits"){
        self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                            "toast": {message:"Update lead success",
                                                                      status: kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.SUCCESS")},
                                                            "updateLead" : true});
        var param = {
          "statusIds":"",
          "productId":"",
          "leadType":"",
          "customerId": self.getCurrentCustomerDetails().Customer_id,
          "assignedTo":"",
          "phoneNumber":"",
          "emailAddress":"",
          "pageNumber":1,
          "recordsPerPage":20,
          "modifiedStartDate":"",
          "modifiedEndDate":"",
          "sortCriteria" : "",
          "sortOrder" : ""
        };
        self.fetchLeadsForDeposits(param);
      } else if(context === "loans"){
        
      }
      
    }
    function failureCallback(error) {
      if(context === "deposits"){
        self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                            "toast": {message:"Update lead failed",status:"ERROR"} 
                                                        });
      } else if(context === "loans"){
        
      }
    }
    self.businessController.updateLeadStatus(payload, successCallback, failureCallback);
  };
  
    CustomerManagement_PresentationController.prototype.getTermsAndConditions =function(){
    var self = this;
    self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: true } });
    function onSuccess(response) {
     self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false } ,
                                                         "termsAndConds": response.termsAndConditionsContent 
                                                        });
    }
    
    function onError(error) {
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface('frmAssistedOnboarding', { "LoadingScreen": { focus: false }, "toastModel":self.toastModel });
      
    }
    self.businessController.getTermsAndConditions({"termsAndConditionsCode": "C360_CustomerOnboarding_TnC"}, onSuccess, onError);
    
    };
  CustomerManagement_PresentationController.prototype.CSRAssistCustomerOnboarding = function(){
    var self = this;
    self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: true }});
    function onSuccess(response) {
      self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } ,
                                                          "BankingURL": response.BankingURL});
    }

    function onError(error) {
      self.presentUserInterface('frmCustomerManagement', { "LoadingScreen": { focus: false } ,
                                                          "toast": {message:"CSR assist onboarding failed",status:"ERROR"}    });
    }
    self.businessController.CSRAssistCustomerOnboarding({}, onSuccess, onError);

  };
  CustomerManagement_PresentationController.prototype.GetCustomerApplications = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true }});
    function onSuccess(response) {
      if(context.Application_status === "started"){
        self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                           "customerApplicationsStarted": response.customerapplications});
      }
      else{
        self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                           "customerApplicationsSubmitted": response.customerapplications});
      }
    }

    function onError(error) {
       self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                            "toast": {message:"fetch applications failed",status:"ERROR"}});
    }
    self.businessController.GetCustomerApplications(context, onSuccess, onError);

  };
  CustomerManagement_PresentationController.prototype.CSRAssistCustomerOnboardingResumeApp = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true }});
    function onSuccess(response) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                         "BankingURL": response.BankingURL});
    }

    function onError(error) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                         "toast": {message:"CSR assist onboarding failed",status:"ERROR"}});
    }
    self.businessController.CSRAssistCustomerOnboardingResumeApp(context, onSuccess, onError);

  };
  
  CustomerManagement_PresentationController.prototype.CSRAssistCustomerOnboardingNewApp = function(context){
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true }});
    function onSuccess(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false }
                                                         });
      window.open(response.BankingURL);
    }

    function onError(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } ,
                                                         "toast": {message:"CSR assist onboarding failed",status:"ERROR"}});
    }
    self.businessController.CSRAssistCustomerOnboardingNewApp(context, onSuccess, onError);

  };
  
  CustomerManagement_PresentationController.prototype.CSRAssistProspectOnboardingResumeApp = function(context){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: true }});
    function onSuccess(response) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                         "BankingURL": response.BankingURL});
    }

    function onError(error) {
      self.presentUserInterface('frmDepositsDashboard', { "LoadingScreen": { focus: false } ,
                                                         "toast": {message:"CSR assist onboarding failed",status:"ERROR"}});
    }
    self.businessController.CSRAssistProspectOnboardingResumeApp(context, onSuccess, onError);

  };
  CustomerManagement_PresentationController.prototype.showApplicationsTab = function(){
    var self = this;
    self.presentUserInterface('frmDepositsDashboard', {"showApplicationsTab": true});
  };
  
  CustomerManagement_PresentationController.prototype.showCDPTab = function(){
    var self = this;
    var model = {
      "showCDPTab": true
    };
    self.presentUserInterface('frmProfileCDP', model);
  };
  
   CustomerManagement_PresentationController.prototype.getCustomerApplicationsForCDP = function(context,successCallBack = null,errorCallback = null){
    var self = this;
    let currentForm = kony.application.getCurrentForm().id;
    self.presentUserInterface(currentForm, { "LoadingScreen": { focus: true }});
    function onSuccess(response) {
      if (currentForm === "frmCustomerManagement") {
        successCallBack(response.customerapplications);
      } else {
        self.presentUserInterface("frmProfileCDP", { "LoadingScreen": { focus: false } });
        self.presentUserInterface("frmProfileCDP", {"customerApplications": response.customerapplications});
      }
    }

    function onError(error) {
      if (currentForm === "frmProfileCDP") {
        self.presentUserInterface("frmProfileCDP", { "LoadingScreen": { focus: false } });
        self.presentUserInterface("frmProfileCDP", { "toast" : { message:ErrorInterceptor.errorMessage(error), status:"FAILURE"}});
      } else {
        return errorCallback(error);
      }   
    }
    self.businessController.GetCustomerApplications(context, onSuccess, onError);
  };

  CustomerManagement_PresentationController.prototype.generateReport = function (context) {
    var self = this; 
    this.setCDPReportRequestedStatus(context.prospectId);
    this.setCDPReportDownloadedStatus(context.prospectId,"inprogress");
    function successCallBack(response) {
      kony.print("generated the file successfully");
      let fileName = response["documentName"];
      let fileContent = response["content"];
      var element = document.createElement('a');
      var base64file =  "data:application/octet-stream;base64," + fileContent;
      element.setAttribute("href", base64file);
      element.setAttribute("download", fileName || 'download');
      element.setAttribute('target', '_self');
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      self.setCDPReportDownloadedStatus(context.prospectId,true);
      if (kony.application.getCurrentForm().id === "frmProfileCDP") {
        self.presentUserInterface("frmProfileCDP", {"status" : "downloadDocumentSuccess"});
      }
    }
    function errorCallBack(error) {
      self.setCDPReportDownloadedStatus(context.prospectId,false);
      if (kony.application.getCurrentForm().id === "frmProfileCDP") {
        self.presentUserInterface('frmProfileCDP', {"status" : "downloadDocumentFailed"});
      } 
    }
    self.businessController.generateReport(context, successCallBack, errorCallBack);
  };


  CustomerManagement_PresentationController.prototype.getBusinessConfigurations = function(){
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    function onSuccess(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.CustomerBasicInfo.linkDelinkConfig=response.BusinessConfigurationRecords[1].value==="0"?false:true;
    }

    function onError(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      kony.print(error.dbpErrMsg);
    }
    self.businessController.fetchBusinessConfigurations({}, onSuccess, onError);

  };
  /*
  * @name: searchForCustomerLinkProfiles
  * @member CustomerManagementModule.presentationController
  *@param: {"Email":"","DateOfBirth":"","Customer_username": "","Customer_id": ""}
  */
  CustomerManagement_PresentationController.prototype.searchForCustomerLinkProfiles = function(inputParam){
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    function onSuccess(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.presentUserInterface(kony.application.getCurrentForm().id, {"linkProfilesList": response.records});
    }

    function onError(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.searchForCustomerLinkProfiles(inputParam, onSuccess, onError);

  };
  /*
  * @name: linkProfileService
  * @member CustomerManagementModule.presentationController
  *@param: {"Name":"","payLoad":{"combinedUser": "","otherUser": ""}}
  */
  CustomerManagement_PresentationController.prototype.linkProfileService = function(inputReq){
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    function onSuccess(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      if(response.errMsg){
        self.toastModel.message = response.errMsg;
        self.toastModel.status = "FAILURE";
      }else{
        self.toastModel.message = inputReq.Name + kony.i18n.getLocalizedString("i18n.frmCustomerManagement.LinkProfileSuccessMessage");
        self.toastModel.status = "SUCCESS";
      }
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      self.getCustomerBasicInfo({ "Customer_id": inputReq.payLoad.combinedUser,"legalEntityId": inputReq.legalEntityId }, "InfoScreen");
    }
    function onError(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.linkProfileService(inputReq.payLoad, onSuccess, onError);

  };
      /*
  * @name: searchCustomersUnlinkProfile
  * @member CustomerManagementModule.presentationController
  *@param: {Customer_id:""}
  */
  CustomerManagement_PresentationController.prototype.searchCustomersUnlinkProfile = function (data, target) {
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    function successCallback(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false }});
      if (response.records.length === 0) {
        self.presentUserInterface(kony.application.getCurrentForm().id, {"userNameIsAvailable": true });
      }
      else {
        self.presentUserInterface(kony.application.getCurrentForm().id, {"userNameIsAvailable": false });
      }
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.searchCustomers(data, successCallback, failureCallback);
  };
    /*
  * @name: linkProfileService
  * @member CustomerManagementModule.presentationController
  *@param: {"combinedUser": "","newUser": ""}
  */
  CustomerManagement_PresentationController.prototype.deLinkProfileService = function(inputParam, userFullName){
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    function onSuccess(response) {
      self.toastModel.message = userFullName+" "+kony.i18n.getLocalizedString("i18n.frmCustomerProfile.DelinkMsg");
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      var searchObject = {
        "_phone": null,
        "_username": inputParam.newUser,
        "_cardorAccountnumber": null,
        "_id": null,
        "_companyId": null,
        "_email": null,
        "_applicationId": null,
        "_SSN": null,
        "_pageOffset": "0",
        "_pageSize": "100",
        "_sortVariable": "name",
        "_sortDirection": "ASC"
      };
      self.searchCustomers(searchObject, kony.i18n.getLocalizedString("i18n.frmCustomerManagementController.Customer"));
    }

    function onError(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.delinkProfileService(inputParam, onSuccess, onError);

  };
 /*
  * @name: getCompanyCustomers
  * @member CustomerManagementModule.presentationController
  *@param: {"Organization_id":""}
  */
  CustomerManagement_PresentationController.prototype.getCompanyCustomers = function (context) {
    var self = this;
    var payLoad = {"Organization_id":context.Organization_id};
    var onSuccess = function(res){
      var businessUserDetail = {};
      if(res.organizationEmployee && res.organizationEmployee.length>0){
        for(var i=0;i<res.organizationEmployee.length;i++){
          if(res.organizationEmployee[i].UserName === context.userName){
            businessUserDetail = res.organizationEmployee[i];
            break;
          }
        }
        if(self.CustomerBasicInfo.customer){
          self.CustomerBasicInfo.customer["isAuthorizedSignatory"] = businessUserDetail.isAuthSignatory;
        }
      }
      self.presentUserInterface(kony.application.getCurrentForm().id, { "checkAuthSignatory":self.CustomerBasicInfo });
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
    };
    var onError = function(err){
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(err);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    };  
    self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: true } });
    this.businessController.getCompanySignatories(context,onSuccess,onError);
  };
  
  CustomerManagement_PresentationController.prototype.getSystemConfigurationsClient = function(bundleId) {
    return this.CustomerBasicInfo.clientConfigurations.filter(function (rec) { return rec.configurationValue === "SHOW"; });
  };
  
  CustomerManagement_PresentationController.prototype.getSystemConfigurations = function() {
    var self = this;
    self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : true } });

    function successCallback(response) {
      self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : false } });
      self.CustomerBasicInfo.clientConfigurations= response.configurations;
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : false } });
      kony.print(error.dbpErrMsg);
    }

    this.businessController.fetchConfigurations({"bundleId" : "C360_CONFIG_BUNDLE"}, successCallback, failureCallback);
  };
  CustomerManagement_PresentationController.prototype.createAccountUsage = function (payload, onSucess, OnError) {
    this.businessController.createAccountUsage(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.updateAccountUsage = function (payload, onSucess, OnError) {
    this.businessController.updateAccountUsage(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.getAccountUsage = function (party, onSucess, OnError) {
    this.businessController.getAccountUsage(party, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.createTaxDetails = function (payload, onSucess, OnError) {
    this.businessController.createTaxDetails(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.updateTaxDetails = function (payload, onSucess, OnError) {
    this.businessController.updateTaxDetails(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.getDueDiligenceDetails = function (payload, onSucess, OnError) {
    this.businessController.getDueDiligenceDetails(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.updateCitizenshipDetails = function (payload, onSucess, OnError) {
    this.businessController.updateCitizenshipDetails(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.getEmploymentdetails = function (payload, onSucess, OnError) {
    this.businessController.getEmploymentdetails(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.updateEmploymentdetails = function (payload, onSucess, OnError) {
    this.businessController.updateEmploymentdetails(payload, onSucess, OnError);
  };
  CustomerManagement_PresentationController.prototype.createEmploymentdetails = function (payload, onSucess, OnError) {
    this.businessController.createEmploymentdetails(payload, onSucess, OnError);
  };
  /*
   * @name showEnrollNowScreen
   * @member CustomerManagementModule.presentationController
   * @param isEditFlow- true/false,context-{"responseData":"","navParam":""}
   */
  CustomerManagement_PresentationController.prototype.showEnrollNowScreen = function (isEditFlow,context, isSuspendedUser) {
    var self =this;
    this.presentUserInterface("frmEnrollCustomer", {"resetEnrollFormUI": {}});
    this.getAutoSyncAccountsFlag();
    if(isEditFlow === false){
      self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: true } });
      var custId = this.getCurrentCustomerDetails().Customer_id || this.getCurrentCustomerDetails().primaryCustomerId;
      var promiseServiceDef = Promisify(self.businessController, 'getServiceDefinitionsForContracts');
      var promiseContractDetails = Promisify(self.businessController, 'getCoreCustomerContractDetails');
      Promise.all([
        promiseServiceDef({"legalEntityId":context.navParam.legalEntityId}),
        promiseContractDetails({"coreCustomerId": custId,"legalEntityId":context.navParam.legalEntityId})
      ]).then(function (responses) {
        self.presentUserInterface("frmEnrollCustomer", {"serviceDefinitions":responses[0] || []});
        var contractInfo = responses[1].contracts && responses[1].contracts.length > 0 ? responses[1].contracts : [];
        self.presentUserInterface("frmEnrollCustomer", {"enrollCustomerContract": contractInfo,
                                                        "customerInfo": self.CustomerBasicInfo});
        self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: false } });
      }).catch(function(err){
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
        var errMsg =  ErrorInterceptor.errorMessage(err) ;
        self.toastModel.message = errMsg ? errMsg : "Error while parsing the response data.";
        self.toastModel.status = "FAILURE";
        self.toastModel.operation = "";
        self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      });
      this.getCustomerStatusConfig();
      this.presentUserInterface("frmEnrollCustomer", {"showEnrollFormCreate":this.searchModel.customers|| []});
    } 
    else if(isEditFlow === true){
      this.enrollCustAccountsFeatures = {};
      this.sourceFormDetail = {
        name : context.navParam.formName,
        data : context.navParam
      };
      this.presentUserInterface("frmEnrollCustomer",{"editUserNavigationEntry":{"userData":context.userDetails,
                                                                                "navParam":context.navParam,
                                                                                "defaultLimits": context.defaultLimits}});
    }
  };
  /*
   * @name navigateToEnroll
   * @member CustomerManagementModule.presentationController
   * @param getInfinityUser-responseData, navParam-{"formName":"","isEnrollEditUser" : true/false,"enrollEditUserTab":""}
   */
  CustomerManagement_PresentationController.prototype.navigateToEnrollFromCustTabs = function (infinityUserDetails, isSuspendedUser) {
    var self = this;
    self.navigateTo("CustomerManagementModule", "showEnrollNowScreen", [true,infinityUserDetails, isSuspendedUser]);

  };
  /*
   * @name getServiceDefinitionsForContracts
   * @member CustomerManagementModule.presentationController
   * @param category -("enroll"/"contract")
   */
  CustomerManagement_PresentationController.prototype.getServiceDefinitionsForContracts = function (legalEntityId,category) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      if(category === "enroll"){
        self.presentUserInterface("frmEnrollCustomer", {"serviceDefinitions":response});
      } else{
        var serviceDefinitions = response.ServiceDefinitionRecords ? response.ServiceDefinitionRecords : [];
        self.presentUserInterface("frmEnrollCustomer", {"serviceDefinitionsContract":serviceDefinitions});
      }
      
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }

    self.businessController.getServiceDefinitionsForContracts({"legalEntityId":legalEntityId}, successCallback, failureCallback);
  };
  /*
   * @name getEnrollCustContract
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId" : ""} -inputParams
   */
  CustomerManagement_PresentationController.prototype.getEnrollCustContract = function (inputParams) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      var contractInfo = response.contracts && response.contracts.length > 0 ? response.contracts : [];
      self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: false } });
      self.presentUserInterface("frmEnrollCustomer", {"enrollCustomerContract": contractInfo,
                                                      "customerInfo": self.CustomerBasicInfo});
      /*service Error
      else if(response.status && response.status === "Failure"){
        failureCallback(response);
      }*/
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }
    self.businessController.getCoreCustomerContractDetails(inputParams, successCallback, failureCallback);
  };
  /*
   * @name getCustomerStatusConfig
   * @member CustomerManagementModule.presentationController
   * @param {}
   */
  CustomerManagement_PresentationController.prototype.getCustomerStatusConfig = function () {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      self.presentUserInterface("frmEnrollCustomer", {"custStatusConfig":response});
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }

    self.businessController.getCustomerStatusConfig({"bundle_name":"C360","config_key":"CUSTOMER_STATUS"}, successCallback, failureCallback);
  };
   /*
   * @name getServiceDefinitionRoles
   * @member CustomerManagementModule.presentationController
   * @param {"serviceDefinitionId":""} -input, segment row index array to set roles
   */
  CustomerManagement_PresentationController.prototype.getServiceDefinitionRoles = function (input,rowsIndexArr,newCustInEditFlow,hideLoadingScreen) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      self.presentUserInterface("frmEnrollCustomer", {"serviceDefinitionRoles":response,
                                                      "rowsIndexArr":rowsIndexArr,
                                                     "newCustInEditFlow":newCustInEditFlow});
      if(hideLoadingScreen && hideLoadingScreen === true){
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      }
    }
    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }
    self.businessController.getServiceDefinitionRoles(input, successCallback, failureCallback);
  };
  /*
   * @name getRelatedCustomers
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId" : "1"}, category("enroll"/"contract")
   */
  CustomerManagement_PresentationController.prototype.getRelatedCustomers = function (customerId,category) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      if(category === "enroll"){
        self.presentUserInterface("frmEnrollCustomer", {"relatedCustomers":response});
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      } else{
        var coreRelatedCustomers = response.customers ? response.customers : [];
        self.presentUserInterface("frmEnrollCustomer", {"relatedCustomersContract":coreRelatedCustomers,
                                                        "coreCustomerId" : customerId.coreCustomerId});
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      }
      
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }

    self.businessController.getCoreRelativeCustomers(customerId, successCallback, failureCallback);
  };
  /*
   * @name searchContracts
   * @member CustomerManagementModule.presentationController
   * @param {"contractId": "","contractName": "","coreCustomerId": "","coreCustomerName": "","email": "","phoneCountryCode": "","phoneNumber": "","country": "","serviceDefinitionId": ""}
   * @param option (1/2)
   */
  CustomerManagement_PresentationController.prototype.searchContracts = function (searchParams, option) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      self.presentUserInterface("frmEnrollCustomer", {"contractSearch":response,
                                                      "contractOption":option});
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }

    self.businessController.searchContracts(searchParams, successCallback, failureCallback);
  };
   /*
   * @name searchOtherCoreCustomers
   * @member CustomerManagementModule.presentationController
   * @param {"contractId": "","contractName": "","coreCustomerId": "","coreCustomerName": "","email": "","phoneCountryCode": "","phoneNumber": "","country": "","serviceDefinitionId": ""}
   * @param: category("enroll"/"contract")
   */
  CustomerManagement_PresentationController.prototype.searchOtherCoreCustomers = function (searchParams,category) {
    var self = this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      if(category === "enroll"){
        if(response.customers && response.customers.length === 1){ //single customer - fetch contract details directly
          self.getCoreCustomerContractDetails({"coreCustomerId":response.customers[0].coreCustomerId,"legalEntityId":searchParams.legalEntityId || ""},2,response); //,
        } else if(response.status === "Failure" || response.errMsg){
          failureCallback(response);
          self.presentUserInterface("frmEnrollCustomer", {"otherCustomersSearch":[]});
        } else { 
          self.presentUserInterface("frmEnrollCustomer", {"otherCustomersSearch":response.customers || []});
          self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
        }
      } else {
        var coreSearchData = response.customers ? response.customers : [];
        self.presentUserInterface("frmEnrollCustomer", {"contractsCustomerSearch":coreSearchData});
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      } 
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }

    self.businessController.searchCoreCustomers(searchParams, successCallback, failureCallback);
  };
  /*
  * @name fetchAccountsForUser
  * fetch accounts,features,limits,SG for selected servicedef and role when no contract exist
  * @member CustomerManagementModule.presentationController
  * @param {"coreCustomerId": [],"serviceDefinitionId": "","roleId":"","contractId":"","coreCustomerRoleIdList":""}
  */
  CustomerManagement_PresentationController.prototype.fetchServiceDefRoleDataForUser = function (inputParams) {
    var self = this;
    var accInputParam = { "coreCustomerIdList": inputParams.coreCustomerId, "legalEntityId":inputParams.legalEntityId };
    self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: true } });
    var coreCustomerAccounts = [];
    function onSuccess(response) {
      coreCustomerAccounts = response.coreCustomerAccounts.length > 0 ? response.coreCustomerAccounts[0].accounts : [];
      var productsList = formatAccounts(coreCustomerAccounts, 1);
      self.fetchAccountsCustomerRoleFeatures(inputParams, coreCustomerAccounts, productsList);
    }

    function onError(error) {
      self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });

    }
    //fetch product related data to fetch features
    function formatAccounts(accounts, option) {
      try {
        var products = [];
        products = accounts.reduce(function (prodArr, currRec) {
          if (!prodArr.includes(currRec.productId)) {
            prodArr.push({
              "accountId": currRec.accountNumber || currRec.accountId,
              "productId": currRec.productId || "",
              "arrangementRoleId": currRec.ownerType  || ""
            });
          }
          return prodArr;
        }, []);
        return products;
      } catch (err) {
        onError(err);
      }
    }
    self.businessController.getCoreCustomerAccounts(accInputParam, onSuccess, onError);
  };
  /*
   * @name fetchAccountsServiceRoleFeatures
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId": [],"serviceDefinitionId": "","roleId":""},corecustomer Accounts response, products List
   */
  CustomerManagement_PresentationController.prototype.fetchAccountsServiceRoleFeatures = function (inputParams, coreCustAccounts, productsList) {
    var self = this;
    var custId = this.getCurrentCustomerDetails().Customer_id || this.getCurrentCustomerDetails().primaryCustomerId;
    var isPrimaryCust = custId === inputParams.coreCustomerId ? true : false;
    self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: true } });
    // var promiseFetchProductFeatures = Promisify(this.businessController, 'getServiceDefinitionProductIdPermissions');
    var promiseFetchSRFeatures = Promisify(this.businessController, 'getServiceAndRoleFeatures');
    var promiseFetchSignGroups = Promisify(this.businessController, 'getAllSignatoryGroupsbyCoreCustomerIds');
    Promise.all([
      // promiseFetchProductFeatures({"serviceDefinitionId":inputParams.serviceDefinitionId,"productIdList":JSON.stringify(productsList)}),
      promiseFetchSRFeatures({ "serviceDefinitionId": inputParams.serviceDefinitionId, "groupId": inputParams.roleId }),
      promiseFetchSignGroups({ "coreCustomerIds": inputParams.coreCustomerId })
    ]).then(function (responses) {
      var featuresLimitsPerAcc = self.formatFeaturesPerAccount(responses[0]);
      self.presentUserInterface("frmEnrollCustomer", {
        "assignDefaultEnableFlag":
        {
          "accounts": coreCustAccounts,
          "featuresLimitsPerAccount": featuresLimitsPerAcc,
          "features": responses[1].features,
          "limits": responses[1].limits,
          "signatoryGroups": responses[2].coreCustomers.length > 0 ? responses[2].coreCustomers[0].signatoryGroups : [],
          "isPrimary": isPrimaryCust,
          "custId": inputParams.coreCustomerId,
          "custDetails": self.CustomerBasicInfo.customer
        }
      });
      //self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
    }).catch(function (error) {
      self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
     
    });
  };
  CustomerManagement_PresentationController.prototype.formatFeaturesPerAccount = function (accLvlFeatures) {
    var featuresPerAccObj = {};
    var featuresAccountsArr = accLvlFeatures.accountLevelPermissions.length > 0 ? accLvlFeatures.accountLevelPermissions[0].accounts : [];
    for (let i = 0; i < featuresAccountsArr.length; i++) {
      if (featuresAccountsArr[i].accountId)
        featuresPerAccObj[featuresAccountsArr[i].accountId] = featuresAccountsArr[i].features || [];
    }
    return featuresPerAccObj;
  };
  /*
   * @name fetchAccountsForUser
   * fetch accounts and features,limits,SG for selected prod,servicedef,role,coreCust when contract exist
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId":"",contractId":"","coreCustomerRoleIdList":[{"coreCustomerId":"","serviceDefinitionId":"","roleId":""},"serviceDefinitionId":"","roleId":""]}
   */
  CustomerManagement_PresentationController.prototype.fetchContractServiceDefRoleDataForUser = function (inputParams) {
    var self = this;
    self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: true } });
    var accInputParam = { "contractId": inputParams.contractId };
    var coreCustomerAccounts = [];

    function onSuccess(response) {
      var filterFormatObj = filterFormatAccounts(response);
      self.fetchAccountsCustomerRoleFeatures(inputParams, filterFormatObj.accounts, filterFormatObj.productsList);
    }
    function onError(error) {
      self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });

    }
    //fetch product related data to fetch features
    function filterFormatAccounts(response) {
      try {
        var custId = inputParams.coreCustomerId[0];
        var filteredAccList = [], products = [];
        var accounts = response.contractAccounts.length > 0 ? response.contractAccounts : [];
        filteredAccList = accounts.filter(function (rec) {
          if (rec.coreCustomerId === custId) {
            return rec;
          }
        });
        products = filteredAccList.reduce(function (prodArr, currRec) {
          if (!prodArr.includes(currRec.productId)) {
            prodArr.push({
              "accountId": currRec.accountNumber || currRec.accountId,
              "productId": currRec.productId || "",
              "arrangementRoleId": currRec.ownerType  || ""
            });
          }
          return prodArr;
        }, []);
        return { "accounts": filteredAccList, "productsList": products };
      } catch (err) {
        onError(err);
      }
    }
    self.businessController.getContractAccounts(accInputParam, onSuccess, onError);
  };
  /*
  * @name fetchAccountsCustomerRoleFeatures
  * @member CustomerManagementModule.presentationController
  * @param {"coreCustomerId":"",contractId":"","coreCustomerRoleIdList":[{"coreCustomerId":"","serviceDefinitionId":"","roleId":""},"serviceDefinitionId":"","roleId":""]}
  */
  CustomerManagement_PresentationController.prototype.fetchAccountsCustomerRoleFeatures = function (inputParams, accounts, productsList) {
    var self = this;
    var productsServiceInput = [];
    var custIdRoleSerDefObj = (JSON.parse(inputParams.coreCustomerRoleIdList))[0];
    custIdRoleSerDefObj["productsList"] = productsList;
    productsServiceInput.push(custIdRoleSerDefObj);
    self.presentUserInterface("frmEnrollCustomer", { "LoadingScreen": { focus: true } });
    var promiseFetchProductFeatures = Promisify(this.businessController, 'getCoreCustomerProductRolesFeatureActionLimits');
    //var promiseFetchFeatures = Promisify(this.businessController, 'getCoreCustomerRoleFeatureActionLimits');
    var promiseFetchSignGroups = Promisify(this.businessController, 'getAllSignatoryGroupsbyCoreCustomerIds');
    Promise.all([
      promiseFetchProductFeatures({ "coreCustomerRoleIdList": JSON.stringify(productsServiceInput),"legalEntityId":inputParams.legalEntityId,"contractId":inputParams.contractId }),
     // promiseFetchFeatures({ "coreCustomerRoleIdList": inputParams.coreCustomerRoleIdList,"legalEntityId":inputParams.legalEntityId }),
      promiseFetchSignGroups({ "coreCustomerIds": inputParams.coreCustomerId })
    ]).then(function (responses) {
      var featuresPerAcc = self.formatFeaturesPerAccount(responses[0]);
      self.presentUserInterface("frmEnrollCustomer", {
        "assignDefaultEnableFlag":
        {
          "accounts": accounts,
          "featuresPerAccount": featuresPerAcc,
          //"features": responses[1].features.length > 0 ? responses[1].features[0].coreCustomerFeatures : [],
          "limits": responses[0].transactionLimits.length > 0 ? responses[0].transactionLimits[0].featurePermissions : [],
          "nonAccFeatures": responses[0].globalLevelPermissions && responses[0].globalLevelPermissions.length > 0 ? responses[0].globalLevelPermissions[0].features : [],
          "signatoryGroups": responses[1].coreCustomers.length > 0 ? responses[1].coreCustomers[0].signatoryGroups : [],
          "isPrimary": false,
          "custId": inputParams.coreCustomerId,
          "custDetails": inputParams //used only while edituser
        }
      });
    }).catch(function (error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error)|| "Error while parsing the response data.";
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
     
    });
  };
  /*
   * @name getAccountsFeaturesForEnrollCust
   * @member CustomerManagementModule.presentationController
   * @param: customer id
   */
  CustomerManagement_PresentationController.prototype.getAccountsFeaturesForEnrollCust = function (custId) {
    if(custId){
      return this.enrollCustAccountsFeatures[custId];
    } else{
      return this.enrollCustAccountsFeatures;
    }
  };
  /*
   * @name setAccountsFeaturesForEnrollCust
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.setAccountsFeaturesForEnrollCust = function (custId,accountsFeaturesObj) {
    var custAccFeaturesObj = {"accounts" : accountsFeaturesObj.accounts,
                              //"features" : accountsFeaturesObj.features,
                              "accLevelFeatures":accountsFeaturesObj.accLevelFeatures,
                              "nonAccLevelFeatures": accountsFeaturesObj.nonAccLevelFeatures,
                              "accountMapFeatures": accountsFeaturesObj.accountMapFeatures,
                              "accLevelLimits":accountsFeaturesObj.accLevelLimits,
                              "limitGroups": accountsFeaturesObj.limitGroups,
                              "customerDetails" : accountsFeaturesObj.customerDetails,
                              "signatoryGroups":accountsFeaturesObj.signatoryGroups,
                              "isPrimary" : accountsFeaturesObj.isPrimary};
    this.enrollCustAccountsFeatures[custId] = custAccFeaturesObj;
    this.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
  };
  /*
   * @name deleteAccountsFeaturesForEnrollCust
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.deleteAccountsFeaturesForEnrollCust = function(custId){
    delete this.enrollCustAccountsFeatures[custId];
  };
  /*
   * @name setCreateContractPayload
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.setCreateContractPayload = function (inputParams) {
    this.temporaryContract = inputParams;
  };
  /*
   * @name getCreateContractPayload
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.getCreateContractPayload = function () {
    return this.temporaryContract;
  };
  /*
   * @name fetchAccountsServiceFeatures
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId": [],"serviceDefinitionId": ""}
   */
  CustomerManagement_PresentationController.prototype.fetchAccountsServiceFeatures = function (inputParams) {
    var self = this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    var promiseFetchAccounts = Promisify(this.businessController, 'getCoreCustomerAccounts');
    var promiseFetchFeatures = Promisify(this.businessController, 'getServiceDefinitionFeaturesAndLimits');
    Promise.all([
      promiseFetchAccounts({"coreCustomerIdList":inputParams.coreCustomerId,"legalEntityId":inputParams.legalEntityId}),
      promiseFetchFeatures({"serviceDefinitionId":inputParams.serviceDefinitionId})
    ]).then(function (responses) {
     // self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      //to extract latest phoneNumber 
      var phoneArr = self.CustomerContactInfo.ContactNumbers || [];
      var emailArr = self.CustomerContactInfo.Emails || [];
      var phone, email;
      for(var i=0;i<phoneArr.length;i++){
        if(phoneArr[i].isPrimary === "true"){
          phone =  (phoneArr[i].phoneCountryCode !== "" ? phoneArr[i].phoneCountryCode + "-" : "") +phoneArr[i].Value;
        }
      }
      for(var j=0;j<emailArr.length;j++){
        if(emailArr[j].isPrimary === "true"){
          email =  emailArr[j].Value;
        }
      }
      self.CustomerBasicInfo.customer.PrimaryPhoneNumber = phone;
      self.CustomerBasicInfo.customer.PrimaryEmailAddress = email;
      self.presentUserInterface("frmEnrollCustomer", {"tempContractAccountFeatures":{"accounts" : responses[0].coreCustomerAccounts.length > 0 ? responses[0].coreCustomerAccounts[0].accounts : [],
                                                                                     "features" : responses[1].features,
                                                                                     "limits": responses[1].limits,
                                                                                     "customerDetails" : self.CustomerBasicInfo.customer,
                                                                                     "isPrimary" : true}});
    }).catch(function (error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error) || "Error while parsing the response data.";
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
     
    });
  };
  /*
   * @name enroll customer
   * @member CustomerManagementModule.presentationController
   * @param {}
   */
  CustomerManagement_PresentationController.prototype.enrollCustomer = function (inputParams) {
    var self =this;
    var custName = self.getCurrentCustomerDetails().Name;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      if(response.status ==="Failure" && (response.errMsg || response.dbpErrMsg)){
        failureCallback(response);
      } else{
        var userDetails = inputParams && inputParams.userDetails ? JSON.parse(inputParams.userDetails): {}
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
        self.toastModel.message = custName + " " + kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.EnrollSuccessMsg");
        self.toastModel.status = "SUCCESS";
        self.toastModel.operation = "";
        self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
        self.getCustomerBasicInfo({ "Customer_id": response.id,"legalEntityId": userDetails.legalEntityId }, "InfoScreen", null);
      }
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error) || error.dbpErrMsg;
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }
    self.businessController.createInfinityUser(inputParams, successCallback, failureCallback);
  };
  /*
   * @name editInfinityUser
   * @member CustomerManagementModule.presentationController
   * @param {}
   */
  CustomerManagement_PresentationController.prototype.editInfinityUser = function (inputParams,context) {
    var self =this;
    var custName = self.getCurrentCustomerDetails().Name;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      self.toastModel.message = custName + " "+ kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.profileUpdatedSuccessfully");
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      if(context==="SINGLE_EDIT")
        self.presentUserInterface("frmEnrollCustomer", { "editSingleCustInfo": response});
      else
        self.navigateBackToCustomerTabs(false);
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      self.navigateBackToCustomerTabs(false);
      
    }
    self.businessController.editInfinityUser(inputParams, successCallback, failureCallback);
  };

  CustomerManagement_PresentationController.prototype.editInfinityUserassignuserid = function (inputParams,context) {
    var self =this;
    var custName = self.getCurrentCustomerDetails().Name;
    self.presentUserInterface("frmCustomerManagement", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      self.presentUserInterface("frmCustomerManagement", {"LoadingScreen" : { focus : false }});
      self.toastModel.message = custName + " "+ kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.profileUpdatedSuccessfully");
      self.toastModel.status = "SUCCESS";
      self.toastModel.operation = "";
      self.presentUserInterface("frmCustomerManagement", { "toastModel": self.toastModel });
      // if(context==="SINGLE_EDIT")
      //   self.presentUserInterface("frmCustomerManagement", { "editSingleCustInfo": response});
      // else
      self.getSearchInputs(true);
    }

    function failureCallback(error) {
      self.presentUserInterface("frmCustomerManagement", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmCustomerManagement", { "toastModel": self.toastModel });
      //self.getSearchInputs(true);
      
    }
    self.businessController.editInfinityUser(inputParams, successCallback, failureCallback);
  };


  /*
   * @name navigateBackToCustomerTabs from enroll from
   * @member CustomerManagementModule.presentationController
   * @param isFirstTab - true/false
   */
  CustomerManagement_PresentationController.prototype.navigateBackToCustomerTabs = function(isFirstTab){
    var formNavigatedFrom = this.sourceFormDetail;
    var custId = this.getCurrentCustomerDetails().Customer_id || this.getCurrentCustomerDetails().primaryCustomerId;
    var navigationParam;
    if(formNavigatedFrom.name && isFirstTab === false){
      navigationParam = {"name":"frmEnrollCustomer","data":formNavigatedFrom.data.tabName}
    } else{
      navigationParam = null;
    }
    var legalEntityId = this.getCurrentCustomerDetails().legalEntityId || this.custSearchLEId;
    this.getCustomerBasicInfo({ "Customer_id": custId,"legalEntityId":legalEntityId || "" }, "InfoScreen", navigationParam);
  };
  /*
   * @name getCoreCustomerContractDetails
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId" : ""} -inputParams
   * @param:option (relatedCust:1,otherCust:2)
   * @param: selected customer details
   */
  CustomerManagement_PresentationController.prototype.getCoreCustomerContractDetails = function (inputParams,option,custDetails) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      if((response.contracts && response.contracts.length > 0) ||
        (response.contracts && response.contracts.length === 0 && option === 1)){
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
        self.presentUserInterface("frmEnrollCustomer", {"contractOfCustomer": response.contracts,
                                                        "contractOption": option,
                                                        "contractType":"core",
                                                        "custSearchResponse": custDetails});
      }else if(response.contracts && response.contracts.length === 0 && option === 2){
        self.getRelativeCoreCustomerContractDetails({"coreCustomerId": inputParams.coreCustomerId,"legalEntityId": inputParams.legalEntityId},
                                                    option,custDetails);
      }
      //service Error
      else if(response.status && response.status === "Failure"){
        self.getRelativeCoreCustomerContractDetails({"coreCustomerId": inputParams.coreCustomerId, "legalEntityId": inputParams.legalEntityId},
                                                    option,custDetails);
        //failureCallback(response);*/
      } else{
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      }
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }
    self.businessController.getCoreCustomerContractDetails(inputParams, successCallback, failureCallback);
  };
   /*
   * @name getRelativeCoreCustomerContractDetails
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId" : ""} -inputParams
   * @param:option (relatedCust:1,otherCust:2)
   * @param: selected customer details
   */
  CustomerManagement_PresentationController.prototype.getRelativeCoreCustomerContractDetails = function (inputParams,option,custDetails) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      self.presentUserInterface("frmEnrollCustomer", {"contractOfCustomer": response.contracts,
                                                      "contractOption": option,
                                                      "contractType":"related",
                                                      "custSearchResponse": custDetails});
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }
    self.businessController.getRelativeCoreCustomerContractDetails(inputParams, successCallback, failureCallback);
  };
   /*
   * @name getInfinityUserAllDetails
   * @member CustomerManagementModule.presentationController
   * @param {}
   */
  CustomerManagement_PresentationController.prototype.getInfinityUserAllDetails = function (input,navParam,isSuspendedUser) {
    var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      fetchCustomerAndRoleLimits(response);

    }
    //get default limit values
    function fetchCustomerAndRoleLimits(userDetails){
      var infinityUserDetails = {"userDetails":userDetails,
                                 "navParam":navParam};
      var customerId=navParam.data.custId;
      var companyList = userDetails.companyList.length > 0 ? userDetails.companyList : [];
      var reqParam = {"coreCustomerRoleIdList":[]};
      var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
	 for(var i=0; i<companyList.length; i++){
        if(customerId===companyList[i].cif){
        reqParam.coreCustomerRoleIdList.push({
          "coreCustomerId": companyList[i].cif,
          "serviceDefinitionId": companyList[i].serviceDefinition,
          "roleId":companyList[i].roleId       
        });
          reqParam.legalEntityId=legalEntityId;
          break;
        }
      }
      self.getCustomerAndRoleFeatureLimits(reqParam,infinityUserDetails,isSuspendedUser);
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      
    }

    self.businessController.getInfinityUser(input, successCallback, failureCallback);
  };
    /*
   * @name getServiceDefinitionFeaturesAndLimits
   * @member CustomerManagementModule.presentationController
   * @param 
   */
  CustomerManagement_PresentationController.prototype.getInfinityUserServiceDefsRoles = function(payload,navParam,isSuspendedUser) {
   var self =this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      fetchCustomerAndRoleLimits(response);

    }
    //get default limit values
    function fetchCustomerAndRoleLimits(userDetails){
      var infinityUserDetails = {"userDetails":userDetails,
                                 "navParam":navParam};
//       var companyList = userDetails.companyList.length > 0 ? userDetails.companyList : [];
//       var reqParam = {"coreCustomerRoleIdList":[]};
//       for(var i=0; i<companyList.length; i++){
//         reqParam.coreCustomerRoleIdList.push({
//           "coreCustomerId": companyList[i].cif,
//           "serviceDefinitionId": companyList[i].serviceDefinition,
//           "roleId":companyList[i].roleId
//         });
//       }
      //self.getCustomerAndRoleFeatureLimits(reqParam,infinityUserDetails,isSuspendedUser);
      self.navigateToEnrollFromCustTabs(infinityUserDetails, isSuspendedUser);
    }

    function failureCallback(error) {
      self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
      
    }
    this.businessController.getInfinityUserServiceDefsRoles(payload, successCallback, failureCallback);
  };
   /*
   * @name getCustomerAndRoleFeatureLimits
   * @member CustomerManagementModule.presentationController
   * @param {}
   */
  CustomerManagement_PresentationController.prototype.getCustomerAndRoleFeatureLimits = function (inputParams,infinityUserDetails,isSuspendedUser) {
    var self =this;
    var custName = self.getCurrentCustomerDetails().Name;
    var custId=this.getCurrentCustomerDetails().Customer_id || this.getCurrentCustomerDetails().primaryCustomerId;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      if(response.status ==="Failure" && response.errMsg){
        failureCallback(response);
      } else{
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
        infinityUserDetails["defaultLimits"] = response.limits.length > 0 ? response.limits : [];
        self.navigateToEnrollFromCustTabs(infinityUserDetails, isSuspendedUser);
        if(isSuspendedUser){
          var legalEntityId = self.getCurrentCustomerDetails().legalEntityId || self.custSearchLEId;
          self.getRelatedCustomers({"coreCustomerId":custId,"legalEntityId": legalEntityId || "" },"enroll");
        }
      }
    }

    function failureCallback(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      
    }
    self.businessController.getCoreCustomerRoleFeatureActionLimits(inputParams, successCallback, failureCallback);
  };
   /*
   * @name getCoreCustomerAccounts
   * @member CustomerManagementModule.presentationController
   * @param {"coreCustomerId" : ""} -inputParams
   */
  CustomerManagement_PresentationController.prototype.getCoreCustomerAccounts = function(payload) {
    var self = this; 
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    var coreCustomerAccounts=[];
    function onSuccess(response) {
      coreCustomerAccounts = response.coreCustomerAccounts;
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.presentUserInterface("frmEnrollCustomer",{"coreCustomerAccountsContracts":coreCustomerAccounts});
    }

    function onError(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });

    }
    this.businessController.getCoreCustomerAccounts(payload, onSuccess, onError);
  };
  /*
   * @name getServiceDefinitionFeaturesAndLimits
   * @member CustomerManagementModule.presentationController
   * @param 
   */
  CustomerManagement_PresentationController.prototype.getServiceDefinitionFeaturesAndLimits = function(payload) {
    var self = this; 
    var serviceDefinitionFeatures=[];
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    function onSuccess(response) {
      serviceDefinitionFeatures = response;
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.presentUserInterface("frmEnrollCustomer",{"serviceDefFeaturesLimitsContract":serviceDefinitionFeatures});
    }

    function onError(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
    }
    this.businessController.getServiceDefinitionFeaturesAndLimits(payload, onSuccess, onError);
  };
  /*
   * @name createContract
   * @member CustomerManagementModule.presentationController
   * @param 
   */
  CustomerManagement_PresentationController.prototype.createContract = function (context) {
    var self = this;
    var payload = {};
    payload.contractName = context.contractName;
    payload.legalEntityId= context.legalEntityId;
    payload.serviceDefinitionName = context.serviceDefinitionName;
    payload.serviceDefinitionId = context.serviceDefinitionId;
    payload.faxId = context.faxId;
    payload.communication = JSON.stringify(context.communication);
    payload.address = JSON.stringify(context.address);
    payload.contractCustomers = JSON.stringify(context.contractCustomers);
    payload.transactionLimits1 = JSON.stringify(context.transactionLimits);
    payload.globalLevelPermissions1 = JSON.stringify(context.globalLevelPermissions);
    payload.accountLevelPermissions1 = JSON.stringify(context.accountLevelPermissions);
    function completionCreateContractCallback(response) {
      if(response['status'] === "Failure"){
        onError(response);
      }else{
        var customerInfoToAdd = context;
        self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
        self.presentUserInterface("frmEnrollCustomer", {"createContractSuccess":
                                                       {"contractId":response.contractId,
                                                        "contractDetails" : payload}});
        self.toastModel.message = context.contractName + " "+ kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.contractCreatedSuccessfully");
        self.toastModel.status = "SUCCESS";
        self.toastModel.operation = "";
        self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      }
    }

    function onError(error) {
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
    }
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    this.businessController.createContract(payload, completionCreateContractCallback, onError);
  };
  /*
   * @name getEditContractInformation
   * @member CustomerManagementModule.presentationController
   * @param contract id
   */
  CustomerManagement_PresentationController.prototype.getEditContractInformation= function (contractId, searchCust) {
    var self = this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    var promiseGetContractDetailsList = Promisify(this.businessController, 'getContractDetails');
    var promiseGetFeatureLimits = Promisify(this.businessController, 'getContractFeatureActionLimits');
    var promiseGetCustAccounts = Promisify(this.businessController, 'getCoreCustomerAccounts');

    Promise.all([
      promiseGetContractDetailsList({"contractId": contractId}),
      promiseGetFeatureLimits({"contractId": contractId}),
      promiseGetCustAccounts({"coreCustomerIdList": searchCust ? [searchCust.coreCustomerId] :[],"legalEntityId":inputParams.legalEntityId})
    ]).then(function(responses) {   
      self.presentUserInterface("frmEnrollCustomer", {"editContractDetails": {"contractDetails":responses[0],
                                                                              "featuresLimits":responses[1],
                                                                              "custAccounts":responses[2],
                                                                              "searchCust":searchCust}});
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });

    }).catch(function(res) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(res);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
    });	
  };
  /*
   * @name editContract
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.editContract = function (editRequest) {
    var self = this; 
    function successCallback(response) {
      if(response['status'] === "Failure"){
        onError(response);
      }else{
        self.presentUserInterface("frmEnrollCustomer", {"createContractSuccess":
                                                        {"contractId": editRequest.contractId,
                                                         "contractDetails" : editRequest}});
        self.toastModel.message = editRequest.contractName + " "+ kony.i18n.getLocalizedString("i18n.frmEnrollCustomer.contractUpdatedSuccessfully");
        self.toastModel.status = "SUCCESS";
        self.toastModel.operation = "";
        self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });

      }
    }
    function onError(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
    }
    this.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    this.businessController.editContract(editRequest, successCallback, onError);
  };
   /*
   * @name getServiceDefinitionMonetaryActions
   * @member CustomerManagementModule.presentationController
   */
  CustomerManagement_PresentationController.prototype.getServiceDefinitionMonetaryActions = function(payload) {
    var self = this; 
    var serviceDefinitionFeatures=[];
    function onSuccess(response) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      serviceDefinitionFeatures = response;
      self.presentUserInterface("frmEnrollCustomer",{"serviceDefinitionMonetaryActions":serviceDefinitionFeatures});
    }

    function onError(error) {
     self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
    }
    this.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    this.businessController.getServiceDefinitionMonetaryActions(payload, onSuccess, onError);
  };
  CustomerManagement_PresentationController.prototype.getAutoSyncAccountsFlag = function() {
    var self = this;
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true }});
    function onSuccess(response) {
      self.presentUserInterface("frmEnrollCustomer", {"autoSyncAccountsFlag":response.Configuration});
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
    }
    function onError(error) {
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false }});
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
    }
    this.businessController.getCustomerStatusConfig({"bundle_name":"C360","config_key":"DEFAULT_ACCOUNTS_ACCESS_TYPE"}, onSuccess, onError);
  };
   CustomerManagement_PresentationController.prototype.setGoogleMapAPIKeys = function() {
      const scopeObj = this;
    let configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties(function(response) {
      if(response && response.GOOGLE_MAPS_API_KEY){
        scopeObj.googleMapAPIkey = response.GOOGLE_MAPS_API_KEY;
      }
    },function(){}); 
   };
  CustomerManagement_PresentationController.prototype.getGoogleMapAPIKeys = function() {
    return this.googleMapAPIkey;
  };
  CustomerManagement_PresentationController.prototype.getServiceDefinitionProductIdPermissions = function(payload,selectedCardInfo) {
    var self = this; 
    // self.showLoadingScreen();
    self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : true } });
    function onSuccess(response) {
      //self.presentCompaniesScreen({"accountLvlFeatureActions":response.features || []});
      self.presentUserInterface("frmEnrollCustomer",{"accountLvlFeatureActions":response.features || []});
      // self.hideLoadingScreen();
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
    }
    function onError(error) {
      //  self.hideLoadingScreen();
      self.presentUserInterface("frmEnrollCustomer", {"LoadingScreen" : { focus : false } });
      self.toastModel.message = kony.i18n.getLocalizedString("i18n.frmGroupsController.error");//ErrorInterceptor.errorMessage(error));
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmEnrollCustomer", { "toastModel": self.toastModel });
      //self.showToastMessage(kony.i18n.getLocalizedString("i18n.frmGroupsController.error"),ErrorInterceptor.errorMessage(error));
    }
    this.businessController.getServiceDefinitionProductIdPermissions(payload, onSuccess, onError);
  };

CustomerManagement_PresentationController.prototype.getCoreCustomerDetails = function (inputParams,category) {

    var self =this;
    self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : true }});
    function successCallback(response) {
      var contractInfo = response.CoreCustomer && response.CoreCustomer.length > 0 ? response.CoreCustomer[0] : {};
      self.presentUserInterface(kony.application.getCurrentForm().id, { "LoadingScreen": { focus: false } });
      self.presentUserInterface(kony.application.getCurrentForm().id, {"custDetails": contractInfo, "category":category||""});
      /*service Error
      else if(response.status && response.status === "Failure"){
        failureCallback(response);
      }*/
    }
    function failureCallback(error) {

      self.presentUserInterface(kony.application.getCurrentForm().id, {"LoadingScreen" : { focus : false } });
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface(kony.application.getCurrentForm().id, { "toastModel": self.toastModel });
    }
    self.businessController.getCoreCustomerDetails(inputParams, successCallback, failureCallback);
  };
  /*
  * @name: getInfinityUserAccountsForCorecustomer
  * @param: {"userId" : "","coreCustomerId":""}
  */
  CustomerManagement_PresentationController.prototype.getInfinityUserAccountsForCorecustomer = function(inputParam, cardContext) {
    var self = this;
    self.presentUserInterface("frmCustomerProfileAccounts", {"LoadingScreen" : { focus : true }});
    function onSuccess(response) {
      self.presentUserInterface("frmCustomerProfileAccounts", {"LoadingScreen" : { focus : false }});
      self.presentUserInterface("frmCustomerProfileAccounts", {
        "userAccountsForCoreCust":response,
        "cardInfo":cardContext.cardWidgetRef
      });
    }
    function onError(error) {
      self.presentUserInterface("frmCustomerProfileAccounts", {"LoadingScreen" : { focus : false }});
      self.toastModel.message = ErrorInterceptor.errorMessage(error);
      self.toastModel.status = "FAILURE";
      self.toastModel.operation = "";
      self.presentUserInterface("frmCustomerProfileAccounts", { "toastModel": self.toastModel });
    }
    this.businessController.getInfinityUserAccountsForCorecustomer(inputParam, onSuccess, onError);
  };
  
  return CustomerManagement_PresentationController;
    
});

